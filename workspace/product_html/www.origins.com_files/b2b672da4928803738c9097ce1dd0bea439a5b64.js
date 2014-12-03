function setCartCookie() {
  myhost=window.location.host;
  document.cookie = 'btcartcookie=; expires=Thu, 2 Aug 2031 20:47:11 UTC; path=/;domain=' + myhost; 

}

//from Jquery
function read_cookie(key)
{
    var result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
}


var addPassthruEvent = (typeof(document.observe)=="function") ? document.observe : function(eventName,callback){};


addPassthruEvent("livechat:button_clicked", function(event){
    var passthruArgs = event.memo;
    jQuery(window).trigger("livechat:button_clicked", passthruArgs);
});

addPassthruEvent("livechat:invite_shown", function(event){
    var passthruArgs = event.memo;
    jQuery(window).trigger("livechat:invite_shown", passthruArgs);
});

addPassthruEvent("livechat:invite_accepted", function(event){
    var passthruArgs = event.memo;
    jQuery(window).trigger("livechat:invite_accepted", passthruArgs);
});


document.observe("MPP:productQV", function(obj){
          console.log("GOT QV EVENT",obj.memo);  
          jQuery(window).trigger("MPP:productQVBT", [obj.memo]);
          
          console.log("JQuery fire: MPP:productQVBT with ",[obj.memo]);
       
 });
 
 
 
 document.observe("RPC:RESULT", function(obj){
             
            var fireBTEvent=false;
            var fireEmailSignup = false;
            var resultObjCusID = '';
            var rpcRequestArray, rpcResponseArray;                                                                                                                                  
            var requestMethod, requestId;     
            var bagDetailOut = new Array();
            var localPath=document.location.pathname;                                                                                                                               
                                                                                                                                                                                    
            if (typeof obj.memo.request != "undefined") {                                                                                                                           
                rpcRequestArray = (obj.memo.request.parameters.JSONRPC !== null) ?                                                                                                   
                    obj.memo.request.parameters.JSONRPC.evalJSON() :                                                                                                                
                    null;                                                                                                                                                           
                if (rpcRequestArray) {                                                                                                                                              
                    rpcResponseArray = obj.memo.responseText.evalJSON();                                                                                                            
                    if (rpcResponseArray) {                                                                                                                                         
                        rpcRequestArray.each(function(rpcRequest){                                                                                                                  
                            requestMethod = rpcRequest.method;                                                                                                                      
                            requestId = rpcRequest.id;                                                                                                                              
                            console.log("BT handling RPC request:  ", requestMethod, " with id: ", requestId);                                                                      
                                // Make sure we have the response for this request (id's must match).                                                                               
                                var myRpcResponse = rpcResponseArray.find(function(rpcResponse){                                                                                    
                                    return rpcResponse.id == requestId;                                                                                                              
                                });                                                                                                                                                 
                                if (myRpcResponse && myRpcResponse.result !== null) {                                                                                                
                                    console.log("BT will handle ", myRpcResponse.result.data);                                                                        
                                    // old tags added here                                        
                                    
                                    if (typeof rpcRequest.params !== 'undefined'){
                                        if (typeof rpcRequest.params[0] != 'undefined'){
                                              if (rpcRequest.params[0]['_SUBMIT']=='email_signup'){                                        	  	
                                        	      fireEmailSignup = true;	   
                                        	      //resultObjCusID =  myRpcResponse.result.Analytics['Analytics::CoreMetrics']['dom:loaded']['params'][0];                                    	  	
                                        	  } 
                                        	
                                        	
                                            if (rpcRequest.params[0]['_SUBMIT']=='cart' || rpcRequest.params[0]['_SUBMIT']=='alter_replenishment'){
                                                resultObj = myRpcResponse.result.data.ac_results[0].result.CARTITEM;
                                                
                                                //console.log("BT was a cart RPC: ",rpcRequest.params[0]); 
                                                
                                                bagDetailOut['cartInc'] = rpcRequest.params[0]['INCREMENT'];
                                                bagDetailOut['cartIncQty'] = rpcRequest.params[0]['QTY']; //to in by, not total
                                                bagDetailOut['cartQty'] = resultObj['ITEM_QUANTITY'];
                                                bagDetailOut['itemName'] = resultObj['prod.PROD_RGN_NAME'] +' '+resultObj['prod.PROD_RGN_SUBHEADING'];
                                                
                                                product_key = resultObj['prod.PRODUCT_KEY'].replace('"','');
                                                catprod = product_key.split("~");                                                
                                                bagDetailOut['itemCat']=catprod[0];
                                                bagDetailOut['itemProd']= catprod[1];
                                                
                                                //console.log ("BT RESULT detail ",resultObj);
                                                
                                                fireBTEvent=true;    
                                            }
                                        }
                                    }
                                }                                                                                                                                                   
                                                                                                                                                                          
                                                                                                                                                                                    
                        });                                                                                                                                                         
                    }                                                                                                                                                               
                }                                                                                                                                                                   
            }                                                                                                                                                                       

          
          
          if (fireEmailSignup===true){
              jQuery(window).trigger("TOPNAVRESULT");                 	
          }
          if (fireBTEvent===true){
              setCartCookie('btcartcookie');  //if this exists it is now out of date. 
              jQuery(window).trigger("BTCARTALTER", [bagDetailOut]);
              console.log("BT, sent to ARGS ",bagDetailOut);
          }
 });
 
