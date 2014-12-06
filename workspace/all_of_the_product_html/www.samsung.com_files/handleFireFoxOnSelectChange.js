/**
 * 
 * Context: On Firefox Browsers, if there exists an event handling on 'change' event, 
 * When the back button is clicked from the next page, it reloads the old page except
 * <select> tag content.
 * 
 * Solution: Interpose a 'focus' event handling to retain previous value before 
 * form submission. A 'change' on select will always be preceded by 'focus.
 * 
 * NOTE: if there already exists a 'focus' event handling on the page, 
 * then instead of importing this plugin, include the code from
 * selectOnFocus(event) function to your 'focus' event handler as 
 * required.
 * 
 * Usage:
 * Import script on your page: <script type="text/javascript" src="/us/consumer/js/smg/global/handleFireFoxOnSelectChange.js"></script>
 * initialize window object: window.previousSelection ={}; // previous selection will be stored in window object to have globalAccess
 * Initialize script with ids of all select: 
 * smg.global.handleFireFoxOnSelect.init({ 
 * 		inclusions: ['#selectId3'] // do not include any id if you want to skip this behaviour on your <select> 																	
 * 	});
 * in your code before form submission: 
 * if (window.previousSelection["selectId3"]){				
				jquerySelectorString = "#sort-by option[value='"+window.previousSelection['selectId3']+"']";
				$(jquerySelectorString).attr("selected", "selected");
			}
 * 
 * 
 * Created by: v.kamath on 12/19/2013
 */

smg.global.handleFireFoxOnSelectChange = (function($, window){
	'use strict';
	var initialized = undefined,
		inclusions = [],
		options = undefined,
		defaults = {};
	
	function selectOnFocus(event){		
		//console.log(inclusions);
		var eventId = event.target.id;
		if (inclusions.indexOf(eventId) > -1){
			var selection = this.value;
			
			// saving as an object allows implementing this logic for multiple
			// <select> on any page.
			window.previousSelection[event.target.id] = selection;
		}		
	}
	
	function addListeners(){
		$("select").on('focus', selectOnFocus);
	}
	
	function init(opts){
		options = $.extend({}, defaults, opts);
		inclusions = options.inclusions;
		//console.log(inclusions);
		addListeners();
		initialized = true;
	}
	
	
	return {
		init: init,
		initialized: initialized
	};
})(jQuery, window);