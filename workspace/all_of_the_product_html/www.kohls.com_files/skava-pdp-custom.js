$(document).ready(function(){		
	    
	 var portValue = document.location.port;
     var protocol = document.location.protocol;
     if(portValue !== 'undefined' ||  portValue !== null || portValue != ''){
     	if(protocol == 'http:'){
     		portValue = Number(portValue)+1;
     	}else{
     		portValue = Number(portValue);
     	}
     }
     var frmUrl = document.location.hostname+(document.location.port ? ':'+ portValue:'');     
	    var mediaPath = $('#mediaPath').val();
	    var secureHostUrl = "https://"+frmUrl+mediaPath;
	    var isUpdateRegistry = document.getElementById('khrg_id_addtolist_updatelist');	    
	    if(isUpdateRegistry == null){	    	
	    	var addtoRegistryAcive=getSecureImageUrl(secureHostUrl,$('#AddToRegistry-active').val());
			var addtoRegistryAciveUrl = getBackgroundUrl(addtoRegistryAcive);
			
			var addtoRegistryHover=getSecureImageUrl(secureHostUrl,$('#AddToRegistry-hover').val());
			var addtoRegistryHoverUrl = getBackgroundUrl(addtoRegistryHover);
			setTimeout(function () {$('.khrg_AddToListCenterBtn').css('background',addtoRegistryAciveUrl);
			},500);
			
			//url(https://localhost:7002//images/AddToRegistry-active.png)
			$('.khrg_AddToListCenterBtn').mouseover(function(){	
				var child_product_id=$(this).parents('.active-skava-item').find('#skava_productId').val();
				if(child_product_id == null || child_product_id =="" || child_product_id == "undefined"){
					child_product_id = $(this).parents('.skava_add_to_list_class').find('#skava_productId').val();
				}
				var product_id_div="#add_to_list_"+child_product_id;
				
			
				$(this).parents(product_id_div).find('.khrg_AddToListCenterBtn').css('background',addtoRegistryHoverUrl);
			});
			$('.khrg_AddToListCenterBtn').mouseleave(function(){
				var child_product_id=$(this).parents('.active-skava-item').find('#skava_productId').val();
				if(child_product_id == null || child_product_id =="" || child_product_id == "undefined"){
					child_product_id = $(this).parents('.skava_add_to_list_class').find('#skava_productId').val();
				}
				var product_id_div="#add_to_list_"+child_product_id;
				
				$(this).parents(product_id_div).find('.khrg_AddToListCenterBtn').css('background',addtoRegistryAciveUrl);
			});
	    }else{	    	
	    	var updateRegistryAcive=getSecureImageUrl(secureHostUrl,$('#UpdateQuantity-default').val());
			var updateRegistryAciveUrl = getBackgroundUrl(updateRegistryAcive);;
			
			var updateRegistryHover=getSecureImageUrl(secureHostUrl,$('#UpdateQuantity-hover').val());
			var updateRegistryHoverUrl = getBackgroundUrl(updateRegistryHover);
			
			var anotherRegistryAcive=getSecureImageUrl(secureHostUrl,$('#AddToAnotherRegistry-default').val());
			var anotherRegistryAciveUrl = getBackgroundUrl(anotherRegistryAcive);
			
			var anotherRegistryHover=getSecureImageUrl(secureHostUrl,$('#AddToAnotherRegistry-hover').val());
			var anotherRegistryHoverUrl = getBackgroundUrl(anotherRegistryHover);
			
			$('.khrg_AddToListUpdateCenterBtn').css('background',updateRegistryAciveUrl);
			
			$('.khrg_AddToListCenterBtn').css('background',anotherRegistryAciveUrl);
			
			//For Update registry button.
			$('.khrg_AddToListUpdateCenterBtn').mouseover(function(){	
				var child_product_id=$(this).parents('.active-skava-item').find('#skava_productId').val();
				if(child_product_id == null || child_product_id =="" || child_product_id == "undefined"){
					child_product_id = $(this).parents('.skava_add_to_list_class').find('#skava_productId').val();
				}
				var product_id_div="#add_to_list_"+child_product_id;
			
				$(this).parents(product_id_div).find('.khrg_AddToListUpdateCenterBtn').css('background',updateRegistryHoverUrl);
			});
			$('.khrg_AddToListUpdateCenterBtn').mouseleave(function(){
				var child_product_id=$(this).parents('.active-skava-item').find('#skava_productId').val();
				if(child_product_id == null || child_product_id =="" || child_product_id == "undefined"){
					child_product_id = $(this).parents('.skava_add_to_list_class').find('#skava_productId').val();
				}
				var product_id_div="#add_to_list_"+child_product_id;
				
				$(this).parents(product_id_div).find('.khrg_AddToListUpdateCenterBtn').css('background',updateRegistryAciveUrl);
			});
			//For Add to Another registry button.
			$('.khrg_AddToListCenterBtn').mouseover(function(){	
				var child_product_id=$(this).parents('.active-skava-item').find('#skava_productId').val();
				if(child_product_id == null || child_product_id =="" || child_product_id == "undefined"){
					child_product_id = $(this).parents('.skava_add_to_list_class').find('#skava_productId').val();
				}
				var product_id_div="#add_to_list_"+child_product_id;
			
				$(this).parents(product_id_div).find('.khrg_AddToListCenterBtn').css('background',anotherRegistryHoverUrl);
			});
			$('.khrg_AddToListCenterBtn').mouseleave(function(){
				var child_product_id=$(this).parents('.active-skava-item').find('#skava_productId').val();
				if(child_product_id == null || child_product_id =="" || child_product_id == "undefined"){
					child_product_id = $(this).parents('.skava_add_to_list_class').find('#skava_productId').val();
				}
				var product_id_div="#add_to_list_"+child_product_id;
				
				$(this).parents(product_id_div).find('.khrg_AddToListCenterBtn').css('background',anotherRegistryAciveUrl);
			});
	    }		
});


function getBackgroundUrl(path){
	return "url("+path+")";
}

function getSecureImageUrl(secureHostUrl,imagePath){
	return secureHostUrl+imagePath;
}