define("views-marketing-certonablock",["jquery","get!core/eBags","get!pageLocation/pageLocation"],function(n,t,i){function r(t){var r=t.closest(".productBlock").get(0).id;t.on("goto.jqueryCarousel",function(t,u){var f;u&&(f=n(u).index()+1,f&&i.saveUserData("cblock|pgslct|itmsl",f,{Name:r}))})}t.subscribe("/productBlock/dataDisplayed",function(t){n(function(){var i=n("#"+t.id+" .jqueryCarousel");i.css("visibility","hidden");i.jqueryCarousel();i.each(function(){var t=n(this);r(t);t.find("[data-jqueryCarousel-slide]").length||(t.jqueryCarousel("_dynamicContainerEvents"),t.jqueryCarousel("_createPagination"),t.jqueryCarousel("_bindPaginationEvents"),t.jqueryCarousel("_dragBehavior"))});i.css("visibility","")})})})