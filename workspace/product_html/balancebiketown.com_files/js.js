function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

var jQuery191;

loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
  jQuery191 = jQuery.noConflict(true);
  loadScript('//shopifier.net/app/tabs/js/jquery191-ui-1.10.4.min.js', function(){
    //jQuery191(function() {
      jQuery191('#tabs > ul > li').css("max-width", Math.round(100 / jQuery191('#tabs > ul > li').size()) + "%");
      jQuery191("#tabs").tabs();
      if (typeof($) != "undefined") $("#tabs ul li a").unbind('click.smoothscroll');
    //});
  });
});

