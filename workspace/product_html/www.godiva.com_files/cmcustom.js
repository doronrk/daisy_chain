 
/*
 * cmcustom.js
 * $Id: cmcustom-10189713-90256617-20120824.txt 204011 2012-08-24 15:54:12Z swehrung $
 * $Revision: 204011 $
 *
 * Version 4.2.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 *	08/24/2012 SWEHRUNG converted to hosted + cmcustom as per ticket 10189713
 *
 */
 
//Code for cormetrics Godiva-591-issue 4

//Custom Productview tag with pc=y
/*function cmCreateProductviewTag(productID, productName, categoryID, attributes, cm_vc) {
	cmMakeTag(["tid","5","pi","PRODUCT: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}*/

//Custom Registration tag with no country parameter
function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, attributes) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cmAttributes",attributes]);
}
