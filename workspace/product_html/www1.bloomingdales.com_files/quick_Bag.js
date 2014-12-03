define(["jquery","bcomPanel","cookie","bcomAjaxHandler","cacheManager","bcomCoremetrics","bcomBase"],function(e,t,i,a,r,n,o){window.quickbagEnabled=true;var s,c,u,d,l=114,m="#qb_addToBagOverlayLabel",g="quick_bag",f="linear",p={},v="qb_showBagItems",b=e("#"+v),h=/bloomingdales.com$/i;if(document.location.href.search("/fashion-index")===-1&&document.location.href.search("/style-guide")===-1&&document.location.href.search("/photo-galleries")===-1&&document.location.href.search("/product-guide")===-1){if(h.test(document.domain)){document.domain="bloomingdales.com"}else{document.domain="fds.com"}}s=function(){var t="height",i,a,r,n,o=.5,s,c={animationDuration:.5,setOpenCloseAnimationElement:function(i){r=i;var a="display",o="visibility",s="none",c=e(i).css(a);if(c===s){e(i).css(o,"hidden");e(i).css(a,"block")}e(r).css(t,"auto");n=i.offsetHeight;if(c===s){e(i).css(o,"visible");e(i).css(a,s)}},isCloseAnimated:function(){return e(r).filter(":animated").length>0},isRemoveItemAnimated:function(){return a&&a.isAnimated()},stopCloseAnimation:function(){e(r).stop(true,false)},resetOpenCloseAnimationElementHeight:function(){e(r).css(t,"0px")},removeItemAnimation:function(t,i){e(t).stop(true,false).animate({height:0},{duration:o*1e3,easing:f,queue:false,complete:i})},animateOutToHeight:function(t,i){e(r).stop(true,false).animate({height:t},{duration:this.animationDuration*1e3,easing:f,queue:false,complete:i})},getHeightBeforeShow:function(){s=r?e(r).css(t):"0px"},showOverlayAnimation:function(){e(r).css(t,s);this.animateOutToHeight(n)},hideOverlayAnimation:function(i){e(i.element).css("display","block");this.animateOutToHeight(0,function(){e(i.element).css("display","none");e(r).css(t,"auto")})}};return c}();c=function(){var i=unsecureServer+"/bag/index.ognc",a=assetsServer+"/img/checkout2/buttons/b_checkout.gif",r=assetsServer+"/web20/assets/img/quickBag/checkOutLongButton.gif",n='<div id="qb_quickBagBodyEmpty"><span>Your brown bag is empty.</span></div>',c='<div id="qb_errorMessageContainer">This preview is temporarily unavailable. Please view your item(s) in checkout.<br /><br />'+'<a href="'+i+'"><img src="'+r+'" alt="CHECKOUT" /></a></div>',d=null,l={visible:false,width:"272px",underlay:"shadow",draggable:false,modal:false,position:{of:"#aboveNav",my:"right top",at:"right top"},close:true,zIndex:99,appendTo:"#qb_headerItemContainer"},g={};function f(){b().hide();e(m).removeClass("qb_openedOverlayLabel")}function p(t){if(!d){return false}var i=t?t.relatedTarget:t;return e(i).closest(d.element).length===1}function b(){if(d===null){d=t.create("qb_quickBag",l);d.render(v);e(d).on("beforeOpen",s.getHeightBeforeShow);e(d).on("open",e.proxy(s.showOverlayAnimation,s,d));e(d).on("close",e.proxy(s.hideOverlayAnimation,s,d));e(d.element).on("mouseleave",g.closeOverlayEventHandler)}return d}function h(t){var r,s,d,l,m="<div id='qb_overlayContentWrapper'>",g;if(typeof t==="string"){t=e.parseJSON(t)}if(!t){m+=c}else if(t.totalQty===0){m+=n}else{r=t.currency;s=t.bagItems;d=t.totalQty;g=t.discountTotal;l='<a href="'+i+'" class="qb_myBagLink bold" >MY BAG: '+d+" ITEM"+(d>1?"S":"")+"</a>";m='<div id="qb_quickBagHeader"><span>'+l+"</span></div>";m+='<div id="qb_quickBagItemsWrapper">';m+='<div class="qb_quickBagItemsContainer">';m+=u.getProductDetails(t);m+=q(t.promotions,r);m+="</div>";m+="</div>";if(isYAQF===true&&!o.internationalMode){m+=y(t.yaqfMessagePrimary,t.yaqfMessageSecondary)}m+='<div id="qb_quickBagBottomContent">';m+="<div><span>"+l+"</span></div>";if(g&&g!=="0.00"){m+="<div>TOTAL SAVINGS: "+r+g+"</div>"}m+="<div>SUB TOTAL: "+r+t.merchandiseTotalBeforeDiscount+"</div>";m+='<div id="qb_checkoutButton"><a href="'+i+'"><img alt="CHECKOUT" src="'+a+'"/></a></div>';m+='<div class="clearBoth"></div>';m+="</div>"}m+="</div>";return m}function y(e,t){var i="",a="pop('/popup.ognc?popupID=11875','FreeShippingDetails','width=575,height=300'); return false;";if(e){i+='<div id="qb_yaqfMessageContainer" class="yaqf_messageContainer">';i+='<div id="qb_yaqfMessagePrimary" class="yaqf_messagePrimary  highlightText">'+e+'<br /><a class="highlightText" href="#" onclick="'+a+'">details &amp; exclusions</a>'+"</div>";if(t){i+='<div id="qb_yaqfMessageSecondary" class="yaqf_messageSecondary">'+t+"</div>"}i+="</div>"}return i}function q(e,t){var i,a,r,n,o="";if(e&&e.length>0){o+="<div id='qb_bagPromosWrapper'>";for(i=0,a=e.length;i<a;i++){r=e[i];if(!r.incompatible||!r.triggerDidNotApplied){n=r.amountDiscounted;o+="<div class='qb_bagPromoContainer'>";o+=r.promoDesc;if(n){o+="<br /><b>FREE: -"+t+n+"</b>"}o+="</div>"}}o+="</div>"}return o}g.displayBagItems=function(e,t){var i=b(),a=h(e);i.setBody(a);i.render();s.setOpenCloseAnimationElement(i.element);if(t!==false){this.showOverlay()}};g.closeOverlayEventHandler=function(e){if(!p(e)){f()}};g.showOverlay=function(){if(s.isCloseAnimated()){s.stopCloseAnimation()}else{s.resetOpenCloseAnimationElementHeight()}b().show();e(m).addClass("qb_openedOverlayLabel")};return g}();u=function(){var t="PRICE: ",i="REG: ",a="ORIG: ",r="PREVIOUS SALE: ",n="WAS: ",o="NOW: ",s="SALE: ",c=pdpAssetServer+"/products/",u={},d;u.getProductId=function(t){var i="0",a="qb_quickBagItem",r=e(t).hasClass(a)?t:e(t).closest("."+a);if(r&&r.id){i=r.id.replace(/qb_item_\d+_/,"")}return i};u.getProductDetails=function(e){d=e.currency;var t="",i=e.bagItems,a,r,n;for(r=0,n=i.length;r<n;r++){a=i[r];a.productName=a.productName.replace(/"/g,"&#34;");t+='<div class="quickBagItemContainer">';t+='<div id="qb_item_'+r+"_"+a.productID+'" class="qb_quickBagItem'+(r===n-1?" qb_quickBagItemLast":"")+'">';if(a.errorCodes&&a.errorCodes.length>0){t+="<div class='qb_errorMsgContainer'>"+a.errorCodes[0]+"</div>"}else if(a.gwpIndicator===true){t+="<div class='qb_gwpMessageContainer'>This Bonus has been added to your bag.</div>"}t+='<div class="qb_itemLeftCol">';t+='<div class="qb_itemImageContainer">';if(a.registry){t+='<a href="'+unsecureServer+"/registry/wedding/redirectbvrgvr?registryId="+a.registry.registryID+'">'}else{t+='<a href="'+a.productURL+'">'}t+='<img src="'+c+a.productImage+'?wid=77" alt="'+a.productName+'" title="'+a.productName+'">';t+="</a>";t+="</div>";t+="</div>";t+='<div class="quickBagItemDetails">';if(a.color&&a.color!==""){t+='<div><span class="qb_bold">color: </span><span class="qb_normal">'+a.color+"</span></div>"}if(a.size&&a.size!==""){t+='<div><span class="qb_bold">size: </span><span class="qb_normal">'+a.size+"</span></div>"}if(a.quantity&&a.quantity!==""){t+='<div><span class="qb_bold">qty: </span><span class="qb_normal">'+a.quantity+"</span></div>"}t+=f(a,true);t+=l(a);t+='<div class="qb_editRemoveLinks">';if(a.registry){t+='<span class="qb_quickBagEditButton"><a href="'+unsecureServer+"/registry/wedding/redirectbvrgvr?registryId="+a.registry.registryID+'">edit</a></span>'}else{t+='<span class="qb_quickBagEditButton"><a href="'+a.productURL+'">edit</a></span>'}t+='<a href="#" class="quickBagRemoveButton" id="quickBagRemoveButton'+r+'">';t+='<input type="hidden" value="'+a.upcID+'" id="quickBagRemoveButton'+r+'_upcID" />';t+='<input type="hidden" value="'+a.sequenceNumber+'" id="quickBagRemoveButton'+r+'_sequenceNumber" />';t+='<input type="hidden" value="'+a.quantity+'" id="quickBagRemoveButton'+r+'_quantity" />';t+='<input type="hidden" value="'+a.gwpIndicator+'" id="quickBagRemoveButton'+r+'_gwpIndicator" />';t+="remove</a>";t+="</div>";t+="</div>";t+='<div class="clearBoth"></div>';t+=m(a);t+="</div>";t+="</div>"}return t};function l(e){var t=e.promotions,i,a,r="";if(t&&t.length>0){for(i=0,a=t.length;i<a;i++){if(t[i].amountDiscounted){r+="<div class='qb_itemPromoDiscountPink'>FREE: <b>-"+d+t[i].amountDiscounted+"</b></div>"}r+="<div class='qb_itemPromoContainerBlack'><b>PROMO:</b> "+t[i].promoDesc;r+="</div>"}}return r}function m(e){var t=e.registry,i="";if(t){i+="<div class='qb_registryInfo'><img src='"+assetsServer+"/web20/assets/img/registry/giftRegistrySmall.gif' alt='Gift Registry' />&nbsp;&nbsp;FOR ";if(t.registrantFirstName){i+=t.registrantFirstName;if(t.coregistrantFirstName){i+=" AND "+t.coregistrantFirstName}}else{i+="Regitry ID "+t.registryID}i+="</div>"}return i}function g(e,t,i){var a="";a+="<div class='qb_price";if(i===true){a+=" qb_priceHighlight"}a+="'>"+e+d+t+"</div>";return a}function f(e,c){var u=e.regPrice,d=e.salePrice,l=e.origPrice,m=e.priceType,f="";switch(m){case 0:f+=g(c===true?t:"",u?u:d);break;case 1:case 2:case 3:case 4:f+=g(i,u);f+=g(s,d,true);break;case 5:f+=g(i,u);f+=g(r,l);f+=g(o,d,true);break;case 6:f+=g(a,u);f+=g(n,l);f+=g(o,d,true);break;case 7:f+=g(a,u);f+=g(s,d,true);break;case 8:f+=g(a,u);f+=g(o,d,true);break;case 9:f+=g(a,u);break;case 10:f+=g(a,u);f+=g(o,d,true);break;case 11:f+=g(c===true?t:"",u);break;case 14:case 15:f+=g(i,u);f+=g(s,d,true);break;case 16:f+=g(a,u);f+=g(o,d,true);break;case 17:f+=g(i,u);f+=g(r,l);f+=g(o,d,true);break;case 18:f+=g(i,u);f+=g(r,l);f+=g(s,d,true);break;case 19:f+=g(a,u);f+=g(n,l);f+=g(o,d,true);break;case 20:f+=g(i,u);f+=g(s,d,true);break;case 21:f+=g(i,u);f+=g(r,l);f+=g(o,d,true);break}return f}return u}();d=function(){var t="/bag/view",o="/bag/remove",d=c,m="POST",f="bagItemsKey",v=3e5,b,h,y,q,I,_=false;function B(){var e=i.get("PromoCodeOne","SMISCGCs"),t=i.get("PromoCodeTwo","SMISCGCs"),a=[],r="",n,o;if(e){a.push(e)}if(t){a.push(t)}for(n=0,o=a.length;n<o;n++){r+="&promoCode["+n+"]="+a[n]}return r}function C(e){n.elementTag({elementID:"edit_"+u.getProductId(this),categoryID:g});window.location.href=this.getElementsByTagName("a")[0].href}function k(e){e.preventDefault();e.stopPropagation();var t=document.getElementById(this.id+"_upcID").value,i=document.getElementById(this.id+"_sequenceNumber").value,a=document.getElementById(this.id+"_quantity").value,r=document.getElementById(this.id+"_gwpIndicator").value,o=[t,i,a,r];n.elementTag({elementID:"remove_"+u.getProductId(this),categoryID:g});I.removeBagItems(this,o)}function S(){d.displayBagItems(null)}function O(t,i){d.displayBagItems(t,i);if(t&&t.totalQty>0){var a="click",r=n.elementTag;e(".qb_quickBagItem").on(a,C);e(".quickBagRemoveButton").on(a,k);e(".qb_itemImageContainer").on(a,function(e){r({elementID:"prod_image_"+u.getProductId(this),categoryID:g})});e(".qb_myBagLink").on(a,function(e){r({elementID:"my_bag",categoryID:g})});e("#qb_checkoutButton").on(a,function(e){r({elementID:"checkout",categoryID:g})})}}function D(){var e={key:f};if(_===true){return}y.type=m;y.data=B();y.url=t;y.sendRequest({type:m},e)}function w(){r.removeSession(f)}function E(e,t){if(t){t=t.toUpperCase();var i=e.promoCodes,a=e.promotions,r,n,o=0,s=i.length,c,u=a.length;for(;o<s;o++){r=i[o].toUpperCase();if(t===r){for(c=0;c<u;c++){n=a[c];if(t===n.promoCode.toUpperCase()&&(n.incompatible||n.triggerDidNotApplied||n.promotionError)){return false}}return true}}}return null}y=new a({serviceContext:e,service:e.ajax,cache:"session",cacheExpiration:5});y.beforeStart=function(){_=true};y.handleComplete=function(){_=false};y.processJSONResponse=function(e){try{O(e)}catch(t){S();return}};y.processFailureResponse=function(){S()};q=new a({serviceContext:e,service:e.ajax,cache:"session",cacheExpiration:5});q.processJSONResponse=function(t){t.argument=this.argument;if(t){try{var a=e(t.argument).closest(".quickBagItemContainer"),r=typeof t!=="object"?e.parseJSON(t.responseText):t,n;i.set("CartItem",r.totalQty,"GCs");e("#brownBagItemsTotal").html(r.totalQty+" ITEM"+(r.totalQty===1?"":"S"));if(r.totalQty>0){s.removeItemAnimation(a,function(){O(r,false)})}else{s.animateOutToHeight(l,function(){d.displayBagItems(r,false)})}n=r.promoCodes;if(n){if(!E(r,n[0])){if(i.get("PromoCodeOne","SMISCGCs")!==""){i.set("PromoCodeOne","","SMISCGCs")}}if(!E(r,n[1])){if(i.get("PromoCodeTwo","SMISCGCs")!==""){i.set("PromoCodeTwo","","SMISCGCs")}}}}catch(o){this.removeItemError()}}else{this.removeItemError()}};q.removeItemError=function(){w();s.animateOutToHeight(l,function(){d.displayBagItems(null,false)})};q.processFailureResponse=function(){this.removeItemError()};I={getBag:function(){D()},removeBagItems:function(e,t){var i="source=QB&upcId[0]="+t[0]+"&sequenceNumber[0]="+t[1]+"&quantity[0]="+t[2]+"&gwpIndicator[0]="+t[3]+B(),a={key:f};w();q.argument=e;q.data=i;q.post=m;q.url=o;q.sendRequest({type:m},a)}};p.expireCache=w;return I}();if(b.length>0){e(m).on("mouseenter",function(){d.getBag();n.pageViewTag({pageID:"hover_bag",categoryID:g})});e(m).on("mouseleave",c.closeOverlayEventHandler);e(m).on("click",function(){n.elementTag({elementID:"quick_tab",categoryID:g})})}return p});