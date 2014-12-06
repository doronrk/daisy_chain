MACYS.namespace("MACYS.pdpAddToWishlist");MACYS.pdpAddToWishlist.secureHostName="";MACYS.pdpAddToWishlist.newWishlistURL="";MACYS.pdpAddToWishlist.oldWishlistURL="";MACYS.pdpAddToWishlist.newWishlistATWURL="";MACYS.pdpAddToWishlist.atwSuccessMessage="";MACYS.pdpAddToWishlist.atwSuccessMessageB="";MACYS.pdpAddToWishlist.atwNislSuccessMessage="";MACYS.pdpAddToWishlist.addToWishlistLinkClass="addToWishlist";MACYS.pdpAddToWishlist.selectedProductToWishList="";MACYS.pdpAddToWishlist.cmBreadcrumbElementId="PDP WISHLIST";MACYS.pdpAddToWishlist.userId="";MACYS.pdpAddToWishlist.pendingAction=(function(){var h=false;var f=YAHOO.util.Dom;var d="SignedIn";var g="UserName";var k="PDPA2W";var a="GCs";var i="1";var m=false;var e=false;var c="fromPage=PDPA2W";var b="fromPage=PDPATWS";var j="fromPage=PDPATWF";var l={};l.init=function(){var q=window.location.href.indexOf(c);if(q>0){var n=l.getATWResultURL();if(n){var p=n.indexOf(b);if(p>0){m=true}else{p=n.indexOf(j);if(p>0){e=true}}}}};l.isATWSuccess=function(){return(l.isUserSignedIn()&&m)};l.isATWFail=function(){return(l.isUserSignedIn()&&e)};l.isUserSignedIn=function(){var p=MACYS.util.Cookie.get(g,a);var n=(MACYS.util.Cookie.get(d)===i)?true:false;h=(n&&p)?true:false;return h};l.getATWResultURL=function(){var n=MACYS.util.Cookie.get(k,a);if(n){return n}else{return""}};l.getAddToWishListUpcId=function(){var n=l.getATWResultURL();var q="";var p=n.match(/upcID=([^&#]*)/);if(p&&p[1]){q=p[1]}return q};l.clearAddToWishlistResult=function(){MACYS.util.Cookie.set(k,"",a)};return l})();MACYS.pdpAddToWishlist.wishlist=(function(){var c=false;var e=YAHOO.util.Dom;var f=YAHOO.util.Event;var a=[];var d="click";var b={};b.init=function(){b.addEvents()};b.addEvents=function(){var g=e.getElementsByClassName(MACYS.pdpAddToWishlist.addToWishlistLinkClass,"img","pdpDetails");if(g){f.addListener(g,d,MACYS.pdpAddToWishlist.wishlist.invokeAddToWishlist)}};b.invokeATWCoremetrics=function(){var g=MACYS.pdp.breadcrumbController.getCmElementID();if(g){cmCreatePageElementTag(g,"PDP WISHLIST")}};b.getProductID=function(g){return g.replace(MACYS.pdpAddToWishlist.addToWishlistLinkClass,"")};b.invokeAddToWishlist=function(r){var n=(MACYS.pdp.pageType==="MASTER");var m=f.getTarget(r);var s=false;var p="POST";var q=b.getProductID(m.id);var k=MACYS.pdp.productId;MACYS.pdpAddToWishlist.userId=MACYS.util.Cookie.get("macys_online_uid");var j=(MACYS.guestWishListEnabled)?"/api/customer/v2/wishlists?sdpGrid="+MACYS.sdpGrid:MACYS.config.Base.pdpAddToWishlistUrl;if(m){var h=MACYS.pdp.productSelectors[q];if(h&&h.sizeColorTypeManager){s=h.sizeColorTypeManager.validate(m);if(s){if(!MACYS.guestWishListEnabled){MACYS.pdpAddToWishlist.wishlist.invokeATWCoremetrics()}var g="";var i=(window.location.href.indexOf("shop/registry/wedding/product")!==-1);if(MACYS.pdp&&h.sizeColorTypeManager){formData=h.sizeColorTypeManager.getCurrentlySelectedUpc(q);var l;if(n){l=e.get("memberProductQty"+q)}else{l=e.get("productQuantity")}if(l){formData.quantity=l.value}else{formData.quantity=1}}if(formData.upcID){if(!(MACYS.guestWishListEnabled)){g="upcID="+formData.upcID+"&Quantity="+formData.quantity+"&ID="+k+"&fromPage=PDPA2W";if(i){g=g+"&fromMode=registry"}else{g=g+"&fromMode=proper"}a.push(formData.upcID)}else{if(MACYS.pdpAddToWishlist.userId){postData='{"wishlists":{"wishlist":[{"customer": {"id":'+MACYS.pdpAddToWishlist.userId+'},"fromSource":"PDP","items":[{ "upc": {"id":'+formData.upcID+'},"qtyRequested":'+formData.quantity+"}]}]}}"}else{postData='{"wishlists":{"wishlist":[{"fromSource":"PDP","items":[{ "upc": {"id":'+formData.upcID+'},"qtyRequested":'+formData.quantity+"}]}]}}"}}}MACYS.pdpAddToWishlist.selectedProductToWishList=q;MACYS.loading.show();if(!(MACYS.guestWishListEnabled)){YAHOO.util.Connect.asyncRequest(p,j,{success:MACYS.pdpAddToWishlist.wishlist.handleResponse,failure:MACYS.pdpAddToWishlist.wishlist.handleError,abort:MACYS.pdpAddToWishlist.wishlist.handleError},g)}else{YAHOO.util.Connect.setDefaultPostHeader(false);YAHOO.util.Connect.initHeader("Accept","application/json; charset=utf-8");YAHOO.util.Connect.initHeader("Content-Type","application/json; charset=utf-8");YAHOO.util.Connect.asyncRequest(p,j,{success:MACYS.pdpAddToWishlist.wishlist.handleAPIResponse,failure:MACYS.pdpAddToWishlist.wishlist.handleError,abort:MACYS.pdpAddToWishlist.wishlist.handleError},postData);YAHOO.util.Connect.setDefaultPostHeader(true)}}}}};b.handleAPIResponse=function(i){MACYS.loading.hide();var l=i.responseText;var g=new exploreAttributes(),k;k=MACYS.pdp.breadcrumbController.getCmElementID();g.add({7:k});l=l.replace(/\n/g,"");l=l.replace(/\r/g,"");l=l.replace(/\t/g," ");l=l.replace(/<!--[^(-->)]+-->/g,"");if(!l){MACYS.pdpAddToWishlist.wishlist.handleError(o);return}if(i.status===200){var j=YAHOO.lang.JSON.parse(l);if(j&&j.wishlists){if(!MACYS.pdpAddToWishlist.userId){MACYS.pdpAddToWishlist.userId=j.wishlists.wishlist[0].customer.id;MACYS.util.Cookie.setUserId(MACYS.pdpAddToWishlist.userId)}MACYS.pdpAddToWishlist.wishlistMessagePanel.init();MACYS.pdpAddToWishlist.wishlistMessagePanel.setMessage(MACYS.pdpAddToWishlist.atwSuccessMessageB);if(!MACYS.pdpAddToWishlist.pendingAction.isUserSignedIn()){MACYS.pdpAddToWishlist.wishlistMessagePanel.setMessage(MACYS.pdpAddToWishlist.atwNislSuccessMessage);cmCreatePageElementTag("GUEST ADD TO WISHLIST",MACYS.pdpAddToWishlist.cmBreadcrumbElementId,g.toString())}else{MACYS.pdpAddToWishlist.wishlistMessagePanel.setMessage(MACYS.pdpAddToWishlist.atwSuccessMessageB);cmCreatePageElementTag("SIGNED IN ADD TO WISHLIST",MACYS.pdpAddToWishlist.cmBreadcrumbElementId,g.toString())}var h="";if(MACYS.pdpAddToWishlist.selectedProductToWishList){h=YAHOO.util.Dom.get(MACYS.pdpAddToWishlist.addToWishlistLinkClass+MACYS.pdpAddToWishlist.selectedProductToWishList)}else{h=YAHOO.util.Dom.get(MACYS.pdpAddToWishlist.addToWishlistLinkClass)}if(h){MACYS.pdpAddToWishlist.wishlistMessagePanel.show(h)}}}};b.handleResponse=function(i){MACYS.loading.hide();var l=i.responseText;var p="1";var k="2";if(!l){MACYS.pdpAddToWishlist.wishlist.handleError(i);return}var n=new exploreAttributes(),s;var j=window.location.href.indexOf("fromPage=PDPA2W");s=MACYS.pdp.breadcrumbController.getCmElementID();n.add({7:s});if(i.status===200){l=l.replace(/\n/g,"");l=l.replace(/\r/g,"");l=l.replace(/\t/g," ");l=l.replace(/<!--[^(-->)]+-->/g,"");var m=null;try{m=YAHOO.lang.JSON.parse(l);if(m){var h=m[a[a.length-1]];var u=h.STATUS;MACYS.pdpAddToWishlist.wishlistMessagePanel.init();if(u===p){if(MACYS.guestWishListEnabled){cmCreatePageElementTag("PDP ADD TO WISHLIST",MACYS.pdpAddToWishlist.cmBreadcrumbElementId,n.toString())}MACYS.pdpAddToWishlist.wishlistMessagePanel.setMessage(MACYS.pdpAddToWishlist.atwSuccessMessage)}else{if(u===k){if(MACYS.guestWishListEnabled){MACYS.pdpAddToWishlist.cmBreadcrumbElementId="PDP WISHLIST SIGN IN";cmCreatePageElementTag("SIGN IN PAGE",MACYS.pdpAddToWishlist.cmBreadcrumbElementId,n.toString())}setTimeout(function(){window.location=h.REDIRECT},1000);return}else{var q=h.FAILURE_MSG;if(q){MACYS.pdpAddToWishlist.wishlistMessagePanel.setMessage(q);var g=YAHOO.util.Dom.get("wishlistMessageBodyText");if(g){YAHOO.util.Dom.addClass(g,"validationBody")}}}}var t="";if(MACYS.pdpAddToWishlist.selectedProductToWishList){t=YAHOO.util.Dom.get(MACYS.pdpAddToWishlist.addToWishlistLinkClass+MACYS.pdpAddToWishlist.selectedProductToWishList)}else{t=YAHOO.util.Dom.get(MACYS.pdpAddToWishlist.addToWishlistLinkClass)}if(t){MACYS.pdpAddToWishlist.wishlistMessagePanel.show(t)}}}catch(r){MACYS.pdpAddToWishlist.wishlist.handleError(i);return}}else{MACYS.pdpAddToWishlist.wishlist.handleError(i);return}};b.handleError=function(g){MACYS.loading.hide();if(g.status===503||g.status===404){MACYS.pdpAddToWishlist.wishlist.showRequestError();return}};b.showRequestError=function(){if(MACYS.pdpAddToBag&&MACYS.pdpAddToBag.errorOverlay){MACYS.pdpAddToBag.errorOverlay.show();return}};return b})();MACYS.pdpAddToWishlist.wishlistMessagePanel=(function(){var a={};var b=YAHOO.util.Dom;a.init=function(){if(!this.wishlistMessagePanel){this.wishlistMessagePanel=new YAHOO.widget.Panel("wishlistMessagePanel",{underlay:"none",width:200+"px",height:50+"px",modal:false,zIndex:1000,close:false,visible:false,draggable:false});this.wishlistMessagePanel.render();YAHOO.util.Event.addListener("wishlistMessagePanel","click",MACYS.pdpAddToWishlist.cancelEventBubble,this,true);YAHOO.util.Event.addListener("wishlistMessagePopUpClose","click",this.hide,this,true)}};a.resize=function(d,c){a.wishlistMessagePanel.cfg.setProperty("width",d+"px");a.wishlistMessagePanel.cfg.setProperty("height",c+"px")};a.show=function(c){YAHOO.util.Event.addListener(document.body,"click",this.hide,this,true);var d=b.get("wishlistMessagePanel");if(c&&d){b.removeClass(d,"hidden");this.setPanelContainerPosition(this.wishlistMessagePanel,c);this.wishlistMessagePanel.show();this.adjustHeightAndWidth()}};a.hide=function(c){MACYS.pdpAddToWishlist.cancelEventBubble(c);if(this.wishlistMessagePanel){this.wishlistMessagePanel.hide()}YAHOO.util.Event.removeListener(document.body,"click",MACYS.pdpAddToWishlist.wishlistMessagePanel.hide)};a.adjustHeightAndWidth=function(){var c,f;var e=b.get("wishlistMessageBodyText");if(e){if(e.innerHTML.length===60){c=120;f=25}else{c=200;f=35}a.resize(c,f);var d=b.get("wishlistMessageBody");if(d){b.setStyle(d,"height",f+"px")}}};a.setMessage=function(d){var c=b.get("wishlistMessageBody");if(c){c.innerHTML='<div id="wishlistMessageBodyText">'+d+"</div>";this.wishlistMessagePanel.render()}};a.setPanelContainerPosition=function(d,j){if(d&&d.element&&j){var f=d.element.offsetHeight;var c=d.element.offsetWidth;var g=parseInt(b.getX(j),10);var e=parseInt(b.getY(j),10);var i=g-c/2+j.offsetWidth/2;var h=e-f/4;d.moveTo(i,h)}};return a}());MACYS.pdpAddToWishlist.cancelEventBubble=function(a){if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}};MACYS.pdpAddToWishlist.getUPCInfo=function(b){b=parseInt(b);for(var c in MACYS.pdp.upcmap){if(c&&MACYS.pdp.upcmap[c]){var e,a;for(e=0,a=MACYS.pdp.upcmap[c].length;
e<a;e++){var d=MACYS.pdp.upcmap[c][e];if(d&&d.upcID&&d.upcID===b){d.ID=c;return d}}}}return null};MACYS.pdpAddToWishlist.onDomReady=(function(){MACYS.pdpAddToWishlist.secureHostName=document.getElementById("MACYS_secureHostName").value;MACYS.pdpAddToWishlist.newWishlistURL=MACYS.pdpAddToWishlist.secureHostName+"/wishlist/mylist";MACYS.pdpAddToWishlist.oldWishlistURL=MACYS.pdpAddToWishlist.secureHostName+"/myinfo/wishlist/index.ognc";MACYS.pdpAddToWishlist.newWishlistATWURL=MACYS.pdpAddToWishlist.newWishlistURL;MACYS.pdpAddToWishlist.oldWishlistATWURL=MACYS.pdpAddToWishlist.oldWishlistURL+"?cm_sp=wishlist-_-pdp-_-added_to_wishlist";MACYS.pdpAddToWishlist.atwSuccessMessage="Added to <a href='"+MACYS.pdpAddToWishlist.oldWishlistATWURL+"' id='wlToastLink'>wishlist</a>!";MACYS.pdpAddToWishlist.atwSuccessMessageB="Added to <a href='"+MACYS.pdpAddToWishlist.newWishlistATWURL+"?cm_sp=wishlist-_-pdp-_-added_to_wishlist' id='wlToastLink'>wishlist</a>!";MACYS.pdpAddToWishlist.atwNislSuccessMessage="Added to your <a href='"+MACYS.pdpAddToWishlist.newWishlistATWURL+"?cm_sp=wishlist-_-pdp-_-added_to_guest_wishlist' id='guestWlTosstLink'> guest wishlist</a>";MACYS.pdpAddToWishlist.atwNislSuccessMessage=MACYS.pdpAddToWishlist.atwNislSuccessMessage+"<br><a href='/signin/index.ognc?cm_sp=wishlist-_-pdp-_-sign_in' id='guestWlSigninToastLink'>Sign in</a> to tie this list to your profile.";MACYS.pdpAddToWishlist.pendingAction.init();MACYS.pdpAddToWishlist.wishlist.init();if(MACYS.pdpAddToWishlist.pendingAction.isATWSuccess()){var a=new exploreAttributes(),d;var d=MACYS.pdp.breadcrumbController.getCmElementID();a.add({7:d});MACYS.pdpAddToWishlist.wishlistMessagePanel.init();MACYS.pdpAddToWishlist.wishlistMessagePanel.setMessage(MACYS.pdpAddToWishlist.atwSuccessMessage);if(MACYS.guestWishListEnabled){cmCreatePageElementTag("SIGN IN PAGE ADD TO WISHLIST",MACYS.pdpAddToWishlist.cmBreadcrumbElementId,a.toString())}var c=MACYS.pdpAddToWishlist.pendingAction.getAddToWishListUpcId();if(c){var b=MACYS.pdpAddToWishlist.getUPCInfo(c);if(b.ID){MACYS.pdp.productAttributesPreSelection.selectColor(b.ID,b.color);MACYS.pdp.productAttributesPreSelection.selectType(b.ID,b.type);MACYS.pdp.productAttributesPreSelection.selectSize(b.ID,b.size);window.setTimeout(function(){MACYS.pdpAddToWishlist.wishlistMessagePanel.show(YAHOO.util.Dom.get("addToWishlist"+b.ID))},1000)}}MACYS.pdpAddToWishlist.pendingAction.clearAddToWishlistResult()}else{if(MACYS.pdpAddToWishlist.pendingAction.isATWFail()){MACYS.pdpAddToWishlist.pendingAction.clearAddToWishlistResult();MACYS.pdpAddToWishlist.wishlist.showRequestError()}}});