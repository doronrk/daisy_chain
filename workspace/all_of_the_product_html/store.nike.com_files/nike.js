var nike=(function(a,c){if(!Array.prototype.indexOf){Array.prototype.indexOf=function(h){if(this===null){throw new TypeError()
}var i=new Object(this);
var f=i.length>>>0;
if(f===0){return -1
}var j=0;
if(arguments.length>0){j=Number(arguments[1]);
if(j!=j){j=0
}else{if(j!==0&&j!=Infinity&&j!=-Infinity){j=(j>0||-1)*Math.floor(Math.abs(j))
}}}if(j>=f){return -1
}var g=j>=0?j:Math.max(f-Math.abs(j),0);
for(;
g<f;
g++){if(g in i&&i[g]===h){return g
}}return -1
}
}var d=a.cq=a.cq||{};
if(!d.ns){d.ns=function(){var f=arguments,m=c,l=0,k=0,g=null,h=null;
for(l=0;
l<f.length;
l=l+1){g=f[l].split(".");
for(k=0;
k<g.length;
k=k+1){h=g[k];
m[h]=m[h]||{};
m=m[h]
}}return m
}
}if(!d.define||!d.require){var e=function(){this.modules={};
this.reqs={};
this.requires=0
};
e.prototype.add=function(h,f,j){if(typeof f==="string"){f=[f]
}if(!(f instanceof Array)){f=[]
}if(h in this.modules&&"executed" in this.modules[h]){return false
}if(h===undefined){h="require_"+this.requires++
}this.modules[h]={executed:false,value:j,requirements:f};
this.reqs[h]=this.reqs[h]||[];
for(var g=0;
g<f.length;
++g){this.reqs[f[g]]=this.reqs[f[g]]||[];
if(this.reqs[f[g]].indexOf(h)===-1){this.reqs[f[g]].push(h)
}}this.execute(h)
};
e.prototype.getReqs=function(j){var h=[],f=this.modules[j].requirements||[];
if(f.length==0){return h
}for(var g=0;
g<f.length;
++g){if(!(f[g] in this.modules)||this.modules[f[g]].executed!==true){return false
}else{if(f[g] in this.modules){h.push(this.modules[f[g]].value)
}}}return h.length>0?h:false
};
e.prototype.execute=function(h){var j=this.modules[h],f=this.getReqs(h);
if(!f||j.executed===true){return false
}if(typeof j.value==="function"){j.value=j.value.apply(j.value,f)
}else{j.value=undefined
}j.executed=true;
for(var g=0;
g<this.reqs[h].length;
++g){this.execute(this.reqs[h][g])
}};
var b=new e();
d.define=function(){b.add.apply(b,arguments)
};
d.require=function(f,g){b.add(undefined,f,g)
}
}return a
}(nike||{},window));
nike.cq.define("jquery",[],function(){return window.jQuery
});
nike.cq.require(["jquery","nike.cq.UI.StringReplace"],function(c,a){var d=".nike-cq-tesla-xml h1,.nike-cq-tesla-xml h2,.nike-cq-tesla-xml h3,.nike-cq-tesla-xml h4,.nike-cq-tesla-xml h5,.nike-cq-tesla-xml h6,.nike-cq-tesla-xml p,.nike-cq-tesla-xml li,.nike-cq-tesla-xml span";
if(!c("html").hasClass("ie7")){a(d,"Nike+",'Nike<span class="nikeplus">+</span>');
a(d,"NIKE+",'NIKE<span class="nikeplus">+</span>');
a(d,"dunk+",'dunk<span class="nikeplus">+</span>');
a(d,"DUNK+",'DUNK<span class="nikeplus">+</span>');
a(d,"LUNARGLIDE+",'LUNARGLIDE<span class="nikeplus">+</span>');
a(d,"LUNARTR1+",'LUNARTR1<span class="nikeplus">+</span>');
a(d,"HYPERWORKOUT+",'HYPERWORKOUT<span class="nikeplus">+</span>')
}var b=".nike-cq-follow-us div.nike-cq-follow-content h3";
a(b,"NIKEID",'NIKE<em class="nike-id">i</em>D');
a(b,"NIKEiD",'NIKE<em class="nike-id">i</em>D')
});
$(function(){var b=$("html.touch a.nike-cq-stacked-cta-button");
var a="nike-cq-stacked-cta-active";
b.click(function(d){d.preventDefault();
var c=$(this),f=c.closest("nav"),e=f.hasClass(a);
$("."+a).removeClass(a);
if(!e){f.addClass(a)
}})
});
nike.cq.define("nike.cq.PES.BrightCovePlayer",["jquery"],function(d){var g,i=function(j){f(j);
if(j.fadeInOnHover==true){c(j)
}},f=function(j){var l,k;
if(j.thumbnailImage){l=d(j.thumbnailImage).attr("width");
k=d(j.thumbnailImage).attr("height");
if(!l&&!l){d("<img/>").attr("src",d(j.thumbnailImage).attr("src")).load(function(){l=this.width;
k=this.height;
e(j,l,k)
})
}else{if(l&&k){e(j,l,k)
}else{if(!l){d("<img/>").attr("src",d(j.thumbnailImage).attr("src")).load(function(){var o=this.width;
var m=this.height;
var n=k/m;
l=o*n;
e(j,l,k)
})
}else{if(!k){d("<img/>").attr("src",d(j.thumbnailImage).attr("src")).load(function(){var o=this.width;
var m=this.height;
var n=l/o;
k=m*n;
e(j,l,k)
})
}}}}}},e=function(j,l,k){d(j.playButton).css({width:l,height:k});
d(j.thumbnailDiv).css({width:l,height:k})
},c=function(j){d(j.thumbnailDiv).hover(function(){d(this).stop().animate({opacity:"1"},"slow")
},function(){d(this).stop().animate({opacity:"0.7"},"slow")
})
},b=function(l){var k=brightcove.api.getExperience(l);
var j=k.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
g=k.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
j.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY,h);
g.addEventListener(brightcove.api.events.MediaEvent.COMPLETE,a)
},h=function(j){g.play()
},a=function(j){doHideVideoOverlay()
};
return{init:i,onTemplateLoaded:b}
});
nike.cq.define("nike.cq.PES.PesCarousel",["jquery","nike.cq.UI.Component.PesCarousel"],function(b,a){var c=c||b("body");
var e="carouselInitialized";
var d=function(){if(c){b(".nike-cq-pes-carousel-component").each(function(){var f=b(this);
if(f.data(e)!==true){new a(this,{contloop:true});
f.data(e,true)
}})
}};
b(function(){d()
});
return{init:d}
});
nike.cq.define("nike.cq.PES.PESBox",["jquery"],function($){var init=function(configuration){var config=configuration;
if($(".nike-cq-pesBox").length==0){setupPESBox()
}$(config.elementSelector).click(function(){displayPESBox(config)
})
},displayPESBox=function(config){var pesBox=$(".nike-cq-pesBox"),pesBoxContent=pesBox.find("#nike-cq-pesBox-content");
$("body").css("overflow","hidden");
pesBox.css("height","100%");
var ie8=$.browser.msie&&($.browser.version==8||$.browser.version==7);
if(ie8){pesBox.css("background-color","#000000");
pesBox.css("filter","alpha(opacity=91)")
}pesBox.css("height","100%");
pesBox.show();
pesBoxContent.html("<span class='nike-cq-pesBox-close'></span>"+config.contentToDisplay);
if(config.customFunction){var customFunction=eval(config.customFunction);
if(typeof(customFunction)==="function"){customFunction.call(this)
}}},hidePESBox=function(){$(".nike-cq-pesBox").hide().find("#nike-cq-pesBox-content").html("")
},setupPESBox=function(){$("body").prepend("<div class='nike-cq-pesBox'><div id='nike-cq-pesBox-content'></div></div>");
$(".nike-cq-pesBox").delegate(".nike-cq-pesBox-close","click",function(){hidePESBox()
})
};
return{init:init,hidePESBox:hidePESBox}
});
nike.cq.define("nike.cq.PES.PreviewOptions",["jquery"],function(b){var e,d,c=function(){var f=(b(".nike-cq-element-reference").length+b(".nike-cq-carousel").length),h=b(".placeholder").length,g=b(".pesWarning").length;
b("#nike-cq-preview-options-form").hide();
if(f>0){b("#nike-cq-preview-options-form").show();
if(b(".pesWarning").length>0){b("#showPESWarningsYes").attr("checked",true)
}else{b("#showPESWarningsNo").attr("checked",true)
}b("#nike-cq-preview-options-form").delegate("input:radio","change",function(){b("#nike-cq-preview-options-form").submit()
})
}},a=function(){var f=false;
b("#phonePreview").click(function(i){i.preventDefault();
if(f){return false
}else{setTimeout(function(){f=false
},1000);
f=true
}var p=b(this).data("phoneVersion");
var m=window.location.href;
var q=m.split(".html");
m=q[0]+".phone.html?wcmmode=disabled&phone-preview";
function l(u,t,r){var s=["toolbar=no","directories=no","status=no","menubar=no","scrollbars=yes","resizable=yes","copyhistory=yes","top=0","left="+u,"width="+t,"height="+r];
return s.join(",")
}function g(){var u=document.createElement("div");
u.style.visibility="hidden";
u.style.width="100px";
document.body.appendChild(u);
var s=u.offsetWidth;
u.style.overflow="scroll";
var r=document.createElement("div");
r.style.width="100%";
u.appendChild(r);
var t=r.offsetWidth;
u.parentNode.removeChild(u);
return(s-t)
}function n(v,r,w,u){var s=v+w,x=r+w,t=20;
e=window.open(m,"portrait",l(0,s,r));
d=window.open(m,"landscape",l(s+t,x,v));
e.onload=function(){this.document.title=this.document.title+" -  PHONE PREVIEW - "+u+" IN PORTRAIT";
var y=this.document.getElementsByTagName("body")[0];
y.className=y.className+" nike-cq-phone-preview portrait device-os-ios"
};
d.onload=function(){this.document.title=this.document.title+" -  PHONE PREVIEW - "+u+" IN LANDSCAPE";
var y=this.document.getElementsByTagName("body")[0];
y.className=y.className+" nike-cq-phone-preview landscape device-os-ios"
}
}var j,h,o,k=g();
if(p==="iphone5"){j=320;
h=586;
o="iPHONE 5"
}if(e&&!e.closed){e.close()
}if(d&&!d.closed){d.close()
}n(j,h,k,o)
})
};
b(window).load(function(){c();
a()
});
return{init:c,initPhonePreview:a}
});
nike.cq.define("nike.cq.PES.ProductOptions",["jquery","nike.cq.Utils"],function(h,m){var l={productOptions:".nike-cq-product-options",thumbnailElements:"li.nike-cq-product-options-option a",imageContainerElem:".nike-cq-product-options-images img",autoRotateTime:3000,autoRotateStartDelay:3000},n=0,e=undefined,b=h(".nike-cq-p1-layout-foreground"),i=function(r,q){var p=q.find(l.imageContainerElem),s=p.filter(".active"),t=p.eq(r);
t.fadeIn(500);
s.stop().fadeOut(1000,function(){h(this).removeClass("active");
t.addClass("active")
})
},c="",f=function(q,p){var r=p.closest(".nike-cq-p1-layout-foreground").find(".nike-cq-cta-component");
if(r.length){if(!r.eq(0).find("nav").length){r.eq(0).find("a").attr("href",m.validateInternalUrl(q))
}}},g=function(s,p){p.find(l.thumbnailElements+".current").removeClass("current").find(".marker").remove();
var q=p.find(l.thumbnailElements),r=q.eq(s).addClass("current").append('<span class="marker"></span>');
return r.attr("href")
},o=function(r){var p=r.find(".nike-cq-product-options-images img"),q=r.find(l.thumbnailElements),s=p.eq(0);
s.addClass("active").fadeIn(1000,function(){var t=g(0,r);
f(t,r);
q.fadeIn(1100,function(){h(this).addClass("available")
})
})
},a=function(){setTimeout(function(){e=setInterval(d,l.autoRotateTime)
},l.autoRotateStartDelay);
b.bind("click",function(){j()
})
},d=function(){var p=h(l.productOptions),r=n+1,s=p.find("li.nike-cq-product-options-option a")[r],q=undefined;
if(s){q=h(s).attr("href")
}else{r=0;
q=p.find("li.nike-cq-product-options-option a:first").attr("href")
}i(r,p);
g(r,p);
f(q,p);
n=r
},j=function(){clearInterval(e)
},k=function(q){var p=l.thumbnailElements;
var s=function(){h(p).hide();
h(l.imageContainerElem).hide();
h(l.productOptions).each(function(){o(h(this))
});
h(".nike-cq-product-options-title").fadeIn(900);
if(q==="true"){a()
}};
var r=function(){h(l.productOptions).delegate(l.thumbnailElements,"click",function(B){B.preventDefault();
var z=h(this),v=z.closest(l.productOptions),w=v.find(":animated"),x=z.attr("href"),u=z.parent(),A=u.parent().find("li"),y=A.index(u);
n=y;
if(w.length===0&&!z.hasClass("current")&&z.hasClass("available")){i(y,v);
g(y,v);
f(x,v)
}});
h(p).hover(function(){var v=h(this),w=v.find("img"),u=w.attr("title");
if(u!==""){v.parent().append('<span class="nike-cq-p1-tooltip"><p>'+u+'</p><span class="carrot-bottom"></span></span>')
}},function(){var u=h(this);
u.parent().find(".nike-cq-p1-tooltip").remove()
})
};
function t(){if(document.readyState==="complete"){s();
r()
}else{setTimeout(t,100)
}}setTimeout(t,100)
};
return{init:k,showProductOptions:o}
});
nike.cq.define("nike.cq.PES.videoBg",["jquery"],function(j){var i={parentContainer:".nike-cq-fst",startingImage:".nike-cq-fst-video-bg-start-image",fallbackImage:".nike-cq-fst-background-image",videoContainer:".nike-cq-fst-video-bg-component",loadTimeout:10000,videoDelay:2000,autoPlay:false,videoFormat:"video/mp4",isIOSControls:false,videoMetaDataFunction:function(p){return j(p).data()
},created:null};
var h=function(s,q){var r=j("<video />"),p=j("<source />");
p.attr("src",s.videoUrl).attr("type",s.videoFormat||"video/mp4");
r.append(p);
!this.isIOSControls&&r.attr("preload","true");
s.loop&&!this.parentContainer.parents(".nike-cq-carousel-slide").length&&r.attr("loop","");
if(!s.controls){r.attr("muted","true");
r[0].muted=true
}q&&q.call(q,r[0]);
return r[0]
};
var k=function(D){var q=this;
var B=j(D);
var p=j("<div />").addClass("nike-cq-fst-video-controls");
var y=j("<a>&nbsp;</a>").attr("href","#").addClass("nike-cq-fst-video-play-pause-button");
var w=function(F){if(F){!y.hasClass("paused")&&y.addClass("paused")
}else{!F&&y.hasClass("paused")&&y.removeClass("paused")
}};
var s=function(F){F?t():v()
};
var t=function(){if(q.isIOSControls){if(D&&D.currentTime&&D.currentTime>0){D.currentTime=0
}D.play();
D.webkitEnterFullscreen()
}else{B.trigger("playVideoUserAction")
}};
var v=function(){q.pause();
B.trigger("pauseVideoUserAction")
};
var z=function(){p.stop(true,true).fadeIn()
};
var u=function(){p.is(":visible")&&!D.paused&&p.stop(true,true).fadeOut()
};
var x=function(){w(false)
};
var A=function(){w(true);
z()
};
var E=function(F){F.preventDefault();
s(y.hasClass("paused"))
};
var C=function(){z()
};
var r=function(){u()
};
p.append(y);
y.click(E);
w(D.paused);
D.addEventListener("play",x);
D.addEventListener("pause",A);
q.parentContainer.bind("mouseenter",C);
q.parentContainer.bind("mouseleave",r);
return p[0]
};
var a=function(p,q){return p.canPlayType&&p.canPlayType(q)!==""
};
var c=function(p){return p&&p.readyState>=2
};
var b=function(r,p){var q=j(r);
r&&r.pause();
if(r&&r.currentTime&&r.currentTime>0){r.currentTime=0
}if(p&&p.controls()){p.startImage&&!p.startImage.is(":visible")&&p.startImage.stop(true,true).show()
}else{q.parent().fadeOut(400,function(){if(!p||!q.parents(".nike-cq-carousel-slide").length){q.remove();
r=null
}})
}q.trigger("videoFinished")
};
var d=function(r,p){var q=j(r);
if(r&&r.currentTime&&r.currentTime>0){r.currentTime=0
}p&&p.controls()&&p.startImage&&!p.startImage.is(":visible")&&p.startImage.stop(true,true).show();
p&&p.videoContainer&&!p.videoContainer.is(":visible")&&p.videoContainer.stop(true,true).show();
q.trigger("videoRewind")
};
var e=function(r,q){var p=this;
r.addEventListener("play",function(){if(!p.isIOSControls){q.fadeOut()
}});
r.addEventListener("ended",function(){b(r,p)
});
r.addEventListener("canplay",function(){n.call(p)
});
this.parentContainer.bind("videoReset",function(){d(r,p)
});
if(p.isIOSControls){r.addEventListener("webkitendfullscreen",function(){if(r&&r.currentTime&&r.currentTime>0){r.currentTime=0
}r.pause()
})
}};
var g=function(r,q,p){var s=function(){setTimeout(function(){if(c(r)){r.play()
}else{r.addEventListener("canplay",function(){r.play()
})
}},p.videoDelay)
};
j(window).load(function(){s()
})
};
var f=function(r,q,s,p){this.noLoadTimer=setTimeout(function(){if(!r||!r.readyState||r.readyState<2){q.remove();
j(s).remove();
b(r)
}},p.loadTimeout)
};
var n=function(){if(this.noLoadTimer){clearTimeout(this.noLoadTimer)
}this.noLoadTimer=null
};
var m=/(iPad|iPhone|iPod)/g.test(navigator.userAgent);
var l=(function(){if(/iP(hone|od|ad)/.test(navigator.platform)){var p=(navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
return[parseInt(p[1],10),parseInt(p[2],10),parseInt(p[3]||0,10)]
}})();
var o=function(r,p){this.config=r=j.extend({},i,r);
this.parentContainer=p||j(r.parentContainer);
var s=this.videoContainer=p.find(r.videoContainer);
var u=this.startImage=p.find(r.startingImage);
var v=this.fallbackImage=p.find(r.fallbackImage);
var t=this.videoData=r.videoMetaDataFunction.call(this,s);
this.isIOSControls=(m&&l[0]>=7&&this.controls());
var w=this.videoElement=h.call(this,t,r.created);
var q;
var x=this.noLoadTimer=null;
if((this.isIOSControls||!m)&&a(w,r.videoFormat)){u.show();
s.show();
e.call(this,w,u);
s.append(w);
if(this.controls()){q=this.videoControls=k.call(this,w);
s.after(q)
}!this.isIOSControls&&f.call(this,w,u,q,r);
this.willPlay=true
}else{s.remove();
u.remove();
this.willPlay=false
}p.data("vbgRef",this);
s.trigger("initializeVideo",{controls:this.controls()})
};
o.prototype.getVideoElement=function(){return this.videoElement
};
o.prototype.calculateVisibility=function(){if(!this.willPlay||!this.canPlay()||m){return false
}var v=j(window),q,w,p=Math.max(0,j(".gnav").height()),s=v.height()-p,t=v.scrollTop()+p,r=t+s,y=this.videoContainer.offset().top,u=this.videoContainer.height(),x=y+u;
if(!j(this.videoElement).is(":visible")){q=0
}else{if(this.controls()&&this.paused()){q=0
}else{if(y>=t&&x<=r){q=u
}else{if(y<t&&x>r){q=s
}else{if(x>=t&&x<=r){q=u-(t-y)
}else{if(y>=t&&y<=r){q=r-y
}else{q=0
}}}}}}w=(q/u)*100;
return w
};
o.prototype.pause=function(){return this.willPlay&&!this.videoElement.paused&&this.videoElement.pause()
};
o.prototype.play=function(){return this.willPlay&&this.canPlay()&&this.videoElement.paused&&this.videoElement.play()
};
o.prototype.paused=function(){return this.videoElement.paused
};
o.prototype.controls=function(){return this.videoData.controls
};
o.prototype.canPlay=function(){return c(this.videoElement)
};
return o
});
nike.cq.define("nike.cq.PES.Hotspots",["jquery","nike.cq.Utils"],function(A,E){var j=34,n=34,l=109,o=87,e=109,r=180,K=14,u=(r/2)-(j/2),H=n+K,g=function(R,P){var W=R.width(),O=R.parents(".nike-cq-p1-layout-foreground").height(),V=P.find(".hotspot-panel").outerHeight(),Q=P.position(),U=Q.left,S=Q.top,N=P.attr("data-hotspot-x"),M=P.attr("data-hotspot-y");
P.removeClass("hotspot-left hotspot-right");
P.find(".carrot").removeClass("carrot-top carrot-bottom carrot-left carrot-right");
if(U===0&&S===0&&(N!==0||M!==0)){return
}if((U+(j/2))>(W/2)){P.find(".carrot").addClass("carrot-left");
P.addClass("hotspot-right")
}else{P.find(".carrot").addClass("carrot-right");
P.addClass("hotspot-left")
}var L=0-(V/2)+(n/2);
if((S+(n/2))-(V/2)<0){L=0-S
}if((S+(n/2))+(V/2)>O){var T=(S+(n/2))+(V/2)-O;
T=T;
L=L-T
}P.find(".hotspot-panel").css({top:L,bottom:"auto",left:""});
if(S<e){P.find(".carrot").addClass("carrot-bottom");
P.find(".hotspot-panel").css({top:n+12,bottom:"auto",left:-((216/2)-(j/2))})
}if(S>(O-e-n)){P.find(".carrot").addClass("carrot-top");
P.find(".hotspot-panel").css({top:"auto",bottom:n+12,left:-((216/2)-(j/2))})
}},w=function(L){L.find(".hotspot-panel").before('<span class="carrot"></span>')
},t=function(M){var L=M.find(".nike-cq-hotspots-component");
if(M.is(":visible")){M.find(".hotspot").each(function(O){var N=A(this);
N.hide().stop().delay(500*(O+1)).fadeIn(300,function(){g(L,N)
})
})
}},F=function(L){L.find(".hotspot a.crosshair").live("click",function(O){O.preventDefault();
var M=A(this);
var N=L.find("a.crosshair").not(M);
if(!M.hasClass("active")){z(L,M);
N.each(function(){a(L,A(this),500)
})
}else{a(L,M,500,true)
}})
},z=function(M,L){B(M);
L.addClass("active").parent().find(".carrot, .hotspot-panel").fadeIn(700)
},a=function(O,M,N,L){if(L){M.stop().parent().find(".carrot, .hotspot-panel").fadeOut({complete:function(){M.removeClass("active");
v(O)
},duration:N})
}else{M.removeClass("active").stop().parent().find(".carrot, .hotspot-panel").fadeOut({complete:function(){v(O)
},duration:N})
}},C=function(L){L.find(".nike-cq-p1-hotspot-overlay-mask").live("click",function(N){N.preventDefault();
var M=L.find(".hotspot .active");
if(M.length){a(L,M,500)
}v(L)
})
},B=function(M){if(M.find(".nike-cq-p1-hotspot-overlay-mask").length===0){var L=A('<div class="nike-cq-p1-hotspot-overlay-mask"></div>');
M.find(".nike-cq-p1-layout-container").first().before(L)
}},v=function(L){if(!L.find(".hotspot .active").length){L.find(".nike-cq-p1-hotspot-overlay-mask").remove()
}},I=false,J=function(){if(!I){var M=[768,960,1229];
for(var L=0;
L<M.length;
++L){if(window.matchMedia){p(M[L])
}else{s(M[L])
}}I=true
}},p=function(M){var L=window.matchMedia("(max-width: "+M+"px)");
if(L.matches){h()
}L.addListener(function(){h()
})
},s=function(L){E.debounceResize(h,100,true)
},h=function(){A(".nike-cq-hotspots-component").each(function(){var M=A(this),L=M.hasClass("scaled-down-flag");
if(!L&&i(M)===464){D(M)
}if(L&&i(M)>=580){f(M)
}})
},i=function(L){return L.width()
},D=function(L){e=o;
L.find(".hotspot").each(function(){var M=A(this);
y(M);
g(L,M)
});
L.addClass("scaled-down-flag")
},y=function(M){var Q=80,P=parseInt(M.attr("data-hotspot-x"),10)/100*Q,O=parseInt(M.attr("data-hotspot-y"),10)/100*Q;
M.css({left:P,top:O});
if(b(M)==="hotspot-type-invisible"){var N=parseInt(M.attr("data-hotspot-width"),10)/100*Q,L=parseInt(M.attr("data-hotspot-height"),10)/100*Q;
M.css({width:N,height:L})
}},f=function(L){e=l;
L.find(".hotspot").each(function(){var M=A(this);
c(M);
g(L,M)
});
L.removeClass("scaled-down-flag")
},c=function(M){var O=parseInt(M.attr("data-hotspot-x"),10),N=parseInt(M.attr("data-hotspot-y"),10);
M.css({left:O,top:N});
if(b(M)==="hotspot-type-invisible"){var L=parseInt(M.attr("data-hotspot-width"),10),P=parseInt(M.attr("data-hotspot-height"),10);
M.css({width:L,height:P})
}},b=function(L){return L.parent().attr("data-hotspot-type")
},G=function(){A("body").bind("touchstart",function(L){if(!A(this).hasClass("hotspot")){A("body").focus()
}})
},q=function(L){if(document.readyState==="complete"){t(L)
}else{A(window).load(function(){t(L)
})
}},x=function(N){var L=N.find(".nike-cq-touts-p1-layout-touts-p1-image-resource"),M=parseInt(L.attr("height"),10);
if(M>500){l=142;
o=120
}},d=function(L){L.find(".hotspot").stop().each(function(){a(L,A(this).find("a.crosshair"),1)
}).css({opacity:1}).hide()
},m=function(L){d(L);
t(L)
},k=function(L){x(L);
w(L);
q(L);
F(L);
C(L);
J(L);
G()
};
return{init:k,hideHotspots:d,resetHotspots:m}
});
nike.cq.define("nike.cq.PES.HotspotSystem",["jquery","nike.cq.initializer"],function(e,d){var c,b=[],f=function(y){var v,o,D,j,w,u,x,q,n,B,C=940,A={"hotspot-type-crosshair":{ANIMATION:{showDelay:500,fadeIn:300},CLASS_LIST:"",CLICK_TO_SHOW_PANEL:true,POSITIONABLE_PANEL:true},"hotspot-type-invisible":{ANIMATION:{},CLASS_LIST:"",RESIZE_HOTSPOT:true},"hotspot-type-shop":{ANIMATION:{},CLASS_LIST:"slideIn",HOVER_PANEL:true}},t,s,k=function(){if(t){D.addClass(t)
}},g=function(G){var F=e.Deferred(),I=j.clone().hide().appendTo("body");
I.load(F.resolve);
I.error(F.resolve);
e.when(F).done(H).then(H);
function H(L){var J=I.width(),K=I.height();
if(J!==0&&K!==0){n=J;
B=K
}}return F.promise()
},i=function(H){var R=H.data("hotspotX"),Q=H.data("hotspotY"),N=Math.ceil(((C*B)/n)),T=R/C,G=Q/N,M=j.is(":visible"),F=e(window).width(),J=M?j.height():(B*F)/n,P=M?j.width():F,O={height:H.height(),width:H.width(),top:G*100+"%",left:T*100+"%"},L,S,I,K;
if(A[x].RESIZE_HOTSPOT){L=H.data("hotspotHeight");
S=H.data("hotspotWidth");
O.height=J*L/N;
O.width=P*S/C
}I=G*(J-N)/(O.height/2);
K=T*R/2000*(P-C)/(O.width/2);
O.top=(G+I/J)*100+"%";
O.left=(T+K/P)*100+"%";
return O
},m=function(){var F=e(this);
if(F.hasClass("hotspot")){F.css(i(F))
}else{D.each(function(){var G=e(this);
G.css(i(G))
})
}},l=function(M,K){M.css({position:"absolute",top:"0"});
var S=M.width(),J=M.height(),R=K.find(".hotspot-panel").outerHeight(),L=K.position(),P=L.left,N=L.top,Q=K.width(),G=K.height(),I=K.attr("data-hotspot-x"),H=K.attr("data-hotspot-y");
K.removeClass("hotspot-left hotspot-right");
K.find(".carrot").removeClass("carrot-top carrot-bottom carrot-left carrot-right");
if(P===0&&N===0&&(I!==0||H!==0)){return
}if((P+(Q/2))>(S/2)){K.find(".carrot").addClass("carrot-left");
K.addClass("hotspot-right")
}else{K.find(".carrot").addClass("carrot-right");
K.addClass("hotspot-left")
}var F=0-(R/2)+(G/2);
if((N+(G/2))-(R/2)<0){F=10-N
}if((N+(G/2))+(R/2)>J){var O=(N+(G/2))+(R/2)-J;
O=O+10;
F=F-O
}K.find(".hotspot-panel").css({top:F,bottom:"auto",left:""});
if(N<100){K.find(".carrot").addClass("carrot-bottom");
K.find(".hotspot-panel").css({top:G+12,bottom:"auto",left:-((216/2)-(Q/2))})
}if(N>(J-100-G)){K.find(".carrot").addClass("carrot-top");
K.find(".hotspot-panel").css({top:"auto",bottom:G+12,left:-((216/2)-(Q/2))})
}M.css("position","static")
},h=function(F){e(this).hide().stop().delay(s.showDelay*(F+1)).fadeIn(s.fadeIn,function(){if(A[x].POSITIONABLE_PANEL){l(v,e(this))
}})
},r=function(J,G,I){var F=G?"addClass":"removeClass",H=G?"fadeIn":"fadeOut";
if(I){J.removeClass("active").find(".carrot, .hotspot-panel").hide().end().find("a.crosshair").removeClass("active")
}else{J[F]("active").find(".carrot, .hotspot-panel")[H](700).end().find("a.crosshair")[F]("active")
}},E=function(){var F=e(".nike-cq-hotspot-type-crosshair");
if(F.hasClass("active")){F.removeClass("active").find(".carrot, .hotspot-panel").fadeOut(300).end().find("a.crosshair").removeClass("active")
}},p=function(){e(window).on("resize",function(){clearTimeout(q);
q=setTimeout(m,50)
});
if(A[x].HOVER_PANEL){var F=D.find(".hotspot-panel");
F.on("webkitAnimationEnd oanimationend msAnimationEnd animationend",function(G){F.addClass("hotspot-panel-hidden").parent().removeClass("slideIn")
});
e(window).load(function(){e(".ie8 .hotspot-panel, .ie9 .hotspot-panel").addClass("hotspot-panel-hidden").parent().removeClass("slideIn")
});
D.on("mouseenter",function(){e(this).find(".hotspot-panel-hidden").css({height:"auto",overflow:"visible"}).addClass("hotspot-hover")
});
if(e("html.ie8").length){D.on("mouseenter",function(){var G=e(this).find(".hotspot-panel"),H=20;
G.css({marginLeft:-(G.width()-H)/2})
})
}D.on("mouseleave",function(){var G=e(this).find(".hotspot-panel-hidden");
G.removeClass("hotspot-hover").css({"pointer-events":"none"});
setTimeout(function(){G.css({height:"0",overflow:"hidden","pointer-events":"auto"})
},300)
})
}if(A[x].CLICK_TO_SHOW_PANEL){D.on("click",function(J){var G=e(this),I=D.not(G),H=G.hasClass("active");
E();
r(G,!H)
})
}if(w.length){w.on(nike.cq.carousels.constants.SLIDE_PAGE_INDEX_CHANGE,function(H,G){w.find(".hotspot").hide();
k();
if(A[x].HOVER_PANEL){D.each(function(J){var I=e(this);
I.find(".hotspot-panel").removeClass("hotspot-panel-hidden").attr("style","").parent().addClass("slideIn")
});
e(".ie9 .hotspot-panel").addClass("hotspot-panel-hidden").parent().removeClass("slideIn")
}setTimeout(function(){D.each(function(J){var I=e(this);
if(A[x].POSITIONABLE_PANEL){r(I,false,true)
}h.call(I,J)
})
},1000)
})
}o.children().not(".nike-cq-hotspots, .hotspot-panel > *").on("click",function(G){E()
});
e(window).bind("pageshow",function(G){if(G.originalEvent.persisted){D.find(".hotspot-panel-hidden").removeClass("hotspot-hover").css({"pointer-events":"none"});
D.find("a").blur()
}})
},z=function(F){v=F.find(".hotspot-system");
if(!v){return
}u=v.data();
o=v.closest("."+u.hotspotParentContainerClass);
if(!o.length||!o.hasClass("nike-cq-fst-component")){return
}j=o.find(".nike-cq-fst-background-image img");
D=v.find(".hotspot");
w=o.parents(".nike-cq-carousel-slide:first").closest(".nike-cq-carousel");
x=u.hotspotType;
t=A[x].CLASS_LIST;
s=A[x].ANIMATION;
if(typeof n==="undefined"){g().done(function(){D.each(function(G){m.call(this,G);
h.call(this,G)
})
})
}p();
k()
};
z(y);
return{$carousel:w,$elements:D,$parentContainer:o,init:z}
},a=function(g){g.each(function(){c=new f(e(this));
b.push(c)
})
};
d.registerComponents({name:"nike-cq-hotspots",state:"ready",action:a});
return{init:a}
});
nike.cq.define("nike.cq.PES.Gestures",["jquery"],function(b){var a=function(c){var d={triggerPreviousEvent:"click",triggerNextEvent:"click"};
c=b.extend(d,c);
if(!b().hammer){return
}function e(f){f.gesture.preventDefault();
switch(f.type){case"dragleft":if(c.nextButton){c.$element.find(c.nextButton).trigger(c.triggerPreviousEvent);
f.gesture.stopDetect()
}break;
case"dragright":if(c.previousButton){c.$element.find(c.previousButton).trigger(c.triggerNextEvent);
f.gesture.stopDetect()
}break
}}c.$element.hammer({drag_lock_to_axis:true,drag_block_horizontal:true}).on("swipe dragleft dragright",e)
};
return{register:a}
});
nike.cq.define("nike.cq.PES.leftNavigation",["jquery"],function(f){var c=999,h=400,e="nike-cq-nav-closed",j="nike-cq-min-nav",n="nike-cq-min-nav-section",l="nsg-text--medium-grey",b="nsg-glyph--minus",i="nsg-glyph--plus",d="nsg-glyph--chevron-right",g=function(u){var w=u.find(".nike-cq-nav-title"),y=u.find(".nike-cq-left-navigation-nav-links"),B=u.find(".nike-cq-nav-section-title"),v=u.find(".nike-cq-nav-nav"),z=u.find(".nike-cq-left-navigation-sections-wrapper"),s=u.find(".nike-cq-left-navigation-component-tout"),r='<span class="'+b+" "+l+'">-</span>',t='<span class="'+d+'">&lt;</span>',q=function(F,G){var E=G?b:i;
F.attr({"class":E}).addClass(l)
};
s.append(t);
w.wrapInner('<span class="nike-cq-nav-title-wrapped"></span>').append(r);
w.wrap('<a href="#" class="nike-cq-nav-title-link"></a>');
B.wrapInner('<span class="nike-cq-nav-section-title-wrapped"></span>').append(r);
B.wrap('<a href="#" class="nike-cq-nav-section-title-link"></a>');
u.find(".nike-cq-nav-section-title-link").bind("click",function(H){H.preventDefault();
var G=f(this),F=G.siblings(".nike-cq-left-navigation-nav-links-wrapper"),E=G.find("."+b+",."+i),I=G.hasClass(e);
q(E,I);
if(I){F.slideDown(h);
G.removeClass(e)
}else{F.slideUp(h);
G.addClass(e)
}});
u.find(".nike-cq-nav-title-link").bind("click",function(G){G.preventDefault();
var E=w.hasClass(j),F=w.find("."+b+",."+i);
q(F,E);
if(E){w.removeClass(j);
v.removeClass(n);
z.slideDown(h)
}else{w.addClass(j);
v.addClass(n);
z.slideUp(h)
}});
var p=function(S,Q){var O="nike-cq-left-nav-section-expanded",K="nike-cq-left-nav-section-extra-links",L='<span class="nsg-glyph--arrow-down"></span>',M='<span class="nsg-glyph--arrow-up"></span>',P=function(T,U){return U.replace("[title text]",T.data("plural"))
},F=function(U,W,T){var X=T?L:M,V=P(U,W)+X;
U.html(V)
};
y.each(function(){var T=f(this),Z=T.find("li");
if(Z.length>c){var Y=P(T,S),X=Z.slice(c),V=T.clone(),U=f("<span/>").attr({"class":"nike-cq-left-nav-additional-content nsg-font-family--platform"}),W=f("<a/>").attr({href:"#","data-plural":T.data("plural")}).text(Y).append(L);
T.css("padding-bottom",0);
V.addClass(K).empty().append(X).insertAfter(T).hide();
U.append(W).insertAfter(V)
}});
u.find(".nike-cq-left-nav-additional-content a").bind("click",function(V){V.preventDefault();
var T=f(this),U=T.parent().siblings("."+K);
if(T.hasClass(O)){F(T,S,true);
U.slideUp(h);
T.removeClass(O)
}else{F(T,Q,false);
U.slideDown(h);
T.addClass(O)
}});
var J=f(".nike-cq-notification-reference-component"),I=J.length,R=60,E=I*R;
var G=f(window).width(),H=1472,N=1009;
if(G<=H){u.find(".nike-cq-nav-section-title-link:not(:first)").click()
}if(G<=N){u.find(".nike-cq-nav-title-link").click()
}u.closest("section").each(function(){var V=f(this),T=V.position()||{top:0,left:0},U=T.top+E;
V.css({top:U}).addClass("nike-cq-visible-nav")
});
if(nike.dispatchEvent&&nike.Event.FACET_NAVIGATION_LOAD_COMPLETE){nike.dispatchEvent(nike.Event.FACET_NAVIGATION_LOAD_COMPLETE,{element:u});
if(nike.dispatchEvent&&nike.Event.FACET_NAVIGATION_LOAD_COMPLETE){nike.dispatchEvent(nike.Event.FACET_NAVIGATION_LOAD_COMPLETE,{element:u})
}}};
var C="[data-more-text]",o=u.find(C).andSelf().filter(C),A=o.data();
if(o.length){var D=A.moreText,x=A.lessText;
p(D,x)
}},m=function(){if(f(".left-bar").length){f(".nike-cq-tesla-xml").addClass("nike-cq-mod-left-nav tesla-mod-left-nav")
}},a=function(){f(".nike-cq-tesla-xml").addClass("nike-cq-mod-left-nav")
},k=function(){m();
f(".nike-cq-left-navigation-tout-component, .nike-cq-left-navigation-component, .nike-cq-left-navigation-page .nike-cq-navigation-component").each(function(){a();
g(f(this))
})
};
f(function(){k();
if(f("body").data("cmsMode")!=="EDIT"){f(".nike-cq-left-navigation-component-tout").each(function(){var o=f(this),q=o.find("a"),p=o.find(".nike-cq-url");
o.wrapInner(q);
p.remove()
})
}});
return{init:k,initTeslaLeftNavMod:m}
});
nike.cq.define("nike.cq.PES.p1Layout",["jquery","nike.cq.UI.VideoPlayingElement","nike.cq.PES.ProductOptions","nike.cq.PES.Hotspots","nike.cq.initializer"],function(g,h,m,f,i){var j=function(n){n.find("div").contents().filter(function(){return this.nodeType===3
}).remove()
},d=function(n){if(n.length&&g("body").data("cmsMode")!=="EDIT"){n.find(".nike-cq-cta").hide();
n.find(".nike-cq-cta .nike-cq-cta-component").parent().show()
}},c=function(n){if(n.find(".nike-cq-p1-layout-cta-row").length===2){n.addClass("multiple-cta")
}},b=function(n){if(n.find(".video-thumbnail").length>0){h(n)
}},e=function(o){if(o.find(".nike-cq-product-options").length>0){var n=o.find(".nike-cq-product-options").attr("data-auto-rotate");
m.init(n)
}},l=function(n){if(n.find(".nike-cq-hotspots").length){f.init(n)
}},k=function(p){if(g("body").data("cmsMode")!=="EDIT"){var o=p.find(".nike-cq-p1-layout-anchor").clone(true).appendTo(p.find(".nike-cq-p1-layout-background")),q=p.find(".nike-cq-hotspots-component"),n=p.find(".nike-cq-product-options-images");
if(q.length>0){q.prepend(o.clone(true))
}if(n.length>0){n.append(o.clone(true))
}}},a=function(o){var n=o.find(".nike-cq-p1-layout-foreground");
j(n);
d(n);
c(o);
b(n);
e(o);
l(o);
k(o)
};
i.registerComponents({name:"nike-cq-p1-layout",state:"ready",action:a});
return{init:a}
});
nike.cq.define("nike.cq.PES.p1Video",["jquery","nike.cq.initializer"],function(i,r){var h={TABLET_CLASS:"touch",VIDEO_ELEMENTS_SELECTOR:".nike-cq-video-bg",VIDEO_START_SELECTOR:".start-image-background, .nike-cq-video-bg .nike-cq-image",VIDEO_CONTAINER_SELECTOR:".nike-cq-video-bg-component",VIDEO_PRESTART_CLASS:"nike-cq-video-bg-prestart"},k=undefined,e=undefined,d=undefined,l=undefined,g=10000,j=500,a=false,q=false,p=function(s){e=s.find(h.VIDEO_CONTAINER_SELECTOR);
if(e.length>0){e.empty();
d=c()
}if(i("body").data("cmsMode")==="EDIT"){return
}k=s.closest(h.VIDEO_ELEMENTS_SELECTOR);
l=k.find(h.VIDEO_START_SELECTOR);
a=k.length;
q=i("."+h.TABLET_CLASS).length;
if(!a){return
}else{if(q||!f("video/mp4")){b();
return
}}setTimeout(n,g);
setTimeout(function(){try{m();
d.play();
o()
}catch(t){b()
}},2000)
},f=function(s){return d.canPlayType&&d.canPlayType(s).replace(/no/,"")
},n=function(){try{if(d.currentTime==0){b()
}}catch(s){b()
}},o=function(){l.fadeOut()
},b=function(){i(h.VIDEO_CONTAINER_SELECTOR).parents("."+h.VIDEO_PRESTART_CLASS+":first").removeClass(h.VIDEO_PRESTART_CLASS);
k.fadeOut(j)
},c=function(){var s=e.data("height");
var t=e.data("loop")?"loop":"";
var v=e.data("videoUrl");
var u=['<video id="p1-video-background" style="height: '+s+'px" preload="auto" '+t+">",'<source src="'+v+'" type="video/mp4"/>',"</video>"].join("");
return i(u).appendTo(e).get(0)
},m=function(){d.addEventListener("ended",function(){b()
},false);
d.addEventListener("play",function(){o()
},false)
};
r.registerComponents({name:"nike-cq-video-bg",state:"ready",action:p});
return{init:p,video:d}
});
nike.cq.define("nike.cq.PES.p1Inspirations",["jquery","nike.cq.initializer"],function(d,j){var i=function(t){t.preventDefault();
var s=d(this),r=s.closest(".nike-cq-link-set-toggle-component").find("."+s.attr("data-link-toggle-set"));
if(r.filter(":hidden").length){s.closest("ul").find("a").removeClass("selected");
s.addClass("selected");
l(s);
n(r);
s.closest(".nike-cq-link-set-toggle-component").find(".nike-cq-link-set-toggle-set:visible").fadeOut(300,function(){c(r);
r.fadeIn(300)
})
}},n=function(r){r.closest(".nike-cq-link-set-toggle-sets").find("span.arrow").fadeOut(300)
},f=function(s,t){var r=d("body").width(),u=s.attr("data-set-size");
if(r<=960&&u>4){s.closest(".nike-cq-link-set-toggle-sets").find(t).show();
s.css("margin-left",0)
}else{s.css("margin","0 auto")
}},q=function(r){f(r,"span.arrow")
},c=function(r){f(r,"span.arrow.right")
},k=function(r){r.closest(".nike-cq-link-set-toggle-sets").find("span.arrow.right").hide()
},b=function(r){f(r,"span.arrow.left")
},e=function(r){r.closest(".nike-cq-link-set-toggle-sets").find("span.arrow.left").hide()
},a=function(x){x.preventDefault();
var A=d(this),t=A.siblings(".nike-cq-link-set-toggle-set-mask:first").find(".nike-cq-link-set-toggle-set:visible");
if(t.not(":animated").length==1){var z=A.hasClass("right"),r=t.find("li:first").width(),u=t.attr("data-set-size"),s=parseInt(t.css("margin-left")),y=20,w=r+y;
var v=-(w*(u-4));
if(z){if(s!=v){t.animate({"margin-left":(s-w)+"px"});
b(t);
if(s==(v+w)){k(t)
}}}else{if(s!=0){t.animate({"margin-left":(s+w)+"px"});
c(t);
if(s==(v+w)){e(t)
}}}}},h=function(){d(".nike-cq-p1-layout-inspiration-section .nike-cq-link-set-toggle-set:visible").each(function(){c(d(this))
})
},m=function(){l(d(this))
},p=function(){var r=d(this).find("a.selected").eq(0);
l(r)
},g=function(){var r=d(".nike-cq-link-set-toggle-selector").each(function(){var s=d(this),u=parseInt(s.css("left"));
if(u<4){var t=s.siblings("ul").find("li:first-child a").eq(0);
l(t)
}})
},l=function(s){var r=s.position().left+(s.width()/2)+3;
s.closest(".nike-cq-link-set-toggle-nav").find(".nike-cq-link-set-toggle-selector:first").css("left",r)
},o=function(r){g();
h();
r.find(".nike-cq-link-set-toggle-select").delegate("a","click",i);
r.find(".nike-cq-link-set-toggle-sets").delegate("span.arrow","click",a);
d(".nike-cq-tout-toggle-container").bind("p1-toggle",g);
d(window).bind("orientationchange",h)
};
j.registerComponents({name:"nike-cq-p1-layout-inspiration",state:"ready",action:o});
return{init:o}
});
nike.cq.define("nike.cq.PES.FST",["jquery","nike.cq.UI.VideoPlayingElement","nike.cq.initializer","nike.cq.PES.videoBg"],function(f,h,r,c){var n=30;
var g=0;
var j=50;
var e;
var b;
var i=[];
var l=false,k=function(){f(window).scroll(a);
a();
l=true;
var s=f(".nike-cq-fst .nike-cq-labels"),u=function u(){s.find(".nike-cq-labels-label").each(function(A){var C=f(this),x=C.attr("data-label-justification")||"left";
if(x!=="left"){var D=0,B=C.width(),y=f(window).width(),w=Math.round(C.css("left").replace("px",""));
if(x==="center"){var z=Math.round(B/2);
D=w-z
}else{if(x==="right"){D=w-B
}}var v=(D/y)*100;
C.css("left",v+"%")
}})
},t=(function t(){var v=true,y,z=1600,w=1,x=0.7;
return function(){clearTimeout(y);
y=setTimeout(function(){var B=f(this).width(),C=B/z,A;
switch(true){case (C>w):A=true;
C=w;
break;
case (C<x):A=true;
C=x;
break;
default:v=true
}if(v){if(A){v=false
}if(C<=0.75){s.addClass("label-scale-75")
}else{if(C<=0.9){s.removeClass("label-scale-75").addClass("label-scale-90")
}else{s.removeClass("label-scale-75 label-scale-90")
}}s.css({fontSize:(C*100)+"%"})
}},16)
}
}());
if(s.length){t();
if(!Modernizr.csstransforms){u()
}f(window).resize(t)
}},d=function(s){s.find(".nike-cq-fst-with-video").each(function(){var t=new c({parentContainer:".nike-cq-fst",startingImage:".nike-cq-fst-video-bg-start-image",fallbackImage:".nike-cq-fst-background-image",videoContainer:".nike-cq-fst-video-bg-component"},f(this));
i.push(t);
s.find(t.videoElement).bind("canplay",function(){a()
}).bind("videoFinished",function(){p()
}).bind("videoReset",function(){p()
}).bind("videoRewind",function(){p()
}).bind("playVideoUserAction",function(u,v){o(u.target)
}).bind("pauseVideoUserAction",function(u,v){p()
})
});
h(s.find(".nike-cq-fst-component")[0]);
if(!l){k()
}m(s);
f(window).resize(function(){m(s)
})
};
function m(s){s.find(".nike-cq-container .nike-cq-block-component").each(function(u){var v=f(this);
v.css("height","auto");
var t=v.height();
if(t%2!=0){v.css("height",t+(2-t%2)+"px")
}})
}function a(){q();
e=setTimeout(p,j)
}function q(){if(e){clearTimeout(e)
}e=undefined
}function o(u){for(var s=0;
s<i.length;
s++){var t=i[s];
if(f(u).is(f(t.getVideoElement()))){b=s;
t.play()
}else{!t.paused()&&t.pause()
}}}function p(){var t=[];
var x;
for(var u=0;
u<i.length;
u++){var v=i[u];
var w=v.calculateVisibility();
t.push(w);
if(w&&w>=n&&(x===undefined||w>t[x])){x=u
}else{if(w<=g&&u===b){v.pause();
b=undefined
}}}if(x!==undefined&&(x!==b||i[b].paused())){b!==undefined&&i[b].pause();
var s=i[x];
if(s.controls()){b=undefined
}else{s.play();
b=x
}}}r.registerComponents({name:"nike-cq-full-screen",state:"ready",action:d,noEditMode:true});
return{evaluateAppropriateness:p,startEvaluationDelay:a}
});
nike.cq.define("nike.cq.PES.FST.Blocks",["jquery","nike.cq.initializer"],function(d,c){var a=function(g){if(Modernizr.csstransforms){return
}var i=g.find(".nike-cq-block-component-wrap"),m=parseInt(i.attr("data-row-position"),10),f=parseInt(i.attr("data-column-position"),10),l=[1],j=[1,2,3],k=(d.inArray(m,l)>=0),h=(d.inArray(f,j)>=0),e=function(){var r=d(this).children().eq(0),s=parseInt(d(this).attr("data-row-position"),10),o=parseInt(d(this).attr("data-column-position"),10);
if(r.width()===0){return setTimeout(function(){e.call(i[0])
},50)
}var p,n,q={};
if((d.inArray(s,l)>=0)){n=r.outerHeight();
q.marginTop=-(n/2)
}if((d.inArray(o,j)>=0)){p=r.outerWidth();
q.whiteSpace="normal";
q.marginLeft=-p/2
}r.css(q)
};
if(g.is(":visible")){b(g,e);
e.call(i[0])
}if(h||k){d(window).resize(function(){e.call(i[0])
})
}},b=function(f,g){var e;
e=f.parents(".nike-cq-carousel-eta");
if(e.length&&!e.data("blockInitialized")){e.data("blockInitialized",true).on("etaSlideChangeComplete",function(h){var i=d(this).find(".nike-cq-carousel-slide").children().eq(0);
i.find(".nike-cq-block-component-wrap").each(function(){g.call(this)
})
})
}};
c.registerComponents({name:"nike-cq-full-screen-block",state:"load",action:a});
return{init:a}
});
nike.cq.define("nike.cq.PES.P2VideoTout",["jquery","nike.cq.UI.VideoPlayingElement"],function(c,b){var a=function(e){new b(e)
},d=function(){if(c(".nike-cq-p2-video-tout-300-container").length){a(".nike-cq-p2-video-tout-300-container")
}};
c(function(){d()
});
return{init:d}
});
nike.cq.define("nike.cq.PES.contentSlide",["jquery","nike.cq.UI.Component.VideoPlayer","nike.cq.UI.Overlay","nike.cq.Utils","nike.cq.PES.Gestures"],function(d,h,a,c,g){var b=function(){d(".nike-cq-content-slide-540-container .video-thumbnail").click(function(){var k=d(this);
var n=912;
var i=513;
var m="nike-cq-overlay-video-player-large";
var j;
if(d(window).width()<996){n=684;
i=385;
m="nike-cq-overlay-video-player-small"
}var l=new a({cssClass:m,onOpen:function(){d(k).clone().appendTo(".nike-cq-overlay-content-element").attr("id","nike-cq-overlay-video-player");
var o=d("#nike-cq-overlay-video-player");
o.attr("data-width",n);
o.attr("data-height",i);
j=new h(o)
},onBeforeClose:function(){j.remove();
this.close()
}})
})
};
var f=function(){var j=function(){d(".nike-cq-content-slide-540-section-1 .nike-cq-touts-background-image-resource").each(function(){var n=d(this),l=n.height(),m=Math.round(l*0.8);
n.css({width:"430px",height:m});
n.parent().width("430px").height(m)
})
};
var k=function(){d(".nike-cq-content-slide-540-section-1 .nike-cq-touts-background-image-resource").each(function(){var l=d(this);
l.css({width:"auto",height:"auto"})
})
};
if(window.matchMedia){var i=window.matchMedia("(max-width: 960px)");
if(i.matches){j()
}i.addListener(function(l){if(l.matches){j()
}else{k()
}})
}else{if(d(window).width()<960){j()
}c.debounceResize(function(){var l=d(window).width();
if(l<960){j()
}else{k()
}})
}};
var e=function(){b();
f()
};
d(function(){if(d(".nike-cq-content-slide-540-container").length){e();
g.register({$element:d(".nike-cq-optional-content_slideshow_v2-content-slideshow-content-resource"),nextButton:".nike-cq-pes-carousel-component .right",previousButton:".nike-cq-pes-carousel-component .left"})
}});
return{init:e}
});
nike.cq.define("nike.cq.PES.PortraitMerchZone",["jquery","nike.cq.PES.Gestures"],function(b,c){var a=function(){b(".nike-cq-portrait-merch-zone-carousel-container .nike-cq-cta-component a").each(function(){b(this).closest(".slide").find("img").first().wrap(b(this).clone().empty())
})
};
b(function(){if(b(".nike-cq-portrait-merch-zone-carousel-container").length){a();
c.register({$element:b(".nike-cq-portrait-merch-zone-v2"),nextButton:".nike-cq-portrait-merch-zone-carousel-container .nike-cq-pes-carousel-component .arrow.right",previousButton:".nike-cq-portrait-merch-zone-carousel-container .nike-cq-pes-carousel-component .arrow.left"})
}});
return{init:function(){a()
}}
});
nike.cq.define("nike.cq.PES.toutToggle",["jquery","nike.cq.PES.Hotspots","nike.cq.UI.HashState","nike.cq.initializer"],function(c,a,i,e){var d=function(p){var l=c(this),r=l.closest(".nike-cq-tout-toggle-container.nike-cq-toggle"),q=r.find("toggle-label-container"),j=r.find(".nike-cq-pes-reference-component"),s="."+l.attr("data-tout-id"),n=r.find(s);
if(n.filter(":hidden").length){var t=r.find(".nike-cq-pes-reference-component:visible").first(),k=t.height(),o=r.find(".nike-cq-tout-toggle-cover"),m=r.find(".nike-cq-toggle-component");
m.find("a").removeClass("selected");
l.addClass("selected");
f(l,m);
a.hideHotspots(t.find(".nike-cq-p1-layout-component"));
a.hideHotspots(n.find(".nike-cq-p1-layout-component"));
o.height(k).fadeIn(600,function(){j.hide();
n.show();
c(this).height(n.height());
r.trigger("p1-toggle")
}).fadeOut(600,function(){a.resetHotspots(n.find(".nike-cq-p1-layout-component"))
});
if(l.parent().attr("data-id")){i.updateHash(l.parent().attr("data-id"))
}}p.preventDefault();
return false
},g=function(){var k=c(this),j=k.closest(".nike-cq-toggle-component");
f(k,j)
},h=function(){var l=c(this),j=l.closest(".nike-cq-toggle-component"),k=j.find("a.selected");
f(k,j)
},f=function(j,k){k.find("a").removeClass("hovering");
j.addClass("hovering");
k.find(".toggle-label-selection").css({width:(j.width()-2),left:j.position().left})
};
var b=function(m){c(".nike-cq-toggle-wrapper ul").contents().filter(function(){return this.nodeType===3
}).remove();
var q=m.find(".nike-cq-pes-reference-component"),k=q.length,o=m.find(".nike-cq-toggle-component"),j=0,l=q.find(".nike-cq-background-component"),n=o.find("li:first-child a"),p=o.find(".toggle-label-container");
q.each(function(){a.hideHotspots(c(this).find(".nike-cq-p1-layout-component"))
});
if(k==2){o.find("a").each(function(r,s){var t=c(s).width();
if(t>j){j=t
}}).animate({width:j}).addClass("center-text")
}else{j=n.width()
}n.addClass("selected hovering");
o.find(".toggle-label-selection").css({width:(j-2),left:(n.position().left>=0)?n.position().left:0});
o.delegate("a","click",d).delegate("nav","mouseleave",h);
m.prepend(l.first().clone().addClass("nike-cq-tout-toggle-cover").hide());
p.each(function(r){var u=c(this),t=u.attr("data-id"),s=u.closest("nav");
i.registerHashCallback(t,this,function(){var v=c("[data-id] a")[r];
if(!c(v).hasClass("selected")){v.click();
setTimeout(function(){s.trigger("mouseleave")
},300)
}})
})
};
e.registerComponents({name:"nike-cq-tout-toggle",state:"load",action:b});
return{init:b}
});
nike.cq.define("nike.cq.PES.MerchMenu",["jquery"],function(a){var b=function(){a("div.nike-cq-merch-menu-hover").mouseleave(function(){a(this).removeClass("active")
});
var c=function(){a(this).parents("div.nike-cq-merch-menu-hover").addClass("active")
};
if(a("html.touch").length>0){a("div.nike-cq-merch-menu-expand span").click(c)
}else{a("div.nike-cq-merch-menu-expand span").mouseenter(c)
}};
a(function(){if(a("div.nike-cq-merch-menu-component").length){b()
}});
return{init:b}
});
nike.cq.define("nike.cq.PES.ContentGrid",["jquery","nike.cq.UI.VideoPlayingElement","nike.cq.UI.ModalCarousel","nike.cq.PES.Gestures"],function(h,i,D,d){var c=false,a=function(F){var G=function(I){return(I.offset().top)+(I.height())
};
var H=F.find(".nike-cq-grid-cell"),E=H.first();
H.each(function(){if(G(h(this))>G(E)){E=h(this)
}});
if(H.length>0){F.height(G(E)-F.offset().top)
}},j=function(){h(".nike-cq-content-grid-component").each(function(){a(h(this));
if(h("body").data("cmsMode")==="EDIT"&&h(".nike-cq-grid-cell").length>0){h(this).css({background:"none",border:"none"})
}})
},u=function(){if(!c){var E,F=function(){j()
};
h(window).resize(function(){if(E){clearTimeout(E)
}E=setTimeout(F,100)
});
c=true
}},p=function(E){i(E)
};
var C="nike-cq-content-grid-overlay-image-wide",l="nike-cq-content-grid-overlay-image-tall";
var n=null,r=null,z=null,A={addListener:function(E){},matches:false};
if(window.matchMedia){A=window.matchMedia("(max-width: 1009px)")
}function b(){return n.index(r[0])
}function f(){if(z){return
}var E={backgroundClass:"nike-cq-content-grid-modal-background",foregroundClass:"nike-cq-content-grid-modal-foreground",dialogClass:"nike-cq-content-grid-modal-dialog",arrowClass:"nike-cq-content-grid-arrow",closeClass:"nike-cq-content-grid-modal-close",clickBackgroundToClose:false};
z=D(E);
z.showModal(false);
z.getDialog().addClass(C);
z.getCloseButton().addClass(C)
}function e(P){var L=h(P).find(".nike-cq-content-grid-image-overlay"),K=L.data(),G=L.find("ul.linkList").clone(),N=L.find(".nike-cq-subtitle").clone();
r=h(P);
if(!K){return
}var Q;
if(N.length>0){Q=N
}else{var I=L.find("h2"),H=L.find("h3");
Q=h('<h2 class="grid-overlay-titles nsg-font-family--marketing"/>');
Q.append(h('<span class="grid-overlay-title1" />').html(I.html()));
Q.append(h('<span class="grid-overlay-title2" />').html(H.html()))
}var O=z.getDialog(),E=z.getCloseButton();
var J=h("<img />",{src:K.src,"data-nike-campaign":K.nikeCampaign,"data-nike-category":K.nikeCategory});
O.empty();
var R=h('<div class="nike-cq-content-grid-overlay-image" />');
R.append(J);
var M=h('<div class="nike-cq-content-grid-overlay-right" />');
M.append(Q);
M.append(G);
var F=h('<div class="nike-cq-content-grid-overlay-dialog-inner" />');
F.append(R);
F.append(M);
O.append(F);
z.showModal(true);
h("<img/>").load(function(){if(this.width>=this.height){O.removeClass(l).addClass(C);
E.removeClass(l).addClass(C)
}else{O.removeClass(C).addClass(l);
E.removeClass(C).addClass(l)
}}).attr("src",J.attr("src"));
if(A.matches){t()
}}function q(){z.getLeftArrow().click(function(G){G.preventDefault();
var E=b(),F=E-1;
F=F<0?n.length-1:F;
e(n[F])
});
z.getRightArrow().click(function(F){F.preventDefault();
var E=b(),G=E+1;
G=G>=n.length?0:G;
e(n[G])
})
}function o(E){n=h(E).parents(".nike-cq-content-grid-component").find(".nike-cq-content-grid-image-cell").has(".nike-cq-content-grid-image-overlay")
}function y(){var H=z.getDialog();
var K=H.find(".nike-cq-content-grid-overlay-right");
var J=K.find("li");
var I=H.hasClass(l)?430:230;
var G=J.length-2;
var E=K.height();
var F=[];
while(G>=0&&E>I){E-=h(J[G]).height();
F.push(J[G--])
}F=h(F);
F.slideUp();
F.queue(function(){var L=J.filter(":visible");
if(L.length==1){L.css("border-top","1px solid #ccc")
}h(this).dequeue()
})
}function x(){var G=z.getDialog();
var J=G.find(".nike-cq-content-grid-overlay-right");
var I=J.find("li");
if(I.length==1){I.show();
return
}var H=G.hasClass(l)?430:230;
var E=[];
E.push(I[I.length-1]);
h(I[I.length-1]).show();
if(J.height()<H){var F=0;
while(F<=I.length-1){h(I[F]).show();
if(J.height()>H){break
}E.push(I[F]);
F++
}}w();
E=h(E);
if(E.length==1){E.css("border-top","1px solid #ccc")
}E.slideDown()
}function B(){var E=z.getDialog();
E.find("li").attr("style","")
}function w(){var E=z.getDialog();
E.find("li").hide()
}function t(){w();
setTimeout(x,700)
}function g(E){if(E.matches){t()
}else{B()
}}function m(){if(window.matchMedia){A.addListener(g)
}}function k(E){h(E).find(".visible-overlay").removeClass("visible-overlay")
}function s(){if(h("body").data("cmsMode")!=="EDIT"){f();
q();
m();
d.register({$element:h(".modal-container"),nextButton:".nike-cq-content-grid-arrow.nike-cq-modal-right",previousButton:".nike-cq-content-grid-arrow.nike-cq-modal-left"});
h(".nike-cq-content-grid-component").each(function(){var E=h(this);
if(h("html.touch").length==0){E.find(".nike-cq-content-grid-image-cell").has(".nike-cq-content-grid-image-overlay").bind("click",function(F){F.preventDefault();
o(this);
e(this)
})
}else{E.find(".nike-cq-content-grid-image-hover-overlay").bind("click",function(H){var F=h(this);
if(F.hasClass("visible-overlay")){var G=F.parents(".nike-cq-content-grid-image-cell");
if(G.find(".nike-cq-content-grid-image-overlay").length>0){H.preventDefault();
o(G);
e(G)
}}else{H.preventDefault();
k(E);
F.addClass("visible-overlay")
}})
}})
}}var v=function(){j();
u();
s();
var E=".nike-cq-content-grid-video-cell";
if(h(E).length>0){p(E)
}};
h(v);
return{init:v}
});
nike.cq.define("nike.cq.PES.Notification",["jquery"],function(a){var b=function(){a(".nike-cq-notification-banner-container").each(function(){var c=a(this);
if(c.parent(".nike-cq-pes-reference")==0){c.css("width","768px")
}})
};
a(function(){b()
});
return{init:b}
});
nike.cq.define("nike.cq.PES.LooksGrid",["jquery","nike.cq.initializer"],function(b,a){var c=function(f){var e=f.find(".nike-cq-looks-grid-component"),d=Modernizr.touch,g=f.find(".nike-cq-content-grid-image");
if(!b(".ie8").length){b(window).on("load resize",function(){e.each(function(){var h=1600;
var i=b(this).find(".nike-cq-looks-grid-cell");
i.height("auto");
i.each(function(){var j=b(this).height();
if(j<h&&j!==0){h=j
}});
i.height(h)
})
})
}if(d){g.on("click",function(){var h=b(this).find(".nike-cq-looks-grid-image-overlay");
if(!h.hasClass("visible")){f.find(".visible").removeClass("visible");
h.addClass("visible")
}})
}};
a.registerComponents({name:"nike-cq-looks-grid",state:"ready",action:c,noEditMode:true});
return{init:c}
});
nike.cq.define("nike.cq.carousels.constants",[],function(){var a={TOTAL_SLIDES:"totalSlides",AUTO_ADVANCE:"autoAdvance",ADVANCE_BY:"advanceBy",VIEWPORT_COUNT:"viewportCount",PLAYBACK_CONTROLS:"playbackControls",PAGINATION_CONTROLS:"paginationControls",CONTINUOUS_LOOP:"continuousLoop",LOOP_BACK_AND_FORTH:"loopBackAndForth",LOOP_TO_BEGINNING:"loopToBeginning",WCM_MODE:"wcmmode",ADVANCE_BY_CHANGED:"advanceByChanged",VIEWPORT_COUNT_CHANGED:"viewportCountChanged",WCM_MODE_EDIT:"EDIT",WCM_MODE_PREVIEW:"PREVIEW",WCM_MODE_DESIGN:"DESIGN",WCM_MODE_DISABLED:"DISABLED",BUTTON_PREVIOUS:"buttonPrevious",BUTTON_NEXT:"buttonNext",BUTTON_PAGE:"buttonPage",HIT_AREA:"hitArea",SLIDE_PAGE_INDEX_ADVANCE:"slidePageIndexAdvance",SLIDE_PAGE_INDEX_CHANGE:"slidePageIndexChange",USER_DRIVEN_SLIDE_CHANGE:"userDrivenSlideChange",BUTTON_PREVIOUS_CLICK:"buttonPreviousClick",BUTTON_PREVIOUS_MOUSE_OVER:"buttonPreviousMouseOver",BUTTON_PREVIOUS_MOUSE_OUT:"buttonPreviousMouseOut",BUTTON_NEXT_CLICK:"buttonNextClick",BUTTON_NEXT_MOUSE_OVER:"buttonNextMouseOver",BUTTON_NEXT_MOUSE_OUT:"buttonNextMouseOut",BUTTON_PAGE_CLICK:"buttonPageClick",CAROUSEL_READY:"carouselReady",CAROUSEL_AUTO_ADVANCE:"carouselAutoAdvance",SLIDE_CLICKED:"slideClicked",INITIALIZE_VIDEO:"initializeVideo",VIDEO_FINISHED:"videoFinished",CLICK:"Click",MOUSE_OVER:"MouseOver",MOUSE_OUT:"MouseOut",SWIPE_LEFT:"SwipeLeft",SWIPE_RIGHT:"SwipeRight",DRAG:"Drag"};
var b=nike.cq.ns("nike.cq.carousels");
b.constants=a;
return a
});
nike.cq.define("nike.cq.carousels",["jquery","nike.cq.initializer","nike.cq.carousels.styles"],function(f,e,d){var h={},a=function(i){var j=f.extend(true,{},d[i.style],i);
j.initialize();
return j
},b=function(i){var j=a(i);
h[j.id]=j;
return j
},c=function(i){return h[i]
},g=function(j){var i=j.data();
b({$el:j,style:i.carouselStyle,wcmmode:i.wcmmode,settings:i})
};
e.registerComponents({name:"nike-cq-carousel",state:"ready",action:g});
return{addCarousel:b,getCarouselByID:c,init:g}
});
nike.cq.define("nike.cq.carousels.button",["jquery","nike.cq.carousels.constants"],function(c,a){function b(d){var g,f;
try{g=navigator.userAgent,f=(g.match(/iPad/i))?"touchstart":"click"
}catch(h){f="click"
}d.$el.bind(f,function(i){i.stopPropagation();
i.preventDefault();
d.$el.trigger(String(d.style+a.CLICK),d)
}).bind("mouseover",function(i){d.$el.addClass("over");
d.$el.trigger(String(d.style+a.MOUSE_OVER),d)
}).bind("mouseout",function(i){d.$el.removeClass("over");
d.$el.trigger(String(d.style+a.MOUSE_OUT),d)
})
}return{initialize:function(){b(this)
}}
});
nike.cq.define("nike.cq.carousels.controls",["nike.cq.carousels.constants","nike.cq.carousels.controls.pagination","nike.cq.carousels.controls.playback"],function(d,a,c){var b={};
b[d.PAGINATION_CONTROLS]=a;
b[d.PLAYBACK_CONTROLS]=c;
return b
});
nike.cq.define("nike.cq.carousels.controlBase",["jquery","nike.cq.carousels.button"],function(c,a){function b(e){var d=c.extend(true,{},a,e);
d.initialize();
return d
}return{buttons:[],loopContinuously:false,initialize:function(){this.$el=c("<div>",{"class":String("nike-cq-carousel-control nike-cq-carousel-control-"+this.style)});
this.$buttonCollection=c("<div>",{"class":"nike-cq-carousel-control-button-collection"});
this.setButtons();
this.$el.append(this.$buttonCollection)
},addButton:function(e){var d=b(e);
this.$buttonCollection.append(d.$el);
this.buttons.push(d);
return d
}}
});
nike.cq.define("nike.cq.carousels.controls.pagination",["jquery","nike.cq.carousels.constants","nike.cq.carousels.controlBase"],function(c,b,a){return c.extend(true,{},a,{_buttonIndex:null,setButtons:function(){for(var e=0;
e<this.totalSlidePages;
e++){var d=b.BUTTON_PAGE;
this.addButton({index:e,style:d,$el:c("<div>",{"class":String("nike-cq-carousel-control-button nike-cq-carousel-control-"+d)})})
}},buttonIndex:function(d){if(d!=null&&d!=undefined){this._buttonIndex=Math.ceil(d);
this.render(this._buttonIndex)
}return this._buttonIndex
},render:function(d){for(var f=0;
f<this.buttons.length;
f++){var e=this.buttons[f];
if(f===d){e.$el.addClass("active")
}else{e.$el.removeClass("active")
}}}})
});
nike.cq.define("nike.cq.carousels.controls.playback",["jquery","nike.cq.carousels.constants","nike.cq.carousels.controlBase"],function(c,b,a){return c.extend(true,{},a,{_buttonIndex:null,buttonPrevious:{},buttonNext:{},setButtons:function(){this.buttonPrevious=this.addButton({style:b.BUTTON_PREVIOUS,$el:c("<div>",{"class":String("nike-cq-carousel-control-button nike-cq-carousel-control-"+b.BUTTON_PREVIOUS)})});
this.buttonNext=this.addButton({style:b.BUTTON_NEXT,$el:c("<div>",{"class":String("nike-cq-carousel-control-button nike-cq-carousel-control-"+b.BUTTON_NEXT)})});
this.buttonIndex(0)
},buttonIndex:function(d){if(d!=null&&d!=undefined){this._buttonIndex=Math.ceil(d);
this.render(this._buttonIndex)
}return this._buttonIndex
},render:function(d){if(this.continuousLoop===false){this.buttonPrevious.$el.removeClass("nike-cq-carousel-button-active");
this.buttonNext.$el.removeClass("nike-cq-carousel-button-active");
if(d===0){this.buttonPrevious.$el.hide();
this.buttonNext.$el.show().addClass("nike-cq-carousel-button-active")
}else{if(d===(this.totalSlidePages-1)){this.buttonPrevious.$el.show().addClass("nike-cq-carousel-button-active");
this.buttonNext.$el.hide()
}else{this.buttonPrevious.$el.show().addClass("nike-cq-carousel-button-active");
this.buttonNext.$el.show().addClass("nike-cq-carousel-button-active")
}}}}})
});
nike.cq.define("nike.cq.carousels.slides",["jquery","nike.cq.carousels.constants"],function(b,a){return{_slides:[],_slidePageIndex:null,_margin:{top:0,right:0,bottom:0,left:0},_outerWidth:null,_outerHeight:null,_width:null,_viewportWidth:null,_viewportHeight:null,originalSlideWidth:300,originalSlideHeight:600,$el:null,$slideCollection:null,$slideRef:null,$slides:function(){return this.$el.find(".nike-cq-carousel-slide").not(".carousel-remove")
},$allSlides:function(){return this.$el.find(".nike-cq-carousel-slide")
},slidesSorted:true,initialize:function(){this.$slideCollection=this.$el.find(".nike-cq-carousel-slide-collection");
this.$slideRef=this.$slides().eq(0);
this.margin({top:Number(this.$slideRef.css("margin-top").replace("px","")),right:Number(this.$slideRef.css("margin-right").replace("px","")),bottom:Number(this.$slideRef.css("margin-bottom").replace("px","")),left:Number(this.$slideRef.css("margin-left").replace("px",""))});
this.setSlides();
this.setDimensions();
if(Modernizr.touch){this.flagNativeDeviceImageAcceleration()
}},setSlides:function(){var c=this;
this.$slides().each(function(d,e){b(e).bind("click",function(){c.$el.trigger(a.SLIDE_CLICKED)
})
})
},slidePageIndex:function(c){if(c){this._slidePageIndex=c
}return this._slidePageIndex
},setSlideCollectionWidth:function(){this._width=this.outerWidth()*this.$allSlides().length;
this.$slideCollection.width(this._width);
return this._width
},outerWidth:function(){this._outerWidth=this.$slides().eq(0).outerWidth()+this.margin().horizontal;
return this._outerWidth
},outerHeight:function(){this._outerHeight=this.$slides().eq(0).outerHeight()+this.margin().vertical;
return this._outerHeight
},margin:function(c){if(c){this._margin=c;
this._margin.horizontal=Number((this._margin.right+this._margin.left));
this._margin.vertical=Number((this._margin.top+this._margin.bottom))
}return this._margin
},sortSlides:function(){var d=this,c=this.$slides().toArray().sort(e);
b.each(c,function(f,g){d.$slideCollection.append(g)
});
function e(g,f){return g.getAttribute("data-slide-index")-f.getAttribute("data-slide-index")
}},equalizeSlideHeight:function(c){this.$slides().outerHeight(c)
},setDimensions:function(){this.viewportWidth(this.$el.width());
this.viewportHeight(this.$el.height())
},viewportWidth:function(c){if(c){this._viewportWidth=c
}return this._viewportWidth
},viewportHeight:function(c){if(c){this._viewportHeight=c
}return this._viewportHeight
},flagNativeDeviceImageAcceleration:function(){this.$slideCollection.attr("style","-webkit-backface-visibility: hidden; -moz-backface-visibility: hidden; -ms-backface-visibility: hidden; backface-visibility: hidden;")
}}
});
nike.cq.define("nike.cq.carousels.carouselBase",["jquery","nike.cq.carousels.constants","nike.cq.carousels.slides","nike.cq.carousels.controls"],function(g,d,a,b){function f(i){var h=g.extend(true,{},a,i);
h.initialize();
return h
}function c(h,i){i=i||{};
i.style=h;
var j=g.extend(true,{},b[h],i);
j.initialize();
return j
}function e(h){h.$el.bind(d.CAROUSEL_READY,function(){h.carouselReady()
}).bind(d.BUTTON_NEXT_CLICK,function(j,i){if(h.stopOnFirstInteraction){h.autoAdvance(false)
}h.advanceSlidePageIndex(1);
h.$el.trigger(d.USER_DRIVEN_SLIDE_CHANGE)
}).bind(d.BUTTON_PREVIOUS_CLICK,function(j,i){if(h.stopOnFirstInteraction){h.autoAdvance(false)
}h.advanceSlidePageIndex(-1);
h.$el.trigger(d.USER_DRIVEN_SLIDE_CHANGE)
}).bind(d.BUTTON_PAGE_CLICK,function(k,j){if(h.stopOnFirstInteraction){h.autoAdvance(false)
}var i=(j.index-h.slidePageIndex());
h.advanceSlidePageIndex(i);
h.$el.trigger(d.USER_DRIVEN_SLIDE_CHANGE)
}).bind(d.SLIDE_CLICKED,function(j,i){if(h.stopOnFirstInteraction){h.autoAdvance(false)
}}).bind(d.SLIDE_PAGE_INDEX_ADVANCE,function(j,i){}).bind(d.SLIDE_PAGE_INDEX_CHANGE,function(k,j){try{h.paginationControls().buttonIndex(j)
}catch(i){}try{h.playbackControls().buttonIndex(j)
}catch(i){}try{h.slides.slidePageIndex(j)
}catch(i){}}).bind(d.INITIALIZE_VIDEO,function(l,k){var i=g(h.slides.$slides()[0]).find("video")[0];
var j=g(l.target).find("video")[0];
if(g(j).is(g(i))&&!k.controls){h.stopTimer()
}}).bind(d.VIDEO_FINISHED,function(j,i){if(g(h.slides.$slides()[0]).find("video").is(j.target)){if(h._autoAdvance===true){h.resetTimer()
}}else{}})
}return{_isAnimating:false,_continuousLoop:false,_advanceBy:1,_viewportCount:1,_playbackControls:null,_paginationControls:null,_wcmmode:null,_slidePageIndex:null,_slidePageOuterWidth:null,_slidePageOuterHeight:null,_totalSlides:null,_totalSlidePages:null,$el:null,$carouselComponentCollection:null,stopAfterFirstIteration:false,animationDuration:1000,slideDuration:null,queueCount:0,slidePageIndexHistory:[],defaults:{autoAdvance:true,stopOnFirstInteraction:true,loopBackAndForth:false,loopContinuously:false,direction:1,stickyDirection:false},dynamicProperties:[d.AUTO_ADVANCE,d.ADVANCE_BY,d.VIEWPORT_COUNT,d.CONTINUOUS_LOOP,d.PAGINATION_CONTROLS,d.PLAYBACK_CONTROLS],id:null,slides:{},timer:{},initialize:function(){this.id=this.$el.attr("data-carousel-id");
this.$carouselComponentCollection=this.$el.find(".nike-cq-carousel-component-collection");
var l=g.extend(this.defaults,this.settings);
if(this.wcmmode!==d.WCM_MODE_EDIT){var k;
for(k in l){if(g.inArray(k,this.dynamicProperties)===-1){try{this[k]=l[k]
}catch(h){}}}for(var j=0;
j<this.dynamicProperties.length;
++j){k=this.dynamicProperties[j];
if(k in l){try{this[k](this.settings[k])
}catch(h){}}}e(this);
this.slidePageIndex(0);
this.slides=f({$el:this.$el.find(".nike-cq-carousel-slides"),totalSlidePages:this.totalSlidePages(),continuousLoop:this.continuousLoop()});
this.$el.data("carousel",this);
this.$el.trigger(d.CAROUSEL_READY)
}},isAnimating:function(h){if(h!=null&&h!=undefined){this._isAnimating=h
}return this._isAnimating
},advanceSlidePageIndex:function(j){var h=this.slidePageIndex(),i=h+j;
this.slidePageIndex(i);
this.previousSlidePageIndex=h;
this.$el.trigger(d.SLIDE_PAGE_INDEX_ADVANCE,j);
this.autoAdvance()
},slidePageIndex:function(h){if(this._slidePageIndex!==undefined&&this._slidePageIndex!==null){this.slidePageIndexHistory.push(this._slidePageIndex)
}if(h!==this._slidePageIndex&&h!==undefined&&h!==null){if(h<=-1){this._slidePageIndex=this.totalSlidePages()
}else{if(h>-1&&h<=0){this._slidePageIndex=0
}else{if(h>0&&h<this.totalSlidePages()){this._slidePageIndex=h
}else{if(h>=this.totalSlidePages()&&h<(this.totalSlidePages()+1)){this._slidePageIndex=this.totalSlidePages();
if(this.stopAfterFirstIteration){this.autoAdvance(false)
}}else{if(h>=(this.totalSlidePages()+1)){this._slidePageIndex=0
}}}}}this.$el.trigger(d.SLIDE_PAGE_INDEX_CHANGE,this._slidePageIndex)
}return this._slidePageIndex
},continuousLoop:function(h){if(h){this._continuousLoop=h
}return this._continuousLoop
},startTimer:function(){var h=this;
this.timer=setTimeout(function(){if(h.slideContainsVideo()===true){return
}h.advanceSlidePageIndex(h.direction);
h.$el.trigger(d.CAROUSEL_AUTO_ADVANCE,h.direction);
h.resetTimer()
},this.slideDuration)
},stopTimer:function(){try{clearTimeout(this.timer)
}catch(h){}},resetTimer:function(){this.stopTimer();
this.startTimer()
},autoAdvance:function(h){if(this.slideDuration===null||this.slideDuration===undefined){this.slideDuration=this.settings.slideDuration
}if(h===true){this._autoAdvance=true
}else{if(h===false){this._autoAdvance=false;
this.stopTimer()
}}if(this._autoAdvance===true){this.resetTimer()
}else{this.stopTimer()
}},advanceBy:function(h){this._advanceBy=(!h)?this._advanceBy:h;
return this._advanceBy
},viewportCount:function(h){this._viewportCount=(!h)?this._viewportCount:h;
return this._viewportCount
},playbackControls:function(h){if(h!=null&&h!=undefined&&h===true){if(this.totalSlidePages()>0){if(this._playbackControls){this._playbackControls.$el.remove()
}this._playbackControls=c(d.PLAYBACK_CONTROLS,{totalSlidePages:Math.ceil(this.totalSlidePages()+1),continuousLoop:this.continuousLoop()});
this.$carouselComponentCollection.prepend(this._playbackControls.$el)
}}return this._playbackControls
},paginationControls:function(h){if(h!=null&&h!=undefined&&h===true){if(this.totalSlidePages()>0){if(this._paginationControls){this._paginationControls.$el.remove()
}this._paginationControls=c(d.PAGINATION_CONTROLS,{totalSlidePages:Math.ceil(this.totalSlidePages()+1),continuousLoop:this.continuousLoop()});
this.$carouselComponentCollection.append(this._paginationControls.$el)
}}return this._paginationControls
},slidePageOuterWidth:function(){this._slidePageOuterWidth=Number(this.advanceBy()*this.slides.outerWidth());
return this._slidePageOuterWidth
},slidePageOuterHeight:function(){this._slidePageOuterHeight=Number(this.advanceBy()*this.slides.outerHeight());
return this._slidePageOuterHeight
},totalSlidePages:function(){if((this.totalSlides>this.advanceBy())&&(this.totalSlides>this.viewportCount())){this._totalSlidePages=(this.totalSlides-this.viewportCount())/this.advanceBy()
}return this._totalSlidePages
},sliceBefore:function(h){var j,k=this.slides.$slides().length-this.advanceBy(),i=this.slides.$slides().length;
if(h!==undefined){k=i-h
}if(k!=i){j=this.slides.$slides().slice(k,i)
}else{j=this.slides.$slides().slice(k)
}return j
},sliceAfter:function(h){var j,k=0,i=this.advanceBy();
if(h!==undefined){i=h
}if(k!=i){j=this.slides.$slides().slice(k,i)
}else{j=this.slides.$slides().slice(k)
}return j
},slideContainsVideo:function(){return false
},carouselReady:function(){}}
});
nike.cq.define("nike.cq.carousels.styles.alpha",["jquery","nike.cq.carousels.carouselBase","nike.cq.PES.Gestures"],function(a,b,c){return a.extend(true,{},b,{carouselReady:function(){var d=this;
a(window).resize(function(f){d.windowResize()
});
this.$el.bind("buttonNextClick",function(g,f){d.animateBy(1)
}).bind("buttonPreviousClick",function(g,f){d.animateBy(-1)
}).bind("buttonPageClick",function(g,f){d.animateTo(f.index)
}).bind("carouselAutoAdvance",function(g,f){d.animateBy(f)
}).bind("slidePageIndexChange",function(g,f){d.slides.setSlideCollectionWidth()
});
c.register({$element:this.$el,triggerNextEvent:"buttonPreviousClick",triggerPreviousEvent:"buttonNextClick",nextButton:".nike-cq-carousel-control-buttonNext",previousButton:".nike-cq-carousel-control-buttonPrevious"})
},windowResize:function(f){var d=this.slidePageIndex();
this.slides.setSlideCollectionWidth();
this.jumpTo(d)
},jumpTo:function(f){var d=this,g,h,e;
g=this.slides.$el.find("[data-slide-index="+Number((f*this.advanceBy())+1)+"]").index();
h=-1*(g*this.slides.outerWidth());
if((h*-1)>=this.slides._width){h=0
}this.slides.$slideCollection.stop().css({"margin-left":h})
},animateTo:function(e){var d=Number((e*this.advanceBy())+1),f=this.previousSlidePageIndex+1,g=d-f;
if(g!==0){this.animateBy(g)
}},animateBy:function(h){var d=this,f;
if(this.continuousLoop()===true){this.queueCount=this.queueCount+1;
var g;
if(h<0){f=this.sliceBefore(Math.abs(h));
g=f.clone(true).insertBefore(this.slides.$slides().eq(0));
f.addClass("carousel-remove");
g.each(function(k,m){var j=((g.length-k)*d.slides.outerWidth()),i=(d.queueCount-1)*d.slidePageOuterWidth(),l=d.slides.margin().left;
a(m).css({position:"absolute",left:(-1*(j+i))})
});
var e=((-1*h)*(this.slidePageOuterWidth())*this.queueCount);
this.slides.$slideCollection.stop().animate({"margin-left":e},{duration:this.animationDuration,complete:function(){d.cleanup()
}})
}else{if(h>0){f=this.sliceAfter(Math.abs(h));
g=f.clone(true).insertAfter(d.slides.$allSlides().eq(d.slides.$allSlides().length-1));
f.addClass("carousel-remove");
var e=((-1*h)*(this.slidePageOuterWidth()*this.queueCount));
this.slides.$slideCollection.stop().animate({"margin-left":e},{duration:this.animationDuration,complete:function(){d.cleanup()
}})
}}}else{if(this.continuousLoop()===false){this.slides.$slideCollection.animate({"margin-left":(-1*this.slidePageIndex()*this.slidePageOuterWidth())},{queue:false,duration:this.animationDuration})
}}},cleanup:function(){this.queueCount=0;
this.slides.$slideCollection.css({"margin-left":0});
this.$el.find(".carousel-remove").remove();
this.slides.$slides().css({position:"",left:""});
this.slides.setSlideCollectionWidth()
}})
});
nike.cq.define("nike.cq.carousels.styles.beta",["jquery","nike.cq.carousels.carouselBase","nike.cq.PES.Gestures"],function(a,b,c){return a.extend(true,{},b,{carouselReady:function(){var d=this;
a(window).resize(function(f){d.windowResize(f)
});
this.$el.bind("buttonNextClick",function(g,f){d.animateBy(1)
}).bind("buttonPreviousClick",function(g,f){d.animateBy(-1)
}).bind("buttonPageClick",function(g,f){d.animateTo(f.index)
}).bind("carouselAutoAdvance",function(g,f){d.animateBy(f)
}).bind("slidePageIndexChange",function(g,f){d.slides.setSlideCollectionWidth()
});
c.register({$element:this.$el,triggerNextEvent:"buttonPreviousClick",triggerPreviousEvent:"buttonNextClick",nextButton:".nike-cq-carousel-control-buttonNext",previousButton:".nike-cq-carousel-control-buttonPrevious"});
this.windowResize();
this.addSlideImageCTAs()
},windowResize:function(g){var f=3,d=a(window).width();
if(d>=1291){f=4
}this.viewportCount(f);
this.totalSlidePages();
if(this.paginationControls()){this.paginationControls(true).buttonIndex(this.slidePageIndex())
}if(this.playbackControls()){this.playbackControls(true)
}this.scaleSlides(768,960,d)
},scaleSlides:function(f,d,l){var j,i,h,g;
if(l>=f&&l<=d){j=l/d;
i=Math.floor(this.slides.originalSlideWidth*j),h=Math.floor(this.slides.originalSlideHeight*j),g=Math.floor((i+this.slides.margin().horizontal)*this.viewportCount())*j
}else{if(l<f){j=0.8;
i=Math.floor(this.slides.originalSlideWidth*j),h=Math.floor(this.slides.originalSlideHeight*j),g=Math.floor((i+this.slides.margin().horizontal)*this.viewportCount())*j
}else{if(l>=d){j=1;
i=Math.floor(this.slides.originalSlideWidth*j),h=Math.floor(this.slides.originalSlideHeight*j),g=Math.floor((i+this.slides.margin().horizontal)*this.viewportCount())*j
}}}this.scaleFactor=j;
this.slides.$slides().css({width:i,height:h,"margin-left":Math.ceil(this.slides.margin().left*j),"margin-right":Math.ceil(this.slides.margin().right*j)});
this.slides.$el.height(h);
try{this.playbackControls().$el.height(h)
}catch(k){}this.animateTo(this.slidePageIndex())
},addSlideImageCTAs:function(){this.slides.$slides().each(function(f,g){var d=a(g),e=d.find(".nike-cq-image").eq(0),h=d.find(".nike-cq-cta a").eq(0);
e.wrap(h.clone().attr("class","slide-anchor").empty())
})
},animateTo:function(f){var d=this,g,h,e;
g=this.slides.$el.find("[data-slide-index="+Number((f*this.advanceBy())+1)+"]").index();
h=-1*(g*this.slides.outerWidth());
e=-1*((f*this.advanceBy())*this.slides.outerWidth());
this.slides.$slideCollection.stop().animate({"margin-left":h},this.animationDuration,function(){d.slides.sortSlides();
d.slides.$slideCollection.css({"margin-left":e})
});
d.slides.setSlideCollectionWidth()
},animateBy:function(d){this.animateTo(Math.ceil(this.slidePageIndex()))
},cleanup:function(){this.queueCount=0;
this.slides.$slideCollection.css({"margin-left":0});
this.$el.find(".carousel-remove").remove();
this.slides.$slides().css({position:"",left:""});
this.slides.setSlideCollectionWidth()
}})
});
nike.cq.define("nike.cq.carousels.styles.gamma",["jquery","nike.cq.carousels.carouselBase","nike.cq.PES.Gestures"],function(a,b,c){return a.extend(true,{},b,{carouselReady:function(){var d=this;
a(window).resize(function(f){d.windowResize(f)
});
this.$el.bind("buttonNextClick",function(g,f){d.animateBy(1)
}).bind("buttonPreviousClick",function(g,f){d.animateBy(-1)
}).bind("buttonPageClick",function(g,f){d.animateTo(f.index)
}).bind("carouselAutoAdvance",function(g,f){d.animateBy(f)
}).bind("slidePageIndexChange",function(g,f){d.slides.setSlideCollectionWidth()
});
c.register({$element:this.$el,triggerNextEvent:"buttonPreviousClick",triggerPreviousEvent:"buttonNextClick",nextButton:".nike-cq-carousel-control-buttonNext",previousButton:".nike-cq-carousel-control-buttonPrevious"});
this.windowResize()
},windowResize:function(d){if(window.matchMedia){if(window.matchMedia("(max-width: 768px)").matches){this.viewportCount(2)
}else{if(window.matchMedia("(max-width: 1024px)").matches){this.viewportCount(3)
}else{this.viewportCount(3)
}}}},animateTo:function(f){var d=this,g,h,e;
g=this.slides.$el.find("[data-slide-index="+Number((f*this.advanceBy())+1)+"]").index();
h=-1*(g*this.slides.outerWidth());
e=-1*((f*this.advanceBy())*this.slides.outerWidth());
this.slides.$slideCollection.stop().animate({"margin-left":h},this.animationDuration,function(){d.slides.sortSlides();
d.slides.$slideCollection.css({"margin-left":e})
})
},animateBy:function(g){var d=this,e;
if(this.continuousLoop()===true){this.queueCount=this.queueCount+1;
var f;
if(g<0){e=this.sliceBefore();
f=e.clone(true).insertBefore(this.slides.$slides().eq(0));
e.addClass("carousel-remove");
f.each(function(j,l){var i=((f.length-j)*d.slides.outerWidth()),h=(d.queueCount-1)*d.slidePageOuterWidth(),k=d.slides.margin().left;
a(l).css({position:"absolute",left:(-1*(i+h))})
});
this.slides.$slideCollection.stop().animate({"margin-left":((this.slidePageOuterWidth())*this.queueCount)},{duration:this.animationDuration,complete:function(){d.cleanup()
}})
}else{if(g>0){e=this.sliceAfter();
f=e.clone(true).insertAfter(d.slides.$allSlides().eq(d.slides.$allSlides().length-1));
e.addClass("carousel-remove");
this.slides.$slideCollection.stop().animate({"margin-left":((-1*g)*(this.slidePageOuterWidth()*this.queueCount))},{duration:this.animationDuration,complete:function(){d.cleanup()
}})
}}}else{if(this.continuousLoop()===false){this.slides.$slideCollection.animate({"margin-left":(-1*this.slidePageIndex()*this.slidePageOuterWidth())},{queue:false,duration:this.animationDuration})
}}},cleanup:function(){this.queueCount=0;
this.slides.$slideCollection.css({"margin-left":0});
this.$el.find(".carousel-remove").remove();
this.slides.$slides().css({position:"",left:""});
this.slides.setSlideCollectionWidth()
}})
});
nike.cq.define("nike.cq.carousels.styles.delta",["jquery","nike.cq.carousels.carouselBase","nike.cq.PES.Gestures"],function(a,b,c){return a.extend(true,{},b,{stopAfterFirstIteration:true,carouselReady:function(){var d=this;
this.$el.bind("buttonNextClick",function(g,f){d.animateBy(1)
}).bind("buttonPreviousClick",function(g,f){d.animateBy(-1)
}).bind("buttonPageClick",function(g,f){d.animateTo(f.index)
}).bind("carouselAutoAdvance",function(g,f){d.animateBy(f)
}).bind("slidePageIndexChange",function(g,f){d.slides.setSlideCollectionWidth()
});
c.register({$element:this.$el,triggerNextEvent:"buttonPreviousClick",triggerPreviousEvent:"buttonNextClick",nextButton:".nike-cq-carousel-control-buttonNext",previousButton:".nike-cq-carousel-control-buttonPrevious"})
},animateTo:function(f){var d=this,g,h,e;
g=this.slides.$el.find("[data-slide-index="+Number((f*this.advanceBy())+1)+"]").index();
h=-1*(g*this.slides.outerWidth());
e=-1*((f*this.advanceBy())*this.slides.outerWidth());
this.slides.$slideCollection.stop().animate({"margin-left":h},this.animationDuration,function(){d.slides.sortSlides();
d.slides.$slideCollection.css({"margin-left":e})
})
},animateBy:function(g){var d=this,e;
if(this.continuousLoop()===true){this.queueCount=this.queueCount+1;
var f;
if(g<0){e=this.sliceBefore();
f=e.clone(true).insertBefore(this.slides.$slides().eq(0));
e.addClass("carousel-remove");
f.each(function(j,l){var i=((f.length-j)*d.slides.outerWidth()),h=(d.queueCount-1)*d.slidePageOuterWidth(),k=d.slides.margin().left;
a(l).css({position:"absolute",left:(-1*(i+h))})
});
this.slides.$slideCollection.stop().animate({"margin-left":((this.slidePageOuterWidth())*this.queueCount)},{duration:this.animationDuration,complete:function(){d.cleanup()
}})
}else{if(g>0){e=this.sliceAfter();
f=e.clone(true).insertAfter(d.slides.$allSlides().eq(d.slides.$allSlides().length-1));
e.addClass("carousel-remove");
this.slides.$slideCollection.stop().animate({"margin-left":((-1*g)*(this.slidePageOuterWidth()*this.queueCount))},{duration:this.animationDuration,complete:function(){d.cleanup()
}})
}}}else{if(this.continuousLoop()===false){this.slides.$slideCollection.animate({"margin-left":(-1*this.slidePageIndex()*this.slidePageOuterWidth())},{queue:false,duration:this.animationDuration})
}}},cleanup:function(){this.queueCount=0;
this.slides.$slideCollection.css({"margin-left":0});
this.$el.find(".carousel-remove").remove();
this.slides.$slides().css({position:"",left:""});
this.slides.setSlideCollectionWidth()
}})
});
nike.cq.define("nike.cq.carousels.styles.epsilon",["jquery","nike.cq.carousels.carouselBase","nike.cq.PES.Gestures"],function(a,b,c){return a.extend(true,{},b,{animateByDurationDefault:250,animateByDurationMin:100,animateByDurationMax:400,animationDurationDefault:null,slideCollectionOffsetX:0,$colorOverlayElement:function(d){var e=this.slides.$el.find('[data-slide-index="'+Number(d+1)+'"] .nike-cq-background-component');
if(e.length){e=e.clone(true)
}else{e=a("<div>").css({"background-color":"#fff"}).append(a("<div>").css({"background-color":"#000"})).clone(true)
}e.addClass("nike-cq-overlay-element").removeClass("nike-cq-background-component");
return e
},carouselReady:function(){this.animationDurationDefault=this.animationDuration;
var d=this;
a(window).resize(function(){d.windowResize()
});
this.$el.css({opacity:1}).bind("buttonNextClick",function(g,f){d.insertSliceAfter();
d.animateBy(1)
}).bind("buttonPreviousClick",function(g,f){d.insertSliceBefore();
d.animateBy(-1)
}).bind("buttonPageClick",function(g,f){d.colorOverlayFade(d.slidePageIndex())
}).bind("carouselAutoAdvance",function(g,f){d.colorOverlayFade(d.slidePageIndex())
}).bind("slidePageIndexChange",function(g,f){d.slides.setSlideCollectionWidth()
});
c.register({$element:this.$el,triggerNextEvent:"buttonPreviousClick",triggerPreviousEvent:"buttonNextClick",nextButton:".nike-cq-carousel-component-collection",previousButton:".nike-cq-carousel-component-collection"});
this.addBackground(this.slidePageIndex());
this.windowResize()
},windowResize:function(){this.setSlides(a(window).width())
},setSlides:function(d){var e;
if(d>1600){e=1600
}else{if(d<=1600&&d>768){e=d
}else{if(d<=768){e=768
}else{e=""
}}}this.slides.$slides().width(e);
this.slides.setSlideCollectionWidth();
this.jumpTo(this.slidePageIndex())
},addBackground:function(d){var e=this.$colorOverlayElement(d);
e.removeClass("nike-cq-overlay-element").addClass("nike-cq-carousel-background").prependTo(this.$el)
},swapBackgroundColor:function(d){var e=this.$el.find(".nike-cq-carousel-background");
e.remove();
this.addBackground(d)
},colorOverlayFade:function(e){this.animationDuration=this.animationDurationDefault/2;
var d=this,f=this.slidePageIndexHistory[this.slidePageIndexHistory.length-2],g=this.$colorOverlayElement(f);
g.addClass(".carousel-remove").css("opacity",0).prependTo(this.$el).stop().animate({opacity:1},{duration:this.animationDuration,queue:false,complete:function(){d.swapBackgroundColor(e);
d.jumpTo(e);
g.animate({opacity:0},{duration:d.animationDuration,queue:false,complete:function(){g.remove()
}})
}})
},dragTo:function(g){if(this.slideCollectionOffsetX===0){this.slideCollectionOffsetX=Number(this.slides.$slideCollection.css("margin-left").replace("px",""))
}this.slides.$slideCollection.stop(true);
var e=this.slideCollectionOffsetX,d=g.deltaX,f=e+d;
this.slides.$slideCollection.css({"margin-left":f})
},returnTo:function(g){var e=Number(this.slides.$slideCollection.css("margin-right").replace("px","")),d=g.deltaX,f=e+d;
this.slides.$slideCollection.css({"margin-left":f})
},jumpTo:function(d){this.slides.sortSlides();
var e=this.slides.$slides().slice(d);
e.prependTo(this.slides.$slideCollection);
e.css("margin-left",0)
},animateBy:function(h,g){var e=this;
if(g){var d=this.slidePageOuterWidth()+(-1*(Math.abs(g.distance))),f=d/this.slidePageOuterWidth();
this.animationDuration=this.animateByDurationDefault*f
}else{this.animationDuration=this.animationDurationDefault
}this.queueCount=this.queueCount+1;
if(h<0){this.slides.$slideCollection.stop().animate({"margin-left":((this.slidePageOuterWidth())*this.queueCount)},{duration:this.animationDuration,complete:function(){e.cleanup()
}})
}else{if(h>0){this.slides.$slideCollection.stop().animate({"margin-left":((-1*h)*(this.slidePageOuterWidth()*this.queueCount))},{duration:this.animationDuration,complete:function(){e.cleanup()
}})
}}},insertSliceBefore:function(){var d=this,e=this.sliceBefore(),f=e.clone(true);
e.insertBefore(this.slides.$slides().eq(0));
f.addClass("carousel-remove");
f.insertAfter(this.slides.$allSlides().eq(this.slides.$allSlides().length-1));
e.each(function(k,m){var j=(e.length-k),i,h,l,g;
i=(j*d.slides.outerWidth()),h=-1*Number(d.queueCount*d.slidePageOuterWidth()),l=d.slides.margin().left,g=(-1*Math.abs(i+h));
if(g===0){g=h
}a(m).css({position:"absolute",left:Number(h-i)})
});
this.slides.setSlideCollectionWidth()
},insertSliceAfter:function(){var d=this.sliceAfter(),e=d.clone(true).insertAfter(this.slides.$allSlides().eq(this.slides.$allSlides().length-1));
d.addClass("carousel-remove")
},cleanup:function(){this.queueCount=0;
this.slideCollectionOffsetX=0;
this.slides.$slideCollection.css({"margin-left":0});
this.$el.find(".carousel-remove").remove();
this.slides.$slides().css({position:"",left:""});
this.slides.setSlideCollectionWidth()
}})
});
nike.cq.define("nike.cq.carousels.styles.eta",["jquery","nike.cq.carousels.carouselBase","nike.cq.PES.Gestures","nike.cq.UI.HashState","nike.cq.Utils","nike.cq.carousels.constants"],function(c,e,f,d,b,a){return c.extend(true,{},e,{animateByDurationDefault:250,animateByDurationMin:100,animateByDurationMax:400,animationDurationDefault:null,slideCollectionOffsetX:0,$colorOverlayElement:function(h){var g=this.slides.$el.find('[data-slide-index="'+Number(h+1)+'"] [data-background-color]').attr("data-background-color"),i=c("<div>").css({"background-color":"#"+g}).append(c("<div>").css({"background-color":"#"+g})).clone(true);
i.addClass("nike-cq-overlay-element").removeClass("nike-cq-background-component");
return i
},carouselReady:function(){this.animationDurationDefault=this.animationDuration;
var g=this;
this.slideChangeTransition=this[this.transitionType];
c(window).resize(function(){g.windowResize()
});
this.$el.css({opacity:1}).bind("buttonNextClick",function(k,j){g.slideChangeTransition(g.slidePageIndex())
}).bind("buttonPreviousClick",function(k,j){g.slideChangeTransition(g.slidePageIndex())
}).bind("buttonPageClick",function(k,j){g.slideChangeTransition(g.slidePageIndex())
}).bind("carouselAutoAdvance",function(k,j){g.slideChangeTransition(g.slidePageIndex())
}).bind("slidePageIndexChange",function(k,j){g.slides.setSlideCollectionWidth()
});
if(!Modernizr.touch){var h=function(k){var j=g.$el.find(".nike-cq-carousel-control-buttonPrevious, .nike-cq-carousel-control-buttonNext");
if(g.continuousLoop()===false){j=j.filter(".nike-cq-carousel-button-active")
}k?j.fadeIn():j.fadeOut()
};
this.$el.bind("mouseenter",function(k,j){h(true)
}).bind("mouseleave",function(k,j){h(false)
})
}f.register({$element:this.$el,triggerNextEvent:"buttonPreviousClick",triggerPreviousEvent:"buttonNextClick",nextButton:".nike-cq-carousel-control-buttonNext",previousButton:".nike-cq-carousel-control-buttonPrevious"});
this.addBackground(this.slidePageIndex());
this.windowResize();
this.jumpTo(this.slidePageIndex());
var i=this.$el.closest(".nike-cq-page-section-container.nike-cq-nike-com-container").find("> div.nike-cq-container-module-anchor-link-wrapper > a");
i.each(function(j){var k=c(this).attr("name");
d.registerHashCallback(k,this,function(){g.jumpTo(g.slidePageIndex(j))
})
})
},windowResize:function(){this.setSlides(c(window).width())
},setSlides:function(g){var h;
if(g<=768){h=768
}else{h=g
}this.slides.$slides().width(h);
this.slides.setSlideCollectionWidth()
},addBackground:function(g){var h=this.$colorOverlayElement(g);
h.removeClass("nike-cq-overlay-element").addClass("nike-cq-carousel-background").prependTo(this.$el)
},swapBackgroundColor:function(g){var h=this.$el.find(".nike-cq-carousel-background");
h.remove();
this.addBackground(g)
},transitionFadeToColor:function(h){this.animationDuration=this.animationDurationDefault/2;
var g=this,i=this.slidePageIndexHistory[this.slidePageIndexHistory.length-2],j=this.$colorOverlayElement(i);
j.addClass(".carousel-remove").css("opacity",0).prependTo(this.$el).stop().animate({opacity:1},{duration:this.animationDuration,queue:false,complete:function(){g.swapBackgroundColor(h);
g.jumpTo(h);
j.animate({opacity:0},{duration:g.animationDuration,queue:false,complete:function(){j.remove();
g.autoAdvance()
}})
}})
},dragTo:function(j){if(this.slideCollectionOffsetX===0){this.slideCollectionOffsetX=Number(this.slides.$slideCollection.css("margin-left").replace("px",""))
}this.slides.$slideCollection.stop(true);
var h=this.slideCollectionOffsetX,g=j.deltaX,i=h+g;
this.slides.$slideCollection.css({"margin-left":i})
},returnTo:function(j){var h=Number(this.slides.$slideCollection.css("margin-right").replace("px","")),g=j.deltaX,i=h+g;
this.slides.$slideCollection.css({"margin-left":i})
},jumpTo:function(h){var k;
this.slides.sortSlides();
var l=this.slides.$slides().slice(h);
l.prependTo(this.slides.$slideCollection);
var g=this.slides.$slideCollection.find(".nike-cq-carousel-slide");
for(k=1;
k<g.length;
k++){c(g[k]).hide()
}c(g[0]).show().css("margin-left",0);
var j=c(g[0]).find("video");
if(j.length){c(j[0]).trigger("videoReset")
}this.$el.trigger("etaSlideChangeComplete")
},transitionFadeToSlide:function(h){var g=this,i=this.slidePageIndexHistory[this.slidePageIndexHistory.length-2];
this.animationDuration=this.animationDurationDefault;
if(i!==h){g.fadeToSlide(h,i)
}},fadeToSlide:function(i,h){var g=this,j=this.slides.$slideCollection.find("[data-slide-index="+(h+1)+"]"),m=this.slides.$slideCollection.find("[data-slide-index="+(i+1)+"]");
j.after(m);
j.css({marginRight:"-100%",opacity:1,zIndex:0});
g.slides.$allSlides().stop(true);
var l=b.iOSVersion(),k={duration:this.animationDuration,complete:function(){g.jumpTo(i)
}};
if(l&&l[0]===6){m.children().css({opacity:0});
k.step=function(o,n){if(n.now===0){m.children().css({opacity:1})
}}
}m.css({opacity:0,marginRight:0}).show();
m.animate({opacity:1},k)
},animateBy:function(l,k){var h=this,j;
if(k){var g=this.slidePageOuterWidth()+(-1*(Math.abs(k.distance))),i=g/this.slidePageOuterWidth();
this.animationDuration=this.animateByDurationDefault*i
}else{this.animationDuration=this.animationDurationDefault
}this.queueCount=this.queueCount+1;
if(l<0){this.slides.$slideCollection.stop().animate({"margin-left":((this.slidePageOuterWidth())*this.queueCount)},{duration:this.animationDuration,complete:function(){h.cleanup()
}})
}else{if(l>0){this.slides.$slideCollection.stop().animate({"margin-left":((-1*l)*(this.slidePageOuterWidth()*this.queueCount))},{duration:this.animationDuration,complete:function(){h.cleanup()
}})
}}},cleanup:function(){this.queueCount=0;
this.slideCollectionOffsetX=0;
this.slides.$slideCollection.css({"margin-left":0});
this.$el.find(".carousel-remove").remove();
this.slides.$slides().css({position:"",left:""});
this.slides.setSlideCollectionWidth()
},advanceSlidePageIndex:function(h){var g=this.slidePageIndex()+h;
this.slidePageIndex(g);
this.$el.trigger(a.SLIDE_PAGE_INDEX_ADVANCE,h)
},slideContainsVideo:function(){var i,h,g,j;
if(!this.slides||!this.slides.$slides){return false
}g=this.slides.$slides()[0];
i=c(g).find(".nike-cq-fst-component");
h=i.data("vbgRef");
j=Boolean(h&&h.calculateVisibility()>0);
return j
}})
});
nike.cq.define("nike.cq.carousels.styles.zeta",["jquery","nike.cq.carousels.carouselBase","nike.cq.PES.Gestures"],function(a,b,c){return a.extend(true,{},b,{pageBreaks:[960],slideHistory:[],offsetCounter:0,slideWidth:960,carouselReady:function(e){var d=this;
a(window).resize(function(){d.windowResize()
});
this.$el.bind("buttonNextClick",function(g,f){d.animateBy(1)
}).bind("buttonPreviousClick",function(g,f){d.animateBy(-1)
}).bind("buttonPageClick",function(g,f){d.animateTo(f.index)
}).bind("slidePageIndexChange",function(g,f){d.slideHistory.push(f);
d.slides.$slides().each(function(h,k){var j=a(k),i=j.attr("data-slide-index");
if(i==(f+1)){j.addClass("nike-cq-image-slide-active")
}else{d.animateBy(1);
j.removeClass("nike-cq-image-slide-active")
}if(j.hasClass("carousel-clone")||j.hasClass("carousel-clone-before")){j.removeClass("nike-cq-image-slide-active")
}})
}).find('[data-slide-index="1"]').addClass("nike-cq-image-slide-active");
c.register({$element:this.$el,triggerNextEvent:"buttonPreviousClick",triggerPreviousEvent:"buttonNextClick",nextButton:".nike-cq-carousel-control-buttonNext",previousButton:".nike-cq-carousel-control-buttonPrevious"});
this.configureDisplay()
},configureDisplay:function(){this.windowResize();
this.slideHistory.push(this.slidePageIndex());
var e=this,f=this.slides.$slides().slice(0,2).clone(),d=this.slides.$slides().slice(-2).clone();
this.insertSliceBefore(d).insertSliceAfter(f);
this.configureSlides()
},configureSlides:function(){var d=this;
this.slides.$allSlides().bind("click",function(g){var f=Number(a(g.currentTarget).attr("data-slide-index"))-1;
if(d.slidePageIndex()===d.totalSlidePages()&&f===0){d.$el.trigger("buttonNextClick")
}else{if(d.slidePageIndex()===0&&f===d.totalSlidePages()){d.$el.trigger("buttonPreviousClick")
}else{if(f<d.slidePageIndex()){d.$el.trigger("buttonPreviousClick")
}else{if(f>d.slidePageIndex()){d.$el.trigger("buttonNextClick")
}else{if(f===d.slidePageIndex()){}}}}}});
this.slides.setSlideCollectionWidth()
},jumpTo:function(e){var d=-1*(e*this.slidePageOuterWidth());
this.slides.$slideCollection.css({left:d})
},animateTo:function(e){var d=-1*(e*this.slidePageOuterWidth());
this.slides.$slideCollection.animate({left:d},{duration:200,easing:"linear",queue:false})
},animateBy:function(g){var f=this,e=this.slideHistory[this.slideHistory.length-2],d;
switch(e){case 0:case this.totalSlidePages():d=-1*(g*this.slidePageOuterWidth());
this.slides.$slideCollection.animate({left:"+="+d},{duration:200,complete:function(){f.jumpTo(f.slidePageIndex())
},easing:"linear",queue:false});
break;
default:this.animateTo(this.slidePageIndex())
}},windowResize:function(){var d=this;
if(window.matchMedia){if(window.matchMedia("(max-width: 960px)").matches){d.slideWidth=768;
this.animateTo(this.slidePageIndex())
}else{if(window.matchMedia("(min-width: 961px)").matches){d.slideWidth=960;
this.animateTo(this.slidePageIndex())
}}}else{d.slideWidth=960;
this.animateTo(this.slidePageIndex())
}},insertSliceBefore:function(e){var d=this;
e.each(function(f,g){a(g).addClass("carousel-clone-before").prependTo(d.slides.$slideCollection)
});
return this
},insertSliceAfter:function(d){d.addClass("carousel-clone").appendTo(this.slides.$slideCollection);
return this
}})
});
nike.cq.define("nike.cq.carousels.styles",["nike.cq.carousels.styles.alpha","nike.cq.carousels.styles.beta","nike.cq.carousels.styles.delta","nike.cq.carousels.styles.epsilon","nike.cq.carousels.styles.eta","nike.cq.carousels.styles.gamma","nike.cq.carousels.styles.zeta"],function(e,d,g,f,c,a,b){return{alpha:e,beta:d,delta:g,epsilon:f,eta:c,gamma:a,zeta:b}
});
nike.cq.define("nike.cq.PES.Tracking",["jquery","nike.cq.Tracking"],function(f,g){var l=function(s){f.extend(this,s)
};
var p={event:{"jcr:primaryType":"nt:unstructured",extend:l},extend:function(s){this.event.extend(s)
}};
function c(s,t,u){if(t&&!u.events){u.events=t
}if(typeof(nike.dispatchEvent)==="function"){nike.dispatchEvent(s,u)
}}function o(t){var s="";
if(t.el.attr("data-tracking")){s=t.el.attr("data-tracking")
}return s
}function q(s){return s?g.formatText(s.text()):""
}function e(s){var t=q(s);
if(s.data("tracking")){t=s.data("tracking")
}return t
}function i(){var t=window.location.pathname.split("/");
for(var s=0;
s<t.length;
++s){if(t[s]==="c"&&s<t.length-1){return t[s+1]
}}return t[t.length-1]
}function j(u){var v={};
if(typeof(u.el)!=="object"){return v
}var t=false;
var w=o(u);
var s="";
if(w!=""){t=true
}else{if(u.el.has("img").attr("alt")){w=u.el.find("img").attr("alt")
}else{if(u.el.has("span")){w=u.el.find("span").text()
}else{if(u.el.attr("href")){s=u.el.attr("href")
}}}}if(t){w=g.formatTextPreservingGreaterThanChar(w)
}else{w=g.formatText(w)
}if(typeof u.data!=="undefined"&&typeof u.data.prop3!=="undefined"){w=g.replaceValues(u.data.prop3,w)
}if(w!==""){v.prop3=w
}else{v.prop3=s
}return v
}function h(t){var u={};
if(typeof t.el==="undefined"){return u
}var s=t.el.attr("href");
if(t.data&&t.data.prop3){u.prop3=g.replaceValues(t.data.prop3,s)
}else{u.prop3=s
}return u
}function b(s){if(typeof s.el==="undefined"){return{}
}var u=q(s.el),t={};
if(s.data&&s.data.prop3){t.prop3=g.replaceValues(s.data.prop3,u)
}else{t.prop3=u
}return t
}function k(t,s){return r(t,d(t),s)
}function r(v,s,u){var t={campaign:a(v,"data-nike-campaign"),module:u,creative:s,category:a(v,"data-nike-category")};
if(t.campaign==="notauthored"&&t.category==="notauthored"){t=null
}return t
}function a(t,s){return t.attr(s)||"notauthored"
}function d(v){var x=v.attr("src");
if(!x||x===""){x=v.css("background-image")?v.css("background-image").slice(4,-1):""
}var u,y=x,w=x.indexOf(".dimg"),s=x.indexOf(".transform"),t=new RegExp(/(.dimg|.transform)(.*)$/ig);
if(w!==-1||s!==-1){y=x.replace(t,"")
}u=y.lastIndexOf("/")+1;
y=y.substr(u);
return y
}var n={extend:l,sendEventTrackingToThirdParty:c,getDataAttribute:o,elementText:q,getCtaText:e,getSportCategory:i,ctaProcessor:j,anchorHrefProcessor:h,ctaTextProcessor:b,buildEVar5:k,buildPageEVar5:r,config:p};
var m=nike.cq.ns("nike.cq.PES");
m.Tracking=n;
return n
});
nike.cq.require(["nike.cq.PES.Tracking","nike.cq.Tracking"],function(a,b){a.extend((function(t,e,g,s){var i="p1";
function p(v){var w={};
var x="teamselector:change team:";
x+=t(v.el.find("option:selected"));
w.prop3=x;
return w
}function j(v){var w={};
if(typeof(v.el)!=="object"){return w
}var x=v.el.find("img").attr("data-tracking");
w.prop3="P1 auto rotate:color chip selection:"+x;
return w
}function u(v){return v.data("slide-index")
}function d(v){return v.closest(".indexed-pes-reference").data("pes-reference-index")
}function f(v){var w=v.closest(".nike-cq-p1-layout-foreground"),x=w.find(".nike-cq-subtitle:first");
return t(x)
}function h(v){return v.closest(".nike-cq-p1-layout").find(".nike-cq-p1-layout-background img")
}function m(x){var v="";
if(x){var y=x.data("hotspotTitle");
var w=x.data("hotspotDescription");
if(y&&y!==""){v=y
}else{if(w&&w!==""){v=w
}}}return v
}function o(E){if(typeof E.el==="undefined"){return{}
}var D=E.el.parent(),x=E.el.hasClass("active"),C=m(D),A=E.el.closest(".nike-cq-carousel-slide"),y=A.length>0,w=x?"close":"open",z={};
if(y){var B=u(A),v=f(E.el);
z.prop3="p1 carousel "+B+":"+v+":hotspots:"+w+":"+e(C)
}else{z.prop3="p1 hotspots:"+w+":"+e(C)
}return z
}function k(B){if(typeof B.el==="undefined"){return{}
}var A=B.el.parent(),w=B.el.hasClass("active"),z=m(A),D=B.el.closest(".nike-cq-carousel"),y=D.length>0,v=B.el.attr("href"),x={};
x.prop3="p1 hidden hotspots:image:"+v;
var C=s(h(B.el),i);
if(C){x.eVar5=C
}return x
}function c(D){if(typeof D.el==="undefined"){return{}
}var C=D.el.closest(".hotspot"),B=m(C),w=t(D.el),z=D.el.closest(".nike-cq-carousel-slide"),x=z.length>0,y={};
if(x){var A=u(z),v=f(D.el);
y.prop3="p1 carousel "+A+":"+v+":hotspots:click:"+e(B)+":"+w
}else{y.prop3="p1 hotspots:click:"+e(B)+":"+w
}var E=s(h(D.el),i);
if(E){y.eVar5=E
}return y
}function r(v){var x={};
if(typeof v.el==="undefined"){return x
}var w=t(v.el);
x.prop3="p1 toggle:load:"+w;
return x
}function q(A){if(typeof A.el==="undefined"||A.el.attr("href")==="#"){return{}
}var N=g(A.el),v=A.el.closest(".nike-cq-carousel-slide"),x=v.length>0,z=undefined,H=A.el.closest(".nike-cq-p1-layout-foreground").find(".nike-cq-hotspot-type-invisible"),w=H.length>0,I=A.el.closest(".nike-cq-p1").find(".nike-cq-video-bg"),B=I.length>0,G=A.el.closest(".nike-cq-tout-toggle-container"),y=G.length>0,K=A.el.closest(".nike-cq-kms-layout-page,.nike-cq-kms-content,.nike-cq-kms-reference"),J=K.length>0,M={};
if(J){z=x?u(v):d(A.el);
M.prop3="kms carousel:"+z+":"+N
}else{if(x){z=u(v);
var E=f(A.el);
M.prop3="p1 carousel "+z+":"+E+":"+N
}else{if(B){M.prop3="p1 animation:"+N
}else{if(w){M.prop3="p1 hidden hotspots:cta:"+N
}else{if(y){G=A.el.closest(".nike-cq-toggle");
var F=G.find(".toggle-label-container:has(.selected)");
var L=t(F);
var C=$(".device-type-phone").size()>0;
if(C){M.prop3=i+":"+N
}else{M.prop3="p1 toggle:click:"+L+":"+N
}}else{M.prop3=i+":"+N
}}}}}var D=s(h(A.el),i);
if(D){M.eVar5=D
}return M
}function l(w){if(typeof w.el==="undefined"){return{}
}var y=w.el.siblings("a").data("tracking");
var v=w.el.find("option:selected").text(),x={};
if(w.el.find("option:selected").attr("value")==="#"){return{}
}else{x.prop3=i+":"+y+">"+v
}return x
}function n(D){var z={};
if(typeof D.el==="undefined"){return z
}var A=D.el.closest(".nike-cq-carousel-slide"),y=A.length>0,x=D.el.closest(".nike-cq-p1").find(".nike-cq-video-bg"),z={};
var C=D.el.closest(".nike-cq-p1-layout-component ").find(".nike-cq-p1-layout-background img").attr("alt");
var v=D.el.closest(".nike-cq-p1-layout-component ");
if(y){var B=u(A),w=f(D.el);
z.prop3="p1 carousel:"+B+":"+C+":image"
}else{if(x.length>0){z.prop3="p1:video:"+C+":image"
}else{z.prop3=i+":"+C+":image"
}}var E=s(h(v),i);
if(E){z.eVar5=E
}return z
}return{productOptionsProcessor:j,p1HotspotsProcessor:o,p1HotspotsCtaProcessor:c,p1InvisibleHotspotsProcessor:k,p1ToggleProcessor:r,p1CtaProcessor:q,p1PhoneStackedCtaProcessor:l,teamSelectorMobileProcessor:p,p1ImageAnchorProcessor:n}
})(a.elementText,b.formatText,a.getCtaText,a.buildEVar5));
a.config.extend({"nike-cq-p1-image-anchor":{elementSelector:".nike-cq-p1-layout-anchor",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p1ImageAnchorProcessor"}},"nike-cq-p1-cta-component":{elementSelector:".nike-cq-p1-layout-component .nike-cq-cta a, .nike-cq-kms-reference .nike-cq-cta a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p1CtaProcessor"}},"nike-cq-p1-phone-stacked-cta-component":{elementSelector:".nike-cq-p1-layout-component .nike-cq-cta select",eventName:"toutClickEvent",action:"change","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p1PhoneStackedCtaProcessor"}},"nike-cq-hotspots-crosshair":{elementSelector:".nike-cq-p1-layout-container .nike-cq-hotspots a.crosshair",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p1HotspotsProcessor"}},"nike-cq-hotspots-cta":{elementSelector:".nike-cq-p1-layout-container .nike-cq-hotspots-link-list a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p1HotspotsCtaProcessor"}},"nike-cq-hotspots-invisible":{elementSelector:".nike-cq-p1-layout-container .nike-cq-hotspots a.tracking-invisible-hotspot",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p1InvisibleHotspotsProcessor"}},"nike-cq-toggle-component":{elementSelector:".nike-cq-p1-toggle-container .nike-cq-toggle-component a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"p1 toggle:load:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p1ToggleProcessor",followLink:false}},"nike-cq-product-options-option":{elementSelector:".nike-cq-product-options-thumbs a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"P1 auto rotate:color chip selection:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.productOptionsProcessor",followLink:false}},"nike-cq-product-wall-header-link":{elementSelector:".nike-cq-product-wall-header-container a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"product wall header:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.anchorHrefProcessor",followLink:true}},"nike-cq-team-selector-links":{elementSelector:".nike-cq-team-selector-links a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"teamselector:change team:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaProcessor"}},"nike-cq-team-selector-mobile-links":{elementSelector:".nike-cq-team-selector-component select",eventName:"toutClickEvent",action:"change","jcr:primaryType":"nt:unstructured",data:{prop3:"teamselector:change team:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.teamSelectorMobileProcessor",followLink:false}}})
});
nike.cq.require(["nike.cq.PES.Tracking","nike.cq.Tracking"],function(a,b){a.extend((function(e,h,m,n){var c="content slideshow";
function o(s){var t={};
if(typeof(s.el)=="undefined"){return t
}var u=s.el.parents(".nike-cq-p2-image-tout-300-container").find("span.nike-cq-subtitle-line-1").text();
if(u==""){u=s.el.parents(".nike-cq-p2-image-tout-300-container").find(".nike-cq-touts-image-resource").attr("alt")
}t.prop3="p2:"+e.formatText(u);
var r=n(s.el.parents(".nike-cq-p2-image-tout-300-container").find("img"),"p2");
if(r){t.eVar5=r
}return t
}function l(r){var s={};
if(typeof(r.el)=="undefined"){return s
}var t=r.el.find("span.nike-cq-subtitle-line-1").text();
if(t!=""){t=e.formatText(t)
}else{t=r.el.find(".video-thumbnail").attr("data-video-id")
}s.prop3="p2:"+t;
return s
}function q(u,t){var v={};
if(typeof(u.el)=="undefined"){return v
}var w=u.el.closest(".slide, .nike-cq-carousel-slide").data("slideIndex");
var r=n(u.el.parents(".nike-cq-portrait-tout-300-container").find("img"),"portrait merch zone");
if(r){v.eVar5=r
}if(t){var s=h(u);
v.prop3="merch zone:"+w+":"+s
}else{var x=u.el.find(".nike-cq-image img").attr("alt");
v.prop3="merch zone:"+w+":"+x+":image"
}return v
}function k(r){return q(r,true)
}function f(r){return q(r,false)
}function g(x){var t="",v=x.closest(".nike-cq-carousel-container").find(".nike-cq-carousel-title-resource .nike-cq-subtitle-line-1"),s=null,r=x.find(".nike-cq-subtitle-line-1"),u=null,w=x.find(".nike-cq-image img").attr("alt");
if(v.size()==1){s=m(v)
}if(r.size()==1){u=m(r)
}if(s!=null){if(u!=null){t=s+"-"+u
}else{t=s
}}else{if(u!=null){t=u
}else{t=w
}}return t
}function p(u){var v={};
if(typeof(u.el)=="undefined"){return v
}var w=u.el.closest(".slide, .nike-cq-carousel-slide").data("slideIndex"),t=h(u),x=u.el.closest(".nike-cq-carousel-slide"),r=g(x);
v.prop3=c+":"+w+":"+t+":"+r;
var s=n(i(x),c);
if(s){v.eVar5=s
}return v
}function i(r){return r.find(".nike-cq-image img")
}function j(x){var t={};
if(typeof x.el==="undefined"){return t
}var z=x.el.siblings("a").data("tracking"),w=x.el.closest(".slide, .nike-cq-carousel-slide").data("slideIndex"),v=x.el.closest(".nike-cq-carousel-slide"),A=g(v);
var s=x.el.data("tracking-target-index");
if(!s){return t
}var u=x.el.children().eq(s),r=u.text().trim();
if(u.attr("value")==="#"){return t
}else{t.prop3="content slideshow:"+w+":"+z+">"+r+":"+A
}var y=n(i(v),c);
if(y){t.eVar5=y
}return t
}function d(t){var u={};
if(typeof(t.el)=="undefined"){return u
}var r=m(t.el);
var s=t.el.closest(".nike-cq-page-menu-sublist-wrapper");
while(s.length>0){r=m(s.siblings("a"))+">"+r;
s=s.siblings("a").closest(".nike-cq-page-menu-sublist-wrapper")
}u.prop3="in page nav:"+r;
return u
}return{p2ImageTout300Processor:o,p2VideoTout300Processor:l,merchZoneToutProcessor:k,merchZoneToutImageProcessor:f,contentSlideshowToutProcessor:p,contentSlideshowPhoneStackedCtaProcessor:j,PINProcessor:d}
})(b,a.getDataAttribute,a.elementText,a.buildEVar5));
a.config.extend({"nike-cq-three-column-benefits-cta-component":{elementSelector:".nike-cq-page-section-three-column-benefits-container .nike-cq-cta-component a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"3 column:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaProcessor"}},"nike-cq-content-slideshow-cta-component":{elementSelector:".nike-cq-content-slideshow .nike-cq-cta-component a, .nike-cq-content-slideshow-v2 .nike-cq-cta-component a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.contentSlideshowToutProcessor"}},"nike-cq-content-slideshow-phone-stacked-cta-component":{elementSelector:".nike-cq-content-slideshow-v2 .nike-cq-cta select",eventName:"toutClickEvent",action:"change","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.contentSlideshowPhoneStackedCtaProcessor"}},"nike-cq-copy-block-cta-component":{elementSelector:".nike-cq-copy-block .nike-cq-cta-component a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"copy block:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaProcessor"}},"nike-cq-copy-block-anchors":{elementSelector:".nike-cq-copy-block .nike-cq-text-component a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"copy block:[elementText]"}},"nike-cq-hyperlink":{elementSelector:".nike-cq-hyperlink-component ul.link-list a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"hyperlink:[elementText]"}},"nike-cq-hyperlink-phone":{elementSelector:".device-type-phone .nike-cq-hyperlink ul li a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"hyperlink:[elementText]"}},"nike-cq-merch-menu":{elementSelector:"ul.nike-cq-merch-menu-links a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"merch menu:[elementText]"}},"nike-cq-portrait-merch-zone-carousel":{elementSelector:".nike-cq-portrait-merch-zone-carousel .nike-cq-cta-component a, .nike-cq-portrait-merch-zone-v2 .nike-cq-cta-component a, .nike-cq-portrait-tout-300-container .nike-cq-cta-component a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.merchZoneToutProcessor"}},"nike-cq-portrait-merch-zone-carousel-image":{elementSelector:".nike-cq-portrait-tout-300-container a.slide-anchor",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.merchZoneToutImageProcessor"}},"nike-cq-notification-banner-cta":{elementSelector:".nike-cq-notification-banner-container .nike-cq-cta a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"promo:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaProcessor"}},"nike-cq-nikeplus-activity-carousel-cta-component":{elementSelector:".nike-cq-page-section-nikeplus-activity-carousel-container a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaProcessor"}},"nike-cq-p2-image-tout-300-container":{elementSelector:".nike-cq-p2-image-tout-300-container a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p2ImageTout300Processor"}},"nike-cq-p2-video-tout-300-container":{elementSelector:".nike-cq-p2-video-tout-300-container",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p2VideoTout300Processor",followLink:false}},"nike-cq-phone-inpage-navigation-links":{elementSelector:".nike-cq-page-menu-link",eventName:"navItemSelectionEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"in page nav:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.PINProcessor",followLink:true}}})
});
nike.cq.require(["nike.cq.PES.Tracking"],function(a){a.extend((function(e,c){function b(l,h){var g="",j=l.closest(".nike-cq-carousel-container").find(".nike-cq-carousel-title-resource .nike-cq-subtitle-line-1").first(),f=l.find(".nike-cq-subtitle:first"),i=null,k=null;
if(f.size()==1){i=c(f)
}if(j.size()==1){g=c(j);
if(i!=null&&i.length>0){g+="-"+i
}}else{if(i!=null&&i.length>0){g=i
}else{k=l.find(".nike-cq-image img").attr("alt");
g=k
}}return g
}function d(h){var i={};
if(typeof(h.el)=="undefined"){return i
}var g=h.el.data("carousel"),j=parseInt(g.slidePageIndex()+1),k=h.el.find('.nike-cq-carousel-slide[data-slide-index="'+j+'"]'),f="";
if(h.data.showCreativeText!==false){f=":"+b(k,h)
}i.prop3=h.data.carouselType+":slide change:"+j+f;
return i
}return{carouselSlideChangeProcessor:d}
}(a.getDataAttribute,a.elementText)));
a.config.extend({"nike-cq-content-slideshow-slide-change":{elementSelector:".device-type-desktop .nike-cq-container",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-carousel-alpha",delegateAction:"userDrivenSlideChange",data:{carouselType:"content slideshow"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.carouselSlideChangeProcessor"}},"nike-cq-portrait-merch-zone-slide-change":{elementSelector:".device-type-desktop .nike-cq-container",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-carousel-beta",delegateAction:"userDrivenSlideChange",data:{carouselType:"merch zone"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.carouselSlideChangeProcessor"}},"nike-cq-nikeplus-activity-carousel-slide-change":{elementSelector:".device-type-desktop .nike-cq-container",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-carousel-gamma",delegateAction:"userDrivenSlideChange",data:{carouselType:"nikeplus activity carousel",showCreativeText:"false"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.carouselSlideChangeProcessor"}},"nike-cq-notifications-slide-change":{elementSelector:".device-type-desktop .nike-cq-container",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-carousel-delta",delegateAction:"userDrivenSlideChange",data:{carouselType:"promo"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.carouselSlideChangeProcessor"}},"nike-cq-image-carousel-slide-change":{elementSelector:".device-type-desktop .nike-cq-container",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-carousel-zeta",delegateAction:"userDrivenSlideChange",data:{carouselType:"image carousel"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.carouselSlideChangeProcessor"}},"nike-cq-p1-carousel-slide-change":{elementSelector:".device-type-desktop .nike-cq-container",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-carousel-epsilon",delegateAction:"userDrivenSlideChange",data:{carouselType:"p1 carousel"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.carouselSlideChangeProcessor"}}})
});
nike.cq.require(["nike.cq.PES.Tracking","nike.cq.Tracking"],function(a,b){a.extend((function(e,c){function d(g){var h={};
if(typeof(g.el)==="undefined"){return h
}var i=g.el.parents(".nike-cq-story-body-teaser-component").data("title");
if(i===""){i=g.el.text()
}h.prop3="story page:"+c(i);
return h
}function f(j){if(typeof j.el==="undefined"){return{}
}var k={},i=function(p){var n="",o=p.find("img");
if(p.data("title").length){n=p.data("title")
}else{if(o.attr("alt").length){return":"+o.attr("alt")
}else{if(o.data("imageName").length){return":"+o.data("imageName")
}}}return n
};
var h=j.el.closest(".nike-cq-story-hero-slideshow-component"),l=h.find(".nike-cq-story-hero-slideshow-select-slide-selected a").data("index"),m=h.find(".nike-cq-story-hero-slideshow-slide-selected:not(.clone)"),g="";
l=l+1;
if(isNaN(l)){l=1
}if(j.data.showCreativeText!==false){g=i(m)
}k.prop3="p1 hero slideshow:slide change:"+l+":"+g;
return k
}return{relatedStoryToutProcessor:d,p1StoryCarouselProcessor:f}
})(a.elementText,b.formatText));
a.config.extend({"nike-cq-story-tout":{elementSelector:".nike-cq-story-body-text a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"story page:[elementText]"}},"nike-cq-related-story-tout":{elementSelector:".nike-cq-story-body-teaser a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.relatedStoryToutProcessor"}},"nike-cq-story-body-cta-component":{elementSelector:" .nike-cq-story-sidebar .nike-cq-story-sidebar-cta a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"story page:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaProcessor"}},"nike-cq-story-related-product-cta-component":{elementSelector:".nike-cq-story-sidebar .nike-cq-related-product-cta-wrapper .nike-cq-cta-component a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"story page:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaProcessor"}},"nike-cq-story-carousel-navigation":{elementSelector:"body",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-story-hero-slideshow-select-slide-link, .nike-cq-story-hero-slideshow-previous-slide-button, .nike-cq-story-hero-slideshow-next-slide-button",delegateAction:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"p1 hero slideshow:navigation selection:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.p1StoryCarouselProcessor",followLink:false}}})
});
nike.cq.require(["nike.cq.PES.Tracking"],function(a){a.extend({leftNavigationToutProcessor:function(b){var c={};
if(typeof(b.el)=="undefined"){return c
}var d=b.el.find("span").text();
c.prop3="left:shop>"+d;
return c
}});
a.config.extend({"nike-cq-left-navigation-links":{elementSelector:".nike-cq-left-navigation-nav-links a, .nike-cq-left-navigation-phone-links-container a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"left:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaProcessor",followLink:true}},"nike-cq-left-navigation-tout-link":{elementSelector:".nike-cq-left-navigation-component-tout a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.leftNavigationToutProcessor",followLink:true}},"nike-cq-left-navigation-component-tout":{elementSelector:".nike-cq-left-navigation-tout a",eventName:"storeNavChangedEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{navItems:"left:tout",clicked:"true"}}})
});
nike.cq.require(["nike.cq.PES.Tracking"],function(a){a.extend({footerLinkProcessor:function(c){var d={};
if(typeof(c.el)=="undefined"){return d
}var b=c.el.text().toLowerCase();
d.prop3="nav:footer:new:"+b;
return d
},footerLinkSocialProcessor:function(c){var d={};
if(typeof(c.el)=="undefined"){return d
}var b=c.el.attr("name").toLowerCase();
d.prop3="nav:footer:new:social:"+b;
return d
},footerLinkGuidesProcessor:function(c){var d={};
if(typeof(c.el)=="undefined"){return d
}var b=c.el.text().toLowerCase();
d.prop3="nav:footer:new:guides:"+b;
return d
}});
a.config.extend({"nike-cq-global-footer-links":{elementSelector:"footer",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-global-footer-tng-title a, .nike-cq-global-footer-tng-link a, .nike-cq-global-footer-tng-locale a, .nike-cq-global-footer-tng-terms-link a",delegateAction:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.footerLinkProcessor",followLink:true}},"nike-cq-global-footer-social-links":{elementSelector:"footer",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-global-footer-tng-social-container a",delegateAction:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.footerLinkSocialProcessor",followLink:true}},"nike-cq-global-footer-guide-links":{elementSelector:"footer",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-global-footer-tng-guides-menu a",delegateAction:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.footerLinkGuidesProcessor",followLink:true}}})
});
nike.cq.require(["nike.cq.PES.Tracking","nike.cq.Tracking"],function(a,b){a.extend((function(e,i,o){var n=e.elementText,c=".nike-cq-subtitle-line-1, h2 .grid-overlay-title1, .nike-cq-content-grid-image-overlay h2:not(.nike-cq-subtitle-headline)";
var g="content grid";
function k(q){if(q.el.hasClass("nike-cq-content-grid-arrow")){return n(q.el.closest(".nike-cq-content-grid-modal-foreground").find(c).eq(0))
}else{return n(q.el.closest(".nike-cq-content-grid-image").find(c).eq(0))
}}function p(q){return q.closest(".nike-cq-content-grid-image").find("img")
}function h(r){if(typeof r.el==="undefined"){return{}
}var s={},q=k(r);
s.prop21=q;
return s
}function d(q){var r={};
if(typeof q.el==="undefined"){return r
}r.prop21=k(q);
return r
}function f(x){var s={};
if(typeof(x.el)=="undefined"){return s
}var w=x.el.find(".link-item-label"),u=x.el.closest(".nike-cq-content-grid-overlay-right"),t=u.find(c).eq(0);
var q=n(w),v=n(t);
s.prop3="content grid:modal:"+v+":"+q;
var r=x.el.closest(".nike-cq-content-grid-overlay-dialog-inner").find("img");
var y=o(r,g);
if(y){s.eVar5=y
}return s
}function j(w){var s={};
if(typeof(w.el)=="undefined"){return s
}var v;
if(w.el.prop("tagName")==="A"){v=w.el.closest(".nike-cq-content-grid-image-hover-overlay.nike-cq-content-grid-image-url")
}else{v=w.el
}var y=v.find(".nike-cq-cta-component"),u=v.find(".nike-cq-content-grid-image-hover-copy-text"),q=n(y),r=n(u);
if(r==""){var t=w.el.closest(".nike-cq-content-grid-image").find("img");
r=t.attr("alt")
}s.prop3="content grid:"+q+":"+r;
var x=o(p(w.el),g);
if(x){s.eVar5=x
}return s
}function m(r){if(typeof r.el==="undefined"){return{}
}var q=r.el;
if(r.el.prop("tagName")!=="A"){q=r.el.find(".nike-cq-content-grid-image-hover-content a")
}var t=n(q),s={};
s.prop3="content grid:"+t;
return s
}function l(t){if(typeof t.el==="undefined"){return{}
}var v=n(t.el.find(".link-item-label")),q=t.el.closest(".grid-slide"),s=i(q.data("modalName")),u={};
u.prop3="content grid:modal:"+s+":"+v;
var r=o(p(t.el),g);
if(r){u.eVar5=r
}return u
}return{contentGridOverlayProcessor:h,contentGridOverlayArrowProcessor:d,contentGridHoverCtaProcessor:j,contentGridOverlayCtaProcessor:f,contentGridCtaTextProcessor:m,contentGridOverlayCtaPhoneProcessor:l}
}(a,b.formatText,a.buildEVar5)));
a.config.extend({"nike-cq-content-grid-cta-component":{elementSelector:".nike-cq-grid-lookbook-cta-wrapper a, .nike-cq-misc-content-grid-reference-component .nike-cq-container a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"content grid:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaTextProcessor",followLink:true}},"nike-cq-content-grid-image-hover-cta":{elementSelector:".nike-cq-content-grid-image-overlay, .device-type-phone .nike-cq-content-grid-image:not(.nike-cq-looks-grid-image)",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"content grid:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.contentGridCtaTextProcessor",followLink:true}},"nike-cq-content-grid-image-overlay-page-event":{elementSelector:".nike-cq-content-grid-image-overlay, .device-type-phone .nike-cq-content-grid-image:not(.nike-cq-looks-grid-image)",eventName:"modalPageEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.contentGridOverlayProcessor",followLink:false}},"nike-cq-content-grid-image-overlay-arrow-event":{elementSelector:".nike-cq-content-grid-arrow",eventName:"modalPageEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.contentGridOverlayArrowProcessor",followLink:false}},"nike-cq-content-grid-image-url":{elementSelector:".nike-cq-content-grid-image-url a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.contentGridHoverCtaProcessor",followLink:true}},"nike-cq-content-grid-overlay-cta":{elementSelector:".nike-cq-content-grid-modal-dialog",eventName:"cqModalPageActivity",action:"delegate",delegate:".nike-cq-content-grid-overlay-right a",delegateAction:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"content grid:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.contentGridOverlayCtaProcessor",followLink:true}},"nike-cq-content-grid-overlay-cta-phone":{elementSelector:".device-type-phone .nike-cq-content-grid-container",eventName:"cqModalPageActivity",action:"delegate",delegate:".nike-cq-content-grid-carousel a",delegateAction:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"content grid:modal:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.contentGridOverlayCtaPhoneProcessor"}}})
});
nike.cq.require(["nike.cq.PES.Tracking","nike.cq.Tracking"],function(a,b){a.extend((function(f,h,m){var d=".nike-cq-subtitle-line-1, h2 .grid-overlay-title1, .nike-cq-looks-grid-image-overlay h2:not(.nike-cq-subtitle-headline)";
var g="looks grid";
function k(p){return p.text().replace(/\s+/g," ").trim()
}function l(q){var s=q.parents(".nike-cq-content-grid-inner:first, .nike-cq-content-grid-carousel-list:first");
var r=".nike-cq-grid-cell, .grid-slide:not(.clone)";
var p=q.parents(r+":first");
return s.find(r).index(p)+1
}function j(r){var p=l(r);
var q=r.parents(".nike-cq-looks-grid:first").find(".nike-cq-grid-cell").eq(p-1);
var s=q.find(".nike-cq-looks-grid-image-content .nike-cq-subtitle-line-1").text().replace(/\s+/g," ").trim();
return s!==""?s:e(r)
}function e(p){return p.closest(".nike-cq-looks-grid-image, .overlay-scroller-inner").find("img").attr("alt")
}function o(q){var r=q.closest(".nike-cq-looks-grid-image").find("img");
var p=q.closest(".overlay-scroller").find("img");
if(!r.length){r=p
}return r
}function n(s){if(typeof s.el==="undefined"){return{}
}var p=s.el;
if(s.el.prop("tagName")!=="A"){p=s.el.find(".nike-cq-looks-grid-image-content .nike-cq-cta-component a")
}var v=k(p);
var r=l(p);
var u=j(p);
var t={};
t.prop3="looks grid:"+r+":"+v+":"+u;
var q=m(o(s.el),g);
if(q){t.eVar5=q
}return t
}function i(s){if(typeof s.el==="undefined"){return{}
}var p=s.el.closest(".nike-cq-looks-grid-image-overlay, .nike-cq-looks-grid-image-phone-overlay").find(".nike-cq-cta-component a");
var v=k(p);
var r=l(p);
var u=j(p);
var t={};
t.prop3="looks grid:hover:"+r+":"+v+":"+u;
var q=m(o(s.el),g);
if(q){t.eVar5=q
}return t
}function c(q){if(typeof q.el==="undefined"){return{}
}var r={},p="";
p=q.el.hasClass("nike-cq-sharelinks-item-facebook")?"facebook":p;
p=q.el.hasClass("nike-cq-sharelinks-item-twitter")?"twitter":p;
p=q.el.hasClass("nike-cq-sharelinks-item-pinterest")?"pinterest":p;
p=q.el.hasClass("nike-cq-sharelinks-item-sinaweibo")?"sina_weibo":p;
p=q.el.hasClass("nike-cq-sharelinks-item-tencentweibo")?"tencent_weibo":p;
p=q.el.hasClass("nike-cq-sharelinks-item-qzone")?"qzone":p;
r.shareType=p;
r.interactionType="share:looks grid";
return r
}return{looksGridCtaProcessor:n,looksGridCtaOverlayProcessor:i,looksGridShareLinkProcessor:c}
}(b,b.formatText,a.buildEVar5)));
a.config.extend({"nike-cq-looks-grid-cta-component":{elementSelector:".nike-cq-looks-grid-image-content .nike-cq-looks-grid-cta-component a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.looksGridCtaProcessor",followLink:true}},"nike-cq-looks-grid-image-hover-cta":{elementSelector:".nike-cq-looks-grid-image-overlay .nike-cq-looks-grid-cta-component a, .nike-cq-looks-grid-cta-block-link",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.looksGridCtaOverlayProcessor",followLink:true}},"nike-cq-looks-grid-share-link":{elementSelector:".nike-cq-sharelinks-item",eventName:"shareOptionClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.looksGridShareLinkProcessor",followLink:true}}})
});
nike.cq.require(["jquery","nike.cq.PES.Tracking","nike.cq.Tracking"],function(b,a,c){a.extend((function(l,C,D,g,j,z){function w(R){var K={},U="fst";
var N=R.el;
var O=N.attr("data-tracking");
var L=N.attr("href");
var J=N.closest(".nike-cq-block-component-wrap");
var M=J.attr("data-row-position");
var Q=J.attr("data-column-position");
M++;
Q++;
var P=J.closest(".nike-cq-fst-component");
var H=e(P);
if(P.hasClass("nike-cq-fst-with-video")){U+=":video"
}var G=P.closest(".indexed-pes-reference");
if(G.length>0){var T=G.attr("data-pes-reference-index");
K.prop3=U+":"+T+":"+H+":row"+M+"col"+Q+":"+O
}else{var I=P.closest(".nike-cq-carousel-slide");
if(I.length===0){K.prop3=U+":"+H+":row"+M+"col"+Q+":"+O
}else{var T=I.attr("data-slide-index");
K.prop3=U+":"+T+":"+H+":row"+M+"col"+Q+":"+O
}}var S=z(x(P),"fst");
if(S){K.eVar5=S
}return K
}function e(K){var J="";
if(K.hasClass("nike-cq-fst-with-video")){var I=K.find(".nike-cq-fst-background-video .nike-cq-fst-video-bg-component");
var H=I.attr("data-video-url")||"";
J=H?H.substring(H.lastIndexOf("/")+1):K.find(".nike-cq-fst-background-image img").attr("alt")
}else{var G=K.find(".nike-cq-fst-background-image img");
J=G.attr("alt")
}return J
}function x(G){return G.find(".nike-cq-fst-background-image img")
}function E(I){var J={};
var H=j(I.el);
var K=I.el.closest(".nike-cq-fst-component");
var M=x(K);
var L=M.attr("alt");
J.prop3="fst:label:"+L+":"+H;
var G=z(M,"fst");
if(G){J.eVar5=G
}return J
}function q(H){var I={};
if(typeof(H.el)=="undefined"){return I
}var G=A(H);
I.prop3="fst:label:"+G;
return I
}function k(O){if(typeof O.el==="undefined"){return{}
}var H=O.el.closest(".nike-cq-full-screen-container"),G=O.el.closest(".hotspot"),L=O.el.hasClass("active"),K=L?"close":"open",J="fst",N=t(G),M=F(G),I=s(G);
if(K!=="open"){return{}
}return{prop3:J+":"+K+":"+N+":"+M+":"+g(I)}
}function h(O){if(typeof O.el==="undefined"){return{}
}var H=O.el.closest(".nike-cq-full-screen-container"),G=O.el.closest(".hotspot"),K="fst",I=D(O.el),N=t(O.el),L=F(G),J=(s(G)||o(G));
var M={};
M.prop3=K+":cta:"+g(I)+":"+N+":"+L+":"+g(J);
var P=z(x(H),"fst");
if(P){M.eVar5=P
}return M
}function v(N){if(typeof N.el==="undefined"){return{}
}var H=N.el.closest(".nike-cq-full-screen-container"),G=N.el.closest(".hotspot"),J="fst",M=t(G),K=F(G),I=(s(G)||o(G));
var L={};
L.prop3=J+":click:"+M+":"+K+":"+g(I);
var O=z(x(H),"fst");
if(O){L.eVar5=O
}return L
}function y(N){if(typeof N.el==="undefined"){return{}
}var H=N.el.closest(".nike-cq-full-screen-container"),G=N.el.closest(".hotspot"),J="fst",M=t(G),K=F(G),I=(s(G)||o(G));
var L={};
L.prop3=J+":click:"+M+":"+K+":"+g(I);
var O=z(x(H),"fst");
if(O){L.eVar5=O
}return L
}function r(I){var J={};
if(typeof I.el==="undefined"){return J
}var G=b(I.el).parent().data("id"),K=b(I.el).closest(".nike-cq-tout-toggle-container").find("[data-pes-reference-index="+G+"]"),H=f(K);
J.prop3="fst:slide change:"+G+":"+H;
return J
}function n(I){if(typeof I.el==="undefined"){return{}
}if(I.el[0]&&!b(I.el[0]).hasClass("paused")){return{events:"event55"}
}var H=b(I.el).closest(".nike-cq-fst-background-video");
var G=B(H);
return{prop18:"fst:"+G,eVar47:"fst:"+G,events:"event55"}
}function m(H){var I={};
if(typeof(H.el)=="undefined"){return I
}var G=b(H.el).closest(".nike-cq-fst-carousel").find(".nike-cq-carousel-slide");
var K,J,L;
if(G.length>0){if(H.el.is(".nike-cq-carousel-control-buttonPrevious")){J=G.last()
}else{J=G.next()
}K=J.attr("data-slide-index");
L=J.find(".nike-cq-fst-background-image img").attr("alt")
}I.prop3="fst:slide change:"+K+":"+L;
return I
}function p(J){var K={};
var H=J.el;
if(typeof(H)=="undefined"){return K
}var M=H.closest(".nike-cq-fst-carousel"),I=M.find(".nike-cq-carousel-control-buttonPage"),N,L;
L=I.index(H);
if(L>=0){L=L+1;
var G=M.find(".nike-cq-carousel-slide[data-slide-index="+L+"]");
if(G.length>0){N=x(G).attr("alt")
}}K.prop3="fst:slide change:"+L+":"+N;
return K
}function d(O){if(typeof O.el==="undefined"){return{}
}var Q=O.el.siblings("a").data("tracking");
var M,L,R;
L=O.el.closest(".nike-cq-carousel-slide");
var H=O.el.data("tracking-target-index");
if(!H){return{}
}var K=O.el.closest(".nike-cq-fst"),N=K.find(".nike-cq-fst-background-video"),J=O.el.children().eq(H),G=J.text().trim(),I={};
O.el.data("tracking-target-index",undefined);
if(J.attr("value")==="#"){return{}
}if(L.length>0){M=L.attr("data-slide-index");
R=L.find(".nike-cq-image img").attr("alt");
I.prop3="fst:"+M+":"+R+":"+Q+">"+G
}else{if(N.length>0){I.prop3="fst:video:"+Q+">"+G
}else{I.prop3="fst:"+Q+">"+G
}}var P=z(x(K),"fst");
if(P){I.eVar5=P
}return I
}function i(N){var I={};
if(typeof N.el==="undefined"){return I
}var L=N.el.closest(".nike-cq-fst-component"),J=L.find(".nike-cq-fst-background-video").length>0,G="fst:"+(J?"video:":""),H=L.closest(".nike-cq-carousel-slide"),M=H.length>0?H.attr("data-slide-index")+":":"",K=x(L).attr("alt");
I.prop3=G+M+K+":image";
var O=z(x(L),"fst");
if(O){I.eVar5=O
}return I
}function B(G){var I=G.find("source");
if(I&&I[0]){var H=I[0].src;
return H.substring(H.lastIndexOf("/")+1)
}return""
}function A(H){var I,K,J;
K=H.el.closest(".nike-cq-carousel-slide");
if(K.length>0){I=K.attr("data-slide-index");
J=f(K)
}var G=I+":"+J+":"+j(H.el);
return G
}function f(H){var M=H.find(".nike-cq-block-title").text().replace(/\s+/g," ").trim(),I=H.find(".nike-cq-block-subtitle").text().replace(/\s+/g," ").trim(),K=H.find(".nike-cq-image-component"),G=K.attr("alt"),L=K.attr("src"),J;
if(M.length&&I.length){J=M+"-"+I
}else{if(I.length){J=I
}else{if(G){J=G
}else{J=L
}}}return J
}function t(H){var G=b(H).closest(".hotspot-system").data("hotspot-type").replace("hotspot-type-","");
if(G=="crosshair"){G="benefit"
}else{if(G=="invisible"){G="hidden"
}}return G+" hotspot"
}function o(G){return G.data("hotspot-link-0-url")
}function u(G){return G.data("slide-index")
}function F(H){var G=b(H).attr("id").replace("hotspot","");
return parseInt(G)+1
}function s(G){return b(G).data("hotspot-title")||[b(G).data("hotspot-title1"),b(G).data("hotspot-title2")].join(" ").trim()||b(G).find(".nike-cq-hotspots-title").text()
}return{fstCTAProcessor:w,fstLabelProcessor:E,fstCarouselImageLabelProcessor:q,fstHotspotsProcessor:k,fstHotspotsCtaProcessor:h,fstInvisibleHotspotsProcessor:v,fstShopHotspotsProcessor:y,fstToggleProcessor:r,fstVideoPlayControlProcessor:n,fstCarouselControlButtonProcessor:m,fstCarouselRadioButtonProcessor:p,fstAnchorProcessor:i,fstPhoneStackedCtaProcessor:d}
}(c,a.getDataAttribute,a.elementText,c.formatText,a.getCtaText,a.buildEVar5)));
a.config.extend({"nike-cq-fst-cta":{elementSelector:".nike-cq-block-cta a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstCTAProcessor",followLink:true}},"nike-cq-fst-label-link-component":{elementSelector:".nike-cq-full-screen-container .nike-cq-fst .nike-cq-labels-component a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstLabelProcessor",followLink:true}},"nike-cq-fst-carousel-image-label":{elementSelector:".nike-cq-fst-image-carousel-reference .nike-cq-carousel-slide .nike-cq-labels-label a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstCarouselImageLabelProcessor",followLink:true}},"nike-cq-fst-hotspots-crosshair":{elementSelector:".nike-cq-full-screen-container .nike-cq-hotspots a.tracking-crosshair-hotspot",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstHotspotsProcessor"}},"nike-cq-fst-hotspots-cta":{elementSelector:".nike-cq-full-screen-container .nike-cq-hotspots-link-list a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstHotspotsCtaProcessor"}},"nike-cq-fst-hotspots-invisible":{elementSelector:".nike-cq-full-screen-container .nike-cq-hotspots a.tracking-invisible-hotspot",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstInvisibleHotspotsProcessor"}},"nike-cq-fst-hotspots-shop":{elementSelector:".nike-cq-full-screen-container .nike-cq-hotspots a.tracking-shop-hotspot",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstShopHotspotsProcessor"}},"nike-cq-fst-toggle":{elementSelector:".nike-cq-fst-toggle-container .nike-cq-toggle-component a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstToggleProcessor",followLink:false}},"nike-cq-fst-video-play-video-control":{elementSelector:".nike-cq-fst .nike-cq-fst-background-video a.nike-cq-fst-video-play-pause-button.paused",eventName:"fstVideoClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstVideoPlayControlProcessor"}},"nike-cq-fst-carousel-control-button-next":{elementSelector:".nike-cq-fst-image-carousel-reference .nike-cq-carousel-control-buttonNext",eventName:"cqPageActivity",action:"buttonNextClick","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstCarouselControlButtonProcessor"}},"nike-cq-fst-carousel-control-button-previous":{elementSelector:".nike-cq-fst-image-carousel-reference .nike-cq-carousel-control-buttonPrevious",eventName:"cqPageActivity",action:"buttonPreviousClick","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstCarouselControlButtonProcessor"}},"nike-cq-fst-carousel-radio-button":{elementSelector:".nike-cq-fst-image-carousel-reference .nike-cq-carousel-control-buttonPage",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstCarouselRadioButtonProcessor"}},"nike-cq-fst-anchor":{elementSelector:".nike-cq-fst-anchor",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.fstAnchorProcessor"}}})
});
nike.cq.require(["nike.cq.PES.Tracking","nike.cq.Tracking"],function(a,b){a.extend((function(d,e,j,k){var g="editorial grid";
function i(l){return l.closest(".nike-cq-editorial-block").find(".nike-cq-image img")
}function h(r){var s={};
if(typeof(r.el)=="undefined"){return s
}var p,m,l;
p=r.el.closest(".nike-cq-editorial-grid-grid li");
if(p.length>0){l=f(p);
var q=p.find(".nike-cq-subtitle-line-1");
m=j(q)
}var o=r.el.attr("imagelink-text");
s.prop3=g+":"+l+":"+m+":image:"+o;
var n=k(i(r.el),g);
if(n){s.eVar5=n
}return s
}function f(m){var l=-1;
if(m.length>0){var n=m.parent().children();
l=n.index(m);
l=l>=0?l+1:l
}return l
}function c(r){var s={};
if(typeof(r.el)=="undefined"){return s
}var o,m,l;
o=r.el.closest(".nike-cq-editorial-grid-grid li");
if(o.length>0){l=f(o);
var p=o.find(".nike-cq-subtitle-line-1");
m=j(p)
}var q=j(r.el);
s.prop3=g+":"+l+":"+m+":"+q;
var n=k(i(r.el),g);
if(n){s.eVar5=n
}return s
}return{editorialGridImageProcessor:h,editorialGridCtaProcessor:c}
}(b,a.getDataAttribute,a.elementText,a.buildEVar5)));
a.config.extend({"nike-cq-editorial-grid-image":{elementSelector:".nike-cq-editorial-block-container>a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.editorialGridImageProcessor",followLink:true}},"nike-cq-editorial-grid-hyperlink":{elementSelector:".nike-cq-editorial-block .nike-cq-text-link a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.editorialGridCtaProcessor",followLink:true}},"nike-cq-editorial-grid-cta":{elementSelector:".nike-cq-editorial-grid .nike-cq-cta-component a",eventName:"toutClickEvent",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.editorialGridCtaProcessor",followLink:true}}})
});
nike.cq.require(["nike.cq.PES.Tracking","nike.cq.Tracking"],function(a,b){a.extend((function(d,c){return{productLaunchRelatedCardProduct:function(f){if(typeof f.el==="undefined"){return{}
}var e=c(f.el.find(".nike-cq-product-launch-body-sidebar-related-card-title"));
return{prop3:d.replaceValues(f.data.prop3,e)}
},productLaunchHeroSlideshowChange:function(h){if(typeof h.el==="undefined"){return{}
}var i={},g=function(n){var l="",m=n.find("img");
if(m.attr("alt").length){return":"+m.attr("alt")
}else{if(m.data("imageName").length){return":"+m.data("imageName")
}}return l
};
if(typeof(h.el)=="undefined"){return i
}var f=h.el.closest(".nike-cq-product-launch-hero-slideshow-component"),j=f.data("current-slide-index"),k=f.find(".nike-cq-product-launch-hero-slideshow-slide-"+j+":not(.clone)"),e="";
if(h.data.showCreativeText!==false){e=g(k)
}i.prop3=d.replaceValues(h.data.prop3,j)+e;
return i
}}
}(b,a.elementText)));
a.config.extend({"nike-cq-product-launch-faq-link":{elementSelector:".nike-cq-product-launch-body-sidebar-links-faq a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"launch calendar:faq:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaTextProcessor",followLink:true}},"nike-cq-product-launch-back-to-launch-link":{elementSelector:".product-launch-calendar-link a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"launch calendar:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaTextProcessor",followLink:true}},"nike-cq-product-launch-related-card-link":{elementSelector:".nike-cq-product-launch-body-sidebar-related-card a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"launch calendar:you may also like:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.productLaunchRelatedCardProduct",followLink:true}},"nike-cq-product-launch-tagcloud-link":{elementSelector:".nike-cq-product-launch-body-sidebar-tagcloud a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"launch calendar:tag selection:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.ctaTextProcessor",followLink:true}},"nike-cq-product-launch-hero-slideshow-navigation":{elementSelector:"body",eventName:"cqPageActivity",action:"delegate",delegate:".nike-cq-product-launch-hero-slideshow-component button, .nike-cq-product-launch-hero-slideshow-select-slide-link",delegateAction:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"p1 hero slideshow:slide change:[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.productLaunchHeroSlideshowChange",followLink:false}}})
});
nike.cq.require(["jquery","nike.cq.PES.Tracking","nike.cq.Tracking"],function(b,a,c){a.extend((function(h,g,e,f){var i="active page title";
function d(m){var n={};
if(typeof(m.el)!=="object"){return n
}var p=g(m);
if(p!=""){p=h.formatTextPreservingGreaterThanChar(p)
}if(typeof m.data!=="undefined"&&typeof m.data.prop3!=="undefined"){p=h.replaceValues(m.data.prop3,p)
}if(p!==""){if(m.el.closest(".nike-cq-launch-story-page").length){if(m.el.closest(".nike-cq-active-page-title-wrapper").length){p=i+":"+p;
p="launch calendar:"+p
}else{p="launch calendar:"+p
}}else{p=i+":"+p
}n.prop3=p
}var l=m.el.closest(".nike-cq-active-page-title-wrapper");
var o=l.find(".nike-cq-active-page-title-title-component span");
var j=e(o);
var k=f(l,j,i);
if(k){n.eVar5=k
}return n
}return{aptCTAProcessor:d}
})(c,a.getDataAttribute,a.elementText,a.buildPageEVar5));
a.config.extend({"nike-cq-active-page-title-cta-component":{elementSelector:".nike-cq-active-page-title-cta .nike-cq-cta-component a, .nike-cq-product-launch-body .nike-cq-cta a",eventName:"cqPageActivity",action:"click","jcr:primaryType":"nt:unstructured",data:{prop3:"[elementText]"},dataConfig:{eventProcessor:"nike.cq.PES.Tracking.aptCTAProcessor",followLink:true}}})
});
nike.cq.require(["jquery","nike.cq.Tracking","nike.cq.PES.Tracking"],function(b,c,a){b(function(){c.init(a)
})
});
/*!
 {
 "name": "IE",
 "property": "ie",
 "authors": ["Jack Bishop", "Joshua Hansen"]
 }
 !*/
Modernizr.addTest("ie",function(){return window.navigator.userAgent.match(/msie/i)
});
/*!
 {
 "name": "IE10 check",
 "property": "ie10",
 "authors": ["Jack Bishop", "Joshua Hansen"]
 }
 !*/
Modernizr.addTest("ie10",function(){return Function("/*@cc_on return document.documentMode===10@*/")()
});
nike.cq.require(["jquery"],function(a){a(function(){var c=a("body"),d=a(".nike-cq-active-page-title-optional").length,e=a(".nike-cq-active-page-title"),f="has-active-page-title",b="cq-has-active-page-title",k=a(".nike-cq-content"),i=c.data("cmsMode")!=="EDIT",h=e.length>0&&d==0&&i,g=a(".nike-cq-iframe-container-page").length>0&&d>0&&i,j=a(".nike-cq-nike-com-page").length>0&&d>0&&i;
if(h){k.addClass(f);
a(".nike-cq-page-container-inner").addClass(b)
}else{if(g){a(".nike-cq-iframe-container-page:first").addClass(b)
}else{if(j){a(".nike-cq-nike-com-page:first").addClass(b)
}}}if(Modernizr.touch){if(a(".gnav").length>0&&a(".nike-cq-page-module.nike-cq-active-page-title").length>0){k.removeClass(f);
a(".nike-cq-active-page-title .nike-cq-cta-component nav > ul").css({position:"relative",top:"-15px"})
}}})
});
nike.cq.define("nike.cq.NikeCom.EditorialGrid",["jquery"],function(d){var b={CONTAINER_SELECTOR:".nike-cq-editorial-grid-reference"},a=undefined,c=function(){a.each(function(){var h=d(this),g=h.find("li"),i=0;
g.each(function(){var k=d(this),j=k.offset().top+k.height();
if(j>i){i=j
}});
h.height(i-h.offset().top);
h.css("min-height","0")
})
},f=function(){a=d(b.CONTAINER_SELECTOR);
if(a.length){e();
c()
}},e=function(){d(window).resize(c)
};
d(function(){f()
});
return{init:f}
});
nike.cq.define("nike.cq.NikeCom.FollowUs",["jquery"],function(g){var h={};
var e=function(){h.container.append('<div class="nike-cq-follow-us-button nike-cq-cta-component nike-cq-cta-text-color-666666 nike-cq-cta-text-size-15 nike-cq-cta-style-curved nike-cq-cta-width-110 nike-cq-cta-height-40 nike-cq-cta-color-dddddd nike-cq-cta-alignment-textlefticonfarright nike-cq-cta-icon-arrowdarkgraydown"><a href="#"><span>'+h.moreText+"</span></a></div>");
h.button=h.container.find(".nike-cq-follow-us-button a");
h.button.parent().hide();
h.showOrHideButton()
};
var d=function(){h.list.css({overflow:"visible",height:"auto"});
h.mask=h.container.find(".nike-cq-follow-us-mask")
};
var c=function(){var i=h;
i.button.click(function(j){j.preventDefault();
if(i.state===0){i.showRows(i.delay,i.speed)
}else{i.hideRows(i.delay,i.speed)
}});
g(window).resize(function(){clearTimeout(i.resizeThrottle);
i.resizeThrottle=setTimeout(a,i.resizeThrottleDelay)
})
};
var a=function(){h.openHeight=h.list.height();
if(h.moving!==true&&h.state===1&&h.mask.height()>h.list.height()){h.showRows(0,h.speed/2)
}if(h.moving!==true&&h.state===1&&h.mask.height()<h.list.height()){h.showRows(0,h.speed/2)
}h.showOrHideButton()
};
var f=function(){h.listWidth=h.list.width();
h.columnWidth=h.listItems.first().outerWidth();
h.numColumns=Math.floor(h.listWidth/h.columnWidth);
h.numRows=h.listItems.length/h.numColumns
};
var b=function(){var k=-1*(Math.floor(h.numRows)-h.numRows);
if(!k){k=1
}var m=h.numColumns*k;
for(var j=h.listItems.length;
j>0;
j--){var l=h.listItems[j];
if(j>=(h.listItems.length-m)){g(l).find(".nike-cq-follow-wrapper").css({"border-bottom":"none"})
}}};
g.extend(h,{container:null,list:null,mask:null,button:null,state:0,delay:500,speed:600,fadeSpeed:500,closedHeight:240,openHeight:null,moving:false,moreText:"More",lessText:"Less",resizeThrottle:null,resizeThrottleDelay:100,minItems:4,listWidth:null,columnWidth:null,numColumns:null,visibleRows:2,init:function(){h.container=g(h.container);
h.list=g(h.list);
h.listItems=h.list.find(h.listItems);
h.closedHeight=h.listItems.outerHeight(true)*h.visibleRows;
h.list.contents().filter(function(){return this.nodeType===3
}).remove();
h.openHeight=h.list.height();
if(h.list.children().length>h.minItems){d();
e();
c()
}else{b()
}},showRows:function(i,j){var k=h;
k.button.addClass("loading");
k.moving=true;
k.mask.stop().delay(i).animate({height:k.openHeight},j/2,function(){k.state=1;
k.moving=false;
k.resetButton("less");
k.showOrHideButton()
})
},hideRows:function(i,j){var k=h;
k.button.addClass("loading");
k.moving=true;
k.mask.stop().delay(i).animate({height:k.closedHeight},j/2,function(){k.state=0;
k.moving=false;
k.resetButton("more");
k.showOrHideButton()
})
},showOrHideButton:function(){var i=h;
if(i.moving!==true&&i.state===0&&i.list.height()>i.closedHeight){i.button.parent().fadeIn(i.fadeSpeed)
}if(i.moving!==true&&i.state===0&&i.list.height()==i.closedHeight){i.button.parent().fadeOut(i.fadeSpeed)
}if(i.moving!==true&&i.state===1&&i.list.height()>i.closedHeight){i.button.parent().fadeIn(i.fadeSpeed)
}if(i.moving!==true&&i.state===1&&i.list.height()==i.closedHeight){i.button.parent().fadeOut(i.fadeSpeed,function(){i.state=0;
i.resetButton("more")
})
}},resetButton:function(i){switch(i){case"more":h.button.removeClass("loading").removeClass("open");
h.button.parent().removeClass("nike-cq-cta-icon-arrowdarkgrayup").addClass("nike-cq-cta-icon-arrowdarkgraydown");
h.button.find("span").text(h.moreText);
break;
case"less":h.button.removeClass("loading").addClass("open");
h.button.parent().removeClass("nike-cq-cta-icon-arrowdarkgraydown").addClass("nike-cq-cta-icon-arrowdarkgrayup");
h.button.find("span").text(h.lessText);
break;
default:break
}}});
g(function(){var j=g(".nike-cq-follow-us"),i=g(".nike-cq-follow-hidden");
if(j.length){h.lessText=i.data("less-text");
h.moreText=i.data("more-text");
h.delay=100;
h.speed=1000;
h.container=".nike-cq-follow-us .nike-cq-follow-component";
h.list=".nike-cq-follow-us ul.nike-cq-follow-pages";
h.listItems=".nike-cq-follow-page";
h.init()
}});
return h
});
nike.cq.define("nike.cq.NikeCom.StoryPageHero",["jquery","nike.cq.UI.VideoPlayingElement","nike.cq.UI.Component.Slideshow","nike.cq.PES.Gestures"],function(e,c,d,f){var b=function(){c(".nike-cq-story-hero-video .video-thumbnail")
};
var a=function(){var h=e(".nike-cq-story-hero-slideshow-component");
var k;
h.each(function(){k=new d(this);
f.register({$element:e(this),nextButton:".nike-cq-story-hero-slideshow-next-slide-button",previousButton:".nike-cq-story-hero-slideshow-previous-slide-button"})
});
e(".nike-cq-story-hero-slideshow-slide-description").css({opacity:"0.0",display:"block"});
var l=false,j=e("html").hasClass("ie8")?"0.7":"1.0",m=".nike-cq-story-hero-slideshow-slide-selected .nike-cq-story-hero-slideshow-slide-description",i=1000;
h.bind("mouseenter",function(){l=true;
e(this).find(m).stop().animate({opacity:j},i)
}).bind({mouseleave:function(){l=false;
e(this).find(m).stop().animate({opacity:"0.0"},i)
},slidestart:function(){e(this).find(m).stop().animate({opacity:"0.0"},i)
},slideend:function(){if(l){e(this).find(m).stop().animate({opacity:j},i)
}}}).delegate(".nike-cq-story-hero-slideshow-slide","click",function(){var o=e(this);
if(!o.hasClass("nike-cq-story-hero-slideshow-slide-selected")){if(o.offset().left<e(document).width()/2){k.previous()
}else{k.next()
}}});
var n=0;
if(window.matchMedia){var g=window.matchMedia("(max-width: 960px)");
g.addListener(function(){n=k.getCurrentSlideIndex();
k.setSlideWidth();
k.slideTo(n)
})
}else{e(window).resize(function(){n=k.getCurrentSlideIndex();
k.setSlideWidth();
k.slideTo(n)
})
}};
e(function(){b();
if(e(".nike-cq-story-hero .nike-cq-story-hero-slideshow-component").length){a()
}});
return{videosInit:function(){b()
},slideshowInit:function(){a()
}}
});
nike.cq.define("nike.cq.NikeCom.StoryPageBody",["jquery","nike.cq.UI.VideoPlayingElement"],function(c,b){var a=function(){b(".nike-cq-story-body-video .video-thumbnail")
};
c(function(){if(c(".nike-cq-story-body-video").length){a()
}});
return{init:function(){a()
}}
});
nike.cq.define("nike.cq.NikeCom.ProductLaunchPageHero",["jquery","nike.cq.UI.VideoPlayingElement","nike.cq.UI.Component.Slideshow","nike.cq.PES.Gestures"],function(f,g,b,c){var e=function(){g(".nike-cq-product-launch-hero-video .video-thumbnail")
};
var h=0,j;
var d=function(){var m=f(".nike-cq-product-launch-hero-slideshow-component");
m.each(function(){j=new b(this);
f(this).find(".nike-cq-product-launch-hero-slideshow-slide-image").load(function(){a(f(this))
});
c.register({$element:f(this),nextButton:".nike-cq-product-launch-hero-slideshow-next-slide-button",previousButton:".nike-cq-product-launch-hero-slideshow-previous-slide-button"})
});
f(".nike-cq-product-launch-hero-slideshow-slide-description").css({opacity:"0.0",display:"block"});
var o=false;
var n=f("html").hasClass("ie8")?"0.7":"1.0",l=j.getSlideCount();
m.bind("mouseenter",function(){o=true;
f(this).find(".nike-cq-product-launch-hero-slideshow-slide-selected .nike-cq-product-launch-hero-slideshow-slide-description").stop().animate({opacity:n},1000)
}).bind("mouseleave",function(){o=false;
f(this).find(".nike-cq-product-launch-hero-slideshow-slide-selected .nike-cq-product-launch-hero-slideshow-slide-description").stop().animate({opacity:"0.0"},1000)
}).bind("slidestart",function(){f(this).find(".nike-cq-product-launch-hero-slideshow-slide-selected .nike-cq-product-launch-hero-slideshow-slide-description").stop().animate({opacity:"0.0"},1000)
}).bind("slideend",function(q,p){if(o){f(this).find(".nike-cq-product-launch-hero-slideshow-slide-selected .nike-cq-product-launch-hero-slideshow-slide-description").stop().animate({opacity:n},1000)
}if(p<0){p=l
}else{if(p>=l){p=1
}else{p+=1
}}f(this).data("current-slide-index",p)
}).delegate(".nike-cq-product-launch-hero-slideshow-slide","click",function(){$this=f(this);
if(!$this.hasClass("nike-cq-product-launch-hero-slideshow-slide-selected")){if($this.offset().left<f(document).width()/2){j.previous()
}else{j.next()
}}});
if(window.matchMedia){var k=window.matchMedia(" (max-width: 960px)");
k.addListener(function(){i();
f(".nike-cq-product-launch-hero-slideshow-component .nike-cq-product-launch-hero-slideshow-slide-image").each(function(){a(f(this),true)
})
})
}else{f(window).resize(function(){i();
f(".nike-cq-product-launch-hero-slideshow-component .nike-cq-product-launch-hero-slideshow-slide-image").each(function(){a(f(this),true)
})
})
}};
var i=function(){var k=j.getCurrentSlideIndex();
j.setSlideWidth();
j.slideTo(k)
};
var a=function(n,k){if(k){h=0
}var m=n.height();
if(m>h){h=m;
var l=n.parents(".nike-cq-product-launch-hero-slideshow-component");
l.height(h+40);
l.find(".nike-cq-product-launch-hero-slideshow-slides").height(h)
}};
f(function(){e();
if(f(".nike-cq-product-launch-hero .nike-cq-product-launch-hero-slideshow-component").length){d()
}});
return{videosInit:function(){e()
},slideshowInit:function(){d()
}}
});
nike.cq.define("nike.cq.NikeCom.ProductLaunchBody",["jquery","nike.cq.UI.VideoPlayingElement"],function(c,b){var a=function(){b(".nike-cq-product-launch-body-video .video-thumbnail")
};
c(function(){if(c(".nike-cq-product-launch-body-video").length){a()
}});
return{init:function(){a()
}}
});
nike.cq.define("nike.cq.NikeCom.TeamSelector",["jquery","nike.cq.Utils","nike.cq.UI.Component.LiquidCarousel"],function(c,b,e){var a=function(i){var j=c(".nike-cq-team-selector-tooltip");
var h=200;
if(j.length<1){j=c('<div class="nike-cq-team-selector-tooltip"><div class="nike-cq-team-selector-tooltip-content"></div><div class="nike-cq-team-selector-tooltip-content-arrow"></div></div>').appendTo("body").hide()
}var k;
function g(o,l){j.find(".nike-cq-team-selector-tooltip-content").html(o);
var m=j.width();
var n=l.offset();
j.css({left:n.left,top:n.top,"margin-left":parseInt(-(m-l.width())/2)+"px"});
j.fadeIn("fast")
}function f(){j.hide()
}i.delegate(".nike-cq-team-selector-link-item",{mouseenter:function(){var l=c(this),m=l.find("img").attr("alt");
k=setTimeout(function(){g(m,l)
},h)
},mouseleave:function(l){if(k){clearTimeout(k);
k=null
}f()
}})
};
var d=function(){var i=i||c("body");
var h=400;
var f="initialized";
var g=b.detectLeftNav("both")?1229:960;
if(i.data("cmsMode")!=="EDIT"){c(".nike-cq-team-selector-module").each(function(){var k=c(this),j=k.find(".nike-cq-section-team-selector").data("open"),o=k.find(".nike-cq-team-selector-reference"),s=k.find(".nike-cq-team-selector-component"),p=k.find(".nike-cq-team-selector-subtitle-line-1"),l=k.find(".nike-cq-team-selector-tab"),n=k.data(f);
if(n){return
}if(j){p.addClass("open")
}else{o.hide()
}if(s){var m={tabContainer:l.parent(".nike-cq-team-selector-tab-container")};
var r=new e(s,m);
a(r.resourceEl)
}l.click(function(){o.slideToggle(h);
p.toggleClass("open")
});
var t=k.closest(".nike-cq-p1").find(".nike-cq-p1-reference-component");
k.closest(".nike-cq-container").css("padding-top","0px");
function q(){if(c(window).width()<=g){t.removeClass("nike-cq-team-selector-p1-module-fixed-height");
t.addClass("nike-cq-team-selector-p1-module-fixed-height-short")
}else{t.addClass("nike-cq-team-selector-p1-module-fixed-height");
t.removeClass("nike-cq-team-selector-p1-module-fixed-height-short")
}}q();
var u=null;
c(window).resize(function(){if(u){clearTimeout(u)
}u=setTimeout(q,50)
});
k.data(f,true)
})
}};
c(d);
return{init:d}
});
nike.cq.define("nike.cq.NikeCom.Iframe",["jquery"],function(g){var e,f,h,c=undefined,k=undefined,d=undefined;
function a(l){c=e.contents();
k=c.find("html:first");
d=c.find("body:first");
if(c.length>0&&c.get(0).readyState==="complete"){k.css("height","auto");
d.css("height","auto");
if(d.length>0){f=d.height()
}else{f=c.height()
}if(f>0){e.height(f)
}}setTimeout(function(){window.requestAnimationFrame(a)
},1000)
}function i(){h=e.width();
e.width(h-1);
e.removeAttr("style")
}function b(){var m;
try{c=e.contents();
m=true
}catch(l){m=false
}return m
}function j(){e=g("#iframe-container");
if(e.length===0||!b()){return
}window.requestAnimationFrame(a);
setTimeout(i,3000)
}g(function(){j()
});
return{init:j}
});
nike.cq.ns("nike.cq.NikeCom");
nike.cq.require(["nike.cq.PES.leftNavigation","nike.cq.NikeCom.TeamSelector","nike.cq.PES.ContentGrid","nike.cq.PES.Notification","nike.cq.initializer"],function(){var a=Array.prototype.slice.call(arguments);
nike.cq.NikeCom.reload=function(){for(var b=0;
b<a.length;
++b){if(typeof a[b].init==="function"){a[b].init()
}else{if(typeof a[b]==="function"){a[b]()
}}}}
});