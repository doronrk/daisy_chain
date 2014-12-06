// BrightTag utility module
// global
// on page load

// Stub out these objects for IE7
if(typeof mmcore == 'undefined') mmcore = {};
if(typeof mmcore.nord == 'undefined') mmcore.nord = {};

mmcore.nord.BTUtils = function() {
    function createAttributeString(attrArray, max) {
		var attrString = "";
		for (var i = 1; i <= max; i++) {
			if(typeof attrArray[i.toString()] == "boolean") attrString += attrArray[i.toString()].toString()
			else if(attrArray[i.toString()] != "" && attrArray[i.toString()] != undefined) attrString += attrArray[i.toString()];
			if(i != max) attrString += "-_-";
		}
		return attrString;
	}
    
    function decodeHtmlNumeric( str ) {
        return str.replace( /&#([0-9]{1,7});/g, function( g, m1 ){
            return String.fromCharCode( parseInt( m1, 10 ) );
        }).replace( /&#[xX]([0-9a-fA-F]{1,6});/g, function( g, m1 ){
            return String.fromCharCode( parseInt( m1, 16 ) );
        });
    }
    
    
    function throwShopAction5Tags() {

        var coreMetricsIsLoaded = !!window.cmCreateElementTag;
        var $items =  $('#mini-bag-section').find('.mini-bag-item').not('.empty-item').first();
    
        if (coreMetricsIsLoaded) {
    
            $items.each(function() {
              var itemData = $(this).data('itemParams'), outfitParam = '', extraAttributes;
                
              if (itemData) {
                if (itemData.OutfitId && itemData.OutfitId !== '') {
                  outfitParam = itemData.StyleId + '_' + itemData.OutfitId;
                }
    
                /*
                if ($("input[type='radio']:checked", "#price").length > 0) {
                   itemData.StyleId = nord.config.settings.product.styleNumber;
                }
                */
                itemData.StyleId = nord.config.settings.product.styleNumber;
                
                var attrArray = itemData.SiteLocationId.substr(itemData.SiteLocationId.indexOf('*')).split('*');
            
                // These account for extra spaces created during the WCM migration
                attrArray.splice(4, 1);
                attrArray.splice(27, 3);
            
                extraAttributes = attrArray.join('-_-');
    
                if (typeof btCreateShopAction5Tag != 'undefined') {
                    btCreateShopAction5Tag(
                      itemData.StyleId,
                      itemData.StyleName,
                      itemData.Quantity,
                      itemData.UnitPrice,
                      itemData.CategoryId,
                      outfitParam,
                      '',
                      '',
                      itemData.PickUpInStore,
                      itemData.StoreNumber,
                      '',
                      extraAttributes
                    );
                }
                else {
                    btCreateShopAction5Tag(
                      itemData.StyleId,
                      itemData.StyleName,
                      itemData.Quantity,
                      itemData.UnitPrice,
                      itemData.CategoryId,
                      outfitParam,
                      '',
                      '',
                      itemData.PickUpInStore,
                      itemData.StoreNumber,
                      '',
                      extraAttributes
                    );
                }            
                cmDisplayShop5s();
              }
            });
        }
    }

	return {
		createAttributeString: createAttributeString,
        decodeHtmlNumeric: decodeHtmlNumeric,
        throwShopAction5Tags: throwShopAction5Tags
	};
}();