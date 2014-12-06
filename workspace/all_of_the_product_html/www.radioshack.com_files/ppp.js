/*** Copyright (C) 2000-2014 by Webcollage Inc. All rights reserved. ***/
/*** Protected by US Patent 6,865,593 and pending patent applications ***/

_wcmissingcontent = {
  enableReportingToDsplyDotCom: true,
  onAcsSiteLoad: function() {
    window.Webcollage.overrides.noPowerPageContentCallback();
  }
};

window.Webcollage.terminatePowerPage = function () {
    try {
        var loadContentScript = document.getElementById("wcpp-load-content");
        loadContentScript.parentNode.removeChild(loadContentScript);

        window.Webcollage.terminatePowerPage = undefined;
        window.Webcollage.initPowerPage = undefined;
        window.Webcollage.playPowerPage = undefined;
        window.Webcollage.stopPowerPage = undefined;
        window.Webcollage.checkContentPlayStop = undefined;
        window._wcmissingcontent = undefined;
        try {
          delete window.Webcollage.terminatePowerPage;
          delete window.Webcollage.initPowerPage;
          delete window.Webcollage.playPowerPage;
          delete window.Webcollage.stopPowerPage;
          delete window.Webcollage.checkContentPlayStop;
          delete window._wcmissingcontent;
        } catch (e){};
    } catch(e){}
};
window.Webcollage.initPowerPage = window.Webcollage.playPowerPage = window.Webcollage.stopPowerPage = window.Webcollage.checkContentPlayStop = function(){};


if(_wcmissingcontent.enableReportingToDsplyDotCom && window.Webcollage && typeof window.Webcollage.reportPageView == "function") {
  window.Webcollage.reportPageView();
}

