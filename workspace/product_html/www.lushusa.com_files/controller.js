if(typeof(OG.widgets) === 'undefined'){OG.widgets = {};}
//input variables are for minification purposes
(function(doc) {

    OG.common.initNextAjax();

    OG.Controller = {
        kickstart: kickstart
    };

    function kickstart() {

        if(typeof og_settings.offer_products == "string"){
            // Ugly fix, cause the implementation in not being follow correctly
            og_settings.offer_products = [og_settings.offer_products]
        }

        if (OG.CookieManager.getCookie('oneTimeOrder')) {
            OG.core_model.writeAdditionalJavascript('12/IUController.min.js');
            OG.impulse_active = true;
        } else {
            OG.common.writeCartRequest();
            OG.core_model.write_offer_request('1',false);
        }

        (function(){
            if(typeof OG.product_offer_map != "undefined" && !OG.common.isEmptyObj(OG.product_offer_map)){
                var select = document.getElementsByClassName('variation-select')[0];
                if (select) {
                    OG.EventManager.addEvent(select, 'change', updateOGDiv);
                }
                updateOGDiv();
            }else{
                setTimeout(arguments.callee, 30);
                return;
            }
        })();
    }

    function updateOGDiv() {
        var productId = getSelectedProduct();
        if (OG.product_offer_map[productId] !== "0" && productId !== "0") {
            (function(){
                if(typeof OG.widgets[OG.product_offer_map[productId]] !="undefined"){
                    OG.widgets[OG.product_offer_map[productId]].init(productId);
                }else{
                    setTimeout(arguments.callee, 30);
                    return;
                }
            })();
        } else {
            document.getElementById('og-div').innerHTML = '';
        }
    }

    function getSelectedProduct() {
        if (og_settings.product) {
            return og_settings.product.id;
        } else if (og_settings.offer_products) {
            var productId;
            if (typeof og_settings.offer_products == "string"){
                productId = og_settings.offer_products;
            } else if(typeof og_settings.offer_products == "object" && typeof og_settings.offer_products[0] != "undefined") {
                if(typeof document.getElementsByClassName('variation-select')[0]!="undefined"){
                    var select = document.getElementsByClassName('variation-select')[0];
                    if (select.options[select.selectedIndex].hasAttribute('data-og-product')){
                        productId = select.options[select.selectedIndex].getAttribute('data-og-product');
                        console.log(select.options[select.selectedIndex], productId, OG.product_offer_map);
                    } else {
                        productId = "0";
                    }
                }else{
                    //Combo doesn't exist and single product is an array
                    productId = og_settings.offer_products[0];
                }
            } else {
                productId = "0";
            }
            OG.Controller.selected_product_id = productId;
            return productId;
        }
    }

    function init() {
        OG.core_model.write_offer_request('1',false);
        OG.EventManager.addBodyEvent({
            addToCart: addToCart
        });
    }

    function getQuantity() {
        var quantity = doc.getElementById('Quantity').value;
        if (quantity === "0") {
            quantity = "1";
        }
        return quantity;
    }

    OG.eventHandlers.addToCart = function addToCart() {
        var freqObj = {"every":0, "every_period":0};
        var productId = getSelectedProduct();
        if (OG.widgets && OG.product_offer_map && OG.widgets[OG.product_offer_map[productId]]) {
            freqObj = OG.common.getFrequency(productId);
        }
        OG.common.addProduct(productId, getQuantity(), freqObj.every, freqObj.every_period);
    }
} (document));
