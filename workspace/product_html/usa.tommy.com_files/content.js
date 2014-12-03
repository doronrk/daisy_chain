function opCreativeSetCookieA(n, v, d, e){var de = new Date;de.setTime(de.getTime() + e * 1000);document.cookie = n + "=" + escape(v) + ((e==null) ? "" : ("; expires=" + de.toGMTString())) + "; path=/" + ((d==null) ? "" : (";domain=" + d));}
function opCreativeGetDocumentSLD(){var sld = document.domain;var dp = sld.split(".");var l = dp.length;if (l < 2) sld = null;else if (!isNaN(dp[l-1]) && !isNaN(dp[l-2])) sld = null;else sld = "." + dp[l-2] + "." + dp[l-1];return sld;}
opCreativeSetCookieA("op2tommyhilfigertestpagegum", "a11p18e4bn2ac3z06f561c23c", opCreativeGetDocumentSLD(), 2592000);
opCreativeSetCookieA("op2tommyhilfigertestpageliid", "a11p18e4bn2ac3z06f561c23c", opCreativeGetDocumentSLD(), 86400);

