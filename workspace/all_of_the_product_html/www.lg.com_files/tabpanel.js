lg.TabPanel = lg.Component.extend({
	options: {
		csstransitions: head.csstransitions,
		transition: "slide"
	},
	init: function (e, g) {
		this._super(e, g);
		if (this.options.csstransitions) {
			this.element.addClass(this.options.transition)
		}
		this.tabContainer = this.element.find(".tablist:first");
		this.tabs = this.tabContainer.find(".tab");
		this.panelContainer = this.element.find(".panels:first");
		this.panels = this.panelContainer.find("> .panel");
		this.panelWid = this.panelContainer.find("> .panel").outerWidth(true);
		this.currentTab = this.tabs.filter(".tab.active", this.tabContainer);
		this.currentPanel = this.panels.filter(".panel:eq(" + this.currentTab.index() + ")", this.panelContainer);
		var h = 40;
		var d = 0;
		for (var f = 1; f <= this.tabs.length; f++) {
			h = this.element.find(".tab:nth-child(" + f + ")").height();
			if (h > d) {
				d = h
			} else {
				d = d
			}
		}
	   if(this.tabs.length >= 4){
		   if ($.browser.msie && $.browser.version > 9) {
			   //this.tabs.css({padding:"10px 7px",maxWidth:"20%"});
			   this.tabs.css({maxWidth:"20%"});
		   }else if ($.browser.msie && $.browser.version <= 8) {
			   null;
		   }
		   /* LGENZ-90 : 20130621 add */
		  else if (document.location.href.indexOf('/au/promotions') != -1 || document.location.href.indexOf('/nz/promotions') != -1) {
			  //this.tabs.css("padding","10px 7px");
		   }
		   /* //LGENZ-90 : 20130621 add */
		   else{
			   //this.tabs.css({padding:"10px 7px",maxWidth:"23%"});
			   this.tabs.css({maxWidth:"23%"});
		   }
	   }
		this.tabs.css({
			height: d + "px"
		});
		this.panels.css({
			"min-height": "50px"
		});
		var c = this.currentPanel.index();
		newLeft = -1 * c * this.panelWid;
		this.newHeight = "auto";
		this.bindActions();
		if (location.hash.length > 0) {
			var b = $(location.hash + "_tab");
			if (b.length > 0 && this.element.children(".tablist").children(location.hash + "_tab").length > 0) {
				this.element.children(".tablist").children(".tab").removeClass("active");
				b.addClass("active");
				lg.smoothScroll($(".tabpanel:first"));
				this.change(location.hash.replace("#", ""))
			}
		}
		if (this.element.parents(".tabpanel").length < 1) {
			var a;
			if (this.element.children(".tablist").children(".active").length == 0) {
				a = this.element.children(".tablist").children(".tab:first")
			} else {
				a = this.element.children(".tablist").children(".active");
			   /* LGEUS-3947 20140312 add, LGEUS-4049 20140415 modify */
				if(lg.locale=='/us'){
					var _tabName =  this.currentTab.attr('id').replace("_tab", "");
					$('*[class*="-finish"]').css({display:"none"});
					$(".wrapper").find("." + _tabName + "-finish").css({display:"block"});
				}
				/* //LGEUS-3947 20140312 add, LGEUS-4049 20140415 modify */
			}

			/* 201404 add, modify */
			var currentTitle = a.text();
			this.activePanel = this.element.children(".panels").find("#" + a.attr("id").replace("_tab", "_panel"));
			this.element.children(".panels").children(".panel").removeClass("activePanel");
			this.activePanel.addClass("activePanel").attr("title",currentTitle);
			/* LGEGMO-216  20140709 add*/
			if($(".specDown").length){
	        	if(this.activePanel.attr("id")=="specs_panel"){
	        		$(".specDown").removeClass("hidden")
	        	}
            }
			/* //LGEGMO-216  20140709 add*/
			this.element.children(".panels").children(".panel").each(function () {
				if (!$(this).hasClass("activePanel") && $(this).attr("data-url") != "" && $(this).attr("data-url") != null) {
					$(this).empty().html("")
				} else {}
			}); if (a.length > 0) {
				this.panelContainer.css({
					"min-height": "50px",
					height: "auto"
				});
				if (this.element.hasClass("slide")) {
					this.change(a.attr("id").replace("_tab", ""))
				} else {
					this.change(a.attr("id").replace("_tab", ""))
				}
			}
		} else {
			if (this.element.parents(".tabpanel").length > 0) {
				var a;
				if (this.element.children(".tablist").children(".active").length == 0) {
					a = this.element.children(".tablist").children(".tab:first")
				} else {
					a = this.element.children(".tablist").children(".active")
				}
				this.activePanel = this.element.children(".panels").children("#" + a.attr("id").replace("_tab", "_panel"));
				this.element.children(".panels").children(".panel").removeClass("activePanel");
				this.activePanel.addClass("activePanel");
				this.element.children(".panels").children(".panel").each(function () {
					if (!$(this).hasClass("activePanel") && $(this).attr("data-url") != "" && $(this).attr("data-url") != null) {
						$(this).empty().html("")
					}
				});
				if (a.length > 0) {
					this.panelContainer.css({
						"min-height": "50px",
						height: "auto"
					});
					if (this.element.hasClass("slide")) {
						this.change(a.attr("id").replace("_tab", ""))
					} else {
						this.change(a.attr("id").replace("_tab", ""))
					}
				}
			}
		}
		if ($(".innerTabLink").length > 0) {
			this.linkActions()
		}
		/* LGENL-642 20131010 add*/
		if($('.sortSel label').length >0 && (lg.locale != "/nl" || lg.locale != "/be_fr" )){
			$(document).on("click", ".sortSel label span a", this.element, function(e) {
				$(this).parents().find('.sortSel label').removeClass('active');
				$(this).parent().parent().addClass('active');
				return;
			});
		}
		/* LGENL-642 20131010 add*/
		this.log(this.options, this.tabContainer, this.tabs, this.panelContainer, this.panels)
	},
	linkActions: function () {
		var a = parseInt(this.element.offset().top);
		if( lg.locale == '/es' && document.location.href.indexOf('#') != -1){
			var selTab = document.location.href.substring(document.location.href.indexOf('#')+1);
			$('article.panel').each(function(i){
				if(selTab!=null && selTab!="" && $(this).attr('id') == selTab){
					($(this).attr('id') == selTab)?_index = i:null;
					var c = a - 5;
					window.scrollTo(0, c);
					$('div.tabpanel > nav.tablist a:eq('+_index+')').click();
				}
			});
		}

		$(".innerTabLink").bind("click", $.proxy(function (h) {
			var d = h.target.getAttribute("data-target");
			if (this.panelContainer.children("#" + d + "_panel").length > 0) {
				if (!$("#" + d + "_panel").hasClass("activePanel")) {
					this.change(d)
				}
				if (h.target.getAttribute("href").indexOf("_panel") > 0) {
					var c = a - 5;
					window.scrollTo(0, c);
					return false
				} else {
					var b = "#" + h.target.getAttribute("href").split("#")[1];
					var g = b;
					var f;
					if (b.indexOf("_panel") == -1 && $(b + "_panel").length > 0) {
						g = b + "_panel";
						f = a - 5
					} else {
						f = $(g).offset().top
					}
					if ($(g).length > 0) {
						window.scrollTo(0, f)
					}
					return false
				}
			} else {
				return false
			}
		}, this))
	},
	bindActions: function () {
		 /* LGEUS-3947 20140312 add, LGEUS-4049 20140415 modify */
		$("a.tab", this.tabContainer).off("click").on("click", $.proxy(function (a) {
			a.preventDefault();
			var b = $(a.target).attr("id").replace("_tab", "");
			 if(lg.locale == "/us"){
				$('*[class*="-finish"]').css({display:"none"});
				$(".wrapper").find("." + b + "-finish").css({display:"block"});
			}
			this.change(b)
		}, this))
		 /* //LGEUS-3947 20140312 add, LGEUS-4049 20140415 modify */

		/* LGEFR-860 20131111 add*/
		if(lg.locale == "/fr"){
			$("#reviews").unbind("click").bind("click", $.proxy(function (a) {
				a.preventDefault();
				var pos = $("#reviews_tab").offset();
				$("html, body").stop().animate({scrollTop:pos.top}, "slow");
				if(!$("#reviews_tab").hasClass("active")){
					this.change("reviews");
				}
			}, this))
		}
		/* //LGEFR-860 20131111 add*/
	},
	change: function (e) {
		this.currentPanel = this.element.children(".panels").children(".activePanel");
		var a = $("#" + e + "_panel"),
			f = $("#" + e + "_tab"),
			d = this.currentPanel;
		/* LGENL-642 20131010 add*/
		if($('.sortSel label').length >0 && (lg.locale != "/nl" || lg.locale != "/be_fr" )){
			$('.sortSel label span a').parent().parent().removeClass('active');
			$('.sortSel label span a').eq(0).parent().parent().addClass('active');
		}
		/* //LGENL-642 20131010 add*/
		if (this.options.transition == "none") {
			this.panels.not(this.currentPanel).hide()
		}
		if (d.is(a) && a.children().length > 0) {
			var c = a.position().left * -1;
			this.panelContainer.css({
				left: c + "px"
			});
			return
		}
		$("a.tab", this.tabContainer).unbind("click", function () {
			$(this).bind("click", function (g) {
				g.preventDefault()
			})
		});
		if ($(".tooltipper").length > 0) {
			this.broadcast("tooltipper", "close")
		}
		var b = $.proxy(function () {
			this.panelContainer.addClass("animate");
			this.tabContainer.children(".active").removeClass("active");
			f.addClass("active");
			a.css("height", "auto");
			switch (this.options.transition) {
				case "none":
					this.panels.hide();
					a.show();
					lg.loadImages();
					this.bindActions();
					break;
				default:
					var g = a.index();
					newLeft = -1 * g * this.panelWid;
					if (a.data("url") != null && a.data("url") != "") {
						/* 20140425 modify */
						if ($('.specs-wrapper a').is(".pdf")) {
							
							var pdf = $('#specs_panel a.pdf.top'),
								max = 0;
								pdf.hide();

							$('#items-info-wrapper .accordion-expand-all a, #items-info-wrapper .accordion-expand-all label').show().each(function () {
								max = Math.max($(this).outerWidth(true), max);
							}).hide();
							pdf.show().css({ marginRight : max + 60 });

						}
						/* // 20140425 modify */

						h = function () {
							a.siblings(".panel").each(function () {
								if ($(this).data("url")) {
									$(this).empty()
								}
							})
						}
					}
					if (this.options.csstransitions) {
						this.panelContainer.css({
							left: this.panelContainer.position().left
						});
						this.panelContainer.bind(transitionEnd, $.proxy(function (i) {
							this.panelContainer.unbind(transitionEnd);
							h();
							lg.loadImages();
							this.bindActions()
						}, this));
						this.panelContainer.css({
							left: newLeft + "px"
						})
					} else {
						this.panelContainer.stop().animate({
							left: newLeft + "px"
						}, 1000, $.proxy(function () {
							if ($.browser.msie && $.browser.version < 10) {
								a.css({
									height: "auto"
								});
								h();
								lg.loadImages();
								this.bindActions()
							} else {
								a.animate({
									height: "auto"
								}, $.proxy(function () {
									h();
									lg.loadImages();
									this.bindActions()
								}, this))
							}
						}, this));
						this.log("new height:", this.newHeight, a)
					}
					this.callback(a);
					break
			}

			/* 201404 add, modify */
			var currentTitle = this.tabContainer.children(".active").text();
			this.currentPanel = a;
			this.currentTab = f;
			this.panelContainer.children(".activePanel").removeClass("activePanel").attr("title","");
			this.currentPanel.css("height", "auto").addClass("activePanel").attr("title",currentTitle);
			this.otherPanel = this.panelContainer.find(">.panel:not(.activePanel)");
			this.otherPanel.css("height", "50px")
		}, this);
		if (a.data("url") != null && a.data("url") != "") {
			lg.overlayShow(this.panelContainer);
			$.ajax({
				type: "post",
				url: a.data("url"),
				dataType: "html",
				success: $.proxy(function (g) {
					lg.overlayHide();
					/* 201405 modify */
					if (g.indexOf("script") > -1 && g.indexOf("></\script>") < 0 ) {
						a.html(g)
					} else {
						a.html(innerShiv(g));
					}
					/* LGEGMO-216  20140709 add*/
					if($('body').find(".specDown").length){
                    	if(g.indexOf("specs-wrapper") >-1){
                    		$(".specDown").removeClass("hidden")
                    	}else{
                    		$(".specDown").addClass("hidden")
                    	}
                    }
					/* //LGEGMO-216  20140709 add*/
					lg.auimginit();
					b();
					if(a.attr('id') == 'features_panel') { lg.loadLazyIframeCaption() }
					this.log("loaded new panel via XHR", a.data("url"))
				}, this),
				error: $.proxy(function () {
					lg.overlayHide();
					lg.showError("ajaxerror");
					this.bindActions()
				}, this)
			})
		} else {
			b()
		}
		this.panelContainer.css({
			"min-height": "50px",
			height: "auto"
		});
		this.panels.css({
			"min-height": "50px",
			height: "auto"
		})
	}
});
lg.plugin("tabPanel", lg.TabPanel, ".tabpanel");
/* 20140425 add */
$(function(){
	if ($('.specs-wrapper a').is(".pdf")) {
		var pdf = $('#specs_panel a.pdf.top'),
			max = 0;
			pdf.hide();

		$('#items-info-wrapper .accordion-expand-all a, #items-info-wrapper .accordion-expand-all label').show().each(function () {
			max = Math.max($(this).outerWidth(true), max);
		}).hide();
		pdf.show().css({ marginRight : max + 60 });
	}
})
/* // 20140425 add */