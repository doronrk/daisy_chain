_satellite.pushBlockingScript(function(event, target, $variables){
  //Start of DoubleClick Floodlight(PGR) Tag: Please do not remove 

var pageName_URL = location.pathname.toUpperCase();	
pageName_URL = pageName_URL.substring(pageName_URL.lastIndexOf('/') + 1);
   
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0].toUpperCase()] = nv[1] || true;
    }
}

var SPC = _satellite.getVar('SecureProtocolCheck');
var axel = Math.random() + "";
var a = axel * 10000000000000;
var type = "type=jjill563;";
var cat = "";
var qty = "";

var id = "ord="+ (_satellite.getVar('Order_ID') || a.toFixed(0));

var cost = "";
if(_satellite.getVar('Order_Total')){ 
	var amt = _satellite.getVar('Order_Total');
	if (amt === Math.floor(amt)) {
		amt += ".00";
	}
	cost = "cost=" + amt + ";";
}


switch (pageName_URL) {
	case "SHOPCONFIRMRECAP.ASPX":    
		cat = "cat=order795;";
		type = "type=jjill903;";
		qty = "qty=1;";
		break;
	case "SHOPBILLTO.ASPX":
		cat = "cat=start557;";
		break;
	case "INDEX.ASPX":
	case "": 
		cat = "cat=jjill117;";
		break;
	case "FCALLOUT.ASPX":  
		if(params.PFID === "1971") {  
			cat = "cat=offer998;";
		} else if(params.PFID === "1952") { 
			cat = "cat=offer526;";
		}
		break;
	case "MTREGISTRATION.ASPX":  
		cat = "cat=jjill764;";
		break;	
	case "MTLANDING.ASPX":
		cat = "cat=regis179;";
		break;
	case "MTLOGIN.ASPX":
		cat = "cat=jjill226;";
		break;
	case "SEEWHATSNEW_DEFAULT.ASPX":
		cat = "cat=seewh991;";
		break;
	case "MISSES_DEFAULT.ASPX":
		cat = "cat=misse644;";
		break;
	case "PETITES_DEFAULT.ASPX":
		cat = "cat=petit524;";
		break;
	case "WOMAN_DEFAULT.ASPX":
		cat = "cat=women629;";
		break;
	case "TALL_DEFAULT.ASPX":
		cat = "cat=tallo598;";
		break;
	case "SHOESACC_DEFAULT.ASPX":
		cat = "cat=shoes087;";
		break;
	case "ONSALE_DEFAULT.ASPX":
		cat = "cat=saleo770;";
		break;
	case "OUTLET_DEFAULT.ASPX":
		cat = "cat=Jjill0;";
		break;
	case "ESP.ASPX":
		cat = "cat=e-mai430;";
		break;
	case "FILTER.ASPX":
    if(params.PFID === "533") {  
			cat = "cat=jjill419;";
		}
		break;
}

if(cat !== "") {
	cmtStart = document.createComment('START Satellite : DoubleClick Floodlight(PGR) Tag');
	cmtEnd = document.createComment('END Satellite : DoubleClick Floodlight(PGR) Tag');

	var container = document.getElementById('dvTags_Bottom');
	if(container === null || container === undefined) return;

	ifrm = document.createElement('iframe');
  
  
	var link = SPC + "3868066.fls.doubleclick.net/activityi;src=3868066;";
	link += type;
	link += cat;
	link += qty;
	link += cost;
	link += id + "?";
  
	//alert(link)
  
	ifrm.setAttribute('src',link);
	ifrm.setAttribute('width','1');
	ifrm.setAttribute('height','1');
	ifrm.setAttribute('frameborder','0');
	ifrm.setAttribute('style','display:none');

	// write to page
	container.appendChild(cmtStart);
	container.appendChild(ifrm);
	container.appendChild(cmtEnd);
}

//End of DoubleClick Floodlight(PGR) Tag: Please do not remove
});
