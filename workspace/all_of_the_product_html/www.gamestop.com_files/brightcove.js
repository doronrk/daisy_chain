var brightcove_modVP = null;
var brightcove_page = 0;
var brightcove_pages = 1;
var brightcove_playerid = '';
var brightcove_playerkey = '';

function brightcove_response(jsonData) {
    var videoCount = 0;
    var agelevel = '';
    if (jsonData != null) {
            for (var i = 0; i < jsonData["items"].length; i++) {
                var title = jsonData["items"][i];
                var str = '<img onclick="brightcove_playTitle(' + title.id + ');" class="videothumb" src="' + title.thumbnailURL + '" />';
                $('#videothumbs .items .scroll_area').append(str);
                if (i == 0)
                    $('#brightcoveviewer').html('<img class="videostill" src="' + title.videoStillURL + '"/>');
                for (var j = 0; j < jsonData['items'][i]['tags'].length; j++) {
                    if (jsonData['items'][i]['tags'][j] == 'mature') {
                        agelevel = 'mature';
                        break;
                    }
                }
                videoCount++;
            }
    }
    if (videoCount > 8) {
        brightcove_pages = (videoCount - videoCount % 8) / 8;
        if (videoCount % 8 != 0)
            brightcove_pages++;
        $('#videothumbs .left').click(function () {
            if (brightcove_page > 0) {
                brightcove_page--;
                $('#videothumbs .items .scroll_area').animate({ 'margin-left': '+=664' }, 800);
                $('#videothumbs .right').css('visibility', 'visible');
                $('#videothumbs .left').css('visibility', brightcove_page > 0 ? 'visible' : 'hidden');
            }
        });
        $('#videothumbs .right').css('visibility', 'visible').click(function () {
            if (brightcove_page < (brightcove_pages - 1)) {
                brightcove_page++;
                $('#videothumbs .items .scroll_area').animate({ 'margin-left': '-=664' }, 800);
                $('#videothumbs .left').css('visibility', 'visible');
                $('#videothumbs .right').css('visibility', brightcove_page < (brightcove_pages - 1) ? 'visible' : 'hidden');
            }
        });
    }
    if (videoCount == 0) {
        $('#videoPlayerDiv').remove();
    }
    else if (agelevel == 'mature') {
        var cookies = document.cookie.split(';');
        var ag = 0;
        for (var i = 0; i < cookies.length; i++) {
            var c = cookies[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c == "GS.verifyAge=false") {
                ag = 1;
                break;
            }
        }
        if (ag == 0)
            $("#agehold").show();
         else {
         $("#agehold").show();
         $('#ageGateControls').hide();
         $('#agegate_instructions').hide();
         $('#agegate_disabled').show();
       }
    }
}

function brightcove_playTitle(id) {
    if (brightcove_modVP == null) {
        $("#brightcoveviewer").empty();
        var html = '<object id="BrightcoveExperience" class="BrightcoveExperience">'
			+ '<param name="bgcolor" value="#000000" />'
			+ '<param name="width" value="780" />'
			+ '<param name="height" value="438" />'
			+ '<param name="playerID" value="1130366752001" />'
			+ '<param name="playerKey" value="AQ~~,AAAAE6UROSE~,COwC5Q1vxrykmYO1oVl04A99MtWy90A3" />'
			+ '<param name="isVid" value="true" />'
			+ '<param name="isUI" value="true" />'
			+ '<param name="dynamicStreaming" value="true" />'
			+ '<param name="autoStart" value="true" />'
			+ '<param name="wmode" value="transparent" />'
			+ '<param name="@videoPlayer" value="' + id + '" />'
			+ '<param name="includeAPI" value="true" />'
			+ '<param name="templateLoadHandler" value="brightcove_templateLoaded" />'
			+ '</object>';
        $("#brightcoveviewer").append(html);
        brightcove.createExperiences();
    }
    else {
        brightcove_modVP.loadVideoByID(id);
        brightcove_modVP.play();
    }

    brightcove_videoPlay(null);
}

function brightcove_templateLoaded(experienceId) {
    var player = brightcove.api.getExperience(experienceId);
    var modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    brightcove_modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, brightcove_templateReady);
}

function brightcove_templateReady(evt) {
    brightcove_modVP.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, brightcove_videoComplete);
    brightcove_modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, brightcove_videoComplete);
    brightcove_modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, brightcove_videoPlay);
}

function brightcove_videoComplete(evt) {
    $('#videothumbs').fadeIn(200);
}

function brightcove_videoPlay(evt) {
    $('#videothumbs').fadeOut(200);
}

function brightcove_verifyAge() {
    var min_age = 17;
    var _month = $('#brightcove_agegate_month').val();
    var _day = $('#brightcove_agegate_day').val();
    var _year = $('#brightcove_agegate_year').val();

    // Add 17 years to the date the user entered (which would be the user's 17th birthday), 
    // then make sure it's before today (i.e. it's already passed so they are older than 17).
    if (new Date(parseInt(_year) + min_age, _month - 1, _day) <= new Date()) {
        $('#agehold').remove();
    }
    else {
        $('#ageGateControls').hide();
        $('#agegate_instructions').hide();
        $('#agegate_disabled').show();


        var flag = false;
        
        var cdate = new Date();
        cdate.setDate(cdate.getDate() + 7);
        cExpires = cdate.toUTCString();
        var curCookie = "GS.verifyAge =" + flag + "; path=/; expires= " + cExpires + "; domain=" + document.domain;
        document.cookie = curCookie;
    }
}

function brightcove_resetDays() {
    var _month = $('#brightcove_agegate_month').val();
    var _days = 31;
    if (_month == 4 || _month == 6 || _month == 9 || _month == 11)
        _days = 30;
    else if (_month == 2)
        _days = 29;
    $('#brightcove_agegate_day').empty();
    for (var i = 1; i <= _days; i++)
        $('#brightcove_agegate_day').append('<option value="' + i + '">' + i + '</option>');
}
