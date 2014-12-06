$(document).ready(function(){
	var xmlHttpForAkamai;
	function createXMLHttpRequest() {
	    if (window.ActiveXObject) {
	    	xmlHttpForAkamai = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    else if (window.XMLHttpRequest) {
	    	xmlHttpForAkamai = new XMLHttpRequest();         
	    }
	}
	var isMultipleGiftsAllowed = $('#isMultipleGiftsAllowed').val();
        var isCollectionProduct = 'false';
	var isGetProduct = $('#isGetProduct').val();
	if($('#pwp_akamai_collection_offer_msg').text() != undefined && $('#pwp_akamai_collection_offer_msg').text() != null 
																	&& $('#pwp_akamai_collection_offer_msg').text() != ''){
		isCollectionProduct = 'true';
	}
	/*To remove the offer details when group completed and multiple Offer not allowed / if it is GET product to 
		remove offer details when group completed / if it is collection related BUY/GET product */
	if(isMultipleGiftsAllowed == 'false' || isGetProduct == 'true' || isCollectionProduct == 'true'){
		getMultipleAllowedFalseCartLineItemsInPDP();		
	}	
	var isMatrixPage = $('#isMatrixPage').val();
	//Start: Performance fix - Restricting the method (getMultipleAllowedFalseCartLineItems) call using below variable in PMP when no offers
	var offerAvailableInPMP = $('.gift_pur_label').text();
	//End: Performance fix - Restricting the method (getMultipleAllowedFalseCartLineItems) call using below variable in PMP when no offers
	if(isMatrixPage == 'true' && isMultipleGiftsAllowed == undefined && offerAvailableInPMP != undefined && offerAvailableInPMP != ''){
		getMultipleAllowedFalseCartLineItems();
	}
function getMultipleAllowedFalseCartLineItems(){
	createXMLHttpRequest();
	var url = "/common/gwppwp/displayGwpMultipleNotAllowedProducts.jsp?isMatrixPage=true";	
	xmlHttpForAkamai.open("GET", url, true);           
	xmlHttpForAkamai.onreadystatechange = displayProdListInMatrixPage;
	xmlHttpForAkamai.send(null);
}
function displayProdListInMatrixPage(){
if (xmlHttpForAkamai.readyState==4) {	
 var response = xmlHttpForAkamai.responseText;
	response = response.substring(response.indexOf("["));	 	
	var filteredList= response.replace(/^\s+|\s+$/g,'');
	filteredList = filteredList.replace("[","");
	filteredList = filteredList.replace("]","");
	filteredList= filteredList.split(','); 
	for(var i = 0, size = filteredList.length; i < size ; i++){
		var item = filteredList[i];
		item = item.replace(/^\s+|\s+$/g,'');		
		if(document.getElementById(item+'gift_pur_label') != undefined){
			document.getElementById(item+'gift_pur_label').innerHTML = "";
		}
		if(document.getElementById(item+'pwp_gift_pur_label') != undefined){
			document.getElementById(item+'pwp_gift_pur_label').innerHTML = "";
		}
		if(document.getElementById(item+'yourPriceFree') != undefined && document.getElementById(getItem+'yourPriceFree') != null){			
			document.getElementById(item+'yourPriceFree').style.display = 'none';
		}
	}
}
}
function getMultipleAllowedFalseCartLineItemsInPDP(){
	createXMLHttpRequest();
	var url = "/common/gwppwp/displayGwpMultipleNotAllowedProducts.jsp";	
	xmlHttpForAkamai.open("GET", url, true);           
	xmlHttpForAkamai.onreadystatechange = displayProdListInPDPPage;
	xmlHttpForAkamai.send(null);
}
function displayProdListInPDPPage(){
	if (xmlHttpForAkamai.readyState==4) {	
	 	var response = xmlHttpForAkamai.responseText;
	 	var productId=$("#add_to_bag_product_id").attr("value");	
		if(productId == undefined){
			productId = $("#productId_0").attr("value");	
		}
		if(productId.indexOf("T") != -1){
			productId = productId.replace("T",'');
		}
		response = response.substring(response.indexOf("["));	 	
	 	var filteredList= response.replace(/^\s+|\s+$/g,'');
	 	filteredList = filteredList.replace("[","");
		filteredList = filteredList.replace("]","");
		filteredList= filteredList.split(',');
		
		//if the no group completed items in cart and if current product is has not completed the group returning false.
		if(filteredList != '' && response.indexOf(productId) != -1){
			//START : removing the GWP/PWP offer related data when group is completed whose isMultipleAllowed is false.
			for(var i = 0, size = filteredList.length; i < size ; i++){
				var item = filteredList[i];
				item = item.replace(/^\s+|\s+$/g,'');
				if(document.getElementById('dynamic_akamai_offerMsg') != undefined){	
					document.getElementById('dynamic_akamai_offerMsg').innerHTML = '';
				}
				if(document.getElementById('dynamic_akamai_yourPrice_free') != undefined){	
					document.getElementById('dynamic_akamai_yourPrice_free').innerHTML = '';
				}
				if(document.getElementById('dynamic_akamai_yourPrice') != undefined){	
					document.getElementById('dynamic_akamai_yourPrice').innerHTML = '';
				}
				if(document.getElementById(item+'gift_product_name') != undefined && document.getElementById(item+'gift_product_name') != null){	
					document.getElementById(item+'gift_product_name').innerHTML = '';
				}
				if(document.getElementById(item+'gift_product_tabs') != undefined && document.getElementById(item+'gift_product_tabs') != null){
					document.getElementById(item+'gift_product_tabs').innerHTML = '';			
				}
				if(document.getElementById(item+'terms') != undefined && document.getElementById(item+'terms') != null){
					document.getElementById(item+'terms').innerHTML = '';	
					$('.gwp_product_terms').css("display","none");
				}
				if(document.getElementById(item+'pwp_label') != undefined && document.getElementById(item+'pwp_label') != null){
					document.getElementById(item+'pwp_label').innerHTML = '';			
				}
				if(document.getElementById(item+'pwp_get_label') != undefined && document.getElementById(item+'pwp_get_label') != null){	
					document.getElementById(item+'pwp_get_label').innerHTML = '';			
				}
				if(document.getElementById(item+'pwp_your_price') != undefined && document.getElementById(item+'pwp_your_price') != null){
					document.getElementById(item+'pwp_your_price').innerHTML = '';
					$('.your_get_price').empty();
					$('.your_price_lable').empty();
				}
				if(document.getElementById(item+'pwp_terms') != undefined && document.getElementById(item+'pwp_terms') != null){
					document.getElementById(item+'pwp_terms').innerHTML = '';
					$('.pwpTermssMargin').empty();
					$('.pwpTermssMargin').css("display","none");
				}
				//If the BUY or GET is collection products then removing the offer message when group completed.
			    if(document.getElementById('pwp_akamai_collection_offer_msg') != undefined){					
					document.getElementById('pwp_akamai_collection_offer_msg').innerHTML = "";
				}						
								
			}			
			//END : removing the GWP/PWP offer related data when group is completed whose isMultipleAllowed is false.				
			//START :  replacing the product image and alternative images display as like regular product
			$.ajax({
				url: '/common/gwppwp/gwp_pwp_product_detail_image.jsp',
				dataType: 'html',
				type: "GET",					
				data:{isProdHavingGWP:"false",isProdHavingPWP:"false",isQuickViewPage:"false",prodId:productId},
				success: function(data) {
					var alternativeViews = data;
		            if(document.getElementById('alternteImages_for_normal_product') != null){
						document.getElementById('alternteImages_for_normal_product').innerHTML =alternativeViews;
					}
				}
			});
			//END :  replacing the product image and alternative images display as like regular product
			//START :  replacing the addToBag as like regular product
			var commerceItem = document.getElementById('pdp_commerceItem').value;
			if(commerceItem == undefined || commerceItem == ''){
				//START : AddToBag replacement when group has completed when isMultipleAllowed is false.				
				var skuId = $(".add_to_bag_sku_id").attr("value");	
				if(skuId == undefined){
					skuId = $("#buy_product_skuId_0").attr("value");	
				}
				var quantity = $(".add_cart_quantity").attr("value");	
				$.ajax({
					url: '/common/gwppwp/dynamic_akamai_replacement_of_add_to_bag.jsp',
					dataType: 'html',
					type: "GET",					
					data:{prodId:productId,skuId:skuId,quantity:quantity},
					success: function(data) {
						var addToBag = data;
			            		if( $('#content').hasClass('pdp_c_content') !== true ){
							if(document.getElementById('product_addToBag') != null){
			            				//START :code modified for defect OF-250
								//document.getElementById('product_addToBag').innerHTML =addToBag;
								$('#product_addToBag').html(addToBag);
								//END :code modified for defect OF-250
							}
			            			else if(document.getElementById('gwp_Product_addToBag') != null){
			            				//Else block Added for defect ATG-4356
								$('#gwp_Product_addToBag').html(addToBag);
							}
						}
					}
				});
				//END : AddToBag replacement when group has completed when isMultipleAllowed is false.
			}
			//END :  replacing the addToBag as like regular product
		}	
	}
}
});
