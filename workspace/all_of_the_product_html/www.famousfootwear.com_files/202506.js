
// !/^$/
// !/(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/
var messageInput = function(obj, message){
  // Setup Error Messaging

  if(!obj.data('error')) { obj.data('error', $('<span class="error message">'+message+'</span>')); }
  
  if (message) {
    obj.addClass('error').after(obj.data('error').text(message));
    if(obj.is('input')){
      obj.keyup(function(){ validate(["#"+obj.attr('id')]); });    
    } else {
      obj.find('input').change(function(){ validate(["#"+obj.attr('id')]); });
    }
  } else {
    obj.removeClass('error').unbind('keyup').data('error').remove();
  }
};

var validate = function(search) {
  var valid = true;
  for (var i = search.length - 1; i >= 0; i--) {
    var el = $(search[i]);
    // ZIP Validation
    if(/zip/i.test(el.attr('id'))) {
      if(!/^$/.test(el.val()) && !/(^\d{5}(-\d{4d})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/.test(el.val())) {
        valid = false;
        messageInput(el, 'invalid post code');
      } else {
        messageInput(el, '');
      }
    } else {
      // Checkbox validation
      if(/check/i.test(el.attr('id'))) {
       if(!el.find('input:checked').length) {
          valid = false;
          messageInput(el, 'please verify your subscription');
        } else {
          messageInput(el, '');
        }
      }
    }
  }

  return valid;
}
$(function(){
  var data = {
      source:'Famous-HPmodal', 
      fontSize:'1em',
      styles:'font-style:italic', 
      placeholder:"email@gmail.com",
      successMsg: "",
      validation: function(){
        return validate(['#optInZip','#caOptInCheck']);
      },
      success: function(){
        $("#emailOptIn .optIn").animate({'opacity': 0}, 300,function(){
          $('#confirmationMessage').fadeIn(300);
        });
      }
  };

  $('#optInEmailAddress').emailValidate(data).focus();

  // Check on any input field
  $('#emailOptIn input').blur(function(){
    if($(this).attr('id')){
      validate(['#'+$(this).attr('id')]);
    }
  }).not('#optInEmailAddress').keydown(function(e){
    if (e.which == 13) {
      $('#emailOptIn .button.submit').trigger('click');
    }
  });
});