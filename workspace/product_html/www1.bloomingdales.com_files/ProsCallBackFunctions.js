define(["jquery","cookie","bcomCoremetrics","iscroll","globals"],function(e,t,i,r,a){var n=a.getValue("props");var o=true;if(n!==""&&typeof n!=="undefined"&&(n.isProsInformantsEnabled!==""&&typeof n.isProsInformantsEnabled!=="undefined")){o=n.isProsInformantsEnabled}var s=function(r,a,n,o,s,l){var c="#"+l.targetId;var v=e(c+" div ul li").length,f="",h=t.get("RTD"),m="",p="",g=e(c+" div ul li").length,I={},w={},b=e(c+" #ArrowsRT").clone(),q=e(c+" #ArrowsLT").clone(),T=0,x="",A="";e(c).fadeIn("slow");e(c+" div ul li").each(function(t){x=e(c+" div ul li:eq("+t+") div.shortDescription a").html();A=x.substring(0,42)+"...";e(c+" div ul li:eq("+t+") div.shortDescription a").html(A);f=e(c+" div ul li img.productImage:eq("+t+")").attr("data-src");e(c+"  div ul li img.productImage:eq("+t+")").hide().attr("src",f).fadeIn(250);e(this).attr("data-index",0)});if(o==="Yes"){require(["bcomConvertIntlPrice"],function(t){var i,r;e(c+" div ul li").each(function(a){i=e(c+" div ul li:eq("+a+") div.prices span").html();r=t.ConvertIntlPrice(i,s);e(c+" div ul li:eq("+a+") div.prices span").html(r);e(c+".isInternationalMode div ul li:eq("+a+") div.prices span").show()})})}if(v>3){e(c+" #ItemsWrapper").append(q);e(c+" #ItemsWrapper").append(b);e(c+" div ul li:eq(0)").attr("tab-index",0);e(c+" div ul li:eq(3)").attr("tab-index",-1);setTimeout(function(){for(var t=0;t<=2;t++){T=T+e(c+" div.ItemsContainer ul.Items li.Item:eq("+t+")").outerHeight(true)}e(c+" div.ItemsContainer").css({height:T+"px"});d(c,l.LinkType,n)},350)}else if(v===1&&e(c).css("display")==="none"){e(c).fadeIn("slow")}if(v<3){e(c).hide()}if(v===3&&e(c).css("display")==="none"){e(c).fadeIn("slow")}else if(v===3){setTimeout(function(){T=e(c+" div.ItemsContainer .scroller").height();e(c+" div.ItemsContainer").css({height:T+"px"})},150)}for(var C=0;C<g;C++){if(e(c+" div ul li .shortDescription a:eq("+C+")").attr("data-choiceid")!==""&&e(c+" div ul li .shortDescription a:eq("+C+")").attr("data-webid")!==""){if(C+1===g){m=m+e(c+" div ul li .shortDescription a:eq("+C+")").attr("data-choiceid");p=p+e(c+" div ul li .shortDescription a:eq("+C+")").attr("data-webid")}else{m=m+e(c+" div ul li .shortDescription a:eq("+C+")").attr("data-choiceid")+"|";p=p+e(c+" div ul li .shortDescription a:eq("+C+")").attr("data-webid")+"|"}}}if(m!==""&&e(c).css("display")!=="none"){u("Presented",l.context,l.targetError,l.categoryId,m,p,a,h);I={41:""+decodeURI(l.RecProdZoneDesc)+""};w=i.attributes(I);i.pageViewTag({pageId:"RECPRESENT - "+n,categoryId:"PROS",attributes:w})}e("div"+c+" div a").click(function(t){t.preventDefault();u("Clicked",l.context,l.targetError,l.categoryId,e(this).attr("data-choiceId"),e(this).attr("data-webid"),a,h);var i=e(this).attr("href");setTimeout(function(){window.location=i},150)})},l=function(r,a,n,o,s,l){var d="#"+l.targetId;var v=e(d+" div ul li").length,f="",h=t.get("RTD"),m="",p="",g=e(d+" div ul li").length,I={},w={},b=0,q=900;e(d).fadeIn("slow");e(d+" div ul li").each(function(t){f=e(d+" div ul li img.productImage:eq("+t+")").attr("data-src");e(d+"  div ul li img.productImage:eq("+t+")").hide().attr("src",f).fadeIn(250);if(e(d+" div ul li:eq("+t+")").outerHeight(true)>b){b=e(d+" div ul li:eq("+t+")").outerHeight(true)}if(t>9){e(this).remove()}e(this).attr("data-index",0)});v=e(d+" div ul li").length;g=e(d+" div ul li").length;e(d+" div#ItemsWrapper div.ItemsContainer").css({height:b+"px"});if(document.addEventListener){if(v>10){e(d+" div#rvLT span").html("(10)")}else{e(d+" div#rvLT span").html("("+v+")")}}else{if(v>5){e(d+" div#rvLT span").html("(5)")}else{e(d+" div#rvLT span").html("("+v+")")}}q=e(d+" div ul li:eq(0)").outerWidth()*10;e(d+" div.ItemsContainer ul.Items").css({width:q+"px"});if(o==="Yes"){require(["bcomConvertIntlPrice"],function(t){var i,r;e(d+" div ul li").each(function(a){i=e(d+" div ul li:eq("+a+") div.prices span").html();r=t.ConvertIntlPrice(i,s);e(d+" div ul li:eq("+a+") div.prices span").html(r);e(d+".isInternationalMode div ul li:eq("+a+") div.prices span").show()})})}for(var T=0;T<g;T++){if(e(d+" div ul li .shortDescription a:eq("+T+")").attr("data-choiceid")!==""&&e(d+" div ul li .shortDescription a:eq("+T+")").attr("data-webid")!==""){if(T+1===g){m=m+e(d+" div ul li .shortDescription a:eq("+T+")").attr("data-choiceid");p=p+e(d+" div ul li .shortDescription a:eq("+T+")").attr("data-webid")}else{m=m+e(d+" div ul li .shortDescription a:eq("+T+")").attr("data-choiceid")+"|";p=p+e(d+" div ul li .shortDescription a:eq("+T+")").attr("data-webid")+"|"}}}if(v<5){e(d).hide()}if(v>5&&document.addEventListener){e(d+" #ArrowsRT img").show();e(d+" div ul li:eq(0)").attr("tab-index",0);e(d+" div ul li:eq(5)").attr("tab-index",-1);c(d,l.LinkType,n)}if(m!==""&&e(d).css("display")!=="none"){u("Presented",l.context,l.targetError,l.categoryId,m,p,a,h);I={41:""+decodeURI(l.RecProdZoneDesc)+""};w=i.attributes(I);i.pageViewTag({pageId:"RECPRESENT - "+n,categoryId:"PROS",attributes:w})}e("div"+d+" div a").click(function(t){t.preventDefault();u("Clicked",l.context,l.targetError,l.categoryId,e(this).attr("data-choiceId"),e(this).attr("data-webid"),a,h);var i=e(this).attr("href");setTimeout(function(){window.location=i},150)})},d=function(t,a,n){var o=[],s=[],l,d=0;if(t!==""&&e(t+" .ItemsContainer").length){l=new r(t+" .ItemsContainer",{scrollX:false,scrollY:true,mouseWheel:false,snap:true,momentum:false,touch:false});if(t!==""){e(t+" div.Arrows").fadeIn()}e(t+" #ArrowsRT img").removeClass("inactive");e(t+" #ArrowsLT.Arrows").click(function(){l.prev();s={2:n};o=i.attributes(s);i.elementTag({elementId:"Up_Arrow",categoryId:a,attributes:o});v(t,"lt","zonea")});e(t+" #ArrowsRT.Arrows").click(function(){l.next();s={2:n};o=i.attributes(s);i.elementTag({elementId:"Down_Arrow",categoryId:a,attributes:o});v(t,"rt","zonea")});l.on("scrollEnd",function(i){if(Math.abs(l.maxScrollY)===Math.abs(l.y)){e(t+" #ArrowsRT img").addClass("inactive")}else{e(t+" #ArrowsRT img").removeClass("inactive")}if(Math.abs(l.y)===0){e(t+" #ArrowsLT img").addClass("inactive")}else{e(t+" #ArrowsLT img").removeClass("inactive")}})}},c=function(t,a,n){var o=[],s=[],l,d=0,c=e(t+" div ul li").length;if(t!==""&&e(t+" .ItemsContainer").length){l=new r(t+" .ItemsContainer",{scrollX:true,scrollY:false,mouseWheel:false,snap:true,momentum:true,touch:false});e(t+" #ArrowsRT img").removeClass("inactive");e(t+" #ArrowsLT.Arrows").click(function(){l.prev();s={2:n};o=i.attributes(s);i.elementTag({elementId:"Left_Arrow",categoryId:a,attributes:o});v(t,"lt","zoneb")});e(t+" #ArrowsRT.Arrows").click(function(){l.next();s={2:n};o=i.attributes(s);i.elementTag({elementId:"Right_Arrow",categoryId:a,attributes:o});v(t,"rt","zoneb")});l.on("scrollEnd",function(i){if(Math.abs(l.maxScrollX)===Math.abs(l.x)){e(t+" #ArrowsRT img").fadeOut("fast")}else{e(t+" #ArrowsRT img").fadeIn("fast")}if(Math.abs(l.x)===0){e(t+" #ArrowsLT img").fadeOut("fast")}else{e(t+" #ArrowsLT img").fadeIn("fast")}if(c>5){e(t+" #ArrowsRT img").show()}})}},u=function(t,i,r,a,n,s,l,d){if(o){e.ajax({url:"/EventsWar/events/record/customeraction",type:"POST",data:{productIds:s,context:i,choiceIds:n,visitorId:d,sender:"BCOM-NAVAPP",responseType:t,categoryId:a},timeout:l,error:function(i,a,n){e("div#"+r).append(" Send Informant Call Failure - "+t)}})}},v=function(t,i,r){var a=5,n=e(t+" div ul li").length;if(r==="zonea"){a=3}e(t+" div ul li").attr("data-index",-1);if(i==="rt"){for(var o=0;o<=n;o++){if(o>=a){e(t+" div ul li:eq("+o+")").attr("data-index",o)}}e(t+" div ul li:eq("+a+")").attr("tab-index",0);e(t+" div ul li:eq("+0+")").attr("tab-index",-1)}else{for(var s=0;s<=n;s++){if(s<a){e(t+" div ul li:eq("+s+")").attr("data-index",s)}}e(t+" div ul li:eq("+a+")").attr("tab-index",-1);e(t+" div ul li:eq("+0+")").attr("tab-index",0)}};return{renderProsZoneA:s,renderProsZoneB:l,verticalScroll:d,horizontalScroll:c,sendInformantCall:u,updateDataIndex:v}});