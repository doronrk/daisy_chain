(function(s,j){var m=80,w,t,k=false,y,p=false,l,b,q,r=120,f,n,g=-1,o="InvodoVideoPlayer",h="#"+o;
function c(){var C=s.document,D=C.documentElement,A=C.getElementsByTagName("body")[0],B,z;
if(s.innerWidth&&s.innerHeight){B=s.innerWidth;
z=s.innerHeight
}else{if(D&&D.clientWidth&&D.clientHeight){B=D.clientWidth;
z=D.clientHeight
}else{B=A.clientWidth;
z=A.clientHeight
}}return{width:B,height:z}
}function e(B){var A=b.find(".InvodoViewer");
var L=A.find(".InvodoFrameHolder");
var z=b.find("#Invodo .InvodoLightbox");
var D=b.find(".InvodoViewerControlsContainer");
var K=b.find(".InvodoViewerControlsContainerRight");
var C=D.find(".InvodoControls");
var M=B.width-r;
var G=b.find(".InvodoPanel");
var E=c();
var J=E.height-120;
var I=E.width-40;
var F=0;
if(B.height>J){F=J/B.height;
B.height=B.height*F;
B.width=B.width*F
}if(B.width>I){F=I/B.width;
B.width=B.width*F;
B.height=B.height*F
}G.css({height:B.height,width:B.width});
A.css({width:B.width+"px",height:B.height+m+"px",left:-(B.width/2)+"px",top:-((B.height+m)/2)+"px"});
L.css({height:B.height,width:B.width});
D.css("width",M);
K.css("width",M);
C.width(M-12);
if(w.ua.browser=="msie"&&parseInt(w.ua.browserVer)==8&&document.compatMode=="BackCompat"){b.find(".InvodoFooter").addClass("InvodoIe8BackCompatFooter")
}var H=n.getFooterMode();
if(H=="compact"){var A=b.find(".InvodoViewer");
m=40;
A.css("height",(B.height+m)+"px")
}}function a(C){var D=l.length-1;
var z=n.getCurrentFrameNum()+1;
var A=n.getPlaylistLength();
var B=w.viewerConfigs[C].config;
w.frameCompleted[w.frameCompleted.length]=n.currentFrameId;
if(A<2){n.logViewerEvent("podComplete");
t.inPlayerHandlePodComplete()
}else{if(z<=D){n.switchClip(z)
}else{n.logViewerEvent("podComplete")
}}}function x(z,C){e({width:480,height:270});
clearTimeout(g);
var B=b.find(h);
var D=false;
if(n.viewerMode=="e"){m=0
}else{m=80
}D=true;
n.printViewerTiming("viewerFlashCreate");
k=false;
B.flash({swf:w.canonicalUri(w.versionedUri("fl","InPlayer.swf")),height:"100%",width:"100%",hasVersion:"10",hasVersionFail:function(){n.showFrameError("Flash required");
b.find(".InvodoViewer .InvodoFrameHolder .InvodoPanel").html(n.frameTemplates.noflash);
return true
},expressInstall:w.canonicalUri(w.versionedUri("fl","expressInstall.swf")),id:o,wmode:"opaque",allowScriptAccess:"always",allowNetworking:"all",allowFullScreen:"true",bgcolor:"#000000",style:"visibility: visible;"});
B=b.find(h).addClass("InvodoVideoPlayerSwf");
l=w.viewerConfigs[C].frames;
t=(B=b.find(h)).get(0);
p=true;
var E=false;
var A=true;
(function(){function J(K){clearTimeout(g);
if(w.ua.browser=="msie"||w.ua.flash){g=setTimeout(K,100)
}}try{t=(B=b.find("#"+o)).get(0);
if(w.ua.browser=="msie"||w.ua.flash){if(!k||typeof t.inPlayerSetObjectId!=="function"||t.inPlayerSetObjectId(o)!==o){return J(arguments.callee)
}t.doAction=function(L,N){try{N=N||{};
N.pod=n.getCurrentPodId();
N.frame=n.currentFrameId;
n.logViewerEvent(L,N);
switch(L){case"playerReady":case"timePlayed":case"videoBufferEmpty":case"videoPaused":case"videoUnpaused":break;
case"switchClip":var K=N.index||0;
n.switchClip(K);
break;
case"playerResize":e(N);
break;
case"videoPlayStart":n.printViewerTiming("videoPlayStart");
n.hideFrameError();
break;
case"videoFailRTMP":case"videoFailHTTP":n.showFrameError("The video failed to load. Please try again.");
break;
case"videoStart":j.setVisitorViewedFlag(1);
if(!E){E=true;
n.logViewerEvent("podStart")
}n.printViewerTiming("videoStart");
break;
case"videoComplete":break;
case"buttonShareClicked":n.logViewerEvent("buttonShareClicked")
}}catch(M){}};
w.viewerConfigs[C].config.viewerMode=n.viewerMode;
t.inPlayerSetConfig(w.viewerConfigs[C]);
if(!D){t.inPlayerReset()
}if(!t.inPlayerLoadVideo(0)){n.showFrameError("Video failed to load.");
n.logViewerEvent("errorVideoPlayerInit")
}}else{var H=l[z];
var F=b.find("#InvodoHtml5Video").get(0);
var G=w.viewerConfigs[n.getCurrentPodId()].config;
setTimeout(function(){F.play()
},20)
}}catch(I){s.console.warn("Error while initializing video frame: ",I);
J(arguments.callee)
}})()
}function d(B){if(w.ua.browser!="msie"&&!w.ua.flash){var z=q("#InvodoHtml5Video").get(0);
z.play();
clearTimeout(g)
}else{clearTimeout(g);
try{if(k&&t&&typeof t.inPlayerReset==="function"){t.inPlayerReset();
t.inPlayerLoadVideo(B)
}}catch(A){}}}function i(){clearTimeout(g);
k=false;
b.find("object").each(function(){try{var A=this,C="#"+q(this).attr("id");
if(A&&A.nodeName=="OBJECT"){var z=q(C);
if(w.ua.ie&&w.ua.win){A.style.display="none";
(function(){if(z.length>0){var D=z.get(0);
if(D.readyState==4){for(var E in D){if(typeof D[E]=="function"){D[E]=null
}}z.replaceWith("<div id='"+o+"'></div>")
}else{setTimeout(arguments.callee,10)
}}})()
}else{z.replaceWith("<div id='"+o+"'></div>")
}}}catch(B){}})
}function u(z){if(!z){return{}
}if(t&&t.id==z){return t
}var A=b.find("#"+z);
if(A.length){return A.get(0)
}return{}
}j.__Viewer.Video={};
j.__Viewer.Video.__tunnel=function(z){j.__Viewer.Video.__tunnel=f;
n=z(y);
w=n.core;
q=w.$jq;
b=n.$Invodo;
v(q,"flash",s.navigator.plugins["Shockwave Flash"]||s.ActiveXObject)
};
j.__Viewer.__flashJsTest=function(z){k=!!z;
return true
};
y={getFlashObject:u,playClip:d,initVideoFrame:x,destroyVideoFrame:i};
function v(G,H,J){var E="object";
var C=true;
function K(N,M){var L=(N[0]||0)-(M[0]||0);
return L>0||(!L&&N.length>0&&K(N.slice(1),M.slice(1)))
}function D(N){if(typeof N!=E){return N
}var L=[];
var O="";
for(var M in N){if(typeof N[M]==E){O=D(N[M])
}else{O=[M,(C)?encodeURI(N[M]):N[M]].join("=")
}L.push(O)
}return L.join("&")
}function F(N){var L=[];
for(var M in N){if(N[M]){L.push([M,'="',N[M],'"'].join(""))
}}return L.join(" ")
}function B(N){var L=[];
for(var M in N){L.push(['<param name="',M,'" value="',D(N[M]),'" />'].join(""))
}return L.join("")
}try{var A=J.description||(function(){return(new J("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
}())
}catch(I){A="Unavailable"
}var z=A.match(/\d+/g)||[0];
G[H]={available:z[0]>0,activeX:J&&!J.name,version:{original:A,array:z,string:z.join("."),major:parseInt(z[0],10)||0,minor:parseInt(z[1],10)||0,release:parseInt(z[2],10)||0},hasVersion:function(L){var M=(/string|number/.test(typeof L))?L.toString().split("."):(/object/.test(typeof L))?[L.major,L.minor]:L||[0,0];
return K(z,M)
},encodeParams:true,expressInstall:"expressInstall.swf",expressInstallIsActive:false,create:function(O){var T=this;
if(!O.swf||T.expressInstallIsActive||(!T.available&&!O.hasVersionFail)){if(w.ua.flash){return false
}}if(!T.hasVersion(O.hasVersion||1)){T.expressInstallIsActive=true;
if(typeof O.hasVersionFail=="function"){if(!O.hasVersionFail.apply(O)){return false
}}O={swf:O.expressInstall||T.expressInstall,height:"100%",width:"100%",flashvars:{MMredirectURL:location.href,MMplayerType:(T.activeX)?"ActiveX":"PlugIn",MMdoctitle:document.title.slice(0,47)+" - Flash Player Installation"}}
}var L=O.id||"flash_"+Math.floor(Math.random()*999999999);
var S={id:L,name:O.name||L,width:O.width||320,height:O.height||180,style:O.style||""};
if(T.activeX){S.classid=O.classid||"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
}else{S.type="application/x-shockwave-flash";
S.data=O.swf
}C=typeof O.useEncode!=="undefined"?O.useEncode:T.encodeParams;
O.movie=O.swf;
O.wmode=O.wmode||"opaque";
delete O.fallback;
delete O.hasVersion;
delete O.height;
delete O.id;
delete O.swf;
delete O.useEncode;
delete O.width;
delete O.expressInstall;
delete O.style;
var Q=w.viewerConfigs[n.getCurrentPodId()].config;
var P=Q.width||480;
var M=Q.height||270;
var N=w.viewerConfigs[n.getCurrentPodId()].frames[n.getCurrentFrameNum()];
var R="";
if(!w.ua.flash){R+='<video id="InvodoHtml5Video" style="width:100%;height:100%;" autoplay="autoplay" preload controls>';
R+='<source src="'+N.HTTP+"/"+N.filename+'" type="video/mp4" />';
R+="</video>"
}return["<object ",F(S),">",B(O),R,"</object>"].join("")
}};
G.fn[H]=function(L){var M=this.find(E).andSelf().filter(E);
if(/string|object/.test(typeof L)){this.each(function(){var P=G(this);
var N;
L=(typeof L==E)?L:{swf:L};
L.fallback=this;
N=G[H].create(L);
if(N){P.children().remove();
if(q.browser.msie){P.get(0).outerHTML=N
}else{var O=document.createElement("div");
O.innerHTML=N;
P.replaceWith(O.firstChild)
}}})
}if(typeof L=="function"){M.each(function(){var N=this;
var O="jsInteractionTimeoutMs";
N[O]=N[O]||0;
if(N[O]<660){if(N.clientWidth||N.clientHeight){L.call(N)
}else{setTimeout(function(){G(N)[H](L)
},N[O]+66)
}}})
}return M
}
}})(window,window.Invodo);