
var isMobile = false;

function setSearchTD(ele,setHeight) {
    if(setHeight){ 
        var max = 0;
        $("#"+ele).each(function(){
            max = Math.max($(this).height(),max);
        }).height(max);
    }
    else {
        $("#"+ele).each(function(){
            $(this).css('height','');
        });
    }
};

$(document).ready(function(){

    function checkBB(){ /*if old blackberry device, add mobile styles */
        var mbua = navigator.userAgent;
        if (mbua.indexOf("BlackBerry") >= 0) {
            if (mbua.indexOf("Version/") < 0) { /* ***User Agent in BlackBerry 6 and BlackBerry 7 */
                $("head").append('<link href="//www.hanes.com/css/mobile_styles.css" rel="stylesheet" type="text/css">');
            }
        }
    }

    checkBB();

    window.isMobile = ($("#nav-button").css("display") === "block") ? true : false;

    /* if view desktop link selected, or if device is ipad - force to desktop view unless view mobile link selected */
    if(($.cookie('mb_desktop_view') === 'true') || ((navigator.userAgent.match(/iPad/i)) && (window.isMobile) && ($.cookie('mb_desktop_view') != 'false'))) { 
        window.isMobile = false;
        $("body").removeClass('rl');
    }
    else if($.cookie('mb_desktop_view') === 'false') {window.isMobile = true;}
    $("#viewLink").append('<a id="view_desktop" class="view_full hidden-desktop" href="#">View Full Site</a><a id="view_mobile" class="view_full hidden-desktop" href="#">View Mobile Site</a>').show();

    $("#view_desktop").mousedown(function(e) { 
        e.preventDefault();
        window.isMobile = false;
        $.cookie('mb_desktop_view','true');
        location.reload();
    });
    $("#view_mobile").mousedown(function(e){ 
        e.preventDefault();
        window.isMobile = true;
        $.cookie('mb_desktop_view','false');
        location.reload();
    });
    if ($.cookie('load_mobile_view')) {
        if($.cookie('load_mobile_view') === '0') { 
            window.isMobile = true;
            $('head').append($('<link>').attr({'rel':'stylesheet','href':'//www.hanes.com/css/mobile_styles.css'})); 
        }
    }

    $('.parentlink, .parentlink2, #mobile_tabNavigation li a, a.tabheader, #layout_column, #layout_grid, #ls_layout_column, #ls_layout_grid, #nojs-navlink').click(function(e){
            if(window.isMobile){e.preventDefault()}});

        if(window.isMobile) 
            $("#mb-numOfItems").text($("#numOfItems b").text());

        $("#nav-button, #nojs-navlink").mousedown(function (e) {
            if(window.isMobile){
                e.stopPropagation();
                e.preventDefault();
                var curLink = $('#menutext').html();
                $("#cat-nav").slideToggle(500, function () { / * 0.5 second slide time * /
                    if($("#cat-nav").css("display") == 'none') {
                        $('.submenu').hide();
                        $('#cat-nav li').removeClass('parentdown');
                        $("#mobile_nav_close").hide();
                        $("#mobile_nav_img").show();
                    }
                    else {
                        $("#mobile_nav_img").hide();
                        $("#mobile_nav_close").show();
                    }
                });
            }
        });
        $('.parentlink,.parentlink2').mousedown(function(e){
            var $this = $(this);
            var curset = $this.attr('class').substr($this.attr('class').length-1);
            curset = (curset === "2") ? "2" : ""; / *footer menu uses 2 in classnames* /
            var menugrp = (curset === "2") ? "mb-cat-nav" : "cat-nav";
            var subm = $this.parent('li').find('.submenu'+curset);
            var subp = $this.parent('li');
                                        
            if (subm.css("display") == 'none') {
                $('.submenu'+curset).slideUp(500);
                $("#"+menugrp+" li.parent"+curset).removeClass('parentdown'+curset);
                subp.addClass('parentdown'+curset);
                subm.slideDown(500);
            }
            else {
                subm.slideUp(function() {
                    $('.submenu'+curset).slideUp(500);
                    subp.removeClass('parentdown'+curset);
                }); 
            } 
        });

        $('.parentlink3').mousedown(function (e) {
            var $this = $(this);
            var curset = $this.attr('class').substr($this.attr('class').length - 1);
            curset = (curset === "3") ? "3" : ""; / *footer sub-categories use 3 in classnames* /
            var menugrp = (curset === "3") ? "mb-cat-nav" : "cat-nav";
            var subm = $this.parent('li').find('.submenu' + curset);
            var subp = $this.parent('li');
            if (subm.css("display") == 'none') {
                $('.submenu' + curset).slideUp(500);
                $("#" + menugrp + " li.parent" + curset).removeClass('parentdown' + curset);
                subp.addClass('parentdown' + curset);
                subm.slideDown(500);
            }
            else {
                subm.slideUp(function () {
                    $('.submenu' + curset).slideUp(500);
                    subp.removeClass('parentdown' + curset);
                });
            }
        });
        $("#mobile_tabNavigation li a").mousedown(function(){
            if(window.isMobile){           
                var prodBtm = $(this).parent('li').find('.inner');

                if ($(this).hasClass('selected')) {
                    $("#mobile_tabNavigation li a").removeClass('selected');
                    $("#mobile_tabNavigation li .inner").removeClass('show');
                }
                else {
                    $("#mobile_tabNavigation li a").removeClass('selected');
                    $("#mobile_tabNavigation li .inner").removeClass('show');
                    $(this).addClass('selected');
                    prodBtm.addClass('show'); 
                }
            }
        });
        $('#more_info_header').mousedown(function(){
            if(window.isMobile){
                if($("#footer-links").css("display") === 'block') { 
                    $("#footer-links").hide();
                    $('#more_info_header').removeClass('down');
                }
                else {
                    $("#footer-links").show();
                    $('#more_info_header').addClass('down');
                }
            }
        });
        $("#ls_layout_column, #layout_column").mousedown(function(e){
            if(window.isMobile){
                e.preventDefault();
                $(".boxed").addClass('display_column');
                $("#ls_layout_grid, #layout_grid").removeClass('active').addClass('inactive');
                $("#ls_layout_column, #layout_column").removeClass('inactive').addClass('active');

                if($("#searchresults").length) { 
                    /* on search results page, make table rows and cells stack */
                    $("#display-area > table").addClass('stack');
                    setSearchTD('search-results-right table td',false);    
                }
            }
        });
        $("#ls_layout_grid, #layout_grid").mousedown(function(e){
            if(window.isMobile){
                e.preventDefault();
                $(".boxed").removeClass('display_column');
                $("#ls_layout_column, #layout_column").removeClass('active').addClass('inactive');
                $("#ls_layout_grid, #layout_grid").removeClass('inactive').addClass('active');

                if($("#searchresults").length) {
                    /* on search results page, return table to default */
                    setSearchTD('search-results-right table td',true);
                    $("#display-area > table").removeClass('stack');
                }
            }
        });
        $("#gotoTop").click(function(e){
            if(window.isMobile){
                e.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 0);
            }
        });
        $("#cvn_cell a").click(function(e){
            if(window.isMobile){
                e.preventDefault();
                window.location = "https://www.hanes.com/webapp/wcs/stores/servlet/CVNDetails";
            }
        })
});
$(window).load(function () {
    if(($("#display-area .pagination-container").length) && (window.isMobile))
        $(".layout-selection").remove();
    /* product page but not search results page */
    if (($(".boxed img").length) && (window.isMobile) && (!$("#search-results-right table").length)) {
        if (($(".boxed img").width() < 4) || ($("#subcat-listing").length)) { /* no product images on page or subcat listing */
            $(".boxed").addClass('noprod');
            $(".boxed br").addClass('hidden-phone');
            $("#display-area").css("border-top","1px solid #CCCCCC");
        }
        else {
            var maxheight = 0;    
            $(".boxed").each(function() {
                maxheight = Math.max($(this).height(), maxheight);
            }).height(maxheight);
        }
    }
    if (($("#search-results-right table").length) && (window.isMobile)) {
        /* convert search results to one row */
        var table = $("#search-results-right table");
        var rows = table.find('tr');
        var html = '<tr>';
        for (var i = 0; i < rows.length; i++)
        { html = html + rows[i].innerHTML; }
        html = html + '</tr>';
        table.html(html);
        setSearchTD('search-results-right table td',true);
    }
    
    if (($("#cart-head").length) && (window.isMobile)) /* h3 style on cart page only */
        $('h3').css({'padding-left':'5px','clear':'both'});

    if(($("#product-container").length) && (window.isMobile)) { /*product page*/
        $("#BVRRSummaryContainer").insertBefore($('#mb-prod-price'));
        $("#prod-links").insertAfter($('#prod-details'));
        $('<div id="prod-mayalso-like"></div>').insertAfter($('#prod-links'));
        $("#prod-mayalso-like").addClass('hidden-desktop').html($('#ioi-view-vert'));
        $("#ioi-view-vert ul li").each(function(y){
            if(y < 4){
                $(this).find('a').each(function(i) {
                    if(i == 1) /*hide product name, leave img(0) and price(2)*/
                        $(this).hide();
                });
            }
            else
                $(this).hide();
        });
    }
});
function loadMobile() {
    var tab = "\n\xa0\xa0\xa0\xa0\xa0";
    var layout = prompt("Please enter layout to preview:"+tab+"0 = mobile"+tab+"1 = tablet"+tab+"9 = desktop","0");

    if (layout!=null && layout!="") {
        $.cookie('load_mobile_view',layout.trim());
        location.reload();
    }
}
function checkMobile()
{
    var stillMobile = ($("#nav-button").css("display") === "block") ? true : false;
    if(!$("body").hasClass("rl")) 
        stillMobile=false;

    return stillMobile;
};
function checkMState() {
    /* if view switches between desktop and mobile */
     var curVState = window.isMobile;
     window.isMobile=checkMobile();

     if(curVState != window.isMobile) { 
        /*there has been a change in view state,
          if mobile/desktop nav is not showing, reload to force CSS refresh,
          if on product page, reload to update layout*/
        if(window.isMobile) {
            if ((!$("#nav-button").css("display") === "block") ||  ($("#product-container").length))
                location.reload();
        }
        else {
            if(($("#cat-nav").css("display") === "none") || ($("#product-container").length))
                location.reload();
        }
    }
}
var checkVState;
$(window).resize(function(){
  clearTimeout(checkVState);
  checkVState = setTimeout(checkMState, 400);
});