_spHashtable.prototype.hash = null;
function _spHashtable(){  this.hash = new Array();}
_spHashtable.prototype.get = function (key){  var imgSrc = this.hash[key ? key.toLowerCase() : ''];  return imgSrc == 1;}
_spHashtable.prototype.getVal = function (key){  var imgSrc = this.hash[key ? key.toLowerCase() : ''];  return imgSrc;}

var vsr_shopping_cart='';var vsr_button_url='';var vsr_button_text = ''; var vsr_launch_graphic ='';var vsr_price=''; //var vsr_button_link = '';
var vsr_show_srp='';var vsr_stock='';var vsr_call_back='';var ttpid = '';var vsr_sku=''; var vsr_html_id=''; var vsr_currency=''; 
var sp_date = new Date();sp_date = sp_date.getFullYear()+''+(sp_date.getMonth()+1)+''+sp_date.getDate();
document.write("<script type='text/javascript' src='http://sb.sellpoint.net/smart_button/lookup/6454.js?dt="+sp_date+"'></script>");
document.write("<script type='text/javascript' src='http://sb.sellpoint.net/smart_button/lookup/acp/6454_acp.js?dt="+sp_date+"'></script>");
document.write("<script type='text/javascript' src='http://assetsw.sellpoint.net/i2/lookup/6454_i2.js?dt="+sp_date+"'></script>");

function _spIsNull(_spNo) { if(_spNo == undefined || !_spNo || _spNo == null || typeof(_spNo) == 'undefined' || typeof(_spNo) == 'unknown')return true; return false;}
function _spLoadJs(_spJs) {	var _spTh = document.getElementsByTagName('head')[0];	var _spScr = document.createElement('script');	if(_spIsNull(_spTh) || _spIsNull(_spScr)) { document.write("<script type='text/javascript' src='"+ _spJs +"'><\/script>");}	else{_spScr.setAttribute('type','text/javascript');_spScr.setAttribute('src',_spJs);_spTh.appendChild(_spScr);}}
function _spByClassName(classname){var re = new RegExp(classname, 'i');var els = document.getElementsByTagName('*');for(var i=0; i<els.length; i++){if(re.test(els[i].className)) return els[i];}  return null;}


function _atu(sName, sValue){return isNe(sValue) ? '' : ('&'+ sName +'=' + escape(sValue));}
function isNe(sValue){if(sValue == null || typeof(sValue) == 'undefined' || trimString(sValue).length == 0)return true;	return false;}
function trimString(sString) {return sString.replace(/^\s*|\s*$/g,'');}
var vsr_server = 'syndicate.sellpoint.net';
var ttpid = 'TTPID-32CA-6492';

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
		// check if _spSup0_i2 already exists
		if(jQuery('#_spSup0_i2').length != 0) {return;}

		_spPi.innerHTML = "<div id='_spSup0_i2' style='position:relative; float:left;z-index:3099;'><div id='_spSup1_i2' style='position:absolute; top:0px; left:0px; width:"
		+ width +"px; height:"+ height +"px; z-index:1000'><div id='spProductHighlighter' data-sku='"+ sku +"'></div></div></div>" + _spPi.innerHTML;
	}	  
				 
	return;
  }catch(errtk){
	//console.log(errtk);
    return;
  }	
}



function clearIframe (){
    jQuery("#i2-frame").attr("src", "");
    jQuery("#i2-iframe-block").html("");
}

function showi2Image(){
	try{
		jQuery("#_spSup0_i2").show();
	}catch(eee){}
}

function hidei2Image(){
	try{
        jQuery("#_spSup0_i2").hide(); // hide callouts
        jQuery(".sp-i2-content").hide(); // hide content
        clearIframe();
	}catch(eee){}
}

var spFirstImageUrl = "";
var spFirstThumbnailImageUrl = "";

function setTumbnailImageEvents(){
 //console.log("xxxx");
    jQuery("#image").load(function() {
 //console.log("uuuuuuuuuuu");
        var src = jQuery(this).attr("src");
        
    //console.log(spFirstImageUrl +" dddddd "+ src);  
    //console.log(spFirstThumbnailImageUrl +" eee "+ src);  
		
        if(spFirstImageUrl == ""){
            spFirstImageUrl = src;
        }
		
		//had to do this hack because the first thumbnail image is not always the same as the image is first loaded
		if(spFirstThumbnailImageUrl == "" || spFirstThumbnailImageUrl == spFirstImageUrl){
			var fileName = src.substr(src.lastIndexOf('\\') + 1);
			if(fileName.indexOf("_0") != -1)
				spFirstThumbnailImageUrl = src;
		} 
		
		if(spFirstImageUrl == src || spFirstThumbnailImageUrl == src){
			showi2Image();
		}else{
			hidei2Image();		
		}	

    });
}

var spRetailerGAId = 'UA-41861406-3';
var spRetailerGAName = 'Mac Mall';
var _isSPloaded = (typeof _isSPloaded == 'boolean' && _isSPloaded);

function show_vsr_button()
{
	if (_isSPloaded) return;
	_isSPloaded = true;
  if(! isNaN(vsr_sku))
 	vsr_sku = '' + vsr_sku;

	_spLoadJs(document.location.protocol + "//t.sellpoints.com/spt/6454/6454_sptobject.js");

	var _vsrParams = 	_spGetParams(vsr_sku, vsr_button_url, vsr_shopping_cart, vsr_price, vsr_stock, vsr_show_srp, vsr_call_back, vsr_launch_graphic, vsr_html_id, vsr_currency);

	//show i2
	var i2 = skusI2.getVal(vsr_sku);
	if(i2 != undefined && i2 != null){
		var i2Sku = vsr_sku;
		if(i2Sku == '9224249' ||
			i2Sku == '810461' ||
			i2Sku == '9108432' ||
			i2Sku == '9285330' ||
			i2Sku == '7432841' ||
			i2Sku == '651580' ||
			i2Sku == '9389832' ||
			i2Sku == '9285331' ||
			i2Sku == '7431006' ||
			i2Sku == '8118895' ||
			i2Sku == '9085955' ||
			i2Sku == '9416945' ||
			i2Sku == '9434122' ||
			i2Sku == '9470021')

		i2Sku = i2Sku + "-mm";
			
		_spTakeoverHeroImage(1, 'image', i2Sku, 345, 235);
		_spLoadJs("http://assetsw.sellpoint.net/i2/engine/v5/sellpointsi2.js");
		
		setTumbnailImageEvents();
		for(var i=1; i < 16; i++){
			window.setTimeout("setTumbnailImageEvents()", i*500);
		}

		jQuery(document).ready(function() {
			adjustRetailerSettings();
		});
	}
				
	if(skus.get(vsr_sku)){
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
		
		//document.write("<script type='text/javascript' src='"+ spAcpUrl +"?dt="+sp_date+"'></script>");
		//_spWriteAcpMain(spAcpUrl);
		window.setTimeout("_spWriteAcpMain('"+ spAcpUrl +"')", 1500);
	}
}

function adjustRetailerSettings() {
	jQuery('.servicePlanCon').css('zIndex', '100');
}

function getAcpSmartSyncJsUrl(sAcpDir, sSupplierId, sAcpId, sSyndicateLinkId)
{
  return "http://assetsw.sellpoint.net/" + sAcpDir + "/" + sSupplierId + "/" + sAcpId + "/js/acp_" + sSyndicateLinkId + ".js";
}

function _spWriteAcpMain(acpUrl)
{
	try{
		var oOverview = _spByClassName("overview");
		if(oOverview === undefined || oOverview.parentNode === undefined)
			return;
			
		var cobj = oOverview.parentNode;
		if(cobj != undefined && cobj != null){
			cobj.innerHTML = cobj.innerHTML +"<div id='_spSellPointAcp'></div>";
		}
			
		_spLoadJs(acpUrl);
	}catch(waee){}
}


function _spGetParams(_sp_sku, _sp_button_and_lg, _sp_shopping_cart, _sp_price, _sp_stock, _sp_show_srp, _sp_call_back, _sp_launch_graphic, _sp_html_id, _sp_currency)
{
  var _sp_Params  = 'ttpid='+ ttpid + _atu('vsr_sku', _sp_sku) + _atu('vsr_button_url', _sp_button_and_lg) + _atu('vsr_shopping_cart', _sp_shopping_cart)
		+ _atu('vsr_price', _sp_price) + _atu('vsr_stock', _sp_stock) + _atu('vsr_call_back', _sp_call_back) + _atu('vsr_show_srp', _sp_show_srp) 
		+ _atu('vsr_launch_graphic', _sp_launch_graphic) + _atu('vsr_currency', _sp_currency)
		+ _atu('vsr_html_id', _sp_html_id) ;
  return _sp_Params;
}

function openVsrWin(_spMyParams)	
{
  var sLink = 'http://'+ vsr_server +'/Syndicate/SynMaster?'+ _spMyParams +'&ParentUrl=' + escape(window.location.href);			
  window.open(sLink,'_blank', 'width=536,height=525,scrollbars=no,toolbar=no,personalbar=no,statusbar=no,directories=no,location=no,resizable=no,menubar=no,locationbar=no');
}
