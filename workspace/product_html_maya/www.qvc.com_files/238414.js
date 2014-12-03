if($('.garmentMessage').length) 
{
	element1=$('.garmentMessage')[0];
	element2=element1.innerHTML.replace(/TB_show/,'TB_chat');
	element1.innerHTML=element2;
}


function TB_chat(caption, url, rel){
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
	
		
  d=document.getElementById('TB_title');
     //   e=d.getElementsByTagName('h3')[0];
        d.insertAdjacentHTML('beforeend','<div class="eGainChatImage" id="chat-available" style="display:none;position: absolute;top: 0px;left: 500px;"><a href="#" manual_cm_sp="LIVECHAT-_-STATIC-_-REQUESTED" onclick="cmCreateManualLinkClickTag(&apos;?cm_sp=LIVECHAT-_-STATIC-_-REQUESTED&apos;,null,&apos; &apos;,&apos; &apos;);openHelp()" style="cursor:hand"><img alt="Need Help? Chat now" id="eGainChatLink" src="https://images.qvc.com/is/image/pic/chat/chatNow_updated.jpg?qlt=95,1" title="Need Help? Chat Now" style="height:30px"/></a></div><div class="eGainChatImage" id="chat-offhours" style="display:none;position: absolute;top: 0px;left: 350px;"><img src="https://images.qvc.com/is/image/pic/chat/chatOffhours_updated.jpg?qlt=97,1" alt="Need Help? Give us a call at 888.345.5788" title="Need Help? Give us a call at 888.345.5788"/></div><div class="eGainChatImage" id="chat-unavailable" style="display:none;position: absolute;top: 0px;left: 350px;"><img src="https://images.qvc.com/is/image/pic/chat/chatOffhours_updated.jpg?qlt=97,1" alt="Need Help? Give us a call at 888.345.5788" title="Need Help? Give us a call at 888.345.5788"/></div>');



    var eglvchathandle = null;
	
		function eglv_displayChatLink( available ){
			if (available === "true") {
			document.getElementById('chat-available').style.display = 'block';
			cmCreateElementTag('CHAT:AVAILABLE', 'STATIC CHAT');
			} else if (available === "off hours") {
			document.getElementById('chat-offhours').style.display = 'block';
			cmCreateElementTag('CHAT:OFF HOURS', 'STATIC CHAT');
			} else {
			document.getElementById('chat-unavailable').style.display = 'block';
			cmCreateElementTag('CHAT:UNAVAILABLE', 'STATIC CHAT');
			}
			}
	
		var entrypoint;
		//var serverName = "dev.qvcchat.com"; //test server
		var serverName = 'live.qvcchat.com'; //production
		var templateName = "QVC";
		
	
				
		page.onReady((function(){		
			var pageID, entryPointID, cmPID;		
			if (typeof(window.coremetrics) != 'undefined') {
					cmPID = window.coremetrics.cmLastReferencedPageID;
			} else {
					cmPID = '';
			}
				if (cmPID == "undefined" || cmPID == null || cmPID == '') {			
					pageID = 'Non Checkout: Login Page';
				} else { 
					pageID = new String(window.coremetrics.cmLastReferencedPageID);
				}
				
				
				if (pageID == 'MASTHEAD: LOGIN' || pageID == 'ORDER STATUS: LOGIN' || pageID == 'WISHLIST: LOGIN' || pageID == 'ACCOUNT MAINTENANCE: LOGIN' || pageID == 'ADDRESS BOOK: LOGIN' || pageID == 'REMINDERS: LOGIN' || pageID == 'EMAIL SERVICES: LOGIN' || pageID == 'MOBILE SERVICES: LOGIN') {
					entryPointID = 'Non Checkout: Login Page';
				} else {
					entryPointID = pageID.trim();
				}
				
				window.setTimeout(function(){eglv_checkAgentAvailability(entryPointID)}, 5);
				
			
		})());			
				
		function eglv_checkAgentAvailability(entryPointID){	
			switch (entryPointID)
			{
				case "CHECKOUT: LOGIN": entrypoint = 1001;
					break;
				case "NEW MEMBER CHECKOUT: BILL-TO SHIP-TO": entrypoint = 1002;
					break;
				case "CHECKOUT: BILL-TO SHIP-TO": entrypoint = 1003;
					break;
				case "CHECKOUT: SHIPPING METHOD": entrypoint = 1004;
					break;
				case "NEW MEMBER CHECKOUT: SHIPPING METHOD": entrypoint = 1004;
					break;
				case "CHECKOUT: PAYMENT METHOD": entrypoint = 1005;
					break;
				case "NEW MEMBER CHECKOUT: PAYMENT METHOD": entrypoint = 1005;
					break;
				case "CHECKOUT: SUBMIT ORDER": entrypoint = 1006;
					break;
				case "NEW MEMBER CHECKOUT: SUBMIT ORDER": entrypoint = 1006;
					break;
				case "CHECKOUT: ORDER CONFIRMATION": entrypoint = 1007;
					break;
				case "NEW MEMBER CHECKOUT: ORDER CONFIRMATION": entrypoint = 1007;
					break;	
				case "NAVIGATION - Customer Service > Contact Us > Email": entrypoint = 1009;
					break;	
				case "NAVIGATION - Customer Service": entrypoint = 1013;
					break;				
				case "Non Checkout: Login Page": entrypoint = 1008;
					break;
				default:  entrypoint = 1008; // Defaults to Non checkout entry point
			}
			 	var script = document.createElement("script");
			 	script.src = "https://" + serverName + "/agentavail.aspx?epid=" + entrypoint;    
   	 		document.body.appendChild(script);
			
			
	
		}

    function openHelp( ) {
    	try{
      	if( eglvchathandle != null && eglvchathandle.closed == false ){
        	eglvchathandle.focus();
          return;
        }
      }
      catch(err){}

			if (typeof(window.coremetrics) != 'undefined') {
					cmPID = window.coremetrics.cmLastReferencedPageID;
			} else {
					cmPID = '';
			}
			var refererName = cmPID;
			refererName = encodeURIComponent(refererName);			
			var refererurl = encodeURIComponent(document.location.href);
			var hashIndex = refererurl.lastIndexOf('#');
			if(hashIndex != -1){
			    refererurl = refererurl.substring(0,hashIndex);
			}
			
			var eglvcaseid = (/eglvcaseid=[0-9]*/gi).exec(window.location.search);
			var vhtIds = '';
			if(typeof EGAINCLOUD != "undefined" && EGAINCLOUD.Account.getAllIds)
			{
				var ids = EGAINCLOUD.Account.getAllIds();
			  vhtIds = '&aId=' + ids.a + '&sId=' + ids.s +'&uId=' + ids.u;
			}
		
		 	//Server name, template name, and entry point ID will be updated per the production environment. 
		 	var eGainChatUrl = 'https://'+serverName+'/system/templates/chat/'+templateName+'/chat.html?entryPointId='+entrypoint+'&templateName='+templateName+'&languageCode=en&countryCode=US&ver=v11&eglvrefname='+refererName+'&'+eglvcaseid+vhtIds + '&launchChat=STATIC';
		 	if( (eGainChatUrl + refererurl).length <= 2000) {
     		eGainChatUrl += '&referer='+refererurl;
     	}
     	var params = "height=623,width=419,resizable=yes,scrollbars=yes,toolbar=no";
     	
     	eglvchathandle = window.open( eGainChatUrl,'',params)
    }
	
		
}
