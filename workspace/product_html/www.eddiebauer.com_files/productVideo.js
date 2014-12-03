
jQuery( document ).ready(function() {

/*************************************
	LOAD YOUTUBE VIDEOS FOR PRODUCTS
*************************************/

	var youtubeVideo = jQuery('.product_page_video');
	if (youtubeVideo) {
		jQuery.fn.onYouTubePlayerReady(youtubeVideo);
	}

/*********************************
	PDP TOOLTIP OVERLAY FOR TABS
*********************************/

	var toolTipContentLoaded = false;

	addTooltips = function() {
		if (!toolTipContentLoaded) {
			jQuery('#pdpTabHolder').append("<div id='toolTipWrap'></div>");
				jQuery('#pdpTabHolder #toolTipWrap').load('/static/html/pdpTooltips/pdpTooltips.html');
				toolTipContentLoaded = true;
		}
	}

	if (jQuery('body.pdp')) {
		addTooltips();
		var styleText = '<style type="text/css">'
			+ 'a.link {text-decoration:none !important;}'
			+ 'a.link:hover {text-decoration:none !important;}'
			+ 'a.toolTip {border-bottom:1px dotted #0072CF !important;color: #0072CF;font-size:11px;font-weight:normal;text-transform:uppercase;font-family:Arial !important;}'
			+ 'a.toolTip:hover {border-bottom:1px dotted #0072CF !important;color:#0072CF;font-size:11px;font-weight:normal;text-transform:uppercase;font-family:Arial !important;}'
			+ '#ToolTipOverlay {position: absolute;z-index: 99999;border: 1px solid #6b6b6b !important;overflow: hidden;padding:10px;background-color:#fafafa;font-weight:normal;color:#333;font-family: Arial, Sans-Serif !important;cursor: help !important;width: 250px;}'
			+ '#ToolTipOverlay .header {font-family: Arial, Sans-Serif; !important;font-weight:bold;color:#333;font-size: 10px !important;margin-bottom: 5px !important;cursor: help !important;text-align:center;text-transform:uppercase !important;}'
			+ '#ToolTipOverlay .body {font-family: Arial, Sans-Serif !important;font-weight:normal;color:#333;font-size: 10px !important;text-transform:uppercase !important;cursor: help !important;text-align:center;}'
			+ '#ToolTipOverlay dl, #ToolTipOverlay dt, #ToolTipOverlay dd, #ToolTipOverlay p {padding:0;margin:0;cursor: help !important;}'
			+ '</style>'
			jQuery('head').append(styleText);
	}

	jQuery('.tab-content .toolTip').hover(function() {
		this.contentHref = jQuery(this).attr("href");
		jQuery(this).addClass('over');
		var contentOffset = jQuery(this).position();
		var contentXpos = contentOffset.left;
		var contentYpos = contentOffset.top;
		this.contentOverlay = '#overlay_' + this.contentHref.replace('#','');
		jQuery(this).append(
			'<div id="ToolTipOverlay" class="toolTipWrapper" style="z-index:9999;width:250px">'
			+'</div>'
		);
		if (jQuery(this).attr('id') == "DropShip") {
			jQuery('#ToolTipOverlay').html( jQuery(this.contentOverlay).html() );
			if (PPL) {
				jQuery('#ToolTipOverlay').css({marginLeft: contentXpos-40, marginTop: contentYpos-268, width: 350, position: "relative"});
			} else {
				jQuery('#ToolTipOverlay').css({marginLeft: contentXpos, marginTop: contentYpos-330, width: 350, position: "relative"});
			}
			jQuery('.toolTipWrapper').fadeIn(300);
		} else {
			jQuery('#ToolTipOverlay').html( jQuery(this.contentOverlay).html() );
			if (contentXpos > 100 && contentXpos < 120) {
				jQuery('#ToolTipOverlay').css({left: contentXpos-100, top: contentYpos+15});
			} else if (contentXpos > 120 && contentXpos < 130) {
				jQuery('#ToolTipOverlay').css({left: contentXpos-110, top: contentYpos+15});
			} else if (contentXpos > 130 && contentXpos < 150) {
				jQuery('#ToolTipOverlay').css({left: contentXpos-130, top: contentYpos+15});
			} else if (contentXpos > 150) {
				jQuery('#ToolTipOverlay').css({left: contentXpos-150, top: contentYpos+15});
			} else {
				jQuery('#ToolTipOverlay').css({left: contentXpos, top: contentYpos+15});
			}
			jQuery('.toolTipWrapper').fadeIn(300);
			jQuery('div#ToolTipOverlay').next().remove();
		}
	},
		function() {
			jQuery('.toolTipWrapper').fadeOut(100);
			jQuery(this).removeClass('over');
			jQuery(this).children().remove();
		}
	);

});