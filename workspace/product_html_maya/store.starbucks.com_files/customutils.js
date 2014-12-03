/**
 * The following function removes the following
 * 	 single quotes
 * 	 double quotes
 * 	 registered symbol
 */
function removeQuotesAndR(str) {
	str = str.replace(/\xC0|&Agrave;|&amp;Agrave;|&amp;#192;|&#192;|À/g,"A");
	str = str.replace(/\xC1|&Aacute;|&amp;Aacute;|&amp;#193;|&#193;|Á/g,"A");
	str = str.replace(/\xC2|&Acirc;|&amp;Acirc;|&amp;#194;|&#194;|Â/g,"A");
	str = str.replace(/\xC3|&Atilde;|&amp;Atilde;|&amp;#195;|&#195;|Ã/g,"A");
	str = str.replace(/\xC4|&Auml;|&amp;Auml;|&amp;#196;|&#196;|Ä/g,"A");
	str = str.replace(/\xC5|&Aring;|&amp;Aring;|&amp;#197;|&#197;|Å/g,"A");
	str = str.replace(/\xC7|&Ccedil;|&amp;Ccedil;|&amp;#199;|&#199;|Ç/g,"C");
	str = str.replace(/\xC8|&Egrave;|&amp;Egrave;|&amp;#200;|&#200;|È/g,"E");
	str = str.replace(/\xC9|&Eacute;|&amp;Eacute;|&amp;#201;|&#201;|É/g,"E");
	str = str.replace(/\xCA|&Ecirc;|&amp;Ecirc;|&amp;#202;|&#202;|Ê/g,"E");
	str = str.replace(/\xCB|&Euml;|&amp;Euml;|&amp;#203;|&#203;|Ë/g,"E");
	str = str.replace(/\xCC|&Igrave;|&amp;Igrave;|&amp;#204;|&#204;|Ì/g,"I");
	str = str.replace(/\xCD|&Iacute;|&amp;Iacute;|&amp;#205;|&#205;|Í/g,"I");
	str = str.replace(/\xCE|&Icirc;|&amp;Icirc;|&amp;#206;|&#206;|Î/g,"I");
	str = str.replace(/\xCF|&Iuml;|&amp;Iuml;|&amp;#207;|&#207;|Ï/g,"I");
	str = str.replace(/\xD1|&Ntilde;|&amp;Ntilde;|&amp;#209;|&#209;|Ñ/g,"N");
	str = str.replace(/\xD2|&Ograve;|&amp;Ograve;|&amp;#210;|&#210;|Ò/g,"O");
	str = str.replace(/\xD3|&Oacute;|&amp;Oacute;|&amp;#211;|&#211;|Ó/g,"O");
	str = str.replace(/\xD4|&Ocirc;|&amp;Ocirc;|&amp;#212;|&#212;|Ô/g,"O");
	str = str.replace(/\xD5|&Otilde;|&amp;Otilde;|&amp;#213;|&#213;|Õ/g,"O");
	str = str.replace(/\xD6|&Ouml;|&amp;Ouml;|&amp;#214;|&#214;|Ö/g,"O");
	str = str.replace(/\xD8|&Oslash;|&amp;Oslash;|&amp;#216;|&#216;|Ø/g,"O");
	str = str.replace(/\xD9|&Ugrave;|&amp;Ugrave;|&amp;#217;|&#217;|Ù/g,"U");
	str = str.replace(/\xDA|&Uacute;|&amp;Uacute;|&amp;#218;|&#218;|Ú/g,"U");
	str = str.replace(/\xDB|&Ucirc;|&amp;Ucirc;|&amp;#219;|&#219;|Û/g,"U");
	str = str.replace(/\xDC|&Uuml;|&amp;Uuml;|&amp;#220;|&#220;|Ü/g,"U");
	str = str.replace(/\xDD|&Yacute;|&amp;Yacute;|&amp;#221;|&#221;|Ý/g,"Y");
	str = str.replace(/\xE0|&agrave;|&amp;agrave;|&amp;#224;|&#224;|à/g,"a");
	str = str.replace(/\xE1|&aacute;|&amp;aacute;|&amp;#225;|&#225;|á/g,"a");
	str = str.replace(/\xE2|&acirc;|&amp;acirc;|&amp;#226;|&#226;|â/g,"a");
	str = str.replace(/\xE3|&atilde;|&amp;atilde;|&amp;#227;|&#227;|ã/g,"a");
	str = str.replace(/\xE4|&auml;|&amp;auml;|&amp;#228;|&#228;|ä/g,"a");
	str = str.replace(/\xE5|&aring;|&amp;aring;|&amp;#229;|&#229;|å/g,"a");
	str = str.replace(/\xE7|&ccedil;|&amp;ccedil;|&amp;#231;|&#231;|ç/g,"c");
	str = str.replace(/\xE8|&egrave;|&amp;egrave;|&amp;#232;|&#232;|è/g,"e");
	str = str.replace(/\xE9|&eacute;|&amp;eacute;|&amp;#233;|&#233;|é/g,"e");
	str = str.replace(/\xEA|&ecirc;|&amp;ecirc;|&amp;#234;|&#234;|ê/g,"e");
	str = str.replace(/\xEB|&euml;|&amp;euml;|&amp;#235;|&#235;|ë/g,"e");
	str = str.replace(/\xEC|&igrave;|&amp;igrave;|&amp;#236;|&#236;|ì/g,"i");
	str = str.replace(/\xED|&iacute;|&amp;iacute;|&amp;#237;|&#237;|í/g,"i");
	str = str.replace(/\xEE|&icirc;|&amp;icirc;|&amp;#238;|&#238;|î/g,"i");
	str = str.replace(/\xEF|&iuml;|&amp;iuml;|&amp;#239;|&#239;|ï/g,"i");
	str = str.replace(/\xF1|&ntilde;|&amp;ntilde;|&amp;#241;|&#241;|ñ/g,"n");
	str = str.replace(/\xF2|&ograve;|&amp;ograve;|&amp;#242;|&#242;|ò/g,"o");
	str = str.replace(/\xF3|&oacute;|&amp;oacute;|&amp;#243;|&#243;|ó/g,"o");
	str = str.replace(/\xF4|&ocirc;|&amp;ocirc;|&amp;#244;|&#244;|ô/g,"o");
	str = str.replace(/\xF5|&otilde;|&amp;otilde;|&amp;#245;|&#245;|õ/g,"o");
	str = str.replace(/\xF6|&ouml;|&amp;ouml;|&amp;#246;|&#246;|ö/g,"o");
	str = str.replace(/\xF8|&oslash;|&amp;oslash;|&amp;#248;|&#248;|ø/g,"o");
	str = str.replace(/\xF9|&ugrave;|&amp;ugrave;|&amp;#249;|&#249;|ù/g,"u");
	str = str.replace(/\xFA|&uacute;|&amp;uacute;|&amp;#250;|&#250;|ú/g,"u");
	str = str.replace(/\xFB|&ucirc;|&amp;ucirc;|&amp;#251;|&#251;|û/g,"u");
	str = str.replace(/\xFC|&uuml;|&amp;uuml;|&amp;#252;|&#252;|ü/g,"u");
	str = str.replace(/\xFD|&yacute;|&amp;yacute;|&amp;#253;|&#253;|ý/g,"y");
	str = str.replace(/\xFF|&yuml;|&amp;yuml;|&amp;#255;|&#255;|ÿ/g,"y");
	str = str.replace(/\u0160|&Scaron;|&amp;Scaron;|&amp;#352;|&#352;|Š/g,"S");
	str = str.replace(/\u0161|&scaron;|&amp;scaron;|&amp;#353;|&#353;|š/g,"s");
	str = str.replace(/\u0178|&Yuml;|&amp;Yuml;|&amp;#376;|&#376;|Ÿ/g,"Y");
	str = str.replace(/\u00ae|&reg;|&amp;reg;|reg;|&#174;|&amp;#174;|®/g,"");
	str = str.replace(/\u2122|&trade;|&amp;trade;|&#153;|&amp;#153;|&#8482;|&amp;#8482;|™/g,"");
	str = str.replace(/\u00a9|&copy;|&amp;copy;|&amp;#169;|&#169;|©/g,"");
	str = str.replace(/\u2022|&bull;|&amp;bull;|&amp;#8226;|&#8226;|•/g," ");
	str = str.replace("&amp;#34;", "");
	str = str.replace("&amp;#39;", "");
	str = str.replace("&amp;#40;", "(");
	str = str.replace("&amp;#41;", ")");
	str = str.replace("&amp;quot;", "");

	return str;
}

/**
 * The following is a helper function for Coremetrics registration tagging
 * DO NOT REMOVE
 */
function pfs_cmCreateRegistrationTag(customerEmail, customerCity, customerState, customerZIP, customerCountry, attributes){
	var emailRE = new RegExp("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}");
	var zip = null;
	if(emailRE.exec(customerEmail) != null){
		if(customerCountry == "US" || customerCountry == "USA" || customerCountry == "United States"){
			if(customerZIP != null){
				zip = customerZIP.substring(0,5);
			}
		}
		else{
			zip = customerZIP;
		}
		cmCreateRegistrationTag(customerEmail, customerEmail, customerCity, (customerState != null && customerState != 'null' ? customerState : ''), zip, customerCountry, attributes);
	}
}


/** 
 * Removes amp from encoded querystring
 * due to & separators between parameters
 * 
 */
function removeAmp(urlString) {
	
	return urlString.replace("amp;", "");
}

function changeLeftNavTo(newID) {
	jQuery("#" + newID + " a").addClass("selected");
}