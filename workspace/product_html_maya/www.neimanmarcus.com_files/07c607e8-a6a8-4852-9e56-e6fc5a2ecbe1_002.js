// Copyright 2006-2014 ClickTale Ltd., US Patent Pending
// Generated on: 11/26/2014 9:41:10 AM (UTC 11/26/2014 3:41:10 PM)

if (typeof(ct_dispatcher) == 'undefined')
{
	ct_dispatcher = {
		configName : null,
		cookieName : "ct_configName",
		getParameterByName : function (name)
		{
			 name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			 var regexS = "[\\?&]" + name + "=([^&#]*)";
			 var regex = new RegExp(regexS, "i");
			 var results = regex.exec(window.location.search);
			 if(results == null)
			   return "";
			 else
			   return decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		createCookie: function (name,value,days) 
		{
			if (days) 
			{
				var date = new Date();
				date.setTime(date.getTime( )+( days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString( );
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		readCookie : function (name) 
		{
			var nameEQ = name + "=";
			var ca = document.cookie.split( ';');
			for( var i=0;i < ca.length;i++) 
			{
				var c = ca[i];
				while ( c.charAt( 0)==' ') c = c.substring( 1,c.length);
				if ( c.indexOf( nameEQ) == 0) return c.substring( nameEQ.length,c.length);
			}
			return null;
		}
	};
		
	// Read from querystring
	var ct_pdc_qs_val = ct_dispatcher.getParameterByName(ct_dispatcher.cookieName);
	if (ct_pdc_qs_val)
	{
		// Override/create cookie
		ct_dispatcher.createCookie(ct_dispatcher.cookieName, ct_pdc_qs_val, 14);
		ct_dispatcher.configName = ct_pdc_qs_val;
	}
	else
	{
		// Read from cookie
		ct_dispatcher.configName = ct_dispatcher.readCookie(ct_dispatcher.cookieName);
	}

	
}

	if (typeof (ClickTaleCreateDOMElement) != "function")
{
	ClickTaleCreateDOMElement = function(tagName)
	{
		if (document.createElementNS)
		{
			return document.createElementNS('http://www.w3.org/1999/xhtml', tagName);
		}
		return document.createElement(tagName);
	}
}

if (typeof (ClickTaleAppendInHead) != "function")
{
	ClickTaleAppendInHead = function(element)
	{
		var parent = document.getElementsByTagName('head').item(0) || document.documentElement;
		parent.appendChild(element);
	}
}

if (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != "function")
{
	ClickTaleXHTMLCompliantScriptTagCreate = function(code)
	{
		var script = ClickTaleCreateDOMElement('script');
		script.setAttribute("type", "text/javascript");
		script.text = code;
		return script;
	}
}	
		var configFoundPTC = false;
	
if (ct_dispatcher.configName == 'Default')
{
	configFoundPTC = true;
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2014 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 9593\r\n\/\/ WR destination: www09\r\n\/\/ WR version: 14.17\r\n\/\/ Recording ratio: 0.05\r\n\/\/ Generated on: 11\/26\/2014 9:41:10 AM (UTC 11\/26\/2014 3:41:10 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = true;\r\nif (typeof (ClickTaleCreateDOMElement) != \"function\")\r\n{\r\n\tClickTaleCreateDOMElement = function(tagName)\r\n\t{\r\n\t\tif (document.createElementNS)\r\n\t\t{\r\n\t\t\treturn document.createElementNS(\u0027http:\/\/www.w3.org\/1999\/xhtml\u0027, tagName);\r\n\t\t}\r\n\t\treturn document.createElement(tagName);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleAppendInHead) != \"function\")\r\n{\r\n\tClickTaleAppendInHead = function(element)\r\n\t{\r\n\t\tvar parent = document.getElementsByTagName(\u0027head\u0027).item(0) || document.documentElement;\r\n\t\tparent.appendChild(element);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != \"function\")\r\n{\r\n\tClickTaleXHTMLCompliantScriptTagCreate = function(code)\r\n\t{\r\n\t\tvar script = ClickTaleCreateDOMElement(\u0027script\u0027);\r\n\t\tscript.setAttribute(\"type\", \"text\/javascript\");\r\n\t\tscript.text = code;\r\n\t\treturn script;\r\n\t}\r\n}\t\r\n\r\nvar pccScriptElement = ClickTaleCreateDOMElement(\u0027script\u0027);\r\npccScriptElement.type = \"text\/javascript\";\r\npccScriptElement.src = (document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www09\/pcc\/07c607e8-a6a8-4852-9e56-e6fc5a2ecbe1.js?DeploymentConfigName=Default\u0026Version=1\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www09\/pcc\/07c607e8-a6a8-4852-9e56-e6fc5a2ecbe1.js?DeploymentConfigName=Default\u0026Version=1\u0027);\r\ndocument.body.appendChild(pccScriptElement);\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\n\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=9593, \r\n\t\tRatio=0.05, \r\n\t\tPartitionPrefix=\"www09\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tif (typeof ClickTaleSetAllSensitive == \u0027function\u0027) { ClickTaleSetAllSensitive(); }\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\twindow.ClickTaleIncludedOnDOMReady=true;\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\n(function() {\r\n\tvar div = ClickTaleCreateDOMElement(\"div\");\r\n\tdiv.id = \"ClickTaleDiv\";\r\n\tdiv.style.display = \"none\";\r\n\tdocument.body.appendChild(div);\r\n\r\n\tvar externalScript = ClickTaleCreateDOMElement(\"script\");\r\n\tvar src = document.location.protocol==\u0027https:\u0027?\r\n\t  \u0027https:\/\/cdnssl.clicktale.net\/www\/tc\/WRe17.js\u0027:\r\n\t  \u0027http:\/\/cdn.clicktale.net\/www\/tc\/WRe17.js\u0027;\r\n\texternalScript.src = (window.ClickTaleCDNHTTPSRewrite?ClickTaleCDNHTTPSRewrite(src):src);\r\n\texternalScript.type = \u0027text\/javascript\u0027;\r\n\tdocument.body.appendChild(externalScript);\r\n})();\r\n\r\n\r\n\r\n");
	document.body.appendChild(script);	})();
	}
			
	
if (ct_dispatcher.configName == 'dev_NMC-25')
{
	configFoundPTC = true;
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2014 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 9593\r\n\/\/ WR destination: www09\r\n\/\/ WR version: 14.17\r\n\/\/ Recording ratio: 0.05\r\n\/\/ Generated on: 11\/26\/2014 9:41:10 AM (UTC 11\/26\/2014 3:41:10 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = true;\r\nif (typeof (ClickTaleCreateDOMElement) != \"function\")\r\n{\r\n\tClickTaleCreateDOMElement = function(tagName)\r\n\t{\r\n\t\tif (document.createElementNS)\r\n\t\t{\r\n\t\t\treturn document.createElementNS(\u0027http:\/\/www.w3.org\/1999\/xhtml\u0027, tagName);\r\n\t\t}\r\n\t\treturn document.createElement(tagName);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleAppendInHead) != \"function\")\r\n{\r\n\tClickTaleAppendInHead = function(element)\r\n\t{\r\n\t\tvar parent = document.getElementsByTagName(\u0027head\u0027).item(0) || document.documentElement;\r\n\t\tparent.appendChild(element);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != \"function\")\r\n{\r\n\tClickTaleXHTMLCompliantScriptTagCreate = function(code)\r\n\t{\r\n\t\tvar script = ClickTaleCreateDOMElement(\u0027script\u0027);\r\n\t\tscript.setAttribute(\"type\", \"text\/javascript\");\r\n\t\tscript.text = code;\r\n\t\treturn script;\r\n\t}\r\n}\t\r\n\r\nvar pccScriptElement = ClickTaleCreateDOMElement(\u0027script\u0027);\r\npccScriptElement.type = \"text\/javascript\";\r\npccScriptElement.src = (document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www09\/pcc\/07c607e8-a6a8-4852-9e56-e6fc5a2ecbe1.js?DeploymentConfigName=dev_NMC-25\u0026Version=1\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www09\/pcc\/07c607e8-a6a8-4852-9e56-e6fc5a2ecbe1.js?DeploymentConfigName=dev_NMC-25\u0026Version=1\u0027);\r\ndocument.body.appendChild(pccScriptElement);\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\nwindow.ClickTaleIncludedOnWindowLoad = true;\r\n\r\nwindow.ClickTaleIncludedOnDOMReady = true;\r\nClickTaleSettings.Transport = {\r\n    Legacy: true\r\n};\r\n\/*window.ClickTaleSettings = {\r\n\tCheckAgentSupport: function (f, v) {\r\n\t\tif (v.m!=true) {  \r\n\t\t\treturn false;\r\n\t\t}\r\n\t\t\r\n\t\telse (v.m==true){\r\n\t\t\treturn f(v);\r\n\t\t}\r\n\t}\r\n}*\/\r\n\r\nClickTaleSettings.Compression = {\r\n    Method: function () { return \"deflate\"; }\r\n    \r\n};\r\nClickTaleSettings.RewriteRules = {\r\n    OnBeforeRewrite: function (rewriteApi) {\r\n        rewriteApi.add({\r\n            pattern: new RegExp(\u0027(\u003cinput[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*type=\"text\"\u003e)\u0027, \u0027gim\u0027),\r\n            replace: \"$1-----$3\"\r\n        });\r\n        rewriteApi.add({\r\n            pattern: new RegExp(\u0027(\u003cinput[^\u003e]*type=\"text\"[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n            replace: \"$1-----$3\"\r\n        });\r\n    }\r\n}\r\nClickTaleSettings.ctIsTrans = true;\r\n\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=9593, \r\n\t\tRatio=0.05, \r\n\t\tPartitionPrefix=\"www09\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tif (typeof ClickTaleSetAllSensitive == \u0027function\u0027) {\r\n    ClickTaleSetAllSensitive();\r\n}\r\n\r\nvar ct_UA = ClickTaleDetectAgent();\r\n\r\nif (ct_UA.m != true || (ct_UA.t != ct_UA.Ch \u0026\u0026  ct_UA.t != ct_UA.Sa)){\r\n    return;\r\n}\r\n\r\nif (typeof ClickTaleUploadPage === \u0027function\u0027 \u0026\u0026 ClickTaleSettings.ctIsTrans) {\r\n\t\r\n\tvar ct_tag = \"\";\r\n\tif(document.doctype != null){\r\n\t\t\tct_tag = \"\u003c!DOCTYPE \" + document.doctype.name;\r\n\t\t\tct_tag += (document.doctype.publicId \u0026\u0026 document.doctype.publicId!=\"\")? \" PUBLIC \\\"\" + document.doctype.publicId + \"\\\"\" : \"\";\r\n\t\t\tct_tag += (document.doctype.systemId \u0026\u0026 document.doctype.systemId!=\"\")? \" \\\"\" + document.doctype.systemId + \"\\\"\" : \"\";\r\n\t\t\tct_tag += \"\u003e\";\r\n\t}\r\n\t\t\r\n\tClickTaleUploadPage(ct_tag + window.document.getElementsByTagName(\"html\")[0].outerHTML.split(\/\u003chead\/i)[0], \u0027\u003c\/html\u003e\u0027);  \r\n\t\r\n\t\r\n   \r\n}\r\n\r\nif (typeof ClickTaleEvent == \u0027function\u0027 \u0026\u0026 window.tntExperiences) {\r\n    ClickTaleEvent(window.tntExperiences);\r\n}\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\twindow.ClickTaleIncludedOnDOMReady=true;\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\n(function() {\r\n\tvar div = ClickTaleCreateDOMElement(\"div\");\r\n\tdiv.id = \"ClickTaleDiv\";\r\n\tdiv.style.display = \"none\";\r\n\tdocument.body.appendChild(div);\r\n\r\n\tvar externalScript = ClickTaleCreateDOMElement(\"script\");\r\n\tvar src = document.location.protocol==\u0027https:\u0027?\r\n\t  \u0027https:\/\/cdnssl.clicktale.net\/www\/tc\/WRe17.js\u0027:\r\n\t  \u0027http:\/\/cdn.clicktale.net\/www\/tc\/WRe17.js\u0027;\r\n\texternalScript.src = (window.ClickTaleCDNHTTPSRewrite?ClickTaleCDNHTTPSRewrite(src):src);\r\n\texternalScript.type = \u0027text\/javascript\u0027;\r\n\tdocument.body.appendChild(externalScript);\r\n})();\r\n\r\n\r\n\r\n");
	document.body.appendChild(script);	})();
	}
			
	

	// Default configuration
if (!configFoundPTC)
{
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2014 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 9593\r\n\/\/ WR destination: www09\r\n\/\/ WR version: 14.18\r\n\/\/ Recording ratio: 0.0025\r\n\/\/ Generated on: 11\/26\/2014 9:41:10 AM (UTC 11\/26\/2014 3:41:10 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = true;\r\nif (typeof (ClickTaleCreateDOMElement) != \"function\")\r\n{\r\n\tClickTaleCreateDOMElement = function(tagName)\r\n\t{\r\n\t\tif (document.createElementNS)\r\n\t\t{\r\n\t\t\treturn document.createElementNS(\u0027http:\/\/www.w3.org\/1999\/xhtml\u0027, tagName);\r\n\t\t}\r\n\t\treturn document.createElement(tagName);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleAppendInHead) != \"function\")\r\n{\r\n\tClickTaleAppendInHead = function(element)\r\n\t{\r\n\t\tvar parent = document.getElementsByTagName(\u0027head\u0027).item(0) || document.documentElement;\r\n\t\tparent.appendChild(element);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != \"function\")\r\n{\r\n\tClickTaleXHTMLCompliantScriptTagCreate = function(code)\r\n\t{\r\n\t\tvar script = ClickTaleCreateDOMElement(\u0027script\u0027);\r\n\t\tscript.setAttribute(\"type\", \"text\/javascript\");\r\n\t\tscript.text = code;\r\n\t\treturn script;\r\n\t}\r\n}\t\r\n\r\nvar pccScriptElement = ClickTaleCreateDOMElement(\u0027script\u0027);\r\npccScriptElement.type = \"text\/javascript\";\r\npccScriptElement.src = (document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www09\/pcc\/07c607e8-a6a8-4852-9e56-e6fc5a2ecbe1.js?DeploymentConfigName=Release_28102014\u0026Version=15\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www09\/pcc\/07c607e8-a6a8-4852-9e56-e6fc5a2ecbe1.js?DeploymentConfigName=Release_28102014\u0026Version=15\u0027);\r\ndocument.body.appendChild(pccScriptElement);\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\nwindow.ClickTaleIncludedOnWindowLoad = true;\r\n\r\nwindow.ClickTaleIncludedOnDOMReady = true;\r\nClickTaleSettings.Transport = {\r\n    Legacy: false\r\n};\r\n\/*window.ClickTaleSettings = {\r\n\tCheckAgentSupport: function (f, v) {\r\n\t\tif (v.m!=true) {  \r\n\t\t\treturn false;\r\n\t\t}\r\n\t\t\r\n\t\telse (v.m==true){\r\n\t\t\treturn f(v);\r\n\t\t}\r\n\t}\r\n}*\/\r\n\r\nClickTaleSettings.Compression = {\r\n    Method: function () { return \"deflate\"; }\r\n};\r\nClickTaleSettings.RewriteRules = {\r\n    OnBeforeRewrite: function (rewriteApi) {\r\n        rewriteApi.add({\r\n            pattern: new RegExp(\u0027(\u003cinput[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*type=\"text\"\u003e)\u0027, \u0027gim\u0027),\r\n            replace: \"$1-----$3\"\r\n        });\r\n        rewriteApi.add({\r\n            pattern: new RegExp(\u0027(\u003cinput[^\u003e]*type=\"text\"[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n            replace: \"$1-----$3\"\r\n        });\r\n    }\r\n}\r\n\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=9593, \r\n\t\tRatio=0.0025, \r\n\t\tPartitionPrefix=\"www09\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tif (typeof ClickTaleSetAllSensitive == \u0027function\u0027) {\r\n    ClickTaleSetAllSensitive();\r\n}\r\n\r\nvar ct_UA = ClickTaleDetectAgent();\r\n\r\nif (ct_UA.m != true || (ct_UA.t != ct_UA.Ch \u0026\u0026  ct_UA.t != ct_UA.Sa)){\r\n    return;\r\n}\r\n\r\nif (typeof ClickTaleUploadPage === \u0027function\u0027) {\r\n    ClickTaleUploadPage();\r\n}\r\n\r\nif (typeof ClickTaleEvent == \u0027function\u0027 \u0026\u0026 window.tntExperiences) {\r\n    ClickTaleEvent(window.tntExperiences);\r\n}\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\twindow.ClickTaleIncludedOnDOMReady=true;\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\n(function() {\r\n\tvar div = ClickTaleCreateDOMElement(\"div\");\r\n\tdiv.id = \"ClickTaleDiv\";\r\n\tdiv.style.display = \"none\";\r\n\tdocument.body.appendChild(div);\r\n\r\n\tvar externalScript = ClickTaleCreateDOMElement(\"script\");\r\n\tvar src = document.location.protocol==\u0027https:\u0027?\r\n\t  \u0027https:\/\/cdnssl.clicktale.net\/www\/tc\/WRe18.js\u0027:\r\n\t  \u0027http:\/\/cdn.clicktale.net\/www\/tc\/WRe18.js\u0027;\r\n\texternalScript.src = (window.ClickTaleCDNHTTPSRewrite?ClickTaleCDNHTTPSRewrite(src):src);\r\n\texternalScript.type = \u0027text\/javascript\u0027;\r\n\tdocument.body.appendChild(externalScript);\r\n})();\r\n\r\n\r\n\r\n");
	document.body.appendChild(script);	})();
	}

