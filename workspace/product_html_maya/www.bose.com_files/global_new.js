// jQuery.noConflict();

/***
** title: Rollover Image Swap
** author: Dan DeRose
** company: Bose Corporation
** requires: jQuery 1.3.2+
** last updated: 12/15/2011
** description: Creates a rollover behavior on any image with the class "rollover". The rollover image MUST use the naming convention of [orginal_filename]_over.[ext]
***/

jQuery(function($) {
    if($("img")) {
    	$("img").closest('.rollover').hover(
    		function() {
    			sExt = this.src.substr(this.src.lastIndexOf('.'));
    			this.src = this.src.replace(sExt,"_over" + sExt);
    		},
    		function() {
    			this.src = this.src.replace("_over.",".");
    		}
    	);
    }
});

/*--------------------------------------------------------------------------------------------------------*//***
** title: Disjointed Rollover Image Swap
** author: Dan DeRose
** company: Bose Corporation
** requires: jQuery 1.7+
** last updated: 12/15/2011
** description: Creates a disjointed rollover behavior (rollover one image, another image changes) on any image with the class "disjointed". The id of the disjointed image is stored in the data attribute "data-disjointed". For example, <img src="test.png" class="disjointed" data-disjointed="testimage" />. The rollover image MUST use the naming convention of [orginal_filename]_over.[ext]
***/

jQuery(function($) {
    if($("img,div")) {
    	$("img,div").closest('.disjointed').hover(
    		function() {
    			var disjointedImage = document.getElementById($(this).data('disjointed'));
    			sExt = disjointedImage.src.substr(disjointedImage.src.lastIndexOf('.'));
    			disjointedImage.src = disjointedImage.src.replace(sExt,"_over" + sExt);
    		},
    		function() {
    			var disjointedImage = document.getElementById($(this).data('disjointed'));
    			disjointedImage.src = disjointedImage.src.replace("_over.",".");
    		}
    	);
    }
});



/*--------------------------------------------------------------------------------------------------------*//***
** title: Cookie functions
** description: A series of functions for getting, setting, updating and deleting cookies
***/

function setCookie (name,value,expires,path,domain,secure) {
    //test for params and set if provided
    document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

function checkForCookie(strCookieName) {
    var objAllCookies = document.cookie;
    var checkPos = objAllCookies.indexOf(strCookieName);
    if (checkPos != -1) {
        return true;
    }
    return false;
}

function getCookieValue (offset) {
    var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}

function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    if((document.cookie == null) || (document.cookie.length == null)) {
        return null;
    }
    var i = 0;
    while (i < clen) {
        var j = i + alen;

        if (document.cookie.substring(i,j) == arg) {
			return getCookieValue(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) {
            break;
        }
    }
    return null;
}

function deleteCookieNow(strName) {
    document.cookie=strName + "=;expires=-1;path=/";
}

/***
** title: 
** description: 
** usage: 
***/
function isSurveyShown() {
    var blnSurveyShown = false;

    //new generic survey shown cookie name
    var surveyShownCookieName = "SurveyShown";

    //legacy survey shown cookie names
    var dtcSurveyShownCookieName = "DTCShopSurveyShown";
    var foreseeSurveyShownCookieName = "ForeseeSurveyShown_wkpxs8EF00";

    //all legacy survey shown cookies will expire by this time
    var intLegacySurveyCookieMaxExpireTime = (new Date(2008,2,1)).getTime();
    var intNow = (new Date()).getTime();

    //check for new generic survey shown cookie...
    if(getCookie(surveyShownCookieName) != null) {
        blnSurveyShown = true;
    }

    //check for legacy survey shown cookies...
    if(intNow < intLegacySurveyCookieMaxExpireTime) {

        if(getCookie(dtcSurveyShownCookieName) != null) {
            blnSurveyShown = true;
            processLegacySurveyCookie(dtcSurveyShownCookieName);
        }

        if(getCookie(foreseeSurveyShownCookieName) != null) {
            blnSurveyShown = true;
            processLegacySurveyCookie(foreseeSurveyShownCookieName);
        }
    }

    return blnSurveyShown;
}



//GENERIC METHOD FOR SETTING/UPDATING SITE CATALYST GLOBAL VARIABLES
// author - MPL
// param strPropertyName - the string name of the global Site Catalyst variable to be set
// param strPropertyValue - the string representation of the value the global Site Catalyst variable is set to
// see /jsp/includes/tracking/tracking_values.jsp for a listing of all Site Catalyst variables
function updateSiteCatalystProperty(strPropertyName, strPropertyValue) {
    var strLocalPropName = strPropertyName;
    var strLocalPropValue = strPropertyValue;
        
    if ((!strLocalPropName) || (!strLocalPropValue)) {
        //do nothing and leave early - property name or property value is null or empty...
        return;
    }
    else {
        if (eval(strLocalPropName) == '') {
           //property value has not been set already, so just set it to property value passed in 
           eval(strLocalPropName + ' = "' + strLocalPropValue + '"');
        }
        else {
           //property value has been set already, so must concatenate ";" + property value passed in
           eval(strLocalPropName + ' += ";' + strLocalPropValue + '"');
        }
    }
}

/***
** title: Validate email address
** description: function to validate email in form, returns TRUE if email is valid
***/

function is_valid_email (email) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
}



//HEADER DROPDOWN FUNCTIONS
//Author - Justin Schwenk
//Date - 5/1/13

jQuery(document).ready(function($) {

    //Append a "hider" div that covers the bottom border of the nav when
    //hovering over the dropdown menus. Creating it here in order to
    //keep the markup clean
    $('#productNav>ul>li').hover(
        function() {$(this).append('<div class="hider"></div>')},
        function() {$('.hider').remove()
    });


    //Add and remove the default messaging from the header/footer input boxes
    $('#searchform #words').focus(function() {
        if(this.value=='Search')
            this.value='';
    }).blur(function() {
        if(this.value=='')
            this.value='Search';
    });

    $('#emailForm #enews').focus(function() {
        if(this.value=='Your email address')
            this.value='';
    }).blur(function() {
        if(this.value=='')
            this.value='Your email address';
    });


    //Create flyout images for the main nav and position everything correctly
    $('#productNav .hasImage').hover(
        function() {
            var navImage = $(this).find('.navImage');
            navImage.css('top', -$(this).position().top);

            var menuHeight = Math.floor($(this).parent().height());
            var navImageHeight = Math.floor(navImage.height());

            if(menuHeight > navImageHeight) {navImage.css('height', menuHeight);}
            else if(menuHeight < navImageHeight){$(this).parent().css('height', navImageHeight);}

            navImage.show();
        },
        function() {
            var navImage = $(this).find('.navImage');
            navImage.hide();
    });

    if (typeof sPageID === 'undefined') {
        var sPageID;
        sPageID = s.pageName;
    } 
    //Highlight the correct nav item when we drill down to the subcats and product pages
    if(sPageID.indexOf(":Wave Systems:") != -1) {$('#menuWave>a').addClass('tabStateOn')}
    else if(sPageID.indexOf(":Headphones:") != -1) {$('#menuHeadphones>a').addClass('tabStateOn')}
    else if(sPageID.indexOf(":Home Theater:") != -1) {$('#menuHomeTheater>a').addClass('tabStateOn')}
    else if(sPageID.indexOf(":Digital Music Systems:") != -1) {$('#menuBluetooth>a').addClass('tabStateOn')}
    else if(sPageID.indexOf(":Wifi Music Systems:") != -1) {$('#menuWifi>a').addClass('tabStateOn')}
    else if(sPageID.indexOf(":Speakers:") != -1) {$('#menuSpeakers>a').addClass('tabStateOn')}
    else if(sPageID.indexOf(":Mobile:") != -1) {$('#menuMobile>a').addClass('tabStateOn')}
    else {
        $('#menuWave>a').removeClass('tabStateOn');
        $('#menuHeadphones>a').removeClass('tabStateOn');
        $('#menuHomeTheater>a').removeClass('tabStateOn');
        $('#menuBluetooth>a').removeClass('tabStateOn');
        $('#menuWifi>a').removeClass('tabStateOn');
        $('#menuSpeakers>a').removeClass('tabStateOn');
        $('#menuMobile>a').removeClass('tabStateOn');
    }
    


    //Stop the default click behavior on nav links that are just dropdown headers
    $("#noLink").click(function(e){e.preventDefault();});


});


/*------------------------------------------------------------------
5/31/13 - js70565 
I added these three functions from global.js because they're needed for
the email signup in the footer. Otherwise, global.js would have needed 
to have been included globally, and I wasn't sure if that would break 
things on pages that weren't meant to have it (i.e. new product pages). 
Because of the time constraint for Squid, this is the workaround. 
However, this should be cleaned up at a future date.
------------------------------------------------------------------*/
var objChildWindow;
function doChildWindow(strURL, objWin, strOptions) {
    //check for open windows and close them
    if (objChildWindow && objChildWindow.closed == false) {
        objChildWindow.close();

        objChildWindow = window.open(strURL, objWin, strOptions);
        objChildWindow.focus();
    }
    else {
        objChildWindow = window.open(strURL, objWin, strOptions);
        objChildWindow.focus();
    }
}

//GLOBAL NEW WINDOW
function openNewWin(strURL, intWidth, intHeight) {
    var strOptions;
    //check for parameters and set defaults
    if ((intWidth == '') || (intHeight == '')) {
        strOptions = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=100,top=100,width=615,height=345";
    }
    else {
        intWidth += 45;
        intHeight += 45;
        strOptions = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=100,top=100,width=" + intWidth + ",height=" + intHeight;
    }
    doChildWindow(strURL, 'child_window', strOptions);
    objChildWindow.focus();
}

//EMAIL NEWS LETTER EMAIL VALIDATE
function checkInputEmail(theForm) {
    if ((theForm.enews.value=="") || (theForm.enews.value.indexOf("@") == -1) || (theForm.enews.value.indexOf(".") == -1)) {
        alert("Please enter a valid email address");
        return false;
    }
    return true;
}

/* Compatibility View message */
jQuery(document).ready(function($) {
	var agentStr = navigator.userAgent;
	if (agentStr.indexOf("MSIE 7.0") > -1) {
		if (agentStr.indexOf("Trident/6.0") > -1 || agentStr.indexOf("Trident/5.0") > -1 || agentStr.indexOf("Trident/4.0") > -1) {
			/* IE10 CV or IE9 CV or IE8*/
			var cvmsg = $('<p class="cvmsg">You\'re browsing Bose.com using Internet Explorer\'s <i>Compatibility View</i>. This can compromise certain site features. For the best experience, turn off <i>Compatibility View</i> by clicking the <img src="/assets/images/icons/icon_cv.png" alt="cv icon" /> icon in the address bar. <a href="/customer_service/site_help/compatibility_view.jsp" class="popup" rel="600,600,new">Don\'t see the icon</a>?</p>');
			$('body').prepend(cvmsg);
		} else {
			/* IE7 */
		}
	}
	
});

// BP 20130614
// Custom replacement for prototype's PeriodicalExecuter
if (typeof(PeriodicalExecuter) == 'undefined') {
	var PeriodicalExecuter = function(callback, frequency, tries) {
		if (typeof(tries) == 'undefined') {
			tries = 100;
		}
		var thisPE = {};
		thisPE.trycount = 0;
		thisPE.id = setInterval(function(){
			thisPE.trycount++;
			if (thisPE.trycount > tries) {
				thisPE.stop();
			} else {
				callback(thisPE);
			}
		}, frequency*1000);
		thisPE.stop = function(){
			clearInterval(thisPE.id);
		};
	}
}


/*--------------------------------------------------------------------------------------------------------*//***
** title: Global Brightcove Functionality
** author: Laura Vecchio
** company: Bose Corporation
** requires: jQuery 1.5+
** last updated: 3.13.2014
** description: Opens a Brightcove video in an overlay and tracks data to Adobe Analytics if Brightcove contains the following parameters:
** TO DO: ALL Brightcove videos could be using these API variables. Need to clean-up one-offs (i.e. wifi music systems page)
***/

var player;
var modVP;
var modExp;
var modCon;

function myTemplateLoaded(experienceID) {
    player = brightcove.api.getExperience(experienceID);
    modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    modCon = player.getModule(brightcove.api.modules.APIModules.CONTENT);
    modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, onTemplateReady);
}

function onTemplateReady(evt) {
    // these calls reference functions within the global s_code.js (siteCatalystH9Code.js) 
    // and are necessary to track Brightcove views to Adobe Analytics
    modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, onPlay);
    modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, onStop);
}

function removeBrightcove(evt){
    // pause video
    modVP.pause(); //dispatches MediaEvent.STOP

    // remove event listeners
    modExp.removeEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, onTemplateReady);
    modVP.removeEventListener(brightcove.api.events.MediaEvent.PLAY, onPlay);
    modVP.removeEventListener(brightcove.api.events.MediaEvent.STOP, onStop);

    // reset global API variables
    player = undefined;
    modVP = undefined;
    modExp = undefined;
    modCon = undefined;
}

function brightcoveLauncher(playerType, videoID, playlistID, lightboxTitle, lightboxTracking) {
        var playerID;
        var playerKey;
        var brightcoveEmbed;
        var language;
        var videoType;
        var videoTypeValue;
        var playerHeight;
        var playerWidth;
        var lightboxHeight;
        var lightboxWidth;
        var currentPageName = s.pageName; // Store current s.pageName

        // NOTE: Each location of the site has it's own brightcove player, if adding a video to a location that isn't listed below, 
        // you must go into Brightcove to create a player for that site section.
        switch(playerType) {
            case "subcat":
            playerID = "2680613150001";
            playerKey = "AQ~~,AAABIKMQ3ok~,EGcfgWRfXHIKTBzl3M9UOdfqQN2YTtoz";
            break;
            case "shoponline":
            playerID = "2686330332001";
            playerKey = "AQ~~,AAABIKMQ3ok~,EGcfgWRfXHL_T6GqJbwjTSMPCc6qXY-e";
            break;
        }

        // determines if player is a single video or playlist player and updates params accordingly
        if(videoID != null) {
            videoParam = '@videoPlayer';
            videoParamValue = videoID;
            playerHeight = '360';
            playerWidth = '640';
            lightboxWidth = '651';
            lightboxHeight = '375';
            jQuery('#brightcove_video_gallery .brightcove_player').addClass('single_video');

        } else {
            videoParam = '@videoList';
            videoParamValue = playlistID;
            playerHeight = '620';
            playerWidth = '650';
            lightboxWidth = '651';
            lightboxHeight = '631';
        }

        // build Brightcove embed code with new params
        brightcoveEmbed = "<object id='myExperience' class='BrightcoveExperience'>"
                            + "<param name='htmlFallback' value='true' />"
                            + "<param name='bgcolor' value='#FFFFFF' />"
                            + "<param name='width' value='"+playerWidth+"' />"
                            + "<param name='height' value='"+playerHeight+"' />"
                            + "<param name='playerID' value='"+playerID+"' />"
                            + "<param name='playerKey' value='"+playerKey+"' />"
                            + "<param name='isVid' value='true' />"
                            + "<param name='isUI' value='true' />"
                            + "<param name='dynamicStreaming' value='true' />"
                            + "<param name='includeAPI' value='true' />"
                            + "<param name='templateLoadHandler' value='myTemplateLoaded' />"
                            + "<param name='"+videoParam+"' value='"+videoParamValue+"'>"
                            + "</object>"

        // check to ensure brightcove lightbox container
        if(jQuery('#brightcove_video_gallery').length > 0) {
            // brightcove wrapper is on the page
        } else {
            console.log("BRIGHTCOVE ERROR: Lightbox container not on page.");
            return false;
        }

        // append new Brightcove embed to hidden container on page 
        jQuery(brightcoveEmbed).appendTo(jQuery('#brightcove_video_gallery .brightcove_player'));

        // launch lightbox
        objLightbox = new lightbox();
        objLightbox.callLightbox('#brightcove_video_gallery', lightboxWidth, lightboxHeight, lightboxTitle);
        brightcove.createExperiences();

        // send lightbox call to SiteCatalyst
        s.pageName = lightboxTracking;
        s.t();
    
        // Set s.pageName back to original value
        s.pageName = currentPageName;

}


// if Brightcove video class exists, delegate click function
jQuery(document).ready(function($) {

    jQuery('a.brightcove_player').on('click', function(e) {

        // prevent default <a> functionality
        e.preventDefault();

        var _this = jQuery(this);
        var playerType = _this.data('player_type');
        var videoID = _this.data('bc_video_id');
        var playlistID = _this.data('bc_playlist_id');
        var lightboxTitle = _this.attr('title');
        var lightboxTracking = _this.data('showcase_asset_tracking');

        // launch Brightcove video in lightbox
        brightcoveLauncher(playerType, videoID, playlistID, lightboxTitle, lightboxTracking);
    });

});
