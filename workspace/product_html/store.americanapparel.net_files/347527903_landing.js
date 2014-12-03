// Copyright Channel Intelligence, Inc. 2002-2013
var ci_vid= 347527903;
var ci_cookieDomain=".americanapparel.com";
var ci_refDomain=".americanapparel.com";
var ci_imgs=[];

function ci_FP(ci_pix_url,protocol){var ci_pic=new Image(1,1);ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}

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
function CI_GetValue(ci_vName,ci_dValue) {
	if (typeof(window[ci_vName])!=="undefined"){return window[ci_vName];}else{return ci_dValue===undefined?null:ci_dValue;}
}
function ci_UID(value){
	var today=new Date();
	var UID=ci_vid+"-"+value+"-"+Math.floor(Math.random()*9999999999)+today.getFullYear().toString()+today.getMonth().toString()+ today.getDay().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString();
	return UID;
}
function ci_PIX(loc,eid,tid,src,sku,tag,avurl){
	var url='';
	if (loc===2){url=window.location.protocol.toLowerCase()=='http:'?'cts-log.channelintelligence.com?':'ttwbs.channelintelligence.com?';}
	if (loc===3){url='rdr.tag.channelintelligence.com/log.aspx?';}
	url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
	if(src!==null){url+='&src='+src;}
	if(sku!==null){url+='&sku='+sku;}
	if(avurl!==null){url+=avurl;}
	if(tag!==null){url+='&tag='+tag;}
	url += "&ref="+escape(document.referrer);
	return ci_FP(url);
}
try {
	var ci_cpncode=ci_RQV('cpncode');
	var ci_srccode=ci_RQV('srccode');
	var ci_src=ci_RQV('ci_src');
	var ci_sku=ci_RQV('ci_sku');
	var ci_tag=ci_RQV('ci_tag');
	var ci_tid=ci_UID(ci_sku);
	var ci_itemid=CI_GetValue('CI_ItemID',null);
	var ci_aIDs=CI_GetValue('CI_ItemIDs',null);
	var ci_aPrices=CI_GetValue('CI_ItemPrices',null);
	var ci_aItemAvailability=CI_GetValue('CI_ItemAvailability',null);
	var av_url='';
	
	if(ci_aIDs!==null){
		for(ci_skuIndex = 0;ci_skuIndex<ci_aIDs.length;ci_skuIndex++) {
			av_url += "&sku=" + ci_aIDs[ci_skuIndex] + "&ap=" + ci_aPrices[ci_skuIndex] + "&a=" + ci_aItemAvailability[ci_skuIndex];
		}
	}

	if(ci_cpncode!==null){
		ci_CC('ci_cpncode',ci_cpncode,30);
		ci_CC('ci_src',ci_srccode,30);
		ci_CC('ci_tid',"",-1);
	} else if(ci_src!==null && ci_sku!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,30);
		ci_CC('ci_src',ci_src,30);
		ci_PIX(2,23,ci_tid,ci_src,ci_sku,null,null);
	} else if(ci_tag!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,30);
		ci_PIX(2,7,ci_tid,null,null,ci_tag,null);
	}
	if(av_url!==''){ci_PIX(2,49,null,null,ci_itemid,'landing',av_url);}
}    
catch(err){}