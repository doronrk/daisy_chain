var allEvent={};
function EventLV(b,a){this.callback=b;
this.order=(a==undefined)?1:a
}function registerEvent(a,d,c){if(typeof(allEvent[a])=="undefined"){allEvent[a]=[]
}var b=new EventLV(d,c);
allEvent[a].push(b);
allEvent[a].sort(sortEventByOrder())
}function fireEvent(d,a){$(document).trigger(d,a);
if(typeof(allEvent[d])=="undefined"){return
}for(var b=0;
b<allEvent[d].length;
b++){try{if(allEvent[d][b]!=undefined&&allEvent[d][b]["callback"]!=undefined){allEvent[d][b]["callback"].call(window,a)
}}catch(c){logDebug("The Event generated an error: "+c.message)
}}}function sortEventByOrder(){return function(d,c){if(d.order>c.order){return 1
}else{if(d.order<c.order){return -1
}}return 0
}
}function BuildScroll(){this.zonescroll;
this.contener;
this.contenerheight;
this.iscroll;
this.iscroll;
this.init=function(a,b,c){this.zonescroll=a;
this.contener=b;
this.contenerheight=c;
if(this.contener.length==0){logDebug("No contener for BuildScroll !");
return
}if(this.contenerheight===undefined&&this.contener.get(0)){this.contenerheight=this.contener.get(0).getBoundingClientRect().height
}else{this.contenerheight=heightContener
}this.scrollzoneheight=this.zonescroll.get(0).getBoundingClientRect().height;
if(this.contenerheight<this.scrollzoneheight){this.iscroll=new iScroll(this.contener.get(0),{hScroll:false,hScrollbar:false,onBeforeScrollStart:function(d){var e=d.target;
while(e.nodeType!=1){e=e.parentNode
}if(e.tagName!="SELECT"&&e.tagName!="INPUT"&&e.tagName!="TEXTAREA"){d.preventDefault()
}}})
}}
}var xhrAutocompleteSearch;
findSuggestions=function(){var a=this;
returnSuggestions=function(d){var c=JSON.parse(d).values;
if(c[0]==""){c=new Array()
}a.suggestionsCache[a.currentInputFieldValue.toLowerCase()]=c;
if(c.length>0){a.showSuggestions(c)
}else{a.suggestionsDiv.style.display="none"
}};
var b=this.currentInputFieldValue.toLowerCase();
if(xhrAutocompleteSearch){xhrAutocompleteSearch.abort()
}xhrAutocompleteSearch=getAjax(false,"keywordCompletion.jsp",returnSuggestions,{keyword:a.currentInputFieldValue.toLowerCase()},null,callbackErrorAutocompleteSearch)
};
function callbackErrorAutocompleteSearch(){logError("erreur autocomplete")
}autocompletion=function(c,d,a,b){try{var g=document.getElementById(c);
if(g===null){return
}if(!document.autocompletion){document.autocompletion=new Array()
}document.autocompletion.push(g);
g.autocompletionId=document.autocompletion.length-1;
g.MAX_SUGGESTIONS=a;
g.findSuggestions=b;
g.suggestionsDiv=document.getElementById(d);
g.eventKeyCode=null;
g.currentInputFieldValue=strip_tags(g.value);
g.oldInputFieldValue=strip_tags(g.value);
g.suggestionsCache=new Array();
g.suggestionsCache[""]="";
g.selectedSuggestion=-1;
g.lastKeyCode=-1;
g.onkeydown=autocompletionKeyDownHandler;
g.onkeyup=autocompletionKeyUpHandler;
g.onblur=autocompletionBlurHandler;
g.showSuggestions=showSuggestions;
g.highlightNewValue=highlightNewValue;
g.rangeSize=rangeSize;
g.beforeRangeSize=beforeRangeSize;
g.autocompletionLoop=function(){logDebug("autocompletionLoop");
if(this.currentInputFieldValue!=this.oldInputFieldValue){var e=this.suggestionsCache[this.currentInputFieldValue];
if(e){if(e.length>0){this.showSuggestions(e)
}else{this.suggestionsDiv.style.display="none"
}}else{this.findSuggestions()
}}this.oldInputFieldValue=this.currentInputFieldValue
}
}catch(f){logError("autocompletion : "+f.message)
}};
function showSuggestions(a){var d="";
if(this.lastKeyCode!=8){this.selectedSuggestion=0
}else{this.selectedSuggestion=-1
}for(var e=0;
e<a.length;
e++){d+="<div"+((e==this.selectedSuggestion)?' class="selected"':"")+">"+a[e]+"</div>"
}this.suggestionsDiv.innerHTML=d;
for(var c=0;
c<a.length;
c++){this.suggestionsDiv.childNodes[c].autocompletionField=this;
this.suggestionsDiv.childNodes[c].index=c;
this.suggestionsDiv.childNodes[c].onmousedown=autocompletionSuggestionMouseDownHandler;
this.suggestionsDiv.childNodes[c].onmouseover=autocompletionSuggestionMouseOverHandler;
this.suggestionsDiv.childNodes[c].onmouseout=autocompletionSuggestionMouseOutHandler
}this.suggestionsDiv.style.display="block";
if((this.selectedSuggestion!=-1)&&(a[0].toLowerCase().indexOf(this.value.toLowerCase())==0)){var g=this.beforeRangeSize();
this.value=a[0];
if(this.createTextRange){var b=this.createTextRange();
b.moveStart("character",g);
b.select()
}else{if(this.setSelectionRange){this.setSelectionRange(g,this.value.length)
}}}}var autocompletionKeyDownHandler=function(a){if(!a&&window.event){a=window.event
}if(a){this.lastKeyCode=a.keyCode
}};
var autocompletionKeyUpHandler=function(c){if(!c&&window.event){c=window.event
}var d=c.keyCode;
switch(d){case 38:if(this.value!=""){this.highlightNewValue(this.selectedSuggestion-1)
}break;
case 40:if(this.value!=""){this.highlightNewValue(this.selectedSuggestion+1)
}break;
case 8:this.currentInputFieldValue=this.value;
var a=this.suggestionsDiv.childNodes;
for(var b=0;
b<a.length;
b++){a[b].className=""
}this.selectedSuggestion=-1;
this.findSuggestions();
break;
default:this.currentInputFieldValue=this.value.substr(0,this.beforeRangeSize());
this.findSuggestions();
break
}};
var autocompletionBlurHandler=function(){this.suggestionsDiv.style.display="none"
};
var autocompletionSuggestionMouseDownHandler=function(){this.autocompletionField.value=this.innerHTML;
$(this).parents("form").submit()
};
var autocompletionSuggestionMouseOverHandler=function(){if((this.autocompletionField.selectedSuggestion!=-1)&&(this.index!=this.autocompletionField.selectedSuggestion)){this.autocompletionField.suggestionsDiv.childNodes[this.autocompletionField.selectedSuggestion].className=""
}this.className="selected";
this.autocompletionField.selectedSuggestion=this.index
};
var autocompletionSuggestionMouseOutHandler=function(){this.className=""
};
function highlightNewValue(c){var a=this.suggestionsDiv.childNodes;
var b=a.length;
if(!a||(b<=0)||((b==1)&&(this.suggestionsDiv.innerHTML.indexOf("<")==-1))){return
}if(c>=b){c=b-1
}if((this.selectedSuggestion!=-1)&&(c!=this.selectedSuggestion)){a[this.selectedSuggestion].className=""
}if(c<0){this.value=this.oldInputFieldValue;
this.currentInputFieldValue=this.oldInputFieldValue;
this.selectedSuggestion=-1;
return
}this.selectedSuggestion=c;
a[c].className="selected";
this.currentInputFieldValue=this.oldInputFieldValue;
this.value=a[c].innerHTML;
if(this.createTextRange){var d=this.createTextRange();
d.moveStart("character",this.currentInputFieldValue.length);
d.select()
}else{if(this.setSelectionRange){this.setSelectionRange(this.currentInputFieldValue.length,this.value.length)
}}}function rangeSize(){var a=0;
if(this.createTextRange){a=document.selection.createRange().duplicate().text.length
}else{if(this.setSelectionRange){a=this.selectionEnd-this.selectionStart
}}return a
}function beforeRangeSize(){return this.value.length-this.rangeSize()
}function setSuggestionsDivSize(){var b=0,a=0;
var c=this;
while(c){b+=c.offsetLeft;
a+=c.offsetTop;
c=c.offsetParent
}this.suggestionsDiv.style.left=b+"px";
this.suggestionsDiv.style.top=(a+this.offsetHeight-1)+"px";
this.suggestionsDiv.style.width=this.offsetWidth-2+"px"
}function retry(c,f){var e=0,d=50,b=10,a=false;
var g=window.setInterval(function(){if(c()){window.clearInterval(g);
f(a)
}if(e++>d){window.clearInterval(g);
a=true;
f(a)
}},10)
}function isIE10OrLater(b){var c=b.toLowerCase();
if(c.indexOf("msie")===0&&c.indexOf("trident")===0){return false
}var a=/(?:msie|rv:)\s?([\d\.]+)/.exec(c);
if(a&&parseInt(a[1],10)>=10){return true
}return false
}function detectPrivateMode(g){var d;
try{if(window.webkitRequestFileSystem){window.webkitRequestFileSystem(window.TEMPORARY,1,function(){d=false
},function(h){console.log(h);
d=true
})
}else{if(window.indexedDB&&/Firefox/.test(window.navigator.userAgent)){var b;
try{b=window.indexedDB.open("test")
}catch(f){d=true
}if(typeof d==="undefined"){retry(function a(){return b.readyState==="done"?true:false
},function c(e){if(!e){d=b.result?false:true
}})
}}else{if(isIE10OrLater(window.navigator.userAgent)){d=false;
try{if(!window.indexedDB){d=true
}}catch(f){d=true
}}else{if(window.localStorage&&/Safari/.test(window.navigator.userAgent)){try{window.localStorage.setItem("test",1)
}catch(f){d=true
}if(typeof d==="undefined"){d=false;
window.localStorage.removeItem("test")
}}}}}}catch(f){d=true
}retry(function a(){return typeof d!=="undefined"?true:false
},function c(e){g(d)
})
}var curtainCountMap={Main:0};
var chainNextLink=null;
var formularChain={};
var errorCodes={};
var formChanged=false;
var chainHasError=false;
var chainStarted=false;
var paypalKey="";
var standardPaymentKey="";
var fiscalCodeMandatoryMinimalAmmount={};
function updateInformation(){var c=$("#title option:selected").text(),a=$("#firstName").val(),b=$("#lastName").val();
$(".userTitle").each(function(){$(this).html(c)
});
$(".firstName").each(function(){$(this).html(a)
});
$(".lastName").each(function(){$(this).html(b)
})
}function initForm(c,a,b){logDebug("initForm "+c.attr("id"));
if(c.hasClass("bindable")){c.click(function(){submitForm(c)
});
var e=c.attr("data-formId");
var d=$("#"+e);
d.find("input").keypress(function(f){if(f.keyCode==13){submitForm(c)
}});
if(b){d.find("select").change(function(){submitForm(c)
})
}c.removeClass("bindable")
}}function initAddressEditorForm(a){logError("deprecated method - use initForm instead")
}function selectAddress(c,a,b){logDebug("selectAddress : "+c+" , "+a+" , "+b);
showCurtain();
$("#"+b).val(a);
logDebug("selectAddress : targetId"+b);
var d=$("#currentAddressFormHolder").attr("data-isMultiShip")!=null;
logDebug("selectAddress : isMultiShip "+d);
getAjax(true,"address/address.jsp",function(f){var e=$("#"+b+"_display");
e.html(f);
hideCurtain();
$("#cancelEditAddress").click()
},{addressName:a,isSelected:true,isBilling:false,descriptionOnly:d});
updateSelector(c,a,b,d)
}function updateSelector(c,b,a,d){$("#selector_"+c).attr("data-params","select=true&index="+c+"&targetInput="+a+"&addressName="+b+"&isMultiShip="+d)
}function submitForm(submitButton){logDebug("submit form : "+submitButton.attr("id"));
if(submitButton.length<1){logError("This submitButton does not exist in page : "+submitButton.selector);
return
}var disabled=submitButton.hasClass("disabled");
if(!disabled){var formId=submitButton.attr("data-formId");
var form=$("#"+formId);
var target=submitButton.attr("data-target");
var action=form.attr("action");
var callback=submitButton.attr("data-callback");
var errorCallback=submitButton.attr("data-errorCallback");
var beforeCall=submitButton.attr("data-beforeCall");
var preValidation=submitButton.attr("data-preValidationFc");
var dataparams=submitButton.attr("data-params");
var params=null;
if(dataparams!=undefined){eval("params = "+dataparams)
}var append=submitButton.attr("data-append")!=null;
var secure=submitButton.attr("data-secure")!=null;
var curtain=submitButton.attr("data-curtain")!=null;
var fromIframe=submitButton.attr("data-fromIframe")!=null;
if(curtain){showCurtain()
}var errMsg=null;
if(preValidation!=undefined){var fn=window[preValidation];
if(typeof fn==="function"){errMsg=fn()
}}if(errMsg!=undefined&&errMsg!=null&&errMsg!=""){catchError(errMsg);
hideCurtain()
}else{hideError();
if(beforeCall!=undefined){eval(beforeCall)
}postAjax(form.serialize(),secure,formId,function(data,callbackSuccessParams){if(target!=undefined){if(fromIframe){$("#"+target,parent.document.body).html(data)
}else{if(append){$("#"+target).append(data)
}else{$("#"+target).html(data)
}}}if(callback!=undefined){eval(callback)
}if(curtain){hideCurtain()
}if(CONFIGURATION.pageType=="mylv"){updateInformation()
}},null,params,function(data,callbackErrorParams){if(errorCallback!=undefined){eval(errorCallback)
}$("<div class='techErr'></div>").attr("id","techErr").html(CONFIGURATION.TECHNICAL_ERROR_MSG).appendTo("body");
notifyError("#techErr");
if(curtain){hideCurtain()
}},null)
}}}function catchError(a){$("#selectSizeError").removeClass("hide")
}function hideError(){$("#selectSizeError").addClass("hide")
}function submitNextChainLink(){chainNextLink++;
var nextLinkCall=formularChain[chainNextLink];
if(nextLinkCall!=undefined){logDebug(nextLinkCall);
eval(nextLinkCall)
}}function startChain(a){logDebug("startChain");
if(!chainStarted){if(a){chainStarted=true
}chainHasError=false;
chainNextLink=0;
submitNextChainLink()
}}function resetChain(a){if(a){chainHasError=true;
setupValidateOnly(true)
}else{chainStarted=false;
chainNextLink=-1
}}function validateChain(){logDebug("chainHasError : "+chainHasError);
if(chainHasError){resetChain();
scrollToError();
bindAddressModals()
}else{submitNextChainLink()
}}function notifyFieldErrorById(a,c,b){notifyFieldError($("#"+a),c,b)
}function notifyFieldError(e,f,c){var a=e.attr("id");
var b=e.parents("form");
var d=b.find("#fl_"+a);
d.addClass("error");
d.find(".errorMsg").html(f+'<span class="errorCode hide">'+c+"</span>");
if(f==""&&c==""){d.removeClass("error")
}}function setupValidateOnly(a){logDebug("setupValidateOnly : "+a);
$(".validateOnly").val(a)
}function bindAddressSelector(){$(".pick").each(function(){bindPick($(this))
})
}function bindPick(a){if(a.hasClass("bindable")){a.click(function(){selectPick($(this))
});
a.removeClass("bindable")
}}function selectPick(c){if(!c.hasClass("selected")){$(".pick").each(function(){unselectPick($(this))
});
c.addClass("selected");
c.find($("input")).attr("checked",true);
var b=c.attr("id");
var a=c.attr("data-locale");
loadAddressForm({addressName:b,localStoreLang:a})
}}function unselectPick(a){a.removeClass("selected");
a.find($("input")).attr("checked",false)
}function bindAddressSelectorList(){logDebug("bindAddressSelectorList");
$(".addressSelectorList").each(function(){bindSingleAddressSelectorList($(this));
$(this).removeClass("addressSelectorList")
})
}function bindSingleAddressSelectorList(b){logDebug("bindSingleAddressSelectorList");
var a=b.attr("data-index");
logDebug("index = "+a);
b.change(function(){var c=$(this).find("option:selected").val();
logDebug("selector change : addName = "+c+" index = "+a);
previewShipping();
updateAddressSelectorDisplay(c,a,false,false,checkCompanyName)
})
}function checkCompanyName(c){if($("#existCompanyName").length!=0&&$("#billingAddressFormHolder").length!=0){var a=$("<div></div>");
a.html(c);
var b=a.find(".companyName");
if(b.html()!=""){$("#existCompanyName").val("true")
}else{$("#existCompanyName").val("false")
}}displayStar()
}function updateAddressSelectorDisplay(a,b,f,d,g,e){logDebug("updateAddressSelectorDisplay");
if(d){$(".addressSelectorDropbox").append("<option value="+a+"></option>");
$('.addressSelectorDropbox option[value="'+a+'"]').html(e);
$("#addressName_"+b+" option").removeAttr("selected");
$("#addressName_"+b+' option[value="'+a+'"]').attr("selected","selected")
}if(f){$('.addressSelectorDropbox option[value="'+a+'"]').html(e)
}showCurtain();
var c=$("#addressDisplay_"+b);
if(c!=undefined){getAjax(true,"address/address.jsp",function(h){logDebug("updateAddressSelectorDisplay - ajax callback");
c.html(h);
if(g){g(h)
}hideCurtain()
},{addressName:a,isSelected:true,isBilling:false,showDescription:false,descriptionOnly:false})
}else{if(g){g()
}}}function loadCurrentAddressForm(){var b=$(".pick.selected").attr("id");
var a=$(".pick.selected").attr("data-locale");
loadAddressForm({addressName:b,localStoreLang:a})
}function loadAddressForm(b,c){showCurtain();
var a=b.index;
getAjax(true,"address/updateAddressForm.jsp",function(d){$("#currentAddressFormHolder_"+a).html(d);
if(typeof(c)=="function"){c()
}hideCurtain()
},b)
}function loadCreateAddressForm(c,a){showCurtain();
deselectAddress();
var b=c.index;
getAjax(true,"address/createAddressForm.jsp",function(d){$("#currentAddressFormHolder_"+b).html(d);
hideCurtain();
if(typeof(a)=="function"){a()
}},c)
}function updateAddressPick(a,c,b){showCurtain();
getAjax(true,"address/addressPick.jsp",function(e){var d=$("#"+a+"_holder");
d.html(e);
bindPick(d.find(".pick.bindable"));
hideCurtain()
},{addressName:a,isSelected:b,isBilling:c})
}function updateAddressDisplay(a,b){showCurtain();
getAjax(true,"address/address.jsp",function(d){var c=$("#"+a+"_display").find(".adresseContainer");
c.html($($.trim(d)).html());
hideCurtain()
},{addressName:a,isSelected:true,isBilling:b})
}function createAddressPick(a,b){showCurtain();
getAjax(true,"address/addressPick.jsp",function(d){var c=$("<div id='"+a+"'_holder'/>");
c.html(d);
$("#billingAddressPickSeparator").after(c);
bindPick(c.find(".pick.bindable"));
hideCurtain()
},{addressName:a,isSelected:true,isBilling:b})
}function createAddressDisplay(a,b){showCurtain();
getAjax(true,"address/address.jsp",function(d){var c=$("<div id='"+a+"_display'/>").addClass("address");
c.html(d);
$("#billingAddressDisplaySeparator").after(c);
hideCurtain()
},{addressName:a,isSelected:true,isBilling:b})
}function deleteAddressPick(a){$("#"+a+"_holder").remove()
}function deleteAddressDisplay(a){$("#"+a+"_display").remove()
}function showOtherPhone(a){$(a).closest("form").find(".toggleThirdPhone").removeClass("hide");
$(a).closest("form").find(".toggleOtherPhone").hide().parents(".form-line").hide();
$(a).closest("form").find(".otherPhoneHolder").removeClass("hide")
}function showThirdPhone(a){$(a).closest("form").find(".toggleThirdPhone").hide().parents(".form-line").hide();
$(a).closest("form").find(".thirdPhoneHolder").removeClass("hide")
}function bindCompleteAddress_old(b){logDebug("in bindCompleteAddress");
var a;
if($("#postalCode").hasClass("completeAddress")){$("#postalCode").change(function(){completeAddress($(this),b)
});
$("#postalCode").removeClass("completeAddress")
}}function bindCompleteAddress(b){logDebug("in bindCompleteAddress");
var a;
$(".completeAddress").each(function(){var c=$(this);
c.change(function(){completeAddress($(this),b)
})
});
$(".completeAddress").removeClass("completeAddress")
}function deleteCreditCardPick(a){$("#"+a+"_holder").remove();
checkCBSelected()
}function checkCBSelected(){if(!$(".creditCard.selected").length){$(".creditCard").first().click()
}if($(".creditCard.selected").hasClass("create")){$("#creditCardForm .credit-card-form-actions").hide()
}}function completeAddress(a,e){logDebug("completeAddress : "+a+" callback: "+e);
showCurtain();
var b=a.parents("form");
var c=a.val();
var d=b.find("#country").val();
getAjax(false,"completeAddress.jsp",function(p){var m=$.parseJSON(p);
var o=m.city;
if(o!=undefined&&o!=""){b.find("#city").val(o)
}var h=m.state;
if(h!=undefined&&h!=""){b.find("#state").val(h)
}logDebug("country = "+d);
var f=m.postalCode;
if(f!=undefined&&f!=""){b.find("#postalCode").val(f)
}var l=m.address1;
if(l!=undefined&&l!=""){b.find("#address1").val(l);
b.find("#street").val(l)
}var k=m.address2;
if(k!=undefined&&k!=""){b.find("#address2").val(k)
}var g=m.address3;
if(g!=undefined&&g!=""){b.find("#address3").val(g)
}var q=m.errMsg;
var n=m.errCode;
if(q!=undefined&&q!=""){notifyFieldError(a,q,n)
}else{notifyFieldError(a,"","")
}if(e!=undefined){e(a)
}hideCurtain()
},{postalCode:c,otherCountry:d},null,function(f){$("<div class='techErr'></div>").attr("id","techErr").html(CONFIGURATION.TECHNICAL_ERROR_MSG).appendTo("body");
notifyError($("#techErr"));
hideCurtain()
})
}function checkSessionTimeout(a,b){showCurtain();
if(a){getAjax(true,"userprofiling/isLoggedIn.jsp",function(e){var d=$.parseJSON(e);
var f=d.isLoggedIn;
if(!f){resetChain();
var c=htmlDecode(d.redirectionPopin);
$("#tempErrorContainer").html(c)
}else{submitNextChainLink()
}hideCurtain()
},null)
}else{submitNextChainLink();
hideCurtain()
}}function checkStepsProgression(a){showCurtain();
getAjax(true,"commerce/salessteps/checkSalesStepsProgressionJson.jsp",function(d){var c=$.parseJSON(d);
var b=c.error;
var e=htmlDecode(c.url);
if(b!=undefined&&b){resetChain();
window.location=e
}else{submitNextChainLink()
}hideCurtain()
},{pageType:a})
}function saveGiftMessageInLocalStorage(a,b){$.jStorage.set("giftMessage"+a,b)
}function saveGiftMessage(a){callGiftMsgValidator(a,function(d){var c=$.parseJSON(d);
var b=c.error;
if(b!=undefined){$("#gift-msg-error-"+a).html(b)
}else{saveGiftMessageInLocalStorage(a,c.lines[0]);
$("#giftCardButton_"+a).attr("data-params","index="+a+"&mode=edit");
$("#giftCard_"+a).val(true);
$("#gift-message-container-"+a).slideToggle("ease",function(){$("#gift-card-preview-"+a).removeClass("preview-gift-not-hidden");
$("#gift-message-editor-"+a).removeClass("edit-gift-hidden");
$("#commerceItemShippingRelation_"+a).toggleClass("gift-message-on-mode");
addDisplayTableMultiShip()
});
$("#gift-msg-error-"+a).html("")
}})
}function deleteGiftMessageFromLocalStorage(a){if($.jStorage.get("giftMessage"+a)!=""){$.jStorage.deleteKey("giftMessage"+a)
}}function deleteGiftMessage(b,a){$("#giftCardButton_"+b).attr("data-params","index="+b+"&mode=create");
$("#giftCardMessage_"+b).val("");
$("#giftCard_"+b).val(false);
$("#giftCard_"+b).attr("checked",false);
$("#giftCardButton_"+b).addClass("hide");
$("#gift-msg-error-"+b).html("");
if(a==undefined){$("#gift-message-container-"+b).slideToggle("ease",function(){$("#commerceItemShippingRelation_"+b).toggleClass("gift-message-on-mode")
})
}deleteGiftMessageFromLocalStorage(b)
}function previewGiftMessage(a){callGiftMsgValidator(a,function(h){var g=$.parseJSON(h);
var d=g.error;
var b=g.lines;
var c=$("#gift-message-container-"+a);
if(d!=undefined){$("#gift-msg-error-"+a).html(d)
}else{if(b!=undefined){var f=[];
for(var e=0;
e<b.length;
e++){f.push("<span>"+b[e]+"</span>")
}$("#gift-card-text-preview-"+a).html(f.join("</br>"));
c.slideToggle("ease",function(){$("#gift-card-preview-"+a).addClass("preview-gift-not-hidden");
$("#gift-message-editor-"+a).addClass("edit-gift-hidden");
c.slideToggle("ease")
});
$("#gift-msg-error-"+a).html("")
}}$(document).scrollTop($(document).scrollTop())
})
}function callGiftMsgValidator(a,c){var b=encodeURI($("#giftCardMessage_"+a).val());
getAjax(true,"commerce/giftMessagePreview.jsp",c,{text:b})
}function editGiftMessage(b){var a=$("#gift-message-container-"+b);
a.slideToggle("ease",function(){$("#gift-card-preview-"+b).removeClass("preview-gift-not-hidden");
$("#gift-message-editor-"+b).removeClass("edit-gift-hidden");
a.slideToggle("ease")
})
}function loadGiftMessageInEditor(a){loadGiftMessageFromLocalStorage(a)
}function bindGiftMessages(){$(".giftCardCheckbox.bindable").each(function(){bindGiftMessage($(this));
$(this).removeClass("bindable")
})
}function loadGiftMessageFromLocalStorage(a){var b=$.jStorage.get("giftMessage"+a);
if(b!=""){$(".giftCardMessageTA").html(b)
}}function bindGiftMessage(a){var d=a.attr("data-index");
var c="giftCardButton_"+d;
var b=$("#gift-message-container-"+d);
var e=0;
if($("#giftMessage").length!=0){e=$("#giftMessage").offset().top
}$("#"+c).click(function(){if(!$("#gift-message-container-"+d).is(":visible")){removeDisplayTableMultiShip();
if($("#gift-message-editor-"+d).hasClass("edit-gift-hidden")){$("#gift-message-editor-"+d).removeClass("edit-gift-hidden");
$("#gift-card-preview-"+d).removeClass("preview-gift-not-hidden")
}}if($(".gift-message-container").not("#gift-message-container-"+d).is(":visible")){$(".gift-message-container:visible").not("#gift-message-container-"+d).slideToggle("ease")
}if($(".address-edit-mode").is(":visible")){var g=$(".address-edit-mode:visible").find(".cancelEditAddress").attr("data-index");
var f=$(".address-edit-mode:visible").find(".cancelEditAddress").attr("data-holderid");
addressEditorSlideCancel(g,f)
}if(RESPONSIVE_MANAGER.isAllSmallMode()||RESPONSIVE_MANAGER.isMediumMode()){var h=$(".gift-message-on-mode").not("#commerceItemShippingRelation_"+d);
h.find(".shippingAddress").slideToggle("ease",function(){h.removeClass("gift-message-on-mode");
h.find(".shippingAddress").css("display","")
});
$("#commerceItemShippingRelation_"+d+" .shippingAddress").slideToggle("ease",function(){$("#commerceItemShippingRelation_"+d).toggleClass("gift-message-on-mode");
$("#commerceItemShippingRelation_"+d+" .shippingAddress").css("display","")
})
}b.slideToggle("ease",function(){if(RESPONSIVE_MANAGER.isLargeMode()){$("#commerceItemShippingRelation_"+d).toggleClass("gift-message-on-mode")
}})
});
$("#giftCardExample").click(function(){if(a.find("input:checkbox").is(":checked")){b.slideToggle()
}else{a.find("input:checkbox").click()
}});
a.find("input:checkbox").click(function(){if($(this).is(":checked")){$("#"+c).removeClass("hide");
setSizeTdTableMultiShip();
removeDisplayTableMultiShip();
if($(".gift-message-container").is(":visible")){$(".gift-message-container:visible").not("#gift-message-container-"+d).slideToggle("ease")
}if($(".address-edit-mode").is(":visible")){var g=$(".address-edit-mode:visible").find(".cancelEditAddress").attr("data-index");
var f=$(".address-edit-mode:visible").find(".cancelEditAddress").attr("data-holderid");
addressEditorSlideCancel(g,f)
}if(RESPONSIVE_MANAGER.isAllSmallMode()||RESPONSIVE_MANAGER.isMediumMode()){var h=$(".gift-message-on-mode").not("#commerceItemShippingRelation_"+d);
h.find(".shippingAddress").slideToggle("ease",function(){h.removeClass("gift-message-on-mode");
h.find(".shippingAddress").css("display","")
});
$("#commerceItemShippingRelation_"+d+" .shippingAddress").slideToggle("ease",function(){$("#commerceItemShippingRelation_"+d).addClass("gift-message-on-mode");
$("#commerceItemShippingRelation_"+d+" .shippingAddress").css("display","")
})
}b.slideToggle("ease",function(){if(RESPONSIVE_MANAGER.isLargeMode()){$("#commerceItemShippingRelation_"+d).toggleClass("gift-message-on-mode")
}});
if(RESPONSIVE_MANAGER.isAllSmallMode()&&$("#giftMessage").length!=0){$("html, body").animate({scrollTop:e},900)
}}else{deleteGiftMessage(d,"noClose");
if($("#gift-message-container-"+d).is(":visible")){if(RESPONSIVE_MANAGER.isAllSmallMode()||RESPONSIVE_MANAGER.isMediumMode()){$("#commerceItemShippingRelation_"+d+" .shippingAddress").slideToggle("ease",function(){$("#commerceItemShippingRelation_"+d).removeClass("gift-message-on-mode");
$("#commerceItemShippingRelation_"+d+" .shippingAddress").css("display","")
})
}b.slideToggle("ease",function(){addDisplayTableMultiShip();
$("#gift-card-preview-"+d).removeClass("preview-gift-not-hidden");
$("#gift-message-editor-"+d).removeClass("edit-gift-hidden");
$("#commerceItemShippingRelation_"+d).removeClass("gift-message-on-mode")
})
}}})
}function beforeCloseGiftMessagePopin(a){var b=$("#giftCardEditor").attr("data-mode");
logDebug("le mode est "+b);
if(b=="create"){deleteGiftMessage(a,"noClose");
logDebug("message deleted")
}else{logDebug("message saved")
}}function bindDeliveryMethodSelect(b,a){$(".shippingMethodSelect").each(function(){if($(this).hasClass("bindable")){bindSingleDeliveryMethodSelect($(this),b,a);
$(this).removeClass("bindable");
bindShareCartByMail()
}});
$(".shippingMethodRadio").each(function(){if($(this).hasClass("bindable")){bindSingleDeliveryMethodRadio($(this),b);
$(this).removeClass("bindable")
}})
}function bindSingleDeliveryMethodSelect(a,c,b){a.change(function(){var f=$(this).find("option:selected").attr("data-description");
var e=$(this).attr("data-target");
var d=$(this).attr("data-stdValue");
if(!b){if($(this).val()==d){$(".shippingConstraintsStandard").removeClass("hide");
$(".shippingConstraintsOther").addClass("hide")
}else{$(".shippingConstraintsStandard").addClass("hide");
$(".shippingConstraintsOther").removeClass("hide")
}}$("#"+e).html(f);
previewShipping(c)
});
a.each(function(){var e=$(this).find("option:selected").attr("data-description");
var d=$(this).attr("data-target");
$("#"+d).html(e)
})
}function bindSingleDeliveryMethodRadio(a,b){a.change(function(){previewShipping(b)
});
if(a.hasClass("standard")){logDebug(a);
a.click(function(){$(".shippingConstraintsStandard").removeClass("hide");
$(".shippingConstraintsOther").addClass("hide")
})
}if(a.hasClass("other")){logDebug(a);
a.click(function(){$(".shippingConstraintsStandard").addClass("hide");
$(".shippingConstraintsOther").removeClass("hide")
})
}}function callbackBeforeInput(){return true
}accentsTidy=function(d){var c=d.toLowerCase();
c=c.replace(new RegExp(/[àáâãäå]/g),"a");
c=c.replace(new RegExp(/æ/g),"ae");
c=c.replace(new RegExp(/ç/g),"c");
c=c.replace(new RegExp(/[èéêë]/g),"e");
c=c.replace(new RegExp(/[ìíîï]/g),"i");
c=c.replace(new RegExp(/ñ/g),"n");
c=c.replace(new RegExp(/[òóôõö]/g),"o");
c=c.replace(new RegExp(/œ/g),"oe");
c=c.replace(new RegExp(/[ùúûü]/g),"u");
c=c.replace(new RegExp(/[ýÿ]/g),"y");
return c
};
function deselectAddress(){$(".pick").each(function(){$(this).removeClass("selected")
})
}var googleMapAPILoadedEvent=false;
var getCurrentLocationEvent=false;
var currentGeoPosition;
function setAddressFromCurrentLocation(){if(!googleMapAPILoadedEvent){loadGoogleMaps()
}if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(a){currentGeoPosition=a;
getCurrentLocationEvent=true;
if(googleMapAPILoadedEvent){decodeLocationToSetAddress()
}},function(){alert("Couldn't get your position.")
})
}}function loadGoogleMaps(){var a=document.createElement("script");
a.setAttribute("type","text/javascript");
a.setAttribute("src","http://maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback");
(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(a)
}function gMapsCallback(){googleMapAPILoadedEvent=true;
if(getCurrentLocationEvent){decodeLocationToSetAddress()
}}function decodeLocationToSetAddress(){var a=new google.maps.LatLng(currentGeoPosition.coords.latitude,currentGeoPosition.coords.longitude);
var b=new google.maps.Geocoder();
b.geocode({latLng:a},function(g,c){if(c==google.maps.GeocoderStatus.OK){var l=g[0];
if(l){var e=l.address_components;
var d="";
var h="";
for(var f=0;
f<e.length;
f++){var k=e[f]["types"];
if($.inArray("route",k)!=-1){d=e[f]["long_name"]
}else{if($.inArray("street_number",k)!=-1){h=e[f]["long_name"]
}else{if($.inArray("postal_code",k)!=-1){$("#postalCode").val(e[f]["long_name"])
}else{if($.inArray("locality",k)!=-1){$("#city").val(e[f]["long_name"])
}}}}}$("#address1").val(h+", "+d)
}}})
}$.fn.serializeObject=function(){var c={};
var b=this.serializeArray();
$.each(b,function(){if(c[this.name]!==undefined){if(!c[this.name].push){c[this.name]=[c[this.name]]
}c[this.name].push(this.value||"")
}else{c[this.name]=this.value||""
}});
return c
};
function updateAddressBookDisplay(a,h,f,g,c,e){logDebug("updateAddressBookDisplay");
showCurtain();
var b=(f!=undefined)&&f;
if(h){$(".delete-address-button").removeClass("hide");
$(".isMainAddress").remove()
}var d=a;
if(e!=null&&e!=undefined){d+=":"+e
}getAjax(true,"address/address.jsp",function(l){logDebug("updateAddressBookDisplay - ajax callback");
if(f){$(".addressSelectorDropbox").append("<option value="+d+"></option>");
$('.addressSelectorDropbox option[value="'+d+'"]').html(c);
$("#addressName_mylv option").removeAttr("selected");
$('#addressName_mylv option[value="'+d+'"]').attr("selected","selected");
$("#billingAddressDisplaySeparator").after(l);
$("#noAddressYet").hide();
bindAddressModals();
initEditAddressButtons()
}else{var k=$("#"+a+"_display .adresseContainer");
k.html(l);
if(h){$("#"+a+"_display .delete-address-button ").addClass("hide")
}$('.addressSelectorDropbox option[value="'+d+'"]').html(c)
}if(g){g()
}hideCurtain();
$("#cancelEditAddress").click()
},{addressName:a,isSelected:true,isBilling:h,showDescription:true,descriptionOnly:false,fullWrapper:f})
}
/*
 * iScroll v4.1.9 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(){var u=Math,e=function(m){return m>>0
},y=(/webkit/i).test(navigator.appVersion)?"webkit":(/firefox/i).test(navigator.userAgent)?"Moz":(/trident/i).test(navigator.userAgent)?"ms":"opera" in window?"O":"",z=(/android/gi).test(navigator.appVersion),l=(/iphone|ipad/gi).test(navigator.appVersion),d=(/playbook/gi).test(navigator.appVersion),q=(/hp-tablet/gi).test(navigator.appVersion),o="WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix(),x="ontouchstart" in window&&!q,g=y+"Transform" in document.documentElement.style,h=l||d,r=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(m){return setTimeout(m,1)
}
})(),p=(function(){return window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout
})(),k="onorientationchange" in window?"orientationchange":"resize",c=x?"touchstart":"mousedown",s=x?"touchmove":"mousemove",f=x?"touchend":"mouseup",w=x?"touchcancel":"mouseup",t=y=="Moz"?"DOMMouseScroll":"mousewheel",b="translate"+(o?"3d(":"("),n=o?",0)":")",v=function(B,m){var C=this,D=document,A;
C.wrapper=typeof B=="object"?B:D.getElementById(B);
C.scroller=C.wrapper.children[0];
C.options={hScroll:true,vScroll:true,x:0,y:0,bounce:true,bounceLock:false,momentum:true,lockDirection:true,useTransform:true,useTransition:false,topOffset:0,checkDOMChanges:false,hScrollbar:true,vScrollbar:true,fixedScrollbar:z,hideScrollbar:true,fadeScrollbar:true,scrollbarClass:"",zoom:false,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:false,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(E){E.preventDefault()
},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onScrollCurrentMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};
for(A in m){C.options[A]=m[A]
}C.x=C.options.x;
C.y=C.options.y;
C.options.useTransform=g?C.options.useTransform:false;
C.options.hScrollbar=C.options.hScroll&&C.options.hScrollbar;
C.options.vScrollbar=C.options.vScroll&&C.options.vScrollbar;
C.options.zoom=C.options.useTransform&&C.options.zoom;
C.options.useTransition=h&&C.options.useTransition;
if(C.options.zoom&&z){b="translate(";
n=")"
}C.scroller.style[y+"TransitionProperty"]=C.options.useTransform?"-"+y.toLowerCase()+"-transform":"top left";
C.scroller.style[y+"TransitionDuration"]="0";
C.scroller.style[y+"TransformOrigin"]="0 0";
if(C.options.useTransition){C.scroller.style[y+"TransitionTimingFunction"]="cubic-bezier(0.33,0.66,0.66,1)"
}if(C.options.useTransform){C.scroller.style[y+"Transform"]=b+C.x+"px,"+C.y+"px"+n
}else{C.scroller.style.cssText+=";position:relative;top:"+C.y+"px;left:"+C.x+"px"
}if(C.options.useTransition){C.options.fixedScrollbar=true
}C.refresh();
C._bind(k,window);
C._bind(c);
if(!x){C._bind("mouseout",C.wrapper);
if(C.options.wheelAction!="none"){C._bind(t)
}}if(C.options.checkDOMChanges){C.checkDOMTime=setInterval(function(){C._checkDOMChanges()
},500)
}};
v.prototype={enabled:true,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(A){var m=this;
switch(A.type){case c:if(!x&&A.button!==0){return
}m._start(A);
break;
case s:m._move(A);
break;
case f:case w:m._end(A);
break;
case k:m._resize();
break;
case t:m._wheel(A);
break;
case"mouseout":m._mouseout(A);
break;
case"webkitTransitionEnd":m._transitionEnd(A);
break
}},_checkDOMChanges:function(){if(this.moved||this.zoomed||this.animating||(this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale)){return
}this.refresh()
},_scrollbar:function(m){var B=this,C=document,A;
if(!B[m+"Scrollbar"]){if(B[m+"ScrollbarWrapper"]){if(g){B[m+"ScrollbarIndicator"].style[y+"Transform"]=""
}B[m+"ScrollbarWrapper"].parentNode.removeChild(B[m+"ScrollbarWrapper"]);
B[m+"ScrollbarWrapper"]=null;
B[m+"ScrollbarIndicator"]=null
}return
}if(!B[m+"ScrollbarWrapper"]){A=C.createElement("div");
if(B.options.scrollbarClass){A.className=B.options.scrollbarClass+m.toUpperCase()
}else{A.style.cssText="position:absolute;z-index:100;"+(m=="h"?"height:7px;bottom:1px;left:2px;right:"+(B.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(B.hScrollbar?"7":"2")+"px;top:2px;right:1px")
}A.style.cssText+=";pointer-events:none;-"+y+"-transition-property:opacity;-"+y+"-transition-duration:"+(B.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(B.options.hideScrollbar?"0":"1");
B.wrapper.appendChild(A);
B[m+"ScrollbarWrapper"]=A;
A=C.createElement("div");
if(!B.options.scrollbarClass){A.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-"+y+"-background-clip:padding-box;-"+y+"-box-sizing:border-box;"+(m=="h"?"height:100%":"width:100%")+";-"+y+"-border-radius:3px;border-radius:3px"
}A.style.cssText+=";pointer-events:none;-"+y+"-transition-property:-"+y+"-transform;-"+y+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-"+y+"-transition-duration:0;-"+y+"-transform:"+b+"0,0"+n;
if(B.options.useTransition){A.style.cssText+=";-"+y+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"
}B[m+"ScrollbarWrapper"].appendChild(A);
B[m+"ScrollbarIndicator"]=A
}if(m=="h"){B.hScrollbarSize=B.hScrollbarWrapper.clientWidth;
B.hScrollbarIndicatorSize=u.max(e(B.hScrollbarSize*B.hScrollbarSize/B.scrollerW),8);
B.hScrollbarIndicator.style.width=B.hScrollbarIndicatorSize+"px";
B.hScrollbarMaxScroll=B.hScrollbarSize-B.hScrollbarIndicatorSize;
B.hScrollbarProp=B.hScrollbarMaxScroll/B.maxScrollX
}else{B.vScrollbarSize=B.vScrollbarWrapper.clientHeight;
B.vScrollbarIndicatorSize=u.max(e(B.vScrollbarSize*B.vScrollbarSize/B.scrollerH),8);
B.vScrollbarIndicator.style.height=B.vScrollbarIndicatorSize+"px";
B.vScrollbarMaxScroll=B.vScrollbarSize-B.vScrollbarIndicatorSize;
B.vScrollbarProp=B.vScrollbarMaxScroll/B.maxScrollY
}B._scrollbarPos(m,true)
},_resize:function(){var m=this;
setTimeout(function(){m.refresh()
},z?200:0)
},_pos:function(m,A){m=this.hScroll?m:0;
A=this.vScroll?A:0;
if(this.options.useTransform){this.scroller.style[y+"Transform"]=b+m+"px,"+A+"px"+n+" scale("+this.scale+")"
}else{m=e(m);
A=e(A);
this.scroller.style.left=m+"px";
this.scroller.style.top=A+"px"
}this.x=m;
this.y=A;
this._scrollbarPos("h");
this._scrollbarPos("v");
if(this.options.onScrollCurrentMove){this.options.onScrollCurrentMove.call(this)
}},_scrollbarPos:function(m,C){var B=this,D=m=="h"?B.x:B.y,A;
if(!B[m+"Scrollbar"]){return
}D=B[m+"ScrollbarProp"]*D;
if(D<0){if(!B.options.fixedScrollbar){A=B[m+"ScrollbarIndicatorSize"]+e(D*3);
if(A<8){A=8
}B[m+"ScrollbarIndicator"].style[m=="h"?"width":"height"]=A+"px"
}D=0
}else{if(D>B[m+"ScrollbarMaxScroll"]){if(!B.options.fixedScrollbar){A=B[m+"ScrollbarIndicatorSize"]-e((D-B[m+"ScrollbarMaxScroll"])*3);
if(A<8){A=8
}B[m+"ScrollbarIndicator"].style[m=="h"?"width":"height"]=A+"px";
D=B[m+"ScrollbarMaxScroll"]+(B[m+"ScrollbarIndicatorSize"]-A)
}else{D=B[m+"ScrollbarMaxScroll"]
}}}B[m+"ScrollbarWrapper"].style[y+"TransitionDelay"]="0";
B[m+"ScrollbarWrapper"].style.opacity=C&&B.options.hideScrollbar?"0":"1";
B[m+"ScrollbarIndicator"].style[y+"Transform"]=b+(m=="h"?D+"px,0":"0,"+D+"px")+n
},_start:function(F){var E=this,A=x?F.touches[0]:F,B,m,G,D,C;
if(!E.enabled){return
}if(E.options.onBeforeScrollStart){E.options.onBeforeScrollStart.call(E,F)
}if(E.options.useTransition||E.options.zoom){E._transitionTime(0)
}E.moved=false;
E.animating=false;
E.zoomed=false;
E.distX=0;
E.distY=0;
E.absDistX=0;
E.absDistY=0;
E.dirX=0;
E.dirY=0;
if(E.options.zoom&&x&&F.touches.length>1){D=u.abs(F.touches[0].pageX-F.touches[1].pageX);
C=u.abs(F.touches[0].pageY-F.touches[1].pageY);
E.touchesDistStart=u.sqrt(D*D+C*C);
E.originX=u.abs(F.touches[0].pageX+F.touches[1].pageX-E.wrapperOffsetLeft*2)/2-E.x;
E.originY=u.abs(F.touches[0].pageY+F.touches[1].pageY-E.wrapperOffsetTop*2)/2-E.y;
if(E.options.onZoomStart){E.options.onZoomStart.call(E,F)
}}if(E.options.momentum){if(E.options.useTransform){B=getComputedStyle(E.scroller,null)[y+"Transform"].replace(/[^0-9-.,]/g,"").split(",");
m=B[4]*1;
G=B[5]*1
}else{m=getComputedStyle(E.scroller,null).left.replace(/[^0-9-]/g,"")*1;
G=getComputedStyle(E.scroller,null).top.replace(/[^0-9-]/g,"")*1
}if(m!=E.x||G!=E.y){if(E.options.useTransition){E._unbind("webkitTransitionEnd")
}else{p(E.aniTime)
}E.steps=[];
E._pos(m,G)
}}E.absStartX=E.x;
E.absStartY=E.y;
E.startX=E.x;
E.startY=E.y;
E.pointX=A.pageX;
E.pointY=A.pageY;
E.startTime=F.timeStamp||Date.now();
if(E.options.onScrollStart){E.options.onScrollStart.call(E,F)
}E._bind(s);
E._bind(f);
E._bind(w)
},_move:function(H){var F=this,I=x?H.touches[0]:H,D=I.pageX-F.pointX,B=I.pageY-F.pointY,m=F.x+D,J=F.y+B,E,C,A,G=H.timeStamp||Date.now();
if(F.options.onBeforeScrollMove){F.options.onBeforeScrollMove.call(F,H)
}if(F.options.zoom&&x&&H.touches.length>1){E=u.abs(H.touches[0].pageX-H.touches[1].pageX);
C=u.abs(H.touches[0].pageY-H.touches[1].pageY);
F.touchesDist=u.sqrt(E*E+C*C);
F.zoomed=true;
A=1/F.touchesDistStart*F.touchesDist*this.scale;
if(A<F.options.zoomMin){A=0.5*F.options.zoomMin*Math.pow(2,A/F.options.zoomMin)
}else{if(A>F.options.zoomMax){A=2*F.options.zoomMax*Math.pow(0.5,F.options.zoomMax/A)
}}F.lastScale=A/this.scale;
m=this.originX-this.originX*F.lastScale+this.x,J=this.originY-this.originY*F.lastScale+this.y;
this.scroller.style[y+"Transform"]=b+m+"px,"+J+"px"+n+" scale("+A+")";
if(F.options.onZoom){F.options.onZoom.call(F,H)
}return
}F.pointX=I.pageX;
F.pointY=I.pageY;
if(m>0||m<F.maxScrollX){m=F.options.bounce?F.x+(D/2):m>=0||F.maxScrollX>=0?0:F.maxScrollX
}if(J>F.minScrollY||J<F.maxScrollY){J=F.options.bounce?F.y+(B/2):J>=F.minScrollY||F.maxScrollY>=0?F.minScrollY:F.maxScrollY
}F.distX+=D;
F.distY+=B;
F.absDistX=u.abs(F.distX);
F.absDistY=u.abs(F.distY);
if(F.absDistX<6&&F.absDistY<6){return
}if(F.options.lockDirection){if(F.absDistX>F.absDistY+5){J=F.y;
B=0
}else{if(F.absDistY>F.absDistX+5){m=F.x;
D=0
}}}F.moved=true;
F._pos(m,J);
F.dirX=D>0?-1:D<0?1:0;
F.dirY=B>0?-1:B<0?1:0;
if(G-F.startTime>300){F.startTime=G;
F.startX=F.x;
F.startY=F.y
}if(F.options.onScrollMove){F.options.onScrollMove.call(F,H)
}},_end:function(H){if(x&&H.touches.length!=0){return
}var F=this,N=x?H.changedTouches[0]:H,I,M,B={dist:0,time:0},m={dist:0,time:0},E=(H.timeStamp||Date.now())-F.startTime,J=F.x,G=F.y,L,K,A,D,C;
F._unbind(s);
F._unbind(f);
F._unbind(w);
if(F.options.onBeforeScrollEnd){F.options.onBeforeScrollEnd.call(F,H)
}if(F.zoomed){C=F.scale*F.lastScale;
C=Math.max(F.options.zoomMin,C);
C=Math.min(F.options.zoomMax,C);
F.lastScale=C/F.scale;
F.scale=C;
F.x=F.originX-F.originX*F.lastScale+F.x;
F.y=F.originY-F.originY*F.lastScale+F.y;
F.scroller.style[y+"TransitionDuration"]="200ms";
F.scroller.style[y+"Transform"]=b+F.x+"px,"+F.y+"px"+n+" scale("+F.scale+")";
F.zoomed=false;
F.refresh();
if(F.options.onZoomEnd){F.options.onZoomEnd.call(F,H)
}return
}if(!F.moved){if(x){if(F.doubleTapTimer&&F.options.zoom){clearTimeout(F.doubleTapTimer);
F.doubleTapTimer=null;
if(F.options.onZoomStart){F.options.onZoomStart.call(F,H)
}F.zoom(F.pointX,F.pointY,F.scale==1?F.options.doubleTapZoom:1);
if(F.options.onZoomEnd){setTimeout(function(){F.options.onZoomEnd.call(F,H)
},200)
}}else{F.doubleTapTimer=setTimeout(function(){F.doubleTapTimer=null;
I=N.target;
while(I.nodeType!=1){I=I.parentNode
}if(I.tagName!="SELECT"&&I.tagName!="INPUT"&&I.tagName!="TEXTAREA"){M=document.createEvent("MouseEvents");
M.initMouseEvent("click",true,true,H.view,1,N.screenX,N.screenY,N.clientX,N.clientY,H.ctrlKey,H.altKey,H.shiftKey,H.metaKey,0,null);
M._fake=true;
I.dispatchEvent(M)
}},F.options.zoom?250:0)
}}F._resetPos(200);
if(F.options.onTouchEnd){F.options.onTouchEnd.call(F,H)
}return
}if(E<300&&F.options.momentum){B=J?F._momentum(J-F.startX,E,-F.x,F.scrollerW-F.wrapperW+F.x,F.options.bounce?F.wrapperW:0):B;
m=G?F._momentum(G-F.startY,E,-F.y,(F.maxScrollY<0?F.scrollerH-F.wrapperH+F.y-F.minScrollY:0),F.options.bounce?F.wrapperH:0):m;
J=F.x+B.dist;
G=F.y+m.dist;
if((F.x>0&&J>0)||(F.x<F.maxScrollX&&J<F.maxScrollX)){B={dist:0,time:0}
}if((F.y>F.minScrollY&&G>F.minScrollY)||(F.y<F.maxScrollY&&G<F.maxScrollY)){m={dist:0,time:0}
}}if(B.dist||m.dist){A=u.max(u.max(B.time,m.time),10);
if(F.options.snap){L=J-F.absStartX;
K=G-F.absStartY;
if(u.abs(L)<F.options.snapThreshold&&u.abs(K)<F.options.snapThreshold){F.scrollTo(F.absStartX,F.absStartY,200)
}else{D=F._snap(J,G);
J=D.x;
G=D.y;
A=u.max(D.time,A)
}}F.scrollTo(e(J),e(G),A);
if(F.options.onTouchEnd){F.options.onTouchEnd.call(F,H)
}return
}if(F.options.snap){L=J-F.absStartX;
K=G-F.absStartY;
if(u.abs(L)<F.options.snapThreshold&&u.abs(K)<F.options.snapThreshold){F.scrollTo(F.absStartX,F.absStartY,200)
}else{D=F._snap(F.x,F.y);
if(D.x!=F.x||D.y!=F.y){F.scrollTo(D.x,D.y,D.time)
}}if(F.options.onTouchEnd){F.options.onTouchEnd.call(F,H)
}return
}F._resetPos(200);
if(F.options.onTouchEnd){F.options.onTouchEnd.call(F,H)
}},_resetPos:function(B){var m=this,C=m.x>=0?0:m.x<m.maxScrollX?m.maxScrollX:m.x,A=m.y>=m.minScrollY||m.maxScrollY>0?m.minScrollY:m.y<m.maxScrollY?m.maxScrollY:m.y;
if(C==m.x&&A==m.y){if(m.moved){m.moved=false;
if(m.options.onScrollEnd){m.options.onScrollEnd.call(m)
}}if(m.hScrollbar&&m.options.hideScrollbar){if(y=="webkit"){m.hScrollbarWrapper.style[y+"TransitionDelay"]="300ms"
}m.hScrollbarWrapper.style.opacity="0"
}if(m.vScrollbar&&m.options.hideScrollbar){if(y=="webkit"){m.vScrollbarWrapper.style[y+"TransitionDelay"]="300ms"
}m.vScrollbarWrapper.style.opacity="0"
}return
}m.scrollTo(C,A,B||0)
},_wheel:function(E){var C=this,D,B,A,m,F;
if("wheelDeltaX" in E){D=E.wheelDeltaX/12;
B=E.wheelDeltaY/12
}else{if("wheelDelta" in E){D=B=E.wheelDelta/12
}else{if("detail" in E){D=B=-E.detail*3
}else{return
}}}if(C.options.wheelAction=="zoom"){F=C.scale*Math.pow(2,1/3*(B?B/Math.abs(B):0));
if(F<C.options.zoomMin){F=C.options.zoomMin
}if(F>C.options.zoomMax){F=C.options.zoomMax
}if(F!=C.scale){if(!C.wheelZoomCount&&C.options.onZoomStart){C.options.onZoomStart.call(C,E)
}C.wheelZoomCount++;
C.zoom(E.pageX,E.pageY,F,400);
setTimeout(function(){C.wheelZoomCount--;
if(!C.wheelZoomCount&&C.options.onZoomEnd){C.options.onZoomEnd.call(C,E)
}},400)
}return
}A=C.x+D;
m=C.y+B;
if(A>0){A=0
}else{if(A<C.maxScrollX){A=C.maxScrollX
}}if(m>C.minScrollY){m=C.minScrollY
}else{if(m<C.maxScrollY){m=C.maxScrollY
}}C.scrollTo(A,m,0)
},_mouseout:function(A){var m=A.relatedTarget;
if(!m){this._end(A);
return
}while(m=m.parentNode){if(m==this.wrapper){return
}}this._end(A)
},_transitionEnd:function(A){var m=this;
if(A.target!=m.scroller){return
}m._unbind("webkitTransitionEnd");
m._startAni()
},_startAni:function(){var F=this,A=F.x,m=F.y,D=Date.now(),E,C,B;
if(F.animating){return
}if(!F.steps.length){F._resetPos(400);
return
}E=F.steps.shift();
if(E.x==A&&E.y==m){E.time=0
}F.animating=true;
F.moved=true;
if(F.options.useTransition){F._transitionTime(E.time);
F._pos(E.x,E.y);
F.animating=false;
if(E.time){F._bind("webkitTransitionEnd")
}else{F._resetPos(0)
}return
}B=function(){var G=Date.now(),I,H;
if(G>=D+E.time){F._pos(E.x,E.y);
F.animating=false;
if(F.options.onAnimationEnd){F.options.onAnimationEnd.call(F)
}F._startAni();
return
}G=(G-D)/E.time-1;
C=u.sqrt(1-G*G);
I=(E.x-A)*C+A;
H=(E.y-m)*C+m;
F._pos(I,H);
if(F.animating){F.aniTime=r(B)
}};
B()
},_transitionTime:function(m){m+="ms";
this.scroller.style[y+"TransitionDuration"]=m;
if(this.hScrollbar){this.hScrollbarIndicator.style[y+"TransitionDuration"]=m
}if(this.vScrollbar){this.vScrollbarIndicator.style[y+"TransitionDuration"]=m
}},_momentum:function(G,A,E,m,I){var F=0.0006,B=u.abs(G)/A,C=(B*B)/(2*F),H=0,D=0;
if(G>0&&C>E){D=I/(6/(C/B*F));
E=E+D;
B=B*E/C;
C=E
}else{if(G<0&&C>m){D=I/(6/(C/B*F));
m=m+D;
B=B*m/C;
C=m
}}C=C*(G<0?-1:1);
H=B/F;
return{dist:C,time:e(H)}
},_offset:function(m){var B=-m.offsetLeft,A=-m.offsetTop;
while(m=m.offsetParent){B-=m.offsetLeft;
A-=m.offsetTop
}if(m!=this.wrapper){B*=this.scale;
A*=this.scale
}return{left:B,top:A}
},_snap:function(H,G){var E=this,D,C,F,B,A,m;
F=E.pagesX.length-1;
for(D=0,C=E.pagesX.length;
D<C;
D++){if(H>=E.pagesX[D]){F=D;
break
}}if(F==E.currPageX&&F>0&&E.dirX<0){F--
}H=E.pagesX[F];
A=u.abs(H-E.pagesX[E.currPageX]);
A=A?u.abs(E.x-H)/A*500:0;
E.currPageX=F;
F=E.pagesY.length-1;
for(D=0;
D<F;
D++){if(G>=E.pagesY[D]){F=D;
break
}}if(F==E.currPageY&&F>0&&E.dirY<0){F--
}G=E.pagesY[F];
m=u.abs(G-E.pagesY[E.currPageY]);
m=m?u.abs(E.y-G)/m*500:0;
E.currPageY=F;
B=e(u.max(A,m))||200;
return{x:H,y:G,time:B}
},_bind:function(B,A,m){if((A||this.scroller).addEventListener){(A||this.scroller).addEventListener(B,this,!!m)
}},_unbind:function(B,A,m){if((A||this.scroller).addEventListener){(A||this.scroller).removeEventListener(B,this,!!m)
}},destroy:function(){var m=this;
m.scroller.style[y+"Transform"]="";
m.hScrollbar=false;
m.vScrollbar=false;
m._scrollbar("h");
m._scrollbar("v");
m._unbind(k,window);
m._unbind(c);
m._unbind(s);
m._unbind(f);
m._unbind(w);
if(!m.options.hasTouch){m._unbind("mouseout",m.wrapper);
m._unbind(t)
}if(m.options.useTransition){m._unbind("webkitTransitionEnd")
}if(m.options.checkDOMChanges){clearInterval(m.checkDOMTime)
}if(m.options.onDestroy){m.options.onDestroy.call(m)
}},refresh:function(){var C=this,E,B,m,A,F=0,D=0;
if(C.scale<C.options.zoomMin){C.scale=C.options.zoomMin
}C.wrapperW=C.wrapper.clientWidth||1;
C.wrapperH=C.wrapper.clientHeight||1;
C.minScrollY=-C.options.topOffset||0;
C.scrollerW=e(C.scroller.offsetWidth*C.scale);
C.scrollerH=e((C.scroller.offsetHeight+C.minScrollY)*C.scale);
C.maxScrollX=C.wrapperW-C.scrollerW;
C.maxScrollY=C.wrapperH-C.scrollerH+C.minScrollY;
C.dirX=0;
C.dirY=0;
if(C.options.onRefresh){C.options.onRefresh.call(C)
}C.hScroll=C.options.hScroll&&C.maxScrollX<0;
C.vScroll=C.options.vScroll&&(!C.options.bounceLock&&!C.hScroll||C.scrollerH>C.wrapperH);
C.hScrollbar=C.hScroll&&C.options.hScrollbar;
C.vScrollbar=C.vScroll&&C.options.vScrollbar&&C.scrollerH>C.wrapperH;
E=C._offset(C.wrapper);
C.wrapperOffsetLeft=-E.left;
C.wrapperOffsetTop=-E.top;
if(typeof C.options.snap=="string"){C.pagesX=[];
C.pagesY=[];
A=C.scroller.querySelectorAll(C.options.snap);
for(B=0,m=A.length;
B<m;
B++){F=C._offset(A[B]);
F.left+=C.wrapperOffsetLeft;
F.top+=C.wrapperOffsetTop;
C.pagesX[B]=F.left<C.maxScrollX?C.maxScrollX:F.left*C.scale;
C.pagesY[B]=F.top<C.maxScrollY?C.maxScrollY:F.top*C.scale
}}else{if(C.options.snap){C.pagesX=[];
while(F>=C.maxScrollX){C.pagesX[D]=F;
F=F-C.wrapperW;
D++
}if(C.maxScrollX%C.wrapperW){C.pagesX[C.pagesX.length]=C.maxScrollX-C.pagesX[C.pagesX.length-1]+C.pagesX[C.pagesX.length-1]
}F=0;
D=0;
C.pagesY=[];
while(F>=C.maxScrollY){C.pagesY[D]=F;
F=F-C.wrapperH;
D++
}if(C.maxScrollY%C.wrapperH){C.pagesY[C.pagesY.length]=C.maxScrollY-C.pagesY[C.pagesY.length-1]+C.pagesY[C.pagesY.length-1]
}}}C._scrollbar("h");
C._scrollbar("v");
if(!C.zoomed){C.scroller.style[y+"TransitionDuration"]="0";
C._resetPos(200)
}},scrollTo:function(m,G,F,E){var D=this,C=m,B,A;
D.stop();
if(!C.length){C=[{x:m,y:G,time:F,relative:E}]
}for(B=0,A=C.length;
B<A;
B++){if(C[B].relative){C[B].x=D.x-C[B].x;
C[B].y=D.y-C[B].y
}D.steps.push({x:C[B].x,y:C[B].y,time:C[B].time||0})
}D._startAni()
},scrollToElement:function(m,B){var A=this,C;
if(!m.nodeType){m=$(A.scroller).find(m).get(0)
}if(!m){return
}C=A._offset(m);
C.left+=A.wrapperOffsetLeft;
C.top+=A.wrapperOffsetTop;
if(isIE_InfEq8){C.left=-$(m).position().left
}else{C.left=C.left>0?0:C.left<A.maxScrollX?A.maxScrollX:C.left
}C.top=C.top>A.minScrollY?A.minScrollY:C.top<A.maxScrollY?A.maxScrollY:C.top;
B=B===undefined?u.max(u.abs(C.left)*2,u.abs(C.top)*2):B;
A.scrollTo(C.left,C.top,B)
},scrollToPage:function(B,A,D){var C=this,m,E;
D=D===undefined?400:D;
if(C.options.onScrollStart){C.options.onScrollStart.call(C)
}if(C.options.snap){B=B=="next"?C.currPageX+1:B=="prev"?C.currPageX-1:B;
A=A=="next"?C.currPageY+1:A=="prev"?C.currPageY-1:A;
B=B<0?0:B>C.pagesX.length-1?C.pagesX.length-1:B;
A=A<0?0:A>C.pagesY.length-1?C.pagesY.length-1:A;
C.currPageX=B;
C.currPageY=A;
m=C.pagesX[B];
E=C.pagesY[A]
}else{m=-C.wrapperW*B;
E=-C.wrapperH*A;
if(m<C.maxScrollX){m=C.maxScrollX
}if(E<C.maxScrollY){E=C.maxScrollY
}}C.scrollTo(m,E,D)
},disable:function(){this.stop();
this._resetPos(0);
this.enabled=false;
this._unbind(s);
this._unbind(f);
this._unbind(w)
},enable:function(){this.enabled=true
},stop:function(){if(this.options.useTransition){this._unbind("webkitTransitionEnd")
}else{p(this.aniTime)
}this.steps=[];
this.moved=false;
this.animating=false
},zoom:function(m,E,D,C){var A=this,B=D/A.scale;
if(!A.options.useTransform){return
}A.zoomed=true;
C=C===undefined?200:C;
m=m-A.wrapperOffsetLeft-A.x;
E=E-A.wrapperOffsetTop-A.y;
A.x=m-m*B+A.x;
A.y=E-E*B+A.y;
A.scale=D;
A.refresh();
A.x=A.x>0?0:A.x<A.maxScrollX?A.maxScrollX:A.x;
A.y=A.y>A.minScrollY?A.minScrollY:A.y<A.maxScrollY?A.maxScrollY:A.y;
A.scroller.style[y+"TransitionDuration"]=C+"ms";
A.scroller.style[y+"Transform"]=b+A.x+"px,"+A.y+"px"+n+" scale("+D+")";
A.zoomed=false
},isReady:function(){return !this.moved&&!this.zoomed&&!this.animating
}};
if(typeof exports!=="undefined"){exports.iScroll=v
}else{window.iScroll=v
}if(!Date.now){Date.now=function a(){return +(new Date)
}
}})();
(function(){var v="0.4.5",l=window.jQuery||window.$||(window.$={}),f={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(H){return String(H).evalJSON()
}||l.parseJSON||l.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||l.toJSON};
if(!("parse" in f)||!("stringify" in f)){throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page")
}var o={__jstorage_meta:{CRC32:{}}},c={jStorage:"{}"},A=null,q=0,k=false,m={},E=false,B=0,u={},z=+new Date(),C,D={isXML:function(I){var H=(I?I.ownerDocument||I:0).documentElement;
return H?H.nodeName!=="HTML":false
},encode:function(I){if(!this.isXML(I)){return false
}try{return new XMLSerializer().serializeToString(I)
}catch(H){try{return I.xml
}catch(J){}}return false
},decode:function(I){var H=("DOMParser" in window&&(new DOMParser()).parseFromString)||(window.ActiveXObject&&function(K){var L=new ActiveXObject("Microsoft.XMLDOM");
L.async="false";
L.loadXML(K);
return L
}),J;
if(!H){return false
}J=H.call("DOMParser" in window&&(new DOMParser())||window,I,"text/xml");
return this.isXML(J)?J:false
}};
function s(){var H=false;
if("localStorage" in window){try{window.localStorage.setItem("_tmptest","tmpval");
H=true;
window.localStorage.removeItem("_tmptest")
}catch(I){}}if(H){try{if(window.localStorage){c=window.localStorage;
k="localStorage";
B=c.jStorage_update
}}catch(O){}}else{if("globalStorage" in window){try{if(window.globalStorage){if(window.location.hostname=="localhost"){c=window.globalStorage["localhost.localdomain"]
}else{c=window.globalStorage[window.location.hostname]
}k="globalStorage";
B=c.jStorage_update
}}catch(N){}}else{A=document.createElement("link");
if(A.addBehavior){A.style.behavior="url(#default#userData)";
document.getElementsByTagName("head")[0].appendChild(A);
try{A.load("jStorage")
}catch(M){A.setAttribute("jStorage","{}");
A.save("jStorage");
A.load("jStorage")
}var L="{}";
try{L=A.getAttribute("jStorage")
}catch(K){}try{B=A.getAttribute("jStorage_update")
}catch(J){}c.jStorage=L;
k="userDataBehavior"
}else{A=null;
return
}}}n();
b();
y();
w();
if("addEventListener" in window){window.addEventListener("pageshow",function(P){if(P.persisted){r()
}},false)
}}function e(){var J="{}";
if(k=="userDataBehavior"){A.load("jStorage");
try{J=A.getAttribute("jStorage")
}catch(I){}try{B=A.getAttribute("jStorage_update")
}catch(H){}c.jStorage=J
}n();
b();
w()
}function y(){if(k=="localStorage"||k=="globalStorage"){if("addEventListener" in window){window.addEventListener("storage",r,false)
}else{document.attachEvent("onstorage",r)
}}else{if(k=="userDataBehavior"){setInterval(r,1000)
}}}function r(){var H;
clearTimeout(E);
E=setTimeout(function(){if(k=="localStorage"||k=="globalStorage"){H=c.jStorage_update
}else{if(k=="userDataBehavior"){A.load("jStorage");
try{H=A.getAttribute("jStorage_update")
}catch(I){}}}if(H&&H!=B){B=H;
h()
}},25)
}function h(){var H=f.parse(f.stringify(o.__jstorage_meta.CRC32)),L;
e();
L=f.parse(f.stringify(o.__jstorage_meta.CRC32));
var J,I=[],K=[];
for(J in H){if(H.hasOwnProperty(J)){if(!L[J]){K.push(J);
continue
}if(H[J]!=L[J]&&String(H[J]).substr(0,2)=="2."){I.push(J)
}}}for(J in L){if(L.hasOwnProperty(J)){if(!H[J]){I.push(J)
}}}G(I,"updated");
G(K,"deleted")
}function G(M,N){M=[].concat(M||[]);
if(N=="flushed"){M=[];
for(var L in m){if(m.hasOwnProperty(L)){M.push(L)
}}N="deleted"
}for(var K=0,H=M.length;
K<H;
K++){if(m[M[K]]){for(var J=0,I=m[M[K]].length;
J<I;
J++){m[M[K]][J](M[K],N)
}}if(m["*"]){for(var J=0,I=m["*"].length;
J<I;
J++){m["*"][J](M[K],N)
}}}}function p(){var I=(+new Date()).toString();
if(k=="localStorage"||k=="globalStorage"){try{c.jStorage_update=I
}catch(H){k=false
}}else{if(k=="userDataBehavior"){A.setAttribute("jStorage_update",I);
A.save("jStorage")
}}r()
}function n(){if(c.jStorage){try{o=f.parse(String(c.jStorage))
}catch(H){c.jStorage="{}"
}}else{c.jStorage="{}"
}q=c.jStorage?String(c.jStorage).length:0;
if(!o.__jstorage_meta){o.__jstorage_meta={}
}if(!o.__jstorage_meta.CRC32){o.__jstorage_meta.CRC32={}
}}function t(){a();
try{c.jStorage=f.stringify(o);
if(A){A.setAttribute("jStorage",c.jStorage);
A.save("jStorage")
}q=c.jStorage?String(c.jStorage).length:0
}catch(H){}}function x(H){if(!H||(typeof H!="string"&&typeof H!="number")){throw new TypeError("Key name must be string or numeric")
}if(H=="__jstorage_meta"){throw new TypeError("Reserved key name")
}return true
}function b(){var N,I,L,J,K=Infinity,M=false,H=[];
clearTimeout(C);
if(!o.__jstorage_meta||typeof o.__jstorage_meta.TTL!="object"){return
}N=+new Date();
L=o.__jstorage_meta.TTL;
J=o.__jstorage_meta.CRC32;
for(I in L){if(L.hasOwnProperty(I)){if(L[I]<=N){delete L[I];
delete J[I];
delete o[I];
M=true;
H.push(I)
}else{if(L[I]<K){K=L[I]
}}}}if(K!=Infinity){C=setTimeout(b,K-N)
}if(M){t();
p();
G(H,"deleted")
}}function w(){var K,I;
if(!o.__jstorage_meta.PubSub){return
}var H,J=z;
for(K=I=o.__jstorage_meta.PubSub.length-1;
K>=0;
K--){H=o.__jstorage_meta.PubSub[K];
if(H[0]>z){J=H[0];
d(H[1],H[2])
}}z=J
}function d(J,L){if(u[J]){for(var I=0,H=u[J].length;
I<H;
I++){try{u[J][I](J,f.parse(f.stringify(L)))
}catch(K){}}}}function a(){if(!o.__jstorage_meta.PubSub){return
}var J=+new Date()-2000;
for(var I=0,H=o.__jstorage_meta.PubSub.length;
I<H;
I++){if(o.__jstorage_meta.PubSub[I][0]<=J){o.__jstorage_meta.PubSub.splice(I,o.__jstorage_meta.PubSub.length-I);
break
}}if(!o.__jstorage_meta.PubSub.length){delete o.__jstorage_meta.PubSub
}}function g(H,I){if(!o.__jstorage_meta){o.__jstorage_meta={}
}if(!o.__jstorage_meta.PubSub){o.__jstorage_meta.PubSub=[]
}o.__jstorage_meta.PubSub.unshift([+new Date,H,I]);
t();
p()
}function F(M,I){var H=M.length,L=I^H,K=0,J;
while(H>=4){J=((M.charCodeAt(K)&255))|((M.charCodeAt(++K)&255)<<8)|((M.charCodeAt(++K)&255)<<16)|((M.charCodeAt(++K)&255)<<24);
J=(((J&65535)*1540483477)+((((J>>>16)*1540483477)&65535)<<16));
J^=J>>>24;
J=(((J&65535)*1540483477)+((((J>>>16)*1540483477)&65535)<<16));
L=(((L&65535)*1540483477)+((((L>>>16)*1540483477)&65535)<<16))^J;
H-=4;
++K
}switch(H){case 3:L^=(M.charCodeAt(K+2)&255)<<16;
case 2:L^=(M.charCodeAt(K+1)&255)<<8;
case 1:L^=(M.charCodeAt(K)&255);
L=(((L&65535)*1540483477)+((((L>>>16)*1540483477)&65535)<<16))
}L^=L>>>13;
L=(((L&65535)*1540483477)+((((L>>>16)*1540483477)&65535)<<16));
L^=L>>>15;
return L>>>0
}l.jStorage={version:v,set:function(I,J,H){x(I);
H=H||{};
if(typeof J=="undefined"){this.deleteKey(I);
return J
}if(D.isXML(J)){J={_is_xml:true,xml:D.encode(J)}
}else{if(typeof J=="function"){return undefined
}else{if(J&&typeof J=="object"){J=f.parse(f.stringify(J))
}}}o[I]=J;
o.__jstorage_meta.CRC32[I]="2."+F(f.stringify(J),2538058380);
this.setTTL(I,H.TTL||0);
G(I,"updated");
return J
},get:function(H,I){x(H);
if(H in o){if(o[H]&&typeof o[H]=="object"&&o[H]._is_xml){return D.decode(o[H].xml)
}else{return o[H]
}}return typeof(I)=="undefined"?null:I
},deleteKey:function(H){x(H);
if(H in o){delete o[H];
if(typeof o.__jstorage_meta.TTL=="object"&&H in o.__jstorage_meta.TTL){delete o.__jstorage_meta.TTL[H]
}delete o.__jstorage_meta.CRC32[H];
t();
p();
G(H,"deleted");
return true
}return false
},setTTL:function(I,H){var J=+new Date();
x(I);
H=Number(H)||0;
if(I in o){if(!o.__jstorage_meta.TTL){o.__jstorage_meta.TTL={}
}if(H>0){o.__jstorage_meta.TTL[I]=J+H
}else{delete o.__jstorage_meta.TTL[I]
}t();
b();
p();
return true
}return false
},getTTL:function(I){var J=+new Date(),H;
x(I);
if(I in o&&o.__jstorage_meta.TTL&&o.__jstorage_meta.TTL[I]){H=o.__jstorage_meta.TTL[I]-J;
return H||0
}return 0
},flush:function(){o={__jstorage_meta:{CRC32:{}}};
t();
p();
G(null,"flushed");
return true
},storageObj:function(){function H(){}H.prototype=o;
return new H()
},index:function(){var H=[],I;
for(I in o){if(o.hasOwnProperty(I)&&I!="__jstorage_meta"){H.push(I)
}}return H
},storageSize:function(){return q
},currentBackend:function(){return k
},storageAvailable:function(){return !!k
},listenKeyChange:function(H,I){x(H);
if(!m[H]){m[H]=[]
}m[H].push(I)
},stopListening:function(I,J){x(I);
if(!m[I]){return
}if(!J){delete m[I];
return
}for(var H=m[I].length-1;
H>=0;
H--){if(m[I][H]==J){m[I].splice(H,1)
}}},subscribe:function(H,I){H=(H||"").toString();
if(!H){throw new TypeError("Channel not defined")
}if(!u[H]){u[H]=[]
}u[H].push(I)
},publish:function(H,I){H=(H||"").toString();
if(!H){throw new TypeError("Channel not defined")
}g(H,I)
},reInit:function(){e()
}};
s()
})();
(function(a){a.fn.textfill=function(e){function b(){c.debug&&("undefined"!=typeof console&&"undefined"!=typeof console.debug)&&console.debug.apply(console,arguments)
}function d(){"undefined"!=typeof console&&"undefined"!=typeof console.warn&&console.warn.apply(console,arguments)
}function g(m,l,q,o,p,n){function r(k,h){var s=" / ";
k>h?s=" > ":k==h&&(s=" = ");
return s
}b(m+"font: "+l.css("font-size")+", H: "+l.height()+r(l.height(),q)+q+", W: "+l.width()+r(l.width(),o)+o+", minFontPixels: "+p+", maxFontPixels: "+n)
}function f(u,t,r,o,p,n,s,m){for(g(u+": ",t,p,n,s,m);
s<m-1;
){var q=Math.floor((s+m)/2);
t.css("font-size",q);
if(r.call(t)<=o){if(s=q,r.call(t)==o){break
}}else{m=q
}g(u+": ",t,p,n,s,m)
}t.css("font-size",m);
r.call(t)<=o&&(s=m,g(u+"* ",t,p,n,s,m));
return s
}var c=a.extend({debug:!1,maxFontPixels:40,minFontPixels:4,innerTag:"span",widthOnly:!1,success:null,callback:null,fail:null,complete:null,explicitWidth:null,explicitHeight:null},e);
this.each(function(){var o=a(c.innerTag+":visible:first",this),l=c.explicitHeight||a(this).height(),q=c.explicitWidth||a(this).width(),n=o.css("font-size");
b("Opts: ",c);
b("Vars: maxHeight: "+l+", maxWidth: "+q);
var p=c.minFontPixels,m=0>=c.maxFontPixels?l:c.maxFontPixels,r=void 0;
c.widthOnly||(r=f("H",o,a.fn.height,l,l,q,p,m));
p=f("W",o,a.fn.width,q,l,q,p,m);
c.widthOnly?o.css("font-size",p):o.css("font-size",Math.min(r,p));
b("Final: "+o.css("font-size"));
o.width()>q||o.height()>l&&!c.widthOnly?(o.css("font-size",n),c.fail&&c.fail(this)):c.success?c.success(this):c.callback&&(d("callback is deprecated, use success, instead"),c.callback(this))
});
c.complete&&c.complete(this);
return this
}
})(window.jQuery);
(function(g){var b,e,a,f=g(window),m={jqueryui:{container:"ui-widget ui-widget-content ui-corner-all",notice:"ui-state-highlight",notice_icon:"ui-icon ui-icon-info",info:"",info_icon:"ui-icon ui-icon-info",success:"ui-state-default",success_icon:"ui-icon ui-icon-circle-check",error:"ui-state-error",error_icon:"ui-icon ui-icon-alert",closer:"ui-icon ui-icon-close",pin_up:"ui-icon ui-icon-pin-w",pin_down:"ui-icon ui-icon-pin-s",hi_menu:"ui-state-default ui-corner-bottom",hi_btn:"ui-state-default ui-corner-all",hi_btnhov:"ui-state-hover",hi_hnd:"ui-icon ui-icon-grip-dotted-horizontal"},bootstrap:{container:"alert",notice:"",notice_icon:"icon-exclamation-sign",info:"alert-info",info_icon:"icon-info-sign",success:"alert-success",success_icon:"icon-ok-sign",error:"alert-error",error_icon:"icon-warning-sign",closer:"icon-remove",pin_up:"icon-pause",pin_down:"icon-play",hi_menu:"well",hi_btn:"btn",hi_btnhov:"",hi_hnd:"icon-chevron-down"}},p=function(){a=g("body");
f=g(window);
f.bind("resize",function(){e&&clearTimeout(e);
e=setTimeout(g.pnotify_position_all,10)
})
};
document.body?p():g(p);
g.extend({pnotify_remove_all:function(){var d=f.data("pnotify");
d&&d.length&&g.each(d,function(){this.pnotify_remove&&this.pnotify_remove()
})
},pnotify_position_all:function(){e&&clearTimeout(e);
e=null;
var d=f.data("pnotify");
d&&d.length&&(g.each(d,function(){var n=this.opts.stack;
if(n){n.nextpos1=n.firstpos1,n.nextpos2=n.firstpos2,n.addpos2=0,n.animation=true
}}),g.each(d,function(){this.pnotify_position()
}))
},pnotify:function(v){var t,x;
typeof v!="object"?(x=g.extend({},g.pnotify.defaults),x.text=v):x=g.extend({},g.pnotify.defaults,v);
for(var d in x){typeof d=="string"&&d.match(/^pnotify_/)&&(x[d.replace(/^pnotify_/,"")]=x[d])
}if(x.before_init&&x.before_init(x)===false){return null
}var r,n=function(y,C){w.css("display","none");
var A=document.elementFromPoint(y.clientX,y.clientY);
w.css("display","block");
var B=g(A),z=B.css("cursor");
w.css("cursor",z!="auto"?z:"default");
if(!r||r.get(0)!=A){r&&(c.call(r.get(0),"mouseleave",y.originalEvent),c.call(r.get(0),"mouseout",y.originalEvent)),c.call(A,"mouseenter",y.originalEvent),c.call(A,"mouseover",y.originalEvent)
}c.call(A,C,y.originalEvent);
r=B
},u=m[x.styling],w=g("<div />",{"class":"ui-pnotify "+x.addclass,css:{display:"none"},mouseenter:function(y){x.nonblock&&y.stopPropagation();
x.mouse_reset&&t=="out"&&(w.stop(true),t="in",w.css("height","auto").animate({width:x.width,opacity:x.nonblock?x.nonblock_opacity:x.opacity},"fast"));
x.nonblock&&w.animate({opacity:x.nonblock_opacity},"fast");
x.hide&&x.mouse_reset&&w.pnotify_cancel_remove();
x.sticker&&!x.nonblock&&w.sticker.trigger("pnotify_icon").css("visibility","visible");
x.closer&&!x.nonblock&&w.closer.css("visibility","visible")
},mouseleave:function(y){x.nonblock&&y.stopPropagation();
r=null;
w.css("cursor","auto");
x.nonblock&&t!="out"&&w.animate({opacity:x.opacity},"fast");
x.hide&&x.mouse_reset&&w.pnotify_queue_remove();
x.sticker_hover&&w.sticker.css("visibility","hidden");
x.closer_hover&&w.closer.css("visibility","hidden");
g.pnotify_position_all()
},mouseover:function(y){x.nonblock&&y.stopPropagation()
},mouseout:function(y){x.nonblock&&y.stopPropagation()
},mousemove:function(y){x.nonblock&&(y.stopPropagation(),n(y,"onmousemove"))
},mousedown:function(y){x.nonblock&&(y.stopPropagation(),y.preventDefault(),n(y,"onmousedown"))
},mouseup:function(y){x.nonblock&&(y.stopPropagation(),y.preventDefault(),n(y,"onmouseup"))
},click:function(y){x.nonblock&&(y.stopPropagation(),n(y,"onclick"))
},dblclick:function(y){x.nonblock&&(y.stopPropagation(),n(y,"ondblclick"))
}});
w.opts=x;
w.container=g("<div />",{"class":u.container+" ui-pnotify-container "+(x.type=="error"?u.error:x.type=="info"?u.info:x.type=="success"?u.success:u.notice)}).appendTo(w);
x.cornerclass!=""&&w.container.removeClass("ui-corner-all").addClass(x.cornerclass);
x.shadow&&w.container.addClass("ui-pnotify-shadow");
w.pnotify_version="1.2.0";
w.pnotify=function(y){var A=x;
typeof y=="string"?x.text=y:x=g.extend({},x,y);
for(var z in x){typeof z=="string"&&z.match(/^pnotify_/)&&(x[z.replace(/^pnotify_/,"")]=x[z])
}w.opts=x;
x.cornerclass!=A.cornerclass&&w.container.removeClass("ui-corner-all").addClass(x.cornerclass);
x.shadow!=A.shadow&&(x.shadow?w.container.addClass("ui-pnotify-shadow"):w.container.removeClass("ui-pnotify-shadow"));
x.addclass===false?w.removeClass(A.addclass):x.addclass!==A.addclass&&w.removeClass(A.addclass).addClass(x.addclass);
x.title===false?w.title_container.slideUp("fast"):x.title!==A.title&&(x.title_escape?w.title_container.text(x.title).slideDown(200):w.title_container.html(x.title).slideDown(200));
x.text===false?w.text_container.slideUp("fast"):x.text!==A.text&&(x.text_escape?w.text_container.text(x.text).slideDown(200):w.text_container.html(x.insert_brs?String(x.text).replace(/\n/g,"<br />"):x.text).slideDown(200));
w.pnotify_history=x.history;
w.pnotify_hide=x.hide;
x.type!=A.type&&w.container.removeClass(u.error+" "+u.notice+" "+u.success+" "+u.info).addClass(x.type=="error"?u.error:x.type=="info"?u.info:x.type=="success"?u.success:u.notice);
if(x.icon!==A.icon||x.icon===true&&x.type!=A.type){w.container.find("div.ui-pnotify-icon").remove(),x.icon!==false&&g("<div />",{"class":"ui-pnotify-icon"}).append(g("<span />",{"class":x.icon===true?x.type=="error"?u.error_icon:x.type=="info"?u.info_icon:x.type=="success"?u.success_icon:u.notice_icon:x.icon})).prependTo(w.container)
}x.width!==A.width&&w.animate({width:x.width});
x.min_height!==A.min_height&&w.container.animate({minHeight:x.min_height});
x.opacity!==A.opacity&&w.fadeTo(x.animate_speed,x.opacity);
!x.closer||x.nonblock?w.closer.css("display","none"):w.closer.css("display","block");
!x.sticker||x.nonblock?w.sticker.css("display","none"):w.sticker.css("display","block");
w.sticker.trigger("pnotify_icon");
x.sticker_hover?w.sticker.css("visibility","hidden"):x.nonblock||w.sticker.css("visibility","visible");
x.closer_hover?w.closer.css("visibility","hidden"):x.nonblock||w.closer.css("visibility","visible");
x.hide?A.hide||w.pnotify_queue_remove():w.pnotify_cancel_remove();
w.pnotify_queue_position();
return w
};
w.pnotify_position=function(y){var E=w.opts.stack;
if(E){if(!E.nextpos1){E.nextpos1=E.firstpos1
}if(!E.nextpos2){E.nextpos2=E.firstpos2
}if(!E.addpos2){E.addpos2=0
}var D=w.css("display")=="none";
if(!D||y){var B,C={},A;
switch(E.dir1){case"down":A="top";
break;
case"up":A="bottom";
break;
case"left":A="right";
break;
case"right":A="left"
}y=parseInt(w.css(A));
isNaN(y)&&(y=0);
if(typeof E.firstpos1=="undefined"&&!D){E.firstpos1=y,E.nextpos1=E.firstpos1
}var z;
switch(E.dir2){case"down":z="top";
break;
case"up":z="bottom";
break;
case"left":z="right";
break;
case"right":z="left"
}B=parseInt(w.css(z));
isNaN(B)&&(B=0);
if(typeof E.firstpos2=="undefined"&&!D){E.firstpos2=B,E.nextpos2=E.firstpos2
}if(E.dir1=="down"&&E.nextpos1+w.height()>f.height()||E.dir1=="up"&&E.nextpos1+w.height()>f.height()||E.dir1=="left"&&E.nextpos1+w.width()>f.width()||E.dir1=="right"&&E.nextpos1+w.width()>f.width()){E.nextpos1=E.firstpos1,E.nextpos2+=E.addpos2+(typeof E.spacing2=="undefined"?25:E.spacing2),E.addpos2=0
}if(E.animation&&E.nextpos2<B){switch(E.dir2){case"down":C.top=E.nextpos2+"px";
break;
case"up":C.bottom=E.nextpos2+"px";
break;
case"left":C.right=E.nextpos2+"px";
break;
case"right":C.left=E.nextpos2+"px"
}}else{w.css(z,E.nextpos2+"px")
}switch(E.dir2){case"down":case"up":if(w.outerHeight(true)>E.addpos2){E.addpos2=w.height()
}break;
case"left":case"right":if(w.outerWidth(true)>E.addpos2){E.addpos2=w.width()
}}if(E.nextpos1){if(E.animation&&(y>E.nextpos1||C.top||C.bottom||C.right||C.left)){switch(E.dir1){case"down":C.top=E.nextpos1+"px";
break;
case"up":C.bottom=E.nextpos1+"px";
break;
case"left":C.right=E.nextpos1+"px";
break;
case"right":C.left=E.nextpos1+"px"
}}else{w.css(A,E.nextpos1+"px")
}}(C.top||C.bottom||C.right||C.left)&&w.animate(C,{duration:500,queue:false});
switch(E.dir1){case"down":case"up":E.nextpos1+=w.height()+(typeof E.spacing1=="undefined"?25:E.spacing1);
break;
case"left":case"right":E.nextpos1+=w.width()+(typeof E.spacing1=="undefined"?25:E.spacing1)
}}}};
w.pnotify_queue_position=function(y){e&&clearTimeout(e);
y||(y=10);
e=setTimeout(g.pnotify_position_all,y)
};
w.pnotify_display=function(){w.parent().length||w.appendTo(a);
x.before_open&&x.before_open(w)===false||(x.stack.push!="top"&&w.pnotify_position(true),x.animation=="fade"||x.animation.effect_in=="fade"?w.show().fadeTo(0,0).hide():x.opacity!=1&&w.show().fadeTo(0,x.opacity).hide(),w.animate_in(function(){x.after_open&&x.after_open(w);
w.pnotify_queue_position();
x.hide&&w.pnotify_queue_remove()
}))
};
w.pnotify_remove=function(){if(w.timer){window.clearTimeout(w.timer),w.timer=null
}x.before_close&&x.before_close(w)===false||w.animate_out(function(){x.after_close&&x.after_close(w)===false||(w.pnotify_queue_position(),x.remove&&w.detach())
})
};
w.animate_in=function(y){t="in";
var z;
z=typeof x.animation.effect_in!="undefined"?x.animation.effect_in:x.animation;
z=="none"?(w.show(),y()):z=="show"?w.show(x.animate_speed,y):z=="fade"?w.show().fadeTo(x.animate_speed,x.opacity,y):z=="slide"?w.slideDown(x.animate_speed,y):typeof z=="function"?z("in",y,w):w.show(z,typeof x.animation.options_in=="object"?x.animation.options_in:{},x.animate_speed,y)
};
w.animate_out=function(y){t="out";
var z;
z=typeof x.animation.effect_out!="undefined"?x.animation.effect_out:x.animation;
z=="none"?(w.hide(),y()):z=="show"?w.hide(x.animate_speed,y):z=="fade"?w.fadeOut(x.animate_speed,y):z=="slide"?w.slideUp(x.animate_speed,y):typeof z=="function"?z("out",y,w):w.hide(z,typeof x.animation.options_out=="object"?x.animation.options_out:{},x.animate_speed,y)
};
w.pnotify_cancel_remove=function(){w.timer&&window.clearTimeout(w.timer)
};
w.pnotify_queue_remove=function(){w.pnotify_cancel_remove();
w.timer=window.setTimeout(function(){w.pnotify_remove()
},isNaN(x.delay)?0:x.delay)
};
w.closer=g("<div />",{"class":"ui-pnotify-closer",css:{cursor:"pointer",visibility:x.closer_hover?"hidden":"visible"},click:function(){w.pnotify_remove();
w.sticker.css("visibility","hidden");
w.closer.css("visibility","hidden")
}}).append(g("<span />",{"class":u.closer})).appendTo(w.container);
(!x.closer||x.nonblock)&&w.closer.css("display","none");
w.sticker=g("<div />",{"class":"ui-pnotify-sticker",css:{cursor:"pointer",visibility:x.sticker_hover?"hidden":"visible"},click:function(){x.hide=!x.hide;
x.hide?w.pnotify_queue_remove():w.pnotify_cancel_remove();
g(this).trigger("pnotify_icon")
}}).bind("pnotify_icon",function(){g(this).children().removeClass(u.pin_up+" "+u.pin_down).addClass(x.hide?u.pin_up:u.pin_down)
}).append(g("<span />",{"class":u.pin_up})).appendTo(w.container);
(!x.sticker||x.nonblock)&&w.sticker.css("display","none");
x.icon!==false&&g("<div />",{"class":"ui-pnotify-icon"}).append(g("<span />",{"class":x.icon===true?x.type=="error"?u.error_icon:x.type=="info"?u.info_icon:x.type=="success"?u.success_icon:u.notice_icon:x.icon})).prependTo(w.container);
w.title_container=g("<h4 />",{"class":"ui-pnotify-title"}).appendTo(w.container);
x.title===false?w.title_container.hide():x.title_escape?w.title_container.text(x.title):w.title_container.html(x.title);
w.text_container=g("<div />",{"class":"ui-pnotify-text"}).appendTo(w.container);
x.text===false?w.text_container.hide():x.text_escape?w.text_container.text(x.text):w.text_container.html(x.insert_brs?String(x.text).replace(/\n/g,"<br />"):x.text);
typeof x.width=="string"&&w.css("width",x.width);
typeof x.min_height=="string"&&w.container.css("min-height",x.min_height);
w.pnotify_history=x.history;
w.pnotify_hide=x.hide;
var s=f.data("pnotify");
if(s==null||typeof s!="object"){s=[]
}s=x.stack.push=="top"?g.merge([w],s):g.merge(s,[w]);
f.data("pnotify",s);
x.stack.push=="top"&&w.pnotify_queue_position(1);
x.after_init&&x.after_init(w);
if(x.history){var q=f.data("pnotify_history");
typeof q=="undefined"&&(q=g("<div />",{"class":"ui-pnotify-history-container "+u.hi_menu,mouseleave:function(){q.animate({top:"-"+b+"px"},{duration:100,queue:false})
}}).append(g("<div />",{"class":"ui-pnotify-history-header",text:"Redisplay"})).append(g("<button />",{"class":"ui-pnotify-history-all "+u.hi_btn,text:"All",mouseenter:function(){g(this).addClass(u.hi_btnhov)
},mouseleave:function(){g(this).removeClass(u.hi_btnhov)
},click:function(){g.each(s,function(){this.pnotify_history&&(this.is(":visible")?this.pnotify_hide&&this.pnotify_queue_remove():this.pnotify_display&&this.pnotify_display())
});
return false
}})).append(g("<button />",{"class":"ui-pnotify-history-last "+u.hi_btn,text:"Last",mouseenter:function(){g(this).addClass(u.hi_btnhov)
},mouseleave:function(){g(this).removeClass(u.hi_btnhov)
},click:function(){var z=-1,y;
do{y=z==-1?s.slice(z):s.slice(z,z+1);
if(!y[0]){break
}z--
}while(!y[0].pnotify_history||y[0].is(":visible"));
if(!y[0]){return false
}y[0].pnotify_display&&y[0].pnotify_display();
return false
}})).appendTo(a),b=g("<span />",{"class":"ui-pnotify-history-pulldown "+u.hi_hnd,mouseenter:function(){q.animate({top:"0"},{duration:100,queue:false})
}}).appendTo(q).offset().top+2,q.css({top:"-"+b+"px"}),f.data("pnotify_history",q))
}x.stack.animation=false;
w.pnotify_display();
return w
}});
var o=/^on/,l=/^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,k=/^(focus|blur|select|change|reset)$|^key(press|down|up)$/,h=/^(scroll|resize|(un)?load|abort|error)$/,c=function(q,n){var d,q=q.toLowerCase();
document.createEvent&&this.dispatchEvent?(q=q.replace(o,""),q.match(l)?(g(this).offset(),d=document.createEvent("MouseEvents"),d.initMouseEvent(q,n.bubbles,n.cancelable,n.view,n.detail,n.screenX,n.screenY,n.clientX,n.clientY,n.ctrlKey,n.altKey,n.shiftKey,n.metaKey,n.button,n.relatedTarget)):q.match(k)?(d=document.createEvent("UIEvents"),d.initUIEvent(q,n.bubbles,n.cancelable,n.view,n.detail)):q.match(h)&&(d=document.createEvent("HTMLEvents"),d.initEvent(q,n.bubbles,n.cancelable)),d&&this.dispatchEvent(d)):(q.match(o)||(q="on"+q),d=document.createEventObject(n),this.fireEvent(q,d))
};
g.pnotify.defaults={title:false,title_escape:false,text:false,text_escape:false,styling:"bootstrap",addclass:"",cornerclass:"",nonblock:false,nonblock_opacity:0.2,history:true,width:"300px",min_height:"16px",type:"notice",icon:true,animation:"fade",animate_speed:"slow",opacity:1,shadow:true,closer:true,closer_hover:true,sticker:true,sticker_hover:true,hide:true,delay:8000,mouse_reset:true,remove:true,insert_brs:true,stack:{dir1:"down",dir2:"left",push:"bottom",spacing1:25,spacing2:25}}
})(jQuery);
(function(W){var E=W.fn.domManip,T="_tmplitem",F=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,V={},Q={},S,G={key:0,data:{}},N=0,U=0,K=[];
function P(b,k,a,f){var l={data:f||(f===0||f===false)?f:k?k.data:{},_wrap:k?k._wrap:null,tmpl:null,parent:k||null,nodes:[],calls:B,nest:z,wrap:y,html:A,update:C};
b&&W.extend(l,b,{nodes:[],parent:k});
if(a){l.tmpl=a;
l._ctnt=l._ctnt||l.tmpl(W,l);
l.key=++N;
(K.length?Q:V)[N]=l
}return l
}W.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){W.fn[a]=function(r){var q=[],o=W(r),e,p,c,d,f=this.length===1&&this[0].parentNode;
S=V||{};
if(f&&f.nodeType===11&&f.childNodes.length===1&&o.length===1){o[b](this[0]);
q=this
}else{for(p=0,c=o.length;
p<c;
p++){U=p;
e=(p>0?this.clone(true):this).get();
W(o[p])[b](e);
q=q.concat(e)
}U=0;
q=this.pushStack(q,a,o.selector)
}d=S;
S=null;
W.tmpl.complete(d);
return q
}
});
W.fn.extend({tmpl:function(e,f,a){return W.tmpl(this[0],e,f,a)
},tmplItem:function(){return W.tmplItem(this[0])
},template:function(a){return W.template(a,this[0])
},domManip:function(p,a,b){if(p[0]&&W.isArray(p[0])){var n=W.makeArray(arguments),l=p[0],c=l.length,e=0,o;
while(e<c&&!(o=W.data(l[e++],"tmplItem"))){}if(o&&U){n[2]=function(d){W.tmpl.afterManip(this,d,b)
}
}E.apply(this,n)
}else{E.apply(this,arguments)
}U=0;
!S&&W.tmpl.complete(V);
return this
}});
W.extend({tmpl:function(l,f,g,m){var b,a=!m;
if(a){m=G;
l=W.template[l]||W.template(null,l);
Q={}
}else{if(!l){l=m.tmpl;
V[m.key]=m;
m.nodes=[];
m.wrapped&&I(m,m.wrapped);
return W(M(m,null,m.tmpl(W,m)))
}}if(!l){return[]
}if(typeof f==="function"){f=f.call(m||{})
}g&&g.wrapped&&I(g,g.wrapped);
b=W.isArray(f)?W.map(f,function(c){return c?P(g,m,l,c):null
}):[P(g,m,l,f)];
return a?W(M(m,null,b)):b
},tmplItem:function(a){var d;
if(a instanceof W){a=a[0]
}while(a&&a.nodeType===1&&!(d=W.data(a,"tmplItem"))&&(a=a.parentNode)){}return d||G
},template:function(d,a){if(a){if(typeof a==="string"){a=H(a)
}else{if(a instanceof W){a=a[0]||{}
}}if(a.nodeType){a=W.data(a,"tmpl")||W.data(a,"tmpl",H(a.innerHTML))
}return typeof d==="string"?(W.template[d]=a):a
}return d?typeof d!=="string"?W.template(null,d):W.template[d]||W.template(null,F.test(d)?d:W(d)):null
},encode:function(b){return(""+b).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
}});
W.extend(W.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){V={}
},afterManip:function(c,a,h){var g=a.nodeType===11?W.makeArray(a.childNodes):a.nodeType===1?[a]:[];
h.call(c,a);
J(g);
U++
}});
function M(k,d,h){var a,l=h?W.map(h,function(b){return typeof b==="string"?k.key?b.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+T+'="'+k.key+'" $2'):b:M(b,k,b._ctnt)
}):k;
if(d){return l
}l=l.join("");
l.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(b,n,g,m){a=W(g).get();
J(a);
if(n){a=L(n).concat(a)
}if(m){a=a.concat(L(m))
}});
return a?a:L(l)
}function L(d){var a=document.createElement("div");
a.innerHTML=d;
return W.makeArray(a.childNodes)
}function H(a){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+W.trim(a).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(h,n,o,r,w,v,u){var p=W.tmpl.tag[o],q,t,s;
if(!p){throw"Unknown template tag: "+o
}q=p._default||[];
if(v&&!/\w$/.test(w)){w+=v;
v=""
}if(w){w=O(w);
u=u?","+O(u)+")":v?")":"";
t=v?w.indexOf(".")>-1?w+O(v):"("+w+").call($item"+u:w;
s=v?t:"(typeof("+w+")==='function'?("+w+").call($item):("+w+"))"
}else{s=t=q.$1||"null"
}r=O(r);
return"');"+p[n?"close":"open"].split("$notnull_1").join(w?"typeof("+w+")!=='undefined' && ("+w+")!=null":"true").split("$1a").join(s).split("$1").join(t).split("$2").join(r||q.$2||"")+"__.push('"
})+"');}return __;")
}function I(d,a){d._wrap=M(d,true,W.isArray(a)?a:[F.test(a)?a:W(a).html()]).join("")
}function O(b){return b?b.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null
}function D(c){var d=document.createElement("div");
d.appendChild(c.cloneNode(true));
return d.innerHTML
}function J(b){var c="_"+U,g,q,f={},s,a,r;
for(s=0,a=b.length;
s<a;
s++){if((g=b[s]).nodeType!==1){continue
}q=g.getElementsByTagName("*");
for(r=q.length-1;
r>=0;
r--){d(q[r])
}d(g)
}function d(t){var w,u=t,n,v,l;
if(l=t.getAttribute(T)){while(u.parentNode&&(u=u.parentNode).nodeType===1&&!(w=u.getAttribute(T))){}if(w!==l){u=u.parentNode?u.nodeType===11?0:u.getAttribute(T)||0:0;
if(!(v=V[l])){v=Q[l];
v=P(v,V[u]||Q[u]);
v.key=++N;
V[N]=v
}U&&x(l)
}t.removeAttribute(T)
}else{if(U&&(v=W.data(t,"tmplItem"))){x(v.key);
V[v.key]=v;
u=W.data(t.parentNode,"tmplItem");
u=u?u.key:0
}}if(v){n=v;
while(n&&n.key!=u){n.nodes.push(t);
n=n.parent
}delete v._ctnt;
delete v._wrap;
W.data(t,"tmplItem",v)
}function x(e){e=e+c;
v=f[e]=f[e]||P(v,V[v.parent.key+c]||v.parent)
}}}function B(f,g,h,e){if(!f){return K.pop()
}K.push({_:f,tmpl:g,item:this,data:h,options:e})
}function z(e,f,a){return W.tmpl(W.template(e),f,a,this)
}function y(a,e){var f=a.options||{};
f.wrapped=e;
return W.tmpl(W.template(a.tmpl),a.data,f,a.item)
}function A(e,f){var a=this._wrap;
return W.map(W(W.isArray(a)?a.join(""):a).filter(e||"*"),function(b){return f?b.innerText||b.textContent:b.outerHTML||D(b)
})
}function C(){var a=this.nodes;
W.tmpl(null,null,null,this).insertBefore(a[0]);
W(a).remove()
}})(jQuery);
/*
 * jQuery-ajaxTransport-XDomainRequest - v1.0.1 - 2013-10-17
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2013 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
(function(d){if(!d.support.cors&&d.ajaxTransport&&window.XDomainRequest){var g=/^https?:\/\//i;
var f=/^get|post$/i;
var e=new RegExp("^"+location.protocol,"i");
var c=/text\/html/i;
var b=/\/json/i;
var a=/\/xml/i;
d.ajaxTransport("* text html xml json",function(q,p,o){if(q.crossDomain&&q.async&&f.test(q.type)&&g.test(q.url)&&e.test(q.url)){var n=null;
var h=(p.dataType||"").toLowerCase();
return{send:function(m,l){n=new XDomainRequest();
if(/^\d+$/.test(p.timeout)){n.timeout=p.timeout
}n.ontimeout=function(){l(500,"timeout")
};
n.onload=function(){var s="Content-Length: "+n.responseText.length+"\r\nContent-Type: "+n.contentType;
var r={code:200,message:"success"};
var w={text:n.responseText};
try{if(h==="html"||c.test(n.contentType)){w.html=n.responseText
}else{if(h==="json"||(h!=="text"&&b.test(n.contentType))){try{w.json=d.parseJSON(n.responseText)
}catch(u){r.code=500;
r.message="parseerror"
}}else{if(h==="xml"||(h!=="text"&&a.test(n.contentType))){var v=new ActiveXObject("Microsoft.XMLDOM");
v.async=false;
try{v.loadXML(n.responseText)
}catch(u){v=undefined
}if(!v||!v.documentElement||v.getElementsByTagName("parsererror").length){r.code=500;
r.message="parseerror";
throw"Invalid XML: "+n.responseText
}w.xml=v
}}}}catch(t){throw t
}finally{l(r.code,r.message,w,s)
}};
n.onprogress=function(){};
n.onerror=function(){l(500,"error",{text:n.responseText})
};
var k="";
if(p.data){k=(d.type(p.data)==="string")?p.data:d.param(p.data)
}n.open(q.type,q.url);
n.send(k)
},abort:function(){if(n){n.abort()
}}}
}})
}})(jQuery);
var JSON;
if(!JSON){JSON={}
}(function(){function f(n){return n<10?"0"+n:n
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}
}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'
}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)
}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;
i<length;
i+=1){partial[i]=str(i,value)||"null"
}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;
return v
}if(rep&&typeof rep==="object"){length=rep.length;
for(i=0;
i<length;
i+=1){if(typeof rep[i]==="string"){k=rep[i];
v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;
return v
}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";
indent="";
if(typeof space==="number"){for(i=0;
i<space;
i+=1){indent+=" "
}}else{if(typeof space==="string"){indent=space
}}rep=replacer;
if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})
}
}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];
if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v
}else{delete value[k]
}}}}return reviver.call(holder,key,value)
}text=String(text);
cx.lastIndex=0;
if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})
}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j
}throw new SyntaxError("JSON.parse")
}
}}());
var TRUE_STRING_VALUE="true";
$.prototype.modalize=function(){this.on("click",function(){$("body").focus();
var a;
a=new modal($(this));
a.open()
});
return this
};
function modal(a){this.id=+new Date;
this.url;
this.dataId;
this.dataPath;
this.dataAjaxIsSecure=true;
this.dataDom;
this.dataClass;
this.dataWidth;
this.dataCallbackBeforeBuild;
this.callbackBeforeOpen;
this.dataCallbackBeforeOpen;
this.callbackAfterOpen;
this.dataCallbackAfterOpen;
this.callbackBeforeClose;
this.dataCallbackBeforeClose;
this.callbackAfterClose;
this.dataCallbackAfterClose;
this.scrollTop;
this.dataParams;
this.modalPositionedContainer;
this.modalPositionedContainerClass;
this.modalPositionType="tc";
this.wrapper;
this.modal;
this.container;
this.displayCloseButton=true;
this.closeButton;
this.closeWhenClickOutside;
this.timeInterval=180;
this.keepPage;
this.opacity;
this.handleOpacityIE;
this.wrapperFixed;
this.preventScroll=false;
this.topPositionBeforeOpen=0;
this.init=function(b){if(!b){return
}if(typeof b.attr("data-close")==="undefined"){this.closeWhenClickOutside=true
}else{this.closeWhenClickOutside=(b.attr("data-close")===TRUE_STRING_VALUE)
}this.dataWidth=b.attr("data-width");
this.dataId=b.attr("data-id");
this.dataPath=b.attr("data-path");
this.dataDom=b.attr("data-dom");
this.keepPage=b.attr("data-keepPage");
this.opacity=b.attr("data-opacity");
this.scrollTop=b.attr("data-scrollTop");
this.preventScroll=b.attr("data-preventScroll");
this.wrapperFixed=b.attr("data-wrapperFixed");
this.fullWxfullH=b.attr("data-fullWxfullH");
if(b.attr("data-isSecure")){this.dataAjaxIsSecure=b.attr("data-isSecure")=="true"
}this.dataClass=b.attr("data-class");
this.dataCallbackBeforeBuild=b.attr("data-callbackbeforebuild");
this.dataCallbackBeforeOpen=b.attr("data-callbackbeforeopen");
this.dataCallbackAfterOpen=b.attr("data-callbackafteropen");
this.dataCallbackBeforeClose=b.attr("data-callbackbeforeclose");
this.dataCallbackAfterClose=b.attr("data-callbackafterclose");
this.dataParams=b.attr("data-params");
this.modalPositionType=!b.attr("data-modalPositionType")?this.modalPositionType:b.attr("data-modalPositionType")
};
this.init(a);
this.modalPositionedContainerClass="modal_"+this.modalPositionType;
$(window).resize(this.resizeWindowHandler.bind(this))
}modal.prototype.buildArchitecture=function(){if(this.preventScroll=="true"){$("body").bind("touchmove",preventBrowserScroll)
}this.wrapper=$("<div/>").addClass("blackWrapper").addClass((this.wrapperFixed?"blackWrapperFixed":"")).css("opacity","0").css("background-color",(this.opacity?"rgba(0,0,0,"+this.opacity+")":""));
this.container=$("<div class='container'/>");
this.handleOpacityIE=$("<div class='opacityHandler'/>");
this.modal=$("<div class='modal'/>").addClass(this.dataClass);
if(this.fullWxfullH){this.modal.css({position:"absolute",top:0,bottom:0,left:0,right:0})
}this.closeButton=$("<div/>").addClass("closeButton "+CONFIGURATION.tagClickClass).attr("id","closeButtonModal").css("cursor","pointer");
this.closeButton.html("<p>"+CONFIGURATION.BACK_LABEL+"</p>");
this.modal.append(this.container);
this.wrapper.append(this.handleOpacityIE);
this.closeButton.insertBefore(this.container);
this.modalPositionedContainer=$("<div/>").addClass(this.modalPositionedContainerClass).css("opacity","1");
this.modalPositionedContainer.append(this.modal);
this.wrapper.append(this.modalPositionedContainer);
$("body").append(this.wrapper);
if(RESPONSIVE_MANAGER.isAllSmallMode()){this.modal.css("maxWidth","100%");
if(this.wrapperFixed){var a=this.dataWidth;
this.modal.css("cssText","width: "+a+" !important;")
}}else{var b=this.dataWidth;
this.modal.css("width",b)
}if(this.closeWhenClickOutside){var c=this;
this.wrapper.click(function(d){if($(d.target).is(".opacityHandler")){c.close()
}})
}this.closeButton.click(this.close.bind(this))
};
modal.prototype.open=function(){preventBackgroundFromScrolling();
this.topPositionBeforeOpen=$(window).scrollTop();
if(this.dataCallbackBeforeBuild){eval(this.dataCallbackBeforeBuild)
}this.buildArchitecture();
if(this.dataPath){var that=this;
getAjax(this.dataAjaxIsSecure,this.dataPath,function(data){that.afterAddContent(data)
},undefined,this.dataParams)
}else{if(this.dataDom){this.buildScroll();
this.afterAddContent($(this.dataDom).clone(true).show())
}else{if(this.dataId){this.afterAddContent($("<div></div>").attr("id",this.dataId))
}}}this.handlePageVisibility();
return true
};
modal.prototype.afterAddContent=function(data){this.container.html(data);
this.hackForAndroidTabletAfterAddContent();
var that=this;
if(this.dataCallbackBeforeOpen){eval(this.dataCallbackBeforeOpen)
}if(this.callbackBeforeOpen){this.callbackBeforeOpen.call()
}this.wrapper.animate({opacity:"1"},that.timeInterval*2,function(){if(that.dataCallbackAfterOpen){eval(that.dataCallbackAfterOpen)
}if(that.callbackAfterOpen){that.callbackAfterOpen.call()
}});
this.modalPositionedContainer.animate({opacity:"1"},that.timeInterval);
var replacingModalInterval;
that.container.find("input, textarea, select").blur(function(){replacingModalInterval=setInterval(function(){if(this.scrollTop){$("body").animate({scrollTop:0},300)
}clearInterval(replacingModalInterval)
},20)
});
if(RESPONSIVE_MANAGER.isAllSmallMode()&&!this.wrapperFixed){$("body").animate({scrollTop:0},300)
}that.container.find("input, textarea, select").focus(function(){clearInterval(replacingModalInterval)
});
if(RESPONSIVE_MANAGER.isAllSmallMode()){}LOADING_IMAGE_MANAGER.loadResponsiveImages(".modal");
that.container.find(".openModal").modalize();
that.buildScroll()
};
modal.prototype.closeAllModals=function(){$("body").removeClass("noscroll");
$(".blackWrapper").each(function(){$(this).animate({opacity:"0"},100,function(){$(this).remove()
})
});
CONFIGURATION.closeAll=false
};
modal.prototype.close=function(e){this.hackForAndroidTabletBeforeClose();
if(this.dataCallbackBeforeClose){eval(this.dataCallbackBeforeClose)
}if(this.callbackBeforeClose){this.callbackBeforeClose.call()
}if(CONFIGURATION.closeAll&&$(".blackWrapper").length>1){this.closeAllModals();
this.endModalClosing()
}else{var that=this;
this.modal.animate({opacity:"0"},this.timeInterval,function(){$(this).remove();
that.handlePageVisibility();
that.wrapper.animate({opacity:"0"},that.timeInterval,function(){$(this).remove();
that.endModalClosing()
})
})
}activeBackgroundScrolling()
};
modal.prototype.endModalClosing=function(){$(window).scrollTop($(window).scrollTop()+1);
$(window).scrollTop($(window).scrollTop()-1);
if(this.dataCallbackAfterClose){eval(this.dataCallbackAfterClose)
}if(this.callbackAfterClose){this.callbackAfterClose.call()
}if($(".blackWrapper").length<1){$("body").unbind("touchmove",preventBrowserScroll)
}if(RESPONSIVE_MANAGER.isAllSmallMode()){$("body").animate({scrollTop:this.topPositionBeforeOpen})
}};
modal.prototype.resizeWindowHandler=function(){if(!isIE_InfEq8){var a=this["dataWidth"];
this.modal.width(a)
}this.handlePageVisibility()
};
modal.prototype.handlePageVisibility=function(){if(RESPONSIVE_MANAGER.isAllSmallMode()){if($(".modal").length>0&&!this.keepPage){$(".page, .blackWrapper").hide();
if($(".modal").length==1){$(".blackWrapper").show()
}else{$(".blackWrapper:last-child").show()
}}else{if($(".modal").length<1){$(".page").show();
loadingImgs()
}}}};
modal.prototype.buildScroll=function(){var c=this.modal.find(".scrollbox");
var a=this.modal.find(".scrollable");
if(RESPONSIVE_MANAGER.isAllSmallMode()){return false
}if(a.get(0)===undefined||c.get(0)===undefined){return false
}var b=new BuildScroll();
b.init(a.eq(0),c.eq(0))
};
modal.prototype.containInput=function(){return this.container.find("input, textarea").not('input[type="hidden"],input[type="submit"]').length>0
};
modal.prototype.hackModalPosition=function(){return this.containInput()&&isAndroidTablet()
};
modal.prototype.hackForAndroidTabletAfterAddContent=function(){if(!this.hackModalPosition()){return
}$(".page").hide();
this.updateHeight();
$(window).resize(this.updateHeight.bind(this));
this.wrapper.css("position","absolute")
};
modal.prototype.updateHeight=function(){this.wrapper.height($(window).height())
};
modal.prototype.hackForAndroidTabletBeforeClose=function(){if(this.isLastModal()){$(".page").show()
}if(!this.hackModalPosition()){return
}$("body").animate({scrollTop:this.topPositionBeforeOpen})
};
modal.prototype.isLastModal=function(){return $(".modal").length==1
};
var errMsg="";
var errCode="";
function notifySuccess(a){}function notifyError(d,c,b){var a;
a=new modal();
a.dataDom=d;
a.dataWidth="60%";
a.dataCallbackBeforeBuild=c;
a.dataCallbackBeforeClose=b;
a.open()
}function disableSubmitSearchHeader(){if($("#searchHeaderInput").val()==""){$("#searchOkButton").attr("disabled","disabled")
}$("#searchHeaderInput").keyup(function(){if($(this).val()!=""){$("#searchOkButton").removeAttr("disabled")
}else{$("#searchOkButton").attr("disabled","disabled")
}})
}function initSearchHeaderAutocomplete(){autocompletion("searchHeaderInput","autocompletionSearchHeader",5,findSuggestions)
}function validHeaderSearch(b){$("#searchHeaderInput").blur();
b.preventDefault();
b.stopPropagation();
var a=CONFIGURATION.SEARCH_URL+"/"+strip_tags($("#searchHeaderInput").val().toLowerCase());
window.location=a
}var hackPositionForArtWall=function(){if($(".search").hasClass("target-on")){$(".artWallWraper").animate({top:$("#searchHeaderFormulaire").height()+"px"})
}else{$(".artWallWraper").animate({top:"0px"})
}};
function focusSearchInput(){if(RESPONSIVE_MANAGER.isAllSmallMode()&&$("#header").hasClass("headerLeftOn")){$(".headerLevel1").slideToggle(200,function(){$("#header").removeClass("headerLeftOn");
$("html, body").animate({scrollTop:0},"slow")
})
}if(window.location.href.indexOf("art-wall")>-1){hackPositionForArtWall()
}$("#searchHeaderInput").focus()
}var addToCardBubbleTimer=5000;
var SCROLL_TO_TOP_GAP_AS=25,SCROLL_TO_TOP_GAP_ML=10;
var networkName,DOM_LOADED=(typeof(DOM_LOADED)!="undefined")?DOM_LOADED:true,DOM_READY=false,IS_LOADING_DEVICE_TYPE=false,IS_DEVICE_TYPE_LOADED=true,IFRAME_READY=$.support.cors,IFRAME_COUNT=0,LOADED_DONE=false,LANDING_PAGE=false,SIZE_WISHLIST=0;
var DEFAULT_BACK_BTN_PROCESS=0,CHECKOUT_BACK_BTN_PROCESS=1;
var backBtnProcessFlag=DEFAULT_BACK_BTN_PROCESS;
var checkoutPageTypePosition=-1;
var mom_domain_name="";
var mom_renditions="";
var mom_init_path_array=new Array();
var mom_destination_path_array=new Array();
var sessionStorageTest={setItem:function(a,b){try{sessionStorage.setItem(a,b)
}catch(c){logDebug("no sessionStorage allowed")
}},getItem:function(a){var b;
try{b=sessionStorage.getItem(a)
}catch(c){logDebug("no sessionStorage allowed")
}return b
}};
var orientationEvent="resize";
var IE=(navigator.userAgent.indexOf("MSIE")>0);
var isIE_InfEq8=!($.support.leadingWhitespace);
var prefixes=["","-webkit-","-moz-","-o-"];
function getDeviceTypeEventCallback(){IS_DEVICE_TYPE_LOADED=true;
loaded()
}registerEvent("pageChanged",haveToScroll);
$.support.transition=(function(){var b=document.body||document.documentElement,c=b.style,a=c.transition!==undefined||c.WebkitTransition!==undefined||c.MozTransition!==undefined||c.MsTransition!==undefined||c.OTransition!==undefined;
return a
})();
var isBeforeIE10=!$.support.transition;
function getAjaxRoot(a){return(a)?CONFIGURATION.SECURE_AJAX_ROOT:CONFIGURATION.AJAX_ROOT
}function createsIFrame(){if($.support.cors){return
}$("<iframe/>",{src:getAjaxRoot(false)+CONFIGURATION.xdrproxyJsp+"?storeLang="+CONFIGURATION.STORE_LANG,id:getIframeId(false)}).css("display","none").appendTo(".page");
$("<iframe/>",{src:getAjaxRoot(true)+CONFIGURATION.xdrproxySecureJsp+"?storeLang="+CONFIGURATION.STORE_LANG,id:getIframeId(true)}).css("display","none").appendTo(".page");
$(window).on("message",function(b){var c="";
try{c=JSON.parse(b.originalEvent.data)
}catch(a){logError("can't parse : "+b.originalEvent.data)
}if(c.state){IFRAME_COUNT++;
if(IFRAME_COUNT==2&&!IFRAME_READY){IFRAME_READY=true;
loaded()
}}if($.isFunction(CONFIGURATION.XDR_CALLBACKS[c.id])){CONFIGURATION.XDR_CALLBACKS[c.id].call(this,c.data);
fireEvent("ajaxSucessViaIFrame",{url:c.url,data:c.data})
}})
}function getIframeId(a){return a?"xdrps":"xdrp"
}String.prototype.endsWith=function(a){return this.indexOf(a,this.length-a.length)!==-1
};
if(typeof String.prototype.startsWith!="function"){String.prototype.startsWith=function(a){return this.slice(0,a.length)==a
}
}var devicePlatform,resolutionWidth,resolutionHeight,orientation;
var absoluteContentHeight=0,relativeContentHeight=0;
var ua=navigator.userAgent.toLowerCase();
var isAndroid=ua.indexOf("android")>-1;
var isIdevice=navigator.userAgent.match(/(iPhone|iPod|iPad)/i);
function isAndroidTablet(){return !RESPONSIVE_MANAGER.isAllSmallMode()&&isAndroid
}var localStorageUrlsProductKey="CarouselUrlsProduct",localStorageUrlsParamSearch="CarouselParamSearch",localStorageStartingPage="CarouselStartingPage",localStorageFormNamePageNumber="CarouselFormNamePageNumber",localStorageCarouselTotalResult="CarouselTotalResult",localStorageCarouselTotalPage="CarouselTotalPage";
localStorageShareBitly="bitly_share_"+CONFIGURATION.FULL_URL;
localStorageCartReminderShown="CartReminderShown";
var localStorageBackBtn="BackBtn",localStorageFromCaroussel="FromCaroussel",localStorageCurrentUrl="currentUrl",localStorageSkuToScroll="skuToScroll",LocalStorageLoggedState="loggedState",LocalStorageCommerceHeader="commerceHeader",LocalStorageTimeOut="timeout",LocalStorageStoreLangMegaMenu="storeLangMegaMenu",LocalStorageStoreLangCommerceHeader="storeLangCommerceHeader",localStorageFromBackStoreDetailed="fromBackStoreDetailed";
localStorageShouldScrollToSku="shouldScrollToSku";
if(CONFIGURATION.currentModule!="collections"){$.jStorage.set(localStorageFromCaroussel,0)
}var cookieDispatchLocale="lv-dispatch";
var cookieDispatchUrl="lv-dispatch-url";
var cookieUserConsentDatas="lv-user-consent-datas";
var FROM_DETAILED_STORE_PAGE=false;
function handleBackButtonFromStoreDetailedPage(){FROM_DETAILED_STORE_PAGE=$.jStorage.get(localStorageFromBackStoreDetailed);
$.jStorage.set(localStorageFromBackStoreDetailed,false)
}handleBackButtonFromStoreDetailedPage();
$(document).ready(function(){if(CONFIGURATION.IS_CVG){DOM_READY=true;
createsIFrame();
loadDeviceType();
loaded()
}else{if(typeof specificLoadingEvent=="function"){specificLoadingEvent()
}}});
function loaded(){if(LOADED_DONE||!(DOM_READY&&DOM_LOADED&&IFRAME_READY)){return
}if(location.protocol.indexOf("https")>-1){detectPrivateMode(handleSafariPrivateMode)
}LOADED_DONE=true;
hasBeenOnConvergence();
loadCommerceHeaders();
attachInitEvents();
RESPONSIVE_MANAGER.checkResizeEvent();
loadingImgs();
loadingVideos();
loadingExpands();
loadingBubbles();
buildExternalLink();
buildNotCrawlableContent();
RESPONSIVE_MANAGER.keepMasterRatio();
if(CONFIGURATION.IS_CONTEXT_SET){initHeader()
}handleLoggedState();
RESPONSIVE_MANAGER.initResponsive();
RESPONSIVE_MANAGER.setModeValue();
handleScrollToSkuCategoryPage();
setTimeout(handleFooterDisplay,800);
scrollTopButton();
checkLVPAss();
orderLinksInFooter();
fixIosBadHeight();
fixIosAppleTag();
initPageTypeInfos();
if(typeof specificLoadingEvent=="function"){specificLoadingEvent()
}window.scrollTo(0,1);
$("body").addClass("page-type-"+this.CONFIGURATION.pageType);
if(CONFIGURATION.LOGIN_SUCCESS){handleDataCommerceUpdate(true)
}if(CONFIGURATION.LOGOUT_SUCCESS){handleDataCommerceUpdate(false)
}handleUserConsentDatasCookie()
}function loadDeviceType(){registerEvent("getDeviceTypeEvent",getDeviceTypeEventCallback);
if(!$.jStorage.get("deviceType")){getDeviceTypeFromUserAgent()
}}function loadAjaxDom(f,c,b){var d="DomAjaxStorage-";
var g=$(f);
var a=function(h){sessionStorageTest.setItem(d+c,h);
g.html(h);
if(b&&typeof(b)=="function"){b.call()
}};
var e=sessionStorageTest.getItem(d+c);
if(e){a(e)
}else{getAjax(false,c,a)
}}function handleFooterDisplay(){if(RESPONSIVE_MANAGER.isAllSmallMode()){$("#footer").find(".lilevel1").css("marginLeft","")
}else{var a=$("#footer").find(".footer-change-location.onlyML");
var c=$("#footer").find(".lilevel1").length;
var b=0;
$("#footer").find(".lilevel1").each(function(){b+=$(this).width()
});
$("#footer").find(".footer-menu-wrapper").css({left:parseInt(a.width())+parseInt(a.css("marginLeft")),right:20});
$("#footer").find(".lilevel1").css("marginLeft",parseInt(($(".footer-menu-wrapper").outerWidth()-b)/(c))+"px")
}}function scrollTopButton(){$("#returnTop").click(function(){$("html, body").animate({scrollTop:0},500)
})
}function scrollToElement(b,a){if(!a||a=="undifined"){a=500
}$("html, body").animate({scrollTop:b.offset().top},a)
}function initHeader(){loadMegaMenu();
initLeftMenuToggler();
initRightMenuToggler();
bindsMegaMenuOpeningEvent();
initSearch()
}function loadMegaMenu(){if(CONFIGURATION.currentModule!="home"){var a=sessionStorageTest.getItem("megaMenu");
var b=$.jStorage.get(LocalStorageStoreLangMegaMenu);
if(sessionStorageTest.getItem("megaMenu")==null||b!=CONFIGURATION.STORE_LANG){getAjax(false,"megaMenuJson.jsp",storeMegaMenuJson)
}else{buildMegaMenuJson(a)
}}else{megaMenuHasBeenLoaded()
}}function checkLocaleChangeForMegaMenu(){var a=$.jStorage.get(LocalStorageStoreLangMegaMenu);
if(a==null){$.jStorage.set("localeChange",0);
return 0
}else{if(a!=CONFIGURATION.STORE_LANG){$.jStorage.set("localeChange",1);
return 1
}else{return parseInt($.jStorage.get("localeChange"))
}}}function megaMenuHasBeenLoaded(){bindSubMegaMenuTitles();
$(document).trigger("megaMenuOpened",{})
}function storeMegaMenuJson(b){try{sessionStorageTest.setItem("megaMenu",b);
$.jStorage.set(LocalStorageStoreLangMegaMenu,CONFIGURATION.STORE_LANG);
buildMegaMenuJson(b)
}catch(a){if(a==QUOTA_EXCEEDED_ERR){buildMegaMenuJson(b)
}}}var buildMegaMenuJson=function(a){jsonHeader=$.parseJSON(a);
for(key in jsonHeader){var b=$("#hm-"+key);
if(!b.find(".mega-menu-container").length){b.append(htmlDecode(jsonHeader[key]))
}}megaMenuHasBeenLoaded()
};
function initLeftMenuToggler(){$("#togglerLeftMenu").click(function(){$("body").toggleClass("headerOn");
$(".mega-menu-container").css("display","");
$(".mega-menu-on").removeClass("mega-menu-on");
$(".headerLevel1").slideToggle(200,function(){$("#header").toggleClass("headerLeftOn");
$(this).css("display","")
})
})
}function initRightMenuToggler(){$(".togglerRightMenu").click(function(){$(this).toggleClass("toggled");
$(".header-right").toggleClass("toggled")
})
}function bindSubMegaMenuTitles(){$(".mega-menu li.mega-menu-item>div.mega-menu-title").click(function(){$(this).parents(".relative").find("img").addClass("postLoaderResponsive");
var a=$(this);
if(RESPONSIVE_MANAGER.isAllSmallMode()){if(!a.parent("li").is(".mega-menu-content-on")){$(".mega-menu-on>div.mega-menu-container").find("li.mega-menu-content-on>.mega-menu-content").slideToggle(200,function(){$(this).parent("li").removeClass("mega-menu-content-on")
})
}a.siblings(".mega-menu-content").slideToggle(200,function(){a.parent("li").toggleClass("mega-menu-content-on");
a.siblings(".mega-menu-content").css("display","")
})
}else{if(!a.parent("li").is(".mega-menu-content-on")){a.parents(".mega-menu-container").find("li.mega-menu-content-on").removeClass("mega-menu-content-on");
a.parent("li").toggleClass("mega-menu-content-on")
}}loadingImgs();
return $(this)
});
bindMegaMenuCloseButtonClick()
}function bindMegaMenuCloseButtonClick(){$(".mega-menu-close").click(function(){$(".mega-menu-on>div.mega-menu-container").each(function(){$(this).fadeOut(200,function(){$(this).parent(".mega-menu-on").removeClass("mega-menu-on").find(".mega-menu-content-on").removeClass(".mega-menu-content-on");
$(this).css("display","")
});
$(this).siblings(".header-title").find(".arrow-selected").fadeOut(200,function(){$(this).css("display","")
})
})
})
}function bindsMegaMenuOpeningEvent(){$(".headerLevel1>li.mega-menu>div.header-title").not(".bound").addClass("bound").click(function(){var a=$(this);
hackIEPosition();
if(RESPONSIVE_MANAGER.isAllSmallMode()){if(!a.parent("li").is(".mega-menu-on")){$(".mega-menu-on>div.mega-menu-container").slideToggle(300,function(){$(this).parent(".mega-menu").removeClass("mega-menu-on");
$(this).css("display","")
})
}a.find(".arrow-selected").css("display","block");
a.siblings(".mega-menu-container").find(".mega-menu-AS-picture").addClass("postLoaderResponsive").attr("data-currentCategory","reload");
a.siblings(".mega-menu-container").slideToggle(350,function(){a.parent(".mega-menu").toggleClass("mega-menu-on");
a.siblings(".mega-menu-container").css("display","");
a.find(".arrow-selected").css("display","");
loadingImgs()
});
setTimeout(function(){if(!a.parent(".mega-menu").hasClass("mega-menu-on")){var b=a.parent(".mega-menu").offset().top;
$("html, body").animate({scrollTop:b},500)
}},300);
return false
}else{if(!a.parent("li").is(".mega-menu-on")){$(".mega-menu-on").removeClass("mega-menu-on")
}a.parent("li").toggleClass("mega-menu-on");
if(!a.siblings(".mega-menu-container").find("li.mega-menu-content-on").length){a.siblings(".mega-menu-container").find(".mega-menu-title").first().click()
}RESPONSIVE_MANAGER.handleMegaMenuLeftPosition()
}})
}function initSearch(){try{if($("#searchHeaderFormulaire").size()===0){return
}$("#searchHeaderFormulaire").on("submit",validHeaderSearch);
initSearchHeaderAutocomplete();
disableSubmitSearchHeader();
if(!IE){$("#header-nav form input").focus(function(b){$(document).bind("touchmove",preventBrowserScroll);
$(document).scrollTop(0);
this.setSelectionRange(0,9999);
return false
}).mouseup(function(){return false
}).blur(function(){$(document).unbind("touchmove",preventBrowserScroll)
})
}}catch(a){logError("initSearch : "+a.message)
}}function hackIEPosition(){if(IE){setTimeout(function(){RESPONSIVE_MANAGER.handleMegaMenuLeftPosition()
},0)
}}var arrayIndexOfIE8=function(){Array.prototype.indexOf=function(b){var a=this.length>>>0;
var c=Number(arguments[1])||0;
c=(c<0)?Math.ceil(c):Math.floor(c);
if(c<0){c+=a
}for(;
c<a;
c++){if(c in this&&this[c]===b){return c
}}return -1
}
};
var SHOULD_SCROLL_TO_SKU;
function handleScrollToSkuCategoryPage(){SHOULD_SCROLL_TO_SKU=$.jStorage.get(localStorageShouldScrollToSku)=="true";
$.jStorage.set(localStorageShouldScrollToSku,"false")
}function callbackSearchHeaderOpened(){handleFixedHeader();
setContentSize()
}function handleFixedHeader(){if($(".header").css("position")!="fixed"){return
}var a=$(".header").height();
$(".content").css("padding-top",a);
addCssWithPrefix($(".content"),"transition","padding-top 0.3s")
}function addCssWithPrefix(c,a,d){for(var b=0;
b<prefixes.length;
b++){c.css(prefixes[b]+"transition",d)
}}function handleCartBubblePosition(){var e=$(window);
var b=$(".page");
var a=(e.width()-b.width())/2;
var d=(a==0)?0:a;
var c=$(".cart");
if(CONFIGURATION.STORE_TYPE==="shop"){$(".shopping-bag").css("right",-1*($(window).width()-c.offset().left-c.width())+13+d)
}}function handleCartIconBehaviour(){var b=$("#header-cart");
$(".cart").unbind("click");
var a=parseInt($("#header .always-displayed-first-menu-item .cart .count").html());
if(!a){b.addClass("empty-cart")
}else{b.removeClass("empty-cart")
}$(".cart").click(function(d){var c=$(this);
handleCartBubblePosition();
var f=parseInt($("#header .always-displayed-first-menu-item .cart .count").html());
if(!f){return false
}if(!RESPONSIVE_MANAGER.isAllSmallMode()){if($(d.target).parent(".cart").length){c.toggleClass("shopping-bag-on")
}if(!c.attr("data-imgloaded")){c.find("img").addClass("postLoaderResponsive");
loadingImgs();
c.attr("data-imgloaded","true");
handleProductDisplayMSB()
}}$(".momPictureWrapper").height($(".microShoppingBagImg").height())
});
$(".shopping-bag-close").unbind("click");
$(".shopping-bag-close").click(function(){$(".always-displayed-first-menu-item").find(".cart .shopping-bag").fadeOut(200,function(){$(this).parent(".cart").removeClass("shopping-bag-on");
$(this).css("display","")
});
$("#header .always-displayed-first-menu-item .cart .arrow-selected").fadeOut(200,function(){$(this).css("display","")
})
});
bindGoToCheckout()
}function handleMyLVBubblePosition(){var f=$(window);
var c=$(".page");
var b=(f.width()-c.width())/2;
var e=(b==0)?0:b;
var d=$("#header-mylv");
var a=d.offset()?d.offset().left:0;
$(".mylv-bubble").css("right",-1*(f.width()-a-d.width())+28+e)
}function handleMyLVIconBehaviour(){$("#header-mylv").unbind("click");
var a=$("#header-mylv");
handleMyLVBubblePosition();
a.on("click",function(b){if($(b.target).parent(".myLV").length){handleMyLVBubblePosition();
a.toggleClass("mylv-bubble-on");
$(".welcomePage").textfill({maxFontPixels:18})
}});
$(".mylv-bubble-close").unbind("click");
$(".mylv-bubble-close").click(function(){$(".header-right").find(".myLV .mylv-bubble").fadeOut(200,function(){$(this).parent(".myLV").removeClass("mylv-bubble-on");
$(this).css("display","")
});
$("#header .header-right .myLV .arrow-selected").fadeOut(200,function(){$(this).css("display","")
})
})
}function bindGoToCheckout(){$(".goToCheckout").unbind("click");
$(".goToCheckout").click(function(){$("#orderCheckout").click();
$("#orderCheckoutcart").click()
})
}function handleProductDisplayMSB(){var e=$("#msb_product_list li");
var a=0;
var f;
var b=0;
var d=new Array();
for(var c=1;
c<=e.size();
c++){f=$("#msb_product_list li:nth-child("+c+")");
d[b++]=f;
liHeight=f.outerHeight();
if(liHeight>a){a=liHeight
}}$.each(d,function(h,g){g.height(a)
})
}function strip_tags(html){if(arguments.length<3){html=html.replace(/<\/?(?!\!)[^>]*>/gi,"")
}else{var allowed=arguments[1];
var specified=eval("["+arguments[2]+"]");
if(allowed){var regex="</?(?!("+specified.join("|")+"))\b[^>]*>";
html=html.replace(new RegExp(regex,"gi"),"")
}else{var regex="</?("+specified.join("|")+")\b[^>]*>";
html=html.replace(new RegExp(regex,"gi"),"")
}}var clean_string=html;
return clean_string
}function loadingExpands(){$(".exp_title").each(function(){var obj=$(this);
var scope=obj.attr("data-scope");
if(obj.attr("data-binded")){return true
}var target=$("#"+obj.attr("data-target"));
var group=obj.attr("data-group");
var callback=obj.attr("data-callback");
var callbackAfterExpand=obj.attr("data-callbackAfterExpand");
obj.not(".bound").addClass("bound").click(function(){if(scope!==undefined&&!RESPONSIVE_MANAGER.isModeNamed(scope)){return false
}obj.toggleClass("target-on");
$("."+group+".expand-on").not(target).slideToggle().toggleClass("expand-on");
target.slideToggle("ease",function(){if(obj.attr("data-scroll")!=undefined){scrollToElement(obj)
}if(callbackAfterExpand){eval(callbackAfterExpand)
}});
target.toggleClass("expand-on");
$(".exp_title[data-group="+group+"]").not(this).removeClass("target-on");
if(target.find(".welcomePage").length){target.find(".welcomePage").textfill({maxFontPixels:23})
}if(callback){eval(callback)
}});
obj.attr("data-binded",true)
});
$(".exp_content").find("[class*='close']").not(".bound").addClass("bound").click(function(){var target=$(this).parent(".exp_content");
target.slideToggle("ease");
target.toggleClass("expand-on");
$("[data-target='"+target.attr("id")+"']").removeClass("target-on")
})
}function buildExternalLink(){$(".externalLink").each(function(c){var d=$(this);
var b=$.trim(d.text());
var a=d.attr("data-link");
d.hasClass("notLink")?d.attr("data-href",a):d.attr("href",a);
d.removeClass("externalLink");
d.removeAttr("data-link");
if(isIE_InfEq8){d.text(b)
}})
}function buildNotCrawlableContent(){$(".notCrawlableContent").each(function(a){var c=$(this);
var b=c.attr("data-htmlContent");
c.html(b);
c.removeClass("notCrawlableContent");
c.removeAttr("data-htmlContent")
})
}function preventBrowserScroll(a){if(!$(a.target).parents(".modal_tc").length){a.preventDefault()
}}function resetBrowserScroll(){$(document).unbind("touchmove",preventBrowserScroll)
}function attachInitEvents(){initDocumentClickEvent();
setTimeout(RESPONSIVE_MANAGER.checkResizeEvent.bind(RESPONSIVE_MANAGER),1000);
registerEvent("windowResize",RESPONSIVE_MANAGER.handleMegaMenuLeftPosition.bind(RESPONSIVE_MANAGER));
handleBodyClick();
handleSubMenuFooter();
bindAddressModals();
loadPlaceHolders();
$(".backOnTop").click(function(){$("html, body").animate({scrollTop:0},"ease")
});
document.onreadystatechange=function(){if(document.readyState=="complete"){fireEvent("documentComplete")
}}
}function handleBodyClick(){$("body").click(function(a){if($(a.target).attr("id")=="undefined"){$(".link").removeClass("hover");
$(".link").find(".level2").hide()
}})
}function handleSubMenuFooter(){$("ul.level1").find("li.link").each(function(a){$(this).click(function(b){if($(this).attr("class")!="link hover"){$("li.link").removeClass("hover").find(".level2").hide()
}$(this).toggleClass("hover");
$(this).find(".level2").slideToggle("fast")
})
})
}function initDocumentClickEvent(){$(document).on("click touchstart",handleDocumentClickDownEvent);
$(document).on("click touchend",handleDocumentClickEvent);
$(document).on("scroll touchmove",handleDocumentMoveEvent)
}function handleDocumentClickDownEvent(a){CONFIGURATION.SCROLL_DETECTED=false
}function handleDocumentMoveEvent(a){CONFIGURATION.SCROLL_DETECTED=true
}function handleDocumentClickEvent(c){if($(".formCurtain").is(":visible")||CONFIGURATION.SCROLL_DETECTED){CONFIGURATION.SCROLL_DETECTED=false;
return
}if($("#dispatchContent").length){return 1
}var b=$(c.target);
var d=!b.hasClass("exp_title")&&!b.parents().hasClass("exp_title")&&!b.hasClass("exp_content")&&!b.parents().hasClass("exp_content")&&!b.hasClass("hotstampingModal")&&!b.parents().hasClass("hotstampingModal")&&!b.parents().hasClass("blackWrapper");
if(!b.parents().hasClass("mega-menu")){if(RESPONSIVE_MANAGER.isAllSmallMode()){$("#header .mega-menu-on>div.mega-menu-container").each(function(){$(this).slideToggle(200,function(){$(this).parent(".mega-menu").removeClass("mega-menu-on");
$(this).css("display","")
})
})
}else{$("#header .mega-menu-on>div.mega-menu-container").each(function(){$(this).fadeOut(200,function(){$(this).parent(".mega-menu-on").removeClass("mega-menu-on").find(".mega-menu-content-on").removeClass(".mega-menu-content-on");
$(this).css("display","")
});
$(this).siblings(".header-title").find(".arrow-selected").fadeOut(200,function(){$(this).css("display","")
})
})
}}if(d){$(".expand-on").not(".openStateReminder").each(function(){$(this).slideToggle(200);
$(this).toggleClass("expand-on")
});
$(".target-on").not(".openStateReminder").removeClass("target-on")
}var a=$(".dropUp");
if(!a.is(b)&&a.has(b).length===0&&!b.hasClass("dropUpTrigger")&&!b.parents().hasClass("dropUpTrigger")){$(".dropUp.expand-on").slideToggle(200).toggleClass("expand-on");
$(".dropUpTrigger.target-on").removeClass("target-on")
}if(!b.parents().hasClass("cart")&&!b.hasClass("cart")){if(!RESPONSIVE_MANAGER.isAllSmallMode()){if($(".shopping-bag").length>0){$(".always-displayed-first-menu-item").css("z-index",100)
}$(".shopping-bag").css("z-index",101).fadeOut(200,function(){$(".cart").removeClass("shopping-bag-on");
$(this).css("display","");
$(".always-displayed-first-menu-item").css("z-index","");
$(this).css("z-index","")
});
$("#header .always-displayed-first-menu-item .cart .arrow-selected").fadeOut(200,function(){$(this).css("display","")
})
}}if(!b.parents().hasClass("myLV")&&!b.hasClass("myLV")){if(!RESPONSIVE_MANAGER.isAllSmallMode()){if($(".mylv-bubble").length>0){$(".header-right").css("z-index",100)
}$(".mylv-bubble").css("z-index",101).fadeOut(200,function(){$(".myLV").removeClass("mylv-bubble-on");
$(this).css("display","");
$(".header-right").css("z-index","");
$(this).css("z-index","")
});
$("#header .header-right .myLV .arrow-selected").fadeOut(200,function(){$(this).css("display","")
})
}}if(!b.hasClass("togglerRightMenu")&&$("#header .togglerRightMenu").is(":visible")&&!b.parents().hasClass("header-right")&&!b.parents().hasClass("search-form")){$("#header .togglerRightMenu").removeClass("toggled");
$("#header .header-right").css("z-index",101).fadeOut(200,function(){$(this).css("z-index","").removeClass("toggled").css("display","")
})
}}function bindAddressModals(){$(".openModal").each(function(){bindModal($(this))
})
}function bindModal(a){if(a.hasClass("openModal")){a.modalize();
a.removeClass("openModal")
}}function loadPlaceHolders(){$(".ajaxPlaceHolder").each(function(){loadPlaceHolder($(this))
})
}function loadPlaceHolder(placeHolder){var secure=placeHolder.attr("data-secure")!=null;
var url=placeHolder.attr("data-src");
var paramString=placeHolder.attr("data-parameters");
var params={};
eval("params ="+paramString);
getAjax(secure,url,function(data){placeHolder.html(data)
},params)
}function checkPageChange(){var a=$.jStorage.get("lvCurrentPage");
if(CONFIGURATION.currentPage!=a){$.jStorage.set("lvCurrentPage",CONFIGURATION.currentPage);
fireEvent("pageChanged")
}setTimeout(checkPageChange,500)
}function activeBackgroundScrolling(){$("body").removeClass("noscroll");
$("html").removeClass("noscroll");
$(".page").unbind("DOMMouseScroll mousewheel")
}function preventBackgroundFromScrolling(){$("body").addClass("noscroll");
$("html").addClass("noscroll");
$(".page").bind("DOMMouseScroll mousewheel",function(e){var g=$(this),f=this.scrollTop,d=this.scrollHeight,b=g.height(),h=(e.type=="DOMMouseScroll"?e.originalEvent.detail*-40:e.originalEvent.wheelDelta),a=h>0;
var c=function(){e.stopPropagation();
e.preventDefault();
e.returnValue=false;
return false
};
if(!a&&-h>d-b-f){g.scrollTop(d);
return c()
}else{if(a&&h>f){g.scrollTop(0);
return c()
}}})
}var disableFormSubject2=function(){$("#subject2").attr("disabled",true)
};
function closeAllClickableSubDiv(){$(".link").removeClass("hover").find(".level2").hide();
$("#filtersList").hide();
$("#months").hide();
$(".level1").find(".level2").hide()
}function addClosePlayerIcon(){$("<div/>",{"class":"videoPlayerCloseIcon"}).on("click",function(){$(".dimmerOverlay").click()
}).appendTo("#fcplayer_wrapper");
$("#fcplayer_container").mouseenter(function(){showVideoPlayerCloseIcon()
}).mouseleave(function(){hideVideoPlayerCloseIcon()
})
}function closeVideoPlayer(){$(".dimmerOverlay").click()
}function showVideoPlayerCloseIcon(){$(".videoPlayerCloseIcon").fadeIn()
}function hideVideoPlayerCloseIcon(){$(".videoPlayerCloseIcon").fadeOut("50")
}function loadingVideos(){$(".loadVideo").each(function(){loadPlayer(this)
});
registerEvent("videoStarts",function(){addClosePlayerIcon()
});
registerEvent("videoComplete",function(){closeVideoPlayer()
})
}function loadPlayer(c){var e=$(c);
var d=e.attr("data-file");
if(d!=""&&d!=undefined){var h=(e.attr("data-fullWidth")=="true"?true:false);
d=d.replace(/(\r\n|\n|\r)/gm,"");
d=replaceAll(d," ","");
var b=(e.attr("data-container")||e.attr("data-container")=="")?e.attr("data-container"):"fcplayer";
var f=e.attr("data-ratio")?e.attr("data-ratio"):16/9;
var g=e.attr("data-autostart")?"true":"false";
var k="";
if(!$("."+b).length){k="#"
}else{k="."
}if(h){windowHeight=$(k+b+"_container").parent().siblings(".fullWidthPicture").height();
windowWidth=$(window).width();
if(windowWidth/f>windowHeight){windowWidth=windowHeight*f
}$(k+b+"_container").css("width",windowWidth+"px");
$(window).resize(function(){if(!$(".page").hasClass("FC_fullscreen")){setTimeout(function(){windowHeight=$(k+b+"_container").parent().siblings(".fullWidthPicture").height();
windowWidth=$(window).width();
if(windowWidth/f>windowHeight){windowWidth=windowHeight*f
}$(k+b+"_container").css("width",windowWidth+"px");
fcplayer(b).resize(windowWidth,(windowWidth*1/f))
},200)
}})
}else{windowWidth=$(k+b+"_container").width();
$(window).resize(function(){if(!$(".page").hasClass("FC_fullscreen")){windowWidth=$(k+b+"_container").width();
fcplayer(b).resize(windowWidth,(windowWidth*1/f))
}})
}var a=CONFIGURATION.PREFIXE_URL_VIDEO+"?file="+d+"&width="+windowWidth+"&loc="+CONFIGURATION.STORE_LANG+"&autostart="+g+"&id="+b;
$.ajaxSetup({cache:true});
$.getScript(a);
e.removeClass("loadVideo")
}}function getDeviceTemporaryFunction(){return RESPONSIVE_MANAGER.isAllSmallMode()?"smartphone":"tablet"
}function setContentSize(){var c=$(window);
var b=$(".page");
var e=b.find("#header");
var d=b.find(".footer");
var a=b.find(".content");
ww=c.width();
wh=c.outerHeight();
$("body").css("height","100%");
$("body").css("overflow","visible");
$(".page").each(function(){var m=$(this);
var h=m.find("#header");
var k=m.find(".checkout_header");
var o=m.find(".footer");
var l=m.find(".content");
var g=(h.length?h.height():0)+(k.length?k.height():0);
var n=o.length?o.height():0;
var p=l.length?l.height():0;
relativeContentHeight=wh-g-n;
l.attr("data-relativeHeight",relativeContentHeight);
if(l.attr("data-scrollable")=="false"){l.css("height",(relativeContentHeight)+"px")
}else{if((l.attr("data-resize")===undefined||l.attr("data-resize")!="false")&&p<relativeContentHeight){l.css("min-height",(relativeContentHeight)+"px")
}}var f=navigator.appVersion;
if(f.indexOf("iPad")!=-1&&(f.indexOf("OS 4_")!=-1||f.indexOf("OS 3_")!=-1)){o.css("position","relative");
m.css("position",null).css("padding-bottom","0px")
}});
a.css("opacity",1);
$(window).scrollTop($(window).scrollTop()+1);
$(window).scrollTop($(window).scrollTop()-1)
}function postAjax(d,f,e,k,m,l,g){var b=(f)?CONFIGURATION.SECURE_AJAX_ROOT:CONFIGURATION.AJAX_ROOT;
if(e==undefined||e==null||e==""){}b+=e;
b+="?storeLang="+CONFIGURATION.STORE_LANG;
var a=AJAX_CACHE_MAP[e];
if(!f&&a==null){}if(a!=null){b+="&cache="+a
}if(m!=null){logError(m+" is not handled")
}for(var h in l){b+="&"+h+"="+l[h]
}if($.support.cors){$.ajax({type:"POST",url:b,data:d,xhrFields:{withCredentials:true},success:function(n){k(n)
},error:function(n){g(n)
}})
}else{var c=CONFIGURATION.XDR_CALLBACKS.push(k);
setTimeout(function(){document.getElementById(getIframeId(f)).contentWindow.postMessage(JSON.stringify({url:b,id:c-1,type:"POST",data:d}),"*")
},50)
}}function getAjax(f,e,k,l,d,g){var b=(f)?CONFIGURATION.SECURE_AJAX_ROOT:CONFIGURATION.AJAX_ROOT;
if(e==undefined||e==null||e==""){}b+=e;
b+="?storeLang="+CONFIGURATION.STORE_LANG;
var a=AJAX_CACHE_MAP[e];
if(!f&&a==null){}if(a!=null){b+="&cache="+a
}if(CONFIGURATION.currentModule!=null&&CONFIGURATION.currentModule!=""){b+="&module="+CONFIGURATION.currentModule
}if(CONFIGURATION.pageType!=null&&CONFIGURATION.pageType!=""){b+="&pageType="+CONFIGURATION.pageType
}if(CONFIGURATION.categoryParam!=null&&CONFIGURATION.categoryParam!=""){b+="&category="+CONFIGURATION.categoryParam
}for(var h in l){b+="&"+h+"="+l[h]
}if(d!=undefined){b+="&"+d
}logDebug(b);
var m;
if($.support.cors){m=$.ajax({type:"GET",url:b,success:k,error:g,cache:!f,xhrFields:{withCredentials:true}})
}else{var c=CONFIGURATION.XDR_CALLBACKS.push(k);
setTimeout(function(){document.getElementById(getIframeId(f)).contentWindow.postMessage(JSON.stringify({url:b,id:c-1,type:"GET"}),"*")
},50)
}return m
}function getMoMAjax(c,a,b){logDebug(a);
$.ajax({type:"GET",url:a,success:b})
}function postMoMAjax(c,a,b,e,d){logDebug(a);
$.ajax({type:"POST",url:a,data:d,success:b,error:e})
}function createMoMRenditions(k,b,h,e){var f=h.split("/");
var g="";
for(var d=1;
d<f.length;
d++){g=g+"/";
g=g+f[d]
}var a=k+"/MoMPicture/masterRendition";
var c="initPath="+b+"&destinationPath="+g+"&renditions="+e;
postMoMAjax(false,a,callbackSuccessMoMGeneration,callbackErrorMoMGeneration,c)
}function handleMoMRenditions(f){if(mom_init_path_array.length>f){var b=mom_destination_path_array[f];
var e=b.split("/");
var a="";
for(var d=1;
d<e.length;
d++){a=a+"/";
a=a+e[d]
}var c=mom_domain_name+"/MoMPicture/masterRendition";
var g="initPath="+mom_init_path_array[f]+"&destinationPath="+a+"&renditions="+mom_renditions;
postMoMAjax(false,c,function(){handleMoMRenditions(f+1)
},callbackOrderErrorMoMGeneration,g)
}else{callbackOrderErrorMoMGeneration()
}}function callbackSuccessMoMGeneration(){logDebug("Generation successfull")
}function callbackErrorMoMGeneration(){logDebug("Generation failed")
}function callbackOrderErrorMoMGeneration(){submitNextChainLink()
}function getGetParameter(d){var c=location.search.substring(1,location.search.length);
var b="";
var a=c.split("&");
for(i=0;
i<a.length;
i++){param_name=a[i].substring(0,a[i].indexOf("="));
if(param_name==d){b=a[i].substring(a[i].indexOf("=")+1)
}}return b
}function getReferrer(){var a=decodeURIComponent(getGetParameter("dr"));
if(a==null||a==""){a=document.referrer
}return a
}Function.prototype.bind=function(b){var a=this;
return function(){a.apply(b,arguments)
}
};
function replaceAll(a,b,c){return a.replace(new RegExp(b,"g"),c)
}if(!Object.keys){Object.keys=function(c){var b=[];
for(var a in c){if(c.hasOwnProperty(a)){b.push(a)
}}return b
}
}function getIndexInArray(c,b){for(var a=0;
a<c.length;
a++){if(b.toLowerCase()==c[a].toLowerCase()){return a
}}return -1
}function haveToScroll(){$(".page").append("<div class='hackIos' style='position:absolute;top:999999px;left:0px;width:100px;height:100px;'></div>");
setTimeout(function(){$(".hackIos").remove()
},50)
}function setImageModalSize(){if(!RESPONSIVE_MANAGER.isAllSmallMode()){$(".modal .container img").width($(window).width()*0.6)
}else{$(".modal .container img").width($(window).width())
}}function getDeviceTypeFromUserAgent(){if(IS_LOADING_DEVICE_TYPE){return
}IS_LOADING_DEVICE_TYPE=true;
getAjax(false,"getDeviceTypeFromUserAgent.jsp",function(a){var b=$.parseJSON(a);
if(b.device){$.jStorage.set("deviceType",b.device)
}else{$.jStorage.set("deviceType",getDeviceTypeWithBreakpoints())
}if(b.error){logDebug("Error to get Device Type : "+b.error)
}fireEvent("getDeviceTypeEvent");
IS_LOADING_DEVICE_TYPE=false
},{userAgent:navigator.userAgent})
}function getDeviceTypeWithBreakpoints(){if(RESPONSIVE_MANAGER.isSmallMode()){return"smartphone"
}else{if(RESPONSIVE_MANAGER.isMediumMode()){return"tablet"
}else{return"desktop"
}}}function isTablet(){return getDeviceType()=="tablet"
}function isSmartphone(){return getDeviceType()=="smartphone"
}function isDesktop(){return getDeviceType()=="desktop"
}function getDeviceType(){return(typeof(Storage)!=="undefined")?$.jStorage.get("deviceType"):getDeviceTypeWithBreakpoints()
}function pushStateWithHashFallback(a){if(window.history.pushState){window.history.pushState(null,null,a)
}else{window.location.hash=a
}}function getUrlBitly(a){if(a!=undefined){localStorageShareBitly="bitly_share_"+encodeURIComponent(a)
}if($.jStorage.get(localStorageShareBitly)){}else{getAjax(false,"bitly/getBitlyLink.jsp",function(b){b=JSON.parse(b);
$.jStorage.set(localStorageShareBitly,b.short_url)
},{longUrl:(a!=undefined)?encodeURIComponent(a):encodeURIComponent(CONFIGURATION.FULL_URL),convertToUTF8:true})
}}function shareWrapper(a){networkName=a;
continueShare()
}function continueShare(){var functionSelector=$(networkName).attr("id");
eval(functionSelector+"()")
}function sharePinterest(a,c){var b=a.attr("data-href");
b=b+"&media="+c;
a.attr("href",b)
}function shareWeibo(a,c){var b=a.attr("data-href");
b=b+"&pic="+c;
a.attr("href",b)
}function shareByMail(c){if(c==undefined){c=$.jStorage.get(localStorageShareBitly)
}var d=$("#shareByMail").attr("data-msg");
var a=$("#shareByMail").attr("data-subject");
var b=d.replace("[short_url]",c);
window.location="mailto:?subject="+encodeURIComponent(a)+"&body="+encodeURIComponent(b)
}function shareCartByMail(){var b=$("#shareByMail").attr("data-msg");
var a=$("#shareByMail").attr("data-subject");
window.location="mailto:?subject="+encodeURIComponent(a)+"&body="+encodeURIComponent(b)
}function startTestPerf(){window.start2=new Date().getTime();
$("#TEST_PERF").html("Begin...")
}function endTestPerf(){window.end2=new Date().getTime();
$("#TEST_PERF").html("D: "+(start2-end2)+" ")
}function playVideo(d){var b=$("#video_"+d+"_container").parents(".video");
var a=b.find(".fullWidthPicture");
var c=b.find(".videoContent");
c.css({position:"absolute",top:0,left:0,opacity:0,display:"block"});
c.animate({opacity:1},1000,function(){a.hide();
c.css({position:"relative"})
});
a.animate({opacity:0},800);
fcplayer("video_"+d).play()
}function playerReady(c){var b=$("#"+c.id+"_container");
if(b.hasClass("hideVideo")){$("#content").removeClass("handleVideoVisibility")
}if(typeof handleVideoDisplay=="function"){handleVideoDisplay()
}var a=fcplayer(c.id);
a.eventListener("jwplayerFullscreen",function(d){if(d.fullscreen){$(".page").addClass("FC_fullscreen")
}else{$(".page").removeClass("FC_fullscreen");
if(typeof handleContentAfterFullscreen=="function"){handleContentAfterFullscreen()
}}});
a.eventListener("jwplayerReady",function(d){fireEvent("videoStarts")
});
a.eventListener("jwplayerMediaComplete",function(d){fireEvent("videoComplete")
})
}function centerDiv(){$(".centerDivBackImg").each(function(){var a=$(this);
var h=a.attr("data-center");
var c=a.attr("data-mode");
var g=a.hasClass("onlyMediumLarge");
if(g&&!RESPONSIVE_MANAGER.isMediumLargeMode()&&!isIE_InfEq8){a.css("top","auto")
}else{var b=(h&&(!c||RESPONSIVE_MANAGER.isModeFromSuffix(c)))?$(h):a.parent();
var e=b.height();
var f=a.height();
var d=(e-f)/2;
a.css("top",d)
}})
}function switchTab(c){var d=$(".accordionPopinHeader");
var b=$(".accordionPopinPanel");
var a=$("."+c+"AccordionHeader");
if(!a.hasClass("active")){b.slideUp("normal");
a.next().stop(true,true).slideToggle("normal");
$(this).next().stop(true,true).slideToggle("normal");
d.removeClass("active");
a.addClass("active")
}else{b.slideUp("normal");
a.removeClass("active")
}}function loadCommerceHeaders(c){if(CONFIGURATION.STORE_LANG!=""){var d=$.jStorage.get(LocalStorageCommerceHeader);
var a=getCookie(LocalStorageStoreLangCommerceHeader);
var b=$.jStorage.get(LocalStorageTimeOut);
if(window.name==""){window.name=window.location.protocol
}if(d==null||a!=CONFIGURATION.STORE_LANG||b===null||(new Date().getTime())>=b+(600000)||window.name!=window.location.protocol||c){logDebug("setting localStorageCartReminderShown to false");
$.jStorage.set(localStorageCartReminderShown,false);
getCommerceHeader();
setCvgCookie(LocalStorageStoreLangCommerceHeader,CONFIGURATION.STORE_LANG,365,CONFIGURATION.DISPATCH_COOKIE_DOMAIN);
$.jStorage.set(LocalStorageTimeOut,new Date().getTime());
window.name=window.location.protocol
}else{callbackHtmlInJson(d)
}}else{handleCartIconBehaviour()
}}function getCommerceHeader(){getAjax(true,"loadCommerceHeadersJson.jsp",function(a){$.jStorage.set(LocalStorageCommerceHeader,a);
$.jStorage.set(LocalStorageStoreLangCommerceHeader,CONFIGURATION.STORE_LANG);
callbackHtmlInJson(a)
},{logout:CONFIGURATION.LOGOUT})
}function microShoppingBagCallback(b){var a=htmlDecode(b);
$("#header-cart").html(a);
$("#header-cart").removeAttr("data-imgloaded");
handleCartIconBehaviour()
}function callbackHtmlInJson(data){var parseData=JSON.parse(data);
for(var prop in parseData){if(window[prop+"Callback"]){var callbackFunction=eval(prop+"Callback");
if(typeof callbackFunction=="function"){callbackFunction(parseData[prop])
}}}}function loadMSB(){if(CONFIGURATION.STORE_TYPE=="shop"&&CONFIGURATION.STORE_LANG!=""){getAjax(true,"commerce/microShoppingBag.jsp",function(a){$("#header-cart").html(a);
$("#header-cart").removeAttr("data-imgloaded");
handleCartIconBehaviour()
})
}handleCartIconBehaviour()
}function reloadMSB(){if(CONFIGURATION.STORE_TYPE=="shop"&&CONFIGURATION.STORE_LANG!=""){$("#header-cart").find(".shopping-bag").fadeOut(200,function(){$(".shopping-bag-on").removeClass("shopping-bag-on");
$(this).css("display","");
loadMSB()
});
$("#header-cart").find(".arrow-selected").fadeOut(200,function(){$(this).css("display","")
})
}}function loadWish(){}function reloadWish(){if(CONFIGURATION.STORE_LANG!=""){$(".wishlist-on").removeClass("wishlist-on");
loadWish()
}}function cardHeaderContentCallback(b){var a=htmlDecode(b);
$(".menu-cart").html(a);
bindAddressModals()
}function wishlistHeaderContentCallback(b){var a=htmlDecode(b);
$("#header-wish").html(a)
}function myLvHeaderContentCallback(b){var a=htmlDecode(b);
$("#header-mylv").html(a);
handleMyLVIconBehaviour();
$("#fakemylv-bubbleSignIn").click(function(){$(".mylv-bubble").find("*[id*=loginSubmit]").click()
});
$("#fakemylv-bubbleSendPwd").click(function(){$(".mylv-bubble").find("*[id*=forgotPasswordSubmit]").click()
});
textfillWidthCount=0;
setTextfillWidth();
handleForgotPwdLinks();
handleCancelLinks();
showShoppingBagReminderMessage()
}function setTextfillWidth(){textfillWidthCount++;
logDebug("setTextfillWidth : "+textfillWidthCount);
if(textfillWidthCount>=10){return
}try{$(".onlyAS .welcomePage.textfill").css("width",$(".onlyAS .mylv_left_menu-content").get(0).getBoundingClientRect().width);
$(".welcomePage").textfill({maxFontPixels:23})
}catch(a){setTimeout(function(){setTextfillWidth()
},200)
}}function myLvLeftMenuContentCallback(b){var a=htmlDecode(b);
$("#mylvAsExpandContent").html(a);
handleMyLVIconBehaviour();
$("#fakemylv_left_menuSignIn").click(function(){$(".mylv_left_menu").find("*[id*=loginSubmit]").click()
});
$("#fakemylv_left_menuSendPwd").click(function(){$(".mylv_left_menu").find("*[id*=forgotPasswordSubmit]").click()
});
handleForgotPwdLinks();
handleCancelLinks()
}function menuMylvHeaderCallback(b){var a=htmlDecode(b);
if(CONFIGURATION.STORE_LANG!=""){$("#submitLogout").click(function(){$(".mylv #logoutSubmit").click()
})
}}function handleForgotPwdLinks(){$(".forgot-pwd-link").not(".bound").addClass("bound").click(function(){var a=$(this).parents(".authentication-wrapper");
a.find(".sign-in-mode").slideToggle(200);
setTimeout(function(){a.find(".pwd-mode").slideToggle(200)
},300)
})
}function handleCancelLinks(){$(".cancelMyLVSendPwd").not(".bound").addClass("bound").click(function(){var a=$(this).parents(".authentication-wrapper");
a.find(".pwd-mode").slideToggle(200);
setTimeout(function(){a.find(".sign-in-mode").slideToggle(200)
},300)
})
}function showShoppingBagReminderBubble(){handleSBRBubblePosition();
this.showPopin=function(){if(!$(".mylv-bubble").is(":visible")){setTimeout(function(){$("#sb-reminder-bubble, #sb-reminder-arrow-selected").fadeIn();
this.handleClosePopinClick()
},800)
}};
this.hidePopin=function(){setTimeout(function(){$("#sb-reminder-bubble, #sb-reminder-arrow-selected").fadeOut()
},4000)
};
this.handleClosePopinClick=function(){$("#sb-reminder-bubble #closePopin").click(function(){$("#sb-reminder-bubble, #sb-reminder-arrow-selected").fadeOut()
})
};
showPopin();
hidePopin();
handleClosePopinClick();
$(window).resize(function(){handleSBRBubblePosition()
})
}function handleSBRBubblePosition(){var g=$(window),d=$(".page"),c=(g.width()-d.width())/2,f=(c==0)?0:c,e=$("#header-shoppingBag"),b=e.offset()?e.offset().left:0,h=$("#header-shoppingBag").position(),a=$(".sb-reminder-bubble");
$("#sb-reminder-bubble").css("right",-1*(g.width()-b-e.width())+28+f)
}function displayCartReminderCallback(c){var b=htmlDecode(c);
$("#header-sb-reminder").html(b);
var a=$.jStorage.get(localStorageCartReminderShown);
logDebug("displayCartReminderCallback : shown = "+a);
if(!a&&!RESPONSIVE_MANAGER.isAllSmallMode()){showShoppingBagReminderBubble()
}logDebug("setting localStorageCartReminderShown to true anyway to avoid repetition");
$.jStorage.set(localStorageCartReminderShown,true)
}function toggleCreateProfileForm(){$(".globalErrors li").html("");
if(RESPONSIVE_MANAGER.isAllSmallMode()){$("#createNewProfile").toggleClass("hide");
$("#loadCreateProfileSubmit").hide();
$("html, body").animate({scrollTop:($("#createNewProfile").offset().top)},1000)
}else{$("#createNewProfile").toggleClass("hide");
$("#toggleViewIdent").toggleClass("hide");
if(!$(".modal").size()){setContentSize()
}}}function arrangeSelector(a){var b=a.split(".").join("");
b=b.split("#").join("");
b=b.split(" ").join("");
return b
}function adaptCartModalPosition(a){if(RESPONSIVE_MANAGER.isAllSmallMode()){var c=$(a).offset().top
}else{var b=$(".header").height()-$(window).scrollTop();
var c=(b>=0?b:0);
$(".modal_addTocart .modal").css("margin-top",c+5)
}}function handleModalPlaceIncart(){handleProductPopinPositionAddCart();
loadingImgs();
closecartModal()
}function handleModalPlaceIncartFromWishlist(){handleProductPopinPositionAddCart();
loadingImgs();
closecartModal()
}function closecartModal(){setTimeout(function(){$(".cartModalHeader .closeButton").click()
},addToCardBubbleTimer)
}function closeModal(){$(".blackWrapper:last").find(".modal .closeButton").click()
}function htmlDecode(a){return $("<div/>").html(a).text()
}function logDebug(a){if(CONFIGURATION.LOGGING&&window.console!=undefined){console.log(a)
}}function logMobile(a){var c=$("#logMobile");
if(CONFIGURATION.LOGGING){clearTimeout(CONFIGURATION.mobileConsole);
CONFIGURATION.mobileConsole=null;
if(!c.length){var d=$("<div id='logMobile'/>").css({"z-index":999,position:"fixed",background:"rgba(0,0,0,0.8)",color:"white",top:"0",left:"0",right:"0",height:"180px",overflow:"hidden"});
var b=$("<ul/>");
$("body").append(d.append(b));
c=$("#logMobile")
}CONFIGURATION.mobileConsole=setTimeout(function(){c.fadeOut(750)
},6000);
c.find("ul").append($("<li/>").html(a));
c.fadeIn(200,function(){$("#logMobile").animate({scrollTop:"500000"},500)
})
}}function logError(a){if(CONFIGURATION.LOGGING&&window.console!=undefined){console.error(a)
}}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)
};
var startAnalizeTime;
function startTimeAnalyse(){startAnalizeTime=new Date().getTime()
}function printTimeAnalyse(a){endTime=new Date().getTime()
}function SlideshowOption(){this.navigMode="thumbs";
this.heightMode="default";
this.displayArrows=true;
this.isAnalyticCalled=false;
this.AnalyticSection="";
this.lastPageX=-1;
this.isAnalyticCalledAtInit=true;
this.allowVerticalScroll=false
}function addSmartphoneAddress(){if(RESPONSIVE_MANAGER.isAllSmallMode()){$("#currentAddressFormHolder").removeClass("hide");
$("#addressSelector, #addNewAddr").addClass("hide");
$("#cancelButtonAddress").toggleClass("showCancel")
}}function handleCreateandEditNewAddress(){if(RESPONSIVE_MANAGER.isAllSmallMode()){$("#addNewAddr").click(function(){addSmartphoneAddress()
});
$(".addressEdit").each(function(){$(this).click(function(){handleAddressModalSmartphone()
})
});
$(".validateAddress").each(function(){$(this).click(function(){$("#updateAddressSubmit").click()
})
})
}}function handleAddressModalSmartphone(){$("#currentAddressFormHolder").removeClass("hide");
$("#addressSelector, #addressEditor .title").addClass("hide");
$("#cancelButtonAddress").toggleClass("showCancel")
}function editSmartphoneAddress(){if(RESPONSIVE_MANAGER.isAllSmallMode()){$("#currentAddressFormHolder").addClass("hide");
$("#addressSelector, #addNewAddr, #addressEditor .title").removeClass("hide");
$("#cancelButtonAddress").toggleClass("showCancel")
}}function copyLoginToResetPasswordForm(){var a=$("#login").val();
$("#forgotPasswordForm #email").val(a)
}function getCheckoutUrlsKeys(){return Object.keys(CONFIGURATION.CHECKOUT_URLS)
}function redirectBackButton(){switch(backBtnProcessFlag){case CHECKOUT_BACK_BTN_PROCESS:window.location.href=CONFIGURATION.CHECKOUT_URLS[getCheckoutUrlsKeys()[checkoutPageTypePosition]];
break;
default:goBack()
}}function initPageTypeInfos(){var b=sessionStorageTest.getItem("prevPageType");
if(CONFIGURATION.pageType==b){return
}var a;
if(b===null){backBtnProcessFlag=DEFAULT_BACK_BTN_PROCESS
}else{a=getCheckoutUrlsKeys();
checkoutPageTypePosition=$.inArray(b,a);
if(checkoutPageTypePosition!==-1){backBtnProcessFlag=CHECKOUT_BACK_BTN_PROCESS
}else{backBtnProcessFlag=DEFAULT_BACK_BTN_PROCESS
}}sessionStorageTest.setItem("prevPageType",CONFIGURATION.pageType)
}function goBack(){if(parseInt(sessionStorageTest.getItem("inSite"))){window.history.back()
}else{window.location=(BACK_BUTTON.homeURL==""?window.history.back():BACK_BUTTON.homeURL)
}}function hasBeenOnConvergence(){if(window.name==""){sessionStorageTest.setItem("inSite","0")
}else{sessionStorageTest.setItem("inSite","1")
}}function myLVGenericLogout(a){logDebug("#logoutSubmit_"+a);
$("#logoutSubmit_"+a).click()
}function scrollToError(){if(!$(".form-line.error:visible").length){return false
}var f;
var b;
var e=$("#header");
var d=$(".modal").length;
var c=$(".form-line.error:visible:first").find("input:visible, select:visible");
var a=$("body, html");
if(RESPONSIVE_MANAGER.isAllSmallMode()){f=SCROLL_TO_TOP_GAP_AS
}else{f=SCROLL_TO_TOP_GAP_ML
}if(!c.length&&$(".form-line.dateOfBirth.error").length){c=$(".form-line.dateOfBirth.error select:first")
}if(e.css("position")==="fixed"){b=c.offset().top-e.height()-f;
if($(".bt-content").length){b=$(".bt-content").offset().top-e.height()-f
}}else{b=c.offset().top-f;
if($(".bt-content").length){b=$(".bt-content").offset().top-f
}}if(d){c=$(".modal .form-line.error:visible:first").find("input:visible");
b-=$(".modal").offset().top;
a=c.parents(".scroll-content")
}c.focus();
(b?a.animate({scrollTop:b},"ease"):"")
}function checkLVPAss(){if(getGetParameter("lvpass")=="true"){var a=CONFIGURATION.staticDomainName+CONFIGURATION.lvpassNodePath+"/lvpass.css";
loadOverFile(a,"css")
}}function loadOverFile(a,b){if(b=="js"){var c=document.createElement("script");
c.setAttribute("type","text/javascript");
c.setAttribute("src",a)
}else{if(b=="css"){var c=document.createElement("link");
c.setAttribute("rel","stylesheet");
c.setAttribute("type","text/css");
c.setAttribute("href",a)
}}if(typeof c!="undefined"){document.getElementsByTagName("head")[0].appendChild(c)
}}$.fn.serializeObject=function(){var c={};
var b=this.serializeArray();
$.each(b,function(){if(c[this.name]!==undefined){if(!c[this.name].push){c[this.name]=[c[this.name]]
}c[this.name].push(this.value||"")
}else{c[this.name]=this.value||""
}});
return c
};
function showShoppingBag(){var a;
a=new modal();
a.dataPath="shoppingBag/bubbleShoppingBagReminder.jsp";
a.dataClass="cartModalHeader";
a.modalPositionedContainerClass="modal_addTocart";
a.dataCallbackBeforeOpen="closecartModal()";
a.dataCallbackAfterOpen="bindAddressModals()";
a.opacity="0.2";
a.keepPage="true";
a.scrollTop="false";
a.preventScroll="true";
a.open()
}function showPriceButton(){$(".priceButton").css("visibility","visible")
}function checkStockLevel(a,c,d){logDebug("skuId = "+a+" index = "+c);
var b;
if(a.split(",").length>1){b=a.split(",")
}else{b=[a]
}getAjax(true,"getStockLevel.jsp",function(k){var f=$.parseJSON(k);
var h=false;
for(var g=0;
g<b.length;
g++){if(f[b[g]]["inStock"]){h=true;
break
}}if(d!=undefined&&typeof d==="function"){d(f)
}utag_data.product_stock=h;
if(window.stockReadyEvent!=undefined){fireEvent(stockReadyEvent,document)
}if(h){$("#addToCartFormHolder"+c).removeClass("hide");
var e=false;
for(var g=0;
g<b.length;
g++){if(f[b[g]]["backOrder"]){e=true;
break
}}$("#addToCartFormHolder"+c+".inStockButton").removeClass("hide");
if(e){$("#backOrderFormHolder"+c+".backOrderButton").removeClass("hide")
}else{$("#pickupShopHolder"+c).removeClass("hide")
}}else{$("#notInStock"+c).removeClass("hide");
$("#addToCartFormHolder"+c).addClass("hide")
}if(window.showPriceButton){showPriceButton();
showPriceButtonMessage()
}},{skuIdList:b},null)
}function orangeRightArrowHandler(){$(".arrow-right:visible").each(function(){var b=$(this);
if(!b.prev().html()){b.prev().hide();
b.hide()
}var a=(b.next().height())*0.5;
if(!b.hasClass("bound")){a=(b.next().height()+8)/2;
b.addClass("bound");
if(b.parents(".fullDetailsSharePriceButton")&&a>20){b.parents(".fullDetailsSharePriceButton").css("height",a+61).find(".removeShare").css("bottom",a+28)
}}b.css({"border-top-width":a,"border-bottom-width":a,"border-left-width":a});
if(a>30){b.css({"border-left-width":30});
a=(b.next().height())*0.5;
b.css({"border-top-width":a,"border-bottom-width":a})
}})
}function HsOptionsFunctionCart(){var a=$("#HSOptionsFormId").serializeObject();
var b=JSON.stringify(a);
if(a.initials==""){logDebug("initials vides");
$("#tableHsOptionsCart").disabled=true
}else{logDebug("initials non vides = "+a.initials);
$("#tableHsOptionsCart").disabled=false;
$("#tableHsOptionsCart").attr("value",b)
}}function MomOptionsFunctionCart(){var b=$("#momOptionsFormId").serializeObject();
var a=JSON.stringify(b);
$("#tableMomOptionsCart").disabled=false;
$("#tableMomOptionsCart").attr("value",a)
}function addDot(b){b=b.replace(/\./g,"");
for(var a="",c=0;
c<b.length;
c++){a+=b[c]+((c!=b.length-1)?".":"")
}return a
}function handleInitial(){$(".ihsOptionsValue").each(function(){if($(this).hasClass("dotClass")){var b=this;
var a=$.trim($(this).text());
$(b).html(addDot(a))
}})
}function bindShareCartByMail(){$("#shareByMail").click(function(){shareCartByMail()
})
}function handleShareAnimation(a){if(networkName=="facebook"){window.open("https://www.facebook.com/sharer/sharer.php?u="+a.content.longUrl)
}else{if(networkName=="pinterest"){window.open("http://www.pinterest.com/pin/create/button/?url="+a.content.longUrl+"&description="+a.content.title+"&media="+a.content.mediaUrl)
}else{if(networkName=="twitter"){window.open("https://twitter.com/intent/tweet?url="+a.content.shortUrl)
}else{if(networkName=="weibo"){window.open("http://service.weibo.com/share/share.php?title="+a.content.title+"&url="+a.content.longUrl+"&pic="+a.content.mediaUrl)
}else{if(networkName=="googlePlus"){window.open("https://plus.google.com/share?url="+a.content.longUrl)
}}}}}}(function(a){a.fn.when=function(c){c=c.split(/\s+/);
var b=[];
a.each(this,function(d,g){var e=a(g),f=[];
a.each(c,function(k,l){var h=a.Deferred(),m=function(n){h.resolve();
e.unbind(l,m)
};
f.push(h);
e.bind(l,m)
});
b.push(a.when.apply(null,f))
});
return a.when.apply(null,b)
}
})(jQuery);
function isInArray(c,d){for(var a=0,b=d.length;
a<b;
a++){if(d[a]==c){return true
}}return false
}function is_touch_device(){return"ontouchstart" in window||window.navigator.msMaxTouchPoints
}function loadingBubbles(){$(".bubble-action").each(function(){var b=$(this);
var a=b.attr("data-source");
b.bt({trigger:"hover",clickAnywhereToClose:true,fill:"#FFFFFF",width:300,strokeStyle:"#E2E2E2",spikeLength:0,spikeGirth:0,positions:["top"],cornerRadius:0,closeWhenOthersOpen:true,contentSelector:"$('."+a+"').html()",postShow:function(c){$(c).find("#closeButton").click(function(){b.btOff()
})
}});
b.click(function(){b.btOn()
});
b.removeClass("bubble-action")
})
}function handleScrollDownAnimation(){timerAnimation=window.setTimeout(function(){if(!($(window).scrollTop()>=5)){$(".scroll-arrow-container").animate({opacity:1,bottom:"10%"},"linear").animate({bottom:"5%"},"ease")
}},3000)
}function removeJsonItem(b,a){var d=$(".wlii_"+b+" .imageWrapper");
var c=d.attr("data-index");
a.list.splice(parseInt(c),1);
sortAndDisplayProducts()
}function showCurtain(c){if(c==undefined){c="Main"
}logDebug("showCurtain : "+c);
var b=$("#formCurtain"+c);
var a=0.7;
if(b.attr("data-opacity")!=undefined){a=b.attr("data-opacity")
}if(curtainCountMap[c]==undefined){curtainCountMap[c]=0
}curtainCountMap[c]++;
if(curtainCountMap[c]==1){$(document).bind("touchmove",preventBrowserScroll);
b.animate({opacity:a},150).css("display","block")
}}function hideCurtain(a){if(a==undefined){a="Main"
}logDebug("hideCurtain : "+a);
if(curtainCountMap[a]==undefined){curtainCountMap[a]=0
}if(curtainCountMap[a]>0){curtainCountMap[a]--
}if(curtainCountMap[a]==0){resetBrowserScroll();
$("#formCurtain"+a).animate({opacity:"0"},150).css("display","none")
}}function fixIosBadHeight(){if($(".page").attr("data-fullHeight")=="true"&&navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)&&window.innerHeight!=document.documentElement.clientHeight){var a=function(){document.documentElement.style.height=window.innerHeight+"px";
if($(document).scrollTop()!==0){window.scrollTo(0,0)
}}.bind(this);
window.addEventListener("orientationchange",a,false);
a();
$("body").css("webkitTransform","translate3d(0,0,0)")
}}function fixIosAppleTag(){if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)){if(/OS [1-7](.*) like Mac OS X/i.test(navigator.userAgent)){var a=document.createElement("meta");
a.name="apple-mobile-web-app-capable";
a.content="yes";
document.getElementsByTagName("head")[0].appendChild(a)
}}}function shareListener(){$(".sharePinterest").on("click",function(){var a=$(this);
sharePinterest(a,retrieveImageData("pinterest"))
});
$(".shareWeibo").on("click",function(){var a=$(this);
shareWeibo(a,retrieveImageData("weibo"))
})
}function orderLinksInFooter(){orderContextualSeoLinks();
orderSitemapLinks()
}function orderContextualSeoLinks(){var c=$("#nonOrderedSeoLinks li");
var b=c.length;
var a;
if(b%3==0){a=((b-b%3)/3)
}else{a=((b-b%3)/3)+1
}for(i=1;
i<4;
i++){for(j=0;
j<a;
j++){$("#nonOrderedSeoLinks li:first").remove().appendTo("#columnSeoLinks"+i)
}}}function orderSitemapLinks(){var a=$("#nonOrderedSitemapLinks li");
var c=a.length;
var b;
if(c%3==0){b=((c-c%3)/3)
}else{b=((c-c%3)/3)+1
}for(i=1;
i<4;
i++){for(j=0;
j<b;
j++){$("#nonOrderedSitemapLinks li:first").remove().appendTo("#columnSitemapLinks"+i)
}}}function showShoppingBagReminderMessage(){var a=$(".shopping-bag-reminder span");
a.css("opacity",0);
setTimeout(function(){a.css("opacity",1)
},500)
}function handleLoggedState(){if($.jStorage.get(LocalStorageLoggedState)==null){$.jStorage.set(LocalStorageLoggedState,false)
}utag_data.logged_state=$.jStorage.get(LocalStorageLoggedState)
}function handleDataCommerceUpdate(a){logDebug("handleDataCommerceUpdate : "+a);
getCommerceHeader();
$.jStorage.set(LocalStorageLoggedState,a);
fireEvent("loggedStateChanged",{Statut:a?"logged":"logout"});
handleLoggedState()
}function showPriceButtonMessage(){var a="";
if(($(".priceButton").find(".sellable").length)!=0){if(!$("#notInStock").hasClass("hide")){a=$("#notInStock").find("span").attr("data-msg")
}else{a=$("#addToCart").find("span").attr("data-msg")
}}else{if(($(".priceButton").find(".notSellable").length)!=0){if(($(".priceButton").find("#cscSellable").length!=0)){a=$("#cscSellable").attr("data-msg")
}else{a=$("#notSellable").attr("data-msg")
}}}$("#priceBtnMsg").html(a);
$("#priceBtnMsg").fadeIn()
}function handleModalPlaceInWishList(){handleProductPopinPositionWishlist();
loadingImgs();
closecartModal()
}function handleModalPlaceInWishListUrlMom(a){if(a){var b=$("#productMainImage").attr("src");
$(".productVisual img:visible").attr("src",b)
}}function adaptWishlistModalPosition(a){if(isSmartphoneMode()){var b=$(a).offset().top
}}function setCvgCookie(c,k,f,g){var h=new Date();
h.setTime(h.getTime()+(f*24*60*60*1000));
var b="expires="+h.toGMTString();
var a="domain="+g;
var e=c+"="+k+"; path=/;"+b+";"+a;
logDebug("creating cookie: "+e);
document.cookie=e
}function getCookie(d){var b=d+"=";
var a=document.cookie.split(";");
for(var e=0;
e<a.length;
e++){var f=$.trim(a[e]);
if(f.indexOf(b)==0){return f.substring(b.length,f.length)
}}return""
}function handleSafariPrivateMode(a){if(a&&/Safari/.test(window.navigator.userAgent)&&getCookie("privateModeAlert")!=="true"){showPrivateModeMessage();
setCvgCookie("privateModeAlert","true",365,CONFIGURATION.DISPATCH_COOKIE_DOMAIN)
}}function showPrivateModeMessage(){privateModal=new modal();
privateModal.dataDom="#privateModeMessage";
privateModal.dataWidth="50%";
privateModal.dataHeight="50%";
privateModal.open()
}function handleUserConsentDatasCookie(){if(getConsentDatasCookie()){logDebug("Consent Datas Cookie Already Set!")
}else{logDebug("Consent Datas Cookie Not Set!");
$("#userConsentDatas").fadeIn("slow");
$("#userConsentCloseBtn").on("click",function(a){$("#userConsentDatas").fadeOut("slow");
setConsentDatasCookie()
});
$("a").each(function(){var a=$(this).attr("href");
if(a&&a!=="#"&&a.indexOf("javascript")===-1){$(this).on("click",setConsentDatasCookie)
}})
}}function getConsentDatasCookiePrefix(){return CONFIGURATION.IS_CONTEXT_SET?CONFIGURATION.STORE_LANG:"dispatch"
}function getConsentDatasCookie(){return getCookie(getConsentDatasCookiePrefix()+cookieUserConsentDatas)
}function setConsentDatasCookie(){setCvgCookie(getConsentDatasCookiePrefix()+cookieUserConsentDatas,"true",395,CONFIGURATION.DISPATCH_COOKIE_DOMAIN)
}function resetConsentDatasCookie(){setCvgCookie(getConsentDatasCookiePrefix()+cookieUserConsentDatas,"true",-1,CONFIGURATION.DISPATCH_COOKIE_DOMAIN)
}function handleProductPopinPositionWishlist(){var a;
if(RESPONSIVE_MANAGER.isAllSmallMode()){$(".cartModalHeader").css({position:"fixed",left:"auto",right:"0"});
$(".popinArrowSelected ").hide()
}else{if(RESPONSIVE_MANAGER.isMediumLargeMode()&&$("#header-wish").is(":visible")){a=($("#header-wish").offset().left-$(".cartModalHeader").width())+30;
$(".cartModalHeader").css({position:"fixed",left:a});
$(".popinArrowSelected ").show()
}else{$(".popinArrowSelected ").fadeOut();
$(".cartModalHeader").css({left:"auto",right:"0"})
}}}function loadingImgs(b,a){LOADING_IMAGE_MANAGER.loadResponsiveImages(b,a);
LOADING_IMAGE_MANAGER.postLoaderImage()
}var LOADING_IMAGE_MANAGER=new (function(){this.roundingImageFactor=1;
this.loadResponsiveImages=function(u,C){var D=0,v=0,B={},w=false;
var x=this;
function A(){D++;
if(D==v){centerDiv();
fireEvent("endImagesLoad");
logDebug("endImagesLoad");
if(w){loadingImgs()
}}}var z=u||"";
var y=[];
$(z+" .postLoaderResponsive").each(function(){var H=$(this);
var I=b(H);
var G=d(I);
var E=H.attr("data-currentcategory");
var F=H.attr("data-factorwidth")||1;
if(E&&E==G){return
}if(!H.parent().is(":visible")){return
}v++;
y.push(H)
});
$(y).each(function(J,L){var O="",H="",K=L;
imageWidth=c(B,K);
var I=RESPONSIVE_MANAGER.getResponsiveAttributeKey(K,"data-src");
var E=RESPONSIVE_MANAGER.getAttributeFromKey(K,I);
var F=d(E);
if(F){O=q(K,x,E,F,C)
}else{O=s(K,x,E)
}var N=function(){var Q=RESPONSIVE_MANAGER.getResponsiveAttributeKey(K,"data-default");
var P=RESPONSIVE_MANAGER.getAttributeFromKey(K,Q);
logDebug("loadResponsiveImages() - Can't load this image: \""+O+'"');
if(P!=undefined&&P!=""){K.attr(I,P);
K.attr("data-currentcategory","default");
K.attr(Q,"");
w=true
}o(K);
A()
};
var M=function(){e(K,O);
K.attr("data-currentcategory",F);
fireEvent("imageLoaded");
o(K,C);
A()
};
var G=new Image();
if(!E||E==""){N()
}else{$(G).load(M).on("error",N).attr("src",O)
}})
};
function q(y,u,B,A,w){var x=y.attr("data-factorwidth")||1;
imageWidth=Math.round(imageWidth*x);
var v=u.getNearestImageConfig(imageWidth,A);
var z={opacity:1,width:m(y)?"":"100%"};
if(w!="no-height"){z.height=u.getImageHeight(imageWidth,v.rendition)
}y.css(z);
y.attr("src","");
if(!m(y)){y.addClass("imageNotLoaded")
}imgUrl=u.buildUrlImageScene7(B,v,imageWidth);
return imgUrl
}function s(w,v,x){x.replace(CONFIGURATION.Scene7PresetParam,"");
var u=x.split("?");
return u[0]?u[0]:x
}this.buildUrlImageScene7=function(w,v,u){u=this.roundToNearestN(u,this.roundingImageFactor);
imageHeight=Math.round(this.getImageHeight(u,v.rendition));
w=w.replace(CONFIGURATION.Scene7PresetParam,v.preset);
w=w.replace(CONFIGURATION.Scene7WidthParam,u);
w=w.replace(CONFIGURATION.Scene7HeightParam,imageHeight);
return w
};
function o(v,u){if(u!="no-height"){v.height("")
}v.animate({opacity:1},500);
v.removeClass("imageNotLoaded")
}function e(u,v){if(m(u)){u.css("background-image","url("+v+")");
u.css("width","")
}else{u.attr("src",v)
}}function m(u){return u.attr("data-isBackgroundImage")&&u.attr("data-isBackgroundImage")=="true"
}function n(u){if(u=="shoppingCartSummaryThumb"||u=="multiShippingThumb"){return false
}return parseInt(a(CONFIGURATION.RENDITIONS[getDeviceTemporaryFunction()][u]))
}function a(u){u+="";
return parseInt(u.split("x")[0])
}function f(u){return parseInt(g(CONFIGURATION.RENDITIONS[getDeviceTemporaryFunction()][u]))
}function g(u){u+="";
return parseInt(u.split("x")[1])
}function f(u){return parseInt(g(CONFIGURATION.RENDITIONS_CONVERGENCE[u]))
}this.getNearestRendition=function(u,y){if(typeof(window.devicePixelRatio)!="undefined"&&window.devicePixelRatio>1){u*=window.devicePixelRatio
}var x=CONFIGURATION.RENDITIONS_CONVERGENCE[y][0];
for(var w=0;
w<CONFIGURATION.RENDITIONS_CONVERGENCE[y].length;
w++){var v=CONFIGURATION.RENDITIONS_CONVERGENCE[y][w];
if(a(CONFIGURATION.RENDITIONS_CONVERGENCE[y][w])>=u){x=v
}else{return x
}}return x
};
this.getNearestImageConfig=function(u,y){if(typeof(window.devicePixelRatio)!="undefined"&&window.devicePixelRatio>1){u*=window.devicePixelRatio
}var x=CONFIGURATION.RENDITIONS_CONVERGENCE[y][0];
for(var w=1;
w<CONFIGURATION.RENDITIONS_CONVERGENCE[y].length;
w++){var v=h(CONFIGURATION.RENDITIONS_CONVERGENCE[y][w]);
if(a(v)>=u){x=CONFIGURATION.RENDITIONS_CONVERGENCE[y][w]
}else{return p(x)
}}return p(x)
};
function h(u){return Object.keys(u)[0]
}function l(u){return u[h(u)]
}function p(u){return{rendition:h(u),preset:l(u)}
}this.roundToNearestN=function(u,v){return v==1?u:v*Math.round(u/v)
};
function c(w,v){var u=v.parent();
if(w[u.attr("class")]===undefined){return w[u.attr("class")]=u.width()
}else{return w[u.attr("class")]
}}this.getImageHeight=function(u,v){return u*g(v)/a(v)
};
function t(){for(var u in CONFIGURATION.RENDITIONS_CONVERGENCE){var v=CONFIGURATION.RENDITIONS_CONVERGENCE[u];
v.sort(k())
}}function k(){return function(v,u){if(a(v)<a(u)){return 1
}else{if(a(v)>a(u)){return -1
}}return 0
}
}function d(v){for(var u in CONFIGURATION.RENDITIONS_CONVERGENCE){if(v&&v.indexOf("_"+u)!=-1){return u
}}return undefined
}function r(v){var u;
var w={WM1:["the3womensParis_WM1.jpg","the3womenNightParis_WM1.jpg","beigeBagBlondLouisVuitton_WM1.png"],WM3:["beigeBagBlondLouisVuitton_WM3.png"],WM4:["the3womensParis_WM4.jpg"]};
imagesNames=w[v];
u=imagesNames[Math.floor(Math.random()*imagesNames.length)];
return CONFIGURATION.TECH_ASSETS_PATH+"homePage/"+u
}function b(u){return RESPONSIVE_MANAGER.getResponsiveAttribute(u,"data-src")
}this.postLoaderImage=function(){$(".postLoadImage").each(function(){$image=$(this);
$image.attr("src",$image.attr("data-src"));
$image.removeClass("postLoadImage");
$image.removeAttr("data-src")
})
}
});
var RESPONSIVE_MANAGER=new (function(){var l=[];
var b;
var m=$(window).width();
var h=$(window).height();
var d;
this.initResponsive=function(){this.setModeValue();
b=getOrientation();
$("meta[name=orientation]").attr("content",b);
fireEvent("orientationMetaSetted");
registerEvent("leave-MediumLarge-breakpoint",this.handleEnterAS.bind(this));
registerEvent("leave-AllSmall-breakpoint",this.handleEnterML.bind(this));
registerEvent("windowResize",this.windowResizeHandler.bind(this));
registerEvent("windowResize",this.keepMasterRatio.bind(this));
$(window).resize(this.handleResize.bind(this))
};
this.isXtraSmallMode=function(){return this.isModeNamed("XtraSmall")
};
this.isAllSmallMode=function(){return this.isModeNamed("AllSmall")
};
this.isSmallMode=function(){return this.isModeNamed("Small")
};
this.isMediumMode=function(){return this.isModeNamed("Medium")
};
this.isMediumLargeMode=function(){return this.isModeNamed("MediumLarge")
};
this.isLargeMode=function(){return this.isModeNamed("Large")
};
this.isModeNamed=function(o){if(isIE_InfEq8){return this.handleModeNonResponsiveBrowser(o)
}return this.getMediaQueryFromModeName(o)&&window.matchMedia(this.getMediaQueryFromModeName(o)).matches
};
this.setModeValue=function(){this.updateResponsiveMode()
};
if(typeof(window.matchMedia)=="undefined"){window.matchMedia=function(s){var o=true;
var r=s.split("and");
for(var p=0;
p<r.length&&o;
p++){var t=r[p];
if(t.indexOf("max-width")!=-1){o=$(window).width()<=parseInt(t.split(":")[1])
}else{if(t.indexOf("min-width")!=-1){o=$(window).width()>=parseInt(t.split(":")[1])
}}}var q={};
q.matches=o;
return q
}
}this.handleEnterAS=function(){this.handleTransitionMegaMenuML_AS();
loadingImgs()
};
this.handleEnterML=function(){this.handleTransitionMegaMenuAS_ML();
loadingImgs()
};
this.handleModeNonResponsiveBrowser=function(q){var p=this.getSuffixFromMode(q);
for(var o=0;
o<CONFIGURATION.suffixesWithoutResponsiveJson.length;
o++){if(CONFIGURATION.suffixesWithoutResponsiveJson[o]==p){return true
}}return false
};
this.isModeFromSuffix=function(o){var p=this.getModeFromSuffix(o);
return this.isModeNamed(p)
};
this.getModeFromSuffix=function(p){for(var o=0;
o<CONFIGURATION.BREAKPOINTS_ARRAY.length;
o++){if(CONFIGURATION.BREAKPOINTS_ARRAY[o]["suffix"].toLowerCase()==p.toLowerCase()){return CONFIGURATION.BREAKPOINTS_ARRAY[o]["mode"]
}}return""
};
this.getSuffixFromMode=function(p){for(var o=0;
o<CONFIGURATION.BREAKPOINTS_ARRAY.length;
o++){if(CONFIGURATION.BREAKPOINTS_ARRAY[o]["mode"].toLowerCase()==p.toLowerCase()){return CONFIGURATION.BREAKPOINTS_ARRAY[o]["suffix"]
}}return""
};
this.buildModeNameToMediaQuery=function(){d={};
for(var o=0;
o<CONFIGURATION.BREAKPOINTS_ARRAY.length;
o++){d[CONFIGURATION.BREAKPOINTS_ARRAY[o]["mode"]]=CONFIGURATION.BREAKPOINTS_ARRAY[o]["mediaQuery"]
}};
this.getMediaQueryFromModeName=function(o){if(!d){this.buildModeNameToMediaQuery()
}return d[o]
};
function a(){var t=$(window).width();
var p=$(window).height();
var q=$(document).width();
var s=$(document).height();
var o=screen.width;
var r=screen.height;
alert("\nWindow: "+t+"x"+p+"\nDocument: "+q+"x"+s+"\nScreen: "+o+"x"+r)
}var e=0;
this.handleResize=function(){fireEvent("windowResize");
e++;
var o=this;
setTimeout((function(p,q){return function(){q.checkResize(p)
}
})(e,o),100)
};
this.windowResizeHandler=function(){this.updateResponsiveMode();
this.handleBubbles();
this.handleMegaMenuLeftPosition();
handleMyLVBubblePosition();
this.handleMegaMenu();
handleCartIconBehaviour();
handleCartBubblePosition();
centerDiv();
handleFooterDisplay();
if($(".hotstampingModal").length>0){calculateCoordinate()
}};
this.updateResponsiveMode=function(){var p=l;
var r=g(p);
l=[];
for(var o=0;
o<CONFIGURATION.BREAKPOINTS_ARRAY.length;
o++){if(this.isModeNamed(CONFIGURATION.BREAKPOINTS_ARRAY[o]["mode"])){l.push(CONFIGURATION.BREAKPOINTS_ARRAY[o]["mode"])
}}var q=g(l);
c(q,p,"leave");
c(r,l,"enter");
k(p,q)
};
function k(o,p){if(n(o,p)){$(".postLoaderResponsive").attr("data-currentcategory","reload")
}}function n(q,p){for(var o=0;
o<q.length;
o++){if(!p[q[o]]){return true
}}return false
}function g(q){var p={};
for(var o=0;
o<q.length;
o++){p[q[o]]=true
}return p
}function c(r,q,p){for(var o=0;
o<q.length;
o++){if(!r[q[o]]){fireEvent(p+"-"+q[o]+"-breakpoint")
}}}this.checkResize=function(o){if(o==e){if(m==$(window).width()&&h==$(window).height()){return
}logDebug("Resize Done");
loadingImgs();
this.launchResize()
}};
this.handleMegaMenuLeftPosition=function(){if(!this.isAllSmallMode()){if($("#headerLeft").find(".mega-menu-on").length){$(".mega-menu-on .mega-menu-container").css("left",($(".page").width()-$(".mega-menu-on .mega-menu-container").width())/2)
}}};
this.handleMegaMenu=function(){if(!this.isAllSmallMode()){$(".headerLevel1").css("display","block");
if($("#headerLeft").find(".mega-menu-on").length){if(!$("#headerLeft").find(".mega-menu-on").find(".mega-menu-content-on").length){$("#headerLeft").find(".mega-menu-on").find(".mega-menu-container").find("li").first().addClass("mega-menu-content-on")
}else{$("#headerLeft").find(".mega-menu-on").find("img").attr("data-currentcategory","reload")
}}}};
function f(){var o=$(".cart");
if(CONFIGURATION.STORE_TYPE==="shop"){$(".shopping-bag").css("right",-1*($(window).width()-o.offset().left-o.width())+13)
}if(this.isMediumMode()){if($("#header").find(".shopping-bag-on").length){$("#header").find(".header-right").addClass("toggled");
$("#header").find(".togglerRightMenu").addClass("toggled")
}else{$("#header").find(".header-right").removeClass("toggled");
$("#header").find(".togglerRightMenu").removeClass("toggled")
}}}this.handleTransitionMegaMenuML_AS=function(){if($("#headerLeft").find(".mega-menu-on").length){$("#header").addClass("headerLeftOn");
$(".headerLevel1").css("display","")
}else{$("#header").removeClass("headerLeftOn");
$(".headerLevel1").css("display","")
}};
this.handleTransitionMegaMenuAS_ML=function(){if($("#headerLeft").find(".mega-menu-on").length){setTimeout(function(){$(".mega-menu-on").find("li.mega-menu-content-on").find(".mega-menu-title").first().click()
},200)
}};
this.launchResize=function(){logDebug("launchResize");
m=$(window).width();
h=$(window).height();
this.updateOrientation();
fireEvent("resizeEvent");
if(typeof specificResizeEvent=="function"){specificResizeEvent()
}};
this.updateOrientation=function(){var o=getOrientation();
if(o!=b){fireEvent("orientationChanged",{orientation:o});
b=o
}};
this.checkResizeEvent=function(){if(m!=$(window).width()||h!=$(window).height()){this.launchResize()
}setTimeout(this.checkResizeEvent.bind(this),500)
};
this.handleBubbles=function(){if($(".bt-active").length&&window.innerWidth!=m){$(".bt-active").btOff()
}};
this.keepMasterRatio=function(){var o=this;
$(".keepMasterRatio").each(function(){var r=$(this);
var p=o.getMasterFromMode(r);
var q=r.width();
R=LOADING_IMAGE_MANAGER.getNearestRendition(q,p);
r.height(LOADING_IMAGE_MANAGER.getImageHeight(q,R))
})
};
this.getMasterFromMode=function(o){return this.getResponsiveAttribute(o,"data-ratio")
};
this.getResponsiveAttributeKey=function(q,v){var p=v+"-";
for(var t=0,s=q.get(0).attributes,o=s.length;
t<o;
t++){var r=s.item(t).nodeName;
if(r.startsWith(p)){var u="_"+r.replace(p,"");
if(this.isModeFromSuffix(u)){return r
}}}return v
};
this.getResponsiveAttribute=function(o,p){return o.attr(this.getResponsiveAttributeKey(o,p))
};
this.getAttributeFromKey=function(p,o){return p.attr(o)
}
})();
function getOrientation(){return $(window).width()>$(window).height()?"landscape":"portrait"
}function getIndexInArray(c,b){for(var a=0;
a<c.length;
a++){if(b.toLowerCase()==c[a].toLowerCase()){return a
}}return -1
}if(("standalone" in window.navigator)&&window.navigator.standalone){var noddy,remotes=false;
document.addEventListener("click",function(a){noddy=a.target;
while(noddy.nodeName!=="A"&&noddy.nodeName!=="HTML"){noddy=noddy.parentNode
}if("href" in noddy&&noddy.href.indexOf("http")!==-1&&(noddy.href.indexOf(document.location.host)!==-1||remotes)){a.preventDefault();
document.location.href=noddy.href
}},false)
}function onLogin(){showCurtain();
$(".ajaxPlaceHolder.userprofiling").each(function(){loadPlaceHolder($(this))
});
hideCurtain()
}function onLogout(){showCurtain();
$(".ajaxPlaceHolder.userprofiling").each(function(){loadPlaceHolder($(this))
});
hideCurtain()
}function onUpdateAddressBook(){};