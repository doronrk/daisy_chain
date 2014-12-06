// JSON CM tag info


cmTagParamMap = {
    "ci":"ClientID",
    "tid":"TID",
    "cjen":"Client Managed Cookies",
    "cjuid":"Visitor ID",
    "cjsid":"Session ID", 
    "cjvf":"Visitor Status(7=new, 3=repeat, 1=current session)",
    "st":"TimeStamp",
    "ec":"Encoding",
    "cpt":"points",
    "eid":"elementID",
    "pr":"productID",
    "pi":"pageID",
    "zp":"customerZIP",
    "sr":"searchResults",
    "ecat":"elementCategory",
    "pc":"isPageView",
    "se":"searchString",
    "fn":"firstName",
    "rf":"ReferringURL",
    "sd":"subscribe",
    "cg":"categoryID",
    "gd":"age",
    "pm":"productName",
    "cat":"actionType",
    "ccid":"conversionEventCat",
    "cd":"customerID",
    "tr":"orderTotal",
    "sg":"orderShipping",
    "on":"orderID",
    "cy":"country",
    "cid":"conversionEventID",
    "bp":"productPrice",
    "qt":"productQuantity",
    "ul":"DestinationURL",
    "nl":"newsletterName",
    "at":"Shop Action",
    "vn1":"js lib version",
    "vn2":"api version",
    "rnd":"rnd string",
    "lp":"Last PageID",
    "ti":"js timestamp",
    "hr":"hr",   
    "sn":"Cart Tag Sequence"
};

TIDtoTagName = {
    "1":"cmCreatePageviewTag",
    "2":"cmCreateRegistrationTag",
    "3":"cmCreateOrderTag",
    "4":"cmCreateShop", 
    "5":"cmCreateProductviewTag",
    "6":"Tech Props",
    "7":"Custom Tag",
    "8":"cmCreateLinkClick",
    "14":"cmCreateConversionEventTag",
    "15":"cmCreatePageElementTag" 
};
ATtoShop = {
    "5":"Action5Tag",
    "9":"Action9Tag"
};
cmAttributesByTagname = {
    "cmCreateShopAction5Tag": "s_a",
    "cmCreateConversionEventTag": "c_a",
    "cmCreatePageviewTag": "pv_a",
    "cmCreateProductviewTag": "pr_a",
    "cmCreateShopAction9Tag": "s_a",
    "cmCreateOrderTag": "o_a",
    "cmCreatePageElementTag": "e_a"
};


cmTagParamMapKeys = getObjKeys( cmTagParamMap ); 
//cmAttributesByTagname = getObjKeys( cmAttributesByTagname );
currentTags = [];
debugCookieIsSet = 0;

   if ( document.cookie.indexOf("cmdebugcookie") > 0 ){
       document.cmTagCtl.onTagSent = getCoreMetricsTagObj;
       debugCookieIsSet = 1;
              /*document.cmTagCtl.onUnload = getCoreMetricsTagObj;
              document.cmTagCtl.onTagSent = cmTagCtl_onTagSent;
              document.cmTagCtl.onResponse = cmTagCtl_onResponse;
              document.cmTagCtl.onError = cmTagCtl_onError;
              */
       console.log("echo tags init");
   }

   /*  
   document.observe("dom:loaded", function(){ 
       if (debugCookieIsSet == 0){
           // Provide link to set cookie to start debugging.
           returnCookieLink();
       }
   });
   */ 


  function getCoreMetricsTagObj(url) {
      currentTagArr = document.cmTagCtl.cTI;
      tmp = [];
          if (url){
             tag=url;
          }else{
             tag = decode(tag.attributes.src.value);
          }

          tmp = tag.split("?");
          tagArr = tmp[1].split("&");
          tagList = [];
          tagOut = [];
          tagFunction = '';
          unHandledParams = [];

          //tagArr.each(function(param){
          for (var i=0; i < tagArr.length-1;  ++i){
              param = tagArr[i];
              nameValue = param.split("=");
              nameValue[0] = trim(nameValue[0]);
              nameValue[1] = trim(nameValue[1]);
              nameValue[1] = decode(nameValue[1]);
  
              if (cmTagParamMap[ nameValue[0] ] ){
                      
                   if ( nameValue[0] == 'tid'){
                       tagFunction = TIDtoTagName[nameValue[1]]; 
                   }
                   if ( nameValue[0] == 'at' ){
                       tagFunction = tagFunction + ATtoShop[nameValue[1]];
                   } 

                   d= '<b>' + cmTagParamMap[ nameValue[0] ]+'</b> = '+nameValue[1]+""; 
                   tagOut.push(d);
              }else{
                  // either this is some screwed up girbish bug, OR it is an attribute
                  console.log("unhandled ",param);
                  unHandledParams.push(param);
              }
           }
          
           if (tagOut.length > 0){
               //handle un handled params last minute
               for(var i=0; i<unHandledParams.length; i++) {
                   if ( cmAttributesByTagname[tagFunction] ){
                        console.log("got possible attr on tagFunction", unHandledParams[i]);
                        attrbase = cmAttributesByTagname[ tagFunction ];
                           
                         if (unHandledParams[i].match(attrbase ) ){
                             console.log("MATCH on ",attrbase,unHandledParams[i]);
                             nameValue = unHandledParams[i].split("=");
                             nameValue[0] = trim(nameValue[0]);
                             nameValue[1] = trim(nameValue[1]);
                             nameValue[1] = decode(nameValue[1]);
                             d= '<b>' + nameValue[0] +'</b> = '+nameValue[1]+"";
                             tagOut.push(d); 
                         }
                    }
                   
                }

               tagOut.sort();
               tagFunction = '<div style="font-size:200%">'+ tagFunction +'</div>';
               //console.log(tagFunction,tagOut);
               updateDiv(tagFunction,tagOut);
               tagOut=[];
               unHandledParams=[];
           }
      //}); 
  }



function updateDiv(tf,tagOut){

    tagString = '';
    for (var i=0; i<tagOut.length-1; i++){
        tag = tagOut[i];
        tagString = tagString + tag + "<BR>\n";
    }
    current = '';
    if ( typeof(document.getElementById("debugdiv_CoreMetrics")) != "undefined"){
         current = document.getElementById("debugdiv_CoreMetrics").innerHTML;
    }
    option_links = '<a href=# onClick="document.getElementById(\'debugdiv_CoreMetrics\').style.visibility=\'hidden\'">Close</a>';

    document.getElementById("debugdiv_CoreMetrics").innerHTML=  ("debugdiv_CoreMetrics").innerHTML= current+'<hr>'+"<div style='width:1000px;  border-width:18px; border-style:solid; border-color:#ccbbaa; text-align:left; padding:10px; background-color:white; color:black; postion: relative z-index: 999999; '><h3>"+tf+"</h3>"+tagString+ " "+ option_links +" </div>";
    tagString = '';

}

function decode(str) {
     return unescape(str.replace(/\+/g, " "));
}

function getObjKeys(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

function trim(s){
    var l=0; var r=s.length -1;
    while(l < s.length && s[l] == ' ')
    {   l++; }
    while(r > l && s[r] == ' ')
    {   r-=1;   }
    return s.substring(l, r+1);
}

function returnCookieLink() {
    cookielink = '<a href="#" onClick="setDebugCookie()">Start CoreMetrics debugging</a>';
    document.getElementById("debugdiv_CoreMetrics").innerHTML =  ("debugdiv_CoreMetrics").innerHTML= '<hr>'+"<div style='width:1000px; border-width:10px; border-style:solid; border-color:#ccbbaa; text-align:left; padding:10px; background-color:white; color:black; '>"+cookielink+" </div>";

}


function setDebugCookie() {
    document.cookie =  'cmdebugcookie=1; expires=Thu, 2 Aug 2031 20:47:11 UTC; path=/'
    window.location.reload();
}


