var AutoShip={callbackFunName:"",init:function(d,c){AutoShip.resource=d;if(c!=undefined){AutoShip.callbackFunName=c}AutoShip.load()},lazyLoad:{loadScript:function(j,h){var g=document.getElementsByTagName("script");for(var i=0;i<g.length;i++){if(g[i].src==j){g[i].parentNode.removeChild(g[i]);break}}var f=document.createElement("script");f.type="text/javascript";if(f.readyState){f.onreadystatechange=function(){if(f.readyState=="loaded"||f.readyState=="complete"){f.onreadystatechange=null;h()}}}else{f.onload=function(){h()}}f.src=j;document.body.appendChild(f)},loadCSS:function(f){var g=document.getElementsByTagName("link");for(var h=0;h<g.length;h++){if(g[h].href==f){g[h].parentNode.removeChild(g[h]);break}}var e=document.createElement("link");e.type="text/css";e.rel="stylesheet";e.href=f;document.body.appendChild(e)}},load:function(){if(AutoShip.resource){AutoShip.state=0;for(var b=0;b<AutoShip.resource.script.length;b++){AutoShip.lazyLoad.loadScript(AutoShip.resource.script[b].src,function(){AutoShip.state++})}AutoShip.timer=setInterval(AutoShip.doScriptCallback,50);for(var b=0;b<AutoShip.resource.css.length;b++){AutoShip.lazyLoad.loadCSS(AutoShip.resource.css[b])}}},doScriptCallback:function(){var script=AutoShip.resource.script;if(AutoShip.state==script.length){clearInterval(AutoShip.timer);for(var i=0;i<script.length;i++){if(typeof script[i]["callback"]=="function"){script[i]["callback"]()}}if(AutoShip.callbackFunName!=""){eval(AutoShip.callbackFunName+"()")}}}};var autoshipCallback=function(){};var autoshipHopupWindow=function(p,j,l,o,k,m,n,i){autoshipCallback=function(){autoshipHopupWindow(p,j,l,o,k,m,n,i);addGAAfterHopup();addGAAfterHopupML()};AutoShip.init(_autoShipResourse,"autoshipCallback")};function addGAAfterHopup(){if($("#autoshipBtn").data("AutoShipTab")=="true"){autoShipHopupLoad("addItmfromPDP");$("#autoshipBtn").removeData("AutoShipTab")}}function addGAAfterHopupML(){if($("#easyReorder").data("AutoShipFromML")=="true"){autoShipHopupLoad("addItmfromMyLists");$("#easyReorder").removeData("AutoShipFromML")}}function autoShipHopupLoad(b){$(".autoshipIframeContent iframe").load(function(){if(b=="addItmfromMyLists"){showEasyReorderMsg()}var a="";if($(".selectAutoshipOrder .mlDropDownContent",$(this).contents()).length>0){a="add"}else{a="create_and_add"}if(_gaq){_gaq.push(["_trackEvent","UXAutoship",b,a])}})}function AddItemToAutoShip(d,c){this.skuAndQty=d;this.obj=this;this.openAddItemFromPDPHopup=function(){var a=clickStream.appendRef("/AutoShip/AddItems!AddItemFromPdp.qs?inputSkuAndQty="+this.skuAndQty);if(c){autoshipHopupWindow(620,a,"",true,function(){getAutoShipInfoInMyList(c)})}else{autoshipHopupWindow(620,a,"",true,null)}}}function showEasyReorderMsg(){$(".addFromEasyreorderMsg",$(".autoshipIframeContent iframe").contents()).show()}function getAutoShipInfoInMyList(b){$.ajaxAction("/EasyReorder/EasyReorder!GetAutoShipInfoInMyList.qs?sku="+b+"&random="+Math.random(),{success:function(i){if(i&&i.indexOf("countInAutoship")>-1){var j=$("#easyReorderRightPanel ul[sku='"+b+"'] li.item-pricing");var a=$(".countInAutoship",j);if(a.length>0){a.replaceWith(i)}else{j.find(".countInCart").after(i)}if(!$(".countInCart",j).is(":visible")){$(".countInCart",j).parent().addClass("only-countInAutoship")}else{$(".countInCart",j).parent().removeClass("only-countInCart");$(".countInCart",j).parent().removeClass("only-countInAutoship")}var g=$("#easyReorderRightPanel div[sku='"+b+"'] ul.replacementItem li.item-pricing");var h=$(".countInAutoship",g);if(h.length>0&&i&&i.indexOf("countInAutoship")>-1){h.replaceWith(i)}else{g.append(i)}if(!$(".countInCart",g).is(":visible")){$(".countInCart",g).parent().addClass("only-countInAutoship")}else{$(".countInCart",g).parent().removeClass("only-countInCart");$(".countInCart",g).parent().removeClass("only-countInAutoship")}}}})}var isAddOneTimeItemProcessing=false;var addOneTimeCallBack=function(){};function addOneTimeItemFromPDP(g,e){var h=false;var f=clickStream.getRefByHtmlAttribute();if(!isAddOneTimeItemProcessing){$.ajaxAction("/AutoShip/AddItems!GetOneTimeItemBoxId.qs?random="+Math.random(),{success:function(a){if(!a||!a.boxId){return}h=true;var b=clickStream.appendRef("/AutoShip/AddItems!AddAutoShipItemToExistBox.qs?boxId="+a.boxId,f)+"&isOneTimeItem=Y&skuAndQtys="+g+"&targetWareHouse="+e+"&random="+Math.random();$.ajaxAction(b,{notActiveTime:function(){$(".addToNextAutoshipBtn").remove()},success:function(c){if(!c.success){if(typeof(c)!="undefined"&&typeof(c.errMsg)!="undefined"){addOneTimeCallBack=function(){autoshipHtmlHopupWindow(400,"<p>"+c.errMsg+"</p><div><button class='manageAutoship' type='button' id='manageAutoShipBtn'></button></div>","",true,null,null,null,null),$(".manageAutoship").on("click",function(){addOneTimeItem(c.boxId);return false})};if(typeof(autoshipHtmlHopupWindow)=="function"){addOneTimeCallBack()}else{AutoShip.init(_autoShipResourse,"addOneTimeCallBack")}}}},always:function(){$("#addToNextAutoshipBtn").removeAttr("disabled")},beforeSend:function(){}})},always:function(){isAddOneTimeItemProcessing=false;if(!h){$("#addToNextAutoshipBtn").removeAttr("disabled")}},beforeSend:function(){isAddOneTimeItemProcessing=true;$("#addToNextAutoshipBtn").prop("disabled",true)}})}return}function addOneTimeItem(b){window.location.href="/autoship#management="+b};