try{
	function CI_GetValue(ci_vName,ci_dValue) {
		if (typeof(window[ci_vName])!=="undefined"){return window[ci_vName];}else{return ci_dValue===undefined?null:ci_dValue;}
	}
	function ci_FP(ci_pix_url,protocol){var ci_pic=new Image(1,1);ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}
	var ci_vid=CI_GetValue('CI_VID',11111);
	var ci_orderid=CI_GetValue('CI_OrderID',null);
	var ci_associationtime=CI_GetValue('CI_AssociationTime',30);
	
	//CONFIRMATION
	if(ci_orderid!==null) {
		var ci_loggingurl="ttwbs.channelintelligence.com?eid=1&";
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
		try{
			if(ci_orderid!==null) {
				var ci_baseurl=ci_loggingurl;
				var ci_url="cts=ttjsv1&"+"v="+ci_vid+"&o="+ci_orderid;
				if (CI_ReadCookie('ci_cpncode')!==null){ci_url+="&cpncode="+CI_ReadCookie('ci_cpncode');}
				if (CI_ReadCookie('ci_tid')!==null){ci_url+="&tid="+CI_ReadCookie('ci_tid');}
				var ci_aIDs=CI_GetValue('CI_ItemIDs',null);
				var ci_aPrices=CI_GetValue('CI_ItemPrices',null);
				var ci_aQtys=CI_GetValue('CI_ItemQtys',null);
				var ci_aMfrNumbers=CI_GetValue('CI_ItemMfrNums',null);
				var ci_transactionValue=0;
				for (ci_skuIndex = 0;ci_skuIndex<ci_aIDs.length;ci_skuIndex++) {
					ci_url += "&s=" + ci_aIDs[ci_skuIndex] + "|" + ci_aQtys[ci_skuIndex] + "|" + ci_aPrices[ci_skuIndex] + "|";
					if (ci_aMfrNumbers != undefined) {ci_url += ci_aMfrNumbers[ci_skuIndex];}
					ci_transactionValue = ci_transactionValue + parseFloat(ci_aQtys[ci_skuIndex] * ci_aPrices[ci_skuIndex]);
				}
				ci_FP(ci_baseurl + ci_url);
			}  
		}catch(err){}
	}else{
	//LANDING
		function ci_parseURL(url) {
    		var ci_parser=document.createElement('a');
    		ci_parser.href=url;  
    		url=ci_parser.hostname; 
    		var ci_domainsplit=url.split(".");
    		if(url.indexOf("co.uk")>-1){
    			url=ci_domainsplit[1]+'.'+ci_domainsplit[2]+'.'+ci_domainsplit[3];
    		}else{
    			url=ci_domainsplit[1]+'.'+ci_domainsplit[2];
    		}
    		url=url.substr(0, url.lastIndexOf("."));
    		url=ci_parser.hostname.substr(url.lastIndexOf(".")+1); 
    		return url; 
		};
		var ci_domain=ci_parseURL(document.location);
		var ci_cookieDomain=ci_domain;
		var ci_refDomain=ci_domain;
		var ci_imgs=[];

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
			if (loc===2){url=window.location.protocol.toLowerCase()=='http:'?'cts-log.channelintelligence.com?':'ttwbs.channelintelligence.com?';}
			if (loc===3){url='rdr.tag.channelintelligence.com/log.aspx?';}
			url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
			if(src!==null){url+='&src='+src;}
			if(sku!==null){url+='&sku='+sku;}
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

			if(ci_cpncode!==null){
				ci_CC('ci_cpncode',ci_cpncode,ci_associationtime);
				ci_CC('ci_src',ci_srccode,ci_associationtime);
				ci_CC('ci_tid',"",-1);
			} else if(ci_src!==null && ci_sku!==null) {
				ci_CC('ci_cpncode',"",-1);
				ci_CC('ci_tid',ci_tid,ci_associationtime);
				ci_CC('ci_src',ci_src,ci_associationtime);
				ci_PIX(2,23,ci_tid,ci_src,ci_sku,null);
			} else if(ci_tag!==null) {
				ci_CC('ci_cpncode',"",-1);
				ci_CC('ci_tid',ci_tid,ci_associationtime);
				ci_PIX(2,7,ci_tid,null,null,ci_tag);
			}
		}catch(err){}
	}
}catch(err){}