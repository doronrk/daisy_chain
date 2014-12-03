function updateRegCookieElements(){
	jQuery.ajaxSetup({ cache: false });
	jQuery.getJSON("/include/regCookie_getParams.jsp",function(result){	
	   if(location.protocol != 'https:'){
		jQuery('#hiddenRegistryCookie').append('<iframe height="0" width="0" src="http://www.babiesrus.com/regCookie.jsp?'+result.rcSHJD+'&li='+result.rcLoggedIn+'&rcid='+result.rcRegistryId+'&qty='+result.rcCartQty+'&ln='+result.rcDisplayName+'&stid=.babiesrus.com" style="visibility:hidden;display:none"></iframe>');
	   }	  
	});	
}