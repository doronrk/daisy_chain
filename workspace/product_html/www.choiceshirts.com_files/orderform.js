Ajax.Request.addMethods({
    dispatchException: function($super, exception){
        cl(exception);
        $super(exception);
    }
});


// The following Bindings can be done
// // if varian form is being used this should work
// $(groupProduct.options.formId).observe('submit', groupProduct.canSubmit.bind(groupProduct));
//
// productAddToCartForm.orderFormSubmit = productAddToCartForm.submit;
//
// productAddToCartForm.submit = function() {
//         this.form.simulate('submit');
//         if (groupProduct.options.submitted) {
//             this.orderFormSubmit();
//         }
//     };
//
//
// // Normal Binding:
//
// $(bulkOrder.options.formId).observe('reset', bulkOrder.clear.bind(bulkOrder, true));
//
// $(bulkOrder.options.formId).observe('submit', bulkOrder.canSubmit.bind(bulkOrder, true));



orderForm = Class.create({

    defaultOptions: {
        qtipClassNamePre: 'tr',
        qtipIdPre: 'tr_',
        qtipIdPost: '',
        itemNumberFieldPre: 'item_',
        itemNumberFieldPost: '',
        itemQtyFieldPre: 'qty_',
        itemQtyFieldPost: '',
        totalQtyField: 'total_qty',
        totalPriceField: 'total_price',
        errorField: 'error_text',
        errorText: 'Please correct the errors above before submitting this form.',
        emptyFormText: 'Please add products above before submitting this form.',
        clearCheckText: 'Are you sure you want to clear all items and their quantities? This action is not reversible.',
        useLoading: false,
        available: false,
        formId: 'orderform',
        observeFields: '.qty-number-box, .item-number-box',
        observeEvent: 'blur',
        qtipProperties: {
            position: {
                corner: {
                    target: 'rightMiddle',
                    tooltip: 'leftMiddle'
                },
                adjust: {
                    x: -20,
                    y: -2
                }
            },
            style: {
                border: {
                    width: 3,
                    radius: 3,
                    color: '#658fbe'
                },
                tip: {
                    corner: 'leftMiddle'
                }
            },
            show: {
                when: 'mouseover',
                delay: 0
            },
            hide: {
                delay: 300,
                fixed: true,
                when: {
                    event: 'mouseout'
                }
            }
        },
        qtipMessages: [],
        submitUrl: '/orderform/index/validate',
        varianFormObject: {},
        useVarianForm: false,
        skipCorrFieldCheck: false,
        skipFormChangedCheck: false,
        arrayRelatePopulate: true,
        arrayRelate: [],
        serializedForm: {},
        statusInfo: [],
        blockSubmit: false,
        resubmit: false,
        submitted: false,
        reAjax: false,
        ajaxCancelRequest: false,
        additionalFormProperties: {
            page: 'orderform',
            magentoAttribute: 'sku',
            arrayRelate: '',
            itemPre: 'item_',
            itemPost: '',
            qtyPre: 'qty_',
            qtyPost: '',
            arrayLength: 65
        }
    },

    initialize: function(options) {

        this.options = $H(this.defaultOptions).merge(typeof options == 'object' ? options : {}).toObject();

        this.options.arrayRelate = this.options.arrayRelatePopulate ? $A($R(0, this.options.additionalFormProperties.arrayLength - 1)) : this.options.arrayRelate;

        this.options.formName = $(this.options.formId).hasAttribute('name') ? $(this.options.formId).readAttribute('name') : $(this.options.formId).writeAttribute('name', this.options.formId).readAttribute('name');

        this.options.additionalFormProperties.arrayRelate = this.options.arrayRelate.join('|');

        $$(this.options.observeFields).each(
            function(el) {
                el.observe(this.options.observeEvent, this.validate.bind(this, el));
            }.bind(this)
        );


    },

    validate: function(inputEl) {

        var correspondingFieldNumber = 0;
        
        serializedForm = $H($(this.options.formId).serialize(true)).merge(this.options.additionalFormProperties).toObject();

        if(Object.toJSON(serializedForm) == Object.toJSON(this.options.serializedForm) || (typeof inputEl != 'object' && inputEl == 'skip') || this.options.skipCorrFieldCheck || this.options.skipFormChangedCheck) {
            if (Object.toJSON(serializedForm) == Object.toJSON(this.options.serializedForm))
                return false;
        } else {
            if (inputEl.readAttribute('id').indexOf(this.options.itemNumberFieldPre) != -1) {
                correspondingFieldNumber =
                    inputEl.readAttribute('id').sub(
                    new RegExp(this.regExpEscape(this.options.itemNumberFieldPre) + '([0-9]*)' + this.regExpEscape(this.options.itemNumberFieldPost)),
                    '#{1}');
                correspondingField =
                    $(this.options.itemQtyFieldPre + correspondingFieldNumber + this.options.itemQtyFieldPost);

                if (!(correspondingField) || typeof correspondingField != 'object' || correspondingField.getValue() == '' || inputEl.getValue() == '') {
                    return false;
                }
            } else if(inputEl.readAttribute('id').indexOf(this.options.itemQtyFieldPre) != -1) {
                correspondingFieldNumber =
                    inputEl.readAttribute('id').sub(
                    new RegExp(this.regExpEscape(this.options.itemQtyFieldPre) + '([0-9]*)' + this.regExpEscape(this.options.itemQtyFieldPost)),
                    '#{1}');
                correspondingField =
                    $(this.options.itemNumberFieldPre + correspondingFieldNumber + this.options.itemNumberFieldPost);

                if (!(correspondingField) || typeof correspondingField != 'object' || (correspondingField.getValue() != '' && inputEl.getValue() == '') || (correspondingField.getValue() == '' && inputEl.getValue() != '')) {
                    return false;
                }
            } else
                return false;
        }

        if(this.options.blockSubmit == true) {
            this.options.reAjax = true;
            return false;
        }

        if (!this.options.useLoading) {
            if (correspondingFieldNumber) { // set a loading class if this was called from a input element
                this.options.loadingField = this.options.qtipIdPre + correspondingFieldNumber + this.options.qtipIdPost;

                $(this.options.loadingField).addClassName(this.options.qtipClassNamePre+'-loading');
            } else {
                this.options.loadingField = '';
            }
        } else {
            $(this.options.loadingField).addClassName(this.options.qtipClassNamePre+'-loading');
        }

        this.options.serializedForm = serializedForm;

        new Ajax.Request(this.options.submitUrl, {
            method:'post',
            onSuccess: function(returnedAJAXObject, json) {
                            this.processValidation.bind(this, json)();
                        }.bind(this),
            parameters: this.options.serializedForm
        });

        this.options.blockSubmit = true;
        return true;
    },

    processValidation: function(json) {
        
        if (this.options.loadingField) {
            $(this.options.loadingField).removeClassName(this.options.qtipClassNamePre+'-loading');
        }

        this.options.available = ($A(json).length == 0) ? false : true;

        this.options.statusInfo = json;
        
        this.options.qtipMessages = [];

        this.clear(false);

        $A(this.options.statusInfo).each(function(item, i) {
            switch(item.status) {
                case 'not-available':
                    $(this.options.qtipIdPre + this.options.arrayRelate[i] + this.options.qtipIdPost).addClassName(this.options.qtipClassNamePre+'-not-available');
                    this.options.available = false;
                    break;
                case 'backordered':
                    $(this.options.qtipIdPre + this.options.arrayRelate[i] + this.options.qtipIdPost).addClassName(this.options.qtipClassNamePre+'-backordered');
                    break;
                case 'available':
                    $(this.options.qtipIdPre + this.options.arrayRelate[i] + this.options.qtipIdPost).addClassName(this.options.qtipClassNamePre+'-available');
                    break;
                default:
                    break;
            }

            if(item.message) {
                this.insertErrorMsg(item.message, '#' + this.options.qtipIdPre + this.options.arrayRelate[i] + this.options.qtipIdPost);
            }
        }.bind(this));

        this.displayErrorMsgs();
        
        if (this.options.totalQtyField != '') {
            $(this.options.totalQtyField).update(this.options.statusInfo[0].qty);
        }
        if (this.options.totalPriceField != '') {
            $(this.options.totalPriceField).update(this.options.statusInfo[0].price);
        }

        this.options.blockSubmit = false;
        if(this.options.resubmit == true) {
            this.options.resubmit = false;
            if(this.options.useVarianForm) {
                varianFormObject.submit();
            } else {
                $(this.options.formId).simulate('submit');
            }
        } else if(this.options.reAjax == true) {
            this.validate('skip');
        }
        
        

    },

    disableErrorMsg: function(inputEl) {
        if(typeof jQuery(inputEl).data('qtip') != 'undefined') {
            jQuery(inputEl).qtip('hide');
            jQuery(inputEl).qtip('disable');
        }
    },

    insertErrorMsg: function(msg, inputEl) {
        this.options.qtipMessages.push({
            'message': msg,
            'inputEl': inputEl
        });
    },

    displayErrorMsgs: function() {
        $A(this.options.qtipMessages).each(function(item, i) {
            if(typeof jQuery(item.inputEl).data('qtip') != 'undefined') {
                jQuery(item.inputEl).qtip('enable');
                jQuery(item.inputEl).qtip('api').updateContent(item.message);
            } else {
                this.options.qtipProperties.content = item.message;
                jQuery(item.inputEl).qtip(this.options.qtipProperties);
            }
        }.bind(this));
    },

    canSubmit: function(event) {
        if(this.options.blockSubmit) {
            this.options.resubmit = true;
            this.options.submitted = false;
            event.stop();
            return false;
        }
        if(this.checkEmpty() || !this.options.available) {

            this.options.submitted = false;
            event.stop();

            if (this.options.isEmpty) {
                $(this.options.errorField).update(this.options.emptyFormText);
            } else {
                $(this.options.errorField).update(this.options.errorText);
            }

            this.validate('skip');
            return false;
        } else {
            Object.keys(this.options.additionalFormProperties).each(function(item) {
                var itemValue = $H(this.options.additionalFormProperties).get(item);
                $(this.options.formId).insert({
                    bottom: new Element('input', {
                        type: 'hidden', name: item, value: itemValue
                    })
                });
            }.bind(this));

        }

        if (this.options.useVarianForm) {
            this.options.submitted = true;
            event.stop();
        }

        return true;
    },

    checkEmpty: function () {
        this.options.isEmpty = (this.options.statusInfo.length == 0) ? false : true;
        for (var i = 0; i < this.options.statusInfo.length; i++) {
            if (this.options.statusInfo[i].status + this.options.statusInfo[i].message != '') {
                this.options.isEmpty = false;
                break;
            }
        }
        return this.options.isEmpty;
    },

    clear: function(shouldConfirm, event) {
        shouldConfirm = (typeof shouldConfirm ==  'boolean') ? shouldConfirm : true ;
        if(shouldConfirm && !confirm(this.options.clearCheckText))
            event.stop();
        else {

            $A(this.options.arrayRelate).each(function(item, i) {
                $(this.options.qtipIdPre + item + this.options.qtipIdPost)
                    .removeClassName(this.options.qtipClassNamePre+'-not-available')
                    .removeClassName(this.options.qtipClassNamePre+'-backordered')
                    .removeClassName(this.options.qtipClassNamePre+'-available');
                $(this.disableErrorMsg('#' + this.options.qtipIdPre + item + this.options.qtipIdPost));
            }.bind(this));

            if(shouldConfirm) {
                this.options.serializedForm = {};
                this.options.available = false;
            }
        }

    },

    regExpEscape: function(text) {
        if (!arguments.callee.sRE) {
            var specials = [
                '/', '.', '*', '+', '?', '|',
                '(', ')', '[', ']', '{', '}', '\\'
            ];
            arguments.callee.sRE = new RegExp(
                '(\\' + specials.join('|\\') + ')', 'g'
            );
        }
        return text.replace(arguments.callee.sRE, '\\$1');
    }

});