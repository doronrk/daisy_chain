var CelebrosAnalyticsXmlHttp = null;
function anlxCallback(){return true;}
var CelebrosAnalytics = function () {
    function createCookie(name, value, Minutes) {
        if (Minutes) {
            var date = new Date();
            date.setTime(date.getTime() + (Minutes * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                var CookieValue = c.substring(nameEQ.length, c.length);
                createCookie(name, CookieValue, 30);
                return CookieValue;
            }
        }
        return null;
    };

    function eraseCookie(name) {
        createCookie(name, "", -10);
    };

    function addScript(scriptUrl) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('language', 'javascript');
        script.setAttribute('src', scriptUrl);
        document.documentElement.firstChild.appendChild(script);
    };

    function XMLHttpInit() {
        if (window.XMLHttpRequest) { // Non-IE browsers 
            CelebrosAnalyticsXmlHttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 
            CelebrosAnalyticsXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (CelebrosAnalyticsXmlHttp == null)
            return false;
        else
            return true;
    };

    function AjaxSendBanData(ajaxCommand, callData) {
        if (XMLHttpInit()) {
            if ("withCredentials" in CelebrosAnalyticsXmlHttp) {
                CelebrosAnalyticsXmlHttp.open("GET", ajaxCommand, true);
            } else if (typeof XDomainRequest != "undefined") {
                CelebrosAnalyticsXmlHttp = new XDomainRequest();
                CelebrosAnalyticsXmlHttp.open("GET", ajaxCommand);
            }
            CelebrosAnalyticsXmlHttp.send(null);
        }
    };

    function AddComment(CommentMsg) {
        var CommentDiv = document.getElementById('CelebrosAnalyticsCommentDiv');
        if (CommentDiv == null) {
            CommentDiv = document.createElement('div');
            CommentDiv.setAttribute('style', 'display:none');
            CommentDiv.setAttribute('id', 'CelebrosAnalyticsCommentDiv');
            document.body.appendChild(CommentDiv);
        }
        var br = document.createElement('br');
        CommentDiv.appendChild(br);
        var commentnode = document.createTextNode(CommentMsg)
        CommentDiv.appendChild(commentnode);
    };

    _public =
    {
        ShowComments: false,
        UseWebSessionId: false,
        dopost: false,
        customerid: '',
        pagereferrer: '',
        qwisersearchsessionid: '',
        websessionid: '',
        qwisersearchloghandle: '',
        issecured: false,
        datacollector: '',
        userid: '',
        productsku: '',
        productname: '',
        productprice: '',
        productvariant: '',
        productcategory: '',
        datacollector: '',
        userid: '',
        AI_LogSearchResult: function () {

            if (this.customerid == '') {
                if (this.ShowComments)
                    AddComment('missing customerid');
                return;
            }

            if (this.qwisersearchsessionid == '') {
                if (this.ShowComments)
                    AddComment('missing qwisersearchsessionid');
                return;
            }

            if (this.qwisersearchloghandle == '') {
                if (this.ShowComments)
                    AddComment('missing qwisersearchloghandle');
                return;
            }

            var params = "&cid=" + this.customerid;
            params += "&src=" + encodeURIComponent(window.location);
            params += "&ref=" + this.pagereferrer;
            params += "&ssid=" + this.qwisersearchsessionid;
            params += "&wsid=" + this.websessionid;
            params += "&lh=" + this.qwisersearchloghandle;

            createCookie("qwisersearchsessionid", this.websessionid + "==>" + this.qwisersearchsessionid, 30);

            if (this.datacollector != undefined) {
                params += "&dc=" + this.datacollector;
            }
            if (this.userid != undefined) {
                params += "&userid=" + this.userid;
            }

            var URL = 'http';

            if (this.issecured != undefined && this.issecured) {
                URL += 's://ai.celebros-analytics.com/AIWriter/WriteLog.ashx?type=SR&responseType=JSON' + params;
            }
            else {
                URL += '://ai.celebros-analytics.com/AIWriter/WriteLog.ashx?type=SR&responseType=JSON' + params;
            }

            if (this.dopost) {
                AjaxSendBanData(URL);
            }
            else {
                addScript(URL);
            }

            return URL;
        },
        AI_LogProduct: function () {

            var qwisersearchsessionid = readCookie("qwisersearchsessionid");
            if (qwisersearchsessionid == null) {
                return;
            }
            else {
                var vars = qwisersearchsessionid.split("==>");
                if (vars.length == 2) {
                    if (vars[0] != this.websessionid) {
                	if (this.ShowComments)
                        	AddComment('Web Session Id mismatch');
                        if(this.UseWebSessionId)
                        {
                            return;
                        }
                        else {
                            this.qwisersearchsessionid = vars[1];
                        }
                    }
                    else {
                        this.qwisersearchsessionid = vars[1];
                    }
                }
                else if (vars[0] != "") {
                    this.qwisersearchsessionid = vars[0];
                }
                else {
                    if (this.ShowComments)
                        	AddComment('Cookie does not have Web Session Id or format is wrong');
                    return;
                }
            }

            if (this.customerid == '') {
                if (this.ShowComments)
                    AddComment('missing customerid');
                return;
            }

            if (this.productsku == '') {
                if (this.ShowComments)
                    AddComment('missing productsku');
                return;
            }

            if (this.productname == '') {
                if (this.ShowComments)
                    AddComment('missing productname');
                return;
            }

            if (this.productprice == '') {
                if (this.ShowComments)
                    AddComment('missing productprice');
                return;
            }

            var params = "&cid=" + this.customerid;
            params += "&src=" + encodeURIComponent(window.location);
            params += "&ref=" + this.pagereferrer;
            params += "&ssid=" + this.qwisersearchsessionid;
            params += "&wsid=" + this.websessionid;
            params += "&sku=" + this.productsku;
            params += "&name=" + this.productname;
            params += "&price=" + this.productprice;

            if (this.qwisersearchloghandle != undefined) {
                params += "&lh=" + this.qwisersearchloghandle;
            }
            if (this.productvariant != undefined) {
                params += "&variant=" + this.productvariant;
            }
            if (this.productcategory != undefined) {
                params += "&category=" + this.productcategory;
            }
            if (this.datacollector != undefined) {
                params += "&dc=" + this.datacollector;
            }
            if (this.userid != undefined) {
                params += "&userid=" + this.userid;
            }

            var URL = 'http';

            if (this.issecured != undefined && this.issecured) {
                URL += 's://ai.celebros-analytics.com/AIWriter/WriteLog.ashx?type=PD&responseType=JSON' + params;
            }
            else {
                URL += '://ai.celebros-analytics.com/AIWriter/WriteLog.ashx?type=PD&responseType=JSON' + params;
            }


            if (this.dopost) {
                AjaxSendBanData(URL);
            }
            else {
                addScript(URL);
            }

            return URL;
        }
    };
    return _public;

} ();

var CelebrosFloatPanel = function () {
    var DivSearchControlId = '';
    var DivSearchControl;
    var offsetTop;
    var offsetLeft;
    var CallFromOnLoad = false;
    var DivSearchControlClasses = '';
    var DivSearchControlStyle = '';

 
    if(window.addEventListener){
        window.addEventListener('scroll', onScrollEventHandler, false);   
        window.addEventListener('load', onLoadEventHandler, false);   
    }
    else if (window.attachEvent){
        window.attachEvent('onscroll', onScrollEventHandler); 
        window.attachEvent('onload', onLoadEventHandler);   
    }


    function onScrollEventHandler() {
        if (DivSearchControlId == '')
            return;
        var scrollpos = getScrollingPosition();
        if (scrollpos[1] > offsetTop) {
            DivSearchControl.className = DivSearchControlClasses + " FloatDiv";
            DivSearchControl.style.left = offsetLeft + 'px';
        }
        else {
            DivSearchControl.className = DivSearchControlClasses;
            DivSearchControl.setAttribute('style', DivSearchControlStyle);
        }
    };

    function onLoadEventHandler() {
        if (DivSearchControlId == '' || CallFromOnLoad)
            return;
        init();
    };

    function init() {
        DivSearchControl = document.getElementById(DivSearchControlId);
        if (DivSearchControl == null)
            return;
        offsetTop = DivSearchControl.offsetTop;
        offsetLeft = DivSearchControl.offsetLeft;
        DivSearchControlClasses = DivSearchControl.className;
        if (DivSearchControlClasses == null)
            DivSearchControlClasses == '';
        DivSearchControlStyle = DivSearchControl.getAttribute('style');
        if (DivSearchControlStyle == null)
            DivSearchControlStyle == '';
    };

    function getOffset(el) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

    function getScrollingPosition() {
        var position = [0, 0];
        if (typeof window.pageYOffset != 'undefined') {
            position = [
            window.pageXOffset,
            window.pageYOffset
            ];
        }
        else if (typeof document.documentElement.scrollTop
!= 'undefined' && document.documentElement.scrollTop > 0) {
            position = [
            document.documentElement.scrollLeft,
            document.documentElement.scrollTop
            ];
        }
        else if (typeof document.body.scrollTop != 'undefined') {
            position = [
            document.body.scrollLeft,
            document.body.scrollTop
            ];
        }
        return position;
    };
    function AddComment(CommentMsg) {
        var CommentDiv = document.getElementById('CelebrosFloatPanelCommentDiv');
        if (CommentDiv == null) {
            CommentDiv = document.createElement('div');
            CommentDiv.setAttribute('style', 'display:none');
            CommentDiv.setAttribute('id', 'CelebrosFloatPanelCommentDiv');
            document.body.appendChild(CommentDiv);
        }
        var br = document.createElement('br');
        CommentDiv.appendChild(br);
        var commentnode = document.createTextNode(CommentMsg)
        CommentDiv.appendChild(commentnode);
    };

    _public =
    {
        ShowComments: false,
        FloatingDivId: '',
        CallingFromOnLoad: false,
        Initlize: function () {
            if (this.FloatingDivId == '') {
                if (this.ShowComments)
                    AddComment('missing FloatingDivId');
                return;
            }

            DivSearchControlId = this.FloatingDivId;
            if (this.CallingFromOnLoad) {
                init();
            }
        }
    };
    return _public;
} ();

