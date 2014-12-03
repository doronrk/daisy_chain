/**
 * sociablelogin.js
 *
 * Handles Facebook interactions. Depends on SociableLabs integration
 *
 * @prerequisite: window.sociablefbjs defined in template somewhere as javascript (this is typically included in logininclude.isml)
 */
jQuery.extend(true, window.sociablefbjs, {
    config: {
        "copy": {
            "ampersand": "&"
        }
    },
    state: {
        "freshLogin": false
    },
    /**
     * Loads logout link click handlers
     */
    loadEventHandlers: function () {
        jQuery('.logout-link').click(function (e) {
            e.preventDefault();
            if (typeof FB !== 'undefined' && FB !== null && FB.getLoginStatus && FB.logout) {
                FB.getLoginStatus(function (response) {
                    if (response && response.status && response.status == 'connected') {
                        FB.logout(function () {
                            window.location.href = window.sociablefbjs.config.siteUrls.logoutPage;
                        });
                    } else {
                        window.location.href = window.sociablefbjs.config.siteUrls.logoutPage;
                    }
                }, true);
            } else {
                window.location.href = window.sociablefbjs.config.siteUrls.logoutPage;
            }
        });
    },
    /**
	 * Initializes the object. Also actually starts listening for items
	 */
    init: function () {
        var self = this;
        window.SL = window.SL || [];
        var initFunction = function () {
            var loginEventListener = function (data) {
                if (typeof data === 'undefined' || data === null || data.data === null) {
                    return;
                }
                if (data.data.indexOf("sl.error") === 0) {
                    if (data.data === "sl.error.authenticated") {
                        //show message
                    } else if (data.data == "sl.error.email.exists") {
                    	SL.push(['facebookLoginFailed']);
                    }
                    return;
                } else if (data.data.indexOf("sl.user.firstName") === 0) {
                	self.config.currentUser.firstName = data.data.split('firstName=')[1];
                }
                if (data.data !== 'sl.login.complete') {
                    return;
                }
                window.sociableLoginComplete();
            };
            if (window.addEventListener) {
                addEventListener("message", loginEventListener);
            } else { //IE8 or earlier
            	attachEvent("onmessage", loginEventListener);
            }
            /*
             * If user is already logged into the site then we don't need to try and log the user in
             */
            if (self.config.currentUser.isAuthenticated == "false") {
                window.SL.push(['getFacebookLoginStatus',
                    function (payload, signature) {
                		if (payload && signature) {
                			self.handleConnectedPageLoad(payload, signature);
                		}
                    }
                ]);
            }
            SL.push(['onFacebookLogin',
                function (payload, signature) {
                    self.onFacebookLogin(payload, signature);
                }
            ]);
            var handleLogout = function (e) {
                if (typeof e !== 'undefined' && e !== null && e.preventDefault) {
                    e.preventDefault();
                }
                if (typeof FB !== 'undefined' && FB !== null && FB.getLoginStatus && FB.logout) {
                    FB.getLoginStatus(function (response) {
                        if (response && response.status && response.status == 'connected') {
                            FB.logout(function () {
                                window.location.href = window.sociablefbjs.config.siteUrls.logoutPage;
                            });
                        } else {
                            window.location.href = window.sociablefbjs.config.siteUrls.logoutPage;
                        }
                    }, true);
                } else {
                    window.location.href = window.sociablefbjs.config.siteUrls.logoutPage;
                }
            }
            if (jQuery('body').on) {
                jQuery('body').on('click', 'logout-link', handleLogout);
            } else {
            	jQuery('.logout-link').live('click', handleLogout);
            }
            jQuery(document).ready(function () {
                self.loadEventHandlers();
            });
        }
        SL.push(['onLoad', initFunction]);
    },
    /**
     * Handles when the user is connected to the site
     * @param payload the uri-encoded for the user from Sociable Labs
     * @param sig the signature matching the payload (we hope)
     */
    onFacebookLogin: function (payload, sig) {
        var self = this;
        if (payload == null || sig == null || window.sociablefbjs.state.freshLogin === true) {
            return;
        }
        self.loginUser(payload, sig);
    },
    handleConnectedPageLoad: function (payload, sig) {
        var self = this;
        if (payload == null || sig == null) {
            return;
        }
        if (typeof window.app !== 'undefined' && window.app !== null && window.app.isUserAuthenticated) {
            return;
        }
        self.onFacebookLogin(payload, sig);
    },
    loginUser: function (payload, sig) {
        var self = this;
        var iframe = jQuery('<iframe />');
        var redirect = document.createElement('a');
        redirect.href = self.config.apiUrls.handleFbVerified;
        var parameters = "payload=" + encodeURIComponent(payload) + "&signature=" + encodeURIComponent(sig) + "&token=" + FB.getAccessToken();
        var protocolOverride = window.location.search.indexOf("protocol=http") !== -1;
        var actualProtocol = window.location.search.indexOf("protocol=https") !== -1 ? "https" : "http";
        var protocol = protocolOverride ? actualProtocol : window.location.protocol;
        parameters += ("&protocol=" + protocol);
        var join = "?";
        if (redirect.search.length > 0) {
            join = "&";
        }
        redirect.search += join + parameters;
        iframe.attr('src', redirect.href);
        jQuery(iframe).hide();
        jQuery('body').append(iframe);
    },
    updateMenus: function () {
    	/*
    	 * New menu to load:
    	 	<div id="urAccount">
				<a class="link" href="https://int.ninewest.com/on/demandware.store/Sites-ninewest-Site/default/Customer-Account">
					[User]'s Account
				</a>
				&nbsp;|
				&nbsp;
				<a class="link logout-link" href="/on/demandware.store/Sites-ninewest-Site/default/Login-Logout">
					Sign out
				</a>
			</div> 
    	 */
        var self = this;
        var oldMenuContainer = jQuery('#account > .link');
        var newContainer = jQuery('<div id="urAccount">' +
			'<a class="link customer-account-link">' +
			'</a>' +
			'&nbsp;|&nbsp;' +
			'<a class="link logout-link">' +
				'Sign out' +
			'</a>' +
		'</div>');
        newContainer.find('.customer-account-link')
        	.attr('href', self.config.siteUrls.customerAccount)
        	.text(self.config.currentUser.firstName + '\'s Account');
        newContainer.find('.logout-link')
        	.attr('href', self.config.siteUrls.logoutPage);
        oldMenuContainer.replaceWith(newContainer);
        self.loadEventHandlers();
    }
});
window.sociableLoginComplete = function () {
	/* if user navigated to login page */
	if (window.location.href.indexOf("Login-Show") > 0) {
		/* if the customer came from NineWest we can follow the referrer */
		if (document.referrer.indexOf('ninewest.com') !== -1) {
			window.location.href = document.referrer;
		} else {
			/* 
			 * if customer went directly to login page from a different site we need to 
			 * redirect them to the home page 
			 */
			window.location.href = sociablefbjs.config.siteUrls.home;
		}
	} else if (window.staticPageName == "Account: Login" ||
			window.staticPageName == "Checkout: Sign-In" ||
			jQuery('.fluid-components-checkout-SignIn').length) {
		/* 
		 * Case 1 and 2: if user was forwarded to login page we just reload the page because the redirect is in the url
		 * Case 3: User is on new checkout flow
		 */
		window.location.reload();
	}
    window.sociablefbjs.updateMenus();
    if (typeof FB != 'undefined' && FB.getLoginStatus) {
        try {
            FB.getLoginStatus(function () {}, true);
        } catch (nologin) {}
    }
}
window.sociablefbjs.init();