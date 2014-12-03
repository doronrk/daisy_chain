//General 4-Tell plug-in code for all sites
//	NOTE: Do not edit this page! These are generic settings.
//		All client settings are controlled in a separate config file
//		Contact 4-Tell to make changes (info@4-tell.com)

//Namespace for all 4-Tell code
(function (_4TellBoost, $, undefined) {

    if (_4TellBoost.alias == null) return; //disabled without an alias

    // General 4-Tell Web Service Settings
    _4TellBoost.Service = {
        address: 'live.4-Tell.net/Boost2.0/',
        pageType: 'Auto',
        productList: new Array(),
        productCount: 0,
        cartList: new Array(),
        cartCount: 0,
        blockList: new Array(),
        blockCount: 0,
        customerId: '',
        catId: '',
        called: false,
        platformLoaded: false,
        customLoaded: false,
        lastDivIDs: new Array() //used to make sure the same items are not in both divs
        // ^^ May be obsolete now. Must investigate.
    };

    //Uses json2.js for the JSON parsing.
    _4TellBoost.UserData = {
        data: {
            UID: '', //User ID in cart
            RID: "4T-" + Math.floor(Math.random() * 1000000), //semi-random anonymous ID.
            testGroup: null, //Persistent storage of whether a user's A or B.
            Viewed: new Array(),
            likes: new Array(),
            dislikes: new Array()
        },

        //Separate so they get saved separate from everything else.
        session: {
            sessionTest: null
        },
        cart: new Array(),
        clearCart: function () {
            this.cart = new Array();
        },

        //Used to prune clickstream data for brevity.
        maxNumViewed: 5,

        // Load from cookie.
        load: function () {
            var the_cookie = document.cookie.split(';');
            for (var i = 0; i < the_cookie.length; i++) {
                var x = the_cookie[i].substr(0, the_cookie[i].indexOf("=")).replace(/^\s+|\s+$/g, "");
                var y = the_cookie[i].substr(the_cookie[i].indexOf("=") + 1);
                if (x === "4Tell") {
                    var foo = JSON.parse(unescape(y));
                    //To filter out bad cookies.
                    if (foo.Viewed && typeof (foo.Viewed) === "object")
                        this.data = foo;
                } else if (x === "4TellSession") {
                    var foo = JSON.parse(unescape(y));
                    if (typeof (foo) === "object")
                        this.session = foo;
                } else if (x === "4TellCart") {
                    var foo = JSON.parse(unescape(y));
                    if (typeof (foo) === "object")
                        this.cart = foo;
                }
            }
            //Block the dislikes when we load them.
            for (i = 0; i < this.data.dislikes.length; i++) {
                _4TellBoost.addBlockItem(this.data.dislikes[i]);
            }

            //Prune viewed data on load.
            var validItems = 0;
            for (i = 0; i < this.data.Viewed.length; i++) {
                var viewedIDs = new Array();
                var index = jQuery.inArray(this.data.Viewed[i], this.data.Viewed)
                if (index === i) {
                    viewedIDs.push(this.data.Viewed[i]);
                    validItems++;
                    if (validItems === _4TellBoost.UserData.maxNumViewed) {
                        this.data.Viewed = viewedIDs;
                        break;
                    }
                }
            }
            _4TellBoost.UserData.setTestGroup();

            return this.data;
        },

        // Save to cookie. Put expires in the past to delete the cookie.
        save: function (expires, path) {
            var x = Array.prototype.toJSON;
            delete Array.prototype.toJSON;
            var d = expires || new Date(2020, 02, 02);
            var p = path || '/';
            document.cookie = '4Tell=' + escape(JSON.stringify(this.data))
                          + ';path=' + p
                          + ';expires=' + d.toUTCString();
            var date = new Date();
            date.setMinutes(date.getMinutes() + 30);
            document.cookie = '4TellSession=' + escape(JSON.stringify(this.session))
                          + ';path=' + p
                          + ';expires=' + date.toUTCString();
            date.setMonth(date.getMonth() + 1);
            document.cookie = '4TellCart=' + escape(JSON.stringify(this.cart))
                          + ';path=' + p
                          + ';expires=' + date.toUTCString();
            if (x) {
                Array.prototype.toJSON = x;
            }
        },

        setTestGroup: function (AorB) {
            if (!_4TellBoost.SiteInfo.ABTesting) return false;
            if (AorB != undefined) {
                //Check for numeric AorB. 0 is a valid setting and also false.
                //It also accepts "0" as a valid input. Bonus. 
                if (!isNaN(AorB))
                    this.data.testGroup = parseInt(AorB);
                    //String, for accepting "A", "b", and "Alpha" as inputs.
                else if (AorB && AorB.length)
                    //Converts ASCII character to number; "A" = 65 in ASCII, so we subtract that to get something useable.
                    this.data.testGroup = AorB.toUpperCase().charCodeAt(0) - 65;
            } else {
                //testGroup has been set and we're persistent
                if (_4TellBoost.UserData.data.testGroup !== null && _4TellBoost.SiteInfo.persistentTesting)
                    this.data.testGroup = this.data.testGroup;
                else {  //Testgroup is unset or we're not persistent
                    this.data.testGroup = (this.session.sessionTest != undefined) ? this.session.sessionTest :
                        Math.floor(_4TellBoost.SiteInfo.ABTesting * Math.random());
                }
            }
            //Bounding, to make sure testGroup is always between 0 and ABTesting.
            this.data.testGroup = Math.max(0, Math.min(_4TellBoost.SiteInfo.ABTesting - 1, this.data.testGroup));
            this.session.sessionTest = this.data.testGroup;

            window._gaq = window._gaq || [];
            window._gaq.push(['_setAccount', _4TellBoost.SiteInfo.GA_UA]);
            window._gaq.push(['_trackEvent', "4Tell" + String.fromCharCode(65 + this.data.testGroup), "4Tell" + String.fromCharCode(65 + this.data.testGroup), null, null, true]);


            this.save();
            return this.data.testGroup;
        }
    };
    //Moved the load-and-save to the bottom of the file, after the functions it uses get defined.

    //Human-readable result and email types. Placed here so everybody can access them.
    _4TellBoost.emailTypes = {
        0: "Order Confirmation", 1: "Order Status",
        2: "Shipping Confirmation", 3: "Order Partiallly Shipped",
        4: "Order RMA", 5: "Order Returned",
        6: "Product Review", 7: "Order Backordered",
        8: "Order Hold", 9: "Order Cancelled",
        10: "Order Status", 11: "Abandoned Cart",
        12: "Email Better Price", 13: "Email Friend",
        14: "Email In Stock", 15: "Gift Certificate",
        16: "Newsletter", 17: "Other",
        18: "Rating Request", 19: "Reorder Notice",
        20: "Welcome Notice", 21: "Daily Deal"
    };
    _4TellBoost.resultTypes = ['Cross-sell', 'Personalized', 'Blended', 'Similar', 'Top-sellers',
        'Category-Top-sellers', 'Manual-Cross-sell', 'Manual-Similar'];

    // Client Settings
    //   This constructor initializes the site structure
    //   See client config files for custom settings
    //
    _4TellBoost.Site = function () {
        this.baseURL = '';
        this.alias = '';
        this.GA_UA = ''; //supplying UA number here will override the tracking type
        this.GATrackID = '4TellRecs';
        this.addCartMethod = '';
        this.addCartImage = '';
        this.spacerImage = '';
        this.emptyImage = _4TellBoost.loadpath + "images/nophoto.gif";
        this.addCartClass = 'addCartClass';
        this.priceClass = '';
        this.strikePriceClass = 'strikePrice';
        this.salePriceClass = '';
        this.pricePrefix = '';
        this.salePricePrefix = '';
        this.showLogo = false;
        this.hideIfNoImage = false;
        this.minPrice = "$.01";
        this.custom = false;
        this.includeBase = false;
        this.delay = false;
        this.ABTesting = false;
        this.persistentTesting = true;

        for (var n in arguments[0]) { this[n] = arguments[0][n]; } //allow passed args to override
    };
    _4TellBoost.SiteInfo = new _4TellBoost.Site();


    // Page Settings
    //   This constructor initializes the tout structures
    //   See client config file for custom settings
    //
    _4TellBoost.ToutSettings = function (toutNumber) {
        var tout = this; //allow inner functions to access this tout's properties

        //TODO: Clean this up. Remove old flags, fold some into rawJS.
        this.id = toutNumber;
        this.enable = false;
        this.showCaption = true;
        this.showImage = true;
        this.showTitle = true;
        this.showPrice = true;
        this.showRatings = false;
        this.showBuyButton = true;
        this.setHeight = false; //calculate and set the height/width
        this.setWidth = false;
        this.maxImageHeight = 0; //fixed height to use in calculations
        this.numRows = 1; //For setting up multi-row touts.
        this.inFrame = false;
        this.resultType = 0; //Cross-sell
        this.carousel = false;
        this.numItems = 1;
        this.startPos = 1;
        this.rotateRecs = false;
        this.fillMode = ''; //'none', 'genomic', or 'topsell'
        this.columns = { productID: "id", title: "nm", price: "pr", salePrice: "sp", rating: "ra", imageLink: "il", pageLink: "pl", resultType: "rt", custom: {} };
        this.divSelect = ''; // if class use '.' -- if id use '#'
        this.divPosition = 'append'; //valid settings are 'append', 'replace', 'above', or 'below'
        this.caption = 'Customers also bought...'; //default caption for cross-sell
        this.captionStyle = 'product4TCaption';
        this.productStyle = 'product4T';
        this.productImageStyle = 'productImage';
        this.productTitleStyle = 'productTitle';
        this.imageQuery = ""; //query parameters appended to thumbnail request
        this.rawJS = {};
        this.wrapper = ''; //formatting html to wrap around the div
        this.outerTable = ''; //Used to control the display of any outer tables around our touts.
        //VV These two ^^ may be obsolete.
        this.quickCart = true; //try to display directly in quickcart if buy button pressed

        this.rotateStartPos = function () {
            var d = new Date();
            tout.startPos = ((d.getDate() * tout.numItems) % (20 - tout.numItems));
        };

        this.getColumns = function () {
            /*[
            "nm" = Name, 
"id" = ProductId, 
"pr" = Price, 
"sp" = SalePrice, 
"lp" = ListPrice, 
"tpr" = TopPrice, 
"tsp" = TopSalePrice, 
"tlp" = TopListPrice, 
"pf" = Profit, 
"ra" = Rating, 
"il" = ImageLink, 
"pl" = PageLink, 
"sc" = StandardCode, 
"ap1" = AltPrice1, 
"ap2" = AltPrice2, 
"ap3" = AltPrice3, 
"ap4" = AltPrice4, 
"ap5" = AltPrice5, 
"ap6" = AltPrice6, 
"ap7" = AltPrice7, 
"ap8" = AltPrice8, 
"ap9" = AltPrice9, 
"ap10" = AltPrice10] */
            var columnsArray = ["id", "pl", "rt"];
            if (this.showPrice) {
                columnsArray.push(this.columns.price, this.columns.salePrice);
            }
            if (this.showImage) {
                columnsArray.push(this.columns.imageLink);
            }
            if (this.showTitle) {
                columnsArray.push(this.columns.title);
            }
            if (this.showRatings) {
                columnsArray.push(this.columns.rating);
            }
            if (this.columns.custom != null) {
                for (var o in this.columns.custom) {
                    columnsArray.push(this.columns.custom[o]);
                }
            }
            return columnsArray;
        };
        // Tout call-back display function
        //   This controls the display of each tout on the page
        //   It is called indirectly by external code
        //
        this.displayDiv = function (items) {
            var validItems = 0;
            try {
                if (!items || !items.length) return; //no results

                // If the data is passed in then proceed
                //IE7 is incompatible with carousel
                if (navigator.userAgent.match(/MSIE 7.0/) && tout.carousel) {
                    tout.numItems = tout.carousel.numVis;
                    tout.carousel = false;
                }

                //We've added the ability to have comma-separated lists for numItems. Unfortunately,
                //this doesn't play well with the places that expect a single int.
                //Here, we sum it all up to get a single int.
                var accumulator = 0;
                var trashArray = tout.numItems.toString().match(/\d+/g);
                for (var i = 0; i < trashArray.length; i++)
                    accumulator += parseInt(trashArray[i])
                tout.numItems = accumulator;

                //Want to avoid unfilled carousels.
                //This should go below the main .each function, but I'm lazy and this is easier for all involved.
                if (tout.carousel && items.length < tout.numItems) {
                    tout.carousel.circular = false;
                }

                var lastDivLoaded = false;
                if (_4TellBoost.Service.lastDivIDs.length > 0) lastDivLoaded = true;

                //set the main container
                var this4TellContainer = '';
                var locations = $(tout.divSelect);
                if (!locations || !(locations.length))
                    return; //unable to locate div

                //get the last match if more than one
                var location = null;
                $.each(locations, function () {
                    location = $(this);
                });
                if (tout.divPosition === 'append')
                    this4TellContainer = location;
                else
                    this4TellContainer = $("<div class='FourTellContainer'></div>");

                //set the caption
                var thisCaption = '';
                if (tout.showCaption) {
                    if (navigator.appName === 'Microsoft Internet Explorer')  //special handling for IE
                        thisCaption = $("<div class='" + tout.captionStyle + " product4TCaptionIE'>" + tout.caption + "</div>");
                    else
                        thisCaption = $("<div class='" + tout.captionStyle + "'>" + tout.caption + "</div>");
                    thisCaption.appendTo(this4TellContainer);
                }



                var frameTarget = '';
                if (tout.inFrame) frameTarget = "target='_parent' ";

                //var siteProtocol = ('https:' === document.location.protocol) ? 'https://' : 'http://';
                //var siteBase = siteProtocol + _4TellBoost.SiteInfo.baseURL + '/';
                var spacerImg = '';
                if (_4TellBoost.SiteInfo.includeBase)
                    spacerImg = '//' + _4TellBoost.SiteInfo.baseURL + '/';
                spacerImg += _4TellBoost.SiteInfo.spacerImage;

                //items container
                var itemDiv = $('<div></div>');
                //inner container; the carousel scrolls on a div-by-div basis.
                var innerDiv = $('<div class="scrollGroup"></div>');

                //Do whatever pre-display nonsense we need to.
                if (typeof (tout.rawJS.preDisplay) === "function")
                    tout.rawJS.preDisplay(tout);

                var columnOrder = this.getColumns();
                var columnMap = this.columns;
                for (var prop in this.columns.custom) {
                    columnMap[prop] = this.columns.custom[prop];
                }
                // Loop through each product
                $.each(items, function (i, itemdata) {

                    if ((validItems >= tout.numItems) && !_4TellBoost.SiteInfo.hideIfNoImage) return false; //finished
                    if ((validItems >= tout.numItems + 3) && _4TellBoost.SiteInfo.hideIfNoImage) return false; //finished
                    //The whole hideIfNoImage business kind of breaks down on carousels.

                    //Empty array.
                    if (!itemdata || !itemdata.length) return true;

                    //Mapping the array of strings we get from the service to an object we can use.
                    var mappedData = {};
                    for (var j = 0; j < itemdata.length; j++) {
                        mappedData[columnOrder[j]] = itemdata[j];
                    }
                    for (var prop in columnMap) {
                        if (mappedData[columnMap[prop]] !== undefined) {
                            itemdata[prop] = mappedData[columnMap[prop]];
                        }
                    }

                    if (lastDivLoaded) {
                        var found = false;
                        for (var q = 0; q < _4TellBoost.Service.lastDivIDs.length; q++) {
                            if (_4TellBoost.Service.lastDivIDs[q] === itemdata.productID) {
                                found = true;
                                break;
                            }
                        }
                        if (found)
                            return true; //skip this item
                    }
                    else if (validItems < tout.numItems)
                        _4TellBoost.Service.lastDivIDs[validItems] = itemdata.productID;
                    validItems++;

                    if (typeof (tout.rawJS.perProduct) === "function")
                        tout.rawJS.perProduct(itemdata);

                    // This is the main product container
                    var prod = $("<div class='" + tout.productStyle + "' />");

                    //Extra in case one or more products have no image.
                    if (validItems > tout.numItems) prod.css("display", "none");

                    //construct page link
                    var pageLink = '';
                    if (_4TellBoost.SiteInfo.includeBase)
                        pageLink = 'http://' + _4TellBoost.SiteInfo.baseURL;
                    pageLink += itemdata.pageLink;
                    pageLink = pageLink.replace("https:", "http:"); //link to PDP should not be https

                    //setup onclick string
                    var itemType = _4TellBoost.resultTypes[itemdata.resultType] || itemdata.resultType;
                    var trackFunc = 'onclick="_4TellBoost.TrackClick(' + "'" + _4TellBoost.Service.pageType + "-" + itemType + "','" + itemdata.productID +
                        "','" + itemdata.pageLink + "');return false;" + '"';

                    //product image
                    if (tout.showImage) {
                        // A wrapper for the image allows better size and position control
                        var prodImage = _4TellBoost.getProdImg(tout, itemdata);
                        prodImage.appendTo(prod);
                    }

                    //product title
                    if (tout.showTitle) {
                        if (navigator.appName === 'Microsoft Internet Explorer')  //special handling for IE
                            var prodTitle = $("<div class='" + tout.productTitleStyle + " productTitleIE'>"
                                                + itemdata.title + "</div>");
                        else
                            var prodTitle = $("<div class='" + tout.productTitleStyle + "'>"
                                                + itemdata.title + "</div>");
                        prodTitle.appendTo(prod);
                        prodTitle.wrap("<a class='home' href='" + pageLink + "' " + frameTarget
                                            + trackFunc + ' ></a>');
                    }

                    //product price
                    if (tout.showPrice) {
                        var priceClass = '';
                        itemdata.price = (itemdata.price > _4TellBoost.SiteInfo.minPrice) ? itemdata.price : "--";
                        var price = price = _4TellBoost.SiteInfo.pricePrefix + itemdata.price;
                        var salePrice = '';
                        if ((itemdata.salePrice)
                            && (itemdata.salePrice !== "$0.00")
                            && (itemdata.salePrice !== "$-1.00")
                            && (itemdata.salePrice !== itemdata.price)) {
                            //strike out the full price and add the sale price
                            priceClass = _4TellBoost.SiteInfo.strikePriceClass;
                            salePrice = _4TellBoost.SiteInfo.salePricePrefix + itemdata.salePrice;
                        }
                        else {
                            priceClass = _4TellBoost.SiteInfo.priceClass;
                            salePrice = '&nbsp';
                        }
                        $("<div class='" + priceClass + " productPrice'>" + price
                            + "</div>").appendTo(prod);
                        $("<div class='" + _4TellBoost.SiteInfo.salePriceClass
                            + " productSalePrice'>" + salePrice + "</div>").appendTo(prod);
                    }

                    //product ratings
                    if (tout.showRatings && itemdata.rating && (itemdata.rating !== "-1.0")
                            && (itemdata.rating !== "NoEntry")) {
                        var rating = _4TellBoost.getRatingImage(itemdata.rating);
                        rating.appendTo(prod);

                    }

                    // buy-now button (add to cart)
                    if (tout.showBuyButton) {
                        var buyWrapper = _4TellBoost.getBuyBtn(tout, itemdata);
                        buyWrapper.appendTo(prod);
                    }

                    // Insert the product into the main product container
                    if (!tout.carousel) {
                        prod.appendTo(itemDiv);
                    } else if (_4TellBoost.SiteInfo.hideIfNoImage && (validItems > tout.numItems)) {
                        prod.appendTo(this4TellContainer);
                        //Buffer for the hideIfNoImage system.
                    } else {
                        prod.appendTo(innerDiv);
                        //do it like this to avoid fenceposts and an initial empty div.
                        if ((innerDiv[0].children.length === (tout.carousel.numVis * tout.numRows)) //innerDiv is full
                                || (i === (items.length - 1))) { //or it's the last item
                            //add filled div to the scrolling div
                            innerDiv.appendTo(itemDiv);
                            //create new div to fill.
                            innerDiv = $('<div class="scrollGroup"></div>');
                        }
                    }

                });

                if (validItems < 1) {
                    this4TellContainer.remove();
                    return;
                }

                //Ensures an element is only displayed if our touts are.
                if ((tout.outerTable) && ($(tout.outerTable).length))
                    $(tout.outerTable).css("display", "");

                //give the items div a unique id name for css
                itemDiv.attr('id', _4TellBoost.Service.pageType + "ItemWrapper" + tout.id);

                //Display the tout (needed before any size calculations are made)
                itemDiv.appendTo(this4TellContainer);
                if (tout.divPosition === 'below')
                    this4TellContainer.insertAfter(location);
                else if (tout.divPosition === 'above')
                    this4TellContainer.insertBefore(location);
                else if (tout.divPosition === 'replace') {
                    this4TellContainer.insertBefore(location);
                    location.remove();
                }
                if (tout.wrapper.length)
                    this4TellContainer.wrap(tout.wrapper);

                //calculate heights and widths
                if (tout.carousel) {
                    itemDiv.children().wrapAll("<div class='items' />");

                    //Default. Now that dynamic dimensions are in place, we don't always need scrollable2
                    //If we're going to use a style element for the dimensioning, we may need different styles after all.
                    tout.carousel.scrollStyle = tout.carousel.scrollStyle || "scrollable";

                    //add prev arrow before (check orientation)
                    //add next arrow after (check orientation)
                    //wrap items with scrollable div
                    if (tout.orientation === 'vertical' && false) {
                        itemDiv.before('<a class="prev browse up"></a>');
                        itemDiv.after('<a class="next browse down"></a>');
                        itemDiv.wrap('<div class="' + tout.carousel.scrollStyle + '" />');
                        itemDiv.parent().scrollable({ vertical: true });
                    } else {
                        itemDiv.before('<a class="prev browse left"></a>');
                        itemDiv.after('<a class="next browse right"></a>');
                        itemDiv.addClass(tout.carousel.scrollStyle);
                        itemDiv.scrollable({ circular: tout.carousel.circular });
                    }

                    //one of these days I need to combine these two, reduce the amount of repeated work.
                    if (tout.carousel.numVis >= 1) {
                        var prodDivs = itemDiv.find(".product4T"); //should get product divs
                        var maxHeight = 0;
                        var totalHeight = 0;
                        var maxWidth = 0;
                        $.each(prodDivs, function () {
                            //Find height
                            var thisHeight = $(this).outerHeight(true);
                            var imgHeight = $(this).find('.productImage').outerHeight(false);
                            if (imgHeight < tout.maxImageHeight)
                                thisHeight += (tout.maxImageHeight - imgHeight);
                            //have to add max image height since they may not be loaded yet
                            if (thisHeight > maxHeight) {
                                maxHeight = thisHeight;
                            }
                            totalHeight = maxHeight + 10;

                            //Find width.
                            var thisWidth = $(this).outerWidth(true);
                            if (thisWidth > maxWidth) maxWidth = thisWidth;
                        });
                        //Allowing for multiple rows.
                        totalHeight *= tout.numRows;
                        var grpWdth = tout.carousel.numVis * maxWidth;

                        var css = '#XXX , #XXX .scrollGroup { width:' + grpWdth + 'px;height:' + totalHeight + 'px; }',
                            head = document.getElementsByTagName('head')[0],
                            style = document.createElement('style');
                        css = css.replace(/XXX/gi, itemDiv.attr("id"));
                        style.type = 'text/css';
                        if (style.styleSheet) {
                            style.styleSheet.cssText = css;
                        } else {
                            style.appendChild(document.createTextNode(css));
                        }
                        head.appendChild(style);
                        //Allow for more than one thing in a grouping div.
                    }
                }//End carousel code
                else {
                    //calculate and set desired overall itemDiv height and/or width
                    if (tout.setHeight) {
                        var maxHeight = 0;
                        var totalHeight = 0;
                        var prodDivs = itemDiv.children();
                        $.each(prodDivs, function () {
                            var includeMargin = (tout.orientation === 'vertical');
                            var thisHeight = $(this).outerHeight(true);
                            var imgHeight = $(this).find('.productImage').outerHeight(false);
                            if (imgHeight < tout.maxImageHeight)
                                thisHeight += (tout.maxImageHeight - imgHeight);
                            //have to add max image height since they may not be loaded yet
                            if (thisHeight > maxHeight) {
                                maxHeight = thisHeight;
                            }
                            if (tout.orientation === 'vertical') totalHeight += thisHeight;
                            else totalHeight = maxHeight + 10;
                        });
                        itemDiv.height(totalHeight);
                    }
                    if (tout.setWidth) {
                        var maxWidth = 0;
                        var totalWidth = 0;
                        var prodDivs = itemDiv.children();
                        $.each(prodDivs, function () {
                            var thisWidth = $(this).outerWidth(true);
                            if (thisWidth > maxWidth) maxWidth = thisWidth;
                            if (tout.orientation === 'vertical') totalWidth = maxWidth;
                            else totalWidth += thisWidth;
                        });
                        itemDiv.width(totalWidth);
                    }
                    if (tout.orientation === 'horizontal') //if horizontal then hide extra items
                        itemDiv.css('overflow', 'hidden');
                }
                setTimeout(function () {
                    if (typeof (jQuery().jail) != "undefined") {
                        if (tout.carousel) {
                            itemDiv.find("img.productImageImg").jail({
                                offset: grpWdth, placeholder: _4TellBoost.loadpath + 'images/grey.gif', event: "scroll"
                            });

                            jQuery(".scrollable").bind("onSeek", function () {
                                jQuery(".scrollable").trigger("scroll");
                            });
                        } else {
                            itemDiv.find("img.productImageImg").jail({
                                offset: grpWdth, placeholder: _4TellBoost.loadpath + 'images/grey.gif', loadHiddenImages: true
                            });
                        }
                        setTimeout(function () {
                            jQuery("img.productImageImg").each(function () {
                                this.src = this.getAttribute("data-src") || this.src;
                                this.removeAttribute("data-src");
                            });
                        }, 3000);
                    } else {
                        jQuery("img.productImageImg").each(function () {
                            this.src = this.getAttribute("data-src") || this.src;
                            this.removeAttribute("data-src");
                        });
                    }
                }, 100);


            } catch (ex) { }
        };
    };

    //Array of touts; allows for an arbitrarily large number of touts.
    _4TellBoost.Touts = [];

    _4TellBoost.getRatingImage = function (rating) { }; //placeholder...defined by cart specific settings
    _4TellBoost.detectCartPage = function () { }; //placeholder...defined by cart specific settings

    // Page Settings
    _4TellBoost.getPageSettings = function (pageType) {
        //   The following section initializes default tout settings.
        var inCart = false;
        if (pageType === 'Auto') {
            _4TellBoost.detectCartPage();
            pageType = _4TellBoost.Service.pageType;
        }

        // page-specific settings are stored in the Client CONFIG objects
        // Any settings not specified there will use the default values listed above
        if (_4TellBoost.CONFIG == null) return false;
        if (_4TellBoost.CONFIG.PageSettings == null) return false;
        if (_4TellBoost.CONFIG.PageSettings[pageType] == null) return false;

        var pageSettings = _4TellBoost.CONFIG.PageSettings[pageType],
        toutID = 0,
        inCart = false;
        for (var tout in pageSettings) {
            if (!pageSettings[tout].enable) continue;

            var config = pageSettings[tout];
            inCart = inCart || config.inCart;

            if (_4TellBoost.SiteInfo.ABTesting && config.testGroup) {
                var ABtout = config.testGroup[_4TellBoost.UserData.data.testGroup];
                $.extend(config, ABtout);
            }
            if (config != null) {
                config = $.extend(new _4TellBoost.ToutSettings(++toutID), config);
            }
            if (typeof (config.rawJS.preInit) === "function")
                config.rawJS.preInit(config);

            if (config.enable)
                _4TellBoost.Touts.push(config);
        }

        return inCart;
    }

    // getServiceResults:
    //   This function sets the parameters to pass to the 4-Tell Boost web service to retrieve
    //   recommended product data. This function is called by get4TellRecommendations above
    //
    function getServiceResults(toutList, productIDs, cartIDs, blockIDs, viewedIDs, numResults) {
        var operation = 'rest/GetRecColumns';
        var customerID = _4TellBoost.getCustomerID();
        //We've consolidated the service calls for all touts into this one,
        //so everything gets a comma-separated list.
        var numResults = [],
            resultType = [],
            startPos = [],
            fillMode = [],
            columns = _4TellBoost.Touts[0].getColumns().join();

        for (var i = 0; i < _4TellBoost.Touts.length; ++i) {
            var tout = _4TellBoost.Touts[i];
            numResults.push(tout.numItems);
            startPos.push(tout.startPos);
            resultType.push(tout.resultType);
            fillMode.push(tout.fillMode);
        }


        // Assemble the url to call
        var query = '?clientAlias=' + _4TellBoost.SiteInfo.alias
                                + '&productIDs=' + productIDs
                                + '&cartIDs=' + cartIDs
                                + '&blockIDs=' + blockIDs
                                + '&att1IDs=' + _4TellBoost.Service.catId
                                + '&customerID=' + customerID
                                + '&pagetype=' + _4TellBoost.getPageType()
                                + '&numResults=' + numResults.join()
                                + '&startPosition=' + startPos.join()
                                + '&resultType=' + resultType.join()
                                + '&clickStreamIDs=' + viewedIDs
                                + '&fillMode=' + fillMode.join()
                                + "&columns=" + columns
                                + '&callback=_4TellBoost.displayCombinedTouts'
                                + '&format=json';
        _4TellBoost.call4TellRest(operation, query);
    };

    // call4TellRest:
    //   This function is a rest helper to form calls to the 4-Tell Boost web service
    //
    _4TellBoost.call4TellRest = function (operation, query) {
        var jsonUrl = _4TellBoost.Service.address + operation + encodeURI(query);

        // Call the service, passing the results to the callback function
        (function () {
            var forTell = document.createElement('script'); forTell.type = 'text/javascript'; forTell.async = true;
            forTell.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + jsonUrl;
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(forTell, s);
        })();
    };

    // call4TellRest:
    //   This function is a rest helper to form calls to the 4-Tell Boost web service
    //
    _4TellBoost.call4TellRest = function (operation, query) {
        var jsonUrl = _4TellBoost.Service.address + operation + encodeURI(query);

        // Call the service, passing the results to the callback function
        (function () {
            var forTell = document.createElement('script'); forTell.type = 'text/javascript'; forTell.async = true;
            forTell.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + jsonUrl;
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(forTell, s);
        })();
    };

    _4TellBoost.displayCombinedTouts = function (data) {
        if (data) {
            if ((String(data).length < 5) || (String(data).substring(0, 5) === 'Error')) return;

            //get the items array
            //var items = data['GetRecDisplayListResult'];
            var items = data['GetRecColumnsResult'];
            if (!items || !items.length) return; //no results
            //Slice things off for the individual touts to display.
            var previouslyUsed = 0;
            for (var i = 0; i < _4TellBoost.Touts.length; ++i) {
                var numResults = 0;
                var numItems = _4TellBoost.Touts[i].numItems.toString().match(/\d+/g);
                for (var j = 0; j < numItems.length; j++)
                    numResults += parseInt(numItems[j]);
                var results = items.slice(previouslyUsed, previouslyUsed + numResults);
                if (_4TellBoost.Touts[i].enable && results.length) {
                    _4TellBoost.Touts[i].displayDiv(results);
                }
                previouslyUsed += numResults;
            }
        }

    };
    //External Functions

    //Delay Handling (to allow rec call to occur after a page element finishes loading
    //Can also be repurposed for other calls.
    _4TellBoost.DelayHandler = {
        selector: null,
        element: null,
        toutDiv: null,
        callback: null,
        params: null,
        lastContents: "",
        started: false,
        delayStart: true,
        ended: false
    };

    _4TellBoost.delayUntilLoaded = function (element) {
        var selectedElement = $(element);
        if (selectedElement && selectedElement.length) {
            _4TellBoost.DelayHandler.element = selectedElement;
            _4TellBoost.DelayHandler.lastContents = _4TellBoost.DelayHandler.element.html();
        }
        else
            _4TellBoost.DelayHandler.selector = element;
        if (!_4TellBoost.DelayHandler.delayStart) _4TellBoost.DelayHandler.started = true;

        setInterval(function () {
            if (_4TellBoost.DelayHandler.ended) return; //completed
            if (!_4TellBoost.DelayHandler.element || !_4TellBoost.DelayHandler.element.length) { //selection not found yet
                var selectedElement = $(_4TellBoost.DelayHandler.selector);
                if (!selectedElement || !selectedElement.length)
                    return; //still not found --wait and try again
                _4TellBoost.DelayHandler.element = selectedElement;
                _4TellBoost.DelayHandler.started = true;
            }
            var newContents = _4TellBoost.DelayHandler.element.html();
            if (_4TellBoost.DelayHandler.lastContents != newContents) { //change detected
                if (!_4TellBoost.DelayHandler.started) _4TellBoost.DelayHandler.started = true;
                _4TellBoost.DelayHandler.lastContents = newContents;
            }
            else {
                if (!_4TellBoost.DelayHandler.started) return; //still waiting
                _4TellBoost.DelayHandler.ended = true; //changes completed
                if (_4TellBoost.DelayHandler.callback)
                    _4TellBoost.DelayHandler.callback.call();
                if (_4TellBoost.DelayHandler.ended) {
                    var params = _4TellBoost.DelayHandler.params;
                    _4TellBoost.completeRecCall(params.pageType, params.productIDs, params.inCart);
                }
            }

        }, 100); //check every 100ms
    }

    // getRecommendations:
    //   This function sets the number and type of recommendations based on the type of page
    //   where they will be displayed. Page specific settings are defined in client config file.
    //
    _4TellBoost.getRecommendations = function (pageType, productIDs) {
        if (!_4TellBoost.SiteInfo.siteEnable) return; //recommendations disabled
        if (_4TellBoost.Service.called) return; //Already called
        _4TellBoost.Service.called = true;

        // Page type can be passed in the call or pre-loaded into the global setting
        if (pageType === 'Auto')
            pageType = _4TellBoost.Service.pageType; //set by _4TellBoost.setPageType

        //get rid of invalid id label like [catalog_ids]
        if (productIDs.indexOf('[') > 0) productIDs = "";

        //get page specific tout settings (see above)
        var inCart = false;
        inCart = _4TellBoost.getPageSettings(pageType);

        var enabled = false;
        for (var i = 0; i < _4TellBoost.Touts.length; ++i) {
            enabled = enabled || _4TellBoost.Touts[i].enable;
        }
        if (!enabled) return; //nothing to do

        if (_4TellBoost.SiteInfo.delay)
            _4TellBoost.DelayHandler.params = { pageType: pageType, productIDs: productIDs, inCart: inCart };
        else
            _4TellBoost.completeRecCall(pageType, productIDs, inCart)
    };

    // completeRecCall:
    //   Function to complete the recommendation call from getRecommendations above.
    //	 this portion is split off so it can be delayed if needed to wait for other page elements to load
    //
    _4TellBoost.completeRecCall = function (pageType, productIDs, inCart) {
        var userID = _4TellBoost.getCustomerID();
        var cartIDs = '';
        var blockIDs = '';
        var viewedIDs = '';

        // Compile the list of product IDs
        // IDs can be sent in the call or pre-loaded into the array
        var pCount = _4TellBoost.Service.productCount;
        if (pCount > 0) {
            if (((pageType === 'Category') || (pageType === 'Search'))
                && (pCount > 4))
                pCount = 4; //only use first 4 items for list results pages

            var firstItem = true;
            if (productIDs !== "") {
                firstItem = false;
            }
            for (var i = 0; i < pCount; i++) {
                if (firstItem) firstItem = false;
                else productIDs += ',';
                productIDs += _4TellBoost.Service.productList[i];
            }
        }

        // Compile the list of cart items
        var cartItems = _4TellBoost.getCartItems();
        if (cartItems.length > 0) {
            var firstItem = true;
            for (var i = 0; i < cartItems.length; i++) {
                if (firstItem) firstItem = false;
                else cartIDs += ',';
                cartIDs += cartItems[i];
            }
        }
        //on cart pages, use cart IDs directly instead of as influencers
        if (inCart && (cartIDs !== '')) {
            if (productIDs !== '')
                productIDs += ',';
            productIDs += cartIDs;
            cartIDs = '';
        }

        // Compile the list of block items
        if (_4TellBoost.Service.blockCount > 0) {
            var firstItem = true;
            for (var i = 0; i < _4TellBoost.Service.blockCount; i++) {
                if (firstItem) firstItem = false;
                else blockIDs += ',';
                blockIDs += _4TellBoost.Service.blockList[i];
            }
        }

        for (var i = 0; i < _4TellBoost.getDislikes().length; i++) {
            blockIDs += ',';
            blockIDs += _4TellBoost.getDislikes()[i];
        }

        //Compile the list of viewed IDs
        var viewedIDs = '';
        var ViewData = _4TellBoost.UserData.data.Viewed.slice(0);
        if (_4TellBoost.Service.pageType === "ProductDetail")
            ViewData = _4TellBoost.UserData.data.Viewed.slice(1);
        //First item in the array is the current PDP.

        if (ViewData.length > 0) {
            var firstItem = true;
            var validItems = 0;
            for (var i = 0; i < ViewData.length; i++) {
                var index = jQuery.inArray(ViewData[i], ViewData)
                if (index === i) {
                    if (firstItem) firstItem = false;
                    else viewedIDs += ',';
                    viewedIDs += ViewData[i];
                    validItems++;
                    if (validItems === _4TellBoost.UserData.maxNumViewed)
                        break;
                }
            }
        }
        //We've upgraded the service call so it can accept comma-separated lists of resultType, numResults,
        // and startPos. This business here breaks the comma-separated list into number arrays, which then get
        //added to numResults and then summed.
        var numResultsArray = [], numResults = 0;
        for (var i = 0; i < _4TellBoost.Touts.length; ++i) {
            numResultsArray = numResultsArray.concat(_4TellBoost.Touts[i].numItems.toString().match(/\d+/g));
        }
        //TODO: Array.reduce
        for (var i = 0; i < numResultsArray.length; i++)
            numResults += parseInt(numResultsArray[i]);

        if (_4TellBoost.SiteInfo.hideIfNoImage)
            numResults = Math.min(20, numResults + 3); //Extra in case one or more products have no image.

        getServiceResults(_4TellBoost.Touts, productIDs, cartIDs, blockIDs, viewedIDs, numResults);

    };

    _4TellBoost.TrackClick = function (itemType, productID, newAddress, QVBool) {
        if (_4TellBoost.SiteInfo.GA_UA.length > 0) {
            if ("object" == typeof (dataLayer)) {
                dataLayer.push({
                    'event': '4TellClick', 'eventCategory': _4TellBoost.SiteInfo.GATrackID,
                    'eventAction': 'click', 'eventLabel': itemType, 'eventValue': productID
                });
            }
            if ("object" == typeof (_gaq)) {
                window._gaq = window._gaq || [];
                window._gaq.push(['_setAccount', _4TellBoost.SiteInfo.GA_UA],
                    ['_trackEvent', _4TellBoost.SiteInfo.GATrackID, itemType, productID]);
            }
            if ("function" === typeof (ga)) {
                ga('send', "event", _4TellBoost.SiteInfo.GATrackID, itemType, productID);
            }
            if ("function" === typeof (_4TTracker)) {
                _4TTracker('send', "event", _4TellBoost.SiteInfo.GATrackID, itemType, productID);
            } else {
                //TODO: Log that somebody doesn't have GA Tracking live.
            }
        }
        setTimeout(function () {
            if (newAddress)
                window.location = newAddress;
        }, 150);
        if (QVBool)
            open_product('product.asp?lt_c=1&itemid=' + productID + '&qv=1&');
    };

    _4TellBoost.addProductID = function (id) {
        if (!id || (id.substring(0, 1) === "[")) return;
        _4TellBoost.Service.productList[_4TellBoost.Service.productCount] = id;
        _4TellBoost.Service.productCount++;

        if (_4TellBoost.Service.pageType === "ProductDetail") {
            _4TellBoost.UserData.data.Viewed.unshift(id);
            //Workaround because IE8 doesn't believe in lastIndexOf
            var foo = jQuery.inArray(id, _4TellBoost.UserData.data.Viewed, 1);
            if (foo > 0) {
                _4TellBoost.UserData.data.Viewed.splice(foo, 1);
            }
            _4TellBoost.UserData.data.Viewed = _4TellBoost.UserData.data.Viewed.slice(0, _4TellBoost.UserData.maxNumViewed + 2);
            _4TellBoost.UserData.save();
        }
    };

    _4TellBoost.getProductCount = function () {
        return _4TellBoost.Service.productCount;
    };

    _4TellBoost.addCartItem = function (id) {
        if (!id || (id.substring(0, 1) === "[")) return;
        _4TellBoost.Service.cartList[_4TellBoost.Service.cartCount] = id;
        _4TellBoost.Service.cartCount++;
        if (jQuery.inArray(id, _4TellBoost.UserData.cart) === -1) {
            _4TellBoost.UserData.cart.unshift(id);
            _4TellBoost.UserData.save();
        }
    };

    _4TellBoost.getCartItems = function () {
        return _4TellBoost.Service.cartCount ? _4TellBoost.Service.cartList : _4TellBoost.UserData.cart;
    };

    _4TellBoost.addBlockItem = function (id) {
        if (!id || (id.substring(0, 1) === "[")) return;
        _4TellBoost.Service.blockList[_4TellBoost.Service.blockCount] = id;
        _4TellBoost.Service.blockCount++;
    };

    _4TellBoost.setCatId = function (id) {
        if (!id || (id.substring(0, 1) === "[")) return;
        _4TellBoost.Service.catId = id;
    };

    //Alias, because we can't agree on casing.
    _4TellBoost.setCustomerId = function (id) {
        _4TellBoost.setCustomerID(id);
    };

    _4TellBoost.setCustomerID = function (id) {
        if (!id || (id.substring(0, 1) === "[")) return;
        _4TellBoost.Service.customerId = id;
        _4TellBoost.UserData.data.UID = id;
        _4TellBoost.UserData.save();
    };

    _4TellBoost.getCustomerID = function () {
        if (_4TellBoost.Service.customerId) {
            return _4TellBoost.Service.customerId;
        } else if (_4TellBoost.UserData.data.UID) {
            return _4TellBoost.UserData.data.UID;
        } else {
            return _4TellBoost.UserData.data.RID;
        }
        //Problem is that "" != null. Could probably condense the above into return Service.ID || UID || RID.
    };

    _4TellBoost.setPageType = function (pageType) {
        if (!pageType)
            return;
        _4TellBoost.Service.pageType = pageType;
    };

    _4TellBoost.getPageType = function (tout) {
        if (_4TellBoost.Service.pageType === null)
            return "other";

        switch (_4TellBoost.Service.pageType) {
            case "Home":
                return "hm";
                break;
            case "ProductDetail":
                return "pdp1";
                break;
            case "Category":
                return "cat";
                break;
            case "Search":
                return "srch";
                break;
            case "AddToCart":
            case "QuickCart":
                return "cart";
            case "Checkout":
                return "chkout";
                break;
            case "OrderConfirmation":
                return "bought";
                break;
            case "Admin":
                return "admin";
                break
            default:
                return "other";
                break;
        }
    };

    _4TellBoost.setItemCount = function (itemCount) { //total results for results list pages
        if (!itemCount || (itemCount.substring(0, 1) === "[")) return;
        _4TellBoost.Site.itemCount = itemCount;
    };

    //Cookie-based functions
    _4TellBoost.likeItem = function (ID) {
        _4TellBoost.UserData.data.likes.push(ID);
        _4TellBoost.UserData.save();
    };

    _4TellBoost.dislikeItem = function (ID) {
        _4TellBoost.UserData.data.dislikes.push(ID);
        _4TellBoost.UserData.save();
        //$(this).closest("div.product4T").remove();
        //Might be wise to start using data- attributes.
        //Would surely make this simpler.
    };

    _4TellBoost.getDislikes = function () {
        return _4TellBoost.UserData.data.dislikes;
    };

    //Call-back Functions
    //  set in tout settings and passed into service call
    //  Dynamically created and set for each tout.

    (function () {
        if (_4TellBoost.alias == null) return;
        if (_4TellBoost.CONFIG == null) return;
        if (_4TellBoost.CONFIG.SiteInfo == null) return;
        if (_4TellBoost.CONFIG.SiteInfo.platform == null) return;
        _4TellBoost.SiteInfo = new _4TellBoost.Site(_4TellBoost.CONFIG.SiteInfo);
        var d = new Date();

        var version = (_4TellBoost.version) || d.getHours();

        document.write('<script type="text/javascript" type="text/javascript" src="' + _4TellBoost.loadpath + _4TellBoost.SiteInfo.platform + '?' + version + '"></script>');
        document.write('<link rel="StyleSheet" href="' + _4TellBoost.loadpath + "config/"
                            + _4TellBoost.alias + '.css?' + version + '" type="text/css" media="screen,print">');
        if (_4TellBoost.SiteInfo.custom) {
            document.write('<script type="text/javascript" type="text/javascript" src="' + _4TellBoost.loadpath + "config/" + _4TellBoost.alias + 'Actions.js?' + version + '"></script>');
        }
        $(document).ready(function () {
            var initDelay = setInterval(function () {
                if (_4TellBoost.Service.platformLoaded && (_4TellBoost.Service.customLoaded == _4TellBoost.SiteInfo.custom)) {
                    _4TellBoost.getRecommendations("Auto", "");
                    clearInterval(initDelay);
                }
            }, 50);
        });

    }());

    _4TellBoost.UserData.load();
    _4TellBoost.UserData.save();

}(window._4TellBoost = window._4TellBoost || {}, jQuery));
//self-invoked namespace that protects $ and undefined internally