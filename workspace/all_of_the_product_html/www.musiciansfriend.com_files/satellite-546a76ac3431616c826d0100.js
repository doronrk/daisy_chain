_satellite.pushAsyncScript(function(event, target, $variables){
  
$(function(){ 
  if( pageData.siteName=='/mf' ){  
     var adl = document.createElement("script"); 
     adl.type = "text/javascript"; 
     adl.async = true;
     adl.src = document.location.protocol + "//musiciansfriend.btttag.com/btt.js"; 
     document.body.appendChild(adl); 
  }
});  

});
