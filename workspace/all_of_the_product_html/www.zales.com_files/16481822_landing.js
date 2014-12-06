// Copyright Channel Intelligence, Inc. 2002-2008
if(window.location.protocol.toLowerCase() == 'http:'||window.location.href.toLowerCase().indexOf('process=myaccount')>-1){
	var ci_vid= 16481822;
	var ci_cookieDomain=".zales.com";
	var ci_refDomain=".zales.com";
	var ci_imgs=[];
	var hs_aOE="";
	var hs_ES="";
	var h_w="";

	function ci_FP(ci_pix_url,protocol){var ci_pic=new Image(1,1);ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}
	function ci_FP_SCRIPT(ci_pix_url, protocol){document.write('<script type="text/javascript" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></script>');}
	function ci_FP_FRAME(ci_pix_url, protocol){document.write('<iframe width="0" scrolling="no" height="0" frameborder="0" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></iframe>');}

	function ci_RQV(name,dValue){
	    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.location);
	    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return qArg[1];}
	}
	function ci_CC(name,value,daysTillExpire){
		if (daysTillExpire){
			var exDate=new Date();
			exDate.setTime(exDate.getTime()+(daysTillExpire*24*60*60*1000));
			document.cookie=name+'='+value+'; expires='+exDate.toGMTString()+'; domain='+ci_cookieDomain+'; path=/';
		}
	}
	function CI_ExternalJS(link){
		try{
		  	var script  = document.createElement('script');
		  	script.src  = link;
		  	script.type = 'text/javascript';
		  	script.defer = true;
		  	document.getElementsByTagName('head').item(0).appendChild(script);	
		}catch(err){}
	}
	function ci_UID(value){
		var today=new Date();
		var UID=ci_vid+"-"+value+"-"+Math.floor(Math.random()*9999999999)+today.getFullYear().toString()+today.getMonth().toString()+ today.getDay().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString();
		return UID;
	}
	function CI_GetValue(ci_vName,ci_dValue) {
		if (typeof(window[ci_vName])!=="undefined"){return window[ci_vName];}else{return ci_dValue===undefined?null:ci_dValue;}
	}
	function ci_PIX(loc,eid,tid,src,sku,tag,cat){
		var url='';
		if (loc===1){url='ttwbs.channelintelligence.com?';}
		if (loc===2){url='cts-log.channelintelligence.com?';}
		url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
		if(src!==null){url+='&src='+src;}
		if(sku!==null){url+='&sku='+sku;}
		if(tag!==null){url+='&tag='+tag;}
		if(cat!==null){url+='&cat='+cat;}
		url += "&ref="+escape(document.referrer);
		if (loc===1){return ci_FP(url);}
		if (loc===2){return ci_FP(url, 'http');}
	}
	try {
		var ci_cpncode=ci_RQV('cpncode');
		var ci_srccode=ci_RQV('srccode');
		var ci_src=ci_RQV('ci_src');
		var ci_sku=ci_RQV('ci_sku');
		var ci_tag=ci_RQV('ci_tag');
		var ci_tid=ci_RQV('ci_tid', '');
		var ci_customeremail=CI_GetValue('CI_CustomerEmail',null);
		var ci_itemid=CI_GetValue('CI_ItemID',null);
		var ci_catid=CI_GetValue('CI_CatID',null);
		var ci_pagetype=CI_GetValue('CI_PageType',null);
		
		if(ci_tid===''){
			ci_tid=ci_UID(ci_sku);
		}
		
		
		//Kenshoo
		try{
			ci_FP("www.xg4ken.com/media/redir.php?url=http%3A%2F%2Fmpp.vindicosuite.com%2Fsync%2F%3Fpu%3D_kenshoo_clickid_%26pid%3D31%20%0A%0A");
		}catch(err){}
		
		
		//Google Code for Remarketing Tag
		try{
			if(ci_pagetype!=='cart'){
				var google_tag_params = {
				ecomm_prodid:ci_itemid,
				ecomm_pagetype:ci_pagetype,
				ecomm_totalvalue:''
				};
				var google_conversion_id = 987223671;
				var google_conversion_label = "z1jECNG3qgoQ96zf1gM";
				var google_custom_params = window.google_tag_params;
				var google_remarketing_only = true;
				document.write('<scr'+'ipt type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"><\/scr'+'ipt>');
			}	
		}catch(err){}
		

		//BevyUp
		try{
			document.write('<scr'+'ipt type="text/javascript" async id="bevyup_partner_script" src="//b.bevyup.com/GetTemplateScript/zales_x5"><\/scr'+'ipt>');
		}catch(err){}
		
		try{
			if(ci_pagetype==='home'){
				ci_FP('r.turn.com/r/beacon?b2=Gb-YJy0BD3vIgXWzGOUtTVPOdGXKomfA1R33Fv3gaAP0JyeSbBHm2m2_ttLI-29KkMT54kXJZjSigSwtwBfhQA&cid=');
				//Adocado
				ci_FP('pixel.adacado.com/adacadoWeb/rt?advertiserId=1000427&query=GeneralAd');
			}
			if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1){
				ci_FP('r.turn.com/r/beacon?b2=nouNiY0pbYfifhiT3yozTeQa0gSaQP9EejzlAtF087BYFvdW8HkZimkwenJImnJpS8hulgtsK7ff3jKv7KAFJg&cid=');
			}
		}catch(err){}
		
		// Doubleclick Spotlight
		try{
			var axel = Math.random()+"";
			var a = axel * 10000000000000;
			ci_FP('ad.doubleclick.net/activity;src=2448552;type=landi922;cat=landi187;ord='+ a + '?');
		}catch(err){}
		
		//SpecificMedia-Vera Wang
		try{
			if(ci_catid=='12134615'){
				ci_FP('bp.specificclick.net?pixid=99069676');
			}
		}catch(err){}
		
		//SpecificMedia-Jessica Simpson
		try{
			if(ci_catid=='12134603'){
				ci_FP('bp.specificclick.net?pixid=99069675');
			}
		}catch(err){}
		
		//Yahoo
		try{
			ci_FP('idcs.interclick.com/Segment.aspx?sid=8d1a234c-1208-4ddb-9f08-c900b0eeebb6');
		}catch(err){}
		
		//Google Retargeting
		try{
			ci_FP('googleads.g.doubleclick.net/pagead/viewthroughconversion/1071236797/?value=0&amp;label=oDZRCLOL3AMQvY3n_gM&amp;guid=ON&amp;script=0');
		}catch(err){}
		
					 		
 		//Zales Corp Retargeting Pixel
 		try{
 			ci_FP("bp.specificclick.net?pixid=99027498");
 		}catch(err){}
		
		//Google
 		try{
			ci_FP("www.googleadservices.com/pagead/conversion/1007914368/?label=uegnCKi_mgIQgJvO4AM&amp;guid=ON&amp;script=0");
		}catch(err){}
		
		 
		//Facebook remarketing
		try{
			if(ci_catid=='16037176'||ci_catid=='28474626'||ci_catid=='21355206'){
				ci_FP('www.facebook.com/tr?id=1397081353883954&ev=NoScript');
			}
		}catch(err){}
		
		//Google Analytics 
		try{
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-47825334-1']);
			_gaq.push(['_setCustomVar', 3, 'ecomm_prodid', ci_itemid]);
			_gaq.push(['_setCustomVar', 5, 'ecomm_pagetype', ci_pagetype]);
			_gaq.push(['_trackPageview']);
		
		  (function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		}catch(err){}
		
		//LiveRamp
		try{
			var _lrc = _lrc || [];
			_lrc.push(['aw_lrid', '383336']);
			_lrc.push(['ds_lrid', '383346']);
			(function() {
			var ga2 = document.createElement('script'); ga2.type = 'text/javascript';
			ga2.src = '//cdn.rlcdn.com/js/ga.js?' + new Date().getTime();
			var s2 = document.getElementsByTagName('script')[0]; s2.parentNode.insertBefore(ga2, s2);
			})();
		}catch(err){}
	
				
		try{
			if(ci_cpncode!==null){
				ci_CC('ci_cpncode',ci_cpncode,-1);
				ci_CC('ci_src',ci_srccode,-1);
				ci_CC('ci_tid',"",-1);
			} else if(ci_src!==null && ci_sku!==null) {
				ci_CC('ci_cpncode',"",-1);
				ci_CC('ci_tid',ci_tid,1);
				ci_CC('ci_src',ci_src,1);
				ci_PIX(2,23,ci_tid,ci_src,ci_sku,null,ci_catid);
			} else if(ci_tag!==null) {
				ci_CC('ci_cpncode',"",-1);
				ci_CC('ci_tid',ci_tid,-1);
				ci_PIX(2,7,ci_tid,null,ci_itemid,ci_tag,ci_catid);
			} else if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1){
			    ci_PIX(2,13,null,null,ci_itemid,null,ci_catid);
			}
				ci_PIX(1,49,null,null,ci_itemid,'landing',ci_catid);
		}catch(err){}
	}catch(err){}
}