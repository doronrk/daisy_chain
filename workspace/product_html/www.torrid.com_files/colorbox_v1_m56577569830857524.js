(function(J,l,W){var K={transition:"elastic",speed:300,width:false,initialWidth:"600",innerWidth:false,maxWidth:false,height:false,initialHeight:"450",innerHeight:false,maxHeight:false,scalePhotos:true,scrolling:true,inline:false,html:false,iframe:false,fastIframe:true,photo:false,href:false,title:false,rel:false,opacity:0.9,preloading:true,className:false,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:false,returnFocus:true,reposition:true,loop:true,slideshow:false,slideshowAuto:true,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:false,onLoad:false,onComplete:false,onCleanup:false,onClosed:false,overlayClose:false,escKey:false,arrowKey:false,top:false,bottom:false,left:false,right:false,fixed:false,data:undefined},

x="colorbox",S="cbox",r=S+"Element",V=S+"_open",e=S+"_load",U=S+"_complete",u=S+"_cleanup",ac=S+"_closed",i=S+"_purge",v=!J.support.leadingWhitespace,ag=v&&!W.XMLHttpRequest,aa=S+"_IE6",Q,ah,ai,d,H,p,b,P,c,Z,N,k,h,o,t,X,s,R,z,B,af,aj,m,g,a,w,I,n,D,Y,M,A,L,ae="div",ad,ab;function G(ak,an,am){var al=l.createElement(ak);if(an){al.id=S+an}if(am){al.style.cssText=am}return J(al)}function E(al){var ak=c.length,am=(I+al)%ak;return(am<0)?ak+am:am}function O(ak,al){return Math.round((/%/.test(ak)?((al==="x"?Z.width():Z.height())/100):1)*parseInt(ak,10))}function C(ak){return af.photo||/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(ak)}function T(){var ak,al=J.data(w,x);if(al==null){af=J.extend({},K);if(console&&console.log){console.log("Error: cboxElement missing settings object")}}else{af=J.extend({},al)}for(ak in af){if(J.isFunction(af[ak])&&ak.slice(0,2)!=="on"){af[ak]=af[ak].call(w)}}af.rel=af.rel||w.rel||J(w).data("rel")||"nofollow";af.href=af.href||J(w).attr("href");af.title=af.title||w.title;if(typeof af.href==="string"){af.href=J.trim(af.href)}}function F(ak,al){J(l).trigger(ak);J("*",ah).trigger(ak);if(al){al.call(w)}}function y(){var ak,am=S+"Slideshow_",an="click."+S,ao,al;if(af.slideshow&&c[1]){ao=function(){X.html(af.slideshowStop).unbind(an).bind(U,function(){if(af.loop||c[I+1]){ak=setTimeout(L.next,af.slideshowSpeed)}}).bind(e,function(){clearTimeout(ak)}).one(an+" "+u,al);ah.removeClass(am+"off").addClass(am+"on");ak=setTimeout(L.next,af.slideshowSpeed)};al=function(){clearTimeout(ak);X.html(af.slideshowStart).unbind([U,e,u,an].join(" ")).one(an,function(){L.next();ao()});ah.removeClass(am+"on").addClass(am+"off")};if(af.slideshowAuto){ao()}else{al()}}else{ah.removeClass(am+"off "+am+"on")}}function f(ak){if(!M){w=ak;T();c=J(w);I=0;if(af.rel!=="nofollow"){c=J("."+r).filter(function(){var am=J.data(this,x),al;if(am){al=J(this).data("rel")||am.rel||this.rel}return(al===af.rel)});I=c.index(w);if(I===-1){c=c.add(w);I=c.length-1}}if(!D){D=Y=true;ah.css({visibility:"hidden",display:"block"});N=G(ae,"LoadedContent","width:0; height:0; overflow:hidden").appendTo(d);aj=H.height()+P.height()+d.outerHeight(true)-d.height();m=p.width()+b.width()+d.outerWidth(true)-d.width();g=N.outerHeight(true);a=N.outerWidth(true);if(af.returnFocus){J(w).blur();J(l).one(ac,function(){J(w).focus()})}Q.css({opacity:parseFloat(af.opacity),cursor:af.overlayClose?"pointer":"auto",visibility:"visible"}).show();af.w=O(af.initialWidth,"x");af.h=O(af.initialHeight,"y");L.position();if(ag){Z.bind("resize."+aa+" scroll."+aa,function(){Q.css({width:Z.width(),height:Z.height(),top:Z.scrollTop(),left:Z.scrollLeft()})}).trigger("resize."+aa)}F(V,af.onOpen);B.add(o).hide();z.html(af.close).show()}L.load(true)}}function q(){if(!ah&&l.body){ab=false;Z=J(W);ah=G(ae).attr({id:x,"class":v?S+(ag?"IE6":"IE"):""}).hide();Q=G(ae,"Overlay",ag?"position:absolute":"").hide();h=G(ae,"LoadingOverlay").add(G(ae,"LoadingGraphic"));ai=G(ae,"Wrapper");d=G(ae,"Content").append(o=G(ae,"Title"),t=G(ae,"Current"),s=G(ae,"Next"),R=G(ae,"Previous"),X=G(ae,"Slideshow").bind(V,y),z=G(ae,"Close"));ai.append(G(ae).append(G(ae,"TopLeft"),H=G(ae,"TopCenter"),G(ae,"TopRight")),G(ae,false,"clear:left").append(p=G(ae,"MiddleLeft"),d,b=G(ae,"MiddleRight")),G(ae,false,"clear:left").append(G(ae,"BottomLeft"),P=G(ae,"BottomCenter"),G(ae,"BottomRight"))).find("div div").css({"float":"left"});k=G(ae,false,"position:absolute; width:9999px; visibility:hidden; display:none");B=s.add(R).add(t).add(X);J(l.body).append(Q,ah.append(ai,k))}}function j(){function ak(al){if(!(al.which>1||al.shiftKey||al.altKey||al.metaKey)){al.preventDefault();f(this)}}if(ah){if(!ab){ab=true;s.click(function(){L.next()});R.click(function(){L.prev()});z.click(function(){L.close()});Q.click(function(){if(af.overlayClose){L.close()}});J(l).bind("keydown."+S,function(am){var al=am.keyCode;if(D&&af.escKey&&al===27){am.preventDefault();L.close()}if(D&&af.arrowKey&&c[1]){if(al===37){am.preventDefault();R.click()}else{if(al===39){am.preventDefault();s.click()}}}});if(J.isFunction(J.fn.on)){J(l).on("click."+S,"."+r,ak)}else{J("."+r).live("click."+S,ak)}}return true}return false}if(J.colorbox){return}J(q);L=J.fn[x]=J[x]=function(ak,am){var al=this;ak=ak||{};q();if(j()){if(J.isFunction(al)){al=J("<a/>");ak.open=true}else{if(!al[0]){return al}}if(am){ak.onComplete=am}al.each(function(){J.data(this,x,J.extend({},J.data(this,x)||K,ak))}).addClass(r);if((J.isFunction(ak.open)&&ak.open.call(al))||ak.open){f(al[0])}}return al};L.position=function(am,ao){var aq,at=0,al=0,ap=ah.offset(),ak,an;Z.unbind("resize."+S);ah.css({top:-90000,left:-90000});ak=Z.scrollTop();an=Z.scrollLeft();if(af.fixed&&!ag){ap.top-=ak;ap.left-=an;ah.css({position:"fixed"})}else{at=ak;al=an;ah.css({position:"absolute"})}if(af.right!==false){al+=Math.max(Z.width()-af.w-a-m-O(af.right,"x"),0)}else{if(af.left!==false){al+=O(af.left,"x")}else{al+=Math.round(Math.max(Z.width()-af.w-a-m,0)/2)}}if(af.bottom!==false){at+=Math.max(Z.height()-af.h-g-aj-O(af.bottom,"y"),0)}else{if(af.top!==false){at+=O(af.top,"y")}else{at+=Math.round(Math.max(Z.height()-af.h-g-aj,0)/2)}}ah.css({top:ap.top,left:ap.left,visibility:"visible"});am=(ah.width()===af.w+a&&ah.height()===af.h+g)?0:am||0;ai[0].style.width=ai[0].style.height="9999px";function ar(au){H[0].style.width=P[0].style.width=d[0].style.width=(parseInt(au.style.width,10)-m)+"px";d[0].style.height=p[0].style.height=b[0].style.height=(parseInt(au.style.height,10)-aj)+"px"}aq={width:af.w+a+m,height:af.h+g+aj,top:at,left:al};if(am===0){ah.css(aq)}ah.dequeue().animate(aq,{duration:am,complete:function(){ar(this);Y=false;ai[0].style.width=(af.w+a+m)+"px";ai[0].style.height=(af.h+g+aj)+"px";if(af.reposition){setTimeout(function(){Z.bind("resize."+S,L.position)},1)}if(ao){ao()}},step:function(){ar(this)}})};L.resize=function(ak){if(D){ak=ak||{};if(ak.width){af.w=O(ak.width,"x")-a-m}if(ak.innerWidth){af.w=O(ak.innerWidth,"x")}N.css({width:af.w});if(ak.height){af.h=O(ak.height,"y")-g-aj}if(ak.innerHeight){af.h=O(ak.innerHeight,"y")}if(!ak.innerHeight&&!ak.height){N.css({height:"auto"});af.h=N.height()}N.css({height:af.h});L.position(af.transition==="none"?0:af.speed)}};L.prep=function(al){if(!D){return}var ao,am=af.transition==="none"?0:af.speed;N.empty().remove();N=G(ae,"LoadedContent").append(al);function ak(){af.w=af.w||N.width();af.w=af.mw&&af.mw<af.w?af.mw:af.w;return af.w}function an(){af.h=af.h||N.height();af.h=af.mh&&af.mh<af.h?af.mh:af.h;return af.h}N.hide().appendTo(k.show()).css({width:ak(),overflow:af.scrolling?"auto":"hidden"}).css({height:an()}).prependTo(d);k.hide();J(n).css({"float":"none"});ao=function(){var au=c.length,ar,at="frameBorder",ap="allowTransparency",aq;if(!D){return}function av(){if(v){ah[0].style.removeAttribute("filter")}}aq=function(){clearTimeout(A);h.remove();F(U,af.onComplete)};if(v){if(n){N.fadeIn(100)}}o.html(af.title).add(N).show();if(au>1){if(typeof af.current==="string"){t.html(af.current.replace("{current}",I+1).replace("{total}",au)).show()}s[(af.loop||I<au-1)?"show":"hide"]().html(af.next);R[(af.loop||I)?"show":"hide"]().html(af.previous);if(af.slideshow){X.show()}if(af.preloading){J.each([E(-1),E(1)],function(){var az,aw,ax=c[this],ay=J.data(ax,x);if(ay&&ay.href){az=ay.href;if(J.isFunction(az)){az=az.call(ax)}}else{az=ax.href}if(C(az)){aw=new Image();aw.src=az}})}}else{B.hide()}if(af.iframe){ar=G("iframe")[0];if(at in ar){ar[at]=0}if(ap in ar){ar[ap]="true"}if(!af.scrolling){ar.scrolling="no"}J(ar).attr({src:af.href,name:(new Date()).getTime(),"class":S+"Iframe",allowFullScreen:true,webkitAllowFullScreen:true,mozallowfullscreen:true}).one("load",aq).appendTo(N);J(l).one(i,function(){ar.src="//about:blank"});if(af.fastIframe){J(ar).trigger("load")}}else{aq()}if(af.transition==="fade"){ah.fadeTo(am,1,av)}else{av()}};if(af.transition==="fade"){ah.fadeTo(am,0,function(){L.position(0,ao)})}else{L.position(am,ao)}};L.load=function(an){var am,ao,al=L.prep,ak;Y=true;n=false;w=c[I];if(!an){T()}if(ad){ah.add(Q).removeClass(ad)}if(af.className){ah.add(Q).addClass(af.className)}ad=af.className;F(i);F(e,af.onLoad);af.h=af.height?O(af.height,"y")-g-aj:af.innerHeight&&O(af.innerHeight,"y");af.w=af.width?O(af.width,"x")-a-m:af.innerWidth&&O(af.innerWidth,"x");af.mw=af.w;af.mh=af.h;if(af.maxWidth){af.mw=O(af.maxWidth,"x")-a-m;af.mw=af.w&&af.w<af.mw?af.w:af.mw}if(af.maxHeight){af.mh=O(af.maxHeight,"y")-g-aj;af.mh=af.h&&af.h<af.mh?af.h:af.mh}am=af.href;A=setTimeout(function(){h.appendTo(d)},100);if(af.inline){ak=G(ae).hide().insertBefore(J(am)[0]);J(l).one(i,function(){ak.replaceWith(N.children())});al(J(am))}else{if(af.iframe){al(" ")}else{if(af.html){al(af.html)}else{if(C(am)){J(n=new Image()).addClass(S+"Photo").bind("error",function(){af.title=false;al(G(ae,"Error").html(af.imgError))}).one("load",function(){var ap;if(af.scalePhotos){ao=function(){n.height-=n.height*ap;n.width-=n.width*ap};if(af.mw&&n.width>af.mw){ap=(n.width-af.mw)/n.width;ao()}if(af.mh&&n.height>af.mh){ap=(n.height-af.mh)/n.height;ao()}}if(af.h){n.style.marginTop=Math.max(af.h-n.height,0)/2+"px"}if(c[1]&&(af.loop||c[I+1])){n.style.cursor="pointer";n.onclick=function(){L.next()}}if(v){n.style.msInterpolationMode="bicubic"}setTimeout(function(){al(n)},1)});setTimeout(function(){n.src=am},1)}else{if(am){k.load(am,af.data,function(aq,ap){al(ap==="error"?G(ae,"Error").html(af.xhrError):J(this).contents())})}}}}}};L.next=function(){if(!Y&&c[1]&&(af.loop||c[I+1])){I=E(1);L.load()}};L.prev=function(){if(!Y&&c[1]&&(af.loop||I)){I=E(-1);L.load()}};L.close=function(){if(D&&!M){M=true;D=false;F(u,af.onCleanup);Z.unbind("."+S+" ."+aa);Q.fadeTo(200,0);ah.stop().fadeTo(300,0,function(){ah.add(Q).css({opacity:1,cursor:"auto"}).hide();F(i);N.empty().remove();setTimeout(function(){M=false;F(ac,af.onClosed)},1)})}};L.remove=function(){J([]).add(ah).add(Q).remove();ah=null;J("."+r).removeData(x).removeClass(r);J(l).unbind("click."+S)};L.element=function(){return J(w)};L.settings=K}(jQuery,document,window));