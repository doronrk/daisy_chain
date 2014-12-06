var textOnImg;
var nbInitials=3;
var widthImageWrapper=0;
var ihsElementPopin;
var toneOnToneColorLabel="";
var toneOnTone;
var toneOnToneColor;
var textOnImgShadowColor;
var coordinateX,coordinateY;
var fontSize;
var selectorColorDefault=".hotstampingModal #hotStampingColor_1";
var iHsStorage={};
var textOnImgTop=0;
var textOnImgLeft=0;
var skuId="";
var localStorageChanged=false;
var colorCodeToneOnToneATG="BE8B76";
var ftSize=0;
var coordinateXinitial="";
var coordinateYinitial="";
var verticalUrl="",dotUrl="",initialsUrl="",displayColorUrl="",colorUrl="";
var reset=false;
var tagClickClass="";
var alreadyLaunch=false;
var currentColorCode="",currentColorName="",verticalDisplay=false,dotsDisplay=false,initialsText="";
var INITIALS_SAVED="";
function launchHotStamping(){if(!hsDeactivate&&!alreadyLaunch){buildElementTextOnImage();
if(checkUrl()){updateReminderOnHsMenu();
updateForm()
}else{if($.jStorage.get(skuId)!=null){iHsStorage=JSON.parse($.jStorage.get(skuId));
updateReminderOnHsMenu();
updateForm()
}else{handleDisplayingChangeButton()
}}}getAjax(true,"hotstampingPopin.jsp",handlehostampData,{skuId:skuId})
}function handlehostampData(a){$("#hotStampingContentPopin").html(a).hide()
}function buildElementTextOnImage(){textOnImg=$("<div></div>");
for(var b=0;
b<nbInitials;
b++){var a='<span id="initialOnImg'+b+'"class="initialOnImg"></span>';
textOnImg.append(a)
}textOnImg.addClass("textOnImg")
}function callbackAfterOpenHSModal(){ihsElementPopin=$(".hotstampingModal").find("#hsImageWrapper");
$(".hotstampingModal").parent().parent().addClass("blackWrapperHs");
ihsElementPopin.append(textOnImg);
initIHSValue();
tagManagementCloseButton();
bindChangeEvent();
if(!localStorageChanged&&checkUrl()){updateHsDomValue()
}else{if($.jStorage.get(skuId)==null||($.jStorage.get(skuId)=="{}")){$.jStorage.set(skuId,JSON.stringify(iHsStorage))
}else{getHsValueFromLocalStorage()
}}updateDotsDisplayButton();
updateVerticalDisplayButton();
alreadyLaunch=true;
setTimeout(calculateCoordinate,50);
updateForm();
setTimeout(currentPaletteClick,500);
launchTimerCheckingLettersChanged()
}function currentPaletteClick(){$(".hotstampingModal .currentPaletteIhs").click(changeColorHandler)
}function tagManagementCloseButton(){var a=$(".hotstampingModal").find(".closeButton");
a.addClass(tagClickClass);
a.attr("id","hsCloseButton")
}function checkUrl(){if(initialsUrl==""){return false
}getInitialsFromUrl();
iHsStorage.color=displayColorUrl;
iHsStorage.dots=(dotUrl=="true");
iHsStorage.vertical=(verticalUrl=="true");
return true
}function getInitialsFromUrl(){for(var a=0;
a<nbInitials;
a++){iHsStorage["initial"+a]=a<initialsUrl.length?initialsUrl.charAt(a):""
}}function handleDisplayingChangeButton(){if((!localStorageChanged&&checkUrl())||($.jStorage.get(skuId)!=null&&$.jStorage.get(skuId)!="{}"&&checkInitialsValueInLocalStorage())){$("#hsButtonBegin").addClass("hide");
$("#hsButtonChange").removeClass("hide");
$(".hsSummary").removeClass("hide");
$(".hsItemCustomizedMessage").removeClass("hide");
$(".hsCustomizeItemMessage").addClass("hide");
utag_data.product_hotstamped=1
}else{$("#hsButtonChange").addClass("hide");
$("#hsButtonBegin").removeClass("hide");
$(".hsSummary").addClass("hide");
$(".hsItemCustomizedMessage").addClass("hide");
$(".hsCustomizeItemMessage").removeClass("hide");
utag_data.product_hotstamped=0
}}function checkInitialsValueInLocalStorage(){for(var a=0;
a<nbInitials;
a++){var b="initial"+a;
if(iHsStorage[b]!=""){return true
}}return false
}function checkInitialsValue(){for(var a=0;
a<nbInitials;
a++){if(($(".hotstampingModal").find("#initial_"+a)).val()!=""){return true
}}return false
}function handleClosingHotstamping(){getHsValueFromLocalStorage()
}function handleSavingHotstamping(){localStorageChanged=true;
setHsValueInLocalStorage();
updateForm();
updateReminderOnHsMenu();
$(".hotstampingModal").find(".closeButton").click()
}function updateReminderOnHsMenu(){var a="";
if(iHsStorage.dots&&!iHsStorage.vertical){a=getInitialValueWithDot(iHsStorage.initial0+iHsStorage.initial1+iHsStorage.initial2)
}else{a=iHsStorage.initial0+iHsStorage.initial1+iHsStorage.initial2
}if(a!=""){$(".hsSummaryLettersValue").html(a);
$(".hsSummaryLettersValue br").remove();
$(".hsSummaryColorThumbnail").css("background-color",codeToHexa(iHsStorage.color));
currentColorCode=iHsStorage.color;
currentColorName=$("#colorNameValueForJs [data-color="+currentColorCode+"]");
verticalDisplay=iHsStorage.vertical;
dotsDisplay=iHsStorage.dots;
$(".hsSummaryColorName").html(currentColorName.attr("name-color"));
if(iHsStorage.vertical){$(".hsSummaryDisplayLettersValue").html($(".hsSummaryDisplayLettersValue").attr("data-display"));
$(".hsSummaryDisplayLetters").removeClass("hide")
}else{$(".hsSummaryDisplayLetters").addClass("hide")
}}handleDisplayingChangeButton()
}function getInitialValueWithDot(c){var d="",b="";
for(var a=0;
a<c.length;
a++){d+=c[a]
}for(var a=0;
a<d.length;
a++){b+=d[a]+((a!=d.length-1)?".":"")
}return b
}function setHsValueInLocalStorage(){if(checkInitialsValue()){iHsStorage.color=$(".hotstampingModal .currentPaletteIhs").attr("data-color");
iHsStorage.dots=dotsDisplay;
iHsStorage.vertical=verticalDisplay
}else{iHsStorage.color="";
iHsStorage.dots=false;
iHsStorage.vertical=false
}iHsStorage.initial0=$(".hotstampingModal #initial_0").val();
iHsStorage.initial1=$(".hotstampingModal #initial_1").val();
iHsStorage.initial2=$(".hotstampingModal #initial_2").val();
$.jStorage.set(skuId,JSON.stringify(iHsStorage))
}function getHsValueFromLocalStorage(){iHsStorage=JSON.parse($.jStorage.get(skuId));
updateHsDomValue()
}function updateHsDomValue(){$(".hotstampingModal #initial_0").val(iHsStorage.initial0);
$(".hotstampingModal #initial_1").val(iHsStorage.initial1);
$(".hotstampingModal #initial_2").val(iHsStorage.initial2);
if(iHsStorage.color==""||iHsStorage.color==null){currentColorCode=$(selectorColorDefault).attr("data-color")
}else{currentColorCode=iHsStorage.color
}textOnImg.css("color",codeToHexa(currentColorCode));
var a=$(".hotstampingModal [data-color="+currentColorCode+"]");
if((currentColorCode!="")&&(a.length==0)){a=$(".hotstampingModal #noneColor")
}addClassCurrentPalette(a);
currentColorName=a.attr("name-color");
$(".hotstampingModal #hotStampingColor").find(".colorName").html(currentColorName);
verticalDisplay=iHsStorage.vertical;
dotsDisplay=iHsStorage.dots;
setInitials();
if(dotsDisplay){addDot()
}if(verticalDisplay){setVertical()
}else{activateDotButton()
}}function calculateCoordinate(){setFontSize();
var b=ihsElementPopin.find("img").width();
var a=ihsElementPopin.find("img").height();
if(coordinateXinitial!=""){coordinateX=coordinateXinitial*b/widthImageWrapper;
coordinateY=coordinateYinitial*a/widthImageWrapper;
updatePositionDisplay()
}}function compareColor(){return(currentColorCode==toneOnToneColor)?true:false
}function initIHSValue(){currentColorCode=$(selectorColorDefault).attr("data-color");
currentColorName=$(selectorColorDefault).attr("name-color");
$(".hotstampingModal #hotStampingColor").find(".colorName").html(currentColorName);
textOnImg.css("color",codeToHexa(currentColorCode))
}function bindChangeEvent(){$(".hotstampingModal .withDots").click(addDotHandler);
$(".hotstampingModal .verticalDisplay").click(verticalHandler);
$(".hotstampingModal .withoutDots").click(removeDotHandler);
$(".hotstampingModal .horizontalDisplay").click(horizontalHandler);
var b=$(".hotstampingModal #hotStampingColor").find(".hotStampingColor");
b.click(changeColorHandler);
$(".hotstampingModal #hsReset").click(resetAllValue);
for(var a=0;
a<nbInitials;
a++){if(a<nbInitials-1){bindLettersChanged(a,a+1)
}else{bindLettersChanged(nbInitials-1,0)
}}($(".hotstampingModal").find("#initial_0")).focus();
$(".hotstampingModal").find(".closeButton").click(handleClosingHotstamping);
$(".hotstampingModal").find("#hsConfirm").click(handleSavingHotstamping)
}function bindLettersChanged(b,a){var c=/^[A-Za-z]+$/;
($(".hotstampingModal").find("#initial_"+b)).keyup(function(){var d=$(this).val();
if((d!="")&&(c.test(d))){textOnImg.find("#initialOnImg"+b).html(d);
if(!isIdevice){($(".hotstampingModal").find("#initial_"+a)).focus()
}}else{textOnImg.find("#initialOnImg"+b).html("");
$(this).val("")
}updateDisplay();
fixMaxLength()
})
}function fixMaxLength(){var a=window.navigator.appVersion;
a=a.toLowerCase();
if(a.indexOf("android 4.1")>=0){var b={};
$.each($(":text, textarea, :password"),function(){var d=$(this).attr("id"),c=$(this).attr("maxlength");
if((typeof d!=="undefined")&&(typeof c!=="undefined")){b[d]=c;
$(this).removeAttr("maxlength")
}});
$(":text, textarea, :password").bind("change keyup",function(){var e=$(this).attr("id"),c="";
if(typeof e!=="undefined"&&b.hasOwnProperty(e)){c=b[e];
var d=$(this).val();
if(d.length>c){$(this).val(d.slice(d.length-c,d.length));
setInitials()
}}})
}}function setInitials(){for(var a=0;
a<nbInitials;
a++){textOnImg.find("#initialOnImg"+a).html($(".hotstampingModal #initial_"+a).val())
}INITIALS_SAVED=getInitialsFromInputs()
}function getInitialsFromInputs(){var a="";
for(var b=0;
b<nbInitials;
b++){a+=$(".hotstampingModal #initial_"+b).val()
}return a
}function addDot(){if(dotsDisplay){for(var c=0;
c<nbInitials;
c++){var a=c+1;
var b=c+2;
if(a!=nbInitials){if($(".hotstampingModal #initial_"+c).val()!=""&&$(".hotstampingModal #initial_"+a).val()!=""){textOnImg.find("#initialOnImg"+c).html($(".hotstampingModal #initial_"+c).val()+".")
}else{if($(".hotstampingModal #initial_"+c).val()!=""&&$(".hotstampingModal #initial_"+b).val()!=""&&$("#initial_"+b).length!=0){textOnImg.find("#initialOnImg"+c).html($(".hotstampingModal #initial_"+c).val()+".")
}else{textOnImg.find("#initialOnImg"+c).html($(".hotstampingModal #initial_"+c).val())
}}}else{textOnImg.find("#initialOnImg"+c).html($(".hotstampingModal #initial_"+c).val())
}}}}function verticalMode(){if(verticalDisplay){for(var b=0;
b<nbInitials-1;
b++){var a=b+1;
if($(".hotstampingModal #initial_"+b).val()!=""){textOnImg.find("#initialOnImg"+b).html($(".hotstampingModal #initial_"+b).val()+"<br>")
}}}}function updateDisplay(){updateDotsDisplay();
updateVerticalDisplay();
updateColorDisplay();
updatePositionDisplay()
}function updatePositionDisplay(){setTextOnImgLeftAndTopPosition()
}function updateDotsDisplay(){if(dotsDisplay){addDot()
}else{removeDots()
}}function addDotHandler(){dotsDisplay=true;
updateDisplay();
updateDotsDisplayButton()
}function verticalHandler(){verticalDisplay=true;
updateDisplay();
updateVerticalDisplayButton()
}function removeDotHandler(){dotsDisplay=false;
updateDisplay();
updateDotsDisplayButton()
}function horizontalHandler(){verticalDisplay=false;
updateDisplay();
updateVerticalDisplayButton()
}function updateVerticalDisplay(){if(verticalDisplay){setVertical()
}else{removeVertical()
}}function updateVerticalDisplayButton(){if(verticalDisplay){$(".hotstampingModal .verticalDisplay").addClass("button-brown-withText");
$(".hotstampingModal .horizontalDisplay").removeClass("button-brown-withText");
$(".hotstampingModal .withDots").unbind("click");
$(".hotstampingModal .withoutDots").unbind("click");
$(".hotstampingModal .withDots").removeClass("button-brown-withText");
$(".hotstampingModal .withoutDots").addClass("button-brown-withText");
$(".hotstampingModal .hsDotsButton .hsButtonTable").addClass("hsButtonOpacity")
}else{$(".hotstampingModal .verticalDisplay").removeClass("button-brown-withText");
$(".hotstampingModal .horizontalDisplay").addClass("button-brown-withText");
activateDotButton()
}}function activateDotButton(){$(".hotstampingModal .withDots").click(addDotHandler);
$(".hotstampingModal .withoutDots").click(removeDotHandler);
$(".hotstampingModal .hsDotsButton .hsButtonTable").removeClass("hsButtonOpacity");
updateDotsDisplayButton()
}function updateDotsDisplayButton(){if(dotsDisplay){$(".hotstampingModal .withDots").addClass("button-brown-withText");
$(".hotstampingModal .withoutDots").removeClass("button-brown-withText")
}else{$(".hotstampingModal .withDots").removeClass("button-brown-withText");
$(".hotstampingModal .withoutDots").addClass("button-brown-withText")
}}function changeColorHandler(){logDebug(currentColorCode);
if($(this).attr("id")=="noneColor"){toneOnToneColorLabel=$(this).attr("name-color");
currentColorCode=toneOnToneColor;
currentColorName=toneOnToneColorLabel
}else{currentColorCode=$(this).attr("data-color");
currentColorName=$(this).attr("name-color")
}addClassCurrentPalette($(this));
updateDisplay()
}function updateColorDisplay(){if(currentColorName==toneOnToneColorLabel){setShadowToTextOnImg()
}else{clearShadowTextOnImg()
}textOnImg.css("color",codeToHexa(currentColorCode));
$(".hotstampingModal #hotStampingColor").find(".colorName").html(currentColorName)
}function updateForm(){if(compareColor()){$("#colorHS").val(colorCodeToneOnToneATG)
}else{$("#colorHS").val(currentColorCode)
}$("#dotHS").val(verticalDisplay?false:dotsDisplay);
$("#verticalHS").val(verticalDisplay);
$("#initialsHS").val(getInitialsText());
$("#displayColorHS").val(currentColorCode)
}function getInitialsText(){var a="";
if($(".textOnImg").length>0){a=$(".textOnImg").text()
}else{a=$(".hsSummaryLettersValue").text()
}a=a.replace(".","");
a=a.replace(/\s/g,"");
return a.replace(".","").toUpperCase()
}function removeDots(){for(var a=0;
a<nbInitials-1;
a++){textOnImg.find("#initialOnImg"+a).html(($(".hotstampingModal").find("#initial_"+a)).val())
}dotsDisplay=false
}function setVertical(){$(".addDots").find(".addDotsLabel").addClass("disabled");
$(".addDots").find("input").attr("disabled",true);
verticalMode()
}function removeVertical(){activateDotButton();
for(i=0;
i<nbInitials;
i++){textOnImg.find("#initialOnImg"+i).find("br").remove()
}addDot();
verticalDisplay=false
}function resetAllValue(){for(i=0;
i<nbInitials;
i++){$(".hotstampingModal #initial_"+i).val("");
textOnImg.find("#initialOnImg"+i).html("")
}removeVertical();
removeDots();
addClassCurrentPalette($(selectorColorDefault));
clearShadowTextOnImg();
currentColorCode=$(selectorColorDefault).attr("data-color");
currentColorName=$(selectorColorDefault).attr("name-color");
$(".hotstampingModal #hotStampingColor .colorName").html(currentColorName);
textOnImg.css("color",codeToHexa(currentColorCode));
verticalDisplay=false;
dotsDisplay=false;
updateVerticalDisplayButton();
updateDotsDisplayButton()
}function setTextOnImgLeftAndTopPosition(){var c=ihsElementPopin.find("img").offset().top;
var d=ihsElementPopin.offset().top;
var e=ihsElementPopin.find("img").offset().left;
var f=ihsElementPopin.offset().left;
var b=$(".textOnImg").height()/2;
var a=0;
if(verticalDisplay||$(".textOnImg").width()/2>getWidthTextOnIHS()){a=$(".textOnImg").width()/2
}else{a=getWidthTextOnIHS()
}textOnImgLeft=coordinateX+e-a-f;
textOnImgTop=coordinateY+c-b-d;
textOnImg.css("top",textOnImgTop+"px");
textOnImg.css("left",textOnImgLeft+"px")
}function getWidthTextOnIHS(){var a=0;
for(var b=0;
b<nbInitials;
b++){a=a+$("#initialOnImg"+b).width()
}return a/2
}function addClassCurrentPalette(a){$(".hotstampingModal .hotStampingColor").removeClass("currentPaletteIhs");
a.addClass("currentPaletteIhs")
}function getRelativePath(a){return(CONFIGURATION.devMode?"/"+CONFIGURATION.MOBILE_CONTEXTE_ROOT:"")+a.replace(/^.*\/\/[^\/]+/,"")
}function setFontSize(){var a=ihsElementPopin.find("img").width();
ftSize=(fontSize*a)/widthImageWrapper;
textOnImg.css("font-size",ftSize)
}function codeToHexa(a){return"#"+a
}function rgbToHexNoSharp(d,c,a){return componentToHex(d)+componentToHex(c)+componentToHex(a)
}function componentToHex(b){var a=b.toString(16);
return a.length==1?"0"+a:a
}function setShadowToTextOnImg(){var a="-1px 0 "+textOnImgShadowColor+", 0 1px "+textOnImgShadowColor+", 1px 0 "+textOnImgShadowColor+", 0 -1px "+textOnImgShadowColor;
$(".initialOnImg").css("text-shadow",a)
}function clearShadowTextOnImg(){$(".initialOnImg").css("text-shadow","")
}function getOriginalWidthOfImg(){var a=new Image;
$(a).load(function(){widthImageWrapper=this.width;
launchHotStamping()
}).attr("src",$("#hsImageWrapper img").attr("src"))
}function launchTimerCheckingLettersChanged(){if(!isAndroidTablet()){return
}checkLettersChanged()
}function checkLettersChanged(){if(getInitialsFromInputs()!=INITIALS_SAVED){setInitials();
updatePositionDisplay()
}setTimeout(checkLettersChanged,200)
};