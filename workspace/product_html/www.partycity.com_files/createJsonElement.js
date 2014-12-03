/*
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/

function submitJSONForm() {
	//alert('At start of createJson function');
	//alert(document.getElementById('mainForm').action);
	// If action is add to wish list
	if (document.getElementById('mainForm').action.indexOf('/wishlist/select.do') > 0)
	{
		//alert ('Action is add to wishlist');
		document.getElementById('mainForm').submit();
	}
	// This is add to basket action and we are now capturing all the input elements in json object
	else
	{
		var JSONObject = '{}';
	 	var productArray = document.getElementById('mainForm').productPk;
	 	var qtyArray = document.getElementById('mainForm').qty;
	 	var selectedKitArray = document.getElementById('mainForm').selectedKitItems;
	 	var optionArray = document.getElementById('mainForm').option;
	
	 	var detailObject = new Object;
	 	var productObjArray = new Array();
	 	var qtyObjArray = new Array();
	 	var selectedObjKitArray = new Array();
	 	var optionObjKitArray = new Array();  
	
		// When this is family page, input elements will be as arrays.	
		if (productArray[0] != undefined)
		{
	 		for (var i = 0; i < qtyArray.length; i++){        
	  			if(qtyArray[i].value > 0) {
	  		 		var prodValue1 = productArray[i].value + "-" 
	  		 		+ qtyArray[i].value +"-" +optionArray[i].value;
	  				if(productObjArray.indexOf(prodValue1) == -1) {
		       		productObjArray.push(prodValue1);
					}
	  			}
	 		}
	 		detailObject.productArray = productObjArray;
	 	} 
	 	else {
	 		// In case of product detail page, input elements will not be as arrays
		 	var prodValue1 = productArray.value + "-" 
  		 		+ qtyArray.value +"-" +optionArray.value;
			
			detailObject.productArray = prodValue1;    
		}
		var jsonObject = JSON.stringify(detailObject);
		//alert("Final jsonObject with input elements is = "+jsonObject);
		document.getElementById('jsonForm').json.value = jsonObject;
		//document.getElementById('jsonForm').submit();
		var jsonForm = document.getElementById('jsonForm');
		var action = '/addToBasketCustom.do?method=addtobasket';
		submitAddToBasketRequest(jsonForm,action);
	}
}

function submitAddToBasketRequest(form, action){

	showWaiting();
	var actionUrl= action +"&r=" + Math.random();
	setTimeout( function() {
		jQuery.ajax({
			type: "POST",
			url: actionUrl,
			data: $(form).serialize(),
			success: function(data){
				fireReporting();
				top.refreshGlobalCart();
				hideWaiting();
			  	if(! isStockAvailablityPage(data)){
					top.resetQTY();
					//top.showGlobalBasket();
					//sessionStorage.removeItem("p2pSourceInfo");
				}
				hitIfPersonalizationPage(data);
				sessionStorage.removeItem("tealiumContentBasketSource");
				
			},
			error: function(e){
				hideWaiting();
			}
		});},3000);

}

function isStockAvailablityPage(data){
	var status = data.split(':');
	if(status[0]!='' && status[0]=='STOCKAVAILABILITY'){
		var source = status[1];
		PC_Pop('584','700','','',source,'','','','auto',false);
		return true;
	}
	return false;
}

function hitIfPersonalizationPage(data){
	var status = data.split(':');
	if(status[0]!='' && status[0]=='PERSONALIZATION'){
		var source = status[1];
		jQuery.ajax({
			type: "POST",
			url: source,
			success: function(data){
				top.resetQTY();
			},
			error: function(e){
				console.log("Error in updating personalization")
			}
		});
		return true;
	}
	return false;
}

function showWaiting(){

	var options = {
			message: '',
			css: { 
				border: 'none', 
				padding: '25px', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: .8, 
				color: '#8B7DD5',
				fontWeight: 'bold',
				fontSize: '25px'
			}
		};

	MarketLive.blockUI(options);
}
function fireReporting() {
	jQuery.get("/reporting.do?ajaxLoad=true&parentReq=addToBasket.do", function(data) {

		//jQuery("#a2bReporting").html(data);
		document.getElementById('a2bReporting').innerHTML = data;
	});

	jQuery.get("/tealiumReporting.do?ajaxLoad=true&fn=logAddToBasket", function(data) {
	data = data.replace('<script>','');
	data = data.replace('</script>','');
	script = document.createElement("script");
    script.type = "text/javascript";
    try {
      script.appendChild(document.createTextNode(data));      
    } catch(e) {
      script.text = data;
    }
	head = document.getElementsByTagName("head")[0];
    head.insertBefore(script, head.firstChild);
    head.removeChild(script);
	});
}

function hideWaiting(){
	MarketLive.unblockUI();
}