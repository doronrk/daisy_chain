// Copyright Channel Intelligence, Inc. 2002-2008
var ci_vid= 15580542;
var ci_cookieDomain=".thingsremembered.com";
var ci_refDomain=".thingsremembered.com";
var ci_imgs=[];
var ci_frames=0; 
 
function ci_FP(ci_pix_url,protocol){var ci_pic=document.createElement('img');ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}
function ci_FP_SCRIPT(ci_pix_url, protocol){document.write('<script type="text/javascript" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></script>');}
function ci_FP_FRAME(ci_pix_url){document.write('<iframe width="0" scrolling="no" height="0" frameborder="0" src="' + ci_pix_url + '"></iframe>');}

function ci_RQV(name,dValue){
    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.document.location);
    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return qArg[1];}
}
function CI_GetValue(ci_vName,ci_dValue) {
	if (typeof(window[ci_vName])!=="undefined"){return window[ci_vName];}else{return ci_dValue===undefined?null:ci_dValue;}
}
function CI_LogError(err, customIdentifier) {
	try {
		var oI=new Image();oI.src='https://secure.channelintelligence.com/links/support/js.error.asp?nVID='+ci_vid+'&sCustomerIdentifier='+customIdentifier+'&sMessage='+encodeURIComponent(err.message)+'&sName='+encodeURIComponent(err.name)+'&nNumber='+(err.number&0xFFFF).toString();
	}catch (err1) {}
}
function ci_CC(name,value,daysTillExpire){
	if (daysTillExpire){
		var exDate=new Date();
		exDate.setTime(exDate.getTime()+(daysTillExpire*24*60*60*1000));
		document.cookie=name+'='+value+'; expires='+exDate.toGMTString()+'; domain='+ci_cookieDomain+'; path=/';
	}
}
function ci_UID(value){
	var today=new Date();
	var UID=ci_vid+"-"+value+"-"+Math.floor(Math.random()*9999999999)+today.getFullYear().toString()+today.getMonth().toString()+ today.getDay().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString();
	return UID;
}
//New: includes pixel timeout
function ci_PIX(loc,eid,tid,src,sku,tag,timeout){
	try{
		var url='';
		if (loc===2){url=window.location.protocol.toLowerCase()=='http:'?'cts-log.channelintelligence.com?':'ttwbs.channelintelligence.com?';}
		if (loc===3){url='rdr.tag.channelintelligence.com/log.aspx?';}
		url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
		if(src!==null){url+='&src='+src;}
		if(sku!==null){url+='&sku='+sku;}
		if(tag!==null){url+='&tag='+tag;}
		url += "&ref="+escape(document.referrer);
		if(timeout) {
			ci_FP_Timeout(url,null,timeout)
		} else {
			return ci_FP(url);
		}
	}catch(err){CI_LogError(err, 'landing_ci_PIX_function');}
}

//Pixel Timeout Functions
function ci_FP_Timeout(ci_pix_url, protocol, timeout){
	try{
		var ci_frameIndex = ci_frames; ci_frames = ci_frames + 1; ci_pix_url = (protocol ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url; document.write('<iframe id="ci_iframe_' + ci_frameIndex + '" name="ci_iframe_' + ci_frameIndex + '" width="0" scrolling="no" height="0" frameborder="0" src="' + ci_pix_url + '" onload="return ci_FP_Timeout_onload(' + ci_frameIndex + ')" ></iframe>'); setTimeout('ci_FP_Timeout_ontimeout(' + ci_frameIndex + ')', timeout);
	}catch(err){CI_LogError(err, 'ci_FP_Timeout');}
 }
function ci_FP_Timeout_ontimeout(frameIndex) {
	try{
		var ci_frame = document.getElementById('ci_iframe_' + frameIndex); if (ci_frame) { ci_frame.setAttribute('src', 'http://content.channelintelligence.com/images/blank.gif'); setTimeout('ci_FP_Timeout_onremoveiframe(' + frameIndex + ')', 10); }
	}catch(err){CI_LogError(err, 'ci_FP_Timeout_ontimeout');}
}
function ci_FP_Timeout_onload(frameIndex) {
	try{
		var ci_frame = document.getElementById('ci_iframe_' + frameIndex); if (ci_frame) { setTimeout('ci_FP_Timeout_onremoveiframe(' + frameIndex + ')', 10); }
	}catch(err){CI_LogError(err, 'ci_FP_Timeout_onload');}
}
function ci_FP_Timeout_onremoveiframe(frameIndex) {
	try{
		var ci_frame = document.getElementById('ci_iframe_' + frameIndex); if (ci_frame) { ci_frame.parentNode.removeChild(ci_frame); }
	}catch(err){CI_LogError(err, 'ci_FP_Timeout_onremoveiframe');}
}

try{
		var ci_cpncode=ci_RQV('cpncode');
		var ci_srccode=ci_RQV('srccode');
		var ci_src=ci_RQV('ci_src');
		var ci_sku=ci_RQV('ci_sku');
		var ci_tag=ci_RQV('ci_tag');
		var ci_itemid=CI_GetValue('CI_ItemID',null);
		var ci_gpa=ci_RQV('ci_gpa');
		var ci_pagetype=CI_GetValue('CI_PageType',null);
		var ci_itemprice=CI_GetValue('CI_ItemPrice',null);
		
		if(ci_pagetype!==null){
			ci_pagetype=ci_pagetype.toLowerCase();
		}
		
		//custom code to dynamically assign ci_src if ci_gpa is found
		if(ci_gpa!==null && ci_sku!==null){
			if(ci_gpa=='pla'){ci_src='64119933';}
			if(ci_gpa=='pe'){ci_src='27500988';}
		}

		var ci_tid=ci_RQV('ci_tid', '');
		if(ci_tid===''){
			ci_tid=ci_UID(ci_sku);
		}
		
		//Facebook
		try{
			if(location.href.toLowerCase()=='http://www.thingsremembered.com/'||location.href.toLowerCase()=='http://www.thingsremembered.com/home.jsp'){
				ci_FP('www.facebook.com/tr?id=270382016455729&ev=NoScript','http');
			}
		}catch(err){}
		
		//Brideclick
		try{
			if(location.href.toLowerCase()=='http://www.thingsremembered.com/section/Wedding/2114.uts'){
				ci_FP('pubads.g.doubleclick.net/activity;xsp=814520;ord=1?','http');
			}
			ci_FP('pubads.g.doubleclick.net/activity;dc_iu=/39950040/DFPAudiencePixels;dc_seg=23618650;ord=1?');
			ci_FP_SCRIPT('tags.crwdcntrl.net/c/4149/cc_af.js');
		}catch(err){}
		
		//Google Retargeting	
		try{
			if(window.location.protocol.toLowerCase()=='http:'){
				ci_FP('googleads.g.doubleclick.net/pagead/viewthroughconversion/930428591/?value=0&guid=ON&script=0&data=ecomm_prodid='+ci_itemid+';ecomm_totalvalue='+ci_itemprice+';ecomm_pagetype='+ci_pagetype,'http');
			}
		}catch(err){}
		
		//Google Analytics
		try{
			  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  				ga('create', 'UA-43444240-1', 'thingsremembered.com');
  				ga('send', 'pageview');
		}catch(err){}
		
		//MediaMath
		try{
			if(location.href.toLowerCase()=='http://www.thingsremembered.com/'||location.href.toLowerCase()=='http://www.thingsremembered.com/home.jsp'){
				ci_FP_SCRIPT('pixel.mathtag.com/event/js?mt_id=407428&mt_adid=119565&v1=&v2=&v3=&s1=&s2=&s3=');
			}
		}catch(err){}
		
		//Cedexis
		try{
			(function (w, d) {
				var a = function () {
						var a = d.createElement('script');
						a.type = 'text/javascript';
						a.async = 'async';
						a.src = '//' + ((w.location.protocol === 'https:') ? 's3.amazonaws.com/cdx-radar/' : 'radar.cedexis.com/') + '01-11095-radar10.min.js';
						d.body.appendChild(a);
				};
				if (w.addEventListener) {
					w.addEventListener('load', a, false);
				} else if (w.attachEvent) {
					w.attachEvent('onload', a);
				}
			}(window, document));
		}catch(err){}
		
		
		if(ci_cpncode!==null){
			ci_CC('ci_cpncode',ci_cpncode,30);
			ci_CC('ci_src',ci_srccode,30);
			ci_CC('ci_tid',"",-1);
		} else if(ci_src!==null && ci_sku!==null) {
			ci_CC('ci_cpncode',"",-1);
			ci_CC('ci_tid',ci_tid,30);
			ci_CC('ci_src',ci_src,30);
			ci_PIX(2,23,ci_tid,ci_src,ci_sku,null,2500);
		} else if(ci_tag!==null) {
			ci_CC('ci_cpncode',"",-1);
			ci_CC('ci_tid',ci_tid,30);
			ci_PIX(2,7,ci_tid,null,ci_itemid,ci_tag,2500);
		} else if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1){
		    ci_PIX(2,13,null,null,ci_itemid,null,2500);
		}
}catch(err){}