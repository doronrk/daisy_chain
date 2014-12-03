

function usi_setCookie(name, value, expires) {
   var date = new Date();
   date.setTime(date.getTime()+expires);
   expires = '; expires='+date.toGMTString();
   document.cookie = name+"="+escape(value)+expires+'; path=/';
   var cookie = null;
}
function usi_readCookie(name) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}

var USIqs = "";
var USIsiteID = "";
var USI_key = "";
var USIDHqs = "";
var USIDHsiteID = "";
var usi_url = location.href.toLowerCase();

if (usi_url.indexOf("usi=15p") != -1 && usi_readCookie("usi_Discount") == null) {
   usi_setCookie("usi_Discount", "1", 60*60*360*60);
}

if (usi_readCookie("usi_Discount") == "1" && usi_url.indexOf("andrewchristian.com/index.php/checkout/cart") != -1) {
   usi_setCookie("usi_Discount", "0", 60*60*360*60);
   try{
   document.getElementById("coupon_code").value="15chatupdec";
   discountForm.submit(false);
   }catch (e) {}
}

if (usi_url.indexOf("andrewchristian.com/index.php/checkout/cart") != -1 || usi_url.indexOf("andrewchristian.com/index.php/onestepcheckout") != -1) {
   usi_setCookie("usi_cart", "1", 60*60*360*60);
}

if (usi_readCookie("usi_cart") == "1" && usi_url.indexOf("success") == -1) {
   USIqs = "208264245208281273289344299272312325291342329321281339312280";
   USIsiteID = "3194";
}else{
	var theCartItems = "0";
	try{
	 
	var spans = document.getElementsByTagName('div');
	for (var i=0; i<spans.length; i++ ) {
		if (spans[i].className != null && spans[i].className.indexOf("span_price") != -1) {
			if (spans[i].innerHTML.indexOf("(") != -1 && spans[i].innerHTML.indexOf(")") != -1) {
				theInnerHTML = spans[i].innerHTML;
				theInnerHTML = theInnerHTML.substring(theInnerHTML.lastIndexOf("(")+1, theInnerHTML.length);
				theInnerHTML = theInnerHTML.substring(0, theInnerHTML.indexOf(")"));
				theCartItems = theInnerHTML;
			}
		}
	}
	if (theCartItems >= 1) {
		usi_setCookie("usi_cart", "1", 60*60*360*60);
                USIqs = "208264245208281273289344299272312325291342329321281339312280";
                USIsiteID = "3194";
	}else{
                usi_setCookie("usi_cart", "0", 60*60*360*60);
        }
	}catch(e) {}
}

if (usi_url.indexOf("andrewchristian.com/index.php/checkout/cart") != -1 || usi_url.indexOf("andrewchristian.com/index.php/onestepcheckout") != -1) {
   USIDHqs = "239268217268291339340289325308323302297279280327327305276294";
   USIDHsiteID = "7028";
}

if (USIqs != "" && usi_readCookie("usi_Discount") == null && usi_url.indexOf("wholesale") == -1 && usi_readCookie('u-upsellitc963') == null) {
   var USI_headID = document.getElementsByTagName("head")[0];
   var USI_dynScript = document.createElement("script");
   USI_dynScript.setAttribute("type","text/javascript");
   USI_dynScript.setAttribute("src","//www.upsellit.com/upsellitJS4.jsp?qs="+USIqs+"&siteID="+USIsiteID+"&keys="+USI_key);
   USI_headID.appendChild(USI_dynScript);
}

if (USIDHqs != "" && usi_url.indexOf("wholesale") == -1) {
   var USI_headID = document.getElementsByTagName("head")[0];
   var USI_dynScript2 = document.createElement("script");
   USI_dynScript2.setAttribute("type","text/javascript");
   USI_dynScript2.setAttribute("src","//www.upsellit.com/hound/monitor.jsp?qs="+USIDHqs+"&siteID="+USIDHsiteID);
   USI_headID.appendChild(USI_dynScript2);
}


usi_alert = function(msg) {}




