/*
On most sites, mtagconfig.js registers callbacks for the various events.
Aveda NA's mtagconfig.js doesnt have this. This lib adds those callbacks so
our tags can use the expected events, and thus be standard across all of the sites
*/

function bt_lpEventButtonClicked (eventName, eventData) {
    jQuery(window).trigger('livechat:button_clicked', [ eventData ]);
}
function bt_lpEventInviteAccepted (eventName, eventData) {
    jQuery(window).trigger('livechat:invite_accepted', [ eventData ]);
}
function bt_lpEventInviteShown (eventName, eventData) {
    jQuery(window).trigger('livechat:invite_shown', [ eventData ]);
}


/* Would be defined if mtagconfig.js has been loaded */
if (typeof(window.lpMTagConfig) != "undefined") {

    /* If already defined by mtagconfig.js, then we're already good */
    if (typeof(window.lpTriggerEvent) == "undefined") {

        /* If lpMTag is defined, then mtagconfig.js has already loaded, and LiveChat's libs have loaded */
        if (typeof(window.lpMTag) != "undefined") {
        
            lpMTag.events.register('LP_INV_SHOWN', bt_lpEventInviteShown);
            lpMTag.events.register('LP_INV_ACCEPT', bt_lpEventInviteAccepted);
            lpMTag.events.register('LP_DYNBUTTON_CLICKED', bt_lpEventButtonClicked);
            lpMTag.events.register('LP_STATBUTTON_CLICKED', bt_lpEventButtonClicked);

        } else {

            /* mtagconfig.js has loaded, but LiveChat's libs haven't loaded yet. So have to register
            the events this way */

            lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length]  = function () {
                lpMTag.events.register('LP_INV_SHOWN', bt_lpEventInviteShown);
                lpMTag.events.register('LP_INV_ACCEPT', bt_lpEventInviteAccepted);
                lpMTag.events.register('LP_DYNBUTTON_CLICKED', bt_lpEventButtonClicked);
                lpMTag.events.register('LP_STATBUTTON_CLICKED', bt_lpEventButtonClicked);
            };

        }
    }
}

