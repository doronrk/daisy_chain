//Facebook social icon
(function (d, s, id) {

    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Google+ social icon
(function () {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

//Twitter social icon
var element = document.createElement("script");
element.src = "http://platform.twitter.com/widgets.js";
document.body.appendChild(element);

//Pinterest social icon
var element = document.createElement("script");
element.src = "https://assets.pinterest.com/js/pinit.js";
document.body.appendChild(element);

productFunctions.getRecentlyViewed();
productFunctions.getRecommendations();
