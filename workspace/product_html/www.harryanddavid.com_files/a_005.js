mmcore.SetCookie('mmid','276452691|AQAAAArZNp8eTQsAAA==',365,1);mmcore.SetCookie('pd','1127191818|AQAAAAoBQtk2nx5NC5eM9+0BAF42banU3NFIAA4AAABeNm2p1NzRSAAAAAD/////AP//////////AAZEaXJlY3QBTQsBAAAAAAABAAAAAAD///////////////8AAAAAAAFF',365);mmcore.SetCookie('srv','nycvwcgus08',365);(function(){if(typeof(mmcore.GenInfo)!='object')mmcore.GenInfo={};if(typeof mmcore.recommendations=='undefined')mmcore.recommendations={};
if(typeof mmcore.recommendationErrors=='undefined')mmcore.recommendationErrors={};
mmcore.recommendationErrors['json_InvalidFilters']='[]';
mmcore.recommendationErrors['InvalidFilters']=eval(mmcore.recommendationErrors['json_InvalidFilters']);
mmcore.EH=function(e){var s=e.message+'\r\n';if(!window.mm_error)window.mm_error=s;else window.mm_error+=s;};
try{
;(function(){
    for(var i = 0, l = document.childNodes.length, page = ''; !page && i < l; i++){
    	var node = document.childNodes[i];
    	if(node.nodeType == 8) page = ((node.nodeValue||'').match(/\s([A-Za-z.]+)\.jsp/)||['',''])[1];
        if(node.nodeType == 1) for(var j = 0, k = node.childNodes.length; !page && j < k; j++){
            var node2 = node.childNodes[j];
            if(node2.nodeType == 8) page = ((node2.nodeValue||'').match(/\s([A-Za-z.]+)\.jsp/)||['',''])[1];
        }
    }
    mmcore.pageType = page;
})();
}catch(err){mmcore.EH(err);}
try{
mmcore.ForeSee = function (campaignName) {
    var GI = mmcore.GenInfo[campaignName],  
        output = [],  
        found = false;  
    if (!GI) return mmcore.EH({  
        message: 'mmcore.ForeSee No GenInfo found for campaign: ' + campaignName  
    });  
    for (var key in GI) output.push(key + ':' + GI[key]);  
    var campaignInfo = output.join('|').toLowerCase();  
    function sendForeSee() {  
        FSR.CPPS.set(campaignName, campaignName + '=' + campaignInfo);  
    }  
    if (window.FSR && window.FSR.CPPS && typeof window.FSR.CPPS.set == 'function') {  
        sendForeSee();  
    } else {  
        var waitForFS = setInterval(function () {  
            if (!window.FSR || !window.FSR.CPPS || typeof window.FSR.CPPS.set !== 'function') return;  
            found = true;  
            clearInterval(waitForFS);  
            sendForeSee();  
        }, 50);  
        setTimeout(function () {  
            if (!found) {  
                clearInterval(waitForFS);  
                mmcore.EH({  
                    message: 'mmcore.ForeSee: no foresee function found'  
                });  
            }  
        }, 5000);  
    }  
};
}catch(err){mmcore.EH(err);}
try{
;(function () {
	mmcore.snippets = mmcore.snippets || {};
	mmcore.snippets.Trigger = function () {
		var eventPool = {};
		var eventListeners = {};
		this.trigger = function (event_type, event_data, callback) {
			eventPool[event_type] = {
				event_data: event_data,
				callback: callback
			};
			eventListeners[event_type] = eventListeners[event_type] || [];
			for (var i = 0; i < eventListeners[event_type].length; i++) {
				try {
					eventListeners[event_type][i](event_data);
				} catch (e) {
					mmcore.EH && mmcore.EH(e)
				}
			}
			callback && callback();
		};
		this.on = function (event_type, callback) {
			var lastData = eventPool[event_type];
			if (lastData) {
				try {
					callback(lastData.event_data);
				} catch (e) {
					mmcore.EH && mmcore.EH(e)
				}
				setTimeout(function () {
					lastData.callback && lastData.callback();
					lastData.callback = null;
				}, 0);
			}
			eventListeners[event_type] = eventListeners[event_type] || [];
			eventListeners[event_type].push(callback);
		};
	};
	mmcore.snippets.Trigger.call(mmcore)
}());
}catch(err){mmcore.EH(err);}
try{
;(function () {
	mmcore.snippets = mmcore.snippets || {};
	mmcore.snippets.Style = function (css) {
		var doc = document, st = doc.createElement("style");
		st.type = "text/css";
		st.media = "screen";
		function attach(css) {
			if (st && css) {
				if (st.styleSheet) {
					st.styleSheet.cssText += css;
				} else {
					st.innerHTML += css;
				}
			}
		}

		function detach() {
			st && st.parentNode.removeChild(st);
			st = null;
		}

		attach(css);
		var mm = doc.getElementById(mmcore.cprefix + 1);
		mm.parentNode.insertBefore(st, mm);
		return {
			attach: attach,
			detach: detach
		}
	}
}());
}catch(err){mmcore.EH(err);}
try{
/* Written by Kutischev */
mmcore.AttachStyle=function(text){if(document.body){var style=document.createElement('style');style.type='text/css';if(/WebKit|MSIE/i.test(navigator.userAgent)){if(style.styleSheet){style.styleSheet.cssText=text}else{style.innerText=text}}else{style.innerHTML=text}document.getElementsByTagName('head')[0].appendChild(style)}else{document.write('<style type="text/css">'+text+'</style>')}};
// Anonymous function

// DOM ready
mmcore.AddDocLoadHandler(function(){
	if(!window.jQuery) return;
	var $ = jQuery,
		itemNumber = '' + ((window.tmParams || {}).productIds) || '',
		prodID = '',
		wlp = window.location.pathname,
		CGRequestNeeded = false,
		categories = [
			'Chocolates & Sweets',
			'Chocolate & Sweets',
			'Flowers & Plants',
			'Fruit of the Month Clubs',
			'Gift Baskets & Towers',
			'Gourmet Foods',
			'Pears & Fresh Fruit'
		];

	// This function checks whether str matches one of strings from categories array
	function identifyCategory(str) {
		for (var i = 0; i < categories.length; i++) {
			if(str.indexOf('Chocolate & Sweets')+1) return 'Chocolates & Sweets';
			else if (str.indexOf(categories[i]) == 0) return categories[i].replace(/�/g, '');
		}
		// We should rate this category in this way because it has coma in it's name
		if (str.indexOf('Entertaining, Meat & Pantry') == 0) {
			mmcore.SetPageID('Cat1View_Entertaining, Meat & Pantry');
			mmcore._async = true;
			mmcore.CGRequest();
		}
		return false;
	}


	// This function waits when in the top right point of page appears "Added to cart" block
	// then grabs product ID from that block and send rating to CG
	function waitProdID() {
		var waitForID = setInterval(function(){
			var numberBlock = $('#minicart .number:visible');
			if (numberBlock.length == 0) return;

			clearInterval(waitForID);
			var prodID = numberBlock.text().match(/\d+/)[0];

			mmcore.SetAction('AddToBasket', 30, prodID);
			mmcore.SetPageID('AddToBasketRating');
			mmcore._async = true;
			mmcore.CGRequest();
		}, 300);
		setInterval(function(){ clearInterval(waitForID); }, 5000);
	}


	// PRODUCT VIEW
	if (itemNumber && wlp != '/gifts/store/OrderOKView') {
		prodID = itemNumber.match(/\d+/)[0];
		if (prodID.length > 0) {
			mmcore.SetAction('ProductView', 10, prodID);
			mmcore.SetPageID($('.up_sale .title:contains("May We Also Suggest")').length ? 'ProductViewRating' : 'mmevents');
			mmcore._async = true;
			mmcore.CGRequest();
		}

		// ADD TO BASKET
		$('#submitButtons a:not(.dijitButtonDisabled)').live('click', function(){
			waitProdID();
		});
	}
	// CATEGORY VIEW
	else {
		var h1Text = $.trim($('h1').eq(0).text()) || $.trim($('div.pageTitle').text()) || $.trim($('#breadcrumb .crumb.last').text());	// Text inside H1 element
		if (h1Text.length > 0)  {
			var cat = identifyCategory(h1Text);
			if (cat) {
				mmcore.SetAction('Category1View', 3, cat);
				mmcore.SetPageID('CategoryViewRating');
				mmcore._async = true;
				mmcore.CGRequest();
			}
		} 
		// Search for "Fruit-of-the-Month Club� Collections"
		else {
			var bc = $('#breadcrumb .crumb').eq(1).text();
			if (bc.indexOf('Fruit-of-the-Month Club� Collections') > -1) {
				mmcore.SetAction('Category1View', 3, 'Fruit-of-the-Month Club Collections');
				mmcore.SetPageID('CategoryViewRating');
				mmcore._async = true;
				mmcore.CGRequest();
			}
		}

		// QUICK VIEW ADD TO BASKET
		$('.quickViewLink a').click(function(){	// Wait for #itemNumber appears to resolve ProdId
			var waitForProdID = setInterval(function(){
				if ($('#addToCartSection').length == 0) return;
				$('#addToCartSection a').click(function(){
					waitProdID();
				});
				clearInterval(waitForProdID);
			}, 300);
			setTimeout(function(){ clearInterval(waitForProdID); }, 4000);
		});
	}


	// GIFTLIST PAGE ADD TO CART
	if (wlp == '/gifts/store/BECGiftListItemDisplay') {
		// Click on Add To Cart
		$('.addItem a').live('click', function(){
			waitProdID();
		});
		// Click on .expressReOrderBtn
		$('.expressReOrderBtn a').live('click', function(){
			waitProdID();
		});		
		// QUICK VIEW ADD TO BASKET
		$('.quickViewLink a').live('click', function(){	// Wait for #itemNumber appears to resolve ProdID
			var waitForProdID = setInterval(function(){
				if ($('#addToCartSection').length == 0) return;
				$('#addToCartSection a').click(function(){
					waitProdID();
				});
				clearInterval(waitForProdID);
			}, 300);
			setTimeout(function(){ clearInterval(waitForProdID); }, 4000);
		});
	}


	// CONFORMATION PAGE ACTIONS (this IF statement should be in the end of AddDocLoadHandler function)
	if (wlp == '/gifts/store/OrderOKView') {
		var currOrderNum = jQuery('.order-number').text().match(/\d+/)[0],
			cookieOrderNum = mmcore.GetCookie('lastOrderID_1');

		if (currOrderNum == cookieOrderNum) return;
		
		var itemImgParent = $('.image').parent('.entry');
		itemImgParent.find('.details .quantity').addClass('mm-q');
		itemImgParent.find('.details .product > .total').addClass('mm-t');
		window.cpProducts = [];	// Here we'll store array of all products (without duplications)

		var clientsIDs = (itemNumber || '').replace(/[^\d\|]/g, '').split('|'),
			qtys = (window.tmParams.qtys || '').split('|'),
			amounts = (window.tmParams.prices || '').split('|'),
			data = {};
		for(var i = 0; i < clientsIDs.length; i++){
			data[clientsIDs[i]] = data[clientsIDs[i]] || {};
			data[clientsIDs[i]]['qty'] = (data[clientsIDs[i]]['qty'] || 0) + 1 * qtys[i];
			data[clientsIDs[i]]['amount'] = (data[clientsIDs[i]]['amount'] || 0) + 1 * amounts[i];
		}
		for(var key in data){
			mmcore.SetAction('PurchaseRating', 100, key);
			mmcore.SetAction('PurchasedUnits', data[key].qty, key);
			mmcore.SetAction('PurchasedRevenue', parseInt(100 * data[key].amount), key);
		}

		mmcore.SetCookie('lastOrderID_1', currOrderNum, 365);
		mmcore.SetPageID('PurchaseRating');
		mmcore._async = true;
		mmcore.CGRequest();
	}

}); // AddDocLoadHandl
}catch(err){mmcore.EH(err);}
try{
mmcore.CoreMetrics = function(campaignName){  
  var GI = mmcore.GenInfo[campaignName], output=[];  
  if (!GI) return mmcore.EH({message:'(mm_CM) No GenInfo found for campaign: ' + campaignName});  
  for(var key in GI) output.push(key+':' +GI[key]);  
  var createTag = function(){
    cmCreateElementTag(output.join('|').toLowerCase() , "MM_"+ campaignName);
  };
  if(window.cmCreateElementTag) 
    createTag();
  else {
    var waitForCM = setInterval(function(){
      if(!window.cmCreateElementTag) return;
      clearInterval(waitForCM);
      createTag();
    },50);
    setTimeout(function(){ clearInterval(waitForCM); }, 5000);
  }
};

}catch(err){mmcore.EH(err);}
try{
mmcore.AddDocLoadHandler(function () {
    var $searchInput = $('#sli_search_rac');

    function trigger(){
        mmcore.trigger('searches',{},function(){
            mmcore._async = true;
            mmcore.SetPageID('mmevents');
            mmcore.CGRequest();
        });
    }

    $searchInput.on('keydown', function (e) {
        var code = e.keyCode || e.which,
            $activeTip = $('#sli_autocomplete li.sli_ac_active');
        if (code === 13) {
            if (this.value !== '' || $activeTip.length) {
                trigger();
            }
        }
    });
//  click on suggestions links
    $(document).on('click', '#sli_autocomplete .sli_ac_suggestions ul > li, #sli_autocomplete .sli_ac_products ul > li', function () {
        trigger();
    });
// click on search-ico
    $('#header-main-search-button').on('mousedown', function () {
        if ($searchInput.length && $searchInput.val() !== '') {
            trigger();
        }
    });
});
}catch(err){mmcore.EH(err);}
try{
mmcore.AddDocLoadHandler(function () {
	//Only use PostPond Action
	//select buttons witch class consist "button-add-to-cart"  and don't consist disabled buttons
	var triggerEvent = function () {

		var oldTagUri = mmcore._TagUri();
		mmcore.trigger('add_to_cart_all', {
			isMobile: !!window.isMobile
		}, function () {
			if (oldTagUri != mmcore._TagUri() && !window.isMobile) {
				mmcore._async = true;
				mmcore.SetPageID('mmevents');
				mmcore.CGRequest();
			}

		});
	};
	var hOnClick = function () {
		var nodeQuantity = document.querySelector('#quantity_0') ||
			this.parentNode.parentNode.querySelector('span.quantity input[id*="qty"]');

		var isDisabled = this.className.indexOf('dijitButtonDisabled') != -1;
		if (!isDisabled) {
			if (nodeQuantity) {
				var quantity = Number(nodeQuantity.value);
				if (quantity > 0) {
					triggerEvent();
				}
			} else {
				triggerEvent();
			}
		}
	};
	var cssSelector = '[class*=button-buy-again],[class*=button-send-it-again],[class*=button-add-to-cart], a[href*="addToCart"]';
	if (window.$) {
		$(document.body).on('mousedown', cssSelector, hOnClick);
	} else if (window.dojo) {
		dojo.query(cssSelector).on('mousedown', hOnClick);
	}
});
}catch(err){mmcore.EH(err);}
try{
/**  
* Maxymiser - Google Universal Integration  
*  
* account          : required. {string}            UA-43044033-5 
* campaignName     : required. {String}            must be exactly what is set in the UI  
* dimensionNumber  : required. {Int 1-20}          GA dimension slot # 1-20 
*  
*/    
mmcore.GU = function (account, campaignName, dimensionNumber, _optCallback) {    
    var m = mmcore,  
        isProduction = (mmcore.GetCookie('cfgID') == '2' ||    
            mmcore.GetCookie('cfgID') !== '1' && mmcore.GetCookie('cfgid') !== '1') ? "Prod" : "Sand";    
    if (!account || !campaignName || !dimensionNumber) {    
        return m.EH({    
            message: '(mm_GU) insufficient arguments'    
        });    
    }    
    var GI = m.GenInfo[campaignName],    
        keys = [],    
        output = [];    
    if (!GI) {    
        return m.EH({    
            message: '(mm_GU) Campaign Not Found: ' + campaignName    
        });    
    }    
    if (dimensionNumber < 1 || dimensionNumber > 20 || isNaN(parseFloat(dimensionNumber)) || !isFinite(dimensionNumber)) {    
        return m.EH({    
            message: '(mm_GU) invalid dimension number'    
        });    
    }    
    for (var key in GI) {    
        keys.push(key);    
    }    
    keys.sort();    
    for (var i = 0; i < keys.length; i++) output.push(keys[i] + ':' + GI[keys[i]]);    
    var campaignInfo = (campaignName + '=' + output.join('|')).toLowerCase();  
    
    function sendGU() {    
        ga('set', 'dimension' + dimensionNumber, campaignInfo);  
        ga('send', 'event', 'Maxymiser_' + isProduction, campaignInfo, campaignInfo);  
        if (typeof opt_Callback == 'function') opt_Callback();    
    }    
    var waitForGU = setInterval(function () {    
        if (typeof window.ga !== 'function' || typeof window.ga.K !== 'function') return;    
        clearInterval(waitForGU);    
        foundGU = true;  
        sendGU();    
    }, 50);    
    mmcore.AddDocLoadHandler(function () {    
        setTimeout(function () {    
            if (!foundGU) {    
                clearInterval(waitForGU);    
                m.EH({    
                    message: 'mmcore.GU: no ga() found'    
                });    
            }    
        }, 4000);    
    });    
}; // end mmcore.GU() 
}catch(err){mmcore.EH(err);}
try{
;
(function () {
    var $ = window.jQuery,
        cookieCriteria = mmcore.GetCookie('mm_criteria', 1) || false,
        cookieSortByScore = mmcore.GetCookie('mm_sortScore', 1),
        cookieMostViewedCat = mmcore.GetCookie('mm_mostCat', 1);

    var sortByScore = {
        'Featured': 0,
        'Price (Low to High)': 0,
        'Price (High to Low)': 0,
        'Customer Ratings': 0
    };

    var mostViewedCat = {
        'Holidays': 0,
        'Baskets Towers': 0,
        'Fruit Gift': 0,
        'Monthly Club': 0,
        'Chocolates': 0,
        'Food Wine': 0,
        'Flowers': 0
    };

    mmcore.persCriteria = {
        'Referrer': '',
        'User Log In': 'No',
        'AlcoholPref': '',
        'Sort By Pref': '',
        'Gender': '',
        'Trademark': '',
        'Most Viewed Cat': ''
    };

    //restore all criteria from cookie, if it exists
    if (cookieCriteria) {
        var mm_JSON = JSON.parse(cookieCriteria);
        for (var key in mm_JSON) {
            if (typeof mmcore.persCriteria[key] != 'undefined') {
                mmcore.persCriteria[key] = mm_JSON[key];
            }
        }
    }

    mmcore.getCriteria = function () {
        //"Referrer" Criteria and "Trademark"
        var countReferrerCriteriaAndTrademark = function () {
            var lh = location.href;

            if (!mmcore.GetCookie('mm_30days', 1)) {
                mmcore.SetCookie('mm_30days', 1, 30, 1);

                //calculate Referrer
                if (/utm_medium=email/gi.test(lh)) {
                    mmcore.persCriteria.Referrer = 'Email';
                } else if (/utm_medium=socialmedia/gi.test(lh)) {
                    mmcore.persCriteria.Referrer = 'Social';
                } else if (/gclid=/gi.test(lh)) {
                    mmcore.persCriteria.Referrer = 'Paid Google';
                } else if (/utm_medium=cpc/gi.test(lh)) {
                    mmcore.persCriteria.Referrer = 'Paid Yahoo/Bing';
                } else if (/utm_medium=online_media/gi.test(lh)) {
                    mmcore.persCriteria.Referrer = 'Display Media';
                } else if (/utm_medium=affiliate/gi.test(lh)) {
                    mmcore.persCriteria.Referrer = 'Affiliate';
                } else if (document.referrer === '') {
                    mmcore.persCriteria.Referrer = 'Direct';
                } else {
                    mmcore.persCriteria.Referrer = 'Other';
                }

                //calculate Trademark
                if (/mmc=tm/g.test(lh)) {
                    mmcore.persCriteria.Trademark = 'Yes';
                } else if (/mmc=nontm/g.test(lh)) {
                    mmcore.persCriteria.Trademark = 'No';
                }
            }
        };

        //"User Log In" Criteria
        var countUserLogInCriteria = function () {
            var signIn = $('#header-bar-item-sign-in').length;
            if (!signIn) {
                mmcore.persCriteria['User Log In'] = 'Yes';
            }
        };

        //"AlcoholPref" criteria
        var countAlcoholPrefCriteria = function () {
            if (/gifts\/store\/BECCustomerPreferencesView\?preferencecenter/gi.test(location.href)) {
                var calculateAlcohol = function(){
                    if ($('input[name="wineEmail"]')[0].checked) {
                        mmcore.SetCookie('mm_alcohol', 1, 0, 1);
                    } else if (!$('input[name="wineEmail"]')[0].checked) {
                        mmcore.SetCookie('mm_alcohol', 0, 0, 1);
                    }
                };
                calculateAlcohol();

                $('#submitBtn a').on('click', calculateAlcohol);
            }

            if (mmcore.GetCookie('mm_alcohol', 1) === '1') {
                mmcore.persCriteria['AlcoholPref'] = 'Unsubscribed';
                mmcore.SetCookie('mm_alcohol', 0, -1, 1);
            } else if (mmcore.GetCookie('mm_alcohol', 1) === '0') {
                mmcore.persCriteria['AlcoholPref'] = 'Subscribed';
                mmcore.SetCookie('mm_alcohol', 0, -1, 1);
            }
        };

        //"Sort By Pref" criteria
        var countSortByPrefCriteria = function () {
            if (/category/gi.test(mmcore.pageType)) {
                if (cookieSortByScore) {
                    sortByScore = JSON.parse(cookieSortByScore);
                }

                //set cookie for page load
                if ($('#sortBy option:selected').text() === 'Featured') {
                    if (mmcore.GetCookie('mm_cat_viewcount', 1)) {
                        var count = mmcore.GetCookie('mm_cat_viewcount', 1) * 1 + 1;
                        mmcore.SetCookie('mm_cat_viewcount', count, 1, 1);
                    } else {
                        mmcore.SetCookie('mm_cat_viewcount', 1, 1, 1);
                    }
                }

                //handle event to track scores on click
                $('#sortBy').change(function () {
                    var currentSortOption = $(this).find('option:selected').text();
                    mmcore.SetCookie('mm_cat_viewcount', 1, -1, 1); //remove page view count cookie

                    for (var key in sortByScore) {
                        if (key === currentSortOption && currentSortOption !== 'Featured') {
                            sortByScore[key] += 1;
                        }
                    }

                    mmcore.SetCookie('mm_sortScore', JSON.stringify(sortByScore), 1, 1);
                });
            }

            //define the leader
            if (cookieSortByScore) {
                var arraySortScores = [], leaderSort;
                for (var key in sortByScore) {
                    arraySortScores.push(sortByScore[key]);
                }

                //sort array, define the leader
                arraySortScores.sort(function (a, b) {
                    return b - a
                });
                leaderSort = arraySortScores[0];

                for (var item in sortByScore) {
                    if (leaderSort === sortByScore[item]) {
                        mmcore.persCriteria['Sort By Pref'] = item;
                    }
                }
            }

            //set criteria if we have default value more than 4 times
            if (mmcore.GetCookie('mm_cat_viewcount', 1) >= '4' * 1) {
                mmcore.persCriteria['Sort By Pref'] = 'Featured';
            }
        };

        //"Gender" criteria
        var countGenderCriteria = function () {
            var criteriaValue = '';

            var calculateGender = function () {
                var gender = $('#personTitle_1 option:selected').val();

                if (gender === 'MR/MRS' || gender === 'MR/MS' || gender === 'DR' || gender === '') {
                    criteriaValue = 'Unknown';
                } else if (gender === 'MRS' || gender === 'MS' || gender === 'DR/MRS' || gender === 'MISS') {
                    criteriaValue = 'Female';
                } else if (gender !== '') {
                    criteriaValue = 'Male';
                }

                mmcore.SetCookie('mm_gender', criteriaValue, 1, 1);
            };

            //set criteria value on account page
            if (/gifts\/store\/UserRegistrationForm/gi.test(location.href)) {
                $('a:contains("Submit")').on('click', calculateGender);
            }

            //set criteria value on billing page
            if (/OrderDisplay\?orderId=.*&storeId.*/gi.test(location.href)) {
                $('body').on('click', '#billingAddressPopup a:contains("Save")', calculateGender);

                //read gender from billing text
                var text = $('.addressWrapper .name').text();
                if(/DR/g.test(text)) mmcore.SetCookie('mm_gender', 'Unknown', 1, 1);
                if(/MR/g.test(text)) mmcore.SetCookie('mm_gender', 'Male', 1, 1);
                if(/MS|MRS|MISS/g.test(text)) mmcore.SetCookie('mm_gender', 'Female', 1, 1);
                if(/MR\/MRS|MR\/MS/g.test(text)) mmcore.SetCookie('mm_gender', 'Unknown', 1, 1);
                if(/DR\/MR/g.test(text)) mmcore.SetCookie('mm_gender', 'Male', 1, 1);
                if(/DR\/MRS/g.test(text)) mmcore.SetCookie('mm_gender', 'Female', 1, 1);
                if(!/MR\/MRS|MR\/MS|DR|MRS|MS|DR\/MRS|MISS|MR|DR\/MR/g.test(text)) mmcore.SetCookie('mm_gender', 'Unknown', 1, 1);
            }

            mmcore.persCriteria.Gender = mmcore.GetCookie('mm_gender', 1);
        };

        //"Cat Most Viewed" criteria
        var countMostViewedCriteria = function () {
            if (/category|product/gi.test(mmcore.pageType)) {
                if (cookieMostViewedCat) {
                    mostViewedCat = JSON.parse(cookieMostViewedCat);
                }

                //handle event to track scores on click
                if (/holiday-gifts-occasions/g.test(location.href)) {
                    mostViewedCat.Holidays += 1;
                } else if (/gift-baskets-tower-boxes/.test(location.href)) {
                    mostViewedCat['Baskets Towers'] += 1;
                } else if (/fruit-gift|citrus-gifts/.test(location.href)) {
                    mostViewedCat['Fruit Gift'] += 1;
                } else if (/monthly-gift-clubs/.test(location.href)) {
                    mostViewedCat['Monthly Club'] += 1;
                } else if (/chocolates-sweets-candy/.test(location.href)) {
                    mostViewedCat['Chocolates'] += 1;
                } else if (/gourmet-foods/.test(location.href)) {
                    mostViewedCat['Food Wine'] += 1;
                } else if (/flowers-plants/.test(location.href)) {
                    mostViewedCat['Flowers'] += 1;
                }
                mmcore.SetCookie('mm_mostCat', JSON.stringify(mostViewedCat), 1, 1);
            }

            //define the leader
            if (cookieMostViewedCat) {
                var arrayCatScores = [], leaderSort;
                for (var key in mostViewedCat) {
                    arrayCatScores.push(mostViewedCat[key]);
                }

                //sort array, define the leader
                arrayCatScores.sort(function (a, b) {
                    return b - a
                });
                leaderSort = arrayCatScores[0];

                for (var item in mostViewedCat) {
                    if (leaderSort === mostViewedCat[item]) {
                        mmcore.persCriteria['Most Viewed Cat'] = item;
                    }
                }
            }
        };

        //init criteria
        countReferrerCriteriaAndTrademark();
        countUserLogInCriteria();
        countAlcoholPrefCriteria();
        countSortByPrefCriteria();
        countGenderCriteria();
        countMostViewedCriteria();

        //save to cookie
        mmcore.SetCookie('mm_criteria', JSON.stringify(mmcore.persCriteria), 365, 1);
        for (var key in mmcore.persCriteria) {
            mmcore.SetPersCriterion(key, mmcore.persCriteria[key]);
        }
    };

    mmcore.AddDocLoadHandler(mmcore.getCriteria);
})();
}catch(err){mmcore.EH(err);}
try{
;(function(){
		var cn = document.childNodes, hcn = document.getElementsByTagName('html')[0].childNodes, mm_flag = true;
		
		if ((navigator.userAgent.indexOf('MSIE 8.0') > -1)){
			for(var i=0; i<cn.length; i++){
				if(cn[i].nodeType == 8){
					if ((cn[i].data.indexOf('BECProductDisplay.jsp') > -1) || (cn[i].data.indexOf('BECDynamicKitDisplay.jsp') > -1) || (cn[i].data.indexOf('BECPackageDisplay.jsp') > -1) || (cn[i].data.indexOf('BECWineDisplay.jsp') > -1)){
						mm_flag = false;		
						mmcore.SetPageID('mm_HD_productPage');
						mmcore.CGRequest();
					}
				}
			}
			if (mm_flag){
				if ((document.getElementsByTagName('html')[0].innerHTML.indexOf('<!-- BEGIN: BECProductDisplay.jsp -->') > -1) && (document.getElementsByTagName('html')[0].innerHTML.indexOf('<!-- BEGIN: BECProductDisplay.jsp -->') < 500)){
					mm_flag = false;		
					mmcore.SetPageID('mm_HD_productPage');
					mmcore.CGRequest();
				}
			}
		} else {
			for(var i=0; i<cn.length; i++){
				if(cn[i].nodeType == 8){
					if ((cn[i].data.indexOf('BECProductDisplay.jsp') > -1) || (cn[i].data.indexOf('BECDynamicKitDisplay.jsp') > -1) || (cn[i].data.indexOf('BECPackageDisplay.jsp') > -1) || (cn[i].data.indexOf('BECWineDisplay.jsp') > -1)){
						mm_flag = false;
						mmcore.SetPageID('mm_HD_productPage');
						mmcore.CGRequest();
					}
				}
			}
			if (mm_flag){
				for(var i=0; i<hcn.length; i++){
					if(hcn[i].nodeType == 8){
						if ((hcn[i].data.indexOf('BECProductDisplay.jsp') > -1) || (hcn[i].data.indexOf('BECDynamicKitDisplay.jsp') > -1) || (hcn[i].data.indexOf('BECPackageDisplay.jsp') > -1) || (hcn[i].data.indexOf('BECWineDisplay.jsp') > -1)){
							mm_flag = false;	
							mmcore.SetPageID('mm_HD_productPage');
							mmcore.CGRequest();
						}
					}
				}
			}		
		}
})();
}catch(err){mmcore.EH(err);}
try{
;(function () {
	mmcore.AddDocLoadHandler(function(){
		setTimeout(function(){
			if (window.jQuery && jQuery('.button-add-to-cart').length){
				mmcore.trigger('add_to_cart', {
                    value: 1
                });
			}
		},0);
	});
})();
}catch(err){mmcore.EH(err);}
try{
;(function(){
	function bind(el, func){
		if(el.addEventListener){
			el.addEventListener('beforeprint', func, false);
		}else if(el.attachEvent){
			el.attachEvent('onbeforeprint', func);
		}	
	}

	if(navigator.userAgent.match(/msie/i)){
		bind(window, function(){
			var nodes = document.getElementsByTagName('script');
			for(var i = nodes.length; i--;){
				if((nodes[i].id || '').match(mmcore.cprefix))
					nodes[i].removeAttribute('src');
			}
		});
	}
})();
}catch(err){mmcore.EH(err);}
try{
mmcore.on('add_to_cart_all', function (data) {
	var attr = 'Full site';
	if(data.isMobile){
		attr = 'Mobile site';
	}
	mmcore.$Action('AddtoCartFullMobile', 1, attr);
});
}catch(err){mmcore.EH(err);}
try{
mmcore.AddDocLoadHandler(function(){
/*  Default "/bec/analytics/coremetrics/addtocartview" event triggers when a visitor add product to cart.
 *	@data object example:
 *		attributes: "chocolates-sweets-candy_truffles-_-0-_-0-_-0-_-ProductStandard"
 *	    category: "chocolates-sweets-candy_truffles"
 *	    currency: ""
 *	    displayMethod: "ProductStandard"
 *	    masterCategory: ""
 *	    name: "Harvest Truffles"
 *	    orderItemId: "42950076"
 *	    price: "19.95"
 *	    productId: "26483"
 *	    quantity: "1.0"
 */
    dojo.subscribe("/bec/analytics/coremetrics/addtocartview", function(data){

        mmcore.trigger('success_add_to_cart', data, function(){
            mmcore._async = true;
            mmcore.SetPageID('mmevents');
            mmcore.CGRequest();
        });

    });
});
}catch(err){mmcore.EH(err);}
try{
;(function(){
      if(mmcore.pageType != 'BECCategoryDisplay') return;
      mmcore._async = true;
      mmcore.SetPageID('CatPageVP');
      mmcore.CGRequest();
})();
}catch(err){mmcore.EH(err);}
try{
;(function () {
    mmcore.AddDocLoadHandler(function () {
        var isProductPage = cmProductPage && cmProductPage.toLowerCase() == 'yes';
        if (isProductPage) {
            var criteria = mmcore.persCriteria || {};
            for (var name in criteria) {
                mmcore.SetPersCriterion(name, criteria[name]);
            }
            mmcore._async = true;
            mmcore.SetPageID('CID T4 ID');
            mmcore.CGRequest();
        } else {
            return;
        }
    });
}());
}catch(err){mmcore.EH(err);}
try{
if (mmcore.pageType === "BECProductDisplay") { //if the page is a product details page
    mmcore.SetPageID('DemoVCB VP'); //send the user to the virtual page and into the test
    mmcore.CGRequest();
}
}catch(err){mmcore.EH(err);}
try{
(function(){
	if(!window.jQuery) return;
    // --- QuickLinks Action
    jQuery("#menu-navx-110428 a").live('click', function(){
        var attr = this.className;
        mmcore.$Action("QuickLinks",1,attr);
    })
    // --- TopNavClicks Action
    jQuery("#menu-shop-by-price a[href]").live('click', function(){
        mmcore.$Action("TopNavClicks",1,"ByPrice");
    })
    jQuery("#menu-shop-by-occasion a[href]").live('click', function(){
        mmcore.$Action("TopNavClicks",1,"ByOcassion");
    })
    jQuery("#menu-shop-gifts-by-type a[href]").live('click', function(){
        mmcore.$Action("TopNavClicks",1,"ByCategory");
    })
    jQuery("#menu-shop-by-recipient a[href]").live('click', function(){
        mmcore.$Action("TopNavClicks",1,"ByRecipient");
    })
    jQuery("#menu-gourmet-gift-sales-and-values a[href]").live('click', function(){
        mmcore.$Action("TopNavClicks",1,"Sale");
    })
    jQuery(".homeFeature .genericESpot area, .genericESpot:first a").live('click', function(){
        mmcore.$Action("MainBannerClicks",1);
    })
    /* Time to Purchase Action Start Time*/
    setTimeout(function(){
        var timer = mmcore.GetCookie("tmr");
        if(!timer){
            var tmv = parseInt((new Date().getTime()/1000));
            mmcore.SetCookie("tmr", tmv, 365);
        }
    },0);
}())
}catch(err){mmcore.EH(err);}
try{
(function(){
	if(!window.jQuery) return;
		jQuery('.btnAddToCart').live('mousedown', function(){
		mmcore._async=1;
		mmcore.SetPageID('done');
		mmcore.SetAction('AddToCart',1);
		mmcore.CGRequest();
	});
}());
}catch(err){mmcore.EH(err);}
try{
;(function(){
    mmcore.AddDocLoadHandler(function(){
        if(window.isMobile && ~mmcore.pageType.indexOf('ProductDisplay')){
            mmcore._async = 1;
            mmcore.SetPageID('mmevents');
            mmcore.SetAction('M_ProductPageViews', 1, '');
            mmcore.CGRequest();
        }
    });
})();
}catch(err){mmcore.EH(err);}
try{
mmcore.on('searches', function(){
	mmcore.$Action('Searches',1,'');
});
}catch(err){mmcore.EH(err);}
try{
mmcore.on('add_to_cart_all', function () {
    mmcore.$Action('AddtoCartClicks_ALL', 1, '');
});
}catch(err){mmcore.EH(err);}
try{
mmcore.on('add_to_cart', function(data){
    mmcore.AddDocLoadHandler(function(){
		function request() {
			mmcore._async = true;
			mmcore.SetPageID('mmevents');
			mmcore.CGRequest();
		}
		jQuery('body').on('click','.button-add-to-cart',function(){
			mmcore.SetAction('AddtoCartClicks',data.value);
			request();
		});
	});
});
}catch(err){mmcore.EH(err);}
try{
mmcore.AttachStyle=function(text){if(document.body){var style=document.createElement('style');style.type='text/css';if(/WebKit|MSIE/i.test(navigator.userAgent)){if(style.styleSheet){style.styleSheet.cssText=text}else{style.innerText=text}}else{style.innerHTML=text}document.getElementsByTagName('head')[0].appendChild(style)}else{document.write('<style type="text/css">'+text+'</style>')}};

mmcore.AttachStyle(' \
	#productMediaAndUpSells .up_sale { visibility: hidden; } \
	.mm-view { overflow: hidden; } \
	.mm-view a { \
		display: block; \
		width: 64px; \
		height: 25px; \
		float: right; \
		color: #fff; \
		text-align: center; \
		font: bold 11px/25px Verdana, Arial, sans-serif; \
		background: url("//service.maxymiser.net/cdn/harryanddavid/maxrec/button25.png"); \
		text-decoration: none; \
		text-transform: uppercase; \
	} \
	.mm-view a:hover { background-position: 0 -25px; } \
');

// Wait in interval for mmcore.GenInfo.ProdPageRecs2.element1 and if default variant is arrived — show content
(function(){
	var gi = mmcore.GenInfo,
		done = false;
	
	function modifyAndShow() {
		var recsBlock = $('.up_sale .title:contains("May We Also Suggest")');
		if (recsBlock.length) {
			recsBlock = recsBlock.parent();
			recsBlock.find('.rating').remove();

			function setHeight(){	// Set height and append button
				var heights = [], els, max, href;
				els = $('.name', recsBlock);
				els.each(function(){
					heights.push($(this).height());
					href = $('a', this).attr('href');
					$(this).next().after('<div class="mm-view"> <a href="' + href + '">View</a> </div>');
				});
				max = Math.max.apply(Math, heights);
				els.height(max);
			}
			setHeight();
			mmcore.addRecsClickAction();
		}
		mmcore.AttachStyle(' #productMediaAndUpSells .up_sale { visibility: visible; } ');
		done = true;
	}
	
	var waiter = setInterval(function(){
		if (typeof gi.ProdPageRecs2 != 'undefined' && typeof gi.ProdPageRecs2.element1 != 'undefined') {
			clearInterval(waiter);
			if (gi.ProdPageRecs2.element1.toLowerCase() == 'default') {
				modifyAndShow();
			}
		}
	}, 100);
	
	mmcore.AddDocLoadHandler(function(){
		setTimeout(function(){
			if (!done) {
				clearInterval(waiter);
				mmcore.AttachStyle(' #productMediaAndUpSells .up_sale { visibility: visible; } ');
			}
		}, 5000);
		// 31/10/14 ARO replace attr of images https://maxymiser.myjetbrains.com/youtrack/issue/MM-1003427
        (function() {
            var checkImages = setInterval(function() {
                if ($('img[src*="ChannelAdvisorPreset"]').length) {
                    $('img[src*="ChannelAdvisorPreset"]').each(function() {
                        var currentAttr, replacedAttr;
                        currentAttr = $(this).attr('src');
                        replacedAttr = currentAttr.replace(/ChannelAdvisorPreset/g, 'thumbnail_cross_sale2010');
                        $(this).attr('src', replacedAttr);
                    });
                    clearInterval(checkImages);
                }
            }, 100);
        }());
        /*/////////////////////////////////////////////////////////////////////////////////////////////*/
	});
})();
}catch(err){mmcore.EH(err);}
try{
(function(){
    if(mmcore.pageType != "BECCategoryDisplay") return;
    mmcore.AddDocLoadHandler(function(){
        setTimeout(function(){
          
            $('#results').on('mouseup', 'a:not(:contains("Compare"))', function(e){
                mmcore.$Action('ProductClicks', 1, '');
                if(!this.href.replace(location.href.replace(location.hash,''),'').indexOf('#')){
                    mmcore._async = 1;
                    mmcore.SetPageID('mmevents');
                    mmcore.CGRequest();
                }
            });
          
        }, 0);
    });
})();
}catch(err){mmcore.EH(err);}
try{
mmcore.on('success_add_to_cart', function(){
  	if (window.cmProductPage && window.cmProductPage.toLowerCase() == 'yes') {
  		mmcore.SetAction('AddtoCartClickPDP', 1, '');
    }
});
}catch(err){mmcore.EH(err);}
if(typeof mmcore._callback=='object'&&typeof mmcore._callback[1]=='function'){try{mmcore._callback[1]();}catch(err){mmcore.EH(err);}
finally{mmcore._callback[1]=null;}}
})();