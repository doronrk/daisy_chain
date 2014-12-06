var Dropdown = new Class({
    el: null,
    selectEl: null,
    focusItem: 0,
    initialize: function(selectEl) {
        this.selectEl = selectEl;

        // Hide the real select
        this.selectEl.addClass('hidden');

        // Insert the skeleton DOM nodes into the HTML
        this.el = this._createSkeletonNode();

        // Fill our control with the info from the select
        this._fillDropdown();

        // Add our event listeners
        this._addEventListeners();
    },
    _createSkeletonNode: function() {
        var str = Dropdown.HTML_TEMPLATE;
        var wrapper = new Element('div');
        wrapper.set('html', str);
        var el = wrapper.getChildren()[0];

        el.getElement('.dropListContainer').set('id', this.selectEl.get('id') + 'container');
        el.getElement('.scrollbox_slider').set('id', this.selectEl.get('id') + 'slider');
        el.getElement('.scrollbox_slider').set('rel', this.selectEl.get('id') + 'container');

        var childNodes = this.selectEl.parentNode.childNodes;
        for (var i = 0, len = childNodes.length; i < len; i++) {
            if (childNodes[i].className == 'rfgLabelError') {
                el.getElement('.dropTriggerContainer').addClass('errorDropTriggerContainer');
                el.getElement('.dropTriggerContainer').addClass('errorDropTriggerContainerBottom');
                el.getElement('.dropTriggerArrow').addClass('errorDropTriggerArrow');
                el.getElement('.dropTrigger').addClass('errorDropTrigger');
            }
        }

        el.inject(this.selectEl, 'after');
        wrapper.destroy();
        return el;
    },
    _fillDropdown: function() {
        var me = this;

        // Fill in our list
        var ddOptionsEl = this.el.getElement('ul.dropList');
        var li, a;

        // Copy the options to our UL
        this.selectEl.getChildren().each(function(option, i) {
            li = new Element('li');
            a = new Element('a', {
                'html': option.get('text'),
                'href': 'javascript:void(0);'
            });
            a.inject(li);
            li.inject(ddOptionsEl);

            // Display the currently-selected item in the drop selector
            if (me.selectEl.selectedIndex == i) {
                me.el.getElement('.dropTrigger').set('html', option.get('text'));
                me.focusItem = i;
            }
        });

        //IE 7 overflow fix:
        this.el.getElement('.dropListContainer').setStyles({
            width: ddOptionsEl.getSize().x + 'px'
        });
        if (this.el.getElement('.dropTrigger').innerHTML != '' && this.el.getElement('.dropTrigger').innerHTML.length > 25) {
            this.el.getElement('.dropTrigger').innerHTML = this.el.getElement('.dropTrigger').innerHTML.substring(0, 24) + "...";
        }
        if (this.el.getElement('.dropTrigger').getSize().y > 32) {
            this.el.getElement('.dropTrigger').setStyle('height', '32px');
        }
    },
    _addEventListeners: function() {
        var me = this;

        this.el.addEvent('click', function(e) {
            e.stopPropagation();
        });

        this.el.addEvent('keydown', function(e) {
            if (e.key == 'down')
                me.focusDown();
            if (e.key == 'up')
                me.focusUp();
        });

        document.addEvent('click', function(e) {
            if (!me.el.getElement('.dropListContainer').hasClass('rfgHidden'))
                me.closeDropdown();
        });

        var currentItemEl = this.el.getElement('.dropTriggerContainer');
        currentItemEl.addEvent('click', function(e) {
            e.stopPropagation();
            me.toggleDropdown();
        });
        currentItemEl.addEvent('keydown', function(e) {
            if (e.key == 'down')
                me.openDropdown();
        });

        var optionsEl = this.el.getElement('.dropList');

        // Handle item selection
        optionsEl.getElements('a').each(function(a, i) {
            a.addEvent('click', function(e) {
                e.stopPropagation();
                me.selectItem(i);
                e.stopPropagation();
            });
        });
    },
    selectItem: function(index) {
        // Select this item in the hidden <select>
        this.selectEl.selectedIndex = index;
        this.focusItem = index;
        // Show this item as the selected item
        this.el.getElement('.dropTrigger').set('html', this.el.getElements('.dropList a')[index].get('text'));
        this.closeDropdown();

        if (this.selectEl.get('id').contains('CountryRegion')) {
            this.el.getElements('.dropList a')[index].set('href', '#');
            theForm.submit();
        }

    },
    openDropdown: function() {
        this.el.getElement('.dropListContainer').removeClass('rfgHidden');
        this.el.getElement('.scrollbox_slider').removeClass('rfgHidden');
        if (!this.el.getElement('.dropTriggerContainer').className.contains('errorDropTriggerContainer')) {
            this.el.getElement('.dropTriggerContainer').addClass('hoverDropTriggerContainer');
            this.el.getElement('.dropTriggerContainer').removeClass('selectedDropTriggerContainerBorderBottom');
            this.el.getElement('.dropTriggerArrow').addClass('hoverDropTriggerArrow');
            this.el.getElement('.dropListContainer').addClass('hoverDropListContainer');
        }
        else {
            this.el.getElement('.dropList').addClass('errorDropList');
            this.el.getElement('.dropTriggerContainer').removeClass('errorDropTriggerContainerBottom');
            this.el.getElement('.dropListContainer').addClass('errorDropListContainer');
        }


        //this.el.getElement('.handle').removeClass('rfgHidden');
        this.setFocus();
    },
    closeDropdown: function() {
        this.el.getElement('.dropListContainer').addClass('rfgHidden');
        this.el.getElement('.scrollbox_slider').addClass('rfgHidden');
        if (!this.el.getElement('.dropTriggerContainer').className.contains('errorDropTriggerContainer')) {
            this.el.getElement('.dropTriggerContainer').removeClass('hoverDropTriggerContainer');
            this.el.getElement('.dropTriggerArrow').removeClass('hoverDropTriggerArrow');
            this.el.getElement('.dropListContainer').addClass('hoverDropListContainer');
//            var firstChild = this.el.getElement('.dropList').firstChild;
//            var selectChoice = firstChild.textContent || firstChild.innerText
//            if (this.el.getElement('.dropTrigger').innerHTML != selectChoice) {
//                this.el.getElement('.dropTriggerContainer').addClass('selectedDropTriggerContainer');
//                this.el.getElement('.dropTriggerContainer').addClass('selectedDropTriggerContainerBorderBottom');
//                this.el.getElement('.dropTriggerArrow').addClass('selectedDropTriggerArrow');
//            }
//            else {
//                this.el.getElement('.dropTriggerContainer').removeClass('selectedDropTriggerContainer');
//                this.el.getElement('.dropTriggerContainer').removeClass('selectedDropTriggerContainerBorderBottom');
//                this.el.getElement('.dropTriggerArrow').removeClass('selectedDropTriggerArrow');
//            }
        }
        else {
            this.el.getElement('.dropList').removeClass('errorDropList');
            this.el.getElement('.dropTriggerContainer').addClass('errorDropTriggerContainerBottom');
        }
        if (this.el.getElement('.dropTrigger').innerHTML != '' && this.el.getElement('.dropTrigger').innerHTML.length > 25) {
            this.el.getElement('.dropTrigger').innerHTML = this.el.getElement('.dropTrigger').innerHTML.substring(0, 24) + "...";
        }
        if (this.el.getElement('.dropTrigger').getSize().y >32) {
            this.el.getElement('.dropTrigger').setStyle('height', '32px');
        }
        //this.el.getElement('.handle').addClass('rfgHidden');
        this.el.getElement('.dropTrigger').focus();
    },
    toggleDropdown: function() {
        if (this.el.getElement('.dropListContainer').hasClass('rfgHidden'))
            this.openDropdown();
        else
            this.closeDropdown();
    },
    focusDown: function() {
        if (this.focusItem >= 0)
            if (this.focusItem + 1 < this.el.getElement('.dropList').getElements('a').length)
            this.focusItem += 1;
        this.setFocus();
    },
    focusUp: function() {
        if (this.focusItem > 0)
            this.focusItem -= 1;
        this.setFocus();
    },
    setFocus: function() {
        var optionsEl = this.el.getElement('.dropList');
        var me = this;
        optionsEl.getElements('a').each(function(a, i) {
            if (me.focusItem == i) {
                a.focus();
            }
        });
    }

});

Dropdown.HTML_TEMPLATE =
	'<div class="rfgInputGroup">\
		<div class="dropTriggerContainer">\
		    <a href="javascript:void(0);" class="dropTriggerArrow"></a>\
		    <a href="javascript:void(0);" class="dropTrigger"></a>\
		</div>\
		<div class="dropContainer">\
		    <div id="dropListContainer" class="dropListContainer rfgHidden">\
		        <ul id="dropList" class="dropList"></ul>\
		    </div>\
            <div id="rfgDropSlider" rel="rfgDrop" class="scrollbox_slider rfgHidden">\</div>\
        </div>\
	</div>';


RFG = {
    init: function() {
        window.addEvent('domready', function() {
            if (!RFG.alreadyInitialized) {
                RFG.Body = $('rfgBody');
                RFG.Url = location.href;
                RFG.PageLoader.init(RFG.Url);
                RFG.alreadyInitialized = true;
            }
        });
        window.addEvent('domready', function() {
            var r = $$('input[type=radio]');
            for (i = 0; i < r.length; i++) {
                p = r[i].getParent();
                //brother = r[i].nextSibling;
                if (typeof (p) !== 'undefined' && p !== null) {
                    r[i].addClass('radioNotDisplayed');
                    //  if (brother)
                    //      brother.className = "radioNotDisplayed";

                    var element = document.createElement('a');
                    element.id = "a_" + r[i].id;
                    element.className = "styledRadioButton";
                    if (p.tagName.contains('TD'))
                        element.href = "javascript:radioSelectedChange('" + element.id + "', '1');";
                    else
                        element.href = "javascript:radioSelectedChange('" + element.id + "', '2');";
                    //if (brother)
                    //    element.innerHTML = brother.innerHTML;
                    //else

                    var temp = jQuery("#" + r[i].id);
                    p.replaceChild(element, r[i]);
                    //element.appendChild(temp);
                    jQuery("#" + element.id).html(temp[0]);
                    jQuery("#" + r[i].id).before("&nbsp;");

                    var lb = element.nextSibling;
                    var bd = $$('body')[0];

                    if (lb != null) {
                        if (typeof (lb) !== 'undefined' && lb != null && lb.nodeName == "LABEL") {
                            if ($(bd).className.contains('rfgBrowser_IE rfgBrowserMajVersion_10 rfgBrowserId_ie6to9')) {
                                //for IE6
                                lb.attachEvent('onclick', function(e) { radioSelectedChange($($(e.srcElement).get('for')).getParent().id, 2); });
                            } else {
                                $(lb).set('onclick', "javascript:radioSelectedChange('" + element.id + "', '2');");
                            }
                        } else if (lb.nodeName == "#text") {
                            lb = $(element).getParent().getElements('label')[0];
                            if ($(bd).className.contains('rfgBrowser_IE rfgBrowserMajVersion_10 rfgBrowserId_ie6to9')) {
                                //for IE6
                                lb.attachEvent('onclick', function(e) { radioSelectedChange($($(e.srcElement).get('for')).getParent().id, 2); });
                            } else {
                                $(lb).set('onclick', "javascript:radioSelectedChange('" + element.id + "', '2');");
                            }
                        }
                    }

                    //                    if (brother) {
                    //                        p.replaceChild(element, brother);
                    //                        element.appendChild(brother);
                    //                    }

                }
            }

            for (i = 0; i < r.length; i++) {
                if (r[i].checked) {
                    var a = "a_" + r[i].id;
                    if (r[i].parentNode.parentNode.tagName.contains('TD'))
                        radioSelectedChange(a, '1');
                    else
                        radioSelectedChange(a, '2');
                }
                var table = r[i].parentNode.parentNode.parentNode.parentNode.parentNode;

                if (table && table.tagName.contains('TABLE') && !table.className.contains(' radioButtons'))
                    table.className += ' radioButtons';
            }

            var checkboxes = $$('input[type=checkbox]');
            for (i = 0; i < checkboxes.length; i++) {
                p = checkboxes[i].getParent();
                //brother = checkboxes[i].nextSibling;
                if (typeof (p) !== 'undefined' && p !== null) {
                    checkboxes[i].addClass('radioNotDisplayed');
                    //if (brother)
                    //  brother.className = "radioNotDisplayed";

                    var element = document.createElement('a');
                    element.id = "a_" + checkboxes[i].id;
                    element.className = "styledCheckbox";
                    element.href = "javascript:radioSelectedChange('" + element.id + "', '2');";
                    //if (brother)
                    //    element.innerHTML = brother.innerHTML;
                    // else
                    //element.innerHTML = "&nbsp;";

                    var temp = jQuery("#" + checkboxes[i].id);
                    p.replaceChild(element, checkboxes[i]);
                    //element.appendChild(checkboxes[i]);
                    jQuery("#" + element.id).html(temp[0]);
                    jQuery("#" + checkboxes[i].id).before("&nbsp;");

                    //                    $(checkboxes[i]).addEvent('click', function() {
                    //                        alert('test 1');
                    //                    });

                    //                    $(checkboxes[i]).addEvent('change', function() {
                    //                        alert('test 2');
                    //                    });


                    $(checkboxes[i]).addEvent('change', function(el) {
                        toggleCheck(this);
                    } .bind(element));

                    //                    var lb = element.nextSibling;
                    //                    if (typeof (lb) !== 'undefined' && lb != null && lb.nodeName == "LABEL") {
                    //                        $(lb).set('onclick', "javascript:toggleCheck('" + element.id + "');");
                    //                    }

                    //if (brother) {
                    //    p.replaceChild(element, brother);
                    //     element.appendChild(brother);
                    //}
                }
            }

            for (i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    var a = "a_" + checkboxes[i].id;
                    radioSelectedChange(a, '2');
                }

                var table = checkboxes[i].parentNode.parentNode;

                if (table && table.tagName.contains('DIV') && !table.className.contains(' choices'))
                    table.className += ' choices';

            }

            //add hover effect to check/radio labels
            var lbs = $$("label");
            for (var i = 0; i < lbs.length; i++) {
                //check if label is for check/radio
                var target = $($(lbs[i]).get('for'));
                if ($(target).get('type') == 'checkbox') {
                    $(lbs[i]).addEvent('mouseover', function() {
                        this.getParent().addClass("styledCheckboxLabelHover");
                    } .bind($(target)));
                    $(lbs[i]).addEvent('mouseout', function() {
                        this.getParent().removeClass("styledCheckboxLabelHover");
                    } .bind($(target)));
                }
                if ($(target).get('type') == 'radio') {
                    $(lbs[i]).addEvent('mouseover', function() {
                        this.getParent().addClass("styledRadioLabelHover");
                    } .bind($(target)));
                    $(lbs[i]).addEvent('mouseout', function() {
                        this.getParent().removeClass("styledRadioLabelHover");
                    } .bind($(target)));
                }
            }

            try { inputColorChange(); } catch (e) { }
            try { adjustMinHeight(); } catch (e) { }
            try { setFileUploadSize(); } catch (e) { }
        });
    },

    PageLoader: {
        init: function(page) {
            this.skinUIElements();
        },
        skinUIElements: function() {
            RFG.Body.getElements('select').each(function(el) {
                new Dropdown(el);
            });
        }
    }
};
RFG.alreadyInitialized = false;
document.addEvent('domready', function() {
    RFG.init();
});

