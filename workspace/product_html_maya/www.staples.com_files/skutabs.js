(function(b,a,c,e){var d=(function(f){f.SkuTabs=(function(){var v=c(b),F=c(b.document),H=c("body");var y,J,t,q;var l,k;var A,C,E,n,I,D,r,i;function p(){if(!t){h();}return t;}function x(w){t=w;}function s(w){q=w;}function o(w){y=w;}function u(w){J=w;}function z(L,N){var M=false;if(L[0]!=e&&L[0]!=null){M=L[0].id.match(/rightRail/i);}if(M){var K=c(".rightRailContent #supplies").length,w=c(".rightRailContent #certona").length;if(!K){j("certona");}if(!w){j("supplies");}}L.delegate("li","click",function(){var Q=c(this).children("a").attr("data-ref");try{c("img.supAccCtnaTmbImg").each(function(){var T=c(this).next().attr("value");c(this).attr("src",T);});}catch(R){}var S=c(this),O=S.find("a"),P=O.data("ref");if(O.not(".current")){L.find("li a.current").removeClass("current");O.addClass("current");N.removeClass("show").addClass("hide");c("#"+P).removeClass("hide").addClass("show");}if(M){j(P);}if(P.match(/desc/i)){k.find("div.subMenuContent").addClass("hide");k.find("div.subMenuContent").filter("[id*=specs]").removeClass("hide").end().filter("[id*=subdesc]").removeClass("hide");}});}function g(){l.on("click","li a",function(){var Q=c("#"+c(this).data("ref"));if(!(c(this).data("ref").match(/specs|subdesc/i))){k.find("div.subMenuContent").addClass("hide");Q.removeClass("hide");if(c(this).data("ref").match(/custom/i)){var S=Q.attr("id");var P=a.getElementById(S+"_ondemand");if(P!==e||P!==null){var R=P.innerHTML;if(R!=ondemandContentArray[S+"_ondemand"]){P.innerHTML=ondemandContentArray[S+"_ondemand"];}}}}else{k.find("div.subMenuContent").addClass("hide").filter("[id*=specs]").removeClass("hide").end().filter("[id*=subdesc]").removeClass("hide");if(c(this).data("ref").match(/specs/i)){c("html,body").animate({scrollTop:Q.offset().top},500);}}});var N=t.find("li a[data-ref^=manuf]"),O=t.find("li a[data-ref^=desc]"),M=t.find("li a[data-ref^=revs]"),K=c("#seeTechLinks a"),w=c("#prodDetailLink a"),L=c("#prodReviewLink");if(M.length){L.click(function(){M.trigger("click");});}if(N.length){K.click(function(){N.trigger("click");});}if(O.length){w.click(function(){O.trigger("click");});}}function j(L){var w="certona",Q=L||w,N=c("#"+Q),P=N.find("div.productInfo").size()||N.find("div.p01").size(),K='<div class="moreLess"><a href="javascript:void(0);" class="expanded"><span>Collapse</span></a></div>',M=N.find("div.moreLess").length,O=N.find("div.productInfo").length;if(M<=0){N.append(K);}if(P>5){(O)?N.find("div.productInfo:gt(4)").hide():N.find("div.p01:gt(4)").hide();N.find(".moreLess a").removeClass("expanded").addClass("collapsed").show().find("span").html(r);}else{N.find(".moreLess").hide();}N.undelegate("div.moreLess a","click").delegate("div.moreLess a","click",function(){var R=c(this);if(R.hasClass("collapsed")){R.removeClass("collapsed").addClass("expanded").find("span").html(i);(O)?N.find("div.productInfo:gt(4)").show():N.find("div.p01:gt(4)").show();}else{R.removeClass("expanded").addClass("collapsed").find("span").html(r);(O)?N.find("div.productInfo:gt(4)").hide():N.find("div.p01:gt(4)").hide();}});}function G(){var w=0;var K=E.attr("id");if(E.length){if(n>3){E.find("tr").has("td").filter(":gt(2)").hide();w=E.find("tr").has("td").filter(":visible").filter(":last").index("#"+K+" tr");E.find("tr:gt("+w+")").hide();E.find(".moreLess a").removeClass("expanded hide").addClass("collapsed").show().find("span").html(r);}else{E.find(".moreLess").hide();}}E.on("click","div.moreLess a",function(L){L.stopImmediatePropagation();var M=c(this);if(M.hasClass("collapsed")){M.removeClass("collapsed").addClass("expanded").find("span").html(i);E.find("tr").show();}else{M.removeClass("expanded").addClass("collapsed").find("span").html(r);E.find("tr").has("td").filter(":gt(2)").hide();w=E.find("tr").has("td").filter(":visible").filter(":last").index("#"+K+" tr");E.find("tr:gt("+w+")").hide();c("html,body").animate({scrollTop:A.offset().top},500);}});}function m(K){var N=K.find("div.productInfo"),M=[],w=0;if(K[0]!=e){var L=K[0].id.match(/miniCompare/i);}N.each(function(R){var W=c(this),V=W.find("div.mathflyout"),T=V.parents("div").filter(".pricenew"),U=W.find("a.psavelink > b > i"),S=1,P=1;if(L){P=3;S=R;}if(U[0]){var Q=U.text().replace(/[^0-9\.\,]/g,"").split(".",2);var O;for(O in Q){if(Q[0]==""){Q[O]="0";}}}W.on("hover","a.psavelink",function(Z){if(Z.type=="mouseenter"){T.css("zIndex",8010);V.removeClass("hide").css({top:"20px",bottom:"auto"});var X=(S%P)+1;var Y=Math.ceil(P/2);if(X>Y||P==1){V.addClass("left");V.children("img.mfoarrow").attr("src",propertyValues.COMMON_ICON_PATH+"ico_mfoarrow_left.png");}else{V.removeClass("left");V.children("img.mfoarrow").attr("src",propertyValues.COMMON_ICON_PATH+"ico_mfoarrow.png");}return false;}else{T.css("zIndex",0);V.addClass("hide");return false;}});if(L){M.push(c(this).find(".mathstory").height());w=M.sort(function(Y,X){return Y-X;})[M.length-1];}});N.find(".mathstory").height(w);}function h(){y=c("ul#rightRailTabList");J=c("div.rightRailTabContent");t=c("ul#skuTabList");q=c("div.skuTabSlide");l=c("#tabProductInfo-SubMenu");k=c("#tabProductInfo-Content");A=c("#moduleMiniCompare");C=c("#miniCompareFooter");E=c("#miniCompareTable");n=E.find("tr").has("td").length;I=c(".moreLess");D=c(".moreLess a");r=propertyValues.miniCompExpand;i=propertyValues.Carousel.collapse;}function B(){h();z(y,J);z(t,q);g();G();j();m(J);m(C);}return{init:B,getInfoTabs:p,initTab:z};})();return f;}(b.STAPLES||{}));b.STAPLES=d;d.SkuTabs.init();}(window,document,jQuery));