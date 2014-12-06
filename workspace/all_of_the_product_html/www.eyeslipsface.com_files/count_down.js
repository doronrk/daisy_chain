	 
	
	function tick() {
	var secs = timeInSecs;
	if (secs > 0) {
		timeInSecs--;
	} else {
		clearInterval(ticker); // stop counting at zero
		document.getElementById("countdown").innerHTML = "Sale has ended";
	}
	
	var days = Math.floor(secs/86400);
	secs %= 86400;
	var hours= Math.floor(secs/3600);
	secs %= 3600;
	var mins = Math.floor(secs/60);
	secs %= 60;
	
	if (days > 0) {hours = hours + (24 * days)}
	var result = ((hours < 10 ) ? "0" : "" ) + hours + ":" + ( (mins < 10) ? "0" : "" ) + mins
	               + ":" + ( (secs < 10) ? "0" : "" ) + secs;
	//result = days + " Days: " + result;
	if ( (document.getElementById("countdown"))) {
		document.getElementById("countdown").innerHTML = result;
	}
	}