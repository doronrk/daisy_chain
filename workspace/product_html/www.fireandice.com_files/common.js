/*
$Id: common.js,v 1.42.2.1 2009/01/26 13:09:53 avg Exp $
vim: set ts=2 sw=2 sts=2 et:
*/

/*
	Enviroment identificator
*/
var localIsDOM = document.getElementById?true:false;
var localIsJava = navigator.javaEnabled();
var localIsStrict = document.compatMode=='CSS1Compat';
var localPlatform = navigator.platform;
var localVersion = "0";
var localBrowser = "";
var localBFamily = "";
var isHttps = false;
if (window.opera && localIsDOM) {
	localBFamily = localBrowser = "Opera";
	if (navigator.userAgent.search(/^.*Opera.([\d.]+).*$/) != -1)
		localVersion = navigator.userAgent.replace(/^.*Opera.([\d.]+).*$/, "$1");
	else if (window.print)
		localVersion = "6";
	else
		localVersion = "5";

} else if (document.all && document.all.item)
	localBFamily = localBrowser = 'MSIE';

if (navigator.appName=="Netscape") {
	localBFamily = "NC";

  if (!localIsDOM) {
 		localBrowser = 'Netscape';
  	localVersion = navigator.userAgent.replace(/^.*Mozilla.([\d.]+).*$/, "$1");

 		if (localVersion != '')
 			localVersion = "4";

  }
  else if (navigator.userAgent.indexOf("Chrome") >= 0)
    localBrowser = 'Chrome';
  else if (navigator.userAgent.indexOf("Safari") >= 0)
  	localBrowser = 'Safari';
 	else if (navigator.userAgent.indexOf("Netscape") >= 0)
  	localBrowser = 'Netscape';
 	else if (navigator.userAgent.indexOf("Firefox") >= 0)
  	localBrowser = 'Firefox';
 	else 
  	localBrowser = 'Mozilla';
	
}

if (navigator.userAgent.indexOf("MSMSGS") >= 0)
	localBrowser = "WMessenger";
else if (navigator.userAgent.indexOf("e2dk") >= 0)
  localBrowser = "Edonkey";
else if (navigator.userAgent.indexOf("Gnutella") + navigator.userAgent.indexOf("Gnucleus") >= 0)
  localBrowser = "Gnutella";
else if (navigator.userAgent.indexOf("KazaaClient") >= 0)
  localBrowser = "Kazaa";

if (localVersion == '0' && localBrowser != '') {
  var rg = new RegExp("^.*" + localBrowser + ".([\\d.]+).*$");
  localVersion = navigator.userAgent.replace(rg, "$1");
}
var localIsCookie = ((localBrowser == 'Netscape' && localVersion == '4')?(document.cookie != ''):navigator.cookieEnabled);

var isHttps = document.location.protocol == "https:";

function change_antibot_image(id) {
	var image = document.getElementById(id);
	if (image) {
		var src = xcart_web_dir + "/antibot_image.php?tmp=" + Math.random() + "&section=" + id + "&regenerate=Y";
		setTimeout(
      function() {
        image.src = src;
      },
			200
		);
	}
}

/*
 get real inner width (jsel- JQuery selector)
*/
function getRealWidth(jsel) {
  var sw = $(jsel).attr('scrollWidth');
  var pl = parseInt($(jsel).css('padding-left'));
  if (!isNaN(pl))
    sw -= pl;
  var pr = parseInt($(jsel).css('padding-right'));
  if (!isNaN(pr))
    sw -= pr;
  return sw;
}

/*
  Show note next to element
*/
function showNote(id, next_to) {
  var div = $('#'+id).get();
  $('#'+id).remove();
  $('body').append(div);

  $('#'+id).show();
  var sw = getRealWidth('#'+id);

  $('#'+id).css('left', $(next_to).offset().left + $(next_to).width() + 'px');
  $('#'+id).css('top', $(next_to).offset().top + 'px');
  $('#'+id).css('width', sw + 'px');
  $('#'+id).show();
}

/*
	Find element by classname
*/
function getElementsByClassName(clsName) {
  var elem, cls;
	var arr = []; 
	var elems = document.getElementsByTagName("*");
	
	for (var i = 0; (elem = elems[i]); i++) {
		if (elem.className == clsName)
			arr[arr.length] = elem;
	}

	return arr;
}
/*
  Opener/Closer HTML block
*/
function visibleBox(id,skipOpenClose) {
	elm1 = document.getElementById("open" + id);
	elm2 = document.getElementById("close" + id);
	elm3 = document.getElementById("box" + id);

	if(!elm3)
		return false;

	if (skipOpenClose) {
		elm3.style.display = (elm3.style.display == "") ? "none" : "";

	} else if(elm1) {
		if (elm1.style.display == "") {
			elm1.style.display = "none";

			if (elm2)
				elm2.style.display = "";

			elm3.style.display = "none";
			var class_objs = getElementsByClassName('DialogBox');
			for (var i = 0; i < class_objs.length; i++) {
				class_objs[i].style.height = "1%";
			}

		} else {
			elm1.style.display = "";
			if (elm2)
				elm2.style.display = "none";

			elm3.style.display = "";
		}
	}

  return true;
}

function switchVisibleBox(id) {
	var box = document.getElementById(id);
	var plus = document.getElementById(id + '_plus');
	var minus = document.getElementById(id + '_minus');
	if (!box || !plus || !minus)
		return false;

	if (box.style.display == 'none') {
		box.style.display = '';
		plus.style.display = 'none';
		minus.style.display = '';

	} else {
        box.style.display = 'none';
        minus.style.display = 'none';
		plus.style.display = '';
	}

	return true;
}

/*
	URL encode
*/
function urlEncode(url) {
	return url.replace(/\s/g, "+").replace(/&/, "&amp;").replace(/"/, "&quot;")
}

/*
	Math.round() wrapper
*/
function round(n, p) {
	if (isNaN(n))
		n = parseFloat(n);

	if (!p || isNaN(p))
		return Math.round(n);

	p = Math.pow(10, p);
	return Math.round(n*p)/p;
}

/*
	Price format
*/
function price_format(price, thousand_delim, decimal_delim, precision, currency) {
	thousand_delim = (arguments.length > 1 && thousand_delim !== false) ? thousand_delim : number_format_th;
	decimal_delim = (arguments.length > 2 && decimal_delim !== false) ? decimal_delim : number_format_dec;
	precision = (arguments.length > 3 && precision !== false) ? precision : number_format_point;
  currency = (arguments.length > 4 && currency !== false) ? currency_format : "x";

	if (precision > 0) {
		precision = Math.pow(10, precision);
		price = Math.round(price*precision)/precision;
		var top = Math.floor(price);
		var bottom = Math.round((price-top)*precision)+precision;

	} else {
		var top = Math.round(price);
		var bottom = 0;
	}

	top = top+"";
	bottom = bottom+"";
	var cnt = 0;
	for (var x = top.length; x >= 0; x--) {
		if (cnt % 3 == 0 && cnt > 0 && x > 0)
			top = top.substr(0, x)+thousand_delim+top.substr(x, top.length);

		cnt++;
	}

  sum = (bottom > 0) ? (top+decimal_delim+bottom.substr(1, bottom.length)) : top;

	return currency.replace("x", sum);
}

/*
	Substitute
*/
function substitute(lbl) {
	var rg;
	for (var x = 1; x < arguments.length; x+=2) {
		if (arguments[x] && arguments[x+1]) {
			lbl = lbl
				.replace(new RegExp("\\{\\{" + arguments[x] + "\\}\\}", "gi"),  arguments[x+1])
				.replace(new RegExp('~~' + arguments[x] + '~~', "gi"),  arguments[x+1]);
		}
	}
	return lbl;
}

function getWindowOutWidth(w) {
	if (!w)
		w = window;

	return localBFamily == "MSIE" ? w.document.body.clientWidth : w.outerWidth;
}

function getWindowOutHeight(w) {
	if (!w)
		w = window;

	return localBFamily == "MSIE" ? w.document.body.clientHeight : w.outerHeight;
}

function getWindowWidth(w) {
	if (!w)
		w = window;

  return localBFamily == "MSIE" ? w.document.body.clientWidth : w.innerWidth;
}

function getWindowHeight(w) {
	if (!w)
		w = window;

  return localBFamily == "MSIE" ? w.document.body.clientHeight : w.innerHeight;
}

function getDocumentHeight(w){
	if (!w)
		 w = window;

  return Math.max(w.document.documentElement.scrollHeight, w.document.body.scrollHeight);
}

function getDocumentWidth(w) {
	if (!w)
		w = window;

  return Math.max(w.document.documentElement.scrollWidth, w.document.body.scrollWidth);
}

function expandWindowX(w, step, limit) {
	if (!w)
		w = window;

	if (!step)
		step = 10;

	var go = true;
	var i = 200;
	while (go && i--) {
		if (limit && getWindowOutWidth() + step > limit)
			break;

		try {
			w.scrollTo(step, 0);
			go = (w.document.documentElement && w.document.documentElement.scrollLeft > 0) || (w.document.body && w.document.body.scrollLeft > 0);
			if (go)
				w.resizeBy(step, 0);

		} catch (e) {
			return false;
		}
	}

	return true;
}

function expandWindowY(w, step, limit) {
	if (!w)
		w = window;

	if (!step)
		step = 10;

	var go = true;
	var i = 200;
	while (go && i--) {
		if (limit && getWindowOutHeight() + step > limit)
			 break;

		try {
			w.scrollTo(0, step);
			go = (w.document.documentElement && w.document.documentElement.scrollTop > 0) || (w.document.body && w.document.body.scrollTop > 0);
			if (go)
				w.resizeBy(0, step);

		} catch(e) {
			return false;
		}
	}

	return true;
}

/*
	Check list of checkboxes
*/
function checkMarks(form, reg, lbl) {
	var is_exist = false;

	if (!form || form.elements.length == 0)
		return true;

	for (var x = 0; x < form.elements.length; x++) {
		if (form.elements[x].name.search(reg) == 0 && form.elements[x].type == 'checkbox' && !form.elements[x].disabled) {
			is_exist = true;

			if (form.elements[x].checked)
				return true;
		}
	}

	if (!is_exist)
		return true;

	if (lbl) {
		alert(lbl);

	} else if (lbl_no_items_have_been_selected) {
		alert(lbl_no_items_have_been_selected);

	}

	return false;
}

/*
	Submit form with specified value of 'mode' parmaeters
*/
function submitForm(formObj, formMode, e) {
  if (!e && typeof(window.event) != 'undefined')
    e = event;

  if (e) {
    if (e.stopPropagation)
      e.stopPropagation();
    else
      e.cancelBubble = true;
  }

	if (!formObj)
		return false;

	if (formObj.tagName != "FORM") {
		if (!formObj.form)
			return false;

		formObj = formObj.form;
	}

  if (typeof(window.$) != 'undefined') {
    var r = $(formObj).triggerHandler('submit');
    if (r === false)
      return false;
  }

	if (formObj.mode)
		formObj.mode.value = formMode;

	return formObj.submit();
}

/*
	Convert number from current format
	(according to 'Input and display format for floating comma numbers' option)
	to float number
*/
function convert_number(num) {
	var regDec = new RegExp(reg_quote(number_format_dec), "gi");
	var regTh = new RegExp(reg_quote(number_format_th), "gi");
	var pow = Math.pow(10, parseInt(number_format_point));

	num = parseFloat(num.replace(" ", "").replace(regTh, "").replace(regDec, "."));
	return Math.round(num * pow) / pow;
}

/*
	Check string as number
	(according to 'Input and display format for floating comma numbers' option)
*/
function check_is_number(num) {
	var regDec = new RegExp(reg_quote(number_format_dec), "gi");
	var regTh = new RegExp(reg_quote(number_format_th), "gi");

	num = num.replace(" ", "").replace(regTh, "").replace(regDec, ".");
	return (num.search(/^[+-]?[0-9]+(\.[0-9]+)?$/) != -1);
}

/*
	Qutation for RegExp class
*/
function reg_quote(s) {
	return s.replace(/\./g, "\\.").replace(/\//g, "\\/").replace(/\*/g, "\\*").replace(/\+/g, "\\+").replace(/\[/g, "\\[").replace(/\]/g, "\\]");
}

function setCookie(name, value, path, expires) {
	if (typeof(expires) == 'object') {
		try {
			var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			if (days[expires.getDay()] && months[expires.getMonth()])
				expires = days[expires.getDay()]+" "+expires.getDate()+"-"+months[expires.getMonth()]+"-"+expires.getFullYear()+" "+expires.getHours()+":"+expires.getMinutes()+":"+expires.getSeconds()+" GMT";
		} catch(e) { }
	}

	if (typeof(expires) != 'string')
		expires = false;

	document.cookie = name+"="+escape(value)+(expires ? "; expires=" + expires : "")+(path ? "; path="+path : "");
}

function deleteCookie(name) {
	document.cookie = name+"=0; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
}

/*
	Clone object
*/
function cloneObject(orig) {
	var r = {};
	for (var i in orig) {
		r[i] = orig[i];
	}

	return r;
}

/*
	Get first checkbox and redirect to URL
*/
function getFirstCB(form, reg) {

	while (form.tagName && form.tagName.toUpperCase() != 'FORM')
		form = form.parentNode;

	if (!form.tagName || form.tagName.toUpperCase() != 'FORM' || form.elements.length == 0)
    return false;

	var selectedChk = false;
    for (var x = 0; x < form.elements.length && !selectedChk; x++) {
      if (form.elements[x].name.search(reg) == 0 && form.elements[x].type == 'checkbox' && !form.elements[x].disabled && form.elements[x].checked)
        selectedChk = form.elements[x];
    }
    
    if (!selectedChk) {
      if (lbl_no_items_have_been_selected)
			  alert(lbl_no_items_have_been_selected);

      return false;
	}

  return selectedChk;
}

/*
	getElementById() wrapper
*/
function _getById(id) {
	if (typeof(id) != 'string' || !id)
		return false;

	var obj = document.getElementById(id);
	if (obj && obj.id != id) {
		obj = false;
		for (var i = 0; i < document.all.length && obj === false; i++) {
			if (document.all[i].id == id)
				obj = document.all[i];
		}
	}

	return obj;
}

// undefined or not
function isset(obj) {
	return typeof(obj) != 'undefined' && obj !== null;
}


// Check - variable is function or not
function isFunction(f) {
	return (typeof(f) == 'function' || (typeof(f) == 'object' && (f+"").search(/\s*function /) === 0));
}

// Get text length without \r
function getPureLength(text) {
    return (text && text.replace) ? text.replace(new RegExp("\r", "g"), '').length : -1;
}

// Ge text area selection limits
function getTASelection(t) {
	if (document.selection) {
		t.focus();
		var sel1 = document.selection.createRange();
		var sel2 = sel1.duplicate();
		sel2.moveToElementText(t);
		var selText = sel1.text;
		var c = String.fromCharCode(1);
		sel1.text = c;
		var index = sel2.text.indexOf(c);
		t.selectionStart = getPureLength((index == -1) ? sel2.text : sel2.text.substring(0, index));
		t.selectionEnd = getPureLength(selText) + t.selectionStart;
		sel1.moveStart('character', -1);
		sel1.text = selText;
    }

	return [t.selectionStart, t.selectionEnd];
}

// Insert string to text area to current position
function insert2TA(t, str) {
	var pos = getTASelection(t);
	var p;
    if (!isNaN(pos[0])) {
        t.value = t.value.substr(0, pos[0]) + str + t.value.substr(pos[0]);
		p = pos[0];

    } else {
		p = getPureLength(t.value);
		t.value += str;
	}

	setTACursorPos(t, p);

	return p;
}

// Set cursor pointer to specified postion for text area 
function setTACursorPos(t, begin, end) {
	if (!t || !t.tagName || t.tagName.toUpperCase() != 'TEXTAREA')
		return false;

	if (isNaN(begin)) {
		begin = 0;

	} else if (getPureLength(t.value) < begin) {
		begin = getPureLength(t.value);
		end = begin;
	}

	if (isNaN(end))
		end = begin;

	if (document.selection) {
		var sel = t.createTextRange();
		sel.collapse(true);
		sel.moveStart('character', begin);
		sel.moveEnd('character', end - begin);
		sel.select();

	} else if (!isNaN(t.selectionStart)) {
		t.selectionStart = begin;
		t.selectionEnd = end;
	}

	if (t.focus)
	    t.focus();

	return true;
}

// View help layer

function viewHelp(id, a, ttl, boxWidth) {
	var box = document.getElementById(id);
	if (!box || !a)
		return false;

	if (!a.helpBox) {

		// initialization
		a.helpBox = box;
		box.helpLink = a;
		box.onmouseout = viewHelpOut;
    a.onmouseout = viewHelpOut;
		box.onmouseover = viewHelpOver;
		box.helpBoxVisible = false;
		box.helpBoxHideTO = false;
		box.helpBoxHideTTL = ttl ? ttl : 1000;

    if (boxWidth)
      box.style.width = boxWidth + 'px';

  }

  box.style.top = (posGetTop(a) + posGetHeight(a) + 2) + 'px';

  var w = $(box).width();
  var l = posGetLeft(a);
  if (l + w > $(window).width())
    l = l - w + $(a).width();

  box.style.left = l + 'px';

	viewHelpOver.call(box);
	viewHelpVisible(box, true);

  var sw = getRealWidth(box);

  if (sw > $(box).width()) {
    var sw = Math.min(sw, $(window).width() - 40);
    $(box).width(sw);
    var al = $(a).offset().left;
    var aw = $(a).width();
    var bl = $(box).offset().left;
    if (bl + sw > $(window).width()) {
      box.style.left = (l - sw + aw) + 'px';
      bl = $(box).offset().left;
    }

    if (bl < 0) {
      box.style.left = (10) + 'px'
      bl = $(box).offset().left;
    }
  }

	if (a.blur)
		a.blur();

	return true;
}

function viewHelpGetObjects(obj) {
	if (!obj.tagName || (obj.tagName.toUpperCase() !== 'DIV' && obj.tagName.toUpperCase() !== 'A'))
		return false;

	if (obj.helpBox) {
		var a = obj;
		var box = obj.helpBox;

	} else {
		var a = obj.helpLink;
		var box = obj;
	}

	if (!a || !box || !a.helpBox || !box.helpLink)
		return false;

	return {a: a, box: box};
}

function viewHelpVisible(box, visible) {
	box.style.display = visible ? 'block' : 'none';
	box.helpBoxVisible = visible;

	return true;
}

function viewHelpStartHide(box) {
	box.helpBoxHideTO = setTimeout(
		new Function('', 'var box = document.getElementById("' + box.id.replace('/"/', '\\"') + '"); if (box) viewHelpVisible(box, false);'),
		box.helpBoxHideTTL
	);

	return true;
}

function viewHelpOut() {
	var obj = viewHelpGetObjects(this);
    if (!obj)
        return false;

	return obj.box.helpBoxVisible && viewHelpStartHide(obj.box);
}

function viewHelpOver() {
	var obj = viewHelpGetObjects(this);
    if (!obj)
        return false;

	if (obj.box.helpBoxVisible && obj.box.helpBoxHideTO)
		clearTimeout(obj.box.helpBoxHideTO);

	return true;
}

/*
	Position functions
*/
function posGetPageOffset(o){
	var l = 0;
	var t = 0;
	do {
		l += o.offsetLeft;
		t += o.offsetTop;
	} while ((o = o.offsetParent));
	return {left: l, top: t};
}

function posGetLeft(o) {
	return posGetPageOffset(o).left;
}

function posGetTop(o) {
	return posGetPageOffset(o).top;
}

function posGetWidth (o) {
	return o.offsetWidth;
}

function posGetHeight (o) {
    return o.offsetHeight;
}

/*
	Button function
*/
function buttonOver(obj) {
	var spans = obj.getElementsByTagName('SPAN');
	if (spans.length > 0)
		spans[0].className = 'underline';
}

function buttonOut(obj) {
	var spans = obj.getElementsByTagName('SPAN');
	if (spans.length > 0)
		spans[0].className = 'normal';
}

function getMethod(method, obj) {
  var args = [];
  for (var i = 2; i < arguments.length; i++)
    args[args.length] = arguments[i];

  if (!obj)
    obj = window;

  return function() {
    if (!isFunction(method))
      method = obj[method];

    return method.apply ? method.apply(obj, args) : method();
  }
}

function lockForm(form) {
	if (form.locked)
		return false;

	form.locked = true;

	setTimeout(
    function() {
      form.locked = false;
    },
    1000
  );

	return true;
}

function getPopupControl(elm) {
	var e = elm;
	while (e && e.tagName && !e._popupControl)
		e = e.parentNode;

	return (e && e._popupControl) ? e._popupControl : false;
}

function parse_url(url) {
  if (!url || url.constructor != String)
    return false;

  var m = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
  if (!m)
    return false;

  var res = {
    scheme: m[2],
    host: m[4],
    path: m[5],
    query: m[7],
    fragment: m[9]
  };

  if (res.host) {
    m = res.host.match(/^(?:([^:]+):)?([^@]+)@(.+)$/);
    if (m) {
      res.host = m[3];
      res.user = m[1] ? m[1] : m[2];
      res.password = m[1] ? m[2] : false;
    }
  }

  return res;
}

function pngFix(elm) {
  if (!elm || !elm.tagName || !$.browser.msie || elm.tagName.toUpperCase() != 'IMG')
    return false;

  var src = elm.src.replace(/\(/g, '%28').replace(/\)/g, '%29');
  elm.src = images_dir + '/spacer.gif';
  elm.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + src + '",sizingMethod="scale")';

  return true;
}

function getImgSrc(elm) {
  if (!elm || !elm.tagName || elm.tagName.toUpperCase() != 'IMG' || !elm.src)
    return false;

  if ($.browser.msie && elm.src.search(/\/spacer\.gif$/) != -1 && elm.filters['DXImageTransform.Microsoft.AlphaImageLoader'])
    return elm.filters['DXImageTransform.Microsoft.AlphaImageLoader'].src;

  return elm.src;
}

function isPngFix(elm) {
  return $.browser.msie && elm && elm.tagName && elm.tagName.toUpperCase() == 'IMG' && elm.src && elm.src.search(/\/spacer\.gif$/) != -1 && elm.filters['DXImageTransform.Microsoft.AlphaImageLoader'];
}

/*
  Debug window (require jQuery)
  Usage:
    debug().html('example');
    debug().html('example', 10);
    debug().add('second string')
    debug().clean();
    debug().hide();
    debug().show();
    debug().row(0).html('example');
    debug().row(0).add('second part');
    debug().row(0).remove();
    debug().opacity(0.1);
*/
var debug = function() {
	var debug_panel = false;

	return function () {
		if (typeof(window.$) == 'undefined')
			return false;

		if (!debug_panel) {
			debug_panel = $(document.createElement('DIV')).
				css({
          position: 'absolute',
					border: '1px solid black',
					backgroundColor: 'white',
          display: 'none',
          top: '0px',
          left: '0px',
          width: '200px',
          height: '200px',
          overflow: 'auto',
          padding: '5px',
          margin: '0px'
        })
        .get(0);

			document.body.appendChild(debug_panel);

      debug_panel.defaultOpacity = 0.9;
      debug_panel.ttl = 0;
      debug_panel._extend_create = false;
      debug_panel._ttlTO = false;
      debug_panel._rowsLength = 0;

      /* Replace window content */
      debug_panel.html = function(str, ttl) {
        this._getBox().innerHTML = str;
        this.show();
        this.startTTL(arguments.length > 1 ? ttl : this.ttl);
      }

      /* Add new string */
      debug_panel.add = function(str, ttl) {
        this._getBox().innerHTML += str + "<br />\n";
        this.show();
        this.startTTL(arguments.length > 1 ? ttl : this.ttl);
      }

      /* Get row (old or new) */
      debug_panel.row = function(i) {
        var row = $('div:eq(' + i + ')', this._getBox()).get(0);
        if (!row) {
          for (var x = this._rowsLength; x < i + 1; x++) {
            row = this._getBox().appendChild(document.createElement('DIV'));
            row.remove = this._removeRow;
            row.html = this._htmlRow;
            row.add = this._addRow;
            row.box = this;
          }

          this._rowsLength = i + 1;
        }

        return row;
      }

      /* Remove row */
      debug_panel._removeRow = function() {
        if (this.parentNode) {
          this.box._rowsLength--;
          this.parentNode.removeChild(this);
        }
      }

      /* Replace row content */
      debug_panel._htmlRow = function(str, ttl) {
        this.innerHTML = str;
        this.box.show();
        this.box.startTTL(arguments.length > 1 ? ttl : this.parentNode.ttl);
      }

      /* Add content ot row */
      debug_panel._addRow = function(str, ttl) {
        this.innerHTML += str;
        this.box.show();
        this.box.startTTL(arguments.length > 1 ? ttl : this.parentNode.ttl);
      }

      /* Clean window content */
      debug_panel.clean = function() {
        this._rowsLength = 0;
        this._getBox().innerHTML = '';
      }

      /* Hide window */
      debug_panel.hide = function() {
        this.style.display = 'none';
      }

      /* Show window */
      debug_panel.show = function() {
        this.style.display = '';
      }

      /* Set window opacity */
      debug_panel.opacity = function(level) {
        level = parseFloat(level);
        if (isNaN(level) || level < 0 || level > 1)
          return false;

        level = Math.round(level * 100) / 100;
        if ($.browser.msie) {
          this.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity = ' + (level * 100) + ')';
        } else {
          this.style.opacity = level;
        }

        return true;
      }

      /* Start window auto-hide timer */
      debug_panel.startTTL = function(ttl) {
        if (this._ttlTO)
          clearTimeout(this._ttlTO);

        if (ttl <= 0) 
          return false;

        var o = this;
        this._ttlTO = setTimeout(function() { o.hide(); }, ttl * 1000);

        return true;
      }

      /* Extend debug panel */
      debug_panel.extend = function() {
        if (this._extend_create)
          return true;

        var scripts = document.getElementsByTagName('SCRIPT');
        var m;
        var path = false;
        for (var i = 0; i < scripts.length && !path; i++) {
          if (scripts[i].src && (m = scripts[i].src.match(/^(.+\/)common.js/)))
            path = m[1];
        }

        if (!path)
          return false;

        var s = document.createElement('SCRIPT');
        s.src = path + 'debug.js';
        document.body.appendChild(s);

        this._extend_create = true;

        return true;
      }

      /* Check - debug extended or not */
      debug_panel.is_extended = function() {
        return this._extend_create && typeof(window._debug_is_extended) != 'undefined' && _debug_is_extended;
      }

      debug_panel._getBox = function() {
        return this;
      }

      if (debug_panel.defaultOpacity > 0 && debug_panel.defaultOpacity <= 1) {
        debug_panel.opacity(debug_panel.defaultOpacity);
      }

		}

    /* Extend debug panel methods */
    if (typeof(window.debug_panel_ext_methods) != 'undefined' && debug_panel_ext_methods) {
      for (var i = 0; i < debug_panel_ext_methods.length; i++) {
        debug_panel[debug_panel_ext_methods[i]] = debug_panel_ext[debug_panel_ext_methods[i]];
      }

      if (typeof(debug_panel_ext.init) != 'undefined')
        debug_panel_ext.init.call(debug_panel);

      debug_panel_ext_methods = false;
      debug_panel_ext = false;
    }
 
    return debug_panel;
	}
}();
