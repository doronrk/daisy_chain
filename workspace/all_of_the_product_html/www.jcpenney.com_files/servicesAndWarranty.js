var addToBag=false;function showServiceOrWarranty(type,lotId){if(type=="service"){$("#serviceModal"+lotId).show();$("#warrantyModal"+lotId).hide();}if(type=="warranty"){$("#serviceModal"+lotId).hide();$("#warrantyModal"+lotId).show();}var modalType=$("#typeOfModal").html();if(modalType=="PPE_ServiceWarranty"){if(type=="service"){if(jQuery.browser.version=="7.0"||jQuery.browser.version=="8.0"){parent.$.fn.colorbox.resize({width:560,height:317});
}else{parent.$.fn.colorbox.resize({width:560,height:332});}}else{if(type=="warranty"){if(jQuery.browser.version=="7.0"||jQuery.browser.version=="8.0"){parent.$.fn.colorbox.resize({width:560,height:317});}else{parent.$.fn.colorbox.resize({width:560,height:328});}}}}else{if($("#cboxLoadedContent").find(".module_overlay").length>0){$.colorbox.resize();
}}}function createNotUserSelectedModalURL(){addToBag=true;var isFirst=true;var lotIdsForServiceModal="";var ppIdsForServiceModal="";var quantity="";var pageType=$("#PAGETYPE").html();if(pageType=="PPE_Graphical"){var addToBagFlag=isAddToBagAllowedForEnsemble();if(addToBagFlag==false){$("#errorContainer"+globalButtonIndex).show();
return;}}try{$('input[id*="serviceCheck"]').each(function(){if(this.checked==true){return;}var temp=this.id;var lotId=temp.substring(12);temp=$(this).parent().parent().attr("id");var ppId=temp.substring(24);if(ppId!=""){quantity=$("#prod_quantity"+ppId).val();}else{quantity=$("#prod_quantity"+lotId).val();
}if(quantity>0){if(isFirst==false){lotIdsForServiceModal=lotIdsForServiceModal+",";ppIdsForServiceModal=ppIdsForServiceModal+",";}else{isFirst=false;}lotIdsForServiceModal=lotIdsForServiceModal+lotId;ppIdsForServiceModal=ppIdsForServiceModal+ppId;}});}catch(e){handlejavaScriptError(e);}if(lotIdsForServiceModal==""){copyAllValues();
addItems();addToBag=false;return;}var href="/dotcom/jsp/browse/serviceAgreements/serviceAndWarrantyAddToBagModal.jsp?selectedPPs="+ppIdsForServiceModal+"&selectedLots="+lotIdsForServiceModal;$("#unselectedSAlink").attr("href",href);$("#unselectedSAlink").trigger("click");}function showParentWindow(lotId){var checkBoxId="serviceCheck"+lotId;
$("#"+checkBoxId).attr("checked","true");skipThisOffer(lotId);}function skipThisOffer(lotId){var currentDivTraversed=false;var currentDivId="serviceModal"+lotId;var nextDivId="";try{$('div[id*="serviceModal"]').each(function(){if(currentDivTraversed==true){nextDivId=$(this).attr("id");currentDivTraversed=false;
return;}var divId=$(this).attr("id");var lotIdFromDivId=divId.replace("serviceModal","");if(lotId==lotIdFromDivId){currentDivTraversed=true;}});}catch(e){handlejavaScriptError(e);}if(nextDivId!=""){$("#"+currentDivId).hide();$("#"+nextDivId).show();}else{$("#closeModalLink").trigger("click");var pageIdentifier=$("#pageName").val();
if(pageIdentifier!=undefined&&pageIdentifier=="sampleRegistry"){copySRValues(globalPPId);addItemsSR(globalPPId);addToBag=false;globalPPId="";}else{copyAllValues();addItems();addToBag=false;}}}function closeAllServiceModals(){if(addToBag){$("#closeModalLink").trigger("click");copyAllValues();addItems();
addToBag=false;}else{parent.$.fn.colorbox.close();return false;}}