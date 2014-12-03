/**
 * Mageplace Facebook Connect
 *
 * @category    Mageplace_Facebook
 * @package     Mageplace_Facebook_Connect
 * @copyright   Copyright (c) 2011 Mageplace. (http://www.mageplace.com)
 * @license     http://www.mageplace.com/disclaimer.html
 */

var mpFBConnect = function() {
	return {
		connectStatus: '',
		href: '',
		facebookconnectform: '',
		displayLoginWin: false,
		
		init: function(href) {
			if(FB) {
				FB.getLoginStatus(function(loginStatusResponse) {
					mpFBConnect.connectStatus = loginStatusResponse.status;
				}, true);
			}
			
			if(href) {
				mpFBConnect.href = href;
			}
		},
		
		insertFBConnectForm: function() {
			try {
				if($('facebookconnectform') == null) {
					$$('body').first().insert(mpFBConnect.facebookconnectform);
				}
			} catch(e) {console.log(e);}
		},

		submitFBConnectForm: function() {
			try {
				if($('facebookconnectform') == null) {
					mpFBConnect.insertFBConnectForm();
				}

				$('facebookconnectform').submit();
			} catch(e) {console.log(e);}
		},

		openFBWin: function() {
			if(!mpFBConnect.href) {
				window.location.reload();
			}			
			
			var fbWin = window.open(mpFBConnect.href, 'FacebookConnectorPopup', 'width=500,height=300,left=100,top=100,location=no,status=yes,scrollbars=yes,resizable=yes');
			if(fbWin) {
				fbWin.focus();
			}
		},
		
		loginFB: function() {
			if(mpFBConnect.connectStatus == 'connected') {
				mpFBConnect.submitFBConnectForm();
			} else {
				mpFBConnect.openFBWin();
			}
			
			return false;
		}
	}
}();


Event.observe(window, 'load', function() {
	$$('span.facebookconnect-button > a').each(function(el) {
		el.setAttribute('onclick', "mpFBConnect.loginFB()");
		el.onclick = Function("mpFBConnect.loginFB()");
		el.href = 'javascript:void(0);';
	});
	
	if(mpFBConnect.displayLoginWin) {
		mpFBConnect.openFBWin();
	}
});
