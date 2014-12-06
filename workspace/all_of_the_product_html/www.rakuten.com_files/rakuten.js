//version 2014.11.03b

// loading the Tracking library with no collateral footprint
(function (d,s,l,t,p) {
    t = d.createElement(s);
    t.type = 'text/java'+s;
    t.async = true;
    t.src = l;
    p = d.getElementsByTagName(s)[0];
    p.parentNode.insertBefore(t,p);
})(document,'script','//t.sellpoints.com/spt/60/60_sptobject.js');

_spHashtable.prototype.hash = null;
function _spHashtable(){  this.hash = new Array();}
_spHashtable.prototype.get = function (key){  var imgSrc = this.hash[key ? key.toLowerCase() : ''];  return imgSrc == 1;}

var vsr_shopping_cart='';var vsr_button_url='';var vsr_button_text = ''; var vsr_launch_graphic ='';var vsr_price=''; //var vsr_button_link = '';
var vsr_show_srp='';var vsr_stock='';var vsr_call_back='';var ttpid = '';var vsr_sku=''; var vsr_html_id=''; var vsr_currency=''; 
var sp_date = new Date();sp_date = sp_date.getFullYear()+''+(sp_date.getMonth()+1)+''+sp_date.getDate();
document.write("<script type='text/javascript' src='http://sb.sellpoint.net/smart_button/lookup/60.js?dt="+sp_date+"'></script>");
document.write("<script type='text/javascript' src='http://sb.sellpoint.net/i2/lookup/60_i2.js?dt="+sp_date+"'></script>");


_spHashtable.prototype.getVal = function (key){  var imgSrc = this.hash[key ? key.toLowerCase() : ''];  return imgSrc;}
document.write("<script type='text/javascript' src='http://sb.sellpoint.net/smart_button/lookup/acp/60_acp.js?dt="+sp_date+"'></script>");
function _spIsNull(_spNo) { if(_spNo == undefined || !_spNo || _spNo == null || typeof(_spNo) == 'undefined' || typeof(_spNo) == 'unknown')return true; return false;}
function _spLoadJs(_spJs) {	var _spTh = document.getElementsByTagName('head')[0];	var _spScr = document.createElement('script');	if(_spIsNull(_spTh) || _spIsNull(_spScr)) { document.write("<script type='text/javascript' src='"+ _spJs +"'><\/script>");}	else{_spScr.setAttribute('type','text/javascript');_spScr.setAttribute('src',_spJs);_spTh.appendChild(_spScr);}}
function _spByClassName(classname){var re = new RegExp(classname, 'i');var els = document.getElementsByTagName('*');for(var i=0; i<els.length; i++){if(re.test(els[i].className)) return els[i];}  return null;}


function _atu(sName, sValue){return isNe(sValue) ? '' : ('&'+ sName +'=' + escape(sValue));}
function isNe(sValue){if(sValue == null || typeof(sValue) == 'undefined' || trimString(sValue).length == 0)return true;	return false;}
function trimString(sString) {return sString.replace(/^\s*|\s*$/g,'');}
var vsr_server = 'syndicate.sellpoint.net';
var ttpid = 'TTPID-D6-98';

_spLoadJs(document.location.protocol + "//t.sellpoints.com/spt/60/60_sptobject.js");

//document.write("<script type='text/javascript' src='http://assetsw.sellpoint.net/i2/lookup/5845_i2.js?dt="+sp_date+"'></script>");
//_spLoadJs('http://assetsw.sellpoint.net/i2/lookup/5845_i2.js?dt='+sp_date);  //for testing
function _spById(_spId){  if(document.getElementById != null){return document.getElementById(_spId);}  if(document.all != null){return document.all[_spId];}  if(document.layers != null){return document.layers[_spId];}  return null;  }

function _spTakeoverHeroImage(_spMech, _spHtmlId, sku, width, height)
{
  try
  {
	var _spPi;
	if(_spMech == 0){ _spPi = _spById(_spHtmlId);}
	else if(_spMech == 1){ var _spChild = _spById(_spHtmlId); if(_spChild != undefined && _spChild.parentNode != undefined){ var _spPi = _spChild.parentNode;}}
	else if(_spMech == 2){ var _spPi = _spByClassName(_spHtmlId);}
	else if(_spMech == 3){ var _spChild = _spById(_spHtmlId); if(_spChild != undefined && _spChild.parentNode != undefined && _spChild.parentNode.parentNode != undefined){ var _spPi = _spChild.parentNode.parentNode;}}

	if(_spPi != undefined){ 
		_spPi.innerHTML = "<div id='_spSup0_i2' style='position:relative; float:left;z-index:99;'><div id='_spSup1_i2' style='position:absolute; top:0px; left:0px; width:"
		+ width +"px; height:"+ height +"px; z-index:1000'><div id='spProductHighlighter' data-sku='"+ sku +"'></div></div></div>" + _spPi.innerHTML;
	}	  

				 
	return;
  }catch(errtk){
	//console.log(errtk);
    return;
  }	
}

function spHideZoom(){
	try{
		$('#ImageVideo_ImageRepeater_ctl00_imgContainer').unbind('mouseover');
		$('#ImageVideo_ImageRepeater_ctl00_imgContainer').unbind('click');
		$('#ImageVideo_ImageRepeater_ctl00_Image').parent().unbind('click'); //stop clicking on first image to launch modal
		$('#ImageVideo_ImageRepeater_ctl00_Image').parent().attr('href', 'javascript:;'); //remove hash from href on the image - when clicked it causes the page to jump up

		$('#ImageVideo_ImageRepeater_ctl00_Image style').remove();
		$('#ImageVideo_ImageRepeater_ctl00_Image').css('cursor', 'pointer !important');

	}catch(eee){}
}



function clearIframe (){
    $sp("#i2-frame").attr("src", "");
    $sp("#i2-iframe-block").html("");
}


function showi2Image(){
	try{
		$("#_spSup0_i2").show();
        $(".MagicZoomPlusHint").first().remove();
	}catch(eee){}
}


var idxI2 = 0;
var spFirstImageUrl = "";
function setTumbnailImageEvents(){
	//hide zoomer on first image on init
	spHideZoom();

	$('#ImageVideo_ThumnailImageRepeater_ctl00_ThumnailImage').parent().click(function(){
		spHideZoom();
		showi2Image();
	});
}

function adjustRetailerSettings() {
	$('#main-nav').css('zIndex', '1000');

	// apply the following for ie8, ie9
	$('#_spSup0_i2').css('zIndex', '5001');
	$('.sp-i2-content').css('zIndex', '5002');

	// FIXME: i2-iframe-block zIndex still appears above the sub navigation
	//$('#i2-iframe-block').css('zIndex', '5002');
}


var spRetailerGAId = 'UA-41861406-7';
var spRetailerGAName = 'Rakuten';


function show_vsr_button()
{
	if(! isNaN(vsr_sku))
		  vsr_sku = '' + vsr_sku;
	

	var _vsrParams =       _spGetParams(vsr_sku, vsr_button_url, vsr_shopping_cart, vsr_price, vsr_stock, vsr_show_srp, vsr_call_back, vsr_launch_graphic, vsr_html_id, vsr_currency);
	

	var i2 = skusI2.getVal(vsr_sku);
	if(i2 != undefined && i2 != null){
		var i2Sku = vsr_sku;
		//_spTakeoverHeroImage(0, 'ImageVideo_ImageRepeater_ctl00_imgContainer', i2Sku, 345, 235);
		_spTakeoverHeroImage(0, 'ImageVideo_ImageRepeater_imgContainer_0', i2Sku, 345, 235);
		_spLoadJs("http://assetsw.sellpoint.net/i2/engine/v6/sellpointsi2.js");
		
		for(var i=1; i < 16; i++){
			window.setTimeout("setTumbnailImageEvents()", i*500);
		}
		
		$(document).ready(function() {
			setTumbnailImageEvents();
			//setTimeout("spTryRemove()", 1000);
			adjustRetailerSettings();
			spHideZoom();
		});
		
		spHideZoom();
	}else if(skus.get(vsr_sku)){
		document.write("<script type='text/javascript' src='http://"+ vsr_server +"/Syndicate/AptSmartSync?"+ _vsrParams +"&dt="+sp_date+"'></script>");
	}



	var spLookup = skusAcp.getVal(vsr_sku);
	if(spLookup != undefined && spLookup != null){
		sAcpDir =  (vsr_server.indexOf('qasync') != -1 ? "qa/" : "" ) +"_acp_";
		var aSpLookupVals = spLookup.split("_");
		var spSupp = aSpLookupVals.length > 0 ? aSpLookupVals[0] : '';
		var spAcpId = aSpLookupVals.length > 1 ? aSpLookupVals[1] : '';
		var spAcpSynId = aSpLookupVals.length > 2 ? aSpLookupVals[2] : '';
		var spAcpUrl = getAcpSmartSyncJsUrl(sAcpDir, spSupp, spAcpId, spAcpSynId);
		
		window.setTimeout("_spWriteAcpMain('"+ spAcpUrl +"')", 1500);
	}
}

//show_vsr_button();

function getAcpSmartSyncJsUrl(sAcpDir, sSupplierId, sAcpId, sSyndicateLinkId)
{
  return "http://assetsw.sellpoint.net/" + sAcpDir + "/" + sSupplierId + "/" + sAcpId + "/js/acp_" + sSyndicateLinkId + ".js";
}


function _spWriteAcpMain(acpUrl)
{
	try{
	
		var cobj = document.getElementById('SellPointInlineContent');
		if(cobj != undefined && cobj != null){
			cobj.innerHTML = cobj.innerHTML + "<table cellspacing=0 cellpadding=0 border=0><tr><td><div id='_spSellPointAcp'></div></td></tr><table>";
		}
			
		_spLoadJs(acpUrl);
	}catch(waee){}
}


//To show mulitple APTs on one page use this javascript file ..
function show_vsr_button_multi(_spApt_sku, _spApt_button_and_lg, _spApt_shopping_cart, _spApt_price, _spApt_stock, _spApt_show_srp, _spApt_call_back, _spApt_html_id, _spApt_currency)
{
  if(! isNaN(vsr_sku))
 	vsr_sku = '' + vsr_sku;
  if(! skus.get(vsr_sku))
    return; // Sku Not Found ..

  var _vsrParams = 	_spGetParams(_spApt_sku, _spApt_button_and_lg, _spApt_shopping_cart, _spApt_price, _spApt_stock, _spApt_show_srp, _spApt_call_back, _spApt_button_and_lg, _spApt_html_id, _spApt_currency);
  document.write("<script type='text/javascript' src='http://"+ vsr_server +"/Syndicate/AptSmartSync?"+ _vsrParams +"&dt="+sp_date+"'></script>");  
}

function _spGetParams(_sp_sku, _sp_button_and_lg, _sp_shopping_cart, _sp_price, _sp_stock, _sp_show_srp, _sp_call_back, _sp_launch_graphic, _sp_html_id, _sp_currency)
{
  var _sp_Params  = 'ttpid='+ ttpid + _atu('vsr_sku', _sp_sku) + _atu('vsr_button_url', _sp_button_and_lg) + _atu('vsr_shopping_cart', _sp_shopping_cart)
		+ _atu('vsr_price', _sp_price) + _atu('vsr_stock', _sp_stock) + _atu('vsr_call_back', _sp_call_back) + _atu('vsr_show_srp', _sp_show_srp) 
		+ _atu('vsr_launch_graphic', _sp_launch_graphic) + _atu('vsr_currency', _sp_currency)
		+ _atu('vsr_html_id', _sp_html_id) ;
  return _sp_Params;
}

function callTentoe()
{
    if(! isNaN(vsr_sku))
 	  vsr_sku = '' + vsr_sku;
	  
    var _vsrParams = 	_spGetParams(_spApt_sku, _spApt_button_and_lg, _spApt_shopping_cart, _spApt_price, _spApt_stock, _spApt_show_srp, _spApt_call_back, _spApt_button_and_lg, _spApt_button_text);
	var sOpenCmd = "onclick=\"return openVsrWin("+ escpae(_vsrParams) +");\"";
	var sSrc = "http://"+ vsr_server +"/Syndicate/SynImage?r="+ sp_date + "&" + _vsrParams;
	document.writeln('<a href="javascript:;" '+ sOpenCmd +'><img src="'+ sSrc +'" border=0></a>');
}

function openVsrWin(_spMyParams)	
{
  var sLink = 'http://'+ vsr_server +'/Syndicate/SynMaster?'+ _spMyParams +'&ParentUrl=' + escape(window.location.href);			
  window.open(sLink,'_blank', 'width=536,height=525,scrollbars=no,toolbar=no,personalbar=no,statusbar=no,directories=no,location=no,resizable=no,menubar=no,locationbar=no');
}

function _spCallMetrix(_spAptId)
{
  try
  {
    //if(ttpid != undefined && ttpid=='-999999')
    if(ttpid != undefined && ttpid=='TTPID-D2-96')
    {
	  var sProdName = null;
	  try
	  {
	    sProdName = window.document.title;
		var aName = sProdName.split("|");
	    sProdName = aName[0];
	  }catch(etmp){}
	  
	  window.cmSetProduction ? cmSetProduction() : '';
      window.cmCreatePageviewTag ? cmCreatePageviewTag(vsr_sku, null, "SELLPOINT") : '';
	}
  }catch(err){}  
}