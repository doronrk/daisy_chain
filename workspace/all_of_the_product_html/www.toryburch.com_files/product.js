// some global variables that we need for the alt images
function s7jsonResponse(e){s7altImgSets[s7respCounter]=e,s7respCounter++}var s7altImgSets=[],s7reqCounter=0,s7respCounter=0;(function(e){e?e.Product=function(t){var n=t.data,r="",i=!1,o=function(t){i=!0,e.ajax.getJson({url:e.URLs.getVariants,data:{pid:t.pid,format:"json"},callback:function(e){if(!e||!e.variations||!e.variations.variants)return;n.variations.variants=e.variations.variants,i=!1,jQuery(t).trigger("VariationsLoaded")}})},u=function(t,r,i){var s=(t.master||t.variant)&&t.selectedVar!=null?t.selectedVar.id:t.pid,o={pid:s,Quantity:r,format:"json"};typeof i!="undefined"&&(o=jQuery.extend({},o,i)),e.ajax.getJson({url:e.URLs.getAvailability,data:o,callback:function(e){if(!e||!e.avLevels){e=jQuery.parseJSON(e);if(!e.avLevels)return}t.selectedVar!=null&&(t.variant||t.master)?(t.selectedVar.avLevels=e.avLevels,t.selectedVar.avStatusQuantity=e.avStatusQuantity,t.selectedVar.storeAvailability=e.storeAvailability):(n.avLevels=e.avLevels,n.avStatusQuantity=e.avStatusQuantity),jQuery(t).trigger("ReloadAvailability")}})},a=function(e){var t=0;for(var n=0;n<e.length;n++)variant=e[n],variant.ATS>0&&(t+=variant.ATS);return t},f=function(e){if(n.isOption){var t=jQuery(e.containerId+" .product_options:last select");t.change(function(t){var r=this.options[this.selectedIndex].value.split("%?%");e.selectedOptions[this.id]=r[0],e.selectedPrice[this.id]=r[1],e.showUpdatedPrice(b(e),n.pricing.standard)}),t.each(function(t){var n=this.options[this.selectedIndex].value.split("%?%");e.selectedOptions[this.id]=n[0],e.selectedPrice[this.id]=n[1]})}},l=function(t){var r=jQuery(t.containerId+" .addtocartbutton:last").click(function(i){var s=[],o=jQuery(t.containerId+" .variationsgrid table");if(o.length>0){t.selectedOptions.childPids="",t.selectedOptions.Quantity="";var u=[],a=[];t.selectedOptions.pid=jQuery(t.containerId+" #masterProduct:first").val(),jQuery("input.skuquantity",o).each(function(){if(this.value.length==0||isNaN(this.value))return;var e=jQuery(this),n=parseInt(e.val()),r=e.data("sku"),i=e.data("price");u.push(r),a.push(n),s.push({pid:t.selectedOptions.pid,sku:r,price:i,Quantity:n})}),t.selectedOptions.childPids=u.join(","),t.selectedOptions.Quantity=a.join(",")}else{if(n.master||n.variant){if(t.selectedVar==null)return!1;jQuery(t.containerId+" .product_options:last select").each(function(){var e=t.selectedOptions[this.id],n=this.id.replace(t.pid,t.selectedVar.id);t.selectedOptions[n]=e}),t.selectedOptions.pid=t.selectedVar.id,s.push({pid:jQuery(t.containerId+" #masterProduct:first").val(),sku:t.selectedVar.id,price:t.selectedVar.pricing.sale,Quantity:t.selectedOptions.Quantity})}else{if(n.bundle||n.productSet){var f=t.subProducts,l=",",c="",h=null;t.selectedOptions.childPids="",n.productSet&&(t.selectedOptions.Quantity="");for(var p=0;p<f.length;p++){h=f[p],p==f.length-1&&(l="");if(h.variant||h.master){if(h.selectedVar==null)return!1;t.selectedOptions.childPids+=h.selectedVar.id+l}else t.selectedOptions.childPids+=h.pid+l;var d=h.selectedOptions.pid;h.selectedOptions.pid=null,t.selectedOptions=jQuery.extend({},t.selectedOptions,h.selectedOptions),h.selectedOptions.pid=d,n.productSet&&(c+=h.selectedOptions.Quantity+l),s.push({pid:jQuery(h.containerId+" #masterProduct:first").val(),sku:h.selectedVar.id,price:h.selectedVar.pricing.sale,Quantity:h.selectedOptions.Quantity})}}n.productSet&&(t.selectedOptions.Quantity=c),t.selectedOptions.pid=t.pid}n.bundle?t.selectedOptions.Quantity=1:n.productSet||(t.selectedOptions.Quantity=jQuery(t.containerId+" .quantityinput:last").val())}if(n.productSet||t.selectedOptions.Quantity>0||o.length>0&&t.selectedOptions.Quantity.length>0){r.attr("disabled","true"),e.quickView.close();var v=jQuery.Event("AddToCart");v.selectedOptions=t.selectedOptions,jQuery.event.global["AddToCart"]==undefined||jQuery.event.global["AddToCart"]==null?e.minicart.add("",t.selectedOptions,function(){r.removeAttr("disabled"),jQuery(t.containerId+" .checkoutBtn:last").show(),jQuery(window).trigger("AddedToCart")}):jQuery(document).trigger(v);if(s.length>1)for(var p=0;p<s.length;p++)e.metrics.trackAddToCart(s[p]);else s.length>0&&(s[0].Quantity=t.selectedOptions.Quantity,e.metrics.trackAddToCart(s[0]))}return!1});return r},c=function(t){var r=jQuery(t.containerId+" .quantityinput:last");if(r.length>0)r.change(function(r){var i=null;try{i=parseInt(this.value)}catch(s){i=null}if(i){t.selectedOptions.Quantity=i;if(n.variations!=undefined){var o=[];jQuery.each(n.variations.attributes,function(){(!t.selectedVarAttribs[this.id]||t.selectedVarAttribs[this.id]=="")&&o.push(this.name)});if(o.length>0){var f=a(n.variations.variants);if(f==0)return;var l=S(o),c=jQuery.validator.format(e.resources.MISSING_VAL,l);y(c);return}}i!=t.getAvailabilityQty()&&u(t,i),y(v(t,i)),jQuery(t).trigger("AddtoCartEnabled")}}),t.selectedOptions.Quantity=r.val(),i||y(v(t,t.selectedOptions.Quantity));else{var s=jQuery(t.containerId+" .variationsgrid table");if(s.length>0){var o=jQuery("tfoot .totalquantity",s),f=function(e){var n=0,r=0,i=jQuery("tbody tr:eq("+e+") .totalquantity",s);jQuery("tbody tr:eq("+e+") .skuquantity",s).each(function(t){var r=jQuery(this),i=r.val();typeof r.data("rowIndex")=="undefined"&&r.data("rowIndex",e).change(function(){var e=jQuery(this);f(e.data("rowIndex"));var t=null;try{t=parseInt(this.value)}catch(n){t=null}t}).focusin(function(){var e=jQuery(this).parent("td");e.parent("tr").find("td:first").addClass("activerow");var t=e.index();jQuery("thead tr:last th:eq("+t+")",s).addClass("activecol")}).focusout(function(){var e=jQuery(this).parent("td");e.parent("tr").find("td:first").removeClass("activerow");var t=e.index();jQuery("thead tr:last th:eq("+t+")",s).removeClass("activecol")});var o=!i||isNaN(i)?0:parseInt(i);n+=o}),i.val(n),jQuery("tbody .totalquantity",s).each(function(e){var t=jQuery(this),n=t.val(),i=!n||isNaN(n)?0:parseInt(n);r+=i}),o.val(r),r>0?(t.enableA2CButton(),jQuery(t).trigger("AddtoCartEnabled")):(t.disableA2CButton(),jQuery(t).trigger("AddtoCartDisabled"))};jQuery("tbody tr",s).each(function(e){f(e)})}}},h=function(e,t){var n=jQuery(e+" .collapsibleDetails:not(.eventsbound)");t&&n.find(".detailsPanel").slideUp(100).removeClass("open").prev().removeClass("open"),n.addClass("eventsbound").find("h3").css("cursor","pointer").click(function(){jQuery(this).toggleClass("open").next().slideToggle(100).toggleClass("open")}),jQuery("a.printpage").unbind("click").bind("click",function(){return window.print(),!1})},p=function(t){var r=function(){(n.master||n.variant)&&t.selectedVar==null&&jQuery(t.containerId+" .addtowishlist, "+t.containerId+" .addtoregistry, "+t.containerId+" .findinstore").addClass("unselectable")};r(),jQuery(t).bind("AddtoCartDisabled",{},r),jQuery(t).bind("AddtoCartEnabled",{},function(e,n){jQuery(t.containerId+" .addtowishlist, "+t.containerId+" .addtoregistry, "+t.containerId+" .findinstore").removeClass("unselectable")}),jQuery(t).bind("ReloadAvailability",{},function(e){var t=e.target.selectedVar;y(v(e.target,t==null?n.avStatusQuantity:t.avStatusQuantity)),jQuery(e.target).trigger("AddtoCartEnabled"),this.refreshStoreAvailability()}),jQuery(t.containerId+" .addtowishlist a, "+t.containerId+" .addtoregistry a").click(function(r){var i=jQuery.extend({},{},t.selectedOptions);if(n.master||n.variant||n.productSet){if(t.selectedVar==null)return!1;i.pid=t.selectedVar.id}else i.pid=t.pid;var s=this.href;return s.indexOf("?")>0||(s+="?"),jQuery(this).hasClass("notauthenticated")?(s+=jQuery.param(i),s=e.util.appendParamToURL(s,"format","ajax"),e.dialog.open(s," ")):window.location=s+jQuery.param(i),!1}),jQuery(t.containerId+" .sendtofriend").click(function(r){var i=jQuery.extend({},{},t.selectedOptions);(n.master||n.variant)&&t.selectedVar!=null?i.pid=t.selectedVar.id:i.pid=t.pid;var s=e.URLs.sendToFriend+"?"+jQuery.param(i);return e.dialog.open(s,e.resources.SEND_TO_FRIEND),!1}),jQuery(t.containerId+" .findinstore a").click(function(e){if(jQuery(this).parent().hasClass("unselectable"))return!1;var t=jQuery(".collapsibleDetails h3.storePickup");jQuery.scrollTo(t.offset().top-90),t.hasClass("open")||t.click()})},d=function(e){jQuery(e+" #pdpReadReview").click(function(t){jQuery(e+" #pdpTabsDiv").tabs("select","pdpReviewsTab")}),jQuery(e+" #pdpWriteReview").click(function(e){})},v=function(t,r){var i=t.getAvStatus(),s=e.resources[i],o=t.getATS(),u=t.getAvLevels(),a=u[e.constants.AVAIL_STATUS_IN_STOCK],f=u[e.constants.AVAIL_STATUS_BACKORDER],l=u[e.constants.AVAIL_STATUS_PREORDER],c=u[e.constants.AVAIL_STATUS_NOT_AVAILABLE];return i===e.constants.AVAIL_STATUS_BACKORDER||i===e.constants.AVAIL_STATUS_PREORDER?(r>o&&o>0&&(s=s+" "+jQuery.validator.format(e.resources["QTY_"+i],o)),s=s+" "+g(t),s='<span class="onorder">'+s+"</span>"):o<n.lowStockLimit?s='<span class="lowstock">'+jQuery.validator.format(e.resources.QTY_LOW_STOCK,o)+"</span>":r>a&&i!==e.constants.AVAIL_STATUS_NOT_AVAILABLE&&(s="",a>0&&(s=s+" "+jQuery.validator.format(e.resources["QTY_"+e.constants.AVAIL_STATUS_IN_STOCK],a)),f>0&&(s=s+" "+jQuery.validator.format(e.resources["QTY_"+e.constants.AVAIL_STATUS_BACKORDER],f),s+=g(t),s='<span class="onorder">'+s+"</span>"),l>0&&(s=s+" "+jQuery.validator.format(e.resources["QTY_"+e.constants.AVAIL_STATUS_PREORDER],l),s+=g(t),s='<span class="onorder">'+s+"</span>")),s},m=function(t){if(!t)return"("+e.resources.NOT_AVAILABLE_SHORT.toLowerCase()+")";var r=t.avStatus,i="",s=t.ATS;return t.avStatus===e.constants.AVAIL_STATUS_NOT_AVAILABLE&&(i=e.resources[r+"_SHORT"]),i.length>0&&(i="("+i.toLowerCase()+")"),s<n.lowStockLimit&&(i=jQuery.validator.format(e.resources.QTY_LOW_STOCK_SHORT,s)),i},g=function(t){var n="";if(t.getInStockDate()&&t.getInStockDate()!="null"){var r=new Date(t.getInStockDate()),i=r.getMonth()+1+"/"+r.getDate();n='<br /><span class="stockdate">'+jQuery.validator.format(e.resources.IN_STOCK_DATE,i)+"</span>"}return n},y=function(e){jQuery(r+" .availability:last .value").html(e)},b=function(e){var t=e.selectedVar!=null?e.selectedVar.pricing.sale:n.pricing.sale;return jQuery.each(e.selectedPrice,function(){t=(new Number(t)+new Number(this)).toFixed(2)}),t},w=function(){},E=function(){jQuery(".attributecontentlink").click(function(t){return jQuery("#sizeChartDialog").length==0&&jQuery("<div/>").attr("id","sizeChartDialog").appendTo(document.body),e.createDialog({id:"sizeChartDialog",options:{height:530,width:800,title:e.resources.SIZECHART_TITLE}}),jQuery("#sizeChartDialog").dialog("open"),jQuery("#sizeChartDialog").load(this.href),!1})},S=function(e){var t="",n=e.length;if(n==1||n==2)t=e.join(" & ");else for(var r=0;r<n;r++){if(r==n-2){t+=e[r]+" & "+e[r+1];break}t+=e[r]+", "}return t};return{pid:n.ID,variant:n.variant,master:n.master,bundled:n.bundled,selectedVarAttribs:{},selectedVar:null,selectedOptions:{},selectedPrice:{},containerId:null,subProducts:[],source:null,addMonogramOptionAttributes:function(e){if(this.selectedOptions)for(var t in e)this.selectedOptions[t]=e[t]},enableA2CButton:function(){jQuery(this.containerId+" .addtocartbutton:last").removeAttr("disabled").removeClass("sendBtn_disabled").addClass("sendBtnImage"),typeof customPDP!="undefined"&&typeof dragAndDrop!="undefined"&&jQuery(".personalize_list").length>0&&dragAndDrop.enableAddAllProductButton()},disableA2CButton:function(){jQuery(this.containerId+" .addtocartbutton:last").attr("disabled","true").removeClass("sendBtnImage").addClass("sendBtn_disabled"),typeof customPDP!="undefined"&&typeof dragAndDrop!="undefined"&&jQuery(".personalize_list").length>0&&dragAndDrop.disableAddAllProductButton()},isSubProduct:function(){return(n.bundled||n.productSetProduct)&&e.ProductCache.subProducts.length>0},showSelectedVarAttrVal:function(e,t){jQuery(this.containerId+" div.variationattribute").each(function(){var n=jQuery(this).data("data");e===n&&jQuery(this).find("span.selectedvarval").html(t)})},readReviews:function(){jQuery(this.containerId+" #pdpTabsDiv").tabs("select","pdpReviewsTab")},showImages:function(e,t){var n=this;t=t||{},jQuery.each(t,function(){var t=-1,r=this;if(this.val===e&&this.images){this.images.small.length>0&&(jQuery(n.containerId+" .productthumbnails").show(),jQuery(n.containerId+" .productthumbnails:last").html(""),jQuery(n.containerId+" .productimage").html("").append(jQuery("<img/>").attr("src",r.images.large[0].url).attr("alt",r.images.large[0].alt).attr("title",r.images.large[0].title)));var i=this.images.large.length>=this.images.small.length?this.images.small.length:this.images.large.length;(this.images.small.length>1||n.isSubProduct())&&jQuery.each(this.images.small,function(){t++;var e=t;if(t>i-1)return;jQuery(n.containerId+" .productthumbnails").show(),jQuery(n.containerId+" .productthumbnails:last").append(jQuery("<img/>").attr("src",this.url).attr("alt",this.alt).attr("title",this.title).click(function(t){jQuery(n.containerId+" .productimage").html("").append(jQuery("<img/>").attr("src",r.images.large[e].url).attr("alt",r.images.large[e].alt).attr("title",r.images.large[e].title))}))})}})},loadAltImages:function(t,n){if(n==null||n==undefined)var n=this.containerId;var r=jQuery(n+" #alternateImagesBox"),i=r.width();r.addClass("loading");var o=jQuery('<div class="flexslider-altimages" />'),u=jQuery('<ul id="alternateImages" class="alternateImages clearfix"></ul>');r.empty().append(o.append(u)).show(),jQuery(n+" #productVideoOverlay #videocontainer").length>0&&jwplayer("videocontainer").remove(),jQuery(n+" #productVideoOverlay").empty().hide(),jQuery(n+" .productimages").removeAttr("style"),u.bind("AltImagesLoaded",{},function(){});var a=[],f=document.location.protocol=="https:"?"https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/ToryBurchLLC/":"http://s7d5.scene7.com/is/image/ToryBurchLLC/",l=f+t+"_S?req=imageset,json&callback=s7jsonResponse",c=this;jQuery.getScriptCached(l).done(function(l,h){if(h=="success"){var p=s7altImgSets[s7reqCounter];if(p&&p.IMAGE_SET){var d=p.IMAGE_SET.split(","),v=f.replace("ToryBurchLLC/","");a=jQuery.map(d,function(e,t){var n=e.split(";")[0],r=n.split("/")[1];return'<a name="'+r+'"><img src="'+v+n+'" alt="" /></a>'}),a.length>1&&(jQuery.each(a,function(e,t){e==0?u.append(jQuery('<li class="selected" />').append(t)):u.append(jQuery("<li/>").append(t))}),jQuery("a",u).click(function(e){e.preventDefault();var t=jQuery(this),r=t.parent();r.addClass("selected").siblings().removeClass("selected");var i=t.attr("name");return jQuery(n+" .productimagequickshop").length>0?jQuery(n+" .productimagequickshop img:not(.monogramImage)").attr("src",f+i+"?$trb_pdp_main_v2$"):pViewer?pViewer.changeImage(f+i):jQuery(n+" .productimage .defaultImage").length>0&&jQuery(n+" .productimage .defaultImage").attr("src",f+i+"?$trb_pdp_main_v2$"),jQuery(window).trigger("altImageChange",[{image:i}]),!1}))}s7reqCounter++,u.trigger("AltImagesLoaded"),c.setProductAltImageAltTags(u);var m=jQuery(n+" .alternateVideo"),g=m.find("a:first");m.find("a").length>1&&(g=m.find('a[href*="'+t+'"]'));var y=jQuery("<img />").addClass("playBtn").attr("src",e.URLs.altVideoPlayImg);if(g.length>0)if(jQuery("li",u).length==0){var b=g.clone();b.empty().addClass("altVideo").append(y),u.append(b.wrap("<li/>").parent())}else{var w=jQuery(a[0]).find("img").attr("src"),b=g.clone();b.empty().addClass("altVideo").append(y).css({backgroundImage:"url("+w+")"}),jQuery("li",u).length==1?u.append(b.wrap("<li/>").parent()):jQuery("li:nth-child(1)",u).after(b.wrap("<li/>").parent())}else a.length<=1&&r.hide();jQuery(".altVideo").css("cursor","pointer").click(function(t){t.preventDefault();var r=jQuery(this),i,o,u,a=jQuery(n+" #productVideoOverlay");try{r.attr("video")?i=r.attr("video"):i=r.attr("href")}catch(f){i=undefined}try{r.attr("videowidth")&&(o=r.attr("videowidth")),r.attr("videoheight")&&(u=r.attr("videoheight"))}catch(f){o=504,u=674}if(i){e.metrics.trackCustomLink({linkTrackVars:"events,products,eVar39,prop7",linkTrackEvents:"event12",events:"event12",prop7:"Product Video",eVar39:"Product Video",products:s.products,pageName:s.pageName+e.metrics.pageNameSeparator+"Video"},"Product Video",!0);var l=jQuery('<div class="close" />').appendTo(a),c=jQuery('<div id="videomodalcontent"><div id="videocontainer" /></div>').appendTo(a);a.show(),l.css("cursor","pointer").click(function(){jwplayer("videocontainer").remove(),a.empty().hide(),jQuery(n+" .productimages").removeAttr("style")}),c.width(o).height(u),jQuery(n+" .productimages").css("min-height",u+"px"),jwplayer("videocontainer").setup({autostart:!0,flashplayer:jwplayerswf,skin:jwplayerskins.productdetail,screencolor:"FFFFFF","controlbar.showmute":!1,volume:0,file:i,width:o,height:u,events:{onComplete:function(){jwplayer("videocontainer").remove(),a.empty().hide(),jQuery(n+" .productimages").removeAttr("style")}}})}return!1});var E=65,S=jQuery(n+" .productimagequickshop").length>0?24:30,x=Math.floor((i-S)/E);jQuery(n+" #alternateImages li").length>x?(u.addClass("slides"),o.addClass("flexslider").flexslider({animation:"slide",controlNav:!1,animationLoop:!1,slideshow:!1,itemWidth:E,itemMargin:.25,start:function(e){r.removeClass("loading")}})):r.removeClass("loading")}})},refreshStoreAvailability:function(){var t=this,r=this.containerId,i=jQuery(r+" .collapsibleDetails"),s=i.find(".storePickup.detailsPanel .panelContent");if(s.length==0)return;var o=s.find(".resultMessage"),a=s.find(".editLocation");s.find(".dots-loading").remove(),i.find("h3.storePickup").click(function(){c()});var f=function(){s.find(".dots-loading").length==0&&a.append('<div class="dots-loading" />')},l=function(t){var n=jQuery('<ul class="stores"></ul>');for(var r=0;r<t.length;r++){var i=t[r],s=jQuery("<li />"),o=jQuery('<div class="storeinfo" />');o.append('<p class="storename">'+i.name+"</p>");var u='<p class="storeaddr">'+i.address1+" </p>";i.address2!=null&&(u+='<p class="storeaddr">'+i.address2+" </p>"),u+='<p class="storeaddr">'+i.city,i.city!=null&&i.stateCode!=null&&(u+=", "),u+=i.stateCode+" "+i.postalCode+"</p>",o.append(u),o.append('<a class="storephone" data-storename="'+i.name+'" href="tel:'+i.phone.replace(/\D/g,"")+'">'+i.phone+"</a>");var a="http://maps.google.com/maps?hl=en&f=q&q="+encodeURI(jQuery(u).text());o.append('<p class="storelocation"><span class="distance">~ '+i.distance.toFixed(1)+" "+e.resources.DISTANCE_UNIT+'</span> <a href="'+a+'" class="maplink" data-storename="'+i.name+'" target="_blank">'+e.resources.FIND_IN_STORE_MAP+"</a></p>"),s.append(o),s.append('<div class="storehours"><p class="hrshdr">'+e.resources.STORE_HOURS+':</p><p class="hours"></p></div>');var f=jQuery("<div />").html(i.hours);f.find("br").replaceWith("|");var l=f.text().replace(/\u2013|\u2014/g,"-");l=l.replace(/\s-\s/g,"-"),l=l.replace(/\sAM/gi,"am"),l=l.replace(/\sPM/gi,"pm"),l=l.replace(/\|/g,"<br/>"),s.find(".storehours .hours").html(l);if(i.statusclass=="store-available"){var c='<div class="storeavailability '+i.statusclass+'"><p class="avail-info"><span class="dot"></span><!--'+i.ATS+"--> "+i.status+"</p>";i.enableReserve&&(c+='<span class="reserveBtn" data-id="'+i.storeId+'" data-num="'+i.storeNum+'">'+e.resources.RESERVE+"</span>"),s.append(c+"</div>")}else s.append('<div class="storeavailability '+i.statusclass+'"><p class="avail-info"><span class="dot"></span>'+i.status+"</p></div>");n.append(s)}return n},c=function(e){typeof e=="undefined"&&(e=s.find(".scrollable .stores li").length);if(e<3)s.find(".scrollable").css({maxHeight:"none",overflowY:"auto"});else{s.find(".scrollable").removeAttr("style");var t=parseInt(s.find(".scrollable").css("max-height")),n=0;s.find(".scrollable .stores li:lt(2)").each(function(){n+=$(this).outerHeight()}),n>t&&s.find(".scrollable").css({maxHeight:n+"px",overflowY:"scroll"})}};(!navigator.geolocation||e.device=="desktop")&&s.find(".gps").hide(),s.hasClass("eventsbound")||(s.addClass("eventsbound"),s.find(".gps").css("cursor","pointer").click(function(){f();var e=s.find(".searchRadius select").val();navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(n){var r={lat:n.coords.latitude,"long":n.coords.longitude,distance:e};u(t,t.selectedOptions.Quantity,r)})}),s.find(".goPostal button").css("cursor","pointer").click(function(){f();var e=s.find(".postalCode input").val(),n=s.find(".searchRadius select").val();if(e.length>1){var r={zip:e,distance:n};u(t,t.selectedOptions.Quantity,r)}else{var r={distance:n};u(t,t.selectedOptions.Quantity,r)}}),s.find(".postalCode input").watermark().keypress(function(e){e.which==13&&(f(),s.find(".goPostal button").click())}),s.find(".searchRadius select").change(function(){f();var n=s.find(".postalCode input").val(),r=jQuery(this).val();if(n.length>1){var i={zip:n,distance:r};u(t,t.selectedOptions.Quantity,i)}else if(e.device!="desktop")s.find(".gps").click();else{var i={distance:r};u(t,t.selectedOptions.Quantity,i)}}));if(this.selectedVar!=null){if(typeof this.selectedVar.storeAvailability!="undefined"&&this.selectedVar.storeAvailability!=null){var h=this.selectedVar.storeAvailability.stores,p=jQuery.grep(h,function(e,t){return e.statusclass=="store-available"}),d="";p.length>0?p.length==1?d+=" "+e.resources.FIND_IN_STORE_ONELOCATION:d+=" "+jQuery.format(e.resources.FIND_IN_STORE_LOCATIONS,p.length):d+=" "+e.resources.FIND_IN_STORE_NOLOCATIONS;if(p.length>0){o.html(d),a.show().removeClass("nostores"),h.sort(function(e,t){return e.statusclass>t.statusclass?1:-1}),s.find(".scrollable").empty().append(l(h)),c(h.length),s.find(".storephone").click(function(t){var n=jQuery(this).data("storename");e.metrics.trackCustomLink({linkTrackVars:"events,eVar49",linkTrackEvents:"event23",events:"event23"},n+" phone number",!0)}),s.find(".maplink").click(function(t){var n=jQuery(this).data("storename");e.metrics.trackCustomLink({linkTrackVars:"events,eVar49",linkTrackEvents:"event23",events:"event23"},n+" Map",!0)}),s.find(".reserveBtn").css("cursor","pointer").click(function(r){var i=jQuery(this),s=jQuery(this).parents("li"),o=jQuery.extend({},{},t.selectedOptions);if(n.master||n.variant||n.productSet){if(t.selectedVar==null)return!1;o.pid=t.selectedVar.id}else o.pid=t.pid;var u=e.URLs.reserveProduct+"?"+jQuery.param(o);return u=e.util.appendParamToURL(u,"StoreID",i.data("id")),isNaN(i.data("num"))||(u=e.util.appendParamToURL(u,"StoreNum",i.data("num"))),u=e.util.appendParamToURL(u,"format","ajax"),e.dialog.open(u," "),!1});return}o.html(d),a.show().addClass("nostores"),s.find("ul.stores").remove();return}o.html(e.resources.FIND_IN_STORE_NOLOCATIONS),a.show().addClass("nostores"),s.find("ul.stores").remove();return}o.html(e.resources.FIND_IN_STORE_NOSKU),a.hide(),s.find("ul.stores").remove()},refreshDescription:function(){function s(s){"colorLongDescription"in s&&s.colorLongDescription!=null&&n.show().find(".colorLongDesc").html(s.colorLongDescription),"colorShortDescription"in s&&s.colorShortDescription!=null&&r.show().html(s.colorShortDescription).prev(".selectedvarval").css("font-weight","bold");if("styledWith"in s&&i.length>0&&s.styledWith.length>0){var o=[];for(var u=0;u<s.styledWith.length;u++){var a=s.styledWith[u];o.push('<a href="'+a.url+'" title="'+a.name+'" class="tooltip">'+a.name+'<span class="tooltip-body" style="display:none"><img src="'+a.image+'" /></span></a>')}i.show().find(".styledWithProds").html(o.join("<span>, </span>")),e.device=="desktop"&&e.tooltip({selector:t+" .styledWithProds .tooltip",options:{position:"top",theme:"tooltipster-pdp-styledwith",trigger:"hover"}})}}var t=this.containerId,n=jQuery(this.containerId+" .colorLongDescription"),r=jQuery(this.containerId+" .colorShortDescription"),i=jQuery(this.containerId+" .styledWith");n.hide(),r.hide().prev(".selectedvarval").css("font-weight","normal"),i.hide();if(this.selectedVar!=null)s(this.selectedVar);else if(this.selectedVarAttribs!=null&&"color"in this.selectedVarAttribs&&this.selectedVarAttribs.color!=null){var o=this.findVariations({id:"color",val:this.selectedVarAttribs.color});o.length>0&&s(o[0])}},setProductImageAltTags:function(){try{var e=this,t=jQuery(e.containerId).find("h1.productname").text(),n=e.selectedVarAttribs.color,r=t+" - "+n;jQuery("#foreImageSjElement4_img").attr("alt",r)}catch(i){}},setProductAltImageAltTags:function(e){try{var t=this,n=jQuery(t.containerId).find("h1.productname").text(),r=t.selectedVarAttribs.color,i=n+" - "+r;jQuery(e).find("img").each(function(){jQuery(this).attr("alt",i)})}catch(s){}},varAttrSelected:function(e){this.showSelectedVarAttrVal(e.data.id,e.data.val||""),this.selectedVarAttribs[e.data.id]=e.data.val,e.data.val==null?this.variant=!1:this.variant=!0;var t=this;if(!i){var r=e.data.val!=null?this.findVariations({id:e.data.id,val:e.data.val}):null,s=jQuery.extend({},{},this.selectedVarAttribs),o=null,u=new Array;for(var a in s)s[a]?o=this.findVariations({id:a,val:s[a]},o):u.push(a);jQuery.each(n.variations.attributes,function(){this.id==e.data.id&&e.data.val!=null||s[this.id]!=null?this.id!=e.data.id&&s[this.id]!=null&&t.varAttrDisplayHandler(this.id,r):t.varAttrDisplayHandler(this.id,o)}),this.selectedVar=this.findVariation(this.selectedVarAttribs)}this.refreshView(),e.data.id=="size"&&jQuery(window).trigger("sizechange",[{size:e.data.val}])},resetVariations:function(){if(i)return;var e=this;jQuery(this.containerId+" .variationattributes .swatches").each(function(){var t=jQuery(this).data("data");jQuery(this).find("a.swatchanchor").each(function(){var n=jQuery(this),r=n.find(".swatchDispName").text();e.isVariation({id:t,val:r})?n.parent().removeClass("unselectable"):n.parent().removeClass("selected").addClass("unselectable")})}),jQuery(this.containerId+" .variationattributes .variantdropdown select").each(function(){var t=jQuery(this).data("data"),n=this.options.length;jQuery.each(this.options,function(){if(n>1&&this.index==0)return;var r=jQuery(this);r.attr("orig-text")?r.html(r.attr("orig-text")):r.attr("orig-text",r.text()),e.isVariation({id:t,val:this.value})?r.removeAttr("disabled"):r.removeAttr("selected").attr("disabled","true")})}),jQuery(this.containerId+" .variationsgrid input.skuquantity").each(function(){var t=jQuery(this),n=t.data("color"),r=t.data("size"),i=e.isVariationOrderable({id:"color",val:n},{id:"size",val:r});if(i){t.removeAttr("disabled").removeClass("disabled").attr("data-sku",i.id).attr("data-price",i.pricing.sale);if(e.source=="cart"&&typeof basket!="undefined"){var s=jQuery.grep(basket.productLineItems,function(e,t){return e.sku==i.id});s.length>0&&t.val(s[0].quantity)}}else t.attr("disabled","true").addClass("disabled").val("")})},varAttrDisplayHandler:function(e,t){var n=this;jQuery(this.containerId+" .variationattributes .swatches").each(function(){var r=jQuery(this).data("data");r===e&&jQuery(this).find("a.swatchanchor").each(function(){var r=jQuery(this).parent(),i=n.findVariations({id:e,val:jQuery(this).find(".swatchDispName").text()},t);i.length>0?r.removeClass("unselectable"):(r.addClass("unselectable"),r.hasClass("selected")&&(n.showSelectedVarAttrVal(e,""),n.selectedVarAttribs[e]=null),r.removeClass("selected"))})}),jQuery(this.containerId+" .variationattributes .variantdropdown select").each(function(){var r=jQuery(this).data("data");if(r===e){var i=this.options.length;jQuery.each(this.options,function(){if(i>1&&this.index==0)return;var r=jQuery(this);r.attr("orig-text")||r.attr("orig-text",r.text());var s=n.findVariations({id:e,val:this.value},t);if(s.length>0){r.removeAttr("disabled");if(s.length==1){var o=m(s[0]);r.html(r.attr("orig-text")+" &nbsp <i>"+o+"</i>")}}else{r.attr("disabled","true");var o=m(null);r.html(r.attr("orig-text")+" &nbsp <i>"+o+"</i>"),this.selected&&(n.showSelectedVarAttrVal(e,""),n.selectedVarAttribs[e]=null),r.removeAttr("selected")}})}})},refreshView:function(){var t=this;!i&&this.selectedVar==null&&(this.selectedVar=this.findVariation(this.selectedVarAttribs)),this.refreshDescription(),this.refreshStoreAvailability();if(!i&&this.selectedVar!=null)y(v(t,1)),this.showUpdatedPrice(b(t),this.selectedVar.pricing.standard),!this.selectedVar.inStock&&this.selectedVar.avStatus===e.constants.AVAIL_STATUS_NOT_AVAILABLE||!(this.getPrice()>0||this.isPromoPrice())?(this.disableA2CButton(),jQuery(this).trigger("AddtoCartDisabled")):(this.enableA2CButton(),jQuery(this).trigger("AddtoCartEnabled"));else{if(i)y(e.showProgress("productloader"));else{var r=jQuery(this.containerId+" .color .selected").length>0,s=jQuery(this.containerId+" .size .selected").length>0;jQuery(this.containerId+" .size select").length>0&&(s=jQuery(this.containerId+" .size select").val()!=""),r&&!s?y(e.resources.SELECT_SIZE):!r&&s?y(e.resources.SELECT_COLOR):!r&&!s&&y(e.resources.NON_SELECTED)}this.disableA2CButton(),jQuery(this).trigger("AddtoCartDisabled")}var o=[],u=null;for(var a in this.selectedVarAttribs)this.selectedVarAttribs[a]&&(u=this.findVariations({id:a,val:this.selectedVarAttribs[a]},u));jQuery.each(n.variations.attributes,function(){t.showSelectedVarAttrVal(this.id,t.selectedVarAttribs[this.id]);if(!t.selectedVarAttribs[this.id]||t.selectedVarAttribs[this.id]=="")o.push(this.name),t.varAttrDisplayHandler(this.id,u)})},showUpdatedPrice:function(t,r){var i=Number(r||0),s=Number(t||0),o="",u={salePrice:s,standardPrice:i};e.ajax.getJson({url:e.URLs.formatMoney,cache:!0,async:!1,data:{salePrice:s,standardPrice:i},callback:function(e){u=e}}),i>0&&i>s?(o='<div class="standardprice">'+u.standardPrice+" </div>",o+=s>0||this.isPromoPrice()?'<div class="salesprice standardP strikethrough">'+u.salePrice+"</div>":' <div class="salesprice">N/A</div>'):o=s>0||this.isPromoPrice()?'<div class="salesprice standardP">'+u.salePrice+"</div>":' <div class="salesprice">N/A</div>',n.bundle||n.productSet?jQuery("#price-"+this.pid).html(o):jQuery(this.containerId+" .productinfo:first .pricing:first .price").html(o)},getPrice:function(){return b(this)},isPromoPrice:function(){return this.selectedVar!=null?this.selectedVar.pricing.isPromoPrice:n.pricing.isPromoPrice},isVariation:function(e,t){var r=null;for(var i=0;i<n.variations.variants.length;i++){r=n.variations.variants[i];if(r.attributes[e.id]==e.val&&(t==undefined||r.attributes[t.id]==t.val))return!0}return!1},isVariationOrderable:function(t,r){var i=null;for(var s=0;s<n.variations.variants.length;s++){i=n.variations.variants[s];if(i.attributes[t.id]==t.val&&(r==undefined||i.attributes[r.id]==r.val)&&(i.inStock||i.avStatus===e.constants.AVAIL_STATUS_BACKORDER&&i.ATS>0||i.avStatus===e.constants.AVAIL_STATUS_PREORDER&&i.ATS>0))return i}return null},findVariations:function(t,r){var i=new Array;r=r||n.variations.variants;var s=null,o=null;jQuery.isArray(t)?(t.length>0&&(s=t[0]),t.length>1&&(o=t[1])):s=t;var u=null;for(var a=0;a<r.length;a++)u=r[a],u.attributes[s.id]===s.val&&(o==undefined||u.attributes[o.id]===o.val)&&(u.inStock||u.avStatus===e.constants.AVAIL_STATUS_BACKORDER&&u.ATS>0||u.avStatus===e.constants.AVAIL_STATUS_PREORDER&&u.ATS>0)&&i.push(u);return i},findVariation:function(e){if(!this.checkAttrs(e))return null;var t=function(e){var t="";return jQuery.each(n.variations.attributes,function(){t+=e[this.id]}),t},r=t(e);for(var i=0;i<n.variations.variants.length;i++){variant=n.variations.variants[i];if(t(variant.attributes)===r)return variant}return null},findVariationById:function(e){for(var t=0;t<n.variations.variants.length;t++){var r=n.variations.variants[t];if(r&&r.id===e)return r}return{}},checkAttrs:function(e){for(var t=0;t<n.variations.attributes.length;t++)if(e[n.variations.attributes[t].id]==null)return!1;return!0},getAttrByID:function(e){for(var t=0;t<n.variations.attributes.length;t++)if(n.variations.attributes[t].id===e)return n.variations.attributes[t];return{}},getAttrValIDByDisplayVal:function(e,t){for(var n=0;n<e.vals.length;n++)if(e.vals[n].val==t)return e.vals[n].id;return null},getAvStatus:function(){return(this.variant||this.master)&&this.selectedVar!=null?this.selectedVar.avStatus:n.avStatus},getATS:function(){return(this.variant||this.master)&&this.selectedVar!=null?this.selectedVar.ATS:n.ATS},getAvailabilityQty:function(){return(this.variant||this.master)&&this.selectedVar!=null?this.selectedVar.avStatusQuantity:n.avStatusQuantity},getAvLevels:function(){return(this.variant||this.master)&&this.selectedVar!=null?this.selectedVar.avLevels:n.avLevels},getInStockDate:function(){return(this.variant||this.master)&&this.selectedVar!=null?this.selectedVar.inStockDate:n.inStockDate},isA2CEnabled:function(){return this.variant||this.master?this.selectedVar!=null?this.selectedVar.avStatus===e.constants.AVAIL_STATUS_IN_STOCK||this.selectedVar.avStatus===e.constants.AVAIL_STATUS_BACKORDER||this.selectedVar.avStatus===e.constants.AVAIL_STATUS_PREORDER:!1:n.avStatus===e.constants.AVAIL_STATUS_IN_STOCK||n.avStatus===e.constants.AVAIL_STATUS_BACKORDER||n.avStatus===e.constants.AVAIL_STATUS_PREORDER},show:function(t){var i=this;this.containerId="#"+t.containerId,r=this.containerId
;var s=!1;t.source&&(s=t.source=="quickview",this.source=t.source);if(n.master||n.variant){var d=t.append?jQuery(i.containerId+" #pdpImgUrl:first").val():jQuery(i.containerId+" #pdpImgUrl:last").val();i.loadAltImages(d),jQuery(this).bind("VariationsLoaded",{},function(t,r){i.resetVariations();var s=a(n.variations.variants);if(s==0&&jQuery(i.containerId+" .variationsgrid table").length==0){y(e.resources[e.constants.AVAIL_STATUS_NOT_AVAILABLE]);var o=jQuery(this.containerId+" .productattributes .addtocart");jQuery(".variationattributes > *:not(.availability)",o).remove(),jQuery(".promoMessage",o).remove(),jQuery(".productactions",o).remove()}jQuery(this.containerId+" .variationattributes .swatches").each(function(){var e=jQuery(this),t=e.data("data");e.find(".selected a").each(function(){var e=jQuery(this),n=e.find(".swatchDispName").text();i.varAttrSelected({data:{id:t,val:n}})})}),jQuery(this.containerId+" .variationattributes .variantdropdown select").each(function(){var e=jQuery(this),t=e.data("data");this.selectedIndex>=0&&this.options[this.selectedIndex].value!=""&&i.varAttrSelected({data:{id:t,val:this.options[this.selectedIndex].value}})})}),o(this),jQuery(i.containerId+" .variationattributes .swatches").each(function(){var e=jQuery(this),t=e.data("data"),n=i.getAttrByID(t);if(!n)return;var r=function(n){var r=jQuery(this),s=r.parent(),o=r.find(".swatchDispName").text();n.data={id:t,val:o};if(t!="color"&&s.hasClass("unselectable"))return!1;if(s.hasClass("selected"))n.data={id:t,val:null},s.removeClass("selected"),i.resetVariations(),i.varAttrSelected(n);else{n.data={id:t,val:o},e.find(".selected").removeClass("selected"),s.addClass("selected"),i.varAttrSelected(n);if(t=="color"){var a=e.find(".selected div:not(.swatchDispName)").text();jQuery(window).trigger("colorchange",[{colorCode:a}]);var f=document.location.protocol=="https:"?"https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/ToryBurchLLC/":"http://s7d5.scene7.com/is/image/ToryBurchLLC/",l=jQuery(i.containerId+" #masterProduct:first").val(),c=e.find(".selected a.swatchanchor").attr("name"),h=jQuery(i.containerId+" #pdpImgSize").length>0?jQuery(i.containerId+" #pdpImgSize").val():"$trb_detail$";jQuery(i.containerId+" #pdpFullDetailsLink a").attr("href",c),jQuery(".productimagequickshop").length>0?(jQuery(i.containerId+" .productimagequickshop img:not(.monogramImage)").attr("src",f+"TB"+"_"+l+"_"+a+"?"+h),i.loadAltImages("TB_"+l+"_"+a)):jQuery(".productimageset").length>0?(jQuery(i.containerId+" .productimage img").attr("src",f+"TB"+"_"+l+"_"+a+"?"+h),i.loadAltImages("TB_"+l+"_"+a)):jQuery(i.containerId+" #izView").length>0?(pViewer?pViewer.changeImage(f+"TB"+"_"+l+"_"+a,a):jQuery(i.containerId+" #izView .defaultImage").attr("src",f+"TB"+"_"+l+"_"+a+"?"+h),i.loadAltImages("TB_"+l+"_"+a)):(jQuery(i.containerId+" .productimage img").attr("src",f+"TB"+"_"+l+"_"+a+"?"+h),i.loadAltImages("TB_"+l+"_"+a))}else u(i,i.selectedOptions.Quantity)}return!1},s=e.find("a.swatchanchor");t==="color"?s.data("data",{id:t}).click(r):s.data("data",{id:t}).click(r)}),jQuery(i.containerId+" .variationattributes .variantdropdown select").each(function(){var e=jQuery(this),t=e.data("data");e.change(function(e){if(this.selectedIndex==0&&this.options.length==1)return;e.data={id:t,val:this.options[this.selectedIndex].value},this.selectedIndex==0&&i.resetVariations(),i.varAttrSelected(e),u(i,i.selectedOptions.Quantity)})})}f(this),n.productSet||(n.bundle?n.bundle&&y(v(this,1)):c(this)),l(this),(!(this.getPrice()>0||this.isPromoPrice())||n.master||n.variant||n.productSet||n.bundle||!n.inStock&&n.avStatus===e.constants.AVAIL_STATUS_NOT_AVAILABLE&&!n.productSet)&&this.disableA2CButton();if(n.bundle||n.productSet){var m=!1,g=new Number;for(var b=0;b<i.subProducts.length;b++){var w=i.subProducts[b];m=w.isA2CEnabled();if(!m)break;g+=new Number(w.getPrice())}m?(this.enableA2CButton(),n.bundle||i.showUpdatedPrice(g)):this.disableA2CButton()}p(this),h(this.containerId,s),jQuery.each(i.subProducts,function(){jQuery(this).bind("AddtoCartDisabled",{},function(){i.disableA2CButton()})}),jQuery.each(i.subProducts,function(){jQuery(this).bind("AddtoCartEnabled",{},function(){var e=!0,t=i.subProducts,r=new Number;for(var s=0;s<t.length;s++){if((t[s].variant||t[s].master)&&t[s].selectedVar==null||!t[s].bundled&&(t[s].selectedOptions["Quantity"]==undefined||t[s].selectedOptions.Quantity<=0)){e=!1;break}t[s].selectedVar!=null?t[s].selectedOptions.pid=t[s].selectedVar.pid:t[s].selectedOptions.pid=t[s].pid;var o=t[s].selectedOptions.Quantity;o==undefined&&(o=1),r+=new Number(o*t[s].getPrice())}e&&(n.productSet||n.inStock)&&(r>0||i.isPromoPrice())?(i.enableA2CButton(),n.bundle||i.showUpdatedPrice(r)):i.disableA2CButton()})})},toString:function(){return this.model}}}:alert("app is undefined!")})(app);