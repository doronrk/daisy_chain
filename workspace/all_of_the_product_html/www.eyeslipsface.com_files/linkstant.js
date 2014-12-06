// Thanks for checking out Linkstant. We've kept this Javascript completely unminimized and full of comments, so that you can see exactly what you're adding to your site!
// To find out more, or to discover new links to your own content, visit www.linkstant.com

// This outer 'IF' statement ensures that we immediately quit if there's no referer, or if the referring URL is on the same site.
// This massively reduces the number of times the code has to call Linkstant
if (document.referrer && (document.referrer.split('/')[2] != window.location.host)){
	
	// This loop finds the user's ID from the 'linkstant' meta tag
	  var m = document.getElementsByTagName('meta');
	  for(var i in m){
		if(m[i].name == 'linkstant'){var uid = m[i].content;}
		if(m[i].name == 'linkstant_tag'){var tag = m[i].content;}
	  }
	
	// We only continue if the user ID was specified
	if (typeof uid == "string") {
		// We trim the referer down, to avoid sending around huge URLs
		ref = document.referrer.substring(0, 499)
		
		
		// This section loops through a blacklist, to avoid alerting you about 'links that aren't really links', and EXITs if there's a match
		var blacklist = ['https?://[^/]+\.google\.', 'https?://[^/]+\.yahoo\.com', 'https?://[^/]+\.bing\.com/search', 'stumbleupon\.com', 'https?://[^/]+\.facebook\.com', 'mail\.live\.com', 'https?://[^/]+\.ask\.com', 'https?://t\.co', 'https?://[^/]+\.mywebsearch\.com', 'https?://[^/]+\.search-results\.com', 'isearch\.avg\.com', 'search\.conduit\.com', 'search\.sweetim\.com', 'search\.babylon\.com']
				
		for(i=0; i<blacklist.length; i++) {
			if (ref.match(blacklist[i])){
				exit;
			}
		}
		
			
		// We're setting up to do an AJAX call here. It's being done 'manually', without jQuery or similar
		if (window.XMLHttpRequest) { // code for IE7+, FF, Chrome, Opera, Safari
			http=new XMLHttpRequest();
		}
		
		else { // code for IE6, IE5
			http=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		http.onreadystatechange=function() {
			if (http.readyState==4 && http.status==200) {
				response = http.responseText;
			}
		}
		
		// These lines make the AJAX call to Linkstant; server-side processing then checks to see if this is a new link
		dest="http://www.linkstant.com/x9/?jsv=7&uid="+uid+"&tag="+tag+"&url=" + window.location.href.replace(window.location.hash,'') + "&referer=" + ref
		http.open("GET", dest);
		http.send();
		
	}
}
// v9 - 03/15/2012 - 0248PST