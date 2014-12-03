//~~tv:5002.20130718
//~~tc: Added support for mappings

//tealium universal tag - utag.sender.5002 ut4.0.201405010940, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{
  (function(id,loader,u){
    try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
    u.ev={'view':1};
    u.account='1041374';
    u.convid='1';
    u.alias='Conversion Page';
    u.displayorder='1';
    u.s4='yes';
    u.xml_elem=function(a,b,c,d){c='<'+a+'>';d='<\/'+a+'>';return c+b+d;}
    u.qp={'j':'job_id','e':'email','l':'list','u':'original_link_id','jb':'BatchID','mid':'member_id'};

      u.map={"exacttarget_mid":"account"};
  u.extend=[];

    u.send=function(a,b,c,d,e,f){
      if(u.ev[a]||typeof u.ev.all!='undefined'){
        
        c=[];

        for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
          //c.push(e[f]+u.kvp_delim+encodeURIComponent(b[d]));
          u[e[f]]=encodeURIComponent(b[d]);
        }}}

        if(b['qp.j']&&b['qp.u']&&b['qp.l']){
         for(d in u.qp){
          var f={};
          f[u.qp[d]]=b['qp.'+d];
          utag.loader.SC("utag_main", f );
        }	
      }

      if(typeof b._corder!='undefined' && b._corder && typeof b['cp.utag_main_job_id']!='undefined'){
       c.push(u.xml_elem('system_name','tracking'));
       c.push(u.xml_elem('action','conversion'));
       for(d in u.qp){
         if(d=='mid' && b['cp.utag_main_member_id']=='undefined'){
           c.push(u.xml_elem(u.qp[d], u.account));
         }else{
           c.push(u.xml_elem(u.qp[d], b['cp.utag_main_'+u.qp[d]]));
         }
       }
       c.push(u.xml_elem('conversion_link_id',u.convid));
       c.push(u.xml_elem('link_alias',u.alias));
       c.push(u.xml_elem('display_order',u.displayorder));

       u.data='';
       for(d=0;d<b._cprod.length;d++){
         u.data+='<data amt="'+b._cprice[d]+'" unit="'+b._cprod[d]+'" accumulate="true"/>'; 
       }
       c.push(u.xml_elem('data_set',u.data));

       u.base_url='//click.'+((u.s4=='yes')?"s4.":"")+'exacttarget.com/conversion.aspx?xml=';
       u.img=new Image();u.img.src=u.base_url+'<system>'+c.join('')+'<\/system>';
     }
   }
 }
 try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('162','oakley.hybrisprod');
}catch(e){}
//end tealium universal tag