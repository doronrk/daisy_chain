/* jshint camelcase: false */
'use strict';

// Asyncronous with module loading
require(['main'], function() {
    require(['jquery', 'domReady', 'app', 'elevateZoom', 'iCheck'], function($, domReady, app) {
        app.prototypes();
        domReady(function() {
            // ----- Product Canvas -----

            var $productCanvas = $('#product-canvas-image'),
                $zoomButton = $('.mag-button'),
                $plusButton = $('.plus-button'),
                // $featureIndicator = $('.product-feature-indicator'),
                zoomActive = false,
                plusActive = false,
                coordinatesJson,
                blowoutFeatureItems = [],
                blowoutFeatureItemsOffset = [],
                initialView = 'fortyfive', // first thumb displayed in group.
                activeView,
                targetView,
                targetViewObject,
                zoomConfig = {
                    zoomType: 'window',
                    gallery: 'product-canvas-thumbs',
                    galleryActiveClass: 'active-product-canvas-thumb',
                    removeZoomOnload: true,
                    zoomWindowWidth: 400,
                    zoomWindowHeight: 300,
                    zoomWindowOffetx: -200,
                    zoomWindowOffety: 50,
                    borderSize: 1,
                    borderColour: '#ccc'
                },
                showElements = {
                    'z-index': '9',
                    'visibility': 'visible',
                    'opacity': '1'
                },
                hideElements = {
                    'z-index': '0',
                    'visibility': 'hidden',
                    'opacity': '0'
                };
            

            if(window.location.hash) {
				  if(window.location.hash == '#BVRRWidgetID'){
					  
					  var $tab = $('#scroll-to-reviews');
					
					  $('html, body').animate({
							scrollTop: $tab.offset().top
						}, 1000);
					
					  $('.js_tab-content').addClass('hideTab');
					  $('.js_tab-nav-item').removeClass('active');
					
					  if( $tab.closest('.js_tab-nav-item').hasClass('active') ) {
						  return;
					  } else {
						  $tab.closest('.js_tab-nav-item').addClass('active');
						  $('.js_tab-content').addClass('hideTab').removeClass('showTab');
						  $('[data-tab-index=' + $tab.data('tab-index') + ']').removeClass('hideTab').addClass('showTab');
					  }
				}
            }
            
            var updateAltTag = function() {
                window.setTimeout(function() {
                    var newAltTag = $('.product-canvas-thumbs .active-product-canvas-thumb img').attr('alt');
                    $productCanvas.attr('alt', '');
                    $productCanvas.attr('alt', newAltTag);
                }, 500);
                
            }

            // if the data exists on the page, assign it to 'coordinatesJson'
            if ($('#feature-coordinates-json').html()) {
                coordinatesJson = JSON.parse($('#feature-coordinates-json').html());
            }

            // Intialize
            $productCanvas.elevateZoom(zoomConfig); //initialise zoom

            // On page load, set the initial thumb view to have the active class
            $('#' + initialView + '').addClass('active-product-canvas-thumb');
            updateAltTag();

            // custom event to reset toggle on thumb clicka
            $(window).on('canvasGallery:resetToggles', function() {
                resetThumbs();
                updateAltTag();
            });

            var destroyZoom = function() {
                $.removeData($productCanvas, 'elevateZoom'); //remove zoom instance from image
                $('.zoomContainer').remove(); // remove zoom container from DOM
            };

            // Remove all plus/zoom functionality when a new thumb is chosen
            var resetThumbs = function() {
                if (plusActive) {
                    $plusButton.removeClass('active');
                    $plusButton.find('i').removeClass('icon-minus').addClass('icon-plus');
                    plusActive = false;
                }

                if (zoomActive) {
                    $zoomButton.removeClass('active');
                    zoomActive = false;
                    destroyZoom(); // remove zooming capability
                }

                hideFeatureContent(); // hide any visible feature content
            };

            // Handle zoom button clicks
            $zoomButton.on('click', function() {

                zoomActive = $(this).hasClass('active') ? false : true;

                if ($('.plus-button').hasClass('active')) {
                    $plusButton.removeClass('active');
                    $plusButton.find('i').removeClass('icon-minus').addClass('icon-plus');
                }

                if (zoomActive) {
                    zoomConfig.removeZoomOnload = false;
                    destroyZoom(); // remove zooming capability

                    var activeZoomImage = $('.active-product-canvas-thumb').data('zoom-image'); // grab the active element's zoom image
                    $productCanvas.data('zoom-image', activeZoomImage); // Feed it to the $productCanvas
                    $productCanvas.elevateZoom(zoomConfig); // then initialize zoom

                    $zoomButton.addClass('active');
                    hideFeatureContent(); // hide any visible feature content
                    plusActive = false; // set plusActive to false since zoomActive is true
                } else {
                    $zoomButton.removeClass('active');
                    destroyZoom(); // remove zooming capability
                }
            });

            // Handle plus button clicks
            $plusButton.on('click', function() {

                plusActive = $(this).hasClass('active') ? false : true;

                activeView = $('.active-product-canvas-thumb').attr('id'); // set the activeView variable

                if ($('.mag-button').hasClass('active')) {
                    $zoomButton.removeClass('active');
                    destroyZoom(); // remove zooming capability
                }

                if (plusActive) {
                    $plusButton.addClass('active');
                    $plusButton.find('i').removeClass('icon-plus').addClass('icon-minus');
                    populateContent(); // populate content
                    app.staticModalHandler(); // handle the modal
                } else {
                    $plusButton.removeClass('active');
                    $plusButton.find('i').removeClass('icon-minus').addClass('icon-plus');
                    hideFeatureContent(); // hide any visible feature content
                }
            });

            var parseData = function() {
                // reset variables
                targetView = undefined;
                targetViewObject = undefined;

                for (var view in coordinatesJson) {
                    if (view === activeView) {
                        targetView = view;
                        targetViewObject = coordinatesJson[targetView];
                    }
                }
            };

            var populateContent = function() {
                var $featureItemsContainer = $('#product-feature-container');

                parseData(); // parse the JSON object to get the targetViewObject
                $featureItemsContainer.empty(); // make sure the container is empty before adding elements to the DOM

                // Decode HTML strings
                var htmlDecode = function(input){
                    var e = document.createElement('div');
                    e.innerHTML = input;
                    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
                };

                if (targetViewObject !== undefined) { // only populate if there's data for that view

                    for (var feature in targetViewObject) {
                        var featureItemData = targetViewObject[feature],
                            featureItem = $('<div class="product-feature-coordinates"><div class="relative-container"><a href="#" class="product-feature-indicator"><span class="icon">+</span></a><div class="product-feature-content"></div></div></div>');

                        if (activeView === 'blowout') {
                            featureItem.addClass('blowout-layout');
                        }

                        $featureItemsContainer.append(featureItem); // for each feature, add HTML to the DOM

                        if (featureItemData.x && featureItemData.y) {
                            featureItem.css({
                                'top': featureItemData.y + 'px',
                                'left': featureItemData.x + 'px'
                            });
                        }

                        if (featureItemData.title) {
                            featureItem.find('.product-feature-indicator').append('<span class="title">' + featureItemData.title + '</span>');
                        }

                        if (featureItemData.image) {
                            featureItem.find('.product-feature-content').append('<img class="image" src="' + featureItemData.image + '"/>');
                        }

                        if (featureItemData.description) {
                            featureItem.find('.product-feature-content').append('<p class="description">' + htmlDecode(featureItemData.description.replace(/&amp;/g, '&')) + '</p>');
                        }

                        if (featureItemData.videoUrl) {
                            featureItem.find('.product-feature-content').append('<div class="videoContainer"><a href="#" class="videoUrl" data-static-modal-name="authored-video-modal" data-video-url="' + featureItemData.videoUrl + '"><span class="video-color-overlay"></span><span class="video-button-overlay"></span><img class="videoThumb"/></a><p class="video-text">See how it works</p></div>');
                        }

                        if (featureItemData.videoThumb) {
                            featureItem.find('.videoThumb').attr('src', featureItemData.videoThumb);
                        }

                        if (featureItemData.logo) {
                            featureItem.find('.product-feature-content').prepend('<img class="logo" src="' + featureItemData.logo + '"/>');
                        }
                    }

                    if (activeView === 'blowout') {
                        $('.product-feature-coordinates').each(function(index) {
                            // add blowout line images
                            if (index <= 0) {
                                $(this).find('.relative-container').prepend('<img src="/_ui/desktop/common/images/t007-product-detail/blowout-lines-1.png" height="98" width="67" class="blowout-lines">');
                                $(this).find('.blowout-lines').css('top', '-36px');
                            } else {
                                $(this).find('.relative-container').prepend('<img src="/_ui/desktop/common/images/t007-product-detail/blowout-lines-2.png" height="50" width="67" class="blowout-lines">');
                            }

                            // save all the top offsets to use in animateBlowoutView()
                            var offset = parseInt($(this).css('top'), 10);
                            blowoutFeatureItems.push($(this));
                            blowoutFeatureItemsOffset.push(offset);
                        });
                    }
                }
            };

            // Handle feature indicator clicks
            $('#product-feature-container').on('click', '.product-feature-indicator', function(e) {
                e.preventDefault();
                toggleFeatureContent($(this));

                if (activeView === 'blowout') {
                    animateBlowoutView($(this));
                }
            });

            var animateBlowoutView = function(context) {
                var $activeBubble = context.closest('.product-feature-coordinates'),
                    $nextBubble = $activeBubble.nextAll(':visible').eq(0),
                    $activeBubbleTopOffset = parseInt($activeBubble.css('top'), 10),
                    $nextBubbleTopOffset = parseInt($nextBubble.css('top'), 10),
                    activeBubbleHeight = context.siblings('.product-feature-content').height() + 24, // 22px is height of other elements
                    availableSpace = 0,
                    heightDifference;

                // only assign if it's not the last bubble in the group
                if ($nextBubble.length > 0) {
                    availableSpace = $nextBubbleTopOffset - $activeBubbleTopOffset;
                    heightDifference = activeBubbleHeight - availableSpace;
                }

                // on every click, reset bubbles to their original top offset
                $(blowoutFeatureItems).each(function(index, element) {
                    element.css('top', blowoutFeatureItemsOffset[index]);
                });

                // if the height is more than the available space
                if (availableSpace > 0 && availableSpace < activeBubbleHeight) {

                    // loop through each feature
                    $(blowoutFeatureItems).each(function(index, element) {

                        // find the active feature, and create an array of all subsequent features
                        if (element.find('.product-feature-indicator').hasClass('featureActive')) {
                            var activeFeatureIndex = index + 1;
                            var elementsToSlide = blowoutFeatureItems.slice(activeFeatureIndex);

                            // loop through the new array
                            $(elementsToSlide).each(function(index, element) {
                                var currentTopOffset = parseInt(element.css('top'), 10);
                                var newTopOffset = currentTopOffset + heightDifference + 'px';

                                // assign a new top offset to each array item
                                element.css('top', newTopOffset);
                            });
                        }
                    });
                }

            };

            var hideFeatureContent = function() {
                // if any feature bubbles are showing, hide them
                if ($('.product-feature-coordinates').length > 0) {
                    $('.product-feature-coordinates').fadeOut('fast');
                }

                // if any feature content is visible, hide it
                if ($('.product-feature-content').css('visibility', 'visible')) {
                    $('.product-feature-content').css(hideElements);
                }

                // change the icons to '+'
                if ($('.icon').text('-')) {
                    $('.icon').text('+').css('z-index', '1');
                }

                // if blowout lines exist, hide them
                if (activeView === 'blowout') {
                    if ($('.blowout-lines:visible')) {
                        $('.blowout-lines').fadeOut('fast');
                    }

                    if ($('.product-feature-indicator').hasClass('featureActive')) {
                        $('.product-feature-indicator').removeClass('featureActive');
                    }
                }
            };

            var toggleFeatureContent = function(context) {
                var $this = context,
                    $thisIcon = $this.find('.icon'),
                    $contentContainer = $this.siblings('.product-feature-content'),
                    blowoutView = $this.closest('.product-feature-coordinates').hasClass('blowout-layout');

                if (activeView !== 'blowout') {
                    // set the proper top margin on each container
                    $contentContainer.css({
                        'margin-top': -($contentContainer.height() / 2) + 'px'
                    });
                }

                // if the container is hidden, show it
                if ($contentContainer.css('visibility') === 'hidden') {
                    $contentContainer.css(showElements);

                    $thisIcon.text('-').css('z-index', '10');

                    // if blowout-lines exist, show them
                    if (blowoutView) {
                        $this.siblings('.blowout-lines').fadeIn('fast');
                        $this.addClass('featureActive');
                    }

                }
                // else hide it
                else {
                    $contentContainer.css(hideElements);

                    $thisIcon.text('+').css('z-index', '1');

                    // if blowout-lines exist, hide them
                    if (blowoutView) {
                        $this.siblings('.blowout-lines').fadeOut('fast');
                        $this.removeClass('featureActive');
                    }
                }

                // handle hiding all other containers/blowout-lines if one is showing
                $('.product-feature-indicator').not($this).find('.icon').text('+').css('z-index', '1');
                $('.product-feature-content').not($contentContainer).css(hideElements);

                if (blowoutView) {
                    $('.product-feature-indicator').not($this).siblings('.blowout-lines').fadeOut('fast');
                    $('.product-feature-indicator').not($this).removeClass('featureActive');
                }
            };

            // ----- End of Product Canvas -----

            // ----- Populate JSON Data -----
            var hideParent = function(ele) {
                var parentContainer;
                parentContainer = ele.parent();
                parentContainer.addClass('hide');
            };
            var showParent = function(ele) {
                var parentContainer;
                parentContainer = ele.parent();
                parentContainer.removeClass('hide');
            };
            // Parse data and populate pricing for PDPs
            var populatePrice = function(data, form, isRange) {
                var mainPrice = form.find('.price .value'),
                    totalSavings = form.find('.total-savings .value'),
                    endDate = form.find('.end-date .value'),
                    regPrice = form.find('.regular-price .value'),
                    hiddenPrice = form.find('.price .hidden-value'),
                    financingMsg = form.find('.financing .value'),
                    financingBool = form.find('.financing input'),
                    orderMsg = form.find('.order-message .value');

                if (!data.code || isRange) {
                    var minArray = data.minSalePrice.split('.'),
                        maxArray = data.maxSalePrice.split('.'),
                        minRegPriceArray = data.minRegPrice.split('.'),
                        maxRegPriceArray = data.maxRegPrice.split('.');
                    if (data.minSalePrice === data.maxSalePrice) {
                        mainPrice.html('$' + parseInt(minArray[0], 10).formatMoney(0, '', ',') + '.<sup>' + minArray[1] + '</sup>');
                    } else {
                        mainPrice.html('$' + parseInt(minArray[0], 10).formatMoney(0, '', ',') + '.<sup>' + minArray[1] + '</sup>' + ' - ' + '$' + parseInt(maxArray[0], 10).formatMoney(0, '', ',') + '.<sup>' + maxArray[1] + '</sup>');
                    }

                    if (data.minRegPrice === data.maxRegPrice) {
                        regPrice.html('$' + parseFloat(maxRegPriceArray[0]).formatMoney(0, '.', ',') + '.<sup>' + maxRegPriceArray[1] + '</sup>');
                        hiddenPrice.html('$' + parseFloat(maxRegPriceArray[0]).formatMoney(0, '.', ',') + '.<sup>' + maxRegPriceArray[1] + '</sup>');
                    } else {
                        regPrice.html('$' + parseFloat(minRegPriceArray[0]).formatMoney(0, '.', ',') + '.<sup>' + minRegPriceArray[1] + '</sup> - ' + '$' + parseFloat(maxRegPriceArray[0]).formatMoney(0, '.', ',') + '.<sup>' + maxRegPriceArray[1] + '</sup>');
                        hiddenPrice.html('$' + parseFloat(minRegPriceArray[0]).formatMoney(0, '.', ',') + '.<sup>' + minRegPriceArray[1] + '</sup> - ' + '$' + parseFloat(maxRegPriceArray[0]).formatMoney(0, '.', ',') + '.<sup>' + maxRegPriceArray[1] + '</sup>');
                    }
                } else {
                    var priceArray = data.salePrice.split('.'),
                        regPriceArray = data.regPrice.split('.');
                    mainPrice.html('$' + parseInt(priceArray[0], 10).formatMoney(0, '', ',') + '.<sup>' + priceArray[1] + '</sup>');
                    regPrice.html('$' + parseFloat(data.regPrice).formatMoney(2, '.', ','));
                    hiddenPrice.html('$' + parseFloat(regPriceArray[0]).formatMoney(0, '.', ',') + '.<sup>' + regPriceArray[1] + '</sup>');
                }

                if (data.minRegPrice === data.minSalePrice && data.maxRegPrice === data.maxSalePrice && ((data.minRegPrice !== 'n/a' && data.minSalePrice !== 'n/a') || data.regPrice === data.salePrice)) {
                    hideParent(regPrice);
                }
                else {
                    showParent(regPrice);
                }

                if (data.minSalePrice !== data.maxSalePrice && data.minSavings !== data.maxSavings) {
                    totalSavings.html('$' + parseFloat(data.minSavings).formatMoney(2, '.', ',') + ' - ' + '$' + parseFloat(data.maxSavings).formatMoney(2, '.', ','));
                    showParent(totalSavings);
                } else if (data.savings !== '' && data.savings !== '0.00') {
                    totalSavings.html('$' + parseFloat(data.savings).formatMoney(2, '.', ','));
                    showParent(totalSavings);
                } else {
                    hideParent(totalSavings);
                }

                if (data.saleExpiryMessage !== '') {
                    orderMsg.html(data.saleExpiryMessage);
                    showParent(orderMsg);
                } else {
                    hideParent(endDate);
                    hideParent(orderMsg);
                }

                if (data.saleEndDate !== '') {
                    endDate.html(data.saleEndDate);
                    showParent(endDate);
                } else {
                    hideParent(endDate);
                }

                if (data.financingMessage) {
                    financingMsg.html(data.financingMessage);
                }
                else {
                    hideParent(financingMsg);
                }

                // if (data.isFinancingSelected === 'true') {
                //     financingBool.iCheck('check');
                // } else {
                //     financingBool.iCheck('uncheck');
                // }
            };
            var wishlistParentForm,
                financingInput;
            if ($('#pdp-json').length > 0) {
                // Grab JSON Data and select box to populate
                var jsonString = $('#pdp-json').html(),
                    selectBoxEle = $('select[name=selectBedSize]'),
                    jsonData = JSON.parse(jsonString),
                    selectOptionsArray = [],
                    selectValueObj;
                wishlistParentForm = $('#select-bed-size');
                financingInput = wishlistParentForm.find('.financing input');

                financingInput.on('ifChecked', function() {
                    wishlistParentForm.find('.total-savings').addClass('disable');
                    wishlistParentForm.find('.regular-price').addClass('disable');
                    wishlistParentForm.find('.price .value').addClass('hide');
                    wishlistParentForm.find('.price .hidden-value').removeClass('hide');
                });

                financingInput.on('ifUnchecked', function() {
                    wishlistParentForm.find('.total-savings').removeClass('disable');
                    wishlistParentForm.find('.regular-price').removeClass('disable');
                    wishlistParentForm.find('.price .value').removeClass('hide');
                    wishlistParentForm.find('.price .hidden-value').addClass('hide');
                });

                // Iterate over size property array and create select box options
                $(jsonData.size).each(function() {
                    var newOption;
                    if (this.name === 'Queen') {
                        newOption = '<option value="' + this.name + '" selected>' + this.name + '</option>';
                    }
                    else {
                        newOption = '<option value="' + this.name + '">' + this.name + '</option>';
                    }
                    selectOptionsArray.push(newOption);
                });

                // Add options to select box and update it
                selectBoxEle.html(selectOptionsArray);
                selectBoxEle.trigger('update');

                // Select box change event handler
                selectBoxEle.on('change', function() {
                    var newValue = this.value,
                        bedForm = $('#select-bed-size');
                    if (newValue) {
                        $(jsonData.size).each(function(index) {
                            if (newValue === this.name) {
                                selectValueObj = jsonData.size[index];
                                return;
                            }
                        });
                        // Add JSON data to HTML (templating)
                        // Hidden Input
                        $('#productCodePost').val(selectValueObj.code);
                        $('#wishlist-code').val(selectValueObj.code);
                        populatePrice(selectValueObj, bedForm);
                        if (selectValueObj.purchasable === 'true') {
                            bedForm.find('button[type=submit]').removeAttr('disabled');
                        } else {
                            bedForm.find('button[type=submit]').attr('disabled', 'disabled');
                        }
                    } else {
                        $('#productCodePost').val(jsonData.code);
                        populatePrice(jsonData, bedForm, true);
                        bedForm.find('button[type=submit]').attr('disabled', 'disabled');
                    }
                });

                // Trigger initial change
                selectBoxEle.trigger('change');

            }
            // Pillows and Bedding handler
            else if ($('#select-pillows-bedding').length > 0) {
                wishlistParentForm = $('#select-pillows-bedding');
                financingInput = wishlistParentForm.find('.financing input');

                financingInput.on('ifChecked', function() {
                    wishlistParentForm.find('.total-savings').addClass('disable');
                    wishlistParentForm.find('.regular-price').addClass('disable');
                    wishlistParentForm.find('.price .value').addClass('hide');
                    wishlistParentForm.find('.price .hidden-value').removeClass('hide');
                });

                financingInput.on('ifUnchecked', function() {
                    wishlistParentForm.find('.total-savings').removeClass('disable');
                    wishlistParentForm.find('.regular-price').removeClass('disable');
                    wishlistParentForm.find('.price .value').removeClass('hide');
                    wishlistParentForm.find('.price .hidden-value').addClass('hide');
                });

                var disableSelects = function() {
                    var selects = $('#select-pillows-bedding select').not(':first');
                    selects.each(function() {
                        $(this).attr('disabled', 'disabled').trigger('update');
                    });

                };
                var enableSelect = function(pos, count, selects, value) {
                    if ((pos + 1) <= count && value) {
                        var nextPos = pos + 1;
                        selects.eq(nextPos).removeAttr('disabled').trigger('update');
                    }
                };
                var getAllSelectValues = function(selects) {
                    var valArray = [];
                    selects.each(function() {
                        valArray.push(this.value);
                    });
                    return valArray;
                };
                var fillSelectValues = function(data, pos, value, count, selects) {
                    var htmlArray = [],
                    isStatic = false,
                    optionHTML,
                    staticHTML,
                    selectParent;
                    var pushHTML = function(index, array, staticText) {
                        var currentSelect = $('select.selectOptional' + (index + 1));
                        if (staticText) {
                            selectParent = currentSelect.closest('.custom-select-container').addClass('hide').parent();
                            selectParent.find('.pdp-static-text').remove();
                            currentSelect.find('option').removeAttr('selected');
                            selectParent.append(staticText);
                            enableSelect((index + 1), count, selects, value);
                        }
                        else {
                            currentSelect.closest('.custom-select-container').removeClass('hide').parent().find('.pdp-static-text').remove();
                        }
                        currentSelect.find('option').not(':first').remove();
                        currentSelect.append(array).trigger('update');
                    };
                    // Handles first 3 select boxes
                    if (pos === 0 || pos === 1 || pos === 2) {
                        for (var prop in data) {
                            isStatic = false;
                            if (prop === 'select1' || prop === 'select2' || prop === 'select3') {
                                if (data[prop].values.length === 1 && data[prop].type !== 'size') {
                                    // reset array
                                    htmlArray = [];
                                    staticHTML = '<p class="pdp-static-text">' + data[prop].values[0] + '</p>';
                                    optionHTML = '<option value="' + data[prop].values[0] + '" selected="selected"' + data[prop].values[0] + '</option>';
                                    htmlArray.push(optionHTML);
                                    isStatic = true;
                                }
                                else {
                                    // reset array
                                    htmlArray = [];
                                    var image;
                                    for (var i = 0; i < data[prop].values.length; i++) {
                                        if (data[prop].type === 'color' && data[prop].images) {
                                            image = data[prop].images[i];
                                            optionHTML = '<option value="' + data[prop].values[i] + '" data-img="' + image + '">' + data[prop].values[i] + '</option>';
                                        }
                                        else {
                                            optionHTML = '<option value="' + data[prop].values[i] + '">' + data[prop].values[i] + '</option>';
                                        }
                                        htmlArray.push(optionHTML);
                                        isStatic = false;
                                    }
                                }
                            }
                            if (prop === 'select1') {
                                // enableSelect((pos + 1), count, selects, value);
                            }
                            else if (prop === 'select2') {
                                if (pos !== 1 && pos !== 2) {
                                    pushHTML(1, htmlArray, staticHTML);
                                }
                                else {
                                    enableSelect((pos + 1), count, selects, value);
                                }
                            }
                            else if (prop === 'select3') {
                                if (pos !== 2) {
                                    pushHTML(2, htmlArray, staticHTML);
                                }
                                else {
                                    enableSelect((pos + 1), count, selects, value);
                                }
                            }
                        }
                    }
                };
                var updatePricing = function(data, value) {
                    // Take data and populate HTML pricing feilds
                    var beddingForm = $('#select-pillows-bedding'),
                    isRange = false;
                    // If all select fields are filled out
                    if (data.code) {
                        $('#productCodePost').val(data.code);
                    } else {
                        $('#productCodePost').val('');
                        isRange = true;
                    }
                    if (data.purchasable === 'true' && value) {
                        beddingForm.find('button[type=submit]').removeAttr('disabled');
                    } else {
                        beddingForm.find('button[type=submit]').attr('disabled', 'disabled');
                    }
                    populatePrice(data, beddingForm, isRange);
                };
                var resetSelects = function(pos, count, selects, value) {
                    var resetSelects;
                    if (!value) {
                        resetSelects = selects.eq(pos).closest('.input-select').nextAll('.input-select').find('select');
                    } else {
                        resetSelects = selects.eq(pos).closest('.input-select').next().nextAll('.input-select').find('select');
                    }
                    resetSelects.closest('.custom-select-container').removeClass('hide').parent().find('.pdp-static-text').remove();
                    resetSelects.each(function() {
                        var options = $(this).find('option');
                        $(this).attr('disabled', 'disabled');
                        options.removeAttr('selected');
                        options.find(':first').attr('selected', 'selected');
                        selects.trigger('update');
                    });
                    resetSelects.find('option').removeAttr('selected');
                    resetSelects.find('option:first').attr('selected', 'selected');
                };
                var handleData = function(data, pos, value, count, selects) {
                    fillSelectValues(data, pos, value, count, selects);
                    updatePricing(data, value);
                };
                var buildAjaxParams = function(data, pos) {
                    var dataObj = {};
                    $(data).each(function(index) {
                        if ((index + 1) < data.length) {
                            if (pos === 0 ) {
                                dataObj['selection1'] = data[0];
                            }
                            else if (pos === 1) {
                                dataObj['selection1'] = data[0];
                                dataObj['selection2'] = data[1];
                            }
                            else if (pos === 2) {
                                dataObj['selection1'] = data[0];
                                dataObj['selection2'] = data[1];
                                dataObj['selection3'] = data[2];
                            }
                        }
                        else {
                            dataObj['selection1'] = data[0];
                        }
                    });
                    return dataObj;
                };
                var handleAjax = function(value, pos, selectValues, selects, $context) {
                    var dataParams = buildAjaxParams(selectValues, pos);
                    $.ajax({
                        url: window.location.pathname + '/pdpVariantSelection',
                        type: 'GET',
                        dataType: 'json',
                        data: dataParams,
                        beforeSend: function() {
                            var spinnerHTML = '<div class="ajax-spinner"><img src="/_ui/desktop/common/images/spinner.gif" height="16" width="20" /></div>';
                            $context.parent().append(spinnerHTML);
                        }
                    })
                        .done(function(data) {
                            if (data.code) {
                                $('#wishlist-code').val(data.code);
                            } else {
                                $('#wishlist-code').val('');
                            }
                            handleData(data, pos, value, selectValues.length, selects);
                            enableSelect(pos, selectValues.length, selects, value);
                            // remove ajax loader
                            $('.ajax-spinner').remove();
                        })
                        .fail(function() {
                            // remove ajax loader
                            $('.ajax-spinner').remove();
                        });
                };
                var selectChangeHandler = function(onPageLoad) {
                    var selects = $('#select-pillows-bedding select');
                    selects.each(function(index) {
                        $(this).on('change', function() {
                        	if ($(this).closest('label').find('.label-text').text().indexOf('Quantity') === -1) {
                                var value = this.value,
                                pos = index;
                                resetSelects(pos, selects.length, selects, value);
                                var selectValues = getAllSelectValues(selects);
                                handleAjax(value, pos, selectValues, selects, $(this));
                            }
                        });
                    });
                    if (onPageLoad) {
                        selects.eq(0).trigger('change');
                    }
                };

                // disable selects
                disableSelects();
                // select box change event handler
                selectChangeHandler();
                // disable submit button if no value is selected
                if (!$('#select-pillows-bedding').find('select:first').val()) {
                    $('#select-pillows-bedding').find('button[type=submit]').attr('disabled', 'disabled');
                }
            }

            // ----- End Populate JSON Data -----

            var $accordionTrigger = $('.js_dropdown-trigger'),
                $scrollToTrigger = $('.js_scroll-to-trigger');

            $accordionTrigger.on('click', function(e) {
                e.preventDefault();
                accordionToggle($(this));
            });

            $scrollToTrigger.on('click', function(e) {
                e.preventDefault();

                var href = $(this).attr('href');
                var tabParent = $('a' + href).parent('.js_tab-nav-item');
                var tabIndex = $('a' + href).data('tab-index');

                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 1000);

                $('.js_tab-content').addClass('hideTab');
                $('.js_tab-nav-item').removeClass('active');

                if (tabParent.hasClass('active')) {
                    return;
                } else {
                    tabParent.addClass('active');
                    $('.js_tab-content').addClass('hideTab').removeClass('showTab');
                    $('[data-tab-index=' + tabIndex + ']').removeClass('hideTab').addClass('showTab');
                }

                if (href === '#scroll-to-size-chart') {
                    accordionToggle(tabParent.closest('.product-information-container').next('.tab-content-container').find('.size-chart-content'), 'true');
                }
            });

            var accordionToggle = function(context, sizeChart) {
                var $hiddenContent = context.closest('.accordion-item').find('.js_hidden-content'),
                    $triggerIcon = context.closest('.accordion-item').find('.js_dropdown-icon');

                $hiddenContent.toggleClass('hide');

                if (sizeChart === 'true') {
                    $('.js_hidden-content').addClass('hide');
                    $('.size-chart-content').removeClass('hide');
                }

                if (context.closest('.accordion-item').find('.js_hidden-content').hasClass('hide')) {
                    $triggerIcon.text('+');
                } else {
                    $triggerIcon.text('-');
                }
            };

            if ($('#wishlist-form').length > 0) {
                $('#wishlist-form').on('submit', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    var isValid = wishlistParentForm.parsley('isValid');
                    if (isValid) {
                        $(this).off('submit').submit();
                    } else {
                        wishlistParentForm.parsley('validate');
                    }
                });
            }

        });
    });
});