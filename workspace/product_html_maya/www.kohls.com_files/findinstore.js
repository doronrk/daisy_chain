/* findinstore.js version# 1.6 */ // for push
var storeDetails = {}; //master json, contains response json received in onsuccess callback
var storeAvail = {}; //if only store availability checkbox is checked, this will hold all stores that have availability.
storeAvail.availableStores = [];
var storePickup = {}; // if only storepickup checkbox is checked
storePickup.availableStores = [];
var storeAvailPickup = {}; //if both checkboxes are checked
storeAvailPickup.availableStores = [];
var currentStores = {}; //this will hold the stores that meet current visibility criteria based on checkboxes
currentStores.availableStores = [];
var pristineData = {}; //this will hold the stores that meet current visibility criteria based on checkboxes
pristineData.availableStores = [];
var fisCount;
var multiStoreInfo = [];
var uniqueNames = [];
var storeWithQuantity = [];
var h = {};
var isLocalCall = false; 
var storeQty;
var fisErrorEle=[];
var fisErrorMsg="";
var fis_map;
var markerLocations=[], markerWindows = [], bopusNames = [],markerA = "",markerB = "",markerC = "",infoA = "",infoB = "",infoC = "", googleError = false;

//Start : Function added to update the user's last updated storeId and Quantity
function enableAddTobag(storeIDselected,enteredQuantity, elem) {
	var quantityOnHand = $('#quantityInventory-' + storeIDselected).text();
	quantityOnHand = quantityOnHand.split("available");
	if (parseInt($.trim(quantityOnHand[0])) >= parseInt(enteredQuantity)) {
		$('#quantityInventory-'+storeIDselected).hide();
	}
	var checkStoreArray = $('#storeInfoArray').val();
	if(checkStoreArray == undefined) {
		uniqueNames.length = 0;	
		h = {};
	}
	var qty = parseInt(enteredQuantity);
	if(qty === 0 || qty.value == "") {
		$.each(uniqueNames, function(i, qtyZero){
			var splitString = qtyZero.split('=');			
			var storeID = splitString[0];
			if(storeIDselected == storeID){
					var indexOfStore = $.inArray(qtyZero, uniqueNames);
					uniqueNames.splice(indexOfStore, 1);					
			}
		});
	}
	if(qty == "") {
		$.each(uniqueNames, function(i, qtyZero){
			var splitString = qtyZero.split('=');			
			var storeID = splitString[0];
			if(storeIDselected == storeID){
					var indexOfStore = $.inArray(qtyZero, uniqueNames);
					uniqueNames.splice(indexOfStore, 1);					
			}
		});
	}
	if(enteredQuantity > 0){
		h[storeIDselected] = enteredQuantity;
		//if($(element).parent().attr('pickStatus') == true || $(element).parent().attr('clearanceStatus') == true){
		$("#button_primary").removeAttr("disabled").addClass("button_prim_green").removeClass('button_prim_greeninactive');
		//}
		$(elem).parent().find('.decbtn').show();
		$(elem).removeClass("mleft20");
	}
	else
	{
		$(elem).parent().find('.decbtn').hide();
		$(elem).addClass("mleft20");
		/*var indexOfStore = uniqueNames.indexOf(storeIDselected);
		uniqueNames.splice(indexOfStore, 1);*/
		delete h[storeIDselected];
	}
	/*if(enteredQuantity == 0){
		delete h[storeIDselected];
	}*/
	 // or just {}

	// show the values stored
	for (var k in h) {
		//$('#storeInfoArray').remove();
	    // use hasOwnProperty to filter out keys from the Object.prototype
		if (h.hasOwnProperty(k)) {
			$.each(uniqueNames, function(i, storeInfo){		
				var splitString = storeInfo.split('=');			
				var storeID = splitString[0];				
				if(storeIDselected == storeID){
					if(enteredQuantity != splitString[1]){
						var indexOfStore = $.inArray(storeInfo,uniqueNames);
						uniqueNames.splice(indexOfStore, 1);
						var newQtyWithStore = storeIDselected+"="+enteredQuantity;
						uniqueNames.push(newQtyWithStore);
					}
				}
			});
			storeQty = k+"="+h[k];
			storeWithQuantity.length = 0;
			storeWithQuantity.push(storeQty);
			$.each(storeWithQuantity, function(i, el){
				if($.inArray(el, uniqueNames) === -1) 
					//var appendStoreQty = el+"+"+enteredQuantity;
					uniqueNames.push(el);
				//storeWithQuantity.push(appendStoreQty);
				storeWithQuantity.length = 0;
			});		
		}
	}
	$('#findinstore .fis_sucessfullATB').addClass('display-none');
	var selectedStoreNum = $("#selectedStoreID").val();
	var selectedQuantity = $("#quantitySelected").val();
	if(selectedStoreNum == undefined){
		$('#quantityInventory-' + $('#selectedStoreID').val()).hide();
		$("#quantitySelected").remove();
		$("#selectedStoreID").remove();
		$('#cart-error').addClass('display-none');
		$('#button_primary').append("<input name=selectedStoreID id=selectedStoreID type=hidden value="+storeIDselected+" />");
		$('#button_primary').append("<input name=quantitySelected id=quantitySelected type=hidden value="+enteredQuantity+" />");
	}
	if(storeIDselected != selectedStoreNum && enteredQuantity != 0 && enteredQuantity != "") {
		$('#quantityInventory-' + $('#selectedStoreID').val()).hide();
		$("#quantitySelected").remove();
		$("#selectedStoreID").remove();
		$('#button_primary').append("<input name=selectedStoreID id=selectedStoreID type=hidden value="+storeIDselected+" />");
		$('#button_primary').append("<input name=quantitySelected id=quantitySelected type=hidden value="+enteredQuantity+" />");
	}
	if(storeIDselected == selectedStoreNum && enteredQuantity > 0){
		$("#quantitySelected").remove();
		$("#button_primary").removeAttr("disabled").addClass("button_prim_green").removeClass('button_prim_greeninactive');
		$('#button_primary').append("<input name=quantitySelected id=quantitySelected type=hidden value="+enteredQuantity+" />");
		$('#findinstore .fis_sucessfullATB').addClass('display-none');
	}
	if(storeIDselected == selectedStoreNum && enteredQuantity == 0){
		$("#quantitySelected").remove();
		$("#selectedStoreID").remove();		
	}
	if(storeIDselected != selectedStoreNum && enteredQuantity == selectedQuantity){
		$("#selectedStoreID").remove();
		$("#button_primary").removeAttr("disabled").addClass("button_prim_green").removeClass('button_prim_greeninactive');
		$('#button_primary').append("<input name=selectedStoreID id=selectedStoreID type=hidden value="+storeIDselected+" />");
		$('#findinstore .fis_sucessfullATB').addClass('display-none');
	}
	var buttonActive = $("#button_primary").attr("disabled");
	if(buttonActive == 'disabled') {
		$("#quantitySelected").remove();
		$("#selectedStoreID").remove();
	}
	$.each(uniqueNames, function(i, storeInfo){
		var toUpdate = storeInfo.split('=');			
			if(toUpdate[1] == "0"){
				var indexOfStore = $.inArray(storeInfo, uniqueNames);
				uniqueNames.splice(indexOfStore, 1);
		}
	});
	$("#storeInfoArray").remove();
	if(uniqueNames != ""){
	$('#button_primary').append("<input name=storeInfoArray id=storeInfoArray type=hidden value="+uniqueNames+" />");
	}
	var infoArray = $('#storeInfoArray').val();
	if(infoArray == undefined) {
		$("#button_primary").attr("disabled", "disabled").removeClass("button_prim_green").addClass('button_prim_greeninactive');
	}
}
//END : Function added to update the user's last updated storeId and Quantity
function increment(element){
	 $("#quantitySelected").remove();
	 $("#selectedStoreID").remove();
	var checkStoreArray = $('#storeInfoArray').val();
	if(checkStoreArray == undefined) {
		uniqueNames.length = 0;	
	}
  h = {};
  var $button = $(element);
  var divId = element.id;
  var storeid = divId.split("-");
 
  //var selectedStore = storeid[1];
  var selectedStoreNum = $("#selectedStoreID").val();

  var oldValue = $button.parent().find(".valnumeric").val() == "" ? 0 : $button.parent().find(".valnumeric").val();
  if ($button.text() == "+") 
  	{
	  $("#quantitySelected").remove();
	  var newVal = parseFloat(oldValue) + 1;
	  $button.parent().find(".decbtn").show();
	  $button.parent().find("input.valnumeric").removeClass("mleft20");
	  //if($(element).parent().attr('pickStatus') == true || $(element).parent().attr('clearanceStatus') == true){
		  $("#button_primary").removeAttr("disabled").addClass("button_prim_green").removeClass('button_prim_greeninactive');
	  //}
	  $('#findinstore .fis_sucessfullATB').addClass('display-none');
	  var quantitySelected = $("#quantitySelected").val();
	
	  if(selectedStoreNum != "") {
		  var existingStoreId = $("#selectedStoreID").val();
		  if(existingStoreId != storeid[1]){
			  $('#quantityInventory-' + $('#selectedStoreID').val()).hide();
		  }
		  $("#selectedStoreID").remove();
	  }
	  $('#button_primary').append("<input name=selectedStoreID id=selectedStoreID type=hidden value="+storeid[1]+" />");
	  if(newVal != quantitySelected) {
		  $("#quantitySelected").remove();
	  }
	  $('#button_primary').append("<input name=quantitySelected id=quantitySelected type=hidden value="+newVal+" />");
	  if(uniqueNames.length!=0){
		  $.each(uniqueNames, function(i, incStoreInfo){			
				var splitString = incStoreInfo.split('=');			
				var storeID = splitString[0];
				if(storeid[1] == storeID){
					var indexOfStore = $.inArray(incStoreInfo, uniqueNames);
					uniqueNames.splice(indexOfStore, 1);
					var incrementQty = $("#quantitySelected").val();
					var newQtyWithStore = storeid[1]+"="+incrementQty;
					uniqueNames.push(newQtyWithStore);
				}
			});
		  
		    var storeQty = storeid[1]+"="+newVal;	
		    storeWithQuantity.length = 0;
			storeWithQuantity.push(storeQty);
			$.each(storeWithQuantity, function(i, el){
				if($.inArray(el, uniqueNames) == -1) {
					uniqueNames.push(el);
					storeWithQuantity.length = 0;
				}	
			});
			
	  }else{
		  uniqueNames.push(storeid[1]+"="+newVal);
	  }
	 
	  $("#storeInfoArray").remove();
		if(uniqueNames != ""){
		$('#button_primary').append("<input name=storeInfoArray id=storeInfoArray type=hidden value="+uniqueNames+" />");
		}  
	} 
  else 
	{
   // Don't allow decrementing below zero
	    if (oldValue > 0) 
	    {
	      var newVal = parseFloat(oldValue) - 1;	
	      var quantitySelected = $("#quantitySelected").val();
		  if(newVal != quantitySelected) {
			  $("#quantitySelected").remove();
			  $("#selectedStoreID").remove();
		  }
		  $('#button_primary').append("<input name=quantitySelected id=quantitySelected type=hidden value="+newVal+" />");
		  $('#button_primary').append("<input name=selectedStoreID id=selectedStoreID type=hidden value="+storeid[1]+" />");
		  $.each(uniqueNames, function(i, decStoreInfo){	
				var splitString = decStoreInfo.split('=');			
				var storeID = splitString[0];
				if(storeid[1] == storeID){
					var indexOfStore = $.inArray(decStoreInfo, uniqueNames);
					uniqueNames.splice(indexOfStore, 1);
					var decrementQty = $("#quantitySelected").val();
					var newQtyWithStore = storeid[1]+"="+decrementQty;
					uniqueNames.push(newQtyWithStore);
				}
			});
		  $.each(uniqueNames, function(i, storeInfo){
				var toUpdate = storeInfo.split('=');	
					if(toUpdate[1] == "0"){
						var indexOfStore = $.inArray(storeInfo, uniqueNames);
						uniqueNames.splice(indexOfStore, 1);
				}
			});
		  $("#storeInfoArray").remove();
			if(uniqueNames != ""){
			$('#button_primary').append("<input name=storeInfoArray id=storeInfoArray type=hidden value="+uniqueNames+" />");
			}
	      if(newVal == 0)
	      {
	      	  $button.parent().find(".decbtn").hide();
	    	  $button.parent().find("input.valnumeric").addClass("mleft20");
			 /*$("#button_primary").attr("disabled", "disabled").removeClass("button_prim_green").addClass('button_prim_greeninactive');
			 $("#selectedStoreID").remove();
			 $("#quantitySelected").remove();*/
	      }
	    } 
	    else 
	    {
	      newVal = 0;
	    }
	    var infoArray = $('#storeInfoArray').val();
		if(infoArray == undefined) {
			$("#button_primary").attr("disabled", "disabled").removeClass("button_prim_green").addClass('button_prim_greeninactive');
			 $("#selectedStoreID").remove();
			 $("#quantitySelected").remove();
		}
	}
  $button.parent().find(".valnumeric").attr('value',newVal);
}

function pgn_prev(event){
	if(event.keyCode==13){
		var itemAdded=true;
 		if ($('#button_primary').attr('disabled') != "disabled"){
 			itemAdded = submitDetailsForm(true);
 		}		
 		if(itemAdded!=false){
 			pgnPrevious();
 		}	
	}
}

function pgn_next(event){
		if(event.keyCode==13){
		var itemAdded=true;
		if ($('#button_primary').attr('disabled') != "disabled"){
			itemAdded = submitDetailsForm(true);
		}		
		if(itemAdded!=false){
			pgnNext();
		}
		}
}

$(document).ready(function(){
	$("#pickstore_tooltip").click(showbox);
	$(".closetooltip").click(hidebox);
	function showbox(e){
		var x=e.pageX-40;
		var y=e.pageY+20;
		$(".pstooltip").fadeIn();
		$(".pstooltip").offset({left:x, top:y});
	}
	function hidebox(e){
		$(".pstooltip").fadeOut();
	}

	$('#showavailableonly').click(function(){
	$(this).parent().toggleClass('availability_chkboxchkd');
		onFilterClick(true);
	 });
	$('#pickup_instore').click(function(){
	$(this).parent().toggleClass('availability_chkboxchkd');
		onFilterClick(true);
	 });
	
 	setPlaceHolders();
 	var host  = window.location.host;
	var href  = window.location.href;
	var ref  = document.referrer;
	var ipRE = new RegExp('^[0-9]+\.[0-9]+\.[0-9]+\.[0.9]+');
       
	if(ipRE.test(host) || href.indexOf('quickview') != -1 || ref.indexOf('quickview') != -1){
		// Don't do anything
	}else {
            var pathArray = host.split('.');
            var arrLength = pathArray.length;
            var domainName = pathArray.slice(arrLength - 2, arrLength).join('.');
            document.domain = domainName;
	}
 	fillProductInfoDetails();
 	
 	$('#input-address').focus(function() {
		/*if($('#input-address').hasClass('placeholder')) {
			this.value = "";
			$('#input-address').attr('placeholder','');
		}*/
		if(!$("#storeresults").is(":visible")){
			window.parent.parent.document.getElementById('fancybox-content').style.height= '380px';
		if(window.parent.$("#qvfisDiv").length!=0){
				window.parent.parent.document.getElementById('fancybox-content').style.height= '440px';
				window.parent.$("#qvfisDiv").css("height", "380px")
			}
		}		
    });
 	
 	$('#pgn_previous').click(function() {
 		var itemAdded=true;
 		if ($('#button_primary').attr('disabled') != "disabled"){
 			itemAdded = submitDetailsForm(true);
 		}		
 		if(itemAdded!=false){
 			pgnPrevious();
 		}		
    });
 	
 	$('#pgn_next').click(function() {
 		var itemAdded=true;
 		if ($('#button_primary').attr('disabled') != "disabled"){
 			itemAdded = submitDetailsForm(true);
 		} 		
 		if(itemAdded!=false){
 			pgnNext();
 		}		
    });
 		
 	$('#input-address').focusout(function() {
 		/*$('#input-address').attr('placeholder','Enter city and state or ZIP code');
 		var placeholderAddress="Enter city and state or ZIP code";
		if(isEmpty($("#input-address").val())) {
			if($("#input-address").hasClass('non-placeholder')){
				$("#input-address").removeClass('non-placeholder');
				$("#input-address").addClass('placeholder');
			}
			$("#input-address").val(placeholderAddress);
		}*/
		
		if(!($("#storeresults").is(":visible")|| $("#errorMessage").is(":visible"))){
			window.parent.parent.document.getElementById('fancybox-content').style.height= '260px';
			if ($.browser.msie|| $.browser.webkit){
	        		  window.parent.document.getElementById('fancybox-content').style.height= '262px';
	       	}
			
		if(window.parent.$("#qvfisDiv").length!=0){
				window.parent.parent.document.getElementById('fancybox-content').style.height= '310px';
				window.parent.$("#qvfisDiv").css("height", "240px");
			}
		}else if($("#errorMessage").is(":visible")){
			window.parent.parent.document.getElementById('fancybox-content').style.height= '310px';
			if ($.browser.msie || $.browser.webkit){
      		  window.parent.document.getElementById('fancybox-content').style.height= '330px';
			}
	
		if(window.parent.$("#qvfisDiv").length!=0){
				window.parent.parent.document.getElementById('fancybox-content').style.height= '350px';
				window.parent.$("#qvfisDiv").css("height", "300px");
			}
		}
    });
 		
	$('.btnImage').bind('click',function(event) {
	     
	  	  var elementId = event.target, elSplit,prodId="", enableStore, pageName;
	        if(elementId && elementId.id!= ""){
	            elSplit= elementId.id.split("_");
	            prodId = elSplit[2];
	        }
	        
	        enableStore = $(this).hasClass("s-addtostore");
	        pageName=$("input[name='fisPageName']").attr("value");
	        //var fisErrorMsg=$("#errorMessage span").html();
	        if(enableStore){
	            var isQuickView = $('[name=fisQuickView]').val();
	           window.modelWindowDisplay(prodId, isQuickView);
	           
	          }else{
	        	  
		    	  if(pageName=="sku_pdp" || pageName=="sku_pdp_collection"){
		    		if($("#sSelectWaistSizeBox").length!=0){
		    			$("#error_display1").find("ol").find("li:eq(0)").html("Please select a size");
			    	  	$("#error_display1").show();
			    	  	$("#sSelectWaistSizeBox").addClass("s-error-red");
		    		}
		    	  			    	  	
		    	  }
		    	  
		    	  if(pageName=="sku_pdp_collection2"){
		    		 var len=fisErrorEle.length, i;
		    		 for(i=0; i<len;i++){
		    			fisErrorEle[i].removeClass("s-error-red");
		    		 }
		    	  	var ele=$('#T'+prodId+".prod_description1").find("#sSelectWaistSizeBox");
		    	  	if(ele.length!=0){
		    	  		ele.addClass("s-error-red");
			    	  	$("#error_display1").find("ol").find("li:eq(0)").html("Please select a size");
			    	  	$("#error_display1").show();
			    	  	fisErrorEle.push(ele);	
		    	  	}	    	  	
		    	  }  	  
      }
	});

	// model window functionality
	window.modelWindowDisplay = function(prodId, isQuickView){
	var imageUrl=$('[name=fisImageURL_'+prodId+']').val();
  	var skuIdSel=$('[name=fisSkuId_'+prodId+']').val();
  	var title=$('[name=fisTitleName_'+prodId+']').val();
  	var color=$('[name=fisSkuColor_'+prodId+']').val();
  	var pSize=$('[name=fisPrimarySize_'+prodId+']').val();
  	var sSize=$('[name=fisSecondarySize_'+prodId+']').val();
  	var prdId=$('[name=fisProductId_'+prodId+']').val();
  	
	$('#selectedSku').val(prodId);
	
	//Start:Mingle Story : 304 changes
	//Added skuId parameter
	var fisURL = "/catalog/findinstore/findstore.jsp?pagetype=findstore&prodId="+prdId+"&skuId="+skuIdSel;
	//End:Mingle Story : 304 changes
	
	if(isQuickView) {
		window.parent.$("#fancybox-close").hide();
		var productPanel = $('.product_Lpanel');
		var height=$.browser.msie?"262px":"240px";
  	  
		var findInStoreDiv = $("<div id=qvfisDiv style=width:100%;height:"+height+';><iframe style="width:100%;height:100%;" scrolling="no" frameborder="0" src=' + fisURL + 'hspace="0"></iframe><a id="qvfisBackBtn" href="#" class="button_back_qv"></a></div>');
		window.parent.document.getElementById('fancybox-content').style.height= '310px';
		productPanel.after( findInStoreDiv);
		productPanel.hide();
		$("#qvfisBackBtn").click(function() {
			window.parent.$("#fancybox-close").show();
			$("#qvfisDiv").remove();
			productPanel.show();
			window.parent.parent.document.getElementById('fancybox-content').style.height= '550px';		
			/* added perheight for GVWEB-130 issue */
			//var perheight = $('.product_Lpanel').height();
			//window.parent.parent.document.getElementById('fancybox-content').style.height= perheight;
		});
		
	} 	else {
		
	   	$(".showStorelocatoroverlay").fancybox({
	          'width'                : 840,
	          //'height'               :450,
	          'autoScale'            : true,
	          'scrolling'			   :'yes',
	          'href'				   :fisURL,
	          'autoDimensions'       :true,
			  'centerOnScroll'       : true,
	          'type'                :'iframe',
	          'showCloseButton'		:false,
	          'onComplete' : function() {
	          	 
	          $('#fancybox-frame').load(function() { // wait for frame to load and then gets it's height
	        	  if ($.browser.msie){
	        		  window.parent.document.getElementById('fancybox-content').style.height= '262px';
	        	  }      	  
	        	  else {
	        		  //$('#fancybox-content').height($(this).contents().find('body').height());
	        		  window.parent.document.getElementById('fancybox-content').style.height= '380px';
	        	  }

	        	  $("#fis_backBtn").hide();
	        	  
		      });
	        }
	      });	
	}
	
	//Fix for defect - ATG-5780 & ATG-5781
	$('body,html').scrollTop(0);

   	
  }
	/**event handling for address input fields 
	 * 
	 * **/
	$('#store_locator_form input').on('propertychange, change, keypress, keyup , paste, input,mouseout', function(event) {
		
		$("#errorMessage").hide();
		$("#fis_address").removeClass("redborder");
		
		if($(this).attr("id")=='input-address'){
			
			if($("#input-address").hasClass('placeholder')){
				$("#input-address").removeClass('placeholder');
				$("#input-address").addClass('non-placeholder');
			}
						
			if($('#input-address').hasClass('placeholder') || isEmpty($("#input-address").val())) {
				
	   			if($('#btn_store_locator').hasClass('search_focus')) {
		        	 $("#btn_store_locator").removeClass('search_focus');
		        	 $("#btn_store_locator").attr('disabled','disabled');
		        }
	   			$("#input-address").addClass('placeholder');
				$("#input-address").removeClass('non-placeholder');
		        return;
			} 
			// enable search button
	    	$("#btn_store_locator").addClass('search_focus');
	    	$("#btn_store_locator").removeAttr('disabled');
	    	
	    	if(event.keyCode==13){
	    		 event.preventDefault();
	    		 if($('#input-address').hasClass('non-placeholder') || !isEmpty($("#input-address").val())){
	    			 fisAddressValidaton($("#store_locator_form")); 
	    		 }	    		 
	    		 return false;	    		
	    	}	    	
		}		
	});	
	
	$('#store_locator_form').on('submit', function(event) {
        return false;
    });
	
	$("#btn_store_locator").bind("click",function(event){
		fisAddressValidaton($(this).parents("form"));	  
    });
 
    $(".findClose").bind("click",function(event){
    	parent.parent.jQuery.fancybox.close();
    });
    
    //Autocomplete init 
    if(window.google){
    initMapAutocomplete();
    }
    
	});// end
	function checkAvailability(){
		 if($('#showavailableonly').attr('checked') === 'checked'){
			  $('.notavailable').hide();
		  } 
		  else{
			  $('.notavailable').show();
		  }
	}
	
	function fisAddressValidaton(form){
		if($('#btn_store_locator').hasClass('search_focus')) {
			$('#spanId').html("");
			  $('#tbodyId').html("");
			  //$('#storeresults').hide();
			  $("#errorMessage").hide();
			  $("#input-state").val("");
			  $("#input-city").val("");
			  $("#input-zip").val("");
			  $("#fis_address").removeClass("redborder");
			  var validateStatus = validateStoreForm(form);
			  /*if(validateStatus) {
				  ajaxStoreLocator();
			  }
			  else {
				  return false;
			  }*/
		}
	}

	//************************ Autocomplete code
	//TODO: Externalize places library URL in JSP and add client id for business account
	function initMapAutocomplete() 
	{
		var input = document.getElementById('input-address'),
			options = {componentRestrictions: {country: 'us'}};	
		if(input){
			new google.maps.places.Autocomplete(input, options);	
		}				
	};
	
	//*********************** End Autocomplete code
   
    function validateStoreForm(formName)
    {  
        var myAddressQuery= formName.find(".input-boxaddress").val(), addressComp, add_len, geocoder, rflag=false, c1, i, addressComp1, add_len1;
	//Start code: Defect #356
        // fisErrorMsg=$("#errorMessage span").html();
	//End code: Defect #356
        $("#LoadingImage").show();
        if(!window.google){
        		var zip = $.trim(myAddressQuery);
        		if (!isEmpty(zip) && !isNaN(zip) && zip.length == 5){
        			rflag=true;
        			$('#input-zip').val(zip);
        		}else{
        			googleError = false;
        			$("#errorMessage span").html("Service is currently unavailable. Please try again later");
        		}
        		processSearchAction(rflag);
        }else{
        	geocoder = new google.maps.Geocoder();
        geocoder.geocode(
            { address : myAddressQuery,
                region: 'us'
            }, function(results, status){
            	if(status=="OK" && results.length <=2 && results.length>0 ){
        		
        		addressComp=results[0].address_components;
                add_len=addressComp.length;
        		               
                if(results.length ==1){
                	
                	for(i=0; i<add_len;i++){
                        c1=addressComp[i].types[0];
                        if(c1 == "locality"){
                            $("#input-city").val(addressComp[i].long_name);
                        }

                        if(c1 == "administrative_area_level_1"){
                            $("#input-state").val(addressComp[i].short_name);
                        }

                        if(c1 == "postal_code"){
                            $("#input-zip").val(addressComp[i].short_name);
                        }
                        
                    }  
                	rflag=true;
                }else if(results.length ==2){
                	addressComp1=results[1].address_components;
                    add_len1=addressComp1.length;
                    
                    var city1, state1, city2, state2, zip1, zip2, subcity1, subcity2;
                    
                	for(i=0; i<add_len;i++){
                        c1=addressComp[i].types[0];
                        if(c1 == "locality"){
                            city1=addressComp[i].long_name;
                        }

                        if(c1 == "administrative_area_level_1"){
                        	state1=addressComp[i].short_name;
                        }

                        if(c1 == "postal_code"){
                        	zip1=addressComp[i].short_name;
                        }
                        if(c1 == "administrative_area_level_3"){
                        	subcity1=addressComp[i].long_name;
                        }
                    } 
                	
                	if(city1==undefined && subcity1!=undefined){
                		city1=subcity1;
                	}
                	
                	for(i=0; i<add_len1;i++){
                        c1=addressComp1[i].types[0];
                        if(c1 == "locality"){
                            city2=addressComp1[i].long_name;
                        }

                        if(c1 == "administrative_area_level_1"){
                        	state2=addressComp1[i].short_name;
                        }

                        if(c1 == "postal_code"){
                        	zip2=addressComp1[i].short_name;
                        }
                        if(c1 == "administrative_area_level_3"){
                        	subcity2=addressComp1[i].long_name;
                        }
                    }
                	
                	if(city2==undefined && subcity2!=undefined){
                		city2=subcity2;
                	}
                	if(city1 && city2 && city1 == city2 && state1 && state2 && state1 == state2){
                            $("#input-city").val(city1);
                            $("#input-state").val(state1);
                                                 
                            $("#input-zip").val(zip1?zip1:zip2);
                            rflag=true;
                        }else{
                        	rflag=false;
                        	googleError = true;
                    		$("#errorMessage span").html("We could not find the location you entered. Please try again later");
                        }
                	               	               	
                	}else{
                		rflag=true;
                	}               	
        	}                                               
	                /*if(rflag) {
                    	$("#errorMessage").hide();
						$("#fis_address").removeClass("redborder");
          			  	ajaxStoreLocator();
	                }else{
	                	$("#LoadingImage").hide();
	                	$("#errorMessage").show();
	                	storeLocatorHeight();
						$("#fis_address").addClass("redborder");
	                	$('#storeresults').hide();
	          				
		                }*/
	            	//$("#errorMessage span").html(fisErrorMsg);
	            	processSearchAction(rflag);           	           	
    	});
        }   	   	    	 
    }
      
    function ajaxStoreLocator(){
    	isLocalCall = false;
        var data_zip="";
        var data_city = "";
        var data_state = "";
        var data_skuId=$('#skuId').val();
        var errorMessage ;
        var searchResult ="";
        var displayStateValue="";
        var prdId = window.parent.$("#selectedSku").attr("value");
        var eVar61="";
        
        //data_zip=$('#input-zip').val();
    	//$("#input-zip").css("border","1px solid #CCCCCC");
		//$("#input-city").css("border","1px solid #CCCCCC");
        /*if($('#input-zip').hasClass('non-placeholder')) {
        	data_zip=$('#input-zip').val();
        	 eVar61="||"+data_zip;
            searchResult = "<span>Search result for ZIP Code :&nbsp;" + ""+ data_zip +""  + " </span>";
      	    //errorMessage = "Your search for " + "'"+data_zip +"'"  + " did not match any locations. Please try again."
      	    //clear state value 
      	    $('#input-state').val("");
        } else {        	
        	data_city = $('#input-city').val();
            data_state = $('#input-state').val();
            eVar61=data_city +"|"+data_state+"|";
            displayStateValue = $('#input-state :selected').text();
        	searchResult = "<span>Search result for City and State :&nbsp;" + ""+ data_city +"" +",&nbsp;"+ ""+ displayStateValue +"" + " </span>";
      	    //errorMessage ="Your search for " + "'"+ data_city +"'" + ","+  " near  "  + "'"+ displayStateValue +"'"  +" did not match any locations. Please try again."
        }*/
        
        //Start : Added the below piece of code as part of Mingle story #28
        data_zip=$('#input-zip').val();
        data_city = $('#input-city').val();
        data_state = $('#input-state').val();
        var searchKeyWord = $('#input-address').val();
        if(data_zip  != null && $.trim(data_zip.toLowerCase()) == $.trim(searchKeyWord.toLowerCase())){        	
        	eVar61="||"+data_zip;        	
        }else if(data_city != null && $.trim(data_city.toLowerCase()) == $.trim(searchKeyWord.toLowerCase())){        	
        	eVar61 = data_city +"||";
        }else{
            eVar61=data_city +"|"+data_state+"|"+data_zip;        	
        }
        //End : Added the below piece of code as part of Mingle story #28
        var dropletConstructedUrl=$('#input-fisSearchUrl').val();
        var restAPIURL=decodeURIComponent(dropletConstructedUrl);    
      
        //var restAPIURL=location.protocol+'//'+location.host+'/rest/bean/com/kohls/commerce/findinstore/StoreAvailabilitySearch?atg-rest-output=json&atg-rest-depth=1';
        //,'realTime':realTime,'requestType':requestType,'atsRequired':onlyAtsRequired
        $("#LoadingImage").show();
        storeLocatorHeight();
        
      //Mingle Story : 304 Changes.Added isGiftCardSku property in restAPI call
        var isGiftCardSKU = $('#isGiftCardSKU').val();
        var isClearance = $('#isClearance').val();
         $.ajax({
           url: restAPIURL,
           type: "GET",
           cache : false,
           data:{'zip':data_zip,'sku':data_skuId,'city':data_city,'state':data_state,'isGiftCardSKU':isGiftCardSKU,'isClearance':isClearance},
           success:successData,
           error:OnError
         });
         
         capture_giv_omniture_event("search","event42",prdId,eVar61);
         return false;
    }	 
    function OnError(error)
    {  
    	$("#LoadingImage").hide();
    	$('#spanId').html("");
    	$('#tbodyId').html("");
		$('#storeresults').hide();
		if(!googleError)
    		$("#errorMessage span").html("Service is currently unavailable. Please try again later");
    	else 
    		$("#errorMessage span").html("We could not find the location you entered. Please try again later");
    	$("#errorMessage").show();
    	storeLocatorHeight();
		$("#fis_address").addClass("redborder");
 	   return;           
    }
            
    function getInventoryStatus(stStatus){
        if(stStatus=='Available'){
       return "Available";
        }
        else if(stStatus=='Low'){
                  return "Limited Availability";      
        }
        else {
                return "Not Available"
        }
     }
        
    function processSearchAction(rflag){

    	if(rflag) {
        	$("#errorMessage").hide();
			$("#fis_address").removeClass("redborder");
			  	ajaxStoreLocator();
        }else{
        	$("#LoadingImage").hide();
        	$("#errorMessage").show();
			$("#fis_address").addClass("redborder");
        	$('#storeresults').hide();
        	storeLocatorHeight();
       }
    }
    function setPlaceHolders() {
    	 	
    	/*var placeholderAddress="Enter city and state or ZIP code";
    	if(isEmpty($("#input-address").val())) {
    		$("#input-address").val(placeholderAddress);
    		$("#input-address").addClass('placeholder');
    	}*/
    	
    	if($('#btn_store_locator').hasClass('search_focus')) {
       	 	$("#btn_store_locator").removeClass('search_focus');
        }  
           	
        $("#btn_store_locator").addClass('button_search_qv');
        $("#btn_store_locator").attr('disabled','disabled');
        
        // Hiding the results table
        /*$('#spanId').html("");
    	$('#tbodyId').html("");
    	$('#storeresults').hide();*/
    	clearError();
    }

    function clearError(){
    	/*$("#input-city").css("border","1px solid #CCCCCC");
    	$("#input-zip").css("border","1px solid #CCCCCC");*/
    	$("#errorMessage").hide();
		$("#fis_address").removeClass("redborder");
    }

    function isEmpty(value){
    	if(value != undefined && $.trim(value) != "" && value.length > 0){
    		return false;
    	}
    	return true;
    }
    
    function formatPhoneNumber(phoneno){
 	   var formatPhone;
 	   var phoneSplit = phoneno.split('-');
 	   formatPhone= "("+phoneSplit[0] + ") " +phoneSplit[1] +"-" +phoneSplit[2];
 	   if(phoneSplit.length >1){
 		   return formatPhone;
 	   }
 	   else {
           formatPhone= "("+phoneno.substring(0,3) + ") " +phoneno.substring(3,6) +"-" +phoneno.substring(6,10);
           return formatPhone;
 	   }      
    }
    
    function storeLocatorHeight(){
	    if(window.parent.document.getElementById('qvfisDiv')!=null){
			window.parent.parent.document.getElementById('fancybox-content').style.height= '350px';
			window.parent.document.getElementById('qvfisDiv').style.height= '300px';
			if ($.browser.msie){
				window.parent.parent.document.getElementById('fancybox-content').style.height= '370px';
				window.parent.document.getElementById('qvfisDiv').style.height= '320px';
			}
			 if($("#errorMessage").is(":visible")){
				 window.parent.parent.document.getElementById('fancybox-content').style.height= '370px';
					window.parent.document.getElementById('qvfisDiv').style.height= '300px';
					if ($.browser.msie || $.browser.webkit){
						window.parent.parent.document.getElementById('fancybox-content').style.height= '390px';
						window.parent.document.getElementById('qvfisDiv').style.height= '330px';
					}
		    }
		}
		else{
			window.parent.document.getElementById('fancybox-content').style.height= '300px';
			if($("#errorMessage").is(":visible")){
				window.parent.parent.document.getElementById('fancybox-content').style.height= '305px';
				if ($.browser.msie|| $.browser.webkit){
	      		  window.parent.document.getElementById('fancybox-content').style.height= '330px';
	      		window.parent.document.getElementById('qvfisDiv').style.height= '330px';
				}
			}
		}
    }
    
    function capture_giv_omniture_event(action,event,productId,eVar61) {
	    // Call Omniture SiteCatalyst jsp through ajax
	    var sitecatalysturl = '/catalog/findinstore/findstore_sitecatalyst.jsp';
	    $.ajax({
	        url: sitecatalysturl,
	        type: "GET",
	        data:{'action':action,'event':event,'productId':productId,'eVar61':eVar61},
	        success:OnOmniSuccess,
	        error:OnOmniError
	    });
    }
    
    function OnOmniSuccess(data) {
		$('#omni_script').html(data);
	}
	function OnOmniError() {
	}
	
	function isEmpty(value){
		if(value != undefined && $.trim(value) != "" && value.length > 0){
		return false;
		}
		return true;
	} 
	function fillProductInfoDetails(){
    	var prodId = window.parent.$("#selectedSku").attr("value"),
    		imageUrl=window.parent.$("input[name='fisImageURL_"+prodId+"']").attr("value"),
    		title= window.parent.$("input[name='fisTitleName_"+prodId+"']").attr("value"),
    		skuIdSel=window.parent.$("input[name='fisSkuId_"+prodId+"']").attr("value"),
    		color=window.parent.$("input[name='fisSkuColor_"+prodId+"']").attr("value"),
    		pSize=window.parent.$("input[name='fisPrimarySize_"+prodId+"']").attr("value"),
    		sSize=window.parent.$("input[name='fisSecondarySize_"+prodId+"']").attr("value"),
    		prdId=window.parent.$("input[name='fisProductId_"+prodId+"']").attr("value"),
    	
    		oriPrice=window.parent.$("input[name='fisOriginalPrice_"+prodId+"']").attr("value"),
    		salePrice=window.parent.$("input[name='fisSalePrice_"+prodId+"']").attr("value"),
    		saleLabel=window.parent.$("input[name='fisSaleLabel_"+prodId+"']").attr("value"),
    	
    		regLabel=window.parent.$("input[name='fisRegLablel_"+prodId+"']").attr("value"), 
    		
    		IsSuupressPrice=window.parent.$("input[name='fisIsSuppresed_"+prodId+"']").attr("value"), 
    		
    		//igCaseOrgLabel = regLabel.match(/original/i);
    	
    		pLabel="", rLabel="";
    	
    		var upcNum = window.parent.$('#skava_skuUpcCode').val();
    		var barCodeFormat = $('#barCodeFormat').val();
    		if(upcNum != null && upcNum != " " && barCodeFormat != null){
    			//START :BOPUS User Story 421 
    			var upcNumLen =upcNum.length;
   				if(upcNumLen == 12){
   					upcNum = "0"+upcNum;
   				}
   				//END
    			$('#barCode').barcode(upcNum,barCodeFormat,{barWidth:1.3,barHeight:25});
    		} 
    		  		
    		if(salePrice!=""&& salePrice!=null&&salePrice!=undefined){
    			var igCaseSaleLabel = saleLabel.match(/sale/i);
    		    if(igCaseSaleLabel){
    		       	pLabel="Sale ";
    		    }else{
    		       	pLabel="Clearance ";
    		    }
    		}	    	
    	
	    	if(regLabel=="regular"){
	    		rLabel="Regular ";
	    	}else if(regLabel == "original"){
	    		rLabel="Original ";
	    	}else{
	    		rLabel="Regular ";
	    	}
   	
	    	$('#skuId').val(skuIdSel);
	      	$('.prodetails').find('img').attr('src',imageUrl);
	      	
	      	$('.prodetails .proname').html(title);
	      	$('#adcPname').html(title);
	      	if(IsSuupressPrice =="true"){
	      	 var suppressHtml=window.parent.parent.document.getElementById('Suppressed_Message').innerHTML;
	      	 
	      	  $('#prodInfoUL').append("<li class='suppressed' style='margin:5px 0;'> "+suppressHtml+"</li>").html();
	      	}
	      	var colorName = $('#color-display').val();
	      	var sizeName = $('#size-display').val();
	      	if(color!=undefined && color!="" && pSize!=undefined && pSize!=""){
	      		$('#prodInfoUL').append("<li id=fiscolorSize><span id=fiscolor>"+colorName+"&nbsp;"+color+"</span><span id=fissize>, "+sizeName+"&nbsp;"+pSize+'</span></li>').html();
	      	}else if((color==undefined || color=="")&& (pSize!=undefined && pSize!="")){
	      		$('#prodInfoUL').append("<li id=fiscolorSize><span id=fissize>"+sizeName+"&nbsp;"+pSize+'</span></li>').html();
	      	}else if  ((color!=undefined && color!="") && (pSize!=undefined || pSize!="")){
	      		$('#prodInfoUL').append("<li id=fiscolorSize><span id=fiscolor>"+colorName+"&nbsp;"+color+'</span></li>').html();
	      	}
	      	
	      	var inseamName = $('#InseamSize-display').val();
	      	if(sSize!=undefined && sSize!=""){
	      		$('#prodInfoUL').append("<li id=fisinseam>"+inseamName+"&nbsp;"+sSize+'</li>').html();
	      	}
	      	var skuName = $('#sku-display').val();
	      	if(skuIdSel != undefined && skuIdSel!=""){
	      		$('#prodInfoUL').append("<li id=fissku>"+skuName+"&nbsp;"+skuIdSel+'</li>').html();
	      	}
	     // omniture call jira : 
	      	if($('#omni_script').length > 0){
	      		capture_giv_omniture_event("findinstore","event43",prodId,"");
	      	} 
	      	
	      	if(salePrice!=undefined && salePrice!="" && salePrice!=null){
	    		$('#prodInfoUL').append("<li id=fisPrice><span class='salePricefis'>"+pLabel+salePrice+'</span><span>&nbsp;-&nbsp;'+rLabel+oriPrice+'</span></li>').html();
	    	}else{
	    		$('#prodInfoUL').append("<li id=fisPrice><span>"+rLabel+oriPrice+'</span></li>').html();
	    	}	    	 	   	
  }
	
	 function resetMapArea(){
		 storeAvail.availableStores = [];
		 storePickup.availableStores = [];
		 storeAvailPickup.availableStores = [];
		 currentStores.availableStores = [];
		 pristineData.availableStores = [];
	 }
	
	 function resetPagination(){
    	 currentPage = 1;
     }
     
     function pgnPrevious(){
    	 currentPage--;
    	 showPage(currentPage,"filter");
     }
     
     function pgnNext(){
    	 currentPage++;
    	 showPage(currentPage, "filter");
     }
     
     function showPage(page, status){
    	 if(page == 1){
    		 $('#pgn_previous').addClass('display-none');
    	 } else {
    		 $('#pgn_previous').removeClass('display-none');
    	 }
    	 
    	 if(page == totalPages){
    		 $('#pgn_next').addClass('display-none');
    	 } else {
    		 $('#pgn_next').removeClass('display-none');
    	 }
    	 
    	 $('#pgn_cur_page').html(page);
    	 $('#pgn_total_pages').html(totalPages);
    	 
    	 var store_rows = $('tr[pgn]');
    	 for(var i=0; i<store_rows.length; i++){
    		 $(store_rows[i]).attr('style', 'display:none');
    	 }
    	 	 
    	 var store_rows_viz = $("tr[pgn='" + currentPage + "']");
    	 for(var i=0; i<store_rows_viz.length; i++){
    		 $(store_rows_viz[i]).attr('style', 'display:table-row');	
    	 }   	
	 	 if(window.google){
	 		 if(status=="filter" ||(!$('#showavailableonly').is(":checked") && !$('#pickup_instore').is(":checked") && status!="filter") ){
	 			paintMapInit();
	 		 }
	 		
	 	}else{
 			$('[id^=distanceP-]').hide();
 		}
     }
         	 
	 function paintMapInit() {
		markerLocations = [];
		markerWindows = [];
		bopusNames = [];
		markerA = "";
		markerB = "";
		markerC = "";
		infoA = "";
		infoB = "";
		infoC = "";
		//Initialize google map
		var mapOptions = {
       	        zoom:9,
       	        mapTypeId: google.maps.MapTypeId.ROADMAP
       	    }
           
           fis_map = new google.maps.Map(document.getElementById('storesMap'), mapOptions);
		   			
		var stores = currentStores.availableStores;
		var markerStart = (currentPage - 1) * 3;
		if(stores.length > 0){
			for (var i = 0; i<3; i++){
				if(markerStart < stores.length){
					var name = stores[markerStart].storeName, address;
					if(stores[markerStart].addressLine2 !=""){
						address = stores[markerStart].addressLine1 + ", " + stores[markerStart].addressLine2 + ", " + stores[markerStart].city + ", " +  stores[markerStart].state + " " + stores[markerStart].zipCode;
					}else{
						address = stores[markerStart].addressLine1 + ", " + stores[markerStart].city + ", " +  stores[markerStart].state + " " + stores[markerStart].zipCode;
					}
										
					var infoHTML = '<div id="content" style="width:180px"><div><b>' + name + ' </b></div>' +  '<div>' + stores[markerStart].addressLine1 + stores[markerStart].addressLine2 + "<br/>" + stores[markerStart].city + ", " +  stores[markerStart].state + " " + stores[markerStart].zipCode; + '</div>' +'</div>';  				
					markerWindows.push(infoHTML);
					var geocoder = new google.maps.Geocoder();
					if(i==0){
						infoA = infoHTML;
						//markerA = stores[markerStart].zipCode;
						markerA = "";
						geocoder.geocode( { 'address': address}, function(results, status){
							paintMapPinHelper(results, status, infoA, 0);
						}); 
					} else if(i==1){
						infoB = infoHTML;
						//markerB = stores[markerStart].zipCode;
						markerB = "";
						geocoder.geocode( { 'address': address}, function(results, status){
							paintMapPinHelper(results, status, infoB, 1);
						});
					} else if(i==2){
						infoC = infoHTML;
						//markerC = stores[markerStart].zipCode;
						markerC = "";
						geocoder.geocode( { 'address': address}, function(results, status){
							paintMapPinHelper(results, status, infoC, 2);
						});
					}				    
					markerStart++;
				}
			}
		}

		$("#map_pagination").hide();
		setTimeout(function(){$("#map_pagination").show();}, 100);
	};
		
	function paintMapPinHelper(results, status, infoHTML, i){
		var formatted_address = results[0].formatted_address;
           if (status == google.maps.GeocoderStatus.OK) {
           	if(markerLocations.length == 0){
           		fis_map.setCenter(results[0].geometry.location);
           	}
           	var loc = {};
           	loc.lat = results[0].geometry.location.lat();
           	loc.lng = results[0].geometry.location.lng();
           	
           	if(i==0){
               	infoWindowContent = infoHTML;
               	loc.icon="http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png";
               } else if(i==1){
               	infoWindowContent = infoHTML;
               	loc.icon="http://maps.gstatic.com/mapfiles/markers2/marker_greenB.png";
               } else if(i==2){
               	infoWindowContent = infoHTML;
               	loc.icon="http://maps.gstatic.com/mapfiles/markers2/marker_greenC.png";
               }  
           		       	            	
           	var marker, i, imgicon, infoWindowContent, infowindow = new google.maps.InfoWindow();

           // for (i = 0; i < locations.length; i++) {  
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(loc.lat, loc.lng),
                map: fis_map,
                icon:loc.icon
              });

              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  infowindow.setContent(infoWindowContent);
                  infowindow.open(fis_map, marker);
                }
              })(marker, i));
            
           // }
            
           	markerLocations.push(loc);
           	var storesOnPage = 3;
           	if(totalPages == currentPage){
           		storesOnPage = currentStores.availableStores.length % 3;
           		if(storesOnPage == 0) {
           			storesOnPage = 3;
           		}
           	}
           	if(markerLocations.length == storesOnPage){
           		//console.info(markerLocations);
           		//paintMarkers();	       	            		
           	}       	                
            
           } else {
           }
       
	}
	function successData(data, status){
		OnSuccess(data, status);
		onFilterClick(false);	
	}
	function onFilterClick(flag){
		if(flag == true || ($('#showavailableonly').is(":checked") || $('#pickup_instore').is(":checked") && flag==false)){
			if ($('#showavailableonly').is(":checked") && $('#pickup_instore').is(":checked"))
			{
				currentStores.availableStores = storeAvailPickup.availableStores.concat();
			} else if ($('#showavailableonly').is(":checked")) {
				currentStores.availableStores = storeAvail.availableStores.concat();
			} else if ($('#pickup_instore').is(":checked")) {
				currentStores.availableStores = storePickup.availableStores.concat();
			} else {
				currentStores.availableStores = pristineData.availableStores.concat();
			}
			if(currentStores.availableStores.length!=0){
				isLocalCall = true;
				//make this pblic
				$("#searchresults").css("visibility","visible");
				OnSuccess(currentStores, "filter");
				
			}else{
				$("#searchresults").css("visibility","hidden");
			}			
		}					
	}
	
	 function OnSuccess(data, status) {
 		resetPagination();		
 		var incr = 0;
 		$("#LoadingImage").hide();
 		var restEnabled=$('#input-restFlag').val();
 		var mapEnabled = false;
 		if ($('#givMapFlag').val() == 'true') {
 			mapEnabled = true;
 		}
 		
 		if(restEnabled == 'true') {
 		if(data.availableStores!=null && data.availableStores!=0){
			var isGWPProduct = $('#isProductInGWP').val();
 			/*if(!isLocalCall) {
 				resetMapArea();
 	 			pristineData.availableStores = data.availableStores.concat();
 	 			currentStores.availableStores = pristineData.availableStores.concat();
 	 		}*/
				if(window.parent.document.getElementById('qvfisDiv')!=null){
					window.parent.parent.document.getElementById('fancybox-content').style.height= '820px';
					window.parent.document.getElementById('qvfisDiv').style.height= '820px';
			    	if ($.browser.msie || $.browser.webkit){
			    		//var mytableheight=$('#storeresults').height()+350;
			    		var mytableheight=$('#myTable').height()+950;
				    	window.parent.document.getElementById('qvfisDiv').style.height= mytableheight;
			    		}	    	
			    	else{
			    			window.parent.document.getElementById('qvfisDiv').style.height= '820px';
			    	}
			    }
				else{
					var getScrollVal = $(window.parent.document).scrollTop();
					if(getScrollVal >= 0)
					{
					getScrollVal = getScrollVal+10;
					}
					else
					{
					getScrollVal = 10;
					}
					window.parent.document.getElementById('fancybox-wrap').style.top = getScrollVal;
	 
					window.parent.document.getElementById('fancybox-content').style.height= '820px';	
				}
			$('#storeresults').show();
 			$('#spanId').html("");
 			//$('#spanId').append(searchResult);
 			$('#tbodyId').html("");	
 			//$("#fisaddtobag").hide();
			$("#button_primary").attr("disabled", "disabled").removeClass("button_prim_green").addClass('button_prim_greeninactive');
 						 	
 			$.each(data, function(i, item) {
 				var cls, pgn;
 				var iconCount = 0;
 				var quantityStatus = false, clearanceFlag = false, productEligibilityFlag = true;
 				
 				if(!isLocalCall) {
	 				resetMapArea();
	 	 			pristineData.availableStores = item.concat();
	 	 			currentStores.availableStores = pristineData.availableStores.concat();
 				}
 				storeDetails.availableStores= item;
 				$.each(item, function(storeCount, st) {

 					if(!isLocalCall) {
	    					if(st.bopusEligible){
	    						storePickup.availableStores.push(st);   						
	    					}
	    					if(st.inventoryStatus == "Available" || st.inventoryStatus == "Low"){
	    						storeAvail.availableStores.push(st);
	    					}
	    					if((st.inventoryStatus == "Available" || st.inventoryStatus == "Low") && st.bopusEligible){
	    						storeAvailPickup.availableStores.push(st);
	    					}
 					} 
 					
 					var ano=st.storeNumber;
 					if(isEmpty(ano)){
 						if(!isEmpty(st.errorCode)){
 							$('#spanId').html("");
 							$('#tbodyId').html("");
 							$('#storeresults').hide();
 						//	$("#errorMessage span").html("Service is currently unavailable. Please try again later");
 						}
 					}else {
 						 pgn = incr == 0 ? 1 : Math.floor(incr/3) + 1;
 	    				 dsp = pgn == 1 ? "table-row" : "none"; 
 						var inventoryClass = "available";
 						    if(st.inventoryStatus != "Available" || st.inventoryStatus != "Low" ){
 						    	inventoryClass = "notavailable";	
 						   }	
								var quantityClass = "qHide";
								if(st.bopusEligible == true){
								quantityClass = "qShow";
								quantityStatus = true;
								}
								if(st.productPickUpEligibilityFlag == false){
									productEligibilityFlag = false;
								}
								if(st.storeClearanceFlag == true){
									clearanceFlag = true;
								}
		    				$('#myTable').append("<tr pgn=" + pgn + " class='addlist " + inventoryClass + " "+quantityClass+"' id=tr-"+ano+ " style=display:" + dsp + " />" );
		    					incr++;
		    					iconCount++;
		    					if(iconCount == 1)
		    					{
		    						$('#tr-'+ano).append("<td class='A_Icon' id=tdPrimStore-"+ano+'/>');
		    					}
		    					else if(iconCount == 2)
		    					{
		    						$('#tr-'+ano).append("<td class='B_Icon' id=tdPrimStore-"+ano+'/>');
		    					}
		    					else 
		    					{
		    						$('#tr-'+ano).append("<td class='C_Icon' id=tdPrimStore-"+ano+'/>');
		    						iconCount = 0;
		    					}
		    					$('#tr-'+ano).append("<td class='store' id=tdStoreInfo-"+ano+'/>');
		    					//START : code modified for mingle story 100
								if(isGWPProduct == 'false'){
									$('#tr-'+ano).append("<td class=enterquantity id=tdStoreQuantity-"+ano+'/>');
								}
								//END : code modified for mingle story 100
		    					$('#tr-'+ano).append("<td class=available id=tdStoreInventory-"+ano+'/>');
		    					$('#tdStoreInfo-'+ano).append("<div id=storeADD-"+ano+"/>");
		    					//onMouseOver=javascript:function () { $('#details-'+ano).show();}
		    					$('#storeADD-'+ano).append("<ul class=storeliststyle id=infoUl-"+ano+"/>").html();
		    					
		    					var storeName=st.storeName;
		                        var phoneNumber = st.dayPhone;
		                        var isPickUpAvailable = "";
		                        if(st.bopusEligible === true )
		                        {
		                        	if(st.storeClearanceFlag === false && productEligibilityFlag == true){
									isPickUpAvailable = "<div class='pick_up_in_store'></div>";
		                        	$("#pickinstore").show();
		                        	}		                
								}
		                        if(quantityStatus == false){
		                        	isPickUpAvailable = "";
		                        	$("#pickinstore").hide();
		                        }
		       					$('#infoUl-'+ano).append("<li id=storeName-"+ano+"><a class='storesheadertext' href='javascript:;'>"+storeName+'</a></li>');
		       					$('#infoUl-'+ano).append("<li id=storeName-"+ano+">"+isPickUpAvailable+'</li>');
		    					$('#infoUl-'+ano).append("<li id=storeStreet-"+ano+"-1>"+st.addressLine1+'</li>');
								$('#infoUl-'+ano).append("<li id=storeStreet-"+ano+"-2>"+st.addressLine2+'</li>');
		    					$('#infoUl-'+ano).append("<li id=storeAddress-"+ano+">"+st.city+',&nbsp;'+st.state+'&nbsp;'+st.zipCode+'</li>');
								if(phoneNumber != "")		    					
								$('#infoUl-'+ano).append("<li id=storePhone-"+ano+">1&nbsp;"+phoneNumber+'</li>');
		    					$('#infoUl-'+ano).append("<li id=distanceSpan-"+ano+"><p class='fleft mright5'>approx&nbsp;"+st.distance+'&nbsp;mi </p></li>');	    				
		    					if (mapEnabled) 
		    					{
		    						$('#distanceSpan-'+ano).append('<p class="fleft" id=distanceP-'+ano+'/>');
			    					var link = $("<a class='bluetext'></a>").attr("href", "javascript:").attr("id", "dDirections-"+ano).html("Directions");
			    					$('#distanceP-'+ano).append('- ').append(link);
		    					}
		
		    					if((st.bopusEligible === true && (st.handsOnQuantity > 0)
		    							&& st.storeClearanceFlag === false) 
		    							|| (st.bopusEligible === true 
				    							&& (st.handsOnQuantity > 0)
				    							&& st.storeClearanceFlag === false && productEligibilityFlag == true)){		
		    						//START : code modified for mingle story 100
		    						if(isGWPProduct == 'false'){
		    							$('#tdStoreQuantity-'+ano).append("<div id=StoreQuantity-"+ano+"><div class='decbtn display-none' onclick='increment(this);' id=StoreQuantityDecbtn-"+ano+">-</div><input type='text' tabindex='5' size='2' alt="+ano+" class='valnumeric fleft qty_txt_box mleft20' value='' onkeyup='enableAddTobag(this.alt,this.value, this);' id=StoreQuantityInput-"+ano+"/><div class='incbtn' onclick='increment(this);' id=StoreQuantityIncbtn-"+ano+">+</div><div class='clear'></div><span class='fontred display-none' id=quantityInventory-"+ano+">"+st.handsOnQuantity+" available</span></div>");
		    						}
		    						//END : code modified for mingle story 100
									
		    						/*$(".valnumeric").keyup(function(){
     
    								$("#button_primary").attr("disabled", "disabled").removeClass("button_prim_green").addClass('button_prim_greeninactive');
								    
								    $(".valnumeric").each(function(){
								        if(this.value.length > 0 && this.value >= 0){
		    									var storeIDselected = this.alt;
		    									var enteredQuantity = this.value;
		    									$("#button_primary").removeAttr("disabled").addClass("button_prim_green").removeClass('button_prim_greeninactive');
		    									 $('#findinstore .fis_sucessfullATB').addClass('display-none');
		    									var selectedStoreNum = $("#selectedStoreID").val();
		    									var selectedQuantity = $("#quantitySelected").val();
		    									//alert("Alert = "+ssid);
		    									if(enteredQuantity == 0){
		    										$("#quantitySelected").remove();
		    										$("#selectedStoreID").remove();
		    										$("#button_primary").attr("disabled", "disabled").removeClass("button_prim_green").addClass('button_prim_greeninactive');
		    										$('#findinstore .fis_sucessfullATB').addClass('display-none');
		    									}
		    									
		    									if(selectedStoreNum == undefined){		    										
		    										$('#button_primary').append("<input name=selectedStoreID id=selectedStoreID type=hidden value="+storeIDselected+" />");
		    										$('#button_primary').append("<input name=quantitySelected id=quantitySelected type=hidden value="+enteredQuantity+" />");
		    									}	
		    									if(selectedQuantity != enteredQuantity && enteredQuantity != " " ) {
	    											$("#quantitySelected").remove();
	    											$('#findinstore .fis_sucessfullATB').addClass('display-none');
	    											$("#selectedStoreID").remove();
	    											$('#button_primary').append("<input name=selectedStoreID id=selectedStoreID type=hidden value="+storeIDselected+" />");
	    											$('#button_primary').append("<input name=quantitySelected id=quantitySelected type=hidden value="+enteredQuantity+" />");
	    										}
		    								}
		    							});
		    							var buttonActive = $("#button_primary").attr("disabled");
		    							if(buttonActive == 'disabled') {
		    								$("#selectedStoreID").remove();
		    								$("#quantitySelected").remove();
		    							}
		    						});*/
		    						
			    					$('.valnumeric').bind('keypress', function (event) {
			    					  var searchSpecial = '$Tab$';
			    					  if (searchSpecial.indexOf('$' + event.key + '$') < 0) 
			    					  {
			    					    var regex = new RegExp("^[0-9\b]+$");
			    					    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
			    					    if (!regex.test(key)) {
			    					       event.preventDefault();
			    					       return false;
			    					    		}
			    					   } 
			    					});					    					
		    					}	    					
		    					else if((st.bopusEligible === true 
		    							&& (st.handsOnQuantity < 0))
		    							|| (((st.bopusEligible === false && clearanceFlag == true )
		    									||(st.bopusEligible === true && clearanceFlag == true )
		    									||(st.bopusEligible === false && clearanceFlag == false ))
		    									&& (st.handsOnQuantity < 0) || (clearanceFlag == true && (st.handsOnQuantity > 0)))
		    							){
		    						//START : code modified for mingle story 100
		    						if(isGWPProduct == 'false'){
		    							$('#tdStoreQuantity-'+ano).append("<div id=StoreQuantity-"+ano+"><input type='text' size='2' class='valnumeric fleft qty_txt_box_disabled' disabled='disabled' id=StoreQuantityInput-"+ano+"/></div>");
		    						}
		    						//END : code modified for mingle story 100
		    					}

		    					var inventoryStatus=getInventoryStatus(st.inventoryStatus);
		    					$('#tdStoreInventory-'+ano).append("<div id=storeInventory-"+ano+"/>");
		    					$('#storeInventory-'+ano).append('<span id=stockSpan-'+ano+'>'+inventoryStatus+'</span>');
		    					//$('#stockSpan-'+ano).append('<p id=stockCount-'+ano+'>' +st.handsOnQuantity +'</p>');
		    	
		    					$.each(st.storeWorkingHours, function(day,time) {
		    						
		    						$('#tdStoreInfo-'+ano).append("<div class=store style=display:none id=storeTime-"+ano+"/>");
		    						if(day=='DAY1'){
		    							$('#storeTime-'+ano).append("<li class='clearfix' id=storeTime-"+day+"> <span style=float:left;width:25px;>M:</span><span style=float:left> "+time+"</span></li>");
		    						}
		    						if(day=='DAY2'){
		    							$('#storeTime-'+ano).append("<li class='clearfix' id=storeTime-"+day+"> <span style=float:left;width:25px;>TU:</span><span style=float:left> "+time+"</span></li>");
		    						}
		    						if(day=='DAY3'){
		    							$('#storeTime-'+ano).append("<li class='clearfix' id=storeTime-"+day+"> <span style=float:left;width:25px;>W:</span><span style=float:left> "+time+"</span></li>");
		    						}
		    						if(day=='DAY4'){
		    							$('#storeTime-'+ano).append("<li class='clearfix' id=storeTime-"+day+"> <span style=float:left;width:25px;>TH:</span><span style=float:left> "+time+"</span></li>");
		    						}
		    						if(day=='DAY5'){
		    							$('#storeTime-'+ano).append("<li class='clearfix' id=storeTime-"+day+"> <span style=float:left;width:25px;>F:</span><span style=float:left> "+time+"</span></li>");
		    						}
		    						if(day=='DAY6'){
		    							$('#storeTime-'+ano).append("<li class='clearfix' id=storeTime-"+day+"> <span style=float:left;width:25px;>SA:</span><span style=float:left> "+time+"</span></li>");
		    						}
		    						if(day=='DAY7'){
		    							$('#storeTime-'+ano).append("<li class='clearfix' id=storeTime-"+day+"> <span style=float:left;width:25px;>SU:</span><span style=float:left> "+time+"</span></li>");
		    						}
		    					});	
	    				}				
 				});
 												
				if(productEligibilityFlag == false || quantityStatus == false){
					$('.quantity_head').hide();
					$('.enterquantity').hide();
				 	$("#fisaddtobag").hide();
					}
				else{
					$('.quantity_head').show();
					$('.enterquantity').show();
					$("#fisaddtobag").show();
				}
				
 				if(!isLocalCall) {
					var location = "";
					
					if($.trim($("#input-city").val()) != "" && isNaN($('#input-address').val())){
						location = $.trim($("#input-city").val());
					}
					else if($.trim($("#input-state").val()) != "" && isNaN($('#input-address').val())){
					location = $.trim($("#input-state").val());
					}
					else if($.trim($("#input-zip").val()) != ""){
						location = $.trim($("#input-zip").val());
						}
					fisCount = storeDetails.availableStores.length;
	     	 		$('#result_text').html("There are "+fisCount+" stores within 50 miles of "+location);
				}															
 			});
 			 			
 			if(window.parent.document.getElementById('qvfisDiv')!=null){
					window.parent.parent.document.getElementById('fancybox-content').style.height= '820px';
					window.parent.document.getElementById('qvfisDiv').style.height= '820px';
			    		if ($.browser.msie || $.browser.webkit){
				    		var mytableheight=$('#myTable').height()+950;
					    	window.parent.document.getElementById('qvfisDiv').style.height= mytableheight;
			    		}	    	
				    	else{
			    			window.parent.document.getElementById('qvfisDiv').style.height= '820px';
			    		}
			    	}
			else
				window.parent.document.getElementById('fancybox-content').style.height= '820px';
 			
 			totalPages = Math.ceil(incr/3);
 			showPage(1, status);
 			//checkAvailability();
 			if(window.google){
 				initMap();
 			}			
 			$("#myTable").trigger("update");			
 		}
 		else {
 			if(window.parent.document.getElementById('qvfisDiv')!=null){
 				window.parent.parent.document.getElementById('fancybox-content').style.height= '310px';
     			window.parent.document.getElementById('qvfisDiv').style.height= '300px';
 			}
 			else{ 
 				window.parent.document.getElementById('fancybox-content').style.height= '310px';
 			}
 			$('#spanId').html("");
 			$('#tbodyId').html("");
 			$('#storeresults').hide();
 			//$("#errorMessage span").html("Service is currently unavailable. Please try again later");
 			if(!googleError)
 	    		$("#errorMessage span").html("Service is currently unavailable. Please try again later");
 	    	else 
 	    		$("#errorMessage span").html("We could not find the location you entered. Please try again later");
 			$("#errorMessage").show();
			$("#fis_address").addClass("redborder");
 		}
 	  } else {		  		  
 		 $('#spanId').html("");
			$('#tbodyId').html("");
			$('#storeresults').hide();
			//$("#errorMessage span").html("Service is currently unavailable. Please try again later");
			if(!googleError)
 	    		$("#errorMessage span").html("Service is currently unavailable. Please try again later");
 	    	else 
 	    		$("#errorMessage span").html("We could not find the location you entered. Please try again later");
			$("#errorMessage").show();
			storeLocatorHeight();
			$("#fis_address").addClass("redborder");			 		
 	  }	
 	}	 
	 
	(function(e,b){var a=/\+/g;function d(f){return f;}function c(f){return decodeURIComponent(f.replace(a," "));}e.cookie=function(k,j,o){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(j))||j==null)){o=e.extend({},e.cookie.defaults,o);if(j==null){o.expires=-1;}if(typeof o.expires==="number"){var l=o.expires,n=o.expires=new Date();n.setDate(n.getDate()+l);}j=String(j);return(b.cookie=[encodeURIComponent(k),"=",o.raw?j:encodeURIComponent(j),o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join(""));}o=j||e.cookie.defaults||{};var f=o.raw?d:c;var m=b.cookie.split("; ");for(var h=0,g;(g=m[h]&&m[h].split("="));h++){if(f(g.shift())===k){return f(g.join("="));}}return null;};e.cookie.defaults={};})(jQuery,document);
	
	/** ATG - 5813 ***/
	$(document).ready(function(){
		 if ($.browser.msie) {		
			  $('.rtmapdrcontent #input-source').focusin(function()
			  {
				var $input_source = $(".rtmapdrcontent #input-source");
				$input_source.attr("data-placeholder-txt", $input_source.attr("placeholder"));
				var this_input = $(this);
				var plc_hldr_txt = this_input.attr('data-placeholder-txt');
				var txt_value = this_input.val();
				if(plc_hldr_txt == txt_value){
					this_input.val("");
				}
			  });

			  $('.rtmapdrcontent #input-source').focusout(function()
			  {
				var $input_source = $(".rtmapdrcontent #input-source");
				var this_input1 = $(this);
				var plc_hldr_txt1 = this_input1.attr('data-placeholder-txt');
				var txt_value = this_input1.val();
				 if(plc_hldr_txt1 == ""){
					this_input1.val(plc_hldr_txt1);
				}
			  });
		}
	});

	/** ATG - 5813 ***/
	
   