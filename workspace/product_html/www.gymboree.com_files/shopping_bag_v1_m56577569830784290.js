/*
	==============SHOPPING_BAG.js====================
	contains a set of functions for manipulation with Shopping Bag div

	Uses script.aculo.us javascript library:
	-- script.aculo.us scriptaculous.js v1.7.0, Fri Jan 19 19:16:36 CET 2007
	-- Copyright (c) 2005, 2006 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)

	=================================================
*/

var xmlESB;						//XML data
var ESBarr;						//array for horizontal scrolling for vertical items scrolling in Shopping Bag area
var ESBcurr = 0, ESBShift = 0;	//vertical scrolling current and shift items
var move_disabled = false;		//flag for disabling vert. scrolling
var mouseUP = false;			//flag for mouse button UP
var PGarr = new Array();		//array for horizontal scrolling
var PGcurr = 0;					//horizontal scrolling current item
var itemsToDisplay = 5;
var itemHeightTotal = 86;

/*-- replaces the calls "document.getElementById(id)" by el(id)--*/
function el(id) {
	return document.getElementById(id);
}

function DoSmth() {

}

/*-- onload  function for home page, init horisontal scrolling array --*/
function Home_Loader(shoppingBagDataURL) {
	var item_count = 10;
    for (var i = 0; i < item_count; i++) {
        PGarr[i] = "pg-" + i;
    }
	//init AJAX loader for Shopping Bag Items
    var loader = new net.ContentLoader(shoppingBagDataURL, InitESB, null, "GET");
}

function HomeEmpty_Loader(shoppingBagDataURL) {
	var item_count = 10;
    for (var i = 0; i < item_count; i++) {
        PGarr[i] = "pg-" + i;
    }
	//init AJAX loader for Shopping Bag Items
    var loader = new net.ContentLoader(shoppingBagDataURL, InitESB, null, "GET");
}

/*-- onload  function for all pages with Shopping Bag data --*/
function Products_Loader(shoppingBagDataURL) {
	//init AJAX loader for Shopping Bag Items
    var loader = new net.ContentLoader(shoppingBagDataURL, InitESB, null, "GET");
}

/*-- onload  function for product_detail page --*/
function Detail_Loader(shoppingBagDataURL, productDataURL) {
	//init AJAX loader for Shopping Bag Items
	if (shoppingBagDataURL != null)
	{
		var loader1 = new net.ContentLoader(shoppingBagDataURL, InitESB,null,"GET");

	}
	
	tab = 0; //current product preview tab
	tab_id = "fits_tab1"; //current product preview tab html id
	//init AJAX loader for product color, size and price data
	var loader2 = new net.ContentLoader(productDataURL, DrawPDiv, null, "GET");
}

/*-- onload  function for outfil_detail & multi_product pages --*/
function Multi_Loader(shoppingBagDataURL, productDataURL) {
	//init AJAX loader for Shopping Bag Items
    var loader1 = new net.ContentLoader(shoppingBagDataURL, InitESB, null, "GET");
	//init AJAX loader for product color, size and price data
    var loader2 = new net.ContentLoader(productDataURL, DrawPDivs, null, "GET");
}

/*-- provides actions with XMLHTTPRequest loading for manipulation with the Shopping Bag div . It loads XMLHTTPRequest response text, calculates items quantity, creates hidden html elements (shopping bag items) and fills the item array.  --*/
function InitESB() {
    var el_d, el_a, el_i; //new html elements (div, a, image)

	//XML data transformation from "this.req.responseText"
    var reqxmlDoc = Sarissa.getDomDocument();
    reqxmlDoc = (new DOMParser()).parseFromString(this.req.responseText, "text/xml");
	xmlShoppingCart = reqxmlDoc.getElementsByTagName("shopping-cart");
	xmlESB = xmlShoppingCart[0].getElementsByTagName("product");

    if (xmlESB.length > 0) {
		var cartsize = xmlShoppingCart[0].getAttribute("cartsize");
	    el("shopping-bag-b").innerHTML = cartsize + " items";
		attachShoppingCartButtons();
	} else {
		el("shopping-bag-area").className += " empty";
		el("shopping-bag-b").innerHTML = " 0 items";
		el("ec-shopping-bag").setAttribute("href", el("shopping-bag-ico").getAttribute("href"));
	}

    //check for switching on image on el("down-button")
    if (xmlESB.length > 5) {
		var disabledRegExp = new RegExp("\s{0,}?disabled");
		el("down-button").className = el("down-button").className.replace(disabledRegExp, "");
	}

	ESBarr = new Array();
	for (var i = 0; i <= xmlESB.length-1; i++) {
		el_d = document.createElement("div");
		aid = "ESB" + i + xmlESB[i].getAttribute("id");
		el_d.setAttribute("id", aid);

		el_i = document.createElement("img");
		el_i.setAttribute("src", xmlESB[i].getAttribute("src"));
		el_i.setAttribute("alt", xmlESB[i].getAttribute("alt"));

		el_d.appendChild(el_i);
		el('in-expanded-shopping-bag').appendChild(el_d);

		el(aid).style.display = "block";
		el(aid).className = "bag-item";
		ESBarr[i] = aid;
	}
}

/*-- rollover top menu (<div id="top-main-menu">) --*/
function ShowHideSC() {
	var collapsedRegExp = new RegExp("\s{0,}?collapse");
	if (collapsedRegExp.test(el("shopping-bag-area").className)) {
		el("shopping-bag-area").className = el("shopping-bag-area").className.replace(collapsedRegExp, "");
	} else {
		el("shopping-bag-area").className += " collapse";
	}
}


//--------------------------------------------------------------------------------------------------------
//----- START vertical scrolling -------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//-- provides vertical scrolling of  Shopping Bag items. Uses effects and animation javascript library ---
//--------------------------------------------------------------------------------------------------------

/*--- Move div down (mouse button - down) --*/
function StartDown() {
    if (!move_disabled) {
        mouseUP = false;
        if (ESBcurr < ESBarr.length - itemsToDisplay) {
            DrawDown();
        }
    }
}

/*--- Stop move div down (mouse button - up) --*/
function StopDown() {
    //mouse up event (down-button)
    mouseUP = true;
}

/*--- Move div up (mouse button - down) --*/
function StartUp() {
    if (!move_disabled) {
        mouseUP = false;
        if (ESBcurr > 0) {
            DrawUp();
        }
    }
}

/*--- Stop move div up (mouse button - up) --*/
function StopUp() {
    mouseUP = true; //mouse up event (up-button)
}


//--------event functions --------------------
/*--- Start frame move down --*/
function BeginDown() {
    move_disabled = true;
}

/*--- Stop frame move down --*/
function EndDown() {
    ESBcurr++;

    if (!mouseUP) { //mouse button is still down
        if (ESBcurr < ESBarr.length - itemsToDisplay) {
            DrawDown();
        } else {
            move_disabled = false;
        }
    } else {
        //stopping
        var queue = Effect.Queues.get('myscope');
        queue.each(function(e) {
			e.cancel(); //current movement ending
		});
		move_disabled = false;
    }

	enableDisableButtons(el("down-button"));
}

/*--- Start frame move up --*/
function BeginUp() {
    move_disabled = true;
}

/*--- Stop frame move up --*/
function EndUp() {
    ESBcurr--;

	if (!mouseUP) { //mouse button is still down
        if (ESBcurr > 0) {
            DrawUp();
        } else {
            move_disabled = false;
        }
    } else {
        //stopping
        var queue = Effect.Queues.get('myscope');
        queue.each(function(e) {
			e.cancel(); //current movement ending
		});
		move_disabled = false;
    }

	enableDisableButtons(el("up-button"));
}
//----- visual effect - moving - functions ------------------
function DrawUp() {
    new Effect.Move('in-expanded-shopping-bag', {x:0, y: itemHeightTotal, duration:0.5, queue: {position:'end', scope: 'myscope'}, transition: Effect.Transitions.linear, afterFinish: EndUp, beforeStart: BeginUp } );
}
function DrawDown() {
    new Effect.Move('in-expanded-shopping-bag', {x:0, y: -itemHeightTotal, duration:0.5, queue: {position:'end', scope: 'myscope'}, transition: Effect.Transitions.linear, afterFinish: EndDown, beforeStart: BeginDown } );
}

//--- checking for switching off images on arrow buttons
function enableDisableButtons(obj) {
	var disabledRegExp = new RegExp("\s{0,}?disabled");

	if (ESBcurr <= 0) {
		el("up-button").className += " disabled";
	} else {
		el("up-button").className = el("up-button").className.replace(disabledRegExp, "");
	}

	if (ESBcurr >= ESBarr.length - itemsToDisplay) {
		el("down-button").className += " disabled";
	} else {
		el("down-button").className = el("down-button").className.replace(disabledRegExp, "");
	}
}
//--------------------------------------------------------------------------------------------------------
//----- END vertical scrolling ---------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

/*-- opens a new browser window "account_address_edit.html" when the "Edit" button is clicked on "4_3_account_ship_address.html" page --*/
function OpenAAS() {
	var w = 520; //window width
	var h = 596; //window height
	//position on screen center
	var x = window.screen.width / 2 - w / 2;
	var y = window.screen.height / 2 - h / 2;
	//open new window
  	var newWind = window.open("account_address_edit.html", "newAAS", 'toolbar=0, status=1, scrollbars=0, menubar=0, resizable=1, location=0, directories=0, width='+w+', height='+h+', left='+x+', top='+y)
}

/*-- opens a new browser window "email_to_friend.html" when the "Email to a friend" button is clicked on "2_2_product_detail.html" page --*/
function OpenETF() {
	var w = 518; //window width
	var h = 405; //window height
	//position on screen center
	var x = window.screen.width / 2 - w / 2;
	var y = window.screen.height / 2 - h / 2;
	//open new window
  	var newWind = window.open("email_to_friend.html", "newETF", 'toolbar=0, status=1, scrollbars=0, menubar=0, resizable=1, location=0, directories=0, width='+w+', height='+h+', left='+x+', top='+y)
}

/*-- opens a new browser window "checkout_edit_shipping.html" when the "Edit this address" button is clicked on "3_1_1_checkout_ship_recognz.html" and "3_2_1_checkout_multi_address.html" pages --*/
function OpenCES()
{
	var w = 622; //window width
	var h = 620; //window height
	//position on screen center
	var x = window.screen.width / 2- w / 2;
	var y = window.screen.height / 2- h / 2;
	//open new window
  	var newWind = window.open("checkout_edit_shipping.html", "newCES", 'toolbar=0, status=1, scrollbars=0, menubar=0, resizable=1, location=0, directories=0, width='+w+', height='+h+', left='+x+', top='+y)
}

function attachShoppingCartButtons() {
	el("up-button").onmousedown = function () { StartUp(); }
	el("up-button").onmouseup = function () { StopUp(); }
	el("up-button").onclick = function () { return false; }
	el("down-button").onmousedown = function () { StartDown(); }
	el("down-button").onmouseup = function () { StopDown(); }
	el("down-button").onclick = function () { return false; }
	el("ec-shopping-bag").onclick = function () {
		ShowHideSC();
		UpdateSessionWithShowHideESB();
		return false;
	}
}