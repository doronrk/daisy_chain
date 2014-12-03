
Product.ConfigurableSwatches = Class.create({
    initialize: function(swatches){
        this.swatches = swatches;
        
        // find id configurable_swatch_<attrCode>
        $H(this.swatches).each(function(attr){
            var attrCode = attr[0];
            var valueArray = attr[1];

            if($('configurable_swatch_' + attrCode)){
                $$('#configurable_swatch_' + attrCode + ' a').each(function(el){
                    var el = $(el);
                    var theSelect = el.up(1).siblings()[0];
                    
                    el.observe('click', function(event){
                        if($(this).up('li').hasClassName('enabled')){
                            //-- remove class from other anchors 
                            $$('#configurable_swatch_' + attrCode + ' li').invoke('removeClassName', 'active');  

                            //-- add active class to it
                            $(this).up('li').addClassName('active');

                            //-- change select value
                            var elFullId = el.id;
                            var elId = elFullId.replace(/[^0-9]{1,}/, '');
                            for(i=1;i<theSelect.options.length;i++){
                                if(theSelect.options[i].value == elId){
                                    theSelect.options[i].selected = true;
                                    //-- fire the onChange event
                                    //-- On IE
                                    if (theSelect.fireEvent) {
                                        theSelect.fireEvent('onchange');
                                    }
                                    //-- On Gecko based browsers
                                    if (document.createEvent) {
                                        var evt = document.createEvent('HTMLEvents');
                                        if (evt.initEvent) {
                                            evt.initEvent('change', true, true);
                                        }
                                        if(theSelect.dispatchEvent) {
                                            theSelect.dispatchEvent(evt);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    });
                });
            }
        });
        this.overwriteProductConfigMethods();

        if($$('.super-attribute-select').length > 0) {
            spConfig.fillSelect($$('.super-attribute-select')[0]);
        }
    },
    overwriteProductConfigMethods: function() {
        var swatches = this.swatches;
        
        //-- Copied from js/varien/product.js, line 344 - using 'spConfig' initialized in configurable.phtml. Edits are at bottom.
        spConfig.fillSelect = function(element){
            var attributeId = element.id.replace(/[a-z]*/, '');
            var options = this.getAttributeOptions(attributeId);
            this.clearSelect(element);
            element.options[0] = new Option(this.config.chooseText, '');

            var prevConfig = false;
            if(element.prevSetting){
                prevConfig = element.prevSetting.options[element.prevSetting.selectedIndex];
            }

            if(options) {
                var index = 1;
                for(var i=0;i<options.length;i++){
                    var allowedProducts = [];
                    if(prevConfig) {
                        for(var j=0;j<options[i].products.length;j++){
                            if(prevConfig.config.allowedProducts
                                && prevConfig.config.allowedProducts.indexOf(options[i].products[j])>-1){
                                allowedProducts.push(options[i].products[j]);
                            }
                        }
                    } else {
                        allowedProducts = options[i].products.clone();
                    }

                    if(allowedProducts.size()>0){
                        options[i].allowedProducts = allowedProducts;
                        element.options[index] = new Option(this.getOptionLabel(options[i], options[i].price), options[i].id);
                        element.options[index].config = options[i];
                        index++;
                    }
                }
            }
            
            //-- BEGIN EDIT: kevin@classyllama.com --//
            //-- another way to get attributeId:
            /*
                var attributeId = 0;
                element.id.sub(/[0-9]+/, function(match){
                    attributeId = match[0];
                });
            */
            if(typeof(csConfig) != 'undefined'){
                var swatches = csConfig.swatches;
            } 
            if(typeof(swatches) == 'undefined'){
                var swatches = {};
            }
            // if element = select with configurable swatches, show applicable swatches
            $H(swatches).each(function(attr){
                var swatchId = attr[1].attrId;
                var attrCode = attr[0];
                if(attributeId == swatchId) {
                    if(element.siblings('ul').length > 0) {
                        // find elements in select element and enable them, disabling the rest
                        element.siblings('ul')[0].childElements()
                            .invoke('removeClassName', 'enabled')
                            .invoke('addClassName', 'disabled');
                        if(element.options.length>0){
                            var i = 0;
                            element.childElements().each(function(el){
                               if(i) {
                                   $$('#option'+el.value).invoke('removeClassName', 'disabled').invoke('addClassName', 'enabled');
                               }
                               i++;
                            });
                        }
                        $$('#configurable_swatch_'+attrCode+' li.active').invoke('removeClassName', 'active');
                    }
                }
            });
            $$('.configurable-swatch li.disabled a').invoke('writeAttribute', 'onclick', 'Event.stop(event); return false;');
            $$('.configurable-swatch li.enabled a').invoke('removeAttribute', 'onclick');

            //-- END EDIT --//
        };
    }
});
