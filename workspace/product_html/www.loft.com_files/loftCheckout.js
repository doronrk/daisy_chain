var quantity;
var productName;
var selectedSizeId="";
var selectedColorId="";
var orderDollarsAmount = "";
var orderCentsAmount= "";
var emailFlag = true;
var editItemSubmitFlag = true;
var l_account=s_account_id;

// prepare the form when the DOM is ready
$(document).ready(function() {

	// setup default color
	colorId = $('#defColor').val();
	$('#colorCode').val(colorId);
	$('ul li#color'+$('#colorCode').val()).addClass("selected");
	var colorName = $('li#color'+colorId+' a').attr('title');
	$("#newColorText_0").html(colorName);

	var options = {
		async: false,
		dataType:'json',
		beforeSubmit:  showRequest,  // pre-submit callback
		success:       showResponse  // post-submit callback
	};
	// bind form using 'ajaxForm'
	$('#loftProductForm').ajaxForm(options);
	
	//On selecting the Size Type(i.e Regular, Petite, Tall) to load the size and color fragment
	$("#fs-size input[type='radio']").live('click',function(){
		var result = $(this).attr('rel');
	 	var result_array = result.split('$_$');
	 	var sizeTypeId = result_array[0];
	 	var skuId =result_array[1];
	 	var productPageType =result_array[2];
	 	var selectedSizeId = $('#fs-size ol li').find('.selected').attr('id');
	 	var selectedColorCode = $('#color-picker').find('.selected').attr('id');
		var imageId=$("#imageId").val();
		var colorExplode=false;
		var sizeUrl= "/loft/catalog/skuSize.jsp?prodId="+sizeTypeId+"&skuId="+skuId+"&productPageType="+productPageType;
		$("#SelectSize_0").load(sizeUrl,function(){
		     if(typeof selectedSizeId !== null && selectedSizeId !="") {
					$(selectedSizeId).addClass("selected");
			}
		});
		var colorUrl = "/loft/catalog/skuColor.jsp?prodId="+sizeTypeId+"&imageId="+imageId+"&skuId="+skuId+"&productPageType="+productPageType+"&colorExplode="+colorExplode;
		$("#color-picker").load(colorUrl,function(){
			//To display the color after loading the fragment
			document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
			if(document.getElementById("colorName")!= null) {
				document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
			}
			defColorId = $('#defColor').val();
			$('#colorCode').val(defColorId);
			$('#color'+defColorId).addClass("selected");
			rfxProductColorChangeClick(imageId, defColorId);
		});
		if($.browser.msie) {
			$(function(){
				$("#selRootCat").attr("class", "selected");
				$("#selChildCat").attr("class", "selected");
			});
		} else {
			if (document.getElementById("selRootCat") != null)
				document.getElementById("selRootCat").setAttribute("class", "selected");
			if (document.getElementById("selChildCat") != null)
				document.getElementById("selChildCat").setAttribute("class", "selected");
		}
		if(document.getElementById("selectedPage")!= null) {
			document.getElementById("selectedPage").setAttribute("class", "selected");
		}
	});

	//Clicked on SIZE
	$("#fs-size ol li").live('click',function(){
		var result = $(this).attr('rel');
		var result_array = result.split('$_$');

		//displayColors($(this),result_array[0],result_array[1],result_array[2],result_array[3],result_array[4]);
		var obj =$(this);
		var sizeCode = result_array[0];
		var productId = result_array[1];
		var skuId = result_array[2];
		var productPageType = result_array[3];
		var colorExplode = result_array[4];
		var selectedSizeId = ".size"+obj.id+" a";

		//Make size selected
		$('#fs-size').find('.selected').removeClass("selected");
		$('#'+sizeCode).addClass("selected");

		//Passing the selected sizeCode and colorCode to the skuColor.jsp
		var colorCode = $('#color-picker').find('.selected').attr('id');
		var imageId=$("#imageId").val();
		$("#sizeCode").val(sizeCode);

		//on clicking the size load skuColor.jsp
		var url="/loft/catalog/skuColor.jsp?prodId=" + productId + "&" +  "sizeCode=" + sizeCode + "&colorCode="+colorCode +"&imageId="+imageId+"&skuId="+skuId+"&productPageType="+productPageType+"&colorExplode="+colorExplode;
		$("#color-picker").load(url,function(){
			if(typeof selectedColorId != "undefined" && selectedColorId != "") {
				$(selectedColorId).addClass("selected");
			}
			var isColorDisabled = false;
			$('#color-picker').find('.sold-out').each( function() {
				var soldoutColorCode = $(this).attr('id');
				if (soldoutColorCode == colorCode) {
					isColorDisabled = true;
				}
			});
			if (isColorDisabled) {
				 // reset color because when user changes size they need to select a new color
				 $("#colorCode").val("");
			 } else {
				 $('#'+colorCode).addClass("selected");
				 var colorId = colorCode.substr("color".length, colorCode.length);
				 $("#colorCode").val(colorId);
			 }
		});
		
		if($.browser.msie) {
			$(function(){
				$("#selRootCat").attr("class", "selected");
				$("#selChildCat").attr("class", "selected");
			});
		}else{
				if (document.getElementById("selRootCat") != null)
					document.getElementById("selRootCat").setAttribute("class", "selected");
				if (document.getElementById("selChildCat") != null)
					document.getElementById("selChildCat").setAttribute("class", "selected");
		}

		if(document.getElementById("selectedPage")!= null) {
			document.getElementById("selectedPage").setAttribute("class", "selected");
		}
	});
	
	//Clicked on SIZE for Find in Store
	$("#fs-size-find ol li").live('click',function(){
		var result = $(this).attr('rel');
	 	var result_array = result.split('$_$');
		//displayColors($(this),result_array[0],result_array[1],result_array[2],result_array[3],result_array[4]);
		var obj =$(this);
		var sizeCode = result_array[0];
		var productId = result_array[1];
		var skuId = result_array[2];
		var productPageType = result_array[3];
		var colorExplode = result_array[4];
		var selectedSizeId = ".size"+obj.id+" a";

		//Make size selected
		$('#fs-size-find').find('.selected').removeClass("selected");
		$(this).find('#'+sizeCode).addClass("selected");
		//$('#'+sizeCode).addClass("selected");

		//Passing the selected sizeCode and colorCode to the skuColor.jsp
		var colorCode = $('#color-picker-find').find('.selected').attr('id');
		var imageId=$("#imageId").val();
		$("#sizeCode").val(sizeCode);
		//on clicking the size load skuColor.jsp
		var url="/loft/catalog/skuColor.jsp?prodId=" + productId + "&" +  "sizeCode=" + sizeCode + "&colorCode="+colorCode +"&imageId="+imageId+"&skuId="+skuId+"&productPageType="+productPageType+"&colorExplode="+colorExplode+ "&findInStore=true";
		$("#color-picker-find").load(url,function(){
			if(typeof selectedColorId != "undefined" && selectedColorId != "") {
				$(selectedColorId).addClass("selected");
			} else {
				$('.finalSaleColorMessage').hide();
			}

			$('#'+colorCode).addClass("selected");
			var colorId = colorCode.substr("color".length, colorCode.length);
			$("#colorCode").val(colorId);
		});
		if($.browser.msie) {
			$(function(){
				$("#selRootCat").attr("class", "selected");
				$("#selChildCat").attr("class", "selected");
			});
		}else{
			if (document.getElementById("selRootCat") != null){
				document.getElementById("selRootCat").setAttribute("class", "selected");
			}
			if (document.getElementById("selChildCat") != null){
				document.getElementById("selChildCat").setAttribute("class", "selected");
			}
		}

		if(document.getElementById("selectedPage")!= null) {
			document.getElementById("selectedPage").setAttribute("class", "selected");
		}
		document.getElementById("selectedFindSizeCode").value=sizeCode;
		$('#errorFindSizeCode').hide();
	});
	// Clicked on COLOR
	$("#color-picker ul li").live('click',function(event){
		var result = $(this).attr('rel');
		var result_array = result.split('$_$');

		//displaySizes($(this),result_array[0],result_array[1],result_array[2],result_array[3],result_array[4]);
		var obj = $(this);
		var colorId = result_array[0];
		var productId =result_array[1];
		var skuId = result_array[2];
		var productPageType = result_array[3];
		var colorExplode = result_array[4];
		var colorCode = 'color'+colorId;
		var sizeId = $('#fs-size ol li').find('.selected').attr('id');
		// ANNSUP-822 - Image not loading on click of color
		$('#imageId').val(result_array[5]);
		var imageId=$("#imageId").val(); //Make the swatch selectable
		
		$('.finalSaleColorMessage').hide();
		if(typeof(finalSaleColors)=='object' && typeof(finalSaleColors.colors)=='object'){
			if($.inArray(parseInt(colorId),finalSaleColors.colors)!==-1){
				$('.finalSaleColorMessage').show();
			}
		}

		$('#color-picker').find('.selected').removeClass('selected');
		$(obj).addClass('selected');

		//Passing the selected sizeCode and colorCode to the skuSize.jsp
		var sizeCode = $("#sizeCode").val();
		$("#colorCode").val(colorId);
		

		var url="/loft/catalog/skuSize.jsp?prodId="+productId+"&"+"colorCode="+colorId+"&sizeCode="+sizeCode+"&imageId="+imageId+"&skuId="+skuId+"&productPageType="+productPageType+"&colorExplode="+colorExplode;
		$("#SelectSize_0").load(url,function(){
			if(sizeId){
				sizeId = "#"+sizeId;
				$('#fs-size ol li').find(sizeId).addClass('selected');
			}
			$('#sizeCode').val(sizeCode);
			$('#color-picker').find('#'+colorCode).addClass("selected");
		});
		if($.browser.msie) {
			$(function(){
				$("#selRootCat").attr("class", "selected");
				$("#selChildCat").attr("class", "selected");
			});
		} else {
			if (document.getElementById("selRootCat") != null){
				document.getElementById("selRootCat").setAttribute("class", "selected");
			}
			if (document.getElementById("selChildCat") != null){
				document.getElementById("selChildCat").setAttribute("class", "selected");
			}
		}

		if(document.getElementById("selectedPage")!= null) {
			document.getElementById("selectedPage").setAttribute("class", "selected");
		}
		var swatchID = $.trim(result_array[6]);
		rfxProductColorChangeClick(result_array[5], swatchID);
	});

	$("#color-picker ul li").live('mouseout',function(event){
		if ((navigator.userAgent.indexOf('iPhone') == -1) && (navigator.userAgent.indexOf('iPad') == -1)){
			var result = $(this).attr('rel');
	 		var result_array = result.split('$_$');
			var swatchID = $.trim(result_array[6]);
			// removed for new viewer
			// rfxProductColorChangeHover(event,result_array[5],swatchID);
		}
	});

	$("#color-picker ul li").live('mouseover',function(event){
		if ((navigator.userAgent.indexOf('iPhone') == -1) && (navigator.userAgent.indexOf('iPad') == -1))  {
			var result = $(this).attr('rel');
			var result_array = result.split('$_$');
			displaySwatchName(result_array[7], result_array[8]);
			var swatchID = $.trim(result_array[6]);
			// removed for new viewer
			// rfxProductColorChangeHover(event,result_array[5],swatchID);
		}
	});
	//On selecting the Size Type(i.e Regular, Petite, Tall) to load the size and color fragment
	$("#fs-size-find input[type='radio']").live('click',function(){
		$('#widget-findInStore #newColorText_0').html('');
		var cur_obj = $(this);
		 var result = $(this).attr('rel');
		 var result_array = result.split('$_$');
		// displaySizeType(result_array[0],result_array[1]);
		var id= result_array[0];
		var skuId =result_array[1];
		var productPageType =result_array[2];
		var colorExplode =result_array[3];
		var productImage =result_array[4];
		var selectedSizeId = $('#fs-size-find ol li').find('.selected').attr('id');
		var selectedColorCode = $('#color-picker-find').find('.selected').attr('id');
		var sizeTypeID = id;
		var imageId=$("#widget-findInStore #imageId").val();
		var sizeUrl= "/ann/catalog/skuSize.jsp?prodId="+sizeTypeID+"&skuId=" + skuId + "&productPageType=" + productPageType + "&findInStore=true";
		
		/*$("#widget-findInStore #SelectSize_0").load(sizeUrl,function(){
			 if(typeof selectedSizeId !== null && selectedSizeId !="") {
					$(selectedSizeId).addClass("selected");
			}
		});*/							
		$('#fs-size-find ol.multiSelect').load(sizeUrl,function(){
			 if(typeof selectedSizeId !== null && selectedSizeId !="") {
					$(selectedSizeId).addClass("selected");
			}
		});
		
		var colorUrl = "/ann/catalog/skuColor.jsp?prodId="+sizeTypeID+"&imageId="+imageId+"&skuId="+skuId+"&productPageType="+productPageType+"&imageId="+productImage+"&colorExplode="+colorExplode + "&findInStore=true";
		$("#color-picker-find").load(colorUrl,function(){
			//To display the color after loading the fragment
			console.log($('#color-picker-find li').length);
			if($('#color-picker-find li').length){
				$('#widget-findInStore #newColorText_0').html($defaultColorTitle);
			}
			document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
			if(document.getElementById("colorName")!= null) {
				document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
			}
			
			var browserVersion = $.browser.version;
			browserVersion = browserVersion.substring(0,1);
			if ($.browser.msie && browserVersion == "7") {
				defColorId = $('#defColor').attr("value");
			}
			else {
				defColorId = $('#widget-findInStore #defColor').val();
			}
			
			
			$('#widget-findInStore #colorCode').val(defColorId);
			$('#widget-findInStore #color'+defColorId).addClass("selected");
			$('#selectedFindColorCode, #selectedFindSizeCode').val('');
			changeImage(defColorId);
			$('#widget-findInStore #newColorText_0').html($('#widget-findInStore #color'+defColorId+' a').attr('alt'));
		});
		if($.browser.msie) {
			$(function(){
				$("#selRootCat").attr("class", "selected");
				$("#selChildCat").attr("class", "selected");
			});
		} else {
			if (document.getElementById("selRootCat") != null)
				document.getElementById("selRootCat").setAttribute("class", "selected");
			if (document.getElementById("selChildCat") != null)
				document.getElementById("selChildCat").setAttribute("class", "selected");
		}
		if(document.getElementById("selectedPage")!= null) {
			document.getElementById("selectedPage").setAttribute("class", "selected");
		}
	});
	
	function changeImage(currentColorSel){
		$imgSrc = $('#findInStoreMain').attr('src');
		$imgSrcArray = $imgSrc.split("/");
		$imgSrcSplit = ($imgSrcArray[5]).split("_");				
		$mainImgSrc = $imgSrc.lastIndexOf("/")+1;
		$basicImgSrc = $imgSrc.substring(0,$mainImgSrc);
		$modifiedImgUrl=$imgSrcSplit[0]+'_'+currentColorSel+'_'+$imgSrcSplit[2];
		$newestUrl = $basicImgSrc+$modifiedImgUrl;
		$('#findInStoreMain').attr("src", $newestUrl);
	}
	
	// Clicked on COLOR Overlay
	$("#color-picker-find ul li").live('click',function(event){
		var result = $(this).attr('rel');
	 	var result_array = result.split('$_$');

	 	//displaySizes($(this),result_array[0],result_array[1],result_array[2],result_array[3],result_array[4]);
		var obj = $(this);
		var colorId = result_array[0];
		var productId =result_array[1];
		var skuId = result_array[2];
		var productPageType = result_array[3];
		var colorExplode = result_array[4];
		// ANNSUP-822 - Image not loading on click of color
		$('#imageId').val(result_array[5]);
		var colorCode = 'color'+colorId;
		var sizeId = $('#fs-size-find ol li').find('.selected').attr('id');
		var imageId=$("#imageId").val(); //Make the swatch selectable

		$('#color-picker-find').find('.selected').removeClass('selected');
		$(obj).addClass('selected');

		//Passing the selected sizeCode and colorCode to the skuSize.jsp
		var sizeCode = $("#sizeCode").val();
		$("#colorCode").val(colorId);
		document.getElementById("selectedFindColorCode").value=colorId;
		var url="/loft/catalog/skuSize.jsp?prodId="+productId+"&"+"colorCode="+colorId+"&sizeCode="+sizeCode+"&imageId="+imageId+"&skuId="+skuId+"&productPageType="+productPageType+"&colorExplode="+colorExplode + "&findInStore=true";
		
		
		$('#fs-size-find ol.multiSelect').load(url,function(){
			if(sizeId){
			 	 sizeId = "#"+sizeId;
				 $('#fs-size-find ol li').find(sizeId).addClass('selected');
			}
			$('#sizeCode').val(sizeCode);
			$('#color-picker-find').find('#'+colorCode).addClass("selected");
		});
		
		if($.browser.msie) {
			$(function(){
				$("#selRootCat").attr("class", "selected");
				$("#selChildCat").attr("class", "selected");
			});
		} else {
			if (document.getElementById("selRootCat") != null)
				document.getElementById("selRootCat").setAttribute("class", "selected");
			if (document.getElementById("selChildCat") != null)
				document.getElementById("selChildCat").setAttribute("class", "selected");
		}

		if(document.getElementById("selectedPage")!= null) {
			document.getElementById("selectedPage").setAttribute("class", "selected");
		}
		var swatchID = $.trim(result_array[6]);
		//rfxProductColorChangeClick(result_array[5], swatchID);
		$currentColorSel = parseInt(result_array[6]);
		changeImage($currentColorSel);
		$defaultColorTitle = result_array[7];
		$('#widget-findInStore #newColorText_0').html($defaultColorTitle);
		$('#findInStoreMain').error(function () {
		console.log("ad");
		console.log("preimgSrc=>"+$preimgSrc);
			$(this).unbind("error").attr("src", $imgSrc);
			$('#findInStoreMain').attr("src", $preimgSrc);
			$newestUrl = $preimgSrc;
		});
		$preimgSrc = $newestUrl;
		$('#errorFindColorCode').hide();
	});


	$("#color-picker-find ul li").live('mouseout',function(){
		var result = $(this).attr('rel');
 		var result_array = result.split('$_$');
		var swatchID = $.trim(result_array[6]);
		//rfxProductColorChangeHover(event,result_array[5],swatchID);
		$('#findInStoreMain').attr("src", $preimgSrc);
		$('#widget-findInStore #newColorText_0').html($defaultColorTitle);
	});

	$("#color-picker-find ul li").live('mouseover',function(event){
		var result = $(this).attr('rel');
			var result_array = result.split('$_$');
		displaySwatchName(result_array[7], result_array[8]);
		var swatchID = $.trim(result_array[6]);
		//rfxProductColorChangeHover(event,result_array[5],swatchID);
		$currentColorSel = parseInt(result_array[6]);
		changeImage($currentColorSel);
		$('#widget-findInStore #newColorText_0').html(result_array[7]);
		$('#findInStoreMain').error(function () {
			$(this).unbind("error").attr("src", $imgSrc);
			$('#findInStoreMain').attr("src", $imgSrc);
			//$preimgSrc = $imgSrc;
		});
	});
});


/*
 * Add to Cart Post-Commit
 */
function editItem()  {
  	loadFragment("/loft/cart/cart.jsp","#includeCart")
}


function showRequest(formData, jqForm, options) {
	$("div.errorText").empty();
	var queryString = $.param(formData);
	return validateProductDetailForm();

}

function validateProductQVForm(){
	var colorcd = "";
	var sizecd = "";
	if (document.getElementById('colorCode') != null && document.getElementById('colorCode').value != 'undefined')
		colorcd = document.getElementById('colorCode').value;
	if (document.getElementById('sizeCode') != null && document.getElementById('sizeCode').value != 'undefined')
		sizecd = document.getElementById('sizeCode').value ;

	if(sizecd == "" || colorcd == "") {
		//document.getElementById('commorErrorMessageInPDPage').innerHTML="Please correct the error(s) identified below.";
		if( sizecd == "" ){
			$('#sizeCode1').show();
			document.getElementById('sizeCode1').innerHTML = "Select size.";
		} else {
			$('#sizeCode1').hide();
			document.getElementById('sizeCode1').innerHTML = "";
		}

		if( colorcd == "" ){
			$('#colorCode1').show();
			document.getElementById('colorCode1').innerHTML = "Select color.";
		} else {
			$('#colorCode1').hide();
			document.getElementById('colorCode1').innerHTML = "";
		}

		return false;
	} else {
		$('#commorErrorMessageInPDPage').hide();
		document.getElementById('commorErrorMessageInPDPage').innerHTML="";
		$('#colorCode1').hide();
		document.getElementById('colorCode1').innerHTML = "";
		$('#sizeCode1').hide();
		document.getElementById('sizeCode1').innerHTML = "";
	}
}

function validateProductDetailForm(){
	var colorcd = "";
	var sizecd = "";
	if (document.getElementById('colorCode') != null && document.getElementById('colorCode').value != 'undefined')
		colorcd = document.getElementById('colorCode').value;
	if (document.getElementById('sizeCode') != null && document.getElementById('sizeCode').value != 'undefined')
		sizecd = document.getElementById('sizeCode').value ;

	if(sizecd == "" || colorcd == "") {
		document.getElementById('commorErrorMessageInPDPage').innerHTML="Please correct the error(s) identified below.";
		if( sizecd == "" ){
			document.getElementById('sizeCode1').innerHTML = "Please select a size.";
		} else {
			document.getElementById('sizeCode1').innerHTML = "";
		}

		if( colorcd == "" ){
			document.getElementById('colorCode1').innerHTML = "Please select a color.";
		} else {
			document.getElementById('colorCode1').innerHTML = "";
		}

		return false;
	} else {
		document.getElementById('commorErrorMessageInPDPage').innerHTML="";
		document.getElementById('colorCode1').innerHTML = "";
		document.getElementById('sizeCode1').innerHTML = "";
	}
}


// post-submit callback
function showResponse(responseText, statusText)  {

        // report form errors
        var processErrors = function (kmap) {
            taylor.processErrors(responseText.errors, kmap);
        };
		if(responseText.pagetype == 'shipping'){
		$("div.errorText").empty();
		if(responseText.error == "true"){
            processErrors();

			document.getElementById('commorErrorMessage').innerHTML="Please correct the error(s) identified below.";

		} else{
				$('#shippingForm').hide();
				$('.ship-summary').show();
				$('#billingInfoForm').show();
				$('.payment-summary').hide();

				if( showSingleShip ){
					loadFragment("/loft/checkout/shippingSummary.jsp","#shipSummary");
				}else{
					loadFragment("/loft/checkout/shippingToMultipleSummary.jsp","#shipSummary");
				}
					loadFragmentWithCallBack("/loft/cart/cart.jsp","#includeCart",function() {ATCheckout.init();});

					//loadOrderTotal();
		}
	}

		if(responseText.pagetype == 'payment'){

		if(responseText.error == "true"){
            processErrors({ 'avs.failed': 'avsFaild', 'phoneNumber': 'phoneNumber2' });


			document.getElementById('commorErrorMessageInPayment').innerHTML="Please correct the error(s) identified below.";
		}else{
			$('#shippingForm').hide();
			$('.ship-summary').show();
			$('#billingInfoForm').hide();
			$('.payment-summary').show();
			$('#commitOrderForm').show();
			newAccountCreated = true;

			loadFragment("/loft/checkout/paymentSummary.jsp","#paymentSummary");
			loadFragmentWithCallBack("/loft/cart/cart.jsp","#includeCart",function() {ATCheckout.init();});
		}
	}
	if(responseText.pagetype == 'giftCard'){
		$("div.errorText").empty();
		if(responseText.error == 'true'){

            processErrors({ 'gcRecipientNames': 'gcRecipientNames1' });

			document.getElementById('CommonErrorMessageInGCEdit').innerHTML="Please correct the error(s) identified below.";

		}else{

			  loadFragment("/loft/cart/cart.jsp","#includeCart")
			  }
	}

	if(responseText.pagetype == 'egiftCard'){
		$("div.errorText").empty();
		if(responseText.error == 'true'){
            processErrors({ 'egcConfirmReciepentEmailsValue': 'egcConfirmReciepentEmailsValue1' });
			document.getElementById('CommonErrorMessageInEGCEdit').innerHTML="Please correct the error(s) identified below.";
		}else{

			  loadFragment("/loft/cart/cart.jsp","#includeCart")
			  }

	}

	if(responseText.pagetype == 'guestcheckout'){
		if(responseText.error == 'true'){
            processErrors();
		}else{
		loadFragmentWithCallBack("/loft/checkout/checkoutProcess.jsp",".col-secondary",function() {ATCheckout.init();});
		 loadFragmentWithCallBack("/loft/cart/cart.jsp","#includeCart",function() {ATCheckout.init();});
		}
	}

	if(responseText.pagetype == 'promo') {
		loadFragment("/loft/cart/cart.jsp","#includeCart");
	}

	if(responseText.pagetype == 'giftbox'){
		$.ajax({
		url: '/loft/cart/cart.jsp',
		cache: false,
		type: "GET",
		async: false,
		success: function(data){
			$('#includeCart').html(data);
			ATCheckout.init();
		}
	});

	}

	if(responseText.pagetype == 'checkoutLogin'){
		$("#login").empty();
		$("#valueMap.password").empty();
		 if(responseText.error == 'true'){
			 processErrors();
			document.getElementById("loginFormError").innerHTML="";
		}else{
			$('#headerFrag').html('');
			loadFragment("/loft/common/include/headerFrag.jsp","#headerFrag");
			loadFragment("/loft/checkout/registerCheckoutProcessDynamic.jsp",".col-secondary");
			loadFragmentWithCallBack("/loft/cart/cart.jsp","#includeCart",function() {ATCheckout.init();});
		}
	}
	if(responseText.pagetype == 'productDetails'){
		$("#sizeCode1").empty();
		$("#Inventory").empty();
  		$("#commorErrorMessageInPDPage").empty();
		if(responseText.error == 'true'){
			processErrors({ 'sizeCode': 'sizeCode1' });
			document.getElementById('commorErrorMessageInPDPage').innerHTML="Please correct the error(s) identified below.";

			// BrightTag Event Trigger
			$(window).trigger('addToBagFailure', [responseText]);
			
		}else{
			trackAddedItemToCart(responseText.ProductId, responseText.SkuID, responseText.cartCount);
			$('#main-hd .utils .list-l1 .nav-bag .label-l1 .total').text(responseText.cartCount);
			$('#main-hd .utils .list-l1 .nav-bag .label-l1 .cartCount').text(responseText.cartCount);
			productName=responseText.product;
			quantity=responseText.cartQuantity;
			
			// BrightTag Event Trigger
			$(window).trigger('addToBagSuccess', [responseText.ProductId, responseText]);
			console.log('BRIGHTTAG EVENT addToBagSuccess');

			showBasket('show','');
			window.scroll(0,0);
			
			//fix for ANNTAYLORQA-1099 
			$('#color-picker').find('.selected').removeClass('selected');
			$('#fs-size').find('.selected').removeClass("selected");
			if (document.getElementById('colorCode') != null && document.getElementById('colorCode').value != 'undefined')
				document.getElementById('colorCode').value = "";
			if (document.getElementById('sizeCode') != null && document.getElementById('sizeCode').value != 'undefined')
				document.getElementById('sizeCode').value = "";
			if (document.getElementById('quantity') != null && document.getElementById('quantity').value != 'undefined'){
				var quant = document.getElementById('quantity');
				quant.options[0].selected=true;
			}
		 
			setTimeout(function(){
				$('#universalCart').fadeOut(function(){
					$("#CartToggle").removeClass("CartToggleOn");
				});
			}, 4000);
		}
	}
	
	if(responseText.pagetype == 'outfitForm'){
		$("div.errorText").empty();
		 if(responseText.error == 'true'){
			 processErrors();
			document.getElementById('commonErrorInOutfit').innerHTML="Please correct the error(s) identified below.";
		}else{
		 $('#main-hd .utils .list-l1 .nav-bag .label-l1 .total').text(responseText.cartCount);
		 $('#cartQty').text(responseText.cartCount);
		 $('#main-hd .utils .list-l1 .nav-bag .label-l1 .cartCount').text(responseText.cartCount);
		 productName=responseText.product;
		 showBasket('show','');
		}
	}

	if(responseText.pagetype == 'mobileSubscription'){
		$("div.errorText").empty();
		if(responseText.error == 'true'){
			processErrors();
		}else{
			$(".mobileSubscription").hide();
			$(".thank-you-msg").show();

		 }
	}

	if(responseText.pagetype == 'regShipping'){
		if(responseText.error == 'true'){
		}else{
			$('#regShippingForm').hide();
			$('#clearfixship-summary').show();
			$('#regPaymentForm').show();
			$('#regMutliShipForm').hide();
			$('.payment-summary').hide();
			$('.ship-summary').show();
			$('.security-code').hide();
			$('#shipSummary').show();
			if( showSingleShip ){
				loadFragment("/loft/checkout/shippingSummary.jsp","#shipSummary");
			}else{
				loadFragment("/loft/checkout/shippingToMultipleSummary.jsp","#shipSummary");
			}
			loadFragment("/loft/cart/orderPriceDetailsDynamic.jsp",".cart-summary");
			$('#regPaymentForm').remove();
				 $.ajax({
					url: "/loft/checkout/regPaymentDynamic.jsp",
					cache: false,
					type: "GET",
					success: function(data){
						$('.contentWrap .btn-cancel').click();
						$('.payment-summary').after(data);
						ATCheckout.init();
					}
				});
		}
	}
	if(responseText.pagetype == 'removeRegShippingAddress'){
		if(responseText.error == 'true'){
		}else{
			$('#regShippingForm').remove();
			 $.ajax({
				url: "/loft/checkout/regShippingAddressDynamic.jsp",
				cache: false,
				type: "GET",
				success: function(data){
					$('.ship-summary').after(data);
					ATCheckout.init();
				}
			});

		}
	}
	if(responseText.pagetype == 'addShippingAddress'){
		$("div.error").empty();
		if(responseText.error == 'true'){
			processErrors({ 'phoneNumber': 'phoneAddNumberNewShipping' });
			document.getElementById('commorErrorMessageInAddShippingAddress').innerHTML="Please correct the error(s) identified below.";
		}else{

			$('.mult-address-form').remove();
			 $.ajax({
				url: "/loft/checkout/shipToMultiple.jsp",
				cache: false,
				type: "GET",
				success: function(data){
				$('.contentWrap .btn-cancel').click();
				$('.ship-summary').after(data);
	   			$('.select-box-container').cascadeZIndex();
				$('#pageTemplate a[rel=#address-overlay]').overlay();
				ATCheckout.init();
				}
			});
		}
	}
	if(responseText.pagetype == 'editRegPayment'){
		$("div.errorText").empty();
		if(responseText.error == "true"){
            processErrors();
			document.getElementById('commorErrorMessageInPayment').innerHTML="Please correct the error(s) identified below.";
		}else{
			$('#regPaymentForm').remove();
			 $.ajax({
				url: "/loft/checkout/regPaymentDynamic.jsp",
				cache: false,
				type: "GET",
				success: function(data){
					$('.contentWrap .btn-cancel').click();
					$('.payment-summary').after(data);
					ATCheckout.init();
				}
			});
			$('.security-code').hide();
		}
	}

	if(responseText.pagetype == 'regPayment'){
		if(responseText.error == 'true'){
			for(x=0; x< responseText.errors.length; x++){
				var key = responseText.errors[x];
				var value = responseText.errors[x+1];
				if(key == 'avs.failed'){
					processErrors(document.getElementById("avsFaildInRegBilling"), value);
				}
				x=x+1;
			}
		}else{
			$('#regPaymentForm').hide();
			$('.payment-summary').show();
			$('#paymentSummary').show();
			loadFragment("/loft/checkout/regPaymentSummary.jsp","#paymentSummary");
			$('.security-code').show();
			$('.security-code').load("/loft/checkout/includes/securityCodeFrag.jsp");
			loadFragmentWithCallBack("/loft/cart/cart.jsp","#includeCart",function() {ATCheckout.init();});

		}
	}
	if(responseText.pagetype == 'shipToMulti'){

		if(responseText.error == 'true'){
            processErrors();
		}else{
			$('#regMutliShipForm').hide();
			$('#regPaymentForm').hide();
			$('.payment-summary').show();
			$('.ship-summary').show();
			loadFragment("/loft/checkout/shippingToMultipleSummary.jsp","#shipSummary");
		 	$('.security-code').show();
			//$('.security-code').load("/loft/checkout/includes/securityCodeFrag.jsp");
			loadFragmentWithCallBack("/loft/cart/cart.jsp","#includeCart",function() {ATCheckout.init();});
		}
	}
	if(responseText.pagetype == 'commit'){
		//alert('newAccountCreated == '+newAccountCreated);
	$(".errorText").empty();
		if(responseText.error == 'true'){
			for(x=0; x< responseText.errors.length; x++){
				var key = responseText.errors[x];
				if( key == "emailAddressExists"){
				    responseText.errors[x+1] += '<a href="/loft/profile/forgotPassword.jsp" class="error">here if you forgot your password.</a>';
				}
				x=x+1;
			}
			processErrors();
		}else{

			var url="/loft/checkout/orderConfirmation.jsp?newAccountFlag="+newAccountCreated;
			window.location = url;
		}
	}

	if(responseText.pagetype == 'checkoutGiftCard'){
		$("div.error").empty();
		if(responseText.error == "true"){
			processErrors();
			//document.getElementById('commorErrorMessageInApplyGC').innerHTML="Please correct the error(s) identified below.";
		}
		else{
			loadFragment("/loft/cart/orderPriceDetailsDynamic.jsp",".cart-summary");
			$('#rewards-card-number').val("");
			$('#rewards-card-pin').val("");
			$('.rewards-card .btn-apply-2').attr('disabled', 'true').addClass('btn-apply-2-disabled');
		}
	}
	if(responseText.pagetype == 'checkoutEGC'){
		$("div.error").empty();
		if(responseText.error == "true"){
			processErrors();
			//document.getElementById('commorErrorMessageInApplyEGC').innerHTML="Please correct the error(s) identified below.";
		}
		else{
			loadFragment("/loft/cart/orderPriceDetailsDynamic.jsp",".cart-summary");
			$('#gift-card-number').val("");
			$('#gift-card-email').val("");
		}
	}

}

/*
 * Omniture tag to track when a item is added to the cart
 */
function trackAddedItemToCart(prodId, sku, cartCount) {
	var s=s_gi(l_account);
	s.linkTrackVars='events,products';
	s.products=";"+prodId+";;;;evar8="+sku;
	s.linkTrackEvents='scAdd,scOpen';
	if (cartCount == '(1)') {
		s.events='scAdd,scOpen';
	} else {
		s.events='scAdd';
	}
	s.tl(this,'o','Product Add to Cart');
}

/*
 * Remove the CommerceItem in Basket
 */
function removeBasketItem(commerceItemId,productId,skuId){

	// for omniture
	trackRemoveFromCart(productId);

	var url="/loft/catalog/removeItem.jsp?commerceItemid="+commerceItemId+"&productId="+productId;
	$.ajax({
		url: url,
		cache: false,
		async: false,
		dataType: 'json',
		type: "POST",
		success: function(data){
			// Bright Tag
			$(window).trigger('removeFromBag', [skuId]);
			
			console.log('BRIGHTTAG EVENT removeFromBag');
			console.log('----->data (ajax login response)');
			/*
			console.log(typeof(data));
			var name;
			for(name in data){
				if(typeof(data[name])!=='function'){
					console.log(name+": "+data[name]);
				}
			}
			console.log('commerceItemId: '+commerceItemId);
			console.log('productId: '+productId);
			console.log('skuId: '+skuId);
			*/
			$('#universalCart').load('/loft/catalog/basket.jsp', function(){
				$('#productNames').html(data.product + " has been removed from your Shopping Basket.");
				$('#cartQty').html(data.cartCount + " item(s) in your Shopping Basket.");
			});
			$('#main-hd .utils .list-l1 .nav-bag .label-l1 .total').text('(' + data.cartCount + ')');
			$('#main-hd .utils .list-l1 .nav-bag .label-l1 .cartCount').text('(' + data.cartCount + ')');
		}
	});

}

function loadFragment(url,divId){
	$.ajax({
		url: url,
		cache: false,
		type: "GET",
		success: function(data){
			$(divId).html(data);

		}
	});
}
function showCartContent(obj) {
  var url="/loft/catalog/basket.jsp";
  var formOdj= document.getElementById("moveToPurchaseInfo");
 	$.ajax({
 		url: url,
 		cache: false,
 		dataType: 'text\html',
 		data: $(formOdj).serialize(),
 		type: "POST",
 		success: function(data){
	 		window.location.href="/loft/checkout/index.jsp";
 		}
	 });
}

function loadOrderTotal(){
	$.ajax({
		url: "/loft/checkout/orderTotalJson.jsp",
		cache: false,
		async: false,
		dataType: 'json',
		type: "GET",
		success: function(responseJson){
			//alert(responseJson.dollarsAmount);
			if(responseJson.dollarsAmount != null && responseJson.dollarsAmount !="") {
				$('#purchase-bar .total .dollars').text(responseJson.dollarsAmount);
				$('#purchase-bar .total .cents').text(responseJson.centsAmount);
			}
		}
	});
}

// loadFragment with call back
function loadFragmentWithCallBack(url,divId,callback){
	$.ajax({
		url: url,
		cache: false,
		type: "GET",
		async: false,
		success: function(data){
			$(divId).html(data);
			if (callback) { callback(); }
		}
	});
}

function changeState(){
	var tem = '.guestBillingState [value='+ $('.guestBillingState').val()+']';
	$('#select-box-container-billing-state .select-box-bg').html($(tem).text());
}
