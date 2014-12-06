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
        offset     = $sidebar.offset(),
        topPadding = 15;

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


