/**
 * Magento Enterprise Edition
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magento Enterprise Edition License
 * that is bundled with this package in the file LICENSE_EE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.magentocommerce.com/license/enterprise-edition
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
 * @copyright   Copyright (c) 2011 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://www.magentocommerce.com/license/enterprise-edition
 */
if (typeof Product == 'undefined') {
    var Product = {};
}

/**************************** CONFIGURABLE PRODUCT **************************/
/**************************** CONFIGURABLE PRODUCT **************************/
Product.Config = Class.create();
Product.Config.prototype = {
    initialize: function(config){
        this.config     = config;
        this.taxConfig  = this.config.taxConfig;
        this.settings   = $$('.super-attribute-select');
        this.state      = new Hash();
        this.priceTemplate = new Template(this.config.template);
        this.prices     = config.prices;
        this.defaultAttrId    = '';
        this.defaultAttrValue = '';
        this.defaultRingSize  = '';
        this.defaultChainLength = '';
        this.defaultBraceletSize = '';
        //Var to store all the metal type images.
        this.metalImages = new Array();
		
        this.settings.each(function(element){
            Event.observe(element, 'change', this.configure.bind(this))
        }.bind(this));

        // fill state
        this.settings.each(function(element){
            var attributeId = element.id.replace(/[a-z]*/, '');
            if(attributeId && this.config.attributes[attributeId]) {
            	
                    // Set the Ring-size, Chain-length and Bracelet-size values.
                    this.defaultRingSize  = config.ProductsDefaultRingSize;
                    this.defaultChainLength = config.ProductsDefaultChainLength;
                    this.defaultBraceletSize = config.ProductsDefaultBraceletSize;

                    // Loop to display images for all metal types.
                    for (counter = 0; counter <= this.config.attributes[attributeId].options.length - 1; counter++) {
                        // Store the image-classname in an array var.
                        

                        // Store the products.
                        var allowedProducts = this.config.attributes[attributeId].options[counter].products;

                        if (allowedProducts) {
                            // Loop to check, for the currently want to display as selected item.
                            for (var a = 0; a <= allowedProducts.length - 1; a++) {
                                if (this.defaultAttrValue == '' && allowedProducts[a] == this.config.ProductsDefaultId) {
                                    this.defaultAttrId = attributeId;
                                    this.defaultAttrValue = this.config.attributes[attributeId].options[counter].id;
                                    break;
                                }
                            }
                        }
                        if ('metal' == this.config.attributes[attributeId].code) {
                        	this.metalImages[counter] = this.config.attributes[attributeId].options[counter].id;
	                        // Wether to display the image as selected or not.
	                        if (this.config.attributes[attributeId].options[counter].id == this.defaultAttrValue) {
	                            var selImage = 'none;';
	                        } else {
	                            var selImage = 'none;';
	                        }
							var img_url = this.config.attributes[attributeId].options[counter].label
							img_url = img_url.split(' ').join('_');
	
	                        // Set the images for the Metal-Type.
	                        var img = '<img src="'+this.config.MediaUrl+img_url+'.gif" title="'+this.config.attributes[attributeId].options[counter].label+'" class="'+this.config.attributes[attributeId].options[counter].id+'" id="'+this.config.attributes[attributeId].id+'" style="cursor: pointer; border: '+selImage+'" onclick="updateRelated('+this.config.attributes[attributeId].options[counter].products+');select_metal_type('+this.config.attributes[attributeId].options[counter].id+');spConfig.getIdOfSelectedProductImg('+this.config.attributes[attributeId].options[counter].products+');show_product_data('+attributeId+', '+this.config.attributes[attributeId].options[counter].id+');" />&nbsp;';
	                        $('div' + attributeId).innerHTML += img;
                        }
                    }

                element.config = this.config.attributes[attributeId];
                element.attributeId = attributeId;
                this.state[attributeId] = false;
            }
        }.bind(this))

        // Init settings dropdown
        var childSettings = [];
        for(var i=this.settings.length-1;i>=0;i--){
            var prevSetting = this.settings[i-1] ? this.settings[i-1] : false;
            var nextSetting = this.settings[i+1] ? this.settings[i+1] : false;
            if(i==0){
                this.fillSelect(this.settings[i])
            }
            else {
                this.settings[i].disabled=true;
            }
            $(this.settings[i]).childSettings = childSettings.clone();
            $(this.settings[i]).prevSetting   = prevSetting;
            $(this.settings[i]).nextSetting   = nextSetting;
            childSettings.push(this.settings[i]);
        }

        // Set default values - from config and overwrite them by url values
        if (config.defaultValues) {
            this.values = config.defaultValues;
        }

        var separatorIndex = window.location.href.indexOf('#');
        if (separatorIndex != -1) {
            var paramsStr = window.location.href.substr(separatorIndex+1);
            var urlValues = paramsStr.toQueryParams();
            if (!this.values) {
                this.values = {};
            }
            for (var i in urlValues) {
                this.values[i] = urlValues[i];
            }
        }

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
                this.resetChildren(element.nextSetting);
            }
        }
		else if ($('custom_attr_'+element.className) && $('custom_attr_'+element.className).value) {
	            if(this.settings[1]){
	                this.settings[1].disabled = false;
	                this.fillSelect(this.settings[1]);
	                this.resetChildren(this.settings[1]);
	            }
        }
        else {
            this.resetChildren(element);
        }
        this.reloadPrice();
//      Calculator.updatePrice();
    },

    reloadOptionLabels: function(element){
        var selectedPrice;
      /*  if(element.options[element.selectedIndex].config){
            selectedPrice = parseFloat(element.options[element.selectedIndex].config.price)
        }
        else{
            selectedPrice = 0;
        } */
   if ('undefined' == typeof element.options) {
            var attributeId = element.id.replace(/[a-z]*/, '');
            var options = this.getAttributeOptions(attributeId);
            for (var i = 0; i < options.length; i++) {
                /*if (options[i].config) {
                    element.options[i].text = this.getOptionLabel(element.options[i].config, element.options[i].config.price-selectedPrice);
                    console.log(element.options[i].text);
                }*/
            }
        } else {
            for(var i=0;i<element.options.length;i++){
                if(element.options[i].config){
                    element.options[i].text = this.getOptionLabel(element.options[i].config, element.options[i].config.price-selectedPrice);
                }
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
         if ('select-one' == element.type) {
            element.options[0] = new Option(this.config.chooseText, '');
        }

        var prevConfig = false;
  		 if(element.prevSetting && 'undefined' != typeof element.prevSetting.type){
            prevConfig = element.prevSetting.options[element.prevSetting.selectedIndex];
        } else if (element.prevSetting && 'undefined' == typeof element.prevSetting.type) {
            prevConfig = true;
        }


        if(options) {
            var index = 1;
            for(var i=0;i<options.length;i++){
                var allowedProducts = [];
                if(prevConfig) {
                    for(var j=0;j<options[i].products.length;j++){
                        if(prevConfig.config && prevConfig.config.allowedProducts
                            && prevConfig.config.allowedProducts.indexOf(options[i].products[j])>-1){
                            allowedProducts.push(options[i].products[j]);
                        } else if (!prevConfig.config) {
                            allowedProducts.push(options[i].products[j]);
                        }
                    }
                } else {
                    allowedProducts = options[i].products.clone();
                }

                if(allowedProducts.size()>0){
                    options[i].allowedProducts = allowedProducts;
                    if ('undefined' != typeof element.type) {
	                    element.options[index] = new Option(this.getOptionLabel(options[i], options[i].price), options[i].id);
	                    element.options[index].config = options[i];
	               }
                   index++;
                }
            }
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
     if (element.options) {
        for(var i=element.options.length-1;i>=0;i--){
            element.remove(i);
        }
     }
    },

    getAttributeOptions: function(attributeId){
        if(this.config.attributes[attributeId]){
            return this.config.attributes[attributeId].options;
        }
    },

    reloadPrice: function(){
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
    },

    // Method to change the Metal type, as per the clicking on the image.
    changeData: function(attributeId, val){
        var selAttrId = $('attribute' + attributeId);
        $(selAttrId).value = val;
        this.configureElement(selAttrId);

        // Reload the label.
        this.reloadOptionLabels(selAttrId);

        // Reload the price.
        //this.reloadPrice();
    }
}
