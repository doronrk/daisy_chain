function getParameterByName(n,t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var r=new RegExp("[\\?&]"+t+"=([^&#]*)"),i=r.exec(n);return i==null?"":decodeURIComponent(i[1].replace(/\+/g," "))}function isAndroid2(){var n=navigator.userAgent.toLowerCase();return n.indexOf("android 2")!=-1?!0:!1}function isIE8(){var n=navigator.userAgent.toLowerCase(),t=n.indexOf("msie")!=-1?parseInt(n.split("msie")[1]):!1;return t==8?!0:!1}function isAndroid2(){var n=navigator.userAgent.toLowerCase();return n.indexOf("android 2")!=-1?!0:!1}function setBackgroundImage(){var n=navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?!0:!1;if(n)$("div#shadow").css("background-image","none"),$("body").css("background-color","White"),$("body").css("background-image","none");else{width=$(window).width();switch(!0){case width<=768:w="0768";break;case width>768&&width<=1920:w="1920";break;case width>1920&&width<=2880:w="2880";break;default:w="3840"}height=$(window).height();switch(!0){case height<=768:h="0768";break;case height>768&&height<=1080:h="1080";break;case height>1080&&height<=1536:h="1536";break;default:h="2160"}i="/img/background/3/"+w+"x"+h+".jpg",$("body").css("background-image","url("+i+")")}}function windowResize(){previousWindowWidthPixel!=$(window).width()&&(previousWindowWidthPixel=$(window).width(),windowWidth())}function windowWidth(){emWidthPixel=parseFloat($("body").css("font-size")),$(window).width()==414&&window.devicePixelRatio==3&&(emWidthPixel=11.8285714285714),$(window).width()==736&&window.devicePixelRatio==3&&(emWidthPixel=15.3333333333333),pageWidthPixel=$("div#page").width(),pageWidthEm=pageWidthPixel/emWidthPixel;switch(!0){case pageWidthEm<35:$("#searchheaderbutton").css("visibility","visible"),$("#searcharea").hide(),$(".navmenu").hide(),$("aside#blurbsleft").hide(),$("div#mainareabottom").css("min-height","auto");break;case pageWidthEm>=35&&pageWidthEm<48:$("#searchheaderbutton").css("visibility","visible"),$("#searcharea").hide(),$(".navmenu").hide(),$("aside#blurbsleft").hide(),$("div#mainareabottom").css("min-height","auto");break;case pageWidthEm>=48&&pageWidthEm<62:$("#searcharea").show(),$(".navmenu, .navlist").show(),$(".defaulthide").hide();break;case pageWidthEm>=62&&pageWidthEm<84:$("#searcharea").show(),$(".navmenu, .navlist").show(),$(".defaulthide").hide();break;case pageWidthEm>=84:$("#searcharea").show(),$(".navmenu, .navlist").show(),$(".defaulthide").hide()}$(".infoballoon").css("max-height",$(window).height()-emWidthPixel+"px"),$(".infoballoon").hide(),fitMenuAndAds(),setBackgroundImage()}function fitMenuAndAds(){var i,t,n,u,r;emWidthPixel=parseFloat($("body").css("font-size")),windowWidthPixel=$(window).width(),windowWidthEm=windowWidthPixel/emWidthPixel,showLeftBlurbs=windowWidthEm>=48,$("div#mainareabottom").css("min-height","2em"),i=$("nav").outerHeight()-$("div#mainareatop").height(),$("div#mainareabottom").css("min-height",i+"px"),windowHeightPixel=$(window).height(),t=windowHeightPixel-$("header").height()-$("div#mainareatop").height()-$("footer").height(),t>i&&$("div#mainareabottom").css("min-height",t+"px"),n=$("div#page").height()-$("header#siteheader").outerHeight()-$("footer#sitefooter").outerHeight()-$("nav").outerHeight()-2*emWidthPixel,n>$("aside#blurbsleft").width()?($("aside#blurbsleft").height(n),u=$("nav").offset().top+$("nav").outerHeight(),$("aside#blurbsleft").css({top:u,left:"1em"}),showLeftBlurbs&&$("aside#blurbsleft").show()):$("aside#blurbsleft").hide(),r=$("div#page").height()-$("header#siteheader").outerHeight()-$("footer#sitefooter").outerHeight()-2*emWidthPixel,$("aside#blurbsright").height(r),blurbsEngine.fit()}function addRightBlurb(n,t){var i=[{name:"u",value:window.location.pathname+window.location.search},{name:"w",value:"wide"}];$.each(n,function(n,t){i.push({name:"b",value:t})}),$.get("/blurb",i,function(i){if($.trim(i)=="")fittingBlurbs=!1;else{var r=$($.parseHTML(i)).filter("div.blurb").attr("id");$("aside#blurbsright").append(i);$("#"+r).onAvailable(function(){$("#"+r).css({opacity:0,visibility:"visible"}).animate({opacity:1});var i=$("aside#blurbsright div:last").attr("id").replace("blurb-","");n.push(i),fitBlurbs(n,t)})}})}function addLeftBlurb(n,t){var i=[{name:"u",value:window.location.pathname+window.location.search},{name:"w",value:"narrow"}];$.each(n,function(n,t){i.push({name:"b",value:t})}),$.get("/blurb",i,function(i){var r=$($.parseHTML(i)).filter("div.blurb").attr("id");$("aside#blurbsleft").append(i);$("#"+r).onAvailable(function(){$("#"+r).css({opacity:0,visibility:"visible"}).animate({opacity:1});var i=$("aside#blurbsleft div:last").attr("id").replace("blurb-","");n.push(i),fitBlurbs(n,t)})})}function fitBlurbs(n,t){var s=[],c,o,i,e,u,f,h,r;if($("aside#blurbsright div.blurb").each(function(){s.push($(this).attr("id").replace("blurb-",""))}),$("aside#blurbsleft div.blurb").each(function(){s.push($(this).attr("id").replace("blurb-",""))}),$(n).not(s).length==0&&$(s).not(n).length==0){if(emPixel=parseFloat($("body").css("font-size")),c=12*emPixel,o=!1,$("aside#blurbsright").is(":visible"))if(i=0,$("aside#blurbsright div.blurb").each(function(){i+=$(this).outerHeight(!0)}),e=$("aside#blurbsright").height()-i,e<=0){while(e<=0)h=$("aside#blurbsright div:last").attr("id").replace("blurb-",""),r=$.inArray(h,n),r>-1&&n.splice(r,1),$("aside#blurbsright div:last").remove(),i=0,$("aside#blurbsright div.blurb").each(function(){i+=$(this).outerHeight(!0)}),e=$("aside#blurbsright").height()-i;o=!0}else e>=c?addRightBlurb(n,t):o=!0;else o=!0;if(o)if($("aside#blurbsleft").is(":visible"))if(u=0,$("aside#blurbsleft div.blurb").each(function(){u+=$(this).outerHeight(!0)}),f=$("aside#blurbsleft").height()-u,f<=0){while(f<=0)h=$("aside#blurbsleft div:last").attr("id").replace("blurb-",""),r=$.inArray(h,n),r>-1&&n.splice(r,1),$("aside#blurbsleft div:last").remove(),u=0,$("aside#blurbsleft div.blurb").each(function(){u+=$(this).outerHeight(!0)}),f=$("aside#blurbsleft").height()-u;fittingBlurbs=!1}else f>=c?addLeftBlurb(n,t):fittingBlurbs=!1;else fittingBlurbs=!1}else fittingBlurbs=!1;$(".blurb").unbind("click"),$(".blurb").click(function(n){var t=$(this).find("a").attr("href");window.location.href=t,n.preventDefault()})}function getParameterByName(n,t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var r=new RegExp("[\\?&]"+t+"=([^&#]*)"),i=r.exec(n);return i==null?"":decodeURIComponent(i[1].replace(/\+/g," "))}function validateEmail(){return e=$.trim($("input#email").val()),e.indexOf("@")!=-1&&e.indexOf("@")!=0&&e.indexOf("@")!=e.length-1&&e.indexOf(".")!=-1&&e.indexOf(".")!=0&&e.indexOf(".")!=e.length-1?!0:!1}function largeImageHeight(){emPixel=parseFloat($("body").css("font-size")),windowHeightPixel=$(window).height(),windowHeightEm=windowHeightPixel/emPixel,modalWidthPixel=$("div#largeimagebox div.modalboxverticaloffset div.modalbox").width(),modalWidthEm=modalWidthPixel/emPixel,imageHeightPixel=$("div.modalbox img#largeimage").naturalHeight(),imageHeightEm=imageHeightPixel/emPixel,imageWidthPixel=$("div.modalbox img#largeimage").naturalWidth(),imageWidthEm=imageWidthPixel/emPixel,$("div.modalbox img#largeimage").css("max-width","none"),$("div.modalbox img#largeimage").css("max-height","none"),maxHeightEm=Math.min(imageHeightEm,windowHeightEm-12),maxWidthEm=modalWidthEm-2,imageWidthEm*(maxHeightEm/imageHeightEm)>maxWidthEm?($("div.modalbox img#largeimage").css("width",maxWidthEm+"em"),$("div.modalbox img#largeimage").css("height","auto")):($("div.modalbox img#largeimage").css("width","auto"),$("div.modalbox img#largeimage").css("height",maxHeightEm+"em")),imageHeightEm>windowHeightEm-12||imageWidthEm>modalWidthEm-2?($("div#largeimageboxtoolbar").show(),$("div#largeimagebox div.modalboxverticaloffset div.modalbox").css("height",Math.min(imageHeightEm+6,windowHeightEm-6)+"em"),$("div#largeimagebox div.modalboxverticaloffset div.modalbox div#largeimageboxscroller").css("height",Math.min(imageHeightEm+.5,windowHeightEm-11.5)+"em"),$("div.modalbox img#largeimage").css("cursor","nwse-resize"),$("div.modalbox img#largeimage").attr("title","zoom to full size")):($("div#largeimageboxtoolbar").hide(),$("div#largeimagebox div.modalboxverticaloffset div.modalbox").css("height","auto"),$("div#largeimagebox div.modalboxverticaloffset div.modalbox div#largeimageboxscroller").css("height","auto"),$("div.modalbox img#largeimage").css("cursor","auto"),$("div.modalbox img#largeimage").attr("title",""))}var beforePrint,afterPrint,mediaQueryList,fittingBlurbs,blurbsEngine,waitForFinalEvent,previousWindowWidthPixel;$(document).ready(function(){function t(){var n=navigator.userAgent.toLowerCase(),t=n.indexOf("msie")!=-1?parseInt(n.split("msie")[1]):!1;return t==8?!0:!1}function n(){if(t()==!1){var n=!1;$("html, body").animate({scrollTop:0},"slow",function(){n||(n=!0,$("#searchheaderbutton").fadeTo("fast",0,function(){$("#searchheaderbutton").fadeTo("fast",1,function(){$("#searchheaderbutton").fadeTo("fast",0,function(){$("#searchheaderbutton").fadeTo("fast",1,function(){$("#searchheaderbutton").fadeTo("fast",0,function(){$("#searchheaderbutton").css("visibility","hidden"),$("#searchheaderbutton").css("opacity",1),$("#searcharea").show("blind",function(){$("#search").focus()})})})})})}))}),event.preventDefault()}else $("#searchheaderbutton").css("visibility","hidden"),$("#searcharea").show("blind",function(){$("#search").focus()})}$("form#formsearch").submit(function(n){$.trim($("#search").val())==""&&n.preventDefault()}),$("#searchheaderbutton").click(function(n){$(this).css("visibility","hidden"),$("#searcharea").show("blind",function(){$("#search").focus()}),n.preventDefault()}),$(".infobutton").click(function(n){var t=$(this).attr("href");$(t).is(":visible")||$(".infoballoon").hide();var i=parseFloat($("body").css("font-size")),c=$(this).outerHeight(),h=$(this).offset().top,l=$(this).offset().left;$(this).find("img").length>0&&(c=$(this).find("img").height(),h=$(this).find("img").offset().top,l=$(this).find("img").offset().left);var u=$("div#page").offset().left,v=$(t).width(),a=$(t).outerWidth(),e=(a-v)/2,o=$(document).width(),r=l-u;r+a+2*i>o-u&&(r=o-u-v-2*i-e);var f=h+c+i/2-e,s=$(t).outerHeight(),y=$(window).height();windowBottom=$(window).scrollTop()+$(window).innerHeight(),balloonBottom=f+s,balloonBottom>windowBottom&&(f=windowBottom-s-i/2),$(t).css({top:f,left:r}),$(t).toggle(),n.preventDefault(),n.stopPropagation()}),$(".infoballoon").click(function(){$(this).hide()}),$(".navtitlemicro").click(function(t){var i=$(this).find("a").attr("href");i=="#searchtip"?($("#searcharea").is(":visible")&&($("#searcharea").hide(0),$("#searchheaderbutton").css("visibility","visible")),n(),$(i).is(":visible")&&$(i).hide("blind")):$(i).is(":visible")?$(i).hide("blind"):($(".navmenu").hide(),$(i+" .navlist").length==1&&$(i+" .navlist").show(0),$(i).show("blind")),t.preventDefault()}),$("ul.navlist li").click(function(n){var t=$(this).find("a").attr("href");window.location.href=t,n.preventDefault()}),$(".navtitle").click(function(n){$("aside#blurbsleft").hide();var t=$(this).find("a").attr("href");$(t).toggle("blind",fitMenuAndAds),n.preventDefault()}),$(".navsubtitle").click(function(n){$("aside#blurbsleft").hide();var t=$(this).find("a.navsubtitlelink").attr("href");$(t).toggle("blind",fitMenuAndAds),n.preventDefault()}),$.get("/cartpreview",function(n){$("div#cart").html(n)}),isAndroid2()==!0&&$("body").css("text-rendering","auto")}),$(document).ready(function(){(navigator.appVersion.indexOf("Mac")!=-1||navigator.appVersion.indexOf("OS X")!=-1||navigator.appVersion.indexOf("iOS")!=-1||navigator.appVersion.indexOf("iPhone")!=-1||navigator.appVersion.indexOf("iPad")!=-1||navigator.appVersion.indexOf("iPod")!=-1)&&$("body").css("font-weight","300")}),beforePrint=function(){$("div#shadow").css("background-image","none"),$("body").css("background-color","White"),$("body").css("background-image","none"),$("div#mainareabottom").css("min-height","auto")},afterPrint=function(){var t,n;setBackgroundImage(),t=$("nav").outerHeight()-$("div#mainareatop").height(),$("div#mainareabottom").css("min-height",t+"px"),windowHeightPixel=$(window).height(),n=windowHeightPixel-$("header").height()-$("div#mainareatop").height()-$("footer").height(),n>t&&$("div#mainareabottom").css("min-height",n+"px")},isIE8()==!1&&isAndroid2()==!1&&window.matchMedia&&(mediaQueryList=window.matchMedia("print"),mediaQueryList.addListener(function(n){n.matches?beforePrint():afterPrint()})),window.onbeforeprint=beforePrint,window.onafterprint=afterPrint,fittingBlurbs=!1,blurbsEngine={fit:function(){var t=1+Math.floor(Math.random()*1e3),n;fittingBlurbs||(fittingBlurbs=!0,n=[],$("aside#blurbsright div.blurb").each(function(){n.push($(this).attr("id").replace("blurb-",""))}),$("aside#blurbsleft div.blurb").each(function(){n.push($(this).attr("id").replace("blurb-",""))}),fitBlurbs(n,t))}},$.fn.onAvailable=function(n){var t=this;this.closest("body").length>0?n.call(this):setTimeout(function(){t.onAvailable(n)},5e3)},waitForFinalEvent=function(){var n={};return function(t,i,r){r||(r="Don't call this twice without a uniqueId"),n[r]&&clearTimeout(n[r]),n[r]=setTimeout(t,i)}}(),previousWindowWidthPixel=$(window).width(),$(document).ready(function(){windowWidth(),$(window).resize(function(){waitForFinalEvent(windowResize,500,"windowresize")}),setTimeout(fitMenuAndAds,500)}),$(document).ready(function(){$("#search").autocomplete({source:function(n,t){$.ajax({url:"/JSON/Suggestion",type:"POST",dataType:"json",data:{Query:n.term},success:function(n){t($.map(n,function(n){return{label:n.Text,value:n.Value,value2:n.URL}}))}})},select:function(n,t){window.location.href=t.item.value2},messages:{noResults:"",results:function(){}},delay:100})}),$(document).ready(function(){$("a.watch").click(function(){var n=getParameterByName(this,"pn");return $("#stockwatchresultsuccess").hide(),$("#stockwatchform").show(),$("#stockwatchresultfailure").hide(),$("div#watch input#watchpn").val(n),$("div#watch").show(),!1}),$("a.watchcancel").click(function(){return $("div#watch").hide(),!1}),$("#stockwatchform").submit(function(n){var i=!0;if(validateEmail()==!1&&(i=!1,$("#stockwatchresultfailure").show()),n.preventDefault(),i){var t=$(this),f=t.find("input[name='watchpn']").val(),u=t.find("input[name='email']").val(),r=$.post("/stockwatch",{email:u,watchpn:f});r.done(function(n){n=="1"?($("#stockwatchresultsuccess").show(),$("#stockwatchform").hide()):$("#stockwatchresultfailure").show()})}})}),function(n){for(var i=["Width","Height"],t;t=i.pop();)(function(t,i){n.fn[t]=t in new Image?function(){return this[0][t]}:function(){var r=this[0],n,t;return r.tagName.toLowerCase()==="img"&&(n=new Image,n.src=r.src,t=n[i]),t}})("natural"+t,t.toLowerCase())}(jQuery),$(document).ready(function(){$("a.largeimagelink").click(function(){$("div#waitblock").show(),$("div#largeimagebox img#largeimage").attr("src",""),largeImageHeight(),$("div#largeimagebox").show();var t=$(this).attr("href"),n=$(this).attr("title");return $("div#largeimagebox img#largeimage").attr("src",t),n!=""?$("div#largeimagebox p#largeimagetitle").html(n):$("div#largeimagebox p#largeimagetitle").html("Product Image"),!1}),$("div#largeimagebox img#largeimage").load(function(){largeImageHeight(),$("div#waitblock").hide(),$("div#largeimagebox").show()}),$("a#largeimageclose").click(function(){return $("div#largeimagebox").hide(),!1}),$("img#largeimage").click(function(){$("a#largeimagezoom").click()}),$("a#largeimagezoom").click(function(){return($("div.modalbox img#largeimage").width()!=$("div.modalbox img#largeimage").naturalWidth()||$("div.modalbox img#largeimage").height()!=$("div.modalbox img#largeimage").naturalHeight())&&($("div#largeimageboxtoolbar").hide(),emPixel=parseFloat($("body").css("font-size")),scrollerHeightPixel=$("div#largeimagebox div.modalboxverticaloffset div.modalbox div#largeimageboxscroller").height(),$("div#largeimagebox div.modalboxverticaloffset div.modalbox div#largeimageboxscroller").css("height",scrollerHeightPixel+3*emPixel),$("div.modalbox img#largeimage").css("cursor","auto"),$("div.modalbox img#largeimage").attr("title",""),$("div.modalbox img#largeimage").css("width",$("div.modalbox img#largeimage").width()),$("div.modalbox img#largeimage").css("height",$("div.modalbox img#largeimage").height()),$("div.modalbox img#largeimage").css("max-width","none"),$("div.modalbox img#largeimage").css("max-height","none"),$("div.modalbox img#largeimage").animate({height:$("div.modalbox img#largeimage").naturalHeight(),width:$("div.modalbox img#largeimage").naturalWidth()},1e3)),!1})})