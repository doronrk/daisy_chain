// I-Mail : Conversion Platform Integration - Copyright SolutionSet
// ---LANDING TIME--- //
// imail_conv_landing.js
// Retrieve Specific I-Mail Variable
function imail_getEVar(e){var t=window.location.search.substring(1),n=t.split("&");for(var r=0;r<n.length;r++){var i=n[r].split("=");if(i[0]==e)return i[1]}return null}function imail_getSVar(e){var t=document.cookie.split(";"),n="",r="",s="",o=!1;for(i=0;i<t.length;i++){n=t[i].split("="),r=n[0].replace(/^\s+|\s+$/g,"");if(r==e)return o=!0,n.length>1&&(s=unescape(n[1].replace(/^\s+|\s+$/g,""))),s;n=null,r=""}if(!o)return""}function imail_setSVar(e,t,n,r,i,s){if(imail_getSVar(e)==""||imail_getSVar(e)==null){var o=new Date;o.setTime(o.getTime()),n&&(n=n*1e3*60*60*24);var u=new Date(o.getTime()+n);return document.cookie=e+"="+escape(t)+(n?";expires="+u.toGMTString():"")+(r?";path="+r:"")+(i?";domain="+i:"")+(s?";secure":""),!0}}imail_setSVar("imail_e",imail_getEVar("e"),7,"/"),imail_setSVar("imail_j",imail_getEVar("j"),7,"/"),imail_setSVar("imail_l",imail_getEVar("l"),7,"/"),imail_setSVar("imail_u",imail_getEVar("u"),7,"/"),imail_setSVar("imail_jb",imail_getEVar("jb"),7,"/"),imail_setSVar("imail_mid",imail_getEVar("mid"),7,"/");