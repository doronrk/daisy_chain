MACYS.namespace("MACYS.pdp.googleAdsense");

google_ad_client = 'ca-macys_js'; // substitute your client_id
google_ad_channel = 'siteproductpage'; // substitute your channel
google_ad_output = 'js'; // leave this value as js
google_max_num_ads = '6'; // specify the number of maximum ads
google_ad_type = 'text'; // type of ads to display
google_safe = 'high'; // specify the ad safety
google_feedback = 'on';
google_encoding = 'ISO-8859-1'; // specify the output language of the ads

MACYS.pdp.googleAdsense = (function (){
	
	var self = {};
	
	self.writeAds = function (google_ads){
		
		var content;
		
		if (google_ads.length == 0){
			document.getElementById("googleAdsense").style.display = "none";
			return;
		}
		content = '<a class="ad_attribution" href="'+google_info.feedback_url+'" target="_blank">Ads by Google</a><br>';
		if (google_ads[0].type == "image") {
			content += '<a href="' + google_ads[0].url +'" target="_top" title="go to ' +	google_ads[0].visible_url +
			unescape("%22%3E%3Cimg%20border%3D%220%22%20src%3D%22") +google_ads[0].image_url +'"width="' + google_ads[0].image_width +
			'"height="' + google_ads[0].image_height +'"></a>';
		} else if (google_ads[0].type == "text") {
			// Adjust text sizes to occupy the majority of ad space.
			if (google_ads.length == 1) {
				ad_title_class = 'ad_title_large';
				ad_text_class = 'ad_text_large';
				ad_url_class = 'ad_url_large';
			} else {
				ad_title_class = 'ad_title';
				ad_text_class = 'ad_text';
				ad_url_class = 'ad_url';
			}

			for(var i=0; i < google_ads.length; i++) {
				content += '<br><a class="' + ad_title_class + '" href="'+ google_ads[i].url + '" target="_blank">' +
				google_ads[i].line1 + '</a><br><span class="' +ad_text_class + '">' +
				google_ads[i].line2 +' '+ google_ads[i].line3 + '</span><br>' +
				'<a class="' + ad_url_class + '" href="' +google_ads[i].url + '"  target="_blank">' +
				google_ads[i].visible_url + '</a><br>';
			}
		}

		YAHOO.util.Dom.get("wide_ad_unit").innerHTML = content;
		
	};

	return self;
	
})();

function google_ad_request_done(google_ads) {
	
	MACYS.pdp.googleAdsense.writeAds( google_ads );

};