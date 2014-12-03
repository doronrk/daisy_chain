//resxclsa.js v3.5 Copyright 2004-2011 Certona Corporation www.certona.com
var certonaResx = function(){
	var ag = false, ax = null, a = "undefined", dg = location.protocol.toLowerCase() == "https:" ? "https://" : "http://", cl = "www.res-x.com", ck = "/ws/r2/Resonance.aspx", cu = "3.5a", f = "RES_TRACKINGID", l = "RES_SESSIONID", m = "ResonanceSegment", c = "", j = "", i = "", ao = "", y = "", p = false, s = false, aa = false, o = 0;
	function g(df){
		return parseInt(df, 10);
	}
	function b(dl){
		try {
			if (dl != null && dl != "null" && dl != "") {
				return true;
			}
		}
		catch (ex) {
		}
		return false;
	}
	function aq(){
		return resx.rrelem;
	}
	function ah(ch){
		try {
			var bg = null;
			if (b(ch)) {
				bg = new Array();
				if (b(document.getElementById(ch))) {
					bg[0] = ch;
				}
				else {
					var cc = ch.replace(/[,;\-:]/g, ".").split(".");
					for (var ac = 0; ac < cc.length; ac++) {
						if (b(document.getElementById(cc[ac]))) {
							bg[ac] = cc[ac];
						}
						else {
							bg[ac] = "";
						}
					}
				}
			}
			return bg;
		}
		catch (ex) {
			d("", ex);
		}
		return null;
	}
	function n(){
		try {
			if (typeof(resx.rrelem) != a) {
				var e = ah(aq());
				if (e != null) {
					var r = null;
					for (var ac = 0; ac < e.length; ac++) {
						r = document.getElementById(e[ac]);
						if (b(r)) {
							r.style.visibility = "visible";
						}
					}
				}
			}
		}
		catch (ex) {
		}
	}
	function d(de, ab){
		try {
			if (!ag) {
				ag = true;
				ax = escape(de + "|" + ((typeof(ab.number) != a) ? ab.number : a) + "|" + ((typeof(ab.name) != a) ? ab.name : a) + "|" + ((typeof(ab.description) != a) ? ab.description : a));
			}
		}
		catch (ex) {
		}
		finally {
			n();
		}
	}
	function k(ad){
		try {
			if (document.cookie.length > 0) {
				var x = document.cookie.indexOf(ad + "=");
				if (x != -1) {
					x += ad.length + 1;
					var bn = document.cookie.indexOf(";", x);
					if (bn == -1) {
						bn = document.cookie.length;
					}
					return unescape(document.cookie.substring(x, bn));
				}
			}
		}
		catch (ex) {
			d("", ex);
		}
		return null;
	}
	function q(ad, dq, as, dm, cw){
		try {
			var aw = new Date();
			if (as != null) {
				aw.setTime(aw.getTime() + (as * 3600 * 1000));
			}
			document.cookie = ad + "=" + escape(dq) + ((b(as)) ? "; expires=" + aw.toGMTString() : "") + ((b(dm)) ? "; path=" + dm : "; path=/") + ((b(cw)) ? "; domain=" + cw : "");
		}
		catch (ex) {
			d("", ex);
		}
	}
	function ca(ds, dp){
		try {
			if (typeof(dp) != a && dp != null) {
				for (var ac = 0; ac < dp.length; ac++) {
					if ((dp[ac] + "") == ds) {
						return true;
					}
				}
			}
		}
		catch (ex) {
		}
		return false;
	}
	function bz(){
		try {
			var w = typeof(resx.rrec) != a && (resx.rrec == true || resx.rrec == "true") && k(m) == "1" && !ag;
			if (w) {
				w = false;
				if (typeof(resx.rrelem) != a) {
					var e = ah(aq());
					if (e != null) {
						for (var ac = 0; ac < e.length; ac++) {
							if (b(e[ac])) {
								w = true;
								break;
							}
						}
					}
				}
				if (w) {
					w = false;
					if (typeof(resx.rrnum) != a) {
						var dr = resx.rrnum + "";
						dr = dr.replace(/,/g, ";");
						var cp = dr.split(";");
						for (var ac = 0; ac < cp.length; ac++) {
							if (!isNaN(cp[ac]) && g(cp[ac]) > 0) {
								w = true;
								break;
							}
						}
					}
				}
			}
			return w;
		}
		catch (ex) {
		}
		return false;
	}
	function dk(df){
		try {
			var di = "";
			df += "";
			for (var ac = df.length - 1; ac >= 0; ac--) {
				di += df.charAt(ac);
			}
			return di;
		}
		catch (ex) {
		}
		return "";
	}
	function t(){
		try {
			var dn = "";
			if (navigator.userAgent.toLowerCase().indexOf("mac") == -1) {
				dn = Math.floor(Math.random() * 1000000000000000);
				dn += "";
			}
			else {
				var bv = Math.floor(Math.random() * 1000000), dh = new Date(), cg = dh.getTime();
				cg += "";
				var co = dk(cg);
				bv += "";
				dn = bv + co.substring(0, 11);
			}
			return dn;
		}
		catch (ex) {
			d("guid", ex);
		}
		return "";
	}
	function bj(bi, br, az, dd, dc, dj){
		try {
			var bf = "", af = null, cy = "";
			if (typeof(bi) == "object") {
				af = document.getElementsByTagName("a");
			}
			else {
				var bu = document.getElementById(bi);
				if (b(bu)) {
					af = bu.getElementsByTagName("a");
					cy = bi;
				}
			}
			if (typeof(af) != a && af != null) {
				var ak = null, bq = null, bp = null, cn = 0, bm = "", an = "", cb = "", bl = "", cm = "", au = null;
				if (b(br)) {
					bp = -1;
					bq = new Array();
					for (var ac = 0; ac < br.length; ac++) {
						ak = document.getElementById(br[ac]);
						if (b(ak)) {
							au = ak.getElementsByTagName("a");
							for (var du = 0; du < au.length; du++) {
								bp++;
								bq[bp] = au[du] + "";
							}
						}
					}
				}
				for (var ac = 0; ac < af.length; ac++) {
					if (cn == dj) {
						break;
					}
					bm = af[ac] + "";
					if (b(bm)) {
						an = escape(bm);
						bl = "";
						if (b(az)) {
							an = an.match(az) + "";
						}
						if (b(an)) {
							bl = an.match(dd) + "";
						}
						if (b(bl + "")) {
							if (!ca(bm, bq)) {
								cm = an.match(dc) + "";
								cb = bl + escape("|") + cy + escape("|") + (b(cm) ? cm : "") + ";";
								if (bf.indexOf(cb) == -1) {
									bf += cb;
									cn++;
								}
							}
						}
					}
				}
			}
			return bf;
		}
		catch (ex) {
			d("gpl", ex);
		}
		return "";
	}
	function cv(z){
		try {
			s = true;
			if (!aa) {
				var r = null;
				for (var ac = 0; ac < z.Resonance.Response.length; ac++) {
					if (z.Resonance.Response[ac].display == "yes") {
						r = document.getElementById(z.Resonance.Response[ac].scheme);
						if (b(r)) {
							r.innerHTML = z.Resonance.Response[ac].output;
						}
					}
				}
			}
		}
		catch (ex) {
		}
		finally {
			n();
		}
	}
	function by(){
		try {
			if (typeof(resx.rrcall) != a && b(resx.rrcall)) {
				s = true;
			}
			if (!s) {
				if (o < 2000) {
					o = o + 50;
					window.setTimeout("certonaResx.checkCallback()", 50);
				}
				else {
					aa = true;
					n();
				}
			}
		}
		catch (ex) {
			n();
		}
	}
	function ct(){
		try {
			var cf = "", ap = "certonaResx.showResponse";
			if (typeof(resx.rrcall) != a && b(resx.rrcall)) {
				ap = resx.rrcall;
			}
			cf = "&no=" + resx.rrnum + ((typeof(resx.exitemid) != a && b(resx.exitemid)) ? "&ex=" + resx.exitemid : "") + ((typeof(resx.rrqs) != a) ? "&" + resx.rrqs : "") + "&cb=" + ap;
			return cf;
		}
		catch (ex) {
		}
		return "";
	}
	function bx(){
		try {
			var v = location.hostname;
			if (b(v)) {
				if (!v.match(/(\d{1,3}\.){3}\d{1,3}/)) {
					var ce = v.split(".");
					if (ce.length > 1) {
						v = "." + ce[ce.length - 2] + "." + ce[ce.length - 1];
						var dt = /\.(co|com)\.\w{2}$/;
						if (v.toLowerCase().match(dt) && ce.length > 2) {
							v = "." + ce[ce.length - 3] + v;
						}
					}
				}
				return v;
			}
		}
		catch (ex) {
			d("gcd", ex);
		}
		return null;
	}
	function ay(cs){
		try {
			var av = location.search, x = av.indexOf("?" + cs + "=");
			if (x == -1) {
				x = av.indexOf("&" + cs + "=");
			}
			if (x > -1) {
				x = x + cs.length + 2;
				var bn = av.indexOf("&", x);
				if (bn == -1) {
					return av.substring(x);
				}
				else {
					return av.substring(x, bn);
				}
			}
		}
		catch (ex) {
		}
		return null;
	}
	function bw(aj){
		try {
			if (k(m) == aj) {
				return "";
			}
			var bk = "", at = 0, ai = g(resx.top1), ae = g(resx.top2), am = g(resx.top3), ci = 100000;
			if (isNaN(ai)) {
				ai = 0;
			}
			if (isNaN(ae)) {
				ae = ai;
			}
			if (isNaN(am)) {
				am = ae;
			}
			if (aj == "1") {
				at = ai - 1;
			}
			if (aj == "2") {
				if ((ae - ai) > 0) {
					at = ae - 1;
				}
			}
			if (aj == "3") {
				if ((am - ae) > 0) {
					at = am - 1;
				}
			}
			if (aj == "4") {
				if ((ci - am) > 0) {
					at = ci - 1;
				}
			}
			if (at > 0) {
				at += "";
				while (at.length < 5) {
					at = "0" + at;
				}
				bk = t();
				if (b(bk)) {
					bk = bk.substr(0, 1) + at + bk.substr(1, 11);
				}
			}
			return bk;
		}
		catch (ex) {
		}
		return "";
	}
	function bh(){
		try {
			var bt = "", db = "";
			for (var ac = 0; ac < 51; ac++) {
				if (eval("typeof(resx.cv" + ac + ")") != a) {
					db = eval("resx.cv" + ac) + "";
					db = db.replace(/\+/g, "%2B");
					bt += "&cv" + ac + "=" + escape(db);
				}
			}
			return bt;
		}
		catch (ex) {
			d("gcv", ex);
		}
		return "";
	}
	function bo(){
		try {
			ag = false;
			ax = null;
			c = "";
			j = "";
			i = "";
			ao = "";
			y = "";
			p = false;
			s = false;
			aa = false;
			o = 0;
			var h = bx();
			if (location.search.indexOf("resxseg=") > 0) {
				c = bw(ay("resxseg"));
			}
			if (location.search.indexOf("resxtrack=") > 0) {
				c = ay("resxtrack");
			}
			if (b(c) && !isNaN(g(c))) {
				q(f, c, 87648, null, h);
				if (!b(k(f))) {
					q(f, c, null, null, h);
				}
				q(l, "", -1, null, h);
			}
			else {
				c = k(f);
				if (!b(c)) {
					c = t();
					q(f, c, 87648, null, h);
					if (!b(k(f))) {
						q(f, c, null, null, h);
					}
				}
			}
			j = k(l);
			if (!b(j)) {
				j = t();
			}
			q(l, j, .5, null, h);
			if (!b(k(l))) {
				q(l, j, null, null, h);
			}
			c = k(f);
			var u = g(c);
			if (!isNaN(u) && u > 0) {
				u += "";
				u = u.substring(1, 6);
				u = g(u);
				var ai = g(resx.top1), ae = g(resx.top2), am = g(resx.top3), ci = 100000;
				if (isNaN(ai)) {
					ai = 0;
				}
				if (isNaN(ae)) {
					ae = ai;
				}
				if (isNaN(am)) {
					am = ae;
				}
				if (u < ai) {
					i = "1";
				}
				else if (u < ae) {
					i = "2";
				}
				else if (u < am) {
					i = "3";
				}
				else if (u < ci) {
					i = "4";
				}
			}
			q(m, i, 1440, null, h);
			if (!b(k(m))) {
				q(m, i, null, null, h);
			}
			if (typeof(resx.pageid) != a && b(resx.pageid)) {
				ao = resx.pageid;
			}
			else {
				ao = t();
			}
			j = k(l);
			i = k(m);
			var be = ((typeof(resx.links) != a) ? resx.links + "" : "");
			if (b(be)) {
				var ar = be.replace(/\,/g, ";").replace(/\|/g, "%7C").split(";", 50);
				for (var ac = 0; ac < ar.length; ac++) {
					y += ar[ac] + ";";
				}
			}
			var bd = (typeof(resx.maxl) != a && !isNaN(resx.maxl) ? g(resx.maxl) : 20), bc = ((typeof(resx.lkmatch) != a) ? resx.lkmatch : ""), cd = ((typeof(resx.ltmatch) != a) ? resx.ltmatch : "");
			if (b(bc)) {
				var bb = ((typeof(resx.plkmatch) != a) ? resx.plkmatch : ""), e = null;
				if (typeof(resx.rrelem) != a) {
					e = ah(aq());
				}
				if (e != null) {
					for (var ac = 0; ac < e.length; ac++) {
						if (b(e[ac])) {
							y += bj(e[ac], null, bb, bc, cd, 50);
						}
					}
				}
				if (bd > 0) {
					y += bj(document, e, bb, bc, cd, bd);
				}
			}
			p = bz() && b(c) && b(j) && b(ao);
			if (!p) {
				n();
			}
		}
		catch (ex) {
			d("pv", ex);
		}
	}
	function cr(){
		try {
			if (i == "1" || i == "2" || i == "3") {
				if (p) {
					window.setTimeout("certonaResx.checkCallback();", 50);
				}
				var ba = "?appid=" + ((typeof(resx.appid) != a) ? resx.appid : "") + "&tk=" + (b(c) ? c : "") + "&ss=" + (b(j) ? j : "") + "&sg=" + (b(i) ? i : "") + "&pg=" + (b(ao) ? ao : "") + "&vr=" + cu + "&bx=" + p, cx = "";
				if (typeof(resx.rrelem) != a) {
					var da = ah(aq());
					if (da != null) {
						for (var ac = 0; ac < da.length; ac++) {
							cx += "&sc=" + da[ac];
						}
					}
				}
				ba += cx + ((typeof(resx.event) != a) ? "&ev=" + resx.event : "") + ((typeof(resx.itemid) != a) ? "&ei=" + resx.itemid : "") + ((typeof(resx.qty) != a) ? "&qt=" + resx.qty : "") + ((typeof(resx.price) != a) ? "&pr=" + resx.price : "") + ((typeof(resx.shipping) != a) ? "&sh=" + resx.shipping : "") + ((typeof(resx.total) != a) ? "&tt=" + resx.total : "") + ((typeof(resx.currencycode) != a) ? "&cc=" + resx.currencycode : "") + ((typeof(resx.customerid) != a) ? "&cu=" + resx.customerid : "") + ((typeof(resx.transactionid) != a) ? "&tr=" + resx.transactionid : "") + ((p) ? ct() : "") + bh() + "&ur=" + escape(location.href.substring(0, 400)) + "&plk=" + (b(y) ? y : "") + "&rf=" + escape(document.referrer) + ((ag) ? "&er=" + ag + "&em=" + ax : "");
				var cj = cl;
				if (typeof(resx.host) != a && b(resx.host)) {
					cj = resx.host;
				}
				var cz = dg + cj + ck + ba;
				return (cz.substring(0, 2083));
			}
		}
		catch (ex) {
			d("", ex);
		}
		return "";
	}
	function cq(src){
		try {
			if (src != "") {
				var al = document.createElement('script');
				al.type = 'text/javascript';
				al.async = true;
				al.src = src;
				var bs = document.getElementsByTagName('script')[0];
				bs.parentNode.insertBefore(al, bs);
			}
		}
		catch (ex) {
			d("", ex);
		}
	}
	return {
		checkCallback: function(){
			by();
		},
		showResponse: function(z){
			cv(z);
		},
		getUrl: function(){
			bo();
			return cr();
		},
		run: function(){
			bo();
			var src = cr();
			cq(src);
		}
	}
}();
certonaResx.run();
