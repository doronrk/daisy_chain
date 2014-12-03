/****************************/
// Edited by Walli 12/3 0:00
var promoMessageMain = '30% off with code HOLIDAYTREAT';
var promoMessageSale = 'Extra 30% off with code HOLIDAYTREAT';
var promoMessageSale50 = '';

// main site products to badge
var productsMain = {
'B6991':'',
'B7612':'',
'B7182':'',
'B7187':'',
'B7121':'',
'B6373':'',
'B7523':'',
'B6985':'',
'B7743':'',
'B6695':'',
'B7744':'',
'B3985':'',
'B4026':'',
'B7110':'',
'B1238':'',
'B7241':'',
'B7106':'',
'B6698':'',
'B7185':'',
'B7181':'',
'B5882':'',
'B5705':'',
'B7254':'',
'53268':'',
'B7503':'',
'A4514':'',
'B6192':'',
'C1814':'',
'B5227':'',
'29660':'',
'B7067':'',
'B5916':'',
'B6529':'',
'99166':'',
'46725':'',
'18871':'',
'47920':'',
'09160':'',
'B5920':'',
'C1812':'',
'46164':'',
'51663':'',
'B5226':'',
'29350':'',
'B7263':'',
'C1822':'',
'34051':'',
'91212':'',
'A5304':'',
'49290':'',
'18285':'',
'B1639':'',
'C2111':'',
'65370':'',
'28762':'',
'29627':'',
'19243':'',
'B1909':'',
'B3280':'',
'B2265':'',
'08157':'',
'A7982':'',
'35770':'',
'B1710':'',
'A1526':'',
'B5230':'',
'08420':'',
'B2410':'',
'B2546':'',
'29349':'',
'B1726':'',
'B6521':'',
'B5229':'',
'A5305':'',
'B2411':'',
'48889':'',
'B3714':'',
'A1335':'',
'09586':'',
'A7964':'',
'A2047':'',
'B6509':'',
'B6431':'',
'B6522':'',
'C1837':'',
'C1839':'',
'B7518':'',
'B7425':'',
'B7021':'',
'B7785':'',
'C1830':'',
'C1836':'',
'C2300':'',
'C2311':'',
'B7786':'',
'B7443':'',
'B5289':'',
'B6435':'',
'B6508':'',
'B2228':'',
'B6242':'',
'B6185':'',
'B6506':'',
'B1736':'',
'B5287':'',
'B6162':'',
'B6193':'',
'B7419':'',
'C1840':'',
'B5034':'',
'B7623':'',
'B7624':'',
'B5033':'',
'B7622':'',
'B7621':'',
'B6325':'',
'B7852':'',
'B7853':'',
'B4168':'',
'B7625':'',
'B7631':'',
'B4169':'',
'B6673':'',
'B7429':'',
'B7289':'',
'B0562':'',
'B1651':'',
'B5942':'',
'B4747':'',
'02676':'',
'03216':'',
'04661':'',
'B4754':'',
'B4438':'',
'61456':'',
'82043':'',
'68925':'',
'35756':'',
'35755':'',
'A2515':'',
'03906':'',
'B0703':'',
'B0705':'',
'B0706':'',
'B0587':'',
'B0797':'',
'B4963':'',
'B0904':'',
'B0905':'',
'B1494':'',
'B6799':'',
'B5403':'',
'B5967':'',
'B1298':'',
'B1327':'',
'07076':'',
'09350':'',
'B6348':'',
'B6337':'',
'B3045':'',
'B6524':'',
'B6526':'',
'95968':'',
'05755':'',
'14340':'',
'B3381':'',
'B3382':'',
'B3384':'',
'03904':'',
'04473':'',
'B1160':'',
'B5123':'',
'B5125':'',
'B5126':'',
'B4906':'',
'B5751':'',
'49360':'',
'53355':'',
'53356':'',
'19034':'',
'05364':'',
'05365':'',
'B4840':'',
'B5753':'',
'B1186':'',
'B3900':'',
'B0684':'',
'B0685':'',
'B4839':'',
'B0688':'',
'B0689':'',
'B0690':'',
'03792':'',
'05476':'',
'05477':'',
'B6344':'',
'B6079':'',
'B6976':'',
'B5348':'',
'07760':'',
'B5347':'',
'B3906':'',
'B5684':'',
'49185':'',
'B3898':'',
'04497':'',
'B3903':'',
'04388':'',
'B0702':'',
'02742':'',
'04498':'',
'B6148':'',
'B6491':'',
'B6493':'',
'B6474':'',
'B7442':'',
'B4965':'',
'B5892':'',
'B2806':'',
'B3050':'',
'B6149':'',
'B6139':'',
'B6140':'',
'B0990':'',
'30827':'',
'B0995':'',
'B0989':'',
'95497':'',
'B0996':'',
'B5499':'',
'B5498':'',
'B5497':'',
'07648':'',
'B0965':'',
'B5779':'',
'07643':'',
'B1088':'',
'08245':'',
'A9939':'',
'96270':'',
'96375':'',
'B5601':'',
'B5817':'',
'B5591':'',
'B0472':'',
'A3078':'',
'B5843':'',
'48703':'',
'48785':'',
'B5604':'',
'96286':'',
'86607':'',
'B0992':'',
'A9934':'',
'A9941':'',
'04565':'',
'B5533':'',
'B0471':'',
'B5547':'',
'A9833':'',
'A9937':'',
'B0987':'',
'B0694':'',
'B1069':'',
'B0971':'',
'02440':'',
'A9933':'',
'08341':'',
'B0067':'',
'A3075':'',
'29235':'',
'29236':'',
'49923':'',
'29234':'',
'29237':'',
'86896':'',
'21790':'',
'31783':'',
'17181':'',
'17182':'',
'A9110':'',
'61170':'',
'B5856':'',
'B5857':'',
'29114':'',
'61170':'',
'35195':'',
'A2063':'',
'65705':'',
'A2061':'',
'57861':'',
'A2066':'',
'08897':'',
'A2064':'',
'B1193':'',
'B1194':'',
'B1204':'',
'07939':'',
'08531':'',
'B1192':'',
'97183':'',
'98689':'',
'B1206':'',
'04645':'',
'03897':'',
'B0312':'',
'95555':'',
'03854':'',
'B0270':'',
'95531':'',
'B0224':'',
'93735':'',
'94202':'',
'94230':'',
'96165':'',
'93973':'',
'94175':'',
'98310':'',
'99136':'',
'A9752':'',
'99133':'',
'49922':'',
'85984':'',
'10503':'',
'22149':'',
'78795':'',
'B0972':'',
'53718':'',
'53731':'',
'B1081':'',
'A6359':'',
'B4298':'',
'A4175':'',
'A5517':'',
'31187':'',
'07908':'',
'07904':'',
'07902':'',
'31205':'',
'19417':'',
'20218':'',
'A5517':'',
'B4313':'',
'78151':'',
'78463':'',
'31206':'',
'68015':'',
'75200':'',
'93810':'',
'93060':'',
'93811':'',
'67388':'',
'60763':'',
'67309':'',
'01310':'',
'06385':'',
'03066':'',
'03218':'',
'95085':'',
'43683':'',
'84018':'',
'62202':'',
'99467':'',
'02499':'',
'02685':'',
'99452':'',
'02510':'',
'99439':'',
'07432':'',
'07918':'',
'07626':'',
'07627':'',
'03285':'',
'17450':'',
'27995':'',
'44448':'',
'B0202':'',
'07530':'',
'20582':'',
'31317':'',
'32756':'',
'29104':'',
'38555':'',
'19135':'',
'30367':'',
'18975':'',
'83664':'',
'67434':'',
'48453':'',
'B0190':'',
'B0201':'',
'A0525':'',
'A5950':'',
'03276':'',
'41229':'',
'37875':'',
'37786':'',
'37897':'',
'A0654':'',
'A0656':'',
'A0640':'',
'A5143':'',
'B0188':'',
'B0183':'',
'A5949':'',
'A9950':'',
'29243':'',
'34035':'',
'38650':'',
'39248':'',
'94685':'',
'03273':'',
'03274':'',
'97875':'',
'29074':'',
'29071':'',
'32539':'',
'60277':'',
'60482':'',
'A9740':'',
'52221':'',
'01307':'',
'03340':'',
'B5744':'',
'B5539':'',
'03761':'',
'97388':'',
'B0646':'',
'05660':'',
'05662':'',
'B0585':'',
'B0591':'',
'B0592':'',
'05671':'',
'A9735':'',
'A9716':'',
'05536':'',
'05535':'',
'49025':'',
'28122':'',
'17336':'',
'A9714':'',
'B2473':'',
'B2798':'',
'B1753':'',
'B3778':'',
'A6631':'',
'03737':'',
'03814':'',
'03737':'',
'A9719':'',
'A9724':'',
'11708':'',
'16561':'',
'75321':'',
'75427':'',
'A0484':'',
'A0482':'',
'A2070':'',
'A2068':'',
'A2069':'',
'B7335':'',
'06601':'',
'B7335':'',
'19323':'',
'B2681':'',
'05521':'',
'B2906':'',
'47923':'',
'B3174':'',
'79438':'',
'A9651':'',
'A9648':'',
'B5640':'',
'B4890':'',
'B5865':'',
'B6100':'',
'B4709':'',
'B5676':'',
'B4710':'',
'B6014':'',
'B5146':'',
'92562':'',
'B5955':'',
'B6099':'',
'B7721':'',
'A7980':'',
'B2042':'',
'05870':'',
'B1068':'',
'B4978':'',
'B1865':'',
'B6011':'',
'B1369':'',
'50014':'',
'75428':'',
'A3456':'',
'08671':'',
'B1566':'',
'B3606':'',
'B1629':'',
'B5540':'',
'B1611':'',
'37768':'',
'08394':'',
'A8353':'',
'05591':'',
'05592':'',
'05595':'',
'05594':'',
'05576':'',
'A8267':'',
'A3373':'',
'A8247':'',
'22250':'',
'B1570':'',
'B3607':'',
'A8356':'',
'A8357':'',
'A8232':'',
'B1583':'',
'A4195':'',
'A4205':'',
'A4211':'',
'A3763':'',
'B1822':'',
'A3457':'',
'B1591':'',
'A8272':'',
'B1579':'',
'B1593':'',
'B5413':'',
'B6608':'',
'B5441':'',
'B5434':'',
'B1333':'',
'A1177':'',
'B1179':'',
'A9816':'',
'B6277':'',
'B5634':'',
'B5414':'',
'B5411':'',
'B5409':'',
'A2083':'',
'B5410':'',
'B5871':'',
'B5872':'',
'B6270':'',
'B5433':'',
'B1378':'',
'B5854':'',
'B5631':'',
'B9384':'',
'B2339':'',
'B1334':'',
'B1331':'',
'B1195':'',
'04729':'',
'B1337':'',
'B4482':'',
'B3379':'',
'B4896':'',
'94273':'',
'B4187':'',
'A9776':'',
'33849':'',
'B4186':'',
'A9793':'',
'B6571':'',
'B4975':'',
'B4474':'',
'B1167':'',
'B4191':'',
'B4195':'',
'A9797':'',
'A9795':'',
'B1119':'',
'B1513':'',
'B0849':'',
'B1512':'',
'B1515':'',
'18125':'',
'B1469':'',
'07001':'',
'B4685':'',
'B4309':'',
'B4318':'',
'B4338':'',
'B4317':'',
'B4304':'',
'B4341':'',
'B4339':'',
'B4340':'',
'B4342':'',
'B4316':'',
'75320':'',
'C0100':'',
'B8804':'',
'C0136':'',
'C0098':'',
'C0124':'',
'C0135':'',
'C0139':'',
'C0116':'',
'C0117':'',
'C2614':'',
'B8238':'',
'B8223':'',
'C1884':'',
'C0713':'',
'B8829':'',
'C0128':'',
'C0137':'',
'C0127':'',
'C0148':'',
'C1874':'',
'B7946':'',
'B6492':'',
'B5874':'',
'B7418':'',
'B6433':'',
'B6507':'',
'B7263':'',
'B6434':'',
'B6432':'',
'B5917':'',
'B5918':'',
'B5288':'',
'B7424':'',
'B6502':'',
'B6165':'',
'B7417':'',
'B3024':'',
'B5285':'',
'B5283':'',
'C1827':'',
'C1826':'',
'C1829':'',
'C1838':'',
'C1822':'',
'B3500':'',
'B3477':'',
'B3478':'',
'B3503':'',
'B2199':'',
'B2197':'',
'B2198':'',
'A8195':'',
'02038':'',
'A8363':'',
'A4399':'',
'B3285':'',
'31314':'',
'80295':'',
'B0794':'',
'B0793':'',
'B0790':'',
'B5232':'',
'B0786':'',
'B5792':'',
'B6569':'',
'28540':'',
'93726':'',
'A9168':'',
'B0428':'',
'59187':'',
'06670':'',
'B1163':'',
'B0743':'',
'B0463':'',
'A8928':'',
'A8927':'',
'22060':'',
'A9091':'',
'97250':'',
'B4194':'',
'B5180':'',
'03380':'',
'B1523':'',
'04729':'',
'B5432':'',
'B5412':'',
'B5407':'',
'B1377':'',
'B5855':'',
'B5633':'',
'B4149':'',
'B4051':'',
'B3933':'',
'B5653':'',
'23737':'',
'B1153':'',
'B5649':'',
'B5524':'',
'B5797':'',
'07083':'',
'B5317':'',
'B0448':'',
'B5309':'',
'B1184':'',
'B5558':'',
'B2060':'',
'B2826':'',
'B5316':'',
'B2153':'',
'B2152':'',
'A6687':'',
'10132':'',
'31270':'',
'72977':'',
'58206':'',
'79240':'',
'15773':'',
'82205':'',
'60983':'',
'A5293':'',
'81303':'',
'72986':'',
'80817':'',
'B4941':'',
'06292':'',
'B3258':'',
'31943':'',
'B3259':'',
'B3260':'',
'B4803':'',
'B4942':'',
'52801':'',
'B6904':'',
'B6293':'',
'52430':'',
'51641':'',
'51657':'',
'05514':'',
'58394':'',
'B8498':'',
'B8499':'',
'A9633':'',
'B8496':'',
'B4129':'',
'51650':'',
'33871':'',
'B4096':'',
'B4128':'',
'B4130':'',
'B4170':'',
'B4496':'',
'B4097':'',
'03885':'',
'B4049':'',
'B4100':'',
'A8248':'',
'B1138':'',
'B1582':'',
'B7322':'',
'B1547':'',
'61212':'',
'54104':'',
'54175':'',
'B4016':'',
'B4143':'',
'B4061':'',
'B4142':'',
'06404':'',
'B4098':'',
'B3644':'',
'B4176':'',
'B3643':'',
'B3956':'',
'05828':'',
'B3959':'',
'06156':'',
'B5088':'',
'54429':'',
'B5826':''
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
'HK':'',
'UK':'',
'GB':''
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
        // get the country from the jcrew_country cookie. no cookie = US
        var country = getCookie('jcrew_country');
        if (country == null) {
            country = 'US';
        }
        return country;
    }
    
    function badgeProduct(productId, products, inclusions) {
		if ((products[productId] == '' && inclusions) ||
			(products[productId] == undefined && !inclusions)) {
			return true;
		} else {
			return false;
		}
	}
	
	function isSale(pageMode, pageType, context) {	
		if (pageMode == 'sale') {
			return true;
		} else if (pageMode == 'search') {
			if (pageType == 'search' && $(context).find('button.get-quickshop').data('saleitem') == true) {
				return true;
			} else if ((pageType == 'singlePDP' || pageType == 'multiPDP') && qs['isSaleItem'] == 'true') {
				return true;
			} else if (pageType == 'quickshop' && $(context).find('.product-details-full-link').attr('href').indexOf('isSaleItem=true') >= 0) {
				return true;
			}
		} else {
			return false;
		}
	}
	
	function isBadged(pageType, context) {
		if ((pageType == 'singlePDP' || pageType == 'multiPDP') && $(context).find('.promo-badge-pdp').length > 0) {
			return true;
		}
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
        	$(productInfo).find('.arrayProdSalePrice').eq(0).after('<li class="promo-badge promo-badge-array">' + promoMessage + '</li>');
        } else if (pageType == 'oldsearch' || pageType == 'oldsale') {
            $(productInfo).find('.arrayProdSalePrice').eq(0).after('<div class="promo-badge promo-badge-array">' + promoMessage + '</div>');
        } else if (pageType == 'search' || pageType == 'sale') {
            $(productInfo).find('figcaption').append('<div class="promo-badge promo-badge-category-plus product-description-line">' + promoMessage + '</div>');
        } else if (pageType == 'swim') {
			if ($(productInfo).find('div.product-price-now').length > 0) {
	        	$(productInfo).find('div.product-price-now').eq(0).after('<div class="promo-badge promo-badge-swim product-description-line">' + promoMessage + '</div>');
			} else { 
				$(productInfo).find('div.product-price').eq(0).after('<div class="promo-badge promo-badge-category-plus product-description-line">' + promoMessage + '</div>');
			}
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
                if (badgeProduct(productId, productsMain, productsMainInclusions)) {
					applyBadge(pageType, promoMessageMain, $(this));
                }
            });
        } else  {
            $('.arrayProdCell').add('figure.product-item').each(function () {
                var href = $(this).find('a').attr('href');
                if (href) {
                    var pattern = /http[s]?:\/\/.*\/(.*).jsp/g;
                    var productId = pattern.exec(href)[1];
                    if (isSale(pageMode, pageType, $(this)) && badgeProduct(productId, productsSale50, true)) {
                       	applyBadge(pageType, promoMessageSale50, $(this));
                    } else if (isSale(pageMode, pageType, $(this)) && badgeProduct(productId, productsSale, productsSaleInclusions)) {
                        applyBadge(pageType, promoMessageSale, $(this));
                    } else if (badgeProduct(productId, productsMain, productsMainInclusions)) {
	                    applyBadge(pageType, promoMessageMain, $(this));   
                    }                    
				}
			});
		}
	}
	
    function insertPromoMessagePDP(pageType) {
    	$('.productContainer').add('.product-container').each(function () {
        	var productId = $(this).find('.prod-main-img, .prod-main-image').attr('data-productcode');
        	if (isSale(pageMode, pageType, $(this)) && badgeProduct(productId, productsSale50, true) && !isBadged(pageType, $(this))) {
            	applyBadge(pageType, promoMessageSale50, $(this));
        	} else if (isSale(pageMode, pageType, $(this)) && badgeProduct(productId, productsSale, productsSaleInclusions) && !isBadged(pageType, $(this))) {
            	applyBadge(pageType, promoMessageSale, $(this));	
        	} else if (badgeProduct(productId, productsMain, productsMainInclusions) && !isBadged(pageType, $(this))) {
            	applyBadge(pageType, promoMessageMain, $(this));   
        	}
    	});
    }
    
    function insertPromoMessageQuickshop(pageType) {
        $('.quickshop-container .product-container').each(function () {
            var productId = $(this).attr('data-productcode');
            if (isSale(pageMode, pageType, $(this)) && badgeProduct(productId, productsSale50, true)) {
            	applyBadge(pageType, promoMessageSale50, $(this));
            } else if (isSale(pageMode, pageType, $(this)) && badgeProduct(productId, productsSale, productsSaleInclusions)) {
            	applyBadge(pageType, promoMessageSale, $(this));
            } else if (badgeProduct(productId, productsMain, productsMainInclusions)) {
	        	applyBadge(pageType, promoMessageMain, $(this));   
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
        },
        
        rolloverShown: function (data) {
        	if (data.location == 'swim') {
				var badge = $(data.cell).find('.promo-badge').clone();
				if (badge) {
					if ($(data.rollover).find('div.product-price-now').length > 0) {
						$(data.rollover).find('div.product-price-now').after(badge);
					} else {
						$(data.rollover).find('div.product-price').after(badge);
					}
				}
        	}
        }
    };
    
})();

$(function () {

    if ($('#prodArray').length > 0) {
        monetateController.init('category');
    } else if ($('#plusMidWrapper').length > 0) {
        monetateController.init('categoryplus');
    } else if ($('.searchResultsTxt').length > 0) {
        monetateController.init('oldsearch');
    } else if ($('.searchResultsTxtSale').length > 0) {
        monetateController.init('oldsale');
    } else if ($('body#searchPage').length > 0) {
		monetateController.init('search');
    } else if ($('body#salePage').length > 0) {
    	monetateController.init('sale');
    } else if ($('body#swim').length > 0) {
    	monetateController.init('swim');
    } else if ($('#singlePDP').length > 0) {
        monetateController.init('singlePDP');
    } else if ($('#multiPDP').length > 0) {
        monetateController.init('multiPDP');
    }

});