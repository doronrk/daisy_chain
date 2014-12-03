var newLinkForMonetateWF = "https://www.dillards.com/credit-services/main-splash";
setTimeout(function(){$("#account_payBill, #account_manageCard").attr("onclick", "").attr("href", newLinkForMonetateWF);}, 400);
window.retrieveMyDillardsLinksLogin = function retrieveMyDillardsLinksLogin() 
	 {
	 	var ajaxUrl = "/webapp/wcs/stores/servlet/MyDillardsLinkiFrameView?";
	 	ajaxUrl += "storeId=301&langId=-1&catalogId=301";

	  	$.ajax({			  		
			type: "GET",
			url: ajaxUrl, 
			dataType: "html",
			success: function(html){
				$("#myDillardsContentFloat .leftSide").html(html);
				$("#account_payBill, #account_manageCard").attr("onclick", "").attr("href", newLinkForMonetateWF);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$("#myDillardsContentFloat .leftSide").html("There was a problem submitting your request");
			}
	  	});
	  	
	 }

$(".my-account-block h2").each(function(){
  if($(this).text() == "Manage Your Dillard's Card" || $(this).text() == "Pay My Bill"){
    var parentA = $(this).parent("a");
    parentA.attr("href", newLinkForMonetateWF);
  }
});

$("#customer-service a").eq(0).attr("href", newLinkForMonetateWF);