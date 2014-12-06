$(document).ready(function(){


	if(matchMedia){
		var mq = window.matchMedia("(max-width: 1000px)");
		mq.addListener(WidthChange);
		WidthChange(mq);
	}

	function WidthChange(mq){

	if (mq.matches){
    $(".arrow").css({'display': 'none !important'});

}

else{
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
		$('.arrow').fadeIn();
	} else {
		$(".arrow").fadeOut();
	}
	});

	$(".arrow").click(function(){
		$("html, body").animate({scrollTop: '0px'}, 'slow');
	});
}


}


});
