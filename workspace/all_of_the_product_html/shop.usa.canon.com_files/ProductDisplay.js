productDisplayJS={langId:"-1",storeId:"",catalogId:"",userType:"",baseItemAddedToCart:false,entitledItems:[],entitledItemJsonObject:null,selectedAttributesList:new Object(),moreInfoUrl:"",isPopup:false,displayPriceRange:true,itemPriceJsonOject:[],allSwatchesArrayList:new Object(),skuImageId:"",cookieKeyPrefix:"CompareItems_",cookieDelimiter:";",maxNumberProductsAllowedToCompare:4,minNumberProductsAllowedToCompare:2,baseCatalogEntryId:0,selectedProducts:new Object(),productList:new Object(),currencySymbol:"",compareReturnName:"",searchTerm:"",search01:"'",search02:'"',replaceStr01:/\\\'/g,replaceStr02:/\\\"/g,ampersandChar:/&/g,ampersandEntityName:"&amp;",widgets:{CusaProductAccessoriesDialogWidget:null,CusaCarePakDialogWidget:null},aToCCatentry:[],aToCQuantity:[],aToCType:[],aToCName:[],mainProductIdForCarepak:"",setMainProductIdForCarepak:function(catEntry){this.mainProductIdForCarepak=catEntry;},getMainProductIdForCarepak:function(){return this.mainProductIdForCarepak;},setCommonParameters:function(langId,storeId,catalogId,userType,currencySymbol){productDisplayJS.langId=langId;productDisplayJS.storeId=storeId;productDisplayJS.catalogId=catalogId;productDisplayJS.userType=userType;productDisplayJS.currencySymbol=currencySymbol;},setEntitledItems:function(entitledItemArray){productDisplayJS.entitledItems=entitledItemArray;},getCatalogEntryId:function(entitledItemId){var attributeArray=[];var selectedAttributes=productDisplayJS.selectedAttributesList[entitledItemId];for(attribute in selectedAttributes){attributeArray.push(attribute+"_"+selectedAttributes[attribute]);}return productDisplayJS.resolveSKU(attributeArray);},getCatalogEntryIdforProduct:function(selectedAttributes){var attributeArray=[];for(attribute in selectedAttributes){attributeArray.push(attribute+"_"+selectedAttributes[attribute]);}return productDisplayJS.resolveSKU(attributeArray);},getEntitledItemJsonObject:function(){return productDisplayJS.entitledItemJsonObject;},resolveSKU:function(attributeArray){console.debug("Resolving SKU >> "+attributeArray+">>"+this.entitledItems);var catentry_id="";var attributeArrayCount=attributeArray.length;if(this.entitledItems.length==1){return this.entitledItems[0].catentry_id;}for(x in this.entitledItems){var catentry_id=this.entitledItems[x].catentry_id;var Attributes=this.entitledItems[x].Attributes;var attributeCount=0;for(index in Attributes){attributeCount++;}if(attributeArrayCount==0&&attributeCount==0){return catentry_id;}if(attributeCount!=0&&attributeArrayCount>=attributeCount){var matchedAttributeCount=0;for(attributeName in attributeArray){var attributeValue=attributeArray[attributeName];if(attributeValue in Attributes){matchedAttributeCount++;}}if(attributeCount==matchedAttributeCount){console.debug("CatEntryId:"+catentry_id+" for Attribute: "+attributeArray);return catentry_id;}}}return null;},setSelectedAttribute:function(selectedAttributeName,selectedAttributeValue,entitledItemId,skuImageId,imageField){var selectedAttributes=productDisplayJS.selectedAttributesList[entitledItemId];if(selectedAttributes==null){selectedAttributes=new Object();}selectedAttributeValue=selectedAttributeValue.replace(productDisplayJS.replaceStr01,productDisplayJS.search01);selectedAttributeValue=selectedAttributeValue.replace(productDisplayJS.replaceStr02,productDisplayJS.search02);selectedAttributeValue=selectedAttributeValue.replace(productDisplayJS.ampersandChar,productDisplayJS.ampersandEntityName);selectedAttributes[selectedAttributeName]=selectedAttributeValue;productDisplayJS.moreInfoUrl=productDisplayJS.moreInfoUrl+"&"+selectedAttributeName+"="+selectedAttributeValue;productDisplayJS.selectedAttributesList[entitledItemId]=selectedAttributes;if(skuImageId!=undefined){productDisplayJS.setSKUImageId(skuImageId);}var entitledItemJSON;if(dojo.byId(entitledItemId)!=null&&!productDisplayJS.isPopup){entitledItemJSON=eval("("+dojo.byId(entitledItemId).innerHTML+")");}else{entitledItemJSON=productDisplayJS.getEntitledItemJsonObject();}productDisplayJS.setEntitledItems(entitledItemJSON);},Add2ShopCartAjax:function(entitledItemId,quantity,isPopup,customParams){var entitledItemJSON;if(dojo.byId(entitledItemId)!=null){entitledItemJSON=eval("("+dojo.byId(entitledItemId).innerHTML+")");}else{entitledItemJSON=this.getEntitledItemJsonObject();}productDisplayJS.setEntitledItems(entitledItemJSON);var catalogEntryId=productDisplayJS.getCatalogEntryId(entitledItemId);if(catalogEntryId!=null){var productId=entitledItemId.substring(entitledItemId.indexOf("_")+1);productDisplayJS.AddItem2ShopCartAjax(catalogEntryId,quantity,customParams,productId);productDisplayJS.baseItemAddedToCart=true;if(dijit.byId("second_level_category_popup")!=null){hidePopup("second_level_category_popup");}}else{if(isPopup==true){dojo.byId("second_level_category_popup").style.zIndex="1";MessageHelper.formErrorHandleClient("addToCartLinkAjax",storeNLS["ERR_RESOLVING_SKU"]);}else{MessageHelper.displayErrorMessage(storeNLS["ERR_RESOLVING_SKU"]);productDisplayJS.baseItemAddedToCart=false;}}},AddItem2ShopCartAjax:function(catEntryIdentifier,quantity,customParams,productId){var params=[];params.storeId=this.storeId;params.catalogId=this.catalogId;params.langId=this.langId;params.orderId=".";params.calculationUsage="-1,-2,-5,-6,-7";params.inventoryValidation="true";var ajaxShopCartService="AddOrderItem";shoppingActionsJS.productAddedList=new Object();if(dojo.isArray(catEntryIdentifier)&&dojo.isArray(quantity)){for(var i=0;i<catEntryIdentifier.length;i++){if(!isPositiveInteger(quantity[i])){MessageHelper.displayErrorMessage(storeNLS["QUANTITY_INPUT_ERROR"]);return;}params["catEntryId_"+(i+1)]=catEntryIdentifier[i];params["quantity_"+(i+1)]=quantity[i];}}else{if(!isPositiveInteger(quantity)){MessageHelper.displayErrorMessage(storeNLS["QUANTITY_INPUT_ERROR"]);return;}params.catEntryId=catEntryIdentifier;params.quantity=quantity;var selectedAttrList=new Object();for(attr in productDisplayJS.selectedAttributesList["entitledItem_"+productId]){selectedAttrList[attr]=productDisplayJS.selectedAttributesList["entitledItem_"+productId][attr];}if(productId==undefined){shoppingActionsJS.saveAddedProductInfo(quantity,catEntryIdentifier,catEntryIdentifier,selectedAttrList);}else{shoppingActionsJS.saveAddedProductInfo(quantity,productId,catEntryIdentifier,selectedAttrList);}}if(customParams!=null&&customParams!="undefined"){for(i in customParams){params[i]=customParams[i];}if(customParams["catalogEntryType"]=="dynamicKit"){ajaxShopCartService="AddPreConfigurationToCart";}}var contractIdElements=document.getElementsByName("contractSelectForm_contractId");if(contractIdElements!=null&&contractIdElements!="undefined"){for(i=0;i<contractIdElements.length;i++){if(contractIdElements[i].checked){params.contractId=contractIdElements[i].value;break;}}}if(!submitRequest()){return;}cursor_wait();console.debug("productId ::"+productId);if(productId==undefined){console.debug("package called so no action - just add to cart.");}else{try{if(this.widgets.CusaProductAccessoriesDialogWidget){this.widgets.CusaProductAccessoriesDialogWidget.destroy();}shoppingActionsJS.setShoppingCartDisplayCheck("0");var scope=this;require(["dijit/Dialog","dojo/dom-style"],function(Dialog,domStyle){scope.widgets.CusaProductAccessoriesDialogWidget=new Dialog({id:"CusaProductAccessoriesDialogWidget",title:"CusaProductAccessoriesDialogWidget",href:"ProductAccessoriesMainDisplay?storeId="+WCParamJS.storeId+"&catalogId="+WCParamJS.catalogId+"&langId="+WCParamJS.langId+"&productId="+productId});});}catch(e){console.debug(e);}}wc.service.invoke(ajaxShopCartService,params);productDisplayJS.baseItemAddedToCart=true;if(document.getElementById("headerShopCartLink")&&document.getElementById("headerShopCartLink").style.display!="none"){document.getElementById("headerShopCart").focus();}else{if(document.getElementById("headerShopCart1")){document.getElementById("headerShopCart1").focus();}}},setSKUImageId:function(skuImageId){productDisplayJS.skuImageId=skuImageId;},getImageForSKU:function(entitledItemId,imageField){var attributeArray=[];var selectedAttributes=productDisplayJS.selectedAttributesList[entitledItemId];for(attribute in selectedAttributes){attributeArray.push(attribute+"_"+selectedAttributes[attribute]);}return productDisplayJS.resolveImageForSKU(attributeArray,imageField);},resolveImageForSKU:function(attributeArray,imageField){console.debug("Resolving SKU >> "+attributeArray+">>"+this.entitledItems);var imagePath="";var attributeArrayCount=attributeArray.length;for(x in this.entitledItems){if(null!=imageField){var imagePath=this.entitledItems[x][imageField];}else{var imagePath=this.entitledItems[x].ItemImage467;}var Attributes=this.entitledItems[x].Attributes;var attributeCount=0;for(index in Attributes){attributeCount++;}if(attributeArrayCount==0&&attributeCount==0){return imagePath;}if(attributeCount!=0&&attributeArrayCount>=attributeCount){var matchedAttributeCount=0;for(attributeName in attributeArray){var attributeValue=attributeArray[attributeName];if(attributeValue in Attributes){matchedAttributeCount++;}}if(attributeCount==matchedAttributeCount){console.debug("ItemImage:"+imagePath+" for Attribute: "+attributeArray);var imageArray=[];imageArray.push(imagePath);imageArray.push(this.entitledItems[x].ItemThumbnailImage);if(this.entitledItems[x].ItemAngleThumbnail!=null&&this.entitledItems[x].ItemAngleThumbnail!=undefined){imageArray.push(this.entitledItems[x].ItemAngleThumbnail);imageArray.push(this.entitledItems[x].ItemAngleFullImage);imageArray.push(this.entitledItems[x].ItemAngleThumbnailShortDesc);}return imageArray;}}}return null;},changeViewImages:function(itemAngleThumbnail,itemAngleFullImage,itemAngleThumbnailShortDesc){var imageCount=0;for(x in itemAngleThumbnail){var prodAngleCount=imageCount;imageCount++;var thumbnailWidgets=dojo.query("ul[id^='ProductAngleImagesAreaList']");if(thumbnailWidgets!=null){for(var i=0;i<thumbnailWidgets.length;i++){if(null!=thumbnailWidgets[i]){var angleThumbnail=document.createElement("li");var angleThumbnailLink=document.createElement("a");var angleThumbnailImg=document.createElement("img");angleThumbnail.id="productAngleLi"+prodAngleCount;angleThumbnailLink.href="JavaScript:changeThumbNail('productAngleLi"+prodAngleCount+"','"+itemAngleFullImage[x]+"');";angleThumbnailLink.id="WC_CachedProductOnlyDisplay_links_1_"+imageCount;if(itemAngleThumbnailShortDesc!="undefined"&&itemAngleThumbnailShortDesc!=null){angleThumbnailLink.title=itemAngleThumbnailShortDesc[x];}angleThumbnailImg.src=itemAngleThumbnail[x];angleThumbnailImg.id="WC_CachedProductOnlyDisplay_images_1_"+imageCount;if(itemAngleThumbnailShortDesc!="undefined"&&itemAngleThumbnailShortDesc!=null){angleThumbnailImg.alt=itemAngleThumbnailShortDesc[x];}if(prodAngleCount==0){dojo.empty(thumbnailWidgets[i]);}angleThumbnailLink.appendChild(angleThumbnailImg);angleThumbnail.appendChild(angleThumbnailLink);thumbnailWidgets[i].appendChild(angleThumbnail);}}}}var displayImageArea="";if(imageCount>0){displayImageArea="block";}else{displayImageArea="none";}var angleImageArea=dojo.query("div[id^='ProductAngleImagesArea']");if(angleImageArea!=null){for(var i=0;i<angleImageArea.length;i++){if(null!=angleImageArea[i]){angleImageArea[i].style.display=displayImageArea;}}}},updateSwatchListView:function(){var swatchArray=dojo.query("a[id^='swatch_array_']");for(var i=0;i<swatchArray.length;i++){var swatchArrayElement=swatchArray[i];eval(dojo.attr(swatchArrayElement,"href"));}var swatchSkuImage=dojo.query("a[id^='swatch_setSkuImage_']");for(var i=0;i<swatchSkuImage.length;i++){var swatchSkuImageElement=swatchSkuImage[i];eval(dojo.attr(swatchSkuImageElement,"href"));}var swatchDefault=dojo.query("a[id^='swatch_selectDefault_']");for(var i=0;i<swatchDefault.length;i++){var swatchDefaultElement=swatchDefault[i];eval(dojo.attr(swatchDefaultElement,"href"));}},selectSwatch:function(selectedAttributeName,selectedAttributeValue,entitledItemId,doNotDisable,skuImageId,imageField){if(dojo.hasClass("swatch_"+entitledItemId+"_"+selectedAttributeValue,"color_swatch_disabled")){return;}var selectedAttributes=this.selectedAttributesList[entitledItemId];for(attribute in selectedAttributes){if(attribute==selectedAttributeName){if(selectedAttributes[attribute]!=selectedAttributeValue){var swatchElement=dojo.byId("swatch_"+entitledItemId+"_"+selectedAttributes[attribute]);swatchElement.className="color_swatch";swatchElement.src=swatchElement.src.replace("_disabled.png","_enabled.png");dojo.byId("swatch_link_"+entitledItemId+"_"+selectedAttributes[attribute]).title=swatchElement.alt;}}if(document.getElementById("swatch_link_"+entitledItemId+"_"+selectedAttributes[attribute])!=null){document.getElementById("swatch_link_"+entitledItemId+"_"+selectedAttributes[attribute]).setAttribute("aria-checked","false");}}this.makeSwatchSelection(selectedAttributeName,selectedAttributeValue,entitledItemId,doNotDisable,skuImageId,imageField);},makeSwatchSelection:function(swatchAttrName,swatchAttrValue,entitledItemId,doNotDisable,skuImageId,imageField){productDisplayJS.setSelectedAttribute(swatchAttrName,swatchAttrValue,entitledItemId,skuImageId,imageField);document.getElementById("swatch_"+entitledItemId+"_"+swatchAttrValue).className="color_swatch_selected";document.getElementById("swatch_link_"+entitledItemId+"_"+swatchAttrValue).setAttribute("aria-checked","true");document.getElementById("swatch_selection_label_"+entitledItemId+"_"+swatchAttrName).className="header color_swatch_label";if(document.getElementById("swatch_selection_"+entitledItemId+"_"+swatchAttrName).style.display=="none"){document.getElementById("swatch_selection_"+entitledItemId+"_"+swatchAttrName).style.display="inline";}document.getElementById("swatch_selection_"+entitledItemId+"_"+swatchAttrName).innerHTML=swatchAttrValue;productDisplayJS.updateSwatchImages(swatchAttrName,entitledItemId,doNotDisable,imageField);},addToAllSwatchsArray:function(swatchName,swatchValue,swatchImg1,entitledItemId){var swatchList=this.allSwatchesArrayList[entitledItemId];if(swatchList==null){swatchList=new Array();}if(!this.existInAllSwatchsArray(swatchName,swatchValue,swatchList)){var swatchRecord=new Array();swatchRecord[0]=swatchName;swatchRecord[1]=swatchValue;swatchRecord[2]=swatchImg1;swatchRecord[4]=document.getElementById("swatch_link_"+entitledItemId+"_"+swatchValue).onclick;swatchList.push(swatchRecord);this.allSwatchesArrayList[entitledItemId]=swatchList;}},existInAllSwatchsArray:function(swatchName,swatchValue,swatchList){for(var i=0;i<swatchList.length;i++){var attrName=swatchList[i][0];var attrValue=swatchList[i][1];if(attrName==swatchName&&attrValue==swatchValue){return true;}}return false;},makeDefaultSwatchSelection:function(entitledItemId,doNotDisable){if(this.entitledItems.length==0){if(dojo.byId(entitledItemId)!=null){entitledItemJSON=eval("("+dojo.byId(entitledItemId).innerHTML+")");}productDisplayJS.setEntitledItems(entitledItemJSON);}for(x in this.entitledItems){var Attributes=this.entitledItems[x].Attributes;for(y in Attributes){var index=y.indexOf("_");var swatchName=y.substring(0,index);var swatchValue=y.substring(index+1);this.makeSwatchSelection(swatchName,swatchValue,entitledItemId,doNotDisable,imageField);}break;}},updateSwatchImages:function(selectedAttrName,entitledItemId,doNotDisable,imageField){var swatchToUpdate=new Array();var selectedAttributes=productDisplayJS.selectedAttributesList[entitledItemId];var selectedAttrValue=selectedAttributes[selectedAttrName];var swatchList=productDisplayJS.allSwatchesArrayList[entitledItemId];for(var i=0;i<swatchList.length;i++){var attrName=swatchList[i][0];var attrValue=swatchList[i][1];var attrImg1=swatchList[i][2];var attrImg2=swatchList[i][3];var attrOnclick=swatchList[i][4];if(attrName!=doNotDisable&&attrName!=selectedAttrName){var swatchRecord=new Array();swatchRecord[0]=attrName;swatchRecord[1]=attrValue;swatchRecord[2]=attrImg1;swatchRecord[4]=attrOnclick;swatchRecord[5]=false;swatchToUpdate.push(swatchRecord);}}for(x in productDisplayJS.entitledItems){var Attributes=productDisplayJS.entitledItems[x].Attributes;for(y in Attributes){var index=y.indexOf("_");var entitledSwatchName=y.substring(0,index);var entitledSwatchValue=y.substring(index+1);if(entitledSwatchName==selectedAttrName&&entitledSwatchValue==selectedAttrValue){for(z in Attributes){var index2=z.indexOf("_");var entitledSwatchName2=z.substring(0,index2);var entitledSwatchValue2=z.substring(index2+1);if(y!=z){for(i in swatchToUpdate){var swatchToUpdateName=swatchToUpdate[i][0];var swatchToUpdateValue=swatchToUpdate[i][1];if(entitledSwatchName2==swatchToUpdateName&&entitledSwatchValue2==swatchToUpdateValue){swatchToUpdate[i][5]=true;}}}}}}}var disabledAttributes=[];for(i in swatchToUpdate){var swatchToUpdateName=swatchToUpdate[i][0];var swatchToUpdateValue=swatchToUpdate[i][1];var swatchToUpdateImg1=swatchToUpdate[i][2];var swatchToUpdateImg2=swatchToUpdate[i][3];var swatchToUpdateOnclick=swatchToUpdate[i][4];var swatchToUpdateEnabled=swatchToUpdate[i][5];if(swatchToUpdateEnabled){if(document.getElementById("swatch_"+entitledItemId+"_"+swatchToUpdateValue).className!="color_swatch_selected"){var swatchElement=dojo.byId("swatch_"+entitledItemId+"_"+swatchToUpdateValue);swatchElement.className="color_swatch";swatchElement.src=swatchElement.src.replace("_disabled.png","_enabled.png");dojo.byId("swatch_link_"+entitledItemId+"_"+swatchToUpdateValue).title=swatchElement.alt;}document.getElementById("swatch_link_"+entitledItemId+"_"+swatchToUpdateValue).setAttribute("aria-disabled","false");document.getElementById("swatch_link_"+entitledItemId+"_"+swatchToUpdateValue).onclick=swatchToUpdateOnclick;}else{if(swatchToUpdateName!=doNotDisable){var swatchElement=dojo.byId("swatch_"+entitledItemId+"_"+swatchToUpdateValue);var swatchLinkElement=dojo.byId("swatch_link_"+entitledItemId+"_"+swatchToUpdateValue);swatchElement.className="color_swatch_disabled";swatchLinkElement.onclick=null;swatchElement.src=swatchElement.src.replace("_enabled.png","_disabled.png");var titleText=storeNLS["INV_ATTR_UNAVAILABLE"];swatchLinkElement.title=dojo.string.substitute(titleText,{0:swatchElement.alt});document.getElementById("swatch_link_"+entitledItemId+"_"+swatchToUpdateValue).setAttribute("aria-disabled","true");if(selectedAttributes[swatchToUpdateName]==swatchToUpdateValue){disabledAttributes.push(swatchToUpdate[i]);}}}}for(i in disabledAttributes){var disabledAttributeName=disabledAttributes[i][0];var disabledAttributeValue=disabledAttributes[i][1];for(i in swatchToUpdate){var swatchToUpdateName=swatchToUpdate[i][0];var swatchToUpdateValue=swatchToUpdate[i][1];var swatchToUpdateEnabled=swatchToUpdate[i][5];if(swatchToUpdateName==disabledAttributeName&&swatchToUpdateValue!=disabledAttributeValue&&swatchToUpdateEnabled){productDisplayJS.makeSwatchSelection(swatchToUpdateName,swatchToUpdateValue,entitledItemId,doNotDisable,imageField);break;}}}},displayPrice:function(catEntryId,productId){var catEntry=productDisplayJS.itemPriceJsonOject[catEntryId].catalogEntry;var tempString;var popup=productDisplayJS.isPopup;if(popup==true){document.getElementById("productPrice").innerHTML=catEntry.offerPrice;}if(popup==false){var innerHTML="";var listPrice=dojo.currency.parse(catEntry.listPrice,{symbol:this.currencySymbol});var offerPrice=dojo.currency.parse(catEntry.offerPrice,{symbol:this.currencySymbol});if(!catEntry.listPriced||listPrice<=offerPrice){innerHTML="<span id='offerPrice_"+catEntry.catalogEntryIdentifier.uniqueID+"' class='price'>"+catEntry.offerPrice+"</span>";}else{innerHTML="<span id='listPrice_"+catEntry.catalogEntryIdentifier.uniqueID+"' class='old_price'>"+catEntry.listPrice+"</span>"+"<span id='offerPrice_"+catEntry.catalogEntryIdentifier.uniqueID+"' class='price'>"+catEntry.offerPrice+"</span>";}document.getElementById("price_display_"+productId).innerHTML=innerHTML+"<input type='hidden' id='ProductInfoPrice_"+catEntry.catalogEntryIdentifier.uniqueID+"' value='"+catEntry.offerPrice.replace(/"/g,"&#034;").replace(/'/g,"&#039;")+"'/>";innerHTML="";if(productDisplayJS.displayPriceRange==true){for(var i in catEntry.priceRange){if(catEntry.priceRange[i].endingNumberOfUnits==catEntry.priceRange[i].startingNumberOfUnits){tempString=storeNLS["PQ_PRICE_X"];innerHTML=innerHTML+"<p>"+dojo.string.substitute(tempString,{0:catEntry.priceRange[i].startingNumberOfUnits});}else{if(catEntry.priceRange[i].endingNumberOfUnits!="null"){tempString=storeNLS["PQ_PRICE_X_TO_Y"];innerHTML=innerHTML+"<p>"+dojo.string.substitute(tempString,{0:catEntry.priceRange[i].startingNumberOfUnits,1:catEntry.priceRange[i].endingNumberOfUnits});}else{tempString=storeNLS["PQ_PRICE_X_OR_MORE"];innerHTML=innerHTML+"<p>"+dojo.string.substitute(tempString,{0:catEntry.priceRange[i].startingNumberOfUnits});}}innerHTML=innerHTML+" <span class='price'>"+catEntry.priceRange[i].localizedPrice+"</span></p>";}}var quantityDiscount=dojo.byId("productLevelPriceRange_"+productId);var itemQuantityDiscount=dojo.byId("itemLevelPriceRange_"+productId);if(null!=quantityDiscount&&null==itemQuantityDiscount){dojo.style(quantityDiscount,"display","");}else{if(""!=innerHTML&&null!=itemQuantityDiscount){innerHTML=storeNLS["PQ_PURCHASE"]+innerHTML;itemQuantityDiscount.innerHTML=innerHTML;dojo.style(itemQuantityDiscount,"display","");if(null!=quantityDiscount){dojo.style(quantityDiscount,"display","none");}}else{if(""==innerHTML){if(null!=itemQuantityDiscount){dojo.style(itemQuantityDiscount,"display","none");}if(null!=quantityDiscount){dojo.style(quantityDiscount,"display","");}}}}}},updateProductName:function(catEntryId,productId){var catEntry=productDisplayJS.itemPriceJsonOject[catEntryId].catalogEntry;if(productDisplayJS.isPopup==true){document.getElementById("productName").innerHTML=catEntry.description[0].name;}else{if(dojo.query(".top > div[id^='PageHeading_']")!=null){dojo.query(".top > div[id^='PageHeading_']").forEach(function(node){if(node.childNodes!=null&&node.childNodes.length==3){node.childNodes[1].innerHTML=catEntry.description[0].name;}});}var productInfoWidgets=dojo.query("input[id^='ProductInfoName_"+productId+"']");if(productInfoWidgets!=null){for(var i=0;i<productInfoWidgets.length;i++){if(productInfoWidgets[i]!=null){productInfoWidgets[i].value=catEntry.description[0].name;}}}}},updateProductPartNumber:function(catEntryId,productId){var catEntry=productDisplayJS.itemPriceJsonOject[catEntryId].catalogEntry;if(productDisplayJS.isPopup==true){document.getElementById("productSKUValue").innerHTML=catEntry.catalogEntryIdentifier.externalIdentifier.partNumber;}else{var partnumWidgets=dojo.query("span[id^='product_SKU_"+productId+"']");if(partnumWidgets!=null){for(var i=0;i<partnumWidgets.length;i++){if(partnumWidgets[i]){partnumWidgets[i].innerHTML=storeNLS["SKU"]+" "+catEntry.catalogEntryIdentifier.externalIdentifier.partNumber;}}}}},updateProductShortDescription:function(catEntryId,productId){var catEntry=productDisplayJS.itemPriceJsonOject[catEntryId].catalogEntry;var shortDescWidgets=dojo.query("p[id^='product_shortdescription_"+productId+"']");if(shortDescWidgets!=null){for(var i=0;i<shortDescWidgets.length;i++){if(shortDescWidgets[i]){shortDescWidgets[i].innerHTML=catEntry.description[0].shortDescription;}}}},updateProductLongDescription:function(catEntryId,productId){var catEntry=productDisplayJS.itemPriceJsonOject[catEntryId].catalogEntry;var longDescWidgets=dojo.query("p[id^='product_longdescription_"+productId+"']");if(longDescWidgets!=null){for(var i=0;i<longDescWidgets.length;i++){if(longDescWidgets[i]){longDescWidgets[i].innerHTML=catEntry.description[0].longDescription;}}}},updateProductDiscount:function(catEntryId,productId){var catEntry=productDisplayJS.itemPriceJsonOject[catEntryId].catalogEntry;var newHtml="";if(typeof catEntry.discounts!="undefined"){for(var i=0;i<catEntry.discounts.length;i++){if(i>0){newHtml+='<div class="clear_float"></div><div class="item_spacer_2px"></div>';}newHtml+='<a class="promotion" href="'+catEntry.discounts[i].url+'">'+catEntry.discounts[i].description+"</a>";}}var discountWidgets=dojo.query("div[id^='Discounts_']");if(discountWidgets!=null){for(var i=0;i<discountWidgets.length;i++){if(discountWidgets[i]){discountWidgets[i].innerHTML=newHtml;}}}},updateProductImage:function(catEntryId,productId){var newFullImage=null;var newAngleThumbnail=null;var newAngleFullImage=null;var newAngleThumbnailShortDesc=null;var entitledItemId="entitledItem_"+productId;var imageArr=productDisplayJS.getImageForSKU(entitledItemId);if(imageArr!=null){newAngleThumbnail=imageArr[2];newAngleFullImage=imageArr[3];newAngleThumbnailShortDesc=imageArr[4];}if(catEntryId!=null){newFullImage=imageArr[0];}else{var imageFound=false;var selectedAttributes=productDisplayJS.selectedAttributesList[entitledItemId];for(x in productDisplayJS.entitledItems){var Attributes=productDisplayJS.entitledItems[x].Attributes;for(y in Attributes){var index=y.indexOf("_");var entitledSwatchName=y.substring(0,index);var entitledSwatchValue=y.substring(index+1);for(attribute in selectedAttributes){if(entitledSwatchName==attribute&&entitledSwatchValue==selectedAttributes[attribute]){newFullImage=productDisplayJS.entitledItems[x].ItemImage467;newAngleThumbnail=productDisplayJS.entitledItems[x].ItemAngleThumbnail;newAngleFullImage=productDisplayJS.entitledItems[x].ItemAngleFullImage;newAngleThumbnailShortDesc=productDisplayJS.entitledItems[x].ItemAngleThumbnailShortDesc;imageFound=true;break;}}if(imageFound){break;}}if(imageFound){break;}}}var imgWidgets=dojo.query("img[id^='"+productDisplayJS.skuImageId+"']");for(var i=0;i<imgWidgets.length;i++){if(imgWidgets[i]!=null&&newFullImage!=null){imgWidgets[i].src=newFullImage;}}var productImgWidgets=dojo.query("input[id^='ProductInfoImage_"+productId+"']");for(var i=0;i<productImgWidgets.length;i++){if(productImgWidgets[i]!=null&&newFullImage!=null){productImgWidgets[i].value=newFullImage;}}if(newAngleThumbnail!=null&&newAngleFullImage!=null){productDisplayJS.changeViewImages(newAngleThumbnail,newAngleFullImage,newAngleThumbnailShortDesc);}else{var angleImageArea=dojo.query("div[id^='ProductAngleImagesArea']");if(angleImageArea!=null){for(var i=0;i<angleImageArea.length;i++){if(null!=angleImageArea[i]){angleImageArea[i].style.display="none";}}}}},notifyAttributeChange:function(productId,entitledItemId,isPopup,displayPriceRange){productDisplayJS.baseCatalogEntryId=productId;var selectedAttributes=productDisplayJS.selectedAttributesList[entitledItemId];productDisplayJS.displayPriceRange=displayPriceRange;productDisplayJS.isPopup=isPopup;var catalogEntryId=null;if(productDisplayJS.selectedProducts[productId]){catalogEntryId=productDisplayJS.getCatalogEntryIdforProduct(productDisplayJS.selectedProducts[productId]);}else{catalogEntryId=productDisplayJS.getCatalogEntryId(entitledItemId);}if(catalogEntryId!=null){dojo.topic.publish("DefiningAttributes_Resolved_"+productId,catalogEntryId,productId);var catEntry=productDisplayJS.itemPriceJsonOject[catalogEntryId];if(catEntry!=null&&catEntry!=undefined){productDisplayJS.publishAttributeResolvedEvent(catalogEntryId,productId);}else{var parameters={};parameters.storeId=productDisplayJS.storeId;parameters.langId=productDisplayJS.langId;parameters.catalogId=productDisplayJS.catalogId;parameters.catalogEntryId=catalogEntryId;parameters.productId=productId;dojo.xhrPost({url:getAbsoluteURL()+"GetCatalogEntryDetailsByIDView",handleAs:"json-comment-filtered",content:parameters,service:productDisplayJS,load:productDisplayJS.publishAttributeResolvedEventServiceResponse,error:function(errObj,ioArgs){console.debug("productDisplayJS.notifyAttributeChange: Unexpected error occurred during an xhrPost request.");}});}}else{dojo.topic.publish("DefiningAttributes_Changed",catalogEntryId,productId);dojo.topic.publish("DefiningAttributes_Changed_"+productId,catalogEntryId,productId);console.debug("Publishing event 'DefiningAttributes_Changed' with params: catEntryId="+catalogEntryId+", productId="+productId);}},publishAttributeResolvedEventServiceResponse:function(serviceResponse,ioArgs){var productId=ioArgs["args"].content["productId"];productDisplayJS.itemPriceJsonOject[serviceResponse.catalogEntry.catalogEntryIdentifier.uniqueID]=serviceResponse;productDisplayJS.publishAttributeResolvedEvent(serviceResponse.catalogEntry.catalogEntryIdentifier.uniqueID,productId);},publishAttributeResolvedEvent:function(catEntryId,productId){if(!productDisplayJS.isPopup){dojo.topic.publish("DefiningAttributes_Resolved",catEntryId,productId);console.debug("Publishing event 'DefiningAttributes_Resolved' with params: catEntryId="+catEntryId+", productId="+productId);}},notifyQuantityChange:function(quantity){dojo.topic.publish("ShopperActions_Changed",quantity);console.debug("Publishing event 'ShopperActions_Changed' with params: quantity="+quantity);},showAttachmentPage:function(data){var pageNumber=data["pageNumber"];var pageSize=data["pageSize"];pageNumber=dojo.number.parse(pageNumber);pageSize=dojo.number.parse(pageSize);setCurrentId(data["linkId"]);if(!submitRequest()){return;}console.debug(wc.render.getRefreshControllerById("AttachmentPagination_Controller").renderContext.properties);var beginIndex=pageSize*(pageNumber-1);cursor_wait();wc.render.updateContext("AttachmentPagination_Context",{"beginIndex":beginIndex});MessageHelper.hideAndClearMessage();},InitializeArraysForATCAccessoryLayer:function(){this.aToCCatentry=[];this.aToCQuantity=[];this.aToCType=[];this.aToCName=[];},CheckCarepakOrRegularAjaxAccessory:function(){shoppingActionsJS.widgets.CusaProductAccessoriesDialogWidget.hide();var name="";var multiCatEntry=this.aToCCatentry;var multiQty=this.aToCQuantity;var multiTypeForCarepak=this.aToCType;var multiName=this.aToCName;if(multiCatEntry!=null&&multiCatEntry.length>0){var flg="N";for(var i=0;i<multiTypeForCarepak.length;i++){if(multiTypeForCarepak[i]=="1"){flg="Y";name=multiName[i];}}if(flg=="Y"){this.ShowCarepakLayerAjaxAccessory(name);}else{this.AddItem2ShopCartAjaxAccessory();}}else{console.debug("URL for shopping cart");location.href=getAbsoluteURL()+"OrderItemDisplay?&calculationUsageId=-1&calculationUsageId=-2&calculationUsageId=-3&calculationUsageId=-4&calculationUsageId=-7&updatePrices=1&catalogId="+this.catalogId+"&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId="+this.langId+"&storeId="+this.storeId+"&URL=AjaxOrderItemDisplayView";}},ShowCarepakLayerAjaxAccessory:function(name){var multiCatEntry=this.aToCCatentry;var multiQty=this.aToCQuantity;var multiTypeForCarepak=this.aToCType;var prodId=this.getMainProductIdForCarepak();for(var i=0;i<multiTypeForCarepak.length;i++){if(multiTypeForCarepak[i]=="1"){try{if(this.widgets.CusaCarePakDialogWidget){this.widgets.CusaCarePakDialogWidget.destroy();}var scope=this;require(["dijit/Dialog","dojo/dom-style"],function(Dialog,domStyle){scope.widgets.CusaCarePakDialogWidget=new Dialog({id:"CusaCarePakDialogWidget",title:"CusaCarePakDialogWidget",href:getAbsoluteURL()+"CusaCarePAKTermsConditionsDisplay?storeId="+WCParamJS.storeId+"&catalogId="+WCParamJS.catalogId+"&langId="+WCParamJS.langId+"&src=carepakonly&catEntryId="+multiCatEntry[i]+"&carepakName="+name+"&productId="+prodId});});}catch(e){console.debug(e);}}}try{this.widgets.CusaCarePakDialogWidget.show();}catch(e){console.debug(e);}},AddItem2ShopCartAjaxAccessory:function(){var params=[];params.storeId=this.storeId;params.catalogId=this.catalogId;params.langId=this.langId;params.orderId=".";params.calculationUsage="-1,-2,-5,-6,-7";params.inventoryValidation="true";var ajaxShopCartService="AddOrderItemAccessoryLayer";var multiCatEntry=this.aToCCatentry;var multiQty=this.aToCQuantity;var multiTypeForCarepak=this.aToCType;shoppingActionsJS.setProductHavingAccessories("0");shoppingActionsJS.productAddedList=new Object();if(dojo.isArray(multiCatEntry)&&dojo.isArray(multiQty)){for(var i=0;i<multiCatEntry.length;i++){if(!isPositiveInteger(multiQty[i])){MessageHelper.displayErrorMessage(storeNLS["QUANTITY_INPUT_ERROR"]);return;}params["catEntryId_"+(i+1)]=multiCatEntry[i];params["quantity_"+(i+1)]=multiQty[i];}}if(!submitRequest()){return;}cursor_wait();wc.service.invoke(ajaxShopCartService,params);productDisplayJS.baseItemAddedToCart=true;},ArrForAccessoryLayer:function(catEntryId,mainProductId,type,name){var id="AccessoryLayer"+catEntryId;this.setMainProductIdForCarepak(mainProductId);document.getElementById(id).disabled=true;var flag=false;this.DisplayProductsAddedOnAccLayer(name);if(this.aToCCatentry.length<=0){this.aToCCatentry.push(catEntryId);this.aToCQuantity.push("1");this.aToCType.push(type);this.aToCName.push(name);}for(var i=0;i<this.aToCCatentry.length;i++){if(this.aToCCatentry[i]==catEntryId){flag=true;}}if(!flag){this.aToCCatentry.push(catEntryId);this.aToCQuantity.push("1");this.aToCType.push(type);this.aToCName.push(name);}console.debug("is that an array ::"+dojo.isArray(this.aToCCatentry));var addToCartId="AccessoryLayer"+catEntryId,addToCartButtonNode=dojo.byId(addToCartId),addToCartButtonTextNode=dojo.create("span",{"className":"button_text"}),addedToCartButtonText="Item in Cart",addToCartButtonClass="button_primary",addedToCartButtonClass="button_primary button_secondary";if(addToCartButtonNode){if(dojo.hasClass(addToCartButtonNode,addToCartButtonClass)){dojo.replaceClass(addToCartButtonNode,addedToCartButtonClass,addToCartButtonClass);addToCartButtonTextNode.innerHTML=addedToCartButtonText;dojo.removeAttr(addToCartButtonNode,"onclick");}addToCartButtonNode.innerHTML="";dojo.place(addToCartButtonTextNode,addToCartButtonNode);}},ArrForCarePakItems:function(catEntryId){var id="AccessoryLayer"+catEntryId;var flag=false;if(this.aToCCatentry.length<=0){this.aToCCatentry.push(catEntryId);this.aToCQuantity.push("1");}for(var i=0;i<this.aToCCatentry.length;i++){if(this.aToCCatentry[i]==catEntryId){flag=true;}}if(!flag){this.aToCCatentry.push(catEntryId);this.aToCQuantity.push("1");}console.debug("is that an array ::"+dojo.isArray(this.aToCCatentry));console.debug("Array Values ::"+this.aToCCatentry);},DisplayProductsAddedOnAccLayer:function(product){document.getElementById("showAccessories").innerHTML=product+" has been selected to be added to the Cart";document.getElementById("showAccessories").style.display="block";}};require(["dojo/on","dojo/has","dojo/_base/sniff","dojo/domReady!"],function(on,has){if(has("ie")<9){on(document,'.compare_target > input[type="checkbox"]:click',function(event){this.blur();this.focus();});}});