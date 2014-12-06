/*
$Id: jquery-fix.js,v 1.1 2008/10/24 07:17:23 joy Exp $
vim: set ts=2 sw=2 sts=2 et:
*/

/*
makeArray fix #3397 Ticket: Safari crash. 
http://dev.jquery.com/ticket/3397
*/
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
