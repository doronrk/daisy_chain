/**
 * Support tools to manage Product Additional Info data
 * display into product page.
 */
if(typeof(ProductAdditonalInfo) == "undefined" || ProductAdditonalInfo == null || !ProductAdditonalInfo) {
	
	ProductAdditonalInfo = {
			
		current : function(curr){
			if(curr == null || curr == undefined)
				return $jq("#ai_current").html();
			else
				$jq("#ai_current").html(curr);
		},
		
		/** Display the selected content */
		showContent : function(contentId){
			
			this.setContentById(contentId);
			showById("additionalInfoLightbox");
			
		},
		
		/** Set content to be displayed */
		setContentById : function(contentId){
			if(this.current() != ""){
				hideById(this.current());
				removeClassById("menu_item_" + this.current(), "selected");
			}
	
			addClassById("menu_item_" + contentId, "selected");
			showById(contentId);
			this.current(contentId);
		},
		
		close : function(){
			hideById("additionalInfoLightbox");
		}
	}
}