$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
		$('.sticky-nav-logo').fadeIn();
	} else {
		$(".sticky-nav-logo").fadeOut();
	}
	});

	$(document).on("click", ".sticky-nav-logo", function(){
		location.href = "http://www.francescas.com";
	});
