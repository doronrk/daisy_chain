//Expanded Info
function bsboxsw(n, g, t) {

    for (i = 1; i <= t; i++) {
        var bs = document.getElementById("bx" + i + "infobox" + g);
        if (bs != null) {
            if (i == n) {
                bs.style.display = 'block';
                bs = null;
            }
            else {
                bs.style.display = 'none';
                bs = null;
            }
        }
        else { }
    }
}
//Carousel
$(function() {
    $(".scrollshelf").scrollable();

});

//LinkedList
function cartridgeLinkList(n) {

    for (i = 1; i <= 7; i++) {
        var bs = document.getElementById("linkList" + i);
        var lnk = document.getElementById("linkListAnchor" + i);
        if (bs != null) {
            if (i == n) {
                bs.style.display = 'block';
                bs == null;
            }
            else {
                bs.style.display = 'none';
                bs == null;
            }
        }
        if (lnk != null) {
            lnk.removeAttribute("class");
            if (i == n) {
                lnk.setAttribute("class", "selected");
            }
        }


    }
}