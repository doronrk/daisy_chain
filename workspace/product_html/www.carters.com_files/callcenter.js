var cc = (function (cc, $) {
	cc.init = function(){
		$("#couponConsole .launchIcon, #couponConsole h1 .closebtn").on("click", function(){
			$("#couponConsole .couponConsoleWrapper").fadeToggle();
		});
		
		$("#couponConsole button").on("click", function(){
			var	couponID = $(this).attr("couponcode"),
				data = "couponID=" + couponID,
				couponHolder = null;
			
			$.ajax({
				type: 'GET',
				url : app.urls.ccCouponConsole,
				data : data,
				dataType: 'json',
				success : function(response){
					if (response.success) {
						couponHolder = $("div[couponcode='" + couponID + "']"); 
						couponHolder.html(response.couponCode);
						$("#dwfrm_cart_couponCode").val(response.couponCode);
						couponHolder.css("display", "inline");
						couponHolder.fadeIn();
					} else {
						alert("An error occurred, please try again later.");
					};
				},
				error : function(response){
					alert("An error occurred, please try again later.");
				}
			});
		});
	};
	
	return cc;
})(window.cc = window.cc || {}, jQuery);

$(document).on("HeaderMenuLoaded", function () {
	cc.init();
});