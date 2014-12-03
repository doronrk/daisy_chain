MACYS.namespace("MACYS.addToRegistry");MACYS.addToRegistry.weddingAddToRegistryUrl="/registry/wedding/addtoregistry";MACYS.addToRegistry.viewRegistryUrl="/registry/wedding/registrant";MACYS.addToRegistry.registrySignIn="/registry/wedding/registrysignin";MACYS.addToRegistry.registryClaim="";MACYS.addToRegistry.atr_productId=null;MACYS.addToRegistry.isInCxtErrMsgPanelVisible=false;MACYS.addToRegistry.isMasterPanelVisible=false;MACYS.addToRegistry.limitExceeded=false;MACYS.addToRegistry.registrybuttonClick=function(a){MACYS.addToRegistry.registryClaim="";this.busy=true;MACYS.loading.show();MACYS.addToRegistry.validateMember(a)};MACYS.addToRegistry.validateMember=function(h){var e=YAHOO.util.Dom,b=YAHOO.util.Event,f={},d;d=h.id.replace("ADDTOREGISTRY_BUTTON","");MACYS.addToRegistry.atr_productId=d;try{var a;if(MACYS.pdp&&MACYS.pdp.pageType==="MASTER"){a=e.getAncestorByClassName(h,"memberProducts");f=this._getProduct(a);f.name=e.getElementBy(function(){return true},"h2",a);f.name=f.name?f.name.innerHTML:"";f.price=e.getElementsByClassName("productPrice","div",a)[0]}else{a=e.get("productBox");f=this._getProduct(a);f.name=e.get("productTitle").innerHTML;f.price=e.getElementsByClassName("standardProdPricingGroup","div","priceInfo")[0]}f.price=f.price?e.getLastChildBy(f.price,function(i){if(i.tagName==="SPAN"&&!e.hasClass(i,"pricingPolicy")&&!e.hasClass(i,"priceSaleEndText")){return true}return false}):null;f.price=f.price?f.price.innerHTML.match(/[\d.]+/):null;f.price=f.price?f.price[0]:null}catch(c){return}f.ID=d;var g=[f];if(f){MACYS.pdp.coremetricsController.startAddToRegistry(f);YAHOO.util.Connect.asyncRequest("POST",MACYS.addToRegistry.weddingAddToRegistryUrl+MACYS.addToRegistry.registryClaim,{success:function(i){this.handleJsonResponse(i,h)},failure:function(i){this.removeBusy();MACYS.addToRegistry.hideErrMsg();MACYS.addToRegistry.showErrMsg()},scope:this,argument:g},this.buildProductPost(g))}else{this.removeBusy();MACYS.addToRegistry.hideErrMsg();MACYS.addToRegistry.showErrMsg()}};MACYS.addToRegistry._getProduct=function(c){var h={},d={},a={},f={},b={},e=YAHOO.util.Dom,i=YAHOO.util.Event;try{h.type="NA";h.size="NA";h.color="NA";if(c){d=e.getElementsByClassName("productColor","span",c)[0];a=e.getElementsByClassName("productSize","span",c)[0];f=e.getElementsByClassName("productType","span",c)[0];if(f){h.type=f.innerHTML}b=e.getElementsByClassName("productQuantity","select",c)[0];if(d){h.color=d.innerHTML}h.quantity=b.value;if(a){h.size=a.innerHTML}}}catch(g){return}return h};MACYS.addToRegistry.buildProductPost=function(f){var b=[],j=[],d=[],h=[],a=[],c,e;for(c=0,e=f.length;c<e;c++){b.push(f[c].color);j.push(f[c].size);d.push(f[c].type);h.push(f[c].quantity);a.push(f[c].ID)}var g="productId="+a.join(",")+"&color="+b.join(",")+"&size="+j.join(",")+"&type="+d.join(",")+"&quantity="+h.join(",");return g};MACYS.addToRegistry.handleJsonResponse=function(a,s){var c=YAHOO.util.Dom,t=YAHOO.util.Event,b="You've reached the limit for this item. Please select another color/size/type.";MACYS.addToRegistry.removeBusy();MACYS.addToRegistry.hideErrMsg();try{var q=MACYS.addToRegistry.overlay;var l=0;var h={};h=YAHOO.lang.JSON.parse(a.responseText);if(h){if(h.HAS_REGISTRY){if(h.HAS_REGISTRY==="NO"){MACYS.addToRegistry.overlayClaim.show();return}}else{if(h.REDIRECT){window.location=h.REDIRECT;return}}if(MACYS.pdp&&MACYS.pdp.pageType==="MASTER"){if(h.BVR_MESSAGE&&h.nonRegistrableUPCs&&h.nonRegistrableCount>0){MACYS.addToRegistry.displayInContextErrPanel(h.BVR_MESSAGE,s,242,64)}if(h.ERROR_MSG){if(h.LIMIT_EXCEEDED){MACYS.addToRegistry.limitExceededErrorMsg(b,s)}else{MACYS.addToRegistry.displayInContextErrPanel(h.ERROR_MSG,s,512,64)}}if(!h.ERROR_MSG&&h.LIMIT_EXCEEDED){MACYS.addToRegistry.limitExceededErrorMsg(b,s)}if(h.BVR_MESSAGE&&!h.ERROR_MSG&&!h.LIMIT_EXCEEDED&&!h.nonRegistrableCount&&!h.nonRegistrableUPCs){MACYS.addToRegistry.renderMasterPanel(h,s)}if(!h.ERROR_MSG&&!(h.BVR_MESSAGE&&h.nonRegistrableUPCs&&h.nonRegistrableCount>0)){MACYS.pdp.coremetricsController.finishAddToRegistry(a.argument[0])}return}if(h.ERROR_MSG){if(h.LIMIT_EXCEEDED){MACYS.addToRegistry.limitExceededErrorMsg(b,s)}else{MACYS.addToRegistry.displayInContextErrPanel(h.ERROR_MSG,s,512,64)}return}if(h.LIMIT_EXCEEDED){l=parseInt(h.LIMIT_EXCEEDED_SIZE,10)||"";MACYS.addToRegistry.limitExceededErrorMsg(b,s);return}if(!h.nonRegistrableUPCs&&(!h.registrantInfo||!h.imgMap)){if(!MACYS.addToRegistry.limitExceeded){MACYS.addToRegistry.showErrMsg()}return}else{if(h.nonRegistrableUPCs&&(!h.registrantInfo||!h.imgMap)){this.handleNonRegUPCResponse(h,s);return}}q.clearProducts();q.setRegistryId(h.registrantInfo.registryId);var g=0,r,n,o,m,e;if(h.LIMIT_EXCEEDED){if(a.argument.length){r=a.argument.length}r=r-h.LIMIT_EXCEEDED.length}for(n=0,o=a.argument.length;n<o;n++){if(h.imgMap[a.argument[n].ID]){if(h.LIMIT_EXCEEDED){var f=false;var k=h.LIMIT_EXCEEDED;for(m=0,e=k.length;m<e;m++){if(k[m]==a.argument[n].ID){f=true;break}}if(f){continue}}MACYS.pdp.coremetricsController.finishAddToRegistry(a.argument[n]);g+=parseInt(a.argument[n].quantity,10);var d=q.addProduct(h.imgMap[a.argument[n].ID],a.argument[n])}}if(h.nonRegistrableUPCs&&h.nonRegistrableCount>0){if(l!==""){q.setAddedCount(g,h.nonRegistrableCount+l)}else{q.setAddedCount(g,h.nonRegistrableCount)}this.handleNonRegUPCResponse(h,s)}else{if(l!==""){q.setAddedCount(g,l)}else{q.setAddedCount(g,0)}}if(g){q.setRegistryLink(h);q.show()}else{MACYS.addToRegistry.showErrMsg()}}}catch(p){MACYS.addToRegistry.showErrMsg();return}};MACYS.addToRegistry.handleNonRegUPCResponse=function(a,c){var b=null;if(a&&a.nonRegistrableCount==1){b="We're sorry. 1 item has not been added to your registry because it's unavailable for purchase on Macy's Wedding Registry."}else{if(a&&a.nonRegistrableCount>1){b="We're sorry. "+a.nonRegistrableCount+" items have not been added to your registry because these are unavailable for purchase on Macy's Wedding Registry."}}MACYS.addToRegistry.displayInContextErrPanel(b,c,382,64)};MACYS.addToRegistry.removeBusy=function(){this.busy=false;MACYS.loading.hide()};MACYS.addToRegistry.overlay=(function(){var b={},c=YAHOO.util.Dom,a=YAHOO.util.Event;b.init=function(){this.panel=new YAHOO.widget.Panel("addToRegistryModal",{modal:true,underlay:false,draggable:false,close:false,width:"454px",zIndex:10});this.panel.render(document.body);c.removeClass(YAHOO.util.Dom.get("addToRegistryModal"),"hidden");this.panel.hide();a.addListener("pdpatrDivClose","click",this.hide,this,true);a.addListener("continueShopping","click",this.hide,this,true);a.addListener("viewRegistry","click",this.goToRegistry,this,true)};b.show=function(){this.panel.show();this.panel.center()};b.hide=function(d){if(d){a.preventDefault(d)}this.panel.hide();c.removeClass(MACYS.loading.element.parentNode,"masked");MACYS.loading.mask.style.display="none";MACYS.addToRegistry.clearSelections();setTimeout(function(){YAHOO.util.Event.removeListener("loading_mask","click")},200)};b.goToRegistry=function(d){if(d){a.preventDefault(d)}if(this.registryId){window.location=MACYS.addToRegistry.viewRegistryUrl}this.hide();MACYS.loading.show()};b.setRegistryLink=function(e){var d=c.getElementsByClassName("registryLink","a",this.panel.element)[0];if(e.registrantInfo){d.innerHTML=e.registrantInfo.registrantName+" & "+e.registrantInfo.coRegistrantName+"'s registry"}};b.setAddedCount=function(e,f){var d=c.get("totalQtyInfo");if(d){d.innerHTML=(e==1?"1 item":e+" items")+" added to "}if(f>0){d=c.getElementsByClassName("nonRegQtyInfoDiv","div",this.panel.element)[0];if(d){c.removeClass(d,"hidden");d=c.getElementsByClassName("nonRegQtyInfoSpan","span",this.panel.element)[0];if(d){d.innerHTML=(f==1?"1 item has ":f+" items have ")+"not been added to your registry"}}}else{d=c.getElementsByClassName("nonRegQtyInfoDiv","div",this.panel.element)[0];if(d){c.addClass(d,"hidden")}}};b.setRegistryId=function(d){this.registryId=d};b.addProduct=function(h,g){var f=document.createElement("div");c.addClass(f,"divCart_item clearfix");if(c.getElementsByClassName("divCart_item","div",this.panel.element).length===0){c.addClass(f,"first")}if(h.search(/[?]/)===-1){h=h+"?"+MACYS.scene7.mediumFilter+"&wid=134"}else{if(h.search(/wid=/)===-1){h=h+"&"+MACYS.scene7.mediumFilter+"&wid=134"}else{h=h.replace(/([&|?]+)wid=([0-9]*)/,"$1wid=134")}}var e='<div class="atr_con_img_div"><img src="'+MACYS.config.Base.imageUrl+h+'"/></div><div class="divCart_itemInfo"><div class="wrap_dl clearfix"><p class="atb_item_text">'+g.name+"</p>"+((g.color&&g.color!="NA")?'<dl id="itemColor"><dt>Color:</dt><dd>'+g.color+"</dd></dl>":"")+((g.type&&g.type!="NA")?'<dl id="itemType"><dt>Type:</dt><dd>'+g.type+"</dd></dl>":"");e+='<div class="itemPrices">$'+g.price.replace(/\s/g,"");if(g.quantity>1){e+=" &times; Qty. "+g.quantity}e+="</div>";var d=c.getElementsByClassName("divCart_content","div",this.panel.element)[0];f.innerHTML=e;d.appendChild(f);return f};b.clearProducts=function(){var d=c.getElementsByClassName("divCart_item","div",this.panel.element);var e;for(e=d.length-1;e>=0;e--){d[e].parentNode.removeChild(d[e])}};return b}());MACYS.addToRegistry.overlayClaim=(function(){var b={},c=YAHOO.util.Dom,a=YAHOO.util.Event;b.response=null;b.init=function(){this.panel=new YAHOO.widget.Panel("registryClaim",{modal:true,underlay:false,draggable:false,close:false,zIndex:10});this.panel.render();c.removeClass(c.get("registryClaim"),"hidden");this.panel.hide();a.addListener(c.getElementsByClassName("registryClaimClose","a",this.panel.element),"click",this.hide,this,true);a.addListener("accessRegistryButton","click",this.goToClaim,this,true);a.addListener("createRegistryButton","click",this.goToCreate,this,true)};b.show=function(){this.panel.show();this.panel.center()};b.hide=function(f){try{if(f){a.preventDefault(f)}this.panel.hide();c.removeClass(MACYS.loading.element.parentNode,"masked");MACYS.loading.mask.style.display="none";MACYS.addToRegistry.clearSelections();setTimeout(function(){YAHOO.util.Event.removeListener("loading_mask","click")},200)}catch(d){return
}};b.goToClaim=function(f){if(f){a.preventDefault(f)}this.hide();var d=c.get("registryClaimForm");if(d){d.action=MACYS.addToRegistry.weddingAddToRegistryUrl+"?registryClaim=YES";d.submit()}return};b.goToCreate=function(f){if(f){a.preventDefault(f)}this.hide();var d=c.get("registryClaimForm");if(d){d.action=MACYS.addToRegistry.weddingAddToRegistryUrl+"?registryClaim=NO";d.submit()}return};return b}());YAHOO.util.Event.onDOMReady(function(){var e=YAHOO.util.Dom,b=YAHOO.util.Event;MACYS.addToRegistry.errorOverlay.init();MACYS.addToRegistry.overlay.init();MACYS.addToRegistry.overlayClaim.init();MACYS.addToRegistry.inContextErrorMsgPanel.init();var d=e.getElementsByClassName("addtoregistryClass");var c,a;for(c=0,a=d.length;c<a;c++){b.addListener(d[c],"click",MACYS.pdp.selector.click)}MACYS.addToRegistry.masterPanel=new YAHOO.widget.Panel("pdpMasterAddToRegistryPanel",{width:"242px",height:"94px",underlay:"none",draggable:false,modal:false,close:false,zIndex:3});b.addListener("m_atr_close","click",MACYS.addToRegistry.hide);b.addListener("m_atr_add_more","click",MACYS.addToRegistry.hide);b.addListener("m_atr_view_my_registry","click",MACYS.addToRegistry.goToRegistry);b.addListener("bd","click",MACYS.addToRegistry.hideLayer)});MACYS.addToRegistry.showErrMsg=function(){MACYS.addToRegistry.errorOverlay.show()};MACYS.addToRegistry.hideErrMsg=function(){var b=YAHOO.util.Dom,a=YAHOO.util.Event;b.get("atr_errMsg").innerHTML="";b.setStyle("atr_errMsgDiv","display","none");b.setStyle("atr_genErrMsgDiv","display","none");b.setStyle("atr_splErrMsgDiv","display","none");b.setStyle(b.getElementsByClassName("nonRegErrorIcon"),"display","none")};MACYS.addToRegistry.renderMasterPanel=function(c,g){var e=YAHOO.util.Dom,k=YAHOO.util.Event,f,d;f=g?g.parentNode:null;d=f?f.parentNode:null;MACYS.addToRegistry.isMasterPanelVisible=true;MACYS.addToRegistry.masterPanel.show();var b=e.get("pdpMasterAddToRegistryPanel");b.style.display="block";var l=c.BVR_MESSAGE,a=[];if(l){a=l.split(" ");if(a[0]=="1"){l=l.replace(/has been/g,"")}else{l=l.replace(/have been/g,"")}l=l.replace(/your/g,"");e.get("m_atr_header_text").innerHTML=l}MACYS.addToRegistry.masterPanel.render();try{var i=e.getY(g)-40;var j=e.getX(d)+d.offsetWidth-b.offsetWidth+5;MACYS.addToRegistry.masterPanel.moveTo(j,i)}catch(h){return}return b};MACYS.addToRegistry.hideLayer=function(){MACYS.addToRegistry.masterPanel.hide();if(MACYS.addToRegistry.isMasterPanelVisible){MACYS.addToRegistry.isMasterPanelVisible=false;MACYS.addToRegistry.clearSelections()}};MACYS.addToRegistry.goToRegistry=function(){window.location=MACYS.addToRegistry.viewRegistryUrl;MACYS.addToRegistry.hideLayer()};MACYS.addToRegistry.hide=function(c){var b=YAHOO.util.Dom,a=YAHOO.util.Event;if(c){a.preventDefault(c)}MACYS.addToRegistry.hideLayer();YAHOO.util.Dom.removeClass(MACYS.loading.element.parentNode,"masked");MACYS.loading.mask.style.display="none";MACYS.addToRegistry.clearSelections();setTimeout(function(){a.removeListener("loading_mask","click")},200)};MACYS.addToRegistry.inContextErrorMsgPanel=(function(){var a={},b,d=YAHOO.util.Event,c=YAHOO.util.Dom;a.init=function(){b=MACYS.util.popin();d.addListener("panelClosePopIn","click",this.clearSelected);d.addListener(document.body,"click",this.clearSelected)};a.show=function(e){MACYS.addToRegistry.isInCxtErrMsgPanelVisible=true;b.show(e)};a.clearSelected=function(){if(MACYS.addToRegistry.isInCxtErrMsgPanelVisible){MACYS.addToRegistry.isInCxtErrMsgPanelVisible=false;MACYS.addToRegistry.clearSelections()}};a.setMessage=function(i,h,f){var g="",e=i.replace(/&apos;/g,"'");g='<div id="addToRegistryInContextErrMsg" class="validationBody">'+e+"</div>";b.resizeTo(h+"px",f+"px");b.setInnerHTML(g);b.show()};return a})();MACYS.addToRegistry.errorOverlay=(function(){var b={},c=YAHOO.util.Dom,a=YAHOO.util.Event;b.response=null;b.init=function(){var d=(YAHOO.util.Dom.getElementsByClassName("tablet","html").length>0)?false:true;this.panel=new YAHOO.widget.Panel("registryErrorMsgPanel",{close:false,visible:true,draggable:false,modal:true,width:"620px",fixedcenter:d,underlay:"shadow"});this.panel.render(document.body);this.panel.hide();a.addListener(c.getElementsByClassName("registryContinueBtn"),"click",function(){MACYS.addToRegistry.errorOverlay.hide()},this,true);c.addClass(this.panel.element,"shadow");a.addListener("registryPanelHeaderCloseBtn","mousedown",this.hide,this,true);c.removeClass("registryErrorMsgPanel","hidden")};b.show=function(){if(MACYS.pdp&&MACYS.pdp.zoomViewer){MACYS.pdp.zoomViewer.setEnabled("false")}this.panel.show()};b.hide=function(d){if(d){a.preventDefault(d)}this.panel.hide();MACYS.loading.hideIframe();MACYS.addToRegistry.clearSelections();if(MACYS.pdp&&MACYS.pdp.zoomViewer){MACYS.pdp.zoomViewer.setEnabled("true")}};return b}());MACYS.addToRegistry.clearSelections=function(){var a=MACYS.addToRegistry.atr_productId;if(a&&MACYS.pdp.productSelectors&&MACYS.pdp.productSelectors[a]){MACYS.pdp.productSelectors[a].selectionController.clearSelectionsToAddMore()}};MACYS.addToRegistry.displayInContextErrPanel=function(d,c,b,a){MACYS.addToRegistry.inContextErrorMsgPanel.setMessage(d,b,a);MACYS.addToRegistry.inContextErrorMsgPanel.show(c)};MACYS.addToRegistry.limitExceededErrorMsg=function(b,a){MACYS.addToRegistry.limitExceeded=true;MACYS.addToRegistry.displayInContextErrPanel(b,a,250,50)};