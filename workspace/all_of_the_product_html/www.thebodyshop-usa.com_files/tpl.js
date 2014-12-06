var tbs = tbs || {};
var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var isSafari = navigator.userAgent.indexOf("Safari") > -1;
var isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
$.extend(tbs, {
    domainName: loc.bazaarvoice.domainName,
    BVisLoaded: false,
    BVQAisLoaded: false,
    showPricePerMl: false, // flag to display price per ml		
    product: {
        shadeTitle: "",
        isAlternate: false,
        isShade: false,
        variantIdDisplayForProductShades: (undefined != loc.productPage.isShadeItemCodeNeeded && $.trim(loc.productPage.isShadeItemCodeNeeded).length > 0) ? $.trim(loc.productPage.isShadeItemCodeNeeded).toUpperCase() : "ON",
        // bazaar voice related methods
        BVcheckLoadState: function () {
            if (!BVisLoaded) {
                var page = document.getElementById('BVFrame').src;
                document.getElementById('BVFrame').src = loc.bazaarvoice.dns + '/logging?page=' + escape(page);
                document.getElementById('BVReviewsContainer').innerHTML = '<!-- Review retrieval timed out -->';
            }
        },
        bvShowTab: function (application, displayCode, subjectId, deepLinkId) {
            // Ask & Answer
            if (application == 'QA') {
                if (typeof changeActiveTab == 'function') {
                    return changeActiveTab($get('answers'));
                }
                // TODO: insert code here to open the tab that A&A content lives in
                //       if there is no such tab (content is visible by default), this
                //       block may be removed.
            }
            if (application == 'PRR') {

            }
        },
        BVAnalytics: function (json) {

            // Ask & Answer
            if (json.bvProduct == "AskAndAnswer") {
                // Injection
                if (json.eventSource == "Display") {
                    // Display
                    if (json.eType == "Read") {
                        // Hide ALP link container if there are zero questions
                        if (json.attributes.numQuestions == 0) {
                            var bvALPLink = document.getElementById("BVALPLinkContainer");
                            if (bvALPLink) { bvALPLink.style.display = "none"; }
                        }
                    }
                    // Submission
                    else if (json.eType == "Write" || json.eType == "Support") {
                        // TODO: place web analytics tagging code here to track submission process
                        //       use json.pageType to determine submission state (edit, preview, thank you)
                        //       see appendix for more details
                    }
                }
                // Click actions
                else if (json.eventSource == "Action") {
                    // TODO: place web analytics tagging code here to track clicks
                }
            }

        },

        ratingsDisplayed: function (totalReviewsCount, avgRating, ratingsOnlyReviewCount, recommendPercentage, productID) {
            //            if (totalReviewsCount > 0) {
            //                $get("BVSecondaryCustomerRatings").style.display = "block";
            //                var bvRevCntr = document.getElementById("BVReviewsContainer");
            //                if (bvRevCntr) { bvRevCntr.style.display = "block"; }
            //                var bvSVPLink = document.getElementById("BVSVPLinkContainer");
            //                if (bvSVPLink) { bvSVPLink.style.display = "block"; }
            //            }
            if (totalReviewsCount == 0) {
                var bvRevCntr = document.getElementById("BVReviewsContainer");
                var bvRLPLink = document.getElementById("BVRLPLinkContainer");

                if (bvRevCntr) { bvRevCntr.style.display = "none"; }
                if (bvRLPLink) { bvRLPLink.style.display = "none"; }
            }
            // Other custom items leveraging these values.
            // TODO : insert Web Analytics tracking here
        },
        updateShadeSelection: function (txt) {

            if ("ON" == tbs.product.variantIdDisplayForProductShades) {
                $("#main-form .shade-type .title").html(tbs.product.shadeTitle);
                $("#main-form .shade-type .title").append(" (" + txt.split('#')[4] + ")");
            }
            $(".shade-selector li a").each(function (i, elt) {
                if (txt == ($(elt).attr("data-weight")+"#")) {

                    $(elt).trigger('click');
                }
            })
        },

        strrev: function (str) {
            return str.split("").reverse().join("");
        },
        round: function (valeur, nb_chiffre) {
            var retour = Math.round(valeur * Math.pow(10, nb_chiffre)) / Math.pow(10, nb_chiffre);
            var tab = retour.toString().split(".");
            if (nb_chiffre > 0) {
                var ecart = nb_chiffre;
                if (tab[1]) {
                    ecart -= tab[1].length
                } else {
                    retour += ".";
                }

                for (i = ecart; i > 0; i--) {
                    retour += "0";

                }
            }
            return retour.toString().replace(".", ",");
        },
        updatePricePerMl: function (dataWeightVal) {
            var default_price = $('.prices .new').html();
            var qtyArr = dataWeightVal.split('#');
            var default_qty = qtyArr[1];
            var default_r_qty = qtyArr[0];
            var default_r_unit = qtyArr[2];
            var currency = "";

            // to handle the currency sepeartor in EMEA markets
            if (default_price.indexOf(',') > -1) {
                currency = default_price.substring(5);
                replacedPrice = default_price.replace(',', '.');
            } else {
                currency = default_price.substring(0, 1);
                replacedPrice = default_price.substring(1);
            }
            default_priceperml = parseFloat(parseFloat(replacedPrice) / parseFloat(default_qty) * parseFloat(default_r_qty));
            default_priceperml = Math.round(default_priceperml * 100) / 100;
            if (default_price.indexOf(',') > -1) {
                $(".prices .price_per_ml").html(default_priceperml + " " + currency + "/" + default_r_qty + default_r_unit);
            }
            else {
                $(".prices .price_per_ml").html(currency + default_priceperml + "/" + default_r_qty + default_r_unit);
            }
        },
        initShadeSelector: function () {

            // to load the first variant onload of page
            $('#selected-shade .description .name').html($('.shade-selector li a').attr('title'));
            var actualDataWeight = $('.shade-selector li a').attr('data-weight').split('#')[0] + "-" + $('.shade-selector li a').attr('data-weight').split('#')[1] + $('.shade-selector li a').attr('data-weight').split('#')[2];
            //            $('#selected-shade .description .weight').html(actualDataWeight);
            $('#selected-shade .visual img').attr("src", $('.shade-selector li a').attr('data-name'));
            tbs.product.shadeTitle = $("#main-form .shade-type .title").html();

            if ("ON" == tbs.product.variantIdDisplayForProductShades) {
                $("#main-form .shade-type .title").append(" " + $('.shade-selector li a').attr('data-weight').split('#')[4]);
            }
             $('#selected-shade .description .weight').html(tbs.product.shadeTitle + " " + $('.shade-selector li a').attr('data-weight').split('#')[4]);
            // to update the price per ml
            if (showPricePerMl) {
                tbs.product.updatePricePerMl($('.shade-selector li a').attr('data-weight'));
            }
            //Added for inital selection
            $(".shade-type-select option:first").attr("selected", "selected");
            tbs.product.storeSelectedVariantCode($(".shade-type-select option:selected")); // Added for out of stock notification
            // to display out of stock
            tbs.product.enableOutOfStock($('.shade-selector li a').attr('data-weight'));

            $('.shade-type-select').change(function () { tbs.product.updateShadeSelection($(this).val()); });
            $.each($('.shade-selector li a'), function (i, el) {
                $(el).bind({ 'click': function (e) {
                    e.preventDefault();

                    //datas on the clicked item
                    var _getDatas = {
                        'weight': $(this).attr('data-weight'),
                        'title': $(this).attr('title'),
						'prdshade': $(this).attr('data-prdshade'),
                        'img': $(this).attr('data-name'),
                        'file_path': $(this).attr('data-visual')
                    };

//                    $('#selected-shade > span').removeClass();
//                    $('#selected-shade > span').addClass('visual ' + _getDatas.img);
                    $('.order .name').html(_getDatas.title);
                    //                    $('.order .weight').html(_getDatas.weight.split('#')[0] + "-" + _getDatas.weight.split('#')[1] + _getDatas.weight.split('#')[2]);
                    $('.order .weight').html(tbs.product.shadeTitle + " " + _getDatas.weight.split('#')[4]);
                    if ("ON" == tbs.product.variantIdDisplayForProductShades) {
                        $("#main-form .shade-type .title").html(tbs.product.shadeTitle);
                        $("#main-form .shade-type .title").append(" " + _getDatas.weight.split('#')[4]);
                    }
                    // to load the image path for the variant
                    $('#selected-shade .visual img').attr("src", _getDatas.img);
					$('img.product').attr("src", _getDatas.prdshade);

                    $('.shade-type .customStyleSelectBoxInner').html(_getDatas.title);
                    $(".shade-type-select option").removeAttr("selected", "selected");
                    $(".shade-type-select option[value='" + _getDatas.weight + "#']").attr("selected", "selected");

                    // to update price per ml
                    if (showPricePerMl) {
                        tbs.product.updatePricePerMl(_getDatas.weight);
                    }
                    tbs.product.storeSelectedVariantCode($(".shade-type-select option:selected")); // Added for out of stock notification
                    // to display out of stock
                    tbs.product.enableOutOfStock(_getDatas.weight);

                    // to change the image upon selecting the alternate image and choosing a shade in the shades palette
                    $.each($('.product_views ul li'), function (i, el) {
                        if (i != 0 && $(el).attr('data-type') != "video" && $('.product_views ul li').eq(0).attr("class") != "product_selected-view") { // we don't affect the first thumbnail
                            $('img.product').attr("src", $.format(loc.packshot.variantLargeImg, _getDatas.file_path));
                            tbs.product.isShade = true;
                            $("#maincontent .visual").css("cursor", "default");
                            $("#maincontent .product").attr('title', '');
                        }
                    });
                }
                })
            })
            $('.shade-selector li').bind({
                'click': function (e) {
                    $(this).closest('ul').find('li').removeClass('active');
                    $(this).addClass('active');
                }
            });
        },
        switchToVideo: function (el) {
            $('a.visual').hide();
            $('#video_container')
				.empty()
				.append(
					$('<embed/>', {
					    src: $.format('http://www.youtube.com/v/{0}', $(el).data('source')), //todo: add localization
					    wmode: 'opaque',
					    type: 'application/x-shockwave-flash',
					    allowscriptaccess: 'always',
					    allowfullscreen: true,
					    width: '100%',
					    height: '100%'
					})
				)
				.show();
        },
        switchProductView: function (el, type, alternateImageName) {
            $('#video_container').hide().empty();

            $('a.visual').show();
            tbs.product.isShade = false;
            $("#maincontent .visual").css("cursor", "pointer");
            $("#maincontent .product").attr('title', loc.productPage.productImageTooltip);

            // to handle product- default thumbnail image
            if (type == 'photo') {
                $('img.product').attr("src", $.format(loc.productPage.productLargeImagePath, $('#prodCode').val()));
                $('img.product').attr("imageName", $('#prodCode').val());
            }
            else { // to handle product alternate image     
                $('img.product').attr("src", $.format(loc.productPage.alternateImageMediumPath, alternateImageName));
                $('img.product').attr("imageName", alternateImageName);
            }

        },
        goToByScroll: function (id) {
            if (navigator.appName.indexOf("Microsoft") != -1) { /// TODO: ?????? Use jQuery
                var ycoordinate = $("#" + id).offset().top;
                setTimeout('window.scrollTo(0, "' + ycoordinate + '")', 1); // added setTimeout as a workaround to fix JIRA 596
            } else {
                $('html,body').animate({ scrollTop: $("#" + id).offset().top }, 'slow');
            }
        },
        clickRadioButton: function (el) {


            if ($(".size-selector li input").length > 1) {
                $(".size-selector li label").each(function (i, elt) {
                    if ($(elt).attr("class") == "selected-size") {
                        $(elt).removeClass("selected-size");
                    }
                })
                $(el).addClass("selected-size");

                if ($("#main-form .volume .title").html().split(' ').length > 0) {
                    $("#main-form .volume .title").html($("#main-form .volume .title").html().split(' ')[0]);
                }
                $("#main-form .volume .title").append(" " + $(el).attr("data-weight").split('#')[4]);
                var price = $(el).attr("data-weight").split('#')[5];
                var newprice = $(el).attr("data-weight").split('#')[6];
                if (newprice == price) {
                    $('#product-block .prices .old').html("");
                    $('#product-block .prices .new').html(price);
                } else {
                    $('#product-block .prices .old').html(price);
                    $('#product-block .prices .new').html(newprice);
                }

                /*if (showPricePerMl) {
                tbs.product.updatePricePerMl($(el).attr('data-weight'));
                }*/
                tbs.product.enableOutOfStock($(el).attr('data-weight'));

                // select menu update
                //TODO: fix this; why use parent() if find contains id - there is only one element in a page with 'main-form' id

                $(el).parent().parent().parent().parent()
				.find('#product-block')
				.find('#main-form')
					.find('.volume')
						.find('.customStyleSelectBoxInner')
							.html($('input', el).attr('value'));
                $(".product-size option").removeAttr("selected", "selected");

                $(".product-size option[value='" + $(el).attr('data-weight') + "']").attr("selected", "selected");
            }
            tbs.product.storeSelectedVariantCode($(".product-size option:selected")); // Added for out of stock notification
        },
        updateSizeSelector: function (txt) {
            $(".size-selector li label").each(function (i, elt) {
                if ($(elt).attr("data-weight") == txt) {
                    $(elt).addClass("selected-size");
                    if ($("#main-form .volume .title").html().split(' ').length > 0) {
                        $("#main-form .volume .title").html($("#main-form .volume .title").html().split(' ')[0]);
                    }
                    $("#main-form .volume .title").append(" " + $(elt).attr("data-weight").split('#')[4]);
                    var price = $(elt).attr("data-weight").split('#')[5];
                    var newprice = $(elt).attr("data-weight").split('#')[6];
                    if (newprice == price) {
                        $('#product-block .prices .old').html("");
                        $('#product-block .prices .new').html(price);
                    } else {
                        $('#product-block .prices .old').html(price);
                        $('#product-block .prices .new').html(newprice);
                    }
                    if (showPricePerMl) {
                        tbs.product.updatePricePerMl($(elt).attr('data-weight'));
                    }
                    tbs.product.enableOutOfStock($(elt).attr('data-weight'));
                } else {
                    $(elt).removeClass("selected-size");
                }

            })
            tbs.product.storeSelectedVariantCode($(".product-size option:selected")); // Added for out of stock notification
        },
        setVariantprice: function (data) { //Change the price value which base on th variant selected in quick shop window

            var valuesArray;
            var price;
            var newprice;
            valuesArray = data.split("#");
            price = valuesArray[5];
            newprice = valuesArray[6];
            if (newprice == price) {
                $('#product-block .prices .old').html("");
                $('#product-block .prices .new').html(price);
            } else {
                $('#product-block .prices .old').html(price);
                $('#product-block .prices .new').html(newprice);
            }
        },

        initSizeSelector: function () {
            $(".size-selector li").first().find('label').addClass("selected-size");
            if ($(".size-selector li").length <= 1) {
                $(".size-selector li label").css("cursor", "default");
            }
            $("#main-form .volume .title").append(" " + $('.size-selector li label').attr('data-weight').split('#')[4]);
            tbs.product.setVariantprice($(".size-selector li").first().find('label').attr('data-weight'));
            if (showPricePerMl) {
                tbs.product.updatePricePerMl($('.size-selector li label').attr('data-weight'));
            }
            tbs.product.enableOutOfStock($('.size-selector li label').attr('data-weight'));
            //Added for inital selection
            $(".product-size option:first").attr("selected", "selected");
            tbs.product.storeSelectedVariantCode($(".product-size option:selected")); // Added for out of stock notification


        },
        toggleOpenedState: function (elt) {
            var el = $(elt).parents('li'),
				heightToTake = null,
				$section = el.find('section'),
				$backToTop = el.find('.back-to-top');

            var id = el.index();
            var menuEntries = $(".inner-nav ul li");
            if (el.hasClass('opened')) {
                $(menuEntries[id]).removeClass("selected");
                el.removeClass("opened");
                heightToTake = '40px';
                $('em', elt).html($.format("{0}<span></span>", loc.messages.showLabel));
            } else {
                $(menuEntries[id]).addClass("selected");
                el.addClass("opened");
                heightToTake = 40
					+ parseInt($section.css('height'))
					+ parseInt($section.css('padding-top'))
					+ parseInt($section.css('padding-bottom'))
					+ parseInt($backToTop.css('height'))
					+ parseInt($backToTop.css('padding-top'))
					+ parseInt($backToTop.css('padding-bottom'));
                heightToTake = '100%';
                $('em', elt).html($.format("{0}<span></span>", loc.messages.hideLabel));
            }
            el.animate({ height: heightToTake }, 200, 'swing');
        },
        updateMenuSelection: function (elt) {
            var $el = $(elt), itemToOpen = $('.about-content > li')[$el.index()];
            //$(".inner-nav ul li").removeClass("selected");
            $el.addClass("selected");

            if (!$(itemToOpen).hasClass('opened')) {
                tbs.product.toggleOpenedState($('h4', itemToOpen).first())
            }
        },
        manageSecondNavDisplay: function () {
            var secNavEntries = $(".inner-nav > ul > li > a");
            var navWidth = $('.inner-nav').width();
            var totalEntriesWidth = 0;
            var secNavEntriesNumber = secNavEntries.length;
            if (secNavEntriesNumber > 5) $(".product .gcol.gcol-L.first .inner-nav").css('font-size', '13px');
            secNavEntries.each(function () {
                totalEntriesWidth += $(this).width();
            });
            var totalFreeSpace = navWidth - totalEntriesWidth;
            var paddingEntryValue = Math.floor(totalFreeSpace / (secNavEntriesNumber));
            var w = 0;
            secNavEntries.each(function (i, el) {
                $(this).css('padding', '0 ' + paddingEntryValue / 2 + 'px');
                w += $(this).parent().width();
                if (i >= secNavEntries.length - 1) {
                    var rest = $(".inner-nav").width() - w;
                    var new_pad = Math.floor(parseInt($(this).css('padding-right')) + Math.floor(rest) - 1);
                    $(this).css('padding-right', new_pad - 5 + 'px');
                }
            });
        },
        manageProductZoom: function () {
            $('a.visual')
				.first()
					.click(function (e) {
					    e.preventDefault();
					    e.stopPropagation();

					    /* Zoom image uses the same image as regular product image; if different image needs to be used, image name parsing chnage needs to be added */

					    /*commenting this piece in order to resolve JIRA - 805*/
					    //$('#product-zoom').find('img').attr('src', $('img.product', this).attr('src'));
					    tbs.product.isAlternate = false;
					    $.each($('.product_views ul li'), function (i, el) {
					        if (i != 0 && $(el).attr('data-type') != "video" && $('.product_views ul li').eq(0).attr("class") != "product_selected-view") { // we don't affect the first thumbnail                           					         
					            tbs.product.isAlternate = true;
					        }
					    });

					    if (tbs.product.isAlternate && tbs.product.isShade) {
					        return false;
					    }
					    else {

					        $('#product-zoom').find('img').attr('src', $.format(loc.packshot.zoom, $('.item-L.item-03 .visual .product').attr("imageName")));
                            $('#product-zoom').find('img').attr('src', $('.item-L.item-03 .visual .product').attr("src"));
					        $('#product-zoom').css('visibility', 'visible').attr('data-status', 'opened');
					        $('#product-zoom  img').load(function () { tbs.product.resizeZoomLayer(); });

					        $('#product-zoom  a').click(function (e) {
					            e.preventDefault();
					            $('#product-zoom').css('visibility', 'hidden').attr('data-status', 'closed');
					            $('#product-zoom img').attr('src', '');
					        });

					        $('html').click(function (event) {
					            event.stopPropagation();
					            var _getStatus = $('#product-zoom').attr('data-status');
					            if (_getStatus === 'opened') {
					                $('#product-zoom a').triggerHandler('click');
					            }
					        });
					    }

					});
            $(window).resize(function () {
                tbs.product.resizeZoomLayer();
            });
        },
        resizeZoomLayer: function () {
            var _getHeight = $('#product-zoom img').height();
            var _setTop = 0;

            if ($(window).height() > parseInt(_getHeight)) {
                _setTop = $(window).height() - parseInt(_getHeight) + 10;
                _setTop /= 2;
            }
            $('#product-zoom img').css('top', $(window).scrollTop() + _setTop);
            $('#product-zoom img').css('left', ($(window).width() - $('#product-zoom img').width()) / 2);
            $('#product-zoom a').css('top', $('#product-zoom img').css('top'));
            $('#product-zoom a').css('right', $('#product-zoom img').position().left + 5);

        },
        initAccodeon: function () {
            // init accordeon menu
            $(".inner-nav ul li").click(function (e) {
                e.preventDefault();
                tbs.product.updateMenuSelection(this);
                tbs.product.manageSecondNavDisplay();
                tbs.product.goToByScroll($(e.delegateTarget).data('tab-id'));
            });
            // init accordeon
            $('.about-content')
				.children()
					.each(function (i, el) {
					    var element = $(el);
					    if (!element.hasClass('opened')) {
					        element.css('height', '40px');
					    }
					})
				.end()
				.find('h4.title')
					.click(function (e) {
					    e.preventDefault();
					    tbs.product.toggleOpenedState(this);
					})
				.end()
				.find('.back-to-top')
					.click(function (e) {
					    e.preventDefault();
					    tbs.product.goToByScroll('top-content');
					});
        },
        initProductViews: function () {
            $('.product_views li')
				.filter(function () { return $(this).data('type') == 'video'; })
					.each(function () {
					    $(this).css('background', $.format(loc.productPage.videoBackground, $(this).data("source")));
					})
				.end()
				.click(function (e) {
				    e.preventDefault();
				    var $this = $(this);

				    if ($this.data('type') == 'video') {
				        tbs.product.switchToVideo(this);
				    } else {
				        var alternateImageName = $this.data('type') == 'alternateImage' ? $this.attr('data-weight') : '';
				        tbs.product.switchProductView(this, $this.data('type'), alternateImageName);
				    }

				    $('.product_views li').removeClass("product_selected-view");
				    $this.addClass('product_selected-view');
				});
        },
        enableOutOfStock: function (data) {
            var stock;
            var varValues = data.split('#');
            stock = parseInt(varValues[3]);
            tbs.product.showHideOutOfStock(stock);
        },
        showHideOutOfStock: function (stock) {
            if (stock <= 0) {
                $(".outofstockbtn").show();
                $(".button-buy").hide();
            }
            else {
                $(".outofstockbtn").hide();
                $(".button-buy").show();
            }
        },
        highlightTab: function () {

            /* The below code commented and rewritten to bring the value from webcenter and make that selected by default */
            /* $(".product .gcol.gcol-L.first .inner-nav ul li").first().addClass("selected");
            tbs.product.toggleOpenedState($('h4', $('.about-content > li')[0]).first());*/
            var isTabopened = false;
            var tabToOpenWebCenterValue = loc.productPage.defaultTabConfiguration;
            /*If no Webcenter value is defined, reviews tab will be opened when the page loads*/
            var tabToOpen = 'tab-reviews';

            if ('undefined' != tabToOpenWebCenterValue) {
                tabToOpenWebCenterValue = $.trim(tabToOpenWebCenterValue).toUpperCase();
                if (('REVIEWS' == tabToOpenWebCenterValue.toUpperCase())) {
                    tabToOpen = 'tab-reviews';
                } else if ('INSIDE' == tabToOpenWebCenterValue.toUpperCase()) {
                    tabToOpen = 'tab-whatsinside';
                } else if ('INGREDIENTS' == tabToOpenWebCenterValue.toUpperCase()) {
                    tabToOpen = 'tab-ing';
                } else if ('USE' == tabToOpenWebCenterValue.toUpperCase()) {
                    tabToOpen = 'tab-howto';
                } else if ('QAS' == tabToOpenWebCenterValue.toUpperCase()) {
                    tabToOpen = 'tab-qan';
                } else if ('DELIVERY' == tabToOpenWebCenterValue.toUpperCase()) {
                    tabToOpen = 'tab-delivery';
                }
                else if ('TIPS' == tabToOpenWebCenterValue.toUpperCase()) {
                    tabToOpen = 'tab-tips';
                }
                else if ('ABOUT' == tabToOpenWebCenterValue.toUpperCase()) {
                    tabToOpen = 'tab-About';
                }
            }
            tbs.product.updateMenuSelection($('.inner-nav ul li[data-tab-id=' + tabToOpen + ']'));

            $('.about-content')
				.children()
					.each(function (i, el) {
					    var element = $(el);
					    if (element.hasClass('opened')) {
					        isTabopened = true;
					    }
					})
				.end()
            if (isTabopened == false) {
                $(".product .gcol.gcol-L.first .inner-nav ul li").first().addClass("selected");
                tbs.product.toggleOpenedState($('h4', $('.about-content > li')[0]).first());
            }

        },
        storeSelectedVariantCode: function (data) { // Added for out of stock notification

            var shadecode;
            shadecode = data.val().split('#')[4];
            $(".outofstockbtn").attr("data-varcode", shadecode);
            $(".outofstockbtn").attr("href", "#" + shadecode);
            return shadecode;
        },
        getVariantCode: function () { // Added for out of stock notification
            var variantcode;
            variantcode = $(".outofstockbtn").attr("data-varcode");
            return variantcode;
        },
        openReviewsTab: function () {
            tbs.product.updateMenuSelection($('.inner-nav ul li[data-tab-id=tab-reviews]'));
            tbs.product.goToByScroll('tab-reviews');
        },
        openDeliveryTab: function () {
            tbs.product.updateMenuSelection($('.inner-nav ul li[data-tab-id=tab-delivery]'));
            tbs.product.goToByScroll('tab-delivery');
        },


        addProductNavOpened: false,
        manageProductAddNav: function () { /* MANAGE ADDITIONNAL NAV & its responsive behavior on PRODUCT & SUBCATEGORY pages */
            var nav = $('.product #additionnal-nav');
            var openedHeight = 45 + parseInt($('.product #additionnal-nav ul').css('height'));
            var viewportWidth = $(window).width();
            var widthStop;
            /*to detect ie version less than 8*/
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            if (isChrome || rv <= 8.0) { widthStop = 1017; } else { widthStop = 1000; }
            //if (viewportWidth < widthStop) {
            nav.css('height', 45).css('overflow', 'hidden');
            nav.die();
            if (!tbs.core.isTouchDevice() || isChrome) {
                nav.live({
                    "mouseenter": function () { nav.animate({ 'height': openedHeight }, 300); },
                    "mouseleave": function () { nav.animate({ 'height': 45 }, 300); }
                });
            } else {
                nav.live({
                    "click": function () {
                        if (this.addProductNavOpened) {
                            //alert('opened');
                            nav.animate({ 'height': 45 }, 300);
                            this.addProductNavOpened = false;
                        } else {
                            //alert('closed');
                            nav.animate({ 'height': openedHeight }, 300);
                            this.addProductNavOpened = true;
                        }
                    }
                });
            }
            /*} else {
            nav.css('height', 'auto').css('overflow', 'inherit');
            nav.die();
            }*/
        },
		fnAdobeProductCrossSell: function() {
			setAdobeCrossSellValue();
		},	
        onReady: function () {
            // Custom selector styles			
            $('.product-quantity, .product-size, .shade-type-select').customStyle();

            $("#top-content").on("click", "map[name^=banner]", function (e) {
                var promoCode = $("#top-content").find("#AdobeProductBannerCode").text();
                setAdobeCampaignCodeValue(promoCode);
            });
			
			/*Added for left nave for sub sub cat page*/
            /*if ($('#additionnal-nav').length) {
            $("#additionnal-nav ul li").each(function () {
            if ($("#additionnal-nav ul li ul").length) {
            if ($(this).hasClass('active')) {
            $(this).find('ul').css('display', 'block');
            }
            }
            });

            $("#additionnal-nav ul li ul li").each(function () {
            if ($(this).hasClass('active')) {
            $(this).parent().css('display', 'block');
            $(this).parent().parent().addClass('active');
            }
            });
            }

            // rdy => on the left menu, remove empty UL
            $("#additionnal-nav ul .lvl2 ul").each(function () {
            if (!$(this).children().size() > 0) {
            $(this).remove();
            }
            });*/

            /*Added for left nave for sub sub cat page*/
            if ($('#additionnal-nav').length) {
                var endPos;
                $("#additionnal-nav ul li").each(function (index1) {
                    if ($(this).hasClass('lvl3 subNav active')) {
                        $(this).css('display', 'block');
                        while (index1 >= 0) {
                            if ($("#additionnal-nav ul li:eq(" + index1 + ")").hasClass("lvl2")) { $("#additionnal-nav ul li:eq(" + index1 + ")").removeClass().addClass('lvl2 active'); return false; }
                            index1--;
                        }
                    }
                });
                $("#additionnal-nav ul li").each(function (index1) {
                    if ($(this).hasClass('lvl2 active')) {
                        $("#additionnal-nav ul li").each(function (index2) {
                            if ((index2 > index1) && ($(this).hasClass('lvl2') || index2 == ($('#additionnal-nav ul li').length - 1))) {
                                endPos = index2;
                                return false;
                            }
                        });
                        $("#additionnal-nav ul li").each(function (index) {
                            if ((index > index1) && (index <= endPos)) {
                                $(this).css('display', 'block');
                            }
                        });
                    }
                });
            }

            /*Added for left nave for sub sub cat page*/



            tbs.core.quickshop.loadQuickshop($('.wrapper .container .buyButton .addToBag> .button.shop'));
            tbs.core.quickshop.loadManageOutOfStock($('.wrapper .container .buyButton .outofstock> .Outofstockbutton'));
            // to show price per ml
            //            if ($(".price_per_ml").length > 0) {
            //                showPricePerMl = true;
            //            }

            if ($(".price_per_ml") != undefined) {
                showPricePerMl = true;
            }

            // init shade selectrs if the current product has shades
            if ($('.shade-selector').length > 0) {
                tbs.product.initShadeSelector();
            }

            tbs.product.initProductViews();
            tbs.product.initAccodeon();
            if ($(".size-selector").length > 0) {
                tbs.product.initSizeSelector();
            }
            $(".size-selector li > label").click(function () {

                tbs.product.clickRadioButton(this);
            });
            $('#main-form .product-size').change(function () {
                tbs.product.updateSizeSelector($(this).val());
            });
            if ($(".item-L.item-03 .right .note").length > 0) {
                $('.item-L.item-03 .right .note .user-info-request a').click(function () {
                    tbs.product.openReviewsTab();
                });
            }

            if ($(".item-L.item-03 .right .warranties").length > 0) {
                $('.item-L.item-03 .right .warranties .delivery-txt a').click(function () {
                    $('.item-L.item-03 #delivery-popup').show().appendTo('.item-L.item-03 .right').insertAfter('.product-infos');
                });
                $('.item-L.item-03 #delivery-popup .close').click(function () { $('.item-L.item-03 #delivery-popup').hide(); });
            }
            /** Commenting this part as the 'More Infomation' link in the popup is descoped **/
            /*if ($(".item-L.item-03 .right .warranties").length > 0) {
            $('.item-L.item-03 .right .warranties .delivery-txt a').click(function () {
            tbs.product.openDeliveryTab();
            tbs.product.manageSecondNavDisplay();
            });
            }*/
            // call for recommendations to load
            tbs.core.recommendations('product'); 

            if ($("#BVFrame").length > 0) {
                setTimeout("tbs.product.BVcheckLoadState()", 15000);
            }
            /* MANAGE ADDITIONNAL NAV behavior on responsive */
            tbs.product.manageProductAddNav();

            /* MANAGE ADDITIONNAL NAV behavior on responsive */
            tbs.core.manageAdvertBlocks();

            /* MANAGE microbasket */
            tbs.core.microbasket.manageMicrobasket();

            /* product zoom */
            tbs.product.manageProductZoom();

            tbs.product.highlightTab();

            tbs.product.manageSecondNavDisplay();

            tbs.product.getVariantCode();

            $("#product-block .button-buy").click(function () {
                tbs.core.quickshop.addToBasketProduct();
            });

            /*Added for out of stock notification pop up*/
            $("#product-block .outofstockbtn").click(function () {
                var stockhrefval = $('#product-block .outofstockbtn').attr("href");
                tbs.core.quickshop.triggerManageOutOfStock(stockhrefval);
            });

            /* RESIZE */
            $(window).resize(function () {
                tbs.product.manageProductAddNav();
                tbs.product.manageSecondNavDisplay();
                tbs.core.manageAdvertBlocks();
                tbs.core.microbasket.resizeMicrobasket();
            });
			$("#CrossSellContent a[id^=CrossSellProd]").click(function (e) {
                tbs.product.fnAdobeProductCrossSell();
            });
        }
    } // product
});
$(tbs.product.onReady);
