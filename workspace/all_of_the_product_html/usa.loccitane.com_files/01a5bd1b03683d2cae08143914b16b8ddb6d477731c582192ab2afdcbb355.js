/* creation date: Wed, 27 Aug 2014 11:59:16 GMT
concat references:
http://usa.loccitane.com/js/_controls/popins/OCMS.controls.password_reminder_popin.js
*/
OCMS.controls.passwordreminderpopin={reminderPopinOptions:{id:"reminderPopin",title:"",defaultEmail:"",content:"",buttons:"",onOpen:function(c,p){p.container.find("#emailReminder").val(p.options.defaultEmail);if(OCMS.Popin.popinSpinnerOptions&&Spinner){var spinner=(new Spinner(OCMS.Popin.popinSpinnerOptions)).spin(document.getElementById("pwdReminderSpinner"))}return true}},titleLabel:"",introLabel:"",emailLabel:"",buttonLabel:"",pwdRemindConfirmationMessage:"",pwdRemindErrorMessage:"",init:function(){this.reminderPopinOptions.title=this.titleLabel;var _contentHTML=["<div>",'<h4 class="clear darkblue" style="margin:0; padding-bottom:10px;">'+this.introLabel+"</h4>",'<label id="lblEmailReminder" for="emailReminder">'+this.emailLabel+"</label> ",'<input id="emailReminder" type="text" class="email required" style="width:300px;" data-description="'+this.emailLabel+'" value="" />',"</div>"].join("");this.reminderPopinOptions.content=_contentHTML;this.reminderPopinOptions.buttons=['<div id="pwdReminderSpinner" style="display:none; padding:8px;"></div><a id="pwdReminderButton" href="javascript:void(0);" class="darkbluebutton button_basic">',this.buttonLabel,"</a>"].join("")}};function openPasswordReminderPopin(onOpen,onReminder,asDefaultEmail){OCMS.controls.passwordreminderpopin.reminderPopinOptions.defaultEmail=asDefaultEmail;OCMS.Popin.open(OCMS.controls.passwordreminderpopin.reminderPopinOptions);$(document).on("click","#pwdReminderButton",function(aoEvent){aoEvent.preventDefault();if(GetDefaultValidationResult($("#reminderPopin"))){$("#pwdReminderButton").hide();$("#pwdReminderSpinner").show();$.ajax({type:"POST",url:"/ajax/UtilsAjax.aspx",data:{task:"pwdReminder",c:OCMS.GlobalVars.C,l:OCMS.GlobalVars.L,email:$("#emailReminder").val()},dataType:"json",success:function(data){if(data===1){if(onReminder!=null&&onReminder!==undefined&&typeof onReminder=="function"){onReminder()}OCMS.Popin.close();showPopinSuccessMessage(OCMS.controls.passwordreminderpopin.pwdRemindConfirmationMessage)}else{showPopinErrorMessage(OCMS.controls.passwordreminderpopin.pwdRemindErrorMessage)}$("#pwdReminderButton").show();$("#pwdReminderSpinner").hide()}})}})}