//CHAMPS TAB ORDER
$(document).ready(function () {
   
	//HEADER
    $('a#skip_link').on('focus', function () {
		$('#reduce_input_text_height').attr('tabindex', 100);	
	});
	setTimeout(function(){
		$('#offer_banner_spotlight a.full, #offer_banner_spotlight a.open-disclaimer').attr('tabindex', 2);
		$('a#header_cart_button').attr('tabindex', 2);
		$('.secondary-global-banner a').attr('tabindex', 499);
	}, 300);
	$('a.screenreader').focusin(function () {
	    $(this).addClass('screenreader_show')
	});
	$('a.screenreader').on('click', function () {
	    $(this).removeClass('screenreader_show')
	});
	$('a.screenreader').focusout(function () {
	    $(this).removeClass('screenreader_show')
	});
	$('a#skiptomaincontent.screenreader_show').css({
	    'width': '0px !important',
	    'height': '0px !important',
	    'background-color': 'transparent !important'
	});
	
    //OPEN HEADER
	$('#header_nav a.screenreader.open_menu').on('click', function () {
	    if ($(this).parent('div').attr('data-nav') == 'the-drop') {
	        window.open('http://www.thedrop365.com');
	    } else if ($(this).parent('div').attr('data-nav') == 'release_calendar') {
	        setTimeout(function () {
	            $('#nav_release_calendar p, #nav_release_calendar a, #nav_release_calendar span, #nav_release_calendar .month-name, #nav_release_calendar .product img').attr('tabindex', 31);
	        }, 200);
	        setTimeout(function () {
	            $('#nav_release_calendar p, #nav_release_calendar a, #nav_release_calendar span, #nav_release_calendar .month-name, #nav_release_calendar .product img').attr('tabindex', 31);
	            $('#nav_release_calendar a img').attr('tabindex', -1);
	        }, 1500);
	    } else if ($(this).parent('div').attr('data-nav') == 'stores') {
	        setTimeout(function () {
	            $('#nav_stores h2, #nav_stores form, #nav_stores span, #nav_stores a').attr('tabindex', 41);
	        }, 1000);
	    } else if ($(this).parent('div').attr('data-nav') == 'help') {
	        setTimeout(function () {
	            $('#nav_help a, #nav_help h2, #nav_help span').attr('tabindex', 61);
	            $('#nav_help a').parent('h2').attr('tabindex', -1);
	        }, 1000);
	    } else {
	        var e = $(this).parent('div');
	        $('#ex_nav ul#nav_' + e.attr('data-nav')).slideDown('slow');
	    }
	});
	$('#header_login a').on('click', function () {
	        setTimeout(function () {
	            $('#login_container').attr('tabindex', 71);
	            $('#login_container').find('*').attr('tabindex', 71);
	            $('#login_container').focus();
	        }, 1500);
	});
	$('#nav_categories li a.screenreader.open_list').on('click',function () {
	    var catOrder = $(this).attr('tabindex');
	    var category = $(this).parent('li').attr('data-nav');
	    $('#ex_nav_2').show();
	    $('#ex_nav_2').children('#nav_' + category).slideDown('slow');
	    setTimeout(function () {
	        $('#ex_nav_2').children('#nav_' + category).find('a').attr('tabindex', catOrder);
	    }, 1000);
	});

	$('a.screenreader.close_list').on('click', function () {
	    $(this).parents('ul').slideUp('slow');
	    $('#ex_nav_2').slideUp('slow');
	});
	$('a.screenreader.close_menu').on('click', function () {
	    $(this).parents('#ex_nav_2').slideUp('slow');
	});
	$('#nav_kids a.screenreader.size_drop').on('click', function () {
	    $('#ex_nav_2 .size-drop ul.size-boxes').show();
	});
	$('div.search_btn a.js-global-nav-link').on('click', function () {
	    $('#reduce_input_text_height').focus();
	});
	



	
    //HOMEPAGE
	setTimeout(function () {
	    $('#showcasecellTable a, #showcasecellTable h1').attr('tabindex', 1000);
	    $('#showcasecellTable .slide_buttons a, #showcasecellTable a.slide_control, #showcasecellTable #spotlight a.button.white').attr('tabindex', -1);
	}, 1000);
	

	
	//SEARCH
	if ($('#endecaNav').length > 0) {
	    $('a.screenreader[href="#endecaNav"], a.screenreader[href="#endeca_search_results"]').remove();
		$('a[href="#skiptomaincontent"]').after('<a class="screenreader skip" tabindex="2" href="#endecaNav">Skip to search filters</a><a class="screenreader skip" tabindex="2" href="#endecaResultsWrapper">Skip to search results</a>');
		
		$('a.screenreader').focusin(function () {
            $(this).addClass('screenreader_show')
        });
        $('a.screenreader').on('click', function () {
            $(this).removeClass('screenreader_show')
        });
        $('a.screenreader').focusout(function () {
            $(this).removeClass('screenreader_show')
        });
        $('span.quickViewButtonWrap').attr('tabindex', -1);
        $('#searchResultsInfo span, #searchResultsInfo a, .mainsite_search_adjustments h3, .mainsite_search_adjustments label, .mainsite_search_adjustments select, .mainsite_search_adjustments .itemsPerPage, .first .endeca_pagination a').attr('tabindex', 900);
        $('#searchResultsInfo a').parents('span').attr('tabindex', -1);
        $('#endecaNav, #endecaNav a').attr('tabindex', 1000);
        $('#endecaResultsWrapper').attr('tabindex', 2000);
		$('#endeca_search_results ul li').find('*').attr('tabindex', -1);
		$('#endeca_search_results ul li').each(function () {
		    var tabAssistModel = $(this).attr('data-model');
		    var tabAssistSku = $(this).attr('data-sku');
		    var tabAssistTitle = $(this).children('a').attr('title');
		    var tabAssistPrice = $(this).children('a').children('span.product_price').children('span.sale').text();
		    var tabAssistRating = $(this).children('a').children('span.rating').attr('title');
		    $(this).prepend('<a href="/product/model:' + tabAssistModel + '/sku:' + tabAssistSku + '" class="screenreader tabAssistSearch" title="' + tabAssistTitle + '" tabindex="2000">' + tabAssistTitle + ' ' + tabAssistPrice + ' ' + tabAssistRating + '</a>')
		});
		
	}
	
	//PDP
	if ($('.pdp_wrapper').length > 0) {

	    setTimeout(function () {
	        $('.rv_title, .breadCrumb a').attr('tabindex', 511);
	        $('div.fb-like').removeAttr('tabindex');
	        
	        $('.left_column a, .left_column p').attr('tabindex', 1000);
	        $('.right_column a, .right_column h1, .right_column span, .right_column input, .right_column div.style_info').attr('tabindex', 2000);
	        
	        setTimeout(function () {
	            $('button[data-btnname="qvpdp_addToCart"], .product_quantity a, #addToWishlist a, .social a').attr('tabindex', 3000);
	            $('.product_overview a, .product_overview .section, .product_overview span[itemprop="description"], .product_overview p.screenreader').attr('tabindex', 4000);
	            $('p.screenreader[tabindex="564"]').remove();
	            $('#product_images .slide_buttons a.sl_previous, #product_images .slide_buttons a.next').attr('tabindex', 1000);

	        }, 1000);
	        $('a').parents('span').attr('tabindex', -1);
	        $('span').parents('span').attr('tabindex', -1);
	        $('input').parents('span').attr('tabindex', -1);
	        $('span').parents('div').attr('tabindex', -1);
	        $('a span').attr('tabindex', -1);
			$('button span').attr('tabindex', -1);
			$('a.info_icon').attr('tabindex', -1);
			$('.right_column .message').attr('tabindex', 2000);
			$('#product_styles .slide_buttons a.sl_previous, #product_styles .slide_buttons a.sl_next').removeAttr('tabindex');
			$('a#pdp_size_select').on('click', function () {
			    $('.product_sizes_content').attr('tabindex', 2000);
			    $('.product_sizes_content').focus();
			    $('.product_sizes_content a').attr('tabindex', 2000);
			    $('.product_sizes_content a').on('click', function () {
			        $('a.subtract_quantity').focus();
			    });
			});
			$('span').each(function () {
			    var $this = $(this);
			    if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
			        $this.attr('tabindex', -1);
			});

	    }, 1000);

	    var checkBV = 0;
	    checkBVInterval = setInterval(function () {
	        checkBV += 1;
	        if ($('.BVRRRootElement').length > 0) {
	            $('.BVRRRootElement a, .BVRRRootElement img').attr('tabindex', 2000);
	            clearInterval(checkBVInterval)
	        } else if (checkBV === 5) {
	            clearInterval(checkBVInterval);
	        }
	    }, 1000);

	    var checkYMAL = 0;
	    checkYMALInterval = setInterval(function () {
	        checkYMAL += 1;
	        if ($('#recommendations_spotlight').length > 0) {
	            $('#mybuyszone1 a').attr('tabindex', 6000);
	            clearInterval(checkYMALInterval);
	        } else if (checkYMAL === 5) {
	            clearInterval(checkYMALInterval);
	        }
	    }, 1000);

	    $('a[data-tab="description"]').on('click', function () {
	        setTimeout(function () {
	            $('span[itemprop="description"]').attr('tabindex', 4000);
	        }, 250);
	    });

	    $('a[data-tab="reviews"]').on('click', function () {
	        setTimeout(function () {
	            $('#BVRRContainer a, #BVRRContainer span, #BVRRContainer img').attr('tabindex', 4000);
	        }, 250);
	    });

	    $('a[data-tab="sizing"]').on('click', function () {
	        setTimeout(function () {
	            $('.pdp_sizing a, .pdp_sizing select, .pdp_sizing p').attr('tabindex', 4000);
	        }, 250);
	    });

	    $('a[data-tab="questions"]').on('click', function () {
	        setTimeout(function () {
	            $('#BVQAQuestionAndAnswerCountID, #BVQAContainer h1, #BVQAContainer h2, #BVQAContainer a').attr('tabindex', 4000);
	        }, 250);
	    });

	    //Cart
	    
	    $('button[data-btnname="qvpdp_addToCart"], a#header_cart_button').on("click",  function () {
	        console.log("TEST");
	        
	        var dontRunForever = 0
	        checkMiniCart = setInterval(function () {
	            dontRunForever += 1;
	            if ($('#cart .cart').length > 0) {
	                $('a[data-btnname="flyin_checkout"]').focus();
	                $('.flyin_header a').attr('tabindex', 7000);
	                $('qv_scroll').removeAttr('tabindex');
	                $('#flyin_tabs a').attr('tabindex', 7100);
	                $('#cart a, #cart div.items_in_cart, #cart div.subtotal, #cart div.label, #cart span, #cart input').attr('tabindex', 7200);
	                $('.cart_summary div.label, .cart_summary div.taxcallout, .cart_summary div.value, [data-btnname="cart_checkout"], [data-btnname="cart_paypal"]').attr('tabindex', 7300);
	                $('#cart_recommendations_spotlight a').attr('tabindex', 7400);
	                $('#cart span, .cart_summary span').parents('span').attr('tabindex', -1);
	                $('#cart input').parents('span').attr('tabindex', -1);
	                $('#cart a, .cart_summary a').parents('span').attr('tabindex', -1);
	                $('#cart a, .cart_summary a').children('span').attr('tabindex', -1);
	                $('#cart a.product_image').attr('tabindex', -1);
	                $('input[value="storepickup"]').attr('tabindex', -1);
	                $('ul.cart #dm_storepickup').append('<a class="screenreader tabAssistFindStore" href="javascript:void(0);" tabindex="7200">Find a store</a>');
	                $('span').each(function () {
	                    var $this = $(this);
	                    if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
	                        $this.attr('tabindex', -1);
	                });
	                $('a[data-btnname="flyin_close"]').on('click', function () {
	                    setTimeout(function () {
	                        $('a[name="skiptomaincontent"]').focus();
	                    }, 250);
	                });
	                $('ul.cart a.tabAssistFindStore').on('click', function () {
	                    $('ul.cart label.lbl_storepickup').click();
	                    var dontRunForeverFSA = 0
	                    checkFSA = setInterval(function () {
	                        dontRunForeverFSA += 1;
	                        if ($('#storepickup .isa-header .heading').length > 0) {
	                            $('.qv_scroll').removeAttr('tabindex');
	                            $('a[data-btnname="isa_cancel"], a[data-btnname="flyin_close"], #storepickup span, #storepickup p, #storepickup img, #storepickup button, #storepickup select, #storepickup input, #modal-container').attr('tabindex', 8000);
	                            setTimeout(function () {
	                                $('input.informational').blur();
	                                $('#modal-container').focus();
	                                $('#storepickup input, #storepickup span').attr('tabindex', 8000);
	                                $('#storepickup span').parents('span').attr('tabindex', -1);
	                                $('#storepickup a').parents('span').attr('tabindex', -1);
	                                $('#storepickup span').parents('p').attr('tabindex', -1);
	                                $('#storepickup a').children('span').attr('tabindex', -1);
	                                $('#storepickup button').children('span').attr('tabindex', -1);
	                                $('#storepickup button').parents('span').attr('tabindex', -1);
	                            }, 1000);

	                            $('[data-btnname="isa_findStores"], [data-btnname="isa_checkSize"]').attr('tabindex', 8001);
	                            $('#three a, #three span, #three p, #three button, .storegridheader label[for="storegrid"]').attr('tabindex', 8500);
	                            $('label[for="storegrid"]').focus();
	                            $('#three span').parents('span').attr('tabindex', -1);
	                            $('#three a').parents('span').attr('tabindex', -1);
	                            $('#three a').children('span').attr('tabindex', -1);
	                            $('form#locationForm').on('submit', function () {
	                                console.log('GO');
	                                setTimeout(function () {
	                                    $('#three a, #three span, #three p, #three button, .storegridheader label[for="storegrid"]').attr('tabindex', 8500);
	                                    $('label[for="storegrid"]').focus();
	                                    $('#three span').parents('span').attr('tabindex', -1);
	                                    $('#three a').parents('span').attr('tabindex', -1);
	                                    $('#three a').children('span').attr('tabindex', -1);
	                                }, 1200);
	                            });

	                            $('a[data-btnname="flyin_close"], a[data-btnname="isa_cancel"]').on('click', function () {
	                                setTimeout(function () {
	                                    $('a[name="skiptomaincontent"]').focus();
	                                }, 250);
	                            });
	                            console.log('market');
	                            clearInterval(checkFSA);
	                        } else if (dontRunForeverFSA === 14) {
	                            console.log('garden');
	                            clearInterval(checkFSA);
	                        }

	                    }, 500);
	                });
	                console.log('robert');
	                clearInterval(checkMiniCart);
	            } else if (dontRunForever === 14) {
	                console.log('richard');
	                clearInterval(checkMiniCart);
	            }

	        }, 500);
	    });

	    $('#cart').find('*').on("change", function () {
	        console.log("TEST");

	        var dontRunForever = 0
	        checkMiniCart = setInterval(function () {
	            dontRunForever += 1;
	            if ($('#cart .cart').length > 0) {
	                $('a[data-btnname="flyin_checkout"]').focus();
	                $('.flyin_header a').attr('tabindex', 7000);
	                $('qv_scroll').removeAttr('tabindex');
	                $('#flyin_tabs a').attr('tabindex', 7100);
	                $('#cart a, #cart div.items_in_cart, #cart div.subtotal, #cart div.label, #cart span, #cart input').attr('tabindex', 7200);
	                $('.cart_summary div.label, .cart_summary div.taxcallout, .cart_summary div.value, [data-btnname="cart_checkout"], [data-btnname="cart_paypal"]').attr('tabindex', 7300);
	                $('#cart_recommendations_spotlight a').attr('tabindex', 7400);
	                $('#cart span, .cart_summary span').parents('span').attr('tabindex', -1);
	                $('#cart input').parents('span').attr('tabindex', -1);
	                $('#cart a, .cart_summary a').parents('span').attr('tabindex', -1);
	                $('#cart a, .cart_summary a').children('span').attr('tabindex', -1);
	                $('#cart a.product_image').attr('tabindex', -1);
	                $('input[value="storepickup"]').attr('tabindex', -1);
	                $('ul.cart #dm_storepickup').append('<a class="screenreader tabAssistFindStore" href="javascript:void(0);" tabindex="7200">Find a store</a>');
	                $('span').each(function () {
	                    var $this = $(this);
	                    if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
	                        $this.attr('tabindex', -1);
	                });
	                $('a[data-btnname="flyin_close"]').on('click', function () {
	                    setTimeout(function () {
	                        $('a[name="skiptomaincontent"]').focus();
	                    }, 250);
	                });
	                $('ul.cart a.tabAssistFindStore').on('click', function () {
	                    $('ul.cart label.lbl_storepickup').click();

	                    var dontRunForeverFSA = 0
	                    checkFSA = setInterval(function () {
	                        dontRunForeverFSA += 1;
	                        if ($('#storepickup .isa-header .heading').length > 0) {
	                            $('.qv_scroll').removeAttr('tabindex');
	                            $('a[data-btnname="isa_cancel"], a[data-btnname="flyin_close"], #storepickup span, #storepickup p, #storepickup img, #storepickup button, #storepickup select, #storepickup input, #modal-container').attr('tabindex', 8000);
	                            setTimeout(function () {
	                                $('input.informational').blur();
	                                $('#modal-container').focus();
	                                $('#storepickup input, #storepickup span').attr('tabindex', 8000);
	                                $('#storepickup span').parents('span').attr('tabindex', -1);
	                                $('#storepickup a').parents('span').attr('tabindex', -1);
	                                $('#storepickup span').parents('p').attr('tabindex', -1);
	                                $('#storepickup a').children('span').attr('tabindex', -1);
	                                $('#storepickup button').children('span').attr('tabindex', -1);
	                                $('#storepickup button').parents('span').attr('tabindex', -1);
	                            }, 1000);

	                            $('[data-btnname="isa_findStores"], [data-btnname="isa_checkSize"]').attr('tabindex', 8001);
	                            $('#three a, #three span, #three p, #three button, .storegridheader label[for="storegrid"]').attr('tabindex', 8500);
	                            $('label[for="storegrid"]').focus();
	                            $('#three span').parents('span').attr('tabindex', -1);
	                            $('#three a').parents('span').attr('tabindex', -1);
	                            $('#three a').children('span').attr('tabindex', -1);
	                            $('form#locationForm').on('submit', function () {
	                                console.log('GO');
	                                setTimeout(function () {
	                                    $('#three a, #three span, #three p, #three button, .storegridheader label[for="storegrid"]').attr('tabindex', 8500);
	                                    $('label[for="storegrid"]').focus();
	                                    $('#three span').parents('span').attr('tabindex', -1);
	                                    $('#three a').parents('span').attr('tabindex', -1);
	                                    $('#three a').children('span').attr('tabindex', -1);
	                                }, 1200);
	                            });

	                            $('a[data-btnname="flyin_close"], a[data-btnname="isa_cancel"]').on('click', function () {
	                                setTimeout(function () {
	                                    $('a[name="skiptomaincontent"]').focus();
	                                }, 250);
	                            });
	                            console.log('market');
	                            clearInterval(checkFSA);
	                        } else if (dontRunForeverFSA === 14) {
	                            console.log('garden');
	                            clearInterval(checkFSA);
	                        }

	                    }, 500);
	                });
	                console.log('robert');
	                clearInterval(checkMiniCart);
	            } else if (dontRunForever === 14) {
	                console.log('richard');
	                clearInterval(checkMiniCart);
	            }

	        }, 500);
	    });
	}

    //ISA
	$('input#deliveryMethod_storepickup').on('change', function () {
	    $('#lbl_storepickup').click();
	    
	    var dontRunForeverISA = 0
	    checkISA = setInterval(function () {
	        dontRunForeverISA += 1;
	        if ($('#storepickup .isa-header .heading').length > 0) {
	            $('.qv_scroll').removeAttr('tabindex');
	            $('a[data-btnname="isa_cancel"], a[data-btnname="flyin_close"], #storepickup span, #storepickup p, #storepickup img, #storepickup button, #storepickup select, #storepickup input, #modal-container').attr('tabindex', 8000);
	            setTimeout(function () {
	                $('input.informational').blur();
	                $('#modal-container').focus();
	                $('#storepickup input, #storepickup span').attr('tabindex', 8000);
	            }, 1000);
	            
	            $('[data-btnname="isa_findStores"], [data-btnname="isa_checkSize"]').attr('tabindex', 8001);
	            $('#three a, #three span, #three p, #three button, .storegridheader label[for="storegrid"]').attr('tabindex', 8500);
	            $('label[for="storegrid"]').focus();
	            $('#three span').parents('span').attr('tabindex', -1);
	            $('#three a').parents('span').attr('tabindex', -1);
	            $('#three a').children('span').attr('tabindex', -1);

	            $('form#locationForm').on('submit', function () {
	                setTimeout(function () {
	                    $('#three a, #three span, #three p, #three button, .storegridheader label[for="storegrid"]').attr('tabindex', 8500);
	                    $('label[for="storegrid"]').focus();
	                    $('#three span').parents('span').attr('tabindex', -1);
	                    $('#three a').parents('span').attr('tabindex', -1);
	                    $('#three a').children('span').attr('tabindex', -1);
	                }, 1200);
	            });

	            $('#storepickup span').parents('span').attr('tabindex', -1);
	            $('#storepickup a').parents('span').attr('tabindex', -1);
	            $('#storepickup span').parents('p').attr('tabindex', -1);
	            $('#storepickup a').children('span').attr('tabindex', -1);
	            $('#storepickup button').children('span').attr('tabindex', -1);

	            $('a[data-btnname="flyin_close"], a[data-btnname="isa_cancel"]').on('click', function () {
	                setTimeout(function () {
	                    $('a[name="skiptomaincontent"]').focus();
	                }, 250);
	            });
	            console.log('loess');
	            clearInterval(checkISA);
	        } else if (dontRunForeverISA === 14) {
	            console.log('lava');
	            clearInterval(checkISA);
	        }

	    }, 500);
	});
	

    //ZOOM
	setTimeout(function () {
	    $('a.screenreader.zoomBtn').remove();
	    $('#open_pushdown').on('click', function () {
	        setTimeout(function () {
	            $('.full_screen_header a.close_btn').attr('tabindex', 548);
	            $('.full_screen_header #zoomIn').attr('tabindex', 547);
	            $('.full_screen_header #zoomOut').attr('tabindex', 546);
	            $('.full_screen_header #zoomOut').focus();
	            $('.full_screen_header .alt_views').attr('tabindex', 549);
	        }, 500);
	    });
	    $('a#open_pushdown').after('<a class="screenreader" id="zoomInBtn" tabindex="1000" href="javascript:void(0);" title="Zoom In">Zoom In</a><a class="screenreader" id="zoomOutBtn" tabindex="1000" href="javascript:void(0);" title="Zoom Out">Zoom Out</a>');
	    var currentZoom = 1;
	    var maxZoom = 4;
	    $('a#zoomInBtn').on('click', function () {
	        if (currentZoom + 1 > maxZoom) {
	            currentZoom = 1;
	        } else {
	            currentZoom++;
	        }

	        var zoomHeight = currentZoom * 500;
	        var zoomWidth = currentZoom * 500;

	        $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').css({
	            'height': zoomHeight,
	            'width': zoomWidth
	        });
	        $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('src', $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('data-zoomsrc') + '?hei=' + zoomHeight + '&wid=' + zoomWidth);

	        $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.loading_img').css({
	            'height': zoomHeight,
	            'width': zoomWidth
	        });

	        if (currentZoom == maxZoom) {
	            $('#product_images .alt_view').attr('data-zoom', 'out');
	            $('a.zoomBtn').attr('title', 'Zoom Out').html('Zoom out');
	            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
	                'top': -(zoomHeight / 4),
	                'left': -(zoomWidth / 4)
	            }, 200);
	        } else if (currentZoom == 1) {
	            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
	                'top': 0,
	                'left': 0
	            }, 200);
	        } else {
	            $('#product_images .alt_view').attr('data-zoom', 'in');
	            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
	                'top': -(zoomHeight / 4),
	                'left': -(zoomWidth / 4)
	            }, 200);
	        }
	    });
	    $('a#zoomOutBtn').on('click', function () {
	        if (currentZoom - 1 > maxZoom) {
	            currentZoom = 1;
	        } else {
	            currentZoom--;
	        }
	        var zoomHeight = currentZoom * 500;
	        var zoomWidth = currentZoom * 500;

	        $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').css({
	            'height': zoomHeight,
	            'width': zoomWidth
	        });
	        $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('src', $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('data-zoomsrc') + '?hei=' + zoomHeight + '&wid=' + zoomWidth);

	        $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.loading_img').css({
	            'height': zoomHeight,
	            'width': zoomWidth
	        });

	        if (currentZoom == maxZoom) {
	            $('#product_images .alt_view').attr('data-zoom', 'out');
	            $('a.zoomBtn').attr('title', 'Zoom Out').html('Zoom out');
	            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
	                'top': -(zoomHeight / 4),
	                'left': -(zoomWidth / 4)
	            }, 200);
	        } else if (currentZoom == 1) {
	            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
	                'top': 0,
	                'left': 0
	            }, 200);
	        } else {
	            $('#product_images .alt_view').attr('data-zoom', 'in');
	            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
	                'top': -(zoomHeight / 4),
	                'left': -(zoomWidth / 4)
	            }, 200);

	        } 
	    });

	}, 1000);

    //GIFT CARDS

	if ($('#promo_container .gc-promo-container').length > 0) {
	    $('.gc-promo-container h1, .gc-promo-container h2, .gc-promo-container p, .gc-promo-container li, .gc-promo-container a').attr('tabindex', 1000);
	}

	if ($('button[data-btnname="giftCard_addToCart"]').length > 0 || $('button[data-btnname="emailGiftCard_addToCart"]').length > 0) {
	    $('table font[face="Arial,Helv"], table input, table a, table button').attr('tabindex', 1000);
	}

    //BRANDS
	$('.mainsite_brands_navigation a').attr('tabindex', 550);

    //HELP
	$('#helpheader a').attr('tabindex', 550);

    //CHECKOUT
	if ($('#checkout_page').length > 0) {
	    
	    $('#checkoutHelpContainer .hint_text .hint_text td').each(function (i, v) {
	        $(v).contents().wrap('<span class="tabAssist" />')
	    });

	    $('#checkoutHelpContainer strong, #checkoutHelpContainer a, #checkoutHelpContainer span.tabAssist').attr('tabindex', 550);
	    $('#checkoutHelpContainer img').parent('span').attr('tabindex', -1);
	    $('#checkoutHelpContainer a').parent('span').attr('tabindex', -1);
	    $('#checkoutHelpContainer span').parent('span').attr('tabindex', -1);

//	    $('#shipMethodPane_edit a[title="Pickup in store instead"]').attr('tabindex', 800);

	}

	//FOOTER
	setTimeout(function(){
		$('.footer-icons-slot a').attr('tabindex', 9000);
	}, 300);
	
	$('p').each(function () {
        var $this = $(this);
        if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
            $this.attr('tabindex', -1);
    });

    $('span').each(function () {
        var $this = $(this);
        if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
            $this.attr('tabindex', -1);
    });
	$('a.info_icon').attr('tabindex', -1);
});

//LOADING ALERT
$('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="notLoadedYet">Loading</div><p class="screenreader" id="notLoaded">Loading</p>');
$('p#notLoaded').attr('role', 'alert').attr('aria-live', 'assertive');
$('div#notLoadedYet').attr('role', 'alert').attr('aria-live', 'assertive');
var fiveSecRule = 0
checkPageLoad = setInterval(function () {
    fiveSecRule += 1;
    if ($('p#loadAssist').length > 0) {
        clearInterval(checkPageLoad);
    } else if (fiveSecRule === 20) {
        clearInterval(checkPageLoad);
    }
}, 1000);
window.onload = function () {
    $('div#notLoadedYet').remove();
    $('p#notLoaded').remove();
    $('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="pageLoaded">Page is loaded</div><p class="screenreader" id="loadAssist">Page is loaded</p>');
    $('p#loadAssist').attr('role', 'alert').attr('aria-live', 'assertive');
    $('div#pageLoaded').attr('role', 'alert').attr('aria-live', 'assertive');
    $('option').removeAttr('tabindex');
    setTimeout(function () {
        $('p#loadAssist').remove();
        $('div#pageLoaded').remove();
        $('input#reduce_input_text_height').focus();
    }, 2000);
};