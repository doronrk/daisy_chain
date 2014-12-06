mmcore.SetCookie('mmid','1876450423|AQAAAAqHCkSjTQsAAA==',365,1);mmcore.SetCookie('pd','-484989329|AQAAAAoBQocKRKNNC9WA8tMBAOuqabHG3NFIAA4AAADrqmmxxtzRSAAAAAD/////AP//////////AAZEaXJlY3QBTQsBAAAAAAABAAABAAD///////////////8DAC8RAAAAoEDu4E0LAP////8BTQtNC///AQAAAAAAAAHFLwAAK00AAAAyFAAAAH3nySVNCwD/////AU0LTQv//wEAAAAAAAABWTYAAC9ZAAAAIxUAAAAJXw/eTQsA/////wFNC00L//8BAAAAAAAAAa44AAAVXQAAAAAAAAFF',365);mmcore.SetCookie('srv','nycvwcgus11',365);(function(){if(typeof(mmcore.GenInfo)!='object')mmcore.GenInfo={};mmcore.EH=function(e){var s=e.message+'\r\n';if(!window.mm_error)window.mm_error=s;else window.mm_error+=s;};
mmcore.GenInfo['DataTest']={'element1':'Default'};
mmcore.GenInfo['DataTest_v2']={'element1':'Default'};
mmcore.GenInfo['DataTest_v3']={'element1':'Default'};
var tc={'Element1':{'h':[],'c':[],'l':[]},'Element1':{'h':[],'c':[],'l':[]},'Element1':{'h':[],'c':[],'l':[]}}
try{
;(function () {
	mmcore.snippets = mmcore.snippets || {};
	mmcore.snippets.Style = function (css) {
		var doc = document, st = doc.createElement("style");
		st.type = "text/css";
		st.media = "screen";
		function attach(css) {
			if (st && css) {
				if (st.styleSheet) {
					st.styleSheet.cssText += css;
				} else {
					st.innerHTML += css;
				}
			}
		}

		function detach() {
			st && st.parentNode.removeChild(st);
			st = null;
		}

		attach(css);
		var mm = doc.getElementById(mmcore.cprefix + 1);
		mm.parentNode.insertBefore(st, mm);
		return {
			attach: attach,
			detach: detach
		}
	}
}());
}catch(err){mmcore.EH(err);}
try{
;(function(){
	var cookiecr = mmcore.GetCookie('mm_criteria', 1) || false;
	mmcore.persCriteria = cookiecr ? JSON.parse(cookiecr) : {
		ForcedValue: ''
	};
	mmcore.getCriteria = function(){
		var wlh = window.location.href.toLowerCase();
		if (wlh.indexOf('mmexpus=1') > -1){
			mmcore.persCriteria.ForcedValue = "US";
		}
		else if (wlh.indexOf('mmexpca=1') > -1){
			mmcore.persCriteria.ForcedValue = "CA";
		}
	}
	mmcore.getCriteria();
	mmcore.SetCookie('mm_criteria', JSON.stringify(mmcore.persCriteria), 365, 1);
})();
}catch(err){mmcore.EH(err);}
try{
/** 
* Maxymiser - Google Analytics Integration 
* 
* account          : required. {string}            UA-36361114-1 
* campaignName     : required. {String}            must be exactly what is set in the UI 
* slotNumber       : required. {Int 1-50}          GA custom variable slot # 1-50. Basic accounts have 1-5. 
* 
*/  
mmcore.GA = function (account, campaignName, slotNumber, _optCallback) {  
    var m = mmcore;  
    if (!account || !campaignName || !slotNumber) {  
        return m.EH({  
            message: '(mm_GA) insufficient arguments'  
        });  
    }  
    var GI = m.GenInfo[campaignName],  
        keys = [],  
        output = [];  
    if (!GI) {  
        return m.EH({  
            message: '(mm_GA) Campaign Not Found: ' + campaignName  
        });  
    }  
    if (slotNumber < 1 || slotNumber > 50 || isNaN(parseFloat(slotNumber)) || !isFinite(slotNumber)) {  
        return m.EH({  
            message: '(mm_GA) invalid slot number'  
        });  
    }  
    for (var key in GI) {  
        keys.push(key);  
    }  
    keys.sort();  
    for (var i = 0; i < keys.length; i++) output.push(keys[i] + ':' + GI[keys[i]]);  
    var campaignInfo = (campaignName + '=' + output.join('|')).toLowerCase(),  
        varKey = (mmcore.GetCookie('cfgID') == '2' ||  
            mmcore.GetCookie('cfgID') !== '1' && mmcore.GetCookie('cfgid') !== '1') ? campaignName + " Prod" : campaignName + " Sand";  
  
  
    function sendGA() {  
        window._gaq = window._gaq || [];
        window._gaq.push(  
            ["mmGA._setAccount", account], ['mmGA._setCustomVar', slotNumber, varKey, campaignInfo, 2], ['mmGA._trackEvent', varKey, campaignInfo, undefined, undefined, true]  
        );  
        if (typeof opt_Callback == 'function') opt_Callback();
    }  
    var waitForGA = setInterval(function () {  
        if (!window._gaq || typeof window._gaq.push !== 'function') return;  
        clearInterval(waitForGA);
        foundGA = true;
        sendGA();
    }, 50);
    mmcore.AddDocLoadHandler(function () {
        setTimeout(function () {
            if (!foundGA) {
                clearInterval(waitForGA);
                m.EH({
                    message: 'mmcore.GA: no _gaq.push method found'
                });
            }
        }, 4000);
    });
} // end mmcore.GA()
}catch(err){mmcore.EH(err);}
try{
mmcore.CoreMetrics = function (campaignName, tagTypes) {
    var GI = mmcore.GenInfo[campaignName],
        TYPES = {
            "element": "cmCreateElementTag",
            "pageview": "cmCreatePageviewTag",
            "productview": "cmCreateProductviewTag"
        }, output = [];
    if (!GI) return mmcore.EH({
        message: "(mm_CM) Campaign not found: " + campaignName
    });
    var session = mmcore.GetCookie("CM_" + campaignName);
    mmcore.SetCookie("CM_" + campaignName, (new Date).getTime(), 0);
    if (session && (new Date).getTime() - session < 18E5) return;
    if (!tagTypes || !tagTypes.push) tagTypes = [tagTypes || "element"];
    for (var key in GI) output.push(key + ":" + GI[key]);
    output = output.join("|").toLowerCase();
    var createTag = function () {
        for (var i = 0, l = tagTypes.length; i < l; i++) {
            var func = TYPES[tagTypes[i]];
            if (!func) return mmcore.EH({
                message: "(mm_CM) Invalid tag type: " + tagTypes[i]
            });
            var args = [output];
            if (tagTypes[i] == "productview") args.push(output);
            args.push("MM_" + campaignName);
            window[func].apply(this, args)
        }
    };
    if (window.cmCreateProductviewTag) createTag();
    else {
        var waitForCM = setInterval(function () {
            if (!window.cmCreateElementTag) return;
            clearInterval(waitForCM);
            createTag()
        }, 50);
        setTimeout(function () {
            clearInterval(waitForCM)
        }, 15E3)
    }
};
}catch(err){mmcore.EH(err);}
try{
;(function () {
	mmcore.snippets = mmcore.snippets || {};
	mmcore.snippets.EventManager = function () {
		var eventPool = {};
		var eventListeners = {};
		this.trigger = function (event_type, event_data, callback) {
			eventPool[event_type] = {
				event_data: event_data,
				callback: callback
			};
			eventListeners[event_type] = eventListeners[event_type] || [];
			for (var i = 0; i < eventListeners[event_type].length; i++) {
				try {
					eventListeners[event_type][i](event_data);
				} catch (e) {
					mmcore.EH && mmcore.EH(e)
				}
			}
			callback && callback();
		};
		this.on = function (event_type, callback) {
			var lastData = eventPool[event_type];
			if (lastData) {
				try {
					callback(lastData.event_data);
				} catch (e) {
					mmcore.EH && mmcore.EH(e)
				}
				setTimeout(function () {
					lastData.callback && lastData.callback();
					lastData.callback = null;
				}, 0);
			}
			eventListeners[event_type] = eventListeners[event_type] || [];
			eventListeners[event_type].push(callback);
		};
	};
	mmcore.snippets.EventManager.call(mmcore)
}());
}catch(err){mmcore.EH(err);}
try{
;(function(){
	function bind(el, func){
		if(el.addEventListener){
			el.addEventListener('beforeprint', func, false);
		}else if(el.attachEvent){
			el.attachEvent('onbeforeprint', func);
		}	
	}

	if(navigator.userAgent.match(/msie/i)){
		bind(window, function(){
			var nodes = document.getElementsByTagName('script');
			for(var i = nodes.length; i--;){
				if((nodes[i].id || '').match(mmcore.cprefix))
					nodes[i].removeAttribute('src');
			}
		});
	}
})();

}catch(err){mmcore.EH(err);}
try{
;
(function () {
    if (/pls\/ag\/payment_interface\.save_payment_options/.test(location.href)) {
        mmcore.SetCookie('mm_order_confirmation', '1', -1, 1);
    }
})();
}catch(err){mmcore.EH(err);}
try{
;
(function () {
    var style = mmcore.snippets.Style('.navLevel1 {position: relative; left: -9999px}'),
        interval, variant;

    interval = setInterval(function () {
        if (document.getElementById('pageBody') || mmcore._docEnd) {
            clearInterval(interval);

            mmcore.persCriteria = mmcore.persCriteria || {};
            for (var key in mmcore.persCriteria) {
                if (mmcore.persCriteria[key] !== "") {
                    mmcore.SetPersCriterion(key, mmcore.persCriteria[key]);
                }
            }

            mmcore._async = true;
            mmcore.SetPageID('T17GlobalNavCanada ID');
            mmcore.CGRequest(function () {
                variant = mmcore.GenInfo['T17GlobalNavCanada']['globalnav'];

                if (variant === 'Default') {
                    style.detach();
                } else {
                    mmcore.RenderMaxyboxes('mm_GlobalNav');
                    style.detach();
                }
            });
        }
    }, 50);

    setTimeout(style.detach, 5000);
})();
}catch(err){mmcore.EH(err);}
try{
;(function(){
  	var UA = navigator.userAgent,
        iPhone = /iPhone/.test(UA),
        Android = /Mozilla\/5\.0 \(.*Android.*\) AppleWebKit.*/.test(UA) && /mobile/i.test(UA);
	if(iPhone || Android) return;
	var hideContentT2 = function (t) {
		if (document.body) {
			var s = document.createElement('style');
			s.type = 'text/css';
			s.id = 'mm_hideT2';
			if (/WebKit|MSIE/i.test(navigator.userAgent)) {
				if (s.styleSheet) {
					s.styleSheet.cssText = t;
				} else {
					s.innerText = t;
				}
			} else {
				s.innerHTML = t;
			}
			document.getElementsByTagName('head')[0].appendChild(s);
		} else {
			document.write('<style type="text/css" id="mm_hideT2">' + t + '</style>');
		}
	};
	mmcore.showContentT2 = function(){
		var elem = document.getElementById('mm_hideT2');
		if(elem) elem.parentNode.removeChild(elem);
	};
  	hideContentT2('body {position:absolute;left:-9999px;}');
	var generate = function(){		
          	mmcore.persCriteria = mmcore.persCriteria || {};
		for(var key in mmcore.persCriteria){
			if ( mmcore.persCriteria[key] !== "") {
	    			mmcore.SetPersCriterion(key, mmcore.persCriteria[key]);
			}
		}
		mmcore._async = 1;
			mmcore.SetPageID('T2ProdPgPersonalize ID');
			mmcore.CGRequest(function(){
				var gi = mmcore.GenInfo.T2ProdPgPersonalize_copy, defaults = true;
				for(var key in gi){
					if(gi[key].toLowerCase() != 'default') defaults = false;
				}
				if(defaults) {
					mmcore.showContentT2();
				}                	
				setTimeout(function(){
					mmcore.showContentT2();
				}, 5000);
			});
	},
	checker = setInterval(function(){
		if(!window.jQuery) return mmcore.showContentT2();  
		if(!document.getElementById('footer') && !$.isReady) return;
		clearInterval(checker);
		var wlh = window.location.href,
			country = $('input[name="country"]').val(),
			canID = parseInt($('input[name="canId"]').val()),
			canShippable = $('input[name="canShippable"][value="N"]').length; 
		if ((/\/item\/|\/set\//i.test(wlh))){			
                	generate();
		} else if (/\/thumbnail\/|\/thumbnailcomplex\/|\/search\?/i.test(wlh)){
                  	generate();                           
		} else mmcore.showContentT2(); 
	},50);
})();

}catch(err){mmcore.EH(err);}
mmcore._RenderOnLoad();if(typeof mmcore._callback=='object'&&typeof mmcore._callback[1]=='function'){try{mmcore._callback[1]();}catch(err){mmcore.EH(err);}
finally{mmcore._callback[1]=null;}}
})();