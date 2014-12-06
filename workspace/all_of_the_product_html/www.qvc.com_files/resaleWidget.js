// QVC AJAX Product Page

var st_resale = {
    // URL used in links from flash to view the shopping cart
    viewShoppingCartURL: '/webapp/wcs/stores/servlet/OrderItemDisplay?orderId=.&langId=-1&storeId=%storeID%&catalogId=%catalogID%&cm_re=MH-_-CS-_-Cart',
    // URL used in links to access the warranty page on a flash error message
    productPageURL: '/webapp/wcs/stores/servlet/ProductDisplay?partNumber=%productID%&storeId=%storeID%&sc=%productID%-CRTR&langId=-1&catalogId=%catalogID%&relType=IOFFER&keyword=%productID%&ddkey=http:CatalogSearch',
    // URL used when making the AJAX call to add the warranty to the shopping cart
    //addToShoppingCartURL: '/AddToCart',
    addToShoppingCartURL: '/webapp/wcs/stores/servlet/AddToCart',
    widgets: new Array(),
    defaults: {
        args: {
            type: 0,
            widgetElementID: 'squaretrade_resale_pp',
            handlerName: 'onWarrantySelect',
            itemCondition: 'New',
            itemCategory: undefined,
            itemPrice: undefined,
            itemDescription: undefined,
            ajaxErrorHandling: 'true',
			tracking: 'true',
            swfFilePath: '/wcsstore/US/content/swf/SquareTrade/',
            jsFilePath: '/wcsstore/US/content/javascript/',
            swfFilePath2: '/wcsstore/US/content/swf/SquareTrade/',
            gifFilePath: '/wcsstore/US/content/images/SquareTrade/',
            displayType: 'exclusive',
            background: 'white',
            applianceCategorySKUs:'2000',
			learnMoreUrl: 'http://www.squaretrade.com/learn-more-qvc'
        },
        w_0: {
            style: {
                width: 350,
                height: 142,
                zIndex: 1
            },
            file: 'ResaleWidgetQVC.swf',
            minFlashVersion: 8,
            displayType: 'always'
        },
        w_details: {
            style: {
                width: '490px',
                height: '430px',
                position: 'absolute',
                zIndex: 99999
            },
            file: 'details_QWS_features.swf',
            minFlashVersion: 8,
		    background: 'transparent'
        }
    }
};

st_resale.Widget = function(id, args) {
    this.children = new Array();             // associative array, id => st_resale.Widget
    this.id = id;
    this.type = args.type;

    if (args.type == st_resale.defaults.args.type)
        this.parentElement = document.getElementById(args.widgetElementID);
    else
        this.parentElement = document.body;
    this.displayType = args.displayType;
    args.swfFilePath = args.swfFilePath2;
	this.tracking = args.tracking;
    this.swfFilePath = args.swfFilePath;
    this.gifFilePath = args.gifFilePath;

    if(args.isUpsellSelected != undefined){
        this.productID = args.isUpsellSelected == "true" ? args.upsellWarrantyProductID : args.baseWarrantyProductID;
        this.description = args.isUpsellSelected == "true" ? args.upsellDescription : args.baseDescription;
    }

    this.itemCategory = args.itemCategory;
    this.itemSKU = args.itemSKU;
    this.itemDescription = args.itemDescription;

    st_resale.swfFilePath = args.swfFilePath;

    this.container = document.getElementById(id + '_c');
	if(!this.container){
		this.container = document.createElement('div');
		this.container.id = id + '_c';
	}
    var defaults = st_resale.getDefaults(args.type);
    this.width = defaults.style.width;
    this.height = defaults.style.height;
    st_resale.mapProperties(defaults.style, this.container.style);

    var swf = new SWFObject(
            args.swfFilePath2 + '/' + defaults.file,
            id,
            defaults.style.width,
            defaults.style.height,
            defaults.minFlashVersion,
            defaults.background);

    swf.skipDetect = 'false';
    swf.addParam('allowScriptAccess', 'always');
    swf.addParam('wmode', 'transparent');
    for (attr in args){
        value = args[attr];
        if (typeof(value) == 'string')
            value = escape(value);
        else if (typeof(value) != 'number')
            continue;
        swf.addVariable(attr, value);
    }
    swf.addVariable('widgetID', id);
    swf.addVariable('parentID', args.parentID);
    swf.addVariable('defaultCategory', 'NONE');
    swf.addVariable('shoppingCartURL', st_resale.viewShoppingCartURL);
    swf.addVariable('itemSkuID', args.itemSKU);
    this.parentElement.appendChild(this.container);
    swf.write(this.container.id);

    // form workaround
    window[id] = document.getElementById(id);

    this.show = function() {
        this.container.style.display = 'block';
    }

    this.hide = function() {

        if(this.parentID){
            var parent = st_resale.widgets[this.parentID];

            st_resale.sendClickEvent(this.productID, "CLOSEWINDOW","Close Window",parent.itemCategory, parent.itemSKU,parent.itemDescription);

        }

        //st_resale.sendClickEvent(args.upsellWarrantyProductID, "MOREINFO","More Info",parent.itemCategory,parent.itemSKU, args.upsellDescription);

        this.container.style.display = 'none';

    }

    this.spawn = function(type, args) {
        if (args == undefined)
            args = {type: type, parentID: this.id, swfFilePath: this.swfFilePath};
        else {
            args.type = type;
            args.parentID = this.id;
            args.swfFilePath2 = this.swfFilePath;
        }
        var child = st_resale.createProductPageWidget(args);
        child.parentID = this.id;
        this.children[child.id] = child;
        var coords = st_resale.getCoords(this.container);

        var topCoord = coords.top + (this.height - child.container.offsetHeight) / 2;
        var leftCoord = coords.left + (this.width - child.container.offsetWidth) / 2;

        // omitting 'px' here breaks firefox
        child.container.style.top = Math.max(0, topCoord) + 'px';
        child.container.style.left = Math.max(0, leftCoord) + 'px';
    }
}

st_resale.getId = function(widgetElementID, type){
    return widgetElementID + '_' + type;
}

/**
 * Only show the widget if the itemSKU starts with an E and item price
 * is more than $50.  Widget will not take up space on the page if it doesn't
 * meet these requirements
 */
st_resale.showWidget = function(itemSKU, itemPrice, itemDescription,itemCategory, type) {
    // only check for the main widget not the children
    if (type != st_resale.defaults.args.type)
    {
        return true;
    }

    if (itemSKU != undefined && itemPrice != undefined && itemDescription != undefined) {
        var firstChar = itemSKU.charAt(0);
        if (firstChar.toUpperCase() == 'E' && itemPrice > 50.00){

            var isApplianceCategory = false;
            if(this.defaults.args.applianceCategorySKUs){
                var applianceCategorySKUsArray = this.defaults.args.applianceCategorySKUs.split(",");
                for(var i in applianceCategorySKUsArray){
                    if(itemCategory == applianceCategorySKUsArray[i]){
                        isApplianceCategory = true;
                        break;
                    }
                }
            }


            if(isApplianceCategory){
                return st_resale.isEligibleItemDescriptionAppliance(itemDescription);
            }else{
                return st_resale.isEligibleItemDescription(itemDescription);
            }
        }


    }

    return false;
}

/**
 *  If the category is an appliance, offer a warranty  regardless of the term  of the manufacturer warranty
 *
 * Check the item description for the following (case insensitive):
 * "Squaretrade"
  * "as is" OR "as-is" OR "asis"
 * "refurbished"
 * return true if none of the above are in the item description; fasle
 * otherwise
 */
st_resale.isEligibleItemDescriptionAppliance = function(itemDescription) {
    var ineligibleWords = /squaretrade|\bas(\s*|-)is\b|premium protection|refurbished/gi;

    if (itemDescription.search(ineligibleWords) != -1)
        return false;
    return true;
}



/**
 * Check the item description for the following (case insensitive):
 * "Squaretrade"
 * Any Number greater than 1 e.g "2 year" OR "2-year" OR "2year"
 * "as is" OR "as-is" OR "asis"
 * "refurbished"
 * return true if none of the above are in the item description; fasle
 * otherwise
 */
st_resale.isEligibleItemDescription = function(itemDescription) {
    var ineligibleWords = /squaretrade|\b[2-9](\s*|-)year\b|\bas(\s*|-)is\b|premium protection|refurbished/gi;

    if (itemDescription.search(ineligibleWords) != -1)
        return false;
    return true;
}

/* public api */
st_resale.createProductPageWidget = function(args){
    //console.log('createProductWidget');
    var type = args.type || st_resale.defaults.args.type;
    var defaults = st_resale.getDefaults(type);

    st_resale.fillProperties(defaults, args);
    st_resale.fillProperties(st_resale.defaults.args, args);

    // Get the store and catalog ID from the product detail form on the initial load
    st_resale.storeID = document.frmProductDetail.storeId.value;
    st_resale.catalogID = document.frmProductDetail.catalogId.value;

    // update the shopping cart URL with the storeID and catalogID
    st_resale.viewShoppingCartURL = st_resale.viewShoppingCartURL.replace('%storeID%', st_resale.storeID);
    st_resale.viewShoppingCartURL = st_resale.viewShoppingCartURL.replace('%catalogID%', st_resale.catalogID);

    if (!st_resale.showWidget(args.itemSKU, args.itemPrice, args.itemDescription,args.itemCategory, type)) {
        return;
    }

    // detect flash
    //console.log('flash :: ' + deconcept.SWFObjectUtil.getPlayerVersion().major);
    
    if ( deconcept.SWFObjectUtil.getPlayerVersion().major==0)
    {
        var flashContainer = document.getElementById(args.widgetElementID);
        if (!flashContainer)
            return;

        // we have no flash so display link to download it in the span
        flashContainer.innerHTML = '<div id="stResalePP" class="stWidgetDiv"><div id="stHeadline" class="stHeadlineDiv">Protect Your Investment with a Service Contract</div>	<div id="stWidgetInfo"></div></div>';
        
        loadDoc(categoryId, args.itemPrice);
        return;

    }

    var widgetId = st_resale.getId(args.widgetElementID, args.type);
    var widget = new st_resale.Widget(widgetId, args);
    st_resale.widgets[widgetId] = widget;
    st_resale.show(widgetId);

    return widget;
}

/************* NEW ***************/
//function loadDoc(catID, itemPrice)
//{
//	var xmlhttp;
//	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
//  	xmlhttp=new XMLHttpRequest();
//  } else {// code for IE6, IE5
//  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//  }
//	xmlhttp.onreadystatechange=function()
//  {
//  if (xmlhttp.readyState==4 && xmlhttp.status==200)
//  {
//   var snippet = xmlhttp.responseText;
//   displayStatic(snippet, catID, itemPrice);
//  }
// }
// var docURL = "/wcsstore/US/content/swf/SquareTrade/stwidgetconfig.txt";
//	xmlhttp.open("GET",docURL,true);
//	xmlhttp.send();
//}


function docHTTPObject() {
	var xhr = false;
	if (window.ActiveXObject) {
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				xhr = false;
			}
		}
	} else if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	return xhr;
}
function loadDoc(catID, itemPrice) {
	var xmlhttp = docHTTPObject();
	if (xmlhttp) {
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200 || xmlhttp.status == 304) {
					var snippet = xmlhttp.responseText;
					displayStatic(snippet, catID, itemPrice);
				}
			}
		};
		var docURL = '/wcsstore/US/content/swf/SquareTrade/stwidgetconfig.txt';
		xmlhttp.open("GET", docURL, true);
		xmlhttp.send(null);
	}
}

var displayStatic = function (snippet, catID, itemPrice) {
 var stWidget = document.getElementById('stWidgetInfo');
  var catIDPassed;
  var patt1=/\D/g; 
  if (catID.match(patt1) == null) {
  	catIDPassed = catID;
  } else {
  	catIDPassed = catID.toLowerCase();
  }
  var pPrice = new Number(itemPrice);
  
  var patt1 = /\n/g;
  var lineRA = snippet.split(patt1);
  
  var catStr;
  for (var j = 0; j < 91; j++)
  {
  	var catLineRA = lineRA[j].search(catIDPassed);
  	if (catLineRA >= 0 )
  	{
  		catRA = lineRA[j].split('|');
  		catStr = catRA[1];
  		break;
  	}
  }
  
  for (var i = 0; i < lineRA.length; i++)
  {
  	
  	var strCheck = lineRA[i].search(catStr);
  	var pipeCount = lineRA[i].split('|');
  	
  	if (pipeCount[7] != undefined || pipeCount[8] != undefined) {
  	
  		if (strCheck > 1 && pipeCount.length > 4) {
  			var lowRange = new Number(pipeCount[7]);
  			var hiRange = new Number(pipeCount[8]);
  			//console.log(lowRange + ' - ' + hiRange);
  				if (pPrice > lowRange && pPrice <= hiRange) {    		
  					var itemNum = pipeCount[0].split(':');
  					var stItemNum =  itemNum[0];
  					var stType = '';
  					if (pipeCount[4] == 'Warranty_ADH') {
  						stType = '<br />with Drops and Spills Coverage';
  					}
  					var stYr = pipeCount[5] + '-Year';
  					var stDesc = stYr + ' SquareTrade Service Contract' + stType;
  					
  					var stPrice = pipeCount[10];
  					var patt2 = /\s/g;
  					var stSEOLink = stDesc.replace(patt2, '-');
  					var stDiv = document.createElement('div');
  					stDiv.className = 'stDiv'; 			
  					
  					var stSDLinkDiv = document.createElement('div');
  						stSDLinkDiv.className = 'stLnkSDDiv';
  					
  					var stSDLink = document.createElement('a');
  						//stSDLink.href = 'http://www.qvc.com/' + stSEOLink + '.product.'+ stItemNum +'.html';
  						stSDLink.href = 'http://www.qvc.com/qvc.product.'+ stItemNum +'.html';
  						stSDLink.setAttribute('manual_cm_sp','SQUARETRADE-_-'+ stItemNum +'-_-MOREINFO:Non-Flash'); 
  						stSDLink.innerHTML = stDesc;
  					
  					var stPriceLinkDiv = document.createElement('div');
  						stPriceLinkDiv.className = 'stLnkPriceDiv';
  					
  					var stPriceLink = document.createElement('a');
  						//stPriceLink.href = 'http://www.qvc.com/' + stSEOLink + '.product.'+ stItemNum +'.html';
  						stPriceLink.href = 'http://www.qvc.com/qvc.product.'+ stItemNum +'.html';
  						stPriceLink.setAttribute('manual_cm_sp','SQUARETRADE-_-'+ stItemNum +'-_-MOREINFO:Non-Flash'); 
  						stPriceLink.innerHTML = '$' + stPrice;
  					
  					
  					stSDLinkDiv.appendChild(stSDLink);
  					stDiv.appendChild(stSDLinkDiv);
  					stPriceLinkDiv.appendChild(stPriceLink);
  					stDiv.appendChild(stPriceLinkDiv);
  					stWidget.appendChild(stDiv);
  				}
  		}
  	}
  }

}
/************* END ***************/


/* flash api */
st_resale.showChildWidget = function(parentID, type, args){

    args.baseWarrantyProductID = st_resale.parseIDs(args.baseWarrantyProductID).productID;

    if(args.upsellWarrantyProductID)
        args.upsellWarrantyProductID = st_resale.parseIDs(args.upsellWarrantyProductID).productID;
    else{ //appliances will not have an upsell
        args.upsellWarrantyProductID = null;
    }


    if(st_resale.widgets[parentID].tracking){
    	//var attributes = "null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-WSC";

		if(type == 'details'){
            var parent = st_resale.widgets[parentID];


            if(args.isUpsellSelected == "true"){

                var categoryID = undefined;
                if(args.upsellWarrantyTerm == 3){
                    categoryID = 'SRVC003';
                }else if(args.upsellWarrantyTerm == 4){
                    categoryID = 'SRVC004';
                }

			    st_resale.sendPageView(categoryID, 'SquareTrade More Details Page', document.location.href, parent.itemSKU, shortDesc, "MOREINFO",args.upsellWarrantyProductID);
                st_resale.sendClickEvent(args.upsellWarrantyProductID, "MOREINFO","More Info",parent.itemCategory,parent.itemSKU, parent.itemDescription);
            }else{

                var categoryID = undefined;
                if(args.baseWarrantyTerm == 3){
                    categoryID = 'SRVC003';
                }else if(args.baseWarrantyTerm == 4){
                    categoryID = 'SRVC004';
                }

			    st_resale.sendPageView(categoryID, 'SquareTrade More Details Page', document.location.href, parent.itemSKU, shortDesc,"MOREINFO", args.baseWarrantyProductID);
                st_resale.sendClickEvent(args.baseWarrantyProductID,"MOREINFO","More Info",parent.itemCategory,parent.itemSKU, parent.itemDescription);
            }
        }
	}

    st_resale.widgets[parentID].spawn(type, args);
}

//helper for CM tracking
st_resale.createPagViewPageID = function(itemSKU, description, eventType, productID){
	var shortDesc = description.trim();
    return 'SQUARETRADE: ' + itemSKU + '-' + shortDesc + " > " + eventType + ": " + productID;
}	

//shortDesc comes from a QVC file
st_resale.createClickEventPageID = function(itemSKU){
    return 'PRODUCT: ' + shortDesc + " (" + itemSKU + ')';
}

st_resale.sendClickEvent= function(productID, eventType, name, categoryID, itemSKU,description){

    try {

        var href = window.location.href;

        if(href !=''){
            var index = href.indexOf('?');
	        if(index > 0){
	            href = href.substring(0,index) + '?cm_sp=SQUARETRADE-_-' + productID + '-_-' + eventType ;
	        }else{
	            href = href + '?cm_sp=SQUARETRADE-_-' + productID + '-_-' + eventType ;
	        }
	    }

        var pageID = st_resale.createClickEventPageID(itemSKU,description);
        cmCreateManualLinkClickTag(href, name, pageID, categoryID);

    } catch(err) {}
}



st_resale.sendPageView = function(categoryID, DestinationURL, ReferringURL,itemSKU,description,eventType,productID){

    try {
        var pageID = st_resale.createPagViewPageID(itemSKU,description,eventType,productID);
        cmCreateManualPageviewTag(pageID, categoryID, DestinationURL, ReferringURL);
    } catch(err) {}
}


st_resale.sendProductView = function(productID, description, itemSKU){

	//var productName = description + ' (' + productID + ')  Parent:' + itemSKU;
	var productName = description + ' (' + productID.split(":",1) + ')';	
/*For Defect 14255*/ 
	var attributes = specialPriceCode+'-_-'+creditTermsCode+'-_-'+productReviews+'-_-'+avgRating+'-_-'+scCode+'-_-SQUARETRADE-_-'+cmViewLocation+'-_-'+parentItemNo+'-_-null-_-WSC';
    try {
        //(This is a page variable that is defined in QVC's javascript. Sometimes it might not be defined)
       // cmCreateProductviewTag(productID, productName, 'SRVC002', window.CM_ShopCatID);
        cmCreateProductviewTag(productID.split(":",1),productName,categoryId,null,shoppingCategoryId,productBrandId,scCode.substr(0,2),null,null,attributes);
    } catch(err) {}
};

st_resale.getDefaults = function(type){
    return eval('st_resale.defaults.w_' + type);
}

st_resale.show = function(widgetID){
    var widget = st_resale.widgets[widgetID];
    widget.show();

    // if need be, hide other objects of the the same display type
    if (widget.displayType == 'exclusive')
        for (var id in st_resale.widgets)
            if (id != widgetID && st_resale.widgets[id] && st_resale.widgets[id].displayType == 'exclusive')
                st_resale.hideWidget(id);
}

/* flash api */
st_resale.hideWidget = function(widgetID) {
    st_resale.widgets[widgetID].hide();
}

st_resale.fillProperties = function(from, to){
    st_resale._mapProperties({from: from, to: to, overwrite: false});
}

st_resale.mapProperties = function(from, to){
    st_resale._mapProperties({from: from, to: to, overwrite: true});
}

st_resale.getRootWidgets = function() {
    var arr = new Array();
    for (var id in st_resale.widgets) {
        var widget = st_resale.widgets[id];
        if (widget.type == st_resale.defaults.args.type)
            arr.push(widget);
    }
    return arr;
}

st_resale.getRootEmbeddedObjects = function() {
    var arr = new Array();
    var widgets = st_resale.getRootWidgets();
    for (var i in widgets){
        var widget = widgets[i];
        if (widget.id){
            var obj = document.getElementById(widget.id);
            if (obj)
                arr.push(obj);
        }
    }
    return arr;
}

st_resale._mapProperties = function(args){
    for (var p in args.from){
        if (args.to[p] == undefined || args.overwrite)
            args.to[p] = args.from[p];
    }
}

st_resale.getCoords = function(obj){
    var coords = {left: 0, top:0};

    do {
        coords.left += obj.offsetLeft;
        coords.top += obj.offsetTop;
    } while (obj = obj.offsetParent);

    return coords;
}

st_resale.openWin = function (file,w,h,scr,menu,stat,tool,name,args){

    if(name === 'LearnMore' && args && args.parentID){
        var parent = st_resale.widgets[args.parentID];
        if(parent){
            st_resale.sendClickEvent(args.productID, "LEARNMORE","Learn More",parent.itemCategory, parent.itemSKU, parent.itemDescription);
        }
    }

    st_resale.popup = window.open(file,name,"scrollbars="+scr+",resizable=no,menubar="+menu+",status="+stat+",toolbar="+tool+",width="+w+",height="+h+",screenx=0,screeny=0,top=0,left=0");
    if( !st_resale.popup ){
        return false;
    }
    else st_resale.popup.focus();
    return true;
}

//
// AJAX and AJAX error handling
//

/**
 * Displayed error messages for AJAX Results
 * cartTotalPriceError and genericErrorMsg have a wild card for %productID%
 * that will need to be replaced before displaying the error message
 *
 */
st_resale.cartFullError = "The SquareTrade Service Contract could not be added to your cart.  Please visit the <a href=\"" + st_resale.viewShoppingCartURL + "\" target=\"_top\">Shopping Cart</a> to remove items before continuing.";
st_resale.cartTotalPriceError = "The SquareTrade Service Contract could not be added to your cart.  Please visit the <a href=\"" + st_resale.productPageURL + "\" target=\"_top\">product detail page for this service contract</a> to purchase.";
st_resale.genericErrorMsg = "The SquareTrade Service Contract could not be added to your cart.  Please visit the <a href=\"" + st_resale.productPageURL + "\" target=\"_top\">product detail page for this service contract</a> to purchase.";
st_resale.success = "SUCCESS";

/**
 * Look for the defined error msgs that could be contain in the page.
 * If one is detected set the appropriate error msg.
 * responseHtml - the results of the AJAX call
 * widgetID - the ID of the flash widget
 * productID - the warranty productID
 * storeID - the storeID
 * catalogID - the catalogID
 */
st_resale.parseHTML = function(responseHtml, widgetID, catEntryID, partNumberID, storeID, catalogID) {
    // shopping cart too many items error
    var cartFullPattern = /The shopping cart is limited to only/gi;
    // shopping cart total dollar amount too much error
    var totalTooMuchPattern = /We are only able to process orders that total less than/gi;
    // sold our error
    var soldOutPattern = /The item you requested is sold out/gi;
    // item not available
    var itemNotAvailable = /item is not available/gi;
    // generic error
    var genericPattern = /There are no items in your/gi;

    if (responseHtml.search(cartFullPattern) != -1)
    {
        // substitute the productID, storeID, and catalogID placeholders before showing the message
        var msg = st_resale.replacePlaceHolders(st_resale.cartFullError, partNumberID, storeID, catalogID);
        // call actionscript with results
        st_resale.callbackWidget(widgetID, msg);
    }
    else if (responseHtml.search(totalTooMuchPattern) != -1)
    {
        // substitute the productID, storeID, and catalogID placeholders before showing the message
        var msg = st_resale.replacePlaceHolders(st_resale.cartFullError, partNumberID, storeID, catalogID);
        // call actionscript with results
        st_resale.callbackWidget(widgetID, msg);
    }
    else if ((responseHtml.search(genericPattern) != -1) || (responseHtml.search(soldOutPattern) != -1) || responseHtml.search(itemNotAvailable) != -1)
    {
        // substitute the productID, storeID, and catalogID placeholders before showing the message
        var msg = st_resale.replacePlaceHolders(st_resale.genericErrorMsg, partNumberID, storeID, catalogID);
        // call actionscript with results
        st_resale.callbackWidget(widgetID, msg);
    }
    else
    {
        st_resale.disableSpeedBuy();
        // call actionscript with results
        st_resale.callbackWidget(widgetID, st_resale.success);
    }
}

st_resale.replacePlaceHolders = function(msg, partNumberID, storeID, catalogID) {
    // substitute the productID, storeID, and catalogID placeholders before showing the message
    msg = msg.replace(/%productID%/g, partNumberID);
    msg = msg.replace(/%storeID%/g, storeID);
    msg = msg.replace(/%catalogID%/g, catalogID);
    return msg;
}

function onWarrantySelect(productID, price, description, widgetID)
{



    var ids = st_resale.parseIDs(productID);
	// add product with id to cart via xmlHttp POST

    var widget = st_resale.widgets[widgetID];
    st_resale.sendClickEvent(ids.productID, "WIDGETADDTOCART", "Add to Cart", widget.itemCategory, widget.itemSKU, description);

    st_resale.xmlHttp("POST", st_resale.addToShoppingCartURL,
            "storeId=" + st_resale.storeID +"&langId=-1&catalogId="+ st_resale.catalogID+"&URL=OrderItemDisplay%3FupdatePrices%3D1%26calculationUsageId%3D-1%26orderId%3D.&errorViewName=ProdNotFoundView&orderId=.&calculationUsageId=-1&quantity=1&shouldCachePage=false&requisitionListId=false&listId=.&bundleProductsId=&promo=&fromPage=ProductDisplay&catEntryId="+ids.catEntryID,
            st_resale.onLoad, st_resale.onError, widgetID, ids.catEntryID, ids.productID);

    // special code for QVC to update the cart display
    //if (window.monetateUpdateCartHeader)
    //{
    //    window.monetateUpdateCartHeader(1,price);
    //}
}

/**
* Parses the ':' separated idString and returns a closure with the member vars:
*  partNumber:catEntryID
*/
st_resale.parseIDs = function(idString){



	var idArray = idString.split(':');
	var ids = {};
	ids.productID = idArray[0];

    if(idArray.length > 1){ // for now, so it doesnt break testing if config file ids are incomplete

		ids.catEntryID = idArray[1];
	}
	return ids;
}

/**
 * Make the AJAX call to add the warranty to the shopping cart
 */
st_resale.xmlHttp = function(method, url, postQueryString, onLoad, onError, widgetID, catEntryID, partNumberID)
{
    var xmlhttp, bComplete = false;
    if ( !url)
        return false;
    try
    {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
    {
        try
        {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e)
        {
            try
            {
                xmlhttp = new XMLHttpRequest();
            }
            catch (e)
            {
                xmlhttp = false;
            }
        }
    }

    if (!xmlhttp) return false;

    bComplete = false;
    try
    {
        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader("Method", method + url
                + " HTTP/1.1");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && !bComplete)
            {
                bComplete = true;
                if ( xmlhttp.status == 200)
                {
                    if (st_resale.onLoad) st_resale.onLoad(xmlhttp, widgetID, catEntryID, partNumberID, st_resale.storeID,  st_resale.catalogID);
                }
                else
                {
                    if (st_resale.onError) st_resale.onError(xmlhttp, widgetID, catEntryID, partNumberID, st_resale.storeID,  st_resale.catalogID);
                }
            }
        };
        xmlhttp.send(postQueryString);
    }
    catch(z)
    {
        return false;
    }
    return true;
}

/**
 * Called after the AJAX call is finished
 */
st_resale.onLoad = function(http, widgetID, catEntryID, partNumberID, storeID, catalogID)
{
    var responseHtml = http.responseText;
    //document.getElementById("output").innerHTML=responseHtml;
    st_resale.parseHTML(responseHtml, widgetID, catEntryID, partNumberID, storeID, catalogID);
}

/**
 * Called if the AJAX call has an error
 */
st_resale.onError = function(http, widgetID, catEntryID, partNumberID, storeID, catalogID)
{
    // substitute the the productID, storeID, and catalogID placeholders before showing the message
    var msg = st_resale.genericErrorMsg.replace(/%productID%/g, partNumberID);
    msg = msg.replace(/%storeID%/g, storeID);
    msg = msg.replace(/%catalogID%/g, catalogID);
    st_resale.callbackWidget(widgetID, msg);
}

/**
 *  Callback the specifed flash widgetID with the specified msg
 */
st_resale.callbackWidget = function(widgetID, results)
{
    var widget = document.getElementById(widgetID);
    if (widget != undefined)
    {
        widget.processAjaxResults(results);
    }
}

/**
 * Called if the warranty was added to the cart successfully. Changes the
 * image of the SpeedBuy button to be grayed out
 */
st_resale.disableSpeedBuy = function()
{
	gifFilePath: '/wcsstore/US/content/images/'
    var speedBuyButtonElements = window.document.getElementsByName("SpeedBuy");
    if (speedBuyButtonElements != undefined)
    {
        // get a reference to the speedbuy button
        var speedBuyElement = speedBuyButtonElements[0];

        if (speedBuyElement != undefined)
        {
            // set the cursor to an arrow when over the button
            speedBuyElement.style.cursor = "default";

            // see what version the buton is
            var version = st_resale.checkSpeedBuyButtonVersion(speedBuyElement);
            if (version == "B")
            {
                // switch image to greyed out version B button
                //speedBuyElement.src = url(st_resale.gifFilePath + "speed_buy_B_off.gif");
            }
            else
            {
                // switch image to greyed out version A button
                //speedBuyElement.src = url(st_resale.swfFilePath + "speed_buy_A_off.gif");
                //speedBuyElement.src = url(st_resale.gifFilePath + "speed_buy_A_off.gif");
                
                //speedBuyElement.src = url("/wcsstore/US/content/images/SquareTrade/speed_buy_A_off.gif");
                
             }

            // return false so the form doesn't get submitted
            speedBuyElement.onclick = function() {st_resale.disabledSpeedBuyButtonClicked(); return false;};
        }
    }
}

/**
 * Determine the version of the speed buy button
 * Returns A or B
 */
st_resale.checkSpeedBuyButtonVersion = function(speedBuyElement)
{
    if (speedBuyElement != undefined && speedBuyElement.src.search(/monetate.net/i) != -1)
    {
        return "B";
    }
    return "A";
}

/**
 * Called when the disabled SpeedBuy Button is clicked.  This function will
 * locate the specified div tag and insert the specified error message in
 * the div tag
 */
st_resale.disabledSpeedBuyButtonClicked = function()
{
    alert("Please add this item to your Shopping Cart, then choose Speed Buy from the Cart page to purchase both the item and the service contract.");
}

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject