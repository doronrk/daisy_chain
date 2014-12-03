//~~tv:3077.20130524
//~~tc: Adding mapping override support. Assigning srt only if it is defined.

//tealium universal tag - Chango - utag.sender.3077 ut4.0.201405010940, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.data={};
  u.data.pid="2067";
  u.data.srt="";
  u.map={};
  u.extend=[];

  u.send=function(a,b){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      
      var c,d,e,f;
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        u.data[e[f]]=b[d];
      }}}
      window.__cho__={"pid": u.data.pid};
      window.__cho__.p=b["dom.url"];
      window.__cho__.r=b["dom.referrer"];
      if(u.data.srt){window.__cho__.srt=u.data.srt;}
      (function() {
        var c = document.createElement('script'); c.type = 'text/javascript'; c.async = true;
        c.src = ('https:' == document.location.protocol ? 'https://z': 'http://p') + '.chango.com/static/o.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(c, s);
      })();
    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('156','oakley.hybrisprod');
}catch(e){}
//end tealium universal tag

