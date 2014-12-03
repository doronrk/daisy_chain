
if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');};}
window.MarketLive=window.MarketLive||{};MarketLive.Base=MarketLive.Base||{};(function(ns){ns.preload=function(aImgSrc){for(var i=0;i<aImgSrc.length;i++){var newImg=new Image();newImg.src=aImgSrc[i];aImgSrc["img_"+i]=newImg;}};ns.rollover=function(name,source){document.images[name].src=source;};ns.cssRollOver=function(oElement){var sCSSClass=oElement.className;if(sCSSClass.indexOf("On")!=-1){oElement.className=sCSSClass.replace(/On/,"Off");}else if(sCSSClass.indexOf("Off")!=-1){oElement.className=sCSSClass.replace(/Off/,"On");}};ns.getVariableValue=function(variableName){var result="";if(MarketLive.Reporting){if(MarketLive.Reporting.omnitureEnabled){result=MarketLive.Reporting.getOmnitureVariable(variableName);}else if(MarketLive.Reporting.googleAnalyticsEnabled){if(variableName!='eVar4'){if('pageName'==variableName){result=MarketLive.Reporting.resolveCurrentPageURL();}else{result=MarketLive.Reporting.getGoogleAnalyticsVariable(variableName);}}}}
return result;};ns.reloadUrlOnReviewSubmitError=function(elementId,url){document.getElementById(elementId).href=url;};ns.showRecaptchaWithinConditions=function(mlRatingEnabled,recaptchaEnabled,timeoutMilliseconds){if(!mlRatingEnabled||!recaptchaEnabled){document.getElementById('reviewSubmitContainerDiv').style.display='inline';}else{if(document.getElementById('recaptcha_challenge_field')!=null&&document.getElementById('recaptcha_response_field')!=null){document.getElementById('reviewSubmitContainerDiv').style.display='inline';}else{var counter=0;var interval=50;var maxExecutionNumber=timeoutMilliseconds/interval;var intervalId=setInterval(function(){if(counter<=maxExecutionNumber){counter++;if(document.getElementById('recaptcha_challenge_field')!=null&&document.getElementById('recaptcha_response_field')!=null){document.getElementById('reviewSubmitContainerDiv').style.display='inline';clearInterval(intervalId);return;}}else{document.getElementById('recaptchaErrorContainer').style.display='inline';clearInterval(intervalId);}},interval);}}};ns.stars=function(selector){return jQuery(selector).each(function(){if(jQuery(this).find("span").size()==0){var val=parseFloat(jQuery(this).html());var size=Math.max(0,(Math.min(5,val)))*16;var $span=jQuery('<span />').width(size);jQuery(this).html($span);}});}
ns.getParameterByName=function(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regex=new RegExp("[\\?&]"+name+"=([^&#]*)"),results=regex.exec(location.search);return results==null?"":decodeURIComponent(results[1].replace(/\+/g," "));}})(MarketLive.Base);MarketLive.Nav=MarketLive.Nav||{};MarketLive.Nav.TopNav=MarketLive.Nav.TopNav||{};var facebookLikeHrefToIdMap=[];(function(ns){ns.initialize=function(minKeywordLength,maxKeywordLength,msgSearch,msgNoSearchTerm,msgShortSearchTerm){ns.minKeywordLength=minKeywordLength;ns.maxKeywordLength=maxKeywordLength;ns.msgSearch=msgSearch;ns.msgNoSearchTerm=msgNoSearchTerm;ns.msgShortSearchTerm=msgShortSearchTerm;};ns.checkKeyword=function(keyword,defaultText){var minKeywordLength=0;var maxKeywordLength=0;minKeywordLength+=ns.minKeywordLength;maxKeywordLength+=ns.maxKeywordLength;var searchTerms='';keyword.value=keyword.value.trim();searchTerms=keyword.value;defaultText=ns.msgSearch;var noSearchTerm=ns.msgNoSearchTerm;var shortSearchTerm=ns.msgShortSearchTerm;if(searchTerms==defaultText){alert(noSearchTerm);return false;}
if(searchTerms==''){alert(noSearchTerm);return false;}else if(searchTerms.length<minKeywordLength){alert(shortSearchTerm);return false;}else{return true;}};ns.checkIfDefault=function(keyword){var defaultSearchTerm=ns.msgSearch;if(keyword==defaultSearchTerm){return'';}
else{return keyword;}};})(MarketLive.Nav.TopNav);
function preload(aImgSrc){for(var i=0;i<aImgSrc.length;i++){var newImg=new Image();newImg.src=aImgSrc[i];aImgSrc["img_"+i]=newImg;}}
function rollover(name,source){document.images[name].src=source;}
function cssRollOver(oElement){var sCSSClass=oElement.className;if(sCSSClass.indexOf("On")!=-1){oElement.className=sCSSClass.replace(/On/,"Off");}else if(sCSSClass.indexOf("Off")!=-1){oElement.className=sCSSClass.replace(/Off/,"On");}}
function getVariableValue(variableName){if(typeof(getOmnitureVariable)!="undefined"){return getOmnitureVariable(variableName);}};