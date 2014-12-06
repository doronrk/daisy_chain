/* Script imported from http://www.allenedmonds.com/wcsstore/AllenEdmonds/javascript/Search.js */
// Licensed Materials - Property of IBM
// (C) Copyright IBM Corp. 2012 All Rights Reserved.
if(typeof(SearchJS)=="undefined"||SearchJS==null||!SearchJS){SearchJS={autoSuggestTimer:-1,autoSuggestKeystrokeDelay:400,autoSuggestHover:false,autoSuggestPreviousTerm:"",autoSuggestURL:"",autoSelectOption:-1,historyIndex:-1,retrievedCachedSuggestions:false,TOTAL_SUGGESTED:4,TOTAL_HISTORY:2,AUTOSUGGEST_THRESHOLD:1,DYNAMIC_AUTOSUGGEST_THRESHOLD:1,CACHED_AUTOSUGGEST_OFFSET:1000,STATIC_CONTENT_SECTION_DIV:["autoSuggestStatic_1","autoSuggestStatic_2","autoSuggestStatic_3"],staticContentHeaderHistory:"",CachedSuggestionsURL:"",SearchAutoSuggestServletURL:"",searchDepartmentHoverTimeout:"",searchDepartmentSelect:function(categoryId,lel){$("searchDepartmentLabel").innerHTML=lel.innerHTML;$("search_categoryId").value=categoryId;this.hideSearchDepartmentList();return false;},cancelEvent:function(e){if(e.stopPropagation){e.stopPropagation();}if(e.preventDefault){e.preventDefault();}e.cancelBubble=true;e.cancel=true;e.returnValue=false;},searchDepartmentKeyPressed:function(event,pos,size,categoryId,item){if(event.keyCode==13){this.searchDepartmentSelect(categoryId,item);dojo.byId("headerSrchFieldInput").focus();}else{if(event.keyCode==38){if(pos!=0){dojo.byId("searchDepartmentList_"+(pos-1)).focus();this.cancelEvent(event);}}else{if(event.keyCode==40){if(pos!=size){dojo.byId("searchDepartmentList_"+(pos+1)).focus();this.cancelEvent(event);}}else{if(event.keyCode==27){dojo.byId("headerSrchFieldInput").focus();this.hideSearchDepartmentList();}else{if(event.shiftKey&&event.keyCode==9){dojo.byId("headerSrchFieldInput").focus();this.cancelEvent(event);this.hideSearchDepartmentList();}else{if(event.keyCode==9){dojo.byId("search_submit").focus();this.cancelEvent(event);this.hideSearchDepartmentList();}}}}}}return false;},hideSearchDepartmentList:function(){$("searchDepartmentList").style.display="none";},init:function(){dojo.connect(dojo.byId("headerSrchFieldInput"),"onfocus",SearchJS,SearchJS._onFocus);dojo.connect(dojo.byId("headerSrchFieldInput"),"onblur",SearchJS,SearchJS._onBlur);dojo.connect(dojo.byId("headerSrchFieldInput"),"onkeyup",SearchJS,SearchJS._onKeyUp);this.staticContentHeaderHistory="History";},setCachedSuggestionsURL:function(url){this.CachedSuggestionsURL=url;},setAutoSuggestURL:function(url){this.SearchAutoSuggestServletURL=url;},_onFocus:function(evt){this.retrieveCachedSuggestions();this.clearSearchField();},_onBlur:function(evt){this.fillSearchField();},_onKeyPress:function(evt){return evt.keyCode!=dojo.keys.ENTER;},_onKeyUp:function(evt){this.doAutoSuggest(evt,this.SearchAutoSuggestServletURL,dojo.byId("headerSrchFieldInput").value);},_handleEnterKey:function(){if(trim(document.CatalogSearchForm.searchTerm.value).length>0){if(this.autoSuggestURL!=""){document.location.href=this.autoSuggestURL;}else{document.CatalogSearchForm.searchTerm.value=trim(document.CatalogSearchForm.searchTerm.value);submitSpecifiedForm(document.CatalogSearchForm);}}},doDynamicAutoSuggest:function(url,searchTerm,showHeader){if(this.autoSuggestTimer!=-1){clearTimeout(this.autoSuggestTimer);this.autoSuggestTimer=-1;}this.autoSuggestTimer=setTimeout(function(){wc.render.getRefreshControllerById("AutoSuggestDisplayController").url=url+"&term="+encodeURIComponent(searchTerm)+"&showHeader="+showHeader;wc.render.updateContext("AutoSuggest_Context",{});this.autoSuggestTimer=-1;},this.autoSuggestKeystrokeDelay);},showAutoSuggest:function(display){var autoSuggest_Result_div=document.getElementById("autoSuggest_Result_div");if(dojo.isIE<7){var autoSuggest_content_div=document.getElementById("autoSuggest_content_div");var autoSuggestDropDownIFrame=document.getElementById("autoSuggestDropDownIFrame");}if(autoSuggest_Result_div!=null&&autoSuggest_Result_div!="undefined"){if(display){autoSuggest_Result_div.style.display="block";if(dojo.isIE<7){autoSuggestDropDownIFrame.style.height=autoSuggest_content_div.scrollHeight;autoSuggestDropDownIFrame.style.display="block";}}else{if(dojo.isIE<7){autoSuggestDropDownIFrame.style.display="none";autoSuggestDropDownIFrame.style.height=0;}autoSuggest_Result_div.style.display="none";}}},showAutoSuggestIfResults:function(){if(typeof(staticContent)!="undefined"&&document.getElementById(this.STATIC_CONTENT_SECTION_DIV[0]).innerHTML==""&&document.getElementById("autoSuggestHistory").innerHTML==""&&document.getElementById("dynamicAutoSuggestTotalResults")==null){this.showAutoSuggest(false);}else{if(document.getElementById("headerSrchFieldInput").value.length<=this.AUTOSUGGEST_THRESHOLD){this.showAutoSuggest(false);}else{this.showAutoSuggest(true);}}},selectAutoSuggest:function(term){var searchBox=document.getElementById("headerSrchFieldInput");requestSubmitted=false;searchBox.value=term;searchBox.focus();this.autoSuggestPreviousTerm=term;submitSpecifiedForm(document.CatalogSearchForm);},highLightSelection:function(state,index){var selection=document.getElementById("autoSelectOption_"+index);if(selection!=null&&selection!="undefined"){if(state){selection.className="autoSuggestSelected";var searchBox=document.getElementById("headerSrchFieldInput");searchBox.setAttribute("aria-activedescendant","suggestionItem_"+index);var totalDynamicResults=document.getElementById("dynamicAutoSuggestTotalResults");if((totalDynamicResults!=null&&totalDynamicResults!="undefined"&&index<totalDynamicResults.value)||(index>=this.historyIndex)){searchBox.value=selection.title;this.autoSuggestPreviousTerm=selection.title;this.autoSuggestURL="";}else{this.autoSuggestURL=selection.href;}}else{selection.className="";}return true;}else{return false;}},enableAutoSelect:function(index){this.highLightSelection(false,this.autoSelectOption);var item=document.getElementById("autoSelectOption_"+index);item.className="autoSuggestSelected";this.autoSelectOption=index;},resetAutoSuggestKeyword:function(){var originalKeyedSearchTerm=document.getElementById("autoSuggestOriginalTerm");if(originalKeyedSearchTerm!=null&&originalKeyedSearchTerm!="undefined"){var searchBox=document.getElementById("headerSrchFieldInput");searchBox.value=originalKeyedSearchTerm.value;this.autoSuggestPreviousTerm=originalKeyedSearchTerm.value;}},clearAutoSuggestResults:function(){for(var i=0;i<staticContent.length;i++){document.getElementById(this.STATIC_CONTENT_SECTION_DIV[i]).innerHTML="";}this.autoSuggestPreviousTerm="";this.autoSuggestURL="";document.getElementById("autoSuggestDynamic_Result_div").innerHTML="";this.showAutoSuggest(false);},doAutoSuggest:function(event,url,searchTerm){if(searchTerm.length<=this.AUTOSUGGEST_THRESHOLD){this.showAutoSuggest(false);}if(event.keyCode==dojo.keys.ENTER){this._handleEnterKey();return;}if(event.keyCode==dojo.keys.TAB){this.autoSuggestHover=true;return;}if(event.keyCode==dojo.keys.ESCAPE){this.showAutoSuggest(false);return;}if(event.keyCode==dojo.keys.UP_ARROW){var totalDynamicResults=document.getElementById("dynamicAutoSuggestTotalResults");if(this.highLightSelection(true,this.autoSelectOption-1)){this.highLightSelection(false,this.autoSelectOption);if(this.autoSelectOption==this.historyIndex){this.resetAutoSuggestKeyword();}this.autoSelectOption--;}else{if(this.autoSelectOption==this.CACHED_AUTOSUGGEST_OFFSET&&totalDynamicResults!=null&&totalDynamicResults!="undefined"){this.highLightSelection(false,this.CACHED_AUTOSUGGEST_OFFSET);this.autoSelectOption=totalDynamicResults.value-1;this.highLightSelection(true,this.autoSelectOption);}else{this.highLightSelection(false,this.autoSelectOption);this.autoSelectOption=-1;var originalKeyedSearchTerm=document.getElementById("autoSuggestOriginalTerm");this.resetAutoSuggestKeyword();}}return;}if(event.keyCode==dojo.keys.DOWN_ARROW){if(this.highLightSelection(true,this.autoSelectOption+1)){this.highLightSelection(false,this.autoSelectOption);this.autoSelectOption++;}else{if(this.autoSelectOption<this.CACHED_AUTOSUGGEST_OFFSET&&this.highLightSelection(true,this.CACHED_AUTOSUGGEST_OFFSET)){this.highLightSelection(false,this.autoSelectOption);this.autoSelectOption=this.CACHED_AUTOSUGGEST_OFFSET;this.resetAutoSuggestKeyword();}}return;}if(searchTerm.length>this.AUTOSUGGEST_THRESHOLD&&searchTerm==this.autoSuggestPreviousTerm){return;}else{this.autoSuggestPreviousTerm=searchTerm;}if(searchTerm.length<=this.AUTOSUGGEST_THRESHOLD){return;}if(this.autoSuggestTimer!=-1){clearTimeout(this.autoSuggestTimer);this.autoSuggestTimer=-1;}if(searchTerm!=""){this.autoSelectOption=-1;var hasResults=this.doStaticAutoSuggest(searchTerm);if(searchTerm.length>this.DYNAMIC_AUTOSUGGEST_THRESHOLD){var showHeader=false;this.doDynamicAutoSuggest(url,searchTerm,showHeader);}else{document.getElementById("autoSuggestDynamic_Result_div").innerHTML="";}}else{this.clearAutoSuggestResults();}},doStaticAutoSuggest:function(searchTerm){var resultList=["","","","","",""];var emptyCell=0;var searchTermLower=searchTerm.toLowerCase();var listCount=this.CACHED_AUTOSUGGEST_OFFSET;var divStart="<div class='list_section'>";var divEnd="</div>";for(var i=0;i<staticContent.length;i++){var count=0;for(var j=0;j<staticContent[i].length;j++){var searchName=staticContent[i][j][0];var searchURL=staticContent[i][j][1];var displayName=staticContent[i][j][2];var index=searchName.toLowerCase().indexOf(searchTermLower);if(index!=-1){var displayIndex=index+displayName.length-searchName.length;var subStringBefore=displayName.substr(0,displayIndex);var subStringAfter=displayName.substr(displayIndex+searchTerm.length);var highlightedSearchTerm="<span class='highlight'>"+searchTerm+"</span>";resultList[i]=resultList[i]+"<a id='autoSelectOption_"+listCount+"' title='"+displayName+"' onmouseout='this.className=\"\"; this.autoSuggestURL=\"\";' onmouseover='SearchJS.enableAutoSelect("+listCount+"); this.autoSuggestURL=this.href;' href=\""+searchURL+'">'+subStringBefore+highlightedSearchTerm+subStringAfter+"</a>";count++;listCount++;if(count>=this.TOTAL_SUGGESTED){break;}}}}for(var i=0;i<staticContent.length;i++){document.getElementById(this.STATIC_CONTENT_SECTION_DIV[i]).innerHTML="";if(resultList[i]!=""){document.getElementById(this.STATIC_CONTENT_SECTION_DIV[emptyCell]).innerHTML=divStart+resultList[i]+divEnd;emptyCell++;}}var historyList="";var searchHistorySection=document.getElementById("autoSuggestHistory");searchHistorySection.innerHTML="";var historyArray=new Array();this.historyIndex=listCount;var searchHistoryCookie=getCookie("searchTermHistory");if(typeof(searchHistoryCookie)!="undefined"){var termsArray=searchHistoryCookie.split("|");var count=0;for(var i=termsArray.length-1;i>0;i--){var theTerm=termsArray[i];var theLowerTerm=theTerm.toLowerCase();if(theLowerTerm.match("^"+searchTermLower)==searchTermLower){var repeatedTerm=false;for(var j=0;j<historyArray.length;j++){if(historyArray[j]==theLowerTerm){repeatedTerm=true;break;}}if(!repeatedTerm){historyList=historyList+"<li id='suggestionItem_"+listCount+"' role='listitem' tabindex='-1'><a href='#' onmouseout='this.className=\"\"' onmouseover='SearchJS.enableAutoSelect("+listCount+");' onclick='SearchJS.selectAutoSuggest(this.title); return false;' title=\""+theTerm+"\" id='autoSelectOption_"+listCount+"'><strong>"+searchTerm+"</strong>"+theTerm.substring(searchTerm.length,theTerm.length)+"</a></li>";historyArray.push(theLowerTerm);count++;listCount++;if(count>=this.TOTAL_HISTORY){break;}}}}}if(historyList!=""){var heading="<div class='heading'><span>"+this.staticContentHeaderHistory+"</span></div>";searchHistorySection.innerHTML=heading+divStart+" title='"+this.staticContentHeaderHistory+"'>"+historyList+divEnd;emptyCell++;}if(emptyCell>0){this.showAutoSuggest(true);return true;}return false;},retrieveCachedSuggestions:function(){if(!this.retrievedCachedSuggestions){wc.render.getRefreshControllerById("AutoSuggestCachedSuggestionsController").url=this.CachedSuggestionsURL;wc.render.updateContext("CachedSuggestions_Context",{});}},clearSearchField:function(){searchText=document.getElementById("headerSrchFieldInput").value;if(searchText!=""){document.getElementById("headerSrchFieldInput").select();this.showAutoSuggestIfResults();this.autoSuggestHover=false;}},fillSearchField:function(){if(!this.autoSuggestHover){this.showAutoSuggest(false);}},selectSearchResultsTab:function(tabId){document.getElementById("productsResultTab").setAttribute("class","tab_container inactive_tab");document.getElementById("productsResultTab_wrapper").setAttribute("aria-selected","false");document.getElementById("productsSearchBasedNavigationWidget").style.display="none";document.getElementById("contentsResultTab").setAttribute("class","tab_container inactive_tab");document.getElementById("contentsResultTab_wrapper").setAttribute("aria-selected","false");document.getElementById("contentsSearchBasedNavigationWidget").style.display="none";document.getElementById(tabId+"ResultTab").setAttribute("class","tab_container active_tab focused_tab");document.getElementById(tabId+"ResultTab_wrapper").setAttribute("aria-selected","true");document.getElementById(tabId+"SearchBasedNavigationWidget").style.display="block";},selectSearchResultsTabWithKeyboard:function(tabId,event){if(event.keyCode==dojo.keys.SPACE){this.selectSearchResultsTab(tabId);this.cancelEvent(event);}},focusSearchResultTab:function(tabId){if(document.getElementById(tabId).getAttribute("class").indexOf("inactive_tab")>0){document.getElementById(tabId).setAttribute("class","tab_container inactive_tab focused_tab");}else{document.getElementById(tabId).setAttribute("class","tab_container active_tab focused_tab");}},onBlurSearchResultTab:function(tabId){if(document.getElementById(tabId).getAttribute("class").indexOf("inactive_tab")>0){document.getElementById(tabId).setAttribute("class","tab_container inactive_tab");}else{document.getElementById(tabId).setAttribute("class","tab_container active_tab");}},updateSearchTermHistoryCookie:function(updatedSearchTerm){var cookieKey="searchTermHistory";var cookieValue="|"+updatedSearchTerm;var searchTermHistoryCookie=getCookie(cookieKey);if(typeof(searchTermHistoryCookie)!="undefined"){cookieValue=dojo.cookie(cookieKey)+cookieValue;}dojo.cookie(cookieKey,cookieValue,{path:"/"});},updateSearchTermHistoryCookieAndRedirect:function(updatedSearchTerm,redirectURL){this.updateSearchTermHistoryCookie(updatedSearchTerm);document.location.href=redirectURL;}};wc.render.declareContext("AutoSuggest_Context",null,"");wc.render.declareContext("CachedSuggestions_Context",null,"");wc.render.declareRefreshController({id:"AutoSuggestCachedSuggestionsController",renderContext:wc.render.getContextById("CachedSuggestions_Context"),url:"",formId:"",renderContextChangedHandler:function(message,widget){var controller=this;var renderContext=this.renderContext;widget.refresh(renderContext.properties);},postRefreshHandler:function(widget){var controller=this;var renderContext=this.renderContext;var response=document.getElementById("cachedSuggestions");if(response==null){document.getElementById("autoSuggestCachedSuggestions_div").innerHTML="";}else{var scripts=response.getElementsByTagName("script");var j=scripts.length;for(var i=0;i<j;i++){var newScript=document.createElement("script");newScript.type="text/javascript";newScript.text=scripts[i].text;document.getElementById("autoSuggestCachedSuggestions_div").appendChild(newScript);}SearchJS.retrievedCachedSuggestions=true;var searchTerm=document.getElementById("headerSrchFieldInput").value;if(searchTerm.length>SearchJS.AUTOSUGGEST_THRESHOLD){SearchJS.doStaticAutoSuggest(searchTerm);}}}});wc.render.declareRefreshController({id:"AutoSuggestDisplayController",renderContext:wc.render.getContextById("AutoSuggest_Context"),url:"",formId:"",renderContextChangedHandler:function(message,widget){var controller=this;var renderContext=this.renderContext;widget.refresh(renderContext.properties);},postRefreshHandler:function(widget){var controller=this;var renderContext=this.renderContext;var response=document.getElementById("suggestedKeywordResults");if(response==null){document.getElementById("autoSuggestDynamic_Result_div").innerHTML="";}SearchJS.showAutoSuggestIfResults();}});}