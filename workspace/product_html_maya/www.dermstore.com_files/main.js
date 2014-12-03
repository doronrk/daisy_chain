<!-- redirect script for old SmartLash LPs -->
    

	var urlSplit = window.location.pathname.split('/');
	
	var slArray = new Array("11","12","13","15","16","17","18","19","20","22","23","24","28","39","43","56","61","80","82","117","143","144","149","150","151","153","205","207","210","212","215","217","219","222","223","224","255","265","288","303","305","307","344", "354","356", "366","368", "394","397", "419","421", "427","429", "439","454", "456","458", "460","462", "464","484", "498","577", "613", "625","626", "678","680", "701","703", "722","728", "744","752", "755","757", "759", "761","769", "771","773","775","806","813","815","818","826","861","963","964","971","1006","1035","1048","1171","1175","1177","1840");
	
	var slArray2 = new Array ("57","62","83","152","154","206","208","211","213","216","218","220","256","289","304","306","308","345","355","357","367","369","395","398","420","422","428","430","440","455","457","459","461","463","465","485","500","579","616","627","679","681","702","704","723","729","745","753","756","758","760", "762","770", "772","774","776","807","814","816","819","827","862","972","1007","1036","1049","1172","1176","1178","1841");

	for(var i=0; i<slArray.length; i++) {
		if (slArray[i] == urlSplit[2]) {
			window.location.pathname = "/lp/2236";
		};
	}
	
	for(var m=0; m<slArray2.length; m++) {
		if (slArray2[m] == urlSplit[2]) {
			window.location.pathname = "/lp/2238";
		};
	}
    
<!-- END redirect script for old SmartLash LPs -->

<!-- dataLayer variable for google tag manager -->

dataLayer = [];

<!-- end dataLayer variable for google tag manager -->

function openPopup(theURL,winName,features) {
  window.open(theURL,winName,features);
}
function switchChildName(newChildName) {
	$("#child_name").html(newChildName);
}


/** if browser is IE10 or less, add class **/

if ($.browser.msie && $.browser.version == 10) {
  $("html").addClass("ie10");
}

/** end if browser is IE10 or less, add class **/


$(document).ready(function() {
		  
	/** Start Brands Nav Scroll **/
	
	var brandsHeight = jQuery("#brandScroll ul").height();
	
	if (brandsHeight < 350) {
		$("#viewMoreBtn").hide();
		$("#viewLessBtn").hide();
		$("#brandScroll").css('height','auto');
	}
	  
	  jQuery("#viewMoreBtn").click(function(){
			jQuery(this).css('display','none');
			jQuery("#viewLessBtn").css('display','block');
			jQuery("#brandScroll").animate	({
										 height:brandsHeight
										 },1000,function(){});
			
		});
		jQuery("#viewLessBtn").click(function(){
			jQuery(this).css('display','none');
			jQuery("#viewMoreBtn").css('display','block');	
			jQuery("#brandScroll").animate	({
										 height:'350px'
										 },1000,function(){});
		});
		
	/** End Brands Nav Scroll **/	
	
	/** View Transcript Button in Extend Pages **/
	$('#viewTransBtn').click(function(e) {
	e.preventDefault();
	  $('#transcriptBox').slideToggle('slow', function() {
	$('#viewTransBtn').html($(this).is(':visible') ? "Close Transcript &#171;" : "View Transcript &#187;");
	  });
	});
	/** End View Transcript Button in Extend Pages **/
	  
	  // fix youtube embed z-index issue in extended video content
	  var frames = $(".extContentBox iframe");
		for (var i = 0; i < frames.length; i++) {
				src = frames[i].src;
				if(src.indexOf('embed') != -1) {
					if(src.indexOf('?') != -1) {
					frames[i].src += "&wmode=opaque";
					}else{
					frames[i].src += "?wmode=opaque";
					}
			}
		}
		
		var frames2 = $("iframe#vidar");
		for (var i = 0; i < frames2.length; i++) {
				src = frames2[i].src;
				if(src.indexOf('embed') != -1) {
					if(src.indexOf('?') != -1) {
					frames2[i].src += "&wmode=opaque";
					}else{
					frames2[i].src += "?wmode=opaque";
					}
			}
		}
		
		var frames3 = $("#tab-video iframe");
		for (var i = 0; i < frames3.length; i++) {
				src = frames3[i].src;
				if(src.indexOf('embed') != -1) {
					if(src.indexOf('?') != -1) {
					frames3[i].src += "&wmode=opaque";
					}else{
					frames3[i].src += "?wmode=opaque";
					}
			}
		}
		
	 $("#vidar").height((Math.floor($("#vidar").width() * 9 / 16)));
	 /**
	 $('#countdownBox').html('<span style="display:inline-block;"><img src="//media.dermstore.com/images/header/icon-bca.png" style="display:inline-block;margin:6px 7px 0 0;float:left;"><strong>Join us</strong> in the fight against breast cancer! <a href="/profile_BCA+Charity+Boutique+2013_502842.htm" style="color:#fcaeca;font-weight:bold;text-transform:uppercase;">Learn How &#187;</a></span>');
	 **/
	  
});  