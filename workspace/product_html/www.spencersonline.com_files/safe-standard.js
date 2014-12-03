var psjrkMsid = "czMlMcfEat2c";
// safe-standard@gecko.js

var psjrkMiso;
try {
	psjrkMiso = (opener != null) && (typeof(opener.name) != "unknown") && (opener.psjrkMwid != null);
} catch(e) {
	psjrkMiso = false;
}
if (psjrkMiso) {
	window.psjrkMwid = opener.psjrkMwid + 1;
	psjrkMsid = psjrkMsid + "_" + window.psjrkMwid;
} else {
	window.psjrkMwid = 1;
}
function psjrkMn() {
	return (new Date()).getTime();
}
var psjrkMs = psjrkMn();
function psjrkMst(f, t) {
	if ((psjrkMn() - psjrkMs) < 7200000) {
		return setTimeout(f, t * 1000);
	} else {
		return null;
	}
}
var psjrkMol = false;
function psjrkMow() {
	if (psjrkMol || (3 == 1)) {
		var pswo = "menubar=0,location=0,scrollbars=auto,resizable=1,status=0,width=600,height=600";
		var pswn = "pscw_" + psjrkMn();
		var url = "https://messenger.providesupport.com/messenger/0vll9j65gpw8j0uq8nf5bzt4op.html?ps_l=" + escape(document.location) + "";
		window.open(url, pswn, pswo);
	} else if (3 == 2) {
		document.location = "http://";
	}
}
var psjrkMil;
var psjrkMit;
function psjrkMpi() {
	var il;
	if (2 == 2) {
		il = window.pageXOffset + 250;
	} else if (2 == 3) {
		il = (window.innerWidth * 250 / 100) + window.pageXOffset;
	} else {
		il = 250;
	}
	il -= (325 / 2);
	var it;
	if (2 == 2) {
		it = window.pageYOffset + 150;
	} else if (2 == 3) {
		it = (window.innerHeight * 150 / 100) + window.pageYOffset;
	} else {
		it = 150;
	}
	it -= (208 / 2);
	if ((il != psjrkMil) || (it != psjrkMit)) {
		psjrkMil = il;
		psjrkMit = it;
		var d = document.getElementById('cijrkM');
		if (d != null) {
			d.style.left  = Math.round(psjrkMil) + "px";
			d.style.top  = Math.round(psjrkMit) + "px";
		}
	}
	setTimeout("psjrkMpi()", 100);
}
var psjrkMlc = 0;
function psjrkMsi(t) {
	window.onscroll = psjrkMpi;
	window.onresize = psjrkMpi;
	psjrkMpi();
	psjrkMlc = 0;
	var url = "http://messenger.providesupport.com/" + ((t == 2) ? "auto" : "chat") + "-invitation/0vll9j65gpw8j0uq8nf5bzt4op.html?ps_t=" + psjrkMn() + "";
	var d = document.getElementById('cijrkM');
	if (d != null) {
		d.innerHTML = '<iframe allowtransparency="true" style="background:transparent;width:325;height:208" src="' + url + 
			'" onload="psjrkMld()" frameborder="no" width="325" height="208" scrolling="no"></iframe>';
	}
}
function psjrkMld() {
	if (psjrkMlc == 1) {
		var d = document.getElementById('cijrkM');
		if (d != null) {
			d.innerHTML = "";
		}
	}
	psjrkMlc++;
}
if (false) {
	psjrkMsi(1);
}
var psjrkMd = document.getElementById('scjrkM');
if (psjrkMd != null) {
	if (psjrkMol || (3 == 1) || (3 == 2)) {
		var ctt = "";
		if (ctt != "") {
			tt = 'alt="' + ctt + '" title="' + ctt + '"';
		} else {
			tt = '';
		}
		if (false) {
			var p1 = '<table style="display:inline;border:0px;border-collapse:collapse;border-spacing:0;"><tr><td style="padding:0px;text-align:center;border:0px;vertical-align:middle"><a href="#" onclick="psjrkMow(); return false;"><img name="psjrkMimage" src="http://www.spencersonline.com/images/spencers/header/liveChatIconOff.png" width="130" height="17" style="border:0;display:block;margin:auto"';
			var p2 = '<td style="padding:0px;text-align:center;border:0px;vertical-align:middle"><a href="http://www.providesupport.com/pb/0vll9j65gpw8j0uq8nf5bzt4op" target="_blank"><img src="http://image.providesupport.com/';
			var p3 = 'style="border:0;display:block;margin:auto"></a></td></tr></table>';
			if ((130 >= 140) || (130 >= 17)) {
				psjrkMd.innerHTML = p1+tt+'></a></td></tr><tr>'+p2+'lcbpsh.gif" width="140" height="17"'+p3;
			} else {
				psjrkMd.innerHTML = p1+tt+'></a></td>'+p2+'lcbpsv.gif" width="17" height="140"'+p3;
			}
		} else {
			psjrkMd.innerHTML = '<a href="#" onclick="psjrkMow(); return false;"><img name="psjrkMimage" src="http://www.spencersonline.com/images/spencers/header/liveChatIconOff.png" width="130" height="17" border="0"'+tt+'></a>';
		}
	} else {
		psjrkMd.innerHTML = '';
	}
}
var psjrkMop = false;
function psjrkMco() {
	var w1 = psjrkMci.width - 1;
	psjrkMol = (w1 & 1) != 0;
	psjrkMsb(psjrkMol ? "http://www.spencersonline.com/images/spencers/header/liveChatIconOn.png" : "http://www.spencersonline.com/images/spencers/header/liveChatIconOff.png");
	psjrkMscf((w1 & 2) != 0);
	var h = psjrkMci.height;

	if (h == 1) {
		psjrkMop = false;

	// manual invitation
	} else if ((h == 2) && (!psjrkMop)) {
		psjrkMop = true;
		psjrkMsi(1);
		//alert("Chat invitation in standard code");
		
	// auto-invitation
	} else if ((h == 3) && (!psjrkMop)) {
		psjrkMop = true;
		psjrkMsi(2);
		//alert("Auto invitation in standard code");
	}
}
var psjrkMci = new Image();
psjrkMci.onload = psjrkMco;
var psjrkMpm = false;
var psjrkMcp = psjrkMpm ? 30 : 60;
var psjrkMct = null;
function psjrkMscf(p) {
	if (psjrkMpm != p) {
		psjrkMpm = p;
		psjrkMcp = psjrkMpm ? 30 : 60;
		if (psjrkMct != null) {
			clearTimeout(psjrkMct);
			psjrkMct = null;
		}
		psjrkMct = psjrkMst("psjrkMrc()", psjrkMcp);
	}
}
function psjrkMrc() {
	psjrkMct = psjrkMst("psjrkMrc()", psjrkMcp);
	try {
		psjrkMci.src = "http://image.providesupport.com/cmd/0vll9j65gpw8j0uq8nf5bzt4op?" + "ps_t=" + psjrkMn() + "&ps_l=" + escape(document.location) + "&ps_r=" + escape(document.referrer) + "&ps_s=" + psjrkMsid + "" + "";
	} catch(e) {
	}
}
psjrkMrc();
var psjrkMcb = "http://www.spencersonline.com/images/spencers/header/liveChatIconOff.png";
function psjrkMsb(b) {
	if (psjrkMcb != b) {
		var i = document.images['psjrkMimage'];
		if (i != null) {
			i.src = b;
		}
		psjrkMcb = b;
	}
}

