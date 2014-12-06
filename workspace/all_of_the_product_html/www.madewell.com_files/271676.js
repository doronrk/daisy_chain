/****************************/
//Edited by Walli Smith 12/1 10:15
var promoMessageMain = '30% off with code HINTHINT';
var promoMessageSale = '';
var promoMessageSale50 = '';


// main site products to badge.
var productsMain = {
'03957':'',
'08714':'',
'67413':'',
'77281':'',
'96528':'',
'A0123':'',
'A0376':'',
'A0655':'',
'A4532':'',
'A6295':'',
'A7908':'',
'A8459':'',
'A8499':'',
'A9330':'',
'A9558':'',
'B0574':'',
'B0598':'',
'B0726':'',
'B0745':'',
'B1019':'',
'B1061':'',
'B1644':'',
'B1912':'',
'B1914':'',
'B1951':'',
'B1952':'',
'B1966':'',
'B1970':'',
'B1971':'',
'B1976':'',
'B2004':'',
'B2061':'',
'B2070':'',
'B2205':'',
'B2426':'',
'B2713':'',
'B2714':'',
'B2715':'',
'B4162':'',
'B4171':'',
'B4672':'',
'B4673':'',
'B4715':'',
'B4837':'',
'B5299':'',
'B5367':'',
'B5369':'',
'B5376':'',
'B5379':'',
'B5422':'',
'B5457':'',
'B5461':'',
'B5491':'',
'B5492':'',
'B5494':'',
'B5495':'',
'B5559':'',
'B5614':'',
'B5630':'',
'B5681':'',
'B5708':'',
'B5719':'',
'B5720':'',
'B5740':'',
'B5768':'',
'B5781':'',
'B5801':'',
'B5903':'',
'B6005':'',
'B6030':'',
'B6057':'',
'B6066':'',
'B6076':'',
'B6133':'',
'B6378':'',
'B6392':'',
'B6436':'',
'B6788':'',
'B6928':'',
'B6947':'',
'B6952':'',
'B6990':'',
'B7383':'',
'B7491':'',
'B7492':'',
'B7511':'',
'B7668':'',
'B9270':'',
'B9290':'',
'C2297':''
};

var productsMainInclusions = true;

// sale products to badge
var productsSale = {
};

var productsSaleInclusions = false;

// sale products to badge with different % off
var productsSale50 = {
};

// left nav and old search sale folder ids
// new search and sale data labels
var foldersToHide = {
};

// should the folders be hidden from the left nav?
var hideFoldersFromLeftNav = false;

// should the folders be hidden from search/sale?
var hideFoldersFromSearchSale = false; 

// what countries does all of this apply to?
var countries = {
};

var countryInclusions = false;
/****************************/

var monetateController = (function () {

	Object.size = function(obj) {
  		var size = 0, key;
  		for (key in obj) {
    		if (obj.hasOwnProperty(key)) size++;
  		}
  		return size;
	};

	var qs = (function(a) {
    	if (a == "") return {};
    	var b = {};
    	for (var i = 0; i < a.length; ++i) {
        	var p=a[i].split('=');
        	if (p.length != 2) continue;
        	b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    	}
    	return b;
	})(window.location.search.substr(1).split('&'));

    function getCountry() {
        // get the country from the madewell_country cookie. no cookie = US
        var country = getCookie('madewell_country');
        if (country == null) {
            country = 'US';
        }
        return country;
    }
    
    function applyBadge(pageType, promoMessage, productInfo) {
    	// The .eq(0)'s are intended to address poor semantic CSS class usage
		if (pageType == 'categoryplus') {
			var badgeHTML = '<span class="promo-badge promo-badge-category-plus desc_line3">' + promoMessageMain + '</span>';
	 		if ($(productInfo).find('.desc_line3').length > 0) {
            	$(productInfo).find('.desc_line3').eq(0).after(badgeHTML);
            } else {
            	$(productInfo).find('.desc_line2').eq(0).after(badgeHTML);
            }
		} else if (pageType == 'category') {
        	$(productInfo).find('.arrayProdSalePrice').eq(0).after('<div class="promo-badge promo-badge-array">' + promoMessage + '</div>');
        } else if (pageType == 'oldsearch' || pageType == 'oldsale') {
            $(productInfo).find('.arrayProdSalePrice').eq(0).after('<div class="promo-badge promo-badge-array">' + promoMessage + '</div>');
        } else if (pageType == 'search' || pageType == 'sale') {
            $(productInfo).find('figcaption').append('<div class="promo-badge promo-badge-category-plus product-description-line">' + promoMessage + '</div>');
        } else if (pageType == 'singlePDP' || pageType == 'multiPDP') {
        	var badgeHTML = '<div class="promo-badge-pdp">' + promoMessage + '</div>';
        	if ($(productInfo).find('#variants').length > 0) {
                $(productInfo).find('.product-pricing-wrapper').each(function () {
               		$(this).append(badgeHTML);
                });
        	} else {
           		$(productInfo).find('.full-price').append(badgeHTML);
            }
        } else if (pageType == 'quickshop') {
       		var badgeHTML = '<div class="promo-badge promo-badge-quickshop msg">' + promoMessage + '</div>';
       		if ($(productInfo).find('.promo-msgs').length == 0) {
            	var promoMsgsHTML = '';
                promoMsgsHTML += '<hr />';
                promoMsgsHTML += '<section class="promo-msgs">';
                promoMsgsHTML += badgeHTML;
                promoMsgsHTML += '</section>';

                $(productInfo).find('.price-wrapper').after(promoMsgsHTML);
            } else {
            	$(productInfo).find('.promo-msgs').prepend(badgeHTML);
            }
        }
	}

    function insertPromoMessageArray(pageType) {            
        if (pageType == 'categoryplus') {
            $('.plus_product').each(function () {
                var productId = $(this).attr('data-prodcode');
                if ((productsMain[productId] == '' && productsMainInclusions) ||
                    (productsMain[productId] == undefined && !productsMainInclusions)) {
					applyBadge(pageType, promoMessageMain, $(this));
                }
            });
        } else  {
            $('.arrayProdCell').add('figure.product-item').each(function () {
                var href = $(this).find('a').attr('href');
                if (href) {
                    var pattern = /http[s]?:\/\/.*\/(.*).jsp/g;
                    var productId = pattern.exec(href)[1];
                    if ((pageMode == 'sale' || pageMode == 'search') && productsSale50[productId] == '') {
                    	applyBadge(pageType, promoMessageSale50, $(this));
                    } else if ((pageMode == 'main' || pageMode == 'search') && ((productsMain[productId] == '' && productsMainInclusions) || (productsMain[productId] == undefined && !productsMainInclusions))) {
                        applyBadge(pageType, promoMessageMain, $(this));   
                    } else if (pageMode == 'sale' && ((productsSale[productId] == '' && productsSaleInclusions) || (productsSale[productId] == undefined && !productsSaleInclusions))) {
                        applyBadge(pageType, promoMessageSale, $(this));
					}
				}
			});
		}
	}
	
    function insertPromoMessagePDP(pageType) {
    	$('.productContainer').add('.product-container').each(function () {
        	var productId = $(this).find('.prod-main-img, .prod-main-image').attr('data-productcode');
			if ((pageMode == 'sale' || pageMode == 'search') && productsSale50[productId] == '') {
            	applyBadge(pageType, promoMessageSale50, $(this));
            } else if ((pageMode == 'main' || pageMode == 'search') && ((productsMain[productId] == '' && productsMainInclusions) || (productsMain[productId] == undefined && !productsMainInclusions))) {
            	applyBadge(pageType, promoMessageMain, $(this));   
            } else if (pageMode == 'sale' && ((productsSale[productId] == '' && productsSaleInclusions) || (productsSale[productId] == undefined && !productsSaleInclusions))) {
            	applyBadge(pageType, promoMessageSale, $(this));	
			}
    	});
    }
    
    function insertPromoMessageQuickshop(pageType) {
        $('.quickshop-container .product-container').each(function () {
            var productId = $(this).attr('data-productcode');
            if ((pageMode == 'sale' || pageMode == 'search') && productsSale50[productId] == '') {
            	applyBadge(pageType, promoMessageSale50, $(this));
            } else if ((pageMode == 'main' || pageMode == 'search') && ((productsMain[productId] == '' && productsMainInclusions) || (productsMain[productId] == undefined && !productsMainInclusions))) {
            	applyBadge(pageType, promoMessageMain, $(this));   
            } else if (pageMode == 'sale' && ((productsSale[productId] == '' && productsSaleInclusions) || (productsSale[productId] == undefined && !productsSaleInclusions))) {
            	applyBadge(pageType, promoMessageSale, $(this));
			}
        });
    }
    
    function hideOldSearchSaleFolder() {
    	$('#WomenLinks').add('#MenLinks').add('#GirlsLinks').add('#BoysLinks').find('h2 a').each(function () {
        	var id = $(this).attr('id');
            id = id.replace(/\W/g, '');
            if (foldersToHide[id] == '') {
                $(this).parent('h2').css('display', 'none');
            }
        });
    }
    
    function hideSearchSaleFolder() {
    	$('#category .refinement-ajax').each(function() {
    		var label = $(this).data('label').toLowerCase(); 
    		label = label.replace(/\W/g, '');
    		if (foldersToHide[label] == '') {
    			$(this).parents('.refinement-row').css('display', 'none');
    		}
    	});
    }
    
    function hideLeftNavFolder() {
    	$('.leftnav .leftNavCat a').each(function() {
        	var id = $(this).attr('id').toLowerCase();
        	id = id.replace(/\W/g, '');
        	if (foldersToHide[id] == '') {
          		$(this).parent('p').parent('li').css('display', 'none');
        	}
      	});
    }
    
    var pageMode;
    var basePageType;
    var country = getCountry();
    
    return {
        init: function (pageType) {
                
            if (pageType == 'sale' || pageType == 'oldsale' || basePageType == 'sale' || basePageType == 'oldsale' ||
            	($('.category img').length && $('.category img').attr('alt') == 'return to sale') ||
            	($('.category img').length && $('.category img').attr('src').toLowerCase().indexOf('returntosale') > 0)) {
              	pageMode = 'sale';
            } else if (pageType == 'search' || pageType == 'oldsearch' || basePageType == 'search' || basePageType == 'oldsearch' ||
            	($('.category img').length && $('.category img').attr('alt') == 'return to search') ||
            	($('.category img').length && $('.category img').attr('src').toLowerCase().indexOf('returntosearch') > 0)) {
        		pageMode = 'search';
            } else {
            	pageMode = 'main';
            }
            
            //console.log('pageType=%s, pageMode=%s', pageType, pageMode);
                                    
            if (((countries[country] == '' || Object.size(countries) == 0) && countryInclusions) ||
                (countries[country] != '' && !countryInclusions)) {

				// hide folders
				if ((pageType == 'oldsearch' || pageType == 'oldsale') && hideFoldersFromSearchSale) {
                	hideOldSearchSaleFolder();
                } else if ((pageType == 'search' || pageType == 'sale') && hideFoldersFromSearchSale) {
                	hideSearchSaleFolder();
				} else if (hideFoldersFromLeftNav) {
					hideLeftNavFolder();
				}

                // badging
                if (pageType == 'singlePDP' || pageType == 'multiPDP') {
                    basePageType = pageType;
                    insertPromoMessagePDP(pageType);
                } else if (pageType == 'quickshop') {
                    insertPromoMessageQuickshop(pageType);
                } else {
                    basePageType = pageType;
                    insertPromoMessageArray(pageType);
                }
            }
        }
    };
    
})();

$(function () {

    if ($('.topNavTxtSale').length > 0) {
       if ($('.topNavTxtSale a').text().indexOf('SALE') >= 0) {
         monetateController.init('oldsale');
       } else {
         monetateController.init('oldsearch');
       } 
    } else if ($('body#searchPage').length > 0) {
		monetateController.init('search');
    } else if ($('body#salePage').length > 0) {
    	monetateController.init('sale');
    } else if ($('.arrayProdCell').length > 0) {
        monetateController.init('category');
    } else if ($('#plusMidWrapper').length > 0) {
        monetateController.init('categoryplus');
    } else if ($('#singlePDP').length > 0) {
        monetateController.init('singlePDP');
    } else if ($('#multiPDP').length > 0) {
        monetateController.init('multiPDP');
    }

});