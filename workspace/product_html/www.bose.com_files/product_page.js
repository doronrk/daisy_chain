/*--------------------------------------------------------------------------------------------------------*//***
** title: Color Swatch
** author: Dan DeRose
** company: Bose Corporation
** requires: jQuery 1.5+
** description: Switches the color swatch and all related info: hero image, color description text and color code hidden input in add to cart form. The id of the product hero image must match the data-disjointed attribute of the color swatch(es).
** last updated: 7/24/2014 - Joshua Sherer
** Added methods to support switch price and promotion change on swatch selection
***/

function colorSwitching(obj) {
	var heroImage = document.getElementById($(obj).data('disjointed')); // Get the product hero img
	heroImage.src = heroImage.src.substr(0,heroImage.src.lastIndexOf('/')+1) + obj.id + '_lg.jpg'; // Update the src of the product hero image with new color code

	$('#color_swatches > div').removeClass('color_swatch_selected');
	$(obj).parent().addClass('color_swatch_selected');

if($('.color_swatch_selected > div').attr('data-original-price') > $(".color_swatch_selected > div").attr("data-price").substr(1)) {
			$('.product_info .price').html('<span class="original_price">$' +  $(".color_swatch_selected > div").attr("data-original-price") + '</span>' + ' ' + '<span class="offer_price">' + $(".color_swatch_selected > div").attr("data-price") + '</span>');
		} else {
			$('.product_info .price').html( '<span class="regular_price">' + $(".color_swatch_selected > div").attr("data-price") + '</span>');
		}// Update price based on color variant

	$("<script>lp_product_value = " + $(".color_swatch_selected > div").attr("data-price").replace('$','') + ";</script>").appendTo($('body')); // Update lp_product_value (price based on color variant selection) for echat.js

	$('#color_descriptor').html($(obj).data('color_description')); // Update color description text
	$('#colorvariant').val($(obj).data('color-code')); // Update color code in hidden input for add to cart functionality

	$('#atp').html($(obj).data('atp')); // Update ATP

if($(obj).data('promo-msg').length > 0) {
	$('#promo_messaging').show();
	$('.promo_message').html($(obj).data('promo-msg'));// Update promo message

		if ($(obj).data('promo-link').length > 0) {
			var promoLink = $(obj).data('promo-link');
			if (promoLink.indexOf('.jsp') >= 0) {
				if (httpPrefix.indexOf('?') >= 0) {
					$('.promo_link').attr('href',httpPrefix + '&url=' + $(obj).data('promo-link')).text(promoLinkText);
				} else { 
					$('.promo_link').attr('href',httpPrefix + '?url=' + $(obj).data('promo-link')).text(promoLinkText);
				};
			} else { 
				$('.promo_link').attr('href',$(obj).data('promo-link')).text(promoLinkText);
			}; 
			} else {
				$('.promo_link').attr('href','').text('');
			} // Update promo link and link text if there is a link and clear link text and link text if there is none.
	} else {
		$('#promo_messaging').hide();
	}


	$('.addtocart_button').val($(obj).data('atcBtn')); // Update ATC btn text
	$('.atcRedirect').val($(obj).data('atcRedirect')); // Update ATC btn hidden redirect field
	//Conditional statement to test if data-offering-status is not C, then disable and hide the btn
	if($('.color_swatch_selected > div').attr('data-offering-status')!='C') {
	  $('#addToCart input:submit').addClass("disabled");
	  $('#addToCart input:submit').attr("disabled", "disabled");
	  $('#addToCart input:submit').siblings('.prodQuantity').addClass("disabled");
	}
	else
	{
	  $('#addToCart input:submit').removeClass("disabled");
	  $('#addToCart input:submit').removeAttr("disabled", "disabled");
	  $('#addToCart input:submit').siblings('.prodQuantity').removeClass("disabled");
	}
}

if($('.color_swatch')) {
	$('#commerce').delegate('.color_swatch > div', 'click', function() {
		colorSwitching(this);
	});
}
/*--------------------------------------------------------------------------------------------------------*//***
** title: Product Variant/Package Content Updater
** author: Dan DeRose/
** company: Bose Corporation
** requires: jQuery 1.5+
** last updated: 1/26/2012
** description: Binds an event to the radio buttons in the Product Variant/Package section that calls an AJAX request
to swap out the product content. The AJAZ request simply re-runs the existing product page xsl code, which is optimized to accept parameters,
and then replaced the product_info div with the new information.
***/


//Bind the window to the hashchange event
$(window).bind('hashchange', function(e) {
	var state = $.bbq.getState('currentState') || '';
	var defaultVariant = $('.product_selection_button').eq(0);

	if(defaultVariant.length > 0) {             //If we're on a page with multiple variants
		if(state == '') { return; } 			//If the current state is the default, do nothing
		else { createState($('#' + state)); }   //Otherwise, recreate the state
	} else { return; }                          //If there aren't variants, do nothing
});



//Trigger a hashchange when the radio buttons are clicked
$('.product_selection_button').click(function(){
	var state = {};
	var selectedVariant = $(this).attr('id');

	state['currentState'] = selectedVariant;
	$.bbq.pushState(state, 2);

	var displayName = $(this).data('web_display_name');
	var selectedTab = $('#tabs > a.selected').attr('title');
	if(objSiteCatalyst.additionalProductViews[selectedTab]) {
		objSiteCatalyst.productView(displayName);
		objSiteCatalyst.setAdditionalPageViews(selectedTab);
	} else {
		objSiteCatalyst.productView(displayName);
	}

	// variant switch clears campaigns at bottom of s_doPlugins function
	variant_switch = true;
	objSiteCatalyst.pageView();
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


//cache ajax data
var storedState = {};


//cache ajax data
var storedState = {};

//Trigger a hashchange when the page is loaded
$(document).ready(function(){

if(typeof variantPage === 'undefined') {variantPage = 0}

	//cache the default state
	if(location.href.indexOf("Variant") == -1)
		loadDefaultState(jQuery('.product_selection_button').eq(0));
	else {
		variantName = getParameterByName("Variant");
		loadDefaultState(jQuery("#" + variantName));
	}
	$(window).trigger('hashchange');
});

//create default state
function loadDefaultState(state) {

	var colorCode = jQuery('#colorvariant').val();
	var productFamily = jQuery(state).data('sub-heading');
	if(productFamily !== 'on') {
		var ajaxUrl = location.pathname + '?url=' + variantPage + '&Variant=' + encodeURIComponent(jQuery(state).attr('id')) + '&Family=' + encodeURIComponent(productFamily) + '&Color=' + encodeURIComponent(colorCode);
	} else {
		var ajaxUrl = location.pathname + '?url=' + variantPage + '&Variant=' + encodeURIComponent(jQuery(state).attr('id')) + '&Color=' + encodeURIComponent(colorCode);
	}
	var data = jQuery("<div></div>");
	jQuery(data).append(jQuery(".product_info").clone());
	jQuery(data).append(jQuery("#Accessories").clone().attr('id','accessories_tab_content'));
	jQuery(data).append(jQuery("#Details").clone().attr('id','details_tab_content'));
	jQuery(data).append(jQuery("#FAQs").clone().attr('id','faqs_tab_content'));

	storedState[ajaxUrl]=jQuery(data);

	if((jQuery('#product_messaging:contains("customized orders")')) && (jQuery('input[id$="_custom"]').length > 0) && (colorCode == 'cu')) {
		jQuery('#product_messaging').show();
	}
	if((jQuery('#product_messaging:contains("customized orders")')) && (jQuery('input[id$="_custom"]').length > 0) && (colorCode != 'cu')) {
		jQuery('#product_messaging').hide();
	}
	if(jQuery('.cds_btn').length > 0) {
		jQuery("#commerce .cds_btn").html(jQuery("#selection .cds_btn").html());
	}

 toggleTabVisibility();

}


/** display ajax data and refresh the addtocart_button listener
** last updated: 9/27/2013 - Joshua Sherer
** Added methods to support enhanced ATC btn functionality
**/
function displayData(data,loadingImageTimeout,state) {
	clearTimeout(loadingImageTimeout);

	var product_info = $(data).filter('.product_info');
	var accessories_tab_content = $(data).filter('#accessories_tab_content');
	var details_tab_content = $(data).filter('#details_tab_content');
	var faqs_tab_content = $(data).filter('#faqs_tab_content');

	if (!product_info.length) {
		product_info = $(data).find('.product_info');
	}
if (!accessories_tab_content.length) {
		accessories_tab_content = $(data).find('#accessories_tab_content');
	}
	if (!details_tab_content.length) {
		details_tab_content = $(data).find('#details_tab_content');
	}
	if (!faqs_tab_content.length) {
		faqs_tab_content = $(data).find('#faqs_tab_content');
	}
	$(".product_info").html($(product_info).html());

	if (typeof(designStudioToolObject) == 'object') {
		designStudioToolObject.cloneImage();
	}

	$("#Details").html($(details_tab_content).html());
	$("#FAQs").html($(faqs_tab_content).html());
	$("#Accessories").html($(accessories_tab_content).html());

 toggleTabVisibility();

	/* Reviews widgets support */
	if (typeof(reviewsProductUrl) != 'undefined' && reviewsProductUrl) {
		$('#prod_rollup').remove();
		$('.product_info > :first-child').after('<div id="prod_rollup">&#160;</div>');
		//pluck using document.write?  Really?
		var oldWrite = document.write;
		document.write = function( pString ){ // overload document.write()
			jQuery('body').append(pString);
		}
		eval($('#selection .selected input').attr('id') + "_widgets.init();");
		document.write = oldWrite;
	}
	if (typeof(displayDataCompleted)=='function'){
		displayDataCompleted(data);
	}

	if((jQuery('#product_messaging:contains("customized orders")')) && (jQuery('input[id$="_custom"]').length > 0) && (jQuery('#colorvariant').val() == 'cu')) {
		jQuery('#product_messaging').show();
	}
	if((jQuery('#product_messaging:contains("customized orders")')) && (jQuery('input[id$="_custom"]').length > 0) && (jQuery('#colorvariant').val() != 'cu')) {
		jQuery('#product_messaging').hide();
	}
	if(jQuery('.cds_btn').length > 0) {
		jQuery("#commerce .cds_btn").html(jQuery("#selection .cds_btn").html());
	}
	jQuery('.addtocart_button').click(function(e) {
		e.preventDefault();
		var redirect;
		if(jQuery(this).siblings('.atcRedirect').length > 0) {
			redirect = jQuery(this).siblings('.atcRedirect').val();
			if(redirect.length > 2) {
				window.location = redirect;
			} else {
				jQuery('#addToCart').submit();
			}
		}
		if(jQuery(this).parent().siblings('.atcRedirect').length > 0) {
			redirect = jQuery(this).parent().siblings('.atcRedirect').val();
			if(redirect.length > 2) {
				window.location = redirect;
			} else {
				jQuery(this).parent().parent().submit();
			}
		}
	});
	 if(jQuery('.promo_message').html().length < 10) {
	 	jQuery('#promo_messaging').hide();
	 }
	 if($(".color_swatch_selected > div").length > 0) {
			$("<script>lp_product_value = " + $(".color_swatch_selected > div").attr("data-price").replace('$','') + ";</script>").appendTo($('body'));
		} else {
			$("<script>lp_product_value = " + $('.regular_price').first().text().replace('$','') + ";</script>").appendTo($('body'));			
		}
	// check radio button after all data has finished loading. Passed from "createState"
	$(state).attr('checked','checked');

}

//load ajax data
function createState(state) {
	if($('#selection').length > 0) {

		//$('#selection').delegate('.product_selection_button', 'click', function() {
		// Switch selected class
		$('#selection .selected').each(function() {
			$(this).removeClass('selected');
		});

		$(state).parents('div').eq(1).addClass('selected');
		$('#colorvariant').val($(state).data('default-color'));

		var colorCode = $('#colorvariant').val();
		var productFamily = $(state).data('sub-heading');
		var displayName = $(state).data('web_display_name');


		if(productFamily !== 'on') {
			var ajaxUrl = location.pathname + '?url=' + variantPage + '&Variant=' + encodeURIComponent($(state).attr('id')) + '&Family=' + encodeURIComponent(productFamily) + '&Color=' + encodeURIComponent(colorCode);
		} else {
			var ajaxUrl = location.pathname + '?url=' + variantPage + '&Variant=' + encodeURIComponent($(state).attr('id')) + '&Color=' + encodeURIComponent(colorCode);
		}

		$('.product_info').empty();

		var loadingImageTimeout = setTimeout('showLoadingImage()',125);

		//either load data via ajax or use cached data
		if (storedState[ajaxUrl]) {
			displayData(storedState[ajaxUrl],loadingImageTimeout);
		} else {
			$.ajax({
				url: ajaxUrl,
				dataType: 'html',
				success: function (data) {
					storedState[ajaxUrl]=data;
					displayData(data,loadingImageTimeout,state);
				}
			});
		}
		$(state).attr('checked','checked');

		var selectedTab = $('#tabs > a.selected').attr('title');
		if(objSiteCatalyst.additionalProductViews[selectedTab]) {
			objSiteCatalyst.productView(displayName);
			objSiteCatalyst.setAdditionalPageViews(selectedTab);
		} else {
			objSiteCatalyst.productView(displayName);
		}
	}
	toggleTabVisibility();
}


function showLoadingImage() {
	if(!$('.product_info form').length) {
		$('.product_info').append('<div id="loading_container"><img src="/assets/images/icons/icon_loading.gif" alt="Loading" /><p>Loading...</p></div>');
	}
}

function toggleTabVisibility() {
if(!$.trim($("#Details").html()) == true) {
		$("a[name='details']").hide();
		} else {
			$("a[name='details']").show();
	}

if(!$.trim($("#FAQs").html()) == true) {
		$("a[name='faqs']").hide();
		} else {
			$("a[name='faqs']").show();
	}

if(!$.trim($("#Accessories").html()) == true) {
		$("a[name='accessories']").hide();
		} else {
			accessoryContentToggle();
			$("a[name='accessories']").show();
	}
}



/*--------------------------------------------------------------------------------------------------------*//***
** title: Dealer Locator
** author: Dan DeRose
** company: Bose Corporation
** requires: jQuery 1.5+
** last updated: 4/11/2012
** description: Binds the dealer locator form to a lightbox.
***/

// Set regex for zip validation
var zipPattern = /^\d{5}$/;

$('#commerce').delegate('#dealer_locator_form', 'submit', function() {
	// Validate zip and open lightbox
	if(zipPattern.test($('#zipCode').val()) == true) {
		// Only open a lightbox if it doesn't already exist
		if ($("#lightbox_container").length == 0 ) {
			objLightbox = new lightbox();
			objLightbox.callLightbox($(this).attr('action') + '?' + $(this).serialize(),'877','616','Get a product demonstration','','true','');
			var axel = Math.random() + "";
			var a = axel * 10000000000000;
			$('#dealer_locator').append('<iframe src="http://fls.doubleclick.net/activityi;src=1859255;type=sitea812;cat=video988;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
		}
	} else {
		alert('Please enter a five digit postal code.');
	}
	return false;
});

$('#commerce').delegate('#zipCode', 'keyup', function() {
	var dealerLocatorSubmit = $('#dealer_locator_submit');
	// Validate zip and activate submit button
	if(zipPattern.test($('#zipCode').val()) == true) {
		dealerLocatorSubmit.removeAttr('disabled')
							.css({'opacity':'1','cursor':'pointer'});
	} else {
		dealerLocatorSubmit.attr('disabled','disabled')
							.css({'opacity':'.5','cursor':'default'});
	}
});

/*--------------------------------------------------------------------------------------------------------*//***
** title: Showcase Deep Linking
** author: Dan DeRose/Laura Vecchio
** company: Bose Corporation
** requires: jQuery 1.7+
** last updated: 11/7/2012
** description: Allows a link to deep link into the showcase. The link requires three data attributes: data-showcase_asset_type, data-showcase_asset_index, and data-showcase_asset_tracking.
	data-showcase_asset_type is the kind of gallery. The options are photo, video and 360.
	data-showcase_asset_index is the index of the showcase asset. It is 0-based.
	data-showcase_asset_tracking is the string that will be reported in Site Catalyst.
***/

var startFrame = '1';
var language = 'en';

// If there is a directive tag on the page defining the language, pass this language code to the Brightcove players
// The language code will alter the language of the controls on the player itself.
if ($("meta[name=bc-lang]").attr('content') != null) {
	language = $("meta[name=bc-lang]").attr('content');
}

function ShowcaseDeepLink(content,media,index,pagename,bc_playlist_id,bc_video_id,title) {
	var currentPageName = s.pageName; // Store current s.pageName
	var last;
	var assetType;
	var language = 'en'; // Set default language to English
	var new_icon;
	var productLabel = $("#addToCart input#product").attr('value');
	var current_tab = $("#tabs a.selected").attr('title');

	// If the new icon exists on the page already, add its HTML and append it to the lightbox title after opening
	if ($(".new_icon")) {
		new_icon = $(".new_icon").clone().wrap('<div>').parent().html();
	}

	// Translate asset type into showcase config string
	// Note: There are different Player IDs and Player keys for both product and entry pages, do not copy this code onto a new template without updating these parameters.
	if(media === 'video') {

		if(bc_playlist_id != null) {

			$(".brightcove_player").append("<object id='myExperience' class='BrightcoveExperience'><param name='language' value='"+language+"' /><param name='htmlFallback' value='true' /><param name='bgcolor' value='#FFFFFF' /><param name='width' value='650' /><param name='height' value='620' /><param name='playerID' value='1752666809001' /><param name='playerKey' value='AQ~~,AAABIKMQ3ok~,EGcfgWRfXHKjHhjPDfkwMX929qYYlFaf' /><param name='isVid' value='true' /><param name='isUI' value='true' /><param name='dynamicStreaming' value='true' /><param name='includeAPI' value='true' /><param name='templateLoadHandler' value='myTemplateLoaded' /><param name='@videoList' value='"+bc_playlist_id+"'></object>");

			objLightbox = new lightbox();
			objLightbox.callLightbox('#brightcove_video_gallery', '651', '631', title);
			brightcove.createExperiences();

			if (new_icon != null) {
				$("#lightbox_title").prepend(new_icon);
			}

		}

		if(bc_video_id != null) {

			$('.brightcove_player').append("<object id='myExperience' class='BrightcoveExperience'><param name='language' value='"+language+"' /><param name='htmlFallback' value='true' /><param name='bgcolor' value='#FFFFFF' /><param name='width' value='640' /><param name='height' value='360' /><param name='playerID' value='1772806567001' /><param name='playerKey' value='AQ~~,AAABIKMQ3ok~,EGcfgWRfXHJ1pLVkStlo29XpuAX9jwTW' /><param name='isVid' value='true' /><param name='isUI' value='true' /><param name='dynamicStreaming' value='true' /><param name='includeAPI' value='true' /><param name='templateLoadHandler' value='myTemplateLoaded' /><param name='@videoPlayer' value='"+bc_video_id+"'></object>");

			$('.brightcove_player').addClass('single_video');

			objLightbox = new lightbox();
			objLightbox.callLightbox('#brightcove_video_gallery', '651', '371', title);
			brightcove.createExperiences();

		}

	}


	if(media === 'photo') {

		startFrame = index;

		if(startFrame === 0) {
			startFrame++;
		}

		function parseXml(xml) {

			// Loop through XML and output necessary HTML to build photo gallery plugin
			$(xml).find("photo").each(function() {

				var title = $(this).find("title").text();
				var description = $(this).find("description").text();
				var url = $(this).find("url").text();
				var thumb_url = $(this).find("thumbURL").text();

				$("#photo_gallery_items").append('<li><img data-frame="'+thumb_url+'"src="'+ url +'"title="' +title+'"data-description="' +description+'" /></li>');

			});

			// Passes start frame variable to GalleryView plugin. All other default options are listed at the bottom of the plugin JS
			$('#photo_gallery_items').galleryView({
				start_frame: startFrame
			});

		}

		/* AJAX call to grab photos from product XML */
		$.ajax({
			type: "GET",
			url: content,
			dataType: "xml",
			success: parseXml
		});

		objLightbox = new lightbox();
		objLightbox.callLightbox('#showcase_photo_gallery', '775','544', title);

		if (new_icon != null) {
			$("#lightbox_title").prepend(new_icon);
		}

	}

	// If 360 gallery, run old Showcase 2.0 SWF as usual
	if(media === 's360') {
		assetType = '0';

		// Set the hash for the showcase app to understand which asset to deep link to
		location.hash = "#cmd=sl+arg=" + assetType + "$0$" + index + "$";

		// Open and display lightbox
		objLightbox = new lightbox();
		objLightbox.callLightbox('/assets/flash/media_showcase_2/Showcase_2_0.swf','924','630','','','','contentURL=' + content + '&fontsURL=/assets/flash/media_showcase_2/assets/fonts/eff_font_en_US.swf&themeURL=/assets/flash/media_showcase_2/basicTheme.swf');

	}

	s.pageName = pagename;
	s.t();

	// Set s.pageName back to original value
	s.pageName = currentPageName;

}

$('#container').delegate('.showcase_link', 'click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	var content = this.href;
	var media = $(this).data('showcase_asset_type');
	var index = $(this).data('showcase_asset_index');
	var pagename = $(this).data('showcase_asset_tracking');
	var bc_playlist_id = $(this).data('bc_playlist_id');
	var bc_video_id = $(this).data('bc_video_id');
	var title = $(this).attr('title');

	ShowcaseDeepLink(content,media,index,pagename,bc_playlist_id,bc_video_id,title);
});

/*--------------------------------------------------------------------------------------------------------*//***
** title: Custom Link Tracking for Showcase 2.5 Photo Gallery
** author: Laura Vecchio
** company: Bose Corporation
** requires: jQuery 1.5+
** last updated: 10/17/2012
** description: This function allows a custom link to be sent to SiteCatalyst upon clicking each thumbnail within the photo gallery. Since the GalleryView plugin
multiples the number of images by 3, we divide this by 3 to get the actual number of images in the gallery. Upon opening the gallery, an inital custom link
is sent to SC since the first photo is always viewed upon load. The product label variable grabs the product label within a hidden input on the page. While looping through
the thumbnails and setting the index, once the number of photos is reached, the index is reset to 1.

This function is initialized within the "gallery_view.js" file after the photo gallery has been created (line 1017) so it will only be called on pages which use the
photo gallery plugin.
***/

function trackImages() {

	var images = $('.gv_thumbnail').length;
	var maxIndex = $('.gv_thumbnail').length/3;
	var index = 1;
	var productLabel = $("#addToCart input#product").attr('value');
	var initialTrackingLink;
	var trackingLink;

	if (images < 6) {

		$('.gv_thumbnail').each(function(){
			$(this).attr('id', index);
			index++;
		});

	} else {

		$('.gv_thumbnail').each(function(){

			if(maxIndex >= index) {

				$(this).attr('id', index);

			} else if (index > maxIndex) {

				// resets index back to 1
				index = 1;
				$(this).attr('id', index);
			}

			index++;
		});
	}

	if (language === 'en') {
		initialTrackingLink = "MS:"+productLabel+":Photos:"+startFrame;
	} else {
		initialTrackingLink = "MS:FR:"+productLabel+":Photos:"+startFrame;
	}

	s.tl(true, 'o', initialTrackingLink);

	// Send custom link to SC upon clicking each thumbnail
	$('.gv_thumbnail').click(function(){
		var photoIndex = $(this).attr('id');

		if (language === 'en') {
			trackingLink = "MS:"+productLabel+":Photos:" + photoIndex;
		} else {
			trackingLink = "MS:FR:"+productLabel+":Photos:" + photoIndex;
		}

		s.tl(true, 'o', trackingLink);
	});

	$('.gv_navPrev').click(function(){
		var photoIndex = $('.gv_thumbnail.current').attr('id');

		if (images < 6) {

			if (photoIndex == 1) {
				photoIndex = images;
			} else {
				photoIndex = photoIndex-1;
			}

		} else {

			if (photoIndex == 1) {
				photoIndex = maxIndex;
			} else {
				photoIndex = photoIndex-1;
			}
		}

		if (language === 'en') {
			trackingLink = "MS:"+productLabel+":Photos:" + photoIndex;
		} else {
			trackingLink = "MS:FR:"+productLabel+":Photos:" + photoIndex;
		}

		s.tl(true, 'o', trackingLink);
	});

	$('.gv_navNext').click(function(){
		var photoIndex = $('.gv_thumbnail.current').attr('id');

		if (images < 6) {

			if (photoIndex == images) {
				photoIndex = 1;
			} else {
				photoIndex++;
			}

		} else {
			if (photoIndex == maxIndex) {
				photoIndex = 1;
			} else {
				photoIndex++;
			}

		}

		if (language === 'en') {
			trackingLink = "MS:"+productLabel+":Photos:" + photoIndex;
		} else {
			trackingLink = "MS:FR"+productLabel+":Photos:" + photoIndex;
		}

		s.tl(true, 'o', trackingLink);
	});

}


/*--------------------------------------------------------------------------------------------------------*//***
** title: Accessories Popover Help Function
** author: Dan DeRose
** company: Bose Corporation
** requires: jQuery 1.5+
** last updated: 2/8/2012
** description: Binds a popover event to a link. Essentially just binds the Bootstrap popover widget to a click event.
***/

var currentPopover;
function showPopover(e) {
	e.preventDefault();
	if(currentPopover) {
		currentPopover.popover("hide");
	}
	var $popTrigger = currentPopover = $(e.target);
	var contentType = $(e.target).data('content-type');

	if(contentType === 'ajax') {
		$.ajax({
			 url: e.target.href + ' #container',
			 dataType: 'html',
			 success: function(data) {
				 $(e.target).attr('data-content', data.slice(data.indexOf('<body>')+6,data.indexOf('</body>')));
			 }
		});

		(function(that){
			$popTrigger.popover({
				animation : false,
				placement: 'left',
				trigger : 'manual'
			});
		})(this);
	} else {
		(function(that){
			$popTrigger.popover({
				animation : false,
				html : true,
				trigger : 'manual',
				content : function () {
					var accessoryPopoverContent = $(this).parents('.product_accessory').find('.accessory_rollover').html();
					return accessoryPopoverContent;
				}
			});
		})(this);
	}

	$popTrigger.popover("show");

   $('.close_button').click(function(e){
		$popTrigger.popover("hide");
		e.preventDefault();
	});
}
/*--------------------------------------------------------------------------------------------------------*/

/***
** title: Get querystring param
** description: Returns the value of a querystring key
** usage: var querystring = $.urlParam('key');
***/
$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return decodeURIComponent(results[1].replace(/\+/g, " ")) || 0;
}



/*--------------------------------------------------------------------------------------------------------*//***
** title: Accessory ATP sync
** author: Dan DeRose
** company: Bose Corporation
** requires: jQuery 1.5+
** description: Updates the ATP messaging and colorvariant hidden input field for an accessory under the Accessories tab on a product page when a new color is selected in a dropdown.
** last updated: 3/7/2014 - Joshua Sherer
** Added support to change image upon color toggle
** last updated: 10/17/2014 - Joshua Sherer
** Wrapped in function so when ajax replaces HTML the listener will refresh
***/

function accessoryContentToggle() {
	$('.accessory_select').change(function() {
		var selectedOption = $(this).children('option:selected');
		var currentATP = $(this).siblings('p.atp');
		var newATP = selectedOption.data('atp');
		var currentColor = $(this).siblings('input#colorvariant');
		var newColor = selectedOption.data('color');
		var atcBtn = selectedOption.data('atcBtn');
		var atcRedirect = selectedOption.data('atcRedirect');
		var prodQuantity = $(this).siblings('.prodQuantity');

		var productLabel = $(this).attr('id').replace('SKU_','');
		$(this).parent().parent().siblings('.accessory_image').children('img')[0].setAttribute('src', '/assets/images/shop_online/'+productLabel+'/'+productLabel+'_'+newColor+'_sm.jpg');

		currentATP.text(newATP);
		currentColor.val(newColor);

		var submitButton = $('#' + $(this).attr('id') + '_submit');
		var offeringStatus = selectedOption.attr('title');

		submitButton.val(atcBtn);

		if($(this).siblings('input.atcRedirect').length > 0) {
			$(this).siblings('input.atcRedirect').val(atcRedirect);
		} else {
			if($(this).parent().siblings('input.atcRedirect').length > 0) {
				$(this).parent().siblings('input.atcRedirect').val(atcRedirect);
			}
		}

		if(offeringStatus.indexOf('|C') == -1) {
			submitButton.attr('disabled','disabled');
			submitButton.addClass('disabled');
			prodQuantity.addClass('disabled');
		} else {
			submitButton.removeAttr('disabled');
			submitButton.removeClass('disabled');
			prodQuantity.removeClass('disabled');
		}
	});
}

/*--------------------------------------------------------------------------------------------------------*/

/* addEvent() - used to attach event listeners for Live Person eChat functionality */
/* This version taken from Christian Heilmanns book; isbn 1-59059-680-3 */
/* addEvent() is also located in scriptLib for headers that don't include global.js. *
/* DAC 6/12/2006 */
function addEvent(elm, evType, fn, useCapture) {
	if (elm.addEventListener) {
		elm.addEventListener(evType, fn, useCapture);
		return true;
	}
	else if (elm.attachEvent) {
		var r = elm.attachEvent('on' + evType, fn);
		return r;
	} else {
		elm['on' + evType] = fn;
	}
}


/*--------------------------------------------------------------------------------------------------------*//***
** title: Tracking Codes for SC2 Photo and Video Galleries
** author: Josh Sherer
** company: Bose Corporation
** requires: jQuery 1.3.x
** last updated: 7/5/2012
** trackingSC2PhotoGallery() - specific tracking code for SC2 photo gallery view
** trackingSC2VideoGallery() - specific tracking code for SC2 video gallery view
***/

function trackingSC2PhotoGallery() {
	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	if(jQuery('#sc2phototrk').length == 0) {
		jQuery('body').append('\n\n<!--\nStart of DoubleClick Floodlight Tag: Please do not remove\nActivity name of this tag: VideoWave 2 Photo Page\nURL of the webpage where the tag is expected to be placed: http://TBD\nThis tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.\nCreation Date: 06/01/2012\n-->\n\n');
		jQuery('body').append('<iframe id="sc2phototrk" src="http://fls.doubleclick.net/activityi;src=1859255;type=sitea812;cat=video822;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
	}
}


function trackingSC2VideoGallery() {
	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	if(jQuery('#sc2videotrk').length == 0) {
		jQuery('body').append('\n\n<!--\nStart of DoubleClick Floodlight Tag: Please do not remove\nActivity name of this tag: VideoWave 2 Video Page\nURL of the webpage where the tag is expected to be placed: http://TBD\nThis tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.\nCreation Date: 06/01/2012\n-->\n\n');
		jQuery('body').append('<iframe id="sc2videotrk" src="http://fls.doubleclick.net/activityi;src=1859255;type=sitea812;cat=video834;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
	}
}


/*--------------------------------------------------------------------------------------------------------*//***
** title: Ajax cookie setting form validation and submission to enable User Reviews
** author: Josh Sherer
** company: Bose Corporation
** requires: jQuery 1.3.x
** last updated: 8/20/2012
***/


function reviewsLoginForm() {
var cntr=0;
	$('#customer-reviews-login-form').focus();
    $('#reviewsEmail').click(function() {$('#emailError').html('&#160;');});
    $('#reviewsLoginSubmit').click(function(){
        if(is_valid_email($('#reviewsEmail').val())) {
            if($('#reviewsName').val().length == 0 ) {
                $('#reviewsName').val("Anonymous");
            }
            $.ajax({
                type     : "POST",
                cache    : false,
                url      : $('#customer-reviews-login-form').attr('action'),
                data     : $('#customer-reviews-login-form').serialize(),
                success  : function(data) {
                    if(checkForCookie('at')) {
                      $('#overlay').remove();
                      $('#overlay').html('');
                      objLightbox.hideLightbox();
                      plcOvrds.widgetRefresh(true);   // set cookie property in pluck overrides object to true and refresh widgets
                    } else {
                      $('#formError').html('We are unable to process your submission. Please make sure you have COOKIES enabled in your browser and try again.');
                      cntr = cntr+1;
                      if (cntr == 0) {plcOvrds.widgetRefresh(false); }  // set cookie property in pluck overrides object to false and refresh widgets
                    }
                }
            });
            } else {
                if(!(is_valid_email($('#reviewsEmail').val()))) {
                    $('#emailError').html('Please enter a valid email.');
                }
            }
        	return false;
    });
}

/*--------------------------------------------------------------------------------------------------------*//***
** title: Add To Cart Button Enhanced Functionality Support
** author: Joshua Sherer
** company: Bose Corporation
** requires: jQuery 1.5+
** last updated: 2013.09.20
** description: If the hidden "atcRedirect" in the relative form element to the "addtocart_button" is populated, prevent the form submission when the "addtocart_button" is clicked and instead redirect to the URL passed as the value of the "atcRedirect" element.
***/

jQuery(document).ready(function() {
	jQuery('.addtocart_button').click(function(e) {
		e.preventDefault();
		var redirect;
		if(jQuery(this).siblings('.atcRedirect').length > 0) {
			redirect = jQuery(this).siblings('.atcRedirect').val();
			if(redirect.length > 2) {
				window.location = redirect;
			} else {
				jQuery('#addToCart').submit();
			}
		} else {
			if(jQuery(this).parent().siblings('.atcRedirect').length > 0) {
				redirect = jQuery(this).parent().siblings('.atcRedirect').val();
				if(redirect.length > 2) {
					window.location = redirect;
				} else {
					jQuery(this).parent().parent().submit();
				}
			}
		}
	});
});

