if (typeof(BONZ) !== 'undefined' && BONZ.packageLoading) BONZ.packageLoading('respond_js');
BONZ.Respond=new function(){this.initialize=function(){$(window).resize(b);$(window).trigger("resize")};var b=function(){var a=$(window).width();1300<=a?($("html").addClass("gte-1300px"),null==$.cookie("gte1300")&&$.cookie("gte1300",!0,{path:"/",domain:BONZ.cookie_domain})):($("html").removeClass("gte-1300px"),$.cookie("gte1300",null,{path:"/",domain:BONZ.cookie_domain}));1150<=a?$("html").addClass("gte-1150px"):$("html").removeClass("gte-1150px")}};jQueryLoaded(BONZ.Respond.initialize);


if (typeof(BONZ) !== 'undefined' && BONZ.packageLoaded) BONZ.packageLoaded('respond_js');
//# sourceMappingURL=respond_js.js.map
