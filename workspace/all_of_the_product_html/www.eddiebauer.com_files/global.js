var EBGLOBAL = {};

EBGLOBAL.stores = {

	baseURL : '/modals/pdp/new-test-stores.jsp?productId=',
	currentProductId : '',
	currentThumbnailColor : '',
	selectedColor : '',

	initialize : function() {
	},

	launchFindInStoreModal : function(productId, defaultColorId) {
		this.currentProductId = productId;
		var selectedColorId = $('#pdpSelectColor').val();
		if (selectedColorId) {
			this.currentThumbnailColor = selectedColorId;
			this.selectedColor = selectedColorId;
		} else {
			this.currentThumbnailColor = defaultColorId;
		}
		var modalURL = this.baseURL + productId + '&launchColor='
				+ this.currentThumbnailColor;
		var selectedSize = $('#pdpSelectSize').val();
		if (selectedSize) {
			modalURL = modalURL + '&launchSize=' + selectedSize;
		}
		showModal(null, null, modalURL, null, 900, true, '5%', null, null);
		$('#fis_color_id').val(selectedColorId);
	},

	colorClick : function(colorId) {
		$('#fis_color_error').hide();
		this.currentThumbnailColor = colorId;
		this.selectedColor = colorId;
		$('#fis_color_text').html(allColorsMap[colorId]);
		$('#fis_color_id').val(colorId);
		$("#fis_thumbnails").find("a").each(function() {
			if ($(this).attr('data-colorid') == colorId) {
				$(this).show();
			} else {
				$(this).hide();
			}

		});
		$("#fis_swatch_holder").find("a").each(function() {
			if ($(this).attr('data-colorid') == colorId) {
				$(this).addClass("selected");
			} else {
				$(this).removeClass("selected")
			}

		});
	},

	colorMouseOver : function(colorId) {
		$('#fis_color_text').html(allColorsMap[colorId]);
	},

	colorMouseOut : function() {
		$('#fis_color_text').html(allColorsMap[this.currentThumbnailColor]);
	},

	onlaunch : function(colorId) {
		$('#fis_color_text').html(allColorsMap[colorId]);
		$("#fis_swatch_holder").find("a").each(function() {
			if ($(this).attr('data-colorid') == colorId) {
				$(this).addClass("selected");
			} else {
				$(this).removeClass("selected")
			}

		});
	},

	zipCodeSearch : function() {

		var isError = false;

		if ($('#fis_color_id').val() == false) {
			$('#fis_color_error').fadeIn(500);
			isError = true;
		}
		if ($('#fis_size_id').val() == false) {
			$('#fis_size_error').fadeIn(500);
			isError = true;
		}
		if ($('#fis_zip_code').val() == false) {
			$('#fis_zip_error').fadeIn(500);
			isError = true;
		}
		if(isError){
			return;
		}

		var submiturl = this.baseURL + this.currentProductId;
		submiturl = submiturl + '&launchColor=' + this.currentThumbnailColor;
		$('#zip_code_search').val('true');
		var fisForm = $('#fis_form');
		$.ajax({
			type : "POST",
			url : submiturl,
			data : fisForm.serialize(),
			success : function(data) {
				$('.overlay-modal-container').html(data);
			}
		});
	},
	cityStateSearch : function() {
		var isError = false;
		if ($('#fis_color_id').val() == false) {
			$('#fis_color_error').fadeIn(500);
			isError = true;
		}
		if ($('#fis_size_id').val() == false) {
			$('#fis_size_error').fadeIn(500);
			isError = true;
		}
		if ($('#fis_city').val() == false && $('#fis_state').val() == false) {
			$('#fis_city_state_error').fadeIn(500);
			return;
		}
		if ($('#fis_city').val() == false) {
			$('#fis_city_error').fadeIn(500);
			isError = true;
		}
		if ($('#fis_state').val() == false) {
			$('#fis_state_error').fadeIn(500);
			isError = true;
		}
		if(isError){
			return;
		}

		var submiturl = this.baseURL + this.currentProductId;
		submiturl = submiturl + '&launchColor=' + this.currentThumbnailColor;

		$('#city_state_search').val('true');
		var fisForm = $('#fis_form');
		$.ajax({
			type : "POST",
			url : submiturl,
			data : fisForm.serialize(),
			success : function(data) {
				$('.overlay-modal-container').html(data);
			}
		});
	}

};

EBGLOBAL.utils = {

	initialize : function() {
	},

	allowOnlyAlphanumeric : function(e) {
		var keyPressed = !e.charCode ? e.which : e.charCode;
		var regex = new RegExp("^[a-zA-Z0-9]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (keyPressed === 8 || regex.test(str)) {
			return true;
		}

		e.preventDefault();
		return false;
	},

	allowOnlyNumeric : function(e) {
		var keyPressed = !e.charCode ? e.which : e.charCode;
		var regex = new RegExp("^[0-9]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (keyPressed === 8 || regex.test(str)) {
			return true;
		}

		e.preventDefault();
		return false;
	},

	allowOnlyZipcode : function(e) {
		var keyPressed = !e.charCode ? e.which : e.charCode;
		var regex = new RegExp("^[a-zA-Z0-9 -]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (keyPressed === 8 || regex.test(str)) {
			return true;
		}

		e.preventDefault();
		return false;
	}

};

EBGLOBAL.sessionTimeout = {

	durationInMinutes : 30,
	durationInMilliSeconds : 1800000,
	timeoutHolder : null,
	pages : null,

	initialize : function() {
	},

	resetTimeout : function() {
		if (this.timeoutHolder != null) {
			clearTimeout(this.timeoutHolder);
		}
		this.timeoutHolder = setTimeout(function() {
			EBGLOBAL.sessionTimeout.endSession()
		}, this.durationInMilliSeconds);
		var currentdatetime = new Date();
		var currentdatetimeString = '' + currentdatetime.getTime();
		document.cookie = 'lastactivity=' + currentdatetimeString + ';path=/';

	},

	endSession : function() {

		var cookieDateTimeString = getCookie('lastactivity');
		if (cookieDateTimeString) {
			var cookieDateTime = new Date();
			cookieDateTime.setTime(cookieDateTimeString);
			var currentdatetime = new Date();
			var timeDiff = currentdatetime.getTime() - cookieDateTime.getTime()
					- this.durationInMilliSeconds;
			if (timeDiff > 10000) {
				return;
			}
		}
		var pathname = window.location.pathname;
		var pagesArray = this.pages.split(",");
		var indexOfPath = $.inArray(pathname, pagesArray)
		if (indexOfPath < 0) {
			return;
		}
		if (indexOfPath === 0) {
			var href = window.location.href;
			var DPSLogoutIndex = href.indexOf("DPSLogout");
			if (DPSLogoutIndex > -1) {
				return;
			}
		}

		window.location.href = '/gadgets/session-timeout-logout.jsp';

	},

	printTime : function(thisDate) {
		console.log('printTime');

		var thisDateString = "thisDate: " + thisDate.getDate() + "/"
				+ (thisDate.getMonth() + 1) + "/" + thisDate.getFullYear()
				+ " @ " + thisDate.getHours() + ":" + thisDate.getMinutes()
				+ ":" + thisDate.getSeconds();

		console.log(thisDate.getTime());
		console.log(thisDateString);

	}
};