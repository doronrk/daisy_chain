/*
$Id: func.js, sandra Exp $
vim: set ts=2 sw=2 sts=2 et:
*/

function switchSubcatLayer(obj) {
  $(obj.parentNode).toggleClass('closed');
  return false;
}

$(document).ready(
  function() {
    if (typeof(window.catexp) != 'undefined' && catexp > 0) {
      $('.fancycat-explorer-scheme #cat-layer-' + catexp).parents('li.closed').removeClass('closed');
	 } 
  }
);

