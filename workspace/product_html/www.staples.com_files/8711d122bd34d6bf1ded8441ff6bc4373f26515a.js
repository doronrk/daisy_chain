function getAdobevisitorID()
  {
       var v = "";
 
       if(window.s && s.analyticsVisitorID){
              v = s.analyticsVisitorID;
       }else{
      try{
           var re = new RegExp("s_vi" + "=([^;]+)");
           var value = re.exec(document.cookie);
           v = (value != null) ? unescape(value[1]) : null;
 
           var b = v.substring(v.indexOf("|") + 1);
      var c = b.substring(0, b.indexOf("["));
      v = c;
      }catch(e){}
       }
 
       return v;
  };