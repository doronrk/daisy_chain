/*!
 * Rotodrag for jQuery
 * http://jquery.com/
 *
 * Copyright 2010, Ivo Janssen
 * http://codedealers.com/projects/js/
 * Released under the GPL License.
 *
 * Based on the threesixty function by Mathieu Dumais-Savard (2009
 * http://www.mathieusavard.info/
 * Copyright 2010, The Dojo Foundation
 *
 * UPDATES
 *	v.6	Initial version
 *	v.7	Now finds imageDir by itself if not specified
 *		Rotation can be continued outside the <img> area when dragging
 *	v.8	Added #control360 id to control <div> for better control
 *
 * v.8
 */

jQuery.fn.rotodrag = function(options) {
	
	options = options || {};
	options.angles = options.angles || 0;
	options.images = [];
	options.startFrame = options.startFrame || 0;
	options.resetMargin = options.resetMargin || 0;
	options.direction = options.direction || "forward";
	options.imageDir = options.imageDir || false;
	options.extension = options.extension || "jpg";
	options.play = options.play || false;
	options.playSpeed = options.playSpeed || 80;
	options.playLimit = options.playLimit || false;

	return this.each(function(){
		var imgArr = [];
		var framesUsed = 0;
		var pic = $(this);
		var playing = false;
		
		// Get path to images
		if (options.imageDir == false) options.imageDir = $(this).attr("src").replace(/01\.jpg/,"");
		
		// Create image filenames and preload
		for (var x=1; x<=options.angles; x++) {
			fileName = (x.toString().length == 1) ? "0" + x + "." + options.extension : x + "." + options.extension;
			filePath = options.imageDir + fileName;
			options.images.push(filePath);
			var o = $("<img>").attr("src", filePath);
			$("body").append(o);
			o.hide();
		}

		// Create the loop of slices		
		for (var y=0; y<options.images.length; y++) {
			imgArr.push(options.images[y]);
		}

		//add the first slice again to complete the loop
		imgArr.push(options.images[0]);
		
		if (options.direction == "backward") imgArr.reverse();
		
		var follower;
		if (!$.browser.msie) {
			follower = $("<div>").css({"z-index":0, "width":"16px", "height":"16px", "position":"absolute", "top": pic.offset().top, "left":pic.offset().left, "cursor": "move"}).attr("id", "control360");
			$("body").append(follower);
			disableSelection(follower[0]);
		}
		disableSelection(pic[0]);
		var imgSrc, enabled, showFrame;
		var currentFrame = showFrame = options.startFrame;
		var lastClick = 0;
		$("body").mousemove(function(e) {
			if (!enabled && (e.pageX <= pic.offset().left + options.resetMargin || e.pageX > pic.offset().left + pic.width() - options.resetMargin || e.pageY <= pic.offset().top + options.resetMargin || e.pageY >= pic.offset().top + pic.height() - options.resetMargin)) {	
				if (!options.play) currentFrame = showFrame;
				return false;
			}
			if (follower) follower.css({"top": e.pageY-8, "left": e.pageX-8});
			if (enabled == true) {
				showFrame = (Math.floor((e.pageX - lastClick) / (pic.width()/imgArr.length)) + currentFrame) % imgArr.length;
				if (showFrame < 0) showFrame = imgArr.length + showFrame;
				pic.attr("src",imgArr[showFrame]);
			}
		})
		pic.add((follower) ? follower : null).mouseup(function() {
			currentFrame = showFrame;
			enabled=false; 
		}).mousedown(function(e) {
			if (options.play) stop();
			enabled=true;
			lastClick = e.pageX;
		});
		
		// Autoplay
		if (options.play) play();
		
		// Play controls
		$(".animationcontrol").click(function() {
			if ($(this).hasClass("play")) {
				options.playLimit = false;
				play();
			}
			else if ($(this).hasClass("pause")) stop();
		});		
		
		// Play animation
		function play() {
			options.play = true;
			playing = setInterval(animate, options.playSpeed);
			$(".animationcontrol").removeClass("play").addClass("pause").text("Pause");
		}
		
		// Stop animation
		function stop() {
			clearInterval(playing);
			options.play = false;
			$(".animationcontrol").removeClass("pause").addClass("play").text("Rotate").fadeIn();
		}
		
		// Animate rotation
		function animate() {
			showFrame = currentFrame = currentFrame - 1;
			if (currentFrame < 0) currentFrame = imgArr.length + currentFrame - 1;
			if (options.playLimit && framesUsed > options.playLimit) stop();
			framesUsed++;
			pic.attr("src", imgArr[currentFrame]);
		}	
	
	});		

	// Based on Bret Taylor's work : http://ajaxcookbook.org/disable-text-selection/
	function disableSelection(element) {
		element.onselectstart = function() {
			return false;
		};
		element.unselectable = "on";
		element.style.MozUserSelect = "none";
		element.style.WebkitUserSelect = "none";
		element.style.UserSelect = "none";
	}

};