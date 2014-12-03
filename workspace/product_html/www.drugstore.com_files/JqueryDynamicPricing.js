function getPrice(priceRequestList) {
	
	//	//-------------------------------------------------------------------------+
	//	// Create list of product ids in the form:                                  |
	//	// {"paramName1":"paramValue1","paramName2":"paramValue2"}                 |
	//	//-------------------------------------------------------------------------+	
	var productList = '';
	var elementList = '';
	var productIdList = '';
	if (priceRequestList.length > 0) {
		for (var i = 0; i < priceRequestList.length; i++) {
			if (productList.length > 0) {
				productList += '|';				
			}
			productList += priceRequestList[i].productId;			
		}												 
	}
	jQuery.ajax({
		url: "/products/ProductDynamicPricing.asp?pList=" + productList,
		async: true,
		success: function (data) {
			getRealPrice(data, priceRequestList);
		}
	});	

}
function getRealPrice(productPriceList, priceRequestList) {

	// get the response text, into a variable
	var realPrice = new Array();	
	realPrice = productPriceList.split("^^");
	for (i = 0; i < priceRequestList.length; i++) 
	{
		try 
		{
			document.getElementById(priceRequestList[i].elementId).innerHTML = realPrice[i];						
		}
		catch (e) { };
	}
	
};