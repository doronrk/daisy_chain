var toolTip=function(c){var a=8;var b="bottomLeft";c.show=function(f,h,k,d){var i="",k=(k!=null)?true:false;var d=(d!=null)?d:b;var j=$(f).height();var g=$(f).data("title");if(g==""||typeof g=="undefined"){g=$(f).attr("title");$(f).data("title",g)}if($(f).attr("title")){$(f).attr("title","")}if(k==true){i='<a class="close_tool_tip fright"><img src="/images/od/v2/attachments-lightbox-closebtn.png" /></a>'}$("body").append('<div id="tooltip" class="rounded shadow">'+i+'<p class="tool_txt">'+g+"</p></div>");switch(d){case"topCenter":j=$("#tooltip").height()+12;a=($("#tooltip").width()/2)-12;$("#tooltip").css("top",($(f).offset().top-j)+"px").css("left",($(f).offset().left-a)+"px").show();break;case"bottomLeft":default:a=8;$("#tooltip").css("top",($(f).offset().top+j)+"px").css("left",($(f).offset().left+a)+"px").show();break}if(k==true){$(".close_tool_tip").click(function(){toolTip.close(f)})}};c.close=function(d){toolTxt=$(d).data("title");$(d).attr("title",toolTxt);$("#tooltip").remove()};return c}(toolTip||{});$(function toolTip_ready(){var a=odApp.utils.browser;if(a.isMobile.Tablet()){$("#assortmentAvailability").click(function(b){b.preventDefault();toolTip.show(this,b,true)})}else{$("#assortmentAvailability").on("click",function(b){b.preventDefault()});$("#assortmentAvailability").hover(function(b){toolTip.show(this,b)},function(b){toolTip.close(this,b)})}});function getSkuAvailableOptions(e){if($("#skuDescription").length==0){return}var d=$("#skuDescription").html().trim();d=d.replace(/\&amp;/g," ");var c=$("#avalilableDefaultOption").val().trim();var b=$("#skuNumber").html().trim();var a=d.indexOf(",");if(a>0){var f=d.substring(0,a);$.ajax({type:"GET",url:common_utils.appendSessionId("/mobile/getSkuAvailableOptions.do"),data:{familyDescription:f,sku:b,noLogin:true},success:function(p){var o=$.parseJSON(p);var t=o.skus;var r=o.skusCount;var u=$("#alsoAvailCMCat").val().trim();var j=$("#alsoAvailCMElePrefix").val().trim();var l="<div class='selectTrigger brandColor_sp1'><span>"+c+"</span></div>";if(r>0){var h=l+"<div id='optionsWrapper' style='display:none'><ul id='skuskuAvailableSelect'>";for(var n=0;n<t.length;n++){var q=parseInt(n)+1;var s=t[n].sku;var m=j+"_"+b+"_"+s+"_"+q+"_"+r;var v="trigerCoreMetrics('"+m+"','"+u+"');";var g='<li><a style="background:url('+t[n].thumbnailImageUrl+') no-repeat" class=" " href="'+t[n].url+'" onclick="'+v+'"><span>'+t[n].attributesDescription+"<span></a></li>";h=h+g}h=h+"</ul></div>";$(e).html(h).show()}if(r>12){var k=$("#optionsWrapper").outerWidth();$("#optionsWrapper").css({width:(k+20),height:"312px","overflow-y":"auto"})}}})}}function showSkuAvailableOptions(a){$(a).click(function(){$("#optionsWrapper").toggle();$(".selectTrigger").toggleClass("active")});$(a+", #optionsWrapper").mouseleave(function(){$("#optionsWrapper").hide();$(".selectTrigger").removeClass("active")})}function trigerCoreMetrics(b,a){if(coreMetricsEnabled){cmCreateElementTag(b,a)}}var skuAttributes=function(S){var m,I,d=[],z=[],N,K,g="defaultMsg",M=" (Unavailable)",ab="unavailable_txt",E=false,C=false,l,F="Label",e="/catalog/catalogSku.do?id=",t,Y="selected_swatch",W=Y+"_error",r;var T={};T.defaultErrorMsg="This product combination is unavailable.";T.loaderClass="carouselLoading";T.swatchIdSuffix="Swatches";T.reciprocalXOuts=false;T.scene7URL,T.scene7ZoomPreset="$Enlarge$",T.scene7LargePreset="$OD%2DLarge$",T.scene7SmallPreset="$OD%2DSmall$";S.init=function(ad,p){I=p;S.setJSONData(ad);try{if(m.attributes.length&&m.skus.length){P();u();U();s()}}catch(ac){return ac}};S.isBSD=function(){return a()};S.getProperty=function(p){return T[p]};S.setProperty=function(p,ac){T[p]=ac};S.setJSONData=function(ac){try{m=$.parseJSON(ac);r=$(I+" #sizingChart");$(I+" #sizingChart").remove();r.removeClass("hide");$(I).html("")}catch(p){$(I).html("").hide()}};S.getJSONData=function(){return m};function u(){var ac,p,ad;$.each(z,function(ae,af){$(I+" #"+af+" li").hover(function(ah){var ag=$(this);if(C==true){Q(ag)}p="#"+af+F;ad=ag.find("div").attr("title");$(p).html(ad);if(ag.find(".disable").length>0&&ag.parents(".dropdown").length==0){ag.addClass(W);ag.attr("title",T.defaultErrorMsg);toolTip.show(this,ah,null,"topCenter")}},function(ai){var ah=$(this);if(ah.find(".disable").length>0&&!ah.hasClass(Y)){ah.removeClass(W)}toolTip.close(this,ai);var ag=(N)?N:K.sku_image;if(C==true){$("#mainSkuProductImage").attr("src",J(ag,"scene7LargePreset"))}ac=$(p).data(g);if(typeof ac=="undefined"){ac="&nbsp;"}$(I+" "+p).html(ac)});$(I+" #"+af+" li").click(function(){var ah="#"+af+F,ag=$(this);X();c();if(C==true){Q(ag,true)}$("#"+af+" li").removeClass(Y);$(this).addClass(Y);$(I+" "+ah).data(g,$(this).find(".action_txt, .action_img").attr("title"));i(true)})});$(".dropdown").on("click",function(){$(I+" .dropdown").zIndex(5);$(this).zIndex(10);$(this).find(".options_wrapper").toggle().zIndex(999).find(".selectTrigger").toggleClass("active")});$(".dropdown .options_wrapper").on("mouseleave",function(){$(this).hide().find(".selectTrigger").removeClass("active")});$(".dropdown .options_wrapper li").on("click",function(){var ae=$(this).parents(".dropdown").find(".selectTrigger");if($(this).hasClass(W)){ae.addClass(W)}else{ae.removeClass(W)}ae.html($(this).children().html())})}function P(){var ao,af,ar,ag,p="",ad,al=false,am,ap,ai=false,an=[],ac,aj=[],ae=[],ah,at,ak,aq;if(m.attributes.length){K=x();$("#priceVaryMsg").show();ah=m.attributes.length;$.each(m.attributes,function(ax,aw){aq=aw.attribute_name+T.swatchIdSuffix;d.push(aw.attribute_name);if(aw.swatch!=undefined&&(aw.swatch==true||aw.swatch=="true")&&C==false){C=true;l=aq}ap=aw.attribute_name.replace(/_/g," ");if(typeof aw.attribute_label!="undefined"){ap=aw.attribute_label}labelHTML='<p class="attribute_lbl fleft">'+ap+': <span class="bold" id="'+aq+'Label">&nbsp;</span></p>';$(I).append(labelHTML);ak=$("<ul></ul>").attr("id",aq).addClass("fleft clear");ak.attr("data-swatch_cat",aw.attribute_name);if(aw.display_type.toLowerCase()=="dropdown"||aw.display_type.toLowerCase()=="drop down"||aw.display_type.toLowerCase()=="dropdown_image"){ak.addClass("options_wrapper")}z.push(aq);$.each(aw.choices,function(ay,aA){al=false;at="";if(aA.value){at=aA.value}at=B(at);switch(aw.display_type.toLowerCase()){case"dropdown_image":case"dropdown":case"drop down":al=true;break}selected="";try{if(K.attribute_details[aw.attribute_name].value==aA.value){if(!(selectSecondaryAttribute==""&&ax>0)){E=true;selected=Y;$("#"+aq+"Label").data(g,at).html(at)}if(ax==0){aj[aw.attribute_name]=aA.value}}}catch(az){console.log("rollback: "+az.message);b()}if(ax>=0){if(ax==0){an[aw.attribute_name]=aA.value;if(ah>1){an[m.attributes[ax+1].attribute_name]=K.attribute_details[m.attributes[ax+1].attribute_name].value}ae=an}else{aj[aw.attribute_name]=aA.value;ae=aj}if(ax==1&&ah>2){am=K.attribute_details[m.attributes[ax+1].attribute_name].value;aj[m.attributes[ax+1].attribute_name]=am;ae=aj}ai=H(ae);rowNum=1;if(T.reciprocalXOuts==true){rowNum=0}if(((K.attribute_details[aw.attribute_name].value==aA.value&&currentSkuAvailability=="false")||ai==false)&&ax>=rowNum){if(!(selected&&currentSkuAvailability=="true")){p='<div class="disable"></div>'}}ai=false}leftClass="";if(aw.display_type.toLowerCase()!="dropdown"&&aw.display_type.toLowerCase()!="drop down"&&aw.display_type.toLowerCase()!="dropdown_image"){leftClass="fleft"}ar="";ag='<span class="'+ab+' hide">'+M+"</span>";if(al==true&&p!=""){ar="disable_dropdown";ag='<span class="'+ab+'">'+M+"</span>"}switch(aw.display_type.toLowerCase()){case"picture swatch":ad='<div class="action_img" title="'+at+'" style="background:url('+Z(aA.display)+') no-repeat"></div>';break;case"dropdown_image":ad='<div><div class="action_img" title="'+at+'" style="background:url('+Z(aA.display)+') no-repeat"> <span>'+at+"</span></div></div>";break;case"dropdown":case"drop down":ad='<div class="action_txt" title="'+at+'"><div class="drop_container"><span>'+aA.display+"</span>"+ag+"</div></div>";break;case"text-swatch":case"text swatch":case"text":default:ad='<div class="action_txt" title="'+at+'">'+aA.display+"</div>";break}li='<li class="swatch '+ar+" "+leftClass+" "+selected+'" data-attribute_val="'+aA.value+'">'+ad+p+"</li>";p="";ak.append(li)});switch(aw.display_type.toLowerCase()){case"dropdown":case"drop down":case"dropdown_image":ac=$(ak).find("."+Y).html();var av=Y;if(ac==undefined){ac="<span>"+ap+"</span>";av=""}ao='<div class="selectTrigger '+av+'">'+ac+"</div>";ak.hide();af=$("<div></div>").addClass("dropdown").append(ao).append(ak);$(I).append(af);var au=$(I+" #"+aq).innerWidth();if($(I+" #"+aq).parent(".dropdown").innerWidth()<260){$(I+" #"+aq).prev(".selectTrigger").css("width",au)}break;default:$(I).append(ak);break}});if(currentSkuAvailability=="false"&&!(selectSecondaryAttribute=="")){A()}$(I).append(r)}i()}function J(ac,ad){var p=false;if(T.scene7URL&&ac){p=T.scene7URL+ac+"?"+T[ad]}return p}function B(p){return p.charAt(0).toUpperCase()+p.slice(1)}function aa(p){var af=false,ae=false,ag=[];var ac=0,ad=[];$.each(m.skus,function(ah,ai){ad=[];if(typeof ai.availability_flag!="undefined"&&ai.availability_flag==true){ae=true}$.each(ai.attribute_details,function(aj,ak){if(ae==true&&(p==ak.value||af==true)){ad.push(ak.value);af=true}});if(ad.length){ag[ac]=ad;ac++}ae=false;af=false});return ag}function L(p){return $("<div/>").html(p).text()}function q(){$.each(z,function(p,ac){$(I+" #"+ac+" li").each(function(ae){var af=$(this);if(af.parents(".dropdown")&&p>0){af.addClass("disable_dropdown");af.find("."+ab).removeClass("hide");var ad=af.parents(".dropdown").find(".selectTrigger");if(af.hasClass(Y)){ad.html(af.children().html())}}if(af.has(".disable").length==0&&p>0){af.append('<div class="disable"></div>')}})})}function h(ad,ae){ae=L(ae);var ac=$(I+" #"+ad+T.swatchIdSuffix).find("[data-attribute_val='"+ae+"']");if(ac.has(".disable").length==0){ac.append('<div class="disable"></div>')}if(ac.parents(".dropdown")){ac.addClass("disable_dropdown").find("."+ab).removeClass("hide");ac.find("."+ab).addClass("show");var p=ac.parents(".dropdown").find(".selectTrigger");if(ac.hasClass(Y)){p.html(ac.children().html())}}}function V(){$("#skuPageActions .b1").fadeTo(0,0.2);$("#addToCartButtonId").attr("disabled","disabled")}function o(p){$.each(z,function(ac,ad){$(I+" #"+ad+" li").each(function(ae){if($(this).has(".disable").length==0&&ac==p){$(this).append('<div class="disable"></div>')}})})}function G(ae,p){for(var ad=0;ad<ae.length;ad++){for(var ac=1;ac<ae[ad].length;ac++){if(ae[ad][ac]==p[ac]){if(ae[ad][ac+1]){if(ae[ad][ac+1]==p[ac+1]){k(d[ac],ae[ad][ac])}k(d[ac+1],ae[ad][ac+1])}}else{if(ae[ad][ac+1]&&p[ac+1]&&ae[ad][ac+1]==p[ac+1]){k(d[ac],ae[ad][ac])}}}}}function f(){$("#addToCartButtonId").off("click");$("#skuPageActions .b1").fadeTo(0,1);$("#addToCartButtonId").removeAttr("disabled")}function y(p){q();var ac=false;$.each(m.skus,function(ad,ae){$.each(ae.attribute_details,function(af,ag){if(ac==true){k(af,ag.value);ac=false}if(ae.sku_id==currentSku&&currentSkuAvailability=="false"){ac=false}else{if(ag.value==p&&typeof ae.availability_flag!="undefined"&&ae.availability_flag==true){ac=true;k(af,ag.value)}}});ac=false})}function k(ad,ae){ae=L(ae);var ac=$(I+" #"+ad+T.swatchIdSuffix).find("[data-attribute_val='"+ae+"']");ac.find(".disable").remove();if(ac.parents(".dropdown")){ac.removeClass("disable_dropdown").find("."+ab).addClass("hide").removeClass("show");var p=ac.parents(".dropdown").find(".selectTrigger");if(ac.hasClass(Y)){p.html(ac.children().html())}}}function j(ac,p){q();var ad=aa(ac);G(ad,p)}function i(ah){var ac,af=[],ag,ae;var ah=(ah==null)?false:ah;var ad=m.attributes.length,p=v();$(I+" li."+Y).each(function(ai){ag=$(this).parent().data("swatch_cat");ae=$(this).data("attribute_val");af[ag]=ae;if(ai==0){if(ad>2){j(ae,p)}else{y(ae)}}else{if(ae){selectSecondaryAttribute=true}if(T.reciprocalXOuts==true){w(ae)}}if(ah){E=true;if(ai==z.length-1){sku_id=H(af);if(sku_id){if(sku_id!=currentSku){$("#skuActions").append('<div class="'+T.loaderClass+'"></div>');var aj={position:"absolute",top:"50%",left:"50%",marginLeft:"-27px",marginTop:"-27.5px",zIndex:"999",width:"54px",height:"55px"};$("#skuActions ."+T.loaderClass).css(aj);$(I).fadeTo(0,0.6);setTimeout(function(){window.location.href=common_utils.appendSessionId(e+sku_id)},20)}else{if(currentSkuAvailability=="false"){A()}}E=false}else{A()}return false}}})}function O(ad,ac){for(var p=0;p<m.skus.length;p++){if(L(m.skus[p].attribute_details[ad].value)==ac){return m.skus[p].sku_image}}return false}function H(ad){var ac=0,p=false;$.each(m.skus,function(ae,af){$.each(af.attribute_details,function(ag,ah){if(L(ad[ag])==L(ah.value)){ac++}if(ac==m.attributes.length&&typeof af.availability_flag!="undefined"&&af.availability_flag==true){p=af.sku_id;return false}});if(p){return false}ac=0});return p}function x(){var p=false;$.each(m.skus,function(ac,ad){if(ad.sku_id==currentSku){p=ad;return false}});return p}function v(){var p=[];$(I+" li."+Y).each(function(ac){p.push($(this).data("attribute_val"))});return p}function c(){if(a()){f()}$("#skuPageActions .b1").fadeTo(0,1);$(I+" .colorSizeError").hide();$(I+" ."+Y).removeClass(W);$(I+" .selectTrigger").removeClass(W)}function X(){$(I+" .attribute_lbl").removeClass("label_error");$(I+" ul").removeClass("label_error")}function R(p){$(I+" #"+z[p]+F).parent().removeClass("label_error");$(I+" #"+z[p]).removeClass("label_error")}function a(){if(t==undefined){t=$("#container").hasClass("bsd")}return t}function s(){var p,ae=[],ad=$(I+" ul:first").data("swatch_cat");for(var ac=0;ac<m.skus.length-1;ac++){if(ad){if(ae.indexOf(m.skus[ac].attribute_details[ad].value)==-1){p=new Image();p.src=J(m.skus[ac].sku_image,"scene7LargePreset");ae.push(m.skus[ac].attribute_details[ad].value)}}}}function U(){var ac=$(I+" ul ."+Y),p='input[name^="cmd_addCart.button"], input[name="cmd_addToCart.button"], input[name^="cmd_addSKU.button"], input[name^="cmd_pickList.button"], doNotLoadLB';if(!a()){$(addToList.skuPageElementName).on("click",function(){var ad=n()});$(document).off("click",p);if(!$("#addTechSku").length&&$("#enableAsyncAddToCart").length&&!common_utils.isIE6()&&!common_utils.checkDisableATCCookie()&&!common_utils.isFixedPriceCoupon()){$(document).on("click",p,function(ae){var ad=n();if(ad==true){return common_addtocart.doAddToCartAction($(this))}else{return false}})}}else{if(selectSecondaryAttribute==""||selectSecondaryAttribute=="false"){$("#addToCartButtonId").on("click",function(){errStr="Please set options before adding to cart";D(1);A(errStr)})}}}function n(){X();var ad=$(I+" ul ."+Y);if(ad.length==z.length){var p=false;$.each(ad,function(ae,af){if($(this).has(".disable").length){E=true;p=true;return false}});if(p==false){E=false}}if(E==true){var ac=null;if(selectSecondaryAttribute==""||selectSecondaryAttribute=="false"){ac="Please set options before adding to cart";D(1)}A(ac);return false}else{return true}}function w(p){o(0);var ac=false;$.each(m.skus,function(ae,af){for(var ad=m.attributes.length-1;ad>=0;ad--){var ag=m.attributes[ad].attribute_name;if(ac==true){k(ag,af.attribute_details[ag].value);ac=false}if(af.attribute_details[ag].value==p&&typeof af.availability_flag!="undefined"&&af.availability_flag==true){if(ac==false){ac=true}}}ac=false})}function b(){$("#priceVaryMsg").hide();$(I).html("")}function A(ad){if(a()){V()}$("#skuPageActions .b1").fadeTo(0,0.2);var ad=(ad==null)?T.defaultErrorMsg:ad;var ac=$(I+" ."+Y);ac.addClass(W);if(ac.parents(".dropdown")){var p=ac.parents(".dropdown").find(".selectTrigger");p.addClass(W)}if($(I).find(".colorSizeError").length){$(I+" .colorSizeError").html(ad).show()}else{$(I).append('<p class="colorSizeError fleft clear label_error">'+ad+"</p>")}}function D(p){$(I+" #"+z[p]+F).parent().addClass("label_error");$(I+" #"+z[p]).addClass("label_error")}function Q(ag,ad){var ac=(ad!=null)?ad:null;if(ag.parent().attr("id")==l){var ae=ag.data("attribute_val"),ah=ag.parent().data("swatch_cat"),af=O(ah,ae);if(af){var p=J(af,"scene7LargePreset");$("#mainSkuProductImage").attr("src",p);if(ad==true){$("#mainSkuProductImage").addimagezoom({zoomrange:[4,4],magnifiersize:[500,500],magnifierpos:"right",cursorshade:true,largeimage:J(af,"scene7ZoomPreset")});N=af}}}return ag}function Z(p){if(a()||"https:"==document.location.protocol){p=p.replace("http:","https:")}else{p=p.replace("https:","http:")}return p}return S}(skuAttributes||{});