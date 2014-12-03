/*
 * Smoothproducts
 * http://kthornbloom.com/smoothproducts.php
 *
 * Copyright 2013, Kevin Thornbloom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
    $.fn.extend({
        smoothproducts: function (options) {
            var imgS = 127,
                imgSH = 77,
                imgL = 569,
                imgLH = 320,
                imgStrS = '',
                imgStrL = '';
            if (options != undefined) {
                if (options.sizeSm != undefined && options.sizeSm != "") { imgS = options.sizeSm; }
                if (options.sizeLg != undefined && options.sizeLg != "") { imgL = options.sizeLg; }
            }
            imgStrS = '&w=' + imgS + '&h=' + imgSH;
            imgStrL = '&w=' + imgL + '&h=' + imgLH;
            return this.each(function () {
                // Add some markup & set some CSS
                $('.sp-wrap').append('<div class="sp-large"></div><div class="sp-thumbs sp-tb-active"></div>');
                $('.sp-wrap a').appendTo('.sp-thumbs');
                $('.sp-thumbs a:first').addClass('sp-current').clone().removeClass('sp-current').appendTo('.sp-large').addClass('sp-current-big').children('img').each(function () { $(this).attr('src', $(this).attr('src').replace(imgStrS, imgStrL)) });
                $('.sp-wrap').css('display', 'inline-block');
                var slideTiming = 300,
                maxWidth = $('.sp-large img').width();

                // Prevent clicking while things are happening
                $(document.body).on('click', '.sp-thumbs', function (event) {
                    event.preventDefault();
                });
                if ($('.sp-thumbs a').length > 4) {
                    $carousel = $(".sp-thumbs");
                    $carousel.owlCarousel({
                        items: 4,
                        itemsDesktop: [1024, 4],
                        itemsDesktopSmall: [900, 4],
                        itemsTablet: [600, 4],
                        itemsMobile: [480, 4],
                        autoPlay: false,
                        itemsScaleUp: true,
                        pagination: false,
                        navigation: true
                    });
                }
                // Clicking a thumbnail
                $(document.body).on('click', '.sp-tb-active a', function (event) {
                    $('.sp-current').removeClass('sp-current');
                    $('.sp-thumbs').removeClass('sp-tb-active');
                    $('.sp-zoom').remove();

                    var currentHeight = $('.sp-large').height(),
                    currentWidth = $('.sp-large').width();
                    $('.sp-large').css({
                        overflow: 'hidden',
                        height: currentHeight + 'px',
                        width: currentWidth + 'px'
                    });

                    $('.sp-large a').remove();
                    // 1. Add current to tb 2. clone it, hide it, append it to large, add class, fade in.
                    if ($(this).hasClass('pdp-vid-thumb')) {
                        var autoHeight = $('.sp-large').height();
                        $(this).addClass('sp-current');
                        var vidFrame = '<iframe id="pdp-vid" width="569" height="320" src="' + $(this).attr('rel') + '?rel=0&autoplay=1" frameborder="0" allowfullscreen="true"></iframe>';
                        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        if (parseInt(w) < 641) {
                            vidFrame = '<iframe id="pdp-vid" width="314" height="180" src="' + $(this).attr('rel') + '?rel=0&autoplay=1" frameborder="0" allowfullscreen="true"></iframe>';
                        }
                        if (parseInt(w) > 641 && parseInt(w) < 960) {
                            vidFrame = '<iframe id="pdp-vid" width="720" height="405" src="' + $(this).attr('rel') + '?rel=0&autoplay=1" frameborder="0" allowfullscreen="true"></iframe>';
                        }
                        if (parseInt(w) > 960 && parseInt(w) < 1025) {
                            vidFrame = '<iframe id="pdp-vid" width="100%" height="320" src="' + $(this).attr('rel') + '?rel=0&autoplay=1" frameborder="0" allowfullscreen="true"></iframe>';
                        }
                        $('.sp-large').html(vidFrame);
                        $('#pdp-vid').addClass('sp-current-big').fadeIn(slideTiming, function () {
                            //var autoHeight = $('.sp-large img').height();
                            $('.sp-large').animate({
                                height: autoHeight
                            }, 'fast', function () {
                                $('.sp-large').css({
                                    height: 'auto',
                                    width: 'auto'
                                });
                            });
                            $('.sp-thumbs').addClass('sp-tb-active');
                        }).children('img').each(function () { $(this).attr('src', $(this).attr('src').replace(imgStrS, imgStrL)) });
                    } else {
                        //$(this).addClass('sp-current').clone().hide().removeClass('sp-current').appendTo('.sp-large').addClass('sp-current-big').fadeIn(slideTiming, function () {
                        $(this).addClass('sp-current').clone().removeClass('sp-current').appendTo('.sp-large').addClass('sp-current-big').fadeIn(slideTiming, function () {
                            var autoHeight = $('.sp-large').height();
                            if ($('#pdp-vid').length > -1) {
                                autoHeight = $('#pdp-vid').height();
                                $('#pdp-vid').remove();
                            }
                            $('.sp-large').animate({
                                height: autoHeight
                            }, 'fast', function () {
                                $('.sp-large').css({
                                    height: 'auto',
                                    width: 'auto'
                                });
                            });
                            $('.sp-thumbs').addClass('sp-tb-active');
                        }).children('img').each(function () { $(this).attr('src', $(this).attr('src').replace(imgStrS, imgStrL)) });
                    }
                    event.preventDefault();
                });

                // Zoom In
                $(document.body).on('click', '.sp-large a', function (event) {
                    if ($(this).hasClass('pdp-vid-thumb')) {
                        var autoHeight = $('.sp-large').height();
                        $(this).addClass('sp-current');
                        var vidFrame = '<iframe id="pdp-vid" width="569" height="320" src="' + $(this).attr('rel') + '?rel=0&autoplay=1" frameborder="0" allowfullscreen="true"></iframe>';
                        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        if (parseInt(w) < 641) {
                            vidFrame = '<iframe id="pdp-vid" width="314" height="180" src="' + $(this).attr('rel') + '?rel=0&autoplay=1" frameborder="0" allowfullscreen="true"></iframe>';
                        }
                        if (parseInt(w) > 641 && parseInt(w) < 960) {
                            vidFrame = '<iframe id="pdp-vid" width="720" height="405" src="' + $(this).attr('rel') + '?rel=0&autoplay=1" frameborder="0" allowfullscreen="true"></iframe>';
                        }
                        if (parseInt(w) > 960 && parseInt(w) < 1025) {
                            vidFrame = '<iframe id="pdp-vid" width="100%" height="320" src="' + $(this).attr('rel') + '?rel=0&autoplay=1" frameborder="0" allowfullscreen="true"></iframe>';
                        }
                        $('.sp-large').html(vidFrame);
                        $('#pdp-vid').addClass('sp-current-big').fadeIn(slideTiming, function () {
                            //var autoHeight = $('.sp-large img').height();
                            $('.sp-large').animate({
                                height: autoHeight
                            }, 'fast', function () {
                                $('.sp-large').css({
                                    height: 'auto',
                                    width: 'auto'
                                });
                            });
                            $('.sp-thumbs').addClass('sp-tb-active');
                        }).children('img').each(function () { $(this).attr('src', $(this).attr('src').replace(imgStrS, imgStrL)) });
                    } else {
                        var largeUrl = $(this).attr('href');
                        $('.sp-large').append('<div class="sp-zoom"><img src="' + largeUrl + '"/></div>');
                        $('.sp-zoom').fadeIn();
                        $('.sp-large').css({
                            left: 0,
                            top: 0
                        });
                        $(".sp-zoom").draggable();
                    }
                    event.preventDefault();
                });

                // Panning zoomed PC

                $('.sp-large').mousemove(function (e) {
                    var viewWidth = $('.sp-large').width();
                    var viewHeight = $('.sp-large').height();
                    var largeWidth = $('.sp-zoom').width();
                    var largeHeight = $('.sp-zoom').height();
                    var parentOffset = $(this).parent().offset();
                    var relativeXPosition = (e.pageX - parentOffset.left);
                    var relativeYPosition = (e.pageY - parentOffset.top);
                    var moveX = Math.floor((relativeXPosition * (viewWidth - largeWidth) / viewWidth));
                    var moveY = Math.floor((relativeYPosition * (viewHeight - largeHeight) / viewHeight));

                    $('.sp-zoom').css({
                        left: moveX,
                        top: moveY
                    });

                }).mouseout(function () {
                    //
                });

                // Panning zoomed Mobile - inspired by http://popdevelop.com/2010/08/touching-the-web/

                $.fn.draggable = function () {
                    var offset = null;
                    var start = function (e) {
                        var orig = e.originalEvent;
                        var pos = $(this).position();
                        offset = {
                            x: orig.changedTouches[0].pageX - pos.left,
                            y: orig.changedTouches[0].pageY - pos.top
                        };
                    };
                    var moveMe = function (e) {
                        e.preventDefault();
                        var orig = e.originalEvent,
                    newY = orig.changedTouches[0].pageY - offset.y,
                    newX = orig.changedTouches[0].pageX - offset.x,
                    maxY = (($('.sp-zoom').height()) - ($('.sp-large').height())) * -1,
                    maxX = (($('.sp-zoom').width()) - ($('.sp-large').width())) * -1;
                        if (newY > maxY && 0 > newY) {
                            $(this).css({
                                top: newY
                            });
                        }
                        if (newX > maxX && 0 > newX) {
                            $(this).css({
                                left: newX
                            });
                        }
                    };
                    this.bind("touchstart", start);
                    this.bind("touchmove", moveMe);
                };

                // Zoom Out
                $(document.body).on('click', '.sp-zoom', function (event) {
                    $(this).fadeOut(function () {
                        $(this).remove();
                    });
                });
            });

        }
    });
})(jQuery);