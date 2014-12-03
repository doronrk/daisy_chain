$(document).ready(function() {
		/*
		 *  Simple image gallery. Uses default settings
		 */
		$('.fancybox').fancybox();
		
		/* specifically used on denim landing page */
		$("#fancybox-denim-details").click(function() {
			$.fancybox.open({
				href 		: 'denim-details.html',
				type 		: 'iframe',
				'width'		: 980,
				'height'	: 717
			});
		});

		/*
		 *  Media helper. Group items, disable animations, hide arrows, enable media and button helpers.
		*/
		$('.fancybox-media')
			.attr('rel', 'media-gallery')
			.fancybox({
				openEffect 	: 'none',
				closeEffect : 'none',
				prevEffect 	: 'none',
				nextEffect 	: 'none',
				'width'		: 680,
				'height'	: 495,
				wrapCSS    	: 'fancybox-custom',
				closeClick 	: true,
				
				arrows : false,
				helpers : {
					media : {},
					buttons : {}
				}
		});


		
		/* use this snippet if using fancybox with imagemap (give the map area class="fancybox" rel="iframe" for links to use fancybox */
		$('map > area.fancybox-map').click(function(e) {
			  
			e.preventDefault();
			
			var url = $(this).attr('href');
			var title = $(this).attr('title');
			var type = $(this).attr('rel');
			
			if (url.indexOf('width') != -1){
				var dWidth  = parseInt(url.match(/width=[0-9]+/i)[0].replace('width=',''));
			} else {
				var dWidth = 450;	
			}
			if (url.indexOf('height') != -1){
				var dHeight =  parseInt(url.match(/height=[0-9]+/i)[0].replace('height=',''));
			} else {
				var dHeight = 150;	
			} 
        	
			$.fancybox({
				'href' : url,
				'width': dWidth,
				'height' : dHeight,
				fitToView   : false,
				autoSize    : false,
				'type' : type
			});
		});
		
		/* use this snippet if using fancybox with ahref (give the map area class="fancybox-a" and rel="iframe" for ahref to use fancybox */
		$('.fancybox-a').click(function(e) {
			  
			e.preventDefault();
			
			var url = $(this).attr('href');
			var title = $(this).attr('title');
			var type = $(this).attr('rel');
			
			if (url.indexOf('width') != -1){
				var dWidth  = parseInt(url.match(/width=[0-9]+/i)[0].replace('width=',''));
			} else {
				var dWidth = 450;	
			}
			if (url.indexOf('height') != -1){
				var dHeight =  parseInt(url.match(/height=[0-9]+/i)[0].replace('height=',''));
			} else {
				var dHeight = 150;	
			} 
        	
			$.fancybox({
				'href' : url,
				'width': dWidth,
				'height' : dHeight,
				fitToView   : false,
				autoSize    : false,
				'type' : type
			});
		});
});