(function (_4TellBoost, $, undefined) {
    _4TellBoost.CONFIG = {
        SiteInfo: {
            baseURL: "www.bikeahead.com",
            alias: "BikeAhea",
            GA_UA: "UA-19896554-1",
            platform: "4TellVs.js",
            addCartBtnAtts: "a>Add to Cart</a",
            //addCartBtnAtts: "img class='vCSS_input_addtocart' alt='Add to Cart'",
            //addCartImage: "/v/vspfiles/templates/bikeahead/images/buttons/btn_addtocart.gif",
            spacerImage: "/v/vspfiles/templates/bikeahead/images/clear1x1.gif",
            emptyImage: "/v/vspfiles/templates/bikeahead/images/nophoto.gif",
            pricePrefix: "Our Price: ",
            salePricePrefix: "On Sale: ",
            includeBase: false,
            siteEnable: true
        },
        PageSettings: {
            Home: {
                tout1: {
                    enable: false
                }
            },
            ProductDetail: {
                tout1: {
                    enable: true,
                    resultType: "0,3",
                    numItems: "2,1",
                    caption: "More Ideas...",
                    captionStyle: "product4TCaption product4TCaptionPD1",
                    productStyle: "product4T product4TPD1",
                    divSelect: "table.colors_lines_light",
                    divPosition: "replace",
                    showRatings: true,
                    maxImageHeight: 100,
                    wrapper: "<div class='PD14T'></div>",
                    rawJS: {
                        preInit: function (tout) {
                            if (!$(tout.divSelect) || $(tout.divSelect).length < 1) {
                                $("#v65-product-parent + table td:first").after("<td width='5'></td><td><img src='/v/vspfiles/templates/bikeahead/images/clear1x1.gif' width='17' height='17'><table class='colors_lines_light'></table></td>")
                            }
                        }
                    },
                    inCart: false
                },
                tout2: {
                    enable: false,
                    resultType: 3,
                    numItems: 4,
                    caption: "Similar Items",
                    productStyle: "product4T product4TPD2",
                    divSelect: "#second4TellContainer",
                    divPosition: "append",
                    setHeight: true,
                    setWidth: false,
                    imageSize: "&maxx=120&maxy=120",
                    maxImageHeight: 120,
                    showRatings: true,
                    wrapper: "",
                    inCart: false
                }
            },
            Search: {
                tout1: {
                    enable: false
                }
            },
            Category: {
                tout1: {
                    enable: false,
                    resultType: 5,
                    numItems: 4,
                    caption: "More ideas...",
                    productStyle: "product4T product4TCat",
                    divSelect: "#main4TellContainer",
                    divPosition: "append",
                    setHeight: false,
                    setWidth: false,
                    imageSize: "&maxx=100&maxy=100",
                    maxImageHeight: 100,
                    showRatings: true,
                    wrapper: "",
                    inCart: false
                }
            },
            AddToCart: {
                tout1: {
                    enable: true,
                    resultType: 0,
                    numItems: 12,
                    caption: "You may also like...",
                    productStyle: "product4T product4TVC",
                    divSelect: "table#v65-cart-checkout-parent td:first",
                    divPosition: "replace",
                    carousel: {
                        numVis: 3,
                        circular: true
                    },
                    maxImageHeight: 100,
                    showRatings: true,
                    wrapper: "<td id='td4Tell' valign='top'></td>",
                    inCart: true
                }
            }
        }
    }
}(window._4TellBoost = window._4TellBoost || {}, jQuery));