function fetchUserId(){
   var _cookie = $.cookie('akCookie');
   var userIDSessionCookie=$.cookie('rUserId');
   if ( _cookie != null & _cookie!=undefined ) {
       
       var cookie_array = _cookie.split("|");
       var user = cookie_array[0].replace(/\+/g, " ");

    	if( user != "Guest" && user != "undefined"  && (userIDSessionCookie==undefined)) {
       
       var callURL="/ulta/integrations/fetchRRRequiredvalues.jsp";
       
       $.ajax({
		    type: 'GET',
		    //timeout:1000, //timeout 1 seconds
			url: callURL,
		    // contentType: 'html',
		    success: function(response_data, response_status) {
		   	//alert('  VALUES RECEIVED :) ========> callURL '+response_data);
            var userIdServer=response_data;
          //  document.cookie = "rUserId="+userIdServer+"";
            $.cookie('rUserId', userIdServer,{ path: '/' });
            
            },
		    error: function(response_error, response_status) {
		    //	alert('ERROR IN RECEIVING   CONTENT  callURL '+callURL+'    Message:  '+response_error+'   status  '+response_status);
		    }
		});
			}
    	}
}
