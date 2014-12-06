/*
 * Three60 / image series module
 *
 * Displays a series of img tags as a control which simulates a rotation of images by flipping through the images rapidly.
 *
 * options:
 *	- string path			(data-path)			: The path to the image series. Use '##' to identify the number of the image in the series eg: data-path="/lg3-common/images/car##.jpg"
 *	- num images			(data-images)		: The number of images total in the series if all were used
 *	- num spacing			(data-spacing)		: The spacing between images to use to save on load time for portable devices, eg: data-spacing="2" would skip every other image.
 *	- num ratio				(data-ratio)		: The ratio of movement of the mouse to frames flipped. eg: data-ratio="20" would flip an image for every 20 pixels the mouse moves.
 *	- string width			(data-width)		: The width of the images
 *	- string height			(data-height)		: The height of the images
 *	- num animatespeed		(data-animatespeed)	: The interval between animation loops when auto rotating or applying velocity, in miliseconds.
 *	- boolean autorotate	(data-autorotate)	: Whether to continually rotate after loading until interacted with
 *	- boolean debug			(data-debug)		: Whether to trace to the console for changes in state to this module
 *	- boolean wait			(data-wait)			: Whether to wait on loading images until reveal method is called
 *
 * requires:
 * - lg.js
 *
 * authors:
 *   Big Red Tech <bigred.tech@icrossing.com>
 *  	Adam Abouraya <Adam.Abouraya@icrossing.com>
 * 		Arne G Strout <arne.strout@icrossing.com>
 * 		Bret Crosby <bret.crosby@icrossing.com>
 * 		John Reading <john.reading@icrossing.com>
 * 		Jonathan Zuckerman <jonathan.zuckerman@icrossing.com>
 */
lg.Three60 = lg.Component.extend({
	options: {
		path:'no image path',
		images:16,
		spacing:1,
		wait:false,
		ratio:10,
		width:'300px',
		height:'400px',
		animatespeed:33,
		autorotate:false
	},

	init:function(opts,element){
		this._super(opts,element);

		if (this.options.spacing==0) this.options.spacing = 1;
		this.options.ratio = this.options.ratio * this.options.spacing;

		this._build();

		this.log('initComplete',this.element);
	},
	images: [],
	loaded: [],
	index: 0,
	dragging: false,
	loadStarted: false,
	loadEnded: false,
	lx: 0,
	ly: 0,
	avgdx: 0,
	spindx: 0,
	
	_build:function(){
		this.element.css('width',this.options.width);
		this.element.css('height',this.options.height);
		if(!this.options.wait && this.options.wait != 'true'){
			this.loadImages();
		}
	},

	loadComplete:function(img){
		// keep track of loaded
		var n = -1;
		var i = this.loaded.length;
		while (i--) {
			if (this.loaded == img) n = i;
		}

		if(n<0){
			this.loaded.push(img);
			$(img).css('width',this.options.width);
			$(img).css('height',this.options.height);
		}

		if(this.loaded.length >= this.numToLoad && !this.loadEnded){
			this.loadEnded = true;
			this.enableControls();
			this.element.css('background-image','none');
		}
	},
	enableControls:function(){
		$('.cover',this.element).bind('mousedown',$.proxy(function(event){
			event.preventDefault();
			this.lx = event.pageX;
			this.dragging = true;
			this.avgdx = 0;
			this.spindx = 0;
			clearInterval(this.spinint);
			$('.cover',this.element).bind('mousemove',$.proxy(this.drag,this));
			$(this.element).bind('mouseleave',$.proxy(this.releaseDrag,this));
			$(document, window).bind('mouseup',$.proxy(this.releaseDrag,this))
		},this));

		if (this.options.startstatic!=undefined){
			this.switchTo(this.element.find('img')[this.options.startstatic]);
		} else if (!this.options.autorotate) {
			this.spindx=300;
			clearInterval(this.spinint);
			this.spinint=setInterval(function() {
				$this.spin();
			},this.options.animatespeed);
		} else {
			clearInterval(this.spinint);
			this.spinint=setInterval($.proxy(function(){
				this.iterate();
			},this),this.options.animatespeed*this.options.spacing);
		}
		
		$('.three60-arrow-right',this.element).bind('mouseover focusin',$.proxy(function(e){
			e.preventDefault();
			this.rightInterval = setInterval($.proxy(function(){
				if (this.spindx !== 0) return;
				if (!this.visibleImg.prev().length) {
					this.switchTo($('img',this.element).last());
				} else {
					this.switchTo(this.visibleImg.prev());
				}
			},this),50);
		},this)).bind('mouseout focusout',$.proxy(function(e){
			e.preventDefault();
			clearInterval(this.rightInterval)
		},this));
		
		$('.three60-arrow-left',this.element).bind('mouseover focusin',$.proxy(function(e){
			e.preventDefault();
			this.leftInterval = setInterval($.proxy(function(){
				if (this.spindx !== 0) return;
				if (!this.visibleImg.next().length) {
					this.switchTo($('img',this.element).first());
				} else {
					this.switchTo(this.visibleImg.next());
				}
			},this),50);
		},this)).bind('mouseout focusout',$.proxy(function(e){
			e.preventDefault();
			clearInterval(this.leftInterval)
		},this));
	},

	drag:function(event){
		var dx = this.lx - event.pageX;
		this.lx = event.pageX;
		if (Math.abs(dx) > Math.abs(this.avgdx)) {
			this.avgdx = (this.avgdx * 2 + dx)/3;
		} else {
			this.avgdx = (this.avgdx * 12 + dx)/13;
		}

		if(this.dragging){
			this.index += dx / this.options.ratio;
			if (this.index >= this.loaded.length) this.index -= this.loaded.length;
			if (this.index < 0) this.index += this.loaded.length;
			this.switchTo(this.element.find('img')[Math.floor(this.index)]);
		}
	},

	releaseDrag:function(){
		$('.cover',this.element).unbind('mousemove');
		$(this.element).unbind('mouseleave');
		$(document, window).unbind('mouseup');
		this.dragging = false;
		if(Math.abs(this.avgdx) > 0){
			this.spindx = this.avgdx;
			clearInterval(this.spinint);
			this.spinint = setInterval($.proxy(function(){
				this.spin();
			},this),33);
		}
	},
	
	spin:function(event){
		this.spindx = this.spindx * .9;
		if (Math.abs(this.spindx) < .2){
			this.spindx = 0;
			clearInterval(this.spinint);
		} else {
			this.index += (this.spindx / this.options.ratio);
			if (this.index >= this.loaded.length) this.index -= this.loaded.length;
			if (this.index < 0) this.index += this.loaded.length;
			this.switchTo(this.element.find('img')[Math.floor(this.index)]);
		}
	},
	
	iterate:function(){
		this.index++;
		if (this.index >= this.loaded.length) this.index = 0;
		this.switchTo(this.element.find('img')[this.index]);
	},

	switchTo:function(img){
		$('img',this.element).hide();
		$(img).show();
		this.visibleImg = $(img)
	},

	digits:function(n){
		var s = '' + n;
		while (s.length < 2) {
			s = '0' + s;
		}
		return s;
	},

	reveal:function(){
		this.loadImages();
	},

	loadImages:function(){
		if(!this.loadStarted){
			this.loadStarted = true;
			this.loaded = [];
			this.numToLoad = 0;
			var s = $('.images',this.element).html();
			for(var i = 0; i < this.options.images; i += this.options.spacing){
				s += '<img src="' + this.options.path.split('##').join(this.digits(i + 1,2)) + '" width="'+this.options.width+'" height="'+this.options.height+'"/>';
				this.numToLoad++;
			}
			$('.images',this.element).html(s);
			$('.images',this.element).find('img').load($.proxy(function(el){
				this.loadComplete(el);
			},this));
			$('.cover',this.element).css({
				'width' :this.options.width,
				'height': this.options.height
			});
		}
	}
});

lg.plugin('three60', lg.Three60, '.three60');

