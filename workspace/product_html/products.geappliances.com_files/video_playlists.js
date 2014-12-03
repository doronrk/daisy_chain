/*jslint browser: true, vars: true, sloppy: true, regexp: true, white: true, nomen: true */
/*global console, jQuery, Handlebars, brightcove */
//-----------------------------------------------------------------------------
// Lines above are for jslint, the JavaScript verifier.  http://www.jslint.com/
//-----------------------------------------------------------------------------

if (!Object.extend) {
	// based on prototype.js.
	Object.extend = function(destination, source) {
		if (source === undefined) { return destination; }
		var property;
		for (property in source) {
			/*jslint forin: true */
			destination[property] = source[property];
		}
		return destination;
	};
}
if (!Function.prototype.bind) {
	// loosely based on prototype.js.
	Function.prototype.bind = function(context /*, args */) {
		if (arguments.length < 2 && context === undefined) { return this; }
		var __method = this;
		var curryArgs = Array.prototype.slice.call(arguments, 1);
		return function() {
			var allArgs = curryArgs.concat(Array.prototype.slice.call(arguments, 0));
			return __method.apply(context, allArgs);
		};
	};
}

function TabbedPlaylistPlayer(options) {
	// object constructor
	this.initialize(options);
}

var brightcove;			// make jslint happy

(function($) {

	function $NEW(tagName, properties, attributes) {
		// a shortcut for creating a new element and assigning
		// optional properties and optional attributes to it.
		var a, element;
		element = document.createElement(tagName);
		if (properties) {
			Object.extend(element, properties);
		}
		if (attributes) {
			/*jslint forin: true */
			for (a in attributes) {
				element.setAttribute(a, attributes[a]);
			}
		}
		return element;
	}

	function $ID(id) {
		// a shortcut.
		var element = document.getElementById(id);
		return element;
	}

	function $PARAM(element, name, value) {
		// create a <param name='...' value='...' /> element
		// with the specified name and value attributes, and
		// append it to the specified element as a child.
		var param = $NEW("param");
		param.setAttribute("name", name);
		param.setAttribute("value", value);
		element.appendChild(param);
		return param;
	}

	function $EMPTY(element) {
		// remove all children from the specified element.
		while (element.hasChildNodes()) {
			element.removeChild(element.childNodes[0]);
		}
	}

	function $NEWID(prefix) {
		// Sometimes you might have a DOM element generated
		// dynamically and you want to pass it as an argument
		// to an API call that only takes a DOM element ID;
		// you can use $NEWID to generate an ID for it.
		//
		// Also, sometimes you have an anonymous function you
		// want to pass as a argument to an API call that
		// requires a function name and can't be passed a
		// function reference; you can also use $NEWID to
		// generate a function name:
		//
		//     var fooHandler = function(...) { ... };
		//     var name = $NEWID("fooHandler");
		//     window[name] = fooHandler;
		var id = new Date().getTime();
		id += "_" + Math.random().toString().replace(/[^A-Za-z0-9\_]+/g, "");
		if (prefix) { id = prefix + "_" + id; }
		return id;
	}

	function $ADD_EVENT(obj, event, handler) {
		// A reasonably browser-agnostic function to add
		// event handlers to a DOM object.
		var old_handler;
		var on_event = "on" + event;
		if (window.addEventListener) {
			// good browsers and IE9+
			obj.addEventListener(event, handler, false);
		} else if (window.attachEvent) {
			// IE5 to IE8
			obj.attachEvent(on_event, handler);
		}
	}

	var DEBUG = /\bdebug\b/.test(location.search);
	function $LOG() {
		if (DEBUG) {
			try { console.log(Array.prototype.slice.call(arguments, 0)); }
			catch (e) { }
		}
	}

	Object.extend(TabbedPlaylistPlayer, {
		DEFAULTS: {
			selectorTemplateContent: ("{{#playlistsData}}" +
						  "<a class='playlistTab' onclick='{HANDLER:onPlaylistSelect}({{nextPlaylistTabIndex}}); return false;'>{{shortDescription}}</a>" +
						  "{{/playlistsData}}"),
			playlistTemplateContent: ("{{#videos}}" +
						  "<div class='playlistItem'>" +
						  "  <a onclick='{HANDLER:playVideo}({{id}}, {{playlistTabIndex}}, {{nextPlaylistItemIndex}}); return false;'>" +
						  "    <div class='thumbnail'><img class='thumbnail' height='60' width='80' src='{{thumbnailURL}}'/></div>" +
						  "    <div class='description'>" +
						  "      <p class='title'>{{displayName}}</p>" +
						  "      <p>{{shortDescription}}</p>" +
						  "    </div>" +
						  "    <div style='clear: both;'></div>" + 
						  "  </a>" +
						  "</div>" +
						  "{{/videos}}"),
			playerID:              1910171499001,
			playerKey:             "AQ~~,AAABAWGODxk~,hLHEX2tm6AFlgSDzRIBPGX7yjI__nHLT",
			playerWidth:           486,
			playerHeight:          546,
			playerBackgroundColor: "#ffffff",
			playlists:             []
		}
	});

	Object.extend(TabbedPlaylistPlayer.prototype, {

		createNewHandlerId: function(name) {
			var id = $NEWID(name);
			this.handlerId[name] = id;
			window[id] = this[name].bind(this);
		},

		initialize: function(options) {
			var that = this;
			
			Object.extend(this, TabbedPlaylistPlayer.DEFAULTS);
			Object.extend(this, options);

			this.handlerId = {};

			if (!this.container) {
				this.container = $ID("videoPlaylistContainer");
			} else {
				if (typeof this.container === "string") {
					this.container = $ID(this.container);
				} else if (this.container.jquery) { // is a jQuery object
					this.container = this.container.get(0);
				}
			}

			if (!this.container) {
				return;
			}

			this.cachedPlaylistData = {};

			$EMPTY(this.container);
			this.playlistSelector = $NEW("div", { className: "playlistSelector" });
			this.player           = $NEW("div", { className: "player" });
			this.playlist         = $NEW("div", { className: "playlist" });
			this.loadingMessage   = $NEW("div", { className: "loadingMessage" });
			this.playerContainer  = $NEW("div", { className: "playerContainer" });

			$(this.playlistSelector).hide();
			
			this.loadingMessage.appendChild(document.createTextNode("Loading video playlists"));
			this.playerContainer.appendChild(this.playlistSelector);
			this.playerContainer.appendChild(this.player);
			this.playerContainer.appendChild(this.playlist);
			this.container.appendChild(this.loadingMessage);
			this.container.appendChild(this.playerContainer);

			this.createNewHandlerId("onTemplateReady");
			this.createNewHandlerId("onPlaylistSelect");
			this.createNewHandlerId("playVideo");

			["selectorTemplateContent", "playlistTemplateContent"].forEach(function(name) {
				this[name] = this[name].replace(/\{HANDLER:([A-Za-z0-9_]+)\}/g, function(match, handlerName) {
					return that.handlerId[handlerName];
				});
			}, this);

			this.myExperience = $NEW("object", { className: "BrightcoveExperience", id: $NEWID("BrightcoveExperience") });
			$PARAM(this.myExperience, "bgcolor", this.playerBackgroundColor);
			$PARAM(this.myExperience, "width", this.playerWidth);
			$PARAM(this.myExperience, "height", this.playerHeight);
			$PARAM(this.myExperience, "playerID", this.playerID);
			$PARAM(this.myExperience, "playerKey", this.playerKey);
			$PARAM(this.myExperience, "isVid", "true");
			$PARAM(this.myExperience, "isUI", "true");
			$PARAM(this.myExperience, "wmode", "transparent");
			$PARAM(this.myExperience, "dynamicStreaming", "true");
			$PARAM(this.myExperience, "htmlFallback", "true");
			$PARAM(this.myExperience, "includeAPI", "true");
			$PARAM(this.myExperience, "templateReadyHandler", this.handlerId.onTemplateReady);
			if (location.protocol === "https:") {
				$PARAM(this.myExperience, "secureConnections", "true");
			}
			if (this.bufferVideoID) {
				$PARAM(this.myExperience, "@videoPlayer", this.bufferVideoID);
			}

			this.player.appendChild(this.myExperience);
			
			this.obj = {};
			this.obj.playlistsData = [];
			
			this.playlistTabIndex = -1;
			Handlebars.registerHelper('nextPlaylistTabIndex', function() {
				that.playlistTabIndex += 1;
				return that.playlistTabIndex;
			});
			Handlebars.registerHelper('playlistTabIndex', function() {
				return that.playlistTabIndex;
			});

			this.playlistItemIndex = -1;
			Handlebars.registerHelper('nextPlaylistItemIndex', function() {
				that.playlistItemIndex += 1;
				return that.playlistItemIndex;
			});
			Handlebars.registerHelper('playlistItemIndex', function() {
				return that.playlistItemIndex;
			});

			this.nowPlayingPlaylistTabIndex = -1;
			this.nowPlayingPlaylistItemIndex = -1;

			brightcove.createExperiences();
		},
		onTemplateReady: function(event) {
			// NOTE: in Chrome and Safari, this gets
			// called a second time after a video player
			// is hidden then shown again...
			
			if (!this.brightcove) {
				this.brightcove = {};
			}

			// ...then these things need to get done the
			// second time after hide then show again...
			this.brightcove.player = brightcove.api.getExperience(this.myExperience.id);
			this.brightcove.videoPlayer = this.brightcove.player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
			this.brightcove.contentModule = this.brightcove.player.getModule(brightcove.api.modules.APIModules.CONTENT);

			$(this.playlist).find(".playlistItem").removeClass("selected");
			this.nowPlayingPlaylistItemIndex = -1;

			// ...but this doesn't.
			if (!this.playlistDataAlreadyBuilt) {
				// start retrieving the playlists
				this.buildPlaylistsData(0);
				this.playlistDataAlreadyBuilt = true;
			}
		},
		buildPlaylistsData: function(counter) {
			var that = this;
			this.brightcove.contentModule.getPlaylistByID(
				this.playlists[counter],
				function(jsonData) {
					that.cachedPlaylistData[counter] = jsonData;
					that.obj.playlistsData.push(jsonData);
					that.loadingMessage.appendChild(document.createTextNode("."));
					if (counter < that.playlists.length - 1) {
						// not done yet, function increments the counter and recalls itself
						counter++;
						that.buildPlaylistsData(counter);
					} else {
						// now we're done, buid the selector
						that.buildPlaylistSelector();
					}
				}
			);
		},
		buildPlaylistSelector: function() {
			this.playlistTabIndex = -1;
			var template = Handlebars.compile(this.selectorTemplateContent);
			var data = this.obj;
			var results = template(data);
			this.playlistSelector.innerHTML = results;

			$(this.loadingMessage).slideUp(200);
			$(this.playlistSelector).slideDown(200);

			this.onPlaylistSelect(0);
		},
		onPlaylistSelect: function(tabIndex) {
			this.playlistTabIndex = tabIndex;
			this.playlistItemIndex = -1;
			var template = Handlebars.compile(this.playlistTemplateContent);
			var data = this.obj.playlistsData[tabIndex];
			var results = template(data);
			this.playlist.innerHTML = results;

			$(this.playlistSelector).find(".playlistTab").removeClass("selected");
			$(this.playlistSelector).find(".playlistTab").eq(tabIndex).addClass("selected");
			if (tabIndex === this.nowPlayingPlaylistTabIndex) {
				$(this.playlist).find(".playlistItem").removeClass("selected");
				$(this.playlist).find(".playlistItem").eq(this.nowPlayingPlaylistItemIndex).addClass("selected");
			}
		},
		playVideo: function(videoID, tabIndex, itemIndex) {
			this.brightcove.videoPlayer.loadVideoByID(videoID);
			$(this.playlist).find(".playlistItem").removeClass("selected");
			$(this.playlist).find(".playlistItem").eq(itemIndex).addClass("selected");
			this.nowPlayingPlaylistTabIndex = tabIndex;
			this.nowPlayingPlaylistItemIndex = itemIndex;
		},
		pause: function() {
			if (this.brightcove && 
			    this.brightcove.videoPlayer) {
				this.brightcove.videoPlayer.pause(true);
			}
		}
	});

	var deferred = new $.Deferred();
	if (location.protocol === "https:") {
		$.getScript("https://sadmin.brightcove.com/js/BrightcoveExperiences.js", function() {
			deferred.resolve();
		});
	} else {
		$.getScript("http://admin.brightcove.com/js/BrightcoveExperiences.js", function() {
			deferred.resolve();
		});
	}

	$.fn.extend({
		startTabbedPlaylistPlayer: function(options) {
			return this.each(function() {
				var that = this;
				deferred.done(function() {
					var p = new TabbedPlaylistPlayer(options);
					$(that).data("tabbedPlaylistPlayer", p);

					// ####################################################
					// see /scripts/spec_2012.js for details on how
					// "tab-visibility-change" events are triggered.
					// ####################################################

					$(that).parents(".tab_content").bind("tab-visibility-change", function() {
						if ($(this).is(":hidden")) {
							p.pause();
						}
					});
				});
			});
		}
	});
	
}(jQuery));
