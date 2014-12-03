getMemberType=function(){var c=JSON.decode(Cookie.read("DSWstorage"));
var a={A01:"0",N01:"0",B01:"1",P01:"2"};
var b=a.A01;
if(c!=null&&typeof(c)=="object"&&c.ldw&&a[c.ldw]){b=a[c.ldw]
}return b
};
writeUpdatedIframe=function(e){var g=e.substring(0,e.indexOf("u6=")+3);
var f=e.substring(e.indexOf(";",e.indexOf("u6=")),e.length);
var c=g+getMemberType()+f;
g=c.substring(0,c.indexOf("ord=")+4);
f=c.substring(c.indexOf("ord=")+4,c.length);
var d=Math.random()+"";
var b=d*10000000000000;
c=g+b+f;
document.write(c);
return c
};