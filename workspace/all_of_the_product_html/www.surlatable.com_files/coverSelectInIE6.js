$(document).ready(function() {
	if ($.browser.msie && $.browser.version == '6.0') {
		$(".unit").mouseover(function() {
			var menuName = $(this).children(".tab").children().text();
			if (menuName == 'Cooking Classes') {
				$("#DivShim").show();
				$("#DivShim").css("width", 176);
				$("#DivShim").css("height", 50);
				$("#DivShim").css("top", 20);
				$("#DivShim").css("left", 0);
			} else if (menuName == 'Springtime') {
				$("#DivShim").show();
				$("#DivShim").css("width", 176);
				$("#DivShim").css("height", 50);
				$("#DivShim").css("top", 20);
				$("#DivShim").css("left", 124);
			} else if (menuName == 'Seasonal 2') {
				$("#DivShim").show();
				$("#DivShim").css("width", 174);
				$("#DivShim").css("height", 50);
				$("#DivShim").css("top", 20);
				$("#DivShim").css("left", 212);
			} else {
				$("#DivShim").hide();
			}
		});
		$(".unit").mouseout(function() {
			$("#DivShim").hide();
		});
	}
});