//WT Code Omniture Start
var omniturePage = '';
var omnitureCart = '';
var omnitureProdId = '';
var pageNameType = '';
var omnitureStore = '';

function addToCartOmniture(omniPage, omniCart, omniProdId) {
    if (jQuery('#hdrSection1').find('.bru').hasClass('active')) {
        omnitureStore = 'BRU';
    } else {
        omnitureStore = 'TRU';
    }
    if (omniPage != null && omniCart != null && omniProdId != null)
    {
        omniturePage = omniPage;
        omnitureCart = omniCart;
        omnitureProdId = omniProdId;

        if (s.prop1 != null && s.prop1.indexOf(":") > -1) {
            var tempProp1 = s.prop1.split(':');
            pageNameType = tempProp1[0] + ": " + omnitureStore + ": Concealment Popup";
        } else {
            pageNameType = "en_US: " + omnitureStore + ": Concealment Popup";
        }

        if (pageNameType != '') {
            s.pageName = pageNameType;
            s.prop1 = pageNameType;
        }

        var s_account = 'gsictrustgf';
        s.events = 'event24';
        s.eVar28 = omniPage + ": " + omniCart + ": Concealment Popup";
        s.products = ";" + omniProdId + ";;;;";
        s.linkTrackVars = "pageName,eVar28,prop1,products";
        s.linkTrackEvents = 'event24';
        s.tl(null, 'o', null);
    }
}
function omnitureContinue() {
    if (pageNameType != '') {
        s.pageName = pageNameType;
        s.prop1 = pageNameType;
    }	
    var s_account = 'gsictrustgf';
    s.events = 'event24';
    s.products = ";" + omnitureProdId + ";;;;";
    s.eVar28 = omniturePage + ": " + omnitureCart + ": Concealment Popup: Continue";
    s.linkTrackVars = "pageName,eVar28,prop1,products";
    s.linkTrackEvents = 'event24';
    s.tl(null, 'o', null);
}
function omnitureCancel() {
    if (pageNameType != '') {
        s.pageName = pageNameType;
        s.prop1 = pageNameType;
    }
    var s_account = 'gsictrustgf';
    s.events = 'event24';
    s.products = ";" + omnitureProdId + ";;;;";
    s.eVar28 = omniturePage + ": " + omnitureCart + ": Concealment Popup: Cancel";
    s.linkTrackVars = "pageName,eVar28,prop1,products";
    s.linkTrackEvents = 'event24';
    s.tl(null, 'o', null);
}

function omnitureClose() {
    if (pageNameType != '') {
        s.pageName = pageNameType;
        s.prop1 = pageNameType;
    }
    var s_account = 'gsictrustgf';
    s.events = 'event24';
    s.products = ";" + omnitureProdId + ";;;;";
    s.eVar28 = omniturePage + ": " + omnitureCart + ": Concealment Popup: Close";
    s.linkTrackVars = "pageName,eVar28,prop1,products";
    s.linkTrackEvents = 'event24';
    s.tl(null, 'o', null);
}

function omnitureDoNotRemind() {
    if (pageNameType != '') {
        s.pageName = pageNameType;
        s.prop1 = pageNameType;
    }
    var s_account = 'gsictrustgf';
    s.events = 'event24';
    s.products = ";" + omnitureProdId + ";;;;";
    s.eVar28 = omniturePage + ": " + omnitureCart + ": Concealment Popup: Do not remind me again";
    s.linkTrackVars = "pageName,eVar28,prop1,products";
    s.linkTrackEvents = 'event24';
    s.tl(null, 'o', null);
}

function getValueFromPidElement(pidElement, element) {
    var idList = pidElement.split("|");
    var sku = idList[1];
    var pid = idList[0];
    if (element.indexOf('PID') >= 0) {
        return pid;
    } else {
        return sku;
    }
}

//WT Code Omniture End

calledFromConcealment = false
var
        mopal = jQuery("#mopalOverlay,#mopalLightBox"),
        eventCalledFrom = "",
        doNotShowConcealmentPopupAgain = jQuery('.chkDontRemindMeAgain'),
        mayLikeProductID = "",
        verifyFlag = "",
        isInStorePickupAvailable = false,
        isSTS = false,
        inStorePickupArgs = [],
        wLSingleProdObj = null,
        wLBulkProdObj = null,
        wLBulkSelectedProdObj = null,
        rpFormObj = null,
        bundleFormObj = null,
        collectionFormObj = null,
        regBulkProdObj = null,
        regBulkSelectedProdObj = null,
        regSingleProdObj = null;
		isSelectStore=false;

if (typeof Trus)
    Trus = {}; //doing this as tus object is cluttered in Trus.js
if (typeof Trus.concealment)
    Trus.concealment = {
        getCookieValue: function(cookieName) {
            var name = cookieName + "=";
            var cookieCollection = document.cookie.split(';');
            for (var i = 0; i < cookieCollection.length; i++) {
                var ck = cookieCollection[i];
                while (ck.charAt(0) == ' ')
                    ck = ck.substring(1);
                if (ck.indexOf(name) != -1)
                    return ck.substring(name.length, ck.length);
            }
            return "";
        },
        getConcealmentCookies: function() {
            var concealmentSessionID = "concealmentSessionID=",
                    currentJSessionID = "JSESSIONID=",
                    displayconcealmentAgain = "displayconcealmentAgain=";

            var cookieCollection = document.cookie.split(';');
            var concealmentCookies = [];

            if (document.cookie.indexOf('displayconcealmentAgain') != -1) {
                for (var i = 0; i < cookieCollection.length; i++) {
                    var ck = cookieCollection[i];
                    while (ck.charAt(0) == ' ')
                        ck = ck.substring(1);

                    if (ck.indexOf("displayconcealmentAgain") != -1) {
                        concealmentCookies[0] = ck.substring(displayconcealmentAgain.length, ck.length);
                    }
                    if (ck.indexOf("concealmentSessionID") != -1)
                        concealmentCookies[1] = ck.substring(concealmentSessionID.length, ck.length);

                    if (ck.indexOf("JSESSIONID") != -1)
                        concealmentCookies[2] = ck.substring(currentJSessionID.length, ck.length);
                }
            }

            return concealmentCookies;
        },
        displayPopup: function() {
            var displayConcealment = true;
            // Dummy
            if (true) { //isConcealmentAvailable
                var concealmentCookies = Trus.concealment.getConcealmentCookies();

                if (concealmentCookies.length === 3) {
                    //displayconcealmentAgain
                    if (concealmentCookies[0] === "no") {
                        // concealmentSessionID ==== currentJSessionID
                        if (concealmentCookies[1] === concealmentCookies[2]) {
                            displayConcealment = false;
                        } else {
                            document.cookie = "displayconcealmentAgain=yes;";
                        }
                    }
                }
            }
            return displayConcealment;
        },
        setCheckBoxFalse: function() {
            if (!doNotShowConcealmentPopupAgain.length) {
                doNotShowConcealmentPopupAgain = jQuery('.chkDontRemindMeAgain');
            }
            doNotShowConcealmentPopupAgain = jQuery('.chkDontRemindMeAgain').prop("checked", false);
        },
        callPDPAddToCart: function(productID, skuID, qty, flag) {
			calledFromConcealment = true;
			var
                    relatedOmniProdBlock = jQuery('#relatedItemsContainer'),
                    relatedOmniProdChecked = relatedOmniProdBlock.find(':checkbox:checked'),
                    relateOmniProdIds = productID + ";;;;";
            if (relatedOmniProdChecked.length) {                
				jQuery('.addToCartCheckbox').each(function(index, value) {
					if (jQuery(value).find(':checkbox').is(':checked')) {
						prod = jQuery(this).find('[id^=prod_]').val();
						prod = getValueFromPidElement(prod, 'PID');
						relateOmniProdIds += ',;' + prod + ";;;;";
					}
                });
            }
            //var displayConcealment = Trus.concealment.displayPopup();
			// Here isConcealmentAvailable is coming from global/product2/trus/truMainProduct.jspf
            var displayConcealment = (isConcealmentAvailable) ? Trus.concealment.displayPopup() : false; 
            isInStorePickupAvailable = (arguments.length > 1) ? true : false;
            if (displayConcealment) {
                if (isInStorePickupAvailable) {
                    inStorePickupArgs = [];
                    inStorePickupArgs[0] = productID;
                    inStorePickupArgs[1] = skuID;
                    inStorePickupArgs[2] = qty;
                    inStorePickupArgs[3] = flag;
                }
                eventCalledFrom = "PDP";
				isSelectStore=true;
				relateOmniProdIds = relateOmniProdIds.substring(0, relateOmniProdIds.length - 4);
                addToCartOmniture('Product Detail', 'Standard Cart', relateOmniProdIds);
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
            } else {
				calledFromConcealment = false;
                if (isInStorePickupAvailable) {
                    //trus.inStorePickup.showFindItInStoreOutOfStock(productID, skuID, qty, flag);
					var customFun = new Function(jQuery('#select-store-link-fun').val());
					customFun();				
                } else {
                    addToCartDecider();
                }
            }
            //trus.inStorePickup.showFindItInStoreOutOfStock('<%=productId%>','<%=(skus!=null && skus.length == 1 ? skus[0].getSku():"-1")%>', $('quantity').value, 'true');
        },
        callQSAddToCart: function(productID, isQsConcealmentAvailable, redirectTo) {
            var displayConcealment = (isQsConcealmentAvailable) ? Trus.concealment.displayPopup() : false;
            //var displayConcealment = Trus.concealment.displayPopup();
            isInStorePickupAvailable = (arguments.length === 3) ? true : false;
            if (displayConcealment) {
                if (isInStorePickupAvailable) {
                    inStorePickupArgs = [];
                    inStorePickupArgs[0] = redirectTo;
                }

                addToCartOmniture('Quick Shop Product Detail', 'Standard Cart', productID);
                eventCalledFrom = "QS";
                if (!mopal.length)
                    mopal = jQuery("#mopalOverlay,#mopalLightBox");
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
            } else {
                if (isInStorePickupAvailable) {
                    window.location = redirectTo;
                } else {
                    addToCartFromQS();
                }
            }
        },
        callMayLikeAddToCart: function(productID) {
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isCrossConcealment) ? Trus.concealment.displayPopup() : false;
            if (displayConcealment) {
                eventCalledFrom = "MayLike";
                mayLikeProductID = productID;
                addToCartOmniture('Shopping Cart Cross Sells', 'Standard Cart', productID);
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
            } else {
                trus.checkout.cart.valXsell.submit($('crossSellPurchaseForm_' + productID));
            }
        },
        callRLAddToCart: function(flag, frm) {
            var productId = frm.productId.value;
            var isRelatedConcealment = false;
            verifyFlag = flag;
            var
                    relatedProdBlock = jQuery('#relatedItemsContainer'),
                    relatedProdChecked = relatedProdBlock.find(':checkbox:checked'),
                    isRelatedProdChecked,
                    relateProdIds = productId + ";;;;";
            if (relatedProdChecked.length) {
                relatedProdChecked.each(function() {
                    if (relatedConcealmentArr[jQuery(this).closest('.relatedItem').index()]) {
                        isRelatedProdChecked = true;
                        return false;
                    }					
                });
				jQuery('.addToCartCheckbox').each(function(index, value) {
					if (jQuery(value).find(':checkbox').is(':checked')) {
						prod = jQuery(this).find('[id^=prod_]').val();
						prod = getValueFromPidElement(prod, 'PID');
						relateProdIds += ',;' + prod + ";;;;";
					}
                });
            }
            if (isConcealmentAvailable || isRelatedProdChecked) {
                isRelatedConcealment = true;
            }
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isRelatedConcealment) ? Trus.concealment.displayPopup() : false;

            if (displayConcealment) {
                eventCalledFrom = "RP";
                rpFormObj = frm;
                relateProdIds = relateProdIds.substring(0, relateProdIds.length - 4);
                addToCartOmniture('Product Cross Sells', 'Standard Cart', relateProdIds);
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
            } else {
                verifyFields(flag, frm);
            }

        },
        callWLSingleProductAddToCart: function(skuForm, isInStorePickup, obj) {
            //pass obj to get the current click element
            var isWishlistChild = false;
            if (wishlistChildArray[+jQuery(obj).closest('.wishProdAdd2').children(':hidden.rowIndex').val()]) {
                isWishlistChild = true;
            }

            isInStorePickupAvailable = isInStorePickup;
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isWishlistChild) ? Trus.concealment.displayPopup() : false;
            if (displayConcealment) {
                eventCalledFrom = "WLSP";
                wLSingleProdObj = skuForm;
                addToCartOmniture('Wishlist', 'Standard Cart', skuForm.pidnum.value);
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
                return false;
            } else {
                if (isInStorePickupAvailable) {
                    trus.inStorePickup.showFindItInStoreOutOfStock(skuForm.pidnum.value, skuForm.skuId.value, skuForm.qtyCart.value, skuForm.outOfStock.value);
                    return false;
                } else {
                    skuForm.submit();
                }
            }
        },
        callWLSignInSingleProductAddToCart: function(skuForm, obj, productID, skuID, qty, flag) {
            //pass obj to get the current click element
            var isWishlistChild = false;
            if (wishlistChildArray[+jQuery(obj).closest('.wishProdAdd').children(':hidden.rowIndex').val()]) {
                isWishlistChild = true;
            }
            isInStorePickupAvailable = (arguments.length > 2) ? true : false;
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isWishlistChild) ? Trus.concealment.displayPopup() : false;
            if (displayConcealment) {
                eventCalledFrom = "WLSSP";
                wLSingleProdObj = skuForm;
                addToCartOmniture('Wishlist', 'Standard Cart', skuForm.pidnum.value);
                if (isInStorePickupAvailable) {
                    inStorePickupArgs = [];
                    inStorePickupArgs[0] = productID;
                    inStorePickupArgs[1] = skuID;
                    inStorePickupArgs[2] = qty;
                    inStorePickupArgs[3] = flag;
                }
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
                return false;
            } else {
                if (isInStorePickupAvailable) {
                    if (skuForm.outOfStock.value == "false") {
                        trus.inStorePickup.showFindItInStore(productID, skuID, qty);
                    } else {
                        trus.inStorePickup.showFindItInStoreOutOfStock(productID, skuID, qty, flag);
                    }
                    return false;
                } else {
                    skuForm.submit();
                }
            }
        },
        callWLSelectStore: function(obj, productID, skuID, qty, flag) {
            isSTS = (arguments.length > 4) ? true : false;
            var isWishlistChild = false;
            if (wishlistChildArray[+jQuery(obj).closest('.wishProdAdd, .wishProdAdd2').children(':hidden.rowIndex').val()]) {
                isWishlistChild = true;
            }
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isWishlistChild) ? Trus.concealment.displayPopup() : false;
            if (displayConcealment) {
                inStorePickupArgs = [];
                inStorePickupArgs[0] = productID;
                inStorePickupArgs[1] = skuID;
                inStorePickupArgs[2] = qty;
                inStorePickupArgs[3] = flag;
                addToCartOmniture('Wishlist', 'Standard Cart', productID);
                eventCalledFrom = "WLSS";
				isSelectStore=true;
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
            } else {
                if (isSTS) {
                    trus.inStorePickup.showFindItInStoreSTS(flag, productID, skuID, qty);
                } else {
                    trus.inStorePickup.showFindItInStore(productID, skuID, qty);
                }
            }
        },
        callWLBulkAddToCart: function(skuForm, selectedSKUForm) {
            var isWishlistParent = false;
            jQuery(':checkbox.bulkSelectItem:checked').each(function() {
                if (wishlistChildArray[+jQuery(this).parent().siblings('.wishProdAdd2').children(':hidden.rowIndex').val()]) {
                    isWishlistParent = true;
                    return false;
                }
            });
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isWishlistParent) ? Trus.concealment.displayPopup() : false;
            var wlOmnitureBulkAddToCart = '';
            if (displayConcealment) {
                eventCalledFrom = "WLBP";
                wLBulkProdObj = skuForm;
                wLBulkSelectedProdObj = selectedSKUForm;
                for (i = 0; i < selectedSKUForm.length; i++) {
                    if (i === 0) {
                        wlOmnitureBulkAddToCart += selectedSKUForm[i].pidnum.value + ";;;;";
                    } else {
                        wlOmnitureBulkAddToCart += ',;' + selectedSKUForm[i].pidnum.value + ";;;;";
                    }
                }
                wlOmnitureBulkAddToCart = wlOmnitureBulkAddToCart.substring(0, wlOmnitureBulkAddToCart.length - 4);
                addToCartOmniture('Wishlist', 'Standard Cart', wlOmnitureBulkAddToCart);
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
                return false;
            } else {
                recallAddBulkToCartSubmit(skuForm, selectedSKUForm);
            }
        },
        callWLSignInBulkAddToCart: function(skuForm, selectedSKUForm) {
            var isWishlistParent = false;
            jQuery(':checkbox.bulkSelectItem:checked').each(function() {
                if (wishlistChildArray[+jQuery(this).parent().siblings('.wishProdAdd').children(':hidden.rowIndex').val()]) {
                    isWishlistParent = true;
                    return false;
                }
            });

            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isWishlistParent) ? Trus.concealment.displayPopup() : false;
            var wlOmnitureBulkAddToCart = '';
            if (displayConcealment) {
                eventCalledFrom = "WLSBP";
                wLBulkProdObj = skuForm;
                wLBulkSelectedProdObj = selectedSKUForm;
                for (i = 0; i < selectedSKUForm.length; i++) {
                    if (i === 0) {
                        wlOmnitureBulkAddToCart += selectedSKUForm[i].pidnum.value + ";;;;";
                    } else {
                        wlOmnitureBulkAddToCart += ',;' + selectedSKUForm[i].pidnum.value + ";;;;";
                    }
                }
                wlOmnitureBulkAddToCart = wlOmnitureBulkAddToCart.substring(0, wlOmnitureBulkAddToCart.length - 4);
                addToCartOmniture('Wishlist', 'Standard Cart', wlOmnitureBulkAddToCart);
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
                return false;
            } else {
                recallAddBulkToCartSubmit(skuForm, selectedSKUForm);
            }
        },
        callBundleAddToCart: function(frm) {
            var productStr = "";
            var prodCounter = concealmentBundlesArray.length;

            for (var j = 0; j < prodCounter; j++)
            {
                mainProd = frm["prod_" + j];
                var mainProdId = getValueFromPidElement(mainProd.value, 'PID');
                if (j === 0) {
                    productStr += mainProdId + ";;;;,";
                } else {
                    productStr += ";" + mainProdId + ";;;;,";
                }
            }
            if (productStr !== '')
                productStr = productStr.substring(0, productStr.length - 5);

            var isBundleAvailable = false;
            for (var i = 0; i < concealmentBundlesArray.length; i++) {
                if (concealmentBundlesArray[i]) {
                    isBundleAvailable = true;
                    break;
                }
            }
            var displayConcealment = (isBundleAvailable) ? Trus.concealment.displayPopup() : false;
            if (displayConcealment) {
                eventCalledFrom = "Bundle";
                addToCartOmniture('Product Bundle Detail', 'Standard Cart', productStr);
                bundleFormObj = frm;
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
            } else {
                frm.submit();
            }
            return false;
        },
        callCollectionAddToCart: function(frm) {
            var productStr = "";
            var prodCounter = isCollectionChildArray.length + 2;
            var pidCount = 0;
            var qtyBoxObj = jQuery('.collectionQuantityBox input');
            for (var j = 2; j < prodCounter; j++)
            {
                mainProd = frm["prod_" + j];
                mainProdId = getValueFromPidElement(mainProd.value, 'PID');
                qtyTemp = frm["qty_" + j];
                if (qtyTemp.value > 0)
                {
                    pidCount += 1;
                    if (pidCount == 1) {
                        productStr += mainProdId + ";;;;,";
                    } else {
                        productStr += ";" + mainProdId + ";;;;,";
                    }
                }
            }
            if (productStr !== '')
                productStr = productStr.substring(0, productStr.length - 5);

            var isCollectionAvailable = false;
            for (var i = 0; i < isCollectionChildArray.length; i++) {
                if (isCollectionChildArray[i] && qtyBoxObj[i].value !== '0') {
                    isCollectionAvailable = true;
                    break;
                }
            }


            var displayConcealment = (isCollectionAvailable) ? Trus.concealment.displayPopup() : false;
            if (displayConcealment) {
                eventCalledFrom = "Collection";
                addToCartOmniture('Product Detail', 'Standard Cart', productStr);
                collectionFormObj = frm;
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
            } else {
                frm.submit();
            }
            return false;
        },
        callRegBulkAddToCart: function(skuForm, selectedSKUForm) {
            var isRegistryParent = false;
            jQuery(':checkbox.bulkSelectItem:checked').each(function() {
                if (jQuery(this).siblings(':hidden').val() === 'true') {
                    isRegistryParent = true;
                    return false;
                }
            });

            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isRegistryParent) ? Trus.concealment.displayPopup() : false;
            var regOmnitureBulkAddToCart = '';
            if (displayConcealment) {
                eventCalledFrom = "REGBP";
                regBulkProdObj = skuForm;
                regBulkSelectedProdObj = selectedSKUForm;
                for (i = 0; i < selectedSKUForm.length; i++) {
                    if (i === 0) {
                        regOmnitureBulkAddToCart += selectedSKUForm[i].pidnum.value + ";;;;";
                    } else {
                        regOmnitureBulkAddToCart += ',;' + selectedSKUForm[i].pidnum.value + ";;;;";
                    }
                }
                regOmnitureBulkAddToCart = regOmnitureBulkAddToCart.substring(0, regOmnitureBulkAddToCart.length - 4);
                addToCartOmniture('Registry', 'Standard Cart', regOmnitureBulkAddToCart);
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
                return false;
            } else {
                recallAddBulkToCartSubmit(skuForm, selectedSKUForm);
            }
        },
        callRegSingleProductAddToCart: function(skuForm, productID, skuID, qty, flag) {
            var isRegistryChild = false;
            if (jQuery(skuForm).closest('.regViewProdAdd').siblings('.bulkSelectItem').children(':hidden').val() === 'true') {
                isRegistryChild = true;
            }
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isRegistryChild) ? Trus.concealment.displayPopup() : false;
            isInStorePickupAvailable = (arguments.length > 1) ? true : false;
            if (displayConcealment) {
                eventCalledFrom = "REGSP";
                regSingleProdObj = skuForm;
                if (isInStorePickupAvailable) {
                    inStorePickupArgs = [];
                    inStorePickupArgs[0] = productID;
                    inStorePickupArgs[1] = skuID;
                    inStorePickupArgs[2] = qty;
                    inStorePickupArgs[3] = flag;
                }
                this.setCheckBoxFalse();
                addToCartOmniture('Registry', 'Standard Cart', skuForm.pidnum.value);
                mopal.css('display', 'block');
                return false;
            } else {
                if (isInStorePickupAvailable) {
                    if (skuForm.outOfStock.value == "false") {
                        trus.inStorePickup.showFindItInStore(productID, skuID, qty);
                    } else {
                        trus.inStorePickup.showFindItInStoreOutOfStock(productID, skuID, qty, flag);
                    }
                    return false;
                } else {
                    skuForm.submit();
                }
            }
        },
        callRegSelectStore: function(obj, productID, skuID, qty, flag) {
            var isRegistryChild = false;
            if (jQuery(obj).closest('.regViewProdAdd').siblings('.bulkSelectItem').children(':hidden').val() === 'true') {
                isRegistryChild = true;
            }
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isRegistryChild) ? Trus.concealment.displayPopup() : false;
            isSTS = (arguments.length > 4) ? true : false;
            if (displayConcealment) {
                inStorePickupArgs = [];
                inStorePickupArgs[0] = productID;
                inStorePickupArgs[1] = skuID;
                inStorePickupArgs[2] = qty;
                inStorePickupArgs[3] = flag;
                eventCalledFrom = "REGSS";
				isSelectStore=true;
                addToCartOmniture('Registry', 'Standard Cart', productID);
                this.setCheckBoxFalse();
                mopal.css('display', 'block');
            } else {
                if (isSTS) {
                    trus.inStorePickup.showFindItInStoreSTS(flag, productID, skuID, qty);
                } else {
                    trus.inStorePickup.showFindItInStore(productID, skuID, qty);
                }
            }
        },
        
        callLayawayPDPAddToCart: function(param) {
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isConcealmentAvailable) ? Trus.concealment.displayPopup() : false;
			if (displayConcealment) {
                eventCalledFrom = "LayawayPDP";                
                addToCartOmniture('Product Detail', 'Layaway Cart', param['productId']);                
                this.setCheckBoxFalse();
                inStorePickupArgs = [param];
                mopal.css('display', 'block');
            } else {
                 trus.layaway.openLayawayLightbox(param);
            }
        },
        
        callLayawayPDPAddToCartRepeat: function(productId, skuId, quantity, layawaySTH, layawaySTSOrISPU, lwySTS, layawayCartAddition, selectedRelated, selectedBPP) {
            //var displayConcealment = Trus.concealment.displayPopup();
            var displayConcealment = (isConcealmentAvailable) ? Trus.concealment.displayPopup() : false;
			
            if (displayConcealment) {                
                addToCartOmniture('Product Detail', 'Layaway Cart', productId);                
                eventCalledFrom = "LayawayPDPRepeat";
                this.setCheckBoxFalse();
                inStorePickupArgs = [productId, skuId, quantity, layawaySTH, layawaySTSOrISPU, lwySTS, layawayCartAddition, selectedRelated, selectedBPP];
                mopal.css('display', 'block');
            } else {
                if(selectedRelated.length || selectedBPP.length)
                    trus.layaway.showLayaway(productId, skuId, quantity, layawaySTH, layawaySTSOrISPU, lwySTS, layawayCartAddition);
                else {
                    layawayVerifyFields('yes', document.orderForm);
                }
            }
        },
        
        callLayawayQS: function(url, existingLayaway, bppBypass, isSTS, padAttr) {
			
			var productId='';
			var prodUrl =url;
			if(url.indexOf('productId=')>-1){
				var prodSplitID = prodUrl.split("productId=");
				if(prodSplitID[1].indexOf('&')>-1){
					productId=prodSplitID[1].substr(0,prodSplitID[1].indexOf('&'));
				}else{
					productId=prodSplitID[1];
				}			
			}
		
            var displayConcealment = (padAttr) ? Trus.concealment.displayPopup() : false;
            if (displayConcealment) {
				addToCartOmniture('Quick Shop Product Detail', 'Layaway Cart', productId);
                eventCalledFrom = "LayawayQS";
                this.setCheckBoxFalse();
                inStorePickupArgs = [url, existingLayaway, bppBypass, isSTS];
                jQuery("#mopalOverlay, #mopalLightBox").css('display', 'block');                
            } else {
                if(!jQuery("#buyerProtectionPlan input:checked").val() || bppBypass) {
                    jQuery('#buyerProtectionPlan').find('input[name=warranty_1]').val('');
                    if(existingLayaway) {
                        trus.layaway.quickShopLayawaySubmit();
                    } else {
                        trus.layaway.quickShopProductRedirect(url);
                    }
                } else {
                    jQuery("#layawayLightbox").show();
                } 
            }
        }
    };
// check if checkbox on the concealment popup is checked or not
jQuery('html').off('click', '.chkDontRemindMeAgain').on('click', ".chkDontRemindMeAgain", function(e) {
    if (jQuery(this).is(':checked')) {
        omnitureDoNotRemind();
        document.cookie = "displayconcealmentAgain=no; path=/";
        document.cookie = "concealmentSessionID=" + Trus.concealment.getCookieValue("JSESSIONID") + "; path=/";

    } else {
        document.cookie = "displayconcealmentAgain=yes; path=/";
    }
});

//Continue click functionality in Mopal Box
jQuery('html').off('click', '.mopalContinue').on('click', '.mopalContinue', function(e) {
    e.preventDefault();
    
	if((isInStorePickupAvailable && eventCalledFrom!='QS') || isSelectStore){
	 omnitureContinue();
	}
	else{
		//setTimeout(function() {
			omnitureContinue();
		//}, 500);
	}
    
    mopal.css('display', 'none');
    switch (eventCalledFrom) {
        case 'PDP':			
            if (isInStorePickupAvailable) {				
                //trus.inStorePickup.showFindItInStoreOutOfStock(inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2], inStorePickupArgs[3]);
				var customFun = new Function(jQuery('#select-store-link-fun').val());
				customFun();				
                inStorePickupArgs = [];
            } else {
                addToCartDecider();
            }
            isInStorePickupAvailable = false;
			calledFromConcealment = false;
            break;
        case 'QS':
            if (isInStorePickupAvailable) {
                window.location = inStorePickupArgs[0];
                inStorePickupArgs = [];
            } else {
                addToCartFromQS();
            }
            break;
        case 'MayLike':
            trus.checkout.cart.valXsell.submit($('crossSellPurchaseForm_' + mayLikeProductID));
            break;
        case 'RP':
            verifyFields(verifyFlag, rpFormObj);
            rpFormObj = null;
            verifyFlag = '';
            break;
        case 'Bundle':
            bundleFormObj.submit();
            bundleFormObj = null;
            break;
        case 'Collection':
            collectionFormObj.submit();
            collectionFormObj = null;
            break;
        case 'WLSP':
            if (isInStorePickupAvailable) {
                trus.inStorePickup.showFindItInStoreOutOfStock(wLSingleProdObj.pidnum.value, wLSingleProdObj.skuId.value, wLSingleProdObj.qtyCart.value, wLSingleProdObj.outOfStock.value);
                return false;
            } else {
                wLSingleProdObj.submit();
            }
            wLSingleProdObj = null;
            break;
        case 'WLSSP':
            if (isInStorePickupAvailable) {
                if (wLSingleProdObj.outOfStock.value == "false") {
                    trus.inStorePickup.showFindItInStore(inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2]);
                } else {
                    trus.inStorePickup.showFindItInStoreOutOfStock(inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2], inStorePickupArgs[3]);
                }
                inStorePickupArgs = [];
                return false;
            } else {
                wLSingleProdObj.submit();
            }
            wLSingleProdObj = null;
            break;
        case 'WLBP':
            recallAddBulkToCartSubmit(wLBulkProdObj, wLBulkSelectedProdObj);
            wLBulkProdObj = null;
            wLBulkSelectedProdObj = null;
            break;
        case 'WLSS':
            if (isSTS) {
                trus.inStorePickup.showFindItInStoreSTS(inStorePickupArgs[3], inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2]);
            } else {
                trus.inStorePickup.showFindItInStore(inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2]);
            }
            break;
        case 'WLSBP':
            recallAddBulkToCartSubmit(wLBulkProdObj, wLBulkSelectedProdObj);
            wLBulkProdObj = null;
            wLBulkSelectedProdObj = null;
            break;
        case 'REGBP':
            recallAddBulkToCartSubmit(regBulkProdObj, regBulkSelectedProdObj);
            regBulkProdObj = null;
            regBulkSelectedProdObj = null;
            break;
        case 'REGSP':
            if (isInStorePickupAvailable) {
                if ((typeof regSingleProdObj.outOfStock.value !== 'undefined') && regSingleProdObj.outOfStock.value == "false") {
                    trus.inStorePickup.showFindItInStore(inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2]);
                } else {
                    trus.inStorePickup.showFindItInStoreOutOfStock(inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2], inStorePickupArgs[3]);
                }
                inStorePickupArgs = [];
                return false;
            } else {
                regSingleProdObj.submit();
            }
            regSingleProdObj = null;
            break;
        case 'REGSS':
            if (isSTS) {
                trus.inStorePickup.showFindItInStoreSTS(inStorePickupArgs[3], inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2]);
            } else {
                trus.inStorePickup.showFindItInStore(inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2]);
            }
            break;
        case 'LayawayPDP':                
                trus.layaway.openLayawayLightbox(inStorePickupArgs[0]);
                inStorePickupArgs = [];
            break;            
        case 'LayawayPDPRepeat':                
                if(inStorePickupArgs[7].length || inStorePickupArgs[8].length){
                    trus.layaway.showLayaway(inStorePickupArgs[0], inStorePickupArgs[1], inStorePickupArgs[2], inStorePickupArgs[3], inStorePickupArgs[4], inStorePickupArgs[5], inStorePickupArgs[6]);
                }else {
                    layawayVerifyFields('yes', document.orderForm);
                 }
                inStorePickupArgs = [];
            break;
        case 'LayawayQS':
            if(!jQuery("#buyerProtectionPlan input:checked").val() || inStorePickupArgs[2]) {
                jQuery('#buyerProtectionPlan').find('input[name=warranty_1]').val('');
                if(inStorePickupArgs[1]) {
                    trus.layaway.quickShopLayawaySubmit();
                } else {
                    trus.layaway.quickShopProductRedirect(inStorePickupArgs[0]);
                }
            } else {
                jQuery("#layawayLightbox").show();
            } 
            break;        
        default:
            console.log('Falling out of scope. Report this as an error');
    }
    eventCalledFrom = "";
    mayLikeProductID = "";
});

//close mopal box
jQuery('html').off('click', '.mopalClose, .mopalOverlay, .mopalCancel').on('click', '.mopalClose, .mopalOverlay, .mopalCancel', function() {
    eventCalledFrom = "";
    if (this.id == "mopalCancel") {
        omnitureCancel();
    } else if (this.id == "mopalClose") {
        omnitureClose();
    }
    jQuery("#mopalOverlay, #mopalLightBox").css('display', 'none');
    calledFromConcealment = false;
});

//ie9 issue fix
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment)
{
    Range.prototype.createContextualFragment = function(html)
    {
        var frag = document.createDocumentFragment(), 
        div = document.createElement("div");
        frag.appendChild(div);
        div.outerHTML = html;
        return frag;
    };  
}

//font issue fix
(function() {
    var fallback = function() {
        if(window.jQuery && !jQuery('link[href$="include/fonts.css"]').length) {
            var link = document.createElement('link');
            link.href = trusJspVariables.akURL+'/include/fonts.css';
            link.type = 'text/css';
            link.rel = 'stylesheet';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(link, s);
            if(cdfonts) {
                link = document.createElement('link');
                link.href = trusJspVariables.akURL+'/include/base64fonts.css';
                link.type = 'text/css';
                link.rel = 'stylesheet';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(link, s);
            }
        }
    }
    if(window.addEventListener)
        window.addEventListener('load', fallback);
    else if(window.attachEvent)
        window.attachEvent('onload', fallback);
})();


