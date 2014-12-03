if(typeof S7Element=="undefined"){var S7Element={};var SjElement=function(b,a){if(arguments[0]=="empty"){return}this._parent=b||self;this.window=(b&&b.window)||self;this.document=(b&&b.document)||self.document;this.name=this._elementId=a||"SjElement"+parseInt(SjElement.Count++);this.tag=null;this._x=0;this._y=0;this._z=0;this._width=0;this._height=0;this._visible=false;this._opacity=100;this._fadeTime=2000;this._color="";this._backColor="";this._backImage="";this._fadeid=null;this._content=sjGetElement(this._elementId);if(this._content){this._content._draggable=false}SjElement.all[this._elementId]=this};SjElement.prototype.getParent=function(){return this._parent};SjElement.prototype.getElementId=function(){return this._elementId};SjElement.prototype.getElement=function(){return sjGetElement(this._elementId)};SjElement.prototype.toString=function(){return'SjElement.all["'+this._elementId+'"]'};SjElement.prototype.visible=function(a){var b=sjGetElementStyle(this._elementId);if(a!=null&&b){this._visible=a;if(a){b.visibility="inherit"}else{b.visibility="hidden"}}return this._visible};SjElement.prototype.pageXY=function(){return sjGetPageCoords(sjGetElement(this._elementId))};SjElement.prototype.left=function(a){if(a==null){return this._x}else{if(document.getElementById){this._content.style.left=parseInt(a)+"px"}else{if(document.all){this._content.style.pixelLeft=parseInt(a)+"px"}else{if(document.layers){this._content.moveTo(parseInt(a),parseInt(inY))}}}this._x=parseInt(a);return this._x}};SjElement.prototype.top=function(a){if(a==null){return this._y}else{if(document.getElementById){this._content.style.top=parseInt(a)+"px"}else{if(document.all){this._content.style.pixelTop=parseInt(a)+"px"}else{if(document.layers){this._content.moveTo(parseInt(inX),parseInt(a))}}}this._y=parseInt(a);return this._y}};SjElement.prototype.toXY=function(a,b){var c={x:this.left(a),y:this.top(b)};this.fireEvent("setXY");return c};SjElement.prototype.width=function(a){if(a==null){return this._width}else{if(document.getElementById){this._content.style.width=a+"px"}else{if(document.all){this._content.style.posWidth=a+"px"}else{if(layer.clip){this._content.clip.width=a}}}this._width=a;return this._width}};SjElement.prototype.height=function(a){if(a==null){return this._height}else{if(document.getElementById){this._content.style.height=a+"px"}else{if(document.all){this._content.style.posHeight=a+"px"}else{if(layer.clip){this._content.clip.height=a}}}this._height=a;return this._height}};SjElement.prototype.setSize=function(b,a){var c={w:this.width(b),h:this.height(a)};this.fireEvent("setSize");return c};SjElement.prototype.clip=function(c,e,d,b){var f=sjGetElementStyle(this._elementId);var a=parseInt(f.borderWidth);if(a){sjSetClip(this._elementId,this._x,this._y,e,d+2*a,b+2*a,c)}else{sjSetClip(this._elementId,this._x,this._y,e,d,b,c)}};SjElement.prototype.setBorder=function(c,b,a){stl=sjGetElementStyle(this._elementId);stl.borderWidth=c+"px"||0;stl.borderStyle=b||"solid";stl.borderColor=a||"#000000"};SjElement.prototype.getBorder=function(){stl=sjGetElementStyle(this._elementId);return parseInt(stl.borderWidth)};SjElement.prototype.opacity=function(b){if(b!=null){var a=sjGetElement(this._elementId);if(b<0){b=0}if(b>99){b=99}a.style.opacity=(b/100);a.style.MozOpacity=(b/100);a.style.KhtmlOpacity=(b/100);a.style.filter="alpha(opacity="+b+")";this._opacity=b}};SjElement.prototype.zIndex=function(a){if(a==null){return this._z}else{sjSetZIndex(this._elementId,a);this._z=a;return sjGetZIndex(this._elementId)}};SjElement.prototype.setFadeTime=function(a){this._fadeTime=a};SjElement.prototype.fadeIn=function(a){if(this._fadeid){clearTimeout(this._fadeid);this._fadeid=null}this._opacity=0;this.fadeStartTime=new Date().getTime();this.fadeStartOpacity=this._opacity;this.fadeTo(99,a)};SjElement.prototype.fadeOut=function(a){if(this._fadeid){clearTimeout(this._fadeid);this._fadeid=null}this._opacity=99;this.fadeStartTime=new Date().getTime();this.fadeStartOpacity=this._opacity;this.fadeTo(0,a)};SjElement.prototype.fadeTo=function(c,b){if(this._opacity==null){return}var a=new Date().getTime()-this.fadeStartTime;if(a>=b){this.opacity(c);this.visible((this._opacity>0)?true:false);clearTimeout(this._fadeid);this._fadeid=null;if(this.afterFade){this.afterFade()}return}else{var d=Math.round(this.fadeStartOpacity+(c-this.fadeStartOpacity)*a/b);this.opacity(d);this.visible((this._opacity>0)?true:false);this._fadeid=setTimeout(this+".fadeTo("+c+","+b+")",5)}};SjElement.prototype.color=function(a){if(a==null){return this._color}else{sjSetBackColor(this._elementId,a);this._color=a;return this._color}};SjElement.prototype.background=function(a,b){if(a){this._backColor=a}if(b){this._backImage=b}};SjElement.prototype.addEventHandler=function(a,b){var c=this;var d=0;var e=0;this._content=sjGetElement(this._elementId);this._content["on"+a.toLowerCase()]=function(f){if(!f){var f=window.event}var g=null;if(f.target){g=(f.target.nodeType==3)?f.target.parentNode:f.target}else{g=f.srcElement}if(f.modifiers){f.shiftKey=((f.modifiers&Event.SHIFT_MASK)!=0);f.altKey=((f.modifiers&Event.ALT_MASK)!=0);f.ctrlKey=((f.modifiers&Event.CONTROL_MASK)!=0);f.button=f.which;f.keyCode=f.which}if(f.pageX||f.pageY){f.posx=f.pageX;f.posy=f.pageY}else{if(f.clientX||f.clientY){f.posx=f.clientX+document.body.scrollLeft;f.posy=f.clientY+document.body.scrollTop}}return b(c,f,g)}};SjElement.prototype.removeEventHandler=function(a,b){if(document.layers){this.releaseEvents(Event[a.toUpperCase()]);delete this._content[Event[a.toUpperCase()]]}this._content["on"+a.toLowerCase()]=null};SjElement.prototype.makeEventObject=function(b){var a=new Object();a.type=b[0];a.target=this;for(i=1;i<b.length;i+=2){a[b[i]]=b[i+1]}return a};SjElement.prototype.addEventListener=function(d,c){d=d.toLowerCase();if(!this.hashtable_eventlisteners){this.hashtable_eventlisteners=new SjHashtable()}var a=this.hashtable_eventlisteners.get(d);if(!a){a=new Array();this.hashtable_eventlisteners.put(d,a)}var b=this.indexOfEventListener(d,c);if(b==-1){a.push(c)}};SjElement.prototype.removeEventListener=function(f,e){f=f.toLowerCase();if(this.hashtable_eventlisteners){var a=this.hashtable_eventlisteners.get(f);if(a){var d=this.indexOfEventListener(f,e);if(d!=-1){var b=new Array();for(var c=0;c<a.length;c++){if(a[c]!=e){b.push(a[c])}}this.hashtable_eventlisteners.put(f,b)}}}};SjElement.prototype.fireEventObject=function(c){if(this.hashtable_eventlisteners&&this.hashtable_eventlisteners.size()>0){var a=this.hashtable_eventlisteners.get(c.type.toLowerCase());if(a){var b;for(b=0;b<a.length;b++){a[b](c)}}}};SjElement.prototype.fireEvent=function(){var a=this.makeEventObject(arguments);this.fireEventObject(a)};SjElement.prototype.indexOfEventListener=function(d,c){var e=-1;d=d.toLowerCase();var b;if(this.hashtable_eventlisteners){var a=this.hashtable_eventlisteners.get(d);if(a){for(b=0;b<a.length;b++){if(a[b]==c){e=b;break}}}}return e};SjElement.Count=0;SjElement.all=[]};