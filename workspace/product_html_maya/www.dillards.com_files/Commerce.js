var busy = false;

function Add2ShopCart(form) {
    if (!busy) {
        busy = true;
        form.action = "/webapp/wcs/stores/servlet/OrderItemAdd";
        form.URL.value = "ProductDisplay?calculationUsageId*=";
        form.submit()
    }
}

function Add2WishList(form) {
 	if (!busy){
		$("#add-wishlist").trigger("cmWishListAddEvent");
		busy = true;
		var numItems = StripExcessFields(form);
		form.action = "/webapp/wcs/stores/servlet/InterestItemAdd";
		form.URL.value = "ProductDisplay?calculationUsageId*=";
		//form.URL.value = "ProductDisplayView";
		//form.URL.value = "InterestItemDisplay?orderItemId*=&catEntryId_*=&itemPartNum_*=&quantity_*=&attrNum_*=&URL=InterestItemDisplayView";
		if($("#welcome").html() == undefined && (jQuery(form).serialize().length > 1000 || ($.browser.msie && parseInt($.browser.version) === 8))){
			window.location = "/webapp/wcs/stores/servlet/LogonForm?rURL="+encodeURI(document.URL+"&InterestItemAdd=1&interestItemAdded=N");
 		}else{
			$(form).append('<input type="hidden" name="finalView" value="LogonForm" />');
			if(jQuery(form).serialize().length < 700){
	 			$(form).append('<input type="hidden" name="interestItemAdded" value="Y" />');
	 			form.rURL.value = "InterestItemAdd?" + jQuery(form).serialize();
 			}else{
	    		if(document.URL.length < 700){
	    			form.rURL.value = encodeURI(document.URL+"&InterestItemAdd=1&interestItemAdded=N");
 	    		}
	    	}
			if($("#backLink").html() != undefined && $("#welcome").html() != undefined)
	    	{
	    		var wlb2b = $("#backLink").attr("href");
	   			$(form).append('<input type="hidden" name="back2Browse" value="' + wlb2b + '" />');
	    	}
			form.submit();
		}
    }
}

function StripExcessFields(form) {
	$form = $(form);
	$quantities = $form.find('[name^="quantity_"]');
	$catEntries = $form.find('[name^="catEntryId_"]');
	$partNumbers = $form.find('[name^="itemPartNum_"]');
	$attrValues = $form.find('[name^="attrValue_"]');
	$attrNames = $form.find('[name^="attrName_"]');
	$form.find('[name="singleAttrCatId"]').remove();
	$form.find('[name="singleAttrValue"]').remove();
	$form.find('[name="isSingleAttrValue"]').remove();
	
	var $hasQuantity = new Array();
	$quantities.each(function( index ){
		if($(this).val() > 0){
			$hasQuantity.push($(this).prop("name").replace("quantity_", ""));
		}
	});
	
	$attrValues.each(function( index ){
		if($.inArray($(this).prop("name").replace("attrValue_", "").substring(0, 2), $hasQuantity) == -1){
			$(this).remove();
		}
	});
	
	$attrNames.each(function( index ){
		if($.inArray($(this).prop("name").replace("attrName_", "").substring(0, 2), $hasQuantity) == -1){
			$(this).remove();
		}
	});
	
	$partNumbers.each(function( index ){
		//if($.inArray($(this).prop("name").replace("itemPartNum_", ""), $hasQuantity) == -1){
			$(this).remove();
		//}
	});
	
	$catEntries.each(function( index ){
		if($.inArray($(this).prop("id").replace("catEntryId_", ""), $hasQuantity) == -1){
			$(this).remove();
		}
	});
	
	$quantities.each(function( index ){
		if($.inArray($(this).prop("name").replace("quantity_", ""), $hasQuantity) == -1){
			$(this).remove();
		}
	});
	return $hasQuantity.length;
}

function Add2Registry(form) {
    if (!busy) {
		 $("input[name='userId']").remove();
        busy = true;
        if($("#backLink").html() != undefined){
        	var regb2b = $("#backLink").attr("href");
    		$(form).append('<input type="hidden" name="back2Browse" value="' + regb2b + '" />');
        }
        form.action = "/webapp/wcs/stores/servlet/ItemRegistryAdd";
        form.submit();
    }
}

function AjaxAdd2WishList(form,grouping) {
 	 if ($("#welcome").html() == undefined && $.browser.msie) {
		 Add2WishList(form);
	 } else {
		 var storedUserId = "";
		 if($("input[name='userId']").length > 0) storedUserId = $("input[name='userId']")[0].outerHTML;
		 $("input[name='userId']").remove();
		 $.ajax({
	        url: "/webapp/wcs/stores/servlet/InterestItemAdd",
	        cache: false,
	        type: "POST",
	        data: jQuery(form).serialize(),
	        beforeSend: function () {    
	        	$("#added-to-wishlist-modal").removeClass().addClass("DillardsModal");
         		$("#added-to-wishlist").html("<div id='modalContent' class='addingToBag'><div class='DillardsModalTitle'>Processing ...</div><div class='processingModalText'>Adding to Your Wish List</div><div align='center' style='padding-top: 10px;'><span><img src='/images/common/loader-big.gif'></span></div></div>");
  	            $("#added-to-wishlist-modal").DillardsModalOpen();
  	          	$('#added-to-bag-modal').DillardsModalClose();
	        },
	        error: function (html) {
	        	Add2WishList(form);
	        },
	        success: function (html) {
	        	$("#add-wishlist").trigger("cmWishListAddEvent");
	        	if (html.search("<title>Dillards - Login/My Account</title>") != -1 || (html.search("<h2>For security, please enter your password</h2>") != -1)) {
	        		Add2WishList(form);			  
	        		$("#added-to-wishlist-modal").DillardsModalClose();
	        	}else{
	        		if(storedUserId.length > 0) $(form).append(storedUserId);
	        		$("#added-to-wishlist").html(html); 
	        		if("undefined" != typeof runMonetateTestAWL1) runMonetateTestAWL1();
		        	if("undefined" != typeof runMonetateTestAWL2) runMonetateTestAWL2();
		        	if("undefined" != typeof runMonetateTestAWL3) runMonetateTestAWL3();
		        	if("undefined" != typeof runMonetateTestAWL4) runMonetateTestAWL4();
		        	if("undefined" != typeof runMonetateTestAWL5) runMonetateTestAWL5();
	        		$(window).trigger("resize");
	        		$("#added-to-wishlist-modal").find(".modalTitle").text("Added to Your Wish List");
	        	}
	        	if (grouping != undefined) {
	        		resetQuantities();
	        	}
	         }        
	    });
	 }
	 return false;
}	


function AjaxPdpFormSubmit(form, singleAttr, grouping) {
    $.ajax({
        url: "/webapp/wcs/stores/servlet/OrderItemAdd",
        cache: false,
        type: "POST",
        data: jQuery(form).serialize(),
        beforeSend: function () {
        	$("#qvContent").hide();
        	$("#added-to-bag").show();
    		$("#added-to-bag-modal").removeClass().addClass("DillardsModal");
        	$("#added-to-bag").html("<div id='modalContent' class='addingToBag'><div class='DillardsModalTitle'>Processing ...</div><div class='processingModalText'>Adding to Your Shopping Bag</div><div align='center' style='padding-top: 10px;'><span><img src='/images/common/loader-big.gif'></span></div></div>");
             $("#added-to-bag-modal").DillardsModalOpen();
        },
        success: function (html) {
            if (html.search("error-msg") == -1) {
                $("#added-to-bag").html(html).find(".modalMessage").hide();
                if("undefined" != typeof runMonetateTestACM1) runMonetateTestACM1();
            	if("undefined" != typeof runMonetateTestACM2) runMonetateTestACM2();
            	if("undefined" != typeof runMonetateTestACM3) runMonetateTestACM3();
            	if("undefined" != typeof runMonetateTestACM4) runMonetateTestACM4();
            	if("undefined" != typeof runMonetateTestACM5) runMonetateTestACM5();
                $("#added-to-bag-modal").addClass($("#added-to-bag").find(".modalClassName").eq(0).text()).DillardsModalOpen();
                var newTitle = $("#added-to-bag").find(".DillardsModalTitle").eq(0).text();
                if (newTitle.length > 0) {
                	
                	$("#added-to-bag-modal").find(".modalTitle").text(newTitle);
                }
                if (hasBeenOpened == true) {
                    $("#myDillardsRightFrame").prop("src", $("#myDillardsRightFrame").prop("src"))
                }
                $("#added-to-bag").show();
            } else {
                Add2ShopCart(form)
            }
            if (grouping != undefined) {
        		resetQuantities();
        	}
        }
    });
    return false
}


function onPrediction(productId, size) {
	var attrClass = ".fpSize_" + productId;
	if ($(attrClass).size()) {
		$(attrClass).val(size).trigger("change");
	};
};

window._fpq = window._fpq || [];
_fpq.push( [ "subscribe", "prediction", onPrediction ]);