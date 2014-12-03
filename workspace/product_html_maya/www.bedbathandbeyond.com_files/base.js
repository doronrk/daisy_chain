(function ($, window, document, undefined) {
    $(function () {
        if ($("#billingAdd")[0]) {
            BBB.validationUtils.localizeAndValidate({
                form: '#billingAdd'
            });
        }

        if ($("div.regsitryItem")[0]) {
            var _fieldMap = {};
            BBB.fn.rAccord.fieldMap = $.extend({}, fieldMap, _fieldMap);

            if ($('#pageWrapper.updateRegistryInfo')[0]) {
                BBB.fn.rAccord.init('update');
            } else {
                BBB.fn.rAccord.init('create');
            }
        }

        // Popular categories height match
        var popCatHt = $('.homePage .popularCategoryList').height() + 5;
        $('.homePage #popularCategory ul').height(popCatHt);
    });
})(jQuery, this, this.document);