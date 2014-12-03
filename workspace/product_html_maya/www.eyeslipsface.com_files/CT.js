function CT_EventTracking(ConvID, ConvAmt, cdEventParam, cdCookie) {
    var cdeventid; if (isEmpty(EventId)) { cdeventid = cdEventParam; } else { cdeventid = EventId; }
    var Referrer = ""; try { Referrer = document.referrer; } catch (Referrer) { Referrer = "Undefined Referrer"; }
    if (Referrer.substr(1, 8) == "file://") { return false; }
    var URL = document.URL; var EntryUrl = URL; var PageTitle = document.title; try {PageTitle = PageTitle.replace(/</g, "").replace(/>/g, ""); } catch (cttitleerror) { } var Resolution = screen.width + 'x' + screen.height; var Browser = navigator.appName;
    var CampaignID = null; var SearchTerm = null; var CreativeID = null; var AdgroupId = null; var MatchType = null; var ctTestID = null; var ctPlmnt = null; var ctVTInfo = null; var FirstHit = null; var CookieCreatedDate = null; var CookieId = null; var ConvType = 1; var ctAdPos = null;var ctparam1 = null;var ctparam2 = null;
    if ((ConvID == "ConversionId") || (isEmpty(ConvID))) { ConvID = ""; }
    var querystring = ""; try { querystring = document.location.search; } catch (querystring) { querystring = ""; }
    if (querystring) { if (querystring.length > 0) { CampaignID = GetParamFromUrl(querystring, "ctcampaign"); SearchTerm = GetParamFromUrl(querystring, "ctkwd"); CreativeID = GetParamFromUrl(querystring, "ctcreative"); AdgroupId = GetParamFromUrl(querystring, "ctadgroup"); MatchType = GetParamFromUrl(querystring, "ctmatch"); ctTestID = GetParamFromUrl(querystring, "TestId"); ctPlmnt = GetParamFromUrl(querystring, "ctplacement"); ctAdPos = GetParamFromUrl(querystring, "ctadpos"); ctparam1 = GetParamFromUrl(querystring, "ctparam1"); ctparam2 = GetParamFromUrl(querystring, "ctparam2"); } }
    var CampaignCookie = new CookieObject("CT_CID"); var KeytermCookie = new CookieObject("CT_KWD"); var ReferrerCookie = new CookieObject("CT_REF"); var CreativeCookie = new CookieObject("CT_AD"); var AdGroupCookie = new CookieObject("CT_ADGROUP"); var MatchTypeCookie = new CookieObject("CT_MATCH"); var AssistCampaignCookie = new CookieObject("CT_Assist_CID"); var AssistKeytermCookie = new CookieObject("CT_Assist_KWD"); var AssistMatchCookie = new CookieObject("CT_Assist_MATCH"); var AssistCreativeCookie = new CookieObject("CT_Assist_AD"); var EntryUrlCookie = new CookieObject("CT_ENTRYURL"); var Param1Cookie = new CookieObject("CT_Param1"); var Param2Cookie = new CookieObject("CT_Param2");
    var TypeCookie = new CookieObject("CT_Type"); var CreatedDateCookie = new CookieObject("CT_CrtDate"); var UIDCookie = new CookieObject("CT_UID"); var TestIdCookie = new CookieObject("CT_TestId"); var PlacementCookie = new CookieObject("CT_Plmnt"); var VtInfoCookie = new CookieObject("CT_VTInfo"); var AdPosCookie = new CookieObject("CT_AdPos"); ctVTInfo = VtInfoCookie.GetValue(); var AssistKwd = KeytermCookie.GetValue(); var AssistCampaign = CampaignCookie.GetValue(); var AssistMatch = MatchTypeCookie.GetValue(); var AssistCreative = CreativeCookie.GetValue();
    var CookieDataString = CampaignCookie.GetValue() + KeytermCookie.GetValue() + CreativeCookie.GetValue();
    if (isEmpty(SearchTerm)) { SearchTerm = ""; } if (isEmpty(CreativeID)) { CreativeID = ""; } if (isEmpty(CampaignID)) { CampaignID = ""; }
    var QueryDataString = CampaignID + SearchTerm + CreativeID;
    try {
        QueryDataString = QueryDataString.replace("+", " ").replace("%20", " ");
        CookieDataString = CookieDataString.replace("+", " ").replace("%20", " ");
    } catch (ctreplacerr) { }
    if (isEmpty(AdgroupId)) { AdgroupId = ""; } if (isEmpty(MatchType)) { MatchType = ""; } if (isEmpty(ctTestID)) { ctTestID = 0; } if (isEmpty(ctPlmnt)) { ctPlmnt = ""; } if (isEmpty(ctAdPos)) { ctAdPos = ""; } if (isEmpty(ctparam1)) { ctparam1 = ""; } if (isEmpty(ctparam2)) { ctparam2 = ""; }
    if (!isEmpty(CampaignID) && (CookieDataString != QueryDataString)) { FirstHit = true; }
    else {
        var CookieValueCampaign = CampaignCookie.GetValue(); var CookieValueTerm = KeytermCookie.GetValue(); var CookieValueCreative = CreativeCookie.GetValue(); var CookieValueAdgroup = AdGroupCookie.GetValue(); var CookieValueMatchType = MatchTypeCookie.GetValue(); var CookieTypeValue = TypeCookie.GetValue(); var CookieTestIdValue = TestIdCookie.GetValue(); var CookiePlacementValue = PlacementCookie.GetValue(); var CookieAdPosValue = AdPosCookie.GetValue(); var CookieParam1Value = Param1Cookie.GetValue(); var CookieParam2Value = Param2Cookie.GetValue();
        if (isEmpty(CookieValueCampaign)) { CampaignID = "DIRECT"; SearchTerm = ""; CreativeID = ""; AdgroupId = ""; MatchType = ""; ctTestID = 0; ctPlmnt = ""; ctAdPos = ""; ConvType = 1; FirstHit = true; }
        else { CampaignID = CookieValueCampaign; SearchTerm = CookieValueTerm; CreativeID = CookieValueCreative; AdgroupId = CookieValueAdgroup; MatchType = CookieValueMatchType; Referrer = ReferrerCookie.GetValue(); AssistKwd = CookieValueTerm; AssistCampaign = CookieValueCampaign; AssistMatch = CookieValueMatchType; AssistCreative = CookieValueCreative; ConvType = CookieTypeValue; ctTestID = CookieTestIdValue; ctPlmnt = CookiePlacementValue; ctAdPos = CookieAdPosValue; ctparam1 = CookieParam1Value; ctparam2 = CookieParam2Value; FirstHit = false; } 
    }
    var DefaultCookieExp = 1440; //60 days
    if (!isEmpty(cdCookie) && IsNumeric(cdCookie)) { DefaultCookieExp = cdCookie; }
    var ClientDomain = document.domain; if (isEmpty(CookieDomain)) { CookieDomain = ClientDomain; }
    var CookiePath = "/"; var ExpDate = new Date(); ExpDate.setHours(ExpDate.getHours() + DefaultCookieExp);
    if ((AssistKwd != SearchTerm) && (!isEmpty(AssistKwd)) && (!isEmpty(SearchTerm))) { AssistCampaignCookie.SetValue(AssistCampaign, ExpDate, false, CookiePath, CookieDomain); AssistKeytermCookie.SetValue(AssistKwd, ExpDate, false, CookiePath, CookieDomain); AssistMatchCookie.SetValue(AssistMatch, ExpDate, false, CookiePath, CookieDomain); AssistCreativeCookie.SetValue(AssistCreative, ExpDate, false, CookiePath, CookieDomain); }
    else { AssistCampaign = AssistCampaignCookie.GetValue(); AssistKwd = AssistKeytermCookie.GetValue(); AssistMatch = AssistMatchCookie.GetValue(); AssistCreative = AssistCreativeCookie.GetValue(); }
    CampaignCookie.SetValue(CampaignID, ExpDate, false, CookiePath, CookieDomain); KeytermCookie.SetValue(SearchTerm, ExpDate, false, CookiePath, CookieDomain); CreativeCookie.SetValue(CreativeID, ExpDate, false, CookiePath, CookieDomain); AdGroupCookie.SetValue(AdgroupId, ExpDate, false, CookiePath, CookieDomain); MatchTypeCookie.SetValue(MatchType, ExpDate, false, CookiePath, CookieDomain); ReferrerCookie.SetValue(Referrer, ExpDate, false, CookiePath, CookieDomain); TestIdCookie.SetValue(ctTestID, ExpDate, false, CookiePath, CookieDomain); PlacementCookie.SetValue(ctPlmnt, ExpDate, false, CookiePath, CookieDomain); AdPosCookie.SetValue(ctAdPos, ExpDate, false, CookiePath, CookieDomain); Param1Cookie.SetValue(ctparam1, ExpDate, false, CookiePath, CookieDomain); Param2Cookie.SetValue(ctparam2, ExpDate, false, CookiePath, CookieDomain);
    if (CampaignID == "DIRECT") { CampaignID = null; } if (Referrer == "") { Referrer = "Blank Referrer"; }
    if (FirstHit == true) { EntryUrlCookie.SetValue(EntryUrl, ExpDate, false, CookiePath, CookieDomain); }
    if ((FirstHit == true) && (isEmpty(CookieDataString))) {
        var CurrentDate = new Date(); CreatedDateCookie.SetValue((CurrentDate.getMonth() + 1 + "/" + CurrentDate.getDate() + "/" + CurrentDate.getFullYear() + " " + CurrentDate.getHours() + ":" + CurrentDate.getMinutes() + ":" + CurrentDate.getSeconds()), ExpDate, false, CookiePath, CookieDomain); UIDCookie.SetValue(escape(GetRandom(Referrer + PageTitle + CurrentDate.getMilliseconds())), ExpDate, false, CookiePath, CookieDomain)
    }
    CookieCreatedDate = CreatedDateCookie.GetValue(); CookieId = UIDCookie.GetValue();
    var TrackPtcl = "https:"; try {var ctptcl = location.protocol; if (ctptcl == "http:") { TrackPtcl = "http:"; } else { TrackPtcl = "https:"; } } catch (ctptclerror) { TrackPtcl = "https:"; }
    var entryURL = EntryUrlCookie.GetValue(); var TrackURL = TrackPtcl + "//hits.convergetrack.com/default.aspx";
    if (isEmpty(ConvType) || isNaN(ConvType)) { TypeCookie.SetValue(1, ExpDate, false, CookiePath, CookieDomain); }
    else { TypeCookie.SetValue(ConvType, ExpDate, false, CookiePath, CookieDomain); }
    var TrackParams = "?ckid=" + escape(cdeventid) + "&caid=" + escape(CampaignID) + "&kwd=" + escape(SearchTerm) + "&amount=" + escape(String(ConvAmt)) + "&CType=" + escape(ConvType) + "&cvid=" + escape(ConvID) + "&rnd=" + escape(GetRandom(PageTitle)) + "&firsthit=" + escape(String(FirstHit)) + "&js=" + "true" + "&adid=" + escape(CreativeID) + "&eventurl=" + escape(URL) + "&entryURL=" + escape(entryURL) + "&CDate=" + escape(CookieCreatedDate) + "&CID=" + escape(CookieId) + "&mt=" + escape(MatchType) + "&testid=" + escape(ctTestID) + "&ctVTInfo=" + escape(ctVTInfo) + "&referrer=" + escape(Referrer) + "&ctplc=" + escape(ctPlmnt) + "&ctpos=" + escape(ctAdPos) + "&prm1=" + escape(ctparam1) + "&prm2=" + escape(ctparam2) + "&aCmp=" + escape(AssistCampaign) + "&aKwd=" + escape(AssistKwd) + "&aMT=" + escape(AssistMatch) + "&aAd=" + escape(AssistCreative) + "&title=" + escape(PageTitle) + "&res=" + escape(Resolution) + "&adgrp=" + escape(AdgroupId) + "&bws=" + escape(Browser);
    if (document.images) { var img = new Image(); img.src = TrackURL + TrackParams; } else { document.write('<img src="' + TrackURL + TrackParams + '" width="1" height="1">'); }
}
function CookieObject(cookiename) {
    this.Cookiename = cookiename; this.SetValue = function (value, expires, secure, path, domain) { if (path == null) path = "/"; document.cookie = escape(this.Cookiename) + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : ""); }
    this.GetValue = function () {
        var str = escape(cookiename) + "="; var strlen = str.length; var cookielen = document.cookie.length; var i = 0; var j;
        while (i < cookielen) { j = i + strlen; if (document.cookie.substring(i, j) == str) return getCookieVal(j); i = document.cookie.indexOf(" ", i) + 1; if (i == 0) break; } return '';
    }
    function getCookieVal(lastpos) { var str = document.cookie.indexOf(";", lastpos); if (str == -1) str = document.cookie.length; return unescape(document.cookie.substring(lastpos, str)); }
}
function GetParamFromUrl(querystring, name) { var i; var arr = querystring.substr(1).split("&"); for (i = 0; i < arr.length; i++) { if (arr[i].indexOf(name + "=") == 0) return this.unescape(arr[i].split("=")[1]); } return null; }
function isEmpty(strVal) { return (strVal == null || strVal == 'null' || strVal == ''); }
function GetRandom(str) { var buster; buster = new Date().valueOf() + Math.random() * 500; return buster; }