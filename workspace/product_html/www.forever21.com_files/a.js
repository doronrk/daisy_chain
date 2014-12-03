mmcore.SetCookie('mmid','-522965996|AQAAAAoknOTmTQsAAA==',365,1);mmcore.SetCookie('pd','-452829412|AQAAAAoBQiSc5OZNCzpKyMEBAO8HIlvU3NFIAA4AAADvByJb1NzRSAAAAAD/////AP//////////AAZEaXJlY3QBTQsBAAAAAAABAAAAAACGQwAAQkUAAP////8AAAAAAAFF',365);mmcore.SetCookie('srv','nycvwcgus07',365);(function(){if(typeof(mmcore.GenInfo)!='object')mmcore.GenInfo={};mmcore.EH=function(e){var s=e.message+'\r\n';if(!window.mm_error)window.mm_error=s;else window.mm_error+=s;};
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
		};
	};
}());
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
					mmcore.EH && mmcore.EH(e);
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
					mmcore.EH && mmcore.EH(e);
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
	mmcore.snippets.EventManager.call(mmcore);
}());
}catch(err){mmcore.EH(err);}
try{
;(function(){   
    // configuration:   
    var defaultAccount = 'someaccount',   
        defaultParams = ['prop37', 'eVar37'];  
  
    // arguments:   
    // campaign = string with the full name of the campaign  
    //            OR an object with campaign info in this format:  
    //            { "CampaignName" : { "element": "variant", "element": "variant" } }  
    // params = array of evar/prop parameters to pass (optional)   
    // account = track to a different omniture account (optional)
    mmcore.omniture = function(campaign, params, account){
		var trackAction = function(){
			if(!window.s_gi) return mmcore.EH({message:"Omniture function is missing. s_gi not found."});
			if(typeof campaign == 'string'){
				var GI = mmcore.GenInfo[campaign];
				if(!GI) return mmcore.EH({message:"Omniture function called for non-existant campaign."});
			} else if(campaign){
				var i;
				for(i in campaign)
					var GI = campaign[i];
				campaign = i;
				if(!i || !GI) return mmcore.EH({message:"Omniture function called for invalid campaign format."});
			} else {
				return mmcore.EH({message:"Omniture function called without campaign."});
			}

			var output = [];
			params = params || defaultParams;
			account = account || defaultAccount;

			for(var key in GI)
				output.push( key + '_' + (GI[key]+'').toLowerCase().substr(0, 3) );
			output.sort();
			output = campaign.toLowerCase().replace(/\s/g, '') + ':' + output.join('|');

			var s = s_gi(account);
			s.linkTrackVars = params.join(',');
			for(var i = params.length; i--;)
				s[params[i]] = output;
			s.tl(true, 'o', 'Maxymiser Generation');

		};
        mmcore.AddDocLoadHandler(function(){
			var waiter = function(){
				if(window.s_gi){
					trackAction();
				}else{
					setTimeout(waiter, 50);
				}
			};
			waiter();
		});
    };  
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
    var m = mmcore,
        foundGA;  
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
        varKey = (mmcore._vars.cfgid === '1') ? campaignName + " Sand" : campaignName + " Prod";  
  
  
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
;(function(){
	var cookiecr = mmcore.GetCookie('mm_criteria', 1) || "{}",
		wlh = location.href,
		ref = document.referrer,
		new_session = !mmcore.GetCookie('mm_session', 1),
		subDataIndex = {
			mm_searcher: 0,
			mm_filter: 1, 
			mm_prodrecs: 2,
			mm_sort: 3,
			mm_nav_clicks: 4,
			mm_recs_viewed: 5,
			mm_recs_purchased: 6
		};



	mmcore.criteria = JSON.parse(cookiecr);

	function getSubData(name, defaultValue){
		var subData = (mmcore.GetCookie('mm_criteria_data', 1) || '').split('|');
		return subData[subDataIndex[name]] || defaultValue;
	};

	function setSubData(name, value){
		var subData = (mmcore.GetCookie('mm_criteria_data', 1) || '').split('|');
		for(var key in subDataIndex){
			if(name == key)
				subData[subDataIndex[name]] = value;
			else
				subData[subDataIndex[key]] = subData[subDataIndex[key]] || '';
		}
		mmcore.SetCookie('mm_criteria_data', subData.join('|'), 365, 1);
	};

	//PC1 Member
	mmcore.AddDocLoadHandler(function(){
		var $ = window.jQuery || function(){};
		
		if($('a:contains("SIGN OUT")').length)
			mmcore.criteria.Member = 'Yes';
		else if(!mmcore.criteria.Member)
			mmcore.criteria.Member = 'no';
	});

	//PC2 FirstEntryPoint
	if(new_session){
		if(wlh.match(/\:\/\/www\.forever21\.com\/Product\/Main\.aspx\?br=f21/i))
			mmcore.criteria.FirstEntryPoint = 'Home Page';
		else if(wlh.match(/http\:\/\/www\.forever21\.com\/Product\/Category\.aspx\?/i))
			mmcore.criteria.FirstEntryPoint = 'Category page';
		else if(wlh.match(/http\:\/\/www\.forever21\.com\/Product\/Product\.aspx\?/i))
			mmcore.criteria.FirstEntryPoint = 'Product Page';
		else if(wlh.match(/\:\/\/www\.forever21\.com\/sale\//i))
			mmcore.criteria.FirstEntryPoint = 'Sale Page';
		else	
			mmcore.criteria.FirstEntryPoint = 'Other';
	}

	//PC3 ProdPageRef
	if(ref && (!mmcore.criteria.ProdPageRef || mmcore.criteria.ProdPageRef == 'None') && wlh.match(/\:\/\/www\.forever21\.com\/Product\/Product\.aspx\?/i)){
		if(ref.match(/\.facebook\.|\.pinterest\.|\.Instagram\./i))
			mmcore.criteria.ProdPageRef = 'Ext-Social';
		else if(ref.match(/\.Google\.|\.Bing\.|\.yahoo\./i))
			mmcore.criteria.ProdPageRef = 'Ext-Search';
		else if(ref.match(/\:\/\/www\.forever21\.com\/Product\/Main\.aspx\?br=f21/i))
			mmcore.criteria.ProdPageRef = 'Int-HP';
		else if(ref.match(/http\:\/\/www\.forever21\.com\/Product\/Category\.aspx\?/i))
			mmcore.criteria.ProdPageRef = 'Int-Cat';
		else if(!ref.match(/forever21/i))	
			mmcore.criteria.ProdPageRef = 'Other-External';
		else
			mmcore.criteria.ProdPageRef = 'Other-Internal';
	}else if(new_session)
		mmcore.criteria.ProdPageRef = 'None';

	//PC4 NumCartItems
	mmcore.AddDocLoadHandler(function(){
		var $ = window.jQuery || function(){},
			cart_items = +$('.top-links .icon-bag strong span').text() || 0;

		if(cart_items > 3)
			mmcore.criteria.NumCartItems = '>3';
		else if(cart_items >= 1)
			mmcore.criteria.NumCartItems = '1-3';
		else	
			mmcore.criteria.NumCartItems = '0';
		
	});

	//PC5 Searcher
	mmcore.on('search', function(){
		var searcher = getSubData('mm_searcher', '0,0').split(',');
		if(!searcher[2]){
			setSubData('mm_searcher', ++searcher[0] + ',' + searcher[1] + ',1');
		}	
	});
	if(new_session || mmcore.criteria.Searcher == 'None'){
		var searcher = getSubData('mm_searcher', '0,0').split(',');
		setSubData('mm_searcher', searcher[0] + ',' + (new_session ? ++searcher[1] : searcher[1]) + ',');
		if(searcher[1] > 3){
			var percentage = Math.round(100 * searcher[0] / searcher[1]);
			if(percentage >= 75)
				mmcore.criteria.Searcher = 'Extreme';
			else if(percentage >= 34)
				mmcore.criteria.Searcher = 'Moderate';
			else
				mmcore.criteria.Searcher = 'No';
		}else
			mmcore.criteria.Searcher = 'None';
	}else
		mmcore.criteria.Searcher = mmcore.criteria.Searcher || 'None';

	//PC6 ProdFilterer
	if(wlh.match(/\:\/\/www\.forever21\.com\/Product\/Category\.aspx\?/i)){
		mmcore.AddDocLoadHandler(function(){
			var $ = window.jQuery || function(){};
			$('#ctl00_MainContent_ddlSizeType').change(function(){
				var filter = getSubData('mm_filter', '0,0').split(',');
				if(!filter[2]){
					setSubData('mm_filter', ++filter[0] + ',' + filter[1] + ',1');
				}	
			});
		});	
	}
	if(new_session || mmcore.criteria.ProdFilterer == 'None'){
		var filter = getSubData('mm_filter', '0,0').split(',');
		setSubData('mm_filter', filter[0] + ',' + (new_session ? ++filter[1] : filter[1]) + ',');
		if(filter[1] > 3){
			var percentage = Math.round(100 * filter[0] / filter[1]);
			if(percentage >= 75)
				mmcore.criteria.ProdFilterer = 'Extreme';
			else if(percentage >= 34)
				mmcore.criteria.ProdFilterer = 'Moderate';
			else
				mmcore.criteria.ProdFilterer = 'No';
		}else
			mmcore.criteria.ProdFilterer = 'None';
	}else
		mmcore.criteria.ProdFilterer = mmcore.criteria.ProdFilterer || 'None';

	//PC7 ProdRecsEngage
	if(wlh.match(/\:\/\/www\.forever21\.com\/CheckOut\/Basket\.aspx\?br=f21/i)){
		mmcore.AddDocLoadHandler(function(){
			var $ = window.jQuery;
			$('[class*="mm_rec_container"] a').live('click', function(){
				var filter = getSubData('mm_prodrecs', '0,0').split(',');
				if(!filter[2]){
					setSubData('mm_prodrecs', ++filter[0] + ',' + filter[1] + ',1');
				}	
			});
		});	
	}
	if(new_session || mmcore.criteria.ProdRecsEngage == 'None'){
		var filter = getSubData('mm_prodrecs', '0,0').split(',');
		setSubData('mm_prodrecs', filter[0] + ',' + (new_session ? ++filter[1] : filter[1]) + ',');
		if(filter[1] > 3){
			var percentage = Math.round(100 * filter[0] / filter[1]);
			if(percentage >= 75)
				mmcore.criteria.ProdRecsEngage = 'Extreme';
			else if(percentage >= 34)
				mmcore.criteria.ProdRecsEngage = 'Moderate';
			else
				mmcore.criteria.ProdRecsEngage = 'No';
		}else
			mmcore.criteria.ProdRecsEngage = 'None';
	}else
		mmcore.criteria.ProdRecsEngage = mmcore.criteria.ProdRecsEngage || 'None';

	//PC9 MostFreqSort
	if(wlh.match(/\:\/\/www\.forever21\.com\/Product\/Category\.aspx\?/i)){
		mmcore.AddDocLoadHandler(function(){
			var $ = window.jQuery || function(){};
			$('#ctl00_MainContent_ddlSortType').change(function(){
				var cats = getSubData('mm_sort', '0,0,0,0').split(',');
				for(var i = 1; i < 4; i++){
					if(i == $(this).val())
						cats[i] = 3 + +cats[i];
					else	
						cats[i] = +cats[i] - 1;
				}
				setSubData('mm_sort', cats.join(','));
			});
		});	
		
		var cats = getSubData('mm_sort', '0,0,0,0').split(','),
			max_val = -1e6,
			max_index = 0;
		for(var i = 1; i < 4; i++){
			if(cats[i] > max_val){
				max_val = cats[i];
				max_index = i;
			}
		}
		mmcore.criteria.MostFreqSort = (['', 'What\'s New', 'High Price', 'Low Price'])[max_index] || 'None';
	}else
		mmcore.criteria.MostFreqSort = mmcore.criteria.MostFreqSort || 'None';

	//PC10 CategoryClicks
	mmcore.AddDocLoadHandler(function(){
		var $ = window.jQuery || function(){};
		function trackNavClick(ind){
			var cats = getSubData('mm_nav_clicks', '0,0,0,0,0,0,0,0,0').split(',');
			for(var i = 1; i < cats.length; i++){
				if(i == ind)
					cats[i] = 3 + +cats[i];
				else	
					cats[i] = +cats[i] - 1;
			}
			setSubData('mm_nav_clicks', cats.join(','));
		}
		$('.new-arrivals').click(function(){ trackNavClick(1); });
		$('.women').click(function(){ trackNavClick(2); });
		$('.men').click(function(){ trackNavClick(3); });
		$('.girls').click(function(){ trackNavClick(4); });
		$('.love21').click(function(){ trackNavClick(5); });
		$('.plus').click(function(){ trackNavClick(6); });
		$('.sale').click(function(){ trackNavClick(7); });
		$('.lookbooks').click(function(){ trackNavClick(8); });
	});	
	var cats = getSubData('mm_nav_clicks', '0,0,0,0,0,0,0,0,0').split(','),
		max_val = -1e6,
		max_index = 0;
	for(var i = 0; i < cats.length; i++){
		if(cats[i] > max_val){
			max_val = cats[i];
			max_index = i;
		}
	}
	mmcore.criteria.CategoryClicks = (['', 'New Arrivals', 'Women', 'Men', 'Girls', 'Love21', 'Plus Sizes', 'Sale', 'Lookbooks'])[max_index] || 'None';


	//PC11 RecsPurchase
	if(new_session){
		setSubData('mm_recs_viewed', '');
	}
	function calcRecsPurchase(){
		var purchased_recs = getSubData('mm_recs_purchased', '0,0').split(',');
		if(+purchased_recs[1]){
			if(purchased_recs[0] / purchased_recs[1] > 1 / 5)
				mmcore.criteria.RecsPurchase = 'Yes';
			else	
				mmcore.criteria.RecsPurchase = 'No';
		}else{
			mmcore.criteria.RecsPurchase = 'None';
		}
	};
	if(wlh.match(/\:\/\/www\.forever21\.com\/CheckOut\/Basket\.aspx\?br=f21/i)){
		mmcore.AddDocLoadHandler(function(){
			var $ = window.jQuery,
				viewed_recs = getSubData('mm_recs_viewed', '').split(',');

			var interval = setInterval(function(){
				var recommendations = $('.mm_recommend a');

				if(!recommendations.length) return;
				clearInterval(interval);

				recommendations.each(function(){
					var exists = false,
						product_id = ((this.href || '').match(/ProductID=(\d+)/i) || [,''])[1];

					for(var i = viewed_recs.length; i--; ){
						if(!viewed_recs[i])
							viewed_recs.splice(i, 1);
						if(viewed_recs[i] == product_id)
							exists = true;
					}

					if(!exists)
						viewed_recs.push(product_id);

				});
				setSubData('mm_recs_viewed', viewed_recs.join(','));
				calcRecsPurchase();
			}, 200);
		});	
	}else if(wlh.match(/\:\/\/www\.forever21\.com\/CheckOut\/OrderSummary\.aspx\?br=f21/i)){
		mmcore.AddDocLoadHandler(function(){
			var $ = window.jQuery,
				viewed_recs = getSubData('mm_recs_viewed', '').split(','),
				recs_purchased = getSubData('mm_recs_purchased', '0,0').split(','),
				purchased_now = false;

			$('#ctl00_MainContent_btnProcess').click(function(){
				for(var i = viewed_recs.length; i--; ){
					if($('td:contains("' + viewed_recs[i] + '")').length){
						purchased_now = true;
					}
				}
				if(purchased_now){
					++recs_purchased[0];
				}
				setSubData('mm_recs_purchased', recs_purchased[0] + ',' + ++recs_purchased[1]);
			});
		});
	}
	calcRecsPurchase();



	mmcore.AddDocLoadHandler(function(){
		mmcore.SetCookie('mm_criteria', JSON.stringify(mmcore.criteria), 365, 1);
	});
	for (var key in mmcore.criteria) {
	    mmcore.SetPersCriterion(key, mmcore.criteria[key]);
	}

	if(new_session)
		mmcore.SetCookie('mm_session', 1, 0, 1);
})();
}catch(err){mmcore.EH(err);}
try{
/**
 * [experienceCookie description]
 * @param  {object} campaignData:
 *			for A/B -> {CampaignName1:'Expereince1'}
 *			for MVT -> {CheckoutT5:{CTA:'default',layout:'new',ProgresBar:'green'}}
 *
 *	Cookie sample: mmsegassignments=HomePageT3:Redesign,CheckoutT5:CTA:default|layout:new|ProgresBar:green
 *
 * 	HOW TO CALL THIS FUNCTION: CAMPAIGN SCRIPT EXAMPLE
 * 	if( typeof mmcore.experienceCookie == 'function') {
 *   		mmcore.experienceCookie("CampaignName");
 *   	}
 */
// ;(function() {
// 	mmcore.experienceCookie = mmcore.experienceCookie || {};
// 	mmcore.experienceCookie = function(campaignName) {
// 		function stringify(obj) {
// 			return JSON.stringify(obj)
// 				.replace(/^{/, '')
// 				.replace(/}$/, '')
// 				.replace(/{"\w+":"\w+"/g, '$&|')
// 				.replace(/\|,"\w+":"\w+"/g, '$&|')
// 				.replace(/[{}"]/g, '')
// 				.replace(/\|,/g, '\|')
// 				.replace(/\s/g, '');
// 		}

// 		function makeCampaignData(campaignName) {
// 			var campaignData = campaignName + ':',
// 				elements = [];

// 			for (var key in mmcore.GenInfo[campaignName]) {
// 				if (mmcore.GenInfo[campaignName].hasOwnProperty(key)) {
// 					var newElement = key + ':' + mmcore.GenInfo[campaignName][key];
// 					elements.push(newElement);
// 				}
// 			}
// 			if (elements.length == 1) {
// 				campaignData += elements[0].replace(/\w+:/, '');
// 			} else if (elements.length > 1) {
// 				for (var i = 0; i < elements.length; i += 1) {
// 					campaignData += elements[i];
// 					if (i != (elements.length - 1)) {
// 						campaignData += '|';
// 					}
// 				}
// 			}
// 			return campaignData;
// 		}

// 		function addCampaign(campaignData) {
// 			var cookieData = (mmcore.GetCookie('mmsegassignments', 1) || '');
// 			try {
// 				cookieData += ',' + stringify(campaignData);
// 				mmcore.SetCookie('mmsegassignments', cookieData, 0, 1);
// 			} catch (e) {
// 				mmcore.EH(e);
// 			}
// 		}

// 		function cookieChange(campaign, curr, next) {
// 			var result = campaign;
// 			result[curr] = result[next];
// 			result.splice(next, 1);
// 			return result;
// 		}

// 		function setCookie() {
// 			var cookieData = (mmcore.GetCookie('mmsegassignments', 1) || ''),
// 				campaigns = [],
// 				campaignName,
// 				dataChanged = false,
// 				isFirstCall = null,
// 				i;

// 			isFirstCall = cookieData.match(/^,/);
// 			cookieData = cookieData.replace(/^,/, '');
// 			cookieData = cookieData.split(',');

// 			if (isFirstCall != null) {
// 				if (typeof mmcore.GA == 'function') {
// 					for (var i = 0; i < cookieData.length; i += 1) {
// 						//Up oleg ch
// 						campaignName = (cookieData[i].match(/\w+/)||[])[0];
// 						mmcore.GA('UA-233210-1', campaignName, 5);
// 					}
// 				}
// 			} else {
// 				for (i = 0; i < cookieData.length; i += 1) {
// 					//Up oleg ch
// 					campaignName = (cookieData[i].match(/\w+/)||[])[0];
// 					campaigns.push(campaignName);
// 				}

// 				for (i = 0; i < cookieData.length; i += 1) {
// 					var next = i + 1;
// 					for (next; next < cookieData.length; next += 1) {
// 						if (campaigns[i] == campaigns[next]) {
// 							if (cookieData[i] != cookieData[next]) {
// 								dataChanged = true;
// 								if (typeof mmcore.GA == 'function') {
// 									mmcore.GA('UA-233210-1', campaigns[i], 5);
// 								}
// 							}
// 							cookieData = cookieChange(cookieData, i, next);
// 							campaigns = cookieChange(campaigns, i, next);
// 							next -= 1;
// 						}
// 					}
// 				}
// 			}

// 			var storeData = stringify(cookieData.join());
// 			if (storeData.length > 128) {
// 				storeData = storeData.slice(0, 127);
// 			}
// 			mmcore.SetCookie('mmsegassignments', storeData, 0, 1);
// 		}

// 		if (campaignName != undefined) {
// 			var campaignData = makeCampaignData(campaignName);
// 			addCampaign(campaignData);
// 		}

// 		return {
// 			addCampaign: addCampaign,
// 			setCookie: setCookie
// 		};
// 	};

// 	mmcore.AddDocLoadHandler(function() {
// 		setTimeout(function() {
// 			var cookie = mmcore.experienceCookie();
// 			cookie.setCookie();
// 		}, 0);
// 	});
// }());
}catch(err){mmcore.EH(err);}
try{
mmcore.AddDocLoadHandler(function () {
	var $ = jQuery;
	$('.navigation').delegate('.dropdown a', 'click', function() {
		if ($(this).attr('href') != '#') {
		
			var $node = $(this).closest('.dropdown');
			var attr = $node.attr('class').replace(/\s*dropdown\s*/ig, '').replace(/[-\s]/g, ' '),
				thisDrdownCls = $(this).closest('.dropdown').attr('class'),
				mmThis = $(this);
			
			//Reformat Attribute for Camel Case
			function toTitleCase(str) {
				return str.replace(/(?:^|\s)\w/g, function(match) {
					return match.toUpperCase();
				});
			}
			
			//Reformat Attribute for Camel Case Apply
			function toTitleCaseRun(mmCategory){
				attr = attr + ',' + mmCategory + toTitleCase(mmThis.text().toLowerCase());
			}
			
			//Set additional attribute for each category
			function chooseElem(prefix1, prefix2, regexp){
				if (mmThis.hasClass('dropdown-toggle')){
					attr = attr + prefix1;
				}
				if (mmThis.text().toLowerCase().match(regexp)){
					toTitleCaseRun(prefix2);
				}
			}
			
			if (thisDrdownCls.match(/new-arrivals/)){ 
				chooseElem(',NA_TN', 'NA_', /womens|accessories|shoes|love21|plus|men|girls/);
			}
			if (thisDrdownCls.match(/love21/)){
				chooseElem(',L21_TN', 'L21_', /new arrivals|sale/);
			}
			if (thisDrdownCls.match(/women/)){
				chooseElem(',Women_TN', 'Women_', /shoes|accessories|love21/);
			}
			if (thisDrdownCls.match(/^men/)){
				chooseElem(',Men_TN', 'Men_', /new arrivals|shoes|accessories|sale/);
			}
			if (thisDrdownCls.match(/shoes/)){
				chooseElem(',Shoes_TN', 'Shoes_', /sale/);
			}
			if (thisDrdownCls.match(/accessories/)){
				chooseElem(',Acc_TN', 'Acc_', /sale|shoes/);
			}
			if (thisDrdownCls.match(/plus/)){
				chooseElem(',Plus_TN', 'Plus_', /new arrivals|sale|accessories/);
			}
			if (thisDrdownCls.match(/sale/)){
				chooseElem(',Sale_TN', 'Sale_',/women|accessories|shoes|love21|plus|men|girls|clothing/);
			}
			if (thisDrdownCls.match(/girls/)){
				chooseElem(',Girls_TN', 'Girls_',/new arrivals|sale|shoes/);
			}
			if (thisDrdownCls.match(/lookbooks/)){
				if ($(this).hasClass('dropdown-toggle')){
					attr = attr + ',Lookbooks_TN';
				}
			}
			if (attr.match(/girls/) && $node.text().indexOf('Kids') != -1) {
				attr = 'kids';
				chooseElem(',Kids_TN', 'Kids_', /new arrivals|sale|shoes/);
			} else if (attr == 'plus') {
				attr = 'plus sizes';
			}
			attr = attr.replace(/Accessories/,'Acc').replace(/New Arrivals/,'NA');
			mmcore.$Action('TopNavClick', 1, attr);
		}
	});
});
}catch(err){mmcore.EH(err);}
try{
mmcore.AddDocLoadHandler(function(){
    var $ = jQuery;
    function mm_action(){
        mmcore._async = true;
        mmcore.SetPageID('mmevents');
        mmcore.CGRequest();
    }
    if (location.href.indexOf('Product/Category.aspx') > -1){
        eval('window.fn_showBasket = ' + fn_showBasket.toString().replace('var temp;','var temp; mmcore.SetAction("AddtoCart",1,"QuickView"); mm_action();'));
    } else {
        eval('window.fn_showBasket = ' + fn_showBasket.toString().replace('var temp;','var temp; mmcore.SetAction("AddtoCart",1,"PDP"); mm_action();'));
    }
});
}catch(err){mmcore.EH(err);}
try{
mmcore.AddDocLoadHandler(function () {
	var request = function () {
		mmcore._async = true;
		mmcore.SetPageID('mmevents');
		mmcore.CGRequest();
	};

	mmcore.on('t25_continue_shopping', function () {
		mmcore.$Action('T25CtnShopping', 1, '');
		request();
	});

	$(document.body).delegate('a[href*="CheckOut/Basket.aspx"], a[href*="Checkout/Basket.aspx"]', 'click', function () {
		var attr = 'Header';
		if ($(this).is('.mm_basket_view_bag') || $(this).closest('#showBasket').length) {
			attr = 'CTA';
		}
		mmcore.$Action('T25ViewBag', 1, attr);
	});
});

}catch(err){mmcore.EH(err);}
try{
mmcore.AddDocLoadHandler(function () {
	if (window.$j && window.fn_AddToBasket) {
		var genCampaign = function (data, style) {
			if (mmcore.GenInfo.T25_CartOverlay) {
				mmcore.trigger('t25_add_to_basket', data);
				style.detach();
			} else {
				for (var key in mmcore.criteria) {
					mmcore.SetPersCriterion(key, mmcore.criteria[key]);
				}
				mmcore.HideMaxyboxes = function () {
				};
				mmcore._async = true;
				mmcore.SetPageID('T25_CartOverlay ID');
				setTimeout(function () {
					style.detach();
				}, 2E3);
				mmcore.CGRequest(function () {
					mmcore.trigger('t25_add_to_basket', data);
					style.detach();
				});
			}

		};

		//Convert array to object
		var responseToObject = function (response) {
			var out = {};
			for (var i = 0; i < response.length; i++) {
				switch (response[i].title) {
					case 'type':
						out.type = response[i].value;
						break;
					case 'sku':
						out.sku = response[i].value;
						break;
					case 'product_name':
						out.product_name = response[i].value;
						break;
					case 'category_name':
						out.category_name = response[i].value;
						break;
					case 'color':
						out.color = response[i].value;
						break;
					case 'color_id':
						out.color_id = response[i].value;
						break;
					case 'size':
						out.size = response[i].value;
						break;
					case 'qty':
						out.qty = response[i].value;
						break;
					case 'total_qty':
						out.total_qty = response[i].value;
						break;
					case 'total_amount':
						out.total_amount = response[i].value;
						break;
					case 'gift_amount':
						out.gift_amount = response[i].value;
						break;
					case 'preorder':
						out.preorder = response[i].value;
						break;
					case 'price':
						out.price = response[i].value;
						break;
					case 'formatted_price':
						out.formatted_price = response[i].value;
						break;
					case 'formatted_totamt':
						out.formatted_totamt = response[i].value;
						break;
					default:
						break;
				}
			}
			return out;
		};

		var getMoreProductInfo = function (event) {
			//product into iFrame or not
			var context = $('iframe#popupFrame[src*="product_pop.aspx"], body').contents();
			moreData = {
				color: context.find('select[id$="ddlColor"] option:selected, #ddlColor option:selected').html() || '',
				size: context.find('select[id$="ddlSize"]  option:selected').html() || '',
				was_price: context.find('.was-now-price s').html() || '',
				additional_info: context.find('.FinalSale').length > 0
			};
		};
		var preOpenAddToBasket = function (result) {
			var response;
			try {
				response = responseToObject(JSON.parse(result));
			} catch (err) {
				mmcore.EH(err);
			}


			var style = mmcore.snippets.Style('#showBasket {display: none !important;}');
			$.get('//www.forever21.com/CheckOut/Basket.aspx', function (data) {
				//prepare data
				moreData.free_shipping = $(data).find('.ship_msg').html() || '';

				moreData.new_sku = $(data).find('.sc_item_list a[onclick*='+ response.sku +'] img').attr('src') || '';

				//Prepare data for template
				if (moreData.additional_info) {
					moreData.additional_info = '<span>Final Sale</span>';
				} else {
					moreData.additional_info = '';
				}

				if (moreData.was_price) {

					moreData.was_price = '<div class="mm_basket_sale_price"><del>' + moreData.was_price + '&nbsp</del>&nbsp</div>';
				}

				if (moreData.free_shipping.indexOf('Free Shipping!') != -1) {
					var m = moreData.free_shipping.match(/re\s(.*)\saway/);
					var free = 50;
					if (m) {
						free = m[1];
					}
					moreData.free_shipping = 'You are <em>' + free + '</em> away from <div>FREE SHIPPING</div>';
				} else {
					moreData.free_shipping = '<div>' + moreData.free_shipping + '</div>';
				}

				genCampaign($.extend(response, moreData), style);
			});


		};

		var moreData = {};
		window.fn_AddToBasket = (function (initFn) {
			return function () {
				if((arguments[0]||'').toLowerCase().indexOf('"value":"add"') != -1){
					getMoreProductInfo();
					preOpenAddToBasket(arguments[0]);
				}
				return  initFn.apply(this, arguments);
			};
		}(window.fn_AddToBasket));
	}


});

}catch(err){mmcore.EH(err);}
if(typeof mmcore._callback=='object'&&typeof mmcore._callback[1]=='function'){try{mmcore._callback[1]();}catch(err){mmcore.EH(err);}
finally{mmcore._callback[1]=null;}}
})();