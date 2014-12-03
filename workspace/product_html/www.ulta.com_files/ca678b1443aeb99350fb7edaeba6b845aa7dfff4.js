//MiniCart Click
$(document).on("click", '.minicart a:last', function(eventObject) { 
    eventObject.preventDefault();
    var _newURL = $(eventObject.currentTarget).attr("href");
    $(document).trigger("MiniCartClick", [eventObject, _newURL]);  
    delayThenRedirect(_newURL);
});


//Left Nav Click

$('.sidebar-nav ul a').not('.img-cont a, .beauty-dest-flyout a').click(function(eventObject) {
    eventObject.preventDefault();
    var _newURL = $(eventObject.currentTarget).attr("href");
    var _linkText = $(eventObject.currentTarget).text(); 
    var _linkParentText = $(eventObject.currentTarget).parent().siblings('.title').text();
    var _linkCategoryText = $(eventObject.currentTarget).parent().parentsUntil(".nav-pos ov").prev('a').text();
	var _linkPath = "";
    
	if(_linkCategoryText.length > 0){
		_linkPath = _linkCategoryText.trim() + ":";
	}
	if(_linkParentText.length > 0){
		_linkPath += _linkParentText.trim() + ":";
	}
	_linkPath += _linkText.trim();
    
    

    $(document).trigger("LeftNavClick", [eventObject, _newURL, _linkPath]);  
    delayThenRedirect(_newURL);
});



// Left Nav Promo 
$('.sidebar-nav .img-cont a').click(function(eventObject) {    
    eventObject.preventDefault();

	var _newURL = $(eventObject.currentTarget).attr("href");
    var _categoryText = "LN - PromoSpot " + $(eventObject.currentTarget).closest('li').find('a:first').text(); 
	
    $(document).trigger("LeftNavPromoClick", [eventObject, _newURL, _categoryText]);  

    delayThenRedirect(_newURL);

});

// Left Nav Beauty Dest Promo
$('.beauty-dest-flyout a').click(function(eventObject) {
    eventObject.preventDefault();
    
    var _newURL = $(eventObject.currentTarget).attr("href");
    var _linkParentText = "LN - PromoSpot " + $(eventObject.currentTarget).parentsUntil('.beautyd-flyout').siblings('a').text();    

    $(document).trigger("LeftNavPromoClick", [eventObject, _newURL, _linkParentText]);  
    delayThenRedirect(_newURL);
});



function delayThenRedirect(urlParam){    

 try{        
        if(urlParam === 'undefined'){
              return;
        }
        else{
              if(urlParam.length > 0){
                setTimeout(function(){window.location = urlParam;}, 500);
              }
        }
    }
    catch(e){
        console.info("Unable to redirect link: " + e);
    }


}
