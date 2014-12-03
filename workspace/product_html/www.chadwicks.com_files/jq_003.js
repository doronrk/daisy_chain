
$.extend({
	loadVeil: function() {
		var new_position = $('#footer').offset();
		$("#veil").css( { "height": (new_position.top + 150) + "px", "width": "100%" } );
		$("#veil").show();
	},
	hideVeil: function() {
		$("#veil").css( { "height": "1px", "width": "1px" } );
		$("#veil").hide();
	}
	
});
