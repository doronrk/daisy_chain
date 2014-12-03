Type.registerNamespace("AjaxControlToolkit");AjaxControlToolkit.BoxCorners=function(){throw Error.invalidOperation()};AjaxControlToolkit.BoxCorners.prototype={None:0,TopLeft:1,TopRight:2,BottomRight:4,BottomLeft:8,Top:1|2,Right:2|4,Bottom:4|8,Left:8|1,All:1|2|4|8};AjaxControlToolkit.BoxCorners.registerEnum("AjaxControlToolkit.BoxCorners",true);AjaxControlToolkit.RoundedCornersBehavior=function(c){var b=null,a=this;AjaxControlToolkit.RoundedCornersBehavior.initializeBase(a,[c]);a._corners=AjaxControlToolkit.BoxCorners.All;a._radius=5;a._color=b;a._parentDiv=b;a._originalStyle=b;a._borderColor=b;a._isDirty=true};AjaxControlToolkit.RoundedCornersBehavior.prototype={initialize:function(){AjaxControlToolkit.RoundedCornersBehavior.callBaseMethod(this,"initialize");this.update()},dispose:function(){this.disposeParentDiv();AjaxControlToolkit.RoundedCornersBehavior.callBaseMethod(this,"dispose")},update:function(){var k=true,e="1px",h="solid",g="none",f="px",a=this,d=a.get_element();if(!d||!a._isDirty||a.get_isUpdating())return;a.disposeParentDiv();var u=a.getBackgroundColor(),p=d.offsetWidth,b=d.cloneNode(false);a.moveChildren(d,b);a._originalStyle=d.style.cssText;d.style.backgroundColor="transparent";d.style.verticalAlign="top";d.style.padding="0";d.style.overflow="";d.style.className="";if(d.style.height&&d.style.height!="auto")d.style.height=parseInt($common.getCurrentStyle(d,"height"))+a._radius*2+f;else if(!d.style.width&&0<p)d.style.width=p+f;b.style.position="";b.style.border="";b.style.margin="";b.style.width="100%";b.id="";b.removeAttribute("control");if(a._borderColor){b.style.borderTopStyle=g;b.style.borderBottomStyle=g;b.style.borderLeftStyle=h;b.style.borderRightStyle=h;b.style.borderLeftColor=a._borderColor;b.style.borderRightColor=a._borderColor;b.style.borderLeftWidth=e;b.style.borderRightWidth=e;if(a._radius==0){b.style.borderTopStyle=h;b.style.borderBottomStyle=h;b.style.borderTopColor=a._borderColor;b.style.borderBottomColor=a._borderColor;b.style.borderTopWidth=e;b.style.borderBottomWidth=e}}else{b.style.borderTopStyle=g;b.style.borderBottomStyle=g;b.style.borderLeftStyle=g;b.style.borderRightStyle=g}var l=null,o=a._radius,s=a._radius,q=0;for(var n=s;n>0;n--){var t=Math.acos(n/o),m=o-Math.round(Math.sin(t)*o),c=document.createElement("DIV");c.__roundedDiv=k;c.style.backgroundColor=u;c.style.marginLeft=m+f;c.style.marginRight=m-(a._borderColor?2:0)+f;c.style.height=e;c.style.fontSize=e;c.style.overflow="hidden";if(a._borderColor){c.style.borderLeftStyle=h;c.style.borderRightStyle=h;c.style.borderLeftColor=a._borderColor;c.style.borderRightColor=a._borderColor;var r=Math.max(0,q-m-1);c.style.borderLeftWidth=r+1+f;c.style.borderRightWidth=r+1+f;if(n==s){c.__roundedDivNoBorder=k;c.style.backgroundColor=a._borderColor}}d.insertBefore(c,l);var j=c;c=c.cloneNode(k);c.__roundedDiv=k;d.insertBefore(c,l);var i=c;l=c;q=m;if(!a.isCornerSet(AjaxControlToolkit.BoxCorners.TopLeft)){j.style.marginLeft="0";if(a._borderColor)j.style.borderLeftWidth=e}if(!a.isCornerSet(AjaxControlToolkit.BoxCorners.TopRight)){j.style.marginRight="0";if(a._borderColor){j.style.borderRightWidth=e;j.style.marginRight="-2px"}}if(!a.isCornerSet(AjaxControlToolkit.BoxCorners.BottomLeft)){i.style.marginLeft="0";if(a._borderColor)i.style.borderLeftWidth=e}if(!a.isCornerSet(AjaxControlToolkit.BoxCorners.BottomRight)){i.style.marginRight="0";if(a._borderColor){i.style.borderRightWidth=e;i.style.marginRight="-2px"}}}d.insertBefore(b,l);a._parentDiv=b;a._isDirty=false},disposeParentDiv:function(){var a=this;if(a._parentDiv){var b=a.get_element(),e=b.childNodes;for(var d=e.length-1;d>=0;d--){var c=e[d];if(c){if(c==a._parentDiv)a.moveChildren(c,b);try{b.removeChild(c)}catch(b){}}}if(a._originalStyle){b.style.cssText=a._originalStyle;a._originalStyle=null}a._parentDiv=null}},getBackgroundColor:function(){if(this._color)return this._color;return $common.getCurrentStyle(this.get_element(),"backgroundColor")},moveChildren:function(b,d){var c=0;while(b.hasChildNodes()){var a=b.childNodes[0];a=b.removeChild(a);d.appendChild(a);c++}return c},isCornerSet:function(a){return (this._corners&a)!=AjaxControlToolkit.BoxCorners.None},setCorner:function(b,c){var a=this;if(c)a.set_Corners(a._corners|b);else a.set_Corners(a._corners&~b)},get_Color:function(){return this._color},set_Color:function(b){var a=this;if(b!=a._color){a._color=b;a._isDirty=true;a.update();a.raisePropertyChanged("Color")}},get_Radius:function(){return this._radius},set_Radius:function(b){var a=this;if(b!=a._radius){a._radius=b;a._isDirty=true;a.update();a.raisePropertyChanged("Radius")}},get_Corners:function(){return this._corners},set_Corners:function(b){var a=this;if(b!=a._corners){a._corners=b;a._isDirty=true;a.update();a.raisePropertyChanged("Corners")}},get_BorderColor:function(){return this._borderColor},set_BorderColor:function(b){var a=this;if(b!=a._borderColor){a._borderColor=b;a._isDirty=true;a.update();a.raisePropertyChanged("BorderColor")}}};AjaxControlToolkit.RoundedCornersBehavior.registerClass("AjaxControlToolkit.RoundedCornersBehavior",AjaxControlToolkit.BehaviorBase);
if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();