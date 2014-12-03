/*
OnlineOpinion v5.7.7
Released: 11/19/2013. Compiled 11/19/2013 03:08:33 PM -0600
Branch: master Nov
Components: Full
UMD: disabled
The following code is Copyright 1998-2013 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/
/*global OOo*/
/* Check for Android devices */
if (OOo.Browser.ua.search('Android') === -1) {
/* [+] Floating Icon configuration */
var oo_floating = new OOo.Ocode({
    floating: {},
	disableMobile: true
   });
}