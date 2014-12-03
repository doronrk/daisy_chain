$(document).ready(function () {
	function initSns() {
		$.getScript("http://platform.twitter.com/widgets.js", function() {
			//$(".twitter-share-button").show();
		});
		(function(){
			if(document.getElementById('vk_like')) {
				if(lg.locale=='/ru'){
					$.getScript("http://vkontakte.ru/js/api/openapi.js", function() {
						  VK.init({
								apiId: 3267939, 
								onlyWidgets: true
							  });
							/* LGERU-1407 20140217 modify */
							VK.Widgets.Like('vk_like',{type: "button",height: 20});
							/* LGERU-1407 20140217 modify */
					});
				}
				if(lg.locale=='/ua'){
					$.getScript("http://vkontakte.ru/js/api/openapi.js?101", function() {
						  VK.init({apiId: 3906913, onlyWidgets: true});
						  VK.Widgets.Like("vk_like", {type: "button"});
					});
				}
			}
		}());
		(function(){
			if(document.getElementById('fb-root')) {
				var url = document.getElementById('fb-root').getAttribute('channel_url');
				var e = document.createElement('script');
				e.async = true;
				e.src = url;
				document.getElementById('fb-root').appendChild(e);
			}
		}());
		var gplusLang = document.getElementById('g-plusone').getAttribute('lang');
		window.___gcfg = {         
			lang: gplusLang       
		};        
		(function() {   
			var po = document.createElement('script'); 
			po.type = 'text/javascript'; 
			po.async = true;         
			po.src = 'https://apis.google.com/js/plusone.js';         
			var s = document.getElementsByTagName('script')[0]; 
			s.parentNode.insertBefore(po, s);       
		})(); 
		(parseInt($.browser.version,10) == 7) ? $('.gplusBtn').hide() : null;

		$.getScript("https://assets.pinterest.com/js/pinit.js");	
		
		
	}

	// FaceBook Like Button Section
	window.fbAsyncInit = function(){
		FB.init({
			cookie: true,
			xfbml: true
		});
	}; 
	
	try {
		initSns();
	} catch (e) {}
	
	/* LGERU-1171 20131101 add, SMG-5495 20131213 Edit */
	if(lg.locale=='/ru'){
		!function (d, id, did, st) { var js = d.createElement("script"); js.src = "http://connect.ok.ru/connect.js"; js.onload = js.onreadystatechange = function () { if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") { if (!this.executed) { this.executed = true; setTimeout(function () { OK.CONNECT.insertShareWidget(id,did,st); }, 0); } }}; d.documentElement.appendChild(js); }(document,"ok_shareWidget",document.location.href,"{width:145,height:30,st:'straight',sz:20,ck:1}");
	}
	/* //LGERU-1171 20131101 add, SMG-5495 20131213 Edit */
});

	
