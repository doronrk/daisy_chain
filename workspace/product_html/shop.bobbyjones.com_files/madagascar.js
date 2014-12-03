
(function ($) {

    $(document).ready(function () {

        $('[data-append-to]').each(function () {
            var targetSelector = $(this).attr('data-append-to');
            $(this).appendTo(targetSelector);
        });

    });

})(jQuery);