//tealium universal tag - utag.7 ut4.0.201405282054, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var _gaq=_gaq||[];try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1,'link':1};u.max_custom=10;u.clearVar=function(){for(var i=1;i<=u.max_custom;i++){_gaq.push([u.prefix+'_deleteCustomVar',i])}};u.domain=""||utag.loader.lh();u.prefix="";u.prefix=((u.prefix)?u.prefix+'.':'');u.ga1="UA-1303489-1";u.setallowlinker=false;u.inpage_linkid=false;if(u.inpage_linkid){_gaq.push(['_require','inpage_linkid','//www.google-analytics.com/plugins/ga/inpage_linkid.js'])};_gaq.push([u.prefix+'_setAccount',u.ga1]);u.anonymizeIp="false";if(u.anonymizeIp==="true"){_gaq.push(['_gat._anonymizeIp'])};_gaq.push([u.prefix+'_setDomainName',u.domain]);if(u.setallowlinker||u.domain=='none'){_gaq.push([u.prefix+'_setAllowLinker',true])};u.map={};u.extend=[];u.send=function(a,b,c,d,e,f,g){if(u.ev[a]||typeof u.ev.all!="undefined"){b.ga_events=b.ga_events||[];u.addEvent=function(v){if(typeof v.eventCategory=="undefined"||typeof v.eventAction=="undefined"){utag.DB("GA event Category or Action is not set");return;}
if(v.eventValue&&isNaN(parseInt(v.eventValue))){utag.DB("GA event Value is not a number");v.eventValue=null;}else{v.eventValue=parseInt(v.eventValue)||null;}
b.ga_events.push(v);return b.ga_events}
u.a=a;for(c in utag.loader.GV(b)){if(typeof u.map[c+":"+b[c]]!="undefined"){b[c+":"+b[c]]=b[c]}}
for(c in utag.loader.GV(b)){if(typeof u.map[c]!="undefined"){d=u.map[c].split(",");for(e=0;e<d.length;e++){if(d[e].indexOf("cvar")>-1){f=d[e].substring(4).split(".");g=parseInt(f[0]);if(g>u.max_custom){u.max_custom=g};_gaq.push([u.prefix+'_setCustomVar',g,((c.indexOf(".")>0)?(c.split("."))[1]:c),b[c],parseInt(f[1])])
}else if(d[e]=="ga_pageOverride"){_gaq.push([u.prefix+'_set',"page",b[c]]);}else if(d[e]=="ga_accountOverride"){_gaq.push([u.prefix+'_setAccount',b[c]])}
else if(d[e]=="ga_eventCategory"){b.ga_eventCat=b[c]}
else if(d[e]=="ga_campaignCookieTimeout"){_gaq.push([u.prefix+'_setCampaignCookieTimeout',b[c]]);}
else if(d[e].indexOf("ga_pageGroup")==0){_gaq.push([u.prefix+'_setPageGroup',d[e].substr(d[e].length-1),b[c]]);}
else if(d[e].indexOf("ga_")==0){b[d[e]]=b[c]}
else{_gaq.push([u.prefix+"_set",d[e],b[c]]);}}}}
if(u.a=="view"){_gaq.push([u.prefix+'_trackPageview']);this.clearVar();}
if(b.ga_socialNetwork&&b.ga_socialAction){_gaq.push([u.prefix+"_trackSocial",b.ga_socialNetwork,b.ga_socialAction,b.ga_socialTarget,b.ga_socialPagePath]);}
if(typeof b.ga_eventCat!="undefined"){u.addEvent({eventCategory:b.ga_eventCat,eventAction:b.ga_eventAction,eventLabel:b.ga_eventLabel||null,eventValue:(typeof b.ga_eventValue!="undefined"?parseInt(b.ga_eventValue):null)});}else if(u.a=="link"&&typeof b.event_name!="undefined"){u.addEvent({eventCategory:b.event_name,eventAction:b.link_type,eventLabel:b.link_text||null});}
for(e=0;e<b.ga_events.length;e++){_gaq.push([u.prefix+"_trackEvent",b.ga_events[e].eventCategory,b.ga_events[e].eventAction,b.ga_events[e].eventLabel,b.ga_events[e].eventValue,b.ga_events[e].nonInteraction||b.ga_nonInteraction||null]);}
this.clearVar();if(b._corder){_gaq.push([u.prefix+'_addTrans',b._corder,b._cstore,(b.ga_totalOverride?b.ga_totalOverride:b._ctotal),b._ctax,b._cship,b._ccity,b._cstate,b._ccountry]);for(c=0;c<b._cprod.length;c++){if(b._cprod[c]){_gaq.push([u.prefix+'_addItem',b._corder,b._cprod[c],(typeof b._cprodname[c]!="undefined"?b._cprodname[c]:""),(typeof b._ccat[c]!="undefined"?b._ccat[c]:""),(typeof b._cprice[c]!="undefined"?b._cprice[c]:""),(typeof b._cquan[c]!="undefined"?b._cquan[c]:"1")]);}}
_gaq.push([u.prefix+'_trackTrans']);}
(function(){var id='tealium-tag-7001';if(document.getElementById(id)){return;}
var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.id=id;ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})();}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('7','hott.hottopic');}catch(e){}
