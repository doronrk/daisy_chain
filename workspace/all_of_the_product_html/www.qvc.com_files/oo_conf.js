/* OnlineOpinion v5.4.9 */
/* Released: 12/20/2011 */
/* Components: Full */
/* The following code is Copyright 1998-2011 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com */
/*Inline Feedback*/
var oo_inline = new OOo.Ocode({/* Configuration object goes here */});
/*Invitation Feedback*/
function neverShowMsg(){
	document.getElementById('oo_content').innerHTML = "<p>As you requested, our survey will no longer be presented to you on this computer.</p> <p>If you clear your cookies, use a different computer or browser, a survey may be presented to you again.</p> <p>Thank you for your understanding.</p> <div id=\"oo_buttons\"><input type=\"button\" class=\"primaryButton\" id=\"oo_close\" value=\"Close\" onclick=\"OOo.hidePrompt()\" /></div>";
	OOo.createCookie('oo_inv_reprompt',1,157784630);
}
function cmOpinionClick(tag){
	if(typeof(CM_PageID) == "undefined") CM_PageID = "Unknown";
	cmCreateManualLinkClickTag('http://invite.qvc.com?cm_sp=OPINIONLAB-_-SURVEY-_-'+tag, null, CM_PageID);
}
function cmOpinionEvent(action){
	cmCreateConversionEventTag('Customer', action, 'Survey', 0, 'null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-WSC');
}
function cmOpinionLoad(){cmOpinionEvent(1);}//fired by opinionlab when overlay is created
var OO = {};
OO.init = function () {
    'use strict';
    var oo_feedback = new OOo.Ocode({}), qvcModal = document.getElementById('TB_window');
    function invite_init() {
        if (qvcModal === null) {
            // Run the Invitation instance
            var oo_invite = new OOo.Invitation({
                // Path to the invitation asset files hosted on your web server
                pathToAssets: '/wcsstore/US/content/html/onlineopinionV5/',
                // Percentage of users who will receive an invite prompt
                responseRate: 1,
				promptDelay: 0,
				pagesHit: 2,
                repromptTime: 2592000,
				newWindowSize: [545, 450],
				friendlyDomains: ['http://www.qvc.com', 'http://qvc.com','http://iqvc.com', 'http://www.iqvc.com','https://quality-s.qvc.com'],
                // Will rewrite the "referer" passed to the OpinionLab server,
                // which is the basis for card activations and report groups.
                // If not used the code will simply pass the current URL.
                referrerRewrite: {
                    searchPattern: /:\/\/[^\/]*/,
                    replacePattern: '://invite.qvc.com'
                }
            });
        }
    }
    // The modal is present so lets wait until we get a click
    if (qvcModal !== null) {
        OOo.addEventListener(document.body, 'mousedown', invite_init, false);
    }
    // The modal is not present so go ahead and show the invite
    if (qvcModal === null) {
        invite_init();
    }
};
if (window.addEventListener) { //HTML5
	window.addEventListener("load",OO.init,false);
} else if (window.attachEvent){ //Old IE
	window.attachEvent('onload', OO.init);
}