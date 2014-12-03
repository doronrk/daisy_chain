//
//  BV Tab
//
$(document).ready(function(){
	var isAnASubmission = getUrlVars()["bvcontenttype"]
	//alert('isAnASubmission  = ' + isAnASubmission);
	if(isAnASubmission=='QUESTION_SUBMISSION') {
		showAnATab();
	} else {
		showRnRTab();
	}
	$('#main .BVDiv .BVtabs ul li a').click(function(){            // When any tab anchor is clicked
		$('#main .BVDiv .BVtabs ul li').removeClass('active');             // Remove active class from all links
    		$('#bvaskandanswer').hide();	// Hide all divs
		$('#bvcustomerreviews').hide();	
		$(this).parent().addClass('active');                             // Set clicked link class to active
		var currentTab = $(this).attr('href');                           // Set variable currentTab to value of href attribute of clicked link
		$(currentTab).show();                                   // Show the tab div with id equal to variable currentTab
		return false;
	});	
});
function showAnATab(){
		$('#main .BVDiv .BVtabs ul li').removeClass('active');             // Remove active class from all links
    		$('#bvaskandanswer').hide();	// Hide all divs
		$('#bvcustomerreviews').hide();	// Hide all divs
		$('#main .BVDiv .BVtabs ul li:last').addClass('active');
		//alert($('#main .BVDiv .BVtabs ul li:last').attr('class'));
    		$('#bvaskandanswer').show();
		//alert($('#bvaskandanswer').attr('class'));
	return false;
}
function showRnRTab(){
		$('#main .BVDiv .BVtabs ul li').removeClass('active');             // Remove active class from all links
    		$('#bvaskandanswer').hide();	// Hide all divs
		$('#bvcustomerreviews').hide();	// Hide all divs
		$('#main .BVDiv .BVtabs ul li:first').addClass('active');
    		$('#bvcustomerreviews').show();
	return false;
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
