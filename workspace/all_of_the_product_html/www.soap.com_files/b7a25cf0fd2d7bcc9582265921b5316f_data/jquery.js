/****** jquery/jquery.carousel/jquery.jcarousel.js ******/

/**
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function($) {
    /**
     * Creates a carousel for all matched elements.
     *
     * @example $("#mycarousel").jcarousel();
     * @before <ul id="mycarousel" class="jcarousel-skin-name"><li>First item</li><li>Second item</li></ul>
     * @result
     *
     * <div class="jcarousel-skin-name">
     *   <div class="jcarousel-container">
     *     <div disabled="disabled" class="jcarousel-prev jcarousel-prev-disabled"></div>
     *     <div class="jcarousel-next"></div>
     *     <div class="jcarousel-clip">
     *       <ul class="jcarousel-list">
     *         <li class="jcarousel-item-1">First item</li>
     *         <li class="jcarousel-item-2">Second item</li>
     *       </ul>
     *     </div>
     *   </div>
     * </div>
     *
     * @name jcarousel
     * @type jQuery
     * @param Hash o A set of key/value pairs to set as configuration properties.
     * @cat Plugins/jCarousel
     */
    $.fn.jcarousel = function(o) {
        return this.each(function() {
            new $jc(this, o);
        });
    };

    // Default configuration properties.
    var defaults = {
        vertical: false,
        start: 1,
        offset: 1,
        size: null,
        scroll: 3,
        visible: null,
        animation: 'normal',
        easing: 'swing',
        auto: 0,
        wrap: null,
        initCallback: null,
        reloadCallback: null,
        itemLoadCallback: null,
        itemFirstInCallback: null,
        itemFirstOutCallback: null,
        itemLastInCallback: null,
        itemLastOutCallback: null,
        itemVisibleInCallback: null,
        itemVisibleOutCallback: null,
        buttonNextHTML: '<div></div>',
        buttonPrevHTML: '<div></div>',
        buttonNextEvent: 'click',
        buttonPrevEvent: 'click',
        buttonNextCallback: null,
        buttonPrevCallback: null
    };

    /**
     * The jCarousel object.
     *
     * @constructor
     * @name $.jcarousel
     * @param Object e The element to create the carousel for.
     * @param Hash o A set of key/value pairs to set as configuration properties.
     * @cat Plugins/jCarousel
     */
    $.jcarousel = function(e, o) {
        this.options    = $.extend({}, defaults, o || {});

        this.locked     = false;

        this.container  = null;
        this.clip       = null;
        this.list       = null;
        this.buttonNext = null;
        this.buttonPrev = null;

        this.wh = !this.options.vertical ? 'width' : 'height';
        this.lt = !this.options.vertical ? 'left' : 'top';

        // Extract skin class
        var skin = '', split = e.className.split(' ');

        for (var i = 0; i < split.length; i++) {
            if (split[i].indexOf('jcarousel-skin') != -1) {
                $(e).removeClass(split[i]);
                var skin = split[i];
                break;
            }
        }

        if (e.nodeName == 'UL' || e.nodeName == 'OL') {
            this.list = $(e);
            this.container = this.list.parent();

            if (this.container.hasClass('jcarousel-clip')) {
                if (!this.container.parent().hasClass('jcarousel-container'))
                    this.container = this.container.wrap('<div></div>');

                this.container = this.container.parent();
            } else if (!this.container.hasClass('jcarousel-container'))
                this.container = this.list.wrap('<div></div>').parent();
        } else {
            this.container = $(e);
            this.list = $(e).find('>ul,>ol,div>ul,div>ol');
        }

        if (skin != '' && this.container.parent()[0].className.indexOf('jcarousel-skin') == -1)
        	this.container.wrap('<div class=" '+ skin + '"></div>');

        this.clip = this.list.parent();

        if (!this.clip.length || !this.clip.hasClass('jcarousel-clip'))
            this.clip = this.list.wrap('<div></div>').parent();

        this.buttonPrev = $('.jcarousel-prev', this.container);

        if (this.buttonPrev.size() == 0 && this.options.buttonPrevHTML != null)
            this.buttonPrev = this.clip.before(this.options.buttonPrevHTML).prev();

        this.buttonPrev.addClass(this.className('jcarousel-prev'));

        this.buttonNext = $('.jcarousel-next', this.container);

        if (this.buttonNext.size() == 0 && this.options.buttonNextHTML != null)
            this.buttonNext = this.clip.before(this.options.buttonNextHTML).prev();

        this.buttonNext.addClass(this.className('jcarousel-next'));

        this.clip.addClass(this.className('jcarousel-clip'));
        this.list.addClass(this.className('jcarousel-list'));
        this.container.addClass(this.className('jcarousel-container'));

        var di = this.options.visible != null ? Math.ceil(this.clipping() / this.options.visible) : null;
        var li = this.list.children('li');

        var self = this;

        if (li.size() > 0) {
            var wh = 0, i = this.options.offset;
            li.each(function() {
                self.format(this, i++);
                wh += self.dimension(this, di);
            });

            this.list.css(this.wh, wh + 'px');

            // Only set if not explicitly passed as option
            if (!o || o.size === undefined)
                this.options.size = li.size();
        }

        // For whatever reason, .show() does not work in Safari...
        this.container.css('display', 'block');
        this.buttonNext.css('display', 'block');
        this.buttonPrev.css('display', 'block');

        this.funcNext   = function() { self.next(); };
        this.funcPrev   = function() { self.prev(); };
        this.funcResize = function() { self.reload(); };

        if (this.options.initCallback != null)
            this.options.initCallback(this, 'init');

        if ($.browser.safari) {
            this.buttons(false, false);
            $(window).bind('load', function() { self.setup(); });
        } else
            this.setup();
    };

    // Create shortcut for internal use
    var $jc = $.jcarousel;

    $jc.fn = $jc.prototype = {
        jcarousel: '0.2.3'
    };

    $jc.fn.extend = $jc.extend = $.extend;

    $jc.fn.extend({
        /**
         * Setups the carousel.
         *
         * @name setup
         * @type undefined
         * @cat Plugins/jCarousel
         */
        setup: function() {
            this.first     = null;
            this.last      = null;
            this.prevFirst = null;
            this.prevLast  = null;
            this.animating = false;
            this.timer     = null;
            this.tail      = null;
            this.inTail    = false;

            if (this.locked)
                return;

            this.list.css(this.lt, this.pos(this.options.offset) + 'px');
            var p = this.pos(this.options.start);
            this.prevFirst = this.prevLast = null;
            this.animate(p, false);

            //$(window).unbind('resize', this.funcResize).bind('resize', this.funcResize);
        },

        /**
         * Clears the list and resets the carousel.
         *
         * @name reset
         * @type undefined
         * @cat Plugins/jCarousel
         */
        reset: function() {
            this.list.empty();

            this.list.css(this.lt, '0px');
            this.list.css(this.wh, '10px');

            if (this.options.initCallback != null)
                this.options.initCallback(this, 'reset');

            this.setup();
        },

        /**
         * Reloads the carousel and adjusts positions.
         *
         * @name reload
         * @type undefined
         * @cat Plugins/jCarousel
         */
        reload: function() {
            if (this.tail != null && this.inTail)
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + this.tail);

            this.tail   = null;
            this.inTail = false;

            if (this.options.reloadCallback != null)
                this.options.reloadCallback(this);

            if (this.options.visible != null) {
                var self = this;
                var di = Math.ceil(this.clipping() / this.options.visible), wh = 0, lt = 0;
                $('li', this.list).each(function(i) {
                    wh += self.dimension(this, di);
                    if (i + 1 < self.first)
                        lt = wh;
                });

                this.list.css(this.wh, wh + 'px');
                this.list.css(this.lt, -lt + 'px');
            }

            this.scroll(this.first, false);
        },

        /**
         * Locks the carousel.
         *
         * @name lock
         * @type undefined
         * @cat Plugins/jCarousel
         */
        lock: function() {
            this.locked = true;
            this.buttons();
        },

        /**
         * Unlocks the carousel.
         *
         * @name unlock
         * @type undefined
         * @cat Plugins/jCarousel
         */
        unlock: function() {
            this.locked = false;
            this.buttons();
        },

        /**
         * Sets the size of the carousel.
         *
         * @name size
         * @type undefined
         * @param Number s The size of the carousel.
         * @cat Plugins/jCarousel
         */
        size: function(s) {
            if (s != undefined) {
                this.options.size = s;
                if (!this.locked)
                    this.buttons();
            }

            return this.options.size;
        },

        /**
         * Checks whether a list element exists for the given index (or index range).
         *
         * @name get
         * @type bool
         * @param Number i The index of the (first) element.
         * @param Number i2 The index of the last element.
         * @cat Plugins/jCarousel
         */
        has: function(i, i2) {
            if (i2 == undefined || !i2)
                i2 = i;

            if (this.options.size !== null && i2 > this.options.size)
            	i2 = this.options.size;

            for (var j = i; j <= i2; j++) {
                var e = this.get(j);
                if (!e.length || e.hasClass('jcarousel-item-placeholder'))
                    return false;
            }

            return true;
        },

        /**
         * Returns a jQuery object with list element for the given index.
         *
         * @name get
         * @type jQuery
         * @param Number i The index of the element.
         * @cat Plugins/jCarousel
         */
        get: function(i) {
            return $('.jcarousel-item-' + i, this.list);
        },

        /**
         * Adds an element for the given index to the list.
         * If the element already exists, it updates the inner html.
         * Returns the created element as jQuery object.
         *
         * @name add
         * @type jQuery
         * @param Number i The index of the element.
         * @param String s The innerHTML of the element.
         * @cat Plugins/jCarousel
         */
        add: function(i, s) {
            var e = this.get(i), old = 0, add = 0;

            if (e.length == 0) {
                var c, e = this.create(i), j = $jc.intval(i);
                while (c = this.get(--j)) {
                    if (j <= 0 || c.length) {
                        j <= 0 ? this.list.prepend(e) : c.after(e);
                        break;
                    }
                }
            } else
                old = this.dimension(e);

            e.removeClass(this.className('jcarousel-item-placeholder'));
            typeof s == 'string' ? e.html(s) : e.empty().append(s);

            var di = this.options.visible != null ? Math.ceil(this.clipping() / this.options.visible) : null;
            var wh = this.dimension(e, di) - old;

            if (i > 0 && i < this.first)
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - wh + 'px');

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) + wh + 'px');

            return e;
        },

        /**
         * Removes an element for the given index from the list.
         *
         * @name remove
         * @type undefined
         * @param Number i The index of the element.
         * @cat Plugins/jCarousel
         */
        remove: function(i) {
            var e = this.get(i);

            // Check if item exists and is not currently visible
            if (!e.length || (i >= this.first && i <= this.last))
                return;

            var d = this.dimension(e);

            if (i < this.first)
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + d + 'px');

            e.remove();

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) - d + 'px');
        },

        /**
         * Moves the carousel forwards.
         *
         * @name next
         * @type undefined
         * @cat Plugins/jCarousel
         */
        next: function() {
            this.stopAuto();

            if (this.tail != null && !this.inTail)
                this.scrollTail(false);
            else
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'last') && this.options.size != null && this.last == this.options.size) ? 1 : this.first + this.options.scroll);
        },

        /**
         * Moves the carousel backwards.
         *
         * @name prev
         * @type undefined
         * @cat Plugins/jCarousel
         */
        prev: function() {
            this.stopAuto();

            if (this.tail != null && this.inTail)
                this.scrollTail(true);
            else
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'first') && this.options.size != null && this.first == 1) ? this.options.size : this.first - this.options.scroll);
        },

        /**
         * Scrolls the tail of the carousel.
         *
         * @name scrollTail
         * @type undefined
         * @param Bool b Whether scroll the tail back or forward.
         * @cat Plugins/jCarousel
         */
        scrollTail: function(b) {
            if (this.locked || this.animating || !this.tail)
                return;

            var pos  = $jc.intval(this.list.css(this.lt));

            !b ? pos -= this.tail : pos += this.tail;
            this.inTail = !b;

            // Save for callbacks
            this.prevFirst = this.first;
            this.prevLast  = this.last;

            this.animate(pos);
        },

        /**
         * Scrolls the carousel to a certain position.
         *
         * @name scroll
         * @type undefined
         * @param Number i The index of the element to scoll to.
         * @param Bool a Flag indicating whether to perform animation.
         * @cat Plugins/jCarousel
         */
        scroll: function(i, a) {
            if (this.locked || this.animating)
                return;

            this.animate(this.pos(i), a);
        },

        /**
         * Prepares the carousel and return the position for a certian index.
         *
         * @name pos
         * @type Number
         * @param Number i The index of the element to scoll to.
         * @cat Plugins/jCarousel
         */
        pos: function(i) {
            if (this.locked || this.animating)
                return;

            if (this.options.wrap != 'circular')
                i = i < 1 ? 1 : (this.options.size && i > this.options.size ? this.options.size : i);

            var back = this.first > i;
            var pos  = $jc.intval(this.list.css(this.lt));

            // Create placeholders, new list width/height
            // and new list position
            var f = this.options.wrap != 'circular' && this.first <= 1 ? 1 : this.first;
            var c = back ? this.get(f) : this.get(this.last);
            var j = back ? f : f - 1;
            var e = null, l = 0, p = false, d = 0;

            while (back ? --j >= i : ++j < i) {
                e = this.get(j);
                p = !e.length;
                if (e.length == 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    c[back ? 'before' : 'after' ](e);
                }

                c = e;
                d = this.dimension(e);

                if (p)
                    l += d;

                if (this.first != null && (this.options.wrap == 'circular' || (j >= 1 && (this.options.size == null || j <= this.options.size))))
                    pos = back ? pos + d : pos - d;
            }

            // Calculate visible items
            var clipping = this.clipping();
            var cache = [];
            var visible = 0, j = i, v = 0;
            var c = this.get(i - 1);

            while (++visible) {
                e = this.get(j);
                p = !e.length;
                if (e.length == 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    // This should only happen on a next scroll
                    c.length == 0 ? this.list.prepend(e) : c[back ? 'before' : 'after' ](e);
                }

                c = e;
                var d = this.dimension(e);
                if (d == 0) {
                    return 0;
                }
                if (this.options.wrap != 'circular' && this.options.size !== null && j > this.options.size)
                    cache.push(e);
                else if (p)
                    l += d;

                v += d;

                if (v >= clipping)
                    break;

                j++;
            }

             // Remove out-of-range placeholders
            for (var x = 0; x < cache.length; x++)
                cache[x].remove();

            // Resize list
            if (l > 0) {
                this.list.css(this.wh, this.dimension(this.list) + l + 'px');

                if (back) {
                    pos -= l;
                    this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - l + 'px');
                }
            }

            // Calculate first and last item
            var last = i + visible - 1;
            if (this.options.wrap != 'circular' && this.options.size && last > this.options.size)
                last = this.options.size;

            if (j > last) {
                visible = 0, j = last, v = 0;
                while (++visible) {
                    var e = this.get(j--);
                    if (!e.length)
                        break;
                    v += this.dimension(e);
                    if (v >= clipping)
                        break;
                }
            }

            var first = last - visible + 1;
            if (this.options.wrap != 'circular' && first < 1)
                first = 1;

            if (this.inTail && back) {
                pos += this.tail;
                this.inTail = false;
            }

            this.tail = null;
            if (this.options.wrap != 'circular' && last == this.options.size && (last - visible + 1) >= 1) {
                var m = $jc.margin(this.get(last), !this.options.vertical ? 'marginRight' : 'marginBottom');
                if ((v - m) > clipping)
                    this.tail = v - clipping - m;
            }

            // Adjust position
            while (i-- > first)
                pos += this.dimension(this.get(i));

            // Save visible item range
            this.prevFirst = this.first;
            this.prevLast  = this.last;
            this.first     = first;
            this.last      = last;

            return pos;
        },

        /**
         * Animates the carousel to a certain position.
         *
         * @name animate
         * @type undefined
         * @param mixed p Position to scroll to.
         * @param Bool a Flag indicating whether to perform animation.
         * @cat Plugins/jCarousel
         */
        animate: function(p, a) {
            if (this.locked || this.animating)
                return;

            this.animating = true;

            var self = this;
            var scrolled = function() {
                self.animating = false;

                if (p == 0)
                    self.list.css(self.lt,  0);

                if (self.options.wrap == 'both' || self.options.wrap == 'last' || self.options.size == null || self.last < self.options.size)
                    self.startAuto();

                self.buttons();
                self.notify('onAfterAnimation');
            };

            this.notify('onBeforeAnimation');

            // Animate
            if (!this.options.animation || a == false) {
                this.list.css(this.lt, p + 'px');
                scrolled();
            } else {
                var o = !this.options.vertical ? {'left': p} : {'top': p};
                this.list.animate(o, this.options.animation, this.options.easing, scrolled);
            }
        },

        /**
         * Starts autoscrolling.
         *
         * @name auto
         * @type undefined
         * @param Number s Seconds to periodically autoscroll the content.
         * @cat Plugins/jCarousel
         */
        startAuto: function(s) {
            if (s != undefined)
                this.options.auto = s;

            if (this.options.auto == 0)
                return this.stopAuto();

            if (this.timer != null)
                return;

            var self = this;
            this.timer = setTimeout(function() { self.next(); }, this.options.auto * 1000);
        },

        /**
         * Stops autoscrolling.
         *
         * @name stopAuto
         * @type undefined
         * @cat Plugins/jCarousel
         */
        stopAuto: function() {
            if (this.timer == null)
                return;

            clearTimeout(this.timer);
            this.timer = null;
        },

        /**
         * Sets the states of the prev/next buttons.
         *
         * @name buttons
         * @type undefined
         * @cat Plugins/jCarousel
         */
        buttons: function(n, p) {
            if (n == undefined || n == null) {
                var n = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'first') || this.options.size == null || this.last < this.options.size);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'first') && this.options.size != null && this.last >= this.options.size)
                    n = this.tail != null && !this.inTail;
            }

            if (p == undefined || p == null) {
                var p = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'last') || this.first > 1);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'last') && this.options.size != null && this.first == 1)
                    p = this.tail != null && this.inTail;
            }

            var self = this;

            this.buttonNext[n ? 'bind' : 'unbind'](this.options.buttonNextEvent, this.funcNext)[n ? 'removeClass' : 'addClass'](this.className('jcarousel-next-disabled')).attr('disabled', n ? false : true);
            this.buttonPrev[p ? 'bind' : 'unbind'](this.options.buttonPrevEvent, this.funcPrev)[p ? 'removeClass' : 'addClass'](this.className('jcarousel-prev-disabled')).attr('disabled', p ? false : true);

            if (this.buttonNext.length > 0 && (this.buttonNext[0].jcarouselstate == undefined || this.buttonNext[0].jcarouselstate != n) && this.options.buttonNextCallback != null) {
                this.buttonNext.each(function() { self.options.buttonNextCallback(self, this, n); });
                this.buttonNext[0].jcarouselstate = n;
            }

            if (this.buttonPrev.length > 0 && (this.buttonPrev[0].jcarouselstate == undefined || this.buttonPrev[0].jcarouselstate != p) && this.options.buttonPrevCallback != null) {
                this.buttonPrev.each(function() { self.options.buttonPrevCallback(self, this, p); });
                this.buttonPrev[0].jcarouselstate = p;
            }
        },

        notify: function(evt) {
            var state = this.prevFirst == null ? 'init' : (this.prevFirst < this.first ? 'next' : 'prev');

            // Load items
            this.callback('itemLoadCallback', evt, state);

            if (this.prevFirst !== this.first) {
                this.callback('itemFirstInCallback', evt, state, this.first);
                this.callback('itemFirstOutCallback', evt, state, this.prevFirst);
            }

            if (this.prevLast !== this.last) {
                this.callback('itemLastInCallback', evt, state, this.last);
                this.callback('itemLastOutCallback', evt, state, this.prevLast);
            }

            this.callback('itemVisibleInCallback', evt, state, this.first, this.last, this.prevFirst, this.prevLast);
            this.callback('itemVisibleOutCallback', evt, state, this.prevFirst, this.prevLast, this.first, this.last);
        },

        callback: function(cb, evt, state, i1, i2, i3, i4) {
            if (this.options[cb] == undefined || (typeof this.options[cb] != 'object' && evt != 'onAfterAnimation'))
                return;

            var callback = typeof this.options[cb] == 'object' ? this.options[cb][evt] : this.options[cb];

            if (!$.isFunction(callback))
                return;

            var self = this;

            if (i1 === undefined)
                callback(self, state, evt);
            else if (i2 === undefined)
                this.get(i1).each(function() { callback(self, this, i1, state, evt); });
            else {
                for (var i = i1; i <= i2; i++)
                    if (i !== null && !(i >= i3 && i <= i4))
                        this.get(i).each(function() { callback(self, this, i, state, evt); });
            }
        },

        create: function(i) {
            return this.format('<li></li>', i);
        },

        format: function(e, i) {
            var $e = $(e).addClass(this.className('jcarousel-item')).addClass(this.className('jcarousel-item-' + i));
            $e.attr('jcarouselindex', i);
            return $e;
        },

        className: function(c) {
            return c + ' ' + c + (!this.options.vertical ? '-horizontal' : '-vertical');
        },

        dimension: function(e, d) {
            var el = e.jquery != undefined ? e[0] : e;

            var old = !this.options.vertical ?
                el.offsetWidth + $jc.margin(el, 'marginLeft') + $jc.margin(el, 'marginRight') :
                el.offsetHeight + $jc.margin(el, 'marginTop') + $jc.margin(el, 'marginBottom');

            if (d == undefined || old == d)
                return old;

            var w = !this.options.vertical ?
                d - $jc.margin(el, 'marginLeft') - $jc.margin(el, 'marginRight') :
                d - $jc.margin(el, 'marginTop') - $jc.margin(el, 'marginBottom');

            $(el).css(this.wh, w + 'px');
            return this.dimension(el);
        },

        clipping: function() {
            return !this.options.vertical ?
                this.clip[0].offsetWidth - $jc.intval(this.clip.css('borderLeftWidth')) - $jc.intval(this.clip.css('borderRightWidth')) :
                this.clip[0].offsetHeight - $jc.intval(this.clip.css('borderTopWidth')) - $jc.intval(this.clip.css('borderBottomWidth'));
        },

        index: function(i, s) {
            if (s == undefined)
                s = this.options.size;

            return Math.round((((i-1) / s) - Math.floor((i-1) / s)) * s) + 1;
        }
    });

    $jc.extend({
        /**
         * Gets/Sets the global default configuration properties.
         *
         * @name defaults
         * @descr Gets/Sets the global default configuration properties.
         * @type Hash
         * @param Hash d A set of key/value pairs to set as configuration properties.
         * @cat Plugins/jCarousel
         */
        defaults: function(d) {
            return $.extend(defaults, d || {});
        },

        margin: function(e, p) {
            if (!e)
                return 0;

            var el = e.jquery != undefined ? e[0] : e;

            if (p == 'marginRight' && $.browser.safari) {
                var old = {'display': 'block', 'float': 'none', 'width': 'auto'}, oWidth, oWidth2;

                $.swap(el, old, function() { oWidth = el.offsetWidth; });

                old['marginRight'] = 0;
                $.swap(el, old, function() { oWidth2 = el.offsetWidth; });

                return oWidth2 - oWidth;
            }

            return $jc.intval($.css(el, p));
        },

        intval: function(v) {
            v = parseInt(v);
            return isNaN(v) ? 0 : v;
        }
    });

})(jQuery);

/****** jquery/jquery.md5.js ******/

	
	/**
	 * jQuery MD5 hash algorithm function
	 * 
	 * 	<code>
	 * 		Calculate the md5 hash of a String 
	 * 		String $.md5 ( String str )
	 * 	</code>
	 * 
	 * Calculates the MD5 hash of str using the » RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash. 
	 * MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data.
	 * MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1.
	 * This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
	 * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
	 * 
	 * Example
	 * 	Code
	 * 		<code>
	 * 			$.md5("I'm Persian."); 
	 * 		</code>
	 * 	Result
	 * 		<code>
	 * 			"b8c901d0f02223f9761016cfff9d68df"
	 * 		</code>
	 * 
	 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
	 * @link http://www.semnanweb.com/jquery-plugin/md5.html
	 * @see http://www.webtoolkit.info/
	 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
	 * @param {jQuery} {md5:function(string))
	 * @return string
	 */
	
	(function($){
		
		var rotateLeft = function(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}
		
		var addUnsigned = function(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			if (lX4 | lY4) {
				if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}
		
		var F = function(x, y, z) {
			return (x & y) | ((~ x) & z);
		}
		
		var G = function(x, y, z) {
			return (x & z) | (y & (~ z));
		}
		
		var H = function(x, y, z) {
			return (x ^ y ^ z);
		}
		
		var I = function(x, y, z) {
			return (y ^ (x | (~ z)));
		}
		
		var FF = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var GG = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var HH = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var II = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var convertToWordArray = function(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWordsTempOne = lMessageLength + 8;
			var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
			var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		};
		
		var wordToHex = function(lValue) {
			var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValueTemp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
			}
			return WordToHexValue;
		};
		
		var uTF8Encode = function(string) {
			string = string.replace(/\x0d\x0a/g, "\x0a");
			var output = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					output += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					output += String.fromCharCode((c >> 6) | 192);
					output += String.fromCharCode((c & 63) | 128);
				} else {
					output += String.fromCharCode((c >> 12) | 224);
					output += String.fromCharCode(((c >> 6) & 63) | 128);
					output += String.fromCharCode((c & 63) | 128);
				}
			}
			return output;
		};
		
		$.extend({
			md5: function(string) {
				var x = Array();
				var k, AA, BB, CC, DD, a, b, c, d;
				var S11=7, S12=12, S13=17, S14=22;
				var S21=5, S22=9 , S23=14, S24=20;
				var S31=4, S32=11, S33=16, S34=23;
				var S41=6, S42=10, S43=15, S44=21;
				string = uTF8Encode(string);
				x = convertToWordArray(string);
				a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
				for (k = 0; k < x.length; k += 16) {
					AA = a; BB = b; CC = c; DD = d;
					a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
					d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
					c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
					b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
					a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
					d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
					c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
					b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
					a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
					d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
					c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
					b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
					a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
					d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
					c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
					b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
					a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
					d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
					c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
					b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
					a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
					d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
					c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
					b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
					a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
					d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
					c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
					b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
					a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
					d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
					c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
					b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
					a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
					d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
					c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
					b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
					a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
					d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
					c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
					b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
					a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
					d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
					c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
					b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
					a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
					d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
					c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
					b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
					a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
					d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
					c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
					b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
					a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
					d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
					c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
					b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
					a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
					d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
					c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
					b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
					a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
					d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
					c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
					b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
					a = addUnsigned(a, AA);
					b = addUnsigned(b, BB);
					c = addUnsigned(c, CC);
					d = addUnsigned(d, DD);
				}
				var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
				return tempValue.toLowerCase();
			}
		});
	})(jQuery);;

/****** mediaPlayer/swfobject.js ******/

/**
 * SWFObject v1.5.1: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept == "undefined") var deconcept = {};
if(typeof deconcept.util == "undefined") deconcept.util = {};
if(typeof deconcept.SWFObjectUtil == "undefined") deconcept.SWFObjectUtil = {};
deconcept.SWFObject = function(swf, id, w, h, ver, c, quality, xiRedirectUrl, redirectUrl, detectKey) {
	if (!document.getElementById) { return; }
	this.DETECT_KEY = detectKey ? detectKey : 'detectflash';
	this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params = {};
	this.variables = {};
	this.attributes = [];
	if(swf) { this.setAttribute('swf', swf); }
	if(id) { this.setAttribute('id', id); }
	if(w) { this.setAttribute('width', w); }
	if(h) { this.setAttribute('height', h); }
	if(ver) { this.setAttribute('version', new deconcept.PlayerVersion(ver.toString().split("."))); }
	this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
	if (!window.opera && document.all && this.installedVer.major > 9) {
		// only add the onunload cleanup if the Flash Player version supports External Interface and we are in IE
		// fixes bug in some fp9 versions see http://blog.deconcept.com/2006/07/28/swfobject-143-released/
		if (!deconcept.unloadSet) {
			deconcept.SWFObjectUtil.prepUnload = function() {
				__flash_unloadHandler = function(){};
				__flash_savedUnloadHandler = function(){};
				window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs);
			}
			window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
			deconcept.unloadSet = true;
		}
	}
	if(c) { this.addParam('bgcolor', c); }
	var q = quality ? quality : 'high';
	this.addParam('quality', q);
	this.setAttribute('useExpressInstall', false);
	this.setAttribute('doExpressInstall', false);
	var xir = (xiRedirectUrl) ? xiRedirectUrl : window.location;
	this.setAttribute('xiRedirectUrl', xir);
	this.setAttribute('redirectUrl', '');
	if(redirectUrl) { this.setAttribute('redirectUrl', redirectUrl); }
}
deconcept.SWFObject.prototype = {
	useExpressInstall: function(path) {
		this.xiSWFPath = !path ? "expressinstall.swf" : path;
		this.setAttribute('useExpressInstall', true);
	},
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name] || "";
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name] || "";
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = [];
		var key;
		var variables = this.getVariables();
		for(key in variables){
			variablePairs[variablePairs.length] = key +"="+ variables[key];
		}
		return variablePairs;
	},
	getSWFHTML: function() {
		var swfNode = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { // netscape plugin architecture
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "PlugIn");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ (this.getAttribute('style') || "") +'"';
			swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
			var params = this.getParams();
			 for(var key in params){ swfNode += [key] +'="'+ params[key] +'" '; }
			var pairs = this.getVariablePairs().join("&");
			 if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
			swfNode += '/>';
		} else { // PC IE
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "ActiveX");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ (this.getAttribute('style') || "") +'">';
			swfNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />';
			var params = this.getParams();
			for(var key in params) {
			 swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
			}
			var pairs = this.getVariablePairs().join("&");
			if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
			swfNode += "</object>";
		}
		return swfNode;
	},
	write: function(elementId){
		if(this.getAttribute('useExpressInstall')) {
			// check to see if we need to do an express install
			var expressInstallReqVer = new deconcept.PlayerVersion([6,0,65]);
			if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
				this.setAttribute('doExpressInstall', true);
				this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
				document.title = document.title.slice(0, 47) + " - Flash Player Installation";
				this.addVariable("MMdoctitle", document.title);
			}
		}
		if(this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))){
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
			n.innerHTML = this.getSWFHTML();
			return true;
		}else{
			if(this.getAttribute('redirectUrl') != "") {
				document.location.replace(this.getAttribute('redirectUrl'));
			}
		}
		return false;
	}
}

/* ---- detection functions ---- */
deconcept.SWFObjectUtil.getPlayerVersion = function(){
	var PlayerVersion = new deconcept.PlayerVersion([0,0,0]);
	if(navigator.plugins && navigator.mimeTypes.length){
		var x = navigator.plugins["Shockwave Flash"];
		if(x && x.description) {
			PlayerVersion = new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	}else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0){ // if Windows CE
		var axo = 1;
		var counter = 3;
		while(axo) {
			try {
				counter++;
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+ counter);
//				document.write("player v: "+ counter);
				PlayerVersion = new deconcept.PlayerVersion([counter,0,0]);
			} catch (e) {
				axo = null;
			}
		}
	} else { // Win IE (non mobile)
		// do minor version lookup in IE, but avoid fp6 crashing issues
		// see http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
		try{
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}catch(e){
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				PlayerVersion = new deconcept.PlayerVersion([6,0,21]);
				axo.AllowScriptAccess = "always"; // error if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this code)
			} catch(e) {
				if (PlayerVersion.major == 6) {
					return PlayerVersion;
				}
			}
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			} catch(e) {}
		}
		if (axo != null) {
			PlayerVersion = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
		}
	}
	return PlayerVersion;
}
deconcept.PlayerVersion = function(arrVersion){
	this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
	this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0;
}
deconcept.PlayerVersion.prototype.versionIsValid = function(fv){
	if(this.major < fv.major) return false;
	if(this.major > fv.major) return true;
	if(this.minor < fv.minor) return false;
	if(this.minor > fv.minor) return true;
	if(this.rev < fv.rev) return false;
	return true;
}
/* ---- get value of query string param ---- */
deconcept.util = {
	getRequestParameter: function(param) {
		var q = document.location.search || document.location.hash;
		if (param == null) { return q; }
		if(q) {
			var pairs = q.substring(1).split("&");
			for (var i=0; i < pairs.length; i++) {
				if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
					return pairs[i].substring((pairs[i].indexOf("=")+1));
				}
			}
		}
		return "";
	}
}
/* fix for video streaming bug */
deconcept.SWFObjectUtil.cleanupSWFs = function() {
	var objects = document.getElementsByTagName("OBJECT");
	for (var i = objects.length - 1; i >= 0; i--) {
		objects[i].style.display = 'none';
		for (var x in objects[i]) {
			if (typeof objects[i][x] == 'function') {
				objects[i][x] = function(){};
			}
		}
	}
}
/* add document.getElementById if needed (mobile IE < 5) */
if (!document.getElementById && document.all) { document.getElementById = function(id) { return document.all[id]; }}

/* add some aliases for ease of use/backwards compatibility */
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject; // for legacy support
var SWFObject = deconcept.SWFObject;;

/****** mediaPlayer/player.js ******/


(function($)
{
	function log(msg)
	{
//		if(console && console.log) {
//			console.log(msg);
//		}
	}
	
    jQuery.media = jQuery.media ? jQuery.media : {};
    jQuery.media.player = {};
    jQuery.media.plugins = {};

    mp_playPause = function(){ jQuery.media.player.playPause(); }
    mp_load = function(vid,auto){
    	var s = jQuery.media.settings;

		var _a = (auto == true)? "&autoplay=true" : "";

    	if(s.require_reload) {
    		window.location = "/video/embed/"+vid+"/"+s.key+"?ratio="+s.ratio+_a;
    	}
    	else {
	    	$.ajax({
	            type: "GET",
	            url: "/video/embed/"+vid+"/"+s.key+"?ratio="+s.ratio+_a+"&display_method=get_player_object",
	            success: function(_data){
	            	_data = eval("("+_data+")");
				
	            	settings = jQuery.media.utils.getSettings( _data );
	            	jQuery.media.player.runVideo(vid);

	            }
	         });
    	}
    };



    /** Fires the GA Load event **/
    jQuery(document).on('media.ga.load',function(event,settings)
    {
       setTimeout(function()
        {
            jQuery.media.tracking.gaq(settings, 'load');
        },2000);

    });



    // Default Settings //
    jQuery.media.settings = jQuery.extend( jQuery.media.settings, {
        width:			null,
        height:			null,
        autosize:		true,
        autoplay:		false,
        preload:		true,
        fullscreen:		true,
        fullscreen_pos: 'TR',
        ratio:			'4:3',
        preroll:		null,
        preroll_note: 	null,
        hotspot_enabled:false,
        similar:		null,
        sim_videos:		false,
        embed_similar:	true,
        embed_key:		null,
        embed_url:		null,
        referral_url: 	null,
        cii_sSKU:		null,
        video_url:		'http://videos.expotv.com',
        subdomain:		'http://videos.expotv.com/',
        still_image_url:null,
        root_url:		'//'  + window.location.hostname,
        playerType:		'flash',
        assets: 		''
    });

    

    // Player Init //
    jQuery.fn.mediaPlayer = function( settings ) {

        if( this.length === 0 ) { return null; }
        return new (function( player, settings ) {


            var _this = this;
            jQuery.media.player = this;
            settings = jQuery.media.utils.getSettings( settings );
//			Check for Iphone
            var agent=navigator.userAgent.toLowerCase();
            settings.is_iphone = (agent.indexOf('iphone')!=-1);
            settings.is_ipad = (agent.indexOf('ipad')!=-1);
            settings.is_ios =  settings.is_ipad || settings.is_iphone;
            log(document.URL.split('&')[0]);
            log(encodeURIComponent(document.URL.split('&')[0]));
            settings.referral_url = (settings.referral_url != null) ? settings.referral_url.split('&')[0] : document.URL.split('&')[0];
            settings.embed_url    = (settings.embed_url    != null) ? settings.embed_url : settings.referral_url;
            
            log(settings.embed_url);
			
			var _bin_playstate	= false;


		
		
			/* disable autoplay for ios */
		    if(settings.autoplay  && settings.is_ios) {
		        settings.autoplay = false;
		    }


//		    Control Functions
            this.display 		= player;
            this.playState 		= false;
            this.muteState 		= false;
            this.rollover 		= false;
            this.scrubbing 		= false;
            this.activeModal 	= null;
            this.activeNote 	= null;
            this.openGroup 		= {obj:null, w:0};
            this.scrubBarWidth 	= 0;
            this.time 			= {current:0, seconds:0, secondsPlayed:0, total:"00:00"};

//			Setup Dimensions
            this.ratio = settings.ratio.split(":");
            this.width = this.display.width();
            this.height = this.display.height();
            this.control_height = $('#mp_controlBar').outerHeight(true);

            if(this.width != settings.width || this.height != settings.height){
                var _w,_h;
                if(settings.autosize == true){
                    _w = $('#mediaPlayer').innerWidth();
                    _h = $(window).height() - ( $('#mediaPlayer').outerHeight(true) - $('#mediaPlayer').innerHeight()) ;
                }else{
                    _w = this.width;
                }

                if((this.ratio[1] * _w / this.ratio[0]) + this.control_height > _h){
                    this.width = Math.ceil((_h - this.control_height)* this.ratio[0] / this.ratio[1]);
                    this.height = _h;
                }else{
                    this.width = _w;
                    this.height = Math.floor(this.control_height + (this.ratio[1] * _w / this.ratio[0]));
                }
            }
            else{
                this.width = settings.width;
                this.height = settings.height;
            }

            $('#mediaPlayer').width(this.width).height(this.height);
            $('#mp_notes').width(this.width);

//		    Setting - dimensions
            settings.width = this.width;
            settings.height = this.height;
            settings.control_height = this.control_height;

            this.videoPlayer = jQuery.media.utils.getPlayer(settings);

//		    Modal set ups //

            this.modal = $('#mp_overlay');
            this.modal.show();

            var _modalWidth = this.modal.innerWidth();
            var _modalheight = this.modal.innerHeight();
            this.modal.css('left',  function(){return (_this.width - _modalWidth)*.5; });

            if(_modalWidth <= this.width)
            {
                this.modal.css('left',  function(){return (_this.width - _modalWidth)*.5; });
            }else{
                this.modal.css('padding', 5).width(_this.width - 10).css('left', 0);
            }

            if(_modalheight <= this.height - this.control_height)
            {
                this.modal.css('top',  function(){return (_this.height - _this.control_height - _modalheight)*.5; });
            }else{
                this.modal.css('padding', 5).height(_this.height - _this.control_height - 10).css('top', 0);
            }


            this.modal.children().each( function(i){
                $(this).show();
                $(this).width(_this.modal.width()).height(_this.modal.height());
                var _h = _this.modal.height() - ($(this).find('h2').height() + $(this).find('h3').height() + $(this).find('.mp_close').height());

                if($(this).find('textarea')){
                    if(_modalheight <= _this.height - _this.control_height){
                        $(this).find('textarea').width($(this).width()-12).height(_h - 52);
                    }else{
                        $(this).find('textarea').width($(this).width()-12).height(_h - 32);
                    }
                }

                var _offset = (_h - $(this).find('.mp_mod_content').height())*.5;
                $(this).find('.mp_sim_content').height(_h);
                $(this).find('.mp_mod_content').css('marginTop',_offset).css('marginBottom',_offset);
                $(this).pngFix();
                $(this).hide();
            });


            if(settings.similar != null && settings.similar != 'undefined'){
                this.similarVideos = this.display.mediaSimilar( settings );
                this.similarVideos.getVideos();
            };

            $('#mediaPlayer').after('<div id="beacon"></div>');


            
            /*
             * initialize still image if it's missing
             * this should not be the case 
             */
            if(!settings.still_image_url) {
            	settings.still_image_url = settings.subdomain + settings.video_id + '_ST.jpg';
            }
            
            
            
            
            this.modal.hide();

//			Bind Listeners //
            // PLAY PAUSE
            $('.mp_playPause')
                .bind('mouseover', function(){
                    $(this).find('span').css('backgroundPosition','top center');
                    _this.scrubOut();
                })
                .bind('mouseout', function(){$(this).find('span').css('backgroundPosition','bottom center');})
                .bind('click', function(){ _this.playPause(); });

            // SCRUB BAR
            $('.mp_scrubBar').bind('click', function(e){
                _this.scrubClick(e.pageX - $('.mp_scrubBar_container').offset().left);
            });

            $('.mp_scrubBar_container')
                .hover(function(){ _this.scrubOver(); }, function(){ _this.scrubOut(); })
                .mousemove(function(e){
                    clearTimeout(_this.timeOuts);
                    _this.timeOuts = setTimeout(_this.checkScrubState,2000);
                });

            // VOLUME
            $('.mp_vol_btn').bind('click', function(){
                _this.expandGroup($('.mp_volume'), $('.mp_volume').find('.mp_btn_grp').width());
                $('.mp_vol_handle').show();
            });

            $('.mp_vol_handle')
                .draggable({ containment: 'parent', axis: 'x', refreshPositions: true })
                .bind( "drag", function(event, ui){
                    $('.mp_vol_current').css('width', function() { return $('.mp_vol_handle').position().left; });
                })
                .bind( "dragstop", function(event, ui){ _this.setVolume(); });


            // TOOLS - Share - Embed - Buy
            $('.mp_tools_btn').bind('click', function(){
                    var _w = $('.mp_tools').find('.mp_btn_grp').width();
                    if($('.mp_tools').find('.mp_embed').length == 0) _w -= 40;
                    _this.expandGroup($('.mp_tools'), _w);
                });

            $('.mp_tools_btn, .mp_embed, .mp_share, .mp_vol_btn, .mp_quality').hover(
				function(){
					$(this).css('backgroundPosition','top center');
					_this.scrubOut();
				},
				function(){$(this).css('backgroundPosition','bottom center');}
			);


            _this.mediaShareInit = false;

            $('.mp_share').bind('click', function(){
               if( !_this.mediaShareInit )
        		{
        			 $('.mp_share_mod').mediaShare( settings );
        			_this.mediaShareInit = true;
        		}
                _this.openModal('.mp_share_mod');
            });

            $('.mp_embed').bind('click', function(){
                $('.mp_embed_mod').mediaEmbed( settings );
                _this.openModal('.mp_embed_mod');
            });
			
			// Add listener to Buy Now button
			$('.mp_buy').bind('click', function(){
				// Google Analytics
				_gaq.push(['_trackEvent',settings.client_name+' Video Player', 'Buy', '"'+settings.video_id+'"']);

				// Check playState 
				if (_this.activeModal == null) {
					// Open Dealers modal
					_bin_playstate = _this.playState;
					_this.openModal('.mp_buy_mod');
				} else if (_this.activeModal != null && _bin_playstate == true) { 
					// Return to play with closeModal
					_this.playPause();
					_bin_playstate = false;
				} else {
					// Modal closes, no return to play
					_this.closeModal('.mp_buy_mod');
				}
		       	
			});
				// Show Buy Now button
		   $('.mp_buy').fadeIn(500);

           $('.mp_cta').bind('click', function(){
                _gaq.push(['_trackEvent',settings.client_name+' Video Player', 'CTA', '"'+settings.video_id+'"']);

           });

            /** Quality functionality goes here.. **/
            jQuery('.mp_quality').bind('click', function(e)
            {
                if (jQuery('div.quality-menu').css('display')=='none')
                    jQuery('div.quality-menu').slideDown(420);
                else
                    jQuery('div.quality-menu').slideUp(210);
            });

            $('.mp_close').bind('click', function(){ 
				_this.closeModal(); 
				// Check if playState 
				if (_bin_playstate == true) {
					_this.playPause();
				}
				
			});

            $('.mp_replay').bind('click', function(){ _this.playPause(); });

            $('#debug').bind('click', function(){ $('#debug').hide(); });

            /*
             * Control Functions
             * Need to figure out set up for custom control layouts
             */
            this.setupControls = function(){
                $('#mp_controlBar').show();
                $('#player').show();

                if(settings.fullscreen == true && settings.playerType == 'flash'&& settings.fullscreen_pos == 'TR' ){
                    $('#mp_controlBar').width(this.width-30);
                }else{
                    $('#mp_controlBar').width(this.width);
                }

                $('.mp_buffering, .mp_progress, .mp_scrubBar').removeAttr('style');

                /*
                 * Scrub bar width and height set up for different sized players.
                 */
                $('.mp_scrubBar').css('width', function() {
                        var items =	$('.mp_scrubBar_container').outerWidth(true)+
                            $('.mp_playPause').width()+
                            $('.mp_volume').outerWidth(true)+
                            $('.mp_quality').outerWidth(true)+
                            $('.mp_tools').outerWidth(true)+
                            $('.mp_totalTime').outerWidth(true)+
                            $('#mp_controlBar .mp_buy').outerWidth(true)+
                            ($('.mp_totalTime').hasClass('show_current')? 10 : 0);
                        return $("#mp_controlBar").width()-items-2-( jQuery.browser.msie && jQuery.browser.version.indexOf('9') > -1? 4: 0 );
                    });

                this.scrubBarWidth 	= $('.mp_scrubBar').innerWidth();

                /*
                 * Time Played hover icon, rebind events for laoded movie.
                 */

                var _dragStart = $('.mp_scrubBar_container').offset().left - Math.round($('.mp_timePlayed').width()*.5);


                $('.mp_timePlayed, img.scrub')
                    .draggable(
                        {
                            containment:
                            [   _dragStart, 1,
                                _dragStart + ( $($(this).attr('container')).length>0
                                        ? $($(this).attr('container')).width()-2
                                        :$('.mp_scrubBar_container').width() - 2),
                                1
                            ],
                            axis: 'x',
                            grid: [1, 1]
                        })
                    .bind( "dragstart", function(event, ui){;
                        _this.scrubbing = true;
                        if(_this.playState) _this.playPause(); })
                    .bind( "drag", function(event, ui){
                        var pos = $(this).position().left+($(this).width() * .5);
                        var sec = Math.round(_this.time.seconds * (pos/$('.mp_scrubBar').width()));
                        if(!$(this).hasClass('no_time_stamp')) $('.mp_timePlayed').html( jQuery.media.utils.formatTime(sec) );
                        if($('.mp_totalTime').hasClass('show_current')){
                            $('.mp_totalTime').html(jQuery.media.utils.formatTime(sec)+' / '+_this.time.total);
                        }
                        _this.scrubbing = sec;

                        jQuery(document).trigger('mediascrub.drag',{position: pos});
                        jQuery(document).trigger('mediascrub.time',{time: jQuery.media.utils.formatTime(sec)});
                    })
                    .bind( "dragstop", function(event, ui){

                        if(_this.scrubbing) _this.videoPlayer.jumpto(_this.scrubbing);
                        _this.scrubbing = false;
                        _this.playPause();
                    });
                if(settings.autoplay == true){
                    _this.playState = true;
                    _this.setToggle($('.mp_playPause'), true );
                }

                jQuery(document).trigger('mediasetup.controls', {settings:settings});
            };

            this.playPause = function(){
            	log('playpause fired');
                _this.playState = !_this.playState;
                _this.setToggle($('.mp_playPause'), _this.playState );

                if(_this.playState){
                    $('#mp_playbutton').hide();
                    _this.videoPlayer.playVideo();
                    _this.closeModal();
                }else{
                    _this.videoPlayer.pause();
                }
            };

            this.setVolumeBar = function(_volume){
                $('.mp_vol_current').width( function(){ return _volume * $('.mp_vol_scrub').innerWidth(); });
                $('.mp_vol_handle').css('left', function(){return $('.mp_vol_current').width() - 5;});
            };

            this.setVolume = function(){
                var _vol = Math.round(($('.mp_vol_handle').position().left / $('.mp_vol_scrub').innerWidth()) * 100) / 100;
                _this.videoPlayer.volume(_vol);
            };

            this.setToggle = function( button, state ) {
                var off = state ? ".on" : ".off";
                var on = state ? ".off" : ".on";
                if( button ) {
                    button.find(on).show();
                    button.find(off).hide();
                }
            };

            /*
             * Scrub bar hover state, on over it expands and on out it returns to normal size.
             */
            this.scrubOver = function(){
                var _scrubBar = $('.mp_scrubBar');
                if(_this.rollover != true){
                    if( _this.openGroup.obj != null ){ _this.closeGroup(_scrubBar); }
                    if( _this.time.current != 0){ $('.mp_timePlayed').show(); }
                    $('.mp_buffering').animate({
                        height: '11px'});
                    $('.mp_progress').animate({height: '11px'});

                    _scrubBar.animate({
                        marginTop: "7px",
                        marginBottom: "7px",
                        height: '11px'
                    }, 200, function() {
                        _this.rollover = true;
                    });
                }
            };

            this.scrubOut = function(){
                if(_this.rollover == true){
                    $('.mp_timePlayed').hide();
                    $('.mp_buffering').animate({height: '5px'});
                    $('.mp_progress').animate({height: '5px'});
                    $('.mp_scrubBar').animate({
                        marginTop: "10px",
                        marginBottom: "10px",
                        height: '5px'
                    }, 200, function() {
                        _this.rollover = false;
                    });
                }
            };

            this.scrubClick = function(_seconds){
                var p = Math.round(_this.time.seconds*( _seconds / $('.mp_scrubBar').width()));
                if(_this.time.current != 0) _this.videoPlayer.jumpto(p);
            };

            this.checkScrubState = function(){
                if(!_this.scrubbing)_this.scrubOut();
            };

            this.expandGroup = function(_obj, _w){
                if(_this.openGroup.obj != null && _this.openGroup.obj.attr('class') != _obj.attr('class')){
                    _this.closeGroup($('.mp_scrubBar'),_obj,_w);
                }else if(_this.openGroup.obj != null && _this.openGroup.obj.attr('class') == _obj.attr('class')){
                    _this.closeGroup($('.mp_scrubBar'));
                }else{
                    $('.mp_scrubBar').animate({ width: _this.scrubBarWidth - (_w - 25)}, 150);
                    _obj.animate({ width: _w }, 250, function() {
                        _this.openGroup.obj = _obj;
                        _this.openGroup.w = 25;
                    });
                }
            };

            this.closeGroup = function(_obj, _open, _w){
                if(!_open) _obj.animate({width: _this.scrubBarWidth }, 250);

                $(_this.openGroup.obj).animate({ width: _this.openGroup.w }, 200, function() {
                    _this.openGroup.obj = null;
                    if(_open) _this.expandGroup(_open, _w);
                });
            };

            this.openModal = function(_obj){
                if($('#mp_overlay').find(_obj).length != 0){
                    if(_this.activeModal != $(_obj).attr('class')){
                        _this.activeModal = $(_obj).attr('class');
                        $('.mp_similar_mod, .mp_embed_mod, .mp_share_mod, .mp_buy_mod').hide();
                        $(_obj).show();
                        $('#mp_overlay').fadeIn(500);
                        if(_this.playState == true) _this.playPause();
                    }else{
                        _this.closeModal();
                    }
                };
            };

            this.closeModal = function(){
                _this.activeModal = null;
                $('.mp_similar_mod, .mp_embed_mod, .mp_share_mod, .mp_buy_mod').hide();
                $('#mp_overlay').fadeOut(500);
            };

            this.openNotes = function(type){
                if(type == "preroll"){
                    _this.activeNote = 'preroll';
                    $('#mp_notes')
                        .html('<h3>Your video will begin in <span id="countDown">'+_this.time.total+'</span></h3>')
                        .show()
                        .animate({ height: 25 }, 250);
                }
            };

            this.closeNotes = function(){
                $('#mp_notes').animate({ height: 0 }, 200, function(){$(this).hide()});
                _this.activeNote = null;
                settings.preroll = null;
            };

            this.setProgress = function(_percent){

                if(!_this.scrubbing){
                    $('.mp_progress').width(function() { return _percent * .01 * _this.scrubBarWidth; });
                    $('.mp_timePlayed').css('left', function() { return $('.mp_progress').width() - ($(this).width() * .5);});
                    jQuery(document).trigger('mediaset.progress', {percent:_percent});
                }
            };

            this.setLoaded = function(_percent){
                $('.mp_buffering').width(function(){ return _percent * .01 *  _this.scrubBarWidth; });
            };


           this.openVideo = function(vid) {
               mp_load(vid, true);
           };



   	


 	    

            this.runVideo = function(_id){
                _this.closeModal();
                settings.video_id = _id;
                if(settings.playerType != 'flash'){
                    _this.videoPlayer.loadvideo(_id);
                    _this.setupControls();
                }else{
                    if(_this.time.current != 0){
                        _this.setToggle($('.mp_playPause'), true );
                        _this.playState = true;
                        _this.videoPlayer.loadvideo(_id);
                    }else{
			_this.videoPlayer.quevideo(_id);
                    }
		   _this.videoPlayer.createMedia();
		}
            };

            this.setupControls();
            window.first_html_error = true;

//		    Returned functions
            this.onMediaUpdate = function( data )
            {

                switch(data.type)
                {
                    case "playerMetaData" :
                        jQuery(document).trigger('mediametadata', data );

                        if(typeof(data.duration) == 'undefined'){
                            _this.time.seconds = _this.videoPlayer.getDuration();
                            _this.time.total = jQuery.media.utils.formatTime(_this.time.seconds);
                            _this.setVolumeBar(_this.videoPlayer.getVolume());
                        }else{
                            _this.time.total = data.duration;
                            _this.time.seconds = data.seconds;
                            _this.setVolumeBar(data.volume);
                        }
                        if($('.mp_totalTime').hasClass('show_current')){
                            $('.mp_totalTime').html('00:00 / '+_this.time.total);
                        }else{
                            $('.mp_totalTime').html(_this.time.total);
                        }

                        if(typeof(jQuery.media.plugins.metaData) != "undefined") jQuery.media.plugins.metaData(settings,data);

                        break;
                    case "buffering" :
                        jQuery(document).trigger('mediabuffering', data );

                        _this.setLoaded(data.loadPercent);
                        break;
                    case "playheadUpdate" :
                        // note: No Buffer data for HTML 5 //
                        if(typeof(data.loadPercent) == 'undefined'){
                            _this.setProgress(data.playPercent);
                            _this.time.current = data.currentTime;
                            _this.time.secondsPlayed = data.secondsPlayed;
                        }else{
                            _this.setLoaded(data.loadPercent);
                            _this.setProgress(data.playPercent);
                            _this.time.current = data.currentTime;
                            _this.time.secondsPlayed = data.secondsPlayed;
                        }

                        if(!$('.mp_timePlayed').hasClass('no_time_stamp')) $('.mp_timePlayed').html(_this.time.current);
                        if($('.mp_totalTime').hasClass('show_current')){
                            $('.mp_totalTime').html(_this.time.current+' / '+_this.time.total);
                        }

                        if(_this.activeNote == 'preroll'){
                            $('#countDown').html(jQuery.media.utils.formatTime(_this.time.seconds - _this.time.secondsPlayed));
                        }

                        jQuery.media.tracking.postBeaconHtml5(settings,data,_this.time,"threshold");

                        jQuery(document).trigger('mediaheadupdate', {data:data,time:{current:_this.time.current,total:_this.time.total}});

                        break;
                    case "playStart" :
                        jQuery(document).trigger('mediastart', data );

                        _this.playState = data.playPause;
                        _this.setToggle($('.mp_playPause'), _this.playState );

                        if (!!jQuery.browser.msie && _this.playState===true)
                            jQuery.media.tracking.gaq(settings, 'start');

                        break;
                    case "onplay" :
                        jQuery(document).trigger('mediaplay', data );

                        if(typeof(jQuery.media.plugins.onplay) != "undefined") jQuery.media.plugins.onplay(settings,data);
                        if(settings.preroll != null) _this.openNotes('preroll');
                        if(_this.time.secondsPlayed == 0){
                            jQuery.media.tracking.postBeaconHtml5(settings,data,_this.time,"start");
                            jQuery.media.tracking.gaq(settings, 'start');
                        }else{
                            jQuery.media.tracking.postBeaconHtml5(settings,data,_this.time,"playpause");
                        }
                    	$('#mp_playbutton').show();
                        break;
                    case "onpause" :
                        jQuery(document).trigger('mediapause', data );

                        jQuery.media.tracking.postBeaconHtml5(settings,data,_this.time,"playpause");
                        break;
                    case "onend" :
                        jQuery(document).trigger('mediaend', data );

                        if(_this.activeNote == 'preroll'){
                            _this.closeNotes();
                            settings.autoplay = true;
                            _this.openVideo(settings.video_id);
                        }else{
                            _this.setToggle($('.mp_playPause'), false );
                            if(settings.sim_videos == true) _this.openModal('.mp_similar_mod');
                            jQuery.media.tracking.gaq(settings, 'end');
                            jQuery.media.tracking.postBeaconHtml5(settings,data,_this.time,"end");
                            $('#mp_playbutton').show();
                        }
                        break;
                    case "onfullscreen" : // Flash only

                        jQuery(document).trigger('mediafullscreen', data );

                        _this.setVolumeBar(data.volume);
                        break;
                    case "closenotes" :
                        jQuery(document).trigger('medianotes.close', data );

                        _this.closeNotes();
                        break;
                    case "sendbeacon" :
                        jQuery(document).trigger('mediabeacon.send', data );

                        jQuery.media.tracking.postBeaconFlash(settings,data);
                        if(typeof(jQuery.media.plugins.tracking) != "undefined")
                            jQuery.media.plugins.tracking(settings,data,_this.time,data.beaconVO.event);
                        break;
                    case "hotspot_click" :
                        jQuery(document).trigger('mediahotspot.click', data );

                        jQuery.media.tracking.hotspot(settings,data,_this.time.secondsPlayed);
                        break;
                    case "errorHtml5" :
                        jQuery(document).trigger('mediaerror.html5', data );

                      if (first_html_error)
                      {
                        settings.canPlay = 'flash';
                        _this.videoPlayer = jQuery.media.utils.getPlayer(settings);
                        _this.setupControls();

                        first_html_error = false;
                      }


                        break;
                };

                jQuery(document).trigger('mediaupdate', data );
            };

        })( this, settings );
    };


    // Players
    jQuery.fn.mediaFlash = function( settings ) {
        return new (function( video, settings ) {
            this.createMedia = function() {
                jQuery.media.settings = jQuery.extend( jQuery.media.settings, {
                    playerType: 'flash'
                });
                jQuery(document).trigger('mediaflash.create', settings );
                
                var so = new SWFObject("http://images.expotv.com/video/video_player.leg.swf?ts=0", "player", settings.width, settings.height, "9", "#000000");
                so.addParam("allowFullScreen", settings.fullscreen);
                so.addParam("allowScriptAccess", "always");
                so.addParam("wmode", "transparent");
                so.addVariable("autoPlay", settings.autoplay);
                so.addVariable("preload", settings.preload);
                so.addVariable("fullscreen", settings.fullscreen);
                so.addVariable("fullscreen_pos", settings.fullscreen_pos);
                so.addVariable("hotspot_enabled", settings.hotspot_enabled);
                so.addVariable("width", settings.width);
                so.addVariable("height", settings.height);
                so.addVariable("textColor",	"0x"+jQuery.media.utils.rgb2hex($('.mp_totalTime').css('color')) );
                so.addVariable("sliderBgColor",	"0x"+jQuery.media.utils.rgb2hex($('.mp_scrubBar').css('background-color')) );
                so.addVariable("sliderBufferColor", "0x"+jQuery.media.utils.rgb2hex($('.mp_buffering').css('background-color')) );
                so.addVariable("sliderPosColor", "0x"+jQuery.media.utils.rgb2hex($('.mp_progress').css('background-color')) );
                so.addVariable("control_height", settings.control_height);
                so.addVariable("still_image_url", settings.still_image_url); 
                so.addVariable("video_url", settings.video_url);
                so.addVariable("videoAssetUrl", settings.subdomain);
	            try{
                	so.addVariable("encoding", "."+settings.assets['default'].type);
                }catch(e){
                	so.addVariable("encoding", ".flv");
                }
                so.addVariable("urlRequest", settings.root_url);
                if(settings.referral_url != null) so.addVariable("host", settings.referral_url.split('&')[0]);
                so.addVariable("skinURL", settings.skin_url);
                so.addVariable("video_id", settings.video_id)
                so.addVariable("client_ip", settings.client_ip);
                so.addVariable("partner_id", settings.partner_id);
                
                if(settings.profile_id) 
                {
                	so.addVariable("profile_id", settings.profile_id);
                }
                so.addVariable("beacon_post_url", settings.beacon_post_url);
                so.addVariable("beacon_threshold_type", settings.beacon_threshold_type);
                so.addVariable("beacon_threshold_frequency", settings.beacon_threshold_frequency);
                if(settings.preroll != null)so.addVariable("preroll", settings.preroll);
                if(settings.play_button_url != 'undefined' && settings.play_button_url != null)so.addVariable("play_button_url", settings.play_button_url);

                jQuery(document).trigger('mediaflash.beforewrite', {settings:settings,so:so} );

                so.write("mp_player");

                settings.playerType = 'flash';

                jQuery(document).trigger('mediaflash.afterwrite',{
                    swf:      so,
                    settings: settings,
                    player:   jQuery.media.player,
                    time:     jQuery.media.player.time,
                    state:    jQuery.media.player.playState
                });

                window.soo = this.swf = so;
            };




            // controls //
            this.playVideo = function(){ this.sendAction().playvideo(); };
            this.pause = function(){ this.sendAction().pause(); };
            this.volume = function(_volume){ this.sendAction().volume(_volume); };
            this.jumpto = function(_pos){ this.sendAction().jumpto(_pos); };
            this.loadvideo = function(_id){ this.sendAction().loadvideo(_id); };
            this.quevideo = function(_id){ this.sendAction().quevideo(_id); };

            this.sendAction = function(){
                if (navigator.appName.indexOf("Microsoft") != -1) {
                    return window["player"];
                } else {
                    return document["player"];
                }
            };

        })( this, settings );
    };

    jQuery.fn.mediaHtml5 = function( settings, onUpdate ) {
        return new (function( video, settings, onUpdate ) {
            this.display = video;
            var _this = this;
            this.updateInterval = null;
            this.bytesLoaded = 0;
            this.bytesTotal = 0;


            this.createMedia = function() {

                var video_src = jQuery.media.settings.video_url;
                log('video_src : ' + video_src);
                jQuery.media.settings = jQuery.extend( jQuery.media.settings, {
                    playerType: 'html5',
                    beaconVO: {
                        video_id: settings.video_id,
                        host: settings.referral_url,
                        partner_id: settings.partner_id,
                        client_ip: settings.client_ip,
                        profile_id: settings.profile_id || null,
                        event: null,
                        view_percentage: 0,
                        play_id: Math.round(Math.random() * 100000),
                        hash: null
                    }
                });

                jQuery(document).trigger('mediahtml5.create', jQuery.media.settings );


                var _vhtml = '';
                var _player_height = settings.height - settings.control_height;
                
                /**
                 * Ok..This really should just have a list of video formats and source them all
                 * However we know that we produce a standard mp4 format so lets use that
                 */
                var _source_type = jQuery.media.utils.getMP4VideoFormatType();

				var video_player_element = $("<video>")
												.attr("id", "player")
												.attr("width", settings.width)
												.attr("height", _player_height);

				video_player_element.append((
											 $("<source>")
													.attr("src",video_src)
													.attr("type", _source_type)));
				
				
				if(settings.is_iphone || settings.autoplay) {
					$('#mp_player').html(video_player_element);
				}
				else {
					var wrapper_div_element = $("<div>")
													.attr("id", "mp_playbutton")
													.css({ 
														width : settings.width + 'px', 
													    height: _player_height + 'px'
													});

					video_player_element.attr("poster", settings.still_image_url );
					wrapper_div_element.append(video_player_element);
					$('#mp_player').html(wrapper_div_element);
				}
				/*
                if(settings.is_iphone || settings.autoplay){
                    _vhtml += '<video id="player" width="'+settings.width+'" height="'+ _player_height +'">';
                }
                else {
                    _vhtml += '<div id="mp_playbutton" style="width:'+settings.width+'px;height:'+ _player_height +'px"></div>';
                    _vhtml += '<video id="player" poster="' + settings.still_image_url + '" width="'+settings.width+'" height="'+ _player_height +'">';
                }
                _vhtml += '<source src="'+video_src+'" type="' + _source_type + '">';
                _vhtml += '</video>';
*/        
				
                //$('#mp_player').html(video_player_element);

                jQuery(document).trigger('mediahtml5.afterwrite', jQuery.media );

                this.player = this.display.find('#player').eq(0)[0];

                //$('#mp_playbutton').bind('click', function(){ window.alert('playbtn'); jQuery.media.player.playPause(); });
                
                $('#player').bind('click', function(){ log('player click'); jQuery.media.player.playPause(); });

                if(settings.autoplay == true) this.player.autoplay = true;
                this.player.autobuffer = true;

                this.player.addEventListener( "loadedmetadata", function() {
                    if(settings.autoplay){
                        _this.playVideo();
                    }
                    onUpdate( {type:"playerMetaData"} );
                }, true);

                //fix buffer bar
                /*
                this.player.preload = "auto";
                this.player.addEventListener( "progress", function( event ) {
                    alert(event.total)
                    _this.bytesLoaded = event.loaded;
                    _this.bytesTotal = event.total;
                 }, true);
                 */

                this.player.addEventListener( "error", function() { onUpdate( {type:"errorHtml5"} ); }, true);
                this.player.addEventListener( "play", function() {
                    _this.startUpdate();
                    var _data = _this.getTime();
                        _data.type = "onplay";
                        _data.preroll = settings.preroll;
                    onUpdate( _data );
                    settings.preroll = null;
                }, true);
                this.player.addEventListener( "ended", function() {
                    clearInterval( _this.updateInterval );
                    onUpdate( {type:"onend"} );
                }, true);
                this.player.addEventListener( "pause", function() {
                    clearInterval( _this.updateInterval );
                    var _data = _this.getTime();
                        _data.type = "onpause";
                        onUpdate( _data );
                }, true);
            };

            this.playVideo = function() { this.player.play(); };
            this.pause = function() { this.player.pause(); };
            this.volume = function(_volume){ this.player.volume = _volume; };
            this.jumpto = function(_pos){

            	if(this.player.currentTime -_pos > this.player.currentTime * .5){
            		settings.beaconVO.play_id = Math.round(Math.random() * 100000);
            	}
                this.player.currentTime = _pos;
                _this.startUpdate();
            };
            this.loadvideo = function(_id){ _this.createMedia(); };
            this.quevideo = function(_id){ _this.createMedia(); };

            // Get Data
            this.getVolume = function(){ return this.player.volume; };
            this.getDuration = function(){ return this.player.duration; };
            this.getCurrentTime = function() { return this.player.currentTime; };
            this.getTime = function(){
                var _currentTime = this.player.currentTime;
                var _data = {
                    playPercent: Math.round((_currentTime/this.player.duration)*100),
                    secondsPlayed: _currentTime,
                    currentTime: jQuery.media.utils.formatTime(_currentTime)
                };
                return _data;
            };

            this.startUpdate = function(){
                clearInterval( this.updateInterval );
                this.updateInterval = setInterval( function() {
                    var _data = _this.getTime();
                        _data.type = "playheadUpdate";
                    onUpdate( _data );
                }, 500 );
            };
            
        })( this, settings, onUpdate );
     
    };

    jQuery.fn.mediaNoPlayer = function( settings ) {
    	return (new function()  {
	    	this.createMedia = function() {
	        /**
	         * No video player avaialble -- fallback..get flash below
	         */
	        
	        /** Creates a wrapper for the display **/
	        var $wrapper    = jQuery( '<div class="no_flash" />' ),
	
	        /** Creates the opaque overlay **/
	            $overlay    = jQuery( '<div class="no_flash_overlay" />' ),
	
	        /** Creates the 'Get Adobe Flash Player' button **/
	            $get_flash  = jQuery( '<img src="http://images.expotv.com/video/get_flash.jpg" />' ),
	
	        /** Creates the message to the user **/
	            $message    = jQuery( '<p class="no_flash_message" />' );
	
	
	        /**
	            CSS **/
	        /*->$wrapper */
	        $wrapper.css(
	            {
	                position    : 'absolute',
	                height      : '100%',
	                width       : '100%',
	                'z-index'   : '9999',
	                display     : 'none'
	            });
	
	        /*->$overlay */
	        $overlay.css(
	            {
	                width       : '100%',
	                background  : '#cecece',
	                height      : '100%',
	                position    : 'absolute',
	                opacity     : .3
	            });
	
	
	        /*->$get_flash */
	        $get_flash.css(
	            {
	               'z-index'    : '999999',
	                position    : 'absolute',
	                top         : '35%',
	                left        : '10%',
	                'cursor'    : 'pointer'
	            });
	
	        /*->$message */
	        $message.css(
	            {
	                'z-index'   : '999999',
	                position    : 'absolute',
	                top         : '33%',
	                left        : '40%',
	                color       : '#fff',
	                'font-size' : '24px',
	                width       : '300px'
	            });
	
	
	        /**
	            HTML **/
	        $wrapper.append( $overlay, $get_flash, $message );
	        $message.html( 'Sorry you need the latest version of flash to view this video content.' );
	
	        /**
	            Events **/
	        $wrapper.on(
	            {
	                click : function()
	                {
	                    try
	                    {
	                        window.open( 'http://www.adobe.com/go/getflashplayer' );
	                    }
	                    catch( er )
	                    {
	                        window.location.href = 'http://www.adobe.com/go/getflashplayer';
	                    }
	
	                }
	            });
	
	        jQuery('#mediaPlayer').prepend( $wrapper );
	
	        $wrapper.delay( 500 ).fadeIn( 500 );
	
	
	        return false;
    	
	    	}
    	});
    }
    
    jQuery.fn.mediaBlackberry = function( settings, onUpdate ) {
        return new (function( video, settings, onUpdate ) {
        	this.createMedia = function() {
        		
                var _vhtml = '<a href="'+settings.video_url+'" target="_blank" ><img id="player" src="' + settings.still_image_url  + '" width="'+settings.width+'" height="'+(settings.height - settings.control_height)+'"></a>';
        		$('#mp_player').html(_vhtml);

/*
                $('#mp_playbutton').bind('click', function(){ jQuery.media.player.playPause(); });
                $('#player').bind('click', function(){ jQuery.media.player.playPause(); });*/
        	};
    	})( this, settings, onUpdate );
    };

//	Sharing - Embed - Similar
    jQuery.media.settings = jQuery.extend( jQuery.media.settings, {
        embedCode : null,
        shareCode : null,
        similarCode : null
    });

    jQuery.fn.mediaSimilar = function( settings ) {
        return new (function( similar, settings ) {
            var _this = this;
            this.setupSimilarVideos = function(_videos){
                if($('#mp_overlay').find('.mp_similar_mod').length != 0){
                    $('#mp_overlay').show().css('visibility','hidden');
                    $('.mp_similar_mod').show();
                    _showItems = 2;
                    try{
                         _styles = "";

                        if( $('#mp_overlay').innerWidth() <= $('#mediaPlayer').width()){
                            _svw = $('#mp_overlay').width();
                            _styles += '.jcarousel-skin{width: '+_svw+'px;}';
                        }else{
                            _svw = $('#mp_overlay').width()-14;
                            _styles += '.jcarousel-skin{width: '+_svw+'px;}';
                        }
                        _contentHeight = $('.mp_sim_content').height();

                        _marginTop = parseInt( jQuery.media.utils.getCSSRule('.jcarousel-next-horizontal').style.marginTop );
                        log($('.jcarousel-next-horizontal').css('margin-top'));
                        log(parseInt( jQuery.media.utils.getCSSRule('.jcarousel-next-horizontal').style.marginTop ));
                        _buttonHeight = parseInt( jQuery.media.utils.getCSSRule('.jcarousel-next-horizontal').style.height );
                        _buttonTop = ( _contentHeight-_buttonHeight )*.5;
                        _buttonWidth = parseInt( jQuery.media.utils.getCSSRule('.jcarousel-next-horizontal').style.width )+5;
                        _itemPadding = parseInt( jQuery.media.utils.getCSSRule('.jcarousel-item div.mp_svideo').style.padding );
                        _itemTotalHeight = parseInt( jQuery.media.utils.getCSSRule('.jcarousel-item div.mp_svideo').style.height )+(_itemPadding*2);

                        if((_itemTotalHeight+_marginTop)*2 > _contentHeight){
                            _marginTop = 0;
                            _showItems = 1;
                            _styles += '.jcarousel-item div.mp_svideo{margin-top:'+((_contentHeight - _itemTotalHeight)*.5)+'px}';

                        }else{
                            _marginTop = 5;
                            _showItems = 2;
                        }

                        // Prev Next Placement //
                        _styles += '.jcarousel-next-horizontal,.jcarousel-prev-horizontal{top:'+(_buttonTop+_marginTop)+'px;}';

                        // Container Placement //
                        _styles += '.jcarousel-container-horizontal{margin: 0px '+_buttonWidth+'px;}';
                        _styles += '.jcarousel-container-horizontal,.jcarousel-clip,.jcarousel-clip-horizontal,.jcarousel-item{width:'+(_svw-(_buttonWidth*2))+'px}';
                        _styles += '.jcarousel-item{height:'+_contentHeight+'px;}';
                        _styles += '.jcarousel-item div.mp_svideo{width:'+(_svw-((_buttonWidth+_itemPadding)*2))+'px}';

                        $('#mediaPlayer').before('<style>'+_styles+'</style>');

                    }catch(e){ };
                    for(i=0; i < _videos.length; i+=_showItems){
                        var _li = document.createElement('li');
                        var _html ="";
                        for(t=0; t<_showItems; t++){
                            try{
                                _html += '<div class="mp_svideo" name="'+ _videos[i+t].id+'">';
                                _html += '<img src="' + settings.subdomain + _videos[i+t].id+'_TH.jpg" />';
                                _html += '<h3>'+ _videos[i+t].title+'</h3>';
                                _html += '<p>Duration: '+ jQuery.media.utils.formatTime( _videos[i+t].duration ) +'</p>';
                                //_html += '<p>'+ _videos[i+t].user +'</p>';
                                _html += '</div>';
                            }catch(e){}
                        }
                        $(_li).html(_html);
                        $('#mp_similar_videos').append(_li);
                    }

                    $('.mp_svideo').bind('click', function(){ jQuery.media.player.openVideo($(this).attr('name')); });

                    $('#mp_similar_videos').jcarousel({scroll: 1,offset: 1});

                    $('.mp_similar_mod').hide();
                    $('#mp_overlay').hide().css('visibility','visible');
                    settings.sim_videos = true;

                };
                if(typeof(jQuery.media.plugins.similarVideos) != 'undefined')jQuery.media.plugins.similarVideos(settings, _videos);
            };


            this.getVideos = function() {
                var _videos = settings.similar.split('|');
                var _d = "";
                for(i=0; i < _videos.length; i++){
                    _d += "videos[]="+_videos[i];
                    if(i+1 < _videos.length)_d += "&";
                }

                $.ajax({
                   type: "GET",
                   url: "/ajax/video/getids/similar_videos",
                   dataType: 'json',
                   data: _d,
                   success: function(e){ if(e.status != 'fail') _this.setupSimilarVideos(e.videos);}
                });
            };
        })( this, settings );
    };

    jQuery.fn.mediaShare = function( settings ) {
        if( this.length === 0 ) { return null; }
        return new (function( share, settings ) {
            $('#facebook').attr('href','http://www.addthis.com/bookmark.php?username=expotv&v=250&source=tbx-250&tt=0&s=facebook&url='+settings.referral_url+'&title='+settings.video_title);
            $('#twitter').attr('href','http://www.addthis.com/bookmark.php?username=expotv&v=250&source=tbx-250&tt=0&s=twitter&url='+settings.referral_url+'&title='+settings.video_title);
            $('#digg').attr('href','http://www.addthis.com/bookmark.php?username=expotv&v=250&source=tbx-250&tt=0&s=digg&url='+settings.referral_url+'&title='+settings.video_title);
            $('#stumbleupon').attr('href','http://www.addthis.com/bookmark.php?username=expotv&v=250&source=tbx-250&tt=0&s=stumbleupon&url='+settings.referral_url+'&title='+settings.video_title);
            $('#email').attr('href','mailto:?subject='+settings.video_title+'&body='+settings.referral_url);
        })( this, settings );
    };

    jQuery.fn.mediaEmbed = function( settings, target ) {
        if( this.length === 0 ) { return null; }
        var obj = this;
        return new (function( embed, settings ) {
            if(typeof(jQuery.media.plugins.embedCode) != 'undefined') {
                jQuery.media.plugins.embedCode(settings);
            }
            else {
                var _key = (settings.embed_key != null)? settings.embed_key : settings.key;
                var _w = $('#mediaPlayer').width();
                var _h = $('#mediaPlayer').height();
                var _ref = (settings.referral_url != null)? '&referral_url='+encodeURIComponent(settings.embed_url) : "";
                var _buy = (settings.cii_sSKU != null)? '&cii_sSKU='+settings.cii_sSKU : "";
                var _src = 'http://client.expotv.com/video/embed/'+settings.video_id+'/'+_key;
                    _src += '?ratio='+settings.ratio+_ref+_buy;
                var _embed = '<iframe src="'+_src+'" width="'+_w+'" height="'+_h+'" scrolling="no" frameborder="0" allowtransparency="yes"></iframe>';
                log(_embed);

                if(typeof(target) == 'undefined'){
                    $('.mp_embed_mod textarea').text(_embed);
                    $('.mp_embed_mod textarea').bind('click', function(){ this.select(); });
                }else{
                    switch(target){
                        case 'value': $(obj).val(_embed); break;
                        case 'text': $(obj).text(_embed); break;
                    }
                }
            }


        })( this, settings );
    };

//	Tracking
    jQuery.media.tracking = jQuery.extend( jQuery.media.tracking, {
        postBeaconHtml5 : function(settings, data, _time, event){
            if($('#mp_player').find('embed').length == 0){
                var prev_event = settings.beaconVO.view_percentage;
                settings.beaconVO.event = event;
                settings.beaconVO.view_percentage = (isNaN(parseInt(data.playPercent)))? 0 : Math.floor(data.playPercent);
                settings.beaconVO.hash = ($.md5(settings.beaconVO.video_id+settings.beaconVO.client_ip+settings.beaconVO.play_id)).substring(0,6);

                var _t = Math.floor(_time.seconds / settings.beacon_threshold_frequency);
                var _c = Math.floor(_time.secondsPlayed);

                if( event == "threshold" && settings.beacon_threshold_type == 'time' && _c != 0){
                    if(_c % settings.beacon_threshold_frequency == 0 && prev_event != settings.beaconVO.view_percentage){
                        $('#beacon').html('<iframe src="'+ settings.beacon_post_url+'?'+$.param(settings.beaconVO)+'" width="0" height="0" scrolling="no" frameborder="0"></iframe>');
                        if(typeof(jQuery.media.plugins.tracking) != "undefined") jQuery.media.plugins.tracking(settings, data, _time, event)
                    }
                }else if(event == "threshold" && settings.beacon_threshold_type == 'percent'){
                    if(_t-1 == _c %  _t && prev_event != settings.beaconVO.view_percentage){
                        $('#beacon').html('<iframe src="'+ settings.beacon_post_url+'?'+$.param(settings.beaconVO)+'" width="0" height="0" scrolling="no" frameborder="0"></iframe>');
                        if(typeof(jQuery.media.plugins.tracking) != "undefined") jQuery.media.plugins.tracking(settings, data, _time, event);
                    }

                }else if(event != "threshold"){
                    $('#beacon').html('<iframe src="'+ settings.beacon_post_url+'?'+$.param(settings.beaconVO)+'" width="0" height="0" scrolling="no" frameborder="0"></iframe>');
                    if(typeof(jQuery.media.plugins.tracking) != "undefined") jQuery.media.plugins.tracking(settings, data, _time, event);
                }
            };
        },
        postBeaconFlash : function(settings,params){
            $('#beacon').html('<iframe src="'+ settings.beacon_post_url+'?'+$.param(params.beaconVO)+'" width="0" height="0" scrolling="no" frameborder="0"></iframe>');
        },
        hotspot : function(settings, params, _time){
            var hotspotParames = {
                target_url: params.hotspot_url,
                click_time: _time,
                headline: params.hotspot_title,
                description: params.hotspot_description,
                button_text: params.hotspot_button_txt,
                overlay_text: params.hotspot_overlayText
            };
            $('#beacon').html('<iframe src="'+settings.root_url+'/ajax/video/log/video_tag/'+settings.video_id+'?'+$.param(hotspotParames)+'" width="0" height="0" scrolling="no" frameborder="0"></iframe>');
            if(params.hotspot_target == "_parent"){
                window.location = params.hotspot_url;
            }else{
                window.open(params.hotspot_url);
            }
        },
        gaq : function(settings, event){
            // GA code
            if(typeof(_gaq) != 'undefined'){
                switch(event){
                    case 'load'     : return _gaq.push(['_trackEvent',settings.client_name+' Video Player', 'load', '"'+settings.video_id+'"']);
                        break;
                    case 'start'    : return _gaq.push(['_trackEvent',settings.client_name+' Video Player', 'start', '"'+settings.video_id+'"']);
                        break;
                    case 'end'      : return _gaq.push(['_trackEvent',settings.client_name+' Video Player', 'end', '"'+settings.video_id+'"']);
                        break;
                }
            }
        }
    });

//	Utilities //
    jQuery.media = jQuery.extend( {}, {
    	
        
        utils : {

	    	getMP4Format : function() {
				return "mp4";
		    },
		
			getMP4Codec : function() {
		    	return "avc1.4D401E, mp4a.40.2";
		    },
		    
		    getMP4VideoFormatType : function() {
		    	return 'video/' + jQuery.media.utils.getMP4Format() + '; codecs="' + jQuery.media.utils.getMP4Codec() + '"';
		    },
    	
            getSettings : function( settings ) {
                if( !settings ) { settings = {}; }
                if( !settings.initialized ) {
                    settings = jQuery.extend( jQuery.media.settings,{}, jQuery.media.settings, settings );
                    if(settings.video_url.search('.flv') != -1) {
                    	settings.canPlay = 'flash';
                    }
                    
                    else {
	                    // Check HTML5 codecs for playback //
		                var _elem = document.createElement("video");
		                
	                    if(jQuery.media.utils.checkType( _elem, jQuery.media.utils.getMP4VideoFormatType())){
	                    	settings.canPlay = jQuery.media.utils.getMP4Format();
	                        settings.codec = jQuery.media.utils.getMP4Codec();
	                    }
	                    /*
                        else if(jQuery.media.utils.checkType( _elem, 'video/webm; codecs="vp8, vorbis"')){
	                    	settings.canPlay = 'webm';
	                        settings.codec = 'vp8, vorbis';
	                    }
	                    */
	                    else{
	                        settings.canPlay = 'flash';
	                    }
                    }
                    
                    settings.initialized = true;
                }
                
                
                return settings;
            },

            getPlayer : function(settings)
            {
                var video_player;
                var _swf                    = new SWFObject(),
                    browser                 = !!settings.browser? settings.browser : '',
                    is_blackberry		    = browser == 'blackberry',
                    is_mobile               = browser.match()? true: false,
                    flash_enabled           = _swf.installedVer.major > 0 ? true : false;
                   
                    is_HTML5_available = jQuery.media.utils.checkType(document.createElement("video"), jQuery.media.utils.getMP4VideoFormatType());
                    
                /** If flash was detected as disabled **/
                if (flash_enabled)
                {
                    video_player = jQuery.media.player.display.mediaFlash( settings );
                }
                
                
                //video/flash; codecs='undefined'
                else if (is_HTML5_available)
            	{
                	video_player = jQuery.media.player.display.mediaHtml5( settings, function( data )
                         {
                             jQuery.media.player.onMediaUpdate( data );
                         });
            	}
                
                else if (is_blackberry) 
                {
                    video_player = jQuery.media.player.display.mediaBlackberry( settings );
                }
                
                //video_player = null;
                
                if(video_player != null)
            	{
                	
                	 video_player.createMedia();
                     jQuery(document).trigger('media.ga.load',settings);
                     return video_player;
            	}
                
                return jQuery.media.player.display.mediaNoPlayer( settings ).createMedia();
            },

            checkType : function(elem, playType){
                if((typeof elem.canPlayType) == 'function' ) {
                   return ("no" != elem.canPlayType(playType)) && ("" != elem.canPlayType(playType));
                } else {
                   return false;
                }
            },
            
            canPlayMp4 : function(elem) {
            	return checkType(elem, jQuery.media.utils.getMP4VideoFormatType());
            },

            formatTime : function(t){
                var s = Math.round(t);
                var m = 0;
                if (s > 0){
                    while (s > 59){
                        m++;
                        s -= 60;
                    }
                    return String((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
                } else {
                    return "00:00";
                }
            },

            getPercent : function(f, t) {
                return precent ? (f / t) : 0;
            },

            rgb2hex : function(rgb) {
                if(rgb.length <= 7){
                    rgb = rgb.slice(1-rgb.length);
                    if(rgb.length == 3) rgb = rgb+rgb;
                    return rgb;
                }else{
                    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    function hex(x) {
                        return ("0" + parseInt(x).toString(16)).slice(-2);
                    }
                    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                }
            },

            getCSSRule : function(ruleName, deleteFlag) {
               ruleName=ruleName.toLowerCase();
               if (document.styleSheets) {
                  for (var i=0; i<document.styleSheets.length; i++) {
                     var styleSheet=document.styleSheets[i];
                     var ii=0;
                     var cssRule=false;
                     do {
                        if (styleSheet.cssRules) {
                           cssRule = styleSheet.cssRules[ii];
                        } else {
                           cssRule = styleSheet.rules[ii];
                        }
                        if (cssRule)  {
                           if (cssRule.selectorText.toLowerCase()== ruleName) {
                              if (deleteFlag=='delete') {
                                 if (styleSheet.cssRules) {
                                    styleSheet.deleteRule(ii);
                                 } else {
                                    styleSheet.removeRule(ii);
                                 }
                                 return true;
                              } else {
                                 return cssRule;
                              }
                           }
                        }else{
                            $('.debug').html('false')
                        }
                        ii++;
                     } while (cssRule)
                  }
               }
               return false;
            },

            addCSSRule : function(ruleName) {
               if (document.styleSheets) {
                  if (! jQuery.media.utils.getCSSRule(ruleName)) {
                     if (document.styleSheets[0].addRule) {
                        document.styleSheets[0].addRule(ruleName, null,0);
                     } else {
                        document.styleSheets[0].insertRule(ruleName+' { }', 0);
                     }
                  }
               }
               return jQuery.media.utils.getCSSRule(ruleName);
            }
        }
    }, jQuery.media );

	/*jQuery.fn.onCIData = function( settings ) {

		if (oCIICBLDataObject[jQuery.media.settings.SKU].dealerCount > 0){
			alert("CI dealer count = "+oCIICBLDataObject[jQuery.media.settings.SKU].dealerCount);
			// Add listener to Buy Now button
		  	$('.mp_buy').bind('click', function(){
				// Google Analytics
	       		_gaq.push(['_trackEvent',settings.client_name+' Video Player', 'Buy', '"'+settings.video_id+'"']);
				// Open Dealers modal
	        	jQuery.fn.media.player.openModal('.mp_buy_mod');
           });
			// Show Buy Now button
           $('.mp_buy').fadeIn(500);
		} else {
			// Hide Buy Now button
			$('.mp_buy').hide();
		}
	};*/

})(jQuery);;

/****** jquery/jquery.pngFix.js ******/

/**
 * --------------------------------------------------------------------
 * jQuery-Plugin "pngFix"
 * Version: 1.2, 09.03.2009
 * by Andreas Eberhard, andreas.eberhard@gmail.com
 *                      http://jquery.andreaseberhard.de/
 *
 * Copyright (c) 2007 Andreas Eberhard
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Changelog:
 *    09.03.2009 Version 1.2
 *    - Update for jQuery 1.3.x, removed @ from selectors
 *    11.09.2007 Version 1.1
 *    - removed noConflict
 *    - added png-support for input type=image
 *    - 01.08.2007 CSS background-image support extension added by Scott Jehl, scott@filamentgroup.com, http://www.filamentgroup.com
 *    31.05.2007 initial Version 1.0
 * --------------------------------------------------------------------
 * @example $(function(){$(document).pngFix();});
 * @desc Fixes all PNG's in the document on document.ready
 *
 * jQuery(function(){jQuery(document).pngFix();});
 * @desc Fixes all PNG's in the document on document.ready when using noConflict
 *
 * @example $(function(){$('div.examples').pngFix();});
 * @desc Fixes all PNG's within div with class examples
 *
 * @example $(function(){$('div.examples').pngFix( { blankgif:'ext.gif' } );});
 * @desc Fixes all PNG's within div with class examples, provides blank gif for input with png
 * --------------------------------------------------------------------
 */

(function($) {

jQuery.fn.pngFix = function(settings) {

	// Settings
	settings = jQuery.extend({
		blankgif: 'images/blank-pixel.gif'
	}, settings);

	var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
	var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);

	if (jQuery.browser.msie && (ie55 || ie6)) {

		//fix images with png-source
		jQuery(this).find("img[src$=.png]").each(function() {

			jQuery(this).attr('width',jQuery(this).width());
			jQuery(this).attr('height',jQuery(this).height());

			var prevStyle = '';
			var strNewHTML = '';
			var imgId = (jQuery(this).attr('id')) ? 'id="' + jQuery(this).attr('id') + '" ' : '';
			var imgClass = (jQuery(this).attr('class')) ? 'class="' + jQuery(this).attr('class') + '" ' : '';
			var imgTitle = (jQuery(this).attr('title')) ? 'title="' + jQuery(this).attr('title') + '" ' : '';
			var imgAlt = (jQuery(this).attr('alt')) ? 'alt="' + jQuery(this).attr('alt') + '" ' : '';
			var imgAlign = (jQuery(this).attr('align')) ? 'float:' + jQuery(this).attr('align') + ';' : '';
			var imgHand = (jQuery(this).parent().attr('href')) ? 'cursor:hand;' : '';
			if (this.style.border) {
				prevStyle += 'border:'+this.style.border+';';
				this.style.border = '';
			}
			if (this.style.padding) {
				prevStyle += 'padding:'+this.style.padding+';';
				this.style.padding = '';
			}
			if (this.style.margin) {
				prevStyle += 'margin:'+this.style.margin+';';
				this.style.margin = '';
			}
			var imgStyle = (this.style.cssText);

			strNewHTML += '<span '+imgId+imgClass+imgTitle+imgAlt;
			strNewHTML += 'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;
			strNewHTML += 'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;';
			strNewHTML += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + jQuery(this).attr('src') + '\', sizingMethod=\'scale\');';
			strNewHTML += imgStyle+'"></span>';
			if (prevStyle != ''){
				strNewHTML = '<span style="position:relative;display:inline-block;'+prevStyle+imgHand+'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;'+'">' + strNewHTML + '</span>';
			}

			jQuery(this).hide();
			jQuery(this).after(strNewHTML);

		});

		// fix css background pngs
		jQuery(this).find("*").each(function(){
			var bgIMG = jQuery(this).css('background-image');
			if(bgIMG.indexOf(".png")!=-1){
				var iebg = bgIMG.split('url("')[1].split('")')[0];
				jQuery(this).css('background-image', 'none');
				jQuery(this).get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + iebg + "',sizingMethod='scale')";
			}
		});
		
		//fix input with png-source
		jQuery(this).find("input[src$=.png]").each(function() {
			var bgIMG = jQuery(this).attr('src');
			jQuery(this).get(0).runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + bgIMG + '\', sizingMethod=\'scale\');';
   		jQuery(this).attr('src', settings.blankgif)
		});
	
	}
	
	return jQuery;

};

})(jQuery);;

