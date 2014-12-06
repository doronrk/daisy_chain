/****************************************
Understanding Touch Capabilities
of Target Browser.

~Biswa Dutta Jena
****************************************/

var deviceAgent = navigator.userAgent.toLowerCase();

var isTouchDevice = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));



/******************************************
Quantity field behavior
******************************************/
var bdQty={
	topValue:999,
	lowValue:0,
	increase:function(event){
		event=event || window.event;
		tar=jQuery(event.target || event.srcElement);
		t=tar.prev();
		t.val()<bdQty.topValue?t.val(Math.floor(t.val())+1):t.val(999);
	},
	decrease:function(event){
		event=event || window.event;
		tar=jQuery(event.target || event.srcElement);
		t=tar.next();
		t.val()>bdQty.lowValue?t.val(Math.floor(t.val())-1):t.val(0);
	},
	inFocus:function(event){
		if(!isTouchDevice){
			event=event || window.event;
			var tar=jQuery(event.target || event.srcElement);
			if(tar.val()==0)tar.val("");
		}
	},
	outFocus:function(event){
		if(!isTouchDevice){
			event=event || window.event;
			var tar=jQuery(event.target || event.srcElement);
			if(tar.val()=="")tar.val(0);
		}
	}

}
/*************************************************
Carousel Scrolling
*************************************************/
jQuery.fn.scrollTo = function(elem, speed) {
	var $w=jQuery("#tHolder");
	var $e=jQuery(elem);
	var buf=100;
	var $f=jQuery("#tHolder img.unveil").first();
	var $l=jQuery("#tHolder img.unveil").last();
	if($l[0] === $e[0])$e.css("margin-right","40px");
	if($f[0] === $e[0])$e.css("margin-left","40px");
    jQuery(this).animate({
        scrollLeft:  $e.offset().left-$w.offset().left-buf
    }, speed == undefined ? 1000 : speed);
    return this;
};

/*************************************************
Include Tablet CSS
*************************************************/
if (isTouchDevice) {//For touch devices
	document.write('<link rel="stylesheet" href="/includes/touch.css" type="text/css" />'); //Adding tablet CSS when a tablet is detected
}else{
	//For non touch devices
}