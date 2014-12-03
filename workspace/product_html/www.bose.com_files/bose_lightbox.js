//jQuery.noConflict();

/***
** title: Lightbox
** author: Dan DeRose
** company: Bose Corporation
** requires: jQuery 1.4.2, swfobject
** last updated: 1/17/2011 by Dan DeRose
** description: Creates a lightwindow effect. Works with images, pdf, flash, inline content, local (domain) external pages loadeded via Ajax and external sites loaded into an iframe. Uses the title attribute of the <a> tag for the text in the title bar of the lightbox. Highly skinnable through the css file with a few options below in this js file.

** Usage: Tag all links to the lightbox with the class "lightbox": <a href="some_stuff" class="bose_lightbox" title="Some stuff">Some link</a>.
For an image file, simply link to the image file in the href and the lightwindow will automatically resize to fit the image. There is an imageMargin variable below that allows you to set the margin between the edge of the window and the border of the ligtbox. Example: <a href="image.png" title="Image" class="lightbox">image</a>

For a pdf, local external page, or external site (domain) link do the same but you can optionally provide dimensions in the rel attribute [width,height]. If you do not provide dimensions in the rel attribute it defaults to 600x500. This can be changed below in the height and width variables. Example: <a href="some_pdf.pdf" rel="800,600" title="Some pdf">pdf</a>.

For a Flash file everything is the same except you MUST provide the dimensions of the Flash movie in the rel attribute or the script won't know what dimensions the Flash movie is and will show nothing (width and height of 0). Example: <a href="some_flash.swf" title="Flash movie" rel="660,310" class="lightbox">Some flash movie</a>.

For inline content create a hidden div with a unique id and put your content into it. Reference it in the lightbox link with a hash mark: <a href="#inline_content" rel="600,500" title="Inline Content">Some inline content</a>. <div id="inline_content">This content will show up in the light box</div>.

** Features: By default, the lightbox has a title bar and uses the title attribute of the <a> tag as the text there. It will also, by default, show the close button and close the lightbox if you click outside the lightbox area or strike the Esc key on the keyboard. Either of these behaviors can be overwritten for an individual lightbox or on a global scale; these options are also in the rel tag. Format: rel="[width],[height],[disable title bar],[disable close link and behaviors]".

If you wish to disable either the close link on an individual lightbox you MUST also specify the titlebar behavior the rel tag. For example, to disable the close options but leave the title bar intact you would do: rel="600,400,true,true". SEE OPTIONS BELOW WITH EXPLANTIONS.
***/

function lightbox() {
	// User configurable values
	this.outerMargin = 20; // The minimum margin (in pixels) between the outside of the light box and the browser windor
	this.imageMargin = 15; // The margin (in pixels) between the edges of the image and the outside of the lightbox
	this.height = 500; // Default height (in pixels) if no height is specified in rel attribute
	this.width = 600; // Default width (in pixels) if no width is specified in rel attribute
	this.disableClose = false;
	this.disabletitleBar = false;
	this.iframeOverride = false;
	this.minFlashVersion = '9.0.0'; // Define minimum Flash version requirement here

	/************** Do not modify anything below this line **************/
	this.pageHeight = jQuery(window).height();
	this.pageWidth = jQuery(window).width();
	this.lightboxMargin = (this.pageWidth - this.width)/2;
	this.lightboxOuterHeight = (this.pageHeight - this.height)/2;
	this.contentType = '';
	this.bOverlay = false;
	this.inlineName = '';
	this.inlineContent = '';
	this.flashVars = '';
	this.timeout = false;
	this.lpFlashDemoActive = false,

	/************** Methods **************/
	this.hideLightbox = function() {
		
		//prevent flash errors in IE
		if(this.contentType === "flash" || this.contentType === "video") {
			swfobject.removeSWF("lightbox_flash");
		}
	    
		if(navigator.appVersion.indexOf('MSIE 6') !== -1) {
			document.documentElement.style.overflow = 'auto'; // Show browser scrollbars
		}
		this.bOverlay = false; // Disable timer function that runs lightbox.windowResize function
		
		// if brightcove API module exists, send video tracking to Adobe Analytics prior to closing lightbox
		if(typeof modVP != 'undefined'){
			removeBrightcove(); // runs onStop() function which sends final video data to brightcove and removes event listeners from video experience
		};

		jQuery('#lightbox_container').remove(); // Remove the lightbox
		jQuery('#overlay').remove(); // Remove the overlay
		jQuery('#overlay').remove(); // Remove the overlay
		
		// clear the hash location to reset deeplinking for flash content
		if(this.contentType === "flash") {
			location.hash = "";
		}

		// If there was flash in the inline content we removed it to get it to run when it was moved to the lightwindow. We now need to restore it to this inline content div (which will now be hidden) using the id stored in lightbox.manual variable
		if(this.contentType === 'inline' && this.inlineName) {
			jQuery(this.inlineName).append(this.inlineContent);
		}
		// Send FlashDemoActive status to Live Person using sendData() function in echat.js 
		// FlashDemoActive is set to false here. DAC 6/24/2009
		this.lpFlashDemoActive = false;   
		try {		
			if (typeof(eChatSendData.sendData) === 'function') { // Make sure that eChat.js is loaded
				eChatSendData.sendData('session','FlashDemoActive',this.lpFlashDemoActive);              
			}
		} catch(e) {}

		// Clear Brightcove overlay galleries and photo galleries if they exist.
		if(this.inlineName === "#brightcove_video_gallery") {
			jQuery('#brightcove_video_gallery').html('<div class="brightcove_player"></div>');
		}

		if(this.inlineName === "#showcase_photo_gallery") {
			jQuery('#showcase_photo_gallery').html('<div id="photo_gallery_items"></div>');
		}

	};

	this.showLightbox = function(o,e) {
		if (o.get(0).tagName.match(/(IMG|STRONG|EM|B|I)/)) {
			o = o.parent();
		}
		
		// Kill the event and stop the href action
		e.returnValue = false;
		try {
			e.preventDefault();
		} catch (err){ }
		
		// Kill the event and stop the href action
		// e.preventDefault();

		if(navigator.appVersion.indexOf('MSIE 6') !== -1) {
			document.documentElement.style.overflow = 'hidden'; // Hide browser scrollbars
		}

		// Get current window height and width
		this.pageHeight = jQuery(window).height();
		this.pageWidth = jQuery(window).width();
		
		this.getAttributes(o); // If optional attributes such as width and height are specified in the rel attribute, retrieve them
		this.showOverlay(); // Show the overlay
		this.resizeTimeout(); // Set timer for window resize event

		// Create the lightbox container div and append it onto the body element
		jQuery('body').append('<div id="lightbox_container"><div id="lightbox_content"></div></div>');
		if(this.disabletitleBar === false) {
			jQuery('#lightbox_container').prepend('<div id="close_container"></div>');
			jQuery('#close_container').prepend('<div id="lightbox_title"><p>' + o.attr('title') + '</p></div>');
		} else if(this.disabletitleBar === true && this.disableClose === false) {
			jQuery('#lightbox_container').prepend('<div id="close_button"></div>');
		}
		if(this.disableClose === false) {
			jQuery('#lightbox_container').append('<div id="close_button"></div>');
		}

		var bExternal = helperFunctions.getExternalRequest(o); // Determine whether the content in the href is being served from a local or foreign domain
		this.getContentType(o); // Get the content type and switch to the correct code to run
		switch(this.contentType) {
			case 'image':
				var img = new Image();
				img.onload = function(){
					jQuery('#lightbox_content').append('<img src="' + img.src + '" alt="' + o.attr('title') + '" width="' + img.width + '" height="' + img.height + '" />').css('padding',objLightbox.imageMargin);
					jQuery('#close_container').css('width',img.width + objLightbox.imageMargin*2);
					objLightbox.width = img.width + objLightbox.imageMargin*2;
					objLightbox.height = img.height + objLightbox.imageMargin*2;
					objLightbox.lightboxResize();
				}
				img.src = o.attr('href');
				break;
			case 'flash':
				flashWidth = this.width;
				flashHeight = this.height;
				jQuery('#lightbox_content').append('<a id="flash" href="' + o.attr('href') + '"></a>');

				this.height = this.height + jQuery('#close_container').outerHeight();
				
				jQuery('#lightbox_content').append('<div id="lightbox_flash"></div>');
				
				var params = {
					quality: "high",
					wmode: "opaque",
					allowfullscreen: "true",
					allowScriptAccess: "sameDomain",
					align: "middle",
					flashvars: this.flashVars
				};
				if (swfobject.hasFlashPlayerVersion(this.minFlashVersion)) {
					if(this.flashVars !== '') {
						swfobject.embedSWF(o.attr('href'), "lightbox_flash", flashWidth, flashHeight, this.minFlashVersion,"","",params);
					} else {
						swfobject.embedSWF(o.attr('href'), "lightbox_flash", flashWidth, flashHeight, this.minFlashVersion);
					}
				}
				else {
				  jQuery('#lightbox_flash').html('<p>Please update/install the Flash plugin to view this content.<br /><a href="http://get.adobe.com/flashplayer"><img alt="Get Adobe Flash player" src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"></a></p>');
				}
				break;
			case 'pdf':
				jQuery('#lightbox_content').append('<embed src="' + o.attr('href') + '" width="' + (this.width) + '" height="' + (this.height - jQuery('#close_container').outerHeight(true) - 2) + '">');
				break;
			case 'page':
				// If the page being linked to is outside the local domain, create an iframe and load the URL into it
				if(bExternal === true || this.iframeOverride === true) {
					jQuery('#lightbox_content').append('<iframe src="' + o.attr('href') + '" scrolling="auto" frameborder="0" width="100%" height="' + this.height + '" />');
				} else {
					// Page is within local domain and can be loaded via Ajax
					// jQuery('#lightbox_content').load(o.attr('href'), function(data) {
						// data = data.slice(data.indexOf('<body'),data.indexOf('</body'));
						// jQuery('#lightbox_content').html(data);
					// });
					jQuery('#lightbox_content').append('<iframe src="' + o.attr('href') + '" scrolling="auto" frameborder="0" width="100%" height="' + (this.height - 2) + '" />');
				}
				break;
			case 'inline':
				this.inlineName = o.attr('href'); // Store the ID of the div
				this.inlineContent = jQuery(o.attr('href')).html(); // Store the content of the div
				if(this.inlineName.indexOf(window.location) == 0) {
					this.inlineName = this.inlineName.replace(window.location.href.split('#')[0],'');
					this.inlineContent = jQuery(this.inlineName).html();
				}  //IE7 captures entire URL so we have to strip it down so we get the proper selector to append to lightbox

				jQuery(this.inlineName).empty(); // Need to empty the div in case there's flash in there
				jQuery('#lightbox_content').append(this.inlineContent);
				this.lightboxResize(); //IE7 displays incorrectly unless we call this here
				break;
			case 'video':
				
				/* track */
				
				/* Stand Alone video player with tracking */
				var videoplayer = '/assets/flash/video_player/StandAloneVideoPlayer.swf';
				var videofile = o.attr('href');
				
				videoData.videoPath= videofile;
				videoData.trackingLabel=o.attr('trackingLabel');

				//track click
				var originalPageName = s.pageName;
				s.pageName = 'Popup:Video Player:' + videoData.trackingLabel;
				s.doPlugins=s_doPlugins;
				var s_code=s.t();	    
				s.pageName = originalPageName;
				
				
				/* -- Stand Alone video player with tracking */
				
				flashWidth = this.width;
				flashHeight = this.height;
				jQuery('#lightbox_content').append('<a id="flash" href="' + videofile + '"></a>');

				jQuery('#lightbox_flash').remove();
				jQuery('#lightbox_content').append('<div id="lightbox_flash"></div>');
				
				var params = {
					quality: "high",
					wmode: "opaque",
					allowfullscreen: "true",
					allowScriptAccess: "sameDomain",
					align: "middle",
					flashvars: this.flashVars
				};
				if (swfobject.hasFlashPlayerVersion(this.minFlashVersion)) {
					if(this.flashVars !== '') {
						swfobject.embedSWF(videoplayer, "lightbox_flash", flashWidth, flashHeight, this.minFlashVersion,"","",params);
					} else {
						swfobject.embedSWF(videoplayer, "lightbox_flash", flashWidth, flashHeight, this.minFlashVersion);
					}
				}
				else {
				  jQuery('#lightbox_flash').html('<p>Please update/install the Flash plugin to view this content.<br /><a href="http://get.adobe.com/flashplayer"><img alt="Get Adobe Flash player" src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"></a></p>');
				}
				break;
			default:
				break;
		}
		
		// Run the resize code to make sure the lightbox fits properly in the browser window
		if(this.contentType !== 'image') {
			this.lightboxResize();
		}
		
		// Bind esc key and click event off of lightbox if they are enabled
		if(this.disableClose === true) {
			jQuery('#overlay').die('click');
			jQuery('body').die('keydown');
		} else {
			// Bind esc key and click event off of lightbox if they are enabled
			if(this.disableClose === false) {
				jQuery('#overlay').live('click', function() {
					jQuery('#overlay').remove(); // Remove the overlay
					objLightbox.hideLightbox();
				});
				jQuery('body').live('keydown', function(event) {
					if(event.keyCode === '27') {
						jQuery('#overlay').remove(); // Remove the overlay
						objLightbox.hideLightbox();
					}
				});
			}
		}
		
		// If browser is IE6, we need to use absolute position since it doesn't understand fixed
		if(navigator.appVersion.indexOf('MSIE 6') !== -1) {
			jQuery('#overlay').css('position','absolute');
			jQuery('#lightbox_container').css('position','absolute');
		}
		
		jQuery('#lightbox_container').css('visibility','visible'); // Show the lightbox
		
		this.lpFlashDemoActive = true;
		try {
			if (typeof(eChatSendData.sendData) === 'function') { // Make sure that eChat.js is loaded
				eChatSendData.sendData('session','FlashDemoActive',this.lpFlashDemoActive);              
			}
		} catch(e) {}
	};
	
	this.lightboxResize = function() {

		// Center the lightbox on the screen horizontally and vertically
		this.lightboxMargin = (this.pageWidth - this.width)/2;
		this.lightboxOuterHeight = (this.pageHeight - this.height)/2;

		// Set the height of the lightbox depending on whether it is larger or smaller than the browser window
		if(this.lightboxOuterHeight < 0) {
			
			jQuery('#lightbox_container').css({'height' : jQuery(window).height() - this.outerMargin*2, 'top' : this.outerMargin});
			jQuery('#lightbox_content').css('height',jQuery('#lightbox_container').height() - jQuery('#close_container').outerHeight(true) + 'px');
			if(this.contentType === 'image' || this.contentType === 'flash' || this.contentType === 'video') {
				jQuery('#lightbox_content').css('overflow','auto');
			}
		} 
		else if(this.pageHeight <= this.height + this.outerMargin*2) {

			jQuery('#lightbox_container').css({'height' : jQuery(window).height() - this.outerMargin*2, 'top' : this.outerMargin});
			jQuery('#lightbox_content').css('height',jQuery('#lightbox_container').height() - jQuery('#close_container').outerHeight(true) + 'px');
			if(this.contentType === 'image' || this.contentType === 'flash' || this.contentType === 'video') {
				jQuery('#lightbox_content').css('overflow','auto');
			}
		} else {
			jQuery('#lightbox_container').css({'height' : this.height + jQuery('#close_container').outerHeight(),'top': this.lightboxOuterHeight});
			if(this.iframeOverride === true) {
				jQuery('#lightbox_content').css('height',this.height + 2);
			} else {
				jQuery('#lightbox_content').css('height',this.height);
			}
			
			if(this.contentType === 'image' || this.contentType === 'flash' || this.contentType === 'video') {
				jQuery('#lightbox_content').css('overflow','visible');
			}
		}
		
		// Set the width of the lightbox depending on whether it is larger or smaller than the browser window
		if(this.lightboxMargin < 0) {
			jQuery('#lightbox_container').css({'width' : jQuery(window).width() - this.outerMargin*2, 'left' : this.outerMargin});
		}
		else if(this.pageWidth < this.width + this.outerMargin*2) {
			jQuery('#lightbox_container').css({'width' : jQuery(window).width() - this.outerMargin*2, 'left' : this.outerMargin});
		} else {
			jQuery('#lightbox_container').css({'width' : this.width,'left' : this.lightboxMargin});
		}
	};
	
	this.windowResize = function() {
		// If the window is resized, the overlay needs to dynamically resize with it
		jQuery('#overlay').css('height', jQuery(window).height());
		jQuery('#overlay').css('width', jQuery(window).width());

		// Get new page width and height to send to lightboxResize function
		this.pageHeight = jQuery(window).height(); // Get current window height
		this.pageWidth = jQuery(window).width(); // Get current window width
		
		this.lightboxResize(); // Resize/re-position the lightbox to fit new browser window size
		
		// If we're using IE6 we need to do some extra processing since IE6 doesn't understand the position:fixed property
		if(navigator.appVersion.indexOf('MSIE 6') !== -1) {
			jQuery('#overlay').css('position','absolute');
			jQuery('#overlay').css('top',jQuery(window).scrollTop());
			jQuery('#lightbox_container').css('position','absolute');
			jQuery('#lightbox_container').css('top',jQuery(window).scrollTop() + 15);
		}
	};
	
	this.callLightbox = function(lightbox_content,width,height,title,disableClose,iframeOverride,flashvars) {
		var sTitle = '';
		if(width !== undefined) {
			this.width = Number(width);
		}
		if(height !== undefined) {
			this.height = Number(height);
		}
		if(disableClose !== undefined && disableClose === 'true') {
			this.disableClose = true;
		}
		if(iframeOverride !== undefined && iframeOverride === 'true') {
			this.iframeOverride = true;
		}
		if(title !== undefined && title !== '') {
			sTitle = title;
		} else {
			sTitle = '';
			this.disabletitleBar = true;
		}
		if(flashvars !== undefined) {
			this.flashVars = flashvars;
		}
		
		// Create DOM element <a> to send through to existing function showLightbox()
		var link = document.createElement('a');
		link.setAttribute('href', lightbox_content);
		link.setAttribute('rel', this.width + ',' + this.height + ',' + this.disabletitleBar + ',' + this.disableClose + ',' + this.iframeOverride + ',' + this.flashVars);
		link.setAttribute('title', sTitle);
		
		this.showLightbox(jQuery(link),'true');
	}
}

lightbox.prototype.showOverlay = function() {
	jQuery('body').append('<div id="overlay"></div>'); // Create the overlay dom object
	jQuery('#overlay').css('height', jQuery(window).height()); // Set overlay to height and width of browser windor
	jQuery('#overlay').css('width', jQuery(window).width()); // Set overlay to height and width of browser windor
	this.bOverlay = true; // Enable timer function that runs lightbox.windowResize function
};

// If optional parameters specified in the rel attribute, overwrite default values. Possible attributes are: width, height, titlebar and disable the close button
lightbox.prototype.getAttributes = function(t) {
	if(t.attr('rel')) {
		var aDimensions = t.attr('rel').split(',');
		for(i=0;i<aDimensions.length;i++) {
			switch(i) {
				case 0:
					this.width = Number(aDimensions[i]);
					break;
				case 1:
					this.height = Number(aDimensions[i]);
					break;
				case 2:
					if(aDimensions[i] === 'true') {
						this.disabletitleBar = true;
					}
					break;
				case 3:
					if(aDimensions[i] === 'true') {
						this.disableClose = true;
					}
					break;
				case 4:
					if(aDimensions[i] === 'true') {
						this.iframeOverride = true;
					}
					break;
				case 5:
					this.flashVars = aDimensions[i];
					break;
				default:
					break;
			}
		}
	}
}

// Use regular expressions to determine what type of content is being served in the lightwindow and return the content type
lightbox.prototype.getContentType = function(element) {
	var aContentType = new Array();
	aContentType[0] = new RegExp(/.com|.net|.org|.gov|.edu|.biz|.cc|.htm|.html|.php|.jsp|.asp|.aspx|.cfm|.pr/i);
	aContentType[1] = new RegExp(/.jpg|.jpeg|.gif|.png|.bmp|.tiff/i);
	aContentType[2] = new RegExp(/.pdf/i);
	aContentType[3] = new RegExp(/\#/g);
	aContentType[4] = new RegExp(/.swf/i);
	aContentType[5] = new RegExp(/.mp4|.mpeg|.mpg|.mov|.avi|.flv/i);
	
	for(x=0;x<aContentType.length;x++) {
		iSearch = aContentType[x].test(element.attr('href'));
		if(iSearch == true && x === 0) {
			this.contentType = 'page';
		}
		else if(iSearch == true && x === 1) {
			this.contentType = 'image';
		} 
		else if(iSearch == true && x === 2) {
			this.contentType = 'pdf';
		}
		else if(iSearch == true && x === 3) {
			this.contentType = 'inline';
		}
		else if(iSearch == true && x === 4) {
			this.contentType = 'flash';
		}
		else if(iSearch == true && x === 5) {
			this.contentType = 'video';
		}
	}
}

// When the window is resized we need to do all sorts of things like re-size the overlay to fit, re-position the lightwindow in the middle and, if the new window size is less than the ligtbox size we need to re-size the lightbox to fit. We also need to set a timeout otherise an event is spawned for every single pixel change on a resize
lightbox.prototype.resizeTimeout = function() {
	jQuery(window).resize(function(){
		if(this.timeout !== false) {
			clearTimeout(this.timeout);
		}
		if(objLightbox.bOverlay === true) {
			setTimeout(function () { objLightbox.windowResize(); }, 100);
		}
	});
}

var helperFunctions = {
	getEventTarget: function(e) { 
		e = e || window.event;
		return e.target || e.srcElement;
	},
		
	// Determine whether the request to a separate page is in the local domain or not
	getExternalRequest: function(element) {
		if(String(element.context).indexOf(location.hostname) !== -1) {
			sRequest = false;
		} else {
			sRequest = true;
		}
		return sRequest;
	}
}


// Bind the lightbox class to an onclick event to show the lightbox and overlay
jQuery('.bose_lightbox').live('click', function(e) {
	objLightbox = new lightbox();
	objLightbox.showLightbox(jQuery(this),e);
});

// Bind the close link/button to the hideLightbox function
jQuery('#close_button').live('click', function() {
	jQuery('#overlay').remove(); // Remove the overlay
	objLightbox.hideLightbox();
});

$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return decodeURIComponent(results[1].replace(/\+/g, " ")) || 0;
	
	
}

// Video Player data and functions
var videoData = {
	videoPath:"",
	previewImagePath:"",
	playLabel:"play",
	pauseLabel:"pause",
	trackingSuite:"bosecom",
	trackingHost:"metrics.bose.com",
	trackingLabel:"",
	bufferMsg:"loading..."
}

function getVideoPlayerData() {
	return videoData;
}

function sendTrackingRequest(r) {
	
	rParts = r.split(":");
	rParts.shift();
	rParts.pop();
	
	
	var originalPageName = s.pageName;
	s.pageName = 'Popup:Video Player:' + rParts.join(":");
	s.doPlugins=s_doPlugins;
	s.tl(this,'o',r);
	s.pageName = originalPageName;		
}
