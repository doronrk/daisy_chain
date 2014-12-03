function getPRCart(){
	var responseData = null;
	//validate if sku has all option selected
	
	//set page type
	var form = $("#mainForm");
	var noQtyMsg = "No Quantity Entered";
	var noOptionsMsg = "No Option Selected";
	var notInStockMsg = "The product is not available at this time.";
	var status = validateProductSelection(noQtyMsg, noOptionsMsg, form, 1, false,false,notInStockMsg);
	//var status = MarketLive.P2P.validateProductSelection('No Quantity Entered', 'No Option Selected', form, 1);
	
	if(status == true){
		var page = window.location.href;
		var index = page.indexOf("basket");
		if(index !== -1){
			page="basket";
		}
		else{
			page="product";
		}

		//if okay, then continue
		$.ajax({
			type: "POST",
	        async: false,
			url: "/shoprunner/ShopRunnerBasket.do?method=getPRCart&r="+ Math.random(),
			data: {form:$("#mainForm").serialize(),"pageType":page},
			dataType: "json",
			success: function(response){
				/*
				 * get products in the cart if basket page and 
				 * product if on detail page
				 * 
				 * set response
				 */
				responseData = response.data;
				//If this variable is set to true, the page will be reloaded when a user signs in, signs out
				sr_pageRefreshes=true;
			},
			error: function(e){
				var errorValue = "testing";
			}
		});
	}
	
	return responseData;
}

validateProductSelection = function(qtyMessage, optionMsg, form, minQty, stopIfSKUsUnavailable, errorReporter,notInStockMsg) {
    var iTotalQty = 0;
    var qtyErrorMsg = qtyMessage.toString();
    var optionErrorMsg = optionMsg.toString();
    var qtyValue = '';
    var optValue = '';
    var optTypeValue = '';
    var selectedKitItems = '';
    var iValue;
    var productPks = new Array();
    var qty = new Array();
    var optionTypes = new Array();
    var options = new Array();
    var productWithNoOptions = 0;
    var productWithOptions = 0;
    var validOptions = 0;
    var j = 0;
    var badOptions = 0;
    var badOptionsProductPks = new Array();
    var qtyValid = false;
    var isKit = false;
    var productPk = "";
    var bValidationResult = true;
    var tmpIdStr = "kitElement_";
    var form0=form[0];
    for ( var i = 0; i < form0.length; i++) {

        var field = form0.elements[i];
        if ((field.type == "text" || field.type == "select-one") && (field.name == "qty")) {

            qtyValue = (field.type == "text") ? field.value : field[field.selectedIndex].value;
            if (isNotDigitsPrompt(field, qtyValue, qtyMessage, errorReporter)) {
                return false;
            }

        } else if (field.type == "hidden") {
            if (field.name == "option") {
                optValue = field.value;
            } else if (field.name == "optionTypes") {
                optTypeValue = field.value;
            } else if (field.name == "qty") {
                qtyValue = field.value;
                isKit = true;
            }
	        // make sure that any javascript attached to a radio button gets triggered if its checked/selected.
        } else if (field.type == "radio" && field.checked) {
            field.click();
        } else if (field.type == "select-one" && field.name.indexOf("options_") == 0) {
	        // Create kit element field id when kit is displayed as product only
            tmpIdStr += field.value + "_";
        }

        if (field.name == "productPk") {
            productPk = field.value;
            tmpIdStr += productPk + "_";
        }
        if (productPk.length > 0 && isKit) {
            var fieldName = "document.getElementById('mainForm').selectedKitItems_" + productPk;
            obj = eval(fieldName);
            if (obj.value == undefined) {
                var k = 0;
                for (k = 0; k < obj.length; k++) {
                    if (obj[k].checked) {
                        break;
                    }
                }

                if (k == obj.length) {
                    errorReporter ? errorReporter('select a kit') : alert('select a kit');
                    return false;
                } else {
                    bValidationResult = validateKitSingleProductOptions(productPk, errorReporter);
                }
            }
        }

        // if all fields values are collected, store them into the arrays
        if (qtyValue != "" && optValue != "" && optTypeValue != "") {
            // alert(" qtyValue " + qtyValue + " optValue " + optValue + " optTypeValue " + optTypeValue );
            productPks[j] = productPk;
            qty[j] = qtyValue;
            options[j] = optValue;
            optionTypes[j] = optTypeValue;
            j++;
            optTypeValue = "";
            qtyValue = "";
            optValue = "";
        }
    }
    // Get the value of Kit Element String and store it in SelectedKitItems field.
    if (tmpIdStr != null && tmpIdStr != "") {
        tmpIdStr += "option";

        // Get object of SelectedKitItems field
        var fieldName = "document.getElementById('mainForm').selectedKitItems";
        obj = eval(fieldName);
        // Get object of kit Element field.
        var targetFieldName = "document.getElementById('mainForm')." + tmpIdStr;
        tarObj = eval(targetFieldName);

        // alert('initial obj = '+obj);
        // alert('initial obj.value = '+obj.value);
        // alert('initial tarObj = '+tarObj);
        // alert('initial tarObj.value = '+tarObj.value);
	    // For some kitsetups tarObj is array, and for some kitsetups this is not null but empty. so handle accordingly
        if (obj != null && tarObj != null && (tarObj.length >= 1)) {
            obj.value = tarObj[0].value;
            for ( var k = 1; k < tarObj.length; k++) {
                obj.value = obj.value + tarObj[k].value;
            }
        } else if (obj != null && tarObj != null && tarObj.value != '') {
            obj.value = tarObj.value;
        }
        // alert('Final obj.value = '+obj.value);
    }

    // alert("qty.length " + qty.length + " optiolength " + optiolength + " optionTypes.length " + optionTypes.length + " j " + j);
    // go through the arrays and validate
    for ( var m = 0; m < j; m++) {
        // check qty
        qtyValue = qty[m];

        if (isAllDigits(qtyValue)) {
            iValue = parseInt(qtyValue);
            if (!isNaN(iValue)) {
                iTotalQty += iValue;
                qtyValid = true;
            }
        }
        // now check options selection
        if (qtyValid && (iValue > 0)) {
            qtyValid = false;
            optTypeValue = optionTypes[m];
            optValue = options[m];
            if (optTypeValue > 0) {
                // product has options so check if any selected
                if (optValue != "none") {
                    // something was selected
                    // now check that number of options corresponds to selection
                    arr = optValue.split(":");
                    if (arr.length == optTypeValue) {
                        // got the same number of options as the number of drop-down menus
                        // now check if a zero value is selected for each one of them
                        for ( var n = 0; n < arr.length; n++) {
                            subArr = arr[n].split("=");
                            if ((subArr[1] != 0)) {
                                validOptions++;
                            }
                        }
                        if (validOptions == optTypeValue && (!stopIfSKUsUnavailable || !jQuery('#availabilityErrorMsg_' + productPks[m]).text())) {
                            productWithOptions++;
                        } else {
                            badOptionsProductPks[badOptions] = productPks[m];
                            badOptions++;
                        }
                        // reset var
                        validOptions = 0;
                    } else {
                        badOptionsProductPks[badOptions] = productPks[m];
                        badOptions++;
                    }
                } else {
                    badOptionsProductPks[badOptions] = productPks[m];
                    badOptions++;
                }
            } else {
                // product has no options, increment counter.
                productWithNoOptions++;
            }
        } // end if valid qty and qty > 0
    } // end for

    // validate quantity. On detail page, minQty is probably 1.
    // On basket, 0 is a valid qty -- means to remove
    if (iTotalQty < minQty) {
        errorReporter ? errorReporter(qtyErrorMsg) : alert(qtyErrorMsg);
        return false;
    } else {
        if (badOptions > 0) {
            errorReporter ? errorReporter(optionErrorMsg, badOptionsProductPks[0]) : alert(optionErrorMsg);
            return false;
        } else {
            // if nothing was selected for product with options and
            // there is no product without options
            // and there is a qty greater than minQty then there's an error
            if ((productWithOptions < 1) && (productWithNoOptions < 1) && (iTotalQty > minQty)) {
                errorReporter ? errorReporter(optionErrorMsg) : alert(optionErrorMsg);
                return false;
            } else {
               // return true;
            }
        }
    }
	 var oMessagingText = document.getElementById('messagingText_' + productPk);

            if (oMessagingText && oMessagingText.innerHTML != "") {
                if(!(oMessagingText.innerHTML.indexOf("In Stock") != -1 || oMessagingText.innerHTML.indexOf("Available") != -1)){
					errorReporter ? errorReporter(notInStockMsg) : alert(notInStockMsg);
					return false;
            }
            }else{
			if(document.getElementById("inStock") && document.getElementById("inStock").value!="true"){
				errorReporter ? errorReporter(notInStockMsg) : alert(notInStockMsg);
				return false;
        }
    }
	
    return bValidationResult;


}

/*
function isAllDigits(argvalue) {
argvalue = argvalue.toString();
if(argvalue.length < 1) return false;

var validChars = "0123456789";
var startFrom = 0;
if (argvalue.substring(0, 2) == "0x") {
   validChars = "0123456789abcdefABCDEF";
   startFrom = 2;
} else if (argvalue.charAt(0) == "0") {
   validChars = "01234567";
   startFrom = 1;
} else if (argvalue.charAt(0) == "-") {
    startFrom = 1;
}

for (var n = startFrom; n < argvalue.length; n++) {
    if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) return false;
}
return true;
}
 */
isNotDigitsPrompt = function(field, qtyValue, qtyMessage, errorReporter) {
    if (qtyValue == "") {
        field.value = "0";
        return false;
    } else if (!isAllDigits(qtyValue)) {
        errorReporter ? errorReporter(qtyMessage) : alert(qtyMessage);
        return true;
    }
}
isAllDigits = function(argvalue) {
    argvalue = argvalue.toString();
    if (!validateNotEmpty(argvalue))
        return false;

    if (!validatePositiveInt(argvalue))
        return false;

    return true;
}

validateInteger = function(strValue) {
    var objRegExp = /(^-?\d\d*$)/;

    // check for integer characters
    return objRegExp.test(strValue);
}

validatePositiveInt = function(strValue) {
    var objRegExp = /(^\d\d*$)/;

    // check for integer characters
    return objRegExp.test(strValue);
}

validateNotEmpty = function(strValue) {
    var strTemp = strValue;
    strTemp = trimAll(strTemp);
    if (strTemp.length > 0) {
        return true;
    }
    return false;
}

trimAll = function(strValue) {
    var objRegExp = /^(\s*)$/;

    // check for all spaces
    if (objRegExp.test(strValue)) {
        strValue = strValue.replace(objRegExp, '');
        if (strValue.length == 0)
            return strValue;
    }

    // check for leading & trailing spaces
    objRegExp = /^(\s*)([\W\w]*)(\b\s*$)/;
    if (objRegExp.test(strValue)) {
        // remove leading and trailing whitespace characters
        strValue = strValue.replace(objRegExp, '$2');
    }
    return strValue;
}

validateKitSingleProductOptions = function(productPk, errorReporter) {
    // locate error message
    var selectedSkuFieldName = "document.getElementById('mainForm').selectedKitSku";
    var selectedSkuFieldObj = eval(selectedSkuFieldName);
    var selectedSkuPk = selectedSkuFieldObj.value;
    var errorMessageFieldName = "";
    var errorMessageFieldObj;
    var notDone = 1;

    for ( var j = 0; notDone == 1; j++) {
        errorMessageFieldName = "document.getElementById('mainForm').errorMessage_" + productPk + "_" + selectedSkuPk + "_" + j;
        errorMessageFieldObj = eval(errorMessageFieldName);
        if (errorMessageFieldObj != undefined) {
            if (errorMessageFieldObj.value != "") {
                errorReporter ? errorReporter(errorMessageFieldObj.value) : alert(errorMessageFieldObj.value);
                notDone = 0;
                return false;
            }
        } else {
            notDone = 0;
        }
    }
    return true;

}
