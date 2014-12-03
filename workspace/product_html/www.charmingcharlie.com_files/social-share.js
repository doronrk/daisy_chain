(function($) {
    var socialCompany = 'charming charlie';
    var socialHashtag = '#charmingcharlie';

    function getImage() {
        var image = "";
        if($(".zoomThumbActive").length > 0) {
            var zoomThumb = $(".zoomThumbActive");
            var options = $.extend({}, eval("(" + $.trim($(zoomThumb).attr('rel')) + ")"));
            image = options.largeimage;
        } else {
            image = $("#social-share > .image").text();
        }

        return image;
    }

    function getTitle() {
        return ($("#social-share > .title").length > 0) ? $("#social-share > .title").text() : "";
    }

    function getUpc() {
        return ($("#social-share > .upc").length > 0) ? $("#social-share > .upc").text() : "";
    }

    function getLink() {
        var link = "";
        var color = getColor();

        link = ($("#social-share > .link").length > 0) ? $("#social-share > .link").text() : "";

        if(color) {
            link = link + "#color=" + color;
        }

        return link;
    }

    function getDescription() {
        return ($("#social-share > .description").length > 0) ? $("#social-share > .description").text() : "";
    }

    function getColor() {
        var color = "";
        var colorSwatch = $("#swatch1034 > .colorswatch-active");

        if($(colorSwatch).length > 0 && $(colorSwatch).attr("alt")) {
            color = $(colorSwatch).attr("alt").toLowerCase();
        }

        return color;
    }

    $(document).ready(function() {
        $(document).on("click", "div#product-pinit > a", function(e) {
            e.preventDefault();

            var action = $(this).data("share-action");
            var label = $(this).data("share-label");

            gtmPush(action, label);

            sharePinterest(
                getTitle(),
                getUpc(),
                getImage(),
                getLink()
            );
        });
        
        $(document).on("click", "div#social-share > ul > li > a", function(e) {
            e.preventDefault();

            var action = $(this).data("share-action");
            var label = $(this).data("share-label");

            gtmPush(action, label);

            switch(action) {
                case "facebook":
                    shareFacebook(
                        getTitle(),
                        getDescription(),
                        getUpc(),
                        getImage(),
                        getLink()
                    );
                    break;
                case "twitter":
                    shareTwitter(
                        getTitle(),
                        getUpc(),
                        getLink()
                    );
                    break;
                case "pinterest":
                    sharePinterest(
                        getTitle(),
                        getUpc(),
                        getImage(),
                        getLink()
                    );
                    break;
                case "tumblr":
                    shareTumblr(
                        getTitle(),
                        getDescription(),
                        getUpc(),
                        getImage(),
                        getLink()
                    );
                    break;
                case "email":
                    shareEmail(
                        getTitle(),
                        getUpc(),
                        getLink()
                    );
                    break;
            }
        });

        function gtmPush(action, label) {
            /* GTM Event Tracking */
            if(typeof(dataLayer) != 'undefined') {
                dataLayer.push({'event': 'share product pd', 'eventCategory': 'share product', 'eventAction': 'share '+ action, 'eventLabel': label});
            }
        }

        function shareFacebook(title, description, upc, image, link) {
            if(typeof(FB) != "undefined") {
                if(upc) {
                    upc = "UPC: " + upc;
                }

                var name = socialCompany + " | " + title;
                var body = description + " " + upc + " " + socialHashtag;

                FB.ui({
                    method: "feed",
                    link: link,
                    caption: 'WWW.CHARMINGCHARLIE.COM',
                    name: name,
                    media: image,
                    description: body
                }, function(response){});
            }
        }

        function shareTwitter(title, upc, link) {
            if(upc) {
                upc = "UPC: " + upc;
            }

            var description = socialCompany + " | " + title + " | " + upc + " " + socialHashtag + " " + link;

            description = encodeURIComponent(description);

            var url = "http://www.twitter.com/intent/tweet?source=webclient&text=" + description;

            window.open(url, "", "width=626,height=436");
        }

        function sharePinterest(title, upc, image, link) {
            if(upc) {
                upc = "UPC: " + upc;
            }
            var description = socialCompany + " | " + title + " | " + upc + " " + socialHashtag;

            description = encodeURIComponent(description);
            link = encodeURIComponent(link);
            image = encodeURIComponent(image);

            var url = "http://www.pinterest.com/pin/create/button?description=" + description + "&url=" + link + "&media=" + image;

            window.open(url, "", "width=750,height=316");
        }

        function shareTumblr(title, description, upc, image, link) {
            if(upc) {
                upc = "UPC: " + upc;
            }

            var caption = socialCompany + " | " + title + " | " + description + " | " + upc + " " + socialHashtag;

            image = encodeURIComponent(image);
            caption = encodeURIComponent(caption);
            link = encodeURIComponent(link);

            var url = "http://www.tumblr.com/share/photo?source=" + image + "&caption=" + caption + "&click_thru=" + link;

            window.open(url, "", "width=450,height=428");
        }

        function shareEmail(title, upc, link) {
            if(upc) {
                upc = "UPC: " + upc;
            }

            var subject = "Look what I found at charmingcharlie.com";
            var body = title + " | " + upc + " " + link;

            var url = "mailto:?subject=" + subject + "&body=" + encodeURIComponent(body);
            window.location.href = url;
        }
    });
})(jQuery);
