/**
 * Copyright 2014 PCM, Inc.
 */
if (typeof PCM == 'undefined') {
    PCM = {};
}

PCM.typeAheadAnimation = function($) {
    var defaultSearchText = "";
    
    var _searchInputFocus = function() {
        if (jQuery("#searchTextInput").val() === defaultSearchText) {
            jQuery("#searchTextInput").val("");
        }
        jQuery("#searchTextInputBg").css({
            backgroundPosition : "-2px -2px",
        });
    }

    var _searchInputBlur = function () {
        if (jQuery("#searchTextInput").val() === defaultSearchText) {
            jQuery("#searchTextInput").val("");
        }
        jQuery("#searchTextInputBg").css({
            backgroundPosition : '-2px -38px',
        });
    }

    var _init = function(inDefaultSearchText){
        jQuery(".wSearch_input").bind("focus", _searchInputFocus);
        jQuery(".wSearch_input").bind("blur", _searchInputBlur);
        defaultSearchText = inDefaultSearchText;
    }
    
    return {
        init : _init
    }
}(jQuery);
