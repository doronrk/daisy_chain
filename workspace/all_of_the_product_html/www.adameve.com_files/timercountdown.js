var days, hours, minutes, seconds;
var target_date = new Date($("#timerEndDate").val()).getTime();
var current_date = new Date(phe.config.currentServerTime).getTime();
var setCountDown = setInterval(function () {
    // find the amount of "seconds" between current and target date
     var seconds_left = (target_date - current_date) / 1000;
     current_date = current_date + 1000;
    //stop the timer
     if (seconds_left <= 0) {
         clearInterval(setCountDown);
         $("#countdown-timer").html($("#timerExpirationMessage").val());
         return false;
     }
     // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;
    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;
    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);

    var daysText = " Days ";
    var hoursText = " Hours ";
    var minutesText = " Minutes ";
    if (days == 1) daysText = " Day ";
    if (hours == 1) hoursText = " Hour ";
    if (minutes == 1) minutesText = " Minute ";

    var daystring = '<span id="days-number">' + days + '</span><span id="days-text">' + daysText + '</span>';
    var hourstring = '<span id="hours-number">' + hours + '</span><span id="hours-text">' + hoursText + '</span>';
    var countdownstring = '<span id="minutes-number">' + minutes + '</span><span id="minutes-text">' + minutesText + '</span><span id="seconds-number">' + seconds + '</span><span id="seconds-text">  Seconds</span>';

    if (days > 0) countdownstring = daystring + hourstring + countdownstring;
    if (days == 0 && hours > 0) countdownstring = hourstring + countdownstring;
    
    $("#countdown-timer").html(countdownstring);
}, 1000);