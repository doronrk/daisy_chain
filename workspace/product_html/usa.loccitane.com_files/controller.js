if(typeof(OG.widgets) === 'undefined'){OG.widgets = {};}
//input variables are for minification purposes
(function(doc) {

    init();
    var qty_select;

    OG.Controller = {
        init: init
        , selected_product_id: "0"
        , getQuantity: getQuantity
        , selectProduct: selectProduct
        , type: '1'
    };

    var i, input, inputs = doc.getElementsByTagName('input');
    for (i=0; i < inputs.length; ++i) {
        input = inputs[i];
        if (input.getAttribute('data-og-product') && input.checked) {
            OG.Controller.selected_product_id = input.getAttribute('data-og-product');
            break;
        }
    }

    var select, selects = doc.getElementsByTagName('select');
    for (i=0; i < selects.length; ++i) {
        select = selects[i];
        if (select.getAttribute('data-og-id') === 'qty') {
            qty_select = select;
            break;
        }
    }

    function init() {
        if (OG.CookieManager.getCookie('oneTimeOrder')) {
            OG.core_model.writeAdditionalJavascript('12/IUController.min.js');
            OG.impulse_active = true;
        } else {
            OG.common.writeCartRequest();
            OG.core_model.write_offer_request('1',false);
        }
        OG.EventManager.addBodyEvent({
            addToBag: addToBag,
            selectProduct: selectProduct
        });
    }

    function getQuantity() {
        if (qty_select) { return qty_select[qty_select.selectedIndex].value; }
        else { return "1"; }
    }

    function selectProduct(target) {
        var productId = target.getAttribute('data-og-product');

        if (!OG.impulse_active) { 
            if(OG.product_offer_map[productId] !== '0' && OG.widgets[OG.product_offer_map[productId]].init) {
                OG.widgets[OG.product_offer_map[productId]].init(productId); 
            }
            else {
                document.getElementById("og-div").innerHTML = '';
            }
        }
        else { 
            OG.Controller.fillImpulseDiv(); 
        }

        OG.Controller.selected_product_id = productId;
    }

    function addToBag() {
        if (!OG.impulse_active) {
            var productId = OG.Controller.selected_product_id;
            var freqObj = OG.widgets[OG.product_offer_map[productId]].get_frequency(productId);
            OG.common.addProduct(productId, getQuantity(), freqObj.every, freqObj.every_period);
        }
    }
} (document));
