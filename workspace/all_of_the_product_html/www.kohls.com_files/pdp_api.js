(function() {

    var AjaxPDP = window.AjaxPDP = {};

    /**
     * Add item to shopping cart via Ajax POST request
     * @param pdpFormSelector - for example '.aadToBag_product'
     * @param successCallback - render shopping cart overlay using
     * @param errorCallback
     */
    AjaxPDP.addItemToBag = function(pdpFormSelector, successCallback, errorCallback) {
        var $form = $(pdpFormSelector),
            formData = $form.serializeArray();
		$.ajax({
            url: $form.attr('action'),
            type: "POST",
            data: formData,
            dataType: "application/json",
            error: function (data) {
            	if (data.status == 200) {
                    var responseJson = jQuery.parseJSON(data.responseText);
                    successCallback(responseJson);
                } else {
                    errorCallback(data);
                }

            }
        });
        //trAjax.post($form, formData, function(response) {pdpJsonData = response; successCallback(response);}, errorCallback);
    };

    /**
     * Add item to shopping cart via Ajax POST request
     * @param pdpFormSelector - for example '.aadToBag_product'
     * @param successCallback
     * @param errorCallback
     */
    AjaxPDP.updateItemInBag = function(pdpFormSelector, successCallback, errorCallback) {
        var $form = $(pdpFormSelector),
            formData = $form.serializeArray();
		$.ajax({
            url: $form.attr('action'),
            type: "POST",
            data: formData,
            dataType: "application/json",
            error: function (data) {
            	if (data.status == 200) {
                    var responseJson = jQuery.parseJSON(data.responseText);
                    successCallback(responseJson);
                } else {
                    errorCallback(data);
                }

            }
        });
        //trAjax.post($form, formData, function(response) {pdpJsonData = response; successCallback(response);}, errorCallback);
    };

}) ();