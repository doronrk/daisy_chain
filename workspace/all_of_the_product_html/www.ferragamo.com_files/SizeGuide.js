//-----------------------------------------------------------------
// Javascript functions to manage size guide lightbox
// 
// @autor Lorenzo Cavina
//
//-----------------------------------------------------------------
	
SizeGuide = {
	open:function(callback){
	 	if (callback) {  
	        callback();  
	    }  
	 	
		showById("sizeguide_lightbox");
	},
		
	close:function(callback){
		if (callback) {  
	        callback();  
	    }  
		
		hideById("sizeguide_lightbox");
	}
}