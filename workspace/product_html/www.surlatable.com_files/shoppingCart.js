/**
 * author: thomas
 * date: 2010-7-23
 */

/**********************************store product begin*******************************************/

function addPaddingToForty(input) {
	var numberSpaces = 40 - input.length;
	var paddedString = "";

	for (var i = 0; i < numberSpaces; i++) {
		paddedString += " ";
	}

	return paddedString;
}

function addToCartStoreAjaxFormSubmit(elementId,$form,productId,skuId,quantity,type){
	var options={
	success:function (data) {
			$("#"+elementId).html(data);
			postAddToCartStore(productId,skuId,quantity,type);
		}
	};
	$form.ajaxSubmit(options);
}

/**
 * if add to cart sucessful popup mini cart
 * @return
 */
function postAddToCartStore(productId,skuId,quantity,type) {
	var errorCountId = skuId+"AddToCartFormErrorCount";
	var errorCount = $("#"+errorCountId).val();
	var r = new Date().getTime();//Math.floor((Math.random() * 10000000) + 1);
	if(errorCount==0) {
		restoreButtonStatus(productId,skuId,quantity,'0');
		$("#topHeaderItemCount").load(contextPath+"/includes/headerCartItemsForAjax.jsp?" + r, function() {
			if(type=="3"){
				$("#productquickview").jqmHide();
			}
			$('#tellApart').load('/tellApartTag.jsp?actionType=updateCart&targetPage=Partial&rnd=' + random_string(), function() {
				$("#cartpopup").load(contextPath + "/cart/miniCart.jsp?" + r, function() {
					$(".cartpopuptrigger").trigger('click');
				});
			});
		});
		$("#beginCheckoutFormDiv").load(contextPath+"/cart/include/beginCheckoutForm.jsp?" + r);
		$("#beginCheckoutFormDivPPExpress").load(contextPath+"/cart/include/beginCheckoutFormPPExpress.jsp?" + r);
	} else {
		clearRecorders(productId);
	}
}
/**
 * giftRegistryId:
 *   -if it not add from gift registry,giftRegistryId is empty
 * sizeSelectionId:
 *   -no matter there are size dropdown selection,this id can not be empty
 *    for we need it when the type is 2
 * colorSelectionId:
 *   - the same as sizeSelectionId
 * type:
 *   -1: add from pdp primary product
 *   -2: add from pdp relevancy product
 *   -3: add from qickview product
 **/
function addToCartStore(productId,skuId,qtyId,giftRegistryId,sizeSelectionId,colorSelectionId,type){
	var selectResult = promptUserToChoose(productId,sizeSelectionId,colorSelectionId);
	if(selectResult==1){
		return;
	}
//add scOpen & scAdd omniture event here
	try{
		OmnitureCenter.addShoppingCartEventType(productId,skuId, type);
	}catch(e){
		//alert(e);
	}

//*******************************
	var $form = $("#addItemToCartForm");
	var quantity = $("#"+qtyId).val();
	$form.find(".commerceItemTypeToSubmit").val("storeCommerceItem");
	$form.find(".productToSubmit").val(productId);
	$form.find(".skuToSubmit").val(skuId);
	$form.find(".qtyToSubmit").val(quantity);
	$form.find(".giftlistIdToSubmit").val(giftRegistryId);
	$form.find(".addCulinaryToOrder").attr("disabled","true");
	var finalUrl;
	var elementId;
	switch(type){
		case '1':
			finalUrl= getAddPrimaryStoreProductUrl(productId,sizeSelectionId,colorSelectionId);
			elementId="productdetailinfo";
			break;
		case '2':
			finalUrl = getAddRelevancyStoreProductUrl(productId,sizeSelectionId,colorSelectionId);
			var idSplit = sizeSelectionId.split('_');
			elementId = idSplit[1]+"Product"+idSplit[2];
			break;
		case '3':
			finalUrl =getAddQuickViewStoreProductUrl(productId,sizeSelectionId,colorSelectionId);
			elementId = "detailInfo";
			break;
		default:
			break;
	}
	$form.attr("action",finalUrl);
	$form.find(".addItemToOrderSuccessURL").val(finalUrl);
	$form.find(".addItemToOrderErrorURL").val(finalUrl);
	$form.find(".addItemToOrder").removeAttr("disabled");
	$form.find(".addCulinaryToOrder").attr("disabled","true");
	addToCartStoreAjaxFormSubmit(elementId,$form,productId,skuId,quantity,type);
}


/**********************************store product end*******************************************/

/**********************************begin checkout *********************************************/
function beginCheckoutTag() {
	try{
		OmnitureCenter.sccheckOutEvent();
	}catch(e){
		//alert(e);
	}
	$('#beginCheckoutForm').submit();
}



/**********************************gr add to cart start*******************************************/


function addToCartStoreForGR(productId,skuId,qtyId,giftRegistryId,giftItemId,index){

	var $form = $("#addItemToCartForm");
	var quantity = $("#"+qtyId).val();
	$form.find(".commerceItemTypeToSubmit").val("storeCommerceItem");
	$form.find(".productToSubmit").val(productId);
	$form.find(".skuToSubmit").val(skuId);
	$form.find(".qtyToSubmit").val(quantity);
	$form.find(".giftRegistryIdToSubmit").val(giftRegistryId);
	$form.find(".addCulinaryToOrder").attr("disabled","true");
	$("#form_index").remove();
	$form.append("<input type='hidden' id='form_index' name='index' value='"+index+"'>");
	$("#form_giftItemId").remove();
	$form.append("<input type='hidden' id='form_giftItemId' name='giftItemId' value='"+giftItemId+"'>");
	$("#form_id").remove();
	$form.append("<input type='hidden' id='form_id' name='id' value='"+giftRegistryId+"'>");

	var finalUrl="/registry/include/giftRegistryListItemDetail.jsp";
	$form.attr("action",finalUrl);
	var elementId = "giftitem_"+giftItemId;
	//$form.find(".addItemToOrderSuccessURL").val(finalUrl);
	//$form.find(".addItemToOrderErrorURL").val(finalUrl);
	addToCartStoreAjaxFormSubmit(elementId,$form,productId,skuId,quantity,'1');
	//restoreButtonStatus
	var errorCountId = skuId+"AddToCartFormErrorCount";
	var errorCount = $("#"+errorCountId).val();
	if(errorCount==0){

	}
}


function moveToCartStoreForGR(productId,skuId,qtyId,giftRegistryId,giftItemId,index){

	var $form = $("#addItemToCartForm");
	var quantity = $("#"+qtyId).val();
	$form.find(".commerceItemTypeToSubmit").val("storeCommerceItem");
	$form.find(".productToSubmit").val(productId);
	$form.find(".skuToSubmit").val(skuId);
	$form.find(".qtyToSubmit").val(quantity);
	$form.find(".giftRegistryIdToSubmit").val(giftRegistryId);
	$form.find(".addCulinaryToOrder").attr("disabled","true");
	var url=contextPath+"/registry/include/giftRegistryTrackerItemDetail.jsp?";
	var params = "index="+index+"&giftItemId="+giftItemId+"&id="+giftRegistryId;
	var finalUrl = url+params;
	var elementId = "giftitem_"+giftItemId;
	$form.find(".addItemToOrderSuccessURL").val(finalUrl);
	$form.find(".addItemToOrderErrorURL").val(finalUrl);
	addToCartStoreAjaxFormSubmit(elementId,$form,productId,skuId,quantity,'1');
}


/**********************************gr add to cart end*******************************************/



/**********************************culinary product begin***************************************/

function addToCartCulinary(productId,skuId,qtyId,giftRegistryId,errorURLId){
	var commerceItemType = "culinaryCommerceItem";
	var url = $("#addToCartLinkTo").val()+"?productId="+productId+"&skuId="+skuId+"&quantity="+$("#"+qtyId).val();
	var $form = $("#addItemToCartForm");
	$form.attr("action",url);
	$form.find(".addItemToOrderSuccessURL").val(url);
	$form.find(".addItemToOrderErrorURL").val($("#"+errorURLId).val());
	$form.find(".commerceItemTypeToSubmit").val(commerceItemType);
	$form.find(".productToSubmit").val(productId);
	$form.find(".skuToSubmit").val(skuId);
	$form.find(".qtyToSubmit").val($("#"+qtyId).val());
	$form.find(".giftRegistryIdToSubmit").val(giftRegistryId);
	$form.find(".addItemToOrder").attr("disabled","true");
	$form.find(".addCulinaryToOrder").removeAttr("disabled");
	$form.submit();
}
/**********************************culinary product end*******************************************/


/**********************************giftcard product begin******************************************/

function addToCartGiftcardAjaxFormSubmit(elementId,$form,productId,skuId,quantity,type){
	var options={
	success:function (data) {
			$("#"+elementId).html(data);
			postAddToCartGiftcard(productId,skuId,quantity,type);
		}
	};
	$form.ajaxSubmit(options);
}

/**
 * if add to cart sucessful popup mini cart
 * @return
 */
function postAddToCartGiftcard(productId,skuId,quantity) {
	var errorCountId = skuId+"AddToCartFormErrorCount";
	var errorCount = $("#"+errorCountId).val();
	if(errorCount==0) {
		restoreButtonStatus(productId,skuId,quantity,'0');
		$("#topHeaderItemCount").load(contextPath+"/includes/headerCartItemsForAjax.jsp", function() {
			$('#tellApart').load('/tellApartTag.jsp?actionType=updateCart&targetPage=Partial&rnd=' + random_string(), function() {
				$("#cartpopup").load(contextPath+"/cart/miniCart.jsp", function() {
					$(".cartpopuptrigger").trigger('click');
				});
			});
		});
		$("#beginCheckoutFormDiv").load(contextPath+"/cart/include/beginCheckoutForm.jsp");
		$("#beginCheckoutFormDivPPExpress").load(contextPath+"/cart/include/beginCheckoutFormPPExpress.jsp");
	} else {
		window.scrollTo(0,0);
		clearRecorders(productId);
	}
}

//giftcard sku
function addToCartGiftCard(productId,skuId,qtyId,giftRegistryId,cardValId,recipientNameId,giverNameId,giverMessageId,emailId,futureSendDateId,isElectricTypeId,type){
	if ( typeof($("#emailId2")) != 'undefined' ) {
		if ($('#emailId').val() != $('#emailId2').val()) {
			$('#emailId2Error').show();
			$('#emailId2').focus();
			return false;
		}
	}

	var messageStr = "";
	for (var index = 0; index < 4; index++) {
		var indexedValue = $('#giftmessage .textarea:eq(' + index + ')').val();

		messageStr += (!indexedValue || 0 === indexedValue.length) ? " " : ($('#giftmessage .textarea:eq(' + index + ')').val() + addPaddingToForty($('#giftmessage .textarea:eq(' + index + ')').val()));
	}

	$("#" + giverMessageId).val(messageStr);

	var commerceItemType = "giftCardCommerceItem";
	var $form = $("#addItemToCartForm");
	var quantity = $("#"+qtyId).val();
	$form.find(".commerceItemTypeToSubmit").val(commerceItemType);
	$form.find(".productToSubmit").val(productId);
	$form.find(".skuToSubmit").val(skuId);
	$form.find(".qtyToSubmit").val(quantity);
	$form.find(".giftlistIdToSubmit").val(giftRegistryId);
	$form.find(".cardValToSubmit").val($("#"+cardValId).val());
	$form.find(".emailToSubmit").val($("#"+emailId).val());
	$form.find(".recipientNameToSubmit").val($("#"+recipientNameId).val());
	$form.find(".giverNameToSubmit").val($("#"+giverNameId).val());
	$form.find(".giverMessageToSubmit").val($("#"+giverMessageId).val());
	$form.find(".futureSendDateToSubmit").val($("#"+futureSendDateId).val());
	$form.find(".isElectricTypeToSubmit").val($("#"+isElectricTypeId).val());
	var grid = $("#grIdPDP").val();//if the grIdPDP is not null means add the GC for GR
	var length = $.trim(grid).length;
	if(length>0){
		$form.find(".giftRegistryIdToSubmit").val(grid);
	}
	$form.find(".addCulinaryToOrder").attr("disabled","true");
	var finalUrl;
	switch(type){
		//Traditional
		case '1':
			finalUrl=getAddTraditionalGiftcardsProductUrl(productId,skuId);
			break;
		//Virtual
		case '2':
			finalUrl=getAddVirtualGiftcardsProductUrl(productId,skuId);
			break;
		default:
			break;
	}
	if(giftRegistryId!=''){
	finalUrl=finalUrl+"&grId="+giftRegistryId+"&gcSkuId="+skuId;
	}
	$form.find(".addItemToOrderSuccessURL").val(finalUrl);
	$form.find(".addItemToOrderErrorURL").val(finalUrl);
	addToCartGiftcardAjaxFormSubmit("giftcarddetail",$form,productId,skuId,quantity);
}

/**********************************giftcard product end*******************************************/



//Those coded following may used before. pre remove test if system is ok.

//store sku
function addToCartStore2(productId,skuId,qtyId,giftRegistryId,giftitemId,index,url){
	var commerceItemType = "storeCommerceItem";
	var $form = $("#"+productId+"AddItemToOrderForm");
	$form.find(".commerceItemTypeToSubmit").val(commerceItemType);
	$form.find(".productToSubmit").val(productId);
	$form.find(".skuToSubmit").val(skuId);
	$form.find(".qtyToSubmit").val($("#"+qtyId).val());
	$form.find(".giftlistIdToSubmit").val(giftRegistryId);
	//$form.find(".addItemToOrder").trigger('click');
	$form.ajaxSubmit({
		success:function (data) {
			$("#topHeaderItemCount").load(contextPath+"/includes/headerCartItemsForAjax.jsp", function() {
				$('#tellApart').load('/tellApartTag.jsp?actionType=updateCart&targetPage=Partial&rnd=' + random_string(), function() {
					$("#cartpopup").load(contextPath+"/cart/miniCart.jsp", function() {
						$.ajax({
							type: "POST",
							cache: false,
							url: contextPath+"/registry/include/giftRegistryListItemDetail.jsp",
							data: "giftItemId="+giftitemId+"&index="+index+"&id="+giftRegistryId+"&url="+url,
							success: function(msg) {
								$("#giftitem_"+giftitemId).html(msg);
								$(".cartpopuptrigger").trigger('click');
							}
						});
					});
				});
			});
		}
	});
}



//add by Scority
//this function is called by add GC into cart in PDP
function addToCartGiftCardForGRInPDP(productId,skuId,qtyId,giftRegistryId,cardValId,recipientNameId,giverNameId,giverMessageId,emailId,futureSendDateId,isElectricTypeId,actionURL){
	var commerceItemType = "giftCardCommerceItem";
	var $form = $("#"+productId+"AddItemToOrderForm");
	$form.attr("action",actionURL);
	$form.find(".commerceItemTypeToSubmit").val(commerceItemType);
	$form.find(".productToSubmit").val(productId);
	$form.find(".skuToSubmit").val(skuId);
	$form.find(".qtyToSubmit").val($("#"+qtyId).val());
	$form.find(".giftlistIdToSubmit").val(giftRegistryId);
	$form.find(".cardValToSubmit").val($("#"+cardValId).val());
	$form.find(".emailToSubmit").val($("#"+emailId).val());
	$form.find(".recipientNameToSubmit").val($("#"+recipientNameId).val());
	$form.find(".giverNameToSubmit").val($("#"+giverNameId).val());
	$form.find(".giverMessageToSubmit").val($("#"+giverMessageId).val());
	$form.find(".futureSendDateToSubmit").val($("#"+futureSendDateId).val());
	$form.find(".isElectricTypeToSubmit").val($("#"+isElectricTypeId).val());
	var grid = $("#grIdPDP").val();//if the grIdPDP is not null means add the GC for GR
	var length = $.trim(grid).length;
	if(length>0){
		$form.find(".giftRegistryIdToSubmit").val(grid);
	}
	$form.find(".addItemToOrder").trigger('click');
}


function updateItemQtyFromCart(itemId){	
	var qty = $("#"+itemId).val();
	$("#shoppingCartForm")[0].reset();
	$("#"+itemId).val(qty);
	$("#updateItemQty").trigger('click');
}
function removeItemFromCart(itemId,productID,skuID) {
	//add scOpen & scAdd omniture event here
	try{
		OmnitureCenter.removeShoppingCartEvent(productID,skuID);
	}catch(e){
		//alert(e);
	}
	//*******************************
	$("#removalCommerceIds").val(itemId);
	$("#removeItem").trigger('click');
}

function removeItemFromCartCulinary(itemIds){
	var ids=itemIds.split(",");
	for (i=0;i<ids.length ;i++ ){
		var seq = i+1;
		$("#removalCommerceIds_"+seq).val(ids[i]);
	}
	$("#removeItem").trigger('click');
}

function updateAttendeeFromCartCulinary(itemIds,sku,prodid,count){
	var commerceItemType = "culinaryCommerceItem";
	$("#updateAttendeeCommerceIds").val(itemIds);
	$("#updateAttendeeproductToSubmit").val(prodid);
	$("#updateAttendeeskuToSubmit").val(sku);
	$("#updateAttendeecommerceItemTypeToSubmit").val(commerceItemType);
	$("#updateAttendeeqtyToSubmit").val(count);
	$("#culUpdateAttendee").trigger('click');
}

function updateRecipientFromCartGiftcard(itemId,sku,prodid,cardValue,count,revName,giverName){
	var commerceItemType = "giftcardCommerceItem";
	$("#updateRecipientCommerceId").val(itemId);
	$("#updateRecipientproductToSubmit").val(prodid);
	$("#updateRecipientkuToSubmit").val(sku);
	$("#updateRecipientcommerceItemTypeToSubmit").val(commerceItemType);
	$("#updateRecipientcardValueToSubmit").val(cardValue);
	$("#updateRecipientqtyToSubmit").val(count);
	$("#updateRecipientrevNameToSubmit").val(revName);
	$("#updateRecipientgiverNameToSubmit").val(giverName);
	$("#updateRecipient").trigger('click');
}

function moveItemToWishlist(commerceItemId,quantity){
	var $form=$("#cartToWishlistForm");
	$form.find(".commerceItemId").val(commerceItemId);
	$form.find(".quantity").attr("name",commerceItemId);
	$form.find(".quantity").val(quantity);
	$form.find(".moveItemsFromCart").trigger('click');
}


function moveItemToRegistry(commerceItemId,quantity,onlyGRId){
	var $form=$("#cartToRegistryForm");
	$form.find(".commerceItemId").val(commerceItemId);
	$form.find(".quantity").attr("name",commerceItemId);
	$form.find(".quantity").val(quantity);
	$form.find(".giftlistId").val(onlyGRId);
	$form.find(".moveItemsFromCart").trigger('click');
}
var $subForm;
function moveItemToRegistryWithOutGRMode(commerceItemId,quantity){
	$subForm=$("#cartToRegistryForm");
	$subForm.find(".commerceItemId").val(commerceItemId);
	$subForm.find(".quantity").attr("name",commerceItemId);
	$subForm.find(".quantity").val(quantity);
	$("#giftselectregistry").jqmShow();
}

function popCartToRegistryCommit(){
	$subForm.find(".giftlistId").val($("#selectedGR").val());
	$subForm.find(".moveItemsFromCart").trigger('click');
}

function moveItemToWishlistCulinary(itemIds,quantity){
	var $form=$("#cartToWishlistForm");
	var ids=itemIds.split(",");
	for (i=0;i<ids.length ;i++ ){
		var seq = i+1;
		$form.find(".commerceItemId_"+seq).val(ids[i]);
		$form.find(".quantity_"+seq).attr("name",ids[i]);
		$form.find(".quantity_"+seq).val("1");
	}
	$form.find(".moveItemsFromCart").trigger('click');
}

function moveItemToRegistryCulinary(itemIds,quantity,onlyGRId){
	var $form=$("#cartToRegistryForm");
	var ids=itemIds.split(",");
	for (i=0;i<ids.length ;i++ ){
		var seq = i+1;
		$form.find(".commerceItemId_"+seq).val(ids[i]);
		$form.find(".quantity_"+seq).attr("name",ids[i]);
		$form.find(".quantity_"+seq).val("1");
	}
	$form.find(".giftlistId").val(onlyGRId);
	$form.find(".moveItemsFromCart").trigger('click');
}

function moveItemToRegistryCulinaryWithOutGRMode(itemIds,quantity){
	$subForm=$("#cartToRegistryForm");
	var ids=itemIds.split(",");
	for (i=0;i<ids.length ;i++ ){
		var seq = i+1;
		$subForm.find(".commerceItemId_"+seq).val(ids[i]);
		$subForm.find(".quantity_"+seq).attr("name",ids[i]);
		$subForm.find(".quantity_"+seq).val("1");
	}
	$("#giftselectregistry").jqmShow();
}

function moveItemsFromWishlist(giftlistItemId){
	 $("#wishListToCartForm .giftlistItemId").val(giftlistItemId);
	 var qty = $("#"+giftlistItemId).val();
	 $("#wishListToCartForm .giftlistItem_qty").val(qty);
	 $("#wishListToCartForm").submit();
}

function moveItemsFromGiftRegistry(giftRegistryId,giftlistItemId){
	var $form=$("#giftRegistryToCartForm");
	$form.find(".giftlistId").val(giftRegistryId);
	$form.find(".giftRegistryId").val(giftRegistryId);
	$form.find(".giftlistItemId").val(giftlistItemId);
	$form.find(".moveItemsFromGiftRegistry").trigger('click');
}

function changeContinueButton(obj){
	if(obj.value==""){
		$("#continueButton").attr("class","buttonalt");
		$("#continueButton").unbind("click");
	}else{
		$("#continueButton").attr("class","button giftreg");
		$("#continueButton").click( function() {
			popCartToRegistryCommit();
		});
	}
}
function QtyNumberConstraintValidator(evt,QtyField) {

	QtyField.maxLength=3;

	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if(charCode==37||charCode==39||charCode==46) {
		return true;
	}
	if(QtyField.value.length>3 && charCode!=8) {
		return false;
	}
	if((charCode >= 96 && charCode <= 105)||(charCode>=112 && charCode<=123)) {
		return true;
	}
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

function removeNonNumeric(field) {
	var text = field.value;
	var patrn=/[^0-9]+/;
	text = text.replace(patrn, "");
	field.value = text!="" ? parseInt(text,10) : text;
}
