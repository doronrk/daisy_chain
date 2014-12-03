// Baynote custom-script $Revision: 1.16 $

/* 
 * function for simple A/B us vs them recommendation test.
 * 
 */
 function baynote_policyLoaded()
{
	if(BaynoteAPI.getPolicy("guide","ok")){
		if(document.getElementById("BN_Upsell")) {
			(document.getElementById("BN_Upsell")).style.display = "block";
			if(document.getElementById("productOptions"))
				(document.getElementById("productOptions")).className = "span5";
		}
		if(document.getElementById("BN_ShoppingBag"))
			(document.getElementById("BN_ShoppingBag")).style.display = "block";
		if(document.getElementById("Buckle_Upsell"))
			(document.getElementById("Buckle_Upsell")).style.display = "none";
		if(document.getElementById("Buckle_ShoppingBag"))
			(document.getElementById("Buckle_ShoppingBag")).style.display = "none";
	} else {
		if(document.getElementById("Buckle_Upsell"))
			(document.getElementById("Buckle_Upsell")).style.display = "block";
		if(document.getElementById("Buckle_ShoppingBag"))
			(document.getElementById("Buckle_ShoppingBag")).style.display = "block";
		if(document.getElementById("BN_Upsell")) {
			(document.getElementById("BN_Upsell")).style.display = "none";
			if(document.getElementById("productOptions"))
				(document.getElementById("productOptions")).className = "span7";
		}
		if(document.getElementById("BN_ShoppingBag"))
			(document.getElementById("BN_ShoppingBag")).style.display = "none";
	}	 
	
}

function bn_addGenderFilter(tag) {
	var pathname = location.pathname;
	var filter = "";
	if (pathname.indexOf("/womens/jeans") != -1 || (pathname.indexOf("/womens/") != -1 && (pathname.indexOf("/sale") != -1 || pathname.indexOf("/new") != -1 || pathname.indexOf("/brand:bke") != -1)) || pathname.indexOf("/womens/shoes") != -1) {
		filter = "gender:Women";
	} else if (pathname.indexOf("/mens/jeans") != -1 || (pathname.indexOf("/mens/") != -1 && (pathname.indexOf("/sale") != -1 || pathname.indexOf("/new") != -1 || pathname.indexOf("/brand:bke") != -1)) || pathname.indexOf("/mens/shoes") != -1) {
		filter = "gender:Men";
	} else if (pathname.indexOf("/boys") != -1) {
		filter = "gender:Boy";
	} else if (pathname.indexOf("/girls") != -1) {
		filter = "gender:Girl";
	}
	if (BaynoteAPI.isNotEmpty(filter)) {
		if (tag.attrFilter && BaynoteAPI.isNotEmpty(tag.attrFilter)) {
			tag.attrFilter += "," + filter;
		} else {
			tag.attrFilter = filter;
		}
	}
}

function bn_ListShoppingCartProducts(tag) {
	var bn_cartProducts = new Array();
	var td = document.getElementsByTagName("td");
	for (var i = 0; i < td.length; i++) {
		if (td[i].className.indexOf("image") != -1) {
			var a = td[i].getElementsByTagName("a");
			var href = "";
			if (a.length && a[0].href) {
				if (a[0].href.indexOf("http") != 0) {
					href = "http://www.buckle.com" + a[0].href;
				} else {
					href = a[0].href;
				}
			}
			if (BaynoteAPI.isNotEmpty(href)) {
				bn_cartProducts.push(href);
			}
		}
	}
	if (bn_cartProducts.length > 0) {
		tag.listUrls = bn_cartProducts;
	}
}

function bn_checkUrl(tag) {
	if (location.href.indexOf("sku" == -1)) {
		var metas = document.getElementsByTagName("meta");
		var url = "";
		for (var i = 0; i < metas.length; i++) {
			if (typeof(metas[i].attributes.property) != "undefined" && metas[i].attributes.property.value == "og:url") {
				url = metas[i].content;
				break;
			}
		}
		tag.url = url;
	}
}

function bn_addFirstFilterToTemplate(tag) {
	var url = document.location.href;
	url = url.split('http:')[1];
	var buckeJeansId  = document.getElementById('BN_JeansThumbnail');
	var categoryValue = '';
	if(buckeJeansId != null){ 
		if(url.indexOf(':') != -1) {
			var splitString = url.split(':');
			//console.log(splitString);
			categoryValue = splitString[1];
			var category = splitString[0].split('/');
			category = category[category.length-1];
			//console.log(category);
			if (category == 'price') {
				category = 'salePrice';
			}
			if (category == 'leg-opening') {
				category = 'legOpening';
			}	
			if (category == 'print-material') {
				category = 'printMaterial';
			}
			if(categoryValue.indexOf('/') != -1) {
		    		categoryValue = categoryValue.split('/')[0];
		    		//console.log(queryTermSplit);
			}
		 	//console.log(categoryValue);
			if(categoryValue.indexOf('-') != -1 && categoryValue != 'mid-rise' && categoryValue != 'non-stretch' && category != 'salePrice') {
				if (category ==  'legOpening') {
					categoryValue = categoryValue.replace('-',' ');
				}
				else {
					categoryValue = categoryValue.replace('-',' ','g');
				}
			}
			if(categoryValue.indexOf('-') != -1 && category == 'salePrice') {
				categoryValue = categoryValue.replace('-','..');

			}			
			//tag.query = queryTerm;// + ' ' + category;
			var filter = '';
			if(categoryValue.indexOf('+') != -1) {
		     		var stringReplace = '|'+category+':';
		     		categoryValue = categoryValue.replace('+',stringReplace,'g');
		     		filter = category+':'+categoryValue;
			} else {
				filter = category+':'+categoryValue;
			}
			//console.log(filter);
			if (category != 'waist' && category != 'color' && category != 'dimension' && category != 'inseam' && category != 'looks') {
				if (tag.attrFilter && BaynoteAPI.isNotEmpty(tag.attrFilter)) {
					tag.attrFilter += "," + filter;
				} else {
					tag.attrFilter = filter;
				}
			}
		}
	}
	//shoe page
    var buckleShoesId  = document.getElementById('BN_Shoes');
	if (buckleShoesId  != null) {
		if(url.indexOf(':') != -1) {
			var splitString = url.split(':');
			categoryValue = splitString[1];
			var category = splitString[0].split('/');
			category = category[category.length-1];
            //strip off any refinements after the first one
			if (categoryValue.indexOf('/') != -1) {
                                categoryValue = categoryValue.split('/')[0];
            }
			//change the name of the attribute to map the backend
            if (category == 'refine-by') {
                    category = 'refineBy';
            }		
			if (category == 'print-material') {
				category = 'printMaterial';
			}
            if (category == 'shoe-size') {
                    category = 'size';
            }
			//change the price value to match the backend
			if(categoryValue.indexOf('-') != -1 && category == 'price') {
				if (categoryValue == '150-and-up') {
					categoryValue = '150..';
				}
				else
					categoryValue = categoryValue.replace('-','..');
			}		
			//upper case the values to map the backend
			//map the value of the show size to match the backend
			if (category == 'size') {
				if (categoryValue.indexOf('+') != -1) {
					categoryValueSplit = categoryValue.split('+');
					var finalString = '';
				        for (var i = 0; i<categoryValueSplit.length; i++) {
						finalString += 'US ' + categoryValueSplit[i];
						if (i+1 < categoryValueSplit.length ) {
                            finalString += '+';
						}
					}
					categoryValue = finalString;
				}
				else
					categoryValue = 'US ' + categoryValue;
                if (categoryValue.indexOf('-') != -1) {
					if (categoryValue.indexOf('+') != -1) {
						categorySplit = categoryValue.split('+');
						var finalCatValue = '';
						for (var i =0; i<categorySplit.length; i++) {
							if (categorySplit[i].indexOf('-') != -1){
								var categoryIndSplit = categorySplit[i].split('-');
								finalCatValue += categoryIndSplit[0] +'-' +categoryIndSplit[1] +'/'+ categoryIndSplit[2];
							} else {
								finalCatValue += categorySplit[i]; 
							}
							if (i+1 < categorySplit.length ) {
								finalCatValue += '+';
	       	                }	
						}
						categoryValue = finalCatValue;
					}
					else {
						categorySplit = categoryValue.split('-');
                        categoryValue = categorySplit[0] + '-' + categorySplit[1] + '/'+ categorySplit[2];
					}
                }

			}
			//map the value of the brands to match the backend - upper case the first letter 
			if (category == 'brand' || category == 'refineBy' || category == 'printMaterial' ) {
				if (categoryValue == 'mules-slides') {
					categoryValue = 'Mules / Slides';
				}
				else if (categoryValue == 'tennies-athletic') {
					categoryValue = 'Tennies / Athletic';
				}
				// if multi-valued 
				else if (categoryValue.indexOf('+') != -1) {
					//if value contains hyphen
					if (categoryValue.indexOf('-') != -1) {
						var categoryValuesString = categoryValue.split('+');
						var finalString = '';
						for (var i =0; i< categoryValuesString.length;i++) {
							if (categoryValuesString[i].indexOf('-') != -1) {
								var categoryValuesSplitHyphenString = categoryValuesString[i].split('-');
								for (var j=0; j<categoryValuesSplitHyphenString.length;j++) {
									if(categoryValuesSplitHyphenString[j] == 'by') {
										finalString += 'by';
									}
									else {
										finalString += categoryValuesSplitHyphenString[j].charAt(0).toUpperCase() + categoryValuesSplitHyphenString[j].slice(1);
									}
									if (j+1 < categoryValuesSplitHyphenString.length) {
										finalString += ' ';
									}
								}
							} else {
								finalString += categoryValuesString[i].charAt(0).toUpperCase() + categoryValuesString[i].slice(1);
							}	
							if (i+1 < categoryValuesString.length ) {
								finalString += '+';
                            }	
						}
						categoryValue = finalString;
					} 
					//values do not have hyphen in them
					else {
						var categorySplitString = categoryValue.split('+');
						var finalString = '';
						for (var i = 0; i<categorySplitString.length; i++) {
							finalString += categorySplitString[i].charAt(0).toUpperCase() + categorySplitString[i].slice(1);
							if (i+1 < categorySplitString.length ) {
								finalString += '+';
							}
						}
						categoryValue = finalString;
					}
				}
				//single value with a hyphen in it
				else if (categoryValue.indexOf('-') != -1) {
	            	var categorySplitString = categoryValue.split('-');
	                    var finalString = '';
	                    for (var i = 0; i<categorySplitString.length; i++) {
	                    	if (categorySplitString[i] == 'by') {
	                           	       finalString += 'by';
	                            } else {
	              	              finalString += categorySplitString[i].charAt(0).toUpperCase() + categorySplitString[i].slice(1);
	                            }
	                            if (i+1 < categorySplitString.length ) {
	                                   finalString += ' ';
	                            }
	                    }
	                    categoryValue = finalString;

				} else {
					categoryValue = categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1);
				}
			}

			var filter = '';
			if(categoryValue.indexOf('+') != -1) {
		     		var stringReplace = '|'+category+':';
		     		categoryValue = categoryValue.replace('+',stringReplace,'g');
		     		filter = category+':'+categoryValue;
			} else {
				filter = category+':'+categoryValue;
			}	
			if (category != 'color' && category != 'looks') {
				if (tag.attrFilter && BaynoteAPI.isNotEmpty(tag.attrFilter)) {
					tag.attrFilter += "," + filter;
				} else {
					tag.attrFilter = filter;
				}
			}

		}
	}
}

//capture product id on guide click
function bn_onClickHandler(clicked, exitInfo) {
	if (clicked === undefined) 
		return false; // Check if clicked is not being called explicitly
	var clickProdId = "";
	if (typeof(bnObserver) != 'undefined' && typeof(bnObserver.defaultExitConfirmation) != 'undefined') {
		exitResult = bnObserver.defaultExitConfirmation(clicked,exitInfo);
		if (!exitResult) 
			return false;
	}
	// Idenitfying a guide click. Please update as per Customer's website.
	if ((BaynoteAPI.isNotEmpty(clicked.tagName) && (clicked.tagName == "IMG" || clicked.tagName == "P"))) {
		if (clicked.parentNode && clicked.parentNode.tagName == "A") {
			clickProdId = clicked.parentNode.getAttribute("baynote_pid");
		}
	}
	if ((BaynoteAPI.isNotEmpty(clicked.tagName) && clicked.tagName == "A")) {
		clickProdId = clicked.getAttribute("baynote_pid");
	}
	if (BaynoteAPI.isNotEmpty(clickProdId)) {
		if (typeof exitInfo != 'undefined' && exitInfo != null) {
			exitInfo.attrs = exitInfo.attrs || {}; // Append and not replace the existing exitInfo.attrs
		}
		exitInfo.attrs.prodId = clickProdId;
	}
	return true;
}

/*
 * function to add additional parameters to rec call, example deduplicate=true.
 */
function bn_setEngine(tag) {
	tag.extraParams = tag.extraParams || {};
	tag.extraParams.deduplicate = "true";
	tag.extraParams.useCache = "false";
}

function myPreHandler(tag) { 

	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.OBSERVER_TAG)   {	
			baynote_policyLoaded();
		tag.exitConfirmation = bn_onClickHandler;

/*		
		// Media Duration
		if (typeof(bnMediaDuration) != "undefined" && BaynoteAPI.isNotEmpty(bnMediaDuration)) 
			tag.attrs.expectedDuration = bnMediaDuration;
*/		
	} // code that runs before the observer fires
  
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG)   {
		bn_setEngine(tag);
		bn_addGenderFilter(tag);
		if (location.href.indexOf("shopping_bag") != -1) {
			bn_ListShoppingCartProducts(tag);
		}
		bn_checkUrl(tag);
		bn_addFirstFilterToTemplate(tag);

/*		
		var query = BaynoteAPI.getURLParam("q");
		if (query != "") 
		tag.query = query;	
		
		var bn_locHref = BaynoteAPI.getFullURL();

		if(bn_locHref.match(/(https?)(:\/\/.*)(site.*)/) )  {
           	tag.url = bn_locHref.replace(/(https?)(:\/\/.*)(site.*)/, "$1://www.$3");
        } 
		
		if(bn_locHref.match(/(https?)(:\/\/)([0-9.]+)(.*)/))  {
	       tag.url = bn_locHref.replace(/(https?)(:\/\/)([0-9.]+)(.*)/, "$1://www.site.com$4");
		}
		//shopping cart recs
		if(bn_location_href.search("^https?://www\.mysite\.com\/shoppingcart.aspx.*", "i") >= 0){
			if(typeof(bn_CartProducts) != "undefined" && BaynoteAPI.isNotEmpty(bn_CartProducts)){
				tag.listUrls = bn_CartProducts;	
			}
		}
		//do stuff before recs have loaded
*/
	}
	
    return true;      
} 

function myPostHandler(tag) {
/*
	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG) {
		//do stuff after recs have loaded
	}
*/
	return true;
}

// register the event handler
baynote_globals.onBeforeTagShow.push(myPreHandler);
baynote_globals.onTagShow.push(myPostHandler); 
bnResourceManager.registerResource(baynote_globals.ScriptResourceId); 