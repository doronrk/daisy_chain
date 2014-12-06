!function(global) {
    var HAN = {};
    if (HAN.debug = 0, HAN.models = HAN.models || {}, HAN.init = function() {
        HAN.currentPage = new HAN.page();
    }, HAN.page = function() {
        this.ns = $("body").data("ns"), this.section = $("body").data("section"), this.page = $("body").data("page"), 
        this.ready = function(global) {
            this.site_init(global), this.section_init(global), this.page_init(global);
        }, this.site_init = function(scope) {
            HAN.ns.safe_exec(this.ns + ".common.ready", scope, "Template: ");
        }, this.section_init = function(scope) {
            HAN.ns.safe_exec(this.ns + "." + this.section + ".ready", scope, "Section: ");
        }, this.page_init = function(scope) {
            HAN.ns.safe_exec(this.ns + "." + this.section + "." + this.page + ".ready", scope, "Page: ");
        };
    }, HAN.log = function() {
        return 1 === HAN.debug && window.console && void 0 !== console.log ? (this.history = this.history || [], 
        this.history.push(arguments), console.log(Array.prototype.slice.call(arguments)), 
        !0) : !1;
    }, HAN.trace = function(message) {
        return 1 === HAN.debug && window.console && void 0 !== console.trace ? (console.trace(), 
        message && (HAN.log("Additional trace feedback attached:"), HAN.log(message)), !0) : !1;
    }, HAN.ns = {
        find: function(name, separator, container) {
            var i, len, ns = name.split(separator || "."), o = container || window;
            for (i = 0, len = ns.length; len > i; i++) if (o = o[ns[i]] = o[ns[i]] || !1, !o) return !1;
            return o;
        },
        exec: function(name) {
            var f = this.find(name);
            if (!f) throw "Undefined " + name;
            f();
        },
        safe_exec: function(name, scope, debug) {
            var func = this.find(name);
            debug && HAN.log(debug + "(" + name + ")" + (func ? " function found" : !1)), func && func(scope ? scope : global);
        }
    }, HAN.models.settings = function(config) {
        var data = config || {};
        this.set = function(key, value) {
            data[key] = value;
        }, this.get = function(key) {
            if (void 0 === data[key]) throw "Undefined key " + key;
            return data[key];
        }, this.setData = function(config) {
            data = config;
        }, this.getData = function() {
            return data;
        };
    }, HAN.env = new HAN.models.settings({}), global.HAN) throw new Error("The HAN namespace has already been defined!");
    global.HAN = HAN;
}(window), HAN.utilities = {
    bindContext: function(context, method) {
        return function() {
            return context[method].apply(context, Array.prototype.slice.call(arguments));
        };
    },
    bindEvents: function(context, events) {
        var key, splitKey, components;
        if (context.$el) for (key in events) splitKey = key.split(" "), components = [ splitKey.shift(), splitKey.join(" ") ], 
        events.hasOwnProperty(key) && context.$el.on(components[0], components[1], this.bindContext(context, events[key]));
    },
    carousel: function(selector, options) {
        var opts, defaults = {
            arrows: !0,
            autoplay: !1,
            autoplaySpeed: 5e3,
            dots: !1,
            draggable: !1,
            infinite: !1,
            slidesToShow: 4,
            slidesToScroll: 4,
            swipe: !1,
            touchMove: !1
        };
        options = options || {}, opts = $.extend(defaults, options), $(selector).slick(opts);
    }
}, HAN.common = {
    ready: function() {
        HAN.common.nav.init(), HAN.common.cta.init(), HAN.common.minicart.init(), $("header nav > ul > li").each(function(i, el) {
            var $self = $(el), left = $self.position().left;
            $self.children("div").css("left", left - 25);
        }), new Function("/*@cc_on return document.documentMode===10@*/")() && (document.documentElement.className += " ie ie10"), 
        $("input, textarea").placeholder();
    },
    nav: {
        $header: $("body > div.wrapper header"),
        dockNav: function() {
            document.documentElement.clientWidth >= 1005 && ($(window).scrollTop() < 70 ? (this.$header.removeClass("docked"), 
            $("#freeText").attr("placeholder", "Search by keyword or item #")) : (this.$header.addClass("docked"), 
            $("#freeText").attr("placeholder", "Search")));
        },
        init: function() {
            this.$header.length > 0 && ($(window).on("scroll", HAN.utilities.bindContext(this, "dockNav")), 
            this.dockNav());
        }
    },
    cta: {
        $ctas: $("main a .cta"),
        ctaHover: function() {
            this.$ctas.each(function(i, val) {
                $(this).closest("a").hover(function() {
                    $(val).addClass("hover");
                }, function() {
                    $(val).removeClass("hover");
                });
            });
        },
        init: function() {
            this.ctaHover();
        }
    },
    minicart: {
        $minicart: null,
        $minicartWrapper: null,
        addListeners: function() {
            var ns = HAN.common.minicart, $body = $("body");
            ns.$minicart.on("click." + ns + ", touchstart." + ns, function() {
                return ns.$minicart.hasClass("active") ? ns.hide() : ns.show(), !1;
            }), $body.on("click." + ns + ", touchstart." + ns, function(evt) {
                !ns.$minicartWrapper.is(evt.target) && 0 === ns.$minicartWrapper.has(evt.target).length && ns.$minicart.hasClass("active") ? ns.hide() : evt.stopPropagation();
            }), ns.$minicartWrapper.on("mouseenter." + ns, ns.stopTimer).on("mouseleave." + ns, ns.startTimer);
        },
        show: function() {
            var ns = HAN.common.minicart;
            ns.$minicart.addClass("active"), ns.$minicartWrapper.show();
        },
        hide: function() {
            var ns = HAN.common.minicart;
            ns.$minicart.removeClass("active"), ns.$minicartWrapper.hide();
        },
        startTimer: function(evt) {
            var ns = HAN.common.minicart;
            ns.timerHandle = window.setTimeout(ns.hide, 2e3, evt);
        },
        stopTimer: function() {
            var ns = HAN.common.minicart;
            ns.timerHandle && clearTimeout(ns.timerHandle);
        },
        init: function() {
            var ns = HAN.common.minicart;
            ns.$minicart = $("#minicart"), ns.$minicartWrapper = $("#minicart-wrapper"), ns.addListeners();
        }
    }
}, HAN.common = function(common) {
    return common.merchModule = function() {
        HAN.utilities.carousel(".merch-module ul", {
            slide: "li"
        });
    }, common;
}(HAN.common || {}), HAN.index = {
    ready: function() {},
    homepage: {
        ready: function() {
            HAN.common.merchModule();
            var stl_el = ".stl .slider > div";
            HAN.utilities.carousel(stl_el, {
                autoplay: !0,
                infinite: !0,
                dots: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                onAfterChange: function(slider, index) {
                    $(".stl .cta-small").attr("href", $(slider.$slides[index]).children("img").data("href"));
                },
                onInit: function() {
                    var dotwidth = 0;
                    $(stl_el).find(".slick-dots li").each(function() {
                        dotwidth += parseInt($(this).outerWidth(!0), 10);
                    }), $(stl_el).children("button").wrapAll('<div class="slick-arrows"></div>').each(function() {
                        var $this = $(this), offset = "calc(50% - " + (dotwidth / 2 + 20) + "px)";
                        $this.hasClass("slick-prev") ? $this.css("left", offset) : $this.css("right", offset);
                    });
                }
            });
        }
    },
    division: {
        ready: function() {
            HAN.common.merchModule();
            var stl_el = ".stl .slider > div";
            HAN.utilities.carousel(stl_el, {
                autoplay: !0,
                infinite: !0,
                dots: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                onAfterChange: function(slider, index) {
                    $("#slidelink").attr("href", $(slider.$slides[index]).children("a").attr("href"));
                },
                onInit: function() {
                    var dotwidth = 0;
                    $(stl_el).find(".slick-dots li").each(function() {
                        dotwidth += parseInt($(this).outerWidth(!0), 10);
                    }), $(stl_el).children("button").wrapAll('<div class="slick-arrows"></div>').each(function() {
                        var $this = $(this), offset = "calc(50% - " + (dotwidth / 2 + 20) + "px)";
                        $this.hasClass("slick-prev") ? $this.css("left", offset) : $this.css("right", offset);
                    });
                }
            });
        }
    }
}, HAN.shop = {
    ready: function() {},
    pdp: {
        ready: function() {
            HAN.shop.pdp.pdpBuyStack.init(), HAN.common.merchModule(), $('main a[href^="#"]').click(function(e) {
                var target = "#" + this.href.split("#")[1];
                if ("#modal" !== target.substring(0, 6) && $(target).length > 0) {
                    var target_top = $(target).offset().top, header_height = $("header").outerHeight();
                    e.preventDefault(), 0 === target_top && (target_top = $(target).closest(":visible").offset().top), 
                    $('input[name="product-details"]').filter(target).length > 0 && (target_top = $(target).closest("section").offset().top, 
                    $('input[name="product-details"]').filter(target).prop("checked", !0)), $("html, body").animate({
                        scrollTop: target_top - header_height
                    }, {
                        duration: 1500,
                        start: function() {
                            $("body").css("pointer-events", "none");
                        },
                        complete: function() {
                            $("body").css("pointer-events", "auto");
                        }
                    });
                }
            });
        },
        pdpBuyStack: {
            $el: $("#buy-stack"),
            $hiddenColorSelector: $('#pdp-colors select[name="color"]'),
            $hiddenSizeSelector: $('#pdp-sizes select[name="size"]'),
            events: {
                "click #add-to-cart": "addToCart",
                "click #personalize-it": "personalizeIt",
                "click #begin-checkout": "beginCheckout",
                "click #add-to-wishlist": "addToWishlist",
                "click #pdp-colors button:not(.active)": "changeSelectedColor",
                "click #pdp-sizes button:not(.active)": "changeSelectedSize",
                "change #pdp-qty select": "lowQuantityPoll",
                "click #pdp-views li": "changeView"
            },
            changeSelectedColor: function(evt) {
                var trigger = $(evt.currentTarget);
                this.setSelectedIndex(this.$hiddenColorSelector, trigger, trigger.children("img").attr("alt")), 
                this.updateBuyStackContent(), this.renderViews();
            },
            changeSelectedSize: function(evt) {
                var trigger = $(evt.currentTarget), dispsize = trigger.data("dispsize");
                this.setSelectedIndex(this.$hiddenSizeSelector, trigger, dispsize.toString().replace(/<br>/gi, "")), 
                this.updateBuyStackContent(), window.sizeSelectionChanged();
            },
            setSelectedIndex: function(target, trigger, triggerValue) {
                trigger.addClass("active").siblings().removeClass("active"), trigger.closest("div").prev("label").find("strong")[0].nextSibling.data = " " + triggerValue, 
                trigger.closest("div").siblings("select").find("option").each(function() {
                    var $this = $(this);
                    $this.val() === trigger.attr("value") ? $this.attr("selected", !0) : $this.attr("selected", !1);
                });
            },
            updateBuyStackContent: function() {
                HAN.log("updateBuyStackContent");
            },
            renderViews: function() {
                HAN.log("renderViews"), window.colorSelectionChanged(), this.setPrimaryImage($("#pdp-views ul li").first());
            },
            lowQuantityPoll: function() {
                HAN.log("lowQuantityPoll"), $("#pdp-colors button.active").data("lowqty") === !0 && $("#pdp-sizes button.active").data("lowqty") === !0 ? $("#pdp-low-qty").removeClass("hidden") : $("#pdp-low-qty").addClass("hidden");
            },
            changeView: function(evt) {
                HAN.log("changeView"), this.setPrimaryImage($(evt.currentTarget));
            },
            setPrimaryImage: function($liObj) {
                window.setMainImage($liObj);
            },
            checkIndexes: function() {
                HAN.log("checkIndexes"), 0 === this.$hiddenColorSelector.find("option:selected").index() || 0 === this.$hiddenSizeSelector.find("option:selected").index() ? $("#pdp-atc-error").removeClass("hidden") : $("#pdp-atc-error").addClass("hidden");
            },
            addToCart: function(evt) {
                HAN.log("addToCart"), window.addToBagClicked(""), evt.preventDefault();
            },
            personalizeIt: function(evt) {
                HAN.log("personalizeIt"), window.addToBagClicked("personalize"), evt.preventDefault();
            },
            beginCheckout: function(evt) {
                window.beginCheckoutClicked(), evt.preventDefault();
            },
            outOfStock: function() {
                HAN.log("outOfStock");
            },
            addToWishlist: function(evt) {
                HAN.log("addToWishlist"), window.addToWishListClicked(), evt.preventDefault();
            },
            init: function() {
                $("#pdp-sizes button.disabled").attr("disabled", !0).removeClass("disabled"), this.outOfStock(), 
                HAN.utilities.bindEvents(this, this.events);
            }
        }
    }
}, $(function() {
    HAN.init(), HAN.currentPage.ready(this);
}), HAN.debug = 1, HAN.root = {
    ready: function() {},
    index: {
        ready: function() {}
    }
}, $.extend(HAN.shop.pdp.pdpBuyStack, {
    changeSelectedColor: function(evt) {
        var trigger = $(evt.currentTarget);
        this.setSelectedIndex(this.$hiddenColorSelector, trigger, trigger.children("img").attr("alt")), 
        this.updateBuyStackContent(), this.renderViews(), "color-1" === trigger.attr("value") ? ($("#pdp-views #primary-view").attr("src", "/images/fpo/pdp/primary-1b.png"), 
        $("#pdp-views ul li").each(function(index) {
            $(this).children("img").attr("src", "/images/fpo/flower-dress-b.jpg").attr("data-primary", "/images/fpo/pdp/primary-" + (index + 1) + "b.png");
        })) : "color-2" === trigger.attr("value") && ($("#pdp-views #primary-view").attr("src", "/images/fpo/pdp/primary-1a.png"), 
        $("#pdp-views ul li").each(function(index) {
            $(this).children("img").attr("src", "/images/fpo/flower-dress-a.jpg").attr("data-primary", "/images/fpo/pdp/primary-" + (index + 1) + "a.png");
        }));
    },
    outOfStock: function() {
        "#out-of-stock" === window.location.hash && ($("#pdp-qty, #pdp-cta").hide(), $("#pdp-out-of-stock").show());
    }
}), "undefined" == typeof jQuery && alert("Hashgrid: jQuery not loaded. Make sure it's linked to your pages.");

var hashgrid = function(set) {
    function getModifier(e) {
        if (null === options.modifierKey) return !0;
        var m = !0;
        switch (options.modifierKey) {
          case "ctrl":
            m = e.ctrlKey ? e.ctrlKey : !1;
            break;

          case "alt":
            m = e.altKey ? e.altKey : !1;
            break;

          case "shift":
            m = e.shiftKey ? e.shiftKey : !1;
        }
        return m;
    }
    function getKey(e) {
        var k = !1, c = e.keyCode ? e.keyCode : e.which;
        return k = 13 == c ? "enter" : String.fromCharCode(c).toLowerCase();
    }
    function saveState() {
        createCookie(options.cookiePrefix + options.id, (sticky ? "1" : "0") + "-" + overlayZState + "-" + classNumber, 1);
    }
    function showOverlay() {
        overlay.show(), overlayVert.css({
            width: overlay.width()
        }), overlayVert.children(".vert").each(function() {
            var vCol = $(this);
            vCol.css("display", "inline-block"), vCol.offset().top > vCol.parent().offset().top && vCol.hide();
        });
    }
    function keydownHandler(e) {
        var k, m, source = e.target.tagName.toLowerCase();
        if ("input" == source || "textarea" == source || "select" == source) return !0;
        if (m = getModifier(e), !m) return !0;
        if (k = getKey(e), !k) return !0;
        if (alreadyDown[k]) return !0;
        switch (alreadyDown[k] = !0, k) {
          case options.showGridKey:
            overlayOn ? sticky && (overlay.hide(), overlayOn = !1, sticky = !1, saveState()) : (showOverlay(), 
            overlayOn = !0);
            break;

          case options.holdGridKey:
            overlayOn && !sticky && (sticky = !0, saveState());
            break;

          case options.foregroundKey:
            overlayOn && (overlay.css("z-index") == overlayZForeground ? (overlay.css("z-index", overlayZBackground), 
            overlayZState = "B") : (overlay.css("z-index", overlayZForeground), overlayZState = "F"), 
            saveState());
            break;

          case options.jumpGridsKey:
            overlayOn && options.numberOfGrids > 1 && (overlay.removeClass(options.classPrefix + classNumber), 
            classNumber++, classNumber > options.numberOfGrids && (classNumber = 1), overlay.addClass(options.classPrefix + classNumber), 
            showOverlay(), /webkit/.test(navigator.userAgent.toLowerCase()) && forceRepaint(), 
            saveState());
        }
        return !0;
    }
    function keyupHandler(e) {
        var k, m = getModifier(e);
        return m ? (k = getKey(e), alreadyDown[k] = !1, k && k == options.showGridKey && !sticky && (overlay.hide(), 
        overlayOn = !1), !0) : !0;
    }
    function createCookie(name, value, days) {
        var date, expires = "";
        days && (date = new Date(), date.setTime(date.getTime() + 24 * days * 60 * 60 * 1e3), 
        expires = "; expires=" + date.toGMTString()), document.cookie = name + "=" + value + expires + "; path=/";
    }
    function readCookie(name) {
        for (var c, ca = document.cookie.split(";"), i = 0, len = ca.length, nameEQ = name + "="; len > i; i++) {
            for (c = ca[i]; " " == c.charAt(0); ) c = c.substring(1, c.length);
            if (0 === c.indexOf(nameEQ)) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    function forceRepaint() {
        var ss = document.styleSheets[0];
        try {
            ss.addRule(".xxxxxx", "position: relative"), ss.removeRule(ss.rules.length - 1);
        } catch (e) {}
    }
    var alreadyDown, gridLines, gridWidth, i, line, lineHeight, numGridLines, overlay, overlayCookie, overlayEl, overlayVert, pageHeight, setKey, state, top, $ = jQuery, options = {
        id: "grid",
        modifierKey: null,
        showGridKey: "g",
        holdGridKey: "h",
        foregroundKey: "f",
        jumpGridsKey: "j",
        numberOfGrids: 1,
        classPrefix: "grid-",
        cookiePrefix: "hashgrid"
    }, classNumber = 1, overlayOn = !1, overlayZState = "B", overlayZBackground = -1, overlayZForeground = 9999, sticky = !1;
    if ("object" == typeof set) for (setKey in set) options[setKey] = set[setKey]; else "string" == typeof set && (options.id = set);
    if ($("#" + options.id).length > 0 && $("#" + options.id).remove(), overlayEl = $("<div></div>"), 
    overlayEl.attr("id", options.id).css({
        display: "none",
        pointerEvents: "none"
    }), $("body").prepend(overlayEl), overlay = $("#" + options.id), "auto" == overlay.css("z-index") && overlay.css("z-index", overlayZBackground), 
    pageHeight = parseFloat($(document).height()), overlay.height(pageHeight), overlay.append('<div id="' + options.id + '-horiz" class="horiz first-line">'), 
    top = overlay.css("top"), overlay.css({
        top: "-999px",
        display: "block"
    }), line = $("#" + options.id + "-horiz"), lineHeight = line.outerHeight(), overlay.css({
        display: "none",
        top: top
    }), 0 >= lineHeight) return !1;
    for (numGridLines = Math.floor(pageHeight / lineHeight), gridLines = "", i = numGridLines - 1; i >= 1; i--) gridLines += '<div class="horiz"></div>';
    for (overlay.append(gridLines), overlay.append($('<div class="vert-container"></div>')), 
    overlayVert = overlay.children(".vert-container"), gridWidth = overlay.width(), 
    overlayVert.css({
        width: gridWidth,
        position: "absolute",
        top: 0
    }), overlayVert.append('<div class="vert first-line">&nbsp;</div>'), gridLines = "", 
    i = 0; 30 > i; i++) gridLines += '<div class="vert">&nbsp;</div>';
    return overlayVert.append(gridLines), overlayVert.children().height(pageHeight).css({
        display: "inline-block"
    }), overlayCookie = readCookie(options.cookiePrefix + options.id), "string" == typeof overlayCookie ? (state = overlayCookie.split("-"), 
    state[2] = Number(state[2]), "number" != typeof state[2] || isNaN(state[2]) || (classNumber = state[2].toFixed(0), 
    overlay.addClass(options.classPrefix + classNumber)), "F" == state[1] && (overlayZState = "F", 
    overlay.css("z-index", overlayZForeground)), "1" == state[0] && (overlayOn = !0, 
    sticky = !0, showOverlay())) : overlay.addClass(options.classPrefix + classNumber), 
    $(document).bind("keydown", keydownHandler), $(document).bind("keyup", keyupHandler), 
    alreadyDown = {}, {};
};

$(function() {
    new hashgrid({});
});