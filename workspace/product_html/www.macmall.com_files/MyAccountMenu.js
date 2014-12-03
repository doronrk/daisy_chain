function createCookie(name,value,days,path) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=" + path;
}

function deleteCookie(name,path,url) {
	createCookie(name,"",-1,path);
	jmpUrl(url);
}

jQuery(function($){
    $('#mega-menu-7').dcMegaMenu({
        rowItems: '3',
        speed: 'fast',
        effect: 'slide'
    });
    $('#mega-menu-9').dcMegaMenu({
        rowItems: '3',
        speed: 'fast',
        effect: 'slide'
    });
});