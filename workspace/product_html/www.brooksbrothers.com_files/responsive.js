(function($,sr) {

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj  = this;
            var args = arguments;

            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }

                timeout = null;
            };

            if (timeout) {
                clearTimeout(timeout);
            }
            else if (execAsap) {
                func.apply(obj, args);
            }

            timeout = setTimeout(delayed, threshold || 500);
        };
    }

    // smartresize
    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

})(jQuery,'smartresize');


// click outside plugin
(function($){
    $.fn.outside = function(ename, cb){
        return this.each(function(){
            var $this = $(this),
                self = this;

            $(document).bind(ename, function tempo(e){
                if(e.target !== self && !$.contains(self, e.target)){
                    cb.apply(self, [e]);
                    if(!self.parentNode) $(document.body).unbind(ename, tempo);
                }
            });
        });
    };
}(jQuery));


/*
 * All java script logic for the mobile layout.
 * The code relies on the jQuery JS library to be also loaded.
 * The logic extends the JS namespace app.*
 */
(function(app, $, undefined) {

    var mobileLayoutWidth;
    var tabletLayoutWidth;
    var $cache;

	app.responsive = {
		init : function() {
            mobileLayoutWidth = 768;
            tabletLayoutWidth = 960;
            $cache            = {
                wrapper            : $("#wrapper"),
                navigation         : $("#navigation"),
                mobileRefinements  : $("#responsive-productGridMobileRefinements"),
                desktopRefinements : $("#responsive-productGridDesktopRefinements"),
                storeLocator       : $("#storelocator-wheretogetit")
            };
      
			// Check onload to see if mobile enabled
			if (app.responsive.isMobileLayout()) {

				app.responsive.enableMobileNavigation();
                app.responsive.handleStoreLocator();

                
                $(document).ready(function(e) {
                    
                    var categorytitle = '';
                    if($('.categorylandingpage-top').attr('data-track-cat'))
                    	categorytitle = $('.categorylandingpage-top').attr('data-track-cat').toLowerCase();
                    
                    if(categorytitle == 'men' || categorytitle == 'women' || categorytitle == 'kids' || categorytitle == 'home') {
                        var $self = $('#responsive-buttonShowDepartaments');
                        $('#responsive-navigationMobileMenu').slideToggle(300);
                        $self.text(app.resources.HIDE_DEPARTMENTS);                    
                        var $navclicked = $('ul.responsive-menuCatDepartaments > li.'+categorytitle+' > a');
                        $navclicked.siblings("div.responsive-menuItemDepartamentContent:first").slideToggle(300);
                    	$('html,body').animate({scrollTop: '65px'},'slow');
                    } else {
                    	var offset = $('#header').offset();
                    	$('html,body').animate({scrollTop: offset},'slow');
                    }
                    
                    $('.bv-reviews-inline').insertAfter(".product-primary-image");
                    
                });
			}

            // Menu - Tablet global navigation
            $(document).on("click", "#responsive-navigationDesktopContainer > ul.level-1 > li > a", function(e) {
                if (app.responsive.isTabletLayout() && $(this).parent().attr("data-responsive-allow-link") !== "Y") {
                    e.preventDefault();
                }
            });
            // User shouldn't be able to get on a category landing page from the tablet resolution
            $(document).on("click", "#responsive-navigationDesktopContainer .level2-categories > h3 a, #responsive-navigationDesktopContainer .level2-categories > .level3-category-left > h3 a", function(e) {
                if (app.responsive.isTabletLayout()) {
                    e.preventDefault();
                }
            });
            // Menu - Show Departaments
            $(document).on("click", "#responsive-buttonShowDepartaments", function(e) {
                e.preventDefault();
                var $self = $(this);
                var $responsiveNavigationMobileMenu = $("#responsive-navigationMobileMenu");
                $responsiveNavigationMobileMenu.slideToggle(300, function() {
                    if ($responsiveNavigationMobileMenu.is(":visible")) {
                        $self.text(app.resources.HIDE_DEPARTMENTS);
                    } else {
                        $self.text(app.resources.SHOW_DEPARTMENTS);
                    }
                });
            });

            // Menu - Show Categories
            $(document).on("click", "ul.responsive-menuCatDepartaments > li.responsive-menuItemDepartament > a", function(e) {

               if ( $(this).data("responsiveAllowLink") !== "Y" ) {
                    e.preventDefault();
                    $(this).siblings("div.responsive-menuItemDepartamentContent:first").slideToggle(300);
                    return;
                }
               
               // if link isn't suppose to be disabled but has a void href value, let's check if it has a meta href value stored @ 'data-href' and use that
               // ** This workaround is in regard to the navigation optimizations implemented for touch devices using desktop layout -- htmlhead_UI.isml
               
               var _href = $(this).attr('data-href');
               if(_href !== undefined && _href !== '') { 
            	   location.href = _href;
               }
            });
            
            
            // LeftNav - Search & Product Grid
            $(document).on("click", "#responsive-productGridMobileRefinements > a.gsearchrefine-button", function(e) {
                e.preventDefault();
                $(this).toggleClass("on-state");
                $(this).siblings("div.grid-search-refine-mobile-content:first").slideToggle(300);
            });

            // Refinements content accordion
            if (app.responsive.isRefinementsPage()) {
                $cache.mobileRefinements.on("click", ".refinement-title", function () {
                    var $refinementSwatch = $(this).parent().find(".refinementswatch");
                    if ($refinementSwatch.is(":hidden")) {
                        $refinementSwatch.slideToggle(300, function () {
                            $(this).css("overflow","visible");
                        });
                    }
                    else {
                        $refinementSwatch.slideToggle(300);
                    }
                });
                $cache.mobileRefinements.on("click", ".cat-searchrefbar-category > h3", function () {
                    $(this).parent().find("ul").slideToggle(300);
                });
                $cache.mobileRefinements.on("click", "h3.current-tld", function () {
                    $(this).parent().find("ul:eq(0)").slideToggle(300);
                });
            }

            // Footer
            $(document).on("click", ".footer-links-wrapper > ul.menu-footer > li.title-link", function () {
                $(this).find("> ul.section-content").slideToggle(300);
            });

            // Gift Cards Landing page
            app.responsive.giftcardsLanding();

            // Gift Cards Page-Show page
            app.responsive.giftcardsPage();

            // Order tracking as guest
            $("#header-order-tracking-guest").length && $("#secondary").addClass("order-tracking-guest");
            
           
		},
		
		mobileInit : function() {
			mobileLayoutWidth = 768;
            tabletLayoutWidth = 960;
            $cache            = {
                wrapper            : $("#wrapper"),
                navigation         : $("#navigation"),
                mobileRefinements  : $("#responsive-productGridMobileRefinements"),
                desktopRefinements : $("#responsive-productGridDesktopRefinements"),
                storeLocator       : $("#storelocator-wheretogetit")
            };
            
         // Check onload to see if mobile enabled
			if (app.responsive.isNOTMobileLayout()) {
                    
				//alert("NOT MOBILE");
                	//$('body > nav').remove();
                	//$("body").removeClass("mobile-menu-push");
				
				/*if($("#wrapper").hasClass("pt_product-details")){
					$('.product-thumbnails.flexslider').flexslider("destroy");
                	$('#recently-viewed-products.flexslider').flexslider("destroy");
                	$('#recently-viewed-products ul').removeClass("slides");
                	$('#recently-viewed-products').removeClass("flexslider");
                	$('.pdp-main .product-thumbnails').removeClass('flexslider');
                    $('.pdp-main .product-thumbnails ul').removeClass('slides');
		    	}*/
				
                if(!$('.product-col-2 .product-top-details').length){
                	$('.product-top-details').prependTo('.product-col-2');
                    if($('.primaryimage-social').length){
                    	$('.pdp-social').appendTo('.primaryimage-social');
                    } else {
                    	$('.pdp-social').appendTo('.product-col-1');
                    }
                }	
                
                
                //Make Sticky Image on Product Set Pages
	                
                	// Set Product Set Columns to Equal Heights
	                function equalProdSetCol(){
	                	$('.product-set-columns').equalHeights();
	                }
	                
	                setTimeout(equalProdSetCol,3000);
	                /*
	                
	                // Add Classes for Stickem
	                //$('').addClass('');
	                
	                $('.pdp-main .product-col-1.product-set').addClass('stickem-container');
	                $('.pdp-main .product-col-1.product-set .primaryimage-social').addClass('stickem');
	                $('.product-set-columns').stickem({
	                	offset: 85//, 
	                	//onStick: function(){}
	                });
	                */
	                
			}
			
			// Check onload to see if mobile enabled
			if (app.responsive.isMobileLayout()) {

                
                $(document).ready(function(e) {
                	
                	//Product Set - Smart Bar
                	//Tag Item Sets
                	$("#pdpMain .product-set-item").each(function(index){
                		var itemCounter = index + 1;
                		$(this).addClass('product-set' + itemCounter);
                	});
                	
                	//Clone Images
                	
                	
                	if($(".smart-bar-hotspot").length == 0){
	                	$("#pdpMain .product-set-image img.product-thumbnail").each(function(index){
	                		var imgCounter = index + 1;
	                		$(this).addClass('product-thumbnail' + imgCounter);
	                		$(this).removeClass('quickviewimage'); 
	                		$("#smart-bar .smart-bar-container").append("<div class='smart-bar-hotspot smart-bar-hotspot" + imgCounter + "' id='product-set" + imgCounter + "'></div>");
	                		$(this).clone().appendTo("#smart-bar .smart-bar-container .smart-bar-hotspot" + imgCounter);
	                	});
	                	
                	}
                	if($(".first-image").length == 0){
                	$('<div class="first-image" />').prependTo('.smart-bar-container');
                		$('img.primary-image').clone().appendTo('.first-image');
                	}
                	
                	$('.smart-bar-hotspot').click(function(e){
                		var productSetID = $(this).attr("id");
                		var productSetLoc = $("." + productSetID).offset().top - 40;
                		$("body").animate({
                			scrollTop: productSetLoc
                		}, 1000);
                	});
                	
                	$('.first-image').click(function(e){
                		$("body").animate({
                			scrollTop: 100
                		}, 1000);
                	});
                	
                	// set header to absolute - IOS fixed header fix, stop header from floating in 
                	// center of page
                    $(document).on('focus', 'input', function(e) {
                        $("body").addClass('fixfixed');
                    })
                    $(document).on('blur', 'input', function(e) {
                    	$("body").removeClass('fixfixed');
                    });
                    
                    // Flexslider
                    if($(".pdp-main .product-thumbnails").length != 0){
	                    $('.pdp-main .product-thumbnails').addClass('flexslider');
	                    $('.pdp-main .product-thumbnails ul').addClass('slides');
	                    $('.flexslider').flexslider({
	                        animation: "slide",
	                        slideshow: false,
	                        animationLoop: false,
	                        directionNav: false
	                      });
                    } else {
                    	$('.pdp-main .product-primary-image').addClass('no-thumbs');
                    }
                    
                    
                    //Move PDP Page Elements
                    $('.product-top-details').prependTo('.product-col-1');
                    $('.pdp-social').appendTo('.product-col-2');
                    $('.bv-reviews-inline').insertAfter(".thumbnails-wrap");
                    
                  //Mobile Search button
                	$(".mobile-search-btn").click(function(e) {
                		// scroll to to in order to avoid IOS fixed header issue
                		$("body").scrollTo(0);
                		// close header promo in order to avoid IOS floating header
                		$(".header-promo-area").addClass("hard-close");
	              	    $(".header-promo-area").removeClass("hard-open");
	              	    $("#wrapper").addClass("promo-closed");
	              	    $("#wrapper").removeClass("promo-open");
	              	    $(".header-promo-area").stop().animate({
	              		      "height": "0px",
	              		      "max-height": "0px"
	              		}, 0);
                		
                		$(".header-search input[type=text]").show();
                		$(".menu-utility-user .account-text").hide();
                		$(".mobile-search-btn").hide();
                		$(".header-search input[type=submit]").show(); 
                		$("#header #mini-cart").css("cssText", "margin-right:15px !important");
                		$(".header-search form").addClass("search-open");
                		setTimeout(function() {
                			$(".header-search input[type=text]").addClass("active");
                		   }, 500);
                		e.stopPropagation();
                	});
                	
                	$(".header-search input[type=text]").click(function(e) {
                		e.stopPropagation();
                	});
                	
                	$(document).click(function() {
                		if($(".header-search input[type=text]").hasClass("active")){
	                		$(".menu-utility-user .account-text").show();
	                		$(".header-search input[type=text]").hide();
	                		$(".mobile-search-btn").show();
	                		$(".header-search input[type=submit]").hide(); 
	                		$("#header #mini-cart").css("cssText", "margin-right:40px !important");
	                		$(".header-search input[type=text]").removeClass("active");
	                		$(".header-search form").removeClass("search-open");
                		}
                	});
                	
                	if ($("body").hasClass("mobile-menu-push")){
                		$('#left-push-menu').show();
                	} else {
	                	$('body').addClass('mobile-menu-push');
	                    $('body').prepend("<nav><div class='cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left' id='left-push-menu'><div class='mobile-menu-close'></div></div><div class='left-push-menu-fill'></div></nav>");
	                	$('.sticky-logo-link').clone().appendTo('#left-push-menu');
	                	$('#footer-category-menu').clone().attr("id","mobile-cat-menu").appendTo('#left-push-menu');
	                	$('.accordion-script').clone().appendTo('#left-push-menu');
	                	$('.menu-nav-addtional-nav-links').appendTo('#left-push-menu');
	                    $('.fiftyone-shipping-tab-wrapper-footer').clone().appendTo('#left-push-menu'); 
                	}
                    
                    $('#showLeftPush, .mobile-menu-close').click(function(e) {
                    	$('#showLeftPush').toggleClass('active'); 
                    	$('body').toggleClass('push-right');
                    	$('#left-push-menu').toggleClass('menu-push');
                    	$('#wrapper').toggleClass('push-right');
                    	$('#header').toggleClass('push-right');
                    	$('.fixed-header').toggleClass('push-right');
                    	$('.left-push-menu-fill').toggleClass('active');
                    });
                    
                    $('.shipping-tab-anchor').click(function(e) {
                    	$('body').removeClass('push-right');
                    	$('#showLeftPush').removeClass('active'); 
                    	$('#left-push-menu').removeClass('menu-push');
                    	$('#wrapper').removeClass('push-right');
                    	$('#header').removeClass('push-right');
                    	$('.fixed-header').removeClass('push-right');
                    	$('.left-push-menu-fill').removeClass('active');
                    	$('#wrapper').addClass('overflow'); 
                    });
                    
                    $('.left-push-menu-fill').click(function(e) {
                    	$('body').removeClass('push-right');
                    	$('#showLeftPush').removeClass('active'); 
                    	$('#left-push-menu').removeClass('menu-push');
                    	$('#wrapper').removeClass('push-right');
                    	$('#header').removeClass('push-right');
                    	$('.fixed-header').removeClass('push-right');
                    	$('.left-push-menu-fill').removeClass('active');
                    	$('#wrapper').removeClass('overflow');
                    });
                    
                    
                });
			} 
		},

        bfInit : function() {
            var $blackFleeceSubNav = $cache.wrapper.find(".bf-subnav-links");
            var isBlackFleeceLayout = $blackFleeceSubNav.length;
            var $subNavElements = $blackFleeceSubNav.children("ul").find("li");
            var subNavElementsNumber = $subNavElements.length;
            if (isBlackFleeceLayout && subNavElementsNumber >= 5) {
                var $subNavFilteredElements = $subNavElements.filter(function(index) {
                    return index == 2 || index == 3;
                });

                ($(window).width() < 768) ? $subNavFilteredElements.hide() : $subNavFilteredElements.show();
            }
        },

        isMobileLayout : function() {
            return $(window).width() < mobileLayoutWidth;
        },
        
        isNOTMobileLayout : function() {
            return $(window).width() > mobileLayoutWidth;
        },

        isMobileResponsiveEnabled : function() {
            var $rspMobileMeta = $("meta[property='dw:responsive:mobile']");
            return $rspMobileMeta.size() > 0 && $rspMobileMeta.attr("content") === "true";
        },

        isTabletLayout : function() {
            return $(window).width() < tabletLayoutWidth;
        },

        isTabletResponsiveEnabled : function() {
            var $rspTabletMeta = $("meta[property='dw:responsive:tablet']");
            return $rspTabletMeta.size() > 0 && $rspTabletMeta.attr("content") === "true";
        },

        isRefinementsPage : function() {
            return $cache.mobileRefinements.size() > 0;
        },

        handleStoreLocator : function() {
            if ($cache.storeLocator.size() == 0) {
                return;
            }

            if (app.responsive.isMobileLayout()) {
                if ($cache.storeLocator.data("currentContentAsset") !== "mobile") {
                    $.ajax({
                        type     : "GET",
                        url      : app.urls.pageInclude,
                        data     : {"cid": "store-locator-iframe-mobile"},
                        dataType : "html",
                        success  : function(data) {
                            $cache.storeLocator.html(data);
                        }
                    });

                    $cache.storeLocator.data("currentContentAsset", "mobile");
                }
            }
            else {
                if ($cache.storeLocator.data("currentContentAsset") !== "desktop") {
                    $.ajax({
                        type     : "GET",
                        url      : app.urls.pageInclude,
                        data     : {"cid": "store-locator-iframe"},
                        dataType : "html",
                        success  : function(data) {
                            $cache.storeLocator.html(data);
                        }
                    });

                    $cache.storeLocator.data("currentContentAsset", "desktop");
                }
            }
        },

		enableMobileNavigation : function() {
            var responsiveCssClases = new Array("on-state", "responsive-showOnDesktop", "responsive-showOnTablet", "responsive-showOnMobile");
            var $mobileNavigation   = $("<ul>");

            $mobileNavigation.addClass("responsive-menuCatDepartaments");

            $("#responsive-navigationDesktopContainer").find("ul.menu-category > li").each(function() {
                var $srcL1Anchor    = $(this).find("> a");
                                
                var $srcL1Container = $(this).find("> div.level-2 > div.menu-wrapper > div.level2-categories");
                var $srcL1Slots     = $(this).find("> div.level-2 > div.menu-wrapper > ul.top-level2");

                var $dstL1Container = $("<li>");
                var $dstL1Content   = $("<div>");
                var $dstL1Anchor    = $srcL1Anchor.clone();
                var $dstL1Slots     = $srcL1Slots.clone();

                if ( $(this).data("responsiveAllowLink") === "Y" ) {
                    $dstL1Anchor.data("responsiveAllowLink", "Y");
                }
                else {
                    $dstL1Anchor.attr("href", "javascript:void(0);");
                }

                $dstL1Content.addClass("responsive-menuItemDepartamentContent");
                $dstL1Slots.addClass("responsive-menuItemDepartamentSlots");

                var $self = $(this);
                $.each(responsiveCssClases, function(index, cssClass) {
                    if ( $self.hasClass(cssClass) ) {
                        $dstL1Container.addClass(cssClass);
                    }
                });

               
                // Add spans to the Departament anchor
                var dstL1AnchorHtml = $dstL1Anchor.html();
                $dstL1Anchor.empty();
                $dstL1Anchor.append( $("<span>").addClass("menu-aLeft" ) );
                $dstL1Anchor.append( dstL1AnchorHtml );
                $dstL1Anchor.append( $("<span>").addClass("menu-aRight") );

                $dstL1Container.append( $dstL1Anchor );
                $dstL1Container.append( $dstL1Content );
                $dstL1Container.addClass("responsive-menuItemDepartament" + " " + $srcL1Anchor.text().toLowerCase());

                var isResponsiveDefaultLayout = $srcL1Container.data("responsiveDefaultLayout") === "Y";
                if (isResponsiveDefaultLayout) {
                    var $dstL2Container = $("<ul>");

                    $dstL1Container.addClass("responsive-menuDefaultLayout");
                    $srcL1Container.find("> div.col-category").each(function() {
                        var $srcL3Title     = $(this).find("> h4");
                        var $dstL3Title     = $srcL3Title.clone();
                        var $dstL2Item      = $("<li>");
                        var $dstL3Container = $("<ul>");

                        $.each(responsiveCssClases, function(index, cssClass) {
                            if ( $srcL3Title.hasClass(cssClass) ) {
                                $dstL2Item.addClass(cssClass);
                            }
                        });

                        $(this).find("> ul > li").each(function() {
                            $dstL3Container.append( $(this).clone() );
                        });

                        $dstL3Container.find("li").filter(".responsive-showOnMobile").first().addClass("first");

                        $dstL2Item.append( $dstL3Title     );
                        $dstL2Item.append( $dstL3Container );
                        $dstL2Container.append( $dstL2Item );
                    });

                    $dstL1Content.append( $dstL2Container );
                }
                else {
                    var $dstL2Container = $("<ul>");

                    $dstL1Container.addClass("responsive-menuAlternateLayout");
                    $srcL1Container.find("> div.level3-category-left").each(function() {
                        var $srcL3Title     = $(this).find("> h3");
                        var $dstL3Title     = $srcL3Title.clone();
                        var $dstL2Item      = $("<li>");
                        var $dstL3Container = $("<ul>");

                        $.each(responsiveCssClases, function(index, cssClass) {
                            if ( $srcL3Title.hasClass(cssClass) ) {
                                $dstL2Item.addClass(cssClass);
                            }
                        });

                        $(this).find("> div.col-category").each(function() {
                            var $srcL4Title     = $(this).find("> h4");
                            var $dstL4Title     = $srcL4Title.clone();
                            var $dstL3Item      = $("<li>");
                            var $dstL4Container = $("<ul>");

                            $.each(responsiveCssClases, function(index, cssClass) {
                                if ( $srcL4Title.hasClass(cssClass) ) {
                                    $dstL3Item.addClass(cssClass);
                                }
                            });

                            $(this).find("> ul > li").each(function() {
                                $dstL4Container.append( $(this).clone() );
                            });

                            $dstL4Container.find("li").filter(".responsive-showOnMobile").first().addClass("first");

                            $dstL3Item.append( $dstL4Title     );
                            $dstL3Item.append( $dstL4Container );
                            $dstL3Container.append( $dstL3Item );
                        });

                        $dstL2Item.append( $dstL3Title     );
                        $dstL2Item.append( $dstL3Container );
                        $dstL2Container.append( $dstL2Item );
                    });

                    $dstL1Content.append( $dstL2Container );
                }

                $dstL1Content.append( $dstL1Slots );
                $mobileNavigation.append( $dstL1Container );
            });

            $("#responsive-navigationMobileMenu").html($mobileNavigation);
		},

        disableMobileNavigation : function() {
            $("#responsive-navigationMobileMenu").empty();
        },
		
        equalateRows : function () {
            var $rowElements  = $cache.wrapper.find(".row p");
            var biggestHeight = 0;
            if ($rowElements.length) {
                $rowElements.each(function () {
                    var $self      = $(this);
                    var thisHeight = $self.height();
                    biggestHeight  = (thisHeight > biggestHeight) ? thisHeight : biggestHeight;
                });
                $rowElements.height(biggestHeight);
            }
        },

        giftcardsLanding : function () {
            var $wrapperGiftcard = $(".wrapper-giftcard");
            var $wrapperLeftGiftcard = $wrapperGiftcard.find(".left-column");
            var $wrapperRightGiftcard = $wrapperGiftcard.find(".right-column");
            var $isCBonRight, $isCBonLeft, $buttonsWrapper, $giftcardText;
            if ($wrapperGiftcard.length) {
                if ($(window).width() < 768) {
                    $isCBonRight = $wrapperRightGiftcard.find(".buttons-wrapper");
                    if ($isCBonRight.length) {
                        $buttonsWrapper = $wrapperGiftcard.find(".buttons-wrapper.check-balance").detach();
                        $giftcardText = $wrapperGiftcard.find(".gc-responsive-checkbalance").detach();
                        $buttonsWrapper.prependTo($wrapperLeftGiftcard);
                        $giftcardText.prependTo($wrapperLeftGiftcard);
                        $isCBonRight = 0;
                    }
                }
                else {
                    $isCBonLeft = $wrapperLeftGiftcard.find(".buttons-wrapper");
                    if ($isCBonLeft.length) {
                        $buttonsWrapper = $wrapperGiftcard.find(".buttons-wrapper.check-balance").detach();
                        $giftcardText = $wrapperGiftcard.find(".gc-responsive-checkbalance").detach();
                        $giftcardText.appendTo($wrapperRightGiftcard);
                        $buttonsWrapper.appendTo($wrapperRightGiftcard);
                        $isCBonLeft = 0;
                    }
                }
            }
        },

        giftcardsPage : function () {
        var $wrapperGiftcard = $(".giftcards-landing");
        var $firstOption = $wrapperGiftcard.find(".gc-option:eq(0)");
        var $gcButtonsFirst = $wrapperGiftcard.find(".gc-buttons div:eq(0)");
        var $isCBonBottom, $isCBonUpper, $buttonsWrapper;
            if ($wrapperGiftcard.length) {
                if ($(window).width() < 768) {
                    $isCBonBottom = $gcButtonsFirst.find(".button-wrap");
                    if ($isCBonBottom.length) {
                        $buttonsWrapper = $isCBonBottom.detach();
                        $buttonsWrapper.appendTo($firstOption);
                        $isCBonBottom = 0;
                    }
                }
                else {
                    $isCBonUpper = $firstOption.find(".button-wrap");
                    if ($isCBonUpper.length) {
                        $buttonsWrapper = $isCBonUpper.detach();
                        $buttonsWrapper.appendTo($gcButtonsFirst);
                        $isCBonUpper = 0;
                    }
                }
            }
        },
		
        setupThumbnailDistance : function(){
			if ($(window).width() < 479) {
		        if(!($('.thumbnails-wrap').length)){
		        	$('#product-content').css('padding-top','280px');
		        	$('.product-price').css('margin-top','-280px');
		        }
	        }
	        else
        	{
	        	$('#product-content').attr('style',' ');
	        	$('.product-price').attr('style',' ');
        	}
		},
		setupPdpDistance : function(){
			if ($(window).width() < 768) {
				var col1Height = $(".product-col-1").outerHeight(true);
				var buttonsHeight = $(".buttons-wrapper").outerHeight(true);
				var promotionalHeight = $("#promotion-mobile").outerHeight(true);
				var descriptionHeight = $(".description-features").outerHeight(true);
				var col2Height = $(".product-col-2").outerHeight(true);
				var pnHeight = $(".product-number-mobile").outerHeight(true);
				col2Height = col2Height - buttonsHeight - promotionalHeight - descriptionHeight - pnHeight

				if (col1Height > col2Height){
					var distance = (col1Height - col2Height) + 55;
					$("#promotion-mobile").css('margin-top', distance);
				}
				else {
					$("#promotion-mobile").css('margin-top', '55px');
				}

         	}
         	else {
         		$("#promotion-mobile").css("margin-top","");
    	    	$(".product-add-to-cart .buttons-wrapper").css("padding-top","");
         	}
		},
		accountNavigation : function(){
			if ($(window).width() < 767) {
	        	$(".secondary-navigation ul").hide();
		        $('span.title-span').click(function(){
	                $(".secondary-navigation ul").hide();
	                $(this).parent().next('ul').show();
	            });
	        }
		    else
			{
				$(".secondary-navigation ul").show();
				$('span.title-span').click(function(){
					$(".secondary-navigation ul").show();
				});
		    }
		}
	}


	$(document).ready(function() {
		app.responsive.init();
		app.responsive.mobileInit();

        var isBlackFleeceLayout = $("body").hasClass("blackfleece");
        isBlackFleeceLayout && app.responsive.bfInit();

        
     	$(window).smartresize(function() {
     		//app.responsive.mobileInit();
     		
     		/* fix 320px alternate spacing when resize*/
	        //app.responsive.setupThumbnailDistance();
			
     		/* setup PDP distances when there are less product variations to show and the desives is switched from landscape to portrait*/
			app.responsive.setupPdpDistance();
			
        	/* drop-down nav for my account pages on re-size*/
        	app.responsive.accountNavigation();
        });
     	if ($(window).width() < 767) {
			/* drop-down nav for my account pages */
			app.responsive.accountNavigation();
			
			/* setup PDP distances when there are less product variations to show */
			app.responsive.setupPdpDistance();
			
    	    /* fix 320px alternate spacing on load*/
	        //app.responsive.setupThumbnailDistance();
     	}
		// Set up listener so we can update DOM if page grows/shrinks, only on bigger platforms
		if (screen.width > 767) {
			
            /* START: Equalate rows in the category landing page */
            app.responsive.equalateRows();
            /* END: Equalate rows in the category landing page */
			$(window).smartresize(function() {
				
				// Reinitialize JS
				app.responsive.mobileInit();
				
				 /* center all dialog boxes when window resize: useful when flip the tablet from portrait to landscape */
		        $(".ui-dialog-content").dialog("option", "position", "center");
		            
		        /* START: Equal lines at the left and right of bottom footer (Copyright section) */
		        app.equalateHRs.init();
		        /* END: Equal lines at the left and right of bottom footer (Copyright section) */

                /* START: Equalate rows in the category landing page */
                app.responsive.equalateRows();
                /* END: Equalate rows in the category landing page */

                /* Execute BF app */
                var isBlackFleeceLayout = $("body").hasClass("blackfleece");
                isBlackFleeceLayout && app.responsive.bfInit();

				if (app.responsive.isMobileLayout()) {
					app.responsive.enableMobileNavigation();
				}
				else {
					app.responsive.disableMobileNavigation();
				}

                if ($(window).width() > 959) {
                    /* View page layout changing controls */
                    $("div.view-page-layout:hidden").length && $("div.view-page-layout").show();
                }
                else {
                    $("div.view-page-layout:visible").length && $("div.view-page-layout").hide();
                }

                // Gift Cards Landing page
                app.responsive.giftcardsLanding();

                // Gift Cards Page-Show page
                app.responsive.giftcardsPage();

                // Store Locator
                app.responsive.handleStoreLocator();
			});
		}
        else {
            if ($("#responsive-navigationDesktopContainer").size() > 0) {
                var should404Redirect = $("#responsive-navigationDesktopContainer").data("responsiveIsNotFoundPage") === "Y";
                var url404Redirect    = $("#responsive-navigationDesktopContainer").data("responsiveIsNotFoundPageRedirectUrl");

                if (should404Redirect) {
                    window.location.href = url404Redirect;
                }
            }
        }
	});

}(window.app = window.app || {}, jQuery));