var initText;$(document).ready(function(){initText=$("#locatorZip2").val();setupPDPCarousels();setupPDPValidation();setupScrollBars();createAccordion();setupClickHandlers();setupZoom();var analyticVars={upc:$(".product-upc span[id ^= upc]").text(),brand:$(".product-brand .brandName").text(),productName:$(".productName.product-title").text()};console.info("Analytic tracking product data: %o",analyticVars);if($("#featured-tout .ad").length>0){$("#featured-tout").addClass("tout")}$(".icn").each(function(i){var $facetTip=$(this).children(".faceted-tooltip");if($facetTip.length==0){return}var linkWidth=Math.floor($(this).width()/2);var marginLeft=Math.floor($facetTip.width()/2);$facetTip.css("marginLeft","-"+marginLeft+"px").css("left",linkWidth+"%")});$("#pdp-find-store").submit(function(){utagLinkSafe({link_name:"findinStore",product_id:[$('*[id^="upc"].upc').text()]})});setupFitLink();setupHowIFindMySizeLink();setupCategoryLink()});function setupPDPValidation(){$("#pdp-find-store").validate({onfocusout:false,onkeyup:false,onclick:false,errorClass:"required",errorElement:"span",rules:{zip:{required:true,zipCode:true}},messages:{zip:MessageHelper.messages.ERROR_ZipCodeEmpty},errorPlacement:function(error,element){element.parent("form").append(error)},highlight:function(element,errorClass){$(element).addClass("required")},unhighlight:function(element,errorClass){$(element).removeClass("required")},submitHandler:function(form){form.submit()}});$("#email-form").validate({onfocusout:false,onkeyup:false,onclick:false,errorClass:"required",errorElement:"span",rules:{recipientEmail:{required:true,email:true,validEmail:true,specialCharacters:true},fromName:{required:true,specialCharacters:true},senderEmail:{required:true,specialCharacters:true},pdp_18yrs:{required:function(){return $(".is18").is(":visible")}},messageBody:{required:true}},messages:{recipientEmail:MessageHelper.messages.ERROR_EmailProvide,fromName:MessageHelper.messages.ERROR_YourNameEmpty,senderEmail:MessageHelper.messages.ERROR_EmailEnter,pdp_18yrs:MessageHelper.messages.ERROR_CERT_18,messageBody:MessageHelper.messages.ERROR_MessageEmpty},highlight:function(element,errorClass){$(element).addClass("required")},unhighlight:function(element,errorClass){$(element).removeClass("required")},errorPlacement:function(error,element){if(element.attr("name")=="pdp_18yrs"){error.insertAfter("label[for=pdp_18yrs]")}else{error.insertAfter(element)}},submitHandler:function(form){var $form=$(form);var data=$form.serialize();var url=$form.attr("action");$.ajax({url:url,data:data,dataType:"json",type:"post",complete:function(response){$("#emailPDPModal").dialog("close");try{var responseData=$.parseJSON(response.responseText);if(responseData.success=="true"){MessageHelper.displayStatusMessage(MessageHelper.messages.MAIL_SUCCESS);var info=responseData.info.split("-")[1];if(info=="true"){utagLinkSafe({link_name:"emailSubscribe"})}}else{MessageHelper.displayErrorMessage(constants.error.ajax)}}catch(err){MessageHelper.displayErrorMessage(constants.error.ajax)}}});return false}})}function setupPDPCarousels(){var count=0;$("#carouselHeaders li").each(function(){var carouselHeader=$(this);var carouselId=$("a",this).attr("href");var carouselContent=$(carouselId)});if($("#carousel, #bv-tabs").find(".catalog-item").length>0){$("#carousel, #bv-tabs").show()}$("#carousel, #bv-tabs").tabs({selected:0})}function createCarousel(element,isAccessoryCarousel){var carousel=$(element);var currentSlide=1,counter,productsPerSlide,numberOfSlides,previousButton,nextButton,shiftAmount,totalSlides;totalSlides=$(element).find(".catalog-item").length;if(isAccessoryCarousel){productsPerSlide=3;shiftAmount=561}else{productsPerSlide=3;shiftAmount=555}numberOfSlides=Math.ceil(totalSlides/productsPerSlide);if(totalSlides>0){var cl="."+$(element).attr("id");$(element).removeClass("hide");$(cl).removeClass("hide")}if(totalSlides>productsPerSlide){previousButton=$("<a />").addClass("previous").attr("href","#").text("previous");nextButton=$("<a />").addClass("next").attr("href","#").text("next");carousel.prepend(previousButton);carousel.append(nextButton);previousButton.click(function(){var container=carousel.find(".container");if(currentSlide!=1){container.css("position","relative").animate({left:"+="+shiftAmount+"px"},500);currentSlide-=1}else{if(currentSlide!=numberOfSlides){currentSlide=numberOfSlides;container.css("position","relative").animate({left:"-="+((numberOfSlides-1)*shiftAmount)+"px"},500)}}return false});nextButton.click(function(){var container=carousel.find(".container");if(currentSlide!=numberOfSlides){container.css("position","relative").animate({left:"-="+shiftAmount+"px"},500);currentSlide+=1}else{if(currentSlide!=1){currentSlide=1;container.css("position","relative").animate({left:"+="+((numberOfSlides-1)*shiftAmount)+"px"},500)}}return false})}carousel.append(counter)}function createAccordion(){var $length,$current=1,$currentObject;$length=$(".description-info .collapsible-section").length-1;if($length>0){$(".description-info .collapsible-section").hide();$(".description-info .collapsible-section").eq(1).show();$currentObject=$(".description-info h2").eq(1);$(".description-info h2").eq(0).addClass("ui-state-default").removeClass("ui-state-active");$($currentObject).addClass("ui-state-active").removeClass("ui-state-default");if($(".description-info .content").length>1){$(".description-info h2").bind("click",function(e){if($(this).next(".collapsible-section").is(":visible")){$(this).removeClass("ui-state-active").addClass("ui-state-default");$(this).next(".collapsible-section").slideUp("fast");$current++;if($current>$length){$currentObject=$(".description-info h2:first");$current=0}else{$currentObject=$(".description-info h2")[$current]}$($currentObject).addClass("ui-state-active").removeClass("ui-state-default");$($currentObject).next(".collapsible-section").slideDown("fast")}else{if($(".description-info .collapsible-section").is(":visible")){$(".description-info .collapsible-section").slideUp("fast")}$($currentObject).removeClass("ui-state-active").addClass("ui-state-default");$currentObject=$(this);$($currentObject).addClass("ui-state-active").removeClass("ui-state-default");$current=$(e.target).parent().index();$(this).next(".collapsible-section").slideDown("fast")}})}}else{}}function setupScrollBars(){if($(".collapsible-section.description-area").innerHeight()>240){$(".collapsible-section.description-area").jScrollPane({scrollbarWidth:11,dragMinHeight:0,dragMaxHeig:24,showArrows:true,arrowSize:19})}}function openVideo(vidPath,swfDir){var params={scale:"exactFit"},flashVars={video:vidPath};$("#video-holder").hide();$("#pdp-flash-modal").show();swfobject.embedSWF(swfDir+"videoplayer.swf","pdp-flash-container","100%","100%","9",swfDir+"expressinstall.swf",flashVars,params);var analyticVars={upc:$(".product-upc span[id ^= upc]").text(),brand:$(".product-brand .brandName").text(),productName:$(".productName.product-title").text(),video:vidPath};console.info("Analytic tracking video data: %o",analyticVars);return false}function setupClickHandlers(){$("#pdp_optin").click(function(){var pdp_18yrs=$("#pdp_18yrs");if($(this).is(":checked")){$(pdp_18yrs).removeAttr("checked");$(pdp_18yrs).attr("value","false")}else{$(pdp_18yrs).attr("checked","checked");$(pdp_18yrs).attr("value","true")}});$("#email-pdp").click(function(){$("#emailPDPModal").dialog({modal:true,width:450,close:function(){var validatorEmail=$("#email-form").validate();validatorEmail.resetForm();$(":input","#email-form").removeAttr("selected").not(":hidden").val("").removeClass("required")}});return false});$("#locatorZip2").focus(function(){if($(this).val()==initText){$(this).val("")}});$("#locatorZip2").blur(function(){if($(this).val()==""){$(this).val(initText)}});$(".sLocator, .close-zip-tip").click(function(e){e.preventDefault();if($(".locatorZipHolder").hasClass("hide")){$(".locatorZipHolder").removeClass("hide")}else{$(".locatorZipHolder").addClass("hide")}});$("a.viewByToggle").click(function(){closeAll();if($(this).is(".accessory a")){return false}var $imgSrc=$("#pdp_glass").attr("src");isQt=$imgSrc.indexOf("shad_qt")>-1;if($(this).attr("class").indexOf("inactive")>-1){$(".pdp_fr").removeClass("redesignPdp-front-active").addClass("redesignPdp-front-inactive");$(".pdp_qt").removeClass("redesignPdp-qt-active").addClass("redesignPdp-qt-inactive");if(isQt){$imgSrc=$imgSrc.replace(/shad_qt/g,"shad_fr");$(this).removeClass("redesignPdp-front-inactive").addClass("redesignPdp-front-active")}else{$imgSrc=$imgSrc.replace(/shad_fr/g,"shad_qt");$(this).removeClass("redesignPdp-qt-inactive").addClass("redesignPdp-qt-active")}$("#pdp_glass").attr("src",$imgSrc)}return false})}function setupZoom(){var isAccessory=$("#isAccessory").val()=="true";$(".pdp-zoom").click(function(e){closeAll();$("#zoomViewer").show().addClass("open");$(".close","#right-nav").hide();$("#zoomViewer").find(".close").on("click",function(){$("#pdpImage img").remove();$(".iviewer_toggle").children().remove();$("#zoomViewer").hide().removeClass("open");$(".close","#right-nav").show()});var zoom_img=$("a.pdpZoom").attr("href");$("#zoomViewer .iviewer_common, #pdpImage .iviewer_common").remove();$("#pdpImage").iviewer({initCallback:function(){window.iviewer=this},onStartLoad:function(b){this.img_object.object.css("visibility","hidden")},onFinishLoad:function(b){this.img_object.object.css("visibility","visible")},accessory:isAccessory,zoom_max:400});window.iviewer.loadImage(zoom_img);$("#pdpImage .iviewer_common").clone(true).appendTo("#zoomViewer");$("#pdpImage .iviewer_common").remove();$("a.viewByToggle").clone().attr("rel","").appendTo(".iviewer_toggle").click(function(e){closeAll();e.preventDefault();$.displayModalToggle($(this))});$("#zoomViewer a.viewByToggle img").each(function(i,e){if($(this).attr("src").indexOf("empty.gif")>0||$(this).attr("src")==undefined){$(this).parent().remove()}});return false});var bannerHeight=$("#brand-banner").height();if(bannerHeight){bannerHeight+=3}var pdp_zoom_options={zoomType:"standard",lens:true,preloadImages:false,alwaysOn:false,zoomWidth:344,zoomHeight:344,xOffset:0,yOffset:-bannerHeight,position:"right",title:false}}function destroyOnPageRotator(){$("#p3dzoom-image").unreel();$(".p3dzoom-rotate-btn").unbind()}function destroyModalRotator(){$("#p3dzoom-image-modal").unreel();$(".p3dzoom-rotate-btn").unbind()}function modalAndButtonRotator(){var productContainer=$("#product"),productThumbs=productContainer.find(".viewBy"),otherThunmbs=productThumbs.find(".viewByToggle"),p3dFullScreen=productContainer.find(".p3dzoom-controls .zoom-fs"),instructionsTxt=productContainer.find(".instructionText"),isRotatorShowing=null;var showRotatorLink=$(".p3dzoom-icon-link");showRotatorLink.bind("click",function(){closeAll();if(!productContainer.hasClass("showingRotator")){destroyOnPageRotator();$("#p3dzoom-image").reel(rotateOptions);productContainer.addClass("showingRotator");if(isRotatorShowing==false){$("#p3dzoom-image").reel(rotateOptions)}if($("#product-graphics-area").hasClass("is180")){$("#p3dzoom-image").reel("frame","1");utagLinkSafe({link_name:"view180",product_id:[$.trim($(".product-upc .upc").text())]})}if($("#product-graphics-area").hasClass("is360")){utagLinkSafe({link_name:"view360",product_id:[$.trim($(".product-upc .upc").text())]})}isRotatorShowing=true;showRotatorLink.removeClass("redesignPdp-rotate-inactive").addClass("redesignPdp-rotate-active active")}else{destroyOnPageRotator();productContainer.removeClass("showingRotator");showRotatorLink.removeClass("redesignPdp-rotate-active active").addClass("redesignPdp-rotate-inactive")}});otherThunmbs.bind("click",function(){productContainer.removeClass("showingRotator");isRotatorShowing=false;return isRotatorShowing});p3dFullScreen.bind("click",function(){closeAll();var rotatorModal=$("#rotatorViewer");rotatorModal.dialog({modal:true,width:896,height:500,resizable:false,position:"center",open:function(){destroyOnPageRotator();rotatorModal.parent().addClass("rotatorViewer");$("#p3dzoom-image-modal").reel(rotateOptions);if($("#product-graphics-area").hasClass("is180")){$("#p3dzoom-image-modal").reel("frame","1")}},close:function(){rotatorModal.parent().removeClass("rotatorViewer");rotatorModal.html(initialModalRotate);destroyModalRotator();$("#p3dzoom-image").reel(rotateOptions);if($("#product-graphics-area").hasClass("is180")){$("#p3dzoom-image").reel("frame","1")}}})})}function setupFitLink(){var $fit=$(".fit",".viewBy"),$overlay=$("#fit-overlay");$fit.click(function(){closeAll();var $this=$(this);if($this.hasClass("active")){$this.removeClass("redesignPdp-fit-active active").addClass("redesignPdp-fit-inactive")}else{$this.removeClass("redesignPdp-fit-inactive").addClass("redesignPdp-fit-active active")}$overlay.toggle();return false})}function setupHowIFindMySizeLink(){var $link=$(".tooltipClickLeft",".content"),$overlay=$("#how-overlay"),$close=$overlay.find(".close");$link.click(function(){$overlay.show();$("html, body").animate({scrollTop:$overlay.offset().top},500);return false});$close.click(function(){$overlay.hide();return false})}function setupCategoryLink(){var $link=$(".tooltipClickAU",".content"),$overlay=$("#category-modal"),$close=$overlay.find(".close");$link.click(function(){$overlay.show();$("html, body").animate({scrollTop:$overlay.offset().top},500);return false});$close.click(function(){$overlay.hide();return false})}function closeAll(){destroyOnPageRotator();$("#product").removeClass("showingRotator");$(".p3dzoom-icon-link").removeClass("redesignPdp-rotate-active active").addClass("redesignPdp-rotate-inactive");$("#fit-overlay").hide();$(".fit",".viewBy").removeClass("redesignPdp-fit-active active").addClass("redesignPdp-fit-inactive");$("#pdpImage img").remove();$(".iviewer_toggle").children().remove();$("#zoomViewer").hide().removeClass("open");$(".close","#right-nav").show()};