lg.Tooltip = lg.Component.extend({
    options: {
        tooltip: false,
        singleview: true,
        event: "click",
        csstransitions: head.csstransitions,
        transition: "fade",
        duration: 0.4,
        position: "top",
        offset: false,
        url: false,
        type: null,
        src: null,
        width: null,
        altimg: null,
        height: null,
        position_set: true
    },
    init: function (e, d) {
        this._super(e, d);
        this.hotspot = this.element;
        this.tip = this.options.tooltip ? $(this.options.tooltip) : this.hotspot.next(".tooltip");

        var f = {
            display: "block"
        };
        this.tip.addClass(this.options.transition);
        this.tip.css(f).hide();
        this.hotspot.bind(this.options.event, $.proxy(this.toggle, this));
        if (this.options.event.indexOf("click") == -1 && typeof $(this.hotspot).get(0) != "undefined" && $(this.hotspot).get(0).tagName.toLowerCase() == "a") {
            this.hotspot.bind("click", function (a) {
                a.preventDefault()
            })
        }
        if (this.tip.find("#send_email_form").length > 0) {
            this.sendEmailFormHtml = this.tip.html()
        }
        this.log("tooltip init", this.options, this.hotspot, this.tip)
    },
    detachItem: function () {
        if (this.options.position) {
            this.anchor = $("body > div.wrapper").eq(0);
            if (this.anchor.length <= 0) {
                this.anchor = $("body > *").filter(":first")
            }
            this.target = this.options.offset ? this.hotspot.closest(this.options.offset) : this.hotspot;
            this.tip.detach().appendTo(this.anchor);
        }
		/* SMG-xxxx Recommendation Product - Super Category : parkjeongmi 20130816 */
		(this.hotspot.closest(".search_list_rolling").size() > 0 && this.options.width > 0) ? this.tip.css({"width":this.options.width+"px"}) : null;
		/* //SMG-xxxx Recommendation Product - Super Category : parkjeongmi 20130816 */

        if (this.tip.hasClass("modal")) {
            if (document.location.href.indexOf('/us/support/repair-service/schedule-repair') != -1) {
                  $("div#selected-product-info input[type='hidden']").filter("[name='setServiceType']").each (function() {
                     if($(this).val() == "Ship-In"){
                         $(".ship_in,.onsite,.noproduct").css('display','none');
                         $(".modal .payload-cs4").css('height','344px');
                         $(".ship_in").css('display','block');
                     }else if($(this).val()=="On-Site"){
                         $(".ship_in,.onsite,.noproduct").css('display','none');
                         $(".modal .payload-cs4").css('height','344px');
                         $(".onsite").css('display','block');
                     }else if($(this).val()==""){
                         $(".ship_in,.onsite,.noproduct").css('display','none');
                         $(".noproduct").css('display','block');
                     }
               	  });
          	}
            this.tip.appendTo($("body"));
            this.tip.height($(document).height());
            if ($.browser.msie && $.browser.version < 9) {
                this.tip.css("background", 'url("/lg3-common/images/global/dither.gif") repeat 0 0')
            }
        }
    },
    kill: function () {
        this.tip.empty().remove()
    },
    position: function (d) {
        this.tip.show();
        var c = {};
        switch (d) {
        case "bottom-left":
            c = {
                top: (this.target.offset().top + this.target.height()) + "px",
                left: (this.target.offset().left - this.anchor.offset().left - this.tip.width()) + "px"
            };
            break;
        case "bottom":
            c = {
                top: (this.target.offset().top + this.target.height()) + "px",
                left: (this.target.offset().left - this.anchor.offset().left + Math.round(this.target.outerWidth(true) / 2) - Math.round(this.tip.width() / 2)) + "px"
            };
            break;
        case "top":
			/* 201404 modify */
			c = {
				top: (this.target.offset().top - this.anchor.offset().top - this.tip.outerHeight(true)) + "px",
				left: (this.target.offset().left - this.anchor.offset().left + Math.round(this.target.outerWidth(true) / 2) - Math.round(this.tip.width() / 2)) + "px"
			};
			var d = Math.round(this.tip.width()) + Math.round(c.left.replace("px", "")) - $(".wrapper").width() - 20;
            if (d > 0 && this.tip.hasClass("bubble")) {
                c.left = (Math.round(c.left.replace("px", "")) - d) + "px";
                this.tip.find(".pointer").css("margin-right", (Math.round(this.tip.width() / 2) - d - 20) + "px")
            }

			if(this.hotspot.hasClass('features-info-icon')) {
				$(this.options.tooltip).find('.flip-horizontal').css({
					position:'relative',
					left: parseInt(((this.target.offset().left - this.anchor.offset().left + Math.round(this.target.outerWidth(true) / 2) - Math.round(this.tip.width() / 2)))+50) + "px"
				});
			}

            break;
        default:
            this.log("Invalid position provided: " + d)
        }
        this.tip.hide();
        this.log("autoposition " + d, this.target, c);
        this.tip.css(c)
    },
    isClosed: function () {
        return !this.isOpen()
    },
    isOpen: function () {
        return this.tip.hasClass("open")
    },
    toggle: function (b) {
        if (typeof b != "undefined") {
            b.preventDefault();
            b.stopPropagation()
        }
		/* 201404 modify */
        if (/(mouseenter|mouseleave|mouseover|mouseout|focusin|foucsout)/.test(this.options.event)) {
            if (b.type == "mouseenter" || b.type == "mouseover" || b.type == "focusin") {
                if (this.isOpen()) {
                    return
                }
                this.timeOut = "";
				/* 201404 add */
				var speed = (b.type == "focusin") ? 50 : 700;
				var tag = $(this.hotspot).get(0).tagName; // 140414 add

                clearTimeout(this.timeOut);
                this.timeOut = setTimeout($.proxy(function () {
                    this.open()

					/* 140411 add (a type, div type check) add */
					if(tag == "A"){
						this.hotspot.attr("aria-describedby", this.tip.attr('id'));
					} else {
						this.hotspot.find('a:eq(0)').attr("aria-describedby", this.tip.attr('id'));
					}

                }, this), speed);

				/* 140411 mouseleave, focusout add */
                this.hotspot.bind("mouseleave focusout", $.proxy(function () {
                    clearTimeout(this.timeOut)
                }, this))

				/* 140717 add */
				$(document).on("click", 'a.background-wrapper, #awards a, .background-wrapper a', function (e) {
					if($(this).attr("href") == "#"){
						e.preventDefault();
					}
				});

            } else {
                this.close()
            }
        } else {
            if (this.isClosed()) {
                this.open()
            } else {
                this.close()
            }
        }
    },
    open: function (d) {
        if (typeof d != "undefined") {
            d.preventDefault();
            d.stopPropagation()
        }
        this.detachItem();
        if (this.tip.hasClass("modal")) {
            this.payload = this.tip.find(".payload"), offset = Math.floor($(window).scrollTop() + ($(window).height() / 2) - (this.payload.height() / 2)), offset = offset < 0 ? 0 : offset;
            this.payload.css("margin-top", offset)
        }
        if (this.options.type == "iframe") {
			/* LGEIN-527 : Unable to Host Youtube Video in the Model Section & the Features Section by Parkms 20130502 modify */
				 if ($("body").find(".lg-support").length > 0) {
			 /* //LGEIN-527 : Unable to Host Youtube Video in the Model Section & the Features Section by Parkms 20130502 modify */

				/* 201404 modify */
				this.payload.prepend('<iframe id="modalFrm" frameborder="0" src="' + this.options.url + '" title="' + this.options.title + '" frameborder="0" scrolling="no" style="width:100%;height:100%;overflow:hidden"></iframe>')
            } else {
				/* 201404 modify */
                this.payload.prepend('<iframe id="modalFrm" frameborder="0" src="' + this.options.url + '" title="' + this.options.title + '" frameborder="0" scrolling="auto" style="width:100%;height:97%;overflow:auto"></iframe>')
            }
            if (this.options.width) {
                this.payload.css({
                    width: parseInt(this.options.width + 30) + "px",
                    height: parseInt(this.options.height + 30) + "px",
                    "text-align": "center"
                })
            }
        } else {
            if (this.options.type == "modal-flash") {
                this.payload.css({
                    "line-height": parseInt(this.payload.height()) + "px",
                    "text-align": "center"
                });
                swfobject.registerObject("modal-flash", "9.0.0", "expressInstall.swf");
				/* 201404 modify */
                var f = "<object id='modal-flash' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='" + this.options.width + "' height='" + this.options.height + "'><param name='movie' value='" + this.options.src + "' /><param name='wmode' value='window' /><!--[if !IE]>--><object type='application/x-shockwave-flash' data='" + this.options.src + "' width='" + this.options.width + "' height='" + this.options.height + "'><param name='wmode' value='window' /><!--<![endif]--><img src='" + this.options.altimg + "' alt='Get Adobe Flash player' /><!--[if !IE]>--></object><!--<![endif]--></object>";
                this.payload.prepend(f);
                $("#modal-flash", this.payload).css("visibility", "visible");
                this.payload.css({
                    width: parseInt(this.options.width + 30) + "px",
                    height: parseInt(this.options.height + 30) + "px",
                    "text-align": "center"
                })
            } else {
                if (this.tip.attr("id") == "send_email") {
					/* LGEGMO-141 : 20140502 modify */
                    this.tip.empty().html(this.sendEmailFormHtml).delay(100).find(".aform").aform("init").find('#imageCodeId').attr('src',lg.locale+"/product/imageCaptcha.lgajax?"+Math.random())
					/* //LGEGMO-141 : 20140502 modify */
                } else {
                    if (this.options.url) {
                        $.ajax({
                            type: "get",
                            url: this.options.url,
                            success: $.proxy(function (b) {
                                if (this.tip.hasClass("modal")) {
                                    if ($("html").hasClass("ie") && b.indexOf("iframe") > -1) {
                                        window.open(b.split('src="')[1].split('"')[0], "win");
                                        this.close()
                                    } else {
										/* 201404 modify */
                                        this.payload.prepend(b);
										if (document.location.href.indexOf("/us") != -1) {
                                            $("div#selected-product-info input[type='hidden']").filter("[name='setServiceType']").each(function () {
                                                if ($(this).val() == "Ship-In") {
                                                    $(".modal .payload-cs4").css("height", "344px");
                                                    $(".ship_in").css("display", "block")
                                                } else {
                                                    if ($(this).val() == "On-Site") {
                                                        $(".modal .payload-cs4").css("height", "344px");
                                                        $(".onsite").css("display", "block")
                                                    } else {
                                                        if ($(this).val() == "") {
                                                            $(".noproduct").css("display", "block")
                                                        }
                                                    }
                                                }
                                            })
                                        }

										if ($(b).hasClass("similar")) {
											this.payload.addClass("similar-product");
											lg.updateCompareButton();
											/* LGEDE-1255 :20140820 add */
											if(lg.locale == "/de"){
												lg.dropdownButton(this.payload)
											}
									        /* //LGEDE-1255 :20140820 add */
										}
                                    }
                                } else {

                                    this.tip.html(b);
									/* 201404 add */
									this.accessFocus();
                                    if (b != "" && b != null) {
                                        if (this.tip.attr("id") == "awards") {
                                            var c = parseInt(this.tip.find(".payload:first").css("padding-left").replace("px", "")) + parseInt(this.tip.find(".payload:first").css("padding-right").replace("px", "")) + (parseInt(this.tip.find(".payload:first ul li").outerWidth(true)) + parseInt(this.tip.find(".payload:first ul li").css("margin-left").replace("px", ""))) * this.tip.find(".payload:first ul li").length;
                                            c += parseInt(this.tip.find(".payload:first").css("margin-left").replace("px", ""));
                                            if ($("html").hasClass("ie")) {
                                                c = c + 45
                                            }
                                            $("#awards").css({
                                                padding: "0",
                                                margin: "0"
                                            });
                                            if (c > 500) {
                                                c = 500
                                            }
                                            var a = 169;
                                            this.tip.css({
                                                width: c,
                                                "margin-top": ($(".awards", document).offset().top - a / 4) + "px"
                                            })
                                        }
                                    }
                                    this.tip.find(".hotspot").tooltipper()
                                }
                                this.tip.find(".close, .cancel").bind("click", $.proxy(function (h) {
                                    h.preventDefault();
                                    if ($("html").hasClass("ie")) {
                                        $(".flash-content, .refresh-content", this.payload).remove()
                                    }
                                    this.close();

									if (document.location.href.indexOf("/us/support/repair-service/schedule-repair") != -1) {
										if ($("div#selected-product-info input[value='Ship-In']").val() == null && $("div#selected-product-info input[value='On-Site']").val() == null) {
	                                        $("html,body").animate({
	                                            scrollTop: "300px"
	                                        }, 500, "linear");
	                                        $(".model-browse-open").click()
	                                    }
									}

                                }, this))
                            }, this),
                            error: function (a) {
                                lg.overlayHide();
                                lg.showError("ajaxerror")
                            }
                        });
                        if (!$("html").hasClass("ie")) {
                            this.options.url = false
                        }
					} else {
                        if (this.tip.attr("id") == "awards") {
                            var i = parseInt(this.tip.find(".payload:first").css("padding-left").replace("px", "")) + parseInt(this.tip.find(".payload:first").css("padding-right").replace("px", "")) + (parseInt(this.tip.find(".payload:first ul li").outerWidth(true)) + parseInt(this.tip.find(".payload:first ul li").css("margin-left").replace("px", ""))) * this.tip.find(".payload:first ul li").length;
                            i += parseInt(this.tip.find(".payload:first").css("margin-left").replace("px", ""));
                            if ($("html").hasClass("ie")) {
                                i = i + 26
                            }
                            $("#awards").css({padding: "0",margin: "0"});
                            if (i > 440) {
                                i = 440
                            }
                            var g = 169;
                            this.tip.css({width: i,"margin-top": ($(".pane-aside:visible .awards", document).offset().top - g / 4) + "px"})
                        }
                    }
                }
            }
        }

		/* 140410 modal caption width add */
		if(this.tip.find(".caption-wrapper").length){
			this.tip.find(".caption-wrapper").width(this.tip.find(".payload").width() + 50);
		}

        this.tip.find(".close, .cancel").unbind("click").bind("click", $.proxy(function (a) {
            a.preventDefault();
            if (this.options.type == "iframe") {
				if ($.browser.msie && $.browser.version == 9 && this.tip.find(".payload.youtube-layer-01")){ $("iframe", this.payload).hide();}
                $("iframe", this.payload).remove();
            } else {
                if (this.options.type == "modal-flash") {
                    $("#modal-flash", this.payload).remove()
                } else {
                    if (this.tip.find(".layer-content").length > 0 && $("html").hasClass("ie")) {
                        this.tip.find(".layer-content").remove()
                    }
                }
            }
            this.close()
        }, this));
        /*! Comments //cns modify : parkjeongmi */
        if (this.options.position) {
            this.position(this.options.position)
        }
        if (this.options.singleview) {
            this.broadcast("tooltipper", "close")
        } else {
            this.tip.css("z-index", ++lg.Tooltip.z)
        }
        if (this.options.type == "iframe") {
            var e = this;
            setTimeout(function () {
                if (e.tip.find("#modalFrm").length > 0 && e.tip.find("#modalFrm").contents().find(".cancel").length > 0) {
                    e.tip.find("#modalFrm").contents().find(".cancel").bind("click", function (a) {
                        $("iframe", e.payload).remove();
                        e.close()
                    })
                }
            }, 500)
        }
        lg.addImages(this.tip);
        this.broadcast("video", "showPlayer", $(".video", this.tip));
        this.tip.show();
        this.tip.addClass("open");
		/* 201404 add */
		this.accessFocus();
    },
    close: function (b) {
        if (typeof b != "undefined") {
            b.preventDefault();
            b.stopPropagation()
        }
        if (this.isClosed()) {
            return
        }
        this.broadcast("aform", "resetForm", $(".aform", this.tip));
        this.broadcast("video", "resetVideo", $(".video", this.tip));
        if (this.options.csstransitions) {
            this.tip.unbind(transitionEnd).bind(transitionEnd, $.proxy(function () {
                if (this.isClosed()) {
                    this.tip.hide()
                }
                this.tip.unbind(transitionEnd)
            }, this))
        } else {
            this.tip.hide()
        }
        this.tip.removeClass("open")
    },

	/* 201404 add */
	accessFocus: function () {
		var firstElement = this.tip.find("a, input:not([disabled='disabled']), select, button, textarea").filter(':first'),
			lastElement = this.tip.find("a, input:not([disabled='disabled']), select, button, textarea").filter(':last'),
			closeElement = this.tip.find(".close");


		/* 20140326 ~ 28 Tooltip Focus : ansooyune add S */
		var box = $('#product-display div.pane.active > a'),
			set = $.proxy(function(){
				box.focus();
				setTimeout( $.proxy(function(){ this.hotspot.removeClass('active-pane') }, this),100)
			}, this);

		this.hotspot.off('keydown').on('keydown', $.proxy(function (b) {
			if(b.keyCode == 9 && b.shiftKey) {
			} else if (b.keyCode == 9) {
				if(this.tip.css("display") == "block" && this.tip.find('.close').size() > 0 && this.tip.hasClass("bubble") == false){
					b.preventDefault();
					firstElement.focus();
				}
			}
		}, this));

		this.tip.off("keydown").on("keydown", "a, input:not([disabled='disabled']), select, button, textarea", $.proxy(function (b) {
            var lt = this.tip.find("a, input:not([disabled='disabled']), select, button, textarea").filter(':first');

            if(b.keyCode == 9 && b.shiftKey) {
                if(this.tip.css("display") == "block" && $(b.target).filter(':first')[0] == lt[0]){
                    b.preventDefault();
					if(this.tip.css("display") == "block" && this.tip.find('.close').size() > 0){
						lastElement.focus();
                    } else {
						this.close();
					}
                }
            }
        }, this));

		lastElement.off('keydown').on('keydown', $.proxy(function (b) {
			if(b.keyCode == 9 && b.shiftKey) {
			} else if (b.keyCode == 9) {
				if(this.tip.css("display") == "block" && this.tip.find('.close').size() > 0){
					b.preventDefault();
					firstElement.focus();
				} else {
					this.close();
				}
			}
		}, this));

		closeElement.on('keydown', $.proxy(function (b) {
			if(b.keyCode == 9 && b.shiftKey) {
			} else if (b.keyCode == 9) {
				b.preventDefault();
				firstElement.focus();
			}
		}, this));

		closeElement.on('click', $.proxy(function (b) {
			b.preventDefault();
			if(this.tip.hasClass("bubble")){
				this.hotspot.parent().next().find("a, input:not([disabled='disabled']), select, button, textarea").filter(':first').focus();
			} else {
				this.hotspot.hasClass('active-pane') ? set() : this.hotspot.focus();
			}
		}, this));
	}
});
lg.Tooltip.z = $(".tooltip").filter(":first").css("z-index");
lg.plugin("tooltipper", lg.Tooltip, ".hotspot");