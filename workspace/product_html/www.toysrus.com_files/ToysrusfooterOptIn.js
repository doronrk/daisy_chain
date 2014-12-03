/*
function emailCheck(email) {
	var characters = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!characters.test(email.value)) {
		alert('Please provide a valid email address');
        email.click();
		return false;
	} else {
		return true;	
	}
}*/
jQuery.noConflict();
jQuery(document).ready(function() {
		jQuery('body').after('<div class="dialog" style="font-family:Avenir-Medium, Arial, sans-serif; margin:0; padding:10px; border-radius:10px; left:40%; top:20%; width:200px; height:80px; z-index:99999; position:fixed; background:#ff7000; text-align:center; font-size:16px; color:#FFFFFF; box-shadow: 2px 2px 2px #abafb1; display:none;">Please provide a<br />valid email address<br/><div class="close" style="font-size:12px; line-height:26px; width:50px; height:25px; border-radius:5px; margin-left:40%; margin-top:10px; cursor:pointer; border:1px solid #cccccc; background:#FFFFFF; color:#000000;">OK</div></div>');
	
	jQuery("#ts_email_signup").submit(function() {
		var email_lookup = document.getElementById('truemail_footer');
		 	
		var characters = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!characters.test(email_lookup.value)) {
	
       	jQuery('.dialog').css('display','block');	
		email_lookup.focus();
		 return false;
     }else{	
				
			var truemail_footer = document.getElementById('truemail_footer');			
			truemail_footer = truemail_footer.value;
						
			var ts_email_signup_src = document.getElementById('ts_email_signup_src');		
			ts_email_signup_src = ts_email_signup_src.value;
			
			
			var dualposting = '<img src="https://apps.toysrus.com/tru/us/dp?EMAIL='+truemail_footer+'&BRU_EMAIL_OPTIN=1&TRU_EMAIL_OPTIN=1&SOURCE='+ts_email_signup_src+'&MESSAGEID=a9a674ed-6280-4745-8f09-76b8ed503c6c" width="1" height="1">';
			
			
			
			jQuery('body').append(dualposting);		
			
			jQuery('#ts_form_wrapper').html('<p style="margin:10px 0 0 0;padding:0px 0 0; color:#5f2c91; font-family: Avenir-Medium; font-size: 16px;">Thank you for signing up!</p>');
		
		
		//return false;	
	 }	
	});
	
	
	jQuery('.close').click(function(){
		jQuery('.dialog').css('display','none');
		
	});
	
	jQuery('#truemail_footer').click(function() {
		if (jQuery(this).val() == 'Email') {
			jQuery(this).val('');
		}
	});
});