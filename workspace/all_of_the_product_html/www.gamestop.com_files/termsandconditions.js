$(document).ready(function () {
    $('.fancybox').fancybox({
        overlayColor: "#000",
        padding: [20, 20, 20, 20],
        scrolling: 'auto',
        fitToView: false,
        autoSize: true,
        minWidth: 700,
        maxWidth: 700,
        maxHeight: 500,
        helpers: {
            title: {
                type: 'outside'
            },
            overlay: {
                locked: true
            }
        }
    });
});
