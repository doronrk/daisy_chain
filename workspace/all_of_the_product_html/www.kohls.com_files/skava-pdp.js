$(document).ready(function(){
	$('.add_to_list').live('click',function(){
		current_product=$(this).parents('.prod_description1').attr('id');
	});
});

$(function(){	
	WishList.setButton("", "add_to_list", handleProductAddToList);
	WishListRegistry.setButton("addtoregistry", "add_to_registry", handleProductAddToRegistry);
    var size = $('.childProductSize').val(); 
    
    for(var i=0;i<size;i++){
    	WishList.setButton("", "add_to_list_"+i, handleProductAddToList);
    	WishListRegistry.setButton("addtoregistry", "add_to_registry_"+i, handleProductAddToRegistry);
     }
   });



function _isInValidNumber(prodQty) {
	if(!(parseInt( prodQty ) === Number( prodQty ))){
		return true;
	}
    else if(parseInt( prodQty ) === 0){
    	return true;
    }
    else{
    	return false;
    }
}
    
var handleProductAddToList = function(buttonType, listId)  {	
	handleProductAddToBase(buttonType, listId, WishList.addItemsToList, "1");
}

var handleProductAddToRegistry = function(buttonType, listId)  {    	
    handleProductAddToBase(buttonType, listId, WishListRegistry.addItemsToList, "0");
}
    
// /add to array //
var handleProductAddToBase = function(buttonType,listId,wishlistCallback,priority){
	
	var item={};
    var errorMessage={};
    var errorMessageArray=[];

    // var hasColorAndSize= true;
    var hasColor= false;
    var hasSize= false;
    var hasInseam=false;

    var missingProdInfo="false";
    var errorArray=[];
    var err = $('#error_display1').find('p').text();
    $("#error").remove();
    $("#s-select-color-here").removeClass("s-error-red");
    /** START - Code changes done for Mingle ID : 10101 **/
    $(".quantity").removeClass("s-error-red");   
    /** END - Code changes done for Mingle ID : 10101 **/
    $("#sSelectWaistSizeBox").removeClass("s-error-red");
	$('#sSelectInseamSizeBox').removeClass("s-error-red");
			
	// ********* Start Regular product and collection A product. ************
	
   	if($('#collectionType').val()=="collectionA" || $('#collectionType').val()=="pdp"){		       		
   		if($('#content .swatch-container-new').length>0){           
       		hasColor=true;
        }
       	if($('#content #size-waist').length>0){           	
       		hasSize=true;
        }
       	if($('#content #size-inseam').length>0){           
       		hasInseam=true;
        }
		        
    	// getting the product id
        var product_id=$('#add_to_bag_product_id').val();
        //if product_id is undefined check whether product id is gwp buy product
        if(product_id == undefined || product_id == '') {
        	var gwp_product_id_0 = $('#productId_0').val();
        	if(gwp_product_id_0 != undefined && gwp_product_id_0 != '') {
        		product_id = gwp_product_id_0;
        	}
        }
        
        // getting the sku id
        var sku_id=$('.add_to_bag_sku_id').val();
        //if sku_id is undefined check whether sku id is gwp buy product sku id
        if(sku_id == undefined || sku_id == '') {
        	var gwp_sku_id_0 = $('#buy_product_skuId_0').val();
        	if(gwp_sku_id_0 != undefined && gwp_sku_id_0 != '') {
        		sku_id = gwp_sku_id_0;
        	}
        }
        
        if(priority == "0"){
	        // getting the sku upc code.
	        var sku_upcCode=$('#skava_skuUpcCode').val();
        }
        // getting the quantity
        var prodQty=$('.add_cart_quantity').val();	
        // getting the product title
        var title=$('.productTitleName').html();
        // getting the image url
        var url=$('.easyzoom a img').attr('src');	
        // getting the product color
        var prodColor=$('.selection').find('.s-color-detail').text();
        prodColor=prodColor.substring(0,prodColor.indexOf(','));	
        
        // getting the waist size
        var prodSize=$('.selection').find('.s-waist-detail').text();
        var priSize = $('#sSelectWaistSizeBox').attr('dir');
		var secSize = $('#sSelectInseamSizeBox').attr('dir');
		var selectColor = $('#s-select-color-here').attr('dir');
		var enterQuantity = $('#checkQuantity').attr('dir');
        prodSize=prodSize.substring(0,prodSize.indexOf(','));	
        // getting the inseam size
        var prod_inseam_Size=$('.selection').find('.s-inseem-detail').text();
        
        if(prodSize=="" && $('.preSelectedPrimarySize').val()!=""){
        	var pri_size=$('.preSelectedPrimarySize').val().split('_');
			/*JIRA ATG-5316 issue fix Starts*/
			if($("#size-drop-down option").length > 0){
				prodSize=$("#size-drop-down").find("option:selected").val();
			}
			else{
				prodSize=pri_size[1];
			}	
		/*JIRA ATG-5316 issue fix ends*/        	
        }
        if(prod_inseam_Size=="" && $('.preSelectedSecondarySize').val()!=""){
        	var sec_size=$('.preSelectedSecondarySize').val().split('_');
        	prod_inseam_Size=sec_size[1];
        }
        var price = '';        
        flag=0;
        $.ajax({
    		url: '/catalog/fragments/skava_info.jsp',
    		dataType: 'html',
    		type: "POST",
    		data:{productId:product_id,skuId:sku_id},
    		success: function(htmlData) {    
    			price =$(htmlData).val();    			
    			price=price.substring(1,price.length);    			
    		},
    		complete: function (){    			
    			if(hasSize===true || hasInseam===true || hasColor===true){
    				if(hasColor===true){
    					if(prodColor.length === 0){
    						errorMessageArray.push({ href: "#ADD_CART_ITEM<>skuAttributeName", message: selectColor });
    						$("#s-select-color-here").addClass("s-error-red");
    					}
    				}
    				if(hasSize===true){
    					if(prodSize.length === 0){
    						errorMessageArray.push({ href: "#ADD_CART_ITEM<>skuAttributeName", message: priSize });
    						$("#sSelectWaistSizeBox").addClass("s-error-red");
							$(".size-holder").addClass("pdp-s-error-yellow");
							$(".Enr_Id_tooltip").show(); 
						}
    				}
    				if(hasInseam===true){
    					if(prod_inseam_Size.length === 0){
    						errorMessageArray.push({ href: "#ADD_CART_ITEM<>skuAttributeName", message: secSize });
    						$("#sSelectInseamSizeBox").addClass("s-error-red");
    					}
    				}	
    			}
    			if(prodQty==="" || _isInValidNumber(prodQty)){			
    				errorMessageArray.push({ href: "#ADD_CART_ITEM<>quantity", message: enterQuantity });
    				/** START - Code changes done for Mingle ID : 10101 **/
    				$(".quantity").addClass("s-error-red");    				
    				/** END - Code changes done for Mingle ID : 10101 **/
    			}
    			if(prodSize==null || prodSize==""){				
    				if(prod_inseam_Size===null || prod_inseam_Size ===""){
    				}
    				else{
    					prodSize = prod_inseam_Size;								
    				}
    			}	      	
    			
    			if(errorMessageArray.length){
    				$('#error_display1').hide();
    				missingProdInfo="true";
    				var new1="";
    				for (var i = 0; i < errorMessageArray.length; i++) {
    					new1='<li><a href="'+errorMessageArray[i].href+'">'+errorMessageArray[i].message+'</a></li>';
    					errorArray.push(new1);
    				}
    				var errorDisplay='<div id="error"><p><img class="errorImg" src="/media/images/error-icon.png"> '+err+'</p><ol>'+errorArray.join(" ")+'</ol></div>';
    				if(flag==0){
    					$("div#content, .quickViewBodyTag").prepend(errorDisplay);
    					flag=1;
    				}
    			}else if(sku_id==="" || sku_id===null){	
    				missingProdInfo="true";            
    				var errorDisplay='<div id="error"><p>Some information is missing please select different product. </p></div>';
    				$("div#content, .quickViewBodyTag").prepend(errorDisplay);
    			}
    			
    			if(missingProdInfo === "false"){ 
    				if($('#collectionType').val()=="collectionA"){
    					var collectionId = $('#skava_collectionId').val();        		
    					item["itemType"]= "Collection_SKU";
    					item["notes"]="Collection Page";
    					item["collectionsProdId"]=collectionId;
    					item["collectionsProdCode"]=collectionId;        		
    				}else{        		
    					item["itemType"]= "SKU";        		        		
    				} 
    				item["itemId"]=sku_id;
    				item["itemProductId"]=product_id;
    				item["productCode"]=product_id;
    				item["itemColor"]=prodColor;
    				item["itemSize"]=prodSize;
    				item["wantedQty"]=prodQty;
    				item["priority"]=priority;
    				item["priceWhenCreated"]=price;
    				item["titleIfUnavailable"]=title;
    				item["imageUrlIfUnavailable"]=url;
    				item["categoryIfUnavailable"]="";
    				if(priority == "0"){
    					item["upcCode"]=sku_upcCode;
    				}    				
    				var itemsArray=[];
    				itemsArray.push(item);            
    				wishlistCallback(listId, itemsArray);
    			}  
    			
    		} 
    	});	
    }
   	// ********* End Regular product and collection A product. ************       	
	       	
	       	
   	//************ Start Collection B ********************
   	if($('#collectionType').val()=="collectionB"){	
   		var itemsArray=[];
   		var qty_Errors = false;
   		var price_array=[];
   		var item = { };
   		var price_new;   			
   		
		if($('#'+current_product+' .swatch-container-new').length>0){           
       		hasColor=true;
        }
       	if($('#'+current_product+' .size-waist_collectionB').length>0){           	
       		hasSize=true;
        }
       	if($('#'+current_product+' .size-inseam_collectionB').length>0){           
       		hasInseam=true;
        }
        $('div').removeClass('s-error-red');  	
       	var collectionId = $('#skava_collectionId').val();
       	var product_id=$('#'+current_product+' #add_to_bag_product_id').val();
   		var sku_id=$('#'+current_product+' .add_to_bag_sku_id').val();
   		if(priority == "0"){
	   		// getting the sku upc code.
	        var sku_upcCode=$('#skava_skuUpcCode_'+current_product).val();
   		}
        var url=$('#'+current_product+' .childProductImage').val();
        var prodQty=$('#'+current_product+' .add_cart_quantity').val();
		//ATG-3211 : title is not being sent to skava from collection pages
        var title=$('#'+current_product+' .Pdt_C_Title').html();
   	 	var prodColor=$('#'+current_product+' .selection .s-color-detail').text();
        prodColor=prodColor.substring(0,prodColor.indexOf(','));
		var prodSize=$('#'+current_product+' .selection .s-waist-detail').text();
        prodSize=prodSize.substring(0,prodSize.indexOf(',')); 
        var prod_inseam_Size=$('#'+current_product+' .selection .s-inseem-detail').text();
        var priSize = $("#"+current_product).find('#sSelectWaistSizeBox').attr('dir');
		var secSize = $("#"+current_product).find('#sSelectInseamSizeBox').attr('dir');
		var selectColor =  $("#"+current_product).find('#s-select-color-here').attr('dir');
		var enterQuantity = $("#"+current_product).find('#checkQuantity').attr('dir');	       	
        flag=0;       	
       	$.ajax({
    		url: '/catalog/fragments/skava_info.jsp',
    		dataType: 'html',
    		type: "POST",
    		data:{productId:product_id,skuId:sku_id},
    		success: function(htmlData) {    
    			price_new =$(htmlData).val();    			
    			price_new=price_new.substring(1,price_new.length);    			
    		},
    		complete: function (){		      
    			if(prodSize=="" && $('#'+current_product+' .preSelectedPrimarySize').val()!=undefined && $('#'+current_product+' .preSelectedPrimarySize').val()!="" ){
    				var pri_size=$('#'+current_product+' .preSelectedPrimarySize').val().split('_');
    				prodSize=pri_size[1];		        	
    			}
		       	if(prod_inseam_Size=="" && $('#'+current_product+' .preSelectedSecondarySize').val()!=undefined && $('#'+current_product+' .preSelectedSecondarySize').val()!=""){
		       		var sec_size=$('#'+current_product+' .preSelectedSecondarySize').val().split('_');
		       		prod_inseam_Size=sec_size[1];
		       	}
		        if(hasSize===true || hasInseam===true || hasColor===true){
		        	if(hasColor===true){
		        		if(prodColor.length === 0){
		        			errorMessageArray.push({ href: "#ADD_CART_ITEM<>skuAttributeName", message: selectColor });
		        			$('#'+current_product+' #s-select-color-here').addClass("s-error-red");
		        		}
		        	}
		            if(hasSize===true){
			            if(prodSize.length === 0){
			                errorMessageArray.push({ href: "#ADD_CART_ITEM<>skuAttributeName", message: priSize });			
			                $('#'+current_product+' #sSelectWaistSizeBox').addClass("s-error-red");
			            }
		            }
		            if(hasInseam===true){
			            if(prod_inseam_Size.length === 0){
			                errorMessageArray.push({ href: "#ADD_CART_ITEM<>skuAttributeName", message: secSize });
			                $('#'+current_product+' #sSelectInseamSizeBox').addClass("s-error-red");
			            }
		            }
		        }
		        if(prodQty==="" || _isInValidNumber(prodQty)){
		       		if(qty_Errors == false){		       			
		       			qty_Errors = true;
		       			errorMessageArray.push({ href: "#ADD_CART_ITEM<>quantity", message: enterQuantity });
		       		}
		       		/** START - Code changes done for Mingle ID : 10101 **/
		       		$('#'+current_product+' .quantity').addClass("s-error-red");
		       		/** START - Code changes done for Mingle ID : 10101 **/
		        }
		        if(prodSize==null || prodSize==""){				
					if(prod_inseam_Size===null || prod_inseam_Size ===""){
					}
					else{
						prodSize = prod_inseam_Size;								
					}
				} 
		        
		        if(errorMessageArray.length){ 
		        	$('#error_display1').hide();
		            var new1="";
		            for (var i = 0; i < errorMessageArray.length; i++) {
		            	new1='<li><a href="'+errorMessageArray[i].href+'">'+errorMessageArray[i].message+'</a></li>';
		                errorArray.push(new1);
		            }
		            var errorDisplay='<div id="error"><p><img class="errorImg" src="/media/images/error-icon.png"> '+err+'</p><ol>'+errorArray.join(" ")+'</ol></div>';
		            if(flag==0){
    					$("div#content").prepend(errorDisplay);
    					flag=1;
    				}		            
		        }
				        
		        if(!errorMessageArray.length){		        	
		       		item.itemColor=prodColor;
		            item.itemSize=prodSize;
		            item.itemId=sku_id;		    			    		        
		            item.itemType="Collection_SKU";
		            item.itemProductId=product_id;
		            item.productCode=product_id;
		            item.wantedQty=prodQty;
		            item.priority=priority;
		            item.priceWhenCreated=price_new;		            
		            item.collectionsProdId=collectionId;
		            item.collectionsProdCode=collectionId;
		            item.notes="Collection Page";
		            item.titleIfUnavailable=title;
		            item.imageUrlIfUnavailable=url;
		            if(priority == "0"){
		            	item.upcCode=sku_upcCode;
		            }
		            itemsArray.push(item);	
		            wishlistCallback(listId, itemsArray);
		        } 
		    }
		});		
   	}
	//************ End Collection B ********************
}