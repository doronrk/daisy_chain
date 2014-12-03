$(document).ready(function() {

	$('ul.pdp-gallery-hero')
		.cycle({
			fx: 'fade',
			timeout: 0,
			pause: 1,
			pager:  'ul.pdp-gallery-thumbs',
			pagerAnchorBuilder: function(idx, slide) {
				// return selector string for existing anchor
				return 'ul.pdp-gallery-thumbs li:eq(' + idx + ') a';
			}
		});

	$('ul.pdp-gallery-thumbs').jcarousel({
		scroll: 1
	});

	$("ul.pdp-order-warranty input").click(function(e) {
		$("ul.pdp-order-warranty input").not(e.target).removeAttr("checked");
	});

	$(".pdp-intro, .pdp-menu, .pdp h2, .pdp-order").localScroll({
		target: 'body', // could be a selector or a jQuery object too.
		queue:true,
		duration:500,
		hash:true,
		onBefore:function(e, anchor, $target) {
			// The 'this' is the settings object, can be modified
		},
		onAfter:function(anchor, settings) {
			// The 'this' contains the scrolled element (#content)
		}
	});


	if($('.pdp-order').offset()!=null) {
		var top = $('.pdp-order').offset().top - parseFloat($('.pdp-order').css('marginTop').replace(/auto/, 0));
		$(window).scroll(function (event) {
			// what the y position of the scroll is
			var y = $(this).scrollTop();

			// whether that's below the form
			if (y >= top) {
				// if so, ad the fixed class
				$('.config .pdp-order').addClass('fixed');
			} else {
				// otherwise remove it
				$('.config .pdp-order').removeClass('fixed');
			}
		});
	}

	reheightProductOverviewSection();

});

function reheightProductOverviewSection() {
	var imgHeight = $('#product-overview-brimg').height() + 40;
	var divHeight = $('#pdp-overview').height();
	if (imgHeight > divHeight) {
		$('#pdp-overview').height(imgHeight);
	}
}

