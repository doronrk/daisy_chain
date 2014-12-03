/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2011 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
s7sdk.Util.require("s7sdk.common.ItemDesc");if(!s7sdk.SwatchesParser){s7sdk.SwatchesParser={};s7sdk.SwatchesParser.parse=function(l){var a=new Array();if(l==null){return a}var m=l.split(/,/);var k=null;var f=null;var o=null;var b=new RegExp(/{\s*(0x|0X|#)?([\dabcdefABCDEF]{1,6})\s*(.*)}/);var d=new RegExp(/^\s*$/);for(var h=0;h<m.length;h++){var e=String(m[h]).split(/;/);if(e==null||e[0]==null||d.test(e[0])){continue}f=null;o=null;k=null;if(e.length>1){var p=String(e[1]).match(b);if(p!=null&&p[2]!=null){f=p[1]+p[2];f=f.replace(/\s*(0x|0X|#)?/,"0x");o=p[3]}else{k=e[1]}}var c=e[0];var n=c!=null?c.split(":"):new Array();if(n.length>1){for(var g=0;g<n.length;g++){n[g]=String(n[g]).trim()}c=s7sdk.SwatchesParser.combinedImageName(n)}else{c=String(c).trim()}k=k!=null?String(k).trim():(f==null||f=="")?c:null;a[h]=new s7sdk.SwatchDesc(k,f,o,"","","");a[h].asset=c;a[h].frame=h;a[h].sourceFrame=h}return a};s7sdk.SwatchesParser.combinedImageName=function(a,f){var d;if(f){d=a[0]+"?layer=0&extendN="+(a.length-1)+",0,0,0&originN="+(1/a.length-0.5)+",-0.5";for(var c=1;c<a.length;c++){d+="&layer="+c+"&src="+e(a[c])+"&originN="+(c-a.length+1.5)+",-0.5&sizeN="+1/a.length+",1"}}else{d=a[0]+"?layer=0&extendN=0,0,"+(a.length-1)+",0&originN="+(1/a.length-0.5)+",-0.5";for(var b=1;b<a.length;b++){d+="&layer="+b+"&src="+e(a[b])+"&originN="+(0.5-b)+",-0.5&sizeN="+1/a.length+",1"}}return d;function e(g){if(g.indexOf("?")){return"is("+g+")"}return g}};s7sdk.SwatchesParser.parseItems=function(c){var b=s7sdk.SwatchesParser.parse(c);var a=null;if(b!=null){a=[];for(var d=0;d<b.length;d++){var e=b[d];a.push(new s7sdk.ItemDesc(null,s7sdk.ItemDescType.IMG,e.asset,e))}}return a};s7sdk.SwatchesParser.filterSet=function(h,e,f){e=(typeof e=="number")?e:0;f=(typeof f=="boolean")?f:true;var g=[];var d=0;if(h==null||h.items.length==0){return g}for(var b=0;b<h.items.length;b++){var k=h.items[b];var a=k&&((e==s7sdk.ItemDescType.UNKNOWN)?true:((k.type&e)!=0));if(a){var j=s7sdk.SwatchesParser.getItemSwatch(k,f);if(j!=null){j.frame=d++;j.sourceFrame=b;j.asset=h.items[b].name;j.owner=k;var c={};c.swatch=j;c.type=k.type;c.np=k.np;g.push(c)}}}return g};s7sdk.SwatchesParser.getItemSwatch=function(b,c){c=(typeof c=="boolean")?c:true;var a=(c&&b.swatch!=null)?b.swatch:null;if(a==null){if(b instanceof s7sdk.ImageDesc){a=new s7sdk.SwatchDesc(b.name,null,b.label,b.version,b.mod,b.pmod)}else{a=(b instanceof s7sdk.MediaSetDesc)?s7sdk.SwatchesParser.getMissingSwatchFromImage(b):null}}return a};s7sdk.SwatchesParser.getMissingSwatchFromImage=function(f){for(var c=0;c<f.items.length;c++){if(f.items[c] instanceof s7sdk.ImageDesc){var a=f.items[c];return new s7sdk.SwatchDesc(a.name,null,a.label,a.version,a.mod,a.pmod)}}for(var b=0;b<f.items.length;b++){if(f.items[b] instanceof s7sdk.MediaSetDesc){var e=f.items[b];var d=s7sdk.SwatchesParser.getMissingSwatchFromImage(e);if(d!=null){return d}}}return null}};