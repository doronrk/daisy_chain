(function () {
    var ths = this;
    var url = location.href;
    var TMWidget = function () {

        this.InitWidget = function (SurveyID, Server, Width, Height, UserId, CookieUsage) {
            var piwikuserid;
            if (typeof (Lead) == "undefined") {
                piwikuserid = "0";
            }
            else {
                piwikuserid = Lead.getVisitorId();
            }
            if (typeof (UserId) == "undefined") {
                UserId = "0";
            }

            if (typeof (CookieUsage) == "undefined") {
                CookieUsage = "true";
            }
            var src = location.protocol + "//" + Server + "/tmsubscribe.net/WidgetPreview.aspx?sid=" + SurveyID + "&servername=" + Server + "&piwikuserid=" + piwikuserid + "&UserId=" + UserId + "&url=" + encodeURIComponent(url) + "&ck=" + CookieUsage;
            var ht;
            var wd;
            if (isNaN(Width)) {
                wd = Width;
            }
            else {
                wd = (parseInt(Width) + 40).toString();
            }
            if (isNaN(Height)) {
                ht = Height;
            }
            else {
                ht = (parseInt(Height) + 30).toString();
            }

            var element = '<iframe src="' + src + '" width="' + wd + '" height="' + ht + '" style="border:0px;" id="tmwidget" frameBorder="0"></iframe>';
            document.write(element);
            return this;
        };
    };
    TMSignUpWidget = new TMWidget();

})();


