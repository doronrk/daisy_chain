_satellite.pushAsyncScript(function(event, target, $variables){
  var dtmSrc = window.location.protocol + "//login.dotomi.com/ucm/UCMController?"+
    "dtm_com=28&dtm_fid=101&dtm_cid=2365&dtm_cmagic=9fb7b0&dtm_format=5";
var p = _satellite.getVar('window.UA.DIGITALDATA.product'), prod = {};
if(p && p.length==1){
  prod = p[0];
}
var dtmTag = new Array();
dtmTag.cli_promo_id = "5";
dtmTag.dtmc_product_id = _satellite.getVar('product view - style number');
dtmTag.dtm_user_id = _satellite.getVar('customer id')||'';
dtmTag.dtmc_department = prod.category.gender.toLowerCase();
dtmTag.dtmc_category = prod.category.primaryCategory.toLowerCase();
dtmTag.dtmc_subcategory = prod.category.silhouette.toLowerCase();

dtmTag.dtm_user_token = "";
dtmTag.dtmc_ref = document.referrer;
dtmTag.dtmc_loc = document.location.href;
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
  if(typeof dtmTag[item] != "function" && typeof dtmTag[item] != "object"){
    if(dtmTag[item]){
      dtmSrc += "&" + item + "=" + escape(dtmTag[item]);
    }
  }
}
var div = document.createElement('div');
div.id = 'dtmdiv';
div.style.display = 'none';
div.innerHTML = '<iframe name="response_frame" src="'+dtmSrc+'"></iframe>';
document.body.appendChild(div);

setTimeout(function(){ document.getElementById("dtmdiv").innerHTML = "";},2000);
});
