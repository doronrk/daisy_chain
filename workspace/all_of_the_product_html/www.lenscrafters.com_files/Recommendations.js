RecommendationsJS={fastScrollSpeed:100,gender:null,answers:new Array(9),inStoreCookie:$.cookie("inStore"),requestSubmitted:false,getStyleQuizApi:function(){return $(".questions-scroll").data("scrollable")},getStyleQuizResult:function(){var totals=[0,0,0,0];for(var i=0;i<RecommendationsJS.answers.length;i++){totals[RecommendationsJS.answers[i]]++}var style=0;var max=0;var multipleMax=false;for(var i=0;i<totals.length;i++){if(totals[i]>max){max=totals[i];multipleMax=false;style=i+1}else{if(totals[i]==max){multipleMax=true}}}if(multipleMax){style=5}return style},ajaxGuestMemberAttributeValueUpdate:function(dataMap,emsName,confirmElement,url){dataMap.emsName=emsName;dataMap.URL="AjaxThankYouEspotView";dataMap.storeId=constants.ajaxParams.storeId;dataMap.catalogId=constants.ajaxParams.catalogId;dataMap.langId=constants.ajaxParams.langId;$.post("GuestMemberAttributeValueUpdateCmd",dataMap,function(data){if(confirmElement!=null){$(confirmElement).attr("aria-hidden","false").show()}else{if(url==null||url===undefined){$("#recommendEspot").html(data);$("#recommendEspotModal").attr("aria-hidden","false").show();$(".question .answer, .question .prev").unbind("click");scrollToElement($(".plan-visit-steps-holder"),500)}else{document.location=url}}})},emailTabletResultsHandler:function(form){$("#optIn").val($(":checked").length>0?"true":"false");$("#optin_18yrs_frameRecomModel").val($(":checked").length>0?"true":"false");var data=$("#emailFrameRecomModalForm").serializeArray();newData={};$.each(data,function(){newData[this.name]=this.value||""});$("#emailFrameRecomModal .subscribed").hide();$.ajax({url:getAbsoluteURL(true)+"RecommendationsTabletSaveAndSendCmd",type:"post",data:newData,dataType:"text",success:function(response){var responseData=$.parseJSON(response);if(responseData.status=="0"){$("#emailFrameRecomModal").dialog("close");$("#emailFrameRecomSuccessModal").dialog("open");return}else{if(responseData.status=="100"){$("#emailFrameRecomModal .subscribed").show();return}else{return}}},error:function(jqXHR,textStatus,errorThrown){console.log(textStatus+"textStatus");console.log(jqXHR+"jqXHR");console.log(errorThrown+"errorThrown");return false}});return false}};function showHideGreenPrescriptions(){if($("#right-eye-slider").slider("value")==0){$(".slider-eye-values li.right-eye-value ").attr("aria-hidden","true").css("visibility","hidden")}else{$(".slider-eye-values li.right-eye-value ").attr("aria-hidden","false").css("visibility","visible")}if($("#left-eye-slider").slider("value")==0){$(".slider-eye-values li.left-eye-value ").attr("aria-hidden","true").css("visibility","hidden")}else{$(".slider-eye-values li.left-eye-value ").attr("aria-hidden","false").css("visibility","visible")}}function setSliderDescription(eye){var value=$("#"+eye+"-eye-slider").slider("option","value");var message="";if(value<=-4){message="LENS_RX_VERY_NEAR"}else{if(value<=-2){message="LENS_RX_NEAR"}else{if(value<0){message="LENS_RX_MILD_NEAR"}else{if(value==0){message="LENS_RX_0"}else{if(value<2){message="LENS_RX_MILD_FAR"}else{if(value<4){message="LENS_RX_FAR"}else{if(value>=4){message="LENS_RX_VERY_FAR"}}}}}}}$("."+eye+"-eye-value .description").html(MessageHelper.messages[message])}function checkBothValuesOfSlider(){var rightValue=$("#right-eye-slider").slider("option","value");var leftValue=$("#left-eye-slider").slider("option","value");if(rightValue==0&&leftValue==0){$(".continueLensStep2").hide();$(".continueWithGeneral").show()}else{$(".continueLensStep2").show();$(".continueWithGeneral").hide();setSliderDescription("left");setSliderDescription("right")}}$(document).ready(function(){$(document).keyup(function(e){if(e.which==27&&$("#recommendEspotModal:visible")){$("#recommendEspotModal").hide()}});$("#right-eye-slider").slider({orientation:"horizontal",min:-4,max:4,value:0,step:0.1,change:function(event,ui){checkBothValuesOfSlider();$("#slider-ticks span").removeClass("highlight");var startPoint=(ui.value>0)?0:ui.value;for(i=startPoint;i<=startPoint+Math.abs(ui.value);i=i+0.1){$('#slider-ticks span[rel="'+i.toFixed(1)+'"]').addClass("highlight")}showHideGreenPrescriptions()},slide:function(event,ui){checkBothValuesOfSlider();$("#rEye").val(ui.value);if(ui.value>0){$("#right-eye-cover").css({width:(ui.value*110)+"px"}).removeClass("lessZero").addClass("greaterZero")}if(ui.value<0){$("#right-eye-cover").css({width:(ui.value*-110)+"px"}).removeClass("greaterZero").addClass("lessZero")}if(ui.value==0){$("#right-eye-cover").removeClass("greaterZero lessZero")}showHideGreenPrescriptions()}});$("#rEye").val($("#right-eye-slider").slider("value"));$("#left-eye-slider").slider({orientation:"horizontal",min:-4,max:4,value:0,step:0.1,change:function(event,ui){checkBothValuesOfSlider();$("#slider-ticks span").removeClass("highlight");var startPoint=(ui.value>0)?0:ui.value;for(i=startPoint;i<=startPoint+Math.abs(ui.value);i=i+0.1){$('#slider-ticks span[rel="'+i.toFixed(1)+'"]').addClass("highlight")}showHideGreenPrescriptions()},slide:function(event,ui){checkBothValuesOfSlider();$("#lEye").val(ui.value);if(ui.value>0){$("#left-eye-cover").css({width:(ui.value*110)+"px"}).removeClass("lessZero").addClass("greaterZero")}if(ui.value<0){$("#left-eye-cover").css({width:(ui.value*-110)+"px"}).removeClass("greaterZero").addClass("lessZero")}if(ui.value==0){$("#left-eye-cover").removeClass("greaterZero lessZero")}showHideGreenPrescriptions()}});$("#lEye").val($("#left-eye-slider").slider("value"));showHideGreenPrescriptions();var counterBig=-1;var incCount=-4;for(i=0;i<80;i++){counterBig++;if(counterBig==10&&i!=79){counterBig=0;$('<span class="big-tick" rel="'+incCount.toFixed(1)+'"></span>').appendTo("#slider-ticks")}else{$('<span rel="'+incCount.toFixed(1)+'"></span>').appendTo("#slider-ticks")}incCount+=0.1}$("#howToModal").dialog({autoOpen:false,draggable:false,resizable:false,modal:true,zIndex:9999,position:["center"],width:825});$("#photoUploadModal").dialog({autoOpen:false,draggable:false,resizable:false,modal:true,position:["center"],zIndex:9999,minWidth:620,open:function(){$("#back").live("click",function(){$("#photoUploadModal").dialog("close")});$(this).prev().hide()},close:function(){$("#faceShapeToolModalDiv").dialog("open");$("#back").unbind("click")}});$("#faceShapeToolModalDiv").dialog({autoOpen:false,title:"",draggable:false,resizable:false,position:["center"],modal:true,zIndex:9999,minWidth:990,open:function(){$("#recommendEspot, #faceShapeResponseDiv").hide()},close:function(){$("#faceShapeToolModalDiv").css("display","none");$("#inline-confirm").css("display","none")}});$("#PhotoUploadModalDiv").dialog({autoOpen:false,title:"",draggable:false,resizable:false,position:["center"],modal:true,zIndex:9999,minWidth:700});var dataMap={};$(".lensType").live("click",function(e){e.preventDefault();$(this).toggleClass("selected-lens");if($(".lensType.selected-lens").length>0){$("#continueLensStep").removeClass("continueLensStep").addClass("blue button continue").html('<span>Continue</span><span class="arrow"></span>');$("#continueLensStep").focus()}else{$("#continueLensStep").addClass("continueLensStep").removeClass("blue button continue").html('Continue, none apply to me <span class="arrow"></span>')}});if(Boolean(RecommendationsJS.inStoreCookie)!=true){$("#face-shape-container .section").hover(function(){$(this).children().children(".rollover-faceshape-info").show().attr("aria-hidden","false");$(this).children().find(".below").hide();$("#face-shape-container .section .below").addClass("gray")},function(){$(this).children().children(".rollover-faceshape-info").hide().attr("aria-hidden","true");$(this).children().find(".below").show();$("#face-shape-container .section .below").removeClass("gray")})}$("#continueLensStep").live("click",function(e){e.preventDefault();if(!this.requestSubmitted){this.requestSubmitted=true;var lensSelected="";if($(".lensType.selected-lens").length>0){$(".lensType").each(function(index){if($(this).hasClass("selected-lens")){$("#"+$(this).attr("id")+"In").val("Y");lensSelected+=$(this).attr("id")+","}else{$("#"+$(this).attr("id")+"In").val("N")}});lensSelected=lensSelected.slice(0,-1);$("#none").val("N")}else{$("#NightglareIn").val("N");$("#ComputerIn").val("N");$("#TransitionIn").val("N");$("#none").val("Y")}var tealiumData={page_name:"pyv:lenses:select",link_id:"pyv:lenses:select",pyv_answer:lensSelected};utagLinkSafe(tealiumData);$("#step1Form").submit()}});$(".continueLensStep2").click(function(e){e.preventDefault();if(!this.requestSubmitted){this.requestSubmitted=true;var strongRx="N";if(Math.abs($("#rEye").val())>=4||Math.abs($("#lEye").val())>=4){strongRx="Y"}dataMap["recStrongRx_"+constants.ajaxParams.storeId+"_r_1"]=strongRx;var tealiumData={page_name:"pyv:lenses-prescription-strength:select",link_id:"pyv:lenses-prescription-strength:select",pyv_answer:"R:"+$("#rEye").val()+" L:"+$("#lEye").val()};utagLinkSafe(tealiumData);RecommendationsJS.ajaxGuestMemberAttributeValueUpdate(dataMap,"Lens_Recommendations_Espot",null,$("#nextPageURL").text())}});$(".continueWithGeneral").click(function(e){e.preventDefault();if(!this.requestSubmitted){this.requestSubmitted=true;dataMap["recStrongRx_"+constants.ajaxParams.storeId+"_r_1"]="N";var tealiumData={page_name:"pyv:lenses-prescription-strength:select",link_id:"pyv:lenses-prescription-strength:select",pyv_answer:"R:0 L:0"};utagLinkSafe(tealiumData);RecommendationsJS.ajaxGuestMemberAttributeValueUpdate(dataMap,"Lens_Recommendations_Espot",null,$("#nextPageURL").text())}});if($(".questions-scroll").scrollable){$(".questions-scroll").scrollable({items:".questions",touch:false})}$(".question .gender").click(function(e){e.preventDefault();RecommendationsJS.gender=$(this).data("gender");var linkName="fyl_style1";var pos=(RecommendationsJS.gender=="male")?1:2;utagViewSafe({link_name:linkName,fyl_answer:RecommendationsJS.gender,fyl_position:pos})});$(".question .male").click(function(e){e.preventDefault();var maleStart=Math.ceil($(".question").length/2);var api=RecommendationsJS.getStyleQuizApi();api.seekTo(maleStart,RecommendationsJS.fastScrollSpeed);return false});var counter=0;$(".question .first").click(function(e){e.preventDefault();var api=RecommendationsJS.getStyleQuizApi();api.begin(RecommendationsJS.fastScrollSpeed);counter--;$(".indicators").removeClass("number"+(counter+1)).addClass("number"+counter)});$(".question .answer").bind("click",function(e){e.preventDefault();if(!this.requestSubmitted){var question=$(this).data("question");var answer=$(this).data("style");RecommendationsJS.answers[question-1]=answer-1;counter++;if(question==9){this.requestSubmitted=true;counter=9;$(".indicators").removeClass("number9").addClass("number9");var style=RecommendationsJS.getStyleQuizResult();dataMap["recStyle_"+constants.ajaxParams.storeId+"_r_1"]=style;dataMap["recGender_"+constants.ajaxParams.storeId+"_r_1"]=RecommendationsJS.gender=="male"?"M":"F";RecommendationsJS.ajaxGuestMemberAttributeValueUpdate(dataMap,"Style_Recommendations_Espot",null,$("#nextPageURL").text())}else{$(".indicators").removeClass("number"+(counter-1)).addClass("number"+counter)}if(question!=undefined){var linkName="fyl_style"+counter;var pos=$(this).data("answer");utagViewSafe({link_name:linkName,fyl_answer:answer,fyl_position:pos})}}});$(".question .prev").bind("click",function(e){counter--;$(".indicators").removeClass("number"+(counter+1)).addClass("number"+counter)});$(".openPrescriptionModal").click(function(e){e.preventDefault();$("#howToModal").dialog("open");$("#howToModal").parent().addClass("close-button-outside")});$("#face-shape-container .section").click(function(e){e.preventDefault();if(!this.requestSubmitted){this.requestSubmitted=true;dataMap["recFaceShape_"+constants.ajaxParams.storeId+"_r_1"]=$(this).attr("id");if($(this).parents(".ui-dialog").length>0){RecommendationsJS.ajaxGuestMemberAttributeValueUpdate(dataMap,"",$("#faceShapeResponseDiv"))}else{if($(this).closest("#plan-visit-view").length>0){RecommendationsJS.ajaxGuestMemberAttributeValueUpdate(dataMap,"",null,$("#nextPageURL").text())}}utagViewSafe({link_name:"fyl_shape",fyl_answer:$(this).attr("id"),fyl_position:$(this).closest(".section").index()+1})}});$(".photoUploadTool").click(function(e){e.preventDefault();$("#photoUploadModal").dialog("open");$("#photoUploadModal").parent().addClass("close-button-outside")});$("#faceShapeToolModalLink").click(function(e){e.preventDefault();$("#faceShapeToolModalDiv").dialog("open");$("#faceShapeToolModalDiv").parent().addClass("no-padding");return false});$(".FaceShap-sign-in-link").click(function(){$("#faceShapeToolModalDiv").dialog("close");$("#header-sign-in-modal").css("display","block").attr("aria-hidden","false");$(".sign-in-link").addClass("open");window.scrollTo(0,0)});$("#PhotoUploadLink").click(function(){$("#faceShapeToolModalDiv").dialog("close");$("#photoUploadModal").dialog("open");return false});$("#openEmailFrameRecomModal").click(function(){$("#emailFrameRecomModal").dialog("open")});$("#emailFrameRecomModal").dialog({autoOpen:false,draggable:false,resizable:false,modal:true,zIndex:9999,width:480,open:function(){$("#firstName_frameRecomModel").attr("tabindex","1");$("#lastName_frameRecomModel").attr("tabindex","2");$("#email_frameRecomModel").attr("tabindex","3");$("#optin_18yrs_frameRecomModel").attr("tabindex","4");$("#optIn").attr("tabindex","5");$("#cancelEmailFrameRecomModalForm").attr("tabindex","6");$("#sendEmailFrameRecomModalForm").attr("tabindex","7");$(".ui-dialog-titlebar-close").attr("tabindex","-1");$("#emailFrameRecomModal .cancel").bind("click",function(){$("#emailFrameRecomModal").dialog("close")})},close:function(){$("#firstName_frameRecomModel").attr("tabindex","-1");$("#lastName_frameRecomModel").attr("tabindex","-1");$("#email_frameRecomModel").attr("tabindex","-1");$("#optin_18yrs_frameRecomModel").attr("tabindex","-1");$("#optIn").attr("tabindex","-1");$("#cancelEmailFrameRecomModalForm").attr("tabindex","-1");$("#sendEmailFrameRecomModalForm").attr("tabindex","-1");$("#emailFrameRecomModal .cancel").unbind("click");$("#emailFrameRecomModalForm").trigger("reset")}});$("#emailFrameRecomSuccessModal").dialog({autoOpen:false,draggable:false,resizable:false,modal:true,zIndex:9999,width:470,open:function(){$("#emailFrameRecomModal .cancel").bind("click",function(){$("#emailFrameRecomModal").dialog("close")})},close:function(){$("#emailFrameRecomModal .cancel").unbind("click")}});$("#emailFrameRecomModalForm").validate({onfocusout:false,onkeyup:false,onclick:false,errorClass:"required",errorElement:"span",rules:{FirstName:{required:true},LastName:{required:true},email:{required:true,email:true},optin_18yrs_frameRecomModel:{required:function(){if($("#optIn").is(":checked")){return true}else{return false}}}},messages:{FirstName:{required:MessageHelper.messages.FIRSTNAME_FRAME_RECOMMENDATIONS_EMPTY_ERROR},LastName:{required:MessageHelper.messages.LASTNAME_FRAME_RECOMMENDATIONS_EMPTY_ERROR},email:{required:MessageHelper.messages.EMAIL_FRAME_RECOMMENDATIONS_EMPTY_ERROR,email:MessageHelper.messages.EMAIL_FRAME_RECOMMENDATIONS_INVALID_ERROR},optin_18yrs_frameRecomModel:{required:MessageHelper.messages.OPTIN_EMAIL_MARKETING_FRAME_RECOMMENDATIONS_ERROR}},errorPlacement:function(error,element){if(element.attr("name")=="optin_18yrs_frameRecomModel"){error.insertAfter("label[for=optin_18yrs_frameRecomModel]")}else{error.insertAfter(element)}},submitHandler:RecommendationsJS.emailTabletResultsHandler});$("#cancelEmailFrameRecomModalForm").click(function(){$("#cancelEmailFrameRecomModalForm").dialog("close");return false})});