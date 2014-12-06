lg.Carousel = lg.Component.extend({
    options: {
        actionstart: "click",
        actionend: "mouseleave",
        multiplier: 3,
        paneview: false,
        actionelement: "",
        url: "",
        transitions: head.csstransitions
    },
    init: function (d, c) {
        this._super(d, c);
        this.itemWidth;
        this.scrollWidth;
        this.intNumItems;
        this.totalMoves;
        this.madeMoves = 0;
        this.intPos = 0;
        this.currentSlide = 0;
        this.slideMoves = 0;
        if (this.options.url) {
            this.updateContent(this.options.url)
        } else {
            this._build()
        }
        this.log("initComplete", this.element)
    },
	/* 20140628 add [S] */
	_activePosition: function(){
		var idx = this.contentDiv.find('.active').index()+1;
		this.madeMoves = Math.ceil(idx / this.options.multiplier)-1;
			
		var el = this.contentDiv.find('.active');
		var src = el.find('a > span > img').attr('src');
		if(src){
			if(src.lastIndexOf('.png') != -1){
				src = src.replace('.png', '_on.png');
			}
			el.find('a > span > img').attr('src', src);
		}
		if(this.madeMoves > 0){
			var w = this.scrollWidth * this.madeMoves;
			this.intPos = -w;
			this.contentDiv.css({'left': '-'+w+'px'});
			this.arrowLeft.removeClass("disabled");
			if (this.madeMoves == this.totalMoves) {
				this.arrowRight.addClass("disabled")
			}
		}
	},
	/* 20140628 add [E] */
    _build: function () {
        this.contentDiv = $("ul:first", this.element);
        this.slides = $(this.contentDiv).children("li");
		/* LGECN-1104  20140103 add */
        if(this.element.hasClass("addcarousel")){
        	this.arrowLeft = this.element.find(".carousel-arrow-left.addcarousel");
        	this.arrowRight = this.element.find(".carousel-arrow-right.addcarousel");
        }else{
        	this.arrowLeft = $(".carousel-arrow-left", this.element);
        	this.arrowRight = $(".carousel-arrow-right", this.element);
        }
        if(this.element.hasClass("ctrlIndicator")){ 	
        	this.carouselIndicator = this.element.prev("#carousel-indicator");
        }
		/* //LGECN-1104  20140103 add */
        this.log("CSS transitions: ", this.options.transitions);
        this.itemWidth = this.slides.first().width() + parseInt(this.slides.first().css("margin-left"));
        this.scrollWidth = this.itemWidth * this.options.multiplier;
        this.intNumItems = this.slides.length;
        this.totalMoves = Math.ceil(this.intNumItems / this.options.multiplier) - 1;
        this.imgWidth = parseInt($(".carousel2 ul li").css("width"));
        this.imgCnt = $(".carousel2 ul li").length;

		
        if (this.contentDiv.hasClass("carousel2-slider")) {
            timer = true;
            this.runTimer()
        }
        this.contentDiv.css({
            width: (this.intNumItems * this.itemWidth + 200) + "px"
        });
        if (this.intNumItems == 1) {
            this.arrowLeft.hide();
            this.arrowRight.hide()
        }
        if (this.slides.length <= this.options.multiplier) {
            this.arrowRight.addClass("disabled")
        }
        this.addRollovers();
        this.arrowLeft.bind("click", $.proxy(function (b) {
            if (this.arrowRight.parent().hasClass("carousel2")) {
                b.preventDefault();
                this.scrollLeft2()
            } else {
                b.preventDefault();
                this.scrollLeft()
				
            }
        }, this));
        this.arrowRight.bind("click", $.proxy(function (b) {
            if (this.arrowRight.parent().hasClass("carousel2")) {
                b.preventDefault();
                this.scrollRight2()
            } else {
                b.preventDefault();
                this.scrollRight()

            }
        }, this));

		/* LGECN-1104  20140103 add */
        if(this.element.hasClass("ctrlIndicator")){ 
	        this.carouselIndicator.find("ul li a").bind("click", $.proxy(function (b) {
	        	if(this.carouselIndicator.find("ul li.active").index()<$(b.target).parent().index()){
	        		this.scrollRight($(b.target).parent().index()-this.carouselIndicator.find("ul li.active").index(),$(b.target).parent().index());
	        	}else if(this.carouselIndicator.find("ul li.active").index()>$(b.target).parent().index()){
	        		this.scrollLeft(this.carouselIndicator.find("ul li.active").index()-$(b.target).parent().index(),$(b.target).parent().index());
	        	}
				
				b.preventDefault();
	        }, this));
        }
		/* //LGECN-1104  20140103 add */
        this.contentDiv.css({
            display: "block"
        });
        this.element.parent().css({
            position: "relative"
        });
        if (this.element.hasClass("carouselLazy")) {
            lg.addImages(this.element)
        }
		/* 20140628 add [S] */
		if(this.contentDiv.find('.active').hasClass('active')){
			this._activePosition();
		}
		/* 20140628 add [E] */
        this.log("buildComplete")
    },
    updateContent: function (b) {
        $.get(b, $.proxy(function (a) {
            $(this.element).append(innerShiv(a));
            this._build();
            lg.addImages(this.element);
            this.callback(this.element)
        }, this))
    },
	/* LGECN-1104  20140103 modify */
    scrollLeft: function (p,i) {
    	if(typeof p!="undefined"){
    		this.scrollWidth = this.scrollWidth*p
    	}
        if (this.madeMoves > 0) {
            this.broadcast("tooltipper", "close", this.element.find(".hotspot"));
            this.broadcast("video", "resetVideo", this.element.find(".video"));

			/* SMG-xxxx Recommendation Product - Comapre : 20130819 */
			if(this.contentDiv.closest("#recommend-compare").size()) {
				this.intPos = this.intPos + 50;

			}
			/* //SMG-xxxx Recommendation Product - Comapre : 20130819 */
            if (this.options.transitions) {
                this.contentDiv.animate({
                    left: this.intPos + this.scrollWidth
                }, "slow", function () {
                    lg.loadImages();
                    lg.loadLazyIframe();
                    lg.loadLazyFlash();
                    lg.loadLazyScrollIframe('scroll');
                })
            } else {
                this.contentDiv.stop().animate({
                    left: this.intPos + this.scrollWidth
                }, "slow", function () {
                    lg.loadImages();
                    lg.loadLazyIframe();
                    lg.loadLazyFlash();
                    lg.loadLazyScrollIframe('scroll');
                })
            }
            
            this.intPos = this.intPos + this.scrollWidth;
            if(typeof p!="undefined"){
            	this.madeMoves = i;
            	this.scrollWidth = this.scrollWidth/p;
        	}else{
        		this.madeMoves--;
        	}
            this.arrowRight.removeClass("disabled");
            if(this.element.hasClass("ctrlIndicator")){ 	
            	this.carouselIndicator = this.element.prev("#carousel-indicator");
            	this.carouselIndicator.find("ul li").removeClass("active");
                this.carouselIndicator.find("ul li:eq(" + this.madeMoves + ")").addClass("active");
            }
            if (this.madeMoves < 1) {
                this.arrowLeft.addClass("disabled")
            }
            $(".modal-window").removeClass("animate");
            if (!this.options.transitions) {
                $(".modal-window").addClass("invisible")
            }
        }
        this.log("arrow-left clicked")
    },
    scrollRight: function (p,i) {
    	if(typeof p!="undefined"){
    		this.scrollWidth = this.scrollWidth*p
    	}
        if (this.madeMoves < this.totalMoves) {
            this.broadcast("tooltipper", "close", this.element.find(".hotspot"));
            this.broadcast("video", "resetVideo", this.element.find(".video"));

			/* SMG-xxxx Recommendation Product - Comapre : 20130819 */
			if(this.contentDiv.closest("#recommend-compare").size()) {
				this.intPos = this.intPos - 50;

			}
			/* //SMG-xxxx Recommendation Product - Comapre : 20130819 */
			
            if (this.options.transitions) {
                this.contentDiv.animate({
                    left: this.intPos - this.scrollWidth
                }, "slow", function () {
                    lg.loadImages();
                    lg.loadLazyIframe();
                    lg.loadLazyFlash();
                    lg.loadLazyScrollIframe('scroll');
                })
            } else {
                this.contentDiv.stop().animate({
                    left: this.intPos - this.scrollWidth
                }, "slow", function () {
                    lg.loadImages();
                    lg.loadLazyIframe();
                    lg.loadLazyFlash();
                    lg.loadLazyScrollIframe('scroll');
                })
            }
            this.intPos = this.intPos - this.scrollWidth;
            if(typeof p!="undefined"){
            	this.madeMoves = i;
            	this.scrollWidth = this.scrollWidth/p;
        	}else{
        		this.madeMoves++;
        	}
            this.arrowLeft.removeClass("disabled");
            if(this.element.hasClass("ctrlIndicator")){ 	
            	this.carouselIndicator = this.element.prev("#carousel-indicator");
            	this.carouselIndicator.find("ul li").removeClass("active");
                this.carouselIndicator.find("ul li:eq(" + this.madeMoves + ")").addClass("active");
            }
            if (this.madeMoves == this.totalMoves) {
                this.arrowRight.addClass("disabled")
            }
            $(".modal-window").removeClass("animate");
            if (!this.options.transitions) {
                $(".modal-window").addClass("invisible")
            }
        }
        this.log("arrow-right clicked")
    },
    /* //LGECN-1104  20140103 modify */
    scrollLeft2: function () {
        timer = false;
        if (this.slideMoves > 0) {
            this.madeMoves = this.slideMoves - 1;
            this.intPos = -this.madeMoves * this.scrollWidth;
            this.slideMoves = 0
        }
        if (this.madeMoves > 0) {
            this.broadcast("tooltipper", "close", this.element.find(".hotspot"));
            this.broadcast("video", "resetVideo", this.element.find(".video"));
            if (this.options.transitions) {
                this.contentDiv.animate({
                    left: this.intPos + this.scrollWidth
                }, "slow", function () {
                    lg.loadImages();
                    lg.loadLazyIframe();
                    lg.loadLazyFlash();
                    lg.loadLazyScrollIframe('scroll');
                })
            } else {
                this.contentDiv.stop().animate({
                    left: this.intPos + this.scrollWidth
                }, "slow", function () {
                    lg.loadImages();
                    lg.loadLazyIframe();
                    lg.loadLazyFlash();
                    lg.loadLazyScrollIframe('scroll');
                })
            }
            this.madeMoves--;
            this.intPos = this.intPos + this.scrollWidth;
            this.arrowRight.removeClass("disabled");
            if (this.madeMoves < 1) {
                this.arrowLeft.addClass("disabled")
            }
            $(".modal-window").removeClass("animate");
            if (!this.options.transitions) {
                $(".modal-window").addClass("invisible")
            }
        }
        this.log("arrow-left clicked")
    },
    scrollRight2: function () {
        timer = false;
        if (this.slideMoves > 0) {
            this.madeMoves = this.slideMoves - 1;
            this.intPos = -this.madeMoves * this.scrollWidth;
            this.slideMoves = 0
        }
        if (this.madeMoves < this.totalMoves) {
            this.broadcast("tooltipper", "close", this.element.find(".hotspot"));
            this.broadcast("video", "resetVideo", this.element.find(".video"));
            if (this.options.transitions) {
                this.contentDiv.animate({
                    left: this.intPos - this.scrollWidth
                }, "slow", function () {
                    lg.loadImages();
                    lg.loadLazyIframe();
                    lg.loadLazyFlash();
                    lg.loadLazyScrollIframe('scroll');
                })
            } else {
                this.contentDiv.stop().animate({
                    left: this.intPos - this.scrollWidth
                }, "slow", function () {
                    lg.loadImages();
                    lg.loadLazyIframe();
                    lg.loadLazyFlash();
                    lg.loadLazyScrollIframe('scroll');
                })
            }
            this.madeMoves++;
            this.intPos = this.intPos - this.scrollWidth;
            this.arrowLeft.removeClass("disabled");
            if (this.madeMoves == this.totalMoves) {
                this.arrowRight.addClass("disabled")
            }
            $(".modal-window").removeClass("animate");
            if (!this.options.transitions) {
                $(".modal-window").addClass("invisible")
            }
        }
        this.log("arrow-right clicked")
    },
    addRollovers: function () {
        this.slides.each($.proxy(function (d, c) {
            if (this.options.actionelement != "") {
                $(this.options.actionelement + ":first", c).parent().bind(this.options.actionstart, $.proxy(function (a) {
                    a.preventDefault();
                    this.handleRollovers($(a.target).closest("li"), "start")
                }, this)).bind(this.options.actionend, $.proxy(function (a) {
                    a.preventDefault();
                    this.handleRollovers($(a.target).closest("li"), "end")
                }, this))
            }
        }, this));
        this.log("addRollovers: " + this.options.actionstart + " " + this.options.actionend)
    },
    handleRollovers: function (g, e) {
        if (e == "start") {
            if (this.options.paneview) {
                $(".three60, .pane").removeClass("active");
                $("li", this.element).removeClass("active");
                $(g).addClass("active");
                pane = $(".pane:eq(" + $(g).index() + ")");
                pane.addClass("active");
                var f = pane.find(".three60").data("three60");

                if (f && f.reveal) {
                    f.reveal()
                }
                this.broadcast("tooltipper", "close");
                if ($(".pane-asideWrap").length > 0) {
                    if (pane.children(".three60").length > 0 || pane.find(".video .player").length > 0) {
						$(".pane-asideWrap").css("visibility", "hidden");

						/* 20140328 360View : ansooyune add S */
						setTimeout(function(){ $('.three60 a').filter(':first').focus() }, 100);
						/* 20140328 360View : ansooyune add E */
						
                    } else {
                        $(".pane-asideWrap").css("visibility", "visible");
                    }
                    var h;
					/* 20140519 choyearang modify */
                    ($(g).find("span input.galleryZoom").length > 0) ? h = $(g).find("a input.galleryZoom").val() : h = $(g).find("a img").attr("data-src").replace("/small", "/large");
                    $(".tooltip .payload .image-wrapper img:first").attr("data-src", h).attr("src", h);

					/* LGECI-1202 : Modifying the gallery image descriptions  Parkminsuk 20130205 add */
        		    if(document.location.href.indexOf('/ca_en') != -1 || document.location.href.indexOf('/ca_fr') != -1) {
                            	var galDesc = ($(g).find("a input.galleryDesc").length > 0)?$.trim($(g).find("a input.galleryDesc").attr("value")) :$("div.product-info h2").text();
                            	if(galDesc =="" || galDesc == null){galDesc=$("div.product-info h2").text();}
                                $(".tooltip .payload span.mgDesc").text(galDesc); 	
                            }
        		    /* LGECI-1202 : Modifying the gallery image descriptions  Parkminsuk 20130205 add */
                }
                lg.addImages(pane)
            }
        } else {}
        this.log("handleRollovers: ", e)
    },
    runTimer: function () {
        if (timer) {
            if (this.currentSlide < this.imgCnt) {
                if ($.browser.webkit || $.browser.mozilla) {
                    $(".carousel2 ul").css({
                        left: -this.currentSlide * this.imgWidth
                    })
                    lg.loadImages();
                    lg.loadLazyIframe();
                    lg.loadLazyFlash()
                    lg.loadLazyScrollIframe('scroll');
                } else {
                    $(".carousel2 ul").animate({
                        left: -this.currentSlide * this.imgWidth
                    }, "slow", function () {
                    	
                    	lg.loadImages();
                        lg.loadLazyIframe();
                        lg.loadLazyFlash()
                    	lg.loadLazyScrollIframe('scroll');
                    })
                }
                this.currentSlide++;
                this.slideMoves++;
                if (this.currentSlide == 1) {
                    $("div.carousel2 > div.carousel-arrow-left").addClass("disabled");
                    $("div.carousel2 > div.carousel-arrow-right").removeClass("disabled")
                } else {
                    if (this.currentSlide == this.imgCnt) {
                        $("div.carousel2 > div.carousel-arrow-right").addClass("disabled")
                    } else {
                        $("div.carousel2 > div.carousel-arrow-left").removeClass("disabled")
                    }
                }
            } else {
                $(".carousel2 ul").css({
                    left: 0
                });
                $("div.carousel2 > div.carousel-arrow-left").addClass("disabled");
                $("div.carousel2 > div.carousel-arrow-right").removeClass("disabled");
                this.slideMoves = 1;
                this.currentSlide = 1
            }
            if ($("input[name=interval]").val() == "" || $("input[name=interval]").val() == null) {
                setTimeout($.proxy(this.runTimer, this), 10000)
            } else {
                setTimeout($.proxy(this.runTimer, this), $("input[name=interval]").val())
            }
        }
    }
});
var timer = "";
lg.plugin("carousel", lg.Carousel, ".carousel");