/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Varien
 * @package     js
 * @copyright   Copyright (c) 2012 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
if (typeof Product == 'undefined') {
    var Product = {};
}

/**************************** CONFIGURABLE PRODUCT **************************/
Product.Config = Class.create();
Product.Config.prototype = {
    initialize: function(config){
        this.config     = config;
        this.taxConfig  = this.config.taxConfig;
        if (config.containerId) {
            this.settings   = $$('#' + config.containerId + ' ' + '.super-attribute-select');
        } else {
            this.settings   = $$('.super-attribute-select');
        }
        this.state      = new Hash();
        this.priceTemplate = new Template(this.config.template);
        this.prices     = config.prices;

        // Set default values from config
        if (config.defaultValues) {
            this.values = config.defaultValues;
        }

        // Overwrite defaults by url
        /*var separatorIndex = window.location.href.indexOf('#');
        if (separatorIndex != -1) {
            var paramsStr = window.location.href.substr(separatorIndex+1);
            var urlValues = paramsStr.toQueryParams();
            if (!this.values) {
                this.values = {};
            }
            for (var i in urlValues) {
                this.values[i] = urlValues[i];
            }
        }*/

        // Overwrite defaults by inputs values if needed
        if (config.inputsInitialized) {
            this.values = {};
            this.settings.each(function(element) {
                if (element.value) {
                    var attributeId = element.id.replace(/[a-z]*/, '');
                    this.values[attributeId] = element.value;
                }
            }.bind(this));
        }

        // Put events to check select reloads
        this.settings.each(function(element){
            Event.observe(element, 'change', this.configure.bind(this))
        }.bind(this));

        // fill state
        this.settings.each(function(element){
            var attributeId = element.id.replace(/[a-z]*/, '');
            if(attributeId && this.config.attributes[attributeId]) {
                element.config = this.config.attributes[attributeId];
                element.attributeId = attributeId;
                this.state[attributeId] = false;

                // fill swatches
                this.fillSwatches(element);
            }
        }.bind(this))

        // Init settings dropdown
        var childSettings = [];
        for(var i=this.settings.length-1;i>=0;i--){
            var prevSetting = this.settings[i-1] ? this.settings[i-1] : false;
            var nextSetting = this.settings[i+1] ? this.settings[i+1] : false;
            if (i == 0){
                this.fillSelect(this.settings[i])
                this.fillSwatches(this.settings[i]);
            } else {
                this.settings[i].disabled = true;
            }
            $(this.settings[i]).childSettings = childSettings.clone();
            $(this.settings[i]).prevSetting   = prevSetting;
            $(this.settings[i]).nextSetting   = nextSetting;
            childSettings.push(this.settings[i]);
        }

        // Set values to inputs
        this.configureForValues();
        document.observe("dom:loaded", this.configureForValues.bind(this));
    },

    configureForValues: function () {
        if (this.values) {
            this.settings.each(function(element){
                var attributeId = element.attributeId;
                element.value = (typeof(this.values[attributeId]) == 'undefined')? '' : this.values[attributeId];
                this.configureElement(element);
            }.bind(this));
        }
    },

    configure: function(event){
        var element = Event.element(event);
        this.configureElement(element);
    },

    configureElement : function(element) {
        this.reloadOptionLabels(element);
        if(element.value){
            this.state[element.config.id] = element.value;
            if(element.nextSetting){
                element.nextSetting.disabled = false;
                this.fillSelect(element.nextSetting);
                this.fillSwatches(element.nextSetting);
                this.resetChildren(element.nextSetting);
            }
        }
        else {
            this.resetChildren(element);
        }
        this.reloadPrice();
    },

    reloadOptionLabels: function(element){
        var selectedPrice;
        if(element.options[element.selectedIndex].config && !this.config.stablePrices){
            selectedPrice = parseFloat(element.options[element.selectedIndex].config.price)
        }
        else{
            selectedPrice = 0;
        }
        for(var i=0;i<element.options.length;i++){
            if(element.options[i].config){
                element.options[i].text = this.getOptionLabel(element.options[i].config, element.options[i].config.price-selectedPrice);
            }
        }
    },

    resetChildren : function(element){
        if(element.childSettings) {
            for(var i=0;i<element.childSettings.length;i++){
                element.childSettings[i].selectedIndex = 0;
                element.childSettings[i].disabled = true;
                if(element.config){
                    this.state[element.config.id] = false;
                }
            }
        }
    },

    fillSelect: function(element){
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
                    if (typeof options[i].price != 'undefined') {
                        element.options[index].setAttribute('price', options[i].price);
                    }
                    element.options[index].config = options[i];
                    index++;
                }
            }
        }
    },

    fillSwatches: function(element){
        var attributeId = element.id.replace(/[a-z]*/, '');
        var swatches = this.getAttributeSwatches(attributeId);
        var options = new Array();
        var labels = new Array();
        var sale = this.getAttributesOnSale(attributeId);

        // build options array
        var index = 0;
        $$('#attribute'+attributeId + ' option').each(function(element){
            if (element.value != ''){
                options[index] = element.value;
                labels[element.value] = element.text;
                index++;
            }
        });
        
		/*remove colorSale div if no color sales exit*/
        if (attributeId == 1034 && sale == "") {
    		jQuery('#colorSaleWrapper').hide();
        }
       
        // remove options if they exist since we'll be replacing them from the last load
        if ($('swatch'+attributeId).innerHTML != ''){
            $('swatch'+attributeId).innerHTML = '';
        }

        for (var i=0;i<swatches.length;i++){
            if (this.swatchExists(swatches[i].option_id, options)){

                // add swatch to DOM
                swatches[i].img = new Element('img',{src: MEDIA_URL + 'attribute_swatches/'+swatches[i].path});
                swatches[i].anchor = new Element('a', {
                    href: 'javascript:void(0)',
                    'class': 'colorswatch',
                    alt: labels[swatches[i].option_id],
                    title: labels[swatches[i].option_id]
                });
                swatches[i].anchor.insert(swatches[i].img);

                swatches[i].anchor.observe('click', function(e) {
                    var event_ch = 'change';
                    var element = $('attribute'+attributeId);

                    //fire change event
                    element.value = this;
                    if (document.createEvent) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent(event_ch, true, false);
                        return !element.dispatchEvent(evt);
                    }
                    else {
                    	var evt = document.createEventObject();
                        return element.fireEvent('on'+event_ch,evt)
                    }
                }.bind(swatches[i].option_id));

                if (this.swatchExists(swatches[i].option_id, sale)) {
                    $('saleSwatch' + attributeId).insert(swatches[i].anchor);
                } else {
                    $('swatch' + attributeId).insert(swatches[i].anchor);
                }
            } else {
                // add disabled swatch to DOM
                swatches[i].img = new Element('img',{src: '/media/attribute_swatches/'+swatches[i].path});
                swatches[i].anchor = new Element('a', {href: 'javascript:void(0)', 'class': 'colorswatch-disabled'});
                swatches[i].anchor.insert(swatches[i].img);

                swatches[i].anchor.observe('click', function() {
                    var event_ch = 'change';
                    var element = $('attribute'+attributeId);

                    //fire change event
                    element.value = this;
                    if (document.createEvent) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent(event_ch, true, false);
                        return !element.dispatchEvent(evt);
                    }
                    else {
                    	var evt = document.createEventObject();
                        return element.fireEvent('on'+event_ch,evt)
                    }
                }.bind(swatches[i].option_id));

                if (this.swatchExists(swatches[i].option_id, sale)) {
                    //$('saleSwatch' + attributeId).insert(swatches[i].anchor);
                } else {
                    $('swatch' + attributeId).insert(swatches[i].anchor);
                }
            }
        }
        
        /*@todo fix this to be more efficient and not have css changes
         * Work around for hiding / showing top color swatch*/
        if (attributeId == 1034) {
        	if (jQuery('#swatch1034 a').length < 1) {
		        jQuery('.colorswatch-dt').hide();
				jQuery('.options-container-big, #product-options-wrapper').css("border-top", "none");
	        } else {
	        	jQuery('.colorswatch-dt').show();
				//jQuery('.options-container-big, #product-options-wrapper').css("border-top", "1px solid #d0d0d0");
	        }
        }      

    },

    swatchExists: function(needle, haystack){
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
    },

    getSelectedProductId: function()
    {
         var existingProducts = new Object();
         for(var i=this.settings.length-1;i>=0;i--)
         {
             var selected = this.settings[i].options[this.settings[i].selectedIndex];
             if(typeof(selected.config) != 'undefined')
             {
                for(var iproducts=0;iproducts<selected.config.products.length;iproducts++)
                {
                    var usedAsKey = selected.config.products[iproducts]+"";
                    if(existingProducts[usedAsKey]==undefined)
                    {
                        existingProducts[usedAsKey]=1;
                    }
                    else
                    {
                        existingProducts[usedAsKey]=existingProducts[usedAsKey]+1;
                    }
                 }
             }
         }
         for (var keyValue in existingProducts)
         {
            for ( var keyValueInner in existingProducts)
             {
                if(Number(existingProducts[keyValueInner])<Number(existingProducts[keyValue]))
                {
                    delete existingProducts[keyValueInner];
                }
             }
         }
         var sizeOfExistingProducts=0;
         var currentSimpleProductId = "";
         for ( var keyValue in existingProducts)
         {
            currentSimpleProductId = keyValue;
            sizeOfExistingProducts=sizeOfExistingProducts+1
         }
         if(sizeOfExistingProducts==1)
         {
            return currentSimpleProductId;
         } else {
            return 0;
         }
    },

    getOptionLabel: function(option, price){
        var price = parseFloat(price);
        if (this.taxConfig.includeTax) {
            var tax = price / (100 + this.taxConfig.defaultTax) * this.taxConfig.defaultTax;
            var excl = price - tax;
            var incl = excl*(1+(this.taxConfig.currentTax/100));
        } else {
            var tax = price * (this.taxConfig.currentTax / 100);
            var excl = price;
            var incl = excl + tax;
        }

        if (this.taxConfig.showIncludeTax || this.taxConfig.showBothPrices) {
            price = incl;
        } else {
            price = excl;
        }

        var str = option.label;
        if(price){
            if (this.taxConfig.showBothPrices) {
                str+= ' ' + this.formatPrice(excl, true) + ' (' + this.formatPrice(price, true) + ' ' + this.taxConfig.inclTaxTitle + ')';
            } else {
                str+= ' ' + this.formatPrice(price, true);
            }
        }
        return str;
    },

    formatPrice: function(price, showSign){
        var str = '';
        price = parseFloat(price);
        if(showSign){
            if(price<0){
                str+= '-';
                price = -price;
            }
            else{
                str+= '+';
            }
        }

        var roundedPrice = (Math.round(price*100)/100).toString();

        if (this.prices && this.prices[roundedPrice]) {
            str+= this.prices[roundedPrice];
        }
        else {
            str+= this.priceTemplate.evaluate({price:price.toFixed(2)});
        }
        return str;
    },

    clearSelect: function(element){
        for(var i=element.options.length-1;i>=0;i--){
            element.remove(i);
        }
    },

    getAttributeOptions: function(attributeId){
        if(this.config.attributes[attributeId]){
            return this.config.attributes[attributeId].options;
        }
    },

    getAttributeSwatches: function(attributeId){
        if(this.config.attributes[attributeId]){
            return this.config.attributes[attributeId].swatches;
        }
    },

    getAttributesOnSale: function(attributeId){
        if(this.config.attributes[attributeId]){
            return this.config.attributes[attributeId].sale;
        }
    },

    reloadPrice: function(){
        if (this.config.disablePriceReload) {
            return;
        }
        var price    = 0;
        var oldPrice = 0;
        for(var i=this.settings.length-1;i>=0;i--){
            var selected = this.settings[i].options[this.settings[i].selectedIndex];
            if(selected.config){
                price    += parseFloat(selected.config.price);
                oldPrice += parseFloat(selected.config.oldPrice);
            }
        }

        optionsPrice.changePrice('config', {'price': price, 'oldPrice': oldPrice});
        optionsPrice.reload();

        return price;

        if($('product-price-'+this.config.productId)){
            $('product-price-'+this.config.productId).innerHTML = price;
        }
        this.reloadOldPrice();
    },

    reloadOldPrice: function(){
        if (this.config.disablePriceReload) {
            return;
        }
        if ($('old-price-'+this.config.productId)) {

            var price = parseFloat(this.config.oldPrice);
            for(var i=this.settings.length-1;i>=0;i--){
                var selected = this.settings[i].options[this.settings[i].selectedIndex];
                if(selected.config){
                    price+= parseFloat(selected.config.price);
                }
            }
            if (price < 0)
                price = 0;
            price = this.formatPrice(price);

            if($('old-price-'+this.config.productId)){
                $('old-price-'+this.config.productId).innerHTML = price;
            }

        }
    }
}
