jQuery.log=function(message){};var Import=Import||{css:function(){for(var i=0,len=arguments.length;i<len;i++){var tag=document.createElement('link');tag.setAttribute('type','text/css');tag.setAttribute('rel','stylesheet');tag.setAttribute('href',arguments[i]);document.getElementsByTagName('head')[0].appendChild(tag);}},js:function(){for(var i=0,len=arguments.length;i<len;i++){var tag=document.createElement('script');tag.setAttribute('type','text/javascript');tag.setAttribute('src',arguments[i]);document.getElementsByTagName('head')[0].appendChild(tag);}}};function clearBox(boxID){document.getElementById(boxID).value="";}
function goto(url){location.href=url;}
function openWin(url,params){if(!params){params='location=1,status=1,scrollbars=1,status=1,toolbar=1,menubar=1,resizable=1';}else{}
window.open(url,"mywindow",params);return false;}
function hideAll(){$(".hover").each(function(){$(this).hide();});};function showWelcome(){$("#welcomeMessageText").slideDown(function(){$(this).oneTime(3000,function(){$(this).slideUp();});});}
function newPopup(url)
{popupWindow=window.open(url,'popUpWindow','height=300,width=300,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no')}
function random_string(){var time=String((new Date()).getTime()).replace(/\D/gi,'');return time;}
$(document).ready(function(){$("body").click(function(event){hideAll();});if(navigator.userAgent.toLowerCase().indexOf('chrome')>0){$('h1').css('margin-top','-10px');}else if(navigator.userAgent.toLowerCase().indexOf('firefox')>0){$('h1').css('margin-top','0px');}
$(".productHoverQuantity, #productHoverQuantityArea").click(function(event){event.stopImmediatePropagation();return false;});$('#flyouts > li > ul.hover, .productDetailsHover, .productDetailsHoverLast, .productDetailsHoverBottom, .productDetailsHoverBottomLast, .categoryDetailsHover, .categoryDetailsHoverLast').css('opacity',1);$('.whiteFlyout').each(function(){var sumWidth=0;$(this).children().each(function(){sumWidth+=150;})
$(this).width(sumWidth-120);});$("#flyouts > li").hover(function(){windowHeight=$(window).height();windowScroll=$(window).scrollTop();windowBottom=windowHeight+ windowScroll;navPosition=$(this).offset().top;$(this).children("ul.hover").show();thisHeight=$(this).children("ul.hover").outerHeight();thisTop=$(this).children("ul.hover").offset().top;thisBottom=thisHeight+ thisTop;if(thisBottom>windowBottom){bottomDifference=thisBottom- navPosition;newTop=thisTop- bottomDifference+ 110;}},function(){$(this).children("ul.hover").hide();});if($.browser.msie&&$.browser.version.substr(0,3)<"7"){$("#flyouts > li").hover(function(){$("select").hide();},function(){$("select").show();});}
$(".nav").hover(function(){$(this).removeClass('hoverOff');$(this).addClass('hoverOn');},function(){$(this).removeClass('hoverOn');$(this).addClass('hoverOff');});initBinding();$(".addToCart, .addToCart1").live('click',function(event){var target=jQuery(this).parents('.addToCartForm');cmCreateShopAction5Tag(target.find('.skuId').attr('value'),target.find('.productName').attr('value'),target.find('.quantity').attr('value'),target.find('.productPrice').attr('value'),target.find('.productCategory').attr('value'));cmDisplayShop5s();$.get(target.children('.successURL').attr('value'),{dcs_action:'additemtocart',url_catalog_ref_id:target.find('.skuId').attr('value'),url_product_id:target.find('.productId').attr('value'),url_quantity:target.find('.quantity').attr('value'),url_related:target.find('.related').attr('value'),rnd:random_string()},function(data){$.ajax({url:'/common/dynamicMiniCart.jsp?rnd='+ random_string(),success:function(html)
{$('#dynamicMiniCart').empty().append(html);initBinding();$('#cartFlyout').fadeIn("slow");$('#cartFlyout').oneTime(2500,function(){$(this).fadeOut();});}});});cartAdd();return false;});$(".addToCartLink").click(function(){var target=jQuery(this).parents('.addToCartForm');cmCreateShopAction5Tag(target.find('.skuId').attr('value'),target.find('.productName').attr('value'),target.find('.quantity').attr('value'),target.find('.productPrice').attr('value'),target.find('.productCategory').attr('value'));cmDisplayShop5s();addToCartAjax($(this).attr('href'));return false;});$(".categoryProduct, .categoryProductLast, .breedAlphaCategoryBox, .categoryMediumFeature, .categoryLargeFeature").hover(function(){hideAll();$(this).children("div").fadeIn(1000);if($.browser.msie&&$.browser.version.substr(0,3)<"7"){$("select").hide();}},function(){$(this).children("div").hide();if($.browser.msie&&$.browser.version.substr(0,3)<"7"){$("select").show();}});$("#viewAllProducts").click(function(){$("#allProducts").append("loading...");$("#allProducts").show();$("#allProducts").load("/catalog/frgProdAllProds.jsp?categoryId="+catId+"&productId="+prodId+"&catNavCount=1");return false;});$("#childCategories").change(function(){goto($(this).val());});$(".coverflowTab").click(function(){$(".coverflowTab").each(function(){$(this).removeClass("coverflowTabOn");$(this).addClass("coverflowTabOff");});$(this).addClass("coverflowTabOn");});$("#shippingName").change(function(){goto('/checkout/shipping.jsp?nickName='+$(this).attr('value')+'&init=true');});$("#shippingNameMobile").change(function(){goto('/mobile/checkout/shipping.jsp?nickName='+$(this).attr('value')+'&init=true');});$("#creditCard").change(function(){goto('/checkout/billing.jsp?cardNickName='+$(this).attr('value')+'&init=true');});$("#creditCardMobile").change(function(){goto('/mobile/checkout/billing.jsp?cardNickName='+$(this).attr('value')+'&init=true');});$(".giftMessage").keyup(function(event){textVal=$(this).val();textLen=textVal.length;if(textLen>250){$(this).val(textVal.substr(0,250));}});$("#useShipping").click(function(){if($(this).attr('checked')==true){$('#useShippingAsBilling').val('true');}else{$('#useShippingAsBilling').val('false');}
this.form.submit();});$("#welcomeMessageBox").hover(function(){showWelcome();});$("#countryNewAddress").change(function(){$("#addAddress").attr('action',"new_address.jsp?countryCode="+$(this).attr('value'));$("#addAddress").submit();});$("#countryEditAddress").change(function(){$("#editAddress").attr('action',"edit_address.jsp?countryCode="+$(this).attr('value'));$("#editAddress").submit();});$("#billingAddress").change(function(){$("#newBilling").attr('action',"billing.jsp?nickName=&countryCode="+$(this).attr('value'));$("#newBilling").submit();});$("#shippingAddress").change(function(){$("#newShippingAddress").attr('action',"shipping.jsp?nickName=&countryCode="+$(this).attr('value'));$("#newShippingAddress").submit();});$("#submitOrder").submit(function(e){$('<div id="mask"/>').css({position:"absolute",height:$("#orderSubmitButton").height(),width:$("#orderSubmitButton").width(),top:$("#orderSubmitButton").position().top,left:$("#orderSubmitButton").position().left}).insertAfter("#orderSubmitButton");});$("#newBilling").submit(function(e){$('<div id="mask"/>').css({position:"absolute",height:$("#enterNewCreditCardButton").height(),width:$("#enterNewCreditCardButton").width(),top:$("#enterNewCreditCardButton").position().top,left:$("#enterNewCreditCardButton").position().left}).insertAfter("#enterNewCreditCardButton");});});function initBinding(){$("#cartArea").hover(function(){$("#cartFlyout").show();if($.browser.msie&&$.browser.version.substr(0,3)<"7"){$("select").hide();}});$("#cartArea,#cartFlyout,#cartFlyoutDetails,#cartFlyoutButtons").click(function(){$("#cartFlyout").show();});$("#cartArea,#cartFlyout,#cartFlyoutDetails,#cartFlyoutButtons").mouseout(function(){$("#cartFlyout").oneTime(1000,function(){$(this).hide();if($.browser.msie&&$.browser.version.substr(0,3)<"7"){$("select").show();}});});$("#cartArea,#cartFlyout,#cartFlyoutDetails,#cartFlyoutButtons").mouseover(function(){$("#cartFlyout").stopTime();});}
function addToCartAjax(url){$.get(url,function(data){$.ajax({url:'/common/dynamicMiniCart.jsp?rnd='+ random_string(),success:function(html){$('#dynamicMiniCart').empty().append(html);initBinding();$('#cartFlyout').fadeIn("slow");$('#cartFlyout').oneTime(2500,function(){$(this).fadeOut("slow");});}});});}
function addToCartAjaxFlash(url,name,pageID,refId,quantity,price,category){cmCreateManualLinkClickTag(url,name,pageID);cmCreateShopAction5Tag(refId,name,quantity,price,category);cmDisplayShop5s();$.get(url,function(data){$.ajax({url:'/common/dynamicMiniCart.jsp?rnd='+ random_string(),success:function(html){$('#dynamicMiniCart').empty().append(html);initBinding();$('#cartFlyout').fadeIn("slow");$('#cartFlyout').oneTime(2500,function(){$(this).fadeOut("slow");});}});});}
$(window).bind('load',function()
{$('img').each(function()
{if(((typeof this.naturalWidth!="undefined"&&this.naturalWidth==0)||this.readyState=='uninitialized')&&$(this).attr("src").indexOf("calendars.g.delivery.net")<0)
{lastSlash=$(this).attr("src").lastIndexOf("/");prefix=$(this).attr("src").substr(0,lastSlash);if(prefix=="")
$(this).attr("src","/img/missingImage.png");else
$(this).attr("src",prefix+"/missingImage.png");}});})
$.urlParam=function(name){var results=new RegExp('[\\?&]'+ name+'=([^&#]*)').exec(window.location.href);return results==null?"":results[1];}
function getFlashMovie(movieName){var isIE=navigator.appName.indexOf("Microsoft")!=-1;return(isIE)?window[movieName]:document[movieName];}
function reloadXML(tabname,category){var xmlPath="";if(category=='home'){xmlPath="/xml/calendarGallery.jsp?tab=none&id="+tabname;}else{xmlPath="/xml/calendarGallery.jsp?tab="+tabname+"&id="+category;}
getFlashMovie("coverflowFlash").reloadXML(xmlPath);}