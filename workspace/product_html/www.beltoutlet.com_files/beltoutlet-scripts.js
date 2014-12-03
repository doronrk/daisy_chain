$(document).ready( function() {
	$(".pit-of").submit(function() {
		var trig = 0;
		$("#product-info-table select").each( function() {
			if($(this).val().match(/Select/)) {
				trig++;			
			}
		});
		if(trig > 0) {alert("Please select an option"); return false;}
	});
});

function stripOpts(){
	var opts = document.getElementsByTagName("option");
	var expression = /\((.+?)\)/;

	for (var x=0; x<opts.length; x++){
		var newStr = opts[x].value.replace(expression, "");
		opts[x].innerHTML = newStr;
	}
}