(function(){(function(){var time=new Date(),LTM=time.getTime(),t_ul=cku('BTT_ULTM'),bd=document.getElementsByTagName('BODY')[0],TxN="Unnamed_Pages",CVL='0',CSID='0',TYP="",PTDB="",PNM="Unnamed_Page",BVL=0,PGV=0,CV1='0',CV2='0',CV3='0',CV4='0',CV5='0';window.performance=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};var PT=performance.timing||{};PT.legacyNavigationStart=new Date().getTime();var cnm="BTT_X0siD";var tdy=new Date();var TM=tdy.getTime();var TMs=TM+'';var BTT_X0siD=TMs.substring(0,10)+''+Math.floor((Math.random()*8999990)+1000000);if(cku('BTT_X0siD')!=0){BTT_X0siD=cku('BTT_X0siD');}var EXP=TM+ 3600000;tdy.setTime(EXP);document.cookie=cnm+"="+BTT_X0siD+";expires="+tdy.toGMTString()+";path=/";window.BTTtag_ssI=BTT_X0siD;var BTT_Collect=1;if(cku('BTT_Collect')!=0){BTT_Collect=cku('BTT_Collect');}else{var RDM=Math.floor(Math.random()*100);if(RDM>100){BTT_Collect=0;}cnm="BTT_Collect";document.cookie=cnm+"="+BTT_Collect+";expires="+tdy.toGMTString()+";path=/";}if(BTT_Collect==0){return;}function NA(){return navigator.userAgent;}function NP(){return navigator.platform;}function NV(){return navigator.vendor;}if((document.readyState==="complete")||(window.cedexis!=undefined)){BTTGetTMGS();}else{if(window.addEventListener){window.addEventListener('load',BTTGetTMGS,false);}else if(window.attachEvent){window.attachEvent('onload',BTTGetTMGS);}}AOBEVT(cki);function AOBEVT(func){var OBFD=window.onbeforeunload;if(typeof window.onbeforeunload!='function'){window.onbeforeunload=func;}else{window.onbeforeunload=function(){OBFD();func();}}}function cki(){var cnm="BTT_ULTM";var tdy=new Date();var TM=tdy.getTime();var EXP=TM+ 60000;tdy.setTime(EXP);document.cookie=cnm+"="+TM+";expires="+tdy.toGMTString()+";path=/";}function cku(c_name){var i,x,y,ARRc=document.cookie.split(";");for(i=0;i<ARRc.length;i++){x=ARRc[i].substr(0,ARRc[i].indexOf("="));y=ARRc[i].substr(ARRc[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);}}return 0;}function BTTGetTMGS(){var pms=BGTM(1);if(pms!='none'){var tag_url="//d.btttag.com/btt.gif";var BV=NA();tag_url+='?'+pms+"&sessionID="+BTT_X0siD+"&CSID="+CSID+"&CV1="+CV1+"&CV2="+CV2+"&CV3="+CV3+"&CV4="+CV4+"&CV5="+CV5+"&collectAt="+100;(function(){var i=document.createElement('iframe');i.style.display='none';i.height="0";i.width="0";i.style.visibility="hidden";i.src=tag_url;document.body.appendChild(i);})();}}function LIM(t){var l=120000;if(t<0){return 0;}if(t>l){return l;}else{return t;}}function BGTM(eventType){var PSBTT15=undefined;var PSBTT16=undefined;var PSBTT11=undefined;var PSBTT12=undefined;var PSBTT13=undefined;var PSBTT14=undefined;var PSBTT2=undefined;try{if((typeof s!='undefined')&&(s!=null)){if((typeof s.prop1!='undefined')&&(s.prop1!=null)){PSBTT2=s.prop1;}}}catch(err){}var PSBTT1=undefined;try{if((typeof s!='undefined')&&(s!=null)){if((typeof s.prop2!='undefined')&&(s.prop2!=null)){PSBTT1=s.prop2;}}}catch(err){}var PSArray={"BTT15":{partialString:"qa.",txn:"QA",pageName:"QA Pages",pageType:PSBTT15,brandValue:"0"},"BTT16":{partialString:"staging.",txn:"Staging",pageName:"Staging Pages",pageType:PSBTT16,brandValue:"0"},"BTT11":{partialString:"confirmation.jsp",txn:"eCommerce",pageName:"Order Confirmation",pageType:PSBTT11,brandValue:"0"},"BTT12":{partialString:"account/",txn:"eCommerce",pageName:"account",pageType:PSBTT12,brandValue:"0"},"BTT13":{partialString:"community/",txn:"eCommerce",pageName:"community",pageType:PSBTT13,brandValue:"0"},"BTT14":{partialString:"education/",txn:"eCommerce",pageName:"education",pageType:PSBTT14,brandValue:"0"},"BTT2":{partialString:"",txn:"eCommerce",pageName:"auto",pageType:PSBTT2,brandValue:"0"},"BTT1":{partialString:"",txn:"eCommerce",pageName:"auto",pageType:PSBTT1,brandValue:"0"}};var URL=window.location.href;for(aid in PSArray){var partialString=PSArray[aid]["partialString"];PTDB=PSArray[aid]["pageType"];if((PTDB!=undefined)&&(PTDB.length>0)){var PNDB=PTDB;var TN=PSArray[aid]["txn"];BVL=PSArray[aid]["brandValue"];break;}if((partialString.length>0)&&(URL.search(partialString)!=-1)){var PNDB=PSArray[aid]["pageName"];var TN=PSArray[aid]["txn"];BVL=PSArray[aid]["brandValue"];break;}}var URL=encodeURIComponent(URL);if(PNDB!=undefined){PNM=PNDB;}if(window.btttag_TxN==undefined){if(TN==undefined){}else{TxN=TN;}}else{TxN=window.btttag_TxN;}try{var maxS=1+1;var PTX=document.documentElement.innerHTML;var TRE=PTX.split(/class=\"merchandisePrice\"\>/i,maxS);if(TRE!==null){if((TRE.length-1)>=1){var TRE2=TRE[1].split(/\</i,1);CVL=TRE2[0];}}}catch(err){}PNM=encodeURI(PNM);PTDB=encodeURI(PTDB);TxN=encodeURI(TxN);PNDB=encodeURI(PNDB);var bdkt={init:function(){this.browser=this.sstg(this.DBR)||"";this.version=this.VR(navigator.userAgent)||this.VR(navigator.appVersion)||"";this.OS=this.sstg(this.dataOS)||"";},sstg:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].T;var dataProp=data[i].prop;this.vstn=data[i].V||data[i].I;if(dataString){if(dataString.indexOf(data[i].S)!=-1)return data[i].I;}else if(dataProp)return data[i].I;}},VR:function(dataString){var index=dataString.indexOf(this.vstn);if(index==-1)return;return parseFloat(dataString.substring(index+this.vstn.length+1));},DBR:[{T:NA(),S:"OmniWeb",V:"OmniWeb/",I:"OmniWeb"},{T:NV(),S:"Apple",I:"Safari",V:"Version"},{T:NA(),S:"Chrome",I:"Chrome"},{prop:window.opera,I:"Opera",V:"Version"},{T:NV(),S:"iCab",I:"iCab"},{T:NV(),S:"KDE",I:"Konqueror"},{T:NA(),S:"Firefox",I:"Firefox"},{T:NV(),S:"Camino",I:"Camino"},{T:NA(),S:"Netscape",I:"Netscape"},{T:NA(),S:"MSIE",I:"Explorer",V:"MSIE"},{T:NA(),S:"Android",I:"Android",V:"SCH-"},{T:NA(),S:"Gecko",I:"Mozilla",V:"rv"},{T:NA(),S:"Mozilla",I:"Netscape",V:"Mozilla"}],dataOS:[{T:NP(),S:"Win",I:"Windows"},{T:NP(),S:"Mac",I:"Mac"},{T:NA(),S:"iPhone",I:"iPhone"},{T:NA(),S:"iPad",I:"iPad"},{T:NA(),S:"Android",I:"Android"},{T:NP(),S:"Linux",I:"Linux"}]};bdkt.init();var bvzn=bdkt.browser+"-"+bdkt.version;window.BTTtag_bvzn=bvzn;var EUOS=bdkt.OS;var params="";if((PT)&&(PT.navigationStart)){var nst=PT.navigationStart;var UST=PT.unloadEventStart;var RDS=PT.redirectStart;var RE=PT.redirectEnd;var FS=PT.fetchStart;var DST=PT.domainLookupStart;var DSE=PT.domainLookupEnd;var CST=PT.connectStart;var CE=PT.connectEnd;var SCS=PT.secureConnectionStart||0;var RS=PT.requestStart;var RES=PT.responseStart;var REE=PT.responseEnd;var DL=PT.domLoading;var DI=PT.domInteractive;var DLS=PT.domContentLoadedEventStart;var DLE=PT.domContentLoadedEventEnd;var DC=PT.domComplete;var LS=PT.loadEventStart;var LE=PT.loadEventEnd;var NT=performance.navigation.type;var RC=performance.navigation.redirectCount;var totRD=LIM(RE-RDS);var top=UST-LE;var dns=LIM(DSE-DST);var tcp=LIM(CE-CST);var dom=LIM(DC-DL);var pgTm=LIM(LS-nst);if(LE>LS){pgTm=LIM(LE-nst);}var ssl=0;if(SCS>0){ssl=LIM(RS-SCS);}var fByte=LIM(RES-RS);var BPT=LIM(REE-RES);params="pageName="+PNM+"&nst="+nst+"&unloadEventStart="+UST+"&redirectStart="+RDS+"&totRD="+totRD+"&fetchStart="+FS+"&domainLookupStart="+DST+"&connectStart="+CST+"&secureConnectionStart="+SCS+"&requestStart="+RS+"&responseStart="+RES+"&REE="+REE+"&BPT="+BPT+"&domLoading="+DL+"&domInteractive="+DI+"&domContentLoadedStart="+DLS+"&domContentLoadedEnd="+DLE+"&loadEventStart="+LS+"&navigationType="+NT+"&redirectCount="+RC+"&pageType="+PTDB+"&pageValue="+PGV+"&pgTm="+pgTm+"&dns="+dns+"&tcp="+tcp+"&dom="+dom+"&fByte="+fByte+"&ssl="+ssl+"&cartValue="+CVL+"&eventType="+eventType+"&siteID=lululemon&txnName="+TxN+"&top="+top+"&bv="+BVL+"&bvzn="+bvzn+"&EUOS="+EUOS;}else{var today=new Date();var NTM=today.getTime();eventType=5;var top=0;var pgTM=0;if(t_ul>0){pgTM=NTM-t_ul;}else{pgTM=NTM-LTM;}window.setInterval(cki,60000);params="pageName="+PNM+"&nst="+t_ul+"&unloadEventStart="+t_ul+"&pageType="+PTDB+"&pageValue="+PGV+"&pgTm="+pgTM+"&navigationType=1"+"&cartValue="+CVL+"&eventType="+eventType+"&siteID=lululemon&txnName="+TxN+"&top="+top+"&bv="+BVL+"&bvzn="+bvzn+"&EUOS="+EUOS;}return params;}})();(function(){var a="no secondary tag"})();})();