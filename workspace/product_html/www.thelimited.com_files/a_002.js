mmcore.SetCookie('mmid','-890475020|AQAAAArEFGE9TQsAAA==',365,1);mmcore.SetCookie('pd','917499978|AQAAAAoBQsQUYT1NC9lBlmABAP9wlfjU3NFIAA4AAAD/cJX41NzRSAAAAAD/////AP//////////AAZEaXJlY3QBTQsBAAAAAAABAAAAAACATQAA//////////8AAAAAAAFF',365);mmcore.SetCookie('srv','nycvwcgus08',365);(function(){if(typeof(mmcore.GenInfo)!='object')mmcore.GenInfo={};mmcore.EH=function(e){var s=e.message+'\r\n';if(!window.mm_error)window.mm_error=s;else window.mm_error+=s;};
try{
;(function () {
	mmcore.snippets = mmcore.snippets || {};
	mmcore.snippets.Trigger = function () {
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
	mmcore.snippets.Trigger.call(mmcore)
}());
}catch(err){mmcore.EH(err);}
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
/* 
 *	@params
 *		campaignName: string, MM Campaign Name like 'AMAG Navigation'
 *		trackingType: int, number of values we want to pass to omniture ( could be missed and would be equal to 1 by default )
 *		paramsToPass: omniture prop & eVar array like [ ['prop11', 'eVar43'], ['prop12', 'eVar44'], ['prop13', 'eVar45'] ]
 */
mmcore.omniture = function( campaignName, trackingType, paramsToPass ){
	var 	campaignGI = mmcore.GenInfo[campaignName], 	// maxymiser campaign GenInfo
		keys = [], 					// keys of campaignGI object
		gi = {}, 					// new GenInfo sorted in alphabetical order
		valuesToPass = [], 				// array of values to pass to omniture
		paramsToPass = paramsToPass || [ ['eVar53'] ];
		s_gi_name = window.s_account || ''; 		// omniture gi identifier

	// getting mmcore.GenInfo object keys (elements names)
	for( var key in campaignGI ){
		keys.push( key );
	}

	// sorting keys in alphabetical order
	keys.sort();

	// set up new GenInfo object sorted in alphabetical order
	for( var i = 0; i < keys.length; i++ ){
		gi[ keys[i] ] = campaignGI[ keys[i] ].toLowerCase();
	}

	// merging values according to trackingType
	switch( trackingType ){
		case 3:
			// order of params names should be the same as values order in valuesToPass array
			var elements = [], variants = [];
			for( var key in gi ){
				elements.push( key );
				variants.push( gi[key]/*.substr(0,3)*/ );
			}
			// putting values in the right order
			Array.prototype.push.call( valuesToPass, campaignName.toLowerCase().replace(/\s/g, ''), elements.join('|'), variants.join('|') );
			break;
		case 2:
			// order of params names should be the same as values order in valuesToPass array
			var elements_variants = [];
			for( var key in gi ){
				elements_variants.push( key + '_' + gi[key]/*.substr(0,3)*/ )
			}
			// putting values in the right order
			Array.prototype.push.call( valuesToPass, campaignName.toLowerCase().replace(/\s/g, ''), elements_variants.join('|') );
			break;
		default:
			// order of params names should be the same as values order in valuesToPass array
			var elements_variants = [];
			for( var key in gi ){
				elements_variants.push( key + '_' + gi[key]/*.substr(0,3)*/ )
			}
			// putting values in the right order
			Array.prototype.push.call( valuesToPass, campaignName.toLowerCase().replace(/\s/g, '') + ':' + elements_variants.join('|') );
			break;
	}

	// setting up the omniture's gi identifier
	var s = s_gi(s_gi_name); 

	s.linkTrackVars = paramsToPass.join(',');

	// setting up the omniture params values
	for( var i = 0; i < paramsToPass.length; i++ ){
		// if params count is greater than values count we would duplicate last known value (like in spec example: eVar23 is equal to prop23)
		if(typeof paramsToPass[i] != 'string'){
			for(var j = 0; j < paramsToPass[i].length; j++){
				s[ paramsToPass[i][j] ] = valuesToPass[i] || s[ paramsToPass[i - 1][j] ]; 
			}
		}else{
			s[ paramsToPass[i] ] = valuesToPass[i] || s[ paramsToPass[i - 1] ]; 
		}
	}
        //s.t();				     Edit made on Apr 28, 2014 to fix increased Omniture traffic
  	s.tl(true, 'o', 'Maxymiser Generation');  // New fix.

        // clearing omniture object 
        s.linkTrackVars = '';
        for( var i = 0; i < paramsToPass.length; i++ ){
                                s[ paramsToPass[i] ] = '';
        }
};
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
if(typeof mmcore._callback=='object'&&typeof mmcore._callback[1]=='function'){try{mmcore._callback[1]();}catch(err){mmcore.EH(err);}
finally{mmcore._callback[1]=null;}}
})();