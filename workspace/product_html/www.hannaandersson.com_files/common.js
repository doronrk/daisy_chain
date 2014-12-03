
		var mouseX = 0, mouseY = 0;
		function turnOnMouseTracking() {
			if (!document.all) document.captureEvents(Event.MOUSEMOVE);
			document.onmousemove = getMouseXY;
		}
		function turnOffMouseTracking() {
			if (!document.all) document.releaseEvents(Event.MOUSEMOVE);
			document.onmousemove = null;
		}
		function getMouseXY(e) {
			if (!e) var e = window.event;
			if (e.pageX || e.pageY) {
				mouseX = e.pageX; mouseY = e.pageY;}
			else {
				if (e.clientX || e.clientY) {
					mouseX = e.clientX; mouseY = e.clientY;
					if (document.documentElement.scrollLeft) mouseX += document.documentElement.scrollLeft;
					else mouseX += document.body.scrollLeft;
					if (document.documentElement.scrollTop) mouseY += document.documentElement.scrollTop;
					else mouseY += document.body.scrollTop;}}
			if (mouseX < 0) mouseX = 0; if (mouseY < 0) mouseY = 0;
		}
		function addSelectOption(selectObj, text, value, isSelected) {
			if (selectObj != null && selectObj.options != null) {
				var newOption = new Option(text, value, false, isSelected);
				selectObj.options[selectObj.options.length] = newOption;}
		}
		function getPosition(obj) {
			var currentLeft = 0, currentTop = 0;
			while (obj.offsetParent) {
				currentLeft += obj.offsetLeft; currentTop += obj.offsetTop; obj = obj.offsetParent;}
			return [currentLeft, currentTop];
		}
		function getPositionObject(obj) {
			var position = new Object(), positionArray = getPosition(obj); position.left = positionArray[0]; position.top = positionArray[1];
			return position;
		}
		function getObj(objId) {return document.getElementById(objId);}
		function Trim(stringToTrim) {return stringToTrim.replace(/^\s+|\s+$/g,"");}
		function htmlDecode(textToDecode) {
			textToDecode = textToDecode.replace(/&nbsp;/gi," ");
			textToDecode = textToDecode.replace(/&uuml;/gi,String.fromCharCode(252));
			textToDecode = textToDecode.replace(/&Auml;/gi,String.fromCharCode(196));
			textToDecode = textToDecode.replace(/&#189;/gi,String.fromCharCode(189));
			textToDecode = textToDecode.replace(/&reg;/gi,String.fromCharCode(174));
			return textToDecode;
		}
