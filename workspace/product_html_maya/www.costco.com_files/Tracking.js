RICHFX.prototype.Tracking = function () {

  var page_loaded_handler = function(){
  	alert('page loaded');
  }
  
  var image_with_view_found_handler = function(elem) {
    	 alert('image found -> ' + elem.src);
  }

  var mouseout_handler = function( e, elem ){
  	RICHFX.removeEventListener( elem, 'mouseout', mouseout_handler, RICHFX, elem  );
  	 	
  	alert('mouse out -> ' + elem.src);
  	
  	RICHFX.addEventListener( elem, 'mouseout', mouseout_handler, RICHFX, elem );
  }
  
  var mouseover_handler = function( e, elem ){
  	RICHFX.removeEventListener( elem, 'mouseover', mouseover_handler, RICHFX, elem );
  	
  	alert('mouse over -> ' + elem.src);
  	
  	RICHFX.addEventListener( elem, 'mouseover', mouseover_handler, RICHFX, elem  );
  }
  
  var click_handler = function( e, elem ){
    	alert('image clicked -> ' + elem.src);
  }
  
 
  var gaload_handler = function(){
	var registeredElements = RICHFX.getRegisteredElements();
	for ( var k in registeredElements ) {
		var elem = registeredElements[k];
	  	image_with_view_found_handler.apply(this, [elem]);
	        
	        // register mouse over, mouse out, click for each images with viewer
	        RICHFX.addEventListener( elem, 'mouseover', mouseover_handler, RICHFX, elem  );
		RICHFX.addEventListener( elem, 'mouseout', mouseout_handler, RICHFX, elem  );
		RICHFX.addEventListener( elem, 'click', click_handler, RICHFX, elem  );
	}
	page_loaded_handler.apply(this);
   }
     
  RICHFX.includeJS( "http://www.google-analytics.com/ga.js", true, gaload_handler, this );
}