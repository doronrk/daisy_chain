/*
$Id: jquery-fix.js,v 1.3 2009/04/20 13:26:54 max Exp $
vim: set ts=2 sw=2 sts=2 et:
*/

/*
makeArray fix #3397 Ticket: Safari crash. 
http://dev.jquery.com/ticket/3397
*/
if ($.browser.safari) {
  jQuery.extend({
	  makeArray: function( array ) {
          var ret = [];

          if( array != null ){
              var i = array.length;
              //the window, strings and functions also have 'length'
  			if( i == null || "split" in array || "setInterval" in array || "call" in array )
                  ret[0] = array;
              else
                  while( i )
                      ret[--i] = array[i];
          }

          return ret;
      }
  });
}

if ($.browser.msie && parseInt($.browser.version) == 6) {
  var s = navigator.userAgent.toLowerCase();
  var index = s.indexOf('msie');
  if (index != -1)
    $.browser.version = parseFloat(s.substring(index + 5));
}
