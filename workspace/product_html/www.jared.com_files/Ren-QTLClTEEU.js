/* Script imported from http://www.jared.com/Jared/js/scripts.js?ver_js=118 */
$(document).ready(function(){var menuWidths=0;$(".megamenu .menu").each(function(){menuWidths+=$(this).width();menuWidths+=parseInt($(this).css("margin-left"));menuWidths+=parseInt($(this).css("margin-right"));menuWidths+=parseInt($(this).css("padding-left"));menuWidths+=parseInt($(this).css("padding-right"));});var len=$(".megamenu .menu").length;$(".megamenu .menu").each(function(index,element){if(menuWidths<1000){$(this).width($(this).width()+parseInt((1000-menuWidths)/len));if(index==len-1){$(this).width($(this).width()+(1000-menuWidths)%len);}}});$(".megamenu .submenu-content").each(function(){$(this).width($(this).children("ul").length*166+11-7);if($(this).find(".submenu-list-right").length==0){$(this).width($(this).children("ul").length*2+$(this).width());}if($(this).children(".submenu-list-right").children("li").length<=0){$(this).css("background","#ffffff").width($(this).width()-5);}if(($(this).children("ul").length==1)&&(($(this).children(".submenu-list-right").children("li").length>0))){$(this).css("background-position","left top").width(154);$(this).children(".submenu-list-right").children("li").css("margin-left","25px");}if($(this).find("#subMenuContainer").length>0){$(this).css("width","");$(this).addClass("autoWidth");$(this).children("ul").addClass("autoWidth");}});if(typeof jQuery.ui!="undefined"){$(window).resize(function(){$(".ui-dialog-content:visible").each(function(){$(this).dialog("option","position",$(this).dialog("option","position"));});});}$(".event-popper-toggle").click(function(){$("#popup-curtain").toggle();$("#event-popup").toggle();});$(".event-popper-show").click(function(){$("#popup-curtain").show();$("#event-popup").show();});$(".event-popper-hide").click(function(){$("#popup-curtain").hide();$("#event-popup").hide();});$(".util-nav>.left").click(function(){$(".util-nav>.left").toggleClass("hidden");});$(".footer-link .expand, .footer-link .expandSectionHeader").click(function(){$(this).closest(".footer-links").toggleClass("active");return false;});$(".tool-search").parent().hover(function(){$(this).children(".autocomplete").addClass("active");},function(){$(this).children(".autocomplete").removeClass("active");});$(".modal .link").focus(function(){$(".modal").removeClass("active");$(this).closest(".modal").addClass("active");});$(".modal .link").blur(function(){$(".modal").removeClass("active");$(this).closest(".modal").removeClass("active");});$(".modal .modal-content a, .modal .minitools a").focus(function(){$(".modal").removeClass("active");$(this).closest(".modal").addClass("active");});$(".modal").hover(function(){$(this).addClass("active");},function(){$(this).removeClass("active");});var index=0;var focusedMenuItem=null;var hoveredMenuItem=null;var isMobile={Android:function(){return navigator.userAgent.match(/Android/i);},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i);},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera:function(){return navigator.userAgent.match(/Opera Mini/i);},Windows:function(){return navigator.userAgent.match(/IEMobile/i);},any:function(){return(isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows());}};$(".megamenu .menu").hover(function(){if(!$(this).is(focusedMenuItem)){focusOut(focusedMenuItem);}$(this).addClass("active");megamenu_position(this,$(this).children(".submenu"));hoveredMenuItem=this;},function(){$(this).removeClass("active");megamenu_revert($(this).children(".submenu"));hoveredMenuItem=null;});$(".megamenu .menu").focusin(function(){$(this).addClass("active");megamenu_position(this,$(this).children(".submenu"));focusedMenuItem=this;if(!$(this).is(hoveredMenuItem)){hoverOut(hoveredMenuItem);}});$(".megamenu .menu").focusout(function(){$(this).removeClass("active");if(!isMobile.any()){megamenu_revert($(this).children(".submenu"));}});function focusOut(focusedMenuItem){$(focusedMenuItem).removeClass("active");megamenu_revert($(focusedMenuItem).children(".submenu"));}function hoverOut(hoveredMenuItem){$(hoveredMenuItem).removeClass("active");megamenu_revert($(hoveredMenuItem).children(".submenu"));}$(".modal-content, .minitools").css("display","none");$(".modal-content:first-child").css("display","").addClass("vis").next(".minitools").css("display","");$(".accordion a").bind("click keypress",function(e){if((e.type=="click")||((e.keyCode==13)||(e.which==13))){var hrefVal=$(this).attr("href");if(hrefVal!=undefined){window.location.href=hrefVal;}else{$(this).parent().toggleClass("active");if($(this).parent().hasClass("active")){if($(this).attr("id")=="paymentOptions"){$(this).html("Hide Payment Options");}}else{if($(this).attr("id")=="paymentOptions"){$(this).html("Additional Payment Options");}}return false;}}});$(".pip-tabset-container .tabset .tab").bind("mouseenter focusin",function(){$(".pip-tabset-container .tabset .tab, .pip-tabset-container .tab-content-container .tab-content").removeClass("active");$(this).addClass("active");$(".pip-tabset-container .tab-content[id="+$(this).attr("name")+"]").addClass("active");});$(".pip-tabset-container .tab-content-container .tab-content").focusin(function(){$(".pip-tabset-container .tabset .tab, .pip-tabset-container .tab-content-container .tab-content").removeClass("active");$(".pip-tabset-container .tabset .tab[id="+$(this).attr("name")+"]").addClass("active");$(this).addClass("active");});$("body").delegate(".sl-tabset-container .tabset .tab","mouseenter",function(){$(".sl-tabset-container .tabset .tab, .sl-tabset-container .tab-content-container .tab-content").removeClass("active");$(this).addClass("active");$(".sl-tabset-container .tab-content[id="+$(this).attr("name")+"]").addClass("active");});$(".expand-all").click(function(){$(this).parent().parent().find(".accordion").addClass("active");return false;});$(".collapse-all").click(function(){$(this).parent().parent().find(".accordion").removeClass("active");return false;});$(".media-img-small").click(function(){$(this).toggleClass("active");});$(function(){$(".scrollable").jScrollPane();});$(".tab-content#tab1 .section-header .expand-button").bind("click keydown",function(e){if((e.type=="click")||((e.keyCode==13)||(e.which==13))){$(this).parent().toggleClass("expand");$(this).parent().next().toggleClass("expand");if($(this).parent().hasClass("expand")){$(this).attr("aria-label","banner expanded, click to collapse");$(this).parent().next().attr("aria-expand",true);$(this).parent().next().find("a").attr("tabindex","675");}else{$(this).attr("aria-label","banner collapsed, click to expand");$(this).parent().next().attr("aria-expand",false);$(this).parent().next().find("a").attr("tabindex","-1");}}});$(".plp-header-content .expand-button").bind("click keydown",function(e){if((e.type=="click")||((e.keyCode==13)||(e.which==13))){togglePLPBanner();}});$(".plp-expand").bind("click keydown",function(e){if((e.type=="click")||((e.keyCode==13)||(e.which==13))){if(!$(".plp-header-content .expand-button").parent().hasClass("expand")){togglePLPBanner();}$(".section-content.expand").removeClass("expand");$("#plp-content-"+$(this).attr("id")).addClass("expand");$(".plp-expand.active-plp-section").removeClass("active-plp-section");$(this).addClass("active-plp-section");if(jwplayer().getState()=="PLAYING"){jwplayer().pause();}}});$(".plp_banner_video_keydown").keypress(function(e){if((e.keyCode==13)||(e.which==13)){$(this).click();}});$(".grid_28 p a").each(function(){if($(this).parents().hasClass("section-content-container expand")){$(this).attr("tabindex","675");$(this).parent().parent().parent().attr("aria-expand",true);}else{if($(this).parents().hasClass("section-content-container")){$(this).attr("tabindex","-1");$(this).parent().parent().parent().attr("aria-expand",false);}else{$(this).attr("tabindex","675");}}});$(".credit-boxes-shadow p a, .credit-brown-button").each(function(){$(this).attr("tabindex","675");});resetGiftCardRadioButtons();$(".gift-card-form input").click(function(){if($(this).attr("type")=="radio"){resetGiftCardRadioButtons();if($(this).attr("checked")){$(this).attr("tabindex","675");}}setGiftCardOtherValueField();});resetPaymentOptionsRadioButtons();setPaymentOptionOtherAmount();$(".payment-options input").click(function(){if($(this).attr("type")=="radio"){resetPaymentOptionsRadioButtons();if($(this).attr("checked")){$(this).attr("tabindex","675");}}setPaymentOptionOtherAmount();});$("#paymentFrequency input").click(function(){if($(this).attr("type")=="radio"){resetPaymentOptionsRadioButtons();setPaymentOptionOtherAmount();}});$(".radio-consent input").click(function(){if($(this).attr("type")=="radio"){resetSDORadioButtons();}});var checked_SDO_RB=false;$(".radio-consent input").each(function(){if($(this).attr("type")=="radio"){if($(this).attr("checked")){checked_SDO_RB=true;}}});if(checked_SDO_RB==true){resetSDORadioButtons();}$("#RQD_FCState").each(function(){$(this).attr("aria-labelledby","homeAddress TD_FCState");});$("#RQD_MAState").each(function(){$(this).attr("aria-labelledby","mailingAddress TD_MAState");});$(".breadcrumb-container a").each(function(){if($(this).attr("href")==""){$(this).attr("tabindex","-1");}else{$(this).attr("tabindex","510");}});$(".myacct-main-top-boxes .myaccount-boxes a").each(function(){$(this).attr("tabindex","-1");});$(".myacct-main-top-boxes .myaccount-boxes .myaccount-main-title a").each(function(){$(this).attr("tabindex","675");});$(".myacct-main-bottom-boxes .myaccount-boxes a").each(function(){if($(this).is(":visible")){$(this).attr("tabindex","675");}else{$(this).attr("tabindex","-1");}});$("#jaredPrivacyPolicy a").each(function(){$(this).attr("tabindex","675");});checkPLPBannerState();});function checkPLPBannerState(){var state=getCookie("last_banner_state");var category=getCookie("lastPLPBannerCategory");var currentCategory=$("#categoryIdElement").val();if(currentCategory==category){if(state=="0"){collapsePLPBanner();}}}function togglePLPBanner(){if($(".plp-banner-container").hasClass("collapsed")){expandPLPBanner();}else{collapsePLPBanner();}}function expandPLPBanner(){$("#collapse-expand-text").text("COLLAPSE");$(".plp-banner-container").removeClass("collapsed");$(".plp-header-content .expand-button").parent().addClass("expand");var att=document.createAttribute("aria-label");att.nodeValue="banner expanded, click to collapse";document.getElementById("expandButton").setAttributeNode(att);var expDt=new Date();var categoryId=$("#categoryIdElement").val();expDt.setDate(expDt.getDate()+1);document.cookie="last_banner_state=1;path=/";document.cookie="lastPLPBannerCategory="+categoryId+";path=/";}function collapsePLPBanner(){$("#collapse-expand-text").text("EXPAND");$(".plp-header-content .expand-button").parent().removeClass("expand");$(".plp-banner-container").addClass("collapsed");var att=document.createAttribute("aria-label");att.nodeValue="banner collapsed, click to expand";document.getElementById("expandButton").setAttributeNode(att);var expDt=new Date();var categoryId=$("#categoryIdElement").val();expDt.setDate(expDt.getDate()+1);document.cookie="last_banner_state=0;path=/";document.cookie="lastPLPBannerCategory="+categoryId+";path=/";}function megamenu_position(parent,element){var elementCount=$(element).parent().prevAll().length;if(elementCount<=2){$(element).css("top",$(element).parent().height());$(element).css("left","0");$(element).css("right","auto");}else{if(elementCount>=7){$(element).css("left","auto");$(element).css("top",$(element).parent().height());$(element).css("right",0);}else{$(element).css("left","auto");$(element).css("top",$(element).parent().height());if(elementCount==6){$(element).css("right",0-$(element).width()/2+$(element).width()*0.25);}else{$(element).css("right",0-$(element).width()+$(element).width()/2);}}}var darLayoutElementCount=$(element).find("#subMenuContainer").length;if(darLayoutElementCount>0){set_dar_layout(element,elementCount);switch_OnHover_Images(".megamenu .menu #subMenuContainer img");}}function set_dar_layout(element,hoveredMegaMenuIndex){$(element).css("right","auto");$(element).css("width","");var leftAlign=0;$(".megamenu .menu").each(function(index){if(index<hoveredMegaMenuIndex-1){leftAlign=leftAlign-$(this).width()-4;if(Math.abs(leftAlign)>$(".header-container").width()-150){leftAlign=0;}}});$(element).css("left",leftAlign);}function switch_OnHover_Images(images_Selector){$(images_Selector).each(function(index,elementImage){var actualImageToLoad=$(this).attr("src_actualimage");var imagesNotLoaded=$(this).attr("imagesLoaded")!="true";if(imagesNotLoaded&&actualImageToLoad){$(this).attr("src",actualImageToLoad);$(this).attr("imagesLoaded","true");}});}function megamenu_revert(element){$(element).css("left","");$(element).css("right","");}(function($){$.fn.extend({customStyle:function(options){if(!$.browser.msie||($.browser.msie&&$.browser.version>6)){return this.each(function(){var currentSelected=$(this).find(":selected");$(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">'+currentSelected.text()+"</span></span>").css({position:"absolute",opacity:0,fontSize:$(this).next().css("font-size")});var selectBoxSpan=$(this).next();var selectBoxWidth=parseInt($(this).width())-parseInt(selectBoxSpan.css("padding-left"))-parseInt(selectBoxSpan.css("padding-right"));var selectBoxSpanInner=selectBoxSpan.find(":first-child");selectBoxSpan.css({display:"inline-block"});selectBoxSpanInner.css({width:selectBoxWidth,display:"inline-block"});var selectBoxHeight=parseInt(selectBoxSpan.height())+parseInt(selectBoxSpan.css("padding-top"))+parseInt(selectBoxSpan.css("padding-bottom"));$(this).height(selectBoxHeight).change(function(){selectBoxSpanInner.text($(this).find(":selected").text()).parent().addClass("changed");});});}}});})(jQuery);function changeVideo(vFile){jwplayer().load({file:vFile});jwplayer().play();}function resetGiftCardRadioButtons(){$(".gift-card-form input").each(function(){if($(this).attr("type")=="radio"){if($(this).attr("checked")){$(this).attr("tabindex","675");}else{$(this).attr("tabindex","-1");}}});setGiftCardOtherValueField();}function setGiftCardOtherValueField(){if($(".special-radio-button").attr("checked")){$("#otherValue").attr("tabindex","675");}else{$("#otherValue").attr("tabindex","-1");}}function resetPaymentOptionsRadioButtons(){var somethingIsChecked=false;$(".payment-options input").each(function(){if(($(this).attr("type")=="radio")&&($(this).attr("checked"))){somethingIsChecked=true;}});if(somethingIsChecked==true){$(".payment-options input").each(function(){if($(this).attr("type")=="radio"){if($(this).attr("checked")){$(this).attr("tabindex","675");}else{$(this).attr("tabindex","-1");}}});}}function setPaymentOptionOtherAmount(){if($("#payment_amt_other").attr("checked")){$("#my_payment_amount").attr("tabindex","675");}else{$("#my_payment_amount").attr("tabindex","-1");}}function resetSDORadioButtons(){$(".radio-consent input").each(function(){if($(this).attr("type")=="radio"){if($(this).attr("checked")){$(this).attr("tabindex","675");}else{$(this).attr("tabindex","-1");}}});}function getCMSLinksForUserSiteMap(sourceId,destinationId){$(document).ready(function(){var cmsLinksHTML="";$("[cms_top_cat_link="+sourceId+"]").each(function(){cmsLinksHTML=cmsLinksHTML+$(this).html();});$("#"+destinationId).html(cmsLinksHTML);});}