// page init
jQuery(function(){
	initSubmit();
});

function initSubmit () {
	jQuery('.account-forgotpassword').each(function(){
		var holder = jQuery(this);
		var input = holder.find('input[type="text"]');
		var button = holder.find('button.button');
		var flag = false;
		button.bind('click',function(e){
			if(flag && !input.hasClass('validation-failed')){
				e.preventDefault();
				button.addClass('inactive');
			}
			flag = true;
		});
	});
}
