var chat_now_timer = 100;
function needHelp() { lcModal.showNeedHelp(); }
var chatNowClicked = false;
// var chatLandingURL = '';  -- this variable is defined inline in the page HTML
function chatInputHasError(id) {
	if (id == 'chat_email') {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if ($.trim($("#chat_email").val()) == '') {
			$('#e_chat_email').html('Please enter your email.');
			$('#e_chat_email').show();
			$('#eIcon_chat_email').show();	
			return true;
		} else if (!emailReg.test($("#chat_email").val())) {
			$('#e_chat_email').html('Error: Invalid email address.');
			$('#e_chat_email').show();
			$('#eIcon_chat_email').show();
			return true;
		} else {
			$('#e_chat_email').hide();
			$('#eIcon_chat_email').hide();
			return false;
		}		
	}
	else { 
		if ($.trim($('#' + id).val()) == '') { $('#eIcon_' + id).show(); $('#e_' + id).show(); return true; } 
		else { $('#eIcon_' + id).hide(); $('#e_' + id).hide(); return false; }
	}
}
RightNow.Client.Controller.addComponent(
    {
        div_id: "rnt_chat_container",
        label_accept_button : "Chat Now",
        wait_threshold: 86400,
        avatar_image: "",
        label_avatar_image: "",
        label_dialog_header: "",
        label_question: "",
        label_refuse_checkbox: "",
        label_reject_button: "",
        label_title: "",
        logo_image: "",
        instance_id: "spac_0",
        module: "ProactiveChat",
        type: 2
    },
    chatNowWidgetURL
);

   function remove_no_agents(){
    rnt_chat_new = document.getElementById('rnt_chat_container'); // get the current chat dom object
    if(rnt_chat_init != rnt_chat_new.innerHTML){ // the chat dom contents have changed which means an agent is available, so replace with the anchor html
     rnt_chat_new.innerHTML = '<a href="javascript:chat_now();">Chat Now</a>';
     rnt_chat_agent_avail = window.clearInterval(rnt_chat_agent_avail); // clear internval
    }
   }

   function clear_rnt_chat_check(){
    if(typeof RightNow != 'undefined'){ // syndicated chat object has been created, so clear both interval checks.
     rnt_chat_agent_avail = window.clearInterval(rnt_chat_agent_avail);
     rnt_RightNow_obj = window.clearInterval(rnt_RightNow_obj);
    }
   }

   /**
    * Set init rnt_chat_container dom innerHTML
    * Set interval call to remove_no_agents function
    * Set interval call to clear_rnt_chat_check function
   */
   function rnt_chat_wrapper() {
    rnt_chat_init = document.getElementById('rnt_chat_container').innerHTML;
    rnt_chat_agent_avail = self.setInterval("remove_no_agents()",100);
    rnt_RightNow_obj = self.setInterval("clear_rnt_chat_check()",3000);
   }

   /** window onload call to rnt_chat_wrapper.
    * if you are using a JavaScript library such as jQuery you could remove the line below with dom ready statement like this: $(document).ready(function() {rnt_chat_wrapper(); });
   */
   //if(window.attachEvent) {window.attachEvent('onload', rnt_chat_wrapper);}else if (window.addEventListener) {window.addEventListener('load', rnt_chat_wrapper, false);}else {document.addEventListener('load', rnt_chat_wrapper, false);}

   function check_agent_avail() {
     if (typeof spac_0 != 'undefined') {
       chat_now_timer = 360000;
       spac_0.chatAvailability(set_agent_status,"spac_0"); // the first argument of this function call is the callback function
     }
   }

   function set_agent_status(C){
	var rnt_chat_container = $('#rnt_chat_container, .agent-availability'); // get the current chat dom object
	var footerChat = $('#footer_chat'); // get the chat link in the footer
	
 	if(C.expectedWaitSeconds < 86400 ){ // wait time below threshold (45 min)
		rnt_chat_container.html('<a href="javascript:chat_now();">Chat Now</a>');
		footerChat.show();
		
	}else{
		rnt_chat_container.html('<strong><i>Sorry agents are not available at this time</i></strong>');
		footerChat.hide();
	}
   }

   function chat_now(){
	$('#ContactUsChatOverLay').css('display', 'block');
	$('#chatLoginOverlay').css('display', 'block');
    chatNowClicked = false;
	$('#chat_first_name').val('');
	$('#chat_last_name').val('');
	$('#chat_email').val('');
	$('#ContactUsChatOverLay').dialog('open');
	//$('.lcModal').fadeOut('fast');
	//$('#chatLoginOverlay').fadeIn('fast');
	utagLinkSafe({link_id:"chat now", sc_event:"event89"});
   }
   
   function getChatLandingURL()
   {
    	var URL = chatLandingURL;
           if (encodeURIComponent($('#chat_first_name').val()))
           {
                   URL += "/first_name/";
                   URL += encodeURIComponent($('#chat_first_name').val());
           }
           if (encodeURIComponent($('#chat_last_name').val()))
           {
                   URL += "/last_name/";
                   URL += encodeURIComponent($('#chat_last_name').val());
           }
           if(encodeURIComponent($('#chat_email').val()))
           {
                   URL += "/email/";
                   URL += encodeURIComponent($('#chat_email').val());
           }                                                                                                                                                        	
   	return URL;
   }

function keepCheckingChatNowStatus() {
	check_agent_avail();
	setTimeout("keepCheckingChatNowStatus()",chat_now_timer);
}
$(document).ready(function() {
	var chatContainer = $('#rnt_chat_container');
	if (chatContainer.length == 0){
		$('<div id="rnt_chat_container"></div>').css('display', 'none').appendTo('body');
	}
	
	setTimeout("keepCheckingChatNowStatus()",chat_now_timer);
	
	
	$('#ChatLogonOverlaySubmit').click(function() {
		chatNowClicked = true;
		
		// handle errors
		$('.chat_error').hide(); 
		var focusInput = null;			
		if (chatInputHasError('chat_first_name')) {
			focusInput = $('#chat_first_name'); 
		}
		if (chatInputHasError('chat_last_name')) { 
			if (focusInput == null) {
				focusInput = $('#chat_last_name');
			}
		}
		if (chatInputHasError('chat_email')) { 
			if (focusInput == null){
				focusInput = $('#chat_email'); 
			}
		}
		if (focusInput != null) { 
			$(focusInput).focus(); 
			return false; 
		}
		
		$('#chatLoginOverlay').css('display', 'none');
		$('#chatOverlay').css('display', 'block');
		$('#rightNowChatContainer').attr('src', getChatLandingURL());
		
		return false;
	});
	
});
