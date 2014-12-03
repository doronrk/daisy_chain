// JavaScript Document

$(document).ready(function() {
var i = 0;
$('.headnav').each(function (i) {
	$('.headnav' + i).qtip({
	content: $('.headtxt' + i + ':first'),
	show: {
		event: "mouseover"
	},
	hide: {
		fixed: true,
		delay: 500,
		event: "mouseout"
	},
	position: {
		at: "bottom right",
		my: "top right",
		target: $('.headnav')
	},
	style: {
		classes: 'qtip-topnav',
		tip:{
				offset: 5,
				mimic: 'top center'
			}
	}
});
i++;
});
});