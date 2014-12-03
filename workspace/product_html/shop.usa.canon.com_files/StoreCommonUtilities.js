dojo.registerModulePath("wc","../wc");dojo.require("wc.service.common");dojo.require("dojo.io.iframe");dojo.require("dojo.io.script");dojo.require("dojo.parser");dojo.require("dijit.form.Button");dojo.require("wc.widget.WCMenu");dojo.require("wc.widget.WCDialog");dojo.require("dijit.layout.TabContainer");dojo.require("dijit.layout.ContentPane");dojo.require("dijit.Tooltip");dojo.require("wc.widget.WCDropDownButton");dojo.require("dijit.Dialog");dojo.require("dojo.currency");dojo.require("dijit.Tree");dojo.require("dojo.back");dojo.require("dijit.form.DateTextBox");dojo.require("wc.widget.RefreshArea");dojo.require("wc.render.RefreshController");dojo.require("wc.render.Context");dojo.require("dojo.cookie");dojo.require("dojo.topic");dojo.subscribe("ajaxRequestInitiated","incrementNumAjaxRequest");dojo.subscribe("ajaxRequestCompleted","decrementNumAjaxRequest");dojo.subscribe("ajaxRequestCompleted","initializeInactivityWarning");var showDropdown=false;var dropDownDlg=null;var productAddedDropDownDlg=null;var originalMiniCartWidth=0;var isIE=(document.all)?true:false;var correctBrowser=false;var requestSubmitted=true;var currentId="";var numAjaxRequests=0;var widgetsList=[];var tabPressed=false;var currentPopup="";var android=null;var ios=null;function initializeInactivityWarning(){if(storeUserType!="G"&&inactivityTimeout!=0){if(inactivityTimeoutTracker!=null){clearTimeout(inactivityTimeoutTracker);}inactivityTimeoutTracker=setTimeout(showInactivityWarningDialog,inactivityTimeout-inactivityWarningDialogBuffer);}}function showInactivityWarningDialog(){dijit.byId("inactivityWarningPopup").show();if(dialogTimeoutTracker!=null){clearTimeout(dialogTimeoutTracker);}dialogTimeoutTracker=setTimeout(hideInactivityWarningDialog,inactivityWarningDialogDisplayTimer);}function hideInactivityWarningDialog(){dijit.byId("inactivityWarningPopup").hide();}function resetServerInactivity(){dojo.xhrPost({url:getAbsoluteURL()+"Ping",handleAs:"json-comment-filtered",content:null,service:this,load:function(serviceResponse,ioArgs){if(serviceResponse.success){initializeInactivityWarning();}else{console.error("Ping service failed");}},error:function(errObj,ioArgs){console.error("Ping service failed");}});}function byId(r){return document.getElementById(r);}function focusSetter(){if(dojo.byId("MiniCartFocusReceiver1")){dojo.byId("MiniCartFocusReceiver1").focus();}else{dojo.byId("MiniCartFocusReceiver2").focus();}}function determineFocus(event){if(event.shiftKey&&event.keyCode==dojo.keys.TAB){if(event.srcElement){if(event.srcElement.id=="MiniCartFocusReceiver1"){if(dojo.byId("WC_MiniShopCartDisplay_link_5")){dojo.byId("WC_MiniShopCartDisplay_link_5").focus();}dojo.stopEvent(event);}else{if(event.srcElement.id=="MiniCartFocusReceiver2"){dojo.byId("MiniCartFocusReceiver2").focus();dojo.stopEvent(event);}}}else{if(event.target.id=="MiniCartFocusReceiver1"){if(dojo.byId("WC_MiniShopCartDisplay_link_5")){dojo.byId("WC_MiniShopCartDisplay_link_5").focus();}dojo.stopEvent(event);}else{if(event.target.id=="MiniCartFocusReceiver2"){dojo.byId("MiniCartFocusReceiver2").focus();dojo.stopEvent(event);}}}}}function destroyDialog(contentId){if(contentId==undefined){contentId="quick_cart_container";}dojo.query(".dijitDialog",document).forEach(function(tag){if(dijit.byNode(tag).id==contentId){dijit.byNode(tag).destroyRecursive();}});if(contentId!=undefined&&contentId=="quick_cart_container"){dropDownDlg=null;}else{productAddedDropDownDlg=null;}}function hideUnderlayWrapper(){dojo.query(".dijitDialogUnderlayWrapper",document).forEach(function(tag){tag.style.display="none";});}function loadLink(url){document.location.href=url;}function clearSearchField(){searchText=document.getElementById("SimpleSearchForm_SearchTerm").value;if(searchText==document.getElementById("searchTextHolder").innerHTML){document.getElementById("SimpleSearchForm_SearchTerm").value="";}else{document.getElementById("SimpleSearchForm_SearchTerm").select();showAutoSuggestIfResults();autoSuggestHover=false;}}function fillSearchField(){if(document.getElementById("SimpleSearchForm_SearchTerm").value==""){document.getElementById("SimpleSearchForm_SearchTerm").className="search_input gray_color";document.getElementById("SimpleSearchForm_SearchTerm").value=document.getElementById("searchTextHolder").innerHTML;}if(!autoSuggestHover){showAutoSuggest(false);}}function showDropDownMenu(){var showMenu=document.getElementById("header_menu_dropdown");if(document.getElementById("header_menu_dropdown")!=null&&document.getElementById("header_menu_dropdown")!="undefined"){showMenu.style.display="block";}if(document.getElementById("outerCartContainer")!=null&&document.getElementById("outerCartContainer")!="undefined"){var outershopcart=document.getElementById("outerCartContainer");outershopcart.style.display="block";}}function initShopcartTarget(){dojo.subscribe("/dnd/drop",function(source,nodes,copy,target){if(source!=target){target.deleteSelectedNodes();}var actionListScroll=new popupActionProperties();actionListScroll.showProductCompare=showProductCompare;if(target.parent.id=="miniShopCart_dndTarget"){var indexOfIdentifier=source.parent.id.indexOf("_",0);if(indexOfIdentifier>=0){source.parent.id=source.parent.id.substring(indexOfIdentifier+1);}if(source.node.getAttribute("dndType")=="item"||source.node.getAttribute("dndType")=="package"){categoryDisplayJS.AddItem2ShopCartAjax(source.parent.id,1);}else{if(source.node.getAttribute("dndType")=="product"||source.node.getAttribute("dndType")=="bundle"){showPopup(source.parent.id,function(e){return e;},"miniShopCart_dndTarget",null,actionListScroll);}}}});}function cursor_wait(checkForOpera){var showPopup=true;if(checkForOpera==true){if(dojo.isOpera>0){showPopup=false;}}if(showPopup){setTimeout("showProgressBar()",500);}}function showProgressBar(){if(!requestSubmitted){return;}displayProgressBar();}function displayProgressBar(){var dialog=dijit.byId("progress_bar_dialog");if(dialog!=null){dialog.closeButtonNode.style.display="none";var progressBar=document.getElementById("progress_bar");progressBar.style.display="block";if(this.currentId!=""){var element=document.getElementById(this.currentId);var pos=dijit.placeOnScreenAroundElement(progressBar,element,{"TR":"TL"});}else{dialog.containerNode.innerHTML=="";progressBar.style.left="";progressBar.style.top="";dialog.containerNode.appendChild(progressBar);dialog.show();}setTimeout("cursor_clear()",1800000);}}function setCurrentId(id){if(!requestSubmitted&&this.currentId==""){this.currentId=id;}}function trim(inword){word=inword.toString();var i=0;var j=word.length-1;while(word.charAt(i)==" "){i++;}while(word.charAt(j)==" "){j=j-1;}if(i>j){return word.substring(i,i);}else{return word.substring(i,j+1);}}function cursor_clear(){requestSubmitted=false;var dialog=dijit.byId("progress_bar_dialog");var progressBar=document.getElementById("progress_bar");if(dialog!=null){if(progressBar!=null){progressBar.style.display="none";}dialog.hide();this.currentId="";}}function submitRequest(){if(!requestSubmitted){requestSubmitted=true;return true;}return false;}function resetRequest(){requestSubmitted=false;}function setPageLocation(newPageLink){if(!submitRequest()){return;}document.location.href=newPageLink;}function submitSpecifiedForm(form){if(!submitRequest()){return;}console.debug("form.action == "+form.action);form.submit();}function parseWidget(id){}function parseAllWidgets(){for(var i=0;i<widgetsList.length;i++){parseWidget(widgetsList[i]);}}function addToWidgetsList(widgetId){widgetsList.push(widgetId);}function parseWCCEAWidget(id){var node;var widget=ceadijit.byId(id);if(widget==null||widget==undefined){if(id==null||id==undefined){node=ceadojo.body();}else{node=ceadojo.byId(id);}if(node!=null&&node!=undefined){if(node.getAttribute("ceadojoType")!=null&&node.getAttribute("ceadojoType")!=undefined){ceadojo.parser.instantiate([node]);}else{ceadojo.parser.parse(node);}}}}function parseHeader(id){var node=dojo.byId("progress_bar_dialog");var showMenu=document.getElementById("header_menu_loaded");var hideMenu=document.getElementById("header_menu_overlay");if(currentId.length==0&&document.getElementById("header_menu_loaded")!=null&&document.getElementById("header_menu_loaded")!="undefined"&&document.getElementById("header_menu_overlay")!=null&&document.getElementById("header_menu_overlay")!="undefined"&&document.getElementById("header_menu_loaded").style.display=="none"){setCurrentId((id!=null&&id!=undefined)?id:hideMenu.id);submitRequest();cursor_wait();hideMenu.style.display="none";parseWidget("header_menu_loaded");showMenu.style.display="block";cursor_clear();try{if(window.top._ceaCollabDialog!=undefined||window.top._ceaCollabDialog!=null){dijit.registry.byClass("wc.widget.WCDropDownButton").forEach(function(w){dojo.connect(w,"_onDropDownClick",dojo.hitch(window.top._ceaCollabDialog,"topCategoryClicked",w.getURL()));dojo.connect(w,"onKeyPress",window.top._ceaCollabDialog,function(e){if(e.keyCode==dojo.keys.ENTER){window.top._ceaCollabDialog.topCategoryClicked(w.getURL());}});});}}catch(err){console.log(err);}}}function hideElementById(elementId){var div=dojo.byId(elementId);div.style.display="none";}function showElementById(elementId){var div=dojo.byId(elementId);div.style.display="block";}function hideBackgroundImage(element){element.style.backgroundImage="none";}function showBackgroundImage(element){element.style.backgroundImage="url("+getImageDirectoryPath()+getStyleDirectoryPath()+"product_hover_background.png)";}function checkIE8Browser(){if(dojo.isIE&&dojo.isIE<=8){correctBrowser=true;}}function ApprovalToolLink(idTag,approvalToolLinkURL){checkIE8Browser();if(correctBrowser){RFQwindow=window.open(approvalToolLinkURL);}else{MessageHelper.formErrorHandleClient(idTag,MessageHelper.messages["ERROR_INCORRECT_BROWSER"]);return;}}function updateViewAndBeginIndexForCurrencyChange(){if(document.getElementById("fastFinderResultControls")!=null&&document.getElementById("fastFinderResultControls")!=""){if(document.SetCurrencyPreferenceForm.pageView!=null){document.SetCurrencyPreferenceForm.pageView.value=document.FastFinderForm.pageView.value;}if(document.SetCurrencyPreferenceForm.beginIndex!=null){document.SetCurrencyPreferenceForm.beginIndex.value=document.FastFinderForm.beginIndex.value;}}else{if(document.getElementById("CategoryDisplay_Widget")!=null&&document.getElementById("CategoryDisplay_Widget")!=""){if(wc.render.getContextById("CategoryDisplay_Context").properties["pageView"]!=""&&document.SetCurrencyPreferenceForm.pageView!=null){document.SetCurrencyPreferenceForm.pageView.value=wc.render.getContextById("CategoryDisplay_Context").properties["pageView"];}if(wc.render.getContextById("CategoryDisplay_Context").properties["beginIndex"]!=""&&document.SetCurrencyPreferenceForm.beginIndex!=null){document.SetCurrencyPreferenceForm.beginIndex.value=wc.render.getContextById("CategoryDisplay_Context").properties["beginIndex"];}}else{if(document.getElementById("Search_Result_Summary")!=null&&document.getElementById("Search_Result_Summary")!=""){if(wc.render.getContextById("catalogSearchResultDisplay_Context").properties["searchResultsView"]!=""&&document.SetCurrencyPreferenceForm.pageView!=null){document.SetCurrencyPreferenceForm.pageView.value=wc.render.getContextById("catalogSearchResultDisplay_Context").properties["searchResultsView"];}if(wc.render.getContextById("catalogSearchResultDisplay_Context").properties["searchResultsPageNum"]!=""&&document.SetCurrencyPreferenceForm.beginIndex!=null){document.SetCurrencyPreferenceForm.beginIndex.value=wc.render.getContextById("catalogSearchResultDisplay_Context").properties["searchResultsPageNum"];}}else{if(document.getElementById("Search_Result_Summary2")!=null&&document.getElementById("Search_Result_Summary2")!=""){if(wc.render.getContextById("contentSearchResultDisplay_Context").properties["searchResultsView"]!=""&&document.SetCurrencyPreferenceForm.pageView!=null){document.SetCurrencyPreferenceForm.pageView.value=wc.render.getContextById("contentSearchResultDisplay_Context").properties["searchResultsView"];}if(wc.render.getContextById("contentSearchResultDisplay_Context").properties["searchResultsPageNum"]!=""&&document.SetCurrencyPreferenceForm.beginIndex!=null){document.SetCurrencyPreferenceForm.beginIndex.value=wc.render.getContextById("contentSearchResultDisplay_Context").properties["searchResultsPageNum"];}}}}}try{if(window.top._ceaCollabDialog!=undefined||window.top._ceaCollabDialog!=null){dojo.byId("SetCurrencyPreferenceForm").URL.value=dojo.byId("SetCurrencyPreferenceForm").URL.value+"&coshopChangeCurrency="+dojo.byId("currencySelection").options[dojo.byId("currencySelection").selectedIndex].value;}}catch(err){console.log(err);}}function updateViewAndBeginIndexForLanguageChange(){if(document.getElementById("fastFinderResultControls")!=null&&document.getElementById("fastFinderResultControls")!=""){if(document.LanguageSelectionForm.pageView!=null){document.LanguageSelectionForm.pageView.value=document.FastFinderForm.pageView.value;}if(document.LanguageSelectionForm.beginIndex!=null){document.LanguageSelectionForm.beginIndex.value=document.FastFinderForm.beginIndex.value;}}else{if(document.getElementById("CategoryDisplay_Widget")!=null&&document.getElementById("CategoryDisplay_Widget")!=""){if(wc.render.getContextById("CategoryDisplay_Context").properties["pageView"]!=""&&document.LanguageSelectionForm.pageView!=null){document.LanguageSelectionForm.pageView.value=wc.render.getContextById("CategoryDisplay_Context").properties["pageView"];}if(wc.render.getContextById("CategoryDisplay_Context").properties["beginIndex"]!=""&&document.LanguageSelectionForm.beginIndex!=null){document.LanguageSelectionForm.beginIndex.value=wc.render.getContextById("CategoryDisplay_Context").properties["beginIndex"];}}else{if(document.getElementById("Search_Result_Summary")!=null&&document.getElementById("Search_Result_Summary")!=""){if(wc.render.getContextById("catalogSearchResultDisplay_Context").properties["searchResultsView"]!=""&&document.LanguageSelectionForm.pageView!=null){document.LanguageSelectionForm.pageView.value=wc.render.getContextById("catalogSearchResultDisplay_Context").properties["searchResultsView"];}if(wc.render.getContextById("catalogSearchResultDisplay_Context").properties["searchResultsPageNum"]!=""&&document.LanguageSelectionForm.beginIndex!=null){document.LanguageSelectionForm.beginIndex.value=wc.render.getContextById("catalogSearchResultDisplay_Context").properties["searchResultsPageNum"];}}else{if(document.getElementById("Search_Result_Summary2")!=null&&document.getElementById("Search_Result_Summary2")!=""){if(wc.render.getContextById("contentSearchResultDisplay_Context").properties["searchResultsView"]!=""&&document.LanguageSelectionForm.pageView!=null){document.LanguageSelectionForm.pageView.value=wc.render.getContextById("contentSearchResultDisplay_Context").properties["searchResultsView"];}if(wc.render.getContextById("contentSearchResultDisplay_Context").properties["searchResultsPageNum"]!=""&&document.LanguageSelectionForm.beginIndex!=null){document.LanguageSelectionForm.beginIndex.value=wc.render.getContextById("contentSearchResultDisplay_Context").properties["searchResultsPageNum"];}}}}}try{if(window.top._ceaCollabDialog!=undefined||window.top._ceaCollabDialog!=null){dojo.byId("LanguageSelectionForm").action=dojo.byId("LanguageSelectionForm").action+"&langId="+dojo.byId("languageSelection").options[dojo.byId("languageSelection").selectedIndex].value;}}catch(err){console.log(err);}}function showHeaderLinksInTwoLines(){if(document.getElementById("header_links")!=null&&document.getElementById("header_links")!="undefined"){if(dojo.contentBox(document.getElementById("header_links")).w>750){if(document.getElementById("header_links1")!=null&&document.getElementById("header_links1")!="undefined"){document.getElementById("header_links1").style.display="block";}if(document.getElementById("headerHomeLink")!=null&&document.getElementById("headerHomeLink")!="undefined"){document.getElementById("headerHomeLink").style.display="none";}if(document.getElementById("headerShopCartLink")!=null&&document.getElementById("headerShopCartLink")!="undefined"){document.getElementById("headerShopCartLink").style.display="none";}}document.getElementById("header_links").style.visibility="visible";}}function showLinksInOneLine(){if(document.getElementById("header_links")!=null&&document.getElementById("header_links")!="undefined"){document.getElementById("header_links").style.visibility="visible";}}function isNonNegativeInteger(value){var regExpTester=new RegExp(/^\d*$/);return(value!=null&&value!=""&&regExpTester.test(value));}function isPositiveInteger(value){return(isNonNegativeInteger(value)&&value!=0);}function closeAllDialogs(){dijit.registry.byClass("dijit.Dialog").forEach(function(w){w.hide();});}function setWarningMessageCookie(errorKey){dojo.cookie("signon_warning_cookie",errorKey,{path:"/"});}function removeCookie(name){dojo.cookie(name,null,{expires:-1});}function getCookie(c){var cookies=document.cookie.split(";");for(var i=0;i<cookies.length;i++){var index=cookies[i].indexOf("=");var name=cookies[i].substr(0,index);name=name.replace(/^\s+|\s+$/g,"");if(name==c){return unescape(cookies[i].substr(index+1));}}}function isStorePreview(contextPathUsed,criteria){if(contextPathUsed.indexOf(criteria)>-1){return true;}return false;}function hideESpotInfoPopup(id,event){if(event!=null&&event.type=="keypress"&&event.keyCode!="27"){return;}else{var quickInfo=dijit.byId(id);if(quickInfo!=null){quickInfo.hide();}}}function showESpotInfoPopup(id,event){if(event!=null&&event.type=="keypress"&&event.keyCode!="13"){return;}else{if(!parent.checkPopupAllowed()){return;}var quickInfo=dijit.byId(id);if(quickInfo!=null){quickInfo.show();}}}function incrementNumAjaxRequest(){if(numAjaxRequests!="undefined"){numAjaxRequests++;}}function decrementNumAjaxRequest(){if(numAjaxRequests!="undefined"){if(numAjaxRequests!=0){numAjaxRequests--;}}}function updateParamObject(params,key,value,toArray,index){if(params==null){params=[];}if(params[key]!=null&&toArray){if(dojo.lang.isArrayLike(params[key])){if(index!=null&&index!=""){params[key][index]=value;}else{params[key].push(value);}}else{var tmpValue=params[key];params[key]=[];params[key].push(tmpValue);params[key].push(value);}}else{if(index!=null&&index!=""&&index!=-1){params[key+"_"+index]=value;}else{if(index==-1){var i=1;while(params[key+"_"+i]!=null){i++;}params[key+"_"+i]=value;}else{params[key]=value;}}}return params;}function showSection(id){var section=dojo.byId(id);if(section!=null&&section!="undefined"){section.style.visibility="visible";}}function hideSection(id){var section=dojo.byId(id);if(section!=null&&section!="undefined"){section.style.visibility="";}}function shiftTabHideSection(id,event){if(event.shiftKey&&(event.keyCode==dojo.keys.TAB)){hideSection(id);}}function tabHideSection(id,event,nextId){if(!event.shiftKey&&(event.keyCode==dojo.keys.TAB)){if(null!=nextId){dojo.byId(nextId).focus();}hideSection(id);dojo.stopEvent(event);}}function saveShiftTabPress(event){if(event.shiftKey==true&&event.keyCode==9){tabPressed=true;}}function saveTabPress(event){if(event.shiftKey==false&&event.keyCode==9){tabPressed=true;}}function setFocus(formElementId){if(tabPressed){tabPressed=false;document.getElementById(formElementId).focus();}}function increaseHeight(containerId,increase){var temp=document.getElementById(containerId).offsetHeight;document.getElementById(containerId).style.height=(temp+increase)+"px";}function redirectToSignOn(forcedUrl){if(typeof(forcedUrl)!="undefined"){var currentURL=forcedUrl;}else{var currentURL=location.href;}currentURL="OrderItemMove?continue=1&createIfEmpty=1&updatePrices=0&deleteIfEmpty=*&fromOrderId=*&toOrderId=.&page=&calculationUsageId=-1&URL="+encodeURIComponent("OrderCalculate?URL="+encodeURIComponent(currentURL));document.location.href="LogonForm?myAcctMain=1&storeId="+WCParamJS.storeId+"&catalogId="+WCParamJS.catalogId+"&langId="+WCParamJS.langId+"&URL="+encodeURIComponent(currentURL);}function handlePopup(link,newPopup){if(currentPopup==newPopup){document.location.href=link;}else{currentPopup=newPopup;}}function isAndroid(){if(android==null){if(navigator!=null){if(navigator.userAgent!=null){var ua=navigator.userAgent.toLowerCase();android=ua.indexOf("android")>-1;}}}return android;}function isIOS(){if(ios==null){if(navigator!=null){if(navigator.userAgent!=null){var ua=navigator.userAgent.toLowerCase();ios=(ua.indexOf("ipad")>-1)||(ua.indexOf("iphone")>-1)||(ua.indexOf("ipod")>-1);}}}return ios;}function outlineSpots(){dojo.addClass(document.body,"editMode");dojo.query(".carousel > .content").style({zIndex:"auto"});dojo.query(".ESpotInfo").style({display:"block"});dojo.query(".searchScore").style({display:"block"});dojo.query(".editManagedContent").style({display:"block"});var all=dojo.query(".genericESpot,.product,.searchResultSpot,.productDetail,.categorySpot");for(var i=0;i<all.length;i++){var currEl=all[i];if(dojo.hasClass(currEl,"emptyESpot")){var elementWidth=dojo.query(".ESpotInfo",currEl)[0].offsetWidth+4;var elementHeight=dojo.query(".ESpotInfo",currEl)[0].offsetHeight+4;dojo.attr(currEl,"_width",dojo.style(currEl,"width"));dojo.attr(currEl,"_height",dojo.style(currEl,"height"));dojo.style(currEl,{"width":+elementWidth+"px","height":elementHeight+"px"});}if(dojo.query(".borderCaption",currEl).length==0){dojo.place("<div class='borderCaption'></div>",currEl,"first");}else{dojo.query(".borderCaption",currEl).style({"display":"block"});}if(currEl.addEventListener){currEl.addEventListener("mouseover",function(evt){if(!window.parent.frames[0].isSpotsShown()){return;}dojo.query(".caption").style({display:"none"});dojo.style(dojo.query(".caption",this)[0],{display:"block"});evt.stopPropagation();},false);currEl.addEventListener("mouseout",function(evt){if(!window.parent.frames[0].isSpotsShown()){return;}dojo.query(".caption",this).style({display:"none"});evt.stopPropagation();},false);}else{if(currEl.attachEvent){currEl.onmouseover=((function(currEl){return(function(){if(!window.parent.frames[0].isSpotsShown()){return;}dojo.query(".caption").style({display:"none"});dojo.style(dojo.query(".caption",currEl)[0],{display:"block"});window.event.cancelBubble=true;});})(currEl));currEl.onmouseleave=((function(currEl){return(function(){if(!window.parent.frames[0].isSpotsShown()){return;}dojo.query(".caption",currEl).style({display:"none"});window.event.cancelBubble=true;});})(currEl));}}}}function hideSpots(){dojo.removeClass(document.body,"editMode");dojo.query(".carousel > .content").style({zIndex:""});dojo.query(".ESpotInfo").style({display:"none"});dojo.query(".caption").style({display:"none"});dojo.query(".searchScore").style({display:"none"});dojo.query(".editManagedContent").style({display:"none"});dojo.query(".borderCaption").style({display:"none"});dojo.query(".emptyESpot").forEach(function(e){dojo.style(e,{"width":dojo.attr(e,"_width")+"px"});dojo.style(e,{"height":dojo.attr(e,"_height")+"px"});});}function logout(url){setDeleteCartCookie();document.location.href=url;}function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}else{var expires="";}document.cookie=name+"="+value+expires+"; path=/";}function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(";");for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==" "){c=c.substring(1,c.length);}if(c.indexOf(nameEQ)==0){return c.substring(nameEQ.length,c.length);}}return null;}