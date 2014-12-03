(function($) {
    $(document).ready(function() {
        if(!Mage.Cookies.get('hasVisitedWithinTheLast6Months')){
            $.ajax({
                type: "POST",
                url: '//' + location.host + '/newsletter/subscriber/subscribe'
            }).done(function( data ) {
                $.fancybox.open({
                    content  : data,
                    autoSize : true,
                    width    : "450px",
                    height   : "330px",
                    padding  : 0
                });
            });
        }
        var firstVisitExpire = new Date();
        firstVisitExpire.setTime(firstVisitExpire.getTime() + 6*30*24*60*60*1000);
        Mage.Cookies.set('hasVisitedWithinTheLast6Months','1',firstVisitExpire);
    });
})(jQuery);
