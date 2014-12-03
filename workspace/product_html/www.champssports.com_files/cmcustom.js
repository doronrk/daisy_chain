/*
* DATE: 10/10/2013 - Replacing cmdatatagutils.js file with cmcustom.js
* Issue: Element tag function definition required an update from the deprecated cmCreatePageElementTag() function
*/
/*
 * Creates a Productview Tag
 * Also creates a Pageview Tag by setting pc="Y"
 * Format of Page ID is "PDP[: Template <productTemplate>]: <Product Name>: <Product ID>"
 *
 * productID	: required. Product ID to set on this Productview tag
 * productName	: required. Product Name to set on this Productview tag
 * categoryID	: optional. Category ID to set on this Productview tag 
 * productTemplate	: optional. Custom product template number on this Productview tag 
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateProductviewTag(productID, productName, categoryID, productTemplate, microsite, attributes) {
	if (productName == null) 
		productName = "";
	
	if (productTemplate != null && productTemplate != "")
		productTemplate = "Template " + productTemplate + ": ";
	else
		productTemplate = "";
	
	if (microsite != null && microsite != "")
		microsite += ": ";
	// first check if readCookie function isDefined needed EB mobile
	else if (typeof readCookie == 'function' && readCookie('COBRANDED') != null) {
 		var tempcobrand = unescape(readCookie('COBRANDED'));
  	 	var tempcobrandstr = tempcobrand.split('|');
 		microsite = tempcobrandstr[1];
 		microsite += ": ";	
 	}
	else
		microsite = "";
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","5","pi",microsite + "PDP: " + productTemplate + productName + ": " + productID,"pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cmExtractParameter("cm_vc",document.location.href),"cm_exAttr",cm_exAttr]);
}

/*
 * Creates a Registration tag and/or a Newsletter tag
 *
 * customerID		: required for Registration. ID of Customer to register.
 * customerEmail	: required for Newsletters. Optional for Registration.
 * customerCity		: optional. City of Customer that placed this order
 * customerState	: optional. State of Customer that placed this order
 * customerZIP		: optional. Zipcode of Customer that placed this order
 * newsletterName	: required for Newsletters. The name of the Newsletter.
 * subscribe		: required for Newsletters. Either "Y" or "N"
 *
 */
function cmCreateRegistrationTag(customerID, customerEmail, customerCity,customerState, customerZIP, newsletterName, subscribe, attributes) {
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletterName,"sd",subscribe,"cm_exAttr",cm_exAttr]);
}
