
function CountryControl(settings) {
	var $inputObj, $selList, thisObj, currentSelectedCountry, blurTimeoutId, selListMiddlePos, charactersEntered, charEntryTimeoutId, itemSettings, cntryListItem;
	var inputId, idPrefix, countries, textColor, listWidth, listHeight, listZIndex, listItemHeight, initialValue, defaultValue;
	inputId = settings.inputId;
	idPrefix = settings.idPrefix;
	countries = settings.countries;
	textColor = settings.textColor;
	listWidth = settings.listWidth;
	listHeight = settings.listHeight;
	listZIndex = settings.listZIndex;
	listItemHeight = settings.listItemHeight;
	initialValue = settings.initialValue;
	defaultValue = settings.defaultValue;
	thisObj = this; currentSelectedCountry = null; blurTimeoutId = null; charactersEntered = ""; charEntryTimeoutId = null;
	function ListItem(settings, parentObj) {
		var height, text, thisObj, $itemObj;
		this.itemNumber = settings.itemNumber;
		height = settings.itemHeight;
		text = settings.itemText;
		thisObj = this;
		$itemObj = $('<div id="' + idPrefix + this.itemNumber + '" style="height:' + height + 'px;cursor:pointer;"></div>');
		$itemObj.append($('<span style="padding-left:3px;">' + text + '</span>'));
		$itemObj.click(function (e) { e.preventDefault(); parentObj.countryClicked(e, thisObj.itemNumber); });
		this.item = $itemObj;
	}
	this.countryClicked = function (e, cntryNmbr) {
		this.selectCountry(cntryNmbr); $inputObj.focus(); window.setTimeout(function () { $selList.hide(); }, 100);
	}
	this.selectCountry = function (cntryNmbr) {
		$('#' + idPrefix + cntryNmbr).css({ "background-color": textColor, "color": "White" });
		if (currentSelectedCountry != null && currentSelectedCountry != cntryNmbr) {
			$('#' + idPrefix + currentSelectedCountry).css({ "background-color": "White", "color": textColor });
		}
		currentSelectedCountry = cntryNmbr; $inputObj.val(countries[cntryNmbr]); $inputObj.select();
	}
	this.checkCountryEntry = function (cntryEntry) {
		var cntryFound, checkedAll, i, startPos; cntryFound = false; checkedAll = false;
		if (currentSelectedCountry == null) i = 0; else { i = currentSelectedCountry + 1; if (i >= countries.length) i = 0; } startPos = i;
		while (!cntryFound && !checkedAll) {
			if (countries[i].substr(0, cntryEntry.length) == cntryEntry) { cntryFound = true; this.selectCountry(i); this.scrollToCountry(); }
			if (!cntryFound) { i++; if (i >= countries.length) i = 0; if (i == startPos) checkedAll = true; } 
		}
	}
	this.scrollToCountry = function () {
		var newScrollTop; newScrollTop = (currentSelectedCountry - (selListMiddlePos - 1)) * listItemHeight;
		if (newScrollTop < 0) newScrollTop = 0; $selList.scrollTop(newScrollTop);
	}
	this.inputGotFocus = function (e) {
		this.cancelHideList(); if ($inputObj.val() == initialValue) $inputObj.val(defaultValue); $inputObj.select();
		if ($selList.css('display') == "none") { this.showList(); window.setTimeout(function () { thisObj.checkCountryEntry($inputObj.val()); }, 100); }
	}
	this.showList = function () {
		if ($selList.css('display') == "none") {
			var inputTop, inputLeft; inputTop = $inputObj.offset().top; inputLeft = $inputObj.offset().left;
			$selList.css({ "top": inputTop - listHeight - 1, "left": inputLeft }); $selList.show();
		}
	}
	this.cancelHideList = function () {
		window.setTimeout(function () { if (blurTimeoutId != null) { window.clearTimeout(blurTimeoutId); blurTimeoutId = null; } }, 100);
	}
	$(document).ready(function () {
		$inputObj = $('#' + inputId);
		$inputObj.mouseup(function (e) { e.preventDefault(); $inputObj.select(); });
		$inputObj.mousedown(function (e) { $inputObj.select(); });
		$inputObj.keyup(function (e) { $inputObj.select(); });
		$inputObj.keydown(function (e) {
			var keyCode, newCntryNmbr; keyCode = e.which;
			if (keyCode == 38 || keyCode == 40) { e.preventDefault();
				if (keyCode == 38) { newCntryNmbr = currentSelectedCountry - 1; if (newCntryNmbr < 0) newCntryNmbr = countries.length - 1; }
				else { newCntryNmbr = currentSelectedCountry + 1; if (newCntryNmbr >= countries.length) newCntryNmbr = 0; }
				thisObj.showList(); thisObj.selectCountry(newCntryNmbr); thisObj.scrollToCountry();
			}
		});
		$inputObj.focus(function (e) { thisObj.inputGotFocus(e); });
		$inputObj.blur(function (e) { blurTimeoutId = window.setTimeout(function () { $selList.hide(); blurTimeoutId = null; }, 200); });
		$inputObj.keypress(function (e) {
			var keyCode, charEntered, cntryEntry; keyCode = e.which;
			if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
				thisObj.showList(); if (charEntryTimeoutId != null) { window.clearTimeout(charEntryTimeoutId); charEntryTimeoutId = null; }
				charEntered = String.fromCharCode(keyCode).toUpperCase(); charactersEntered += charEntered; cntryEntry = charactersEntered;
				charEntryTimeoutId = window.setTimeout(function () { charactersEntered = ""; charEntryTimeoutId = null; }, 300); thisObj.checkCountryEntry(cntryEntry);
			}
			if (keyCode == 13 && $selList.css('display') != "none") { e.preventDefault(); $selList.hide(); return false; }
		});
		$selList = $('<div id="' + idPrefix + 'Lst"></div>');
		$selList.css({ "position": "absolute", "width": listWidth + "px", "height": listHeight + "px", "background-color": "White", "color": textColor, "font-size": "14px",
			"border": "solid 1px " + textColor, "overflow-y": "scroll", "overflow-x": "hidden", "display": "none", "z-index": listZIndex
		});
		$selList.mousedown(function (e) { window.setTimeout(function () { $inputObj.focus(); $inputObj.select(); }, 10); });
		$selList.focus(function (e) { $inputObj.focus(); });
		for (var i = 0; i < countries.length; i++) {
			itemSettings = { "itemNumber": i, "itemHeight": listItemHeight, "itemText": countries[i] };
			cntryListItem = new ListItem(itemSettings, thisObj); $selList.append(cntryListItem.item);
		}
		$('body').append($selList);
		selListMiddlePos = parseInt($selList.height() / 2 / listItemHeight) + 1;
	});
}
