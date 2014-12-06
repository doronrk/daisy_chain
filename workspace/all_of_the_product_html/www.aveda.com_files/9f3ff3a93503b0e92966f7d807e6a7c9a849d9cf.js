var btRemoveLinks = jQuery("a[id^=remove_]");
btRemoveLinks = btRemoveLinks.get();
if ( typeof btRemoveLinks !== 'undefined'){
    jQuery.each(btRemoveLinks,function(ids,thisid){      
	    //console.log("bound ",thisid);
	    jQuery(thisid).bind("click",function(obj){		
		    //console.log("clicked delete");
            jQuery(window).trigger("VIEWCART:DELETELINK", [obj.memo]);
	    });	
    });
}

jQuery('#offer_code').bind("submit", function(e){
     var btOfferInput = jQuery("input[id=form--offer_code--field--OFFER_CODE]")[0].value;
     jQuery(window).trigger("VIEWCART:OFFER", [btOfferInput]); 
     console.log("btoffer ",btOfferInput);
     e.preventDefault();     
     var myform = this;
     setTimeout(function(){myform.submit();}, 500);     
});



function btProductNameFromID(prodid){
    console.log("prodid",prodid);
    var finalId = "";
  jQuery.each(page_data.catalog.mpp.rpcdata.categories,function(ids,prod){
    
    if (typeof prod == 'object'){
    
      jQuery.each(prod.products,function(idx,oneproduct){
         console.log("product input/current ",prodid,oneproduct);
         
        if (oneproduct.PRODUCT_ID==prodid){
           finalId = oneproduct.PROD_RGN_NAME;
           return;
        }
    
      });
      
    }
    
    
    
  });
    return finalId;
}


function btProductNameFromSPPID(prodid){
    var finalId = "";
    
  jQuery.each(page_data.catalog.spp.recommendedProducts.rpcdata.products,function(ids,prod){
    
    if (typeof prod == 'object'){
    
      //prod.products.each(function(oneproduct){
         //console.log("product input/current ",prodid,oneproduct);
         
        if (prod.PRODUCT_ID==prodid){
           finalId = prod.PROD_RGN_NAME;
           return;
        }
    
      //});
      
    }
    
    
    
  });
    return finalId;
}



function btProductNameFromCartID(prodid){
    var finalId = "";
    
  //page_data.catalog.spp.recommendedProducts.rpcdata.products.each(function(prod){
  jQuery.each(page_data.checkout.viewcart.recommendedProducts.rpcdata.products,function(ids,prod){     
    
    if (typeof prod == 'object'){
    
      //prod.products.each(function(oneproduct){
         console.log("product name ",prod.PROD_RGN_NAME);
         
        if (prod.PRODUCT_ID==prodid){
           finalId = prod.PROD_RGN_NAME;
           return;
        }
    
      //});
      
    }
    
    
    
  });
    return finalId;
}


