if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} }; 

/*
 * jQuery lib v1.4.0
 * Contains:
 * - Spotlight
 * - Video Player
 * - Youtube
 * - Video Gallery
 * - Products
 * - Related Links
 * - Read More
 * - Get Likes
 * - Ratings
 * - Collapse
 * - Overlay
 * - DropDown
 * - Cookie
 * - messageBox
 * - localStorage
 * - pdpVideo(fullsite)

 * CHANGE LOG:
 *  - Spotlight
 *   - Added to onSnap logic so function is only called if slide is switched
 *	 - Added Logic to change sensitivity to 15 if user is on Android Device
 *   - Added Logic to allow max slide height 	
 * - Read More
 *   - Added option to choose whether or not to display arrow
 *	 - Added option to track CoreMetrics on Advanced Search 
 * - Youtube
 *   - Updated to disable annotations by default
 *   - Added 'annotate' boolean option to allow for annotations to be selectively enabled 
 * 
 */

var FBloaded = false;
function FBSetup() {
	if($('#fb-root').html() == null) {
		$('body').prepend('<div id="fb-root"></div>');
		// Load the SDK's source Asynchronously
		// Note that the debug version is being actively developed and might 
		// contain some type checks that are overly strict. 
		// Please report such bugs using the bugs tool.
		(function(d, debug){
		 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement('script'); js.id = id; js.async = true;
		 js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
		 ref.parentNode.insertBefore(js, ref);
		}(document, /*debug*/ false));
		
		window.fbAsyncInit = function() {
			// init the FB JS SDK
			FB.init({
			  status     : true, // check the login status upon init?
			  cookie     : true, // set sessions cookies to allow your server to access the session?
			  xfbml      : true  // parse XFBML tags on this page?
			});
			FBloaded = true;
		}
	}
}

/* START SPOTLIGHT */
		
(function($) { // Hide scope, no $ conflict

/* Spotlight manager. */
function Spotlight() {
	this.id = null;
	this.isPaused = false;
	this.curSlide = 0;
	this.swiping = false;
	this.numSlides = 0;
	this.interval;
	this.initialStartX = 0;
	this.initialPos = 0;
	this.touchX = 0;
	this.xChange = 0;
	this.flag = false;
	this.prevSlide = 0;
	this.TOUCH_DEVICE = false;
	this._defaults = {
		start: 0,
		controls: "", // Container for Controls
		transition: "fade", // Transition Type
		transitionLength: .5, // Time in Seconds to transition
		intervalLength: "5", // Time in Seconds between transitions
		mouseAction: "click", // Mouse Action
		keyboard : true, // Toggle keyboard controls
		swipe : true, // Toggle swiping on mobile
		sensitivity : 30, // how easy it is to swipe, the higher the number the harder it is
		rotate: true, // Toggle to Auto Rotate		
		maxR: "100", // Max Number Per Row	
		slideWidth: null, // Slide Width
		slideHeight: 'auto', //Sets max slide height
		endStop: false, // Toggle to stop at ends
		skipClass : '',
		reachbeginning: null, // function call when hit beginning
		reachending: null, // function call when hit end
		beginning: null, // function call when hit beginning
		ending: null, // function call when hit end
		onSnap: null // function call when slide switches
	},
	
	this.cycleSlides = function() {
		var obj = this;
		this._defaults.rotate = true;
		clearInterval(this.interval);
		this.interval = setInterval(function() {obj.setTrans();obj.nextSlide();}, (this._defaults.intervalLength*1000));
		$("#"+this.id+ " > .slide_buttons > .sl_play").hide();
		$("#"+this.id+ " > .slide_buttons > .sl_pause").show();
		this.isPaused = false;
	},
	
	this.pauseSlides = function () {
		clearInterval(this.interval);
		$("#"+this.id+ " > .slide_buttons > .sl_play").show();
		$("#"+this.id+ " > .slide_buttons > .sl_pause").hide();
		this.isPaused = true;
	},
	
	this.init = function() {
		var obj = this, $this = $("#" + obj.id);
		if(obj._defaults.controls == '') {
			obj._defaults.controls = obj.id;	
		}
		if(obj._defaults.sensitivity >= 30){
			if (navigator.userAgent.match(/android/ig)) {
				 obj._defaults.sensitivity = 15;
			}
		}
		
		if(obj._defaults.skipClass != '') {
			$this.find(".slide_content > ul > li."+obj._defaults.skipClass).each(function() {
				$(this).remove();
			});
			$this.find(".slide_controls > ul > li."+obj._defaults.skipClass).each(function() {
				$(this).remove();
			});
		}
		obj.numSlides = $this.find(".slide_content > ul > li").length;
		
		if(obj._defaults.maxR <= obj.numSlides) {
			obj.numSlides = obj._defaults.maxR;
			for(var i = obj.numSlides-1; i < $("#"+obj.id+ " > .slide_content > ul li").length; i++) {
				$this.find(".slide_content > ul > li").eq(i).remove();
				$this.find(".slide_controls > ul > li").eq(i).remove();
			}
		}
		obj.TOUCH_DEVICE = (typeof document.ontouchstart != "undefined") ? true : false;
		if(obj.TOUCH_DEVICE && obj._defaults.swipe) {
			$this.addClass("slider_container");
			$this.find(".slide_content").addClass("slider_content");
			
			$this.on("touchstart", function(event) {
				obj.removeTrans();
				obj.swiping = false;
				obj.pauseSlides();
				var touchStart = event.originalEvent.touches[0];
				obj.initialStartX = touchStart.clientX;
				obj.touchX = obj.initialStartX;
				obj.initialPos = parseInt($(this).find(".slide_content > ul").css("left"));
				//delete touchStart;
				
				$this.on("touchmove", function(event) {
					if(obj.numSlides > 1) {
						//$("#"+obj.id+ " > .slide_content > ul").addClass("no_trans");
						var touch = event.originalEvent.touches[0];
						obj.touchX = touch.clientX;
						//obj.xChange = obj.initialPos - parseInt($("#" + obj.id+" > .slide_content > ul").css("left"));
						obj.xChange = (obj.initialStartX - obj.touchX);
						if(Math.abs(obj.xChange) > obj._defaults.sensitivity && !obj.swiping) {
							event.preventDefault();
							$(this).find(".slide_content > ul").css("left", obj.initialPos - parseInt(obj.initialStartX-obj.touchX));
							$(this).find(".slide_content > ul > li a").on("click", function() {
								return false;
							});
							obj.swiping = true;
						}
						obj.swiping = false;
						//delete touch;
					}
				});
				$this.on("touchend", function(event) {
					$this.off("touchmove touchend");
					//$("#"+obj.id+ " > .slide_content > ul").removeClass("no_trans");
					//console.log(parseInt(obj.initialStartX-obj.touchX));
					if(parseInt(obj.initialStartX-obj.touchX) > obj._defaults.sensitivity) {
						if(obj.curSlide == obj.numSlides - 1) {
							obj.curSlide--;
						}
						obj.setTrans();
						obj._defaults.rotate = false;
						obj.nextSlide();
					} else if(parseInt(obj.initialStartX-obj.touchX) < -obj._defaults.sensitivity) {
						if(obj.curSlide == 0) {
							obj.curSlide++;
						}
						obj.setTrans();
						obj._defaults.rotate = false;
						obj.previousSlide();
						
					} else {
						obj.removeTrans();
						//snapTo(curSlide);	
					}
					$(this).find(".slide_content > ul > li a").off("click");
					obj.swiping = false;
				});
			});
		}
		$(document).ready(function(e) {
			obj.resizeSpotlight();
        });
		$(window).resize(function() {
			obj.resizeSpotlight();
		});
		this.createSlide();
	},
	
	this.removeTrans = function() {
		$("#"+this.id+ " > .slide_content > ul").css(
			{
				WebkitTransition: 'none',
				MozTransition: 'none',
				MsTransition: 'none',
				transition: 'none'
			}
		);
	},
	
	this.setTrans = function() {
		$("#"+this.id+ " > .slide_content > ul").css(
			{
				WebkitTransition: this._defaults.transitionLength + 's',
				MozTransition: this._defaults.transitionLength + 's',
				MsTransition: this._defaults.transitionLength + 's',
				transition: this._defaults.transitionLength + 's'
			}
		);
	},
	
	this.resizeSpotlight = function() {
		var obj = this, $this = $("#" + this.id);
		obj.removeTrans();
		obj._defaults.slideWidth = $this.find(".slide_content").width();
		$this.find(".slide_content > ul > li").width(obj._defaults.slideWidth);
		$this.find(".slide_content > ul > li > a > img").css('max-height', obj._defaults.slideHeight + 'px');
		$this.find(".slide_content > ul").width(obj._defaults.slideWidth * obj.numSlides);	
		obj.snapTo(obj.curSlide);
		obj.setTrans();

	},
	
	this.createSlide = function() {
		var obj = this, $this = $("#" + this.id), $controls = $("#"+obj._defaults.controls);
		//obj.resizeSpotlight();
		
		var btnWidth = $this.width() / obj.numSlides;
		$controls.find(".slide_controls > ul > li").css("width", ((btnWidth/$this.width()) * 100) + "%");
		
		$this.find(".slide_content > ul > li").each( function(index) {
			$(this).addClass("slideitem"+index);
		});
		$controls.find(".slide_controls > ul > li a").each( function(index) {
			$(this).addClass("slide"+index + " slide_control");
			//$this.addClass("slide_control");
		});
		if(obj._defaults.mouseAction == "hover") {
			$controls.find(".slide_controls > ul > li").mouseover(function () {
				obj.snapTo($controls.find(".slide_controls > ul > li").index(this));
				clearInterval(obj.interval);
				return false;
			});
			$controls.find(".slide_controls > ul > li").mouseout(function (){
				if(obj.isPaused == false) {
					obj.cycleSlides();
				}
			});
		} else {
			$controls.find(".slide_controls > ul > li").bind('click touchstart', function() {
				if(!obj.flag) {
					obj.flag = true;
					obj._defaults.rotate = false;
					obj.snapTo($controls.find(".slide_controls > ul > li").index(this));
					setTimeout(function(){
						obj.flag = false;
					}, 100);
					return false;
					// do something
				}
				
			});
		}
		$(document).keydown(function(event) {
			if(obj._defaults.keyboard) {
				switch (event.keyCode) {
					case 37: obj._defaults.rotate = false; obj.previousSlide(); break;
					case 39: obj._defaults.rotate = false; obj.nextSlide(); break;
				}
			}
		});
		if(obj._defaults.keyboard) {
			$('input').focus(function(){obj._defaults.keyboard = false;});
			$('input').blur(function(){obj._defaults.keyboard = true;});
		}
		if(this._defaults.transition == "slide") {
			$this.find(".slide_content > ul").addClass('slideAnim');
		} else if(this._defaults.transition == "fade") {
			$this.find(".slide_content > ul").css("position", "relative");
			$this.find(".slide_content > ul > li").each( function(index) {
				$this.css("top", "0");
				$this.css("left", "0");
			});
		}







		
		$this.find(".slide_controls, .slide_buttons").show();
		//spotlight sometimes not showing, about every 5th time, fix for that
		$this.find(".slide_content").css("display", "block");
		//$controls.find(".slide_controls").show();
		//$this.find(".slide_buttons").show();
		//$("#"+this._defaults.controls+ " > .slide_controls").show();
		//$("#"+this.id+ " > .slide_buttons").show();
		$this.find(".spotbackup").hide();
		$this.find(".slide_content > ul").removeClass("no_trans");
		
		$this.find(".slide_content").on('mouseover', function() {
			obj.pauseSlides();
			if(!obj.isPaused) 
				obj.isPaused = false;

		});
		$this.find(".slide_content").on('mouseout', function() {
			if(obj._defaults.rotate) 
				obj.cycleSlides();

			if(!obj.isPaused) 
				obj.isPaused = false;

		});
		if(this._defaults.start > this.numSlides) 
			this._defaults.start = this.numSlides - 1;	
		this.snapTo(this._defaults.start, false);
		if(this._defaults.rotate) 
			this.cycleSlides();
			
		if(typeof this.callback == "function") this.callback(); else {};
	},
	this.previousSlide = function() {
		//this.setTrans();
		if(this.curSlide == 1) {
			if(typeof this._defaults.reachbeginning == "function") {
				this._defaults.reachbeginning(this.instance);
			} 
			this.snapTo(this.curSlide - 1);
		} else if(this.curSlide == 0) {
			if(!this._defaults.endStop){
				if(typeof this._defaults.beginning == "function") {
					this._defaults.beginning(this.instance);
				} else {
					this.snapTo(parseInt(this.numSlides) - 1);
				}
			}
		} else {
			this.snapTo(this.curSlide - 1);
		}
	},
	this.nextSlide = function() {
		//this.setTrans();
		if(this.curSlide == this.numSlides - 2) {
			if(typeof this._defaults.reachending == "function") {
				this._defaults.reachending(this.instance);
			} 
			this.snapTo(parseInt(this.curSlide) + 1);
		} else if(this.curSlide == this.numSlides - 1) {
			if(!this._defaults.endStop){
				if(typeof this._defaults.ending == "function") {
					this._defaults.ending(this.instance);
				} else {
					this.snapTo(0);
				}
			}
		} else {
			this.snapTo(parseInt(this.curSlide) + 1);
		}

	},
	
	this.snapTo = function(num, start) {
		var obj = this, $this = $("#" + this.id), $controls = $("#" + obj._defaults.controls);
		
		obj._defaults.slideWidth = $this.width();
		this.pauseSlides();
		
		$this.find('.slideitem' + obj.curSlide).removeClass('selected');
		$this.find('.slideitem' + num).addClass('selected');
		$controls.find(".slide"+obj.curSlide).removeClass("selected");
		$controls.find(".slide"+num).addClass("selected");
		
		if(obj._defaults.transition == "slide") {
			var nextX = -(this._defaults.slideWidth * num);
			if (/msie/.test(navigator.userAgent.toLowerCase())) {
				$this.find(".slide_content > ul").stop().addClass("no_trans").animate({

					left: nextX
				}, obj._defaults.transitionLength * 1000, function(){
				});
				/*$("#"+obj.id+ " > .slide_content > ul").addClass("no_trans");
				$("#"+obj.id+ " > .slide_content > ul").animate({
					left: nextX
				}, obj._defaults.transitionLength * 1000, function(){
				});*/
			} else {
				obj.setTrans();
				$this.find(".slide_content > ul").css('left', nextX);
			}
		} else if(obj._defaults.transition == "fade") {
			$this.find(".slide_content > ul").removeClass("no_trans").addClass("no_trans");
			//$this.find(".slide_content > ul").addClass("no_trans");
			$this.find(".slide_content > ul > .slideitem"+num).css("display", "inline-block");
			$this.find(".slide_content > ul > li").stop();
			
			$this.find(".slide_content > ul > li.fade_in").fadeTo(obj._defaults.transitionLength * 1000, 0);
			$this.find(".slide_content > ul > .slideitem"+num).fadeTo(obj._defaults.transitionLength * 1000, 1, obj.updateFade(num));
		}
		obj.curSlide = num;
		
		if(this._defaults.rotate) 
			this.cycleSlides();
		if(typeof this._defaults.onSnap == "function" && start !== false && this.curSlide != this.prevSlide ) 
			this._defaults.onSnap(num);
		
		this.prevSlide = this.curSlide;

	},
	
	this.updateFade = function(num) {
		$("#"+this.id+ " > .slide_content > ul > li").addClass("no_trans").css("top", "-1000px");
		$("#"+this.id+ " > .slide_content > ul > .slideitem"+this.curSlide).css("top", "0");
		$("#"+this.id+ " > .slide_content > ul > .slideitem"+num).css("top", "0");
		$("#"+this.id+ " > .slide_content > ul > li").removeClass("no_trans");
		
		$("#"+this.id+ " > .slide_content > ul > li").removeClass("fade_out fade_in");
		$("#"+this.id+ " > .slide_content > ul  >li").addClass("fade_out");
		$("#"+this.id+ " > .slide_content > ul > .slideitem"+num).removeClass("fade_out").addClass("fade_in");
	}
}

$.fn.spotlight = function(options, callback) {
	$.spotlight = new Spotlight(); // singleton instance
	$.spotlight.instance = $(this);
	$.spotlight.id = $(this).attr("id");
	$.spotlight.callback = callback;
	for(prop in options){
		$.spotlight._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		$.spotlight.init();
	}
	return $.spotlight;
};

	
})(jQuery);

/* END SPOTLIGHT */


/* START VIDEO PLAYER */
(function($) { // Hide scope, no $ conflict
/* Spotlight manager. */
function VideoPlayer() {
	this.id = "";
	this.hasFlash = true;
	this.playerVersion = swfobject.hasFlashPlayerVersion("9.0.0"); // returns a JavaScript object
    this.code = '';
	this._defaults = {
		baseURL: "/ns/flash/video-player/", // Base URL
		videoDomain: "", // Base URL
		title: "Video", // Title of video
		video: "", // Video File URL
		initPlay: "true", // Initial Play //true=paused   //false=play
		height: "360", // Player Width
		width: "640", // Player Height
		sport: "-_-", // Specifies Sport for Coremetrics
		brand: "-_-", // Specifies Brand for Coremetrics
		productType: "-_-", // Specifies Product Type for Coremetrics
		marketingType: "Promo", // Specifies Marketing Type for Coremetrics
		gender: "-_-", // Specifies Gender for Coremetrics
		intro: "false", // Toggle Intro
		outro: "false", // Toggle Outro
		thumbnail: "" // Video Thumbnail
	},
	this.init = function() {
		if(!this.playerVersion) {
			this.hasFlash = false;
		}
		this.code = '';
		if(this.hasFlash) {
			this.code = '<object width="' + this._defaults.width + '" height="' + this._defaults.height + '" id="video_player" name="vid"><param name="movie" value="' + this._defaults.baseURL + 'player.swf"></param><param name="id" value="video_player"></param><param name="allowFullScreen" value="true"><param name="flashVars" value="flv='+this._defaults.video+'&vTitle='+this._defaults.title+'&brand='+this._defaults.brand+'&sport='+this._defaults.sport+'&marketingtype='+this._defaults.marketingType+'&gender='+this._defaults.gender+'&producttype='+this._defaults.productType+'&initialPlay='+this._defaults.initPlay+'&intro=false&outro=false"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param><embed src="' + this._defaults.baseURL + 'player.swf" type="application/x-shockwave-flash" id="video_player" name="vid" allowscriptaccess="always" allowfullscreen="true" width="' + this._defaults.width + '" height="' + this._defaults.height + '" wmode="transparent" flashVars="' + 'flv=' + this._defaults.videoDomain + this._defaults.video+'&vTitle='+this._defaults.title+'&brand='+this._defaults.brand+'&sport='+this._defaults.sport+'&marketingtype='+this._defaults.marketingType+'&gender='+this._defaults.gender+'&producttype='+this._defaults.productType+'&initialPlay='+this._defaults.initPlay+'&intro=false&outro=false' + '"></embed></object>';
		} else {
			var videoFormat = this._defaults.video.split('.');
			if (videoFormat[videoFormat.length-1] == 'mp4') {
				this.code = '<video id="video_player" width="' + this._defaults.width + '" height="' + this._defaults.height+'"';
				if(this._defaults.initPlay == "false") {
					this.code += ' autoplay';
				}
				this.code += ' controls="controls" poster="' + this._defaults.thumbnail + '">'
				this.code += '<source src="' + this._defaults.videoDomain + this._defaults.video + '" type="video/mp4" />'
				this.code += 'Your browser does not support the video tag.'
				this.code += '</video>';
			} else {
				this.code = 'This video is not formatted for your device';
			}
		}
		this.id.html(this.code);
		if(typeof this.callback == "function") this.callback(); else {};
	}
}
function enableVideoClicks() {
	var videos = document.getElementsByTagName('video') || [];
	for (var i = 0; i < videos.length; i++) {
		// TODO: use attachEvent in IE
		videos[i].addEventListener('click', function(videoNode) {
			return function() {
				videoNode.play();
			};
		}(videos[i]));
	}
}
$.fn.videoplayer = function(options, callback) { 
	$.videoplayer = new VideoPlayer(); // singleton instance
	$.videoplayer.id = $(this);
	for(prop in options){
		$.videoplayer._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		$.videoplayer.init();
	}
	return $.videoplayer;
};

})(jQuery);

var swfobject=function(){function v(){if(n.readyState=="complete"){n.parentNode.removeChild(n);w()}}function w(){if(r){return}if(t.ie&&t.win){var a=J("span");try{var b=h.getElementsByTagName("body")[0].appendChild(a);b.parentNode.removeChild(b)}catch(c){return}}r=true;if(o){clearInterval(o);o=null}var d=j.length;for(var e=0;e<d;e++){j[e]()}}function x(a){if(r){a()}else{j[j.length]=a}}function y(b){if(typeof g.addEventListener!=a){g.addEventListener("load",b,false)}else{if(typeof h.addEventListener!=a){h.addEventListener("load",b,false)}else{if(typeof g.attachEvent!=a){K(g,"onload",b)}else{if(typeof g.onload=="function"){var c=g.onload;g.onload=function(){c();b()}}else{g.onload=b}}}}}function z(){var a=k.length;for(var b=0;b<a;b++){var c=k[b].id;if(t.pv[0]>0){var d=I(c);if(d){k[b].width=d.getAttribute("width")?d.getAttribute("width"):"0";k[b].height=d.getAttribute("height")?d.getAttribute("height"):"0";if(L(k[b].swfVersion)){if(t.webkit&&t.webkit<312){A(d)}N(c,true)}else{if(k[b].expressInstall&&!s&&L("6.0.65")&&(t.win||t.mac)){B(k[b])}else{C(d)}}}}else{N(c,true)}}}function A(a){var c=a.getElementsByTagName(b)[0];if(c){var d=J("embed"),e=c.attributes;if(e){var f=e.length;for(var g=0;g<f;g++){if(e[g].nodeName=="DATA"){d.setAttribute("src",e[g].nodeValue)}else{d.setAttribute(e[g].nodeName,e[g].nodeValue)}}}var h=c.childNodes;if(h){var i=h.length;for(var j=0;j<i;j++){if(h[j].nodeType==1&&h[j].nodeName=="PARAM"){d.setAttribute(h[j].getAttribute("name"),h[j].getAttribute("value"))}}}a.parentNode.replaceChild(d,a)}}function B(a){s=true;var b=I(a.id);if(b){if(a.altContentId){var c=I(a.altContentId);if(c){p=c;q=a.altContentId}}else{p=D(b)}if(!/%$/.test(a.width)&&parseInt(a.width,10)<310){a.width="310"}if(!/%$/.test(a.height)&&parseInt(a.height,10)<137){a.height="137"}h.title=h.title.slice(0,47)+" - Flash Player Installation";var d=t.ie&&t.win?"ActiveX":"PlugIn",e=h.title,i="MMredirectURL="+g.location+"&MMplayerType="+d+"&MMdoctitle="+e,j=a.id;if(t.ie&&t.win&&b.readyState!=4){var k=J("div");j+="SWFObjectNew";k.setAttribute("id",j);b.parentNode.insertBefore(k,b);b.style.display="none";var l=function(){b.parentNode.removeChild(b)};K(g,"onload",l)}E({data:a.expressInstall,id:f,width:a.width,height:a.height},{flashvars:i},j)}}function C(a){if(t.ie&&t.win&&a.readyState!=4){var b=J("div");a.parentNode.insertBefore(b,a);b.parentNode.replaceChild(D(a),b);a.style.display="none";var c=function(){a.parentNode.removeChild(a)};K(g,"onload",c)}else{a.parentNode.replaceChild(D(a),a)}}function D(a){var c=J("div");if(t.win&&t.ie){c.innerHTML=a.innerHTML}else{var d=a.getElementsByTagName(b)[0];if(d){var e=d.childNodes;if(e){var f=e.length;for(var g=0;g<f;g++){if(!(e[g].nodeType==1&&e[g].nodeName=="PARAM")&&!(e[g].nodeType==8)){c.appendChild(e[g].cloneNode(true))}}}}}return c}function E(c,d,f){var g,h=I(f);if(h){if(typeof c.id==a){c.id=f}if(t.ie&&t.win){var i="";for(var j in c){if(c[j]!=Object.prototype[j]){if(j.toLowerCase()=="data"){d.movie=c[j]}else{if(j.toLowerCase()=="styleclass"){i+=' class="'+c[j]+'"'}else{if(j.toLowerCase()!="classid"){i+=" "+j+'="'+c[j]+'"'}}}}}var k="";for(var m in d){if(d[m]!=Object.prototype[m]){k+='<param name="'+m+'" value="'+d[m]+'" />'}}h.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+i+">"+k+"</object>";l[l.length]=c.id;g=I(c.id)}else{if(t.webkit&&t.webkit<312){var n=J("embed");n.setAttribute("type",e);for(var o in c){if(c[o]!=Object.prototype[o]){if(o.toLowerCase()=="data"){n.setAttribute("src",c[o])}else{if(o.toLowerCase()=="styleclass"){n.setAttribute("class",c[o])}else{if(o.toLowerCase()!="classid"){n.setAttribute(o,c[o])}}}}}for(var p in d){if(d[p]!=Object.prototype[p]){if(p.toLowerCase()!="movie"){n.setAttribute(p,d[p])}}}h.parentNode.replaceChild(n,h);g=n}else{var q=J(b);q.setAttribute("type",e);for(var r in c){if(c[r]!=Object.prototype[r]){if(r.toLowerCase()=="styleclass"){q.setAttribute("class",c[r])}else{if(r.toLowerCase()!="classid"){q.setAttribute(r,c[r])}}}}for(var s in d){if(d[s]!=Object.prototype[s]&&s.toLowerCase()!="movie"){F(q,s,d[s])}}h.parentNode.replaceChild(q,h);g=q}}}return g}function F(a,b,c){var d=J("param");d.setAttribute("name",b);d.setAttribute("value",c);a.appendChild(d)}function G(a){var b=I(a);if(b&&(b.nodeName=="OBJECT"||b.nodeName=="EMBED")){if(t.ie&&t.win){if(b.readyState==4){H(a)}else{g.attachEvent("onload",function(){H(a)})}}else{b.parentNode.removeChild(b)}}}function H(a){var b=I(a);if(b){for(var c in b){if(typeof b[c]=="function"){b[c]=null}}b.parentNode.removeChild(b)}}function I(a){var b=null;try{b=h.getElementById(a)}catch(c){}return b}function J(a){return h.createElement(a)}function K(a,b,c){a.attachEvent(b,c);m[m.length]=[a,b,c]}function L(a){var b=t.pv,c=a.split(".");c[0]=parseInt(c[0],10);c[1]=parseInt(c[1],10)||0;c[2]=parseInt(c[2],10)||0;return b[0]>c[0]||b[0]==c[0]&&b[1]>c[1]||b[0]==c[0]&&b[1]==c[1]&&b[2]>=c[2]?true:false}function M(c,d){if(t.ie&&t.mac){return}var e=h.getElementsByTagName("head")[0],f=J("style");f.setAttribute("type","text/css");f.setAttribute("media","screen");if(!(t.ie&&t.win)&&typeof h.createTextNode!=a){f.appendChild(h.createTextNode(c+" {"+d+"}"))}e.appendChild(f);if(t.ie&&t.win&&typeof h.styleSheets!=a&&h.styleSheets.length>0){var g=h.styleSheets[h.styleSheets.length-1];if(typeof g.addRule==b){g.addRule(c,d)}}}function N(a,b){var c=b?"visible":"hidden";if(r&&I(a)){I(a).style.visibility=c}else{M("#"+a,"visibility:"+c)}}function O(a){var b=/[\\\"<>\.;]/;var c=b.exec(a)!=null;return c?encodeURIComponent(a):a}var a="undefined",b="object",c="Shockwave Flash",d="ShockwaveFlash.ShockwaveFlash",e="application/x-shockwave-flash",f="SWFObjectExprInst",g=window,h=document,i=navigator,j=[],k=[],l=[],m=[],n,o=null,p=null,q=null,r=false,s=false;var t=function(){var f=typeof h.getElementById!=a&&typeof h.getElementsByTagName!=a&&typeof h.createElement!=a,j=[0,0,0],k=null;if(typeof i.plugins!=a&&typeof i.plugins[c]==b){k=i.plugins[c].description;if(k&&!(typeof i.mimeTypes!=a&&i.mimeTypes[e]&&!i.mimeTypes[e].enabledPlugin)){k=k.replace(/^.*\s+(\S+\s+\S+$)/,"$1");j[0]=parseInt(k.replace(/^(.*)\..*$/,"$1"),10);j[1]=parseInt(k.replace(/^.*\.(.*)\s.*$/,"$1"),10);j[2]=/r/.test(k)?parseInt(k.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof g.ActiveXObject!=a){var l=null,m=false;try{l=new ActiveXObject(d+".7")}catch(n){try{l=new ActiveXObject(d+".6");j=[6,0,21];l.AllowScriptAccess="always"}catch(n){if(j[0]==6){m=true}}if(!m){try{l=new ActiveXObject(d)}catch(n){}}}if(!m&&l){try{k=l.GetVariable("$version");if(k){k=k.split(" ")[1].split(",");j=[parseInt(k[0],10),parseInt(k[1],10),parseInt(k[2],10)]}}catch(n){}}}}var o=i.userAgent.toLowerCase(),p=i.platform.toLowerCase(),q=/webkit/.test(o)?parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,r=false,s=p?/win/.test(p):/win/.test(o),t=p?/mac/.test(p):/mac/.test(o);return{w3cdom:f,pv:j,webkit:q,ie:r,win:s,mac:t}}();var u=function(){if(!t.w3cdom){return}x(z);if(t.ie&&t.win){try{h.write("<script id=__ie_ondomload defer=true src=//:></script>");n=I("__ie_ondomload");if(n){K(n,"onreadystatechange",v)}}catch(b){}}if(t.webkit&&typeof h.readyState!=a){o=setInterval(function(){if(/loaded|complete/.test(h.readyState)){w()}},10)}if(typeof h.addEventListener!=a){h.addEventListener("DOMContentLoaded",w,null)}y(w)}();var P=function(){if(t.ie&&t.win){window.attachEvent("onunload",function(){var a=m.length;for(var b=0;b<a;b++){m[b][0].detachEvent(m[b][1],m[b][2])}var c=l.length;for(var d=0;d<c;d++){G(l[d])}for(var e in t){t[e]=null}t=null;for(var f in swfobject){swfobject[f]=null}swfobject=null})}}();return{registerObject:function(a,b,c){if(!t.w3cdom||!a||!b){return}var d={};d.id=a;d.swfVersion=b;d.expressInstall=c?c:false;k[k.length]=d;N(a,false)},getObjectById:function(c){var d=null;if(t.w3cdom){var e=I(c);if(e){var f=e.getElementsByTagName(b)[0];if(!f||f&&typeof e.SetVariable!=a){d=e}else{if(typeof f.SetVariable!=a){d=f}}}}return d},embedSWF:function(c,d,e,f,g,h,i,j,k){if(!t.w3cdom||!c||!d||!e||!f||!g){return}e+="";f+="";if(L(g)){N(d,false);var l={};if(k&&typeof k===b){for(var m in k){if(k[m]!=Object.prototype[m]){l[m]=k[m]}}}l.data=c;l.width=e;l.height=f;var n={};if(j&&typeof j===b){for(var o in j){if(j[o]!=Object.prototype[o]){n[o]=j[o]}}}if(i&&typeof i===b){for(var p in i){if(i[p]!=Object.prototype[p]){if(typeof n.flashvars!=a){n.flashvars+="&"+p+"="+i[p]}else{n.flashvars=p+"="+i[p]}}}}x(function(){E(l,n,d);if(l.id==d){N(d,true)}})}else{if(h&&!s&&L("6.0.65")&&(t.win||t.mac)){s=true;N(d,false);x(function(){var a={};a.id=a.altContentId=d;a.width=e;a.height=f;a.expressInstall=h;B(a)})}}},getFlashPlayerVersion:function(){return{major:t.pv[0],minor:t.pv[1],release:t.pv[2]}},hasFlashPlayerVersion:L,createSWF:function(a,b,c){if(t.w3cdom){return E(a,b,c)}else{return undefined}},removeSWF:function(a){if(t.w3cdom){G(a)}},createCSS:function(a,b){if(t.w3cdom){M(a,b)}},addDomLoadEvent:x,addLoadEvent:y,getQueryParamValue:function(a){var b=h.location.search||h.location.hash;if(a==null){return O(b)}if(b){var c=b.substring(1).split("&");for(var d=0;d<c.length;d++){if(c[d].substring(0,c[d].indexOf("="))==a){return O(c[d].substring(c[d].indexOf("=")+1))}}}return""},expressInstallCallback:function(){if(s&&p){var a=I(f);if(a){a.parentNode.replaceChild(p,a);if(q){N(q,true);if(t.ie&&t.win){p.style.display="block"}}p=null;q=null;s=false}}}}}();
/* END VIDEO PLAYER */

/* START YOU TUBE PLAYER */
(function($) { // Hide scope, no $ conflict

/* Shoe manager. */
function YouTube() {
	this.id = "";
	this.callback = null;
	this._defaults = {
		id : "",
		height : "360",
		width : "640",
		returnCode : false,
		annotate: false,
        autoPlay: 0
	}
	this.init = function(id) {
	    var ivpolicy = '';
		if(this._defaults.annotate != true){
			ivpolicy = '&iv_load_policy=3';
		}
		var yt = ('<iframe width="'+this._defaults.width+'" height="'+this._defaults.height+'" src="http://www.youtube.com/embed/'+this._defaults.id+'?rel=0&autoplay='+this._defaults.autoPlay+'&wmode=transparent'+ivpolicy+'" frameborder="0" allowfullscreen></iframe>');
		if(/msie/.test(navigator.userAgent.toLowerCase())) {
			yt = ('<object width="'+this._defaults.width+'" height="'+this._defaults.height+'"><param name="movie" value="http://www.youtube.com/v/'+this._defaults.id+'?version=3&hl=en_US&rel=0'+ivpolicy+'"></param><param name="allowFullScreen" value="true"></param><param name="wmode" value="opaque"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+this._defaults.id+'?version=3&hl=en_US&rel=0'+ivpolicy+'" type="application/x-shockwave-flash" width="'+this._defaults.width+'" height="'+this._defaults.height+'" wmode="transparent" allowscriptaccess="always" allowfullscreen="true"></embed></object>');
		}
		if(typeof this.callback == "function") this.callback(); else {};
		if(this._defaults.returnCode == 'true') {
			//console.log(yt);
			return yt;
		} else {
			this.id.html(yt);
		}
	}
}
$.fn.youtube = function(options, callback) {
	$.youtube = new YouTube(); // singleton instance
	$.youtube.id = $(this);
	for(prop in options){
		$.youtube._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		return $.youtube.init();
	}
	//return $.youtube;
};
})(jQuery);
/* END YOU TUBE PLAYER */

/* START VIDEO GALLERY */
(function($) { // Hide scope, no $ conflict

/* video gallery manager. */
function VideoGallery() {
	this.id = null;
	this.callback = null;
	this.videoPlaylistArray = [];
	this._defaults = {
		domain : "",
		sport : "all",
		rpp : 99999,
		videolist : [],
		initPlay : "false",
		lazyLoad: true,
		feed : "http://video.eastbay.com/widgets/json.cfm",
		youtubefeed : null
	},
	this.init = function() {
		$.ajaxSetup({
			cache: true
		});
		var obj = this;
		if(obj._defaults.feed.indexOf('?') === -1) {
			obj._defaults.feed += '?';
		} else {
			obj._defaults.feed += '&';
		}
		$('<div/>', {
			'id': 'video_player_wrapper'
		}).appendTo(this.id);
		$('<div/>', {
			'id': 'video_gallery'
		}).appendTo(this.id);
		$.getScript(obj._defaults.feed+'variable=videoList', function(data) {
			var count = 0;
			for(var a = videoList.videos.length - 1; a >= 0; a--) {
				if(!swfobject.hasFlashPlayerVersion("9.0.0") && videoList.videos[a].video_link.split('.')[1] == "flv") {
				} else {
					if(count < obj._defaults.rpp) {
						if(obj._defaults.sport.substring(0,3).toLowerCase() == "all" || videoList.videos[a].Sports.toLowerCase().indexOf(obj._defaults.sport.toLowerCase()) != -1) {
							var item = videoList.videos[a];
							var video = new Object();
							video.title = item.title;
							video.thumbnail = item.thumbnail;
							video.sport = item.Sports;
							video.brand = item.Brands;
							video.description = item.description;
							video.gender = "-_-";
							video.type = "-_-";
							video.video_link = "/ns/common/videos/"+item.video_link;
							video.link = "";
							video.marketing = "promo";
							video.player = "internal";
							obj.videoPlaylistArray.push(video);
							delete item;
							count++;
						}
					} else {
						a = -1;	
					}
				}
			}	
			$('#video_gallery').html(obj.getVideoList());
			$('#video_gallery .video_link a').click(function() {
				obj.playVideo($(this).attr('rel'), obj._defaults.initPlay);
			});
			obj.playVideo(0, "true");
			setTimeout(function() {
				if(obj._defaults.lazyLoad) {
					$("img.lazy").lazyload({effect : "fadeIn"});
					$("img.lazy").lazyload({effect : "fadeIn", container: $("#video_gallery")});
				}
			}, 10);
			if(typeof obj.callback == "function") obj.callback(); else {};
		});
	}
	this.playVideo = function(vid, initPlay) {
		var obj = this;
		if(obj.videoPlaylistArray[vid].player == 'internal') {
			$('#video_player_wrapper').videoplayer({height:'100%', width:'100%',videoDomain:obj._defaults.domain, baseURL:obj._defaults.domain+'/ns/flash/video-player/',video:obj.videoPlaylistArray[vid].video_link,thumbnail:obj.videoPlaylistArray[vid].thumbnail, initPlay:initPlay});
		}
		window.scrollTo(0, $('#video_player_wrapper').offset().top);
		return false;
	}
	this.getVideoList = function() {
		var obj = this;
		var html = "<span>";
		for(var v = 0; v < obj.videoPlaylistArray.length; v++) {
			html += '<span class="video_link"><a href="'+obj.videoPlaylistArray[v].link+'" onclick="return false;" rel="'+v+'">';
			
			obj._defaults.lazyLoad = true;
			try {
				$("img.lazy").lazyload();
			} catch(err) {
				obj._defaults.lazyLoad = false;
			}
			if(obj._defaults.lazyLoad) {
				html += '<img src=\"data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAQAICRAEAOw==\" class=\"lazy\" height="150" data-original="'+obj.videoPlaylistArray[v].thumbnail+'" border="0" />';
			} else {
				html += '<img src="'+obj.videoPlaylistArray[v].thumbnail+'" border="0" />';
			}
			html += '<span class="description">'+unescape(obj.videoPlaylistArray[v].description)+'</span>';
			
			html += '</a></span>';
		}
		html += "</span>";
		return html;
	}
}

$.fn.videoGallery = function(options, callback) {
	$.videoGallery = new VideoGallery(); // Products instance
	$.videoGallery.id = $(this);
	$.videoGallery.callback = callback;
	for(prop in options){
		$.videoGallery._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		$.videoGallery.init();
	}
	return $.videoGallery;
};

	
})(jQuery);
/* END VIDEO GALLERY */

/* START PRODUCT FEED */
(function($) { // Hide scope, no $ conflict

/* Products manager. */
function Products() {
	this.id = null;
	this.callback = null;
	this._defaults = {
		imageDomain : "",
		baseURL : "/search/json.cfm?",
		itemClass : "grid_2",
		groupClass : "container_12",
		lazyLoad : false,
		grpSize: '1',
		skuList: null,
		cmbuckets : ['product_feed','product'],
		reviewNum : '8003',
		imageSize : ['small','s'] //image size 
									//[cart, c] - 50x50
									//[small, s] - 100x100 
									//[large, l] - 200x200 
									//[large_w, w] - 300x300 
									//[zoom, z] - 500x500
	}
	this.init = function() {
		$.ajaxSetup({
			cache:true,
			beforeSend: function(jqXHR) {
				//jqXHR.overrideMimeType("text/javascript; charset=iso-8859-1");
			}
		});
		var obj = this;
		var filters = [];
		for(prop in this._defaults) {
			if(this._defaults[prop] != "" && prop != "reviewNum" && prop != "imageSize" && prop != "grpSize" && prop != "baseURL" && prop != "skuList" && prop != "imageDomain" && prop != "itemClass" && prop != "groupClass" && prop != "lazyLoad") {
				filters.push(prop + '=' + this._defaults[prop]);
			}
		}
		if(obj._defaults.skuList != null) {
			filters.push('Nr='+obj.getSkuList(obj._defaults.skuList.split(",")));
		}
		obj._defaults.baseURL += filters.join('&');
		//console.log(obj._defaults.baseURL);
		$.ajax({
			method : 'get',
			url: obj._defaults.baseURL+"&variable=result",
			beforeSend: function(jqXHR) {
				jqXHR.overrideMimeType("text/javascript; charset=iso-8859-1");
			},
			complete: function() {
			var feed = result;
			modelArray = [];
			obj.id.empty();
			if(!obj.id.is('ul')) {
				obj.id.html('<ul class="product_feed"></ul>');
			}
			for (var l = 0; l < feed.RECORDS.length; l++) {
				//alert(escape(feed.RECORDS[l].PROPERTIES.P_ModelName));
				var html = "<li class=\""+obj._defaults.groupClass+"\">";
				for(var count = 0; count < obj._defaults.grpSize; count++) {
					if(l < feed.RECORDS.length) {
						var slideLink;
						var rating = "";
						var info = new Object();
						info.P_ModelName = unescape(escape(feed.RECORDS[l].PROPERTIES.P_ModelName).replace(/%uFFFF/gi, '&reg;'));
						if (feed.RECORDS[l].PROPERTIES.P_AverageOverallRating != undefined) {
							if (feed.RECORDS[l].PROPERTIES.P_AverageOverallRating.toString().length == 1) {
								rating = feed.RECORDS[l].PROPERTIES.P_AverageOverallRating.toString() + ".0";
							} else {
								rating = feed.RECORDS[l].PROPERTIES.P_AverageOverallRating.toString().charAt(0) + "." + feed.RECORDS[l].PROPERTIES.P_AverageOverallRating.toString().charAt(2)
							}
						}
						/* START PRODUCT */
						html += "<a href=\"" + feed.RECORDS[l].PDPURL + "\" class=\"product_cell\" title=\"" + info.P_ModelName + "\" onclick=\"return false;\">";
						
						if(obj._defaults.lazyLoad) {
							try {
								$("img.lazy").lazyload();
							} catch(err) {
								obj._defaults.lazyLoad = false;
							}
						}
						if(obj._defaults.lazyLoad) {
							html += "<img src=\"data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAQAICRAEAOw==\" class=\"lazy\" data-original=\""+obj._defaults.imageDomain+"/images/products/"+obj._defaults.imageSize[0]+"/" + feed.RECORDS[l].PROPERTIES.P_StyleSKU + "_"+obj._defaults.imageSize[1]+".jpg\" border=\"0\" />";
						} else {
							html += "<img src=\""+obj._defaults.imageDomain+"/images/products/"+obj._defaults.imageSize[0]+"/" + feed.RECORDS[l].PROPERTIES.P_StyleSKU + "_"+obj._defaults.imageSize[1]+".jpg\" border=\"0\" />";
						}
						
						html += "<br />" + info.P_ModelName;	
						var rating = "";
						if (feed.RECORDS[l].PROPERTIES.P_AverageOverallRating != undefined) {
							if (feed.RECORDS[l].PROPERTIES.P_AverageOverallRating.toString().length == 1) {
								rating = feed.RECORDS[l].PROPERTIES.P_AverageOverallRating.toString() + ".0";
							} else {
								rating = feed.RECORDS[l].PROPERTIES.P_AverageOverallRating.toString().charAt(0) + "." + feed.RECORDS[l].PROPERTIES.P_AverageOverallRating.toString().charAt(2);
							}
						}
			
						if (feed.RECORDS[l].PROPERTIES.P_AverageOverallRating != undefined) {
							html += "<span class=\"reviews\"><img src=\"http://reviews.eastbay.com/"+obj._defaults.reviewNum+"/" + rating.charAt(0) + "_" + rating.charAt(2) + "/5/rating.gif\" border=\"0\" /></span>";
						}
						if (feed.RECORDS[l].PROPERTIES.P_StyleSalePrice < feed.RECORDS[l].PROPERTIES.P_StyleListPrice) {
							// display sale in red
							html += "<span class=\"price\"><strong><strike>$" + feed.RECORDS[l].PROPERTIES.P_StyleListPrice.toFixed(2) + "</strike><br/><span style=\"color:red\">Now $" + feed.RECORDS[l].PROPERTIES.P_StyleSalePrice.toFixed(2) + "</span></strong></span></a>";
						} else {
							html += "<span class=\"price\"><strong>$" + feed.RECORDS[l].PROPERTIES.P_StyleSalePrice.toFixed(2) + "</strong></span></a>";
						}
						/* END PRODUCT */
						if(count+1 != obj._defaults.grpSize) {
							l++;
						}
					}
				}
				html += "</li>";
					
				if(!obj.id.is('ul')) {
					obj.id.children('.product_feed').append(html);
				} else {
					obj.id.append(html);
				}
				delete html;
			}
			setTimeout(function() {
				if(obj._defaults.lazyLoad) {
					$("img.lazy").lazyload({effect : "fadeIn"});
				}
			}, 10);
			
			
			if(typeof obj.callback == "function") obj.callback(); else {};
			obj.setupLink();
		}});
	},
	this.setupLink = function() {
		var cm = this._defaults.cmbuckets.join('-_-');
		var obj = this;
		$('body').off('click', 'a.product_cell');
		$('body').on('click', 'a.product_cell', function() {
			openQuickViewWithURL($(this).attr('href'));
			cmCreateManualLinkClickTag('www.eastbay.com/?cm_re='+cm + '-_-' + obj.getcmstring($(this).attr('title')),obj.getcmstring($(this).attr('title')));
			return false;
		});
	},
	this.getcmstring = function(term) {
		var searchTerm = $.trim(term.toString().toLowerCase());
		searchTerm = searchTerm.replace(/[/]/ig,'');
		searchTerm = searchTerm.replace(/[^a-z0-9-+ ]/ig,'');

		searchTerm = searchTerm.replace(/ +/ig,'_');
		searchTerm = searchTerm.replace(/-+/ig,'');
		searchTerm = searchTerm.replace(/_+/ig,'_');
		
		return searchTerm;
	},
	this.getSkuList = function(list) {
		list = list.join('),AND(P_StyleSKU:');
		list = 'OR(AND(P_StyleSKU:'+list+'))';
		return list;
	}
}

$.fn.products = function(options, callback) {
	$.products = new Products(); // Products instance
	$.products.id = $(this);
	$.products.callback = callback;
	for(prop in options){
		$.products._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		$.products.init();
	}
	return $.products;
};

	
})(jQuery);
/* END PRODUCT FEED */


/* START RELATED LINKS */

(function($) { // Hide scope, no $ conflict

/* RelatedLinks manager. */
function RelatedLinks() {
	this.response = null;
	this._defaults = {
		type: "text",
		related : "", // Keyword to Match
		feed: "", // If JSON object
		variable: "", // If feed is defined by variable
		num: "4", // Number of links to return
		title: "title", // Key name for Title	
		url: "link", // Key name for link
		keyword: "keywords", // Key name for keywords
		start: "bottom",
		thumbnail: "", // Key name for thumbnail (Optional)
		summary: "" // Key name for summary (Optional)
	},
	
	this.init = function() {
		var obj = this;
		if(this._defaults.variable == "" || this._defaults.variable == null) {
			$.getJSON(obj._defaults.feed, function(result) {
				obj.response = result;
				obj.traverse(result);
			});
		} else {
			var results = window[obj._defaults.variable];
			obj.traverse(results);
		}
	}
	this.traverse = function(o) {
		var response;
		for(i in o) {
			response = o;
			if(typeof(o[i])=="object") {
				for(k in o[i]) {
					if(k == this._defaults.title) {
						this.response = response;
						if(this._defaults.start == "bottom") {
							this.response.reverse();
						}
						this.populate();
						return false;
					} else {
						this.traverse(o[i]);
					}
				}		
			}
		}
	}     
	this.populate = function() {
		var count = 0;
		var obj = this;
		if(this._defaults.type.toLowerCase() == "video") {			
			$('<div/>', {
				'id': 'video_player',
				'style':'display:none; height:360px; width:640px; color:#000;'
			}).prependTo('body')	
		}
		this.id.html('<ul class="related_links"></ul>');
		for(var i = 0; i < this.response.length; i++) {
			if(count < this._defaults.num && obj.isRelated(i)) {
				var html = '<li litem="'+i+'">';
				html += '<a href="'+this.response[i][this._defaults.url]+'">';
				if(this._defaults.thumbnail != '') {
					html += '<img src="'+this.response[i][this._defaults.thumbnail]+'" class="thumb" />';
				}
					html += '<span class="title">'+this.response[i][this._defaults.title] + '</span>';
				if(this._defaults.summary != '') {
					html += '<span class="summary">'+this.response[i][this._defaults.summary] + '</span>';
				}
				html += '</a>';	
				html += "</li>";
				this.id.children('.related_links').append(html);
				count++;
			}
			if(count == this._defaults.num) {
				i = this.response.length;	
			}
		}
		
		this.id.children('ul.related_links').children('li').children('a').click(function() {
			if(obj._defaults.type == 'video') {
				$('#video_player').videoplayer({baseURL:'http://www.eastbay.com/ns/flash/video-player/', video:'/ns/common/videos/'+obj.response[$(this).parent().attr('litem')][obj._defaults.url],thumbnail:obj.response[$(this).parent().attr('litem')][obj._defaults.thumbnail]});
				Shadowbox.open({content:'#video_player',player:'inline',title:obj.response[$(this).parent().attr('litem')][obj._defaults.title],width:640,height:360});
			} else {
				document.location.href = obj.response[$(this).parent().attr('litem')][obj._defaults.url];
			}
			return false;
		});
		if(typeof this.callback == "function") this.callback(); else {};
	}
	this.isRelated = function(num) {
		var related = false;
		var keywords = this._defaults.related.split(',');
		for(var k = 0; k < keywords.length; k++) {
			if(this.response[num][this._defaults.keyword].toString().toLowerCase().indexOf(keywords[k].toLowerCase()) !== -1) {
				related = true;
				k = keywords.length;
			}
		}
		return related;
	}
	
}

$.fn.relatedlinks = function(options) {
	$.relatedlinks = new RelatedLinks(); // RelatedLinks instance
	$.relatedlinks.instance = this;
	$.relatedlinks.id = $(this);
	for(prop in options){
		$.relatedlinks._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		$.relatedlinks.init();
	}
	return $.relatedlinks;
};
	
})(jQuery);

/* END RELATED LINKS */


/* START READ MORE */
(function($) { // Hide scope, no $ conflict

/* Readmore manager. */
function ReadMore() {
	this.id = "";
	this.callback = null;
	this._defaults = {
		id : "",
		charCount : 300,
		readmoretext : 'read more&hellip;',
		readlesstext : 'read less',
		asCMTagging  : false,
		includeArrow : false	
	}

	this.init = function(id) {
		
		var obj = this;
		var showtext = '';
		var hidetext = '';
		
		if(this._defaults.charCount < obj.id.html().length) {
			while(obj.id.html().substring(this._defaults.charCount, this._defaults.charCount+1) != " ") {
				this._defaults.charCount++;
			}
		
		if($(obj.id.selector + " .extra_copy").index() > 0){	
			var showtext = obj.id.html().substring(0, obj.id.html().indexOf('extra_copy')-12);
			var hidetext = obj.id.html().substring(showtext.length, obj.id.html().length);

		}
		else{
			var	showtext = obj.id.html().substring(0, this._defaults.charCount);

			var hidetext = obj.id.html().substring(this._defaults.charCount+1, obj.id.html().length);
			
			showtext = obj.id.html().substring(0, this._defaults.charCount + (hidetext.indexOf('</p>') + 5));
			hidetext = hidetext.substring((hidetext.indexOf('</p>') + 4), obj.id.html().length);
		}
		
	
			if($(obj.id.selector + " .extra_copy").index() == -1){
				var html = showtext + '<div class="extra_copy" style="display:none;">'+hidetext+'</div>';
			}
			else{
				
				var html = showtext + hidetext;

				$(obj.id.selector + " .extra_copy").css("display", "none");
			}
			html += '<div class="read_more readmore"><a href="javascript:void(0)" class="readmore">';
			console.log(html);
			
			if(obj._defaults.includeArrow)
				html += '<span class="readBorder">'+obj._defaults.readmoretext+'</span>';
				
			else
				html += '<span>'+obj._defaults.readmoretext+'</span>';
			
			if(obj._defaults.includeArrow)
				html += '<div class="down_arrow"></div>';
			
			html += '</a></div>';

			html += '<div class="readless" style="display: none;"><a href="javascript:void(0);" class="readless">';
			
			if(obj._defaults.includeArrow)
				html += '<div class="up_arrow"></div><span class="readBorder">'+obj._defaults.readlesstext+'</span></a></div>';
			else
				html += '<span>'+obj._defaults.readlesstext+'</span></a></div>';
			
			
			this.id.html(html);
			
			// Removes button if content isn't long enough
			if($.trim(hidetext).length == 0) {
				this.id.children('.readmore').remove();
				$('#content_box').append('<div style="padding: 5px 0"></div>');
			}
			
			$('a.readmore').click(function() {
				$(this).parent().parent().children('.extra_copy').show();
				$(this).parent().parent().children('.readless').show();
				$(this).parent().hide();

				if(obj._defaults.asCMTagging){
					var root = window.location.hostname;
					
					var pageTitle = $(".mainsite_navigation_h1_header .header_text h1").text();
					pageTitle = pageTitle.replace(/\s+/g, '');
					if(pageTitle == ''){
						$('.breadcrumbs a.goto ').each(function() {
                     	   pageTitle += $(this).text();
                        });
					}
									
					var articleTitle = $(obj.id.selector +" h3").text();
					
					if(articleTitle == '')
						articleTitle = 'ReadMore';
					
					articleTitle = articleTitle.replace(/\s+/g, '');
					//articleTitle = articleTitle.replace(/ +/ig,'-');
           			//articleTitle = articleTitle.replace(/-+/ig,'-');
           			//articleTitle = articleTitle.replace(/_+/ig,'-');
					
					if(typeof cmCreateManualLinkClickTag === "function") {
						 var cm = pageTitle + '-_-' + 'ReadMore' + '-_-' + articleTitle;
                  		cmCreateManualLinkClickTag(root + '/?cm_re='+cm+'', 'AdvancedSearch');
                	}	
				}
			});
			$('a.readless').click(function() {
				$(this).parent().parent().children('.extra_copy').hide();
				$(this).parent().parent().children('.readless').hide();
				$(this).parent().parent().children('.readmore').show();
				
				$(this).parent().hide();
			});
		}
		if(typeof this.callback == "function") this.callback(); else {};
	}
}
$.fn.readmore = function(options, callback) {
	$.readmore = new ReadMore(); // readmore instance
	$.readmore.id = $(this);
	$.readmore.callback = callback;
	for(prop in options){
		$.readmore._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		$.readmore.init();
	}
	return $.readmore;
};
})(jQuery);
/* END READ MORE */

/* START READ MORE */
(function($) { // Hide scope, no $ conflict

/* Readmore manager. */
function GetLikes() {
	this.id = "";
	this.callback = null;
	this.selector = null;
	this.likes = 0;
	this._defaults = {
		liked : ""
	}
	this.init = function(id) {
		var obj = this;
		//alert(obj);
		FBSetup();
		//alert(FBloaded);
		obj.returnLikes();
	}
	this.returnLikes = function() {
		var obj = this;
		if(!FBloaded) {
			setTimeout(function(){obj.returnLikes()},100);
		} else {
			FB.api('/'+encodeURIComponent(obj._defaults.liked), function(response) {
				//alert('test')
				if(response.shares != undefined) {
					obj.likes = response.shares;
				}
				if(obj.selector != null) {
					obj.id.html(obj.likes);
				}
				if(typeof obj.callback == "function") obj.callback(obj.likes); else {};
			});
		}
	}
}
$.fn.getLikes = function(options, callback) {
	$.getLikes = new GetLikes(); // readmore instance
	$.getLikes.id = $(this);
	$.getLikes.callback = callback;
	$.getLikes.selector = this.selector;	
	for(prop in options){
		$.getLikes._defaults[prop] = options[prop];
	}
	$.getLikes.init();
	return $.getLikes;
};
})(jQuery);
/* END GET LIKES */


/* START RATINGS */
(function($) { // Hide scope, no $ conflict

/* RATINGS manager. */
function Ratings() {
	this.id = "";
	this.callback = null;
	this._defaults = {
		id : "",
		rating : "0_0",
		scale : 5
	}
	this.init = function(id) {
		var obj = this;
		obj.id.each(function() {
			var num;
			if($(this).attr('data-ratings') != undefined) {
				obj._defaults.rating = $(this).attr('data-ratings');	
			}
			var full = parseInt(obj._defaults.rating.split('_')[0]);
			var partial = parseInt(obj._defaults.rating.split('_')[1]);
			for(var i = 0; i < obj._defaults.scale; i++) {
				var icon = $('<span />')
					.addClass('blank_rating')
					.css('display','inline-block').css('text-align','left').appendTo($(this));
				if(i < full) {
					$('<span />')
						.addClass('selected')
						.css('display','inline-block')
						.appendTo(icon);
				} else if(i == full) {
					$('<span />')
						.addClass('selected')
						.css({'display':'inline-block','width':partial+'0%'})
						.appendTo(icon);
				}
			}
		});
		if(typeof this.callback == "function") this.callback(); else {};
	}
}
$.fn.ratings = function(options, callback) {
	$.ratings = new Ratings(); // readmore instance
	$.ratings.id = $(this);
	$.ratings.callback = callback;
	for(prop in options){
		$.ratings._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		$.ratings.init();
	}
	return $.ratings;
};
})(jQuery);
/* END RATINGS */

/* START COLLAPSE */
(function($) { // Hide scope, no $ conflict

/* COLLAPSE manager. */
function collapse() {
	this.id = "";
	this.callback = null;
	this._defaults = {
	}
	this.init = function(id) {
		var obj = this;
		obj.id.find('[data-collapse]').each(function() {
			var content = $(this);
			
			content.children('.title').first().css('display', 'block');
			content.children('.content').first().css('display', 'block');
			content.css('display', 'inline-block');
			content.children('.title').first().css('cursor', 'pointer');
			
			
			content.children('.title').first().unbind('click');
			content.children('.title').first().bind('click', function() {
				obj.toggleContent(content);
			});
			if(content.attr('data-collapse') == 'closed') {
				obj.closeContent(content);	
			} else {
				obj.openContent(content);	
			}
			
			
		});
		
		obj.setListeners();
		
		
		if(typeof this.callback == "function") this.callback(); else {};
	}
	this.setListeners = function () {
		var obj = this;
		$(this).unbind('click');
		$('[data-collapse-close]').each(function() {
			var content = $($(this).attr('data-collapse-close'));
			$(this).bind('click', function() {
				obj.closeContent(content);
			});
		});
		
		$('[data-collapse-open]').each(function() {
			var content = $($(this).attr('data-collapse-open'));
			$(this).bind('click', function() {
				obj.openContent(content);
			});
		});
		
		$('[data-collapse-toggle]').each(function() {
			var content = $($(this).attr('data-collapse-toggle'));
			$(this).bind('click', function() {
				obj.toggleContent(content);
			});
		});	
	}
	this.refresh = function() {
		this.setListeners();
	}
	this.closeContent = function(content) {
		content.removeClass('open').removeClass('closed');
		content.children('.content').first().hide();
		content.addClass('closed');
	}
	this.openContent = function(content) {
		content.removeClass('open').removeClass('closed');
		content.children('.content').first().show();
		content.addClass('open');
	}
	this.toggleContent = function(content) {
		content.children('.content').first().toggle();
		content.removeClass('open').removeClass('closed');
		if(content.children('.content').first().css('display') == 'none') {
			content.addClass('closed');
		} else {
			content.addClass('open');
		}
	}
}
/*$(document).ready(function(e) {
    $.fn.collapse();

});*/
$.fn.collapse = function(options, callback) {
	$.collapse = new collapse(); // overlay instance
	
	if(this.html() == null) {
		$.collapse.id = $('body');		
	} else {
		$.collapse.id = this;
	}
	if(options == 'refresh') {
		$.collapse.refresh();	
	} else if(options == 'close') {
			$.collapse.closeContent(this);
	} else if(options == 'open') {
		$.collapse.openContent(this);
	}else if(options == 'toggle') {
		$.collapse.toggleContent(this);
	}
	else {
		for(prop in options){
			$.collapse._defaults[prop] = options[prop];
		}
		$.collapse.callback = callback;
		$.collapse.init();
	}
};
})(jQuery);
/* END COLLAPSE */

/* START OVERLAY */
(function($) { // Hide scope, no $ conflict

/* overlay manager. */
function overlay() {
	this.id = "";
	this.callback = null;
	this._defaults = {
		'width' : '50%',
		'height' : 'auto',
		'top' : '10%',
		'left' : '50%',
		'margin' : '0 0 0 -25%',
		'padding' : '10px',
		'closeText' : 'Close'
	}
	this.init = function(id) {
		var obj = this;
		$('[data-overlay-target]').each(function() {
			var overlayContent = $('<span />');
			if($(this).attr('data-overlay-target').match(/\.(jpeg|jpg|gif|png)$/) != null) {
				$('<img />', {
					'src' : $(this).attr('data-overlay-target'),
					'border' : '0'
				}).appendTo(overlayContent);
			} else if($(this).attr('data-overlay-target').substr(0,4) == 'http') {
				$('<iframe />', {
					'src' : $(this).attr('data-overlay-target'),
					'width' : '100%',
					'height' : '100%',
					'frameborder' : '0',
					'marginheight' : '0',
					'marginwidth' : '0'
				}).appendTo(overlayContent);
			} else {
				overlayContent = $($(this).attr('data-overlay-target'));
			}
			$('body').append(overlayContent);
			overlayContent.addClass('overlay');
			overlayContent.css('position', 'absolute');
			overlayContent.css('width', obj._defaults.width);
			overlayContent.css('height', obj._defaults.height);	
			overlayContent.css('top', obj._defaults.top);	
			overlayContent.css('left', obj._defaults.left);		
			overlayContent.css('margin', obj._defaults.margin);
			overlayContent.css('padding', obj._defaults.padding);
			overlayContent.prepend('<a href="javascript:void(0);" data-overlay-close="'+$(this).attr('data-overlay-target')+'">'+obj._defaults.closeText+'</a>');
			overlayContent.hide();
			$(this).click(function() {
				overlayContent.show();	
			});
		});
		$('[data-overlay-close]').each(function(index, element) {
			$(this).click(function() {
				$(this).parents('.overlay').hide();
			});
		});
		
		if(typeof this.callback == "function") this.callback(); else {};
	}
}
/*$(document).ready(function(e) {
    $.fn.overlay();

});*/
$.fn.overlay = function(options, callback) {
	$.overlay = new overlay(); // overlay instance
	$.overlay.id = $(this);
	$.overlay.callback = callback;
	for(prop in options){
		$.overlay._defaults[prop] = options[prop];
	}
	$.overlay.init();
};
})(jQuery);
/* END OVERLAY */

/* CUSTOM DROPDOWN */
(function($) { // Hide scope, no $ conflict

/* DROPDOWN manager. */
function DropDown() {
	this.id = "";
	this.callback = null;
	this.dropdown = null;
	this._defaults = {
		id : "",
		collapsed : 'close'
	}
	this.init = function(id) {
		var obj = this;
		obj.id.each(function() {
			var instance = this;
			var TOUCH_DEVICE = (typeof document.ontouchstart != "undefined") ? true : false;
			$(instance).removeClass('select');
			$(instance).addClass('select');
			$.each($(instance).children('option'), function() {
				$(this).removeClass('option');
				$(this).addClass('option');
			});
			if(!TOUCH_DEVICE) {					
				var outside;
				
				if($(instance).parent('div').hasClass('dropdown')) {
								
					outside = $(instance).parent('div.dropdown');
					
				} else { 
					outside = $('<div />', {
						'class':'dropdown'
					});
					
					$(instance).wrap(outside);
				}
				
				$(instance).hide();
				
				outside.children('div.select').remove();
				
				var wrapper = $('<div />', {
					'class':'select',
					'data-collapse': obj._defaults.collapsed,
					'data-select' : $(this).attr('name'),
					'id' : 'select'+$(this).attr('name')
				});
				
				$(instance).parent('.dropdown').append(wrapper);
				wrapper.empty();
				
				var title = $('<span />', {
					'class':'title'
				}).appendTo(wrapper);
				
				var content = $('<span />', {
					'class':'content'
				}).appendTo(wrapper);
				
				$.each($(instance).children('option'), function() {
					var option = $('<a />', {
						'data-value': $(this).val(),
						'href' : 'javascript:void(0);',
						'class' : 'option'
					}).html($(this).html()).appendTo(content);
					option.css('display', 'block');
					if($(this).attr('selected') != null) {
						option.addClass('selected');	
					}
					option.unbind('click');
					option.bind('click', function() {obj.update($(wrapper), option)});
				});
								
				$(wrapper).unbind('click');
				$(wrapper).bind('click', function(){obj.toggleSelect($(this))});
				




				$(instance).parent('.dropdown').collapse();
				
				if(obj._defaults.collapsed == 'open') {
					obj.openSelect($(wrapper));	
				} else {
					obj.closeSelect($(wrapper));	
				}
				obj.update($(wrapper));
			}
			if(typeof this.callback == "function") this.callback(); else {};
		});
	},
	this.toggleSelect = function(obj) {
		if(obj.attr('data-dropdown') == 'open') {
			this.closeSelects();
		} else {
			this.closeSelects();
			this.openSelect(obj);
		}
	},
	this.closeSelect = function(obj) {




		obj.css('z-index', 1);
		obj.attr('data-dropdown', 'close');
		obj.collapse('close');
	},
	this.openSelect = function(obj) {

		obj.css('z-index', 2);
		obj.attr('data-dropdown', 'open');
		obj.collapse('open');
	},
	this.closeSelects = function() {		
		var obj = this;	
		$.each($('.dropdown').children('.select'), function() {
			obj.closeSelect($(this));

		});		
	},












	this.update = function(obj, set) {
		var selected = null;
		if(set != undefined) {
			selected = set;	
		} else if(obj.children('.content').children('a.selected').html() != null) {
			selected = obj.children('.content').children('a.selected')
		} else {
			selected = obj.children('.content').children('.option').first();	
		}
		
		obj.children('.title').first().html(selected.html());
		obj.attr('data-value', selected.attr('data-value'));
		
		obj.parent('.dropdown').children('select').val(selected.attr('data-value'));
		
		if(set != undefined) {
			obj.parent('.dropdown').children('select').change();
		}


	}
}
$.fn.dropdown = function(options, callback) {
	$.dropdown = new DropDown(); // readmore instance
	$.dropdown.id = $(this);
	$.dropdown.callback = callback;
	for(prop in options){
		$.dropdown._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		$.dropdown.init();
	}
	return $.dropdown;
};
})(jQuery);
/* END CUSTOM DROPDOWN */

/*
 * Contains cookie plugin
 */
(function($) { // Hide scope, no $ conflict
	
	var methods = {
		create : function(name, value, days) {
			if (days) {
		        var date = new Date();
		        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		        var expires = "; expires=" + date.toGMTString();
		    }
		    else var expires = "";
		    document.cookie = name + "=" + value + expires + "; path=/";
		},
		read : function(name) {
            c_name = name;
			if (document.cookie.length > 0) {
		        c_start = document.cookie.indexOf(name + "=");
		        if (c_start != -1) {
		            c_start = c_start + c_name.length + 1;
		            c_end = document.cookie.indexOf(";", c_start);
		            if (c_end == -1) {
		                c_end = document.cookie.length;
		            }
		            return unescape(document.cookie.substring(c_start, c_end));
		        }
		    }
		    return "";
		},
		destroy : function(name) {
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
		}
	};
	
	//$.fn.cookie = function(method) {
	$.cookie = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.cookie' );
	    } 
	};
})(jQuery);
/* END COOKIE */


/*
 * Contains message plugin
 */
 (function($) { // Hide scope, no $ conflict
	$.fn.centerBox = function () {
		this.css('position','absolute');
		this.css('top', (parseInt( ( ($(window).height()/2) + $(window).scrollTop() ) - this.height()/2 )/$(window).height())*100 + '%');
		this.css('left', '0');
		return this;
	}
})(jQuery);
 
(function($) { // Hide scope, no $ conflict
	var containers = {
		wrapper : $('<div />', {
			'data-type' : 'messageBoxWrapper',
			'class' : 'messageBoxWrapper'
		}).css({'z-index':'9999','width':'100%','text-align':'center'}),
		
		innerwrapper : $('<div />', {
			'data-type' : 'messageBox',
			'class' : 'messageBox'
		}).css({'z-index':'9999','width':'auto','display':'inline-block'}),
		
		fade : $('<div />', {
			'data-type' : 'fade',
			'class' : 'fade'
		})
		
	};
	var methods = {
		confirm : function(msg, onContinue, onCancel) {
			methods.createMsgBox(msg, {'yes':onContinue,'no':onCancel});
		},
		alert : function(msg, onContinue) {
			methods.createMsgBox(msg, {'ok':onContinue});
		},
		multi : function(msg, options) {
			methods.createMsgBox(msg, options);
		},
		createMsgBox : function(msg, options) {
			containers.wrapper.append(containers.innerwrapper);
			containers.innerwrapper.empty();
			$('<span />', {
				'class' : 'title'
			}).html(msg).css({'display':'inline-block'}).appendTo(containers.innerwrapper);
			
			$('<br />').appendTo(containers.innerwrapper);
			
			var buttons = $('<span />', {
				'class' : 'buttons'
			}).appendTo(containers.innerwrapper);
			
			
			$.each(options, function(o, opt) {
				$('<input />', {
					'class' : 'button',
					'type' : 'button',
					'data-message-answer' : o.replace(/ /, '')
				}).val(o).appendTo(buttons).on('click', function(){opt();methods.clearBox()});;
			});
			
			
			containers.fade.appendTo('body').css({
				zIndex:'9998',
				position:'fixed',
				display:'inline-block',
				top:'0',
				left:'0',
				backgroundColor: '#000',
				opacity : 0.8
			}).height($(document).height()).width('100%');
			
			containers.wrapper.appendTo('body');
			containers.wrapper.centerBox();
			
		},
		clearBox : function() {
			containers.wrapper.remove();
			containers.fade.remove();
		}
	};
	
	//$.fn.confirm = function(method) {
	$.messageBox = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.confirm' );
	    } 
	};
})(jQuery);
/* END CONFIRM */


/*
 * Contains local storage plugin
 */
(function($) { // Hide scope, no $ conflict
	
	var methods = {
		create : function(name, value) {
			if (typeof(Storage) !== "undefined" && methods.hasLocalStorage()) {
				localStorage.setItem(name, value);
			} else {
				$.cookie("create", name, value, 180);
			}
		},
		read : function(name) {
			if (typeof(Storage) !== "undefined" && methods.hasLocalStorage()) {
				return localStorage.getItem(name);
			} else {
				return $.cookie("read", name);
			}
		    return "";
		},
		destroy : function(name) {
			if (typeof(Storage) !== "undefined" && methods.hasLocalStorage()) {
				localStorage.removeItem(name);
			} else {
				$.cookie("destroy", name);
			}
		},
		hasLocalStorage : function() {
			try { 
				localStorage.setItem("storage", ""); 
				localStorage.removeItem("storage");
				storageImpl = true;
			}
			catch(err) { 
				storageImpl = false;;
			}
			return storageImpl;
		}
	};
	
	$.localStorage = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.localStorage' );
	    } 
	};
})(jQuery);
/* END LOCAL STORAGE */


/*
 * Contains pdpVideo plugin
 */
(function($) { // Hide scope, no $ conflict
	var vars = {
		videoArray : [],
		structure : new Object()
	};
	var settings = {
		domain : '',
		initPlay : 0,
		onPlay : null,
		thumbnailBase : '/images/fl/stacks/',
		ajaxVideoURL: '/shared/pdp/product_videos?', //Default Ajax JSON URL
		swfpath : '/ns/flash/video-player/',
		sku: '', //Product Number
		callback : null
	};
	var methods = {
	    init: function (options) {
	        //console.log(vars.videoArray);
            vars.videoArray = []
			settings = $.extend(settings, options);
			
			//initial setup
		    return this.each(function() {
		    	var $element;
		    	$element = $(this);
		    	//console.log(settings.domain + " - " + settings.ajaxVideoURL);
				$.getJSON(settings.domain+settings.ajaxVideoURL+'sku='+settings.sku,function(data) {
					$.each(data.COLUMNS, function(c, column) {
					    vars.structure[column] = c;
					});
					methods.VIDEOjsonResponse($element, data);
				});
			});
			
		},
		VIDEOjsonResponse : function(index, data) {
			var $this = index;
			var vidSelectCount = data.DATA.length;
			//console.log(data);
			if(vidSelectCount > 0 ) {
				$('<div/>', {
					'id': 'video_player_wrapper'
				}).appendTo($this);
				$('<ul/>', {
					'id': 'video_gallery'
				}).appendTo($this);
				// I place the resulting html VIDEO data into the div
				var video = document.createElement( "video" );
				
				
				if(vidSelectCount > 0) {
					
					for(var v = 0; v < data.DATA.length; v++) {
						if(data.DATA[v][vars.structure.CONTENTSOURCE] == 'partner') {
							var video = new Object();
							var videoLink = data.DATA[v][vars.structure.CONTENTTEXT];
							var player = data.DATA[v][vars.structure.CONTENTSOURCE];
							if(videoLink.indexOf('/ns/common/videos/') !== -1) {
								var start = videoLink.indexOf('flv=') + 4;
								var end = videoLink.indexOf('.mp4') + 4;
								videoLink = videoLink.substring(start, end);
								player = 'default';
							}
							if(videoLink.indexOf('//www.youtube') !== -1) {
								var start = videoLink.indexOf('//www.youtube');
								var end = videoLink.indexOf('"',start) - 1;
								videoLink = videoLink.substring(start, end);

								if(videoLink.indexOf('/v/') !== -1) {
									videoLink = videoLink.replace(/\/v\//ig, '/embed/');
								}
								start = videoLink.indexOf('/embed/') + 7;
								end = videoLink.indexOf('?',start);
								videoLink = videoLink.substring(start, end);


								videoLink = $('#video_player_wrapper').youtube({'returnCode':'true','id':videoLink,'height':'460','width':'856', 'autoPlay': settings.initPlay});
							}

							//console.log('VIDEO THUMB : ' + data.DATA[v][vars.structure.CONTENTTHUMBIMAGE]);
							video.title = data.DATA[v][vars.structure.CONTENT_NAME];
							video.thumbnail = settings.thumbnailBase+data.DATA[v][vars.structure.CONTENTTHUMBIMAGE];						
							video.sport = 'null';
							video.brand = 'null';
							video.description = data.DATA[v][vars.structure.CONTENTSHORTDESC];
							video.gender = "-_-";
							video.type = "-_-";
							video.video_link = videoLink;
							video.link = "";
							video.marketing = "PDP";
							video.player = player;
							vars.videoArray.push(video);
							//console.log("PARTNER");
						} else if((data.DATA[v][vars.structure.CONTENTSOURCE] == 'default') && (data.DATA[v][vars.structure.CONTENTTEXT].substring((data.DATA[v][vars.structure.CONTENTTEXT].length - 3), data.DATA[v][vars.structure.CONTENTTEXT].length) == "mp4")){
							var video = new Object();
							video.title = data.DATA[v][vars.structure.CONTENT_NAME];
							video.thumbnail = settings.thumbnailBase+data.DATA[v][vars.structure.CONTENTTHUMBIMAGE];						
							video.sport = 'null';
							video.brand = 'null';
							video.description = data.DATA[v][vars.structure.CONTENTSHORTDESC];
							video.gender = "-_-";
							video.type = "-_-";
							video.video_link = data.DATA[v][vars.structure.CONTENTTEXT];
							video.link = "";
							video.marketing = "PDP";
							video.player = data.DATA[v][vars.structure.CONTENTSOURCE];
							vars.videoArray.push(video);
							//console.log("PDP");
						} else {

						}
					} 
					$('#video_gallery').html(methods.getVideoList());
					$('#video_gallery .video_link a').on('click', function() {
						settings.initPlay = false;
						methods.playVideo($(this).attr('data-video'), settings.initPlay);
						$('#video_gallery .video_link a').removeClass('selected');
						$(this).addClass('selected');
						if(typeof(settings.onPlay) === 'function') {
							settings.onPlay();	
						}
					});
					if(vars.videoArray.length > 0) {
						methods.playVideo(0, "true");
						setTimeout(function() {
							if(settings.lazyLoad) {
								$("img.lazy").lazyload({effect : "fadeIn"});
								$("img.lazy").lazyload({effect : "fadeIn", container: $("#video_gallery")});
							}
						}, 10);
					} else {
						$this.empty();
					}
				}
			} else {
				$this.hide();	
			}
			
			if(typeof(settings.callback) == 'function') {
				settings.callback();
			}
		},
		getVideoList : function() {
		    var html = "";
		    //console.log(vars.videoArray.length);
		    //console.log(vars.videoArray);
			for(var v = 0; v < vars.videoArray.length; v++) {
				html += '<span class="video_link"><a href="'+vars.videoArray[v].link+'" onclick="return false;" data-video="'+v+'">';
				
				settings.lazyLoad = true;
				try {
					$("img.lazy").lazyload();
				} catch(err) {
					settings.lazyLoad = false;
				}
				if(settings.lazyLoad) {
					html += '<img src=\"data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAQAICRAEAOw==\" class=\"lazy\" height="150" data-original="'+vars.videoArray[v].thumbnail+'" border="0" />';
				} else {
					html += '<img src="'+vars.videoArray[v].thumbnail+'" border="0" />';
				}
				html += '<span class="description">'+unescape(vars.videoArray[v].description)+'</span>';
				
				html += '</a></span>';
			}
			return html;
		},
		playVideo : function(vid, initPlay) {
			if(typeof(vars.videoArray[vid]) !==  'undefined') {
				if(vars.videoArray[vid].player == 'default') {
					$('#video_player_wrapper').videoplayer({height:'100%', width:'100%',videoDomain:settings.domain, baseURL:settings.domain+settings.swfpath,video:vars.videoArray[vid].video_link,thumbnail:vars.videoArray[vid].thumbnail, initPlay:initPlay});
				} else if(vars.videoArray[vid].player == 'partner') {
					$('#video_player_wrapper').html(vars.videoArray[vid].video_link)
				}
				if(initPlay != 'true') {
					window.scrollTo(0, $('#video_player_wrapper').offset().top);
				}
			}
			return false;

		}
	};
	
	$.fn.pdpVideo = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.pdpVideo' );
	    } 
	};
})(jQuery);
/* END pdpVideo */


/*
 * Contains recentlyViewed plugin
 */
(function($) { // Hide scope, no $ conflict
    var vars = {
	};
	var settings = {
		domain : '',
		imageDomain : '//images.footlocker.com',
		maxProducts : 10,
		noProducts : 'No Products Recently Viewed',
		cookieName: 'RECENTSKULIST', //Name of Recently Viewed SKU list
		excludedSkus :[],
		sku: '', //Product Number,
		cmbuckets: ['recently_viewed','product'],
		quickview: true,
		requestData: false,
		template: '[rv.image]',
		imageSize : ['cart','c']//image size 
									//[cart, c] - 50x50
									//[small, s] - 100x100 
									//[large, l] - 200x200 
									//[large_wide, w] - 300x300 
									//[zoom, z] - 500x500
	};
	var methods = {
		init : function(options) {
			settings = $.extend(settings, options);
			
		    //initial setup
		    return this.each(function() {
		    	var $element;
		    	$element = $(this);
				var cookieData = $.cookie('read', settings.cookieName);
				var code = '';
				var tempHTML = '';
				var listPrice = '';
				if(cookieData == "") {
					code = code + settings.noProducts;
				} else {
					code =  code + '<ul>';
					var productArray = cookieData.split(",");

					for (var p = 0; p < productArray.length; p++) {

					    if (p < settings.maxProducts) {
					        var product = productArray[p].split(":");

					        if (settings.excludedSkus.indexOf(product[0]) === -1) {

					            if (settings.requestData == true) {
					                $.ajax({
					                    url: '/search/json.cfm?Rpp=1&Ntt=' + product[0],
					                    dataType: 'json',
					                    method: 'get',
					                    async: false,
					                    beforeSend: function (jqXHR) {
					                        jqXHR.overrideMimeType("text/javascript; charset=iso-8859-1");
					                    },
					                    success: function (data) {
					                        var vars = {
					                            listPrice: data.RECORDS[0].PROPERTIES.P_StyleListPrice,
					                            salePrice: data.RECORDS[0].PROPERTIES.P_StyleSalePrice,
					                            genderAge: data.RECORDS[0].PROPERTIES.P_GenderAge,
					                            modelName: data.RECORDS[0].PROPERTIES.P_ModelName,
					                            maskPrice: data.RECORDS[0].PROPERTIES.P_MaskedPricing
					                        }

					                        if (settings.template != null) {
					                            tempHTML = '<li><a title="View '+vars.modelName+' Product Detail Page" href="' + data.RECORDS[0].PDPURL + '" class="recentViewed" data-recentsku="' + product[0] + '">';
					                            tempHTML += settings.template.replace(/(\[rv\.)([^\]]*)(\])/gi, function (m, p1, section, p3) { return methods.getSectionHTML(section, product[0], vars); });
					                            tempHTML += '</a></li>';
					                        }

					                        code += tempHTML;
					                    },
					                    error: function () {
					                        code += '<li><a title="View Recently Viewed Product" href="' + settings.domain + '/product/model:' + product[1] + '/sku:' + product[0] + '" class="recentViewed" data-recentsku="' + product[0] + '"><img src="' + settings.imageDomain + '/pi/' + product[0] + '/' + settings.imageSize[0] + '/" border="0" /></a></li>';
					                    }
					                });
					            }
					            else {
					                code += '<li><a title="View Recently Viewed Product" href="' + settings.domain + '/product/model:' + product[1] + '/sku:' + product[0] + '" class="recentViewed" data-recentsku="' + product[0] + '"><img src="' + settings.imageDomain + '/pi/' + product[0] + '/' + settings.imageSize[0] + '/" border="0" /></a></li>';
					            }

					        }
					        else {
					            settings.maxProducts = settings.maxProducts + 1;
					        }
					    }
					    else {
							p = productArray.length;
						}
					}
					code = code + '</ul>';
				}
				$element.html(code);
				if(settings.quickview) {
					$element.children('ul').children('li').children('a.recentViewed').on('click',function() {
						var cm = settings.cmbuckets.join('-_-');
						var sku = methods.getcmstring($(this).attr('data-recentsku'));
						if(typeof(cmCreateManualLinkClickTag) === 'function') {
							cmCreateManualLinkClickTag('/?cm_re='+cm + '-_-' + sku,sku);
						}
						if(typeof(openQuickViewWithURL) === 'function') {
							openQuickViewWithURL($(this).attr('href'));
							return false;
						}						
					});
				}
			});
			
		},
		getcmstring : function(term) {
			var searchTerm = $.trim(term.toString().toLowerCase());
			searchTerm = searchTerm.replace(/[/]/ig,'');
			searchTerm = searchTerm.replace(/[^a-z0-9-+ ]/ig,'');
	
			searchTerm = searchTerm.replace(/ +/ig,'_');
			searchTerm = searchTerm.replace(/-+/ig,'');
			searchTerm = searchTerm.replace(/_+/ig,'_');
			
			return searchTerm;
		},
		getSectionHTML: function (section, product, vars) {

		    if (section.toLowerCase() == 'image') {
		        return '<div class="rv_image"><img alt="" title="'+vars.modelName +'" src="' + settings.imageDomain + '/pi/' + product + '/' + settings.imageSize[0] + '/" border="0" /></div>';
		    }
		    if (section.toLowerCase() == 'modelname') {
		        return '<div class="rv_modelName">' + vars.modelName + '</div>';
		    }
		    if (section.toLowerCase() == 'listprice') {
		        if (vars.salePrice != vars.listPrice && vars.maskPrice == 'N') {
		            return '<div class="rv_listPrice old">$' + vars.listPrice + '</div><div class="rv_salePrice eb-heavy">Now: $' + vars.salePrice + '</div>';
		        }
		        else {
		            return '<div class="rv_listPrice eb-heavy">$' + vars.listPrice + '</div>';
		        }	       
		    }
		}

	};
	
	$.fn.recentlyViewed = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.recentlyViewed' );
	    } 
	};
})(jQuery);
/* END recentlyViewed */

/*
 * Contains pinElement plugin
 */
(function($) { // Hide scope, no $ conflict
	var vars = {
	};
	
	var methods = {
		init : function(options) {
			var settings = {
				pinTop : 0,
				initTop : 0,
				pinTrigger : 0,
				initPos : 'static',
				container : '',
				containerAdjust : 0
			};
			var variables = {
				stopPoint : 0,
				lockPoint : 0,
				containerOffset : 0,
				disable : false
			};
			settings = $.extend(settings, options);
			
			//initial setup
		    return this.each(function() {
		    	var $element;
		    	$element = $(this);
				$element.wrapInner('<div class="pinnedDiv" />');
				settings.initTop = $element.offset().top;
				settings.initPos = $element.css('position');
				if(settings.container != '') {
					variables.containerOffset = parseInt($(settings.container).offset().top);
				}
				
				$element.attr({'data-pinned':'false'});
				$(window).resize(function() {
					if($element.height() > (window.innerHeight - settings.pinTop)) {
						variables.disable = true;
						$element.attr({'data-pinned':'false'});
					} else {
						variables.disable = false;
					}
				});
				$(window).scroll(function() {
					if($element.height() > (window.innerHeight - settings.pinTop)) {
						variables.disable = true;
						$element.attr({'data-pinned':'false'});
					} else {
						variables.disable = false;
					}
					if(!variables.disable) {
						if(settings.container != '') {
							variables.stopPoint = variables.containerOffset + parseInt($(settings.container).height()) - parseInt($element.height() + settings.pinTop);
							variables.lockPoint = parseInt($(settings.container).height()) - parseInt($element.height());
						}
						
						if ($element.attr('data-pinned') == 'false' && ($element.offset().top - $(this).scrollTop() < parseInt(settings.pinTrigger))) {
							
							$element.children('.pinnedDiv').css({
								'position' : "fixed",
								'top': settings.pinTop+'px',
								'bottom' : 'auto'
							});
							$element.height($element.children('.pinnedDiv').height());
							$element.attr('data-pinned', 'true');
													
							
						} else if($element.attr('data-pinned') == 'true' && $(this).scrollTop() + parseInt(settings.pinTrigger) <= settings.initTop) {
							$element.children('.pinnedDiv').css({
								'position' : 'static'
							});
							$element.height('auto');
							$element.attr('data-pinned', 'false');
						}
						if($(this).scrollTop() >= variables.stopPoint && settings.container != '') {
							$(settings.container).css({position:'relative'});
							$element.children('.pinnedDiv').css({
								'position' : "absolute",
								'top': 'auto',
								'bottom' : '0'
							});
							$element.attr('data-pinned', 'false');
						} else {
						}
					} else {
						$element.children('.pinnedDiv').css({
							'position' : 'static'
						});
						$element.height('auto');
						$element.attr('data-pinned', 'false');
					}
				});
				$(window).resize();
				$element.on('click', function(){$(window).scroll();});
	
			});
			
		}	

	};
	
	$.fn.pinElement = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.pinElement' );
	    } 
	};
})(jQuery);
/* END pinElement */

/*
 * Contains pushdown plugin
 */

(function( $ ) {
	var ie = false;
	
	//check for css3 tranistion support
	/*var supportsTransitions  = (function() {
	    var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
	        v = ['ms','Moz','Webkit']; // 'v' for vendor
	
	    if( s['transition'] == '' ) return true; // check first for prefeixed-free support
	    while( v.length ) // now go over the list of vendor prefixes and check support until one is found
	        if( v.pop() + 'Transition' in s )
	            return true;
	    return false;
	})();*/
	
	//store all plugin methods in object, doesn't clog up $.fn namespace
	var methods = {
		//init the plugin
		init : function(options) { 
			var settings;
		    settings = $.extend( {
		    	target: "", //element to target
		    	animation: true,//animate or just toggle visibility
			    animationTime: 400,
			    prevent: true, //prevent default
			    height: "", //set height of the div to pushdown
			    hashChange: true, //open pushdown on pageload
			    open: "", //callback before open
			    close: "", //callback before close
			    callback: "", //callback for before and after animation is done
			    //group settings
			    group: false, //set for group of links pointing to same element
			    groupOpen: "", //callback for when group element is opening
			    switching: "" //callback for when switching between elements
		    }, options);
			
			//custom scroll init functions
		    if(!jQuery.support.cssFloat)
		    	ie = true;
		    
		    //init elements
			return this.each(function(){
				var $element = $(this), data = $element.data('pushdown', settings);
				
				
				//set attr for pushdown
				if(settings.target)
			    	$element.attr("data-href", settings.target);
			    else if($element.attr("href") !== undefined || $element.attr("href") !== "")
			    	$element.attr("data-href", $element.attr("href"));
			    else
			    	$.error("A target must be defined.");
				
				settings.target = $element.attr("data-href");
				
			    if(settings.height !== "")
			    	$($element.attr("data-href")).css({height: settings.height});

				/*if(supportsTransitions) {
					methods.setTrans(settings.target, settings);
					//methods.cssAnimate(settings.target);
					$(settings.target).hide().removeClass("remove");//.height(0).show();
				}*/

			    //call method based on type of pushdown wanted
			    if(settings.group) 
			    	methods.group($element, settings);
			    else
			    	methods.single($element, settings);
		    });
		},
		//handles group of elements targeting one div
		group : function(el, settings) {
			var $id = $(el.attr("data-href")), slide = false;
			
			//if(el.attr("data-href") === location.hash)
			//	el.pushdown("open");
			
			el.bind("click.pushdown", function(event) {
		    	if(settings.prevent)
		    		event.preventDefault();
				
				/*el.each(function() {
					console.log("here");
					$(this.getAttribute("data-inner-target")).hide();
				});*/
				
		    	if(!$id.is(":visible") || $id.height() == 0) {
		    		slide = true;
		    		el.addClass("selected");
		    		if(typeof settings.groupOpen == "function")
				    	settings.groupOpen(el);
		    	}
		    	else if(el.hasClass("selected")) {
		    		slide = true;
		    		el.removeClass("selected");
		    	}
		    	else {
		    		slide = false;
		    		$("[data-href='" + el.attr("data-href") + "']").removeClass("selected");
		    		el.addClass("selected");
		    		if(typeof settings.switching == "function")
				    	settings.switching(el);
		    	}

		    	if(slide) {
			    	if($id.is(":visible")) {
			    		if(typeof settings.close == "function") 
			    			settings.close(el);
			    	}
			    	else {
			    		if(typeof settings.open == "function") 
			    			settings.open(el);
			    	}
			    	
			    	methods.animate($id, settings);
		    	}
		    });
		},
		//handles single element targeting one div
		single : function(el, settings) {
			var $id = $(el.attr("data-href"));
			el.bind("click.pushdown", function(event) {
		    	if(settings.prevent)
		    		event.preventDefault();
		    		
		    	if(el.hasClass("selected"))
		    		el.removeClass("selected");
		    	else
		    		el.addClass("selected");

		    	if($id.is(":visible")) {
		    		if(typeof settings.close == "function") 
		    			settings.close(el);
		    	}
		    	else {
		    		if(typeof settings.open == "function") 
		    			settings.open(el);
		    	}
		    	
		    	methods.animate($id, settings);
		    });
		},
		//close the pushdown
		close : function(callback) { 
			var settings = $(this).data("pushdown");
			if(settings.group != true) {
				return this.each(function() {
					var $this = $(this), id = $this.attr("data-href");
					$(this).removeClass("selected");

					if(typeof settings.close === "function")
						settings.close($(this).eq(0));
					
					if($(id).is(":visible")) 
						methods.animate($(id), settings, "close");
				});
			}
			else {
				id = this.attr("data-href");
				this.each(function() {
					$(this).removeClass("selected");
				});
				
				if(typeof settings.close == "function")
					settings.close($(this).eq(0));
				
				methods.animate($(id), settings, "close");
				
				return this;
			}
		},
		//open the pushdown
		open : function(index) { 
			var settings = $(this).data("pushdown");
			if(settings.group !== true) {
				return this.each(function() {
					var $this = $(this), id = $this.attr("data-href");
					$this.addClass("selected");
					
					if(!$(id).is(":visible")) {
						methods.animate($(id), settings, "open");
				    }
				});
			}
			else {
				id = this.attr("data-href");
				this.removeClass("selected");
				this.eq(index).addClass("selected");
				
				if(typeof settings.groupOpen === "function")
					settings.groupOpen(this.eq(index));
					
				methods.animate($(id), settings, "open");
					
				return this;
			}
		},
		//animation logic
		animate : function(id, settings, command) {
	    	if(ie && settings.animation && id.is(":visible")) {
	    		setTimeout(function() {
	    			id.hide();
	    		}, settings.animationTime - 75);
	    	}
	    	
			if(command === undefined) {
				//use css3 for animation
			    /*if(settings.animation && supportsTransitions) {
			    	if(id.is(":visible")) {
			    		console.log(id.is(":visible"));
			    		methods.cssAnimate(id, settings);
			    		//id.height(0);
			    		methods.timer(settings.animationTime, true, id, settings);
			    	}
			    	else {
			    		//methods.removeTrans(id, settings);
			    		//id.height(0);
			    		console.log("why");
			    		methods.cssAnimate(id, settings);
						var height = id.prop("scrollHeight");			    	
			    		id.height(height);
			    		methods.timer(settings.animationTime, false, id, settings);
			    	}
			    }*/
			    //use javascript
				if(settings.animation) {
			    	id.slideToggle(settings.animationTime, function() {
			    		if(typeof settings.callback == "function")
			    			settings.callback();
			    	});
			    }
		    	else {
		    		id.toggle(function() {
		    			if(typeof settings.callback == "function")
			    			settings.callback();
		    		});
		    	}
	    	}
	    	else if(command === "close") {
	    		/*if(settings.animation && supportsTransitions) {
	    			methods.cssAnimate(id, settings);
	    			methods.timer(settings.animationTime, true, id, settings);
	    			//id.height(0);
	    		}*/
	    		if(settings.animation) 
			    	id.slideUp(settings.animationTime);
		    	else 
		    		id.hide();
	    	}
	    	else if(command === "open") {
	    		/*if(settings.animation && supportsTransitions) {
	    			methods.cssAnimate(id, settings);
	    			var height = id.prop("scrollHeight");			    	
			    	id.height(height);
			    	methods.timer(settings.animationTime, false, id, settings);
	    		}*/
	    		if(settings.animation) 
			    	id.slideDown(settings.animationTime);
		    	else 
		    		id.show();
	    	}
		},
		/*timer : function(time, hide, id, settings) {
			setTimeout(function() {
				if(hide) {
					$(id).hide();
				}
				//methods.removeTrans(id, settings);
				methods.removeAnimate(id, settings);
			}, time);
		},
		removeAnimate : function(id, settings) {
			$(id).css(
				{
					paddingBottom: '',
					paddingTop: '',
					marginTop: '',
					marginBottom: '',
					height: '',
					overflow: ''
				}
			);
		},
		removeTrans : function(id, settings) {
			$(id).css(
				{
					WebkitTransition: "",
					MozTransition: "",
					MsTransition: "",
					transition: ""
				}
			);
		},
		setTrans : function(id, settings) {
			var animTime = settings.animationTime / 1000;
			$(id).css(
				{
					WebkitTransition: "height " + animTime + "s",
					MozTransition: "height " + animTime + "s",
					MsTransition: "height " + animTime + "s",
					transition: "height " + animTime + "s"
				}
			);
		},
		cssAnimate : function(id) {
			$(id).show().css(
				{
					paddingBottom: 0,
					paddingTop: 0,
					marginTop: 0,
					marginBottom: 0,
					overflow: "hidden",
					height: 0
				}
			);
		},*/
		destroy : function() {
			return this.each(function() {
				var $this = $(this), data = $this.data("pushdown");
             	
				$this.unbind(".pushdown");
				$this.removeData("pushdown");
			});
		}
	};

	$.fn.pushdown = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.pushdown' );
	    } 
	};
})( jQuery );


/*
 * Contains fullScreen plugin
 */
(function($) { // Hide scope, no $ conflict
    var variables = {
        TOUCH_DEVICE : (typeof document.ontouchstart != "undefined") ? true : false
    };
    var settings = {
        data : null,
        views : null,
        sku: null,
        fullTemplate: null,
        group: false,
        currentView : 0,
        currentZoom : 2,
        maxZoom : 4,
        scene7url : 'http://images.footlocker.com/is/image/'
    };
	
    var methods = {
        init: function (options) {
            //initial setup
            settings = $.extend(settings, options);
            if(settings.data != null) {
                settings.views = options.data['IMAGE_SET'].split(",");	
            } else if(settings.sku != null) {
				
            }
            methods.initFull();
            $('#full_screen').width('100%');
            $('#full_screen').hide();
            $('#full_screen .close_btn').addClass('full_toggle');

            if (settings.group) {

                    var $element = this;
                    //  $element.off('click').on('click', methods.loadFull);
                    $element.addClass('full_toggle').attr('href', '#full_screen');

                    $('.full_toggle').pushdown({ open: methods.loadFull, close: methods.closeFull, group: true });

            }
            else {
                return this.each(function () {
                    var $element = $(this);
                    //  $element.off('click').on('click', methods.loadFull);
                    $element.addClass('full_toggle').attr('href', '#full_screen');

                    $('.full_toggle').pushdown({ open: methods.loadFull, close: methods.closeFull });
                });

            }
        },
        initFull: function () {
            $('#full_screen').remove();
            var tempHTML = '';
            if (settings.fullTemplate != null) {
                tempHTML += '<div id="full_screen">';
                tempHTML += settings.fullTemplate.replace(/(\[pdp\.)([^\]]*)(\])/gi, function (m, p1, section, p3) { return methods.getSectionHTML(section); });
                tempHTML += '</div>';
            }
            else {
                tempHTML += '<div id="full_screen"><div class="full_screen_header"><span class="inner_header"><span class="logo"></span><a title="Close Full Screen Mode" href="#full_screen" class="close_btn"></a><span class="controls"><span id="zoomIn"></span><span class="zoom_label"></span><span id="zoomOut"></span></span></span></div><span class="main_view"></span><span class="alt_views"></span></div>';
            }

            $('body').prepend(tempHTML);

            $('#full_screen').css({
                overflow: 'hidden'
            });
            $('#full_screen #zoomIn').click(function () { methods.zoomIn() });
            $('#full_screen #zoomOut').click(function () { methods.zoomOut() });
            $('#full_screen .main_view').on('mousedown', function () {
                $(this).removeClass('grabbing').addClass('grabbing');
            });
            $('#full_screen .main_view').on('mouseup', function () {
                $(this).removeClass('grabbing');
            });
            $(window).resize(function () {
                $('#full_screen').height($(window).height());
            });
            $(window).resize();
            methods.centerImage();
        },
        centerImage: function () {
            $('#full_screen .main_view').css({
                'top' : ($('#full_screen').height()/2) - (settings.currentZoom*500 / 2),
                'left' : ($('#full_screen').width()/2) - (settings.currentZoom*500 / 2),
                'position' : 'absolute'
            });
        },
        showFull: function (view) {
            //$('html, body').stop();
            if($('#full_screen .main_view img.main_img').length == 0) {
                $('<img/>', {
                    'data-view': view,
                    'title': "Full Screen Image",
                    'tabindex': 0,
                    'class' : 'main_img',
                    'src': settings.scene7url + view + "?wid="+settings.currentZoom*500+"&hei="+settings.currentZoom*500
                }).css({'position':'absolute','left':'0','top':'0'}).appendTo('#full_screen .main_view');
            } else {
                $('#full_screen .main_view img.main_img').attr({'src':settings.scene7url + view + "?wid="+settings.currentZoom*500+"&hei="+settings.currentZoom*500, 'data-view':view});
            }
            try {
                $('#full_screen .main_view').draggable();
            } catch(err) {
				
            }
			
            $('#full_screen .main_view > img.main_img').load(function() {
				
                if($('#full_screen .main_view img.loading_img').length == 0) {
                    $('<img/>', {
                        'data-view': view,
                        'class' : 'loading_img',
                        'src': settings.scene7url + view + "?wid="+settings.currentZoom*500+"&hei="+settings.currentZoom*500
                    }).css({'position':'absolute','left':'0','top':'0'}).appendTo('#full_screen .main_view');
                } else {
                    $('#full_screen .main_view img.loading_img').attr({'src':settings.scene7url + view + "?wid="+settings.currentZoom*500+"&hei="+settings.currentZoom*500, 'data-view':view});
                }
				
                $('#full_screen .main_view img.main_img').hide();
                //$('#full_screen').stop();
                //$('#full_screen').animate({opacity:1},500);
                //$('#full_screen .main_view > img.loading_img').css({'visibility':'hidden'});
            });
            $('html, body').animate({scrollTop: "0"}, 0);
            $('html').css({ overflow: 'hidden' });
            setTimeout(function () { 
                $('#zoomIn').focus();
            }, 200);

        },
        getSectionHTML: function (section) {
            var html = '';
           
            if (section.toLowerCase() == 'logo') {
                return '<span class="logo"></span>';
            }
            if (section.toLowerCase() == 'productname') {
                return '<span class="product_name"></span>';
            }
            if (section.toLowerCase() == 'close') {
                return '<a title="Close Full Screen Mode" href="#full_screen" class="close_btn full"></a>';
            }
            if (section.toLowerCase() == 'zoomcontrols') {
                return '<span class="controls"><span title="Zoom In" tabindex="0" id="zoomIn"></span><span class="zoom_label"></span><span title="Zoom Out" tabindex="0" id="zoomOut"></span></span>';
            }
            if (section.toLowerCase() == 'mainview') {
                return '<span class="main_view"></span>';
            }
            if (section.toLowerCase() == 'alternateviews') {
                return '<span class="alt_views"></span>';
            }

        },
	    loadFull: function () {

			$('#full_screen').height($(window).height());
			$('#full_screen .alt_views').empty();
			var tempHTML = '';
			for (var i = 0; i < settings.views.length; i++) {
			    
			    tempHTML += '<img src="' + settings.scene7url + settings.views[i].toString().split(';')[0] + '?wid=100&hei=100" title="Alternate View ' + i + '" tabindex="0" id="' + settings.views[i].toString().split(';')[0] + '"  />';
			  /*  $('<img />', {
			        'title': "Alternate View " + image,
                    'tabindex': 0,
					'id': settings.views[image].toString().split(';')[0],
					'src': settings.scene7url + settings.views[image].toString().split(';')[0] + "?wid=100&hei=100"
				}).appendTo('#full_screen .alt_views');*/
			}
			$('#full_screen .alt_views').append(tempHTML);
			$('#full_screen .alt_views > img').click(function () { methods.showFull($(this).attr('id')) });
			methods.centerImage();
			$('.full_screen_header .close_btn').addClass('selected');
			methods.showFull(settings.views[0].split(';')[0]);
			
		},
	    closeFull: function () {
			$('html').css({overflow:'auto'});
		},
	    zoomIn: function () {
			if(settings.currentZoom < settings.maxZoom) {
				settings.currentZoom++;
				methods.loading();
				methods.showFull($('#full_screen .main_view img.main_img').attr('data-view'));
			}
		},
	    zoomOut: function () {
			if(settings.currentZoom > 1) {
				settings.currentZoom--;
				methods.loading();
				methods.showFull($('#full_screen .main_view img.main_img').attr('data-view'));
			}
		},
	    loading: function () {
			$('#full_screen .main_view img.main_img').hide();
			$('#full_screen .main_view img.loading_img').stop();
			$('#full_screen .main_view img.loading_img').animate({
				'height' : settings.currentZoom * 500,
				'width' : settings.currentZoom * 500
			},200);
			$('#full_screen .main_view').stop();
			$('#full_screen .main_view').animate({
				'left' : parseInt($('#full_screen .main_view').offset().left - (((settings.currentZoom * 500 - $('#full_screen .main_view img.loading_img').width()) / 2) )),
				'top' : parseInt($('#full_screen .main_view').offset().top - ( ((settings.currentZoom * 500 - $('#full_screen .main_view img.loading_img').width()) / 2) ))
			},200);
		}

	};
	$.fn.fullScreen = function(method, options) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.cartInfo' );
	    } 
	};
})(jQuery);
/* END fullScreen */

/*
 * Contains inlineZoom plugin
 */
(function($) { // Hide scope, no $ conflict
	var variables = {
		TOUCH_DEVICE : (typeof document.ontouchstart != "undefined") ? true : false
	};
	var settings = {
		baseImage : '',
		initAction : 'mouseenter',
		closeAction : 'mouseleave',
		width : 1000,
		height : 1000,
		zoomLevels : [],
		targetHeight : 500,
		targetWidth : 500,
		zoomTarget : null,
		currentZoom : 1,
		maxZoom : 4,
		zoomSize : 1500,
		viewSize : 300,
		maxResolution : 2000,
		element : null,
		devicePixelRatio : window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI,
		type : 'drag' // drag, magnify, followmouse
	};
	
	var methods = {
		init : function(options) {
			//initial setup
			settings = $.extend(settings, options);
			
			return this.each(function(){
				var $element = $(this);
				$element.css({
					'display':'inline-block',
					'position':'relative',
					'overflow':'hidden'
				});
				if(settings.zoomTarget != null) {
					$element.data("target", $(settings.zoomTarget));
				} else {
					$element.data("target", $element);
				}
				
				if($element.data("target").children('img.zoom_image').length === 0) {
					if(settings.baseImage !== '') {
						$element.data("target").append('<img class="zoom_image" data-zoomsrc="'+settings.baseImage+'" border="0" />');
					}
				}
				if($element.data("target").children('img.zoom_image').length !== 0) {
					$element.data("target").children('img.zoom_image').css({
						'z-index':'1',
						'position':'absolute'
					}).wrap('<div class="mouse_follow"></div>').wrap('<div class="zoom_images" style="position:absolute;top:0;left:0;"></div>').hide();
					
				}
				if(settings.initTarget == null) {
					settings.initTarget = $element;
				}
				if(settings.closeTarget == null) {
					settings.closeTarget = $element;
				}
				
				$element.unbind(settings.initAction);	
				$element.unbind(settings.closeAction);	
				
				if(settings.zoomLevels.length > 0) {
					settings.maxZoom = settings.zoomLevels.length;
					settings.targetHeight = settings.zoomLevels[settings.currentZoom - 1];
					settings.targetWidth = settings.zoomLevels[settings.currentZoom - 1];
				}
				
				if(settings.type !== 'drag') {
					$element.bind(settings.initAction, function(){methods.initZoom($element)});	
					$element.bind(settings.closeAction, methods.closeZoom);	
				}
				if(settings.type == 'drag') {
					$element.children('img.reg_image').load(function() {
						methods.initZoom($element);
					});
				}
			});
		},
		initZoom : function(target) {
			
			var zoomSizes = settings.zoomSize * settings.devicePixelRatio;
			if(zoomSizes > settings.maxResolution) {
				zoomSizes = settings.maxResolution;	
			}
			
			if(target.data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('data-zoomsrc') != null) {
				target.data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('src', target.data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('data-zoomsrc'));
				target.data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image');
			}
			target.data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').show();
			
			if(settings.type == 'followmouse' || settings.type == 'magnify') {
				target.unbind('mousemove', methods.updatePan);
				target.bind('mousemove', methods.updatePan);
				target.children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('src', target.children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('data-zoomsrc') + '?hei='+zoomSizes +'&wid='+zoomSizes).height(settings.zoomSize).width(settings.zoomSize).show();
			}
			if(settings.type == 'followmouse') {
				target.css({'cursor':'none'});	
			}
			if(settings.type == 'drag') {
				target.data('target').children('.reg_image').css({'visibility':'hidden'});
				settings.currentZoom = 1;
				target.data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').css({
					'top' : '0',
					'left' : '0',
					'width' : settings.targetWidth,
					'height' : settings.targetHeight,
					'z-index' : '1'
				});
				try {
					target.data('target').children('.mouse_follow').children('.zoom_images').draggable();
					target.data('target').children('.mouse_follow').children('.zoom_images').draggable('disable');
				} catch(err) {
					
				}
				target.data('target').attr('data-zoomlevel',settings.currentZoom);
				target.data('target').unbind('click', methods.updateZoomLevel);
				target.data('target').bind('click', methods.updateZoomLevel);
				
				var width = 0;
				
				if(settings.targetWidth.toString().indexOf('%') !== -1) {
					width = (settings.targetWidth.replace(/%/gi, '')/100) * target.data('target').outerWidth();
				} else {
					width = settings.targetWidth;
				}
				
				target.children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('src', target.children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('data-zoomsrc') + '?hei='+zoomSizes+'&wid='+zoomSizes).height(width).width(width).show();
				target.children('.mouse_follow').children('.zoom_images').children('img.loading_img').remove();
				target.children('.mouse_follow').children('.zoom_images').css({'top':'0','left':'0'});
				target.children('.mouse_follow').children('.zoom_images').children('img.zoom_image').load(function() {
					if($(this).parent('.zoom_images').children('img.loading_img').length == 0) {
						$('<img/>', {
							'class' : 'loading_img',
							'src': $(this).parent('.zoom_images').children('img.zoom_image').attr('src')
						}).css({'left':'0','top':'0','z-index':'2','height':settings.targetHeight,'width':settings.targetWidth}).appendTo($(this).parent('.zoom_images'));
					} else {
						$(this).parent('.zoom_images').children('img.loading_img').attr({'src':$(this).parent('.zoom_images').children('img.zoom_image').attr('src')});		
					}
								
					$(this).parent('.zoom_images').children('img.zoom_image').hide();
				});
			}
			target.addClass('zoom_active');
			target.data('target').children('.mouse_follow').children('.zoom_images').show();
		},
		loading : function(target, e) {
			try {
				target.data('target').children('.mouse_follow').children('.zoom_images').draggable('disable');
			} catch(err) {
				
			}
			target.children('.mouse_follow').children('.zoom_images').children('img.zoom_image').hide();
			target.children('.mouse_follow').children('.zoom_images').children('img.loading_img').stop();
			
			if(settings.zoomLevels.length > 0) {
				settings.targetHeight = settings.zoomLevels[settings.currentZoom - 1];
				settings.targetWidth = settings.zoomLevels[settings.currentZoom - 1];
			}
			
			var width = 0;
			
			if(settings.targetWidth.toString().indexOf('%') !== -1) {
				width = (settings.targetWidth.replace(/%/gi, '')/100) * target.data('target').children('img.reg_image').width();
			} else {
				width = settings.targetWidth;
			}
			
			target.children('.mouse_follow').children('.zoom_images').children('img.loading_img').animate({
				'height' : width,
				'width' : width
			},200, function() {
				target.children('.mouse_follow').children('.zoom_images').children('img.loading_img').css({
					'height':settings.targetHeight,
					'width':settings.targetWidth
				});
			});
				
			var left = 0;
			var top = 0;
			
			if(settings.currentZoom != 1) {
				
				try {
					target.data('target').children('.mouse_follow').children('.zoom_images').draggable('enable');
				} catch(err) {
					
				}
				
				var parentOffset = target.data('target').children('.mouse_follow').children('.zoom_images').offset();
				
				
				var xPercent = ((e.pageX - parentOffset.left) /  target.data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').width());
				var yPercent = ((e.pageY - parentOffset.top) /  target.data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').height());
				
				left = parseInt(  (target.width() / 2) - (xPercent * (settings.targetWidth))  );
				top = parseInt(  (target.height() / 2) - (yPercent * (settings.targetWidth))  );
			}

			target.children('.mouse_follow').children('.zoom_images').stop();
			target.children('.mouse_follow').children('.zoom_images').animate({
				'left' : left,
				'top' : top
			},200);
		},
		closeZoom : function(e) {
			$(this).data('target').children('.reg_image').css({'visibility':'visible'});
			$(this).data('target').children('.mouse_follow').children('.zoom_images').hide();
			$(this).unbind('mousemove');
			$(this).removeClass('zoom_active');
		},
		updateZoomLevel : function(e) {
			if(settings.currentZoom + 1 > settings.maxZoom) {
				settings.currentZoom = 1;
			} else {
				settings.currentZoom++;	
			}
			if(settings.currentZoom == settings.maxZoom) {
				$(this).attr('data-zoom', 'out');
				$('[data-text="productzoom"]').attr('data-zoom', 'out');
			} else {
				$(this).attr('data-zoom', 'in');
				$('[data-text="productzoom"]').attr('data-zoom', 'in');
			}
			$(this).attr('data-zoomlevel', settings.currentZoom);
			methods.loading($(this),e);
			
			
			var height;
			var width;
			
			if(settings.targetWidth.toString().indexOf('%') !== -1) {
				width = (settings.targetWidth.replace(/%/gi, '')/100) * $(this).children('img.reg_image').width();
				height = (settings.targetWidth.replace(/%/gi, '')/100) *  $(this).children('img.reg_image').width();
			} else {
				width = settings.targetWidth;
				height = settings.targetWidth;
			}
			var zoomSizes = height * settings.devicePixelRatio;
			if(zoomSizes > settings.maxResolution) {
				zoomSizes = settings.maxResolution;	
			}
			
			$(this).children('.mouse_follow').children('.zoom_images').children('img.zoom_image').css({
				'height':height,
				'width':width
			});
			$(this).children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('src', $(this).children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('data-zoomsrc') + '?hei='+zoomSizes+'&wid='+zoomSizes).height(width).width(width).show();

		},
		updatePan : function(e) {
			
			var parentOffset = $(this).offset();
			
			var xPercent = -((e.pageX - parentOffset.left) / $(this).children('img.reg_image').width());
			var yPercent = -((e.pageY - parentOffset.top) / $(this).children('img.reg_image').height());
			
			
			if(settings.type == 'followmouse') {
				$(this).data('target').children('.mouse_follow').children('.zoom_images').css({
					'position':'absolute',
					'height' : settings.viewSize + 'px',
					'width' : settings.viewSize + 'px',
					'overflow' : 'hidden',
					'top': (e.pageY - parentOffset.top) + (yPercent * settings.viewSize) + 'px',
					'left': (e.pageX - parentOffset.left) + (xPercent * settings.viewSize) + 'px'
				});
			}
			
			var top = ((yPercent * $(this).data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').height()) - (yPercent * $(this).data('target').children('.mouse_follow').children('.zoom_images').height()));
			var left = ((xPercent * $(this).data('target').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').width()) - (xPercent * $(this).data('target').children('.mouse_follow').children('.zoom_images').width()));
						
			$(this).data("target").children('.mouse_follow').children('.zoom_images').children('img.zoom_image').css({
				'left' : left + 'px',
				'top' : top + 'px'
			});
		}

	};
	$.fn.inlineZoom = function(method, options) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.inlineZoom' );
	    } 
	};
})(jQuery);
/* END inlineZoom */

/*
 * Contains slideMenu plugin
 */
(function($) { // Hide scope, no $ conflict
	
	var methods = {
		init : function(options) {
			var settings = {
			};
			
			settings = $.extend(settings, options);
			
			//initial setup
		    return this.each(function() {
		    	var $element;
		    	$element = $(this);
				$element.wrapInner('<div class="navWrapper" />');
				$element.data('currentlevel', 1);
				$element.css({overflow:'hidden'});
				var numLevels = 1;
				$('[data-level]').each(function() {
					if($(this).data('level') != 1) {
						$(this).hide();
						if($('[data-levelcontent='+$(this).data('level')+']').length == 0) {
							$element.children('.navWrapper').append($('<span />', {'class':'level_content level-'+$(this).data('level')}));
							$('.level-'+$(this).data('level')).append($('<a />',{'href':'javascript:void(0);','class':'back'}).html('back'));
							$('.level-'+$(this).data('level')).append($('<ul />', {'data-levelcontent':$(this).data('level')}));
							numLevels++;
						}
					} else {
						$(this).addClass('level_content level-'+$(this).data('level'));
					}
				});
				var styles = {'float':'left', 'width' : (100/numLevels) + '%', 'display': 'inline-block'};
				$('[data-level=1]').css(styles);
				$('.level_content').css(styles);
				$element.children('.navWrapper').width((numLevels * 100) + '%');
				$('.navWrapper').on('click', 'a.back', function() {methods.prevTier($element)});
				$('.navWrapper').on('click', '[data-level] a', function() {methods.nextTier($element, $(this))});
				$('.navWrapper').on('click', '[data-levelcontent] a', function() {methods.nextTier($element, $(this))});
			});
			
		},
		prevTier : function(ele) {
			ele.data('currentlevel', parseInt(ele.data('currentlevel'))-1);
			$('.navWrapper').animate({marginLeft:-((ele.data('currentlevel')-1) * 100) + '%'}, 250, function(){methods.updateHeight(ele)});
		},
		nextTier : function(ele, tier) {
			if(tier.siblings('[data-level]').length != 0) {
				ele.data('currentlevel', parseInt(ele.data('currentlevel'))+1);
				$('[data-levelcontent='+ele.data('currentlevel')+']').html(tier.siblings('[data-level]').html());
				$('.navWrapper').animate({marginLeft:-((ele.data('currentlevel')-1) * 100) + '%'}, 250, function(){methods.updateHeight(ele)});
				return false;
			}
		},
		updateHeight : function(ele) {
			ele.height($('.level-'+ele.data('currentlevel')).innerHeight());
		}

	};
	
	$.fn.slideMenu = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.slideMenu' );
	    } 
	};
})(jQuery);
/* END slideMenu */

/*
 * Contains techIcons plugin
 */
(function($) { // Hide scope, no $ conflict
	
	var methods = {
		init : function(options) {
			var settings = {
				skuData : {},
				metadata : {},
				mobile : false,
				action : 'mouse',
				showEvent : 'mouseenter',
				hideEvent : 'mouseleave',
				show : function (e, $el) { $el.fadeIn(100); $('.tooltip-close').unbind('click'); $('.tooltip-close').bind('click', function(){$('.tech-icon-'+$(this).data('meta')).click();$('.tech-icon-'+$(this).data('meta')).mouseout()}); },
				hide : function (e, $el) { $el.fadeOut(100); console.log('hide');},
				touch : (typeof document.ontouchstart != "undefined") ? true : false //check if on touch device
			};
			
			settings = $.extend(settings, options);
			
			//initial setup
		    return this.each(function() {
		    	var $element;
		    	$element = $(this);
				$element.html('<ul></ul>');
				if(settings.touch || settings.action === 'click') {
					settings.showEvent = 'click';
					settings.hideEvent = 'click';
				}
				if(settings.mobile) {
					settings.show = function (e, $el) {
						$('#tooltipHolder').html($el.html());
						$('.tooltip-close').unbind('click');
						$('.tooltip-close').bind('click', function(){ $('.tech-icon-'+$(this).data('meta')).click()});
					};
					settings.hide = function (e, $el) {$('#tooltipHolder').empty();}
				}
				$.each(settings.skuData, function(index, value) {
					if(typeof value === 'string' && settings.metadata[index] !== undefined) {
						$.each(settings.metadata[index], function(v, val) {
							var attr = value.split(',');
							$.each(attr, function(a, att) {
								if(encodeURIComponent(val.values).indexOf(encodeURIComponent(att)) !== -1) {
									var meta = methods.getValue(val.ref)
									$element.append('<li class="tech-icon-'+meta+'" data-tooltip="'+meta+'"></li>');
									$('.tech-icon-'+meta).tooltipsy({
										content: '<span href="javascript:void()" class="tooltip-close" data-meta="'+meta+'">Close [X]</span><span class="tech-icon-lg-'+meta+'"></span><span class="tipTitle">'+val.display+'</span><span class="tipDesc">'+val.description+'</span>',
										className: "tooltipy-icons oswald",
										showEvent: settings.showEvent,
										hideEvent: settings.hideEvent,
										delay : 0,
										show : settings.show,
										hide : settings.hide,
										offset: [-1, 0]
									});
									
								}
							});
						});
					}
				});
			});
			
		},
		getValue : function(value) {
			var val = value.toLowerCase().replace(/[ _]/, '');
			return val;
		}

	};
	
	$.fn.techIcons = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.techIcons' );
	    } 
	};
})(jQuery);
/* END techIcons */

/*
 * Contains wishlist plugin
 */
(function($) { // Hide scope, no $ conflict
	
	var settings = {
		platform : 'desktop',
		secured_dialog : 'false',
		loginTemplatePath : '/wishlist/wl_iframe',
		formAction : '/catalog/addToCart',
		formName : 'product_form',
		formMethod : 'post',
		formId : 'product_form',
		sku : '',
		skuNameId : ['sku','promo_selectedSKU'],
		model : '',
		modelNameId : ['the_model_nbr','promo_model'],
		qty : '1',
		qtyNameId : ['qty','promo_quantity'],
		size : '',
		sizeNameId : ['size','promo_selectedSize'],
		coreMetricsCategory : 'blank',
		coreMetricsCategoryNameId : ['coreMetricsCategory','promo_coremetrics'],
		touch : (typeof document.ontouchstart != "undefined") ? true : false, //check if on touch device
		baseJS : '/combine?type=js&files=shared/wishlist/wl_addToWishlist.js,shared/inlineAddToCart/miniAddToCart.js,shared/tellafriend/tellafriend.js,shared/gLightBox/gLightBox.js,shared/wishlist/wl_sharedWishList.js,shared/myAccount/login.js',
		baseCSS : '/combine?type=css&files=shared/tipped/tipped.css,/css/typography.css,/css/style.css,/css/default_template.css,shared/quickview/quickview.css,shared/quickview/quickviewPDP.css,shared/wishlist/wl_addToWishlist.css,shared/inlineAddToCart/miniAddToCart.css,shared/tellafriend/tellafriend.css,shared/gLightBox/gLightBox.css,shared/wishlist/wl_sharedWishList.css,shared/myAccount/login.css,shared/endeca/css/autosuggest_inquisitor.css,/endeca/autosuggest.css',
		wishlistType : 'Promo'
	};
	var methods = {
		init : function(options) {
			
			settings = $.extend(settings, options);
			
			if(location.protocol == 'https:') {
				settings.secured_dialog = 'true';	
			}
			//initial setup
			 return this.each(function() {
		    	var $element;
		    	$element = $(this);
				methods.createForm();
				if(settings.platform == 'desktop') {
				$element.attr('id','addToWishlist');
					if (document.createStyleSheet) {
						document.createStyleSheet(settings.baseCSS);
					} else {
						$('<link rel="stylesheet" href="'+settings.baseCSS+'" type="text/css" />').appendTo('head');
					}
					$.getScript(settings.baseJS, function() {
						var data = '<script type="text/javascript">'
							data += 'var secured_dialog = '+settings.secured_dialog+';';
							data += 'var loginTemplatePath = "'+settings.loginTemplatePath+'";';
							data += 'function checkHotLaunchItem() {return false;}';
							data += 'function validateProduct(){return "";}';
							data += 'function showBubble(message) {console.log("Show Bubble");}';
						data += '<\/script>';  
						$('#wl_scripts').remove();
						$('<div />',{
							'id':'wl_scripts'
						}).html(data).appendTo('body');
						addToWishlist(settings.wishlistType);
					});
				} else {
					
					var data = '<script type="text/javascript">';
						data += 'function doAfterLogin() {';
							data += 'var formData = $("#product_form").serialize();';
							data += 'formData = formData + "&action=selectWishList&calledFrom=promo";';
							data += 'dialogWidget.postSecureRequest(';
								data += '"https://'+location.hostname+'/?uri=wishList/gateway"';
								data += ', formData';
								data += ', function(){';
								data += '}';
								data += ', function(){';
								data += '	console.log("ERROR");';
								data += '}';
							data += ');';
						data += '}';
					data += '<\/script>';  
					
					console.log(data);
					
					
					$('#wl_scripts').remove();
					$('<div />',{
						'id':'wl_scripts'
					}).html(data).appendTo('body');
					$('<a href="#" dialog="dialogWidgetContainer"></a>').dialog().click();
					dialogWidget.postSecureRequest('https://'+location.hostname+'/?uri=account/loginWidget', {action: 'login', doAfterLogin: 'doAfterLogin'}, function(){}, function(){});
				}
			 });
		},
		createForm : function() {
			$('form#'+settings.formId).remove();
			$('<form />',{
				'id':settings.formId,
				'name':settings.formName,
				'method':settings.formMethod,
				'action':settings.formAction		
			}).appendTo('body');
			$('form#'+settings.formId).append(methods.getInput(settings.skuNameId[0], settings.skuNameId[1], settings.sku));
			$('form#'+settings.formId).append(methods.getInput(settings.modelNameId[0], settings.modelNameId[1], settings.model));
			$('form#'+settings.formId).append(methods.getInput(settings.qtyNameId[0], settings.qtyNameId[1], settings.qty));
			$('form#'+settings.formId).append(methods.getInput(settings.sizeNameId[0], settings.sizeNameId[1], settings.size));
			$('form#'+settings.formId).append(methods.getInput(settings.coreMetricsCategoryNameId[0], settings.coreMetricsCategoryNameId[1], settings.coreMetricsCategory));
		},
		getInput : function(name, id, value) {
			return('<input type="hidden" id="'+id+'" name="'+name+'" value="'+value+'" />')
		}

	};
	
	$.fn.addToWishlist = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.techIcons' );
	    } 
	};
})(jQuery);
/* END wishlist */
