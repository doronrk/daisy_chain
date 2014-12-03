/*
* Forms validation class
* 
* Constructor paramenters:
* 	form 	- HTML FORM element for validation
* 	
* Properties:
* 	rules			- hash object with form validation rules for form elements:
* 		key		- HTML form field element;
* 		value	- hash object 
* 			   key				   value					description
* 			required			true|false				Validate for non-empty element value
* 			email				true|false				Validate for element value as email address
* 			compare				HTML form element		Validate for element value equals another HTML form element value
* 			oninvalid			function				Handler for invalid element value validation
* 			onsuccess			function				Handler for correct element value validation
* 			message				text					Validation error message. Displays for 'required' rule.
* 		e.g.: email:{required:true,email:true, oninvalid:function(e){showInvalidElement(e)}, onsuccess:function(e){hideInvalidElement(e)}}
* 	invalidElements	- array of invalid form elements after form validation;
* 	invalidRules	- array of invalid valiadtion rules after form validation;
* 	validated		- true, if the form is successfully validated (boolean);
* 	validate		- validate form method. It is possible to validate one form element calling it as a parameter;
* 	initValidators	- handler for init form validators;
* 	invalidHandler	- handler for invalid form validation;
* 	validHandler	- handler for successful form validation;
* 	messages		- array of validation error messages for every rule;
*/

function Validation (form) {
	this.form = form;
	this.rules = {}
	this.invalidElements = [];	
	this.invalidRules = [];	
	this.validated = false;
	this.validate = function (obj){
		if (!obj || obj == this.form){ 			// validate entire form
			this.invalidElements = [];			// clear invalidElements array
			this.invalidRules = [];				// clear invalidRules array
			this.initValidators(form);			// call init handler
			this.onValidation();
			for (var rule in this.rules) { 		// check form with validation rules
				if (!form.elements[rule]) continue;
				for (var r in this.rules[rule]) {	//cycle by rule's elements
					switch(r){
						case 'required':
							var val = form.elements[rule].options ? form.elements[rule].options[form.elements[rule].selectedIndex].value : form.elements[rule].value;
							if (this.rules[rule][r] && !val){	// rule triggered
								//push form element to invalidElements array
								if (!this.invalidElements.inArray(form.elements[rule])) {this.invalidElements.push(form.elements[rule]);}
								//push rule to invalidRules array
								if (!this.invalidRules.inArray(r)) {this.invalidRules.push(r); if (this.invalidRules.length>1) this.invalidRules.reverse();}
								//call rule's 'oninvalid' handler
								if (this.rules[rule]['oninvalid']) {this.rules[rule]['oninvalid'](form.elements[rule]);}
							}
						break;
						case 'checked':
							if (this.rules[rule][r] && !form.elements[rule].checked){
								if (!this.invalidElements.inArray(form.elements[rule])) {this.invalidElements.push(form.elements[rule]);}
								if (!this.invalidRules.inArray(r)) {this.invalidRules.push(r);}
								if (this.rules[rule]['oninvalid']) {this.rules[rule]['oninvalid'](form.elements[rule]);}
							}
						break;
						case 'email':
							if (this.rules[rule][r] && !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(form.elements[rule].value)) {
								if (!this.invalidElements.inArray(form.elements[rule])) {this.invalidElements.push(form.elements[rule]);}
								if (!this.invalidRules.inArray(r)) {this.invalidRules.push(r);}
								if (this.rules[rule]['oninvalid']) {this.rules[rule]['oninvalid'](form.elements[rule]);}
							}
						break;
						case 'compare':
							if (form.elements[rule].value!=form.elements[this.rules[rule][r]].value){
								if (!this.invalidElements.inArray(form.elements[rule])) {this.invalidElements.push(form.elements[rule]);}
								if (!this.invalidRules.inArray(r)) {this.invalidRules.push(r);}
								if (this.rules[rule]['oninvalid']) {this.rules[rule]['oninvalid'](form.elements[rule]);}
							}
						break;
					}
				}
			}
			this.validated = (this.invalidElements.length==0);
			this.validated ? this.validHandler(form) : this.invalidHandler(form);
		}
		else { 									// validate one form element (obj - form element)
				for (var r in this.rules[obj.name]) {	
					switch(r){
						case 'required':
							var val = obj.options ? obj.options[obj.selectedIndex].value : obj.value;
							if (this.rules[obj.name][r] && !val){
								if (!this.invalidElements.inArray(obj)) {this.invalidElements.push(obj);}
								if (!this.invalidRules.inArray(r)) {this.invalidRules.push(r);}
								if (this.rules[obj.name]['oninvalid']) {this.rules[obj.name]['oninvalid'](obj);}
							} else {
								if (this.invalidElements.inArray(obj)) {delete this.invalidElements[obj];}
								if (this.invalidRules.inArray(r)) {delete this.invalidRules[r];}
								if (this.rules[obj.name]['onsuccess']) {this.rules[obj.name]['onsuccess'](obj);}
							}
						break;
						case 'email':
							if (this.rules[obj.name][r] && !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(obj.value)) {
								if (!this.invalidElements.inArray(obj)) {this.invalidElements.push(obj);}
								if (!this.invalidRules.inArray(r)) {this.invalidRules.push(r);}
								if (this.rules[obj.name]['oninvalid']) {this.rules[obj.name]['oninvalid'](obj);}
							} else {
								if (this.invalidElements.inArray(obj)) {delete this.invalidElements[obj];}
								if (this.invalidRules.inArray(r)) {delete this.invalidRules[r];}
								if (this.rules[obj.name]['onsuccess']) {this.rules[obj.name]['onsuccess'](obj);}
							}
						break;
						case 'compare':
							if (obj.value!=form.elements[this.rules[obj.name][r]].value){
								if (!this.invalidElements.inArray(obj)) {this.invalidElements.push(obj);}
								if (!this.invalidRules.inArray(r)) {this.invalidRules.push(r);}
								if (this.rules[obj.name]['oninvalid']) {this.rules[obj.name]['oninvalid'](obj);}
							} else {
								if (this.invalidElements.inArray(obj)) {delete this.invalidElements[obj];}
								if (this.invalidRules.inArray(r)) {delete this.invalidRules[r];}
								if (this.rules[obj.name]['onsuccess']) {this.rules[obj.name]['onsuccess'](obj);}
							}
						break;
					}
				}			
		}
		return this.validated;
	}
	this.messages = {
		required:"You have not completed the form.  Please fill in the following fields:",
		email:"The email address is not valid.",
		compare:"Passwords do not match.",
		checked:"You must accept the terms and conditions of Gymboree Rewards."
	}
	this.initValidators = function(f) {}
	this.invalidHandler = function(f) {}
	this.validHandler = function(f) {f.submit()}
	this.onValidation = function(f) {}
}

/*
* Gets array of page elements by CSS class selector
* Parameters:
*	searchClass - CSS class selector (string)
*	node		- parent HTML element;
*	tag 		- HTML tag selector (string)
*/
function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

/*
* Gets one element by CSS class selector
* Parameters:
*	searchClass - CSS class selector (string)
*	node		- parent HTML element;
*	tag 		- HTML tag selector (string)
*/
function getElementByClass(searchClass,node,tag) {
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
    for (i = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            return els[i];
        }
    }
    return null;
}

/*
* Adds function to window.onload event
*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

/*
* Checks array for some value existence
*/
Array.prototype.inArray = function (value) {
    var i;
    for (i=0; i < this.length; i++) {
        if (this[i] === value) {
            return true;
        }
    }
    return false;
};

function attachInputHandlerDefaultText(elementName, initValue) {
	var inputField = document.getElementById(elementName);
	inputField.onfocus = function() {
		if (inputField.value == initValue) {
			inputField.value = "";
		}
	}
	inputField.onblur = function() {
		if (inputField.value == "") {
			inputField.value = initValue;
		}
	}
}

/*
* Gets one element by HTML tag selector
* Parameters:
*	node		- parent HTML element;
*	tag 		- HTML tag selector (string)
*/
function getElementByTagName(node, tag){
	var elems = node.getElementsByTagName(tag);
	if (!elems) return null; else return elems[0];
}

function getElementsByClass(searchClass, node, tag) {
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
	var resultElements = new Array();
    for (i = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
			resultElements.push(els[i])
        }
    }
    return resultElements;
}


function adjustItemsHeight(rowItem, itemClass, spacerClass) {
    var maxHeight = 0;
    if (typeof(rowItem) == 'string') {
		rowItem = document.getElementById(rowItem);
	}
    var items = getElementsByClass(itemClass, rowItem, null);
    if (items != null) {
    	for (var i = 0; i < items.length; i++) {
			var elementHeight = parseInt(items[i].offsetHeight, 10);
			maxHeight = (maxHeight > elementHeight) ? maxHeight : elementHeight;
    	}
		
    	for (var i = 0; i < items.length; i++) {
    		var element = items[i];
			if (spacerClass) {
				var heightToSet = maxHeight - intval(element.offsetHeight);
				var spacers = getElementsByClass(spacerClass, rowItem, null);
				if (spacers != null && spacers[0]) {
					spacers[0].style.height = heightToSet + "px";
				}
			} else {
				var heightToSet = maxHeight;
				element.style.height = heightToSet+"px";
			}
    	}
    }
}

function footerSetDynWidth() {
	var borderWidth = 3;
	var elementsCols = $$("#footer-links .col");
	var elementsColsTotal = elementsCols.length;
	var wrapperWidth = $$("#footer-links .cols .wrapper")[0].clientWidth;
	var singleElementWidth;
	
	var maxHeight = 0;
	elementsCols.each(function (element) {
		singleElementWidth = Math.floor(wrapperWidth / elementsColsTotal) - parseInt($(element).getStyle("border-left-width"), 10);
		maxHeight = maxHeight < $(element).clientHeight ? $(element).clientHeight : maxHeight;
		$(element).setStyle({
			"width": singleElementWidth + "px"
		});
	});
	
	elementsCols.each(function (element) {
		$(element).setStyle({
			"height": maxHeight + "px"
		});
	});
}

function attachSFHover() {
	var isIERegExp = new RegExp("MSIE");
	var isIE6RegExp = new RegExp("6\.0");
	try {
        if (isIERegExp.test(window.navigator.userAgent) && isIE6RegExp.test(window.navigator.userAgent)) {
			if (document.getElementById("top-main-menu")) {
				var sfEls = document.getElementById("top-main-menu").getElementsByTagName("li");
				for (var i=0; i<sfEls.length; i++) {
					sfEls[i].onmouseover = function() {
						this.className += " hover";
					}
					sfEls[i].onmouseout = function() {
						this.className = this.className.replace(new RegExp(" hover\\b"), "");
					}
				}
			}
		}
	} catch (e) {

	}
}

if (window.attachEvent) window.attachEvent("onload", attachSFHover);