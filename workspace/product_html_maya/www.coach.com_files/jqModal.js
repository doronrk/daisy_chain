(function(d){d.fn.jqm=function(f){var e={overlay:50,overlayClass:"jqmOverlay",closeClass:"jqmClose",trigger:".jqModal",ajax:o,ajaxText:"",target:o,modal:o,toTop:o,onShow:o,onHide:o,onLoad:o};return this.each(function(){if(this._jqm){return n[this._jqm].c=d.extend({},n[this._jqm].c,f)}p++;this._jqm=p;n[p]={c:d.extend(e,d.jqm.params,f),a:o,w:d(this).addClass("jqmID"+p),s:p};if(e.trigger){d(this).jqmAddTrigger(e.trigger)}})};d.fn.jqmAddClose=function(f){return l(this,f,"jqmHide")};d.fn.jqmAddTrigger=function(f){return l(this,f,"jqmShow")};d.fn.jqmShow=function(e){return this.each(function(){d.jqm.open(this._jqm,e)})};d.fn.jqmHide=function(e){return this.each(function(){d.jqm.close(this._jqm,e)})};d.jqm={hash:{},open:function(B,A){var m=n[B],q=m.c,i="."+q.closeClass,v=(parseInt(m.w.css("z-index"))),v=(v>0)?v:100000000,f=d("<div></div>").css({height:"100%",width:"100%",position:"fixed",left:0,top:0,"z-index":v-1,opacity:q.overlay/100});if(m.a){return o}m.t=A;m.a=true;m.w.css("z-index",v);if(q.modal){if(!a[0]){k("bind")}a.push(B)}else{if(q.overlay>0){m.w.jqmAddClose(f)}else{f=o}}m.o=(f)?f.addClass(q.overlayClass).prependTo("body"):o;if(c){d("html,body").css({height:"100%",width:"100%"});if(f){f=f.css({position:"absolute"})[0];for(var w in {Top:1,Left:1}){f.style.setExpression(w.toLowerCase(),"(_=(document.documentElement.scroll"+w+" || document.body.scroll"+w+"))+'px'")}}}if(q.ajax){var e=q.target||m.w,x=q.ajax,e=(typeof e=="string")?d(e,m.w):d(e),x=(x.substr(0,1)=="@")?d(A).attr(x.substring(1)):x;e.html(q.ajaxText).load(x,function(){if(q.onLoad){q.onLoad.call(this,m)}if(i){m.w.jqmAddClose(d(i,m.w))}j(m)})}else{if(i){m.w.jqmAddClose(d(i,m.w))}}if(q.toTop&&m.o){m.w.before('<span id="jqmP'+m.w[0]._jqm+'"></span>').insertAfter(m.o)}(q.onShow)?q.onShow(m):m.w.show();j(m);return o},close:function(f){var e=n[f];if(!e.a){return o}e.a=o;if(a[0]){a.pop();if(!a[0]){k("unbind")}}if(e.c.toTop&&e.o){d("#jqmP"+e.w[0]._jqm).after(e.w).remove()}if(e.c.onHide){e.c.onHide(e)}else{e.w.hide();if(e.o){e.o.remove()}}return o},params:{}};var p=0,n=d.jqm.hash,a=[],c=d.browser.msie&&(d.browser.version=="6.0"),o=false,g=d('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),j=function(e){if(c){if(e.o){e.o.html('<p style="width:100%;height:100%"/>').prepend(g)}else{if(!d("iframe.jqm",e.w)[0]){e.w.prepend(g)}}}h(e)},h=function(f){try{d(":input:visible",f.w)[0].focus()}catch(e){}},k=function(e){d()[e]("keypress",b)[e]("keydown",b)[e]("mousedown",b)},b=function(m){var f=n[a[a.length-1]],i=(!d(m.target).parents(".jqmID"+f.s)[0]);if(i){h(f)}return !i},l=function(e,f,i){return e.each(function(){var m=this._jqm;d(f).each(function(){if(!this[i]){this[i]=[];d(this).click(function(){for(var q in {jqmShow:1,jqmHide:1}){for(var r in this[q]){if(n[this[q][r]]){n[this[q][r]].w[q](this)}}}return o})}this[i].push(m)})})}})(jQuery);(function(e){e.fn.jqDrag=function(f){return b(this,f,"d")};e.fn.jqResize=function(f){return b(this,f,"r")};e.jqDnR={dnr:{},e:0,drag:function(f){if(g.k=="d"){d.css({left:g.X+f.pageX-g.pX,top:g.Y+f.pageY-g.pY})}else{d.css({width:Math.max(f.pageX-g.pX+g.W,0),height:Math.max(f.pageY-g.pY+g.H,0)})}return false},stop:function(){d.css("opacity",g.o);e().unbind("mousemove",a.drag).unbind("mouseup",a.stop)}};var a=e.jqDnR,g=a.dnr,d=a.e,b=function(j,i,f){return j.each(function(){i=(i)?e(i,j):j;i.bind("mousedown",{e:j,k:f},function(h){var m=h.data,l={};d=m.e;if(d.css("position")!="relative"){try{d.position(l)}catch(k){}}g={X:l.left||c("left")||0,Y:l.top||c("top")||0,W:c("width")||d[0].scrollWidth||0,H:c("height")||d[0].scrollHeight||0,pX:h.pageX,pY:h.pageY,k:m.k,o:d.css("opacity")};d.css({opacity:1});e().mousemove(e.jqDnR.drag).mouseup(e.jqDnR.stop);return false})})},c=function(f){return parseInt(d.css(f))||false}})(jQuery);