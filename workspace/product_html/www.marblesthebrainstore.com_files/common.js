"user strict"
jQuery.fn.exists = function () { return this.length > 0; }
function formatCurrency(strValue) {
    strValue = strValue.toString().replace(/\$|\,/g, '');
    dblValue = parseFloat(strValue);
    blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
    dblValue = Math.floor(dblValue * 100 + 0.50000000001);
    intCents = dblValue % 100;
    strCents = intCents.toString();
    dblValue = Math.floor(dblValue / 100).toString();
    if (intCents < 10)
        strCents = "0" + strCents;
    for (var i = 0; i < Math.floor((dblValue.length - (1 + i)) / 3); i++)
        dblValue = dblValue.substring(0, dblValue.length - (4 * i + 3)) + ',' +
        dblValue.substring(dblValue.length - (4 * i + 3));
    return (((blnSign) ? '' : '-') + '$' + dblValue + '.' + strCents);
}
function getModalSize(rel) {
    var sizeAry = rel.replace(/(bloobox{|})/g, '').split(','),
        returnAry = ['', ''];
    for (var a = 0; a < sizeAry.length; a++) {
        var vals = sizeAry[a].split(":");
        switch (vals[0]) {
            case "height":
                returnAry[1] = vals[1];
                break;
            case "width":
                returnAry[0] = vals[1];
                break;
            default:
                /* do nothing */
        }
    }
    return returnAry;
}

var nav = [];
var t1, t2;

jQuery(document).ready(function () {
    if ($("#showcartpop").length > 0) {
        if ($('#ajax-cart').html() == "") { cartShow(""); }
    }

    /*if logged out remove logout=1 from url*/
    if (window.location.href.indexOf("logout=1") > -1) {
        window.location.href = window.location.href.replace("logout=1", "");
    }

    /*avoid resizing issues by reloading page on window resize*/
    if ($("html").hasClass("no-touch")) {
        $(window).resize(function () {
            if (location.pathname.toLowerCase().indexOf("checkout") == -1) {
                $("body").html('');
                window.location.href = window.location.href;
            }
        });
    }
    $(window).resize(function () {
        if ($(window).width() < 960) {
            $(".sticky").removeClass("sticky");
        }
    });
    /*iOS do not zoom in when focusing on inputs*/
    jQuery("body").on('focus', ' input[type="text"], input[type="email"],input[type="password"],textarea,select', function () {
        jQuery("meta[name=viewport]").attr('content', 'width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=1;');
    }).on('blur', ' input[type="text"], input[type="email"],input[type="password"],textarea,select', function () {
        jQuery("meta[name=viewport]").attr('content', 'width=device-width; initial-scale=1.0; maximum-scale=2.0; user-scalable=1;');
    });

    /*header store locator*/
    if ($("#neareststore").length > 0) {
        jQuery.post("/ajax-locator.htm", {}, function (data) {
            $("#neareststore").replaceWith(data);
        });
    }

    /*home carousel*/
    if ($("#hm-carousel").length > 0) {
        $carousel = $("#hm-carousel");
        /*on small screens update with smaller images*/
        if ($(window).width() < 460) {
            $carousel.find(".hm-bnr").each(function () {
                $(this).css("background-image", $(this).css("background-image").replace(".jpg", "_small.jpg").replace(".png", "_small.png").replace(".gif", "_small.gif"));
            });
        } else if ($(window).width() < 960) {
            $carousel.find(".hm-bnr").each(function () {
                $(this).css("background-image", $(this).css("background-image").replace(".jpg", "_medium.jpg").replace(".png", "_medium.png").replace(".gif", "_medium.gif"));
            });
        }

        $carousel.owlCarousel({
            singleItem: true,
            lazyLoad: true,
            navigation: true,
            startDragging: function () {
                update_image_tiles();
                update_tile_pricing();
            }
        });

        $carousel.on("click", ".hm-bnr a", function () {
            dataLayer.push({ 'event': 'banner'+($(this).parent().parent().index()+1), 'eventLabel': $(this).data("alt") });
        });

    }

    if ($(".prod-item").length > 0) {
        if (!$("html").hasClass("no-touch")) { /*for mobile devices delay as they "jump to position"*/
            setTimeout('update_image_tiles()', 1000);
            setTimeout('update_tile_pricing()', 1000);
        } else {
            update_image_tiles();
            update_tile_pricing();
        }
    }
    /*Mega Menu*/
    if ($("#main-nav .mega").length > 0) {
        var mega = jQuery('.mega');
        mega.append('<div class="leftcol"></div><div class="rightcol"></div><div class="clr"></div><div class="nav-greenbar">' + jQuery("#nav-greenbar").html() + '</div>');
        for (iq = 0; iq < mega.length; iq++) {
            var megabits = mega.eq(iq).find(".nav-2"), fr = mega.eq(iq).find('.rightcol'), fl = mega.eq(iq).find('.leftcol');
            for (n2 = 0; n2 < megabits.length; n2++) {
                nx = megabits.eq(n2).next();
                if (nx.hasClass("nav-3")) {
                    fr.append('<div class="col"></div>');
                    megabits.eq(n2).appendTo(fr.find('.col').eq(fr.find('.col').length - 1));
                    nx.appendTo(fr.find('.col').eq(fr.find('.col').length - 1));
                } else {
                    megabits.eq(n2).appendTo(fl);
                }
            }
            fr.append('<div class="clr"></div>');
            nav2items = mega.eq(iq).find(".leftcol .nav-2").length;
            if (nav2items > 4) {
                theqstring = '<div class="leftcol">';
                for (q = 0; q < nav2items; q++) {
                    if (q == 4) { theqstring = theqstring + '</div><div class="leftcol">'; }
                    theqstring = theqstring + mega.eq(iq).find(".leftcol .nav-2").eq(q)[0].outerHTML;
                }
                theqstring = theqstring + '</div>';
                mega.eq(iq).find(".leftcol").replaceWith(theqstring);
            }
        }

        if ($(window).width() > 959) {
            $(".mega").each(function () {
                var thism = $(this);
                if (parseInt(thism.data("cat")) > 0) {
                    $.post('/ajax-megamenu-products.htm?dept=' + thism.data("cat"), function (data) {
                        thism.find('.megaprods').html(data);
                        update_image_tiles();
                        update_tile_pricing();
                    });
                }
            });
        }

    }

    /*Ajax Search*/
    $("#inline-search button").click(function () { $("#inline-search").submit(); });
    $("#inline-search").submit(function () {
        if ($("#inline-search .search").val() == "") {
            createDialog("Please enter a search term.");
            return false;
        }
    });
    $(".inline-search .search").on('keyup', function (e) {
        var doneTypingDelay = 500;
        $(".search").val($(this).val());
        if (typeof (typingTimer) != "undefined") clearTimeout(typingTimer);
        var keyCode = (window.event) ? e.which : e.keyCode;
        if (keyCode != 13) { /*If not enter key, submission goes to search page*/
            typingTimer = setTimeout(
                function () { doajaxsearch() },
                doneTypingDelay
            );
        } else { $(this).closest("form").submit(); }
    });
    $("#ajax-search,.inline-search").mouseenter(function () {
        if (typeof (hideajaxsearch) != "undefined") clearTimeout(hideajaxsearch);
    }).mouseleave(function () {
        /*hideajaxsearch = setTimeout('jQuery("#ajax-search").hide()', 3000);*/
    });
    $("#ajax-search").mouseleave(function () {
        hideajaxsearch = setTimeout('jQuery("#ajax-search").hide()', 2000);
    });

    /* Rewards Program Members Area Logic */
    $('#memberExtra-502, #memberExtra-501, #ctl00_content_menu_navRepeater_ctl00_li1, #ctl00_content_menu_navRepeater_ctl01_li1').hide();
    if ($('#rewardsprogram').val() == '1') {
        $('#memberExtra-501, #ctl00_content_menu_navRepeater_ctl00_li1').show();
    }
    else {
        $('#memberExtra-502, #ctl00_content_menu_navRepeater_ctl01_li1').show();
    }

    /*Newsletter bar*/
    if ($(window).width() > 959 && $('#cookienews').val() == '' && $(".pg-mailchimp").length == 0 && $("#newsletter-bar").length > 0) {
        $("#newsletter-bar").show();
        $("body").append('<div class="back-div"></div>');
        var now = new Date();
        var time = now.getTime();
        var theoff = now.getTimezoneOffset() * 60;
        time += 3600 * 1000 * 24 * 90 - theoff;
        now.setTime(time);
        document.cookie = "newslettermodal=1; expires=" + now.toUTCString() + " GMT; path=/";
    }

    if ($(window).width() < 661) {
        phon = $.trim($(".box2 .g").html());
        if (phon.indexOf("href") != -1) { $(".box2 .g").replaceWith(phon); $(".box2 a").addClass("phon"); }
        else {
            $(".box2 .g").replaceWith('<a class="phon" href="tel://' + phon + '">' + phon + '</a>');
        }
        $(document).on('click', '.ftr-col h4', function () {
            if ($(this).next().is(":visible")) {
                $(this).next().fadeOut();
            } else {
                $(this).next().fadeIn();
            }
        });
        /*home mobile slider of tiles*/
        if ($('#hm-tiles .tl').length > 0) {
            /*home carousel*/
            $(".tiles-header").append('<span class="mid">slide back and forth to view more</span>');
            $("#hm-tiles").find(".clr").remove();
            $carousel = $("#hm-tiles");
            $carousel.owlCarousel({
                singleItem: true,
                lazyLoad: true,
                navigation: true
            });
        }
        /*home mobile slider of prods*/
        if ($('#homegroup .prod-item').length > 0) {
            /*home carousel*/
            $("#homegroup>.clr").remove();
            $carousel = $("#homegroup");
            $carousel.owlCarousel({
                singleItem: true,
                lazyLoad: true,
                navigation: true,
                afterAction: function () {
                    update_image_tiles();
                    update_tile_pricing();
                }
            });
        }
    } else {
        if ($(window).width() < 961) {
            $(document).on('click', '.ftr-col h4', function () {
                if ($(this).next().is(":visible")) {
                    $(this).next().fadeOut();
                } else {
                    $(this).next().fadeIn();
                }
            });

            /*home mobile slider of prods*/
            if ($('#homegroup .prod-item').length > 0) {
                $(".tiles-header").eq(1).append('<span class="mid">slide back and forth to view more</span>');
                $("#homegroup>.clr").remove();
                $hgcarousel = $("#homegroup");
                $hgcarousel.owlCarousel({
                    items: 2,
                    itemsDesktopSmall: [960, 2],
                    lazyLoad: true,
                    navigation: true
                });
            }
        }
        if ($(window).width() < 1100) {
            /*home mobile slider of prods*/
            if ($('#homegroup .prod-item').length > 0) {
                $(".tiles-header").eq(1).append('<span class="mid">slide back and forth to view more</span>')
                $("#homegroup>.clr").remove();
                $hgcarousel = $("#homegroup");
                $hgcarousel.owlCarousel({
                    items: 2,
                    itemsDesktopSmall: [1100, 2],
                    lazyLoad: true,
                    navigation: true
                });
            }
        }
    }
    /*
    $('.nav-exp').click(function (e) {
    $(this).parent('dd').toggleClass('on');
    return false;
    });
    */
    /* nav unsticky mobi checkout */
    if (window.location.href.indexOf("checkout.aspx") > -1) {
        $('header').css("position", "relative");
        $('.layout-mobi-content').css("margin-top", "0px");
    }
    /*adjust checkout images*/
    if ($(".checkout-prod .checkout-img img").length > 0) {
        $(".checkout-prod .checkout-img img").each(function () { $(this).attr("src", $(this).attr("src").replace("&Width=115", "").replace("&height=115", "")); $(this).css("height", $(this).parent().width() + 'px'); });
    }
    /*remove $0 giftwrap on checkout*/
    if ($('div[id*="_divGW"]').length > 0) {
        $('div[id*="_divGW"]').each(function () {
            if ($(this).find('span[id*="GiftWrapAnswer"]').html() == "$0.00") {
                $(this).hide();
            } else {
                $(this).find('span[id*="GiftWrapMsg"]').html('Gift Wrap');
            }
        });
    }
    /*adjust wishlist images*/
    if ($(".ProductBox .Info .InfoName .infoBoxLeft").length > 0) {
        $(".ProductBox .Info .InfoName .infoBoxLeft img").each(function () {
            $(this).attr("src", $(this).attr("src").replace("&width=90", "")).attr("width", "").attr("height", "");
        });
    }
    /*adjust wishlist images for mobile*/
    if ($(".wli-img").length > 0) {
        $(".wli-img").each(function () {
            $(this).find("a").attr("style", "display:block; width:74px; height:74px; overflow:hidden;");
            $(this).find("img").attr("src", $(this).find("img").attr("src").replace("&width=74", "")).attr("width", "").attr("height", "").css({ "width": "auto", "height": "74px" }); ;
        });
    }

    if ($('.side').length > 0) {
        $('.side > dl > dd').each(function () {
            var $dd = $(this);
            if ($(this).children('dl').length < 1) {
                $dd.removeClass('on').addClass('single');
            }
        });
    }

    /*Cart/pulldown cart*/
    if ($(".cart-row").length > 0) {
        $(".cart-row").each(function () {
            currow = $(this);
            curw = currow.find(".giftwrap");
            curg = currow.find(".cartgiftmsgbox");
            gc = currow.find(".gift-count");
            if (curg.val().length > 0) {
                lim = 300 - curg.val().length; gc.find(".lim").html(lim);
                if (lim < 0) { gc.css("color", "#f00"); }
                /*else { gc.css("color", "#56BD84"); }*/
            }
            curg.keyup(function () {
                gc = $(this).parent().parent().parent().parent().find(".gift-count");
                curc = $(this).parent().parent().parent().parent().find(".two .cart-submit");
                if ($(this).val().length > 0) {
                    lim = 300 - $(this).val().length; gc.find(".lim").html(lim);
                    if (lim < 0) { gc.css("color", "#f00"); }
                    /*else { gc.css("color", "#56BD84"); }*/
                    curc.addClass("on");
                }
            });
            curw.click(function () {
                curc = $(this).parent().parent().parent().parent().find(".two .cart-submit");
                curc.addClass("on");
            });
        });
    }

    /*Main Cart Page*/
    if ($(".cart-info .giftwrap:checked").length > 0) {
        $(".cart-totals .subtext").show();
        numsub = parseFloat($(".cart-subtotal .value").html().replace("$", ""));
        wrapamt = parseFloat(jQuery(".giftwrap:checked").eq(0).parent().parent().parent().parent().find(".prodgift").html().replace("+ $", ""));
        numwraps = parseFloat(jQuery(".giftwrap:checked").length * wrapamt).toFixed(2);
        merchtot = parseFloat(numsub - numwraps).toFixed(2);
        $(".mtott").html("$" + merchtot);
        $(".gtott").html("$" + numwraps);
    }

    /*nav stuff*/
    if ($("html").hasClass("no-touch")) {
        $('.nav-1').hoverIntent(function () {
            if (typeof (t1) != undefined) { clearTimeout(t1); }
            if (typeof (t2) != undefined) clearTimeout(t2);
            t2 = setTimeout(navShow($(this).data("id")), 500);
        }, function () {
            /*nothing*/
        }, 300);
    }
    $('.menu').toggle(function () {
        $('.member-menu').animate({ left: 0 }, 'fast');
    }, function () {
        $('.member-menu').animate({ left: '-20em' }, 'fast');
    });

});

$(document).on('click touchstart', '.lightwindow, .lw, .nolightwindow, .nlw', function () {
    var screenSize = $(window).width();
    /* Get dimensions from rel tag */
    var framed = true,
        winSize = jQuery(this).attr('rel'),
        sizeAry = ["400", "300"]; /* [w,h] */
    if (screenSize < 640) {
        sizeAry = ["95%", "25%"];
        $(window).scrollTop(0);
    }
    else {
        if (winSize != "") {
            sizeAry = getModalSize(winSize);
        }
    }
    if ($(this).hasClass('nolightwindow') || $(this).hasClass('nlw')) {
        iframe = false;
    }
    $.fn.colorbox({
        href: $(this).attr('href'),
        iframe: framed,
        fastIframe: false,
        width: sizeAry[0],
        height: sizeAry[1],
        rel: "nofollow",
        onComplete: function () {
            var iH = $('.cboxIframe').contents().find("body").outerHeight(true) + 20;
            $.colorbox.resize({ innerHeight: iH });
        }
    });
    return false;
}).on('click touchstart', '#nav-btn', function () {
    if ($('#ajax-cart').html() != "") {
        cartHide();
    }
    /* build and toggle mobile menu */
    navBuild();
    $('#mobi-nav').toggleClass('reveal');
    if (!$("#mobi-nav").hasClass("reveal")) {
        $(".back-div").remove();
    } else {
        if ($("#mobi-nav #inline-search").length == 0) {
            ob = $("#inline-search").html();
            $("#inline-search").remove();
            sb = '<div id="inline-search" style="display:block;">' + ob + '</div>';
            $("#mobi-nav").prepend(sb);
        }
        $(".layout-mobi-content").append('<div class="back-div"></div>');
    }
    return false;
}).on('click touchstart', '#mobi-nav a:not(.off a, .nav-utl a)', function () {
    /* advance to next level in mobile menu */
    return navNext(this);
}).on('click touchstart', '#mobi-nav .off', function () {
    /* return to previous level in mobile menu */
    return navPrev(this);
}).on('click touchstart', '.reveal, .reveal-cart', function () {
    /* display slide in cart */
    if ($(this).attr("id") == "mobi-nav") { }
    else {
        $(this).removeClass('reveal reveal-cart ');
        $('#ajax-cart').removeClass('on').html('');
    }
}).on('mouseleave', '.nav-1', function () {
    if ($("html").hasClass("no-touch")) {
        if (typeof (t1) != undefined) { clearTimeout(t1); }
        t1 = setTimeout(navHide, 1000);
        //clearTimeout(t2);
        $('.nav-links a').removeClass('on');
    }
})/*.on('mouseenter touchstart', '.nav-1', function (e) {
    e.preventDefault();
    t2 = setTimeout(navShow($(this).data("id")), 5000);
    clearTimeout(t1);
})*/.on('mouseenter', '.mega', function () {
    if (typeof (t1) != undefined) { clearTimeout(t1); }
}).on('mouseleave', '.mega', function () {
    if (typeof (t1) != undefined) { clearTimeout(t1); }
    t1 = setTimeout(navHide, 1000);
}).on('submit', '#inline-search', function () {
    if ($(".search").val() == "") {
        alert("Please enter a search term.");
        return false;
    }
}).on('click touchstart', '#cart-link, #m-cart', function () {
    if ($('#ajax-cart').html() != "") {
        cartHide();
    }
    else {
        cartShow("");
    }
    return false;
}).on('click', '.prod-item-compare input', function () {
    compareCheck();
}).on("click", ".top", function (e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 500);
    return false;
}).on('click', '.ftr-col h4', function () {
    if ($(this).hasClass('on')) {
        $(this).removeClass('on').next('ul').removeClass('on');
    }
    else {
        $(this).addClass('on').next('ul').addClass('on');
    }
}).scroll(function () {
    if ($(window).width() > 660) {
        if ($(this).scrollTop() > 100) { $('#top').fadeIn(); }
        else { $('#top').fadeOut(1000); }
    }
    if (window.location.href.indexOf("checkout.aspx") == -1) {
        if ($(window).width() > 960) {
            if ($(this).scrollTop() > 150) { $(".nav-logo a").addClass("sticky"); }
            if ($(this).scrollTop() > 200) { $('header,#navwrap').addClass("sticky"); }
            if ($(this).scrollTop() < 200) { $(".nav-logo a").removeClass("sticky"); $('header,#navwrap').removeClass("sticky"); }
        }
    }
    if ($('.prod-item').length > 0) {
        update_image_tiles();
        update_tile_pricing();
    }
}).on('click', '#newsletter-bar .cl', function () {
    $("#newsletter-bar").fadeOut();
    $(".back-div").remove();
}).on('click', '.green .plus', function () {
    var p = $(this).parent();
    var max = 50;
    curqty = parseInt(p.find(".qty").html());
    if (curqty == max) {
        createDialog("You cannot add more of this item to the cart.");
    } else {
        p.find(".qty").html(curqty + 1);
    }
}).on('click', '.green .min', function () {
    var p = $(this).parent();
    curqty = parseInt(p.find(".qty").html());
    if (curqty == 1) { } else {
        p.find(".qty").html(curqty - 1);
    }
}).on('click', '.green .buy', function () {
    var p = $(this).parent();
    curqty = parseInt(p.find(".qty").html());
    curprod = p.parent().find('.price').data('prod');
    curdept = p.parent().find('.price').data('dept');
    carturl = "prod=" + curprod + "&dept=" + curdept + "&qty=" + curqty;
    cartShow(carturl);
}).on('click', '.green .hrt', function () {
    var t = $(this);
    var p = t.parent();
    curqty = parseInt(p.find(".qty").html());
    curprod = p.parent().find('.price').data('prod');
    curdept = p.parent().find('.price').data('dept');
    cwishurl = "prod=" + curprod + "&dept=" + curdept + "&qty=" + curqty;
    $.post('/wishlist-functions.asp?act=showlists&' + cwishurl, function (data) {

        if (data == "0") {
            createDialog("You have no Lists setup. Click 'OK' to go setup your lists, or 'Cancel' to stay on this page.<br /><br /><input type='button' onclick=\"window.open('../wishlist-main.aspx','_blank'); jQuery('.ui-icon-closethick').trigger('click');\" value='OK' /> <input type='button' onclick='jQuery(\".ui-icon-closethick\").trigger(\"click\");' value='Cancel' />", 200);
        } else {
            if (t.attr("id") == "prod-wish") {
                t.parent().append(data);
                $(".listbox").css("top", ((t.position().top) + 40) + 'px').attr("data-in", t.data('in'));
            } else {
                t.parent().parent().append(data);
                $(".listbox").attr("data-in", t.data('in'));
            }
            removelist = setTimeout("remove_listbox()", 4000);
        }
    });
}).on('click touchend', '.prod-item .wishbit', function (event) {
    eq = $(this).parent().data("in");
    w = $(this);
    $.post('/wishlist-functions.asp?act=addtowish&data=' + $(this).data('data') + '&prod=' + $(this).parent().parent().find(".price").data("prod"), function (data) {
        if (data == "1") {
            createDialog("This Product has already been added to that List. Visit your lists page to manage your items.");
        } else if (data == "0") {
            createDialog("You have no Lists setup. Click 'OK' to go setup your lists, or 'Cancel' to stay on this page.<br /><br /><input type='button' onclick=\"window.location='../wishlist-main.aspx';\" value='OK' /> <input type='button' onclick='jQuery(\".ui-icon-closethick\").trigger(\"click\");' value='Cancel' />", 200);
        } else {
            w.parent().parent().find(".hrt").addClass('on');
            createDialog("The Product has been added to your list");
        }
        $(".listbox").remove();
    });
}).on('mouseenter', '.listbox', function (event) {
    if (typeof (removelist) != "undefined") clearTimeout(removelist);
}).on('mouseleave', '.listbox', function (event) {
    removelist = setTimeout("remove_listbox()", 2000);

}).on('click', '.promo-more', function () {
    if (jQuery("#promo-ribbon .mo").height() < 10) {
        jQuery("#promo-ribbon .mo").animate({ 'height': jQuery("#promo-ribbon .mo .in").height() + 'px' }, 300);
        jQuery("#promo-ribbon").animate({ 'margin-bottom': '-' + jQuery("#promo-ribbon .mo .in").height() + 'px' }, 300);
        jQuery("#promo-ribbon .l,#promo-ribbon .r").css("background", "url(../images/design/promo-arr-up.png) no-repeat");
    } else {
        jQuery("#promo-ribbon .mo").animate({ 'height': '0px' }, 300);
        jQuery("#promo-ribbon").animate({ 'margin-bottom': '0px' }, 300);
        jQuery("#promo-ribbon .l,#promo-ribbon .r").css("background", "url(../images/design/promo-arr-dn.png) no-repeat");
    }
}).on('click', '#newsletter-signup .sub', function () {
    $("#newsletter-signup").submit();
}).on('click', '#email-signup .sub', function () {
    $("#email-signup").submit();
}).on('click touchend', '.back-div', function () {
    if ($("#newsletter-bar").is(":visible")) $("#newsletter-bar").fadeOut();
    $("#mobi-nav").toggleClass("reveal");
    $(".back-div").remove();
}).on('click', '.nav-1', function (e) {
    if ($(window).width() < 1030 && $(this).next().hasClass("mega")) {
        e.preventDefault();
        if (!$(this).next().hasClass("show")) {
            if (typeof (t2) != undefined) { clearTimeout(t2); }
            t2 = setTimeout(navShow($(this).data("id")), 500);
            if (typeof (t1) != undefined) { clearTimeout(t1); }
        } else {
            navHide();
        }
        return false;
    }
}).on("click touchcancel", '#cartclose', function () {
    cartHide();
}).on("click touchcancel", '.cartrem', function () {
    var x = confirm("Are you sure you want to remove this item?");
    if (x) {
        var pdrem = $(this).attr("data-data");
        $("#ajax-cart").html('<div style="padding:20px;">Updating...</div>');
        $.post("/PullDownCart.aspx?remove=" + pdrem, {}, function (data) {
            $("#ajax-cart").html(data);
            newtot = $(".pullcarttot").val();
            $("#cart-count").html(newtot);
        });
    }
}).on("click touchcancel keyup", ".gift-updt,.pd-updt,#giftwrap,#addgiftmsg,#giftmsgbox,.pd-qtytxt", function () {/*pulldowncart logic*/
    if ($(this).hasClass("pd-qtytxt")) {
        rowid = $(this).parent().parent().parent().find(".gift-updt").attr("data-data");
    } else {
        if ($(this).hasClass("pd-updt")) {
            rowid = $(this).parent().parent().parent().parent().find(".gift-updt").attr("data-data");
            var pqavailqty = parseInt($(".allowedqty").val());
            if (!isNaN($("#qty_" + rowid).val()) && parseInt($("#qty_" + rowid).val()) > pqavailqty) { alert("The maximum amount orderable for this item is " + pqavailqty + "."); }
        } else {
            rowid = $(this).parent().find(".gift-updt").attr("data-data");
        }
    }
    if (isNaN($("#qty_" + rowid).val()) || $("#qty_" + rowid).val() < 0) { alert("Please enter a number for the quantity"); return false; }

    updtstr = 'qty_' + rowid + '=' + $("#qty_" + rowid).val(); ;
    if ($("#giftwrap").is(":checked")) {
        updtstr = updtstr + '&giftwrap_' + rowid + '=yes';
        if ($("#addgiftmsg").is(":checked")) {
            updtstr = updtstr + '&giftMessage_' + rowid + '=' + encodeURIComponent($("#giftmsgbox").val());
        } else {
            updtstr = updtstr + '&giftMessage_' + rowid + '=';
            $(".pcart-row .gift-count .lim").html('300');
            $(".pcart-row .gift-count").css("color", "#56BD84");
        }
        newadd = 0;
        if ($("#giftwrap").length > 0) {
            newadd = parseFloat($("#qty_" + rowid).val()) * parseFloat($("#giftwrap").next().html().replace("Add Gift Wrap ($", "").replace(")", ""));
        }
        newtot = parseFloat($("#startamt").val().replace("$", "")) + newadd;
        $(".pcart-subtotal .amt").html("$" + newtot.toFixed(2));
    } else {
        updtstr = updtstr + '&giftwrap_' + rowid + '=';
        if ($("#addgiftmsg").is(":checked")) {
            updtstr = updtstr + '&giftMessage_' + rowid + '=' + encodeURIComponent($("#giftmsgbox").val());
        } else {
            updtstr = updtstr + '&giftMessage_' + rowid + '=';
            $(".pcart-row .gift-count .lim").html('300');
            $(".pcart-row .gift-count").css("color", "#56BD84");
        }
        newtot = parseFloat($("#startamt").val().replace("$", ""));
        $(".pcart-subtotal .amt").html("$" + newtot.toFixed(2));
    }
    if ($("#addgiftmsg").is(":checked")) {
        if (!$("#giftmsgbox").is(":visible")) { $("#giftmsgbox").slideDown(); $(".pcart-row .gift-count").show(); }
    } else { $("#giftmsgbox").fadeOut().val(''); $(".pcart-row .gift-count").hide(); }

    if ($(this).hasClass("gift-updt") || $(this).hasClass("pd-updt")) {
        $.post("/PullDownCart.aspx?" + updtstr, {}, function (data) {
            if ($(".gift-updt span").length == 1) { $(".gift-updt").html('<span class="s">Save</span>'); }
            setTimeout('jQuery(".gift-updt span").not(".s").remove()', 1500);
            if (window.location.href.indexOf("showcart=1") == -1) {
                if (window.location.href.indexOf("?") == -1) {
                    if (window.location.href.indexOf("#") == -1) {
                        window.location.href = window.location.href + '?showcart=1';
                    } else {
                        window.location.href = window.location.href.replace("#", '?showcart=1#');
                    }
                } else {
                    if (window.location.href.indexOf("#") == -1) {
                        window.location.href = window.location.href + '&showcart=1';
                    } else {
                        window.location.href = window.location.href.replace("#", '&showcart=1#');
                    }
                }
            } else {
                window.location.href = window.location.href;
            }
        });
    } else {
        if ($(".gift-updt span").length == 1) { $(".gift-updt").html('<span class="s">Save</span>'); }
        setTimeout('jQuery(".gift-updt span").not(".s").remove()', 1500);
    }
}).on("click touchend", ".pcart-left .qtybox", function () {
    window.location = "/cart.aspx";
}).on('keyup blur', "#giftmsgbox", function () {
    lim = 300 - $("#giftmsgbox").val().length;
    if (lim <= 0) { $("#giftmsgbox").val($("#giftmsgbox").val().substr(0, 300)); lim = 0; }
    $(".pcart-row .gift-count .lim").html(lim);
    if (lim == 0) { $(".pcart-row .gift-count").css("color", "#f00"); }
    else { $(".pcart-row .gift-count").css("color", "#56BD84"); }
}).on('touchend', ".prod-item-box", function (e) {
    var hazit = $(this).hasClass("shownow")
    $(this).addClass('shownow');
    if (!hazit) { return false; }
}).on('touchend', ".prod-item-box .braincat", function (e) {
    if ($(this).parent().hasClass("shownow")) { $(this).parent().removeClass("shownow").addClass("prod-item-box"); }
}).on("click", ".tl a", function () {
    dataLayer.push({ 'event': 'customerfavorites'+($(this).parent().index()+1), 'eventLabel': $(this).data("alt") });
});


/* *** global functions *** */
function navBuild() {
    if (nav.length < 1) {
        nav.push('<div class="nav-lvl1" data-level="1">')
        nav.push($('#main-nav .nav-1').map(function () { return this.outerHTML; }).get().join(''));
        nav.push($(".mobilinks").html()); 
        nav.push('</div>');
         
        if ($('.mega').length > 0) {
            $('.mega').each(function () {                
                nav.push('<div id="mnav-' + $(this).data("id") + '" class="nav-lvl2 mnav-slide" data-level="2">');
                nav.push($(this).find('.nav-2').map(function () { return this.outerHTML; }).get().join(''));
                nav.push('</div>');
            });
        }
       
        if ($('.nav-3').length > 0) {
            $('.nav-3').each(function () {
                nav.push('<div id="mnav-' + $(this).data("id") + '" class="nav-lvl3 mnav-slide" data-level="3">');
                nav.push($(this).children('a').map(function () { return this.outerHTML; }).get().join(''));
                nav.push('</div>');
            });
        }
        
        document.getElementById('mobi-nav').innerHTML = nav.join('');
    }
}
function navNext(obj) {
    /* mobi nav: go to next level */
    var $this = $(obj);
    var $nextSlide = $('#mnav-' + $this.data("id"));
    if ($nextSlide.find("a").length > 0) {
        $this.parent().addClass('off');
        $nextSlide.removeClass('mnav-slide');
        return false;
    }else{
        return true;
    }
}
function navPrev(obj) {
    /* mobi nav: go to previous level */
    $this = $(obj);
    var lvl = $this.data("level") + 1;
    var lvl2 = lvl + 1;
    $this.removeClass('off');
    $('.nav-lvl' + lvl + ', .nav-lvl' + lvl2).addClass('mnav-slide');
    return false;
}
function navShow(id) {
    jQuery('.mega').removeClass('show');
    jQuery('#mega-' + id).addClass('show');
    jQuery('.nav-1').removeClass("on");
    jQuery('.nav-1[data-id="' + id + '"]').addClass("on");
}
function navHide() {
    jQuery('.mega').removeClass('show');
    jQuery('.nav-1').removeClass("on");
}
function cartShow(str) {
    var cartStr = "/pulldowncart.aspx";
    if (str != "") {
        cartStr = cartStr + "?" + str;
    } else {
        cartStr = cartStr + "?prod=1" + str;
    }
    jQuery.ajax({
        url: cartStr,
        cache: false
    }).done(function (data) {
        jQuery('#ajax-cart', top.document).html(data).addClass('on');
        jQuery('#mobi-nav').addClass('hide');
        jQuery('.layout-mobi-content').addClass('reveal-cart');
        if (jQuery("#ajax-cart h1").length > 0) {
            newtot = jQuery(".pullcarttot").val();
            jQuery("#cart-count").html(newtot);
        } else {
            jQuery("#cart-count").html('0');
        }
        pullcarttot = jQuery(".pullcarttot").val();
        shownqty = 0;
        jQuery(".pcart-left .qtybox").each(function () {
            shownqty = shownqty + parseInt(jQuery(this).text());
        });
        shownqty = shownqty + parseInt(jQuery(".pd-qtytxt").val());
        if (shownqty < pullcarttot) { andmore = '...and ' + (pullcarttot - shownqty) + ' more items.&nbsp;'; }
        else { andmore = ''; }
        $(".pcart-andmore span").html(andmore);
        if ($('#addgiftmsg').is(":checked")) { $("#giftmsgbox").slideDown(); $(".pcart-row .gift-count").show(); } else {
            if (jQuery("#opendenomitis").length == 1) {
                jQuery("#addgiftmsg").trigger("click"); $("#giftmsgbox").slideDown(); $(".pcart-row .gift-count").show(); 
            }
        }
        if ($("#frmGiftCard").length > 0) { $("#frmGiftCard").attr("action", $("#frmGiftCard").attr("action").replace("pulldown", "")); }
        if ($("#giftmsgbox").length>0){
            if($("#giftmsgbox").val().length > 0) {
                lim = 300 - $("#giftmsgbox").val().length;
                if (lim <= 0) { $("#giftmsgbox").val($("#giftmsgbox").val().substr(0, 300)); lim = 0; }
                $(".gift-count .lim").html(lim);
                if (lim == 0) { $(".pcart-row .gift-count").css("color", "#f00"); }
                else { $(".pcart-row .gift-count").css("color", "#56BD84"); }
            }
        }

    });
}
function cartHide() {
    jQuery('#ajax-cart').html("").removeClass('on');
    jQuery('#mobi-nav').removeClass('hide');
    jQuery('.layout-mobi-content').removeClass('reveal-cart');
}

function update_tile_pricing() {
    /*Show image on first 15 items*/
    /*Brain Categories:     Coordination - ID 213     Critical Thinking - ID 215    Memory - ID 216    Visual Perception - ID 214    Word Skills - ID 210    */
    if (typeof (updatebusy) != 'undefined' && updatebusy == 1) { return false; }
    updatebusy = 1;
    
    /*update a section of tiles pricing - by default updates 1/5 of remaining tiles without pricing info.*/
    var totitems = jQuery(".prod-item .price:empty").length;
    var idstr = '';
    var loopct=0;

    var splititems = 8;
    if (totitems > 40) {
        var splititems = parseInt(totitems / 5 + 1);
    } else if (totitems < 10) {
        var splititems = 10;
    }
    if (totitems > 0) {
        jQuery('.prod-item .price:empty').each(function () {
            loopct++;
            if (is_on_screen(jQuery(this)) && loopct<=splititems) {
                curid = jQuery(this).data('prod');
                if (idstr == '') { idstr = curid; }
                else { idstr = idstr + ',' + curid; }
            }
        });     
        
        if(idstr!=''){      
            updtStr = '/ajax-pricing.htm?prod_ids=' + idstr;
            /*jQuery.post(updtStr, function (data) { console.log(data); }); /* If you want to see the data returned. */
            jQuery.getJSON(updtStr, function (data) {
                jQuery.each(data, function (key, val) {
                    var upct = 0;
                    for (i = 0; i < val.length; i++) {
                        upct++;
                        var nolower = 0;
                        var lowestoptval = 0;
                        for (var x in val[i].option) {
                            if (lowestoptval == 0) { lowestoptval = parseFloat(val[i].option[x].currency); }
                            else {
                                if (lowestoptval == parseFloat(val[i].option[x].currency)) { }
                                else {
                                    if (lowestoptval < parseFloat(val[i].option[x].currency)) { }
                                    else { lowestoptval = parseFloat(val[i].option[x].currency); }
                                    nolower = 1;
                                }
                            } 
                        } 
                        /*ignoring option code for now*/
                        if (parseInt(val[i].quantity) < 1) {
                            var gr = jQuery('.prod-item .price[data-prod="' + val[i].Product_Id + '"]').parent().parent().find(".green");
                            gr.find(".qty,.plus,.min,.buy").remove();
                            gr.prepend('<div class="zeroqty"><a href="'+gr.parent().find(".name").attr("href") +'">Learn More</a></div>');
                        }
                        if (parseFloat(val[i].sale) > 0.00 && parseFloat(val[i].sale_special) > 0.00 && parseFloat(val[i].sale) > parseFloat(val[i].sale_special)) {
                            jQuery('.prod-item .price[data-prod="' + val[i].Product_Id + '"]').html('<span class="was">$' + parseFloat(val[i].sale) + '</span>' + '<span class="sale">$' + parseFloat(val[i].bestprice)+'</span>');
                        } else {
                            jQuery('.prod-item .price[data-prod="' + val[i].Product_Id + '"]').html('$' + parseFloat(val[i].bestprice));
                        }
                    }
                });
                updatebusy = 0;
                setTimeout('update_tile_pricing()', 1000);
            });               
        } else { updatebusy = 0; }
    } else { updatebusy = 0; }
}

function update_image_tiles() {
    jQuery('.prod-item .img[data-src!=""]').each(function () {
        if (is_on_screen(jQuery(this))) {
            var im = jQuery(this);
            var pi = im.closest(".prod-item");
            pi.css("background", "#fff url(" + im.data("src") + ") no-repeat top left");
            im.css('margin-left', '-1000px');
            im.attr("data-src", "");
            var vbc = '';
            bc = pi.find('.braincat').data('cat').split("|");
            for (k = 0; k <= bc.length; k++) {
                if (jQuery.trim(bc[k]) != '' && vbc == '') {
                    if (jQuery.trim(bc[k]) == 'Online_Only') {
                        if (!pi.find('.badge').is('.sale, .new, .exclusive')) {
                            pi.find('.badge').attr("class", "badge online");
                            pi.find('.badge span').html("Online Only");
                        }
                    } else {
                        vbc = jQuery.trim(bc[k]);
                    }
                }
            }
            if (vbc == 'Coordination') { pi.find('.braincat').css({ "background-image": "url(/images/design/icon-bcat-coor.png)" }); }
            if (vbc == 'Critical_Thinking') { pi.find('.braincat').css({ "background-image": "url(/images/design/icon-bcat-crit.png)" }); }
            if (vbc == 'Memory') { pi.find('.braincat').css({ "background-image": "url(/images/design/icon-bcat-mem.png)" }); }
            if (vbc == 'Visual_Perception') { pi.find('.braincat').css({ "background-image": "url(/images/design/icon-bcat-vis.png)" }); }
            if (vbc == 'Word_Skills') { pi.find('.braincat').css({ "background-image": "url(/images/design/icon-bcat-word.png)" }); }
        }
    });
}

function is_on_screen(obj) {
    var win = jQuery(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = obj.offset();
    bounds.right = bounds.left + obj.outerWidth();
    bounds.bottom = bounds.top + obj.outerHeight() - 100;

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top )); /*|| viewport.top > bounds.bottom));*/
};

/*Ajax Search execution*/
function doajaxsearch() {
    if (typeof (hideajaxsearch) != "undefined") clearTimeout(hideajaxsearch);
    jQuery("#ajax-search").show();
    jQuery("#ajaxmatches").html('');
    jQuery("#ajaxresults").html('<img src="/images/ajax-loader.gif" />');

    var matchdatafound = 0;
    jQuery.post("/User-Search-Parameters.aspx", { tSearch: jQuery(".search").val() }, function (data) {
        if (data != '') {
            jQuery("#ajaxmatches").html(data);
            if (jQuery("#lstMatches li").length > 4) {
                licount = 0;
                jQuery("#lstMatches li").each(function () {
                    licount++;
                    if (licount > 4) jQuery(this).remove();
                });
            }
            jQuery("#tSearchUpdateInner h3").eq(0).html("Suggested terms");
            jQuery("#tSearchUpdateInner h3").eq(1).html("Suggested resources");

            tli = jQuery("#lstMatches").html();
            var tlc = jQuery("#lstCustom").html();

            if (tli != "" && tli != undefined) {
                tli = tli.replace(/.asp/g, ".htm").replace(/-/g, "&nbsp;").replace(/%20/g, " ");
            }
            if (tlc != "" && tlc != undefined) {
                tlc = tlc.replace(/.asp/g, ".htm");
            }
            jQuery("#lstMatches").html(tli);
            jQuery("#lstCustom").html(tlc);

            jQuery("#lstMatches li").click(function () {
                jQuery(this).children("span").remove();
                window.location.href = "/search.aspx?tSearch=" + jQuery(this).text();
                if (typeof (hideajaxsearch) != "undefined") clearTimeout(hideajaxsearch);
                jQuery("#ajax-search").html('<div id="ajaxmatches"></div><div id="ajaxresults"></div>').hide();
                jQuery("#searchform").submit();
            });
            matchdatafound = 1;
        }
    });

    jQuery.post("/search-inline.htm", { tSearch: jQuery(".search").val() }, function (data) {
        var dataObj = jQuery(data);
        var theData = data;
        switch (theData) {
            case "0":
                createDialog("Failure.");
                break;
            default:
                jQuery("#ajaxresults").html(theData + '<a id="ajaxsearch-seeall" href="/search.aspx?tSearch=' + escape(jQuery(".search").eq(0).val()) + '">See All Results</a>');
                v = jQuery("#ajax-search .search").val();
                jQuery("#ajax-search .search").focus();
                jQuery("#ajax-search .search").val('');
                jQuery("#ajax-search .search").val(v);
        };
    });
}

function createDialog(txt, h) {
    if (h == '') h = 140;
    jQuery('<div>' + txt + '</div>').dialog({
        height: h,
        modal: true,
        title: "Alert"
    });
    return false;
}

function remove_listbox() { jQuery(".listbox").remove(); }

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}