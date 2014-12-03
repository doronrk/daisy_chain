dojo.require("wc.render.RefreshController");dojo.require("wc.render.Context");dojo.require("wc.widget.RefreshArea");dojo.addOnLoad(function(){if(!wc.render.getContextById("default")){wc.render.declareContext("default",{},"")}AddressBookFormJS.declareRefreshController("addressDisplayAreaController","addressDisplayAreaAction","AjaxAddressBookForm");AddressBookFormJS.declareRefreshController("addressFormAreaController","addressFormAreaAction","AjaxAccountAddressForm");AddressBookFormJS.declareRefreshController("billing_statesDisplayAreaController","statesDisplayAreaAction","AjaxAddressStatesDisplay");AddressBookFormJS.declareRefreshController("shipping_statesDisplayAreaController","statesDisplayAreaAction","AjaxAddressStatesDisplay")});AddressBookFormJS={langId:"-1",storeId:"",catalogId:"",addressDeleted:"false",addressNew:"false",pageVar:"",isEmailPopulate:false,addressObj:new Array(),crmAddress:null,setCommonParameters:function(langId,storeId,catalogId){this.langId=langId;this.storeId=storeId;this.catalogId=catalogId},getControllerActionHandler:function(handlerKey,actionName){console.debug("entering getControllerActionHandler(controller, handlerKey, actionName): "+actionName);var handler=AddressBookFormJS[actionName+"s"][handlerKey];if(handler){return function(message,widget,controller){handler(message,widget,controller)}}else{return function(message,widget,controller){console.debug("empty handler. This is a no-op")}}},declareRefreshController:function(controllerId,actionName,defaultURL){console.debug("entering AddressBookFormJS.declareRefreshController with action name = "+actionName+" and controller id = "+controllerId);if(wc.render.getRefreshControllerById(controllerId)){console.debug("controller with id = "+controllerId+" already exists. No declaration will be done");return}wc.render.declareRefreshController({id:controllerId,renderContext:wc.render.getContextById("default"),url:defaultURL,renderContextChangedHandler:function(message,widget){console.debug("entering renderContextChangedHandler for "+controllerId);var controller=this;var renderContext=this.renderContext;if(!Common.getRenderContextProperty(renderContext,actionName)){console.debug("no "+actionName+" is specified. This handler will not be called. Exiting...");return}if(Common.getRenderContextProperty(renderContext,"url")){controller.url=Common.getRenderContextProperty(renderContext,"url")}AddressBookFormJS.getControllerActionHandler(Common.getRenderContextProperty(renderContext,actionName),actionName)(message,widget,controller);delete renderContext.properties[actionName];delete renderContext.properties.url},modelChangedHandler:function(message,widget){AddressBookFormJS.getControllerActionHandler("handleModelChange",actionName)(message,widget,this);cursor_clear()}})},addressFormAreaActions:{create:function(message,widget,controller){widget.refresh(controller.renderContext.properties);controller.renderContext.properties.addressFormAreaState="create"},edit:function(message,widget,controller){console.debug("starting to getting editing area");widget.refresh(controller.renderContext.properties);controller.renderContext.properties.addressFormAreaState="edit"},clean:function(message,widget,controller){widget.setInnerHTML("");controller.renderContext.properties.addressFormAreaState="clean"},handleModelChange:function(message,widget,controller){widget.setInnerHTML("");controller.renderContext.properties.addressFormAreaState="clean"}},addressDisplayAreaActions:{reload:function(message,widget,controller){console.debug("reloading "+widget);widget.refresh(controller.renderContext.properties)},handleModelChange:function(message,widget,controller){console.debug("reloading "+widget);widget.refresh(controller.renderContext.properties)}},statesDisplayAreaActions:{countryUpdated:function(message,widget,controller){console.debug("IN countryUpdated handler: message = "+message);var paramPrefix=controller.renderContext.properties.paramPrefix;if(widget.widgetId.match(paramPrefix)){console.debug("matchin paramPrefix: "+paramPrefix+" refreshing "+widget.widgetId);widget.refresh(controller.renderContext.properties)}else{console.debug("no maching paramPrefix "+paramPrefix)}}},toggleAddressDisplay:function(selection,tableClass,tableIdPrefix){console.debug("toggle address display");var selectedAddressId=selection.options[selection.selectedIndex].value;dojo.forEach(dojo.query("."+tableClass),function(div){var tableId=tableIdPrefix+selectedAddressId;if(div.id==tableId&&selectedAddressId!="MyBillingAddress"){div.style.display="block"}else{div.style.display="none"}})},updateAddressArea:function(params){console.debug("to update with params: "+params);wc.render.updateContext("default",params);console.debug("updateArea done")},updateAddress:function(formName,addressDisplayURL){var form=document.forms[formName];for(var i=0;i<form.sbAddress.length;i++){if(form.sbAddress[i].checked){form.addressType.value=form.sbAddress[i].value}}if(form.addressType.value==""){MessageHelper.displayErrorMessage(MessageHelper.messages.AB_SELECT_ADDRTYPE);return}if(this.validateForm(form)){console.debug("creating with form id = "+formName+" and  address display url is: "+addressDisplayURL);dojo.require("wc.service.common");wc.service.declare({id:"updateAddressBook",actionId:"updateAddressBook",url:"AjaxPersonChangeServiceAddressAdd",formId:formName,successHandler:function(serviceResponse){AddressBookFormJS.pageVar="addressbook";cursor_clear()},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage)}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey)}}cursor_clear()}});if(!submitRequest()){return}cursor_wait();wc.service.invoke("updateAddressBook")}},newUpdateAddressBook:function(formName,addressDisplayURL){var form=document.forms[formName];for(var i=0;i<form.sbAddress.length;i++){if(form.sbAddress[i].checked){form.addressType.value=form.sbAddress[i].value}}if(form.addressType.value==""){MessageHelper.displayErrorMessage(MessageHelper.messages.AB_SELECT_ADDRTYPE);return}if(this.validateForm(form)){console.debug("creating with form id = "+formName+" and  address display url is: "+addressDisplayURL);dojo.require("wc.service.common");wc.service.declare({id:"updateAddress",actionId:"updateAddress",url:"AjaxPersonChangeServiceAddressAdd",formId:formName,successHandler:function(serviceResponse){AddressBookFormJS.addressNew="true";cursor_clear()},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage)}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey)}}cursor_clear()}});if(!submitRequest()){return}cursor_wait();wc.service.invoke("updateAddress")}},showFooterNew:function(){hideElementById("content_footer");showElementById("addnew_content_footer")},showFooter:function(){showElementById("content_footer");hideElementById("addnew_content_footer")},updateHidePrimary:function(form,update,hideCheckbox,displayMsg){if(update){form.primary.checked="checked"}if(hideCheckbox){$("#defaultCheckbox").css("display","none");$("#defaultCheckboxLabel").text(displayMsg)}else{$("#defaultCheckbox").css("display","block");$("#defaultCheckboxLabel").text("")}},newDeleteAddress:function(selectionName,addressDeleteUrl,addressUrl){var addressBox=document.getElementById(selectionName);if(addressBox.value==addressBox.options[0].value){MessageHelper.formErrorHandleClient(selectionName,MessageHelper.messages.ERROR_DEFAULTADDRESS);return}if(addressBox.value==""){MessageHelper.formErrorHandleClient(selectionName,MessageHelper.messages.ERROR_SELECTADDRESS);return}var params=[];params.storeId=this.storeId;params.catalogId=this.catalogId;params.addressId=addressBox.value;params.URL=addressUrl;dojo.require("wc.service.common");wc.service.declare({id:"AddressDelete",actionId:"AddressDelete",url:addressDeleteUrl,successHandler:function(serviceResponse){AddressBookFormJS.addressDeleted="true";wc.render.getRefreshControllerById("MyAccountCenterLinkDisplay_Controller").url=addressUrl;cursor_clear()},failureHandler:function(serviceResponse){if(serviceResponse.errorMessage){MessageHelper.displayErrorMessage(serviceResponse.errorMessage)}else{if(serviceResponse.errorMessageKey){MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey)}}cursor_clear()}});if(!submitRequest()){return}cursor_wait();wc.service.invoke("AddressDelete",params)},populateTextFields:function(selection,addresses,form){if(selection.options[selection.selectedIndex].value=="default"){AddressBookFormJS.clearTextFields(form);AddressBookFormJS.showAdd()}else{if(document.getElementById("adding").style.display=="block"){var hidediv=document.getElementById("adding");hideElementById(hidediv)}var div=document.getElementById("normal");div.style.display="block";var selectedAddressId=selection.options[selection.selectedIndex].value;var radioButton=form.sbAddress;for(var i=0;i<radioButton.length;i++){if(radioButton[i].value==addresses[selectedAddressId].addressType){$(".redesignIcons-radio-checked","#WC_AccountForm_div_4").attr("class","icon redesignIcons-radio");radioButton[i].checked="checked";$("input[value="+addresses[selectedAddressId].addressType+"]","#WC_AccountForm_div_4").next().find("span").attr("class","icon redesignIcons-radio-checked")}}if(addresses[selectedAddressId].primary=="true"){form.primary.checked="checked"}else{form.primary.checked=false}if(document.removeAddressForm.addressId){document.removeAddressForm.addressId.value=selectedAddressId}$("input[name=addressId]").val(selectedAddressId);form.addressId.value=selectedAddressId;form.firstName.value=addresses[selectedAddressId].firstName;form.lastName.value=addresses[selectedAddressId].lastName;form.address1.value=addresses[selectedAddressId].address1;form.address2.value=addresses[selectedAddressId].address2;form.country.value=addresses[selectedAddressId].country;form.zipCode.value=addresses[selectedAddressId].zipCode;form.email1.value=addresses[selectedAddressId].email1;form.phone1.value=addresses[selectedAddressId].phone1;form.city.value=addresses[selectedAddressId].city;if($('input[name = "phone2"]').length&&addresses[selectedAddressId].phone2){form.phone2.value=addresses[selectedAddressId].phone2}if(form.state){AddressHelper.loadStatesUI("AddressForm","","stateDiv","state");form.state.value=addresses[selectedAddressId].state}if(form.middleName){form.middleName.value=addresses[selectedAddressId].middleName}}},populateTextFieldsCustom:function(selection,addresses,form,displayMsg){if(selection.options[selection.selectedIndex].value=="default"){AddressBookFormJS.clearTextFields(form);AddressBookFormJS.showAdd()}else{if(document.getElementById("adding").style.display=="block"){var hidediv=document.getElementById("adding");hideElementById(hidediv)}var div=document.getElementById("normal");div.style.display="block";var selectedAddressId=selection.options[selection.selectedIndex].value;var radioButton=form.sbAddress;for(var i=0;i<radioButton.length;i++){if(radioButton[i].value==addresses[selectedAddressId].addressType){radioButton[i].checked="checked"}}if(addresses[selectedAddressId].primary=="true"){form.primary.checked="checked";$("#defaultCheckboxLabel").text(displayMsg);$("#WC_AjaxAddressBookForm_div_43 .delete-link").hide();if(document.getElementById("WC_AccountForm_div_7")){document.getElementById("WC_AccountForm_div_7").style.display="none"}}else{form.primary.checked=false;$("#defaultCheckboxLabel").text("");$("#WC_AjaxAddressBookForm_div_43 .delete-link").show();if(document.getElementById("WC_AccountForm_div_7")){document.getElementById("WC_AccountForm_div_7").style.display="block"}}document.removeAddressForm.addressId.value=selectedAddressId;form.addressId.value=selectedAddressId;form.firstName.value=addresses[selectedAddressId].firstName;form.lastName.value=addresses[selectedAddressId].lastName;form.address1.value=addresses[selectedAddressId].address1;form.address2.value=addresses[selectedAddressId].address2;form.country.value=addresses[selectedAddressId].country;form.zipCode.value=addresses[selectedAddressId].zipCode;form.email1.value=addresses[selectedAddressId].email1;form.phone1.value=addresses[selectedAddressId].phone1;form.city.value=addresses[selectedAddressId].city;if(form.addressField3){form.addressField3.value=addresses[selectedAddressId].nickName2}if(form.state){AddressHelper.loadStatesUI("AddressForm","","stateDiv","state");form.state.value=addresses[selectedAddressId].state}if(form.middleName){form.middleName.value=addresses[selectedAddressId].middleName}}},populateTextFieldsOnLoad:function(selection,addresses,form,selectedAddressId){if(selection.options.length>0){if(selection.selectedIndex>=0&&selection.options[selection.selectedIndex].value=="default"){AddressBookFormJS.clearTextFields(form);AddressBookFormJS.showAdd()}else{if(document.getElementById("adding").style.display=="block"){var hidediv=document.getElementById("adding");hideElementById(hidediv)}var div=document.getElementById("normal");div.style.display="block";var radioButton=form.sbAddress;for(var i=0;i<radioButton.length;i++){if(radioButton[i].value==addresses[selectedAddressId].addressType){radioButton[i].checked="checked"}}if(addresses[selectedAddressId].primary=="true"){form.primary.checked="checked"}else{form.primary.checked=false}if(document.removeAddressForm.addressId){document.removeAddressForm.addressId.value=selectedAddressId}form.addressId.value=selectedAddressId;form.firstName.value=addresses[selectedAddressId].firstName;form.lastName.value=addresses[selectedAddressId].lastName;form.address1.value=addresses[selectedAddressId].address1;form.address2.value=addresses[selectedAddressId].address2;if(form.state){form.state.value=addresses[selectedAddressId].state}form.country.value=addresses[selectedAddressId].country;form.zipCode.value=addresses[selectedAddressId].zipCode;form.email1.value=addresses[selectedAddressId].email1;form.phone1.value=addresses[selectedAddressId].phone1;form.city.value=addresses[selectedAddressId].city;if(form.middleName){form.middleName.value=addresses[selectedAddressId].middleName}if(form.state){AddressHelper.loadStatesUI("AddressForm","","stateDiv","state",true)}}}},populateTextFieldsOnLoadCustom:function(selection,addresses,form,selectedAddressId,displayMsg){if(selection.options.length>0){if(selection.selectedIndex>=0&&selection.options[selection.selectedIndex].value=="default"){AddressBookFormJS.clearTextFields(form);AddressBookFormJS.showAdd()}else{if(document.getElementById("adding").style.display=="block"){var hidediv=document.getElementById("adding");hideElementById(hidediv)}var div=document.getElementById("normal");div.style.display="block";var radioButton=form.sbAddress;for(var i=0;i<radioButton.length;i++){if(radioButton[i].value==addresses[selectedAddressId].addressType){radioButton[i].checked="checked"}}if(addresses[selectedAddressId].primary=="true"){form.primary.checked="checked";$("#defaultCheckboxLabel").text(displayMsg);$("#WC_AjaxAddressBookForm_div_43 .delete-link").hide();if(document.getElementById("WC_AccountForm_div_7")&&constants.ajaxParams.country!="AU"){document.getElementById("WC_AccountForm_div_7").style.display="none"}}else{form.primary.checked=false;$("#WC_AjaxAddressBookForm_div_43 .delete-link").show();$("#defaultCheckboxLabel").text("");if(document.getElementById("WC_AccountForm_div_7")&&constants.ajaxParams.country!="AU"){document.getElementById("WC_AccountForm_div_7").style.display="block"}}if(document.removeAddressForm.addressId){document.removeAddressForm.addressId.value=selectedAddressId}form.addressId.value=selectedAddressId;form.firstName.value=addresses[selectedAddressId].firstName;form.lastName.value=addresses[selectedAddressId].lastName;form.address1.value=addresses[selectedAddressId].address1;form.address2.value=addresses[selectedAddressId].address2;if(form.state){form.state.value=addresses[selectedAddressId].state}form.country.value=addresses[selectedAddressId].country;form.zipCode.value=addresses[selectedAddressId].zipCode;form.email1.value=addresses[selectedAddressId].email1;form.phone1.value=addresses[selectedAddressId].phone1;form.city.value=addresses[selectedAddressId].city;if(form.addressField3){form.addressField3.value=addresses[selectedAddressId].nickName2}if(form.middleName){form.middleName.value=addresses[selectedAddressId].middleName}if(form.state){AddressHelper.loadStatesUI("AddressForm","","stateDiv","state",true)}}}},clearTextFields:function(form,nickname){nickname=typeof nickname!=="undefined"?nickname:"";if(form.nickName){form.nickName.value=nickname}form.address1.value="";form.address2.value="";form.city.value="";if(form.state&&showStateAddress){form.state.value=""}form.zipCode.value="";if(!AddressBookFormJS.isEmailPopulate){form.email1.value=""}form.phone1.value="";if(form.primary){form.primary.checked=false}if(form.middleName){form.middleName.value=""}},submitForm:function(form,suffix,elements){if($("#WC_AccountForm_sbAddress_1_radio").attr("class")=="icon redesignIcons-radio-checked"){form.addressType.value="Shipping"}else{if($("#WC_AccountForm_sbAddress_2_radio").attr("class")=="icon redesignIcons-radio-checked"){form.addressType.value="Billing"}}if($("label[for=WC_AccountForm_sbAddress_1] span").attr("class")=="icon redesignIcons-radio-checked"){form.addressType.value="Shipping"}else{if($("label[for=WC_AccountForm_sbAddress_2] span").attr("class")=="icon redesignIcons-radio-checked"){form.addressType.value="Billing"}}if(elements!=undefined){if(elements.length!=0){$.each(elements,function(i,v){v.val($.trim(v.val()))})}}var adValid=$(form).valid();if(suffix){AddressHelper.setStateDivName("stateDiv1")}if(adValid){if(form.primary.checked){$.cookie("isCRMAddressTabCliked",false,{path:"/"});form.primary.value=true}else{form.primary.value=false}form.zipCode.value=form.zipCode.value.toUpperCase();form.submit()}},showAdd:function(){document.getElementById("addressId").options[0].selected="selected";var hidediv=document.getElementById("normal");hideElementById(hidediv);var div=document.getElementById("adding");div.style.display="block";$("[id^=WC_AccountForm_sbAddress_1]").prop("checked",true);$("[id^=WC_AccountForm_sbAddress_2]").prop("checked",false);$("[id^=WC_AccountForm_sbAddress_1_radio]").attr("class","icon redesignIcons-radio-checked");$("[id^=WC_AccountForm_sbAddress_2_radio]").attr("class","icon redesignIcons-radio")},removeAddress:function(formName,addressSelectBoxName){var addressBox=document.getElementById(addressSelectBoxName);var form=document.forms[formName];var addressId=addressBox.value;form.addressId.value=addressBox.value;if(addressId.length==0){return}if(!submitRequest()){return}form.submit()},validateForm:function(form){return(AddressHelper.validateAddressForm(form))},copyBillingFormNew:function(fromName,toName){var form=document.forms[fromName];var to=document.forms[toName];var sameaddress=document.getElementById("SameShippingAndBillingAddress");if(sameaddress.checked){hideElementById("shippingAddressCreateEditFormDiv_1");to.firstName.value=form.firstName.value;to.lastName.value=form.lastName.value;to.address1.value=form.address1.value;to.address2.value=form.address2.value;to.city.value=form.city.value;if(dojo.isIE){if(document.getElementById("stateDiv1")&&document.getElementById("stateDiv2")){(document.getElementById("stateDiv2").firstChild).value=(document.getElementById("stateDiv1").firstChild).value}}else{if(form.state&&to.state){to.state.value=form.state.value}}to.zipCode.value=form.zipCode.value;to.country.value=form.country.value;to.phone1.value=form.phone1.value;if(to.email1){to.email1.value=form.email1.value}if(form.middleName){to.middleName.value=form.middleName.value}}if(!sameaddress.checked){showElementById("shippingAddressCreateEditFormDiv_1");to.firstName.value="";to.lastName.value="";to.address1.value="";to.address2.value="";to.city.value="";if(dojo.isIE){if(document.getElementById("stateDiv2")){if(globalCountry=="GB"){(document.getElementById("stateDiv2").firstChild).value="-"}else{(document.getElementById("stateDiv2").firstChild).value=""}}}else{if(to.state){if(globalCountry=="GB"){to.state.value="-"}else{to.state.value=""}}}to.zipCode.value="";to.phone1.value="";if(to.email1){to.email1.value=""}if(to.middleName){to.middleName.value=""}}},copyBillingFormNewCustom:function(fromName,toName,rName){var form=document.forms[fromName];var to=document.forms[toName];var rForm=document.forms[rName];var sameaddress=document.getElementById("SameShippingAndBillingAddressCustom");if(sameaddress.checked){hideElementById("shippingAddressCreateEditFormDiv_1");showElementById("shippingAddressCreateEditFormDiv_Custom");to.firstName.value=form.firstName.value;to.lastName.value=form.lastName.value;to.address1.value=form.address1.value;to.address2.value=form.address2.value;to.city.value=form.city.value;if(dojo.isIE){if(document.getElementById("stateDiv1")&&document.getElementById("stateDiv2")){(document.getElementById("stateDiv2").firstChild).value=(document.getElementById("stateDiv1").firstChild).value}}else{if(to.state&&form.state){to.state.value=form.state.value}}to.zipCode.value=form.zipCode.value;to.phone1.value=form.phone1.value;if(to.email1){to.email1.value=form.email1.value}if(form.middleName){to.middleName.value=form.middleName.value}}if(!sameaddress.checked){hideElementById("shippingAddressCreateEditFormDiv_Custom");showElementById("shippingAddressCreateEditFormDiv_1");to.firstName.value="";to.lastName.value="";to.address1.value="";to.address2.value="";to.city.value="";if(dojo.isIE){if(document.getElementById("stateDiv2")){if(globalCountry=="GB"){(document.getElementById("stateDiv2").firstChild).value="-"}else{(document.getElementById("stateDiv2").firstChild).value=""}}}else{if(to.state){if(globalCountry=="GB"){to.state.value="-"}else{to.state.value=""}}}to.zipCode.value="";to.phone1.value="";if(to.email1){to.email1.value=""}if(to.middleName){to.middleName.value=""}}},copyShippingFormNewCustom:function(fromName,toName){var form=document.forms[fromName];var to=document.forms[toName];var sameaddress=document.getElementById("SameShippingAndBillingAddressCustom");if(sameaddress.checked){$("#billingAddressCreateEditFormDiv_1").hide();$("#billingAddressDisplay").show();to.firstName.value=form.firstName.value;to.lastName.value=form.lastName.value;to.address1.value=form.address1.value;to.address2.value=form.address2.value;to.city.value=form.city.value;if(dojo.isIE){if(document.getElementById("stateDiv1")){if(globalCountry=="GB"){(document.getElementById("stateDiv1").firstChild).value="-"}else{(document.getElementById("stateDiv1").firstChild).value=to.state.value}}}else{if(to.state&&form.state){if(globalCountry=="GB"){to.state.value="-"}else{to.state.value=form.state.value}}}to.zipCode.value=form.zipCode.value;to.phone1.value=form.phone1.value;if(to.email1&&!constants.ajaxParams.loggedIn){to.email1.value=form.email1.value}if(form.middleName){to.middleName.value=form.middleName.value}}if(!sameaddress.checked){$("#billingAddressDisplay").hide();$("#billingAddressCreateEditFormDiv_1").show();to.firstName.value="";to.lastName.value="";to.address1.value="";to.address2.value="";to.city.value="";if(dojo.isIE){if(document.getElementById("stateDiv1")){if(globalCountry=="GB"){(document.getElementById("stateDiv1").firstChild).value="-"}else{(document.getElementById("stateDiv1").firstChild).value=" "}}}else{if(to.state){if(globalCountry=="GB"){to.state.value="-"}else{to.state.value=""}}}to.zipCode.value="";to.phone1.value="";if(to.email1&&cartVersionA){to.email1.value=""}if(to.middleName){to.middleName.value=""}}},processWCSCRMCustomerDataResponse:function(serviceResponseObject){var wcsSavedUserAddresses=AddressBookFormJS.addressObj;var crmCustomerAddressResponse=serviceResponseObject;AddressBookFormJS.crmAddress=serviceResponseObject;var hasDefaultShippingAddress=false;var defaultShippingAddress=null;for(var i=0;i<wcsSavedUserAddresses.length;i++){if(wcsSavedUserAddresses[i].addressType=="Shipping"&&wcsSavedUserAddresses[i].primary=="true"){hasDefaultShippingAddress=true;defaultShippingAddress=wcsSavedUserAddresses[i]}}var ignoreCRMAddress=$.cookie("ignoreCRMAddressCookie");if(hasDefaultShippingAddress){if((crmCustomerAddressResponse.firstName!=null&&crmCustomerAddressResponse.firstName!=undefined&&crmCustomerAddressResponse.firstName!="")&&(crmCustomerAddressResponse.lastName!=null&&crmCustomerAddressResponse.lastName!=undefined&&crmCustomerAddressResponse.lastName!="")&&(crmCustomerAddressResponse.email!=null&&crmCustomerAddressResponse.email!=undefined&&crmCustomerAddressResponse.email!="")){if((defaultShippingAddress.firstName!=crmCustomerAddressResponse.firstName||defaultShippingAddress.lastName!=crmCustomerAddressResponse.lastName||defaultShippingAddress.address1!=crmCustomerAddressResponse.address||defaultShippingAddress.city!=crmCustomerAddressResponse.city||defaultShippingAddress.state!=crmCustomerAddressResponse.state||defaultShippingAddress.country!=crmCustomerAddressResponse.country||defaultShippingAddress.zipCode!=crmCustomerAddressResponse.zipCode)||(defaultShippingAddress.phone1!=crmCustomerAddressResponse.mobile)||(defaultShippingAddress.address2!=null&&defaultShippingAddress.address2!=""&&defaultShippingAddress.address2!=crmCustomerAddressResponse.address2)){if(ignoreCRMAddress==null||ignoreCRMAddress=="false"){$("#CRMFormContainerDiv").dialog("open");AddressBookFormJS.populateCRMAddressEntryModelWithResponse(crmCustomerAddressResponse)}}}}},initializeCRMAddressEntryModel:function(modelDivId){$("#"+modelDivId).dialog({modal:true,width:400,autoOpen:false,open:function(){},close:function(){}})},populateCRMAddressEntryModelWithResponse:function(crmCustomerAddressResponse){var crmAddressEntryForm=$("#CRMFormContainerDiv #CRMAddressForm1");crmAddressEntryForm.find('input[name="firstName"]').val(crmCustomerAddressResponse.firstName);crmAddressEntryForm.find('input[name="lastName"]').val(crmCustomerAddressResponse.lastName);crmAddressEntryForm.find('input[name="address1"]').val(crmCustomerAddressResponse.address);crmAddressEntryForm.find('input[name="city"]').val(crmCustomerAddressResponse.city);crmAddressEntryForm.find('input[name="address2"]').val(crmCustomerAddressResponse.address2);crmAddressEntryForm.find('input[name="zipCode"]').val(crmCustomerAddressResponse.zipCode);crmAddressEntryForm.find('input[name="phone1"]').val(crmCustomerAddressResponse.mobile);if(globalCountry=="GB"){crmAddressEntryForm.find('select[name="state"]').val("-")}else{crmAddressEntryForm.find('select[name="state"]').val(crmCustomerAddressResponse.state)}},setCrmIgnoreCookie:function(){$.cookie("ignoreCRMAddressCookie","true",{path:"/"});$("#CRMFormContainerDiv").dialog("close")},trigger_WCSToCRMgetCustomerDataService:function(){if(($.cookie("isCRMAddressTabCliked")==null)||($.cookie("isCRMAddressTabCliked")==undefined)||($.cookie("isCRMAddressTabCliked")=="false")){$.cookie("isCRMAddressTabCliked",true,{path:"/"});$.cookie("ignoreCRMAddressCookie",false,{path:"/"});cursor_wait();var params=[];params.storeId=this.storeId;params.catalogId=this.catalogId;params.langId=this.langId;wc.service.invoke("WCS_To_CRM_getCustomerDataService",params)}}};