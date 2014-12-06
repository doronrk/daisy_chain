_spHashtable.prototype.hash = null;
function _spHashtable(){  this.hash = new Array();}
_spHashtable.prototype.get = function (key){  var imgSrc = this.hash[key ? key.toLowerCase() : ''];  return imgSrc == 1;}
_spHashtable.prototype.getVal = function (key){  var imgSrc = this.hash[key ? key.toLowerCase() : ''];  return imgSrc;}
function _spById(_spId){  if(document.getElementById != null){return document.getElementById(_spId);}  if(document.all != null){return document.all[_spId];}  if(document.layers != null){return document.layers[_spId];}  return null;  }
function _spIsNull(_spNo) { if(_spNo == undefined || !_spNo || _spNo == null || typeof(_spNo) == 'undefined' || typeof(_spNo) == 'unknown')return true; return false;}
function _spLoadJs(_spJs) {    var _spTh = document.getElementsByTagName('head')[0]; var _spScr = document.createElement('script');    if(_spIsNull(_spTh) || _spIsNull(_spScr)) { document.write("<script type='text/javascript' src='"+ _spJs +"'><\/script>");}        else{_spScr.setAttribute('type','text/javascript');_spScr.setAttribute('src',_spJs);_spTh.appendChild(_spScr);}}

var vsr_shopping_cart='';var vsr_button_url='';var vsr_button_text = ''; var vsr_launch_graphic ='';var vsr_price=''; //var vsr_button_link = '';
var vsr_show_srp='';var vsr_stock='';var vsr_call_back='';var ttpid = '';var vsr_sku=''; var vsr_html_id=''; var vsr_currency=''; 
var sp_date = new Date();sp_date = sp_date.getFullYear()+''+(sp_date.getMonth()+1)+''+sp_date.getDate();
document.write("<script type='text/javascript' src='http://sb.sellpoint.net/smart_button/lookup/5845.js?dt="+sp_date+"'></script>");
document.write("<script type='text/javascript' src='http://sb.sellpoint.net/smart_button/lookup/acp/5845_acp.js?dt="+sp_date+"'></script>");
document.write("<script type='text/javascript' src='http://assetsw.sellpoint.net/i2/lookup/5845_i2.js?dt="+sp_date+"'></script>");

function _atu(sName, sValue){return isNe(sValue) ? '' : ('&'+ sName +'=' + escape(sValue));}
function isNe(sValue){if(sValue == null || typeof(sValue) == 'undefined' || trimString(sValue).length == 0)return true;   return false;}
function trimString(sString) {return sString.replace(/^\s*|\s*$/g,'');}
var vsr_server = 'syndicate.sellpoint.net';
var ttpid = 'TTPID-2E08-5883';

var _spIsQa = /prod.brandsmartusa.com/.test(window.location.href); 

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
		$(".MagicZoomPlusHint").first().hide();
	}catch(eee){}
}

function spTryRemove(){
    tryRemove(".MagicZoomPlusHint", "remove");
}

function spAddZoom() {
    var $zoomer = $sp("#Zoomer.MagicZoomPlus");

    if($sp('.MagicZoomPlusHint').length){return;}
    var html = '<div class="MagicZoomPlusHint" style="display: block; overflow: hidden; position: absolute; visibility: visible; z-index: 1; left: 2px; right: auto; top: 2px; bottom: auto; opacity: 0.75; max-width: 376px;">Zoom</div>';

    $zoomer.append(html);
}

function clearIframe (){
    $sp("#i2-frame").attr("src", "");
    $sp("#i2-iframe-block").html("");
}

function tryRemove(elementName, action) {
    try {
        var $element = $sp(""+elementName+"");
        var action = action || "remove";
    } catch(eee){
        console.log("ERROR: " + eee.message);
    }

    // some elements are not immidiately avaliable
    // use a setTimeout in attempts to remove or hide an element
    var attempt = 0;
    var maxAttempts = 10;
    var attemptDelay = 1000;
    var removeElement = function(attempt) {
        attempt = attempt || 0;

        if(attempt == maxAttempts)
        {
            // could not find element
            return;
        }

        if($element.length > 0)
        {
            if(action == "remove")
            {
                $element.remove();
            }

            if(action == "hide")
            {
                $element.css("visibility", "hidden");
            }

            return;
        } else {
            attempt ++;
//            console.log("attempt: " + attempt);

            // try setting element again
            $element = $sp(""+elementName+"");

            setTimeout(function(){
                removeElement(attempt);
            }, attemptDelay)
        }
    }

    // remove element
    removeElement();
}

function showi2Image(){
	try{
		$("#_spSup0_i2").show();
        $(".MagicZoomPlusHint").first().remove();
	}catch(eee){}
}

function hidei2Image(){
	try{
        $("#_spSup0_i2").hide(); // hide callouts
        $(".sp-i2-content").hide(); // hide content
        clearIframe();
        spAddZoom();
	}catch(eee){}
}

var idxI2 = 0;
var spFirstImageUrl = "";
function setTumbnailImageEvents(){
    $(".MagicThumb-swap").each(function(){
        if(idxI2 == 0 || spFirstImageUrl == $(this).attr("href")){
            $(this).click(function(){showi2Image();});
            spFirstImageUrl = $(this).attr("href");

        }else{
            $(this).click(function(){hidei2Image();});
        }

        idxI2++;
    });
}

var spRetailerGAId = 'UA-41861406-2';
var spRetailerGAName = 'BrandsMart USA';

function show_vsr_button()
{
        if((vsr_sku === undefined || isNe(vsr_sku)) && window.g_modelId){
               vsr_sku = g_modelId;
        }

        if(! isNaN(vsr_sku))
              vsr_sku = '' + vsr_sku;

        //if(!_spIsQa){
            var _vsrParams =       _spGetParams(vsr_sku, vsr_button_url, vsr_shopping_cart, vsr_price, vsr_stock, vsr_show_srp, vsr_call_back, vsr_launch_graphic, vsr_html_id, vsr_currency);
            
			//show i2
			var i2 = skusI2.getVal(vsr_sku);
			if(i2 != undefined && i2 != null){
				var i2Sku = vsr_sku;
				_spTakeoverHeroImage(0, 'SP_ProductImage', i2Sku, 345, 235);
				_spLoadJs("http://assetsw.sellpoint.net/i2/engine/v4c/sellpointsi2.js");

				for(var i=1; i < 16; i++){
					window.setTimeout("setTumbnailImageEvents()", i*500);
				}
				
				$(document).ready(function() {
                    // version
//                    console.log("06242013_v028");
					setTumbnailImageEvents();
                    setTimeout("spTryRemove()", 1000);
				});
			}else if(skus.get(vsr_sku)){
                   //document.write("<script type='text/javascript' src='http://"+ vsr_server +"/Syndicate/AptSmartSync?"+ _vsrParams +"&dt="+sp_date+"'></script>");
            }
		//}
        
        var spLookup = skusAcp.getVal(vsr_sku);
        if(spLookup != undefined && spLookup != null){
               sAcpDir =  (vsr_server.indexOf('qasync') != -1 ? "qa/" : "" ) +"_acp_";
               var aSpLookupVals = spLookup.split("_");
               var spSupp = aSpLookupVals.length > 0 ? aSpLookupVals[0] : '';
               var spAcpId = aSpLookupVals.length > 1 ? aSpLookupVals[1] : '';
               var spAcpSynId = aSpLookupVals.length > 2 ? aSpLookupVals[2] : '';
               var spAcpUrl = getAcpSmartSyncJsUrl(sAcpDir, spSupp, spAcpId, spAcpSynId);
               window.setTimeout("_spWriteAcpMain('"+ spAcpUrl +"')", 1200);
        }
}

function getAcpSmartSyncJsUrl(sAcpDir, sSupplierId, sAcpId, sSyndicateLinkId)
{
  return "http://assetsw.sellpoint.net/" + sAcpDir + "/" + sSupplierId + "/" + sAcpId + "/js/acp_" + sSyndicateLinkId + ".js";
} 

function _spWriteAcpMain(acpUrl)
{
        try{
				//if(_spIsQa){
                    var cobj = document.getElementById("wc-power-page");
					if(cobj != undefined){
						cobj.innerHTML = "<div id='_spSellPointAcp'></div>";
					}
					
					
					var mObj = document.getElementById("manu");
					if(mObj != undefined){
						mObj.style.display = "block";
					}
					
					var mTab = document.getElementById("menu-manu");
					if(mTab != undefined){
						mTab.style.display = "inline";
					}
					
					_spLoadJs(acpUrl);
					return;
				//}
		
               var replaceType = 3;
               if(replaceType == 1){
                       var div = document.getElementById('ctl00_contentCell');
                       var aTables = div.getElementsByTagName("table");
                       var cobj = null;
                       
                       if(aTables != undefined && aTables.length > 4){
                               cobj = aTables[4];
                       }
                       
                       if(cobj != undefined && cobj != null){
                               var tr = document.createElement('tr'); 
                               tr.innerHTML = "<td><div id='_spSellPointAcp'></div>"+ "<div style='border-bottom:1px solid #B7B7B7;margin-bottom:5px;'></div></td>";
                               var aTbody = cobj.getElementsByTagName("tbody");
                               if(aTbody != undefined && aTbody.length > 0)
                                      cobj = aTbody[0];
                                      
                               cobj.appendChild(tr);
                       }
		       _spLoadJs(acpUrl);
               }else if (replaceType == 2){
                       var listItem = _spByClassName('listItem');
                       
                       if(listItem != undefined && listItem.parentNode != undefined){
                               try{
                                      //var cobj = listItem.parentNode.parentNode.parentNode;
                                      var cobj = listItem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                                      //var tr = document.createElement('tr'); 
                                      cobj.innerHTML = "<tr><td><div id='_spSellPointAcp'></div>"+ "<div style='border-bottom:1px solid #B7B7B7;margin-bottom:5px;'></div></td></tr>"+ cobj.innerHTML ;
                                      //cobj.appendChild(tr);
                               }catch(ee){}
                       }
		       _spLoadJs(acpUrl);
               }else if (replaceType == 3){
					setTimeout(function() {
						_spRenderAcp(acpUrl)
					}, 3000);
					
			   //setTimeout("_spRenderAcp(acpUrl)", 7000);
			   //setTimeout(_spRenderAcp(acpUrl), 7000);
			   /*
				setTimeout(_spRenderAcp(acpUrl), 7000);
					//_spRenderAcp(acpUrl);
					if(window.onload) {
						var _existing = window.onload;
						window.onload = function() {
							_existing();
							_spRenderAcp(acpUrl);
						};
					}
					else {
						window.onload = _spRenderAcp(acpUrl);
					}	
*/					
					//jQuery(window).load(_spRenderAcp(acpUrl));
					//jQuery(document).ready(_spRenderAcp(acpUrl))
               }                      
               
               
        }catch(waee){}
}  


function _spByClassName(classname){var re = new RegExp(classname, 'i');var els = document.getElementsByTagName('*');for(var i=0; i<els.length; i++){if(re.test(els[i].className)) return els[i];}  return null;}


function _spRenderAcp(acpUrl) {
	try{
		//if(vsr_sku != '128917')
			//return;
		//console.log("222222222");
		//var contentArea = _spByClassName('RoundedTitleBar');
		//using JQuery library defined by brandsmart
		var contentArea = jQuery(".RoundedTitleBar:first");
		//alert(contentArea);
		//console.log("333");
        if(contentArea != undefined && contentArea.parent() != undefined){
			//console.log("444");
				var tbody = contentArea.parent().parent();
				var spDiv = "<tr><td><div class='RoundedTitleBar Lg Bold' style='padding-top: 4px; margin-top: 0px;'>Product Highlights</div><div id='_spSellPointAcp' style='padding:2px;'></div></td></tr>";
				//tbody.parent().prepend(spDiv);
				jQuery(spDiv).prependTo(tbody.parent());
				//console.log(6666666);
        } 
	}catch(ee){}
	
	_spLoadJs(acpUrl);
}



//To show mulitple APTs on one page use this javascript file ..
function show_vsr_button_multi(_spApt_sku, _spApt_button_and_lg, _spApt_shopping_cart, _spApt_price, _spApt_stock, _spApt_show_srp, _spApt_call_back, _spApt_html_id, _spApt_currency)
{
  if(! isNaN(vsr_sku))
       vsr_sku = '' + vsr_sku;
  if(! skus.get(vsr_sku))
    return; // Sku Not Found ..

  var _vsrParams =     _spGetParams(_spApt_sku, _spApt_button_and_lg, _spApt_shopping_cart, _spApt_price, _spApt_stock, _spApt_show_srp, _spApt_call_back, _spApt_button_and_lg, _spApt_html_id, _spApt_currency);
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
          
    var _vsrParams =   _spGetParams(_spApt_sku, _spApt_button_and_lg, _spApt_shopping_cart, _spApt_price, _spApt_stock, _spApt_show_srp, _spApt_call_back, _spApt_button_and_lg, _spApt_button_text);
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


