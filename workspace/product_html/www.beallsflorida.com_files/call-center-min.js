$.browser.mozilla&&window.addEventListener("message",receiver,!1);
function setupButtons(){$("#addToCartBtn").removeAttr("onclick").click(function(a){a.preventDefault();var a=document.getElementById("partNum"),b=$("#partNum").val(),c=$("#quantity").val(),f=$("#OrderItemAddFormProductId").val(),g=[],d=[],h="false";definingAttributePage&&(h="true");$('input[name= "attrName"]').each(function(){g.push(this.value)});$('[name= "attrValue"]').each(function(){d.push(this.value)});a.value&&(b=a.value);void 0==c&&(c=1);showProcessingModal();callAddToCart(b,c,"","",h,g,d,f);
return!1});$("#addToCartBtnGC").unbind("click").click(function(a){a.preventDefault();var a=$("#partNum").val(),b=$("#quantity").val();void 0==b&&(b=1);showProcessingModal();callAddToCart(a,b,"","",definingAttr,attrNames,attrValues,productId);return!1});$(".addToCartBtn").unbind("click").click(function(a){a.preventDefault();var a=$("#partNum").val(),b=$("#quantity").val(),c=$(this).attr("id").split("_")[1];void 0==b&&(b=1);showProcessingModal();callAddToCart(a,b,"",c,"","","","");return!1});$(".updateCartBtn").unbind("click").click(function(a){a.preventDefault();
var a=$("#orderItemId").val(),b=$("#orderId").val(),c=$("#quantity").val();void 0==c&&(c=1);var f=$(this).attr("id").split("_")[1];showProcessingModal();callUpdateToCart(a,c,f,"",b);return!1});$(".updateCartForShipBtn").unbind("click").click(function(a){a.preventDefault();var a=$("#orderItemId").val(),b=$("#quantity").val();void 0==b&&(b=1);showProcessingModal();callUpdateToCart(a,b,"","true");return!1})}
getCookie("CALL_CENTER_USER")&&$(document).ready(function(){$("#addToCartBtn").show();$("#addToCartBtnGC").show();$(".addToCartBtn").show();$(".updateCartBtn").show();$(".updateCartForShipBtn").show();setupButtons();$(".product-item-image").removeAttr("onmouseover");$(".product-item-image").removeAttr("onmouseout");$('[id^="quickOrderModalLink"]').css({visibility:"hidden"})});
function showProcessingModal(){$.modal("<img src='//images.beallsflorida.com/is/image/Bealls/loading?$content-gif$' />",{close:!1,opacity:50,containerCss:{top:"50px",left:"470px"},overlayCss:{backgroundColor:"#000"}})}
function receiver(a){if("SET_CC_COOKIE"==a.data)setCookieForCSR();else if("ADD_TO_CART_FINISHED"==a.data)$.modal.close();else if(-1!=a.data.indexOf("CUSTOMER_ID")){var b=a.data.split("="),c=window.location.href;-1!=a.data.indexOf("URL")&&(c=a.data.indexOf("URL"),c=a.data.substr(c+1));setCookieForCustomer(b[1],c)}}function setCookieForCSR(){document.cookie="CALL_CENTER_USER=1; path=/"}function resetPagetoURL(a){window.location=a}
function setCookieForCustomer(a,b){getCookie("CALL_CENTER_CUSTOMER_ID")!=a&&(document.cookie="CALL_CENTER_CUSTOMER_ID="+a,window.location==b&&(-1!=b.indexOf("orderItemId")?(b=window.location.protocol+"//"+window.location.host+"/webapp/wcs/stores/servlet/topCategories___",resetPagetoURL(b)):window.location.reload(!0)))}
function callAddToCart(a,b,c,f,g,d,h,i){var e={};e.partNumber=a;e.quantity=b;e.extraParam=c;e.locationCode=f;e.definingAttr=g;e.attrNames=d;e.attrValues=h;e.productId=i;e.callType="add";a=JSON.stringify(e);b=parent.postMessage?parent:parent.document.postMessage?parent.document:void 0;"undefined"!=typeof b?b.postMessage(a,"*"):alert("Unable to post message to backend")}
function callUpdateToCart(a,b,c,f,g){var d={};d.orderItemId=a;d.quantity=b;d.locationCode=c;d.callType="update";d.extraParam=f;d.orderId=g;a=JSON.stringify(d);b=parent.postMessage?parent:parent.document.postMessage?parent.document:void 0;"undefined"!=typeof b?b.postMessage(a,"*"):alert("Unable to post message to backend")};
