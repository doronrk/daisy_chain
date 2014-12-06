$(document).ready(function() {
    $("img[id^='bigImage']").each(function() {
        var id = $(this).attr("id");
        var i = id.substr(8, id.length - 8);
        var originalImage = $(this).attr("src");
        $(".smallItemImage" + i).each(function() {
            $(this).click(function() {
                var small = $(this).attr("src");
                $("#" + id).attr("src", small);
            });
            $(this).bind("mousemove", function() {
                var small = $(this).attr("src");
                $("#" + id).attr("src", small);
            });
            $(this).bind("mouseout", function() {
                var small = $(this).attr("src");
                $("#" + id).attr("src", originalImage);
            });
        });
    });

    $('.imageCloseup .smallItemImage, .imageCloseup.smallItemImage').each(function() {
        var originalImage = $(this).closest('.imageCloseup').find('.bigImage').attr('src');
        $(this).click(function() {
            var small = $(this).attr('src');
            $(this).closest('.imageCloseup').find('.bigImage').attr('src', small);
        });
        $(this).bind('mousemove', function() { // Causes issues with Chrome and Safari
            var small = $(this).attr('src');
            $(this).closest('.imageCloseup').find('.bigImage').attr('src', small);
        });
        $(this).bind('mouseover', function() {
            var small = $(this).attr('src');
            $(this).closest('.imageCloseup').find('.bigImage').attr('src', small);
        });
        $(this).bind('mouseout', function() {
            var small = $(this).attr('src');
            $(this).closest('.imageCloseup').find('.bigImage').attr('src', originalImage);
        });
    });

    $('.backgroundCloseup .smallItemImage, .backgroundCloseup.smallItemImage').each(function() {
        var originalBg = $(this).closest('.backgroundCloseup').css("background");
        function getBg($this) {
            if ($this.attr("bgsrc") != null) { // background value
                return jQuery.trim($this.attr("bgsrc"));
            }
            else if ($this.attr("src") != null) { // background image source
                return "url(" + jQuery.trim($this.attr("src")) + ") no-repeat top left";
            }
            else { // current background settings
                return originalBg;
            }
        }
        $(this).click(function() {
            $(this).closest('.backgroundCloseup').css("background", getBg($(this)));
        });
        $(this).bind("mouseover", function() {
            $(this).closest('.backgroundCloseup').css("background", getBg($(this)));
        });
        $(this).bind("mouseout", function() {
            $(this).closest('.backgroundCloseup').css("background", originalBg);
        });
    });

});