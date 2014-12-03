
// Fixes for PowerReviews


// Fix review star size issue

var pr_stars;
var pr_checkerCounter = 0;

var pr_sortIndex = 0;
if (document.getElementById("sorter")) {
	pr_sortIndex = document.getElementById("sorter").selectedIndex;
}
var pr_oldContent;
pr_breakPlaced = false;
// used to address the review rating by index. 
pr_counter = 0;


function powerreviews_applyCustomFixes() { 
	
	if (jQuery("div.prStars").length == 0) {
		//window.setTimeout("powerreviews_applyCustomFixes()", 500);
	}
	
	jQuery("div.pr-stars").each(function() {
		
		var el = jQuery(this);
		
	
		var posXY = el.css('backgroundPosition');
		posY = parseInt(posXY.split(" ")[1]);
		
		var newValue = "0px 0px";
		if (posY == -138) {
		    newValue = "0px -144px";
		}
		
		
		
		newValue = powerreviews_getStarValue(posY);
		
		//alert(posXY + ' - ' + newValue);
		var dofix = false;
		
		if (dofix) {
			if (posY == -138) { 
				// Fix Firefox
				try {
					//el.style.backgroundPosition = newValue;
					el.css('backgroundPosition', newValue);
				}
				catch(e) {}
				
				// Fix I.E.:
				try {
					el.style.backgroundPosition = newValue;
					
				}
				catch(e) {}
			    //alert(el.css('backgroundPosition'));
			}
		}
		/*
		if ((el.parent().attr("className") !="_prSnippetRatingUnclickable" ) && (el.parent().attr("className") !="prSummaryRating")) {
			
				if (pr_stars) {
				  el.html("<span class='prRatingStarsText'>(" + pr_stars + ")</span>");
				}
			
		}*/
		
		// Fix for wrong histogram image path
		if( jQuery("#pr-snapshot-histogram img:last").length > 0 ) {
			jQuery("#pr-snapshot-histogram img:last")[0].src = powerreviewsHistogramIcon;
		}
	}); 
	
	var noOfRatings = jQuery(".pr-snippet-rating-decimal.pr-rounded").html();
	//noOfRatings = parseInt(noOfRatings);
	// noOfReviews is set at product.isml
	if (typeof noOfReviews != "undefined" && noOfReviews) {
	  noOfRatings = noOfReviews;
	  jQuery(".pr-snippet-rating-decimal.pr-rounded").html("("+noOfRatings+")");
	}
	
	// Move write review link:
	var writeLink = jQuery(".pr-snapshot-footer").html();
	
	var head = jQuery(".pr-snapshot-head-wrapper").html();
	jQuery(".pr-snapshot-head-wrapper").html(head + writeLink);
	jQuery(".pr-snapshot-footer").html("");
	
	jQuery(".pr-snapshot-title").html("REVIEWS SNAPSHOT &reg;");
	
	
	// legacy struff since here:
	
	return;
	
	//jQuery(".prReviewAuthorName a").css('display','none');
	
	jQuery(".prPagination span strong").css('font-weight','normal');
	if (document.getElementById('prSummaryWriteReviewId_R')) {
		var part = document.getElementById('prSummaryWriteReviewId_R').innerHTML;
		part = part.replace(/Already own it\?/g , "");
		document.getElementById('prSummaryWriteReviewId_R').innerHTML = part;
		/*
		jQuery(".prReviewHelpfulText").each(function() {
			part = jQuery(this).get(0);
			//alert(part.innerHTML);
		});
		*/ 
	}
	
	//var part = jQuery(this).get(0);
	if (document.getElementById('prReviewEngineDiv')) {
		var part = document.getElementById('prReviewEngineDiv').innerHTML; 
		part = part.replace(/Customers most agreed on the following attributes:/g,"");
		document.getElementById('prReviewEngineDiv').innerHTML = part;
	}
	try {
		jQuery(".prReviewPoints div.attributeGroup")[3].style.display="none";
		jQuery(".prReviewPoints div.attributeGroup")[4].style.display="none";
	
	// IE fix
	
		jQuery(".prReviewPoints div.attributeGroup")[3].css("display","none");
		jQuery(".prReviewPoints div.attributeGroup")[4].css("display","none");
	}
	catch(e) {}
	
	
	
	var el = jQuery("div.attributeGroup div.prSummaryKey").get(0);
	//alert(el.childNodes[0].innerHTML);
	
	try {
		el.style.color="#6CA244";
		el.style.fontWeight="bold";
		el.style.paddingBottom="3px";
		el.style.borderBottom="1px solid grey";
		
		el.css("color" , "#6C244");
		el.css("fontWeight" , "bold");
		el.css("paddingBottom","3px");
		el.css("borderBottom","1px solid grey");
	}
	catch(e) {}
	
	var el = jQuery("div.attributeGroup div.prSummaryKey").get(1);
	try {
		el.style.color="#B11731";
		el.style.fontWeight="bold";
		el.style.paddingBottom="3px";
		el.style.borderBottom="1px solid grey";
		
		el.css("color" , "#B11731");
		el.css("fontWeight" , "bold");
		el.css("paddingBottom","3px");
		el.css("borderBottom","1px solid grey");
	}
	catch(e) {}
	
	var el = jQuery("div.attributeGroup div.prSummaryKey").get(2);
	try {
		el.style.color="#503019";
		el.style.fontWeight="bold";
		el.style.paddingBottom="3px";
		el.style.borderBottom="1px solid grey";
		
		el.css("color" , "#503019");
		el.css("fontWeight" , "bold");
		el.css("paddingBottom","3px");
		el.css("borderBottom´","1px solid grey");
	}
	catch(e) {}
	
	
	jQuery(".prReviewPoints div.attributeGroup .prSummaryValue").each(function() {
		var text = jQuery(this).html();
		text = text.replace(/,/g,"<br />");
		//alert(text.indexOf("<br>"));
		if (text.indexOf("<br>") != 0) {
			
			if (pr_breakPlaced == false) {
				jQuery(this).html("<br><br>" + text);
				
			}
	     }
		else {
			jQuery(this).html(text);
		}
	});
	
	 
	
    // Move the write review link:
	var partEl = document.getElementById('prSummaryWriteReviewId_R');
	try {
		var el = getElementsByClass("prSummaryHeader");
		var old = jQuery(".prSummaryHeader").html();
		//jQuery(this).html(partEl.innerHTML);
		el = el[0];
		var newtext = old + partEl.innerHTML;
		//alert(newtext);
		jQuery(".prSummaryHeader").html(newtext);
		partEl.innerHTML = "";
	} catch(e) {}
	
	
	// horizontal line at top pagination:
	el = jQuery(".prPagination")[0];
	
	try {
		el.style.borderBottom = "1px solid grey";
		el.css("border-bottom","1px solid grey");
	}
	catch(e) {}
	
	jQuery(".prReviewWrap p.preReviewHelpfulText").html("Product Reviews Snapshot &reg;");
	                                   
	//el.innerHTML = "Product Reviews Snapshot &reg;";
	
	// 1 of 1 customers:
	jQuery(".prReviewWrap p.prReviewHelpfulText").each(function() {
	  var el = jQuery(this).get(0);
	  var newtext = el.innerHTML.replace(/\[/g,"");
	  newtext = newtext.replace(/\]/g,"");
	  var t = newtext.split(" ");
	  var start = newtext.indexOf(">");
	  
	  el.innerHTML = newtext;
		
	}); 
	 
	// Apply additional events
	//alert(jQuery("select").length);
	if (jQuery("#pdpReviewsTab select").length == 0) {
	 // alert('Can not apply change event');
	}
	
	// only use this binding in select boxes which
	// are inside of the pdpReviewsTag on products.isml
	jQuery("#pdpReviewsTab select").bind("change", function(e) {
		
		pr_sortIndex = document.getElementById("sorter").selectedIndex; 
		window.setTimeout("pr_checkSortIndex()",0);
	});
	
	// Apply additional events
	jQuery(".prPageNav").bind("click", function(e) {
		
		if (document.getElementById("sorter")) {
			pr_sortIndex = document.getElementById("sorter").selectedIndex; 
			window.setTimeout("pr_checkSortIndex()",0);
		}
	});
	if (document.getElementById("sorter")) {
	       document.getElementById("sorter").selectedIndex = pr_sortIndex;
	   }
	// mark the current content:
	//var el = document.getElementById('prContents');
	var el = jQuery('.pr-review-engine')[0];
	if (el) {
		var p = document.createElement("p");
		p.setAttribute("id","checker_"+pr_checkerCounter);
		el.appendChild(p);
		pr_breakPlaced = true;
	}

}

function pr_checkSortIndex() {
	pr_sortIndex = document.getElementById("sorter").selectedIndex;
	if(document.getElementById("checker_"+pr_checkerCounter)) {
	   window.setTimeout("pr_checkSortIndex(),500")
	}
	else { 
		powerreviews_applyCustomFixes();
	}
	
	
}

function powerreviews_getStarValue(posY) {
	
	var newValue = null;
	if (posY == -36) {
		// 1 Star
		newValue = "0px -10px";
		pr_stars = 1;
	}
	
	if (posY == -72) {
		// 2 stars
		newValue = "0px -20px";
		pr_stars = 2;
	}
	if (posY == -108) {
		// 3 stars
		newValue = "0px -30px";
		pr_stars = 3;
	}
	if (posY == -144) {
		// 4 stars
		newValue = "0px -40px";
		pr_stars = 4;
	}
	
	if (posY == -184) {
		// 5 stars
		newValue = "0px -50px";
		pr_stars = 5;
	}
	return(newValue);
}

var powerreviews_last = null;

function powerreviews_startObserver() {
    
	var newcontent = null;
	
	//if (document.getElementById('prReviewEngineDiv')) {  
		//newcontent = document.getElementById('prReviewEngineDiv').innerHTML;
		powerreviews_applyCustomFixes();
		//pr_oldContent = document.getElementById('prReviewEngineDiv').innerHTML;
	//}
	//if (newcontent != pr_oldContent) {
	   //alert('changed');alert(newcontent);alert(pr_oldContent);
	   //pr_oldContent = newcontent;
	   
	   if (jQuery.browser.msie) {
	     // powerreviews_applyCustomFixes();
	   }
	   //window.setTimeout("powerreviews_startObserver()",2000);
	//}

}
// Helper Library
function getElementsByClass( searchClass, domNode, tagName) {
	
	if (domNode == null) {
	    domNode = window.document;
	 }
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i < tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) {
			el[j++] = tags[i];
			
		}
	}
	return el;
}
