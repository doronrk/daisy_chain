// +------------------------------------------------------------+
// | CLASSES                                                    |
// +------------------------------------------------------------+

function _t_ct_pt(id, sdid, aid)
{
    this.version = 'v2';
    this.id      = id;
    this.sdid    = sdid;
    this.aid     = aid;
    this.key     = null;
    this.referer = encodeURIComponent(window.location.href);
    this.ctutn   = null;
    this.ctutv   = null;
    this.tpid    = null;
    this.rcs_l   = null;
    this.rcs_t   = null;
    this.rcs_d   = null;
    this.rcs_i   = null;

    // Complex pixel values.
    this.action_type        = null;
    this.initial_fire_delay = null;
    this.num_fires_per_view = null;
    this.fire_repeat_sleep  = null;
    this.total_num_fired    = null;

    // +----------------+
    // | Public Methods |
    // +----------------+

    this.get_page_view_tracker = function()
    {
        return this._get_tracking_base_url()
               + 't.gif'
               + '?c='
               + this.id
               + '&r='
               + this.referer
               + '&s=1'
               + '&a='
               + this.aid
               + this._get_ctu_qs()
               + this._get_tpid_qs()
               + this._get_rcs_qs();
    };

    this.set_rcs = function(l, t, d, i)
    {
        this.rcs_l = encodeURIComponent(l);
        this.rcs_i = encodeURIComponent(i);

        this.rcs_t = t;
        if (t.length > 100)
        {
            this.rcs_t = t.substr(0, 97) + '...';
        }

        this.rcs_d = d;
        if (d.length > 250)
        {
            this.rcs_d = d.substr(0, 247) + '...';
        }

        this.rcs_t = encodeURIComponent(this.rcs_t);
        this.rcs_d = encodeURIComponent(this.rcs_d);
    };

    this.set_tpid = function(tpid)
    {
        this.tpid = encodeURIComponent(tpid);
    };

    this.set_complex_fire_values = function(action_type,
                                            initial_fire_delay,
                                            num_fires_per_view,
                                            fire_repeat_sleep)
    {
        this.action_type = action_type;
        this.initial_fire_delay = initial_fire_delay;
        this.num_fires_per_view = num_fires_per_view;
        this.fire_repeat_sleep = fire_repeat_sleep;

        this.total_num_fired = 0;
    }

    this.track_action_complex = function()
    {
        var inst = this;

        if (this.action_type === 'delayed' && this.total_num_fired === 0)
        {
            setTimeout(function() {
                inst.track_action();
            }, this.initial_fire_delay * 1000);

            return;
        }
        else if (this.action_type === 'repetitive')
        {
            if (this.total_num_fired === 0)
            {
                setTimeout(function() {
                    inst.track_action();
                }, this.initial_fire_delay * 1000);
            }
            else if (this.total_num_fired <= this.num_fires_per_view)
            {
                setTimeout(function() {
                    inst.track_action();
                }, this.fire_repeat_sleep * 1000);
            }
        }
    }

    this.is_complex = function () {
        return this.action_type === 'delayed' || this.action_type === 'repetitive';
    }

    this.track_action = function()
    {
        if (this.is_complex() &&
            this.total_num_fired === this.num_fires_per_view)
        {
            return;
        }

        var img;

        img = document.createElement('img');
        img.id = 'tpv';
        img.width = '1';
        img.height = '1';
        img.src = this._cache_bust(this.get_page_view_tracker());
        img.alt = '';

        document.body.appendChild(img);

        this.total_num_fired++;

        if (this.is_complex())
        {
            this.track_action_complex();
        }
    };

    // +-----------------+
    // | Private Methods |
    // +-----------------+

    this._cache_bust = function(url)
    {
        return this._url_adjoin_qs(url, { api_z : Math.random() });
    };

    this._cast_to_string = function(a)
    {
        if (typeof a == 'boolean')
        {
            return a ? '1' : '0';
        }

        if (typeof a == 'object' && !a)
        {
            return '';
        }

        return encodeURIComponent('' + a);
    };

    this._get_ctu_qs = function()
    {
        var qs;

        qs = '';
        if (this.ctutn != null && this.ctutv != null)
        {
            qs = '&' + this.ctutn + '=' + this.ctutv;
        }

        return qs;
    };

    this._get_env_prefix = function()
    {
        switch (this.sdid)
        {
            case 1:
                return 'local-';

            case 2:
                return 'qa-';

            case 4:
                return 'staging-';

            default:
                return '';
        }
    };

    this._get_env_name = function()
    {
        switch (this.sdid)
        {
            case 1:
                return 'local';

            case 2:
                return 'qa';

            case 4:
                return 'staging';

            default:
                return 'prod';
        }
    }

    this._get_rcs_qs = function()
    {
        var qs;

        qs = '';
        if (this.rcs_l != null && this.rcs_t != null && this.rcs_d != null)
        {
            qs =   '&rcs_l=' + this.rcs_l
                 + '&rcs_t=' + this.rcs_t
                 + '&rcs_d=' + this.rcs_d
                 + '&rcs_i=' + this.rcs_i;
        }

        return qs;
    };

    this._get_tpid_qs = function()
    {
        var qs;

        qs = '';
        if (this.tpid != null && this.tpid.length > 0)
        {
            qs = '&tpid=' + this.tpid;
        }

        return qs;
    };

    this._get_tracking_base_url = function()
    {
        return document.location.protocol
               + '//'
               + this._get_env_prefix()
               + 't.crowdtwist.com/'
               + this.version
               + '/';
    };

    this._url_adjoin_qs = function(url, table)
    {
        var parts = url.split('?');
        var vars = [];

        if (parts.length == 2)
        {
            var name_value_pairs = parts[1].split('&');
            for (var i = 0; i < name_value_pairs.length; i++)
            {
                var name = name_value_pairs[i].split('=')[0];
                if (name && !table.hasOwnProperty(name))
                {
                    vars.push(name_value_pairs[i]);
                }
            }
        }

        for (var key in table)
        {
            vars.push(key + '=' + this._cast_to_string(table[key]));
        }

        return parts[0] + '?' + vars.join('&');
    };
};

// +------------------------------------------------------------+
// | CLIENT FUNCTIONS                                           |
// +------------------------------------------------------------+

/**
 * Rendered:     2014-11-30 19:07:46
 * Site ID:      2
 * Client ID:    14
 * Cachebuster:  5
 * Num. Actions: 20
 */

/**
 * Action name:    Added a Comment
 * Action created: 2012-04-25 00:00:00
 */
function ct_trck_comments(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 40);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Browsed Page
 * Action created: 2012-05-08 00:00:00
 */
function ct_trck_browsed_page(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 112);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Created a custom GIF at GiveGIFs.com
 * Action created: 2012-11-20 18:07:33
 */
function ct_trck_give_gifs(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 169);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Emailed Shopping Bag
 * Action created: 2012-04-25 00:00:00
 */
function ct_trck_emailed_shopping_bag(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 37);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Emailed Wishlist
 * Action created: 2012-04-25 00:00:00
 */
function ct_trck_emailed_wishlist(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 36);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Joined Insider Info
 * Action created: 2012-04-25 00:00:00
 */
function ct_trck_joined_insider_info(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 42);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Rated a Product
 * Action created: 2012-04-25 00:00:00
 */
function ct_trck_rated_a_product(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 41);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Shared a Product
 * Action created: 2012-04-25 00:00:00
 */
function ct_trck_shared_a_product(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 38);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Tagged a Product
 * Action created: 2012-04-25 00:00:00
 */
function ct_trck_tagged_a_product(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 39);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Visit Bestworstgift Landing Page
 * Action created: 2014-11-04 16:51:25
 */
function ct_trck_visit_bestworstgift_landing_page(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 376);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Visit Zumiez Presents
 * Action created: 2014-11-04 16:48:33
 */
function ct_trck_visit_zumiez_presents(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 375);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Visited Codes and Keys - Discovery
 * Action created: 2013-07-30 12:43:24
 */
function ct_trck_visited_codes_and_keys_discovery(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 237);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Visited Codes and Keys - Exploration
 * Action created: 2013-07-30 12:43:24
 */
function ct_trck_visited_codes_and_keys_exploration(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 238);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Visited Codes and Keys - The End
 * Action created: 2013-07-30 12:43:24
 */
function ct_trck_visited_codes_and_keys_the_end(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 239);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Visited Codes and Keys - Video
 * Action created: 2013-07-30 12:43:24
 */
function ct_trck_visited_codes_and_keys_video(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 240);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Visited Site
 * Action created: 2012-04-25 00:00:00
 */
function ct_trck_site(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 44);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Watched a Video
 * Action created: 2012-04-25 00:00:00
 */
function ct_trck_video(options)
{
    try
    {
        var t = new _t_ct_pt('2-14', 3, 43);

        t.set_tpid((options.content_identifier ?
                        options.content_identifier : ''));

        if (options.link && options.title && options.desc)
        {
            t.set_rcs(options.link,
                      options.title,
                      options.desc,
                      (options.image ? options.image : null));
        }

        t.track_action();
    }
    catch (err) {}

}

/**
 * Action name:    Watched a Video (Brightcove)
 * Action created: 2012-04-25 00:00:00
 */
//
// +------------------------------------------------------------+
// | Watched a Video (Brightcove) -- START                      |
// +------------------------------------------------------------+
//

function ct_api_BrightCove(experienceID)
{
    this.duration;
    this.pointsAwarded = false;
    this.timeLimit = 30;
    this.timer;
    this.timeWatched = 0;
    this.videoId;

    this.player = bcPlayer.getPlayer(experienceID);
    this.video = this.player.getModule(APIModules.VIDEO_PLAYER);
    this.content = this.player.getModule(APIModules.CONTENT);
    this.exp = this.player.getModule(APIModules.EXPERIENCE);
    this.menu = this.player.getModule(APIModules.MENU);
    this.ads = this.player.getModule(APIModules.ADVERTISING);
    this.social = this.player.getModule(APIModules.SOCIAL);

    this.init = function()
    {
        var $this = this;

        this.video.addEventListener(BCMediaEvent.PLAY, function(){$this.onPlay($this);});
        this.video.addEventListener(BCMediaEvent.BUFFER_COMPLETE, function(){$this.onPlay($this);});
        this.video.addEventListener(BCMediaEvent.BEGIN, function(){$this.onBegin($this);});
        this.video.addEventListener(BCMediaEvent.PROGRESS, function(){$this.onProgress($this);});
        this.video.addEventListener(BCMediaEvent.STOP, function(){$this.onStop($this);});
        this.video.addEventListener(BCMediaEvent.BUFFER_BEGIN, function(){$this.onStop($this);});
    }

    this.onPlay = function(brightcove)
    {
        brightcove.timer = setInterval(function(){brightcove.startTimer(brightcove)}, 1000);
    }

    this.onBegin = function(brightcove)
    {
        // If we want to use a percentage of the duration as the timeLimit
        // for awarding points e.g. 50%, do it here by updating timeLimit
        var duration = brightcove.video.getVideoDuration();
        brightcove.duration = Math.round(duration);

        if (brightcove.timeLimit > brightcove.duration)
        {
            brightcove.timeLimit = brightcove.duration - 3;
        }

        brightcove.videoId = brightcove.video.getCurrentVideo().id;
    }

    this.onStop = function(brightcove)
    {
        clearInterval(brightcove.timer);
    }

    this.startTimer = function(brightcove)
    {
        var position = brightcove.video.getVideoPosition();

        brightcove.timeWatched++;

        if(!position > 0)
        {
            brightcove.timeWatched = 0;
        }

        if(Math.round(brightcove.timeWatched) >= brightcove.timeLimit && !brightcove.pointsAwarded)
        {
            try
            {
                var t = new _t_ct_pt('2-14',
                                     3,
                                     96);

                t.set_tpid(brightcove.videoId);
                t.track_action();
            }
            catch (err) {}

            brightcove.pointsAwarded = true;
        }
    }

    this.init();
}

function onTemplateLoaded(experienceID)
{
    var brightcove = new ct_api_BrightCove(experienceID);

    if (typeof onTemplateLoadedCallback === 'function')
    {
        onTemplateLoadedCallback(experienceID);
    }
}


//
// +------------------------------------------------------------+
// | Watched a Video (Brightcove) -- END                        |
// +------------------------------------------------------------+
//

/**
 * Action name:    Watched a Video (Vimeo)
 * Action created: 2012-04-25 00:00:00
 */
//
// +------------------------------------------------------------+
// | Watched a Video (Vimeo) -- START                           |
// +------------------------------------------------------------+
//

function ct_api_vimeo_response_handler(response) {
    var data = response[0];

    try
    {
        var t = new _t_ct_pt('2-14',
                             3,
                             97);

        t.set_tpid(data.id);
        t.set_rcs(window.location.href,
                  data.title,
                  data.description,
                  data.thumbnail_medium);

        t.track_action();
    }
    catch (err) {}
}

(function() {

    // Listen for the ready event for any vimeo video players on the page
    var vimeoPlayers = document.querySelectorAll('iframe'),
        player;

    for (var i = 0, length = vimeoPlayers.length; i < length; i++) {
        player = vimeoPlayers[i];
        if (player.src.indexOf('//player.vimeo.com') >= 0) {
            $f(player).addEvent('ready', ready);
        }
    }

    // Utility function for adding an event. Handles the inconsistencies
    // between the W3C method for adding events (addEventListener) and
    // IE's (attachEvent).
    function addEvent(element, eventName, callback) {
        if (element.addEventListener) {
            element.addEventListener(eventName, callback, false);
        }
        else {
            element.attachEvent(eventName, callback, false);
        }
    }

    // Vimeo player class
    function ct_api_Vimeo(player_id) {
        this.froogaloop = $f(player_id);
        this.lastPosition = 0;
        this.playerId = player_id;
        this.pointsAwarded = false;
        this.timeLimit = 30;
        this.timeWatched = 0;
        this.videoUrl;
        this.videoId;

        var $this = this;

        this.addEvents = function() {
            $this.froogaloop.addEvent('playProgress', function(data) {

                $this.timeWatched += parseFloat(data.seconds, 10) -
                                     parseFloat($this.lastPosition, 10);

                $this.lastPosition = parseFloat(data.seconds, 10);

                if ($this.timeWatched >= $this.timeLimit &&
                    ! $this.pointsAwarded) {
                        var script = document.createElement('script');
                        script.src = 'http://vimeo.com/api/v2/video/' + $this.videoId + '.json?callback=ct_api_vimeo_response_handler';
                        document.body.appendChild(script);

                        $this.pointsAwarded = true;
                    }
            });

            $this.froogaloop.addEvent('play', function(player_id) {
                $this.froogaloop.api('getCurrentTime',
                    function(value, player_id) {
                        $this.setLastPos(value);
                    }
                );
            });

            $this.froogaloop.addEvent('pause', function(player_id) {
                $this.setLastPos($this.timeWatched);
            });

            $this.froogaloop.addEvent('seek', function(data) {
                $this.setLastPos(data.seconds);
            });
        }

        this.init = function() {
            this.froogaloop.api('getDuration', function(value, player_id) {
                // If we want to use a percentage of the duration as the
                // time limit for awarding points e.g. 50%, do it here by
                // updating timelimit
                $this.duration = Math.round(value);

                if ($this.timeLimit > $this.duration) {
                    $this.timeLimit = $this.duration - 3;
                }

                $this.froogaloop.api('getVideoUrl', function(value, player_id) {
                    $this.videoUrl = value;
                    $this.videoId = value.substring(value.lastIndexOf('/') + 1);
                    $this.addEvents();
                });
            });
        };

        this.setLastPos = function(pos) {
            $this.lastPosition = parseFloat(pos, 10);
        };

        this.init();
    }

    // Called once a vimeo player is loaded and ready to receive commands.
    // Only add events and make api calls after this function has been called.
    function ready(player_id) {
        new ct_api_Vimeo(player_id);
    }

})();


//
// +------------------------------------------------------------+
// | Watched a Video (Vimeo) -- END                             |
// +------------------------------------------------------------+
//

/**
 * Action name:    Watched a Video (YouTube)
 * Action created: 2014-11-10 18:38:44
 */
//
// +------------------------------------------------------------+
// | Watched a Video (YouTube) -- START                         |
// +------------------------------------------------------------+
//


// Dictionary of player id's and class instances
var ct_api_YouTube_players = {};

// State change callback
function ct_api_YouTube_stateChange(state, playerId) {
    var $this = ct_api_YouTube_players[playerId],
        currentTime = $this.player.getCurrentTime();

    if (state == 1) {
        // Playing
        $this.timer = setInterval(function() {
                          $this.startTimer($this);
                      }, 1000);
    } else {
        // Not playing
        clearInterval($this.timer);
    }
}

function ct_api_youtube_response_handler(response) {
    var data = response.data;

    try
    {
        var t = new _t_ct_pt('2-14',
                             3,
                             385);

        t.set_tpid(data.id);
        t.set_rcs(window.location.href,
                  data.title,
                  data.description,
                  data.thumbnail.sqDefault);

        t.track_action();
    }
    catch (err) {}
}


// YouTube player class
function ct_api_YouTube(playerId) {
    ct_api_YouTube_players[playerId] = this;

    this.player = document.getElementById(playerId);
    this.duration = this.player.getDuration();
    this.playerId = playerId;
    this.pointsAwarded = false;
    this.timeLimit = 30;
    this.timer;
    this.timeWatched = 0;
    this.videoUrl = this.player.getVideoUrl();
    this.videoId;

    this.startTimer = function($this) {
        $this.timeWatched++;

        if ($this.timeWatched >= $this.timeLimit && ! $this.pointsAwarded) {
            var script = document.createElement('script');
            script.src = 'https://gdata.youtube.com/feeds/api/videos/' + $this.videoId + '?v=2&alt=jsonc&callback=ct_api_youtube_response_handler';
            document.body.appendChild(script);

            $this.pointsAwarded = true;
        }
    };

    // Get videoId from url
    var paramsObj = {},
        paramsArray = this.videoUrl
                                .substring(this.videoUrl.lastIndexOf('?') + 1)
                                .split('&');

    for (var i = 0, length = paramsArray.length; i < length; i++) {
        var array = paramsArray[i].split('=');
        paramsObj[array[0]] = array[1];
    }

    this.videoId = paramsObj['v'];

    // If we want to use a percentage of the duration as the timeLimit
    // for awarding points e.g. 50%, do it here by updating timeLimit
    if (this.timeLimit > this.duration) {
        this.timeLimit = this.duration - 3;
    }

    // Subscribe to change event for player state
    window["youtube_onStateChange_" + playerId] = function(state) {
        ct_api_YouTube_stateChange(state, playerId);
    };

    this.player.addEventListener('onStateChange', "youtube_onStateChange_" + playerId);
}

// Called once a YouTube player has loaded
function onYouTubePlayerReady(playerId) {
    new ct_api_YouTube(playerId);
}


//
// +------------------------------------------------------------+
// | Watched a Video (YouTube) -- END                           |
// +------------------------------------------------------------+
//
