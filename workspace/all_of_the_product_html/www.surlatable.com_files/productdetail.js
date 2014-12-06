//
//  When color swatches are shown, display colorname when 
//  the mouse hovers over the swatch.
//

$(document).ready(function() { 
    $('.colorchoices .swatches a img').hover(function() {
        var colorname = $(this).attr('alt');
        $('.colorchoices .colorname').attr('value',colorname);
        });
    });

//
// implement bgiframe
//
$(document).ready(function() {
    $('.sub.bgiframe').bgiframe({ opacity: false });
});

//
// implement product video primary feature
// position the productVideo primary feature with in the product detail secondary container
//
$(document).ready(function() {
    $("#product #productdetail .secondary").append($("#product>#productVideo"));
});
//
// fix empty error messages in the purchasing section
//
$(document).ready(function() {
    function fixLastUL($lastUL) {
        $lastUL.each(function() {
            var items = $(this).find("li");
            if (items.length == 0 || items.html() == '') {
                $(this).prev().addClass("last");
            }
            else {
                $(this).prev().removeClass("last");
            }
        }).addClass("last");
    };

    fixLastUL($("#product #productdetail #productdetailinfo .purchasing ul").find("a.button, a.buttonalt").click(function() {
        fixLastUL($(this).closest(".purchasing").find("ul").filter(":last"));
    }).end().filter(":last"));
});