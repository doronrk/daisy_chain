var coremetricsLoad=false;var shippingFrag=false;var paymentFrag=false;var addShippingModal=false;var addCreditCardModal=false;var addPaymentAddressModal=false;var jcpPRODUCTPRESENTATIONSjcp="";var spinnerTimeout;var ccRangeJson=new Array();var testCards=new Array();var jcp={init:function(){jcp.flyoutMenu();
jcp.clickUnbind();jcp.modalWindow();jcp.toolTipSwatch();jcp.toolTipHelpIcon();jcp.showtooltip();jcp.toolTipPrimaryGR();},checkout:{init:function(){jcp.checkout.textareaCharLimit();jcp.checkout.selectgiftWrapItems();jcp.checkout.toolTipForCheckOut();},textareaCharLimit:function(){function limitChars(textid,limit,infodiv){var text=$("#"+textid).val();
var textlength=text.length;if(textlength>limit){$("#"+infodiv).html("You cannot write more then "+limit+" characters!");$("#"+textid).val(text.substr(0,limit));return false;}else{$("#"+infodiv).html("You have "+(limit-textlength)+" characters left.");return true;}}$(function(){$("#specialInstruction").keyup(function(){limitChars("specialInstruction",60,"charLimitInfo");
});});$(function(){$("#specialInstructionTxt").keyup(function(){limitChars("specialInstructionTxt",64,"charLimitInfo");});});$(function(){$("#giftwrapMessage").keyup(function(){limitChars("giftwrapMessage",60,"charLimitInfo");});});},selectgiftWrapItems:function(){$("input[id^=giftProduct]").click(function(){if(!$(this).is(":checked")){var ids=$(".giftwrap_item_info :checked").size();
if(ids==0){$("#giftBtn").attr("disabled","disabled");$("#giftwrapBtnHolder").addClass("lit_grey_button");$("#giftwrapBtnHolder").removeClass("blue_button_small");}else{$("#giftwrapBtnHolder").removeClass("lit_grey_button");$("#giftwrapBtnHolder").addClass("blue_button_small");}}else{$("#giftBtn").removeAttr("disabled","disabled");
$("#giftwrapBtnHolder").removeClass("lit_grey_button");$("#giftwrapBtnHolder").addClass("blue_button_small");}});$("#giftselectAll").click(function(){if(!$("#giftselectAll").hasClass("disabled")){$("input[id^=giftProduct]").attr("checked","checked");$("#giftBtn").removeAttr("disabled","disabled");$("#giftwrapBtnHolder").addClass("blue_button_small");
$("#giftwrapBtnHolder").removeClass("lit_grey_button");$("#giftwrapBtnHolder").removeClass("grey_button");}});},toolTipForCheckOut:function(){$("a.giftwrap_tooltipicon").tooltip({overrideClass:"giftwrapiconTooltip"});$("a.provincehelp").tooltip({overrideClass:"provincehelpTooltip"});$("a.helpIcon").tooltip({overrideClass:"helpIcontip"});
}},shoppingbag:{init:function(){jcp.shoppingbag.bagPopup();jcp.shoppingbag.popupSize();},bagPopup:function(){$("#addtobag").bind("click",function(e){e.preventDefault();var actionUrl=$("#product_details").attr("action");var dataToSend=$("#product_details").serialize();$.ajax({url:actionUrl,type:"POST",data:dataToSend,success:function(data){$("#shopping_bag_flyout").html(data);
window.scrollTo(0,0);$("#shopping_bag").trigger("mouseover");setTimeout(function(){$("#shopping_bag").trigger("mouseout");},5000);}});});},popupSize:function(){function popcontact(URL){var popup_width=390;var popup_height=500;day=new Date();id=day.getTime();eval("page"+id+" = window.open(URL, '"+id+"', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width='+popup_width+',height='+popup_height+'');");
}}},posf:{init:function(){jcp.posf.posfModal();},posfModal:function(){$(".launchModalWithoutClose").colorbox({scrolling:false,overlayClose:false,escKey:false,onComplete:function(){if($("#colorbox .protect_modal_close").length>0){$("#cboxClose").hide();}$("#cboxLoadedContent .closeModal").bind("click",function(){$("#cboxClose").trigger("click");
});}});}},iPad:{init:function(){jcp.iPad.ipadInputBackground();jcp.iPad.shopBagRedirect();},ipadInputBackground:function(){if(navigator.userAgent.match(/iPad/i)!=null){$("input:checkbox").css("background-color","#000");$("input:radio").css("background-color","#000");}},shopBagRedirect:function(){function shoppingBagRedUrl(){var isIOS=((/iphone|ipad/gi).test(navigator.appVersion));
var viewShoppingBagEvent=isIOS?"touchstart":"click";$("#btncheckout").bind(viewShoppingBagEvent,function(e){window.location="/dotcom/jsp/cart/viewShoppingBag.jsp";});}},removeToolTip:function(){if(navigator.userAgent.match(/iPad/i)!=null){$("#tooltip").remove();}}},form:{init:function(){jcp.form.validate();
},validate:function(){$.validator.setDefaults({submitHandler:function(){if(shippingFrag){getValidShippingMethods();shippingFrag=false;}if(addShippingModal){addShippingAddressModal();addShippingModal=false;}if(addCreditCardModal){addNewCreditCard(formId);addCreditCardModal=false;}if(addPaymentAddressModal){addPaymentAddress();
addPaymentAddressModal=false;}}});$.validator.addMethod("militaryZip",function(value,element,param){return this.optional(element)||(value.startsWith("0")||value.startsWith("3")||value.startsWith("9"));},"Please specify a valid phone number");$.validator.addMethod("CCExp",function(value,element,params){var month=parseInt($("#expirationMonth").val(),10);
var year=parseInt($("#expirationYear").val(),10);var isInValid=validateExpiryDate(month,year);if(isInValid){$("#creditCardNumber").val("");}return !isInValid;},"Select a valid expiration date.");$(".jcp_form").validate({wrapper:"",errorContainer:"",errorLabelContainer:"",errorElement:"div",errorPlacement:function(error,element){var elemName=element.attr("name");
if(elemName=="firstName"||elemName=="lastName"){$("#"+elemName+"Error").html(error);}else{if(elemName=="zipCode"||elemName=="cityName"||elemName=="selectState"){$("#zipCityError").append(error);}else{if(elemName=="militaryType"||elemName=="apostate"||elemName=="militaryZipCode"){$("#milZipCityError").append(error);
}else{if(elemName=="australiacity"||elemName=="australiaprovince"||elemName=="postalCode"){$("#caZipCityError").append(error);}else{error.insertBefore("#"+elemName+"Label");}}}}},rules:{firstName:{required:true},lastName:{required:true},companyName:{required:false,checkHtml:true},streetAddress1:{required:true,checkHtml:true},streetAddress2:{required:false,checkHtml:true},cityName:{required:true,checkHtml:true},selectState:"required",date1:"required",eventType:"required",apostate:"required",zipCode:{required:true,checkHtml:true},postalCode:{required:true,checkHtml:true},phoneNumber:{required:true},billingPhoneNumber:{required:true},militaryaddress1:{required:true,checkHtml:true},militaryType:"required",militaryZipCode:{required:true,checkHtml:true,militaryZip:true},australiastreet1:{required:true,checkHtml:true},australiacity:{required:true,checkHtml:true},australiaprovince:{required:true,checkHtml:true},creditCardNumber:{required:true},GiftcardNumber:{required:true,giftcard:true},expirationMonth:{required:true,CCExp:true},expirationYear:"required",email:"required",password:{required:true,rangelength:[6,16]},confpasswd:{required:true,equalTo:"#password"},searchStore:"required",cardVerificationNumber:{required:true,maxlength:4,number:true}},messages:{firstName:{required:"Enter a first name.",checkHtmlName:"Enter a valid first name."},lastName:{required:"Enter a last name.",checkHtmlName:"Enter a valid last name."},companyName:{checkHtml:"Enter a valid company name."},streetAddress1:{required:"Enter a valid street address.",checkHtml:"Enter a valid street address 1."},streetAddress2:{checkHtml:"Enter a valid street address 2."},cityName:{required:"Enter a valid city.",checkHtml:"Enter a valid city."},selectState:"Select a state",date1:"Select a date",eventType:"Select a Event Type",apostate:"Select a state",zipCode:{required:"Enter a valid ZIP code.",checkHtml:"Enter a valid ZIP code."},phoneNumber:{required:"Enter a valid phone number."},billingPhoneNumber:{required:"Enter a valid phone number."},militaryaddress1:{required:"Enter a valid street address.",checkHtml:"Enter a valid street address."},militaryType:"Select APO/FPO/DPO.",militaryZipCode:{required:"Enter a valid ZIP code.",checkHtml:"Enter a valid ZIP code.",militaryZip:"Enter a valid ZIP code."},australiastreet1:{required:"Enter a valid street address.",checkHtml:"Enter a valid street address."},australiacity:{required:"Enter a valid city.",checkHtml:"Enter a valid city."},postalCode:{required:"Enter a valid postal code.",checkHtml:"Enter a valid postal code."},creditCardNumber:"Enter a valid credit card number.",GiftcardNumber:"Enter a valid Gift card number.",expirationMonth:{required:"Select a valid expiration date.",CCExp:"Select a valid expiration date."},expirationYear:"Select a valid expiration date.",email:"Enter a email address",password:{required:"Enter a password",rangelength:"password must contain 6-16 characters"},confpasswd:"Enter the same password as above.",searchStore:"please enter a valid search item",cardVerificationNumber:"Enter a valid card verification number."}});
$(".cancel").click(function(){validator.resetForm();});}},flyoutMenu:function(){var globalTimer=0;var topmenu_obj=$("#topmenu");var topNavLink=$("#topmenu li a");var topmenu_cont=$("#flyout_opener");var flyoutCont=$("#flyout_opener .flyout_menu");topNavLink.bind("mouseover",function(){$(this).addClass("mouseOver");
var currentLink=$(this);var targetDivId=$(this).attr("rel").split(".")[1];var deptCount=$("#deptCount_"+targetDivId).val();var content=jQuery.trim($("#"+targetDivId).html());if(content.length==0){$.ajax({type:"GET",url:"/dotcom/jsp/global/cache/categoryOverlay.jsp?deptId="+targetDivId+"&deptCount="+deptCount,dataType:"html",error:dataError,success:function(data){$("#"+targetDivId).html(data);
if(currentLink.attr("class")!=null&&currentLink.attr("class").indexOf("mouseOver")>=0){$("[name*="+targetDivId+"]").trigger("mouseover");}}});}else{var posOfMenu=$(this).position();var leftPos=posOfMenu.left;globalTimer=1;topNavLink.removeClass("hover");topNavLink.removeClass("topmenu_link");$(this).addClass("hover");
$(this).addClass("topmenu_link");flyoutCont.removeClass("show_flyout");$("#"+targetDivId).addClass("show_flyout");var calWidth=topmenu_cont.outerWidth()+leftPos+$(this).outerWidth();topmenu_cont.css("display","block");if($("#"+targetDivId).attr("rel")==undefined){var kids=$("#"+targetDivId).children(".one_coloumn");
var kidslen=kids.size();if(kidslen==3){$("#"+targetDivId).css("width",552+"px");}else{if(kidslen==2){$("#"+targetDivId).css("width",393+"px");}else{$("#"+targetDivId).css("width",234+"px");}}var tallest=0;kids.each(function(){var thisHeight=$(this).height();if(thisHeight>tallest){tallest=thisHeight;}});
kids.height(tallest);$("#"+targetDivId).attr("rel","1");}var topmenu_link=$("#topmenu li a.topmenu_link");var menu_obj_left=topmenu_obj.position().left+topmenu_link.outerWidth();var menu_content_left=topmenu_link.position().left-topmenu_obj.position().left-topmenu_cont.outerWidth()+topmenu_link.outerWidth();
var menu_obj_right=topmenu_obj.offset().left+topmenu_obj.outerWidth();var menu_content_right=topmenu_link.offset().left+topmenu_cont.outerWidth()-5;if(calWidth>960){if(menu_content_left<=menu_obj_left){topmenu_cont.css({"left":topmenu_link.position().left-(calWidth-960)+"px"});}else{if($(this).attr("id")=="last_department"){menu_content_left+=4;
}topmenu_cont.css({"left":menu_content_left+"px"});}}else{if(navigator.appName=="Microsoft Internet Explorer"&&$(topmenu_link).attr("id")=="first_department"){leftPos=leftPos-3;}else{leftPos=leftPos;}topmenu_cont.css({"left":(leftPos)+"px"});}}});topNavLink.bind("mouseout",function(){globalTimer=0;$(this).removeClass("mouseOver");
setTimeout(function(){closeMenu($(this));},750);});flyoutCont.bind("mouseout",function(){globalTimer=0;setTimeout(function(){closeMenu($(this));},750);});flyoutCont.bind("mouseover",function(){globalTimer=1;$(this).addClass("show_flyout");var myParentLnk="."+$(this).attr("id");topNavLink.each(function(){if($(this).attr("rel")==myParentLnk){$(this).addClass("hover");
}});topmenu_cont.css("display","block");});function closeMenu(obj){if(globalTimer==0){if(!flyoutCont.hasClass("show_flyout")){var targetDivId=$(obj).attr("rel").split(".")[1];$("#"+targetDivId).removeClass("show_flyout");}topNavLink.removeClass("hover");topmenu_cont.css("display","none");}}if(topmenu_cont.length>0){topmenu_cont.css("display","none");
}var shoppingBag=$("#shopping_bag");var shoppingBagFlyout=$("#shopping_bag_flyout");var flyoutFlag=false;var giftRegistryFlyout=$("#gift_registry_flyout");var giftRegistryAnchor=$("#gift_registry");giftRegistryAnchor.bind("mouseover",function(){if(giftRegistryFlyout.length>0){giftRegistryFlyout.show();
var leftPos=giftRegistryFlyout.width()/2;giftRegistryFlyout.css("left",-leftPos+"px");giftRegistryFlyout.css("top","29px");$(this).addClass("hoverClass");}});giftRegistryAnchor.bind("mouseleave",function(){if(giftRegistryFlyout.length>0){giftRegistryFlyout.hide();$(this).removeClass("hoverClass");}});
giftRegistryAnchor.bind("keydown",function(event){if(event.keyCode=="13"){giftRegistryFlyout.show();var leftPos=giftRegistryFlyout.width()/2;giftRegistryFlyout.css("left",-leftPos+"px");giftRegistryFlyout.css("top","29px");$(this).addClass("hoverClass");}});giftRegistryFlyout.bind("mouseenter",function(){giftRegistryAnchor.addClass("hoverClass");
giftRegistryFlyout.show();});giftRegistryFlyout.bind("mouseleave",function(){giftRegistryAnchor.removeClass("hoverClass");giftRegistryFlyout.hide();});$("#grRegistrantSearchState,#grRegistrantEventType").bind("click",function(){giftRegistryFlyout.unbind();$("#gift_registry_flyout .dropdown_flyout").bind("mouseenter",function(){giftRegistryFlyout.bind("mouseenter",function(){giftRegistryAnchor.addClass("hoverClass");
giftRegistryFlyout.show();});giftRegistryFlyout.bind("mouseleave",function(){giftRegistryAnchor.removeClass("hoverClass");giftRegistryFlyout.hide();});});});shoppingBag.bind("mouseover",function(){if($("#shoppingOverlayEnabled").html()=="true"){var quantity=getCookie("ItemCount");var flyoutLength=$(".shopping_details").length;
if(flyoutLength>2){if(flyoutLength==3){$("#shopping_scroll").addClass("shopping_bag_fixed_height3");}else{$("#shopping_scroll").addClass("shopping_bag_fixed_height4");}}if(shoppingBagFlyout.length>0){var shopping_anchor=$(this).parent();var anchorPosition=shopping_anchor.position();var topPos=anchorPosition.top+shopping_anchor.height();
shoppingBagFlyout.css("left",anchorPosition.left-shopping_anchor.width()+-64+"px");shoppingBagFlyout.css("top",topPos+"px");shoppingBagFlyout.css("margin-top","-1px");var itCnt=getItemCountFromCookie();var bagCount=parseInt(itCnt);shoppingBagFlyout.show();if(bagCount>0){$("#items_in_bag_label").html('<h4 class="redBagLabel">items added to bag</h4>');
$(".shopping_kit #shopping_scroll").css("border-top-width","2px");$(".shopping_kit_holder #shopping_scroll > .red_button_medium").css("position","initial").css("top","initial");}else{$("#items_in_bag_label").html('<h4 class="grayBagLabel">your bag is empty</h4>');$(".shopping_kit #shopping_scroll").css("border-top-width",0);
$(".shopping_kit_holder #shopping_scroll > .red_button_medium").css("position","relative").css("top","-30px");}$(this).addClass("hoverClass");}}});shoppingBagFlyout.bind("mouseover",function(){if($("#shoppingOverlayEnabled").html()=="true"){if(shoppingBagFlyout.length>0){shoppingBagFlyout.show();shoppingBag.addClass("hoverClass");
}}});shoppingBagFlyout.bind("mouseleave",function(){if($("#shoppingOverlayEnabled").html()=="true"){if(shoppingBagFlyout.length>0){shoppingBagFlyout.hide();shoppingBag.removeClass("hoverClass");}}});shoppingBag.bind("mouseout",function(){if($("#shoppingOverlayEnabled").html()=="true"){if(shoppingBagFlyout.length>0){shoppingBagFlyout.hide();
$(this).removeClass("hoverClass");}}});},clickUnbind:function(){$("#jcpAccount").show();},modalWindow:function(){$("a.launchModal, input.launchModal").colorbox({scrolling:false,overlayClose:false,escKey:false,close:function(){var img="<img id='cboxCloseImg' src='/dotcom/images/modal_close.gif' alt='close' />";
return $(img);},onComplete:function(){var modalContent=$("#cboxLoadedContent").html();if(modalContent.indexOf("redirectURL")!=-1){$.colorbox.remove();if(modalContent.indexOf("viewShoppingBag")!=-1){window.location="/dotcom/jsp/cart/viewShoppingBag.jsp?sessionExpired=true&redirectModal=true";}else{window.location="/dotcom/jsp/error/error_session.jsp?sessionExpired=true&redirectModal=true";
}}if($("#colorbox .protect_modal_close").length>0){$("#cboxClose").hide();}$("#cboxLoadedContent .closeModal").bind("click",function(){$("#cboxClose").trigger("click");});}});$("input.btnLaunchModal, a.btnLaunchModal").colorbox({scrolling:false,overlayClose:false,escKey:false,close:function(){var img="<img id='cboxCloseImg' src='/dotcom/images/modal_close.gif' alt='close' />";
return $(img);},href:function(){if($(this).closest("form").attr("action")){return $(this).closest("form").attr("action");}else{return $(this).attr("href");}},onComplete:function(){$("#cboxLoadedContent .closeModal").bind("click",function(){$("#cboxClose").trigger("click");});$.colorbox.resize();}});$(".shippingModal").colorbox({scrolling:false,overlayClose:false,escKey:false,close:function(){var img="<img id='cboxCloseImg' src='/dotcom/images/modal_close.gif' alt='close and go back' title='close and go back' />";
return $(img);},onComplete:function(){$("#cboxLoadedContent .closeModal").bind("click",function(){$("#cboxClose").trigger("click");});}});},showHide:function(){$("input[name$='radio']").click(function(){var radio_value=$(this).val();if(radio_value=="yes"){$("#yes_box").show("fast");}else{if(radio_value=="no"){$("#yes_box").hide("fast");
}}});},pageCursorFocus:function(){setTimeout(function(){$("#breadcrumb a:first").focus();},1000);},toolTipSwatch:function(){$("a.swatch,input.swatch").tooltip({overrideClass:"swatchTooltip"});},toolTipHelpIcon:function(){$("a.helpIcon").tooltip({overrideClass:"helpIcontip"});},toolTipPrimaryGR:function(){$("a.tooltipAnchor").tooltip({overrideClass:"anchortip"});
$("a.gridView_tooltip").tooltip({overrideClass:"gridViewtip"});$("a.manageProfile").tooltip({overrideClass:"manageProfiletip"});$("a.GrhelpIcon").tooltip({overrideClass:"helpIcontip"});$("a.autoGR").tooltip({overrideClass:"autoGRTooltip"});var baseObject=$("body");baseObject.find(".monogram").tooltip({overrideClass:"monogramTooltip"});
baseObject.find(".GrhelpIcon").tooltip({overrideClass:"helpIcontip"});},showtooltip:function(){$("div.qW").hide();$("body").click(function(){$("div.qW").hide();});$(".shareLink").click(function(e){$("div.qW").hide();var $qHelpInId=$(this).parent().parent().next().find(".qHelpIn");$qHelpInId.parent().find("div.qHelpIn").show();
e.stopPropagation();});$(".mailNotSent").click(function(e){$("div.qW").hide();var $qHelpInId=$(this).next(".qHelpIn");$qHelpInId.parent().find("div.qHelpIn").show();e.stopPropagation();});$(".registryAccountLink").click(function(e){$("div.qW").hide();var $qHelpInId=$(this).parent().next().find(".qHelpIn");
$qHelpInId.parent().find("div.qHelpIn").show();e.stopPropagation();});},expandCollapse:function(){var showLink=$("a.showHide");var slidingDiv=$("div.slidingDiv");var showLinkSpan=$("a.showHide span");showLink.css("display","block");slidingDiv.hide();showLink.click(function(){showLinkSpan.toggleClass("toggleArrowNormal");
slidingDiv.slideToggle("fast",function(){$.colorbox.resize();showLinkSpan.toggleClass("toggleArrowOpen");});});},loadScriptAsync:function(doc,scriptId,url){var jsScriptElement,firstScriptElement;if(doc.getElementById(scriptId)){return;}firstScriptElement=doc.getElementsByTagName("script")[0];jsScriptElement=doc.createElement("script");
jsScriptElement.type="text/javascript";jsScriptElement.async="async";jsScriptElement.id=scriptId;jsScriptElement.src=url;firstScriptElement.parentNode.insertBefore(jsScriptElement,firstScriptElement);},isTabletOrMobile:function(){return(navigator.userAgent.match(/iPad/i)!=null||navigator.userAgent.match(/mobile/i)!=null||navigator.userAgent.match(/iPhone/i)!=null||navigator.userAgent.match(/Android/i)!=null);
}};$(document).ready(function(){jcp.init();jcp.iPad.init();});function setSyndicateCookieToExpire(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}else{var expires="";}var shipToCountry=getCookie("shipToCountry");
var price=getCookie("ItemTotal");if(shipToCountry==null||shipToCountry=="US"){if(price==null||price==""||price=='""'||price=="null"){price="$0.00";}else{var stringLenght=price.length;if(stringLenght>7){var currency=price.slice(0,1);var number=price.slice(1,(stringLenght-3));var decimal=price.slice(-3);
var numberlength=number.length;var subNumber1=number.slice(-3);var subNumber2=number.slice(0,(numberlength-3));var newPrice=currency.concat(subNumber2,",",subNumber1,decimal);price=newPrice;}}}else{var intlPrice=getCookie("InternationalItemTotal");var intlCurrency=getCookie("shipToCurrencyCode");if(intlPrice==null||intlPrice=="null"){intlPrice="0.00";
}else{var stringLength=intlPrice.length;var newPrice=intlPrice.slice(1,stringLength);intlPrice=newPrice;}price=intlCurrency+" "+intlPrice;}document.cookie=name+"="+value+expires+"; path=/jcp;domain=.jcpenney.com";$("#priceOrder").html(price);}function openModal(url,formFocusId){var formFocusElem="#"+formFocusId+" input[type!=hidden]:first";
$.fn.colorbox({href:url,scrolling:false,overlayClose:false,escKey:false,close:function(){var img="<img id='cboxCloseImg' src='/dotcom/images/modal_close.gif' alt='close' />";return $(img);},onComplete:function(){$(formFocusElem).focus();$("#colorbox").colorbox.resize();var modalContent=$("#cboxLoadedContent").html();
if(modalContent.indexOf("redirectURL")!=-1){$.colorbox.remove();if(modalContent.indexOf("viewShoppingBag.jsp")!=-1){window.location="/dotcom/jsp/cart/viewShoppingBag.jsp?sessionExpired=true&redirectModal=true";}else{window.location="/dotcom/jsp/error/error_session.jsp?sessionExpired=true&redirectModal=true";
}}$.fn.colorbox.resize();}});}function divSlider(){var collapseExpandMenu=function(className,ExpandAll){$("."+className).next().toggleClass("hide");$("."+className).each(function(idx,item){if(!item.href){if(item.id="newsearch_wrap"){var title=$("#"+item.id).text();item.innerHTML="<a href='javascript:void(0);' class='access' title='"+title+"'>"+item.innerHTML+"</a>";
}else{item.innerHTML="<a href='javascript:void(0);' class='access'>"+item.innerHTML+"</a>";}}else{item.className=item.className+" access";}});if(ExpandAll=="yes"){$("."+className).toggleClass("expand",1000);$("."+className).next().toggleClass("hide");}$("."+className).next().animate({opacity:"toggle",height:"toggle"},300);
$("."+className).click(function(){if($(this).next().size()>0){$(this).toggleClass("expand",1000);$(this).next().toggleClass("show",1000);$(this).next().animate({opacity:"toggle",height:["toggle","swing"]},300);}});};collapseExpandMenu("collapse","yes");}function showSpinner(divId){if(null!=document.getElementById(divId)&&typeof document.getElementById(divId)!="undefined"){var divContainerId1=$("#"+divId);
if(divContainerId1.length>0){divContainerId1.prepend('<div id="page_loader" class="mask"></div>');}}else{var divContainerId2=$("."+divId);if(divContainerId2.length>0){divContainerId2.prepend('<div id="page_loader" class="mask"></div>');}}$("#page_loader").css({"opacity":0.75});}function showSpinnerWithRefreshLink(divId){if(null!=document.getElementById(divId)&&typeof document.getElementById(divId)!="undefined"){var divContainerId1=$("#"+divId);
if(divContainerId1.length>0){divContainerId1.prepend('<div id="page_loader" class="mask_refresh"><span class="mask_refresh_span"></span></div>');}}else{var divContainerId2=$("."+divId);if(divContainerId2.length>0){divContainerId2.prepend('<div id="page_loader" class="mask_refresh"><span class="mask_refresh_span"></span></div>');
}}$("#page_loader").css({"opacity":0.75});if(spinnerTimeout==null||spinnerTimeout=="undefined"){spinnerTimeout=10000;}setTimeout(function(){$(".mask_refresh_span").addClass("mask_refresh_span_timeout");$(".mask_refresh_span").click(function(){var urlParam="";var newPage=window.location+"";if(newPage!=""&&newPage.indexOf("#")!=-1){newPage=newPage.replace("#","");
}if(location.href.indexOf("trackSpinnerTimeOut")<1){if(location.href.indexOf("?")!=-1){urlParam="&trackSpinnerTimeOut=true";}else{urlParam="?trackSpinnerTimeOut=true";}}window.location=newPage+urlParam;});},spinnerTimeout);}function hideSpinner(){$("#page_loader .mask").fadeOut("slow").remove();$("#page_loader.mask_refresh").fadeOut("slow").remove();
$("div.mask").fadeOut("slow").remove();$("#processingImageLogin #page_loader").remove();$(".mask_refresh_modal").hide();}function showSpinnerForModal(formId,divId){$("#"+formId).find("."+divId).prepend('<div id="page_loader" class="mask_refresh_modal"><span class="mask_refresh_span_modal"></span></div>');
$("#page_loader").css({"opacity":0.75});if(spinnerTimeout==null||spinnerTimeout=="undefined"){spinnerTimeout=10000;}setTimeout(function(){$(".mask_refresh_span_modal").addClass("mask_refresh_span_timeout");$(".mask_refresh_span_modal").click(function(){var urlParam="";var newPage=window.location+"";if(newPage!=""&&newPage.indexOf("#")!=-1){newPage=newPage.replace("#","");
}if(location.href.indexOf("trackSpinnerTimeOut")<1){if(location.href.indexOf("?")!=-1){urlParam="&trackSpinnerTimeOut=true";}else{urlParam="?trackSpinnerTimeOut=true";}}window.location=newPage+urlParam;});},spinnerTimeout);}function reloadPage(){var quantity=getCookie("ItemCount");var shipToCountry=getCookie("shipToCountry");
if(quantity==null||quantity=="null"||quantity==""||isNaN(quantity)){quantity=0;}if(document.getElementById("orderQuantity")!=null){document.getElementById("orderQuantity").innerHTML=quantity;}var price=getCookie("ItemTotal");if(shipToCountry==null||shipToCountry=="US"){if(price==null||price==""||price=='""'||price=="null"){price="$0.00";
}else{var stringLenght=price.length;if(stringLenght>7){var currency=price.slice(0,1);var number=price.slice(1,(stringLenght-3));var decimal=price.slice(-3);var numberlength=number.length;var subNumber1=number.slice(-3);var subNumber2=number.slice(0,(numberlength-3));var newPrice=currency.concat(subNumber2,",",subNumber1,decimal);
price=newPrice;}}if(document.getElementById("priceOrder")!=null){document.getElementById("priceOrder").innerHTML=price;}}else{var intlPrice=getCookie("InternationalItemTotal");var intlCurrency=getCookie("shipToCurrencyCode");if(intlPrice==null||intlPrice=="null"){intlPrice="0.00";}else{var stringLength=intlPrice.length;
var newPrice=intlPrice.slice(1,stringLength);intlPrice=newPrice;}if(document.getElementById("priceOrder")!=null){document.getElementById("priceOrder").innerHTML=intlCurrency+" "+intlPrice;}}}function setSyndicateCookieToExpire(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));
var expires="; expires="+date.toGMTString();}else{var expires="";}document.cookie=name+"="+value+expires+"; path=/jcp;domain=.jcpenney.com";$("#priceOrder").html(price);}function setCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();
}else{var expires="";}document.cookie=name+"="+value+expires+"; path=/";}function getCookie(Name){var cookieValue=null;var cookieValues=new Array();var re=new RegExp(Name+"=[^;]+","i");var matchedCookie=document.cookie.match(re);if(matchedCookie){cookieValues=matchedCookie[0].split("=");if(cookieValues.length>2){var cookieNameValue=matchedCookie[0];
cookieValue=cookieNameValue.substr(cookieNameValue.indexOf("=")+1);}else{cookieValue=cookieValues[1];}}return cookieValue;}function eraseCookie(name){setCookie(name,"",-1);}function reloadAfterDelay(){$("#reloadFragment").load("../global/dummyHeader.jsp #reloadFragment");}function gup(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(window.location.href);if(results==null){return"";}else{return results[1];}}function getMarketingAttributeFromCookie(){var cmmmc=gup("cm_mmc");if(getCookie("cm_mmc")==null){if(cmmmc!=null&&cmmmc!=""){document.cookie="cm_mmc="+cmmmc+"; path=/";
}}var mmcAttribute=getCookie("cm_mmc");var mmcAttributeArray=new Array();if(mmcAttribute!=null){mmcAttributeArray=mmcAttribute.split("-_-");}var mmcArrayLength=mmcAttributeArray.length;for(i=mmcArrayLength;i<4;i++){mmcAttributeArray[i]="";}return mmcAttributeArray;}function limitChars(textid,limit,infodiv){var text=$("#"+textid).val();
var textlength=text.length;if(textlength>limit){$("#"+infodiv).html("You cannot write more then "+limit+" characters!");$("#"+textid).val(text.substr(0,limit));return false;}else{$("#"+infodiv).html("You have "+(limit-textlength)+" characters left.");return true;}}function redirectOnError(){window.location="/dotcom/jsp/error/error.jsp";
}function handlejavaScriptError(e){throw e;}function loadDefaultImage(imgElement){var defaultImageURL="/dotcom/images/imagenotavailable.png";imgElement.setAttribute("src",defaultImageURL);}function loadDefaultSwatchImage(imgElement){var defaultImageURL="/dotcom/images/swatch_na.jpg";imgElement.setAttribute("src",defaultImageURL);
}function loadDefaultAlternateSwatchImage(imgElement){var defaultImageURL="/dotcom/images/swatch_na_100_100.gif";imgElement.setAttribute("src",defaultImageURL);imgElement.setAttribute("width",35);imgElement.setAttribute("height",35);}function loadLargeDefaultSwatchImage(imgElement){var defaultImageURL="/dotcom/images/swatch_na_100_100.gif";
imgElement.setAttribute("src",defaultImageURL);}function validateZip(zip){if(!String.prototype.startsWith){String.prototype.startsWith=function(zip){return !this.indexOf(zip);};}}function handleEnterKeyForInput(e,submitId){var key;if(window.event){key=window.event.keyCode;}else{key=e.which;}if(key!=13){return true;
}else{var submitBtn=document.getElementById(submitId);submitBtn.click();return false;}}function handleEnterKeyForSearch(e,searchButtonId){var key;if(window.event){key=window.event.keyCode;}else{key=e.which;}if(key!=13){return true;}else{var searchBtn=document.getElementById(searchButtonId);searchBtn.click();
return false;}}function clearErrorFields(){$(".grerror").removeClass("grerror").prev().css("color","#4B4B4B");$("#serverErrors").html("");$("#serverErrors").hide();$("#serverErrorsShippingInfo").html("");$("#serverErrorsShippingInfo").hide();$("#personalizeServerErrors").html("");$("#personalizeServerErrors").hide();
if(document.getElementById("coRegEmail").value==""){document.getElementById("emailEnabled").checked==false;$("#emailEnabled").attr("checked",false);document.getElementById("coRegEmail").disabled=true;$('label[for="coRegEmail"]').addClass("label_disabled");}}function removeEncodedSpecialChar(encodedValue){if(encodedValue.indexOf("&amp;")!=-1){encodedValue=encodedValue.replace(new RegExp("&amp;","g"),"&");
}if(encodedValue.indexOf("&trade;")!=-1){encodedValue=encodedValue.replace(new RegExp("&trade;","g"),"\u2122");}if(encodedValue.indexOf("&#39;")!=-1){encodedValue=encodedValue.replace(new RegExp("&#39;","g"),"'");}if(encodedValue.indexOf("&quot;")!=-1){encodedValue=encodedValue.replace(new RegExp("&quot;","g"),'"');
}if(encodedValue=="null"){encodedValue="";}return encodedValue;}function trackPageLoadTime(pageAction){if($("#enablePageLoadTracker").html()=="true"){var d=new Date();var hours=d.getHours(),minutes=d.getMinutes(),seconds=d.getSeconds();var formattedTime=pad(hours)+":"+pad(minutes)+":"+pad(seconds)+" ";
if(context!=undefined){(new Image()).src=context+"/images/tracker.gif?orderId="+$("#orderId").html()+"|--ActionPerformed="+pageAction+"|--Time="+formattedTime;}else{(new Image()).src="/dotcom/images/tracker.gif?orderId="+$("#orderId").html()+"|--ActionPerformed="+pageAction+"|--Time="+formattedTime;}}}function pad(d){return(d<10?"0":"")+d;
}function openModalWindow(url,formFocusId){var formFocusElem="#"+formFocusId+" input[type!=hidden]:first";$.fn.colorbox({href:url,scrolling:false,overlayClose:false,escKey:false,close:function(){var img="<img id='cboxCloseImg' src='/dotcom/images/modal_close.gif' alt='close'/>";return $(img);},onComplete:function(){$(formFocusElem).focus();
}});}function are_cookies_enabled(){var cookieEnabled=true;if(null!=navigator&&typeof navigator.cookieEnabled!="undefined"){cookieEnabled=(navigator.cookieEnabled)?true:false;}else{document.cookie="testcookie=testcookie";cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)?true:false;eraseCookie("testcookie");
}return(cookieEnabled);}function openCookieDisableMessage(url){$.fn.colorbox({href:url,scrolling:false,overlayClose:false,escKey:false,close:function(){var img="<img id='cboxCloseImg' src='/dotcom/images/modal_close.gif' alt='close' title='close' />";return $(img);},onComplete:function(){$("#cboxLoadedContent .closeModal").bind("click",function(){$("#cboxClose").trigger("click");
});}});}function callingCoreMatric(url,categoreyId){var extUrl=url.replace(new RegExp("http://www.","g"),"");var index=extUrl.indexOf("/");if(index>-1){extUrl=extUrl.substring(0,index);}var pageId="External:"+extUrl;var catId="JCP|External|"+categoreyId;if((url.indexOf("http")!=-1)||(url.indexOf("www")!=-1)){cmCreateManualPageviewTag(pageId,catId,window.location.href,document.referrer);
}}function dataError(){}function fnInitiateModalForFindAStore(isDotcom,baseUrl){var ref=window.location.href;var locBVPage=ref.indexOf("&bvpage=");var locBVContentType=ref.indexOf("&bvcontenttype=");if(locBVPage!=-1&&locBVContentType!=-1){var bvPageString=ref.substring(locBVPage,locBVContentType);ref=ref.replace(bvPageString,"");
}if(ref.indexOf("subcatId")!=-1){ref=RemoveParameterFromUrl(ref,"subcatId");}if(isDotcom){fnInitiateModal(baseUrl+"/dotcom/jsp/storelocator/storeLocator.jsp",ref);}else{fnInitiateModal(baseUrl+"/posf/jsp/storelocator/posfStoreLookUp.jsp",ref);}}var cardRangeObject={loadCreditCardRanges:function(){$.ajax({type:"GET",url:"/dotcom/jsp/profile/secure/cardRanges.jsp",dataType:"json",success:function(data){ccRangeJson=data.creditCard;
testCards=data.testCards;}});},getCreditCardType:function getCreditCardType(data,isSwipedCard){var cardType=cardRangeObject.getCardTypeIfTestCard(data);if(cardType==null){var binRange=parseInt(data.substr(0,6),10);var ccLength=data.length;cardType=cardRangeObject.getCardTypeForNonTestCard(binRange,ccLength,isSwipedCard);
}return cardType;},getCardTypeIfTestCard:function getCardTypeIfTestCard(binRange){for(var cc in testCards){var ccBin=testCards[cc].binNumber;var ccType=testCards[cc].type;if(binRange==ccBin){return ccType;}}return null;},getCardTypeForNonTestCard:function getCardTypeForNonTestCard(binRange,ccLength,isSwipedCard){for(var range in ccRangeJson){var minRange=ccRangeJson[range].minBinRange;
var maxRange=ccRangeJson[range].maxBinRange;var length=ccRangeJson[range].cardLength;var cardType=ccRangeJson[range].cardType;if(((minRange!=null)&&(maxRange!=null))&&((binRange>=minRange)&&(binRange<=maxRange))&&(isSwipedCard||(ccLength)==length)){return cardType;}}return null;}};function RemoveParameterFromUrl(url,parameter){if(typeof parameter=="undefined"||parameter==null||parameter==""){throw new Error("parameter is required");
}url=url.replace(new RegExp("\\b"+parameter+"=[^&;]+[&;]?","gi"),"");url=url.replace(/[&;]$/,"");return url;}function updateCommonTagDataLayerProperties(tagCategId,tagPageId,tagSearchTerm){var globalDataLayer=window["jcpDLjcp"];if(globalDataLayer){jcpDLjcp.common.category=tagCategId;jcpDLjcp.common.pagePath=tagPageId;
jcpDLjcp.common.searchTerm=tagSearchTerm;jcpDLjcp.common.breadcrumb=$.trim($("#breadcrumb").text());}}function validateCoupon(couponId,couponCode){var commerceItemCount=getCookie("ItemCount");if(commerceItemCount==0||commerceItemCount==null){$("#couponItemCountMessage"+couponId).show();setHeightOfCoupons();
}else{if(couponModalReferrerUrl.indexOf("viewShoppingBag.jsp")==-1){if(inIframe()){$(top.document).find("#promocode").val(couponCode);$(top.document).find("#promoSubmit").trigger("click");$(top.document).find("#cboxOverlayIframe").remove();$(top.document).find("#iframeContainer").remove();}else{$("#couponCode").val(couponCode);
$("#couponCodeApplyForm").submit();}}else{$("#couponCode").val(couponCode);$("#couponCodeApplyForm").submit();}}}function setHeightOfCoupons(){var rowStart=0,rows=new Array(),coupon,topPos=0;$(".coupon").each(function(){coupon=$(this);coupon.css("height","");topPos=coupon.position().top;if(rowStart!=topPos){for(var currentDiv=0;
currentDiv<rows.length;currentDiv++){rows[currentDiv].height(currentTallest);}rows.length=0;rowStart=topPos;currentTallest=coupon.height();rows.push(coupon);}else{rows.push(coupon);currentTallest=Math.max(currentTallest,coupon.height());}for(var currentDiv=0;currentDiv<rows.length;currentDiv++){rows[currentDiv].height(currentTallest);
}});}function inIframe(){try{return window.self!==window.top;}catch(e){return true;}}function openModalEditItem(url,formFocusId){redirectOnSessionTimeOut(url);var formFocusElem="#"+formFocusId+" input[type!=hidden]:first";$.fn.colorbox({href:url,scrolling:false,overlayClose:false,escKey:false,close:function(){var img="<img id='cboxCloseImg' src='/dotcom/images/modal_close.gif' alt='close' />";
return $(img);},onComplete:function(){$(formFocusElem).focus();$("#colorbox").colorbox.resize();var modalContent=$("#cboxLoadedContent").html();if(modalContent.indexOf("redirectURL")!=-1){$.colorbox.remove();if(modalContent.indexOf("viewShoppingBag.jsp")!=-1){window.location="/dotcom/jsp/cart/viewShoppingBag.jsp?sessionExpired=true&redirectModal=true";
}else{window.location="/dotcom/jsp/error/error_session.jsp?sessionExpired=true&redirectModal=true";}}$.fn.colorbox.resize();}});}