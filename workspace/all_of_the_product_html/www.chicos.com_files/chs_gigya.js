/* 
* These are the settings and parameters for the chicos, whbm, and soma GIGYA Share Bar. 
*/ 

/* ----------------------------------------------------------------------------------------- */ 
/* -- TO CHANGE THE HASHTAG -- CHANGE THE VALUE BELOW -- */ 

          var chs_hashtag = "#chicos"; 

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
var gigya_fullProductName = "Chico's " + trim(gigya_productName); 
var hashtag_fullProductName = gigya_fullProductName + ' ' + chs_hashtag; 
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
var gigya_fullProductName = "Chico's " + trim(gigya_productName); 
var hashtag_fullProductName = gigya_fullProductName + ' ' + chs_hashtag; 
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
email_act.setTitle('Look at what your friend found at Chico\'s!'); 
email_act.setLinkBack(gigya_URL); 
email_act.setDescription(gigya_description); 
email_act.addActionLink(gigya_fullProductName, gigya_URL); 
email_act.addMediaItem(gigya_image); 

var showShareBarUI_params= 
{ 
cid: gigya_cid,
userAction: gigya_act, 
emailBody: '<div id=":13o" class="ii gt m13f908885f1fbfa6 adP adO"><div id=":13p" style="overflow: hidden;"><div bgcolor="#fcf9f2" style="text-align:center;margin:0 auto;font-size:11px;font-family:Arial,Helvetica,sans-serif"><div style="text-align:left;margin:0px auto;width:617px"><p style="font-size:10px;text-align:center"></p><div style="color:#666;width:615px;font-size:12px;border:1px solid #eadec4"><div style="margin:0;padding:10px 0 5px 0"><img alt="Chico\'s" src="http://www.chicos.com/web_assets/email/logo.gif"></div><div style="width:615px;float:left;border-top:1px solid #eadec4"><div style="padding:20px"><p style="font-size:24px;font-family:Arial,Helvetica,sans-serif;margin-top:0px;text-transform:capitalize"><strong>$title$</strong></p><p style="font-family:Arial,Helvetica,sans-serif"><strong><br /><br />$sender$</strong> thinks you will like the following product: <br />$actionLinkTitle$<br /><br />$description$<br /></p><div style="width:300px;padding:20px 0px;margin-left:10px;background:url(http://www.chicos.com/web_assets/email/quote.gif) no-repeat left top;padding-left:70px;float:right"><strong>$sender$ says:</strong><br>$userMsg$</div><div style="float:left"><br></div></div><div style="width:615px;padding:20px"><p style="font-family:Arial,Helvetica,sans-serif">Check out this item now at the following link: <br>$URL$</p></div></div><div style="clear:both;padding:0px;margin:0px;min-height:0px;font-size:0px;line-height:0px"></div><div style="padding:10px 20px;border-top:solid 1px #eadec4;text-align:center"><a style="color:#666;text-decoration:none" href="http://www.chicos.com/" target="_blank">chicos.com</a> :: <a style="color:#666;text-decoration:none" href="http://www.chicos.com/store/page.jsp?id=37" target="_blank">Customer Service</a> :: <a style="color:#666;text-decoration:none" href="http://www.chicos.com/store/store_locator.jsp" target="_blank">Find a Store</a> :: <a style="color:#666;text-decoration:none" href="http://www.chicos.com/store/page.jsp?id=33" target="_blank">Privacy Policy</a> :: Toll Free <a href="tel:888.855.4986" value="+18888554986" target="_blank">888.855.4986</a></div></div><p style="text-align:center">Chico\'s<br>11215 Metro Parkway, Fort Myers, FL 33966 USA<br>&copy; 2013 Chico\'s Distribution Services, LLC. All Rights Reserved.</p><div class="yj6qo"></div><div class="adL"></div></div><div class="adL"></div></div><div class="adL"></div></div></div>', 
iconsOnly: 'true', 
shareButtons: [ 
{ 
provider: 'Facebook', 
iconImgUp:'http://www.chicos.com/web_assets/images/gigya/fb-share20x.gif', 
iconImgOver:'http://www.chicos.com/web_assets/images/gigya/fb-share20x-on.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'Twitter', 
userAction: twitter_act, 
iconImgUp:'http://www.chicos.com/web_assets/images/gigya/twitter20x.gif', 
iconImgOver:'http://www.chicos.com/web_assets/images/gigya/twitter20x-on.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'Email', 
userAction: email_act, 
iconImgUp:'http://www.chicos.com/web_assets/images/gigya/email20x.gif', 
iconImgOver:'http://www.chicos.com/web_assets/images/gigya/email20x-on.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'google-plusone', 
userAction: gigya_act, 
iconImgUp:'http://www.chicos.com/web_assets/images/gigya/gplus20x32.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'Pinterest', 
userAction:pinterest_act, 
iconImgUp:'http://www.chicos.com/web_assets/images/gigya/pinterest20x40.gif', 
iconImgOver:'http://www.chicos.com/web_assets/images/gigya/pinterest20x40.gif', 
enableCount: 'false' 
}, 
{ 
provider: 'Facebook-Like', 
iconImgUp:'http://www.chicos.com/web_assets/images/gigya/fb-like20x48.gif', 
enableCount: 'true' 
} 
], 
containerID: 'componentDiv' 
} 

// gigya.socialize.showShareBarUI(showShareBarUI_params);  