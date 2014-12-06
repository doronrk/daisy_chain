$(document).ready(function(){

	$('#104713 a').css({'color': 'red'});
	$('#104713 ul').css({'height': '322px'});
	$('#104713 ul li a').css({'color': 'rgb(119, 119, 119)'});
	$('#100122 ul').css({'-webkit-column-count': '4', '-moz-column-count': '4', 'column-count': '4', 'width': '917px', 'height': '238px', 'margin-left': '-196px'});
	$('#100301 ul').css({'-webkit-column-count': '2', '-moz-column-count': '2', 'column-count': '2', 'width': '570px', 'height': '400px'});
	$('#100132 ul').css({'-webkit-column-count': '2', '-moz-column-count': '2', 'column-count': '2', 'width': '568px', 'height': '265px'});
	$('#103175 ul').css({'-webkit-column-count': '1', '-moz-column-count': '1', 'column-count': '1', 'width': '315px'});
	$('#100152 ul').css({'margin-left': '-244px'});
	$('#100162 ul').css({'-webkit-column-count': '2', '-moz-column-count': '2', 'column-count': '2', 'width': '440px', 'margin-left': '-302px', 'height': '200px'});
	$('#100247 ul').css({'width': '500px', 'margin-left': '-19px'});

	if ($.browser.msie && parseInt($.browser.version, 10) === 9){
		$('#100301 ul').css({'-webkit-column-count': '3', '-moz-column-count': '3', 'column-count': '3', 'width': '313px', 'height': 'auto'});
		$('#100122 ul').css({'-webkit-column-count': '5', '-moz-column-count': '5', 'column-count': '5', 'width': '315px', 'height': 'auto', 'margin-left': '0'});
		$('#100132 ul').css({'-webkit-column-count': '2', '-moz-column-count': '2', 'column-count': '2', 'width': '315px', 'height': 'auto'});

	}
});



