/* UI BUILD: Wednesday, Nov 19 2014 at 10:31:50 AM -- BUILD ID: BRANCH_NAME: com.bestbuy.atg-apps.release.1443 VERSION: 14.43.127 */
/* MD5: 2808c4b10fc3aaca6123a9906e04a631 */

/* BUILT FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/bby-infrastructure.js" */


//-- START OF LINE 3 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/base.js"
var bby;
if(!bby) bby = {};
bby.infrastructure = {
    analytics: {},
    decorators: {},
    operations: {},
    services: {},
    forms: {},
    widgets: {
		tooltip: {
			strategies: {}
		}
    }
};

//-- END OF LINE 3 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/base.js"
 
//-- START OF LINE 5 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/__bbyUtils/chooseStatePopup.js"
function fnchooseState(pspPrdId, pspSkuId, cId, ppId, pSkuId,pageCatId)
{
    javascript:popUp('olspage.jsp?id='+pageCatId+'&type=page&pspPrdId='+pspPrdId+'&pspSkuId='+pspSkuId+'&cItemId='+cId+'&ppId='+ppId+'&pSkuId='+pSkuId+'&pageType=PDPPage','PSP','4','0');
}

function fnchooseStateExpressLane(subURL, pspPrdId, pspSkuId, cId, ppId, pSkuId)
{
var url = subURL+'&pspPrdId='+pspPrdId+'&pspSkuId='+pspSkuId+'&cItemId='+cId+'&ppId='+ppId+'&pSkuId='+pSkuId+'&pageType=PDPPage';
window.open (url,'CheckDelivery','scrollbars=yes,width=600,height=625');
}
//-- END OF LINE 5 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/__bbyUtils/chooseStatePopup.js"
//-- START OF LINE 6 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/analytics/abstractTracker.js"
bby.infrastructure.analytics.abstractTracker = function(trackEvt, trackObjects){
    var evt = trackEvt;
    this.$trackEvent = function(){ return evt.instance(); };
    this.$trackObjects = trackObjects;
}
bby.infrastructure.analytics.abstractTracker.prototype.track = function(eventName, trackObj){
    try { return this[eventName](trackObj); }
    catch(e){ /*Fail silently*/ }
}
//-- END OF LINE 6 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/analytics/abstractTracker.js"
//-- START OF LINE 7 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/decorators/empty.js"
bby.infrastructure.decorators.empty = function(){ }
bby.infrastructure.decorators.empty.prototype.decorate = function(obj){ return obj; }
//-- END OF LINE 7 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/decorators/empty.js"
//-- START OF LINE 8 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/forms/abstractField.js"
bby.infrastructure.forms.abstractField = function(){
    bby.infrastructure.forms.abstractField.base.call(this);
    this._onValueChanged = $.observer();
    this._onIsValid = $.observer();
    this._onInvalid = $.observer();
    this.isRequired(false);
}
bby.infrastructure.forms.abstractField.prototype = {
    $isValid: function(){ return true; },
    $value: function(value){ return this.property("value", value); },
    isRequired: function(isRequired){ return this.property("isRequired", isRequired); },
    form: function(form){ return this.property("form", form); },
    value: function(value){
        if($.exists(value)) this._onValueChanged.notify();
        return this.$value(value);
    },
    $isEmpty: function(){
        var value = this.$value();
        return $.isNullOrEmpty(value) ||
                $.isUndefined(value)
    },
    isEmpty: function(){ return this.$isEmpty(); },
    isValid : function(){
        var t = this.$isValid(),
            v = (this._isRequired) ? t : (this.isEmpty() || t),
            o = (v) ? this._onIsValid : this._onInvalid;
        o.notify();
        return v;
    },
    onValueChanged: function(func, scope){ return this._onValueChanged.add(func, scope); },
    onIsValid: function(func, scope){ return this._onIsValid.add(func, scope); },
    onInvalid: function(func, scope){ return this._onInvalid.add(func, scope); }
}
$.ext(bby.infrastructure.forms.abstractField, $.Class);

//-- END OF LINE 8 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/forms/abstractField.js"
 
//-- START OF LINE 10 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/forms/abstractForm.js"
bby.infrastructure.forms.abstractForm = function(){
    bby.infrastructure.forms.abstractForm.base.call(this);
    this._onSubmit = $.observer();
    this._fields = $.hash();
	this.isRequired(true);
}

bby.infrastructure.forms.abstractForm.prototype = {
    $submit: function(){ return; },
    $isValid: function(){
        var isValid = true;
        this._fields.listValues().each(function(v){
            if(!v.isValid()) isValid = false;
        });
        return (this._isRequired) ? isValid : (this.isEmpty() || isValid);
    },
    $isEmpty: function(){
        var isEmpty = true;
        this._fields.listValues().each(function(v){
            if(!v.isEmpty()) isEmpty = false;
        });
        return isEmpty;
    },
    submit: function(){
        if(!this.isValid()) return;
        this._onSubmit.notify();
        this.$submit();
    },
	read: function(){
		var value = $.hash();
		this._fields.each(function(field){
			value.add(field.key, field.value.value());
		}, this);
		return value.toObject();
	},
	write: function(obj){
		var values = $.hash(obj);
		values.each(function(value){
			var field = this._fields.find(value.key);
			field.value(value.value);
		}, this);
	},
    onSubmit: function(func, scope){ this._onSubmit.add(func, scope); },
    add: function(name, field){
        this._fields.add(name, field.form(this));
        return this;
    },
    remove: function(name){
        this._fields.remove(name);
        return this;
    },
    find: function(name){
        return this._fields.find(name);
    }
}
$.ext(bby.infrastructure.forms.abstractForm,
      bby.infrastructure.forms.abstractField);

//-- END OF LINE 10 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/forms/abstractForm.js"
 
//-- START OF LINE 12 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/forms/field.js"
bby.infrastructure.forms.field = function(dom){
	bby.infrastructure.forms.field.base.call(this);
	if(!dom) throw new Error("bby.infrastructure.forms.field requires a valid dom");
	this.dom = dom;
}
bby.infrastructure.forms.field.prototype = {
	$value: function(value){
		if(!$.exists(value)) return this.dom.value;
		this.dom.value = value;
		return this;
	}
}
$.ext(bby.infrastructure.forms.field,
	  bby.infrastructure.forms.abstractField);

//-- END OF LINE 12 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/forms/field.js"
 
//-- START OF LINE 14 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/forms/form.js"
bby.infrastructure.forms.form = function(){
	bby.infrastructure.forms.form.base.call(this);
}
$.ext(bby.infrastructure.forms.form,
	  bby.infrastructure.forms.abstractForm);

//-- END OF LINE 14 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/forms/form.js"
 
//-- START OF LINE 16 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/operations/entity.js"
bby.infrastructure.operations.entity = function(id){
    this.set("id", id);
}
bby.infrastructure.operations.entity.prototype = {
    id: function(){ return this.get("id"); }
}
$.ext(bby.infrastructure.operations.entity, $.Class);
//-- END OF LINE 16 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/operations/entity.js"
//-- START OF LINE 17 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/services/abstractService.js"
bby.infrastructure.services.abstractService = function(verb, uri, returnType, contentType){
    bby.infrastructure.services.abstractService.base.call(this);
    
    this.verb(verb);
    this.uri(uri);
    this.returnType(returnType);
    this.contentType(contentType);
    
    this.$onComplete = $.observer();
    this.$onSuccess = $.observer();
    this.$onError = $.observer();
}

bby.infrastructure.services.abstractService.prototype = {
    $call: function(dto){ return; },
    
    id: function(id){ return this.property("id", id); },
    verb: function(verb){ return this.property("verb", verb); },
    uri: function(uri){ return this.property("uri", uri); },
    returnType: function(returnType){ return this.property("returnType", returnType); },
    contentType: function(contentType){ return this.property("contentType", contentType); },
    
    onComplete: function(func, scope){ this.$onComplete.add(func, scope); return this; },
    onSuccess: function(func, scope){ this.$onSuccess.add(func, scope); return this; },
    onError: function(func, scope){ this.$onError.add(func, scope); return this; },
    call: function(dto){ this.$call(dto); return this; }
}
$.ext(bby.infrastructure.services.abstractService, $.Class)

//-- END OF LINE 17 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/services/abstractService.js"
 
//-- START OF LINE 19 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/services/restService.js"
bby.infrastructure.services.restService = function(verb, uri, returnType, contentType){
    bby.infrastructure.services.restService.base.call(this, verb, uri, returnType, contentType);
}

bby.infrastructure.services.restService.prototype = {
    $call: function(dto){
        $.ajax({
            type: this._verb,
            url: this._uri,
            data: (!dto || !dto.toObject) ? dto : dto.toObject(),
            dataType: this._returnType,
            contentType: this._contentType,
            success: function(){
                this.$onSuccess.notify.apply(this.$onSuccess, arguments);
                this.$onComplete.notify.apply(this.$onComplete, arguments);
            },
            error: function(){
                this.$onError.notify.apply(this.$onError, arguments);
                this.$onComplete.notify.apply(this.$onComplete, arguments);
            },
            context: this
        });
    }
}
$.ext(bby.infrastructure.services.restService,
      bby.infrastructure.services.abstractService)

//-- END OF LINE 19 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/services/restService.js"
 
//-- START OF LINE 21 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/services/service.js"
bby.infrastructure.services.service = function(verb, uri, returnType){
    bby.infrastructure.services.service.base.call(this, verb, uri, returnType);
}

bby.infrastructure.services.service.prototype = {
    $call: function(dto){
        $.ajax({
            type: this._verb,
            url: this._uri,
            data: (!dto || !dto.toObject) ? dto : dto.toObject(),
            dataType: this._returnType,
            success: function(){
                this.$onSuccess.notify.apply(this.$onSuccess, arguments);
                this.$onComplete.notify.apply(this.$onComplete, arguments);
            },
            error: function(){
                this.$onError.notify.apply(this.$onError, arguments);
                this.$onComplete.notify.apply(this.$onComplete, arguments);
            },
            context: this
        });
    }
}
$.ext(bby.infrastructure.services.service,
      bby.infrastructure.services.abstractService)

//-- END OF LINE 21 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/services/service.js"
 
//-- START OF LINE 23 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/asyncContent.js"
bby.infrastructure.widgets.asyncContent = function(dom){
	this._dom = dom;
	this._service = $.service()
					.onSuccess(function(content){ $(this._dom).html(content); }, this)
					.onError(function(error){ this.onError(); }, this);
}
bby.infrastructure.widgets.asyncContent.prototype = {
	load: function(uri, paramObj){ this._service.uri(uri).call(paramObj) },
	onSuccess: function(f, s){ this._service.onSuccess(f, s); },
	onError: function(f, s){ this._service.onError(f, s); }
}
$.ext(bby.infrastructure.widgets.asyncContent, $.Class);

//-- END OF LINE 23 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/asyncContent.js"
 
//-- START OF LINE 25 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/collapsiblePanel.js"
bby.infrastructure.widgets.collapsiblePanel = function(activator, panel, isActive){
    bby.infrastructure.widgets.collapsiblePanel.base.call(this);
    this._activator = activator;
    this._panel = panel;
    this.onActive(function(){ this.open(); }, this);
    this.onInactive(function(){ this.close(); }, this);
    
    $.evt.add(this._activator, "click", this.invoke, this);
    this.isActive(isActive);
}
bby.infrastructure.widgets.collapsiblePanel.prototype = {
    open: function(){
        var active = "css-open",
            inactive = "css-closed",
            me = this;
            
        $(this._panel)
            .addClass(active)
            .removeClass(inactive)
            .animate({height:"show"}, 300, function(){ me.redraw(); });
        $(this._activator).addClass(active).removeClass(inactive);
        return this;
    },
    close: function(){
        var active = "css-open",
            inactive = "css-closed",
            me = this;
            
        $(this._panel)
            .addClass(inactive)
            .removeClass(active)
            .animate({height:"hide"}, 300, function(){ me.redraw(); });
        $(this._activator).addClass(inactive).removeClass(active);
        return this;
    },
    redraw: function(){
        var panel = this._panel,
            display = this._panel.style.display;
        
        panel.style.display = "none";
        var offset = panel.offsetHeight;
        panel.style.display = display;
        return this;
    }
}
$.ext(bby.infrastructure.widgets.collapsiblePanel, $.toggle.Class);
//-- END OF LINE 25 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/collapsiblePanel.js"
//-- START OF LINE 26 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/file.js"
bby.infrastructure.widgets.file = function(tabDom, contentDom, isActive){
    bby.infrastructure.widgets.file.base.call(this);
    this._tab = tabDom;
    this._content = contentDom;
    var me = this, activeClass = "css-active";
    this.onActive(function(){
        $(this._tab).addClass(activeClass);
        $(this._content).addClass(activeClass);
    }, this);
    this.onInactive(function(){
        $(this._tab).removeClass(activeClass);
        $(this._content).removeClass(activeClass);
    }, this);
    $.evt.add(tabDom, "mouseup", this.invoke, this);
    tabDom.toggle = this;
    this.isActive(isActive);
}
$.ext(bby.infrastructure.widgets.file, $.toggle.Class);
//-- END OF LINE 26 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/file.js"
//-- START OF LINE 27 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/fileCabinet.js"
bby.infrastructure.widgets.fileCabinet = function(){
    bby.infrastructure.widgets.fileCabinet.base.call(this);
    this.mutuallyExclusive();
}
$.ext(bby.infrastructure.widgets.fileCabinet, $.toggleset.Class);
//-- END OF LINE 27 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/fileCabinet.js"
//-- START OF LINE 28 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/fileTabless.js"
bby.infrastructure.widgets.tablessFile = function(contentDom, isActive){
    bby.infrastructure.widgets.tablessFile.base.call(this);
    this._content = contentDom;
    var me = this, activeClass = "css-active", inactiveClass = "css-hide";
    this.onActive(function(){ 	$(this._content).addClass(activeClass); 
    							$(this._content).removeClass(inactiveClass); }, this);
    this.onInactive(function(){ $(this._content).removeClass(activeClass); 
    							$(this._content).addClass(inactiveClass); }, this);
    this.isActive(isActive);
}
$.ext(bby.infrastructure.widgets.tablessFile, $.toggle.Class);
//-- END OF LINE 28 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/fileTabless.js"
//-- START OF LINE 29 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/lightbox.js"
bby.infrastructure.widgets.lightbox=function(){};
bby.infrastructure.widgets.lightbox.prototype = {
    open: function(content){
        var b = $.isObject(content)
            ? content
            : { html:content,
                overlayClose:false,
                scrolling:true,
                fixed:false,
                opacity:0.9,
				iframe:false};
        $.colorbox(b);
        return this;
    },
    close: function(){
        $.colorbox.close();
        return this;
    },
    sizeTo: function(x, y){
        var _x = x || $.colorbox.width,
            _y = y|| $.colorbox.height;
        $.colorbox.resize({ innerWidth:_x, innerHeight:_y });
        return this;
    }
}

//-- END OF LINE 29 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/lightbox.js"
 
//-- START OF LINE 31 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/pos.js"
bby.infrastructure.widgets.pos = function(salesTaxPercent){
    this._v = 0;
    this._t = salesTaxPercent || 0;
}

bby.infrastructure.widgets.pos.prototype = {
    add: function(value){
        var v = parseFloat(value);
        if(isNaN(v)) return this;
        this._v += v;
        return this;
    },
    subtract: function(value){
        var v = parseFloat(value);
        if(isNaN(v)) return this;
        this._v -= v;
        return this;
    },
    subtotal: function(){
        return $.money(this._v);
    },
    tax: function(){
        return $.money(this._v).multiply(this._t);
    },
    total: function(){
        return this.subtotal().add(this.tax());
    },
    clear: function(){
        this._v = 0;
    }
}

//-- END OF LINE 31 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/pos.js"
 
//-- START OF LINE 33 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/smartImage.js"
bby.infrastructure.widgets.smartImage = function(img){ this.dom = img; }

bby.infrastructure.widgets.smartImage.fitTo = function(dimx, dimy, dom){
    var d = (!dom) ? document : dom;
    $(d).find(".bby-smartImage").each(function(){
        (new bby.infrastructure.widgets.smartImage(this)).fitTo(dimx, dimy);
    });
    return this;
}

bby.infrastructure.widgets.smartImage.prototype.fitTo = function(dimx, dimy) {
    this._fitTo(dimx, dimy);
    this._fitTo(dimx, dimy); //Bug fix for Safari and Chrome;
}

bby.infrastructure.widgets.smartImage.prototype._fitTo = function(dimx, dimy) {
    var image = this.dom,
        imgH = parseInt(image.height),
        imgW = parseInt(image.width),
        aspectImage = (imgW == 0) ? 1 : imgH / imgW,
        aspectSpace = (dimx == 0) ? 1 : dimy / dimx,
        imgIsTaller = aspectImage > aspectSpace,
        imgIsWider = aspectImage < aspectSpace,
        isSquare = aspectImage == aspectSpace,
        dim = $.coord(dimx, dimy).toPixel(),
        w = 0, h = 0;

    if(imgIsWider) {
        $.ku.style.set(image, {"width": dim.x(), "height": "auto", "margin":"auto"});
        w = dimx;
        h = dimx * aspectImage;
    }
    if(imgIsTaller){
        $.ku.style.set(image, {"width": "auto","height": dim.y(), "margin":"auto"});
        w = dimy / aspectImage;
        h = dimy;
    }
    if(isSquare){
        $.ku.style.set(image, {"width": dim.x(), "height": dim.y(), "margin":"auto"});
        w = dimx;
        h = dimy;
    }

    var tooWide = w > dimx,
        tooTall = h > dimy;

    if(tooWide) $.ku.style.set(image, {"width": dim.x(), "height": "auto", "margin":"auto"});
    if(tooTall) $.ku.style.set(image, {"width": "auto","height": dim.y(), "margin":"auto"});

    return this;
}

//-- END OF LINE 33 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/smartImage.js"
 
//-- START OF LINE 35 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/statefulElement.js"
bby.infrastructure.widgets.statefulElement = function(dom){
    this.dom = dom;
    this._states = $.hash();
}
bby.infrastructure.widgets.statefulElement.prototype = {
    add: function(name, obj) {
        this._states.add(name, obj);
        return this;
    },
    remove: function(name) {
        this._states.remove(name);
        return this;
    },
    state: function(name) {
        var s = this._states.findValue(name),
            d = this.dom,
            b = $(d),
            c = this.__className;
            
        if(!!c) b.removeClass(c);
        b.addClass(s.className);
        this.__className = s.className;
        
        for(var n in s) {
            try{
                if(/classname/i.test(n)) continue;
                d[n] = s[n];
            }
            catch(e){ continue; }
        }
        return this;
    }
}
//-- END OF LINE 35 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/statefulElement.js"
//-- START OF LINE 36 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/anchorTip.js"
bby.infrastructure.widgets.tooltip.anchorTip = function(anchorDom, tipDom){
    bby.infrastructure.widgets.tooltip.anchorTip.base.call(this);
    this.dom(anchorDom);
    this._tip = (new bby.infrastructure.widgets.tooltip.pointing())
                    .overlap(5)
                    .center()
                    .tooltipTemplate(tipDom);
    this._place = "rightOf";
	this._isHoverAnchor = false;
	this._isHoverTip= false;

    $.evt.add(anchorDom, "click", function(){ this.toggle(); }, this);
    $.evt.add(tipDom, "click", function(){ this.toggle(); }, this);
}
bby.infrastructure.widgets.tooltip.anchorTip.prototype = {
    dom: function(dom){ return this.property("dom", dom); },
    anchorStrategy: function(anchorStrategy){ return this.set("anchorStrategy", anchorStrategy); },
    pointerStrategy: function(pointerStrategy){ return this.set("pointerStrategy", pointerStrategy); },
    tipStrategy: function(tipStrategy){ return this.set("tipStrategy", tipStrategy); },
    timeoutid: function(timeoutid){ return this.property("timeoutid", timeoutid); },
    onActive: function(f, s){ this._tip.onActive(f, s); return this; },
    onInactive: function(f, s){this._tip.onInactive(f, s); return this; },
	above: function(){ this._place = "above"; return this; },
	below: function(){ this._place = "below"; return this; },
	leftOf: function(){ this._place = "leftOf"; return this; },
	rightOf: function(){ this._place = "rightOf"; return this; },
    show: function(){
		this._tip.show()[this._place](this.dom());
		this._isActive = true;
		return this;
	},
    hide: function(){
		this._tip.hide();
		this._isActive = false;
		return this;
	},
	toggle: function(){
		return this._isActive ? this.hide() : this.show();
	},
	hoverAnchor: function(){
		if(this._isHoverAnchor) return this;
		this._isHoverAnchor = true;
		return this.anchorStrategy(new bby.infrastructure.widgets.tooltip
			.strategies.hover(this.dom(), this));
	},
	clickAnchor: function(){
		if(!$.exists(this._anchorStrategy)) return this;
		this._anchorStrategy.clear();
		this._isHoverAnchor = false;
		return this;
	},
	hoverTip: function(){
		if(this._isHoverTip) return this;
		this._isHoverTip = true;
		this.pointerStrategy(new bby.infrastructure.widgets.tooltip
			.strategies.hover(this._tip.pointer().dom(), this));
		this.tipStrategy(new bby.infrastructure.widgets.tooltip
			.strategies.hover(this._tip.tooltip().dom(), this));

		return this;
	},
	clickTip: function(){
		if(!$.exists(this._pointerStrategy) ||
			$.exists(this._tipStrategy)) return this;
		this._pointerStrategy.clear();
		this._tipStrategy.clear();
		this._isHoverTip = false;
		return this;
	}
}
$.ext(bby.infrastructure.widgets.tooltip.anchorTip, $.Class);

//-- END OF LINE 36 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/anchorTip.js"
//-- START OF LINE 37 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/baseContext.js"
bby.infrastructure.widgets.tooltip.context = function(dom){
    bby.infrastructure.widgets.tooltip.context.base.call(this);
    this.dom(dom);
}
bby.infrastructure.widgets.tooltip.context.prototype = {
    dom: function(dom){ return this.property("dom", dom); },
    height: function(){ return $.coord(0, this.dims().y()); },
    width: function(){ return $.coord(this.dims().x(), 0); },
    dims: function(){ return $.coord.parse($.findOuterDims(this._dom)); },
    offset: function(){ return $.coord.parse($.findOffset(this._dom)); },
    bottomRight: function(){ return this.offset().add(this.dims()); }
}
$.ext(bby.infrastructure.widgets.tooltip.context, $.Class);
//-- END OF LINE 37 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/baseContext.js"
//-- START OF LINE 38 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/basic.js"
bby.infrastructure.widgets.tooltip.basic = function(aDom){
    var dom = aDom || ($.create({"div":{"class":"bby-tooltip mod-helptip", "style":"position:absolute;"}}));
    this._pinner = $.pinner(dom);
    
    this._onActive = $.observer();
    this._onInactive = $.observer();
    
    this.hide();
    document.body.appendChild(dom);
    
    bby.infrastructure.widgets.tooltip.basic.base.call(this, dom);
}
bby.infrastructure.widgets.tooltip.basic.prototype = {
    template: function(dom){
        $(dom).css({"position":"absolute", "display":"none"});
        document.body.removeChild(this.dom());
        document.body.appendChild(this.dom(dom).dom());
        this._pinner = $.pinner(dom);
        return this;
    },
    onActive: function(f, s){ this._onActive.add(f, s); return this; },
    onInactive: function(f, s){ this._onInactive.add(f, s); return this; },
    show: function(message){
        $(this.dom()).show().html(message);
        this._onActive.notify();
        return this;
    },
    hide: function(){
        $(this.dom()).hide();
        this._onInactive.notify();
        return this;
    },
    to: function(coord){
        this._pinner.to(coord);
        return this;
    },
    destroy: function(){
        document.body.removeChild(this.$dom);
        return null;
    }
}
$.ext(bby.infrastructure.widgets.tooltip.basic,
      bby.infrastructure.widgets.tooltip.context);
//-- END OF LINE 38 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/basic.js"
//-- START OF LINE 39 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/pointing.js"
bby.infrastructure.widgets.tooltip.pointing = function(pointerDom, contentDom){
    bby.infrastructure.widgets.tooltip.pointing.base.call(this);
    
    var pointer = pointerDom || (new bby.infrastructure.widgets.tooltip.basic())
                                    .template($.create({ div:{"class":"bby-tooltip-pointer mod-helptip-pointer",
                                                         style:"position:absolute;" }}))
                                    .hide(),
        tooltip = contentDom || (new bby.infrastructure.widgets.tooltip.basic()).hide();
                                    
    this.pointer(pointer)
        .tooltip(tooltip)
        .overlap(0)
        .leftJustify();
}
bby.infrastructure.widgets.tooltip.pointing.prototype = {
    pointer: function(pointer){ return this.property("pointer", pointer); },
    tooltip: function(tooltip){ return this.property("tooltip", tooltip); },
    context: function(dom){
        var context = ($.exists(dom)) ? new bby.infrastructure.widgets.tooltip.context(dom) : dom;
        return this.property("context", context);
    },
    onActive: function(f, s){ this._tooltip.onActive(f, s); return this; },
    onInactive: function(f, s){this._tooltip.onInactive(f, s); return this; },
    overlap: function(overlap){ return this.property("overlap", overlap); },
    strategy: function(strategy){ return this.property("strategy", strategy); },
    pointerTemplate: function(dom){
        $(dom).addClass("bby-tooltip-pointer mod-tooltip-pointer");
        this.pointer().template(dom);
        return this;
    },
    tooltipTemplate: function(dom){
        $(dom).addClass("bby-tooltip css-tooltip");
        this.tooltip().template(dom);
        return this;
    },
    center: function(){ return this.strategy(new bby.infrastructure.widgets.tooltip.strategies.center(this)); },
    leftJustify: function(){ return this.strategy(new bby.infrastructure.widgets.tooltip.strategies.leftJustify(this)); },
    rightJustify: function(){ return this.strategy(new bby.infrastructure.widgets.tooltip.strategies.rightJustify(this)); },
    
    show: function(message){
        this._pointer.show();
        this._tooltip.show(message);
        return this;
    },
    hide: function(){
        this._pointer.hide();
        this._tooltip.hide();
        return this;
    },
    above: function(dom){
        this.strategy().above(dom);
        this._setClass("above");
        return this;
    },
    below: function(dom){
        this.strategy().below(dom);
        this._setClass("below");
        return this;
    },
    leftOf: function(dom){
        this.strategy().leftOf(dom);
        this._setClass("leftOf");
        return this;
    },
    rightOf: function(dom){
        this.strategy().rightOf(dom);
        this._setClass("rightOf");
        return this;
    },
    _setClass: function(position){
        var format = "css-{0}",
            positions = ["above", "below", "leftOf", "rightOf"],
            dom = $(this._pointer.dom());
            
        for(var n in positions) dom.removeClass($.str.format(format, positions[n]));
        dom.addClass($.str.format(format, position));
    },
    destroy: function(){
        this.pointer.destroy();
        this.tooltip.destroy();
        return null;
    }
}
$.ext(bby.infrastructure.widgets.tooltip.pointing, $.Class);
//-- END OF LINE 39 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/pointing.js"
//-- START OF LINE 40 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/abstractStrategy.js"
bby.infrastructure.widgets.tooltip.strategies.abstractStrategy = function(tooltip, multiplier){
    this.$offset = 0;
    this.$multiplier = multiplier;
    this._tooltip = tooltip;
}
bby.infrastructure.widgets.tooltip.strategies.abstractStrategy.prototype = {
    $above: function(context, pointer, tooltip){ return; },
    $below: function(context, pointer, tooltip){ return; },
    $leftOf: function(context, pointer, tooltip){ return; },
    $rightOf: function(context, pointer, tooltip){ return; },
    
    above: function(dom){
        var tooltip = this._tooltip,
            context = tooltip.context(dom).context(),
            pointer = tooltip.pointer(),
            content = tooltip.tooltip();
            
        this.$offset = tooltip.overlap();   
        this.$above(context, pointer, content);
        return this;
    },
    below: function(dom){
        var tooltip = this._tooltip,
            context = tooltip.context(dom).context(),
            pointer = tooltip.pointer(),
            content = tooltip.tooltip();
            
        this.$offset = tooltip.overlap();   
        this.$below(context, pointer, content);
        return this;
    },
    leftOf: function(dom){
        var tooltip = this._tooltip,
            context = tooltip.context(dom).context(),
            pointer = tooltip.pointer(),
            content = tooltip.tooltip();
            
        this.$offset = tooltip.overlap();   
        this.$leftOf(context, pointer, content);
        return this;
    },
    rightOf: function(dom){
        var tooltip = this._tooltip,
            context = tooltip.context(dom).context(),
            pointer = tooltip.pointer(),
            content = tooltip.tooltip();
            
        this.$offset = tooltip.overlap();   
        this.$rightOf(context, pointer, content);
        return this;
    }
}
$.ext(bby.infrastructure.widgets.tooltip.strategies.abstractStrategy, $.Class);
//-- END OF LINE 40 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/abstractStrategy.js"
//-- START OF LINE 41 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/center.js"
bby.infrastructure.widgets.tooltip.strategies.center = function(tooltip, multiplier){
    bby.infrastructure.widgets.tooltip.strategies.center.base.call(this, tooltip, .5);
}
bby.infrastructure.widgets.tooltip.strategies.center.prototype = {
    $above: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .subtract(pointer.height())
                    .add($.coord(context.dims().subtract(pointer.dims()).x() * this.$multiplier, 0)));
                    
        tooltip.to(pointer.offset()
                    .subtract(tooltip.height())
                    .add($.coord(0, this.$offset))
                    .add($.coord(pointer.dims().subtract(tooltip.dims()).x() * this.$multiplier, 0)));
        return this;
    },
    $below: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .add(context.height())
                    .add($.coord(context.dims().subtract(pointer.dims()).x() * this.$multiplier, 0)));
        
        tooltip.to(pointer.offset()
                    .add(pointer.height())
                    .subtract($.coord(0, this.$offset))
                    .add($.coord(pointer.dims().subtract(tooltip.dims()).x() * this.$multiplier, 0)));
        return this;
    },
    $leftOf: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .subtract(pointer.width())
                    .add($.coord(0, context.dims().subtract(pointer.dims()).y() * this.$multiplier)));
        
        tooltip.to(pointer.offset()
                    .subtract(tooltip.width())
                    .add($.coord(this.$offset, 0))
                    .add($.coord(0, pointer.dims().subtract(tooltip.dims()).y() * this.$multiplier)));
        return this;
    },
    $rightOf: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .add(context.width())
                    .add($.coord(0, context.dims().subtract(pointer.dims()).y() * this.$multiplier)));
        
        tooltip.to(pointer.offset()
                    .add(pointer.width())
                    .subtract($.coord(this.$offset, 0))
                    .add($.coord(0, pointer.dims().subtract(tooltip.dims()).y() * this.$multiplier)));
        return this;
    }
}
$.ext(bby.infrastructure.widgets.tooltip.strategies.center,
      bby.infrastructure.widgets.tooltip.strategies.abstractStrategy);
//-- END OF LINE 41 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/center.js"
//-- START OF LINE 42 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/hover.js"
bby.infrastructure.widgets.tooltip.strategies.hover = function(dom, context){
	this._mouseOver = $.evt.add(dom, "mouseover", function(){
		if($.exists(context.timeoutid())) clearTimeout(context.timeoutid());
		context.show();
	}, this);
	this._mouseOut = $.evt.add(dom, "mouseout", function(){
		context.timeoutid(setTimeout(function(){ context.hide(); }, 500));
	}, this);
}
bby.infrastructure.widgets.tooltip.strategies.hover.prototype = {
	clear: function(){
		$.evt.remove(this._mouseOver);
		$.evt.remove(this._mouseOut);
	}
}

//-- END OF LINE 42 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/hover.js"
 
//-- START OF LINE 44 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/leftJustify.js"
bby.infrastructure.widgets.tooltip.strategies.leftJustify = function(tooltip, multiplier){
    bby.infrastructure.widgets.tooltip.strategies.leftJustify.base.call(this, tooltip, 0);
}
bby.infrastructure.widgets.tooltip.strategies.leftJustify.prototype = {
    $above: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .subtract(pointer.height())
                    .add($.coord(this.$offset, 0))
                    .add($.coord(context.dims().subtract(pointer.dims()).x() * this.$multiplier, 0)));
                    
        tooltip.to(pointer.offset()
                    .subtract(tooltip.height())
                    .add($.coord(-this.$offset, this.$offset))
                    .add($.coord(pointer.dims().subtract(tooltip.dims()).x() * this.$multiplier, 0)));
        return this;
    },
    $below: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .add(context.height())
                    .add($.coord(this.$offset, 0))
                    .add($.coord(context.dims().subtract(pointer.dims()).x() * this.$multiplier, 0)));
        
        tooltip.to(pointer.offset()
                    .add(pointer.height())
                    .subtract($.coord(this.$offset, this.$offset))
                    .add($.coord(pointer.dims().subtract(tooltip.dims()).x() * this.$multiplier, 0)));
        return this;
    },
    $leftOf: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .subtract(pointer.width())
                    .add($.coord(0, this.$offset))
                    .add($.coord(0, context.dims().subtract(pointer.dims()).y() * this.$multiplier)));
        
        tooltip.to(pointer.offset()
                    .subtract(tooltip.width())
                    .add($.coord(this.$offset, -this.$offset))
                    .add($.coord(0, pointer.dims().subtract(tooltip.dims()).y() * this.$multiplier)));
        return this;
    },
    $rightOf: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .add(context.width())
                    .add($.coord(0, this.$offset))
                    .add($.coord(0, context.dims().subtract(pointer.dims()).y() * this.$multiplier)));
        
        tooltip.to(pointer.offset()
                    .add(pointer.width())
                    .subtract($.coord(this.$offset, this.$offset))
                    .add($.coord(0, pointer.dims().subtract(tooltip.dims()).y() * this.$multiplier)));
        return this;
    }
}
$.ext(bby.infrastructure.widgets.tooltip.strategies.leftJustify,
      bby.infrastructure.widgets.tooltip.strategies.abstractStrategy);
//-- END OF LINE 44 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/leftJustify.js"
//-- START OF LINE 45 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/rightJustify.js"
bby.infrastructure.widgets.tooltip.strategies.rightJustify = function(tooltip, multiplier){
    bby.infrastructure.widgets.tooltip.strategies.rightJustify.base.call(this, tooltip, 1);
}
bby.infrastructure.widgets.tooltip.strategies.rightJustify.prototype = {
    $above: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .subtract(pointer.height())
                    .add($.coord(-this.$offset, 0))
                    .add($.coord(context.dims().subtract(pointer.dims()).x() * this.$multiplier, 0)));
                    
        tooltip.to(pointer.offset()
                    .subtract(tooltip.height())
                    .add($.coord(this.$offset, this.$offset))
                    .add($.coord(pointer.dims().subtract(tooltip.dims()).x() * this.$multiplier, 0)));
        return this;
    },
    $below: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .add(context.height())
                    .add($.coord(-this.$offset, 0))
                    .add($.coord(context.dims().subtract(pointer.dims()).x() * this.$multiplier, 0)));
        
        tooltip.to(pointer.offset()
                    .add(pointer.height())
                    .add($.coord(this.$offset, -this.$offset))
                    .add($.coord(pointer.dims().subtract(tooltip.dims()).x() * this.$multiplier, 0)));
        return this;
    },
    $leftOf: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .subtract(pointer.width())
                    .add($.coord(0, -this.$offset))
                    .add($.coord(0, context.dims().subtract(pointer.dims()).y() * this.$multiplier)));
        
        tooltip.to(pointer.offset()
                    .subtract(tooltip.width())
                    .add($.coord(this.$offset, this.$offset))
                    .add($.coord(0, pointer.dims().subtract(tooltip.dims()).y() * this.$multiplier)));
        return this;
    },
    $rightOf: function(context, pointer, tooltip){
        pointer.to(context.offset()
                    .add(context.width())
                    .add($.coord(0, -this.$offset))
                    .add($.coord(0, context.dims().subtract(pointer.dims()).y() * this.$multiplier)));
        
        tooltip.to(pointer.offset()
                    .add(pointer.width())
                    .add($.coord(-this.$offset, this.$offset))
                    .add($.coord(0, pointer.dims().subtract(tooltip.dims()).y() * this.$multiplier)));
        return this;
    }
}
$.ext(bby.infrastructure.widgets.tooltip.strategies.rightJustify,
      bby.infrastructure.widgets.tooltip.strategies.abstractStrategy);
//-- END OF LINE 45 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/infrastructure/scripts/widgets/tooltip/strategies/rightJustify.js"
