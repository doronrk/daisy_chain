function gacSend() {var b=null;function d(a){if(a!=b)return escape(a.toString());return""}function f(a){if(a!=b)return a.toString().substring(0,256);return""}function m(a,c){var i=d(c);if(i!=""){var e=d(a);if(e!="")return"&".concat(e,"=",i)}return""}function p(a){var c=typeof a;if(a==b||c=="object"||c=="function")return b;return String(a).replace(/,/g,"\\,").replace(/;/g,"\\;").replace(/=/g,"\\=")}
function q(a){var c;a=a.google_custom_params;if(!a||typeof a!="object"||a instanceof Array)c="";else{var i=[];for(c in a){var e=a[c];if(e instanceof Array){e=e;for(var g=[],k=0;k<e.length;++k){var j=p(e[k]);j!=b&&g.push(j)}e=g.length==0?b:g.join(",")}else e=p(e);e=e;(g=p(c))&&e!=b&&i.push(g+"="+e)}c=i.join(";")}if(c=="")return"";return"&".concat("data=",encodeURIComponent(c))}function r(a){if(typeof a!="number"&&typeof a!="string")return"";return d(a.toString())}
function s(a){if(a&&a.location&&a.location.protocol&&a.location.protocol.toString().toLowerCase()=="https:")return"https:";return"http:"}function t(a,c){return s(a)+"//www.googleadservices.com/pagead/"+c}
function u(a,c,i){var e="/?";if(a.google_conversion_type=="landing")e="/extclk?";e=t(a,["conversion/",d(a.google_conversion_id),e,"random=",d(a.google_conversion_time)].join(""));var g;a:{g=a.google_conversion_language;if(g!=b){g=g.toString();if(2==g.length){g=m("hl",g);break a}if(5==g.length){g=m("hl",g.substring(0,2))+m("gl",g.substring(3,5));break a}}g=""}var k;if(a)if(k=a.google_conversion_items){for(var j=[],h=0,l=k.length;h<l;h++){var n=k[h],o=[];if(n){o.push(r(n.value));o.push(r(n.quantity));
o.push(r(n.item_id));o.push(r(n.adwords_grouping));o.push(r(n.sku));j.push("("+o.join("*")+")")}}k=j.length>0?"&item="+j.join(""):""}else k="";else k="";j=a.google_conversion_date;h=[];if(a){if(l=a.screen){h.push(m("u_h",l.height));h.push(m("u_w",l.width));h.push(m("u_ah",l.availHeight));h.push(m("u_aw",l.availWidth));h.push(m("u_cd",l.colorDepth))}a.history&&h.push(m("u_his",a.history.length))}j&&typeof j.getTimezoneOffset=="function"&&h.push(m("u_tz",-j.getTimezoneOffset()));if(c){typeof c.javaEnabled==
"function"&&h.push(m("u_java",c.javaEnabled()));c.plugins&&h.push(m("u_nplug",c.plugins.length));c.mimeTypes&&h.push(m("u_nmime",c.mimeTypes.length))}c=h.join("");j="";if(i){h=i.referrer;if(a&&a.top&&i.location&&a.top.location==i.location){j+=m("ref",f(h));h=i.location}j+=m("url",f(h))}e+=[m("cv",a.google_conversion_js_version),m("fst",a.google_conversion_first_time),m("num",a.google_conversion_snippets),m("fmt",a.google_conversion_format),m("value",a.google_conversion_value),m("label",a.google_conversion_label),
m("oid",a.google_conversion_order_id),m("bg",a.google_conversion_color),g,m("guid","ON"),k,c,j,q(a)].join("");return e}function v(a){if({ar:1,bg:1,cs:1,da:1,de:1,el:1,en_AU:1,en_US:1,en_GB:1,es:1,et:1,fi:1,fr:1,hi:1,hr:1,hu:1,id:1,is:1,it:1,iw:1,ja:1,ko:1,lt:1,nl:1,no:1,pl:1,pt_BR:1,pt_PT:1,ro:1,ru:1,sk:1,sl:1,sr:1,sv:1,th:1,tl:1,tr:1,vi:1,zh_CN:1,zh_TW:1}[a])return a+".html";return"en_US.html"}
function w(a,c,i){c=u(a,c,i);i=function(e,g,k){return'<img height="'+k+'" width="'+g+'" border="0" src="'+e+'" />'};return c};var x=window;
if(x)if(/[\?&;]google_debug/.exec(document.URL)!=b){var y=document.getElementsByTagName("head")[0];if(!y){y=document.createElement("head");document.getElementsByTagName("html")[0].insertBefore(y,document.getElementsByTagName("body")[0])}var z=document.createElement("script");z.src=t(window,"conversion_debug_overlay.js");y.appendChild(z)}else{try{var A;if(x.google_conversion_type=="landing"||!x.google_conversion_id)A=false;else{x.google_conversion_date=new Date;x.google_conversion_time=x.google_conversion_date.getTime();
if(typeof x.google_conversion_snippets=="number"&&x.google_conversion_snippets>0)x.google_conversion_snippets+=1;else x.google_conversion_snippets=1;if(typeof x.google_conversion_first_time!="number")x.google_conversion_first_time=x.google_conversion_time;x.google_conversion_js_version="6";if(x.google_conversion_format!=0&&x.google_conversion_format!=1&&x.google_conversion_format!=2&&x.google_conversion_format!=3)x.google_conversion_format=1;A=true}if(google_conversion_format=="3"){gacImg=new Image();gacImg.src=(w(x, navigator, document));}else{gacIframe=document.createElement("iframe");gacIframe.setAttribute('height','1');gacIframe.setAttribute('width','1');gacIframe.setAttribute('style','display:none');gacIframe.setAttribute('src',(w(x, navigator, document)));document.body.appendChild(gacIframe);}}catch(B){}x.google_conversion_date=
b;x.google_conversion_time=b;x.google_conversion_js_version=b;x.google_conversion_id=b;x.google_conversion_value=b;x.google_conversion_label=b;x.google_conversion_language=b;x.google_conversion_format=b;x.google_conversion_color=b;x.google_conversion_type=b;x.google_conversion_order_id=b;x.google_conversion_items=b;x.google_custom_params=b};}; 

//tealium universal tag - utag.sender.googleadwords ut4.0.201408072136, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.cnv_label='';
  u.cnv_id='';
  u.map={};
  u.extend=[];

  u.send=function(a,b,c,d,e,f){
    if(u.ev[a]||typeof u.ev.all!='undefined'){    
        
      c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!='undefined'&&b[d]!=''){e=u.map[d].split(',');for(f=0;f<e.length;f++){
        if(e[f]=='google_conversion_label'){u.cnv_label=b[d];}else if(e[f]=='google_conversion_id'){u.cnv_id=b[d];}
      }}}
      u.cnv_label=u.cnv_label.replace(/\s+/g,""); 
      c=u.cnv_label.split(",");
      u.cnv_id=u.cnv_id.replace(/\s+/g,""); 
      e=u.cnv_id.split(",");
      
      for(f=0;f<c.length;f++){

        if(typeof b._cprod!='undefined'&&b._cprod.length>0){
          var o = [];
          for(d=0;d<b._cprod.length;d++){
            o.push({value:(b._cprice[d]?b._cprice[d]:"0"),quantity:(b._cquan[d]?b._cquan[d]:"1"),item_id:b._cprod[d],adwords_grouping:"",sku:(b._csku[d]?b._csku[d]:b._cprod[d])});
          }
          window.google_conversion_items=o;
        }
        if(b._corder)window.google_conversion_order_id=b._corder;

        window.google_conversion_id=parseInt((e[f]?e[f]:e[0]));
        window.google_conversion_language="";
        window.google_conversion_format="3";
        window.google_conversion_color="";
        window.google_conversion_label=c[f];
        var cnv = "";
        window.google_conversion_value = (cnv!="") ? cnv : b._csubtotal;
        gacSend();
      }
    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('149','oakley.hybrisprod');
}catch(e){}
//end tealium universal tag
//~~tv:7050.20121105