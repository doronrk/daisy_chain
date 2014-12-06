var calloutOpenFor;

function showCalloutsInternal(parentElement, calloutClassName, calloutStyle) {
	$(parentElement).find(calloutClassName).each(function () {
		var currentElement = $(parentElement).find('#' + $(this).attr('forElement'));
		var position = 'right';
		if ($(this).attr('position') != null) {
			position = $(this).attr('position');
		}
		var text = $(this).html();
		currentElement.callout({ position: position, msg: text, css: calloutStyle });
	});
}

function closeCalloutsInternal(parentElement, calloutClassName) {
	if (null == parentElement) {
		parentElement = $('body');
	}

	$(parentElement).find(calloutClassName).each(function () {
		var currentElement = $(parentElement).find('#' + $(this).attr('forElement'));
		currentElement.unbind('focus');
		currentElement.unbind('blur');
		currentElement.callout('destroy');
	});
}


function showCallouts(parentElement) {
	var firstValidationCallout = null;
	$(parentElement).find('.validationCallout').each(function () {

		var text = $(this).html();
		var currentElement = $(parentElement).find('#' + $(this).attr('forElement'));

		var position = 'right';
		if ($(this).attr('position') != null) {
			position = $(this).attr('position');
		}
		if (!firstValidationCallout) {
			firstValidationCallout = {
				selector: currentElement,
				position: position,
				msg: text
			};
		}

		currentElement.bind('focus', function () {
			$(this).callout({ position: position, msg: text, css: 'guessValidationCallout' });
			calloutOpenFor = $(this);
		});
		currentElement.bind('blur', function () {
			$(this).callout('destroy');
			calloutOpenFor = null;
		});
		if (currentElement.attr('type') == 'checkbox') {
			currentElement.mouseenter(function () {
				calloutOpenFor.blur();
				var el = $(this);
				setTimeout(function () {
					el.focus();
				}, 500);
			});
		}
	});

	if (firstValidationCallout) {
		setTimeout(function () {
			var element = firstValidationCallout.selector;
			element.focus();
			if (!element.is(":focus")) {
				// in case of not-worked focus event
				element.callout({ position: firstValidationCallout.position, msg: firstValidationCallout.msg, css: 'guessValidationCallout' });
				calloutOpenFor = element;
			}
		}, 500);
	}
	showCalloutsInternal(parentElement, '.confirmationCallout', 'guessValidationCallout');
}

function closeCallouts(parentElement) {
	closeCalloutsInternal(parentElement, '.validationCallout');
	closeCalloutsInternal(parentElement, '.confirmationCallout');
}

$.fn.showCallouts = function () {
	showCallouts(this);
	return $(this);
};

$.fn.closeCallouts = function () {
	closeCalloutsInternal(this, '.validationCallout');
	closeCalloutsInternal(this, '.confirmationCallout');
	return $(this);
};

$.fn.removeCallouts = function () {
	var t = $(this);
	t.closeCallouts();
	t.find('.validationCallout, .confirmationCallout').remove();
	return t;
};

$.fn.createCallout = function (element, message, options) {
	var t = $(this);

	var c = $(document.createElement('span'))
		.addClass('validationCallout')
		.css({ display: 'none' })
		.attr('forElement', element.attr('id'))
		.text(message)
		.appendTo(t);

	if (options && options.position)
		c.attr('position', options.position);

	if (options && options.show)
		t.showCallouts();
	
	return $(this);
};

function showInfoCallouts(parentElement) {
	showCalloutsInternal(parentElement, '.infoCallout', 'guessValidationCallout');
}

function closeInfoCallouts(parentElement) {
	closeCalloutsInternal(parentElement, '.infoCallout');
}