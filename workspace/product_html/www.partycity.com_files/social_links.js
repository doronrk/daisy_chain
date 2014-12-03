function printSocialLinks() {
	var social_domain = 'www.partycity.com';
	var social_elm    = document.getElementById('social_widget_table');
	var social_url    = window.location.protocol + "//" + social_domain + window.location.pathname.toLowerCase();

	var email_subject = "Check this out on PartyCity.com!";
	var email_body    = "I couldn't wait to share this with you from PartyCity.com!\n\n" + social_url;

	if (social_url.indexOf("/content/") != -1 && !document.getElementById('photogallery') && !document.getElementById('featureImage') && social_url.indexOf("guide.do") == -1) {
		social_elm.style.position = "relative";
		social_elm.style.left = "10px";
	} else {
		if (social_url.indexOf("guide.do") == -1) {
			social_elm.style.position = "relative";
			social_elm.style.top  = "-1px";
			social_elm.style.left = "-5px";
		} else {
			social_elm.style.position = "relative";
			social_elm.style.top = "-5px";
		}
	}

	var pi_url = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
	var pi_img = false;
	var pi_elm = document.getElementsByTagName('link');

	for (var pi_i = 0; pi_i < pi_elm.length; pi_i ++) {
		if (pi_elm[pi_i].rel == 'image_src') {
			pi_img = pi_elm[pi_i].href.replace(/wid=\d+&hei=\d+/, 'wid=475');
			pi_i = pi_elm.length;
		}
	}

	if (!pi_img && document.getElementById('featureImage')) {
		pi_img = document.getElementById('featureImage').src;
	}

	var pi_descr = document.getElementsByTagName('title')[0].innerHTML.replace(/^\s*|\s*$/g, "");

	var pi_head_img = document.createElement('meta');
	pi_head_img.setAttribute('property', 'og:image');
	pi_head_img.setAttribute('content', pi_img);

	document.getElementsByTagName('head')[0].appendChild(pi_head_img);

	var pi_head_url = document.createElement('meta');
	pi_head_url.setAttribute('property', 'og:url');
	pi_head_url.setAttribute('content', pi_url);

	document.getElementsByTagName('head')[0].appendChild(pi_head_url);

	var pi_head_title = document.createElement('meta');
	pi_head_title.setAttribute('property', 'og:title');
	pi_head_title.setAttribute('content', pi_descr);

	document.getElementsByTagName('head')[0].appendChild(pi_head_title);

	var facebook_cell = document.getElementById('facebook_like_cell');
	if (facebook_cell) {
		var facebook_like = document.createElement('iframe');
		facebook_like.style.width  = "80px";
		facebook_like.style.height = "21px";
		facebook_like.frameBorder  = 0;
		facebook_like.scrolling    = "no";
		facebook_like.src          = "https://www.facebook.com/plugins/like.php?api_key=&locale=en_US&sdk=joey&ref=.UfE_AHDXMEk.like&channel_url=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D25%23cb%3Df1c5fb011%26origin%3Dhttp%253A%252F%252F" + encodeURIComponent(social_domain) + "%252Ff26172451c%26domain%3D" + social_domain + "%26relation%3Dparent.parent&href=" + encodeURIComponent(social_url) + "&node_type=link&width=" + facebook_like.width + "&height=" + facebook_like.height + "&font=arial&layout=button_count&colorscheme=light&action=like&show_faces=false&send=false&extended_social_context=false";

		facebook_cell.appendChild(facebook_like);

		facebook_cell.style.width      = facebook_like.style.width;
		facebook_cell.style.paddingTop = "2px";
	}

	var pinterest_cell = document.getElementById('pinit_cell');
	if (pinterest_cell) {
		var pinit_button = document.createElement('a');
		pinit_button.setAttribute('data-pin-do', 'buttonPin');
		pinit_button.setAttribute('data-pin-config', 'beside');
		pinit_button.href      = "//pinterest.com/pin/create/button/?url=" + encodeURIComponent(social_url) + "&media=" + encodeURIComponent(pi_img) + "&description=" + encodeURIComponent(pi_descr);
		pinit_button.innerHTML = '<img src="//assets.pinterest.com/images/pidgets/pin_it_button.png" />';

		pinterest_cell.appendChild(pinit_button);

		pinterest_cell.style.width        = "80px";
	}

	var google_plus_cell = document.getElementById('google_plus_cell');
	if (google_plus_cell) {
		var google_plus_button = document.createElement('div');
		google_plus_button.setAttribute('data-size', 'medium');
		google_plus_button.setAttribute('data-href', social_url);
		google_plus_button.className = "g-plusone";
		google_plus_button.style.width = "80px";

		google_plus_cell.appendChild(google_plus_button);

		google_plus_cell.style.width = google_plus_button.style.width;
	}

	var email_link_cell = document.getElementById('email_link_cell');
	if (email_link_cell) {
		var email_link_button = document.createElement('a');

		email_link_button.href = "mailto:?subject=" + encodeURIComponent(email_subject) + "&body=" + encodeURIComponent(email_body);
		email_link_button.innerHTML = "<img src='/images/set_c/en_us/email.gif' border='0' />";

		email_link_cell.appendChild(email_link_button);
	}

	var pinterest_script  = document.createElement('script');
	pinterest_script.type = "text/javascript";
	pinterest_script.src  = "//assets.pinterest.com/js/pinit.js";
	document.body.appendChild(pinterest_script);

	var google_plus_script   = document.createElement('script');
	google_plus_script.type  = 'text/javascript';
	google_plus_script.async = true;
	google_plus_script.src = 'https://apis.google.com/js/plusone.js';
	var first_head_script = document.getElementsByTagName('script')[0];
	first_head_script.parentNode.insertBefore(google_plus_script, first_head_script);
}


if (internetExplorerVersionLessThan9() == true) {
	jQuery(window).load(printSocialLinks);
} else {
	jQuery(document).ready (
		function() {
			printSocialLinks();
		}
	);
}


