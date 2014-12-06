_satellite.pushAsyncScript(function(event, target, $variables){
  $('.quickview-button').click(function(){
	window.s.events = "";
	window.s.events = "prodView,event25";
	window.s.products = ";"+$(this).attr("data-productid");
	window.s.pageName = "Quick View: " +$(this).attr("data-productid");
	window.s.prop1="Quick View"
	window.s.prop2=window.s.prop1
	window.s.prop3=window.s.prop1
	window.s.prop4=window.s.prop1
	s.t();
});
});
