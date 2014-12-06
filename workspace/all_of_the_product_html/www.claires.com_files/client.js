/* Changes for IE 9 */
// Temporary fix for IE8/9 - disabling ajax filters
$(function () {
    if (History.emulated.pushState) {
        $('.btf_filters').off('click change').find('select, input').on('change', function () {
            var form = $(this).closest('form'),
                url = form.prop('action').concat(form.prop('action').indexOf('?') > -1 ? '&' : '?').concat(form.serialize());
            window.location.href = url;
        });
    }
});


/*Customer support sidebar scroll */
$(function() {

    var $sidebar   = $("#sidebar-customer-service"), 
        $window    = $(window),
        topPadding = 15,
        offset;

    // jQuery objects are eseentually arrays, so we check the length instead 
    if ($sidebar.length) {
    	// Calc the offset if sidebar exists
    	offset = $sidebar.offset();

        $window.scroll(function() {
            if ($window.scrollTop() > offset.top) {
                $sidebar.stop().animate({
                    marginTop: $window.scrollTop() - offset.top + topPadding
                });
            } else {
                $sidebar.stop().animate({
                    marginTop: 0
                });
            }
        });
    }    
    
});

/*Ear Piecing Toggle */

var btf = btf || {};
$(document).ready(function() {
    if (btf.global) {
        $(".custom-piercing_toggle > a", "#custom-piercing").on("click", function(a) {
            return btf.global.reveal(this, "custom-piercing_toggled", "toggle")
        });
    }

	/* Video FancyBox (only if fancybox has been loaded)*/
	if ($.fancybox) {
		$(".various").fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	};
});

/*Homepage Hover */
$(document).ready(function(){
   // Change the image of hoverable images
   $(".imgHoverable").hover( function() {
       var hoverImg = HoverImgOf($(this).attr("src"));
       $(this).attr("src", hoverImg);
     }, function() {
       var normalImg = NormalImgOf($(this).attr("src"));
       $(this).attr("src", normalImg);
     }
   );
});

function HoverImgOf(filename)
{
   var re = new RegExp("(.+)\\.(gif|png|jpg)", "g");
   return filename.replace(re, "$1_hover.$2");
}
function NormalImgOf(filename)
{
   var re = new RegExp("(.+)_hover\\.(gif|png|jpg)", "g");
   return filename.replace(re, "$1.$2");
}