(function(jQuery) {
	/*
	 * 	*****************************************
	 * 	onYouTubePlayerReady 04/01/2012 - rbarnett
	 *  *****************************************
	 */
	jQuery.fn.onYouTubePlayerReady = function(youtubeVideo) {
		if (youtubeVideo) {

			jQuery(youtubeVideo)
					.each(
							function(index, value) {
								var data_link_name = jQuery(this).attr(
										"data-link-name");
								// var videoSrc = jQuery(this).attr(
								// "data-image-static");
								var videoSrc = '/static/img/pdp/eb_video_bkgd_product_page_new.gif';
								var youtubeValue = jQuery(this).attr(
										"data-youtube-value");
								var objectWrapper = 'youtube_' + youtubeValue;

								sessionStorage.setItem("name", data_link_name);
								sessionStorage.setItem("background", videoSrc);
								sessionStorage.setItem("wrapper", objectWrapper);

								switch (index) {
								case 0:
									sessionStorage.setItem("videoId0",
											youtubeValue);
									if (data_link_name.length > 34) {
										$height = 30;
									} else {
										$height = 20;
									}
									var videoLinkHTML = '<div class="product_page_link_'
										+ youtubeValue
										+ ' video_package" style="position:absolute;left:0;top:0;width:305px;" height="'
										+ $height
										+ '" id="videoIndex_'
										+ index
										+ '"><a name="static:image:videomodal" title="Watch Video" class="floatbox camera" rel="floatbox" rev="type:ajax centerOnResize:true autoFitHTML:true width:664 height:448 scrolling:no outerClose:true hideObjects:false controlsPos:tr beforeItemEnd:triggerStopVideo();" href="#product_page_video_'
										+ youtubeValue
										+ '" style="text-decoration:none !important;display:inline;float:left;width:19px !important;text-align:left !important;" id="'
										+ index
										+ '"><img src="/static/img/pdp/video_camera_icon.gif" class="camera" border="0" alt="Watch Video" style="position:absolute;top:3px;left:1px;" /></a><a class="floatbox video'
										+ index
										+ '" style="font-size:12px !important;font-weight:bold;font-family:Arial,sans-serif;text-transform:uppercase;display:inline;float:left;width:250px !important;text-align:left !important;margin-left:26px;" name="static:link:videomodal" title="Watch Video" rel="floatbox" id="'
										+ index
										+ '" rev="type:ajax centerOnResize:true autoFitHTML:true width:664 height:448 scrolling:no outerClose:true hideObjects:false controlsPos:tr beforeItemEnd:triggerStopVideo();" href="#product_page_video_'
										+ youtubeValue
										+ '">'
										+ data_link_name
										+ '</a></div>';
									break;
								case 1:
									sessionStorage.setItem("videoId1",
											youtubeValue);
									if (data_link_name.length > 34) {
										$height = 30;
									} else {
										$height = 20;
									}
									var videoLinkHTML = '<div class="product_page_link_'
										+ youtubeValue
										+ ' video_package" style="position:absolute;left:0;top:0;width:305px;" height="'
										+ $height
										+ '" id="videoIndex_'
										+ index
										+ '"><a name="static:image:videomodal" title="Watch Video" class="floatbox camera" rel="floatbox" rev="type:ajax centerOnResize:true autoFitHTML:true width:664 height:448 scrolling:no outerClose:true hideObjects:false controlsPos:tr beforeItemEnd:triggerStopVideo();" href="#product_page_video_'
										+ youtubeValue
										+ '" style="text-decoration:none !important;display:inline;float:left;width:19px !important;text-align:left !important;" id="'
										+ index
										+ '"><img src="/static/img/pdp/video_camera_icon.gif" class="camera" border="0" alt="Watch Video" style="position:absolute;top:3px;left:1px;" /></a><a class="floatbox video'
										+ index
										+ '" style="font-size:12px !important;font-weight:bold;font-family:Arial,sans-serif;text-transform:uppercase;display:inline;float:left;width:250px !important;text-align:left !important;margin-left:26px;" name="static:link:videomodal" title="Watch Video" rel="floatbox" id="'
										+ index
										+ '" rev="type:ajax centerOnResize:true autoFitHTML:true width:664 height:448 scrolling:no outerClose:true hideObjects:false controlsPos:tr beforeItemEnd:triggerStopVideo();" href="#product_page_video_'
										+ youtubeValue
										+ '">'
										+ data_link_name
										+ '</a></div>';
									break;
								}

								var videoContainerHTML = '<div id="ppv_container_'
										+ youtubeValue
										+ '" class="ppv_container" style="display: none;"><div id="product_page_video_'
										+ youtubeValue
										+ '" style="border:1px solid #333333; width: 664px; height: 448px; background-image: url('
										+ videoSrc
										+ ');"><div style="position: absolute; padding-left: 550px; padding-top: 12px; width: 105px;"><div style="position: absolute; top: 50px; left: 12px;"><div class="youtube_'
										+ youtubeValue
										+ '" style="display: none;"><div id="ytapiplayer_'
										+ youtubeValue
										+ '"></div></div></div></div></div></div>';

								if (jQuery('#mainContentHolder .col-2 #pdpTabHolder .tab-content').length) {
									if (jQuery(this).find(
											'div.product_page_link_'
													+ youtubeValue).length) {
									} else {
										jQuery(this).append(videoLinkHTML);
									}
									if (jQuery('#pdpTabHolder')
											.find(
													'div#ppv_container_'
															+ youtubeValue).length) {
									} else {
										jQuery('#pdpTabHolder').append(
												videoContainerHTML);
									}
								}
							});

			jQuery('.floatbox').bind(
					'click',
					function() {
						var $thisContainer = jQuery(this).closest(
								'.product_page_video');
						var youtubeValue = $thisContainer
								.attr("data-youtube-value");
						var playerObjId = 'myytplayer_' + youtubeValue;
						var objectWrapper = 'youtube_' + youtubeValue;
						var objectPlaceholder = 'ytapiplayer_' + youtubeValue;
						fetchYouTubeVideo(youtubeValue, playerObjId,
								objectWrapper, objectPlaceholder);
					});

			fetchYouTubeVideo = function(youtubeValue, playerObjId,
					objectWrapper, objectPlaceholder) {

				jQuery('.' + objectWrapper).addClass('selected').css('display',
						'block');

				var params = {
					allowScriptAccess : "always",
					wmode : "transparent"
				};

				var atts = {
					id : playerObjId
				};

				function onYouTubePlayerReady(playerObjId) {
					var ytplayer = document.getElementById(playerObjId);
					ytplayer.addEventListener("onStateChange",
							"onytplayerStateChange");
				}

				triggerStopVideo = function() {
					var ytplayer = document.getElementById(playerObjId);
					ytplayer.stopVideo();
					jQuery('.'+objectWrapper).removeClass('selected').css(
							'display', 'none');
				}

				swfobject
						.embedSWF(
								"http://www.youtube.com/v/"
										+ youtubeValue
										+ "?enablejsapi=1&playerapiid=ytplayer&allowFullScreen=true&autohide=1&version=3&fmt=22&hl=en_US&vq=hd1080&rel=0&showinfo=0&autoplay=0",
								objectPlaceholder, "640", "385", "8", null,
								null, params, atts);
				jQuery('head')
						.append(
								'<style>#fbBox #fbtrPanel{right:-34px !important}#fbBox #fbContent{width:664px;}</style>');
			}
		}
	}
})(jQuery);