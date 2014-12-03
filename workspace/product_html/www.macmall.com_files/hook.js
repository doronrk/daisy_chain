var CCLPccs_logos = {
	oneHoverOn: false
};

CCLPccs_logos.videos = new Object(); 

CCLPccs_logos.debug = function() {
	if(window.console){
		console.log( Array.prototype.slice.call(arguments) );
	}
};

CCLPccs_logos.ops = {
	isIE: !!(document.all),
	
	addEvent: function(elem, event, fn) {
		if (window.attachEvent)
			elem.attachEvent('on'+event, fn);
		else if (window.addEventListener) {
			elem.addEventListener(event, fn, false);
		}
		else {
			CCLPccs_logos.debug('Failed to addEvent '+event+' to '+(elem.id || elem));
		}
	},

	setVals: function(obj, vals, addPx) {
		for (var x in vals)
			if (vals.hasOwnProperty(x))
				if (vals[x] || vals[x]===0)
					obj[x] = (addPx && parseInt(vals[x])) ? parseInt(vals[x])+'px' : vals[x];
	},
	
	createElement: function(tag, opts) {
		var elem = document.createElement(tag.toUpperCase());
		if (opts) {
			if (typeof opts.styles == 'object') {
				this.setVals(elem.style, opts.styles, true);
				delete opts.styles;
			}
			this.setVals(elem, opts);
		}
		return elem;
	}, 
	
	extend: function(ns, obj) {
		if (!ns || !obj) return null;
		for (var x in obj)
			if (obj.hasOwnProperty(x)) ns.prototype[x] = obj[x];
	},
	
	addStyles: function(styleObj, id) {
		//if (id && document.getElementById(id)) return;
		var style = document.getElementById(id) || CCLPccs_logos.ops.createElement('style', {
			'type': 'text/css',
			'id': id || null
		});
		document.getElementsByTagName('head')[0].appendChild(style);
		if (CCLPccs_logos.ops.isIE && !style.styleSheet.disabled) {
			style.styleSheet.cssText = this.parseRules(styleObj);
		} else {
			style.appendChild(document.createTextNode(this.parseRules(styleObj)));
		}
	},

	parseRules: function(rules) {
		var toWrite = '';
		for (var x in rules)
			if (rules.hasOwnProperty(x)) {
				toWrite += x+'{';
				var styles = rules[x];
				for (var y in styles)
					if (styles.hasOwnProperty(y))
						toWrite += y+':'+styles[y]+';';
				toWrite += '}\n';
			}
		return toWrite;
	},
	
	addExploreProductToTable: function(tbody, url, colNumber) {
		var tr = CCLPccs_logos.ops.createElement('tr');
	  	tbody.appendChild(tr);
	  	var td = CCLPccs_logos.ops.createElement('td');
	  	td.colSpan = colNumber;
	  	td.align = 'center';
	  	tr.appendChild(td);
	  	CCLPccs_logos.ops.addExploreProductToElement(td, url);
	},
	
	addExploreProductToElement: function(target, url) {
	  	var div = CCLPccs_logos.ops.createElement('div');
	  	div.id = "ccsInnerExploreProduct";
	  	target.appendChild(div);
		CCLPccs_logos.loadJsLibs([url]);
	},
	
	addTreepodiaToDiv: function(treepodiaInfo) {
			CCLPccs_logos.loadJsLibs([treepodiaInfo.treepodiaUrl], function() {					
				var ccs_jQuery = window.jquery || window.$;
				var ccs_hasjQuery = ccs_jQuery && ccs_jQuery.fn && ccs_jQuery.fn.jquery;
				
				// this made Lenovo tabs break
				//if(ccs_hasjQuery)
					//$.noConflict();
			});

			new Image().src= treepodiaInfo.trackingUrl + "&event=display&unique=" + new Date().getTime();
	},
		
	addKspVideo: function(kspVideoInfo, videoDiv) {

		var videoList= kspVideoInfo.kspVideoList.substring(1, kspVideoInfo.kspVideoList.length -1 ).split(",");

		var kspVideoLocation;
		
		if (kspVideoInfo.style == "inline")
			kspVideoLocation= kspVideoInfo.locationId;
		else if (kspVideoInfo.style == "button")
			kspVideoLocation="ksp-video";
				
		var v = document.createElement('video');
		var mp4Supported = !!(v.canPlayType && v.canPlayType('video/mp4').replace(/no/, ''));
		var iosDevice = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false;
		
		if(mp4Supported && iosDevice) {
			kspVideo.divId = kspVideoLocation;
			kspVideo.url = kspVideoInfo.hasKspPreRollVideo == true ? videoList[1] : videoList[0];
			kspVideo.trackingUrl = kspVideoInfo.trackingUrl;
			videoDiv.style.width = '' + kspVideoInfo.videoWidth + 'px'; 
			videoDiv.style.height = '' + kspVideoInfo.videoHeight + 'px'; 
			CCLPccs_logos.loadJsLibs(['http://vidtech.cbsinteractive.com/h5/2_1_4/CBSI_PLAYER.js']);					
		} 
		else {
			CCLPccs_logos.ops.createVideoWithUrl(kspVideoLocation, "ksp-video-player", 
			kspVideoInfo.videoWidth, kspVideoInfo.videoHeight, videoList[kspVideoIndex], kspVideoInfo.trackingUrl, kspVideoInfo.thumbnail);	
		}
	},
	
	createVideoWithUrl: function(embedDivId, playerId, width, height, videoUrl, trackingUrl, previewImageUrl, autostart) {
	      var so = new SWFObject("http://logo.cnetcontentsolutions.com//videos/cbsiUvp.swf", playerId, width, height, "9.0.124.0", "#FFFFFF");
	      so.addParam("wmode", "opaque");
	      so.addParam("quality", "high");
	      so.addParam("allowScriptAccess", "always");
	      so.addParam("allowFullScreen", "true");  
	      
	      if (autostart && autostart== true)
		      so.addVariable("autostart", "true");
	      else 
	    	  so.addVariable("autostart", "false");
	      
	      so.addVariable("partner", "windemo");
	      so.addVariable("smode", "fit");
	      so.addVariable("file", videoUrl);
	      if(previewImageUrl) {
	        so.addVariable("thumbnail", previewImageUrl);
	      }
	      so.addVariable("uvpc", "http://logo.cnetcontentsolutions.com//videos/uvp_notrack.xml");
	      so.write(embedDivId);  
	      
	      var video = new CCLPccs_logos.Video(playerId, trackingUrl);
	      CCLPccs_logos.videos[playerId] = video;
	      return video;
	},
	
	createVideo: function(embedDivId, playerId, width, height, videoFile, trackingUrl, previewImage) {
		  var videoUrl = "http://logo.cnetcontentsolutions.com//videos/" + videoFile;
		  var previewImageUrl = previewImage ? "http://logo.cnetcontentsolutions.com//images/" + previewImage : null;
	      return this.createVideoWithUrl(embedDivId, playerId, width, height, videoUrl, trackingUrl, previewImageUrl);
	},
	
	onContentStarted: function(playerId) {
		CCLPccs_logos.videos[playerId].start(); 
	},
			
	onContentEnded: function(playerId) {
				
		kspVideoIndex= kspVideoIndex + 1;
		var videoList= kspVideoInfo.kspVideoList.substring(1, kspVideoInfo.kspVideoList.length -1 ).split(",");

		var videoLocation=kspVideoInfo.locationId;
		if (kspVideoInfo.style == "button")
			videoLocation = "ksp-video";	
		
		if (kspVideoIndex < kspVideoLength)
		{
			CCLPccs_logos.ops.createVideoWithUrl(videoLocation, "ksp-video-player", kspVideoInfo.videoWidth, kspVideoInfo.videoHeight, 
			videoList[kspVideoIndex], kspVideoInfo.trackingUrl, kspVideoInfo.thumbnail, true);			
		}	
		else
		{
			CCLPccs_logos.videos[playerId].end();
			kspVideoIndex=0;

			CCLPccs_logos.ops.createVideoWithUrl(videoLocation, "ksp-video-player", kspVideoInfo.videoWidth, kspVideoInfo.videoHeight,
			videoList[kspVideoIndex], kspVideoInfo.trackingUrl, kspVideoInfo.thumbnail);		
		}					
	},
	
	addArrayElement: function(eList, e) {
		if (!Array.prototype.indexOf) { /* some version of IE does not implement the method */
		    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		        "use strict";
		        if (this == null) {
		            throw new TypeError();
		        }
		        var t = Object(this);
		        var len = t.length >>> 0;
		        if (len === 0) {
		            return -1;
		        }
		        var n = 0;
		        if (arguments.length > 0) {
		            n = Number(arguments[1]);
		            if (n != n) { // shortcut for verifying if it's NaN
		                n = 0;
		            } else if (n != 0 && n != Infinity && n != -Infinity) {
		                n = (n > 0 || -1) * Math.floor(Math.abs(n));
		            }
		        }
		        if (n >= len) {
		            return -1;
		        }
		        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		        for (; k < len; k++) {
		            if (k in t && t[k] === searchElement) {
		                return k;
		            }
		        }
		        return -1;
		    }
		}
		if(eList.indexOf(e) == -1)
			eList.push(e);
	}
};

CCLPccs_logos.Logo = function(specs, options) {
	this.specs = specs;
	this.options = {};
	this.over = {
		logo: false,
		ad: false
	};
	this.timeout = false;
	if (!this.specs) {
		CCLPccs_logos.debug('CCLPccs_logos.Logo constructor: No specs sent for icon.');
		return;
	}
	this.setLogo();
	if (this.specs.logo.hasHoverHtml == 'true') {
		this.setInteraction('logo', this.specs.logo.hoverEvent, this.specs.logo.closeHoverOnMouseOut == "true");
	}
	this.setOptions(options);
	return this.logoShell;
};

CCLPccs_logos.ops.extend(CCLPccs_logos.Logo, {
	setLogo: function() {
		if (!this.specs || !this.specs.logo || !this.specs.logo.src) {
			CCLPccs_logos.debug('CCLPccs_logos.Logo.setLogo: Specs problem. arguments: %o', arguments);
			return;
		}
		
		this.logoShell = CCLPccs_logos.ops.createElement('div', {
			'className': 'CCLPlogo',
			styles: {
				'position': 'relative'
			}
		});
	
		this.logo = CCLPccs_logos.ops.createElement('img', {
			'src': this.specs.logo.src,
			'alt': this.specs.logo.alt || null,
			'title': this.specs.logo.text || null,
			'width': this.specs.logo.width || null,
			'height': this.specs.logo.height || null,
			styles: {
				'width': this.specs.logo.width,
				'height': this.specs.logo.height
			}
			
		});
		
		this.logoShell.appendChild(this.logo);
		return this;
	},
	
	getLogoCoords: function(obj){
		this.logoLeft = this.logoTop = 0;
				
		if (obj.offsetParent) {
			do {
				this.logoLeft += obj.offsetLeft;
				this.logoTop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
	},
	
	positionHover: function() {
		this.getLogoCoords(this.logo);
		
		CCLPccs_logos.ops.setVals(this.ad.style, {
			'width': this.specs.ad.width,
			'height': this.specs.ad.height
		}, true);
		
		if(this.specs.ad.position == undefined) this.specs.ad.position = 'right';
		
		if(CCLPccs_logos.ops.isIE){
			if(document.compatMode == 'CSS1Compat'){//doctype is valid
				var scrollTop = document.documentElement.scrollTop;
				var scrollLeft = document.documentElement.scrollLeft;
				
				var viewportHeight = document.documentElement.clientHeight - 8;
				var viewportWidth = document.documentElement.clientWidth - 8;
			}else{//doctype is NOT valid
				var scrollTop = document.body.scrollTop;
				var scrollLeft = document.body.scrollLeft;
				
				var viewportHeight = document.body.clientHeight - 8;
				var viewportWidth = document.body.clientWidth - 8;
			}
		}else{
			var scrollTop = window.pageYOffset;
			var scrollLeft = window.pageXOffset;
			
			var viewportHeight = window.innerHeight - 8;
			var viewportWidth = window.innerWidth - 8;
				
		}
		
		var popUpHeight = parseInt(this.ad.height)+4;
		var popUpWidth = parseInt(this.ad.width)+4;
		var protocol = location.protocol;
		if (protocol == 'file:') { protocol = 'http:'; }
		var arrowUrl = protocol + '//logo.cnetcontentsolutions.com/images/';
		var border = 11;

		if(this.specs.ad.position == 'top' || this.specs.ad.position == 'bottom'){
			
			// Center of pop up should match center of logo horizontally...									
			var popUpLeft = (this.logoLeft - (popUpWidth/2)) + (this.logo.width/2);
			var popUpRight = popUpLeft + popUpWidth;

			// Adjust the pop up to be horizontally positioned within the viewport...
			if (popUpRight > scrollLeft + viewportWidth) {
				popUpLeft = scrollLeft + viewportWidth - popUpWidth;
			}
			// See above, but also, if viewport is smaller than pop up, then have the right side be off the screen...
			if (popUpLeft < scrollLeft) {
				popUpLeft = scrollLeft;
			}
			// Calc the position of the background arrow...
			var width_of_arrow = 12;
			var bkgPosition = (this.logoLeft - popUpLeft - width_of_arrow) + (this.logo.width/2);

			// Vertically position the pop up...
			var position;
			var popUpTop;
			// Figure out the top and bottom location if position = 'top'...
			var popUpBottomIfTop = this.logoTop;
			var popUpTopIfTop = popUpBottomIfTop - popUpHeight - border;
			// Figure out the top and bottom location if position = 'bottom'...
			var popUpTopIfBottom = this.logoTop + this.logo.height;
			var popUpBottomIfBottom = popUpTopIfBottom + popUpHeight + border;

			// Put the pop up on 'top' if it only fits on top...
			if (popUpTopIfTop >= scrollTop && popUpBottomIfBottom > scrollTop + viewportHeight) {
				position = 'top';
				var popUpTop = popUpTopIfTop;
			// Put the pop up on 'bottom' if it only fits on bottom...
			} else if (popUpTopIfTop < scrollTop && popUpBottomIfBottom <= scrollTop + viewportHeight) {
				position = 'bottom';
				var popUpTop = popUpTopIfBottom;
			// Otherwise, honor the customer preference...
			} else if (this.specs.ad.position == 'top') {
				position = 'top';
				var popUpTop = popUpTopIfTop;
			} else if (this.specs.ad.position == 'bottom') {
				position = 'bottom';
				var popUpTop = popUpTopIfBottom;
			}

			if (position == 'top') {
				//Position top
				CCLPccs_logos.ops.setVals(this.hover.style, {
					'top': popUpTop,
					'left': popUpLeft,
					'background': 'url(' + arrowUrl + this.options.arrowOptions.topArrowPic + ') '+bkgPosition+'px bottom no-repeat',
					'paddingTop': 0,
					'paddingBottom': border 
				}, true);
			}else{
				//position bottom
				CCLPccs_logos.ops.setVals(this.hover.style, {
					'top': popUpTop,
					'left': popUpLeft,
					'background': 'url(' + arrowUrl +  this.options.arrowOptions.bottomArrowPic + ') '+bkgPosition+'px top no-repeat',
					'paddingTop': border,
					'paddingBottom': 0 
				}, true);
			}
			
		}else if(this.specs.ad.position == 'left' || this.specs.ad.position == 'right'){
			this.hover.style.paddingTop = '0px';
			
			// Center of pop up should match center of logo vertically...									
			var popUpTop = (this.logoTop - (popUpHeight/2)) + (this.logo.height/2);
			var popUpBottom = popUpTop + popUpHeight;

			// Adjust the pop up to be Vertically positioned within the viewport...
			if (popUpBottom > scrollTop + viewportHeight) {
				popUpTop = scrollTop + viewportHeight - popUpHeight;
			}
			// See above, but also, if viewport is smaller than pop up, then have the bottom be off the screen...
			if (popUpTop < scrollTop) {
				popUpTop = scrollTop;
			}
			// Calc the position of the background arrow...
			var height_of_arrow = 12;
			var bkgPosition = (this.logoTop - popUpTop - height_of_arrow) + (this.logo.height/2);

			// Vertically position the pop up...
			var position;
			var popUpLeft;
			// Figure out the left and right location if position = 'left'...
			var popUpRightIfLeft = this.logoLeft;
			var popUpLeftIfLeft = popUpRightIfLeft - popUpWidth - border;
			// Figure out the left and right location if position = 'right'...
			var popUpLeftIfRight = this.logoLeft + this.logo.width;
			var popUpRightIfRight = popUpLeftIfRight + popUpWidth + border;

			// Put the pop up on 'left' if it only fits on left...
			if (popUpLeftIfLeft >= scrollLeft && popUpRightIfRight > scrollLeft + viewportWidth) {
				position = 'left';
				var popUpLeft = popUpLeftIfLeft;
			// Put the pop up on 'right' if it only fits on right...
			} else if (popUpLeftIfLeft < scrollLeft && popUpRightIfRight <= scrollLeft + viewportWidth) {
				position = 'right';
				var popUpLeft = popUpLeftIfRight;
			// Otherwise, honor the customer preference...
			} else if (this.specs.ad.position == 'left') {
				position = 'left';
				var popUpLeft = popUpLeftIfLeft;
			} else if (this.specs.ad.position == 'right') {
				position = 'right';
				var popUpLeft = popUpLeftIfRight;
			}

			if (position == 'left') {
				//Position left
				CCLPccs_logos.ops.setVals(this.hover.style, {
					'top': popUpTop,
					'left': popUpLeft,
					'background': 'url(' + arrowUrl +  this.options.arrowOptions.leftArrowPic + ') right '+bkgPosition+'px no-repeat',
					'paddingRight': border, 
					'paddingLeft': 0
				}, true);
			}else{
				//position right
				CCLPccs_logos.ops.setVals(this.hover.style, {
					'top': popUpTop,
					'left': popUpLeft,
					'background': 'url(' + arrowUrl +  this.options.arrowOptions.rightArrowPic + ') left '+bkgPosition+'px no-repeat',
					'paddingLeft': border,
					'paddingRight': 0 
				}, true);
			}
		}
	},

	createVideo: function(embedDivId, playerId, width, height, videoFile, previewImage) {
		var trackingUrl = "http://logo.cnetcontentsolutions.com//event/" + this.specs.logo.type 
        	+ "&responseLogoId=" + this.specs.logo.id
        	+ "&contractId=" + CCLPccs_logos.details.partnerInfo.contractId
        	+ "&customerId=" + CCLPccs_logos.details.partnerInfo.customerId;
	    this.video = CCLPccs_logos.ops.createVideo(embedDivId, playerId, width, height, videoFile, trackingUrl, previewImage); 
	},
	
	setHover: function() {
		this.hover = CCLPccs_logos.ops.createElement('div', {
			'className': this.options.classOptions.hoverClass + ' ' + this.specs.logo.type + ' C' + CCLPccs_logos.details.partnerInfo.customerHash,
			'id': "CCLP" + this.specs.logo.type + "-ccs_logos",
			'styles': {
			 	'width': parseInt(this.specs.ad.width) + 4
			}
		});

		this.hover.parentLogo = this;
		this.hover.startTime = 0;
		
		var outerDiv;
		if(this.specs.logo.type == "windowsClient" || this.specs.logo.type == "amdVision" || this.specs.logo.hoverType == "iframe") {
			var headerHeight = 25;
			var borderThickness = 2;
			var specAdHeight = this.specs.ad.height;
			if(this.specs.logo.closeHoverOnMouseOut == 'false') {
				specAdHeight = parseInt(this.specs.ad.height) + headerHeight + borderThickness/2;
			}
			outerDiv = CCLPccs_logos.ops.createElement('div', {
				'className' :  "CCLPborder",
				'styles' : {
					'width' : this.specs.ad.width,
					'height' : specAdHeight
				}
			});
		} else {
			outerDiv = CCLPccs_logos.ops.createElement('div', {
				'className' :  "CCLPborder",
				'width': this.specs.ad.height,
				'height': this.specs.ad.height
			});
		}

		this.hover.appendChild(outerDiv);
		if (this.specs.logo.closeHoverOnMouseOut == 'false' && this.specs.logo.type != "windows7-play") {
			var headerStyle = (this.specs.logo.type.indexOf("windowsClient")==0 || this.specs.logo.type == "office2010" || this.specs.logo.type == "neea" || this.specs.logo.type == "gamespot") ? "CCLP_BrowserHeader_Grey" : "CCLP_BrowserHeader";
			var header = CCLPccs_logos.ops.createElement('div', {
				'className' : headerStyle,
				'styles' : {
					'border-top':'1px solid #5b6370',
					'color':'#ffffff',
					'height':'25px',
					'margin':'0px',
					'overflow':'hidden',
					'padding':'0px',
					'position':'relative'
				}
			});
			var closeBtnImageName = (this.specs.logo.type.indexOf("windowsClient")==0 || this.specs.logo.type == "office2010" || this.specs.logo.type == "neea" || this.specs.logo.type == "gamespot") ? "close-gray.gif" : "close_btn.gif";
			var closebtn = CCLPccs_logos.ops.createElement('div', {
				'className' : 'CCLP_BrowserClose',
				'styles' : {
					'background': 'url(http://logo.cnetcontentsolutions.com//images/' + closeBtnImageName + ') no-repeat right center',
					'cursor': 'pointer',
					'height': '20px',
					'marginTop':'2px',
					'marginRight':'10px',
					'padding': '0px',
					'position': 'absolute',
					'top': '0px',
					'right': '0px',
					'width': '20px'
				}
			});
			var titletext = CCLPccs_logos.ops.createElement('div', {
				'className' : 'CCLP_BrowserTitle',
				'styles' : {
					'color': '#ffffff',
					'fontFamily': 'Arial, san-serif',
					'fontSize': '12px',
					'lineHeight': '23px',
					'margin': '0px auto 0px auto',
					'padding': '0px',
					'textAlign': 'center',
					'textShadow': '#000 1px 1px 0px',
					'width': this.specs.ad.width
				}
			});
			var instance = this;
			CCLPccs_logos.ops.addEvent(closebtn, "click", function() {
				if (instance.timeOut) clearTimeout(instance.timeOut);
				instance.hideHover();
				if(instance.specs.logo.type == "gamespot" || instance.specs.logo.type == "windows8System") {
					instance.ad.parentNode.removeChild(instance.ad);
					instance.hover = null;
				}
			});
			header.appendChild(closebtn);
			header.appendChild(titletext);
			outerDiv.appendChild(header);
			if(this.specs.ad.title) {
				titletext.innerHTML = this.specs.ad.title;	
			}
		}

		outerDiv.appendChild(this.ad = CCLPccs_logos.ops.createElement(this.specs.logo.hoverType, {
			'className': "CCLP-hover-container",
			'width': this.specs.ad.width,
			'height': this.specs.ad.height,
			'styles': {
				'background':'#FFF'
			}
		}));
		
		if(this.specs.logo.hoverType == "iframe") {
			this.ad.scrolling = this.specs.logo.type == 'gamespot' ? 'auto' : 'no';
			this.ad.frameBorder = '0';
			this.ad.src_original = this.specs.ad.src + "&fromReferrer=" + window.location.host; 
		} else {
			outerDiv.id = this.options.classOptions.hoverClass + 'Div';
			outerDiv.padding = '0px !important';
			outerDiv.padding = 'none !important';
			this.ad.padding = '0px';
			this.ad.overflow = 'none';
			this.ad.innerHTML = this.specs.ad.innerHtml.replace(/~/g, "\""); 
		}
		
		document.body.appendChild(this.hover);
		this.setInteraction('hover', 'mouseover', this.specs.logo.closeHoverOnMouseOut == "true");
		this.setInteraction('ad', 'mouseover', this.specs.logo.closeHoverOnMouseOut == "true");
		
		if(this.specs.logo.type == "windowsClient") {
			CCLP_distributeTabWidths();
		} else if(this.specs.logo.type == "windows7-play") {
			this.createVideo("cbsiapiplayer", "CBSi-UVP-Player-windows7-play-ccs_logos", "546", "476", "Intro.flv", "win7playto_preview.jpg");
		}
	},
	
	setInteraction: function(elem, event, closeOnMouseOut) {
		var instance = this;
		CCLPccs_logos.ops.addEvent(this[elem], event, function() {
			instance.over[elem] = true;
			if (instance.timeOut) clearTimeout(instance.timeOut);
			instance.timeOut = setTimeout(function(){instance.setDisplay.apply(instance, [elem, instance.over])}, CCLPccs_logos.details.partnerInfo.hoverOpenDelay);
		});

		if(closeOnMouseOut) {
		    CCLPccs_logos.ops.addEvent(this[elem], 'mouseout', function() {
			    instance.over[elem] = false;
			    if (instance.timeOut) clearTimeout(instance.timeOut);
			    instance.timeOut = setTimeout(function(){
			    	instance.setDisplay.apply(instance, [elem, instance.over]);
			    	
			    	if(instance.specs.logo.type == "gamespot" || instance.specs.logo.type == "windows8System")
			    	{
			    		instance.ad.src = '';
			    	}
			    	
			    }, CCLPccs_logos.details.partnerInfo.hoverCloseDelay);
		    });
		};
	},
	
	setDisplay: function(elem, over) {
		var show = false;
		for (var x in this.over) {			
			if (this.over.hasOwnProperty(x)) {
				if (this.over[x]){ 
					show = true;
					break;
				}
			}
		}
		if (!show) this.hideHover();
		else (this.showHover());
	},
	
	showHover: function() {
		if(CCLPccs_logos.oneHoverOn)
		     return;
        CCLPccs_logos.oneHoverOn = true;
        this.isHoverOn = true;

		if (!this.hover) {
			 this.setHover();
		}
		
		if (this.hover.startTime == 0)
			this.hover.startTime = new Date().getTime();
		this.positionHover();
		this.hover.style.display = 'block';
		this.ad.src = this.ad.src_original;
		
		if (CCLPccs_logos.details.partnerInfo.birstReportUrl != undefined && this.specs.logo.type == "office2013")
			new Image().src = CCLPccs_logos.details.partnerInfo.birstReportUrl + "&unique=" + new Date().getTime();
			
	},

	hideHover: function() {
		try {
			if(!this.isHoverOn)
			    return;
            this.isHoverOn = false;
            CCLPccs_logos.oneHoverOn = false;
            
            if(this.video) {
                this.video.close();
            }
            
			this.hover.style.display = 'none';
			this.logo.offsetParent.style.zIndex = 0;
			var duration = 0;
			if (this.hover.startTime != 0)
				duration =  new Date().getTime() - this.hover.startTime;
			this.hover.startTime = 0;
			var hoverTimeUrl;
			hoverTimeUrl = this.specs.ad.src.replace("hoverhtml", "event") + "&type=hover&duration=" + duration;
			
			new Image().src = hoverTimeUrl;
		} catch(e) {
			CCLPccs_logos.debug('this.hover not yet created');
		}
	},
	
	getHoverEventUrl: function() {
		return "http://logo.cnetcontentsolutions.com//event/" + this.specs.logo.type 
		+ "?type=hover&responseLogoId=" + this.specs.logo.id
		+ "&contractId=" + CCLPccs_logos.details.partnerInfo.contractId
		+ "&customerId=" + CCLPccs_logos.details.partnerInfo.customerId
		+ "&locale=" + CCLPccs_logos.details.partnerInfo.locale
		+ "&h=" + CCLPccs_logos.details.partnerInfo.customerHash;
	},

	setOptions: function(options) {
		this.options = options;
	}
});


CCLPccs_logos.LogoShell = function(partData, logoData) {
	if (!partData || !logoData) {
		return null;
	}
	if (!partData.locationId || !document.getElementById(partData.locationId)) {
		CCLPccs_logos.debug('target location not found');
		return null;
	}
	var shell = CCLPccs_logos.ops.createElement('table', {
		'border': '0',
		'cellpadding': '0',
		'cellspacing': '0'
	});

	CCLPccs_logos.ops.addStyles({
		'.CCLPpopup': {
			'position': 'absolute',
			'top': '0px',
			'left': '0px',
			'width':'auto',
			'height':'auto',
			'z-index': '500000 !important',
			'padding': '0px',
			'margin': '0px'
		},
		'.CCLPpopup div': {
		},
		'.CCLPpopup div iframe': {
			'border':'0',
			'margin': '0'
		},
		'.CCLPpopupWindows': {
				'position': 'absolute',
				'top': '0px',
				'left': '0px',
				'width':'auto',
				'height':'auto',
				'z-index': 10000,
				'padding': '0px',
				'margin': '0px'
		},
		'.CCLPpopupWindows div iframe': {
				'border':'0',
				'margin': '0'
	    },
	    '.CCLPpopupWindows .CCLPborder': {
	        'border':'2px solid black'
	    },
	    '.CCLPpopup .CCLPborder': {
	        'border':'2px solid #d7d8d7'
	    },
	    '.CCLPpopupBrowser': {
	        'height':'auto',
			'left':'0px',
			'margin':'0px',
			'padding':'0px',
			'position':'absolute',
			'top':'0px',
			'width':'auto',
			'z-index':'10000'
	    },
	    '.CCLPpopupBrowser iframe': {
	        'border':'0px',
			'margin': '0px',
			'padding': '0px'
	    },
	    '.CCLPpopupBrowser .CCLPborder': {
	        'border':'2px solid #000000',
			'padding':'0px'
	    }
	},'CCLPStyles');
	
	var tbody = CCLPccs_logos.ops.createElement('tbody');
	shell.appendChild(tbody);
	
	var showLogos = [];
	for (var i=0; i<logoData.length; i++) {
		if (logoData[i].logo.success == 'true') showLogos.push(logoData[i]);
	}
	
	document.getElementById(partData.locationId).appendChild(shell);
	var cols = (partData.layout) ? partData.layout.split('x')[0]-0 : showLogos.length;
	var rows = (partData.layout) ? partData.layout.split('x')[1]-0 : 1;

	for (var y=0, t=0; y<rows; y++) {
		var tr = CCLPccs_logos.ops.createElement('tr');
		tbody.appendChild(tr);
		for (var x=0; x<cols; x++) {
			var td = CCLPccs_logos.ops.createElement('td', {'align':'center', 'valign':'middle'});
			tr.appendChild(td);
			if (t < showLogos.length)
				if (showLogos[t].logo.type == 'windows7' || showLogos[t].logo.type == 'windows7-play' 
					|| showLogos[t].logo.type.indexOf("amd") == 0) {
					var hoverClassName = showLogos[t].logo.type.indexOf("amd") == 0 ? 'CCLPpopupBrowser' : 'CCLPpopupWindows';
					td.appendChild(new CCLPccs_logos.Logo(showLogos[t++], {
							arrowOptions : {
								rightArrowPic : 'cclpArrow_blck_right.gif',
								leftArrowPic : 'cclpArrow_blck_left.gif',
								topArrowPic : 'cclpArrow_blck_up.gif',
								bottomArrowPic : 'cclpArrow_blck_down.gif'
							}, 
							classOptions : {
								hoverClass : hoverClassName
							}
					}));	
				} else {
					td.appendChild(new CCLPccs_logos.Logo(showLogos[t++], {
							arrowOptions : {
								rightArrowPic : 'cclpArrow_right.gif',
								leftArrowPic : 'cclpArrow_left.gif',
								topArrowPic : 'cclpArrow_up.gif',
								bottomArrowPic : 'cclpArrow_down.gif'
							},
							classOptions : {
								hoverClass : 'CCLPpopup'
							}
							
					}));
				}
			
		}
	}
};

CCLPccs_logos.Video = function(playerId, trackingUrl) {
	this.started = false;
	this.ended = false;
	this.duration = 0;
	this.trackingUrl = trackingUrl + "&event=playVideo";
	this.playerId = playerId; 
};

CCLPccs_logos.ops.extend(CCLPccs_logos.Video, {
	start: function() {
		this.started = true;
	    this.duration = document.getElementById(this.playerId).getDuration();
		this.ended = false;
	},
	
	end: function() {
		this.ended = true;
		this.sendTrackingEvent(this.duration);
		this.started = false;
	},
	
	close: function() {
		if(this.started) { 
			this.sendTrackingEvent(document.getElementById(this.playerId).getCurrentTime());
			document.getElementById(this.playerId).clearVideo();
			this.started = false;
			this.ended = false;
	    }
	},
	
	sendTrackingEvent: function(duration) {
			new Image().src = this.trackingUrl + "&duration=" + (duration * 1000)
				+ "&unique=" + new Date().getTime();
	}
});

CCLPccs_logos.InlineContent = function (specs) {
	this.specs = specs;
	this.setInlineContent();
	return this.inlineContentShell;
}

CCLPccs_logos.ops.extend(CCLPccs_logos.InlineContent,{
	setInlineContent: function() {
		if (!this.specs || !this.specs.type || !this.specs.name || !this.specs.locationId) {
			CCLPccs_logos.debug('CCLPccs_logos.InlineContent.setInlineContent: Specs problem. arguments: %o', arguments);
			return;
		}
		
		var shellId = 'CCLPInlineContent' + this.specs.name;
		this.inlineContentShell = CCLPccs_logos.ops.createElement('div', {
			'id': shellId,
			styles: {
				'position': 'relative'
			}
		});
		var primaryDiv = document.getElementById(this.specs.locationId);
		var alternativeDiv = null;
		if(this.specs.alternativeLocationId) {
			alternativeDiv = document.getElementById(this.specs.alternativeLocationId);
			if(alternativeDiv == null)
				alternativeDiv = document.getElementById("ccs-inline-content");
		}
			
		if (this.specs.name == "kspVideo")
		{
			kspVideoLength= this.specs.kspVideoList.split(",").length;
			kspVideoIndex=0;
			kspVideoInfo=this.specs;			
			
			if (this.specs.style == "inline") 
			{		
				if(primaryDiv) {							
					CCLPccs_logos.ops.addKspVideo(this.specs, primaryDiv);
				}
				else{
					var tieDivs=document.getElementById("inline_showcase");  
					if (tieDivs) {				
						var kspDiv=document.createElement("div");			
						kspDiv.setAttribute("id", this.specs.locationId);
						tieDivs.parentNode.insertBefore(kspDiv, tieDivs);								
						CCLPccs_logos.ops.addKspVideo(this.specs, kspDiv);
					}
				}
			}	
				
			if (this.specs.style == "button")
			{	
				var buttonImg=document.createElement("img");
				buttonImg.setAttribute("src", "http://go.iomega.com/static/img/x_button_close.png");
				buttonImg.setAttribute("alt", "Play Video");
				buttonImg.setAttribute("id", "ksp-video-button");
				
				if(primaryDiv) {				
					primaryDiv.appendChild(buttonImg);
				}
				else
				{
				    var logoDiv=document.getElementById(CCLPccs_logos.details.partnerInfo.locationId); 
					if (logoDiv) {								
						logoDiv.parentNode.insertBefore(buttonImg, logoDiv);
					}
				}					
				
				ccsJq('#ksp-video-button').click(function() 
				{
					var currentElement = ccsJq(this);
					
					ccsJq.fancybox(
					{
						'title': this.title,
						'content': '<div id="ksp-video"></div>',
						height: kspVideoInfo.videoHeight,
						width: kspVideoInfo.videoWidth,
						padding: 10,
						autoSize: false,
						arrows: false,
						afterLoad: function() 
						{
							var t = setInterval(function()
							{
								if(ccsJq('#ksp-video').length > 0)
								{
									clearInterval(t);										
									CCLPccs_logos.ops.addKspVideo(kspVideoInfo, document.getElementById("ksp-video"));										
								}
							}, 500);								
						}
					});					
				});					
			};	
		}
		else
		{
			if(primaryDiv) 
				primaryDiv.appendChild(this.inlineContentShell);
			else if(alternativeDiv) {
				if(this.specs.type == "html")  //put CNET review ahead of CC inline content
					alternativeDiv.parentNode.insertBefore(this.inlineContentShell, alternativeDiv);
				else // put CNET First Look video into the CNET review template
					alternativeDiv.insertBefore(this.inlineContentShell, alternativeDiv.firstChild);
			} else {
				CCLPccs_logos.debug('CCLPccs_logos.InlineContent.setInlineContent: location not found for ' + this.specs.name);
				return this;
			}
			
			if(this.specs.type == "html")
				this.inlineContentShell.innerHTML = this.specs.html.replace(/~/g, "\"");
			else if(this.specs.type == "video") { 
				var v = document.createElement('video');
				var mp4Supported = !!(v.canPlayType && v.canPlayType('video/mp4').replace(/no/, ''));
				var iosDevice = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false;
				if(this.specs.mp4Url && mp4Supported && (iosDevice || this.specs.useMp4)) {
					mp4CnetVideo.divId = shellId;
					mp4CnetVideo.url = this.specs.mp4Url;
					mp4CnetVideo.trackingUrl = this.specs.trackingUrl + "&event=playVideo";
					this.inlineContentShell.style.width = '' + this.specs.mp4Width + 'px'; 
					this.inlineContentShell.style.height = '' + this.specs.mp4Height + 'px';
					CCLPccs_logos.loadJsLibs(['http://vidtech.cbsinteractive.com/h5/2_1_4/CBSI_PLAYER.js']);
				} else {
					var videoUrl = (this.specs.url != undefined) ? this.specs.url : this.specs.mp4Url; 
					var videoWidth = (this.specs.url != undefined) ? this.specs.width : this.specs.mp4Width;
					var videoHeight = (this.specs.url != undefined) ? this.specs.height : this.specs.mp4Height;
					CCLPccs_logos.ops.createVideoWithUrl(shellId, "video-" + this.specs.name + "-ccs_logos", 
						videoWidth, videoHeight, videoUrl, this.specs.trackingUrl, "http://logo.cnetcontentsolutions.com//images/cnet_first_look_vid_preview.png");
				}
			}
			
		}
		
		if(this.specs.trackingUrl) {
			new Image().src = this.specs.trackingUrl + "&event=display&unique=" + new Date().getTime();
		}
		return this;
	}
});

CCLPhideHover = function(logoType, locationId) {
	document.getElementById("CCLP" + logoType + "-ccs_logos").parentLogo.hideHover();	
}

CCLPccs_logos.inlineContentShell = function(inlineContentData) {
	if(inlineContentData == null)
		return;
	for(var i = 0; i < inlineContentData.length; i++) {
		var ic = inlineContentData[i];
		new CCLPccs_logos.InlineContent(ic);
		if (ic.name == "cnetFullTextReview" && ic.paging && document.getElementById(ic.locationId) != null) {
			cclp_pagination_options = { elements_per_page:parseInt(ic.pageSize), split_into_pages: 0 };
			cclp_pagination = new CCLP_paginate('CCLPCnetReviewFullText', 'CCLPCnetReviewGBBL', cclp_pagination_options, ic.trackingUrl);
		}
	}
};


CCLPccs_logos.loadJsLibs = function(jsLibs, callback) {
	  if(jsLibs == null || jsLibs.length == 0) {
		  if(callback)
			  callback();
	  } else {
		  var head      = document.getElementsByTagName('head')[0];
		  var script    = document.createElement('script');
		  script.type   = 'text/javascript';
		  head.appendChild(script);
		  script.src    = jsLibs[0];
		  script.onload = script.onreadystatechange = function() {
		      if (window.ActiveXObject &&  (this.readyState == 'complete' || this.readyState == 'loaded')) {
		    	  CCLPccs_logos.loadJsLibs(jsLibs.slice(1), callback);
		      } else if (! window.ActiveXObject) {
		    	  CCLPccs_logos.loadJsLibs(jsLibs.slice(1), callback);
		      }
		  };
	  }
}

	CCLPccs_logos.loadCssLibs = function(cssLibs) {
		for(var i = 0; i < cssLibs.length; i++) {
			var head  = document.getElementsByTagName('head')[0];
			var link  = document.createElement('link');
			link.type = 'text/css';
			link.href = cssLibs[i];
			link.rel	= 'stylesheet';
			head.appendChild(link);
		}
	}
	
	CCLPReporting = function(event, logoProgram, logoResponseId, crossSaleProduct, parentProduct, qty) {

		if (qty==undefined)
			qty = 1;
		
		var trackingUrl = "http://logo.cnetcontentsolutions.com//event/" + logoProgram + "?type="
					+ event
					+ "&crossSale="
					+ crossSaleProduct
					+ "&crossSaleQuantity="
					+ qty
					+ "&productId="
					+ parentProduct
					+ "&responseLogoId=" + logoResponseId
					+ "&contractId=" + CCLPccs_logos.details.partnerInfo.contractId
					+ "&customerId=" + CCLPccs_logos.details.partnerInfo.customerId
					+ "&locale=" + CCLPccs_logos.details.partnerInfo.locale
					+ "&h=" + CCLPccs_logos.details.partnerInfo.customerHash
					+ "&unique="+ new Date().getTime();
			
		
		new Image().src = trackingUrl;
		CCLPccs_logos.wait(100);
			
	    return true;
	}

	
	function isNumberKey(evt, val)
    {
       var charCode = (evt.which) ? evt.which : event.keyCode;

	       if (charCode > 31  && (charCode < 48 || charCode > 57))
	       {
	    	     return false;
	       }
		return true;
    }

	function checkValue(val)
	{

			var num = Math.abs( parseInt(val.value) );

			if(!isNaN(num))
			{
				val.value=num;
				var x = val.parentNode;
				var y = x.childNodes[1];
				y.style.visibility = 'visible';
			}
			else
			{
				val.value='';				
				var x = val.parentNode;
				var y = x.childNodes[1];
				y.style.visibility = 'hidden';
			}
	}
	
	
	CCLPccs_logos.wait = function(msecs)
	{
		var start = new Date().getTime();
		var cur = start
		while(cur - start < msecs)
		{
			cur = new Date().getTime();
		}	
	}  
	
	var ccsjQuery;
	var jsReady = false;
	var uvp_sOpts = uvp_sOpts || {};
	uvp_sOpts.partner = "cbsiCcs"; 		// CBS partner name, "cbs", "cnet", etc..  
	uvp_sOpts.nativeControls = true;		// IMPORTANT custom controls require additional JavaScript imports, see hi5_custom_controls.html example.
	uvp_sOpts.autoHide = false;				// IMPORTANT if true, hides controls during ads. 
	uvp_sOpts.previewImg = "http://logo.cnetcontentsolutions.com//images/cnet_first_look_vid_preview.png";	// video tag preview image.
	uvp_sOpts.uvpc = "http://vidtech.cbsinteractive.com/config/uvp_notrack.js";	// uvpc config file.
	var mp4CnetVideo = new Object();
	var kspVideo = new Object();
	var kspVideoIndex;
	var kspVideoLength;
	var kspVideoInfo;
	
	var uvpHi5Player;
	var cclpGsVideoTrackingUrl;
	
	function setJSReady() {
		jsReady = true;
	}
	
	function isJSReady() {
		return jsReady;
	}
					
	function onCanPlayerReady(playerId) { //UVP Flash Player
		  if(playerId.indexOf("gamespot") > -1) 
			  new Image().src = cclpGsVideoTrackingUrl + "&unique=" + new Date().getTime();
	      var cbsiPlayer = document.getElementById(playerId);
		  cbsiPlayer.addEventJSCallback("onContentStart_cbsi", "CCLPccs_logos.ops.onContentStarted");
		  cbsiPlayer.addEventJSCallback("onContentEnd_cbsi", "CCLPccs_logos.ops.onContentEnded");
	}	
	
	function onCBSIPlayerReady(playerId) { //UVP Hi5 Player
		  if (playerId == null) {return;}	
		  uvpHi5Player = playerId;
		  uvpHi5Player.addEventJSCallback("onPlayerLoaded_cbsi", "onCBSIPlayerLoaded"); // REQUIRED - must wait for this event before loading videos
		  uvpHi5Player.addEventJSCallback("onContentStart_cbsi", "onCBSiContentStarted");
		  uvpHi5Player.addEventJSCallback("onContentEnd_cbsi", "onCBSiContentEnded");

		  if (mp4CnetVideo.url != null)			  		  
			  uvpHi5Player.initialize(mp4CnetVideo.divId);
		  else
			  uvpHi5Player.initialize(kspVideo.divId);		  
    }
	
	function onCBSIPlayerLoaded(playerId){
		var videoOptions = new Object();
		videoOptions.isAd = false;
		videoOptions.profile = "prog";
		videoOptions.startTime = 0; 
		videoOptions.endTime = -1;  
		if (uvpHi5Player) {
			if (mp4CnetVideo.url != null)	
				uvpHi5Player.loadVideoByUrl(mp4CnetVideo.url, videoOptions);
			else
				uvpHi5Player.loadVideoByUrl(kspVideo.url, videoOptions);			
		} 
	}
	
	function onCBSiContentStarted() {
		if (mp4CnetVideo.url != null) {	
			mp4CnetVideo.duration = uvpHi5Player.getDuration();
			mp4CnetVideo.started = true;
		}
		else {
			kspVideo.duration = uvpHi5Player.getDuration();
			kspVideo.started = true;
		}
	}
	
	function onCBSiContentEnded() {
		if (mp4CnetVideo.url != null) {	
			mp4CnetVideo.started = false;
			new Image().src = mp4CnetVideo.trackingUrl + "&duration=" + Math.ceil((mp4CnetVideo.duration * 1000)) 
				+ "&unique=" + new Date().getTime();
		}
		else {
			kspVideo.started = false;
			new Image().src = kspVideo.trackingUrl + "&duration=" + Math.ceil((kspVideo.duration * 1000)) 
				+ "&unique=" + new Date().getTime();		
		}
	}
	
	function closeWindows7PlayVideoHover() {
    	document.getElementById("CCLPwindows7-play-ccs_logos").parentLogo.hideHover();
	}

CCLPccs_logos.details = {partnerInfo : {"customerHash":"dd4c5cbe","hoverCloseDelay":"20","hoverOpenDelay":"20","customerId":"1234513166","locale":"en_US","layout":"5x1","locationId":"ccs-logos","pn":"JC01-02-US","contractId":"644986835","mf":"Jawbone","sKey":"0433a658","lang":"en_US"},error : {"message":"No logo found for the request"}};
if(CCLPccs_logos.details.partnerInfo.trackingGifUrl) {
	if(CCLPccs_logos.details.partnerInfo.trackingJs)
		CCLPccs_logos.loadJsLibs([CCLPccs_logos.details.partnerInfo.trackingJs]);
	CCLPccs_logos.loadJsLibs(["http://cdn.cnetcontent.com/jsc/log.js"]);
	new Image().src= CCLPccs_logos.details.partnerInfo.trackingGifUrl + "&unique=" + new Date().getTime();
}

if (CCLPccs_logos.details.partnerInfo.sKey) {
	
	if ((CCLPccs_logos.details.partnerInfo.mf && CCLPccs_logos.details.partnerInfo.pn) ||
			 (CCLPccs_logos.details.partnerInfo.upcean))
	{
		var ccs_cc_args = ccs_cc_args || [];
		// Legacy Compatibility Product Script
		
		if (CCLPccs_logos.details.partnerInfo.mf && CCLPccs_logos.details.partnerInfo.pn)
		{
			ccs_cc_args.push(['mf', CCLPccs_logos.details.partnerInfo.mf]);
			ccs_cc_args.push(['pn', CCLPccs_logos.details.partnerInfo.pn]);
		}
		if (CCLPccs_logos.details.partnerInfo.upcean)
			ccs_cc_args.push(['upcean', CCLPccs_logos.details.partnerInfo.upcean]);		
		
		ccs_cc_args.push(['lang', CCLPccs_logos.details.partnerInfo.lang]);
		
		(function () {
		   var o = ccs_cc_args; o.push(['_SKey', CCLPccs_logos.details.partnerInfo.sKey]); o.push(['_ZoneId', 'chp']); 
		   var sc = document.createElement('script'); sc.type = 'text/javascript'; sc.async = true;
		   sc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.cnetcontent.com/jsc/h.js';
		   var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(sc, n);
		})();
	}
}	



	var cclp_pagination_options;
	var cclp_pagination;
    var cclpLoadSwfJs = false;
    var hookRan = false;
    var cclpJsLibs = [];
    var cclpCssLibs = [];
	if (CCLPccs_logos.details.logos) {
		CCLPccs_logos.ops.addArrayElement(cclpCssLibs, 'http://logo.cnetcontentsolutions.com//styles/CCLP_browser.css');
		for (var i=0; i<CCLPccs_logos.details.logos.length; i++) {
			var logo = CCLPccs_logos.details.logos[i].logo;
			if (logo.type == "windows7-play") {
				cclpLoadSwfJs = true;
			} else if(logo.hoverType == "div" && logo.type == "office2010") {
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs, 'http://logo.cnetcontentsolutions.com//styles/office2010.css');
				CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://logo.cnetcontentsolutions.com//scripts/office2010.js');
			} else if(logo.hoverType == "div" && logo.type == "windowsServer") {
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs, 'http://logo.cnetcontentsolutions.com//styles/server2008_div.css');		
			} else if(logo.hoverType == "div" && logo.type == "officeHover") {
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs, 'http://logo.cnetcontentsolutions.com//styles/office2007_div.css');		
			} else if(logo.type == "windowsClient") {
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs, 'http://logo.cnetcontentsolutions.com//styles/windowsClient_div.css');
				CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://logo.cnetcontentsolutions.com//scripts/ccs_tabs.js');
			} else if(logo.type == "amdVision") {
				cclpLoadSwfJs = true;
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs, 'http://logo.cnetcontentsolutions.com//styles/amd_vision.css');
				CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://logo.cnetcontentsolutions.com//scripts/amd_vision.js');
			} else if(logo.type == "lenovo") {
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs, 'http://logo.cnetcontentsolutions.com//styles/lenovo_div.css');
			} else if(logo.hoverType == "div") {
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs, 'http://logo.cnetcontentsolutions.com//styles/' + logo.type + ".css");
				if(logo.hasJs)
					CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://logo.cnetcontentsolutions.com//scripts/' + logo.type + ".js");
			}
		}
	} 
	
	if(CCLPccs_logos.details.treepodiaInfo != null) {
			var treepodiaInfo = CCLPccs_logos.details.treepodiaInfo;
			
			if (treepodiaInfo.treepodiaUrl.indexOf("type=dialog") == -1)
			{
				CCLPccs_logos.ops.addTreepodiaToDiv(treepodiaInfo);
				
				/*
				 * the check for presence of video container div was removed to accomodate AJAX based customers to use Treepodia
				 * 
				 
				var videoDiv=document.getElementById(treepodiaInfo.locationId);
				if(videoDiv) {							
					CCLPccs_logos.ops.addTreepodiaToDiv(treepodiaInfo);
				}
				else{
					var tieDivs=document.getElementById("inline_showcase");  
					if (tieDivs) {				
						var treeDiv=document.createElement("div");			
						treeDiv.setAttribute("id", treepodiaInfo.locationId);
						tieDivs.parentNode.insertBefore(treeDiv, tieDivs);								
						CCLPccs_logos.ops.addTreepodiaToDiv(treepodiaInfo);
					}
				}
				*/
				
				
			}
			else
			{				
				var buttonDiv=document.createElement("div");
				buttonDiv.setAttribute("id", "trpd-video-btn");
				buttonDiv.style.display = 'none';
				var buttonLink=document.createElement("a");
				buttonLink.setAttribute("href", "javascript:showVideoDialog('', trpdVideo)");				
				var buttonImg=document.createElement("img");
				
				if (treepodiaInfo.playerButton != null)
					buttonImg.setAttribute("src", treepodiaInfo.playerButton);
				else
					buttonImg.setAttribute("src", "http://cc.cnetcontent.com/apollo/ksp-video-button.png");
				buttonImg.setAttribute("alt", "Play Video");
				
				buttonLink.appendChild(buttonImg);
				buttonDiv.appendChild(buttonLink);
			
				var videoButtonDiv=document.getElementById(treepodiaInfo.locationId);				
				
				if (videoButtonDiv)
					videoButtonDiv.appendChild(buttonDiv);
				else
				{					
				    var logoDiv=document.getElementById(CCLPccs_logos.details.partnerInfo.locationId); 
					if (logoDiv) {								
						logoDiv.parentNode.insertBefore(buttonDiv, logoDiv);
					}	
				}	

				CCLPccs_logos.ops.addTreepodiaToDiv(treepodiaInfo);
			}	
	}		
				
	if(CCLPccs_logos.details.inlineContents) {
		for(var i = 0; i < CCLPccs_logos.details.inlineContents.length; i++) {
			if(CCLPccs_logos.details.inlineContents[i].name == 'cnetGbblReview')
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs,'http://logo.cnetcontentsolutions.com//styles/cnetReviewsHover.css');
			else if(CCLPccs_logos.details.inlineContents[i].name == 'cnetFullTextReview') {
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs,'http://logo.cnetcontentsolutions.com//styles/cnetReviewsHover.css');
				CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://logo.cnetcontentsolutions.com//scripts/ccs_pagination.js');
			} else if(CCLPccs_logos.details.inlineContents[i].name == 'gameSpotReview') {
				cclpGsVideoTrackingUrl = CCLPccs_logos.details.inlineContents[i].trackingUrl + "&event=playVideo";
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs,'http://logo.cnetcontentsolutions.com//styles/gamespot.css');
				CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://logo.cnetcontentsolutions.com//scripts/CCSGamespot.js');
				CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://logo.cnetcontentsolutions.com//scripts/gamespot_inline.js');
				cclpLoadSwfJs = true;
			} else if(CCLPccs_logos.details.inlineContents[i].name == 'kspVideo') {
				cclpLoadSwfJs = true;
				CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://cdn.cnetcontent.com/static/pe-130425/jquery/jquery-1.9.1.modified.min.js');
				CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://cdn.cnetcontent.com/static/pe-130425/fancybox2/jquery.fancybox.modified.pack.js');		
				CCLPccs_logos.ops.addArrayElement(cclpCssLibs, "http://cdn.cnetcontent.com/static/pe-130425/fancybox2/jquery.fancybox.css");		
			} else if(CCLPccs_logos.details.inlineContents[i].type == 'video') {
				cclpLoadSwfJs = true;
			}
		}
	}

	
	if(cclpLoadSwfJs) {
		setJSReady();
		CCLPccs_logos.ops.addArrayElement(cclpJsLibs, 'http://logo.cnetcontentsolutions.com//scripts/swfobject.js');
	}
	
	CCLPccs_logos.loadCssLibs(cclpCssLibs);
	CCLPccs_logos.loadJsLibs(cclpJsLibs, function() {
		if (cclpLoadSwfJs && SWFObject && hookRan == false) {
			CCLPccs_logos.LogoShell(CCLPccs_logos.details.partnerInfo, CCLPccs_logos.details.logos);
			CCLPccs_logos.inlineContentShell(CCLPccs_logos.details.inlineContents);
			hookRan = true;
		} else if (cclpLoadSwfJs == false && hookRan == false) {
			CCLPccs_logos.LogoShell(CCLPccs_logos.details.partnerInfo, CCLPccs_logos.details.logos);
			CCLPccs_logos.inlineContentShell(CCLPccs_logos.details.inlineContents);
			hookRan = true;
		}
	});	


CCLPccs_logos.ops.addEvent(window,'beforeunload', function() {
	for(var i in CCLPccs_logos.videos) {
	     CCLPccs_logos.videos[i].close();
	}
	if(mp4CnetVideo.started) {
		new Image().src = mp4CnetVideo.trackingUrl + "&duration=" + Math.ceil((uvpHi5Player.getCurrentTime() * 1000)) 
			+ "&unique=" + new Date().getTime();
	}
	
	if(kspVideo.started) {
		new Image().src = kspVideo.trackingUrl + "&duration=" + Math.ceil((uvpHi5Player.getCurrentTime() * 1000)) 
			+ "&unique=" + new Date().getTime();
	}
	
});
