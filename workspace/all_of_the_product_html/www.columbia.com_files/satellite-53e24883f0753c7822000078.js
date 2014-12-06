_satellite.pushAsyncScript(function(event, target, $variables){
  if ((TagManagerData.SiteID === "Columbia_US" || TagManagerData.SiteID === "Sorel_US" || TagManagerData.SiteID === "MountainHardwear_US" || TagManagerData.SiteID === "Montrail_US" || TagManagerData.SiteID === "Columbia_CA" || TagManagerData.SiteID === "Sorel_CA") && navigator.userAgent.indexOf("MSIE 9") == -1){
var dotomi_promo_id = "";
var dtmSrc = "";

if( TagManagerData.SiteID === "Columbia_US"){
	//Columbia
	dtmSrc = window.location.protocol + "//login.dotomi.com/ucm/UCMController?dtm_com=28&dtm_fid=101&dtm_cid=2558&dtm_cmagic=2288f6&dtm_format=5";
} else if (TagManagerData.SiteID === "Sorel_US"){
	dtmSrc = window.location.protocol + "//login.dotomi.com/ucm/UCMController?dtm_com=28&dtm_fid=101&dtm_cid=2561&dtm_cmagic=59eb5d&dtm_format=5";
} else if (TagManagerData.SiteID === "MountainHardwear_US"){
	dtmSrc = window.location.protocol + "//login.dotomi.com/ucm/UCMController?dtm_com=28&dtm_fid=101&dtm_cid=2560&dtm_cmagic=eb0ecd&dtm_format=5";
} else if (TagManagerData.SiteID === "Montrail_US"){
	dtmSrc = window.location.protocol + "//login.dotomi.com/ucm/UCMController?dtm_com=28&dtm_fid=101&dtm_cid=2562&dtm_cmagic=dbab2a&dtm_format=5";
} else if (TagManagerData.SiteID === "Columbia_CA"){
  dtmSrc = window.location.protocol + "//login.dotomi.com/ucm/UCMController?dtm_com=28&dtm_fid=101&dtm_cid=2823&dtm_cmagic=46f76a&dtm_format=5";
} else if (TagManagerData.SiteID === "Sorel_CA"){
  dtmSrc = window.location.protocol + "//login.dotomi.com/ucm/UCMController?dtm_com=28&dtm_fid=101&dtm_cid=2824&dtm_cmagic=b030af&dtm_format=5";
}
var dtmTag = new Array();
if (typeof TagManagerData.CategoryPath !== "undefined" && TagManagerData.CategoryPath.length === 3){
	//sub sub category
	dotomi_promo_id = "4";
	dtmTag.dtmc_category = TagManagerData.CategoryID;
} else if (typeof TagManagerData.CategoryPath !== "undefined" && TagManagerData.CategoryPath.length === 2){
	//sub category
	dotomi_promo_id = "3";
	dtmTag.dtmc_category = TagManagerData.CategoryID;
} else if (typeof TagManagerData.CategoryPath !== "undefined" && TagManagerData.CategoryPath.length === 2){
	//top level category
	dotomi_promo_id = "2";
	dtmTag.dtmc_category = TagManagerData.CategoryID;
} else if (TagManagerData.PageType === "Home"){
	dotomi_promo_id = "1";
} else if (TagManagerData.PageType === "Search"){
	dotomi_promo_id = "7";
} else if (TagManagerData.PageType === "ProductDetail"){
	dotomi_promo_id = "5";
	dtmTag.dtmc_product_id = TagManagerData.ProductID;
} else if (TagManagerData.PageType === "Cart"){
	dotomi_promo_id = "6";
}
dtmTag.cli_promo_id = dotomi_promo_id;
dtmTag.dtmc_ref = document.referrer;
dtmTag.dtmc_loc = document.location.href;
dtmTag.dtm_user_token = "";
function readCookieDotomi() {
	var name = "dtm_token";
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0) == ' ')
		c = c.substring(1, c.length);
		if(c.indexOf(nameEQ) == 0) {
			var d = c.substring(nameEQ.length, c.length);
			dtmTag.dtm_user_token = d;
		}
	}
}
readCookieDotomi();

for (var item in dtmTag){
	if(typeof dtmTag[item] != "function" && typeof dtmTag[item] != "object")
		dtmSrc += "&" + item + "=" + escape(dtmTag[item]);
}
  
//setTimeout('timeOutDotomi()',2000);
var newDotomiNode = document.createElement("div");
newDotomiNode.style.display = "none";
newDotomiNode.id = "dtmdiv";
var newIFrame = document.createElement("iframe");
newIFrame.name = "response_frame";
newIFrame.src = dtmSrc;
newDotomiNode.appendChild(newIFrame);
document.body.appendChild(newDotomiNode);
function timeOutDotomi() { document.getElementById("dtmdiv").innerHTML = "";}  

}
});
