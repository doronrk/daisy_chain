$(document).on('mousedown touchstart submit', '[href=#submit]', function () {
    trackMonModalHide();
});

$(document).on('keypress', '#monetate_lightbox_content0 input', function (e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        trackMonModalHide();
    }
});

function monetateConfLightBox() {
    setCookie("emailLightBox", "True", 365);
    $('body').hide().append('<div id="monetate_lightbox3" style=" -webkit-transform: translate3d(0,0,0); height: 0; left: 0; position: absolute; top: 0; width: 100%; z-index: 2147483645; "><div id="monetate_lightbox_mask" style="-webkit-transform: translate3d(0px, 0px, 0px); height: 6822px; left: 0px; margin: 0px; padding: 0px; position: fixed; top: 0px; width: 6085px; opacity: 0.6; display: block; background-color: rgb(0, 0, 0);" class=""></div><div id="monetate_lightbox_content_container" style="-webkit-transform: translate3d(0px, 0px, 0px); height: 472px; left: 0px; margin: 0px auto; position: relative; right: 0px; top: 180px; width: 635px; opacity: 1; display: block;" class=""><div id="monetate_lightbox_content3" style="position: relative; opacity: 1;"><img src="http://b.monetate.net/img/1/47/268797.jpg" alt=""></div></div></div>').fadeIn(3000);
    $('#monetate_lightbox3').delay(4000).fadeOut(3000);

    $(document).live('mousedown touchstart', '#monetate_lightbox_content_container', function () {
        $('#monetate_lightbox3').remove();
    });
}

function trackMonModalHide() {
    if ($('#monetate_lightbox_content0').is(':hidden')) {
        if ($("#monetate_lightbox_content1").length === 0) {
            monetateConfLightBox();
        }
    } else {
        setTimeout(trackMonModalHide, 50);
    }
}
