function scrollMenuLeft() 
{
	var hidden = $('#recently-viewed').find('div.scrollable:visible:first').prev();
	var displayed= $('#recently-viewed').find('div.scrollable:visible:last');

	// Scroll backward unless we are on the first 'scrollable'.
	if (hidden.hasClass("scrollable")) 
	{
		hidden.show();
		displayed.hide();
	}
}

function scrollMenuRight() 
{
	var hidden = $('#recently-viewed').find('div.scrollable:visible:last').next();
	var displayed = $('#recently-viewed').find('div.scrollable:visible:first');

	// Scroll forward unless we are on the last 'scrollable'.
	if (hidden.hasClass("scrollable")) 
	{
		hidden.show();
		displayed.hide();
	}
}

function fetchRecentlyViewedProducts(storeContextPrefix, itemNumber) 
{
	var url = storeContextPrefix + '/recently-viewed.json?itemNumber='+ itemNumber;

	// setup object array of variables to pass to ajax
	var options = 
	{
		url : url,
		success : function(x) 
		{
			if (x.hasPreviouslyViewedProducts !== undefined && x.hasPreviouslyViewedProducts == "true") 
			{
				displayRecentlyViewedProducts(x.products);
			}
		}
	};
	// execute ajax call
	$.ajax(options);
}

function displayRecentlyViewedProducts(scrollableItems) 
{
	var productResults = new Object();
	var products = new Array();
	var headerText = 'Recently Viewed Products';

	var i = 0;
	for (i = 0; i < scrollableItems.length; i++) 
	{
		var p = scrollableItems[i];
		products[i] = new Object();
		products[i].itemNumber = p.itemNumber;
		products[i].name = p.name;
		products[i].description = p.descriptionLine1 + p.descriptionLine2 + p.descriptionLine3;
		products[i].thumbNail = "http://www.boscovs.com/wcsstore/boscovs/images/store/product/thumbnails/" + p.smallImage.name;
		products[i].listPrice = Number(p.listPriceRange.lowPrice).toFixed(2);
		products[i].salePrice = Number(p.priceRange.lowPrice).toFixed(2);
		products[i].originalPrice = Number(p.listPriceRange.lowPrice).toFixed(2);
		products[i].isOnClearance = p.onClearance;
		products[i].isOnSale = p.onSale;
		products[i].reviewCount = p.reviewCount;
		products[i].reviewRatings = p.reviewRatings;
	}

	productResults.products = products;

	if (products.length > 0) 
	{
		var myDiv = $('#recently-viewed');
		myDiv.setTemplateURL('/store/content/assortment/assortment-grid-template.html');
		//myDiv.setParam('mod', mod);
		myDiv.setParam('header_text', headerText);
		myDiv.setParam('cross_sell_tag', 'RV=true');
		myDiv.setParam('grid_cell_count', 3);
		var scp = "/store/content";
		myDiv.setParam('store_content_prefix', scp);
		var scxp = "/shop";
		myDiv.setParam('store_context_prefix', scxp);
		myDiv.setParam('scroll_enabled','true');
		myDiv.processTemplate(productResults);
		//add click function to left and right control
		$('.left-scroll-button').click(function() {scrollMenuLeft();});
		$('.right-scroll-button').click(function() {scrollMenuRight();});
		var productDivs = $('#recently-viewed').find('.scrollable');
		$.each(productDivs, function(index, theDiv) 
		{
			if(index < 3)
			{
				$(theDiv).show();
			}
			else
			{
				$(theDiv).hide();
			}
		});
	}
}