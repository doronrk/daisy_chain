$(document).ready(function() {

	// DIALOGS
	//cookies dialog popup
	var $aboutCookies = $('<div></div>')
		.html($("#aboutCookiesContent").text())
		.dialog({modal: true,
				autoOpen: false,
				title: 'About Cookies',
				closeText: 'close'
				});
	
	$("a.aboutCookies").click(function(event) {
		$aboutCookies.dialog('open');
	
		//don't follow the link
		return false;
	});
	
	//learn more dialog popup
	var $learnMore = $('<div></div>')
		.html($("#learnMoreContent").text())
		.dialog({modal: true,
				autoOpen: false,
				title: 'Learn More',
				closeText: 'close'
				});
	
	$("a.learnMore").click(function(event) {
		$learnMore.dialog('open');
	
		//don't follow the link
		return false;
	});
	
	// what's this dialog popup
	var $cscWhatsThis = $('<div></div>')
		.html($("#cscWhatsThisContent").html())
		.dialog({modal: true,
				autoOpen: false,
				title: 'Where is the credit card security code?',
				closeText: 'Close',
				height:400,
				width:400
				});
	
	$("a.cscWhatsThis, #cscWhatsThis").click(function(event) {
		$cscWhatsThis.dialog('open');
	
		//don't follow the link
		return false;
	});
	
	
	// coupon code what's this dialog popup
	var $couponWhatsThis = $('<div></div>')
		.html($("#couponWhatsThisContent").html())
		.dialog({modal: true,
				autoOpen: false,
				title: 'What is a source code?',
				closeText: 'Close',
				height:200,
				width:400,
				close: function(){
					$('#brands-wrap').addClass('sticky-wrap');
				    $('#brands').addClass('sticky');
				    $('#miniCart').addClass('sticky-cart');
				    $('#header-block').addClass('sticky-block');
				    $('#headerContent').addClass('sticky-content-background');
				}
				});
	$("a.couponWhatsThis").click(function(event) {
		$couponWhatsThis.dialog('open');
		$('#brands-wrap').removeClass('sticky-wrap');
		$('#brands').removeClass('sticky');
		$('#miniCart').removeClass('sticky-cart');
		$('#header-block').removeClass('sticky-block');
		$('#headerContent').removeClass('sticky-content-background');
		//don't follow the link
		return false;
	});
	
	
	
	
});