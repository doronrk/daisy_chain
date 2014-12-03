
function gsicmExecuteDeferredTags()
{
    if ((typeof gsicmDeferredTags != 'undefined') && (gsicmDeferredTags != null))
    {
        while (gsicmDeferredTags.length > 0)
        {
            var elem = gsicmDeferredTags.shift();
            elem[0].executeNow(elem[1]);
        }

        // defect 30373 - we only want to defer on initial page load
        gsicmDeferredTags = null;
    }
};


function CMBaseTagGenerator(
    productId,
    productName,
    categoryId,
    categoryName,
    customerData,
    orderData,
    cartData,
    searchData,
    optData)
{
    this.productId      = productId;
    this.productName    = productName;
    this.categoryId     = categoryId;
    this.categoryName   = categoryName;
    this.customerData   = customerData;
    this.orderData      = orderData;
    this.cartData       = cartData;
    this.searchData     = searchData;
    this.optData        = optData;

    this.homePage               = function() { this.execute("_homePage"); this.createBBWCoremetricsCookie(); };
    this.categoryPage           = function() { this.execute("_categoryPage"); this.createBBWCoremetricsCookie(); };
    this.familyPage             = function() { this.execute("_familyPage"); this.createBBWCoremetricsCookie();};
    this.productPage            = function() { this.execute("_productPage"); this.createBBWCoremetricsCookie(); };
    this.crossSell              = function() { this.execute("_crossSell"); this.createBBWCoremetricsCookie(); };
    this.addToCart              = function() { this.execute("_addToCart"); this.createBBWCoremetricsCookie(); };
    this.addToWishlist          = function() { this.execute("_addToWishlist"); this.createBBWCoremetricsCookie(); };
    this.expressShop            = function() { this.execute("_expressShop"); this.createBBWCoremetricsCookie(); };
    this.expressShopViewDescription = function() { this.execute("_expressShopViewDescription"); this.createBBWCoremetricsCookie(); };
    this.expressShopAddToCart   = function() { this.execute("_expressShopAddToCart"); this.createBBWCoremetricsCookie(); };
    this.cartStart              = function() { this.execute("_cartStart"); this.createBBWCoremetricsCookie(); };
    this.cartProduct            = function() { this.execute("_cartProduct"); this.createBBWCoremetricsCookie(); };
    this.cartEnd                = function() { this.execute("_cartEnd"); this.createBBWCoremetricsCookie(); };
    this.cartSuggestiveSell     = function() { this.execute("_cartSuggestiveSell"); this.createBBWCoremetricsCookie(); };
    this.minicartStart          = function() { this.execute("_minicartStart"); this.createBBWCoremetricsCookie(); };
    this.minicartProduct        = function() { this.execute("_minicartProduct"); this.createBBWCoremetricsCookie(); };
    this.minicartEnd            = function() { this.execute("_minicartEnd"); this.createBBWCoremetricsCookie(); };
    this.wishlistStart          = function() { this.execute("_wishlistStart"); this.createBBWCoremetricsCookie(); };
    this.wishlistProduct        = function() { this.execute("_wishlistProduct"); this.createBBWCoremetricsCookie(); };
    this.wishlistEnd            = function() { this.execute("_wishlistEnd"); this.createBBWCoremetricsCookie(); };
    this.checkoutBillAddress    = function() { this.execute("_checkoutBillAddress"); this.createBBWCoremetricsCookie(); };
    this.checkoutShipAddress    = function() { this.execute("_checkoutShipAddress"); this.createBBWCoremetricsCookie(); };
    this.checkoutShipMethod     = function() { this.execute("_checkoutShipMethod"); this.createBBWCoremetricsCookie(); };
    this.checkoutPayment        = function() { this.execute("_checkoutPayment"); this.createBBWCoremetricsCookie(); };
    this.checkoutConfirm        = function() { this.execute("_checkoutConfirm"); this.createBBWCoremetricsCookie(); };
    this.checkoutReceiptStart   = function() { this.execute("_checkoutReceiptStart"); this.createBBWCoremetricsCookie(); };
    this.checkoutReceiptItem    = function() { this.execute("_checkoutReceiptItem"); this.createBBWCoremetricsCookie(); };
    this.checkoutReceiptEnd     = function() { this.execute("_checkoutReceiptEnd"); this.createBBWCoremetricsCookie(); };
    this.orderStatus            = function() { this.execute("_orderStatus"); this.createBBWCoremetricsCookie(); };
    this.login                  = function() { this.execute("_login"); this.createBBWCoremetricsCookie(); };
    this.myAccount              = function() { this.execute("_myAccount"); this.createBBWCoremetricsCookie(); };
    this.registration           = function() { this.execute("_registration"); this.createBBWCoremetricsCookie(); };
    this.emailSignup            = function() { this.execute("_emailSignup"); this.createBBWCoremetricsCookie(); };
    this.searchResults          = function() { this.execute("_searchResults"); this.createBBWCoremetricsCookie(); };
    this.genericPageview        = function() { this.execute("_genericPageview"); this.createBBWCoremetricsCookie(); };
	this.conversionEvent        = function() { this.execute("_conversionEvent"); this.createBBWCoremetricsCookie(); };
	this.itemDes				= function() { this.execute("_itemDes"); this.createBBWCoremetricsCookie(); };
	this.giftWrap				= function() { this.execute("_giftWrap"); this.createBBWCoremetricsCookie(); };

    this.execute = function(shadowFn)
    {
        if ((typeof gsicmDeferredTags != 'undefined') && (gsicmDeferredTags != null))
            gsicmDeferredTags.push([this, shadowFn]);
        else
            this.executeNow(shadowFn);
    };


    this.executeNow = function(shadowFn)
    {
        var tags = this[shadowFn] ? this[shadowFn]() : "";
        if (tags && tags.length > 0)
        {
                 eval(tags, this);
        }
    }


//-----------------------------------------------------------------------------
// default shadow function implementations
//-----------------------------------------------------------------------------

    this._homePage = function()
    {
        return "cmCreateTechPropsTag(\"HOME\", \"HOME\");";
    };


    this._categoryPage = function()
    {
    	return "cmCreatePageviewTag("
             +      "'Category: ' + this.categoryName, "
             +      "this.categoryId, null, null);";
    };


    this._familyPage = function()
    {
    	return "cmCreatePageviewTag("
             +      "'Family: ' + this.categoryName, "
             +      "this.categoryId, null, null);";
    };


    this._productPage = function()
    {
        return "cmCreateProductviewTag(productId, productName, categoryId);";
    };


    this._expressShop = this._productPage;
    this._expressShopAddToCart = this._addToCart;


    this._cartStart =  function()
    {
        return "cmCreatePageviewTag(\"CART\", \"CART\", null, null);";
    };


    this._cartProduct = function()
    {
        return "cmCreateShopAction5Tag("
             +      "productId, productName, "
             +      "cartData.quantity, cartData.unitPrice, "
             +      "categoryId);";
    };


    this._cartEnd = function()
    {
        return "cmDisplayShop5s();";
    };



    this._minicartStart =  function()
    {
        return "cmCreatePageviewTag(\"MINICART\", \"CART\", null, null);";
    };


    this._minicartProduct = function()
    {
        return "cmCreateShopAction5Tag("
             +      "productId, productName, "
             +      "cartData.quantity, cartData.unitPrice, "
             +      "categoryId);";
    };


    this._minicartEnd = function()
    {
        return "cmDisplayShop5s();";
    };


    this._wishlistStart =  function()
    {
        return "cmCreatePageviewTag(\"WISHLIST\", \"CART\", null, null);";
    };


    this._wishlistProduct = function()
    {
        return "cmCreateShopAction5Tag("
             +      "productId, productName, "
             +      "0, 0, "
             +      "categoryId);";
    };


    this._wishlistEnd = function()
    {
        return "cmDisplayShop5s();";
    };


    this._checkoutBillAddress = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Billing Address\", \"CHECKOUT\", null, null);";
    };


    this._checkoutShipAddress = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Shipping Address\", \"CHECKOUT\", null, null);";
    };


    this._checkoutShipMethod = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Shipping Method\", \"CHECKOUT\", null, null);";
    };


    this._checkoutPayment = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Payment\", \"CHECKOUT\", null, null);";
    };


    this._checkoutConfirm = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Review\", \"CHECKOUT\", null, null);";
    };


    this._checkoutReceiptStart = function()
    {
        return "cmCreatePageviewTag(\"RECEIPT\", \"CHECKOUT\", null, null);";
    };


    this._checkoutReceiptItem = function()
    {
        return "cmCreateShopAction9Tag("
             +      "productId, productName, "
             +      "cartData.quantity, cartData.unitPrice, "
             +      "customerData.customerId, orderData.orderId, "
             +      "orderData.orderSubtotal, categoryId);";
    };


    this._checkoutReceiptEnd = function()
    {
        return "cmDisplayShop9s();"
             + "cmCreateOrderTag("
             +      "orderData.orderId, orderData.orderSubtotal, "
             +      "orderData.orderSH, customerData.customerId);";
    };


    this._orderStatus = function()
    {
        return "cmCreatePageviewTag(\"ORDER STATUS\", \"CHECKOUT\", null, null);";
    }

	this._itemDes = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Item Destination\", \"CHECKOUT\", null, null);";
    }

	this._giftWrap = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Gift Wrap\", \"CHECKOUT\", null, null);";
    }


    this._login = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Login\", \"CHECKOUT\", null, null);";
    };


    this._myAccount = function()
    {
        return "cmCreatePageviewTag(\"MYACCOUNT\", \"CHECKOUT\", null, null);";
    };


    this._registration = function()
    {
        return "cmCreateRegistrationTag("
             +      "customerData.customerId, customerData.customerEmail, "
             +      "customerData.customerCity, customerData.customerState, "
             +      "customerData.customerZip);";
    };


    this._emailSignup = function()
    {
        var newsletter = (this.optData && this.optData["newsletterName"])
                       ? this.optData["newsletterName"]
                       : "EMAIL";
        var subscribed = (this.optData && this.optData["subscribedFlag"])
                       ? this.optData["subscribedFlag"]
                       : "Y";

        return "cmCreateRegistrationTag("
             +      "customerData.customerId, customerData.customerEmail, "
             +      "customerData.customerCity, customerData.customerState, "
             +      "customerData.customerZip, "
             +      "\'" + newsletter + "\', \'" + subscribed + "\');";
    };


    this._searchResults = function()
    {
        return "cmCreatePageviewTag("
             +      "'Search Results', "
             +      "searchData.searchType, "
             +      "searchData.searchTerm, "
             +      "searchData.resultCount );";
    };


    this._genericPageview = function()
    {
        if (this.optData && this.optData["pageId"] && this.optData["categoryId"])
        {
            return "cmCreatePageviewTag("
                 +      "this.optData['pageId'], this.optData['categoryId'], "
                 +      "null, null);";
        }
        else if (this.optData && this.optData["pageId"])
        {
            return "cmCreatePageviewTag("
                 +      "this.optData['pageId'], null, "
                 +      "null, null);";
        }
        else if (this.optData && this.optData["categoryPrefix"])
        {
            return "cmCreatePageviewTag("
                 +      "this.optData['categoryPrefix'] + this.categoryName, "
                 +      "this.categoryId, "
                 +      "null, null);";
        }
        else
        {
            return "cmCreatePageviewTag("
                 +      "'GENERIC PAGE', 'GENERIC', null, null);";
        }
    }


   	this._conversionEvent = function()
    {
     	if (this.optData && this.optData["eventId"] && this.optData["eventType"] && this.optData["categoryId"])
     	{
     		return "cmCreateConversionEventTag(this.optData['eventId'], this.optData['eventType'], this.optData['categoryId'], null);";
     	} else {
     		return "cmCreatePageviewTag('GENERIC PAGE', 'GENERIC', null, null);";
     	}
   			
     }

//To support older browsers e.g. IE 8
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}

function setCookie(cname,cvalue)
{
    document.cookie = cname + "=" + cvalue + ";path=/;";
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
      {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
      }
    return "";
}

this.createBBWCoremetricsCookie = function ()
{
    var cookie=getCookie("bbwCoremetricCookie");
    if (cookie=="")  {
        cmCreatePageElementTag('B site', ' AB test ');
        setCookie("bbwCoremetricCookie", "B");
    }
}       		
       		
};
