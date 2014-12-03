NEG.run(function (require) {
    var jq = require("NEG.ThirdParty.JQuery");
    var imageZoomerBuilder = require("NEG.Widget.ImageZoomer");

    var targets = jq("span[imgzoompic]");
    var windowStyle = {
        detailWindowStyle: {
            border: "1px solid rgb(204,204,204)",
            "-webkit-box-shodow": "rgba(0,0,40,0.4) 8px 5px 5px 0px",
            "box-shadow": "rgba(0,0,40,0.4) 8px 5px 5px 0px",
            "border-radius": "2px"
        }
    };

    for (var i = 0; i < targets.length; i++) {
        var zoomer = imageZoomerBuilder({
            target: targets[i],
            getDetailPosition: function () {
                return jq("#synopsis .grpArticle").offset();
            },
            getDetailSize: function () {
                var articleOffset = jq("#synopsis .grpArticle").offset();
                var optionOffset = jQuery(".aside .grpOptions").offset();
                var width = optionOffset.left - articleOffset.left + jQuery(".aside .grpOptions").innerWidth();
                var height = 0;
                jq("#synopsis .grpAside").each(function (j, obj) {
                    var theH = jQuery(obj).offset().top;
                    height < theH && (height = theH);
                });
                var boxHeight = jq(window).height() - height - 15;
                return { width: width, height: boxHeight >= 960 ? 960 : boxHeight };
            },

            imgSize: { width: 1280, height: 960 }
        }, windowStyle);
              
              window["NEGZoomer" + i] = zoomer;
        zoomer.start();
    }
});
