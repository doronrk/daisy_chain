window._pa = window._pa || {};
_pa.segments = [{"name":"Shopping Cart","id":710919,"regex":"shoppingcart"},{"name":"All visitors","id":447262,"regex":".*"},{"name":"Order Finished","id":710920,"regex":"orderfinished"}];
_pa.conversions = [{"name":"Customer Purchase","id":"51170","regex":"/OrderFinished.*/?([?#].*)*$"}];
_pa.conversionEvents = [];
_pa.segmentEvents = [];
_pa.rtbId = '350';
!function(){function e(e,a,t){if(null==t||isNaN(t))var n=_pa.pixelHost+"seg?t=2&add="+e;else var n=_pa.pixelHost+"seg?t=2&add="+e+":"+t;_pa.createImageTag("segments",e,n,a)}function a(e,a){var t=_pa.paRtbHost+"seg/?add="+e;_pa.productId&&(t+=":"+encodeURIComponent(_pa.productId)),_pa.crossDevice&&(t+="&cd=1"),s?_pa.createImageTag("paRtbSegments",e,t,a):d.push({id:e,name:a})}function t(){if(s=!0,0!==d.length){for(var e=[],a=[],t=0;t<d.length;t++){var n=d[t],p=n.id,r=n.name;_pa.productId&&(p+=":"+encodeURIComponent(_pa.productId)),e.push(p),a.push(r)}var p=e.join(","),r=a.join(","),o=_pa.paRtbHost+"seg/?add="+p;_pa.crossDevice&&(o+="&cd=1"),_pa.createImageTag("paRtbSegments",p,o,r)}}function n(e,a,t){a=a||_pa.orderId,t=t||_pa.revenue;var n=e.id,r=e.name,o=_pa.rtbId;if(p(n,r,a,t,o),e.cofires)for(var i=0;i<e.cofires.length;i++){var c=e.cofires[i];p(c.appnexus_id,c.name,a,t,c.rtb_id)}}function p(e,a,t,n,p){var r="";t&&""!==t&&(t=t.toString().replace(/@.*/,"@"),r+="&order_id="+encodeURIComponent(t)),n&&""!==n&&(r+="&value="+encodeURIComponent(n)),r+="&other="+function(){for(var e="",a="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t=0;16>t;t++){var n=Math.floor(Math.random()*a.length);e+=a.charAt(n)}return e}();var o=_pa.pixelHost+"px?t=2&id="+e+r,i=_pa.paRtbHost+"px/?id="+e+r;p&&(i+="&a_id="+p),_pa.createImageTag("conversions",e,o,a),_pa.createImageTag("paRtbConversions",e,i,a)}function r(e){for(var a=e.shift(),t=a.split("."),n=_pa,p=0;p<t.length;p++)n=n[t[p]];var r=n.apply(_pa,e);return o(a,e),r}function o(e,a){var t=_pa.callbacks[e];if("undefined"!=typeof t)for(var n=0;n<t.length;n++)t[n].apply(_pa,a)}function i(){for(var e,a=Array.prototype.slice.call(arguments,0),t=a.shift(),n=t.split("."),p=_pa,r=0;r<n.length;r++)p=p[n[r]],e=n[r];p.apply(_pa,a),o(e,a)}function c(){var e=window.navigator.userAgent;(/MSIE 7/.test(e)||/(iPod|iPhone|iPad)/.test(e)&&/AppleWebKit/.test(e))&&(_pa.skip=!0)}_pa.head=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];var s=!1,d=[];_pa.init=function(){_pa.fired={segments:[],conversions:[]},_pa.url=document.location.href,_pa.pixelHost=("https:"===document.location.protocol?"https://secure":"http://ib")+".adnxs.com/",_pa.paRtbHost=("https:"===document.location.protocol?"https://":"http://")+"pixel.prfct.co/",_pa.callbacks={},c()},_pa.addFired=function(e,a){"undefined"==typeof _pa.fired[e]&&(_pa.fired[e]=[]),_pa.fired[e].push(a)},_pa.detect=function(){for(var e=0;e<_pa.segments.length;e++){var a=_pa.segments[e];_pa.url.match(new RegExp(a.regex,"i"))&&i("fireSegment",a)}for(var e=0;e<_pa.conversions.length;e++){var t=_pa.conversions[e];_pa.url.match(new RegExp(t.regex,"i"))&&n(t)}},_pa.track=function(e,a){a="undefined"!=typeof a?a:{};var t=_pa.trackSegments(e,a),n=_pa.trackConversions(e,a);return t||n},_pa.trackSegments=function(e,a){for(var t=!1,n=0;n<_pa.segmentEvents.length;n++){var p=_pa.segmentEvents[n];p.name===e&&(t=!0,i("fireSegment",p,a.segment_value))}return t},_pa.trackConversions=function(e,a){for(var t=!1,p=0;p<_pa.conversionEvents.length;p++){var r=_pa.conversionEvents[p];r.name===e&&(t=!0,n(r,a.orderId,a.revenue))}return t},_pa.trackProduct=function(e){_pa.productId=e;for(var t=_pa.fired.segments,n={},p=0;p<t.length;p++){var r=t[p],o=r.id;n[o]=!0}for(var i in n)a(i,"product refire")},_pa.fireLoadEvents=function(){if("undefined"!=typeof _pa.onLoadEvent)if("function"==typeof _pa.onLoadEvent)_pa.onLoadEvent();else if("string"==typeof _pa.onLoadEvent)for(var e=_pa.onLoadEvent.split(","),a=0;a<e.length;a++){var t=e[a];_pa.track(t)}},_pa.createImageTag=function(e,a,t,n){if(!_pa.skip){var p=document.createElement("img");p.src=t,p.width=1,p.height=1,p.border=0,_pa.head.appendChild(p),_pa.addFired(e,{id:a,name:n,tag:p})}},_pa.start=function(){_pa.fireLoadEvents(),_pa.detect(),_pa.initQ(),t()},_pa.fireSegment=function(t,n){e(t.id,t.name,n),a(t.id,t.name)},_pa.initQ=function(){if("undefined"!=typeof window._pq)for(var e=0;e<_pq.length;e++){var a=_pq[e];r(a)}window._pq={push:function(e){return r(e)}}},_pa.addListener=function(e,a){"undefined"==typeof _pa.callbacks[e]&&(_pa.callbacks[e]=[]),_pa.callbacks[e].push(a)},_pa.removeListener=function(e,a){for(var t=_pa.callbacks[e],n=t.length;n--;)t[n]===a&&t.splice(n,1)},_pa.init()}();(function(){
	if (_pa.initAfterLoad) {
		if (window.document && window.document.readyState === "complete") {
			_pa.start();
		} else {
			function hookLoad(handler) {
				if(window.addEventListener) {
					window.addEventListener("load", handler, false);
				} else if(window.attachEvent) {
					window.attachEvent("onload", handler);
				}
			}
			hookLoad(function() {
				_pa.start();
			});
		}
	} else {
		_pa.start();
	}
})();
