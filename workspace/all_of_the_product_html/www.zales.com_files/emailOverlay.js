(function () {
	// Functions to handle events.
	// Originally written by Dean Edwards (http://dean.edwards.name/weblog/2005/10/add-event/)
	function addEvent(element, type, handler) {
		if (!handler.$$guid) handler.$$guid = addEvent.guid++;
		if (!element.myevents) element.myevents = {};
		var handlers = element.myevents[type];
		if (!handlers) {
			handlers = element.myevents[type] = {};
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		handlers[handler.$$guid] = handler;
		element["on" + type] = handleEvent;
	};
	addEvent.guid = 1;
	function removeEvent(element, type, handler) {
		if (element.myevents && element.myevents[type]) {
			delete element.myevents[type][handler.$$guid];
		}
	};
	function handleEvent(event) {
		var returnValue = true;
		event = event || fixEvent(window.event);
		var handlers = this.myevents[event.type];
		for (var i in handlers) {
			this.$$handleEvent = handlers[i];
			if (this.$$handleEvent(event) === false) {
				returnValue = false;
			}
		}
		return returnValue;
	};
	fixEvent = function (event) {
		event.preventDefault = fixEvent.preventDefault;
		event.stopPropagation = fixEvent.stopPropagation;
		return event;
	};
	fixEvent.preventDefault = function() {
		this.returnValue = false;
	};
	fixEvent.stopPropagation = function() {
		this.cancelBubble = true;
	};

	// Functions to handle cookies.
	function createCookie(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = '; expires='+date.toGMTString();
		}
		else var expires = '';
		document.cookie = name+'='+value+expires+'; path=/';
	}
	function readCookie(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for (var i=0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}
	
	function closePopup(popID) {
		document.getElementById('emailOverlay').style.display = 'none';
		document.getElementById('emailPopup').style.display = 'none';
		document.body.className = document.body.className.replace(' lightBoxed', '');
		return false;
	}
	
	var overlaySeen = readCookie('emailOverlaySeen');
	if (! overlaySeen) {
		// Create background overlay.
		var overlay = document.getElementById('emailOverlay');
		if (! overlay) {
			overlay = document.createElement('div');
			overlay.id = 'emailOverlay';
			document.body.appendChild(overlay);
		}
		
		// Set up close handlers.
		var popup = document.getElementById('emailPopup');
		var links = popup.getElementsByTagName('a');
		for (var i=0; i < links.length; ++i) {
			if (links[i].className.indexOf('closePopup') > -1) {
				addEvent(links[i], 'click', closePopup);
			}
		}
		
		// Set up email placeholder.
        addEvent(popup.elements["EMAIL_ADDRESS_"], 'focus', function () {
		//addEvent(popup.elements['email'], 'focus', function () { // Cheetah Mail disabled
			this.value = '';
			this.style.color = '#000';
		});
		
		// Display overlay and popup.
		overlay.style.display = 'block';
		popup.style.display = 'block';
		document.body.className += ' lightBoxed';
		
		// Place tracking cookie so we don't show it again.
		createCookie('emailOverlaySeen', '1', 30);
	}
})();