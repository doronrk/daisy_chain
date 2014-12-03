function rkg_track_sid(mid) {
    if (!(document.referrer && document.referrer.match('://([^/]+)')[1].toLowerCase().match(document.domain.match('[^.]*\.[^.]*$')[0].toLowerCase()))) {
        var href = document.location.protocol + "//mct.rkdms.com/sid.gif?mid=" + mid + "&ref=" + encodeURIComponent(document.referrer);
        var src = window.location.href.match(/rkg_src=.*(&|$)/);
        if (src && src[0]) {
            var s = src[0].replace('rkg_src=', '');
            href += "&src=" + s;
        }
        document.write('<div class="hidden"><img height="1" width="1" src="' + href + '"/></div>');
    }
}


function rkg_micropixel(mid, type) {
	if(mid == 'BuyBuyBaby' ){
		var mid = 'buybuybaby';
	}
	if(mid == 'BedBathUS' ){
		var mid = 'bedbathbeyond';
	}
	if(mid == 'BedBathCA' ){
		var mid= 'bedbathcanada';
	}
	var url ='https://micro.rkdms.com/micro.gif';
	var href= url+'?'+'mid='+mid+'&'+'type='+type;
	var img ='<img height="1" width="1" style="display: none" src="' + href + '"/>'
	$(document.body).append(img);
}
