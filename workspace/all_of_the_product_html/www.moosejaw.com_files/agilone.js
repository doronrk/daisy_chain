jQuery(document).ready(function() {
    			var agileNum = jQuery('.agileLink').length 
				var agileLength = agileNum*175
				
				if(agileNum > 2) {
					jQuery(".agileButton").show();
				}
				else {
					jQuery(".agileButton").hide();
					jQuery(".agileBigBox").css( "margin-left","25px");
				}
	
				jQuery(".agileSlidingWindow").css('width', agileLength + 'px'); 
    
    			jQuery('#agileNextColumn').click(function(event) {
        			event.preventDefault();
        			jQuery('.agileTableContainer').animate({scrollLeft:'+=150'}, 'slow');        
    			});
    			jQuery('#agilePrevColumn').click(function(event) {
       				 event.preventDefault();
        			jQuery('.agileTableContainer').animate({scrollLeft:'-=150'}, 'slow');        
    			});
			});