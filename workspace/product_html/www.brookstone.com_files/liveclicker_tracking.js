/* Liveclicker-Omniture Brookstone */
/*
// last widget played
var lastVideoName = '';
var lastTimePlayed = 0;
// Player object currently being tracked
var omPlayer;
// Used to cap the number of requests sent
var sendCount = 0;

// Have the start/end calls been made for the current video?
var sentMessageStarted = 0;
var sentMessageFullCompletion = 0;
var sentMessage20;

function omniturePlayerLoaded(player)
{
        try {
            videoName = player.getSettings().widget_title;
        } catch (e) {
            if (videoName == undefined) {
                videoName = "Unknown Video";
            }
        }
        // Just in case widget_title isn't defined
        if (videoName == undefined) {
            videoName = "Unknown Video";
        }
        try {
            videoLength = Math.round(player.getSettings().totalTime);
        } catch (e) {
            if (videoLength == undefined) {
                videoLength = 0;
            }
        }
        sentMessageStarted = 0;
        sentMessageFullCompletion = 0;
        sentMessage20 = 0;


}

function openMovie(videoName, lengthInSeconds)
{
        s.Media.open(videoName,lengthInSeconds,"liveclicker");
        s.Media.play(videoName,0);
}

function endMovie( videoName, lengthInSeconds)
{
        s.Media.stop(videoName, lengthInSeconds);
        s.Media.close(videoName);
}

function player_invalidated(player) {

    if (omPlayer == undefined) {
        // Not defined at all, so not invalid
        return false;
    } else if (omPlayer.getSettings == undefined) {
        return true;
    }
    try {
        omPlayer.getSettings();
    } catch(e) {
        return true;
    }
    return false;
}

function update_timer()
{
        if (window['s'] == undefined || s.Media == undefined) return;
        if (window['getLCPlayers'] == undefined) return;
        if (window['lastVideoName'] == undefined) return;

        // If the old player has become invalid, reset to empty title.
        if (lastVideoName!='') {
                if (player_invalidated(omPlayer)){
                        endMovie( videoName, lastTimePlayed);
                    lastVideoName = '';
                    lastTimePlayed = 0;
                   }
        }

        var players = getLCPlayers();
        // Always look at the first (hopefully only) player
        if (players.length > 0) {
            var player = players[0];
            var widgetTitle = player.getSettings().widget_title;
            // Just in case widget_title isn't defined
            if (widgetTitle == undefined) {
                widgetTitle = "Unknown Video";
            }
            if (lastVideoName == undefined ||
                (widgetTitle != lastVideoName && widgetTitle != '')) {
                lastVideoName = widgetTitle;
                omniturePlayerLoaded(player);
                omPlayer = player;
            }
        }

        var time;
        try {
                time = Number(omPlayer.getSettings().playTime);
                lastTimePlayed = time;
                // Some devices (e.g. iPad) don't define video length until
                // the video starts playing. Check here for those.
                if (videoLength == 0) {
                    videoLength = Math.round(player.getSettings().totalTime);
                }
        } catch(e) {
        }

        if ((time != undefined) && (time > 0) && (videoLength > 0) && (sendCount < 10))
        {
                var percentComplete = time / videoLength;
                if (sentMessageStarted == 0)
                {
                        sendCount++;
                        sentMessageStarted = 1;
                        openMovie(videoName, videoLength);
                }

                if ((sentMessageFullCompletion == 0) && ((percentComplete) > 0.98))
                {
                        sendCount++;
                        sentMessageFullCompletion = 1;
                        endMovie( videoName, videoLength);
                }
        }

        var time;
        try {
                time = Number(omPlayer.getSettings().playTime);
                lastTimePlayed = time;
                // Some devices (e.g. iPad) don't define video length until
                // the video starts playing. Check here for those.
                if (videoLength == 0) {
                    videoLength = Math.round(player.getSettings().totalTime);
                }
        } catch(e) {
        }

        if ((time != undefined) && (time > 0) && (videoLength > 0) && (sendCount < 10))
        {
                var percentComplete = time / videoLength;
                if (sentMessageStarted == 0)
                {
                        sendCount++;
                        sentMessageStarted = 1;
                        openMovie(videoName, videoLength);
                }

                if ((sentMessageFullCompletion == 0) && ((percentComplete) > 0.98))
                {
                        sendCount++;
                        sentMessageFullCompletion = 1;
                        endMovie( videoName, videoLength);
                }
        }
}

setTimeout(function(){window.setInterval('update_timer()', 100); }, 1000);

*/