//tealium universal tag - utag.320 ut4.0.201410211719, Copyright 2014 Tealium.com Inc. All Rights Reserved.
function rkg_track_sid(mid){if(!(document.referrer&&document.referrer.match('://([^/]+)')[1].toLowerCase().match(document.domain.match('[^.]*\.[^.]*$')[0].toLowerCase()))){var href=document.location.protocol+"//mct.rkdms.com/sid.gif?mid="+mid
+"&ref="+encodeURIComponent(document.referrer);var src=window.location.href.match(/rkg_src=.*(&|$)/);if(src&&src[0]){var s=src[0].replace('rkg_src=','');href+="&src="+s;}
return href;}}
if(typeof utag.ut=="undefined"){utag.ut={};}
utag.ut.libloader2=function(o,a,b,c,l){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.async=true;b.src=o.src;if(o.id){b.id=o.id}
if(typeof o.cb=='function'){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}
l=o.loc||'head';c=a.getElementsByTagName(l)[0];if(c){if(l=='script'){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}
utag.DB("Attach to "+l+": "+o.src);}};try{(function(id,loader){var u=utag.o[loader].sender[id]={};u.ev={'view':1};u.initialized=false;u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f,i;u.data={"mid":"ninewest"};for(d in utag.loader.GV(u.map)){if(typeof b[d]!='undefined'){e=u.map[d].split(',');for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
try{u.img=new Image();u.img.src=rkg_track_sid(u.data.mid);}catch(e){}
}};utag.o[loader].loader.LOAD(id);})('320','thejonesgroup.easyspirit');}catch(e){}
