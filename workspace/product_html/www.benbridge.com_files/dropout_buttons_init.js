/*
$Id: dropout_buttons_init.js,v 1.8.2.1 2009/11/10 07:51:03 max Exp $ 
vim: set ts=2 sw=2 sts=2 et:
*/

function initDropOutButton() {
  if ($(this).hasClass('activated-widget'))
    return;

  $(this).addClass('activated-widget');

  var dropOutBoxObj = $(this).parent().find('.dropout-box');

  // Process the onclick event on a dropout button 
  $(this).click(
    function(e) {
      e.stopPropagation();
      $('.dropout-box').removeClass('current');
      dropOutBoxObj
        .toggle()
        .addClass('current');
      $('.dropout-box').not('.current').hide();
    }
  );
   
  // Click on a dropout layer keeps the dropout content opened
  $(this).parent().click(
    function(e) { 
      e.stopPropagation(); 
    }
  );
  
  // shift the dropout layer from the right hand side 
  // if it's out of the main area
  var borderDistance = ($("#center-main").offset().left + $("#center-main").outerWidth()) - ($(this).offset().left + dropOutBoxObj.outerWidth());
  if (!isNaN(borderDistance) && borderDistance < 0) {
    dropOutBoxObj.css('left', borderDistance+'px');
  }
}

$(document).ready(
  function() {

    $('body').click(
      function() {
        $('.dropout-box')
          .filter(function() { return $(this).css('display') != 'none'; } )
          .hide();
      }
    );

    $('div.dropout-container div.drop-out-button').each(initDropOutButton);
  }
);

