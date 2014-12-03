function findInStoreButtonClick(){
	var skuId=$('#findInStoreSkuId').val();
	var productId=$('#findInStoreProductId').val();
	var qtyId="#"+skuId+"QtyId";
	var productQty=$(qtyId).val();
	var quantity=1;
	if(productQty!=null && productQty!=0 &&productQty!=""){
		quantity=productQty;
	}
	var pdpColor=$('#colorselection').val();
	var pdpSize=$('#sizeselection').val();
	var quickViewColor=$('#colorselection_quickview').val();
	var quickViewSize=$('#sizeselection_quickview').val();
	var selectedcolor="";
	var selectedsize="";
	if(pdpColor !=null && pdpColor !='undefined'){
		selectedcolor=pdpColor;
	}
	if(pdpSize !=null && pdpSize !='undefined'){
		selectedsize=pdpSize;
	}
	if(quickViewColor !=null && quickViewColor !='undefined'){
		selectedcolor=quickViewColor;
	}
	if(quickViewSize !=null && quickViewSize !='undefined'){
		selectedsize=quickViewSize;
	}
	if(quantity==null||quantity==""){
		quantity="1";
	}
	
	var atsZipCodeCookie=getCookie("ATS_ZIPCODE");
	var atsDistanceCookie=getCookie("ATS_DISTANCE");
	
	if((atsZipCodeCookie!=null && atsZipCodeCookie.trim()!="") && (atsDistanceCookie !=null && atsDistanceCookie.trim()!="")) {
		var zipcode = atsZipCodeCookie;
		var distance = atsDistanceCookie;
		var searchType="LIMITED_DISTANCE";
		$.ajax({
	        type: 'POST',
	        url: contextPath + '/browse/include/toolbarBottons/reserveInStore/findStoreSearchResults.jsp',
	        data: {
				'skuId': skuId,
				'productId': productId,
				'quantity': quantity,
				'size' : selectedsize,
				'color' : selectedcolor,
				'zipcode' : zipcode,
				'distance' : distance,
				'searchType' : searchType
			},
			beforeSend: function (){
				$('#findInStoreSectionwaitingBtn').show();
				$('#findInStoreSection').hide();
			},
	        success: function (data) {
				$('#findInStoreResultsContainer').html(data);
				setResultsContainerPosition();
				$('#findInStoreResultsContainer').show();
				$('#findInStoreSectionwaitingBtn').hide();
				$('#findInStoreSection').show();
				if(atsZipCodeCookie!=null && atsZipCodeCookie.trim()!=""){
					deleteCookie("ATS_ZIPCODE");
				}
				if(atsDistanceCookie!=null && atsDistanceCookie.trim()!=null){
					deleteCookie("ATS_DISTANCE");
				}
				// GA tagging
				ga('send','event','form','submit','People who used Find in Store');

		},
		
		complete:function(data){
			setCookie("ATS_ZIPCODE",zipcode,365);
			setCookie("ATS_DISTANCE",distance,365);
		}
	});

		
	}
	else {

		$.ajax({
			url: contextPath + '/browse/include/toolbarBottons/reserveInStore/findStoreLandingPage.jsp',
			type: 'get',
			cache: false,
			data: {
				'skuId': skuId,
				'productId': productId,
				'quantity': quantity,
				'size' : selectedsize,
				'color' : selectedcolor
			},
			beforeSend: function (){
				$('#findInStoreSectionwaitingBtn').show();
				$('#findInStoreSection').hide();
			},
			success: function(data) {
				
				$('#findInStoreFormContainer').html(data);
				$('#findInStoreFormContainer').show();
				$('#findInStoreResultsContainer').hide();
				$('#findInStoreSectionwaitingBtn').hide();
				$('#findInStoreSection').show();
			}
		});
	}

	return false;
}	

function findInStoreZipCodeEdit(){
	
	var productId=$('#findInStoreResultsProductId').val();
	var zipcode=$('#findInStoreResultsZipcodeId').val();
	var distance=$('#findInStoreResultsDistanceId').val();
	var searchType=$('#findInStoreResultsSearchTypeId').val();
	var skuId=$('#findInStoreResultsSkuId').val();
	var quantity=$('#findInStoresResults_optionsQuantity').val();
	// save color or size selection before submitting form
	var color = $('#findStoreColorSelection option[selected="selected"]').val();
	var size = $('#findStoreSizeSelection option[selected="selected"]').val();
	
	if(quantity==''||quantity==0||quantity==null){
		quantity=1;
	}
	
	$.ajax({
		url: contextPath + '/browse/include/toolbarBottons/reserveInStore/findStoreLandingPage.jsp',
		type: 'get',
		cache: false,
		data: {
			'skuId': skuId,
			'productId': productId,
			'quantity': quantity,
			'size' : size,
			'color' : color,
			'zipcode' : zipcode,
			'distance' : distance,
			'searchType' : searchType
		},
		beforeSend: function (){
			$('#findInStorewaitingBtn').show();
		},
		success: function(data) {
			
			$('#findInStoreFormContainer').html(data);
			$('#findInStoreFormContainer').show();
			$('#findInStoreResultsContainer').hide();
			$('#findInStoreSectionwaitingBtn').hide();
			$('#findInStoreSection').show();
		}
	});
	
	return false;
	
	
}

function findInStoreCheckAvailability() {
	
	var skuId=$('#findInStoreSkuId').val();
	var productId=$('#findInStoreProductId').val();
	var qtyId="#"+skuId+"QtyId";
	var productQty=$(qtyId).val();
	var quantity=1;
	if(productQty!=null && productQty!=0){
		quantity=productQty;
	}
	var pdpColor=$('#colorselection').val();
	var pdpSize=$('#sizeselection').val();
	var quickViewColor=$('#colorselection_quickview').val();
	var quickViewSize=$('#sizeselection_quickview').val();
	if(quantity==null||quantity==""){
		quantity="1";
	}
	var selectedcolor="";
	var selectedsize="";
	
	if(pdpColor !=null && pdpColor !='undefined'){
		selectedcolor=pdpColor;
	}
	
	if(pdpSize !=null && pdpSize !='undefined'){
		selectedsize=pdpSize;
	}
	
	if(quickViewColor !=null && quickViewColor !='undefined'){
		selectedcolor=quickViewColor;
	}
	
	if(quickViewSize !=null && quickViewSize !='undefined'){
		selectedsize=quickViewSize;
	}
	
	var zipCode= $('#findInStoreCheckAvailabilityzipcode').val();
	var distance=$('#findInStoreCheckAvailabilitydistance').val();
	var searchType="LIMITED_DISTANCE";
	
	
	
	$.ajax({
        type: 'POST',
        url: contextPath + '/browse/include/toolbarBottons/reserveInStore/findStoreSearchResults.jsp',
        data: {
			'skuId': skuId,
			'productId': productId,
			'quantity': quantity,
			'size' : selectedsize,
			'color' : selectedcolor,
			'zipcode' : zipCode,
			'distance' : distance,
			'searchType' : searchType
		},
		beforeSend: function (){
			$('#findInStoreSectionwaitingBtn').show();
			$('#findInStoreSection').hide();
		},
        success: function (data) {
			$('#findInStoreResultsContainer').html(data);
			setResultsContainerPosition();
			$('#findInStoreResultsContainer').show();
			$('#findInStoreSectionwaitingBtn').hide();
			$('#findInStoreSection').show();
			var atsZipCodeCookie=getCookie("ATS_ZIPCODE");
			var atsDistanceCookie=getCookie("ATS_DISTANCE");
			if(atsZipCodeCookie!=null && atsZipCodeCookie.trim()!=""){
				deleteCookie("ATS_ZIPCODE");
			}
			if(atsDistanceCookie !=null && atsDistanceCookie.trim()!=""){
				deleteCookie("ATS_DISTANCE");
			}
			// GA tagging
			ga('send','event','form','submit','People who used Find in Store');

	},
	
	complete:function(data){
		setCookie("ATS_ZIPCODE",zipCode,365);
		setCookie("ATS_DISTANCE",distance,365);
	}
});

	return false;
}

function findInStoreCheckAvailabilityPDP() {
	
	var skuId=$('#findInStoreSkuId').val();
	var productId=$('#findInStoreProductId').val();
	var qtyId="#"+skuId+"QtyId";
	var productQty=$(qtyId).val();
	var quantity=1;
	if(productQty!=null && productQty!=0){
		quantity=productQty;
	}
	var color=$('#colorselection').val();
	var size=$('#sizeselection').val();
	var quickViewColor=$('#colorselection_quickview').val();
	var quickViewSize=$('#sizeselection_quickview').val();
	if(quantity==null||quantity==""){
		quantity="1";
	}
	var selectedcolor="";
	var selectedsize="";
	
	if(pdpColor !=null && pdpColor !='undefined'){
		selectedcolor=pdpColor;
	}
	
	if(pdpSize !=null && pdpSize !='undefined'){
		selectedsize=pdpSize;
	}
	
	if(quickViewColor !=null && quickViewColor !='undefined'){
		selectedcolor=quickViewColor;
	}
	
	if(quickViewSize !=null && quickViewSize !='undefined'){
		selectedsize=quickViewSize;
	}
	
	var zipCode= $('#findInStoreCheckAvailabilityzipcode').val();
	var distance=$('#findInStoreCheckAvailabilitydistance').val();
	var searchType="LIMITED_DISTANCE";
	
	
	
	$.ajax({
        type: 'POST',
        url: contextPath + '/browse/include/toolbarBottons/reserveInStore/findStoreSearchResults.jsp',
        data: {
			'skuId': skuId,
			'productId': productId,
			'quantity': quantity,
			'size' : selectedsize,
			'color' : selectedcolor,
			'zipcode' : zipCode,
			'distance' : distance,
			'searchType' : searchType
		},
        success: function (data) {
			$('#findInStoreResultsContainer').html(data);
			setResultsContainerPosition();
			$('#findInStoreResultsContainer').show();
			var atsZipCodeCookie=getCookie("ATS_ZIPCODE");
			var atsDistanceCookie=getCookie("ATS_DISTANCE");
			if(atsZipCodeCookie!=null && atsZipCodeCookie.trim()!=""){
				deleteCookie("ATS_ZIPCODE");
			}
			if(atsDistanceCookie !=null && atsDistanceCookie.trim()!=""){
				deleteCookie("ATS_DISTANCE");
			}
			// GA tagging
			ga('send','event','form','submit','People who used Find in Store');

	},
	
	complete:function(data){
		setCookie("ATS_ZIPCODE",zipcode,365);
		setCookie("ATS_DISTANCE",distance,365);
	}
});

	return false;
}

function findInStoreCheckAvailabilityQuickView() {
	
	var skuId=$('#findInStoreSkuId').val();
	var productId=$('#findInStoreProductId').val();
	var qtyId="#"+skuId+"QtyId";
	var productQty=$(qtyId).val();
	var quantity=1;
	if(productQty!=null && productQty!=0){
		quantity=productQty;
	}
	var color=$('#colorselection').val();
	var size=$('#sizeselection').val();
	var quickViewColor=$('#colorselection_quickview').val();
	var quickViewSize=$('#sizeselection_quickview').val();
	if(quantity==null||quantity==""||quantity==0){
		quantity="1";
	}
	var selectedcolor="";
	var selectedsize="";
	
	if(pdpColor !=null && pdpColor !='undefined'){
		selectedcolor=pdpColor;
	}
	
	if(pdpSize !=null && pdpSize !='undefined'){
		selectedsize=pdpSize;
	}
	
	if(quickViewColor !=null && quickViewColor !='undefined'){
		selectedcolor=quickViewColor;
	}
	
	if(quickViewSize !=null && quickViewSize !='undefined'){
		selectedsize=quickViewSize;
	}
	
	var zipCode= $('#findInStoreCheckAvailabilityzipcode').val();
	var distance=$('#findInStoreCheckAvailabilitydistance').val();
	var searchType="LIMITED_DISTANCE";
	
	
	
	$.ajax({
        type: 'POST',
        url: contextPath + '/browse/include/toolbarBottons/reserveInStore/findStoreSearchResults.jsp',
        data: {
			'skuId': skuId,
			'productId': productId,
			'quantity': quantity,
			'size' : selectedsize,
			'color' : selectedcolor,
			'zipcode' : zipCode,
			'distance' : distance,
			'searchType' : searchType
		},
        success: function (data) {
			$('#findInStoreResultsContainer').html(data);
			setResultsContainerPosition();
			$('#findInStoreResultsContainer').show();
			var atsZipCodeCookie=getCookie("ATS_ZIPCODE");
			var atsDistanceCookie=getCookie("ATS_DISTANCE");
			if(atsZipCodeCookie!=null && atsZipCodeCookie.trim()!=""){
				deleteCookie("ATS_ZIPCODE");
			}
			if(atsDistanceCookie !=null && atsDistanceCookie.trim()!=""){
				deleteCookie("ATS_DISTANCE");
			}
			// GA tagging
			ga('send','event','form','submit','People who used Find in Store');

	},
	
	complete:function(data){
		setCookie("ATS_ZIPCODE",zipcode,365);
		setCookie("ATS_DISTANCE",distance,365);
	}
});

	return false;
}

function findInStoreCloseButtonClick(){
	 $('#findInStoreFormContainer').hide();
     $('#findInStoreResultsContainer').hide();
     $('#findInStoreFormContainer').hide();
     $('#findInStoreResultsContainer').hide();
     var skuId=$('#findInStoreSkuId').val();
 	var productId=$('#findInStoreProductId').val();
 	if(skuId==null||skuId==""){
 		skuId="";
 	}
 	var qtyId="#"+skuId+"QtyId";
 	var productQty=$(qtyId).val();
 	var quantity=1;
 	if(productQty!=null && productQty!=0){
 		quantity=productQty;
 	}
 	if(quantity==null||quantity==""||quantity==0){
 		quantity="1";
 	}
      $("#findInStoreContainer").load(
     	 contextPath+'/browse/include/toolbarBottons/reserveInStore/findStore.jsp',
     	 {
     		 'skuId' : skuId,
     		 'productId' : productId,
     		 'quantity' : quantity
     	 }
      );

	return false;
}
function findInStoreSubmitClick(){
    $('#findInStoreFormContainer').hide();
    setResultsContainerPosition();
    $('#findInStoreResultsContainer').show();
}

function findInStoreResultsLocationEditClick(){
	 $('#findInStoreFormContainer').show();
     $('#findInStoreResultsContainer').hide();
}

function findInStoreResultsQuantityEditClick(){
	if($('#findInStoresResults_optionsQuantity').prop('disabled')) {
        $('#findInStoresResults_optionsQuantity').prop("disabled", false);
        $('#findInStoresResults_optionsQuantityEdit').hide();
        $('#findInStoresResults_optionsQuantitySave').show();
    } else {
        $('#findInStoresResults_optionsQuantity').prop("disabled", true);
        $('#findInStoresResults_optionsQuantityEdit').show();
        $('#findInStoresResults_optionsQuantitySave').hide();
    }

	return false;
}

function findInStoreResultsQuantitySaveClick(){
	var productId=$('#findInStoreResultsProductId').val();
	var zipcode=$('#findInStoreResultsZipcodeId').val();
	var distance=$('#findInStoreResultsDistanceId').val();
	var searchType=$('#findInStoreResultsSearchTypeId').val();
	var skuId=$('#findInStoreResultsSkuId').val();
	var quantity=$('#findInStoresResults_optionsQuantity').val();
	if(quantity==''||quantity==0||quantity==null){
		quantity=1;
	}

	// save color or size selection before submitting form
	var color = $('#findStoreColorSelection option[selected="selected"]').val();
	var size = $('#findStoreSizeSelection option[selected="selected"]').val();

		$.ajax({
            type: 'POST',
            url: contextPath + '/browse/include/toolbarBottons/reserveInStore/findStoreSearchResults.jsp',
            data: {
				'skuId': skuId,
				'productId': productId,
				'quantity': quantity,
				'size' : size,
				'color' : color,
				'zipcode' : zipcode,
				'distance' : distance,
				'searchType' : searchType
			},
			beforeSend: function (){
				$('#findInStorewaitingBtn').show();
				$('#findInStoreResults_locations').hide();
			},
            success: function (data) {
					$('#findInStoreResultsContainer').html(data);
					setResultsContainerPosition();
					$('#findInStoreResultsContainer').show();
					$('#findInStoreResults_locations').show();
					$('#findInStorewaitingBtn').hide();
					var atsZipCodeCookie=getCookie("ATS_ZIPCODE");
					var atsDistanceCookie=getCookie("ATS_DISTANCE");
					if(atsZipCodeCookie!=null && atsZipCodeCookie.trim()!=""){
						deleteCookie("ATS_ZIPCODE");
					}
					if(atsDistanceCookie !=null && atsDistanceCookie.trim()!=""){
						deleteCookie("ATS_DISTANCE");
					}
					// GA tagging
					ga('send','event','form','submit','People who used Find in Store');

			},
			
			complete:function(data){
				setCookie("ATS_ZIPCODE",zipcode,365);
				setCookie("ATS_DISTANCE",distance,365);
			}
        });

	return false;
}

function findStoreChooseSizeOption(){
	var productId=$('#findInStoreResultsProductId').val();
	var zipcode=$('#findInStoreResultsZipcodeId').val();
	var distance=$('#findInStoreResultsDistanceId').val();
	var searchType=$('#findInStoreResultsSearchTypeId').val();
	var quantity=$('#findInStoresResults_optionsQuantity').val();
	var size = $('#findStoreSizeSelection').val();
	if(quantity==''||quantity==0||quantity==null){
		quantity=1;
	}

		$.ajax({
            type: 'POST',
            url: contextPath + '/browse/include/toolbarBottons/reserveInStore/findStoreSearchResults.jsp',
            data: {
				'productId': productId,
				'quantity': quantity,
				'size' : size,
				'zipcode' : zipcode,
				'distance' : distance,
				'searchType' : searchType
			},
			beforeSend: function (){
				$('#findInStorewaitingBtn').show();
				$('#findInStoreResults_locations').hide();
			},
            success: function (data) {
					$('#findInStoreResultsContainer').html(data);
					setResultsContainerPosition();
					$('#findInStoreResultsContainer').show();
					$('#findInStorewaitingBtn').hide();
					$('#findInStoreResults_locations').show();
					var atsZipCodeCookie=getCookie("ATS_ZIPCODE");
					var atsDistanceCookie=getCookie("ATS_DISTANCE");
					if(atsZipCodeCookie!=null && atsZipCodeCookie.trim()!=""){
						deleteCookie("ATS_ZIPCODE");
					}
					if(atsDistanceCookie !=null && atsDistanceCookie.trim()!=""){
						deleteCookie("ATS_DISTANCE");
					}
					// GA tagging
					ga('send','event','form','submit','People who used Find in Store');

			},
			
			complete:function(data){
				setCookie("ATS_ZIPCODE",zipcode,365);
				setCookie("ATS_DISTANCE",distance,365);
			}
        });

	return false;
}

function findStoreChooseColorOption(){
	var productId=$('#findInStoreResultsProductId').val();
	var zipcode=$('#findInStoreResultsZipcodeId').val();
	var distance=$('#findInStoreResultsDistanceId').val();
	var searchType=$('#findInStoreResultsSearchTypeId').val();
	var quantity=$('#findInStoresResults_optionsQuantity').val();
	var color = $('#findStoreColorSelection').val();
	if(quantity==''||quantity==0||quantity==null){
		quantity=1;
	}

		$.ajax({
            type: 'POST',
            url: contextPath + '/browse/include/toolbarBottons/reserveInStore/findStoreSearchResults.jsp',
            data: {
				'productId': productId,
				'quantity': quantity,
				'color' : color,
				'zipcode' : zipcode,
				'distance' : distance,
				'searchType' : searchType
			},
			beforeSend: function (){
				$('#findInStorewaitingBtn').show();
				$('#findInStoreResults_locations').hide();
			},
            success: function (data) {
					$('#findInStoreResultsContainer').html(data);
					setResultsContainerPosition();
					$('#findInStoreResultsContainer').show();
					$('#findInStorewaitingBtn').hide();
					$('#findInStoreResults_locations').show();
					var atsZipCodeCookie=getCookie("ATS_ZIPCODE");
					var atsDistanceCookie=getCookie("ATS_DISTANCE");
					if(atsZipCodeCookie!=null && atsZipCodeCookie.trim()!=""){
						deleteCookie("ATS_ZIPCODE");
					}
					if(atsDistanceCookie !=null && atsDistanceCookie.trim()!=""){
						deleteCookie("ATS_DISTANCE");
					}
					// GA tagging
					ga('send','event','form','submit','People who used Find in Store');

			},
			
			complete:function(data){
				setCookie("ATS_ZIPCODE",zipcode,365);
				setCookie("ATS_DISTANCE",distance,365);
			}
        });

	return false;
}

function findInStoreSearchSubmit(){
	var zipCode= $('#findInStoreFormZipCode').val();
	var distance=$('#findInStoreFormMiles').val();
	var validate=findInStoreZipCodeSearchValidator();
	var changedQuantity=$('#findInStoreLandingQuantity').val();
	var price=$('#productPriceValue').html();
	var pdpColor=$('#colorselection').val();
	var pdpSize=$('#sizeselection').val();
	var quickViewColor=$('#colorselection_quickview').val();
	var quickViewSize=$('#sizeselection_quickview').val();
	var selectedcolor="nocolor";
	var selectedsize="nosize";
	if(validate!=0)
		return;
	
	var frm=$('#findInStoreForm');
		$.ajax({
            type: frm.attr('method'),
            url: frm.attr('action')+"&changedQuantity="+changedQuantity,
            data: frm.serialize(),
            beforeSend: function (){
				$('#findInStorelandingwaitingBtn').show();
				$('#findInStoreLandingFormSection').hide();
			},
            success: function (data) {
				try {
					$errorString=$(data);
					$errorNode=$errorString.find("Error");
					$statusNode=$errorString.find("Status");
					console.log("Error Node is: "+$errorNode.text());
					console.log("Status Node is: "+$statusNode.text());
				} catch(error) {
					console.log("Error in parsing error xml");
					console.log(error);
				}

				if($statusNode.text() == 'false') {
					// if xml returned, errors
					$('#findInStoreLandingFormSection').show();
					$('#findInStoreFormZipCodeError').html('<div class="findstore-error" style="margin-left: 20px;">' +$errorNode.text()+ '</div>');
					$('#findInStoreFormZipCodeError').show();
					$('#findInStorelandingwaitingBtn').hide();
				} else {
					$('#findInStoreFormContainer').hide();
					$('#findInStoreFormZipCodeError').hide();
					$('#findInStoreResultsContainer').html(data);
					setResultsContainerPosition();
					$('#findInStoreResultsContainer').show();
					$('#findInStoreLandingFormSection').show();
					$('#findInStorelandingwaitingBtn').hide();
					var atsZipCodeCookie=getCookie("ATS_ZIPCODE");
					var atsDistanceCookie=getCookie("ATS_DISTANCE");
					if(atsZipCodeCookie!=null && atsZipCodeCookie.trim()!=""){
						deleteCookie("ATS_ZIPCODE");
					}
					if(atsDistanceCookie !=null && atsDistanceCookie.trim()!=""){
						deleteCookie("ATS_DISTANCE");
					}
					$('#findInStorePrice').html(price.trim());
					
					if(selectedcolor.indexOf('"')>-1){
						$("#findStoreColorSelection option[value='" + selectedcolor + "']").attr('selected', true);
					}
					else{
						$('#findStoreColorSelection option[value="' + selectedcolor + '"]').attr('selected', true);
					}
					if(selectedsize.indexOf('"')>-1){
						$("#findStoreSizeSelection option[value='" + selectedsize + "']").attr('selected', true);
					}
					else{
						$('#findStoreSizeSelection option[value="' + selectedsize + '"]').attr('selected', true);
					}
					
					// GA tagging
					ga('send','event','form','submit','People who used Find in Store');
				}
            },
		complete:function(data){
				setCookie("ATS_ZIPCODE",zipCode,365);
				setCookie("ATS_DISTANCE",distance,365);
			}
        });
}

function deleteCookie(cname){
	document.cookie=cname+"="+"; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; path=/";
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
} 

function setResultsContainerPosition() {
	if($('div#productquickview div#findInStoreContainer div#findInStoreResultsContainer').length) {
		$('div#productquickview div#findInStoreContainer div#findInStoreResultsContainer').css(	'top',
			(($('div#productquickview div.outsideBox span.close.popupclose').offset().top + $('div#productquickview div.outsideBox span.close.popupclose').outerHeight()) -
			$('div#productquickview div#findInStoreContainer').offset().top)
		);
	}
}


function findInStoreZipCodeSearchValidator(){
	var a=0;
	if($('#findInStoreFormZipCode').val().trim()=='Enter City, State or Zip')
	{
		$('#findInStoreFormZipCodeError').show();
		a++;
	}
	else
	{
		$('#findInStoreFormZipCodeError').hide();
	}
	if($('#findInStoreFormMiles').val()=='0.0')
	{
		$('#findInStoreFormMilesError').show();
		a++;
	}
	else
	{
		$('#findInStoreFormMilesError').hide();
	}
	return a;
	
}

$(document).click(function (e) {
    var target = $(e.target);

    if(!target.parents("#findInStoreContainer").length )
    {
        $('#findInStoreFormContainer').hide();
        $('#findInStoreResultsContainer').hide();
        $('#findInStoreFormContainer').hide();
        $('#findInStoreResultsContainer').hide();
        var skuId=$('#findInStoreSkuId').val();
    	var productId=$('#findInStoreProductId').val();
    	if(skuId==null||skuId==""){
    		skuId="";
    	}
    	var qtyId="#"+skuId+"QtyId";
    	var productQty=$(qtyId).val();
    	var quantity=1;
    	if(productQty!=null && productQty!=0){
    		quantity=productQty;
    	}
    	if(quantity==null||quantity==""||quantity==0){
    		quantity="1";
    	}
         $("#findInStoreContainer").load(
        	 contextPath+'/browse/include/toolbarBottons/reserveInStore/findStore.jsp',
        	 {
        		 'skuId' : skuId,
        		 'productId' : productId,
        		 'quantity' : quantity
        	 }
         );
    }
});

$(document).keydown(function(e) {
	
	 if (e.keyCode == 27) {  //esc
	        $('#findInStoreFormContainer').hide();
	        $('#findInStoreResultsContainer').hide(); 
	        $('#findInStoreFormContainer').hide();
	        $('#findInStoreResultsContainer').hide();
	        var skuId=$('#findInStoreSkuId').val();
	    	var productId=$('#findInStoreProductId').val();
	    	if(skuId==null||skuId==""){
	    		skuId="";
	    	}
	    	var qtyId="#"+skuId+"QtyId";
	    	var productQty=$(qtyId).val();
	    	var quantity=1;
	    	if(productQty!=null && productQty!=0 &&productQty!=""){
	    		quantity=productQty;
	    	}
	    	if(quantity==null||quantity==""||quantity==0){
	    		quantity="1";
	    	}
	         $("#findInStoreContainer").load(
	        	 contextPath+'/browse/include/toolbarBottons/reserveInStore/findStore.jsp',
	        	 {
	        		 'skuId' : skuId,
	        		 'productId' : productId,
	        		 'quantity' : quantity
	        	 }
	         );
	    }   
	
	var target = $(e.target);

	// if enter pressed, submit the form
	// (not the default behavior because we don't have type="submit" field in the #findInStoreSubmit form)
   if(target.parents("#findInStoreContainer").length ){
	    if (e.keyCode == 13) {  //enter
			findInStoreSearchSubmit();
			return false;
	    }
   }
});
