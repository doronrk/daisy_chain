// WebTrends SmartSource Data Collector Async Tag
// Version: 9.4.2

var dcsQ = [{ cmd: "collect"}];
(function() {
    var s, s2;
    s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = glbWebTrendFilePath;
    s2 = document.getElementsByTagName("script")[0];
    s2.parentNode.insertBefore(s, s2);
})();

//Code to include tags for landing pages
function findURLForLandingPages(curr) {
    var url = unescape(window.location.href);
    var setOfLandingPages = new Array();
    setOfLandingPages[0] = "marvel-collection";
    setOfLandingPages[1] = "worldseries";
    setOfLandingPages[2] = "music-posters";
    setOfLandingPages[3] = "nba";
    setOfLandingPages[4] = "giftguide";
    setOfLandingPages[5] = "Live-Nation-Merchandise";
    setOfLandingPages[6] = "The-Beatles-pictures";
    setOfLandingPages[7] = "John-Lennon-pictures";
    setOfLandingPages[8] = "Lil-Wayne-pictures";
    setOfLandingPages[9] = "The-Who-pictures";
    setOfLandingPages[10] = "Pink-Floyd-pictures";
    setOfLandingPages[11] = "Madonna-pictures";
    setOfLandingPages[12] = "Bruce-Springsteen-pictures";
    setOfLandingPages[13] = "academy_awards_2011_posters";
    setOfLandingPages[14] = "archiecomics";
    setOfLandingPages[15] = "ent10";
    setOfLandingPages[16] = "tellapal";
    setOfLandingPages[17] = "frenchmuseum";
    setOfLandingPages[18] = "lennon";
    setOfLandingPages[19] = "lonely-planet";
    setOfLandingPages[20] = "promise";
    setOfLandingPages[21] = "royalsale";
    setOfLandingPages[22] = "staffpicks";
    setOfLandingPages[23] = "se1a";
    setOfLandingPages[24] = "PosterSale2010";
    setOfLandingPages[25] = "ses1a";
    setOfLandingPages[26] = "marvelcollection";
    setOfLandingPages[27] = "KISS-pictures";
    setOfLandingPages[28] = "business";
    setOfLandingPages[29] = "Lonely-Planet";


    var isLanding;
    var pageName;
    var index = url.indexOf("/land/");
    if (index != -1) {
        var wt_cg = document.createElement("meta");
        //window.getSelection ? wt_cg.name = 'WT.cg_n' : wt_cg.Name = 'WT.cg_n';
        wt_cg.name = 'WT.cg_n';
        wt_cg.content = "Landing Page";
        document.getElementsByTagName("head")[0].appendChild(wt_cg);
        var wt_curr = document.createElement("meta");
        //window.getSelection ? wt_curr.name = 'WT.z_cur' : wt_curr.Name = 'WT.z_cur';
        wt_curr.name = 'WT.z_cur';
        wt_curr.content = curr;
        document.getElementsByTagName("head")[0].appendChild(wt_curr);
    }
    else {
        for (var i = 0, len = setOfLandingPages.length; value = setOfLandingPages[i], i < len; i++) {
            isLanding = url.search(value);
            if (isLanding != -1) {
                var wt_cg = document.createElement("meta");
                //window.getSelection ? wt_cg.name = 'WT.cg_n' : wt_cg.Name = 'WT.cg_n';
                wt_cg.name = 'WT.cg_n';
                wt_cg.content = "Landing Page";
                document.getElementsByTagName("head")[0].appendChild(wt_cg);
                var wt_curr = document.createElement("meta");
                //window.getSelection ? wt_curr.name = 'WT.z_cur' : wt_curr.Name = 'WT.z_cur';
                wt_curr.name = 'WT.z_cur';
                wt_curr.content = curr;
                document.getElementsByTagName("head")[0].appendChild(wt_curr);
                break;
            }
        }
    }
}
//WEBTRENDS END

