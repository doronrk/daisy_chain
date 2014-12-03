OG.Controller = {

    submit: function(){
        var product_discount = null;
        var qty = 0;
        var every = 0;
        var every_period = 0;
        var discount_obj = {};
        
        try {
            var every_obj = OG.widgets[OG.widget_id].get_og_frequency();
            discount_obj = OG.widgets[OG.widget_id].get_og_discount_obj();
            
            every = every_obj['every'];
            every_period = every_obj['every_period'];
        } catch(err) { console.log(err); }
        
        var attributes = null;
        var quantity = 1;
        try { quantity = document.getElementById('QuantityWanted').value; }
        catch(err) { console.log(err); }

        var select = document.getElementById('product-selector');
        if (select !== null) {
            var option = select.options[select.selectedIndex];
            var product_id = option.getAttribute('value');
            var weight = parseFloat(option.getAttribute('rel'));
            attributes = {"weight":weight.toFixed(4)};
            og_settings.product.id = product_id;
        } else {
            var product_id_array = og_settings.product.id.split(' ');
            if (product_id_array.length > 0) {
                var weight = Math.round(product_id_array[product_id_array.length-1]);
                weight = parseFloat(weight/16);
                attributes = {"weight":weight.toFixed(4)};
            }
        }

        if (Math.round(quantity) !== 0) { qty = Math.round(quantity); }
        OG.CartManager.add_product(qty, every, every_period, discount_obj, attributes, null);
    },

    see_details: function(e){
        document.getElementById('og_see_details_div').style.display='table';
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
    },

    hide_see_details: function(e){
        document.getElementById('og_see_details_div').style.display='none';
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
    },

    init: function(){
        // Default value...
        OG.widget_id = 0;
        
        for(widget in OG.widgets){
            OG.widget_id = widget;
            console.log(widget);

            //insert html
            var og_div = document.getElementById('og-div');
            og_div.innerHTML = OG.widgets[widget].html;

            var add_to_cart = document.getElementById('add-to-cart');
            OG.EventManager.addEvent(add_to_cart, "click", OG.Controller.submit);

            // see details action
            try {
                var open_details = document.getElementById('og_about');
              	OG.EventManager.addEvent(open_details, "click", OG.Controller.see_details);

                // close see details popup
                var close_details = document.getElementById('og_see_details_close_popup');
              	OG.EventManager.addEvent(close_details, "click", OG.Controller.hide_see_details);
            } catch (err) {
                // console.log(err);
            }
            
            try { OG.widgets[OG.widget_id].init(); }
            catch (err) { console.log(err); }
        }
    }
}
OG.core_model.write_offer_request('1');
OG.EventManager.onDOMReady(OG.Controller.init);