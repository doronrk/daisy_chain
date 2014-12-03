//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2010 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 * @fileOverview This file is to be included in all full pages that use the
 *               CatalogEntryThumbnailDisplay.jspf. It prepares all the code
 *               required for the Product Quick View pop-up reveal.
 */

// Make the Product Quick View pop-up window movable.
dojo.require("dojo.dnd.move");
dojo.require("dijit.Dialog");
dojo.require("dojo._base.event");

var langId = "-1"; /* language of the store */
var storeId = ""; /* numeric unique identifier of the store */
var catalogId = ""; /* catalog of the store that is currently in use */

/** The variable stores the Product Quick View pop-up window. */
var m1;

/**
 * This variable is the id of element to display the pop-up around on <Enter>
 * key click. Its default value is set to empty.
 */
var nodeId = "";

/**
 * Used by the Brazil store, this variable is the id of the product entry to
 * use. The ProductID in the Madisons store has been increment by one, so its
 * really productID + 1. Hence, Brazil store will use the original productID,
 * called origProductID. Its default value is set to empty.
 */
var origProductID = "";

/** The variable stores the identifier of the order item to be replaced */
var replaceOrderItemId;

/** The response from the server */
var responseJSON;

/**
 * Initializes the Product Quick View pop-up window to a movable dialog.
 */
var initPopup = function() {
  m1 = new dojo.dnd.Moveable("second_level_category_popup", {
    handle : "popupHeader"
  });
};

var changeAttrId = "";
var changeContractId = "";

/** Base relative URL for links to the PDP (HANESPRO-3423) */
var baseRelativeURL = "";

/** Canonical URL for links to the PDP (HANESPRO-3757) */
var canonicalUrl = "";

/** Catalog entry scene7 url */
var catEntryScene7URL = "";

/** Place-holder for selected color */
var selectedColor = "";

/* Below variables are for size/color dropdown*/
var colorForSizesArray;
var sizeForColorsArray;
var colorsArray;
var sizesArray;
var partnumber;
var featureColor;

dojo.addOnLoad(initPopup);

function setCatEntryScene7URL(url) {
  catEntryScene7URL = url;
}

/**
 * Displays the Product Quick View button.
 *
 * @param {string}
 *            id The id of the div area to show.
 */
function showPopupButton(id) {
  if (document.getElementById("popupButton_" + id) != null && document.getElementById("popupButton_" + id) != 'undefined') {
    var popupButton = document.getElementById("popupButton_" + id);
    popupButton.style.visibility = "visible";
  }
}

/**
 * Hides the Product Quick View button.
 *
 * @param {string}
 *            id The id of the div area to hide.
 */
function hidePopupButton(id) {
  if (document.getElementById("popupButton_" + id) != null && document.getElementById("popupButton_" + id) != 'undefined') {
    var popupButton = document.getElementById("popupButton_" + id);
    popupButton.style.visibility = "hidden";
  }
}

/**
 * Overrides the hidePopupButton function above by also checking to see
 * if the user clicks shift+tab.
 *
 * @param {string}
 *            id The id of the div area to hide.
 * @param {event}
 *            event The keystroke event entered by the user.
 */
function shiftTabhidePopupButton(id, e) {
  if ((e.shiftKey) && (dojo.keys.TAB)) {
    hidePopupButton(id);
  }
}

/**
 * Displays the Product Quick View pop-up containing product information.
 * Retrieves product information in JSON format via an Ajax call.
 *
 * @param {string}
 *            productId The id of the product to display.
 * @param {string}
 *            event The event triggered from user actions.
 * @param {string}
 *            nodeId The id of element to display the pop-up around on <Enter>
 *            key click.
 * @param {object}
 *            productActionList The object containing Product Quick View pop-up
 *            action list settings.
 * @param {string}
 *            popUpQty The quantity to be displayed for this product.
 */
function showQuickViewPopup(productId, event, productActionList, popUpQty, scene7FeatureColor, categoryId, itemDoorFlag, canonicalUrlExists) {
  if (event == null || (event != null && event.type != "keypress") || (event != null && event.type == "keypress" && event.keyCode == 13)) {

    if (canonicalUrlExists) {
      canonicalUrl = canonicalUrlExists;
    }
    else {
      canonicalUrl = "";
    }

    if(baseRelativeURL == "") {
      var isStorePreview = window.location.href.indexOf("/webapp/wcs/preview/servlet") != -1;
      if(isStorePreview) {
        baseRelativeURL = "/webapp/wcs/preview/servlet/";
      }
      else {
        baseRelativeURL = "/webapp/wcs/stores/servlet/";
      }
    }

    resetQuickViewPopUp();

    // Default action list is used if it is not passed into this method
    if (productActionList == null) {
      productActionList = new popupActionProperties();
    }

    // From the productActionList object properties
    // hide/show the action links from the Quick Info
    if (productActionList.showAddToCart) {
      if (document.getElementById('addToCartAjaxButton')) {
        document.getElementById('addToCartAjaxButton').style.display = 'block';
      } else if (document.getElementById('addToCartButton')) {
        document.getElementById('addToCartButton').style.display = 'block';
      }
    } else {
      if (document.getElementById('addToCartAjaxButton')) {
        document.getElementById('addToCartAjaxButton').style.display = 'none';
      } else if (document.getElementById('addToCartButton')) {
        document.getElementById('addToCartButton').style.display = 'none';
      }
    }

    if (productActionList.showReplaceCartItem) {
      if (document.getElementById('replaceCartItemAjax')) {
        dojo.style("replaceCartItemAjaxContainer", "display", "block");
        document.getElementById('replaceCartItemAjax').style.display = 'block';
      } else if (document.getElementById('replaceCartItemNonAjax')) {
        dojo.style("replaceCartItemNonAjaxContainer", "display", "block");
        document.getElementById('replaceCartItemNonAjax').style.display = 'block';
      }

    } else {
      if (document.getElementById('replaceCartItemAjax')) {
        dojo.style("replaceCartItemAjaxContainer", "display", "none");
      } else if (document.getElementById('replaceCartItemNonAjax')) {
        dojo.style("replaceCartItemNonAjaxContainer", "display", "none");
      }
    }

    // Do not display the Quantity field if the product is not buyable
    if (!productActionList.showAddToCart && !productActionList.showWishList) {
      if (document.getElementById('qvProductPopUpQty')) {
        document.getElementById('qvProductPopUpQty').disabled = true;
      }
    } else {
      if (document.getElementById('qvProductPopUpQty')) {
        document.getElementById('qvProductPopUpQty').disabled = false;
      }
    }
    // Set the quantity to Quantity field
    if (popUpQty == null) {
      document.getElementById('qvProductPopUpQty').value = 1;
    } else {
      document.getElementById('qvProductPopUpQty').value = popUpQty;
    }

    document.getElementById('productCategoryId').innerHTML = categoryId;

    dijit.byId('second_level_category_popup').closeButtonNode.style.display = 'none';
    closeAllDialogs(); // close all dijit.dialogs first
    dijit.byId('second_level_category_popup').show();

    // hides the DialogUnderlayWrapper component, the component that grays
    // out the screen behind,
    // as we do not want the background to be greyed out
    dojo.query('.dijitDialogUnderlayWrapper', document).forEach( function(tag) {
      tag.style.display = 'none';
    });

    var parameters = {};
    parameters.storeId = CommonContextsJS.storeId;
    parameters.langId = CommonContextsJS.langId;
    parameters.catalogId = CommonContextsJS.catalogId;
    parameters.productId = productId;
    parameters.scene7FeatureColor = scene7FeatureColor;
    parameters.field1 = itemDoorFlag;
    parameters.field2 = categoryId;

    //setting global variables
    storeId = CommonContextsJS.storeId;
    langId = CommonContextsJS.langId;
    catalogId = CommonContextsJS.catalogId;

    // The following sequence is required to get the spin cursor showed up
    submitRequest();
    hidePopup('second_level_category_popup');
    cursor_wait();

    dojo.publish("ajaxRequestInitiated");
    dojo.xhrPost( {
      url : getAbsoluteURL() + "GetCatalogEntryDetailsById",
      handleAs : "json-comment-filtered",
      content : parameters,
      service : this,
      load : populateQuickViewPopUp,
      error : function(errObj, ioArgs) {
        console.debug("Quickview.showQuickViewPopup: Unexpected error occurred during an xhrPost request.");
        dojo.publish("ajaxRequestCompleted");
      }
    });


  }
}

function getS7Color(col){
    var colorImage = col.replace(/\//g, "\\");
    colorImage = colorImage.replace(/\\/g, "");
    colorImage = colorImage.replace(/-/g, "");
    colorImage = colorImage.replace(/ /g, "");
    return colorImage;
}

function buildColorSwatches(size){
  var swatchString ="";
  var classIdentifier ="";
  var isSecure = ("https"==jQuery.url.attr("protocol"))?true:false;
  var swatchesURLPrefix = isSecure? document.getElementById('swatchesURLPrefixSecure').innerHTML : document.getElementById('swatchesURLPrefix').innerHTML;
  if(size == null || size == ''){
    var i = 0;
      for(var vColor in colorsArray){
          var color = colorsArray[vColor];
          var setSelectStr = 'categoryDisplayJS.setSelectedAttributeJS(\'Color\',\''+color+'\');updateMoreInfoUrl();';
          if(i == 0)
          {
            //classIdentifier = "qvDefaultSwatch";
          }
          else{
            classIdentifier = "";
          }
          swatchString = swatchString + '<img class="' + classIdentifier + '" src="'+swatchesURLPrefix+partnumber+'_'+ getS7Color(color) +'_sw?$prodSwatch$"  border="1" onclick="javascript:'+setSelectStr+'setOptions(\''+color+'\', true,\''+partnumber+'\');swapQVSwatch(this,\''+color+'\');" />&nbsp;' ;
          i++;
      }
    /*
    // init... using key value in sizeForColorArray
    for(var vIndex in sizeForColorsArray){
        var color = sizeForColorsArray[vIndex].key;  // Color name with possible space
        var setSelectStr = 'categoryDisplayJS.setSelectedAttributeJS(\'Color\',\''+color+'\');updateMoreInfoUrl();';
        swatchString = swatchString + '<img src="'+swatchesURLPrefix+partnumber+'_'+ getS7Color(color) +'_sw?$prodSwatch$"  border="1" onclick="javascript:'+setSelectStr+'setOptions(\''+color+'\', true,\''+partnumber+'\')" />&nbsp;' ;
    }
    */
  }else{
    for(var vIndex in colorForSizesArray){
      if(colorForSizesArray[vIndex].key == size){
        for(var vColorIndex in colorForSizesArray[vIndex].value){
          var color = colorForSizesArray[vIndex].value[vColorIndex];
          var setSelectStr = 'categoryDisplayJS.setSelectedAttributeJS(\'Color\',\''+color+'\');updateMoreInfoUrl();';
          if(color == selectedColor)
          {
            classIdentifier = "qvSelectedSwatch";
          }
          else{
            classIdentifier = "";
          }
          swatchString = swatchString + '<img class="' + classIdentifier + '" src="'+swatchesURLPrefix+partnumber+'_'+ getS7Color(color) +'_sw?$prodSwatch$"  border="1" onclick="javascript:'+setSelectStr+'setOptions(\''+color+'\', true,\''+partnumber+'\');swapQVSwatch(this,\''+color+'\');" />&nbsp;' ;
        }
      }
    }
  }

  return swatchString;
}

function buildSizeDropdown(color){
  var setSelectStr = 'categoryDisplayJS.setSelectedAttributeJS(\'Size\',this.options[this.selectedIndex].value);updateMoreInfoUrl();';

  var sizeString ='<select onchange="'+setSelectStr+'updateColorCombo(this)" id="sizeSelect" name="sizeSelect">'+'<option value="">Size</option>';
  if(color == null || color == ''){
    // init... using sizesArray
    for(var vSize in sizesArray){
        var size = sizesArray[vSize];
        sizeString = sizeString + '<option value="'+size+'">'+size+'</option>';
    }
  }else{ // using value for matached color key in sizeForcolorArray
    var sizeSelected = categoryDisplayJS.selectedAttributes['Size'];
    sizeString = '<select onchange="'+setSelectStr+'updateColorCombo(this)" id="sizeSelect" name="sizeSelect">'+'<option value="">Size</option>';
    for(var vIndex in sizeForColorsArray){
      if(sizeForColorsArray[vIndex].key == color){
        for(var vSizeIndex in sizeForColorsArray[vIndex].value){
          if(sizeSelected!=null && sizeSelected!= '' && (sizeSelected == sizeForColorsArray[vIndex].value[vSizeIndex])){
            sizeString = sizeString + '<option value="'+sizeForColorsArray[vIndex].value[vSizeIndex]+'" selected>'+sizeForColorsArray[vIndex].value[vSizeIndex]+'</option>';
          }else{
            sizeString = sizeString + '<option value="'+sizeForColorsArray[vIndex].value[vSizeIndex]+'">'+sizeForColorsArray[vIndex].value[vSizeIndex]+'</option>';
          }
        }
      }
    }
  }
  sizeString = sizeString+ '</select>';
  return sizeString ;
}

function resetSizeAndColor(){
  document.getElementById('swatchesContainer').innerHTML = buildColorSwatches();
  document.getElementById('sizeDropdownContainer').innerHTML = buildSizeDropdown();
  categoryDisplayJS.setSelectedAttributeJS('Size','');
  categoryDisplayJS.setSelectedAttributeJS('Color','');
  document.getElementById('featureColorSelected').innerHTML = "";
  document.getElementById('productColorPriceDiv').style.display = 'none';
}

// Updates the color drop down based on size selection
function updateColorCombo(size)
{
  if(size.value == ''){
    resetSizeAndColor();
  }else{
    document.getElementById('swatchesContainer').innerHTML = buildColorSwatches(size.value);
  }
}

// Updates the color drop down based on size selection
function updateSizeCombo(color)
{
  document.getElementById('sizeDropdownContainer').innerHTML = buildSizeDropdown(color);
}

function validateSizeColor(){
  clearQVMessage(); //reset all existing messages

  var attr=categoryDisplayJS.selectedAttributes;
  var isValidatedColor = false;
  var isValidatedSize = false;
  var isValidateQty = false;

  for (var i in attr){
    if(i == 'Color' && attr[i]!=null &&  attr[i]!=''){
      isValidatedColor = true;
    }
    if(i == 'Size' && attr[i]!=null &&  attr[i]!=''){
      isValidatedSize = true;
    }
  }
  if(!isValidatedSize){
    alert('Please select a size');
    return false;
  }
  if(!isValidatedColor){
      alert('Please select a color');
      return false;
  }

  // Qty numeric check
  var value = Number($('#qvProductPopUpQty').val());
  if ( (Math.floor(value) == value) && value > 0 && value< 1000 ) {
    isValidateQty = true;
  } else {
    // value is not an integer, show some validation error
    alert("Quantity must be a valid number and between 1 and 999.");
    return false;
  }

  // Need to reset z-index to show cursor on top of QV
  if(jQuery('#progress_bar_dialog') !=null){
    jQuery('#progress_bar_dialog').css("z-index",1000)
  }
  displayProgressBar();

  return (isValidatedSize && isValidatedColor && isValidateQty);
}


/**
 * Populates all the contents of the Product Quick View pop-up with the JSON
 * returned from the server.
 *
 * @param {object}
 *            serviceRepsonse The JSON response from the service.
 * @param {object}
 *            ioArgs The arguments from the service call.
 */
function populateQuickViewPopUp(serviceResponse, ioArgs) {
  // save the serviceResponse
  responseJSON = serviceResponse;

  // populate the entitledItemJsonObject
  categoryDisplayJS.setEntitledItemJsonObject(serviceResponse.productAttributes);

  var catEntryID = serviceResponse.catalogEntry.catalogEntryIdentifier.uniqueID;
  var isProductBean = false;

  qvPartNumber = serviceResponse.catalogEntry.style;
  qvColor = serviceResponse.featureColor;

  document.getElementById("s7ContainerDiv").innerHTML ='<div id="s7Container"><img id="productFullImage" class="product_image" src="' + qvBaseURL + qvStoreNameS7 + qvPartNumber + '_' + qvColor + qvS7params + '" alt="' + serviceResponse.catalogEntry.description[0].name + '" /></div>';

  if (serviceResponse.catalogEntry.catalogEntryTypeCode == 'ProductBean') {
    isProductBean = true;
    if (dojo.byId("catalogEntryTypeCode") != null && dojo.byId("catalogEntryTypeCode") != undefined) {
      dojo.byId("catalogEntryTypeCode").value = "ProductBean";
    }
  }

  var isItemBean = false;
  if (serviceResponse.catalogEntry.catalogEntryTypeCode == 'ItemBean') {
    isItemBean = true;
    if (dojo.byId("catalogEntryTypeCode") != null && dojo.byId("catalogEntryTypeCode") != undefined) {
      dojo.byId("catalogEntryTypeCode").value = "ItemBean";
    }
  }

  var showAddToCart = false;
  var isBuyable = (serviceResponse.catalogEntry.buyable == '1');

  document.getElementById('productIdQuickInfo').innerHTML = catEntryID;

  // document.getElementById('productName').innerHTML = serviceResponse.catalogEntry.description[0].name; // This is commented out because there are two ids on the PDP called 'productName'; revising this statement below
  $("#productIdQuickInfoMainDiv #productName").html(serviceResponse.catalogEntry.description[0].name);

  document.getElementById('productLongDescription').innerHTML = serviceResponse.catalogEntry.description[0].longDescription + '<br />';

  var descAttributesHTML = "";

  document.getElementById('productSKUValue').innerHTML = serviceResponse.catalogEntry.catalogEntryIdentifier.externalIdentifier.partNumber;

  if (document.getElementById("selectedAttr_" + replaceOrderItemId) != null) {
    var selectedAttributesString = document.getElementById("selectedAttr_" + replaceOrderItemId).value.replace(/'/g, "&#039;");
    var selectedAttributeArray = selectedAttributesString.split("|");
  }
  //ProductDisplay?storeId=13201&catalogId=64574&langId=-1&productId=67941#prod-details
  categoryDisplayJS.moreInfoUrl = 'ProductDisplay?storeId=' + storeId + '&catalogId=' + catalogId + '&langId=' + langId + '&productId=' + catEntryID;

  partnumber = serviceResponse.catalogEntry.catalogEntryIdentifier.externalIdentifier.partNumber;
  sizeForColorsArray = serviceResponse.sizeForColorArray;
  colorForSizesArray = serviceResponse.colorForSizeArray;
  colorsArray = serviceResponse.colorsArray;
  sizesArray = serviceResponse.sizesArray;

  $('#QuickInfoButton_product_' + partnumber).removeClass('qvC');

  document.getElementById('swatchesContainer').innerHTML = buildColorSwatches();

  document.getElementById('sizeDropdownContainer').innerHTML = buildSizeDropdown();

  //document.getElementById('productPrice').innerHTML = serviceResponse.catalogEntry.offerPrice;
  /* Price data
  "price": {
      "hasListPrice":"<c:out value="${hasListPrice}"/>",
      "hasOfferPrice":"<c:out value="${hasOfferPrice}"/>",
      "hasListPriceStrike":"<c:out value="${hasListPriceStrike}"/>",
      "hasSalePrice":"<c:out value="${hasSalePrice}"/>",
      "listPrice":"<fmt:formatNumber value="${listPrice}" type="currency" minFractionDigits="2" maxFractionDigits="2" />",
      "offerPrice":"<fmt:formatNumber value="${offerPrice}" type="currency" minFractionDigits="2" maxFractionDigits="2" />",
      "salePrice":"<fmt:formatNumber value="${salePrice}" type="currency" minFractionDigits="2" maxFractionDigits="2" />"
  }
  */
  document.getElementById('productPriceDiv').style.display = 'block';
  if(serviceResponse.catalogEntry.price.hasListPrice != null && serviceResponse.catalogEntry.price.hasListPrice == "true"){
    document.getElementById('listPriceDiv').style.display = 'block';
    document.getElementById('listPriceValue').innerHTML = serviceResponse.catalogEntry.price.listPrice;
  }else{
    document.getElementById('listPriceDiv').style.display = 'none';
    document.getElementById('listPriceValue').innerHTML = '';
  }
  if(serviceResponse.catalogEntry.price.hasOfferPrice != null && serviceResponse.catalogEntry.price.hasOfferPrice  == "true"){
    document.getElementById('offerPriceDiv').style.display = 'block';
    document.getElementById('offerPriceValue').innerHTML = serviceResponse.catalogEntry.price.offerPrice;
    document.getElementById('productPrice').innerHTML = serviceResponse.catalogEntry.price.offerPrice;
  }
  if(serviceResponse.catalogEntry.price.hasListPriceStrike != null && serviceResponse.catalogEntry.price.hasListPriceStrike  == "true"){
    document.getElementById('listPriceStrikeDiv').style.display = 'block';
    document.getElementById('listPriceStikeValue').innerHTML = serviceResponse.catalogEntry.price.offerPrice;
  }
  if(serviceResponse.catalogEntry.price.hasSalePrice != null && serviceResponse.catalogEntry.price.hasSalePrice == "true"){
    document.getElementById('salePriceDiv').style.display = 'block';
    document.getElementById('salePriceValue').innerHTML = serviceResponse.catalogEntry.price.salePrice;
    document.getElementById('productPrice').innerHTML = serviceResponse.catalogEntry.price.salePrice;
  }

  document.getElementById('productActions').style.display = 'block';

  if(serviceResponse.catalogEntry.promoMessage1 != null && serviceResponse.catalogEntry.promoMessage1 != ""){
    document.getElementById('productPromotions').innerHTML = serviceResponse.catalogEntry.promoMessage1;
    document.getElementById('productPromotions').style.display = 'block';
  }

  if(serviceResponse.catalogEntry.callout != null && serviceResponse.catalogEntry.callout != ""){
      document.getElementById('productCallout').innerHTML = serviceResponse.catalogEntry.callout;
      document.getElementById('productCallout').style.display = 'block';
    }

  if(document.getElementById('sizingDetailAnchor')){
    if(canonicalUrl != "") {
      document.getElementById('sizingDetailAnchor').href = canonicalUrl + "#sizing";
    }
    else {
      document.getElementById('sizingDetailAnchor').href = baseRelativeURL + categoryDisplayJS.moreInfoUrl + "#sizing";
    }
  }

  if(canonicalUrl != "") {
    document.getElementById('productPageLink').href = canonicalUrl;
  }
  else {
    document.getElementById('productPageLink').href = baseRelativeURL + categoryDisplayJS.moreInfoUrl;
  }


  categoryDisplayJS.setCurrentCatalogEntryId(catEntryID);

  if (document.getElementById('productSpecification')) {
    document.getElementById('productSpecification').style.display = 'none';
  }

  var field1Value = ioArgs.args.content.field1;
  var field2Value = ioArgs.args.content.field2;

  var cm_vc = getQuerystring("cm_vc");
  if (cm_vc != null && cm_vc != '') {
    field2Value = cm_vc;
  }
  field2Value = field2Value+"||2||" + document.getElementById('tealiumBreadcrumbs').value

  // Setup addToCart button
  var addtoCart;
  if (document.getElementById('addToCartLinkAjax')) {
    if (isProductBean) {
        addtoCart = document.getElementById('addToCartLinkAjax');
        addtoCart.href = "JavaScript:if(validateSizeColor()){categoryDisplayJS.Add2ShopCartAjax('entitledItem_" + catEntryID + "',document.getElementById('qvProductPopUpQty').value,true,{'field1':'"+field1Value+"'},{'field2':'"+field2Value+"'});}";
    } else {
      addtoCart = document.getElementById('addToCartLinkAjax');
      addtoCart.href = "JavaScript:if(validateSizeColor()){categoryDisplayJS.AddItem2ShopCartAjax('" + catEntryID + "',document.getElementById('qvProductPopUpQty').value,{'field1':'"+field1Value+"'}),{'field2':'"+field2Value+"'}); hidePopup('second_level_category_popup');}";
    }
  }

  displayS7Image(partnumber, ioArgs.args.content.scene7FeatureColor);
  clearandShowTabs();

  showPopup('second_level_category_popup');

  cursor_clear(); // reset requestSubmitted to allow 1st time add2Cart work
  gobackFocus();// set the default focus to the Close button

  dojo.publish("ajaxRequestCompleted");
}

/**
 * This function is used to dynamically update the more info link url based on
 * the selection of attributes in the Quickinfo popup.
 */

function updateMoreInfoUrl() {
    if(canonicalUrl != "") {
      document.getElementById('productPageLink').href = canonicalUrl;
    }
    else {
      document.getElementById('productPageLink').href = baseRelativeURL + categoryDisplayJS.moreInfoUrl;
    }
}

function clearQVMessage(){
    document.getElementById('SuccessMessageText').innerHTML = "";
    document.getElementById('ErrorMessageText').innerHTML = "";
}
/**
 * Reset all contents of the Product Quick View pop-up. This dialog will be
 * re-used across all products on the page.
 */
function resetQuickViewPopUp() {
  if(!document.getElementById('second_level_category_popup_main_div')){
    return;
  }

  document.getElementById('SuccessMessageText').innerHTML = "";
  document.getElementById('ErrorMessageText').innerHTML = "";
  document.getElementById('productName').innerHTML = "";
  document.getElementById('productPrice').innerHTML = "";
  document.getElementById('productLongDescription').innerHTML = "";
  document.getElementById('productSKUValue').innerHTML = "";
  document.getElementById('productCategoryId').innerHTML = "";
  document.getElementById('productPromotions').innerHTML = "";
  document.getElementById('productCallout').innerHTML = "";
  document.getElementById('featureColorSelected').innerHTML = "";
  document.getElementById('productColor').innerHTML = "";
  document.getElementById('productColorPriceDiv').style.display = 'none';
  document.getElementById('swatchesContainer').innerHTML = "";
  document.getElementById('sizeDropdownContainer').innerHTML = "";
  if(canonicalUrl != "") {
    document.getElementById('productPageLink').href = canonicalUrl;
    document.getElementById('sizingDetailAnchor').href = canonicalUrl;
  }
  else {
    document.getElementById('productPageLink').href = baseRelativeURL;
    document.getElementById('sizingDetailAnchor').href = baseRelativeURL;
  }

  // HANESPRO-2728 -- reset prices
  document.getElementById('productPriceDiv').style.display = 'none';
  document.getElementById('listPriceDiv').style.display = 'none';
  document.getElementById('listPriceValue').innerHTML = '';
  document.getElementById('offerPriceDiv').style.display = 'none';
  document.getElementById('offerPriceValue').innerHTML = '';
  document.getElementById('listPriceStrikeDiv').style.display = 'none';
  document.getElementById('listPriceStikeValue').innerHTML = '';
  document.getElementById('salePriceDiv').style.display = 'none';
  document.getElementById('salePriceValue').innerHTML = '';

  colorForSizesArray = null;
  sizeForColorsArray = null;
  colorsArray = null;
  sizesArray = null;
  partnumber = null;
  featureColor = null;

  if (typeof (isBrazilStore) != 'undefined' && isBrazilStore) {
    dojo.byId('free_shipping_promotion_div').innerHTML = "";
    dojo.byId('BrazilCatalogEntryFeaturedInstallmentOption').innerHTML = "";
    dojo.style(dojo.byId('BrazilCatalogEntryFeaturedInstallmentOption'), "display", "inline");
    dojo.byId('BrazilFeaturedNonPaymentPromotion').innerHTML = "";
    if (!dojo.isIE) {// Safari & FF are needed to reset product quantity
      // node back to the normal
      dojo.style(dojo.byId('productQuantity'), "marginTop", "0px");
    }
  }

  document.getElementById("s7ContainerDiv").innerHTML ='<div id="s7Container"><img alt="" border="0" class="product_image" id="productFullImage" /></div>';

  if (document.getElementById('qvProductPopUpQty')) {
    document.getElementById('qvProductPopUpQty').disabled = false;
    document.getElementById('qvProductPopUpQty').value = "1";
  }

  if (document.getElementById('addToCartLinkAjax')) {
    document.getElementById('addToCartLinkAjax').href = "";
  } else if (document.getElementById('addToCartLink')) {
    document.getElementById('addToCartLink').href = "";
  }

  if (document.getElementById('addToWishListLinkAjax')) {
    document.getElementById('addToWishListLinkAjax').href = "";
  } else if (document.getElementById('addToWishListLink')) {
    document.getElementById('addToWishListLink').href = "";
  }

  if (document.getElementById('addToCompareLink')) {
    document.getElementById('addToCompareLink').href = "";
  }
  if (document.getElementById('replaceCartItemAjax')) {
    document.getElementById('replaceCartItemAjax').href = "";
  } else if (document.getElementById('replaceCartItemNonAjax')) {
    document.getElementById('replaceCartItemNonAjax').href = "";
  }

  clearandShowTabs();
  categoryDisplayJS.selectedAttributes = new Object();
  categoryDisplayJS.selectedProducts = new Object();
}

/**
 * Hides the Product Quick View pop-up.
 *
 * @param {string}
 *            id The id of the Product Quick View pop-up to hide.
 * @param {object}
 *            event The event triggered from user actions.
 */
function hidePopup(id, event) {
  if (event != null && event.type == "keypress" && event.keyCode != "27") {
    return;
  } else {
    var quickInfo = dijit.byId(id);
    if (quickInfo != null) {
      quickInfo.hide();
    }
  }
}

function showPopup(id, event) {
  if (event != null && event.type == "keypress" && event.keyCode != "27") {
      return;
  } else {
      var quickInfo = dijit.byId(id);
      if (quickInfo != null) {
        quickInfo.show();
      }
  }
}

/**
 * Defines the list of actions that show up in the Product Quick View pop-up.
 * Each property corresponds to an action. Default settings show the first 3
 * links.
 */
function popupActionProperties() {
  this.showAddToCart = true;
  this.showWishList = true;
  this.showProductCompare = true;
  this.showReplaceCartItem = false;
}

/**
 * Transfers the focus to the "Close" button, when pressing the <Tab> key on the
 * last focusable element in the Product Quick View pop-up.
 */
function gobackFocus() {
  document.getElementById('closeLink').focus();
}

/**
 * Transfers the focus to the last focusable element present in the Product
 * Quick View pop-up, when pressing the <Shift+Tab> keys on the "Close" button.
 */
function setbackFocus(event) {
  if (event.shiftKey && event.keyCode == dojo.keys.TAB) {
    if (document.getElementById('replaceCartItemNonAjax') && document.getElementById('replaceCartItemNonAjax').style.display != "none") {
      document.getElementById('replaceCartItemNonAjax').focus();
    } else if (document.getElementById('replaceCartItemAjax') && document.getElementById('replaceCartItemAjax').style.display != "none") {
      document.getElementById('replaceCartItemAjax').focus();
    } else if (document.getElementById('addToCompareLink') && document.getElementById('addToCompareLink').style.display != "none") {
      document.getElementById('addToCompareLink').focus();
    } else if (document.getElementById('addToWishListLink') && document.getElementById('addToWishListLink').style.display != "none") {
      document.getElementById('addToWishListLink').focus();
    } else if (document.getElementById('addToWishListLinkAjax') && document.getElementById('addToWishListLinkAjax').style.display != "none") {
      document.getElementById('addToWishListLinkAjax').focus();
    } else {
      document.getElementById('productMoreInfoLink').focus();
    }

    dojo.stopEvent(event);
  }
}

/**
 * Triggers a call to the hidePopup() function after a delay of a
 * certain amount of time.
 */
function delayhidePopup() {
  setTimeout(dojo.hitch(this, "hidePopup", 'second_level_category_popup'), 200);
}

function resetQuickviewShoppingBag() {
    document.getElementById('shopCartProductStyle').innerHTML = "";
    document.getElementById('shopCartProductImage').src = "";
    document.getElementById('shopCartProductImage').alt = "";

    document.getElementById('shopCartProductName').innerHTML = "";
    document.getElementById('shopCartProductSize').innerHTML = "";
    document.getElementById('shopCartProductColor').innerHTML = "";
    document.getElementById('shopCartProductQuantity').innerHTML = "";
    document.getElementById('shopCartProductPrice').innerHTML = "";
    document.getElementById('bagTotalQuantity').innerHTML = "";
    document.getElementById('bagTotalPrice').innerHTML = "";
  }

/**
 * Populates all the contents of the Product Quick View pop-up with the JSON
 * returned from the server.
 *
 * @param {object}
 *            serviceRepsonse The JSON response from the service.
 * @param {object}
 *            ioArgs The arguments from the service call.
 */
function populateQuickviewShoppingBag(serviceResponse, ioArgs) {
  var isSecure = ("https"==jQuery.url.attr("protocol"))?true:false;
  // save the serviceResponse
  responseJSON = serviceResponse;

  // populate the entitledItemJsonObject
  // categoryDisplayJS.setEntitledItemJsonObject(serviceResponse.productAttributes);
  // console.debug(serviceResponse);

  document.getElementById('shopCartProductStyle').innerHTML = serviceResponse.CurrentOrderItem.Style;
  document.getElementById('shopCartProductImage').src = isSecure? serviceResponse.CurrentOrderItem.ItemImageUrlSecure : serviceResponse.CurrentOrderItem.ItemImageUrl;
  document.getElementById('shopCartProductImage').alt = serviceResponse.CurrentOrderItem.ItemName;
  document.getElementById('shopCartProductName').innerHTML = serviceResponse.CurrentOrderItem.ItemName;
  document.getElementById('shopCartProductSize').innerHTML = serviceResponse.CurrentOrderItem.SizeAdded;
  document.getElementById('shopCartProductColor').innerHTML = serviceResponse.CurrentOrderItem.ColorAdded;
  document.getElementById('shopCartProductPrice').innerHTML = serviceResponse.CurrentOrderItem.Price;

  if(categoryDisplayJS.catEntryQuantityJustAdded !=null && categoryDisplayJS.catEntryQuantityJustAdded.catEntryId != null &&  categoryDisplayJS.catEntryQuantityJustAdded.quantity !=null){
    document.getElementById('shopCartProductQuantity').innerHTML = categoryDisplayJS.catEntryQuantityJustAdded.quantity;
  }

  document.getElementById('bagTotalQuantity').innerHTML = serviceResponse.BagTotalQuantity;
  document.getElementById('bagTotalPrice').innerHTML = serviceResponse.BagTotalPrice;

  var categoryIdValue = serviceResponse.CurrentOrderItem.CategoryId;
  var cm_vc = getQuerystring("cm_vc");
  if (cm_vc != null && cm_vc != '') {
    categoryIdValue = cm_vc;
  }

  var attributeString = CommonContextsJS.storeId+"-_-"+ serviceResponse.CurrentOrderItem.CmItemStatus+"-_-"+serviceResponse.CurrentOrderItem.ColorAdded+"-_-"+serviceResponse.CurrentOrderItem.SizeAdded;
  var dialog = dijit.byId("second_level_category_popup");
  if( dialog.open ) {
    attributeString = attributeString + "-_--_-QuickView";
  }

  showPopup('quickview_shopcart_popup');
  cursor_clear();

  gobackFocus();// set the default focus to the Close button
  dojo.publish("ajaxRequestCompleted");
}

function updateMiniCartCookie(cookieStr){
  // example: miniCartCookie={value=items~~~7@amount~~~370.14@, domain=null, path=/, secure=false, version=0, maxAge=2592000, name=13201_CVMINICART, comment=null}
  var cookieNameValueMap={};
  cookieStr = cookieStr.substring(1,cookieStr.length-1);
  var cookieNameValue = cookieStr.split(",");
  for(var i in cookieNameValue){
    var cookieField = $.trim(cookieNameValue[i]);
    var nameValue = cookieField.split("=");
    cookieNameValueMap[nameValue[0]] = nameValue[1];
    //console.debug("name:" + nameValue[0] + " value="+ nameValue[1]);
  }
  if("name" in cookieNameValueMap && "value" in cookieNameValueMap){
    var options={};
    var isExpired = false;

    if("max-age" in cookieNameValueMap && cookieNameValueMap["max-age"] != "" && cookieNameValueMap["max-age"] != 'null'){
      var expireTime = parseInt(cookieNameValueMap["max-age"]);
      //expireTime =0;
      if(expireTime== 0){
          isExpired = true;
      } else if(expireTime == -1) {
          // HANESPRO-4401
          // options.expires = -1;
      } else{
          expireDay = expireTime / (60*60*24); // convert seconds to day
          options.expires = expireDay;
      }
    }

    if("path" in cookieNameValueMap && cookieNameValueMap["path"] != "" && cookieNameValueMap["path"] != 'null'){
      options.path = cookieNameValueMap["path"];
    }

    if("domain" in cookieNameValueMap && cookieNameValueMap["domain"] != "" && cookieNameValueMap["domain"] != 'null'){
      options.domain = cookieNameValueMap["domain"];
    }

    //console.debug("name: "+cookieNameValueMap["name"] + "  value:" + cookieNameValueMap["value"] + "; "+ options);

    if(isExpired){
      jQuery.removeCookie(cookieNameValueMap["name"], options);
    }else{
      jQuery.cookie(cookieNameValueMap["name"], cookieNameValueMap["value"], options);
    }

    return cookieNameValueMap["name"];
    //console.debug("get Cookie value:" +jQuery.cookie(cookieNameValueMap["name"]));
  }

}

/**
 * Displays the Product QuickviewShoppingBag pop-up containing product information.
 * Retrieves product information in JSON format via an Ajax call.
 *
 * @param {serviceResp}
 *
 */
function showQuickViewShoppingBag(serviceResp) {
    //console.debug(serviceResp);
    //console.debug(categoryDisplayJS);
    resetQuickviewShoppingBag();

    var parameters = {};
    parameters.storeId = CommonContextsJS.storeId;
    parameters.langId = CommonContextsJS.langId;
    parameters.catalogId = CommonContextsJS.catalogId;
    parameters.orderId = serviceResp.orderId;
    parameters.orderItemId = serviceResp.orderItemId;

    categoryDisplayJS.setCommonParameters('-1',CommonContextsJS.storeId,CommonContextsJS.catalogId,'');

    // need to update cookie & call updateMiniCartItemCount() inside MiniShopCartDisplay.jsp
    if(serviceResp.miniCartCookie != null && serviceResp.miniCartCookie!=''){
        var cookieName = updateMiniCartCookie(serviceResp.miniCartCookie);
        if(cookieName != null && cookieName != ""){
          updateMiniCartItemCount(getUserCookieValue(cookieName,"items"));
        }
    }

    // The following sequence is required to get the spin cursor showed up
    hidePopup('quickview_shopcart_popup');
    dijit.byId('quickview_shopcart_popup').closeButtonNode.style.display = 'none';

    dojo.publish("ajaxRequestInitiated");
    dojo.xhrPost( {
      url : getAbsoluteURL() + "GetShopCartDetailsById",
      handleAs : "json-comment-filtered",
      content : parameters,
      service : this,
      load : populateQuickviewShoppingBag,
      error : function(errObj, ioArgs) {
        console.debug("Quickview.showQuickViewShoppingBag: Unexpected error occurred during an xhrPost request.");
        dojo.publish("ajaxRequestCompleted");
      }
    });
}

function swapQVSwatch(element, color) {
  jQuery('#swatchesContainer').children('img').each(function () {
    jQuery(this).removeClass();
  });
  jQuery(element).addClass("qvSelectedSwatch");
  selectedColor = color;
}
