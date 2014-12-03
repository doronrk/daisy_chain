var servername = '';
var jsongeturl = '';
var jsonsaveresponseurl = '';
var getsurveytemplateurl = '';

//---------------------------------------------------------------------------------------------
var BuildDays = function () {
    var days = {};
    for (var i = 1; i < 32; i++) {
        days[i] = i;
    }
    return days;
};

var result = {};
var days = BuildDays();
var data;
var ParentElement;
//var LoadingMessage = "<b> Please wait....</b>";
var LoadingImageFile = "ajax-loader.gif";
var LoadingMessage = "";
var FirstErrorElement;
var InvalidFormSubmit = "Form is not complete with correct answers!";
var OtherErrorsForFormSubmit = "";
var GetSurveyData = "GetSurveyWidgetSetting";
var GetSurveyTemplate = "GetSurveyWidgetTemplate";
var SaveSurveySetting = "SaveSurveyWidgetSetting";
var TemplateFileName = "_widget.tmpl.html";
//var InternalServerError = 'Sorry, we were unable to load widget. Please feel free to <a href="mailto:urgentsupport@tailoredmail.com?subject=InternalServerError">report this to us</a>.';
var InternalServerError = "We were unable to fully load this page. Please refresh your browser and try again.";
var IsSocialDataRecieved = false;
var PiwikVisitorId = '0';
var TMUserID = "0";
var isCookieFound = false;
var cookieName = "ck_tmwidget";
var cookieObjectToSave = {};
var controlName;
var mobileAppContainerName = 'mobileprofile';
var ckmultiple = false;
var ParentURL = "";
var ProfilePollId = 0;
var ProfilePollAnswerIdChoiceMapping = [];
var CookieUsage = "true";
var BuildPollWidgets = function (templatedata) {
    data = $.parseJSON(templatedata);
    GetProfileFieldMapping(data);
    if (data.Error) {
        ShowWidgetIntilizeError(data.Error);
        return false;
    }
    data["ServerName"] = servername;
    var postdata = {};
    postdata["TemplateFile"] = "'" + TemplateFileName + "'";
    AjaxCall(getsurveytemplateurl, postdata, BindSurveyTemplate, AjaxCallbackForFailure);

};
var BindSurveyTemplate = function (Template) {
    var templatedata = $.parseJSON(Template);
    if (templatedata.Error) {
        ShowWidgetIntilizeError(templatedata.Error);
        return false;
    }
    $('#' + ParentElement).html(templatedata.Success);
    $('#WidgetTemplate').tmpl(data).appendTo('#' + ParentElement);
    $('#' + ParentElement).hide();
    $('#' + ParentElement).fadeIn(500);
    FixIEForPlaceholder();
    // Get cookieName And pre-fill values.
    if (TMUserID == "0" || TMUserID == "[UserId]")
        PrefillIfCookieExists();
    if (ParentURL && ParentURL != "")
        PrefillValuesFromParentURL();
};
var SetServerURLs = function () {
    jsongeturl = GetWebServiceURL(GetSurveyData);
    jsonsaveresponseurl = GetWebServiceURL(SaveSurveySetting);
    getsurveytemplateurl = GetWebServiceURL(GetSurveyTemplate);
    LoadingMessage = "<img src='" + location.protocol + "//" + servername + "/TmSubscribe.net/Images/" + LoadingImageFile + "' alt='Loading...' />";
};
var GetWebServiceURL = function (MethodName) {
    return location.protocol + "//" + servername + '/JSONPWebService/JSONPService.asmx/' + MethodName;
};
var BuildSurveyWidget = function (SurveyID, Element, ServerName, piwikvid, tmuid, ParentObject) {
    var postdata = {};
    postdata["SurveyID"] = "'" + SurveyID + "'";
    postdata["EncodedUserId"] = "'" + tmuid + "'";
    if (ParentObject && ParentObject["url"])
        ParentURL = ParentObject["url"];
    if (ParentObject && ParentObject["CookieUsage"])
        CookieUsage = ParentObject["CookieUsage"];
    var email = GetQuerystringParameByName("email");
    if ((tmuid == null || tmuid == "" || tmuid.toLowerCase() == "[userid]") && email != "")
        postdata["EncodedUserId"] = "'" + email + "'";
    postdata["ParentURL"] = "'" + ParentURL.replace(/[']/ig, "\\'") + "'";
    ParentElement = Element;
    servername = ServerName;
    if (piwikvid)
        PiwikVisitorId = piwikvid;
    if (tmuid)
        TMUserID = tmuid;
    SetServerURLs();
    ShowIntialMessage();

    AjaxCall(jsongeturl, postdata, BuildPollWidgets, AjaxCallbackForFailure);
};
var ShowIntialMessage = function () {
    $('#' + ParentElement).html(LoadingMessage);
}
var jQueryScriptOutputted = false;
var MainObject = {};
var LoadAndBuildSurvey = function (SurveyID, Element, ServerName, piwikvid, TmUserId, url, CookieUsage) {
    if (SurveyID)
        MainObject["SurveyID"] = SurveyID;
    if (Element)
        MainObject["Element"] = Element;
    if (ServerName)
        MainObject["ServerName"] = ServerName;
    if (piwikvid)
        MainObject["piwikvid"] = piwikvid;
    if (TmUserId)
        MainObject["TmUserId"] = TmUserId;
    if (url)
        MainObject["url"] = url;

    if (CookieUsage)
        MainObject["CookieUsage"] = CookieUsage;
    else
        MainObject["CookieUsage"] = "true";

    if (typeof (jQuery) == 'undefined' || typeof (jQuery.tmpl) == 'undefined') {

        if (!jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;

            document.write("<scr" + "ipt type=\"text/javascript\" src=\"http://" + MainObject.ServerName + "/TmSubscribe.net/include/jquery-latest.min.js\"></scr" + "ipt>");
            document.write("<scr" + "ipt type=\"text/javascript\" src=\"http://" + MainObject.ServerName + "/TmSubscribe.net/include/jquery.tmpl.min.js\"></scr" + "ipt>");
        }
        setTimeout("LoadAndBuildSurvey()", 50);
    } else {

        $(function () {
            BuildSurveyWidget(MainObject.SurveyID, MainObject.Element, MainObject.ServerName, MainObject.piwikvid, MainObject.TmUserId, MainObject);
        });
    }
};

var AjaxCall = function (postbackUrl, postdata, callback, failure, methodtype) {
    if (!methodtype) methodtype = "GET";
    $.ajax({ url: postbackUrl,
        data: postdata,
        type: methodtype,
        dataType: "jsonp",
        success: function (json) {
            callback(json.d);
        },
        error: function (error) {
            failure(error);
        }
    });
};
var ShowWidgetIntilizeError = function (ErrorMessage) {
    $('#' + ParentElement).html("Unable to fully load the page.<br/>");
    $('#' + ParentElement).append("Error: " + ErrorMessage);
    $('#' + ParentElement).css('border', '1px red solid');
    $('#' + ParentElement).css('background-color', '#FFFFD0');
};
var SurveySubmit = function (message) {
    ResizeAndHideMainWidgetAfterSubmission(message);
    this.HideBlocker();
    // Save cookie [controlfieldname/value]
    SetCookieValue(cookieName, JSON.stringify(cookieObjectToSave));
};
var AjaxCallbackForFailure = function (error) {
    // $("#WidgetSubmitWaitMessage").html(error.responseText);
    if (error.status == 200 && error.readyState == 4) {
        $("#WidgetSubmitWaitMessage").html(error.responseXML.documentElement.childNodes[0].data);
        $("#mainWidgetContent").hide();
    }
    else if (error.status == 500) {
        // Internal Server Error
        $('#' + ParentElement).addClass("error");
        $('#' + ParentElement).html(InternalServerError);
    }
    LogMessage(error);
};
var ShowMessage = function (Message) {
    $("#WidgetSubmitWaitMessage").html(Message);
}
var SubmitFailure = function (error) {
    // $("#WidgetSubmitWaitMessage").html(error.responseText);
    if (error.status == 200 && error.readyState == 4) {
        if (error["responseXML"] && error.responseXML["documentElement"] && error.responseXML.documentElement["childNodes"] && error.responseXML.documentElement.childNodes.length > 0)
            SurveySubmit(error.responseXML.documentElement.childNodes[0].data);
        else
            SurveySubmit("");
    }
    else if (error.status == 500) {
        // Internal Server Error
        $('#' + ParentElement).addClass("error");
        $('#' + ParentElement).html(InternalServerError);
    }
    LogMessage(error);
};


var LogMessage = function (Message) {
    if (typeof (console) != "undefined")
        console.log(Message);
};

var ClearAllFormInputs = function () {
    $('#' + ParentElement + ' input[type=text],input[type=password],textarea').val("");
    $('#' + ParentElement + ' input:checked').removeAttr("checked");
    $('#' + ParentElement + ' select  option:selected').val(0);
};
var SubmitForm = function (element) {
    CleanErrorMessages();
    var surveyid = $("#hdWidgetSurveyId").val();
    if (IsSpam(surveyid)) {
        ShowMessage("<b> Blocked Spam </b>");
        return;
    }
   
    result["SurveyId"] = surveyid;
    result["PiwikVisitorId"] = PiwikVisitorId;
    result["ParentPageUrl"] = ParentURL;
    result["Polls"] = [];
    result["TMUserId"] = TMUserID;
    $(element).attr('disabled', true);
    //Validate form before submitting.
    var IsValidated = ValidateForm();
    ckmultiple = false;
    if (!IsValidated) {
        $("#WidgetSubmitWaitMessage").addClass("error");
        if (OtherErrorsForFormSubmit && OtherErrorsForFormSubmit != "")
            $("#WidgetSubmitWaitMessage").html(OtherErrorsForFormSubmit);
        else {
            if (data.RequiredPrompt)
                $("#WidgetSubmitWaitMessage").html(data.RequiredPrompt);
            else
                $("#WidgetSubmitWaitMessage").html(InvalidFormSubmit);
        }

        //$("#WidgetSubmitWaitMessage").append("<br/>" + OtherErrorsForFormSubmit);
        this.ScrollCurrentViewTo($(FirstErrorElement), 2000);
        $(element).removeAttr('disabled');
        return false;
    }
    $('#' + ParentElement + ' input[type=text],input[type=password]').each(function (index) {
        pollid = $(this).parent().attr("pollid");
        if (typeof (pollid) == "undefined")
            return;
        pollanswerid = $(this).parent().attr("pollanswerid");
        answer = $(this).val();
        polltype = $(this).parent().attr("PollType");
        controlName = $(this).attr("name");
        BuildResultSimpleObject();
        //  BuildResultObject(pollid, pollanswerid, answer, false, polltype);
    });

    $('#' + ParentElement + ' input:checked').each(function (index) {
        pollid = $(this).parent().attr("pollid");
        pollanswerid = $(this).parent().attr("pollanswerid");
        answer = $(this).val();
        polltype = $(this).parent().attr("PollType");
        controlName = $(this).attr("name");
        ckmultiple = $(this).is("input[type=checkbox]");
        BuildResultSimpleObject();
        //BuildResultObject(pollid, pollanswerid, answer, this.type == 'checkbox', polltype);
    });


    $('#' + ParentElement + ' textarea').each(function (index) {
        pollid = $(this).parent().attr("pollid");
        pollanswerid = $(this).parent().attr("pollanswerid");
        answer = $(this).val();
        polltype = $(this).parent().attr("PollType");
        controlName = $(this).attr("name");
        BuildResultSimpleObject();
        //BuildResultObject(pollid, pollanswerid, answer,false, polltype);
    });

    $('#' + ParentElement + ' select  option:selected').each(function (index) {
        pollid = $(this).parent().parent().attr("pollid");
        pollanswerid = $(this).parent().parent().attr("pollanswerid");
        answer = $(this).val();
        polltype = $(this).parent().parent().attr("PollType");
        controlName = $(this).parent().attr("name");
        BuildResultSimpleObject();
        // BuildResultObject(pollid, pollanswerid, answer, false, polltype);
    });

    var postdata = {};
    postdata["SurveyJSONResponse"] = JSON.stringify(result);
    this.ShowBlocker();
    AjaxCall(jsonsaveresponseurl, postdata, SurveySubmit, SubmitFailure, 'POST');

};
var BuildResultSimpleObject = function () {
    var poll = {};
    poll["PollId"] = pollid;
    if (pollanswerid == '')
        pollanswerid = answer;
    poll["PollAnswerId"] = pollanswerid;
    poll["Answer"] = answer;
    poll["PollType"] = polltype;
    result.Polls.push(poll);

    // Also Save controlname/controlvalue to cookie
    if (controlName) {
        if (!cookieObjectToSave)
            cookieObjectToSave = {};
        if (cookieObjectToSave[controlName] && cookieObjectToSave[controlName].indexOf(answer) == -1 && ckmultiple)
            cookieObjectToSave[controlName] = cookieObjectToSave[controlName] + "," + answer;
        else
            cookieObjectToSave[controlName] = answer;
    }
};
var CleanErrorMessages = function () {
    $("#WidgetSubmitWaitMessage").removeClass("error");
    $("#WidgetSubmitWaitMessage").html("");
    OtherErrorsForFormSubmit = "";
};
var ValidateForm = function () {
    var Error = false;
    FirstErrorElement = undefined;
    if (IsSocialDataRecieved) return true;
    $('[validate="true"]').each(function (index) {
        var element = $(this).find(":first");
        var IsTmpError = false;
        $(this).removeClass("error");
        if ($(element).is("input[type=text]")) {
            IsTmpError = ($(element).val() == "");
            if (!IsTmpError) IsTmpError = ValidateEmail(element);
        }
        else if ($(element).is("input[type=password]")) {
            IsTmpError = ($(element).val() == "");
        }
        else if ($(element).is("textarea")) {
            IsTmpError = ($(element).val().trim() == "");
        }
        else if ($(element).is("input[type=radio]")) {
            var CheckedElementLength = $(this).find(":checked").length;
            IsTmpError = (CheckedElementLength == 0);
        }
        else if ($(element).is("input[type=checkbox]")) {
            var CheckedElementLength = $(this).find(":checked").length;
            IsTmpError = (CheckedElementLength == 0);
        }
        else if ($(element).is("select")) {
            var SelectedValue = $(element).find(":selected").val();
            IsTmpError = (SelectedValue == 0);
        }
        if (IsTmpError) {
            $(this).addClass("error");
            Error = true;
            if (FirstErrorElement === undefined)
                FirstErrorElement = $(this);
        }
    });
    if (!Error)
        return true;
    else
        return false;
};
var ValidateEmail = function (Element) {
    if ($(Element).attr("question")) {
        QuestionText = $(Element).attr("question").toLowerCase();
        var mail = $(Element).val();
        QuestionText = QuestionText.replace('-', '');
        if (QuestionText.indexOf('email') == -1) {
            return false;
        }
        else {
            return MailCheck(mail);
        }
    }
    else
        return false;
};
var MailCheck = function (emailStr) {

    var emailPat = /^(.+)@(.+)$/
    var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\\\'"
    var validChars = "\[^\\s" + specialChars + "\]"
    var quotedUser = "(\"[^\"]*\")"
    var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
    var atom = validChars + '+'
    var word = "(" + atom + "|" + quotedUser + ")"
    var userPat = new RegExp("^" + word + "(\\." + word + ")*$")
    var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$")

    var matchArray = emailStr.match(emailPat)
    if (matchArray == null) {
        // TO many @ character
        OtherErrorsForFormSubmit = "Email isn't a valid format.";
        return true;
    }
    var user = matchArray[1]
    var domain = matchArray[2]

    if (user.match(userPat) == null) {
        //The username in your email address doesn't seem to be valid. Please make sure your complete, correct email address is entered.")
        OtherErrorsForFormSubmit = "Email name isn't a valid format.";
        return true;
    }
    var IPArray = domain.match(ipDomainPat)
    if (IPArray != null) {
        for (var i = 1; i <= 4; i++) {
            if (IPArray[i] > 255) {
                //"Destination IP address (numeric email address) is invalid!")
                OtherErrorsForFormSubmit = "Email domain isn't a valid format.";
                return true;
            }
        }
        return false;
    }
    var domainArray = domain.match(domainPat)
    if (domainArray == null) {
        //"The domain name (the '@x.x' part of the email address) doesn't seem to be valid. Make sure you have entered your complete, accurate email address, in the format 'name@server.ext'")
        OtherErrorsForFormSubmit = "Email domain isn't a valid format.";
        return true;
    }
    var atomPat = new RegExp(atom, "g")
    var domArr = domain.match(atomPat)
    var len = domArr.length
    if (domArr[domArr.length - 1].length < 2 || (domArr[domArr.length - 1].length > 11 && domArr[domArr.length - 1].toUpperCase() != "MUSEUM")) {
        //The address must end in a two, three, or four-letter domain (like .uk, .com, .edu, .info, etc.) - Please make sure you entered your email address correctly.")
        OtherErrorsForFormSubmit = "Email domain isn't a valid format.";
        return true;
    }
    if (len < 2) {
        //Your email address appears to be missing a hostname, please make sure you have entered your complete email address.")
        OtherErrorsForFormSubmit = "Email domain isn't a valid format.";
        return true;
    }
    return false;

};
var OpenSocialSignin = function (provider) {
    var width = 500;
    var height = 350;
    var top = (600 - height) / 2;
    var left = (800 - width) / 2;
    if (screen) {
        //width = screen.availWidth;
        top = (screen.availHeight - height) / 2;
        left = (screen.availWidth - width) / 2;
    }
    var hwnd;
    var url = location.protocol + "//" + servername + "/TmSubscribe.net/SocialSignIn/";
    //var url = '~/../SocialSignIn/';
    if (provider == "FB")
        url += "FbHandle.aspx?callback=SetDetailsFromSocialSignin";
    else
        url += "SocialLoginAuth.aspx?provider=" + provider + "&callback=SetDetailsFromSocialSignin";

    hwnd = window.open(url, 'theWindow', 'toolbar = no,location = no,directories = no,scrollbars = yes,status = no,resizable = yes,copyhistory = no,top = ' + top + ',left = ' + left + ',width=' + width + ',height = ' + height);
    hwnd.focus();
};
var SetDetailsFromSocialSignin = function (data) {
    var socialdata = $.parseJSON(data);
    // set only textbox values

    $('#' + ParentElement + ' input[type=text]').each(function (index) {
        if ($(this).attr("question")) {
            QuestionText = $(this).attr("question").toLowerCase().split(' ').join('');
            if (QuestionText.indexOf('email') != -1) {
                // set email
                if (socialdata.Email) {
                    $(this).val(socialdata.Email);
                    IsSocialDataRecieved = true;
                    result["SocialSignIn"] = socialdata.ProviderType;
                }
            }
            else if (QuestionText.indexOf('firstname') != -1) {
                // set first name
                if (socialdata.FirstName)
                    $(this).val(socialdata.FirstName);
            }
            else if (QuestionText.indexOf('lastname') != -1) {
                // set last name
                if (socialdata.LastName)
                    $(this).val(socialdata.LastName);
            }
            else if (QuestionText.indexOf('city') != -1) {
                if (socialdata.City)
                    $(this).val(socialdata.City);
            }
            else if (QuestionText.indexOf('state') != -1) {
                if (socialdata.State)
                    $(this).val(socialdata.State);
            }
            else if (QuestionText.indexOf('country') != -1) {
                if (socialdata.Country)
                    $(this).val(socialdata.Country);
            }
        }
    });
    if (IsSocialDataRecieved) {
        CustomiseWidgetAfterSocialSignin();
        $("#btnTmSignup").click();
    }
};
var CustomiseWidgetAfterSocialSignin = function () {
    $("#mainWidgetContent").fadeOut(100);
};
//******** Utility functions to Get/Set[Pre-Fill Form] Cookie
var GetCookieValue = function (key) {
    currentcookie = document.cookie;
    if (currentcookie.length > 0) {
        firstidx = currentcookie.indexOf(key + "=");
        if (firstidx != -1) {
            firstidx = firstidx + key.length + 1;
            lastidx = currentcookie.indexOf(";", firstidx);
            if (lastidx == -1) {
                lastidx = currentcookie.length;
            }
            return unescape(currentcookie.substring(firstidx, lastidx));
        }
    }
    return this;
};
var SetCookieValue = function (key, value) {
    var validDate = 10;
    var expiremilliseconds = validDate * 24 * 3600 * 1000;
    var currdate = new Date();
    var expirationdate = new Date(currdate.getTime() + expiremilliseconds);
    document.cookie = key + "=" + value + ";expires=" + expirationdate.toGMTString();
    return this;
};
// Cookies store in [cookiename] and stored in JSON format
var PrefillIfCookieExists = function () {
    if (CookieUsage && CookieUsage == "false") return;
    var cookievalue = GetCookieValue(cookieName);
    if (cookieName == "") {
        isCookieFound = false;
        return this;
    }
    else {
        isCookieFound = true;
        var cookieRetrived = $.parseJSON(cookievalue);
        cookieObjectToSave = cookieRetrived;
        for (var key in cookieRetrived) {
            var inputElement = $("input[name=" + key + "]");
            var selectElement = $("select[name=" + key + "]");
            var taElement = $("textarea[name=" + key + "]");
            if (inputElement && inputElement.length > 0) {
                if (inputElement.attr("type") == "text") {
                    inputElement.val(cookieRetrived[key]);
                }
                else if (inputElement.attr("type") == "radio") {
                    $("input[name=" + key + "][value=" + cookieRetrived[key] + "]").attr("checked", true);
                }
                else if (inputElement.attr("type") == "checkbox") {
                    var ks = cookieRetrived[key].split(",");
                    for (var subkey in ks) {
                        $("input[name=" + key + "][value=" + ks[subkey] + "]").attr("checked", true);
                    }
                }
            }
            else if (selectElement && selectElement.length > 0) {
                $("select[name=" + key + "] option[value='" + cookieRetrived[key] + "']").attr('selected', 'selected');
            }
            else if (taElement && taElement.length > 0) {
                $("textarea[name=" + key + "]").val(cookieRetrived[key]);
            }
        }
    }
};
/* ********* Widget Enahncement Part 1  ** Utility Function TO Show waiting message as overlay div [User overlay waiting icon] *******/
var ShowBlocker = function () {
    if (IsSocialDataRecieved) {
        $("#WidgetSubmitWaitMessage").html(LoadingMessage);
    }
    else {
        var currentBlockerHeight = $("#mainWidget").height();
        $("#blocker").height(currentBlockerHeight);
        $("#bockerDiv").height(currentBlockerHeight);

        $("#blocker").show();
        $("#bockerDiv").show();
    }
};
var HideBlocker = function () {
    $("#bockerDiv").hide();
    $("#blocker").hide();
};
/************ Widget Enahancement Part - 2 ******* Maintain widget height on Submission ****/
var ResizeAndHideMainWidgetAfterSubmission = function (message) {
    $("#WidgetSubmitWaitMessage").hide();
    var prevHeightOfWidgetContent = $("#mainWidgetContent").height();
    $("#mainWidgetContent").html(message);
    $("#mainWidgetContent").fadeIn(100);
    $("#mainWidgetContent").height(prevHeightOfWidgetContent);

    this.ScrollCurrentViewTo($(".widget"), 500);
};
/********** Scroll to specific location Wrapper ** work both with desktop and mobile APP **/
var ScrollCurrentViewTo = function (element, duration) {
    if (typeof (Ext) != "undefined") { // 1st check ,if this is mobile APP ==> then use corresponding LIB to scroll
        var ycord = $(element).position().top - 10;
        var ExtElement = Ext.ComponentQuery.query(mobileAppContainerName)[0];
        ExtElement.getScrollable().getScroller().scrollTo(0, ycord, true);
    }
    else { // use jquery's scroll
        $('html, body').animate({
            scrollTop: $(element).offset().top
        }, duration);
    }
};
/********** Placeholder solution for IE ************/
var FixIEForPlaceholder = function () {
    jQuery.support.placeholder = false;
    test = document.createElement('input');
    if ('placeholder' in test)
        jQuery.support.placeholder = true;
    if (!$.support.placeholder) {
        var active = $("#" + ParentElement);
        $(':text').focus(function () {
            if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
                $(this).val('').removeClass('customcssforplaceholder');
            }
        }).blur(function () {
            if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
                $(this).val($(this).attr('placeholder')).addClass('customcssforplaceholder');
            }
        });
        $(':text').blur();
        $(active).focus();
        $('form:eq(0)').submit(function () {
            $(':text.customcssforplaceholder').val('');
        });
    }
}
/*****      Parse URL and fetch querystring, then return value  ****/
function GetQuerystringParameByName(name) {
    if (!ParentURL || ParentURL == "") return "";

    var startIdxOfquerystring = ParentURL.indexOf("?", 0);
    var actualquerystring = ParentURL.substring(startIdxOfquerystring + 1, ParentURL.length);
    if (!actualquerystring) return;
    var querystringvalues = actualquerystring.split("&");
    if (!querystringvalues) return;
    for (var i = 0; i < querystringvalues.length; i++) {
        if (querystringvalues[i]) {
            var individualvalues = querystringvalues[i].split("=");
            if(individualvalues && individualvalues.length == 2)
            {
                if (individualvalues[0] && individualvalues[0].toLowerCase() == name.toLowerCase())
                    return individualvalues[1];
            }
        }
    }
    return "";
}
/*****      Get PollAnswerId,ProfilePollId,SurveyId from main Obj   ****/
var GetProfileFieldMapping = function (MainObject) {
    var ProfilePollAnswers = [];
    if (MainObject["PollWidgets"]) {
        for (var i in MainObject["PollWidgets"]) {
            if (MainObject["PollWidgets"][i] && MainObject["PollWidgets"][i]["PollWidgetType"] == "5") {
                ProfilePollId = MainObject["PollWidgets"][i]["PollId"];
                ProfilePollAnswers = MainObject["PollWidgets"][i]["PollAnswers"];
                break;
            }
        }
        if (ProfilePollAnswers && ProfilePollAnswers.length > 0) {
            for (var i = 0; i < ProfilePollAnswers.length; i++) {
                var mapping = {};
                mapping["pollanswerid"] = ProfilePollAnswers[i]["PollAnswerId"];
                mapping["choice"] = ProfilePollAnswers[i]["Choice"];
                ProfilePollAnswerIdChoiceMapping.push(mapping);
            }
        }
    }

}
/*****      Prefill values from parent URL      ***/ 
var PrefillValuesFromParentURL = function () {
    if (!ProfilePollAnswerIdChoiceMapping || ProfilePollAnswerIdChoiceMapping.length == 0)
        return;
    for (var i = 0; i < ProfilePollAnswerIdChoiceMapping.length; i++) {
        if (ProfilePollAnswerIdChoiceMapping[i]) {
            var querystringkey = ProfilePollAnswerIdChoiceMapping[i]["choice"];
            var querystringvalue = GetQuerystringParameByName(querystringkey);
            var pollanswerid = ProfilePollAnswerIdChoiceMapping[i]["pollanswerid"];
            //var selector = $("input[question=" + querystringkey + "]"); // if text control found
            var selector = $("input[name=tb" + pollanswerid + "]"); // if text control found
            if (querystringvalue == "") continue;

            if (selector && selector.length > 0) {
                selector.val(querystringvalue);
                continue;
            }
            checkboxvalues = querystringvalue.split(",");
            for (var j = 0; j < checkboxvalues.length; j++) {
                selector = $("input[name=cb" + ProfilePollId + "_" + pollanswerid + "][value=" + checkboxvalues[j] + "]"); // if select checkbox control found
                if (selector && selector.length > 0) {
                    selector.attr("checked", true);
                    continue;
                }
            }
            if (querystringvalue.indexOf(",") > 0) querystringvalue = querystringvalue.replace(",", "");
            selector = $("input[name=rb" + ProfilePollId + "_" + pollanswerid + "][value=" + querystringvalue + "]"); // if select radio control found
            if (selector && selector.length > 0) {
                selector.attr("checked", true);
                continue;
            }
            selector = $("select[name=sl" + pollanswerid + "] option[value=" + querystringvalue + "]"); // if select html control found
            if (selector && selector.length > 0) {
                selector.attr('selected', 'selected');
                continue;
            }

        }
    }
}
/****   Spam validation ******/
var IsSpam = function (SurveyId) {
    var control = $("#txtwidget" + SurveyId);
    if (control && control.val() != "")
        return true;
    else
        return false;

}