var ProductAction=new Class({Implements:[Options,Events],loginOverlay:"",defaultError:"Unable to add this product to cart please contact Customer Service (1.866.DSW.SHOES) for help.",resetErrors:function(){flyout=$$(".sizeFlyout").pick();
if(flyout){flyout.dispose()
}flyout=$$(".widthFlyout").pick();
if(flyout){flyout.dispose()
}flyout=$$(".colorFlyout").pick();
if(flyout){flyout.dispose()
}$$(".errorHeader").each(function(b,a){b.removeClass("errorHeader")
})
},clearFlyouts:function(e){var b;
if(e.getParent("div#sizes")||e.getParent("div#sizes2")||e.get("id")=="sizes"||e.get("id")=="sizes2"){b=$$(".sizeFlyout").pick();
if(b){var d=e.getParent("div#sizes");
if(d){d.getSiblings("label").removeClass("errorHeader")
}else{if(e.get("id")=="sizes"||e.get("id")=="sizes2"){e.getSiblings("label").removeClass("errorHeader")
}else{e.getParent("div#sizes2").getSiblings("label").removeClass("errorHeader")
}}}}else{if(e.getParent("div#widths")||e.getParent("div#widths2")){b=$$(".widthFlyout").pick();
if(b){var a=e.getParent("div#widths");
if(a){a.getSiblings("label").removeClass("errorHeader")
}else{e.getParent("div#widths2").getSiblings("label").removeClass("errorHeader")
}}}else{if(e.getParent("div#colors")||e.getParent("div#colors2")){b=$$(".colorFlyout").pick();
if(b){var f=e.getParent("div#colors");
if(f){f.getSiblings("label").removeClass("errorHeader")
}else{e.getParent("div#colors2").getSiblings("label").removeClass("errorHeader")
}}}}}if(b){b.dispose()
}},createFlyout:function(b,a){return new Element("div").addClass("errorFlyout").addClass(a).setStyle("display","block").setStyle("opacity","0").adopt(new Element("span",{text:b}).addClass("errorText"))
},productActionError:function(k){this.animateLoader();
var n=$("pointingErrorContainer");
var d=JSON.decode(k.responseText);
var f=n.getElement("#errorMessageBox"),j="";
for(var o in d.fieldErrors){switch(o){case"lineItem.sizeCode":var p=$$(".sizes");
var l=p.getElement("label");
if(l.hasClass("errorHeader")=="false"){l.addClass("errorHeader");
p.pick().adopt(this.createFlyout("Choose a size.","sizeFlyout").fade("in"))
}break;
case"lineItem.widthCode":var e=$$(".widths");
var m=e.getElement("label");
if(m.hasClass("errorHeader")=="false"){m.addClass("errorHeader");
e.pick().adopt(this.createFlyout("Choose a width.","widthFlyout").fade("in"))
}break;
case"lineItem.colorCode":var b=$$(".colors");
var a=b.getElement("label");
if(a.hasClass("errorHeader")=="false"){a.addClass("errorHeader");
b.pick().adopt(this.createFlyout("Choose a color.","colorFlyout").fade("in"))
}break;
case"lineItem.quantity":var c=$$(".quantity");
var g=c.getElement("label");
if(!g.hasClass("errorHeader")){g.addClass("errorHeader")
}break;
default:f.set("html",j);
f.fade("in")
}}if(d.fieldErrors){return
}else{if(d.notLoggedIn){$$("#memberLogin [name=lineItem.skuId]").pick().set("value",$("sku").get("value"));
$$("#memberLogin [name=lineItem.productId]").pick().set("value",$("prod").get("value"));
$$("#memberLogin [name=lineItem.quantity]").pick().set("value",$("quantity").get("value"));
$$("#memberLogin [name=lineItem.sku.color.id]").pick().set("value",$("color").get("value"));
$$("#memberLogin [name=lineItem.sku.size.id]").pick().set("value",$("size").get("value"));
$$("#memberLogin [name=lineItem.sku.dimension.dimensionCode]").pick().set("value",$("width").get("value"));
$$("#rewardsSignUp [name=lineItem.skuId]").pick().set("value",$("sku").get("value"));
$$("#rewardsSignUp [name=lineItem.productId]").pick().set("value",$("prod").get("value"));
$$("#rewardsSignUp [name=lineItem.quantity]").pick().set("value",$("quantity").get("value"));
$$("#rewardsSignUp [name=lineItem.sku.color.id]").pick().set("value",$("color").get("value"));
$$("#rewardsSignUp [name=lineItem.sku.size.id]").pick().set("value",$("size").get("value"));
$$("#rewardsSignUp [name=lineItem.sku.dimension.dimensionCode]").pick().set("value",$("width").get("value"));
var i=$("loginOuter");
if(this.loginOverlay==""){this.loginOverlay=i.innerHTML
}this.closeQuickView();
ModalWindow.loadHTML(this.loginOverlay,"","modalwindow 475 310 noscroll");
scCreateTag({pageName:"Wish List Log in Overlay",prop4:"Log in Overlay"});
var h=function(){i.getChildren().dispose()
}.delay("1000")
}else{if(d.goTo){window.location.href=d.goTo
}else{if(d.errors&&d.errors.length>0){j=d.errors[0]
}else{j=this.defaultError
}}}}if(!d.fieldErrors&&j){f.set("html",j);
f.fade("in")
}$("productOptionsContainer").getElements(".errorFlyout").fade("in")
},productActionSuccess:function(e){$$(".optionHeader").each(function(g){g.removeClass("errorHeader")
});
var f=JSON.decode(e);
if(f.referer=="addToBag"){new NavRec.NavigationCookieManager().recordProductNavigation(new URI(f.goTo).getData("prod"));
ModalWindow.open(f.goTo,"YOU'VE ADDED TO YOUR SHOPPING BAG:","700 615");
$("shoppingBagCount").set("html",f.bagCount)
}else{var a=$("wishListCounter");
if(a){var b=Number($("wishListCounter").get("html"));
var d=Number($("selQuantity").value)+b;
$("wishListCounter").set("html",d)
}ModalWindow.open(f.goTo,"YOU'VE ADDED TO YOUR WISH LIST:","modalwindow 560 175 noscroll");
var c=s_gi(s_account);
c.linkTrackVars="events,products,prop19";
c.linkTrackEvents="event23";
c.prop19=sc_obj.prop4;
c.products=sc_obj.products;
c.events="event23";
c.tl(true,"o","Wishlist Add")
}this.animateLoader();
this.closeQuickView()
},closeQuickView:function(){var a=$("quickViewContainer");
if(a){new Fx.Tween(a,{duration:"750",link:"cancel",property:"height",transition:"cubic:out"}).start(0).chain(function(){a.setStyle("display","none")
}.bind(this))
}},animateLoader:function(){var a=$$("img.loader").pick();
var b=$("addToBagLink");
var c=$("addToWishListLink");
if(a){a.fade("out")
}if(b){b.morph({opacity:"1"})
}if(c){c.morph({opacity:"1"})
}}});