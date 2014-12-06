/*
	Project/Purpose:
		WCS 7 Video Player

	Description:
		wcs7 playVideo() replacement.

	Notes:
		* To switch between the new WCS7 layout and the old WCS5.6 layout, 
		  change "$.fancybox( wcs56VPHtml" to "$.fancybox( wcs7VPHtml" in the 
		  playVideo() function.
		* These functions are in global scope to continue to be backwards
		  compatible.

	Last Updated for Release:
		WCS 7

	$Last Updated: 20-May-2011 12:39:45PM $

*/
var isPlayerAdded = false, playerName='';
function playVideo(vidID) {

	var closeBtnHtml = '<span class="fbVideoClose"><a href="#">CLOSE <span class="thdOrange">X</span></a></span>',
		//wcs56VPHtml = '<div id="videoPlaceHolder">'+closeBtnHtml+'<!-- The video gets placed here automagically --></div>',
		wcs56VPHtml = '<div id="videoPlaceHolder"><!-- The video gets placed here automagically --></div>',
		wcs7VPHtml = '<div id="videoContainer" class="clearfix">'+
			'<div class="videoTop">'+
				closeBtnHtml + 
				'<h1>{videoTitle}</h1>'+
				'<div id="videoPlaceHolder"><!-- The video gets placed here automagically --></div>'+
				'<p>{sample text} <a href="#" class="carrot">Learn More</a></p>'+
			'</div>'+
			'<div class="videoBottom">'+
				'<div class="videoRotatorContainer clearfix">'+
					'<h3 class="large b">Related To This Video</h3>'+
					'<ul id="videoRelatedThumbs">'+
						'<li><img src="http://dummyimage.com/85x50/99ccff" /></li>'+
					'</ul>'+
				'</div>'+
				'<div class="videoSocialBox">&nbsp;'+
				'</div>'+
				'<div id="videoRotatorInfo">'+
				'</div>'+
			'</div>'+
		'</div>',
		//vpOverlayConfig = $.extend(true, {}, overlayConfigs.modal,{
		//vpOverlayConfig = $.extend(true, {}, THD.Global.overlayConfigs.modal,{
		vpOverlayConfig = $.extend(true, {}, THD.Global.overlayConfigs.videoOverlay,{
			onComplete: function() {
				$('.fbVideoClose','#fancybox-wrap').click(function(){
					$.fancybox.close();
					return false;
				});
				addPlayer.call(window,vidID);
				$.fancybox.resize();
			},
			onCleanup: function(){ removePlayer(); }
		});



	$.fancybox( wcs56VPHtml,vpOverlayConfig);
}

function removePlayer() {
	if(isPlayerAdded == true) {
		isPlayerAdded = false;
		brightcove.removeExperience(playerName);
	}
}

function addPlayer(vidID) {
	if(isPlayerAdded == false) {
		isPlayerAdded = true;

		playerName = "myExperience" + vidID;
		var params = {};
		params.playerID = "671100694001";
		params.playerKey = "AQ%2E%2E,AAAAD2AZimE%2E,cuHgoGQ9jPmKtd0i5FDrRRXaQ1PXD6vT";
		params.autoStart = "true";
		params.bgcolor = "#00000";
		params.width = "640";
		params.height = "360";
		params.isVid = "true";
		params.isUI = "true";
		params.dynamicStreaming = "true";
		params.wmode = "transparent";

		params["@videoPlayer"] = vidID;

		var player = brightcove.createElement("object");
		player.id = playerName;
		var parameter;
		for (var i in params) {
			parameter = brightcove.createElement("param");
			parameter.name = i;
			parameter.value = params[i];
			player.appendChild(parameter);
		}

		var playerContainer = document.getElementById("videoPlaceHolder");
		brightcove.createExperience(player, playerContainer, true);
	}
}

function addPlayerPIP(vidID) {
	if(isPlayerAdded == false) {
		isPlayerAdded = true;

		playerName = "myExperience" + vidID;
		var params = {};
		params.playerID = "2536261721001";
		params.playerKey = "AQ~~,AAAAD2AZimE~,cuHgoGQ9jPlv7sA7AQvn0id0vLzXqaNR";
		params.autoStart = "true";
		params.bgcolor = "#ffffff";
		params.width = "300";
		params.height = "166";
		params.isVid = "true";
		params.isUI = "true";
		params.dynamicStreaming = "true";
		params.wmode = "transparent";
		params.includeAPI = "true";
		params.templateLoadHandler = "myTemplateLoaded";

		params["@videoPlayer"] = vidID;

		var player = brightcove.createElement("object");
		player.id = playerName;
		var parameter;
		for (var i in params) {
			parameter = brightcove.createElement("param");
			parameter.name = i;
			parameter.value = params[i];
			player.appendChild(parameter);
		}

		var playerContainer = document.getElementById("videoPlaceHolder");
		brightcove.createExperience(player, playerContainer, true);
	}
}
