ns$(document).ready(function () {
    InitTabs();
});

function InitTabs() {
    ns$(".tabcontent").hide();
    ns$("ul.tabs li:first").addClass("active").show();
    ns$(".tabcontent:first").show();

    ns$("#seereviews").click(function (event) {
        ns$("#additional > ul.tabs a[href='#reviews']:parent").click();
    });

    ns$("ul.tabs li").click(function (event) {
        event.preventDefault();
        var $target = ns$(this);
        if (!$target.hasClass("active")) {
            ns$("ul.tabs li").removeClass("active");
            $target.addClass("active");
            ns$(".tabcontent").hide();

            var activeTab = $target.find("a").attr("href");
            ns$(activeTab).fadeIn();
        }
    });
}
