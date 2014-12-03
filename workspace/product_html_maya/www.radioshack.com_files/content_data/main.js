function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}

(function($) {
    $(function() {
        var successMsg = "<p class='success'>Thank You. You have successfully signed up. Check your email for your exclusive coupon code to save $10 on you order today.</p>";
        var showSuccess = getQueryVariable("showsuccess");
       // console.log("SHOWSUCCESS = " + showSuccess);
        if (showSuccess) {
            $(".email-signup").hide();
            $("#footer-email-signup").append(successMsg);
        }
        $(window).bind("pageshow", function() {
            var form = $("#signup");
            form[0].reset();
        });
        var validator = $("#signup").validate({
            debug: true,
            errorClass: "invalid",
            rules: {
                EmailAddress: {
                    required: true,
                    EducationEmail: true
                }
            },
            messages: {
                EmailAddress: {
                    required: "Please enter a valid email"
                }
            },
            submitHandler: function(form) {
                form.submit();
            }
        });
        jQuery.validator.addMethod("EducationEmail", function(email, element) {
            return this.optional(element) || email.match(/^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/);
        }, "Please enter a valid email");
    });
})(jQuery);