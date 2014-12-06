/** Javascript Last Updated by Rey 02-23-2011 **/

function showFirst() {
		jQuery('#secondContainer').css('display','none');
		jQuery('#left-secondContainer').css('display','none');
		jQuery('#thirdContainer').css('display','none');
		jQuery('#left-thirdContainer').css('display','none');
		jQuery('#fourthContainer').css('display','none');
		jQuery('#left-fourthContainer').css('display','none');
		jQuery('#fifthContainer').css('display','none');
		jQuery('#left-fifthContainer').css('display','none');
		jQuery('#sixthContainer').css('display','none');
		jQuery('#left-sixthContainer').css('display','none');
		jQuery('#seventhContainer').css('display','none');
		jQuery('#left-seventhContainer').css('display','none');
		jQuery('#firstContainer').fadeIn(300);
		jQuery('#left-firstContainer').fadeIn(300);
		jQuery('ul.tabbedNav li a.on').removeClass('on');
		jQuery('ul.tabbedNav li a#navFirst').addClass("on");
}


function showSecond() {
		jQuery('#firstContainer').css('display','none');
		jQuery('#secondContainer').fadeIn(300);
		jQuery('#thirdContainer').css('display','none');
		jQuery('#fourthContainer').css('display','none');
		jQuery('#fifthContainer').css('display','none');
		jQuery('#sixthContainer').css('display','none');
		jQuery('#seventhContainer').css('display','none');
		jQuery('#left-firstContainer').css('display','none');
		jQuery('#left-secondContainer').fadeIn(300);
		jQuery('#left-thirdContainer').css('display','none');
		jQuery('#left-fourthContainer').css('display','none');
		jQuery('#left-fifthContainer').css('display','none');
		jQuery('#left-sixthContainer').css('display','none');
		jQuery('#left-seventhContainer').css('display','none');
		jQuery('ul.tabbedNav li a.on').removeClass('on');
		jQuery('ul.tabbedNav li a#navSecond').addClass("on");
}

function showThird() {
		jQuery('#firstContainer').css('display','none');
		jQuery('#secondContainer').css('display','none');
		jQuery('#thirdContainer').fadeIn(300);
		jQuery('#fourthContainer').css('display','none');
		jQuery('#fifthContainer').css('display','none');
		jQuery('#sixthContainer').css('display','none');
		jQuery('#seventhContainer').css('display','none');
		jQuery('#left-firstContainer').css('display','none');
		jQuery('#left-secondContainer').css('display','none');
		jQuery('#left-thirdContainer').fadeIn(300);
		jQuery('#left-fourthContainer').css('display','none');
		jQuery('#left-fifthContainer').css('display','none');
		jQuery('#left-sixthContainer').css('display','none');
		jQuery('#left-seventhContainer').css('display','none');
		jQuery('ul.tabbedNav li a.on').removeClass('on');
		jQuery('ul.tabbedNav li a#navThird').addClass("on");
}

function showFourth() {
		jQuery('#firstContainer').css('display','none');
		jQuery('#secondContainer').css('display','none');
		jQuery('#thirdContainer').css('display','none');
		jQuery('#fourthContainer').fadeIn(300);
		jQuery('#fifthContainer').css('display','none');
		jQuery('#sixthContainer').css('display','none');
		jQuery('#seventhContainer').css('display','none');
		jQuery('#left-firstContainer').css('display','none');
		jQuery('#left-secondContainer').css('display','none');
		jQuery('#left-thirdContainer').css('display','none');
		jQuery('#left-fourthContainer').fadeIn(300);
		jQuery('#left-fifthContainer').css('display','none');
		jQuery('#left-sixthContainer').css('display','none');
		jQuery('#left-seventhContainer').css('display','none');
		jQuery('ul.tabbedNav li a.on').removeClass('on');
		jQuery('ul.tabbedNav li a#navFourth').addClass("on");
}

function showFifth() {
	    jQuery('#fourthContainer').css('display','none');
		jQuery('#firstContainer').css('display','none');
		jQuery('#secondContainer').css('display','none');
		jQuery('#thirdContainer').css('display','none');
		jQuery('#fifthContainer').fadeIn(300);
		jQuery('#sixthContainer').css('display','none');
		jQuery('#seventhContainer').css('display','none');
		jQuery('#left-fourthContainer').css('display','none');
		jQuery('#left-firstContainer').css('display','none');
		jQuery('#left-secondContainer').css('display','none');
		jQuery('#left-thirdContainer').css('display','none');
		jQuery('#left-fifthContainer').fadeIn(300);
		jQuery('#left-sixthContainer').css('display','none');
		jQuery('#left-seventhContainer').css('display','none');
		jQuery('ul.tabbedNav li a.on').removeClass('on');
		jQuery('ul.tabbedNav li a#navFifth').addClass("on");
}

function showSixth() {
	    jQuery('#fourthContainer').css('display','none');
		jQuery('#firstContainer').css('display','none');
		jQuery('#secondContainer').css('display','none');
		jQuery('#thirdContainer').css('display','none');
		jQuery('#fifthContainer').css('display','none');
		jQuery('#sixthContainer').fadeIn(300);
		jQuery('#seventhContainer').css('display','none');
		jQuery('#left-fourthContainer').css('display','none');
		jQuery('#left-firstContainer').css('display','none');
		jQuery('#left-secondContainer').css('display','none');
		jQuery('#left-thirdContainer').css('display','none');
		jQuery('#left-fifthContainer').css('display','none');
		jQuery('#left-sixthContainer').fadeIn(300);
		jQuery('#left-seventhContainer').css('display','none');
		jQuery('ul.tabbedNav li a.on').removeClass('on');
		jQuery('ul.tabbedNav li a#navSixth').addClass("on");
}

function showSeventh() {
	    jQuery('#fourthContainer').css('display','none');
		jQuery('#firstContainer').css('display','none');
		jQuery('#secondContainer').css('display','none');
		jQuery('#thirdContainer').css('display','none');
		jQuery('#fifthContainer').css('display','none');
		jQuery('#sixthContainer').css('display','none');
		jQuery('#seventhContainer').fadeIn(300);
		jQuery('#left-fourthContainer').css('display','none');
		jQuery('#left-firstContainer').css('display','none');
		jQuery('#left-secondContainer').css('display','none');
		jQuery('#left-thirdContainer').css('display','none');
		jQuery('#left-fifthContainer').css('display','none');
		jQuery('#left-seventhContainer').fadeIn(300);
		jQuery('#left-sixthContainer').css('display','none');
		jQuery('ul.tabbedNav li a.on').removeClass('on');
		jQuery('ul.tabbedNav li a#navSeventh').addClass("on");
}


// This function decodes the any string
// that's been encoded using URL encoding technique
function URLDecode(psEncodeString)
{
  // Create a regular expression to search all +s in the string
  var lsRegExp = /\+/g;
  // Return the decoded string
  return unescape(String(psEncodeString).replace(lsRegExp, " "));
}


	function getQueryVariable(variable) {
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0].toLowerCase()== variable.toLowerCase()) {
		  return URLDecode(pair[1]);
		}
	  }
	 //alert('Query Variable ' + variable + ' not found');
	}

var tab = getQueryVariable('tab');  // get the tab value



// if no query string in the url
if (tab == undefined || tab == ""){
}else {	
tab = tab.toUpperCase();
}
	
	
jQuery(document).ready(function() {
	jQuery('ul.tabbedNav li.nav-first').click(function() {
		showFirst();
	return false;
    });
	
	jQuery('ul.tabbedNav li.nav-second').click(function() {
		showSecond();
	return false;
    });	
	
	jQuery('ul.tabbedNav li.nav-third').click(function() {
		showThird();
	return false;
    });	
	
	jQuery('ul.tabbedNav li.nav-fourth').click(function() {
		showFourth();
	return false;
    });	
	
	jQuery('ul.tabbedNav li.nav-fifth').click(function() {
		showFifth();
	return false;
    });		
	
	jQuery('ul.tabbedNav li.nav-sixth').click(function() {
		showSixth();
	return false;
    });		
	
	jQuery('ul.tabbedNav li.nav-seventh').click(function() {
		showSeventh();
	return false;
    });	
	
	switch (tab){
		
			case "FIRST":
			showFirst();
			break;
	
			case "SECOND":
			showSecond();
			break;
			
			case "THIRD":
			showThird();
			break;
			
			case "FOURTH":
			showFourth();
			break;
			
			case "FIFTH":
			showFifth();
			break;
			
			case "SIXTH":
			showSixth();
			break;
			
			case "SEVENTH":
			showSeventh();
			break;
			
			default:
			showFirst();
			break;
		
		}
								
								
});