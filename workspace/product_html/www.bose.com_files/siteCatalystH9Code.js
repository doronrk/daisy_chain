/* Adobe Analytics AppMeasurement for JavaScript version: 1.2.3 */

/* Get the AppMeasurement instance */
s = new AppMeasurement();

//s.visitorNamespace = "INSERT-NAMESPACE-HERE"

/******** VISITOR ID SERVICE CONFIG - REQUIRES VisitorAPI.js ********/
//s.visitor = Visitor.getInstance("INSERT-NAMESPACE-HERE") // same as s.VisitorNamespace

/************************** CONFIG SECTION **************************/

/* Specify the Report Suite ID(s) to track here.*/
s.account="devbosecom";
s.dynamicAccountSelection=false;
//s.dynamicAccountList="bosecom=www.bose.com;bosecom=http://www.bose.com;bosecom=https://www.bose.com;devbosecom=https://isdqap1.bose.com;bosecom=https://rt.bose.com;bosecom=wave.bose.com;bosecom=http://bose.com;bosecom=products.bose.com;bosecom=www.bose3d.com;bosecom=clients.mapquest.com/bose;bosecom=jobs.brassring.com;bosecom=exapp009.informative.com;bosecom=bose.infopop.cc;bosecom=qualitysound.bose.com;bosecom=hirenote.com;bosecom=pages.em.bose.com;bosecom=preferencecenter.opt-in-mail.net/Bose;devbosecom=stgapp007.informative.com;devbosecom=test.mapquest.com/bose;devbosecom=localhost;devbosecom=devweb301.bose.com;bosecomqa1=qa1.bose.com;bosecomqa2=qa2.bose.com;bosecomqa3=qa3.bose.com;bosecomqa4=qa4.bose.com;bosedevboselt1=lt1.bose.com;bosedevboseqa5=qa5.bose.com;devbosecom=stg.bose.com;devbosecom=."

// If we are on a QA URL, override the s.account variable
var qaEnvironments = {bosecomqa1: "qa1.bose.com", bosecomqa2: "qa2.bose.com", bosecomqa3: "qa3.bose.com", bosecomqa4: "qa4.bose.com", bosedevboseqa5: "qa5.bose.com", bosedevboselt1: "lt1.bose.com" };
Object.keys(qaEnvironments).forEach(function(key) {
    if(window.location.host === qaEnvironments[key]) {
        s.account=key;
    }
});

// Change RSID (reporting suite ID) to a new reporting suite if "rsid" query param exists in the URL. If so, the value of rsid is set as the s.account variable. 
// This allows Analysis to send traffic to a dedicated reporting suite during the QA process that only includes their traffic,
// this should only be used by Analysis.... not web dev, qa, or the business. 
// We don't want anyone to use this on production however, so we run this prior to the production RSID function below which will override
// the s.account on a production URL. 
// Example: http://bose-6-287-dev.preview.bose.pr/controller?url=/index_2.jsp&rsid=testreportingsuite
if(s.Util.getQueryParam('rsid') != '') { 
    // rsid query param exists
    s.account = s.Util.getQueryParam('rsid');
} 

// If we are on a production URL, override the s.account variable
var prodEnvironments = ["www.bose.com","bose.com","products.bose.com","rt.bose.com","pages.em.bose.com","preferencecenter.opt-in-mail.net","wave.bose.com","www.bose3d.com","clients.mapquest.com","jobs.brassring.com","exapp009.informative.com","bose.infopop.cc","qualitysound.bose.com","hirenote.com","translate.google.com"];
var arrayLength = prodEnvironments.length;
for (var i = 0; i < arrayLength; i++) {
    if(window.location.host === prodEnvironments[i]) {
        s.account="bosecom";
    }
}



/* E-commerce Config */
s.currencyCode="USD";
s.eVarCFG="";

/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="pdf,mov,swf,flv,zip,doc,xls,txt,exe,dll,asa,asp,bin,btr,cnt,ini,csv,dxf,lck,mso,old,reg,inf,tpc,utf8,vbs,avi,wmf,wma,wmv,mp3,mp4,xml,bak,inc,iso,mod,ppt,pps";
s.linkInternalFilters="javascript:,http://www.bose.com,https://www.bose.com,www.bose.com,wave.bose.com,http://bose.com,clients.mapquest.com/bose,jobs.brassring.com,exapp009.informative.com,hirenote.com,pages.em.bose.com,preferencecenter.opt-in-mail.net/Bose,localhost,qa1.bose.com,qa2.bose.com,qa3.bose.com,qa4.bose.com,stg.bose.com,devweb301.bose.com,lt1.bose.com,qa5.bose.com,billmelater.com";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";

/* Plugin Config */
s.usePlugins=true;

/* Variant switch test */
var variant_switch = false;

function s_doPlugins() {

    // use implementation plug-ins that are defined below
    // in this section. For example, if you copied the append
    // list plug-in code below, you could call:
    // s.events=s.apl(s.events,"event1",",",1);

    if (!window.s.campaign) {
        s.campaign=s.Util.getQueryParam('src');
    }
    s.eVar1 = s.Util.getQueryParam('intcmp');
    s.eVar3 = s.Util.getQueryParam('alias');
    s.eVar32 = s.Util.getQueryParam('nav');

    // the search terms should be converted to lower-case and
    // the src value should always be UPPER-CASE.  Internal campaign (AVB)
    // parameters should be lower-case
    s.eVar1 = s.eVar1.toLowerCase();
    if (typeof(s.prop9)!="undefined" && s.prop9.length!=0)
        s.eVar2 = s.prop9.toLowerCase();
    else
        s.eVar2 = '';

    s.eVar3 = s.eVar3.toLowerCase();
    s.campaign = s.campaign.toUpperCase();

    // If the user is coming from a source-code, set the "Sourced" flag
    if (s.campaign !="") s.eVar7 = 'Sourced';

    // Campaign stacking - allows us to understand all the influencers in a given campaign/source code.
    // See PVA-7614 for more details.
    s.eVar13 = s.crossVisitParticipation(s.campaign,'s_cpm','90','5','>','purchase,event4');

    // In the case of static pages, where the custom tag does not set the s.pageName
    // variable, then use the document's <TITLE> tag contents
    if ((!window.s.pageType) && (!window.s.pageName || s.pageName=="")) {
        s.pageName = getPageId(document.URL); //Defined in scriptLib.js
    }

    //Patni PVA-2904 Start
    //*********Sourced/Non-Sourced Part Begins********
    var strSCCookieName="s.prop4";
    var strOldSCCookieName="s_prop4";

    if(typeof window.setCookie == 'function' && typeof window.getCookie == 'function') {

        //Step 1: If s.eVar7 is Sourced, Set the cookie with Key 's.prop4' and value 'Sourced'
        if (s.eVar7 == "Sourced"){
            var expSCDate = new Date(); //to set the expiry date
            expSCDate.setTime(expSCDate.getTime() + (90 * 24 * 60 * 60 * 1000));
            setCookie(strSCCookieName,s.eVar7, expSCDate, "/", "");
            s.prop4 = s.eVar7;
        } else {
            //Else Step 2: get the values from the cookie for the key 's.prop4'
            s.prop4 = getCookie(strSCCookieName);
            if (!s.prop4) {
                s.prop4 = getCookie(strOldSCCookieName);
            }

            //Step 2.1 : If the Cookie value is not Null, Set variable s.eVar7 to cookie value
            if(s.prop4) {
                s.eVar7 = s.prop4;
            } else {
                //Step 2.1 : If the Cookie value is Null, Set the cookie & s.eVar7 to Non-Sourced
                var expSCDate = new Date();//to set the expiry date
                expSCDate.setTime(expSCDate.getTime() + (90 * 24 * 60 * 60 * 1000));
                setCookie(strSCCookieName,'Non-Sourced', expSCDate, "/", "");
                s.eVar7 = 'Non-Sourced';
                s.prop4 = 'Non-Sourced';
            }
        }
    }

    s.prop6 = s.pageName;

    //If the page is Sourced then update the value in s.prop6
    if (s.prop4=="Sourced") {s.prop6 = s.prop4 + ":" + s.prop6;}
    //*********Sourced/Non-Sourced Part ends********

    //*********Channel Part Begins******************
    s.channel  = "No Channel"; //Default Value
    s.eVar9    = "No Channel"; //Default Value

    if(s.pageName !=''){

        channel = new Array();
        pattern = new Array();

        //Setting the channel and pattern array
        channel[0]  = "Careers"
        pattern[0]  = new Array();
        pattern[0][0]   = "About:Careers:";
        pattern[0][1] = "Popup:Careers:";

        channel[1]  = "Support"
        pattern[1]  = new Array();
        pattern[1][0]   = "Support:";
        pattern[1][1]   = "Contact:";
        pattern[1][2]   = "Popup:Customer Service:";
        pattern[1][3]   = "Customer Service:";

        channel[2]  = "Automotive";
        pattern[2]  = new Array();
        pattern[2][0]   = "Automotive:";
        pattern[2][1]   = "Flash:Automotive:";

        channel[3]  = "Musicians"
        pattern[3]  = new Array();
        pattern[3][0]   = "Musicians:";
        pattern[3][1]   = "Shop Online:Speakers:Portable Amplification Systems:";

        channel[4] = "Shop Online";
        pattern[4] = new Array();
        pattern[4][0] = "Home Entertainment:"
        pattern[4][1] = "Promotions:"
        pattern[4][2] = "Shop:"
        pattern[4][3] = "Popup:Accessories:"
        pattern[4][4] = "Popup:Bose Stores:"
        pattern[4][5] = "Popup:Compare Charts:"
        pattern[4][6] = "Popup:Expansion:"
        pattern[4][7] = "Popup:Installed Systems:"
        pattern[4][8] = "Popup:Lead Pass Along:"
        pattern[4][9] = "Popup:Promo:"
        pattern[4][10]= "Popup:Tech Details:"
        pattern[4][11]= "Index 3" //for Index_2.jsp
        pattern[4][12]= "Index 2" //for Index page
        pattern[4][13]= "Sitemap"
        pattern[4][14]= "Flash:Flash Shell:"
        pattern[4][15]= "Html:Promotions:"
        pattern[4][16]= "Popup:New From:"
        pattern[4][17]= "Index May"
        pattern[4][18]= "Index June"
        pattern[4][19]= "Index July"
        pattern[4][20]= "Index August"
        pattern[4][21]= "Shop Online:"
        pattern[4][22]= "Index New"

        channel[5]  = "Learning Center"
        pattern[5]  = new Array();
        pattern[5][0]   = "Learning:"

        channel[6]  = "Locator"
        pattern[6]  = new Array();
        pattern[6][0]   = "Locator:"

        channel[7]  = "Enduratec"
        pattern[7]  = new Array();
        pattern[7][0]   = "Enduratec:Index"

        channel[8]     = "Search"
        pattern[8]     = new Array();
        pattern[8][0]  = "Search:Search"
        pattern[8][1]  = "Search:Search-no-results"
        pattern[8][2]  = "Popup:Search:"

        channel[9]     = "Business and Retail Solutions"
        pattern[9]     = new Array();
        pattern[9][0]  = "Professional:"
        pattern[9][1]  = "Popup:Professional Sound:"

        channel[10]     = "Worldwide"
        pattern[10]     = new Array();
        pattern[10][0]  = "Worldwide:"

        channel[11]  = "Account";
        pattern[11]  = new Array();
        pattern[11][0]   = "Account";
        
        channel[12]  = "Bose Ride";
        pattern[12]  = new Array();
        pattern[12][0]   = "Bose Ride System:";
        
        
        for (var i = 0; i < channel.length;i++){
            for (var j = 0; j < pattern[i].length;j++){
                //If pattern in the variable s.pageName matches with any
                //pattern in the pattern array, set the value of s.channel
                // and s.eVar9 as name of the respective channel.

                if(s.pageName.indexOf(pattern[i][j]) > -1){
                    s.channel = channel[i];
                    s.eVar9   = s.channel;
                    break;
                }
            }
        }
    
    }
    //*********Channel Part Ends******************
    //Patni PVA-2904 End

    // ********* Split-Test Part Begins ********
    var splitTestRec;
    var evar12 = new String("");
    var lastTimeSeen = new String("");
    var splitTestCookies;

    if(typeof window.getCookie == 'function') {
        splitTestCookies = getCookie("split_test");
    }

    if(splitTestCookies)
    {
        var splitTestRec = splitTestCookies.split("||");

        for(var i=0; i<splitTestRec.length;i++){

            var splitTestVal = splitTestRec[i].split(">>");
            var splitTestId = new String(splitTestVal[0]);
            var splitTestUrl = new String(splitTestVal[1]);
            var splitTestLastTimeSeen = new String(splitTestVal[2]);

            if(evar12 == '') {
                evar12 = splitTestId + ">>" + splitTestUrl;
                lastTimeSeen = splitTestLastTimeSeen;
            } else if(parseInt(splitTestLastTimeSeen) > parseInt(lastTimeSeen)) {
                evar12 = splitTestId + ">>" + splitTestUrl;
                lastTimeSeen = splitTestLastTimeSeen;
            }//else

        }//for

        s.eVar12 = evar12;
    }//if
    // ********* End of Split-Test Part


    /* Within product_page.js, the variant switch function will set the variable to true on click.
    If it is true, we want to clear evar1, which is the internal campaign variable. */
    if (variant_switch == true) {
        s.eVar1 = undefined;
    }
}
s.doPlugins=s_doPlugins;

/*Video Variable Mapping */
s.enableVideoTracking=true;
if(s.enableVideoTracking){
    s.loadModule("Media");
    s.Media.autoTrack=false;
    s.Media.trackMilestones="25,50,75";
    s.Media.segmentByMilestones=true;
    s.Media.playerName="Brightcove";
    s.Media.trackWhilePlaying=true;
    s.Media.trackUsingContextData=true;
    s.Media.trackVars="events,eVar22,prop31";
    s.Media.trackEvents="event15,event16,event18,event19,event21";
    s.Media.contextDataMapping = {
      "a.media.name":"eVar22,prop31",
      "a.media.segment":"eVar23",
      "a.media.segmentView":"event17",
      "a.contentType":"eVar24",
      "a.media.timePlayed":"event14",
      "a.media.view":"event15",
      "a.media.complete":"event16",
      "a.media.milestones":{
         25:"event18",
         50:"event19",
         75:"event21"
      }
    };
 };


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.trackingServer="metrics.bose.com";
s.trackingServerSecure="emetrics.bose.com";
s.dc=112;
s.vmk="46E6CD1D";

/************************** PLUGINS SECTION *************************/
// Plug-ins can then be used in the s_doPlugins(s) function above.
// http://microsite.omniture.com/t2/help/en_US/sc/implement/#Implementation_Plugins

/*
 * Custom Code: Brightcove Smart Analytics v2.2
 */
var mediaFriendly;
var mediaRefID;
var mediaName;
var mediaLength;
var mediaOffset=0;
var mediaID=0;
var mediaPlayerType;
var mediaPlayerName="Brightcove"; //Required hard code player name here. 

function onPlay(evt) {
    mediaFriendly=evt.media.displayName; // Required video title
    mediaRefID=evt.media.referenceId;  // Optional reference id
    mediaName=mediaRefID; // Reference ID is authored in Brightcove
    mediaLength=evt.duration;  // Required video duration
    mediaOffset=Math.floor(evt.position); // Required video position
    mediaID=(evt.media.id).toString();  // Required video id
    mediaPlayerType=player.type; // Optional player type
    
    /* Check for start of video */
    if (mediaOffset==0){
        s.Media.open(mediaName,mediaLength,mediaPlayerName);
        s.Media.play(mediaName,mediaOffset);
    }else{
        s.Media.play(mediaName,mediaOffset);
    }
}
function onStop(evt){
    s.Media.stop(mediaName);
    s.Media.close(mediaName);
}


/*
 *  Plug-in: crossVisitParticipation v1.7 - stacks values from
 *  specified variable in cookie and returns value
 */

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * s.join: 1.0 - s.join(v,p)
 *
 *  v - Array (may also be array of array)
 *  p - formatting parameters (front, back, delim, wrap)
 *
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");



/****************************** MODULES *****************************/

// AppMeasurement_Module_Media.js - Media Module, included in AppMeasurement zip
var j=null;function E(){return function(){}}
function AppMeasurement_Module_Media(s){var m=this;m.s=s;var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;m._il=w.s_c_il;m._in=w.s_c_in;m._il[m._in]=m;w.s_c_in++;m._c="s_m";m.list=[];m.open=function(e,g,d,l){var c={},a=new Date,b="",h;g||(g=-1);if(e&&d){if(!m.list)m.list={};m.list[e]&&m.close(e);if(l&&l.id)b=l.id;if(b)for(h in m.list)!Object.prototype[h]&&m.list[h]&&m.list[h].Of==b&&m.close(m.list[h].name);c.name=e;c.length=g;c.wc=0;c.S=0;c.playerName=m.playerName?m.playerName:d;c.Of=b;c.Zd=0;c.$=
0;c.timestamp=Math.floor(a.getTime()/1E3);c.za=0;c.vc=c.timestamp;c.R=-1;c.Cc="";c.ha=-1;c.Hc=0;c.Md={};c.Lc=0;c.Ja=0;c.T="";c.Lb=0;c.Ud=0;c.Bc=0;c.Jc=0;c.xa=!1;c.Gb="";c.xc="";c.yc=0;c.rc=!1;c.na="";c.complete=0;c.zf=0;c.Eb=0;c.Fb=0;m.list[e]=c;c.Qd=!1}};m.openAd=function(e,g,d,l,c,a,b,h){var f={};m.open(e,g,d,h);if(f=m.list[e])f.xa=!0,f.Gb=l,f.xc=c,f.yc=a,f.na=b};m.Ne=function(e){var g=m.list[e];m.list[e]=0;g&&g.monitor&&clearTimeout(g.monitor.N)};m.close=function(e){m.ja(e,0,-1)};m.play=function(e,
g,d,l){var c=m.ja(e,1,g,d,l);if(c&&!c.monitor)c.monitor={},c.monitor.update=function(){c.za==1&&m.ja(c.name,3,-1);c.monitor.N=setTimeout(c.monitor.update,1E3)},c.monitor.update()};m.click=function(e,g){m.ja(e,7,g)};m.complete=function(e,g){m.ja(e,5,g)};m.stop=function(e,g){m.ja(e,2,g)};m.track=function(e){m.ja(e,4,-1)};m.xf=function(e,g){var d="a.media.",l=e.linkTrackVars,c=e.linkTrackEvents,a="m_i",b,h=e.contextData,f;if(g.xa){d+="ad.";if(g.Gb)h["a.media.name"]=g.Gb,h[d+"pod"]=g.xc,h[d+"podPosition"]=
g.yc;if(!g.Lc)h[d+"CPM"]=g.na}if(g.rc)h[d+"clicked"]=!0,g.rc=!1;h["a.contentType"]="video"+(g.xa?"Ad":"");h["a.media.channel"]=m.channel;h[d+"name"]=g.name;h[d+"playerName"]=g.playerName;if(g.length>0)h[d+"length"]=g.length;h[d+"timePlayed"]=Math.floor(g.$);Math.floor(g.$)>0&&(h[d+"timePlayed"]=Math.floor(g.$));if(!g.Lc)h[d+"view"]=!0,a="m_s",m.Heartbeat&&m.Heartbeat.enabled&&(a=g.xa?m.__primetime?"mspa_s":"msa_s":m.__primetime?"msp_s":"ms_s"),g.Lc=1;if(g.T){h[d+"segmentNum"]=g.Ja;h[d+"segment"]=
g.T;if(g.Lb>0)h[d+"segmentLength"]=g.Lb;g.Bc&&g.$>0&&(h[d+"segmentView"]=!0)}if(!g.zf&&g.complete)h[d+"complete"]=!0,g.dg=1;if(g.Eb>0)h[d+"milestone"]=g.Eb;if(g.Fb>0)h[d+"offsetMilestone"]=g.Fb;if(l)for(f in h)Object.prototype[f]||(l+=",contextData."+f);b=h["a.contentType"];e.pe=a;e.pev3=b;var B,C;if(m.contextDataMapping){if(!e.events2)e.events2="";l&&(l+=",events");for(f in m.contextDataMapping)if(!Object.prototype[f]){a=f.length>d.length&&f.substring(0,d.length)==d?f.substring(d.length):"";b=m.contextDataMapping[f];
if(typeof b=="string"){B=b.split(",");for(C=0;C<B.length;C++)b=B[C],f=="a.contentType"?(l&&(l+=","+b),e[b]=h[f]):a=="view"||a=="segmentView"||a=="clicked"||a=="complete"||a=="timePlayed"||a=="CPM"?(c&&(c+=","+b),a=="timePlayed"||a=="CPM"?h[f]&&(e.events2+=(e.events2?",":"")+b+"="+h[f]):h[f]&&(e.events2+=(e.events2?",":"")+b)):a=="segment"&&h[f+"Num"]?(l&&(l+=","+b),e[b]=h[f+"Num"]+":"+h[f]):(l&&(l+=","+b),e[b]=h[f])}else if(a=="milestones"||a=="offsetMilestones")f=f.substring(0,f.length-1),h[f]&&
m.contextDataMapping[f+"s"][h[f]]&&(c&&(c+=","+m.contextDataMapping[f+"s"][h[f]]),e.events2+=(e.events2?",":"")+m.contextDataMapping[f+"s"][h[f]]);h[f]&&(h[f]=0);a=="segment"&&h[f+"Num"]&&(h[f+"Num"]=0)}}e.linkTrackVars=l;e.linkTrackEvents=c};m.ja=function(e,g,d,l,c){var a={},b=(new Date).getTime()/1E3,h,f,B=m.trackVars,C=m.trackEvents,F=m.trackSeconds,n=m.trackMilestones,q=m.trackOffsetMilestones,v=m.segmentByMilestones,p=m.segmentByOffsetMilestones,r,t,y=1,k={},G;if(!m.channel)m.channel=m.s.w.location.hostname;
if(a=e&&m.list&&m.list[e]?m.list[e]:0){if(a.xa)F=m.adTrackSeconds,n=m.adTrackMilestones,q=m.adTrackOffsetMilestones,v=m.adSegmentByMilestones,p=m.adSegmentByOffsetMilestones;d<0&&(d=a.za==1&&a.vc>0?b-a.vc+a.R:a.R);a.length>0&&(d=d<a.length?d:a.length);d<0&&(d=0);a.wc=d;if(a.length>0)a.S=a.wc/a.length*100,a.S=a.S>100?100:a.S;if(a.R<0)a.R=d;G=a.Hc;k.name=e;k.ad=a.xa;k.length=a.length;k.openTime=new Date;k.openTime.setTime(a.timestamp*1E3);k.offset=a.wc;k.percent=a.S;k.playerName=a.playerName;k.mediaEvent=
a.ha<0?"OPEN":g==1?"PLAY":g==2?"STOP":g==3?"MONITOR":g==4?"TRACK":g==5?"COMPLETE":g==7?"CLICK":"CLOSE";if(g>2||g!=a.za&&(g!=2||a.za==1)){if(!c)l=a.Ja,c=a.T;if(g){if(g==1)a.R=d;if((g<=3||g>=5)&&a.ha>=0)if(y=!1,B=C="None",a.ha!=d){f=a.ha;if(f>d)f=a.R,f>d&&(f=d);r=n?n.split(","):0;if(a.length>0&&r&&d>=f)for(t=0;t<r.length;t++)if((h=r[t]?parseFloat(""+r[t]):0)&&f/a.length*100<h&&a.S>=h)y=!0,t=r.length,k.mediaEvent="MILESTONE",a.Eb=k.milestone=h;if((r=q?q.split(","):0)&&d>=f)for(t=0;t<r.length;t++)if((h=
r[t]?parseFloat(""+r[t]):0)&&f<h&&d>=h)y=!0,t=r.length,k.mediaEvent="OFFSET_MILESTONE",a.Fb=k.offsetMilestone=h}if(a.Ud||!c){if(v&&n&&a.length>0){if(r=n.split(",")){r.push("100");for(t=f=0;t<r.length;t++)if(h=r[t]?parseFloat(""+r[t]):0){if(a.S<h)l=t+1,c="M:"+f+"-"+h,t=r.length;f=h}}}else if(p&&q&&(r=q.split(","))){r.push(""+(a.length>0?a.length:"E"));for(t=f=0;t<r.length;t++)if((h=r[t]?parseFloat(""+r[t]):0)||r[t]=="E"){if(d<h||r[t]=="E")l=t+1,c="O:"+f+"-"+h,t=r.length;f=h}}if(c)a.Ud=!0}if((c||a.T)&&
c!=a.T){a.Jc=!0;if(!a.T)a.Ja=l,a.T=c;a.ha>=0&&(y=!0)}if((g>=2||a.S>=100)&&a.R<d)a.Zd+=d-a.R,a.$+=d-a.R;if(g<=2||g==3&&!a.za)a.Cc+=(g==1||g==3?"S":"E")+Math.floor(d),a.za=g==3?1:g;if(!y&&a.ha>=0&&g<=3&&(F=F?F:0)&&a.$>=F)y=!0,k.mediaEvent="SECONDS";a.vc=b;a.R=d}if(!g||g<=3&&a.S>=100)a.za!=2&&(a.Cc+="E"+Math.floor(d)),g=0,B=C="None",k.mediaEvent="CLOSE";if(g==7)y=k.clicked=a.rc=!0;if(g==5||m.completeByCloseOffset&&(!g||a.S>=100)&&a.length>0&&d>=a.length-m.completeCloseOffsetThreshold)y=k.complete=a.complete=
!0;b=k.mediaEvent;b=="MILESTONE"?b+="_"+k.milestone:b=="OFFSET_MILESTONE"&&(b+="_"+k.offsetMilestone);a.Md[b]?k.eventFirstTime=!1:(k.eventFirstTime=!0,a.Md[b]=1);k.event=k.mediaEvent;k.timePlayed=a.Zd;k.segmentNum=a.Ja;k.segment=a.T;k.segmentLength=a.Lb;m.monitor&&g!=4&&m.monitor(m.s,k);if(m.Heartbeat&&m.Heartbeat.enabled){k=[];k.push(a.name);if(!a.Qd)a.Qd=!0,k.push(a.length),k.push(a.playerName),a.xa?(k.push(a.Gb),k.push(a.xc),k.push(a.yc),k.push(a.na),m.Heartbeat.callMethodWhenReady("openAd",k)):
m.Heartbeat.callMethodWhenReady("open",k),k=[],k.push(a.name);g==0?m.Heartbeat.callMethodWhenReady("close",k):(k.push(d),g==1?(k.push(a.Ja),k.push(a.T),k.push(a.Lb),m.Heartbeat.callMethodWhenReady("play",k)):g==2?m.Heartbeat.callMethodWhenReady("stop",k):g==3?m.Heartbeat.callMethodWhenReady("monitor",k):g==5?m.Heartbeat.callMethodWhenReady("complete",k):g==7&&m.Heartbeat.callMethodWhenReady("click",k));a.ha>=0&&(y=!1)}g==0&&m.Ne(e);if(y&&a.Hc==G){e={};e.contextData={};e.linkTrackVars=B;e.linkTrackEvents=
C;if(!e.linkTrackVars)e.linkTrackVars="";if(!e.linkTrackEvents)e.linkTrackEvents="";m.xf(e,a);e.linkTrackVars||(e["!linkTrackVars"]=1);e.linkTrackEvents||(e["!linkTrackEvents"]=1);m.s.track(e);if(a.Jc)a.Ja=l,a.T=c,a.Bc=!0,a.Jc=!1;else if(a.$>0)a.Bc=!1;a.Cc="";a.Eb=a.Fb=0;a.$-=Math.floor(a.$);a.ha=d;a.Hc++}}}return a};m.uf=function(e,g,d,l,c){var a=0;if(e&&(!m.autoTrackMediaLengthRequired||g&&g>0)){if(!m.list||!m.list[e]){if(d==1||d==3)m.open(e,g,"HTML5 Video",c),a=1}else a=1;a&&m.ja(e,d,l,-1,0)}};
m.attach=function(e){var g,d,l;if(e&&e.tagName&&e.tagName.toUpperCase()=="VIDEO"){if(!m.hb)m.hb=function(c,a,b){var h,f;if(m.autoTrack){h=c.currentSrc;(f=c.duration)||(f=-1);if(b<0)b=c.currentTime;m.uf(h,f,a,b,c)}};g=function(){m.hb(e,1,-1)};d=function(){m.hb(e,1,-1)};m.ra(e,"play",g);m.ra(e,"pause",d);m.ra(e,"seeking",d);m.ra(e,"seeked",g);m.ra(e,"ended",function(){m.hb(e,0,-1)});m.ra(e,"timeupdate",g);l=function(){!e.paused&&!e.ended&&!e.seeking&&m.hb(e,3,-1);setTimeout(l,1E3)};l()}};m.ra=function(m,
g,d){m.attachEvent?m.attachEvent("on"+g,d):m.addEventListener&&m.addEventListener(g,d,!1)};if(m.completeByCloseOffset==void 0)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==void 0)m.completeCloseOffsetThreshold=1;var D=new function(m){this.He=function(g){this.s=g;this.enabled=!1;this.v=new this.Ka.Lf.je(g)};this.open=function(g,d,m){this.v.open(g,d,m)};this.openAd=function(g,d,m,c,a,b,h){this.v.openAd(g,d,m,c,a,b,h)};this.close=function(g){this.v.close(g)};this.play=function(g,d,m,c,
a){this.v.play(g,d,m,c,a)};this.monitor=function(g,m){this.v.monitor(g,m)};this.stop=function(g,m){this.v.stop(g,m)};this.click=function(g,m){this.v.click(g,m)};this.complete=function(g,m){this.v.complete(g,m)};this.setup=function(g){this.v.Tf(g)};this.bufferStart=function(){this.v.wf()};this.bitrateChange=function(g){this.v.vf(g)};this.updateQoSInfo=function(g,m,e){this.v.Zf(g,m,e)};this.adBreakStart=function(m){this.v.rf(m)};this.adBreakEnd=function(){this.v.qf()};this.trackError=function(m,d,e){this.v.Xf(m,
d,e)};this.sessionComplete=function(){this.v.Rf()};this.__setPsdkVersion=function(m){this.v.Ie(m)};(function(m){if(typeof d==="undefined")var d={};if(typeof e==="undefined")var e={};e.event||(e.event={});e.a||(e.a={});e.H||(e.H={});e.bb||(e.bb={});e.L||(e.L={});(function(c){c.extend=function(a,b){function c(){this.constructor=a}for(var f in b)b.hasOwnProperty(f)&&(a[f]=b[f]);c.prototype=b.prototype;a.prototype=new c;a.r=b.prototype;return a}})(d);(function(c){c.P=function(a,b){var c=[],f;for(f in b)b.hasOwnProperty(f)&&
typeof b[f]==="function"&&c.push(f);for(f=0;f<c.length;f++){var B=c[f];a.prototype[B]=b[B]}}})(d);(function(c){c.Id={Ld:function(){this.da&&this.da.apply(this,arguments);this.da=j}}})(d);(function(c){c.Oa=!1;c.O={M:function(a){this.Ua=!0;this.yb=a},gg:function(){this.Ua=!1},log:function(a){c.Oa&&this.Ua&&window.console&&window.console.log&&window.console.log(this.yb+a)},info:function(a){c.Oa&&this.Ua&&window.console&&window.console.info&&window.console.info(this.yb+a)},warn:function(a){c.Oa&&this.Ua&&
window.console&&window.console.warn&&window.console.warn(this.yb+a)},error:function(a){if(c.Oa&&this.Ua&&window.console&&window.console.error)throw a=this.yb+a,window.console.error(a),Error(a);}}})(d);(function(c){function a(a,c){this.type=a;this.data=c}a.ec="success";a.Ub="error";c.V=a})(d);(function(c){function a(){this.F={}}a.prototype.addEventListener=function(a,c,f){a&&c&&(this.F[a]=this.F[a]||[],this.F[a].push({yf:c,Hd:f||window}))};a.prototype.dispatchEvent=function(a){if(a.type)for(var c in this.F)if(this.F.hasOwnProperty(c)&&
a.type===c){var f=this.F[c];for(c=0;c<f.length;c++)f[c].yf.call(f[c].Hd,a);break}};a.prototype.eb=function(a){if(a){var c,f;for(f in this.F)if(this.F.hasOwnProperty(f)){for(c=this.F[f].length-1;c>=0;c--)this.F[f][c].Hd===a&&this.F[f].splice(c,1);this.F[f].length||delete this.F[f]}}else this.F={}};c.jd=a})(d);(function(c){function a(){if(!a.prototype.Ta)a.prototype.Ta=new b;return a.prototype.Ta}var b=c.jd;c.ba=a})(d);(function(c){function a(){}function b(){b.r.constructor.call(this)}var h=c.V,f=c.jd;
a.kd="GET";c.extend(b,f);b.prototype.load=function(a){if(a&&a.method&&a.url){var f=this;a.fa.onreadystatechange=function(){if(a.fa.readyState===4){var m={};m[b.te]=a.fa.status;a.fa.status>=200&&a.fa.status<400?(m[b.oe]=a.fa.responseText,m[b.Xb]=f,f.dispatchEvent(new c.V(h.ec,m))):f.dispatchEvent(new c.V(h.Ub,m))}};a.fa.open(a.method,a.url,!0);a.fa.send()}};b.prototype.close=function(){this.eb()};b.te="status";b.oe="response";b.Xb="instance";c.Ge=a;c.Fe=function(a,b){this.url=a||j;this.method=b;this.fa=
new XMLHttpRequest};c.Ee=b})(d);(function(c,a){function b(){}b.Fa="report";b.qa="what";b.Ga="reset";b.Pb="account";b.ac="sc_tracking_server";b.vb="tracking_server";b.lb="check_status_server";b.qb="job_id";b.Pa="publisher";b.cc="stream_type";b.Yb="ovp";b.bc="sdk";b.$c="channel";b.nb="debug_tracking";b.wb="track_local";b.Ha="visitor_id";b.Aa="analytics_visitor_id";b.Da="marketing_cloud_visitor_id";b.i="name";b.Ca="length";b.Ea="player_name";b.W="timer_interval";b.od="tracking_interval";b.bd="check_status_interval";
b.fc="track_external_errors";b.Zb="parent_name";b.md="parent_pod";b.$b="parent_pod_position";b.tb="parent_pod_offset";b.na="parent_pod_cpm";b.B="offset";b.ub="source";b.Vb="error_id";b.kb="bitrate";b.Wb="fps";b.Sb="dropped_frames";a.event.aa=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.V);b.La="api_destroy";b.Qb="api_config";b.Tc="api_open_main";b.Sc="api_open_ad";b.Pc="api_close";b.Uc="api_play";b.Rc="api_monitor";b.Xc="api_stop";b.Oc="api_click";b.Qc="api_complete";
b.Yc="api_track_error";b.Vc="api_qos_info";b.Mc="api_bitrate_change";b.Nc="api_buffer_start";b.Rb="api_pod_offset";b.Wc="api_session_complete";a.event.Ma=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.V);b.Ba="context_data_available";a.event.cd=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.V);b.oa="data_request";b.mb="data_response";b.ya={Qa:"tracking_timer_interval",ld:"main_video_publisher"};a.event.Tb=b})(d,e);(function(c,
a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.V);b.rb="network_check_status_complete";a.event.sb=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.V);b.CLOCK_TRACKING_TICK="CLOCK_TRACKING_TICK";b.CLOCK_TRACKING_ENABLE="CLOCK_TRACKING_ENABLE";b.CLOCK_TRACKING_DISABLE="CLOCK_TRACKING_DISABLE";b.CLOCK_CHECK_STATUS_TICK="CLOCK_CHECK_STATUS_TICK";b.CLOCK_CHECK_STATUS_ENABLE="CLOCK_CHECK_STATUS_ENABLE";b.CLOCK_CHECK_STATUS_DISABLE="CLOCK_CHECK_STATUS_DISABLE";
a.event.Na=b})(d,e);(function(c,a){function b(a,b){this.value=a;this.hint=b}function h(a){this.Ac=a;this.data={}}b.pa="short";h.prototype.c=function(a,b,c){var h=this;return function(){arguments.length&&(h[a]=arguments[0],h.Mb(b,arguments[0],c));return h[a]}};h.prototype.Mb=function(a,c,h){this.data[a]=new b(c,h)};a.a.Q=h;a.a.dd=b})(d,e);(function(c,a){function b(a,c){b.r.constructor.call(this,a);this.$f=this.c("_year","year",h.pa);this.Nf=this.c("_month","month",h.pa);this.Bf=this.c("_day","day",
h.pa);this.If=this.c("_hour","hour",h.pa);this.Mf=this.c("_minute","minute",h.pa);this.Pf=this.c("_second","second",h.pa);this.$f(c.getUTCFullYear());this.Nf(c.getUTCMonth()+1);this.Bf(c.getUTCDate());this.If(c.getUTCHours());this.Mf(c.getUTCMinutes());this.Pf(c.getUTCSeconds())}var h=a.a.dd;c.extend(b,a.a.Q);a.a.de=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"asset");this.Cb=this.c("_cpm","cpm",j);this.K=this.c("_adId","ad_id",j);this.Kb=this.c("_resolver","resolver",j);this.Hb=
this.c("_podId","pod_id",j);this.Ib=this.c("_podPosition","pod_position",j);this.Jb=this.c("_podSecond","pod_second",j);this.length=this.c("_length","length",j);this.Cb("");this.K("");this.Kb("");this.Hb("");this.Ib("");this.Jb(0);this.length(0);if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.Cb(a.Cb());this.K(a.K());this.Kb(a.Kb());this.Hb(a.Hb());this.Ib(a.Ib());this.Jb(a.Jb());this.length(a.length())}}c.extend(b,a.a.Q);a.a.Zc=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,
"asset");this.type=this.c("_type","type",j);this.k=this.c("_videoId","video_id",j);this.J=this.c("_publisher","publisher",j);this.q=this.c("_adData","ad_data",j);this.duration=this.c("_duration","duration",j);this.type("");this.k("");this.J("");this.q(j);this.duration(0);if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.type(a.type());this.k(a.k());this.J(a.J());this.duration(a.duration());(a=a.q())&&this.q(new h(a))}}var h=a.a.Zc;c.extend(b,a.a.Q);b.pd="vod";b.Ae="live";b.ze=
"linear";b.Ra="ad";a.a.jb=b})(d,e);(function(c,a){function b(a){b.r.constructor.call(this,"event");this.of=a;this.type=this.c("_type","type",j);this.count=this.c("_count","count",j);this.Fc=this.c("_totalCount","total_count",j);this.duration=this.c("_duration","duration",j);this.Gc=this.c("_totalDuration","total_duration",j);this.ka=this.c("_playhead","playhead",j);this.id=this.c("_id","id",j);this.source=this.c("_source","source",j);this.zc=this.c("_prevTs","prev_ts",j);this.pf=function(){var a=
this.of*1E3;this.oc=new Date(Math.floor(this.nc/a)*a);this.Mb("ts_as_date",new h(this.Ac,this.oc),j)};this.Ob=function(){if(arguments.length)this.nc=arguments[0],this.Mb("ts",this.nc,j),this.pf();return this.nc};this.Yf=function(){if(arguments.length)this.oc=arguments[0],this.Mb("ts_as_date",new h(this.Ac,this.oc),j)};this.type("");this.count(0);this.Fc(0);this.duration(0);this.Gc(0);this.ka(0);this.id("");this.source("");this.zc(-1);this.Ob((new Date).getTime())}var h=a.a.de;c.extend(b,a.a.Q);b.he=
"load";b.ie="unload";b.ob="start";b.hd="play";b.gd="pause";b.fe="buffer";b.ee="bitrate_change";b.ge="error";b.ed="active";b.fd="complete";a.a.pb=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"stream");this.pc=this.c("_bitrate","bitrate",j);this.Nd=this.c("_fps","fps",j);this.Kd=this.c("_droppedFrames","dropped_frames",j);this.pc(0);this.Nd(0);this.Kd(0)}c.extend(b,a.a.Q);a.a.me=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"sc");this.Td=this.c("_reportSuiteId","rsid",
j);this.trackingServer=this.c("_trackingServer","tracking_server",j);this.Td("");this.trackingServer("")}c.extend(b,a.a.Q);a.a.ye=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"sp");this.ia=this.c("_ovp","ovp",j);this.la=this.c("_sdk","sdk",j);this.channel=this.c("_channel","channel",j);this.playerName=this.c("_playerName","player_name",j);this.ia("unknown");this.la("unknown");this.channel("unknown");this.playerName("")}c.extend(b,a.a.Q);a.a.ve=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,
"event");this.Dc=this.c("_sessionId","sid",j);this.Dc("")}c.extend(b,a.a.Q);a.a.we=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"stream");this.qc=this.c("_cdn","cdn",j);this.name=this.c("_name","name",j);this.qc("");this.name("");if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.qc(a.qc());this.name(a.name())}}c.extend(b,a.a.Q);a.a.nd=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"user");this.tc=this.c("_device","device",j);this.country=this.c("_country",
"country",j);this.city=this.c("_city","city",j);this.latitude=this.c("_latitude","latitude",j);this.longitude=this.c("_longitude","longitude",j);this.ib=this.c("_visitorId","id",j);this.$a=this.c("_analyticsVisitorId","aid",j);this.ab=this.c("_marketingCloudVisitorId","mid",j);this.tc("");this.country("");this.city("");this.latitude("");this.longitude("");this.ib("");this.$a("");this.ab("");if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.tc(a.tc());this.country(a.country());
this.city(a.city());this.latitude(a.latitude());this.longitude(a.longitude());this.ib(a.ib());this.$a(a.$a());this.ab(a.ab())}}c.extend(b,a.a.Q);a.a.sd=b})(d,e);(function(c,a){a.a.re=function(a,c,f,m,e){this.ga=a;this.g=c;this.Kc=f;this.Ec=m;this.cb=e}})(d,e);(function(c,a){var b=a.a.pb;a.a.qe=function(a,c,m){this.Uf=a;this.Qf=c;this.Sf=m;this.G=[];this.Za=function(a){this.G.push(a)};this.ig=function(){return this.G};this.Ef=function(){if(this.G.length)for(var a=this.G.length-1;a>=0;a--)this.G[a].ga.type()===
b.gd&&this.G.splice(a,1)}}})(d,e);(function(c,a){function b(){}b.prototype.Wd=E();b.prototype.Xd=E();b.prototype.U=E();b.prototype.Vd=E();b.prototype.Yd=E();a.a.ue=b})(d,e);(function(c,a){function b(){this.M("[media-fork::QuerystringSerializer] > ");this.ca=function(a){return a?a+"&":""};this.Cd=function(a){a&&a.length>0&&(a=a.substring(0,a.length-1));return a};this.lf=function(a){var b=[],c;for(c in a.data)if(a.data.hasOwnProperty(c)){var f=a.data[c],p=f.value;f=f.hint;var m=j,h=a.Ac;p===j||typeof p===
"undefined"||(typeof p==="number"?m=this.Vd(c,p,h,f):typeof p==="string"?m=this.Yd(c,p,h,f):p instanceof e?m=this.U(p):this.warn("#_processDao() > Unable to serialize DAO. Field: "+c+". Value: "+p+"."),m&&b.push(m))}return b}}var m=c.P,f=c.O,e=a.a.Q,g=a.a.dd;c.extend(b,a.a.ue);m(b,f);b.prototype.Wd=function(a){for(var b=[],c=a.G,f=0;f<c.length;f++){var p=this.Xd(c[f])+"&";p+=this.ca(this.U(a.Uf));p+=this.ca(this.U(a.Qf));p+=this.ca(this.U(a.Sf));p=this.Cd(p);b.push(p)}return b};b.prototype.Xd=function(a){var b=
this.ca(this.U(a.ga));b+=this.ca(this.U(a.g));b+=this.ca(this.U(a.Kc));b+=this.ca(this.U(a.Ec));b+=this.ca(this.U(a.cb));return b=this.Cd(b)};b.prototype.U=function(a){a=this.lf(a);for(var b="",c=0;c<a.length;c++)b+=c==a.length-1?a[c]:a[c]+"&";return b};b.prototype.Vd=function(a,b,c,f){var p="l";if(b!=j&&b!==void 0&&!isNaN(b))return f&&typeof f==="string"&&f===g.pa&&(p="h"),p+":"+c+":"+a+"="+b;return j};b.prototype.Yd=function(a,b,c){if(b)return"s:"+c+":"+a+"="+b;return j};a.a.ne=b})(d,e);(function(c,
a){function b(a){this.Nb=0;this.N=a;this.Db=!1}function m(){if(m.prototype.Ta)return m.prototype.Ta;var a=this;this.M("[media-fork::TimerManager] > ");this.xd=0;this.ea={};this.ua=function(){this.log("#_onApiDestroy()");clearInterval(this.vd);n().eb(this)};this.hf=function(){this.log("#_onTick() > ------------------- ("+this.xd+")");this.xd++;for(var a in this.ea)if(this.ea.hasOwnProperty(a)){var b=this.ea[a];if(b.Db&&(b.Nb++,b.Nb%b.N===0)){var c={};c[d.W]=b.N;n().dispatchEvent(new g(g[a],c))}}};
n().addEventListener(e.La,this.ua,this);this.vd=setInterval(function(){a.hf()},q*1E3);this.Jf=function(a){return(a=this.ea[a])&&a.Db};this.Gd=function(a,c){this.ea[a]=new b(c)};this.Cf=function(a){delete this.ea[a]};this.Vf=function(a,b){this.log("#startTimer(name="+a+", reset="+b+")");var c=this.ea[a];if(c&&(c.Db=!0,b))this.log("Resseting timer: "+a),c.Nb=0};this.Wf=function(a,b){this.log("#startTimer(name="+a+", reset="+b+")");var c=this.ea[a];if(c&&(c.Db=!1,b))this.log("Resseting timer: "+a),c.Nb=
0};m.prototype.Ta=this}var f=c.P,e=a.event.Ma,g=a.event.Na,d=a.event.aa,n=c.ba,q=1;f(m,c.O);new m;a.L.Ce=m})(d,e);(function(c,a){function b(a,b,c,m){this.M("[media-fork::Timer] > ");this.N=m;this.ma=a;this.Ff=b;this.Df=c;g().Gd(this.ma,this.N);this.ua=function(){this.Jd()};this.kf=function(a){a=a.data;var b=!1;a&&a.hasOwnProperty(d.Ga)&&(b=a[d.Ga]);this.start(b)};this.jf=function(a){a=a.data;var b=!1;a&&a.hasOwnProperty(d.Ga)&&(b=a[d.Ga]);this.stop(b)};f().addEventListener(e.La,this.ua,this);f().addEventListener(this.Ff,
this.kf,this);f().addEventListener(this.Df,this.jf,this)}var m=c.P,f=c.ba,e=a.event.Ma,g=a.L.Ce,d=a.event.aa;m(b,c.O);b.prototype.start=function(a){this.log("Starting timer: "+this.ma);g().Vf(this.ma,a)};b.prototype.stop=function(a){this.log("Stopping timer: "+this.ma);g().Wf(this.ma,a)};b.prototype.Jd=function(){f().eb(this);g().Cf(this.ma)};b.prototype.setInterval=function(a){var b=g().Jf(this.ma);this.stop(!0);this.N=a;g().Gd(this.ma,this.N);b&&this.start(!0)};a.L.rd=b})(d,e);(function(c,a){function b(){this.M("[media-fork::TrackingTimer] > ");
b.r.constructor.call(this,n.CLOCK_TRACKING_TICK,n.CLOCK_TRACKING_ENABLE,n.CLOCK_TRACKING_DISABLE,v);this.jc=function(a){a=a.data[q.od];this.log("#_onCheckStatusComplete(interval="+a+")");a?a===this.N?this.log("#_onCheckStatusComplete() > Interval value not changed."):(this.log("#_onCheckStatusComplete() > Interval changed to: "+a),this.setInterval(a)):(this.warn("#_onCheckStatusComplete() > Invalid interval value."),this.setInterval(v))};this.kc=function(a){a=a.data[q.qa];this.log("#_onDataRequest(what="+
a+")");switch(a){case g.ya.Qa:a={},a[q.W]=this.N,e().dispatchEvent(new g(g.mb,a))}};e().addEventListener(d.rb,this.jc,this);e().addEventListener(g.oa,this.kc,this)}var m=c.P,f=c.O,e=c.ba,g=a.event.Tb,d=a.event.sb,n=a.event.Na,q=a.event.aa,v=10;c.extend(b,a.L.rd);m(b,f);a.L.De=b})(d,e);(function(c,a){function b(){this.M("[media-fork::CheckStatusTimer] > ");b.r.constructor.call(this,v.CLOCK_CHECK_STATUS_TICK,v.CLOCK_CHECK_STATUS_ENABLE,v.CLOCK_CHECK_STATUS_DISABLE,f);var a=this;setTimeout(function(){a.Pe()},
200);this.Pe=function(){this.log("#_initialCheck()");var a={};a[q.W]=this.N;d().dispatchEvent(new v(v.CLOCK_CHECK_STATUS_TICK,a))};this.jc=function(a){a=a.data[q.bd];this.log("#_onCheckStatusComplete(interval="+a+")");a?a===this.N?this.log("#_onCheckStatusComplete() > Interval value not changed."):a>m?(this.warn("#_onCheckStatusComplete() > Interval value too large: "+a),this.setInterval(m)):(this.log("#_onCheckStatusComplete() > Interval changed to: "+a),this.setInterval(a)):(this.warn("#_onCheckStatusComplete() > Invalid interval value."),
this.setInterval(f))};d().addEventListener(n.rb,this.jc,this)}var m=600,f=60,e=c.P,g=c.O,d=c.ba,n=a.event.sb,q=a.event.aa,v=a.event.Na;c.extend(b,a.L.rd);e(b,g);a.L.$d=b})(d,e);(function(c,a){var b=a.L.$d,m=a.L.De;a.L.ae=function(){this.ag=new b;this.cg=new m}})(d,e);(function(c,a){function b(a){this.M("[media-fork::SettingsParser] > ");this.Me=a;this.log("#SettingsParser(data="+a+")")}var m=c.P,f=c.ba,e=a.event.aa,g=a.event.sb;m(b,c.O);b.prototype.parse=function(){var a,b,c,m;window.DOMParser?m=
(new window.DOMParser).parseFromString(this.Me,"text/xml"):(m=new window.ActiveXObject("Microsoft.XMLDOM"),m.async=!1,m.loadXML(this.data));var p;(p=parseInt(m.getElementsByTagName("trackingInterval")[0].childNodes[0].nodeValue,10))&&(a=p);(p=parseInt(m.getElementsByTagName("setupCheckInterval")[0].childNodes[0].nodeValue,10))&&(b=p);(p=parseInt(m.getElementsByTagName("trackExternalErrors")[0].childNodes[0].nodeValue,10))&&(c=p===1);m={};m[e.od]=a;m[e.bd]=b;m[e.fc]=c;this.log("#parse() > Obtained configuration settings: "+
JSON.stringify(m));f().dispatchEvent(new g(g.rb,m))};a.bb.xe=b})(d,e);(function(c,a){function b(a){this.M("[media-fork::Network] > ");this.ta=this.Dd=this.yd=!1;this.nf=a;this.Ad=this.ud=this.Ed=j;this.ic=function(a){a=a.data;this.log("#_onApiConfig(sb_server="+a[p.vb]+", check_status_server="+a[p.lb]+", job_id="+a[p.qb]+", debug_tracking="+a[p.nb]+", track_local="+a[p.wb]+")");this.Ed=a[p.vb];this.ud=a[p.lb];this.Ad=a[p.qb];this.yd=a[p.nb];this.Dd=a[p.wb];this.ta=!0};this.ua=function(){this.log("#_onApiDestroy()");
g().eb(this)};this.ff=function(a){if(this.ta){if(a=this.nf.Wd(a.data[p.Fa]),!this.Dd)for(var b=0;b<a.length;b++){var c=new l(this.Ed+"/?__job_id="+this.Ad+"&"+a[b],n.kd);this.yd&&window.console.log&&window.console.info(c.method+" : "+c.url);(function(a,b){a.addEventListener(e.ec,function(){a.close()},this);a.addEventListener(e.Ub,function(c){b.warn("#_onContextDataAvailable() > Failed to send heartbeat report: "+JSON.stringify(c));a.close()},this);a.load(c)})(new v,this)}}else this.warn("#_onContextDataAvailable() > Unable to send request: not configured.")};
this.df=function(){function a(b){b.data&&(new k(b.data.response)).parse();b.data[v.Xb].close()}function b(a){c.warn("_onClockCheckStatusTick() > Failed to obtain the config. settings: "+JSON.stringify(a));a.data[v.Xb].close()}if(this.ta){var c=this;this.da=function(c){if(c=c[p.Pa]){c=c.replace(/[^a-zA-Z0-9]+/,"-").toLocaleLowerCase();c=this.ud+c+".xml?r="+(new Date).getTime();var f=new l(c,n.kd),m=new v;m.addEventListener(e.ec,a,this);m.addEventListener(e.Ub,b,this);this.log("#_onClockCheckStatusTick() > Get new settings from: "+
c);m.load(f)}else this.warn("#_onClockCheckStatusTick() > Publisher is NULL.")};var f={};f[p.qa]=r.ya.ld;g().dispatchEvent(new r(r.oa,f))}else this.warn("#_onClockCheckStatusTick() > Unable to send request: not configured.")};this.lc=function(a){this.Ld(a.data)};g().addEventListener(r.mb,this.lc,this);g().addEventListener(d.Qb,this.ic,this);g().addEventListener(d.La,this.ua,this);g().addEventListener(y.Ba,this.ff,this);g().addEventListener(t.CLOCK_CHECK_STATUS_TICK,this.df,this)}var m=c.P,f=c.O,e=
c.V,g=c.ba,d=a.event.Ma,n=c.Ge,l=c.Fe,v=c.Ee,p=a.event.aa,r=a.event.Tb,t=a.event.Na,y=a.event.cd,k=a.bb.xe;m(b,c.Id);m(b,f);a.bb.le=b})(d,e);(function(c,a){function b(){this.M("[media-fork::Counters] > ");this.va={};this.wa={};this.Od=function(a,b,c){a=b+"."+c+"."+a;this.va[a]||(this.va[a]=0);this.log("#getTotalCount(key="+a+")");return this.va[a]};this.jg=function(a,b,c){a=b+"."+c+"."+a;this.log("#resetTotalCount(key="+a+")");this.va[a]=0};this.Sd=function(a,b,c){a=b+"."+c+"."+a;this.va[a]||(this.va[a]=
0);this.log("#incrementTotalCount(key="+a+")");this.va[a]++};this.Pd=function(a,b,c){a=b+"."+c+"."+a;this.wa[a]||(this.wa[a]=0);this.log("#getTotalDuration(key="+a+")");return this.wa[a]};this.kg=function(a,b,c){a=b+"."+c+"."+a;this.log("#resetTotalDuration(key="+a+")");this.wa[a]=0};this.Rd=function(a,b,c,m){a=b+"."+c+"."+a;this.wa[a]||(this.wa[a]=0);this.log("#resetTotalDuration(key="+a+", amount="+m+")");this.wa[a]+=m}}var m=c.P;m(b,c.O);a.H.ce=b})(d,e);(function(c,a){function b(){this.M("[media-fork::History] > ");
this.zd={};this.wd=function(a){var b=a.g;return(b.q()?b.q().K():b.k())+"."+b.type()+"."+a.Z};this.gb=function(a){var b=this.wd(a);this.log("#updateWith(key="+b+")");this.zd[b]=a};this.I=function(a){a=this.wd(a);this.log("#getPreviousItemOfSameTypeWith(key="+a+")");return this.zd[a]}}var m=c.P;m(b,c.O);a.H.ke=b})(d,e);(function(c,a){var b=a.a.pb,m=a.a.jb,f=a.a.sd,e=a.a.nd;a.H.qd=function(a,c,g,d,v,p){this.timestamp=new Date;this.g=new m(a);this.Kc=new f(c);this.Ec=new e(g);this.Z=v;this.cb=d;this.ka=
p;this.A=void 0;this.Gf=function(){if(this.Z===b.ed)return this.g.k();return this.g.type()===m.Ra?this.g.q().K():this.g.k()};this.hg=function(){return 1}}})(d,e);(function(c,a){a.H.Be=function(){this.Y=[];this.Hf=function(){return this.Y.slice()};this.sf=function(a){for(var c=-1,m=this.Y.length-1;m>=0;m--){if(a.timestamp>=this.Y[m].timestamp)break;c=m}c>0?this.Y.splice(m,0,a):this.Y.push(a)}}})(d,e);(function(c,a){function b(a){this.M("[media-fork::ReporterHelper] > ");this.j=a;this.Bd=j;this.Le=
function(a,b,c){c*=1E3;a=a.getTime()===0?b.getTime()-c/2:a.getTime()/2+b.getTime()/2;a=Math.floor(a/c)*c;this.Bd==a&&(a+=c);this.Bd=a;return new Date(a)};this.Sa=function(a,b,c){var m=this.j.hc,f=a.Z,g=a.Gf(),h=a.g.type(),n=f===e.ob?0:a.ka;m.Sd(f,g,h);m.Rd(f,g,h,b);c=new e(c);c.type(f);c.count(1);c.duration(b);c.Fc(m.Od(f,g,h));c.Gc(m.Pd(f,g,h));c.ka(n);c.Ob(a.timestamp.getTime());c.zc(a.A?a.A.timestamp.getTime():-1);return new d(c,a.g,a.Kc,a.Ec,a.cb)};this.td=function(a,b,c){if(a.G.length){var m=
new g(this.j.e);m.type(this.j.zb);m.q(j);m=new n(m,this.j.n,this.j.C,this.j.u,e.ed,this.j.p[this.j.e.k()]);m.A=this.j.o.I(m);this.j.o.gb(m);a.Za(this.Sa(m,b*1E3,b));if(c!=j)for(b=0;b<a.G.length;b++)a.G[b].ga.Yf(c)}};this.Xa=function(a,b){return b.getTime()-a.getTime()};this.sc=function(a,b,c){var m=new f(this.j.Bb,this.j.Ia,this.j.Wa);m.Za(this.Sa(a,0,b));c&&this.td(m,b,j);return m};this.Fd=function(a,b,c){var m,d,h=new f(this.j.Bb,this.j.Ia,this.j.Wa),n=this.j.Y.Hf(),l=[];d=j;var o=0;for(o=m=0;o<
n.length;o++)m=n[o],m.timestamp>a&&m.timestamp<=b&&l.push(m),m.timestamp<=a&&(d=m);this.log("#createReportForQuantum() > -------------TRACK REPORT----------------");this.log("#createReportForQuantum() > Interval: ["+a.getTime()+" , "+b.getTime()+"]. Tracking interval: "+c);this.log("#createReportForQuantum() > -----------------------------------------");for(o=0;o<n.length;o++)this.log("#createReportForQuantum() > ["+n[o].timestamp.getTime()+"] :"+n[o].Z+" | "+n[o].g.type());this.log("#createReportForQuantum() > -----------------------------------------");
for(o=0;o<l.length;o++)this.log("#createReportForQuantum() > ["+l[o].timestamp.getTime()+"] :"+l[o].Z+" | "+l[o].g.type());this.log("#createReportForQuantum() > -----------------------------------------");if(d){if(d.A)d.A.timestamp=d.timestamp;d.timestamp=new Date(a.getTime()+1);m=d.g.q()?d.g.q().K():d.g.k();d.ka=this.j.p[m]}if(l.length){n=0;d&&(n=d.Z===e.ob&&d.g.type()!==g.Ra?this.Xa(d.timestamp,l[0].timestamp):this.Xa(a,l[0].timestamp),h.Za(this.Sa(d,n,c)));for(o=0;o<l.length;o++){var q=l[o];n=
o==l.length-1?this.Xa(q.timestamp,b):this.Xa(q.timestamp,l[o+1].timestamp);var x=!1,u=h.G;for(m=0;m<u.length;m++)if(d=u[m],q.g.type()===d.g.type()&&q.Z===d.ga.type()&&(x=q.g.type()===g.Ra?d.g.q().K()===q.g.q().K():d.g.k()===q.g.k()),x){u=d.ga;var z=d.g.type();m=d.g.q()?d.g.q().K():d.g.k();var i=this.j.hc;i.Sd(u.type(),m,z);i.Rd(u.type(),m,z,n);d.cb=q.cb;u.ka(this.j.p[m]);u.duration(u.duration()+n);u.Fc(i.Od(u.type(),m,z));u.Gc(i.Pd(u.type(),m,z));u.Ob(q.timestamp.getTime());break}if(!x)this.log("#createReportForQuantum() > Adding event to report: "+
q.Z),m=q.g.q()?q.g.q().K():q.g.k(),q.ka=this.j.p[m],h.Za(this.Sa(q,n,c))}}else d&&h.Za(this.Sa(d,this.Xa(a,b),c));h.Ef();o=this.Le(a,b,c);this.td(h,c,o);this.log("#createReportForQuantum() > Final report ----- START -----");for(o=0;o<h.G.length;o++)d=h.G[o],c=d.ga,m=d.g.q()?d.g.q().K():d.g.k(),this.log("#createReportForQuantum() > Final report ["+c.Ob()+"/"+c.zc()+"] :"+c.type()+" | type="+d.g.type()+", name="+m+", duration="+c.duration()+", playhead="+c.ka());this.log("#createReportForQuantum() > Final report ----- END -----");
return h}}var m=c.P,f=a.a.qe,e=a.a.pb,g=a.a.jb,d=a.a.re,n=a.H.qd;m(b,c.O);a.H.se=b})(d,e);(function(c,a){function b(){this.M("[media-fork::Context] > ");this.xb=this.z=!1;this.zb=j;this.gc=!1;this.l=this.Ab=j;this.f={fb:j,J:j};this.Ya=this.da=j;this.p={};this.Va=new g(this);this.Y=new e;this.o=new l;this.Wa=new v;this.Bb=new p;this.Ia=new t;this.e=new r;this.n=new y;this.C=new k;this.u=new G;this.hc=new w;this.ic=function(a){a=a.data;this.log("#_onApiConfig(account="+a[i.Pb]+", sc_server="+a[i.ac]+
", sb_server="+a[i.vb]+", check_status_server="+a[i.lb]+", job_id="+a[i.qb]+", publisher="+a[i.Pa]+", ovp="+a[i.Yb]+", sdk="+a[i.bc]+", debug_tracking="+a[i.nb]+", track_local="+a[i.wb]+")");this.Bb.Td(a[i.Pb]);this.Bb.trackingServer(a[i.ac]);this.f.J=a[i.Pa];this.Ia.ia(a[i.Yb]);this.Ia.la(a[i.bc]);this.Ia.channel(a[i.$c]);d().dispatchEvent(new o(o.CLOCK_CHECK_STATUS_ENABLE))};this.ua=function(){this.log("#_onApiDestroy()");d().eb(this)};this.Xe=function(a){a=a.data;this.log("#_onApiOpenMain(name="+
a[i.i]+", length="+a[i.Ca]+", type="+a[i.cc]+", player_name="+a[i.Ea]+", vid="+a[i.Ha]+", aid="+a[i.Aa]+", mid="+a[i.Da]+")");this.mf();this.l=a[i.i];this.p[this.l]=0;this.Ia.playerName(a[i.Ea]);this.n.ib(a[i.Ha]);this.n.$a(a[i.Aa]);this.n.ab(a[i.Da]);this.e.k(this.l);this.e.duration(a[i.Ca]);this.e.type(a[i.cc]);this.zb=this.e.type();this.C.name(this.l);this.Oe();a={};a[i.Ga]=!0;d().dispatchEvent(new o(o.CLOCK_TRACKING_ENABLE,a));this.da=function(a){a=a[i.W];var b=new n(this.e,this.n,this.C,this.u,
A.he,0);b.A=this.o.I(b);this.o.gb(b);a=this.Va.sc(b,a,!0);b={};b[i.Fa]=a;d().dispatchEvent(new z(z.Ba,b))};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a));a=new n(this.e,this.n,this.C,this.u,A.ob,0);a.A=this.o.I(a);this.X(a);this.z=!0};this.We=function(a){if(this.z){this.info("Call detected: onApiOpenAd().");a=a.data;this.log(this,"#_onApiOpenAd(name="+a[i.i]+", length="+a[i.Ca]+", player_name="+a[i.Ea]+", parent_name="+a[i.Zb]+", pod_pos="+a[i.$b]+", pod_offset="+a[i.tb]+", cpm="+a[i.na]+")");
this.e.k()||this.e.k(a[i.Zb]);this.l=a[i.i];this.p[this.l]=0;var b=new s;b.K(this.l);b.length(a[i.Ca]);b.Kb(a[i.Ea]);b.Cb(a[i.na]);b.Hb(a[i.md]);b.Jb(this.Ab);b.Ib(a[i.$b]+"");this.e.q(b);this.e.type(r.Ra);a=new n(this.e,this.n,this.C,this.u,A.ob,0);a.A=this.o.I(a);this.X(a);a=new n(this.e,this.n,this.C,this.u,A.hd,this.p[this.l]);a.A=this.o.I(a);this.X(a)}else this.warn("#_onApiOpenAd() > No active viewing session.")};this.Te=function(a){this.z?(a=a.data[i.i],this.log("#_onApiClose(name="+a+")"),
a===this.e.k()?this.Ke():this.Je()):this.warn("#_onApiClose() > No active viewing session.")};this.Ye=function(a){if(this.z){if(a=a.data,this.log("#_onApiPlay(name="+a[i.i]+", offset="+a[i.B]+", vid="+a[i.Ha]+", aid="+a[i.Aa]+", mid="+a[i.Da]+")"),!(a[i.i]==this.e.k&&this.xb))this.n.ib(a[i.Ha]),this.n.$a(a[i.Aa]),this.n.ab(a[i.Da]),this.l=a[i.i],this.p[this.l]=Math.floor(a[i.B]),d().dispatchEvent(new o(o.CLOCK_TRACKING_ENABLE)),a=new n(this.e,this.n,this.C,this.u,A.hd,this.p[this.l]),a.A=this.o.I(a),
this.X(a)}else this.warn("#_onApiPlay() > No active viewing session.")};this.bf=function(a){this.z?(a=a.data,this.log("#_onApiStop(name="+a[i.i]+", offset="+a[i.B]+")"),this.l=a[i.i],this.p[this.l]=Math.floor(a[i.B]),a=new n(this.e,this.n,this.C,this.u,A.gd,this.p[this.l]),a.A=this.o.I(a),this.X(a),d().dispatchEvent(new o(o.CLOCK_TRACKING_DISABLE))):this.warn("#_onApiStop() > No active viewing session.")};this.Se=function(a){this.z?(a=a.data,this.log("#_onApiClick(name="+a[i.i]+", offset="+a[i.B]+
")")):this.warn("#_onApiClick() > No active viewing session.")};this.Ue=function(a){this.z?(a=a.data,this.log("#_onApiComplete(name="+a[i.i]+", offset="+a[i.B]+")")):this.warn("#_onApiComplete() > No active viewing session.")};this.$e=function(a){this.z?(a=a.data,this.log("#_onApiQoSInfo(bitrate="+a[i.i]+", fps="+a[i.Wb]+", dropped_frames="+a[i.Sb]+")"),this.u.pc(a[i.kb]),this.u.Nd(a[i.Wb]),this.u.Kd(a[i.Sb])):this.warn("#_onApiQoSInfo() > No active viewing session.")};this.Qe=function(a){if(this.z){a=
a.data;this.log("#_onApiBitrateChange(bitrate="+a[i.i]+")");this.u.pc(a[i.kb]);var b=new n(this.e,this.n,this.C,this.u,A.ee,this.p[this.l]);b.A=this.o.I(b);this.o.gb(b);this.da=function(a){a=this.Va.sc(b,a[i.W],!1);var c={};c[i.Fa]=a;d().dispatchEvent(new z(z.Ba,c))};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a))}else this.warn("#_onApiBitrateChange() > No active viewing session.")};this.Re=function(){if(this.z){this.log("#_onApiBufferStart()");var a=new n(this.e,this.n,this.C,this.u,A.fe,
this.p[this.l]);a.A=this.o.I(a);this.X(a)}else this.warn("#_onApiBufferStart() > No active viewing session.")};this.cf=function(a){if(this.z){var b=a.data;this.log("#_onApiTrackError(source="+b[i.ub]+", err_id="+b[i.Vb]+", offset="+b[i.B]+")");if(!(this.gc&&b[i.ub]!==H)){var c=new n(this.e,this.n,this.C,this.u,A.ge,Math.floor(b[i.B]));c.A=this.o.I(c);this.o.gb(c);this.da=function(a){a=this.Va.sc(c,a[i.W],!1);var m=a.G[0];m.ga.id(b[i.Vb]);m.ga.source(b[i.ub]);m={};m[i.Fa]=a;d().dispatchEvent(new z(z.Ba,
m))};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a))}}else this.warn("#_onApiTrackError() > No active viewing session.")};this.Ze=function(a){this.z?(this.Ab=Math.floor(a.data[i.tb]),this.log("#_onApiPodOffset(podOffset="+this.Ab+")")):this.warn("#_onApiPodOffset() > No active viewing session.")};this.af=function(){if(this.z){this.log("#_onApiSessionComplete()");var a=new n(this.e,this.n,this.C,this.u,A.ie,0);a.A=this.o.I(a);this.X(a);this.da=function(a){var b=new Date;a=this.Va.Fd(this.Ya||
new Date(0),b,a[i.W]);var c={};c[i.Fa]=a;d().dispatchEvent(new z(z.Ba,c));this.Ya=b};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a));a={};a[i.Ga]=!0;d().dispatchEvent(new o(o.CLOCK_TRACKING_DISABLE,a));this.z=!1}else this.warn("#_onApiSessionComplete() > No active viewing session.")};this.Ve=function(a){if(this.z){var b=a.data;this.log("#_onApiMonitor(name="+b[i.i]+", offset="+b[i.B]+")");this.l=b[i.i];this.p[this.l]=Math.floor(a.data[i.B])}else this.warn("#_onApiMonitor() > No active viewing session.")};
this.ef=function(a){if(this.z){this.log("#_onClockTrackingTick(interval="+a.data[i.W]+")");var b=new Date;a=this.Va.Fd(this.Ya||new Date(0),b,a.data[i.W]);var c={};c[i.Fa]=a;d().dispatchEvent(new z(z.Ba,c));this.Ya=b}else this.warn("#_onClockTrackingTick() > No active viewing session.")};this.gf=function(a){this.log("#_onNetworkCheckStatusComplete(track_ext_err="+a.data[i.fc]+")");a=a.data[i.fc];if(a!==j)this.gc=a};this.kc=function(a){a=a.data[i.qa];this.log("#_onDataRequest(what="+a+")");switch(a){case x.ya.ld:a=
{},a[i.Pa]=this.f.J,d().dispatchEvent(new x(x.mb,a))}};this.lc=function(a){this.log("#_onDataResponse()");this.Ld(a.data)};this.mf=function(){this.log("#_resetInternalState()");this.xb=this.z=!1;this.zb=j;this.gc=!1;this.p={};this.Ya=this.Ab=j;this.hc=new w;this.o=new l;this.Y=new e;this.n=new y;this.C=new k;this.u=new G;this.Wa=new v;this.e=new r;this.e.J(this.f.J);this.e.type(this.f.fb)};this.Oe=function(){this.Wa.Dc(""+(new Date).getTime()+Math.floor(Math.random()*1E9));this.log("#_generateSessioId() > New session id: "+
this.Wa.Dc)};this.X=function(a){this.log("#_placeItemOnTimeline(type="+a.Z+")");this.Y.sf(a);this.o.gb(a)};this.Ke=function(){if(this.xb)this.warn("#_closeMainVideo() > The main video content was already closed.");else{this.p[this.e.k()]==-1&&(this.p[this.e.k()]=this.e.duration());var a=new n(this.e,this.n,this.C,this.u,A.fd,this.p[this.e.k()]);a.A=this.o.I(a);this.X(a);this.xb=!0}};this.Je=function(){var a=new n(this.e,this.n,this.C,this.u,A.fd,this.p[this.l]);a.A=this.o.I(a);this.X(a);this.e.type(this.zb);
this.l=this.e.k();this.e.q(j)};d().addEventListener(u.Qb,this.ic,this);d().addEventListener(u.La,this.ua,this);d().addEventListener(u.Tc,this.Xe,this);d().addEventListener(u.Sc,this.We,this);d().addEventListener(u.Pc,this.Te,this);d().addEventListener(u.Uc,this.Ye,this);d().addEventListener(u.Xc,this.bf,this);d().addEventListener(u.Oc,this.Se,this);d().addEventListener(u.Qc,this.Ue,this);d().addEventListener(u.Vc,this.$e,this);d().addEventListener(u.Mc,this.Qe,this);d().addEventListener(u.Nc,this.Re,
this);d().addEventListener(u.Yc,this.cf,this);d().addEventListener(u.Rb,this.Ze,this);d().addEventListener(u.Wc,this.af,this);d().addEventListener(u.Rc,this.Ve,this);d().addEventListener(o.CLOCK_TRACKING_TICK,this.ef,this);d().addEventListener(D.rb,this.gf,this);d().addEventListener(x.oa,this.kc,this);d().addEventListener(x.mb,this.lc,this)}var m=c.P,f=c.O,d=c.ba,g=a.H.se,e=a.H.Be,n=a.H.qd,l=a.H.ke,v=a.a.we,p=a.a.ye,r=a.a.jb,t=a.a.ve,y=a.a.sd,k=a.a.nd,G=a.a.me,w=a.H.ce,o=a.event.Na,D=a.event.sb,x=
a.event.Tb,u=a.event.Ma,z=a.event.cd,i=a.event.aa,A=a.a.pb,s=a.a.Zc,H="player";m(b,c.Id);m(b,f);a.H.be=b})(d,e);(function(c){function a(a){this.M("[media-fork::HeartbeatMediaFork] > ");this.m=a;this.D=function(){var a=this.ta&&(this.m.analyticsVisitorID||this.m.marketingCloudVisitorID||this.m.visitorID);a||this.warn("Unable to track! Is configured: "+this.ta+" analyticsVisitorID: "+this.m.analyticsVisitorID+" marketingCloudVisitorID: "+this.m.marketingCloudVisitorID+" visitorID: "+this.m.visitorID);
return a};this.ta=!1;this.j=new n;this.bg=new l(new v);this.vd=new g;this.mc=j;this.f={trackingServer:j,uc:j,J:j,fb:j,ia:j,la:j,channel:j,debugTracking:!1,Ic:!1}}var b=d.P,m=d.ba,f=c.event.aa,e=c.event.Ma,g=c.L.ae,l=c.bb.le,n=c.H.be,q=c.a.jb,v=c.a.ne;b(a,d.O);a.prototype.Tf=function(a){if(a&&a.hasOwnProperty("debugLogging"))d.Oa=a.debugLogging;this.log("#setup(configData={trackingServer: "+a.trackingServer+", jobId: "+a.uc+", streamType: "+a.fb+", publisher: "+a.J+", ovp: "+a.ia+", sdk: "+a.la+", debugLogging: "+
a.fg+"})");this.f.debugTracking=this.m.debugTracking;this.f.Ic=this.m.trackLocal;this.f.channel=this.m.Media.channel;if(a){if(a.hasOwnProperty("trackingServer"))this.f.trackingServer=a.trackingServer;if(a.hasOwnProperty("jobId"))this.f.uc=a.jobId;if(a.hasOwnProperty("publisher"))this.f.J=a.publisher;if(a.hasOwnProperty("ovp"))this.f.ia=a.ovp;if(a.hasOwnProperty("sdk"))this.f.la=a.sdk;if(a.hasOwnProperty("streamType"))this.f.fb=a.streamType===q.pd||a.streamType===q.Ae||a.streamType===q.ze||a.streamType===
q.Ra?a.streamType:q.pd;if(this.m.Media.__primetime)this.f.ia="primetime";if(this.mc!=j)this.f.la=this.mc;this.log("#setup() > Applying configuration: {account: "+this.m.account+", scTrackingServer: "+this.m.trackingServer+", sbTrackingServer: "+this.f.trackingServer+", jobId: "+this.f.trackingServer+", publisher: "+this.f.J+", ovp: "+this.f.ia+", sdk: "+this.f.la+", channel: "+this.f.channel+", debugTracking: "+this.f.debugTracking+", trackLocal: "+this.f.Ic+"}");a={};a[f.Pb]=this.m.account;a[f.ac]=
this.m.trackingServer;a[f.vb]=this.f.trackingServer;a[f.lb]=this.f.trackingServer+"/settings/";a[f.qb]=this.f.uc;a[f.Pa]=this.f.J;a[f.Yb]=this.f.ia;a[f.bc]=this.f.la;a[f.$c]=this.f.channel;a[f.nb]=this.f.debugTracking;a[f.wb]=this.f.Ic;m().dispatchEvent(new e(e.Qb,a));this.ta=!0}};a.prototype.open=function(a,b,c){this.log("#open(name="+a+", length="+b+", playerName="+c+")");if(this.D()){var d={};d[f.Ha]=this.m.visitorID;d[f.Aa]=this.m.analyticsVisitorID;d[f.Da]=this.m.Kf;d[f.i]=a;d[f.Ca]=b;d[f.cc]=
this.f.fb;d[f.Ea]=c;m().dispatchEvent(new e(e.Tc,d))}};a.prototype.openAd=function(a,b,c,d,g,l,n){this.log("#openAd(name="+a+", length="+b+", playerName="+c+", parentName="+d+", parentPod="+g+", parentPodPosition="+l+", cpm="+n+", )");if(this.D()){var o={};o[f.i]=a;o[f.Ca]=b;o[f.Ea]=c;o[f.Zb]=d;o[f.md]=g;o[f.$b]=l;o[f.na]=n;m().dispatchEvent(new e(e.Sc,o))}};a.prototype.close=function(a){this.log("#close(name="+a+")");if(this.D()){var b={};b[f.i]=a;m().dispatchEvent(new e(e.Pc,b))}};a.prototype.play=
function(a,b,c,d,g){this.log("#play(name="+a+", offset="+b+", segmentNum="+c+", segment="+d+", segmentLength="+g+")");if(this.D())c={},c[f.Ha]=this.m.visitorID,c[f.Aa]=this.m.analyticsVisitorID,c[f.Da]=this.m.Kf,c[f.i]=a,c[f.B]=b,m().dispatchEvent(new e(e.Uc,c))};a.prototype.monitor=function(a,b){this.log("#monitor(name="+a+", offset="+b+")");var c={};c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Rc,c))};a.prototype.stop=function(a,b){this.log("#stop(name="+a+", offset="+b+")");if(this.D()){var c={};
c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Xc,c))}};a.prototype.click=function(a,b){this.log("#click(name="+a+", offset="+b+")");if(this.D()){var c={};c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Oc,c))}};a.prototype.complete=function(a,b){this.log("#complete(name="+a+", offset="+b+")");if(this.D()){var c={};c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Qc,c))}};a.prototype.Jd=function(){Logger.eg(this,"#destroy()");m().dispatchEvent(new e(e.La))};a.prototype.Xf=function(a,b,c){this.log("#trackError(source="+
a+", errorId="+b+", offset="+c+")");if(this.D()){var d={};d[f.ub]=a;d[f.Vb]=b;d[f.B]=c;m().dispatchEvent(new e(e.Yc,d))}};a.prototype.Zf=function(a,b,c){this.log("#updateQoSInfo(bitrate="+a+", fps="+b+", droppedFrames="+c+")");if(this.D()){var d={};d[f.kb]=a;d[f.Wb]=b;d[f.Sb]=c;m().dispatchEvent(new e(e.Vc,d))}};a.prototype.vf=function(a){this.log("#updateQoSInfo(bitrate="+a+")");if(this.D()){var b={};b[f.kb]=a;m().dispatchEvent(new e(e.Mc,b))}};a.prototype.wf=function(){this.log("#bufferStart()");
this.D()&&m().dispatchEvent(new e(e.Nc))};a.prototype.rf=function(a){this.log("#adBreakStart(offset="+a+")");if(this.D()){var b={};b[f.tb]=a;m().dispatchEvent(new e(e.Rb,b))}};a.prototype.qf=function(){this.log("#adBreakEnd()");if(this.D()){var a={};a[f.tb]=j;m().dispatchEvent(new e(e.Rb,a))}};a.prototype.Rf=function(){this.log("#sessionComplete()");this.D()&&m().dispatchEvent(new e(e.Wc))};a.prototype.Ie=function(a){this.log("#__setPsdkVersion(version="+a+")");this.mc=a};c.je=a})(e);m.Ka||(m.Ka=
{});m.Ka.Af||(m.Ka.Af=d);m.Ka.Lf=e})(this);this.He(m)}(m.s);D.callMethodWhenReady=function(m,g){s.visitor!=j&&(s.isReadyToTrack()?D[m].apply(this,g):s.callbackWhenReadyToTrack(D,D[m],g))};m.Heartbeat=D;m.tf=function(){var e,g;if(m.autoTrack&&(e=m.s.d.getElementsByTagName("VIDEO")))for(g=0;g<e.length;g++)m.attach(e[g])};m.ra(w,"load",m.tf)}


// AppMeasurement_Module_Integrate.js - Integrate Module, included in AppMeasurement zip
function AppMeasurement_Module_Integrate(s){var m=this;m.s=s;var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;m._il=w.s_c_il;m._in=w.s_c_in;m._il[m._in]=m;w.s_c_in++;m._c="s_m";m.list=[];m.add=function(c,b){var a;b||(b="s_Integrate_"+c);w[b]||(w[b]={});a=m[c]=w[b];a.a=c;a.e=m;a._c=0;a._d=0;a.disable==void 0&&(a.disable=0);a.get=function(b,c){var d=document,f=d.getElementsByTagName("HEAD"),g;if(!a.disable&&(c||(v="s_"+m._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+m._in+
"]."+a.a+".callback",a.delay(),f=f&&f.length>0?f[0]:d.body))try{g=d.createElement("SCRIPT");g.type="text/javascript";g.setAttribute("async","async");g.src=m.c(a,b);if(b.indexOf("[CALLBACK]")<0)g.onload=g.onreadystatechange=function(){a.callback(w[v])};f.firstChild?f.insertBefore(g,f.firstChild):f.appendChild(g)}catch(s){}};a.callback=function(b){var m;if(b)for(m in b)Object.prototype[m]||(a[m]=b[m]);a.ready()};a.beacon=function(b){var c="s_i_"+m._in+"_Integrate_"+a.a+"_"+a._c;if(!a.disable)a._c++,
c=w[c]=new Image,c.src=m.c(a,b)};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||s.delayReady()};m.list.push(c)};m._g=function(c){var b,a=(c?"use":"set")+"Vars";for(c=0;c<m.list.length;c++)if((b=m[m.list[c]])&&!b.disable&&b[a])try{b[a](s,b)}catch(w){}};m._t=function(){m._g(1)};m._d=function(){var c,b;for(c=0;c<m.list.length;c++)if((b=m[m.list[c]])&&!b.disable&&b._d>0)return 1;return 0};m.c=function(m,b){var a,w,e,d;b.toLowerCase().substring(0,4)!="http"&&
(b="http://"+b);s.ssl&&(b=s.replace(b,"http:","https:"));m.RAND=Math.floor(Math.random()*1E13);for(a=0;a>=0;)a=b.indexOf("[",a),a>=0&&(w=b.indexOf("]",a),w>a&&(e=b.substring(a+1,w),e.length>2&&e.substring(0,2)=="s."?(d=s[e.substring(2)])||(d=""):(d=""+m[e],d!=m[e]&&parseFloat(d)!=m[e]&&(e=0)),e&&(b=b.substring(0,a)+encodeURIComponent(d)+b.substring(w+1)),a=w));return b}}


/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

 AppMeasurement for JavaScript version: 1.2.3
 Copyright 1996-2013 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
function AppMeasurement(){var s=this;s.version="1.2.3";var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;s._c="s_c";var k=w.hb;k||(k=null);var m=w,i,n;try{i=m.parent;for(n=m.location;i&&i.location&&n&&""+i.location!=""+n&&m.location&&""+i.location!=""+m.location&&i.location.host==n.host;)m=i,i=m.parent}catch(p){}s.Sa=function(s){try{console.log(s)}catch(a){}};s.ka=function(s){return""+parseInt(s)==""+s};s.replace=function(s,a,c){if(!s||s.indexOf(a)<
0)return s;return s.split(a).join(c)};s.escape=function(b){var a,c;if(!b)return b;b=encodeURIComponent(b);for(a=0;a<7;a++)c="+~!*()'".substring(a,a+1),b.indexOf(c)>=0&&(b=s.replace(b,c,"%"+c.charCodeAt(0).toString(16).toUpperCase()));return b};s.unescape=function(b){if(!b)return b;b=b.indexOf("+")>=0?s.replace(b,"+"," "):b;try{return decodeURIComponent(b)}catch(a){}return unescape(b)};s.Ja=function(){var b=w.location.hostname,a=s.fpCookieDomainPeriods,c;if(!a)a=s.cookieDomainPeriods;if(b&&!s.da&&
!/^[0-9.]+$/.test(b)&&(a=a?parseInt(a):2,a=a>2?a:2,c=b.lastIndexOf("."),c>=0)){for(;c>=0&&a>1;)c=b.lastIndexOf(".",c-1),a--;s.da=c>0?b.substring(c):b}return s.da};s.c_r=s.cookieRead=function(b){b=s.escape(b);var a=" "+s.d.cookie,c=a.indexOf(" "+b+"="),e=c<0?c:a.indexOf(";",c);b=c<0?"":s.unescape(a.substring(c+2+b.length,e<0?a.length:e));return b!="[[B]]"?b:""};s.c_w=s.cookieWrite=function(b,a,c){var e=s.Ja(),d=s.cookieLifetime,f;a=""+a;d=d?(""+d).toUpperCase():"";c&&d!="SESSION"&&d!="NONE"&&((f=a!=
""?parseInt(d?d:0):-60)?(c=new Date,c.setTime(c.getTime()+f*1E3)):c==1&&(c=new Date,f=c.getYear(),c.setYear(f+5+(f<1900?1900:0))));if(b&&d!="NONE")return s.d.cookie=b+"="+s.escape(a!=""?a:"[[B]]")+"; path=/;"+(c&&d!="SESSION"?" expires="+c.toGMTString()+";":"")+(e?" domain="+e+";":""),s.cookieRead(b)==a;return 0};s.D=[];s.C=function(b,a,c){if(s.ea)return 0;if(!s.maxDelay)s.maxDelay=250;var e=0,d=(new Date).getTime()+s.maxDelay,f=s.d.fb,g=["webkitvisibilitychange","visibilitychange"];if(!f)f=s.d.gb;
if(f&&f=="prerender"){if(!s.N){s.N=1;for(c=0;c<g.length;c++)s.d.addEventListener(g[c],function(){var b=s.d.fb;if(!b)b=s.d.gb;if(b=="visible")s.N=0,s.delayReady()})}e=1;d=0}else c||s.q("_d")&&(e=1);e&&(s.D.push({m:b,a:a,t:d}),s.N||setTimeout(s.delayReady,s.maxDelay));return e};s.delayReady=function(){var b=(new Date).getTime(),a=0,c;for(s.q("_d")&&(a=1);s.D.length>0;){c=s.D.shift();if(a&&!c.t&&c.t>b){s.D.unshift(c);setTimeout(s.delayReady,parseInt(s.maxDelay/2));break}s.ea=1;s[c.m].apply(s,c.a);s.ea=
0}};s.setAccount=s.sa=function(b){var a,c;if(!s.C("setAccount",arguments))if(s.account=b,s.allAccounts){a=s.allAccounts.concat(b.split(","));s.allAccounts=[];a.sort();for(c=0;c<a.length;c++)(c==0||a[c-1]!=a[c])&&s.allAccounts.push(a[c])}else s.allAccounts=b.split(",")};s.foreachVar=function(b,a){var c,e,d,f,g="";d=e="";if(s.lightProfileID)c=s.H,(g=s.lightTrackVars)&&(g=","+g+","+s.Q.join(",")+",");else{c=s.c;if(s.pe||s.linkType)if(g=s.linkTrackVars,e=s.linkTrackEvents,s.pe&&(d=s.pe.substring(0,1).toUpperCase()+
s.pe.substring(1),s[d]))g=s[d].eb,e=s[d].cb;g&&(g=","+g+","+s.z.join(",")+",");e&&g&&(g+=",events,")}a&&(a=","+a+",");for(e=0;e<c.length;e++)d=c[e],(f=s[d])&&(!g||g.indexOf(","+d+",")>=0)&&(!a||a.indexOf(","+d+",")>=0)&&b(d,f)};s.X=function(b,a,c,e,d){var f="",g,j,w,q,i=0;b=="contextData"&&(b="c");if(a){for(g in a)if(!Object.prototype[g]&&(!d||g.substring(0,d.length)==d)&&a[g]&&(!c||c.indexOf(","+(e?e+".":"")+g+",")>=0)){w=!1;if(i)for(j=0;j<i.length;j++)g.substring(0,i[j].length)==i[j]&&(w=!0);if(!w&&
(f==""&&(f+="&"+b+"."),j=a[g],d&&(g=g.substring(d.length)),g.length>0))if(w=g.indexOf("."),w>0)j=g.substring(0,w),w=(d?d:"")+j+".",i||(i=[]),i.push(w),f+=s.X(j,a,c,e,w);else if(typeof j=="boolean"&&(j=j?"true":"false"),j){if(e=="retrieveLightData"&&d.indexOf(".contextData.")<0)switch(w=g.substring(0,4),q=g.substring(4),g){case "transactionID":g="xact";break;case "channel":g="ch";break;case "campaign":g="v0";break;default:s.ka(q)&&(w=="prop"?g="c"+q:w=="eVar"?g="v"+q:w=="list"?g="l"+q:w=="hier"&&(g=
"h"+q,j=j.substring(0,255)))}f+="&"+s.escape(g)+"="+s.escape(j)}}f!=""&&(f+="&."+b)}return f};s.La=function(){var b="",a,c,e,d,f,g,j,w,i="",k="",m=c="";if(s.lightProfileID)a=s.H,(i=s.lightTrackVars)&&(i=","+i+","+s.Q.join(",")+",");else{a=s.c;if(s.pe||s.linkType)if(i=s.linkTrackVars,k=s.linkTrackEvents,s.pe&&(c=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1),s[c]))i=s[c].eb,k=s[c].cb;i&&(i=","+i+","+s.z.join(",")+",");k&&(k=","+k+",",i&&(i+=",events,"));s.events2&&(m+=(m!=""?",":"")+s.events2)}for(c=
0;c<a.length;c++){d=a[c];f=s[d];e=d.substring(0,4);g=d.substring(4);!f&&d=="events"&&m&&(f=m,m="");if(f&&(!i||i.indexOf(","+d+",")>=0)){switch(d){case "timestamp":d="ts";break;case "dynamicVariablePrefix":d="D";break;case "visitorID":d="vid";break;case "marketingCloudVisitorID":d="mid";break;case "analyticsVisitorID":d="aid";break;case "audienceManagerVisitorID":d="aamid";break;case "audienceManagerLocationHint":d="aamlh";break;case "pageURL":d="g";if(f.length>255)s.pageURLRest=f.substring(255),f=
f.substring(0,255);break;case "pageURLRest":d="-g";break;case "referrer":d="r";break;case "vmk":case "visitorMigrationKey":d="vmt";break;case "visitorMigrationServer":d="vmf";s.ssl&&s.visitorMigrationServerSecure&&(f="");break;case "visitorMigrationServerSecure":d="vmf";!s.ssl&&s.visitorMigrationServer&&(f="");break;case "charSet":d="ce";break;case "visitorNamespace":d="ns";break;case "cookieDomainPeriods":d="cdp";break;case "cookieLifetime":d="cl";break;case "variableProvider":d="vvp";break;case "currencyCode":d=
"cc";break;case "channel":d="ch";break;case "transactionID":d="xact";break;case "campaign":d="v0";break;case "resolution":d="s";break;case "colorDepth":d="c";break;case "javascriptVersion":d="j";break;case "javaEnabled":d="v";break;case "cookiesEnabled":d="k";break;case "browserWidth":d="bw";break;case "browserHeight":d="bh";break;case "connectionType":d="ct";break;case "homepage":d="hp";break;case "plugins":d="p";break;case "events":m&&(f+=(f!=""?",":"")+m);if(k){g=f.split(",");f="";for(e=0;e<g.length;e++)j=
g[e],w=j.indexOf("="),w>=0&&(j=j.substring(0,w)),w=j.indexOf(":"),w>=0&&(j=j.substring(0,w)),k.indexOf(","+j+",")>=0&&(f+=(f?",":"")+g[e])}break;case "events2":f="";break;case "contextData":b+=s.X("c",s[d],i,d);f="";break;case "lightProfileID":d="mtp";break;case "lightStoreForSeconds":d="mtss";s.lightProfileID||(f="");break;case "lightIncrementBy":d="mti";s.lightProfileID||(f="");break;case "retrieveLightProfiles":d="mtsr";break;case "deleteLightProfiles":d="mtsd";break;case "retrieveLightData":s.retrieveLightProfiles&&
(b+=s.X("mts",s[d],i,d));f="";break;default:s.ka(g)&&(e=="prop"?d="c"+g:e=="eVar"?d="v"+g:e=="list"?d="l"+g:e=="hier"&&(d="h"+g,f=f.substring(0,255)))}f&&(b+="&"+d+"="+(d.substring(0,3)!="pev"?s.escape(f):f))}d=="pev3"&&s.g&&(b+=s.g)}return b};s.u=function(s){var a=s.tagName;if(""+s.pb!="undefined"||""+s.Xa!="undefined"&&(""+s.Xa).toUpperCase()!="HTML")return"";a=a&&a.toUpperCase?a.toUpperCase():"";a=="SHAPE"&&(a="");a&&((a=="INPUT"||a=="BUTTON")&&s.type&&s.type.toUpperCase?a=s.type.toUpperCase():
!a&&s.href&&(a="A"));return a};s.ga=function(s){var a=s.href?s.href:"",c,e,d;c=a.indexOf(":");e=a.indexOf("?");d=a.indexOf("/");if(a&&(c<0||e>=0&&c>e||d>=0&&c>d))e=s.protocol&&s.protocol.length>1?s.protocol:l.protocol?l.protocol:"",c=l.pathname.lastIndexOf("/"),a=(e?e+"//":"")+(s.host?s.host:l.host?l.host:"")+(h.substring(0,1)!="/"?l.pathname.substring(0,c<0?0:c)+"/":"")+a;return a};s.F=function(b){var a=s.u(b),c,e,d="",f=0;if(a){c=b.protocol;e=b.onclick;if(b.href&&(a=="A"||a=="AREA")&&(!e||!c||c.toLowerCase().indexOf("javascript")<
0))d=s.ga(b);else if(e)d=s.replace(s.replace(s.replace(s.replace(""+e,"\r",""),"\n",""),"\t","")," ",""),f=2;else if(a=="INPUT"||a=="SUBMIT"){if(b.value)d=b.value;else if(b.innerText)d=b.innerText;else if(b.textContent)d=b.textContent;f=3}else if(b.src&&a=="IMAGE")d=b.src;if(d)return{id:d.substring(0,100),type:f}}return 0};s.mb=function(b){for(var a=s.u(b),c=s.F(b);b&&!c&&a!="BODY";)if(b=b.parentElement?b.parentElement:b.parentNode)a=s.u(b),c=s.F(b);if(!c||a=="BODY")b=0;if(b&&(a=b.onclick?""+b.onclick:
"",a.indexOf(".tl(")>=0||a.indexOf(".trackLink(")>=0))b=0;return b};s.Va=function(){var b,a,c=s.linkObject,e=s.linkType,d=s.linkURL,f,g;s.R=1;if(!c)s.R=0,c=s.j;if(c){b=s.u(c);for(a=s.F(c);c&&!a&&b!="BODY";)if(c=c.parentElement?c.parentElement:c.parentNode)b=s.u(c),a=s.F(c);if(!a||b=="BODY")c=0;if(c){var j=c.onclick?""+c.onclick:"";if(j.indexOf(".tl(")>=0||j.indexOf(".trackLink(")>=0)c=0}}else s.R=1;!d&&c&&(d=s.ga(c));d&&!s.linkLeaveQueryString&&(f=d.indexOf("?"),f>=0&&(d=d.substring(0,f)));if(!e&&
d){var i=0,k=0,m;if(s.trackDownloadLinks&&s.linkDownloadFileTypes){j=d.toLowerCase();f=j.indexOf("?");g=j.indexOf("#");f>=0?g>=0&&g<f&&(f=g):f=g;f>=0&&(j=j.substring(0,f));f=s.linkDownloadFileTypes.toLowerCase().split(",");for(g=0;g<f.length;g++)(m=f[g])&&j.substring(j.length-(m.length+1))=="."+m&&(e="d")}if(s.trackExternalLinks&&!e&&(j=d.toLowerCase(),s.ja(j))){if(!s.linkInternalFilters)s.linkInternalFilters=w.location.hostname;f=0;s.linkExternalFilters?(f=s.linkExternalFilters.toLowerCase().split(","),
i=1):s.linkInternalFilters&&(f=s.linkInternalFilters.toLowerCase().split(","));if(f){for(g=0;g<f.length;g++)m=f[g],j.indexOf(m)>=0&&(k=1);k?i&&(e="e"):i||(e="e")}}}s.linkObject=c;s.linkURL=d;s.linkType=e;if(s.trackClickMap||s.trackInlineStats)if(s.g="",c){e=s.pageName;d=1;c=c.sourceIndex;if(!e)e=s.pageURL,d=0;if(w.s_objectID)a.id=w.s_objectID,c=a.type=1;if(e&&a&&a.id&&b)s.g="&pid="+s.escape(e.substring(0,255))+(d?"&pidt="+d:"")+"&oid="+s.escape(a.id.substring(0,100))+(a.type?"&oidt="+a.type:"")+"&ot="+
b+(c?"&oi="+c:"")}};s.Ma=function(){var b=s.R,a=s.linkType,c=s.linkURL,e=s.linkName;if(a&&(c||e))a=a.toLowerCase(),a!="d"&&a!="e"&&(a="o"),s.pe="lnk_"+a,s.pev1=c?s.escape(c):"",s.pev2=e?s.escape(e):"",b=1;s.abort&&(b=0);if(s.trackClickMap||s.trackInlineStats){a={};c=0;var d=s.cookieRead("s_sq"),f=d?d.split("&"):0,g,j,w;d=0;if(f)for(g=0;g<f.length;g++)j=f[g].split("="),e=s.unescape(j[0]).split(","),j=s.unescape(j[1]),a[j]=e;e=s.account.split(",");if(b||s.g){b&&!s.g&&(d=1);for(j in a)if(!Object.prototype[j])for(g=
0;g<e.length;g++){d&&(w=a[j].join(","),w==s.account&&(s.g+=(j.charAt(0)!="&"?"&":"")+j,a[j]=[],c=1));for(f=0;f<a[j].length;f++)w=a[j][f],w==e[g]&&(d&&(s.g+="&u="+s.escape(w)+(j.charAt(0)!="&"?"&":"")+j+"&u=0"),a[j].splice(f,1),c=1)}b||(c=1);if(c){d="";g=2;!b&&s.g&&(d=s.escape(e.join(","))+"="+s.escape(s.g),g=1);for(j in a)!Object.prototype[j]&&g>0&&a[j].length>0&&(d+=(d?"&":"")+s.escape(a[j].join(","))+"="+s.escape(j),g--);s.cookieWrite("s_sq",d)}}}return b};s.Na=function(){if(!s.bb){var b=new Date,
a=m.location,c,e,d,f=d=e=c="",g="",w="",i="1.2",k=s.cookieWrite("s_cc","true",0)?"Y":"N",n="",p="",o=0;if(b.setUTCDate&&(i="1.3",o.toPrecision&&(i="1.5",c=[],c.forEach))){i="1.6";d=0;e={};try{d=new Iterator(e),d.next&&(i="1.7",c.reduce&&(i="1.8",i.trim&&(i="1.8.1",Date.parse&&(i="1.8.2",Object.create&&(i="1.8.5")))))}catch(r){}}c=screen.width+"x"+screen.height;d=navigator.javaEnabled()?"Y":"N";e=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=s.w.innerWidth?s.w.innerWidth:s.d.documentElement.offsetWidth;
w=s.w.innerHeight?s.w.innerHeight:s.d.documentElement.offsetHeight;b=navigator.plugins;try{s.b.addBehavior("#default#homePage"),n=s.b.nb(a)?"Y":"N"}catch(t){}try{s.b.addBehavior("#default#clientCaps"),p=s.b.connectionType}catch(u){}if(b)for(;o<b.length&&o<30;){if(a=b[o].name)a=a.substring(0,100)+";",f.indexOf(a)<0&&(f+=a);o++}s.resolution=c;s.colorDepth=e;s.javascriptVersion=i;s.javaEnabled=d;s.cookiesEnabled=k;s.browserWidth=g;s.browserHeight=w;s.connectionType=p;s.homepage=n;s.plugins=f;s.bb=1}};
s.I={};s.loadModule=function(b,a){var c=s.I[b];if(!c){c=w["AppMeasurement_Module_"+b]?new w["AppMeasurement_Module_"+b](s):{};s.I[b]=s[b]=c;c.ua=function(){return c.wa};c.xa=function(a){if(c.wa=a)s[b+"_onLoad"]=a,s.C(b+"_onLoad",[s,c],1)||a(s,c)};try{Object.defineProperty?Object.defineProperty(c,"onLoad",{get:c.ua,set:c.xa}):c._olc=1}catch(e){c._olc=1}}a&&(s[b+"_onLoad"]=a,s.C(b+"_onLoad",[s,c],1)||a(s,c))};s.q=function(b){var a,c;for(a in s.I)if(!Object.prototype[a]&&(c=s.I[a])){if(c._olc&&c.onLoad)c._olc=
0,c.onLoad(s,c);if(c[b]&&c[b]())return 1}return 0};s.Qa=function(){var b=Math.floor(Math.random()*1E13),a=s.visitorSampling,c=s.visitorSamplingGroup;c="s_vsn_"+(s.visitorNamespace?s.visitorNamespace:s.account)+(c?"_"+c:"");var e=s.cookieRead(c);if(a){e&&(e=parseInt(e));if(!e){if(!s.cookieWrite(c,b))return 0;e=b}if(e%1E4>v)return 0}return 1};s.J=function(b,a){var c,e,d,f,g,w;for(c=0;c<2;c++){e=c>0?s.aa:s.c;for(d=0;d<e.length;d++)if(f=e[d],(g=b[f])||b["!"+f]){if(!a&&(f=="contextData"||f=="retrieveLightData")&&
s[f])for(w in s[f])g[w]||(g[w]=s[f][w]);s[f]=g}}};s.qa=function(b,a){var c,e,d,f;for(c=0;c<2;c++){e=c>0?s.aa:s.c;for(d=0;d<e.length;d++)f=e[d],b[f]=s[f],!a&&!b[f]&&(b["!"+f]=1)}};s.Ia=function(s){var a,c,e,d,f,g=0,w,i="",k="";if(s&&s.length>255&&(a=""+s,c=a.indexOf("?"),c>0&&(w=a.substring(c+1),a=a.substring(0,c),d=a.toLowerCase(),e=0,d.substring(0,7)=="http://"?e+=7:d.substring(0,8)=="https://"&&(e+=8),c=d.indexOf("/",e),c>0&&(d=d.substring(e,c),f=a.substring(c),a=a.substring(0,c),d.indexOf("google")>=
0?g=",q,ie,start,search_key,word,kw,cd,":d.indexOf("yahoo.co")>=0&&(g=",p,ei,"),g&&w)))){if((s=w.split("&"))&&s.length>1){for(e=0;e<s.length;e++)d=s[e],c=d.indexOf("="),c>0&&g.indexOf(","+d.substring(0,c)+",")>=0?i+=(i?"&":"")+d:k+=(k?"&":"")+d;i&&k?w=i+"&"+k:k=""}c=253-(w.length-k.length)-a.length;s=a+(c>0?f.substring(0,c):"")+"?"+w}return s};s.za=!1;s.$=!1;s.kb=function(b){s.marketingCloudVisitorID=b;s.$=!0;s.A()};s.K=!1;s.Y=!1;s.ta=function(b){s.analyticsVisitorID=b;s.Y=!0;s.A()};s.ya=!1;s.Z=!1;
s.jb=function(b){s.audienceManagerVisitorID=b;if(s.audienceManagerVisitorID&&s.visitor.getAudienceManagerLocationHint)s.audienceManagerLocationHint=s.visitor.getAudienceManagerLocationHint();s.Z=!0;s.A()};s.isReadyToTrack=function(){var b=!0,a=s.visitor;if(a&&a.isAllowed()){if(!s.K&&!s.analyticsVisitorID&&a.getAnalyticsVisitorID&&(s.analyticsVisitorID=a.getAnalyticsVisitorID([s,s.ta]),!s.analyticsVisitorID))s.K=!0;if(s.za&&!s.$&&!s.marketingCloudVisitorID||s.K&&!s.Y&&!s.analyticsVisitorID||s.ya&&
!s.Z&&!s.audienceManagerVisitorID)b=!1}return b};s.k=k;s.l=0;s.callbackWhenReadyToTrack=function(b,a,c){var e;e={};e.Da=b;e.Ca=a;e.Aa=c;if(s.k==k)s.k=[];s.k.push(e);if(s.l==0)s.l=setInterval(s.A,100)};s.A=function(){var b;if(s.isReadyToTrack()){if(s.l)clearInterval(s.l),s.l=0;if(s.k!=k)for(;s.k.length>0;)b=s.k.shift(),b.Ca.apply(b.Da,b.Aa)}};s.va=function(b){var a,c,e=k,d=k;if(!s.isReadyToTrack()){a=[];if(b!=k)for(c in e={},b)e[c]=b[c];d={};s.qa(d,!0);a.push(e);a.push(d);s.callbackWhenReadyToTrack(s,
s.track,a);return!0}return!1};s.Ka=function(){var b=s.cookieRead("s_fid"),a="",c="",e;e=8;var d=4;if(!b||b.indexOf("-")<0){for(b=0;b<16;b++)e=Math.floor(Math.random()*e),a+="0123456789ABCDEF".substring(e,e+1),e=Math.floor(Math.random()*d),c+="0123456789ABCDEF".substring(e,e+1),e=d=16;b=a+"-"+c}s.cookieWrite("s_fid",b,1)||(b=0);return b};s.t=s.track=function(b,a){var c,e=new Date,d="s"+Math.floor(e.getTime()/108E5)%10+Math.floor(Math.random()*1E13),f=e.getYear();f="t="+s.escape(e.getDate()+"/"+e.getMonth()+
"/"+(f<1900?f+1900:f)+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+" "+e.getDay()+" "+e.getTimezoneOffset());s.q("_s");if(!s.C("track",arguments)){if(!s.va(b)){a&&s.J(a);b&&(c={},s.qa(c,0),s.J(b));if(s.Qa()){if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.Ka();s.Va();s.usePlugins&&s.doPlugins&&s.doPlugins(s);if(s.account){if(!s.abort){if(s.trackOffline&&!s.timestamp)s.timestamp=Math.floor(e.getTime()/1E3);e=w.location;if(!s.pageURL)s.pageURL=e.href?e.href:e;if(!s.referrer&&
!s.ra)s.referrer=m.document.referrer,s.ra=1;s.referrer=s.Ia(s.referrer);s.q("_g")}s.Ma()&&!s.abort&&(s.Na(),f+=s.La(),s.Ua(d,f));s.abort||s.q("_t")}}b&&s.J(c,1)}s.timestamp=s.linkObject=s.j=s.linkURL=s.linkName=s.linkType=w.ob=s.pe=s.pev1=s.pev2=s.pev3=s.g=0}};s.tl=s.trackLink=function(b,a,c,e,d){s.linkObject=b;s.linkType=a;s.linkName=c;if(d)s.i=b,s.p=d;return s.track(e)};s.trackLight=function(b,a,c,e){s.lightProfileID=b;s.lightStoreForSeconds=a;s.lightIncrementBy=c;return s.track(e)};s.clearVars=
function(){var b,a;for(b=0;b<s.c.length;b++)if(a=s.c[b],a.substring(0,4)=="prop"||a.substring(0,4)=="eVar"||a.substring(0,4)=="hier"||a.substring(0,4)=="list"||a=="channel"||a=="events"||a=="eventList"||a=="products"||a=="productList"||a=="purchaseID"||a=="transactionID"||a=="state"||a=="zip"||a=="campaign")s[a]=void 0};s.Ua=function(b,a){var c,e=s.trackingServer;c="";var d=s.dc,f="sc.",g=s.visitorNamespace;if(e){if(s.trackingServerSecure&&s.ssl)e=s.trackingServerSecure}else{if(!g)g=s.account,e=g.indexOf(","),
e>=0&&(g=g.ib(0,e)),g=g.replace(/[^A-Za-z0-9]/g,"");c||(c="2o7.net");d=d?(""+d).toLowerCase():"d1";c=="2o7.net"&&(d=="d1"?d="112":d=="d2"&&(d="122"),f="");e=g+"."+d+"."+f+c}c=s.ssl?"https://":"http://";c+=e+"/b/ss/"+s.account+"/"+(s.mobile?"5.":"")+"1/JS-"+s.version+(s.ab?"T":"")+"/"+b+"?AQB=1&ndh=1&"+a+"&AQE=1";s.Pa&&(c=c.substring(0,2047));s.Ga(c);s.O()};s.Ga=function(b){s.e||s.Oa();s.e.push(b);s.P=s.r();s.pa()};s.Oa=function(){s.e=s.Ra();if(!s.e)s.e=[]};s.Ra=function(){var b,a;if(s.U()){try{(a=
w.localStorage.getItem(s.S()))&&(b=w.JSON.parse(a))}catch(c){}return b}};s.U=function(){var b=!0;if(!s.trackOffline||!s.offlineFilename||!w.localStorage||!w.JSON)b=!1;return b};s.ha=function(){var b=0;if(s.e)b=s.e.length;s.v&&b++;return b};s.O=function(){if(!s.v)if(s.ia=k,s.T)s.P>s.G&&s.na(s.e),s.W(500);else{var b=s.Ba();if(b>0)s.W(b);else if(b=s.fa())s.v=1,s.Ta(b),s.Ya(b)}};s.W=function(b){if(!s.ia)b||(b=0),s.ia=setTimeout(s.O,b)};s.Ba=function(){var b;if(!s.trackOffline||s.offlineThrottleDelay<=
0)return 0;b=s.r()-s.ma;if(s.offlineThrottleDelay<b)return 0;return s.offlineThrottleDelay-b};s.fa=function(){if(s.e.length>0)return s.e.shift()};s.Ta=function(b){if(s.debugTracking){var a="AppMeasurement Debug: "+b;b=b.split("&");var c;for(c=0;c<b.length;c++)a+="\n\t"+s.unescape(b[c]);s.Sa(a)}};s.Ya=function(b){var a;if(!a)a=new Image,a.alt="";a.ca=function(){try{if(s.V)clearTimeout(s.V),s.V=0;if(a.timeout)clearTimeout(a.timeout),a.timeout=0}catch(b){}};a.onload=a.$a=function(){a.ca();s.Fa();s.L();
s.v=0;s.O()};a.onabort=a.onerror=a.Ha=function(){a.ca();(s.trackOffline||s.T)&&s.v&&s.e.unshift(s.Ea);s.v=0;s.P>s.G&&s.na(s.e);s.L();s.W(500)};a.onreadystatechange=function(){a.readyState==4&&(a.status==200?a.$a():a.Ha())};s.ma=s.r();a.src=b;if(a.abort)s.V=setTimeout(a.abort,5E3);s.Ea=b;s.lb=w["s_i_"+s.replace(s.account,",","_")]=a;if(s.useForcedLinkTracking&&s.B||s.p){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;s.M=setTimeout(s.L,s.forcedLinkTrackingTimeout)}};s.Fa=function(){if(s.U()&&
!(s.la>s.G))try{w.localStorage.removeItem(s.S()),s.la=s.r()}catch(b){}};s.na=function(b){if(s.U()){s.pa();try{w.localStorage.setItem(s.S(),w.JSON.stringify(b)),s.G=s.r()}catch(a){}}};s.pa=function(){if(s.trackOffline){if(!s.offlineLimit||s.offlineLimit<=0)s.offlineLimit=10;for(;s.e.length>s.offlineLimit;)s.fa()}};s.forceOffline=function(){s.T=!0};s.forceOnline=function(){s.T=!1};s.S=function(){return s.offlineFilename+"-"+s.visitorNamespace+s.account};s.r=function(){return(new Date).getTime()};s.ja=
function(s){s=s.toLowerCase();if(s.indexOf("#")!=0&&s.indexOf("about:")!=0&&s.indexOf("opera:")!=0&&s.indexOf("javascript:")!=0)return!0;return!1};s.setTagContainer=function(b){var a,c,e;s.ab=b;for(a=0;a<s._il.length;a++)if((c=s._il[a])&&c._c=="s_l"&&c.tagContainerName==b){s.J(c);if(c.lmq)for(a=0;a<c.lmq.length;a++)e=c.lmq[a],s.loadModule(e.n);if(c.ml)for(e in c.ml)if(s[e])for(a in b=s[e],e=c.ml[e],e)if(!Object.prototype[a]&&(typeof e[a]!="function"||(""+e[a]).indexOf("s_c_il")<0))b[a]=e[a];if(c.mmq)for(a=
0;a<c.mmq.length;a++)e=c.mmq[a],s[e.m]&&(b=s[e.m],b[e.f]&&typeof b[e.f]=="function"&&(e.a?b[e.f].apply(b,e.a):b[e.f].apply(b)));if(c.tq)for(a=0;a<c.tq.length;a++)s.track(c.tq[a]);c.s=s;break}};s.Util={urlEncode:s.escape,urlDecode:s.unescape,cookieRead:s.cookieRead,cookieWrite:s.cookieWrite,getQueryParam:function(b,a,c){var e;a||(a=s.pageURL?s.pageURL:w.location);c||(c="&");if(b&&a&&(a=""+a,e=a.indexOf("?"),e>=0&&(a=c+a.substring(e+1)+c,e=a.indexOf(c+b+"="),e>=0&&(a=a.substring(e+c.length+b.length+
1),e=a.indexOf(c),e>=0&&(a=a.substring(0,e)),a.length>0))))return s.unescape(a);return""}};s.z=["timestamp","dynamicVariablePrefix","visitorID","marketingCloudVisitorID","analyticsVisitorID","audienceManagerVisitorID","audienceManagerLocationHint","fid","vmk","visitorMigrationKey","visitorMigrationServer","visitorMigrationServerSecure","charSet","visitorNamespace","cookieDomainPeriods","fpCookieDomainPeriods","cookieLifetime","pageName","pageURL","referrer","contextData","currencyCode","lightProfileID",
"lightStoreForSeconds","lightIncrementBy","retrieveLightProfiles","deleteLightProfiles","retrieveLightData","pe","pev1","pev2","pev3","pageURLRest"];s.c=s.z.concat(["purchaseID","variableProvider","channel","server","pageType","transactionID","campaign","state","zip","events","events2","products","tnt"]);s.Q=["timestamp","charSet","visitorNamespace","cookieDomainPeriods","cookieLifetime","contextData","lightProfileID","lightStoreForSeconds","lightIncrementBy"];s.H=s.Q.slice(0);s.aa=["account","allAccounts",
"debugTracking","visitor","trackOffline","offlineLimit","offlineThrottleDelay","offlineFilename","usePlugins","doPlugins","configURL","visitorSampling","s.visitorSamplingGroup","linkObject","linkURL","linkName","linkType","trackDownloadLinks","trackExternalLinks","trackClickMap","trackInlineStats","linkLeaveQueryString","linkTrackVars","linkTrackEvents","linkDownloadFileTypes","linkExternalFilters","linkInternalFilters","useForcedLinkTracking","forcedLinkTrackingTimeout","trackingServer","trackingServerSecure",
"ssl","abort","mobile","dc","lightTrackVars","maxDelay"];for(i=0;i<=75;i++)s.c.push("prop"+i),s.H.push("prop"+i),s.c.push("eVar"+i),s.H.push("eVar"+i),i<6&&s.c.push("hier"+i),i<4&&s.c.push("list"+i);i=["resolution","colorDepth","javascriptVersion","javaEnabled","cookiesEnabled","browserWidth","browserHeight","connectionType","homepage","plugins"];s.c=s.c.concat(i);s.z=s.z.concat(i);s.ssl=w.location.protocol.toLowerCase().indexOf("https")>=0;s.charSet="UTF-8";s.contextData={};s.offlineThrottleDelay=
0;s.offlineFilename="AppMeasurement.offline";s.ma=0;s.P=0;s.G=0;s.la=0;s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";s.w=w;s.d=w.document;try{s.Pa=navigator.appName=="Microsoft Internet Explorer"}catch(o){}s.L=function(){if(s.M)w.clearTimeout(s.M),s.M=k;s.i&&s.B&&s.i.dispatchEvent(s.B);if(s.p)if(typeof s.p=="function")s.p();else if(s.i&&s.i.href)s.d.location=s.i.href;s.i=s.B=s.p=0};s.oa=function(){s.b=s.d.body;if(s.b)if(s.o=function(b){var a,c,e,d,f;if(!(s.d&&
s.d.getElementById("cppXYctnr")||b&&b.Wa)){if(s.ba)if(s.useForcedLinkTracking)s.b.removeEventListener("click",s.o,!1);else{s.b.removeEventListener("click",s.o,!0);s.ba=s.useForcedLinkTracking=0;return}else s.useForcedLinkTracking=0;s.j=b.srcElement?b.srcElement:b.target;try{if(s.j&&(s.j.tagName||s.j.parentElement||s.j.parentNode))if(e=s.ha(),s.track(),e<s.ha()&&s.useForcedLinkTracking&&b.target){for(d=b.target;d&&d!=s.b&&d.tagName.toUpperCase()!="A"&&d.tagName.toUpperCase()!="AREA";)d=d.parentNode;
if(d&&(f=d.href,s.ja(f)||(f=0),c=d.target,b.target.dispatchEvent&&f&&(!c||c=="_self"||c=="_top"||c=="_parent"||w.name&&c==w.name))){try{a=s.d.createEvent("MouseEvents")}catch(g){a=new w.MouseEvent}if(a){try{a.initMouseEvent("click",b.bubbles,b.cancelable,b.view,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget)}catch(i){a=0}if(a)a.Wa=1,b.stopPropagation(),b.Za&&b.Za(),b.preventDefault(),s.i=b.target,s.B=a}}}}catch(k){}s.j=0}},s.b&&s.b.attachEvent)s.b.attachEvent("onclick",
s.o);else{if(s.b&&s.b.addEventListener){if(navigator&&(navigator.userAgent.indexOf("WebKit")>=0&&s.d.createEvent||navigator.userAgent.indexOf("Firefox/2")>=0&&w.MouseEvent))s.ba=1,s.useForcedLinkTracking=1,s.b.addEventListener("click",s.o,!0);s.b.addEventListener("click",s.o,!1)}}else setTimeout(s.oa,30)};s.oa()}
function s_gi(s){var w,k=window.s_c_il,m,i=s.split(","),n,p,o=0;if(k)for(m=0;!o&&m<k.length;){w=k[m];if(w._c=="s_c"&&w.account)if(w.account==s)o=1;else{if(!w.allAccounts)w.allAccounts=w.account.split(",");for(n=0;n<i.length;n++)for(p=0;p<w.allAccounts.length;p++)i[n]==w.allAccounts[p]&&(o=1)}m++}o||(w=new AppMeasurement);w.setAccount(s);return w}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var s=window,w=s.s_giq,k,m,i;if(w)for(k=0;k<w.length;k++)m=w[k],i=s_gi(m.oun),i.setAccount(m.un),i.setTagContainer(m.tagContainerName);s.s_giq=0}s_pgicq();
