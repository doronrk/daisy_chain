/*
    Category Carousel
*/
(function($) {
    // Workaround for Tab Shopping
    var getHidingParent = function(element) {
        if ($(element).width() == 0) {
            if ($(element).parent().width() == 0) {
                return $(element).parent().getHidingParent();
            }
            return $(element); // default is to return the element
        }
        return null; // element must have a width of zero to a parent
    };
    $.fn.getHidingParent = function() {
        return getHidingParent(this);
    };
})(jQuery);

$(document).ready(function() {

    // For each instance of an "infiniteCarousel"...
    $(".infiniteCarousel,.infiniteCarousel1,.infiniteCarousel2,.infiniteCarousel1_2,.infiniteCarousel2_2").each(function(index, element) {
        //Define default values for size, speed, & arrow classes
        // We can make this part smarter based on whether they are inside Main or Content
        var DEFAULTSIZE = "5", DEFAULTSPEED = 1500, arrowforward = "arrowforward", arrowback = "arrowback";
        // Any specified size options must be added as a class to a parent DIV called "carousel" or "carouselLite"
        var container = $(element).closest('.carousel,.carouselShort');
        // (or if that does not exist, its immediate parent element)
        if ($(container).length == 0) { container = $(element).parent(); };
        var by = parseInt((($(container).attr("class").split("by")[1]) || DEFAULTSIZE).split(" ")[0]); //parse size from container style
        // Add unique class to parent in order to provide unique references to arrow buttons
        var classid = "iC" + index; $(container).addClass(classid);  //unique class       
        // Look for arrows and assign their names to variables
        $("." + classid + "  a").each(function(index_a, element_a) {
            //set as variable for looping speed
            var class_a = $(element_a).attr("class");
            if(typeof class_a == 'undefined') return;
            // Look for "arrow" first to minimize IF processing
            if (class_a.indexOf("arrow") > -1) {
                // Assemble the full arrow class name, in case it's one class among many
                class_a = "arrow" + (class_a.split("arrow")[1].split(" ")[0]);
                // Set variables for arrow class names
                if (class_a.indexOf("arrowforward") > -1) { arrowforward = class_a; }
                if (class_a.indexOf("arrowback") > -1) { arrowback = class_a; }
            }
        });

        var hidingParent = $(element).getHidingParent();
        if (hidingParent) {
            $(hidingParent).addClass("hidden").show().find("div").show();
        }

        $(element).jCarouselLite({
            // if parent vas a "vertical" class, pass this to JCarousel
            vertical: ($(container).attr("class").indexOf("vertical") > -1),
            // Assign arrow variables by the class names we found
            btnNext: "." + classid + "  a." + arrowforward,
            btnPrev: "." + classid + "  a." + arrowback,
            // Assign visible & amount by our determined values; add default speed
            visible: by, scroll: by, speed: DEFAULTSPEED
        });

        if (hidingParent) {
            $(hidingParent).hide().removeClass("hidden");
        }
    });


    /*

    $(".carousel.by2 .infiniteCarousel").jCarouselLite({
    btnNext: ".arrowforwardby2",
    btnPrev: ".arrowbackby2",
    visible: 2,
    scroll: 2,
    speed: 1500
    });



    $(".carousel.by4 .infiniteCarousel").jCarouselLite({
    btnNext: ".arrowforwardby4",
    btnPrev: ".arrowbackby4",
    visible: 4,
    scroll: 4,
    speed: 1500
    });

    $(".carouselShort").each(function() {
    var sIndex = $('.carouselShort').index($(this));
    $(this).filter(".by4").find(".infiniteCarousel").jCarouselLite({
    btnNext: ".carouselShort:eq(" + sIndex + ") .arrowforwardby4_short",
    btnPrev: ".carouselShort:eq(" + sIndex + ") .arrowbackby4_short",
    visible: 4,
    scroll: 4,
    speed: 1500
    });
    });

*/

    /*
    The following code supports the shopthemecarousel.jsp and shopthemecarouselCatg.jsp templates.
    This code is needed until these templates can be updated to the more universal standard
    template above.
    */

    $(".shopthemecarousel .infiniteCarousel").jCarouselLite({
        btnNext: ".shopthemecarousel .arrowforwardby6",
        btnPrev: ".shopthemecarousel .arrowbackby6",
        visible: 6,
        scroll: 6,
        speed: 1500
    });

    $(".shopthemecarouselcatg .infiniteCarousel").jCarouselLite({
        btnNext: ".shopthemecarouselcatg .arrowforwardby6",
        btnPrev: ".shopthemecarouselcatg .arrowbackby6",
        visible: 6,
        scroll: 6,
        speed: 1500
    });


});