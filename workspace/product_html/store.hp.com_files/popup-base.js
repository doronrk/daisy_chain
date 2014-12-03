(function($, can, HP, params) {

    $(function(){
        var bodyTag = document.body || document.getElementsByTagName('body')[0];
        var body = $("body");
        var eventName = (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) ? "touchstart" : "click";

        var closeOnBodyClickHandler = function (e) {

            var target      = $(e.target),
                targetEl    = target[0],
                activePopup = HP.PopupManager.getActivePopup();

            if (activePopup && targetEl != activePopup.options.triggerEl[0]) {
                var popupEl = activePopup.getElement()[0];
                var isClosed = true;
                while (targetEl != bodyTag) {
                    if (targetEl != popupEl) {
                        target = target.parent();
                        targetEl = target[0];
                    } else {
                        isClosed = false;
                        break;
                    }
                }
                if (isClosed) HP.PopupManager.hideActivePopup();
            }
        };

        body.on("PopupManager:show",function(){
            $(document).on(eventName,closeOnBodyClickHandler);
        });
        body.on("PopupManager:hide",function(){
            $(document).off(eventName,closeOnBodyClickHandler);
        });
    });


    HP.PopupManager = HP.PopupManager || (function() {

        var popups      = [],
            activePopup = null;

        return {
            'add': function (popup) {
                popups.push(popup);
                popup.getElement().bind({
                    'show': function () {
                        if (activePopup) {
                            activePopup.hide();
                        }
                        activePopup = popup;

                        if(popup.options.closeOnBodyClick) $("body").triggerHandler("PopupManager:show");
                    },
                    'hide': function () {
                        if (activePopup == popup) activePopup = null;
                        if(popup.options.closeOnBodyClick) $("body").triggerHandler("PopupManager:hide");
                    }
                });
                return popup;
            },
            'hideActivePopup': function () {
                if (activePopup) {
                    activePopup.hide();
                    activePopup = null;
                }
            },
            'getActivePopup':function(){
                return activePopup;
            }
        }
    })();

    HP.Popup = can.Control(
        {
            defaults: {
                hideDelay: 1000,
                showDelay: 0,
                showEvent: 'mouseenter',
                hideEvent: 'mouseleave',
                keyEvent: 'keydown',
                showKeys:null,
                hideKeys:null,
				triggerEl: null,
				targetActiveClass: '',
				triggerActiveClass: '',
				onInit: null,
                onShow: null,
                onHide: null,
                fxShow: {
                    effect: 'show',
                    duration: 0,
                    easing: null,
                    onComplete: null
                },
                fxHide: {
                    effect: 'hide',
                    duration: 0,
                    easing: null,
                    onComplete: null
                },
				positionHandler: null,
				addToPopupManager: true,
                closeOnBodyClick:true,
				open: false

            },
			vars: {
				timerId: null,
				openState: false,
				touch: false
			}
        }, {
		    'init': function(element, options) {
				// fix for JAWS: JAWS doesn't generete keydown event on enter
				if (this.options.showEvent!='click') {
					this.options.triggerEl.on('click', $.proxy(this['{triggerEl} {showEvent}'], this));
				}
				
				this.openState = this.options.open;

				if (this.openState)
                    this.element.show();
                else
                    this.element.hide();
				
				if (this.options.addToPopupManager)
                    HP.PopupManager.add(this);

				if (this.options.onInit) this.options.onInit(this);
				
				if (window.navigator.msPointerEnabled) {
					var self = this;
					var onTouch = function (event) {
						self.touch = true;
					};
					this.element.on('MSPointerDown', onTouch );
					this.options.triggerEl.on('MSPointerDown', onTouch);
				}
            },
            '_onShow': function () {
                if (this.timerId != null) {
                    clearTimeout(this.timerId);
                }
                if (!this.isOpen()) {
                    if (this.options.showDelay > 0) {
                        this.timerId = setTimeout($.proxy(this.show, this), this.options.showDelay);
                    } else {
                        this.show()
                    }
                }
            },
            '_onHide': function () {
                if (this.timerId != null) {
                    clearTimeout(this.timerId);
                }
                if (this.options.hideDelay > 0) {
                    this.timerId = setTimeout($.proxy(this.hide, this), this.options.hideDelay);
                } else {
                    this.hide()
                }
            },			
            'getElement': function() {
                return this.element;
            },
            'isOpen': function () {
                return this.openState;
            },
			'isVisible': function () {
				return !this.element.is(':hidden');
			},
            'toggle': function(show) {
                if (this.options.showEvent == this.options.hideEvent) {
                    if (this.isOpen()) {
                        this._onHide();
                    } else {
                        this._onShow();
                    }
                } else {
                    if (show) this._onShow(); else this._onHide();
                }
            },
            '{triggerEl} {showEvent}': function (el, e) {
				// story trigger index to popup element
				this.element.data('index',  $.inArray(el[0], $.makeArray(this.options.triggerEl)));
				
                this.toggle(true);
            },
            '{triggerEl} {hideEvent}': function (el, e) {
                if (this.options.showEvent != this.options.hideEvent) {
					if (window.navigator.msPointerEnabled && this.touch) {
						this.touch = false;
					} else {
						this.toggle(false);
					}
				}
            },
            '{triggerEl} {keyEvent}': function (el, e) {
                if(this.options.showKeys || this.options.hideKeys){
                    var key = e.which;
                    var showFlag = $.inArray(key, this.options.showKeys)!=-1;
                    var hideFlag = $.inArray(key, this.options.hideKeys)!=-1;
                    if(showFlag && hideFlag) {
                        showFlag = !this.isOpen();
                    }
                    if (showFlag) {
                        this['{triggerEl} {showEvent}'](el, e);
                    } else if (hideFlag) {
                        this.hide();
                    }
                }
            },

            '{keyEvent}': function (el, e) {
                if (this.options.hideKeys && $.inArray(e.which, this.options.hideKeys) != -1) {
                    this.hide();
                }
            },

            'mouseenter': function (el, e) {
				if (this.element.is(':animated')) return;
                if (this.timerId != null) {
                    clearTimeout(this.timerId);
                }
            },
            '{hideEvent}': function (el, e) {
                if (this.options.showEvent != this.options.hideEvent) {
					if (window.navigator.msPointerEnabled && this.touch) {
						this.touch = false;
					} else {
						this._onHide();
					}
				}
            },
			'setPosition': function() {
				if (this.options.positionHandler && typeof this.options.positionHandler == 'function') {
					this.options.positionHandler(this.element, this.options.triggerEl);
				}
			},
            'show': function () {
				this.setPosition();
				if (this.options.targetActiveClass) this.element.addClass(this.options.targetActiveClass);
                if (this.options.triggerActiveClass) this.options.triggerEl.addClass(this.options.triggerActiveClass);
                HP.Control.show(this.element, this.options);
				this.openState = true;
            },
            'hide': function () {
				if (this.options.targetActiveClass) this.element.removeClass(this.options.targetActiveClass);
                if (this.options.triggerActiveClass) this.options.triggerEl.removeClass(this.options.triggerActiveClass);
                HP.Control.hide(this.element, this.options);
				this.openState = false;
            }
        }
	);
	
	HP.OverlayPopup = HP.Popup(
        {
            defaults: {
				hideDelay: 0,
                showEvent: 'click',
                hideEvent: '',
				fxShow: {
                    duration: 100
                },
                fxHide: {
                    duration: 100
                },

                overlayEl: null,
				overlayClass: 'pop_drk',
				closeTriggerSelector: '.js_pop_close', //TODO: move it close button functionality to Popup control
				closeOnOverlayClick: true,
                closeOnBodyClick:false,
				hAlign: true,
				vAlign: false,
				
				_closeElements: null
            }
        }, {
		    'init': function(element, options) {

				this._initOverlayElement();
				var focusEl = this._initCloseTriggers();
				
				this.element.appendTo(document.body);
				
				var overlayEl = this.options.overlayEl;
				
				var triggerEl = this.options.triggerEl;
				this.options.fxHide.onComplete = function () {
					overlayEl.hide();
					
					// set focus on open trigger element
					triggerEl.focus();
				};
				
				// set focus on first close trigger
				if (focusEl) {
					this.options.fxShow.onComplete = function () {
						focusEl.focus();
					};
				}
				
				this.on();
				this._super();
            },
			
			'_initOverlayElement': function () {
				if (!this.options.overlayEl && 
					(this.options.overlayEl = $('.'+this.options.overlayClass)).length==0 ) {
					
					var bodyEl = $(document.body);
					this.options.overlayEl = $('<div/>', {
						'class' : this.options.overlayClass
					}).appendTo(bodyEl).css('opacity', '0.8').hide();
					
				}
			},
			
			'_initCloseTriggers': function () {
				this.options._closeElements = this.element.find(this.options.closeTriggerSelector);
				var result = this.options._closeElements.first();
				if (this.options.closeOnOverlayClick) {
					$.merge(this.options._closeElements, this.options.overlayEl)
				}
				return result.length==0 ? null : result;
			},
			
			'{_closeElements} click': function (el, e) {
				if (this.isOpen()) {
					this.toggle(false);
				}
			},
			
			'show': function () {
				var wHeight = $(window).height();
				var margin = (document.dir == 'rtl' && isIE && !isIE10) ? 'marginRight' : 'marginLeft';
				
				var css = {
					'top': $(document).scrollTop()
				};
				if (this.options.vAlign) {
					css.top = css.top + (wHeight - this.element.height()) / 2;
				}
				
				if (this.options.hAlign) {
					css[margin] = -this.element.width() / 2;
				}
				this.element.css(css);
			
				this.options.overlayEl.css('height', HP.Utils.getDocumentHeight()).show();
				
				this._super();
			}
			
		}
	);

})(can.$, can, window.HP || (window.HP = {}));