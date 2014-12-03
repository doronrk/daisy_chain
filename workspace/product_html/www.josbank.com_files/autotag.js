(function(){
    var domain;
    try{
        if(window.top && window.top.location && window.top.location.host)
            domain = window.top.location.host;
        else
            domain = (window.self === window.top ? location.host : document.referrer.split("/")[2]);
    }
    catch(err){
        domain = (window.self === window.top ? location.host : document.referrer.split("/")[2]);
    }
    if(!domain)
        return;
    domain = domain.replace("www.","");
    var dynadshost = "//d29oav93j91bc6.cloudfront.net/a/autotag.";

    var autotagScript;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i) {
        if(scripts[i].src.indexOf("/dynads/ServeS3.ashx/autotag") != -1 ||
            scripts[i].src.indexOf("/dynads/ServeS3.ashx/a/autotag") != -1 ||
            scripts[i].src.indexOf("dyau9xqp8gzji.cloudfront.net/autotag.js") != -1){
            autotagScript = scripts[i];
            break;
        }
    }

    var parent = autotagScript ? autotagScript.parentElement : document.getElementsByTagName('body')[0];
    if(!parent)
        return;


    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = dynadshost + domain + '.js';
    parent.appendChild(script);

})();