var Hggr=(Hggr)?Hggr:{};Hggr.ImageFlyout=function(){var a;function c(){if($("product-config-swatches")&&$("product-config-swatches").down("li.selected")){var e=$("product-config-swatches").down("li.selected").readAttribute("data-value")}else{var e=d()}return e||""}function d(){var g="";if(ess&&ess.productJSON&&ess.productJSON.pidDetails){var f=ess.productJSON.pidDetails[0];for(var e in f){g=e;break}}return g}function b(h){var e={};if(ess&&ess.productJSON){if(h){var g=ess.productJSON.pidDetails[0];if(g[h]){var f=g[h].images[0];if(f){e={base:f.main,zoom:f.zoom}}}}else{e={base:ess.productJSON.mainProductImage.main,zoom:ess.productJSON.mainProductImage.zoom}}}return e}return{init:function(){var g=$("main-product-image-0");var f=new Element("div",{"class":"loader",title:g.getAttribute("alt")});Hggr.ImageFlyout.flyout=new Df.FlyoutZoom("flyout",{loader:f,panelHolder:$("main-img-0"),panelAnimate:{width:505,height:390,time:600,ease:Df.Transitions.circInOut}});var e=c();var h=b(e);Hggr.ImageFlyout.flyout.load(h)},load:function(e){if(Hggr.ImageFlyout.flyout){Hggr.ImageFlyout.flyout.load(e)}},getImagesById:function(e){return b(e)}}}();document.observe("dom:loaded",function(a){Hggr.ImageFlyout.init()});window.explodedSizes={};var myFn=jQuery(function setupExplodedSizes(g){var v=/expcsl=([^&|#]*)\|([^&|#]*)\|([^&|#]*)/;o=function o(){var K=g(this);var I=K.closest(".cart_availability").find(".add_to_bag");if(I.prop("disabled")){K.closest(".cart_availability").addClass("uncartable_error");var E=K.closest("[data-product-index]").find("form [data-dimension-name]").filter(function G(){return g(this).find(".selected").length===0}).map(function F(){return g(this).data("dimension-name")}).get();var L="Sorry, this selection is currently unavailable";for(var H=0;H<E.length;H++){var J=E[H];L=H===0?"Please select <br/>a":L+" and";L+=((/^[aeiou]/i).test(J)?"n ":" ")+J.slice(0,1).toUpperCase()+J.slice(1)}L+=".";K.closest(".cart_availability").find(".cart_error").html(L).css("position","absolute")}};var z=function z(){var E=g(this).find("img[data-zoom][data-main]");var I=g(this).closest("[data-product-index]");var F=I.data("product-index");var H=E.data("main");var G=E.data("zoom");setupZoomImages(H,G,F)};var a=function a(E){var I=E.hasClass("selected")?E.data("value"):"";var H=E.closest("[data-dimension-index]").data("dimension-index");var G=E.closest("[data-product-index]");G.find("ul.swatches a[href], ul.sizes a[href], a.productURL[href]").attr("href",function F(M,L){var P=g(this).parent("li").data("value");var O=g(this).closest("ul").data("dimension-index");var K=/expcsl=([^&#]*)/.exec(L);var N=false;if(K!==null&&K.length===2){K=v.exec("expcsl="+decodeURIComponent(K[1]));N=true}else{K=[null,null,null]}var J;if(N){K.shift();K[H]=I;if(P!==undefined&&O!==undefined){K[O]=P}J=L.replace(/expcsl=([^&#]*)/,"expcsl="+g.map(K,String).join("|"))}else{K=[null,null,null];K[H]=I;if(P!==undefined&&O!==undefined){K[O]=P}J=L+"&expcsl="+g.map(K,String).join("|")}return J})};var e=function e(E){return ess.productJSON.skus[E]};var n=function n(E){return ess.productJSON.pidDetails[E]};var f=function f(E){return g("#product-item-id-"+E+" form ul[data-dimension-index]").length};var k=function k(G,M,K){var I=e(K);var P=[];var E=g("#product-item-id-"+K+" form ul[data-dimension-index]");var F=f(K);for(var H=0;H<I.length;H++){var L=I[H].dimensions;if(L[G]===String(M)){var O=F;while(O--){if(O!==G){var N=F;while(N--){if(N!==O&&N!==G){break}}var J=N>-1?E.eq(N).children("li.selected").data("value"):"";if(!J||L[N]===String(J)){P[O]=P[O]||{};P[O][L[O]]=1}}}}}return P};var A=function A(K){var G=K.type.search(/mouseenter|focusin/)!==-1;var M=G?g(this).parent():g(this).parent().siblings().andSelf().filter(".selected");var I=M.closest("[data-product-index]");var J=I.data("product-index");var F=M.data("value");if(F){var E=n(J)[F];if(E.images[0]){if(I.find("#mainProductImage-"+J).length){I.find("#mainProductImage-"+J).attr("src",E.images[0].main)}if(Hggr&&Hggr.ImageFlyout){Hggr.ImageFlyout.load({base:E.images[0].main,zoom:E.images[0].zoom})}if(I.find(".photo")){I.find(".photo").attr("src",E.images[0].main)}if(I.find(".alternateImage")){var L="";var H=E.images;if(H.length>2&&H[2].main!==""){L=H[2].main}else{if(H.length>1&&H[1].main!==""){L=H[1].main}else{L=H[0].main}}I.find(".alternateImage").attr("src",L)}}I.find(".colorName").text(M.children("a").attr("title"))}};var u=function u(F,E){return g("#product-item-id-"+F+" form ul[data-dimension-index]").map(function G(){var H;if(g(this).children("li.tmpSelected").length){H=g(this).children("li.tmpSelected")}else{if(g(this).children("li.selected").length){H=g(this).children("li.selected")}}if(H!==undefined){return(E)?H.data("value"):H.children("a").attr("title")}else{return""}}).get()};var m=function m(E,F){if(!E.length){return""}var H=u(F);var G="";if(E.hasClass("unavailable")){G="<span class='error'>";G+="<span class='selection_value'>"+H[0]+" is Unavailable</span>";var J="";((H[2])?J="":J="");if(H[1]){G+=" in "+J+" <span class='selection_value'>"+H[1]+"</span>"}if(H[2]){G+=" and "+J+" <span class='selection_value'>"+H[2]+"</span>"}G+="</span>"}else{var I=E.closest("[data-dimension-name]").data("dimension-name");G="<span class='selection_value'>";G+=H[E.closest("[data-dimension-index]").data("dimension-index")];G+="</span>"}return G};var p=function p(E){g("#product-item-id-"+E+" form ul[data-dimension-index]").each(function(G){var H=g(this);var F=H.children(".tmpSelected").length?H.children(".tmpSelected"):H.children(".selected");g("#product-item-id-"+E+" [data-dimension-error='"+G+"']").html(m(F,E))})};var t=function t(H,F){var I=H.closest("[data-product-index]").find("form ul.swatches");var E=I.find("li:not('.unavailable')").length;E=(E===0)?"No":E;var G=u(F);return"<strong>Unavailable in<br />"+G.shift()+" in "+G.join(" x ")+",</strong> "+E+" color"+((E===1)?" is":"s are")+" available in this size."};var w=function b(G,I){var E=g("#hover-unavailable-warning");if(I){if(E.length===0){E=g("<span id='hover-unavailable-warning'><span class='availability-message'></span><span class='arrow'></span></span>")}var F=G.closest("[data-product-index]").data("product-index");var H=t(G,F);E.appendTo(G).children(".availability-message").html(H)}else{E.detach()}};var y=function y(G,K,J,I){var F=e(G);for(var E=0;E<F.length;E++){var H=F[E].dimensions;if(String(K)!==H[0]){continue}if(String(J)!==H[1]){continue}if(I===undefined||(String(I)===H[2])){return F[E]}}throw Error("No sku found with those dimensions: "+([K,J,I].join(", "))+".")};var D=function D(F){var J=u(F,true);var I=null;var G=f(F);var K=g("#product-item-id-"+F);var E=K.find("form ul[data-dimension-index]:not(:has(.tmpSelected)) > li.selected:not('.unavailable'), form ul[data-dimension-index] > li.tmpSelected:not('.unavailable')");if(E.length===G&&E.length>0&&J.every(function H(L){return L!==""})){I=y(F,J[0],J[1],J[2]);K.find("#product-detail-price").html(I.price)}else{K.find("#product-detail-price").html(n(F)[J[0]].price)}};var d=function d(R){var N=g(this);var H=N.parent();var G=R.type.search(/mouseenter|focusin/)!==-1;var O=N.closest("[data-product-index]");var Q=O.data("product-index");var S=G?N.parent():N.parent().siblings().andSelf().filter(".selected");var K;var P=function P(){return(g(this).data("value") in K)?"unavailable":""};H.toggleClass("tmpSelected",(G));if(S.length){var F=S.data("value");var M=S.parent().data("dimension-index");var E=k(M,F,Q);O.find("ul[data-dimension-index]").not("ul[data-dimension-index='"+M+"']").children("li").addClass("unavailable");for(var I=0,J=E.length;I<J;I++){K=E[I];if(K){O.find("ul[data-dimension-index='"+I+"'] > li").removeClass(P)}}p(Q);D(Q)}else{var L=g("#product-item-id-"+Q+" ul.sizes li.selected > a");if(!L.length){g("#product-item-id-"+Q+" ul.swatches > li").removeClass("unavailable")}L.add("#product-item-id-"+Q+" ul.swatches li.selected > a").mouseleave()}if(false&&H.hasClass("unavailable")){w(H,G)}};var h=function h(H,F,K){var L=g("#alt-img-list-"+K);var J="";if(F.length>1){for(var I=0,E=F.length;I<E;I++){var G=F[I];J+="<li data-main='"+G.main+"' data-zoom='"+G.zoom+"' class=''>";if(G.thumbnail){J+="<img alt='alternate image view' src='"+G.thumbnail+"'/><img src='/images/alt-view-selected-frame.png' class='selected-frame'/>"}else{J+="<span class='unavailable'>thumbnail image not available</span>"}J+="</li>"}L.html(J);L.children(":first").trigger("click").addClass("selected")}else{L.empty()}};var j=function j(){var I=g(this),H=I.data("main"),E=I.data("zoom"),F=g("#main-product-image-wrapper .photo"),G=F.attr("src");if(F&&H&&(G!==H)){F.attr("src",H);if(Hggr&&Hggr.ImageFlyout){Hggr.ImageFlyout.load({base:H,zoom:E})}I.siblings("li").removeClass("selected");I.addClass("selected")}};var x=function x(F){var I=F.data("value");var H=F.closest("[data-product-index]");var G=H.data("product-index");var E=n(G)[I];if(H.find("#main-img-"+G).length){h(I,E.images,G)}if(window.productCustomLinkTrack){productCustomLinkTrack(F.get(0),"Color Swatch Selected",E.styleNumber,E.omniProductTitle)}};window.explodedSizes.toggleSubmit=function s(K){var O=K.find(".cart_availability");var M=K.data("product-index");var I=K.find("input[name='productId']").val();var E=f(M);var F=K.find("form ul[data-dimension-index] > li.selected:not('.unavailable')");var G=O.find(".add_to_bag");var J=G.siblings(".disabled_overlay").css("position","absolute");if(F.length===E&&F.length>0){var N=[];for(var H=0;H<E;H++){N[H]=F.eq(H).data("value")}var P=G.closest("form");var L=y(M,N[0],N[1],N[2]);P.find("input[name='color_0']").val(N[0]);P.find("input[name='prod_0']").val(I+"|"+L.sku);g("#dynamicSkuContainer_0").css("display","list-item").find("#dynamicSkuDisplay_0").text(L.vendorSku);G.prop("disabled",false).addClass("active");O.removeClass("uncartable_error").addClass("active");J.hide()}else{g("#dynamicSkuContainer_0").css("display","none").find("#dynamicSkuDisplay_0").text("");G.prop("disabled",true).removeClass("active");O.removeClass("active");J.show()}};var l=function l(E){E.preventDefault();if(window.event){window.event.returnValue=false}};var q=function q(E){l(E);var G=g(this).parent("li");var H=G.closest("[data-product-index]");var F=G.parent("ul.swatches").length!==0;if(F){G=H.find(".swatches [data-value='"+G.data("value")+"']");if(G.length===1){H.find(".family-swatches .swatches li").removeClass("selected")}}if(!(G.parent("ul.swatches").length&&G.hasClass("selected"))){G.toggleClass("selected").siblings("li.selected").removeClass("selected")}a(G);if(G.hasClass("selected")){if(F){x(G)}}window.explodedSizes.toggleSubmit(H)};var C=function C(E){if(g('input[name="wlName"]').val()==="default"){return}l(E);ajaxAddToCart(this)};var r=function r(E){l(E);var G=g(".product-order-form"),H=G.find('input[name="wlName"]'),F=G.find('input[name="async"]');H.val("default");F.val("0");G.submit()};g(document).on("click",".disabled_overlay",o);g(document).on("submit",".product-order-form",C);g(document).on("click","#product-wishlist",function B(E){if(g("#config").find(".cart_availability").hasClass("active")){r(E)}else{o.call(g(".add_to_bag").get(0),E)}});g(document).on("click",".email-a-friend",function i(E){l(E);ess.emailAFriend(this.href)});var c=g("#product-item-id-1");if(!c.length){window.explodedSizes.toggleSubmit(g("#product-item-id-0"))}g("#mainContent").on("mouseenter mouseleave focusin focusout",".swatches a, .sizes a",d);g("#mainContent").on("mouseenter mouseleave focusin focusout",".swatches a",A);g("#mainContent").on("click",".swatches a, .sizes a",q);g("#mainContent").on("click","#more-views li",j);window.ess=window.ess||{};g(document).ready(function(){g(".sizes a").mouseleave()})});