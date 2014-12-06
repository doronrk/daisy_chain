ShareThisJS = {
		/** product id which is currently in use to track for bundle level products. **/
		productId : "",
		
		/** Indicate whether is bundle product. **/
		isBundleProduct : false,

		
		/** 
		 * Calls the GetShareThisInfo.jsp to get the Json object which contains the Share this links.
		 */
		setupPopup:function(productId,categoryId,parent_category_rn){
			
			this.resetPopup();
			
			var parameters = {};
			parameters.storeId = CommonContextsJS.storeId;
			parameters.langId=CommonContextsJS.langId;
			parameters.catalogId=CommonContextsJS.catalogId;
			parameters.categoryId=categoryId;
			if(parent_category_rn != ''){
				parameters.parent_category_rn=parent_category_rn;
			}
			parameters.productId=productId;	
			
			dojo.publish("ajaxRequestInitiated");
			dojo.xhrPost({
					url: getAbsoluteURL() + "GetShareThisInfo",				
					handleAs: "json-comment-filtered",
					content: parameters,
					service: this,
					load: this.populatePopUp,
					error: function(errObj,ioArgs) {
						console.debug("ShareThis.showPopup: Unexpected error occurred during an xhrPost request.");
						dojo.publish("ajaxRequestCompleted");
					}
				});
		},
		
		/** 
		 * Populates and shows the popup
		 */
		populatePopUp:function(serviceResponse, ioArgs) {
			var shareThisDiv;
			if(ShareThisJS.isBundleProduct)
				shareThisDiv = dojo.byId("shareThis_"+ShareThisJS.productId);
			else
				shareThisDiv = dojo.byId("shareThis");
			ShareThisJS.createDiv("Facebook",serviceResponse.shareThis.Facebook,shareThisDiv,"Facebook","<img alt='Facebook' src='/wcsstore/THStorefrontAssetStore/akamai/social/facebook.png'>");
			ShareThisJS.createDiv("Twitter",serviceResponse.shareThis.Twitter,shareThisDiv,"Twitter","<img alt='Twitter' src='/wcsstore/THStorefrontAssetStore/akamai/social/twitter.png'>");
			ShareThisJS.createDiv("Pinterest",serviceResponse.shareThis.Pinterest,shareThisDiv,"Pinterest","<img alt='Pinterest' src='/wcsstore/THStorefrontAssetStore/akamai/social/pinterest.png'>");
			ShareThisJS.createDiv("Tumblr",serviceResponse.shareThis.Tumblr,shareThisDiv,"Tumblr","<img alt='Tumblr' src='/wcsstore/THStorefrontAssetStore/akamai/social/tumblr.png'>");
			ShareThisJS.showPopup();
		},
		
		/** 
		 * Creates each link entry for the shareThis div.
		 */
		createDiv:function(id,href,div,title,img){
			var mergeDiv = "<div id='"+id+"Div'>";
			mergeDiv = mergeDiv + "<a id='"+id+"Link' href='javascript:void(0);' onclick='javascript:window.open(\""+href+"\",\""+id+"\",\"width=600,height=600,resizable=yes,scrollbars=1\")'>"+img+"</a>";
			mergeDiv = mergeDiv + "</div>";
			div.innerHTML = div.innerHTML + mergeDiv;
		},
		
		/** 
		 * Resets the popup incase of new data.
		 */
		resetPopup:function(){
			if(this.isBundleProduct)
				shareThisDiv = dojo.byId("shareThis_"+this.productId);
			else
				shareThisDiv = dojo.byId("shareThis");
			shareThisDiv.innerHTML = "";
		},
		
		
		/** 
		 * Hides the pop-up.
		 */		
		hidePopup:function(){
			if(this.isBundleProduct)
				shareThisDiv = dojo.byId("shareThis_"+this.productId);
			else
				shareThisDiv = dojo.byId("shareThis");
			shareThisDiv.style.display ="none";
		},
		
		/** 
		 * Displays the pop-up.
		 */	
		showPopup:function(){
			if(this.isBundleProduct)
				shareThisDiv = dojo.byId("shareThis_"+this.productId);
			else
				shareThisDiv = dojo.byId("shareThis");
			shareThisDiv.style.display ="block";
		},
		
		/** 
		 * Determines the function to call based on current states.
		 */
		toggle:function(productId,categoryId,parent_category_rn,isBundleProduct){
			var shareThisDiv;
			this.productId = productId;
			if(isBundleProduct)
			{
				shareThisDiv = dojo.byId("shareThis_"+productId);
				this.isBundleProduct = true;
			}
			else
			{
				shareThisDiv = dojo.byId("shareThis");
				this.isBundleProduct = false;
			}
			if(shareThisDiv.innerHTML == ""){
				this.setupPopup(productId,categoryId,parent_category_rn);
			}
			else if(shareThisDiv.style.display == "none"){
				this.showPopup();
			}
			else{
				this.hidePopup();
			}
		}
		
}