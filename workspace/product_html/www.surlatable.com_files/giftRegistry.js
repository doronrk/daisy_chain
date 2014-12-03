/**
 * author: thomas
 * date: 2010-7-23
 */

/***************************************store product begin****************************************/

function addToRegistryStoreAjaxFormSubmit(elementId,$form,productId,skuId,quantity,type){
	var options={
	success:function (data) {	
	 	    $("#"+elementId).html(data);
	 	    postAddToRegistryStore(productId,skuId,quantity,type);
		}
	};
	$form.ajaxSubmit(options);	
}

function postAddToRegistryStore(productId,skuId,quantity,type){
	var errorCountId = skuId+"AddToRegistryFormErrorCount";
	var errorCount = $("#"+errorCountId).val();
	
	$("#giftselectregistry").jqmHide();
	if(errorCount==0){
		restoreButtonStatus(productId,skuId,quantity,'1');
	}else{
		clearRecorders(productId);
	}
	if(type==3){
	    $("#productquickview").jqmShow();
	}
}

// add for bug 13568 start
function addToRegistryStoreAjaxFormSubmitLoadRegistry(elementId,$form,productId,skuId,quantity,type){
	var options={
	success:function (data) {	
	 	    $("#"+elementId).html(data);
	 	    postAddToRegistryStoreLoadRegistry(productId,skuId,quantity,type);
		}
	};
	$form.ajaxSubmit(options);	
}

function postAddToRegistryStoreLoadRegistry(productId,skuId,quantity,type){
	var errorCountId = skuId+"AddToRegistryFormErrorCount";
	var errorCount = $("#"+errorCountId).val();
	
	$("#giftselectregistry").jqmHide();
	if(errorCount==0){
		restoreButtonStatus(productId,skuId,quantity,'1');
	}else{
		clearRecorders(productId);
	}
	if(type==3){
	    $("#productquickview").jqmShow();
	}
	
	 $("#topHeaderGiftCount").load(contextPath + "/includes/headerRegistryItems.jsp");  
} 
// add for bug 13568 end

function addToRegistryStoreSingleGR(productId, skuId, qtyId , onlyGRId,sizeSelectionId,colorSelectionId,type) {
	
	var selectResult = promptUserToChoose(productId,sizeSelectionId,colorSelectionId);
	if(selectResult==1){
		return;
	}
	
	//omniture function
	OmnitureCenter.addGREvent(productId,skuId);
	
	var $form = $("#addItemToRegistryForm");
	var quantity = $("#"+qtyId).val();
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val(quantity);
	$form.find(".giftlistId").val(onlyGRId);
	var finalUrl;
	var elementId;
	switch(type){
		case '1':
			finalUrl= getAddPrimaryStoreProductUrl(productId,sizeSelectionId,colorSelectionId);
			elementId = "productdetailinfo";
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
	$form.find(".addItemToGiftlistSuccessURL").val(finalUrl);
	$form.find(".addItemToGiftlistErrorURL").val(finalUrl);
	addToRegistryStoreAjaxFormSubmitLoadRegistry(elementId,$form,productId,skuId,quantity,type);  //alter for bug 13568
}

function addToRegistryStoreMultiGR(productId, skuId, qtyId ,sizeSelectionId,colorSelectionId,type) {
	
	var selectResult = promptUserToChoose(productId,sizeSelectionId,colorSelectionId);
	if(selectResult==1){
		return;
	}
	
	//omniture function
	OmnitureCenter.addGREvent(productId,skuId);
	
	$("#productquickview").jqmHide();
	$("#selectGRError").empty();
	$("#giftselectregistry").jqmShow();
	$("#continueButton").unbind("click");
	$("#continueButton").click(function (){
		submitStoreManage(productId, skuId, qtyId ,sizeSelectionId,colorSelectionId,type);
	});
}


function submitStoreManage(productId, skuId, qtyId ,sizeSelectionId,colorSelectionId,type) {
	var selectedGR = $("#selectedGR").val();
	if (selectedGR == null || "" == selectedGR) {
		$("p.haserror").empty().text("Please select a gift registry!");
		return;
	}
	var quantity = $("#"+qtyId).val();
	var $form = $("#addItemToRegistryForm");
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val(quantity);
	$form.find(".giftlistId").val(selectedGR);
	var finalUrl;
	var elementId;
	switch(type){
		case '1':
			finalUrl= getAddPrimaryStoreProductUrl(productId,sizeSelectionId,colorSelectionId);
			elementId = "productdetailinfo";
			break;
		case '2':
			var finalUrl = getAddRelevancyStoreProductUrl(productId,sizeSelectionId,colorSelectionId);
		    var idSplit = sizeSelectionId.split('_');
		    elementId = idSplit[1]+"Product"+idSplit[2];
			break;
		case '3':
			var finalUrl =getAddQuickViewStoreProductUrl(productId,sizeSelectionId,colorSelectionId);
			elementId = "detailInfo";
			break;
		default:
			break;
	}
	$form.find(".addItemToGiftlistSuccessURL").val(finalUrl);
	$form.find(".addItemToGiftlistErrorURL").val(finalUrl);
	addToRegistryStoreAjaxFormSubmit(elementId,$form,productId,skuId,quantity,type);
}
/***********************************************store product end************************************/



/***********************************************culinary product begin********************************/

function addToRegistryCulinaryAjaxFormSubmit(elementId,$form,productId,skuId,quantity){
	var options={
	success:function (data) {	
	 	    $("#"+elementId).html(data);
	 	    postAddToRegistryCulinary(productId,skuId,quantity);
		}
	};
	$form.ajaxSubmit(options);	
}

function postAddToRegistryCulinary(productId,skuId,quantity){
	var errorCountId = skuId+"AddToRegistryFormErrorCount";
	var errorCount = $("#"+errorCountId).val();
	
	$("#giftselectregistry").jqmHide();
	if(errorCount==0){
		restoreButtonStatus(productId,skuId,quantity,'1');
	}else{
		clearRecorders(productId);
	}
}

/**
 * type:
 *  --1: primary product
 *  --2: relevancy product
 *  if need to extend type,just need add the geturl method in toolbarPub.js
 *  here add case x: action();
 */
function addToRegistryCulinarySingleGR(productId, skuId, qtyId ,onlyGRId,locSelectionId,type) {
	//omniture function
	OmnitureCenter.addGREvent(productId,skuId);
	
	var $form = $("#addItemToRegistryForm");
	var quantity = $("#"+qtyId).val();
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val(quantity);
	$form.find(".giftlistId").val(onlyGRId);
	var finalUrl;
	var elementId;
	switch(type){
		case '1':
			finalUrl= getAddPrimaryCulinaryProductUrl(skuId);
			elementId = "culPrimaryDetail";
			break;
		case '2':
			finalUrl = getAddRelevancyCulinaryProductUrl(productId,locSelectionId);
		    var idSplit = locSelectionId.split('_');
		    elementId = "class"+idSplit[1];
			break;
		default:
			break;
	}
	$form.find(".addItemToGiftlistSuccessURL").val(finalUrl);
	$form.find(".addItemToGiftlistErrorURL").val(finalUrl);
	addToRegistryCulinaryAjaxFormSubmit(elementId,$form,productId,skuId,quantity);
}


function addToRegistryCulinaryMultiGR(productId, skuId, qtyId ,locSelectionId,type) {
	//omniture function
	OmnitureCenter.addGREvent(productId,skuId);
	
	$("#productquickview").jqmHide();
	$("#selectGRError").empty();
	$("#giftselectregistry").jqmShow();
	$("#continueButton").unbind("click");
	$("#continueButton").click(function (){
		submitCulinaryManage(productId, skuId, qtyId ,locSelectionId,type);
	});
}

function submitCulinaryManage(productId, skuId, qtyId ,locSelectionId,type) {
	var selectedGR = $("#selectedGR").val();
	if (selectedGR == null || "" == selectedGR) {
		$("p.haserror").empty().text("Please select a gift registry!");
		return;
	}
	var quantity = $("#"+qtyId).val();
	var $form = $("#addItemToRegistryForm");
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val(quantity);
	$form.find(".giftlistId").val(selectedGR);
	var finalUrl;
	var elementId;
	switch(type){
		case '1':
			finalUrl= getAddPrimaryCulinaryProductUrl(skuId);
			elementId = "culPrimaryDetail";
			break;
		case '2':
			var finalUrl = getAddRelevancyCulinaryProductUrl(productId,locSelectionId);
		    var idSplit = locSelectionId.split('_');
		    elementId = "class"+idSplit[1];
			break;
		default:
			break;
	}
	$form.find(".addItemToGiftlistSuccessURL").val(finalUrl);
	$form.find(".addItemToGiftlistErrorURL").val(finalUrl);
	addToRegistryCulinaryAjaxFormSubmit(elementId,$form,productId,skuId,quantity);
}
/***********************************************culinary product end********************************/


/***********************************************giftcard product begin******************************/

function addToRegistryGiftcardAjaxFormSubmit(elementId,$form,productId,skuId,quantity,selectedGR){
	var options={
	success:function (data) {	
	 	    $("#"+elementId).html(data);
	 	    if($("#topHeaderGiftCount").size()>0){
	 	    	$("#topHeaderGiftCount").load("/includes/headerRegistryItems.jsp");
	 	    }
	 	    postAddToRegistryGiftcard(productId,skuId,quantity,selectedGR);
		}
	};
	$form.ajaxSubmit(options);	
}

function postAddToRegistryGiftcard(productId,skuId,quantity,selectedGR){
	var errorCountId = skuId+"AddToRegistryFormErrorCount";
	var errorCount = $("#"+errorCountId).val();
	
	$("#giftselectregistry").jqmHide();
	if(errorCount==0){
		restoreButtonStatus(productId,skuId,quantity,'1');
		var url = contextPath+"/registry/include/popup/giftcarditemsadded_popup.jsp";
		var params = {giftlistId: selectedGR};
		loadPopup(url,params);
	}else{
		clearRecorders(productId);
	}
}



function addToRegistryGiftcardSingleGR(productId, skuId, qtyId , onlyGRId,type){
	//omniture function
	OmnitureCenter.addGREvent(productId,skuId);
	
	var $form = $("#addItemToRegistryForm");
	var quantity = $("#" + qtyId).val();
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val(quantity);
	$form.find(".giftlistId").val(onlyGRId);
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
	$form.find(".addItemToGiftlistSuccessURL").val(finalUrl);
	$form.find(".addItemToGiftlistErrorURL").val(finalUrl);
	addToRegistryGiftcardAjaxFormSubmit("giftcarddetail",$form,productId,skuId,quantity,onlyGRId);
}

function addToRegistryGiftcardMultiGR(productId, skuId, qtyId ,type){
	//omniture function
	OmnitureCenter.addGREvent(productId,skuId);
	
	$("#productquickview").jqmHide();
	$("#selectGRError").empty();
	$("#giftselectregistry").jqmShow();
	$("#continueButton").unbind("click");
	$("#continueButton").click(function (){
		submitGiftcardManage(productId, skuId, qtyId ,type);
	});
}

function submitGiftcardManage(productId, skuId, qtyId ,type) {
	var selectedGR = $("#selectedGR").val();
	if (selectedGR == null || "" == selectedGR) {
		$("p.haserror").empty().text("Please select a gift registry!");
		return;
	}
	var quantity = $("#"+qtyId).val();
	var $form = $("#addItemToRegistryForm");
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val(quantity);
	$form.find(".giftlistId").val(selectedGR);
	var finalUrl;
	switch(type){
		case '1':
			finalUrl=getAddTraditionalGiftcardsProductUrl(productId,skuId);
			break;
		case '2':
			finalUrl=getAddVirtualGiftcardsProductUrl(productId,skuId);
			break;
		default:
			break;
	}
	$form.find(".addItemToGiftlistSuccessURL").val(finalUrl);
	$form.find(".addItemToGiftlistErrorURL").val(finalUrl);
	addToRegistryGiftcardAjaxFormSubmit("giftcarddetail",$form,productId,skuId,quantity,selectedGR);
}



/***********************************************giftcard product end********************************/



//Those coded following may used before. pre remove test if system is ok.
/*
function addToRegistry(productId, skuId, qtyId,actionURLId) {
	var $form = $("#" + productId + "AddToRegistryForm");
	$form.attr("action",$("#"+actionURLId).val());
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val($("#" + qtyId).val());
	$form.find(".addItem").click();
}
function addToRegistryCulinary(productId, skuId, qtyId,actionURLId) {
	var $form = $("#" + productId + "AddToRegistryForm");
	$form.attr("action",$("#"+actionURLId).val());
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val($("#" + qtyId).val());
	$form.find(".addItem").click();
}
function addToRegistryGiftCard(productId, skuId, qtyId,actionURLId) {
	var $form = $("#" + productId + "AddToRegistryForm");
	$form.attr("action",$("#"+actionURLId).val());
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val($("#" + qtyId).val());
	var options={
			success:function () {
				var url = contextPath + "/registry/include/popup/giftcarditemsadded_popup.jsp";
				loadPopup(url);
//				var toolbarURL = contextPath + "/browse/include/giftCardToolbar.jsp";
//				$("#giftCardToolbar").load(url);
			}
		};
	$form.ajaxSubmit(options);
}

function addToRegistryWithOutGRMode(ctx, productId, skuId, qtyId,actionURLId) {
	$("#selectGRError").empty();
	$("#giftselectregistry").jqmShow();
	var $form = $("#" + productId + "AddToRegistryForm");
	$form.attr("action",$("#"+actionURLId).val());
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val($("#" + qtyId).val());
	subForm = $form;
}

function addToRegistryCulinaryWithOutGRMode(ctx, productId, skuId, qtyId,actionURLId) {
	$("#selectGRError").empty();
	$("#giftselectregistry").jqmShow();
	var $form = $("#" + productId + "AddToRegistryForm");
	$form.attr("action",$("#"+actionURLId).val());
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val($("#" + qtyId).val());
	subForm = $form;
}


function addToRegistryWithOutGRModeWhenOneGR(ctx, productId, skuId, qtyId , onlyGRId,actionURLId) {
	var $form = $("#" + productId + "AddToRegistryForm");
	$form.attr("action",$("#"+actionURLId).val());
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val($("#" + qtyId).val());
	subForm = $form;
	$(subForm).find(".giftlistId").val(onlyGRId);
	$(subForm).find(".activeGRId").val(onlyGRId);
	$form.find(".addItem").click();
}
function addToRegistryGiftcardWithOutGRModeWhenOneGR(ctx, productId, skuId, qtyId , onlyGRId,actionURLId) {
	var $form = $("#" + productId + "AddToRegistryForm");
	$form.attr("action",$("#"+actionURLId).val());
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val($("#" + qtyId).val());
	subForm = $form;
	$(subForm).find(".giftlistId").val(onlyGRId);
	$(subForm).find(".activeGRId").val(onlyGRId);
	var options={
			success:function () {
				var url = contextPath + "/registry/include/popup/giftcarditemsadded_popup.jsp";
				loadPopup(url);
			}
		};
	$(subForm).ajaxSubmit(options);
}

function addToRegistryCulinaryWithOutGRModeWhenOneGR(ctx, productId, skuId, qtyId , onlyGRId,actionURLId) {
	var $form = $("#" + productId + "AddToRegistryForm");
	$form.attr("action",$("#"+actionURLId).val());
	$form.find(".productId").val(productId);
	$form.find(".skuId").val(skuId);
	$form.find(".quantity").val($("#" + qtyId).val());
	subForm = $form;
	$(subForm).find(".giftlistId").val(onlyGRId);
	$(subForm).find(".activeGRId").val(onlyGRId);
	$form.find(".addItem").click();
}

function giftcardSubmitManage() {
	var selectedGR = $("#selectedGR").val();
	if (selectedGR == null || "" == selectedGR) {
		$("p.haserror").empty().text("Please select a gift registry!");
		return;
	}
	$(subForm).find(".giftlistId").val(selectedGR);
	$(subForm).find(".activeGRId").val(selectedGR);
	//$(subForm).find(".addItem").click();
	$('#giftselectregistry').jqmHide();
	var options={
		success:function () {
			var url = contextPath + "/registry/include/popup/giftcarditemsadded_popup.jsp";
			var params = {giftlistId: selectedGR};
			loadPopup(url, params);
		}
	};
	$(subForm).ajaxSubmit(options);
}
*/
function removeFromGiftRegistry(itemId) {
	$("#updateItemId").val(itemId);
	$("#updateItemQty").val(0);
	$("#updateGiftlistItems").click();
}

function updateQtyFromGiftRegistry(itemId) {
	$("#updateReceivedDiv").remove();
	var qty = $("#" + itemId).val();
	$("#giftRegistryForm")[0].reset();
	$("#updateItemQty").val(qty);
	$("#updateItemId").val(itemId);
	$("#" + itemId).val(qty);

	$("#giftRegistryForm").find("#div_accordian > .contents,#registryItems").each(function() {
		if ($(this).css("display") == 'block') {
			var giftItem=$(this).attr("id");
			var inputHtml="<input type='hidden' name='expandDivs' value="+giftItem+" />";
			$("#giftRegistryForm").append(inputHtml);
		}
	});
	$("#updateGiftlistItems").click();
}

function updateQtyFromGiftRegistry1(itemId,categoryDivId,divSkuId) {
	$("#updateReceivedDiv").remove();
	var qty = $("#" + itemId).val();
	$("#giftRegistryForm")[0].reset();
	$("#updateItemQty").val(qty);
	$("#updateItemId").val(itemId);
	$("#" + itemId).val(qty);

	$("#giftRegistryForm").find("#div_accordian > .contents,#registryItems").each(function() {
		if ($(this).css("display") == 'block') {
			var giftItem=$(this).attr("id");
			var inputHtml="<input type='hidden' name='expandDivs' value="+giftItem+" />";
			$("#giftRegistryForm").append(inputHtml);
		}
	});
	
	$("#updateItemQtySkuId").val("div_"+divSkuId);
	$("#updateItemQtyCategory").val("head_"+categoryDivId);
	$("#updateGiftlistItems").click();
}

function updateRecivedQtyFromGiftRegistry(itemId) {
	$("#updateGiftlistItemsDiv").remove();
	var qty = $("#received" + itemId).val();
	$("#updateReceivedQty").val(qty);
	$("#giftItemId").val(itemId);
	$("#updateReceivedIQtySubmit").click();
}

$(document).ready(function() {
	
	$("#selectedGR").bind("change", function() {
		$("#selectGRError").empty();
	});
	
	$(".giftselectregistrytrigger").bind("click", function() {
		$("#selectGRError").empty();
	});
});

function moveItemsFormWishlistToRegistrySingle(qtyId) {
	var $form = $("#moveToRegistryForm");
	$form.find(".quantity").val($("#" + qtyId).val());
	$form.find(".wishlistItemId").val(qtyId);
	$form.submit();
}

function moveItemsFormWishlistToRegistryMulti(qtyId) {
	var $form = $("#moveToRegistryForm");
	$form.find(".giftlistId").val($("#selectedGR").val());
	if($form.find(".giftlistId").val() == ''){
		$("p.haserror").empty().text("Please select a gift registry!");
		return;
	}
	$form.find(".quantity").val($("#" + qtyId).val());
	$form.find(".wishlistItemId").val(qtyId);
	$form.submit();
}
function chooseRegistry(wishlistItemIdVal) {
	loadPopup(contextPath + '/registry/include/popup/giftselectregistryWishlist_popup.jsp', 
			{
				wishlistItemId : wishlistItemIdVal
			}
	);
}
