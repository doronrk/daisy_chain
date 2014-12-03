/* global ACC:false */
/* global require:false */
/* jshint unused:false */
/* jshint camelcase:false */
/* jshint browser:true */
/* jslint node: true */

'use strict';

// Asyncronous with module loading
require(['main'], function() {
    require(['jquery', 'domReady', 'jqueryUIAutocomplete'], function($, domReady) {
        domReady(function() {
            ACC.autocomplete = {

                bindAll: function()
                {
                    this.bindSearchAutocomplete();
                },

                bindSearchAutocomplete: function()
                {
                    $( '#search' ).autocomplete({
                        source: function( request, response ) {
                            $.getJSON(
                                ACC.autocompleteUrl,
                                {
                                    term : $('#search').val()
                                },
                                function(data) {
                                    response(data);
                                }
                            );
                        },
                        minLength: 2,
                        open: function(event, ui) {
                            $(this).autocomplete('widget').zIndex(10);
                            $('.type-ahead').css('border-bottom', '0').css('border-bottom-left-radius', '0').css('border-bottom-right-radius', '0');

                            var currentSearchResult = $('.ui-autocomplete li:eq(0)').addClass('active');

                            $('#search').keyup( function ( e ) {
                                if ( e.which === 38 && currentSearchResult.prev().length === 1 ) {
                                    console.log('prev');
                                    currentSearchResult.removeClass('active');
                                    currentSearchResult = currentSearchResult.prev();
                                    $('#search').val(currentSearchResult.text());
                                    currentSearchResult.addClass('active');
                                }
                                else if ( e.which === 40 && currentSearchResult.next().length === 1 ) {
                                    console.log('next');
                                    currentSearchResult.removeClass('active');
                                    currentSearchResult = currentSearchResult.next();
                                    $('#search').val(currentSearchResult.text());
                                    currentSearchResult.addClass('active');
                                }
                            });
                        },
                        close: function(event, ui) {
                            $('.type-ahead').css('border-bottom', '2px solid #333').css('border-bottom-left-radius', '13px').css('border-bottom-right-radius', '13px');

                            $('#search').unbind('keyup');
                        },
                        focus: function( event, ui ) {return false;},
                        select: function(event, ui) {
                            if(ui.item) {
                                // IE8 fix for .trim()
                                if (!String.prototype.trim) {
                                    String.prototype.trim = function() {
                                        return this.replace(/^\s+|\s+$/g, '');
                                    };
                                }
                                $('#search').val(ui.item.value.trim());
                            }
                            document.forms.search_form.submit();
                        },
                        autoFocus: false,
                        create: function () {
                            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                                return $('<li class="autocomplete-list-item">')
                                    .append('<a class="autocomplete-list-link">' + item.value + '</a>')
                                    .appendTo(ul);
                            };
                        }

                    });
                }

            };

            ACC.autocomplete.bindAll();

        });
    });
});