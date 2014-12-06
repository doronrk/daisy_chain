// JavaScript Document

jQuery( document ).ready(function( $ ) {
	
		var universalCookieCutterVolControl = Class.create();
	
	
	universalCookieCutterVolControl.prototype = {
	
		initialize:function(CookieVarName,CookieUsedName,CookieValueBase,ForcedModeBaseName,SegmentBreakdown,theEvar,plExcept) {
	
			//Keeping it neat by having two discreet variables that check for and gather cookie information
			this.EvarToUse = theEvar!= ""? theEvar: false;
			this.CookieVariableName = CookieVarName;
			this.CookieUsed = CookieUsedName;
			this.CookieValueBase = CookieValueBase;
			this.SegBreakdown = SegmentBreakdown.split("-");
			this.DoesTheCookieExist = gidLib.getCookieVar(this.CookieUsed, this.CookieVariableName);
			this.RetrievedCookieValue = gidLib.getCookieVar(this.CookieUsed, this.CookieVariableName);
			this.QuickSegment = '';
			this.piperlimeException = plExcept;
			this.userNeedsSync = false;
			this.ForcedModeBase = ForcedModeBaseName;
			this.ModeArrayIndex = this.SegBreakdown.length; //segment breakdown determines how many segments too!
			this.modeArray = new Array();
			this.modeArray[0] = "a";
			this.modeArray[1] = "b";
			this.modeArray[2] = "c";
			this.modeArray[3] = "d";
			
			
			if (location.href.indexOf(this.ForcedModeBase) >= 1) {
				this.forcedMode();
			}else{
				this.cookieScanner();
			}
		},
	
	
		forcedMode:function() {
			
			for (i = 0; i < this.ModeArrayIndex; i++) {
			
				//allow forced mode only to qa.
				//if (location.href.indexOf("gidapps.com") >= 1) {
					if (location.href.indexOf(this.ForcedModeBase + "=" + this.modeArray[i]) >= 1) {
						//alert('you are in segment ' + this.modeArray[i].toUpperCase() + ' / ' + this.SegBreakdown[i] + '% of the population');
						this.UserSegment = this.CookieValueBase + this.modeArray[i].toUpperCase();
						this.QuickSegment = this.modeArray[i].toUpperCase();
					}
				//}
				
			}
			
			
			gidLib.setCookieVar(this.CookieUsed,this.CookieVariableName,this.UserSegment);
			if (this.EvarToUse) {
				
				this.setABTestVariable(this.UserSegment);
			}
	
			userNeedsSync = true;
			
		
		},
	
		cookieScanner:function() {
			
			//If the cookie isn't available, bake one!
			if (this.DoesTheCookieExist) {
	
				if (this.EvarToUse) {
					this.setABTestVariable(this.RetrievedCookieValue);
				}
	
				for (i = 0; i < this.ModeArrayIndex; i++) {
					if (this.RetrievedCookieValue == (this.CookieValueBase + this.modeArray[i].toUpperCase())) {
						this.QuickSegment = this.modeArray[i].toUpperCase();
						break;
					}
				}
	
			} else {
				this.tagManager();
			}
	
		},
	
	
		tagManager:function() {
	
		
			//Breaking out the segmentation into specified percentages
			
			this.Segmentation = Math.floor((Math.random()*100)+1); // chooses 1 to 100
			//alert("Seg: " + this.Segmentation);	
			this.FloorThreshold = 0;
			this.TopThreshold = 0;
			
			for (i = 0; i < this.ModeArrayIndex; i++){
	
				this.TopThreshold = this.FloorThreshold + parseInt(this.SegBreakdown[i]);
	
				if ((this.Segmentation > this.FloorThreshold) && (this.Segmentation <= this.TopThreshold)){
					// put me in this segment
					this.UserSegment = this.CookieValueBase + this.modeArray[i].toUpperCase();
					this.QuickSegment = this.modeArray[i].toUpperCase();
					break;
				} else {
					// add top to floor and try next segment
					this.FloorThreshold = this.TopThreshold;
				}
					
			}
			
			gidLib.setCookieVar(this.CookieUsed,this.CookieVariableName,this.UserSegment);
	
			if (this.EvarToUse) {
				this.setABTestVariable(this.UserSegment);
			}
	
			//userNeedsSync = true;
			//alert("Tag Manager: Cookie set.");
			
		},
		
			setABTestVariable: function(setValue) {
			thisEvar = 'eVar' + this.EvarToUse;
			ABTestVariables[thisEvar] = setValue;
		}
	
		
	}; 

	
//check force Mode in browser &volcontrolPVIDmode=a

PvidCntrl = new universalCookieCutterVolControl("PVIDVOL","mktUniversalPersist","PVIDSEG","volcontrolPVIDmode","50-25-25-0","36","");
	
	if( window["productPage"] != null ) { ///need to add women DP only here
	
	 var thisDivision = "";
    if (window['reportingService']) {
        thisDivision = reportingService.controller.viewManagers.commonViewManager.model.commonChannelName;
    }
    var getDivision = thisDivision;
	if (getDivision == 'Women')  { //|| (getDivision == 'ウィメンズ'))
	
	$.getScript("/Asset_Archive/GPWeb/content/0008/743/835/gap_productvideo_array.js", function(){
		
		
		

			////| 	*** Product Video Loader 10/20/2014 -- by Dan Whalen for GAP WCD *** 	|////
			////| 	Checks product color code array (pid value) for video, replaces			|//// 
			////| 	AV9 input with video play button/video poster, builds/places 			|////
			////| 	video HTML5 element and extends color swatch/size tabs mouse events		|////
	var pVidT = false;		
			
	
	
			function getUrlParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam)
		{
            return sParameterName[1];
			}
		}
}

	var pidVal = getUrlParameter('pid');
	//var cidVal = getUrlParameter('cid');
	//var vidVal = getUrlParameter('vid');
	//var verVal = window.location.hash.substr(1);
	//var filVal = '';
	
	if(jQuery.inArray(pidVal, pVidArray) > -1) {
		
		pVidT = true;
		
		var prodVidLoader =	function() {
		
		
		
		//INSER VIDEO 
		var insertProdVid = function(){
		
	//**FIND/REPLACE AV9	
	
		$('#imageThumbs').each(function(i) {
    	if ($(this).children('input[thumbtype="AV9"]').length != 0) {
    
    	var isAv9 = $(this).children('input[thumbtype="AV9"]');
		var posterBG = ('/Asset_Archive/GPWeb/content/0008/743/835/assets/video/' + pidVal + '_m.jpg');
		isAv9.replaceWith('<div id="vidTrigger" class="thumbs vidThumb"><img id="playbuttonImg" src ="/Asset_Archive/GPWeb/content/0008/743/835/assets/vidbtn51c.png" style="position:absolute; left:0px; top:0px;"/></div>');
		$( '#vidTrigger' ).css('background-image', 'url(' + posterBG + ')');

		    }
		});
		
 
		//**INSERT VIDEO CONTAINER
 
 		if ($( '#prodVidLG' ).length) {
 			//if it exists do nothing	
				}
		else {
			//else build it
 $( '#product_image_bg' ).prepend( "<video id='prodVidLG' poster='\/Asset_Archive\/GPWeb\/content\/0008\/743\/835\/assets\/video\/" + pidVal + "_m.jpg' crossorigin='anonymous' loop><source src='\/Asset_Archive\/GPWeb\/content\/0008\/743\/835\/assets\/video\/" + pidVal + "_m.mp4' type='video\/mp4'><source src='\/Asset_Archive\/GPWeb\/content\/0008\/743\/835\/assets\/video\/" + pidVal + "_m.webm' type='video\/webm'>Your browser does not support the video tag. </video>" );
				
				}
				/*<track src='\/Asset_Archive\/GPWeb\/content\/0008\/743\/835\/assets\/video\/prodVidCC.vtt' kind='subtitles' srclang='en' label='English' default/>*/
				
								
		//***VIDEO THUMB***//
	var pvid = {
		vidState: $( '#product_image_bg video' ),
		vidBtn: $( '#playbuttonImg' ),
		vidTrig: $( '#vidTrigger' ),
		thumbState: $( "input[class*='thumb']" ),
		dragState: $('#dragLayer'),
		toolState: $( '#imageTools' ),
	
	}

		//***VIDEO ELEMENT AND CONTROLS***///	
pvid.vidTrig.mouseover(function() {
  	pvid.vidState.css( 'visibility', 'visible' );
	
	if ( !pvid.vidTrig.hasClass( "vidThumbA" ) ) {
		pvid.vidTrig.attr( 'class', 'thumbSelected vidThumb' );
	}
	
 	
	if ( pvid.vidState.get(0).paused ) {
	  pvid.vidBtn.css( 'top', '-51px' );//play b
 		 }
  	else {
	  pvid.vidBtn.css( 'top', '-154px' );//pause a
	}
  
	});

pvid.vidTrig.mouseout(function() {
	
	if ( !pvid.vidTrig.hasClass( "vidThumbA" ) ) {
	pvid.vidState.css( 'visibility', 'hidden' );
	pvid.vidTrig.attr( 'class', 'thumbs vidThumb' );
	}
  
	if ( pvid.vidState.get(0).paused ) {
	pvid.vidBtn.css( 'top', '0px' );//play b
		}
	else {
	pvid.vidBtn.css( 'top', '-102px' )//pause b
		}
  
	});


pvid.vidTrig.click(function () {
	pvid.dragState.hide();
	pvid.toolState.css( 'visibility', 'hidden' );
	pvid.thumbState.attr( 'class', 'thumbs' );
	pvid.vidTrig.attr( 'class', 'thumbSelected vidThumbA' );
	pvid.vidState.css( 'visibility', 'visible' );
	
	if ( pvid.vidState.get(0).paused ) {
    pvid.vidState.get(0).play(); 
	pvid.vidBtn.css( 'top', '-102px' );
		}
    else {
	pvid.vidState.get(0).pause();
	pvid.vidBtn.css( 'top', '-51px' );
		}
	});
	
pvid.thumbState.mouseover(function () {
					
	pvid.vidState.css('visibility', 'hidden');
				
	});
	
pvid.thumbState.mouseout(function () {
		
	if ( pvid.vidTrig.hasClass( 'vidThumbA' ) ) {
	pvid.thumbState.attr( 'class', 'thumbs' );
	pvid.vidState.css( 'visibility', 'visible' );
		};
				
					
					
	});
	
pvid.thumbState.click(function () {
	
	if ( pvid.vidState.get(0).play ) {
    pvid.vidState.get(0).pause();
	pvid.vidState.get(0).currentTime = 2.75305;
	pvid.vidBtn.css( 'top', '0px' );  
   		};
			
	pvid.vidState.css( 'visibility', 'hidden' );
	pvid.vidTrig.attr( 'class', 'thumbs vidThumb' );
	pvid.toolState.css( 'visibility', 'visible' );
	pvid.dragState.show();
	
		 });	
	
	 $( '#product_image_bg video' ).bind('contextmenu', function() 
    {
        return false;
    }); 	
	} //end insertProdVid
	insertProdVid();
	
		}	

var PvidVolCntrlTest = function() {

	var VolControlSegment = gidLib.getCookieVar("mktUniversalPersist", "PVIDVOL");
	
	if (window['is_ie_lt9'] != undefined) {
		
		VolControlSegment = "PVIDSEGD"
	}
	
	else if (VolControlSegment == "PVIDSEGA") {
		//hide AV9
		setTimeout(function() {
			//check if AV9 exists && is in video array
		if ( $('input[thumbtype="AV9"]').length && ( pVidT = true )) {	
      $('input[thumbtype="AV9"]').hide();
		}
			}, 2000);
	} 
	else if (VolControlSegment == "PVIDSEGB"){
		//run the pvid test
		setTimeout(prodVidLoader, 2000);
		
	}

	else if (VolControlSegment == "PVIDSEGC"){
		//show only 1 and vid
		setTimeout(function() {
      $('div#imageThumbs input:not([thumbtype="AV9"]):not([thumbtype="T"])').hide()
	  prodVidLoader();
			}, 2000);
	}
	else if (VolControlSegment == "PVIDSEGD"){
		//do not show in IE8 or less
		setTimeout(function() {
			if ( $('input[thumbtype="AV9"]').length && ( pVidT = true ))  {	
      $('input[thumbtype="AV9"]').hide();
	  //console.log(pVidT);
				}
			}, 2000);
		
	}
	else {
		setTimeout(function() {
			if ( $('input[thumbtype="AV9"]').length  && ( pVidT = true )) {	
      $('input[thumbtype="AV9"]').hide();
			}
			}, 2000);
	}
	
}		
PvidVolCntrlTest();		
		
		//Handle Color/Size events
		var hideTypeSeg = gidLib.getCookieVar("mktUniversalPersist", "PVIDVOL");
		var old_setColor = productPage.setColor;
	
	productPage.setColor = function() {
		
		//console.log("Before1");
		
		var result = old_setColor.apply(this, arguments);
		if (hideTypeSeg == 'PVIDSEGB') {
			prodVidLoader();
			}
		
		else if ((hideTypeSeg == 'PVIDSEGA') || (hideTypeSeg == 'PVIDSEGD')) {
			if ( $('input[thumbtype="AV9"]').length && ( pVidT = true ))  {
			$('input[thumbtype="AV9"]').hide();
			//console.log("in array2");
				}
			}
	
		else if (hideTypeSeg == 'PVIDSEGC') {
			$('div#imageThumbs input:not([thumbtype="AV9"]):not([thumbtype="T"])').hide()
			prodVidLoader();
			}
		}
	
	var old_varient = productPage.loadVariantProduct;
	
	productPage.loadVariantProduct = function() {
		
		//console.log("Before2");
		
		var varient = old_varient.apply(this, arguments);
		
		if (hideTypeSeg == 'PVIDSEGB') {
			prodVidLoader();
			}
		
		
		else if ((hideTypeSeg == 'PVIDSEGA') || (hideTypeSeg == 'PVIDSEGD')) {
			if ( $('input[thumbtype="AV9"]').length && ( pVidT = true ))  {
			$('input[thumbtype="AV9"]').hide();
			
			}
		}
	
		else if (hideTypeSeg == 'PVIDSEGC') {
			$('div#imageThumbs input:not([thumbtype="AV9"]):not([thumbtype="T"])').hide()
			prodVidLoader();
			}
		
		}
		
		
		
		
		
	}

});
  
	}
  }
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e)
{
    $('#dragLayer').hide();
});

  });
