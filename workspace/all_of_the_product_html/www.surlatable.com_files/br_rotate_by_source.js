<!--Hide script from old browsers
// ONLY EDIT THIS LINE
  var br_domain= ".surlatable.com"; // Please change .bizrate.com to your domain name
//DO NOT EDIT BELOW THIS LINE

function br_SetPOS2(br_cookie_name, br_cookie_value, br_cookie_path, br_cookie_domain) {
  // Begin the cookie parameter string
  var br_cookie_string = br_cookie_name + "=" + br_cookie_value;
  // Add the expiration date by defailt set for 24 hours
  var br_expire_date = new Date();
  var br_ms_from_now = 24 * 60 * 60 * 1000;
  br_expire_date.setTime(br_expire_date.getTime() + br_ms_from_now);
  var br_expire_string = br_expire_date.toGMTString();
  br_cookie_string += "; expires=" + br_expire_string;
  // Add the path, if it was specified
  if (br_cookie_path) {
    br_cookie_string += "; path=" + br_cookie_path;
  }
  // Add the domain, if it was specified
  if (br_cookie_domain) {
    br_cookie_string += "; domain=" + br_cookie_domain;
  }
  // Set the cookie
  document.cookie = br_cookie_string;
}

function br_SetPOS() {
  if (document.referrer == "") {
  	br_SetPOS2("br_PovRotV2", location.href, "/", br_domain);
  }
  else if (document.referrer.indexOf(br_domain) != -1) {
	//do nothing
  }
  else {
	br_SetPOS2("br_PosRotV2", document.referrer, "/", br_domain);
  }
}

br_SetPOS();
// -- Stop hiding script -->
