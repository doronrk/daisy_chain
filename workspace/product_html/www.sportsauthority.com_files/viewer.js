(function(x,U){var ag,p=80,g,L,aq,u=0,ai,T="Go Back",aa="Go Back",C=[],Z,I={width:0,height:0},aM,av,am,S,aH=[],ad,aw="<html><head><style>body{ border: none; overflow: hidden; overflow-x: hidden; overflow-y: hidden; }</style></head><body></body></html>",k,aK,A,h,s,D=0,aJ=0,aA,W,ax="img[src$=.png],div.InvodoBranding,div.InvodoCloseBtn",r="div.InvodoHeader",c=false,ap=0,an,aG,aI,P={position:0,rate:0},O={position:0,rate:0},K={position:0,rate:0},J={position:0,rate:0},H={position:0,rate:0},G={position:0,rate:0},F={position:0,rate:0},E={position:0,rate:0},B,j=0,al,aD,ar=70,e,aN,z,aB=false,ac,Y=function(aP){Z.Video=ac=aP;
return Z
},ab,q,aO,f,b,V,y={},i={},m,aj,ao=["inPlayerSwf"],w=false;
function ae(){return u
}function ak(){return ai||"unknown"
}function v(){return D
}function d(aP,aQ){aQ=aQ||{};
aQ.pod=aQ.pod||ai;
aQ.frame=aQ.frame||aq;
if(!aQ.exp&&g.viewerConfigs[ai].exp){aQ.exp=g.viewerConfigs[ai].exp
}s(aP,aQ)
}function ay(aP){j=aP.pageX-al
}function at(aS){var aR=parseInt(aD.css("left"))||0;
var aQ=0;
var aP=0;
if(j<O.position){aP=O.rate
}else{if(j<K.position){aP=K.rate
}else{if(j<J.position){aP=J.rate
}else{if(j<H.position){aP=H.rate
}else{if(j<G.position){aP=G.rate
}else{if(j<F.position){aP=F.rate
}else{if(j<E.position){aP=E.rate
}else{aP=P.rate
}}}}}}}aQ=aR+aP;
ap=an-aD.width()+ar;
if(aQ>P.position){aQ=P.position
}if(aQ<(ap-(D*15))){return
}aD.css("left",aQ+"px")
}function X(aQ){try{aG=k.find(".InvodoControls");
al=aG.offset().left;
aD=k.find(".InvodoSliderFrames");
if(parseInt(aD.css("width"))>parseInt(aG.css("width"))){an=parseInt(aG.css("width"));
var aP=parseInt(an)/7;
P={position:0,rate:0};
O={position:aP,rate:10};
K={position:aP*2,rate:3};
J={position:aP*3,rate:1};
H={position:aP*4,rate:0};
G={position:aP*5,rate:-1};
F={position:aP*6,rate:-3};
E={position:aP*7,rate:-10};
f.bind("mousemove",ay);
B=setInterval(at,40)
}}catch(aQ){}}function aF(aP){f.unbind("mousemove",ay);
clearInterval(B)
}function N(aP){var aQ=h(this).attr("rel");
af(aQ)
}function M(aP){U.__Viewer.hide();
if(typeof y[ai]==="function"){try{y[ai](ai)
}catch(aQ){d("errorCtaClick")
}}}function aE(aS,aR,aQ,aP){if(typeof g.loadableResources[aR]==="undefined"){var aT=g.versionedJsUri(aR+".viewer.invodo");
g.loadableResources[aR]=g.buildResourceObject(aT,"js",(function(){return function(){x.Invodo.__Viewer[aQ].__tunnel(aP)
}
})(aQ,aP),false);
aS.push(aR)
}}function t(aR){aB=false;
if(f){f.unbind("mouseenter",X);
f.unbind("mouseleave",aF)
}else{ab=k.find(".InvodoViewerControlsContainer");
q=k.find(".InvodoViewerControlsContainerRight");
aO=k.find(".InvodoViewer .InvodoControls");
f=aO.find(".InvodoSlider");
b=aO.find(".InvodoSliderFrames");
S=k.find(".InvodoFrameReplay")
}if(Z.viewerMode==="o"){b.empty();
V.find(".InvodoBtnText").text(i[aR]||T)
}aE(ao,"video","Video",Y);
var aS=g.viewerConfigs[aR].frames;
D=aS.length;
for(var aP=0;
aP<D;
aP++){var aQ=aI.clone();
aQ.addClass("InvodoSliderFrame").attr("rel",aP);
aQ.find("img").attr("src",aS[aP].thumbnailUrl);
b.append(aQ);
aQ.bind("click",N)
}f.bind("mouseenter",X);
f.bind("mouseleave",aF);
aO.bind("selectstart dragstart",g.noop);
aO.find("*").bind("selectstart dragstart",g.noop);
S.bind("click",aL);
if(g.ua.browser=="msie"&&parseInt(g.ua.browserVer)==8&&document.compatMode=="BackCompat"){k.find(".InvodoViewerControlsContainer").addClass("InvodoIe8BackCompatViewerControlsContainer");
k.find(".InvodoCtaContainer").addClass("InvodoIe8BackCompatCtaContainer");
k.find(".InvodoFooter").addClass("InvodoIe8BackCompatFooter")
}if(g.ua.browser=="msie"&&parseInt(g.ua.browserVer)==7&&document.compatMode=="BackCompat"){k.find(".InvodoFooter").addClass("InvodoIe7BackCompatFooter")
}if(g.ua.browser=="msie"&&parseInt(g.ua.browserVer)<7){k.find(".InvodoSlider").addClass("InvodoIe6Slider");
k.find(".InvodoCtaContainer").addClass("InvodoIe6CtaContainer");
k.find(".InvodoViewerControlsContainer").addClass("InvodoIe6ViewerControlsContainer");
k.find(".InvodoViewer").addClass("InvodoIe6Viewer");
k.find(".InvodoBottomCap").addClass("InvodoIe6BottomCap");
k.find(".InvodoLabel").addClass("InvodoIe6Label");
k.find(".InvodoCover").addClass("InvodoIe6Cover");
k.find(".InvodoHeader").addClass("InvodoIe6Header");
k.find(".InvodoCloseBtn").addClass("InvodoIe6CloseBtn");
k.find(".InvodoFooter").addClass("InvodoIe6Footer");
k.find(".InvodoCtaContainer").addClass("InvodoIe6CtaContainer");
k.find(".InvodoCta").addClass("InvodoIe6Cta");
k.find(".InvodoViewerControlsContainer").addClass("InvodoIe6ViewerControlsContainer");
k.find(".InvodoViewerControlsContainerRight").addClass("InvodoIe6ViewerControlsContainerRight");
k.find(".InvodoPanel").addClass("InvodoIe6InvodoPanel")
}g.loadResourcesAndExec(ao)
}function az(){return U.__Viewer.footerMode
}function aL(){av.hide();
af(0)
}function R(){av.css("display","block");
av.html('<div style="background:url('+g.canonicalUri(aA,g.resourcePath+"/i/mer/")+') no-repeat center center;height:100%;"></div>');
av.bind("click",aL);
av.css("cursor","pointer");
Q(av);
W.css("display","none")
}function a(aP){av.html(aP);
av.css("display","block")
}function aC(){av.css("display","none");
av.unbind("click");
av.empty()
}function ah(aQ){var aP=k.find("#InvodoVideoPlayer").get(0);
try{aP.inPlayerPauseVideo()
}catch(aR){console.log("pauseViewer error: "+aR)
}}function o(){var aP=k.find("#InvodoVideoPlayer").get(0);
try{aP.inPlayerPlayVideo()
}catch(aQ){console.log("playViewer error: "+aQ.message)
}}function au(){var aQ,aP;
function aR(aS){if(g.isString(aS)){aQ=aS
}else{if(aS){aQ=aS.podId;
aP=aS.podFrame;
if(!aQ){aQ=g.resolvePodId(aS)
}}}}if(arguments.length>=2){aR(arguments[0]);
aP=arguments[1]
}else{if(arguments.length===1){aR(arguments[0])
}else{if(arguments.lenth===0){return
}}}if(!aP){aP=0
}else{aP=parseInt(aP)
}g.loadResourcesAndExec(ao,function(){ac.initVideoFrame(aP,aQ);
aC();
u=Z.currentFrameId=aP;
ai=Z.currentPodId=aQ;
Z.currentFrameId=aq=g.viewerConfigs[ai].frames[u].durableId;
Z.frameDimensions=I={width:am.width(),height:am.height()};
e=D*ar;
f.width(e);
if(D<2){aO.css("display","none");
ab.css("display","none")
}L=h(document).find("#InvodoHybridCTA_"+aQ);
if(L.find("#Invodo").length<1){L.append(k)
}if(!w){w=true;
if(Z.viewerMode==="o"){aN=0
}else{k.css({position:"absolute",top:"0px"})
}k.css({display:"block"});
g.podViewed[g.podViewed.length]=aQ;
d("viewerShow")
}d("frameShow");
var aS=g.viewerConfigs[ai];
aM="#"+(aS.config.frontcolor||"FFFFFF");
ag="#"+(aS.config.backcolor||"000000");
f.find("li").removeClass("InvodoActive").css("background",ag);
f.find("li").eq(u).addClass("InvodoActive").css("background",aM);
W.css("display","block");
g.frameViewed[g.frameViewed.length]=aq
})
}function af(aP){u=parseInt(aP);
var aQ=g.viewerConfigs[ai];
aq=aQ.frames[aP].durableId;
n(aQ.frames[aP]);
b.find("li").removeClass("InvodoActive").css("background-color",ag);
b.find("li:eq("+aP+")").addClass("InvodoActive").css("background-color",aM);
u=aP;
d("viewerSwitchCurrentFrame")
}function n(aP){d("playClip");
if(aP.type=="video"){ac.playClip.apply(null,arguments)
}}function Q(aP){if(h.browser.msie&&h.browser.version<7){g.loadResourcesAndExec(g.iFixPngResources,(function(){return function(){aP.ifixpng()
}
})(aP))
}}U.__Viewer={};
U.__Viewer.__tunnel=function(aP){U.__Viewer.__tunnel=z;
Z.core=g=aP(Z);
s=g.logEvent
};
U.__Viewer.init=function(a1,aR){Z.viewerMode=aR.type;
if(!h){h=g.$jq
}var a6=g.viewerConfigs[a1].config;
var aW=g.viewerConfigs[a1]&&g.viewerConfigs[a1].config,a0=(aW?g.viewerConfigs[a1].config.frontcolor:false)||"FFFFFF",aV=(aW?g.viewerConfigs[a1].config.backcolor:false)||"000000",aT=(aW?g.viewerConfigs[a1].config.height:"270")||"270",aP=(aW?g.viewerConfigs[a1].config.width:"480")||"480";
var aQ="black";
var aU="64";
if(a6&&a6.playbuttoncolor){aQ=a6.playbuttoncolor
}if(a6&&a6.playbuttonsize){aU=a6.playbuttonsize
}if(aR.previewImagePlayButton&&aR.previewImagePlayButton.length&&aR.previewImagePlayButton.length>1){aA=aR.previewImagePlayButton
}else{aA="playbutton_"+(aQ)+"_"+(aU)+"px.png"
}if(!ad){ad=h("<div></div>").css({"class":"InvodoHybridImageCTA",position:"relative",display:"block"});
ad.append(h("<div></div>").addClass("InvodoEVPCTAOverlay"))
}if(!k){Z.$Invodo=k=h("<div></div>").attr({id:"Invodo"});
h("body").append(k);
k.hide();
var aS=g.templates;
if(aR.type==="e"){h(aS[8]).appendTo(k)
}else{h(aS[0]).appendTo(k);
h(aS[1]).appendTo(k)
}m=h(aS[2]);
aI=h(aS[3]);
aH.video=h(aS[4]);
aH.noflash=h(aS[7]);
aH.evp=h(aS[8]);
W=k.find("#InvodoVideoPlayer");
am=k.find(".InvodoFrameHolder");
am.height(aT+"px");
am.width(aP+"px");
A=k.find(".InvodoViewer");
ab=k.find(".InvodoViewerControlsContainer");
q=k.find(".InvodoViewerControlsContainerRight");
ab.css("width",(aP-120)+"px");
q.css("width",(aP-120)+"px");
aO=k.find(".InvodoControls");
aO.css("width",(aP-130)+"px");
var a7=(Number(aT)+p)+"px";
var aY=aR.type;
if(aY==="e"){A.height(aT+"px")
}else{A.height(a7)
}A.width(aP+"px");
var aX=-(Number(aP)/2);
A.css("left",aX);
aK=am.find(".InvodoPanel");
aK.height(aT+"px");
aK.width(aP+"px");
if(aY==="e"){am.css("top","0px")
}av=k.find(".InvodoPanel");
if(aY==="o"){var a5=k.find("#InvodoCoverBg").get(0);
var a4=a5.contentWindow||a5;
try{a4.document.open();
a4.document.write(aw);
a4.document.close()
}catch(a3){}k.find(".InvodoCover, .InvodoViewer .InvodoCloseBtn").click(function(a8){U.__Viewer.hide();
a8.preventDefault();
return false
});
V=k.find(".InvodoViewer .InvodoCtaContainer");
V.bind("click",M);
var a2=U.logoUrl;
if(a2){var aZ=k.find("div.InvodoBranding");
if(a2==="none"){aZ.css("display","none")
}else{aZ.css("background-image","url("+a2+")");
aZ.css("background-repeat","no-repeat")
}}aV="#"+aV;
k.find(".InvodoViewer").css("background-color",aV);
k.find(".InvodoFooter").css("background-color",aV);
a0="#"+a0;
av.height(aT+"px");
k.find(".InvodoCloseBtn").css("color",a0);
k.find(".InvodoCtaContainer").css("background-color",a0);
if(h.browser.msie&&h.browser.version<7){g.loadResourcesAndExec(g.iFixPngResources,function(){k.find(ax).ifixpng("crop");
k.find(r).ifixpng("scale")
})
}}}};
U.__Viewer.config=function(aP){if(!ai||ai!=aP.podId){ai=aP.podId;
t(aP.podId)
}};
U.__Viewer.initHybridEmbeddedBlock=function(aX,aQ,aT){var aY=this;
aY.viewer=aT;
var aR=aJ++;
var aZ=h(aX);
var aP=ad.clone();
if(!aP.attr("id")){var aV="InvodoHybridCTA_"+aQ;
C.push(aV);
aP.attr("id",aV)
}var aS="InvodoEVPCTAOverlay_"+aQ;
aP.find(".InvodoEVPCTAOverlay").attr({id:aS});
var aU=g.viewerConfigs[aQ].frames[0].previewUrl;
var aW=new Image();
aW.onload=aW.onerror=function(){aW.onload=aW.onerror=null;
var a3=g.viewerConfigs[aQ].config;
var a2=parseInt(a3.width||"480",10);
var a0=parseInt(a3.height||"270",10);
var a5=a2+"px";
var a4=a0+"px";
aP.css({width:a5,height:a4});
var a7=aP.find(".InvodoEVPCTAOverlay");
a7.css({width:"100%",height:"100%","background-repeat":"no-repeat","background-image":"url("+aU+")","background-position":"center"});
a7.html('<img width="'+a5+'" height="'+a4+'" src="'+aU+'">');
aZ.replaceWith(aP);
var a1={podId:aQ,overlay:true,fallbackWidth:a5,fallbackHeight:a4};
a1.selector="#"+aS;
(a3.playbuttonsize||"64")+"px.png";
a1.overlayURL=aA;
var a6=100;
(function(){if(a6-->0&&(aP.width()!==a2||aP.height()!==a0)){setTimeout(arguments.callee,10);
return
}g.initCtas(a1)
})()
};
aW.src=aU
};
U.__Viewer.pause=function(aP){ah.apply(null,arguments)
};
U.__Viewer.play=function(aP){if(w){o.apply(null,arguments)
}else{if(!aP){throw"Empty podId passed to Invodo.Viewer.play"
}arguments.frameNum=0;
au.apply(null,arguments)
}};
U.__Viewer.show=function(aQ,aP){au.apply(null,arguments)
};
U.__Viewer.setFooterMode=function(aP){if(U.__Viewer.footerMode==aP){return
}U.__Viewer.footerMode=aP;
if(aP=="compact"){var aS=k.find(".InvodoFooter");
aS.addClass("InvodoCompact");
var aR=k.find(".InvodoViewer");
var aQ=40;
aR.css("height",(parseInt(aR.css("height"))-aQ)+"px")
}};
U.__Viewer.setViewerButton=function(aQ,aP,aR,aS){if(!aP){if(!aR){aR=T
}y[aQ]=false
}else{if(!aR){aR=aa
}y[aQ]=aP
}i[aQ]=aR.length>15?aR.substr(0,12)+"...":aR
};
U.__Viewer.hide=function(){d("viewerHide");
if(g.ua.browser=="msie"||g.ua.flash){var aQ=k.find(".InvodoVideoPlayerSwf");
if(aQ.length>0&&h.isFunction(aQ.get(0).inPlayerReset)){aQ.get(0).inPlayerReset()
}}else{var aP=k.find("#InvodoHtml5Video").get(0);
aP.pause()
}k.css({display:"none"});
ac.destroyVideoFrame();
w=false
};
U.__Viewer.__flashObject=function(aP,aQ){if(g.viewerConfigs[ai].frames[u].type=="video"&&ac&&ac.getFlashObject){return ac.getFlashObject(aP)
}};
U.__Viewer.__replay=aL;
var l={};
Z={getCurrentPodId:ak,getCurrentFrameNum:ae,getPlaylistLength:v,frameTemplates:aH,getFooterMode:az,showPlay:R,showFrameError:a,hideFrameError:aC,switchClip:af,viewerMode:aj,logViewerEvent:d,printViewerTiming:function(aR){if(!c){return
}var aQ=new Date(),aP=l.lastEvent,aS=l.lastTiming;
l.lastEvent=aR;
l.lastTiming=l[aR]=aQ.getTime();
var aT=aQ.getHours()+":"+aQ.getMinutes()+":"+aQ.getSeconds()+"."+aQ.getMilliseconds();
if(!aS){x.console.log(aT+": "+aR)
}else{x.console.log(aT+": "+aR+" occurred "+(l[aR]-aS)+"ms after "+aP+".")
}}}
})(window,window.Invodo);