"use strict";

// adds .naturalWidth() and .naturalHeight() methods to jQuery
// for retreaving a normalized naturalWidth and naturalHeight.
(function($jq) {
    var props = ['Width', 'Height'],
        prop;

    while (prop = props.pop()) {
        (function(natural, prop) {
            $jq.fn[natural] = (natural in new Image()) ?
                function() {
                    return this[0][natural];
            } :
                function() {
                    var
                    node = this[0],
                        img,
                        value;

                    if (node.tagName.toLowerCase() === 'img') {
                        img = new Image();
                        img.src = node.src,
                        value = img[prop];
                    }
                    return value;
            };
        }('natural' + prop, prop.toLowerCase()));
    }
}(jQuery));

$jq(document).ready(function() {
    var $ = $jq
    
    var executing_slide = false;

        function insertCSS(rule) {
            var style;
            style = "<style class='customcss' type='text/css'>" + rule + "</style>";
            return $('head').append($(style));
        };

    // bind select size change
    var updateSelectSize = function(select) {
        // chose the text to evaluate
        //var text = $(select).find('[value="' + $(select).val() + '"]').text()
        //if (text === '')
        //    text = $jq(select).find('option').eq(0).text()
        //$(select).parent().parent().append("<div class='frg13_taglia_selector' id='ghostSelect'><select><option>" + text + "</option></select></div>");
        // il 27 � aggiunto per la freccia
        //var width = $('#ghostSelect').find('select').outerWidth() + 20;
        //$(select).attr({
        //    'style': 'width: ' + width + 'px !important'
        //})
        // resize the ieWrapper
        //if ($(select).parent().hasClass('ieWrap')) {
        //    $(select).parent().attr({
        //        'style': 'width: ' + width + 'px !important'
        //    })
        //    // increment the size of the slide to hide the arrows on ie
        //    width = width + 30
        //    $(select).attr({
        //        'style': 'width: ' + width + 'px !important; background-position: ' + (width - 60) + 'px 50%'
        //    })
        //}
        //$('#ghostSelect').remove();
    };
    // bind select change
    //$('.frg13_pseudo_select').on(
    //  'change',
    //  function(){
    //    updateSelectSize($(this).find('select'));
    //  }
    //)
    // add structure to properly style select on ie 8 and 9
    // if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
    //     if (Number(RegExp.$1) <= 9) {
    //         $('.frg13_pseudo_select').each(
    //             function() {
    //                 $(this).find('select').wrap("<div class='ieWrap'></div>")
    //             }
    //         )
    //     }
    // }
    // evaluate initial size for all the select
    window.updateSelectsSize = function() {
        //$('.frg13_pseudo_select').each(
        //    function() {
        //        updateSelectSize($(this).find('select'));
        //    }
        //)
    }
    //setTimeout(window.updateSelectsSize, 250)

    //$(window).on("orientationchange", function(event) {
    //    $('.frg13_pseudo_select').each(
    //        function() {
    //            updateSelectSize($(this).find('select'));
    //        }
    //    )
    //});

    function slider_image() {

        function evaluateZoomPosition() {
            var img_left = $jq('.frg13_image_zoom img').width() / 2;
            var img_top = $jq('.frg13_image_zoom img').height() / 2;
            $jq('.frg13_image_zoom img').css('margin-left', '-' + img_left + 'px');
            $jq('.frg13_image_zoom img').css('margin-top', '-' + img_top + 'px');
        }

        function enableZoom(e) {
            //FRGMWCS-812 Scheda prodotto: viene scaricata la 00 zoom anche se non richiesta         
            if ($jq(".frg13_image_zoom img").attr("src") == "") {
                $jq(".frg13_image_zoom img").attr("src", $jq(".frg13_image_zoom img").attr("rel"));
            }
            //FRGMWCS-812 Scheda prodotto: viene scaricata la 00 zoom anche se non richiesta  
            $jq(this).css('visibility', 'hidden');
            $jq('.frg13_image_zoom').css('display', 'block');
            $jq('.frg13_slider_button').css('display', 'none')
        }

        function disableZoom(e) {
            $jq('.frg13_image_base').css('visibility', 'visible');
            $jq('.frg13_image_zoom').css('display', 'none');
            //$jq(this).css('display', 'none');
            $jq(this).find('img').css({
                'left': '50%',
                'top': '50%'
            });
            $jq('.frg13_slider_button').css('display', 'block')
        }

        function changeImage(src, big) {
            var width = $jq('.frg13_image_base').width();
            var $new_img = $jq('<img class="frg13_temp_image" style="width:' + width + 'px" src="' + src + '"/>');
            $jq('.frg13_active_image').prepend($new_img);
            var w = $jq('.frg13_active_image > img').width();
            $jq('.frg13_active_image > img').css('margin-left', '-' + w / 2 + 'px');
            $new_img.fadeIn(function() {
                $jq('.frg13_image_base').remove();
                $jq('.frg13_temp_image').addClass('frg13_image_base').removeClass('frg13_temp_image').css("width", "auto");
                if ($jq(window).width() > 768) {
                    $jq('.frg13_image_base').click(enableZoom);
                }
                // FRGMWCS-812 Scheda prodotto: viene scaricata la 00 zoom anche se non richiesta 
                $jq('.frg13_image_zoom img').attr('src', '');
                $jq('.frg13_image_zoom img').attr('rel', big);
                // FRGMWCS-812 Scheda prodotto: viene scaricata la 00 zoom anche se non richiesta
            });
        }

        // Make zoom area draggable, based on jquery-ui
        $jq(".frg13_image_zoom img").draggable();

        // thumbnail click handler
        $jq('.frg13_slider_selector li').click(function(e) {
            disableZoom();
            var $li = $jq(e.currentTarget);
            var src = $li.find('img').attr('src');
            var big = $li.find('img').attr('data-url');
            changeImage(src, big);
        })

        // arrows big handler

        function image_arrows_handler(e) {

            $jq('.frg13_slider_button').off('click');
            setTimeout(function() {
                $jq('.frg13_slider_button').on('click', image_arrows_handler);
            }, 550);

            var li = $jq('.frg13_slider_selector li');
            var n = li.length;
            if (n == 1) {
                $jq('.frg13_slider_button').css('display', 'none');
                return;
            }
            var new_item = 0;
            var current = $jq('.frg13_image_base').attr('src');
            var ok = false;
            var i = 0;
            do {
                if (current == $jq(li[i]).find('img').attr('src')) {
                    ok = true;
                }
                i++;
            } while (!ok)
            i--;
            if ($jq(e.currentTarget).hasClass('frg13_slider_next')) {
                // NEXT
                if (i == n - 1) {
                    new_item = 0;
                } else {
                    new_item = i + 1;
                }
            } else {
                // PREVIOUS
                if (i == 1) {
                    new_item = 0;
                } else if (i > 1) {
                    new_item = i - 1; //  *********   FRGMWCS-814 Scheda prodotto: errore che blocca il browser su loop immagini 
                } else {
                    new_item = n - 1; //  *********   FRGMWCS-814 Scheda prodotto: errore che blocca il browser su loop immagini 
                }
            }
            var src = $jq(li[new_item]).find('img').attr('src');
            var big = $jq(li[new_item]).find('img').attr('data-url');
            changeImage(src, big);
        }

        $jq('.frg13_slider_button').on('click', image_arrows_handler);


        // La funzionalit� di zoom � impostata solo sul desktop
        if ($jq(window).width() > 768) {
            $jq('.frg13_image_zoom').click(disableZoom);
            $jq('.frg13_image_base').click(enableZoom);
        }

    } // slider_image

    function slider_thumbnail() {
        var ratio = 1.1111111;
        var thumbnail_container_w = $jq('.frg13_slider_selector').width(); // la larghezza del container � automatica
        var thumb_w = thumbnail_container_w / 3; // larghezza di ogni thumb
        var thumbnail_container_h = thumb_w / ratio; // altezza del container
        $jq('.frg13_slider_selector').css('height', thumbnail_container_h);
        $jq('.frg13_slider_selector li').css('width', thumb_w);
        var ul_w = $jq('.frg13_slider_selector li').length * thumb_w; // larghezza complessiva di tutti i thumb
        $jq('.frg13_slider_selector ul').css('width', ul_w);
        window.slider_thumb_w = thumb_w; // la larghezza del thumb serve globalmente
        var extraThumbs = $jq('.frg13_slider_selector ul li').size() - 3;
        $jq('.frg13_slider_selector').attr('data-index-left', 0);
        $jq('.frg13_slider_selector').attr('data-index-right', extraThumbs);
        // Se ci sono meno di 4 thumb lo slider non serve
        if ($jq('.frg13_slider_selector li').length < 4) return;
        $jq('.frg13_slider_next_thumb').css('display', 'block');

        $jq('.frg13_slider_selector').on('click', '.frg13_slider_next_thumb', function(ev) {
            ev.preventDefault();
            if (!executing_slide) {
				executing_slide = true;	
	            var tempMargin = parseInt($jq('.frg13_slider_selector ul').css('marginLeft').replace('px', '')) - window.slider_thumb_w;
	            $jq('.frg13_slider_selector ul').css('marginLeft', tempMargin);
	            var left = parseInt($jq('.frg13_slider_selector').attr('data-index-left'));
	            left++;
	            var right = parseInt($jq('.frg13_slider_selector').attr('data-index-right'));
	            right--;
	            $jq('.frg13_slider_selector').attr('data-index-left', left);
	            $jq('.frg13_slider_selector').attr('data-index-right', right);
	            if (right == 0) {
	                $jq('.frg13_slider_next_thumb').css('display', 'none');
	            }
	            $jq('.frg13_slider_previous_thumb').css('display', 'block');
	            
	            setTimeout(function () {
				  executing_slide = false;
				}, 200);
			}
        });

        $jq('.frg13_slider_selector').on('click', '.frg13_slider_previous_thumb', function(ev) {
            ev.preventDefault();
            if (!executing_slide) {
				executing_slide = true;	
	            var tempMargin = parseInt($jq('.frg13_slider_selector ul').css('marginLeft').replace('px', '')) + window.slider_thumb_w;
	            $jq('.frg13_slider_selector ul').css('marginLeft', tempMargin);
	            var left = parseInt($jq('.frg13_slider_selector').attr('data-index-left'));
	            left--;
	            var right = parseInt($jq('.frg13_slider_selector').attr('data-index-right'));
	            right++;
	            $jq('.frg13_slider_selector').attr('data-index-left', left);
	            $jq('.frg13_slider_selector').attr('data-index-right', right);
	            if (left == 0) {
	                $jq('.frg13_slider_previous_thumb').css('display', 'none');
	            }
	            $jq('.frg13_slider_next_thumb').css('display', 'block');
	            setTimeout(function () {
				  executing_slide = false;
				}, 200);
			}
        });

    } // function slider thumbnail

    function slider_color() {
        var colorSelectorSize, colorsW;

        colorSelectorSize = 400;

        if ($jq('body').width() < 1024) {
            colorSelectorSize = 300;
            $jq('.frg13_color_selector .frg13_inner_color_selector').css('width', '300px');
            $jq('.frg13_inner_color_selector').css('width', '300px');
            $jq('.frg13_color_selector').css('width', '300px');
        }

        colorsW = $jq('.frg13_inner_color_selector ul li').size() * 100;

        // Se ci sono meno di 5 colori lo slider non serve
        if (colorsW < 401) {
            $jq('.frg13_inner_color_selector').css('width', colorsW + 'px');
            $jq('.frg13_color_selector').css('width', colorsW + 'px');
            $jq('.frg13_next_color').css('display', 'none');
            return;
        }

        $jq('.frg13_inner_color_selector ul').css('width', colorsW + 'px');

        if (colorsW > colorSelectorSize) {
            $jq('.frg13_next_color').css('display', 'block');
        }

        function next_color(ev) {
            var extraColors, leftColors, tempMargin;
            ev.preventDefault();
            // Timeout
            $jq('.frg13_color_selector .frg13_next_color').off('click');
            setTimeout(function() {
                $jq('.frg13_color_selector .frg13_next_color').on('click', next_color);
            }, 350);
            tempMargin = parseInt($jq('.frg13_inner_color_selector ul').css('marginLeft').replace('px', '')) - 100;
            $jq('.frg13_inner_color_selector ul').css('marginLeft', tempMargin);
            extraColors = Math.abs($jq('.frg13_inner_color_selector ul li').size() * 100 - colorSelectorSize) / 100;
            leftColors = Math.abs(tempMargin / 100);
            if (extraColors === leftColors) {
                $jq('.frg13_next_color').css('display', 'none');
            }
            return $jq('.frg13_previous_color').css('display', 'block');
        }

        function previous_color(ev) {
            var extraColors, leftColors, rightColors, tempMargin;
            ev.preventDefault();
            // Timeout
            $jq('.frg13_color_selector .frg13_previous_color').off('click');
            setTimeout(function() {
                $jq('.frg13_color_selector .frg13_previous_color').on('click', previous_color);
            }, 350);
            tempMargin = parseInt($jq('.frg13_inner_color_selector ul').css('marginLeft').replace('px', '')) + 100;
            $jq('.frg13_inner_color_selector ul').css('marginLeft', tempMargin);
            extraColors = Math.abs($jq('.frg13_inner_color_selector ul li').size() * 100 - colorSelectorSize) / 100;
            leftColors = Math.abs(tempMargin / 100);
            rightColors = extraColors - leftColors;
            if (extraColors === rightColors) {
                $jq('.frg13_previous_color').css('display', 'none');
            }
            return $jq('.frg13_next_color').css('display', 'block');
        }

        $jq('.frg13_color_selector .frg13_next_color').on('click', next_color);
        $jq('.frg13_color_selector .frg13_previous_color').on('click', previous_color);

    } // function slider color

    function area_selettori() {
        $jq('.frg13_pseudo_select li').click(function(e) {
            var $li = $jq(e.currentTarget);
            $jq('#frg13_tabs_desktop').css('margin-top', '70px');
            $jq('#frg13_tabs_desktop_profumi_1').css('margin-top', '70px');
            $jq('#frg13_tabs_desktop_profumi_2').css('margin-top', '70px');
            var value = $li.html();
            $li.parent().parent().find('p').html(value);
            $li.parent().parent().find('option').removeAttr("selected");
            $li.parent().parent().find('option').filter(function(index) {
                return value === $jq(this).text();
            }).attr("selected", "selected");
        });


        // Selettore taglie, calzate, fragranza mobile
        $jq('#frg13_tabs-2_mobile_2 li').click(function(e) {
            var $li = $jq(e.currentTarget);

            var value = $li.html();
            $jq($li.parent().parent().parent().parent().find('> ul li a')[1]).html(value);
            $jq($li.parent().parent().parent().parent().find('> ul li a')[1]).addClass('frg13_after_select')
            $li.parent().parent().find('option').removeAttr("selected");
            $li.parent().parent().find('option').filter(function(index) {
                return value === $jq(this).text();
            }).attr("selected", "selected");
        });

        $jq('#frg13_tabs-3_mobile_2 li').click(function(e) {
            var $li = $jq(e.currentTarget);

            var value = $li.html();
            $jq($li.parent().parent().parent().parent().find('> ul li a')[2]).html(value);
            $jq($li.parent().parent().parent().parent().find('> ul li a')[2]).addClass('frg13_after_select')
            $li.parent().parent().find('option').removeAttr("selected");
            $li.parent().parent().find('option').filter(function(index) {
                return value === $jq(this).text();
            }).attr("selected", "selected");
        });

        $jq('#frg13_tabs-1_mobile_4 li').click(function(e) {
            var $li = $jq(e.currentTarget);

            var value = $li.html();
            $jq($li.parent().parent().parent().parent().find('> ul li a')[0]).html(value);
            $jq($li.parent().parent().parent().parent().find('> ul li a')[0]).addClass('frg13_after_select')
            $li.parent().parent().find('option').removeAttr("selected");
            $li.parent().parent().find('option').filter(function(index) {
                return value === $jq(this).text();
            }).attr("selected", "selected");
        });
    }

    function evaluateHeight() {
        var ratio = 1.1111111;
        var w = $jq('.frg13_active_image > img').width();
        var h = w / ratio;
        var ml = w / 2;
        $jq('.frg13_image_area').css('height', h + "px");
        $jq('.frg13_active_image > img').css('margin-left', '-' + ml + 'px');
        var zw = $jq('.frg13_image_area').width() - 60;
        var zh = $jq('.frg13_image_area').height();
        $jq('.frg13_image_zoom').css('width', zw + "px");
        $jq('.frg13_image_zoom').css('height', zh + "px");

        // slider thumb immagini
        var thumbnail_container_w = $jq('.frg13_slider_selector').width();
        var thumb_w = thumbnail_container_w / 3;
        var thumbnail_container_h = thumb_w / ratio;
        $jq('.frg13_slider_selector').css('height', thumbnail_container_h);
        $jq('.frg13_slider_selector li').css('width', thumb_w);
        var ul_w = $jq('.frg13_slider_selector li').length * thumb_w;
        var margin_left = parseInt($jq('.frg13_slider_selector').attr('data-index-left')) * thumb_w * -1;
        $jq('.frg13_slider_selector ul').css('width', ul_w + 'px');
        $jq('.frg13_slider_selector ul').css('margin-left', margin_left + 'px');
        //aggiornare la variabile globale dello step
        window.slider_thumb_w = thumb_w;


    }

    // Tabs della pagina prodotti
    $jq("#frg13_tabs_desktop_profumi_1, #frg13_tabs_desktop_profumi_2, #frg13_tabs_desktop, #frg13_tabs_mobile_1, #frg13_tabs_mobile_2, #frg13_tabs_mobile_3, #frg13_tabs_mobile_4, #frg13_tabs_mobile_5, #frg13_tabs_mobile_6, #frg13_tabs_mobile_7, #frg13_tabs_mobile_8").tabs({
        collapsible: true,
        active: false
    });

    slider_image();
    // slider_color();
    // area_selettori();
    slider_thumbnail();



    // Calcola l'altezza delle pseudo_select
    // $jq('.frg13_pseudo_select').each(function () {
    //   var $this = $jq(this);
    //   var height = 0
    //    $jq(this).find('ul').addClass('frg13_close');
    //   $jq(this).find('ul li').each(function(i, e) {
    //     height+= $jq(e).outerHeight();
    //   });
    //   $jq(this).find('ul').css('height',height+'px');
    // });

    // $jq('.frg13_pseudo_select a').click(function(e) {
    //   e.preventDefault();
    //   $jq(e.currentTarget).parent().find('ul').toggleClass('frg13_close');
    //   $jq(e.currentTarget).toggleClass('frg13_label_open');
    // });

    // $jq('.frg13_pseudo_select li').click(function(e) {
    //   e.preventDefault();
    //   $jq(e.currentTarget).parent().addClass('frg13_close');
    //   $jq(e.currentTarget).parent().parent().find('a').removeClass('frg13_label_open');
    // });

    // $jq('.frg13_pseudo_select ul').on('mouseleave', function(e) {
    //   e.preventDefault();
    //   $jq(e.currentTarget).addClass('frg13_close');
    //   $jq(e.currentTarget).parent().find('a').removeClass('frg13_label_open');
    // });

    imagesLoaded('.frg13_active_image > img', evaluateHeight);
    $jq(window).on('resize', evaluateHeight);

    $jq('.cs-rec').last().css('margin-right', '0');

    $jq('.frg_second_lev_menu').last().find('li')

    $jq('.frg_second_lev_menu').last().children().on('hover', function() {

        if ($jq(window).width() < 1281) {
            var $curr = $jq(this).find('>ul');
			
			if ($curr.css('padding-left')) {
				var W = (($curr.width() + $curr.css('padding-left').replace('px', '') * 2) + 20) * -1;
				$curr.css({
					'left': (W) + 'px',
					'margin-left': '0'
				});
			
			}
			
            
        }
    });


    if ($jq(window).width() < 769) {
        $jq('.frg13_sharing_tools ul').css('display', 'none');
        $jq('.frg13_sharing_tools').click(function(e) {
            $jq(e.currentTarget).find('ul').css('display', 'inline-block');
        });
    }

    $jq(".frg13_nav_button").click(function() {
        $jq(".frg13_primary_nav").toggleClass("open");
    });

    $jq("ul.lvl1 a").click(function() {
        $jq(this).toggleClass("highlighted");
        $jq(this).siblings().toggle();
    });

    if ($jq(window).width() < 769) {
        $jq(".frg_span_2 h4").click(function() {
            $jq(this).toggleClass("highlighted");
            $jq(this).next().toggle();
        });
    }

    if ($jq(window).width() < 769) {
        $jq(".frg13_mobile_search_button").click(function() {
            $jq(".frg13_mobile_search").toggle();
        });
    }

    function getURLParameter(name) {
        var result = decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
        );
        return (result != "null" ? result : null);
    }

    function getParmFromHash(name) {
        var result = RegExp(name + '=' + '(.+?)(&|$)').exec(window.location.hash.substr(1));
        if (result != null) {
            return result[1];
        }
        return null;
        //var result = RegExp(name + '=' + '(.+?)(&|$)').exec(window.location.hash.substr(1))[1];
        //return (result != "null" ? result : null);
    }

    // Calcola l'altezza della viewport di flexslider in base alle dimensioni della finestra
    var h_v = $jq(window).height() - $jq('header').height();
    $jq('.customcss').remove();

    if ($jq(window).width() < 768) {
        insertCSS('.flex-viewport {height: ' + 500 + 'px!important;}');
        insertCSS('.frg13_runway_flexslider .slides {height: ' + 500 + 'px!important;}');
        insertCSS('.frg13_runway_flexslider .slides img {height: ' + (500 - 55) + 'px}');
    } else {
        insertCSS('.flex-viewport {height: ' + h_v + 'px!important;}');
        insertCSS('.frg13_runway_flexslider .slides {height: ' + h_v + 'px!important;}');
        insertCSS('.frg13_runway_flexslider .slides img {height: ' + (h_v - 55) + 'px}');
    }

    checkSlideSize();



    $jq(window).resize(function() {
        if ($jq(window).width() < 768) return;
        var h_v = $jq(window).height() - $jq('header').height();
        $jq('.customcss').remove();
        insertCSS('.flex-viewport {height: ' + h_v + 'px!important;}');
        insertCSS('.frg13_runway_flexslider .slides {height: ' + h_v + 'px!important;}');
        insertCSS('.frg13_runway_flexslider .slides img {height: ' + (h_v - 55) + 'px}');
        checkSlideSize();
    });


    var start_slide = getURLParameter('indexImg');
    if (start_slide == null) {
        start_slide = getParmFromHash('indexImg');
    }

    if (start_slide != null) {
        $jq('.frg13_runway_flexslider').flexslider({
            slideshow: false,
            animation: "fade",
            animationLoop: false,
            itemWidth: "100%",
            itemMargin: 0,
            touch: true,
            minItems: 1,
            controlNav: false,
            startAt: start_slide,
            start: checkSlideSize,
            after: checkSlideSize,
            before: hideDida
        });
    } else {
        $jq('.frg13_runway_flexslider').flexslider({
            slideshow: false,
            animation: "fade",
            animationLoop: false,
            itemWidth: "100%",
            itemMargin: 0,
            touch: true,
            minItems: 1,
            controlNav: false,
            start: checkSlideSize,
            after: checkSlideSize,
            before: hideDida
        });
    }

    function initSliderDida() {
        if ($jq('.flex-active-slide img').size() == 0) return;
        var h = $jq('header').height() + 61;
        var $slider = $jq('.frg13_runway_flexslider');
        $slider.find('.flex-dida').each(function() {
            var $el = $jq(this);
            if ($el.find('p').text() == '') $el.addClass('neverDisplay');
            $el.css('top', h + 'px');
            var $btn = $el.find('> button');
            $btn.css('top', h + 'px');
            $btn.on('click', function(ev) {
                $slider.toggleClass('show-dida');
            });
        });
    }

    initSliderDida();

    function hideDida() {
        $jq('.flex-active-slide .flex-dida').hide();
    }

    function checkSlideSize() {

        if ($jq(window).width() < 768) {
            $jq('.flex-active-slide img').css('visibility', 'visible');
            $jq('.flex-active-slide .flex-dida').show();
            return;
        }
        if ($jq('.flex-active-slide img').size() == 0) return;
        $jq('.flex-active-slide img').css('visibility', 'hidden');
        var img_w = $jq('.flex-active-slide img').naturalWidth();
        var img_h = $jq('.flex-active-slide img').naturalHeight();
        var window_w = $jq(window).width();
        var h = $jq(window).height() - $jq('header').height() - 55;
        $jq('.flex-active-slide img').css('height', h + 'px');
        $jq('.flex-active-slide img').css('width', 'auto');

        // Se l'immagine sborda...
        var isiPad = navigator.userAgent.match(/iPad/i);
        
        if ($jq('.flex-active-slide img').width() > window_w) {
        	if (!isiPad) {
        		$jq('.flex-active-slide img').css('width', '100%');
        		$jq('.flex-active-slide img').css('height', 'auto');
        	}	
        }
        $jq('.flex-active-slide img').css('visibility', 'visible');

        setTimeout(function() {
            $jq('.flex-active-slide .flex-dida').show();
        }, 100);

    }

});