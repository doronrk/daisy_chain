function toggle(div_id) {
	//alert(div_id)
	var el = document.getElementById(div_id);
    if ( el.style.display == 'none' ) {
        el.style.display = '';
    }
    else {
        el.style.display = 'none';
    }
}
function blanket_size(popUpDivVar, e, what) {
	
	if(!e)
	{
		e = window.event;
	}
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
		viewportwidth  = eval(window.innerWidth) - eval(16);
	} else {
		viewportheight = document.documentElement.clientHeight;
		viewportwidth  = document.documentElement.clientWidth;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}

	// Set the Height.
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		blanket_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			blanket_width = document.body.parentNode.scrollWidth;
		} else {
			blanket_width = document.body.parentNode.scrollWidth;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	blanket.style.width = blanket_width + 'px';
	var popUpDiv = document.getElementById(popUpDivVar);
	///popUpDiv_height=blanket_height/2-127;//150 is half popup's height
	//popUpDiv_height=(document.body.parentNode.scrollHeight / 2) - (viewportheight / 2);//150 is half popup's height
	//popUpDiv.style.top = popUpDiv_height + 'px';
	var mouse_x = Event.pointerX(e);
	var mouse_y = Event.pointerY(e);
	var dimensions = Element.getDimensions( popUpDivVar );
	
	//Adjest left if it is going outise of the window
    /*if(eval(e.clientX+dimensions.width) > blanket_width )
	{		
		popUpDiv.style.left = eval(e.clientX-(e.clientX+dimensions.width-blanket_width)-10) + 'px';
		iFrameLeft = eval(e.clientX-(e.clientX+dimensions.width-blanket_width)-10) 
	}
	else
	{
		popUpDiv.style.left = e.clientX + 'px';
		iFrameLeft = e.clientX;
		
	}
	popUpDiv.style.left = e.clientX + 'px';
	popUpDiv.style.top = (mouse_y - dimensions.height - 10) + 'px';
	iFrameTop = mouse_y - dimensions.height - 10;*/

    var iFrameLeft =  eval(eval(window.innerWidth) - eval(dimensions.width)) / 2;
    var iFrameTop =   eval(eval(window.innerHeight) - eval(dimensions.height)) / 2;
    var gettop =  100+jQuery(window).scrollTop();

    popUpDiv.style.position = 'absolute';
    /*popUpDiv.style.top = gettop+ 'px';
    popUpDiv.style.left = iFrameLeft+ 'px';*/
    jQuery('.pop-up-box').css('top', gettop);
    jQuery('.pop-up-box').css('left', iFrameLeft);
	
	//hack for IE
	if(document.all)
	{		
		//var popUpFrame = document.getElementById(popUpDivVar+"_frame");
		var popUpFrame = document.getElementById(popUpDivVar);
		popUpFrame.style.left = iFrameLeft+ 'px';
        popUpFrame.style.top = gettop+ 'px';
		popUpFrame.style.width = dimensions.width+ 'px';
		popUpFrame.style.height = dimensions.height+ 'px';		
	}
	

	
/*
	// Set the width of the div to display properly.
	if (count < 3) {
	    var new_div_width = (589 / 3) + 'px';
	} else {
	    var new_div_width = '589px';
	}

	popUpDiv.style.width = new_div_width;

	for (var i = 0; i < document.getElementsByClassName('view-more').length; i++) {
	    document.getElementsByClassName('view-more')[i].style.width = '589px';
	}*/
}
function window_pos(popUpDivVar, what) {
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var dimensions = Element.getDimensions( popUpDivVar );
	var popUpDiv = document.getElementById(popUpDivVar);
	if (what && 'wishlist' == what) {
	    var popup_max_width = dimensions.width //87; // Half of popup's width
	} else {
	    var popup_max_width = dimensions.width //232;//197; // Half of popup's width
	}
	window_width=window_width/2-popup_max_width;//295;//150 is half popup's width
	//popUpDiv.style.left = window_width + 'px';
	//popUpDiv.style.marginLeft = '-250px';
}
function popup(windowname, event, what) {
	blanket_size(windowname, event, what);
	window_pos(windowname, what);
	toggle('blanket');
	toggle(windowname);	
	if(document.all){
		//toggle(windowname+"_frame");	
		//toggle(windowname);	
	}
}

// Function to close the opened Pop-Up div on clicking outside of the pop-up div area.
function closePopUpWindow(div_class) {
	document.getElementById('blanket').style.display = 'none';
	for (var i = 0; i < document.getElementsByClassName(div_class).length; i++) {
	    document.getElementsByClassName(div_class)[i].style.display = 'none';
	}
    div_class.style.top ='';
}// JavaScript Document// JavaScript Document