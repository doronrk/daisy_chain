/* Utility JS functions for In Store Pickup feature */
/*
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/

/*function validateZipCode(zipCodeforPickUp, zipEmptyMsg, zipInvalidMsg, action, openIPop) {
	if(null != zipCodeforPickUp) {
		var zipCode = zipCodeforPickUp.value;
		
		// TODO: Apply Correct Validation Rules..
		if(zipCode.length == 5) {	
			if(openIPop!=undefined && openIPop){
				parent.AX_Pop('730','758','','','about:blank','inStore');
				document.getElementById("mainForm").target = "lPopFrameinStore";
				document.getElementById("mainForm").action = action;
				window.setTimeout('document.getElementById("mainForm").submit()',100);
			}
			else{
				document.getElementById("mainForm").action = action;
				document.getElementById("mainForm").submit();
			}
		} else {
			if(zipCode.length == 0) {
				alert(zipEmptyMsg);
			} else {
				alert(zipInvalidMsg);
			}
		}
	} else {
		alert(zipEmptyMsg);
	}
}*/
function validateZipCode(zipCodeforPickUp, zipEmptyMsg, zipInvalidMsg, action) {
				
		if(null != zipCodeforPickUp) {
			var zipCode = zipCodeforPickUp.value;

		var uszip = /^\d{5}([\-]\d{4})?$/;
		var canadazip = /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/;
		if(uszip.test(zipCode) || canadazip.test(zipCode)) {	
					// We need to populate values for Omniture Variables in case a new zip code is submitted on the Select A Store Page
					if(action == '/pickupinstore.do') {
						SendOmniInStore("SELECTSTORE","selectstore_pickupinstore",zipCode,zipCode);
					}
					// We need to populate values for Omniture Variables in case a new zip code is submitted on the Basket Page
					if(action == '/updateZipCode.do') {
						SendOmniInStore("SELECTSTORE","basket_pickupinstore",zipCode,zipCode);
					}
					// We need to populate values for Omniture Variables in case a new zip code is submitted on the Product Detail Page
					if(action == '/pickupinstore.do?from=detail') {
  						SendOmniInStore("DETAIL","detail_pickupinstore",zipCode,zipCode);
					}
					getStoreLatLngAndSubmit(action);

				//	document.getElementById("mainForm").action = action;
				//	document.getElementById("mainForm").submit();
					return true;
			} else {
				if(zipCode.length == 0) {
					//alert(zipEmptyMsg);
					showMessageBox(zipEmptyMsg);
					return false;
				} else {
					//alert(zipInvalidMsg);
					showMessageBox(zipInvalidMsg);
					return false;
				}
			}
		} else {
			showMessageBox(zipEmptyMsg);
			return false;
		}
}


function getStoreLatLngAndSubmit(action) {
var 	geocoder = new google.maps.Geocoder();
var address =jQuery("[name='zipCode']").val();
   geocoder.geocode({ 'address': address }, function(results, status) {
 if (status == google.maps.GeocoderStatus.OK) {
    var center =results[0].geometry.location;
	
	var lng =center.pb;
	var lat =center.ob;
	jQuery('#zipCodeLng').val(lng);
	jQuery('#zipCodeLat').val(lat);	
	document.getElementById("mainForm").action = action;
	document.getElementById("mainForm").submit();
  } else {
	  document.getElementById("mainForm").action = action;
	document.getElementById("mainForm").submit();
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function pickUpInStore_Clicked() {
	// Iterate over all the radio buttons and see if none is selected then show error message, do not proceed.
	var radioObjArray = document.getElementsByName("storeCode");
	var length = radioObjArray.length;
	var radioBtnSelected = false;
	//Send the store name instead of store code
	var selectStoreCode="";
	for(var counter = 0; counter < length; counter++) {
		if(radioObjArray[counter].checked == true) {
			radioBtnSelected = true;
			selectStoreCode =radioObjArray[counter].value;
			break;
		}
	}
	if(radioBtnSelected == true) {
		SendOmniInStore("SELECTEDSTORE","selectstore_pickupinstore",selectStoreCode);
		document.getElementById("mainForm").removeAttribute("onsubmit");
		document.getElementById("mainForm").action = "/addToStoreBasket.do";
		document.getElementById("mainForm").submit();
	} else {
		showMessageBox("Please select a store");
	}

}

function buyStorePickupItems(action) {
	var mainForm = document.getElementById("mainForm");
	var allWebItems = checkItems(mainForm);
	if(allWebItems == true) {
		// Show Error Message
		showMessageBox("Please select some item(s) for In-Store Pickup in order to proceed");
	} else {
		// Proceed to next page
		SendOmniInStore("BASKET","basket_pickupinstore");
		mainForm.action = action;
		mainForm.submit();
	}
	
}
function printPage() {
	window.print();
}

function purchaseOnline_Clicked() {
	document.getElementById("mainForm").removeAttribute("onsubmit");
	document.getElementById("mainForm").action = '/addToBasket.do';
	document.getElementById("mainForm").submit();
}

function submitIfEnterPressed(evt, noQtyMsg, noOptMsg, formName, zipEmptyMsg, zipInvalidMsg, action) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if ( charCode == 13) {
		MarketLive.P2P.validateProductSelection(noQtyMsg, noOptMsg, formName, 0, 3, true, zipEmptyMsg, zipInvalidMsg, action);
	}
}

function validateZipCodeIfEnterPressed(zipCodeforPickUp, zipEmptyMsg, zipInvalidMsg, action) {
			return validateZipCode(zipCodeforPickUp, zipEmptyMsg, zipInvalidMsg, action);		

}

function cancel_btn_clicked() {
	var earlier_page = "";
	var length = history.length;
	var counter = 1;
	var temp = 0;
	if(length > 0) {
		alert("Length is : "+length);
		do
		{
			alert("Counter : "+counter);
			alert("pickupinstore.do present in url of earlier page");
			temp = 0 - counter;
			earlier_page = history[temp];
			counter++
		}
		while (counter<=length && earlier_page.indexOf("pickupinstore.do") != -1);
		alert("earlier_page : "+earlier_page);
	}
}

function checkItems(mainForm) {
	// Iterate over all the items in the form
	// If any item is in-store, return false
	// else return true
//	alert(document.getElementsByName("storeCode").length);
	var length = document.getElementsByName("storeCode").length;
	var counter = 0;
	var selectObj;
	for(counter = 0; counter < length; counter++) {
		selectObj = document.getElementsByName("storeCode")[counter];
//		alert(selectObj.value);
		if(selectObj.value != "WebOrder") {
			return false;
		}
	}
	return true;
}
function showInStorePick(){
	var pickupstore = document.getElementById("pickupstore");
	pickupstore.style.display="";
		var pickupstore = document.getElementById("pickupstoreTxt");
	pickupstore.style.display="none";
}