/* JS */ gapi.loaded_3(function(_){var window=this;
var Qg,Tg,Sg,Rg,Wg;_.Eg=function(a){return"rtl"==_.ng(a,"direction")};_.Pg=function(a,c,f,g){this.top=a;this.right=c;this.bottom=f;this.left=g};_.k=_.Pg.prototype;_.k.Ne=function(){return this.right-this.left};_.k.Cd=function(){return this.bottom-this.top};_.k.clone=function(){return new _.Pg(this.top,this.right,this.bottom,this.left)};
_.k.contains=function(a){return this&&a?"undefined"!=typeof _.Pg&&a instanceof _.Pg?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom:!1};_.k.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};
_.k.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};_.k.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};
_.k.translate=function(a,c){a instanceof _.X?(this.left+=a.x,this.right+=a.x,this.top+=a.y,this.bottom+=a.y):(this.left+=a,this.right+=a,_.qe(c)&&(this.top+=c,this.bottom+=c));return this};Qg=function(a,c){if(/^\d+px?$/.test(c))return(0,window.parseInt)(c,10);var f=a.style.left,g=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=c;var h=a.style.pixelLeft;a.style.left=f;a.runtimeStyle.left=g;return h};Tg=function(a,c){var f=_.mg(a,c);return f?Qg(a,f):0};Sg={thin:2,medium:4,thick:6};
_.GG=function(a,c){if(_.W){var f=Tg(a,c+"Left"),g=Tg(a,c+"Right"),h=Tg(a,c+"Top"),l=Tg(a,c+"Bottom");return new _.Pg(h,g,l,f)}f=_.lg(a,c+"Left");g=_.lg(a,c+"Right");h=_.lg(a,c+"Top");l=_.lg(a,c+"Bottom");return new _.Pg((0,window.parseFloat)(h),(0,window.parseFloat)(g),(0,window.parseFloat)(l),(0,window.parseFloat)(f))};Rg=function(a,c){if("none"==_.mg(a,c+"Style"))return 0;var f=_.mg(a,c+"Width");return f in Sg?Sg[f]:Qg(a,f)};Wg=function(a,c){return new _.X(a.x-c.x,a.y-c.y)};
_.Ig=function(a,c,f,g){this.left=a;this.top=c;this.width=f;this.height=g};_.Ig.prototype.clone=function(){return new _.Ig(this.left,this.top,this.width,this.height)};_.Mh=function(a){return new _.Pg(a.top,a.left+a.width,a.top+a.height,a.left)};_.k=_.Ig.prototype;
_.k.contains=function(a){return"undefined"!=typeof _.Ig&&a instanceof _.Ig?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};_.k.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
_.k.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};_.k.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};_.k.translate=function(a,c){a instanceof _.X?(this.left+=a.x,this.top+=a.y):(this.left+=a,_.qe(c)&&(this.top+=c));return this};_.Ns=function(a){return _.GG(a,"padding")};
_.Ug=function(a){if(_.W&&!_.Te(9)){var c=Rg(a,"borderLeft"),f=Rg(a,"borderRight"),g=Rg(a,"borderTop");a=Rg(a,"borderBottom");return new _.Pg(g,f,a,c)}c=_.lg(a,"borderLeftWidth");f=_.lg(a,"borderRightWidth");g=_.lg(a,"borderTopWidth");a=_.lg(a,"borderBottomWidth");return new _.Pg((0,window.parseFloat)(g),(0,window.parseFloat)(f),(0,window.parseFloat)(a),(0,window.parseFloat)(c))};_.JG=function(a,c){return(c&4&&_.Eg(a)?c^2:c)&-5};
_.Zg=function(a,c,f){var g,h=_.df&&(_.Gg||_.wk)&&_.sl("1.9");c instanceof _.X?(g=c.x,c=c.y):(g=c,c=f);a.style.left=_.xg(g,h);a.style.top=_.xg(c,h)};
_.Yg=function(a){for(var c=new _.Pg(0,window.Infinity,window.Infinity,0),f=_.xf(a),g=f.B.body,h=f.B.documentElement,l=_.Kf(f.B);a=_.rg(a);)if(!(_.W&&0==a.clientWidth||_.ef&&0==a.clientHeight&&a==g)&&a!=g&&a!=h&&"visible"!=_.ng(a,"overflow")){var n=_.sg(a),q;q=a;if(_.df&&!_.sl("1.9")){var t=(0,window.parseFloat)(_.lg(q,"borderLeftWidth"));if(_.Eg(q))var v=q.offsetWidth-q.clientWidth-t-(0,window.parseFloat)(_.lg(q,"borderRightWidth")),t=t+v;q=new _.X(t,(0,window.parseFloat)(_.lg(q,"borderTopWidth")))}else q=
new _.X(q.clientLeft,q.clientTop);n.x+=q.x;n.y+=q.y;c.top=Math.max(c.top,n.y);c.right=Math.min(c.right,n.x+a.clientWidth);c.bottom=Math.min(c.bottom,n.y+a.clientHeight);c.left=Math.max(c.left,n.x)}g=l.scrollLeft;l=l.scrollTop;c.left=Math.max(c.left,g);c.top=Math.max(c.top,l);f=_.ig(f.Aa());c.right=Math.min(c.right,g+f.width);c.bottom=Math.min(c.bottom,l+f.height);return 0<=c.top&&0<=c.left&&c.bottom>c.top&&c.right>c.left?c:null};
_.Lg=function(a){var c=_.sg(a);a=_.Nt(a);return new _.Ig(c.x,c.y,a.width,a.height)};_.ug=function(a){if(1==a.nodeType)return _.Kt(a);var c=_.vd(a.Op),f=a;a.targetTouches&&a.targetTouches.length?f=a.targetTouches[0]:c&&a.B.targetTouches&&a.B.targetTouches.length&&(f=a.B.targetTouches[0]);return new _.X(f.clientX,f.clientY)};
_.bh=function(a,c,f,g,h,l,n,q,t){var v,w;if(v=f.offsetParent){var A="HTML"==v.tagName||"BODY"==v.tagName;A&&"static"==_.og(v)||(w=_.sg(v),A||(A=(A=_.Eg(v))&&_.df?-v.scrollLeft:!A||_.W&&_.sl("8")||"visible"==_.ng(v,"overflowX")?v.scrollLeft:v.scrollWidth-v.clientWidth-v.scrollLeft,w=Wg(w,new _.X(A,v.scrollTop))))}v=w||new _.X;w=_.Lg(a);if(A=_.Yg(a)){var F=new _.Ig(A.left,A.top,A.right-A.left,A.bottom-A.top),A=Math.max(w.left,F.left),z=Math.min(w.left+w.width,F.left+F.width);if(A<=z){var I=Math.max(w.top,
F.top),F=Math.min(w.top+w.height,F.top+F.height);I<=F&&(w.left=A,w.top=I,w.width=z-A,w.height=F-I)}}A=_.xf(a);I=_.xf(f);A.B!=I.B&&(z=A.B.body,I=_.tg(z,I.Aa()),I=Wg(I,_.sg(z)),!_.W||_.Te(9)||_.hg(A)||(I=Wg(I,_.Hf(A))),w.left+=I.x,w.top+=I.y);a=_.JG(a,c);c=new _.X(a&2?w.left+w.width:w.left,a&1?w.top+w.height:w.top);c=Wg(c,v);h&&(c.x+=(a&2?-1:1)*h.x,c.y+=(a&1?-1:1)*h.y);var E;if(n)if(t)E=t;else if(E=_.Yg(f))E.top-=v.y,E.right-=v.x,E.bottom-=v.y,E.left-=v.x;h=E;t=c.clone();E=_.JG(f,g);g=_.Nt(f);a=q?q.clone():
g.clone();q=t;t=a;q=q.clone();t=t.clone();a=0;if(l||0!=E)E&2?q.x-=t.width+(l?l.right:0):l&&(q.x+=l.left),E&1?q.y-=t.height+(l?l.bottom:0):l&&(q.y+=l.top);n&&(h?(l=q,E=t,a=0,65==(n&65)&&(l.x<h.left||l.x>=h.right)&&(n&=-2),132==(n&132)&&(l.y<h.top||l.y>=h.bottom)&&(n&=-5),l.x<h.left&&n&1&&(l.x=h.left,a|=1),l.x<h.left&&l.x+E.width>h.right&&n&16&&(E.width=Math.max(E.width-(l.x+E.width-h.right),0),a|=4),l.x+E.width>h.right&&n&1&&(l.x=Math.max(h.right-E.width,h.left),a|=1),n&2&&(a=a|(l.x<h.left?16:0)|(l.x+
E.width>h.right?32:0)),l.y<h.top&&n&4&&(l.y=h.top,a|=2),l.y<=h.top&&l.y+E.height<h.bottom&&n&32&&(E.height=Math.max(E.height-(h.top-l.y),0),l.y=h.top,a|=8),l.y>=h.top&&l.y+E.height>h.bottom&&n&32&&(E.height=Math.max(E.height-(l.y+E.height-h.bottom),0),a|=8),l.y+E.height>h.bottom&&n&4&&(l.y=Math.max(h.bottom-E.height,h.top),a|=2),n&8&&(a=a|(l.y<h.top?64:0)|(l.y+E.height>h.bottom?128:0)),n=a):n=256,a=n);l=new _.Ig(0,0,0,0);l.left=q.x;l.top=q.y;l.width=t.width;l.height=t.height;n=a;n&496||(_.Zg(f,new _.X(l.left,
l.top)),a=new _.fg(l.width,l.height),g==a||g&&a&&g.width==a.width&&g.height==a.height||(l=a,g=_.hg(_.xf(_.zf(f))),!_.W||_.sl("10")||g&&_.sl("8")?(f=f.style,_.df?f.MozBoxSizing="border-box":_.ef?f.WebkitBoxSizing="border-box":f.boxSizing="border-box",f.width=Math.max(l.width,0)+"px",f.height=Math.max(l.height,0)+"px"):(q=f.style,g?(g=_.Ns(f),f=_.Ug(f),q.pixelWidth=l.width-f.left-g.left-g.right-f.right,q.pixelHeight=l.height-f.top-g.top-g.bottom-f.bottom):(q.pixelWidth=l.width,q.pixelHeight=l.height))));
return n};_.Nh=function(a,c,f){f||(a=a.parentNode);for(f=0;a;){if(c(a))return a;a=a.parentNode;f++}return null};_.Rj=function(a,c){a.style.display=c?"":"none"};_.Ag=function(a,c){var f=a.style;"opacity"in f?f.opacity=c:"MozOpacity"in f?f.MozOpacity=c:"filter"in f&&(f.filter=""===c?"":"alpha(opacity="+100*c+")")};_.Op=function(a,c){c?a.tabIndex=0:(a.tabIndex=-1,a.removeAttribute("tabIndex"))};_.ah=function(a,c){var f={},g;for(g in a)c.call(void 0,a[g],g,a)&&(f[g]=a[g]);return f};

_.vf=function(a){a=a.className;return _.fa(a)&&a.match(/\S+/g)||[]};
_.JH=function(){var a=window,c=a.document,f=0;if(c){var f=c.body,g=c.documentElement;if(!g||!f)return 0;a=_.Ct(a).height;if(_.Lf(c)&&g.scrollHeight)f=g.scrollHeight!=a?g.scrollHeight:g.offsetHeight;else{var c=g.scrollHeight,h=g.offsetHeight;g.clientHeight!=h&&(c=f.scrollHeight,h=f.offsetHeight);f=c>a?c>h?c:h:c<h?c:h}}return f};_.Oh=function(a){this.wb=a;this.B=a.va()};_.Oh.prototype.eb=function(){Ph(this)};_.Oh.prototype.onBeforeParentOpen=_.Oh.prototype.eb;
var Ph=function(a){var c=a.wb.ci();if(a.B.anchorBox&&c&&c.rb())c=_.sg(c.rb()),a.B.anchorBox.left+=c.x,a.B.anchorBox.top+=c.y;else{c=a.B.anchor;if("_default"!=c&&"_iframe"!=c){var f=_.kg(c);if(f)a.B.anchorBox=_.Lg(f);else{_.sa("Anchor not found in DOM: "+c+'. Falling back to "_default".');a.B.anchor="_default";return}}"_iframe"==c&&(c=_.ig(),a.B.anchorBox=new _.Ig(0,0,c.width,c.height))}a.B.anchor=""};
_.Qh=function(a){_.Oh.call(this,a)};_.J(_.Qh,_.Oh);_.Qh.prototype.open=function(){var a=this.B,c=window.document.createElement("ins");window.document.getElementById(a.container).appendChild(c);c.style.display="block";_.Mg(c,a.containerCss);this.wb.qc(c);this.wb.Pa(c)};_.Qh.prototype.Oe=function(){window.document.getElementById(this.wb.id).style.height=this.wb.height+"px"};_.Qh.prototype.close=function(){_.Tf(this.wb.V());_.Tf(this.ye);this.ye=null};
_.LH=function(a){if(a.ye)return a.ye;var c=a.B;!c.anchorBox&&c.anchor&&Ph(a);var f=a.wb.ci();if("_default"==c.anchor&&f){var g=_.Lg(_.kg(f.V()));c.anchorBox=g}if(!c.anchorBox)return _.sa("No anchor box defined."),null;c=new _.X(c.anchorBox.left,c.anchorBox.top);f&&(f=_.tg(f.rb(),window),a.zt=new _.X,a.zt.x=f.x,a.zt.y=f.y,c.x+=f.x,c.y+=f.y,_.Sh(c));a.ca=c;f=_.KH(a,!0);a.ye=window.document.createElement("ins");a.ye.style.cssText=f;window.document.body.appendChild(a.ye);return a.ye};
_.KH=function(a,c){var f=a.B;return"position: absolute !important;background-color: transparent !important;left: "+a.ca.x+"px !important;top: "+a.ca.y+"px !important;width: "+f.anchorBox.width+"px !important;height: "+f.anchorBox.height+"px !important;z-index: -10000 !important;display: "+(c?"block":"none")+" !important;"};
_.Th=function(a,c){var f=0,g=0;if(c.pageX||c.pageY)f=c.pageX,g=c.pageY;else if(c.clientX||c.clientY){var f=c.target?c.target:c.srcElement,h;f.ownerDocument&&f.ownerDocument.parentWindow?h=f.ownerDocument.parentWindow:h=window;g=f=0;_.W?(f=h.document.documentElement.scrollLeft,g=h.document.documentElement.scrollTop):(f=h.pageXOffset,g=h.pageYOffset);f=c.clientX+f;g=c.clientY+g}h=new _.X(f,g);return(f=_.Mh(_.Lg(a)))&&f.contains(h)};
_.Sh=function(a){var c=window,f=window.document.body,g=_.sg(f),c=f.currentStyle||c.getComputedStyle(f,"");c.position&&"static"!=c.position&&(a.x-=g.x,a.y-=g.y)};_.Uh=function(a){var c=a.wb.ci()&&a.wb.ci().V(),c=c&&c.style.zIndex?(0,window.parseInt)(c.style.zIndex,10)+1:0;return Math.min(2147483647,Math.max(2E9,a.B.zIndex||c))};
var Yh,Wh,Xh;Yh={"bottom-center":1,"bottom-end":7,"bottom-left":1,"bottom-right":3,"bottom-start":5,"left-bottom":1,"left-center":0,"left-top":0,"right-bottom":3,"right-center":2,"right-top":2,"top-center":0,"top-end":6,"top-left":0,"top-right":2,"top-start":4};Wh={"bottom-center":!0,"top-center":!0};Xh={"left-center":!0,"right-center":!0};
_.Vh=function(a,c,f,g,h){h=h||{x:0,y:0};if(Wh[c]){var l=_.Nt(a).width/2;h.x="top-right"==g||"bottom-right"==g?h.x+l:h.x-l}Wh[g]&&(l=_.Nt(f).width/2,h.x+=l);Xh[c]&&(l=_.Nt(a).height/2,h.y="right-bottom"==g||"left-bottom"==g?h.y+l:h.y-l);Xh[g]&&(h.y+=_.Nt(f).height/2);_.bh(f,Yh[g],a,Yh[c],new _.X(h.x,h.y));g=_.Nh(a,function(a){if(a==window.document)return!1;a=_.og(a);return!!a&&"static"!=a});f=c=0;g&&(f=_.sg(g),c=-f.x,f=-f.y);a=a.style;(0,window.parseInt)(a.left,10)<c&&(a.left=c+"px");(0,window.parseInt)(a.top, 10)<f&&(a.top=f+"px")};
_.Zh=function(a){_.Oh.call(this,a.wb);this.qa=a;this.G=null};_.J(_.Zh,_.Qh);_.Zh.prototype.eb=function(){this.qa.eb()};_.Zh.prototype.onBeforeParentOpen=_.Zh.prototype.eb;_.Zh.prototype.open=function(){this.qa.open();if(this.B.closeClickDetection||this.B.hideClickDetection)this.G=_.ph(window.document,["click","touchstart"],(0,_.H)(this.ha,this),!1)};_.Zh.prototype.open=_.Zh.prototype.open;_.Zh.prototype.Oe=function(a){this.qa.Oe(a)};_.Zh.prototype.onready=_.Zh.prototype.Oe;
_.Zh.prototype.M=function(a){this.qa.onRenderStart&&this.qa.onRenderStart(a)};_.Zh.prototype.onRenderStart=_.Zh.prototype.M;_.Zh.prototype.close=function(){if(this.B.closeClickDetection||this.B.hideClickDetection)_.Ch(this.G),this.G=null;this.qa.close()};_.Zh.prototype.close=_.Zh.prototype.close;_.Zh.prototype.ha=function(a){_.Th(this.wb.V(),a)||(this.B.hideClickDetection&&this.qa.show?this.qa.show(!1):this.qa.close())};

_.Gp=function(a,c,f,g){return _.ye.splice.apply(a,_.Ae(arguments,1))};_.zh=function(a,c,f,g,h){if(_.ea(c)){for(var l=0;l<c.length;l++)_.zh(a,c[l],f,g,h);return null}f=_.tl(f);return _.wB(a)?a.li.add(String(c),f,!0,g,h):_.qh(a,c,f,!0,g,h)};_.CM=function(a,c,f){if(c in a)throw Error("p`"+c);a[c]=f};_.sA=function(a){if(!_.ea(a))for(var c=a.length-1;0<=c;c--)delete a[c];a.length=0};_.Up=function(a){a.ma=function(){return a.Tl?a.Tl:a.Tl=new a}};_.bi=function(a){_.dh.call(this);this.Ld=a;this.ha={}};
_.J(_.bi,_.dh);var ei=[];_.bi.prototype.Q=function(a,c,f,g){return _.tr(this,a,c,f,g)};_.tr=function(a,c,f,g,h,l){_.ea(f)||(f&&(ei[0]=f.toString()),f=ei);for(var n=0;n<f.length;n++){var q=_.ph(c,f[n],g||a.handleEvent,h||!1,l||a.Ld||a);if(!q)break;a.ha[q.key]=q}return a};
_.bi.prototype.cb=function(a,c,f,g,h){if(_.ea(c))for(var l=0;l<c.length;l++)this.cb(a,c[l],f,g,h);else f=f||this.handleEvent,h=h||this.Ld||this,f=_.tl(f),g=!!g,c=_.wB(a)?_.ht(a.li,String(c),f,g,h):a?(a=_.zt(a))?_.ht(a,c,f,g,h):null:null,c&&(_.Ch(c),delete this.ha[c.key]);return this};_.di=function(a){_.qf(a.ha,_.Ch);a.ha={}};_.bi.prototype.C=function(){_.bi.T.C.call(this);_.di(this)};_.bi.prototype.handleEvent=function(){throw Error("v");};

var fi=function(a){var c=a.wb.ci();if(!c||!a.zt)return!1;var f=a.B,f=new _.X(f.anchorBox.left,f.anchorBox.top),c=_.tg(c.rb(),window);if(c.x==a.zt.x&&c.y==a.zt.y)return!1;a.zt.x=c.x;a.zt.y=c.y;f.x+=c.x;f.y+=c.y;_.Sh(f);a.ca=f;a.ye.style.cssText=_.KH(a,!0);return!0},gi=function(a,c,f,g){if(null!=a)for(a=a.firstChild;a;){if(c(a)&&(f.push(a),g)||gi(a,c,f,g))return!0;a=a.nextSibling}return!1},ii=function(a,c){var f=[];return gi(a,c,f,!0)?f[0]:void 0};
var mi,ni;
try{_.Xg(".gc-bubbleDefault{background-color:transparent !important;text-align:left;padding:0 !important;margin:0 !important;border:0 !important;table-layout:auto !important}.gc-reset{background-color:transparent !important;border:0 !important;padding:0 !important;margin:0 !important;text-align:left}.pls-bubbleTop{border-bottom:1px solid #ccc !important}.pls-topTail,.pls-vertShimLeft,.pls-contentLeft{background-image:url(//ssl.gstatic.com/s2/oz/images/stars/po/bubblev1/border_3.gif) !important}.pls-topTail{background-repeat:repeat-x !important;background-position:bottom !important}.pls-vertShim{background-color:#fff !important;text-align:right}.tbl-grey .pls-vertShim{background-color:#f5f5f5 !important}.pls-vertShimLeft{background-repeat:repeat-y !important;background-position:right !important;height:4px}.pls-vertShimRight{height:4px}.pls-confirm-container .pls-vertShim{background-color:#fff3c2 !important}.pls-contentWrap{background-color:#fff !important;position:relative !important;vertical-align:top}.pls-contentLeft{background-repeat:repeat-y;background-position:right;vertical-align:top}.pls-dropRight{background-image:url(//ssl.gstatic.com/s2/oz/images/stars/po/bubblev1/bubbleDropR_3.png) !important;background-repeat:repeat-y !important;vertical-align:top}.pls-vert,.pls-tailleft,.pls-dropTR .pls-dropBR,.pls-dropBL,.pls-vert img{vertical-align:top}.pls-dropBottom{background-image:url(//ssl.gstatic.com/s2/oz/images/stars/po/bubblev1/bubbleDropB_3.png) !important;background-repeat:repeat-x !important;width:100%;vertical-align:top}.pls-topLeft{background:inherit !important;text-align:right;vertical-align:bottom}.pls-topRight{background:inherit !important;text-align:left;vertical-align:bottom}.pls-bottomLeft{background:inherit !important;text-align:right}.pls-bottomRight{background:inherit !important;text-align:left;vertical-align:top}.pls-tailtop,.pls-tailright,.pls-tailbottom,.pls-tailleft{display:none;position:relative}.pls-tailbottom,.pls-tailtop,.pls-tailright,.pls-tailleft,.pls-dropTR,.pls-dropBR,.pls-dropBL{background-image:url(//ssl.gstatic.com/s2/oz/images/stars/po/bubblev1/bubbleSprite_3.png) !important;background-repeat:no-repeat}.tbl-grey .pls-tailbottom,.tbl-grey .pls-tailtop,.tbl-grey .pls-tailright,.tbl-grey .pls-tailleft,.tbl-grey .pls-dropTR,.tbl-grey .pls-dropBR,.tbl-grey .pls-dropBL{background-image:url(//ssl.gstatic.com/s2/oz/images/stars/po/bubblev1/bubbleSprite-grey.png) !important}.pls-tailbottom{background-position:-23px 0}.pls-confirm-container .pls-tailbottom{background-position:-23px -10px}.pls-tailtop{background-position:-19px -20px}.pls-tailright{background-position:0 0}.pls-tailleft{background-position:-10px 0}.pls-tailtop{vertical-align:top}.gc-bubbleDefault td{line-height:0;font-size:0}.pls-topLeft img,.pls-topRight img,.pls-tailbottom{vertical-align:bottom}.pls-bottomLeft img,.bubbleDropTR,.pls-dropBottomL img,.pls-dropBottom img,.pls-dropBottomR img,.pls-bottomLeft{vertical-align:top}.pls-dropTR{background-position:0 -22px}.pls-dropBR{background-position:0 -27px}.pls-dropBL{background-position:0 -16px}.pls-spacertop,.pls-spacerright,.pls-spacerbottom,.pls-spacerleft{position:static !important}.pls-spinner{bottom:0;position:absolute;left:0;margin:auto;right:0;top:0}")}catch(ED){_.sa("Failed to install bubble styles: "+ED),
_.D.setTimeout(function(){_.V.kr(ED)},0)}_.ji=function(a){_.Oh.call(this,a);this.I=new _.bi(this)};_.J(_.ji,_.Qh);_.k=_.ji.prototype;_.k.fo=!1;_.k.Pl=!1;_.k.vf=!1;_.k.Vi=!1;_.k.He=null;_.k.gk=!1;_.k.yj=!0;_.k.Ml=!0;
var si={},ui=0,wi={Bn:"bottom",co:"left",Fo:"right",Lo:"top"},xi={top:"bottom",bottom:"top",left:"right",right:"left"},yi={CENTER:"center",co:"left",Fo:"right"},zi={Bn:"bottom",CENTER:"center",Lo:"top"},Ai={"pls-default":"pls-container","pls-confirm":"pls-confirm-container"},ki=function(a,c){return ii(a,function(a){return _.ve(_.vf(a),c)})};
_.ji.prototype.resize=function(a){+a.width&&(this.wb.width=a.width);+a.height&&(this.wb.height=a.height);+a.contentWidth?this.wb.contentWidth=a.contentWidth:+a.width&&(this.wb.contentWidth=a.width);+a.contentHeight?this.wb.contentHeight=a.contentHeight:+a.height&&(this.wb.contentHeight=a.height);this.position(!1,a.noreposition);return!0};
var li=function(a,c,f,g,h,l){return['<img class="',g?g+" ":"",l?'"':'gc-reset"',' style="width:',a,"px !important; height:",c,"px !important; max-width: ",a,"px !important; max-height: ",c,'px !important;" src="',h?"":"https://ssl.gstatic.com/s2/oz/images/stars/po/bubblev1/",f,'"/>'].join("")};_.ji.prototype.close=function(){ni(this);_.ji.T.close.call(this)};mi=function(a){a.He||(a.He=window.setInterval((0,_.H)(a.fb,a),1E3))};ni=function(a){a.He&&(window.clearInterval(a.He),a.He=null)};
_.Sj=function(a){var c=window.document.createElement("div"),f=Number(a.B.width)||100,g=f+2+4,h={display:"block",visibility:"hidden",position:"absolute",width:g+"px",left:"-1000px",top:"-1000px"};a.B.height&&(h.height=+a.B.height+2+"px");_.Mg(c,h);a.vf=!!a.B.showSpinner;a.Vi=!!a.B.noPadding;a.gk=!!a.B.anchorToOpener;a.yj=0!=a.B.show;var g=(g=String(g))?g+"px":"100%",l=a.vf,h=a.Vi,n="";l&&(n=li(_.P("iframes/bubble/spinnerwidth")||16,_.P("iframes/bubble/spinnerheight")||16,_.P("iframes/bubble/spinnerurl")||
"https://ssl.gstatic.com/docs/documents/share/images/spinner-1.gif","pls-spinner",!0,!0));n+='<div class="goog-bubble-content gc-reset"'+(l?' style="visibility:hidden;"':"")+"></div>";l="gc-bubbleDefault pls-container";a.B.bubbleClass&&(l+=" tbl-"+a.B.bubbleClass);c.innerHTML=['<table cellpadding="0" cellspacing="0" dir="ltr" style="width:',g,';" frame="void" rules="none" class=" '+l+'">','<tr class="gc-reset"><td class="pls-topLeft gc-reset">',li(1,1,"border_3.gif"),'</td><td class="pls-topTail gc-reset">',
li(15,9,"spacer.gif","pls-tailbottom"),li(1,1,"spacer.gif","pls-spacerbottom"),'</td><td class="pls-topRight gc-reset">',li(1,1,"border_3.gif"),'</td></tr><tr class="gc-reset"><td class="pls-vertShimLeft gc-reset">',li(1,4,"spacer.gif"),"</td>",h?'<td rowspan="2" class="pls-contentWrap gc-reset">'+n+"</td>":'<td class="pls-vertShim gc-reset">'+li(1,4,"spacer.gif")+"</td>",'<td class="pls-vertShimRight gc-reset">',li(5,4,"spacer.gif","pls-dropTR"),'</td></tr><tr class="gc-reset"><td class="pls-contentLeft gc-reset">',
li(9,15,"spacer.gif","pls-tailright"),li(1,1,"spacer.gif","pls-spacerright"),"</td>",h?"":'<td class="pls-contentWrap gc-reset">'+n+"</td>",'<td class="pls-dropRight gc-reset">',li(12,19,"spacer.gif","pls-tailleft"),li(1,1,"spacer.gif","pls-spacerleft"),'</td></tr><tr class="gc-reset"><td class="pls-bottomLeft gc-reset">',li(1,1,"border_3.gif"),'</td><td class="gc-reset"><table cellpadding="0" cellspacing="0" style="width:100%" class="gc-reset"><tr class="gc-reset"><td class="pls-vert gc-reset">',
li(4,5,"spacer.gif","pls-dropBL"),'</td><td class="pls-dropBottom gc-reset">',li(19,13,"spacer.gif","pls-tailtop"),li(1,1,"spacer.gif","pls-spacertop"),'</td></tr></table></td><td class="pls-vert gc-reset">',li(5,5,"spacer.gif","pls-dropBR"),"</td></tr></table>"].join("");a.gk?(g=a.wb.ci().V(),g.style.position="relative"):g=window.document.body;g.appendChild(c);a.Ka=c.firstChild;a.B.bubbleType&&a.po(a.B.bubbleType);a.Ld=ki(a.Ka,"goog-bubble-content");a.B.where=a.Ld;a.B.div=c;a.B.attributes={style:"margin:0px;position:absolute;z-index:1;border-style:none;outline:none;width:"+
f+"px;"}};_.NH=function(a){ri(a);oi(a,a.B.maxExpectedSize);a.wb.qc(a.B.div);a.vf&&(a.position(!1),a.pa=!0);a.yj&&a.B.startVisible&&(a.wb.V().style.visibility="visible",mi(a),ti(a));a.I.Q(a.Ka,"mouseout",a.Uq);a.I.Q(a.Ka,"mouseover",a.Vq)};
_.ji.prototype.open=function(){_.Sj(this);var a=this.wb;a.ea("resize",(0,_.H)(this.resize,this));a.fg("setHideOnLeave",(0,_.H)(this.Wq,this));a.fg("setBubbleType",(0,_.H)(this.po,this));a.fg("show",(0,_.H)(this.show,this));a.fg("showSpinner",(0,_.H)(this.Na,this));a.fg("clearHideOnLeaveTimeout",(0,_.H)(this.ie,this));a.methods.closeOrHideThisBubble=(0,_.H)(this.qk,this);var c=a.V();c?this.Ld.appendChild(c):a.Pa(this.Ld||null,this.B.attributes);_.NH(this)};
_.ji.prototype.fb=function(){var a=this.wb.ci();if(a&&this.ye){var a=a.V(),c=a.currentStyle||window.getComputedStyle(a,"");0===a.offsetWidth&&0===a.offsetHeight||"none"==c.display||"hidden"==c.visibility?this.wb.close():fi(this)&&this.position(!0)}else ni(this)};var oi=function(a,c){var f=(c||{}).height;f&&(a.wb.maxExpectedSize||(a.wb.maxExpectedSize={}),a.wb.maxExpectedSize.height=f)};
_.ji.prototype.te=function(a){this.Pl=!0;a=a||{};var c=a.height;c&&(this.wb.height=c);var f=a.width;f&&(this.wb.width=f);f=a.contentWidth||f;+f&&(this.wb.contentWidth=f);c=a.contentHeight||c;+c&&(this.wb.contentHeight=c);oi(this,a.maxExpectedSize);this.pa&&qi(this,!1);this.yj&&!this.Za&&this.show(!0)};_.ji.prototype.Oe=function(a){this.te(a)};_.ji.prototype.Na=function(a){a&&(this.pa=!1);qi(this,a)};
var qi=function(a,c){a.vf=c;var f=_.Df("pls-spinner",a.wb.V());f&&(f.style.visibility=c?"":"hidden");if(f=_.Df("goog-bubble-content",a.wb.V()))f.style.visibility=c?"hidden":""};
_.ji.prototype.position=function(a,c){var f,g=this.wb.Hh(),h=_.kg(g);if(h){h.style.height=(this.wb.contentHeight||+this.B.contentHeight||this.wb.height||+this.B.height)+"px";g=this.wb.contentWidth||+this.B.contentWidth||+this.B.width;h.style.width=g?g+"px":"100%";g=this.wb.width||+this.B.width;h=this.wb.height||+this.B.height;_.Mg(this.Ld,{width:g+"px",height:h+"px"});var l=g+2+4,n=(this.Vi?Math.max(h,4):h+4)+2+4;this.Ka.style.width=l+"px";h=this.wb.V();h.style.width=l+"px";g=_.LH(this);this.ye.style.cssText=
_.KH(this,!0);var q=_.ug(g),t=_.Lg(h),v=_.Lg(g);f=_.ig(window);if(!this.fo||a){this.fo=!0;var w=this.wb.maxExpectedSize,t=t.clone();w&&w.height&&(t.height=w.height);t:{var A=this.B.expandTo,w=["bottom","top","right","left"];if(A){for(var A=w=A.concat(w),F={},z=0,I=0;I<A.length;){var E=A[I++];F[E]||(F[E]=!0,A[z++]=E)}A.length=z}for(A=0;A<w.length;++A)switch(w[A]){case "bottom":if(q.y+v.height+t.height<=f.height){t="bottom";break t}break;case "top":if(0<=q.y-t.height){t="top";break t}break;case "left":if(0<=
q.x-t.width){t="left";break t}break;case "right":if(q.x+t.width+v.width<=f.width){t="right";break t}}t=w[0]}this.G=t;this.ha=this.B.anchorPosition;this.M=this.B.targetPosition;"top"==this.G||"bottom"==this.G?_.hi(yi,this.ha)&&_.hi(yi,this.M)||(this.M=this.ha="left"):_.hi(zi,this.ha)&&_.hi(zi,this.M)||(this.M=this.ha="center");this.wc=this.B.arrowPosition;this.wc?"top"==this.G||"bottom"==this.G?_.hi(yi,this.wc)||(this.wc="center"):_.hi(zi,this.wc)||(this.wc="center"):this.wc="center";t=this.G;w=this.M;
A={};A.anchor=t+"-"+this.ha;A.target=xi[t]+"-"+w;this.xu=A;ki(this.Ka,"pls-spacer"+this.G).style.display="none";for(var K in wi)wi.hasOwnProperty(K)&&(t=wi[K],t!=this.G&&(ki(this.Ka,"pls-spacer"+t).style.display="block",ki(this.Ka,"pls-tail"+t).style.display="none"));this.Ei=ki(this.Ka,"pls-tail"+this.G);this.Ei.style.display="inline"}switch(this.G){case "top":n+=8;break;case "right":l+=8;break;case "bottom":n+=8;break;case "left":l+=7}_.Mg(this.Ka,{width:l+"px",height:n+"px"});_.Mg(h,{width:l+"px",
height:n+"px"});l=t=_.Lg(h);K={x:0,y:0};w=l.width;A=l.height;"top"==this.G||"bottom"==this.G?(n="right"==this.ha?v.width:"center"==this.ha?v.width/2:0,t="right"==this.M?w:"center"==this.M?w/2:0,q=Math.max(0,Math.min(q.x,f.width-n)),q+=n-t,"right"==this.M&&(K.x+=4),q+w>f.width&&(f=q+w-f.width,K.x-=f,q-=f),0>q&&(K.x-=q)):(n="bottom"==this.ha?v.height:"center"==this.ha?v.height/2:0,t="bottom"==this.M?A:"center"==this.M?A/2:0,q=Math.max(0,Math.min(q.y,f.height-n)),q+=n-t,q+A>f.height&&(f=q+A-f.height,
K.y-=f,q-=f),0>q&&(K.y-=q));n=-K.x;f=-K.y;"right"==this.ha?K.x*=-1:"bottom"==this.ha&&(K.y*=-1);w=l.width-4;A=l.height-4;q=t=0;if("top"==this.G||"bottom"==this.G){switch(this.wc){case "left":t-=7;break;case "right":t=v.width-7;break;default:t=v.width/2-7}"center"==this.M?t+=w/2:"right"==this.M&&(t+=w);"center"==this.ha?t-=v.width/2:"right"==this.ha&&(t-=v.width);"top"==this.G&&(t-=4)}else{switch(this.wc){case "top":q-=7;break;case "bottom":q+=v.height-7;break;default:q+=v.height/2-7}"center"==this.M?
q+=A/2:"bottom"==this.M&&(q+=A);"center"==this.ha?q-=v.height/2:"bottom"==this.ha&&(q-=v.height);q-=4}w=this.G;v=l.width;"right"==w||"left"==w?v=0:(n=Math.max(6,n+t),v=Math.min(n,v-6-15-8));n=this.G;"top"==n||"bottom"==n?f=0:(l=l.height-6-15-8,f=Math.min(Math.max(6,f+q),l));q=_.Lg(this.Ei);l=_.Lg(this.Ld);q=q.top+q.height>l.top+l.height;if(!c||"top"===this.G||q)_.Mg(this.Ei,{left:v+"px",top:f+"px"}),g&&_.Vh(h,this.xu.target,g,this.xu.anchor,K);this.ye.style.cssText=_.KH(this,!1)}else _.Lb("Cannot resize already-closed iframe "+
g+".")};_.ji.prototype.po=function(a){this.Ka&&a in Ai&&(this.Ka.className="gc-bubbleDefault "+Ai[a])};_.ji.prototype.show=function(a){if(!a||this.Pl||this.vf){var c=this.wb.V().style;a?(ri(this),fi(this),this.position(!0),ti(this)):(c.left="-10000px",c.top="-10000px");this.Za=!a;c.visibility=a?"visible":"hidden";a?mi(this):ni(this);this.wb.bi?(c=this.wb.methods.onVisibilityChanged)&&c(a):!this.wb.Ma()&&this.wb.ds(a);this.ie()}else this.Za=!1};
var ri=function(a){var c=a.B.bubbleGroup||"",f=si[c];f!==a&&(f&&(f.wb.va().hideClickDetection&&f.show?f.show(!1):f.close()),si[c]=a)},ti=function(a){var c=Math.max(_.Uh(a),ui+1);_.Mg(a.wb.V(),{zIndex:c});ui=c};_.k=_.ji.prototype;_.k.qk=function(){this.B.hideClickDetection?this.show(!1):this.wb.close()};_.k.Wq=function(a){this.Ml=a};_.k.Vq=function(){this.ie()};_.k.Uq=function(a){this.Kh||!this.Ml||a.relatedTarget&&_.Yf(this.Ka,a.relatedTarget)||(this.Kh=_.D.setTimeout((0,_.H)(this.qk,this),250))}; _.k.ie=function(){this.Kh&&(_.D.clearTimeout(this.Kh),this.Kh=null)};

var GC,HC,Ju;for(_.FC=function(a){return{va:function(){return a},ci:function(){return a.openerIframe}}},GC=function(a){(new _.Oh(_.FC(a))).eb()},HC="bubble circlepicker float hover hover-menu slide-menu".split(" "),Ju=0;Ju<HC.length;Ju++)_.eA[HC[Ju]]=GC;

_.hA.bubble=function(a){var c=new _.ji(_.FC(a)),f=new _.Zh(c);c.open=function(){};_.Sj(c);a.onClose=function(){c.close()};a.onRestyle=function(a){if(a){var f=!1;a.hasOwnProperty("setBubbleType")&&(c.po(a.setBubbleType),f=!0);a.hasOwnProperty("show")&&(c.show(a.show),f=!0);a.hasOwnProperty("showSpinner")&&(c.Na(a.showSpinner),f=!0);a.hasOwnProperty("clearHideOnLeaveTimeout")&&(c.ie(),f=!0);a.hasOwnProperty("setHideOnLeave")&&(c.Wq(a.setHideOnLeave),f=!0);a.hasOwnProperty("setBubbleType")&&(c.po(a.setBubbleType), f=!0);f||c.resize(a)}};a.onCreate=function(a){a.ci=function(){return this.Zf("openerIframe")};a=f.wb=c.wb=a;a.register("_ready",(0,_.H)(c.te,c),_.Vz);a.register("closeOrHideThisBubble",(0,_.H)(c.qk,c),_.Vz);_.NH(c);f.open()}};

});
// Google Inc.