function showShipToStoreLayer(c,a){$("html").animate({scrollTop:0},800);var b=$("#storeLocatorLayer");b.fadeIn("fast");$.ajax({url:c,type:"GET",dataType:"HTML",success:function(d){$(".storeLocatorFrameBackground",b).removeClass("showLoader");if($.browser.msie&&$.browser.version.substring(0,1)=="6"){DD_belatedPNG.fix("#storeLocatorLayer");DD_belatedPNG.fix("#header #storeLocatorLayer")}$(".locatorFrame",b).html(d)}})}function initPageHeight(){var a=$(".leftnav").height();var b=$(".page-body").height()-50;var c=$(".rightnav").height();if(a>c&&a>b){$(".page-body").css("height",a+"px");$(".rightnav").css("height",a+"px")}else{if(c>a&&c>b){$(".page-body").css("height",c+"px");$(".leftnav").css("height",c+"px")}else{if(b>c&&b>a){$(".leftnav").css("height",b+"px");$(".rightnav").css("height",b+"px")}}}$(".fill-height").each(function(){var d=new RegExp("\\D","g");$(this).height($(this).parent().height()-($(this).offset().top-$(this).parent().offset().top)+$(this).parent().css("border-top-width").replace(d,"")*1+($(this).parent().css("padding-top").replace(d,"")*1+$(this).parent().css("padding-bottom").replace(d,"")*1)-($(this).css("padding-top").replace(d,"")*1+$(this).css("padding-bottom").replace(d,"")*1)-($(this).css("border-top-width").replace(d,"")*1+$(this).css("border-bottom-width").replace(d,"")*1))})}$(function(){$(".button").assignMouseEvents();initPageHeight()});function doSearchValidation(b){var a=b.keyword.value;if(a==""||a==searchInstructions){alert(searchErrorText);return false}return true}function submitSearchForm(a){if(doSearchValidation(a)){a.submit()}}function doSearchFocus(a){var b=a.value;a.value=""}function strTrim(a){while(a.substring(0,1)==" "){a=a.substring(1,a.length)}while(a.substring(a.length-1,a.length)==" "){a=a.substring(0,a.length-1)}return a}function doSearchBlur(a){var b=a.value;if(strTrim(b)==""){a.value=searchInstructions}}function doControlFocus(a,c){var b=a.value;if(b==c){a.value=""}}function doControlBlur(a,c){var b=a.value;if(strTrim(b)==""){a.value=c}}function openWindow(a,q,e,d){if(d){d=d.toLowerCase()}else{d=""}var n=(d=="all"?1:0);var h=(d=="all"?1:0);var g=(d=="all"?1:0);var b=(d=="all"?1:0);var m=(d=="all"?1:0);var l=(d=="all"?1:0);var k=(d=="all"?1:0);if(d!="all"){var c=d.split(",");for(i=0;i<c.length;i++){if(c[i]=="toolbar"){n=1}else{if(c[i]=="menubar"){h=1}else{if(c[i]=="location"){g=1}else{if(c[i]=="directories"){b=1}else{if(c[i]=="status"){m=1}else{if(c[i]=="scrollbars"){l=1}else{if(c[i]=="resizable"){k=1}}}}}}}}}d="toolbar="+n+",";d+="menubar="+h+",";d+="location="+g+",";d+="directories="+b+",";d+="status="+m+",";d+="scrollbars="+l+",";d+="resizable="+k;var f=(screen.width/2)-(q/2);var p=(screen.height/2)-(e/2);var j=window.open(a,"Popup_Window","top="+p+",left="+f+",width="+q+",height="+e+',"'+d+'"');j.moveTo(f,p);j.focus()}function trim(a){while(a.substring(0,1)==" "){a=a.substring(1,a.length)}while(a.substring(a.length-1,a.length)==" "){a=a.substring(0,a.length-1)}return a}function isUnitedStateZipCode(b){var a=new RegExp(/(^\d{5}$)|(^\d{5}(\-|\ )\d{4}$)/);if(!a.test(b)){return false}return true}function isCanadianZipCode(b){var a=new RegExp(/(^[a-zA-Z]\d{1}[a-zA-Z](\-|\ )\d{1}[a-zA-Z]\d{1}$)/);if(!a.test(b)){return false}return true}function isFPOorAPOZipCode(b){var a=new RegExp(/(^[a-zA-Z]{3}(\-|\ )?[a-zA-Z]{2}(\-|\ )?\d{5}$)/);if(!a.test(b)){return false}return true}function isZipCode(a){return isUnitedStateZipCode(a)||isFPOorAPOZipCode(a)||isCanadianZipCode(a)}function makeCurrent(a){if(!$(a).hasClass("forceStatic")){$(a).css("background-color","#ffffbb")}}function makeNormal(a){if(!$(a).hasClass("forceStatic")){$(a).css("background-color","white")}}$(function(){$("input[@type=text]").focus(function(){makeCurrent(this)});$("input[@type=text]").blur(function(){makeNormal(this)});$("input[@type=password]").focus(function(){makeCurrent(this)});$("input[@type=password]").blur(function(){makeNormal(this)});$("textarea").focus(function(){makeCurrent(this)});$("textarea").blur(function(){makeNormal(this)})});function callEmailSignup(){var a=$("#subscribeForm").attr("action");$("#emailSignUp").html("Saving...").load(a,{userEmail:$("#subscribeForm input[@name=userEmail]").val()})}function changeImg(a,c,b){var d=$(a).find("img").attr("src").replace(c,b);$(a).find("img").attr("src",d)}$(function(){$("#subscribeForm input[@name=userEmail]").keydown(function(a){if(a.keyCode==13){callEmailSignup();return false}});$("#subscribeForm input[@name=userEmailFooter]").keydown(function(a){if(a.keyCode==13){callCheetahPreferencesFromFooter();return false}});$(".email-signup-contianer .signup-button").click(function(){callEmailSignup()});$(".email-signup-contianer .signup-button-cheetah").click(function(){callCheetahPreferencesFromFooter()});if($.browser.msie&&$.browser.version<8){$(".cat-level2").each(function(a){var b=$(this).find("li").size();if(b==0){$(this).remove()}if(b<=10){$(this).css("width","220px")}if(b>10){$(this).css("width","400px")}})}});function replaceSubString(c,b,d){var a=new RegExp(b);return c.replace(a,d)}function replaceEllipsis(a){return a.replace("\u2026","...")}function getCaret(a){if(a.selectionStart){return a.selectionStart}else{if(document.selection){a.focus();var b=document.selection.createRange();if(b==null){return 0}var d=a.createTextRange(),c=d.duplicate();d.moveToBookmark(b.getBookmark());c.setEndPoint("EndToStart",d);return c.text.length}}return 0}function taLineCount(X,aa,S,z,R,r){if(!(z==undefined)){A=parseInt(z.keyCode);switch(z.keyCode){case 35:return;case 36:return;case 37:return;case 38:return;case 39:return;case 40:return}}var x=false;var y=false;if($.browser.msie){x=true;if(parseInt(jQuery.browser.version)<=11){y=true}}var I=null;var T="";var w=false;if(S!=undefined){T=document.getElementById(S);if(S!="messageText"){w=true}}else{T=document.getElementById("messageText")}var D=new Selection(T);var Y=parseInt(X);var Z=parseInt(aa);var E=(Z*Y)+Y-1;var F=parseInt(Y)-1;var G=parseInt(Z)+1;var N="";var M=0;var K=0;var O=T.value;O=O.replace(new RegExp("\u201c","g"),'"');O=O.replace(new RegExp("\u201d","g"),'"');O=O.replace(new RegExp("\u2018","g"),"'");O=O.replace(new RegExp("\u2019","g"),"'");var Q="Append";var u=false;if(r){O=O.replace(new RegExp("\n","g")," ");O=O.replace(new RegExp("\r","g")," ");O=O.replace(new RegExp("  ","g")," ");O=O.replace(new RegExp("  ","g")," ")}var a=D.getCaret();var c=D.getCaret().start;if(c<O.length){Q="Edit"}if(R!=undefined){Q=R}var v=false;if($("#defaultTextareaMessage").val()=="Enter your message here."){v=true}var p=0;var n=-1;if(x){O.replace(/(\r\n|\r|\n)/g,"\r\n");n=O.indexOf("\r\n");while(n!=-1){if(c>n){p++}n=O.indexOf("\r\n",n+1)}}else{O=replaceSubString(O,/(\r\n|\r|\n)/g,"\n")}var V=O;var U="";var W="";var l=0;var m=0;var A="";var b=false;c=c-p;for(var k=0;k<V.length;k++){var J=V.substring(k,k+1);var L=V.substring(k+1,k+2);if(u){if(J=="\n"){if(L==" "){J=" "}else{J=" "}}}if(J=="\n"){N+=J;K=0;M+=1}else{if(K==(G-1)){if(M==(Y-1)){break}if(Q=="Edit"){if(J==" "){if(L!="\n"){N+="\n";K=0;M+=1}else{K=0;M+=1}}else{if(L!="\n"){l=N.lastIndexOf(" ");if((l>0)||(l==0)){tmpWrd=N.substring(l+1,N.length);tmpWrd=tmpWrd+J;U=N.substring(0,l+1);U=U+"\n"+tmpWrd;N=U;K=tmpWrd.length;tmpWrd="";U="";l=0;u=true}else{N+="\n"+J;M+=1;K=0}}else{l=N.lastIndexOf(" ");var H="";if((l>0)||(l==0)){tmpWrd=N.substring(l+1,N.length);m=tmpWrd.lastIndexOf("\n");if((m>0)||(m==0)){H=tmpWrd.substring(0,m);tmpWrd=tmpWrd.substring(m+1,tmpWrd.length);tmpWrd=tmpWrd+"\n"+J;U=N.substring(0,l+1)+H;U=U+"\n"+tmpWrd;N=U;K=1;tmpWrd="";U="";l=0;m=0;if(!b){a.start+=1;a.end+=1;if(x){a.start+=1;a.end+=1}}u=true}else{tmpWrd=tmpWrd+J;U=N.substring(0,l+1);U=U+"\n"+tmpWrd;M+=1;N=U;K=tmpWrd.length;var q=false;if(N.length-1<=c){q=true}tmpWrd="";U="";l=0;if(x&&q&&!b){a.start+=1;a.end+=1;b=true}u=true}}else{N+="\n"+J;M+=1;K=0}}}}else{if(J==" "){N+="\n";K=0}else{if(L!="\n"){l=N.lastIndexOf(" ");if((l>0)||(l==0)){tmpWrd=N.substring(l+1,N.length);tmpWrd=tmpWrd+J;U=N.substring(0,l+1);U=U+"\n"+tmpWrd;N=U;K=tmpWrd.length;tmpWrd="";U="";l=0;a.start+=1;a.end+=1;if(x){a.start+=1;a.end+=1}}else{N+="\n"+J;K=0;a.start+=1;a.end+=1;if(x){a.start+=1;a.end+=1}}}else{N+=J;K=0}}M+=1}}else{N+=J;K++}}}if(A==32||A==0){N=replaceSubString(N,/(\r\n|\r|\n)/g,"\n")}else{N=replaceSubString(N,/\s+(\r\n|\r|\n)/g,"\n")}if(!(E>=N.length)){N=N.substring(0,E)}myArr=N.split("\n");if((myArr.length-1)>F){N="";for(var k=0;k<F+1;k++){if(k==F){N+=myArr[k]}else{N+=myArr[k]+"\r\n"}}}T.value=N;N=replaceSubString(N,/\n/g," ");var e="";if(S!=undefined){e=$("#"+S).val()}else{e=$("#messageText").val()}var f=e.split("\n");var B=new Array();for(var k=0;k<Y;k++){B[k]=Z}if(!v){for(var k=0;k<f.length;k++){f[k]=replaceSubString(f[k],/\r/g,"");if(f[k].length>Z){f[k]=f[k].substring(0,Z)}B[k]=(Z-f[k].length)}}var h;if(S!=undefined){if(S!="messageText"){var j=f.length;h=300-((j-1)*50);h=h-(f[j-1].length);if(h<=0){$("#"+S+"_char").html("0")}else{$("#"+S+"_char").html(h)}}}var d="";for(var k=0;k<Y;k++){d=d+'<p class="textcount" align="left">'+B[k]+" Characters left</p>"}$("#taCounterDiv").html(d);if(!v){if(x){var C=$(T).val().substring(0,a.start).split("\n").length-1;D.setCaret(a.start+C,a.end+C)}else{D.setCaret(a.start,a.end)}}else{$("#occasionCode_title").focus()}if(x){var P=document.body.createTextRange(),g=getCaret(T);P.moveToElementText($("#messageText")[0]);P.moveStart("character",$("#messageText")[0].value.length-1)}}Selection=function(a){this.isTA=(this.input=a).nodeName.toLowerCase()=="textarea"};with({o:Selection.prototype}){o.setCaret=function(d,a){var c=this.input;if(Selection.isStandard){try{c.setSelectionRange(d,a)}catch(b){}}else{if(Selection.isSupported){try{var e=this.input.createTextRange();a-=d+c.value.slice(d+1,a).split("\n").length-1;d-=c.value.slice(0,d).split("\n").length-1;e.move("character",d),e.moveEnd("character",a),e.select()}catch(b){}}}};o.getCaret=function(){var f=this.input,b=document;if(Selection.isStandard){try{return{start:f.selectionStart,end:f.selectionEnd}}catch(e){return{start:0,end:0}}}else{if(Selection.isSupported){try{var h=(this.input.focus(),b.selection.createRange()),g,j,c,k;if(h.parentElement()!=f){return{start:0,end:0}}if(this.isTA?(g=h.duplicate()).moveToElementText(f):g=f.createTextRange(),!this.isTA){return g.setEndPoint("EndToStart",h),{start:g.text.length,end:g.text.length+h.text.length}}for(var a="[###]";(k=f.value).indexOf(a)+1;a+=a){}g.setEndPoint("StartToEnd",h),g.text=a+g.text,c=f.value.indexOf(a);h.text=a,j=f.value.indexOf(a);if(b.execCommand&&b.queryCommandSupported("Undo")){for(g=3;--g;b.execCommand("Undo")){}}return f.value=k,this.setCaret(j,c),{start:j,end:c}}catch(e){return{start:0,end:0}}}}return{start:0,end:0}};o.getText=function(){var a=this.getCaret();return this.input.value.slice(a.start,a.end)};o.setText=function(d){var b=this.getCaret(),a=this.input,c=a.value;a.value=c.slice(0,b.start)+d+c.slice(b.end);this.setCaret(b.start+=d.length,b.start)};new function(){var a=document,b=a.createElement("input"),c=Selection;c.isStandard=(document.selection==null);c.isSupported=true}}(function(a){if(jQuery.browser.msie&&parseInt(jQuery.browser.version,10)==6){try{document.execCommand("BackgroundImageCache",false,true)}catch(b){}}});(function(a){a.fn.bgiframe=(a.browser.msie&&a.browser.version.substring(0,1)=="6"?function(d){d=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;"},d);var c='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+d.src+'"style="display:block;position:absolute;z-index:-1;'+(d.opacity!==false?"filter:Alpha(Opacity='0');":"")+"top:"+(d.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":b(d.top))+";left:"+(d.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":b(d.left))+";width:"+(d.width=="auto"?"expression(this.parentNode.offsetWidth+'px')":b(d.width))+";height:"+(d.height=="auto"?"expression(this.parentNode.offsetHeight+'px')":b(d.height))+';"/>';return this.each(function(){if(a(this).children("iframe.bgiframe").length===0){this.insertBefore(document.createElement(c),this.firstChild)}})}:function(){return this});a.fn.bgIframe=a.fn.bgiframe;function b(c){return c&&c.constructor===Number?c+"px":c}})(jQuery);$(function(){$(".cat-level2").bgiframe();$("#colorHelpLayer").bgiframe()});if($.browser.msie&&$.browser.version<8){$(document).ready(function(){$(".sort-option-container-right").each(function(){var b=$(this).find(".option-text").width();var a=$(this).find(".option").width();var c=b+a;$(this).css("width",c)})})}var showDynamicContent=(function(a){var b=function(d,c){a.ajax({type:"POST",url:c,data:"",dataType:"text",timeout:15000,success:function(e){d.append(e);d.show()},error:function(){return false}})};return b}(jQuery));function openSelectStorePopup(){loadGoogleAPI();$.openPopupLayer({name:"selectstoreziplayer",width:500,url:"/custserv/cust_store_locator.jsp",success:function(){var a=$("#popupLayer_selectstoreziplayer #popup_close_button");$(a).click(function(){closeOverlayDivs()})}});return false}function closeOverlayDivs(){$("#popupLayer_selectstoreziplayer").fadeOut(function(){$("#popupLayerScreenLocker").remove();$("#popupLayer_selectstoreziplayer").remove()})}function saveMyHomeStore(b){var a=new Date();url="/custserv/save_user_store.cmd?storeId="+b+"&datetime="+a;elementId="select-store-header";ajaxFunction(false,url);setTimeout(function(){getHomeStore(true)},1000);closeOverlayDivs();createStoreInfo()}function getHomeStore(a){url="/includes/home_store.jsp";elementId="#select-store-header";$.ajax({url:url,cache:false,success:function(b){$(elementId).html(b)}});if(a){createStoreInfo()}}function loadGoogleAPI(){if(typeof google==="object"&&typeof google.maps==="object"){}else{var a=document.createElement("script");a.type="text/javascript";a.id="googleLoad";a.src="//maps.googleapis.com/maps/api/js?sensor=false&v=3&callback=loadMyMap";document.getElementsByTagName("head")[0].appendChild(a)}}function loadMyMap(){var a=document.createElement("script");a.type="text/javascript";a.src="/js/mymap_google.js";document.getElementsByTagName("head")[0].appendChild(a)}function loadUserGoogleAPI(){if(typeof google==="object"&&typeof google.maps==="object"){}else{var a=document.createElement("script");a.type="text/javascript";a.src="//maps.googleapis.com/maps/api/js?sensor=false&v=3&callback=getuserCoords";a.id="googleUserLoad";document.getElementsByTagName("head")[0].appendChild(a)}}function getUserCoords(d){var e=d;var b="";var c="";var a=new google.maps.Geocoder();a.geocode({address:e},function(g,h){b=g[0].geometry.location.lat();c=g[0].geometry.location.lng();var f=document.createElement("iframe");f.src="/user/SaveUserLatLngCommand.cmd?lat="+b+"&lng="+c;f.id="locationIframe";document.body.appendChild(f)});return false}function getPickupStoreList(b){zipcode=b.storesListZipCode.value;var e="";var f="";var d="";var c=new google.maps.Geocoder();c.geocode({address:zipcode},function(h,j){e=h[0].geometry.location.lat();f=h[0].geometry.location.lng();url="/custserv/customer_zip.cmd?storesListLatitude="+e+"&storesListLongitude="+f+"&zipCode="+zipcode;elementId="storesListZipCode_results";wrapperId="popupLayer_selectstoreziplayer";wrapperElm=document.getElementById(wrapperId);wrapperHeight=599;wrapperHalfHeight=wrapperHeight/2;var g=document.body.offsetHeight;var a=g/2-wrapperHalfHeight;$("#"+wrapperId).animate({top:a+"px"},2000,function(){});ajaxFunction(elementId,url)});return false}function getPickupStoreListEnter(a,b){if(a.which==13||a.keyCode==13){getPickupStoreList(b);return false}}function ajaxFunction(c,d){var a;try{a=new XMLHttpRequest()}catch(b){try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(b){return false}}}a.onreadystatechange=function(){if(a.readyState==4){if(c!=false){var e=document.getElementById(c);e.innerHTML=a.responseText}}};a.open("GET",d,true);a.send(null)}$(document).ready(function(){var a=$("a.cat-level1");var b=$("li.category-label-container > a");$(a).click(function(){s.c_w("topnav","1",0)});$(b).click(function(){s.c_w("topnav","1",0)})});jq14(document).ready(function(){jq14(".scroller-layout .area").swipe({excludedElements:"button, input, select, textarea, .noSwipe",tap:function(a,b){if(jq14(".scrollnext, .scrollprevious").length==0&&jq14(b).html().indexOf("hourglass")!==-1){window.location=jq14(b).find("a").attr("href")}},swipeLeft:function(){jq14(this).siblings(".scroll-next").find(".scroll-button").trigger("click")},swipeRight:function(){jq14(this).siblings(".scroll-previous").find(".scroll-button").trigger("click")},threshold:10})});jq14(document).ready(function(){jq14(".sort-option-container-right .option-text").each(function(){var a=jq14(this).text().replace(":","").trim();if(a.indexOf("Available Online")>=0){console.log("online or in store")}else{jq14(this).siblings(".option").find("select > option:first-child").text(a)}})});