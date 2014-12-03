_satellite.pushAsyncScript(function(event, target, $variables){
  
  $.getScript( "//static.atgsvcs.com/js/atgsvcs.js", function( data, textStatus, jqxhr ) {
    clog( "Engagement Engine base script loaded" );  

    var rntDomain; 
    if( pageData.unicaEnv=='site-prod' ){ 
      rntDomain = 'mf.custhelp.com';
    }else{  
      rntDomain = 'mf--tst1.custhelp.com';
    } 
    
    ATGSvcs.setEEID("200106306814");
    (function(){
      var l = rntDomain, d=document, ss='script', s=d.getElementsByTagName(ss)[0];
      function r(u){ var rn=d.createElement(ss); rn.type='text/javascript'; rn.defer=rn.async=!0; rn.src = "//" + l + u; s.parentNode.insertBefore(rn,s); }
      r('/rnt/rnw/javascript/vs/1/vsapi.js');
      r('/vs/1/vsopts.js');
    })(); 

    ATGSvcs.start();  
  });
});
