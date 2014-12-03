
// Globals
var templateDirectory = "Themes/BobbyJones/Angular/SwatchSelect/Templates";
var swatchDropDownHasNullOption = true;
var swatchDropDownShowNullOption = false;
var swatchDropDownNullOptionLabel = "Not selected";
var swatchDropDownName = (function () {
    var name = "";
    switch (window.location.host) {
        case "shop.bobbyjones.localhost":
            var name = "lstAttribute59";
            //var name = "lstAttribute103";
            break;
        case "shop.bobbyjones.com":
        case "bobbyjones.princetennis.com":
        case "shop.bobbyjones.princetennis.com":
            var name = "lstAttribute59";
            break;
        default:
            // Unkown
            break;
    }
    return name;
})();
var swatchDropDownSelector = ".OrderingOptions #Attributes select[data-name='{0}']".replace("{0}", swatchDropDownName);
var swatchDropDownOptions = (function () {
    var options = jQuery(swatchDropDownSelector + " option");
    var opt = [];
    options.each(function (index, option) {
        opt.push({
            index: index,
            value: option.value,
            label: !(swatchDropDownHasNullOption && index == 0) ?  option.text : swatchDropDownNullOptionLabel
        });
    });
    return opt;
})();
var swatchDropDownOptions_By_ZNodeAttributeID = (function () {
    var assoc = {};
    for (var optionIndex = 0; optionIndex < swatchDropDownOptions.length; optionIndex++) {
        var option = swatchDropDownOptions[optionIndex];
        assoc[option.value] = option;
    }
    return assoc;
})();

// Directive
app.directive('swatchPicker', function ($timeout) {
    return {
        templateUrl: templateDirectory + '/SwatchPicker.html'
        , transclude: true
        , controller: function ($scope) {

            // NOTE: This only works for a single (per-page) implementation of the swatch picture
            $scope.options = swatchDropDownOptions;
            $scope.hideFirstOption = swatchDropDownHasNullOption && !swatchDropDownShowNullOption;
            $scope.choiceMade = function () {
                $timeout(function () {
                    jQuery(swatchDropDownSelector).trigger("change");
                });
            };
            $scope.choiceObject = function () {
                return swatchDropDownOptions_By_ZNodeAttributeID[$scope.choice];
            };

            var BobbyJonesColorId = function (choice) {
                // Return everything before the first dash
                var content = "";
                var defaultValue = "-1";
                var label = swatchDropDownOptions_By_ZNodeAttributeID[choice].label;
                if (label != swatchDropDownNullOptionLabel) {
                    var dashIndex = label.indexOf("-");
                    if (dashIndex != -1) {
                        content += label.substring(0, dashIndex);
                    }
                    else {
                        content += defaultValue;
                    }
                }
                else {
                    content += defaultValue;
                }
                return content;
            };
            var BobbyJonesColorName = function (choice) {
                // Get everything after the first dash (assuming dashIndex + 1 exists)
                // Add a space before each capital letter
                var content = "";
                var label = swatchDropDownOptions_By_ZNodeAttributeID[choice].label;
                if (label != swatchDropDownNullOptionLabel) {
                    var dashIndex = label.indexOf("-");
                    if (dashIndex != -1) {
                        var colorName = label.substring(dashIndex + 1);
                        colorName = colorName.replace(/([A-Z])/g, " $1");
                        content += colorName;
                    }
                    else {
                        content += label;
                    }
                }
                else {
                    content += label;
                }
                return content;
            };
            var BobbyJonesSelectedColorLabel = function (choice) {
                var content = "";
                var label = swatchDropDownOptions_By_ZNodeAttributeID[choice].label;
                if (label != swatchDropDownNullOptionLabel) {
                    content += BobbyJonesColorName(choice) + " (" + BobbyJonesColorId(choice) + ")";
                }
                else {
                    content += label;
                }
                return content;
            };
            $scope.selectedColorLabel = BobbyJonesSelectedColorLabel;

        }
    };
});

// Run
app.run(function ($rootScope, $compile) {

    function initSwatchPicker() {
        // Initialize the ASP.NET DropDown with the necessary HTML markup to work with AngularJS
        // NOTE: The dropdown is used as a model
        jQuery(swatchDropDownSelector).parents(".OptionValue").attr("swatch-picker", "");
        jQuery(swatchDropDownSelector).attr("ng-model", "$parent.choice");
    }

    // Initialize drop-down choice for first time
    initSwatchPicker();

    // Initialize the necessary HTML markup to work with AngularJS
    jQuery(swatchDropDownSelector).attr('ng-init', "$parent.choice=0");

    // ASP.NET asynchronous postback handler
    var mgr = Sys.WebForms.PageRequestManager.getInstance();
    mgr.add_endRequest(function (sender, args) {

        // Re-run update on subsequent ASP.Net AJAX changes
        // THIS MUST COME BEFORE ANGULARJS COMPILE()
        gallerySwatchify.updateGallery();

        // Ok, so ASP.NET cleared out our HTML (on each asynchronous postback of the respective panel)
        // We need to re-initialize the DropDown control
        initSwatchPicker();

        // Then re-compile the AngularJS markup, so AngularJS knows about the changes
        var swatchDropDownElement = jQuery(swatchDropDownSelector).parents(".OptionValue");
        $compile(swatchDropDownElement)($rootScope);

    });

    // Initialize Gallery Swatchify (as a global variable)
    var productElement = new ProductElement("#ProductDetail");
    gallerySwatchify = new GallerySwatchify(productElement, swatchDropDownSelector);

    // Update gallery for first time
    gallerySwatchify.updateGallery();

});
