(function(c,i){var a,b,e,f,g,d,k={},h={"top-left":{left:0,top:0},"top-right":{right:0,top:0},"bottom-left":{left:0,bottom:0},"bottom-right":{right:0,bottom:0}};
i.__CTA={};
i.__CTA.__tunnel=function(l){i.__CTA.__tunnel=e;
f=l(g)
};
i.__CTA.init=function(){a=f.$jq;
d=f.logEvent
};
i.__CTA.attach=function(){if(a.browser.msie&&a.browser.version<7){var l=arguments;
f.loadResourcesAndExec(f.iFixPngResources,function(){j.apply(c,l)
})
}else{j.apply(c,arguments)
}};
i.__CTA.getCtaSelectors=function(l){return k[l]?k[l]:[]
};
function j(){if(arguments.length<1){return
}var p=f.isString(arguments[0]);
var l=(p&&arguments.length>1)?(arguments[1]||false):arguments[0];
var o=p?arguments[0]:l.selector;
if(!o){c.console.warn("CTA called with no selector.");
return
}if(!b){b=a("<div></div>").css({"background-repeat":"no-repeat","background-attachment":"scroll",cursor:"pointer",position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%"})
}var n,t=[],q="Click to view video",m=false,u=function(){return true
},s={},r=0;
a(o).each(function(){n=a(this);
if(l){q=l.title||l.ctaTitle||q;
m=!!(l.noViewer||l.ctaNoViewer);
u=l.callback||l.ctaCallback||u;
s.podId=l.podId||l.ctaCallTo||"";
s.sku=l.sku||"";
r=l.callToFrame||l.ctaCallToFrame||0;
function v(H,I){if(!k[H]){k[H]=new Array()
}k[H].push(I)
}if(s.podId){v(s.podId,o)
}if(s.sku){v(s.sku,o)
}if(typeof l.ctaOverlay==="undefined"&&(l.overlayURL||l.ctaOverlayURL||l.overlayPosition||l.ctaOverlayPosition)){l.overlay=true
}if(l.overlay||l.ctaOverlay){if(n.is("a")){n.get(0).merchCta="yes"
}n.parents("a").each(function(){this.merchCta="yes"
});
var D=n.attr("id"),E=n.attr("class"),G=a("<div></div>"),F=n.clone(true),w=b.clone(true),x=a("<div></div>"),C=l.overlayURL||l.ctaOverlayURL||C,B=f.canonicalUri(C,f.resourcePath+"/i/mer/");
G.css({position:"relative",width:"100%",height:"100%"});
F.css({position:"absolute",left:"0px",top:"0px",display:"block",width:"100%",height:"100%",border:"none",padding:"0px",margin:"0px"});
x.addClass(E).attr("id",D).css({"background-image":""});
G.append(F).append(w);
x.append(G);
(function(H,J,I){t[t.length]=function(){J.removeClass().attr("id","");
H.replaceWith(I)
}
})(n,F,x);
n=x;
var y=new Image();
y.onload=y.onerror=(function(H){return function(){y.onload=y.onerror=null;
var K=y.width,I=y.height,N=h[H.overlayPosition||H.ctaOverlayPosition];
var L=a("<div></div>").css({position:"absolute",width:K,height:I,"background-attachment":"scroll","background-repeat":"no-repeat","background-image":"url("+B+")"});
if(N){L.css(N)
}else{var M=H.fallbackWidth||w.width();
var J=H.fallbackHeight||w.height();
M=parseInt(M,10);
J=parseInt(J,10);
L.css({left:((M-K)/2)+"px",top:((J-I)/2)+"px"})
}if(f.isFunction(a.ifixpng)){L.ifixpng()
}w.append(L)
}
})(l);
try{setTimeout(function(){y.src=B
},10)
}catch(A){}}}function z(H){var I=i.__CTA.getCtaSelectors(s.podId)[0]||o;
var J=f.Viewer.getCurrentPodId();
d("ctaClick",{selector:I,pod:J});
if(u.call(this,H)!==false){i.showViewer(s,r);
d("ctaClickForViewer",{selector:I,frameNum:r,pod:J})
}H.preventDefault()
}n.css({cursor:"pointer"}).attr("title",q).click(z)
});
while(t.length>0){t.shift()()
}}g={}
})(window,window.Invodo);