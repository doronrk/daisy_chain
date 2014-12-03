

function setAddTo(theForm, addToType) {
   theForm.addTo.value = addToType;
   theForm.submit();
}

/* store inventory lookup helpers */
var locate = function($) {
    var _storesArr = [];
    var _storesUnavailableArr = []; /* the separate array is only used if unavailable stores need to be shown separately from available ones */
    var _lastStoreIndexInView = 0; /* used for pagination */
    var _storesPageSize = 5;
    var showUnavailableStores = false;
    var separateStoreByAvailability = false; /* separate available and unavailable stores */

    var _buildAvailableStoresHead = function() {
        var a = [];
        a.push('<div class="lookupHead">');
        a.push('<div class="col1">Stores</div>');
        a.push('<div class="col2">Hours</div>');
        a.push('<div class="colLast">Distance</div>');
        a.push('<div class="clr"></div>');
        a.push('</div>');
        return a.join('');
    };

    var _buildUnavailableStoresHead = function(radius, area) {
        var a = [];
        a.push('<div class="lookupHead">');
        if(radius == '3000'){
        	a.push('<div class="colFull">All Stores</div>');
        }else{
        	a.push('<div class="colFull">All Stores within ' + radius + ' miles of ' + area + '</div>');
        }     
        a.push('<div class="clr"></div>');
        a.push('</div>');
        return a.join('');
    };

    var _buildStoreRow = function(store) {
        var a = [];
        a.push('<div class="resultRow">');
        a.push('<div class="col1"><p class="storeInfo">');
        //a.push('<span class="storeName">'+store.storeName+'</span><br>');
        var address = (store.storeAddress2 == "") ? store.storeAddress1 : store.storeAddress1 + '<br>' + store.storeAddress2;
        a.push('<span class="storeAddress">' + address + '</span><br>');
        a.push('<span class="storeCSZ">' + store.storeCity + ', ' + store.storeState + '&nbsp;&nbsp;' + store.storeZip + '</span></p>');
        a.push('<p class="storePhone">'+store.storePhone+'</p>');
        if (store.eAppointment && store.eAppointment.toLowerCase() == "yes") {
            var storeDetailsLink = 'https://www.bebe.com/custserv/store_details.jsp?storeNumber=' + store.storeNumber + '&variantId=' + $("input[name=productVariantId]", "#inventoryLookupForm").val();
            a.push('<p class="storeAppt"><a href="' + storeDetailsLink +'">Book Stylist Appointment</a></p>');
        }
        a.push('</div>');

        a.push('<div class="col2"><p class="storeHours">' + store.storeHours + '</p>');
        var status = '<span class="unavailable">Unavailable</span>';
        var availability = parseInt(store.availability);
        if (availability == 1) {
            status = '<span class="limited">Limited quantities, please call the store to check</span>';
        } else if (availability == 2) {
            status = '<span class="available">Available</span>';
        }
        a.push('<p class="storeAvailability">' + status + '</p>');
        a.push('</div>');
        if (availability > 0) {
            a.push('<div class="colLast"><p class="storeDistance">' + store.distance + ' miles</p></div>');
        }
        a.push('<div class="clr"></div>');
        a.push('</div>');
        return a.join('');
    };

    var _buildStoresPage = function() {
        var start = _lastStoreIndexInView;
        var end = start + _storesPageSize;
        if (end > _storesArr.length) {
            end = _storesArr.length;
        }
        var html = [];
        for (i=start; i<end; i++) {
            html.push(_buildStoreRow(_storesArr[i]));
        }
        _lastStoreIndexInView = end;
        return html.join('');
    };

    var _buildInitialResults = function(radius, area) {
        var $lookupResults = $("#lookupResults");
        var html = [];
                
        if (_storesArr.length > 0) {
            html.push(_buildAvailableStoresHead());
            html.push(_buildStoresPage());
        }
        $lookupResults.removeClass("loading").html(html);

        if ((_storesArr.length-1) > _storesPageSize) {
            $lookupResults.append('<div id="container_more_locations"><a href="#" id="seeMoreLocations">see more locations</a></div>');
            $("#seeMoreLocations", $lookupResults).click(function(e){
                e.preventDefault();
                $(this).parents("#container_more_locations").before(_buildStoresPage());
            });
        }

        if (separateStoreByAvailability) {
            html.push(_buildAvailableStoresHead());
            /* TODO: separate unavailable stores display, how does this work with pagination? */
        }

    };

    var _buildStoreLookupFooter = function() {
        var viewAll = "View all stores";
        var urlParams = "";
        if (json.radius != "" && json.area != "" && json.radius != '3000') {
            if (json.radius != "nationWide") {
                viewAll += " within " + json.radius + " miles of " + json.area;
            }
            urlParams += "?radius=" + json.radius + "&cityStateZip=" + json.area;
        }
        $("#lookupShin .storesWithinLink").text(viewAll).attr("href",'http://www.bebe.com/custserv/locate_store.cmd'+urlParams).hilight();
    };

    return {
        resetStoreLookupResults : function() {
            resetErrorFields(); /* clear any size/color errors that may have been shown */
            $("#lookupResults").empty().addClass("loading");
            $("#lookupInfo").empty().fadeOut(100, "swing");
        },

        processStoreLookupResults : function(json) {
            _storesArr.length = 0; /* reset storage */
            _storesUnavailableArr.length = 0; /* reset storage */
            _lastStoreIndexInView = 0;
            var msg = json.message;
            var msgType = json.messageType;
            var stores = json.stores;
            if (msg != null && msgType != "found") {
                msg = '<span class="error">' + msg + '</span>';
                $("#lookupInfo").html(msg).fadeIn(100, "swing", function() {
                    $("#lookupInfo > span").hilight();
                });
            }

            if (stores != null && stores.length > 0) {
                for (i=0; i<stores.length; i++) {
                    if (showUnavailableStores && separateStoreByAvailability) {
                        /* break into two arrays, based on availability */
                        if (parseInt(stores[i].availability) == 0) {
                            _storesUnavailableArr.push(stores[i]);
                        } else {
                            _storesArr.push(stores[i]);
                        }
                    } else if (!showUnavailableStores && !separateStoreByAvailability) {
                        /* only push available stores into one array */
                        if (parseInt(stores[i].availability) > 0) {
                            _storesArr.push(stores[i]);
                        }
                    } else {
                        /* push all stores into one array */
                        _storesArr.push(stores[i]);
                    }
                }
            }

            _buildInitialResults(json.radius, json.area);
            //_buildStoreLookupFooter();
            resizePDPColumns();
        }
    };
}($);

function setupVariantWidgetEvents(widgetSelector) {
    var $quicklookMiniproduct = $("#quicklookMiniproduct");
    var isQuickLook = ($quicklookMiniproduct.length > 0);
    var isViewerOpenInBackground = false; /* tracks if quicklook viewer is open on top of a product/ens page - i.e. editing */
    if (isQuickLook) {
        isViewerOpenInBackground = ($("body").attr("id") == "product" || $("body").attr("id") == "ensemble");
    }
    var $productInfoRoot = isQuickLook ? $quicklookMiniproduct : $(widgetSelector).parents(".EntityBody");
    $('.COLOR_NAME .swatch', $productInfoRoot).click(function() {
        if (!$(this).hasClass('unavailable')) {
            var newImage = $(this).attr('recoloredimage');
            if (newImage) {
                //updateImages(newImage + '_is', null, $productInfoRoot);
                var imgSet = newImage + '_is';
                var imgSetCmd = 'http://www.bebe.com/catalog/get_image_set.cmd?imageSet=' + imgSet;

                $.getJSON(imgSetCmd, function(data) {
                    var _imgSet = "";
                    var _vidSet = "";
                    if (data.images) {
                        _imgSet = imgSet;
                    }
                    if (data.video) {
                        _vidSet = data.video;
                    }
                    var defaultImg = _imgSet.replace("_is","-i1");
                    /* ignore color specific video and use the default one from the jsp/global var */
                    if (typeof s7sdk != "undefined" && !isViewerOpenInBackground) {
                        setupViewer(_imgSet, videoset);
                    } else if (loadSdk === false || isViewerOpenInBackground) {
                        /* in s7sdk_loader.jsp, will only be false in IE8 quicklook */
                        /* preset is a global on product_body */
                        var defaultImgTag = '<img src="//s7d9.scene7.com/is/image/bebe/' + defaultImg + "?" + preset + '" alt="" />';
                        $("#quicklookMiniproduct #s7viewer").html(defaultImgTag);
                    } else {
                        /* since the s7sdk is delay loaded, sometimes in the case of a single variant item, a swatch click may come before the sdk is ready */
                        $("body").one("s7ViewerReady", function() {
                            setupViewer(_imgSet, videoset);
                        });
                    }
                    if (!isQuickLook) {
                        /* update the pinterest button media param */
                        var $pinItWrap = $("#pinItWrap");
                        var $pinItAnc = $pinItWrap.find("a");
                        if ($pinItAnc.length > 0) {
                            /* update the default image that was loaded with the page to the default image from the selected imageset */
                            $pinItAnc.attr("data-pin-href", $pinItAnc.attr("data-pin-href").replace($pinItWrap.attr("data-defaultImage"), defaultImg));
                            /* update the defaultImage attr to the newly selected image so the replace above works on future clicks */
                            $pinItWrap.attr("data-defaultImage", defaultImg);
                        }
                    }
                });
            }
        }
    });
}

var setPDPDetailsHeight = function() {
    _sizeViewerContainer();
    if (!responsiveUtil.isMobile()) {
        var $mainItemImage = $("#mainItemImage");
        var $pdpTabContent = $("#jsPDPTabContent");
        var leftColH = $mainItemImage.offset().top + $mainItemImage.outerHeight(true);
        var pdpTabContentTop = $pdpTabContent.offset().top;
        var $moreButton = $("#collapsible_content_btn");

        if ($pdpTabContent.outerHeight(true) > (leftColH - pdpTabContentTop)) {
            var heightClosed = leftColH - pdpTabContentTop - $moreButton.outerHeight(true);
            $pdpTabContent.data("heightopen", $pdpTabContent.outerHeight(true));
            $pdpTabContent.data("heightclosed", heightClosed);
            $pdpTabContent.height(heightClosed);
            $moreButton.show();
        } else {
            $moreButton.hide();
        }

        resizePDPColumns();

        $('#tab1collapse').click(function(event) {
            event.preventDefault();
            var $this = $(this);
            var $pdpTabContent = $("#jsPDPTabContent");
            var text = $this.data("textopen");
            var height = $pdpTabContent.data("heightclosed");
            if ($this.html() == $this.data("textopen")) {
                text = $this.data("textclose");
                height = $pdpTabContent.data("heightopen");
            }
            $this.html(text);
            $pdpTabContent.animate({
                height:height
            }, 200, "swing", function(){
                resizePDPColumns();
            });
        });
    }
};

var setPDPCrosssellsHeight = function() {
    if (!responsiveUtil.isMobile()) {
        imagesLoaded("#moreItemsWrap", function(){
            var additionalPadding = 25;
            var $imgContainer = $('#imageContainer');
            var $moreItemsWrap = $('#moreItemsWrap');
            $imgContainer.css('margin-bottom',$moreItemsWrap.outerHeight(true) + additionalPadding);
            $moreItemsWrap.css("top", $imgContainer.outerHeight(false) + additionalPadding);

            resizePDPColumns();
        });
    }
};

var resizePDPColumns = function() {
    if (!responsiveUtil.isMobile()) {
        var collapsedClass = (responsiveUtil.isTablet()) ? "six" : "two-fifths";
        var openedClass = "twelve";
        var $description = $('#description-container');
        var descBottom = $description.offset().top + $description.outerHeight(true);

        var _adjustCrosssellColumns = function(_$container) {
            if (_$container.length > 0) {
                if (_$container.offset().top > descBottom) {
                    _$container.removeClass(collapsedClass).addClass(openedClass);
                } else {
                    _$container.removeClass(openedClass).addClass(collapsedClass);
                }
            }
        };

        $("#moreItemsWrap").find(".crossSellWrap").each(function(){
            _adjustCrosssellColumns($(this));
        });
    }
};


