/**
 * QVC toGather Hearting on QVC.com
 * Copyright (c) 2014 QVC toGather
 * To be loaded onto qvc.com's product detail pages
 */

(function() {
	if (typeof(window.QVC_COM) != 'undefined')
		return;

	// Hold all hearting related info for used by iframe
	window.QVC_COM = {
		isToGatherUser: false,
		qvcmn: null,
		qvcauthenticed: null,
		mobile: false,
		onModalCloseParams: {},
		cacheBustVersion: '20140605'
	};

	var link = document.createElement('link');
	link.setAttribute('rel',  'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', '//g.qvcimg.com/bundles/qvcwidget/css/heart/toGather.css?v=' + QVC_COM.cacheBustVersion);
	document.getElementsByTagName('head')[0].appendChild(link);

	var DEBUG = false;

	var	$hiddenIframe,
		$productDiv,
		$productImg,
		$heartBtn,
		$heartCnt,
		$j;

	var productId = '',
		productTitle = '',
		productHearted = false;

	var baseUrl = '//gather.qvc.com',
		baseImageUrl = '//g.qvcimg.com',
		qvcComProdUrl = window.location.href,
		isMobile,
		iframeWidth = 600,
		iframeHeight = 471;

	function get_utag_data() {
		var utag_data = window.utag_data || (window.utag ? window.utag.data : null)
		return utag_data || {};
	}

	function init() {
		$productDiv = $j('#divProductDetailViewArea');
		$productImg = $j('#imageID');
		isMobile = $j('body').hasClass('isMobile');

		if (!$productDiv.length) // Not on a product page
			return;

		QVC_COM.qvcComCategoryId = 'HEART'+(typeof categoryId !== 'undefined' ? categoryId : ''); // categoryId and ItemIdn are global vars on qvc.com
		productId = typeof ItemIdn != 'undefined' ? ItemIdn : (typeof ItemNumber != 'undefined' ? ItemNumber : '');
		productTitle = encodeURIComponent($j.trim($j('h1.fn').text()));

		var utag_data = get_utag_data();
		QVC_COM.qvcauthenticed = utag_data['cp.qvcauthenticed'];
		QVC_COM.qvcmn = utag_data['cp.qvcmn'];

		initInsertHeart(); // Step 1, start querying Gather API
		initPostMessage();
		initHeartAnimation();
	}

	function initInsertHeart() {
		QVC_COM.parentToIframeObj = $j.extend({}, {
			action: 'initInsertHeart',
			productId: productId
		});

		var iframeSrc = baseUrl + '/bundles/qvcwidget/html/heart/index.html?v=' + QVC_COM.cacheBustVersion + '&isMobile='+isMobile+'&width=' + iframeWidth + '&height=' + iframeHeight + '&';
		$hiddenIframe = $j('<iframe id="tgIframe" style="display:none" src="' + iframeSrc + '" />');

		$hiddenIframe.appendTo('body');
		log('Parent: Loaded hidden iframe');
	}

	// Called from hidden iframe after isHearted flag is retrieved via ajax
	function insertHeart(sknData) {
		log('Parent: insertHeart() called from Iframe, sknData =', sknData);

		var sknObject = sknData['object'] || {} ;
		QVC_COM.sknData = sknData;
		QVC_COM.sknAttrs = sknObject.attributes || { blank: true };
		QVC_COM.isToGatherUser = sknData.user;
		QVC_COM.mobile = sknData.mobile;

		if (!sknData.show)
			return;

		productHearted = QVC_COM.sknAttrs.is_hearted; // Manually set site promotion Coremetrics info via attribute, see QVC-5150 for more info
		$heartBtn = $j('<a href="javascript:void(0)" class="tgHeart'+(productHearted ? ' on' : '')+'">Heart</a>').on('click', onHeartClick).appendTo($productDiv);

		if (!QVC_COM.mobile)
			setupHeartTooltip();

		if (typeof(QVC_COM.sknAttrs.heart_count) != 'undefined') {
			var heartCnt = QVC_COM.sknAttrs.heart_count || '';
			if (!heartCnt && productHearted) heartCnt = 1;
			$heartCnt = $j('<span class="tgHeartCnt" title="Heart Count">'+heartCnt+'</span>').appendTo($productDiv);
		}
	}

	function setupHeartTooltip() {
		var onMouseLeave = function() {
			clearTimeout(QVC_COM.tooltipTimeout);
			clearTimeout(QVC_COM.tooltipOffTimeout);
			$heartBtn.next('.tgTooltip').fadeOut(200, function() { $j(this).remove(); });
		};

		$heartBtn.hover(function() {
			var $this = $(this), isHearted = $this.hasClass('on'), hintText = isHearted ? 'Item added to toGather Collection(s)' : 'Add to toGather Collections';
			QVC_COM.tooltipTimeout = setTimeout(function() {
				$j('<span class="tgTooltip'+(isHearted?' tgTooltipAdded':'')+'">'+hintText+'</span>').hide().insertAfter($this).fadeIn(200, function() {
					QVC_COM.tooltipOffTimeout = setTimeout(onMouseLeave, 3000);
				});
			}, 1000);
		}, onMouseLeave);
	}

	function onHeartClick() {
		var action = 'heartProduct',
			mediaId = getMediaId(),
			image = $productImg.attr('src'),
			heartedMediaUrl;

		if ((!QVC_COM.sknAttrs || QVC_COM.sknAttrs.blank) && !QVC_COM.sknData.fake) {
			action = 'showUnavailableMsg';
			$heartBtn.removeClass('on'); // Turn off heart for mobile devices, as it stays red after tap
		}

		if (QVC_COM.isToGatherUser && QVC_COM.signedInToGather && QVC_COM.sknData)
			QVC_COM.sknData.user = true;

		if (!QVC_COM.isToGatherUser && !QVC_COM.sknData.isRememberedUser && action != 'showUnavailableMsg') // Show promo if not signed in and not cookied on toGather
			action = 'showPromo';

		if (QVC_COM.sknAttrs.heart_media && QVC_COM.sknAttrs.heart_media.image)
			heartedMediaUrl = QVC_COM.sknAttrs.heart_media.image.url;

		QVC_COM.parentToIframeObj = $j.extend({}, {
			action: action,
			productId: productId,
			mediaId: mediaId,
			image: heartedMediaUrl || image,
			title: productTitle,
			isHearted: $heartBtn.hasClass('on')
		});

		var mobileSuffix = '';
		if (QVC_COM.mobile)
			mobileSuffix = '-mobile';

		TB_show('', baseUrl + '/bundles/qvcwidget/html/heart/index' + mobileSuffix + '.html?v=' + QVC_COM.cacheBustVersion + '&isMobile='+isMobile+'&width=' + iframeWidth + '&height=' + iframeHeight + '&TB_iframe=true&', false);

		$j('#TB_closeWindowButton, #TB_overlay').click(onModalClose);

		var cmProductId = QVC_COM.sknAttrs.product_id || productId;
		var cmProductTitle = QVC_COM.sknAttrs.product_title || productTitle;

		cmCreateManualLinkClickTag(window.location.href+'&cm_sp=HEART-_-PRODUCTDETAIL-_-'+productId, 'HEART-_-PRODUCTDETAIL-_-'+productId);
		cmCreatePageviewTag('Hearting: '+cmProductId+'-'+cmProductTitle, QVC_COM.qvcComCategoryId);

		if (action == 'showPromo') // Heart add is tracked by qHeart
			trackEvent(['QVC', 'Promo_Heart',[['Action', 'Start']]]);
		else if (action == 'showUnavailableMsg')
			trackEvent(['Error_QVC', 'Not_Available']);
	}

	var heartImgUrl, $animCanvas, $animHeart;

	function animateHeart(addOneToHeartCount) {
		if (!heartImgUrl) {
			heartImgUrl = baseImageUrl + '/bundles/qvcvoices/img/sprites/base/BTN_heart_on_2x.png?v=' + QVC_COM.cacheBustVersion;
			$animCanvas = $j('<div id="heart-anim-canvas"><img src="'+heartImgUrl+'" /></div>').appendTo('body');
			$animHeart = $animCanvas.find('img');
		}

		var animFromWidth = $animCanvas.width(), animToWidth = 27,
			pos = $heartBtn.css('opacity', 0).addClass('on').offset(),
			offset = { top:10, left:10 };

		$animCanvas.css({top:pos.top - offset.top, left:pos.left - offset.left}).show();
		$animHeart.css('width', animFromWidth).animate({width:animToWidth, top:10, left:10}, 350, 'easeInOutSine', function() {
			$animCanvas.hide();
			$animHeart.css({top:0, left:0});
			$heartBtn.css('opacity', 1);
			if (addOneToHeartCount)
				updateHeartCount('addOne=1');
		});
	}

	function toggleHeart(obj) {
		var turnHeartOn = obj && obj.turnHeartOn;
		$heartBtn.toggleClass('on', turnHeartOn);
		productHearted = turnHeartOn;
	}

	function updateHeartCount(addOne) {
		if (!$heartCnt) return;
		var currCnt = $heartCnt.text(),
			newCnt = (currCnt ? parseInt(currCnt) : 0) + (addOne ? 1 : -1);
		if (newCnt < 1)
			newCnt = '';
		$heartCnt.text(newCnt);
	}

	function getMediaId() {
		var viewingAreaImgSrc = $productImg.attr('src'),
			matchArr = viewingAreaImgSrc.match(/\/([a-zA-Z0-9\.\_]+)\?/);
		return matchArr.length == 2 ? matchArr[1] : null;
	}

	function resizeIframe(obj) {
		$j('#TB_iframeContent, #TB_window').css(obj);
	}

	function closeModal(paramObj) {
		TB_remove();
		onModalClose();
		if (paramObj && paramObj.runFunc)
			QVC_COM[paramObj.runFunc.funcName](paramObj.runFunc.funcParams);
	}

	function onModalClose() {
		var obj = QVC_COM.onModalCloseParams;
		if (obj && obj.turnHeartOn) { // Saving a new or an existing heart
			if (obj.animateHeart) {
				setTimeout(function() { animateHeart(obj.incrementCount ? 'addOneToHeartCount=1' : false); }, 500);
			}
			else if (!productHearted && obj.incrementCount) {
				$heartBtn.addClass('on');
				updateHeartCount('addOne=1');
			}
		}
		else if (obj && obj.turnHeartOff && productHearted) { // Unhearting
			$heartBtn.removeClass('on');
			updateHeartCount(false);
		}
		else if (obj.decrementCount) { // Unhearting after signing in
			updateHeartCount(false);
		}

		productHearted = obj && obj.turnHeartOn;
		QVC_COM.onModalCloseParams = {}; // Reset params
		if (QVC_COM.sknAttrs)
			QVC_COM.sknAttrs.is_hearted = productHearted;

		QVC_COM.sknData.from_heart_js = true;
	}

	function loadScript(src, onSuccess) {
		var head = document.getElementsByTagName('head')[0],
			script = document.createElement('script'),
			done = false;

		script.src = src;
		script.onload = script.onreadystatechange = function() {
			if ( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
				done = true;
				if (typeof onSuccess == 'function')
					onSuccess();
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			}
		};
		head.appendChild(script);
	}

	function loadJson2AndJQuery() {
		if (typeof JSON != 'object' || !JSON.stringify) {
			loadScript('//g.qvcimg.com/bundles/qvcvoices/lib/json/json2.min.js', function() {
				loadJQueryAndInit();
			});
		} else {
			loadJQueryAndInit();
		}
	}

	function loadJQueryAndInit() {
		if (typeof jQuery != 'undefined') {
			$j = jQuery;
			init();
			return;
		}

		loadScript('//g.qvcimg.com/bundles/qvcvoices/lib/jquery/jquery-1.8.3.min.js', function() {
			if (typeof jQuery != 'undefined') {
				$j = jQuery.noConflict();
				init();
			}
		});
	}

	function initHeartAnimation() {
		if (!$j.easing)
			$j.easing = {};

		$j.easing.easeInOutSine = function (x, t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	}

	/***************** Event Tracking and Cookie Helpers *****************/

	/**
	 * Sample arr: ['Add', 'Heart', [['Add_Status', 'Complete']]]
	 * This will call trackEvent() inside iframe.js
	 */
	function trackEvent(arr) {
		postMsg({'func':'runFunc', 'params':{'funcName':'trackEvent', 'paramObj':arr}});
	}

	function tgCreateManualLinkClickTag(paramObj) {
		cmCreateManualLinkClickTag.apply(window, paramObj.params);
	}

	function tgCreatePageviewTag(paramObj) {
		cmCreatePageviewTag.apply(window, paramObj.params);
	}

	function writeCookie(name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date;
		}
		document.cookie = escape(name) + "=" + escape(value) + expires + "; domain=qvc.com; path=/";
	}

	function readCookie(name) {
		var nameEQ = escape(name) + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
		}
		return null;
	}

	function eraseCookie(name) {
		writeCookie(name, "", -1);
	}

	function qvcComLogout() {
		eraseCookie('qvcgmn');
		eraseCookie('qvcgauthenticed');
		window.location.href = $j('#divMastheadLinks a:first').attr('href');
	}

	function log() {
		if (!DEBUG || typeof console == 'undefined')
			return;

		if (arguments.length > 1)
			console.log(arguments);
		else
			console.log(arguments[0]);
	}

	/***************** Post Message Helpers *****************/

	var postMsgFuncs = {
		getVar: function(params, relayParams) {
			log('Parent: getVar(), params =', params);
			var arr = {};
			for (var varName in params.varNames)
				arr[varName] = QVC_COM[varName];

			postMsg({'func':'setVar', 'params':{'varNames':arr}, 'relayParams':relayParams});
		},
		setVar: function(params) {
			log('Parent: setVar(), params =', params);
			for (var varName in params.varNames)
				QVC_COM[varName] = params.varNames[varName];
		},
		runFunc: function(params) {
			log('Parent: runFunc(), params =', params);
			QVC_COM[params.funcName](params.paramObj);
		}
	};

	/**
	 * There are two ways for the child iframe to communicate with this parent:
	 * 1. Via parent.postMessage(), used for IE 9 or greater only
	 * 2. Via parent['func'](), used for all other browsers
	 */
	function initPostMessage() {
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
			eventer = window[eventMethod],
			messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

		eventer(messageEvent, function(e) {
			if (e.origin.indexOf('qvc.com') === -1)
				return;

			var obj = e.data || e.message;
			if (typeof obj == 'string')
				obj = $j.parseJSON(obj);

			if (postMsgFuncs[obj.func])
				postMsgFuncs[obj.func](obj.params, obj.relayParams);

		}, false);
	}

	function postMsg(param) {
		log('Parent: postMsg() to iframe', ' param =', param);
		var $iframe = $j('#TB_window iframe');
		if (!$iframe.length || (param && param.params && param.params.funcName && param.params.funcName == 'trackEvent'))
			$iframe = $hiddenIframe;
		if ($iframe && $iframe[0] && $iframe[0].contentWindow)
			$iframe[0].contentWindow.postMessage(typeof param !== 'string' ? JSON.stringify(param) : param, '*');
	}

	/***************** Initialize *****************/

	loadJson2AndJQuery();

	QVC_COM.baseUrl = baseUrl;
	QVC_COM.baseImageUrl = baseImageUrl;
	QVC_COM.readCookie = readCookie;
	QVC_COM.insertHeart = insertHeart;
	QVC_COM.toggleHeart = toggleHeart;
	QVC_COM.resizeIframe = resizeIframe;
	QVC_COM.closeModal = closeModal;
	QVC_COM.qvcComLogout = qvcComLogout;
	QVC_COM.qvcComProdUrl = qvcComProdUrl;
	QVC_COM.tgCreateManualLinkClickTag = tgCreateManualLinkClickTag;
	QVC_COM.tgCreatePageviewTag = tgCreatePageviewTag;
	QVC_COM.trackEvent = trackEvent;

})();
