var gymboTellPart = new function(){
	this.mid="";
	this.ACTION_TYPE = {
		"NONE": 'Other',
		"EVENT_TYPE_PRODUCT": 'pv',
		"EVENT_TYPE_CART_ITEMS": 'updatecart',
		"EVENT_TYPE_ORDER_COMPLETE": 'tx',
		"EVENT_TYPE_LOGIN": 'login' 
	};
	this.SUB_ACTION_TYPE = {
		"NONE": 'Other',
		"EVENT_ADD_CART_ITEM": 'ADD_CART',
		"EVENT_UPDATE_CART_ITEMS": 'EDIT_CART',
		"EVENT_TYPE_ORDER_COMPLETE": 'ORDER_COMPLETE'
	};
}

function GymboWebTrack()
{
	this.UserId="";
	this.UpdateCartType="";
	this.parameters = new GymboHash();
	this.eventType = gymboTellPart.ACTION_TYPE.NONE;
	this.subeventType = gymboTellPart.SUB_ACTION_TYPE.NONE;
	this.itemsList= new Array();
	this.itemsUpdateList = new Array();
	this.itemsRemoveList = new Array();

	this.maxSkuIds_trk=110;
	this.enableDuplicateSkuIDs_trk=false;

	this.addItemToList = function(gymboSKU) {
		return this.itemsList.push(gymboSKU);
	}	
	this.addItemToUpdateList = function(gymboSKU) {
		return this.itemsUpdateList.push(gymboSKU);
	}
	this.addItemToRemoveList = function(gymboSKU) {
		return this.itemsRemoveList.push(gymboSKU);
	}		
	this.clear = function clear()
	{
	  try {
			this.eventType = gymboTellPart.ACTION_TYPE.NONE;
			this.parameters.clear();
			for (var i in this.itemsList ) {
				delete this.itemsList [i];
			} 
			for (var i in this.itemsUpdateList ) {
				delete this.itemsUpdateList [i];
			} 
			for (var i in this.itemsRemoveList ) {
				delete this.itemsRemoveList [i];
			} 
		}catch(e){
		}
	}
	this.doAction = function() {
		try{
			if(this.eventType == gymboTellPart.ACTION_TYPE.EVENT_TYPE_LOGIN){
				this.login();
			}else if(this.eventType == gymboTellPart.ACTION_TYPE.EVENT_TYPE_PRODUCT){
				this.pageView();
			}else if(this.eventType == gymboTellPart.ACTION_TYPE.EVENT_TYPE_CART_ITEMS){
				this.updateCartItems();
			}else if(this.eventType == gymboTellPart.ACTION_TYPE.EVENT_TYPE_ORDER_COMPLETE){
				this.orderComplete();
			}
		}catch(e){
		}
		try{
			//this.clear();
		}catch(e){
		}
	}
	this.pageView = function() {
		var action = TellApartCrumb.makeCrumbAction(gymboTellPart.mid, this.eventType);
 		action.setUserId(this.UserId);
		action.setActionAttr("PageType", this.parameters.get("PageType"));
		action.setActionAttr("ProductCategoryPath", this.parameters.get("ProductCategoryPath"));
		var sku = this.parameters.get("SKU");
		if(sku != null &&  sku  != "" ){
			action.setActionAttr("SKU", sku);
		}
 		action.finalize(); 
	}
	this.login = function() {
		var action = TellApartCrumb.makeCrumbAction(gymboTellPart.mid, this.eventType);
		action.setUserId(this.UserId);
		action.setActionAttr("Email", this.parameters.get("Email"));
		action.setActionAttr("Name", this.parameters.get("Name"));
		action.setActionAttr("Address", this.parameters.get("Address"));
		action.setActionAttr("City", this.parameters.get("City"));
		action.setActionAttr("State",  this.parameters.get("State"));
		action.setActionAttr("PostalCode",  this.parameters.get("PostalCode"));
		action.setActionAttr("Country",this.parameters.get("Country"));
		action.finalize(); 
	}
	this.orderComplete = function() {
		if(this.itemsList !=null && this.itemsList.length>0){
			var action = TellApartCrumb.makeCrumbAction(gymboTellPart.mid, gymboTellPart.ACTION_TYPE.EVENT_TYPE_ORDER_COMPLETE);
			action.setUserId(this.UserId);
			action.setActionAttr("Email", this.parameters.get("Email"));
			action.setActionAttr("TransactionId", this.parameters.get("TransactionId"));
			action.setActionAttr("TransactionTotal", this.parameters.get("TransactionTotal"));
			action.setActionAttr("TransactionTotalCurrency", this.parameters.get("TransactionTotalCurrency"));
			action.setActionAttr("PromoCode", this.parameters.get("PromoCode"));
			action.setActionAttr("PromoDiscount", this.parameters.get("PromoDiscount"));
			//billing address			
			action.setActionAttr("BillingName", this.parameters.get("BillingName"));
			action.setActionAttr("BillingAddress", this.parameters.get("BillingAddress"));
			action.setActionAttr("BillingCity", this.parameters.get("BillingCity"));
			action.setActionAttr("BillingState",  this.parameters.get("BillingState"));
			action.setActionAttr("BillingPostalCode",  this.parameters.get("BillingPostalCode"));
			action.setActionAttr("BillingCountry",this.parameters.get("BillingCountry"));
			//shipping address
			//billing address			
			action.setActionAttr("ShippingName", this.parameters.get("ShippingName"));
			action.setActionAttr("ShippingAddress", this.parameters.get("ShippingAddress"));
			action.setActionAttr("ShippingCity", this.parameters.get("ShippingCity"));
			action.setActionAttr("ShippingState",  this.parameters.get("ShippingState"));
			action.setActionAttr("ShippingPostalCode",  this.parameters.get("ShippingPostalCode"));
			action.setActionAttr("ShippingCountry",this.parameters.get("ShippingCountry"));	
			for(var i=0; i< this.itemsList.length ;i++){
				var itemUpdate = this.itemsList[i];
				action.beginItem();
				action.setItemAttr("SKU", itemUpdate.get("SKU"));
				action.setItemAttr("ProductPrice", itemUpdate.get("ProductPrice"));
				action.setItemAttr("ProductCurrency", itemUpdate.get("ProductCurrency"));
				action.setItemAttr("ItemCount", itemUpdate.get("ItemCount"));
				action.endItem();
			}
			action.finalize(); 
		}
	}
	this.waitForNext = function() {
		//fake sleep
	}
	this.updateCartItems = function() {
		if(this.itemsList !=null && this.itemsList.length>0) {
			var action = TellApartCrumb.makeCrumbAction(gymboTellPart.mid, gymboTellPart.ACTION_TYPE.EVENT_TYPE_CART_ITEMS);
			action.setUserId(this.UserId);
			action.setActionAttr("UpdateCartType", 'Full');
			for(var i=0; i< this.itemsList.length ;i++){
				var cartItem = this.itemsList[i];
				action.beginItem();
				action.setItemAttr("SKU", cartItem.get("SKU"));
				action.setItemAttr("ProductPrice", cartItem.get("ProductPrice"));
				action.setItemAttr("ProductCurrency", cartItem.get("ProductCurrency"));
				action.setItemAttr("ItemCount", cartItem.get("ItemCount"));
				action.endItem();
			}
			action.finalize(); 
		}
		 
		if(this.itemsRemoveList !=null && this.itemsRemoveList.length>0){
			//setTimeout( this.waitForNext, 2000);
			var actionRemove = TellApartCrumb.makeCrumbAction(gymboTellPart.mid, gymboTellPart.ACTION_TYPE.EVENT_TYPE_CART_ITEMS);
			actionRemove.setUserId(this.parameters.get("UserId"));
			actionRemove.setActionAttr("UpdateCartType", 'PartialRemove');
			for(var i=0; i< this.itemsRemoveList.length ;i++){
				var itemRemove = this.itemsRemoveList[i];
				actionRemove.beginItem();
				actionRemove.setItemAttr("SKU", itemRemove.get("SKU"));
				actionRemove.setItemAttr("ProductPrice", itemRemove.get("ProductPrice"));
				actionRemove.setItemAttr("ProductCurrency", itemRemove.get("ProductCurrency"));
				actionRemove.setItemAttr("ItemCount", itemRemove.get("ItemCount"));
				actionRemove.endItem();
			}
			actionRemove.finalize(); 
		}
		if(this.itemsUpdateList !=null && this.itemsUpdateList.length>0){
			var actionUpdate = TellApartCrumb.makeCrumbAction(gymboTellPart.mid, gymboTellPart.ACTION_TYPE.EVENT_TYPE_CART_ITEMS);
			actionUpdate.setUserId(this.parameters.get("UserId"));
			actionUpdate.setActionAttr("UpdateCartType", 'PartialAdd');
			for(var i=0; i< this.itemsUpdateList.length ;i++){
				var itemUpdate = this.itemsUpdateList[i];
				actionUpdate.beginItem();
				actionUpdate.setItemAttr("SKU", itemUpdate.get("SKU"));
				actionUpdate.setItemAttr("ProductPrice", itemUpdate.get("ProductPrice"));
				actionUpdate.setItemAttr("ProductCurrency", itemUpdate.get("ProductCurrency"));
				actionUpdate.setItemAttr("ItemCount", itemUpdate.get("ItemCount"));
				actionUpdate.endItem();
			}
			actionUpdate.finalize(); 
		}
	}
	///// webtrk
	this.gymboWebTrkLoaded=false;
	this.gymboWebTrkDone=false;
	this.gymboWebTrkURL="";
	this.cartAbndnCallBack = null;
	this.brand="";
	this.UserIdCartWebTrk="";
	var me=this;
	this.gymboCartAbndn = function() {
		try {
			//if(this.gymboWebTrkLoaded && this.UserIdCartWebTrk !=null && this.UserIdCartWebTrk != "") {
			if(this.UserIdCartWebTrk !=null && this.UserIdCartWebTrk != "") {
				//todo:url escape the values
				var skuIds = new Array();
				var listSKU=",";
				var maxSkuIds = gymboWebTrack.maxSkuIds_trk;
				var enableDuplicateSkuIDs = gymboWebTrack.enableDuplicateSkuIDs_trk;
				if(this.itemsList !=null && this.itemsList.length>0) {
					for(var i=0; i< this.itemsList.length ;i++){
						if(maxSkuIds !=-1 && skuIds.length >= maxSkuIds){
							break;
						}
						var cartItem = this.itemsList[i];
						var sku = cartItem.get("SKU_ID");
						if(enableDuplicateSkuIDs) {
							skuIds.push(sku);
						} else if(listSKU.indexOf(sku+",") ==-1){
							skuIds.push(sku);
							listSKU += sku+",";
						}
					}
				}
				if(this.itemsUpdateList !=null && this.itemsUpdateList.length>0){
					for(var i=0; i< this.itemsUpdateList.length ;i++){
						if(maxSkuIds !=-1 && skuIds.length >= maxSkuIds){
							break;
						}
						var cartItem = this.itemsUpdateList[i];
						var sku = cartItem.get("SKU_ID");
						if(enableDuplicateSkuIDs){
							skuIds.push(sku);
						} else if(listSKU.indexOf(sku+",") ==-1){
							skuIds.push(sku);
							listSKU += sku+",";
						}
					}
				}
				var params="ti="+escape(this.trkid)+"&ca=" + this.subeventType + "&ui="+escape(this.UserIdCartWebTrk) + "&b="+this.brand ;
				var urldata=this.gymboWebTrkURL + "?"+params+"&cd="+escape(skuIds.join('|'));
				jQuery.getJSON(urldata+"&callback=?", function(resp) {
					this.gymboWebTrkDone=true;
					me.cartAbndnResp(resp);
				});
				 
			}//done if
		}catch(e){
		}
		
	}
	this.cartAbndnResp = function(resp) {
		try{
			me.gymboWebTrkDone=true;
		}catch(e){
		}
	}
	this.jQueryNoConflict = function() {
		if(typeof jQuery != 'undefined' && jQuery.fn && jQuery.fn.jquery ) { 
		  window.$j = jQuery.noConflict();
		}
	}
	this.loadJS = function (jqueryUrl, fnWebTrkCallBack, obj) {
		try {
			if(typeof jQuery != 'undefined' && jQuery.fn && jQuery.fn.jquery ) {  
				me.gymboWebTrkLoaded=true;
				fnWebTrkCallBack();
			} else {
				var a=document.createElement("script");
				a.setAttribute("type","text/javascript")
				a.setAttribute("src", jqueryUrl)	
				a.src=jqueryUrl;
				a.onload=function(){
					me.gymboWebTrkLoaded=true;
					me.jQueryNoConflict();	
					fnWebTrkCallBack();
				};
				a.onreadystatechange = function(){
					if(/loaded|complete/.test(a.readyState)) {
						me.gymboWebTrkLoaded=true;
						me.jQueryNoConflict();
						fnWebTrkCallBack();
					}
				};
				var s=document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(a, s)
			}
		}catch(e){
		}
	}


	this.loadTellApartJS = function (pgymboWebTrack, pCallback) {
		try {
			var b;
			var actionType = pgymboWebTrack.eventType;
			function d() {
				if(typeof pCallback == 'function'){
					pCallback();
				}    
			}
			if("https:" == document.location.protocol)
				b = "https://sslt.tellapart.com/crumb.js";
			else{
				for(var g= navigator.userAgent,h=0,e=0,i=g.length;e<i;e++)
					h ^= g.charCodeAt(e);
				b = "http://static.tellapart.com/crumb"+h%10+".js";
			}
			if(actionType === "tx") {
				__cmbRunnable=d;
				document.write("\x3Cscript type='text/java"+"script' src='"+b+"'\x3E\x3C/script\x3E");
				__cmbLoaded=true
			} else {
				var a=document.createElement("script");
				a.src=b;
				a.onload=function(){
					__cmbLoaded=true;
					d()
				};
				a.onreadystatechange = function(){
					if(/loaded|complete/.test(a.readyState)) {
						__cmbLoaded=true;
						d()
					}
				};
				var s=document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(a, s)
			}
		}catch(e){
		}
	}
}

function GymboHash(){
	var me = this;
	me.length = 0;
	me.paramAttrs = new Array();
 	me.remove = function(in_key){
		var tmp_previous;
		if (typeof(me.paramAttrs[in_key]) != 'undefined') {
			me.length--;
			var tmp_previous = me.paramAttrs[in_key];
			delete me.paramAttrs[in_key];
		}
		return tmp_previous;
	}
	me.get = function(in_key) {
		return me.paramAttrs[in_key];
	}
	me.set = function(in_key, in_value) {
		var tmp_previous;
		if (typeof(in_value) != 'undefined') {
			if (typeof(me.paramAttrs[in_key]) == 'undefined') {
				me.length++;
			}
			else {
				tmp_previous = me.paramAttrs[in_key];
			}

			me.paramAttrs[in_key] = in_value;
		}
	   
		return tmp_previous;
	}
	me.has = function(in_key)
	{
		return typeof(me.paramAttrs[in_key]) != 'undefined';
	}
	me.clear = function()
	{
		for (var i in me.paramAttrs) {
			delete me.paramAttrs[i];
		}

		me.length = 0;
	}
}
function addLoadEvent2(func) {
	 var oldonload = window.onload;
	 if (typeof window.onload != 'function') {
		 window.onload = func;
	 }else {
		 window.onload = function() {
			 oldonload();
			 func();
		 }
	 }
} 
//var dup_tellApartCallback_counter=0;
function tellApartCallback(){
	//call immediately
	//dup_tellApartCallback_counter++;
	if(typeof gymboWebTrack !='undefined'){
		gymboWebTrack.doAction();
	}   
}
function webTrkCallback(){
	try {
		if(typeof isWebTrkPageOnload !='undefined' && isWebTrkPageOnload==false ){
			webTrkCallbackonLoad();
			return;
		}
		if(typeof jQuery != 'undefined' && jQuery.fn && jQuery.fn.jquery ){  
			if (jQuery.isReady ) {
				webTrkCallbackonLoad();
				return;
			}  
			jQuery(document).ready(function () {
				// Do this immediately if DOM is loaded, or once it's loaded otherwise.
				webTrkCallbackonLoad();
			});
			return;
		}
		if(typeof jQuery == 'undefined') {
			addLoadEvent2(webTrkCallbackonLoad);
			return;
		} else {
			webTrkCallbackonLoad();
		}
	} catch(j){}
}

function webTrkCallbackonLoad(){
	try {
		gymboWebTrack.gymboCartAbndn();
	} catch(j){}
}
var gymboWebTrack = new GymboWebTrack();
 