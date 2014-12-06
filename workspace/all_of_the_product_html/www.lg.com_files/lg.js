var pagePath = $("html").attr("id").split("-page")[0];
var transitionEnd = "transitionend webkitTransitionEnd";

jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit /.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
jQuery.browser.version = head.browser.version;

var lg = {
	navCategory: $("html").data("nav-category"),
	subNavCategory: $("html").data("subnav-category"),
	locale: "/" + $("html").data("countrycode"),
	compareLoc: $("html").data("compareloc"),
	compareCategory: escape($("html").data("compare-category")),
	printTemplate: $("html").data("print-template"),
	productNumber: $("html").data("product-number"),
	bvUrl: "",
	checkVisible: function(q) {
		var t = $(window).scrollTop(),
			r = t + $(window).height(),
			m = q.offset().top,
			p = m + q.height();
		var l = $(window).scrollLeft(),
			n = $(window).width(),
			o = q.offset().left,
			u = o + q.width();
		return (p >= t && m <= r && u >= l && o <= n)
	},
	addImages: function(c) {
		this.images = this.images.add(c.find(lg.lazySelector));
		this.content = this.content.add(c.find(lg.lazyContentSelector));
		this.lazyIframe = this.content.add(c.find(lg.lazyIframeSelector));
		this.scrolllazyIframe = this.content.add(c.find(lg.scrolllazyIframeSelector));
		this.lazyFlash = this.content.add(c.find(lg.lazyFlashSelector));
		this.needsLoad = true;
		this.contentNeedsLoad = false;
		this.iframeNeedsLoad = true;
		this.scrollIframeNeedsLoad = true;
		this.flashNeedsLoad = true;
		$(window).unbind("scroll").bind("scroll", lg.onScroll);
		this.interval = setInterval(lg.checkScroll, 500)
	},
	loadImages: function() {
		var c = 0;
		this.images.each(function() {
			$img = $(this);
			if (lg.checkVisible($img) && $img.css("visibility") != "hidden" && $img.is(":visible")) {
				c++;
				$img.load(function() {
					$(this).closest("span").removeClass("loader")
				});
				$img.attr("src", $img.data("src"));
				lg.images = lg.images.not($img)
			}
		});
		if (!this.images.length) {
			$(window).unbind("scroll",lg.onScroll);
			clearInterval(this.interval)
		}
		this.needsLoad = false
	},
	/* use array : yunyoungseo 2012-09-10 S */
	loadContent: function() {
		lazyContent = new Array;
		this.content.each(function(n) {
			lazyContent[n] = $(this);
			uri = lazyContent[n].attr("data-uri");
			if (lg.checkVisible(lazyContent[n]) && lazyContent[n].hasClass("lazy")) {

				if (!lazyContent[n].hasClass("lazyLoaded")) {
					lazyContent[n].addClass("lazyLoaded");
					$.ajax({
						url: uri,
						timeout: 50000,
						success: function(c) {
							lazyContent[n].html(c);
							lazyContent[n].removeClass("lazy")
						},
						complete: function() {
							if (lazyContent[n].hasClass("carousel")) {
								lazyContent[n].addClass("carouselLazy");
								lazyContent[n].data("carousel")._build()
							}
						},
						error: function() {
							console.log("Error getting lazy loaded content")
						}
					})
				}

			}
		});
		this.contentNeedsLoad = false
	},
	/* use array : yunyoungseo 2012-09-10 E */
	loadLazyIframe: function() {
		$(".lazyIframeCont").each(function() {
			lazyIframes = $(this);
			iframeSrc = lazyIframes.attr("href");
			iframeWid = lazyIframes.attr("data-width");
			iframeHt = lazyIframes.attr("data-height");
			iframeTitle = lazyIframes.attr("data-title");
			if (lg.checkVisible(lazyIframes) && lazyIframes.hasClass("lazyIframeCont")) {

				/* floating overlap issue */
				var adAttribute = '';
				if(iframeSrc.indexOf("youtube.")){
					if(!(typeof(document.getElementsByTagName("html")[0].getAttribute("data-product-number")) != "string")){
						var iframeSrcSplit = iframeSrc.replace('youtube.com/v/','youtube.com/embed/').split(/[\?\&]+/).reverse();
						iframeSrc = iframeSrcSplit.pop();
						var iframeSrcParam = iframeSrcSplit.reverse().join("&");
						iframeSrc = iframeSrc+(iframeSrcParam.length?"?"+iframeSrcParam+"&wmode=transparent":"?wmode=transparent");
						adAttribute = ' wmode="opaque" allowfullscreen';
					}
				}
				var c = '<iframe src="' + iframeSrc + '" width="' + iframeWid + '" height="' + iframeHt + '" title="' + iframeTitle + '" scrolling="no" frameborder="0" class="lazyLoadedIframe" style="overflow:hidden"'+adAttribute+'></iframe>';

				// var c = '<iframe src="' + iframeSrc + '" width="' + iframeWid + '" height="' + iframeHt + '" title="' + iframeTitle + '" scrolling="no" frameborder="0" class="lazyLoadedIframe" style="overflow:hidden"></iframe>';

				$(c).insertBefore(lazyIframes);
				lazyIframes.remove()
			}
		});
		this.iFrameNeedsLoad = false
	},



	/* caption load 140410 */
	loadLazyIframeCaption: function() {
		var captionNum = 0;
		var captionTot = $('.lazyIframeCaption:not([href=""])').length;
		$(".lazyIframeCaption").each(function() {
			lazyIframesCaption = $(this);
			if (lazyIframesCaption.hasClass("lazyIframeCaption") && lazyIframesCaption.attr("href") != "") {
				lazyIframesCaption.after('<div class="caption-wrapper"></div>');
				lazyIframesCaption.next("div.caption-wrapper").load($(this).attr("href"), function(){
					lazyIframesCaption.remove();
					captionNum++;

					if(captionNum == captionTot) {
						lg.captionAction();
					}
				})
			}

		});
	},

	/* 140410 add */
	captionAction: function(){
		var $captionBtn = $(".caption-btn"),
			$captionArea = $(".caption-area"),
			$captionClose = $(".caption-close");

		$captionBtn.on('click', function(){
			if($(this).parent().find($captionArea).hasClass("caption-layer") == true){
				if($(this).parent().find($captionArea).css("display") == "none"){
					$(this).parent().find($captionArea).fadeIn();
					$(this).find(".view").hide();
					$(this).find(".hide").show();

				} else {
					$(this).parent().find($captionArea).fadeOut();
					$(this).find(".hide").hide();
					$(this).find(".view").show();
				}
			} else if ($(this).parent().find($captionArea).hasClass("caption-accordion") == true) {
				if($(this).parent().find($captionArea).css("display") == "none"){
					$(this).parent().find($captionArea).slideDown("slow");
					$(this).find(".view").hide();
					$(this).find(".hide").show();
				} else {
					$(this).parent().find($captionArea).slideUp("slow");
					$(this).find(".hide").hide();
					$(this).find(".view").show();
				}
			}
		});

		$captionClose.on('click', function(e){
			$(this).parent($captionArea).fadeOut();

			$(this).parent($captionArea).parent().find(".hide").hide();
			$(this).parent($captionArea).parent().find(".view").show();
			$(this).parent($captionArea).parent().find($captionBtn).focus();
			e.preventDefault();
		});

		$captionClose.on('keydown', $.proxy(function (b) {
			if($(b.target).parent().hasClass("caption-layer") == true){
				if(b.keyCode == 9 && b.shiftKey) {
					b.preventDefault();
					$captionArea.find("*[tabindex='0']").focus();
				} else if (b.keyCode == 9) {
					b.preventDefault();
					$captionArea.find("*[tabindex='0']").focus();
				}
			}
		}, this));

		$captionArea.find("*[tabindex='0']").on('keydown', $.proxy(function (b) {
			if($(b.target).parent().hasClass("caption-layer") == true){
				if(b.keyCode == 9 && b.shiftKey) {
					b.preventDefault();
					$captionClose.focus();
				} else if (b.keyCode == 9) {}
			}
		}, this));
	},
	loadLazyScrollIframe: function(e) {
		$(".ScrolllazyIframeCont").each(function() {
			scolllazyIframes = $(this);
			scolllazyIframesPosi = scolllazyIframes.parent();
			scolliframeSrc = scolllazyIframes.attr("href");
			scolliframeWid = scolllazyIframes.attr("data-width");
			scolliframeHt = scolllazyIframes.attr("data-height");
			scolliframeTitle = scolllazyIframes.attr("data-title");
			if (scolllazyIframesPosi.offset().left > 0 && lg.checkVisible(scolllazyIframesPosi) && scolllazyIframes.hasClass("ScrolllazyIframeCont") && scolllazyIframes.parent().find('iframe.scrolllazyLoadedIframe').length == 0) {
				var g = '<iframe src="' + scolliframeSrc + '" width="' + scolliframeWid + '" height="' + scolliframeHt + '" title="' + scolliframeTitle + '" scrolling="no" frameborder="0" class="scrolllazyLoadedIframe" style="overflow:hidden"></iframe>';
				$(g).insertBefore(scolllazyIframes);
				scolllazyIframes.css({
					position: 'absolute'
				});
			} else {
				if ((scolllazyIframesPosi.offset().left < 0 || !lg.checkVisible(scolllazyIframesPosi)) && scolllazyIframes.parent().find('iframe.scrolllazyLoadedIframe').length >= 1 && e == 'scroll') {
					scolllazyIframes.parent().find('iframe.scrolllazyLoadedIframe').remove();
				} else {
					null;
				}
			}
		});
		this.scrollIframeNeedsLoad = false
	},
	loadLazyFlash: function() {
		$(".lazyFlash").each(function() {
			var p = $(this);
			var n = p.attr("data-src");
			var m = p.attr("data-width");
			var k = p.attr("data-height");
			var j = "";
			if (p.attr("data-altimg")) {
				j = p.attr("data-altimg")
			}
			var o = "<img src='" + j + "' alt='Get Adobe Flash player' />";
			if (!j || j == "") {
				o = "<p>You need Adobe Flash player</p>"
			}
			p.css({
				width: m + "px",
				height: k + "px",
				"margin-left": "auto",
				"margin-right": "auto"
			});
			if (lg.checkVisible(p) && p.hasClass("lazyFlash")) {
				var l;
				if ($.browser.msie) {
					l = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='" + m + "' height='" + k + "'><param name='movie' value='" + n + "' /><param name='wmode' value='transparent' />" + o + "</object>"
				} else {
					l = "<object type='application/x-shockwave-flash' data='" + n + "' width='" + m + "' height='" + k + "'><param name='wmode' value='transparent' />" + o + "</object>"
				}
				p.empty().html(l).css({
					visibility: "visible"
				}).find("object").css({
					visibility: "visible"
				});
				p.removeClass("lazyFlash").css("background-image", "none")
			}
		});
		this.flashNeedsLoad = false
	},
	onScroll: function() {
		lg.needsLoad = true;
		lg.contentNeedsLoad = true;
		lg.iframeNeedsLoad = true;
		lg.iframeCaptionLoad = true;
		lg.scrollIframeNeedsLoad = true;
		lg.flashNeedsLoad = true;
		/* LGERU-1466 20140626 add*/
		lg.goTop();
		/* LGERU-1466 20140626 add*/
		// $(".top-floating").topFloating("scrolling")
	},
	needsLoad: true,
	contentNeedsLoad: false,
	iframeNeedsLoad: true,
	scrollIframeNeedsLoad: true,
	flashNeedsLoad: true,
	checkScroll: function() {
		if (lg.needsLoad) {
			lg.loadImages()
		}
		if (lg.flashNeedsLoad) {
			if ($(".lazyFlash")) {
				lg.loadLazyFlash()
			}
		}
		if (lg.iframeNeedsLoad) {
			if ($(".lazyIframeCont")) {
				lg.loadLazyIframe()
			}
		}
		/* if (lg.iframeNeedsLoad) {
			if ($(".lazyIframeCaption")) {
				lg.loadLazyIframeCaption()
				lg.captionAction()
			}
		} */

		if (lg.scrollIframeNeedsLoad) {
			if ($(".ScrolllazyIframeCont")) {
				lg.loadLazyScrollIframe()
			}
		}
		if (lg.contentNeedsLoad) {
			if (lg.content) {
				lg.loadContent()
			}
		}
	},
	lazySelector: 'img[src$="b.gif"]',
	lazyContentSelector: ".lazy",
	init: function() {

		this.images = $(lg.lazySelector);
		this.content = $(lg.lazyContentSelector);
		this.lazyIframe = $(".lazyIframeCont");
		this.lazyFlash = $(".lazyFlash");
		this.scrolllazyIframe = $(".ScrolllazyIframeCont");
		this.interval = setInterval(lg.checkScroll, 500);
		$(window).bind("scroll", lg.onScroll).trigger("scroll");
		// if ($("header").length > 0) {
		// 	$(window).bind("resize", lg.buildNav).trigger("resize");
		// }

		setTimeout(lg.buildNav,100)

		$.getJSON(lg.locale + "/js/msg.json", function(b) {
			lg.msgs = b;
			lg.updateCompareButton()
		});

		lg.loadMsg(function(){});


		if($(".caption-wrapper .caption-btn").length) lg.captionAction();

		lg.loadLazyIframeCaption();
		lg.initBypass();
		lg.buildFooter();
		lg.placeholderFix();
		lg.attachTriggers();
		/* LGEDE-1255 :20140820 add*/
		if(lg.locale == "/de" && $('.expansion-btn').length > 0){
			$('.cta, .ex-btn-wrap').css({visibility:'hidden'});
			lg.dropdownButton();
		}
        /*//LGEDE-1255 :20140820 add*/
		$(".back").on("click", function(b) {
			b.preventDefault();
			lg.smoothScroll()
		});
		var d, e;
		$("html").bind("keydown", function(b) {
			d = b.keyCode ? b.keyCode : b.charCode;
			if ((e == 91 || e == 93 || e == 17 || e == 224) && d == 80) {
				b.preventDefault()
			}
			e = d
		}).bind("keyup", function(b) {
			d = "";
			e = ""
		});
		$(document).on("click", ".print", function(b) {
			b.preventDefault();
			if (lg.printTemplate) {
				window.open(lg.printTemplate)
			} else {
				lg.handlePrint()
			}
		});
		$(".lg-support").on("click", ".prints", function(b) {
			b.preventDefault();
			/* LGEUS-2705 : 20130313 add & modify */
			$(this).parents('div.registraion').find('iframe').attr('id', 'ifrm-print');
			if ($(document).find(".iframes").length > 0) {
				$(".iframes iframe").each(function() {
					$(this).focus();
				})
			}
			if (lg.printTemplate) {
				window.open(lg.printTemplate);
			} else if ($("body").find(".iframes iframe").length > 0 && lg.locale != "/cn") {
				if ($.browser.msie) {
					$("#ifrm-print").focus();
					window.frames["ifrm-print"].focus();
					window.frames["ifrm-print"].print();
					return false;
				} else {
					$(this).parents('div.registraion').find('iframe').get(0).contentWindow.print();
				}
				/* //LGEUS-2705 : 20130313 add & modify */
			} else {
				lg.handlePrint();
			}
		});
		if (lg.productNumber) {
			lg.compare.view_add(escape(lg.productNumber))
		}
		$(".column2 iframe").bind("load", function() {
			if (lg.iframeLoaded) {
				if ($("body").find(".lg-support").length < 1 && $(this).parents(".share").length < 1) {
					lg.smoothScroll($(this))
				}
			}
		});
		setTimeout(function() {
			lg.iframeLoaded = true
		}, 1000);
		if (location.hostname == "lg.com" || location.hostname == "www.lg.com") {
			lg.bvUrl = "https://secure2.prodregister.com/lge3/lg_bv_newuser.aspx"
		} else {
			lg.bvUrl = "http://stage2.prodregister.com/lge3/lg_bv_newuser.aspx"
		}

	},/* LGEDE-1255 :20140825 add*/
    dropdownButton: function (c) {
    	$(".expansion-btn .ex-btn-wrap > a").attr("href", "javascript:void(0)");

		if($('.cta').find('.price').length > 0 && $('.cta').find('.ratings-wrapper').length > 0){
			if($('.product-info .cta').find('.wrapbtn').length > 0){
				$('div.price, .ratings-wrapper').unwrap("<div class='wrapbtn' />");
			}
			$('div.price, .ratings-wrapper').wrapAll("<div class='wrapbtn' />");
		}
		 setTimeout(function() {
			 $('.cta, .ex-btn-wrap').css({visibility:'visible'});
		 }, 100);

		if($('.grid-page').find('.product')){
			$('.tooltip.glance').addClass('cate');
			$('.content-pages').css({paddingBottom:"40px"});
			$('.page-controls').css({marginTop:"10px"});
			$('.expansion-btn').next('.product-compare').css({marginTop:'5px'});
		}
		if($.browser.webkit){
			$('.expansion-btn').next('.product-compare').css({marginTop:'3px'});
		}

		if (!$.browser.msie) {$('.product-info .cta .ratings-wrapper').css({float:'right'});}

		$('body').css('overflow-x', 'hidden');
		$('#search-page .new_search_list > li, .cta-wrapper, .product-list-wrap.carousel9, .module.simple4').css('overflow', 'visible');
		if($('.product-list-wrap.carousel9').find('.expansion-btn').length > 1){
			$('.product-list-wrap.carousel9').addClass('ty01');
		}
		if($('.compare-view #items-wrapper').find('.expansion-btn').length > 1 && $('.ratings').length > 1){
			$('.compare-view #items-wrapper').addClass('ty01');
		}else if($('.compare-view #items-wrapper').find('.product-price').text().length > 0){
			$('.compare-view #items-wrapper').addClass('ty02');
		}
		if($('#search-page .search_list_btns').find('.expansion-btn').length > 1){
			$('#search-page .search_list_btns').addClass('ty01');

			if ($.browser.msie && head.browser.version < 8) {
				$(".new_search_result_list .details").css({zIndex:"0",position:"initial"});
				 setTimeout(function() {
					 $(".details").css({position:"initial"});
				 }, 50);
			}

		}

		if ($.browser.msie && $('#search-page').length > 0) {
			 $('.tabpanel').css({marginTop:'30px'});
			 $('.new_search_list').css({marginBottom:'30px'});

		}

		var _findExBtn, _exwidths = 0;
		(c != null && c !="undefined")? _findExBtn =  c.find('.ex-btn-wrap'): _findExBtn = $('.ex-btn-wrap');
		_findExBtn.each(function(){
			var _exmaxWidth = 0;
			var _exwidths = 0;
			$(this).find('a').each(function() {
			   _exmaxWidth = Math.max(_exmaxWidth, $(this).outerWidth(true));
		   	if($(this).parents('.cta-button').length > 0){
			   _exwidths =  _exmaxWidth;
		   	}
			}).get();

			/*alert(_exmaxWidth);*/
			if(_exmaxWidth > 140){
				_exmaxWidth = '140';
			}else if(_exmaxWidth < 95){
				_exmaxWidth = '95';
			}
			$(this).css('width',parseInt(_exmaxWidth) + parseInt('32'));
			$(this).parent().css('width',parseInt(_exmaxWidth) + parseInt('32'));
			$(this).find('ul li').css('width',parseInt(_exmaxWidth) + parseInt('30'));
			$(this).find('ul').css('width',parseInt(_exmaxWidth) + parseInt('37'));
			$(this).parents('.cta-button').css('width',parseInt(_exwidths) + parseInt('47'));

			/*if (!$.browser.msie) {
				$(this).parents('.expansion-btn').css({width :parseInt(_exmaxWidth) + parseInt('52'),display:'inline-block'});
			}else{
				$(this).parents('.expansion-btn').css({width :parseInt(_exmaxWidth) + parseInt('60')})
			}	*/
	    });
		// mouse
		_findExBtn.hover(
			function (e) {
				e.preventDefault();
				e.stopPropagation();
				if ($.browser.msie) {
					this.style.removeAttribute('filter');
				}
				$('ul', this).parent('div').addClass('focus exOver');
				$('ul', this).stop(true, true).slideDown('300');
			},
			function (e) {
				e.preventDefault();
				e.stopPropagation();
				if ($.browser.msie) {
					this.style.removeAttribute('filter');
				}
				$('ul', this).stop(true, true).slideUp('300');
				$('ul', this).parent('div').removeClass('focus exOver');
			}
		);
		// focus
		_findExBtn.bind("focusin", "> a", function(e) {
			if ($.browser.msie) {
				this.style.removeAttribute('filter');
			}
			$('ul', this).stop(true, true).slideDown('300');
			$('ul', this).parent('div').addClass('focus exOver');
		});
		_findExBtn.find('> a , li:last-child').unbind("focusout").bind("focusout", function(e) {
			setTimeout(function() {
				if (_findExBtn.find(":focus").length < 1 && !(e.keyCode == 9 && e.shiftKey)){
					_findExBtn.find('> ul').slideUp('300');
					_findExBtn.removeClass("focus exOver");
					$('ul', this).parent('div').removeClass('focus exOver');
				}
			}, 10);
		});
    },/* LGEDE-1255 :20140825 add*/
	auimginit: function() {
		if ($('input[name=substitutional]').length > 0 && $('input[name=substitutional]').val() == 'Y') {
			$('.feature-content').find('img').each(function() {
				if ($(this).attr('data-replace-src')) {
					$(this).attr('data-src', $(this).attr('data-replace-src'));
				}
			})
		}
	},
	handlePrint: function() {
		imgs = $('img[src$="b.gif"]');
		if (!imgs.length) {
			window.print()
		}
		imgsLoaded = 0;
		imgs.each(function() {
			$(this).attr("src", $(this).data("src"));
			if (this.complete) {
				imgsLoaded++;
				if (imgsLoaded == imgs.length) {
					setTimeout(function() {
						window.print()
					}, 1500)
				}
			}
		})
	},
	iframeLoaded: false,
	onCompareClick: function() {
		var e = lg.compare.pageCategory();
		var d = $(this).data("product-id");
		if (lg.compare.isin(escape(d), e)) {
			lg.compare.remove(escape(d), e);
			$('input.compare[data-product-id="' + d + '"]').prop("checked", false).siblings("span.btn").show().parent().next('button').off('click').remove(); // ansooyune, 2014-04-29
		} else {
			if (lg.compare.count(e) < 8) {
				lg.compare.add(escape(d), e)
			} else {
				lg.showError("comparelimit")
			}
		}
		lg.updateCompareButton()
	},
	updateCompareButton: function(d) {
		if (!lg.msgs.compare) {
			setTimeout(lg.updateCompareButton, 200);
			return
		}
		$(".compare-selected").addClass("disabled white");
		$("a.clear-compare").on("click", function(b) {
			b.preventDefault();
			$("input.compare:checked").prop("checked", false).siblings("span.btn").show().parent().next('button').off('click').remove(); // ansooyune, 2014-04-29
			$('input').removeAttr('disabled').closest('label').removeClass('disabled'); // leejunhee, 2012-10-16
			$(".compare-btn span").text("0");
			$("#compared-items").removeClass("opened");
			$("#compared-items").find(".compared").remove();
			lg.compare.empty(lg.compare.pageCategory())
		});
		var e = lg.compare.count(lg.compare.pageCategory());
		$(".compare-btn").off("click").on("click", function(b) {
			b.preventDefault();
			if (lg.compare.get(lg.compareCategory).length) {
				window.location = lg.compareLoc
			}
		}).find("span").text(e);
		$(".compare-selected").off("click").on("click", function(b) {
			b.preventDefault();
			if (lg.compare.get(lg.compareCategory).length) {
				window.location = lg.compareLoc
			}
		}).find("span").text(e);
		$("button.btn.button span").text(e);
		for (i = 0; i < lg.compare.get(lg.compareCategory).length; i++) {
			/* 140429 modify */
			$(".compare-selected").removeClass("disabled white");
			cid = unescape(lg.compare.get(lg.compareCategory)[i]);
			$el = $('input.compare[data-product-id="' + cid + '"]');
			$el.parent().next('button.small.white.button').remove();
			$el.parent().find('span.btn').hide();
			$el.parent().after('<button></button>');
			$cb = $el.parent().next('button');
			$el.prop("checked", true);
			$cb.addClass("btn small white button", true);
			$cb.html(lg.msgs.compare.label + " (<span>" + lg.compare.count(lg.compareCategory) + "</span>)");
			$cb.on("click", function(b) {
				b.preventDefault();
				b.stopPropagation();
				window.location = lg.compareLoc
			});
			/* 140429 modify */
		}
		if (lg.compare.count(lg.compareCategory) >= 8) {
			$("input.compare:not(:checked)").attr("disabled", "disabled").parent().addClass("disabled")
		} else {
			$("input.compare:not(:checked)").removeAttr("disabled").parent().removeClass("disabled");
			$("input.compare:checked").removeAttr("disabled").parent().removeClass("disabled")
		}
		$("input.compare").each(function(b, c) {
			$el = $(c);
			$el.unbind("click").bind("click", lg.onCompareClick)
			$el.on('keydown', function(d) {
				if(d.keyCode == 13) return false;
			});
		})
		$(".btn-compare").each(function(b, c) {
			$el = $(c);
			$el.unbind("click").bind("click", lg.onCompareClick)
			$el.on('keydown', function(d) {
				if(d.keyCode == 13) return false;
			});
		})
	},
	msgs: {},
	showError: function(e) {
		if (typeof lg.modal === "undefined") {
			lg.modal = $("#message-modal");
			lg.modalHeader = lg.modal.find(".header"), lg.modalBody = lg.modal.find(".body");
			lg.modalCloseFn = function(b) {

				b.preventDefault();
				lg.modal.bind(transitionEnd, function() {
					$(this).css("visibility", "hidden").unbind(transitionEnd)
				});
				lg.modal.removeClass("active")

			}
			lg.modal.find(".close").bind("click", lg.modalCloseFn)
			lg.modal.find(".cancel").bind("click", lg.modalCloseFn)
		}
		var d = function(b) {
			lg.modalHeader.text(b.header);
			lg.modalBody.text(b.body);
			lg.modal.addClass("active").css({
				visibility: "visible",
				top: $(document).scrollTop() + ($(window).height() / 2) - 200,
				/* 20140519 choyearang modify */
				left: ($(".container").width() / 2) - (lg.modal.width() / 2)
			})

			/* 20140519 choyearang add */
			setTimeout(function(){
				lg.modal.find(".cancel").focus();
			},100);
		};

		/*if (!lg.msgs[e]) {
			// $.getJSON(lg.locale + "/js/msg.json", function(b) {
			// 	lg.msgs = b;
			// 	d(lg.msgs[e])
			// })

			// $.get(lg.locale + "/js/msg.json",function(dat){
			// 	lg.msgs = dat;
			// 	d(lg.msgs[e])
			// 	console.log(2,lg.msgs)
			// })

		} else {
			d(lg.msgs[e])
		}*/

		lg.loadMsg(function(){ d(lg.msgs[e]); });

	},
	placeholderFix: function(e) {
		var f = document.createElement("input");
		$el = e ? $(e) : $("body");
		var g = document.createElement("input");
		var placeholderFn = function(el) {
			if (!("placeholder" in g) && $(el).attr("placeholder") != "") {
				if ($(el).attr("placeholder") == $(el).val() || $(el).val() == "" || !$(el).val()) {
					$(el).val($(el).attr("placeholder"));
					$(el).bind("focus focusin", function() {
						$(el).val() == $(el).attr("placeholder") ? $(el).val("") : null
					}).bind("blur focusout", function() {
						$(el).val() == "" ? $(el).val($(el).attr("placeholder")) : null
					})
				}
			}else{
				/* LGEGMO-113 20140306 add*/
				if ($(el).attr("placeholder") == $(el).val() || $(el).val() == "" || !$(el).val()) {
					var _nonIE = $(el).attr("placeholder");
					$(el).bind("focus focusin", function () {
						$(el).removeAttr("placeholder");
					}).bind("blur focusout", function () {
						$(el).attr("placeholder",_nonIE);
					})
				}
				/* //LGEGMO-113 20140306 add*/
			}
		}

		$("input[placeholder]", $el).each(function(){ placeholderFn(this) });
		$("textarea[placeholder]", $el).each(function(){ placeholderFn(this) });

		/* SMG-3805 : 201221 add */
		if (lg.locale == "/es") {
			$(".btn-search").unbind("click").bind("click", function(s) {


				if (($(this).parent().find('input.psearch').attr('placeholder') == null || $(this).parent().find('input.psearch').attr('placeholder') == undefined) && $(this).parent().find('input.psearch').val() == '') {
					var _left = $('header').offset().left + $('div.psearchWarning').width();
					$('div.wrapper > header > .innerwrap').append('<div class="psearchWarning">' + lg.msgs.searchMsg.blankMsg + '</div>');

					if ($('div.psearchWarning').css('display') == 'none') {

						if ($(this).parents('div#utils').attr('id') == 'utils') {
							$('div.wrapper > header').find('div.psearchWarning').css({
								top: $(this).offset().top + 30,
								display: 'block'
							});
						} else {
							$('div.wrapper > header').find('div.psearchWarning').css({
								top: $(this).offset().top + -35,
								right: '-2px',
								display: 'block'
							});
						}
						setTimeout(function() {
							$('div.wrapper > header').find('div.psearchWarning').remove();
						}, 3000);

						$('input.psearch').focus(function() {
							$('div.wrapper > header').find('div.psearchWarning').remove();
							$('input.psearch').unbind('focus');
						});
					} else {
						$('div.wrapper > header').find('div.psearchWarning').remove();
					}

				} else {
					if ($.browser.msie && head.browser.version == 9) {
						($(this).parent('form').attr('onSubmit') == 'return false;') ? $(this).parent('form').attr('onSubmit', 'return true;') : null;
					} else {
						($(this).parent('form').attr('onSubmit') == 'return false;') ? $(this).parent('form').removeAttr('onSubmit') : null;
					}
					$(this).parent().submit();
				}
			});

			$("input.psearch").unbind('keydown').bind("keydown", function(b) {
				var evt = b ? b : window.event;
				var keyCode = b.keyCode ? b.keyCode : b.which ? b.which : b.charCode;
				var _left = $('header').offset().left + $('div.psearchWarning').width();
				if (keyCode == 13) {

					if (($(this).parent().find('input.psearch').attr('placeholder') == null || $(this).parent().find('input.psearch').attr('placeholder') == undefined) && $(this).parent().find('input.psearch').val() == '') {

						$('div.wrapper > header > .innerwrap').append('<div class="psearchWarning">' + lg.msgs.searchMsg.blankMsg + '</div>');

						if ($('div.psearchWarning').css('display') == 'none') {
							if ($(this).parents('div#utils').attr('id') == 'utils') {
								$('div.wrapper > header').find('div.psearchWarning').css({
									top: $(this).offset().top + 25,
									display: 'block'
								});
							} else {
								$('div.wrapper > header').find('div.psearchWarning').css({
									top: $(this).offset().top + -40,
									right: '-2px',
									display: 'block'
								});
							}

							setTimeout(function() {
								$('div.wrapper > header').find('div.psearchWarning').remove();
							}, 3000);
							$('input.psearch').focus(function() {
								$('div.wrapper > header').find('div.psearchWarning').remove();
								$('input.psearch').unbind('focus');
							});
						} else {
							$('div.wrapper > header').find('div.psearchWarning').remove();
						}
					} else {
						if ($.browser.msie && head.browser.version == 9) {
							($(this).parent('form').attr('onSubmit') == 'return false;') ? $(this).parent('form').attr('onSubmit', 'return true;') : null;
						} else {
							($(this).parent('form').attr('onSubmit') == 'return false;') ? $(this).parent('form').removeAttr('onSubmit') : null;
						}
						$(this).parent().find(".btn-search").click();
					}
				}
			});
		}
		/* //SMG-3805 : 201221 add */
		$(".btn-search").bind("click", function() {
			($(this).parent().find('.psearch').val() == $(this).parent().find('.psearch').attr('placeholder')) ? $(this).parent().find('.psearch').val("") : null;
			$(this).parent().submit()
		})
	},
	buildNav: function() {

		setTimeout(function(){

			var _navWidth = 0;
			var _wrapWidth = $("header").children("div.innerwrap:eq(0)").width();
			var _maxHeight = [];

			var $nl = $("nav.main-navigation")
			var $nav = $nl.removeClass("init, set").children("ul").children("li");

			$nav.each(function(i) {
				_navWidth += $(this).outerWidth(true);
			});

			$nav.last().addClass("last")

			if (head.browser.ie && head.browser.version < 8) {
				// if(_navWidth<_wrapWidth) {
				_space = _wrapWidth - _navWidth;
				_gap = Math.floor(_space / ($nav.length - 1));
				_rest = _space%($nav.length - 1);
				$nav.not("li:first-child").css("marginLeft", _gap + "px").filter("li:lt("+(_rest)+")").css("marginLeft",(_gap+1)+"px");
				// }
				$nl.addClass("init")
			}

			for (var a = 0; a < $nav.length; a++) {

				var $this = $nav.eq(a);
				var $submenu = $this.children("div.gnb-submenu");
				var $submenuLi = $submenu.children("ul").children("li").removeAttr("style");

				var _curWidth = 0;
				var _ml = 0;
				var _rowIds = [];

				_maxHeight[a] = 0;

				if ($submenu.length) {

					// Inline style initialized
					$submenu.removeAttr("style");
					$submenuLi.removeAttr("style");

					// Get the left position of submenu layer
					var _posX = $submenu.css("marginLeft", "-1px").offset().left - $nl.offset().left;

					// Add a skip link
					if (!$submenu.children("p.skiplink").length) {

						var $_nextTab = $this.next("li").children("h2").find("a");
						var _nextTabName = $_nextTab.text().replace(/\//g, '-').replace(/ /g, '_').toLowerCase();
						var _nextTabText = $_nextTab.text();
						if (!$_nextTab.length) {
							_nextTabText = "Main Content";
							_nextTabName = "Content";
						}
						$_nextTab.attr("id", _nextTabName)
						$submenu.prepend("<p class='skiplink'><a href='#" + _nextTabName + "' data-skiplink-index='" + a + "'><span></span></a></p>");

						$submenu.children("p.skiplink").on("click", "a", function(e) {
							e.preventDefault();
							var $next = $nav.eq($(e.target).data("skiplinkIndex") + 1)
							if ($next.length) {
								$next.find('h2 a').focus();
							} else {
								$("[href='#content']:eq(0)").trigger("click");
							}
						})

					}

					$submenuLi.find("ul").removeAttr("style").find("li").removeAttr("style");

					for (var b = 0; b < $submenuLi.length; b++) {

						var $menu = $submenuLi.eq(b);
						var $menuUl = $menu.children("ul, div");
						var $menuChild = $menuUl.children("li, dl");

						if ($menu.hasClass("columnB")){
							var bMax = 0
							$menuUl.filter(".cols").each(function(){
								bMax = Math.max($(this).height(),bMax)
							}).height(bMax)
						}

						if ($menu.hasClass("columnC")||$menu.hasClass("columnD")||$menu.hasClass("columnE")) {

							var _row = 0;
							var _cnt = Math.ceil($menuChild.length / 2);

							$menuChild.filter("li:nth-child(" + _cnt + "n+1)").addClass("row-begin");
							$menuChild.addClass("first-row").not(":lt(" + _cnt + ")").removeClass("first-row").addClass("second-row");
							$menuUl.addClass("col-" + _cnt);

							$menuChild.each(function(c) {
								if (c % _cnt == 0) _row++;
								$(this).attr("data-rowid", (a + 1) + "" + (b + 1) + "" + _row);
							})

							if ($menuChild.siblings(".second-row").length < $menuChild.not(".second-row").length) {
								// $menuChild.siblings(".second-row").height(/).addClass("right-border");
								// $menuChild.siblings(".second-row:not(.row-begin)").addClass("right-border");
								$menuChild.eq($menuChild.length-1).addClass("right-border")
							}

							$this.find("li[data-rowid]").each(function(i) {
								_rowIds.push($(this).data("rowid"))
							});
							_rowids = $.unique(_rowIds).sort();

						}

						if ($menu.hasClass("columnD")) {

							var _cnt = Math.floor($menuChild.length);
							var _hcnt = Math.ceil($menuChild.length / 2);
							var _left = $menu.offset().left;
							var _mx = 0,
								_my = 0;

							for (var d = 0; d < $menuChild.length; d++) {
								var $curcol = $menuChild.eq(d);
								if (d < _hcnt) {
									$curcol.css("left", (d ? ($menuChild.eq(d - 1).offset().left + $menuChild.eq(d - 1).outerWidth(true) - $menu.offset().left) : 0));
								} else {
									$curcol.css({
										"left": $menuChild.eq(d - _hcnt).css("left"),
										"top": $menuChild.eq(d - _hcnt).offset().top + $menuChild.eq(d - _hcnt).outerHeight(true) - $menu.offset().top
									});
								}
							}

							for (var d = 0; d < $menuChild.length; d++) {
								_mx = Math.max(($menuChild.eq(d).offset().left + $menuChild.eq(d).outerWidth(true)), _mx);
								_my = Math.max(($menuChild.eq(d).offset().top + $menuChild.eq(d).outerHeight(true)), _my);
							}

							_mx -= $menu.offset().left;
							_my -= $menu.offset().top;

							$menuUl.css({
								"width": _mx,
								"height": _my
							})

						}

						if ($menu.hasClass("learn-about")&&$submenu.hasClass("mega-gnb")) {

							$menu.children("div.learn-wrap").children("ul").data("pos", 0);
							$menu.children("nav").off("click", "a").on("click", "a", function(e){

								if (!lg.respond) {

									e.preventDefault()

									var $obj = $(this).closest("li.learn-about")
									var $lanav = $obj.children("nav")
									var $lapanel = $obj.children("div.learn-wrap").children("ul");
									var $lapanelChild = $lapanel.children("li");
									var _lih = $lapanelChild.eq(0).outerHeight(true);
									var _visible = $lapanelChild.length - 3;

									if (_visible > 0) {
										var _p = parseInt($lapanel.data("pos"));
										if ($(this).index()) {
											_p = Math.min(_p + 1, _visible);
										} else {
											_p = Math.max(_p - 1, 0);
										}
										$lanav.find("a").addClass("enabled").filter((_p == _visible ? ".btn-next" : (!_p ? ".btn-prev" : ""))).removeClass("enabled")
										$lapanel.data("pos", _p)
										$lapanel.stop().animate({
											"top": Math.min(0, (_lih * _p) * -1)
										}, 300)
									} else {
										$lanav.find("a").removeClass("enabled")
									}

								}

							}).find(".btn-prev").trigger("click")

						}

						if ($menu.hasClass("columnC")||$menu.hasClass("columnE")) {
							if (_rowids.length) {
								$(_rowids).each(function(n) {
									var _mah = 0;
									$thisRow = $menu.find("li[data-rowid='" + _rowids[n] + "']");
									$thisRow.each(function(i) {
										_mah = Math.max($(this).outerHeight(), _mah)
									});
									$thisRow.height(_mah);
								})
							}
						}

						_curWidth += $menu.outerWidth(true);
						_maxHeight[a] = Math.max($menu.innerHeight() - ($menu.is(".learn-about") ? 40 : 0), _maxHeight[a]);

					}

					if ($this.hasClass("support-menu")) {
						$submenuLi.height((_maxHeight[a] + (head.browser.version < 8 ? 40 : 0))).not(".learn-about").height((_maxHeight[a] + (head.browser.version < 8 ? 0 : -20)));
					} else {
						$submenuLi.height((_maxHeight[a] + (head.browser.version < 8 ? 20 : 0))).not(".learn-about").height((_maxHeight[a]));
					}

					// $submenu.width(function() {
					// 	return Math.ceil($(this).width() + (head.browser.mozilla ? 0.5 : 0) + (head.browser.version == 9 ? 1 : 0));
					// })

					_ml = (_posX + _curWidth - _wrapWidth + 9);
					if (_posX + _curWidth >= _wrapWidth) $submenu.css("right", "0");
					$submenu.css("marginLeft", ("-" + _ml + "px"));

				}

				if(_curWidth>_wrapWidth){
					var _curGap = Math.floor((_wrapWidth - _curWidth) / $submenuLi.not(".learn-about").length / 2);
					if(_curGap<15){
						$submenuLi.not(".learn-about").each(function(){
							var _padLeft = parseInt($(this).css("paddingLeft"))
							var _padRight = parseInt($(this).css("paddingRight"))
							$(this).css({
								paddingLeft:(_padLeft+_curGap),
								paddingRight:(_padRight+_curGap)
							})
						})
					}
				}else if($.browser.msie && $.browser.version < 8){
					$submenu.width(Math.ceil(_curWidth))
				}

				$submenuLi.parent().width("auto")

			}

			$nav.on("focus mouseover", "a", function(e) {

				$nav.removeClass("focus")
				var $_pli = $(this).parents("nav.main-navigation > ul > li");
				$_pli.addClass("focus");
				$(this).unbind("focusout mouseout").bind("focusout mouseout", function() {
					setTimeout(function() {
						if (!$_pli.find("a:focus").length) $_pli.removeClass("focus");
					}, 10)
				})

			})

			lg.loadMsg(function() {
				$nav.children("div.gnb-submenu").children("p.skiplink").children("a").children("span").text(lg.msgs.alternative["skipmenu"]).last().text(lg.msgs.alternative["skipmain"]).parent().addClass("last");
			});

			$(window).trigger("NavReady")

			$nav.children("h2").find('a[href*="' + lg.locale + '/' + lg.navCategory + '"]:eq(0)').html(function() {
				return "<strong>" + $(this).text() + "</strong>";
			}).parents("li").addClass("active");

			/* lnb(subnav) select, yunyoungseo 2012-12-14 S */
			var docPageHref = (document.location.href+"#").split("#")[0];
			var docPagePath = docPageHref.substr(docPageHref.indexOf(lg.locale + '/'));
			var docPageArray = docPagePath.split("/");
			docPageHref = docPageHref.substr(docPageHref.lastIndexOf("/") + 1, docPageHref.length).split(".")[0];

			$("nav.subnav").find("li").removeClass("selected-parent current").find("a").removeClass("selected");

			var searchCurrentNav = function(el) {
				var curSel = false;
				var curHref = $(el).attr("href")
				curHref = curHref.substr(curHref.indexOf(lg.locale + '/'));
				var curHrefSp = curHref.substring(curHref.lastIndexOf("/") + 1).split(".")[0];
				if (curHref == docPageArray.join('/') || curHrefSp == lg.subNavCategory)  curSel = true;
				if (curSel) {
					$(el).addClass("selected")/*.html(function() {
						return "<strong>" + $(el).text() + "</strong>";
					})*/.closest("li").addClass('current');
					if($(el).closest("nav.subnav > ul > li").find('ul').length){
						$(el).closest("nav.subnav > ul > li").addClass("selected-parent").find('li.current').parent('ul').parent('li').addClass("selected-parent");
					} else {
						$(el).closest("nav.subnav > ul > li").addClass("selected-parent");
					}
					docPageArray = [];
					return false;
				}
			}

			while (docPageArray.length) {
				$("nav.subnav a").each(function() {
					searchCurrentNav(this)
				});
				docPageArray.pop();
			}
			/* lnb(subnav) select, yunyoungseo 2012-12-14 E */

		}, 100)

	},
	buildFooter: function() {
		var $form = $("footer .countryform");
		var d = $form.find("#country");
		var e = $("#map");
		var c = $(".styled-select");
		$form.unbind("submit").bind("submit", function(b) {
			$(location).attr('href', d.val());
			return false;
		})
	},
	loadMsg: function(call) {

		if(typeof(this.msgCallArray)!=="object") {
			this.msgCallArray = new Array();
			this.calledFunction = false;
			this.msgLoading = false;
		}

		if(this.msgLoading&&this.calledFunction){
			call()
		}else if(this.msgLoading&&!this.calledFunction){
			this.msgCallArray.push(call)
		}else{

			// $.get(lg.locale+"/js/msg.json",$.proxy(function(result){
			$.ajax({type: "GET",url: lg.locale+"/js/msg.json", contentType: "application/json; charset=utf-8", dataType: "json", data: "", async: true, success: $.proxy(function (result) {
				lg.msgs = result;
				while(this.msgCallArray.length > 0) {
					this.msgCallArray[0]();
					this.msgCallArray.shift();
				}
				this.calledFunction = true;
			// },this))
			},this)})

			this.msgLoading = true;

		}

	},
	initBypass: function(){
		$(document).on("click", "a[href='#content']", function(){
			$("#content").find("a[href]:visible:eq(0), button:visible:eq(0), input:visible:eq(0), textarea:visible:eq(0), select:visible:eq(0)")[0].focus()
		})
		$("#skipNav > p").width($("header .innerwrap").innerWidth())
		if(head.browser.mozilla){
			$("a[href='#accHelp']").click(function(e){
				j = "a#accHelp";
				$(j).focus();
				$(j).focusout(function() {
					$(j).focus();
				});
				e.preventDefault()
			});
		} else {
			$("a[href='#accHelp']").click(function(e){
				j = "a#accHelp";
				$(j).focus();
				e.preventDefault()
			});
		}
	},
	attachTriggers: function() {
		$("*[data-trigger]").unbind("click").bind("click", function(c) {
			$("#" + $(this).data("trigger")).trigger("click")
		})
	},
	compare: {
		CARTS: "LG_COMPARE_CART",
		VIEWS: "LG_RECENTLY_VIEW",
		pageCategory: function() {
			return lg.compareCategory
		},
		get: function(e) {
			var g = this._cObjGet()[e];
			if (!g) {
				g = []
			} else {
				var f = g.length;
				while (f--) {
					if (g[f] == "") {
						g.splice(f, 1)
					}
				}
			}
			return g
		},
		add: function(j, k, g) {
			var h = this.get(k);
			if (g == null) {
				h.unshift(j)
			} else {
				h.splice($.inArray(g, h), 1, j)
			}
			var f = this._cObjGet();
			f[k] = h;
			this._cObjSet(f)
		},
		remove: function(h, j) {
			var k = this._cObjGet();
			var g = this.get(j);
			var l = g.length;
			while (l--) {
				if (g[l] == h) {
					g.splice(l, 1)
				}
			}
			k[j] = g;
			this._cObjSet(k)
		},
		isin: function(h, j) {
			var k = this._cObjGet();
			var g = this.get(j);
			var l = g.length;
			while (l--) {
				if (g[l] == h) {
					return true
				}
			}
			return false
		},
		empty: function(d) {
			var e = this._cObjGet();
			delete e[d];
			this._cObjSet(e)
		},
		count: function(c) {
			return this.get(c).length
		},
		view_add: function(e) {
			var g = this._cArrGetViews();
			var f = g.length;
			while (f--) {
				if (g[f] == e) {
					g.splice(f, 1)
				}
			}
			g.unshift(e);
			while (g.join(",").length > 1024) {
				g.pop()
			}
			this._cArrSetViews(g)
		},
		view_remove: function(e) {
			var g = this._cArrGetViews();
			var f = g.length;
			while (f--) {
				if (g[f] == e) {
					g.splice(f, 1)
				}
			}
			this._cArrSetViews(g)
		},
		view_clear: function() {
			this._cArrSetViews([])
		},
		view_get: function() {
			return this._cArrGetViews()
		},
		view_count: function() {
			return this._cArrGetViews().length
		},
		_cObjGet: function() {
			var h = {};
			var k = this._cGet(this.CARTS);
			var g;
			if (k) {
				g = k.split(",")
			} else {
				g = []
			}
			for (var l in g) {
				var j = g[l];
				h[j.split("=")[0]] = j.split("=")[1].split("|")
			}
			return h
		},
		_cObjSet: function(h) {
			var f = [];
			for (var g in h) {
				var j = h[g];
				f.push(g + "=" + j.join("|"))
			}
			this._cSet(this.CARTS, f.join(","))
		},
		_cArrGetViews: function() {
			var c = this._cGet(this.VIEWS);
			if (c) {
				a = c.split("|")
			} else {
				a = []
			}
			return a
		},
		_cArrSetViews: function(c) {
			if (c) {
				/* SMG-5098 ePrivacy Cookie : parkjeongmi modify */
				if (typeof defaultCookie != "undefined" && defaultCookie.toUpperCase() == "OFF" && typeof ecViewFlag != "undefined" && ecViewFlag == false && (getCookies(countryCd + '_' + ecViewCate) == '' || getCookies(countryCd + '_' + ecViewCate) == 'N')) {} else {
					this._cSet(this.VIEWS, c.join("|"));
				}
				/* //SMG-5098 ePrivacy Cookie : parkjeongmi modify */
			}
		},
		_cSet: function(k, j, h) {
			if (h) {
				var l = new Date();
				l.setTime(l.getTime() + (h * 24 * 60 * 60 * 1000));
				var g = "; expires=" + l.toGMTString()
			} else {
				var g = ""
			}
			if (lg.locale == "/br") {
				document.cookie = k + "=" + j + g + "; path=/; domain=.lge.com"
			} else {
				document.cookie = k + "=" + j + g + "; path=/; domain=.lg.com"
			}
		},
		_cGet: function(l) {
			var j = l + "=";
			var c = document.cookie.split(";");
			for (var k = 0; k < c.length; k++) {
				var h = c[k];
				while (h.charAt(0) == " ") {
					h = h.substring(1, h.length)
				}
				if (h.indexOf(j) == 0) {
					return h.substring(j.length, h.length)
				}
			}
			return null
		},
		_cDel: function(c) {
			this.set(c, "", -1)
		}
	},
	overlay: $('<div class="overlay"></div>'),
	overlayShow: function(c) {
		lg.overlay.css({
			height: c.outerHeight(),
			width: c.outerWidth()
		});
		lg.overlay.prependTo(c)
	},
	overlayHide: function() {
		lg.overlay.detach()
	},
	reInit: function(c) {
		lg.placeholderFix();
		lg.addImages(c);
		lg.attachTriggers();
		lg.updateCompareButton()
	},
	smoothScroll: function(c) {
		if (!c) {
			c = $("body")
		}
		$("html:not(:animated),body:not(:animated)").animate({
			scrollTop: c.offset().top
		}, 500)
	},
	plugin: function(e, f, g) {
		$.fn[e] = function(j) {
			var b = Array.prototype.slice.call(arguments, 1);
			var d;
			var c = this.each(function() {
				d = $.data(this, e);
				if (d) {
					if (typeof(j) == "string") {
						if (d[j]) {
							d[j].apply(d, b)
						}
					} else {
						d.init(j)
					}
				} else {
					d = $.data(this, e, new f(j, this))
				}
			});
			if (d && j == undefined) {
				return d
			} else {
				return c
			}
		};
		lg.RegisteredComponents[e] = g;
		$(document).ready(function() {
			$.fn[e].apply($(g));
			lg.showLeftFloating = true
		})
	},
	/* LGERU-1466 20140626 add*/
	goTop: function () {
		if($('html').find('.goTop').length){
			if($(document).scrollTop() > $('.goTop').innerHeight()){
				$('.goTop').removeClass('hidden');
			}else{
				$('.goTop').addClass('hidden');
			}
			$('.goTop').unbind('click').bind('click',function(){
				lg.smoothScroll($("header"))
			})
		}
	},
	/* //LGERU-1466 20140626 add*/
	RegisteredComponents: {}
};
var siteCatalyst = {
	init: function(c) {
		if (typeof scMap != "undefined") {
			$el = !c ? $("html") : $(c);
			$("*[data-sc-item]:not(form)", $el).each($.proxy(function(b, e) {
				this.attachLinkEvents(e)
			}, this));
			$("form[data-sc-item]", $el).each($.proxy(function(b, e) {
				this.attachFormSubmit($(e))
			}, this))
		}
	},
	attachLinkEvents: function(c) {
		ev = $(c).data("sc-event") ? $(c).data("sc-event") : "mousedown";
		$(c).bind(ev, function(b) {
			link = $(c).data("sc-url") ? $(c).data("sc-url") : b.target;
			mapItem = $(c).data("sc-item");
			for (prop in scMap[mapItem]) {
				s[prop] = siteCatalyst.replaceWildCards(scMap[mapItem][prop], c)
			}
			if (scMap[mapItem]) {
				s.tl(link, scMap[mapItem]["type"], s.linkTrackName)
			}
		})
	},
	attachFormSubmit: function(c) {
		$(c).bind("submit", function(b) {
			link = $(c).attr("action");
			mapItem = $(c).data("sc-item");
			for (prop in scMap[mapItem]) {
				s[prop] = siteCatalyst.replaceWildCards(scMap[mapItem][prop], c)
			}
			if (scMap[mapItem]) {
				s.tl(link, scMap[mapItem]["type"], s.linkTrackName)
			}
		})
	},
	replaceWildCards: function(d, e) {
		pattern = new RegExp(/{(.*?)}/g);
		if (pattern.test(d)) {
			wildcards = d.match(pattern);
			for (i = 0; i < wildcards.length; i++) {
				atr = (/{(.*?)}/).exec(wildcards[i])[1];
				if ($(e).get(0).nodeName.toLowerCase() != "form") {
					d = d.replace(wildcards[i], $(e).attr(atr))
				} else {
					d = d.replace("{" + atr + "}", $('*[name="' + atr + '"]', e).val())
				}
			}
		}
		return d.replace(/\s+/g, "-")
	}
};
var mediaMind = {
	init: function(c) {
		if (typeof mmMap != "undefined") {
			$el = !c ? $("html") : $(c);
			$("*[data-mm-item]", $el).each($.proxy(function(b, e) {
				this.attachLinkEvents(e)
			}, this))
		}
	},
	attachLinkEvents: function(c) {
		ev = $(c).data("mm-event") ? $(c).data("mm-event") : "mousedown";
		$(c).bind(ev, function(b) {
			mapItem = $(c).data("mm-item");
			if (mmMap[mapItem]) {
				mmConversionTag(mediaMind.replaceWildCards(mmMap[mapItem]["id"], c))
			}
		})
	},
	replaceWildCards: function(d, e) {
		pattern = new RegExp(/{(.*?)}/g);
		if (pattern.test(d)) {
			wildcards = d.match(pattern);
			for (i = 0; i < wildcards.length; i++) {
				atr = (/{(.*?)}/).exec(wildcards[i])[1];
				d = d.replace(wildcards[i], $(e).attr(atr))
			}
		}
		return d.replace(/\s+/g, "-")
	}
};
$(document).ready(function() {
	lg.init();
	lg.auimginit();
	siteCatalyst.init();
	mediaMind.init();
	/* LGERU-1466 20140626 add*/
	if($('html').find('.goTop').length){
		var initimg =$('.goTop').find('img').attr('src')
		var overimg= $('.goTop').find('img').data('over-img');
		$('.goTop').unbind('mouseover').bind("mouseover", function () {
			$('.goTop').find('img').attr('src',overimg)
		})
		$('.goTop').unbind('mouseleave').bind("mouseleave", function () {
			$('.goTop').find('img').attr('src',initimg)
		})
	}
	/* //LGERU-1466 20140626 add*/
	if ($('#shareClick a.g-plus').length > 0 || $('.share a.g-plus').length > 0) {
		$('#shareClick a.g-plus').addClass('google-plus').removeClass('g-plus');
		$('.share a.g-plus').addClass('google-plus').removeClass('g-plus');
	}
});

function mmConversionTag(g) {
	var e = ("https:" == document.location.protocol) ? "https://" : "http://";
	var f = Math.round(Math.random() * 1000000);
	url = e + "bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ifrm=1&ActivityID=" + g + "&rnd=" + f + "&jsoncallback=?";
	if (!$("#mm-iframe").length) {
		$("body").append('<iframe src="" id="mm-iframe" width="0" height="0" frameborder="0" title=" " scrolling="no">')
	}
	$("#mm-iframe").attr("src", url)
}(function() {
	var e = false,
		d = /xyz/.test(function() {
			xyz
		}) ? /\b_super\b/ : /.*/;
	Class = function() {};
	Class.extend = function(b) {
		var c = this.prototype;
		e = true;
		var j = new this();
		e = false;
		for (var k in b) {
			j[k] = typeof b[k] == "function" && typeof c[k] == "function" && d.test(b[k]) ? (function(g, f) {
				return function() {
					var n = this._super;
					this._super = c[g];
					var h = f.apply(this, arguments);
					this._super = n;
					return h
				}
			})(k, b[k]) : b[k]
		}

		function l() {
			if (!e && this.init) {
				this.init.apply(this, arguments)
			}
		}
		l.prototype = j;
		l.constructor = l;
		l.extend = arguments.callee;
		return l
	}
})();
lg.Component = Class.extend({
	options: {},
	init: function(e, d) {
		this.element = $(d);
		this.options = $.extend({
			debug: false
		}, this.options, e, this.element.data());
		this.log("component init", this.options, this.element)
	},
	log: function() {
		if (this.options.debug && window.console && window.console.log) {
			// window.console.log(arguments)
		}
	},
	broadcast: function(g, e, f) {
		if (g) {
			if (lg.RegisteredComponents[g]) {
				var f = f || $("body").find(lg.RegisteredComponents[g]);
				f.not(this.element).each(function(b, c) {
					$(c).data(g)[e]()
				})
			} else {
				this.log("broadcast failed: component plugin does not exist", g, name)
			}
		}
	},
	callback: function(e) {
		lg.reInit(e);
		siteCatalyst.init(e);
		mediaMind.init(e);
		for (var d in lg.RegisteredComponents) {
			$(e).find(lg.RegisteredComponents[d]).each(function(b, c) {
				$.fn[d].apply($(c))
			})
		}
		this.log("callback", e)
	}
});
lg.PredictiveSearch = lg.Component.extend({
	options: {
		url: "",
		alignment: "left"
	},
	init: function(d, e) {
		this._super(d, e);
		this.form = this.element.closest("form");
		this.submitBtn = this.form.find("[type=submit], .submit")
		this._build()
	},
	_build: function() {
		this.element.attr("autocomplete", "off");
		if (this.options.url.indexOf("?") < 0) {
			this.options.url += "?"
		}
		$(this.form).css({
			position: "relative",
			"z-index": 9900
		});
		$(this.element).bind("keyup", $.proxy(function(c) {
            		/* LGECS-110 20140904 modyfy */
			if ($(this.element).val().length > 0 && c.keyCode != "13") {
				this.loadResults()
			}
			/* //LGECS-110 20140904 modyfy */
			/* LGEES-1197 : 20140127 modify */
			if ($(this.element).val().length > 2 && c.keyCode != "13") {
				this.loadResults()
			/* LGERU-1591 20140904 modify*/
			}else if($(this.element).val().length > 1 && c.keyCode != "13" && (lg.locale == "/us" || lg.locale == "/ru")) {
			/* //LGERU-1591 20140904 modify*/
				this.loadResults()
			}else if($(this.element).val().length > 0 && c.keyCode != "13" && lg.locale == "/jp" ) {
				if($(this.element).parents('.support-main').length > 0 ){
					this.loadResults()
				}
						}else if($(this.element).val().length > 0 && c.keyCode != "13" && lg.locale == "/es") {
				this.loadResults()
			}

			/* //LGEES-1197 : 20140127 modify */
		}, this));

		/* 140429 choyearang : psearch focus action - text field */
		$(this.element).on('keydown', $.proxy(function (c) {
			if(c.keyCode == 9 && c.shiftKey) {
				$(".psearch-results").hide();
			}
		}, this));

		this.results = "";
		this.log("Build Complete")
	},
	loadResults: function() {
		var $this  = this.element
		$.ajax({
			type: "GET",
			url: this.options.url + "&id=" + escape(encodeURIComponent(this.element.val())),
			success: $.proxy(function(c) {
				$("#psearch-results" + this.element.attr("name")).remove();
				this.results = '<div class="psearch-results" id="psearch-results' + this.element.attr("name") + '">' + c + "</div>";

				if(this.form.closest("header").length){
					$(this.results).insertBefore(this.form.find(".btn-search")).find(".close").click(function(e){
						e.preventDefault();
						$this[0].focus()
						$(".psearch-results",this.form).hide()
					});
				}else{
					$(this.results).insertBefore(this.form.find("button[type=submit], .model-search-submit"))
					// this.form.append(this.results)
				}

				switch (this.options.alignment) {
					case "left":
						this.pos = this.element.position().left;
						break;
					case "right":
						this.pos = -$("#psearch-results" + this.element.attr("name")).width() + this.element.outerWidth(true);
						break
				}
				if ($(".psearch-results ul li").length < 1) {
					$(".psearch-results").hide()
				} else {
					$("#psearch-results" + this.element.attr("name")).css({
						top: this.element.position().top + this.element.height() + 6,
						left: this.pos
					}).show()
				}
				this.bindActions()

			}, this)
		});
		this.log("Load Complete")
	},
	bindActions: function() {
		$(document).bind("mouseup", $.proxy(function(c) {
			if (!$(c.target).closest("#psearch-results" + this.element.attr("name")).length) {
				this.element.trigger("focusin");
				$(".psearch-results",this.form).hide()
			}
		}, this))

		/* 140429 choyearang : psearch focus action - results layer */
		$('.psearch-results').find('a').filter(':last').on('keydown', $.proxy(function (c) {
			if (c.keyCode == 9) {
				$(".psearch-results",this.form).hide();
				this.submitBtn.trigger("focusin");
			}
		}, this));
	}
});
lg.plugin("psearch", lg.PredictiveSearch, ".psearch");
lg.shareFunction = lg.Component.extend({
	options: {},
	init: function(e, d) {
		this._super(e, d);
		this.hotspot = $(this.element);
		this.tip = $('#share');
		if ($("#shareClick").length > 0) {
			this.shareFunc()
		}
		this.num = 0;
	},
	shareFunc: function() {
		//$("#shareClick a.ir").attr("href", "javascript:void(0)");
		var e = $("#share").attr("data-uri");
		var g = 500;
		var b = true;
		if ($.browser.msie) {
			g = 10
		}
		$("header .innerwrap").append($("#share"));
		if ($("#shareClick").find("#share")) {
			$("#shareClick #share").remove()
		}
		$("#shareClick").on('click', $.proxy(function(d) {
			d.preventDefault();
			$("#shareClick h4").addClass("highlight");
			if (b == false) {} else {
				b = false;

				if (!$('#compare-page').length) {
					$.ajax({
						url: e,
						success: $.proxy(function(h) {
							$("#share").html($(h));
							$("header .innerwrap").append($("#share"));
							//$(".wrapper").append($("#share"));
							if ($("#shareClick").find("#share")) {
								$("#shareClick #share").remove()
							}
							/* 20140327 Share Focus : ansooyune add S */
							this.tip.find('iframe').filter(':first').closest('li').attr('tabindex','0');
							this.accessFocus();
							/* 20140707 delicious modify : choyearang */
							$(document).on('click', '#btnGoDelicious', function() {
								var c = window.open("about:blank");
								c.location.href = "http://del.icio.us/post?url=" + encodeURIComponent(document.location) + "&title=" + encodeURIComponent(document.title) + "&"
							});
							/* 20140327 Share Focus : ansooyune add E */
						}, this)
					})
				}
			}
			if ($("#share").css("display") == "none") {
				//140402 : share position modify
				var blank = 3;
				var c = $("#shareClick").offset();

				var f = (c.top + parseInt($("#shareClick").height())) - blank;
						//(c.top + parseInt($("#shareClick").height())) - $('.eprivacy_cookie').outerHeight(true) + blank;

				var y = ($('header .innerwrap').width() - ($('#content').width() >= '960' ? 960 : $('#content').width())) / 2;
				var j = (($('#content').width() >= '960' ? 960 : $('#content').width()) - $("#share").width()) + y + 14;
				// ($('header .innerwrap').width() + ($(document).width() - $('header .innerwrap').width()) /2) - ($("#share").width() / 2);

				$("#share").css({
					position: "absolute",
					top: f + "px",
					left: j + "px",
					height: "200px",
					visibility: "visible",
					display: "none"
				});
				$("#share").fadeIn(g);
				$("#shareClick").addClass("opened");
			} else {
				$("#share").fadeOut(g);
				$("#shareClick").removeClass("opened");
				$("#shareClick h4").removeClass("highlight");
			}
			$("#share .close").on("click", function(h) {
				h.preventDefault();
				$("#shareClick h4").removeClass("highlight");
				$("#shareClick").removeClass("opened");
				$("#share").fadeOut(g);
				return false
			});
			return false
		}, this))

		this.accessFocus(g);
	},
	accessFocus : function(g){
		/* 20140327 Share Focus : ansooyune add S */
		this.hotspot.find('> a').on('keydown', $.proxy(function (b) {
			if(b.keyCode == 9 && b.shiftKey) {
			} else if (b.keyCode == 9) {
				if(this.tip.css('display') == 'block' && this.tip.find('.close').size() > 0){
					b.preventDefault();
					this.tip.find('a, input, select, button, textarea, iframe, li[tabindex="0"]').filter(':first').focus();
				}
			}
		}, this));

		this.tip.find('a, input, select, button, textarea, li[tabindex="0"]').filter(':first').on('keydown', $.proxy(function (b) {
			if(b.keyCode == 9 && b.shiftKey) {
				if(this.tip.css('display') == 'block' && this.tip.find('.close').size() > 0){
					b.preventDefault();
					this.tip.find('a, input, select, button, textarea, iframe').filter(':last').focus();
				}
			}
		}, this));

		this.tip.find('a, input, select, button, textarea, iframe').filter(':last').on('keydown', $.proxy(function (b) {

			if(b.keyCode == 9 && b.shiftKey) {
			} else if (b.keyCode == 9) {
				if(this.tip.css('display') == 'block' && this.tip.find('.close').size() > 0){
					b.preventDefault();
					this.tip.find('a, input, select, button, textarea, iframe, li[tabindex="0"]').filter(':first').focus();
				}
			}
		}, this));

		this.tip.find(".close").on('click', $.proxy(function (b) {
			b.preventDefault();
			this.hotspot.removeClass('opened').find('> a').focus().end().find('> h4').removeClass('highlight');
			this.tip.fadeOut(g);
		}, this));
		/* 20140327 Share Focus : ansooyune add E */
	}
});
lg.plugin("shareFunction", lg.shareFunction, "#shareClick");
lg.signInfoAct = lg.Component.extend({
	options: {},
	init: function(e, d) {
		this._super(e, d);
		this.elements = $(this.element);
		this.elements.find(".signout").click(function() {
			var b = "";
			$.ajax({
				url: lg.locale + "/support/logout.lgajax",
				dataType: "json",
				success: function(c) {
					b = c.successFlag
				},
				complete: $.proxy(function() {
					if (b == "Y") {
						location.reload()
					} else {
						alert("Sorry, sign out again please!")
					}
				}, this)
			})
		})
	}
});
lg.plugin("signInfoAct", lg.signInfoAct, "#signInArea");
if (typeof console == "undefined" || typeof console.log == "undefined") {
	var console = {
		log: function() {}
	};
	window.console = {
		log: function() {}
	}
}
if ($("html").hasClass("lt-ie90")) {
	(function(x, w) {
		var F = "abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
			C = F.split("|"),
			u = C.length,
			G = new RegExp("(^|\\s)(" + F + ")", "gi"),
			y = new RegExp("<(/*)(" + F + ")", "gi"),
			A = new RegExp("(^|[^\\n]*?\\s)(" + F + ")([^\\n]*)({[\\n\\w\\W]*?})", "gi"),
			B = w.createDocumentFragment(),
			H = w.documentElement,
			z = H.firstChild,
			D = w.createElement("body"),
			v = w.createElement("style"),
			E;

		function I(c) {
			var b = -1;
			while (++b < u) {
				c.createElement(C[b])
			}
		}

		function t(d, f) {
			var g = -1,
				b = d.length,
				c, e = [];
			while (++g < b) {
				c = d[g];
				if ((f = c.media || f) != "screen") {
					e.push(t(c.imports, f), c.cssText)
				}
			}
			return e.join("")
		}
		I(w);
		I(B);
		z.insertBefore(v, z.firstChild);
		v.media = "print";
		x.attachEvent("onbeforeprint", function() {
			var d = -1,
				h = t(w.styleSheets, "all"),
				b = [],
				f;
			E = E || w.body;
			while ((f = A.exec(h)) != null) {
				b.push((f[1] + f[2] + f[3]).replace(G, "$1.iepp_$2") + f[4])
			}
			v.styleSheet.cssText = b.join("\n");
			while (++d < u) {
				var c = w.getElementsByTagName(C[d]),
					g = c.length,
					e = -1;
				while (++e < g) {
					if (c[e].className.indexOf("iepp_") < 0) {
						c[e].className += " iepp_" + C[d]
					}
				}
			}
			B.appendChild(E);
			H.appendChild(D);
			D.className = E.className;
			D.innerHTML = E.innerHTML.replace(y, "<$1font")
		});
		x.attachEvent("onafterprint", function() {
			D.innerHTML = "";
			H.removeChild(D);
			H.appendChild(E);
			v.styleSheet.cssText = ""
		})
	})(this, document)
}
window.innerShiv = (function() {
	var h;
	var k = document;
	var l;
	var g = "abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" ");

	function j(d, c, b) {
		return (/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i).test(b) ? d : c + "></" + b + ">"
	}
	return function(p, f) {
		if (!h) {
			h = k.createElement("div");
			h.innerHTML = "<nav></nav>";
			l = h.childNodes.length !== 1;
			if (l) {
				var d = k.createDocumentFragment();
				var q = g.length;
				while (q--) {
					d.createElement(g[q])
				}
				d.appendChild(h)
			}
		}
		p = p.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/(<([\w:]+)[^>]*?)\/>/g, j);
		var r;
		if (r = p.match(/^<(tbody|tr|td|th|col|colgroup|thead|tfoot)[\s\/>]/i)) {
			h.innerHTML = "<table>" + p + "</table>"
		} else {
			h.innerHTML = p
		}
		var b;
		if (r) {
			b = h.getElementsByTagName(r[1])[0].parentNode
		} else {
			b = h
		}
		if (f === false) {
			return b.childNodes
		}
		var c = k.createDocumentFragment();
		var e = b.childNodes.length;
		while (e--) {
			c.appendChild(b.firstChild)
		}
		return c
	}
}());
lg.liveChatPop = lg.Component.extend({
	options: {
		width: 600,
		height: 575,
		toolbar: "no",
		menubar: "no",
		statusbar: "yes",
		scrollbar: "no",
		resizable: "no",
		url: "",
		layerUrl: "",
		names: "LiveChat"
	},
	init: function(e, d) {
		this._super(e, d);
		if ($(this.element).attr("data-layerUrl") != "" && $(this.element).attr("data-layerUrl") != null) {
			this.options.layerUrl = $(this.element).attr("data-layerUrl")
		}
		this.options.url = $(this.element).attr("data-url");
		$(this.element).click($.proxy(function() {
			this.openLiveChatPop();
			return false
		}, this))
	},
	setModalLayer: function() {
		if ($("body").find(".live-modal").length == 0) {
			$("body").append('<div class="live-modal" style="display:none"><div class="liveChat-layer"><a href="#" class="close-mb" title="Click to close."></a><div class="liveChat-inner"></div></div></div>');
			$.ajax({
				url: this.options.layerUrl,
				success: function(c) {
					$(".live-modal .liveChat-layer .liveChat-inner").html(c).show()
				},
				complete: $.proxy(function() {
					this.openLiveChatBtn = $(".live-modal .liveChat-layer .liveChat-inner").find(".open-liveChat");
					this.openLiveChatBtn.off("click").on("click", $.proxy(function(c) {
						c.preventDefault();
						this.openLiveChatPop();
						this.closeLiveLayer();
						return false
					}, this));
					$(".live-modal .liveChat-layer .close-mb").off("click").on("click", $.proxy(function(c) {
						this.closeLiveLayer();
						return false
					}, this));
					$(".live-modal .liveChat-layer .cancel-layer").off("click").on("click", $.proxy(function(c) {
						this.closeLiveLayer();
						return false
					}, this))
				}, this)
			})
		}
	},
	openLiveChatPop: function() {
		var c = "width=" + this.options.width + ", height=" + this.options.height + ", toolbar=" + this.options.toolbar + ", menubar=" + this.options.menubar + ", statusbar=" + this.options.statusbar + ", scrollbar=" + this.options.scrollbar + ", resizable=" + this.options.resizable;
		window.open(this.options.url, this.options.names, c)
	},
	closeLiveLayer: function() {
		$(".live-modal").fadeOut(function() {
			$(".live-modal .liveChat-layer .liveChat-inner").remove();
			$(".live-modal").remove()
		})
	}
});
lg.plugin("liveChatPop", lg.liveChatPop, ".live-chat-popup");
lg.topFloating = lg.Component.extend({
	options: {
		className: ".top-floating",
		topPostionEl: "#product-details",
		topPostionAddEl: ".tablist",
		innerContent: "<button><span></span></button>",
		buttonText: "top"
	},
	init: function(e, d) {
		this._super(e, d);
		this.elements = $(this.element);
		this.elements.html(this.options.innerContent);
		this.elements.bind("click", function() {
			lg.smoothScroll($("header"))
		});
		if (this.element.attr("data-button-text")) {
			this.options.buttonText = this.element.attr("data-button-text")
		}
		this.elements.find("span").append(this.options.buttonText);
		this.scrolling()
	},
	scrolling: function() {
		var m = $("header").height(),
			n = window.innerHeight,
			k = $(this.options.topPostionEl),
			l = (k.offset().top + $(this.options.topPostionAddEl).height()) + 40,
			h = $(this.options.topPostionEl).offset().top + $(this.options.topPostionEl).height() - 40;
		this.posScrollTop = $(document).scrollTop();
		var j = $(window).height() / 2;
		curPos = (this.posScrollTop < l - j) ? l - this.posScrollTop : (this.posScrollTop > h - j) ? h - this.posScrollTop : j;
		$(this.options.className).css("top", curPos)
	},
	posScrollTop: 0
});
lg.plugin("topFloating", lg.topFloating, ".top-floating");
$.fn.hoverTooltip = function (e) {
	var d = {
		self: this,
		$self: $(this),
		target: {},
		wrapper: {}
	};
	if (e) {
		e.target = $(e.target);
		e.wrapper = $(e.wrapper);
		$.extend(d, e)
	}
	this.each(function () {
		d.$self.bind("mouseover", function () {
			d.target.show()
		});
		d.target.bind("mouseleave", function () {
			$(this).hide()
		});
		d.wrapper.bind("mouseleave", function () {
			d.target.hide()
		})
	});
	return this
};
/* LGEEC-90 20140602 modify*/
$(document).ready(function(){
	/* LGEEC-90 20140602 modify*/
	$(".follow a.fb").hoverTooltip({
		target: ".fb_sub",
		wrapper: ".follow"
	});
	/* LGEEC-90 20140602 modify*/
});
/* LGEEC-90 20140602 modify*/
$(function() {
	/* 20140328 Product Big img Focus move : ansooyune modify */
	$(document).on('click', '#product-display div.pane a.loader', function(e){
		e.preventDefault();
		$('div.enlarge .hotspot').click().addClass('active-pane');
	})
	// $('#product-display div.pane a.loader').click(function(e) {
	// 	e.preventDefault();
	// 	$('div.enlarge .hotspot').click().addClass('active-pane');
	// });

	/* 20140328 Product Big img move : ansooyune add */
	$('#product-display div.pane a.loader').on('keydown', function (b) {
			if(b.keyCode == 9 && b.shiftKey) {
			} else if (b.keyCode == 9) {
				var box = $('div.tooltip.modal.popup-zoom-in.fade.open');
				if(box.css("display") == "block" && box.find('.close').size() > 0){
					b.preventDefault();
					box.find("a, input, select, button, textarea").filter(':first').focus();
				}
			}
		});
});

// sub left skip
$(function(){
	var leftSkip = $(".column1 .skiplink"),
		skipContent = $("#column2");
	leftSkip.click(function(){
		skipContent.find("a[href]:visible:eq(0), button:visible:eq(0), input:visible:eq(0), textarea:visible:eq(0), select:visible:eq(0)")[0].focus()
		return false;
	});
});

$(function(){
	$(".wrapper #country").bind("change", function (b) {
		location = $(this).val();
		b.preventDefault()
	})
});

function setCookies(cName, cValue, cDay) {
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/ ';
	if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	/* LGEAE-631 20140404 modify */
	if(!$.browser.msie && cName == "indexCountry"){
		var domain = "";
		document.cookie = cookies + ((expire == null) ? "" : ("; expire=" + expire.toGMTString())) + ((domain == null) ? "" : ("; domain=" + domain));
	} else if($.browser.msie && cName == "indexCountry"){
		document.cookie = cookies+= ';expires=' + expire.toGMTString() + ';' + ((domain == null) ? "" : ("; domain=" + domain));
	}else {
		document.cookie = cookies + ' domain=.lg.com;';
	}
	/* LGEAE-631 20140404 modify */
	//document.cookie = cookies + ' domain=.lg.com;';
}

function getCookies(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if (start != -1) {
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1) end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}

/* LGEAE-631 20140404 add */

$(document).ready(function () {
	var _locale = getCookies("indexCountry");
	var alocale = _locale.toLowerCase();
	var _path = window.location.pathname;

	function fncIndexLocale(){
		var indexCountry = $("select#country option:selected").text();
		if (indexCountry=='U.A.E / English'){
			setCookies("indexCountry","ae_AE", 1);}else if (indexCountry=='U.A.E / العربية'){setCookies("indexCountry","ae_ar_AE", 1);
		}else if (indexCountry=='Afghanistan / English'){
			setCookies("indexCountry","ae_AF", 1);
		}else if (indexCountry=='Armenia / English'){
			setCookies("indexCountry","ae_AM", 1);
		}else if (indexCountry=='Azerbaijan / English'){
			setCookies("indexCountry","ae_AZ", 1);
		}else if (indexCountry=='Bahrain / English'){
			setCookies("indexCountry","ae_BH", 1);}else if(indexCountry=='Bahrain / العربية'){setCookies("indexCountry","ae_ar_BH", 1);
		}else if (indexCountry=='Georgia / English'){
			setCookies("indexCountry","ae_GE", 1);
		}else if (indexCountry=='Kuwait / English'){
			setCookies("indexCountry","ae_KW", 1);}else if(indexCountry=='Kuwait / العربية'){setCookies("indexCountry","ae_ar_KW", 1);
		}else if (indexCountry=='Oman / English'){
			setCookies("indexCountry","ae_OM", 1);}else if (indexCountry=='Oman / العربية'){setCookies("indexCountry","ae_ar_OM", 1);
		}else if (indexCountry=='Pakistan / English'){
			setCookies("indexCountry","ae_PK", 1);
		}else if (indexCountry=='Qatar / English'){
			setCookies("indexCountry","ae_QA", 1);}else if (indexCountry=='Qatar / العربية'){setCookies("indexCountry","ae_ar_QA", 1);
		}else if (indexCountry=='Yemen / English'){
			setCookies("indexCountry","ae_YE", 1);}else if (indexCountry=='Yemen / العربية'){setCookies("indexCountry","ae_ar_YE", 1);}
	}

	$('select#country').bind("change focusout",function(e){
		fncIndexLocale();
	});


	if(lg.locale == "/ae" && _path == "/ae"){
		var _infobox = $('body').find('input[name=indexCountryFooter]');
		var _infoTxt = _infobox.val();
		var _infoAE = _infoTxt.substring(_infoTxt.lastIndexOf("_") - 2);
		/* LGEAE-674 20140618 modify */
		function addInfoChk(){
			$('body').prepend('<div class="infoChk"><p><span>'+  _infoTxt +'</span>' + '<a class="close">close</a></p>' + '</div>');
			$('.infoChk').addClass(alocale);
		}
		/* //LGEAE-674 20140618 modify */
		if(_locale != "ae_AE" && _path =='/ae'){
			if(getCookies(_locale+"_infoChk") != 'Y'){
				addInfoChk();
			}else{
				$('.infoChk').remove();
			}
		}else if(_locale == "ae_AE" && _path !='/ae'){
			if(getCookies(_locale+"_infoChk") == 'Y'){
				$('.infoChk').remove();
			}else{
				addInfoChk();
			}
		}
		$('.infoChk a.close').bind('click', function() {
			var date = new Date();
			date.setDate(date.getDate() + 365);
			document.cookie = _locale +"_infoChk=Y;path=/;expires=" + date.toGMTString() + ";"
			$('.infoChk').remove();
		});
		if( _path =='/ae' && $.trim(_infoTxt) == ''){
			$('.infoChk').remove();
		}
	}
});
/*//LGEAE-631 20140404 add */
/* LG-WCAG-LIVE : 2014-08-22 add */
$(function() {
	var b = $(".float-menu");
	if (b.length > 0) {
		var a = $("#product-display .product-info"); // modified(product detail page)
		if (window.devicePixelRatio != 1) {}
		window.onscroll = function(e) {
			var c = (typeof(document.getElementsByTagName("html")[0].getAttribute("data-product-number")) != "string") ? (b.height() / 2) : (a.offset().top + a.outerHeight(true)); // modified(product detail page)
			//window.pageYOffset
			if ($(window).scrollTop() > c) {
				b.not(".active").addClass("active")
			} else {
				b.removeClass("active")
			}
		};
		$(window).trigger("scroll")

		/* Float Menu - Share */
		$(document).on('click', '.float-menu .sns .fb > a', function(e) {
			e.preventDefault();
			var share = $(".iv-share-icon");
			var link = share.data("link");
			link = mpGetFullURL(link);
			window.open(
				'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(link),
				'sharedialog',
				'width=626,height=436');
		});

		$(document).on('click', '.float-menu .sns .tw > a', function(e) {
			e.preventDefault();
			var share = $(".iv-share-icon");
			var link = share.data("link");
			link = mpGetFullURL(link);
			window.open('https://twitter.com/share?url=' + link, 'sharedialog', 'width=626,height=436');
		});

		/* top button */
		$(document).on("click",".float-top > a", function(e){
			e.preventDefault();
			lg.smoothScroll();
		});
	}
});
/* // LG-WCAG-LIVE : 2014-08-22 */