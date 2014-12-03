// Copyright Channel Intelligence, Inc. 2002-2008
var ci_vid= 16981092;
var ci_cookieDomain=".undergear.com";
var ci_refDomain=".undergear.com";
var ci_testDomains=new Array("csdev","csqa");
var ci_imgs=[];

function ci_ITD(){if(ci_testDomains!=undefined){for(i=0;i<ci_testDomains.length;i++){if(document.referrer.indexOf(ci_testDomains[i], 0)>=0){return true}}}return false}
function ci_FP(ci_pix_url,protocol){var ci_pic=document.createElement('img');ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}

function ci_RQV(name,dValue){
    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.document.location);
    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return qArg[1];}
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
function ci_PIX(loc,eid,tid,src,sku,tag){
	var url='';
	if (loc===1){url='origin.channelintelligence.com/log.asp?';}
	if (loc===2){url='cts-log.channelintelligence.com?';}
	url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
	if(src!==null){url+='&src='+src;}
	if(sku!==null){url+='&sku='+sku;}
	if(tag!==null){url+='&tag='+tag;}
	url += "&ref="+escape(document.referrer);
	return ci_FP(url, 'http');
}
try {
	var ci_cpncode=ci_RQV('cpncode');
	var ci_srccode=ci_RQV('srccode');
	var ci_src=ci_RQV('ci_src');
	var ci_sku=ci_RQV('ci_sku');
	var ci_tag=ci_RQV('ci_tag');
	var ci_tid=ci_UID(ci_sku);
	
	if(ci_tag===null&&ci_src===null&&ci_cpncode===null){
		var ci_ven=ci_RQV('cm_ven');
		var ci_mmc=ci_RQV('cm_mmc');
		if(ci_ven!==null){ci_tag=ci_ven;}
		if(ci_ven===null&&ci_mmc!==null){ci_tag=ci_mmc;}
	}

	if(ci_cpncode!==null){
		ci_CC('ci_cpncode',ci_cpncode,90);
		ci_CC('ci_pixmgr',ci_srccode,90);
		ci_CC('ci_tid',"",-1);
	} else if(ci_src!==null && ci_sku!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,90);
		ci_CC('ci_pixmgr',ci_src,90);
		ci_PIX(2,23,ci_tid,ci_src,ci_sku,null);
	} else if(ci_tag!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,90);
		ci_CC('ci_pixmgr',ci_tag,90);
		ci_PIX(2,7,ci_tid,null,null,ci_tag);
	} else if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1&&document.referrer!==''&&ci_ITD()===false){
	    ci_PIX(2,13,null,null,null,null);
	}
}    
catch(err){}