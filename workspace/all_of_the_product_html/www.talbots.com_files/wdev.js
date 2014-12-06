// JavaScript Document

$(window).load(function() {
	//create title tage if there are none
	if($('html title').size() == 0){
		var pageTitle = $("a.selectedFilter:last").text();
		$('head').append('<title>'+pageTitle+'  |  Talbots'+'</title>')
	}else{};

	//make adore tags red
	var navElement = $("#innerQuickNav");
		navElement.css("display", "block");
	$("span#prodtagdisp").each(function() {
		if ($(this).text().toLowerCase().indexOf("adore & get more") >= 0 ){
			$(this).css("color","#8b0000")
		}else{return} 
	});
	//make top rated tags teal
	$("span#prodtagdisp").each(function() {
		if ($(this).text().toLowerCase().indexOf("top rated") >= 0 ){
			$(this).css("color","#05909B")
		}else{return} 
	});
	//don't allow search w/o entering search terms
	$('.searchIcon1').click(function(){
		if(($("#quickNavSearch fieldset #search").val()) == "Search Item# or Keyword"){
			alert("Please enter an item # or keyword.");
			return false
		}else{return}
	});

});
