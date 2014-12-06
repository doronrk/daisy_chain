/*
OnlineOpinion v5.8.4
Released: 09/16/2014. Compiled 09/16/2014 03:54:46 PM -0500
Branch: master 1ef0996488d33c3062996047deb200e06e95643b
Components: Full
UMD: disabled
The following code is Copyright 1998-2014 Opinionlab, Inc. All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com
*/

/* global window, OOo */

/*
Inline and Tab configuration
*********************
Object is now being instantiated against the OOo object (1 global class)
To call this inline object, place the below in the click event
OOo.oo_feedback.show()
*/
(function (w, o) {
    'use strict';

    var OpinionLabInit = function () {

        o.oo_feedback = new o.Ocode({
            onPageCard: {
                closeWithOverlay: true
            },
        });

        o.oo_tab = new o.Ocode({
            tab: {
            },
            disableMobile: true,
            onPageCard: {
                closeWithOverlay: true
            },
        });

    };

    o.addEventListener(w, 'load', OpinionLabInit, false);

})(window, OOo);