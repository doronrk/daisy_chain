/* $Id$ */

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-iepp-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function F(){e.input=function(a){for(var b=0,c=a.length;b<c;b++)s[a[b]]=a[b]in l;return s}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)l.setAttribute("type",f=a[d]),e=l.type!=="text",e&&(l.value=m,l.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&l.style.WebkitAppearance!==c?(g.appendChild(l),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(l,null).WebkitAppearance!=="textfield"&&l.offsetHeight!==0,g.removeChild(l)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=l.checkValidity&&l.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(l),g.offsetWidth,e=l.value!=m,g.removeChild(l)):e=l.value!=m)),r[a[d]]=!!e;return r}("search tel url email datetime date month week time datetime-local number range color".split(" "))}function E(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return D(d,b)}function D(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function C(a,b){return!!~(""+a).indexOf(b)}function B(a,b){return typeof a===b}function A(a,b){return z(o.join(a+";")+(b||""))}function z(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={},r={},s={},t=[],u=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},v=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=B(e[d],"function"),B(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),w,x={}.hasOwnProperty,y;!B(x,c)&&!B(x.call,c)?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],c)},q.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},q.canvastext=function(){return!!e.canvas&&!!B(b.createElement("canvas").getContext("2d").fillText,"function")},q.postmessage=function(){return!!a.postMessage},q.websqldatabase=function(){var b=!!a.openDatabase;return b},q.indexedDB=function(){for(var b=-1,c=p.length;++b<c;)if(a[p[b].toLowerCase()+"IndexedDB"])return!0;return!!a.indexedDB},q.hashchange=function(){return v("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},q.history=function(){return!!a.history&&!!history.pushState},q.draganddrop=function(){return v("dragstart")&&v("drop")},q.websockets=function(){for(var b=-1,c=p.length;++b<c;)if(a[p[b]+"WebSocket"])return!0;return"WebSocket"in a},q.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType){c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"');var d='video/mp4; codecs="avc1.42E01E';c.h264=a.canPlayType(d+'"')||a.canPlayType(d+', mp4a.40.2"'),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"')}}catch(e){}return c},q.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"'),c.mp3=a.canPlayType("audio/mpeg;"),c.wav=a.canPlayType('audio/wav; codecs="1"'),c.m4a=a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")}catch(d){}return c},q.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},q.sessionstorage=function(){try{return!!sessionStorage.getItem}catch(a){return!1}},q.webworkers=function(){return!!a.Worker},q.applicationcache=function(){return!!a.applicationCache};for(var G in q)y(q,G)&&(w=G.toLowerCase(),e[w]=q[G](),t.push((e[w]?"":"no-")+w));e.input||F(),z(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._prefixes=o,e._domPrefixes=p,e.hasEvent=v,e.testProp=function(a){return D([a])},e.testAllProps=E,e.testStyles=u,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+t.join(" "):"");return e}(this,this.document),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/* $Id$ */

// old deprecated code
function init() { }
(function($){
/* rei namespace
 * setup, jmontgo Dec 2010
*/
if(window.rei) return;

var rei;
window.rei = rei = {
	error:[],
	analytics:[],
	re: { // RegExp cache
		cleanUrlChars: /[;'<>=()]/gm
	},
	perf: {start: window.perf_start || (new Date()).getTime(), ready: 0, load: 0},

	util: {
		randomID: function(size) {
			var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
			var str = '', i=0;
			while(i++<size){
				// get random character in range
				str += chars.substr( Math.floor(Math.random() * 62), 1 );
			}
			return str;
		},
		autocomplete: function(_src){
		// jmontgo 2011 Feb, jquery-ui autocomplete
			var leftSpace = /^\s+/, rightSpace = /\s+$/, manySpaces = /\s\s+/g;
			var autocompleteObj;
			var selectedindex;
			var selectedterm;
			$("#headerQuery").autocomplete({
				appendTo: $("#autocomplete"),
				select: function(event, ui) {
                    // create a data on the for so we can check if it was autocomplete
                    $.data(document.body,'autocomplete',true);
                    $("#headerQuery").val(ui.item.label);
                    if (autocompleteObj.length > 0)
                    {
                        for(i = 0; i < autocompleteObj.length; i++)
                        {
                            if (autocompleteObj[i] === ui.item.label)
                            {
                                selectedindex = (i + 1).toString();
                                selectedterm = ui.item.label;
                            }
                        }
                    }
                    $.data(document.body,'selectedindex',selectedindex);
                    $.data(document.body,'selectedterm',selectedterm);
                    $("#psearch").submit();
                },
				source: function source( query, result ) {
					var termStartingWithQuery = [];
					var termContainsQuery = [];
					var queryPositionInTerm = null;
					var sourceLength = _src.length;
					var queryCleaned = query.term.toLowerCase().replace( leftSpace, '' ).replace( rightSpace, '' ).replace( manySpaces, ' ' );

					for ( var i = 0; i < sourceLength; i++ ) {
						var item = _src[ i ];
						queryPositionInTerm = item.indexOf( queryCleaned );

						if ( queryPositionInTerm === 0 ) {
							// match starts with query (result desired)
							termStartingWithQuery.push( item );
						} else if ( queryPositionInTerm > 0 ) {
							// match contains query (alternate match)
							termContainsQuery.push( item );
						}
					}

					// 10 is the maxlength
					// if statement added for A/B test - else instructions are default for this function
					if ( typeof testsuggesttotal !== "undefined" ) {
						autocompleteObj = termStartingWithQuery.concat( termContainsQuery ).slice( 0, testsuggesttotal );
						result( termStartingWithQuery.concat( termContainsQuery ).slice( 0, testsuggesttotal ) );
					}
					else
					{
						autocompleteObj = termStartingWithQuery.concat( termContainsQuery ).slice( 0, 10 );
						result( termStartingWithQuery.concat( termContainsQuery ).slice( 0, 10 ) );
					}
				}
			});
			$("#bottomSearchText").autocomplete({
				appendTo: $("#autocomplete"),
				select: function(event, ui) {
			        $("#bottomSearchText").val(ui.item.label);
			        $("#psearch2").submit(); },
				source: function source( query, result ) {
					var termStartingWithQuery = [];
					var termContainsQuery = [];
					var queryPositionInTerm = null;
					var sourceLength = _src.length;
					var queryCleaned = query.term.toLowerCase().replace( leftSpace, '' ).replace( rightSpace, '' ).replace( manySpaces, ' ' );

					for ( var i = 0; i < sourceLength; i++ ) {
						var item = _src[ i ];
						queryPositionInTerm = item.indexOf( queryCleaned );

						if ( queryPositionInTerm === 0 ) {
							// match starts with query (result desired)
							termStartingWithQuery.push( item );
						} else if ( queryPositionInTerm > 0 ) {
							// match contains query (alternate match)
							termContainsQuery.push( item );
						}
					}
					// 10 is the maxlength
					result( termStartingWithQuery.concat( termContainsQuery ).slice( 0, 10 ) );
				}
			});
		},
		//bind a click event that will in turn add the addthis listner after the user mouseover of the share button
		//this is to make sure the addthis object exists before that listner is added
		bindaddthisonclick: function bindaddthisonclick(){
			//register an event for the addthis
			if (!rei.shareButtonPreviousClick) {
				// Listen for the share event
				addthis.addEventListener('addthis.menu.share', rei.util.shareEventHandler);
			}

			rei.shareButtonPreviousClick=true;

		},
		// throw event33 when the user shares somewhere, include product sku if available
		shareEventHandler: function shareEventHandler(e) {
		    if (e.type == 'addthis.menu.share') {
		    	if (rei.analytics.options.products==undefined) {
		    		rei.analytics.sendToFriend("");
		    	} else {
		    		rei.analytics.sendToFriend(rei.analytics.options.products);
		    	}
		    }
		},
		mboxSetup: function mboxSetup(){
			var div = document.createElement('div'), mbox = document.createElement('mbox'), isSetup = /\bmbox_setup\b/,
				gid = function gid(){ return _PREFIX.concat(_j++); },
				_PREFIX = 'mbox_'+(new Date()).getTime(), i=0, _j = 0, TYPE = /*@cc_on 'propertychange';@*/'DOMNodeInserted';

			$(document.getElementsByTagName('mbox')).each(function(){
				if(isSetup.test(this.className)) return;
				var $mb, mb = mbox.cloneNode(true), d = div.cloneNode(true),
					j=0, _a, attr = this.attributes, v,
					complete = false, k,
					evt, hdlr, handlers, events = $(this).data("events");
				$mb = $(mb)
				d.id = gid();
				v = [d.id,this.getAttribute('name')];
				mb.appendChild(d);
				while(_a=attr[j++]){
					if(_a.name.indexOf('jQuery') == 0) continue;
					mb.setAttribute(_a.name, _a.value);
					if(_a.name == 'mbox'){
						var ready = _a.value;
						$mb.bind('mbox',function(e){
							(new Function(ready)).call(this, e);
						});
					}
					// entity.someName="value" attributes are mbox options
					else if(_a.name.indexOf('entity.') == 0) v.push(_a.name+'='+_a.value);
				};
				mb.className += ' mbox_setup';
				for(evt in events){
					handlers = events[evt];
					k=0;
					while(hdlr=handlers[k++]){
						$mb.bind(evt, hdlr.handler);
					}
				};

				$(TYPE == 'propertychange'? d:mb).bind(TYPE, function(e){
					setTimeout(function(){
						// our div is replaced with a new element, so access it via firstChild
						if(complete || !mb.firstChild.childNodes.length) return;
						complete = true;
						$mb.trigger('mbox');
					}, 0);
				});
				this.parentNode.replaceChild(mb, this);
				// mboxDefine(dom_id, mbox_name, options...);
				mboxDefine.apply(window,v);
				// mboxUpdate(mbox_name, options...);
				mboxUpdate.apply(window,v.slice(1)); // without dom_id
			}); // each()
		} // mboxSetup()
	},
	ready: function(){
		rei.perf.ready = (new Date()).getTime();

		// storeId setup in unvHeader
		if(storeId == 8000 && storeClass.toLowerCase() == 'outlet'){ storeId = 8001; }
		if(document.getElementById('unvHeader')){ hdrObj.init(); }

		// overwrite any thickbox instances
		if(window.tb_bootstrap){
				tb_bootstrap = function(){};
				tb_bootstrap.override = true;
		};
	}, // ready()
	load: function(){
		var perf = rei.perf;
		perf.load = (new Date()).getTime();
		// rei.util.mboxSetup(); - removing until mboxUpdate issue resolved

		// init site-search autocomplete
		// test for a/b var or assign literal
		if (typeof(autosuggestexp) != 'undefined')
		{
			if (autosuggestexp != '' && autosuggestexp.length > 0)
			{
				var suggestgetstr = '/rest/search/autosuggest/' + autosuggestexp + '.json';
			}
			else
			{
				var suggestgetstr = '/rest/search/autosuggest/online.json';
			}
		}
		else
		{
			var suggestgetstr = '/rest/search/autosuggest/online.json';
		}

		// get service list or fall back to jsonp
		$.ajax({
		    url: suggestgetstr,
		    type: 'GET',
		    success: function(data){
		        rei.util.autocomplete(data);
		    },
		    error: function() {
		        var js = document.createElement('script');
				js.type = 'text/javascript', js.async = true, js.src = (location.protocol == "https:" ? "https:" : "http:").concat(
					"//content.atomz.com/autocomplete/sp10/04/c7/62", ((document.getElementById("sp_staged") && document.getElementById("sp_staged").value) ? "-stage/" : "/"),
					'?callback=rei.util.autocomplete'
				);
				document.body.appendChild(js);
		    }
		});

	setTimeout(function(){
	// priority items

		// was findAStore.js
		function checkZip(event){
			var zipCodeWithZero = $(document.getElementById('findAStoreZip')).val();
			var zip = parseInt($(document.getElementById('findAStoreZip')).val()||'',10);
			if (isNaN(zip) || (zip < 1)) { alert("Please enter a valid ZIP code."); return false; };
			for(var i=0;i<zipCodeWithZero.length;i++){
				if(zipCodeWithZero.substring(i,i+1)=="0"){
				zip="0"+zip;
				}else{
				break;
				 }
				}
			window.location = "/map/store#"+zip;
		};
		$(document.getElementById('findAStoreZip')).focus(function(){ $(this).val(""); }).keydown(function(event){
			if (event.keyCode == "13") checkZip();
		})
		$(document.getElementById('findAStoreClick')).click(function(event){
			event.preventDefault();
			checkZip();
		});

		// drowDown init
		var hunt3 = $(document.getElementById('hunt3'));
		hunt3.superfish({
			animation : { opacity:"show",height:"show" }
		});
		if ($.browser.msie) {
			var li_with = hunt3.children("li:has(ul)");
			li_with.mouseover(function(){
					$("ul", this).bgIframe({opacity:false});
			}).find("a").focus(function(){
				li_with.find("ul").bgIframe({opacity:false});
			});
		}
		// dropDown()

		//from mbox.js
		$('.recommendations6').jcarousel({scroll: 6});
		$('.recommendations5').jcarousel({ scroll: 5 });
		$('.recommendations4').jcarousel({ scroll: 4 });
		$(document.getElementById('recommendationsVertical')).jcarousel({ vertical: true });

		// setup (replace) thickbox with fancybox
		if(!window.tb_bootstrap || (window.tb_bootstrap && tb_bootstrap.override)){
		TB_remove = $.fancybox.close;
		var url, w, h, wRE = /width=([0-9]+)/, hRE = /height=([0-9]+)/, cRE = /(inlineId=)((?:[a-z][a-z0-9_]*))/i, l, item, items = document.querySelectorAll ? document.querySelectorAll('.thickbox'):$('.thickbox'), fbOptions = {};
		l=items.length;
		while(l&&(item=items[--l])){
			url = item.href || item.alt;
			w = url.match(wRE),
			h = url.match(hRE);
			w = (w && w.length > 0) ? (w[1]*1):1,
				h = (h && h.length > 0) ? (h[1]*1):1;
			w = w < 560 ? 560:w,
				h = h < 340 ? 340:h;
			//check if thickbox content is inline
			if(url.indexOf('#TB_inline') >= 0){
				var contentId = url.match(cRE);
				contentId = (contentId && contentId.length > 0) ? contentId[2] : null;
				fbOptions = (contentId !== null && document.getElementById(contentId) !== null ) ? {content:document.getElementById(contentId).innerHTML,titleShow:false,autoDimensions:true} : null;
			}else{
				fbOptions = {type:'iframe',width:w,height:h};
			}
			if(fbOptions !== null){
				$(item).fancybox(fbOptions);
			}
		}
		};

		minicart = new Minicart();
	}, 0);
	setTimeout(function(){
	// deferred items

		/* TODO does this work with the smart-buttons?
		 * esp on: /help/index.html
		 * */
		$(document.getElementById('unvHeader')).append('<img alt="" src="'.concat(
			location.protocol, '//admin.instantservice.com/resources/smartbutton/5514/15502/available.gif?',
			Math.floor(Math.random()*10001), '" style="width:0px;height:0px;visibility:hidden;position:absolute;" width="0" height="0" onLoad="hdrObj.liveChatOn();" onError="hdrObj.liveChatOff();"/>'
		) );
		var img = new Image();
		img.alt = '';
		img.src = '/etc/static/rei-wcm/pix/common/pixel.gif?perf:r'.concat( (perf.ready - perf.start).toString(),',l',(perf.load - perf.start).toString(),',',(window.perf_start ? 'y,':'n,'),location.href);
		document.body.appendChild(img);
		// END:: load analytics


		//load addthis_widget.js for share button functionality if there is a .share on the page
		if($(".share").length > 0){
			try{
				var addthisjs = document.createElement('script');

				//default to https to avoid security warning in browsers
				var protocol = "https://";
				try{
					if(window.parent.document.location.protocol === 'http:'){
						protocol = 'http://';
					}
				}
				catch(err){}
				//end protocol check

				addthisjs.src= protocol + "s7.addthis.com/js/250/addthis_widget.js?domready=1";
				addthisjs.async = true;
				addthisjs.id = 'addthisscriptloadtest';
				document.body.appendChild(addthisjs);
				addthisjs=0;

				rei.shareButtonPreviousClick = false;
				var l = $('a.share');
				$(l).bind('mouseover',rei.util.bindaddthisonclick);

			}catch(e){}
		}

	}, 100);

	} // load()
};

$(rei.ready);
$(window).load(rei.load);

/* COREMETRICS deprecated content;
 * most used: cmSpFromCmRE, cmCreateManualLinkClickTag, cmCreatePageviewTag
 */
var item, fn = function(){
	if(!document.body) return;
	var img = new Image();
	img.src = '/etc/static/rei-wcm/pix/common/pixel.gif?cm_='.concat(location.href);
	document.body.appendChild(img);
}, cm_ = 'initToken,cmSpFromCmRE,makeOneCmSp,makeCmRe,getABString,cmCreateConversionEventTag,cmCreatePageElementTag,cmCreateProductElementTag,cmCreateManualLinkClickTag,cmCreateManualImpressionTag,cmCreateManualPageviewTag,cmErrorTag,cmCreateTechPropsTag,cmCreateDefaultPageviewTag,cmCreateProductviewTag,cmAddShop,cmCreateShopAction5Tag,cmCreateShopAction9Tag,cmDisplayShop5s,cmDisplayShop9s,cmCalcSKUString,cmCreateOrderTag,cmCreateRegistrationTag,cmCreateErrorTag,cmReportLoadTime,cmGetDefaultPageID,cmCreateApplicationStepTag,cmIndexOfParameter,cmExtractParameter,cmRemoveParameter,cmCheckCMEM,cmSafeZero,myNormalizeURL,cmSendFormFieldTag,cmCreatePageviewTag,cmMultipleOnChange,cmCheckForOnChange,cmSetupFormFieldTags,cmMakeTag,cmCreateFormFieldTag'.split(',');
while(item=cm_.shift()){
	window[item] = fn;
};


/*
window.onerror = function(err,url,line){
	var o = {'error':err,'url':url,'line':line};
	rei.error.push(o);
	if(window.console && console.log) console.log('error!',o);
	if(!document.body) return true;
	var img = new Image();
	img.src = '/static/rei-wcm/pix/common/pixel.gif?err='.concat(location.href,'&line=',line,'&url=',encodeURIComponent(url),'&err=',encodeURIComponent(err));
	document.body.appendChild(img);
	return true;
};
*/

/**
 *	REI Location Object
 *	@namespace rei
 *	@desc			Builds the rei.location object, this function allows the user to navigate Ajax pages with ether the hash tag or a query string
 *	@version		0.01
 *	@requires		jQuery
 *	@returns		{Object}
 */
rei.location = (function () {
	var e,
		a = /\+/g,  // Regex for replacing addition symbol with a space
		r = /([^&=]+)=?([^&]*)/g,
		d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
		q = window.location.search.substring(1),
		h = window.location.hash.substring(1),
		hp = {},
		p = {},
		count = 0;

	//Build get param object
	while (e = r.exec(q)){
	   p[d(e[1])] = d(e[2]);
	   count++;
	}
	if(count===0){p = null;}

	/**
	 * Build hash param object
	 * @private
	 */
	function _buildHashParams(evt){
		var hashChangeEvent = (evt && evt.type === 'hashchange');
		count = 0;
		if(hashChangeEvent){
			h = window.location.hash.substring(1);
			rei.location.hash = h;
			hp = {};
		}
		while (e = r.exec(h)){
		   hp[d(e[1])] = d(e[2]);
		   count++;
		}
		if(count===0){
			hp = null;
		}else if(hashChangeEvent){
			rei.location.getHash = _searchObjPropsScaffold(hp);
		}
	}

	/**
	 * Search Object Scaffolding
	 * @private
	 * @param		{Object} haystack, name-value pairs
	 * @returns		{Function}
	 */
	function _searchObjPropsScaffold(haystack){
		return function(needle){
			var rtn = false;
			if(typeof haystack != "undefined" || haystack != null){
				for (var name in haystack){
					if(name == needle){
						return haystack[name];
						break;
					}
				}
			}
		};
	}

	_buildHashParams();
	$(window).bind("hashchange", _buildHashParams);

	return {
		/**
		 * Get Request Param Value by Name
		 * @function
		 * @public
		 * @param		{String} needle
		 * @returns		{String}
		 */
		getParam : _searchObjPropsScaffold(p),
		/**
		 * Get Hash Value by Name
		 * @function
		 * @public
		 * @param		{String} needle
		 * @returns		{String}
		 */
		getHash : _searchObjPropsScaffold(hp),
		href : window.location.href,
		hash : h,
		params : p
	}

})();

/**
 *	REI User Object
 *	@namespace rei
 *	@desc			Builds the rei.user object
 *	@version		0.01
 *	@requires		jQuery, jQuery.cookie
 *	@returns		{Object}
 */
rei.user = (function(){
	var firstName = '', memberType = '', userCookie = [], isLoggedIn = false;

	/** @private */
	function _readUserCookie(s){
		userCookie = s;
		userCookie = (typeof userCookie !== "undefined" && userCookie !== null) ? userCookie.split("~") : false;
		if(userCookie){
			firstName = userCookie[0];
			memberType = (userCookie.length > 0 && (typeof userCookie[1] !== 'undefined' || userCookie[1] != null)) ? userCookie[1] : false;
		}else{
			firstName = null;
			memberType = null;
		}
		return userCookie;
	}

	/** @private */
	function _testString(s){
		return (typeof s == 'undefined' && typeof s != 'string') ? null : s ;
	}

	//Contructor
	isLoggedIn = Boolean(Number($.cookie('loggedin')));
	if(isLoggedIn){
		_readUserCookie($.cookie('rei_user_info'));
	}else{
		_readUserCookie(null);
	}

	return {
		/**
		 * Set first name of current REI user.
		 * @function
		 * @public
		 * @param		{String} s
		 * @returns		{String}
		 */
		setFirstName : function(s){return firstName = _testString(s);},
		/**
		 * Get first name of current REI user.
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getFirstName : function(){return firstName;},
		/**
		 * Set member type of current REI user.
		 * @function
		 * @public
		 * @param		{String} s
		 * @returns		{String}
		 */
		setMemberType : function(s){return memberType = _testString(s);},
		/**
		 * Get member type of current REI user.
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getMemberType : function(){return memberType;},
		/**
		 * Get user's login status
		 * @function
		 * @public
		 * @returns		{Boolean}
		 */
		isLoggedIn : function(){return isLoggedIn;},
		/**
		 * Make a request to the backend for this users's member type
		 * @function
		 * @public
		 * @returns		{String} user's member type
		 */
		requestMemberType : function(){
			if(isLoggedIn && memberType == false){
				$.ajax({
					type: 'GET',
					url: '/rest/user/memberType',
					async: false,
					dataType: 'text',
					timeout: 10000,
					success: function(data){memberType = data;},
					error: function(jqXHR, textStatus, errorThrown){memberType = false;}
				});
			}else if(isLoggedIn == false){
				memberType = null;
			}
			return memberType;
		},
		/**
		 * Get Member type of current REI User as a boolean.
		 * @function
		 * @public
		 * @returns		{Boolean}
		 */
		isMember : function() {
			return memberType == 'Primary';
		}
	};

})();

/**
 *	REI User Location Object
 *	@namespace rei
 *	@desc			Builds the rei.user.location object.  The location data is based upon the user's IP address
 *	@version		0.01
 *	@requires		jQuery, jQuery.cookie
 *	@returns		{Object}
 */
rei.user.location = (function(){
	var _this = {};

	if($.cookie("IS3_GSV") != null){
		$.each($.cookie("IS3_GSV").split("_"),function(index,value){
			_this[value.split("-")[0]] = value.split("-")[1];
		});
	}

	return {
		/**
		 * Get User's city
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getCity : function(){
			return _this["GeoCt"];
		},
		/**
		 * Get User's country
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getCountry : function(){
			return _this["GeoCo"];
		},
		/**
		 * Get User's region
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getRegion : function(){
			return _this["GeoRg"];
		},
		_l : _this
	}

})();

rei.gps = new gps();
function gps(){
	me = this;
	this.locationReadyCallback = null;
	this.callLocationReadyCallback = function(){
		try{
			me.locationReadyCallback();
		}
		catch(err){

		}
	};
	this.debug = false;
	this.coordinate =  {city:null, state: null, zip: null, lat:null, lng:null, autoDetect:false};
	this.errorMessages = {
		invalidZipCode: 'Sorry, we don\'t recognize that ZIP code. Please enter a valid 5-digit ZIP code.',
		invalidCityAndState: 'Sorry, we don\'t recognize that city and/or state.  Please re-enter your city and state.',
		missingCityOrState:'You must specify both a city and a state, or enter your ZIP code.',
		missingZipCodeCityAndState:'Please provide a valid 5-digit ZIP code or city and state.'
	};
	this.saveToCookie = function(){
	    //$.cookie('gps', me.coordinate.city.concat('|', me.coordinate.state, '|', me.coordinate.zip, '|', me.coordinate.lat, '|', me.coordinate.lng, '|', me.coordinate.autoDetect));
	    $.cookie('gps', me.coordinate.city.concat('|', me.coordinate.state, '|', me.coordinate.zip, '|', me.coordinate.lat, '|', me.coordinate.lng, '|', me.coordinate.autoDetect), {path: '/', expires:10});
	};
	this.getUserLocation = function(){
		var gpsCookie = $.cookie('gps');
		if(gpsCookie != null && gpsCookie != ''){
			var gpsCoordinate = $.cookie('gps').split('|');
			if(gpsCoordinate.length == 6){
			    me.coordinate.city = gpsCoordinate[0];
			    me.coordinate.state = gpsCoordinate[1];
			    me.coordinate.zip = gpsCoordinate[2];
			    me.coordinate.lat = gpsCoordinate[3];
			    me.coordinate.lng = gpsCoordinate[4];
			    me.coordinate.autoDetect = gpsCoordinate[5];
			    me.callLocationReadyCallback();
			    if(me.debug == true) me.showUserLocation();
			}
		}
		if(me.coordinate.city == null){
			if(window.google === undefined || google.loader == null){
				initLoader();
			}
			else{
				loadMaps();
			}
		}
		function initLoader() {
			var script = document.createElement("script");
			script.src = "https://www.google.com/jsapi?callback=loadMaps";
			script.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	};
	this.autoLocate = function(){
		$.cookie('gps', '');
		$.cookie('gps', null);
		me.coordinate =  {city:null, state: null, zip: null, lat:null, lng:null, autoDetect:false};
		me.getUserLocation();
	};
	this.showUserLocation = function(){
		if($('#locationInfo').length == 0){
			$('body').append('<div id="locationInfo" style="position:fixed; bottom: 8px; left:2px;"><span></span> - <a id="changeLocationLink" href="javascript:void(0);"> change location</a>  <a href="javascript:void(0);" onclick="rei.gps.autoLocate();"><img style="margin-bottom:-10px;" src="/img/autolocation.png" /></a>', '</div>');
			$('#changeLocationLink').bind('click', function(e){
				try{
					e.preventDefault();
					e.stopPropagation();
				}
				catch(err){
					//ie browsers may land here
				}
				me.editLocation($('body'));
			});
		}
		var zip = me.coordinate.zip == null || me.coordinate.zip == 'null' ? '' : me.coordinate.zip;
		$('#locationInfo span').html(me.coordinate.city.concat(', ', me.coordinate.state, ' ', zip));
	};
	this.hideLocationForm = function(){
		$('#zipChangeForm').hide();
	};
	this.updateLocation= function(){
		var zipCode = $('#cfZipCode').val();
		var city =  $('#cfCity').val();
		var state =  $('#cfState').val();
		if(zipCode == '' && (city == '' && state == '')){
			alert(me.errorMessages.missingZipCodeCityAndState);
			return;
		}
		else if(zipCode != ''){
			me.changeLocationByZipCode(zipCode, function(found){
				if(found == false){
					if((city != '' && state != '')){
						me.changeLocationByCityAndState(city, state, function(found){
							if(found == false){
								alert('Zip code not found, city and state did not return a valid location. Please enter a valid zip code, or a valid city and state.');
							}
						});
					}
					else{
						alert(me.errorMessages.invalidZipCode);
					}
				}
				else{
					me.hideLocationForm();
					if(me.debug == true) me.showUserLocation();
				}
			});
		}
		if(city != '' && state != ''){
			me.changeLocationByCityAndState(city, state, function(found){
				if(found == false){
					alert(me.errorMessages.invalidCityAndState);
				}
				else{
					me.hideLocationForm();
					if(me.debug == true) me.showUserLocation();
				}
			});
		}
		else{
			alert(me.errorMessages.missingCityOrState);
			return;
		}
	};
	this.changeLocationByUrl = function(restUrl, callback){
		$.ajax({
			type: "GET",
			url: restUrl,
			dataType: "json",
			// does not fire for 500 or 400 errors:
			success: function(json){
				if(json != null && json.length){
					json = json[0];
					if(json.zipcode){
						json = json.zipcode;
					}
				}
				if(json != null && json.latitude != null && json.longitude != null){
					var lat = json.latitude;
					var lng = json.longitude;
					me.coordinate.city = json.city;
					me.coordinate.state = json.stateAbbr;
					me.coordinate.zip = json.zip;
					me.coordinate.lat = json.latitude;
					me.coordinate.lng = json.longitude;
					me.coordinate.autoDetect = false;
					me.saveToCookie();
					try{
						callback(true);
					}
					catch(err){
					}
					try{
						clientUpdateCallback();
					}
					catch(err){

					}
				}
				else{
					try{
						callback(false);
					}
					catch(err){
					}
				}
			},
			// fires for non-500 responses (including 400's):
			complete: function(){

			},
			// fires for 500 errors:
			error: function(){
			}
		}); // ajax()
	}
	this.changeLocationByZipCode= function(zipCode, callback){
		me.changeLocationByUrl('/rest/geo/' + zipCode, callback);
	};
	this.changeLocationByCityAndState= function(city, state, callback){
		me.changeLocationByUrl('/rest/geo/'.concat(city, '/', state), callback);
	};

	this.editLocation = function($parent){
		if($('#zipChangeForm').length == 0){
			var html = '' +
			'<div id="zipChangeForm" style="display: block;"><div style="position:relative;">' +
			'<div id="zipChangeFormCB" onclick="rei.gps.hideLocationForm(); try{closeClientCallBack();}catch(err){}"></div>' +
			'<div class="chat-bubble">' +
			'	<form action="javascript:this.updateLocation();">' +
			'		<div id="changeYourLocation" class="cf">Change Your Location</div>' +
			'		<div id="zipBlock">' +
			'			Zip Code<br>' +
			'			<input type="text" id="cfZipCode">' +
			'		</div>' +
			'		<div id="orBlock">' +
			'			<br>' +
			'			<div id="or">- or -</div>' +
			'		</div>' +
			'		<div id="cityBlock">' +
			'			City<br>' +
			'			<input type="text" id="cfCity">' +
			'		</div>' +
			'		<div id="stateBlock">' +
			'			State<br>' +
			'			<select id="cfState"><option value=""></option>' +
			'				<option value="AL" title="Alabama">AL</option>' +
			'				<option value="AK" title="Alaska">AK</option>' +
			'				<option value="AZ" title="Arizona">AZ</option>' +
			'				<option value="AR" title="Arkansas">AR</option>' +
			'				<option value="CA" title="California">CA</option>' +
			'				<option value="CO" title="Colorado">CO</option>' +
			'				<option value="CT" title="Connecticut">CT</option>' +
			'				<option value="DE" title="Delaware">DE</option>' +
			'				<option value="DC" title="District of Columbia">DC</option>' +
			'				<option value="FL" title="Florida">FL</option>' +
			'				<option value="GA" title="Georgia">GA</option>' +
			'				<option value="HI" title="Hawaii">HI</option>' +
			'				<option value="ID" title="Idaho">ID</option>' +
			'				<option value="IL" title="Illinois">IL</option>' +
			'				<option value="IN" title="Indiana">IN</option>' +
			'				<option value="IA" title="Iowa">IA</option>' +
			'				<option value="KS" title="Kansas">KS</option>' +
			'				<option value="KY" title="Kentucky">KY</option>' +
			'				<option value="LA" title="Louisiana">LA</option>' +
			'				<option value="ME" title="Maine">ME</option>' +
			'				<option value="MD" title="Maryland">MD</option>' +
			'				<option value="MA" title="Massachusetts">MA</option>' +
			'				<option value="MI" title="Michigan">MI</option>' +
			'				<option value="MN" title="Minnesota">MN</option>' +
			'				<option value="MS" title="Missippi">MS</option>' +
			'				<option value="MO" title="Missouri">MO</option>' +
			'				<option value="MT" title="Montana">MT</option>' +
			'				<option value="NE" title="Nebraska">NE</option>' +
			'				<option value="NV" title="Nevada">NV</option>' +
			'				<option value="NH" title="New Hampshire">NH</option>' +
			'				<option value="NJ" title="New Jersey">NJ</option>' +
			'				<option value="NM" title="New Mexico">NM</option>' +
			'				<option value="NY" title="New York">NY</option>' +
			'				<option value="NC" title="North Carolina">NC</option>' +
			'				<option value="ND" title="North Dakota">ND</option>' +
			'				<option value="OH" title="Ohio">OH</option>' +
			'				<option value="OK" title="Oklahoma">OK</option>' +
			'				<option value="OR" title="Oregon">OR</option>' +
			'				<option value="PA" title="Pennsylvania">PA</option>' +
			'				<option value="RI" title="Rhode Island">RI</option>' +
			'				<option value="SC" title="South Carolina">SC</option>' +
			'				<option value="SD" title="South Dakota">SD</option>' +
			'				<option value="TN" title="Tennessee">TN</option>' +
			'				<option value="TX" title="Texas">TX</option>' +
			'				<option value="UT" title="Utah">UT</option>' +
			'				<option value="VT" title="Vermont">VT</option>' +
			'				<option value="WA" title="Washington">WA</option>' +
			'				<option value="WV" title="West Virginia">WV</option>' +
			'				<option value="WI" title="Wisconsin">WI</option>' +
			'				<option value="WY" title="Wyoming">WY</option>' +
			'			</select>' +
			'		</div>' +
			'		<div id="goBlock">' +
			'			<br>' +
			'			<button class="fancyBox white medium button" id="cfGo" onclick="rei.gps.updateLocation();">GO</button>' +
			'		</div>' +
			'	</form>' +
			'	<div class="cf"></div>' +
			'	<div class="chat-bubble-arrow-border"></div>' +
			'	<div class="chat-bubble-arrow"></div>' +
			'</div>' +
			'</div></div>';
			$parent.append(html);
			$('#zipChangeForm').bind('click', function(e){
				e.preventDefault();
				e.stopPropagation();
			});
			var css = '<style>' +
			'#zipChangeForm .chat-bubble-arrow {border-color: white transparent transparent; border-style: solid; border-width: 10px; bottom: -19px; height: 0; left: 20px; position: absolute; width: 0;}' +
			'#zipChangeForm .chat-bubble-arrow-border {border-color: #666666  transparent transparent transparent; border-style: solid; border-width: 10px; height: 0;width: 0; position: absolute; bottom: -22px; left: 20px;}' +
			'#zipChangeForm .chat-bubble {font-family:Verdana; font-size:10px; color: #696A6C; background-color: white; border:2px solid #666666; margin:10px auto; padding:10px; position:relative; -moz-border-radiuss:10px; -webkit-border-radiuss:10px; -moz-box-shadow:3px 3px 3px #888888; -webkit-box-shadow:3px 3px 3px #888888; min-width:200px;}' +
			'#zipChangeForm{position: absolute;font-weight: bold; color: black;width:370px; z-index:9999999999;}' +
			'#zipChangeForm{' +
			'position: fixed;' +
			'bottom:20px;' +
			'}' +
			'#zipChangeForm  #zipChangeFormCB{' +
			'	position:absolute;' +
			'width: 30px;' +
			'height: 30px;' +
			'background-image: url(\'/etc/static/rei-wcm/pix/common/modal/fancybox.png\');' +
			'background-position: -40px 0px;' +
			'cursor: pointer;' +
			'z-index: 1103;' +
			'}' +
			'#zipChangeFormCB{' +
			'top: -12px;' +
			'right: -13px;' +
			'}' +
			'#zipChangeForm .chat-bubble-arrow, #zipChangeForm .chat-bubble-arrow-border {left: 205px;}' +
			'#zipChangeForm #zipBlock,#zipChangeForm  #orBlock,#zipChangeForm  #cityBlock,#zipChangeForm #stateBlock,#zipChangeForm  #goBlock{float: left; margin-right:5px;}' +
			'#or{margin-top:5px;}' +
			'#cfZipCode{width:60px;}' +
			'#cfCity{width:120px;}' +
			'#cfState{margin-top:2px; width:50px;}' +
			'#cfGo{margin-top:2px;}' +
			'</style>';
			$('head').append(css);
		}
		$('#zipChangeForm').show();
		$('#cfCity').val('');
		$('#cfState').val('');
		$('#cfZipCode').val('').focus();
	};
}

})(jQuery);



function loadMaps() {
	//set default location to seattle
	var city='Seattle';
	var state = 'WA';
	var lat = 47.543348;
	var lng = -122.27496;
    if (google.loader.ClientLocation) {
    	var clientLocation = google.loader.ClientLocation;
    	city=clientLocation.address.city;
    	state = clientLocation.address.region;
    	lat = clientLocation.latitude;
    	lng = clientLocation.longitude;
        rei.gps.coordinate.city = city;
        rei.gps.coordinate.state = state;
        rei.gps.coordinate.lat = lat;
        rei.gps.coordinate.lng = lng;
        rei.gps.changeLocationByCityAndState(city, state, function(found){
            rei.gps.coordinate.autoDetect = true;
        	rei.gps.saveToCookie();
        	rei.gps.callLocationReadyCallback();
        	if(rei.gps.debug == true)rei.gps.showUserLocation();
        });
    }
    else{
    	rei.gps.callLocationReadyCallback();
    }
}

/**
 *	REI Services
 *	@desc This object provides a common interface to jQuery's ajax API.
 */
window.rei = rei || {};
rei.services = (function($){
	var defaultOptions = {
		async: true,
		cache: false,
		dataType: "json",
		timeout: 30000,
		error: function(jqXHR, textStatus, errorThrown){
// TODO update to use rei.services.RestError
			var data,
				errorData,
				status = jqXHR.status,
				forwardToErrorPage = function(){
					window.location.href = "/Error";
				};

			try {
				data = jQuery.parseJSON(jqXHR.responseText);
				errorData = data.error || null;
			} catch (e) {
				data = {};
				errorData = [];
				if(rei.errors && rei.errors.push){
					rei.errors.push(errorThrown);
				}
			}
			if(status === 400){
				for(var i = 0; i < errorData.length; i++){
					if(errorData[i].parameterName && errorData[i].parameterName.indexOf("REI_SSL_SESSION_ID") > -1){
						window.location.href = "/";
						return;
					}
				}
				return;
			}else{
				// Do nothing on jqXHR.abort
				if (jqXHR.status === 0 || jqXHR.readyState === 0) {
					return;
				}
				if(rei.errors && rei.errors.push){
					rei.errors.push(errorThrown);
				}
				forwardToErrorPage();
			}
		}
	};

	if(typeof $ !== "function" && !$().jquery){return;}

	function _buildAcceptsType(type){
		var dataType = "";
		switch(type){
			case "json":
				dataType = "application/json";
				break;
			case "xml":
				dataType = "application/xml";
				break;
			case "text":
				dataType = "text/plain";
				break;
			default:
				dataType = "application/json";
				break;
		}
		return dataType;
	}

	function _buildAcceptsVersion(version){
		var versionString = "v=";
		version = parseInt(version, 10) || "";
		return versionString.concat(version);
	}

	function _buildAcceptsHeader(type, version){
		var header = "";
		return "".concat(
			_buildAcceptsType(type),
			";",
			_buildAcceptsVersion(version)
		);
	}

	function _buildAjaxSettings(url, data, options){
		var ajaxSettings = {};

		data = data || {};
		options = options || {};
		options.data = data;
		if(options.type !== 'PUT')
			options.url = _urlWithHash(url);
		else
			options.url = url;

		ajaxSettings = $.extend({}, defaultOptions, options);

		// Add a service version for the request
		if(options.version){
			// The jQuery.ajax API for setting headers do not work getting accepts.
			// We are updating the request header in the beforeSend
			ajaxSettings.beforeSend = function(jqXHR, settings){
				jqXHR.setRequestHeader('Accept', _buildAcceptsHeader(options.dataType, options.version));
				if($.isFunction(options.beforeSend)){
					options.beforeSend.apply(this, Array.prototype.slice.call(arguments));
				}
			};
		}

		return ajaxSettings;
	}

	function _ajax(url, data, options){
		return $.ajax(_buildAjaxSettings(url, data, options));
	}

	function _urlWithHash(url) {
		var delimiter = (/\?/.test(url)) ? "&" : "?",
			hash = window.location.hash.substr(2),
			appRoute = "appRoute=" + hash,
			newUrl = "";
		if(hash.length > 0){
			newUrl = url.concat(delimiter, appRoute);
		}else{
			newUrl = url;
		}
		return newUrl;
	}

	return {
		Read: function(url, data, options){
			options.type = "GET";
			return _ajax(url, data, options);
		},
		Create: function(url, data, options){
			options.type = "POST";
			return _ajax(url, data, options);
		},
		Delete: function(url, data, options){
			options.type = "DELETE";
			return _ajax(url, data, options);
		},
		Get: function(url, data, options){
			options.type = "GET";
			return _ajax(url, data, options);
		},
		Post: function(url, data, options){
			options.type = "POST";
			return _ajax(url, data, options);
		},
		Put: function(url, data, options){
			options.type = "PUT";
			return _ajax(url, data, options);
		},
		errorCallback: defaultOptions.error,
		_debug: {
			_ajax: _ajax,
			_urlWithHash: _urlWithHash,
			_buildAcceptsHeader: _buildAcceptsHeader,
			_buildAcceptsVersion: _buildAcceptsVersion,
			_buildAcceptsType: _buildAcceptsType,
			_buildAjaxSettings: _buildAjaxSettings,
			defaultOptions: defaultOptions
		}
	};
}(jQuery));
/**
 *  REI User Session
 *  @namespace rei
 *  @desc           Builds the rei.UserSession object prototype.  This object will grab user state
 *                  from cookies.  In the future the we should be storing state in localStorage.
 *  @requires       jQuery, jQuery.cookie, rei
 *  @returns        {Object}
 *  TODO            Reassess the need for client code to set USER_COOKIE.
 */
(function(window, $, rei){

    /**
     *  Config
     */
    var USER_COOKIE             = 'rei_user_info';  // Cookie set by server on successful user login and does persist.
    var LOGGEDIN_COOKIE         = 'loggedin';       // Cookie set by server on successful user login and does not persist.
    var SESSION_ID_COOKIE       = 'REI_SESSION_ID'; // Cookie set by server on successful user login or on add to cart.
    var PRIMARY_MEMBER_TYPE     = 'Primary';        // User info matches member record.
    var HOUSEHOLD_MEMBER_TYPE   = 'Household';      // User info partially matches member record.
    var INVALID_MEMBER_TYPE     = 'Invalid';        // User info does not match member records.

    /**
     *  @class
     */
    var UserSession = function(){
        var self                = this;
        self.sessionId          = '';
        self.firstName          = '';
        self.isLoggedIn         = false;
        self.isMember           = false;
        self.memberType         = '';
        self.isEmployee         = false;// This is not ready for prime time, please do not use
        self.isMemberInvalid    = false;
        self.hasSession         = false;
    };

    /**
     *  @constructor
     *  @returns    {UserSession} returns itself
     */
    UserSession.prototype.init = function(){
        var self = this;

        self.syncFromCookies();

        // Get memberType if we do not have one
        if(self.memberType === ''){
            self.requestMemberType();
        }

        return self;
    };

    /**
     *  Reads REI cookies and saves state to self
     *  @returns    {UserSession} returns itself
     */
    UserSession.prototype.syncFromCookies = function(){
        var self                = this;
        var userCookie          = $.cookie(USER_COOKIE);
        var isLoggedInCookie    = $.cookie(LOGGEDIN_COOKIE);
        var sessionCookie       = $.cookie(SESSION_ID_COOKIE);
        var newUser             = {};

        // Set user data with cookie data
        if(userCookie){
            userCookie = userCookie.split('~');
            newUser.firstName = userCookie[0];
            newUser.memberType = userCookie[1];
        }else{
            newUser.firstName = '';
            newUser.memberType = '';
        }

        // Set isLoggedIn with cookie data
        if(isLoggedInCookie === '1') {
            newUser.isLoggedIn = true;
        }else{
            newUser.isLoggedIn = false;
        }

        // Set sessionid with cookie data
        newUser.sessionId = sessionCookie;
        if(sessionCookie) {
            newUser.hasSession = true;
        }

        return self.set(newUser);
    };

    /**
     *  Updates itself and cookies with new data
     *  Note that isMember canot be updated
     *  @param  {object} user
     *      {
     *          firstName: 'foo',
     *          memberType: 'Primary',
     *          isEmployee: false,
     *          isLoggedIn: true
     *      }
     *  @returns    {UserSession} itself
     *  @todo   Discuss use cases for this method with Platform. We may want to keep
     *          logic for getting cookies in the backend. If not for just some.
     */
    UserSession.prototype.set = function(user) {
        var self = this;

        // Leave if there is nothing to set
        if(!user){
            return self;
        }

        self.firstName = user.firstName || self.firstName;
        self.memberType = user.memberType || self.memberType;

        // Set Member Type
        if(self.memberType === PRIMARY_MEMBER_TYPE || self.memberType === HOUSEHOLD_MEMBER_TYPE){
            self.isMember = true;
            self.isMemberInvalid = false;
        }else if(self.memberType === INVALID_MEMBER_TYPE){
            self.isMember = false;
            self.isMemberInvalid = true;
        }else{
           self.isMember = false;
           self.isMemberInvalid = false;
        }

        // Set Employee Status
        if(user.isEmployee !== undefined){
            self.isEmployee = user.isEmployee;
        }

        // Set Logged-in Status
        if(user.isLoggedIn !== undefined){
            self.isLoggedIn = user.isLoggedIn;
        }

        if(user.hasSession === true) {
            self.hasSession = true;
        }

        return self;
    };

    /**
     *  Request and store a new unsecured session token
     *  @param    {object} clientAjaxSettings, same settings object that jQuery.ajax takes
     *  @returns    {UserSession} itself
     */
    UserSession.prototype.newSession = function(clientAjaxSettings){
        var self = this,
            ajaxSettings = {
                async: true,
                cache: false
            };


        // Build ajaxSettings
        $.extend(ajaxSettings, clientAjaxSettings);
        ajaxSettings.success = function(token){
            // FIXME this is current escapping the string for setting. And it shouldn't.
            $.cookie(SESSION_ID_COOKIE, token.unsecuredToken, {
                path: '/',
                expires: 14
            });

            // Update object state
            self.syncFromCookies();

            if(clientAjaxSettings && clientAjaxSettings.success && $.isFunction(clientAjaxSettings.success)){
                clientAjaxSettings.success(token);
            }

        };
        ajaxSettings.error = function(jqXHR, textStatus, errorThrown){
            if(clientAjaxSettings && clientAjaxSettings.error && $.isFunction(clientAjaxSettings.error)){
                clientAjaxSettings.error(jqXHR, textStatus, errorThrown);
            }

        };

        self.endSession();

        rei.services.Create(
            '/rest/user/guest/v2.json',
            {},
            ajaxSettings
        );

        return self;
    };

    /**
     *  Ends the current user session. This will delete the session cookie
     *  and the user and logged-in cookie if logged-in
     *  @returns    {UserSession} itself
     *  TODO REI_COOKIES needs to be moved to the config section
     */
    UserSession.prototype.endSession = function(){
        var self = this;
        var REI_COOKIES = ['WCS_SESSION_ID', 'WCS_AUTHENTICATION_ID', 'REI_SESSION_ID', 'REI_SSL_SESSION_ID',
            'rei_ila_appids', 'guestAddess', 'loggedin', 'rei_cart', 'outlet_cart', 'GiftRegistrySetup', 'GiftRegistryPurchase'];
        var i = 0;

        for(i; i < REI_COOKIES.length; i++){
            $.cookie(REI_COOKIES[i], null);
        }

        return self;
    };

    /**
     *  Ask the backend for the member type of the current user.
     *  This only works if the user is currently logged-in.
     *  Ajax request will not be made for not logged-in users.
     *  @param    {object} clientAjaxSettings, same settings object that jQuery.ajax takes
     *  @returns    {UserSession} returns itself
     *  TODO Is this function still being used
     */
    UserSession.prototype.requestMemberType = function(clientAjaxSettings){
        var self = this,
            ajaxSettings = {
                async: false,
                dataType: 'text',
                timeout: 10000
            };

        // Build ajaxSettings
        $.extend(ajaxSettings, clientAjaxSettings);
        ajaxSettings.success = function(data){
            self.set({memberType: data});

            if(clientAjaxSettings && clientAjaxSettings.success && $.isFunction(clientAjaxSettings.success)){
                clientAjaxSettings.success(data);
            }
        };
        ajaxSettings.error = function(jqXHR, textStatus, errorThrown){
            self.set({memberType: false});
            if(clientAjaxSettings && clientAjaxSettings.error && $.isFunction(clientAjaxSettings.error)){
                clientAjaxSettings.error(jqXHR, textStatus, errorThrown);
            }

        };

        // Only logged in
        if(self.isLoggedIn){
            rei.services.Get(
                '/rest/user/memberType',
                {},
                ajaxSettings
            );
        }

        return self;
    };

    // Attach UserSession to the rei namespace
    rei.UserSession = UserSession;
})(window, jQuery, rei);
/**
 *  REI User Analytics Object
 *  @namespace rei
 *  @desc           Builds the rei.UserAnalytics object.
 *                  This object extends rei.UserSession, but with different
 *                  requirements for analytics.
 *  @version        0.01
 *  @author         Andrew Gatlabayan <agatlab@rei.com>
 *  @requires       jQuery, jQuery.cookie, rei, JSON
 *  @returns        {Object}
 *  TODO            This could be copied to the App Server (WAS||JBOSS),
 *                  online/online-web/src/main/webapp/javascript/rei.UserAnalytics.js
 *  TODO            This code should be refactored into JSTL tags
 */
(function(window, $, rei){
    var ANALTYIC_KEY_PATTERN = /(^ev|^p)[0-9]/;
    var ANALTYIC_KEY_REPLACE_PATTERNS = [
        ["eVar", /^ev/],
        ["prop", /^p/]
    ];
    var COOKIE_NAME = "session.analytics";

    /**
     *  @class
     */
    var UserAnalytics = function(userSession){
        this.tags = {};
        this._userSession = userSession;
    };

    /**
     *  @constructor
     *  This will check member status from UserSession, localStorage and query strings
     */
    UserAnalytics.prototype.init = function(){
        var self = this;

        self.setFromCookie();
        self.setFromUserSession();
        self.setFromQueryStrings();

        return self;
    };

    /**
     *  Grab any data we need from locatStorage
     */
    UserAnalytics.prototype.setFromCookie = function(){
        var self = this;
        var jsonString = $.cookie(COOKIE_NAME);
        var data;

        try{
            data = JSON.parse(jsonString);
        }catch(e){
            data = false;
        }

        if(data){
            $.extend(self.tags, data);
        }

        return self;
    };

    /**
     *  Store UserAnalytics.tags to cookie
     */
    UserAnalytics.prototype.storeInCookie = function(){
        var self = this;
        var jsonString;

        try{
            jsonString = JSON.stringify(self.tags);
        }catch(e){
            jsonString = "";
        }

        $.cookie(COOKIE_NAME, jsonString, {
            path: "/",
            expires: 14
        });
        return self;
    };

    /**
     *  Grab any data we need to use from a UserSession Object
     *  TODO update ANALTYIC_KEY_REPLACE_PATTERNS to an object, it's a pain to read
     */
    UserAnalytics.prototype.setFromUserSession = function(){
        var self = this;
        var userSession = self._userSession;
        var newTags = {};
        var memberTagValue = (userSession.isMember) ? "1" : "0";

        // We only want to use UserSession if we are logged-in
        if(!userSession.isLoggedIn){
            return self;
        }

        newTags[ANALTYIC_KEY_REPLACE_PATTERNS[0][0] + "11"] = memberTagValue;
        self.setTags(newTags);

        return self;
    };

    /**
     *  Checks window.location for analytic tags
     *  TODO should we check value for XSS before saving?
     */
    UserAnalytics.prototype.setFromQueryStrings = function(){
        var self = this;
        var queryStrings = rei.location.params || {};
        var analyticKeyPattern = ANALTYIC_KEY_PATTERN;
        var replacePatterns = ANALTYIC_KEY_REPLACE_PATTERNS;

        // TODO got a pyramid of death going on here
        $.each(queryStrings, function(name, value){
            var newTags = {};
            if(analyticKeyPattern.test(name)){
                // TODO replacePatterns will be easier to read if object instead
                // of array
                $.each(replacePatterns, function(index, pattern){
                    var newKey = name.replace(pattern[1], pattern[0]);
                    if(pattern[1].test(name)){
                        newTags[newKey] = value;
                    }
                });
                self.setTags(newTags);
            }
        });

        return self;
    };

    /**
     *  Set tags
     *  @param    {object} tags
     *      example {eVar11:"1"}
     */
    UserAnalytics.prototype.setTags = function(tags){
        var self = this;

        // Update all tags that were provided
        $.extend(self.tags, tags);

        // Store updates to localStorage
        self.storeInCookie();
        return self;
    };

    /**
     *  Set tag value of membership status
     */
    UserAnalytics.prototype.setMembershipStatus = function(status){
        var self = this;
        var newTagValue = (status === "member") ? "1" : "";

        self.setTags({
            eVar11: newTagValue
        });

        return self;
    };

    /**
     *  Get tag value for membership status
     */
    UserAnalytics.prototype.getMembershipStatus = function(){
        var self = this;
        var userSession = self._userSession;
        var tags = self.tags;

        self.init();

        return (tags.eVar11 === "1") ? "member" : "non-member";
    };

    /**
     *  Get tag value for logged-in status
     */
    UserAnalytics.prototype.getLoggedInStatus = function(){
        var self = this;
        var userSession = self._userSession;

        return (userSession.isLoggedIn) ? "logged in" : "not logged in";
    };

    /**
     *  Attach tags to an object
     *  @param    {object} target
     */
    UserAnalytics.prototype.attachTags = function(target){
        var self = this;
        var tags = self.tags;
        if(!target) return;

        $.extend(target, tags);
    };

    // Create and initialize instance of UserAnalytics on the rei namespace
    rei.UserAnalytics = UserAnalytics;
})(window, jQuery, rei);
/**
    @fileOverview   Session object for REI.com
    @author Andrew Gatlabayan <agatlab@rei.com>
*/
(function(window, rei, $){
	var HOST = window.location.hostname;
	var PROD_HOSTS = ["www.rei.com", "corp.rei.com", "qa.rei.com", "next.rei.com", "psqa.rei.com"];
	var DEV_HOSTS = ["test.rei.com", "tstage.rei.com", "tcorp.rei.com", "future.rei.com", "future-corp.rei.com", "future-stage.rei.com"];

    var session = {};
    session.user = new rei.UserSession().init();
    session.userAnalytics = new rei.UserAnalytics(session.user).init();

    session.isProduction = $.inArray(HOST, PROD_HOSTS) > -1;
    session.isDevelopment = $.inArray(HOST, DEV_HOSTS) > -1;

    // Make session module available on rei namespace
    rei.session = session;
})(window, rei, jQuery);
/**
 *	REI User Object
 *	@namespace rei
 *	@desc			Builds the rei.user object
 *	@deprecated		User data can be access from rei.session.user
 *	@version		0.01
 *	@requires		jQuery, jQuery.cookie, rei
 *	@returns		{Object}
 */
(function($, rei){
	var user = {},
		userSession = rei.session.user;

	/** @private */
	function _testString(s){
		return (typeof s == 'undefined' && typeof s != 'string') ? null : s ;
	}

	/** @private */
	function _emptyCart(){
		$.cookie("rei_cart", null, {path:'/'});
		$.cookie("outlet_cart", null, {path:'/'});
	}

	user = {
		/**
		 * Set first name of current REI user.
		 * @function
		 * @see			UserSession#set
		 * @public
		 * @param		{String} s
		 */
		setFirstName : function(s){
			userSession.set({
				firstName: _testString(s)
			});
			return this;
		},
		/**
		 * Get first name of current REI user.
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getFirstName : function(){
			return userSession.firstName;
		},
		/**
		 * Set member type of current REI user.
		 * @function
		 * @see			UserSession#set
		 * @public
		 * @param		{String} s
		 */
		setMemberType : function(s){
			userSession.set({
				memberType: _testStrings(s)
			});
			return this;
		},
		/**
		 * Get member type of current REI user.
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getMemberType : function(){
			return userSession.memberType;
		},
		/**
		 * Get user's login status
		 * @function
		 * @public
		 * @returns		{Boolean}
		 */
		isLoggedIn : function(){
			return userSession.isLoggedIn;
		},
		/**
		 * Make a request to the backend for this users's member type
		 * @function
		 * @see			UserSession#requestMemberType
		 * @public
		 * @returns		{String} user's member type
		 */
		requestMemberType : function(clientAjaxSettings){
			userSession.requestMemberType(clientAjaxSettings);
			return userSession.memberType;
		},
		/**
		 * Get Member type of current REI User as a boolean.
		 * @function
		 * @public
		 * @returns		{Boolean}	
		 */
		isMember : function() {
			return userSession.isMember;
		},
		emptyCart: _emptyCart
	};

	/**
	 *	Attach location object to rei namespace
	 */
	$.extend(rei, {user: user});

})(jQuery, rei);
/* $Id$ */

/**
 * TODO
 * 1) Remove hard-coded storeId's
 * 
 */
var perf_start = (new Date()).getTime(),
	isUltraTransform = false,
	jsIsCheckout = false,
	httpsPath,
	httpPath,
	jscript_path,
	httpHost,
	httpsHost,
	gomez,
	returnUrl,
	currentUrl,
	fullDomain = window.location.host,
	domainArray = fullDomain.split('.'),
	subDomain=domainArray[0]+' ',
	storeId = '8000',
	image_path = '',
	yourAccountInView = 'YourAccountInfoInView?storeId=8000',
	yourAccountOutView = 'YourAccountInfoOutView?storeId=8000',
	pageIsSecure = false,
	referringUrlPath = '',
	navClass = '',
	storeClass = 'rei',
	sectionClass = '',
	pageClass = '',
	contentClass = '';
	
returnUrl = currentUrl =  location.href;
//httpPath = httpHost = jscript_path = 'http://www.rei.com/';
//httpsPath = httpsHost = 'https://www.rei.com/';

httpPath = httpHost = jscript_path = 'http://'+ fullDomain +'/';
httpsPath = httpsHost = 'https://'+ fullDomain +'/';
if(subDomain=='www' || subDomain=='findout')
{
	subDomain = '';
}

function openWindow(surl,windowName,params) { 
// We have to double-encode some URL strings to account for an IE bug where
// IE un-encodes the URL before passing it to this function. This line
// causes the function to un-encode the URL if the URL was double-encoded
// but was (correctly) passed without decoding by a sane browser.
  if (surl.indexOf('%2520') != -1) {
    surl = unescape(surl);
  }    
  windowHandle = window.open(surl,windowName,params);
    
  if(window.focus) {
    windowHandle.focus();
  }
}

// add a name and value dynamically to the hard-coded URL before calling openWindow().

function modURLOpenWindow(the_name, the_value,surl,windowName,params) {
  if ( (the_value!=null) && (the_name!=null)) {
    if (surl.indexOf('#')>=0) {
      xa = surl.split("#");
      if (xa[0].indexOf('?')>=0) {
        surl = xa[0] + '&' + the_name + '=' + the_value + '#' + xa[1];
      } else {
        surl = xa[0] + '?' + the_name + '=' + the_value + '#' + xa[1];
      }
    } else {
      if (surl.indexOf('?')>=0) {
        surl = surl + '&' + the_name + '=' + the_value ;
      } else {
        surl = surl + '?' + the_name + '=' + the_value ;
      }
    }
  }
  openWindow(surl,windowName,params);
}

function urlencode(str) {
    return escape(str).replace(/\+/g,'%2B').replace(/%20/g, '+').replace(/\*/g, '%2A').replace(/\//g, '%2F').replace(/@/g, '%40');
}

function getCookieVal(offset) {
  var endstr = document.cookie.indexOf(";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function getCookie(name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal(j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

function getAffiliateID() {
  var PAT = getCookie("PAT");
  var ID = 0;
  if(PAT != null) {
    var i = PAT.indexOf("=", 0) + 1;
    var j = PAT.indexOf(":", i);
    ID = PAT.substring(i, j);
  }
  return ID;
}

function stripSpaces(string) {
  while('' + string.charAt(string.length-1) == ' ')
    string = string.substring(0, string.length-1);
  while('' + string.charAt(0) == ' ')
    string = string.substring(1, string.length);
  return string;
}

function clearCookie(name) {
  document.cookie = name + "=" + "" + ";PATH=/";
}

function emailCheck (emailStr) {

/* The following pattern is used to check if the entered e-mail address
   fits the user@domain format.  It also is used to separate the username
   from the domain. */

var emailPat=/^(.+)@(.+)$/

/* The following string represents the pattern for matching all special
   characters.  We don't want to allow special characters in the address.
   These characters include ( ) < > @ , ; : \ " . [ ]    */

var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"

/* The following string represents the range of characters allowed in a
   username or domainname.  It really states which chars aren't allowed. */

var validChars="\[^\\s" + specialChars + "\]"

/* The following pattern applies if the "user" is a quoted string (in
   which case, there are no rules about which characters are allowed
   and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
   is a legal e-mail address. */

var quotedUser="(\"[^\"]*\")"

/* The following pattern applies for domains that are IP addresses,
   rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
   e-mail address. NOTE: The square brackets are required. */

var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/

/* The following string represents an atom (basically a series of
   non-special characters.) */

var atom=validChars + '+'

/* The following string represents one word in the typical username.
   For example, in john.doe@somewhere.com, john and doe are words.
   Basically, a word is either an atom or quoted string. */
   
var word="(" + atom + "|" + quotedUser + ")"

// The following pattern describes the structure of the user

var userPat=new RegExp("^" + word + "(\\." + word + ")*$")

/* The following pattern describes the structure of a normal symbolic
   domain, as opposed to ipDomainPat, shown above. */
   
var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")

/* Strip leading spaces */

while(''+emailStr.charAt(0)==' ')
  emailStr=emailStr.substring(1,emailStr.length);

/* Strip trailing spaces */

while(''+emailStr.charAt(emailStr.length-1)==' ')
  emailStr=emailStr.substring(0,emailStr.length-1);

/* Finally, let's start trying to figure out if the supplied address is
   valid. */

   if(emailStr.length == 0) {
     var errStr="You must enter a valid email address"
     alert(errStr)
     return false
   }

/* Begin with the coarse pattern to simply break up user@domain into
   different pieces that are easy to analyze. */

var matchArray=emailStr.match(emailPat)
if (matchArray==null) {

  /* Too many/few @'s or something; basically, this address doesn't
     even fit the general mould of a valid e-mail address. */

  alert("The e-mail address must include a @ and a . to be valid. Please try again.")
  return false
}

var user=matchArray[1]
var domain=matchArray[2]

// See if "user" is valid

if (user.match(userPat)==null) {

    // user is not valid

    alert("The e-mail address must include a username without spaces or punctuation.")
    return false
}

/* if the e-mail address is at an IP address (as opposed to a symbolic
   host name) make sure the IP address is valid. */

var IPArray=domain.match(ipDomainPat)

if (IPArray!=null) {

    // this is an IP address

    for (var i=1;i<=4;i++) {
      if (IPArray[i]>255) {
          alert("Destination IP in email address is invalid!")
          return false
      }
    }
    return true
}

// Domain is symbolic name

var domainArray=domain.match(domainPat)
if (domainArray==null) {
  alert("The e-mail address must include an extension: (.com, .org, .ca, etc.)")
  return false
}

/* domain name seems valid, but now make sure that it ends in a
   three-letter word (like com, edu, gov) or a two-letter word,
   representing country (uk, nl), and that there's a hostname preceding
   the domain or country. */

/* Now we need to break up the domain to get a count of how many atoms
   it consists of. */
   
var atomPat=new RegExp(atom,"g")
var domArr=domain.match(atomPat)
var len=domArr.length
if (domArr[domArr.length-1].length<2 ||
    domArr[domArr.length-1].length>6) {
    
   // the address must end in a two letter or three letter word.

   alert("The e-mail address must include an extension: (.com, .org, .ca, etc.)")
   return false
}

// Make sure there's a host name preceding the domain.

if (len<2) {
   var errStr="The e-mail address must include an extension: (.com, .org, .ca, etc.)"
   alert(errStr)
   return false
}

// If we've gotten this far, everything's valid!

return true;
}

function printpage() {
  if (window.print != null) {
    window.print();
  } else {
    alert("Unfortunately, your browser does not support this shortcut.  Please select File and then Print from your browser's menu.");
  }
}

function setCookie(name, value) {
  document.cookie=name+"="+escape(value)+";PATH=/";
}

function DelCookie (name,path,domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path == null) ? "" : "; path=" + path) +
      ((domain == null) ? "" : "; domain=" + domain) +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function Set_Cookie( name, value, expires)
{
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );
    
    /*
    if the expires variable is set, make the correct expires time, the current script below will set it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if ( expires ){
        expires =  parseInt(expires, 10) * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );
    
    document.cookie = name + "=" + escape( value ) + ";path=/" +( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" );
}

// common_header processing (safe every page?)

var affiliateID = getAffiliateID();

if ((affiliateID == "9048" || affiliateID == "11917" || affiliateID == "14028" || affiliateID == "14172") && window.location.protocol == "https:") {
  if (top.location != self.location) {
    top.location = self.location;
  }
}

var numOfItems = getCookie("rei_cart");
var multipleItems = (numOfItems == 1) ? 's':'';
var loggedIn = getCookie( "loggedin" );

if (!numOfItems) numOfItems = 0;


var cartStatusText = '';

if (document.title != "REI.com: Shopping Basket") {
    if (numOfItems == 1) {
        cartStatusText = '(contains ' + numOfItems + ' item)';
    } else {
        cartStatusText = '(contains ' + numOfItems + ' items)';
    }
}

// PLOONEY ADDITION
// Read the two GR cookies if they exist.

function ReadGRCookie (CookieName) {
    var gr_id = 0;
    var gr_event_type = "";
    var gr_event_date = "";
    var gr_personal_name = "";
    var which_cookie = "";

    var cook_obj = new Object();

    which_cookie = CookieName;
    
    var CookieString = document.cookie;
    var CookieSet = CookieString.split (';');
    var SetSize = CookieSet.length;
    var CookiePieces
    var ReturnValue = "";
    var x = 0;

    for (x = 0; ((x < SetSize) && (ReturnValue == "")); x++) {

        CookiePieces = CookieSet[x].split ('=');

        if (CookiePieces[0].substring (0,1) == ' ') {
            CookiePieces[0] = CookiePieces[0].substring (1, CookiePieces[0].length);
        }

        if (CookiePieces[0] == CookieName) {
            ReturnValue = CookiePieces[1];
        }
    }

    if (ReturnValue != "") {
        CleanRetVal = unescape(ReturnValue);
        RetArray = CleanRetVal.split(":");
        gr_id = RetArray[0];
        gr_event_type = RetArray[1];
        gr_event_date = RetArray[2];
        gr_personal_name = RetArray[3];

        //if (gr_id) alert(gr_id);
        //if (gr_personal_name) alert(gr_personal_name);

        var alertStr = "ID: " + gr_id + "\n" +
        "Name: " + gr_personal_name + "\n" +
        "Type: " + gr_event_type + "\n" +
        "Date: " + gr_event_date;
        
        cook_obj.cook_name = which_cookie;
        cook_obj.id = gr_id;
        cook_obj.event_type = gr_event_type ;
        cook_obj.event_date = gr_event_date ;
        cook_obj.personal_name = gr_personal_name ;

        return cook_obj;
    } 
}

var setup_cook_obj = ReadGRCookie("GiftRegistrySetup");

// END PLOONEY ADDITION

//
// QueryString
//
// this is duplicated from querystring.js

function QueryString(key) {
	var value = null;
	for (var i=0;i<QueryString.keys.length;i++)
	{
		if (QueryString.keys[i]==key)
		{
			value = QueryString.values[i];
			break;
		}
	}
	return value;
}
QueryString.keys = new Array();
QueryString.values = new Array();

function QueryString_Parse() {
	var query = window.location.search.substring(1);
	var pairs = query.split("&");
	
	for (var i=0;i<pairs.length;i++)
	{
		var pos = pairs[i].indexOf('=');
		if (pos >= 0)
		{
			var argname = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos+1);
			QueryString.keys[QueryString.keys.length] = argname;
			QueryString.values[QueryString.values.length] = value;		
		}
	}

}

QueryString_Parse();
  
// Product page check for MID pages

function checkSKUSelect() {
	var error;
	$('.quantity').each(function(i){
		var j = i+1;
		var quantity = document.getElementsByName('quantity_'+j)[0].value;
		var selection = document.getElementById('dropDown_'+j).value;
		if(quantity==0 || selection=='LABEL'){
			$('#selectFlag_'+j).show();
			$('.selectFlagFooter').show();
			error = true;
		}
		else if(quantity!=0 && selection!='LABEL'){
			$('#selectFlag_'+j).hide();
		}
		else{
			$('#selectFlag_'+j).hide();
			$('.selectFlagFooter').hide();
			error = false;
		}
	});
	if(error==true){
		return false;
	}
	else{
		return true;
	}
	
}


// Product page validation for Collections pages
function checkSKUCollectionsSelect() {
	var error = new Array(), selectedItem = new Array();
	var oneItemSelected = false;
	var returnValue = false;
	
	$('.quantity').each(function(i){//loop through each item on page
		var j = i+1;
		var quantity = parseInt(document.getElementsByName('quantity_'+j)[0].value);
		var selection = document.getElementById('dropDown_'+j).value;
		var selected = document.getElementById('selectCollectionCheckBox-'+j).checked;
		if(selected==true){
			if(quantity==0 || selection=='LABEL'){//either input value is invalid
				$('#selectFlag_'+j).show();
				$('.selectFlagFooter').show();
				selectedItem[i] = false;
				error[i] = true;
			}			
			if(quantity>0 && selection!='LABEL'){//valid inputs on both input fields
				$('#selectFlag_'+j).hide();
				$('.selectFlagFooter').hide();
				selectedItem[i] = true;
				error[i] = false;
			}
		}
		else{
			$('#selectFlag_'+j).hide();
                    		selectedItem[i] = false;
			error[i] = false;
		}
	});
	
	var oneSelectedItemPassed = false;
	var errorFound = false;
	for(var i=0; i<error.length;i++){//check productError array for input errors
		if(error[i]==false){//submit document.additem[form] here
		        if(selectedItem[i] == true){
		            oneSelectedItemPassed = true;
		        }
 		}
 		else{//found an error in the array
            $('.selectFlagFooter').show();
            errorFound = true;
            break;
 		}
 	}
	if (errorFound) {
		returnValue = false;
	} else {
		if(oneSelectedItemPassed){//want to remove form fields for unSelected Items here 	
            for(j = 0; j<error.length; j++){
                itemPos = j+1;
                if(selectedItem[j] == false){
                    $('#dropDown_'  + itemPos).remove();
                    $('#quantity_'  + itemPos).remove();
                    $('#selectCollectionCheckBox_'  + itemPos).remove(); 
                }
            }
            returnValue = true;
		} else {
			$('.selectFlagFooter').show();
			returnValue = false;
		}
	}
	if (returnValue) {
		var f = $("#additem");
		$("input[name=URL]",f).val("/minicart?storeId=" + storeId);
		minicart.addToCart("/REIOrderItemUpdate?" + f.serialize());
	}
	return false;
}
function getCheckedItems() {
    var subTotal = 0, returnTotal = 0, elemPos = 0, itemsSelected = 0;
    var cBoxes = document.additem.selectCollectionCheckBox;
    for (ii = 0; ii < cBoxes.length; ii++) {
        subTotal = 0;        

        if (cBoxes[ii].checked) {
            elemPos = cBoxes[ii].id;
                elemPos = elemPos.substring(elemPos.lastIndexOf('-')+1, elemPos.length);
                
            itemsSelected++;
            if (parseInt($("#quantity_" + elemPos).val()) > 0) {
                subTotal = getSubTotal(elemPos, getItemPrice(elemPos));
            }
        }
        returnTotal += subTotal;
    }
    $("#merchSubTotal").html(returnTotal.toFixed(2));
    $("#itemsSelected").html(itemsSelected);

}
function getItemPrice(pricePos){
        var itemPrice = $(".pricePara span#price_" + pricePos).html();
        itemPrice = itemPrice.substring(itemPrice.indexOf('$')+1, itemPrice.length);
        return parseFloat(itemPrice);
}
function getSubTotal(pricePos, itemPrice){
        var qty = $('#quantity_'  + pricePos).val();
        var returnVal = itemPrice * parseInt(qty);
        return returnVal;
}


function escapeHTML (str) {
   var div = document.createElement('div');
   var text = document.createTextNode(str);
   div.appendChild(text);
   return div.innerHTML;
}


//Put onKeyPress="onReturnKeySubmit(this)" in any <form> element that you want to force to submit when the "return" or "enter" keys are pressed.
//NOTE: Textareas in forms should be able to accept "return" values without the form submitting. This function may need to be modified to support textareas.

function onReturnKeySubmit(theForm, theFn, thePar){
	

	if (window.event)
	{
    var node = (event.target) ? event.target : ((event.srcElement) ? event.srcElement : null);

 if (node.type && node.type != "textarea")
 {
 try
 { 
  if(event.keyCode == 13)
  {
  if (!theFn){
   theForm.submit();
  }
  else
  {
  theFn(thePar);
  }
  }
  
 }
 catch(err)
 {
  try
  {
   if(event.which == 13)
   
   if (!theFn){
  
  theForm.submit();
  }
  else
  {
  
  theFn(thePar);
  }
  
  
  }
  catch(err){}
  }
 }
}
}


// this code fixes the IE6 flicker bug 
try {
document.execCommand("BackgroundImageCache", false, true);
} catch(err) {}
// end IE6 flicker bug fix
	
/* create searchId cookie for SC event serialization */
function genSearchId(){        
	var newDate = new Date();
	   
	var myYear = newDate.getUTCFullYear();
	myYear = myYear.toString();
	myYear = myYear.substring(myYear.length-2,myYear.length);
	  
	var myMonth = newDate.getUTCMonth() +1;
	myMonth = myMonth < 10 ? ('0'+myMonth) : myMonth;
	  
	var myDay = newDate.getUTCDate();                      
	myDay = myDay < 10 ? ('0'+myDay) : myDay;                   
	              
	var myMinutes = newDate.getUTCHours()*60 + newDate.getUTCMinutes();                         
	var shortDate=myYear+myMonth+myDay;                        
	 
	var newValue = shortDate+myMinutes+rei.util.randomID(10);
	   
	Set_Cookie('searchId', newValue, 1);        	     
}
			
function checkSearchBoxValue(form){
	if(form){
	    var parentForm = form.headerQuery;
	    if (typeof parentForm != 'undefined' && parentForm.value=='') {
	        var url = '/emptysearch';
	        if (storeClass == 'outlet') {
	        	url = '/outlet/emptysearch';
	        }
	        window.location.replace(url);
	        return false;
	    } else {
	        /* create searchId cookie for SC event serialization */
	       genSearchId();
	    }
	}else{
	    return false;
	}
}

function getUserInfoCookie(dIngredient){
	var cookieData = getCookie('rei_user_info');
	
		if(cookieData == null){
			return null;
		}
		else if(cookieData.length > 1){
			cookieData = cookieData.split('~');
		}
		else if(cookieData.length == 1){
			
		}
		else{ return null; }
			
		switch(dIngredient){
			case 'userName':
				if(cookieData.length > 1){
					return cookieData[0].toString();
				}
				else{
					return cookieData.toString();
				}
				break;
				
			case 'memberType':
				if(cookieData.length > 1){
					return cookieData[1].toLowerCase();				
				}
				else{
					return null;
				}
				break;
			
			case 'zipCode':
				break;				
		}
		
}

function ReadGRCookie (CookieName) {

    var gr_id = 0;
    var gr_event_type = "";
    var gr_event_date = "";
    var gr_personal_name = "";
    var which_cookie = "";

    var cook_obj = new Object();

    which_cookie = CookieName;
    
    var CookieString = document.cookie;
    var CookieSet = CookieString.split (';');
    var SetSize = CookieSet.length;
    var CookiePieces
    var ReturnValue = "";
    var x = 0;

    for (x = 0; ((x < SetSize) && (ReturnValue == "")); x++) {

        CookiePieces = CookieSet[x].split ('=');

        if (CookiePieces[0].substring (0,1) == ' ') {
            CookiePieces[0] = CookiePieces[0].substring (1, CookiePieces[0].length);
        }

        if (CookiePieces[0] == CookieName) {
            ReturnValue = CookiePieces[1];
        }
    }

    if (ReturnValue != "") {
        CleanRetVal = unescape(ReturnValue);
        RetArray = CleanRetVal.split(":");
        gr_id = RetArray[0];
        gr_event_type = RetArray[1];
        gr_event_date = RetArray[2];
        gr_personal_name = RetArray[3];

        //if (gr_id) alert(gr_id);
        //if (gr_personal_name) alert(gr_personal_name);

        var alertStr = "ID: " + gr_id + "\n" +
        "Name: " + gr_personal_name + "\n" +
        "Type: " + gr_event_type + "\n" +
        "Date: " + gr_event_date;
        
        cook_obj.cook_name = which_cookie;
        cook_obj.id = gr_id;
        cook_obj.event_type = gr_event_type ;
        cook_obj.event_date = gr_event_date ;
        cook_obj.personal_name = gr_personal_name ;

        return cook_obj;
        
    } 
        

}
var mboxCopyright = "Copyright 1996-2012. Adobe Systems Incorporated. All rights reserved.";mboxUrlBuilder = function(a, b) { this.a = a; this.b = b; this.c = new Array(); this.d = function(e) { return e; }; this.f = null;};mboxUrlBuilder.prototype.addNewParameter = function (g, h) { this.c.push({name: g, value: h}); return this;};mboxUrlBuilder.prototype.addParameterIfAbsent = function (g, h) { if (h) { for (var i = 0; i < this.c.length; i++) { var j = this.c[i]; if (j.name === g) { return this; } } this.checkInvalidCharacters(g); return this.addNewParameter(g, h); }};mboxUrlBuilder.prototype.addParameter = function(g, h) { this.checkInvalidCharacters(g); for (var i = 0; i < this.c.length; i++) { var j = this.c[i]; if (j.name === g) { j.value = h; return this; } } return this.addNewParameter(g, h);};mboxUrlBuilder.prototype.addParameters = function(c) { if (!c) { return this; } for (var i = 0; i < c.length; i++) { var k = c[i].indexOf('='); if (k == -1 || k == 0) { continue; } this.addParameter(c[i].substring(0, k), c[i].substring(k + 1, c[i].length)); } return this;};mboxUrlBuilder.prototype.setServerType = function(l) { this.m = l;};mboxUrlBuilder.prototype.setBasePath = function(f) { this.f = f;};mboxUrlBuilder.prototype.setUrlProcessAction = function(n) { this.d = n;};mboxUrlBuilder.prototype.buildUrl = function() { var o = this.f ? this.f : '/m2/' + this.b + '/mbox/' + this.m; var p = document.location.protocol == 'file:' ? 'http:' : document.location.protocol; var e = p + "//" + this.a + o; var q = e.indexOf('?') != -1 ? '&' : '?'; for (var i = 0; i < this.c.length; i++) { var j = this.c[i]; e += q + encodeURIComponent(j.name) + '=' + encodeURIComponent(j.value); q = '&'; } return this.r(this.d(e));};mboxUrlBuilder.prototype.getParameters = function() { return this.c;};mboxUrlBuilder.prototype.setParameters = function(c) { this.c = c;};mboxUrlBuilder.prototype.clone = function() { var s = new mboxUrlBuilder(this.a, this.b); s.setServerType(this.m); s.setBasePath(this.f); s.setUrlProcessAction(this.d); for (var i = 0; i < this.c.length; i++) { s.addParameter(this.c[i].name, this.c[i].value); } return s;};mboxUrlBuilder.prototype.r = function(t) { return t.replace(/\"/g, '&quot;').replace(/>/g, '&gt;');}; mboxUrlBuilder.prototype.checkInvalidCharacters = function (g) { var u = new RegExp('(\'|")'); if (u.exec(g)) { throw "Parameter '" + g + "' contains invalid characters"; } };mboxStandardFetcher = function() { };mboxStandardFetcher.prototype.getType = function() { return 'standard';};mboxStandardFetcher.prototype.fetch = function(v) { v.setServerType(this.getType()); document.write('<' + 'scr' + 'ipt src="' + v.buildUrl() + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxStandardFetcher.prototype.cancel = function() { };mboxAjaxFetcher = function() { };mboxAjaxFetcher.prototype.getType = function() { return 'ajax';};mboxAjaxFetcher.prototype.fetch = function(v) { v.setServerType(this.getType()); var e = v.buildUrl(); this.w = document.createElement('script'); this.w.src = e; document.body.appendChild(this.w);};mboxAjaxFetcher.prototype.cancel = function() { };mboxMap = function() { this.x = new Object(); this.y = new Array();};mboxMap.prototype.put = function(z, h) { if (!this.x[z]) { this.y[this.y.length] = z; } this.x[z] = h;};mboxMap.prototype.get = function(z) { return this.x[z];};mboxMap.prototype.remove = function(z) { this.x[z] = undefined;};mboxMap.prototype.each = function(n) { for (var i = 0; i < this.y.length; i++ ) { var z = this.y[i]; var h = this.x[z]; if (h) { var A = n(z, h); if (A === false) { break; } } }};mboxFactory = function(B, b, C) { this.D = false; this.B = B; this.C = C; this.E = new mboxList(); mboxFactories.put(C, this); this.F = typeof document.createElement('div').replaceChild != 'undefined' && (function() { return true; })() && typeof document.getElementById != 'undefined' && typeof (window.attachEvent || document.addEventListener || window.addEventListener) != 'undefined' && typeof encodeURIComponent != 'undefined'; this.G = this.F && mboxGetPageParameter('mboxDisable') == null; var H = C == 'default'; this.I = new mboxCookieManager( 'mbox' + (H ? '' : ('-' + C)), (function() { return mboxCookiePageDomain(); })()); this.G = this.G && this.I.isEnabled() && (this.I.getCookie('disable') == null); if (this.isAdmin()) { this.enable(); } this.J(); this.K = mboxGenerateId(); this.L = mboxScreenHeight(); this.M = mboxScreenWidth(); this.N = mboxBrowserWidth(); this.O = mboxBrowserHeight(); this.P = mboxScreenColorDepth(); this.Q = mboxBrowserTimeOffset(); this.R = new mboxSession(this.K, 'mboxSession', 'session', 31 * 60, this.I); this.S = new mboxPC('PC', 7776000, this.I); this.v = new mboxUrlBuilder(B, b); this.T(this.v, H); this.U = new Date().getTime(); this.V = this.U; var W = this; this.addOnLoad(function() { W.V = new Date().getTime(); }); if (this.F) { this.addOnLoad(function() { W.D = true; W.getMboxes().each(function(X) { X.setFetcher(new mboxAjaxFetcher()); X.finalize(); }); }); if (this.G) { this.limitTraffic(100, 10368000); this.Y(); this.Z = new mboxSignaler(function(_, c) { return W.create(_, c); }, this.I); } }};mboxFactory.prototype.isEnabled = function() { return this.G;};mboxFactory.prototype.getDisableReason = function() { return this.I.getCookie('disable');};mboxFactory.prototype.isSupported = function() { return this.F;};mboxFactory.prototype.disable = function(ab, bb) { if (typeof ab == 'undefined') { ab = 60 * 60; } if (typeof bb == 'undefined') { bb = 'unspecified'; } if (!this.isAdmin()) { this.G = false; this.I.setCookie('disable', bb, ab); }};mboxFactory.prototype.enable = function() { this.G = true; this.I.deleteCookie('disable');};mboxFactory.prototype.isAdmin = function() { return document.location.href.indexOf('mboxEnv') != -1;};mboxFactory.prototype.limitTraffic = function(cb, ab) {};mboxFactory.prototype.addOnLoad = function(db) { if (this.isDomLoaded()) { db(); } else { var eb = false; var fb = function() { if (eb) { return; } eb = true; db(); }; this.gb.push(fb); if (this.isDomLoaded() && !eb) { fb(); } }};mboxFactory.prototype.getEllapsedTime = function() { return this.V - this.U;};mboxFactory.prototype.getEllapsedTimeUntil = function(hb) { return hb - this.U;};mboxFactory.prototype.getMboxes = function() { return this.E;};mboxFactory.prototype.get = function(_, ib) { return this.E.get(_).getById(ib || 0);};mboxFactory.prototype.update = function(_, c) { if (!this.isEnabled()) { return; } if (!this.isDomLoaded()) { var W = this; this.addOnLoad(function() { W.update(_, c); }); return; } if (this.E.get(_).length() == 0) { throw "Mbox " + _ + " is not defined"; } this.E.get(_).each(function(X) { X.getUrlBuilder() .addParameter('mboxPage', mboxGenerateId()); X.load(c); });};mboxFactory.prototype.setVisitorIdParameters = function(e) { var namespace = 'reimcspb'; if (typeof Visitor == 'undefined' || typeof Visitor.ID_TYPE_AUTHENTICATED == 'undefined' || namespace.length == 0) { return; } var anonymousVisitorIdName = 'mboxMCVID'; var globalVisitorIdName = 'mboxMCGVID'; var customVisitorIdName = 'mboxMCCUSTID'; var globalLocationHintName = 'mboxMCGLH'; var visitor = Visitor.getInstance(namespace); if (visitor.isAllowed()) { var globalVisitorID = visitor.getGlobalVisitorID(function (callbackGlobalVisitorID) { e.addParameterIfAbsent(globalVisitorIdName, callbackGlobalVisitorID); if (callbackGlobalVisitorID) { e.addParameterIfAbsent(globalLocationHintName, visitor.getGlobalLocationHint()); } }); e.addParameterIfAbsent(globalVisitorIdName, globalVisitorID); var anonymousVisitorId = visitor.getAnonymousVisitorID(function (callbackAnonymousVisitorID) { e.addParameterIfAbsent(anonymousVisitorIdName, callbackAnonymousVisitorID); }); e.addParameterIfAbsent(anonymousVisitorIdName, anonymousVisitorId); e.addParameterIfAbsent(customVisitorIdName, visitor.getAuthenticatedVisitorID()); if (globalVisitorID) { e.addParameterIfAbsent(globalLocationHintName, visitor.getGlobalLocationHint()); } }};mboxFactory.prototype.create = function( _, c, jb) { if (!this.isSupported()) { return null; } var e = this.v.clone(); e.addParameter('mboxCount', this.E.length() + 1); e.addParameters(c); this.setVisitorIdParameters(e); var ib = this.E.get(_).length(); var kb = this.C + '-' + _ + '-' + ib; var lb; if (jb) { lb = new mboxLocatorNode(jb); } else { if (this.D) { throw 'The page has already been loaded, can\'t write marker'; } lb = new mboxLocatorDefault(kb); } try { var W = this; var mb = 'mboxImported-' + kb; var X = new mbox(_, ib, e, lb, mb); if (this.G) { X.setFetcher( this.D ? new mboxAjaxFetcher() : new mboxStandardFetcher()); } X.setOnError(function(nb, l) { X.setMessage(nb); X.activate(); if (!X.isActivated()) { W.disable(60 * 60, nb); window.location.reload(false); } }); this.E.add(X); } catch (ob) { this.disable(); throw 'Failed creating mbox "' + _ + '", the error was: ' + ob; } var pb = new Date(); e.addParameter('mboxTime', pb.getTime() - (pb.getTimezoneOffset() * 60000)); return X;};mboxFactory.prototype.getCookieManager = function() { return this.I;};mboxFactory.prototype.getPageId = function() { return this.K;};mboxFactory.prototype.getPCId = function() { return this.S;};mboxFactory.prototype.getSessionId = function() { return this.R;};mboxFactory.prototype.getSignaler = function() { return this.Z;};mboxFactory.prototype.getUrlBuilder = function() { return this.v;};mboxFactory.prototype.T = function(e, H) { e.addParameter('mboxHost', document.location.hostname) .addParameter('mboxSession', this.R.getId()); if (!H) { e.addParameter('mboxFactoryId', this.C); } if (this.S.getId() != null) { e.addParameter('mboxPC', this.S.getId()); } e.addParameter('mboxPage', this.K); e.addParameter('screenHeight', this.L); e.addParameter('screenWidth', this.M); e.addParameter('browserWidth', this.N); e.addParameter('browserHeight', this.O); e.addParameter('browserTimeOffset', this.Q); e.addParameter('colorDepth', this.P); e.setUrlProcessAction(function(e) { e += '&mboxURL=' + encodeURIComponent(document.location); var qb = encodeURIComponent(document.referrer); if (e.length + qb.length < 2000) { e += '&mboxReferrer=' + qb; } e += '&mboxVersion=' + mboxVersion; return e; });};mboxFactory.prototype.rb = function() { return "";};mboxFactory.prototype.Y = function() { document.write('<style>.' + 'mboxDefault' + ' { visibility:hidden; }</style>');};mboxFactory.prototype.isDomLoaded = function() { return this.D;};mboxFactory.prototype.J = function() { if (this.gb != null) { return; } this.gb = new Array(); var W = this; (function() { var sb = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange"; var tb = false; var ub = function() { if (tb) { return; } tb = true; for (var i = 0; i < W.gb.length; ++i) { W.gb[i](); } }; if (document.addEventListener) { document.addEventListener(sb, function() { document.removeEventListener(sb, arguments.callee, false); ub(); }, false); window.addEventListener("load", function(){ document.removeEventListener("load", arguments.callee, false); ub(); }, false); } else if (document.attachEvent) { if (self !== self.top) { document.attachEvent(sb, function() { if (document.readyState === 'complete') { document.detachEvent(sb, arguments.callee); ub(); } }); } else { var vb = function() { try { document.documentElement.doScroll('left'); ub(); } catch (wb) { setTimeout(vb, 13); } }; vb(); } } if (document.readyState === "complete") { ub(); } })();};mboxSignaler = function(xb, I) { this.I = I; var yb = I.getCookieNames('signal-'); for (var i = 0; i < yb.length; i++) { var zb = yb[i]; var Ab = I.getCookie(zb).split('&'); var X = xb(Ab[0], Ab); X.load(); I.deleteCookie(zb); }};mboxSignaler.prototype.signal = function(Bb, _ ) { this.I.setCookie('signal-' + Bb, mboxShiftArray(arguments).join('&'), 45 * 60);};mboxList = function() { this.E = new Array();};mboxList.prototype.add = function(X) { if (X != null) { this.E[this.E.length] = X; }};mboxList.prototype.get = function(_) { var A = new mboxList(); for (var i = 0; i < this.E.length; i++) { var X = this.E[i]; if (X.getName() == _) { A.add(X); } } return A;};mboxList.prototype.getById = function(Cb) { return this.E[Cb];};mboxList.prototype.length = function() { return this.E.length;};mboxList.prototype.each = function(n) { if (typeof n != 'function') { throw 'Action must be a function, was: ' + typeof(n); } for (var i = 0; i < this.E.length; i++) { n(this.E[i]); }};mboxLocatorDefault = function(g) { this.g = 'mboxMarker-' + g; document.write('<div id="' + this.g + '" style="visibility:hidden;display:none">&nbsp;</div>');};mboxLocatorDefault.prototype.locate = function() { var Db = document.getElementById(this.g); while (Db != null) { if (Db.nodeType == 1) { if (Db.className == 'mboxDefault') { return Db; } } Db = Db.previousSibling; } return null;};mboxLocatorDefault.prototype.force = function() { var Eb = document.createElement('div'); Eb.className = 'mboxDefault'; var Fb = document.getElementById(this.g); Fb.parentNode.insertBefore(Eb, Fb); return Eb;};mboxLocatorNode = function(Gb) { this.Db = Gb;};mboxLocatorNode.prototype.locate = function() { return typeof this.Db == 'string' ? document.getElementById(this.Db) : this.Db;};mboxLocatorNode.prototype.force = function() { return null;};mboxCreate = function(_ ) { var X = mboxFactoryDefault.create( _, mboxShiftArray(arguments)); if (X) { X.load(); } return X;};mboxDefine = function(jb, _ ) { var X = mboxFactoryDefault.create(_, mboxShiftArray(mboxShiftArray(arguments)), jb); return X;};mboxUpdate = function(_ ) { mboxFactoryDefault.update(_, mboxShiftArray(arguments));};mbox = function(g, Hb, v, Ib, mb) { this.Jb = null; this.Kb = 0; this.lb = Ib; this.mb = mb; this.Lb = null; this.Mb = new mboxOfferContent(); this.Eb = null; this.v = v; this.message = ''; this.Nb = new Object(); this.Ob = 0; this.Hb = Hb; this.g = g; this.Pb(); v.addParameter('mbox', g) .addParameter('mboxId', Hb); this.Qb = function() {}; this.Rb = function() {}; this.Sb = null;};mbox.prototype.getId = function() { return this.Hb;};mbox.prototype.Pb = function() { if (this.g.length > 250) { throw "Mbox Name " + this.g + " exceeds max length of " + "250 characters."; } else if (this.g.match(/^\s+|\s+$/g)) { throw "Mbox Name " + this.g + " has leading/trailing whitespace(s)."; }};mbox.prototype.getName = function() { return this.g;};mbox.prototype.getParameters = function() { var c = this.v.getParameters(); var A = new Array(); for (var i = 0; i < c.length; i++) { if (c[i].name.indexOf('mbox') != 0) { A[A.length] = c[i].name + '=' + c[i].value; } } return A;};mbox.prototype.setOnLoad = function(n) { this.Rb = n; return this;};mbox.prototype.setMessage = function(nb) { this.message = nb; return this;};mbox.prototype.setOnError = function(Qb) { this.Qb = Qb; return this;};mbox.prototype.setFetcher = function(Tb) { if (this.Lb) { this.Lb.cancel(); } this.Lb = Tb; return this;};mbox.prototype.getFetcher = function() { return this.Lb;};mbox.prototype.load = function(c) { if (this.Lb == null) { return this; } this.setEventTime("load.start"); this.cancelTimeout(); this.Kb = 0; var v = (c && c.length > 0) ? this.v.clone().addParameters(c) : this.v; this.Lb.fetch(v); var W = this; this.Ub = setTimeout(function() { W.Qb('browser timeout', W.Lb.getType()); }, 15000); this.setEventTime("load.end"); return this;};mbox.prototype.loaded = function() { this.cancelTimeout(); if (!this.activate()) { var W = this; setTimeout(function() { W.loaded(); }, 100); }};mbox.prototype.activate = function() { if (this.Kb) { return this.Kb; } this.setEventTime('activate' + ++this.Ob + '.start'); if (this.show()) { this.cancelTimeout(); this.Kb = 1; } this.setEventTime('activate' + this.Ob + '.end'); return this.Kb;};mbox.prototype.isActivated = function() { return this.Kb;};mbox.prototype.setOffer = function(Mb) { if (Mb && Mb.show && Mb.setOnLoad) { this.Mb = Mb; } else { throw 'Invalid offer'; } return this;};mbox.prototype.getOffer = function() { return this.Mb;};mbox.prototype.show = function() { this.setEventTime('show.start'); var A = this.Mb.show(this); this.setEventTime(A == 1 ? "show.end.ok" : "show.end"); return A;};mbox.prototype.showContent = function(Vb) { if (Vb == null) { return 0; } if (this.Eb == null || !this.Eb.parentNode) { this.Eb = this.getDefaultDiv(); if (this.Eb == null) { return 0; } } if (this.Eb != Vb) { this.Wb(this.Eb); this.Eb.parentNode.replaceChild(Vb, this.Eb); this.Eb = Vb; } this.Xb(Vb); this.Rb(); return 1;};mbox.prototype.hide = function() { this.setEventTime('hide.start'); var A = this.showContent(this.getDefaultDiv()); this.setEventTime(A == 1 ? 'hide.end.ok' : 'hide.end.fail'); return A;};mbox.prototype.finalize = function() { this.setEventTime('finalize.start'); this.cancelTimeout(); if (this.getDefaultDiv() == null) { if (this.lb.force() != null) { this.setMessage('No default content, an empty one has been added'); } else { this.setMessage('Unable to locate mbox'); } } if (!this.activate()) { this.hide(); this.setEventTime('finalize.end.hide'); } this.setEventTime('finalize.end.ok');};mbox.prototype.cancelTimeout = function() { if (this.Ub) { clearTimeout(this.Ub); } if (this.Lb != null) { this.Lb.cancel(); }};mbox.prototype.getDiv = function() { return this.Eb;};mbox.prototype.getDefaultDiv = function() { if (this.Sb == null) { this.Sb = this.lb.locate(); } return this.Sb;};mbox.prototype.setEventTime = function(Yb) { this.Nb[Yb] = (new Date()).getTime();};mbox.prototype.getEventTimes = function() { return this.Nb;};mbox.prototype.getImportName = function() { return this.mb;};mbox.prototype.getURL = function() { return this.v.buildUrl();};mbox.prototype.getUrlBuilder = function() { return this.v;};mbox.prototype.Zb = function(Eb) { return Eb.style.display != 'none';};mbox.prototype.Xb = function(Eb) { this._b(Eb, true);};mbox.prototype.Wb = function(Eb) { this._b(Eb, false);};mbox.prototype._b = function(Eb, ac) { Eb.style.visibility = ac ? "visible" : "hidden"; Eb.style.display = ac ? "block" : "none";};mboxOfferContent = function() { this.Rb = function() {};};mboxOfferContent.prototype.show = function(X) { var A = X.showContent(document.getElementById(X.getImportName())); if (A == 1) { this.Rb(); } return A;};mboxOfferContent.prototype.setOnLoad = function(Rb) { this.Rb = Rb;};mboxOfferAjax = function(Vb) { this.Vb = Vb; this.Rb = function() {};};mboxOfferAjax.prototype.setOnLoad = function(Rb) { this.Rb = Rb;};mboxOfferAjax.prototype.show = function(X) { var bc = document.createElement('div'); bc.id = X.getImportName(); bc.innerHTML = this.Vb; var A = X.showContent(bc); if (A == 1) { this.Rb(); } return A;};mboxOfferDefault = function() { this.Rb = function() {};};mboxOfferDefault.prototype.setOnLoad = function(Rb) { this.Rb = Rb;};mboxOfferDefault.prototype.show = function(X) { var A = X.hide(); if (A == 1) { this.Rb(); } return A;};mboxCookieManager = function mboxCookieManager(g, cc) { this.g = g; this.cc = cc == '' || cc.indexOf('.') == -1 ? '' : '; domain=' + cc; this.dc = new mboxMap(); this.loadCookies();};mboxCookieManager.prototype.isEnabled = function() { this.setCookie('check', 'true', 60); this.loadCookies(); return this.getCookie('check') == 'true';};mboxCookieManager.prototype.setCookie = function(g, h, ab) { if (typeof g != 'undefined' && typeof h != 'undefined' && typeof ab != 'undefined') { var ec = new Object(); ec.name = g; ec.value = escape(h); ec.expireOn = Math.ceil(ab + new Date().getTime() / 1000); this.dc.put(g, ec); this.saveCookies(); }};mboxCookieManager.prototype.getCookie = function(g) { var ec = this.dc.get(g); return ec ? unescape(ec.value) : null;};mboxCookieManager.prototype.deleteCookie = function(g) { this.dc.remove(g); this.saveCookies();};mboxCookieManager.prototype.getCookieNames = function(fc) { var gc = new Array(); this.dc.each(function(g, ec) { if (g.indexOf(fc) == 0) { gc[gc.length] = g; } }); return gc;};mboxCookieManager.prototype.saveCookies = function() { var hc = false; var ic = 'disable'; var jc = new Array(); var kc = 0; this.dc.each(function(g, ec) { if(!hc || g === ic) { jc[jc.length] = g + '#' + ec.value + '#' + ec.expireOn; if (kc < ec.expireOn) { kc = ec.expireOn; } } }); var lc = new Date(kc * 1000); document.cookie = this.g + '=' + jc.join('|') + '; expires=' + lc.toGMTString() + '; path=/' + this.cc;};mboxCookieManager.prototype.loadCookies = function() { this.dc = new mboxMap(); var mc = document.cookie.indexOf(this.g + '='); if (mc != -1) { var nc = document.cookie.indexOf(';', mc); if (nc == -1) { nc = document.cookie.indexOf(',', mc); if (nc == -1) { nc = document.cookie.length; } } var oc = document.cookie.substring( mc + this.g.length + 1, nc).split('|'); var pc = Math.ceil(new Date().getTime() / 1000); for (var i = 0; i < oc.length; i++) { var ec = oc[i].split('#'); if (pc <= ec[2]) { var qc = new Object(); qc.name = ec[0]; qc.value = ec[1]; qc.expireOn = ec[2]; this.dc.put(qc.name, qc); } } }};mboxSession = function(rc, sc, zb, tc, I) { this.sc = sc; this.zb = zb; this.tc = tc; this.I = I; this.uc = false; this.Hb = typeof mboxForceSessionId != 'undefined' ? mboxForceSessionId : mboxGetPageParameter(this.sc); if (this.Hb == null || this.Hb.length == 0) { this.Hb = I.getCookie(zb); if (this.Hb == null || this.Hb.length == 0) { this.Hb = rc; this.uc = true; } } I.setCookie(zb, this.Hb, tc);};mboxSession.prototype.getId = function() { return this.Hb;};mboxSession.prototype.forceId = function(vc) { this.Hb = vc; this.I.setCookie(this.zb, this.Hb, this.tc);};mboxPC = function(zb, tc, I) { this.zb = zb; this.tc = tc; this.I = I; this.Hb = typeof mboxForcePCId != 'undefined' ? mboxForcePCId : I.getCookie(zb); if (this.Hb != null) { I.setCookie(zb, this.Hb, tc); }};mboxPC.prototype.getId = function() { return this.Hb;};mboxPC.prototype.forceId = function(vc) { if (this.Hb != vc) { this.Hb = vc; this.I.setCookie(this.zb, this.Hb, this.tc); return true; } return false;};mboxGetPageParameter = function(g) { var A = null; var wc = new RegExp(g + "=([^\&]*)"); var xc = wc.exec(document.location); if (xc != null && xc.length >= 2) { A = xc[1]; } return A;};mboxSetCookie = function(g, h, ab) { return mboxFactoryDefault.getCookieManager().setCookie(g, h, ab);};mboxGetCookie = function(g) { return mboxFactoryDefault.getCookieManager().getCookie(g);};mboxCookiePageDomain = function() { var cc = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1]; var yc = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/; if (!yc.exec(cc)) { var zc = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(cc); if (zc) { cc = zc[0]; } } return cc ? cc: "";};mboxShiftArray = function(Ac) { var A = new Array(); for (var i = 1; i < Ac.length; i++) { A[A.length] = Ac[i]; } return A;};mboxGenerateId = function() { return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);};mboxScreenHeight = function() { return screen.height;};mboxScreenWidth = function() { return screen.width;};mboxBrowserWidth = function() { return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;};mboxBrowserHeight = function() { return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;};mboxBrowserTimeOffset = function() { return -new Date().getTimezoneOffset();};mboxScreenColorDepth = function() { return screen.pixelDepth;};if (typeof mboxVersion == 'undefined') { var mboxVersion = 43; var mboxFactories = new mboxMap(); var mboxFactoryDefault = new mboxFactory('recreationalequipmen.tt.omtrdc.net', 'recreationalequipmen', 'default');};if (mboxGetPageParameter("mboxDebug") != null || mboxFactoryDefault.getCookieManager() .getCookie("debug") != null) { setTimeout(function() { if (typeof mboxDebugLoaded == 'undefined') { alert('Could not load the remote debug.\nPlease check your connection' + ' to Test&amp;Target servers'); } }, 60*60); document.write('<' + 'scr' + 'ipt language="Javascript1.2" src=' + '"http://admin16.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=recreationalequipmen.tt.omtrdc.net' + '&clientCode=recreationalequipmen"><' + '\/scr' + 'ipt>');};mboxScPluginFetcher = function(b, Bc) { this.b = b; this.Bc = Bc;};mboxScPluginFetcher.prototype.Cc = function(v) { v.setBasePath('/m2/' + this.b + '/sc/standard'); this.Dc(v); var e = v.buildUrl(); e += '&scPluginVersion=1'; return e;};mboxScPluginFetcher.prototype.Dc = function(v) { var Ec = [ "dynamicVariablePrefix","visitorID","vmk","ppu","charSet", "visitorNamespace","cookieDomainPeriods","cookieLifetime","pageName", "currencyCode","variableProvider","channel","server", "pageType","transactionID","purchaseID","campaign","state","zip","events", "products","linkName","linkType","resolution","colorDepth", "javascriptVersion","javaEnabled","cookiesEnabled","browserWidth", "browserHeight","connectionType","homepage","pe","pev1","pev2","pev3", "visitorSampling","visitorSamplingGroup","dynamicAccountSelection", "dynamicAccountList","dynamicAccountMatch","trackDownloadLinks", "trackExternalLinks","trackInlineStats","linkLeaveQueryString", "linkDownloadFileTypes","linkExternalFilters","linkInternalFilters", "linkTrackVars","linkTrackEvents","linkNames","lnk","eo" ]; for (var i = 0; i < Ec.length; i++) { this.Fc(Ec[i], v); } for (var i = 1; i <= 75; i++) { this.Fc('prop' + i, v); this.Fc('eVar' + i, v); this.Fc('hier' + i, v); }};mboxScPluginFetcher.prototype.Fc = function(g, v) { var h = this.Bc[g]; if (typeof(h) === 'undefined' || h === null || h === '') { return; } v.addParameter(g, h);};mboxScPluginFetcher.prototype.cancel = function() { };mboxScPluginFetcher.prototype.fetch = function(v) { v.setServerType(this.getType()); var e = this.Cc(v); this.w = document.createElement('script'); this.w.src = e; document.body.appendChild(this.w);};mboxScPluginFetcher.prototype.getType = function() { return 'ajax';};function mboxLoadSCPlugin(Bc) { if (!Bc) { return null; } Bc.m_tt = function(Bc) { var Gc = Bc.m_i('tt'); Gc.G = true; Gc.b = 'recreationalequipmen'; Gc['_t'] = function() { if (!this.isEnabled()) { return; } var X = this.Ic(); if (X) { var Tb = new mboxScPluginFetcher(this.b, this.s); X.setFetcher(Tb); X.load(); } }; Gc.isEnabled = function() { return this.G && mboxFactoryDefault.isEnabled(); }; Gc.Ic = function() { var _ = this.Jc(); var Eb = document.createElement('DIV'); return mboxFactoryDefault.create(_, new Array(), Eb); }; Gc.Jc = function() { var Kc = this.s.events && this.s.events.indexOf('purchase') != -1; return 'SiteCatalyst: ' + (Kc ? 'purchase' : 'event'); }; }; return Bc.loadModule('tt');};mboxVizTargetUrl = function(_ ) { if (!mboxFactoryDefault.isEnabled()) { return; } var v = mboxFactoryDefault.getUrlBuilder().clone(); v.setBasePath('/m2/' + 'recreationalequipmen' + '/viztarget'); v.addParameter('mbox', _); v.addParameter('mboxId', 0); v.addParameter('mboxCount', mboxFactoryDefault.getMboxes().length() + 1); var pb = new Date(); v.addParameter('mboxTime', pb.getTime() - (pb.getTimezoneOffset() * 60000)); v.addParameter('mboxPage', mboxGenerateId()); var c = mboxShiftArray(arguments); if (c && c.length > 0) { v.addParameters(c); } return v.buildUrl();};








/* $Id$ */

/* All Dual licensed under the MIT and GPL licenses: http://www.opensource.org/licenses/mit-license.php, http://www.gnu.org/licenses/gpl.html */

/*Superfish v1.3.1  - jQuery menu widget Copyright (c) 2007 Joel Birch */
/* Custom settings used for delay and speed. REI  5/28/08  delay: 500, speed: 400*/
/* Patched by REI 6/20/2008 */


//SHOP REI: Clearance tab hack

(function($){
    $.fn.superfish = function(o){
		var $sf = this,
			defaults = {
			hoverClass	: 'sfHover',
			pathClass	: 'overideThisToUse',
			delay		: 500,
			animation	: {opacity:'show'},    
			speed		: 400    
		},
		over = function(){
				clearTimeout(this.sfTimer);
				clearTimeout($sf[0].sfTimer);
				$(this)
				.showSuperfishUl()
				.siblings()
				.hideSuperfishUl();
				
				//Add bottom border; count of the number of ul and apply the correct width to the container div: catitemsWrapper
				var catitemWrapper = $(this).children('.catitemsWrapper');
				var numUl = $(".sfHover").children('.catitemsWrapper').children('ul').length;
				$(catitemWrapper).addClass("Column"+ numUl);
				$(catitemWrapper).addClass("catitemsWrapperBorder");
								
				//Get width of container div: catitemsWrapper
				var widthcatitemsWrapper = $(catitemWrapper).width();
				
				//Get width of #hunt3
				var hunt3Width = $("ul#hunt3").width();
								
				//check to see if .sfHover exist; if so get li sfHover position
				if ($('.sfHover').length) {
					var curLiPosition = $(".sfHover").position().left;
				}

				//Calculate the amount of overhang of the catitemWrapper
				var offsetWrapper =  hunt3Width - (curLiPosition + widthcatitemsWrapper - 9);
								
				//If the dropdown menu + location is greater than the overall width of the page...move the catitemWrapper to the left (pixel difference).
				if ((curLiPosition + widthcatitemsWrapper) > hunt3Width) {
					$(catitemWrapper).css('left', offsetWrapper);
				}
				
			},
		out = function(){
				var $$ = $(this);
				if ( !$$.is('.'+o.bcClass) ) {
					this.sfTimer=setTimeout(function(){
						$$.hideSuperfishUl();
						if (!$('.'+o.hoverClass,$sf).length) { 
							over.call($currents.hideSuperfishUl());
						}
					},o.delay);
				}
			};
		$.fn.extend({
			hideSuperfishUl : function(){
				return this
					.removeClass(o.hoverClass)
					.find('div ul:visible')
						.hide()
					.end();
			},
			showSuperfishUl : function(){
				//remove bottom border
				$('.catitemsWrapper').removeClass("catitemsWrapperBorder");
				return this
					.addClass(o.hoverClass)
					.find('>div ul:hidden')
						.animate(o.animation,o.speed)
					.end();
			},
			applySuperfishHovers : function(){
				return this[($.fn.hoverIntent) ? 'hoverIntent' : 'hover'](over,out);
			}
		});
		o = $.extend({bcClass:'sfbreadcrumb'},defaults,o || {});
		var $currents = $('li:has(div ul)',this).filter('.'+o.pathClass);
		if ($currents.length) {
			$currents.each(function(){
				$(this).removeClass(o.pathClass).addClass(o.hoverClass+' '+o.bcClass);
			});
		}
		var $sfHovAr=$('li:has(div ul)',this)
			.applySuperfishHovers(over,out)
/* commented out .find('a').each(superfishFocusBlur) for performance - glowney & tguffee 6/08 */
/*			.find('a')
			.each(superfishFocusBlur)
*/			.end()
			.not('.'+o.bcClass)
				.hideSuperfishUl()
			.end();
		$(window).unload(function(){
			$sfHovAr.unbind('mouseover').unbind('mouseout');
		});
		return this.addClass('superfish').blur(function(){
			out.call(this);
		});
	};

function superfishFocusBlur(){
			var $a = $(this), $li = $a.parents('li');
			$a.focus(superfishOverCall).blur(superfishRemoveClass);
}
function superfishOverCall(){
			over.call($li);
			return false;
}		
function superfishRemoveClass(){
			$li.removeClass(o.hoverClass);
}	

/* Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * @name bgiframe
 * @type jQuery
 * @cat Plugins/bgiframe
 *
 * Version 2.1.1
 * Custom settings used for $.extend. REI  5/28/08 top:'-1px',left:'0px',width:'180px' 
 */
$.fn.bgIframe = $.fn.bgiframe = function (s) {
    if ($.browser.msie6) {
        s = $.extend({
            top: '-1px', left: '0px', width: '180px', height: 'auto', opacity: true, src: 'javascript:false;'
        },
        s || {
        });
        var prop = function (n) {
            return n && n.constructor == Number? n + 'px': n;
        },
        html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' + 'style="display:block;position:absolute;z-index:-1;' +(s.opacity !== false? 'filter:Alpha(Opacity=\'0\');': '') + 'top:' +(s.top == 'auto'? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')': prop(s.top)) + ';' + 'left:' +(s.left == 'auto'? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')': prop(s.left)) + ';' + 'width:' +(s.width == 'auto'? 'expression(this.parentNode.offsetWidth+\'px\')': prop(s.width)) + ';' + 'height:' +(s.height == 'auto'? 'expression(this.parentNode.offsetHeight+\'px\')': prop(s.height)) + ';' + '"/>';
        return this.each(function () {
            if ($('> iframe.bgiframe', this).length == 0) {
            this.insertBefore(document.createElement(html), this.firstChild);
            }
        });
    }
    return this;
};

/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
* Custom settings used for sensitivity setting. REI  5/28/08 sensitivity:6 
*/
$.fn.hoverIntent=function(f,g){var cfg={sensitivity:6,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};

})(jQuery);

// init dropDown from rei.js

/* $Id$ */

/* OnlineOpinion (S3tS v3.1.1) 
Multiple links on same page - support added 10-16-2009 - jvernon
*/

/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */

var custom_var,
_sp = '%3A\\/\\/',
_rp = '%3A//',
_poE = 0.0,
_poX = 0.0,
_sH = screen.height,
_d = document,
_w = window,
_ht = escape(_w.location.href),
_hr = _d.referrer,
_tm = (new Date()).getTime(),
_kp = 0,
_sW = screen.width;
function _fC(_u) {
    _aT = _sp + ',\\/,\\.,-,_,' + _rp + ',%2F,%2E,%2D,%5F';
    _aA = _aT.split(',');
    for (i = 0; i < 5; i++) {
        eval('_u=_u.replace(/' + _aA[i] + '/g,_aA[i+5])')
    }
    return _u
};
function O_LC(new_domain) {
    _domain = _ht.replace('https%3A//', '').replace('http%3A//', '');
    if (typeof new_domain == 'undefined' || new_domain == '') {
        _sp = '%3A\\/\\/';
        _rp = '%3A//'
    } else {
        _sp = '%3A\\/\\/' + _domain.substr(0, _domain.indexOf('/'));
        _rp = '%3A//' + new_domain
    }
    _w.open('https://secure.opinionlab.com/ccc01/comment_card.asp?time1=' + _tm + '&time2=' + (new Date()).getTime() + '&prev=' + _fC(escape(_hr)) + '&referer=' + _fC(_ht) + '&height=' + _sH + '&width=' + _sW + '&custom_var=' + custom_var, 'comments', 'width=535,height=560,screenX=' + ((_sW - 535) / 2) + ',screenY=' + ((_sH - 560) / 2) + ',top=' + ((_sH - 560) / 2) + ',left=' + ((_sW - 535) / 2) + ',resizable=yes,copyhistory=yes,scrollbars=no')
};
function _fPe() {
    if (Math.random() >= 1.0 - _poE) {
        O_LC();
        _poX = 0.0
    }
};
function _fPx() {
    if (Math.random() >= 1.0 - _poX) O_LC()
};
window.onunload = _fPx;
function O_GoT(_p) {
    _d.write('<a href=\'javascript:O_LC()\'>' + _p + '</a>');
    _fPe()
}
/* $Id$ */

// Requirements:
//  rei.session.user.isLoggedIn
//	jQuery
//  jQuery.carousel
//  jQuery.highlightFade.js
//  thickbox
//  12:32

function Minicart() {
// Private Properties and Methods
	var miniCartAvailableArrow = $(document.getElementById('unvHeader'));
	var itemAddedToCartMsg = 0;
	var m = 0;  // minicart
	var mc = 0; // Minicart Carousel
	var cartData = 0;
	var itemsInCart = 0;
	var cartSubtotal = 0;
	var isVisible = false;
	var isBusy = true;  // Used to prevent internal actions while busy
	var timeoutHide = 0;
	var carouselItems = 0;
	var state = "";
	var originalAddToCartHtml = 0;
	var whenNoLongerBusyFunction = 0;
	var dontHide = false;
	var mclick = false;
	var publicState = "busy";
	var scrollToTopEnabled = true;
	var beforeSubmitFunction = function(){};
	var onCompleteFunction = function(){};
	var onSuccessFunction = function(){};
	var onErrorFunction = function(){};
	var me = this;
	var wlProdRow = null;
	var wlNoteRow = null;
	var toUrl ;
	// TODO What to do if the AJAX call fails?
	//Rashmi: Stewardship Release 1: Commented because we won't be using minicart.jsp
	/*var minicartHTML = '<div id="minicartContainer"></div>';
	if (REIMinicartURL && REIMinicartURL.length > 0) {
		jQuery.ajax({
	    	url: REIMinicartURL,
         	success: function(result) {
            	minicartHTML = result;
            },
         	async: false
    	});
	}*/
	var template = {
			images: ["/etc/static/rei-wcm/pix/minicart/arrow_carousel_left.png",
			         "/etc/static/rei-wcm/pix/minicart/arrow_carousel_right.png",
			         "/etc/static/rei-wcm/pix/minicart/carousel_bkgrnd_left.png",
			         "/etc/static/rei-wcm/pix/minicart/carousel_bkgrnd_right.png",
			         "/etc/static/rei-wcm/pix/minicart/checkmark_green.png",
			         "/etc/static/rei-wcm/pix/common/successChkMark_19x18.gif"],
		    minicart : '\
				<div id="minicartContainer">\
					<div id="minicart" class="minicart">\
						<div id="minicartBusy">\
							<div class="loadingMsg"><img src="/etc/static/rei-wcm/pix/minicart/ajax-loader.gif" alt=""/></div>\
						</div>\
						<div id="minicartError">\
							<div class="errorMsg">We\'re unable to display this view of your cart right now. <br/>This is likely because you are no longer logged in. <br/><br/><a href="/YourAccountLoginView">Please click here to log in.</a></div>\
						</div>\
						<div class="minicartMain" id="minicartMain">\
							<div class="mcitems">\
								<h3>Added to your cart</h3>\
								<ul id="minicartCarousel" class="minicartCarouselStyle"></ul>\
								<div id="minicartCarouselPlaceholder"></div>\
							</div>\
							<div class="mcdivider"><div></div></div>\
							<div class="mctools">\
								<h3>Subtotal:&nbsp;&nbsp;<span id="minicartSubtotal">$0.00</span></h3>\
								<p>Total items in cart:&nbsp;&nbsp;<span id="minicartQuantity">0</span></p>\
								<p class="mcviewcart"><a href="/ShoppingCart?storeId=' + storeId + '" id="minicartViewCart">View your cart</a></p>\
								<p class="mccheckout"><a href="/CheckoutLoginView?storeId=' + storeId + '" id="minicartCheckoutBtnLink" class="hdrLink_checkoutBtn">Checkout</a></p>\
							</div>\
						</div>\
					</div>\
				</div>',
			carousel : '<ul id="minicartCarousel" class="minicartCarouselStyle"></ul>'
	}; // end template

	// Common support functions
    function ltrim(s){if(typeof(s)!="string"){s = "";}var l=0;while(l<s.length&&s[l]==' '){l++;}return s.substring(l,s.length);}
    function rtrim(s){if(typeof(s)!="string"){s="";}var r=s.length-1;while(r>0&&s[r]==' '){r-=1;}return s.substring(0,r+1);}
    function trim(s){if(typeof(s)!="string"){s="";}return rtrim(ltrim(s));}
    function isBlankString(testString){if(typeof testString=="string"){return(testString=="");}return true;}
    function formatDollars(num) {
    	num = num.toString().replace(/\$|\,/g,'');
    	if(isNaN(num)) num = "0";
    	sign = (num == (num = Math.abs(num)));
    	num = Math.floor(num*100+0.50000000001);
    	cents = num%100;
    	num = Math.floor(num/100).toString();
    	if(cents<10) cents = "0" + cents;
    	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    	num = num.substring(0,num.length-(4*i+3))+','+
    	num.substring(num.length-(4*i+3));
    	return (((sign)?'':'-') + '$' + num + '.' + cents);
    }
    function replaceValuesInQuerystring(url,param,value) {
        var re = new RegExp("([?|&])" + param + "=.*?(&|$)","i");
        if (url && url.match(re))
            return url.replace(re,'$1' + param + "=" + value + '$2');
        else
            return url + '&' + param + "=" + value;
    }
    function getValueInQuerystring(url,param) {
    	if (typeof(url)=='string'&&typeof('param')=='string') {
    		var splitUrl = url.split('?');
    		if (splitUrl.length>1) {
    			var vars = splitUrl[1].split("&");
    			for (var i=0;i<vars.length;i++) {
    				var pair = vars[i].split("=");
    				if (pair.length>=1) {
    					if (pair[0]==param) {
    						if (pair.length>1) {
    							return pair[1];
    						}
    					}
    			  	}
    		  }
    	  }
    	}
    	return null;
    }
    String.prototype.wordWrap = function(m, b, c){
        var i, j, l, s, r;
        if(m < 1)
            return this;
        for(i = -1, l = (r = this.split("\n")).length; ++i < l; r[i] += s)
            for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : ""))
                j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length
                || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
        return r.join("\n");
    };
    function loadImages(i) {
    	// Background loding minicart images
    	if (i==undefined) i=0;
    	if (i<template.images.length) {
    		$(new Image())
    			.load(function() {loadImages(i+1);})
    			.error(function() {loadImages(i+1);})
    			.attr('src',template.images[i]);
    	}
    }
    function hide(delay) {
		cancelHide();
		if (!delay) delay=0;
		if (!dontHide) {
			if ((isNaN(delay)||delay==0)&&!isBusy) {
				if (isVisible) {
					setState("busy");
					$(m.find('div.jcarousel-container')).unbind().empty();
					$("#minicartCheckoutBtn").hide();
					itemAddedToCart.hide();
					m.hide();
					isVisible=false;
					setState("ready");

					//undo arrow styling when cart closes
					$("#miniCartAvailableArrow", "#topBar_right").removeClass('menuActive');
							$("#miniCartAvailableArrow img", "#topBar_right").attr("src", "/etc/static/rei-wcm/pix/common/arrow_tiny_help_AE9E8B.png");
					$("#miniCartAvailableArrow", "#unvHeader").unbind("mouseenter mouseleave");
					$("#minicartContainer").trigger("hideCart");
					$("h3.lineA").hide();
				}
			}
			else {
				timeoutHide = setTimeout(function() {
				hide(0);
				},delay);
			}
		}
    }
    function scrollToTop() {
    	if (scrollToTopEnabled) {
    		$('html, body').animate({scrollTop:0}, 0);
    	}
    }

    function cssModify(fix) {
    	if (typeof(fix)=="string") {
	    	switch(fix.toLowerCase()) {
	    		case "thickbox":
	    			$("#TB_overlay").css({
	    				"z-index":"9070"
	    			});
	    			var TB_window = $("#TB_window").css({
	    				"z-index":"9070"
	    			});
	    			$("#TB_ajaxContent",TB_window).css({
	    				"padding-left":"20px"
	    			});
	    			$("div.splash",TB_window).css({
	    				"margin":"0 15px 0 11px"
	    			});
	    			$("h, p",TB_window).css({
	    				"font":"#333"
	    			});
	    			$("h2",TB_window).css({
	    				"font-size":"14px"
	    			});
	    			$("h1",TB_window).css({
	    				"line-height":"27px",
	    				"margin-top":"20px"
	    			});
	    			$("#acceptCssButton",TB_window).css({"margin-right":"18px"});
	    			$("table.shoppingCart",TB_window).css({"width":"670px"});
	    			$("th.product,td.product",TB_window).css({"text-align":"left"});
	    			$("tr.tr2",TB_window).css({"background-color":"#E5E5E5"});
	    			$("tr.tr0",TB_window).css({"background-color":"#FFFFFF"});
	    			$("ul.productDesc,ul.quantity",TB_window).css({"list-style":"none outside none"});
	    			$("li",TB_window).css({"line-height":"18px"});
	    			$("li a,p a", TB_window).css({"text-decoration":"underline"});
	    			$("li a:link,li a:visited,p a:link,p a:visited", TB_window).css({"color":"#668800"});
	    			break;
	    		case "minicart" :
	    			var userAgent = navigator.userAgent.toLowerCase();
	    			if (/chrome/.test( userAgent )) {
	    				$(".minicartProductName", m).css({"font-size":"11px"});
	    			}
	    			break;

	    	}
    	}

    }

    function whileBusy(busyFunction, noLongerBusyFunction) {
    	busyFunction();
    	if ($.isFunction(noLongerBusyFunction)) {
    		whenNoLongerBusyFunction = noLongerBusyFunction;
    	}
    }

    function whenNoLongerBusy() {
    	if ($.isFunction(whenNoLongerBusyFunction)) {
    		whenNoLongerBusyFunction();
    		whenNoLongerBusyFunction = 0;
    	}
    }

	function itemLoadCallbackFunction(carousel, state) 	{
	}

	function flashItemAddedToCart() {
		itemAddedToCart.show();
		$("h3.lineA").show().highlightFade({color:'#F6F4F2',speed:2000,iterator:'sinusoidal'});
	}

	function setState(stateProperties) {
		stateProperties = (""+stateProperties).toLowerCase();
		if  (stateProperties.indexOf("busy")>=0) {
			isBusy = true;
			state = "busy";
			if (stateProperties.indexOf("show")>=0) {
				$("#minicartError").hide();
				$("#minicartBusy").show();
				$("#minicartMain").hide();
			}
		} else if (stateProperties.indexOf("ready")>=0) {
			isBusy = false;
			state = "ready";
			if (stateProperties.indexOf("show")>=0) {
				$("#minicartError").hide();
				$("#minicartBusy").hide();
				$("#minicartMain").show();
			}
		} else if (stateProperties.indexOf("error")>=0) {
			isBusy = true;
			state = "error";
			if (stateProperties.indexOf("show")>=0) {
				$("#minicartError").show();
				$("#minicartBusy").hide();
				$("#minicartMain").hide();
			}
		}
	}

	function getState() {
		return state;
	}

	function cancelHide() {
		clearTimeout(timeoutHide);
	}

	function appendMinicartToContainer() {
		miniCartAvailableArrow.after(template.minicart);
		m = $(document.getElementById('minicartContainer'));
		m.hide();
		mc = 0;
		mOriginalWidth = m.outerWidth();
		itemAddedToCart = $("#itemAddedMsg",m);
		itemAddedToCart.hide();
		$("#minicartClose",m).click(hide);
	}

	function compareOrderItemId(thisItem,thatItem){
		//return thatItem.createDate - thisItem.createDate;
		return thatItem.createDateInMilliSec - thisItem.createDateInMilliSec;
	}

	function formatTwoLineDescription(s) {
		s = s.wordWrap(54, "|", 1);
		var lines = s.split("|");
		var returnVal = 0;
		returnVal = {"firstLine":trim(lines[0]),"secondLine":null,"thirdLine":null};
		return returnVal;
	}

	function buildElement( domObj ) {
		domvar = document.createElement( domObj.type );
		attribute = document.createAttribute( "class" );
		attribute.value = domObj.className;
		domvar.setAttributeNode( attribute );
		return domvar;
	}

	function refreshCart() {
		carouselItems = 0;
		var scratch = $(m.find('div.jcarousel-container'));
		if (scratch.length>0) {
			scratch.replaceWith(template.carousel);
		} else {
			$(m.find('#minicartCarousel')).replaceWith(template.carousel);
			$("#minicartCarouselPlaceholder",m).show();
		}
		mc = 0;
		if (cartData!=null&&cartData!=undefined) {
			setState("ready show");
			var html = "";
			var itemQuantity = 0;
			var itemSize = "";
			var cartQuantity = 0;
			var itemPrice = 0;
			var itemSalePrice = 0;
			var itemSavedAmount = 0;
			var itemTotalPrice = 0;
			var cartPrice = 0;
			var scratch = 0;
			// For each Item:
			cartData.order.orderItems.sort(compareOrderItemId);
			$.each(cartData.order.orderItems, function(i,item) {
			    var hiddenFlag = item.hiddenFlag;
			    if (hiddenFlag == 1){
			     return;
			    }
				var scratch = parseInt(item.quantity),
				priceInfo = [];
				itemQuantity = (isNaN(scratch))?0:scratch;
				cartQuantity += itemQuantity;
				itemSize = item.size;

				scratch = parseFloat(item.totalProductPrice);
				cartPrice += (isNaN(scratch))?0:scratch;

				scratch = parseFloat(item.price);
				itemPrice = (isNaN(scratch))?0:scratch;
				itemSalePrice = parseFloat(item.compareAtPrice).toFixed(2);
				itemSavedAmount = parseFloat(item.totalSavings).toFixed(2);
				itemTotalPrice = parseFloat(item.totalProductPrice).toFixed(2);
				carouselItems++;

				var isPromoCard = (item.certificateInfo && item.certificateInfo.promoGiftCertificate) ? item.certificateInfo.promoGiftCertificate : false;
				var itemUnitDisplayPrice = (itemTotalPrice == 0) ? 'FREE' : formatDollars(itemPrice);

				//Build Price Info
				if((itemSavedAmount == 0) || (isNaN(itemSalePrice)) || (isNaN(itemSavedAmount))) {
					priceInfo.push(["<span>", formatDollars(itemPrice) + "</span>"]);
				} else {
					priceInfo.push(["<span class='discount'>", itemUnitDisplayPrice + "</span>&#160;"]);
					priceInfo.push(["<span class='priceOriginal'>", formatDollars(itemSalePrice) + "</span>"]);
				}


				var itemLi = document.createElement("LI");
				var itemImg = document.createElement("IMG");

				var attr = document.createAttribute("height");
				attr.value = "190";
				itemImg.setAttributeNode(attr);

				attr = document.createAttribute("width");
				attr.value = "190";
				itemImg.setAttributeNode(attr);

				attr = document.createAttribute("src");

				if(isPromoCard){
					attr.value = (item.promoCardDetails && item.promoCardDetails.image) ? item.promoCardDetails.image : '';
				}else{
					attr.value = "/skuimage/" + item.sku + "/190";
				}

				itemImg.setAttributeNode(attr);

				itemLi.appendChild(itemImg);

				var itemDiv = document.createElement("DIV");
				var skuDescription = formatTwoLineDescription(item.skuDescription);
				attr = document.createAttribute("class");
				attr.value = "minicartProductInfo";
				itemDiv.setAttributeNode(attr);

				// declare reusable item information line DOM variable
				var descriptionline;
				var config = { type: 'div', className: ['desc itemtitle'] };
				descriptionline = buildElement( config );

				if(isPromoCard){
					var promoDescription = (item.promoCardDetails && item.promoCardDetails.description) ? formatTwoLineDescription(item.promoCardDetails.description).firstLine : '';
					descriptionline.appendChild(document.createTextNode(promoDescription));
				}else{
					descriptionline.appendChild(document.createTextNode(skuDescription.firstLine));
				}
				if (skuDescription.secondLine) {
					descriptionline.appendChild(document.createElement("br"));
					descriptionline.appendChild(document.createTextNode(skuDescription.secondLine));
					// Ellipses ?
				}
				itemDiv.appendChild(descriptionline);

				config = { type: 'div', className: ['desc color'] };
				descriptionline = buildElement( config );

				if (typeof(item.color) !== undefined || item.color !== "")
				{
					var textTransform = item.color;
				}
				if (textTransform.length > 0 && itemSize != "")
				{
					textTransform += ", ";
				}
				if (itemSize != "")
				{
					textTransform += itemSize;
				}
				textTransform = textTransform.toLowerCase();
				descriptionline.appendChild(document.createTextNode(textTransform));

				itemDiv.appendChild(descriptionline);

				//Display Price
				config = { type: 'div', className: ['desc price'] };
				descriptionline = buildElement( config );
				for(var i = 0; i < priceInfo.length; i++){
					$(descriptionline).append(
						priceInfo[i][0] + priceInfo[i][1]
					);
				}
				itemDiv.appendChild(descriptionline);

				var config = { type: 'div', className: ['desc qty'] };
				descriptionline = buildElement( config );

				descriptionline.appendChild(document.createTextNode("Quantity: "));
				descriptionline.appendChild(document.createTextNode(itemQuantity));
				itemDiv.appendChild(descriptionline);

				if(itemQuantity > 1) {
					config = { type: 'div', className: ['desc totalprice'] };
					descriptionline = buildElement( config );

					descriptionline.appendChild(document.createTextNode("Total: $"));
					descriptionline.appendChild(document.createTextNode(itemTotalPrice));
					itemDiv.appendChild(descriptionline);
				}

				if(itemSavedAmount != 0) {
					config = { type: 'div', className: ['desc totalsaved'] };
					descriptionline = buildElement( config );

					descriptionline.appendChild(document.createTextNode("You save: $"));
					descriptionline.appendChild(document.createTextNode(itemSavedAmount));
					itemDiv.appendChild(descriptionline);

				}

				config = { type: 'div', className: ['desc editlink'] };
				descriptionline = buildElement( config );
				var itemA = document.createElement("A");
				attr = document.createAttribute("href");
				attr.value = "/ShoppingCart?storeId=" + storeId;
				itemA.setAttributeNode(attr);
				itemA.appendChild(document.createTextNode("Edit"));
				descriptionline.appendChild(itemA);
				itemDiv.appendChild(descriptionline);

				itemLi.appendChild(itemDiv);

				$("#minicartCarousel",m).append(itemLi);

			});
			if (carouselItems>0) {
				$(m.find('#minicartCarousel')).jcarousel({
					"start": 1,
/* jmontgo Jan2011 for @qc2194, see http://sorgalla.com/projects/jcarousel/
window-resize triggers error */
					itemFallbackDimension:248,
					"scroll": 1
                });
				$("#minicartCarouselPlaceholder",m).hide();
			}
			hdrObj.setCartStatus(cartQuantity);
			$("#minicartQuantity",m).text(cartQuantity);
			$("#minicartSubtotal",m).text(formatDollars(cartPrice));
			$("#minicartCheckoutBtnLink").attr("href",$("#checkoutLink").attr("href"));
			$("#minicartCheckoutBtn").css({
						"background":"url(\"/etc/static/rei-wcm/pix/checkout/checkout_button_bkgrnd_orange.png\") no-repeat center center"
			});
			var lastLine = $("lineD");
			$("#minicartViewCart",lastLine).each(function() {
				$(this).mouseover(function() {
					manual_cm_sp();
				});
			});

			//set arrow styling when the cart is open
			$(document.getElementById('miniCartAvailableArrow')).addClass('menuActive');
		}
		$(document.getElementById('minicartCheckoutBtn')).show();
		cssModify("minicart");

		setState("ready show");
		m.mouseover(function() {
			cancelHide();
		});
		m.mouseout(function() {
			hide(5000);
		});
		hide(5000);
	}

	function parseJSON( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}
		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
			.replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {

			// Try to use the native JSON parser first
			return window.JSON && window.JSON.parse ?
				window.JSON.parse( data ) :
				(new Function("return " + data))();
		} else {
			return null;
		}
	}

	function goWithTheOldFlow(serviceCallURL) {
		var oldUrl = "&URL=" + escape("/minicart?storeId=" + storeId);
		var newUrl = "&URL=" + escape("/ShoppingCart?storeId=" + storeId);
		serviceCallURL = serviceCallURL.replace(oldUrl,newUrl);
		window.location.href = serviceCallURL;
	}

	/**
	 * This function adds item to cart and if added successfully then opens the minicart.
	 *  If serviceCallURL is passed, then AJAX call is made to respective URL or web-service for adding items to cart.
	 *       Currently supports add to cart workflow URLs, '/AddItemToCart & '/REIOrderItemUpdate'.
	 *       Currently supports view cart web service, /minicart = /minicart
	 *       Currently supports add to cart web-service , '/rest/cart/item'.
	 * @param serviceCallURL - The AJAX URL
	 * @param successCallBack - Function to be run if the AJAX call succeeds
	 * @param errorCallback - Function to be run if the AJAX call fails
	 */

	function refreshCartData(serviceCallURL, successCallBack, errorCallBack)
	{
		var prod = rei.prod;
		beforeSubmitFunction();
		setState("busy show");
		scrollToTop();
		cartData = null;

		if(serviceCallURL != null || serviceCallURL != "")
		{
			serviceCallURL = replaceValuesInQuerystring(serviceCallURL,"URL",escape("/minicart?storeId=" + storeId));

			//If calling new Add to cart web service (currently called from product page only),
			//then make sure guest user token is generated using web service and set in cookie before calling add to cart web service
			if(serviceCallURL.indexOf('/rest/cart/item') != -1)
			{
				_updateCartUsingWebService(serviceCallURL, successCallBack);
			}
			//Using workflow for add to cart
			else
			{
				_updateCartUsingWorkflow(serviceCallURL, successCallBack);

			}
		}
		else
		{
			 setState("error show");
			 window.location.href = "/Error";
		}


		/**
		 * Function to enable div for displaying the error in minicart
		 */
		function _showErrorState(){
			onErrorFunction();
			setState("error show");
			$("#minicartContainer")
				.css('visibility','none')
				.show();
		};

		function _showError(serviceCallURL)
		{
			if(prod && prod.reenableCart)
			{
				prod.reenableCart();
			}
			//If not minicart then show error page
			if(serviceCallURL.indexOf("/minicart") == -1 && serviceCallURL.indexOf("/rest/cart.json") == -1)
			{
				window.location.href = "/Error";
			}
			//For minicart show error in minicart pop up
			else
			{
				_showErrorState();
			}
		};

		/**
		 * 	Private function supports the AJAX call for,
		 * 	1>  workflow for adding item to cart
		 *  2>  showing minicart
		 * @param serviceCallURL - The AJAX URL
		 * @param successCallBack - Function to be run if the AJAX call succeeds
		 */

		function _updateCartUsingWorkflow(serviceCallURL, successCallBack)
		{
			//Calling AJAX wrapper method of type GET
			rei.services.Read(serviceCallURL,{},{
						dataType: 'text',
						cache: false,
						success: function(data)
						{
							var returnedJson = null;
							try {
								returnedJson = parseJSON(data);
							}
							catch (e) {
								_showError(serviceCallURL);
							}
							//Take user to shopping cart, terms & conditions or back order page
							if (returnedJson==null) {
								//Redirect to Shopping Cart when backend returns the Shopping Cart Page.
								// Because the same request for adding an item to cart is being used for
								// the non-javascript and ajax code.
								if(data && (data.indexOf('<meta name="reiShortcut_requestUri" content="/ShoppingCart">') >= 0 || $(data).find("order").length) > 0)
								{
									var sId = window.storeId || "8000";
									window.location.href = '/ShoppingCart?storeId=' + sId;
									return true;
								}
								//Show T & C page or Back order page
								goWithTheOldFlow(serviceCallURL);
							}
							//Open minicart
							else {
								try {
									cartData = $.extend(true, {}, returnedJson);
									setState("ready show");
								}
								catch (e){
									_showError(serviceCallURL);
								}
								//Enable 'Add to cart' button
								if ($.isFunction(successCallBack)){
									successCallBack();
								}
								//Show desired page after item is added to cart and minicart shown
								if(toUrl != null && toUrl != '' )
								{
									toUrl = unescape(toUrl);
									window.location.href = toUrl;
								}
							}
						},
						error: function(jqXHR, textStatus, errorThrown){
							var errors =  $.parseJSON(jqXHR.responseText),
								statusCode = jqXHR.status,
								errorCodes = [];

							errors = (errors.error && $.isArray(errors.error)) ? errors.error : errors;

							if($.isArray(errors)){
								for(var i = 0; i < errors.length; i++){
									errorCodes.push(errors[i].code);
								}
							}

							/*
								FIX for ONLINE-12703 and INC203367
								@desc	We are emptying the cookies and reloading the page for a user when the REI_SESSION_ID is empty.
							*/
							if((statusCode === 400 || statusCode === 401) && ( $.inArray(1400, errorCodes) > -1 || !$.cookie("REI_SESSION_ID") )){
								Delete_Cookie("REI_SESSION_ID","");
								Delete_Cookie("REI_SSL_SESSION_ID","");
								Delete_Cookie("loggedin","");
								Delete_Cookie("rei_cart","");
								Delete_Cookie("outlet_cart","");
								//window.location.reload();
								_showErrorState();
								return;
							}
							_showError(serviceCallURL);
						}
					}
			);
		};


		/**
		 * Sets "REI_SESSION_ID" in cookie with expiry of 14 days
		 * @param token
		 */
		function _setGuestUserCookie(token)
		{
			 // set time, it's in milliseconds
		    var today = new Date();
		    today.setTime( today.getTime() );
		    var expires = parseInt(14) * 1000 * 60 * 60 * 24;
		    var expires_date = new Date( today.getTime() + (expires) );
		    document.cookie = "REI_SESSION_ID=" +  token  + ";path=/" +( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" );
		};


		/**
		 * Private function making AJAX call to add to cart web service
		 * @param serviceCallURL -- add to cart webservice URL
		 * @param successCallBack - Function to be run if the AJAX call succeeds
		 */
		function _updateCartUsingWebService(serviceCallURL, successCallBack)
		{
			//Commented the below call cause it doesn't work with beforeSend
			//rei.services.Create(serviceCallURL,{},{
			jQuery.ajax({
			    type: "POST",
			    cache: false,
			    url: serviceCallURL,
			    dataType: "json",
						beforeSend:function(){
							//If user isn't logged in and guest cookie not set,
							//then make sure guest user token is generated using web service and is set in cookie before calling add to cart web service
							if (!rei.session.user.hasSession)
							{
								rei.services.Create('/rest/user/guest/v2.json',{},{
					    	  		dataType: "json",
					    	  		async: false,
					    			success: function(token){
					    				//Set_Cookie("REI_SESSION_ID", json); Not using Set_Cookie because it escapes the token value due tp which the
					    				// guest user token returned by server doesn't match the one set in browser cookie
					    				//$.cookie("REI_SESSION_ID",token,{path:'/', expires: 10}); Can't use this cause even this encodes the token
					    				_setGuestUserCookie(token.unsecureToken);
										rei.session.user.syncFromCookies();
					    			},
					    			error: function(){
					    				_showError(serviceCallURL);
					    			}
					    		});
							}
						},
						success:function(json, status, xhr){
							try {
									if(xhr != null)
									{
										if(xhr.status == '201' && status == 'success'){
											setState("ready show");
											//Show the moving to cart message for wishlist
											var wLForm = $("form[id*=wishlistaddtocartform]");
											if(wLForm && $("#owner"))
		    								{
												if(wlNoteRow)
													wlNoteRow.hide();
												if(wlProdRow)
													wlProdRow.html("<td colspan='6'>" + "<p class='wishListCartAction'>" + "Moving to cart!" + "</p>" + "</td>").fadeOut(2000, function () {});
		    								}
											toUrl = getValueInQuerystring(serviceCallURL,"toUrl");//_getQueryStringParamVal("toUrl");
											//Open minicart
											minicart.addToCart("/minicart?storeId="+window.storeId, successCallBack);
											try{
												if(typeof addToCartSuccessCallback === 'function'){
													addToCartSuccessCallback();
												}
											}
											catch(err){}
										}
										else{
											_showError(serviceCallURL);
										}
									}
							}
							catch (e){
								_showError(serviceCallURL);
							}
						},
						error: function(xhr){
							if(xhr != null)
							{
								var status = xhr.status;
								var returnedError = jQuery.parseJSON(xhr.responseText);
								var errorCode = null;
						    	if(returnedError != null)
						    	{
						    		errorCode = returnedError.error[0].code;
						    	}
								//Show back order page
						    	var backOrderErrors = new Array();
						    	backOrderErrors.push(3504);
						    	backOrderErrors.push(3505);
						    	backOrderErrors.push(3506);

						    	var termsCondErrors = new Array();
						    	termsCondErrors.push(3502);

						    	// If the user's cookie is out of sync with REI.com we will clear out the cookie and recall this function and let the ajax beforeSend callback get a set a new user cookie (ONLINE-14256)
					    		if((status == '400' || status == '401') && errorCode == 1400)
					    		{
					    			Delete_Cookie("loggedin","");
					    			Delete_Cookie("REI_SESSION_ID","");
					    			Delete_Cookie("REI_SSL_SESSION_ID","");
					    			//setCookie("WCS_SESSION_ID","");
									//setCookie("WCS_AUTHENTICATION_ID","");
									//setCookie("rei_ila_appids","");
									//setCookie("guestAddess","");
					    			Delete_Cookie("rei_cart","");
					    			Delete_Cookie("outlet_cart","");
									//setCookie("GiftRegistrySetup","");
									//setCookie("GiftRegistryPurchase", "");
					    			//_updateCartUsingWebService(serviceCallURL, successCallBack);
									_showErrorState();
					    			return;
					    		}
						    	//If it isn't error because of backorder or termsconditions, then show error page.
					    		else if(jQuery.inArray(errorCode,backOrderErrors) == -1 && jQuery.inArray(errorCode,termsCondErrors) == -1)
						    	{
						    		_showError(serviceCallURL);
						    		return;
						    	}
					    		//Show Terms and Conditions page
						    	//else if(status == '412' && (jQuery.inArray(errorCode,termsCondErrors) != -1  || xhr.responseText.indexOf('3502') != -1))
						    	else if(jQuery.inArray(errorCode,termsCondErrors) != -1)
					    		{
					    			/*var n = document.additem;
					    			n = n.sku;
					    			n = n[n.selectedIndex].value;
					    		    var sku = n + '.json'; */
						    		var sku = getValueInQuerystring(serviceCallURL,"sku") + '.json';//_getQueryStringParamVal("sku") + '.json';
					    			rei.services.Read("/rest/cart/terms/"+sku,{},{
					    				dataType:'text',
					    				success: function(data) {
					    					var splashJson = null;
											try {
												splashJson = parseJSON(data);
												splashText = splashJson.text;
											}
											catch (e) {
												_showError(serviceCallURL);
											}

											var splashContent = '<div id="termsFancy" class="splash" data-ui="product-terms-container">'+
																	'<h1 style="">Terms and Conditions: '+ splashJson.categoryTitle+'</h1>'+
																	'<h2 style=""> WARNING: Please read carefully before accepting.</h2>'+
																	 '<div id="splashContent">'+
																	 	splashJson.text +
																	 '</div>'+
																	 '<div class="horizdots2"></div>'+
																	 '<div style="height:90px;">'+
														 			     '<p class="terms">Click to accept the Terms and Conditions and place item in your shopping cart.</p>'+
														 			     '<div id="buttons">'+
														 			     	'<ul style="width:68px;" id="acceptCssButton" class="button">'+
														 			     		'<a href="#" class="medium primary button" data-ui="product-terms-accept">Accept</a>'+
														 			     	 '</ul>'+
														 			     	 '<ul style="padding-top:5px;width:0px;height:10px;">or</ul>'+
														 			     	 '<ul style="padding-top:5px;width:0px;height:10px;" id="cancelLink">'+
														 			     	 	'<a href="#" data-ui="product-terms-cancel">Cancel</a>'+
														 			     	  '</ul>'+
														 			     '</div>'+
														 			  '</div>'+
													 			 '</div>';

					    					$.fancybox(
					    							splashContent,
					    							{
					    								 autoDimensions: true,
						    							 padding: 0,
						    							 margin:0,
					    							    onClosed: function(){
					    									var prod = rei.prod;
					    									if(prod && prod.reenableCart)
					    									{
					    										prod.reenableCart();
					    									}

					    								},
					    								onComplete: function(){
					    									$("#acceptCssButton a").bind("click", function(e){
					    										e.preventDefault();
					    										var acceptedURL = "termsCategoryAgreedTo=true";
					    										if(serviceCallURL.indexOf('?') == -1)
					    										{
					    											acceptedURL = serviceCallURL.concat("?", acceptedURL);
					    										}
					    										else
					    										{
					    											acceptedURL = serviceCallURL.concat("&", acceptedURL);
					    										}
					    										_updateCartUsingWebService(acceptedURL);
					    										$.fancybox.close();
					    									});
					    									$("#cancelLink a").bind("click", function(e){
					    										e.preventDefault();
					    										var prod = rei.prod;
					    										if(prod && prod.reenableCart)
					    										{
					    											prod.reenableCart();
					    										}
							    								$.fancybox.close();
					    									});

					    								}
					    							}
					    					);
					    				},
					    				error: function()
					    				{
					    					serviceCallURL = serviceCallURL.replace('/rest/cart/item','/AddItemToCartController');
							    			goWithTheOldFlow(serviceCallURL);
					    				}
					    			});

					    			return;
					    		}
						       // else if(status == '412' && (jQuery.inArray(errorCode,backOrderErrors) != -1
					    		//		|| (xhr.responseText.indexOf('350') != -1 && xhr.responseText.indexOf('3502') == -1)))
						    	else if(jQuery.inArray(errorCode,backOrderErrors) != -1)
					    		{
									//serviceCallURL = serviceCallURL.replace('/rest/cart/item','/AddItemToCartController');
					    			serviceCallURL = serviceCallURL.replace('/rest/cart/item','/backOrderController');
									goWithTheOldFlow(serviceCallURL);
									return;
					    		}
					    		else{
						    		_showError(serviceCallURL);
						    		return;
					    		}
							}
							//Show error page for any other errors
				    		window.location.href = "/Error";
						}
					});
		};//end of update fn
	}//end of refreshCartData fn



	function modifyAddToCartBehaviours() {
		var membershipSku = "membership";//"36936";

		function addToMinicart() {
		    var qty;
	        for (var i=0; i < document.additem.yourChoice.length; i++){
	        	if (document.additem.yourChoice[i].checked){
	        		qty = document.additem.yourChoice[i].value;
	        	}
	        }
	        if (qty == "useTextInput"){
	            qty = document.additem.quantityTxt.value;
	        }
	        if (isNaN(qty) || qty <= 0) {
	            alert( "Please enter a valid quantity before adding this item to your shopping cart." );
	            return;
	        }
	        document.additem.quantity.value = qty;
	    }

		/**
		 * This function adds membership to cart
		 * @param anchor
		 */
		function becomeAMemberAnchor(anchor) {
			var a = $(anchor);

			//if (a.attr("href")=="/buyMembership?tracking=mem_dir_mem_pg")
			//	var href = a.attr("href");
				a.attr("href","#");
				a.click( function () {
					var url = "/rest/cart/item?" +
						"storeId=" + storeId +
					//	"&URL=" + escape("/minicart?storeId=" + storeId) +
						"&quantity=1" +
					//	"&from_url=ProductPage" +
					//	"&orig_action=REIOrderItemUpdate" +
					//	"&product_desc=REI%20Membership" +
					//	"&vendor=REI" +
						"&sku=" + membershipSku ;
					//	"&tracking=mem_dir_mem_pg";
					show(url);
				});
		}

		function reiOrderItemUpdateAnchor(anchor) {
			if ($("#shoppingBasket").length==0) { // Don't change links on shopping cart page
				var a = $(anchor);
				var url = $(anchor).attr("href");
				var re1 = /^\/REIOrderItemUpdate?.+/;
				var re2 = /\?URL=ShoppingBasket/;
				var re3 = /&URL=ShoppingBasket/;
				if (url.match(re1)&&(url.match(re2)||url.match(re3))) {
					url=url.replace(re2,"?URL=" + escape("/minicart?storeId=" + storeId));
					url=url.replace(re3,"&URL=" + escape("/minicart?storeId=" + storeId));
					a.attr("href","#");
					a.click( function () {
						show(url);
						return false;
					});
				} else if (url.match(re1)&&!url.match(re2)&&!url.match(re3)) {
					if (url.indexOf("?") > 0) {
						url = url + "&";
					} else {
						url = url + "?";
					}
					url = url + "URL=" + escape("/minicart?storeId=" + storeId);
				}
			}
		}

		/**
		 * This function adds wish list items to cart
		 * @param i
		 * @param wishlistAddToCartForm
		 */
		function modifyWishlistAddToCartForm(i,wishlistAddToCartForm) {
			var targetedForm = $(wishlistAddToCartForm);
			var onsubmit = targetedForm.attr("onsubmit");
			if (onsubmit) {
				onsubmit = onsubmit.replace("return ", "");
			}
			targetedForm.removeAttr("onsubmit");

			targetedForm.submit(function(event){
				event.preventDefault();
				var oldOnSubmitResult = true;
				try {
					// submittedForm = false;
					oldOnSubmitResult = eval(onsubmit);
				}
				catch(e){
					// alert(e);
				}
				if (oldOnSubmitResult)  {
					//$("input[name=URL]",targetedForm).val("/minicart?storeId=" + storeId);
					// Disable all add to carts while i'm busy updating minicart
					//show(targetedForm.attr("action")+ "?" + targetedForm.serialize());
					show('/rest/cart/item'+ "?" + targetedForm.serialize());
				}
				return false;
			});
			$("button",targetedForm).click(function(e)  {
				e.preventDefault();
				targetedForm.submit();
				wlProdRow = $(this).parents("tr#owner");
				wlNoteRow = $(this).parents("tr#owner").next("tr#noteRow");
				//$(this).parents("tr#owner").next("tr#noteRow").hide();
				//$(this).parents("tr#owner").html("<td colspan='6'>" + "<p class='wishListCartAction'>" + "Moving to cart!" + "</p>" + "</td>").fadeOut(2000, function () {});
			});
		}

		function frmOrderYakimaOrThuleFitGuide() {
			var f = $("form[name=frmOrder]");
			if ($("table.rackOrder",f).length>0) {
				var d = $("div.shop2 div.shopCssButton",f);
				var a = $("a.btnStyle1[name!=cancel]:first",f);
				a.attr("href","#").click(function() {
					$("input[name=URL]",f).val("/minicart?storeId=" + storeId);
					whileBusy(function() {
						$("#cartFormButton").enabled = false;
						submittedForm = true;
					},function() {
						$("#cartFormButton").enabled = true;
						submittedForm = false;
					});
					show("/REIOrderItemUpdate?" + f.serialize());
				});
				var a = $("a.btnStyle1[name=cancel]:first",f);
				a.attr("href","/h/car-racks");
			}
		}

		/**
		 * This function adds gift card or e-gift card to cart
		 */
		function prepareGiftCertificateAddToCart() {

			var giftCardButton = $("a.button[name=giftCard]");
            var giftCardAnotherButton = $("a.button[name=giftCardAnother]");

            var eGiftCardButton = $("a.button[name=eGiftCard]");
            var eGiftcardAnotherButton = $("a.button[name=eGiftCardAnother]");

			if(giftCardButton)
			{
				var g_url= giftCardButton.attr("href");
				giftCardButton.bind('click',function(e) {
					_addCardToCart(g_url, e);
				});
			}
			if(giftCardAnotherButton)
			{
				var g_anoUrl= giftCardAnotherButton.attr("href");
				giftCardAnotherButton.bind('click',function(e){
					_addCardToCart(g_anoUrl, e);
				});
			}

			if(eGiftCardButton)
			{
				var e_url= eGiftCardButton.attr("href");
				eGiftCardButton.bind('click',function(e) {
					_addCardToCart(e_url, e);
				});
			}

			if(eGiftcardAnotherButton)
			{
				var e_anoUrl= eGiftcardAnotherButton.attr("href");
				eGiftcardAnotherButton.bind('click',function(e){
					_addCardToCart(e_anoUrl, e);
				});
			}
			function _addCardToCart(url,e)
			{
				e.preventDefault();
				url = url.replace("/giftCardController","/rest/cart/item");
				show(url);
			}
		}

		/**
		 * This function adds gift registry items to cart
		 */
		function rewriteGiftRegistryEditProducts() {
			if ($("#GiftRegistryEditProductsView").length>0||$("#GiftRegistryDetailsView").length>0) {
				getHrefUrl = function(storeId,catalogId,catEntryId,partNumber,registryEntryId,productDesc,quantity,sku ) {
					show("/rest/cart/item?" +
							//"?URL=" + escape("/minicart?storeId=" + storeId) +
							"storeId=" + storeId +
							//"&catalogId=" + catalogId +
							//"&catEntryId=" + catEntryId +
							"&sku=" + sku +
							"&giftRegistryEntryId=" + registryEntryId +
							//"&product_desc=" + productDesc +
							"&quantity=" + quantity);
				};
			}
		}

		/**
		 * This function is used for DOTD page only (I think)
		 * @param i
		 * @param form
		 */
		function modifyAddItemToCartForm(i,form) {
			var f = $(form);
			if (($("#product #productSelect").length>=1)&&($("#prodInventoryView").length==0)&&($("body#termsSplash").length==0)) {
				if (f.attr("id")!="productSelectForm2") {
					// Product Page Context
					var onsubmit = f.attr("onsubmit");
					var onsubmitText = "return true";
					if (onsubmit) {
						onsubmitText = onsubmit.toString();
						onsubmitText = onsubmitText.replace("return", "");
					}
					f.removeAttr("onsubmit");
					f.submit(function(event){
						var oldOnSubmitResult = true;
						try {
							// submittedForm = false;
							oldOnSubmitResult = eval(onsubmitText);
						}
						catch(e){
							var noop=e;
						}
						if (oldOnSubmitResult)  {
							$("input[name=URL]",f).val("/minicart?storeId=" + storeId);
							whileBusy(function() {
								$("#cartFormButton").enabled = false;
								submittedForm = true;
							},function() {
								$("#cartFormButton").enabled = true;
								submittedForm = false;
							});
							//show(f.attr("action")+ "?" + f.serialize());
							show('/rest/cart/item'+ "?" + f.serialize());
						}
						event.preventDefault();
						return false;
					});
				}
			} else if ($("body#prodInventoryView").length>=1||$("#termsSplash").length>=1) {
				// last minute  work around for #1665
				$("input[name=URL]",f).val("/ShoppingCart");
			} else if (false) {
				// BackorderPages
				// "Sorry. We don't have the quantity you've asked for in stock" Page
				// There are two versions of this page: one with three radio buttons
				// and the other just has the "buy what's in stock" option.
				var addToCartButton = $("a.btnStyle1",f);
				if (addToCartButton.length>0) {
					var onclick = addToCartButton.attr("onclick");
					if (onclick) {
						var addToCartIndex = 0;
						var anchorCollection = document.getElementsByTagName("a");
						var foundItem = false;
						$("input[name=URL]",f).val("/minicart?storeId=" + storeId);
						var submitAction = "";
						try {
							while (!foundItem && addToCartIndex<anchorCollection.length) {
								if (anchorCollection[addToCartIndex].className) {
									foundItem = (anchorCollection[addToCartIndex].className.indexOf("btnStyle1")>=0);
								}
								if (!foundItem) addToCartIndex++;
							}
						}
						catch(e) {}

						var onclickText = "";
						if (foundItem) {
							onclickText = anchorCollection[addToCartIndex].onclick.toString();
						} else {
							onclickText = onclick.toString();
						}
						if ($("input[type=radio][name=yourChoice]").length>=3) {
							submitAction =
								"var f=$(this).parents(\"form:first\");" +
								"var qty = $(\"input[type=radio][name=yourChoice]:checked\").val();" +
								"if (qty == \"useTextInput\"){" +
							        "qty = $(\"#quantityTxt\").val();" +
							    "}" +
								"if (isNaN(qty) || qty <= 0) {" +
						            "alert( \"Please enter a valid quantity before adding this item to your shopping cart.\");" +
						            "return false;" +
								"}" +
								"$(\"input[name=quantity]\",f).val(qty);" +
								"minicart.addToCart(f.attr(\"action\")+ \"?\" + f.serialize());" +
								"return false;";
						} else {
							submitAction =
								"var f = $(this).parents(\"form:first\");" +
								"minicart.addToCart(f.attr(\"action\")+ \"?\" + f.serialize());" +
								"return false;";
						}
						if (onclickText.indexOf("document.additem.submit()")>=0) {
							onclickText = onclickText.replace("document.additem.submit()",submitAction);
						} else {
							onclickText = onclickText.replace("addToCart()",submitAction);
						}
						onclickText = onclickText.replace(new RegExp("\\n", "g" )," ");
						var i = onclickText.indexOf("{")+1;
						var j = onclickText.lastIndexOf("}");
						onclickText = onclickText.substring(i, j-1);

						var addToMinicart = new Function("event", onclickText);
						if (foundItem) {
							anchorCollection[addToCartIndex].onclick = addToMinicart;
						} else {
							addToCartButton.click(addToMinicart);
						}
					}
				}
			}
		}


		$.each($("form[name=additem],form[action=/AddItemToCartController]"),modifyAddItemToCartForm);

		$.each($("a[href*=buyMembership]"), function (i,anchor){
			becomeAMemberAnchor(anchor);
		});

		$.each($("a[add_membership=1]"), function (i,anchor){
			becomeAMemberAnchor(anchor);
		});

		$.each($("a[href*=REIOrderItemUpdate]"), function (i,anchor){
			reiOrderItemUpdateAnchor(anchor);
		});

		$.each($("form[id*=wishlistaddtocartform]"), modifyWishlistAddToCartForm );

		frmOrderYakimaOrThuleFitGuide();

		prepareGiftCertificateAddToCart();

		rewriteGiftRegistryEditProducts();
	}

	function show(serviceCallUrl, successCallback) {
		hdrObj.closeMenu();
		cancelHide();
		if (!isVisible&&!isBusy) {
			setState("busy show");
			if ((serviceCallUrl) ||(!cartData)) {
				publicState = "busy";
				if (serviceCallUrl) {
					refreshCartData(serviceCallUrl, function() {
						setState("ready");
						m.slideDown("fast",  function() {
							isVisible = true;
							flashItemAddedToCart();
							refreshCart();
							whenNoLongerBusy();
							publicState = "ready";
                            //These calls are necessary for Ski-package/Collections pages
                            $( '#minicartContainer' ).trigger( 'minicartAnimationDone' );
						});
						if ($.isFunction(successCallback)) {
							successCallback();
						}
					});
				} else {
					refreshCartData("/minicart?storeId="+storeId,function() {
						setState("ready");
						m.slideDown("fast",  function() {
							isVisible = true;
							refreshCart();
							whenNoLongerBusy();
							publicState = "ready";
                            $( '#minicartContainer' ).trigger( 'minicartAnimationDone' );
						});
						if ($.isFunction(successCallback)) {
							successCallback();
						}
					});
				}
			} else {
				m.slideDown("fast",  function() {
					isVisible = true;
					setState("ready show");
					refreshCart();
					publicState = "ready";
                    $( '#minicartContainer' ).trigger( 'minicartAnimationDone' );
				});
			}
		}
		me.setVisibility(true);
		$("#minicartContainer").trigger("showCart");
	}

	function addItemAndForward(serviceCallUrl,forwardUrl) {
		if (typeof(serviceCallUrl)=='string'&&typeof(forwardUrl)=='string') {
			hdrObj.closeMenu();
			cancelHide();
			if (!isVisible&&!isBusy) {
				setState("busy show");
				if ((serviceCallUrl) ||(!cartData)) {
					publicState = "busy";
					refreshCartData(serviceCallUrl, function() {
						setState("ready");
						m.slideDown("fast",  function() {
							isVisible = true;
							flashItemAddedToCart();
							refreshCart();
							whenNoLongerBusy();
							publicState = "ready";
							window.location.href = forwardUrl;
						}, false);
					});
				}
			}
		}
	}


// Public Methods
	this.setVisibility = function(isVisible){
		$("#minicartContainer").css({visibility:isVisible ==  false ? "hidden" : "visible"});
	}
	this.showCart = function() {
		show();
	};
	this.hideCart = function(delay) {
		if (isNaN(delay)) {
			hide();
		} else {
			hide(delay);
		}
	};
	this.addToCart = function(serviceCallUrl,successCallback) {
		$("h3.lineA").show();
		show(serviceCallUrl,successCallback);
	};
	this.addItemAndForward = function(serviceCallUrl,forwardUrl) {
		addItemAndForward(serviceCallUrl,forwardUrl);
	};
	this.getState = getState;

	this.isBusy = function() {
		return (publicState=="busy");
	};

	this.onComplete = function(f) {
		if ($.isFunction(f)) {
			onCompleteFunction = f;
		}
	};

	this.beforeSubmit = function(f) {
		if ($.isFunction(f)) {
			beforeSubmitFunction = f;
		}
	};

	this.onSuccess = function(f) {
		if ($.isFunction(f)) {
			onSuccessFunction = f;
		}
	};

	this.onError = function(f) {
		if ($.isFunction(f)) {
			onErrorFunction = f;
		}
	};
	this.enableScrollToTop = function(b) {
		if (typeof b == 'boolean') {
			scrollToTopEnabled = true;
		}
	};
	this.disableScrollToTop = function(b) {
		if (typeof b == 'boolean') {
			scrollToTopEnabled = false;
		}
	};

	function initAnalytics(){
		//Minicart Events
		$("#minicartContainer")
			.bind("showCart", function(){
				//console.log("minicart, showCart event triggered");
				//console.log(s.pageName);
				$(this).find("a").unbind("analytics");

				// Exit function if rei.analytics.customPageLoad has already ran for the minicart
				if(s.pageName === "checkout:minicart"){
					return;
				}

				rei.analytics.customPageLoad({
					pageName: "checkout:minicart",
					pageURL: "/ShoppingCart",
					channel: "checkout",
					hier1: "checkout:minicart",
					prop1: "checkout:cart",
					prop2: "reicom",
					prop3: "minicart",
					prop6: "cart",
					prop7: "rei",
					prop9: "commerce"
				});
				//console.log(s.pageName);
			})
			.bind("hideCart", function(){
				//console.log("minicart, hideCart event triggered");
				//console.log(s.pageName);
				rei.analytics.resetTags().reloadCachedTags();
				//console.log(s.pageName);
			})
			.find("a, .jcarousel-next, .jcarousel-prev").unbind(".analytics")
			.live("click.analyticsMinicart", function(e){
				var _this = $(e.currentTarget);
				//console.log(e.currentTarget.tagName);
				//console.log(_this.is(".jcarousel-prev, .jcarousel-next"));
				if(e.currentTarget.tagName == "A" || (_this.is(".jcarousel-next, .jcarousel-prev") && _this.is(".in-product-page-js") === false)){
					var s = s_gi(s_account), linkText = _this.text().toLowerCase();
					linkText = (_this.is(".jcarousel-next")) ? "arrow next" : linkText;
					linkText = (_this.is(".jcarousel-prev")) ? "arrow prev" : linkText;
					s.eVar38="cm_re-_-minicart-_-" + linkText;
					s.eVar39="checkout:minicart";
					s.events = s.linkTrackEvents = "event68";
					s.linkTrackVars="events,eVar38,eVar39";
					s.tl(true,"o","RE Event");
					//console.log("sent event, " + s.eVar38);
				}
			});
	}

	// Initialization Code
	appendMinicartToContainer();
	modifyAddToCartBehaviours();
	initAnalytics();
	loadImages();
	m.click(function(e) {
		mclick =true;
	});
	$(document).click( function(){
		if (mclick) {
			mclick = false;
		} else {
			setState("ready");
			hide();
		}
	});

	setState("ready show");
	publicState = "ready";

	$(document).keyup = function(e){
		if (e == null) { // ie keycode = event.keyCode;
		} else { // mozilla
			keycode = e.which;
		}
		if(keycode == 27){ // close
			hide();
		}
	};
	window.document.onload = null;


	//Add Minicart Banner
	try{
		var minicartBanner = $.trim($('#gHMessaging').find('div').html());
		if(minicartBanner.length > 0){
				var mcfs = "<span class='mcfreeship'>" + $(minicartBanner).children("a:eq(0)").text() + "</span>";
				mcfs += "<span class='mcfreeshipmin'>" + $(minicartBanner).children("span:eq(0)").text() + "</span>";
				$(".mccheckout").after($('<div id="bannerMinicart" />').html(mcfs));
			}
		}catch(e){
			rei.error.push(e);
		}

	}

var minicart=0;
// minicart is initialized from rei.js
/* $Id$ */
/**
* Universal Header ( Legacy, CQ Clientlib)
* @requires 	jQuery, rei, rei.session
* @todo Some of this code is repeat in JBOSS's ultraTransform `rei-main`
*/
ReiUserLogin = {
	helloUserNameLabel  : "Hello ",
    welcomeUserLabel    : "Welcome to REI!",
    notUserLabel        : "Not "
};

var setup_cook_obj = ReadGRCookie("GiftRegistrySetup");

//these vars are for the JSP side of things where we don't have those variables at times.
var storeId = storeId || 0;
var storeClass = storeClass || '';

var hdrObj = {
	isModernBrowser: navigator.appName != 'Microsoft Internet Explorer' || $.browser.version > 8,
	isHelpMenu: false,
	helpMenuOpen: false,
	closeTimeout: '',
	noClick: function(e){
		e.preventDefault();
		e.stopPropagation();
	},
	setCartStatus: function(testItemsAmt){
		var miniCartHover ='miniCartHover';
		var miniCartClick = 'miniCartClick';
		testItemsAmt = parseInt((testItemsAmt||numOfItems), 10);

		/*
			FIX for ONLINE-12703 and INC203367
			@desc	We are emptying the rei_cart cookies for a user when the REI_SESSION_ID is empty.
		*/
		if(!rei.session.user.hasSession){
			$.cookie("rei_cart", "0", { expires: 14, path: "/" });
			testItemsAmt = 0;
		}

		if (testItemsAmt > 0) {
			if(document.body.className.indexOf('checkout') < 0){
				$('#ghCartNew').unbind('mouseover').bind('mouseover',function(e){
					$('#ghCartNew').addClass(miniCartHover);
					e.preventDefault();
					if(hdrObj.isModernBrowser == true){
						if($("#minicartContainer").css('visibility') == 'hidden'){
							if(window.minicart) minicart.showCart();
						}
					}
					else{
						if(window.minicart) minicart.showCart();
					}
					$('#itemAddedMsg').hide();
				}).unbind('mouseout').bind('mouseout', function(e){
							e.preventDefault();
							// Leave the Minicart when there is an error shown
							if ($("#minicartError[style='display: block;']").length > 0) {
								minicart.showCart();
								return;
							}
					if(window.minicart && hdrObj.isModernBrowser) minicart.setVisibility(false);
					$('#ghCartNew').removeClass(miniCartHover);
				}).bind('click', function(){
					$('#ghCartNew').removeClass(miniCartHover).addClass(miniCartClick);
				});
				$('#minicartContainer').bind('mouseover', function(e){
					if(hdrObj.isModernBrowser == true) $(this).css({visibility:'visible'});
				}).bind('mouseout', function(e){
					if(hdrObj.isModernBrowser == true) $(this).css({visibility:'hidden'});
				});
				$('#checkoutLink').unbind('mouseover').bind('mouseover',function(e){
					$('#ghCheckout').addClass(miniCartHover);
					e.preventDefault();
				}).unbind('mouseout').bind('mouseout', function(){
					$('#ghCheckout').removeClass(miniCartHover);
				}).bind('click', function(){
					$('#ghCheckout').removeClass(miniCartHover).addClass(miniCartClick);
				});
			}

			//Disable checkout button for checkout
			var isCheckoutSection = false;
			try{
				isCheckoutSection = rei.analytics && rei.analytics != null && typeof rei.analytics[0] == "object" && rei.analytics[0].site_section == 'checkout';
			}
			catch(err){}

			if( isCheckoutSection === true ){
				hdrObj.checkoutBtnDisable();
			} else if ($('.checkout').length > 0 && $('#shoppingBasket') == null ) {
				hdrObj.checkoutBtnDisable();
			} else {
				hdrObj.checkoutBtnEnable();
			}
		} else {
			hdrObj.checkoutBtnDisable();
		}

		$('#cartItemCount').html('<div data-ui="cartItemCount" style="margin-top:-3px;">'.concat((testItemsAmt > 999 ? '999+' : testItemsAmt),'</div>'));
		var cicMarginLeft = 180;
		if(testItemsAmt > 999){
			cicMarginLeft -= 12;
		}
		else if(testItemsAmt > 99){
			cicMarginLeft -= 10;
		}
		else if(testItemsAmt > 9){
			cicMarginLeft -= 6;
		}
		else{
			cicMarginLeft -= 1;

		}
		//if($.browser.msie && $.browser.version < 8){
			//$('#ghCartAndCheckout').css({'margin-left':cicMarginLeft});
		//}
		//$('#cartItemCount').css({'margin-left': cicMarginLeft});
	},
	//funcs for liveHelp
// TODO revise so now so many redraws
	liveChatOn: function(){
		$(document.getElementById('hdrLink_liveHelp')).css({display:'block'});
	},
	liveChatOff: function(){
		$(document.getElementById('hdrLink_liveHelp')).css({display:'none'});
	},
	checkoutBtnDisable: function(options){
		var coLink = document.getElementById('checkoutLink');
		coLink.className = 'cartLinkInactive';
		document.getElementById('ghDividerCart').className = 'dividerCartInactive';
		document.getElementById('ghCartAndCheckoutInner').className = 'cartInactive';
        document.getElementById('cartLink').className = 'cartLinkInactive'; // @todo remove me. this was added to fix a test.
		coLink.style.display = "block";
		coLink.onclick = hdrObj.noClick;
		return coLink;
	},
	checkoutBtnEnable: function(){
		var coLink = document.getElementById('checkoutLink');
		coLink.className = 'cartLinkActive';
		document.getElementById('ghDividerCart').className = 'dividerCartActive';
		document.getElementById('ghCartAndCheckoutInner').className = 'cartActive';
        document.getElementById('cartLink').className = 'cartLinkActive'; // @todo remove me. this was added to fix a test.
		return $(coLink).css("display","block").attr('onclick','').addClass(' hdrLink_checkoutBtnOns').attr('href', (
				(loggedIn == 1) ?
				''.concat(httpsHost, 'CheckCart?storeId=', storeId, '&checkInventory=Y')
				:
				''.concat(httpsHost, 'CheckoutLoginView?storeId=', storeId)
			));
	},
	checkoutBtnHide: function(){
		return $(document.getElementById('hdrLink_checkoutBtn')).css("display","none");
	},
	clearCookie: function(){
		document.cookie = 'rei_user_info' + "=" + "" + ";PATH=/";
		hdrObj.checkForUserName();
	},
	//misc funcs for helpMenu functionality
	closeMenu: function(){
		$(document.getElementById('helpMenu')).css({top: '-500px', display:'none'});
		$(document.getElementById('helpDDL')).removeClass('menuActive').unbind('mouseenter mouseleave');
		hdrObj.helpMenuOpen = false;
	},
	goToURL: function(strUrl){
		document.location.href = strUrl;
	},
	checkCartOption: function(){
		if(document.body.className.indexOf('checkout') < 0){
			if(window.minicart) minicart.showCart();
		}
	},
	init: function(){
	// init called from rei.js
		//TODO, consider moving to rei.js, makes sense to have this set in the rei namespace
		storeId = (storeId == 0 && rei.location.params != null && rei.location.params.storeId != undefined) ? rei.location.params.storeId : "8000";

		if(storeClass == ''){
			storeClass = document.body.className;
			if(storeClass.indexOf('adv') > -1){
				storeClass = 'adv';
			}
			else if(storeClass.indexOf('outlet') > -1){
				storeClass = 'outlet';
			}
			else{
				storeClass = 'rei';
			}
		}
	// setJSEnabledUX()
	var helpMenu = $(document.getElementById('helpMenu'));
	var helpMenuHotSpot = $(document.getElementById('helpDDL'));
	var firstOldBG = $('.first').css('background-color');
	var firstActiveBG = '#ffffff';
	helpMenuHotSpot.mouseover( function(e){
		helpMenuEvent = e;
		var hoverDelay = 0;
		window.setTimeout('showHelpMenu(helpMenuEvent);',hoverDelay);
	});
	helpMenu.hover(
		function(){//mouseOver
			hdrObj.isHelpMenu = true;
			$('.first').css({'background-color':firstActiveBG});
			helpMenuHotSpot.mouseover(e);
		},
		function(){//mouseOff
			$('.first').css({'background-color':firstOldBG});
			hdrObj.isHelpMenu = false;
			hdrObj.closeMenu();
		}
	);
	helpMenuHotSpot.mouseout( function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.first').css({'background-color':firstOldBG});
		window.setTimeout("eval('if(hdrObj.isHelpMenu == false)hdrObj.closeMenu();')",0);
	});
	//-- add event listeners --
		$(document).mousedown( function(event){
			try{
			if(!hdrObj.isHelpMenu && $(document.getElementById('helpMenu')).is(":visible") && hdrObj.helpMenuOpen){
				hdrObj.closeMenu();
			}
			}catch(err){}
		});
		$("a#helpMenuCloseButton").click( function(event){
			try{
				if($(document.getElementById('helpMenu')).is(":visible") && hdrObj.helpMenuOpen){
					hdrObj.closeMenu();
				}
				}catch(err){}
			});

	//now do other JSEnabled actions
	hdrObj.setCartStatus();
	hdrObj.checkForUserName();
	$(document.getElementById('hdrLink_liveHelp')).attr('href', 'javascript:'.concat(
		(storeClass == 'adv' || parseInt(storeId) == 8003) ? 'launchAdventureChatPopup();':'launchContactUsPopup("liveHelp_tab");',
		' hdrObj.closeMenu();'
	));
	if(parseInt(getCookie('events_cart'), 10) > 0){
		$(document.getElementById('hdrLink_events')).attr('href', '/DisplayCart');
	}
	if(parseInt(loggedIn) == 1){
		$(document.getElementById('hdrLink_orderStatus')).attr('href', '/OrderHistoryView?storeId=' + storeId);
	}

	$(document.getElementById("logOut")).bind("click",function(){
		setCookie("loggedin", "0");
	});

	var isWindows = true;
	try{
		isWindows = navigator.platform.toLowerCase().indexOf('win') == 0;
	}
	catch(e){

	}
	if(navigator.appName == 'Microsoft Internet Explorer'){
		if($.browser.version > 7){
			$('#gHMessaging').css({'margin-top':6});
		}
		else{
			$('.searchBtn .arrowBg').css({'margin-top':-3});
			$('.searchBtn .btnCTA').css({'margin-top':0});
		}
		if(hdrObj.isModernBrowser == false){
			$('.searchBtn').bind('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				$('#psearch').submit();
			});
		}
	}
	}, // init();
	checkForUserName: function(){
	var userName = getUserInfoCookie('userName');
	if(!userName || userName == '""' || userName == null || userName == ''){
		$(document.getElementById('welcomeUser')).html(ReiUserLogin.welcomeUserLabel + ' |').show();
		$(document.getElementById('loginRegister')).show();
		$(document.getElementById('notUser')).hide();
		$(document.getElementById('separatorB')).hide();
		$(document.getElementById('sepRegister')).hide();
		return false;
	}else{
		userName = userName.replace(/[+]/g, " ").substring(0, 20);
		if (loggedIn == 1) {
			//welcomeUser msg
			$(document.getElementById('helloUserName')).html(ReiUserLogin.helloUserNameLabel + ' ' + userName + '! |').show();
			$(document.getElementById('welcomeUser')).html('<a href="/YourAccountInfoInView?storeId=' + storeId + '&amp;stat=header_account">Your Account</a>').show();

			//show
			$(document.getElementById('separatorA')).show();
			$(document.getElementById('logOut')).show();

			//hide
			$(document.getElementById('loginRegister')).hide();
			$(document.getElementById('separatorB')).hide();
			$(document.getElementById('notUser')).hide();
		}
		else {
			//welcomeUser msg
			if(userName.length > 0){
				$(document.getElementById('welcomeUser')).html(ReiUserLogin.helloUserNameLabel + ' ' + userName + '!').show();
				$(document.getElementById('hdrLink_notUser')).html(ReiUserLogin.notUserLabel + ' ' + userName).click(hdrObj.clearCookie);
				$(document.getElementById('notUser')).show();
				$(document.getElementById('separatorB')).show();
			}
			else{
				//alert('weird condition hit: userName.length >1 and <= ZERO???');
				$(document.getElementById('welcomeUser')).html(ReiUserLogin.welcomeUserLabel + ' |').show();
				$(document.getElementById('notUser')).hide();
				$(document.getElementById('separatorB')).hide();
			}

			$(document.getElementById('loginRegister')).show();
			$(document.getElementById('logOut')).hide();
		}
	}
	} // checkForUserName()
}; // hdrObj

function showHelpMenu(e){
	try{
		e.preventDefault();
		e.stopPropagation();
	}
	catch(e){
		//ie browsers may land here
	}
	if(window.minicart){ minicart.hideCart(); }

	var hdr = hdrObj;
	hdr.helpMenuOpen = true;
	//trigger hover state to cancel hdrObj.closeMenu() call from document.click handler
	$(document.getElementById('helpDDL')).addClass('menuActive');
	$('.first').css({'background-color':'#ffffff'});
	$(document.getElementById('helpMenu')).show().css({'top':'38px'}).hover(
		function(){//mouseOver
			hdrObj.isHelpMenu = true;
		},
		function(){//mouseOff
			hdrObj.isHelpMenu = false;
		}
	);
}

$(document).ready(function(){
	$('.linklist3 li a').bind('click', function(){
		$(this).css({color:'#333333'});
	});
});
/* $Id$ */

function launch_chat_form()
{
    var chat_form_url = "/rei/livehelp/memformsecure1.html";
	var firstName = $(document.getElementById("firstName"));
	var chk = document.chk;
	if(!firstName.length && !chk) return;
	window.open(
	((!firstName.length) ? 
	chat_form_url.concat(
		"?bill_safname=", chk.bill_safname.value,
		"&amp;bill_salname=", chk.bill_salname.value,
		"&amp;bill_saaddr1=", chk.bill_saaddr1.value,
		"&amp;bill_sacity=", chk.bill_sacity.value,
		"&amp;bill_sazipc=", chk.bill_sazipc.value,
		"&amp;bill_saphone1=", chk.bill_saphone1.value,
		"&amp;bill_saemail1=", chk.bill_saemail1.value,
		"&amp;cm_sp=checkout*livehelp*general"
	): chat_form_url.concat(
		"?bill_safname=", firstName.val(),
		"&amp;bill_salname=", $(document.getElementById("lastName")).val(),
		"&amp;bill_saphone1=", $(document.getElementById("phone")).val(),
		"&amp;bill_saemail1=", $(document.getElementById("emailAddress")).val()
	)),"chat_form","width=600,height=425,scrollbars=1");
}
var isMemberChat,
isServiceChat,
isMemberLookUpChat,
isGearChat,
isOrderChat,
isAdventureChat;
function launchMemberChatPopup() {
	isMemberChat = 'yes';
	launchChatPopup();
}
function launchServiceChatPopup() {
	isServiceChat = 'yes';
	launchChatPopup();
}

function launchMemberLookupChatPopup(arrCustInfo, fromWhere) {
	isMemberLookUpChat = 'yes';
	//need to get variables from lookup tool
	if(arrCustInfo){ launchChatPopup(arrCustInfo, fromWhere); }
	else{ launchChatPopup(); }
}


function launchGearChatPopup() {

	isGearChat = 'yes';
	launchChatPopup();
}

function launchOrderChatPopup() {

	isOrderChat = 'yes';
	launchChatPopup();
}

function launchAdventureChatPopup() {

	isAdventureChat = 'yes';
	launchChatPopup();
}

function launchChatPopup(custCheckoutInfo, doWhat) {
	var winW;
	var winH;
	var newH;
	var loadPage;
	
	if (isMemberChat == 'yes'){
		loadPage = 'memformsecure1.html?cm_sp=checkout*livehelp*general';
		isMemberChat = '';
	}
	else if (isServiceChat == 'yes'){
		loadPage = 'memformsecure_service.html';
		isServiceChat = '';
	}	
	else if (isMemberLookUpChat == 'yes'){
		loadPage = 'memformsecure1.html';		
		if(custCheckoutInfo){
			if(doWhat == 'checkout' || doWhat == 'adventures'){
				loadPage += "?bill_safname=" + custCheckoutInfo[0] + "&bill_salname=" + custCheckoutInfo[1] + "&bill_saaddr1=" + custCheckoutInfo[2] + "&bill_sacity=" + custCheckoutInfo[3] + "&bill_sastate=" + custCheckoutInfo[4]  + "&bill_sazipc=" + custCheckoutInfo[5] + "&bill_saphone1=" + custCheckoutInfo[6] + "&bill_saemail1=" + custCheckoutInfo[7];
			}
			else if(doWhat == 'support' || doWhat == 'divLookupForm'){
				loadPage += "?bill_safname=" + custCheckoutInfo[0] + "&bill_salname=" + custCheckoutInfo[1] + "&bill_saemail1=" + custCheckoutInfo[2] + "&bill_saphone1=" + custCheckoutInfo[3];
			}
			else{}			
		}
		isMemberLookUpChat = '';
	}		
	else if (isGearChat == 'yes'){
		loadPage = 'genformsecure_gear.html';
		isGearChat = '';
	}
	else if (isOrderChat == 'yes'){
		loadPage = 'genformsecure_order.html';
		isOrderChat = '';
	}
	else if (isAdventureChat == 'yes'){
		loadPage = 'genformsecure_adventure.html';
		isAdventureChat = '';
	}
	else {
		loadPage = 'genformsecure.html?cm_sp=checkout*livehelp*general';
	}
// set a default target height for the window in case we can't calculate one dynamically

	var targetH = 425;

// set default height and width for the screen in case we can't sniff one

	var screenW = 600;
	var screenH = 425;

// get the screen width and height to make sure we don't size things inappropriately



// get window width and height. if we get it, we reset the default target height to
// the current window height.
// first property is IE implementation, second is Moz/Gecko/Saf.
// Moz/Gecko/Saf recognize IE function, but some return bad numbers, so
// calling it second corrects the var values.



// calculate the difference in height between the screen and the window



// we only resize the window if it's too tall to display the popup...

// ...or if it's so short that we think it will need to be resized to cover the popup


// set the new window height

// resize the parent window



// now we get the parent window position and move if absolutely necessary to work well with the popup.
// if we can't get it, we'll move the window to the top left by default

	topP = 1;
	leftP = 1;

// first method Moz/Gecko (Safari?), second method IE. For IE we can only get the position of the display screen,
// so we additionally subtract the height and width of the window frame and toolbars with default installation settings.



// failsafe to correct for unfriendly IE behavior


	
// move parent window and reset it to be resizable, which is sometimes loses in IE



// set top position and tweak width for chat popup window

	var chatTopP = topP + targetH;
	var chatW = winW - 8;
        self.name = "new";
	
//	var chatUrl = httpHost + '/rei/livehelp/genformsecure.html?cm_sp=checkout*livehelp*general'; replaces the line below this for interim.
	var chatUrl = '/rei/livehelp/' + loadPage;
	var newWindow = 'chatPopup';
//	var openParams ='width=800' + chatW +',height=300, top =' + chatTopP + ', left=10' + leftP;

	var openParams ='width=600' + chatW +',height=425, top =' + chatTopP + ', left=10' + leftP + ',resizable=1,scrollbars=1';
	
	chatPopupOpen = window.open(chatUrl, newWindow, openParams);
	if(window.focus){
		chatPopupOpen.focus();
	}
}

function launchContactUsPopup(activeTab) {
	// this opens the contact us popup window from /xsl/help/helpContacts.xsl
	
	var loadPage = '/helpContacts';
	if (activeTab) { loadPage = loadPage + '#' + activeTab; }
	var newWindow = 'chatPopup';
	var openParams = "width=600,height=500,titlebar=no,resizable=1,scrollbars=1";
	
	var chatPopupOpen = window.open(loadPage, newWindow, openParams);
	if(window.focus){
		chatPopupOpen.focus();
	}
}
/* liveHelp.js */
/* $Id$ */

// set a cookie for a particular name
function setCookie(name, value) {
   var docLocation = document.URL;
   var docLocationLen = docLocation.length;
   document.cookie = name + "=" + docLocationLen + "~" + escape(document.location) + escape(value) + ";PATH=/" ;
}
function readCookie (CookieName) {
  var lf = "\n";
  var CookieString = document.cookie;
  var CookieSet = CookieString.split (';');
  var SetSize = CookieSet.length;
  var CookiePieces
  var cookieValue = "";
  var x = 0;
  for (x = 0; ((x < SetSize) && (cookieValue == "")); x++) {
    CookiePieces = CookieSet[x].split ('=');
    if (CookiePieces[0].substring (0,1) == ' ') {
      CookiePieces[0] = CookiePieces[0].substring (1, CookiePieces[0].length);
    }
    if (CookiePieces[0] == CookieName) {
     if(CookiePieces[1])
     {
    	 cookieValue = CookiePieces[1];
     }
    }
  }
  return cookieValue;
}

function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

function Set_Cookie( name, value, expires)
{
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );
    
    /*
    if the expires variable is set, make the correct expires time, the current script below will set it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if ( expires ){
        expires = parseInt(expires) * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );
    
    document.cookie = name + "=" + escape( value ) + ";path=/" +( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" );
}

// this deletes the cookie when called
function Delete_Cookie( name, path, domain ) {
    if ( Get_Cookie( name ) ) document.cookie = name + "=" +
    ( ( path ) ? ";path=" + path : "") +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

/* $Id$ */

/* This code will set the continue shopping link that retains the users last search position for use by Shopping Basket page.*/
/* expires - number of days until cookie should expire. If not specified, session cookie */
function setCSCookie(name, value) { document.cookie=name+"="+value+"; path=/"; }
//function setCSCookie(name, value) { document.cookie=name+"="+value+"; expires="+expires_date.toGMTString()+"; path=/"; }
function setContinueShoppingCookie(url) { setCSCookie("rei_continue", escape(url)); }
function setDCSCookie(name, value, expires) {
// set time, it's in milliseconds
var today = new Date();
today.setTime(today.getTime());
/* if the expires variable is set, make the correct expires time, the current script below will set 
it for x number of days, to make it for hours, delete * 24, for minutes, delete * 60 * 24 */
if (expires) { expires = expires * 1000 * 60 * 60 * 24; }
var expires_date = new Date(today.getTime() + (expires)); /*var expdate = "Sun, 27-Sep-1998 11:59:59 GMT"*/
document.cookie=name+"="+value+"; expires="+expires_date.toGMTString()+"; path=/";
}
function setDatedContinueShoppingCookie(url, days) { setDCSCookie("rei_continue", url, days); }

function getPreferredPageSize() {
	// Get page size from URL
	var path = window.location.href;
	var pageSize = 29;
	var pageSizeIndex = path.indexOf("page_size", 0);
	if(pageSizeIndex > -1) {
		var pageSizeEndIndex = path.indexOf("&", pageSizeIndex);
		if(pageSizeEndIndex == -1) {
		    pageSizeEndIndex = path.length;
		}
		pageSize = path.substring(pageSizeIndex+10, pageSizeEndIndex);
	} else {
	// Get page size from cookie
      if (getCookie("searchPreferences") == null) {
      var searchPreferences = 'null';
      }
      else {
      var searchPreferences = getCookie("searchPreferences");
      }
      pageSizeIndex = searchPreferences.indexOf("page_size", 0);
      if(pageSizeIndex > -1) {
      var pageSizeEndIndex = searchPreferences.indexOf("%26", pageSizeIndex);
      if(pageSizeEndIndex == -1) {
      pageSizeEndIndex = searchPreferences.length;
      }
      pageSize = searchPreferences.substring(pageSizeIndex+10, pageSizeEndIndex);
      if (pageSize == 22) {
      pageSize = 29;
      }
      if (pageSize == 50) {
      pageSize = 57;
      }
      if (pageSize == 102) {
      pageSize = 109;
      }
      }
	}
    return pageSize;
}       
/* $Id$ */

var url = window.location.toString();
var loc = url.indexOf("storeId=");
var storeId = url.substring(loc+8,loc+12);
if(storeId/storeId != 1){
	storeId = '8000';
}
function addStoreId() {
	var pageLinks = document.getElementsByTagName('a');
	for(i=0; i<pageLinks.length; i++){
		var href = pageLinks[i].href
		var hasQuery = href.indexOf('?');
		var hasHash = href.indexOf('#');
		var toLoc = href.indexOf('storeId=');
		var isHelp = href.indexOf("/help/membership");
		if(toLoc == -1 && isHelp > -1){
			if(loc == -1){
				storeId = 8000;
			}
			if(hasQuery > -1 && hasHash == -1){
				href = href + '&storeId=' + storeId;
			}
			if(hasQuery == -1 && hasHash == -1){
				href = href + '?storeId=' + storeId;
			}
			if(hasQuery > -1 && hasHash > -1){
				href = href.substring(0, hasHash) + '&storeId=' + storeId + href.substring(hasHash);
			}
			if(hasQuery == -1 && hasHash > -1){
				href = href.substring(0, hasHash) + '?storeId=' + storeId + href.substring(hasHash);
			}
			document.getElementsByTagName('a')[i].href = href;
		}
	}
}

var helpAccordion = {
		init : function() {

			var helpAccordionHeader = $(".msg_head");

			helpAccordion.closeAllSections();

			//-- add event listeners --
			$("p.msg_head").click( function(event){
				try{
					helpAccordion.whenclick($(this));
				}catch(err){}
			});
		},

		whenclick : function(locationHeader) //toggle the section with class msg_body
		{
			if (locationHeader.next(".msg_body").is(":visible"))
			{
				helpAccordion.closeSection(locationHeader);
			}
			else
			{
			// closeAllSections is not compatible with the current standard.
			// All sections stay open unless a user clicks to close.
			// helpAccordion.closeAllSections();
				helpAccordion.openSection(locationHeader);
			}
		},
		openSection : function(currentSection){
			// for the clicked header switch a down arrow for a right arrow
			currentSection.find("span.rightArrowSmall").addClass("downArrowSmall").removeClass("rightArrowSmall");

			// for the clicked header switch the closed bottom to open
			currentSection.addClass("openBottom").removeClass("closeBottom");

			// msg_body always have gradients, just remove it from the open header
			currentSection.removeClass("gradient");

			// open the message body for the clicked header 
			currentSection.next(".msg_body").slideToggle(200);

		},
		closeSection : function(currentSection){
			// close the message body for the clicked header 
			currentSection.next(".msg_body").slideToggle(200);

			// change all the bottom open headers to closed
			currentSection.removeClass("openBottom").addClass("closeBottom");

			//all closed header have to have the gradient
			currentSection.addClass("gradient");

			// for message header, make and down arrow back to right arrows
			currentSection.find("span.downArrowSmall").removeClass("downArrowSmall").addClass("rightArrowSmall");

		},
		closeAllSections : function(){
			//look for any open message bodies and close them
			$(".msg_body").hide(); //hide all message bodies

			// change all the bottom open headers to closed
			$(".msg_head").removeClass("openBottom").addClass("closeBottom");

			//all closed header have to have the gradient
			$(".msg_head").removeClass("gradient");

			// for all message headers, make and down arrow back to right arrows
			$(".msg_head").find("span.downArrowSmall").removeClass("downArrowSmall").addClass("rightArrowSmall");
		},
		openAllSections : function(){
			//look for any closed message bodies and open them
			$(".msg_body").show(); //show all message bodies

			// change all the bottom open headers to closed
			$(".msg_head").removeClass("closeBottom").addClass("openBottom");

			//all closed header have to have the gradient
			$(".msg_head").addClass("gradient");

			// for all message headers, make and down arrow back to right arrows
			$(".msg_head").find("span.rightArrowSmall").addClass("downArrowSmall").removeClass("rightArrowSmall");
		}
}
/* $Id$ */

function initMarqueeImageSlideShow(componentId, imgCount, interval) 
{



	var imageCount = imgCount;
	var currImg = "#" + componentId + "-image1";
	var currThumb = "#" + componentId + "-thumb1";
	var currLeadThumb = "#" + componentId + "-leadThumb1";
	var prevImg = null;
	var prevThumb = null;
	var prevLeadThumb = null;
	var isPlaying = true;
	var indx = 0;
	var metronome = setTimeout(triggerSlide, interval);
	$(currThumb).addClass("activeBtn");
	$(currLeadThumb).addClass("activeThumb");
		
	function triggerSlide() 
	{
			prevImg = currImg;
			prevThumb = currThumb;
			prevLeadThumb = currLeadThumb;
			if (indx == (imageCount-1)) 
			{
				indx = 0;
				currImg = "#" + componentId + "-image1";
				currThumb = "#" + componentId + "-thumb1";
				currLeadThumb = "#" + componentId + "-leadThumb1";
				isPlaying = false;
			}
			else
			{
				indx += 1;
				currImg = "#" + componentId + "-image" + (indx + 1);
				currThumb = "#" + componentId + "-thumb" + (indx + 1);
				currLeadThumb = "#" + componentId + "-leadThumb" +(indx + 1);
			}
			fade();
			
			if(isPlaying)
			{
				metronome = setTimeout(triggerSlide, interval);
			}
	}
	
	/*--    THUMB CLICK EVENT HANDLER    -----------------------*/                    
	$("#" + componentId + "-thumbs li a").click(function () {
		clearTimeout(metronome);
		isPlaying = false;
		if (currImg) 
		{ 
			prevImg = currImg; 
		}
		if (currThumb) 
		{ 
			prevThumb = currThumb;
		}
		if(currLeadThumb)
		{
			prevLeadThumb = currLeadThumb;
		}
		//indx = (this.id).substring(this.id.length-1, this.id.length) - 1;
		indx = $("#" + componentId + "-thumbs li a").index(this);
		currThumb = "#" + componentId + "-thumb" + (indx + 1);
		currImg = "#" + componentId + "-image" + (indx + 1);
		currLeadThumb = "#" + componentId + "-leadThumb" +(indx + 1);
		fade();
	});
	
	function fade() 
	{
		if (currImg != prevImg) 
		{
			$(currImg).css("z-index", "auto").fadeIn("slow");
			$(currThumb).addClass("activeBtn");
			$(currLeadThumb).addClass("activeThumb");
			$(prevThumb).removeClass("activeBtn");
			$(prevLeadThumb).removeClass("activeThumb");
			if(prevImg){ $(prevImg).css("z-index", "auto").fadeOut("fast");}
		}	
	}
}
/* jquery.tablesorter.pager.js */
(function($) {
	$.extend({
		tablesorterPager: new function() {
			
			function updatePageDisplay(c) {
				var s = $(c.cssPageDisplay,c.container).val((c.page+1) + c.seperator + c.totalPages);	
			}
			
			function setPageSize(table,size) {
				var c = table.config;
				c.size = size;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				c.pagerPositionSet = false;
				moveToPage(table);
				fixPosition(table);
			}
			
			function fixPosition(table) {
				var c = table.config;
				if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				}
			}
			
			function moveToFirstPage(table) {
				var c = table.config;
				c.page = 0;
				moveToPage(table);
			}
			
			function moveToLastPage(table) {
				var c = table.config;
				c.page = (c.totalPages-1);
				moveToPage(table);
			}
			
			function moveToNextPage(table) {
				var c = table.config;
				c.page++;
				if(c.page >= (c.totalPages-1)) {
					c.page = (c.totalPages-1);
				}
				moveToPage(table);
			}
			
			function moveToPrevPage(table) {
				var c = table.config;
				c.page--;
				if(c.page <= 0) {
					c.page = 0;
				}
				moveToPage(table);
			}
						
			
			function moveToPage(table) {
				var c = table.config;
				if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				}
				
				renderTable(table,c.rowsCopy);
			}
			
			function renderTable(table,rows) {
				
				var c = table.config;
				var l = rows.length;
				var s = (c.page * c.size);
				var e = (s + c.size);
				if(e > rows.length ) {
					e = rows.length;
				}
				
				
				var tableBody = $(table.tBodies[0]);
				
				// clear the table body
				
				$.tablesorter.clearTableBody(table);
				
				for(var i = s; i < e; i++) {
					
					//tableBody.append(rows[i]);
					
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						
						tableBody[0].appendChild(o[j]);

					}
				}
				
				fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
				if( c.page >= c.totalPages ) {
        			moveToLastPage(table);
				}
				
				updatePageDisplay(c);
			}
			
			this.appender = function(table,rows) {
				
				var c = table.config;
				
				c.rowsCopy = rows;
				c.totalRows = rows.length;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				renderTable(table,rows);
			};
			
			this.defaults = {
				size: 20,
				offset: 0,
				page: 0,
				totalRows: 0,
				totalPages: 0,
				container: null,
				cssNext: '.next',
				cssPrev: '.prev',
				cssFirst: '.first',
				cssLast: '.last',
				cssPageDisplay: '.pagedisplay',
				cssPageSize: '.pagesize',
				seperator: " | ",
				positionFixed: true,
				appender: this.appender
			};
			
			this.construct = function(settings) {
				
				return this.each(function() {	
					
					config = $.extend(this.config, $.tablesorterPager.defaults, settings);
					
					var table = this, pager = config.container;
				
					$(this).trigger("appendCache");
					
					config.size = parseInt($(".pagesize",pager).val());
					
					$(config.cssFirst,pager).click(function() {
						moveToFirstPage(table);
						return false;
					});
					$(config.cssNext,pager).click(function() {
						moveToNextPage(table);
						return false;
					});
					$(config.cssPrev,pager).click(function() {
						moveToPrevPage(table);
						return false;
					});
					$(config.cssLast,pager).click(function() {
						moveToLastPage(table);
						return false;
					});
					$(config.cssPageSize,pager).change(function() {
						setPageSize(table,parseInt($(this).val()));
						return false;
					});
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({
        tablesorterPager: $.tablesorterPager.construct
	});
	
})(jQuery);
/* jquery.tablesorter.pager.js */
/*
 * 
 * TableSorter 2.0 - Client-side table sorting with ease!
 * Version 2.0.3
 * @requires jQuery v1.2.3
 * 
 * Copyright (c) 2007 Christian Bach
 * Examples and docs at: http://tablesorter.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 */
/**
 *
 * @description Create a sortable table with multi-column sorting capabilitys
 * 
 * @example $('table').tablesorter();
 * @desc Create a simple tablesorter interface.
 *
 * @example $('table').tablesorter({ sortList:[[0,0],[1,0]] });
 * @desc Create a tablesorter interface and sort on the first and secound column in ascending order.
 * 
 * @example $('table').tablesorter({ headers: { 0: { sorter: false}, 1: {sorter: false} } });
 * @desc Create a tablesorter interface and disableing the first and secound column headers.
 * 
 * @example $('table').tablesorter({ 0: {sorter:"integer"}, 1: {sorter:"currency"} });
 * @desc Create a tablesorter interface and set a column parser for the first and secound column.
 * 
 * 
 * @param Object settings An object literal containing key/value pairs to provide optional settings.
 * 
 * @option String cssHeader (optional) 			A string of the class name to be appended to sortable tr elements in the thead of the table. 
 * 												Default value: "header"
 * 
 * @option String cssAsc (optional) 			A string of the class name to be appended to sortable tr elements in the thead on a ascending sort. 
 * 												Default value: "headerSortUp"
 * 
 * @option String cssDesc (optional) 			A string of the class name to be appended to sortable tr elements in the thead on a descending sort. 
 * 												Default value: "headerSortDown"
 * 
 * @option String sortInitialOrder (optional) 	A string of the inital sorting order can be asc or desc. 
 * 												Default value: "asc"
 * 
 * @option String sortMultisortKey (optional) 	A string of the multi-column sort key. 
 * 												Default value: "shiftKey"
 * 
 * @option String textExtraction (optional) 	A string of the text-extraction method to use. 
 * 												For complex html structures inside td cell set this option to "complex", 
 * 												on large tables the complex option can be slow. 
 * 												Default value: "simple"
 * 
 * @option Object headers (optional) 			An array containing the forces sorting rules. 
 * 												This option let's you specify a default sorting rule. 
 * 												Default value: null
 * 
 * @option Array sortList (optional) 			An array containing the forces sorting rules. 
 * 												This option let's you specify a default sorting rule. 
 * 												Default value: null
 * 
 * @option Array sortForce (optional) 			An array containing forced sorting rules. 
 * 												This option let's you specify a default sorting rule, which is prepended to user-selected rules.
 * 												Default value: null
 *  
  * @option Array sortAppend (optional) 			An array containing forced sorting rules. 
 * 												This option let's you specify a default sorting rule, which is appended to user-selected rules.
 * 												Default value: null
 * 
 * @option Boolean widthFixed (optional) 		Boolean flag indicating if tablesorter should apply fixed widths to the table columns.
 * 												This is usefull when using the pager companion plugin.
 * 												This options requires the dimension jquery plugin.
 * 												Default value: false
 *
 * @option Boolean cancelSelection (optional) 	Boolean flag indicating if tablesorter should cancel selection of the table headers text.
 * 												Default value: true
 *
 * @option Boolean debug (optional) 			Boolean flag indicating if tablesorter should display debuging information usefull for development.
 *
 * @type jQuery
 *
 * @name tablesorter
 * 
 * @cat Plugins/Tablesorter
 * 
 * @author Christian Bach/christian.bach@polyester.se
 */

(function($) {
	$.extend({
		tablesorter: new function() {
			
			var parsers = [], widgets = [];
			
			this.defaults = {
				cssHeader: "header",
				cssAsc: "headerSortUp",
				cssDesc: "headerSortDown",
				sortInitialOrder: "asc",
				sortMultiSortKey: "shiftKey",
				sortForce: null,
				sortAppend: null,
				textExtraction: "simple",
				parsers: {}, 
				widgets: [],		
				widgetZebra: {css: ["even","odd"]},
				headers: {},
				widthFixed: false,
				cancelSelection: true,
				sortList: [],
				headerList: [],
				dateFormat: "us",
				decimal: '.',
				debug: false
			};
			
			/* debuging utils */
			function benchmark(s,d) {
				log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
			}
			
			this.benchmark = benchmark;
			
			function log(s) {
				if (typeof console != "undefined" && typeof console.debug != "undefined") {
					console.log(s);
				} else {
					alert(s);
				}
			}
						
			/* parsers utils */
			function buildParserCache(table,$headers) {
				
				if(table.config.debug) { var parsersDebug = ""; }
				
				var rows = table.tBodies[0].rows;
				
				if(table.tBodies[0].rows[0]) {

					var list = [], cells = rows[0].cells, l = cells.length;
					
					for (var i=0;i < l; i++) {
						var p = false;
						
						if($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)  ) {
						
							p = getParserById($($headers[i]).metadata().sorter);	
						
						} else if((table.config.headers[i] && table.config.headers[i].sorter)) {
	
							p = getParserById(table.config.headers[i].sorter);
						}
						if(!p) {
							p = detectParserForColumn(table,cells[i]);
						}
	
						if(table.config.debug) { parsersDebug += "column:" + i + " parser:" +p.id + "\n"; }
	
						list.push(p);
					}
				}
				
				if(table.config.debug) { log(parsersDebug); }

				return list;
			};
			
			function detectParserForColumn(table,node) {
				var l = parsers.length;
				for(var i=1; i < l; i++) {
					if(parsers[i].is($.trim(getElementText(table.config,node)),table,node)) {
						return parsers[i];
					}
				}
				// 0 is always the generic parser (text)
				return parsers[0];
			}
			
			function getParserById(name) {
				var l = parsers.length;
				for(var i=0; i < l; i++) {
					if(parsers[i].id.toLowerCase() == name.toLowerCase()) {	
						return parsers[i];
					}
				}
				return false;
			}
			
			/* utils */
			function buildCache(table) {
				
				if(table.config.debug) { var cacheTime = new Date(); }
				
				
				var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
					totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
					parsers = table.config.parsers, 
					cache = {row: [], normalized: []};
				
					for (var i=0;i < totalRows; ++i) {
					
						/** Add the table data to main data array */
						var c = table.tBodies[0].rows[i], cols = [];
					
						cache.row.push($(c));
						
						for(var j=0; j < totalCells; ++j) {
							cols.push(parsers[j].format(getElementText(table.config,c.cells[j]),table,c.cells[j]));	
						}
												
						cols.push(i); // add position for rowCache
						cache.normalized.push(cols);
						cols = null;
					};
				
				if(table.config.debug) { benchmark("Building cache for " + totalRows + " rows:", cacheTime); }
				
				return cache;
			};
			
			function getElementText(config,node) {
				
				if(!node) return "";
								
				var t = "";
				
				if(config.textExtraction == "simple") {
					if(node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
						t = node.childNodes[0].innerHTML;
					} else {
						t = node.innerHTML;
					}
				} else {
					if(typeof(config.textExtraction) == "function") {
						t = config.textExtraction(node);
					} else { 
						t = $(node).text();
					}	
				}
				return t;
			}
			
			function appendToTable(table,cache) {
				
				if(table.config.debug) {var appendTime = new Date()}
				
				var c = cache, 
					r = c.row, 
					n= c.normalized, 
					totalRows = n.length, 
					checkCell = (n[0].length-1), 
					tableBody = $(table.tBodies[0]),
					rows = [];
				
				for (var i=0;i < totalRows; i++) {
					rows.push(r[n[i][checkCell]]);	
					if(!table.config.appender) {
						
						var o = r[n[i][checkCell]];
						var l = o.length;
						for(var j=0; j < l; j++) {
							
							tableBody[0].appendChild(o[j]);
						
						}
						
						//tableBody.append(r[n[i][checkCell]]);
					}
				}	
				
				if(table.config.appender) {
				
					table.config.appender(table,rows);	
				}
				
				rows = null;
				
				if(table.config.debug) { benchmark("Rebuilt table:", appendTime); }
								
				//apply table widgets
				applyWidget(table);
				
				// trigger sortend
				setTimeout(function() {
					$(table).trigger("sortEnd");	
				},0);
				
			};
			
			function buildHeaders(table) {
				
				if(table.config.debug) { var time = new Date(); }
				
				var meta = ($.metadata) ? true : false, tableHeadersRows = [];
			
				for(var i = 0; i < table.tHead.rows.length; i++) { tableHeadersRows[i]=0; };
				
				$tableHeaders = $("thead th",table);
		
				$tableHeaders.each(function(index) {
							
					this.count = 0;
					this.column = index;
					this.order = formatSortingOrder(table.config.sortInitialOrder);
					
					if(checkHeaderMetadata(this) || checkHeaderOptions(table,index)) this.sortDisabled = true;
					
					if(!this.sortDisabled) {
						$(this).addClass(table.config.cssHeader);
					}
					
					// add cell to headerList
					table.config.headerList[index]= this;
				});
				
				if(table.config.debug) { benchmark("Built headers:", time); log($tableHeaders); }
				
				return $tableHeaders;
				
			};
						
		   	function checkCellColSpan(table, rows, row) {
                var arr = [], r = table.tHead.rows, c = r[row].cells;
				
				for(var i=0; i < c.length; i++) {
					var cell = c[i];
					
					if ( cell.colSpan > 1) { 
						arr = arr.concat(checkCellColSpan(table, headerArr,row++));
					} else  {
						if(table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row+1])) {
							arr.push(cell);
						}
						//headerArr[row] = (i+row);
					}
				}
				return arr;
			};
			
			function checkHeaderMetadata(cell) {
				if(($.metadata) && ($(cell).metadata().sorter === false)) { return true; };
				return false;
			}
			
			function checkHeaderOptions(table,i) {	
				if((table.config.headers[i]) && (table.config.headers[i].sorter === false)) { return true; };
				return false;
			}
			
			function applyWidget(table) {
				var c = table.config.widgets;
				var l = c.length;
				for(var i=0; i < l; i++) {
					
					getWidgetById(c[i]).format(table);
				}
				
			}
			
			function getWidgetById(name) {
				var l = widgets.length;
				for(var i=0; i < l; i++) {
					if(widgets[i].id.toLowerCase() == name.toLowerCase() ) {
						return widgets[i]; 
					}
				}
			};
			
			function formatSortingOrder(v) {
				
				if(typeof(v) != "Number") {
					i = (v.toLowerCase() == "desc") ? 1 : 0;
				} else {
					i = (v == (0 || 1)) ? v : 0;
				}
				return i;
			}
			
			function isValueInArray(v, a) {
				var l = a.length;
				for(var i=0; i < l; i++) {
					if(a[i][0] == v) {
						return true;	
					}
				}
				return false;
			}
				
			function setHeadersCss(table,$headers, list, css) {
				// remove all header information
				$headers.removeClass(css[0]).removeClass(css[1]);
				
				var h = [];
				$headers.each(function(offset) {
						if(!this.sortDisabled) {
							h[this.column] = $(this);					
						}
				});
				
				var l = list.length; 
				for(var i=0; i < l; i++) {
					h[list[i][0]].addClass(css[list[i][1]]);
				}
			}
			
			function fixColumnWidth(table,$headers) {
				var c = table.config;
				if(c.widthFixed) {
					var colgroup = $('<colgroup>');
					$("tr:first td",table.tBodies[0]).each(function() {
						colgroup.append($('<col>').css('width',$(this).width()));
					});
					$(table).prepend(colgroup);
				};
			}
			
			function updateHeaderSortCount(table,sortList) {
				var c = table.config, l = sortList.length;
				for(var i=0; i < l; i++) {
					var s = sortList[i], o = c.headerList[s[0]];
					o.count = s[1];
					o.count++;
				}
			}
			
			/* sorting methods */
			function multisort(table,sortList,cache) {
				
				if(table.config.debug) { var sortTime = new Date(); }
				
				var dynamicExp = "var sortWrapper = function(a,b) {", l = sortList.length;
					
				for(var i=0; i < l; i++) {
					
					var c = sortList[i][0];
					var order = sortList[i][1];
					var s = (getCachedSortType(table.config.parsers,c) == "text") ? ((order == 0) ? "sortText" : "sortTextDesc") : ((order == 0) ? "sortNumeric" : "sortNumericDesc");
					
					var e = "e" + i;
					
					dynamicExp += "var " + e + " = " + s + "(a[" + c + "],b[" + c + "]); ";
					dynamicExp += "if(" + e + ") { return " + e + "; } ";
					dynamicExp += "else { ";
				}
				
				// if value is the same keep orignal order	
				var orgOrderCol = cache.normalized[0].length - 1;
				dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
						
				for(var i=0; i < l; i++) {
					dynamicExp += "}; ";
				}
				
				dynamicExp += "return 0; ";	
				dynamicExp += "}; ";	
				
				eval(dynamicExp);
				
				cache.normalized.sort(sortWrapper);
				
				if(table.config.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order+ " time:", sortTime); }
				
				return cache;
			};
			
			function sortText(a,b) {
				return ((a < b) ? -1 : ((a > b) ? 1 : 0));
			};
			
			function sortTextDesc(a,b) {
				return ((b < a) ? -1 : ((b > a) ? 1 : 0));
			};	
			
	 		function sortNumeric(a,b) {
				return a-b;
			};
			
			function sortNumericDesc(a,b) {
				return b-a;
			};
			
			function getCachedSortType(parsers,i) {
				return parsers[i].type;
			};
			
			/* public methods */
			this.construct = function(settings) {

				return this.each(function() {
					
					if(!this.tHead || !this.tBodies) return;
					
					var $this, $document,$headers, cache, config, shiftDown = 0, sortOrder;
					
					this.config = {};
					
					config = $.extend(this.config, $.tablesorter.defaults, settings);
					
					// store common expression for speed					
					$this = $(this);
					
					// build headers
					$headers = buildHeaders(this);
					
					// try to auto detect column type, and store in tables config
					this.config.parsers = buildParserCache(this,$headers);
					
					
					// build the cache for the tbody cells
					cache = buildCache(this);
					
					// get the css class names, could be done else where.
					var sortCSS = [config.cssDesc,config.cssAsc];
					
					// fixate columns if the users supplies the fixedWidth option
					fixColumnWidth(this);
					
					// apply event handling to headers
					// this is to big, perhaps break it out?
					$headers.click(function(e) {
						
						$this.trigger("sortStart");
						
						var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
						
						if(!this.sortDisabled && totalRows > 0) {
							
							
							// store exp, for speed
							var $cell = $(this);
	
							// get current column index
							var i = this.column;
							
							// get current column sort order
							this.order = this.count++ % 2;
							
							// user only whants to sort on one column
							if(!e[config.sortMultiSortKey]) {
								
								// flush the sort list
								config.sortList = [];
								
								if(config.sortForce != null) {
									var a = config.sortForce; 
									for(var j=0; j < a.length; j++) {
										if(a[j][0] != i) {
											config.sortList.push(a[j]);
										}
									}
								}
								
								// add column to sort list
								config.sortList.push([i,this.order]);
							
							// multi column sorting
							} else {
								// the user has clicked on an all ready sortet column.
								if(isValueInArray(i,config.sortList)) {	 
									
									// revers the sorting direction for all tables.
									for(var j=0; j < config.sortList.length; j++) {
										var s = config.sortList[j], o = config.headerList[s[0]];
										if(s[0] == i) {
											o.count = s[1];
											o.count++;
											s[1] = o.count % 2;
										}
									}	
								} else {
									// add column to sort list array
									config.sortList.push([i,this.order]);
								}
							};
							setTimeout(function() {
								//set css for headers
								setHeadersCss($this[0],$headers,config.sortList,sortCSS);
								appendToTable($this[0],multisort($this[0],config.sortList,cache));
							},1);
							// stop normal event by returning false
							return false;
						}
					// cancel selection	
					}).mousedown(function() {
						if(config.cancelSelection) {
							this.onselectstart = function() {return false};
							return false;
						}
					});
					
					// apply easy methods that trigger binded events
					$this.bind("update",function() {
						
						// rebuild parsers.
						this.config.parsers = buildParserCache(this,$headers);
						
						// rebuild the cache map
						cache = buildCache(this);
						
					}).bind("sorton",function(e,list) {
						
						$(this).trigger("sortStart");
						
						config.sortList = list;
						
						// update and store the sortlist
						var sortList = config.sortList;
						
						// update header count index
						updateHeaderSortCount(this,sortList);
						
						//set css for headers
						setHeadersCss(this,$headers,sortList,sortCSS);
						
						
						// sort the table and append it to the dom
						appendToTable(this,multisort(this,sortList,cache));

					}).bind("appendCache",function() {
						
						appendToTable(this,cache);
					
					}).bind("applyWidgetId",function(e,id) {
						
						getWidgetById(id).format(this);
						
					}).bind("applyWidgets",function() {
						// apply widgets
						applyWidget(this);
					});
					
					if($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
						config.sortList = $(this).metadata().sortlist;
					}
					// if user has supplied a sort list to constructor.
					if(config.sortList.length > 0) {
						$this.trigger("sorton",[config.sortList]);	
					}
					
					// apply widgets
					applyWidget(this);
				});
			};
			
			this.addParser = function(parser) {
				var l = parsers.length, a = true;
				for(var i=0; i < l; i++) {
					if(parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
						a = false;
					}
				}
				if(a) { parsers.push(parser); };
			};
			
			this.addWidget = function(widget) {
				widgets.push(widget);
			};
			
			this.formatFloat = function(s) {
				var i = parseFloat(s);
				return (isNaN(i)) ? 0 : i;
			};
			this.formatInt = function(s) {
				var i = parseInt(s);
				return (isNaN(i)) ? 0 : i;
			};
			
			this.isDigit = function(s,config) {
				var DECIMAL = '\\' + config.decimal;
				var exp = '/(^[+]?0(' + DECIMAL +'0+)?$)|(^([-+]?[1-9][0-9]*)$)|(^([-+]?((0?|[1-9][0-9]*)' + DECIMAL +'(0*[1-9][0-9]*)))$)|(^[-+]?[1-9]+[0-9]*' + DECIMAL +'0+$)/';
				return RegExp(exp).test($.trim(s));
			};
			
			this.clearTableBody = function (table) {
                function empty() {
                    while (this.firstChild) this.removeChild(this.firstChild);
                }
                empty.apply(table.tBodies[0]);
            };
		}
	});
	
	// extend plugin scope
	$.fn.extend({
        tablesorter: $.tablesorter.construct
	});
	
	var ts = $.tablesorter;
	
	// add default parsers
	ts.addParser({
		id: "text",
		is: function(s) {
			return true;
		},
		format: function(s) {
			return $.trim(s.toLowerCase());
		},
		type: "text"
	});
	
	ts.addParser({
		id: "digit",
		is: function(s,table) {
			var c = table.config;
			return $.tablesorter.isDigit(s,c);
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s);
		},
		type: "numeric"
	});
	
	ts.addParser({
		id: "currency",
		is: function(s) {
			return /^[£$€?.]/.test(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(new RegExp(/[^0-9.]/g),""));
		},
		type: "numeric"
	});
	
	ts.addParser({
		id: "ipAddress",
		is: function(s) {
			return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
		},
		format: function(s) {
			var a = s.split("."), r = "", l = a.length;
			for(var i = 0; i < l; i++) {
				var item = a[i];
			   	if(item.length == 2) {
					r += "0" + item;
			   	} else {
					r += item;
			   	}
			}
			return $.tablesorter.formatFloat(r);
		},
		type: "numeric"
	});
	
	ts.addParser({
		id: "url",
		is: function(s) {
			return /^(https?|ftp|file):\/\/$/.test(s);
		},
		format: function(s) {
			return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));
		},
		type: "text"
	});
	
	ts.addParser({
		id: "isoDate",
		is: function(s) {
			return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(new RegExp(/-/g),"/")).getTime() : "0");
		},
		type: "numeric"
	});
		
	ts.addParser({
		id: "percent",
		is: function(s) { 
			return /\%$/.test($.trim(s));
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "usLongDate",
		is: function(s) {
			return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
		},
		format: function(s) {
			return $.tablesorter.formatFloat(new Date(s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
		id: "shortDate",
		is: function(s) {
			return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
		},
		format: function(s,table) {
			var c = table.config;
			s = s.replace(/\-/g,"/");
			if(c.dateFormat == "us") {
				// reformat the string in ISO format
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
			} else if(c.dateFormat == "uk") {
				//reformat the string in ISO format
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
			} else if(c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");	
			}
			return $.tablesorter.formatFloat(new Date(s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
	    id: "time",
	    is: function(s) {
	        return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
	    },
	    format: function(s) {
	        return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
	    },
	  type: "numeric"
	});
	
	
	ts.addParser({
	    id: "metadata",
	    is: function(s) {
	        return false;
	    },
	    format: function(s,table,cell) {
			var c = table.config, p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
	        return $(cell).metadata()[p];
	    },
	  type: "numeric"
	});
	
	// add default widgets
	ts.addWidget({
		id: "zebra",
		format: function(table) {
			if(table.config.debug) { var time = new Date(); }
			$("tr:visible",table.tBodies[0])
	        .filter(':even')
	        .removeClass(table.config.widgetZebra.css[1]).addClass(table.config.widgetZebra.css[0])
	        .end().filter(':odd')
	        .removeClass(table.config.widgetZebra.css[0]).addClass(table.config.widgetZebra.css[1]);
			if(table.config.debug) { $.tablesorter.benchmark("Applying Zebra widget", time); }
		}
	});	
})(jQuery);
(function($) {
	$.extend({
		tablesorterMultiPager: new function() {
		
		              function setCookie(c_name,value,expiredays) {
                                                var exdate=new Date();
                                                exdate.setDate(exdate.getDate()+expiredays);
                                                document.cookie=c_name+ "=" +escape(value)+
                                                    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
                                            }
			
			function updatePageDisplay(table) {
			              
			              var c = table.config;
			              if (c.totalRows >= c.minItemsForPaging) {
    			                  var multiPager = 
                                                                    "<div class='show' id='pages' style='padding-left:30px; padding-right:30px; top-margin:8px' >" +
                                                                        "<a href='#'  class='previousBtn' id='" + (c.page-1) + "'><div class='arrowLeft'></div></a>";
                                                              for (var i = 0; i < c.totalPages; i++)  {
                                                                  if ((i  > (c.page - 5)) && (i  < (c.page + 5))) { 
                                                                    if (i  == c.page) {
                                                                        multiPager = multiPager +
                                                                            "<div class='current'>" + (i + 1) + "</div>";
                                                                    } else {
                                                                        multiPager = multiPager +
                                                                            "<a href='#' id='" + i  + "' >" + (i + 1) + "</a>";
                                                                    }
                                                                  }
                                                              }
                                                               multiPager = multiPager +
                                                                        "<a href='#' class='nextBtn' id='" + (c.page+1) + "'><div class='arrowRight'></div></a>" +
                                                                    "</div>" +
                                                                    "<div class='show' >" + 
                                                                        c.items + " per page: " +
                                                                        "<select name='itemsPerPage'>" +
                                                                        "<option style='padding-right:4px;' value='5'>5</option>" +
                                                                        "<option style='padding-right:4px;' value='10'>10</option>" +
                                                                        "<option style='padding-right:4px;' value='15'>15</option>" +
                                                                        "<option style='padding-right:4px;' value='20'>20</option>"
                                                                        "</select>" +
                                                                    "</div>";
                                                                $('.MultiPager > *').remove();
	    		                    $('.MultiPager').append(multiPager);
	    		                    
	    		                    $('.MultiPager option[value="' + c.size +'"]').attr('selected', true);
	    		                    
	    		                    if (c.page == 0) {
	    		                        $('.MultiPager #pages .previousBtn').hide();
        	    		                    }
			                    if (c.page == (c.totalPages - 1)) {
			                        $('.MultiPager #pages .nextBtn').hide();
			                    }
			                
			                    // events
			                    $('.MultiPager #pages a').click( function() {
			                        var pageNum = $(this).attr('id');
    		                        if (pageNum) {
      		                            c.page = parseInt(pageNum);
      			                        moveToPage(table);
      			                        
      			                        var o = $('.MultiPager').offset();
                                        $('html, body').animate({
                                          scrollTop: o.top - 60
                                        }, 1000);
            			           }
            			         return false;
				                });
			                 
                                $(".MultiPager select[name='itemsPerPage']").change(function() { 
                                    setPageSize(table, parseInt($(this).find('option:selected').val(), 10));
                                    
                                    var o = $('.MultiPager').offset();
                                    $('html, body').animate({
                                      scrollTop: o.top - 60
                                    }, 1000);
                                    return false;
                                });
                                                    }
			}
			
			function setPageSize(table,size) {
				var c = table.config;
				c.size = size;
				setCookie("itemsPerPage",size,365);
				c.totalPages = Math.ceil(c.totalRows / c.size);
				c.pagerPositionSet = false;
				moveToPage(table);
				fixPosition(table);
			}
			
			function fixPosition(table) {
				var c = table.config;
				
			              if (c.totalRows >= c.minItemsForPaging) {
				    if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				    }
				}
			}
						
			
			function moveToPage(table) {
				var c = table.config;
				
			              if (c.totalRows >= c.minItemsForPaging) {
				    if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				    }
// In CQ5 we now deal with random unique IDs created for each table element.  The scrollTop must be placed within the JSP.
//				    $( 'html, body' ).delay(500).animate( { scrollTop: $('#sortableTable').offset().top - 300}, 'fast' );
				    renderTable(table,c.rowsCopy);
				}
			}
			
			function renderTable(table,rows) {
				var c = table.config;
				
			              if (c.totalRows >= c.minItemsForPaging) {
    				    var l = rows.length;
				    var s = (c.page * c.size);
				    var e = (s + c.size);
				    if(e > rows.length ) {
					e = rows.length;
				    }
				    var tableBody = $(table.tBodies[0]);
				    // clear the table body
				    $.tablesorter.clearTableBody(table);
				    for(var i = s; i < e; i++) {
					//tableBody.append(rows[i]);
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						tableBody[0].appendChild(o[j]);
					}
				    }
				} else {
				    var l = rows.length;
				    var tableBody = $(table.tBodies[0]);
				    // clear the table body
				    $.tablesorter.clearTableBody(table);
				    for(var i = 0; i < c.totalRows; i++) {
					//tableBody.append(rows[i]);
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						tableBody[0].appendChild(o[j]);
					}
				    }
				}
				
				fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
			              if (c.totalRows >= c.minItemsForPaging) {
				    if( c.page >= c.totalPages ) {
        			                        moveToLastPage(table);
        			                    }
				}
				
				updatePageDisplay(table);
			}
			
			this.appender = function(table,rows) {
				
				var c = table.config;
				
				c.rowsCopy = rows;
				c.totalRows = rows.length;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				renderTable(table,rows);
			};
			
			var itemsPerPageStr = getCookie("itemsPerPage");
			var itemsPerPage = parseInt(itemsPerPageStr);
			if  ((!itemsPerPageStr) || (isNaN(itemsPerPage))) {
			    itemsPerPageStr = '20';
			    itemsPerPage = 20;
			}
			setCookie("itemsPerPage",itemsPerPageStr,365);
			
			this.defaults = {
			               items: 'Items', 
			               size: itemsPerPage,
			               minItemsForPaging: 20,
				offset: 0,
				page: 0,
				totalRows: 0,
				totalPages: 0,
				container: null,
				cssNext: '.next',
				cssPrev: '.prev',
				cssFirst: '.first',
				cssLast: '.last',
				cssPageDisplay: '.pagedisply',
				cssPageSize: '.pagesize',
				seperator: " | ",
				positionFixed: true,
				appender: this.appender
			};
			
			this.construct = function(settings) {
				
				return this.each(function() {	
					
					config = $.extend(this.config, $.tablesorterMultiPager.defaults, settings);
					
					var table = this;
				
					$(this).trigger("appendCache");
										
					config.size = parseInt($(".MultiPager select[name='itemsPerPage']:first option:selected").val());
					
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({
                    tablesorterMultiPager: $.tablesorterMultiPager.construct
	});
	
})(jQuery);				
/* $Id: tooltip.js 5898 2012-09-27 18:11:08Z agersho $ */

$(window).load(function() {
	$(".toolTipTarget").mouseover(function(e){
        var tipString = $(this).attr('tipString');
        $(".toolTipContent").css({
           left: e.pageX + 10,
           top: e.pageY - 20,
           display: 'block'
        }).html(tipString);
	});
	$(".toolTipContent").mouseover(function(){
        $(".toolTipContent").css({
           display: 'block'
        });
	});
	$(".toolTipContent, .toolTipTarget").mouseout(function(){
        $(".toolTipContent").css({
           display: 'none'
        });
	});
});
    function socialAnalytics(icon) {
        try{
            var s = s_gi(s_account);
            sp_val = 'cm_sp-_-pagecontent-_-actionbar-_-' + icon;
            s.eVar38=sp_val;
            s.eVar39=rei.analytics.options.page_name;
            s.linkTrackEvents = s.events ='event68';
            s.linkTrackVars="eVar38,eVar39,events";
            s.linkName="SP Event";
        }catch(err){}
    }

    function drawSocialIcons() {
        // scrape page content to append to social and email hrefs
        var title = encodeURI($("title").html());
        title = title.replace(/\+/g, "%2B");
        title = title.replace(/&/g, "%26");
        var description = $("meta[name='description']").attr("content");
        var pathname = location.pathname;
        var trackingTag = "&cm_mmc=sm_";
        var query = window.location.search;
        if (query == "") {
            query = "?";
            trackingTag = trackingTag.replace("&", "");
        }
        var url = encodeURI("http://www.rei.com" + pathname + query + trackingTag);
        url = url.replace(/\+/g, "%2B");
        url = url.replace(/&/g, "%26");
        var image = "";
        var productSku = "";
        
        if ($("img[src *= 'skuimage']:first").attr("src") != undefined) {
            image = $("img[src *= 'skuimage']:first").attr("src");
        }
        
        if ($("img[src *= 'zoom']:first").attr("src") != undefined) {
            image = $("img[src *= 'zoom']:first").attr("src");
        }
        
        if ($("img[src *= 'skuimage']:first").attr("src") != undefined) {
            image = $("img[src *= 'skuimage']:first").attr("src");
        }
        
        if ($("div#results img:first").attr("src") != undefined) {
            image = $("div#results img:first").attr("src");
        }
        
        if ($("div#topCategories img[src *= 'zoom']:first").attr("src") != undefined) {
            image = $("div#topCategories img[src *= 'zoom']:first").attr("src");
        }
        
        if (pathname.indexOf("product") > -1) {
            var skuRegex = /\d{6}/;
            productSku = pathname.match(skuRegex);
            title = escape($("h1").attr("itemprop", "name").html());
            image = "http://www.rei.com/skuimage/" + productSku + "/90";
        }

        if ($("meta[property = 'og:image']").attr("content") != undefined){
            image = $("meta[property = 'og:image']").attr("content");
        }
        
        if (image != ''){
            image = "http://www.rei.com" + image.replace(/http:\/\/www.rei.com/, '');
        } else {
            image = "http://www.rei.com/pix/common/REI_logo.gif";
        }
        
        // update social and email hrefs
        try
          {
            if ($('#actionBar .facebook.share-facebook')) {
                $('.facebook.share-facebook').attr('href', 'http://www.facebook.com/dialog/feed?app_id=131317376894863&redirect_uri=http://www.facebook.com/&link=' + url + 'fb-_-share&picture=' + image + '&name=' + title);
                $('.twitter.share-twitter').attr('href', 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url + 'tw-_-share&related=rei');
                $('.google-plus.share-google-plus').attr('href', 'https://plus.google.com/share?url=' + url + 'gp-_-share');
                $('.pinterest.share-pinterest').attr('href', 'http://pinterest.com/pin/create/button/?url=' + url + 'pin-_-share&media=' + image + '&description=' + title);
                $('.stumbleupon.share-stumbleupon').attr('href', 'http://www.stumbleupon.com/submit?url=' + url + 'stb-_-share&review=' + title);
            }
          }
        catch(err)
          {
            
          }
                
         try
          {
            if ($('#actionBar .shareemail.share-email')) {
                $('.shareemail.share-email').attr('href', '/content/rei/en_us/site/email-share.html?sku=' + productSku + '&image=' + image + '&url=' + url + 'email-_-share&title=' + title);
               
            }
          }
        catch(err)
          {
            
          }
    }
    
    function openSocialWindow(width, height, iconName, link) {
        if (iconName == 'shareemail') {
            return false;
        }
        if (iconName == 'shareprint') {
            window.print();
            return false;
        }
        var winWidth=jQuery(window).width();
        var winHeight=jQuery(window).height();
        var windowOptions="dialog=yes,scrollbars=yes,resizable=yes,toolbar=no,personalbar=no,location=yes";
        var left=Math.round(winWidth/2-width/2),top=Math.round(winHeight/2-height/2);

        window.open(link,iconName,windowOptions+",width="+width+",height="+height+",left="+left+",top="+top);
        
        width=height=left=top=null;
        
        socialAnalytics(iconName);
    }
    
    $(document).ready(function(){
        // TODO: remove page scrape test post final authoring
        try {
            if (scrapePage)
            {
                drawSocialIcons();
            }
        }
        catch(e){

        }
        
        $(".social a").mouseenter(function(){
            $(this).unbind('.analytics');
        });

        
        $(".social a").click(function(e){
            openSocialWindow($(this).attr("width"), $(this).attr("height"), $(this).attr("iconName"), $(this).attr("href"));
            e.returnValue=false;
            e.preventDefault&&
            e.preventDefault();
        });
        
        $(".shareemail").fancybox({
            'height': 680,
            'padding': 10,
            'width': 535,
            'scrolling':'no',
            'autoScale': false,
            'type': 'iframe',
            'titleShow': false,
            onComplete: function(){
                $(document).unbind("keydown"); 
                $("#fancybox-right").hide();
                $("#fancybox-left").hide();
                socialAnalytics('email');       
                s.tl(true,"o",'SP Event');
                $('#fancybox-close').bind('click', function(){
                    socialAnalytics('close-window');        
                    s.tl(true,"o",'SP Event');
                });
            }
        });
    });
