
		window.onerror=wErrorHandler; var olcWin; var olcWinStatus="", olcErr="";
		var lastS7olcid = unescape(getLastS7olcidCookieValue()); if (lastS7olcid == "") {
			lastS7olcid = ssLastS7olcid; setLastS7olcidCookieValue();}
		function setLastS7olcidCookieValue() {
			document.cookie = "lastS7olcid=" + escape(lastS7olcid);}
		function getLastS7olcidCookieValue() {var cookieName = "lastS7olcid"; var cookieValue = "";
			var cookiesList = document.cookie; var cookieArray = cookiesList.split(";");
			var cookieCnt = 0; var nameFound = false;
			while ((cookieCnt < cookieArray.length) && (nameFound == false)) {
				var nvPair = cookieArray[cookieCnt];
				if (nvPair.indexOf(cookieName + "=") >= 0) {
					while (nvPair.substr(0,1) == " ") nvPair = nvPair.substr(1);
					if (nvPair.indexOf(cookieName + "=") == 0) {nameFound = true;
						cookieValue = nvPair.substring(cookieName.length + 1, nvPair.length);}}
				cookieCnt += 1;}
			return cookieValue;
		}
		function wErrorHandler() {olcErr = "Y"; return true;}
		function checkOlcWindow(s7olcid) {
			if (olcWinStatus == "wasOpen") olcWin.focus(); else openOlcWindow('init',s7olcid);
		}
		function openOlcWindow(mode,s7olcid) {var olcUrlParam = "";
			if (s7olcid != "") {lastS7olcid = unescape(getLastS7olcidCookieValue());				if (s7olcid != lastS7olcid) {mode = "init"; lastS7olcid = s7olcid;
					setLastS7olcidCookieValue();}
				olcUrlParam = "?s7olcid=" + s7olcid;}
			var winW = 1075, winH = 735; var winX = 0, winY = 0;
			var outerWinW = winW - 12, outerWinH = winH - 31;
			var scrW = screen.width - 20; var scrH = screen.height - 20;
			if (scrW > outerWinW) winX = (scrW-outerWinW)/2; if (scrH > outerWinH) winY = (scrH-outerWinH)/2;
			var winParams = "width=" + winW + ",height=" + winH + ",screenX=" + winX;
			winParams += ",screenY=" + winY + ",left=" + winX + ",top=" + winY + ",scrollbars=0";
			winParams += ",toolbar=No,location=0,resizable=Yes,menubar=no,status=no";
			var olcUrl = ""; if (mode == "init") olcUrl = olcUrlBase + olcUrlParam;
			olcWin = window.open(olcUrl,"viewCatalog",winParams); olcErr = "";
			if (mode == "init") olcWin.focus();
			else {var timeoutId = setTimeout("checkOlcWindow('" + s7olcid + "');",500);
				olcWinStatus="wasNotOpen"; if (olcWin.isOlcWindowOpen) {olcWinStatus="wasOpen";}}
		}
