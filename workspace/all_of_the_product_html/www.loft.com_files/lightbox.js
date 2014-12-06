$(window).load(function(){

	// Don't show lightbox in such cases such as welcome mat has been shown
	if(typeof suppressLightBox === 'undefined' || !suppressLightBox){
		
		// Lightbox functionality

		var script = document.createElement( 'script' );
		script.src = '/webassets/content/loft/common-js/jquery.cookie.js';
		$("head").append( script );
	
		// use for testing / debugging
		// $.removeCookie("loft_emailRequestSeen", {path:'/'});
		
		// console.log($.cookie('loft_emailRequestSeen'));	
		
		if( ( bt_at.Page_Type == 'Home Page' || s.pageName == 'Home:Home Page' ) && $.cookie("loft_emailRequestSeen") == null){
			
			// set the cookie
			$.cookie('loft_emailRequestSeen', '1', {expires:90, path:'/'});
			
			//Adjust location
			function adjustLightboxLocation() {
				var bWindowOffsets = getScrollXY();
				var bWindowViewport = getViewportSize();
				var lbTop = ((bWindowViewport[1] / 2) - ($('#emailLightbox').height() / 2)) + bWindowOffsets[1];
				var lbLeft = ((bWindowViewport[0] / 2) - ($('#emailLightbox').width() / 2) - 13) + bWindowOffsets[0];
				lbTop = (lbTop < 0) ? 100 : lbTop;
				lbLeft = (lbLeft < 0) ? 100 : lbLeft;
				$('#emailLightbox').css({
			        "top" : lbTop+"px",
			        "left" : lbLeft+"px"
			    });
			};
			
			function closeLightbox(){
				if($('#emailLightbox').size()>0){
					$('#emailLightbox').remove();
					$('#lightbox-overlay').remove();
				}
			};
	
			
			// show the lightbox
			$('head').append('<link rel="stylesheet" href="/webassets/content/loft/hp/2012_emailLightbox/lightbox.css" type="text/css" />');
	
			// AT: http://ebm.cheetahmail.com/r/regf2?a=0&aid=1566646063&n=413&SOURCE=OFORA_LBHP&FORM_SOURCE_ORIG_AT=OFORA_LBHP&FORM_SOURCE_LAST_AT=OFORA_LBHP
			// LOFT: http://ebm.cheetahmail.com/r/regf2?a=0&aid=1617026391&n=3001
			
			// NEW VERSIONS
			
			// AT: http://f.mail.anntaylor.com/i/36/1566646063/ATS_Lightbox.html
			// LOFT: http://f.mail.loft.com/i/48/1617026391/LOFT_Lightbox.html
	
			var emailLightboxCode = '<div id="lightbox-overlay"></div><div id="emailLightbox" style="display:none;height:411px; width:493px; "><div id="lightboxClose"><img src="/webassets/content/loft/hp/2012_emailLightbox/btn-close.gif" alt="Close Email Sign-up Form" /></div><div id="emailLightbox_inner"><iframe id="emailLightbox_iFrame" frameBorder="0" border="0" src="http://ebm.cheetahmail.com/r/regf2?a=0&aid=1617026391&n=3001" /></div></div>';
					
			$('body').append(emailLightboxCode);
			adjustLightboxLocation();
			$('#emailLightbox').show();
	
			$('#lightboxClose').click(function(){
				closeLightbox();
			});
			$('#lightbox-overlay').click(function(){
				closeLightbox();
			});
		}
		

	}

	// Other interim fixes
	
});

