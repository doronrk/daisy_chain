/* 
* These are the settings and parameters for the chicos, whbm, and soma GIGYA Share Bar. 
*/ 

/* ----------------------------------------------------------------------------------------- */ 
/* -- TO CHANGE THE HASHTAG -- CHANGE THE VALUE BELOW -- */ 

          var whbm_hashtag = "#whbm"; 

/* -- DON'T CHANGE ANYTHING BELOW THIS LINE -------------------- */ 
/* -- (unless you know what you're doing) ------------------------------------ */ 
/* ----------------------------------------------------------------------------------------- */ 






function getQueryStrings() { 
var assoc = {}; 
var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); }; 
var queryString = location.search.substring(1); 
var keyValues = queryString.split('&'); 
for(var i in keyValues) { 
var key = keyValues[i].split('='); 
if (key.length > 1) { 
assoc[decode(key[0])] = decode(key[1]); 
} 
} 
return assoc; 
} 

var gigya_qs = getQueryStrings(); 
var gigya_cid = gigya_qs["productId"]; 

if (typeof giggy_desc === 'undefined') { 
var gigya_URL = document.URL; 
var gigya_URL = gigya_URL.replace("//m.", "//www.");
var gigya_fullPicture = trim(document.getElementById("modelshot").src); 
var gigya_productName = $('div#product-name').text(); 
var gigya_fullProductName = "White House | Black Market " + trim(gigya_productName); 
var hashtag_fullProductName = gigya_fullProductName + ' ' + whbm_hashtag; 
var gigya_longDescription = trim(document.getElementById("product-description").innerHTML); 
var gigya_description = gigya_longDescription.substring(0, gigya_longDescription.indexOf('<')); 
var gigya_title_and_description = gigya_fullProductName + " " + gigya_description; 
$('head').append('<meta property="og:url" content="' + gigya_URL + '"> '); 
$('head').append('<meta property="og:image" content="' + gigya_fullPicture + '"> '); 
$('head').append('<meta property="og:description" content="' + gigya_description + '"> '); 
$('head').append('<meta name="description" content="' + gigya_description + '"> '); 
} else { 
var gigya_URL = giggy_URL; 
var gigya_fullPicture = trim(document.getElementById("modelshot").src); 
var gigya_productName = $('div#product-name').text(); 
var gigya_fullProductName = "White House | Black Market " + trim(gigya_productName); 
var hashtag_fullProductName = gigya_fullProductName + ' ' + whbm_hashtag; 
var gigya_longDescription = trim(document.getElementById("product-description").innerHTML); 
var gigya_description = gigya_longDescription.substring(0, gigya_longDescription.indexOf('<')); 
var gigya_title_and_description = gigya_fullProductName + " " + gigya_description; 
$('head').append('<meta property="og:image" content="' + gigya_fullPicture + '"> '); 
$('head').append('<meta property="og:description" content="' + gigya_description + '"> '); 
} 
var gigya_image = { 
type: 'image', 
src: gigya_fullPicture, 
href: gigya_URL 
} 

//default useraction 
var gigya_act = new gigya.socialize.UserAction(); 
gigya_act.setTitle(gigya_fullProductName); 
gigya_act.setLinkBack(gigya_URL); 
gigya_act.setDescription(gigya_description); 
gigya_act.addMediaItem(gigya_image); 

//pinterest useraction 
var pinterest_act = new gigya.socialize.UserAction(); 
pinterest_act.setTitle(gigya_fullProductName); 
pinterest_act.setLinkBack(gigya_URL); 
pinterest_act.setDescription(hashtag_fullProductName); 
pinterest_act.addMediaItem(gigya_image); 

//twitter useraction 
var twitter_act = new gigya.socialize.UserAction(); 
twitter_act.setTitle(hashtag_fullProductName); 
twitter_act.setLinkBack(gigya_URL); 
twitter_act.setDescription(hashtag_fullProductName); 
twitter_act.addMediaItem(gigya_image); 

//email useraction 
var email_act = new gigya.socialize.UserAction(); 
email_act.setTitle('Look at what your friend found at White House | Black Market!'); 
email_act.setLinkBack(gigya_URL); 
email_act.setDescription(gigya_description); 
email_act.addActionLink(gigya_fullProductName, gigya_URL); 
email_act.addMediaItem(gigya_image); 

var showShareBarUI_params= 
{ 
cid: gigya_cid, 
userAction: gigya_act, 
iconsOnly: 'true', 
emailBody: '<div id=":13o" class="ii gt m13f91f8731a96346 adP adO"><div id=":19r" style="overflow: hidden;"><div bgcolor="#f1f0f3" style="text-align:center;margin:0 auto;font-size:11px;font-family:Arial,Helvetica,sans-serif"><div style="text-align:left;margin:0px auto;width:617px"><p style="font-size:10px;text-align:center"></p><div style="color:#666;width:615px;font-size:12px;border:1px solid #ccc"><div style="margin:0;padding:10px 0 5px 0"><img alt="White House | Black Market" src="http://www.whitehouseblackmarket.com/web_assets/email/logo.gif"></div><div style="width:615px;float:left;border-top:1px solid #ccc"><div style="padding:20px"><p style="font-size:24px;font-family:Arial,Helvetica,sans-serif;margin-top:0px;text-transform:capitalize">$title$</p><p style="font-family:Arial,Helvetica,sans-serif"><br /><br /><strong>$sender$</strong> thinks you will like the following product:<br />$actionLinkTitle$<br /><br />$description$</p><div style="width:300px;padding:20px 0px;margin-left:10px;background:url(http://www.whitehouseblackmarket.com/web_assets/email/quote.gif) no-repeat left top;padding-left:70px;float:right"><strong>$sender$ says:</strong><br>$userMsg$</div><div style="float:left"><br></div></div><div style="width:615px;padding:20px"><p style="font-family:Arial,Helvetica,sans-serif">Check out this item now at the following link: <br>$URL$</p></div></div><div style="clear:both;padding:0px;margin:0px;min-height:0px;font-size:0px;line-height:0px"></div><div style="padding:10px 20px;border-top:solid 1px #ccc;text-align:center"><a style="color:#666;text-decoration:none" href="http://www.whitehouseblackmarket.com/" target="_blank">whitehouseblackmarket.com</a> :: <a style="color:#666;text-decoration:none" href="http://www.whitehouseblackmarket.com/store/page.jsp?id=22" target="_blank">Customer Service</a> :: <a style="color:#666;text-decoration:none" href="http://www.whitehouseblackmarket.com/store/store_locator.jsp" target="_blank">Find a Store</a> :: <a style="color:#666;text-decoration:none" href="http://www.whitehouseblackmarket.com/store/page.jsp?id=18" target="_blank">Privacy Policy</a> :: Toll Free <a href="tel:877.948.2525" value="+18779482525" target="_blank">877.948.2525</a></div></div><p style="text-align:center">White House | Black Market<br>11215 Metro Parkway, Fort Myers, FL 33966 USA<br>&copy; 2013 Chico\'s Distribution Services, LLC. All Rights Reserved.</p><div class="yj6qo"></div><div class="adL"></div></div><div class="adL"></div></div><div class="adL"></div></div></div>', 
shareButtons: [ 
{ 
provider: 'Facebook', 
iconImgUp:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/fb-share20x.gif', 
iconImgOver:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/fb-share20x-on.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'Twitter', 
userAction: twitter_act, 
iconImgUp:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/twitter20x.gif', 
iconImgOver:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/twitter20x-on.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'Email', 
userAction: email_act, 
iconImgUp:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/email20x.gif', 
iconImgOver:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/email20x-on.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'google-plusone', 
userAction: gigya_act, 
iconImgUp:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/gplus20x32.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'Pinterest', 
userAction:pinterest_act, 
iconImgUp:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/pinterest20x40.gif', 
iconImgOver:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/pinterest20x40.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'Facebook-Like', 
iconImgUp:'http://www.whitehouseblackmarket.com/web_assets/images/gigya/fb-like20x48.gif', 
enableCount: 'true' 
} 
], 
containerID: 'componentDiv' 
} 

// gigya.socialize.showShareBarUI(showShareBarUI_params);  