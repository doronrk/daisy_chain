//tealium universal tag - utag.32 ut4.0.201411132046, Copyright 2014 Tealium.com Inc. All Rights Reserved.
window.GoogleAnalyticsObject="";if(window.GoogleAnalyticsObject==""){window.GoogleAnalyticsObject="ga"};window[window.GoogleAnalyticsObject]=window[window.GoogleAnalyticsObject]||function(){(window[window.GoogleAnalyticsObject].q=window[window.GoogleAnalyticsObject].q||[]).push(arguments);};try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState==='complete'||this.readyState==='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1,'link':1};u.o=window[window.GoogleAnalyticsObject];u.created=false;u.all=function(e,o,v,a,b){for(var i=0;i<u.data.account.length;i++){var t=(u.data.name[i]?u.data.name[i]+".":"");if(o==="event"){u.o(t+e,o,v,a,b)}else if(v){u.o(t+e,o,v)}else{u.o(t+e,o);}}}
u.map={"page_id":"title","order_grand_subtotal":"revenue"};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){u.o=window[window.GoogleAnalyticsObject];b.ga_events=b.ga_events||[];u.addEvent=function(v){if(typeof v.eventCategory=="undefined"||typeof v.eventAction=="undefined"){utag.DB("GA event Category or Action is not set");return;}
if(v.eventValue&&isNaN(parseInt(v.eventValue))){utag.DB("GA event Value is not a number");v.eventValue=null;}else{v.eventValue=parseInt(v.eventValue)||null;}
b.ga_events.push(v);}
var c,d,e,f,g;u.data={"qsp_delim":"&","kvp_delim":"=","base_url":"","a":a,"cookieDomain":""||utag.loader.lh(),"name":"","account":"UA-45103817-1","anonymizeIp":("false"==="true"?true:false),"allowLinker":false,"crossDomainTrack":"","enhancedLinkAttribution":"false","enhancedecommerce":"false","displayfeatures":"false","screenView":"false","enh_action":"","enh_event_cb":"","enh_checkout_step":"","enh_checkout_option":"","product_id":[],"product_name":[],"product_category":[],"product_brand":[],"product_unit_price":[],"product_quantity":[],"product_discount":[],"product_action_list":"","enh_impression_id":[],"enh_impression_name":[],"enh_impression_type":[],"enh_impression_category":[],"enh_impression_brand":[],"enh_impression_list":[],"enh_impression_position":[],"enh_promo_id":[],"enh_promo_name":[],"enh_promo_creative":[],"enh_promo_position":[],"id":"","order_id":"","order_total":"","order_shipping":"","order_tax":"","order_store":"","order_currency":"","order_coupon_code":"","product_id":[],"product_name":[],"product_brand":[],"product_category":[],"product_quantity":[],"product_unit_price":[],"product_discount":[]};c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f].indexOf("ec_add.")===0){u.data.ec_add.push([[e[f].substr(7)],b[d]]);}else{u.data[e[f]]=b[d];}}}}
u.data.order_id=u.data.order_id||b._corder;u.data.order_total=u.data.order_total||b._ctotal;u.data.order_shipping=u.data.order_shipping||b._cship;u.data.order_tax=u.data.order_tax||b._ctax;u.data.order_store=u.data.order_store||b._cstore;u.data.order_currency=u.data.order_currency||b._ccurrency;u.data.order_coupon_code=u.data.order_coupon_code||b._cpromo;if(u.data.product_id.length===0&&b._cprod!==undefined){u.data.product_id=b._cprod.slice(0);}
if(u.data.product_name.length===0&&b._cprodname!==undefined){u.data.product_name=b._cprodname.slice(0);}
if(u.data.product_brand.length===0&&b._cbrand!==undefined){u.data.product_brand=b._cbrand.slice(0);}
if(u.data.product_category.length===0&&b._ccat!==undefined){u.data.product_category=b._ccat.slice(0);}
if(u.data.product_quantity.length===0&&b._cquan!==undefined){u.data.product_quantity=b._cquan.slice(0);}
if(u.data.product_unit_price.length===0&&b._cprice!==undefined){u.data.product_unit_price=b._cprice.slice(0);}
if(u.data.product_discount.length===0&&b._cpdisc!==undefined){u.data.product_discount=b._cpdisc.slice(0);}
if(typeof u.data.account==="string"){u.data.account=u.data.account.replace(/\s/g,"").split(",")};if(typeof u.data.name==="string"){u.data.name=u.data.name.replace(/\s/g,"").split(",")};if(u.created===false){u.created=true;for(f=0;f<u.data.account.length;f++){c=new Object();if(u.data.siteSpeedSampleRate){c.siteSpeedSampleRate=parseInt(u.data.siteSpeedSampleRate)};c.cookieDomain=u.data.cookieDomain;if(u.data.cookieExpires||u.data.cookieExpires==="0"){c.cookieExpires=parseInt(u.data.cookieExpires)};if(u.data.legacyCookieDomain){c.legacyCookieDomain=u.data.legacyCookieDomain};c.allowLinker=u.data.allowLinker;if(typeof u.data.name[f]!=="undefined"&&u.data.name[f]!==""){c.name=u.data.name[f]};u.o("create",u.data.account[f],c);}}
if(u.data.allowLinker===true&&u.data.crossDomainTrack!==undefined&&typeof u.data.crossDomainTrack==="string"){u.all("require","linker");u.data.crossDomainTrack=u.data.crossDomainTrack.split(",");u.all("linker:autoLink",u.data.crossDomainTrack);};if(u.data.anonymizeIp){u.all("set",'anonymizeIp',true)};if(u.data.uid){u.all("set","&uid",u.data.uid)};if(u.data.page){u.all("set","page",u.data.page)};if(u.data.title){u.all("set","title",u.data.title)};if(u.data.location){u.all("set","location",u.data.location)};if(u.data.nonInteraction){u.all("set","nonInteraction",true)};if(u.data.campaignName){u.all("set","campaignName",u.data.campaignName)};if(u.data.campaignSource){u.all("set","campaignSource",u.data.campaignSource)};if(u.data.campaignMedium){u.all("set","campaignMedium",u.data.campaignMedium)};if(u.data.campaignContent){u.all("set","campaignContent",u.data.campaignContent)};if(u.data.campaignKeyword){u.all("set","campaignKeyword",u.data.campaignKeyword)};if(u.data.displayfeatures==="true"||u.data.displayfeatures===true){u.all("require","displayfeatures");}
for(d in utag.loader.GV(u.data)){if(d.indexOf("metric")==0||d.indexOf("dimension")==0||d.indexOf("contentGroup")==0){u.all("set",d,u.data[d]);}}
u.data.transaction_events={};u.data.pageview_events={};u.data.link_events={};for(d in utag.loader.GV(u.data)){if(d.indexOf("-")>-1&&(d.indexOf("metric")>-1||d.indexOf("dimension")>-1||d.indexOf("contentGroup")>-1)){if(d.indexOf("transaction-")===0){u.data.transaction_events[d]=u.data[d];}else if(d.indexOf("pageview-")===0){u.data.pageview_events[d]=u.data[d];}else if(d.indexOf("link-")===0){u.data.link_events[d]=u.data[d];}}else if(d.indexOf("metric")===0||d.indexOf("dimension")===0||d.indexOf("contentGroup")===0){u.all("set",d,u.data[d]);}}
if(u.data.enhancedLinkAttribution==="true"){u.all("require","linkid","linkid.js");}
u.data.order_id=(u.data.order_id?u.data.order_id:u.data.id);if(u.data.enhancedecommerce==="true"){u.all("require","ec");u.all("set",'&cu',(u.data.currency?u.data.currency:u.data.order_currency));if(u.data.enh_action==="product_click"&&u.data.a==="link"){g={};g.id=u.data.product_id[0];g.name=(u.data.product_name[0]?u.data.product_name[0]:u.data.product_id[0]);g.brand=(u.data.product_brand[0]?u.data.product_brand[0]:"");g.category=(u.data.product_category[0]?u.data.product_category[0]:"");g.price=(u.data.product_unit_price[0]?u.data.product_unit_price[0]:"1.00");g.quantity=(u.data.product_quantity[0]?u.data.product_quantity[0]:"1");u.all("ec:addProduct",g);ga('ec:setAction','click',{list:u.data.product_action_list});u.all('send','event','UX','click','Results',{'hitCallback':window[u.data.enh_event_cb]});}else if(u.data.enh_action==="detail"){g={};g.id=u.data.product_id[0];g.name=(u.data.product_name[0]?u.data.product_name[0]:u.data.product_id[0]);g.brand=(u.data.product_brand[0]?u.data.product_brand[0]:"");g.category=(u.data.product_category[0]?u.data.product_category[0]:"");g.price=(u.data.product_unit_price[0]?u.data.product_unit_price[0]:"1.00");g.quantity=(u.data.product_quantity[0]?u.data.product_quantity[0]:"1");u.all('ec:addProduct',g);u.all("ec:addProduct",g);u.all("ec:setAction","detail");}else if(u.data.enh_action==="promo_click"&&u.data.a==="link"){g={};g.id=u.data.enh_promo_id[0];g.name=u.data.enh_promo_name[0];g.creative=u.data.enh_promo_creative[0];g.position=u.data.enh_promo_position[0];u.all('ec:addPromo',g);u.all('ec:setAction',u.data.enh_action);u.all('send','event','Internal Promotions','click',(g.name?g.name:g.id));}else if(u.data.enh_action==="add"){for(f=0;f<u.data.product_id.length;f++){g={};g.id=u.data.product_id[f];g.name=(u.data.product_name[f]?u.data.product_name[f]:u.data.product_id[f]);g.brand=(u.data.product_brand[f]?u.data.product_brand[f]:"");g.category=(u.data.product_category[f]?u.data.product_category[f]:"");g.price=(u.data.product_unit_price[f]?u.data.product_unit_price[f]:"1.00");g.quantity=(u.data.product_quantity[f]?u.data.product_quantity[f]:"1");u.all('ec:addProduct',g);}
u.all('ec:setAction','add');if(u.data.a==="link"){u.all('send','event','UX','click','add to cart');}}else if(u.data.enh_action==="remove"){for(f=0;f<u.data.product_id.length;f++){g={};g.id=u.data.product_id[f];g.name=(u.data.product_name[f]?u.data.product_name[f]:u.data.product_id[f]);g.brand=(u.data.product_brand[f]?u.data.product_brand[f]:"");g.category=(u.data.product_category[f]?u.data.product_category[f]:"");g.price=(u.data.product_unit_price[f]?u.data.product_unit_price[f]:"1.00");g.quantity=(u.data.product_quantity[f]?u.data.product_quantity[f]:"1");u.all('ec:addProduct',g);}
u.all('ec:setAction','remove');if(u.data.a==="link"){u.all('send','event','UX','click','remove from cart');}}else if(u.data.enh_action==="checkout"){for(f=0;f<u.data.product_id.length;f++){g={};g.id=u.data.product_id[f];g.name=(u.data.product_name[f]?u.data.product_name[f]:u.data.product_id[f]);g.brand=(u.data.product_brand[f]?u.data.product_brand[f]:"");g.category=(u.data.product_category[f]?u.data.product_category[f]:"");g.price=(u.data.product_unit_price[f]?u.data.product_unit_price[f]:"1.00");g.quantity=(u.data.product_quantity[f]?u.data.product_quantity[f]:"1");u.all('ec:addProduct',g);}
g={};g.step=u.data.enh_checkout_step||"1";g.option=u.data.enh_checkout_option;u.all('ec:setAction',u.data.enh_action,g);}else if(u.data.order_id&&u.data.enh_action==="refund"){if(u.data.order_id instanceof Array&&u.data.order_id.length>0){u.data.order_id=u.data.order_id[0];}
for(f=0;f<u.data.product_id.length;f++){g={};g.id=u.data.product_id[f];g.quantity=(u.data.product_quantity[f]?u.data.product_quantity[f]:"1");u.all('ec:addProduct',g);}
g={};g.id=u.data.order_id;u.all('ec:setAction','refund',g);}else if(u.data.order_id){if(u.data.order_id instanceof Array&&u.data.order_id.length>0){u.data.order_id=u.data.order_id[0];}
for(f=0;f<u.data.product_id.length;f++){g={};g.id=u.data.product_id[f];g.name=(u.data.product_name[f]?u.data.product_name[f]:u.data.product_id[f]);g.brand=(u.data.product_brand[f]?u.data.product_brand[f]:"");g.category=(u.data.product_category[f]?u.data.product_category[f]:"");g.price=(u.data.product_unit_price[f]?u.data.product_unit_price[f]:"1.00");g.quantity=(u.data.product_quantity[f]?u.data.product_quantity[f]:"1");g.coupon=(u.data.product_discount.length[f]?u.data.product_discount.length[f]:"");u.all('ec:addProduct',g);}
g={};g.id=u.data.order_id;g.affiliation=(u.data.affiliation?u.data.affiliation:u.data.order_store);g.revenue=(u.data.revenue?u.data.revenue:u.data.order_total);g.shipping=(u.data.shipping?u.data.shipping:u.data.order_shipping);g.tax=(u.data.tax?u.data.tax:u.data.order_tax);g.coupon=(u.data.coupon?u.data.coupon:u.data.order_coupon_code);u.all('ec:setAction','purchase',g);}
if(u.data.enh_action==="checkout_option"&&u.data.a==="link"){g={};g.step=u.data.enh_checkout_step||"1";g.option=u.data.enh_checkout_option;u.all('ec:setAction',u.data.enh_action,g);u.all('send','event','Checkout','Option',{'hitCallback':window[u.data.enh_event_cb]});}
if(u.data.enh_impression_id){for(f=0;f<u.data.enh_impression_id.length;f++){g={};g.id=u.data.enh_impression_id[f];g.name=(u.data.enh_impression_name[f]?u.data.enh_impression_name[f]:u.data.enh_impression_id[f]);g.brand=(u.data.enh_impression_brand[f]?u.data.enh_impression_brand[f]:"");g.category=(u.data.enh_impression_category[f]?u.data.enh_impression_category[f]:"");g.list=(u.data.enh_impression_list[f]?u.data.enh_impression_list[f]:"");g.position=(u.data.enh_impression_position[f]?u.data.enh_impression_position[f]:"");u.all('ec:addImpression',g);}}
if(u.data.enh_promo_id&&u.data.a==="view"){for(f=0;f<u.data.enh_promo_id.length;f++){g={};g.id=u.data.enh_promo_id[f];g.name=(u.data.enh_promo_name[f]?u.data.enh_promo_name[f]:u.data.enh_promo_id[f]);g.creative=(u.data.enh_promo_creative[f]?u.data.enh_promo_creative[f]:"");g.position=(u.data.enh_promo_position[f]?u.data.enh_promo_position[f]:"");u.all('ec:addPromo',g);}}
if(u.data.a==="view"){g={};if(u.data.order_id){for(d in utag.loader.GV(u.data.transaction_events)){g[d.split("-")[1]]=u.data.transaction_events[d];}}
for(d in utag.loader.GV(u.data.pageview_events)){g[d.split("-")[1]]=u.data.pageview_events[d];}
g.hitType="pageview";u.all("send",g);}}else if(u.data.a==="view"){g={};for(d in utag.loader.GV(u.data.pageview_events)){g[d.split("-")[1]]=u.data.pageview_events[d];}
g.hitType="pageview";u.all("send",g);if(u.data.order_id&&!(u.data.order_id instanceof Array)){u.all("require","ecommerce","ecommerce.js");g={};for(d in utag.loader.GV(u.data.transaction_events)){g[d.split("-")[1]]=u.data.transaction_events[d];}
g.id=u.data.order_id;g.affiliation=(u.data.affiliation?u.data.affiliation:u.data.order_store);g.revenue=(u.data.revenue?u.data.revenue:u.data.order_total);g.shipping=(u.data.shipping?u.data.shipping:u.data.order_shipping);g.tax=(u.data.tax?u.data.tax:u.data.order_tax);g.currency=(u.data.currency?u.data.currency:u.data.order_currency);u.all('ecommerce:addTransaction',g);for(f=0;f<u.data.product_id.length;f++){g={};g.id=u.data.order_id;g.sku=u.data.product_id[f];g.name=(u.data.product_name[f]?u.data.product_name[f]:u.data.product_id[f]);g.category=(u.data.product_category[f]?u.data.product_category[f]:"");g.price=(u.data.product_unit_price[f]?u.data.product_unit_price[f]:"1.00");g.quantity=(u.data.product_quantity[f]?u.data.product_quantity[f]:"1");u.all('ecommerce:addItem',g);}
u.all('ecommerce:send');}else if(u.data.order_id instanceof Array&&u.data.order_id.length>0){u.all("require","ecommerce","ecommerce.js");var lastindex=0;for(f=0;f<u.data.order_id.length;f++){if(f===u.data.order_id.length-1||(u.data.order_id[f]!==u.data.order_id[f+1])){g={};for(d in utag.loader.GV(u.data.transaction_events)){g[d.split("-")[1]]=u.data.transaction_events[d];}
g.id=u.data.order_id[f];g.affiliation=(u.data.affiliation&&typeof u.data.affiliation[f]!=="undefined"?u.data.affiliation[f]:u.data.order_store);g.revenue=(u.data.revenue&&typeof u.data.revenue[f]!=="undefined"?u.data.revenue[f]:u.data.order_total);g.shipping=(u.data.shipping&&typeof u.data.shipping[f]!=="undefined"?u.data.shipping[f]:u.data.order_shipping);g.tax=(u.data.tax&&typeof u.data.tax[f]!=="undefined"?u.data.tax[f]:u.data.order_tax);g.currency=(u.data.currency?u.data.currency:u.data.order_currency);u.all('ecommerce:addTransaction',g);for(e=lastindex;e<f+1;e++){g={};g.id=u.data.order_id[f];g.sku=u.data.product_id[e];g.name=(u.data.product_name[e]?u.data.product_name[e]:u.data.product_id[e]);g.category=(u.data.product_category[e]?u.data.product_category[e]:"");g.price=(u.data.product_unit_price[e]?u.data.product_unit_price[e]:"1.00");g.quantity=(u.data.product_quantity[e]?u.data.product_quantity[e]:"1");u.all('ecommerce:addItem',g);}
lastindex=f+1;}}
u.all('ecommerce:send');}}
if(u.data.eventCategory&&u.data.eventAction){g={};for(d in utag.loader.GV(u.data.link_events)){g[d.split("-")[1]]=u.data.link_events[d];}
g.hitType="event";g.eventCategory=u.data.eventCategory;g.eventAction=u.data.eventAction;if(u.data.eventLabel){g.eventLabel=u.data.eventLabel};if(typeof u.data.eventValue!=="undefined"&&u.data.eventValue!==""){g.eventValue=u.data.eventValue;}
u.all("send",g);u.data.eventCategory=u.data.eventAction=u.data.eventLabel=u.data.eventValue="";}
for(e=0;e<b.ga_events.length;e++){g={};for(d in utag.loader.GV(u.data.link_events)){g[d.split("-")[1]]=u.data.link_events[d];}
g.hitType="event";g.eventCategory=b.ga_events[e].eventCategory;g.eventAction=b.ga_events[e].eventAction;g.eventLabel=b.ga_events[e].eventLabel;g.eventValue=b.ga_events[e].eventValue;u.all("send",g);}
if(u.data.socialNetwork&&u.data.socialAction&&u.data.socialTarget){g={};g.hitType="social";g.socialNetwork=u.data.socialNetwork;g.socialAction=u.data.socialAction;g.socialTarget=u.data.socialTarget;u.all("send",g);u.data.socialNetwork=u.data.socialAction=u.data.socialTarget="";}
if(u.data.timingCategory&&u.data.timingVar&&u.data.timingValue){g={};g.hitType="timing";g.timingCategory=u.data.timingCategory;g.timingVar=u.data.timingVar;g.timingValue=u.data.timingValue;g.timingLabel=u.data.timingLabel||"";u.all("send",g);}
if(u.data.screenView==="true"||u.data.screenView===true){g={};g.hitType="screenview";g.appName=u.data.appName||"";g.appId=u.data.appId||"";g.appVersion=u.data.appVersion||"";g.appInstallerId=u.data.appInstallerId||"";g.screenName=u.data.screenName||"";u.all("send",g);}
if(u.data["ga-disable"]){window["ga-disable-"+u.data["ga-disable"]]=true};(function(){var id='tealium-tag-7110';if(document.getElementById(id)){return;}
u.o.l=1*new Date();var e=document.createElement('script');e.async=true;e.id=id;e.src='//www.google-analytics.com/analytics.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(e,s);})();}};utag.o[loader].loader.LOAD(id);}('32','urbanoutfitters.uo-us'));}catch(error){utag.DB(error);}
