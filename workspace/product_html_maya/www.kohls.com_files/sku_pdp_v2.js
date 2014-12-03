$(document).ready(function(){ 
	/**START: code to disable the skava left and right buttons */

	$('.khwl_AddToListLeftBtn').on('click',false);
	$('.khwl_AddToListRightBtn').on('click',false);
	$('.khrg_AddToListLeftBtn').on('click',false);
	$('.khrg_AddToListRightBtn').on('click',false);
	$('.khwl_AddToListUpdateLeftBtn').on('click',false);
	$('.khwl_AddToListUpdateRightBtn').on('click',false);
	$('.khrg_AddToListUpdateLeftBtn').on('click',false);
	$('.khrg_AddToListUpdateRightBtn').on('click',false);
	
	/**END: code to disable the skava left and right buttons */
	
	//<---START :code for preSelected skuId--->
	var preSelectedSkuId = $('.preSelectedskuId').val();
	var productId = "";
	var product_skuId = "";
	var prodID = "";
	var skuID = "";
	if(preSelectedSkuId != "" && preSelectedSkuId !=undefined){
		product_skuId = preSelectedSkuId.split("_");
		prodID = product_skuId[0]; 
		skuID = product_skuId[1];
	}
	
	$("input[name='fisPageName']").val("sku_pdp");
	if(skuID != "" && skuID !=undefined){
		for(var i in allVariants.variants){				
			if(allVariants.variants[i].skuId == skuID){
				var iStatus=allVariants.variants[i].inventoryStatus;
				var skuUpcCode = allVariants.variants[i].skuUpcCode;				
				if(iStatus == "true"){
					if(document.getElementById('addToBagId_T'+prodID) != null){
						document.getElementById('addToBagId_T'+prodID).className = 's-addtoBag';	
					}
					$('#add_to_list_'+prodID).removeClass('skava_add_to_list_class');
					$('#add_to_list_'+prodID).addClass('active-skava-item');
					$('#add_to_list_'+prodID).find('#skava_buttons_active').css({ display: "block" });
					$('#add_to_list_'+prodID).find('#skava_buttons_inactive').css({ display: "none" });
					if(document.getElementById('addToBagSkuId_T'+prodID) != null){
						document.getElementById('addToBagSkuId_T'+prodID).value = skuID;
					}
					if(document.getElementById('skava_skuUpcCode') != null){						
						document.getElementById('skava_skuUpcCode').value = skuUpcCode;
					}
					if(document.getElementById('inventoryStatusId_T'+prodID) != null){
						document.getElementById('inventoryStatusId_T'+prodID).innerHTML = 'In Stock';
					}
					/**Enable the find in store button */
                    if(document.getElementById('fisSkuDetailsMuted_'+prodID) != null){
                    	var title=$('.productTitleName').text();
                    	if(title== "undefined" || title == ""){
							title=br_data.prod_name;
						}
                    	
                    	var imageSrc=$('#easyzoom_wrap img').attr('src');
    					var imageUrl = imageSrc.slice( 0, imageSrc.indexOf('?') );
    					 
	                	$('input[name=fisImageURL_'+prodID+']').val(imageUrl);
	                	$('input[name=fisTitleName_'+prodID+']').val(title);
	                	
	                
                     	$('input[name=fisSkuId_'+prodID+']').val(skuID);
                     	$('input[name=fisProductId_'+prodID+']').val(prodID);
						
                     	$('input[name=fisOriginalPrice_'+prodID+']').val(allVariants.variants[i].SkuRegularPrice);
                     	$('input[name=fisSalePrice_'+prodID+']').val(allVariants.variants[i].SkuSalePrice);
                    	$('input[name=fisSaleLabel_'+prodID+']').val(allVariants.variants[i].salePriceLabel);
                    	$('input[name=fisRegLablel_'+prodID+']').val(allVariants.variants[i].regularPriceLabel);
				
                    	
	                    $('#fisSkuDetailsMuted_'+prodID).addClass('showStorelocatoroverlay');
	                   
	                    $('#btn_findInStore_'+prodID).removeClass('add2store');
	                    $('#btn_findInStore_'+prodID).addClass('s-addtostore');
	                    
	                    $('input[name=fisIsSuppresed_'+prodID+']').val(allVariants.variants[i].IsSuppressed);
	                    
                    }
                   
				}else{
					if(document.getElementById('inventoryStatusId_T'+prodID) != null){
						document.getElementById('inventoryStatusId_T'+prodID).innerHTML = 'Out Of Stock';
						document.getElementById('addToBagId_T'+prodID).className = 'add2bag';
						$('#add_to_list_'+prodID).addClass('skava_add_to_list_class');
						$('#add_to_list_'+prodID).removeClass('active-skava-item');
						$('#add_to_list_'+prodID).find('#skava_buttons_active').css({ display: "none" });
						$('#add_to_list_'+prodID).find('#skava_buttons_inactive').css({ display: "block" });
					}
				}
			}
		}
	}
	//<---END :code for preSelected skuId--->
	//<---END :code for preSelected skuId--->
	if($('.zeroVariant').val() != 1){
		//<---START :code for preSelected color & pSize and Ssize values--->
		//Defect fix ATG-5981
		setQuantityPDP();	
		var preSelectedColorId="";
		var PId_colorValue = "";
		preSelectedColorId=$('.preSelectedColorId').val();
		if(preSelectedColorId != "" && preSelectedColorId !=undefined){
			PId_colorValue = preSelectedColorId.split("_");	
		}
		if(PId_colorValue[1] =="" || PId_colorValue[1] ==undefined){
			preSelectedColorId =undefined;
		}
		var preSelectedPSizeId="";
		var PId_PSizeValue = "";
		preSelectedPSizeId=$('.preSelectedPrimarySize').val();
		if(preSelectedPSizeId != "" && preSelectedPSizeId !=undefined){
			PId_PSizeValue = preSelectedPSizeId.split("_");	
		}
		var preSelectedSSizeId="";
		var PId_SSizeValue = "";
		preSelectedSSizeId=$('.preSelectedSecondarySize').val();
		if(preSelectedSSizeId != "" && preSelectedSSizeId !=undefined){
			PId_SSizeValue = preSelectedSSizeId.split("_");	
		}
		if(PId_colorValue[1] !="" && PId_colorValue[1] !=undefined){			
			$('span#s-color-value-pdt').empty();
			$('span#s-color-value-pdt').append(PId_colorValue[1]);
			$('#selection .s-color-detail').append(PId_colorValue[1]+',');		
			getSkuId();
			updateVariants(preSelectedColorId);	
		}		
		if(PId_PSizeValue[1] !="" && PId_PSizeValue[1] !=undefined){
			$('span#s-waist-size').empty();
			$('span#s-waist-size').append(PId_PSizeValue[1]);
			$("#size-drop-down").find("option[value='"+PId_PSizeValue[1]+"']").attr("selected","selected");
			$('#selection .s-waist-detail').append(PId_PSizeValue[1]+',');	
			getSkuId();
			updateVariants(preSelectedColorId);
		}
		if(PId_SSizeValue[1] !="" && PId_SSizeValue[1] !=undefined){
			$('span#s-inseam-size').empty();
			$('span#s-inseam-size').append(PId_SSizeValue[1]);
			$('#selection .s-inseem-detail').append(PId_SSizeValue[1]+',');	
			getSkuId();
			updateVariants(preSelectedColorId);
		}
		//<---END :code for preSelected color & pSize and Ssize values--->
	}
	//<---START :code for zero variant/single sku --->
	$('.zeroVariant').each(function(){		
		var PId=$(this).attr('id');		
		if(allVariants.variants[0] != undefined){
			var skuID_new=allVariants.variants[0].skuId;
			var upcCode_new=allVariants.variants[0].skuUpcCode;			
			var iStatus_new=allVariants.variants[0].inventoryStatus;
			if(iStatus_new == "true"){					
				/*if(document.getElementById('displayYourPrice') != undefined){
					document.getElementById('displayYourPrice').style.display = 'block';
				}*/
				if(document.getElementById('addToBagSkuId_'+PId) != null){ 				
					document.getElementById('addToBagSkuId_'+PId).value = skuID_new;										
				}
				/*START PWP CR-mingle story 2979 for displaying Your Price for single sku*/	
				if($(".displayYourPrice") != undefined){
					$(".displayYourPrice").show();
				}
				/*END PWP CR-mingle story 2979 for displaying Your Price for single sku*/					
					if(document.getElementById('inventoryStatusId_'+PId) != null){
						document.getElementById('inventoryStatusId_'+PId).innerHTML = 'In Stock';
					}
					var gwpProductID = $('#giftpro').find('.Gwp_productId').attr("id");
					
					if(gwpProductID != undefined && gwpProductID != ''){			
						if(document.getElementById('gwp_Product_addToBag') != undefined){
							document.getElementById('gwp_Product_addToBag').style.display = 'block';
						}
						var gwpSkuID = $('#giftpro').find('.Gwp_skuId').attr("id");						
						if(document.getElementById('buy_product_skuId_0') != undefined){
							document.getElementById('buy_product_skuId_0').value = skuID_new;
						}
						if(document.getElementById('get_product_skuId_0') != undefined){
							document.getElementById('get_product_skuId_0').value = gwpSkuID;
						}
						if(document.getElementById('get_product_skuId_1') != undefined){
							document.getElementById('get_product_skuId_1').value = gwpSkuID;
						}
						if(document.getElementById('get_product_id') != undefined){
							document.getElementById('get_product_id').value = gwpProductID;
						}
						if(document.getElementById('buy_product_skuId_1') != undefined){
							document.getElementById('buy_product_skuId_1').value = skuID_new;	
						}										
					var p_id = PId.substring(1,PId.length);	
					$('#add_to_list_'+p_id).removeClass('skava_add_to_list_class');
					$('#add_to_list_'+p_id).addClass('active-skava-item');
					$('#add_to_list_'+p_id).find('#skava_buttons_active').css({ display: "block" });
					$('#add_to_list_'+p_id).find('#skava_buttons_inactive').css({ display: "none" });
				}
					var replaceAddToCart =$("#dynamicDisplayGWPAddToCart").attr("value");
					var replacePWPAddToCart =$("#dynamicMessageDisplayPWP").attr("value");
					if((replaceAddToCart != undefined && replaceAddToCart == "true" )|| (replacePWPAddToCart != undefined && replacePWPAddToCart == "true")){
						//Fix for Defect ATG-5899
						setQuantityPDP();
						dynamicGWPAddToCartANDMsgDisplay();

					}else{					
						dynamicGWPAddToCart(PId,skuID_new,'displayOffermsg');	
					}
				if(document.getElementById('addToBagSkuId1_'+PId) != null){				
					document.getElementById('addToBagSkuId1_'+PId).value = skuID_new;				
				}
				if(document.getElementById('skava_skuUpcCode') != null){
					document.getElementById('skava_skuUpcCode').value = upcCode_new;					
				}
				if(document.getElementById('inventoryStatusId_'+PId) != null){
					document.getElementById('inventoryStatusId_'+PId).innerHTML = 'In Stock';
				}
				/*if(document.getElementById('ReciveFreeGift') != undefined){
					document.getElementById('ReciveFreeGift').style.display = 'block';
					}*/
				/* default styles for findinstore button */ 
				//Start : code modified to resolve issue ATGBOPUS-189 - Find Store button not anabling for single sku products
					var prodID = PId.replace("T","");
                if(document.getElementById('fisSkuDetailsMuted_'+prodID) != null){
                	var imageSrc=$('#easyzoom_wrap img').attr('src'); 
					var imageUrl = imageSrc.slice( 0, imageSrc.indexOf('?') );
					var title=$('.productTitleName').text();
					if(title== "undefined" || title == ""){
						title=br_data.prod_name;
					}
                	$('input[name=fisImageURL_'+prodID+']').val(imageUrl);
                	$('input[name=fisTitleName_'+prodID+']').val(title);
                	$('input[name=fisSkuId_'+prodID+']').val(skuID_new);
                 	$('input[name=fisProductId_'+prodID+']').val(prodID);
                 	
                 	
                 	$('input[name=fisOriginalPrice_'+prodID+']').val(allVariants.variants[0].SkuRegularPrice);
                 	$('input[name=fisSalePrice_'+prodID+']').val(allVariants.variants[0].SkuSalePrice);
                	$('input[name=fisSaleLabel_'+prodID+']').val(allVariants.variants[0].salePriceLabel);
                	$('input[name=fisRegLablel_'+prodID+']').val(allVariants.variants[0].regularPriceLabel);

                	//$('input[name=fisUPCCode_'+p_id+']').val(upcCode_new);
                	
                 	 $('#fisSkuDetailsMuted_'+prodID).addClass('showStorelocatoroverlay');

                    $('#btn_findInStore_'+prodID).removeClass('add2store');
                    $('#btn_findInStore_'+prodID).addClass('s-addtostore');
                    
                    $('input[name=fisIsSuppresed_'+prodID+']').val(allVariants.variants[0].IsSuppressed);
                
                }
              //End : code modified to resolve issue ATGBOPUS-189 - Find Store button not anabling for single sku products
			}
			else{
				if(document.getElementById('inventoryStatusId_'+PId) != null){
					document.getElementById('inventoryStatusId_'+PId).innerHTML = 'Out Of Stock';
					document.getElementById('addToBagId_'+PId).className = 'add2bag';
					var p_id = PId.substring(1,PId.length);	
					$('#add_to_list_'+p_id).addClass('skava_add_to_list_class');
					$('#add_to_list_'+p_id).removeClass('active-skava-item');
					$('#add_to_list_'+p_id).find('#skava_buttons_active').css({ display: "none" });
					$('#add_to_list_'+p_id).find('#skava_buttons_inactive').css({ display: "block" });
				}
			}	
		}
		/*var prodID = PId.replace("T","");
		$.ajax({			
			url: '/catalog/fragments/single_sku_suppressed_message.jsp',
			dataType: 'html',
			type: "POST",
			data:{productId:prodID,skuId:skuID_new},
			success: function(suppressedMSG) {			
				if(document.getElementById('suppressed_message_'+prodID) != null){
				    document.getElementById('suppressed_message_'+prodID).innerHTML =suppressedMSG;
				}
				if(document.getElementById('suppressed_message2_'+prodID) != null){
				    document.getElementById('suppressed_message2_'+prodID).innerHTML =suppressedMSG;
				}				
			}
		});	*/
		//code changes for removing ajax call- Zero variant prodcut
		var prodID = PId.replace("T","");
		if(allVariants.variants[0] != undefined){			
			var isSuppressed = allVariants.variants[0].IsSuppressed;
			if(isSuppressed == "true")	
				{
					if (storeConfigvalue == false || storeConfigvalue == "false")
					{
					 var suppressed_msg = document.getElementById('Suppressed_Message').innerHTML;						
						if(document.getElementById('suppressed_message_'+prodID) != null)
						{
							document.getElementById('suppressed_message_'+prodID).innerHTML =suppressed_msg;
						}
						if(document.getElementById('suppressed_message2_'+prodID) != null)
						{
							document.getElementById('suppressed_message2_'+prodID).innerHTML =suppressed_msg;
						}
					}
			  }	
	   }
	
	});
	//<---END :code for zero variant/single sku --->
	$(".swatch-container-new a").click(function(){
		if ($(this).parent().hasClass("no_inventory") || $(this).parent().hasClass("disabled"))
			return;
		$(".swatch-container-new").children().removeClass("disabled");
		$(".swatch-container-new").children().removeClass("no_inventory");
		$(".size-waist").children().removeClass("no_inventory");
		$(".size-inseam").children().removeClass("no_inventory");
		$("#size-range").children().removeClass("size_unavail");
		$(".size-waist").children().removeClass("size_unavail");
		$(".size-inseam").children().removeClass("size_unavail");		
		$(".size-waist").find('option').removeAttr('disabled').removeClass("size_unavail");
		$(".size-waist").find('option').removeClass("no_inventory");
		$(".size-inseam").find('option').removeAttr('disabled').removeClass("size_unavail");
		$(".size-inseam").find('option').removeClass("no_inventory");
		$("#size-range").find('option').removeAttr('disabled').removeClass("size_unavail");
		removeNotAvail();
		if($(this).find('.swatch').hasClass("active"))
		{
	    //$('.swatch-color > img').remove();	
			$(this).find('.active').find('img').remove();
		}
		
	    $(".swatch-container-new").children().removeClass('selectedActive');	 
	    //$("#size-waist").children().removeClass('selectedBorder2pxBlack');
		//$("#size-inseam").children().removeClass("selectedBorder2pxBlack");
		var colorID = $(this).parent().parent().parent().siblings().children().find(".swatch-container-new").find(".active").attr("id");
		updateVariants($(this).parent().attr("id"));
		});
		
	$("#size-range select, #size-waist select, #size-inseam select").change(function(){	
		$(".swatch-container-new").children().removeClass("disabled");
		$(".swatch-container-new").children().removeClass("no_inventory");
		$(".swatch-container-new .swatch").find("img").remove();
		$(".size-waist").children().removeClass("no_inventory");
		$(".size-inseam").children().removeClass("no_inventory");
		$("#size-range").children().removeClass("size_unavail");
		$(".size-waist").children().removeClass("size_unavail");
		$(".size-inseam").children().removeClass("size_unavail");
		$(".size-waist").find('option').removeAttr('disabled').removeClass("size_unavail");
		$(".size-waist").find('option').removeClass("no_inventory");
		$(".size-inseam").find('option').removeAttr('disabled').removeClass("size_unavail");
		$(".size-inseam").find('option').removeClass("no_inventory");
		$("#size-range").find('option').removeAttr('disabled').removeClass("size_unavail");
		removeNotAvail();
		
		
	    /*if($(this).parents('.price-holder').find('#size-waist').hasClass('size-waist')){
			$(".size-waist").children().removeClass("border2pxBlack");
			$(".size-waist").find('option').removeClass("border2pxBlack");
		}
		else if($(this).parents('.price-holder').find('#size-inseam').hasClass('size-inseam')){
			$(".size-inseam").children().removeClass("border2pxBlack");
			$(".size-waist").find('option').removeClass("border2pxBlack");
		}
		$(this).addClass('border2pxBlack'); */
	    //$("#size-waist").children().removeClass('selectedBorder2pxBlack');
		//$("#size-inseam").children().removeClass("selectedBorder2pxBlack");
		var colorID = $(this).parent().parent().siblings().children().find(".swatch-container-new").find(".active").attr("id");
		if(colorID =='' || colorID ==undefined){
        	colorID = $(this).parent().parent().siblings().children().find(".swatch-container-new").find(".selectedActive").attr("id");
        }
		if(colorID =='' || colorID ==undefined){
			colorID = $('.swatch-container-new').find(".active").attr("id");
		}
		if(colorID =='' || colorID ==undefined){
			colorID = $('.swatch-container-new').find(".selectedActive").attr("id");
		}
        updateVariants(colorID);
		});
	$("#size-range select").change(function(){
		var findText = $(this).val();
		var selector = $(this).find("option:selected").attr("name");
		$('span#s-select-size').empty();
		$('span#s-select-size').append(findText);
		if(findText != '')
		{
		$("#error_display1,#error").hide();
		$('.s-size-here').attr('value', '1');
		}
		else
		{
		removeSku();
		$('.s-size-here').attr('value', '');
		}
		getSkuId(selector);
	});
	$("#size-waist select").change(function(){
		var findText = $(this).val();
		var selector = $(this).find("option:selected").attr("name");
		$(this).parents('.price-holder').find('span#s-waist-size').empty();
		$(this).parents('.price-holder').find('span#s-waist-size').append(findText);
		$('#selection .s-waist-detail').empty();
		$('#selection .s-waist-detail').append(findText+' ');
		if(findText != '')
		{
		$("#error_display1,#error").hide();
		$('.s-waist-here').attr('value', '1');
		}	
		else
		{
		removeSku();
		$('.s-waist-here').attr('value', '');
		}
		getSkuId(selector);
	});
	$("#size-inseam select").change(function(){
		var findText = $(this).val();
		var selector = $(this).find("option:selected").attr("name");
		$(this).parents('.price-holder').find('span#s-inseam-size').empty();
		$(this).parents('.price-holder').find('span#s-inseam-size').append(findText);
		$('#selection .s-inseem-detail').empty();
		$('#selection .s-inseem-detail').append(findText+' ');
		if(findText != '')
		{
		$("#error_display1,#error").hide();
		$('.s-inseem-here').attr('value', '1');
		}
		else
		{
		removeSku();
		$('.s-inseem-here').attr('value', '');
		}
		getSkuId(selector);
	});
	$("#size-range a, #size-waist a, #size-inseam a").click(function(){
		if ($(this).parent().hasClass("size_unavail") || $(this).parent().hasClass("unavailable") || $(this).parent().hasClass("no_inventory"))
			return;
		$(".swatch-container-new").children().removeClass("disabled");
		$(".swatch-container-new").children().removeClass("no_inventory");
		$(".swatch-container-new .swatch").find("img").remove();
		$("#size-range").children().removeClass("size_unavail");
		$(".size-waist").children().removeClass("size_unavail");
		$(".size-waist").children().removeClass("no_inventory");
		$(".size-inseam").children().removeClass("size_unavail");
		$(".size-inseam").children().removeClass("no_inventory");
		$(".size-waist").find('option').removeAttr('disabled').removeClass("size_unavail");
		$(".size-waist").find('option').removeClass("no_inventory");
		$(".size-inseam").find('option').removeAttr('disabled').removeClass("size_unavail");
		$(".size-inseam").find('option').removeClass("no_inventory");
		$("#size-range").find('option').removeAttr('disabled').removeClass("size_unavail");
		removeNotAvail();
		if($(this).parents('.price-holder').find('#size-waist').hasClass('size-waist')){
			$(".size-waist").children().removeClass("border2pxBlack");
			$(".size-waist").find('option').removeAttr('disabled').removeClass("border2pxBlack");
		}
		else if($(this).parents('.price-holder').find('#size-inseam').hasClass('size-inseam')){
			$(".size-inseam").children().removeClass("border2pxBlack");
			$(".size-waist").find('option').removeAttr('disabled').removeClass("border2pxBlack");
		}
		//$(".size-waist").children().removeClass("border2pxBlack");
		//$(".size-inseam").children().removeClass("border2pxBlack");
		//$('.swatch-color > img').remove();
		$(this).parents('.size-color-block').find('.size_off_left1').removeClass('border2pxBlack');
		$(this).parent().siblings().removeClass('border2pxBlack');
		$(this).parent().addClass('border2pxBlack'); 
		//$(this).parents('.size-color-block').find('.size_off_left1').removeClass('selectedBorder2pxBlack');
		//$("#size-waist").children().removeClass('selectedBorder2pxBlack');
		//$("#size-inseam").children().removeClass("selectedBorder2pxBlack");
		var colorID = $(this).parent().parent().parent().siblings().children().find(".swatch-container-new").find(".active").attr("id");
		if(colorID =='' || colorID ==undefined){
        	colorID = $(this).parent().parent().parent().siblings().children().find(".swatch-container-new").find(".selectedActive").attr("id");
        }
		if(colorID =='' || colorID ==undefined){
			colorID = $('.swatch-container-new').find(".active").attr("id");
		}
		if(colorID =='' || colorID ==undefined){
			colorID = $('.swatch-container-new').find(".selectedActive").attr("id");
		}
        updateVariants(colorID);
		
	});
 
	});
function removeNotAvail()
{
	$(".size-waist").find('option').each(function(){
		if($(this).text() != 'Please Select Size') {
			$(this).html($(this).val())
		}
	});
	$(".size-inseam").find('option').each(function(){
		if($(this).text() != 'Please Select Size') {
			$(this).html($(this).val())
		}
	});
	$("#size-range").find('option').each(function(){
		if($(this).text() != 'Please Select Size') {
			$(this).html($(this).val())
		}
	});
}
function updateVariants(parentId)
{ 
	var col1=parentId;
	var color_no_inventory =new Array();
	var size_waist_no_inventory =new Array();
	var size_inseem_no_inventory =new Array();
	//var col1=parentId
	if(typeof($("#size-range").find(".border2pxBlack").attr("id")) === "undefined")
	{
	var siz1=$("#size-range").find("select option:selected").attr("name");	
	}
	else
	{
	var siz1=$("#size-range").find(".border2pxBlack").attr("id");
	}
	if(typeof($(".size-waist").find(".border2pxBlack").attr("id"))  === "undefined")
	{
	var siz2=$(".size-waist").find("select option:selected").attr("name");	
	}
	else
	{
	var siz2=$(".size-waist").find(".border2pxBlack").attr("id");
	}
	if(typeof($(".size-inseam").find(".border2pxBlack").attr("id")) === "undefined")
	{
	var siz3=$(".size-inseam").find("select option:selected").attr("name");
	}
	else
	{	
	var siz3=$(".size-inseam").find(".border2pxBlack").attr("id");
	}
	var s2=new Array();
	var s3=new Array();
	var c1=new Array();
	var j=0;
	var tempc1=new Array();
	var temps2=new Array();
	var temps3=new Array();
	
	if (col1 !== undefined) {
		for(var i in allVariants.variants){
			if(allVariants.variants[i].color == col1){
				if(allVariants.variants[i].inventoryStatus== "true"){
					temps2[j]=allVariants.variants[i].size2;
					temps3[j]=allVariants.variants[i].size3;
				}else{
					size_waist_no_inventory.push(allVariants.variants[i].size2);
					size_inseem_no_inventory.push(allVariants.variants[i].size3);
				}			
				j++;
			}
			
		}
		s2 = temps2;
		s3 = temps3;
		
		if(isAnyVariantSelected("color")){

			if(siz2 !== undefined){
				s3=new Array();
				for(var i in allVariants.variants){
					if(allVariants.variants[i].color === col1 && allVariants.variants[i].size2 === siz2){
						if(allVariants.variants[i].inventoryStatus== "true"){
							s3[i]=allVariants.variants[i].size3;
						}else{							
							size_inseem_no_inventory.push(allVariants.variants[i].size3);
						}
					}
				}
				
			}

			if(siz3 !== undefined){
				s2=new Array();
				for(var i in allVariants.variants){
					if(allVariants.variants[i].color === col1 && allVariants.variants[i].size3 === siz3){
						if(allVariants.variants[i].inventoryStatus== "true"){
							s2[i]=allVariants.variants[i].size2;
						}else{
							size_waist_no_inventory.push(allVariants.variants[i].size2);
						}
					}
				}
			}
		}
		
		updateSizeSection(".size-waist", s2,size_waist_no_inventory);
		updateSizeSection(".size-inseam", s3,size_inseem_no_inventory);
		updateSizeSectionDropDown(".size-waist", s2,size_waist_no_inventory);
		updateSizeSectionDropDown(".size-inseam", s3,size_inseem_no_inventory);
		
		temps2=new Array();
		temps3=new Array();
		j=0;
		
		
		
	}
	
	if (siz2 !== undefined) {
		for(var i in allVariants.variants){
			if(allVariants.variants[i].size2 == siz2){
				if(allVariants.variants[i].inventoryStatus== "true"){
					tempc1[j]=allVariants.variants[i].color;				
					temps3[j]=allVariants.variants[i].size3;
				}else{
					color_no_inventory.push(allVariants.variants[i].color);
					size_inseem_no_inventory.push(allVariants.variants[i].size3);
				}
				j++;
			}
			
		}
		c1 = mergeArray(c1, tempc1);
		s3 = mergeArray(s3, temps3);
		if(isAnyVariantSelected("size2")){

			if(col1 !== undefined){
				s3=new Array();
				for(var i in allVariants.variants){
					if(allVariants.variants[i].color === col1 && allVariants.variants[i].size2 === siz2){
						if(allVariants.variants[i].inventoryStatus== "true"){
							s3[i]=allVariants.variants[i].size3;
						}else{
							size_inseem_no_inventory.push(allVariants.variants[i].size3);
						}
					}
				}
				
			}

			if(siz3 !== undefined){
				c1=new Array();
				for(var i in allVariants.variants){
					if(allVariants.variants[i].size2 === siz2 && allVariants.variants[i].size3 === siz3){
						if(allVariants.variants[i].inventoryStatus== "true"){
							c1[i]=allVariants.variants[i].color;
						}else{
							color_no_inventory.push(allVariants.variants[i].color);
						}
					}
				}
			}
		}
		
		tempc1=new Array();
		temps3=new Array();
		j=0;
		updateColorSection(".swatch-container-new", c1,color_no_inventory);
		updateSizeSection(".size-inseam", s3,size_inseem_no_inventory);
		updateSizeSectionDropDown(".size-inseam", s3,size_inseem_no_inventory);
	}
	if (siz3 !== undefined) {
		for(var i in allVariants.variants){
			if(allVariants.variants[i].size3 == siz3){
				if(allVariants.variants[i].inventoryStatus== "true"){
					tempc1[j]=allVariants.variants[i].color;
					temps2[j]=allVariants.variants[i].size2;
				}else{
					color_no_inventory.push(allVariants.variants[i].color);
					size_waist_no_inventory.push(allVariants.variants[i].size2);
				}
				j++;
			}
		}
		
		c1 = mergeArray(c1, tempc1);
		s2 = mergeArray(s2, temps2);
		if(isAnyVariantSelected("size3")){

			if(col1 !== undefined){
				s2=new Array();
				for(var i in allVariants.variants){
					if(allVariants.variants[i].color === col1 && allVariants.variants[i].size3 === siz3){
						if(allVariants.variants[i].inventoryStatus== "true"){
							s2[i]=allVariants.variants[i].size2;
						}else{
							size_waist_no_inventory.push(allVariants.variants[i].size2);
						}
					}
				}
			}
				
			if(siz2 !== undefined){
				c1=new Array();
				for(var i in allVariants.variants){
					if(allVariants.variants[i].size2 === siz2 && allVariants.variants[i].size3 === siz3){
						if(allVariants.variants[i].inventoryStatus== "true"){
							c1[i]=allVariants.variants[i].color;
						}else{
							color_no_inventory.push(allVariants.variants[i].color);							
						}
					}
				}
			}
		}
		tempc1=new Array();
		temps2=new Array();
		j=0;
		updateColorSection(".swatch-container-new", c1,color_no_inventory);
		updateSizeSection(".size-waist", s2,size_waist_no_inventory);
		updateSizeSectionDropDown(".size-waist", s2,size_waist_no_inventory);
	}
	
	
}
function isAnyVariantSelected(current){
	var allTypes=["color","size2","size3"];
	var allRelatedClasses=[".swatch-container-new .active",".swatch-container-new .selectedActive","#size-waist .border2pxBlack","#size-inseam .border2pxBlack"];

	for(i in allTypes)
	{
		if(allTypes[i] !== current){
			if($(allRelatedClasses[i]).size() > 0)
			{
				return true;
				
			}
		}
	}

	return false;

	}
	

	function mergeArray(srcArray, destArray) {
		var resultArray = new Array();
		var k=0;
		if (srcArray == "") {
			return destArray;
		}
		for(var i in srcArray){
			for(var j in destArray){
				if (srcArray[i] == destArray[j]) {
					resultArray[k] = srcArray[i];
					k++;
				}
			}
		}
		
		return resultArray;
	}

	function updateColorSection(divId, obj,no_inventorySwatches) {
		$(divId).children().each(function(){
				var attr_id = $(this).attr("id");
				var found = false;
				for(var j in obj) {
					if (attr_id == obj[j]) {
						found = true;
					}
				}
				if (!found){
					if(no_inventorySwatches != "" && $.inArray(attr_id,no_inventorySwatches) != "-1"){
						$(this).addClass("no_inventory");
					}else{
						if(!$(this).hasClass("disabled")){
	                        $(this).addClass("disabled");
						}
					}					
					if($(this).find(".swatch-color img").size() < 2){
	                var appendImgNS = "<img src='/media/images/swatch_unavail.gif' width='22px' height='22px' />";
	                $(this).find(".swatch-color").find('img').remove();
					$(this).find(".swatch-color").append(appendImgNS);	
					
				}
	               
				}
				
			});		
		

	}

	function updateSizeSection(divId, obj,no_inventory_array) {
		$(divId).children().each(function(){
				var attr_id = $(this).attr("id");
				var found = false;
				for(var j in obj) {
					if (attr_id == obj[j]) {
						found = true;
					}
				}
				if (!found){
					if(no_inventory_array != "" && $.inArray(attr_id,no_inventory_array) != "-1"){
						$(this).addClass("no_inventory size_unavail");	
					}else{
						$(this).addClass("size_unavail");	
					}    
					
				}
			});		
	}
	function updateSizeSectionDropDown(divId, obj,no_inventory_array) {
		$(divId).find('option').each(function(){
				var attr_id = $(this).attr("name");
				var found = false;
				for(var j in obj) {
					if (attr_id == obj[j]) {
						found = true;
					}
				}
				if (!found){
					if(no_inventory_array != "" && $.inArray(attr_id,no_inventory_array) != "-1"){
						$(this).addClass("no_inventory size_unavail");	
						
						if($(this).text() != 'Please Select Size') {
						$(this).attr('disabled', 'disabled');
							$(this).html($(this).val()+'(Not Available)')
						}
					}else{
						$(this).addClass("size_unavail");	
						
						if($(this).text() != 'Please Select Size') {
						$(this).attr('disabled', 'disabled');
							$(this).html($(this).val()+'(Not Available)')
						}
					}    
					
				}
			});		
	}
	//this function is to load the suppressed price dynamically in the pdp pages.
	/*function displaySuppressedPrice(pProductId,pSkuId){		
		$.ajax({
			url: '/catalog/fragments/pdp_suppressed_price_display.jsp',
			dataType: 'html',
			type: "GET",
			cache: false,
			data:{productId:pProductId,skuId:pSkuId},
			success: function(msgData) {	
				var htmlData = msgData;
				var startIndex = htmlData.indexOf("Start::");
                var endIndex = htmlData.indexOf("::End");
                var suppressedMessage = htmlData.substring(startIndex,endIndex);
                if(suppressedMessage.indexOf("Start::") != -1){
                	suppressedMessage = suppressedMessage.replace("Start::","");
                }
                htmlData = htmlData.replace(suppressedMessage,"");
                if(htmlData.indexOf("::End") != -1){
                	htmlData = htmlData.replace("::End","");
                }
                if(htmlData.indexOf("Start::") != -1){
                	htmlData = htmlData.replace("Start::","");
                }
                if(document.getElementById('suppressedPrice_T'+pProductId) != null){
					document.getElementById('suppressedPrice_T'+pProductId).innerHTML =htmlData;
				}
				if(document.getElementById('suppressed_message_'+pProductId) != null){
				    document.getElementById('suppressed_message_'+pProductId).innerHTML =suppressedMessage;
				}
				if(document.getElementById('suppressed_message2_'+pProductId) != null){
				    document.getElementById('suppressed_message2_'+pProductId).innerHTML =suppressedMessage;
				}		
			}
		});	
	}*/
	/*var xmlHttp;
	function createXMLHttpRequest() {
		if (window.ActiveXObject) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();         
		}
	}
	function displaySuppressedPrice(pProductId,pSkuId){         
		createXMLHttpRequest();
		var url = "/catalog/fragments/pdp_suppressed_price_display.jsp?productId="+pProductId+"&skuId="+pSkuId;     
		xmlHttp.open("GET", url, true);           
		xmlHttp.onreadystatechange = callForSuppressedMSG;
		xmlHttp.send(null);
	}
	function callForSuppressedMSG() {
		if (xmlHttp.readyState==4) {
			var pProductId = $('.preSelectedskuId').val().split("_")[0];			
			var responseObject = xmlHttp.responseText;
			var startIndex = responseObject.indexOf("Start::");
			var endIndex = responseObject.indexOf("::End");
			var suppressedMessage = responseObject.substring(startIndex,endIndex);
			suppressedMessage = suppressedMessage.replace("Start::","");
			responseObject = responseObject.replace(suppressedMessage,"").replace("::End","");
			responseObject = responseObject.replace("Start::","");
			if(document.getElementById('suppressed_message_'+pProductId) != null){
				document.getElementById('suppressed_message_'+pProductId).innerHTML =suppressedMessage;
			}
			if(document.getElementById('suppressed_message2_'+pProductId) != null){
				document.getElementById('suppressed_message2_'+pProductId).innerHTML =suppressedMessage;
			}
			if(document.getElementById('suppressedPrice_T'+pProductId) != null){
				document.getElementById('suppressedPrice_T'+pProductId).innerHTML = responseObject;
			}
		}
	}*/
	
	//<---START :code for ATG-4468 defect--->//
    function convertToCurrencyFormat(price){    
                         return "$" + Math.floor(price) + (price % 1).toFixed(2).toLocaleString().replace(/^0/,'');
    }
    //<---END :code for ATG-4468 defect--->//

	
	//code changes for removing ajax call- Multi variant prodcuts
	function displaySuppressedPrice(pProductId,pSkuId){    
		
		if (pSkuId != "" && pSkuId != undefined) {			
			for ( var i in allVariants.variants) {				
				if (allVariants.variants[i].skuId == pSkuId) {					
					var isSuppressed = allVariants.variants[i].IsSuppressed;					
					var surchargeFee = allVariants.variants[i].surchargeFee;		
					var shippingServiceCode = allVariants.variants[i].shippingServiceCode;		
					var shippingServiceCodeValue = allVariants.variants[i].shippingServiceCodeValue;
					
					if (isSuppressed == true || isSuppressed == "true") {					
						if (storeConfigvalue == true || storeConfigvalue == "true") {							
							var sb = "";
							var skuRegularPrice = allVariants.variants[i].SkuRegularPrice;							
							var skuSalePrice = allVariants.variants[i].SkuSalePrice;
							var salepriceLabel = allVariants.variants[i].salePriceLabel;
							var regularpriceLabel = allVariants.variants[i].regularPriceLabel;					
							
							if (skuRegularPrice != '' && skuRegularPrice != null) {
								
								sb = sb + "<p class='original'>";
								sb = sb + regularpriceLabel;
								sb = sb + skuRegularPrice;
								sb = sb + "</p>";

							}
							
							sb = sb + "<br>";							
							if (skuSalePrice != skuRegularPrice && skuSalePrice != null && skuSalePrice!=''){
								sb = sb + "<p class='sale'>";
								sb = sb + salepriceLabel;
								sb = sb + skuSalePrice;
								sb = sb + "</p>";

							}						
							
							document.getElementById("sup_price_display").innerHTML = sb;
							document.getElementById("sup_price_display").style.display = "";
							var suppressedMessage = document.getElementById('Suppressed_Message').innerHTML;						

							if (document.getElementById('suppressed_message_'+ pProductId) != null) 
							{
								document.getElementById('suppressed_message_'+ pProductId).innerHTML = suppressedMessage;
							}
							if (document.getElementById('suppressed_message2_'+ pProductId) != null) 
							{
								document.getElementById('suppressed_message2_'+ pProductId).innerHTML = suppressedMessage;
							}
						}
						else{							
							
							var suppressedMessage = document.getElementById('Suppressed_Message').innerHTML;						

							if (document.getElementById('suppressed_message_'+ pProductId) != null) 
							{
								document.getElementById('suppressed_message_'+ pProductId).innerHTML = suppressedMessage;
							}
							if (document.getElementById('suppressed_message2_'+ pProductId) != null) 
							{
								document.getElementById('suppressed_message2_'+ pProductId).innerHTML = suppressedMessage;
							}
						}

						
						document.getElementById("sup_price_details").style.display = "";
					}
					else{
						//fix added for JIRA- ATG-2011
						if (document.getElementById('suppressed_message_'+ pProductId) != null) 
						{
							document.getElementById('suppressed_message_'+ pProductId).innerHTML = "";
						}
						if (document.getElementById('suppressed_message2_'+ pProductId) != null) 
						{
							document.getElementById('suppressed_message2_'+ pProductId).innerHTML = "";
						}
					}
					//<---START :code for ATG-2232 defect--->//
					if(document.getElementById('T'+pProductId+"sup_price_surcharge") != null && document.getElementById('T'+pProductId+"sup_price_surcharge") != undefined)
					{	
						if(surchargeFee !='0.0' &&  surchargeFee !='' && surchargeFee != null && surchargeFee != undefined)
						{
						
						    if(shippingServiceCode == 6 || shippingServiceCode ==7 || shippingServiceCode == 8 || shippingServiceCode == 9 )
							{
								var sf= "";
								var surchargeFeeLabel = document.getElementById('surcharge_label').innerHTML;
								sf=sf+"<i class='surcharge_fee'>";
								sf=sf+surchargeFeeLabel;
								sf=sf+"with ";
								sf=sf+"<a id='shipping_retuns' href='javascript:void(0);'>"+shippingServiceCodeValue+"</a>";
								//<---START :code for ATG-4468 defect--->//
								sf=sf+convertToCurrencyFormat(surchargeFee);
								 //<---END :code for ATG-4468 defect--->//
								sf=sf +"</i>";
								document.getElementById('T'+pProductId+"sup_price_surcharge").innerHTML = sf;
							    if(sf!=null){
								   document.getElementById('T'+pProductId+'sup_price_surcharge').style.display ="block";
							   }	
							}
						    else{
							    var sf= "";
								var surchargeFeeLabel = document.getElementById('surcharge_label').innerHTML;
								sf=sf+"<i class='surcharge_fee'>";
								sf=sf+surchargeFeeLabel;
								//<---START :code for ATG-4468 defect--->//
								sf=sf+convertToCurrencyFormat(surchargeFee);
								 //<---END :code for ATG-4468 defect--->//
								sf=sf +"</i>";
								document.getElementById('T'+pProductId+"sup_price_surcharge").innerHTML = sf;
								
								if(sf!=null){
									document.getElementById('T'+pProductId+'sup_price_surcharge').style.display ="block";
								}	
							 }
						}
						else{
						document.getElementById('T'+pProductId+'sup_price_surcharge').style.display ="none";
						}
						//<---END :code for ATG-2232 defect--->//
					}
				}
			}
		}

	}
	
	function getSkuId(){	
		var col="";
		var waist="";
		var inseam="";		
			col=$('#selection .s-color-detail').text().replace(/(\s+)?.$/, '');
			waist=$('#selection .s-waist-detail').text().replace(/(\s+)?.$/, '');
			inseam=$('#selection .s-inseem-detail').text();		
		var skuID="";
		var iStatus="";
		var upcCode="";
		var selectedProperties =new Array();
		if(col!="" && col.charAt(0) != ','){
			selectedProperties.push(col);			
		}
		if(waist!="" && waist.charAt(0) != ','){
			selectedProperties.push(waist);			
		}
		if(inseam!="" && inseam.charAt(0) != ','){
			selectedProperties.push(inseam);			
		}
		var skuCount = selectedProperties.length;
		if(skuCount == availablevariantsCount_product){	
			//script for getting the skuId from allVariants.
			for(var i in allVariants.variants){	
				var colorFlag = "false";	
				var waistFlag = "false";	
				var inseamFlag = "false";					
				if(inseam.charAt(inseam.length-1) == ","){
					inseam = inseam.substring(0,inseam.length-2);
				}			
				if(col == ""){
					colorFlag = "true";	
				}else if(allVariants.variants[i].color != undefined && allVariants.variants[i].color.indexOf('_'+col) != -1)
				{
					var indexCount = allVariants.variants[i].color.indexOf('_');
					if(allVariants.variants[i].color.substring(indexCount+1)  == col)
					{
						colorFlag = "true";       
					}
				} 
				if(waist == ""){
					waistFlag = "true";	
				}else if(allVariants.variants[i].size2 != undefined && allVariants.variants[i].size2.indexOf('_'+waist+'_waist') != -1){
					waistFlag = "true";	
				} 
				if(inseam == ""){
					inseamFlag = "true";	
				}else if(allVariants.variants[i].size3 != undefined && allVariants.variants[i].size3.indexOf('_'+inseam+'_inseam') != -1){
					inseamFlag = "true";	
				} 
				if(colorFlag == "true" && waistFlag == "true" && inseamFlag == "true"){
				/*START PWP CR-mingle story 2981 */	
							if($(".displayYourPrice") != undefined){
								//document.getElementById('displayYourPrice').style.display = 'block';
								$(".displayYourPrice").show();
							}
							/*END PWP CR-mingle story 2981 */	
							skuID=allVariants.variants[i].skuId; 
							if($('input').hasClass('variableSkuPricing'))
							{
								if(allVariants.variants[i].SkuSalePrice != '')
								{
								var RangePrice = '<div class="sale"><span class="price_label">'+allVariants.variants[i].salePriceLabel+'</span><span class="price_ammount">'+allVariants.variants[i].SkuSalePrice+'</span></div><div class="original"><span class="price_label">'+allVariants.variants[i].regularPriceLabel+' </span>'+allVariants.variants[i].SkuRegularPrice+'</div>';
								}
								else
								{
								var RangePrice = '<div class="original original-reg"><span class="price_label">'+allVariants.variants[i].regularPriceLabel+'</span><span class="price_ammount">'+allVariants.variants[i].SkuRegularPrice+'</span></div>';
								}
								if($('.size-waist').length > 1)
								{								
								$('.price_defaultVal').each(function(){
								$(this).parent('.multiple-price').children('.sale').remove();
								$(this).parent('.multiple-price').children('.original').eq(1).remove();
								$(this).parent('.multiple-price').children('.original').replaceWith($(this).html());
								});	
										setTimeout(function(){
										$('.size-color-block').find('.price-holder').find('span#s-waist-size').html('');
										$('.size_off_left1.border2pxBlack').parents('.price-varitions:first').prevAll('#sSelectWaistSizeBox:first').find('#s-waist-size').html($('.size_off_left1.border2pxBlack a').attr('id'));						
									if($('.size_off_left1').hasClass('border2pxBlack'))
									{
									$('.size_off_left1.border2pxBlack').parents('.price-varitions:first').prevAll('.multiple-price:first').children('.sale').remove();
									$('.size_off_left1.border2pxBlack').parents('.price-varitions:first').prevAll('.multiple-price:first').children('.original').eq(1).remove();
									$('.size_off_left1.border2pxBlack').parents('.price-varitions:first').prevAll('.multiple-price:first').children('.original').replaceWith(RangePrice);
									}
}, 50);									
								}
								else
								{								
								$('.sale').remove();
								$('.original').eq(1).remove();
								$('.original').replaceWith(RangePrice);
								}
							}
							/*if(document.getElementById('ReciveFreeGift') != undefined){
							document.getElementById('ReciveFreeGift').style.display = 'block';
							}*/

							/*for JIRA-5044 issue fix starts*/
							if(allVariants.variants[i].IsSuppressed == "true" || allVariants.variants[i].SkuSalePrice != ""){
								$(".original").removeClass("original-reg");
							}
							/*for GET Size selection  issue fix starts*/
							else if( $('body').find('.your_price_lable').length >0){
								$('.sale').hide();
								$(".original").removeClass("original-reg");
							}
							/*for GET Size selection  issue fix ends*/
							else{
								$(".original").addClass("original-reg");
							}
							/*for JIRA-5044 issue fix ends*/
							upcCode=allVariants.variants[i].skuUpcCode;							
							var gwpProductID = $('#giftpro').find('.Gwp_productId').attr("id");
							if(gwpProductID != undefined && gwpProductID != ''){	
								//document.getElementById('product_addToBag').style.display = 'none';
								//document.getElementById('gwp_Product_addToBag').style.display = 'block';
								var gwpSkuID = $('#giftpro').find('.Gwp_skuId').attr("id");	
								if(document.getElementById('buy_product_skuId_0') != null && document.getElementById('buy_product_skuId_0') != undefined){
									document.getElementById('buy_product_skuId_0').value = skuID;
								}
								if(document.getElementById('get_product_skuId_0') != null && document.getElementById('get_product_skuId_0') != undefined){
									document.getElementById('get_product_skuId_0').value = gwpSkuID;
								}
								if(document.getElementById('get_product_skuId_1') != null && document.getElementById('get_product_skuId_1') != undefined){
									document.getElementById('get_product_skuId_1').value = gwpSkuID;
								}
								if(document.getElementById('get_product_id') != null && document.getElementById('get_product_id') != undefined){
									document.getElementById('get_product_id').value = gwpProductID;
								}
								if(document.getElementById('buy_product_skuId_1') != null && document.getElementById('buy_product_skuId_1') != undefined){
									document.getElementById('buy_product_skuId_1').value = skuID;
								}
							}
							iStatus=allVariants.variants[i].inventoryStatus; 
							if(iStatus == "true"){
								if(document.getElementById('addToBagId_T'+productID) != null){
									document.getElementById('addToBagId_T'+productID).className = 's-addtoBag';	
									$('.s-addtoBag').removeClass('add2bag');
								/*START :Added for GWP collections #3169 */
									var gwpGift = $('#gift_'+productID).val();
									if(gwpGift == undefined){
										gwpGift = $('#gift_T'+productID).val();
									}
									if(gwpGift == 'gift'){
										var templateName = $('#templateName').val();
										if(templateName == 'PDP_C'){
											$('.s-addtoBag').removeClass('s-addtoBag').addClass('button_add_gift_to_bag');
										}
										else{
											//document.getElementById('addToBagId_'+productID).className = 'button_add_gift_to_bag';
											$('.s-addtoBag').removeClass('s-addtoBag').addClass('button_add_gift_to_bag');
											$('.button_add_gift_to_bag').val('');
										}
									}else{
										$('.s-addtoBag').val('ADD TO BAG');									
									}					
								/*END :Added for GWP collections #3169 */
								}
								if(document.getElementById('addToBagSkuId_T'+productID) != null){
									document.getElementById('addToBagSkuId_T'+productID).value = skuID;
								}
								if(document.getElementById('skava_skuUpcCode') != null){
									document.getElementById('skava_skuUpcCode').value = upcCode;									
								}
								displaySuppressedPrice(productID,skuID);
								$('#add_to_list_'+productID).removeClass('skava_add_to_list_class');
								$('#add_to_list_'+productID).addClass('active-skava-item');
								$('#add_to_list_'+productID).find('#skava_buttons_active').css({ display: "block" });
								$('#add_to_list_'+productID).find('#skava_buttons_inactive').css({ display: "none" });
								if(document.getElementById('inventoryStatusId_T'+productID) != null){
									document.getElementById('inventoryStatusId_T'+productID).innerHTML = 'In Stock';
								}
								var replaceAddToCart =$("#dynamicDisplayGWPAddToCart").attr("value");
								/*START PWP CR-mingle story 2981 */	
								var pwpMessageDisplay =$("#dynamicMessageDisplayPWP").attr("value");
								if(replaceAddToCart != undefined && replaceAddToCart != "true"){
									//START : code changes for defect ATG-3318/3461
									//dynamicGWPAddToCartANDMsgDisplay();
									dynamicGWPAddToCart(productID,skuID,'displayOffermsg');	
									//END : code changes for defect ATG-3318/3461
								}else {
									if(pwpMessageDisplay == "true"){
										dynamicPWPMessageDisplay(productID,skuID,'displayPwpOffermsg');	
									}else{
										//START : code changes for defect ATG-3318/3461
										//dynamicGWPAddToCart(productID,skuID,'displayOffermsg');
										dynamicGWPAddToCartANDMsgDisplay();
										//END : code changes for defect ATG-3318/3461
									}
								}
								/*END PWP CR-mingle story 2981 */
								//Start:commented for mingle#2978 (for Displaying pwp_discard_message.jsp overlay) for pwp cr
								/* $('.groupimage').hide();
								$('.show_QV').show(); */
								//End:commented for mingle#2978 (for Displaying pwp_discard_message.jsp overlay) for pwp cr
								
								  /* default styles for findinstore button */
                                if(document.getElementById('fisSkuDetailsMuted_'+productID) != null){
                                	
                                	var imageSrc=$('#easyzoom_wrap img').attr('src'); 
                					var imageUrl = imageSrc.slice( 0, imageSrc.indexOf('?') );
                					var title=$('.productTitleName').text();
                					if(title== "undefined" || title == ""){
        								title=br_data.prod_name;
        							}
                                	$('input[name=fisImageURL_'+productID+']').val(imageUrl);
                                	$('input[name=fisTitleName_'+productID+']').val(title);
                                	
                                	$('input[name=fisSkuColor_'+productID+']').val(col);
                                 	$('input[name=fisPrimarySize_'+productID+']').val(waist);
                                 	$('input[name=fisSecondarySize_'+productID+']').val(inseam);
                                 	$('input[name=fisSkuId_'+productID+']').val(skuID);
                                 	$('input[name=fisProductId_'+productID+']').val(productID);
                                 	
                                 	$('input[name=fisOriginalPrice_'+productID+']').val(allVariants.variants[i].SkuRegularPrice);
                                 	$('input[name=fisSalePrice_'+productID+']').val(allVariants.variants[i].SkuSalePrice);
                                	$('input[name=fisSaleLabel_'+productID+']').val(allVariants.variants[i].salePriceLabel);
                                	$('input[name=fisRegLablel_'+productID+']').val(allVariants.variants[i].regularPriceLabel);
                                	
                                	//$('input[name=fisUPCCode_'+productID+']').val(upcCode);
                                	
                                	

                                	
                                 	
                                 	
                                 	 $('#fisSkuDetailsMuted_'+productID).addClass('showStorelocatoroverlay');

            	                    $('#btn_findInStore_'+productID).removeClass('add2store');
            	                    $('#btn_findInStore_'+productID).addClass('s-addtostore');
            	                    
            	                    $('input[name=fisIsSuppresed_'+productID+']').val(allVariants.variants[i].IsSuppressed);
            	                    
            	                    $("#sSelectWaistSizeBox").removeClass("s-error-red");
            	            	  	$("#error_display1").find("ol").find("li:eq(0)").html("");
            	            	  	$("#error_display1").hide();
                                   
                                }
							}else{
								if(document.getElementById('inventoryStatusId_T'+productID) != null){
									document.getElementById('inventoryStatusId_T'+productID).innerHTML = 'Out Of Stock';
									if(document.getElementById('addToBagId_T'+productID) != null){
										document.getElementById('addToBagId_T'+productID).className = 'add2bag';
										 $('#add_to_list_'+productID).addClass('skava_add_to_list_class');
										 $('#add_to_list_'+productID).removeClass('active-skava-item');
										 $('#add_to_list_'+productID).find('#skava_buttons_active').css({ display: "none" });
										 $('#add_to_list_'+productID).find('#skava_buttons_inactive').css({ display: "block" });
									}
								}
							}							
					}
						
			}
		}
	}
function removeSku ()
{
                $(".s-size-here").val('');
                $(".s-waist-here").val('');
                $(".s-inseem-here").val('');
                $(".s-quantity-here").val('');
				$('.preSelectedskuId').val();
}

function setQuantityPDP(){
	if(! $("#resultNumber").val()){
		$("#resultNumber").val(1);	
	}
}
