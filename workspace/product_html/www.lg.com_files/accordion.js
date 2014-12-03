lg.Accordion = lg.Component.extend({
    options: {
        transitions: head.csstransitions,
        animation: true,
        selected: 1,
        started : true
    },
    init: function (b, a) {
        this._super(b, a);
        this._build();
        $(this.element).find(".accordian-content").css({
            "max-height": "none",
            height: "auto",
            overflow: "hidden",
            "-moz-transition": "height 0.5s !important",
            "-webkit-transition": "height 0.5s !important",
            transition: "height 0.5s !important"
        })
    },
    _build: function () {
        this.options.started = true;

        $(".accordion-content > div").each(function () {
            $('> ul:not(".legend")', this).addClass("first")
        });
        this.setHeights();
        $(".accordion-expand-all > a, .accordion-expand-all > label").unbind("click").bind("click", $.proxy(function (e) {
			e.preventDefault();
            this.expandAll();
            this.options.started = false;
        }, this));
        $("#expand, #collapse", this.element).hide();
        $("#expand", this.element).css('display','inline-block');

        this.selected = this.options.selected - 1;
        this.selectedItem = this.element.children(".accordion-item").eq(this.selected);
        if (this.options.selected !== false && this.element.is(":visible")) {
            var b = this.element.parentsUntil(null, ".accordion");
            var a = b.length ? b.length * 1000 : 0;
            setTimeout($.proxy(function () {
                this.toggleItem(this.selectedItem);
			/* LGEUS-2216 : kosangin add*/
                if($('.us-expnd').length > 0){
                	this.expandAll();                    
                }/*//LGEUS-2216 : kosangin add*/
                this.options.started = false;
            }, this), a)
        } else {
            if (this.options.selected !== false && !this.element.is(":visible")) {
                this.loadInterval = setInterval($.proxy(function () {
                    this.log("checking visibility...");
                    if (this.element.is(":visible")) {
                        this.toggleItem(this.selectedItem);
				            /* LGEUS-2216 : kosangin add*/
                            if($('.us-expnd').length > 0){
                            	this.expandAll();
                            }/*//LGEUS-2216 : kosangin add*/
                        clearInterval(this.loadInterval)
                        this.options.started = false;
                    }
                }, this), 200)
            }
        }
        this.log("Accordion build complete.", this.options)
    },
    setHeights: function () {
        this.element.children(".accordion-item").each($.proxy(function (a, b) {
            $(b).find("> a, > label").unbind("click").bind("click", $.proxy(function (c) {
                c.preventDefault();
                if ($(c.target).parent().get(0).tagName.toLowerCase() == "a" && $(c.target).parent().next().length == 0) {
                    location.href = $(c.target).attr("href")
                } else {
                    this.toggleItem(c.target)
                }
            }, this));
            $("ul.first> li, ul.legend > li, .accordion-content-wrapper > dl", b).css("height", "auto");
            tallestHeight = [];
			$("ul.first, ul.legend, .accordion-content-wrapper", b).each(function (c, d) {
                $("> li, > dl", this).each(function (e) {
                    if (($(this).height() > tallestHeight[e]) || typeof tallestHeight[e] == "undefined") {
                        tallestHeight[e] = $(this).height()
                    }
                });
                $("> li:even, > dl:even", this).addClass("even")
            });

            $("ul.first, ul.legend", b).each(function (c, d) {
                $("> li", this).each(function (e) {
                    $(this).height(tallestHeight[e] + "px")
                })
            })
        }, this))
    },
    toggleItem: function (a) {
        $item = $(a).closest(".accordion-item");
        if ($item.hasClass("active")) {
            this.closeItem($item);
        } else {
            this.openItem($item);
        }
    },
    openItem: function (a) {
        $item = $(a).closest(".accordion-item");
        $content = $item.children(".accordion-content");
        $item.addClass("active");
		
		/* add ansooyune 20140324 S */
		$item.find("> a > .visuallyhidden.show-con").hide();
        $item.find("> a > .visuallyhidden.hide-con").show();

		/* modify parkjeongmi 20120912 S */
		var c = 0;
        for (var b = 0; b < $content.children().length; b++) {
			/* modify ansooyune 20140324 S */
            c = $content.children(":eq(" + b + ")").height() + parseInt($content.children(":eq(" + b + ")").css("margin-top")) + parseInt($content.children(":eq(" + b + ")").css("margin-bottom"));
			$content.data("setheight", c)
        }

        $content.css({
            "max-height": "10000px",
            height: "0"
        });
        $content.animate({
            height: $content.data("setheight") + "px"
        }, "slow", function () {
            $(this).css("height", "auto")
        });
		/* modify parkjeongmi 20120912 E */

        $(".compare .item-info-wrapper").css({
            width: "0px",
            overflow: "visible"
        });
        setTimeout(function () {
            $(".compare .item-info-wrapper").css({
                width: "740px",
                overflow: "hidden"
            })
        }, 600)
    },
    closeItem: function (a) {
        $item = $(a);
        $content = $item.children(".accordion-content");
		
		/* add ansooyune 20140324 S */
        $item.find("> a > .visuallyhidden.show-con").show();
        $item.find("> a > .visuallyhidden.hide-con").hide();

        var b = $content.outerHeight(true);
        $item.removeClass("active");
        $content.css({
            "max-height": "10000px",
            height: "auto"
        });
        $content.animate({
            height: "0"
        }, "slow", function () {
            $(this).css("max-height", "0")
        })
    },
    expandAll: function () {
        $el = $(".accordion-expand-all", this.element);
        var b = $(".accordion-item");
        var a = b.length;
        if (!$el.hasClass("active")) {
            $el.addClass("active");
            if ($.browser.msie && $.browser.version < 9) {
                this.openItem($(".accordion-item:not(.active)"))
            } else {
                for (var c = 0; c < a; c++) {
                    if (!$(b[c]).hasClass("active")) {
                        this.openItem(b[c])
                    }
                }
            }
            $("#collapse", this.element).css('display','inline-block');
            $("#expand", this.element).hide();
            
            if(this.options.started == false) { $("#collapse", this.element).focus() }
        } else {
            $el.removeClass("active");
            if ($.browser.msie && $.browser.version < 9) {
                this.closeItem($(".accordion-item.active"))
            } else {
                for (var c = 0; c < a; c++) {
                    if ($(b[c]).hasClass("active")) {
                        this.closeItem(b[c])
                    }
                }
            }
            $("#collapse", this.element).hide();
            $("#expand", this.element).css('display','inline-block');

            if(this.options.started == false) { $("#expand", this.element).focus(); }
        }
    },
    closeAll: function () {
        $el = $(".accordion-expand-all", this.element);
        $el.removeClass("active");
        this.closeItem(this.element.find(".accordion-item.active"));
        $("#collapse", this.element).hide();
        $("#expand", this.element).css('display','inline-block');
        if(this.options.started == false) { $("#expand", this.element).focus(); }
    }
});
lg.plugin("accordion", lg.Accordion, ".accordion");