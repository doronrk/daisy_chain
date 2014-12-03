lg.featureFlash = lg.Component.extend({
	options: {
		src:'',
		type:'flash',
		width:'400',
		height:'300'
	},
	init: function (options, element) {
		this._super(options, element);
		this.el = $(this.element);
		
		head.feature("html5video", function () {
			var c = document.createElement("video");
			return !!c.canPlayType
		});
		
		this.el.css({'visibility':'visible','width':this.options.width+'px','height':this.options.height+'px'});
		if ( this.el.hasClass('loader') ) {
			//$(window).scroll( $.proxy( function() { this.loadFlash(); } ,this ) );
		}
	},
	loadFlash: function () {
		
		if ( this.el.hasClass('loader') ) {
			var $swf = this.el;
			var swfSrc = $swf.attr('data-src');
			var swfWidth = this.options.width;
			var swfHeight = this.options.height;
			var altimg = $swf.attr('alt-img');
			
			var altImgCode = "<img src='"+altimg+"' alt='Get Adobe Flash player' />";
			if ( !altimg || altImg == '') { altImgCode = '<p>You need Adobe Flash player</p>'; }
			
			var params = {
			  wmode: "opaque",
			  flashVars: "",
			  allowScriptAccess: "always"
			};
			swfobject.registerObject( $swf.attr('data-id'), "9.0.0", "expressInstall.swf");
			
			var swfobj;
			if ( $.browser.msie ) {
				swfobj ="<object id='"+$swf.attr('data-id')+"' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='"+swfWidth+"' height='"+swfHeight+"'>"+
						"<param name='movie' value='"+swfSrc+"' />"+
						"<param name='wmode' value='transparent' />"+
						altImgCode +
						"</object>";
			 } else {
				swfobj ="<object id='"+$swf.attr('data-id')+"' type='application/x-shockwave-flash' data='"+swfSrc+"' width='"+swfWidth+"' height='"+swfHeight+"'>"+
						"<param name='wmode' value='transparent' />"+
						altImgCode +
						"</object>"
			 }
			this.el.removeClass('loader').html( swfobj ).css({'visibility':'visible'}).find('object').css({'visibility':'visible'});
		}
	}
});
lg.plugin("featureFlash", lg.featureFlash, ".flash-temp");

lg.featureFlash2 = lg.Component.extend({
	options: {
	},
	init: function (options, element) {
		this._super(options, element);
		this.els = $(this.element);
		
		head.feature("html5video", function () {
			var c = document.createElement("video");
			return !!c.canPlayType
		});
		$(this.element).find('[data-type=flash]').each( function(idx) {
			$(this).attr('data-id', 'swf'+parseInt(idx+1)).addClass('loader').css('display','block');
		});
	}
});
lg.plugin("featureFlash2", lg.featureFlash2, "#product-details-temp");

// not in use anymore - 2012-04-23