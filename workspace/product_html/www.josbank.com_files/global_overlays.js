jQuery.ui||(
function(c){var i=c.fn.remove,d=c.browser.mozilla&&(parseFloat(c.browser.version)<1.9);c.ui={version:"1.7",plugin:{add:function(k,l,n){var m=c.ui[k].prototype;for(var j in n){m.plugins[j]=m.plugins[j]||[];m.plugins[j].push([l,n[j]])}},call:function(j,l,k){var n=j.plugins[l];if(!n||!j.element[0].parentNode){return}for(var m=0;m<n.length;m++){if(j.options[n[m][0]]){n[m][1].apply(j.element,k)}}}},contains:function(k,j){return document.compareDocumentPosition?k.compareDocumentPosition(j)&16:k!==j&&k.contains(j)},hasScroll:function(m,k){if(c(m).css("overflow")=="hidden"){return false}var j=(k&&k=="left")?"scrollLeft":"scrollTop",l=false;if(m[j]>0){return true}m[j]=1;l=(m[j]>0);m[j]=0;return l},isOverAxis:function(k,j,l){return(k>j)&&(k<(j+l))},isOver:function(o,k,n,m,j,l){return c.ui.isOverAxis(o,n,j)&&c.ui.isOverAxis(k,m,l)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};if(d){var f=c.attr,e=c.fn.removeAttr,h="http://www.w3.org/2005/07/aaa",a=/^aria-/,b=/^wairole:/;c.attr=function(k,j,l){var m=l!==undefined;return(j=="role"?(m?f.call(this,k,j,"wairole:"+l):(f.apply(this,arguments)||"").replace(b,"")):(a.test(j)?(m?k.setAttributeNS(h,j.replace(a,"aaa:"),l):f.call(this,k,j.replace(a,"aaa:"))):f.apply(this,arguments)))};c.fn.removeAttr=function(j){return(a.test(j)?this.each(function(){this.removeAttributeNS(h,j.replace(a,""))}):e.call(this,j))}}c.fn.extend({remove:function(){c("*",this).add(this).each(function(){c(this).triggerHandler("remove")});return i.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false})},scrollParent:function(){var j;if((c.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){j=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(c.curCSS(this,"position",1))&&(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}else{j=this.parents().filter(function(){return(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}return(/fixed/).test(this.css("position"))||!j.length?c(document):j}});c.extend(c.expr[":"],{data:function(l,k,j){return!!c.data(l,j[3])},focusable:function(k){var l=k.nodeName.toLowerCase(),j=c.attr(k,"tabindex");return(/input|select|textarea|button|object/.test(l)?!k.disabled:"a"==l||"area"==l?k.href||!isNaN(j):!isNaN(j))&&!c(k)["area"==l?"parents":"closest"](":hidden").length},tabbable:function(k){var j=c.attr(k,"tabindex");return(isNaN(j)||j>=0)&&c(k).is(":focusable")}});function g(m,n,o,l){function k(q){var p=c[m][n][q]||[];return(typeof p=="string"?p.split(/,?\s+/):p)}var j=k("getter");if(l.length==1&&typeof l[0]=="string"){j=j.concat(k("getterSetter"))}return(c.inArray(o,j)!=-1)}c.widget=function(k,j){var l=k.split(".")[0];k=k.split(".")[1];c.fn[k]=function(p){var n=(typeof p=="string"),o=Array.prototype.slice.call(arguments,1);if(n&&p.substring(0,1)=="_"){return this}if(n&&g(l,k,p,o)){var m=c.data(this[0],k);return(m?m[p].apply(m,o):undefined)}return this.each(function(){var q=c.data(this,k);(!q&&!n&&c.data(this,k,new c[l][k](this,p))._init());(q&&n&&c.isFunction(q[p])&&q[p].apply(q,o))})};c[l]=c[l]||{};c[l][k]=function(o,n){var m=this;this.namespace=l;this.widgetName=k;this.widgetEventPrefix=c[l][k].eventPrefix||k;this.widgetBaseClass=l+"-"+k;this.options=c.extend({},c.widget.defaults,c[l][k].defaults,c.metadata&&c.metadata.get(o)[k],n);this.element=c(o).bind("setData."+k,function(q,p,r){if(q.target==o){return m._setData(p,r)}}).bind("getData."+k,function(q,p){if(q.target==o){return m._getData(p)}}).bind("remove",function(){return m.destroy()})};c[l][k].prototype=c.extend({},c.widget.prototype,j);c[l][k].getterSetter="option"};c.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")},option:function(l,m){var k=l,j=this;if(typeof l=="string"){if(m===undefined){return this._getData(l)}k={};k[l]=m}c.each(k,function(n,o){j._setData(n,o)})},_getData:function(j){return this.options[j]},_setData:function(j,k){this.options[j]=k;if(j=="disabled"){this.element[k?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",k)}},enable:function(){this._setData("disabled",false)},disable:function(){this._setData("disabled",true)},_trigger:function(l,m,n){var p=this.options[l],j=(l==this.widgetEventPrefix?l:this.widgetEventPrefix+l);m=c.Event(m);m.type=j;if(m.originalEvent){for(var k=c.event.props.length,o;k;){o=c.event.props[--k];m[o]=m.originalEvent[o]}}this.element.trigger(m,n);return!(c.isFunction(p)&&p.call(this.element[0],m,n)===false||m.isDefaultPrevented())}};c.widget.defaults={disabled:false};c.ui.mouse={_mouseInit:function(){var j=this;this.element.bind("mousedown."+this.widgetName,function(k){return j._mouseDown(k)}).bind("click."+this.widgetName,function(k){if(j._preventClickEvent){j._preventClickEvent=false;k.stopImmediatePropagation();return false}});if(c.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");this.element.attr("unselectable","on")}this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);(c.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))},_mouseDown:function(l){l.originalEvent=l.originalEvent||{};if(l.originalEvent.mouseHandled){return}(this._mouseStarted&&this._mouseUp(l));this._mouseDownEvent=l;var k=this,m=(l.which==1),j=(typeof this.options.cancel=="string"?c(l.target).parents().add(l.target).filter(this.options.cancel).length:false);if(!m||j||!this._mouseCapture(l)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){k.mouseDelayMet=true},this.options.delay)}if(this._mouseDistanceMet(l)&&this._mouseDelayMet(l)){this._mouseStarted=(this._mouseStart(l)!==false);if(!this._mouseStarted){l.preventDefault();return true}}this._mouseMoveDelegate=function(n){return k._mouseMove(n)};this._mouseUpDelegate=function(n){return k._mouseUp(n)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);(c.browser.safari||l.preventDefault());l.originalEvent.mouseHandled=true;return true},_mouseMove:function(j){if(c.browser.msie&&!j.button){return this._mouseUp(j)}if(this._mouseStarted){this._mouseDrag(j);return j.preventDefault()}if(this._mouseDistanceMet(j)&&this._mouseDelayMet(j)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,j)!==false);(this._mouseStarted?this._mouseDrag(j):this._mouseUp(j))}return!this._mouseStarted},_mouseUp:function(j){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=(j.target==this._mouseDownEvent.target);this._mouseStop(j)}return false},_mouseDistanceMet:function(j){return(Math.max(Math.abs(this._mouseDownEvent.pageX-j.pageX),Math.abs(this._mouseDownEvent.pageY-j.pageY))>=this.options.distance)},_mouseDelayMet:function(j){return this.mouseDelayMet},_mouseStart:function(j){},_mouseDrag:function(j){},_mouseStop:function(j){},_mouseCapture:function(j){return true}};c.ui.mouse.defaults={cancel:null,distance:1,delay:0}})(jQuery);;(
function(c){var b={dragStart:"start.draggable",drag:"drag.draggable",dragStop:"stop.draggable",maxHeight:"maxHeight.resizable",minHeight:"minHeight.resizable",maxWidth:"maxWidth.resizable",minWidth:"minWidth.resizable",resizeStart:"start.resizable",resize:"drag.resizable",resizeStop:"stop.resizable"},a="ui-dialog ui-widget ui-widget-content ui-corner-all ";c.widget("ui.dialog",{_init:function(){this.originalTitle=this.element.attr("title");var l=this,m=this.options,j=m.title||this.originalTitle||"&nbsp;",e=c.ui.dialog.getTitleId(this.element),k=(this.uiDialog=c("<div/>")).appendTo(document.body).hide().addClass(a+m.dialogClass).css({position:"absolute",overflow:"hidden",zIndex:m.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(n){(m.closeOnEscape&&n.keyCode&&n.keyCode==c.ui.keyCode.ESCAPE&&l.close(n))}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(n){l.moveToTop(false,n)}),g=this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k),f=(this.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),i=c('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){i.addClass("ui-state-hover")},function(){i.removeClass("ui-state-hover")}).focus(function(){i.addClass("ui-state-focus")}).blur(function(){i.removeClass("ui-state-focus")}).mousedown(function(n){n.stopPropagation()}).click(function(n){l.close(n);return false}).appendTo(f),h=(this.uiDialogTitlebarCloseText=c("<span/>")).addClass("ui-icon ui-icon-closethick").text(m.closeText).appendTo(i),d=c("<span/>").addClass("ui-dialog-title").attr("id",e).html(j).prependTo(f);f.find("*").add(f).disableSelection();(m.draggable&&c.fn.draggable&&this._makeDraggable());(m.resizable&&c.fn.resizable&&this._makeResizable());this._createButtons(m.buttons);this._isOpen=false;(m.bgiframe&&c.fn.bgiframe&&k.bgiframe());(m.autoOpen&&this.open())},destroy:function(){(this.overlay&&this.overlay.destroy());this.uiDialog.hide();this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");this.uiDialog.remove();(this.originalTitle&&this.element.attr("title",this.originalTitle))},close:function(e){var d=this;if(false===d._trigger("beforeclose",e)){return}(d.overlay&&d.overlay.destroy());d.uiDialog.unbind("keypress.ui-dialog");(d.options.hide?d.uiDialog.hide(d.options.hide,function(){d._trigger("close",e)}):d.uiDialog.hide()&&d._trigger("close",e));c.ui.dialog.overlay.resize();d._isOpen=false},isOpen:function(){return this._isOpen},moveToTop:function(f,e){if((this.options.modal&&!f)||(!this.options.stack&&!this.options.modal)){return this._trigger("focus",e)}if(this.options.zIndex>c.ui.dialog.maxZ){c.ui.dialog.maxZ=this.options.zIndex}(this.overlay&&this.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=++c.ui.dialog.maxZ));var d={scrollTop:this.element.attr("scrollTop"),scrollLeft:this.element.attr("scrollLeft")};this.uiDialog.css("z-index",++c.ui.dialog.maxZ);this.element.attr(d);this._trigger("focus",e)},open:function(){if(this._isOpen){return}var e=this.options,d=this.uiDialog;this.overlay=e.modal?new c.ui.dialog.overlay(this):null;(d.next().length&&d.appendTo("body"));this._size();this._position(e.position);d.show(e.show);this.moveToTop(true);(e.modal&&d.bind("keypress.ui-dialog",function(h){if(h.keyCode!=c.ui.keyCode.TAB){return}var g=c(":tabbable",this),i=g.filter(":first")[0],f=g.filter(":last")[0];if(h.target==f&&!h.shiftKey){setTimeout(function(){i.focus()},1)}else{if(h.target==i&&h.shiftKey){setTimeout(function(){f.focus()},1)}}}));c([]).add(d.find(".ui-dialog-content :tabbable:first")).add(d.find(".ui-dialog-buttonpane :tabbable:first")).add(d).filter(":first").focus();this._trigger("open");this._isOpen=true},_createButtons:function(g){var f=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");this.uiDialog.find(".ui-dialog-buttonpane").remove();(typeof g=="object"&&g!==null&&c.each(g,function(){return!(d=true)}));if(d){c.each(g,function(h,i){c('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(h).click(function(){i.apply(f.element[0],arguments)}).hover(function(){c(this).addClass("ui-state-hover")},function(){c(this).removeClass("ui-state-hover")}).focus(function(){c(this).addClass("ui-state-focus")}).blur(function(){c(this).removeClass("ui-state-focus")}).appendTo(e)});e.appendTo(this.uiDialog)}},_makeDraggable:function(){var d=this,f=this.options,e;this.uiDialog.draggable({cancel:".ui-dialog-content",handle:".ui-dialog-titlebar",containment:"document",start:function(){e=f.height;c(this).height(c(this).height()).addClass("ui-dialog-dragging");(f.dragStart&&f.dragStart.apply(d.element[0],arguments))},drag:function(){(f.drag&&f.drag.apply(d.element[0],arguments))},stop:function(){c(this).removeClass("ui-dialog-dragging").height(e);(f.dragStop&&f.dragStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()}})},_makeResizable:function(g){g=(g===undefined?this.options.resizable:g);var d=this,f=this.options,e=typeof g=="string"?g:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",alsoResize:this.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:f.minHeight,start:function(){c(this).addClass("ui-dialog-resizing");(f.resizeStart&&f.resizeStart.apply(d.element[0],arguments))},resize:function(){(f.resize&&f.resize.apply(d.element[0],arguments))},handles:e,stop:function(){c(this).removeClass("ui-dialog-resizing");f.height=c(this).height();f.width=c(this).width();(f.resizeStop&&f.resizeStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()}}).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_position:function(i){var e=c(window),f=c(document),g=f.scrollTop(),d=f.scrollLeft(),h=g;if(c.inArray(i,["center","top","right","bottom","left"])>=0){i=[i=="right"||i=="left"?i:"center",i=="top"||i=="bottom"?i:"middle"]}if(i.constructor!=Array){i=["center","middle"]}if(i[0].constructor==Number){d+=i[0]}else{switch(i[0]){case"left":d+=0;break;case"right":d+=e.width()-this.uiDialog.outerWidth();break;default:case"center":d+=(e.width()-this.uiDialog.outerWidth())/2}}if(i[1].constructor==Number){g+=i[1]}else{switch(i[1]){case"top":g+=0;break;case"bottom":g+=e.height()-this.uiDialog.outerHeight();break;default:case"middle":g+=(e.height()-this.uiDialog.outerHeight())/2}}g=Math.max(g,h);this.uiDialog.css({top:g,left:d})},_setData:function(e,f){(b[e]&&this.uiDialog.data(b[e],f));switch(e){case"buttons":this._createButtons(f);break;case"closeText":this.uiDialogTitlebarCloseText.text(f);break;case"dialogClass":this.uiDialog.removeClass(this.options.dialogClass).addClass(a+f);break;case"draggable":(f?this._makeDraggable():this.uiDialog.draggable("destroy"));break;case"height":this.uiDialog.height(f);break;case"position":this._position(f);break;case"resizable":var d=this.uiDialog,g=this.uiDialog.is(":data(resizable)");(g&&!f&&d.resizable("destroy"));(g&&typeof f=="string"&&d.resizable("option","handles",f));(g||this._makeResizable(f));break;case"title":c(".ui-dialog-title",this.uiDialogTitlebar).html(f||"&nbsp;");break;case"width":this.uiDialog.width(f);break}c.widget.prototype._setData.apply(this,arguments)},_size:function(){var e=this.options;this.element.css({height:0,minHeight:0,width:"auto"});var d=this.uiDialog.css({height:"auto",width:e.width}).height();this.element.css({minHeight:Math.max(e.minHeight-d,0),height:e.height=="auto"?"auto":Math.max(e.height-d,0)})}});c.extend(c.ui.dialog,{version:"1.7",defaults:{autoOpen:true,bgiframe:false,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:"center",resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},getter:"isOpen",uuid:0,maxZ:0,getTitleId:function(d){return"ui-dialog-title-"+(d.attr("id")||++this.uuid)},overlay:function(d){this.$el=c.ui.dialog.overlay.create(d)}});c.extend(c.ui.dialog.overlay,{instances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(d){return d+".dialog-overlay"}).join(" "),create:function(e){if(this.instances.length===0){setTimeout(function(){c(document).bind(c.ui.dialog.overlay.events,function(f){var g=c(f.target).parents(".ui-dialog").css("zIndex")||0;return(g>c.ui.dialog.overlay.maxZ)})},1);c(document).bind("keydown.dialog-overlay",function(f){(e.options.closeOnEscape&&f.keyCode&&f.keyCode==c.ui.keyCode.ESCAPE&&e.close(f))});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var d=c("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css({width:this.width(),height:this.height()});(e.options.bgiframe&&c.fn.bgiframe&&d.bgiframe());this.instances.push(d);return d},destroy:function(d){this.instances.splice(c.inArray(this.instances,d),1);if(this.instances.length===0){c([document,window]).unbind(".dialog-overlay")}else{$(this.instances[this.instances-1]).unbind('.dialog-overlay');}d.remove()},height:function(){if(c.browser.msie&&c.browser.version<7){var e=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);var d=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);if(e<d){return c(window).height()+"px"}else{return e+"px"}}else{return c(document).height()+"px"}},width:function(){if(c.browser.msie&&c.browser.version<7){var d=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);var e=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(d<e){return c(window).width()+"px"}else{return d+"px"}}else{return c(document).width()+"px"}},resize:function(){var d=c([]);c.each(c.ui.dialog.overlay.instances,function(){d=d.add(this)});d.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;



/* online sweepstakes overlay */
$().ready(function(){
    init_ro_modals();
});


function sweepmodal_open(event, modal_wrapper, bindFn, urlToLoad){
    var $e = $(event.target);
    var href = $e.attr('href');
    //clear contents of placeholder if necessary
    if (modal_wrapper.html().length > 0) {
        modal_wrapper.html('');
    }
    //testing for optional function param
    if (urlToLoad == null || urlToLoad == '') {
        //if nothing passed as param looks to href attribute of target
        urlToLoad = href;
    }
    //if we have a path to load modal contents from go and get it
    if (urlToLoad != undefined && urlToLoad != null) {
        modal_wrapper.load(urlToLoad, function(){
            //bind events for modal contents
            bindFn(modal_wrapper);
            //show modal
            modal_wrapper.dialog('open');
        });
        
    }
}

var ro_modal_opts = {
    bgiframe: true,
    modal: true,
    autoOpen: false,
    draggable: false,
    resizable: false,
    zIndex: 1000,
    width: 543
};
function init_ro_modals(){
    //this dynamically finds links with a specific class and sets up modal placeholder if they exist
    // also binds click event that uses href attribute to load content
    var ro_modal_links = $('a.ro_modal');
    //if there are any on page
    if (ro_modal_links.length > 0) {
        var roph = $('#ro_ph');
        if (roph.length != 1) {
            $('#wrapper').append('<div id="ro_ph"></div>');
            roph = $('#ro_ph');
        }
        //initialize modal - this happens only once per placeholder
        roph.dialog(ro_modal_opts);
        //bind click events to links to open modal
        ro_modal_links.bind('click', function(event){
            if (roph.css('display') != 'none') {
                sweepmodal_open(event, roph, bind_ro_modal_evts);
            }
            return false;
        });
    }
}

//bind your interactive events here (close, purchase, view and color rollovers)
function bind_ro_modal_evts(modal_wrapper){
    //close
    modal_wrapper.find('.close').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        clearError();
        modal_wrapper.dialog('close');
        modal_wrapper.html('');
    });
}

/* start WWCM overlays */
$().ready(function(){
    init_WWCM_modals();
});

function wwcmmodal_open(event, modal_wrapper, bindFn, urlToLoad){
    var $e = $(event.target);
    var href = $e.attr('href');
    //clear contents of placeholder if necessary
    if (modal_wrapper.html().length > 0) {
        modal_wrapper.html('');
    }
    //testing for optional function param
    if (urlToLoad == null || urlToLoad == '') {
        //if nothing passed as param looks to href attribute of target
        urlToLoad = href;
    }
    //if we have a path to load modal contents from go and get it
    if (urlToLoad != undefined && urlToLoad != null) {
        modal_wrapper.load(urlToLoad, function(){
            var modal = modal_wrapper.find('.modal');
            var width = modal.css('width');
            modal_wrapper.dialog('option', 'width', width);
            //bind events for modal contents
            bindFn(modal_wrapper);
            //show modal
            modal_wrapper.dialog('open');
        });
    }
}

var WWCM_modal_opts = {
    bgiframe: true,
    modal: true,
    autoOpen: false,
    draggable: false,
    resizable: false,
    position: 'center',
    zIndex: 1000,
    stack: true
};
function init_WWCM_modals(context){
    //this dynamically finds links with a specific class and sets up modal placeholder if they exist
    // also binds click event that uses href attribute to load content
    
    var WWCM_modal_links = $((context ? context + ' ' : '') + 'a.WWCM_modal');
    //if there are any on page
    if (WWCM_modal_links.length > 0) {
        var WWCMph = $('#WWCM_ph');
        if (WWCMph.length != 1) {
            $('#wrapper').append('<div id="WWCM_ph"></div>');
            WWCMph = $('#WWCM_ph');
        }
        //initialize modal - this happens only once per placeholder
        WWCMph.dialog(WWCM_modal_opts);
        //bind click events to links to open modal
        WWCM_modal_links.click(function(event){
            //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
            event.preventDefault();
            wwcmmodal_open(event, WWCMph, bind_WWCM_modal_evts);
        });
    }
}

//bind your interactive events here (close, purchase, view and color rollovers)
function bind_WWCM_modal_evts(modal_wrapper){
    //close
    modal_wrapper.find('.close').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        clearError();
        modal_wrapper.dialog('close');
        modal_wrapper.html('');
    });
}

//generic modal open function
// urlToLoad param is optional
function genmodal_open(event, modal_wrapper, bindFn, urlToLoad){
    $('body').append('<img src="/menswear/JABAssetStore/static/images/global/ajax-loader.gif" alt="loading modal" id="modal_loading"/>');
    if (typeof(event) !== 'undefined' && event != null) {
        var href = $(event.target).attr('href');
    }
    //clear contents of placeholder if necessary
    if (modal_wrapper.html().length > 0) {
        modal_wrapper.html('');
    }
    //testing for optional function param
    if (typeof(urlToLoad) === 'undefined' || urlToLoad == null || urlToLoad == '') {
        //if nothing passed as param looks to href attribute of target
        var urlToLoad = href;
    }
    //if we have a path to load modal contents from go and get it
    if (typeof(urlToLoad) !== 'undefined' && urlToLoad != null) {
        $.ajax({
            dataType: 'html',
            url: urlToLoad,
            success: function(resp){
                var mod = $('#generic_ph');
                mod.append(resp);
                bindFn(mod);
                var modal = mod.find('.modal');
                var width = modal.css('width');
                mod.dialog('option', 'width', width);
                //show modal
                $('#modal_loading').remove();
                mod.dialog('open');
                setupErrors('#generic_ph');
            }
        });
        
    }
}

/********** START :: Quick View specific ***************/

$().ready(function(){
    init_generic_modals();
    init_generic_modals_buttons();
});

var generic_modal_opts = {
    bgiframe: true,
    modal: true,
    autoOpen: false,
    draggable: false,
    resizable: false,
    position: 'center',
    zIndex: 1000,
    stack: true
};


function checkAddressModal(){
    if (document.getElementById("addressValidation").innerHTML == 'true') {
        document.EditAddressForm.submit();
        clearError();
        modal_wrapper.dialog('close');
        modal_wrapper.html('');
    }
}

function init_generic_modals(context){
    //this dynamically finds links with a specific class and sets up modal placeholder if they exist
    // also binds click event that uses href attribute to load content
    var generic_modal_links = $((context ? context + ' ' : '') + 'a.generic_modal');
    //if there are any on page
    if (generic_modal_links.length > 0) {
        var genericph = $('#generic_ph');
        if (genericph.length != 1) {
            $('#wrapper').append('<div id="generic_ph"></div>');
            genericph = $('#generic_ph');
        }
        //initialize modal - this happens only once per placeholder
        genericph.dialog(generic_modal_opts);
        //bind click events to links to open modal
        generic_modal_links.click(function(event){
            //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
            event.preventDefault();
            genmodal_open(event, genericph, bind_generic_modal_evts);
        });
    }
}

function init_generic_modals_buttons(){
    //this dynamically finds links with a specific class and sets up modal placeholder if they exist
    // also binds click event that uses href attribute to load content
    var generic_modal_links = $('input.generic_modal');
    //if there are any on page
    if (generic_modal_links.length > 0) {
        var genericph = $('#generic_ph');
        if (genericph.length != 1) {
            $('#wrapper').append('<div id="generic_ph"></div>');
            genericph = $('#generic_ph');
        }
        //initialize modal - this happens only once per placeholder
        genericph.dialog(generic_modal_opts);
        //bind click events to links to open modal
        generic_modal_links.click(function(event){
            genmodal_open(event, genericph, bind_generic_modal_evts_for_iframe);
            
        });
    }
}

function bind_generic_modal_evts_for_iframe(modal_wrapper){
    //wrap iframe with cosmetic modal markup
    var modwrap = $(modal_wrapper).append('<div class="tran modal bml"><div class="tran ml"><div class="tran mr"><div class="tran modal-body addedToCart signIn"></div><div class="modal-header"><a href="#" onclick="javascript:unselectBML()" class="close"><span>Close X</span></a></div></div></div><div class="tran mt"><div class="tran mt-l"></div><div class="tran mt-r"></div></div><div class="tran mb"><div class="tran mb-l"></div><div class="tran mb-r"></div></div></div>');
    var modiframe = $(modal_wrapper).find('iframe').remove();
    modwrap.find('.modal-body').append(modiframe);
    bind_generic_modal_evts(modal_wrapper);
}


//bind your interactive events here (close, purchase, view and color rollovers)
function bind_generic_modal_evts(modal_wrapper){
    //close
    modal_wrapper.find('.close').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        clearError();
        modal_wrapper.dialog('close');
        modal_wrapper.html('');
    });
    
    modal_wrapper.find('.emailsave').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        if (document.getElementById('logonId').value == document.getElementById('emailAddress').value && checkAllErrors(12, '#Register')) {
            event.preventDefault();
            document.Register.submit();
            clearError();
            modal_wrapper.dialog('close');
            modal_wrapper.html('');
        }
        else {
            showError(document.getElementById('logonId'), "Email Addresses Must Match", "error");
        }
        //modal_wrapper.dialog('close');
    });
    
    modal_wrapper.find('.passsave').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        if (document.getElementById('password').value == document.getElementById('verifypassword').value && checkAllErrors(12, '#Register')) {
            event.preventDefault();
            document.Register.submit();
            clearError();
            modal_wrapper.dialog('close');
            modal_wrapper.html('');
        }
        else {
            showError(document.getElementById('password'), "Passwords Must Match", "error");
        }
        //modal_wrapper.dialog('close');
    });
    
    modal_wrapper.find('.corpcardsave').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        document.Register.submit();
        clearError();
        modal_wrapper.dialog('close');
        modal_wrapper.html('');
    });
    
    modal_wrapper.find('.addresssave').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        if (checkAllErrors(0, '#EditAddressForm')) {
            checkAddress();
            window.setTimeout('checkAddressModal()', 500);
        }
    });
    
    modal_wrapper.find('.checkoutaddresssave').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        if (checkAllErrors(12, '#EditAddressForm')) {
            $('#EditAddressForm').ajaxSubmit({
                type: 'POST',
                url: submitURL,
                dataType: 'html',
                success: function(resp){
                    $('#billing_' + parentDivId).html(resp);
                    $('#shipping_' + parentDivId).html(resp);
                    modal_wrapper.dialog('close').html('');
                }
            });
            
        }
    });
    
    modal_wrapper.find('.newpaymentsave').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        checkAddress();
    });
    modal_wrapper.find('.signInsave').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        document.Logon.submit();
        clearError();
        modal_wrapper.dialog('close');
        modal_wrapper.html('');
    });
    
    modal_wrapper.find('.checkoutpagesave').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        document.CheckoutRedirect.submit();
        clearError();
        modal_wrapper.dialog('close');
        modal_wrapper.html('');
    });
    
    modal_wrapper.find('.emailAFriend').click(function(event){
        //prevent default stops browser default action - on links this means navigating to url or jumping to top of page on # hrefs
        event.preventDefault();
        //Change to form you are submitting 
        //on modal change errpage to be the same in this example it would be 8
        //if(checkAllErrors(8)){document.EmailAFriend.submit();}
        if (checkAllErrors(4, '#EmailToFriend')) {
            sendEmail();
            clearError();
            modal_wrapper.dialog('close');
            modal_wrapper.html('');
        }
    });
}



