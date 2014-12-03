/*
Script: incMenu.js
version: v1.0.2
*/

// QVC CODE Change 
// addEvent was changed from 'domready' to 'load' to account for the rest of the DOM that's on the page 
$(window).load(function()
  {	  
  	if ( get.id('divMenuHeader') ){
		new RolloverMenu(($('#divMenuHeader').find('a')), $('.dropdown'));
	}
  }
);

function RolloverMenu(rolloverElements, menuElements) {
	this.options = {
        mouseoverTimeout: 200,
        mouseoutTimeout: 200,
        rolloverClass: 'highlighted'
	};
	this.setOptions(this.options);
	var self = this;
	var deactivate = function(){self.deactivate.apply(self,arguments);}
	
	// Bindings on mouseover and mouseout for each trigger and target
	rolloverElements.each(function (index, trigger) {
	    self.rightTrigger = trigger;  // the rightmost menu item
	    var target = menuElements[index];
		
	    // set z-order in case it isn't set in css
		if ( target != null && target  != 'undefined' ){
			$(target).css({ 'z-index': -1000 });
			var activate = function(){self.activate.apply(self,[trigger, target])};
			var deactivate = function(){self.deactivate.apply(self, [])};
			$(trigger).on('mouseover', activate);
			$(trigger).on('mouseout', deactivate);
			$(target).on('mouseover', activate);
			$(target).on('mouseout', deactivate);
		}
	});
	// for ie6, create an iframe underneath the active target
	if (navigator.userAgent.indexOf("MSIE 6.0")>0 ) {
		this.mask = $('<iframe>',{src:"javascript:'<html></html>';"});
		this.mask.css({
			position: 'absolute',
			border: 0,
			'z-index': 999,
			display: 'none'
	    });
	    this.mask.appendTo(document.body);
	}
};
RolloverMenu.prototype.setOptions = function(opts){
	for(var key in opts){
		this.options[key] = opts[key];
	}
};

// activate will be triggered on every mouseover
RolloverMenu.prototype.activate = function (trigger, target) {
	// if we're set to process another mouseover of mouseout, suppress it
	if(this.timeout) {
		clearTimeout(this.timeout);
		this.timeout = null;
		
	}
	var me = this;
	this.timeout = setTimeout(function(){me.styleActive.apply(me,[target, true, trigger]);},this.options.mouseoverTimeout);
};

// deactivate will be triggered on every mouseout
RolloverMenu.prototype.deactivate = function () {
    // if we're set to process another mouseover of mouseout, suppress it
    if(this.timeout) {
		clearTimeout(this.timeout);
		this.timeout = null;
		
	}
	var me = this;
	this.timeout = setTimeout(function(){me.styleActive.apply(me);},this.options.mouseoverTimeout);
    
};

// set styles on target and trigger elements. (the real state change)
RolloverMenu.prototype.styleActive = function(target, active, trigger) {
    // if need be, deactive a previously active trigger/target pair
    if(this.lastTarget && target != this.lastTarget){
        $(this.lastTrigger).removeClass(this.options.rolloverClass);
        $(this.lastTarget).css({
			visibility: 'hidden',
			position: 'absolute',
			'z-index': -1000
        });
        // hide mask as well, if we have one
        if(this.mask){
			$(this.mask).css('display', 'none');
		}
    }

    if(target && active){
        // activate target and trigger, and remember the selection
        this.lastTarget = $(target);
        if (trigger) {
            this.lastTrigger = $(trigger);
            
            $(trigger).addClass(this.options.rolloverClass);
            this.positionTarget(target, trigger);
        }
        $(target).css({
			visibility: 'visible',
			'z-index': 1000
		});
    } else {
		// we don't have an active selection
		this.lastTarget = this.lastTrigger = null;
    }
};

RolloverMenu.prototype.positionTarget = function (target, trigger) {
    var rightBoundary = $(this.rightTrigger).position().left + $(this.rightTrigger).width();

    // left-align target with trigger menu item, space permitting
    var left = $(trigger).position().left;
    if (left + $(target).width() > rightBoundary) {
        // otherwise, we right-align the pair
        left = $(trigger).position().left + $(trigger).width() - $(target).width();
    }
    $(target).css({
		top: $(trigger).position().top + $(trigger).height(),
		left: left
	});
    // position mask for ie6
    if (this.mask) {
        $(this.mask).css({
            display: 'block',
            top: triggerDims.bottom, left: left,
            width: $(target).width(), height: $(target).height()
        });
    }
};

//RolloverMenu.implement(new Options);

function getElementsByClass( searchClass ) {
	
	var classElements = new Array();
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	
	var allHTMLElements = document.getElementsByTagName("*");
	
	for (i=0; i<allHTMLElements.length; i++) {
		if (pattern.test(allHTMLElements[i].className) ) {
			classElements.push(allHTMLElements[i]) 
		}
	}
	return classElements;

}

$(function(){
	$('#divMenuText a').each(function (index, ele){	
			$(ele).on('click', function(){
			 								
				var url = ele.href;
				var categoryIndex = url.indexOf('.category');
				var siteIndex = url.indexOf('.com/');
					if(siteIndex < 0) siteIndex = url.indexOf('.net/');					
					
				if(categoryIndex > -1 && siteIndex > -1){
					var canonDesc = url.substring(siteIndex+5,categoryIndex);
					qCookie.set('canonicalDesc','',{path: '/',expires: -1});
					qCookie.set('frombreadcrumbs','',{path: '/', expires: -1});
					qCookie.set('canonicalDesc',canonDesc,{path: '/'});
				}
			});
	});
});