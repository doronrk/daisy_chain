lg.Grid = lg.Component.extend({
    options: {
        uri: false,
        sortchange: false, // element
        csstransitions: head.csstransitions
    },
    init: function (d, c) {
        this._super(d, c);
        this.hasHistory = !! (window.history && history.pushState);
        this.form = this.element.find("form");
        this.pageList = this.element.find(".content-pages");
        this.shim = this.element.find(".shim");
        this.pageControls = this.element.find(".page-controls");
        this.pageField = $("#page_number");
        this.limitField = $("#page_limit");
        this.loading = false;
        this.currentPage = 0;
        this.current = 0;
        this.dataset = null;

		/* 201404 modify */
        /*LGESG-705 2014-08-11  $(document).on : modify */
        $(document.body).on("click", ".pages a", this.pageControls, $.proxy(function (a) {
        /*//LGESG-705 2014-08-11  $(document).on : modify */
            a.preventDefault();
            this.viewPage($(a.target).index(),'',$(a.target));
        }, this));

        /*LGESG-705 2014-08-11  $(document).on : modify */
        $(document.body).on("mouseenter focusin", "a.img-link, button.glance-btn", this.element, $.proxy(function (a) {
        /*//LGESG-705 2014-08-11  $(document).on : modify */
			if (a.relatedTarget && a.relatedTarget.nodeName.toLowerCase() == "button") {
                return
            }

            $btn = $(a.target).closest("article").find("button.glance-btn");
            if (this.options.csstransitions) {
                $btn.css({
                    opacity: 1
                })
            } else {
                $btn.show().stop().animate({
                    opacity: 1
                }, 300)
            }
        }, this)).on("mouseleave focusout","a.img-link, button.glance-btn", this.element, $.proxy(function (a) {
            if (a.relatedTarget && a.relatedTarget.nodeName.toLowerCase() == "button") {
                return
            }
            $btn = $(a.target).closest("article").find("button.glance-btn");
            if (this.options.csstransitions) {
                $btn.css({
                    opacity: 0
                })
            } else {
                $btn.stop().animate({
                    opacity: 0
                }, 300)
            }
        }, this));
        $("> li", this.pageList).addClass("grid-page");

		/* LGERU-768 : 20130221 add, LGERU-1402 20140311 modify */
		if(lg.locale=='/ru'){
			 if ($('a.wtb-googleTrack').length > 0) {
				if ($.browser.webkit) {
					$('a.wtb-googleTrack').each(function(){
						var url =$(this).attr('href');
						var _modelName = url.substring(url.lastIndexOf("=")+1);
						var _categoryName = $('body').find('input[name=categoryName]').val();

						$(this).bind('click', function(e){
							e.preventDefault();
							_gaq.push(['_setAccount', 'UA-35438634-1']);
							_gaq.push(['_trackEvent', _categoryName, 'Click', _modelName]);

							setTimeout(function() {location.href = url}, 300);
						});
					});

				}else{
					/* 20140521 modify */
					/*LGESG-705 2014-08-11  $(document).on : modify */
					$(document.body).on("click", "a.wtb-googleTrack", this.element, function(a){
					/*//LGESG-705 2014-08-11  $(document).on : modify */
						var url =$(this).attr('href');
						var _modelName = url.substring(url.lastIndexOf("=")+1);
						var _categoryName = $('body').find('input[name=categoryName]').val();

						_gaq.push(['_setAccount', 'UA-35438634-1']);
						_gaq.push(['_trackEvent', _categoryName, 'Click', _modelName]);

						setTimeout(function() {location.href = url}, 400);

					},this);
				}
			}
		}
		/* //LGERU-768 : 20130221 add, LGERU-1402 20140311 modify */

        /* Add ajax load flag [server-load - true/false] : parkjeongmi 2012-08-01 S */
        if (!this.pageList.attr("server-load"))
		{
			//clear SEO markup
            this.pageList.empty();

			// Autoload the initial page.
            this.viewPage(0, true)
        } else {
			// When loading a page only "paging tag" add without the "ajax" : parkjeongmi 20120925
			if(this.pageList.find(".default-pager").length > 0) {
				this.pageControls.find(".pager").html(this.pageList.find(".default-pager").html());
			}

			// no result page delete view all : parkjeongmi 20121122
			if(this.pageList.find(".no-results").length > 0) {
				this.pageControls.find(".pager").empty();
			}
		}
		/* Add ajax load flag [server-load - true/false] : parkjeongmi 2012-08-01 E */

        if(this.options.sortchange){
            this.changeSort();
        }
    },
    handlePageControls: function (b, c, d) {
        this.pageControls.find(".pager > *").find("a").removeClass("active");
        this.pageControls.find(".pager").html(b);

        /* 20140425 add */
        if(c != undefined || d != undefined) {
            var target = d == true ? $('.page-controls.top .pages').find('a') : $('.page-controls').eq(1).find('.pages a'),
            last = 0;

            target.each(function(){
                $(this).text() == c ? $(this).focus() : last += 1;
            });

            if(target.size() == last) { target.filter('.active').focus()}
        }
        /* // 20140425 add */
    },
    viewPage: function (i, h, f) {
        if (this.loading) {
            return
        }
        this.loading = true;
        this.log("viewing", i);
        var k = this.element.find(".pages a").eq(i);
        if (k.hasClass("active")) {
            this.pageList.find("li > .pager").remove();
            this.currentPage = i;
            this.current = i;
            this.loading = false;
            return false
        }
        this.broadcast("tooltipper", "close");
        var l = k && k.length ? k.attr("data-uri") : this.options.uri;
		/*  LGEKZ-172:"Where to buy" section by pms 20130610 */
		if($.browser.msie && $('.aform[data-responseloc=notice-response]').length >0){
			l=encodeURI(l);// LGEJP-671:Modification request (LGCOM> Footer, News section) by pms 20130528
		}
		/*  LGEKZ-172:"Where to buy" section by pms 20130610 */
        var i = k && k.length > 0 ? k.index() : 0;
        lg.overlayShow(this.shim);
        this.log("loading", i, l);
        var j = $.proxy(function (b) {
            this.pageList.css({
                left: "0px"
            });

            b = $(b);
            if (i < this.currentPage || i == 0) {
                $(this.pageList).prepend('<li class="grid-page"></li>');
                this.destination = $("li.grid-page:eq(0)", this.pageList);
                var a = "0px";
                this.current = 0
            } else {
                if (i >= this.currentPage) {
                    $(this.pageList).append('<li class="grid-page"></li>');
                    this.destination = $("li.grid-page:eq(1)", this.pageList);
                    var a = "-" + $(this.destination).width() + "px";
                    this.current = 1
                }
            }
            this.previous = this.current == "1" ? "0" : "1";
            $("li.grid-page", this.pageList).css({
                height: $("li.grid-page:eq(" + this.previous + ")").height()
            });
            this.broadcast("tooltipper", "kill", $("li.grid-page .hotspot", this.pageList));
            this.destination.html(b.filter(".product-grid").html());
			/* LGEDE-1255 :20140820 add*/
			if(lg.locale == "/de" && $('.expansion-btn').length > 0){
				lg.dropdownButton();
			}
			/*//LGEDE-1255 :20140820 add*/
            /* 20140425 add, modify */
            var txt, top;
            if(f != undefined) {
                txt = f.text();
                top = f.closest('.page-controls').hasClass('top');
            }else {
                txt, top = undefined;
            }
			this.handlePageControls(b.filter(".pager").html(), txt ,top);

            if (b.filter("script").length) {
                b.filter("script").each(function () {
                    $.globalEval(this.text || this.textContent || this.innerHTML || "")
                })
            }
            lg.overlayHide();
            if (this.current == "0" && !h) {
                this.pageList.css({
                    left: "-" + this.destination.outerWidth() + "px"
                })
            }
            var c = this.destination.outerHeight();
            var d = this.pageList.find(".accordion").length ? 500 : 20;
            if (!h) {
                if (this.options.csstransitions) {
                    this.pageList.addClass("animate");
                    this.pageList.bind(transitionEnd, $.proxy(function (e) {
                        if (e.originalEvent.propertyName == "left") {
                            this.pageList.removeClass("animate");
                            $("li.grid-page:eq(" + this.previous + ")", this.pageList).empty().remove();
                            $("li.grid-page", this.pageList).css({
                                height: "auto"
                            });
                            this.pageList.css({
                                left: "0px"
                            });
                            this.pageList.unbind(transitionEnd).bind(transitionEnd, function () {});
                            lg.loadImages()
                        }
                    }, this));
                    setTimeout($.proxy(function () {
                        this.pageList.css({
                            left: a
                        })
                    }, this), d)
                } else {
                    setTimeout($.proxy(function () {
                        this.pageList.animate({
                            left: a
                        }, $.proxy(function () {
                            $("li.grid-page:eq(" + this.previous + ")", this.pageList).empty().remove();
                            $("li.grid-page", this.pageList).css({
                                height: "auto"
                            });
                            this.pageList.css({
                                left: "0px"
                            });
                            lg.loadImages()
                        }, this))
                    }, this), d)
                }
            } else {
                $("li.grid-page", this.pageList).css({
                    height: "auto"
                });

            }

            this.currentPage = i;
            this.loading = false;
            $("span.models-number").text(Math.round($("span.total:first", this.element).text()));
            this.callback(this.destination)

        }, this),
            g = function () {
                lg.showError("ajaxerror");
                lg.overlayHide()
            };
		/* LGEFR-830 Where to buy - Cities by Parkms 20131106 modify */
			if(($.browser.msie && lg.locale=='/tw' && $('.locations-directions').length > 0) || ($.browser.msie && lg.locale=='/fr' && $('.locations-directions').length > 0)){
				l=encodeURI(l);
		}
		/* //LGEFR-830 Where to buy - Cities by Parkms 20131106 modify */
        this.request = $.ajax({
            url: l,
            type: "POST",
            data: this.dataset,
            success: j,
			complete: function (c) {/* LGEIS-916 Change position of link "Approfondisci" in MYLG section : 20130409 kosangin add */
				 if($('.page-controls.my-support').find('a.view-more').length > 0){
					var _more = $('a.view-more').width() - 10;
					$('.icon-information').css({marginLeft:'-'+_more + 'px'});
				}
			 },/* //LGEIS-916 Change position of link "Approfondisci" in MYLG section : 20130409 kosangin add */
            error: g
        });


    },
    reload: function (b) {
        if (this.loading) {
            return
        }
        this.loading = true;
        this.options.uri = b;
        lg.overlayShow(this.shim);

        this.request = $.ajax({
            url: b,
            type: "post",
            data: this.dataset,
            success: $.proxy(function (a) {
                a = $(a);
                this.broadcast("tooltipper", "kill", $("li.grid-page .hotspot", this.pageList));
                $("li.grid-page", this.pageList).html(a.filter(".product-grid").html());
				/* LGEDE-1255 :20140820 add*/
				if(lg.locale == "/de" && $('.expansion-btn').length > 0){
					$('.cta, .ex-btn-wrap').css({visibility:'hidden'});
					lg.dropdownButton();
				}
				/*//LGEDE-1255 :20140820 add*/
				/* LGEUS-1869 : 20121228 add */
						$(document).bind('keydown keyup', function(e) {
					if(e.which === 116 || e.which ===  82) {
						$('div.hero').find('input.find-filter').attr('checked', false);
						$('div.hero').find('input.find-filter').attr("disabled", false);
						$(".hero-area.find .find-intro-wrap").css({display:"block"});
					   return true;
					}
				});
				if(lg.locale=="/us" && a.filter(".product-grid").find('input[name=finderRId]').length > 0){/* // LGEUS-2765 : 20120416 modify */
					$('.hero .options label').find('div.loader').remove();
					var _finderRId = $('input[name=finderRId]').val();
                	var a_array = _finderRId.split(",");

					$('.hero .options label').each(function(){
						var w_label = $(this).outerWidth() + 2;
						var h_label = $(this).outerHeight() +2;

						$(this).append('<div class="loader" style="border:1px solid #fff"></div>');

							if($(this).parent('div').hasClass('bottom')){
								$(this).find('.loader').css({width:w_label+'px', height:h_label+'px',marginTop:'-1px',left:'-1px'});
							}else{
									$(this).find('.loader').css({width:w_label+'px', height:h_label+'px',marginTop:'-22px',left:'0px'});
									if ($.browser.webkit) {
										$(this).find('.loader').css({width:w_label+'px', height:h_label +'px',marginTop:'-6px',left:'0px'});
									}
									if ($.browser.msie){
										$(this).find('.loader').css({width:w_label+'px', height:h_label+'px',marginTop:'-3px',left:'0px'});
									}
							}
						});

					$('div.hero.active .options label').addClass('inactive');
                	$('div.hero.active .options label').find('input').attr("disabled", true);
                	for(var i = 0; i <a_array.length; i++){
                		if(a_array[i] != "" && a_array[i] != null){
                			$('div.hero.active .options label').each(function(){
                				if(a_array[i] == $(this).find('input.find-filter').attr('name') && $(this).attr('class').match('inactive') || $(this).attr('class').match('red')){
                					$(this).find('input').attr("disabled", false);
                					$(this).removeClass('inactive');
                					$('.hero.active .options label').css({display:'block'});
                				}
                			});
                		}
                	}
					$('.hero .options label').find('div.loader').remove();
                }
				/* LGEUS-1869 : 20121228 add */


                this.handlePageControls(a.filter(".pager").html());
                a.filter("script").each(function () {
                    $.globalEval(this.text || this.textContent || this.innerHTML || "")
                });
				/* LGEFR-830 Where to buy - Cities by Parkms 20131024 add*/
				if (lg.locale == "/fr") {
					var countMsg = $("ul.content-pages input[name=countMsg]").val();
					var basicStep = $("#countryNm option:selected").val();
					if(countMsg != null && countMsg != ""){
					$("._searchCheck span").text("* "+ countMsg);
					$("._searchCheck").css("display","block");
					}else if(basicStep =="" || basicStep ==null ){
						var basicMsg = $('.where-to-buy-info .find-a-store form.filter input[name=defaultMsg]').val();
					    $("._searchCheck span").text("* "+ basicMsg);
						$("._searchCheck").css("display","block");
					}else{}
				}
				/* //LGEFR-830 Where to buy - Cities by Parkms 20131024 add*/
				/* filter realtime search : parkjeongmi 20120919 S */
				if(typeof filters != "undefined" && filters.length >= 0) {
					filterInfo = filters;
					this.broadcast('gridFilter', 'checkFilter');
				}
				/* filter realtime search : parkjeongmi 20120919 E */

                this.callback($("li.grid-page", this.element));
                lg.overlayHide(this.shim);
                this.currentPage = 0;
                $("span.models-number").text(Math.round($("span.total:first", this.element).text()));
                this.loading = false
            }, this),
            error: function () {
                lg.showError("ajaxerror");
                lg.overlayHide()
            },
            beforeSend: function () {

                $("section.find").find(".models-number").html('&nbsp;');

            }// Filter the list to update the results when the value of the initialization, yunyoungseo 2012-11-29
        });
        this.log("reloading", b)
    },
    changeSort: function(){
        this.sortElement = $(this.options.sortchange,this.element)

        this.element.on("change", this.sortElement, $.proxy(function(e){

            this.dataset = this.sortElement.serialize();
            this.reload(this.options.uri);

        },this))
    }
});
lg.plugin("grid", lg.Grid, ".grid");