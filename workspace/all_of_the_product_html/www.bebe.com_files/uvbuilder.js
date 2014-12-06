(function(t,n,r){if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return r.trim(this)}}var i={};if(window.uvBuilder){i=r.extend(i,window.uvBuilder)}window.universal_variable=window.universal_variable||{};var s=window.universal_variable;window.universal_variable.events=window.universal_variable.events||[];try{s.version="1.2.0";var o=s.page||{};var u=s.user||{};var a={parsePrice:function(e){if(i.currencySymbol){e=e.replace(i.currencySymbol,"")}else{if(e.indexOf("£")>=0){e=e.replace("£","")}if(e.indexOf("€")>=0){e=e.replace("€","")}if(e.indexOf("$")>=0){e=e.replace("$","")}}if(e.indexOf("-")!==-1){e=e.substring(e.indexOf("-"))}var t=parseFloat(e.trim().replace(",",".").replace(/[^0-9\.]*/g,""),10);if(isNaN(t)){return null}else{return t}}};var f={init:function(){var e=t.pageName||"";if(e&&e.toLowerCase()==="homepage"){f.homePage()}else if(t.prop8&&t.prop8.indexOf("category")>-1||t.channel&&t.channel.toLowerCase()==="search results"){f.categoryAndSearch()}else if(e&&e.indexOf("pdp:")>-1){f.productPage()}else if(e&&e.toLowerCase()==="cart"||window.location.href.indexOf("basket")!==-1){f.basketPage()}else if(e&&e.toLowerCase()==="user:login"){f.registerPage()}else if(window.location.href.indexOf("checkout")!==-1){f.checkoutAndConfirmation()}else if(!o.type){f.contentPage()}f.userInfo();f.breadCrumbs()},homePage:function(){o.type="Home"},categoryAndSearch:function(){var e={};e.items=[];o.type="Category";if(t.channel.toLowerCase()==="search results"){o.type="Search";e.query=t.eVar2}r(".catalog-entity-thumbnail").find(".Quicklook").each(function(){var n=r(this);var i={};i.name=n.find(".display-text").text().trim();i.url=n.find(".jsImageDisplayAnchor").attr("href");var s=n.find(".jsImageDisplayAnchor img").attr("src");if(s&&s.indexOf("assets/images/spacer.gif")===-1){i.image_url=s}i.id=function(){try{return i.image_url.match(/image\/bebe\/[a-zA-Z]*-([0-9]*)/)[1]}catch(e){return""}}();if(t.currencyCode){i.currency=t.currencyCode}if(n.find(".listPrice").length>0){i.unit_price=a.parsePrice(n.find(".listPrice").text());i.unit_sale_price=a.parsePrice(n.find(".salePrice").text())}else{i.unit_price=a.parsePrice(n.find(".price").text());i.unit_sale_price=i.unit_price}e.items.push(i)});s.listing=e},productPage:function(){o.type="Product";var e={};e.id=r(".item-no").clone().find("span").remove().end().text();e.url=window.location.href;e.image_url=r("#ogImage").attr("content");e.name=function(){var e=t.pageName.replace("pdp:","");return e.replace(/\+/g," ")}();var n=r("#jsPDPTabContent").find(".description");if(n.length>0){e.description=n.text().trim()}e.category=r(".Breadcrumb").find(".crumb").first().text().trim();e.subcategory=r(".Breadcrumb").find(".crumb").eq(1).text().trim();e.currency=t.currencyCode;var i=r("#description-container").find(".currentPrice");if(i.length>0){e.unit_price=a.parsePrice(i.text());e.unit_sale_price=a.parsePrice(i.text())}else{e.unit_price=a.parsePrice(r("#description-container").find(".basePrice").text());e.unit_sale_price=a.parsePrice(r("#description-container").find(".salePrice").text())}e.sku_code=function(){var e=window.location.href;var t=e.lastIndexOf("/")+1;return e.slice(t,e.substring(t).search(/\D/)+t)}();if(r("#ivnQty").length>0){e.stock=r("#ivnQty").text()}if(window.userSelectedColor){e.color=window.userSelectedColor}if(window.userSelectedSize){e.size=window.userSelectedSize}s.product=e},basketPage:function(){o.type="Basket";var e={};var t=[];if(n&&n.order){var r=n.order;e.order_id=r.id;e.currency=r.currencyCode;e.subtotal=r.merchandiseTotal;e.subtotal_include_tax=false;e.voucher=r.promoCode;e.voucher_discount=r.discount;e.shipping_cost=r.shipping;e.tax=r.tax;e.total=r.total}if(n&&n.items){var i=n.items;for(var u=0;u<i.length;u++){var a={};var f={};f.id=i[u].sku6;f.name=i[u].productName;f.category=i[u].productSectionName;f.category_id=i[u].productSectionId;f.subcategory=i[u].productSubcategoryName;f.subcategory_id=i[u].productSubcategoryId;f.unit_price=i[u].price;f.unit_sale_price=f.unit_price;f.sku_code=i[u].sku;f.color=i[u].productColor;f.size=i[u].productSize;a.quantity=i[u].quantity;a.subtotal=i[u].price;a.total_discount=i[u].discount;a.product=f;t.push(a)}}e.line_items=t;s.basket=e},registerPage:function(){o.type="Register/Logon"},checkoutAndConfirmation:function(){r(document).ajaxSuccess(function(e,t,n){if(/checkout\/panels\/receipt.jsp/.test(n.url)){var i=function(e){e=e||50;var t=!r.isEmptyObject(window.pageData)&&!r.isEmptyObject(window.pageData.order)&&window.pageData.order.id&&window.pageData.order.id.indexOf("No order number found")===-1;if(t){f.confirmation()}else{setTimeout(function(){i(e*2)},e)}};i()}});if(t.pageName==="checkout:thank you"){f.confirmation()}else{o.type="Checkout"}},confirmation:function(){o.type="Confirmation";var e=window.pageData;var n={};var i=[];if(e&&e.order){var a=e.order;n.order_id=a.id;n.currency=a.currencyCode;n.subtotal=a.subtotal;n.subtotal_include_tax=false;n.voucher=a.promoCode;n.voucher_discount=a.discount;n.shipping_cost=a.shipping;n.tax=a.tax;n.total=a.total}if(t&&t.eVar8){n.payment_type=t.eVar8}if(t&&t.eVar9){n.shipping_method=t.eVar9}var f=r(".receiptPanelGroup");n.delivery={name:f.find(".first_name").text()+" "+f.find(".last_name").text(),address:f.find(".shipping_address").text(),city:f.find(".shipping_city").text(),state:t.eVar7,postcode:t.eVar6,country:t.eVar13};if(e&&e.items){var l=e.items;for(var c=0;c<l.length;c++){var h={};var p={};p.id=l[c].sku6;p.name=l[c].productName;p.category=l[c].productSectionName;p.category_id=l[c].productSectionId;p.subcategory=l[c].productSubcategoryName;p.subcategory_id=l[c].productSubcategoryId;p.unit_price=l[c].price;p.unit_sale_price=p.unit_price;p.sku_code=l[c].sku;p.color=l[c].productColor;p.size=l[c].productSize;h.quantity=l[c].quantity;h.subtotal=l[c].price;h.total_discount=l[c].discount;h.product=p;i.push(h)}}n.line_items=i;s.transaction=n;if(t&&t.eVar18){u.user_id=t.eVar18}var d=r(".receiptPanelGroup");if(d.length>0){u.name=d.find(".first_name").text()+" "+d.find(".last_name").text()}u.has_transacted=true;s.page=o;s.user=u;window.universal_variable=s;window._qtd=window._qtd||[];window._qtd.push({resendUniversalVariables:1})},contentPage:function(){o.type="Content"},userInfo:function(){if(!u.name){if(r("#jsSignInMessage").find(".first_name").length>0){var e=r("#jsSignInMessage").find(".first_name").text();if(e!==""){u.name=e}}else if(r("#signInContainer > a").length>0){var e=r("#signInContainer > a").text();e=e.substring(0,e.indexOf("'"));if(e!==""){u.name=e}}}if(t&&t.eVar46){u.membership_number=t.eVar46}if(!u.returning){u.returning=function(){if(t&&t.eVar22==="logged in"||t.eVar37&&t.eVar37.toLowerCase()==="repeat"){return true}else{return false}}()}if(window.navigator.userLanguage||window.navigator.language){var n=window.navigator.userLanguage||window.navigator.language;u.language=n.toLowerCase()}},breadCrumbs:function(){o.breadcrumb=function(){var e=[];if(o.type==="Search"){e.push("Search Results")}else if(o.type==="Home"){e.push("Home")}else if(o.type==="Basket"){e.push("Basket")}else if(o.type==="Confirmation"){e.push("Confirmation")}else{if(r("#breadcrumbAreaWrap").length>0){var t=r("#breadcrumbAreaWrap").find(".Breadcrumb").find(".crumb");t.each(function(){e.push(r(this).text().trim())})}}return e}()}};f.init();s.page=o;s.user=u;window.universal_variable=s}catch(l){window.universal_variable.events.push({category:"uv-scraper",message:"error",url:window.location.href,error:l.message,datetime:(new Date).toString(),config:i})}window._qtd=window._qtd||[];window._qtd.push({resendUniversalVariables:1})})(window.s,window.pageData,window.jQuery)