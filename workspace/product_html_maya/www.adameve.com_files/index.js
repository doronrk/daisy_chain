$(function () {
    $('#fancybox-close').unbind('click');
    $('#fancybox-close').bind('click', function () {
        var player = $f(); player.unload();
        $.fancybox.close();
    });

    $('.play-video').click(function () {
        if ($('#login-required').val() === 'true') {
            navigateToLocation($('#login-url').val());
        }
        else {
            $('#player-dialog').lightbox('open');
        }
    });


    if ($('#more-images').length > 0) {
        setupMoreImages();
    }

    $('#show-sizes').click(function () {
        $('#sizing-chart-dialog').lightbox('open');
    });

    //check on first load if variant in stock
    if ($('option:selected', $(this)).attr('data-stockmessage') == "In Stock")
    { $('#variant-not-in-stock').hide(); }
    else
    { $('#variant-not-in-stock').show(); }

    $('#variant-selector').change(function () {
        var stock = $('option:selected', $(this)).attr('data-stockmessage');

        $('#stocktext').text(stock);
        if (stock == "In Stock") {
            $('#product-stock-status').text(stock);
            $('#product-stock-status').removeClass("importantRed");
            $("#stocktext").removeClass("stockBackOrdered").addClass("stockInStock");
            $('#variant-not-in-stock').hide();
        }
        if (stock == "Backordered") {
            $('#product-stock-status').text(stock + " - Ships " + $('#variant-selector').attr('data-backorderdate'));
            $('#product-stock-status').addClass("importantRed");
            $("#stocktext").removeClass("stockInStock").addClass("stockBackOrdered");
            $('#variant-not-in-stock').show();
        }

        $('.add-to-wishlist').attr('variant-id', $('option:selected', $(this)).val());
       
    });

    $('#EmailFriendDialog').lightbox({ width: 790, height: 580, autoOpen: false,
        open: function (event, ui) {
            var productid = $('#EmailFriendDialog').data('productid');
            $('#EmailFriendDialog iframe').attr('src', '/sendtofriend-' + productid + '.aspx');
        }
    });

    $('#PrintDialog').lightbox({ width: 784, height: 661,
        open: function () {
            $('#PrintDialog iframe').attr('src', $('#PrintDialog iframe').attr('data-src'));
        }
    });

    $('.show-review').on('click', function () {
        $('#review-dialog iframe').attr('src', $('#review-dialog iframe').attr('data-src'));
        $('#review-dialog').lightbox('open');
        trackEvent("Write A Review", 1, "Product Reviews");
    });

    $('.open-notify-link').on('click', function () {
        var productId = $('#notify-lightbox iframe').attr('product-id');
        var variantId = "0"

        if ($('#notify-lightbox iframe').attr('variant-id') == "0") {
            variantId = $('#variant-selector').val();
        } else {
            variantId = $('#notify-lightbox iframe').attr('variant-id');
        }

        var url = '/product/notifywheninstock/' + productId + '?variantId=' + variantId;

        $('#notify-lightbox iframe').attr('src', url);
        $('#notify-lightbox').lightbox('open');
    });
  
    $('.add-to-wishlist').on('click', function () {
        var productId = $(this).attr('product-id');
        var variantId = $(this).attr('variant-id');
        var url = '/wishlist.aspx?AddItem=' + productId + '.' + variantId;
        navigateToLocation(url);

    });

    bettertogether.init();
  
});

function setupMoreImages() {
    $('.more-image').click(function () {
        if ($(this).attr('imageindex') != $('#main-image img:visible').attr('data-index')) {
            $('#main-image img:visible').hide();
            $('#main-image img[imageindex="' + $(this).attr('imageindex') + '"]').show();
        }
    });
}

function openImagePopup(url, windowname) {
    OpenBrWindow(url, windowname, 'width=800,height=730,status=no,toolbar=no,menubar=no,location=no,resizable=yes');
}