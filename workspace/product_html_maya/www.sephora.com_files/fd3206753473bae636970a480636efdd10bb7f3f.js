(function($) {
  var nextPageMatrix = {};
  nextPageMatrix["love"] = function (args){
    wa.forNextPage({events : args[1] ? "event27" : "event28"});
  };
  nextPageMatrix["store_search"] = function(args){
    wa.forNextPage({
      prop57 : args.criteria,
      prop59 : "find a store:search:" + args.location
    });
  };

  nextPageMatrix["productClickThrough"] = function(args){
    var pageName = wa.pageName.split(":")[0] + ":",
        category = "na",
        eVar6 = "",
        carouselName = args.title.toLowerCase();

    if (wa.pageType == "product"){
      category = $($(".breadcrumb a")[0]).text().toLowerCase();
      eVar6 = wa.pageName;
    }
    wa.forNextPage({
      productAdd : "|eVar69="+ pageName + category +":"+ carouselName + ":slide " + args.slideNumber + ":click",
      eVar6 : eVar6
    });
  };

    $.extend(Sephora.analytics, {
        analyze: function(eName, args, opts) {
          if(opts && opts.nextPage){
            nextPageMatrix[eName](args[0]);
          } else if (opts && opts.sameThread) { // for links that leave page. Need to make sure then get executed
            $("body").trigger(eName, args);
          } else {
            setTimeout(function() {
              $("body").trigger(eName, args);
            }, 0);
          }
        }
    });

})(jQuery);


//custom clicks

$("body").on("click", "[data-track-parallax]", function(){
  Sephora.analytics.analyze("sendData", ["parallax", "", {pid:$(this).data("product-id"), details:wa.pageType       +":"+ wa.pageName+":"+$(this).data("details")}], {sameThread:true});
});

$(".my-sephora [data-analytics='stores']").click(function(){ // not handled in eventBridge!!! or link delay do we want this?
  Sephora.analytics.analyze("sendData", ["stores", "top link"], {sameThread: true});
});

$(".footer-links a[href='/store-locations-events?mediaId=16400021']").click(function(){
  Sephora.analytics.analyze("sendData", ["stores", "footer link","store locartions & events"], {sameThread: true});
});

$("#skincare-iq .skiniq-nav a").click(function(){
  wa.forNextPage({prop55 : $("span", this).text().trim()});
});

$("[name='subscribeFlash']").submit(function(){
  wa.forNextPage({prop55 : "flash:request invite"});
});


$("#modal-ship-country-selector .btn-primary").click(function(){
  wa.countryPath($("#modal-ship-country-selector .country-select .selected").data("country"));
});

$(".purchases-content").on("click", ".list-item .coloriq-match a",function(){
  Sephora.analytics.analyze("sendData", ["coloriq", "directLookup", "purchase"], {sameThread:true});
});

$(".account-module.color-iq").on("click", ".skintone a", function(){
  Sephora.analytics.analyze("sendData", ["coloriq", "directLookup", "account"], {sameThread: true});
});

$(".maincontent").on("click", ".search-results a.sku-item", function(){
  wa.forNextPage({prodIdx: $(this).data("idx")});
});

$("body").on("click", ".modal--ql [data-analtyics-ql]", function(){
  wa.forNextPage({prop55: "quicklook:"+$(this).data("analtyics-ql")});
});

$(".mod-recommend a[data-productid]").click(function(){
  Sephora.analytics.analyze("productClickThrough", [ {title:"recommended just for you", slideNumber:1} ], {nextPage: true});
});

$("#list_pane").on("click", ".list-image a, .list-description a",function(){
  Sephora.analytics.analyze("productClickThrough", [ {title:"basket loves", slideNumber:1} ], {nextPage: true});
});


window.analyze = Sephora.analytics.analyze;