/////////////////////////////////////////////////////////////////// boscovs.js  begin ///////////////////////////////////////////////////////////////////
	function submitCatalogForm(form,viewAllId,isViewAll)
	{
		$(viewAllId).val(isViewAll);
		$(form).submit();
	}

	var isNN = (navigator.appName.indexOf("Netscape")!=-1);
	
	function openAboutCoupons()
	{
		window.open('AboutCoupons.bos','newwindow','menubar=no,width=400, height=600, resizable=yes,scrollbars=no');
	}
	
	function checkCountry()
    {
	   	var country = document.getElementById("country");
		delivery = (country.value == 'USA'); 
    	if(!delivery)	
    		alert("We currently do not ship to locations outside the continental United States, including Alaska and Hawaii.");
    } 
        
  	function checkState()
	{
    		var state   = document.getElementById('state');
   			delivery = !(state.value == 'AK' || state.value == 'HI');
    		if(delivery == false)
    		{
    			alert("We currently do not ship to locations outside the continental United States, including Alaska and Hawaii.");
     		}
	} 
	
	function openRebate(rebateId)
	{
		window.open('Rebate.bos?rebateId='+rebateId,'newwindow','menubar=no,height=400,width=300,resizable=yes,scrollbars=no');
	}
	
	function openGiftWrap()
	{
		window.open('GiftWrapping.bos','newwindow','menubar=no,height=500,width=500,resizable=yes,scrollbars=yes');
	}
	
	function openSecurePaymentAuth()
	{
		window.open('SecurePaymentAuthorization.bos','pauth','menubar=no,height=400,width=390,resizable=no,scrollbars=no');
	}
	
	function openDelivery()
	{
		window.open('ShippingAssistant.bos','newwindow','menubar=no,height=500,width=500,resizable=yes,scrollbars=yes');
	}
	
	function openReturn()
	{
		window.open('ReturnPolicy.bos','newwindow','menubar=no,height=700,width=800,resizable=yes,scrollbars=yes');
	}
	
	function openPrivacyPolicy()
	{
		window.open('PrivacyPolicy.bos','newwindow','menubar=no,height=700,width=800,resizable=yes,scrollbars=yes');
	}
	
	function openBoscovsTerms()
	{
		window.open('BoscovsTermsAndConditions.bos','newwindow','menubar=no,height=700,width=800,resizable=yes,scrollbars=yes');
	}
	
	function openGuarantee()
	{
		window.open('Guarantee.bos','newwindow','menubar=no,height=500,width=500,resizable=yes,scrollbars=yes');
	}
	
	function openCustomerService()
	{
		javascript:window.open('FAQ.bos','newwindow','menubar=no,height=800,width=800,resizable=yes,scrollbars=yes');
	}
	
	function openShoppingAssistant(){
		window.open('/shop/ShoppingAssistant.bos','newwindow','menubar=no,height=500,width=500,resizable=yes,scrollbars=yes');
	}
	
	function openCVV2(){
		window.open('CVV2.bos','newwindow','menubar=no,width=350,height=400,resizable=yes,scrollbars=no');
	}
	
	function openWhatsAPin()
	{
		window.open('WhatsAPin.bos','newwindow','menubar=no,height=690,width=400,resizable=yes,scrollbars=no');
	}
	
	function openAlternate(imageName, productName)
	{
		window.open('AltImage.bos?altImageName='+imageName+'&productName='+productName,'newwindow','menubar=no,height=460,width=420,resizable=yes,scrollbars=no');
	}
	
	function changeProductButtonValue(bv)
	{
		$("#productSubmitButton").val(bv);
		return true;
	}
		
	function popup(url, width, height) 
	{
		if (!width)
			var width = 500;
		if (!height)
			var height = 450;
		
    	sealWin=window.open(url,"win",'toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,width=' + width + ',height=' + height);
	    self.name = "mainWin";
    }
	
	   
    function popupCreditApplication(url) 
	{
    	creditWin=window.open(url,"win",'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width=900,height=575');
	    self.name = "mainWin";
    }
	
    function applyHSBC()
	{
		document.Form1.submit();
	}
    
    function replyHSBC()
	{
		document.reply.submit();
	}
    
    function autoTab(input,len, e) 
	{
		var keyCode = (isNN) ? e.which : e.keyCode; 
		var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
		if(input.value.length >= len && !containsElement(filter,keyCode)) 
		{
			input.value = input.value.slice(0, len);
			input.form[(getIndex(input)+1) % input.form.length].focus();
		}
	
		function containsElement(arr, ele) 
		{
			var found = false, index = 0;
			while(!found && index < arr.length)
			if(arr[index] == ele)
			{
				found = true;
			}
			else
			{
				index++;
			}
			return found;
		}
		
		function getIndex(input) 
		{
			var index = -1, i = 0, found = false;
			while (i < input.form.length && index == -1)
			if (input.form[i] == input)
			{
				index = i;
			}
			else 
			{
				i++;
			}
			return index;
		}
		return true;
	}
	
	function handleCardTypeChange()
	{
		var sel = document.getElementById("creditCard.paymentPlanOption");
		
		if(sel.options[sel.selectedIndex].value.indexOf("Boscov") == 0)
		{
			document.getElementById("creditCard.verificationCode").disabled = true;
			document.getElementById("creditCard.month").disabled = true;
			document.getElementById("creditCard.year").disabled = true;
		}
		else
		{
			document.getElementById("creditCard.verificationCode").disabled = false;
			document.getElementById("creditCard.month").disabled = false;
			document.getElementById("creditCard.year").disabled = false;
		}		
	}
	
	function submitMarcoleRegistry()
	{
		document.forms['marcolenavform'].submit();
	}	
	
	function changeFormActionAndSubmit(formName, formAction)
	{
		var formObj = document.getElementById(formName);
		formObj.action = formAction;
		formObj.submit();
	}
	
	function popUp(url) 
	{
		popupWin=window.open(url,"win",'toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,width=570,height=450');
		self.name = "mainWin"; 
	}
	
	function writeExternalLinkageForm(serverUrl,sessionid, styleid, regid, rtnUrl)
	{
       gol = new GenericOnlineLinker();
       gol.setServerURL(serverUrl);
       gol.setNavKey( 'guest.registryDetail' );
       gol.setTransaction( 'RegistryDetail' );
       gol.setLastTransaction( 'InitializeRetailer' );
       gol.setViewId( 'jsp' );
       gol.setSessionId(sessionid);
       gol.setStyleId( styleid );
       gol.setRegistryId( regid );
       gol.setRetailerId( '0' );
       gol.setApplId( 'gol' );
       gol.setStoreId( '80001' );
       gol.setRtnUrl( rtnUrl );
       gol.writeForm();
	}
	
	function backToRegistry()
	{

		var regNum = gol.regId;
		var retUrl = gol.rtnUrl;
		var sessionId = gol.eml.sessionId;
		var url='';
		
		/* -1 = Guest, 0 = Owner (Select Products), Greater than 0 = Owner (Update Products) */  
		url = substitute(retUrl, [regNum,sessionId]);
		window.location = url;
		
	}
	
	function substitute(str, arr) 
	{ 
	  var i, pattern, re, n = arr.length; 
	  for (i = 0; i < n; i++) { 
	    pattern = "\\{" + i + "\\}"; 
	    re = new RegExp(pattern, "g"); 
	    str = str.replace(re, arr[i]); 
	  } 
	  return str; 
	} 
	
	
	function showAdobe(imageFile)
	{
		window.open(imageFile, "_blank", "width=900,height=600,resizeable=yes,scrollbars=yes");
		return false;
	}
	
	function validateEmail(form_id, email) 
	{
		var input  =document.forms[form_id].elements[email];
		
		if(input != null)
		{
			var address = jQuery.trim(input.value);
			var options = { url : "/shop/email-validation.js?emailAddress="+address, async : false};
			var response = $.ajax(options);
			var data = jQuery.parseJSON(response.responseText);
			if(data.isEmailValid == "false") 
			{
				alert('Invalid Email Address');
				return false;
			}
			
			document.forms[form_id].elements[email].value = address;
		}
		return true;
	}
	
	function toggleContactUsFields()
	{
		
		var subject = document.getElementById("subject").value;
		
		document.getElementById("documentNumberRow").style.display = 'none';
		document.getElementById("storeLocationRow").style.display = 'none';
		document.getElementById("orderNumberRow").style.display = 'none';
		
		document.getElementById("storeLocation").disabled=true;
		document.getElementById("documentNumber").disabled=true;
		
		//ReportPostDeliveryIssue
		if(subject == "5")
		{
			document.getElementById("documentNumberRow").style.display = '';
			document.getElementById("orderNumber").value = '';
			document.getElementById("storeLocation").value = '';
			
			document.getElementById("storeLocation").disabled=true;
			document.getElementById("documentNumber").disabled=false;
		}
		//CommentsOnRecentStoreVisit
		else if (subject == "8")
		{
			document.getElementById("storeLocationRow").style.display = '';
			document.getElementById("documentNumber").value = '';
			document.getElementById("orderNumber").value = '';
			
			document.getElementById("storeLocation").disabled=false;
			document.getElementById("documentNumber").disabled=true;
		}
		//OnlineAndPhoneOrders
		else if(subject == "1")
		{
			document.getElementById("orderNumberRow").style.display = '';
			document.getElementById("documentNumber").value = '';
			document.getElementById("storeLocation").value = '';
			
			document.getElementById("storeLocation").disabled=true;
			document.getElementById("documentNumber").disabled=true;
		}
		else
		{
			document.getElementById("documentNumber").value = '';
			document.getElementById("orderNumber").value = '';
			document.getElementById("storeLocation").value = '';
			
			document.getElementById("storeLocation").disabled=true;
			document.getElementById("documentNumber").disabled=true;
		}
	}

	var searchJson;

	function popupEgiftCardPreview() 
	{
		var values = $(egiftCardFormDivId).serialize();
		
		$.post(egiftCardPreviewUri, values, 
			    function (data) {
			        var win=window.open('about:blank', '','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=700,height=800');
			        with(win.document)
			        {
			            write(data);
			            focus();
			            close();
			        }
			    });
	
	}

	function verifySearchType()
	{
		var searchText = $('#searchText').val();
		if (searchText === 'search by brand/internet#' || searchText === '')
			return false;
		var encodedST = encodeURIComponent(searchText);
				
		var options = { url : "/shop/search-type.js?searchText=" + encodedST, async : false};
		var response = $.ajax(options);
		var data = jQuery.parseJSON(response.responseText);
		if(data.isRedirect == "true")
		{
			var myWindow=window.open(data.url,'','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=800,height=600');
			if (myWindow != null)
				myWindow.focus();
			return false;
		}	
		return true;
	}
	
	function stripNonAsciiChars(inputString){
		var expr = new RegExp("[^\u0000-\u007F]", "g");
		return inputString.replace(expr, "");
	}
	
	
	/*
	 * Function to determine if customer is on handheld device.
	 * Function requires modernizr*.js.
	 */
	function isHandheldDevice()
	{
		var isHandheldDevice = false;

		if (Modernizr.touch)
		{
			isHandheldDevice = true;
		}
		else
		{
			var deviceAgent = navigator.userAgent.toLowerCase();
			var mobileAgents = ['android', 'bada', 'blackberry', 'iemobile', 'ipad', 'iphone', 'ipod', 'opera mini', 'webos', 'windows phone', 'zunewp7'];
			 
			for (var i=0; i < mobileAgents.length; i++)
			{				
				var regEx = new RegExp(mobileAgents[i], "i");					
				var agentTest = deviceAgent.match(regEx);
								
				if(agentTest != null && agentTest.length > 0)
				{
					isHandheldDevice = true;
				}
			}
		}
		return isHandheldDevice;
	}

	/*
	 * Returns the version of Internet Explorer or a -1
	 * (indicating the use of another browser).
	 */
	function getInternetExplorerVersion()
	{
	  var rv = -1; // Return value assumes failure.
	  if (navigator.appName == 'Microsoft Internet Explorer')
	  {
	    var ua = navigator.userAgent;
	    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	    if (re.exec(ua) != null)
	      rv = parseFloat( RegExp.$1 );
	  }
	  return rv;
	}	
/////////////////////////////////////////////////////////////////// admin.js begin ///////////////////////////////////////////////////////////////////
	// the date format prototype
	Date.prototype.format = function(f)
	{
	    if (!this.valueOf())
	        return '&nbsp;';

	    var d = this;

	    return f.replace(/(yyyy|mm|dd|hh|nn|ss|a)/gi,
	        function($1)
	        {
	            switch ($1.toLowerCase())
	            {
	            case 'yyyy': return d.getFullYear();
	            case 'mm':   return prefixDateDigit((d.getMonth() + 1));
	            case 'dd':   return prefixDateDigit(d.getDate());
	            case 'hh':   var hh = ((h = d.getHours() % 12) ? h : 12);
	            			 return prefixDateDigit(hh);
	            case 'nn':   return prefixDateDigit(d.getMinutes());
	            case 'ss':   return prefixDateDigit(d.getSeconds());
	            case 'a':  var ap = d.getHours() < 12 ? 'AM' : 'PM';
				             return ap;
	            }
	        }
	    );
	}

	function prefixDateDigit(input)
	{
		var inStr =""+input;
//		alert('inStr.length='+inStr.length);
		if(inStr.length != 2)
		{
			inStr ="0"+inStr;
		}
		return inStr;
	}

	function generateEndDate(inputbox)
	{
		var myDate=new Date();
		myDate.setFullYear(2050,01,01);
		inputbox.value=(myDate).format('mm/dd/yyyy hh:nn a');
	}

	function generateStartDate(inputbox)
	{
		inputbox.value=(new Date()).format('mm/dd/yyyy hh:nn a');
	}

	function closeOrderDetailsWindow(url)
		{
				window.opener.location.href = url;
				window.close();
		}	
		
	function openStoreHistory(url,windowName)
	{
		var test = windowOpener(url, windowName, 'status=yes,height=200,width=550,resizable=no,scrollbars=no');
		return;
	}

	function openOrderComment(url,windowName)
	{
		var test = windowOpener(url, windowName, 'status=yes,height=400,width=800,resizable=no,scrollbars=no');
		return;
	}

	function openGiftCard(url,windowName)
	{
		var test = windowOpener(url, windowName, 'status=yes,height=200,width=550,resizable=no,scrollbars=no');
		return;
	}

	function openOrderDetails(url,windowName)
	{
		var test = windowOpener(url, windowName, 'status=yes,height=600,width=800,resizable=yes,scrollbars=yes');
		return;
	}

	function openCustomerDetails(url,windowName)
	{
	 	var test = windowOpener(url, windowName, 'status=yes,height=600,width=800,resizable=yes,scrollbars=yes');

	 	return;

	}
	function openRegisterCustomer(url,windowName)
	{
		var test = windowOpener(url, windowName, 'menubar=no,height=600,width=800,resizable=no,scrollbars=yes');
		return;
	}

	function openCancel(url,windowName)
	{
		var test = windowOpener(url, windowName, 'status=yes,height=200,width=550,resizable=no,scrollbars=no');
		return;
	}

	function windowOpener(url,windowName,settings)
	{
		window.open(url, windowName, settings);
	}

	function submitPaginationForm(url)
	{
		window.location=url;
	}

	function submitForm(myForm)
	{
		myForm.submit();
	}

	function addUniqueOption(list,label,value,message)
	{
		if (!selectBoxContains(list,label))
			addOption(list,label, value,true);
		else
			alert(message);
	}

	function checkAllCheckBoxes(checkBoxes)
	{
		if (checkBoxes != null)
		{
			checkBoxes.checked=true;
			for(var i=0;i<checkBoxes.CHECK_BOX.length;i++)
			checkBoxes.CHECK_BOX[i].checked = true;
		}
	}

	function checkAllCheck(field)
	{
	 if (field != null)
	 {
	 	field.checked=true;
		for (i = 0; i < field.length; i++)
			field[i].checked = true ;
	 }
	}

	function selectDept(deptCheckBox)
	{
		deptCheckBox.checked = true;
	}

	function toggleOverrideSelects(cb)
	{
		var excludeSome = document.getElementById("excludesome");
		var excludeAll = document.getElementById("excludeAllClasses");
		var includeSome = document.getElementById("includesome");
		//var excludeAll = document.getElementById("excludeall");

		var dis = !cb.checked;
		if(cb == excludeSome)
		{
			excludeAll.checked = false;
			excludeAll.disabled = dis;
			document.getElementById("excludedClasses").disabled = dis;
			cb.form.overriddenClasses.disabled = dis;
			document.getElementById("overrideRightButton").disabled = dis;
			document.getElementById("overrideLeftButton").disabled = dis;
		}
		else if (cb == excludeAll)
		{
			document.getElementById("excludedClasses").disabled = cb.checked;
			cb.form.overriddenClasses.disabled = cb.checked;
			document.getElementById("overrideRightButton").disabled = cb.checked;
			document.getElementById("overrideLeftButton").disabled = cb.checked;
		}
		else if(cb == includeSome)
		{
			document.getElementById("includedClasses").disabled = dis;
			cb.form.lockedOutClasses.disabled = dis;
			document.getElementById("overrideRightLockoutButton").disabled = dis;
			document.getElementById("overrideLeftLockoutButton").disabled = dis;
		}
	}


	function setDateTime(month,day,year,hour,minute,second,formInput)
	{

		var month = month;

		var day = day;

		var year = year;

		var hour = hour;

		var minute = minute;

		var second = second;


		if (month == null) {
			//alert("Month cannot be null!");
			formInput.value=null;
			return ;
		}

		if (day == null) {
			//alert("Day cannot be null!");
			formInput.value=null;
			return ;
		}

		if (year == null) {
			//alert("year cannot be null!");
			formInput.value=null;
			return ;
		}

		if (hour == null)
			hour = "00";
		if (minute == null)
			minute = "00";
		if (second == null)
			second = "00";

		formInput.value=month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second;

	}

	function closePopupAndReloadParentWindow()
	{
		if (window.opener && !window.opener.closed)
		{
			window.opener.location.reload();
		}
		window.close(self);
		return;
	}

	function closePopupWCS()
	{
		if(document.numberSearchForm.selectedDeptno.options.length > 0)
		{
//			if(window.opener && !window.opener.closed())
//			{
				var numberOptions = document.numberSearchForm.selectedDeptno.options;
				for(var i=0; i<numberOptions.length; i++)
				{
					if(numberOptions[i].selected)
					{
						window.opener.document.departmentForm.identifier.value=numberOptions[i].text;
						break;
					}
				}
//			}
		}
		window.close();
	}


	function closePopup()
	{
		if(document.department.selectedDeptno.options.length > 0)
		{
//			if(window.opener && !window.opener.closed())
//			{
				var numberOptions = document.department.selectedDeptno.options;
				for(var i=0; i<numberOptions.length; i++)
				{
					if(numberOptions[i].selected)
					{
						window.opener.document.department.identifier.value=numberOptions[i].text;
						break;
					}
				}
//			}
		}
		window.close();

		//document.form1.select2.options[document.form1.select1.selectedIndex].value);
	}

	function numCreation(lower, selectbox)
	{
		for (i = 0; i < lower + 200; i++)
			//document.write(document.forms[selectbox[i]]);
			//document.getElementsByName(selectbox.write[i]);
			//document.write(selectbox[i]);
			//document.write(numCreation(lower, selectbox));
			document.write('selectbox[i]');
	}

	function removeSelectedItems()
	{
		var itemList = window.document.getElementById("skus");
		var startLen = itemList.length;

		for (j=startLen; j>0; j--)
		{
			if (itemList.options[j-1].selected)
			{
				itemList.removeChild(itemList.options[j-1]);
			}
		}
	}

	function loadSelectedItemAttributes(totalAttributeCount)
	{
		try
		{
			var itemList = window.document.getElementById("skus");
			var selectedIndex = itemList.selectedIndex;

			if(selectedIndex ==  -1)
				return false;

			var itemListOption = itemList.options[selectedIndex].value;
	// alert("itemListOption="+itemListOption);
			var st = itemListOption.split('|');
	// alert("st="+st);
			var maxAttributes=totalAttributeCount;

			var index = 0;
			var prevIndex = 0;
			var checkIndex = 0;

	//alert("maxAttributes="+maxAttributes);
	//alert("selectedIndex="+selectedIndex);
	//alert("totalAttributeCount="+totalAttributeCount);
			while(index > -1)
			{
	//alert("index="+index);
	//alert("prevIndex="+prevIndex);
	//alert("checkIndex="+checkIndex);
				prevIndex = checkIndex;
				index = itemListOption.indexOf(",", checkIndex);
				checkIndex = itemListOption.indexOf(",", checkIndex);

				if(checkIndex == -1)
				{
					checkIndex = itemListOption.length;
				}

				var temp = itemListOption.substring(prevIndex, checkIndex);
	//alert("temp="+temp);
				var tempName = temp.substring(0, temp.indexOf("|", 0));
	//alert("tempName="+tempName);
				var tempValue = temp.substring((temp.indexOf("|", 0) + 1), temp.length);
	//alert("tempValue="+tempValue);

				if(tempName == "sku")
				{
					window.document.getElementById("skuInput").value = tempValue;
				}
				else if(tempName == "upc")
				{
					window.document.getElementById("upcInput").value = tempValue;
				}
				else
				{
					for(var i=0; i<maxAttributes; i++)
					{
						var attrName = window.document.getElementById("an" + i);
						var attributeValues = window.document.getElementById("attributeNameValues" + i);
	//alert("attrName.value="+attrName.value);
	//alert("attrName="+attrName);
						if((tempName != null) && (tempName != "") && attrName.value == tempName)
						{
							for(var j=0; j<attributeValues.length; j++)
							{
	//alert("attributeValues.options["+j+"].value="+attributeValues.options[j].value);
								if(attributeValues.options[j].value == tempValue)
								{
									attributeValues.selectedIndex = j;
								}
							}
						}
					}
				}
				checkIndex++;
			}

			itemList.removeChild(itemList.options[selectedIndex]);
		}
		catch(e)
		{
			alert("SKU JAVASCRIPT ERROR: "+e.toString());
			return false;
		}
	}

	function selectBoxContains(obj,string) {
		if (!hasOptions(obj)) {
			return false;
		}
		for (i=0; i<obj.options.length; i++) {
			if (obj.options[i].text.toUpperCase()==string.toUpperCase()) {
				return true;
			}
		}
		return false;
	}

	function addItem(maxAttributes)
	{
		if (inputIsValid())
		{
			var newClass = window.document.getElementById("fieldClassification").value.trim();
			var newSku = window.document.getElementById("skuInput").value.trim();
			var newUpc = window.document.getElementById("upcInput").value.trim();

			if (newUpc != null)
			{
				newUpc = newUpc.toUpperCase();
			}

			var itemList = window.document.getElementById("skus");
			var itemDescription = newClass+" - "+newSku+" - "+newUpc+" - (";
			var itemValue = "sku|"+newSku+",upc|"+newUpc+",";
			for(var j=0; j<maxAttributes; j++)
			{
				var currAttributeName = window.document.getElementById("an" + j);
				var currAttributeValues = window.document.getElementById("attributeNameValues" + j);

				if (currAttributeValues.options.length != 0 && currAttributeValues.selectedIndex!=-1)
				{
					itemDescription += currAttributeValues.options[currAttributeValues.selectedIndex].value;
					itemValue += currAttributeName.value + "|" + currAttributeValues.options[currAttributeValues.selectedIndex].value;
				}

				if (j < maxAttributes-1)
				{
					itemDescription += ",";
					itemValue += ",";
				}
			}
			itemDescription += ")";
			addUniqueOption(itemList,itemDescription,itemValue,"Can't add the same SKU twice");
		}
	}

	function addAttribute(itemList,itemDescription, itemValue,selected){
		if (!selectBoxContains(itemList,itemDescription))
			addOption(itemList,itemDescription, itemValue.trim(),selected);
		else
			alert("Can't add the same Attribute Value twice");
	}

	function inputIsValid()
	{

		var newClass = window.document.getElementById("fieldClassification").value;
		var newSku = window.document.getElementById("skuInput").value;
		var newUpc = window.document.getElementById("upcInput").value;

		if(isNaN(newClass) || isNaN(newSku) || newClass=="" || newSku=="")
		{
			alert("Class and SKU must be valid numeric values.");
			return false;
		}
		else if (!classIsValid())
		{
			alert("Class must be exactly 4 digits");
			return false;
		}
		else if (!skuIsValid())
		{
			alert("SKU is invalid");
			return false;
		}
		else if (!upcIsValid())
		{
			alert("UPC is invalid");
			return false;
		}
		else
		{
			return true;
		}
	}

	function classIsValid()
	{
		var newClass = window.document.getElementById("fieldClassification").value;
		classVal = new String(newClass);

		if (classVal.length != 4)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	function skuIsValid()
	{
		var newSku = window.document.getElementById("skuInput").value;
		skuVal = new String(newSku);
		if (skuVal.length != 7)
		{
			return false;
		}

		tempStr = reverseStr(skuVal);

		sum = 0;
		for(i=1 ; i<= tempStr.length ;i++)
		{
			s = new String(tempStr.charAt(i-1));
			sum = sum + (s * i);
	   	};

	   	remainder = 0;
	   	remainder = (sum % 11);

	   	if(remainder == 0)
	   	{

	   		return true;
	   	}
	   	else
	   	{
	       	return false;
	   	}
	   	return true;
	}

	function upcIsValid()
	{
		var newUpc = window.document.getElementById("upcInput").value;
		var newClass = window.document.getElementById("fieldClassification").value;
		var newSku = window.document.getElementById("skuInput").value;

		upcVal = new String(newUpc);
		classVal = new String(newClass);
		skuVal = new String(newSku);
		upcVal = upcVal.toLowerCase();

		if(upcVal.indexOf("cs") > -1)
		{
			if(upcVal == (classVal + "cs" + skuVal))
			{
				return true;
			}
		}

		if (upcVal.length < 11 || upcVal.length > 15 || newUpc=="")
		{
			return false;
		}

		tempStr = reverseStr(upcVal);
		sum = 0;
		count1 = 0;

		for(i=0 ; i< tempStr.length ;i++)
		{
			s = new String(tempStr.charAt(i));
			if(count1 == 0)
			{
				sum = sum + (s * 1);
				count1=1;
			}
			else
			{
				sum = sum + (s * 3);
				count1=0;
			}
	   	};

	   	remainder = 0;
	   	remainder = (sum % 10);

	   	if(remainder == 0)
	   	{
	   		return true;
	   	}
	   	else
	   	{
			//alert("upc remainder="+remainder);
	       	return false;
	    }

		return true;
	}


	function reverseStr(inString)
	{
		tempVar = '';
		for (i=inString.length-1;i>-1;i--)
		{
			tempVar+=inString.charAt(i);
		};
		return tempVar;
	}

	function confirmShippingMethodDeletion(formInput)
	{
		var agree = confirm("Are you sure you would like to delete shipping method?");
		if(agree)
		{
			formInput.value=true;
		}
		return agree;
	}

	function markAllFormsReadOnly()
	{
		for(var i=0;i<document.forms.length;++i)
		{
			markFormReadOnly(document.forms[i]);
		}
	}

	function markFormReadOnly(theForm)
	{
		var formelements=theForm.elements;
		theForm.onsubmit=function() {return false;}
		for(var i=0;i<formelements.length;++i)
		{
			var formelement = formelements[i];
			formelement.onfocus=function() {this.blur();}
			if(formelement.type=="text"||formelement.type=="textarea"||formelement.type=="password")
			{
				formelement.readOnly = true;
			}
			else
			{
				formelement.disabled = true;
			}
		}
	}

	function updatePicture(disp,img,name,imageDir)
	{
		//disp = The label id
		//img = The img src id
		//name = The file id
		var d = document.getElementById(disp);

		var i = document.getElementById(img);

		var n = document.getElementById(name);

		setImageSrc(i, n.value, imageDir);

		var imageDispName = d.firstChild;

		var matcharray = n.value.match(/([^\\\/]*)$/);

		var shortName = matcharray[0];

		imageDispName.nodeValue = "("+shortName+")";

		return shortName;
	}

	function setImageSrc(image, imageSrc, dir)
	{
		if(imageSrc.match(/^[\/\\]/) != null)
		{
			image.src =  dir + imageSrc.replace("\\", "/");
		}
		else
		{
			image.src =  dir + imageSrc.replace("\\", "/");
		}
	}

	function prepopulateImgFields(){

		var vcs = document.getElementById("vendorNumber").value.trim().toLowerCase()
					 + document.getElementById("classification").value.trim().toLowerCase()
					 + document.getElementById("style").value.trim().toLowerCase();

		var expr = new RegExp("[^a-zA-Z0-9]", "g");

		var largeImage = vcs.replace(expr, "") + ".jpg";
		var smallImage = vcs.replace(expr, "") + "t.jpg";

		var prodId = document.getElementById("prodId").value;

		if (prodId.length == 0){
			document.getElementById("largeImagename").value = largeImage;
			document.getElementById("smallImagename").value = smallImage;
		}
	}

	function selectAllOptionsAllSelectBoxes(selectBoxes)
	{
		if (selectBoxes != null)
		{
			for(var j=0;j<selectBoxes.length;j++){
				selectAllOptions(selectBoxes[j]);
			}
		}
	}

	function updateSelectBoxOptionValueName(obj,index, name)
	{
		for (var i=0; i<obj.options.length; i++) {
			var selectedValue= name.value + obj.options[i].value.substring(obj.options[i].value.indexOf("|")) ;
			obj.options[i] = new Option( obj.options[i].text, selectedValue , obj.options[i].defaultSelected, obj.options[i].selected) ;
		}
	}

	function ismaxlength(obj,maxLength){
		var mlength=obj.getAttribute? maxLength : ""
		if (obj.getAttribute && obj.value.length>mlength)
			obj.value=obj.value.substring(0,mlength)
	}

	function autoTab(input,len, e) 
		{
			var isNN = (navigator.appName.indexOf("Netscape")!=-1);
			var keyCode = (isNN) ? e.which : e.keyCode; 

			var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];

			if(input.value.length >= len && !containsElement(filter,keyCode)) 
			{

				input.value = input.value.slice(0, len);
				input.form[(getIndex(input)+1) % input.form.length].focus();

			}
		
			function containsElement(arr, ele) 
			{
				var found = false, index = 0;
				while(!found && index < arr.length)
				if(arr[index] == ele)
				{
					found = true;
				}
				else
				{
					index++;
				}
				return found;
			}
			
			function getIndex(input) 
			{
				var index = -1, i = 0, found = false;
				while (i < input.form.length && index == -1)
				if (input.form[i] == input)
				{
					index = i;
				}
				else 
				{
					i++;
				}
				return index;
			}
			return true;
		}
		
	function emailGeneration(area, pre, last, inputbox)
	{	
		var a = document.getElementById(area).value;
		
		var p = document.getElementById(pre).value;
		
		var l = document.getElementById(last).value;
		
		var i = document.getElementById(inputbox);
		
		var phoneNumber =(a + p + l + '@b.com');
		
		i.value = phoneNumber;

	}

	function verifyRegistryNumber()
	{

		var giftRegistryNumber = $.trim($('#registryid').val());
		var sum = 0;
		var count1 = 0;
		var i = 0;
		
		if(isNaN(giftRegistryNumber) || giftRegistryNumber=="")
			{
			alert("Gift Registry Number must be numeric.");
			return false;
			}

		if (giftRegistryNumber.substring(0, 4) == "4800" && giftRegistryNumber.length == 12) 
		{
		
			var tempStr = reverseStr(giftRegistryNumber);
			
			for(i=0 ; i< tempStr.length ;i++)
			{
				s = new String(tempStr.charAt(i));
				if(count1 == 0)
				{
					sum = sum + (s * 1);
					count1 = 1;
				}
				else
				{
					sum = sum + (s * 3);
					count1 = 0;
				}
		   	};
		
		   	remainder = 0;
		   	remainder = (sum % 10);
		
		   	if(remainder == 0)
		   	{
		   		return true;
		   	}
		   	else
		   	{
		   		alert("Gift Registry Number is invalid.");
		   		return false;
		    }
	   	
		}
		else
			{
			alert("Gift Registry Numbers begin with '4800' and must be 12 digits in length");
			return false;
			}
	   	
		return true;
	}	
/////////////////////////////////////////////////////////////////// boscovs-ajax.js begin //////////////////////////////////////////////////////////////////	
	function applyTrackingTags(jsonData)
	{
		if (jsonData !== undefined && jsonData.latestEvent !== undefined)  
		{
			if(s){
				var items =  getItems(jsonData);
				
				s.pageName = jsonData.latestEvent.pageName;
				s.events =  jsonData.latestEvent.event;
				s.prop13 = jsonData.latestEvent.type;
				
				if (items != null){
					s.products = items;
				}
				s.t();
			}
		}
	}

	function getItems(jsonData)
	{
		if (jsonData.latestEvent !== undefined && jsonData.latestEvent.itemNumbers !== undefined){


		var itemSize = jsonData.latestEvent.itemNumbers.length;
		var items = "";
		
		for ( var x = 0; x < itemSize; x++) 
		{
			items = items + jsonData.latestEvent.itemNumbers[x];
			if (x != itemSize - 1 ){
				items = items +  ",";
			}
		}

		return items;
		
		}else{
			return null;
		}
	}

	function getDepartmentNavigation(jsonData)
	{
		//this is a hook to add more data 
		return jsonData;
	}


	function displayViewMoreProducts(jsonData) {
		if (jsonData !== undefined && jsonData.hasData == 'true') 
		{
			if(jsonData.currentItemNumberIndex !== undefined)
			{
				var vmpDiv = $('#view-more-products');
				var v = $('<span>&nbsp;|&nbsp;</span>');
				var v1 = $('<span>&nbsp;|&nbsp;</span>');
		
				if (jsonData.previousItemNumber !== undefined) {
					var prevLink = $('<a />');
					var prevLinkUrl = '/shop/StoreDirectory.bos';
					if (jsonData.previousItemType == 'Product')
					{
						prevLinkUrl = '/shop/prod/'+jsonData.previousItemName+'/'+ jsonData.previousItemNumber + '.htm';	
					}
					else
					{
						prevLinkUrl = '/shop/bundle/'+jsonData.previousItemName+'/'+ jsonData.previousItemNumber + '.htm';					
					}				
					prevLink.attr('href', prevLinkUrl);
					prevLink.append("Previous");
					vmpDiv.append(prevLink);
					vmpDiv.append(v);
				}
		
				var label = $('<span/>');
				label.text(jsonData.currentItemNumberIndex + ' of ' + jsonData.totalItemNumberCount);
				vmpDiv.append(label);
		
				if (jsonData.nextItemNumber !== undefined) 
				{
					vmpDiv.append(v1);
					var nextLink = $('<a />');
					var nextLinkUrl = '/shop/StoreDirectory.bos';
					if (jsonData.nextItemType == 'Product')
					{
						nextLinkUrl = '/shop/prod/'+jsonData.nextItemName+'/'+ jsonData.nextItemNumber + '.htm';	
					}
					else
					{
						nextLinkUrl = '/shop/bundle/'+jsonData.nextItemName+'/'+ jsonData.nextItemNumber + '.htm';					
					}				
					nextLink.attr('href', nextLinkUrl);
					nextLink.append("Next");
					vmpDiv.append(nextLink);
				}
			}
		}
	}

	function displayClickHistory(jsonData)
	{
		if(jsonData !== undefined && jsonData.clickHistory.length > 0) 
		{
			printBreadCrumb('#breadcrumb-top',jsonData);
			printBreadCrumb('#breadcrumb-bottom',jsonData);
		}
	}

	function printBreadCrumb(divId, jsonData) 
	{
		var breadCrumbDiv = $(divId);
		
		/* If div isn't in page don't try to display breadcrumbs. */
		if (breadCrumbDiv !== null && breadCrumbDiv !== undefined)
		{
			var backIcon = $('<img />');
			backIcon.attr('src', '//wwws.boscovs.com/wcsstore/boscovs/images/store/icon_back.gif');

			var historySize = jsonData.clickHistory.length - 1;
			
			// Promotion products will show bread crumb to get back to promotions assortment.
			if (historySize == 0)
			{
				var topBreadCrumbLabel = jsonData.clickHistory[0].label;

				if (topBreadCrumbLabel.indexOf("Promotional Choice") != -1)
				{			
					historySize = 1;			
				}
			}

			for ( var x = 0; x < historySize; x++) 
			{
				// show back icon
				if (x == 0) 
				{
					breadCrumbDiv.append(backIcon);
					var v = $('<span>&nbsp;&nbsp;</span>');
					breadCrumbDiv.append(v);
				}
				
				var breadCrumbLink = $('<a />');
				var breadCrumbUrl = jsonData.clickHistory[x].url;
				var breadCrumbLabel = jsonData.clickHistory[x].label;
				var breadCrumbRch = jsonData.clickHistory[x].rch;
				var breadCrumbPdn = jsonData.clickHistory[x].pdn;

				
				breadCrumbLink.attr('href', breadCrumbUrl);
				breadCrumbLink.attr("class", "bread-crumb no-underline hover-underline");
				
				if (breadCrumbRch !== undefined)
					breadCrumbLink.attr('data-bos-rch', breadCrumbRch);
				
				if (breadCrumbPdn !== undefined)
					breadCrumbLink.attr('data-bos-pdn', breadCrumbPdn);
				
				breadCrumbLink.attr('onclick', "departmentSubmit(this, event, '/shop');");
				
				breadCrumbLink.text(breadCrumbLabel);
				breadCrumbDiv.append(breadCrumbLink);
				if (x != historySize - 1) 
				{
					breadCrumbDiv.append($('<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>'));
				}
			}	
		}
	}

	function showHeaderFooterData(data)
	{
		var newData = getDepartmentNavigation(data);
		addDynamicStyle(homeServer+"/store/content/css/menu.css");
		$('#header').setTemplateURL(ajaxConfig.headerTemplateUrl);
		$('#header').setParam('absUrl',absUrl);
		$('#header').processTemplate(newData);
		
		$('#footer').setParam('absUrl',absUrl);
		$('#footer').setTemplateURL(ajaxConfig.footerTemplateUrl);
		$('#footer').processTemplate(newData);
	}

	var pageVars = new Object();

	function getEmailRegEx(json) 
	{
		pageVars.emailRegEx = json.emailRegex;
	}

	function validateEmailData(email)
	{
		var reg = new RegExp(pageVars.emailRegEx);

		if (email != null) {
			if (reg.test(email) == false) {
				alert('Invalid Email Address');
				return false;
			}
		}
		return true;
	}

	function validateSearchData() 
	{
		var input = $('#searchText').val();
		var url =  homeServer+"/shop/search-type.js?searchText="+input;

		jQuery.getJSON(url+"&callback=?", function(data) 
		{
			if( data.isRedirect == "true")
			{
				var myWindow=window.open(data.url,'','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=800,height=600');
				myWindow.focus();
			}
			else
			{
				$('#searchForm').submit();
			}
		});
		return false;
	}

	/**
	 * This function will take an input string url and ensure it is an Absolute URL not Relative.
	 * @param urlStr
	 * @returns absolute url string
	 */
	function absUrl(urlStr)
	{
		var outStr = urlStr;
		if(urlStr === undefined)
		{
			return outStr;
		}
		
		if(urlStr.length == 0)
		{
			return outStr;
		}
		
		var firstChar = urlStr.charAt(0);
		//check if string starts with "/"
		if(firstChar=="/")
		{
			//if it does, append "HomeServer" to url str.
			if(homeServer === undefined)
				outStr=urlStr;
			
			outStr=homeServer+urlStr;
		}
		else
		{
			//otherwise return original input
			outStr=urlStr;
		}
		
		return outStr;
	}

	function stripCallback(str,callbackName,callbackTerminator)
	{
		var newStr = str;
		newStr = newStr.replace(callbackName,"");
		return newStr.replace(callbackTerminator,"");
	}

	function addDynamicScript(url)
	{
		// create a new script element
		var script = document.createElement('script');
		// set the src attribute to that url
		script.setAttribute('src',  url);
		script.setAttribute("type","text/javascript");
		// insert the script in out page
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	function addDynamicStyle(url)
	{
		// create a new link element
		var style = document.createElement('link');
		// set the href attribute to that url
		style.setAttribute('href',  url);
		style.setAttribute("rel","stylesheet");
		style.setAttribute("type","text/css");
		style.setAttribute("media","screen, projection");
		// insert the link in out page
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	/* Remove parameters from links */
	function linkParamsSubmit(link, event, storeContextPath)
	{
		event.preventDefault();
		
		var params = $(link).attr("data-bos-params");

		var url = storeContextPath + "/post-user-url-meta.ajax";
		
		if(params !== undefined)
		{
			url = url + "?" + params;
			
			var options =
			{
				type : "POST",
				url : url,
				complete: function(event) { window.location = $(link).attr("href"); }
			};
			
			//execute ajax call
			$.ajax(options);		
		}
	}

	/* HEADER CART SCRIPTS BEGIN */

	function showHeaderShoppingBag(jsonData)
	{
		$('#cart_flyout').setTemplateURL(ajaxConfig.headerShoppingBagTemplateUrl);
		$('#cart_flyout').setParam('absUrl',absUrl);
		$('#cart_flyout').processTemplate(jsonData);
		
		if (jsonData.hasData !== undefined && jsonData.hasData == "true")
		{
			if (jsonData.shoppingBagSize > 0)
			{
				$("#cart_info").text("Items: " + jsonData.shoppingBagSize + " total: $" + Number(jsonData.shoppingBagTotal).toFixed(2));					
			}
		}
	}

	function updateHeaderCart(storeContextPath)
	{
		var url = storeContextPath + "/shopping-bag-preview.json";
		
		// setup object array of variables to pass to ajax 
		var options =
		{
			url : url,
			cache : false,
			success : function(jsonData) 
			{  
				if (jsonData.hasData !== undefined && jsonData.hasData == "true")
				{
					if (jsonData.shoppingBagSize > 0)
					{
						$("#cart_info").text("Items: " + jsonData.shoppingBagSize + " total: $" + Number(jsonData.shoppingBagTotal).toFixed(2));					
					}
					
					$.views.converters({
						decformat: function(decimalValue){
							  
						if(decimalValue === undefined)
							return decimalValue;
							  
						if(isNaN(decimalValue))
							return decimalValue;
							  
						return new Number(decimalValue).toFixed(2);
						}
					});
					
					var sbTemplate = $.templates("#shoppingBagHeaderTemplate"); 
					
					var htmlOutput = sbTemplate.render(jsonData);
					
					$("#cart_flyout").html(htmlOutput);
				}
			}
		};
		
		//execute ajax call
		$.ajax(options);
	}

	function openCloseHeaderCartFlyout()
	{
		var currentAttributeName = $("#cart_toggle").attr("data-bos-flyout-state");
		if (currentAttributeName == "closed") {
			$("#cart_flyout").show();
			$("#cart_info").addClass( "border-light" );
			$("#cart_toggle").attr('data-bos-flyout-state', "open");
		}
		else {
			closeHeaderCartFlyout();
		}
	}

	function closeHeaderCartFlyout()
	{
		$("#cart_flyout").hide();
		$("#cart_info").removeClass( "border-light" );
		$("#cart_toggle").attr('data-bos-flyout-state', "closed");
	}

	/* HEADER CART SCRIPTS END */