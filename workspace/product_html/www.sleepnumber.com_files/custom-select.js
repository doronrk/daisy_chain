/* jshint camelcase: false */
'use strict';

// Asyncronous with module loading
require(['main'], function() {
    require(['jquery', 'domReady', 'customSelect'], function($, domReady) {
        domReady(function() {
            var $modalCustomSelectBox = $('.js_modal-custom-select select'),
            $customSelectBox = $('.js_custom-select select');
            $customSelectBox.each(function() {
                // If not a color dropdown
                if (!(/COLOR/i).test($(this).closest('label').find('.label-text').text())) {
                    $(this).customSelect();
                }
                else {

                    // Handle custom color dropdown

                    // Cache the number of options
                    var $this = $(this),
                        numberOfOptions = $(this).children('option').length;

                    // Hides the select element
                    $this.addClass('hide');

                    // Add needed z-index to caret icon
                    $this.closest('.custom-select-container').find('.custom-select-icon').css('z-index', 3);

                    // Wrap the select element in a div
                    $this.wrap('<div class="select"></div>');

                    // Insert a styled div to sit over the top of the hidden select element
                    $this.after('<div class="styledSelect"></div>');

                    // Cache the styled div
                    var $styledSelect = $this.next('div.styledSelect');

                    // Show the first select option in the styled div
                    $styledSelect.text($this.children('option').eq(0).text());

                    // Insert an unordered list after the styled div and also cache the list
                    var $list = $('<ul />', {
                        'class': 'color-options-list'
                    }).insertAfter($styledSelect);

                    // Insert a list item into the unordered list for each select option
                    var image;
                    for (var i = 0; i < numberOfOptions; i++) {
                        if ($this.children('option').eq(i).data('img')) {
                            var imageObj = {
                                src: $this.children('option').eq(i).data('img'),
                                alt: $this.children('option').eq(i).data('img'),
                                height: '10px',
                                width: '20px'
                            };
                            imageObj['class'] = 'color-select-image';
                            var liObj = {
                                text: $this.children('option').eq(i).text(),
                                rel: $this.children('option').eq(i).val()
                            };
                            liObj['class'] = 'color-select-list-item';
                            image = $('<img />', imageObj);
                            $('<li />', liObj).append(image).appendTo($list);
                        }
                        else {
                            $('<li />', {
                                text: $this.children('option').eq(i).text(),
                                rel: $this.children('option').eq(i).val()
                            }).appendTo($list);
                        }

                    }

                    // Cache the list items
                    var $listItems = $list.children('li');

                    if ($(this).attr('disabled')) {
                        $styledSelect.off('click');
                        $styledSelect.addClass('customSelectDisabled');
                        // Show the first select option in the styled div
                        $styledSelect.text($this.children('option').eq(0).text());
                    }
                    else {
                        $styledSelect.removeClass('customSelectDisabled');
                        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
                        $styledSelect.off('click').on('click', function (e) {
                            e.stopPropagation();
                            $(this).toggleClass('active').next('ul.color-options-list').toggle();
                        });
                    }



                    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
                    // Updates the select element to have the value of the equivalent option
                    $listItems.on('click', function (e) {
                        e.stopPropagation();
                        $styledSelect.html($(this).html()).removeClass('active');
                        $this.val($(this).attr('rel'));
                        $list.hide();
                        $this.trigger('change');
                    });

                    $('.js_custom-select .custom-select-icon').on('click', function (e) {
                        e.stopPropagation();
                        $styledSelect.toggleClass('active');
                        $list.toggle();
                    });


                    // Hides the unordered list when clicking outside of it
                    $(document).on('click', function () {
                        $styledSelect.removeClass('active');
                        $list.hide();
                    });

                    $this.on('update', function() {
                        var $this = $(this),
                        numberOfOptions = $(this).children('option').length;

                        // Show the first select option in the styled div
                        $styledSelect.text($this.children('option').eq(0).text());

                        if ($(this).attr('disabled')) {
                            $styledSelect.off('click');
                            $styledSelect.addClass('customSelectDisabled');
                            // Show the first select option in the styled div
                            $styledSelect.text($this.children('option').eq(0).text());
                        }
                        else {
                            $styledSelect.removeClass('customSelectDisabled');
                            // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
                            $styledSelect.off('click').on('click', function (e) {
                                e.stopPropagation();
                                $(this).toggleClass('active').next('ul.color-options-list').toggle();
                            });
                        }

                        // Empty options from select
                        $('.color-options-list').empty();

                        // Insert a list item into the unordered list for each select option

                        var image;
                        for (i = 0; i < numberOfOptions; i++) {
                            if ($this.children('option').eq(i).data('img')) {
                                var imageObj = {
                                    src: $this.children('option').eq(i).data('img'),
                                    alt: $this.children('option').eq(i).data('img'),
                                    height: '10px',
                                    width: '20px'
                                };
                                imageObj['class'] = 'color-select-image';
                                var liObj = {
                                    text: $this.children('option').eq(i).text(),
                                    rel: $this.children('option').eq(i).val()
                                };
                                liObj['class'] = 'color-select-list-item';
                                image = $('<img />', imageObj);
                                $('<li />', liObj).append(image).appendTo('.color-options-list');
                            }
                            else {
                                $('<li />', {
                                    text: $this.children('option').eq(i).text(),
                                    rel: $this.children('option').eq(i).val()
                                }).appendTo('.color-options-list');
                            }

                        }

                        // Cache the list items
                        var $listItems = $('.color-options-list').children('li');

                        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
                        // Updates the select element to have the value of the equivalent option
                        $listItems.off('click').on('click', function (e) {
                            e.stopPropagation();
                            $styledSelect.html($(this).html()).removeClass('active');
                            $this.val($(this).attr('rel'));
                            $list.hide();
                            $this.trigger('change');
                        });
                    });

                }
            });


            if ($modalCustomSelectBox.length > 0) {
                $modalCustomSelectBox.customSelect();
            }
        });
    });
});
