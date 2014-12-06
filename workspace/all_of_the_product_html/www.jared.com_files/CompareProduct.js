//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2009 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

	/** 
	 * @fileOverview This file contains all the global variables and JavaScript functions needed by the compare product page and compare zone. 
	 * This JavaScript is used by CompareProductDisplay.jsp and CompareZoneDisplay.jspf files.
	 * @version 1.0
	 */

	/**
	 * @class The functions defined in the class are used for comparing the product's attributes. 
	 *
	 * This compareProductJS class defines all the variables and functions for the page that uses the compare functionality in the store.
	 * The compare zone in the right side bar is a place holder that accepts a maximum of 4 products to compare.
	 * The compare product display page compares the various product's attribute and displays the results side by side.
	 *
	 */
	compareProductJS={
		/* Global variables used in the CompareProductDisplay page */
		
		/** The compareCounter is an integer to store the number of items allowed in the compare page or the compare zone. */
		compareCounter:0,

		/** The compareCounter is an integer to store the number of items that needs to be displayed in a row in the compare zone. */
		compareRowCounter:0,

		/** The compareItemCatEntry is an object to store the catentry items. */
		compareItemCatEntry:new Object(),
		
		/** The langId is a string to store the current language identifier of the store. */
		langId: "-1",

		/** The storeId is a string to store the current store identifier of the store. */
		storeId: "",
		
		/** The storeId is a string to store the current store identifier of the store. */
		storeId2: "",

		/** The catalogId is a string to store the current catalog identifier of the store. */
		catalogId: "",

		/** The properties is an object to store the properties in the form of name/value pair. */
		properties: new Object(),

		/** The errorMessages is an object to store the error messages.*/
		errorMessages: new Object(),
		
			
		/**
		* This function sets the common parameters used in all service calls like langId, storeId and catalogId.
		* @param {string} langId the langugae identifier to use.
		* @param {string} storeId the store identifier to use.
		* @param {string} catalogId the catalog identifier to use.
		*/
		setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
		},

		/**
		* This function sets the error message value to the specified key.
		* @param {string} key the key to error message.
		* @param {string} value the error message.
		*/
		setErrorMessage : function(key, value){
			this.errorMessages[key] = value;
		},
		
		/**
		* This function gets the error message for the key provided.
		* @param {string} key the key to error message.
		* @return {string} value the error message.
		*/
		getErrorMessage : function(key){
			var value = this.errorMessages[key];
			if(value == null)
				value = "Could not get the message value for specified key " + key;
			
			return value;
		},

		/**
		* This function sets property value for given name in compareProductJS, this property can be used in other functions.
		* @param {string} name the name of the property.
		* @param {string} value value of the property.
		*/
		setProperty:function(name,value){
			this.properties[name]=value;
		},
		
		/**
		* This function returns property value for given property name.
		* @param {string} name the name of the property.
		* @return {string} value value of the property.
		*/
		getProperty:function(name){
			return this.properties[name];
		},
		
		/**
		* This function returns the storageKey. It is a combination of storageKey identifier and the sessionCode.
		* @return {string} storageKey value of storage key.
		*/		
		getStorageKey:function(){
		//	alert(this.storeId);
			if(this.storeId!=0){
				var storageKey = "CompareItems"+this.storeId ;
			} 
			else {
				var storageKey = "CompareItems10451";
			}
			
			var sessionId = this.getProperty("sessionId");
			var sessionCode = 0;
			storageKey = storageKey + sessionCode;
			return storageKey;
		},
		/**
		* This function returns the storageKey. It is a combination of storageKey identifier and the sessionCode.
		* @return {string} storageKey value of storage key.
		*/		
		getCatKey:function(){
			if(this.storeId!=0){
			var CatKey = this.catalogId;
			}
			
			var sessionId = this.getProperty("sessionId");
			var sessionCode = 0;
			catKey = catKey + sessionCode;
			return catKey;
		},		
  	/**
		* This function loads the storage key.
		* @param {string} key the storage key.
		*/
		load: function(key){
			if(key == null || typeof key == "undefined" || key == ""){
				alert("Please provide a key");
				return;
			}
			return this._load(key);
		},
	
		/**
		* This function loads the storage key and it's value.
		* @param {string} key the storage key.
		* @param {string} value value of the storage key.
		*/
		save: function(key, value){
			if(key == null || typeof key == "undefined" || key == ""){
				alert("Please provide a key");
				return;
			}
			
			if(value == null || typeof value == "undefined" || value == ""){
				alert("Please provide a key value");
				return;
			}
			this._save(key, value)
			
		},
		/**
		* This function unchecks the items in the compare zone.
		*/
		uncheckAll: function (field)
		{
		for (i = 0; i < field.length; i++)
			field[i].checked = false ;
		},
		/**
		* This function clears the items in the compare zone.
		*/
		clearAll: function(){
			var answer = confirm ("Are you sure you want to clear all the items in the Compare Zone?")
			if (answer){
				this.clear()
			}else{
				window.location="#";
			}
		},
		clear: function(){
			var result = this.load(this.getStorageKey());
			if(result != null){
				this.compareItemCatEntry = result;
			}
			if(document.getElementsByName("checkboxid")[0] != undefined) {
				for(catEntryIdentifier in this.compareItemCatEntry){	
					if(document.getElementById("check_"+catEntryIdentifier)!=null){
						document.getElementById("check_"+catEntryIdentifier).checked=false;		
						document.getElementsByName("checkboxid").checked=false;
					 }
				
					if(this.compareCounter!=0){
						//	MessageHelper.hideAndClearMessage(); 
					}
					if(this.currentProvider == "flash"){
						dojo.storage.clear();
					}else{  
						if(this.compareCounter > 0) {
							/* We'll be using cookies inplace of dojo.storage. */
							var storageKey=this.getStorageKey();
							dojo.cookie(storageKey,null,{path:'/'});
							this.initializeCompare();
							
						}
					//	MessageHelper.displayStatusMessage(MessageHelper.messages["COMPARE_ITEMS_CLEAR"]);
					}
				}
			} else {
				var storageKey=this.getStorageKey();
				dojo.cookie(storageKey,null,{path:'/'});
				for(catEntryIdentifier in this.compareItemCatEntry){	
					if(document.getElementById("check_"+catEntryIdentifier)!=null){
						document.getElementById("check_"+catEntryIdentifier).checked=false;		
					 }
				}
			}
			var message=[];
			message.actionId="AjaxCompareCollectorRemove";
			 //message.address1 = "Test";
			dojo.publish("modelChanged", [message]);
			
		},
		/**
		* This function removes the entry specified by the storage key from the cache.
		* @param {string} key the storage key.
		*/
		removecompare: function(key,isCompare,ispath){
			if(this.currentProvider == "flash"){
				dojo.storage.remove(key);
			}
			else{
				
			    //document.CompareForm.continueurl.value=ispath;
			    var storageKey= this.getStorageKey();
				var result = this.load(storageKey);
				if(result != null){
				this.compareItemCatEntry=result;
				}
				delete this.compareItemCatEntry[key];
				this.save(storageKey,this.compareItemCatEntry);
				this.compareProducts();
				} 
			
		},
		/**
		* This function removes the entry specified by the storage key from the cache.
		* @param {string} key the storage key.
		*/
		remove: function(key){
			if(this.currentProvider == "flash"){
				dojo.storage.remove(key);
			}
			else{
				
				var storageKey= this.getStorageKey();
				var result = this.load(storageKey);
				if(result != null){
				this.compareItemCatEntry=result;
				}
				delete this.compareItemCatEntry[key];
				this.save(storageKey,this.compareItemCatEntry);
				//This check if the compare item is deleted from category pages.
				if(document.getElementById("check_"+key) != undefined) {	
					this.initializeCompare();
					if(document.getElementById("check_"+key)!= null){
						document.getElementById("check_"+key).checked=false;
					}
				} else {
					this.compareCounter = 0;
					for(catEntryIdentifier in this.compareItemCatEntry){
						this.compareCounter++;
					}
				}
				var message=[];
				message.actionId="AjaxCompareCollectorRemove";
				 //message.address1 = "Test";
				dojo.publish("modelChanged", [message]);
			}
		},

		/**
		* This function saves the storage key and it's value.
		* @param {string} key the storage key.
		* @param {string} value value of the storage key.
		* @param {string} days atributes to cookie.
		* @param {string} path atributes to cookie.
		* @param {string} domain atributes to cookie. 
		* @param {string} secure atributes to cookie.
		* @param {string} clearCurrent atributes to cookie.
		*/
		_save: function(key, value, days, path, domain, secure, clearCurrent){
			
			if(this.currentProvider == "flash"){
				var self = this;
				var saveHandler = function(status, keyName){
					if(status == dojo.storage.FAILED){
						alert("You do not have permission to store data for this web site. "
							+ "Press the Configure button to grant permission.");
					}else if(status == dojo.storage.SUCCESS){
	
					}
				};
				try{
					dojo.storage.put(key, value, saveHandler);
				}catch(exp){
					alert(exp);
				}
			}
			else{
				/* We'll be using cookies inplace of dojo.storage. */
				value=dojo.toJson(value);
				//dojo.cookie(key, value, days, "/", domain, secure, clearCurrent);
				dojo.cookie(key, value, {path:'/'});
						
			}
		},
	
		/**
		* This function loads the storage key.
		* @param {string} key the storage key.
		*/
		_load: function(key){
		if(this.currentProvider == "flash"){
				var results = dojo.storage.get(key);
				return results;
			}
			else{
				/* We'll be using cookies inplace of dojo.storage. */
				var value = dojo.cookie(key);
				value = dojo.fromJson(value);
				return value;
			}
		},
		
		/**
		* This function initializes the compare zone and helps to displays the items in the compare zone.
		*/
		initializeCompare:function(){
				var storageKey = this.getStorageKey();
				this.compareCounter=0;
				this.compareItemCatEntry=new Object();
		
				/* Load the compare items from dojo.storage using 'CompareItems' key. */
				var result = this.load(storageKey);
				if(result != null){
					this.compareItemCatEntry = result;
				}
				
				/* Add the new items to the compare zone. */
				for(catEntryIdentifier in this.compareItemCatEntry){
					this.compareCounter++;
					if(document.getElementById("check_"+catEntryIdentifier)!= undefined){
						document.getElementById("check_"+catEntryIdentifier).checked=true;
					}
				}
				
		},
		
		/**
		* This function adds an item to the compare zone.
		* @param {string} catEntryIdentifier the CatEntryIdentifier of the item.
		* @param {string} dragImagePath the image path to display the image in the compare zone.
		* @param {string} url Item URL to display it's details.
		* @param {string} dragImageDescription dragImageDescription to display the description of the image in the compare zone.
		*/
		Add2CompareAjax:function(catEntryIdentifier, dragImagePath , url,dragImageDescription,continueurl){
			
		//	MessageHelper.hideAndClearMessage(); 
			var storageKey = this.getStorageKey(); 
			var ItemCount=null;
		//	var catkey = this.getCatKey();

			if(this.checked){this.checked=false;alert('You haven\'t finished something yet')};
			if(catEntryIdentifier in this.compareItemCatEntry || catEntryIdentifier == null){
				//MessageHelper.displayErrorMessage(MessageHelper.messages["COMPARE_ITEM_EXISTS"]);
			}else{ 
				this.compareCounter++;
				if (this.compareCounter <= 4) {
				    if(this.compareCounter==1){ItemCount = this.compareCounter;}
				
					if(document.getElementById("check_"+catEntryIdentifier)!=null){
						document.getElementById("check_"+catEntryIdentifier).checked=true;
				    }
					
			
					this.compareItemCatEntry[catEntryIdentifier] = catEntryIdentifier;
					this.save(storageKey, this.compareItemCatEntry, -1);
					var message=[];
					message.actionId="AjaxCompareCollector";
					message.catentryId = catEntryIdentifier;
					 //message.address1 = "Test";
					dojo.publish("modelChanged", [message]);
				//	MessageHelper.displayStatusMessage(MessageHelper.messages["COMPAREZONE_ADDED"]);
				} else {
					if(document.getElementById("check_"+catEntryIdentifier) != undefined)
							document.getElementById("check_"+catEntryIdentifier).checked=false;
					alert("You already have 4 items waiting to be compared. To add another item, you must first remove an item from your selection above.");
					//MessageHelper.displayErrorMessage(MessageHelper.messages["COMPATE_MAX_ITEMS"]);
				}
			}
		},
		/**
		* This function removes a product from the compare zone
		*/
		RemoveFromCompareAjax:function(catEntryIdentifier){
		//	MessageHelper.hideAndClearMessage();
			var storageKey = this.getStorageKey();
			alert("Remove from compare"+catEntryIdentifier);
			if(this.checked){this.checked=false;alert('You haven\'t finished something yet')};
			if(catEntryIdentifier in this.compareItemCatEntry || catEntryIdentifier == null){
				//MessageHelper.displayErrorMessage(MessageHelper.messages["COMPARE_ITEM_EXISTS"]);
				this.initializeCompare();
			}		
		},

		/**
		* This function calls the compare page that compares the products side-by-side.
		*/
		compareProducts:function(){
      	 
			/* Update the location to the compare product after deletion of the product from the compare products page. */
			var url = getAbsoluteURL() + "CompareProductsDisplay?storeId=" + this.storeId + "&catalogId=" + this.catalogId + "&langId=" + this.langId;
			document.location.href = url;
		},
		
		/**
		* This function initializes the compare zone as a dojo drop target and loads the product images for all the products in the compare zone during page load.
		*/
		init:function(){
				dojo.subscribe("/dnd/drop", function(source, nodes, copy, target){
				target.deleteSelectedNodes();
				var productDisplayPath="";
				var imgPath="";
				var imgDescription="";
				if(target.parent.id=='compareZone'){
	  			    var indexOfIdentifier = source.parent.id.indexOf("_",0);
	                if ( indexOfIdentifier >= 0) {
				        /* remove the prefix including the "underscore". */
					    source.parent.id = source.parent.id.substring(indexOfIdentifier+1);					
	                }
					if(document.getElementById("compareImgPath_"+source.parent.id)!=null && document.getElementById("compareImgPath_"+source.parent.id)!=undefined){
						imgPath = document.getElementById("compareImgPath_"+source.parent.id).value;
					}
					if(document.getElementById("compareProductDetailsPath_"+source.parent.id)!=null && document.getElementById("compareProductDetailsPath_"+source.parent.id)!=undefined){
						productDisplayPath=document.getElementById("compareProductDetailsPath_"+source.parent.id).value;
					}
					if(document.getElementById("compareImgDescription_"+source.parent.id)!=null && document.getElementById("compareImgDescription_"+source.parent.id)!=undefined){
						imgDescription = document.getElementById("compareImgDescription_"+source.parent.id).value;	
					}
					compareProductJS.Add2CompareAjax(source.parent.id,imgPath,productDisplayPath,imgDescription);
				}
			});
		}
	}	
	
