//start can.construct.super
(function(can, window, undefined){

// tests if we can get super in .toString()
	var isFunction = can.isFunction,
		
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;
		
		// overwrites a single property so it can still call super
		can.Construct._overwrite = function(addTo, base, name, val){
			// Check if we're overwriting an existing function
			// BEGIN PATCH - var extention 05/15/2013
			if (name=='vars' && base[name]) {
				val = can.extend(true, {}, base[name],val);
			}
			// END PATCH
			
			addTo[name] = isFunction(val) && 
							  isFunction(base[name]) && 
							  fnTest.test(val) ? (function( name, fn ) {
					return function() {
						var tmp = this._super,
							ret;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = base[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, val) : val;
		}
		// overwrites an object with methods, sets up _super
		//   newProps - new properties
		//   oldProps - where the old properties might be
		//   addTo - what we are adding to
		can.Construct._inherit = function( newProps, oldProps, addTo ) {
			addTo = addTo || newProps
			for ( var name in newProps ) {
				can.Construct._overwrite(addTo, oldProps, name, newProps[name]);
			}
		}
})(this.can, this );
//end can.construct.super

// hp control utils
(function($, can, HP){

	window.isIE6 = navigator.userAgent.toUpperCase().indexOf("MSIE 6.0") != -1;//IE6
	window.isIE7 = navigator.userAgent.toUpperCase().indexOf("MSIE 7.0") != -1;//IE7
	window.isIE8 = navigator.userAgent.toUpperCase().indexOf("MSIE 8.0") != -1;//IE8
	window.isIE9 = navigator.userAgent.toUpperCase().indexOf("MSIE 9.0") != -1;//IE9
	window.isIE10 = navigator.userAgent.toUpperCase().indexOf("MSIE 10.0") != -1;//IE10
	window.isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;//All IE
    window.isFF = navigator.userAgent.toUpperCase().indexOf("FIREFOX") != -1;//All IE
    window.isOpera = (window.opera != undefined);//Opera
	window.gtIE8 = isIE8 || isIE9; //High End IE 
	
	window.rtl = $('html').attr('dir') == 'rtl';

	// extending can.Construct
	var originalSetup = can.Control.prototype.setup;
	can.Control.prototype.setup = function(element, options) {
			$.extend(true, this, this.constructor.vars);
			// can.js does not made deep copy of 'defaults' object when create an 'options' object in constructor
			var newOptions = $.extend(true, { _self:this }, this.constructor.defaults, options);
			return originalSetup.call(this, element, newOptions);
	};

    can.view.register({
        suffix: 'ejs',
		renderer: function (id, text) {
			var pos = id ? id.lastIndexOf('_') : -1;
			if (pos !=-1 && id.substr(pos+1) == 'js') {
				return can.EJS(eval(text));
			}

			return can.EJS({
				text: text,
				name: id
			});
		}
	});

	HP.Control = {
		'init': function (control, selector, options) {

			var controlClass    = (typeof control == 'string' ? HP[control] : control),
                elementsToInit  = $(selector),
                elementToTest   = null,
                elementControls = null,
                isInitialized   = false,
                q;


            // Preventing double initializing on the elements
            $(selector).each(function(index, elt){

                isInitialized   = false;
                elementToTest   = $(elt);
                elementControls = elementToTest.data("initialized") || [];

                for(q=0; q<elementControls.length; q++){

                    if(elementControls[q] === controlClass){
                        isInitialized = true;
                        break;
                    }
                }

                if(isInitialized === false){

                    elementControls.push(controlClass);
                    elementToTest.data("initialized", elementControls);
                    elementsToInit = elementsToInit.add(elementToTest);
                }
            });


			if (controlClass.init) {
				controlClass.init(elementsToInit, options);
			} else {
                elementsToInit.each(function (index, el) {
					new controlClass(el, options);
				});
			}
		},
		
		'show': function (element, options) {
			element = $(element);
			
			if (element.length==0) return;
			
			element.stop(true);
			if (!options || !options.fxShow) {
				element.show();
			} else {
				var fx = options.fxShow;
				if (fx.effect!='fadeTo') element[fx.effect](fx.duration, fx.easing, fx.onComplete);
				else element[fx.effect](fx.duration, 1, fx.easing, fx.onComplete);
			}
            element.triggerHandler('show');
            if (options && options.onShow) options.onShow();
		},
		
		'hide': function (element, options) {
			element = $(element);
			
			if (element.length==0) return;
		
			element.stop(true);
			if (!options || !options.fxHide) {
				element.hide();
			} else {
				var fx = options.fxHide;
				element[fx.effect](fx.duration, fx.easing, fx.onComplete);
			}
			element.triggerHandler('hide');
			if (options && options.onHide) options.onHide();
		}
	};
	
	HP.Utils = {
		'ready': function (func) {
			$(document).ready(func);
		},
		
		'getUrlParamValue': function (name) {
			var value = null;
			var mather = new RegExp('[#&][\\/]?'+name+'=([^=&$]+)', 'i').exec(window.location.href);
			if (mather) value = mather[1];
			return value;
		},
		
		'getElementById': function (id) {
			var element;
			if (id) {
				element = $('#'+id);
				if (element.length!=0) {
					return element;
				}
			}
		},
		
		'getDocumentHeight': function () {
			return Math.max(
				$(document).height(),
				$(window).height(),
				/* For opera: */
				document.documentElement.clientHeight
			);
		},
		
		'reHOST': /^((([^:/]+:)?(\/\/))?([^:/?#]+\.[^/?#]+))/,
		
		'getUrlHost': function (url) {
			var host = HP.Utils.reHOST.exec(url);
			return host ? (host[0].length==url.length ? '' : host[0]) : '';
		}
	};
	
	HP.Keys = {
		ALT: 18,
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		COMMAND: 91,
		COMMAND_LEFT: 91, // COMMAND
		COMMAND_RIGHT: 93,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		MENU: 93, // COMMAND_RIGHT
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38,
		WINDOWS: 91 // COMMAND
	}
	
})(can.$, can, window.HP||(window.HP={}));