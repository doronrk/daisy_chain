$(document).ready(function()
{
	initializeProductUpdates();
	
	hideAllProductSections();

	$('.product-div-button').click(function(event)
	{
		handleHideNShow(event);
	});

	$('.product-image-button').click(function(event)
	{
		findAndUpdateProductImage(event);
	});
	
	$('#prodImagesDiv').show();
	$('#prodImages').removeClass('bg-left-inactive light-black');
	$('#prodImages').addClass('bg-left-active white');
	
});

$(window).load(function()
{
	setTimeout(	
	/* Delay Read All Reviews click modification
		1.5 seconds to allow reviews to show first.	*/
	function readAllReviews(){			
		var readReviews = $('.BVRRCount');	
		$(readReviews).on('click', function(event){productReadReviews(event);});
	
		var readReviewsAnchor = $("a[title=\"Read all reviews\"]");
		$(readReviewsAnchor).removeAttr('onclick');
		$(readReviewsAnchor).attr('href','#prodTabsUl');
	}, 1500);
});

/**
 * When attributes change the possible item price 
 * may change so we update the page with the 
 * findItemPrice function.
 * 
 * Promo Check to ensure price lookup does not 
 * occur when promotional product.
 * 
 */
function initializeProductUpdates()
{
	var promo = $('#prodTotal').attr("data-bos-promo");
	
	if (!promo)
	{
		var attributeDropDowns = $('select[name*="attributeSelections"]');
		for(var i=0; i< attributeDropDowns.length; i++)
		{
			var attr = attributeDropDowns[i];
			
			$(attr).bind("change", function(){findItemPrice();});
		}			
	}
}

/**
 * Change the currently displayed content
 * on the product page.
 * 
 * @param event
 */
function handleHideNShow(event)
{
	event.preventDefault();
	var aElement = event.currentTarget;
	var liElement = aElement.children[0];
	var divName = liElement.id + "Div";
	hideAllProductSections();
	$('#' + divName).show();
	$(liElement).removeClass('bg-left-inactive light-black');
	$(liElement).addClass('bg-left-active white');
	
	/*
	 * Remove LiquidPixels div content
	 * so that it does not appear in
	 * other tabs.
	 */
	if (mymagnify != null)
	{
		mymagnify.DESTROY();
	}
	
	if(divName == "prodImagesDiv")
	{
		var mainImage = $('#productFullImage');
		updateProductImage(mainImage);	
	}
}

function productReadReviews(event)
{
	event.preventDefault();
	hideAllProductSections();
	$('#prodReviewsDiv').show();
	$('#prodReviews').removeClass('bg-left-inactive light-black');
	$('#prodReviews').addClass('bg-left-active white');
}

function hideAllProductSections()
{
	// Hide all the divs
	$('.hide-n-show').hide();

	// Reset all the buttons to inactive class.
	$('.hide-n-show-button').removeClass('bg-left-inactive light-black');
	$('.hide-n-show-button').removeClass('bg-left-active white');
	$('.hide-n-show-button').addClass('bg-left-inactive light-black');
}

function findAndUpdateProductImage(event)
{
    var clickedImage = event.currentTarget;
    updateProductImage(clickedImage);
    
    //Move to Product Images tab.    
	hideAllProductSections();
	$('#prodImagesDiv').show();
	$('#prodImages').removeClass('bg-left-inactive light-black');
	$('#prodImages').addClass('bg-left-active white');
}

function updateProductImage(clickedImage)
{
	// Get Image Info
    var chainName = $(clickedImage).attr("data-bos-chainname");
    
    if (chainName != null && chainName.length > 0)
    {  	//Set liquid pixel magnify image.    	
     
    	if(chainName == "fullImage")
        {
        	//Liquid Pixels
        	mymagnify.setImage(fullImage);	
        }
    	
    	for (var i=0; i < 11; i++)
    	{
	        if(chainName == "altImage" + i)
	        {
	        	var chain = altImageList[i];
	        	//Liquid Pixels
	        	mymagnify.setImage(chain);	
	        }
    	}
    }
    else
    {
    	var imageSource = $(clickedImage).attr("src");

    	imageUpdate = $('<img />');
    	imageUpdate.attr('src', imageSource);
    	imageUpdate.attr('class', 'vertical-top subpend-2');
    	imageUpdate.attr('style', 'height:300px;width:300px;');
    	imageUpdate.attr('alt', $(clickedImage).attr("alt"));
    	imageUpdate.attr('title', $(clickedImage).attr("title"));
    	
    	$('#imageContent img').remove();    	
    	$('#imageContent').append(imageUpdate);
    }
}

/**
 * Ajax call to find price of current item
 * based on any selected attributes.
 * 
 */
function findItemPrice(){	
	
	var itemNumber = $('#itemNumber').attr("data-bos-itemnumber");
	var url = "/shop/find-itemcost.js?itemNumber="+itemNumber;
	
	var attributeDropDowns = $('select[name*="attributeSelections"]');
	for(var i=0; i< attributeDropDowns.length; i++)
	{
		var attr = attributeDropDowns[i];
		var attrValue = attr.options[attr.selectedIndex].value;
		var attrName = getRealAttributeName(attr.id);
		
		if (attrValue != "-" && attrName != "")
		{
			var append = "";
			append = "&attributeValues=";
			append = append + attrName;
			append = append + "|";
			append = append + attrValue;
			url = url + append;
		}
		
	}

	// setup object array of variables to pass to ajax 
	var options =
	{
		url : url
		,success : function(x) { updateProductTotal(x);}
	};

	//execute ajax call
	$.ajax(options);
}

/**
 * Function to change price display on web page.
 * 
 * @param jsonData
 */
function updateProductTotal(jsonData)
{
	if (jsonData.hasData == "true")
	{
		if(jsonData.currentItemSalePrice != null)
		{
			$('#prodTotal').text("$"+Number(jsonData.currentItemSalePrice).toFixed(2));				
		}
		else
		{
			$('#prodTotal').text("$"+Number(jsonData.currentItemListPrice).toFixed(2));	
		}
	}
	else
	{
		$('#prodTotal').text("");
	}
}