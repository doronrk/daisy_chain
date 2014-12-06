window.CnetReviewInline = (function () {

	var defaults = {
		videoContainerSelector: "#cnetFirstLookVideo",

		videoPlayer: {
			flashPlayerUrl: "from server",
			flashPlayerConfigUrl: "from server",
			hi5PlayerUrl: "from server",
			hi5PlayerConfigUrl: "from server",

			embedContainerId: "CCLPInlineContentcnetFirstLookVideo",
			previewImageUrl: "from server"
		},

		video: {
			flashUrl: "data-flashvideo-url",
			flashWidth: "data-flashvideo-width",
			flashHeight: "data-flashvideo-height",

			mp4Url: "data-mp4video-url",
			mp4Width: "data-mp4video-width",
			mp4Height: "data-mp4video-height"
		}
	};

	function initialize () {
		var $videoContainer = ccsJq(this.o.videoContainerSelector);

		if ($videoContainer.length == 0)
			return;

		if (ccsJq("#" + this.o.videoPlayer.embedContainerId).length == 0) {
			ccsJq("<div>")
				.attr("id", this.o.videoPlayer.embedContainerId)
				.appendTo(this.o.videoContainerSelector);
		}

		parseVideoData.call(this, $videoContainer);

		var html5Version = isMp4VideoSupported() && isIosDevice();

		if (html5Version) {
			initCbsiHi5Player.call(this, this.mp4Video.url, this.mp4Video.width, this.mp4Video.height);
		} else {
			var video = this.flashVideo || this.mp4Video;
			initCbsiFlashPlayer.call(this, video.url, video.width, video.height);
		}
	}

	function parseVideoData ($videoContainer) {
		var o = this.o.video;

		var flashVideo = {
			url: $videoContainer.attr(o.flashUrl),
			width: $videoContainer.attr(o.flashWidth),
			height: $videoContainer.attr(o.flashHeight)
		};

		if (flashVideo.url) {
			this.flashVideo = flashVideo;
		}

		var mp4Video = {
			url: $videoContainer.attr(o.mp4Url),
			width: $videoContainer.attr(o.mp4Width),
			height: $videoContainer.attr(o.mp4Height)
		};

		if (mp4Video.url) {
			this.mp4Video = mp4Video;
		}
	}

	function initCbsiFlashPlayer(videoUrl, width, height) {
		var o = this.o.videoPlayer;

		var flashParams = {
			wmode: "opaque",
			quality: "high",
			allowScriptAccess: "always",
			allowFullScreen: true
		};

		var flashVars = {
			partner: "windemo",
			smode: "fit",
			file: videoUrl,
			uvpc: o.flashPlayerConfigUrl
		};
		
		if (o.previewImageUrl) {
			flashVars.thumbnail = o.previewImageUrl;
		}

		swfobject.embedSWF(
			o.flashPlayerUrl,
			o.embedContainerId,
			width,
			height,
			"9.0.124.0",
			false,
			flashVars,
			flashParams);
	}

	function initCbsiHi5Player(videoUrl, width, height) {
		var o = this.o.videoPlayer;

		ccsJq("#" + o.embedContainerId)
			.css("width", width)
			.css("height", height);

		// this player requires some global variables and callbacks.
		window.uvp_sOpts = {
			partner: "cbsiCcs",
			nativeControls: true,
			autoHide: false,
			previewImg: o.previewImageUrl,
			uvpc: o.hi5PlayerConfigUrl
		};

		window.onCBSIPlayerReady = function (player) {
			if (player) {
				window.uvpHi5Player = player;
			}
		};

		window.onCBSIPlayerLoaded = function () {
			var videoOptions = {
				isAd: false,
				profile: "prog",
				startTime: 0,
				endTime: -1
			};

			uvpHi5Player.loadVideoByUrl(videoUrl, videoOptions);
		};

		ccsJq("<script>")
			.attr("src", o.hi5PlayerUrl)
			.appendTo("head");

		// waiting for uvpHi5Player script was loaded.
		(function onUvpHi5PlayerScriptDownloaded () {
			if (!window.uvpHi5Player) {
				setTimeout(onUvpHi5PlayerScriptDownloaded, 100);
				return;
			}

			uvpHi5Player.addEventJSCallback("onPlayerLoaded_cbsi", "onCBSIPlayerLoaded");
			uvpHi5Player.initialize(o.embedContainerId);
		}());
	}

	function isMp4VideoSupported () {
		var v = document.createElement('video');
		return !!(v.canPlayType && v.canPlayType('video/mp4').replace(/no/, ''));
	}

	function isIosDevice () {
		return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
	}

	function cnetFullTextReview (options) {
		this.o = ccsJq.extend(true, {}, defaults, options);

		initialize.call(this);
	}

	return cnetFullTextReview;
}());
