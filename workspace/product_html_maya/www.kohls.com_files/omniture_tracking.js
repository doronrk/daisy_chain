 $(document).ready(function() {
	$("a.br-related-query-link").on('click', function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'pfm=br-searchwidget';
        var modifiedRequest = addUrlParam(request,productFindingMethod,false);
        location.href = modifiedRequest;
    }); 
  
    $("div.br-sf-widget-merchant-img a").on('click', function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'pfm=br-searchwidget';
        var modifiedRequest = addUrlParam(request,productFindingMethod,false);
        location.href = modifiedRequest;
    }); 
    
    $("div.br-sf-widget-merchant-title a").on('click', function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'pfm=br-searchwidget';
        var modifiedRequest = addUrlParam(request,productFindingMethod,false);
        location.href = modifiedRequest;
    }); 
    
    
    $("div.br-sf-widget-merchant-popup-view a").on('click', function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'pfm=br-searchwidget';
        var modifiedRequest = addUrlParam(request,productFindingMethod,false);
        location.href = modifiedRequest;
    }); 
    
    if (!($("#submissionRequest").length)) {
	    $("#br-thematic-page a").live('click', function(event){
	    	event.preventDefault();
	        var request = $(this).attr("href");
	        var productFindingMethod= 'pfm=br-thematicpage';
	        var modifiedRequest = addUrlParam(request,productFindingMethod,false);
	        location.href=modifiedRequest;
	    });
 	}
  
    if (!($("#submissionRequest").length)) {
	    $("#br-thematic-page img.product-image").live('click', function(event){
	    	event.preventDefault();
	        //var request = $(this).attr("href");
	    	var request = $(this).parent().attr("href");
	        var productFindingMethod= 'pfm=br-thematicpage';
	        if(request != undefined && request != 'undefined') {
	        	var modifiedRequest = addUrlParam(request,productFindingMethod,false);
	        	location.href=modifiedRequest;
	        }
	    });
 	}
    
    $(document).on('click',"a[href^='http://www.hlserve.com']", function(event){
        event.preventDefault();
        var request = $(this).attr("href");
        if(pageName == 'searchResultsPage'){
            var productFindingMethod= 'pfm=hooklogic-search-A';
        }
        else{
            var productFindingMethod= 'pfm=hooklogic-pmp-A';
        }       
        var modifiedRequest = addUrlParam(request,productFindingMethod,true);
        location.href = modifiedRequest;
    });
    
    $(document).on('click',"div#rr_horizontal_product_recommendations_div_id a", function(event){
          event.preventDefault();
          var request = $(this).attr("href");
          var productFindingMethod= 'pfm=rrrecs-pdp-hor';
          var modifiedRequest = addUrlParam(request,productFindingMethod,true);
          location.href = modifiedRequest;
    }); 

    $(document).on('click',"div#rr_pdp_product_recommendations_div_id div#rrBox0 a", function(event){
        event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'pfm=rrrecs-pdp-gtab1';
        var modifiedRequest = addUrlParam(request,productFindingMethod,true);
        location.href = modifiedRequest;
    }); 

    $(document).on('click',"div#rr_pdp_product_recommendations_div_id div#rrBox1 a", function(event){
        event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'pfm=rrrecs-pdp-gtab2';
        var modifiedRequest = addUrlParam(request,productFindingMethod,true);
        location.href = modifiedRequest;
    }); 

    $(document).on('click',"div#rr_vertical_product_recommendations_div_id a", function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'pfm=rrrecs-pdp-vert';
        var modifiedRequest = addUrlParam(request,productFindingMethod,true);
        location.href = modifiedRequest;
       
    }); 
    
    $(document).on('click',"div.rr_product_matrix_page_horizontal_ads a", function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'pfm=rrrecs-pmp-hor';
        var modifiedRequest = addUrlParam(request,productFindingMethod,true);
        location.href = modifiedRequest;
    });
    
    $(document).on('click',"div.rr_search_page_horizontal_ads a", function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'pfm=rrrecs-search-hor';
        var modifiedRequest = addUrlParam(request,productFindingMethod,true);
        location.href = modifiedRequest;
    }); 
        
    $("div#mboxClick-kohlscom_product_recommendations a").on('click', function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'cross-sell';
        if (request.indexOf("?") > -1) {
      	  var modifiedRequest = request+"&pfm="+productFindingMethod;
        } else {
      	  var modifiedRequest = request+"?pfm="+productFindingMethod;
        }
        location.href = modifiedRequest;
    }); 
    
    $("div#mboxClick-kohlscom_product_page_product_recs_horizontal a").on('click', function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'orecs-pdp-hor';
        if (request.indexOf("?") > -1) {
      	  var modifiedRequest = request+"&pfm="+productFindingMethod;
        } else {
      	  var modifiedRequest = request+"?pfm="+productFindingMethod;
        }
        location.href = modifiedRequest;
    });

    $("div#mboxClick-kohlscom_productnotavailable_product_recs_horizontal a").on('click', function(event){
    	event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= 'orecs-prodnotavailable-hor';
        if (request.indexOf("?") > -1) {
      	  var modifiedRequest = request+"&pfm="+productFindingMethod;
        } else {
      	  var modifiedRequest = request+"?pfm="+productFindingMethod;
        }
        location.href = modifiedRequest;
    });
	/*On click of suggested product, display of omniture for shopping cart page*/
	$('.cart_content_area_marker .ap_tabs .suggestedimage a').live('click', function(event){
		event.preventDefault();
        var request = $(this).attr("href");
        var productFindingMethod= request+'?pfm=bdrecs-shoppingcart';
        location.href = productFindingMethod;
	});
	/*end*/
	
	// Added for Search redirect omniture event
	$('#dimensions a').live('click', function(e) {
  	   var term = location.href.match(/searchTerm=(.*)[&]?/);
  	   if (term) {
    		term = term[1];
    		e.preventDefault();
    		e.stopPropagation();
    		location.href = $(this).attr('href')+'&searchTerm='+term;
  	   }  
	});
	
});
 
function addUrlParam(url,parameter,isUrlEncoded) {
	var modifiedURL = url;
	if(isUrlEncoded){
		// appends using the encoded url charaters like %3F (?) , %26 (&) , %23 (#) etc
		if (url.indexOf(".jsp%3F") > -1) {
			if (url.indexOf("%23") > -1) {
				 var urlParts= url.split("%23");
				 var modifiedURL = urlParts[0]+"%26"+parameter+"%23"+urlParts[1];
       	  	} else {
       	  		var modifiedURL = url+"%26"+parameter;
       	  	}
       } else {
    	   if (url.indexOf("%23") > -1) {
				 var urlParts= url.split("%23");
				 var modifiedURL = urlParts[0]+"%3F"+parameter+"%23"+urlParts[1];
     	  	} else {
     	  		var modifiedURL = url+"%3F"+parameter;
     	  	}
       }
		 
	 } else {
		 if (url.indexOf(".jsp?") > -1) {
				if (url.indexOf("#") > -1) {
					 var urlParts= url.split("#");
					 var modifiedURL = urlParts[0]+"&"+parameter+"#"+urlParts[1];
	       	  	} else {
	       	  		var modifiedURL = url+"&"+parameter;
	       	  	}
	       } else {
	    	   if (url.indexOf("#") > -1) {
					 var urlParts= url.split("#");
					 var modifiedURL = urlParts[0]+"?"+parameter+"#"+urlParts[1];
	     	  	} else {
	     	  		var modifiedURL = url+"?"+parameter;
	     	  	}
	       }
	 }
	 return modifiedURL;
}
