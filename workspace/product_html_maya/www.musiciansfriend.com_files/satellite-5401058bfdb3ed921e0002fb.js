
function fireAdlucent(){

   if( window.adlucentFired ) return false;  
   
   /* comment: Since Adlucent is already using "m123" for this value, we need to use it for all tracking code groups for MF, GC & WWBW, as this will allow them to incorporate reporting for all brands within one platform */
   window.retailer = 'music123'; // this variable should be m123 even for MF! 
   
   /* The orderSite variable is used to be able to distinguish the source of sites that share identical SKUs. Since we have an overlap of SKU values between site brands, this is necessary to implement. This value is appended to SKUs within the Adlucent code */
   if( pageData.siteName=='/mf' ){ 
      window.orderSite = "mf";
   }else if( pageData.siteName=='/m123' ){ 
      window.orderSite =  "m123";
   }else{ 
      window.orderSite =  "";
   } 
   
   //attribute PPC orders to adlucent 
   var sourceSegment = pageData.sourceSegment ? pageData.sourceSegment : "unknown"; 
   if( sourceSegment == "pay-per-click" ) sourceSegment = 'adlucent'
   window.orderChannel = sourceSegment; 
   
   //send them the source code too (optional) 
   window.orderDetail = pageData.sourceName; 
   
   window.orderData = [];
   
   //is the new siteVars JSON format available?  (being added to mobile, then desktop later)
   if( typeof(getSiteVars)=='function' && getSiteVars().order ){  //mobile 
      window.orderKey = getSiteVars().order.id;
      var items = getSiteVars().order.items ? getSiteVars().order.items : []; 
      for(var i=0;i<items.length;i++){
         var item = items[i],
             sku = item.id,
             qty = item.quantity,
             price = parseFloat(item.price.replace(/[^0-9.]/gi, '')); 
         window.orderData.push([sku,qty,price]);
      }
      
   }else{ //desktop (temporary) 
      window.orderKey = $('#orderDetails_ordernumber').text();
      $('.prodInfo').each(function () {
	 var productInfo = $(this);
	 var sku = productInfo.find('.sku.hidden').text();
	 var qty = parseInt( productInfo.find('.qtyVar.hidden').text().replace(/[^0-9.]/gi, '') );
	 var price = parseFloat(productInfo.find('.totalItemPriceVar.hidden').text().replace(/[^0-9.]/gi, '')) / qty ;     
	 window.orderData.push([sku,qty,price]);
      });
	
   } 
   
   (function() {
   var adl = document.createElement("script"); adl.type = "text/javascript"; adl.async = true;
   adl.src = document.location.protocol + "//tracking.deepsearch.adlucent.com/adl.js";
   var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(adl, s);
   })();
   
   window.adlucentFired=1; 
} 

//desktop, or mobile direct hit
var url = (window.location+'').toLowerCase();  
if( url.indexOf('/checkout/confirmation')>-1 || url.indexOf('/checkout/order_confirmation')>-1 ){ 
   fireAdlucent(); 
}else if(pageData.isMobile=="true"){ //mobile only 
   $(document).on('pagebeforeshow', '#order_confirmation', function(){ 
      fireAdlucent(); 
   });
} 

