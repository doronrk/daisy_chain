
if(optimost.Q["opselect"]=="qa")optimost.SC("opselect","qa",null,optimost.SLD());var opPro=(("https:"==document.location.protocol)?"https://by.essl.optimost.com/by":"http://by.optimost.com");var opDL=document.location.toString();var opExperiments={};var opPageId=(typeof(opPageId)=="string"?opPageId:"");optimost.XH=function(u){if(typeof(u)!="object")return;var s=this.D.createElement(this.ST);for(var n in this.SA){if(!this.isIE6)
s.setAttribute(n,this.SA[n]);else s[n]=this.SA[n];}for(var n in u){if(!this.isIE6)s.setAttribute(n,u[n]);else s[n]=u[n];}var h=this.D.getElementsByTagName("head");if(h[0])h[0].insertBefore(s,h[0].childNodes[h[0].childNodes.length-1]);else this.D.body.insertBefore(s,this.D.body.childNodes[this.D.body.childNodes.length-1]);};optimost.RXH=function(r,c,d,e){if(this.Enabled){var b=true;if(r<1000){b=(Math.floor(Math.random()*1000)<r);if(c!=null){if(this.C[c]!=null)b=(this.C[c]!="mvt-no");else this.SC(c,b?"mvt-yes":"mvt-no",e,d);}}
if(b){var u={"src":this.S()};this.XH(u);}}};optimost.asyncCheck=function(m){for(var i=0,l=m.length;i<l;i++){if(optimost.modulesPassed==true||typeof(__optimostModulesPassed)=="boolean")
this.displayModule(m[i]);else if(this.moduleNotExecuted[m[i]]!=null)this.displayModule(m[i]);}};opExperiments["hp canada > Homepage"]={"method":"complex","entity":null,"criteria":function(){if((typeof(optimost.C['op1666homepagegum'])=="string"||typeof(optimost.C['hp_last_segment'])=="undefined"||optimost.C['hp_last_segment']=="segment neutral")&&(location.pathname=="/ca/en/home.html"||location.pathname=="/country/ca/en/uc/welcome.html"||location.pathname=="/country/ca/en/uc/welcome-c1.html"||location.pathname=="/country/ca/en/uc/welcome-c2.html")){return true;}},"condition":null,"enabled":true,"match":false,"unique":"/trial/1666/p/homepage.1cf/25/content.js","throttle":1000,"gum":null,"domain":null,"expire":null,"modules":["body"]};opExperiments["c Order placed"]={"method":"var","entity":location.pathname,"criteria":"/webapp/wcs/stores/servlet/OrderShippingBillingConfirmationView","condition":"equals","match":false,"enabled":true,"unique":"/counter/1666/-/62/event.js","throttle":1000,"gum":null,"domain":null,"expire":null,"modules":["counter62"]};opExperiments["Parts Order Confirmation"]={"method":"var","entity":opPageId,"criteria":"Hpparts/co_receipt.aspx/consumer","condition":"equals","match":false,"enabled":true,"unique":"/counter/1666/-/60/event.js","throttle":1000,"gum":null,"domain":null,"expire":null,"getAttribs":function(){if(typeof(hpmmd)=="object"&&typeof(hpmmd.page)=="object"){window.optrial=(typeof(window.optrial)=="object"?window.optrial:{});if(typeof(hpmmd.page.traffic3)=="string")window.optrial.opOID=hpmmd.page.traffic3;if(typeof(hpmmd.page.oprevenue)=="string")window.optrial.opRevenue=hpmmd.page.oprevenue;}},"modules":["counterz"]};var opModulesArray=[];var opContentUrls=[1];optimost.identify=function(){for(var n in opExperiments){switch(opExperiments[n].method){case'var':if(typeof(opExperiments[n].entity)!="undefined"){if(opExperiments[n].condition=="equals"){if(opExperiments[n].entity.toString()==opExperiments[n].criteria)opExperiments[n].match=true;}
else if(opExperiments[n].condition=="contains"){if(opExperiments[n].entity.toString().indexOf(opExperiments[n].criteria)!=-1)opExperiments[n].match=true;}}
break;case'array':if(typeof(opExperiments[n].entity)!="undefined"&&typeof(opExperiments[n].criteria)=="object"){var len=opExperiments[n].criteria.length;for(var i=0;i<len;i++){if(opExperiments[n].condition=="equals"){if(opExperiments[n].entity.toString()==opExperiments[n].criteria[i])opExperiments[n].match=true;}
else if(opExperiments[n].condition=="contains"){if(opExperiments[n].entity.toString().indexOf(opExperiments[n].criteria[i])!=-1)opExperiments[n].match=true;}}}
break;case'complex':if(typeof(opExperiments[n].criteria)=="function"){if(opExperiments[n].criteria()==true)opExperiments[n].match=true;opExperiments[n].criteria=null;}
break;}}}
optimost.identify();optimost.TH=function(r,c,d,e){if(this.Enabled){var b=true;if(r<1000){b=(Math.floor(Math.random()*1000)<r);if(c!=null){if(this.C[c]!=null)b=(this.C[c]!="mvt-no");else this.SC(c,b?"mvt-yes":"mvt-no",e,d);}
return b;}
else return true;}
else return false;}
optimost.TX=function(){var t='<'+this.ST+' src="'+this.S()+'"';for(n in this.SA)t+=(" "+n+'="'+this.SA[n]+'"');t+='><\/'+this.ST+'>';this.D.write(t);}
var opModulesArray=[];for(var n in opExperiments){if(opExperiments[n].match==true&&opExperiments[n].enabled==true){for(var m in opExperiments[n]){if(typeof(opExperiments[n][m])=="function"&&opExperiments[n].throttle==1000)opExperiments[n][m]();}
if(opExperiments[n].unique.indexOf("event.js")!=-1){for(var j=0;j<opExperiments[n].modules.length;j++)opModulesArray.push(opExperiments[n].modules[j]);optimost.addModule(opExperiments[n].modules[opExperiments[n].modules.length-1],function(num){return function(){var _o=optimost;_o.U=opPro+opExperiments[num].unique;_o.ST="script";_o.SA={"type":"text/javascript"};_o.B();_o.RXH(opExperiments[num].throttle,opExperiments[num].gum,opExperiments[num].domain,opExperiments[num].expire);}}(n));optimost.asyncCheck(opExperiments[n].modules);}
else if(opExperiments[n].unique.indexOf("content.js")!=-1&&opExperiments[n].match==true){for(var j=0;j<opExperiments[n].modules.length;j++)opModulesArray.push(opExperiments[n].modules[j]);(function(){var _o=optimost;_o.U=opPro+opExperiments[n].unique;_o.ST="script";_o.SA={"type":"text/javascript"};_o.B();if(opExperiments[n].throttle<1000){isIn=_o.TH(opExperiments[n].throttle,opExperiments[n].gum,opExperiments[n].domain,opExperiments[n].expire);if(isIn){for(var m in opExperiments[n]){if(typeof(opExperiments[n][m])=="function")opExperiments[n][m]();}
_o.XH({src:_o.S()});;}}
else _o.RXH(opExperiments[n].throttle,opExperiments[n].gum,opExperiments[n].domain,opExperiments[n].expire);})();}
else{if(opExperiments[n].throttle<1000){for(var m in opExperiments[n])if(typeof opExperiments[n][m]=="function")opExperiments[n][m]();}
for(var j=0;j<opExperiments[n].modules.length;j++)opModulesArray.push(opExperiments[n].modules[j]);}}}