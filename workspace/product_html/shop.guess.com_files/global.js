if (typeof window.console == "undefined") {
	window.console = {
		'log': function () { },
		'info': function () { },
		'warn': function () { },
		'debug': function () { },
		'error': function () { }
	};
}
/*jshint eqnull:true */
/*!
* jQuery Cookie Plugin v1.2
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2011, Klaus Hartl
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/
(function ($, document, undefined) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (value === null) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}

		return null;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key, options) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};

})(jQuery, document);

/**
* jQuery.ScrollTo - Easy element scrolling using jQuery.
* Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
* Dual licensed under MIT and GPL.
* Date: 5/25/2009
* @author Ariel Flesler
* @version 1.4.2
*
* http://flesler.blogspot.com/2007/10/jqueryscrollto.html
*/
(function (d) { var k = d.scrollTo = function (a, i, e) { d(window).scrollTo(a, i, e) }; k.defaults = { axis: 'xy', duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1 }; k.window = function (a) { return d(window)._scrollable() }; d.fn._scrollable = function () { return this.map(function () { var a = this, i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1; if (!i) return a; var e = (a.contentWindow || a).document || a.ownerDocument || a; return d.browser.safari || e.compatMode == 'BackCompat' ? e.body : e.documentElement }) }; d.fn.scrollTo = function (n, j, b) { if (typeof j == 'object') { b = j; j = 0 } if (typeof b == 'function') b = { onAfter: b }; if (n == 'max') n = 9e9; b = d.extend({}, k.defaults, b); j = j || b.speed || b.duration; b.queue = b.queue && b.axis.length > 1; if (b.queue) j /= 2; b.offset = p(b.offset); b.over = p(b.over); return this._scrollable().each(function () { var q = this, r = d(q), f = n, s, g = {}, u = r.is('html,body'); switch (typeof f) { case 'number': case 'string': if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) { f = p(f); break } f = d(f, this); case 'object': if (f.is || f.style) s = (f = d(f)).offset() } d.each(b.axis.split(''), function (a, i) { var e = i == 'x' ? 'Left' : 'Top', h = e.toLowerCase(), c = 'scroll' + e, l = q[c], m = k.max(q, i); if (s) { g[c] = s[h] + (u ? 0 : l - r.offset()[h]); if (b.margin) { g[c] -= parseInt(f.css('margin' + e)) || 0; g[c] -= parseInt(f.css('border' + e + 'Width')) || 0 } g[c] += b.offset[h] || 0; if (b.over[h]) g[c] += f[i == 'x' ? 'width' : 'height']() * b.over[h] } else { var o = f[h]; g[c] = o.slice && o.slice(-1) == '%' ? parseFloat(o) / 100 * m : o } if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m); if (!a && b.queue) { if (l != g[c]) t(b.onAfterFirst); delete g[c] } }); t(b.onAfter); function t(a) { r.animate(g, j, b.easing, a && function () { a.call(this, n, b) }) } }).end() }; k.max = function (a, i) { var e = i == 'x' ? 'Width' : 'Height', h = 'scroll' + e; if (!d(a).is('html,body')) return a[h] - d(a)[e.toLowerCase()](); var c = 'client' + e, l = a.ownerDocument.documentElement, m = a.ownerDocument.body; return Math.max(l[h], m[h]) - Math.min(l[c], m[c]) }; function p(a) { return typeof a == 'object' ? a : { top: a, left: a} } })(jQuery);





// JavaScript Document
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (elt /*, from*/) {
		var len = this.length;

		var from = Number(arguments[1]) || 0;
		from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
		if (from < 0)
			from += len;

		for (; from < len; from++) {
			if (from in this &&
          this[from] === elt)
				return from;
		}
		return -1;
	};
}

var modalDialogs = [];

var keepModalDialogsCentered = function () { $.each(modalDialogs, function (key, value) { value.dialog("option", "position", "center"); }); };

$(document).ready(function () {
	$(window).resize(keepModalDialogsCentered);
	$(window).scroll(keepModalDialogsCentered);
});

$.fn.keepCentered = function () {
	var modalDialog = this;
	if (-1 == modalDialogs.indexOf(modalDialog)) {
		modalDialogs.push(modalDialog)
		modalDialog.bind("dialogresizestop", function (event, ui) {
			$(this).dialog({ position: 'center', resizable: false });
		});
		modalDialog.bind("dialogclose", function (event, ui) {
			modalDialogs.splice(modalDialogs.indexOf(modalDialog), 1);
		});
	}
};


showProgress = function (isShow) {
	var p = $('#progress');
	if (p.length == 0) {
		$("body").append("<div id='progress' class='loading ui-progress'></div>");
		p = $('#progress');
	}
	if (isShow) p.show(); else p.hide();
	return true;
};

function appVersion() {
	var res = $('html').data("version");
	return res;
}

function rootUrl(url) {
	var res = $('html').data("root") + url;
	return res;
}

function appUrl(url) {
	var appedUrl = '';
	var lang = $('html').data("lang");
	appedUrl = $('html').data("root") + lang + '/' + url;
	appedUrl = appedUrl.replace('/NaN/', '/');
	return appedUrl;
}

function switchLanguage() {
	var url = appUrl("");
	url = url.substring(0, url.length - 3);
	var lang = $("#language").val();
	var href = url + lang + "/";
	href = href.replace('/NaN/', '/');
	window.location.href = href;
}

function catalogImage(url) {
	return $('html').data("catalog-image-root") + url;
}

function showPlaceOrderProgress() {
	var horizon = $('<div/>')
		.addClass('horizon');

	var progressText = $('<div/>')
		.addClass('progressText')
		.addClass('content')
		.text('Please wait a moment while we complete your order. Please do not close your browser window or navigate away from this page')
		.hide();

	horizon.append(progressText);

	var progress = $("<div/>")
		.attr("id", "placeOrderProgress")
		.addClass("loading")
		.append(horizon);

	$('body').append(progress);

	progress.show();

	progressText
		.css("margin-left", -progressText.outerWidth() / 2)
		.css("margin-top", -progressText.outerHeight() / 2)
		.show();
}

function scrollToTop() {

	var p = $('div.scrollToTop');
	if (p.length == 0) {
		$('body').append("<div class='scrollToTop'><a href='#' onclick='return false;' id='scroller'>Go to top</a></div>");
	}
	p = $('div.scrollToTop');
	$(window).scroll(function () {
		if ($(window).scrollTop() <= "850")
			$('div.scrollToTop').fadeOut('slow');
		else
			$('div.scrollToTop').fadeIn('slow');
	});

	$('div.scrollToTop a').live('click', function () {
		$("html, body").animate({ scrollTop: 0 }, 'slow');
	});
}

(function ($) {
	$.fn.showProgress = function (className) {

		var p = $('#partialProgress');
		if (p.length == 0) {
			p = $("<div id='partialProgress' class='loading ui-progress' style='position:absolute'></div>");
			$('body').append(p);
		}

		var o = this.offset();
		p.css("top", o.top);
		p.css("left", o.left);
		p.height(this.outerHeight());
		p.width(this.outerWidth());

		if (className) p.addClass(className);

		if (this.is(':data(dialog)'))
			this.bind("dialogclose", function () {
				$(this).hideProgress();
			});

		p.show();
		return $(this);
	};

	$.fn.hideProgress = function () {
		$('#partialProgress').remove();
	};


	$.fn.textLabel = function () {
		var os = $(this);
		os.each(function() {
			var o = $(this);
			o.focus(function() {
				if (o.val() == o.attr('title')) {
					o.removeClass('text-label');
					o.val('');
				}
			});
			o.blur(function() {
				if (o.val() == '') {
					o.addClass('text-label');
					o.val(o.attr('title'));
				}
			});
			o.blur();

			o.parents('form').submit(function() {
				if (o.val() == o.attr('title')) {
					o.removeClass('text-label');
					o.val('');
				}
			});
		});
		return os;
	};


})(jQuery);

function showPartialProgress(forElement, show, className) {
	var e = $(forElement);

	if (show)
		e.showProgress(className);
	else
		e.hideProgress();

	return true;
}

function bindSearch() {
	var srchBox = $('input[name=criteria]:first');
	var form = srchBox.parents('form:first');
	form.submit(function () {
		var action = form.attr('action');
		var param = srchBox.attr('name');
		var val = srchBox.val();
		var url = action + '?' + param + '=' + encodeURIComponent(val);
		window.location = url;
		return false;
	});
}

function handleBreadcrumbs() {
	var bc = $('.breadCrumbs:first');
	var tb = $('.breadCrumbsCon:first');
	bc.height(0).animate({ opacity: 0 }, 0);
	if (tb.length > 0) {
		tb.append(bc);
		bc.css("float", "left");
	}
	bc.show().animate({
		height: 20, opacity: 1
	}, 800);
}

$(document).ready(function () {
	$('ul.breadCrumbList li:last').addClass('last');
	$('form:not(.do-not-show-page-progress)').submit(function () { showProgress(true); });
	$('a.show-page-progress').click(function () { showProgress(true); });
	$('input.text-label').textLabel();
	bindSearch();
});

function showConfirm(messageHtml, formId, delegateFunc) {
	var d = $('#confirmDialog');
	if (d.length == 0) {
		$("#footer").append("<div id='confirmDialog'><div class='confirmHolder'><div class='closeBox'>CLOSE</div><div class='clear msgBox'></div><div class='buttonBox'><div id='confirmOk' class='left button'>Ok</div><div id='confirmCancel' class='left button'>Cancel</div></div></div></div>");
		d = $('#confirmDialog');
	}
	d.dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		dialogClass: 'guessDialog',
		width: 300
	});
	d.dialog('open');
	d.find("div.msgBox").html(messageHtml);
	d.find("div.closeBox").click(function () {
		d.dialog('close');
	});
	d.find("#confirmCancel").click(function () {
		d.dialog('close');
	});
	d.find("#confirmOk").click(function () {
		delegateFunc();
		d.dialog('close');
		$('#' + formId).submit();
	});
};

function showShippingCountriesDialog() {
	showQuickViewDalog($("ul.signInSec"));
}

function showQuickViewDalog(o) {
	var p = [o.width() + o.offset().left - 277 + 6, o.offset().top - 6];
	$('#qvb').dialog("option", "position", p);
	$('#qvb').dialog('open');
}

$(document).ready(function () {
	try {


		//ACCORDION BUTTON ACTION
		$('span.dropDown').click(function () {
			if (this.className !== 'dropDown active') {
				$('ul.leftNavLists ul.accordion ul.subNavList').slideUp('normal');
				$(this).next().slideDown('normal');
				$('span.dropDown.active').removeClass('active');
				$(this).addClass('active');
				$('span.dropDown.active ul.subNavList').attr('position', 'relative');
			}
		});
	} catch (e) {

	}
});

function updateAccountInformation() {
	$.getJSON(
		$('#retrieve-account-information-link').attr('href'),
		function(data) {
			$('#signin-status-link').attr('href', data.signInStatusLinkUrl).text(data.signInStatusLinkText);
			$('#profile-link').attr('href', data.profileLinkUrl).text(data.profileLinkText);
			setShoppingBagItemsCount(data.itemsCount);
		}
	);
}


//set default button for the form
function setDefault(formid, buttonid) {
	var buttonKeys = { "EnterKey": 13 };
	$(document).keypress(function (e) {
		if (e.which == buttonKeys.EnterKey) {
			//$('#' + formid).submit();
			$('#' + buttonid).click();
		};
	});
	return false;
}

function getShoppingBagItemsCount() {
	var text = $("#itemsCountLink").html();
	var strCount = text.match('[0-9]');
	return parseInt(strCount);
}

$(document).ready(function () {
	var removedOutOfStockItemsDialog = $('#removedOutOfStockItemsDialog');
	if (removedOutOfStockItemsDialog.length > 0) {
		var dialog = $('<div id="removedOutOfStockItemsDialog"></div>').html(removedOutOfStockItemsDialog.html()).dialog({
			autoOpen: false,
			modal: true,
			resizable: false,
			width: 550,
			dialogClass: 'guessDialog'
		});

		dialog.dialog('open');
	}
});


function OmnitutureTag_ItemAdded(itemAddedModel) {
	try {
		registerProduct(
		  itemAddedModel.Item.InventoryAccountNo,
		  itemAddedModel.Item.Sku.ProductCode.replace('-',''),
		  itemAddedModel.Item.Sku.ProductName.replace('-',''),
		  itemAddedModel.Item.Sku.ColorShortDescription,
		  itemAddedModel.Item.Sku.SizeShortDescription,
		  itemAddedModel.Item.Qty,
		  itemAddedModel.Item.Sku.Id,
		  itemAddedModel.Item.Sku.Price.ActualPrice,
		   ""+itemAddedModel.IsFisrtItem+"",
		  itemAddedModel.CustomerSessionQuoteId
		);
	} catch (err) {
		console.error('Error: ' + err);
	}
}

function addToShoppingBagJsonInternal(skuId, qty, pickupStoreCode, successCallback, alwaysCallback) {
	var url = appUrl('ShoppingBag/JsonAddToBag');
	$.post(url, {
		id: skuId,
		qty: qty,
		storeCode: pickupStoreCode
	})
		.done(function (data) {
			if (successCallback)
				successCallback(data);
			if (data.Success) {
				renderAddToBagJsonTemplate(data);
				OmnitutureTag_ItemAdded(data.Model);
			}
		})
	.fail(function () {
		alert('Sorry. Unhandled error has occured. Please try again or contact administrator.');
	})
	.always(function () {
		if (alwaysCallback)
			alwaysCallback();
	});
};

function renderAddToBagJsonTemplate(data) {
	var template = Templates.addToShoppingBag;
	var d = showQvbDialog(template);
	data.Model.shoppingBagUrl = appUrl("ShoppingBag/Index");

	var viewBoxNode = d[0];
	ko.applyBindings(data.Model, viewBoxNode);
	var bagNode = $("#globalShoppingBag")[0];
	ko.cleanNode(bagNode);
	ko.applyBindings(data.Model, bagNode);
}



showQvbDialog = function (data) {
	window.scrollTo(0, 0);
	var o = $("a#globalCheckout");
	var p = [o.width() + o.offset().left - 240, o.offset().top + 30];

	var d = $("<div id='qvb'></div>")
		.html(data)
		.dialog({
			autoOpen: true,
			modal: false,
			resizable: false,
			dialogClass: 'guessDialog',
			width: 265,
			position: p,
			show: { effect: 'slide', direction: 'up', speed: 500 },
			hide: { effect: 'slide', direction: 'up', speed: 500 },
			close: function () {
				if (!(typeof qvbTimeout === 'undefined'))
					clearTimeout(qvbTimeout);
				d.dialog('destroy');
				$('#qvb').remove();
			},
			open: function () {
				//OmnitutureTag_ItemAdded();
				setTimeout(function () { d.dialog('close'); }, 5000);
			}
		});
	
	$('a.continueShopping').on('click', function () {
		d.dialog('close');
		return false;
	});
	dataLayer.push({ 'event': 'eventAddToBag' });
	return d;
};

function showItemAddedBox(skuId) {
	$.ajax({
		type: "POST",
		url: "/ShoppingBag/GetItemAddedBox",
		data: { 'id': skuId },
		success: function (data) {
			showQvbDialog(data);
		},
		error: function (request, status, error) { alert("Sorry! Item could not be added at this time."); },
		complete: function () { }
	});
}

function pushDataLayerEvent(eventName) {
	dataLayer.push({ 'event': eventName });	
}

function testFormSubmit(form, sectionSelector, onSuccess) {
	var o = $(sectionSelector);
	var f = $(form);

	o.removeCallouts();

	showPartialProgress(o, true);

	var jqxhr = $.post(
		f.attr('action'),
		f.serialize()).success(function (data) {
			var contentType = jqxhr.getResponseHeader("content-type");
			if (contentType.indexOf('javascript') != -1) {
				showPartialProgress(o, false);
				$.globalEval(data);
			} else {
			o.replaceWith(data);
			if (data.toString().indexOf('EmailSignUpDialog') == -1) {
				pushDataLayerEvent('eventEmailSignupDialog');
			}
			o = $(sectionSelector);
				o.showCallouts();
				showPartialProgress(o, false);
			if (onSuccess) {
				onSuccess();
			}
			}
		}).error(function () {
			o.createCallout(o.find('input:first'), 'There was a problem processing your form.');
			showPartialProgress(o, false);
	});
}

function renderEmailSignupDialog() {
	var dlg = $("#esd");
	dlg.dialog({
		autoOpen: true,
		resizable: false,
		title: 'Subscribe',
		modal: true,
		width: dlg.width(),
		height: dlg.height(),
		closeOnEscape: true,
		dialogClass: 'guessDialog'
	});
}

function showEmailSignupDialog() {
	var cName = "IsSubscrDialogShowed";
	var isShowed = $.cookie(cName);
	if (isShowed)
		return;
	var url = appUrl("Subscription/EmailSignUpDialog");
	$.ajax({
		type: "GET",
		url: url,
		data: {},
		success: function (data) {
			var dialog = $("<div id='esd' />");
			$('body').append(dialog);
			dialog.append(data);
			renderEmailSignupDialog();
			$.cookie(cName, true, { expires: 365 });
		}
	});
}

function submitSignupDialog() {
	var dlg = $('#esdSignUp:first');
	var f = dlg.find("form:first");
	testFormSubmit(f, dlg, function () { });
	return false;
}

function br_track(payload) {
	var file = ('https:' == document.location.protocol) ? payload.settings.secureUrl : payload.settings.url;

	yepnope({
		test: (typeof BrTrk == "undefined"),
		yep: [file],
		complete: function () {
			try {
				var tracker = BrTrk.getTracker(0.2, payload.info);
				tracker.enableTracking();
			} catch (err) {
				console.log(err);
			}
		}
	});
}

function br_related_searches(payload) {
	$.post(appUrl('Catalog/RelatedSearches/'),
		payload.searches,
		function (data) {
			if (data.success) {
				$('.rightContent').append(
					$(document.createElement('div'))
						.addClass('catalogueImages').css('padding', '20px 0px').html(data.moreResults).append(
							$(document.createElement('div')).addClass('bloomReach').html(data.related)));
				br_initWigets();
			}
			br_track(payload);
		});
}

function br_related_products(payload) {
	$.post(appUrl('Catalog/RelatedSearches/'),
		payload.searches,
		function (data) {
			if (data.success) {
				$('#footer').before(
					$(document.createElement('div')).addClass('widgetCon').html(data.moreResults + data.related));
				br_initWigets();

				if (typeof br_related_rid != 'undefined')
					payload.info.related_rid = br_related_rid;
			}
			br_track(payload);
		});
}


function br_initWigets() {
	$('.br-sf-widget-merchant-popup-close a').click(function (e) {
		e.preventDefault();
		$('div.br-sf-widget').show();
		return false;
	});

	$('div.br-sf-widget-merchant-qv a').click(function (e) {
		e.preventDefault();
		$('div.br-sf-widget').hide();
		$('div.br-sf-widget-merchant-popup-maincont').parent().hide();
		$(this).parents('div.br-sf-widget').find('~ div').first().show();

		return false;
	});
}

function pre_Checkterms() {
	var currUrl = $(location).attr('href');
	if (currUrl.indexOf("IsLoyalty") >= 0) {
		$("#CheckTerms").attr("checked", true);
		$("#IsSubscribed").hide();
	}
}

$(document).ready(function () {
	$('.narrowBy .refinementCon').click(function () {
		var dropdown = $(this).parent().find('ul.refinementList');
		if (this.className.indexOf('active') == -1) {
			dropdown.slideDown('normal');
			$(this).addClass('active');
			$(this).parent().siblings().find('.refinementCon').removeClass('active');
			$(this).parents('.refinementWrapper').siblings().find('ul.refinementList').slideUp('normal');
		} else {
			$(this).removeClass('active');
			dropdown.slideUp('normal');
		}
	});

	$(".refinementCon").hover(function () {
		$(this).addClass('mousedIn');
	}, function () {
		var $this = $(this);
		$this.removeClass('mousedIn');

		var slideUp = setInterval(function () {
			if (!$this.hasClass('mousedIn')) {
				$this.find('ul.refinementList').slideUp();
				$this.removeClass('active');
				clearInterval(slideUp);
			}
		}, 2000);
	});
});

function openShippingCountriesDialog(elem) {
    $('body').hideProgress();
    elem.dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        dialogClass: 'guessDialog',
        width: 800
    });
    elem.dialog('open');
}

function onLoadShippingCountries(data) {
    var elem = $('#shippingCountryDialog');
    var content = elem.find('.content:first');
    content.html(data);
    openShippingCountriesDialog(elem);
}

function showShippingCountries() {
    $('body').showProgress();
    var url = appUrl("Shipping/ShippingCountries");
    var elem = $('#shippingCountryDialog');
    var content = elem.find('.content:first');
    if (content.html().length > 2) {
        openShippingCountriesDialog(elem);
        return;
    }
    $.ajax({
        type: "GET",
        url: url,
        data: null,
        success: function (data) {
            onLoadShippingCountries(data);
        },
        error: function (request, status, error) {
            $('body').hideProgress();
            alert("Sorry! The error occured during a country selection.");
        },
        complete: function () { }
    });
}


$(function() {
	$('.shippingCountry .countryName a').click(function(e) {
		e.preventDefault();
		showShippingCountries();
		return false;
	});
	$('#shippingCountryDialog .closeSection a').click(function(e) {
		e.preventDefault();
		$('#shippingCountryDialog').dialog('close');
		return false;
	});
});

function showForPrinting(elem) {
	elem.removeClass("noprintDynamic");
	elem.addClass("printableElement");
	var parent = elem.parent();
	if (parent.length >0)
		showForPrinting(parent);
}

function printElement(printableSelector) {
	var printable = $(printableSelector);
	printable.addClass("printableElement");
	$('body').find('*').addClass("noprintDynamic");
	printable.find("*").removeClass("noprintDynamic");
	showForPrinting(printable);
	window.print();
	$('body').find('*').removeClass("noprintDynamic");
}