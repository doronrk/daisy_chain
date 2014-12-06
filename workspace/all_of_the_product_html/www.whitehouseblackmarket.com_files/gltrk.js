/**
 * gltrk.js - v14.06.25.1400.WHBM-mj
 *
 * This is the repository for all third-party javascript tags.
 * This script is called from include/tracking.jsp.
 *
 * ==============================================
 * TABLE OF CONTENTS
 * --- 1. FUNCTIONS
 * --- 2. PAGE INFORMATION VARIABLES
 * --- 3. CATALOG INFORMATION VARIABLES
 * --- 4. PRODUCT INFORMATION
 * --- 5. SHOPPING CART INFORMATION
 * --- 6. ORDER INFORMATION
 * --- 7. USER INFORMATION
 * --- 8. TAGGING ACCOUNT ID VARIABLES
 * --- 9. MISC & RANDOM VARIABLES
 * --- 10. TRUEFFECT
 * --- 11. EBAY ENTERPRISE
 * --- 12. GOOGLE TAG MANAGER
 * --- 13. STRUQ
 * --- 14. BING / YAHOO
 * --- 15. COMMISSION JUNCTION
 * --- 16. KENSHOO
 * --- 17. EBAY FACEBOOK
 * --- 18. CHEETAHMAIL T2P
 * --- 19. TWITTER CONVERSION PIXELS
 * --- 20. FACEBOOK CUSTOM AUDIENCE TAG
 * ==============================================
 */

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^
 *     1.  FUNCTIONS
 *     ^^^^^^^^^^^^^^^^^^^
 *         getParams                              --- get the querystring parameters from the URL
 *         CONSOLE                              --- set console compatibility for writing to console in IE
 *         getPageType                           --- get the type of the page
 *         getOrderItems                         --- get the order items from the window.cj_items string
 *         countProperties                       --- count the properties of an object, i.e. order items
 * ------------------------------------------------------------------------------------------------------------------------------------------
 */

/** getParams --- get the querystring parameters from the URL */
function getParams() {
    var params = {},
        pairs = document.URL.split('?')
            .pop()
            .split('&');
    for (var i = 0, p; i < pairs.length; i++) {
        p = pairs[i].split('=');
        params[ p[0] ] =  p[1];
    }
    return params;
} // end function

/** CONSOLE --- set console compatibility for writing to console in IE */
if(!window.console){ window.console = {log: function(){} }; }

/** getPageType --- get the type of the page */
function getPageType() {
    var thisOldPageType = undefined;
    var thisOldPageType = "";
    thisOldPageType = "NOPAGETYPE-gltrk-function-getPageType";
    var pageURL = document.URL || "NOURL";
    //homepage
    var isHomePage = pageURL.indexOf("home.jsp");
    if (isHomePage > 1) {
        thisOldPageType = "HOME";
    }
    //static page
    var isPagePage = pageURL.indexOf("page.jsp");
    if (isPagePage > 1) {
        thisOldPageType = "PAGE";
    }
    //shelf page
    var isShelfPage = pageURL.indexOf("shelf.jsp");
    if ((isShelfPage > 1) || (pageId == "83109277") || (pageId == "70409282")) {
        thisOldPageType = "SHELF";
    }
    //cart page
    var isCartPage = pageURL.indexOf("cart.jsp");
    if (isCartPage > 1) {
        thisOldPageType = "CART";
    }
    //order confirmation page
    var isThankYouPage = pageURL.indexOf("orderConfirmation.jsp");
    if (isThankYouPage > 1) {
        thisOldPageType ="ORDER";
    }
    //search page
    var isSearchPage = pageURL.indexOf("search_results.jsp");
    if (isSearchPage > 1) {
        thisOldPageType = "SEARCH";
    }
    //product page
    var isProductPage = pageURL.indexOf("product.jsp");
    if (isProductPage > 1) {
        thisOldPageType = "PRODUCT";
    }
    //store locator page
    var isStoreLocatorPage = pageURL.indexOf("store_search.jsp?_DARGS");
    if (isStoreLocatorPage > 1) {
        thisOldPageType = "LOCATOR";
    }
    return thisOldPageType;
}

/** getOrderItems --- get the order items from the window.cj_items string */
function getOrderItems() {
    var cj_items  = window.cj.cartItems;
    if (cj_items) {
        var hero = cj_items;
        var orderItems = {},
            doubles = trim(hero.substr(1).replace(/amp;/g,"")).split("&");
        for (var i = 0, p; i < doubles.length; i++) {
            p = doubles[i].split('=');
            orderItems[ p[0] ] =  p[1];
        }
        return orderItems;
    } else {
        return "NOORDERITEMS";
    }
} // end function

/** countProperties --- count the properties of an object, i.e. order items */
function countProperties(obj) {
    var count = 0;
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }
    return count;
}

function getShelfPageProductIds() {
    var numberOfProductCapsules = 0;
    var productCapsuleHTML = "";
    var shelfPageProductIds = [];
    //
    var numPC1 = $('.product-capsule').size() || -99;
    var numPC2 = $('.product-capsule-last').size() || -99;
    //
    if((numPC1>0)&&(numPC2>0)){
        numberOfProductCapsules = numPC1 + numPC2;

        for (var i=1; i <= numberOfProductCapsules; i++) {
            var thisPCsHTML = "";
            thisPCsHTML = trim(document.getElementById('pc' + i).innerHTML);
            if((thisPCsHTML !== "") && (typeof thisPCsHTML !== "undefined")) {
                var startPosition = thisPCsHTML.search("productId=");
                var endPosition = thisPCsHTML.search("&amp;viewAll");
                if((startPosition !== -1) && (endPosition !== -1)) {
                    startPosition = startPosition + 10;
                    var thisProductId = thisPCsHTML.substring(startPosition,endPosition);
                    if((thisProductId !== "")&&(typeof thisProductId !== "undefined")) {
                        shelfPageProductIds[i-1] = thisProductId;
                    }
                }
            }
        }
    }
    return shelfPageProductIds;
}

//console.log("1.  FUNCTIONS -- COMPLETED");

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     2. PAGE INFORMATION VARIABLES
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *         thisPage                                 --- the page URL
 *         thisPageProtocol                         --- the protocol of this page (https or http)
 *         qs                                       --- the querystring array (object)
 *         pageId                                   --- the page ID
 *         pageType                                 --- the type of the page - value set = {HOME, SHELF, PAGE, PRODUCT, ORDER, CART, EMAILSIGNUP, SEARCH, LOCATOR}
 * ------------------------------------------------------------------------------------------------------------------------------------------
 */

/** thisPage --- the page URL */
try {  var thisPage = document.URL || "NOURL";  } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOURL =*USA*= ",err.message); } //assign the current URL to a variable
//console.log("gltrk.js - thisPage = " + thisPage);


/** thisPageProtocol --- the protocol of this page (https or http) */
try {  var thisPageProtocol = document.location.protocol || "NOPROTOCOL";  } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOPROTOCOL =*USA*= ",err.message); }
//console.log("gltrk.js - thisPageProtocol = " + thisPageProtocol);

/** qs --- the querystring array (object) */
try {  var qs = getParams() || "NOQUERYSTRING";  } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOQUERYSTRING =*USA*= ",err.message); }
//console.log("gltrk.js - qs = " + qs);

/** pageId --- the page ID */
try {  var pageId = qs["id"] || "NOPAGEID"; } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOPAGEID"); }
//console.log("gltrk.js - pageId = " + pageId);

/** pageType --- the type of the page - value set = {SHELF, PRODUCT, ORDER, CART, EMAILSIGNUP, SEARCH, LOCATOR} */
try {  var pageType = ""; pageType = getPageType() || "NOPAGETYPE"; } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOPAGETYPE =*USA*= ",err.message); }
//console.log("gltrk.js - pageType = " + pageType);


//console.log("2. PAGE INFORMATION VARIABLES -- COMPLETED");

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     3. CATALOG INFORMATION VARIABLES
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *         glCatId                                    --- the catalog ID
 *         glSubCatId                              --- the subCatalog ID
 *         glCatName                              --- the catalog name
 *         glCatName                              --- one off page id catalog name workaround
 *         glCatName                              --- one off page id catalog name workaround
 * ------------------------------------------------------------------------------------------------------------------------------------------
 */

/** glCatId --- the catalog ID */
try { var glCatId = qs["catId"] || "NOCATID"; } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCATID =*USA*= ",err.message); }
//console.log("gltrk.js - glCatId = " + glCatId);

/** glSubCatId --- the subCatalog ID */
try { var glSubCatId = qs["subCatId"] || "NOSUBCATID"; } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOSUBCATID =*USA*= ",err.message); }
//console.log("gltrk.js - glSubCatId = " + glSubCatId);

/** glCatName --- the catalog name */
try { var glCatName = qs["cat"] || "NOCATNAME"; } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCATNAME =*USA*= ",err.message); }
//console.log("gltrk.js - glCatName = " + glCatName);

/** glCatName --- one off page id catalog name workaround */
try { if (pageId == "70409282") { var glCatName = "Black Label" || "NOCATNAME"; } } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCATNAME =*USA*= ",err.message); }
//console.log("gltrk.js - glCatName = " + glCatName);

/** glCatName --- one off page id catalog name workaround */
try { if (pageId == "83109277") { var glCatName = "So Slimming" || "NOCATNAME"; } } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCATNAME =*USA*= ",err.message); }
//console.log("gltrk.js - glCatName = " + glCatName);


//console.log("3. CATALOG INFORMATION VARIABLES -- COMPLETED");

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     4. PRODUCT INFORMATION VARIABLES
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *         productPageProductId                           --- the product page product ID
 * ------------------------------------------------------------------------------------------------------------------------------------------
 */

/** productPageProductId --- --- the product page product ID  */
try { var productPageProductId = qs["productId"] || "NOPRODUCTTID"; } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOPRODUCTTID =*USA*= ",err.message); }
//console.log("gltrk.js - productPageProductId = " + productPageProductId);


//console.log("4. PRODUCT INFORMATION VARIABLES -- COMPLETED");

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     5. SHOPPING CART INFORMATION VARIABLES
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *         cartSubTotal                            --- the order subtotal of the current shopping cart
 * ------------------------------------------------------------------------------------------------------------------------------------------
 */

/** cartSubTotal --- the order subtotal of the current shopping cart */
try { if(pageType=="CART") { var cartSubTotal = trim(document.getElementById("sb-sum-subtotal").lastElementChild.innerHTML.replace(/\$/g, "")) || "NOREVENUE";  } else { var cartSubTotal = "NOREVENUE"; } } catch (err) { var cartSubTotal = "NOREVENUE"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOREVENUE =*USA*= ",err.message); }
//console.log("gltrk.js - cartSubTotal = " + cartSubTotal);

/** cartProductIds --- the product Ids of the current shopping cart */
try {
    if(pageType=="CART") {
        var cartProductIds = "NOCARTPRODUCTIDS";  
	    if (typeof window.prodList !== 'undefined' && window.prodList.length > 0) {
            var refinedCartProductIds = [ ];  
            var rawCartProductIds = window.prodList.slice();  
            for (i = 0; i < rawCartProductIds.length; ++i) {             
                if(rawCartProductIds[i].indexOf("cart_rr") == -1) {                                
                    refinedCartProductIds.push(rawCartProductIds[i].replace(/,/g, ''));   
                }
            }
            if(typeof refinedCartProductIds !== 'undefined' && refinedCartProductIds.length > 0) {
                cartProductIds = refinedCartProductIds.join(",");
            }
        } 
    }      
} catch (err) {
    var cartProductIds = "NOCARTPRODUCTIDS"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCARTPRODUCTIDS =*USA*= ",err.message);
}
//console.log("gltrk.js - cartProductIds = " + cartProductIds);

//console.log("5. SHOPPING CART INFORMATION VARIABLES -- COMPLETED");

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     6. ORDER  INFORMATION VARIABLES
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *         checkOutOrderID                     --- the order ID at checkout
 *         checkOutSubTotal                   --- the order subtotal at checkout
 *         checkOutSalesTax                  --- the sales tax at checkout
 *         checkOutShipping                   --- the shipping total at checkout
 *         checkOutGrandTotal                --- the grand total at checkout
 *         checkOutOrderItems                --- a string of the check out order items
 *         checkOutProductIds                 --- an array of the product IDs in the order
 *         checkOutDiscountAmount      --- the total discount amount of the order
 * ------------------------------------------------------------------------------------------------------------------------------------------
 */

/** checkOutOrderID --- the order ID at checkout */
try { if(pageType=="ORDER") { var rawCoOrdIDr = document.getElementById("co-orderReview-number").getElementsByTagName("div") || "RAWORDERID"; } else { var rawCoOrdIDr = "RAWORDERID"; } } catch (err) { var rawCoOrdIDr = "NORAWORDERID"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NORAWORDERID =*USA*= ",err.message); }
try { if(pageType=="ORDER") { var checkOutOrderID = trim(rawCoOrdIDr[2].innerHTML) || "NOCHECKOUTORDERID";  } else { var checkOutOrderID = "NOCHECKOUTORDERID"; } } catch (err) { var checkOutOrderID = "NOCHECKOUTORDERID"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCHECKOUTORDERID =*USA*= ",err.message);  }
//console.log("gltrk.js - rawCoOrdIDr = " + rawCoOrdIDr);
//console.log("gltrk.js - checkOutOrderID = " + checkOutOrderID);

/** checkOutSubTotal --- the order subtotal at checkout */
try { if(pageType=="ORDER") { var checkOutSubTotal = trim(document.getElementById("fasEstaraTotal").innerHTML.replace(/\$/g, "")) || "NOSUBTOTAL";  } else {  var checkOutSubTotal = "NOSUBTOTAL";  } } catch (err) { var checkOutSubTotal = "NOSUBTOTAL"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOREVENUE =*USA*= ",err.message);  }
//console.log("gltrk.js - checkOutSubTotal = " + checkOutSubTotal);

/** checkOutSalesTax --- the sales tax at checkout */
try { if(pageType=="ORDER") { var checkOutSalesTax = trim(document.getElementById("co-summary-tax").getElementsByTagName('span')[1].innerHTML.replace(/\$/g, "")) || "NOSALESTAX"; } else { var checkOutSalesTax = "NOSALESTAX";  } } catch (err) { var checkOutSalesTax = "NOSALESTAX"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOSALESTAX =*USA*= ",err.message);  }
//console.log("gltrk.js - checkOutSalesTax = " + checkOutSalesTax);

/** checkOutShipping --- the shipping total at checkout */
try { if(pageType=="ORDER") { var checkOutShipping = trim(document.getElementById("co-summary-shipping").getElementsByTagName('span')[1].innerHTML.replace(/\$/g, "")) || "NOSHIPPING";  if((checkOutShipping == "FREE") || (checkOutShipping == "free") || (checkOutShipping == "Free")) { checkOutShipping = '0'; }} else {  var checkOutShipping = "NOSHIPPING";  } } catch (err) {  var checkOutShipping = "NOSHIPPING";  console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOSHIPPING =*USA*= ",err.message);  }
//console.log("gltrk.js - checkOutShipping = " + checkOutShipping);

/** checkOutGrandTotal --- the grand total at checkout */
try { if(pageType=="ORDER") {  var checkOutGrandTotal = trim(document.getElementById("co-summary-grandTotal").getElementsByTagName('span')[1].innerHTML.replace(/\$/g, "")) || "NOGRANDTOTAL"; } else { var checkOutGrandTotal = "NOGRANDTOTAL"; } } catch (err) { var checkOutGrandTotal = "NOGRANDTOTAL"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOGRANDTOTAL =*USA*= ",err.message);  }
//console.log("gltrk.js - checkOutGrandTotal = " + checkOutGrandTotal);

/** checkOutOrderItems --- an paired key:value object of the check out order items */
try { if(pageType=="ORDER") { var checkOutOrderItems = getOrderItems() || "NORDERITEMS"; } else { var checkOutOrderItems = "NOORDERITEMS"; } } catch (err) { var checkOutOrderItems = "NOORDERITEMS"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOORDERITEMS =*USA*= ",err.message);  }
//console.log("gltrk.js - checkOutOrderItems = " + checkOutOrderItems);

/** numberOfOrderItems --- the count of order items */
try {
    if(pageType=="ORDER") {
        var interimCount =  countProperties(checkOutOrderItems) || 2;
        if (interimCount > 2) {
            var numberOfOrderItems = (interimCount/3);
        } else {
            var numberOfOrderItems = 0 || 0;
        }
    } else { var numberOfOrderItems = 0 || 0; }
}
catch (err) { var numberOfOrderItems = "NOORDERITEMCOUNT"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOORDERITEMCOUNT =*USA*= ",err.message);  }
//console.log("gltrk.js - numberOfOrderItems = " + numberOfOrderItems);

/** checkOutProductIds --- an array of the product IDs in the order */
try {
    if(pageType=="ORDER") {
        var x=0;
        var checkOutProductIds = [];
        for (var prop in checkOutOrderItems) {
            if ((x === 0) || (x % 3 === 0)) {
                checkOutProductIds.push(checkOutOrderItems[prop]);
            }
            x++;
        }
    } else { var checkOutProductIds = "NOCHECKOUTPRODUCTIDS"; }
} catch (err) { var checkOutProductIds = "NOCHECKOUTPRODUCTIDS"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCHECKOUTPRODUCTIDS =*USA*= ",err.message);    }
//console.log("gltrk.js - checkOutProductIds = " + checkOutProductIds);


/** checkOutProductDescriptions --- an array of the product descriptions in the order */
try {
    if(pageType=="ORDER") {
        var checkOutProductDescriptions = [];
        var length = checkOutProductIds.length,
            element = null;
        divId = null;
        for (var i = 0; i < length; i++) {
            element = checkOutProductIds[i];
            divId = "item" + element;
            checkOutProductDescriptions[i] = document.getElementById(divId).getElementsByClassName("sb-print-prod-column1")[0].getElementsByClassName("bluelink")[0].text;
        }
    } else { var checkOutProductDescriptions = "NOCHECKOUTDESCRIPTIONS"; }
} catch (err) { var checkOutProductDescriptions = "NOCHECKOUTDESCRIPTIONS"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCHECKOUTDESCRIPTIONS =*USA*= ",err.message);    }
//console.log("gltrk.js - checkOutProductDescriptions = " + checkOutProductDescriptions);


/** checkOutDiscountAmount --- the total discount amount of the order */
try {
    if(pageType=="ORDER") {
        var length = $('[id=co-summary-promos]').length || -99;
        if(length>0) {
            var checkOutDiscountAmount = 0;
            for (var i = 0; i < length; i++) {
                var thisAmount = parseFloat(trim($('[id=co-summary-promos] .co-value')[i].innerHTML).replace(/[\$-]/g, ''));
                checkOutDiscountAmount = checkOutDiscountAmount + thisAmount;
            }
        } else { var checkOutDiscountAmount = "0.00"; }
    } else { var checkOutDiscountAmount = "NOCHECKOUTDISCOUNT"; }
} catch (err) { var checkOutDiscountAmount = "NOCHECKOUTDISCOUNT"; console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCHECKOUTDISCOUNT =*USA*= ",err.message);    }
//console.log("gltrk.js - checkOutDiscountAmount = " + checkOutDiscountAmount);

//console.log("6. ORDER  INFORMATION VARIABLES -- COMPLETED");

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     7. USER  INFORMATION VARIABLES
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * ------------------------------------------------------------------------------------------------------------------------------------------
 */



//console.log("7. USER  INFORMATION VARIABLES -- COMPLETED");

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     8. TAGGING ACCOUNT ID VARIABLES
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *         CSACCOUNTID                      --- ebay enterprise account ID
 * ------------------------------------------------------------------------------------------------------------------------------------------
 */

/** CSACCOUNTID --- ebay enterprise / clearsaleing account ID */
try { var CSACCOUNTID = 4024222 || "NOCSACCOUNTID"; } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - CSACCOUNTID =*USA*= ",err.message); }
//console.log("gltrk.js - CSACCOUNTID = " + CSACCOUNTID);



//console.log("8. TAGGING ACCOUNT ID VARIABLES -- COMPLETED");

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     9. MISC & RANDOM VARIABLES
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *         CACHEBUSTER                      --- a random number
 *         theSearchTerm                         --- the search term provided in a site search
 * ------------------------------------------------------------------------------------------------------------------------------------------
 */

/** CACHEBUSTER --- a random number */
try { var CACHEBUSTER = Math.floor(Math.random()*10000000001)  || "NOCACHEBUSTER"; } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOCACHEBUSTER =*USA*= ",err.message);  }
//console.log("gltrk.js - CACHEBUSTER = " + CACHEBUSTER);

/** theSearchTerm --- the search term provided in a site search */
try { var theSearchTerm = qs["searchTerm"] || "NOSEARCHTERM"; } catch (err) { console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - NOSEARCHTERM =*USA*= ",err.message);  }
//console.log("gltrk.js - theSearchTerm = " + theSearchTerm);


//console.log("9. MISC & RANDOM VARIABLES -- COMPLETED");

/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^
 *     10. TRUEFFECT
 *     ^^^^^^^^^^^^^^^^^^
 *         TRUEFFECT HOME PAGE TAG
 *         TRUEFFECT SHELF TAGS
 *         TRUEFFECT SEARCH TAG
 *         TRUEFFECT PAGE TAGS
 *         TRUEFFECT CART TAG
 *         TRUEFFECT CHECKOUT TAG
 *         TRUEFFECT COOKIE TAG
 * --------------------------------------------------------------------------
 */

/** TRUEFFECT HOME PAGE TAG */
try
{
    var isHomePage = thisPage.indexOf("home.jsp");
    if (isHomePage > 1) {
        document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Homepage&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - TRUEFFECT HOME PAGE TAG =*USA*= ",err.message);
} //end catch

/** TRUEFFECT SHELF TAGS */
try
{
    if (pageType == "SHELF") {
        switch(glCatId)
        {
            case "cat210006":
                switch(glSubCatId)
                {
                    case "cat8109276":
                        //New Arrivals - Petites
                        document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Petites&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                        break;
                    default:
                        //top category - New Arrivals
                        document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=New_Arrivals&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                }
                break;
            case "cat210019":
                //Shoes Accessories
                switch(glSubCatId)
                {
                    case "cat7299308":
                        //Shoes (only)
                        document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Shoes&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                        break;
                    default:
                        //top category (SHOES AND ACCESSORIES)
                        document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Shoes_Accesories&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                }
                break;
            case "cat6219285":
                switch(glSubCatId)
                {
                    case "cat8109276":
                        //Work Kit - Petites
                        document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Petites&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                        break;
                    default:
                        //top catID -- Work Kit
                        document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Work_Kit&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                }
                break;
            case "cat210001":
                //Tops
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Tops&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            case "cat210002":
                //Dresses Skirts
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Dresses_Skirts&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            case "cat210003":
                //Pants
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Pants&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            case "cat210023":
                //Denim
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Denim&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            case "cat210004":
                //Jackets
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Jackets&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            case "cat210005":
                //Jewelry
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Jewelry&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            case "cat6029283":
                //Swim
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Swim&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            case "cat8109276":
                //Petites (old catId ???)
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Petites&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            case "cat8739284":
                //Petites
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Petites&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            default:
        } //end switch
    }//end if
}//end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) TRUEFFECT SHELF TAGS =*USA*= ",err.message);
} //end catch

/** TRUEFFECT SEARCH TAG */
try
{
    if (pageType == "SEARCH") {
        switch(glCatId)
        {
            case "cat4809277":
                //Sale
                document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Sale&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            default:
        } //end switch
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) TRUEFFECT SEARCH TAG =*USA*= ",err.message);
} // end catch

/** TRUEFFECT PAGE TAGS */
try
{
    if (pageType == "PAGE") {
        switch(pageId) {
            case "99":
                //Email Signup
                document.write('\x3Cscript src="https://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Email_Sign_Up&revenue=REVENUE&random=' + CACHEBUSTER + '">\x3C/script>');
                break;
            default:
        } //end switch
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) TRUEFFECT PAGE TAGS =*USA*= ",err.message);
} // end catch

/** TRUEFFECT CART TAG */
try
{
    if (pageType == "CART") {
        document.write('\x3Cscript src="http://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Shopping_Cart&revenue=' + cartSubTotal + '&random=CACHEBUSTER">\x3C/script>');
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) TRUEFFECT CART TAG =*USA*= ",err.message);
} // end catch

/** TRUEFFECT CHECKOUT TAG */
try
{
    if (pageType == "ORDER") {
        document.write('\x3Cscript SRC="https://webmedia.whitehouseblackmarket.com/jpixel?spacedesc=9553989_1061349_1x1_1061349_1061349&db_afcr=123&target=_blank&group=WHBM&event=Check_Out&revenue=' + checkOutSubTotal + '&random=' + CACHEBUSTER + '&x_order_id=' + checkOutOrderID + '&x_uid=USERID">\x3C/script>');
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) TRUEFFECT CHECKOUT TAG =*USA*= ",err.message);
} // end catch

/** TRUEFFECT COOKIE TAG */
try
{
	var cookieData = "lid=" + $.cookie("TRACK_LOYALTY_ID") + ",ltier=" + $.cookie("TRACK_LOYALTY_TIER");
	$.cookie("TE_LOYALTY", cookieData, {domain: '.whitehouseblackmarket.com', path: '/', expires: 3650});
}
catch (err)
{
	console.log(err.message);
}

//console.log("10. TRUEFFECT -- COMPLETED");

/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     11.  EBAY ENTERPRISE
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * --------------------------------------------------------------------------
 */

/** EBAY ENTERPRISE STORE LOCATOR TAG */
try
{
    if (pageType == "LOCATOR") {
        var csOrderNum = 'SL-' + CACHEBUSTER;
        var csOrderType = 'Store Locator';
        var csSalesStageCode = 'Closed/Won';
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - EBAY ENTERPRISE STORE LOCATOR TAG =*USA*= ",err.message);
} //end catch

/** EBAY ENTERPRISE ONLINE ORDER TAG */
try
{
    if (pageType == "ORDER") {

        var csOrderNum = checkOutOrderID;
        var csOrderType = 'Online Order';

        var csOrderSubTotal = checkOutSubTotal;
        var csTax = checkOutSalesTax;
        var csShipping = checkOutShipping;
        var csOrderDiscount = checkOutDiscountAmount;
        var csOrderTotal = checkOutGrandTotal;

        var csSalesStageCode = 'Closed/Won';

        //Basic Line Item array setup
        var csIds = [];			        //Unique Internal Product ID
        var csPrice = [];			//Discounted unit Price for Product
        var csQtys = [];			//Quantity in Cart
        var csItems = [];			//Product Name/Description
        var csCodes = [];			//Mfg SKU, if exists, otherwise same as csIds
        var csCategories = [];
        var csSubCategories = [];

        //array - needs to be local
        itemPropertyArray=[];
        for (var propt in checkOutOrderItems) {
            itemPropertyArray.push(checkOutOrderItems[propt]);
        }

        var ebayTagCount = 0;
        var itemInfoCount = 1;
        while (itemInfoCount <= numberOfOrderItems) {

            //Add Additional Array Item for each item in shopping cart
            csIds[ebayTagCount] = itemPropertyArray[0];
            csPrice[ebayTagCount] = itemPropertyArray[1] ;
            csQtys[ebayTagCount] =  itemPropertyArray[2];
            csItems[ebayTagCount] = checkOutProductDescriptions[ebayTagCount];
            csCodes[ebayTagCount] = itemPropertyArray[0];
            csCategories[ebayTagCount] = '';
            csSubCategories[ebayTagCount] = '';

            //next ...
            itemPropertyArray.shift();
            itemPropertyArray.shift();
            itemPropertyArray.shift();

            ebayTagCount++;
            itemInfoCount++;
        }
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - EBAY ENTERPRISE ONLINE ORDER TAG =*USA*= ",err.message);
} // end catch


/** EBAY ENTERPRISE SEARCH TAG */
try
{
    if (pageType == "SEARCH") {
        var csSiteSearchTerm = theSearchTerm;
        var csSiteSearchResultCount = '0';
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - EBAY ENTERPRISE SEARCH TAG =*USA*= ",err.message);
} // end catch


/** EBAY ENTERPRISE BASIC TAG */
try
{
    //category pages ? set categry variable
    if ((pageType == "SHELF") || (pageId == "83109277") || (pageId == "70409282")) {

        var csCustomCategory = glCatName;
    }

    //set page URL
    var csPageConfiguration = thisPage;

    document.write('\x3Cscript type="text/javascript" src="https://dsa.csdata1.com/data/js/' + CSACCOUNTID + '/csgather.js">\x3C/script>');
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - EBAY ENTERPRISE BASIC TAG =*USA*= ",err.message);
} // end catch

//console.log("11.  EBAY ENTERPRISE -- COMPLETED");

/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     12. GOOGLE TAG MANAGER
 *         GOOGLE CHICOS TAG
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * --------------------------------------------------------------------------
 */

/** GOOGLE CHICOS TAG */
try
{
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NKHV2K');
}//end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - GOOGLE CHICOS TAG =*USA*= ",err.message);
} //end catch

//console.log("12. GOOGLE TAG MANAGER -- COMPLETED");

/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^
 *     13. STRUQ
 *         STRUQ HOMEPAGE TAG
 *         STRUQ PRODUCT LIST (SHELF) TAG
 *         STRUQ PRODUCT DETAILS TAG
 *         STRUQ BASKET (SHOPPING CART) TAG
 *         STRUQ CONVERSION (CHECKOUT) TAG
 *     ^^^^^^^^^^^^^
 * --------------------------------------------------------------------------
 */


/** STRUQ HOMEPAGE TAG */
try
{
    if (pageType == "HOME") {
        window._struqPI = window._struqPI || [];
        _struqPI.push(['injectTrackingPixel', { trackingPixelId: 'gB95DROLck-4T_26938WgA', route: '/s/ga/', collectData: false, options: { timeoutMs: 2000, firstPartyCookie: '', firstPartyUid: '' }}]);
        (function() {
            var struq = document.createElement('script'); struq.type = 'text/javascript'; struq.async = true;
            struq.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'media.struq.com/content/scripts/Struq_Us_Pixel_Injector' + (window.jQuery ? (1.7 <= parseFloat($.fn.jquery.substring(0, 3)) ? '_Jquery' : '') : '') + '_min_v1-7.js';
            //var s = document.getElementById('struqPixelInjectorScript'); s.parentNode.insertBefore(struq, s);
            var s = document.getElementsByTagName('head')[0].appendChild(struq);
        })();
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - STRUQ HOMEPAGE TAG =*USA*= ",err.message);

} //end catch

/** STRUQ PRODUCT LIST (SHELF) TAG */
try
{
    if (pageType == "SHELF") {

        var allShelfPageProductIds = getShelfPageProductIds();
        var numCatProductIds = allShelfPageProductIds.length;

        if(numCatProductIds > 3){
            var threeShelfPageProductIds = allShelfPageProductIds.slice(0,3);
            var struqFormattedShelfPageProductIds = threeShelfPageProductIds.toString();
        } else {
            var struqFormattedShelfPageProductIds = "none,none,none";
        }
        //console.log("gltrk.js - struqFormattedShelfPageProductIds = " + struqFormattedShelfPageProductIds);

        window._struqPI = window._struqPI || [];
        _struqPI.push(['injectTrackingPixel', {
            trackingPixelId: 'jPg68_S1Z0uxFYTD2eQrkw',
            route: '/s/sa/',
            collectData: false,
            /* If you'd like to use JavaScript to pass the dynamic data use the instructions below. Otherwise, change "collectData" above to true and see Implementation guide for the alternative HTML DIV tags.
             Data required:
             IF IT'S A SINGLE PRODUCT (eg. in a Product Page): replace the variable STQ123 below with the product ID on this page
             IF THERE ARE SEVERAL PRODUCTS (eg. a category product list): replace the variable STQ123 below with the a comma (,) separated list of up to 3 product IDs from the page, e.g. "id1,id2,id3"
             */
            data: [
                { title: "si", pid: struqFormattedShelfPageProductIds }
            ],
            options: { timeoutMs: 2000, firstPartyCookie: '', firstPartyUid: '' }}]);
        (function() {
            var struq = document.createElement('script'); struq.type = 'text/javascript'; struq.async = true;
            struq.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'media.struq.com/content/scripts/Struq_Us_Pixel_Injector' + (window.jQuery ? (1.7 <= parseFloat($.fn.jquery.substring(0, 3)) ? '_Jquery' : '') : '') + '_min_v1-7.js';
            //var s = document.getElementById('struqPixelInjectorScript'); s.parentNode.insertBefore(struq, s);
            var s = document.getElementsByTagName('head')[0].appendChild(struq);
        })();
    }//end if
}//end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - STRUQ PRODUCT LIST (SHELF) TAG =*USA*= ",err.message);
} //end catch

/** STRUQ PRODUCT DETAILS TAG */
try
{
    if (pageType == "PRODUCT") {
        window._struqPI = window._struqPI || [];
        _struqPI.push(['injectTrackingPixel', {
            trackingPixelId: '2cwyyRaPR0iVHEuPgO_ejg',
            route: '/s/sa/',
            collectData: false,
            /* If you'd like to use JavaScript to pass the dynamic data use the instructions below. Otherwise, change "collectData" above to true and see Implementation guide for the alternative HTML DIV tags.
             Data required:
             IF IT'S A SINGLE PRODUCT (eg. in a Product Page): replace the variable STQ123 below with the product ID on this page
             IF THERE ARE SEVERAL PRODUCTS (eg. a category product list): replace the variable STQ123 below with the a comma (,) separated list of up to 3 product IDs from the page, e.g. "id1,id2,id3"
             */
            data: [
                { title: "detail", pid: productPageProductId}
            ],
            options: { timeoutMs: 2000, firstPartyCookie: '', firstPartyUid: '' }}]);
        (function() {
            var struq = document.createElement('script'); struq.type = 'text/javascript'; struq.async = true;
            struq.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'media.struq.com/content/scripts/Struq_Us_Pixel_Injector' + (window.jQuery ? (1.7 <= parseFloat($.fn.jquery.substring(0, 3)) ? '_Jquery' : '') : '') + '_min_v1-7.js';
            //var s = document.getElementById('struqPixelInjectorScript'); s.parentNode.insertBefore(struq, s);
            var s = document.getElementsByTagName('head')[0].appendChild(struq);
        })();
    }//end if
}//end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - STRUQ PRODUCT DETAILS TAG =*USA*= ",err.message);
} //end catch

/** STRUQ BASKET (SHOPPING CART) TAG */
try
{
    if (pageType == "CART") {
        window._struqPI = window._struqPI || [];
        _struqPI.push(['injectTrackingPixel', {
            trackingPixelId: 'SKwgYdog70aqBrMuht8Pjg',
            route: '/s/sa/',
            collectData: false,
            /* If you'd like to use JavaScript to pass the dynamic data use the instructions below. Otherwise, change "collectData" above to true and see Implementation guide for the alternative HTML DIV tags.
             Data required:
             IF IT'S A SINGLE PRODUCT (eg. in a Product Page): replace the variable STQ123 below with the product ID on this page
             IF THERE ARE SEVERAL PRODUCTS (eg. a category product list): replace the variable STQ123 below with the a comma (,) separated list of up to 3 product IDs from the page, e.g. "id1,id2,id3"
             */
            data: [
                { title: "si", pid: cartProductIds}
            ],
            options: { timeoutMs: 2000, firstPartyCookie: '', firstPartyUid: '' }}]);
        (function() {
            var struq = document.createElement('script'); struq.type = 'text/javascript'; struq.async = true;
            struq.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'media.struq.com/content/scripts/Struq_Us_Pixel_Injector' + (window.jQuery ? (1.7 <= parseFloat($.fn.jquery.substring(0, 3)) ? '_Jquery' : '') : '') + '_min_v1-7.js';
            //var s = document.getElementById('struqPixelInjectorScript'); s.parentNode.insertBefore(struq, s);
            var s = document.getElementsByTagName('head')[0].appendChild(struq);
        })();
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - STRUQ BASKET (SHOPPING CART) TAG =*USA*= ",err.message);
} // end catch


/** STRUQ CONVERSION (CHECKOUT) TAG */
try
{
    if (pageType == "ORDER") {

        struqOrderProducts = checkOutProductIds.toString();
        //console.log("struqOrderProducts = " + struqOrderProducts);

        window._struqPI = window._struqPI || [];
        _struqPI.push(['injectTrackingPixel', {
            trackingPixelId: 'HJccueoCukWKZp4J2ta7vw',
            route: '/s/cda/',
            collectData: false,
            /* If you'd like to use JavaScript to pass the dynamic data use the instructions below. Otherwise, change the collectData above to true and see Implementation guide for the alternative HTML DIV tags.
             Data required:
             replace the variable STQ123 below with a comma separated list of all purchased product IDs, e.g. "id1,id2,id3"
             ignore "qty", "tv" and "dis" - they are legacy variables and are no longer used
             replace ORDER123 with the order ID
             replace TOTALVALUE with the Order Value(order value must be a number)
             replace GBP with the three letter currency code of the transaction
             */
            data: [
                { title: "li", pid: struqOrderProducts, qty: "1", tv: "1"},
                { title: "summary", oid: checkOutOrderID, tot: checkOutSubTotal, dis: "0", cur: ""}
            ],
            options: { timeoutMs: 2000, firstPartyCookie: '', firstPartyUid: '' }}]);
        (function() {
            var struq = document.createElement('script'); struq.type = 'text/javascript'; struq.async = true;
            struq.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'media.struq.com/content/scripts/Struq_Us_Pixel_Injector' + (window.jQuery ? (1.7 <= parseFloat($.fn.jquery.substring(0, 3)) ? '_Jquery' : '') : '') + '_min_v1-7.js';
            //var s = document.getElementById('struqPixelInjectorScript'); s.parentNode.insertBefore(struq, s);
            var s = document.getElementsByTagName('head')[0].appendChild(struq);
        })();
    } //end if
} //end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - STRUQ CHECKOUT TAG =*USA*= ",err.message);
} // end catch



//console.log("13. STRUQ -- COMPLETED");

/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^
 *     14. BING / YAHOO
 *     ^^^^^^^^^^^^^^^^^^^^^^^
 *         BING CONVERSION (CHECKOUT) TAG
 * --------------------------------------------------------------------------
 */
/** BING CONVERSION (CHECKOUT) TAG */
try
{
    if (pageType == "ORDER") {
        if(thisPageProtocol == "https:") {
            document.write('<img src="https://954255.r.msn.com/?dedup=1&domainId=954255&type=1&revenue=' + checkOutSubTotal + '&actionid=92417" frameborder="0" scrolling="no" width="1" height="1" style="visibility:hidden;display:none">');
        } else {
            document.write('<img src="http://954255.r.msn.com/?dedup=1&domainId=954255&type=1&revenue=' + checkOutSubTotal + '&actionid=92417" frameborder="0" scrolling="no" width="1" height="1" style="visibility:hidden;display:none">');
        }
    } // end if
} // end try
catch (err)
{
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - BING CHECKOUT TAG =*USA*= ",err.message);
} // end catch

//console.log("14. BING / YAHOO -- COMPLETED");

/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     15. COMMISSION JUNCTION
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * --------------------------------------------------------------------------
 */


try {
    if (pageType == "ORDER") {
        var cj_items_raw = window.cj.cartItemsWithDiscountedPrice;
        var cj_items = cj_items_raw.replace(/amp;/g, "");

        var CJ = CJ || {};
        CJ._name = 'CommissionJunction';
        CJ._version = '1';

        CJ.config = {
            DOMAIN: 'www.emjcd.com',
            CID: '1528038',
            BASE_URL_TEMPLATE: 'https://{0}/u?CID={1}&OID={2}&TYPE=362546{3}&CURRENCY=USD&METHOD=IMG',
            ITEM_STRING_TEMPLATE: '&ITEM{0}={1}&AMT{0}={2}&QTY{0}={3}',
            OID: window.cj.oid
        };

        CJ.init = function(prodList, qtyList, priceList) {
            var self = this;
            try {
                var itemsString = self.buildItemsString(prodList, qtyList, priceList);
                var src = self.buildSrc(itemsString);
                self.firePixel(src);
            } catch (err) {
                this.error(err);
            }
        };

        CJ.error = function(message) {
            if (console && console.error) {
                console.error(this._name + ' | v' + this._version + ' | [ERROR] ' + message);
            }
        };

        CJ.firePixel = function(src) {
            var img = new Image();
            img.src = src;
            return img;
        };

        CJ.buildItemString = function(index, itemId, price, qty) {
            return CJ.formatter(this.config.ITEM_STRING_TEMPLATE,
                index,
                itemId,
                price,
                qty
            );
        };

        CJ.buildItemsString = function(prodList, priceList, qtyList) {
            var itemString = "";
            for (var i = 0; i < prodList.length; i++) {
                var itemId = prodList[i];
                var price = priceList[i];
                var qty = qtyList[i];
                itemId = itemId.replace(',', '');
                itemString += this.buildItemString(i+1, itemId, price, qty);
            }
            return itemString;
        };

        CJ.buildSrc = function(itemsString) {
            return CJ.formatter(this.config.BASE_URL_TEMPLATE,
                this.config.DOMAIN,
                this.config.CID,
                this.config.OID,
                itemsString
            );
        };

        CJ.formatter = function(format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match;
            });
        };

        CJ.init(window.prodList, window.priceList, window.qtyList);
    }

} catch (err) {
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - COMMISSIONJUNCTION TAG =*USA*= ",err.message);
}

//console.log("15. COMMISSION JUNCTION -- COMPLETED");

/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^
 *     16. KENSHOO
 *     ^^^^^^^^^^^^^^^^^^
 * --------------------------------------------------------------------------
 */

//console.log("16. KENSHOO -- COMPLETED");


/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^
 *     17. EBAY FACEBOOK
 *     ^^^^^^^^^^^^^^^^^^
 * --------------------------------------------------------------------------
 */

/** EBAY FACEBOOK (CHECKOUT) TAG */
 try
 {
      if (pageType == "ORDER") {
          // NEW FACEBOOK TAG
          var fb_param = {};
          fb_param.pixel_id = '6012900095897';
          fb_param.value = checkOutSubTotal;
          fb_param.currency = 'USD';
               var fpw = document.createElement('script');
               fpw.async = true;
               fpw.src = '//connect.facebook.net/en_US/fp.js';
               var ref = document.getElementsByTagName('script')[0];
               ref.parentNode.insertBefore(fpw, ref);
       } // end if
 } // end try
catch (err)
 {
     console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - EBAY FACEBOOK CHECKOUT TAG =*USA*= ",err.message);
 } // end catch


/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^
 *     18. CHEETAHMAIL T2P
 *     ^^^^^^^^^^^^^^^^^^
 * --------------------------------------------------------------------------
 */

try {

    var T2P = T2P || {};
    T2P._name = 'CheetahMail T2P';
    T2P._version = '1';

    T2P.config = {
        DOMAIN: 'email.whitehouseblackmarket.com',
        CHEETAH_ID: 'r2083411286.2093600808',
        BASE_URL_TEMPLATE: 'https://{0}/a/{1}/whbm.gif?{2}',
        RETURN_STRING_TEMPLATE: 'orderID={0}&amount={1}&items={2}',
        FORMAT_ITEM_TEMPLATE: '{0}@{1}@{2}',
        USE_DISCOUNT_ITEMS: true
    };

    T2P.createItem = function(index, items) {
        return {
            skuId: items['ITEM' + index],
            qty: items['QTY' + index],
            unitPrice: items['AMT' + index]
        };
    };

    T2P.createItems = function(rawItems) {
        var items = [];
        var hasMore = true;
        var i = 1;
        while (hasMore) {
            if (typeof rawItems['ITEM' + i] != 'undefined') {
                items.push(this.createItem(i, rawItems));
            } else {
                hasMore = false;
            }
            i++;
        }
        return items;
    };

    T2P.buildSrc = function(orderId, orderAmount, items) {
        return T2P.formatter(this.config.BASE_URL_TEMPLATE,
            this.config.DOMAIN,
            this.config.CHEETAH_ID,
            this.formatString(orderId, orderAmount, items)
        );
    };

    T2P.error = function(message) {
        if (console && console.error) {
            console.error(this._name + ' | v' + this._version + ' | [ERROR] ' + message);
        }
    };

    T2P.firePixel = function(src) {
        var img = new Image();
        img.src = src;
        return img;
    };

    T2P.formatItem = function(skuId, qty, unitPrice) {
        return this.formatter(this.config.FORMAT_ITEM_TEMPLATE, skuId, qty, unitPrice);
    };

    T2P.formatItems = function(items) {
        var itemsString = "";
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            itemsString += this.formatItem(item.skuId, item.qty, item.unitPrice);
            if (items[i+1]) {
                itemsString += '|'
            }
        }
        return itemsString;
    };

    T2P.formatString = function(orderId, orderAmount, items) {
        var src = "";
        if (items && items.length > 0) {
            var itemsString = this.formatItems(items);
            src = this.formatter(this.config.RETURN_STRING_TEMPLATE, orderId, orderAmount, itemsString)
        } else {
            throw "Can't format items. No items found.";
        }
        return src;
    };

    T2P.formatter = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match;
        });
    };

    T2P.getItemsString = function(prodList, priceList, qtyList) {
        if (T2P.config.USE_DISCOUNT_ITEMS) {
            var items = {};
            for (var i = 0; i < prodList.length; i++) {
                items['ITEM' + (i + 1)] = prodList[i];
                items['QTY' + (i + 1)] = qtyList[i];
                items['AMT' + (i + 1)] = priceList[i];
            }
            return items;
        } else {
            return getOrderItems();
        }
    };

    T2P.init = function(orderId, orderAmount, items) {
        var self = this;
        try {
            var processedItems = self.createItems(items);
            var src = self.buildSrc(orderId, orderAmount, processedItems);
            self.firePixel(src);
        } catch (err) {
            this.error(err);
        }
    };

    if (pageType == "ORDER") {
        T2P.orderSubTotal;
        if (window.kenshoo) {
            T2P.orderSubTotal = window.kenshoo.val
        } else {
            T2P.error("Kenshoo missing!!! Subtotal needed.");
        }
        T2P.init(orderNumber, T2P.orderSubTotal, T2P.getItemsString(window.CI_ItemIDs, window.priceList, window.qtyList));
    }

} catch (err) {
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - CHEETAHMAIL T2P");
}



/** 
* -------------------------------------------------------------------------- 
* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
* 19. TWITTER CONVERSION PIXELS
* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
* -------------------------------------------------------------------------- 
*/

/** TWITTER TAG  -- CHECKOUT / SITE VISIT **/ 

try { 
        var ttr = document.createElement('script'); 
        ttr.type = 'text/javascript'; 
        ttr.async = true; 
        ttr.src = '//platform.twitter.com/oct.js';
        var tref = document.getElementsByTagName('script')[0];
        tref.parentNode.insertBefore(ttr, tref);
        ttr.onreadystatechange = magicTwitter;
        ttr.onload = magicTwitter;
        function magicTwitter() {
            if (pageType == "ORDER") { 
                if (typeof twttr != "undefined") {
                    twttr.conversion.trackPid('l4bn0'); 
                }
            } else {
                if (typeof twttr != "undefined") {
                    twttr.conversion.trackPid('l4g9e');
                }
            }
        }
} catch (err) { 
    console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - TWITTER CHECKOUT TAG =*USA*= ",err.message); 
}

/**
 * --------------------------------------------------------------------------
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     20. FACEBOOK CUSTOM AUDIENCE TAG
 *     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * --------------------------------------------------------------------------
 */

/** FACEBOOK CUSTOM AUDIENCE TAG  */
 try {
      if (pageType != "ORDER") {
	  var _fbq = window._fbq || (window._fbq = []);
	  if (!_fbq.loaded) {
		var fbds = document.createElement('script');
		fbds.async = true;
		fbds.src = '//connect.facebook.net/en_US/fbds.js';
		var script_uno = document.getElementsByTagName('script')[0];
		script_uno.parentNode.insertBefore(fbds, script_uno);
		_fbq.loaded = true;
	  }
	  _fbq.push(['addPixelId', '781248131907763']);
	 window._fbq = window._fbq || [];
	 window._fbq.push(['track', 'PixelInitialized', {}]);
      } // end if
 } // end try
catch (err)
 {
     console.log("Possible error detected in gltrk.js (note: this error does not affect page load and is for informational purposes only) - FACEBOOK CUSTOM AUDIENCE TAG =*USA*= ",err.message);
 } // end catch