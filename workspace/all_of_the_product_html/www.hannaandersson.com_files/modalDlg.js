
function ModalDialog(settings) {
	var thisObj, $overlay, $modal, closeHtml, $close, opacity, bound;
	this.id = settings.id;
	this.contentDivId = settings.contentDivId;
	this.zIndex = 9999991;
	bound = false;
	this.center = function () {
		var top, left;
		top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
		left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;
		$modal.css({ "top": top + $(window).scrollTop(), "left": left + $(window).scrollLeft() });
	};
	this.open = function () {
		this.center();
		$(window).bind('resize.modal', this.center);
		$(window).bind('scroll', this.center);
		bound = true;
		doOpen();
	};
	this.openAt = function (top, left) {
		$modal.css({ "top": top, "left": left });
		doOpen();
	}
	function doOpen() {
		$overlay.show();
		$modal.show(); $modal.focus();
		if (settings.onOpen) settings.onOpen();
	}
	this.close = function () {
		$modal.hide();
		$overlay.hide();
		if (bound) {
			$(window).unbind('resize.modal');
			$(window).unbind('scroll');
		}
	};
	thisObj = this;
	opacity = "50"; if (settings.opacity) opacity = settings.opacity;
	$overlay = $('<div id="' + this.id + 'Overlay"></div>');
	$overlay.css({
		"position": "fixed", "z-index": this.zIndex, "top": "0", "left": "0", "width": "100%", "height": "100%", "background": "#000000",
		"opacity": "0." + opacity, "filter": "alpha(opacity=" + opacity + ")", "display": "none"
	});
	$overlay.keypress(function (event) { if (event.which == 13) event.preventDefault(); });
	$modal = $('#' + this.contentDivId);
	$modal.css({ "position": "absolute", "z-index": this.zIndex + 1, "display": "none" });
	$modal.keypress(function (event) { if (event.which == 13) { event.preventDefault(); if (settings.onEnterPressed) settings.onEnterPressed(); } });
	if (!settings.noCloseIcon) {
		closeHtml = '<div id="' + this.id + 'Close" style="cursor:pointer; cursor:hand;"><img src="/images/global/close.png"';
		$close = $(closeHtml + ' border="0" alt="Close" title="Close" /></div>');
		$close.css({ "position": "absolute", "width": "24px", "height": "27px", "top": "-8px", "right": "-8px" });
		$close.click(function (e) { e.preventDefault(); thisObj.close(); });
		$modal.append($close);}
	$(document).ready(function () {
		$('body').append($overlay);
	});
}
