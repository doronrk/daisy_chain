var dtm_cid    = "1001";
var dtm_cmagic = "abcdef";
var dtm_afid   = "101";
var dtm_cfid   = "102";
var dtm_prod   = 0;
var dtm_conv   = 0;
var dtm_items  = "";
var dtm_pg_count = 0;
var dtm_max_pg = 2;

function dtm_TimeOut(div) { document.getElementById(div).innerHTML = "";}

function dtm_Tag(dtmTag,pTag,pTO,div) {
	dtm_pg_count++;
	var dtmSrc = window.location.protocol + "//login.dotomi.com/ucm/UCMController?dtm_format=5";
	dtmTag.dtm_cid = dtm_cid;
	dtmTag.dtm_cmagic = dtm_cmagic;
	dtmTag.dtmc_loc = location.href;
	dtmTag.dtmc_ref = document.referrer;
	dtmTag.dtmc_pg_count = dtm_pg_count;
	
	for (var item in dtmTag){
		if(typeof dtmTag[item] != "function" && typeof dtmTag[item] != "object")
			dtmSrc += "&" + item + "=" + escape(dtmTag[item]);
	}   

	for (var item in pTag){
		if(typeof pTag[item] != "function" && typeof pTag[item] != "object" && pTag[item] != "" && pTag[item] != undefined && item != 'ul' && item != 'rf')
			dtmSrc += "&dtmc_cm_" + item + "=" + escape(pTag[item]).replace(/%28/g,'~').replace(/%29/g,'~').replace(/%22/g,'').replace(/%27/g,'').replace(/%23C/g,'').replace(/%3E/g,'');
	}   

	var dtjs=document.getElementsByTagName("body")[0].firstChild;

	if(!document.getElementById(div))
	{
		var dv = document.createElement("div");
		dv.id = div;
		dv.style.cssText = "display:none";
		if(dtjs) dtjs.parentNode.insertBefore(dv,dtjs);
	}
	setTimeout('dtm_TimeOut("'+div+'")',pTO);
	document.getElementById(div).innerHTML = '<iframe name="response_frame" src="' + dtmSrc + '"></iframe>';
}

function dtm_Abandon(pTag) {
	if (dtm_pg_count < dtm_max_pg) {
		var dtmTag = new Array();
		dtmTag.dtm_com = "28";
		dtmTag.dtm_fid = dtm_afid;
		dtmTag.cli_promo_id = "1";
		dtm_Tag(dtmTag,pTag,2000,"dtm_div");
	}
}

function dtm_Conversion(pTag) {
	dtm_max_pg=0;
	var dtmTag = new Array();
	dtmTag.dtm_com = "29";
	dtmTag.cli_promo_id = "100";
	dtmTag.dtm_conv_val = pTag['ov'];
	dtmTag.dtmc_transaction_id = pTag['on'];
	dtmTag.dtmc_items = dtm_items;
	dtmTag.dtm_fid = dtm_cfid;
	dtm_Tag(dtmTag,pTag,5000,"dtm_divx");
}

function dtm_ProductPurch(pTag) {
	dtm_items += pTag.pr+';'+pTag.bp+'|';
}

_cm_registerCallback(1101, function (pTag) {
	var tid = pTag.tid;
	try {
		var ck = pTag.ckey;
		ck = ck.replace(/\\/g,"");
		eval(ck);
    }catch(e){}
	switch(tid){
		case "2":
			if (!dtm_prod) break;
		case "1":
		case "3":
		case "6":
		case "99":
			dtm_Abandon(pTag);
			break;
		case "4":
			dtm_ProductPurch(pTag);
			break;
		case "7":
			if (!dtm_conv) break;
		case "5":
			dtm_Conversion(pTag);
			break;
	}
});
