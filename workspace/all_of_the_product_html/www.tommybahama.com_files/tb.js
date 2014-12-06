/**
 * Tommy Bahama
 * tb.jquery.js
 * author: craig downey craig.downey@tommybahama.com
 * description: a series of useful jquery plugins
 */

/* $.fn.indexNavigation
 *   Useful for scenarios in which a series of elements serve as navigation elements.
 *
 *   When an element is clicked an active class name is added to that element and
 *   removed from the last active element. The callback function is then invoked passing the
 *   event object and the index of the clicked element as parameters to the callback function.
 *
 *   @param {function} callback a function to call when an element is clicked
 *   @param [options] optional configuration options
 */
;(function ($) {
    "use strict";
    var defaults = {
        activeClassName: 'current', //default class name to add to active element
        defaultIndex: 0             //starting element to activate
    };

    $.fn.indexNavigation = function (callback, options) {
        var ELs = this, self = this;

        this.options = $.extend({}, defaults, options);
        this.eq(this.options.defaultIndex).addClass(this.options.activeClassName); //set initial index

        return this.each(function (index) {
            $(this).click(function (event) {
                ELs.removeClass(self.options.activeClassName);
                $(this).addClass(self.options.activeClassName);
                callback.call(this, event, index);
            });
        });
    };
}) (jQuery);

/* $.fn.indexHoverNavigation
 *   just like indexNavigation, but instead of using the click event, navigation is
 *   triggered on mouseover
 *
 *
 *   @param {function} callback a function to call when an element is clicked
 *   @param [options] optional configuration options
 */
(function ($) {
    "use strict";
    var defaults = {
        activeClassName: 'current', //default class name to add to active element
        defaultIndex: 0             //starting element to activate
    };

    $.fn.indexHoverNavigation = function (callback, options) {
        var ELs = this, self = this;

        this.options = $.extend({}, defaults, options);
        this.eq(this.options.defaultIndex).addClass(this.options.activeClassName); //set initial index

        return this.each(function (i) {
            $(this).mouseover(function (e) {
                ELs.removeClass(self.options.activeClassName);
                $(this).addClass(self.options.activeClassName);
                callback.call(this, e, i);
            });
        });
    };
}) (jQuery);

/* $.fn.bg
 * a shortcut for setting the background image of an element
 *
 * @param {String} url the url path to the image that is to be used as the new background image
 */
(function ($) {
    "use strict";
    $.fn.bg = function (url) {
        return this.css('background-image', 'url(' + url + ')');
    };
}) (jQuery);

/* $.fn.setMap
 *  a jquery wrapper for settings an image map on an element.
 *
 * @param {String} mapName the map id of the image map to use
 */
(function ($) {
    "use strict";
    $.fn.setMap = function (mapName) {
        if (mapName !== undefined) {
            //IE needs a # at the beginning of the map name to function correctly
            if (mapName.charAt(0) !== '#') {
                mapName = '#' + mapName;
            }
            return this.each(function () {
                this.useMap = mapName;
            });
        }
    };
}) (jQuery);

/* $.fn.fiterByNamePartial
 *   filters a list of elements by a partial name element
 *   for example, a set of image map elements might be filtered by the tag 'mens_2012'
 *   only those map elements with 'mens_2012' in the name will be returned
 *
 *   options include 'start' the filter will only include those element that start with the set tag,
 *   'end' only elements ending with the set tag will be returned, and 'middle' the entire name will
 *   be searched for the tag.
 *
 *   @param {String} str the tag to use to filter elements by
 *   @param [options] optional configuration parameters, see below
 */
(function ($) {
    "use strict";

    var defaults = {
        position: 'start'  //position to look for partial from, possible values are: 'start', 'end', and, 'middle'
    };

    $.fn.fiterByNamePartial = function (str, options) {
        var self = this;
        this.options = $.extend({}, defaults, options);

        if (str.charAt(0) === '#') {
            str = str.slice(1, str.length);
        }
        return this.filter(function () {
            var reg = '';
            switch (self.options.position) {
                case 'start':
                    reg = new RegExp('^' + str);
                    break;
                case 'end':
                    reg = new RegExp(str + '$');
                    break;
                case 'middle':
                    reg = new RegExp(str);
                    break;
                default:
                    reg = new RegExp("");
                    break;
            }
            return reg.test($(this).attr('name'));
        });
    };
}) (jQuery);

/* $.fn.preload
 *  a jquery preloader for images
 *
 *  pass in an image or array of image paths to preload.
 *  $([ 'images/image1.jpg', 'images/image2.jpg']).preload();
 */
(function ($) {
    "use strict";

    $.fn.preload = function () {
        this.each(function () {
            $('<img/>').attr('src', this);
        });
    }
}) (jQuery);

(function ($) {
    "use strict";

    var defaults = {
        fit: {
            fit_BigAndTallFit: {
                contentID: '#divBigAndTallFit'
            },
            fit_TailoredShirt: {
                contentID: '#divTailoredShirtsFit'
            },
            fit_InternationalFit: {
                contentID: '#divInternationalFit'
            },
            fit_IslandModernFit: {
                contentID: '#divIslandModernFit'
            }
        }
    };

    $.fn.fitTooltip = function () {
        this.each(function () {
            var $this = $(this),
                classes = $this.attr('class').split(/\s+/),     //all class names associated with el
                fitClass,                                       //found fitClass name
                fitContentTemplate,                             //content template reference
                toolTip;                                        //tooltip html reference

            $.each(classes, function (index, value) {
                if (defaults.fit[value] !== undefined) {
                    fitClass = value;
                    return false;
                }
            });

            if (fitClass !== undefined) {
                $this.hover(
                    function (e) {
                        fitContentTemplate = $(defaults.fit[fitClass].contentID).clone();
                        //cache toolTip
                        if(toolTip === undefined) {
                            toolTip = $('<div></div>').addClass('fit_flyout').append(fitContentTemplate.html());
                            toolTip.appendTo($this);
                        } else {
                            toolTip.appendTo($this);
                        }
                        toolTip.show();
                    },
                    function (e) {
                        toolTip.hide();
                        toolTip = toolTip.detach();
                    }
                );
            }
        });
    }
})(jQuery);

/**
 *  $.fn.emailSignupForm
 *  sets up email signup form handling
 *
 *  Use the below HTML as a base for building an email signup form. The class names must be included.
 *  <div class="emailSignup">
 *      <form method="post">
 *          <input class="emailAddress" type="text" name="user" value="Just enter your email address" maxlength="128" />
 *          <div class="emailSubmitBtn"></div>
 *      </form>
 *  </div>
 */

(function ($) {
    "use strict";

    $.fn.emailSignupForm = function () {
        this.each(function () {
            var $this = $(this),
                emailInput = $this.find('input.emailAddress'),
                emailSubmitBtn = $this.find('.emailSubmitBtn');

            if ( !emailInput.length || !emailSubmitBtn.length ) {
                throw new Error('expected formatting not found: please see documentation for proper formatting');
            }

            $this.submit(function (e) {
                e.preventDefault(); //no need to post
                tb.DOM.emailSignup( emailInput.val() );
            });

            emailSubmitBtn.click(function (e) {
                $this.trigger('submit');
            });

        });
    }
})(jQuery);

/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */

(function ($) {
    "use strict";

    var o = $({});

    $.subscribe = function () {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };

    $.publish = function () {
        o.trigger.apply(o, arguments);
    };
}(jQuery));

/**
 *  $.fn.touchScrollSlider
 *  a simple smoothscrolling slider with touch support.
 *
 *  should be called upon a single element. Ie, a single image, or a single div wrapping
 *  a number of element. Calling touchScrollSlider on multiple elements will have
 *  unpredictable effects.
 *
 *  usage is simple $().touchScrollSlider(options)
 *
 *  $('.
 */
(function ($) {
    "use strict";

    var defaults = {
        enableTouch:   true,
        initAnimation: function () {},
        speed:          5,
        touchDampening: 0.05,
        aniTime: 1
    };

    $.fn.touchScrollSlider = function (options) {
        //DOM REFERENCE
        var self = this,
            body = $('body'),
            parentContainer = this.parent(),
            controls, prev, next;

        //helper values
        var width = this.outerWidth(),
            height = this.outerHeight(),
            MAX_LEFT = -(width - parentContainer.width());

        //helper flags
        var isNextMouseDown = false,
            isPrevMouseDown = false;

        //touch setup
        var isTouchEnabled,
            lastX, startX, endX,
            startTime, endTime,
            touchDampening;

        //options
        this.options = $.extend({}, defaults, options);

        // Initialization
        isTouchEnabled = this.options.enableTouch ? "ontouchstart" in document.documentElement : false;
        touchDampening = this.options.touchDampening;

        this.wrap('<div class="touch_scroll_slider" />');
        var slider = this.slider = parentContainer.find('.touch_scroll_slider');
        this.slider.css({
            position: 'relative',
            width: width,
            height: height,
            left: 0
        });

        //controls or touch setup
        if (!isTouchEnabled) {
            controls = $('<div class="touch_scroll_controls"></div>');

            prev = $('<span class="touch_scroll_prev"></span>').appendTo(controls);
            next = $('<span class="touch_scroll_next"></span>').appendTo(controls);

            //event binding
            prev.on('mousedown', onPrevMouseDown);
            next.on('mousedown', onNextMouseDown);

            parentContainer.append(controls);
        } else {
            this.on('touchstart', onTouchStart);
        }

        //trigger initialization animation
        this.options.initAnimation.call(this);

        function onTouchStart (e) {
            e.preventDefault();
            body.on('touchmove', onTouchMove);
            body.on('touchend', onTouchEnd);

            startX = lastX = e.originalEvent.touches[0].pageX;
            startTime = e.originalEvent.timeStamp;
        }

        function onTouchMove (e) {
            var currentX = e.originalEvent.touches[0].pageX,
                dx = (currentX - lastX) * touchDampening,
                currentSliderLeft = parseInt(slider.css('left'), 10);

            if (currentSliderLeft + dx < 0 && currentSliderLeft + dx > MAX_LEFT) {
                slider.css('left', (currentSliderLeft + dx) +'px');
            }
        }

        function onTouchEnd (e) {
            var dx, dt, speedX, stopDistance,
                step = 0,
                lastStepTime = new Date(),
                MIN_DISTANCE = 100;

            body.off('touchmove');
            body.off('touchend');

            endX = e.originalEvent.changedTouches[0].pageX;
            endTime = e.originalEvent.timeStamp;

            dx = endX - startX;
            dt = endTime - startTime;

            speedX = dx / dt;

            stopDistance = speedX * speedX * 100;

            if (dx > 0) {
                stopDistance += parseInt(slider.css('left'), 10);
                stopDistance = (stopDistance > 0) ? 0 : stopDistance;

            } else {
                stopDistance = parseInt(slider.css('left'), 10) - stopDistance;
                stopDistance = (stopDistance < MAX_LEFT) ? MAX_LEFT : stopDistance;
            }

            slider.animate({'left': stopDistance}, {
                    duration: Math.abs(speedX) * 300,
                    step: function(now, fx){
                        var  currentTime, stepDuration,position, newLeft;
                        step++;

                        speedX *= (step / 100);

                        currentTime = new Date();
                        stepDuration = currentTime.getTime() - lastStepTime.getTime();
                        lastStepTime = currentTime;

                        position = slider.position();

                        newLeft = (position.left + (speedX * stepDuration / 4));

                        slider.css({
                            left: newLeft+"px"
                        });
                    }
                }
            )
        }

        function onPrevMouseDown (e) {
            isPrevMouseDown = true;

            if (parseInt(slider.css('left'), 10) < 0) {
                slider.animate({'left': (parseInt(slider.css('left'), 10) + self.options.speed) +'px'}, self.options.aniTime, onPrevAniFinish);
            }

            prev.unbind('mousedown');

            prev.bind('mouseup', function(e) {
                isPrevMouseDown = false;
                prev.unbind('mouseup');
                prev.bind('mousedown', onPrevMouseDown);
            });

            function onPrevAniFinish() {
                if(parseInt(slider.css('left'), 10) < 0 && isPrevMouseDown) {
                    slider.animate({'left': (parseInt(slider.css('left'), 10) + self.options.speed) +'px'}, self.options.aniTime, onPrevAniFinish);
                }
            }
        }

        function onNextMouseDown (e) {
            isNextMouseDown = true;
            if (parseInt(slider.css('left'), 10) > MAX_LEFT) {
                slider.animate({'left': (parseInt(slider.css('left') ,10) - self.options.speed) +'px'}, self.options.aniTime, onNextAniFinish);
            }

            next.unbind('mousedown');
            next.bind('mouseup', function (e) {
                isNextMouseDown = false;
                next.unbind('mouseup');
                next.bind('mousedown', onNextMouseDown);
            });

            function onNextAniFinish () {
                if(parseInt(slider.css('left'), 10) > MAX_LEFT && isNextMouseDown) {
                    slider.animate({'left': (parseInt(slider.css('left'), 10) - self.options.speed) +'px'}, self.options.aniTime, onNextAniFinish);
                }
            }
        }

        return this.slider;
    };


    /*
     * iosSwipe
     *custom jQuery horizontal swipe event for ios the Safari platform
     *usage - use just as you would a normal jQuery event:
     * ie. $(elem).bind('iosSwipe', function(e) {
     *      console.log(e.direction);
     * }
     *
     * @returns event object with the direction property set to either
     * 'right', or 'left' based on the direction of the swipe.
     */

    $.event.special.iosHorzSwipe = {

        config: {
            min_swipe_distance : 50
        },

        //called at event binding
        setup: function(data, namespaces) {
            this.touchStartEvent = (window.Touch) ? 'touchstart' : 'mousedown';
            this.touchMoveEvent = (window.Touch) ? 'touchmove' : 'mousemove';
            this.touchStopEvent = (window.Touch) ? 'touchend' : 'mouseup';

            this.MIN_SWIPE_DISTANCE  = $.event.special.iosHorzSwipe.config.min_swipe_distance;
            this.startX              = null;
            this.dx                  = null;
            this.direction           = null;

            var self = this,
                $el = $(self);

            $el.bind(this.touchStartEvent, $.event.special.iosHorzSwipe.onTouchStart);
        },

        //called at event unbinding
        teardown: function (namespaces) {
            var self = this,
                $el = $(self);

            $el.unbind(this.touchStartEvent, $.event.special.iosHorzSwipe.onTouchStart);
            $el.unbind(this.touchMoveEvent, $.event.special.iosHorzSwipe.onTouchMove);
            $el.unbind(this.touchStopEvent, $.event.special.iosHorzSwipe.onTouchEnd);

        },

        //add custom direction property to the event object
        add: function(handleObj) {
            // Save a reference to the bound event handler.
            var old_handler = handleObj.handler;

            // This function will now be called when the event is triggered,
            // instead of the bound event handler.
            handleObj.handler = function(e) {
                e.direction = this.direction;

                // Call the originally-bound event handler passing new arguments
                old_handler.apply(this, arguments);
            };
        },

        onTouchStart: function(e) {
            var self = this,
                $el = $(self);

            $el.bind(this.touchMoveEvent, $.event.special.iosHorzSwipe.onTouchMove);
            $el.bind(this.touchStopEvent, $.event.special.iosHorzSwipe.onTouchEnd);
            $el.unbind(this.touchStartEvent, $.event.special.iosHorzSwipe.onTouchStart);

            //don't register multitouches
            if(window.Touch) {
                if (e.originalEvent.targetTouches.length != 1) {
                    $el.unbind(this.touchMoveEvent, $.event.special.iosHorzSwipe.onTouchMove);
                    $el.unbind(this.touchStopEvent, $.event.special.iosHorzSwipe.onTouchEnd);
                    $el.bind(this.touchStartEvent, $.event.special.iosHorzSwipe.onTouchStart);
                    this.cleanUp();
                    return false;
                }
            }

            this.startX = (window.Touch) ? e.originalEvent.targetTouches[0].clientX : e.originalEvent.pageX;
        },

        onTouchMove: function(e) {
            var self = this,
                $el = $(this);
            //don't track multiple touches
            if(window.Touch) {
                if (e.originalEvent.targetTouches.length != 1) {
                    $el.unbind(this.touchMoveEvent, $.event.special.iosHorzSwipe.onTouchMove);
                    $el.unbind(this.touchStopEvent, $.event.special.iosHorzSwipe.onTouchEnd);
                    $el.bind(this.touchStartEvent, $.event.special.iosHorzSwipe.onTouchStart);
                    $.event.special.iosSwipe.cleanUp();
                    return false;
                } else {
                    e.preventDefault();
                    e.stopPropagation();
                }
            } else {
                e.preventDefault();
            }

            this.dx = (window.Touch) ? e.originalEvent.targetTouches[0].clientX - this.startX : e.originalEvent.pageX - this.startX;
        },

        onTouchEnd: function(e) {
            var self = this,
                $el = $(self);

            //handle swipe if the min distance is met
            if(Math.abs(this.dx) < this.MIN_SWIPE_DISTANCE) {
                $el.unbind(this.touchMoveEvent, $.event.special.iosHorzSwipe.onTouchMove);
                $el.unbind(this.touchStopEvent, $.event.special.iosHorzSwipe.onTouchEnd);
                $el.bind(this.touchStartEvent, $.event.special.iosHorzSwipe.onTouchStart);
                $.event.special.iosHorzSwipe.cleanUp();
                return false;
            } else {
                if (this.dx > 0){
                    this.direction = 'right';
                } else {
                    this.direction = 'left';
                }
                this.dx = null;
                //trigger call back function after addition above
                $el.trigger('iosHorzSwipe');
                $.event.special.iosHorzSwipe.cleanUp();
            }

            $el.unbind(this.touchMoveEvent, $.event.special.iosHorzSwipe.onTouchMove);
            $el.unbind(this.touchStopEvent, $.event.special.iosHorzSwipe.onTouchEnd);
            $el.bind(this.touchStartEvent, $.event.special.iosHorzSwipe.onTouchStart);
        },

        //reset values
        cleanUp: function(){
            this.startX = null;
            this.dx = null;
            this.direction = null;
        }
    };

    /*
     * iosTouchHold
     * custom jQuery touch and hold event for ios the Safari platform
     * @returns event object with jQuery reference to the tapped Object
     * usage - use just as you would a normal jQuery event:
     * ie. $(elem).bind('iosTouchHold', function(e) {
     *
     * }
     *
     */
    $.event.special.iosTouchHoldStart = {

        //called at event binding
        setup: function(data, namespaces) {
            console.log('touchStart');
            this.HOLD_TRIGGER_TIME = 800 //number of miliseconds to hold before triggering an iosTouchHold Event

            this.holdTimer = null;
            this.startTime = null;
            this.endTime = null;
            this.touchHoldFlag = false;

            this.touchStartEvent =  (window.Touch) ? "touchstart" : "mousedown";
            this.touchStopEvent =   (window.Touch) ? "touchend" : "mouseup";

            var self = this,
                $el = $(self);

            $el.bind(this.touchStartEvent, $.event.special.iosTouchHoldStart.onTouchStart);
            $el.bind(this.touchStopEvent, $.event.special.iosTouchHoldStart.onTouchEnd);
        },

        //called at event unbinding
        teardown: function (namespaces) {
            var self = this,
                $el = $(self);

            $el.unbind(this.touchStartEvent, $.event.special.iosTouchHoldStart.onTouchStart);
            $el.unbind(this.touchStopEvent, $.event.special.iosTouchHoldStart.onTouchEnd);

        },

        onTouchStart: function(e) {
            var self = this,
                $el = $(self);

            this.startTime = new Date().getTime();

            e.preventDefault();

            this.holdTimer = setTimeout(function(e){
                $el.trigger('iosTouchHoldStart');
                self.touchHoldFlag = true;
            }, this.HOLD_TRIGGER_TIME);

        },

        onTouchEnd: function(e) {
            var self = this,
                $el = $(self);

            this.endTime = new Date ().getTime();

            //check for minimum hold time
            var dt = this.endTime - this.startTime;
            //console.log(dt);
            if(dt < this.HOLD_TRIGGER_TIME) {
                clearTimeout(this.holdTimer);
                $el.trigger('click');
            }

            if(this.touchHoldFlag)  {
                $el.trigger('iosTouchHoldEnd');
            }

            $.event.special.iosTouchHoldStart.cleanUp();

        },

        //reset values
        cleanUp: function(){
            window.clearTimeout(this.holdTimer);
            this.holdTimer = null;
            this.startTime = null;
            this.endTime = null;
            this.touchHoldFlag = false;

        }
    };

    $.event.special.iosTouchHoldEnd = {

        //called at event binding
        setup: function(data, namespaces) {
            var $el = $(this),
                boundEvents = $.data($el.get(0), 'events'),
                isBound = boundEvents['iosTouchHoldStart'];

            //check to see if iosTouchStart is bound to object
            if(!isBound) {
                //delegate triggering iosTouchHoldEnd to iosTouchStart
                $el.bind('iosTouchHoldStart', function() {});
            }
        },

        //called at event unbinding
        teardown: function (namespaces) {

        }
    };

    /*
     * iosDoubleTap
     * custom jQuery doubletap event to fill in for ios's lack of support for
     * doubleclick event handling
     * fires a 'iosDoubleTap' event if two taps happen with in the span of timeMax
     * usage - use just as you would a normal jQuery event:
     * ie. $(elem).bind('iosDoubleTap', function(e) {
     *  //handler code here
     * }
     *
     */
    $.event.special.iosDoubleTap = {
        //called at event binding
        setup: function(data, namespaces) {
            this.clicktime = null;
            this.lastclick = null;
            this.timeMax = 500; // microseconds

            $(this).bind('touchend', $.event.special.iosDoubleTap.onTapEnd);
        },

        //called on event unbinding
        teardown: function (namespaces) {
            $(this).unbind('touchend', $.event.special.iosDoubleTap.onTapEnd);
        },

        onTapEnd: function(e) {
            var self = this,
                $el = $(self);

            e.preventDefault();

            var date = new Date();
            this.clicktime = date.getTime();

            if(this.lastclick === null) {
                //set timer to handle timeout before second tap
                this.holdTimer = setTimeout(function(e){
                    //min time for double click has expired pass click event back to target
                    $el.trigger('click');
                    self.lastclick = null;
                    self.clicktime = null;
                }, this.timeMax);
                //await second click
                this.lastclick = this.clicktime;
            } else {
                if (this.clicktime-this.lastclick <= this.timeMax) {
                    clearTimeout(this.holdTimer);
                    this.lastclick = null;
                    this.clicktime = null;

                    $(this).trigger('iosDoubleTap');
                }
                else {
                    alert('other');
                }
            }

        }
    }
})(jQuery);

//TODO add comments
(function($) {
    $.fn.setAnchorLink = function(link) {
        return this.each(function(){
            var $this = $(this);

            if(link == undefined || link =='') {
                $this.css("cursor", "default");
            } else {
                $this.attr('href', link);
                $this.css("cursor", "pointer");
            }

        });
    }
})(jQuery);

(function($) {
    $.fn.setAnchorTitle = function(title) {
        return this.each(function(){
            var $this = $(this);

            if(link == undefined || link =='') {
                $this.attr('title', "");
            } else {
                $this.attr('title', title);
            }
        });
    }
})(jQuery);

(function($){
    $.omitKeys = function(obj) {
        var temp = jQuery.extend({}, obj ),
            ArrProto = Array.prototype,
            keysToFilter =  ArrProto.concat.apply(ArrProto, ArrProto.slice.call(arguments, 1));

        $.each(keysToFilter, function(index, key) {
            if ( keysToFilter.hasOwnProperty(index) ) {
                if ( temp[key] ) {
                    delete temp[key];
                }
            }

        });

        return temp;
    }
})(jQuery);

(function($) {
    var defaults = {
        className: 'tb_tooltip',
        maxWidth: 300,
        speed: 10,
        fadeSpeed: 400,
        xOffset: 30,
        yOffset: -30
    };

    var tbtool = function (el, msg, options ) {
        this.settings = $.extend( {}, defaults, options );
        this.$el = $(el);
        this.tbtoolMain = $( '<div></div>' ).addClass( this.settings.className )
            .css({
                'position': 'absolute',
                'top'     : 0 + this.settings.yOffset + 'px',
                'left'    : 0 + this.settings.xOffset + 'px'
            });
        this.tbtoolTop = $( '<div></div>' ).addClass( this.settings.className + '_top' );
        this.tbtoolContent = $( '<div></div>' ).addClass( this.settings.className + '_content' ).html(msg);
        this.tbtoolBottom = $( '<div></div>' ).addClass( this.settings.className + '_bottom' );

        this.tbtoolMain.append(
            this.tbtoolTop,
            this.tbtoolContent,
            this.tbtoolBottom
        ).hide();

        $( 'body' ).append( this.tbtoolMain );

        //turn on event listeners
        this.turnOn();
    };

    tbtool.prototype = {
        tbshow: function( e ) {
            var root = this;
            this.tbtoolMain.fadeIn( root.settings.fadeSpeed );
            this.$el.on( 'mousemove', $.proxy(this.onMouseMove, this ));
        },

        tbhide: function( e ) {
            var root = this;
            this.tbtoolMain.fadeOut( root.settings.fadeSpeed );
            this.$el.off( 'mousemove' );
        },

        onMouseMove: function( e ) {
            this.tbtoolMain.css({
                'top': e.pageY + this.settings.yOffset + 'px',
                'left': e.pageX + this.settings.xOffset + 'px'
            });
        },

        turnOff: function () {
            this.$el.off( 'mouseover' );
            this.$el.off( 'mouseout' );
        },

        turnOn: function() {
            this.$el.on( 'mouseover', $.proxy( this.tbshow, this ));
            this.$el.on( 'mouseout', $.proxy( this.tbhide, this));
        }
    }

    $.fn.tbTooltip = function(msg, options) {
        return new tbtool(this, msg, options);
    }

})(jQuery);


(function( $ ) {
    $.fn.preventMultipleClicks = function() {
        var isPrevClicked = this.data( 'submit' ),
            self = this;

        this.click = function( e ) {
            if ( isPrevClicked ) {
                e.preventDefault();
            } else {
                self.data( 'submit', 'true' );
            }
        }
    }
})(jQuery);

/** Quick setup for jCarousel used throughout site
 * expected structure:
 * <div id="{name}">
 *     <ul>
 *         <li></li>...
 *     </ul>
 * </div>
 * no navigation is needed it will be added by the plugin,
 * click event handling, hover pause, and auto hiding of prev
 * and next button in certain cases is handled.
 **/
(function($) {
    "use strict";
    var defaults = {
        animation: 400,
        wrap: 'circular',
        vertical: false,
        useAutoScroll: false,
        autoScrollInterval: null,
        autoScrollTarget: '+=1',
        introAnimation: null,
        introAnimationDuration: 1200
    };

    $.fn.tbCarousel = function( options ) {
        //instantiate only once
        if (this.find( 'ul' ).eq(0).parent().data('jcarousel')) {
            return this.find( 'ul' ).parent();
        }

        var self;
        var wrapper = self = this;

        this.isCarouselStopped = false;

        /* DOM ELEMENTS */
        var listElement = wrapper.find( 'ul' ).eq(0);
        var listItems = listElement.find('li');

        var _carousel = $( '<div></div>' ).addClass( 'jcarousel' );
        var _controls = $( '<div></div>' ).addClass( 'jcarousel-controls' );
        var _prev = $( '<span></span>' ).addClass( 'carousel_prev').hide();
        var _next = $( '<span></span>' ).addClass( 'carousel_next').hide();

        /* options for configuring jCarousel */
        this.options = $.extend({}, defaults, options);

        //setup carousel DOM
        _controls.append( _prev, _next );
        listElement.wrap( _carousel );

        wrapper.append( _controls );

        switch (this.options.introAnimation) {
            case 'rightToLeft':
                var xOffset = -(parseInt(listItems.eq(0).css('width')) * (listItems.length));

                listElement.css({ 'left': xOffset });
                this.show();
                listElement.animate(
                    { left: 0 },
                    this.options.introAnimationDuration,
                    function () {
                        return setupCarousel();
                    }
                );
                break;

            case 'leftToRight':
                listElement.css({left: 0});
                this.show();
                listElement.animate(
                    { left: -(listItems.length) * parseInt(listItems.eq(0).css('width')) + parseInt(wrapper.css('width')) },
                    this.options.introAnimationDuration,
                    function() {
                        return setupCarousel()
                    }
                );
                break;
            default:
                return setupCarousel();
                break;
        }

        function setupCarousel() {
            var $carousel = listElement.parent('.jcarousel');

            //setup carousel
            $carousel.jcarousel({
                animation: self.options.animation,
                wrap: self.options.wrap
            });

            //pause carousel on hover
            wrapper.on('mouseover', function( e ) {
                $carousel.jcarouselAutoscroll( 'stop' );
            });

            wrapper.on('mouseout', function( e ) {
                if ( !wrapper.isCarouselStopped && self.options.useAutoScroll ){
                    $carousel.jcarouselAutoscroll( 'start' );
                }
            });

            //Carousel autoscroll setup
            $carousel.jcarouselAutoscroll({
                autostart: self.options.useAutoScroll ? true : false,
                interval: self.options.autoScrollInterval,
                target: self.options.autoScrollTarget
            });

            //Carousel controls setup
            _prev.click(function( e ) {
                $carousel.jcarousel( 'scroll', '-=1' );
                $carousel.jcarouselAutoscroll( 'stop' );
                self.isCarouselStopped = true;
                return false;
            });

            _next.click(function( e ) {
                $carousel.jcarousel( 'scroll', '+=1' );
                $carousel.jcarouselAutoscroll( 'stop' );
                self.isCarouselStopped = true;
                return false;
            });

            if (self.options.wrap !== 'circular' && self.options.wrap !== 'both') {
                var items = $carousel.jcarousel('items');

                switch (self.options.wrap) {
                    case 'first' :
                        _prev.show();
                        _next.show();

                        items.eq(items.length -1).bind('itemtargetin.jcarousel', function (e, carousel) {
                            _next.hide();
                        });

                        items.eq(items.length -1).bind('itemtargetout.jcarousel', function (e, carousel) {
                            _next.show();
                        });
                        break;
                    case 'last' :
                        _prev.hide();
                        _next.show();
                        $carousel.jcarousel('first').bind('itemtargetin.jcarousel', function (e, carousel) {
                            _prev.hide();
                        });

                        $carousel.jcarousel('first').bind('itemtargetout.jcarousel', function (e, carousel) {
                            _prev.show();
                        });
                        break;
                    case null :
                        //auto hide prev @ start
                        _prev.hide();
                        _next.show();

                        //hide prev button at start of carousel
                        $carousel.jcarousel('first').bind('itemtargetin.jcarousel', function (e, carousel) {
                            _prev.hide();
                        });

                        $carousel.jcarousel('first').bind('itemtargetout.jcarousel', function (e, carousel) {
                            _prev.show();
                        });

                        //hide next button at end of carousel
                        items.eq(items.length -1)
                            .bind('itemtargetin.jcarousel', function (e, carousel) {
                                _next.hide();
                            });
                        items.eq(items.length -1)
                            .bind('itemtargetout.jcarousel', function (e, carousel) {
                                _next.show();
                            });
                        break;
                    default:
                        break;
                }
            } else {
                _prev.show();
                _next.show();
            }

            return $carousel;
        }
        return listElement.parent('.jcarousel');
    }
})(jQuery);

(function($) {
    $.fn.validate = function(fn) {
        return this.each(function() {
            $(this).on('blur', function(e) {
                if (fn.call(this, $(e.currentTarget).val())) {
                    $(e.currentTarget).parent('div').css('color', 'inherit');
                } else {
                    $(e.currentTarget).parent('div').css('color', '#CC0000');
                }
            })
        })
    };
})(jQuery);

(function($) {
    $.fn.expandCollapse = function() {
        return this.each(function() {
            var $this = $(this);

            //immediately following node is our expandable content
            var expandCollapseContent = $this.next();
            var collapseData;

            if ($this.data('collapse')) {
                collapseData = $('<div></div>').data('collapse', $this.data('collapse'));
            }
            var expandData;

            var toggleTime = parseInt($this.data('toggleTime')) || 500;

            if (collapseData) {
                expandData = $this.data('expand', $($this.html()));
                expandCollapseContent.is(':visible') ? $this.html(collapseData.data('collapse').html()) : $.noop();
            }

            $this.on('click', function(e) {
                expandCollapseContent.toggleClass('hidden');
                if (collapseData) {
                    expandCollapseContent.is(':visible') ?
                        $this.html(collapseData.data('collapse').html()):
                        $this.html(expandData.data('expand').html());
                }
            });
        });
    };
})(jQuery);

(function($) {
    //content should have a jquery element named 'el' to render
    $.fn.tbTopNavPromoRender = function(content){
        if (content == null) return this;

        if (content instanceof Array) {
            content.forEach(function(promo) {
                this.append(promo.el.html());
            }, this);
            this.addClass("promos" + content.length);
        } else {
            this.append(content.el.html()).addClass("promos1");
        }

        //event hook
        this.data('ready', true);
        this.trigger('topnav-ready');
        return this;
    }
})(jQuery);
