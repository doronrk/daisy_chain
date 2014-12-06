var resx;
var certonaCHObject= {
	appId : "chicos01",
	top1  : 100000,
	top2  : 100000,
	recordDelimiter:";",
	linkDelimiter:"",
	recommendationsLinkDelimiter:"|",
	initAndRun:function(productlist,customerIdentification, scheme, priceList, quantityList, eventName, host,itemList,totalPrice,orderNumber,pageID){
		resx = new Object();
			resx.appid = this.appId;
			resx.top1 = this.top1;
			resx.top2 = this.top2;
						
			if(eventName != null && eventName.length > 0){
				if(itemList != null){
					resx.itemid=this.getItems(itemList);
				}
				resx.event=eventName;
			}
			
			resx.links = this.constructAndGetLinks(productlist);
			resx.customerid=customerIdentification; 
			
			if(priceList != null){
				resx.price=this.getItems(priceList);
			}
			
			if(quantityList != null){
				resx.qty=this.getItems(quantityList);
			}
			
			if(totalPrice != null){
				resx.total=totalPrice;
			} 
			
			if(orderNumber != null){
				resx.transactionid=orderNumber;
			}
			
			if(pageID != null) {
				resx.pageid=pageID;	
			}
			
			//certonaResx.run();
	},
	initAndRunWithRecommendation:function(productlist,customerIdentification, priceList, quantityList, eventName, host,itemList,totalPrice,orderNumber,pageID){
		resx = new Object();
			resx.appid = this.appId;
			resx.top1 = this.top1;
			resx.top2 = this.top2;
			
			if(eventName != null && eventName.length > 0){
				if(itemList != null){
					resx.itemid=this.getItems(itemList);
				}
				resx.event=eventName;
			}
			
			resx.links = this.constructAndGetLinksWithRecommendations(productlist);
			resx.customerid=customerIdentification; 
			
			if(priceList != null){
				resx.price=this.getItems(priceList);
			}
			
			if(quantityList != null){
				resx.qty=this.getItems(quantityList);
			}
			
			if(totalPrice != null){
				resx.total=totalPrice;
			} 
			
			if(orderNumber != null){
				resx.transactionid=orderNumber;
			}
			
			if(pageID != null) {
				resx.pageid=pageID;	
			}

			certonaResx.run();
	},	
	constructAndGetLinks: function(productlist){
		var returnStr="";
		if(productlist == null){
			return returnStr;
		}
		for(var i=0;i<productlist.length;i++){
			returnStr+=productlist[i]+this.linkDelimiter+this.recordDelimiter;
		}
		
		return returnStr;
	},
	constructAndGetLinksWithRecommendations: function(productlist){
		var returnStr="";
		if(productlist == null){
			return returnStr;
		}
		for(var i=0;i<productlist.length;i++){
			var productArray = productlist[i].split(",");
			if(productArray[1].length>0){
				returnStr+=productArray[0]+this.recommendationsLinkDelimiter+productArray[1];
			} else{
				returnStr+=productArray[0];
			}
			if(i != (productlist.length-1)){
				returnStr+=this.recordDelimiter;
			}
		}
		
		return returnStr;
	},
	getItems: function(itemList){
		var returnStr="";
		if(itemList.length == 0){
			return returnStr;
		}
		
		for(var i=0;i<itemList.length;i++){
			var itemArray = itemList[i].split(",");
			if(itemArray.length ==1){
					returnStr+=itemArray[0];
					if(i <= (itemList.length-1)){
						returnStr+=this.recordDelimiter;
					}
			} else {
				if(itemArray[1].length == 0){
					returnStr+=itemArray[0];
					if(i <= (itemList.length-1)){
						returnStr+=this.recordDelimiter;
					}
				}
			}
		}
		
		return returnStr;
	}	
	
}