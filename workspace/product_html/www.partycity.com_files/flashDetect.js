var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var flashDescription;

//
// This will likely fail on versions before flash 6, but since we don't 
// support versions before 6.0r65 it is ok.
//
function isFlashCurrent(versionMajorReq, versionMinorReq, versionRevisionReq) {
    var versionMajor;
    var versionMinor;
    var versionRevision;

    // NS/Opera version >= 3 check for Flash plugin in plugin array
    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash"]) {
            // parse the description to get the version
            flashDescription = navigator.plugins["Shockwave Flash"].description;
            var descArray = flashDescription.split(" ");
            var tempArrayMajor = descArray[2].split(".");
            versionMajor = tempArrayMajor[0];
            versionMinor = tempArrayMajor[1];
            if (descArray[3] != "") {
                tempArrayMinor = descArray[3].split("r");
            } else {
                tempArrayMinor = descArray[4].split("r");
            }
            versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;

        }
    } else if (isIE && isWin && !isOpera) {
        try {
            var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + versionMajorReq);

            // GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
            // so be careful.  Of course we don't run those versions.
            axo.AllowScriptAccess = "always";
            // required for v6.x?
            var version = axo.GetVariable("$version");
            // safe to call for 6.0r47 or greater
            flashDescription = version;

            // parse the version data
            tempArray = version.split(" ");
            // ["WIN", "2,0,0,11"]
            tempString = tempArray[1];
            // "2,0,0,11"
            versionArray = tempString.split(",");
            // ['2', '0', '0', '11']

            versionMajor = versionArray[0];
            versionMinor = versionArray[1];
            versionRevision = versionArray[2];
            // should be 3???
        } catch (e) {
        }
    }

    // test version
    if (versionMajor > versionMajorReq) {
        return true;
    }
    if (versionMajor == versionMajorReq
            && versionMinor > versionMinorReq) {
        return true;
    }
    if (versionMajor == versionMajorReq
            && versionMinor == versionMinorReq
            && versionRevision >= versionRevisionReq) {
        return true;
    }
    return false;
}

