function toggle() {
	var ele = document.getElementById("buyBaby");
	var text = document.getElementById("displaybuyBaby");
	var path = "/maternity/gifts.asp";
	if(ele.style.display == "block") {
    		ele.style.display = "none";
		text.innerHTML = "buybuyBABY";
		
		 window.location.href = path;
  	}
	else {
		ele.style.display = "block";
		text.innerHTML = "buybuyBABY";
		//var URL ="?goto=BBB";
		 window.location.href = path + "?goto=BBB";
	}
} 
