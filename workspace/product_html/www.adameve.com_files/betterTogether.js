var bettertogether = (function () {

    var rel = phe.config.relBTDiscount;

    return {
        init: function () {
            ensureBetterTogetherPrices(function () {
                setupBetterTogetherButtons();

                $('#variant-selector').bind('change', function (e) {
                    processMainProductVariantChange($('#variant-selector').attr("productId"), $('#variant-selector').val());
                })

                setBetterTogetherPrice();
             },2,1000);
        }
    };

   

    function ensureBetterTogetherPrices(callback, retries, interval) {
   

        if ($(".betterTogetherItem").length == 0) {
            if(retries>0)
                setTimeout(function () {
                    var retr = retries - 1;
                    ensureBetterTogetherPrices(callback, retr, interval);
                }, interval);
            return;
        }

        if (!rel) {
            callback();
            return;
        }

        var visited = {};
        var data = [];
        $(".betterTogetherItem").each(function () {
            if (!visited[$(this).attr("productid")]) {
                if (!$(this).attr("btPrice")) {
                    data.push({ productID: $(this).attr("productid"), variantID: $(this).attr("variantid") });
                }
                visited[$(this).attr("productid")] = true;
            }
            else {
                //remove this item, it is duplicate
                $(this).closest("div").remove();
                $("div[bettertogetherproductid=\"" + $(this).attr("productid") + "\"]").not(":first").remove();
            }
        });
        if (data.length > 0) {

            var url = "/Product/GetBetterTogetherPrices";
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                     for (var i in data) {
                        var elem = $(".betterTogetherItem[productid=\"" + data[i].productID + "\"]");
                        elem.attr("btPrice", data[i].btPrice).attr("price", data[i].price).attr("saleprice", data[i].salePrice);

                        var current = elem.parent().find(".betterTogetherPrice").addClass("singlePricing");
                        current.text("$"+ data[i].salePrice.toString());
                        if (data[i].salePrice < data[i].price) {
                            current.addClass("betterTogetherItemRed");
                            current.before("<span class='singlePricing betterTogetherPrice' style='text-decoration:line-through'>$" + data[i].price.toFixed(2) + "</span>&nbsp;");
                        }
                        var classRed = "";
                        if (data[i].btPrice < data[i].price) {
                            classRed = "betterTogetherItemRed";
                            current.after("<span class='btPricing betterTogetherPrice' style='text-decoration:line-through'>$" + data[i].price.toFixed(2) + "</span>");
                            current = current.next();
                        }
                        current.after("&nbsp;<span class=\" betterTogetherPrice " + classRed + " btPricing\">$" + data[i].btPrice.toFixed(2) + "</span>");
 

                    };
                    callback();
                }

            });
        }
        else {
            callback();
        }
    }

    function processMainProductVariantChange(pid, vid) {

        if (window.rrconfig) {
            $(".betterTogetherItem[productid=\"" + pid + "\"]").attr("variantid", vid);
            return;
        }
   
        var data = {
            productID: pid,
            variantID: vid
        };
        var url = "/Product/GetProductVariant";
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#product-buytogether').html('');
                $('#product-buytogether').html($(data).filter('#product-buytogether').html());
                setBetterTogetherPrice();
                setupBetterTogetherButtons();
            }
        });
    }

    function setupBetterTogetherButtons() {
        $('.phe-ui-bettertogether').bind("click", function (e) {
            processBetterTogether();
        });

        $('.betterTogetherItem').live("change", function (e) {
            setBetterTogetherPrice($(this));
        });

        $('.phe-ui-bettertogether-wishlist').bind("click", function (e) {
            processBetterTogetherWishList();
        });
    }

    function setBetterTogetherPrice() {
        var totalPrice = 0;
        var totalSalePrice = 0;
        var productid;
        var priceAttrName = ($('.betterTogetherItem:checked').length > 1 && rel) ? "btPrice" : "salePrice";
        $('.betterTogetherItem').each(function () {
            var productid = $(this).attr('productid');
            if ($(this).is(':checked')) {
                totalPrice = totalPrice + parseFloat($(this).attr('price'));
                totalPrice = (Math.round(totalPrice * Math.pow(10, 2)) / Math.pow(10, 2));

                totalSalePrice = totalSalePrice + parseFloat($(this).attr(priceAttrName));
                totalSalePrice = (Math.round(totalSalePrice * Math.pow(10, 2)) / Math.pow(10, 2))

                $('div[betterTogetherProductid=' + productid + ']').show();
                $(this).parent().removeClass('betterTogetherItemDescGrey');

                if ($(this).parent().find('.betterTogetherItemLightRed').length > 0) {
                    $(this).parent().find('.betterTogetherItemLightRed').removeClass('betterTogetherItemLightRed').addClass('betterTogetherItemRed')
                }
            }
            else {
                $('div[betterTogetherProductid=' + productid + ']').hide();
                $(this).parent().addClass('betterTogetherItemDescGrey');

                if ($(this).parent().find('.betterTogetherItemRed').length > 0) {
                    $(this).parent().find('.betterTogetherItemRed').removeClass('betterTogetherItemRed').addClass('betterTogetherItemLightRed')
                }
            }
        });

        if (totalSalePrice < totalPrice) {
            $('#totalBetterTogetherSalePrice').text('$' + totalSalePrice.toFixed(2));
            $('#totalBetterTogetherPrice').text('$' + totalPrice.toFixed(2)).css({ 'text-decoration': 'line-through', 'margin-right': '5px' }).after($('#totalBetterTogetherSalePrice'));
            $('#totalBetterTogetherSalePrice').addClass('price-red');
            $('#totalBetterTogetherPrice').show();
            $('#betterTogetherYouSave').text('You Save: $' + (totalPrice - totalSalePrice).toFixed(2));
            $('#betterTogetherYouSave').show();
        }
        else {
            $('#totalBetterTogetherSalePrice').text('$' + totalSalePrice.toFixed(2));
            $('#totalBetterTogetherPrice').hide()
            $('#totalBetterTogetherSalePrice').removeClass('price-red')
            $('#betterTogetherYouSave').hide();
        }

        var visibleItems = $('.betterTogetherImage').filter(':visible').length;

        $('#betterTogetherPriceText').text(getPriceText(visibleItems));

        var currentlySelectedCount = $('.betterTogetherItem:checked').length;
        if (currentlySelectedCount > 1) {
            $('.btPricing').show();
            $('.singlePricing').hide();
        }
        else {
            $('.betterTogetherItem').each(function () {
                if ($(this).is(':checked') || currentlySelectedCount==0) {
                    $(this).parent().find('.btPricing').hide();
                    $(this).parent().find('.singlePricing').show();
                   
                }
                else {
                    $(this).parent().find('.btPricing').show();
                    $(this).parent().find('.singlePricing').hide();
                }
            });
        }

        setBetterTogetherPlusImage();
    }

    function getPriceText(count) {
        var priceText = "Price";

        if (count > 1) { priceText += " for "; }

        return (priceText + getQuantityText(count).toLowerCase());
    }

    function getQuantityText(count) {
        var txt = "";

        if (count == 2) { txt = "Both" }
        else if (count > 2) {
            txt = "All";
            if (count == 3) txt += " Three";
            if (count == 4) txt += " Four";
            if (count == 5) txt += " Five";
            if (count == 6) txt += " Six";            
        }

        return txt;
    }

    function setBetterTogetherPlusImage() {
        var visibleItems = $('.betterTogetherImage').filter(':visible').length;
        var indexPos = 0

        $('.betterTogetherImage').each(function () {
            if ($(this).is(':visible') && indexPos < visibleItems - 1) {

                $(this).find('.betterTogetherPlusImage').html($('#betterTogetherPlusImage').html());

                if (indexPos == 0) {
                    $(this).find('.betterTogetherItemImage').removeAttr('onclick');
                    $(this).find('.betterTogetherItemImage').removeAttr('style');
                }

                indexPos = indexPos + 1
            }
            else {
                $(this).find('.betterTogetherPlusImage').html('');
            }
        });

        if (visibleItems > 0) {
            $('.add-to-wishlist.betterTogether').show();
            $('.phe-ui-bettertogether').show();
        }
        else {
            $('.add-to-wishlist.betterTogether').hide();
            $('.phe-ui-bettertogether').hide();
        }

        if (visibleItems >= 5) {
            visibleItems = 5
        }

        $('.phe-ui-bettertogether').removeClass().addClass('phe-ui-bettertogether').addClass('add-to-cart-' + visibleItems)
        $('.phe-ui-bettertogether-wishlist').removeClass().addClass('phe-ui-bettertogether-wishlist').addClass('add-to-wishlist-' + visibleItems)

        if (visibleItems > 0 && $('#product-buytogether').attr('data-cssbuttons') == "true")
        {
            $('.phe-ui-bettertogether').addClass('btn-nonimage').addClass('btn-add-to-cart');
            $('.phe-ui-bettertogether-wishlist').addClass('btn-nonimage').addClass('btn-add-to-wishlist');
            $('.phe-ui-bettertogether .btn-text').text('Add ' + getQuantityText(visibleItems) + ' to Cart');
            $('.phe-ui-bettertogether-wishlist .btn-text').text('Add ' + getQuantityText(visibleItems) + ' to Wishlist');
        }

    }

    function processBetterTogether() {
        var ProductID;
        var VariantID;
        var SpecialItemType = $('.buy_together_items').attr('itemtype');
        var UniqueID= rel ? generateUniqueId() : undefined;
  
        $('.betterTogetherItem').each(function () {
            if ($(this).is(':checked')) {
                ProductID = $(this).attr('productid');
                VariantID = $(this).attr('variantid');
                addItemToMiniCart(ProductID, VariantID, SpecialItemType,null,null,UniqueID);
            }
        });

        eval('doUpdateMiniCart()');
    }

    function processBetterTogetherWishList() {
        var ProductID;
        var VariantID;
        var wishList = "";
        $('.betterTogetherItem').each(function () {
            if ($(this).is(':checked')) {
                ProductID = $(this).attr('productid');
                VariantID = $(this).attr('variantid');
                wishList = wishList + ProductID + "." + VariantID + ";"
            }
        });

        navigateToLocation("/wishlist.aspx?addItem=" + wishList);
    }


    function setupBetterTogetherButtons() {
        $('.mainProductVariant').attr('variantid', $('#variant-selector').val());

        $('.phe-ui-bettertogether').bind("click", function (e) {
            processBetterTogether();
        });

        $('.betterTogetherItem').live("change", function (e) {
            setBetterTogetherPrice($(this));
        });

        $('.phe-ui-bettertogether-wishlist').bind("click", function (e) {
            processBetterTogetherWishList();
        });
    }




})();
