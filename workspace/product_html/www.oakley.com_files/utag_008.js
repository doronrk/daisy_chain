//~~tv:19050.20130930
//~~tc:update base url per request from SaleCycle

//tealium universal tag - utag.sender.19050 ut4.0.201405191849, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.qsp_delim="&";
  u.kvp_delim="=";
  u.tag_type="script";
  u.base_url="//d16fk4ms6rqz1v.cloudfront.net/capture/17366.js";
  u.map={};
  u.extend=[];

  u.send=function(a,b){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      
      var c,d,e,f;
      c=[];
      if(u.tag_type=="image"){
        u.base_url="//app.salecycle.com/Import/PixelCapture.aspx?";
        c.push("c=17366");
      }
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        c.push(e[f]+u.kvp_delim+encodeURIComponent(b[d]));
      }}}
 
      if(u.tag_type=="image"){
        u.img=new Image();u.img.src=u.base_url+c.join(u.qsp_delim);
      }else{
        u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.base_url+c.join(u.qsp_delim);
        u.s.parentNode.insertBefore(u.scr,u.s);
      }
    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('193','oakley.hybrisprod');
}catch(e){}
//end tealium universal tag
//~~tv:19050.20130930

