/***************MessageHelper.js starts*****************/
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2007, 2013 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 *@fileOverview This javascript file defines all the javascript functions used to display
 *and handle the information messages, error messages.
 */

if(typeof(MessageHelper) == "undefined" || !MessageHelper || !MessageHelper.topicNamespace){

/**
 * @class The MessageHelper class contains variables and functions that are used
 * to initialize, display and handle informational and error message.
 */
	MessageHelper = {
		/**A variable that contains all the messages to be displayed*/
		messages: {},
		
		/**
     * internal variable to keep track of the current element id that has
     * an error tooltip assigned to it */
		identifier: "",

    /**
     * returns the current year
     * @return (int) the current year
     */
		getCurrentYear: function(){
			return new Date().getFullYear();
		}, 

     /**
     * returns the current month. January is 1, and December is 12.
     * @return (int) the current month
     */
		getCurrentMonth: function(){
       return new Date().getMonth()+1;
		}, 

     /**
     * returns the current day of the current month, starting from 1.
     * @return (int) the current day
     */
		getCurrentDay: function(){
       return new Date().getDate();
		}, 

    /**
     *
     *summary: retrieves the value of the property from a render context
		 *description: This function retrieves the value of the property whose name is propertName
		 *from the given context.
     *
     * @param (wc.render.Content) content The context in which the properties
     * belong to.
     * @param (string) propertyName The property to be retrieved
		 * @return (string) null if the context is null. undefined if the property is not found.
		 * otherwise, the value of the property int he given context.
     */
		getRenderContextProperty : function(/*wc.render.Context*/context, /*String*/propertyName){
			
			console.debug("enter getRenderContextProperty with propertyName = "+propertyName);
			if(context == null){
				console.debug("context is null. Return null...");
				return null;
			}
			
			var result = context.properties[propertyName]
			console.debug("the found property value is: "+result);
			
			return result;	
		}, 
				
		/**
     * This function is used to initialize the messages object with all the 
     * required messages. It is used to setup a JS object with any key/value.
     * @param (string) key The key used to access this message.
     * @param (string) msg The message in the correct language.
     *
     */
		setMessage:function(key, msg) {
			this.messages[key] = msg;
		},

	
	
	/**
	 * Use dojo.fadeIn and dojo.fadeOut to display error and informative messages in the store.
	 * @param (int) topOffset how far from the top the message display area will be displayed. 
	 */
		showHideMessageArea:function(topOffset){
			cursor_clear();
			if (topOffset==null || topOffset==undefined) {
				topOffset = 0;
			}
			var node = dojo.byId("MessageArea");
			
			
			var fadeInAnimArgsArray = new Array();
			fadeInAnimArgsArray["node"] = node;
			fadeInAnimArgsArray["duration"] = 200;
			fadeInAnimArgsArray["delay"] = 0;
			
			var fadeOutAnimArgsArray = new Array();
			fadeOutAnimArgsArray["node"] = node;
			fadeOutAnimArgsArray["duration"] = 500;
			fadeOutAnimArgsArray["delay"] = 7000;
			fadeOutAnimArgsArray["onEnd"] = function(){
				dojo.style(node, "display", "none");
				if(dijit.byId("MessageArea_ACCE_Title") != null) {
					dijit.byId("MessageArea_ACCE_Title").style.display = "none";
				}
				dojo.style(node, "opacity", 100);
			};
			
			// set message area to alpha and then make it display block
			dojo.style(node, "opacity", 0);
			if(dijit.byId("MessageArea_ACCE_Title") != null) {
				dijit.byId("MessageArea_ACCE_Title").style.display = "block";
			}
			dojo.style(node, "display", "block");
			
			// fade in
			var fadeInAnim = dojo.fadeIn(fadeInAnimArgsArray);
			
			// fade out and when end the display set to none and opacity set to 100
			var fadeOutAnim = dojo.fadeOut(fadeOutAnimArgsArray);
			
			// sequence run fade in and out
			dojo.fx.chain([fadeInAnim, fadeOutAnim]).play();	

			// to provide shadow effect
			var messageNode = dojo.byId("msgpopup_content_wrapper");
			var shadowNode = new dojox.fx.Shadow({ node: messageNode });
			shadowNode.startup();
		},
	
	/**
	 * Use dojo.fadeOut to hide error and informative messages in the store.
	 */
		hideMessageArea:function(){
		/*	cursor_clear();
			var node = dojo.byId("MessageArea");
			var fadeOutAnimArgsArray = new Array();
			fadeOutAnimArgsArray["node"] = node;
			fadeOutAnimArgsArray["duration"] = 500;
			fadeOutAnimArgsArray["onEnd"] = function(){
				dojo.style(node, "display", "none");
				if(dijit.byId("MessageArea_ACCE_Title") != null) {
					dijit.byId("MessageArea_ACCE_Title").style.display = "none"
				}
				dojo.style(node, "opacity", 100);
			};
			dojo.fadeOut(fadeOutAnimArgsArray).play();
			dojo.byId('ErrorMessageText').innerHTML = "";*/
		},
		
    /**
     * This function is used to display the error messages to the user. 
     * @param (string) msg The error/information message to be displayed
     * @param (int) topOffset how far from the top the message display area will be displayed. 
     * @param (boolean) showType whether or not the message type should be appended to the actual message
     *
     * @return (element) a HTML element that contains the error message. 
     *
     */
		displayErrorMessage:function(msg, topOffset,showType){	
			/*if (topOffset==null || topOffset==undefined) {
				topOffset = 0;
			}
			
			if (showType == undefined || showType==null || showType==true){
				//if showType is undefined, keep the FEP1 behaviour.  
				if(this.messages["ERROR_MESSAGE_TYPE"]!=null && this.messages["ERROR_MESSAGE_TYPE"]!='undefined'){
					var MsgType = this.messages["ERROR_MESSAGE_TYPE"]; 
					msg = MsgType + msg;
				}				
			}
			
			
			//this.setMessageAreaStyle('error_icon');
			dojo.byId('ErrorMessageText').innerHTML = msg;
			//this.showHideMessageArea(topOffset);
			dojo.byId('clickableErrorMessageImg').focus();
			setTimeout(function() {if (dojo.byId('ErrorMessageText') != null) {dojo.byId('ErrorMessageText').focus();}}, 1000);*/

		},

	
	/**
	 * Sets the style for the message area on the page.
	 * @param (String) styleId The style Id.
	 */
		setMessageAreaStyle:function(styleId){
			//dojo.byId("success_icon").style.display="none";
			//dojo.byId("error_icon").style.display="none";
			if(dojo.byId(styleId) != null){dojo.byId(styleId).style.display="inline";}
		},
		
		
    /**
     * This function is used to display the informative messages to the user.
     * @param (string) msg The status message to be displayed.
     * @param (int) topOffset how far from the top of the browser the message will be displayed. 
     * @return (element) a HTML element that contains the status message.
     */
		displayStatusMessage:function(msg,topOffset){
			/*if (topOffset==null || topOffset==undefined) {
				topOffset = 0;
			}
			this.setMessageAreaStyle('success_icon');
			dojo.byId('ErrorMessageText').innerHTML = msg;
			this.showHideMessageArea(topOffset);
			dojo.byId('clickableErrorMessageImg').focus();
			setTimeout(function() {if (dojo.byId('ErrorMessageText') != null) {dojo.byId('ErrorMessageText').focus();}}, 1000);*/
		},

    /**
     * This function is used to hide and clear the message display area in
     * the page.
     */
		hideAndClearMessage:function(){
			/*dojo.byId('ErrorMessageText').innerHTML = "";
			dojo.byId('MessageArea').style.display = "none";*/
		},
	
	/**
	 * This function is used to re-adjust the coordinates of the message display area on the page. Its location is relative to the "page" element.
	 * @param (int) topOffset how far from the top the message display area will be displayed. 
	 */
		adjustCoordinates:function(topOffset){
			if(dojo.style("MessageArea", "display") != "none"){
				var page = dojo.byId("page");
				var node = dojo.byId("MessageArea");
				if(page != null && node != null){
					var coords = dojo.coords(page, true);
					var width = coords.w;
					if(dojo.isSafari){
						width = dojo.style('page', 'width');
					}
					
					if (topOffset==null || topOffset==undefined) {
						topOffset = 0;
					}
					
					dojo.style(node, {
						"width": width + 20+ "px",
						"left": coords.x - 10 + "px",
						"top": (coords.y + topOffset) + "px"
					});
				}
			}
		},

    /**
     * This function will show the an error message tooltip
     * around the input field with the problem.
     *
     * The function assumes the "serviceResponse" is the
     * JSON object from a WebSphere Commerce exception. The error
     * field is in the serviceResponse.errorMessageParam and the
     * error message is in the serviceResponse.errorMessage.
     *
     * @see MessageHelper.formErrorHandleClient
     * @param (object) serviceResponse The JSON object with the error data.
     * @param (string) formName The name of the form where the error field is.
     * 
     */
		formErrorHandle:function(serviceResponse,formName){

			this.formErrorHandleClient(serviceResponse.errorMessageParam, serviceResponse.errorMessage);

	  	},


		/**
     * This function will show the an error message tooltip
     * around the input field with the problem.
     *
     * This function will check for the emptiness of the required
     * filed and displays the "errorMessage" related to that field as a tooltip.
     * The tooltip will be closed on focus lost.
     *
     * @param (string) id The identifier for the filed in the form.
     * @param (string) errorMessage The message that should be displayed to the user.
     */
		formErrorHandleClient:function(id,errorMessage){
			
			var element = dojo.byId(id);
			if (errorMessage == null){	
				console.debug("formErrorHandleClient: The error message is null.");
				return;
			}
			if(element){
				if (this.identifier != (id + "_tooltip")) {
					this.identifier = id + "_tooltip";
					var node = document.createElement('span');
					var imgDirPath = getImageDirectoryPath();
					if(dojo.isIE < 7)
					{
						node.innerHTML = errorMessage + "<iframe id='errorMessageIFrame' scrolling='no' frameborder='0' src='" + imgDirPath + "images/empty.gif'></iframe>";
					}
					else
					{
						node.innerHTML = errorMessage;
					}											
					var tooltip = new dijit.Tooltip({connectId: [id]}, node);
					tooltip.startup();
					console.log("created", tooltip, tooltip.id);
					element.focus();
					var err_container = document.createElement('div');
					err_container.setAttribute('class', 'spanacce');
					err_container.setAttribute('role', 'alert');
					err_container.setAttribute('id', 'alert');
					var err_msg = document.createTextNode(errorMessage);
					err_container.appendChild(err_msg);
					document.body.appendChild(err_container);
					element.setAttribute('aria-invalid', 'true');
					
					tooltip.open(element); // force to have this for IE if the error is on a link (i.e. <a>)
					dojo.connect(element, "onblur",  tooltip, "close"); // force to have this for IE if the error is on a link (i.e. <a>)
					dojo.connect(element, "onblur",  tooltip, "destroy");
					dojo.connect(element, "onblur",  this, "clearCurrentIdentifier");
					/* Tooltip widget connects onmouseover event of the above element to _onMouseOver function. 
					When tooltip is associated with the dropdown select box, tooltip will be displayed initially next to the 
					select box. But when user expands the dropdown box and moves the mouse over the options in the select box,
					onmouseover event will be triggered which calls _onMouserOver function.._onMouseOver function will display the tooltip
					again next to the cursor. So when user keeps moving the mouse over the options in select box
					the tooltip widget also moves along with the cursor. To avoid this override _onMouseOver function
					with empty implementation. 
					*/
					tooltip._onMouseOver = this.emptyFunc;
				}
			}
		},


		/**
     * This function clears the internal variable that has the element id
     * with the error tooltip.
     * 
     */
		clearCurrentIdentifier:function(){
		
			this.identifier = "";
	  },

     /**
      * This function is used to override any of the default functions
      * associated with the events. Ex: Tooltip widget tracks onMouseOver event
      * and display the tooltip. To remove this association,
      * tooltip widgets onMouseOver function will be overridden by this empty
      * function.
      * 
      * It is an empty implementation which does nothing.
      *
      * @param (string) event  The event which triggers this function. 
      */
	  emptyFunc:function(event){
		 
	  },



    /**
     * Checks whether a string contains a double byte character.
     *
     * @param (string) target the string to be checked
     * @return (boolean) true if target contains a double byte char;
     * false otherwise
     */
		containsDoubleByte:function (target) {
		
				var str = new String(target);
				var oneByteMax = 0x007F;

				for (var i=0; i < str.length; i++){
					chr = str.charCodeAt(i);
					if (chr > oneByteMax) {
						return true;
					}
				}
				return false;
		},

    /**
     * This function validate email address. It does not allow double byte
     * characters in the email address.
     *
     * @return (boolean) true if the email address is valid; false otherwise
     *
     * @param (string) strEmail the email address string to be validated
     */
		isValidEmail:function(strEmail){
			
			if (this.containsDoubleByte(strEmail)){
				return false;
			}
		
			if(strEmail.length == 0) {
				return true;
			} else if (strEmail.length < 5) {
					 return false;
				}else{
					if (strEmail.indexOf(" ") > 0){
								return false;
						}else{
							if (strEmail.indexOf("@") < 1) {
										return false;
								}else{
									if (strEmail.lastIndexOf(".") < (strEmail.indexOf("@") + 2)){
												return false;
										}else{
												if (strEmail.lastIndexOf(".") >= strEmail.length-2){
													return false;
												}
										}
								}
						}
				}
				return true;
		},

		/**
     * This function will check if the number of bytes of the string
     * is within the maxlength specified.
     *
     * @param (string) UTF16String the UTF-16 string
     * @param (int) maxlength the maximum number of bytes allowed in your input
     *
     * @return (boolean) false is this input string is larger than maxlength
		 */
		isValidUTF8length: function(UTF16String, maxlength) {
			if (this.utf8StringByteLength(UTF16String) > maxlength) return false;
			else return true;
		},

    /**
     * This function will count the number of bytes represented in a UTF-8
     * string.
     *
     * @param (string) UTF16String the UTF-16 string you want a byte count of
     * @return (int) the integer number of bytes represented in a UTF-8 string
     */
		utf8StringByteLength: function(UTF16String) {

			if (UTF16String === null) return 0;
			
			var str = String(UTF16String);
			var oneByteMax = 0x007F;
			var twoByteMax = 0x07FF;
			var byteSize = str.length;
			
			for (i = 0; i < str.length; i++) {
				chr = str.charCodeAt(i);
				if (chr > oneByteMax) byteSize = byteSize + 1;
				if (chr > twoByteMax) byteSize = byteSize + 1;
			}  
			return byteSize;
		},

    /**
     * this function will check whether the text is a numeric or not.
     * 
     * @param allowDot is a boolean wich specifies whether to consider
     * the '.' or not.
     *
     * @return (boolean) true if text is numeric
     */
		IsNumeric : function (text,allowDot)
		{
			if(allowDot) var ValidChars = "0123456789.";
			else var ValidChars = "0123456789";
		  
			var IsNumber=true;
			var Char;

		 
			for (i = 0; i < text.length && IsNumber == true; i++) 
			{ 
				Char = text.charAt(i); 
				if (ValidChars.indexOf(Char) == -1) 
				{
					IsNumber = false;
				}
			}
			return IsNumber;   
		},

    /**
     *
     *This function will check for a valid Phone Number
     *
     *@param (string) text The string to check
     *
     *@return (boolean) true if text is a phone number, ie if each character of
     *input is one of 0123456789() -+ 
     */
		IsValidPhone : function (text)
		{
		
			var ValidChars = "0123456789()-+ ";
		  
			var IsValid=true;
			var Char;
		 
			for (i = 0; i < text.length && IsValid == true; i++) 
			{ 
				Char = text.charAt(i); 
				if (ValidChars.indexOf(Char) == -1) 
				{
					IsValid = false;
				}
			}
			return IsValid;   
		}
	}
}

/***************MessageHelper.js ends*****************/

/***************Search.js starts*****************/
//Licensed Materials - Property of IBM

//WebSphere Commerce

//(C) Copyright IBM Corp. 2013 All Rights Reserved.

//US Government Users Restricted Rights - Use, duplication or
//disclosure restricted by GSA ADP Schedule Contract with
//IBM Corp.
//-----------------------------------------------------------------

if(typeof(SearchJS) == "undefined" || SearchJS == null || !SearchJS){

	SearchJS = { 

			/** 
			 * This variable controls the timer handler before triggering the autoSuggest.  If the user types fast, intermittent requests will be cancelled.
			 * The value is initialized to -1.
			 */
			autoSuggestTimer: -1,

			/** 
			 * This variable controls the delay of the timer in milliseconds between the keystrokes before firing the search request.
			 * The value is initialized to 400.
			 */
			autoSuggestKeystrokeDelay : 400,

			/** 
			 * This variable indicates whether or not the user is hovering over the autoSuggest results popup display.
			 * The value is initialized to false.
			 */
			autoSuggestHover : false,

			/** 
			 * This variable stores the old search term used in the auto suggest search box
			 * The value is initialized to empty string.
			 */
			autoSuggestPreviousTerm : "",

			/** 
			 * This variable stores the URL of currently selected static autosuggest recommendation
			 * The value is initialized to empty string.
			 */
			autoSuggestURL : "",

			/** 
			 * This variable stores the index of the selected auto suggestion item when using up/down arrow keys.
			 * The value is initialized to -1.
			 */
			autoSelectOption : -1,

			/** 
			 * This variable stores the index offset of the first previous history term
			 * The value is initialized to -1.
			 */
			historyIndex : -1,

			/** 
			 * This variable indicates whether a the cached suggestions have been retrieved.
			 * The value is initialized to false.
			 */
			retrievedCachedSuggestions : false,

			/** 
			 * This variable sets the total number of static autosuggest recommendations used for each static category/grouping.
			 * The value is initialized to 4.
			 */
			TOTAL_SUGGESTED : 4,

			/** 
			 * This variable sets the total number of previous search history terms.
			 * The value is initialized to 2.
			 */
			TOTAL_HISTORY : 2,

			/** 
			 * This variable controls when to trigger the auto suggest box.  The number of characters greater than this threshold will trigger the auto suggest functionality.
			 * The static/cached auto suggest will be performed if this threshold is exceeded.
			 * The value is initialized to 1.
			 */
			AUTOSUGGEST_THRESHOLD : 1,

			/** 
			 * This variable controls when to trigger the dynamic auto suggest.  The number of characters greater than this threshold will trigger the request for keyword search.
			 * The static/cached auto suggest will be be displayed if the characters exceed the above config parameter, but exceeding this threshold will additionally perform the dynamic search to add to the results in the static/cached results.
			 * This value should be greater or equal than the AUTOSUGGEST_THRESHOLD, as the dynamic autosuggest is secondary to the static/cached auto suggest.
			 * The value is initialized to 1.
			 */
			DYNAMIC_AUTOSUGGEST_THRESHOLD : 1,

			/** 
			 * This variable is an internal constant used in the element ID's generated in the autosuggest content.
			 * The value is initialized to 1000.
			 */
			CACHED_AUTOSUGGEST_OFFSET : 1000,

			/** 
			 * This variable is used to indicate whether or not the auto suggest selection has reached the end of the list.
			 * The value is initialized to false.
			 */
			END_OF_LIST : false,

			/**
			 * The auto suggest container ID's
			 */
			//STATIC_CONTENT_SECTION_DIV: ["autoSuggestStatic_1", "autoSuggestStatic_2", "autoSuggestStatic_3"],

			/**
			 * NLS message for header
			 */
			staticContentHeaderHistory:"",

			/**
			 * URL to retrieve Cached suggestions
			 */
			CachedSuggestionsURL:"",

			/**
			 * URL to retrieve auto suggest keywords
			 */
			SearchAutoSuggestServletURL:"",

			/**
			 * Timeout variable for department dropdown list
			 */
			searchDepartmentHoverTimeout:"",

			/**
			 * Timeout variable for suggestions dropdown list
			 */
			searchSuggestionHoverTimeout:"",

			searchDepartmentSelect: function(categoryId, lel){
		$dojo('searchDepartmentLabel').innerHTML=lel.innerHTML;
		$dojo('search_categoryId').value = categoryId;
		this.hideSearchDepartmentList();
		return false;
	},

	cancelEvent: function(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.cancelBubble = true;
		e.cancel = true;
		e.returnValue = false;
	},

	searchDepartmentKeyPressed: function(event, pos, size, categoryId, item){
		if (event.keyCode == 13) { // enter
			this.searchDepartmentSelect(categoryId, item);
			dojo.byId('searchBox').focus();
		} else if (event.keyCode == 38) { // up arrow
			if (pos != 0) {
				dojo.byId('searchDepartmentList_' + (pos - 1)).focus();
				this.cancelEvent(event);
			}
		} else if (event.keyCode == 40) { // down arrow
			if (pos != size) {
				dojo.byId('searchDepartmentList_' + (pos + 1)).focus();
				this.cancelEvent(event);
			}
		} else if (event.keyCode == 27) { // escape
			dojo.byId('searchBox').focus();
			this.hideSearchDepartmentList();
		} else if (event.shiftKey && event.keyCode == 9) { // tab
			dojo.byId('searchBox').focus();
			this.cancelEvent(event);
			this.hideSearchDepartmentList();
		} else if (event.keyCode == 9) { // tab
			dojo.byId('search_submit').focus();
			this.cancelEvent(event);
			this.hideSearchDepartmentList();			
		}

		return false;
	},

	hideSearchDepartmentList: function(){
		$dojo('searchDepartmentList').style.display="none";
	},

	init:function(){
		dojo.connect(dojo.byId("searchBox"), "onfocus", SearchJS, SearchJS._onFocus);
		dojo.connect(dojo.byId("searchBox"), "onblur", SearchJS, SearchJS._onBlur);
		dojo.connect(dojo.byId("searchBox"), "onkeyup", SearchJS, SearchJS._onKeyUp);

		dojo.connect(dojo.byId("search_submit"), "onclick", SearchJS, SearchJS._onClick);

		this.staticContentHeaderHistory = storeNLS["HISTORY"];
	},

	setCachedSuggestionsURL:function(url){
		this.CachedSuggestionsURL = getAbsoluteURL() + url;
	},

	setAutoSuggestURL:function(url){
		this.SearchAutoSuggestServletURL = getAbsoluteURL() + url;
	},

	_onFocus:function(evt){
/*

		if(document.searchHP.searchTerm != null){
			if(document.searchHP.searchTerm.value == '') {
				document.getElementById('search_submit').disabled=true;

			}}

		this.retrieveCachedSuggestions(); 
		this.clearSearchField();
*/
	},

	_onBlur:function(evt){

/*
		if(document.searchHP.searchTerm != null) {
			if(document.searchHP.searchTerm.value == '') {
				document.getElementById('search_submit').disabled=true;

			} }



		this.fillSearchField();
		clearTimeout(this.searchSuggestionHoverTimeout);
		this.searchSuggestionHoverTimeout = setTimeout("SearchJS.showAutoSuggest(false)",100);


*/

	},

	_onKeyUp:function(evt){
		return evt.keyCode != dojo.keys.ENTER;

	},

	_onKeyPress:function(evt){
		document.getElementById('search_submit').disabled=false;

		if(document.searchHP.searchTerm.value.length == '') {
			document.getElementById('search_submit').disabled=true;

		}

		this.doAutoSuggest(evt, this.SearchAutoSuggestServletURL, dojo.byId("searchBox").value);
		
	},

	_handleEnterKey:function() {
		if(document.searchHP.searchTerm.value.length > 0) {

			document.getElementById('search_submit').disabled=false;

			if(this.END_OF_LIST) {
				this.gotoAdvancedSearch($dojo("advancedSearch").href);
			}
			else if(this.autoSuggestURL != "") {
				//When enter key is hit with one of the suggested keywords or results highlighted, then go to the URL specified for that result..
				// go to suggested URL
				document.location.href = this.autoSuggestURL;
			}
			else {
				//Enter key is hit, when the focus was in search term input box.. Submit the form and get the results..
				document.searchHP.searchTerm.value = trim(document.searchHP.searchTerm.value);
				submitSpecifiedForm(document.searchHP);
			}
		}else if(document.searchHP.searchTerm.value == '') {
			document.getElementById('search_submit').disabled=true;

		}
	},

	_onClick:function(evt){
		/*
		if(document.searchHP.searchTerm != null) {
			document.searchHP.searchTerm.value = trim(document.searchHP.searchTerm.value); 
		}
		if(document.searchHP.searchTerm != null) {
			if(document.searchHP.searchTerm.value.length > 0) {
				document.getElementById('search_submit').disabled=false;
				if(typeof TealeafWCJS != "undefined"){
					TealeafWCJS.processDOMEvent(evt);
				}
				submitSpecifiedForm(document.searchHP);
			}
			else if(document.searchHP.searchTerm.value == '') {
				document.getElementById('search_submit').disabled=true;
				
				}
		}
		if(document.searchHP.searchTerm != null) {		
			if(document.searchHP.searchTerm.value == '') {
				document.getElementById('search_submit').disabled=true;

			}
		}
		if( document.getElementById('search_submit') != null)
		{
			document.getElementById('search_submit').disabled=true;
		}
		return false;
		*/
	},

	doDynamicAutoSuggest:function(url, searchTerm, showHeader) {		
		// if pending autosuggest triggered, cancel it.
		if(this.autoSuggestTimer != -1) {
			clearTimeout(this.autoSuggestTimer);
			this.autoSuggestTimer = -1;
		};

		// call the auto suggest
		this.autoSuggestTimer = setTimeout(function() {
			wc.render.getRefreshControllerById("AutoSuggestDisplayController").url = url + "&term=" + encodeURIComponent(searchTerm) + "&showHeader=" + showHeader;
			wc.render.updateContext("AutoSuggest_Context", {});
			this.autoSuggestTimer = -1;
		}, this.autoSuggestKeystrokeDelay);
	},

	gotoAdvancedSearch:function(url) {
		var searchTerm = $dojo("searchBox").value;
		document.location.href = url + '&searchTerm=' + searchTerm;

	},


	showAutoSuggest:function(display) {
		var autoSuggest_Result_div = document.getElementById("autoSuggest_Result_div");
		if (dojo.isIE < 7){
			var autoSuggest_content_div = document.getElementById("autoSuggest_content_div");
			var autoSuggestDropDownIFrame = document.getElementById("autoSuggestDropDownIFrame");
		}

		if(autoSuggest_Result_div != null && autoSuggest_Result_div != 'undefined') {
			if(display) {
				autoSuggest_Result_div.style.display = "block";
				if (dojo.isIE < 7) {
					autoSuggestDropDownIFrame.style.height = autoSuggest_content_div.scrollHeight;
					autoSuggestDropDownIFrame.style.display = "block";
				}
			}
			else {
				if (dojo.isIE < 7) {
					autoSuggestDropDownIFrame.style.display = "none";
					autoSuggestDropDownIFrame.style.height = 0;
				}
				autoSuggest_Result_div.style.display = "none";
			}
		}
	},

	showAutoSuggestIfResults:function() {
		// if no results, hide the autosuggest box
		if(typeof(staticContent) != "undefined" && document.getElementById("autoSuggestHistory").innerHTML == "" && document.getElementById("dynamicAutoSuggestTotalResults") == null) {
			this.showAutoSuggest(false);
		}
		else if(document.getElementById("searchBox").value.length <= this.AUTOSUGGEST_THRESHOLD) {
			this.showAutoSuggest(false);
		}
		else {
			this.showAutoSuggest(true);
		}
	},

	selectAutoSuggest:function(term) {
		var searchBox = document.getElementById("searchBox");
		searchBox.value = term;
		searchBox.focus();
		this.autoSuggestPreviousTerm = term;
		if(typeof TealeafWCJS != "undefined"){
			TealeafWCJS.createExplicitChangeEvent(searchBox);
		}
		submitSpecifiedForm(document.searchHP);
	},

	highLightSelection:function(state, index) {
		var selection = document.getElementById("autoSelectOption_" + index);
		if(selection != null && selection != 'undefined') {

			if(state) {
				selection.className = "autoSuggestSelected";
				var searchBox = document.getElementById("searchBox");
				searchBox.setAttribute("aria-activedescendant", "suggestionItem_" + index);
				var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
				if((totalDynamicResults != null && totalDynamicResults != 'undefined' && index < totalDynamicResults.value) || (index >= this.historyIndex)) {
					searchBox.value = selection.title;
					this.autoSuggestPreviousTerm = selection.title;
					this.autoSuggestURL = "";
				}
				else {
					this.autoSuggestURL = selection.href;
				}
			}
			else {
				selection.className = "";
			}
			return true;
		}
		else {
			return false;
		}
	},

	enableAutoSelect:function(index) {
		this.highLightSelection(false, this.autoSelectOption);
		var item = document.getElementById('autoSelectOption_' + index);
		item.className = "autoSuggestSelected";
		this.autoSelectOption = index;
	},

	resetAutoSuggestKeyword:function() {
		var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
		if(originalKeyedSearchTerm != null && originalKeyedSearchTerm != 'undefined') {
			var searchBox = document.getElementById("searchBox");
			searchBox.value = originalKeyedSearchTerm.value;
			this.autoSuggestPreviousTerm = originalKeyedSearchTerm.value;
		}
	},

	clearAutoSuggestResults:function() {
		// clear the static search results.

		this.autoSuggestPreviousTerm = "";
		this.autoSuggestURL = "";
		// clear the dynamic search results;
		document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
		this.showAutoSuggest(false);
	},

	doAutoSuggest:function(event, url, searchTerm) {
		if(searchTerm.length <= this.AUTOSUGGEST_THRESHOLD ) {
			this.showAutoSuggest(false);
		}

		if(event.keyCode == dojo.keys.ENTER) {
			this._handleEnterKey();
			return;
		}

		if(event.keyCode == dojo.keys.TAB) {
			this.autoSuggestHover = true;
			return;
		}

		if(event.keyCode == dojo.keys.ESCAPE) {
			this.showAutoSuggest(false);
			return;
		}

		if(event.keyCode == dojo.keys.UP_ARROW) {
			var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
			if(this.END_OF_LIST) {
				dojo.removeClass("autoSuggestAdvancedSearch", "autoSuggestSelected");
				this.END_OF_LIST = false;
				this.autoSelectOption--;
				if(!this.highLightSelection(true, this.autoSelectOption)) {
					if(this.autoSelectOption == this.CACHED_AUTOSUGGEST_OFFSET && totalDynamicResults != null && totalDynamicResults != 'undefined') {	
						this.autoSelectOption = totalDynamicResults.value-1;
						this.highLightSelection(true, this.autoSelectOption);
					}
				}
			}
			else if (this.highLightSelection(true, this.autoSelectOption-1)) {
				this.highLightSelection(false, this.autoSelectOption);
				if(this.autoSelectOption == this.historyIndex) {
					this.resetAutoSuggestKeyword();
				} 
				this.autoSelectOption--;
			}
			else if(this.autoSelectOption == this.CACHED_AUTOSUGGEST_OFFSET && totalDynamicResults != null && totalDynamicResults != 'undefined') {
				this.highLightSelection(false, this.CACHED_AUTOSUGGEST_OFFSET);		
				this.autoSelectOption = totalDynamicResults.value-1;
				this.highLightSelection(true, this.autoSelectOption);
			}
			else {
				// up arrow back to the very top
				this.highLightSelection(false, this.autoSelectOption);
				this.autoSelectOption = -1;
				var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
				this.resetAutoSuggestKeyword();
			}
			return;
		}

		if(event.keyCode == dojo.keys.DOWN_ARROW) {
			if(this.highLightSelection(true, this.autoSelectOption+1)) {
				this.highLightSelection(false, this.autoSelectOption);
				this.autoSelectOption++;
			}
			else if(this.autoSelectOption < this.CACHED_AUTOSUGGEST_OFFSET && this.highLightSelection(true, this.CACHED_AUTOSUGGEST_OFFSET)) {
				// down arrow into the cached autosuggest section
				this.highLightSelection(false, this.autoSelectOption);
				this.autoSelectOption = this.CACHED_AUTOSUGGEST_OFFSET;
				this.resetAutoSuggestKeyword();
			}
			else if(!this.END_OF_LIST) {
				dojo.addClass("autoSuggestAdvancedSearch", "autoSuggestSelected");
				this.highLightSelection(false, this.autoSelectOption);
				this.autoSelectOption++;
				this.END_OF_LIST = true;
				var searchBox = document.getElementById("searchBox");
				searchBox.setAttribute("aria-activedescendant", "advancedSearch");
			}
			return;
		}

		if(searchTerm.length > this.AUTOSUGGEST_THRESHOLD && searchTerm == this.autoSuggestPreviousTerm) {
			return;
		}
		else {
			this.autoSuggestPreviousTerm = searchTerm;
		}

		if(searchTerm.length <= this.AUTOSUGGEST_THRESHOLD) {
			return;
		};

		// cancel the dynamic search if one is pending
		if(this.autoSuggestTimer != -1) {
			clearTimeout(this.autoSuggestTimer);
			this.autoSuggestTimer = -1;
		}

		if(searchTerm != "") {
			document.getElementById('search_submit').disabled=false;
			this.autoSelectOption = -1;
			var hasResults = this.doStaticAutoSuggest(searchTerm);
			if(searchTerm.length > this.DYNAMIC_AUTOSUGGEST_THRESHOLD) {
				var showHeader = true; // hasResults;
				this.doDynamicAutoSuggest(url, searchTerm, showHeader);
			}
			else {
				// clear the dynamic results
				document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
			}
		}
		else {
			document.getElementById('search_submit').disabled=true;
			this.clearAutoSuggestResults();
		}
	},

	tokenizeForBidi:function(displayName, searchName, searchTerm, searchTermLower) {
		var tokens = displayName.split( " > " );
		var html = "";
		var str = "";

		for(i = 0; i < tokens.length; i++) {
			if(i!=0) {
				// not the first token
				html = html + "<div class='category_list'><span class='gt'>&nbsp;>&nbsp;</span></div>";
			}
			if(i == tokens.length - 1) {
				// last token
				var index = searchName.toLowerCase().indexOf(searchTermLower);
				var subStringBefore = searchName.substr(0, index);
				var subStringAfter =  searchName.substr(index + searchTerm.length);

				var highLighted = "<span class='highlight'>" + searchTerm + "</span>";
				str = subStringBefore + highLighted + subStringAfter;
			}
			else {
				str = tokens[i];
			}

			html = html + "<div class='category_list'>" + str + "</div>";
		}
		return html;
	},

	doStaticAutoSuggest:function(searchTerm) {
		var resultList = ["", "", "", "", "", ""];
		var emptyCell = 0;
		var searchTermLower = searchTerm.toLowerCase();
		var listCount = this.CACHED_AUTOSUGGEST_OFFSET;

		var divStart = "<ul class='suggestedKeywordLinks'";
		var divEnd =   "</ul>";

		if(typeof(staticContent) != "undefined") {
			for(var i = 0; i < staticContent.length; i++) {
				var count = 0;

				for(var j = 0; j < staticContent[i].length; j++) {
					var searchName = staticContent[i][j][0];
					var searchURL = staticContent[i][j][1];
					var displayName = staticContent[i][j][2];
					var index = searchName.toLowerCase().indexOf(searchTermLower);
					if(index != -1) {
						var htmlDisplayName = this.tokenizeForBidi(displayName, searchName, searchTerm, searchTermLower)

						resultList[i] = resultList[i] + "<li id='suggestionItem_" + listCount + "' role='listitem' tabindex='-1'><a id='autoSelectOption_" + listCount + "' title='" + searchName + "' onmouseout='this.className=\"\"; this.autoSuggestURL=\"\";' onmouseover='SearchJS.enableAutoSelect(" + listCount + "); this.autoSuggestURL=this.href;' href=\"" + searchURL + "\">" + htmlDisplayName + "</a></li>";
						count++;
						listCount++;
						if(count >= this.TOTAL_SUGGESTED) {
							break;
						}
					}
				}
			}
		}
		if(typeof(staticContent) != "undefined") {
			for (var i = 0; i < staticContent.length; i++) {

				//document.getElementById(this.STATIC_CONTENT_SECTION_DIV[i]).innerHTML = "";
				/*(if(resultList[i] != "") {

					var heading =  "<h2>" + staticContentHeaders[i] + "</h2>"
					document.getElementById(this.STATIC_CONTENT_SECTION_DIV[emptyCell]).innerHTML =  heading + divStart + " role='list' title='" + staticContentHeaders[i] + "' aria-label='" + staticContentHeaders[i] + "'>" + resultList[i] + divEnd;
					emptyCell++;
				}*/
			}
		}
		if(typeof(document.getElementById("autoSuggestHistory")) != "undefined") {
			var historyList = "";
			var searchHistorySection = document.getElementById("autoSuggestHistory");
			if(searchHistorySection != null) {
				searchHistorySection.innerHTML = "";
			}
			var historyArray = new Array();
			this.historyIndex = listCount;

			var searchHistoryCookie = getCookie("searchTermHistory");
			if(typeof(searchHistoryCookie) != 'undefined') {
				var termsArray = searchHistoryCookie.split("|");
				var count = 0;
				for(var i = termsArray.length - 1; i > 0; i--) {
					var theTerm = termsArray[i];
					var theLowerTerm = theTerm.toLowerCase();
					if(theLowerTerm.match("^"+searchTermLower) == searchTermLower) {
						var repeatedTerm = false;
						for(var j = 0; j < historyArray.length; j++) {
							if(historyArray[j] == theLowerTerm) {
								repeatedTerm = true;
								break;
							}

						}
						if(!repeatedTerm) {
							historyList = historyList + "<li id='suggestionItem_" + listCount + "' role='listitem' tabindex='-1'><a href='#' onmouseout='this.className=\"\"' onmouseover='SearchJS.enableAutoSelect(" + listCount + ");' onclick='SearchJS.selectAutoSuggest(this.title); return false;' title=\"" + theTerm + "\" id='autoSelectOption_" + listCount+ "'><strong>" + searchTerm + "</strong>" + theTerm.substring(searchTerm.length, theTerm.length) + "</a></li>";
							historyArray.push(theLowerTerm);
							count++;
							listCount++;
							if(count >= this.TOTAL_HISTORY) {
								break;
							}
						}
					}
				}
			}


			if(historyList != "") {

				var heading =  "<h2>" + this.staticContentHeaderHistory + "</h2>"
				searchHistorySection.innerHTML = heading + divStart + " title='" + this.staticContentHeaderHistory + "'>" + historyList + divEnd;
				emptyCell++;
			}

			if(emptyCell > 0) {
				this.showAutoSuggest(true);
				return true;
			}
		}
		return false;
	},

	retrieveCachedSuggestions:function() {
		if(!this.retrievedCachedSuggestions) {
			wc.render.getRefreshControllerById("AutoSuggestCachedSuggestionsController").url = this.CachedSuggestionsURL;
			console.debug("update cache sugg "+this.CachedSuggestionsURL);
			wc.render.updateContext("CachedSuggestions_Context", {});
		}
	},

	/**
	 * Clears the Search term string displayed in Simple Search field.
	 */
	clearSearchField:function() {
		if(document.getElementById("searchBox") != null) {		
			if (document.getElementById("searchBox").value == '')
			{
				document.getElementById('search_submit').disabled=true;
			}
		}
		if(document.getElementById("searchBox") != null) {
			searchText = document.getElementById("searchBox").value;
			if(searchText == document.getElementById("searchTextHolder").innerHTML){
				document.getElementById("searchBox").value = "";
			}
			else{
				document.getElementById("searchBox").select();
				this.showAutoSuggestIfResults();
				this.autoSuggestHover = false;
			}
		}
	},

	/**
	 * Displays the Search term string in Simple Search field.
	 */
	fillSearchField:function() {
		if (document.getElementById("searchBox") != null) {
			if (document.getElementById("searchBox").value == "") {
				document.getElementById("searchBox").className = "searchBox left";
				document.getElementById("searchBox").value = document.getElementById("searchTextHolder").innerHTML;
			}
		}
		// hide the search box results
		if(!this.autoSuggestHover) {
			this.showAutoSuggest(false);
		}
	},

	/**
	 * Toggles the search results tab on the search results page.
	 */
	selectSearchResultsTab:function(tabId) {
		document.getElementById("productsResultTab").setAttribute("class", "tab_container inactive_tab");
		document.getElementById("productsResultTab_wrapper").setAttribute("aria-selected", "false");
		document.getElementById("productsSearchBasedNavigationWidget").style.display = "none";
		document.getElementById("contentsResultTab").setAttribute("class", "tab_container inactive_tab");
		document.getElementById("contentsResultTab_wrapper").setAttribute("aria-selected", "false");
		document.getElementById("contentsSearchBasedNavigationWidget").style.display = "none";

		document.getElementById(tabId+"ResultTab").setAttribute("class", "tab_container active_tab focused_tab");
		document.getElementById(tabId+"ResultTab_wrapper").setAttribute("aria-selected", "true");
		document.getElementById(tabId+"SearchBasedNavigationWidget").style.display = "block";
	},

	selectSearchResultsTabWithKeyboard:function(tabId, event) {
		if (event.keyCode == dojo.keys.SPACE) {
			this.selectSearchResultsTab(tabId);
			this.cancelEvent(event);
		}
	},

	focusSearchResultTab: function(tabId) {
		if (document.getElementById(tabId).getAttribute("class").indexOf("inactive_tab") > 0) {
			document.getElementById(tabId).setAttribute("class", "tab_container inactive_tab focused_tab");
		} else {
			document.getElementById(tabId).setAttribute("class", "tab_container active_tab focused_tab");
		}
	},

	onBlurSearchResultTab: function(tabId) {
		if (document.getElementById(tabId).getAttribute("class").indexOf("inactive_tab") > 0) {
			document.getElementById(tabId).setAttribute("class", "tab_container inactive_tab");
		} else {
			document.getElementById(tabId).setAttribute("class", "tab_container active_tab");
		}
	},

	/**
	 * Updates the searchTermHistory cookie value...
	 */
	updateSearchTermHistoryCookie:function(updatedSearchTerm){
		var cookieKey = "searchTermHistory";
		var cookieValue = "|" + updatedSearchTerm;
		var searchTermHistoryCookie = getCookie(cookieKey);
		if(typeof(searchTermHistoryCookie) != 'undefined') {
			cookieValue =  dojo.cookie(cookieKey) + cookieValue;
		}
		dojo.cookie(cookieKey, cookieValue, {path:'/'});
	},

	updateSearchTermHistoryCookieAndRedirect:function(updatedSearchTerm, redirectURL){
		this.updateSearchTermHistoryCookie(updatedSearchTerm);
		document.location.href = redirectURL;
	},

	isValidNumber:function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n) && n >= 0;
	},

	/**
	 * Validation method for advanced search form
	 */
	validateForm: function(form) {
		form["minPrice"].value = trim(form["minPrice"].value);
		form["maxPrice"].value = trim(form["maxPrice"].value);

		var minValue = form["minPrice"].value;
		var maxValue = form["maxPrice"].value;

		var minIsValid = this.isValidNumber(minValue);
		var maxIsValid = this.isValidNumber(maxValue);

		if(minValue.length > 0 && !minIsValid) {
			MessageHelper.formErrorHandleClient(form["minPrice"].id, MessageHelper.messages["EDPPaymentMethods_AMOUNT_NAN"]);
			return false;
		}
		else if(maxValue.length > 0 && !maxIsValid) {
			MessageHelper.formErrorHandleClient(form["maxPrice"].id, MessageHelper.messages["EDPPaymentMethods_AMOUNT_NAN"]);
			return false;
		}
		else if (minValue.length > 0 && maxValue.length > 0 && parseFloat(minValue) > parseFloat(maxValue)) {
			MessageHelper.formErrorHandleClient(form["maxPrice"].id, MessageHelper.messages["ERROR_PRICE_RANGE"]);
			return false;
		}
		form.submit();
	}

	};

	/**
	 * Declares a new render context for the AutoSuggest display.
	 */
	wc.render.declareContext("AutoSuggest_Context",null,"");

	/**
	 * Declares a new render context for the Cached Suggestions.
	 */
	wc.render.declareContext("CachedSuggestions_Context",null,"");

	/** 
	 * Declares a new refresh controller for Cached Suggestions
	 */
	wc.render.declareRefreshController({
		id: "AutoSuggestCachedSuggestionsController",
		renderContext: wc.render.getContextById("CachedSuggestions_Context"),
		url: "",
		formId: ""

			/** 
			 * Retrieves the cached suggestions used in the autosuggest box.
			 * This function is called when a render context changed event is detected. 
			 * 
			 * @param {string} message The render context changed event message
			 * @param {object} widget The registered refresh area
			 */
			,renderContextChangedHandler: function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		widget.refresh(renderContext.properties);
	}

	/** 
	 * Updates the cached suggestions.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	,postRefreshHandler: function(widget) {
		var controller = this;
		var renderContext = this.renderContext;
		var response = document.getElementById('cachedSuggestions');
		if(response == null) {
			// No response or an error page.   Clear the contents.
			document.getElementById("autoSuggestCachedSuggestions_div").innerHTML = "";
		}
		else {
			var scripts = response.getElementsByTagName("script");
			var j = scripts.length;
			for (var i = 0; i < j; i++){
				var newScript = document.createElement('script');
				newScript.type = "text/javascript";
				newScript.text = scripts[i].text;
				document.getElementById('autoSuggestCachedSuggestions_div').appendChild (newScript);
			}
			SearchJS.retrievedCachedSuggestions = true;
			if(document.getElementById("searchBox") != null) {
				var searchTerm = document.getElementById("searchBox").value;
				if(searchTerm.length > SearchJS.AUTOSUGGEST_THRESHOLD) {
					SearchJS.doStaticAutoSuggest(searchTerm);
				}
			}
		}
	}
	});

	/** 
	 * Declares a new refresh controller for Auto Suggest
	 */
	wc.render.declareRefreshController({
		id: "AutoSuggestDisplayController",
		renderContext: wc.render.getContextById("AutoSuggest_Context"),
		url: "",
		formId: ""

			/** 
			 * Displays the keyword suggestions from the search index
			 * This function is called when a render context changed event is detected. 
			 * 
			 * @param {string} message The render context changed event message
			 * @param {object} widget The registered refresh area
			 */
			,renderContextChangedHandler: function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		widget.refresh(renderContext.properties);
	}

	/** 
	 * Display the results.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	,postRefreshHandler: function(widget) {
		var controller = this;
		var renderContext = this.renderContext;
		var response = document.getElementById('suggestedKeywordResults');
		if(response == null) {
			// No response or an error page.   Clear the contents.
			document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
		}
		SearchJS.showAutoSuggestIfResults();
	}
	});

}

/***************Search.js ends*****************/

/***************ShoppingCart.js starts*****************/
/**
* @overview
* Shopping cart and autocomplete API draft.<br/>
* ETR team to implement {@link CartLoader} and {@link AutocompleteLoader}.
* CaaS Team to provide the rest.<br/>
* <h4>Usage:</h4>
* <h5>Shopping cart:</h5>
* <ul>
*   <li>When user opens the page, CaaS code attempts to locate {@link CartLoader} implementation and invoke {@link CartLoader#retrieveStatus|retrieveStatus} on it,
*   feeding it with an instance of {@link CartHandler}.
*   </li>
*   <li>Once status is retrieved, implementation should call {@link CartHandler#setStatus} and pass it {@link CartStatus|status object}.
*    </li>
*   <li>If status is available immediately, {@link CartLoader#retrieveStatus|retrieveStatus} can just return instance of {@link CartStatus}
*       without calling {@link CartHandler#setStatus}. Status will be set by CaaS code in this case.
*   </li>
*   <li>Based on cart status, CaaS will make a decision, which icon to show.
*   </li>
*   <li>Once user triggers shopping cart display, CaaS calls {@link CartLoader#retrieveContents} to load HTML contents of cart dropdown.
*   </li>
*   <li>Again, two scenarios are available: call to {@link CartHandler#setContents}, or returning value.
*   </li>
*   <li>As soon, as contents are provided, CaaS displays shopping cart dropdown with contents in it.
*   </li>
* </ul>

* <h5>Autocomplete:</h5>
* <ul>
*   <li>When user types characters into search box, CaaS attempts to locate an instance of {@link AutocompleteLoader}
    and invoke {@link AutocompleteLoader#retrieveSuggestions|retrieveSuggestions} on it, feeding it with an instance of {@link AutocompleteHandler}.
*   </li>
*   <li>Once suggestions are available, implementation should call {@link AutocompleteHandler#setSuggestions} and pass it suggestions to it.
    Suggestions can be
        <ul>
            <li>either in form of array of {@link AutocompleteStoreSuggestion}, in which case CaaS will use its internal template to format output <strong>(preferred approach)</strong>;</li>
            <li>or in form of HTML list with predefined external structure and arbitrary formatting for individual items. See documentation for {@link AutocompleteLoader#retrieveSuggestions} for details of HTML format.
            </li>
        </ul>
*    </li>
*   <li>If status is available immediately, {@link CartLoader#retrieveStatus|retrieveStatus} can just return instance of {@link CartStatus}
*       without calling {@link CartHandler#setStatus}. Status will be set by CaaS code in this case.
*   </li>
*   <li>Based on cart status, CaaS will make a decision, which icon to show.
*   </li>
*   <li>Once user triggers shopping cart display, CaaS calls {@link CartLoader#retrieveContents} to load HTML contents of cart dropdown.
*   </li>
*   <li>Again, two scenarios are available: call to {@link CartHandler#setContents}, or returning value.
*   </li>
*   <li>As soon, as contents are provided, CaaS displays shopping cart dropdown with contents in it.
*   </li>
* </ul>
*
* Signatures for {@link CartLoader} and {@link AutocompleteLoader} are suitable for both synchronous and asynchronous data retrieval.
*
* Two loaders will be exposed as global variables under the same names (window.CartLoader and window.AutocompleteLoader)
*
*
*
*
* @author Maksim Kaszynski <maksim.kaszynski@hp.com>
* @date 16.12.2013
*/

/**
* @class
* @classdesc Status of the cart. Used to determine, which icon to use for the cart.
*/
var CartStatus = function(visible, clickable, count){
    /**
    * Indicates, whether shopping cart icon is to be displayed.
    * @type {Boolean}
    */
    this.visible = visible;

    /**
    * Non-negative number of items in shopping cart.
    * @type {Number}
    */
    this.count = count;
}

/**
* @classdesc
* An object responsible for shopping cart content delivery.
* It will be called to provide current status of shopping cart as well as shopping cart contents.
* Its methods {@link CartLoader#retrieveStatus|retrieveStatus} and {@link CartLoader#retrieveContents|retrieveContents} support both synchronous and asynchronous executions.
* CaaS HF will invoke them and check return value. If return value is not <tt>null</tt>, Appropriate handler method will be called. Otherwise implementations of {@link CartLoader} are responsible to call appropriate {@link CartHandler} methods.
* At the moment we expect an instance to be registered as global variable window.CartLoader.
*
* @class
* @abstract
*/
var CartLoader1 = function(){

	/**
	* Retrieve status of shopping cart, i.e. whether it is enabled, how many items are there, and whether it is clickable.
	* The function may either return an object representing status, or return <tt>null</tt>.
	* By returning <tt>null</tt>, function indicates, that it takes responsibility for updating the status of shopping cart.
	* This is useful, when function makes asynchronous Ajax request, whose result becomes available later.
	* In order to set status at later point, the function must invoke {@link CartHandler#setStatus} on provided handler and pass {@link CartStatus} there.
    * @param {CartHandler} handler A reference to cart handler to trigger update after e.g. async call.
	* @return {CartStatus}
    * @abstract
	*/
	this.retrieveStatus = function(handler){};

	/**
	* Retrieve contents of shopping cart, as rendered markup to be displayed in dropdown box. This method gets triggered when user activates shopping card, i.e. by clicking or hovering it.
	* The function may either return rendered markup as String or XML Node, or return <tt>null</tt>.
	* By returning <tt>null</tt>, function indicates, that it takes responsibility for updating the markup of shopping cart.
	* This is useful, when function makes asynchronous Ajax request, whose result becomes available later.
	* In order to set status at later point, the function must invoke {@link CartHandler#setContents} on provided handler and pass new contents there.
    * @param {CartHandler} handler A reference to cart handler to trigger update after e.g. async call.
	* @return {XML|String}
    * @abstract
	*/
    this.retrieveContents = function(relativeId,contentId,contentType){
    	  showMiniShopCartDropDown(relativeId,contentId,contentType);
    	  };

};


/**
* @classdesc
* JSON Objects, which can be returned from autocomplete in store.
* Formatting will be handled by CaaS HF code.
* @class
*/
var AutocompleteStoreSuggestion = function(suggestedValue, title, price, url, imageUrl){


    /**
    * The value to be entered into autocomplete box, when user selects a suggestion
    * @type {String}
    */
    this.suggestedValue = suggestedValue;
    /**
    * The title of the item, to be displayed
    * @type {String}
    */
    this.title = title;

    /**
    * Formatted price of item (if needed)
    * @type {String}
    */
    this.price = price;

    /**
    * URL to the item page (if selecting a suggestion triggers direct navigation)
    * @type {String}
    */
    this.url = url;

    /**
    * URL to the item thumbnail, if showing products with images is desired
    * @type {String}
    */
    this.imageUrl = url;
};

/**
* @classdesc
* Loads autocomplete suggestion data. Implement {@link AutocompleteLoader#retrieveSuggestions} to work.
* Register global variable {@link window.AutocompleteLoader} to provide autocomplete results based on user input
* @abstract
* @class
*/
var AutocompleteLoader = function(){
    /**
    * Retrieve suggestions based on user input. Implement this method to request autosuggestions.
    * It is responsible for transport protocol and format handling.
    * Method may return null to indicate, that invocation was asynchronous.
    * It is responsibility of the user to call {@link AutocompleteHandler#setSuggestions} when asynchronous
    * invocation completes.<br/>
    * Following formats of results are supported
    * <ul>
    *   <li>An array {@link AutocompleteStoreSuggestion}
    *   <li>HTML in String for, or as DOM Element, the format should be as follows
    * <pre>
    * &lt;ul&gt;
    *  &lt;-- for each item --&gt;
    *  &lt;li data-value="SUGGESTED VALUE"&gt;
    *   Arbitrary HTML formatting
    *  &lt;/li&gt;
    *  &lt;-- end for each --&gt;
    * &lt;/ul&gt;
    * </pre>
    *   </li>
    * </ul>
    * @abstract
    * @param {String} term User input into autocomplete field
    * @return {XML|String|Array<AutocompleteStoreSuggestion>} Suggestion items, if they can be provided
    * immediately, otherwise <tt>null</tt>
    */
    this.retrieveSuggestions = function(term,evt){
    	SearchJS.doAutoSuggest(evt, SearchJS.SearchAutoSuggestServletURL, term);
    	SearchJS.doDynamicAutoSuggest(SearchJS.SearchAutoSuggestServletURL,term,true);
    	SearchJS.showAutoSuggest(true);
    	
    };
};


/**
* An object will be provided by CaaS HF to update contents of autocomplete box.
* {@link AutocompleteHandler#setSuggestions} method may be called automatically, if {@link AutocompleteLoader#retrieveSuggestions} returns value.
* Otherwise, it is responsibility of {@link AutocompleteLoader} to call {@link AutocompleteHandler#setSuggestions} after asynchronous invocation completes. Failure to do so will result in no ppup displayed.
* @abstract
* @class
*/
var AutocompleteHandler = function(){
    /**
    * @abstract
    * @param {XML|String|Array<AutocompleteStoreSuggestion>} suggestions Suggestion values in one of the formats, as described in {@link AutocompleteLoader#retrieveSuggestions}
    * @see {@link AutocompleteLoader#retrieveSuggestions}
    */
    this.setSuggestions = function(suggestions){


    }
};


/**
* An object, provided by CaaS header, to handle display of cart icon and popup.
* An instance of this object will be provided to {@link CartLoader} to process results of asynchronous invocation,
* or, if invocation is synchronous, will be called by CaaS header itself.
*
* @class
* @abstract
*/
var CartHandler= function () {
	/**
    * Sets status of shopping cart, namely updates icon and number of items.
	* @param {CartStatus} status - Status of shopping cart to be displayed (or not ;))
    * @abstract
	*/
	this.setStatus = function(status){};

	/**
	* Sets contents of shopping cart popup to be displayed. This will trigger popup to be shown.
    * Results can be either DOM element, in which case it will be appended to pop up.
    * Or it can be HTML string, which will be set as inner HTML of popup div.
	* @param {XML|String} html Contents to be displayed in shopping cart popup upon opening.
    * @abstract
	*/
	this.setContents = function(html){};
};

/***************ShoppingCart.js ends*****************/

/***************MiniShopCartDisplay.js starts*****************/
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2011, 2013 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 * @fileOverview This file provides the common functions which are specific to the Mini Shopping cart
 */

 /**
 * map order_updated to all the services that result in changes to an order
 * @static
 */
var order_updated = {	'AjaxAddOrderItem':'AjaxAddOrderItem',
						'AddOrderItem':'AddOrderItem',
						'AjaxAddOrderItemWithShipingInfo':'AjaxAddOrderItemWithShipingInfo',
						'AjaxDeleteOrderItem':'AjaxDeleteOrderItem',
						'AjaxUpdateOrderItem':'AjaxUpdateOrderItem',
						'AjaxUpdateOrderShippingInfo':'AjaxUpdateOrderShippingInfo',
						'AjaxOrderCalculate':'AjaxOrderCalculate',
						'AjaxLogoff':'AjaxLogoff',
						'AjaxSetPendingOrder':'AjaxSetPendingOrder',
						'AjaxUpdatePendingOrder':'AjaxUpdatePendingOrder',
						'AjaxSingleOrderCancel':'AjaxSingleOrderCancel',
						'AjaxDeleteOrderItemTcs':'AjaxDeleteOrderItemTcs',
						'AjaxUpdateRewardOption':'AjaxUpdateRewardOption',
						'NewsLetterSubscriptionID':'NewsLetterSubscriptionActionID',
						'AddToCartAjax':'AddToCartAjax'
					};

/** This variable indicates whether the mini cart drop down is updated or not. */
var dropdownUpdated = false;
/** This is variable indicates wether the mini cart drop down is being initialized. */
var dropdownInit = false;
/** This variable keeps track of the mouseover on the mini cart. */
var timer;

var quickInfoImgDimensions = "330x330";

var categoryDisplayImgDimensions = "160x160";

var productDetailImgDimensions = "447x447";

var miniCartImgDimensions = "105x105";

/**
 * Declares a new render context for the Mini Shopping Cart.
 */
wc.render.declareContext("MiniShoppingCartContext",{status:"init"},"");

/**
 * Declares a new render context for the Mini Shopping Cart contents.
 */
wc.render.declareContext("MiniShopCartContentsContext",{status:"init", relativeId:"", contentId:"" ,contentType:""},"");

/**
 * Declares a new render context for the Mini Shopping Cart dropdown contents.
 */
wc.render.declareContext("MiniShopCartDropDownContext",null,"");

wc.render.declareContext("PriceDisplayContext",{status:"init"},"");



/**
 * Displays the dropdown content of the mini shopping cart when keyboard keys are used to expand/collapse the dropdown.
 *
 * @param {object} event The event to retrieve the input keyboard key
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */

function setCartDropDownInit(){
dropdownInit=false;
}
function showMiniShopCartDropDownEvent(event,relativeId,contentId,contentType){
	console.debug(event.keyCode);
	if(event.keyCode == dojo.keys.DOWN_ARROW || event.keyCode == dojo.keys.ENTER){
		showMiniShopCartDropDown(relativeId,contentId,contentType);
		dojo.stopEvent(event);
	}
}

/**
 * Displays the dropdown content of the mini shopping cart when the user hovers over the
 * mini shopping cart if the contents are up-to-date or retrieve the latest contents from server.
 *
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showMiniShopCartDropDown(relativeId,contentId,contentType){

if(CheckoutHelperJS.shoppingCartPage) {
		return;
	}

	if(!dropdownInit){
		dropdownInit = true;
		if(!dropdownUpdated){
			destroyDialog();
			var params = {};
			params["status"] = 'load';
			params["relativeId"] = relativeId;
			params["contentId"] = contentId;
			if(contentType=="orderItemsListAutoClose1"){
				//params["contentType"] = "orderItemsListAutoClose";
				params["carticonclick"] = '1';
			}
			else{
				params["contentType"] = contentType;
				params["carticonclick"] = '';
			}
			params["page_view"] = 'dropdown';
			wc.render.updateContext("MiniShopCartContentsContext", params);
		} else {
			positionMiniShopCartDropDown(relativeId,contentId,contentType);

		}
	}

}

/**
 * Displays the dropdown content of the mini shopping cart.
 *
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function positionMiniShopCartDropDown (relativeId,contentId,contentType){
if(CheckoutHelperJS.shoppingCartPage) {
			return;
		}


	var dialog = null;
	var otherDialog = null;
	//if(contentType == 'orderItemsList' || contentType == 'orderItemsListAutoClose' || contentType == 'orderItemsListAutoClose1'){
		if(contentType == 'orderItemsListAutoClose1' || contentType == ''){

		dojo.query(".cartBlock").style("display", "block");
		dropdownInit = false;
		return;
		/*dialog = dropDownDlg;
		otherDialog = productAddedDropDownDlg;*/
	} else if(contentType == 'orderItemAdded'){
		dialog = productAddedDropDownDlg;
		otherDialog = dropDownDlg;
	}

	//Calculate the X and Y co-ordinates for the dialog. We don't want it to be at the center of the screen.
	var t = dojo.byId(relativeId);
	var c = dojo.coords(t,true);
	var x1 = c.x - 130 - c.l;
	var y1 = c.y + c.h;

    /*By default, the content of the mini shop cart will be displayed immediately after the mini shop cart title.
     *But we want the content to display under the mini shop cart title. So we'll need to get the width
     *of the shop cart and then shift it*/
	var cartWidth =dojo.coords(dojo.byId('widget_minishopcart'),true).w;

	if(dojo.isIE == 8){
		cartWidth = dojo.coords(dojo.byId('widget_minishopcart'),true).w
	}else if (dojo.isIE>=7 && dojo.isIE<8) {
		cartWidth =dojo.coords(dojo.byId('miniShopCartBody'),true).w;
	}else if(dojo.isIE < 7){
		cartWidth = originalMiniCartWidth;
	}

	//dojo.style(dojo.byId("quick_cart"), "width", cartWidth+'px');

	/* If the Dialog is already created, then just set the X and Y co-ordinates for this dialog. Sometimes,
	if the browser is resized, the (x,y) co-ordinates will change from the initial values. So every time before calling Dialog.show() method reset the (x,y) co-ordinates.
	The Dialog.show() method will internally call _rePosition() method which repositions the dialog.
	*/
    var dlgX=x1; //this value is good for ff3, IE8 & languages

    if(dojo.isIE){
    	dlgX = x1 + dojo.contentBox(dojo.byId(relativeId)).w-cartWidth;
    }

	if(dojo.locale == 'ar-eg' || dojo.locale=='iw-il'){
		dlgX = dlgX + 126;
	}

	if(dialog){
			dialog.y = y1;
			dialog.x = dlgX;
	}

	/* Dialog is not yet created..Create one */
	if(!dialog){
		var pane = document.getElementById(contentId);
		var dialogTitleElement = document.getElementById(contentId + "_ACCE_Label");
		if (dialogTitleElement != null) {
			dialog = new wc.widget.WCDialog({relatedSource: relativeId, x:x1, y:y1, title:dialogTitleElement.innerHTML},pane);
		} else {
			dialog = new wc.widget.WCDialog({relatedSource: relativeId, x:x1, y:y1},pane);
		}

		dialog.x=dlgX;
		if(contentType != 'orderItemAdded' &&
				(dojo.locale != 'ar-eg' && dojo.locale != 'iw-il')){
			dialog.x += 130;
		}
	}

	var status = null;
	if(otherDialog){
		status = otherDialog.displayStatus;
	}

	if(!dialog.displayStatus && (status == null || !status)){
		//If not displaying the dialog, then change the contents based on the contentType..
		//If we are displaying the dialog, then do not change the content of the dialog widget..

		dialog.closeOnTimeOut = false; // Do not close the dialog on timeout.
		dialog.autoClose = false; // Do not close the dialog when it loses
									// focus. Use the Close button.
		if(contentType == 'orderItemsList' || contentType == 'orderItemsListAutoClose' || contentType == 'orderItemsListAutoClose1'){
			dropdownDisplayed = true;
			if (contentType == 'orderItemsListAutoClose' || contentType == 'orderItemsListAutoClose1') {
				dialog.autoClose = true;
			}
			dropDownDlg = dialog;
			setTimeout(dojo.hitch(dropDownDlg,"show",null),5);
		} else if(contentType == 'orderItemAdded'){
			dojo.byId("MiniShopCartProductAddedWrapper").style.display = "block";
			productAddedDropDownDlg = dialog;
			setTimeout(dojo.hitch(productAddedDropDownDlg,"show",null),5);
		}
		setTimeout(dojo.hitch(this,"hideUnderlayWrapper",""),5);
	}
	if(dojo.isIE < 7)
	{
		dialog.style.display = "block";
	}
	dropdownInit = false;
}

/**
* Sets the URL of the specified controller.
*
* @param {string} controllerId The id of the target controller.
* @param {string} url The link to specify for the controller.
*/
function setMiniShopCartControllerURL(url){
	  wc.render.getRefreshControllerById('MiniShoppingCartController').url = url;
}


/**
 * Declares a new refresh controller for the Mini Shopping Cart.
 */
wc.render.declareRefreshController({
       id: "MiniShoppingCartController",
       renderContext: wc.render.getContextById("MiniShoppingCartContext"),
       url: "",
       formId: ""

       /**
        * Refreshes the mini shopping cart.
        * If a new order item is added via an Ajax service call, set the mini shopping cart to display the new order item in the dropdown.
        * Otherwise, only refresh the contents of mini shopping cart to the updated order information.
        * This function is called when a modelChanged event is detected.
        *
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(message.actionId in order_updated || message.actionId == 'AjaxDeleteOrderItemForShippingBillingPage'){
                     var param = [];
                     if(message.actionId == 'AddOrderItem'){
                            param.addedOrderItemId = message.orderItemId + "";
                            showDropdown = true;
                     }
		     param.deleteCartCookie = true;
                     widget.refresh(param);

              }
       }


       /**
        * Refreshes the mini shopping cart.
        * This function is called when a render context changed event is detected.
        *
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
		    var controller = this;
		    var renderContext = this.renderContext;

		    if(controller.testForChangedRC(["status"])){
				renderContext.properties.deleteCartCookie = true;
		    	widget.refresh(renderContext.properties);
		    }
       }

       /**
        * Destroys the old mini shopping cart dialog with previous order information.
        * If order item was added, display the mini shopping cart dropdown with the new order item added contents.
        * This function is called after a successful refresh.
        *
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;

              //The dialog contents has changed..so destroy the old dialog with stale data..
	      destroyDialog("MiniShopCartProductAdded");

              if(showDropdown){
                     //We have added item to cart..So display the drop down with item added message..
		     positionMiniShopCartDropDown("widget_minishopcart",'MiniShopCartProductAdded','orderItemAdded');

                     showDropdown = false;
              }

		updateCartCookie();
		populateProductAddedDropdown();
		//handleMiniCartHover();
		/* dojo.style(dojo.byId('itemsoncart'), "display", "block");*/
		resetDeleteCartCookie();


       }

})

/**
 * Declares a new refresh controller for the Mini Shopping Cart contents.
 */
wc.render.declareRefreshController({
       id: "MiniShopCartContentsController",
       renderContext: wc.render.getContextById("MiniShopCartContentsContext"),
       url: "",
       formId: ""

       /**
        * Indicate that the mini cart contents are out of date upon an order change action.
        * This function is called when a modelChanged event is detected.
        *
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,modelChangedHandler: function(message, widget) {
			var controller = this;
			var renderContext = this.renderContext;

			if(message.actionId in order_updated || message.actionId == 'AjaxDeleteOrderItemForShippingBillingPage'){
				dropdownUpdated = false;
			}
       }


       /**
        * Refreshes the mini shopping cart contents since it is out of date.
        * This function is called when a render context changed event is detected.
        *
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {


    	   var controller = this;
    	   var renderContext = this.renderContext;

    	   /* Requirement <1421> - Changes to perform OrderCalculate before laoding the Minicart. */
    	   var params = [];
   			params.storeId		= WCParamJS.storeId;
   			params.catalogId	= WCParamJS.catalogId;
   			params.langId		= WCParamJS.langId;
   			params.URL= "";
   			params.updatePrices = "1";
   			params.orderId = ".";
   			params.calculationUsageId = "-1";

	   		wc.service.declare({
	   			id: "MiniCartOrderCalculate",
	   			actionId: "MiniCartOrderCalculate",
	   			url: getAbsoluteURL() + "MiniOrderCalculate",
	   			formId: ""
	  			,successHandler: function(serviceResponse) {
	   			var orderId=serviceResponse.orderIdOrderItemAccessBean;
	   			var orderItemId=serviceResponse.orderItemId;
	   			var param = [];
  				param.storeId = WCParamJS.storeId;
  				param.catalogId = WCParamJS.catalogId;
   				param.langId = WCParamJS.langId;
  				param.orderId = orderId
  				param.orderItemId = orderItemId;

	   			var a=serviceResponse.catentDeletedName;
	   			var b=serviceResponse.flag;

	   			console.debug(a);
	   				if(a != "Undefined" && a != undefined){
		   			wc.service.invoke("AjaxDeleteOrderItem", param);	
		   		}
		  		    if(!dropdownUpdated){
						loadMiniCart("USD","-1");
		  				renderContext.properties.fetchCartContents = true;
		  				dropdownUpdated = false;
		  		    	widget.refresh(renderContext.properties);
		  		    }
	   			}
	   			,failureHandler: function(serviceResponse) {
	   				console.log ("Order calculate failed");
	   			}
	   		});

	   		wc.service.invoke("MiniCartOrderCalculate",params);

       }

       /**
        * Displays and positions the mini shop cart contents.
        * This function is called after a successful refresh.
        *
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
            var controller = this;
            var renderContext = this.renderContext;

            checksubTotakPrice();

//Start: To handle failure scenario of MiniCartController refesh.
            if((document.getElementById('MiniShoppingCart').innerHTML.trim() == '')) {
            	   var orderQuantity = document.getElementById('orderQuantity').value;
                          var orderQuantityArr=orderQuantity.split(".");
						  var count=orderQuantityArr[0];
                var miniCartHTML = "<div id=\"widget_minishopcart\" role=\"button\" tabindex=\"0\" onclick=\"javascript:showMiniShopCartDropDown('widget_minishopcart','quick_cart_container','orderItemsListAutoClose1');\" onKeyPress=\"javascript:showMiniShopCartDropDownEvent(event,'widget_minishopcart','quick_cart_container','orderItemsList');\">";
                miniCartHTML += "<div id=\"miniShopCartBody\" class=\"content row\">";
                
                miniCartHTML += "<span id=\"minishopcart_total\" class=\"cartcount\">" + count + "</span>";
                miniCartHTML += "</div></div>";
				if(count!=0)
                dojo.place(miniCartHTML, dojo.byId('MiniShoppingCart'));
            }
            //End: To handle failure scenario of MiniCartController refesh.
            positionMiniShopCartDropDown(renderContext.properties.relativeId, renderContext.properties.contentId, renderContext.properties.contentType);

       }

})

wc.render.declareRefreshController({
    id: "priceDisplayController",
    renderContext: wc.render.getContextById("PriceDisplayContext"),
	url: getAbsoluteURL() +"PriceDisplayAjaxView",
    formId: ""

    ,modelChangedHandler: function(message, widget) {
    var controller = this;
    var renderContext = this.renderContext;
    widget.refresh(renderContext.properties);
    }
    ,renderContextChangedHandler: function(message, widget) {
    var controller = this;
    var renderContext = this.renderContext;
    widget.refresh(renderContext.properties);
    }
    ,postRefreshHandler: function(widget) {



	
   	
    if(document.getElementById("catentryIdList")!=null)
	{
		var catentids = document.getElementById("catentryIdList").value;
		var catentids = catentids.split(',');
		var x="";
		var i="";
		var j="";
		
		for (i=0;i<catentids.length;i++)
		{
			if(document.getElementById(catentids[i]+"|price")!=null)
			{
				var priceamt=document.getElementById(catentids[i]+"|price").value;
				var priceamt = priceamt.split('|');
				
				if(priceamt!="")
				{
					if(priceamt.length==1)
					{
						if(priceamt!="Price as configured")
						{
							x=document.getElementsByName(catentids[i]+"wholeprice");
							for (j=0;j<x.length;j++)
							{ 
								x[j].innerHTML=priceamt[0];
							}
						}
						else
						{
							x=document.getElementsByName(catentids[i]+"configPriceHolder");
							for (j=0;j<x.length;j++)
							{ 
								x[j].style.display='none';
							}
							x=document.getElementsByName(catentids[i]+"wholepriceConfig");
							for (j=0;j<x.length;j++)
							{ 
								x[j].innerHTML=priceamt[0];
							}
						}
					}
					else if(priceamt.length==2)
					{
						x=document.getElementsByName(catentids[i]+"wholeprice");
						for (j=0;j<x.length;j++)
						{ 
							x[j].innerHTML=priceamt[0];
						}
						x=document.getElementsByName(catentids[i]+"decimalprice");
						for (j=0;j<x.length;j++)
						{ 
							x[j].innerHTML=priceamt[1];
						}
					}
					else if(priceamt.length==3)
					{
						x=document.getElementsByName(catentids[i]+"startingat");
						for (j=0;j<x.length;j++)
						{ 
							x[j].innerHTML=priceamt[0];
						}
						x=document.getElementsByName(catentids[i]+"wholeprice");
						for (j=0;j<x.length;j++)
						{ 
							x[j].innerHTML=priceamt[1];
						}
						x=document.getElementsByName(catentids[i]+"decimalprice");
						for (j=0;j<x.length;j++)
						{ 
							x[j].innerHTML=priceamt[2];
						}
					
					}
					else if(priceamt.length==4)
					{
						
						
						if(typeof document.getElementsByName(catentids[i]+"wholeprice") !== 'undefined' && document.getElementsByName(catentids[i]+"wholeprice") !== null) 
						{
							x=document.getElementsByName(catentids[i]+"startingat");
							for (j=0;j<x.length;j++)
							{ 
								x[j].innerHTML=priceamt[0];
							}
							x=document.getElementsByName(catentids[i]+"wholeprice");
							for (j=0;j<x.length;j++)
							{ 
								x[j].innerHTML=priceamt[2];
							}
							x=document.getElementsByName(catentids[i]+"decimalprice");
							for (j=0;j<x.length;j++)
							{ 
								x[j].innerHTML=priceamt[3];
							}
							
						}


					}
				}
				else
				{
					x=document.getElementsByName(catentids[i]+"priceDiv");
							for (j=0;j<x.length;j++)
							{ 
								x[j].style.display='none';
							}

				}
			}
			else
			{
				document.getElementById(catentids[i]+"priceDiv").style.display='none';
			}
		 }
	}
    var controller = this;
    var renderContext = this.renderContext;
    cursor_clear();
		







    }
})
function checksubTotakPrice()
{
	var PriceLimit=document.getElementById("priceLimit").value;
	//alert("PriceLimit b4"+PriceLimit);
	var subTotalChk=parseFloat(PriceLimit);

		//var priceThreshold="6000.00";

		var priceThreshold=parseFloat("6000.00");

		/*var first = subtotal.split(',');
		alert(first[0]);
		var fir = first[0];
		var second=first[1];
		var third=second.split('.');
		var fourth=third[0];
		var PriceLimit1=fir.concat(fourth);
		alert("PriceLimit1"+PriceLimit1);*/
		if(subTotalChk > priceThreshold)
			{
   			alert("Please complete this order through our sales center. Call 1-866-288-7366");

   			dojo.query("#chkredbn1").style({
   				"backgroundColor": "#C0C0C0",
   				"pointer-events": "none",
   				"cursor": "default"
   			});



   			dojo.connect(dojo.byId("chkredbn1"), "onclick", function(evt){
   				dojo.stopEvent(evt);
   	        });

   			dojo.connect(dojo.byId("chkredbn1"), "contextmenu", function(evt){
   				dojo.stopEvent(evt);
   	        });

			}
	//code for price>5000

}

/**
 * Store the current mini cart information in the mini cart cookie.
 */
function updateCartCookie(){
		//Save current order information into cookie
		 if(document.getElementById("currentOrderQuantity") != null && document.getElementById("currentOrderAmount") != null
			&& document.getElementById("currentOrderCurrency") != null && document.getElementById("currentOrderId") != null
			&& document.getElementById("currentOrderLanguage") != null) {
				var cartQuantity = document.getElementById("currentOrderQuantity").value;
				var cartAmount = document.getElementById("currentOrderAmount").value;
				var cartCurrency = document.getElementById("currentOrderCurrency").value;
				var cartLanguage = document.getElementById("currentOrderLanguage").value;
				var cartOrderId = document.getElementById("currentOrderId").value;

				//Clear out previous cookies
				var orderIdCookie = getCookie("WC_CartOrderId_"+WCParamJS.storeId);
				if(orderIdCookie != null){
					dojo.cookie("WC_CartOrderId_"+WCParamJS.storeId, null, {expires:-1,path:'/'});
					var cartTotalCookie = getCookie("WC_CartTotal_"+orderIdCookie);
					if(cartTotalCookie != null){
						dojo.cookie("WC_CartTotal_"+orderIdCookie, null, {expires:-1,path:'/'});
					}
				}
				dojo.cookie("WC_CartOrderId_"+WCParamJS.storeId, cartOrderId, {path:'/'});
				if(cartOrderId != ""){
					dojo.cookie("WC_CartTotal_"+cartOrderId, cartQuantity + ";" + cartAmount + ";" + cartCurrency + ";" + cartLanguage, {path:'/'});
				}
		 }
}

/**
 * Populates the Product Added dropdown upon an add to cart action.
 */
function populateProductAddedDropdown(){

		for(productId in shoppingActionsJS.productAddedList){
			var productDetails = shoppingActionsJS.productAddedList[productId];

			if(document.getElementById('MiniShopCartAddedProdName_'+productId) != null && productDetails[0] != null){
				document.getElementById('MiniShopCartAddedProdName_'+productId).innerHTML = productDetails[0];
			}
			if(document.getElementById('MiniShopCartAddedProdImgSrc_'+productId) != null && productDetails[1] != null){
				if(productDetails[1].indexOf(quickInfoImgDimensions) != -1){
					document.getElementById('MiniShopCartAddedProdImgSrc_'+productId).src = productDetails[1].replace(quickInfoImgDimensions,miniCartImgDimensions);
				} else if(productDetails[1].indexOf(categoryDisplayImgDimensions) != -1){
					document.getElementById('MiniShopCartAddedProdImgSrc_'+productId).src = productDetails[1].replace(categoryDisplayImgDimensions,miniCartImgDimensions);
				} else if(productDetails[1].indexOf(productDetailImgDimensions) != -1){
					document.getElementById('MiniShopCartAddedProdImgSrc_'+productId).src = productDetails[1].replace(productDetailImgDimensions,miniCartImgDimensions);
				}
				document.getElementById('MiniShopCartAddedProdImgSrc_'+productId).alt = productDetails[0];
			}
			if(document.getElementById('MiniShopCartAddedProdPrice_'+productId) != null && productDetails[2] != null){
				document.getElementById('MiniShopCartAddedProdPrice_'+productId).innerHTML = productDetails[2];
			}
			if(document.getElementById('MiniShopCartAddedProdQty_'+productId) != null && productDetails[3] != null){
				document.getElementById('MiniShopCartAddedProdQty_'+productId).innerHTML = productDetails[3];
			}

			if(document.getElementById('MiniShopCartAddedProdAttr_'+productId) != null && productDetails[4] != null){
				document.getElementById('MiniShopCartAddedProdAttr_'+productId).innerHTML = "";

				for(attrName in productDetails[4]){
					document.getElementById('MiniShopCartAddedProdAttr_'+productId).innerHTML += '<div>'
						+ attrName + ': ' + productDetails[4][attrName] + '</div>';
				}
			}
		}
		shoppingActionsJS.productAddedList = new Object();
}

/**
 * Loads mini shop cart info upon page load.
 * @param {String} contextCurrency Current currency selected.
 * @param {String} langId Current language selected.
 */
function loadMiniCart(contextCurrency, langId) {
		var updateCart = false;

		var orderIdCookie = getCookie("WC_CartOrderId_"+WCParamJS.storeId);
		var itemsKey = storeNLS['MSC_ITEM'];

		if(checkDeleteCartCookie()){
			updateCart = true;
		} else if(orderIdCookie != undefined && orderIdCookie == ""){
			/*var subtotal = document.getElementById("minishopcart_subtotal");
			var formattedSubtotal = null;
			if (dojo.locale == 'iw-il') {
				formattedSubtotal = dojo.currency.format(document.getElementById("currentOrderAmount").value,
						{symbol: 'symbol', currency:contextCurrency, locale:'he'});
			} else {
				formattedSubtotal = dojo.currency.format(document.getElementById("currentOrderAmount").value,
						{symbol: 'symbol', currency:contextCurrency});
			}

			if(formattedSubtotal != null){
				formattedSubtotal = formattedSubtotal.replace('symbol', shoppingActionsJS.currencySymbol);
			} else {
				formattedSubtotal = document.getElementById("currentOrderAmount").value;
			}

			if(subtotal != null){
				subtotal.innerHTML = "\n "
				+ formattedSubtotal
				+ "\n ";
			}*/
			var items = document.getElementById("minishopcart_total");
			if(items != null){
				var itemsMsg = document.getElementById("currentOrderQuantity").value;


				if(itemsKey != null) {
					itemsMsg = dojo.string.substitute(itemsKey, {0: document.getElementById("currentOrderQuantity").value});
				}
				if(itemsMsg=="0")
					{
					hideCartCount();
					}

				if(itemsMsg!="0")
				{
				items.innerHTML = "\n "
				+ itemsMsg
				+ "\n ";
				}
				updateCartCookie();
				populateProductAddedDropdown();
				resetDeleteCartCookie();

			}
		} else if (orderIdCookie != undefined && orderIdCookie != ""){
			var cartCookie = getCookie("WC_CartTotal_"+orderIdCookie);

				if(cartCookie != undefined && cartCookie != null && cartCookie != ""){
					var orderInfo = cartCookie.split(";");

					if(orderInfo != null && orderInfo.length == 4){
						if(orderInfo[2] == contextCurrency && orderInfo[3] == langId){
							/*var subtotal = document.getElementById("minishopcart_subtotal");
							if(subtotal != null){
								var formattedSubtotal = null;
								if (dojo.locale == 'iw-il') {
									formattedSubtotal = dojo.currency.format(orderInfo[1].toString(),
											{symbol: 'symbol', currency:contextCurrency, locale: 'he'});
								} else {
									formattedSubtotal = dojo.currency.format(orderInfo[1].toString(),
											{symbol: 'symbol', currency:contextCurrency});
								}
								if(formattedSubtotal != null){
									formattedSubtotal = formattedSubtotal.replace('symbol', shoppingActionsJS.currencySymbol);
								} else {
									formattedSubtotal = orderInfo[1].toString();
								}
								subtotal.innerHTML = "\n "
								+ formattedSubtotal
								+ "\n ";
							}*/

							var items = document.getElementById("minishopcart_total");
							if(items != null){
								var itemsMsg = orderInfo[0].toString();
								if(itemsKey != null) {
									itemsMsg = dojo.string.substitute(itemsKey, {0: orderInfo[0].toString()});
								}
								if(itemsMsg=="0")
								{
								hideCartCount();
								}
								if(itemsMsg!="0")
								{
								items.innerHTML = "\n "
								+ itemsMsg
								+ "\n ";
								items.style.display = 'block';
								}




							}
						} else {
							updateCart = true;
						}
					} else {
						updateCart = true;
					}
				} else {
					updateCart = true;
				}
		} else {
			hideCartCount();
			updateCartCookie();
			populateProductAddedDropdown();
			resetDeleteCartCookie();

		}
		if(updateCart == true){
			wc.render.updateContext('MiniShoppingCartContext', {'status':'load'});
		}
}

/**
 * Keeps track of the timer on mouseover of the mini cart.
 */
function handleMiniCartHover() {
		dojo.connect(document.getElementById("widget_minishopcart"), "onmouseover", function() {
			timer = setTimeout(function(){showMiniShopCartDropDown('widget_minishopcart','quick_cart_container','orderItemsListAutoClose')}, 1000);
		});
		dojo.connect(document.getElementById("widget_minishopcart"), "onmouseout", function() {
			clearTimeout(timer);
		});
}

/**
 * Turn on the flag to indicate that the mini cart cookies should be refreshed.
 */
function setDeleteCartCookie(){
	dojo.cookie("WC_DeleteCartCookie_"+WCParamJS.storeId, true, {path:'/'});
}

/**
 * Check whether the mini cart cookies need to be updated or not.
 */
function checkDeleteCartCookie(){
	var deleteCartCookieVal = getCookie("WC_DeleteCartCookie_"+WCParamJS.storeId);

	if(deleteCartCookieVal != undefined && deleteCartCookieVal != ""){
		if(deleteCartCookieVal == 'true'){
			return true;
		}
	}
	return false;
}

/**
 * Delete the flag that indicates the mini cart cookie should be refreshed.
 */
function resetDeleteCartCookie(){
	var deleteCartCookieVal = getCookie("WC_DeleteCartCookie_"+WCParamJS.storeId);

	if(deleteCartCookieVal != null){
		dojo.cookie("WC_DeleteCartCookie_"+WCParamJS.storeId, null, {expires:-1,path:'/'});
	}
}

/**
* Enable flag to indicate redirect to shopping cart page after add to cart.
*/
function setShopCartRedirectCookie(){
      dojo.cookie("ShopCartRedirectCookie_"+WCParamJS.storeId, true, {path:'/'});
}

/**
* Reset the flag that indicates redirect to shopping cart page after add to
cart.
*/
function resetShopCartRedirectCookie(){
      var shopCartRedirectCookieVal = getCookie("ShopCartRedirectCookie_"+WCParamJS.storeId);

      if(shopCartRedirectCookieVal != null){
            dojo.cookie("ShopCartRedirectCookie_"+WCParamJS.storeId, null,{expires:-1,path:'/'});
      }
}
function updateCartQuantityInAddtoCart(orderId)
	{

			var orderIdCookie = getCookie("WC_CartOrderId_"+WCParamJS.storeId);
			if (orderIdCookie != undefined && orderIdCookie != "" && orderIdCookie ==orderId){
				var cartCookie = getCookie("WC_CartTotal_"+orderId);
				if(cartCookie != undefined && cartCookie != null && cartCookie != ""){
					var orderInfo = cartCookie.split(";");
					if((orderInfo != null) && (orderInfo.length == 4)){
						var count=parseInt(orderInfo[0])+1;
						dojo.cookie("WC_CartTotal_"+orderId,count+";"+orderInfo[1]+";"+orderInfo[2]+";"+orderInfo[3], {path:'/'});
					}

				}


			}

 			else{
				dojo.cookie("WC_CartOrderId_"+WCParamJS.storeId, orderId, {path:'/'});
				if(orderId!= ""){
					dojo.cookie("WC_CartTotal_"+orderId,"1;0.00;USD;"+WCParamJS.langId, {path:'/'});
				}
			}
			
	}
/***************MiniShopCartDisplay.js ends*****************/
