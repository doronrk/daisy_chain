/*
 * Smoothbox v20080623 by Boris Popoff (http://gueschla.com)
 * To be used with mootools 1.2
 *
 * Based on Cody Lindley's Thickbox, MIT License
 *
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
// on page load call TB_init
$(TB_init);

// prevent javascript error before the content has loaded
TB_WIDTH = 0;
TB_HEIGHT = 0;
var TB_doneOnce = 0;

// choose more overlay resizing enhancement
var MIN_OVERLAY_HEIGHT = 300;
var MIN_ATTRIBUTES_HEIGHT = 148;
var MIN_WINDOW_HEIGHT = 340;
var MAX_OVERLAY_HEIGHT = 500;
var MAX_ATTRIBUTES_WIDTH = 525;
var MAX_OVERLAY_WIDTH = 580;
var IS_CHOOSEMORE_OVERLAY = false;
var IS_CART_IN_OVERLAY = false;
var IS_AD_CONFIRM_OVERLAY = false;
var IS_WL_CONFIRM_OVERLAY = false;
var IS_SEARCH_OVERLAY = false;
var IS_ZOOM_OVERLAY = false;
var IS_PLAYER = false;
var POPUP_SPACE = 20;
var POPUP_OVERLAY_CLOSE = 'Close';
var LOADING_GIF = "/wcsstore/US/content/images/loading.gif";
var PRINT_STYLES = '<link type="text/css" media="print" href="/wcsstore/US/content/css/printoverlay.css" rel="stylesheet"/>';

// add smoothbox to href elements that have a class of .smoothbox
function TB_init(){
	$("a.smoothbox").on('click', TB_bind);
}
function TB_bind(event){
    // stop default behaviour
    event.preventDefault();
    // remove click border
    this.blur();
    // get caption: either title or name attribute
    var caption = this.title || this.name || "";
    // get rel attribute for image groups
    var group = this.rel || false;
    // display the box for the elements href
    TB_show(caption, this.href, group);
    return false;
}
// called when the user clicks on a smoothbox link
function TB_show(caption, url, rel){
	var queryString = url;
	if(null!=url.match(/\?(.+)/)) queryString = url.match(/\?(.+)/)[1];
    var params = TB_parseQuery(queryString);

	IS_CHOOSEMORE_OVERLAY = false; // default to false for each TB_show function call
	IS_SEARCH_OVERLAY = false;
	IS_CART_IN_OVERLAY = false;
	IS_AD_CONFIRM_OVERLAY = false;
	IS_WL_CONFIRM_OVERLAY = false;
	IS_ZOOM_OVERLAY = false;
	IS_PLAYER = false;
	var overlaytype = "";
	if(params['player'] != null && params['player'] != ''){
        IS_PLAYER= true;
        overlaytype+= 'TB_'+params['player']+' ';
    }
    if(params['template'] == 'FacetValuesPopupView'){ // if choosemore overlay
       IS_CHOOSEMORE_OVERLAY = true;
       overlaytype+= 'TB_'+params['template']+' ';
	}
	if(params['cartOverlay'] == 'true'){
		IS_CART_IN_OVERLAY = true;
		overlaytype+= 'TB_cartOverlay ';
	}
	if(params['cartWLConfirm'] == 'true'){
		IS_WL_CONFIRM_OVERLAY = true;
		overlaytype+= 'TB_cartWLConfirm ';
	}
	if(params['cartADConfirm'] == 'true'){
		IS_AD_CONFIRM_OVERLAY = true;
		overlaytype+= 'TB_cartADConfirm ';
	}
	if(params['TB_zoomOverlay'] == 'true'){
		IS_ZOOM_OVERLAY = true;
		overlaytype+= 'TB_zoomOverlay ';
	}
	if(params['keyword'] != null && params['keyword'] != ''){
		IS_SEARCH_OVERLAY = true;
		overlaytype+= 'TB_searchOverlay ';
	}
    // create iframe, overlay and box if non-existent

    if (!get.id("TB_overlay")) {
        $('<iframe />', {'id': 'TB_HideSelect'}).appendTo(document.body);
        $('#TB_HideSelect').css({'opacity': 0.0});
        $('<div />', {'id': 'TB_overlay'}).appendTo(document.body);
        $('#TB_overlay').css({'opacity': 0.0});
        TB_overlaySize();

        $('#TB_overlay').fadeTo(400, 0.6);

    }
    if (!get.id("TB_load")) {
        $('<div />', {'id': 'TB_load', 'html': '<img src="'+LOADING_GIF+'" />'}).appendTo(document.body);
        TB_load_position();
    }
    if (!get.id("TB_window")) {
        $('<div />', {'id': 'TB_window', 'class': overlaytype}).appendTo(document.body);
        //$('#TB_window').css({'opacity': 0.0});
    }
    $("#TB_overlay").on('click', TB_remove);
    $(window).on('scroll', TB_position);
    //check if print button needed
    var printbtn="";
	if (url.indexOf('print=true') != -1) printbtn = "<div id='TB_print'><a href='javascript:void(0);' onclick='window.print();'>Print</a></div>";

    // check if a query string is involved
    var baseURL = url;
    if(null!=url.split("?")) baseURL = url.split("?")[0];

    // regex to check if a href refers to an image
    //var imageURL = /\.(jpe?g|png|gif|bmp)/gi;
    var imageURL = /^[^\?]*\.(jpe?g|png|gif|bmp)$/gi;

    // check for images
    if (baseURL.match(imageURL)) {
        var dummy = {
            caption: "",
            url: "",
            html: ""
        };

        var prev = dummy, next = dummy, imageCount = "";

        // if an image group is given
        if (rel) {
            function getInfo(image, id, label){
                return {
                    caption: image.title,
                    url: image.href,
                    html: "<span id='TB_" + id + "'>&nbsp;&nbsp;<a href='#'>" + label + "</a></span>"
                }
            }

            // find the anchors that point to the group
            var imageGroup = [];
            $("a.smoothbox").each(function(index, el){
                if (el.rel == rel) {
                    imageGroup[imageGroup.length] = el;
                }
            })

            var foundSelf = false;

            // loop through the anchors, looking for ourself, saving information about previous and next image
            for (var i = 0; i < imageGroup.length; i++) {
                var image = imageGroup[i];
                var urlTypeTemp = image.href.match(imageURL);

                // look for ourself
                if (image.href == url) {
                    foundSelf = true;
                    imageCount = "Image " + (i + 1) + " of " + (imageGroup.length);
                }
                else {
                    // when we found ourself, the current is the next image
                    if (foundSelf) {
                        next = getInfo(image, "next", "Next &gt;");
                        // stop searching
                        break;
                    }
                    else {
                        // didn't find ourself yet, so this may be the one before ourself
                        prev = getInfo(image, "prev", "&lt; Prev");
                    }
                }
            }
        }

        imgPreloader = new Image();
        imgPreloader.onload = function(){
            imgPreloader.onload = null;

            // Resizing large images
            var x = $(window).width() - 150;
            var y = $(window).height() - 150;
            var imageWidth = imgPreloader.width;
            var imageHeight = imgPreloader.height;
            if (imageWidth > x) {
                imageHeight = imageHeight * (x / imageWidth);
                imageWidth = x;
                if (imageHeight > y) {
                    imageWidth = imageWidth * (y / imageHeight);
                    imageHeight = y;
                }
            }
            else
                if (imageHeight > y) {
                    imageWidth = imageWidth * (y / imageHeight);
                    imageHeight = y;
                    if (imageWidth > x) {
                        imageHeight = imageHeight * (x / imageWidth);
                        imageWidth = x;
                    }
                }
            // End Resizing

            // TODO don't use globals
            TB_WIDTH = imageWidth + 30;
            TB_HEIGHT = imageHeight + 60;

            // TODO empty window content instead
            get.id("TB_window").innerHTML += "<a href='' id='TB_ImageOff' title='" + POPUP_CLOSE + "'><img id='TB_Image' src='" + url + "' width='" + imageWidth + "' height='" + imageHeight + "' alt='" + caption + "'/></a>" + "<div id='TB_caption'>" + caption + "<div id='TB_secondLine'>" + imageCount + prev.html + next.html + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='" + POPUP_CLOSE + "'>" + POPUP_CLOSE + "</a></div>";
            get.id("TB_window").innerHTML += PRINT_STYLES;
            $("#TB_closeWindowButton").on('click', TB_remove);

            function buildClickHandler(image){
                return function(){
                    $("#TB_window").remove();
                    $('<div />', {'id': 'TB_window'}).appendTo(document.body);

                    TB_show(image.caption, image.url, rel);
                    return false;
                };
            }
            var goPrev = buildClickHandler(prev);
            var goNext = buildClickHandler(next);

            $("#TB_prev").on('click', goPrev);
            $("#TB_next").on('click', goNext);

            $(document).on('keydown', function(event){
                switch (event.keyCode) {
                    case 27:
                        TB_remove();
                        break;
                    case 190:
                        if (get.id('TB_next')) {
                            $(document).unbind('keydown');
                            goNext();
                        }
                        break;
                    case 188:
                        if (get.id('TB_prev')) {
                            $(document).unbind('keydown');
                            goPrev();
                        }
                        break;
                }
            });

            // TODO don't remove loader etc., just hide and show later
            $("#TB_ImageOff").on('click', TB_remove);
            TB_position();
            TB_showWindow();
        }
        imgPreloader.src = url;

    }
    else { //code to show html pages

        TB_WIDTH = (params['width'] * 1) + 30;
        TB_HEIGHT = (params['height'] * 1) + 40;

        var ajaxContentW = TB_WIDTH - 30, ajaxContentH = TB_HEIGHT - 45;

        if(IS_PLAYER){
            get.id("TB_window").innerHTML += "<div id='TB_title'>"+printbtn+"<div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a id='TB_closeWindowButton' href='#'  title='" + POPUP_CLOSE + "' >" + POPUP_CLOSE + "</a></div></div><iframe frameborder='0' hspace='0' src='" + url+ "' id='TB_iframeContent' name='TB_iframeContent' style='margin-top:0px;width:" + (ajaxContentW+5) + "px;height:" + (ajaxContentH+10) + "px;' onload='TB_showWindow()'> </iframe>";
        }else if(IS_ZOOM_OVERLAY){
            get.id("TB_window").innerHTML += "<div id='TB_title' class='hidden'>"+printbtn+"<div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a id='TB_closeWindowButton' href='#'  title='" + POPUP_CLOSE + "' >" + POPUP_CLOSE + "</a></div></div><iframe frameborder='0' hspace='0' src='" + url+ "' id='TB_iframeContent' name='TB_iframeContent' style='margin-top:0px;width:" + (ajaxContentW+5) + "px;height:" + (ajaxContentH+10) + "px;' onload='TB_showWindow()'> </iframe>";
        }else if (url.indexOf('TB_iframe') != -1) {
            urlNoQuery = url.split('TB_');
            // Start Defect 9149
            if(url.indexOf('show')!= -1 && params['show']=='video'){
            	get.id("TB_window").innerHTML += "<div id='TB_title' class='hideIt'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a id='TB_closeWindowButton' href='#'  title='" + POPUP_CLOSE + "' >" + POPUP_CLOSE + "</a></div></div><iframe frameborder='0' hspace='0' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent' style='margin-top:0px;width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;' onload='TB_showWindow()'> </iframe>";
            }
            else{
				get.id("TB_window").innerHTML += "<div id='TB_title'>"+printbtn+"<div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a id='TB_closeWindowButton' href='#'  title='" + POPUP_CLOSE + "' >" + POPUP_CLOSE + "</a></div></div><iframe frameborder='0' hspace='0' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent' style='margin-top:0px;width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;' onload='TB_showWindow()'> </iframe>";
            }
            // End of Defect 9149
        }else if(IS_CART_IN_OVERLAY){
			get.id("TB_window").innerHTML += "<div id='TB_title'>"+printbtn+"<div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' style='font-weight:normal !important;'>" + POPUP_OVERLAY_CLOSE + "</a></div></div><div id='TB_ajaxContent' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px;'></div>";
		}else{
			get.id("TB_window").innerHTML += "<div id='TB_title'>"+printbtn+"<div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>" + POPUP_CLOSE + "</a></div></div><div id='TB_ajaxContent' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px;'></div>";
        }
        get.id("TB_window").innerHTML += PRINT_STYLES;

		if(IS_CART_IN_OVERLAY){
        	 $("#TB_closeWindowButton").on('click', CloseSecureOverlay);
        }else{
        	 $("#TB_closeWindowButton").on('click', TB_remove);
        }

        if (url.indexOf('TB_inline') != -1) {
            get.id("TB_ajaxContent").innerHTML = (get.id(params['inlineId']).innerHTML);
            TB_position();
            TB_showWindow();
        }else if (url.indexOf('TB_iframe') != -1) {
			TB_position();
			if (frames['TB_iframeContent'] == undefined) {//be nice to safari
			    $(document).keyup(function(e){
			        var key = e.keyCode;
			        if (key == 27) {
			            TB_remove()
			        }
			    });
			    TB_showWindow();
			}
		}else{
			  $.ajax({url:url,success:function(result){
			                  $("#TB_ajaxContent").html(result);
			                  queryString = url;
			                  if(null!=url.match(/\?(.+)/)) queryString = url.match(/\?(.+)/)[1];
    						  params = TB_parseQuery(queryString);
    						  if (params['width'] > 0){
    						  	TB_WIDTH = (params['width'] * 1) + 30;
    						  }
    						  if (params['height'] > 0){
        					  	TB_HEIGHT = (params['height'] * 1) + 40;
        					  }
			                  TB_position();
			                  TB_showWindow();
			                   initFunctionsSmoothbox();
			}});

        }
    }
    $(document).on('keyup', function(event){
        if (event.keyCode == 27) { // close
            TB_remove();
        }
    });
}
//helper functions below
function TB_showWindow(){
    if (TB_doneOnce == 0) {
        TB_doneOnce = 1;

        $('#TB_window').css('opacity', 0.0)
        $('#TB_window').fadeTo(250, 1, function(){
			$('#TB_load').remove();
        });

    } else {
        $('#TB_window').css('opacity', 1);
		$('#TB_load').remove();
    }
    if(get.id('TB_iframeContent')!=null){
    	if(get.id('TB_iframeContent').src!=null){
    		if(get.id('TB_iframeContent').src.indexOf("cartOverlay=true")>-1){
				$('#TB_title').css('display', 'none');
 			}
   		 }
   	 }
   	 $("#TB_overlay").on('click', TB_remove);
}
function TB_remove_onclick(arr){
	for(var i =0;i<arr.length;i++){
		if (null != get.id(arr[i])) get.id(arr[i]).onclick = null;
	}
}
function TB_remove(){
	if (document.getElementById('video_bottom') != null && qvp.playerType == 'programweekly') { qvp.destroyVideo(); }
	var clickarr=["TB_overlay", "TB_imageOff", "TB_closeWindowButton", "TB_prev", "TB_next"];
	TB_remove_onclick(clickarr);
    $(document).unbind('keyup');
    $(document).unbind('keydown');

    $('#TB_window').css('opacity', 1);
    $('#TB_window').fadeTo(250, 0, function(){
    	$('#TB_window').remove();
    });

	$('#TB_overlay').css('opacity', 0,6);
	$('#TB_overlay').fadeTo(400, 0, function(){
		$('#TB_overlay').remove();
	});

    $(window).unbind('scroll');
    $(window).unbind('resize');

	$('#TB_HideSelect').remove();

    TB_init();
    TB_doneOnce = 0;

    // This call should not have been added to this function.  This is a generic function to close the overlays.  It is anyones guess
    // what issue this addressed; however, by commenting out this call, it will prohibit new defects from being open when closing overlays (javascript errors).
    //resumePlayer();
    //Defect 8197
    if(typeof video !="undefined" && video.status == 'expandPause'){
    	video.play();
    }

    return false;
}

function TB_position(){
	if (document.getElementById('video_bottom') != null && qvp.playerType == 'programweekly') { qvp.windowResize(); }
	// Defect 9909
	function getOverlayPos(){
		var H_SPACE = 20;
		var MIN_HEIGHT = 300;

		var popWidth = $('#TB_window').width();
		var popHeight = $('#TB_window').height();

		var winWidth = $(window).width();
		var winHeight = $(window).height();

		if(winHeight < MIN_HEIGHT + 2 * H_SPACE){
			// viewport height smaller than to display min overlay(height=300) and the top space is 20, width should be keep
			var h = MIN_HEIGHT;

			var top = $(window).scrollTop() + H_SPACE;
			var left = $(window).scrollLeft() + ($(window).width() - TB_WIDTH) / 2;

			return {'top':top,'left':left, 'width': TB_WIDTH, 'height': h};
		}else if(winHeight >= popHeight + 2 * H_SPACE){
			// viewport height is enough large to display overlay(include space at both top and bottom)
			var top = $(window).scrollTop() + ($(window).height() - TB_HEIGHT) / 2;
			var left = $(window).scrollLeft() + ($(window).width() - TB_WIDTH) / 2;

			return {'top':top,'left':left, 'width': TB_WIDTH, 'height': TB_HEIGHT};
		}else{
			// resize overlay in order to it can be displayed into the viewport, width should be keepped
			var h = winHeight - 2 * H_SPACE;

			var top = $(window).scrollTop() + ($(window).height() - h) / 2;
			var left = $(window).scrollLeft() + ($(window).width() - TB_WIDTH) / 2;
			if(IS_CART_IN_OVERLAY){
				var top = $(window).scrollTop() + ($(window).height() - TB_HEIGHT) / 2;
				return {'top':top,'left':left, 'width': TB_WIDTH, 'height': TB_HEIGHT};
			}else{
				var top = $(window).scrollTop() + ($(window).height() - h) / 2;
				return {'top':top,'left':left, 'width': TB_WIDTH, 'height': h};
			}

		}
	}

//    var pos = getOverlayPos();
	  var pos = null;

	var borderWidth = $('#TB_window').css('border-top-width');
	if(borderWidth){
		borderWidth = parseInt(borderWidth);
	}else{
		borderWidth = 0;
	}

	if(IS_CHOOSEMORE_OVERLAY == true){
		var chooseMoreHeight = MAX_OVERLAY_HEIGHT;
		var chooseMoreTop = $(window).scrollTop();
		var chooseMoreLeft = $(window).scrollLeft() + ($(window).width() - TB_WIDTH) / 2;

		if($(window).height() < MIN_WINDOW_HEIGHT){
			chooseMoreHeight = MIN_OVERLAY_HEIGHT - 2 * borderWidth;
			chooseMoreTop = $(window).scrollTop() - (MIN_OVERLAY_HEIGHT - $(window).height()) - 2 * POPUP_SPACE + 3 * borderWidth;
		}else if($(window).height() >= MAX_OVERLAY_HEIGHT + 2 * POPUP_SPACE + 2 * borderWidth){
			chooseMoreHeight = MAX_OVERLAY_HEIGHT - 2 * borderWidth;
			chooseMoreTop = $(window).scrollTop() + ($(window).height() - (chooseMoreHeight + 2 * borderWidth)) / 2;
		}else{
			chooseMoreHeight = $(window).height() - 2 * POPUP_SPACE - 2 * borderWidth;
			chooseMoreTop = $(window).scrollTop() + ($(window).height() - (chooseMoreHeight + 2 * borderWidth)) / 2;
		}

		var maxWindowWidth = MAX_OVERLAY_WIDTH;
		if(!IS_SEARCH_OVERLAY || (IS_SEARCH_OVERLAY && navigator.appName != "Microsoft Internet Explorer")){
			maxWindowWidth = MAX_OVERLAY_WIDTH - 2 * borderWidth;
		}

	    $('#TB_window').css({
			height: chooseMoreHeight + 'px',
			width: maxWindowWidth + 'px',
			top: chooseMoreTop + 'px',
			left: chooseMoreLeft + 'px',
			"padding-bottom": 0 + 'px'
		});

		$('#TB_ajaxContent').css({
			height: chooseMoreHeight - 22 + 'px',
			"min-height": 272 + 'px',
			"padding-left": 15 + 'px',
			"padding-right": 0 + 'px',
			overflow: 'hidden'
		});

		if(get.id('divNavFacetedPopup')){
			var facetBorderWidth = $('#divNavFacetedPopup').css('border-top-width');
			if(facetBorderWidth)
				facetBorderWidth = parseInt(facetBorderWidth);
			else
				facetBorderWidth = 0;

			var minHeight = MIN_ATTRIBUTES_HEIGHT;
			var maxAttrWidth = MAX_ATTRIBUTES_WIDTH;

			if(!IS_SEARCH_OVERLAY || (IS_SEARCH_OVERLAY && navigator.appName != "Microsoft Internet Explorer")){
				maxAttrWidth = MAX_ATTRIBUTES_WIDTH - 2 * facetBorderWidth;
			}else if(navigator.appName == "Microsoft Internet Explorer"){
				minHeight = MIN_ATTRIBUTES_HEIGHT + 2 * facetBorderWidth;
			}

			if((chooseMoreHeight - (MIN_OVERLAY_HEIGHT - MIN_ATTRIBUTES_HEIGHT) + borderWidth) > 150)
				minHeight = chooseMoreHeight - (MIN_OVERLAY_HEIGHT - MIN_ATTRIBUTES_HEIGHT) + borderWidth;

			$('#divNavFacetedPopup').css({
				"min-height": minHeight + 'px',
				height: minHeight + 'px',
				width: maxAttrWidth + 'px'
			});
		}
	}else{
		pos = getOverlayPos();

	    $('#TB_window').animate({
			//width: TB_WIDTH + 'px',
			//left: ($(window).scrollLeft() + ($(window).width() - TB_WIDTH) / 2) + 'px',
			//top: ($(window).scrollTop() + ($(window).height() - TB_HEIGHT) / 2) + 'px'
			height: (pos.height - borderWidth) + 'px',
			width: pos.width + 'px',
			top: pos.top + 'px',
			left: pos.left + 'px'
		}, 75,0,function(){
			if (document.getElementById('video_bottom') != null && qvp.playerType == 'programweekly') { qvp.windowResize(); }	
		});

		// Defect 9909
		if(get.id('TB_iframeContent')&&!IS_PLAYER){
			$('#TB_iframeContent').animate({
				height: (pos.height - borderWidth) + 'px',
				width: pos.width + 'px',
				top: pos.top + 'px',
				left: pos.left + 'px'
			}, 75,0,function(){
				if (document.getElementById('video_bottom') != null && qvp.playerType == 'programweekly') { qvp.windowResize(); }
			});
		}
        if(IS_AD_CONFIRM_OVERLAY  || IS_WL_CONFIRM_OVERLAY ){
			$('#TB_ajaxContent').css({
			            "padding-left": 0 + 'px',
			            "padding-right": 0 + 'px',
			            height:(pos.height - borderWidth) + 'px',
			            width: pos.width + 'px',
			            overflow: 'hidden'
			});
			parent.$('TB_window').css({
			      "padding-bottom": 0 + 'px'
			});
        }
	}
}

function TB_overlaySize(){
    // we have to set this to 0px before so we can reduce the size / width of the overflow onresize
    $("#TB_overlay").css({
        "height": '0px',
        "width": '0px'
    });
    $("#TB_HideSelect").css({
        "height": '0px',
        "width": '0px'
    });
    $("#TB_overlay").css({
        "height": $(document.body).prop('scrollHeight') + 'px',
        "width": $(document.body).prop('scrollWidth') + 'px'
    });
    $("#TB_HideSelect").css({
        "height": $(document.body).prop('scrollHeight') + 'px',
        "width": $(document.body).prop('scrollWidth') + 'px'
    });
}

function TB_load_position(){
	$("#TB_load").css({
	    left: ($(window).scrollLeft() + ($(window).width() - 56) / 2) + 'px',
	    top: ($(window).scrollTop() + (($(window).height() - 20) / 2)) + 'px',
	    display: "block"
	});
}

function TB_parseQuery(query){
    // return empty object
    if (!query)
        return {};
    var params = {};

    // parse query
    var pairs = query.split(/[;&]/);
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        if (!pair || pair.length != 2)
            continue;
        // unescape both key and value, replace "+" with spaces in value
        params[unescape(pair[0])] = unescape(pair[1]).replace(/\+/g, ' ');
    }
    return params;
}


/*
Script: initFunctionsSmoothbox.js
version: v1.0.0
*/

function initFunctionsSmoothbox(){
	var allTags = getElementsByClass( "stripeTable" );
	for (i=0; i<allTags.length; i++) {
		stripe(allTags[i]);
	}
}

function TB_changeDivContent(newUrl, targetDiv){
	$(targetDiv).load(newUrl);
}

/*
Needs to be in a submit event or the form handler, it fires a fireEvent for the same
To submit  a form to a specicifc DIV with div name
*/
function TB_formSubmitToDiv(formName, targetDiv){
	TB_formSubmitToDivContent(get.id(formName),targetDiv);
}

//With form object
function TB_formSubmitToDivContent(form, targetDiv){
	jQuery.ajax({
		type: 'POST',
		url: form.action,
		data: $(form.id).serialize(),
		success: function(plainData){
			$(targetDiv).html(plainData);
		}
	});
}

function TB_secureSubmitToDivContent(form, targetDiv){
	var secureURI = new URI(form.action);
		secureURI.set('scheme', 'https');

	jQuery.ajax({
		type: 'POST',
		url: secureURI.toString(),
		data: $(form.id).serialize(),
		success: function(plainData){
			$(targetDiv).html(plainData);
		}
	});
}


function getCartOverlayPos(){
		var H_SPACE = 20;
		var MIN_HEIGHT = 300;

		var popWidth = $('#TB_window').width();
		var popHeight = $('#TB_window').height();

		var winWidth = $(window).width();
		var winHeight = $(window).height();

		if(winHeight < MIN_HEIGHT + 2 * H_SPACE){
			// viewport height smaller than to display min overlay(height=300) and the top space is 20, width should be keep
			var h = MIN_HEIGHT;

			var top = $(window).scrollTop() + H_SPACE;
			var left = $(window).scrollLeft() + ($(window).width() - TB_WIDTH) / 2;

			return {'top':top,'left':left, 'width': TB_WIDTH, 'height': h};
		}else if(winHeight >= popHeight + 2 * H_SPACE){
			// viewport height is enough large to display overlay(include space at both top and bottom)
			var top = $(window).scrollTop() + ($(window).height() - TB_HEIGHT) / 2;
			var left = $(window).scrollLeft() + ($(window).width() - TB_WIDTH) / 2;

			return {'top':top,'left':left, 'width': TB_WIDTH, 'height': TB_HEIGHT};
		}else{
			// resize overlay in order to it can be displayed into the viewport, width should be keepped
			var h = winHeight - 2 * H_SPACE;

			var top = $(window).scrollTop() + ($(window).height() - h) / 2;
			var left = $(window).scrollLeft() + ($(window).width() - TB_WIDTH) / 2;

			return {'top':top,'left':left, 'width': TB_WIDTH, 'height': h};
		}
}
function resizeIframe(iframeObj,iframeHeight,iframeWidth){
	if(get.id(iframeObj+'') != null){
		get.id(iframeObj+'').height = iframeHeight+'px';
		get.id(iframeObj+'').style.height = iframeHeight+'px';
		if(document.getElementsByTagName("body")[0] != null){
			document.getElementsByTagName("body")[0].style.height = iframeHeight+'px';
		}
	}else if(parent.get.id(iframeObj+'') != null){
		parent.get.id(iframeObj+'').height = iframeHeight+'px';
		parent.get.id(iframeObj+'').style.height = iframeHeight+'px';
			if(document.getElementsByTagName("body")[0] != null){
				document.getElementsByTagName("body")[0].style.height = iframeHeight+'px';
			}else if(parent.document.getElementsByTagName("body")[0] != null){
				parent.document.getElementsByTagName("body")[0].style.height = iframeHeight+'px';
			}
	}
}
function displayOverlayCloseButton(){
	$('#TB_closeWindowNew').css('display', 'none');
	parent.$('#TB_title').css('display', 'block');
}
function CloseSecureOverlay(){
	var secureOverlayCookie = page.getCookie('secureOverlay');
	if(secureOverlayCookie == 'SpeedBuyVerification'){
		if(typeof SpeedBuyOverlayURL != 'undefined'){
		  cmCreateManualLinkClickTag(SpeedBuyOverlayURL+'&manual_cm_sp=CARTOVERLAY-_-SPEEDBUY-_-CLOSEWINDOW','Close Window from Speed Buy Verification Page','SPEED BUY OVERLAY: LOGIN','P0042');
		  page.setCookie('secureOverlay','',{path:"/", expires: -1});
		}
	}else if(secureOverlayCookie == 'OrderConfirmation'){
		if(typeof SpeedBuyOverlayURL != 'undefined'){
		  cmCreateManualLinkClickTag(OrderOKOverlayURL+'&manual_cm_sp=CARTOVERLAY-_-ORDERCONFIRM-_-CLOSEWINDOW','Close Window from Order Confirmation Page','SPEED BUY OVERLAY: ORDER CONFIRMATION','P0004');
		  page.setCookie('secureOverlay',{path:"/", expires: -1});
		}
	}
	TB_remove();
	return false;
}