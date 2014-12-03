var ci_windowHost = window.location.host;
if(ci_windowHost.indexOf('atlanta.hp.com',0) === -1 && ci_windowHost.indexOf('houston.hp.com',0) === -1) {	
	var ci_imgs=[];
	function ci_FP(ci_pix_url,protocol)
	{var ci_pic=new Image(1,1);ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}
	var ci_referrer = '';
	var ci_referrer_blocked = false;
	try {ci_referrer = escape(document.referrer);}catch (err){ci_referrer_blocked = true;}

	//preventing from running in cart/confirmation (https) until landing.js gets removed from those pages	
	if(window.location.protocol.toLowerCase() == 'http:'){
		var ci_vid= 9919466;
		var ci_cookieDomain=".hp.com";
		var ci_refDomain="shopping.hp.com";

		function ci_FP_FRAME(ci_pix_url, protocol){document.write('<iframe width="0" scrolling="no" height="0" frameborder="0" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></iframe>');}
		function ci_FP_SCRIPT(ci_pix_url, protocol){document.write('<script type="text/javascript" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></script>');}

		function ci_RQV(name,dValue){
		    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.document.location);
		    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return escape(qArg[1]);}
		}
		
		function CI_GetValue(ci_vName,ci_dValue) {
			if (typeof(window[ci_vName])!=="undefined"){return window[ci_vName];}else{return ci_dValue===undefined?null:ci_dValue;}
		}
		function CI_ReadCookie(ci_cookieName) {
			var ci_cookieParts = document.cookie.split(';');
			ci_cookieName += '=';
			for (var ci_cookiePartIndex=0;ci_cookiePartIndex<ci_cookieParts.length;ci_cookiePartIndex++)
			{
				var ci_cookiePart=ci_cookieParts[ci_cookiePartIndex];
				while (ci_cookiePart.charAt(0)===' '){ci_cookiePart=ci_cookiePart.substring(1,ci_cookiePart.length);}
				if (ci_cookiePart.indexOf(ci_cookieName)===0){return ci_cookiePart.substring(ci_cookieName.length,ci_cookiePart.length);}
			}
			return null;
		}
		function ci_CC(name,value,daysTillExpire){
			if (daysTillExpire){
				var exDate=new Date();
				exDate.setTime(exDate.getTime()+(daysTillExpire*24*60*60*1000));
				document.cookie=name+'='+value+'; expires='+exDate.toGMTString()+'; domain='+ci_cookieDomain+'; path=/';
			}
		}
		function CI_LogError(err, customIdentifier) {
			try {
				var oI=new Image();oI.src='https://secure.channelintelligence.com/links/support/js.error.asp?nVID='+ci_vid+'&sCustomerIdentifier='+customIdentifier+'&sMessage='+encodeURIComponent(err.message)+'&sName='+encodeURIComponent(err.name)+'&nNumber='+(err.number&0xFFFF).toString();
			}catch (err1) {}
		}
		function ci_UID(value){
			var today=new Date();
			var UID=ci_vid+"-"+value+"-"+Math.floor(Math.random()*9999999999)+today.getFullYear().toString()+today.getMonth().toString()+ today.getDay().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString();
			return UID;
		}
		function ci_PIX(loc,eid,tid,src,sku,tag,cid){
			var url='';
			if (loc===1){url='origin.channelintelligence.com/log.asp?';}
			if (loc===2){url='cts-log.channelintelligence.com?';}
			url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
			if(src!==null){url+='&src='+src;}
			if(sku!==null){url+='&sku='+sku;}
			if(tag!==null){url+='&tag='+tag;}
			if(cid!==null){url+='&cid='+cid;}
			url += "&ref="+ci_referrer;
			if(ci_referrer_blocked==true){url+='&refblocked=true';}
			return ci_FP(url, 'http');
		}
		try {
			var ci_cpncode=ci_RQV('cpncode');
			var ci_srccode=ci_RQV('srccode');
			var ci_skuhp=CI_GetValue('ci_sku',null);
			var ci_src=ci_RQV('ci_src');
			//encodeURIComponent to encode #ABA
			var ci_sku=encodeURIComponent(ci_RQV('ci_sku'));
			var ci_tag=ci_RQV('ci_tag');
			var ci_aoid=ci_RQV('aoid');
			var ci_tid=ci_RQV('ci_tid', '');
			var ci_source=ci_RQV('source');
			var ci_jumpidemail=ci_RQV('jumpid');
			var ci_cid=ci_RQV('ci_cid');
			var ci_categoryhp=CI_GetValue('ci_category',null);
			var ci_category=ci_RQV('category');
			var ci_landinghp=CI_GetValue('ci_landing',null);
			var ci_landing=ci_RQV('landing');
			var ci_serieshp=CI_GetValue('ci_series',null);
			var ci_productcode=ci_RQV('product_code');
			var ci_seriesname=ci_RQV('series_name');
			//var ci_itemid=null;
			//var ci_catid=null;
			var ci_proc=null;
			
			//NextJump
			//var ci_nxjcsid=ci_RQV('u1');
			//if(ci_nxjcsid!==null){ci_CC('ci_u1',ci_nxjcsid,30);}
			
			var ci_gpa=ci_RQV('ci_gpa');
			if(ci_gpa!==null && ci_sku!==null){
				if(ci_gpa=='pla'){ci_src='17588969';}
				if(ci_gpa=='pe'){ci_src='27500988';}
			}

			if(ci_tid===''){ci_tid=ci_UID(ci_sku);}
			
			//Get Category and SKU values passed by HP
			var ci_itemid=CI_GetValue('CI_ItemIDs',null);
			var ci_catid=CI_GetValue('ci_catid',null);
			
			if(ci_itemid!==null||ci_catid!==null||ci_proc!=null){
				try{
					ci_FP_FRAME(
						'pixels.youknowbest.com/cfc.html?vid=' + ci_vid
						+(ci_itemid===null?'':'&lastsku='+ci_itemid)
						+(ci_catid===null?'':'&lastcat='+ci_catid)
						+(ci_proc===null?'':'&lastproc='+ci_proc)
					);

				}catch(err){CI_LogError(err, 'landing_PerformanceMkting');}
			}

			if(ci_aoid!==null&&ci_source==='MSNCashbackDirect'){ci_CC('ci_pixmgr','MSN',90);ci_tag=ci_aoid;}
			if(ci_tag===null&&ci_aoid!==null){if(ci_jumpidemail!=undefined&&ci_jumpidemail.substring(0,3)==='em_'){ci_tag=ci_jumpidemail;}else{ci_tag=ci_aoid;}ci_CC('ci_pixmgr',ci_aoid,90);ci_CC('ci_tag',ci_tag,90);}
			
			//YesMail
			//if(location.href.toLowerCase().indexOf('em_r329')>-1){ci_CC('ci_yesmail','1',90);}else if (ci_aoid!==null&&location.href.toLowerCase().indexOf('em_r329')===-1){ci_CC('ci_yesmail','',90);}
			
			if(ci_cpncode!==null){
				ci_CC('ci_cpncode',ci_cpncode,90);
				ci_CC('ci_src',ci_srccode,90);
				ci_CC('ci_tid',"",-1);
			} else if(ci_src!==null && ci_sku!==null) {
				ci_CC('ci_cpncode',"",-1);
				ci_CC('ci_tid',ci_tid,90);
				ci_CC('ci_src',ci_src,90);
				ci_PIX(2,23,ci_tid,ci_src,ci_sku,null,ci_cid);
			} else if(ci_tag!==null) {
				ci_CC('ci_cpncode',"",-1);
				ci_CC('ci_tid',ci_tid,90);
				ci_PIX(2,7,ci_tid,null,null,ci_tag,ci_cid);
			} else if(ci_referrer.toLowerCase().indexOf(ci_refDomain)===-1){
				ci_PIX(2,13,null,null,null,null,ci_cid);
			} 

			//Intra
			
			try{
				ci_PIX(2,49,ci_tid,null,ci_itemid,null,ci_cid);
			}catch(err){CI_LogError(err, 'landing_IntrasiteLogging');}
		}catch(err1){CI_LogError(err1, 'landing1');}
	}
}