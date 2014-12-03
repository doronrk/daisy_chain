$.extend({
    getData: function (url, inputdata, callback) {
       if (inputdata == null) {
            return null;
        }
        if (url == null) {
            return null;
        }
       
        var result = null;
        $.ajax({
            url: url,
            type: "POST",
            data: inputdata,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data) {
                if (data != null) {
                    if (data.d == null) {
                        return null;
                    }
                    result = data;
                    if (typeof callback === "function")
                        callback(result);
                }
                $('.loading_anim').hide();
                
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $('.loading_anim').hide();
            }
        });
        return result;
    }
});
