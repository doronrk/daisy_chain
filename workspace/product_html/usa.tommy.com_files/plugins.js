(function()
{
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--)
    {
        method = methods[length];
        if (!console[method]) console[method] = noop;
    }
}());

/* jQuery querystring - START */
	
	$.extend({
	    getQSVars: function()
	    {
	      var vars = [], hash;
	      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	      for(var i = 0; i < hashes.length; i++)
	      {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	      }
	      return vars;
	    },
	    getQSVar: function(name){
	      return $.getQSVars()[name];
	    }
	});

/* jQuery querystring - END */