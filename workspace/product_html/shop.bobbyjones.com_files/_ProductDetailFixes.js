
var swatchAttributeTypeId = 59;
//var swatchAttributeTypeId = 103;
var swatchAttributeSelector = ".OrderingOptions .AttributeType-{0}".replace("{0}", swatchAttributeTypeId);

function sizeChartPositionFix(chartSelector) {
    jQuery(document).ready(function ($) {

        // Get chart
        var chart = $(chartSelector);

        // Initial append
        $(".OrderingOptions .OptionValue option:first-child:contains(Size)").parents(".Option").append(chart.clone());

        // Re-append whever size changes
        var mgr = Sys.WebForms.PageRequestManager.getInstance();
        mgr.add_endRequest(function (sender, args) {
            $(".OrderingOptions .OptionValue option:first-child:contains(Size)").parents(".Option").append(chart.clone());
            Shadowbox.setup(); // See http://www.codeproject.com/Tips/49100/Using-jQuery-Shadowbox-Inside-ASP-NET-UpdatePanel
        });

    });
}

jQuery(document).ready(function ($) {

    $(".ProductTitle").after($("#ProductDetail .PriceInformationGroup").detach());

    $(".RightPanel br").hide();

    function initPanel() {

        $(".OrderingOptions .QtyPanel").detach().appendTo(".OrderingOptions");

        // Change label (if one exists...i.e. attribute has more than one value)
        $(swatchAttributeSelector + " .OptionLabel").remove();
        $(swatchAttributeSelector).prepend("<div class='OptionLabel'>Select color</div");

        // Hide label
        $(".OrderingOptions .OptionValue option:first-child:contains(Size)").parents(".Option").find(".OptionLabel").hide();
        $(".OrderingOptions .OptionValue option:first-child:contains(Size)").html("Size");

    }
    initPanel();
    var mgr = Sys.WebForms.PageRequestManager.getInstance();
    mgr.add_endRequest(function (sender, args) {
        initPanel();
    });

});
