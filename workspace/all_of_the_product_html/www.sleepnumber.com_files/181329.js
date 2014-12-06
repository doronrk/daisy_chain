$(document).ready( function () {
    $('.chat-bug').hoverIntent(
        function (e) {
            $(this).animate({
                'right' : '-20px'
            }, 200);
        },
        function (e) {
            $(this).animate({
                'right' : '-200px'
            }, 200)
        }
        );
});