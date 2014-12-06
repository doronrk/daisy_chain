// Default Autosuggest configuration
var autosuggestConfig = {
    accountId: 5079,
    authKey: 'd1qiei07nwrrdicq',
    domainKey: 'forever21_us_com',
    environment: 'prod',
    resultContainer: ".brm-autosuggest-menu",
    //render: false,
    //responseCallback: newRenderFunction,
    searchCallback: function (searchUrl, searchData) {		
        location.hash = searchUrl.substring(searchUrl.indexOf('#') + 1);
    }
};


var autosuggestConfig_header = {
    accountId: 5079,
    authKey: 'd1qiei07nwrrdicq',
    domainKey: 'forever21_us_com',
    environment: 'prod',
    resultContainer: ".brm-autosuggest-menu-header",
    //render: false,
    //responseCallback: newRenderFunction,
    searchCallback: function (searchUrl, searchData) {
        location.href = searchUrl;
        //location.hash = searchUrl.substring(searchUrl.indexOf('#') + 1);
    }
};

function newRenderFunction(content) {
    console.log(content);

}

// Initialize the plug-in
$(document).ready(function () {
    $('#ihKeyword').brm_suggest(autosuggestConfig_header);
    $('#txtBloomreachSearch').brm_suggest(autosuggestConfig);
});
// Default Search configuration
var F = BR.mobile.apiFields;
var searchConfig = {
    accountId: 5079,
    authKey: 'd1qiei07nwrrdicq',
    domainKey: 'forever21_us_com',
    environment: 'prod',
//    accountId: 5193,
//    authKey: 'i92e45ystrpbhuh7',
//    domainKey: 'forever21_uk_com',
//    environment: 'prod',
    renderFunction: renderResultsPage,
    numResults: 60,
	//add flags for item tag
    fieldNames: [F.pid, F.title, F.brand, F.price, F.sale_price, F.promotions, F.thumb_image, F.sku_thumb_images, F.sku_swatch_images, F.sku_color_group, F.url, F.flags]
};
var searchConfig_JFY = {
    accountId: 5079,
    authKey: 'd1qiei07nwrrdicq',
    domainKey: 'forever21_us_com',
    environment: 'prod',
    //    accountId: 5193,
    //    authKey: 'i92e45ystrpbhuh7',
    //    domainKey: 'forever21_uk_com',
    //    environment: 'prod',
    renderFunction: renderJFYResultsPage,
    numResults: 60,
	//add flags for item tag
    fieldNames: [F.pid, F.title, F.brand, F.price, F.sale_price, F.promotions, F.thumb_image, F.sku_thumb_images, F.sku_swatch_images, F.sku_color_group, F.url, F.flags]
};
var searchConfig_noResult = {
    accountId: 5079,
    authKey: 'd1qiei07nwrrdicq',
    domainKey: 'forever21_us_com',
    environment: 'prod',
    //    accountId: 5193,
    //    authKey: 'i92e45ystrpbhuh7',
    //    domainKey: 'forever21_uk_com',
    //    environment: 'prod',
    renderFunction: renderJFYResultsPage,
    numResults: 4,
	//add flags for item tag
    fieldNames: [F.pid, F.title, F.brand, F.price, F.sale_price, F.promotions, F.thumb_image, F.sku_thumb_images, F.sku_swatch_images, F.sku_color_group, F.url, F.flags]
};

/* Initialize the plug-in */
var brmSearchContainer = $('<div id="contents"></div>');

if (location.href.toLowerCase().indexOf('noresult.aspx') > 0) {
    //brmSearchContainer.brm_search(searchConfig);
    brmSearchContainer.brm_search(searchConfig_noResult);
}
else if (location.href.toLowerCase().indexOf('justforyou.aspx') > 0 || location.href.toLowerCase().indexOf('trending.aspx') > 0) {
    brmSearchContainer.brm_search(searchConfig_JFY);
}
else {
    brmSearchContainer.brm_search(searchConfig);
}

/* display names for filters */
var filterDisplayNames = {
    "color_group": "color"
}

var brandFilterDisplayNames = {
    "F21": "FOREVER 21",
    "21MEN": "21MEN",
    "LOVE21": "LOVE21",
    "GIRLS": "FOREVER 21 GIRLS",
    "PLUS": "FOREVER 21+",
    "BYBOE": "BY BOE"
}

var priceFilterDisplayNames = {
    "[0 TO 10]": "under $10",
    "[10 TO 20]": "$10 ~ $20",
    "[30 TO *]": "over $30"
}

/* Render the entire page of search results. */
function renderResultsPage(results) {
    console.log(results);
	
    var resultsContainer = $('#container');
	var did_you_mean = '';
	
	if(results.did_you_mean != null)
	{
		if(results.did_you_mean.length > 0)
		{	
			for(i=0;i<results.did_you_mean.length;i++) {
			    if (i != 0) {
			        did_you_mean += ', ';
                }

			    did_you_mean += '<a href="#brm-search?request_type=search&search_type=keyword&q=' + results.did_you_mean[i] + '&l=' + results.did_you_mean[i] + '">' + results.did_you_mean[i] + '</a>';
			}
		}
	}
     // remove previous results
    $('#filter_category').html('');
    $('#filter_brand').html('');
    $('#product_list').html('');
    $('#filter_size').html('');
    $('#filter_price').html('');
    $('#filter_colorGroup').html('');
    $('#filter_current').html('');
    $('#pagination_top').html('');
    $('#pagination_bottom').html('');
    $('#sort_options').html('');
	$('#m_recommendation').html('');
	
	/* did you mean */
	if (did_you_mean != '') {
	    renderRecommendation(did_you_mean);
	    $('#m_recommendation').css('display', 'block');
	}
	else {
	    $('#m_recommendation').css('display', 'none');
	}
	
    if (results.numResults == 0) {
        $('#contents_left').css('display', 'none');
        $('#contents_right').css('display', 'none');
        $('#contents_center').css('display', 'none');

        var typedText = '';
        typedText = window.location.hash.match(/&q=([^&]+)/)[1].replace(/%20/g, " ");
        //alert(BR.mobile.getJfyUrl("jfy,dynamic_categories"));
        location.href = 'NoResult.aspx?searchTerm=' + typedText + BR.mobile.getJfyUrl("jfy,dynamic_categories");
        //location.href = 'NoResult.aspx?searchTerm=' + typedText + '#brm-search?request_type=jfy';
    }
    else {
        $('#contents_left').css('display', 'block');
        $('#contents_right').css('display', 'block');
        $('#contents_center').css('display', 'none');

        /* Filters */
        var filtersContainer = $('#filter_category');

        renderFilters(results.availableFilters, results.currentFilters, filtersContainer);

        setPagination(results.numResults, results.startIndex);
        // console.log(filtersContainer);
		
        /* Sorting */
        renderSort(results.availableSorts, results.currentSort);

        /* Products */
        var contents_rightContainer = $('#product_list');
        var productGrid = $('<div></div>', { class: 'productgridpage' });
        contents_rightContainer.append($('<div></div>', { class: 'productgrid mw-three-up' }).append(productGrid));
        renderProducts(results.products, productGrid, results.brTrkData);

        brmSearchContainer.trigger('brm-rendered');
    }

}

function renderRecommendation(did_you_mean)
{
    var recommendContainer = $('#m_recommendation');
	recommendContainer.append('<b>DO YOU MEAN : </b>');
    recommendContainer.append(did_you_mean);        
}

function renderJFYResultsPage(results) {
    console.log(results);

    try {
        if (results.title.toLowerCase() == "what's hot")
            $('#search_trending').css('display', 'block');
        else
            $('#search_jfy').css('display', 'block');
    }
    catch (err)
    { }

    var resultsContainer = $('#container');

    /* Products */
    var contents_rightContainer = $('#product_list');
    var productGrid = $('<div></div>', { class: 'productgridpage' });
    contents_rightContainer.append($('<div></div>', { class: 'productgrid mw-three-up' }).append(productGrid));
    renderProducts(results.products, productGrid, results.brTrkData);

    brmSearchContainer.trigger('brm-rendered');

    /* Dynamic Category */
    if (results.isDynamicCats) {
        var dynamic_container = $('#dynamic_cats');

        var docs = results.dynamicCats.docs;

        for (var i = 0; i < docs.length; i++) {
            var productGrid_dynamic = $('<div></div>', { class: 'productgridpage_' + i });
            if (docs[i].title) {
                // bind title
                dynamic_container.append($('<div id="search_subtitle"></div>').append('<div class="search_cat_subtitle">' + docs[i].title + '</div>'));

                // bind items
                dynamic_container.append($('<div class="product_list_4colums"></div>').append(productGrid_dynamic));
                renderProducts(docs[i].docs, productGrid_dynamic, results.brTrkData);
            }
        }
    }
}

/* Render the product list */
function renderProducts(products, productGrid, brTrkData) {
    var nItemCount = products.length;

    if (location.href.toLowerCase().indexOf('noresult.aspx') > 0 && products.length >= 4)
        nItemCount = 4;
    
    for (var i = 0; i < nItemCount; i++) {
        renderProduct(products[i], productGrid, brTrkData, i);
    }
    productGrid.append($('<div></div>', { 'class': 'clear' }));
}

/* Render an individual product */
function renderProduct(product, productGrid, brTrkData, sequance) {
    

    /* Set product div class */
    var productClassName = '';
    if (location.href.toLowerCase().indexOf('justforyou.aspx') > 0 || location.href.toLowerCase().indexOf('noresult.aspx') > 0 || location.href.toLowerCase().indexOf('trending.aspx') > 0) {
        if (sequance % 4 == 3)
            productClassName = 'product_item last';
        else
            productClassName = 'product_item';
    }
    else {
        if (sequance % 3 == 2)
            productClassName = 'product_item last';
        else
            productClassName = 'product_item';
    }
    /* Set price div */
    var priceText = '';
    if (product.price == product.sale_price) {
        priceText = '<span class="price_original">$' + product.price.toFixed(2) + '</span>';
    }
    else {
        priceText = '<span class="price_original">was : $' + product.price.toFixed(2) + '</span>' +
                    '<br>' +
                    '<span class="price_sale">now : $' + product.sale_price.toFixed(2) + '</span>';  //+
                    //'<span class="price_discount_rate">' + '% off</span>';
    }

	//item tags
    var itemtag1 = product.flags ? product.flags.itemtag1 : '';
    var itemtag2 = product.flags ? product.flags.itemtag2 : '';
    var itemtag3 = product.flags ? product.flags.itemtag3 : '';
    var itemtag4 = product.flags ? product.flags.itemtag4 : '';
    var itemtag5 = product.flags ? product.flags.itemtag5 : '';
	var itemBrand = product.brand;

    /* Set image tag */
    var imageTag = '';
	
	// brand tag
	var brandTag = '';

	// back in stock tag
	var backInStockTag = '';

	if(itemtag1 != ''){		
		imageTag = '<span class="label">' + getItemTagUrl(itemtag1,itemBrand) + '</span>';
	}
	
	var topAreaTag = '';
	
	if(itemtag2 != '')
	{
		brandTag = getItemTagUrl(itemtag2, itemBrand);
    }

    if (itemtag3 != '') {
        backInStockTag = getItemTagUrl(itemtag3, itemBrand);
    }
	
	if(itemtag5 != ''){
		topAreaTag = getTopAreaBanner(itemtag5, itemBrand);
	}
	
    var mouseoverEvent = "onmouseover=\"fnChangeProductImageForMouseEvent(this, '" + product.thumb_image.replace('1_front', '7_additional') + "')\"";
    var mouseoutEvent = "onmouseout=\"fnChangeProductImageForMouseEvent(this, '" + product.thumb_image + "')\"";
	
	var defaultCategory = '';
	var productUrl = '';
	
	productUrl = product.url;

	if(productUrl != '')
	{				
		var n1 = productUrl.indexOf("&category=");	
		var n2 = productUrl.indexOf("&productid=");
		
		defaultCategory = productUrl.substring(n1+10,n2);
	}
	
	if(defaultCategory == '')
		defaultCategory = 'top';
	
	
    /* Set swatch images */
	var renderedSwatch = '';
	var productID = '';
	
	productID = product.pid;
	
	var image_id = "image_" + productID;

	if (product.variants && product.variants.length > 1)
	{
		var variantID = '';
		var sku = productID.substring(2,10);

		
		renderedSwatch = '<div class="info">';
		
		for(var i=0; i < product.variants.length;i++)
		{			
			var variant = product.variants[i];
			
			var n1 = variant.sku_thumb_images[0].indexOf("-");	
			var n2 = variant.sku_thumb_images[0].indexOf(".jpg");
			
			variantID = variant.sku_thumb_images[0].substring(n1+1,n2);
			
			var swatchImage = "http://www.forever21.com/images/sw_22/" + sku + "-" + variantID + ".jpg";
			
			if( i > 0)
				renderedSwatch += " ";
				
			if( i > 4)
			{
				renderedSwatch += "<a rel='nofollow' href=\"javascript:showPopWin('/Product/product_pop.aspx?BR=" + itemBrand + "&Category=" + defaultCategory + "&ProductID=" + productID + "&VariantID=',730,550,null,'center');\"><font style='text-decoration:underline; color:#696969;'>MORE</font></a>";				
				break;
			}
							
			renderedSwatch += "<a rel='nofollow' href=\"javascript:showPopWin('/Product/product_pop.aspx?BR=" + itemBrand + "&Category=" + defaultCategory + "&ProductID=" + productID + "&VariantID=" + variantID + "',730,550,null,'center');\" onMouseOver=\"javascript:fnChangeProductImage('" + image_id + "', '" + variantID + "');\" onMouseOut=\"javascript:fnChangeProductImage('" + image_id + "', '" + variantID + "');\"><img src='" + swatchImage + "' style='width:22px;height:22px;' /></a>";
			
		}
		
		renderedSwatch += '</div>';
				
	}

	
    /* Set brand tag */
    var productCell = $([
                        '<div class="' + productClassName + '">',
                            '<div class="item_pic">',								
                                '<a href="' + product.url + '">',
                                    '<img src="', product.thumb_image, '" ' + mouseoverEvent + ' ' + mouseoutEvent + ' id=\"' + image_id + '\" />',
                                '</a>',
//                                '<a href="#"><div class="sold_out"><span class="title">sold out</span><span class="addtowait">add to waitlist</span></div></a>',
                                '<a class="play" href="', "javascript:showPopWin('/Product/product_pop.aspx?BR=" + itemBrand + "&Category=" + defaultCategory + "&ProductID=" + productID + "&VariantID=',730,550,null,'center')", '" >',
                                    '<img src="/Images/en/common/QuickView_corner_FINAL.gif">',
                                '</a>',
								topAreaTag + 
                            '</div>',
							imageTag,								
                            '<div class="info">',													
                                '<span class="brand_name">',
                                    '<h1>' + brandTag + '</h1>',
                                '</span>',
                                '<span class="product_name">',
                                    '<h2>' + product.title + '</h2>',
                                '</span>',
                                '<div class="wrapper_price">',
                                    priceText,
                                '</div>',
                                '<div>',
                                backInStockTag,
                                '</div>',
                            '</div>',	
							renderedSwatch,
                        '</div>'						
                        ].join(''));
    productCell.data('brTrkData', brTrkData);
    productGrid.append(productCell);
}

function getItemTagUrl(itemtag, brand)
{
	var imgPath = '';
	
	if (itemtag == '')
		return '';

	switch(itemtag.toUpperCase()) {
	    case 'RESTOCK':
	        imgPath = "<font color='#ff00cc'>BACK IN STOCK</font>";
	        break;
		case '21MEN':
			imgPath = "21 MEN";
			break;
		case '2FER':
			imgPath = "<img src='http://www.forever21.com/images/en/tag/2fer_cg_tag_199.jpg' onerror='$j(this).hide()'>";
			break;
		case 'FAB':
			imgPath = "STYLE DEALS";
			break;
		case 'CAPSULE':
			imgPath = "CAPSULE 2.1";
			break;
		case 'CASIO':
			imgPath = "CASIO";
			break;
		case 'CR':
			imgPath = "CEREAL";
			break;
		case 'DAEL':
			imgPath = "DAEL";
			break;
		case 'ESS':
			imgPath = "ESSENTIALS";
			break;
		case 'EXCL_DESIGN':
			imgPath = "FOREVER 21<br />EXCLUSIVE DESIGN";
			break;
		case 'F21':
			imgPath = "FOREVER 21";
			break;
		case 'F21GIRLS':
			imgPath = "FOREVER 21 GIRLS";
			break;
		case 'FRENDS':
			imgPath = "FRENDS";
			break;
		case 'HTG':
			imgPath = "HERITAGE 1981";
			break;
		case 'L_BEAUTY':
			imgPath = "LOVE & BEAUTY";
			break;
		case 'LOV':
			imgPath = "LOVE21";
			break;
		case 'MODELSOWN':
			imgPath = "MODELS OWN";
			break;
		case 'MOUSTACHEWRESTLER':
			imgPath = "MOUSTACHE WRESTLER";
			break;
		case 'ORIGINALCHUCK':
			imgPath = "ORIGINAL CHUCK";
			break;
		case 'PLUS':
			imgPath = "FOREVER 21+";
			break;
		case 'SPITFIRE':
			imgPath = "SPITFIRE";
			break;
		case 'SPT':
			imgPath = "FOREVER 21 SPORT";
			break;
		case 'TBT':
			imgPath = "TBT";
			break;			
		case 'NSB_TAG':
			imgPath = "<img src='http://www.forever21.com/images/en/tag/NSB_tag.gif' onerror='$j(this).hide()' />";
			break;
		case 'TOPRATED':
			imgPath = "<img src='http://www.forever21.com/images/en/tag/toprated_cg_tag_199.jpg' onerror='$j(this).hide()' />";		
			break;
		case 'WEBEXCLUSIVE':
			imgPath = "<img src='http://www.forever21.com/images/en/tag/web_exclusive_199.gif' onerror='$j(this).hide()' />";					
			break;
		default:
			var url = "http://www.forever21.com/Ajax/getitemtag.aspx?itemtag=" + itemtag + "&brand=" + brand;

			$j.ajax({
				async: false,
				type: "GET",
				url: url,
				success: function (result) {
					imgPath = result;
				}
			});
					
			break;
	}

	return imgPath;
	
}

function getTopAreaBanner(itemtag, brand)
{
	var strTagInfo = '';

	if(itemtag == '')
		return '';

	if (location.href.toLowerCase().indexOf('justforyou.aspx') > 0 || location.href.toLowerCase().indexOf('noresult.aspx') > 0 || location.href.toLowerCase().indexOf('trending.aspx') > 0) {
        switch (itemtag) {
            case '21ITEMS':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-335px; left:172px"><img style="width:58px; height:53px;" src="http://www.forever21.com/images/en/tag/styledeal.gif" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'GENUINELEATHER':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-341px; left:168px"><img style="width:65px; height:65px;" src="http://www.forever21.com/images/en/tag/GENUINELEATHER.gif" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'PREMIUMBEAUTY':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-341px; left:0px"><img style="width:199px; height:18px;" src="http://www.forever21.com/images/en/tag/PREMIUMBEAUTY.gif" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'MENSTYLEDEALS':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-341px; left:164px"><img style="width:58px; height:53px;" src="http://www.forever21.com/images/en/tag/styledeal-men.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'PREMIUMDENIM':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-341px; left:173px"><img style="width:60px; height:60px;" src="http://www.forever21.com/images/en/tag/PREMIUMDENIM.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'PLUSDENIM':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-335px; left:168px"><img style="width:58px; height:56px;" src="http://www.forever21.com/images/en/tag/plus-size22-tag.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'DEALOFTHEWEEK':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-335px; left:175px"><img style="width:50px; height:52px;" src="http://www.forever21.com/images/en/tag/dow.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'STYLISTPICK':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-342px; left:173px"><img style="width:61px; height:60px;" src="http://www.forever21.com/images/en/tag/stylistpicktag.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'BREASTCANCERAWARENESS':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-335px; left:186px"><img style="width:40px; height:40px;" src="http://www.forever21.com/images/en/tag/bca.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'BRANDEDSHOP':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-335px; left:178px"><img style="width:50px; height:46px;" src="http://www.forever21.com/images/en/tag/branded.png" onerror="$j(this).hide()" /></div></div>';
                break;
            default:
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-335px; left:204px">' + getItemTagUrl(itemtag, brand) + '</div></div>';
                break;
        }
    }
    else {
        switch (itemtag) {
            case '21ITEMS':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-362px; left:190px"><img style="width:58px; height:53px;" src="http://www.forever21.com/images/en/tag/styledeal.gif" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'GENUINELEATHER':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-368px; left:186px"><img style="width:65px; height:65px;" src="http://www.forever21.com/images/en/tag/GENUINELEATHER.gif" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'PREMIUMBEAUTY':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-368px; left:0px"><img style="width:199px; height:18px;" src="http://www.forever21.com/images/en/tag/PREMIUMBEAUTY.gif" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'MENSTYLEDEALS':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-368px; left:182px"><img style="width:58px; height:53px;" src="http://www.forever21.com/images/en/tag/styledeal-men.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'PREMIUMDENIM':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-368px; left:191px"><img style="width:60px; height:60px;" src="http://www.forever21.com/images/en/tag/PREMIUMDENIM.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'PLUSDENIM':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-362px; left:186px"><img style="width:58px; height:56px;" src="http://www.forever21.com/images/en/tag/plus-size22-tag.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'DEALOFTHEWEEK':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-362px; left:193px"><img style="width:50px; height:52px;" src="http://www.forever21.com/images/en/tag/dow.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'STYLISTPICK':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-369px; left:191px"><img style="width:61px; height:60px;" src="http://www.forever21.com/images/en/tag/stylistpicktag.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'BREASTCANCERAWARENESS':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-362px; left:204px"><img style="width:40px; height:40px;" src="http://www.forever21.com/images/en/tag/bca.png" onerror="$j(this).hide()" /></div></div>';
                break;
            case 'BRANDEDSHOP':
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-362px; left:196px"><img style="width:50px; height:46px;" src="http://www.forever21.com/images/en/tag/branded.png" onerror="$j(this).hide()" /></div></div>';
                break;
            default:
                strTagInfo = '<div style="position:relative;"><div style="position:absolute; text-align:right; top:-362px; left:222px">' + getItemTagUrl(itemtag, brand) + '</div></div>';
                break;
        }
    }

	return strTagInfo;
}


function setPagination(totalCount, itemStartPosition) {
    var pagingContainer_top = $('#pagination_top');
    var pagingContainer_bottom = $('#pagination_bottom');
    var itemPerRow = 60;

    // Get default URL and set item count per row
    var defaultURL = '#brm-search?';
    var arrParamVal = window.location.hash.split('?')[1].split('&');

    for (var i = 0; i < arrParamVal.length; i++) {
        var arrItem = arrParamVal[i].split('=');
        if (i != 0 && arrItem[0] != 'start' && arrItem[0] != 'rows') {
            defaultURL += '&';
            //defaultURL += encodeURIComponent(arrParamVal[i]);
			defaultURL += arrParamVal[i];
        }

        //        if (arrItem[0] != 'start' && arrItem[0] != 'rows') {
        //            defaultURL += encodeURIComponent(arrParamVal[i]);
        //        }
        //        else if (arrItem[0] == 'rows') {
        //            itemPerRow = arrItem[1];
        //        }


        if (arrItem[0] == 'rows') {
            itemPerRow = arrItem[1];
        }
    }

    if (itemStartPosition == 0)
        itemStartPosition = 1;

    //var totalPageCount = parseInt(totalCount / itemPerRow) + 1;
    //var curPage = parseInt(itemStartPosition / itemPerRow) + 1;
	//ECOMUS-440	
    var totalPageCount = 0;
	var curPage = 0;
	
	if(parseInt(totalCount % itemPerRow) == 0){
		totalPageCount = parseInt(totalCount / itemPerRow);
	}else{
		totalPageCount = parseInt(totalCount / itemPerRow) + 1;
	}
    
	curPage = parseInt(itemStartPosition / itemPerRow) + 1;	
	
	
    var pageStart = (parseInt((curPage / 10)) * 10) + 1;
    var pageEnd = pageStart + 9;

	
    if (pageEnd > totalPageCount)
        pageEnd = totalPageCount;

    var nStartValueForLeftArrow = 1;

    if (curPage > 1) {
        nStartValueForLeftArrow = (itemPerRow * (curPage - 2)) + 1;
    }

    var renderedHTML = [
                        '<li><a href="', defaultURL, '&start=' + nStartValueForLeftArrow, '&rows=' + itemPerRow, '"><</a></li>'
                        ];
    for (var i = 1; i <= totalPageCount; i++) {

        //for (var i = pageStart; i <= pageEnd; i++) {
        if (totalPageCount <= 5) {

            if (i == curPage) {
                renderedHTML.push([
                            '<li class="active">', i, '</li>'
                            ].join(''));
            }
            else {
                renderedHTML.push([
                            '<li><a href="', defaultURL, '&start=' + ((itemPerRow * (i - 1)) + 1), '&rows=' + itemPerRow, '" onClick="javascript:window.scrollTo(0,0);">', i, '</a></li>'
                            ].join(''));
            }
        }
        else {

            if (curPage <= 4) {
                if (i <= 4) {
                    if (i == curPage) {
                        renderedHTML.push([
                            '<li class="active">', i, '</li>'
                            ].join(''));
                    }
                    else {
                        renderedHTML.push([
                            '<li><a href="', defaultURL, '&start=' + ((itemPerRow * (i - 1)) + 1), '&rows=' + itemPerRow, '" onClick="javascript:window.scrollTo(0,0);">', i, '</a></li>'
                            ].join(''));
                    }
                } else if (i == totalPageCount) {
                    renderedHTML.push([
                            '<li class="more_page">...</li>',
                            '<li><a href="', defaultURL, '&start=' + ((itemPerRow * (i - 1)) + 1), '&rows=' + itemPerRow, '" onClick="javascript:window.scrollTo(0,0);">', i, '</a></li>'
                            ].join(''));
                }
            }
            else if (curPage > 4 && curPage <= totalPageCount - 4) {
                if (i == totalPageCount) {
                    renderedHTML.push([
                            '<li class="more_page">...</li>'
                            ].join(''));
                }

                if (i == 1 || i == totalPageCount || (curPage <= i + 1 && curPage >= i - 1)) {
                    if (i == curPage) {
                        renderedHTML.push([
                            '<li class="active">', i, '</li>'
                            ].join(''));
                    }
                    else {
                        renderedHTML.push([
                            '<li><a href="', defaultURL, '&start=' + ((itemPerRow * (i - 1)) + 1), '&rows=' + itemPerRow, '" onClick="javascript:window.scrollTo(0,0);">', i, '</a></li>'
                            ].join(''));
                    }
                }

                if (i == 1) {
                    renderedHTML.push([
                            '<li class="more_page">...</li>'
                            ].join(''));
                }
            }
            else {
				
                if (i == 1) {
                    renderedHTML.push([
                            '<li><a href="', defaultURL, '&start=' + ((itemPerRow * (i - 1)) + 1), '&rows=' + itemPerRow, '" onClick="javascript:window.scrollTo(0,0);">', i, '</a></li>',
                            '<li class="more_page">...</li>'
                            ].join(''));
                } else if (i >= totalPageCount - 3) {
                    if (i == curPage) {
                        renderedHTML.push([
                            '<li class="active">', i, '</li>'
                            ].join(''));
                    }
                    else {
                        renderedHTML.push([
                            '<li><a href="', defaultURL, '&start=' + ((itemPerRow * (i - 1)) + 1), '&rows=' + itemPerRow, '" onClick="javascript:window.scrollTo(0,0);">', i, '</a></li>'
                            ].join(''));
                    }
                }
            }
        }
    }

    //renderedHTML.push(['<li><a href="', defaultURL, '&start=' + ((itemPerRow * curPage) + 1), '&rows=' + itemPerRow, '">></a></li>'].join(''));
	//ECOMUS-440		
    if(totalPageCount == 1)
	{
		renderedHTML.push(['<li><a href="', defaultURL, '&start=' + ((itemPerRow * curPage) - itemPerRow), '&rows=' + itemPerRow, '">></a></li>'].join(''));	
	}else{
		if(((itemPerRow * curPage) + 1) > totalCount){
			renderedHTML.push(['<li><a href="', defaultURL, '&start=' + ((itemPerRow * curPage) + 1 - itemPerRow), '&rows=' + itemPerRow, '">></a></li>'].join(''));
		}else
			renderedHTML.push(['<li><a href="', defaultURL, '&start=' + ((itemPerRow * curPage) + 1), '&rows=' + itemPerRow, '">></a></li>'].join(''));	
	}
	
		
    // Set view count
    if (itemPerRow == 30) {
        renderedHTML.push([
                        '<li class="view_more active">view 30</li>',
                        '<li class="view_more"><a href="' + defaultURL + '&rows=60' + '" onClick="javascript:window.scrollTo(0,0);">view 60</a></li>',
                        '<li class="view_more"><a href="' + defaultURL + '&rows=120' + '" onClick="javascript:window.scrollTo(0,0);">view 120</a></li>'
                        ].join(''));
    }
    else if (itemPerRow == 120) {
        renderedHTML.push([
                        '<li class="view_more"><a href="' + defaultURL + '&rows=30' + '" onClick="javascript:window.scrollTo(0,0);">view 30</a></li>',
                        '<li class="view_more"><a href="' + defaultURL + '&rows=60' + '" onClick="javascript:window.scrollTo(0,0);">view 60</a></li>',
                        '<li class="view_more active">view 120</li>'
                        ].join(''));
    }
    else {
        renderedHTML.push([
                        '<li class="view_more"><a href="' + defaultURL + '&rows=30' + '" onClick="javascript:window.scrollTo(0,0);">view 30</a></li>',
                        '<li class="view_more active">view 60</li>',
                        '<li class="view_more"><a href="' + defaultURL + '&rows=120' + '" onClick="javascript:window.scrollTo(0,0);">view 120</a></li>'
                        ].join(''));
    }

    pagingContainer_top.append($(renderedHTML.join('')));
    pagingContainer_bottom.append($(renderedHTML.join('')));
}


/* Render the group of filters */
function renderFilters(availableFilters, currentFilters, filtersContainer) {
    filtersContainer.html('');

    var controlGroup = $('<div style="text-align: center" data-ur-toggler-component="content"></div>');
    //filtersContainer.append(controlGroup);

    for (var i = 0; i < availableFilters.length; i++) {
        renderCurrentFilter(availableFilters[i], currentFilters);
        renderFilter(availableFilters[i], currentFilters, filtersContainer);
    }

    // render price filter
    //renderPriceFilter();
}

/* Render an individual filter */
function renderCurrentFilter(filter, currentFilters) {

}

function renderFilter(filter, currentFilters, container) {
    var displayName = filterDisplayNames[filter.name] || filter.name;
    displayName = displayName[0].toUpperCase() + displayName.substr(1);

    var arrCurrentFilter = {};
    var arrCurrentFilterForCat = [];
    var currentCategoryFilter = '';

    if (currentFilters && currentFilters[filter.name]) {
        var currentDimensions = currentFilters[filter.name].dimensions;
        var dimensionKeyList = Object.keys(currentDimensions);
        var currentFilterLabel = '';
        for (var i = 0; i < dimensionKeyList.length; i++) {
            if (displayName == 'Brand')
                currentFilterLabel = brandFilterDisplayNames[currentDimensions[dimensionKeyList[i]].label];
            else if (displayName == 'Sale_price')
                currentFilterLabel = priceFilterDisplayNames[currentDimensions[dimensionKeyList[i]].label];
            else
                currentFilterLabel = currentDimensions[dimensionKeyList[i]].label;

						
            //if (displayName != 'Category')
                $('#filter_current').append('<li class="item_list"><a href="' + currentDimensions[dimensionKeyList[i]].removalUrl + '"><i class="fa fa-times"></i>' + currentFilterLabel + '</a></li>');

            if (displayName == 'Category')
            //arrCurrentFilterForCat[currentDimensions[dimensionKeyList[i]].cat_id] = currentDimensions[dimensionKeyList[i]].removalUrl;
            //arrCurrentFilterForCat.push([currentDimensions[dimensionKeyList[i]].cat_id].join(''));
                currentCategoryFilter = currentDimensions[dimensionKeyList[i]].cat_id;
            else
                arrCurrentFilter[currentDimensions[dimensionKeyList[i]].label] = currentDimensions[dimensionKeyList[i]].removalUrl;
        }
    }

    if (displayName == 'Category') {
        var filter_CategoryContainer = $('#filter_category');

        var renderedHTML_F21 = ['<ul>', '<li class="cat_title">', 'women clothing', '</li>', '<li class="cat_list">', '<ul>'];
        var renderedHTML_ACC = ['<ul>', '<li class="cat_title">', 'women accessories', '</li>', '<li class="cat_list">', '<ul>'];
        var renderedHTML_MEN = ['<ul>', '<li class="cat_title">', 'men', '</li>', '<li class="cat_list">', '<ul>'];
        var renderedHTML_KIDS = ['<ul>', '<li class="cat_title">', 'kids', '</li>', '<li class="cat_list">', '<ul>'];
        var renderedHTML_PLUS = ['<ul>', '<li class="cat_title">', 'plus sizes', '</li>', '<li class="cat_list">', '<ul>'];
        var count_F21 = 0;
        var count_ACC = 0;
        var count_MEN = 0;
        var count_KIDS = 0;
        var count_PLUS = 0;

        var isCheck = '';
        var currentCategoryLevel = 1;

        //        if (arrCurrentFilterForCat != '')
        //            currentCategoryLevel = 2;
        //filter.options = filter.options.sort();

        var arrSubCategoryList = {};

        if (currentCategoryFilter != '')
            arrSubCategoryList = renderSubCategoryFilter(currentCategoryFilter, '', filter, '');

        for (var i = 0; i < filter.options.length; i++) {
		
            if (filter.options[i].value != 'mens-main' && filter.options[i].value != 'plus_size-main' && filter.options[i].value != 'girls_main' && filter.options[i].parent == '') {
                //if ($.inArray(filter.options[i].label, arrCurrentFilter) != -1) {
                //                if (arrCurrentFilterForCat[filter.options[i].value.toLowerCase()]) {
                //                    isCheck = 'checked';
                //                    filterURL = "'" + arrCurrentFilterForCat[filter.options[i].value.toLowerCase()] + "'";
                //                }
                //                else {
                //                    isCheck = '';
                //                    filterURL = "'" + filter.options[i].url + "'";
                //                }

                if (filter.options[i].value.indexOf('plus-') == 0 || filter.options[i].value.indexOf('plus_') == 0) {
                    renderedHTML_PLUS.push(['<li id="' + filter.options[i].value.toLowerCase() + '" class="item_list">',
                    //'<input id="category" type="checkbox" onClick="javscript:location.href=' + filterURL + ';" name="category"' + isCheck + '> ',
                    //'<label id="sub_cat_1">',
                                            '<a href=' + filter.options[i].url + '>' + filter.options[i].label + '(' + filter.options[i].count + ')' + '</a>',
                    //'</label>',
                                            ].join(''));

                    if (arrSubCategoryList && arrSubCategoryList[filter.options[i].value]) {
                        renderedHTML_PLUS.push([arrSubCategoryList[filter.options[i].value]].join(''));
                    }

                    renderedHTML_PLUS.push(['</li>'].join(''));


                    count_PLUS++;
                }
                else if (filter.options[i].value == 'backinstock-acc' || filter.options[i].value.indexOf('acc') == 0 || filter.options[i].value.indexOf('ACC') == 0) {
                    renderedHTML_ACC.push(['<li id="' + filter.options[i].value.toLowerCase() + '" class="item_list">',
                    //'<input id="category" type="checkbox" onClick="javscript:location.href=' + filterURL + ';" name="category"' + isCheck + '> ',
                    //'<label id="sub_cat_1">',
                                            '<a href=' + filter.options[i].url + '>' + filter.options[i].label + '(' + filter.options[i].count + ')' + '</a>',
                    //'</label>',
                                            ].join(''));

                    if (arrSubCategoryList && arrSubCategoryList[filter.options[i].value]) {
                        renderedHTML_ACC.push([arrSubCategoryList[filter.options[i].value]].join(''));
                    }

                    renderedHTML_ACC.push(['</li>'].join(''));

                    count_ACC++;
                }
                else if (filter.options[i].value.indexOf('mens-') == 0 || filter.options[i].value.indexOf('m_') == 0) {
                    renderedHTML_MEN.push(['<li id="' + filter.options[i].value.toLowerCase() + '" class="item_list">',
                    //'<input id="category" type="checkbox" onClick="javscript:location.href=' + filterURL + ';" name="category"' + isCheck + '> ',
                    //'<label id="sub_cat_1">',
                                            '<a href=' + filter.options[i].url + '>' + filter.options[i].label + '(' + filter.options[i].count + ')' + '</a>',
                    //'</label>',
                                            ].join(''));

                    if (arrSubCategoryList && arrSubCategoryList[filter.options[i].value]) {
                        renderedHTML_MEN.push([arrSubCategoryList[filter.options[i].value]].join(''));
                    }

                    renderedHTML_MEN.push(['</li>'].join(''));

                    count_MEN++;
                }
                else if (filter.options[i].value.indexOf('girls_') == 0 || filter.options[i].value.indexOf('girls-') == 0) {
                    renderedHTML_KIDS.push(['<li id="' + filter.options[i].value.toLowerCase() + '" class="item_list">',
                    //'<input id="category" type="checkbox" onClick="javscript:location.href=' + filterURL + ';" name="category"' + isCheck + '> ',
                    //'<label id="sub_cat_1">',
                                            '<a href=' + filter.options[i].url + '>' + filter.options[i].label + '(' + filter.options[i].count + ')' + '</a>',
                    //'</label>',
                                            ].join(''));

                    if (arrSubCategoryList && arrSubCategoryList[filter.options[i].value]) {
                        renderedHTML_KIDS.push([arrSubCategoryList[filter.options[i].value]].join(''));
                    }

                    renderedHTML_KIDS.push(['</li>'].join(''));

                    count_KIDS++;
                }
                else {
					
                    if (filter.options[i].value.indexOf('promo') < 0 && filter.options[i].value.indexOf('dummy') < 0) {
                        renderedHTML_F21.push(['<li id="' + filter.options[i].value.toLowerCase() + '" class="item_list">',
                        //'<input id="category" type="checkbox" onClick="javscript:location.href=' + filterURL + ';" name="category"' + isCheck + '> ',
                        //'<label id="sub_cat_1">',
                                            '<a class="" href=' + filter.options[i].url + '>' + filter.options[i].label + '(' + filter.options[i].count + ')' + '</a>',
                        //'</label>',
                                            ].join(''));

                        if (arrSubCategoryList && arrSubCategoryList[filter.options[i].value]) {
                            renderedHTML_F21.push([arrSubCategoryList[filter.options[i].value]].join(''));
                        }

                        renderedHTML_F21.push(['</li>'].join(''));
                        count_F21++;
                    }
                }
            }
        }
		
        renderedHTML_F21.push(['</ul>', '</li>', '</ul>'].join(''));
        renderedHTML_ACC.push(['</ul>', '</li>', '</ul>'].join(''));
        renderedHTML_MEN.push(['</ul>', '</li>', '</ul>'].join(''));
        renderedHTML_KIDS.push(['</ul>', '</li>', '</ul>'].join(''));
        renderedHTML_PLUS.push(['</ul>', '</li>', '</ul>'].join(''));

        if (count_F21 > 0)
            filter_CategoryContainer.append($(renderedHTML_F21.join('')));

        if (count_ACC > 0)
            filter_CategoryContainer.append($(renderedHTML_ACC.join('')));

        if (count_MEN > 0)
            filter_CategoryContainer.append($(renderedHTML_MEN.join('')));

        if (count_KIDS)
            filter_CategoryContainer.append($(renderedHTML_KIDS.join('')));

        if (count_PLUS)
            filter_CategoryContainer.append($(renderedHTML_PLUS.join('')));

        if (currentCategoryFilter != '')
            $("#" + currentCategoryFilter.toLowerCase() + " > a").addClass("active");
    }
    else if (displayName == 'Sale_price') {
        var filter_PriceContainer = $('#filter_price');
        var renderedHTML = [];
        var isCheck = '';
        var filterURL = '';

        for (var i = 0; i < filter.options.length; i++) {
            if (arrCurrentFilter[filter.options[i].value]) {
                isCheck = 'checked';
                filterURL = "'" + arrCurrentFilter[filter.options[i].value] + "'";
            }
            else {
                isCheck = '';
                filterURL = "'" + filter.options[i].url + "'";
            }

            renderedHTML.push(['<li class="item_list">',
                                '<input type="checkbox" name="price" onClick="javscript:location.href=' + filterURL + ';" id="Checkbox1"' + isCheck + '>',
                                '<label id="Label1">',
                                '<a href=' + filterURL + '>', priceFilterDisplayNames[filter.options[i].value], '</a>', 
                                '</label>'
                            ].join(''));
        }

        renderedHTML.reverse();
        filter_PriceContainer.append($(renderedHTML.join('')));

    }
    else if (displayName == 'Brand') {
        var filter_brandContainer = $('#filter_brand');
        var renderedHTML = [];
        var isCheck = '';
        var filterURL = '';
        for (var i = 0; i < filter.options.length; i++) {
            if (arrCurrentFilter[filter.options[i].label]) {
                isCheck = 'checked';
                filterURL = "'" + arrCurrentFilter[filter.options[i].label] + "'";
            }
            else {
                isCheck = '';
                filterURL = "'" + filter.options[i].url + "'";
            }

            renderedHTML.push(['<li class="item_list">',
                                            '<input id="brand" type="checkbox" onClick="javscript:location.href=' + filterURL + ';" name="brand"' + isCheck + '> ',
                                            '<a href=' + filterURL + '>' + brandFilterDisplayNames[filter.options[i].label] + '</a>',
                                            '</li>'
                                            ].join(''));

        }

        filter_brandContainer.append($(renderedHTML.join('')));
    }
    else if (displayName == "Sizes") {
        var filter_sizeContainer = $('#filter_size');
        var sizeButtonClass = 'size';
        var renderedHTML = [];
        var onClickEvent = '';

        for (var i = 0; i < filter.options.length; i++) {
            if (filter.options[i].label.length > 4)
                sizeButtonClass = 'size2';
            else
                sizeButtonClass = 'size';

            if (arrCurrentFilter[filter.options[i].label]) {
                sizeButtonClass += ' active';
                onClickEvent = "location.href='" + arrCurrentFilter[filter.options[i].label] + "'";
            }
            else {
                onClickEvent = "location.href='" + filter.options[i].url + "'";
            }

            renderedHTML.push(['<li>',
                                    '<input type="button" onClick="' + onClickEvent + '" value="' + filter.options[i].label + '" class="' + sizeButtonClass + '" title="' + filter.options[i].label + '">',
                                    '</li>'
                                    ].join(''));
        }

        filter_sizeContainer.append($(renderedHTML.join('')));
    }
    else if (displayName == "Color_groups") {
        var filter_colorGroupContainer = $('#filter_colorGroup');
        var colorButtonClass = '';
        var renderedHTML = [];
        var onClickEvent = '';

        for (var i = 0; i < filter.options.length; i++) {
            if (arrCurrentFilter[filter.options[i].label]) {
                colorButtonClass = 'active';
                onClickEvent = "location.href='" + arrCurrentFilter[filter.options[i].label] + "'";
            }
            else {
                colorButtonClass = '';
                onClickEvent = "location.href='" + filter.options[i].url + "'";
            }

            if (filter.options[i].label != "other") {
                renderedHTML.push(['<li>',
                                    '<input type="button" onClick="' + onClickEvent + '" value=" " class="' + filter.options[i].value + " " + colorButtonClass + '" title="' + filter.options[i].label + '">',
                                    '</li>'
                                    ].join(''));
            }
        }

        filter_colorGroupContainer.append($(renderedHTML.join('')));
    }
}

function renderSubCategoryFilter(parent_cat_id, cat_id, filter, childValue) {
    var arrRetVal = {};
    var retVal = '';
    var childVal = '';
    var new_cat_id = '';
    var new_parent_cat_id = '';
    var new_parent_cat_level = 0;
    for (var i = 0; i < filter.options.length; i++) {
        if (filter.options[i].value.toLowerCase() == parent_cat_id.toLowerCase()) {
            new_cat_id = filter.options[i].value.toLowerCase();
            new_parent_cat_id = filter.options[i].parent.toLowerCase() == '' ? filter.options[i].value.toLowerCase() : filter.options[i].parent.toLowerCase();
            new_parent_cat_level = filter.options[i].level;
        }

        if (filter.options[i].parent.toLowerCase() == parent_cat_id.toLowerCase()) {
            childVal += '<li id="' + filter.options[i].value.toLowerCase() + '" class="item_list sub' + filter.options[i].level + '">' + '<a href=' + filter.options[i].url + '>' + filter.options[i].label + '(' + filter.options[i].count + ')' + '</a>';

            if (filter.options[i].value.toLowerCase() == cat_id.toLowerCase()) {
                childVal += childValue;
            }

            childVal += '</li>';
        }
    }

    if (new_parent_cat_level != 1) {
        if (childVal != '')
            childVal = '<ul>' + childVal + '</ul>';
        //arrRetVal[new_parent_cat_id] = renderSubCategoryFilter_Temp(new_parent_cat_id, new_cat_id, filter, childVal)[new_parent_cat_id];
        return renderSubCategoryFilter(new_parent_cat_id, new_cat_id, filter, childVal);
    }
    else {
        arrRetVal[new_cat_id] = childVal != '' ? '<ul>' + childVal + '</ul>' : childVal;
        retVal = '<ul>' + childVal + '</ul>';
    }

    return arrRetVal;
}

/* display names for sorting control */
/* any sorting controls without a name is disabled */
var sortDisplayNames = {
    "sale_price asc": "Price: Low to High",
    "sale_price desc": "Price: High to Low",
    // there is typically no reason to sort by list price (price asc, price desc)
    "launch_date desc": "Newest",
    // "launch_date asc": "Oldest" is available, but is a questionable use case
    "relevance": "Relevance"
};

/* Render the sorting control */
function renderSort(availableSorts, currentSort) {
    var sortContainer = $('#sort_options');
    sortContainer.append('Sort by: ');
    var renderedHTML = ['<select onchange="javascript:location.href=this.value;">', '<option value="" disabled selected>select</option>'];
    for (var i = 0; i < availableSorts.length; i++) {
        if (sortDisplayNames[availableSorts[i].value]) {
            var selectOption = ['<option value="', availableSorts[i].url, '" data-url="', availableSorts[i].url, '"'];
            if (availableSorts[i].value === currentSort) {
                selectOption.push(' selected="selected"');
            }
            selectOption = selectOption.concat(['>', sortDisplayNames[availableSorts[i].value], '</option>']);
            renderedHTML.push(selectOption.join(''));
        }
    }
    renderedHTML.push('</select>');
    sortContainer.append($(renderedHTML.join('')));
}

/* Stores the state of the original page before searching, so that it can be restored on back button. */
var originalState = {};

/* Custom HTML5 page transition for BloomReach Mobile Search */
var onHashChangeDisabled = false,
onPopStateDisabled = false,
hashChangeTimeout = 200,
hashChangeEnableTimer;

function changePage(event) {
    if ((location.href.toLowerCase().indexOf('justforyou.aspx') > 0 || location.href.toLowerCase().indexOf('noresult.aspx') > 0 || location.href.toLowerCase().indexOf('trending.aspx') > 0)
    && (location.hash.toLowerCase().indexOf('request_type=search') > 0 && location.hash.toLowerCase().indexOf('search_type=trending') < 0)) {
        location.href = 'SearchResult.aspx' + location.hash;
    }

    if (onHashChangeDisabled) {
        return;
    }

    if (location.hash.indexOf('brm-search') === 1) {
        /* Store the baseURI of the document before we change it with replaceState */
        var $head = $('head'),
$base = $head.children('base');
        if (!$base.length) {
            $('<base>', { href: location.pathname + location.search }).prependTo($head);
        }

        originalState.results = originalState.results || $('#main');

        /* Search. */
        showBrmSearch();
        //$("#midContentContainer").hide();		
		
        if (window.location.hash.search("search_type=keyword") > 0) {		
            // Copy the search terms from the url bar, so that the search term does not seem incomplete
            //$("#mw-ihKeyword").val(window.location.hash.match(/&q=([^&]+)/)[1].replace(/%20/g, " "));
			
			/*
            $("#ihKeyword").val(window.location.hash.match(/&q=([^&]+)/)[1].replace(/%20/g, " ").toUpperCase());			
            $("#txtBloomreachSearch").val(window.location.hash.match(/&q=([^&]+)/)[1].replace(/%20/g, " ").toUpperCase());
			*/
			var keywords = '';
			
			keywords = window.location.hash.match(/&q=([^&]+)/)[1];
			keywords = keywords.replace(/%20/g, " ");
			keywords = keywords.replace(/%24/g, "$");
			keywords = keywords.replace(/%25/g, "%");
			keywords = keywords.toUpperCase();
			
            $("#ihKeyword").val(keywords);			
            $("#txtBloomreachSearch").val(keywords);
			
            // Due to the Async nature of the BrTrk pixel, directly landing on a page with a bloomreach search query in the bar causes an error.
            // This function will poll if the BrTrk object exists every 1 second if it does not.
            //checkBrTrk()
        }

    } else {
        hideBrmSearch();
        originalState = {};
        $("#midContentContainer").show();
    }
}
$(window).on('hashchange', changePage);

/* Handle back and forward buttons */
$(window).on('popstate', function (event) {
    if (onPopStateDisabled) {
        return;
    }

    // if we get two pop states in under hashChangeTimeout
    // make sure to clear any timer set for the previous change
    clearTimeout(hashChangeEnableTimer);

    // make sure to enable hash handling for the changePage call
    onHashChangeDisabled = false;
    changePage(event);

    // prevent any hashchange in the next hashChangeTimeout
    onHashChangeDisabled = true;

    // re-enable hashchange handling after swallowing a possible hashchange
    // event that comes on all popstates courtesy of browsers like Android
    hashChangeEnableTimer = setTimeout(function () {
        onHashChangeDisabled = false;
    }, hashChangeTimeout);
});

/* Use the BloomReach Mobile Search plug-in to perform a search based on the URL and show the results. */
function showBrmSearch() {
    /*
    * When the results have been rendered:
    *
    * - Show the plug-in's rendered results.
    * - Hide the original results.
    */
    brmSearchContainer.one('brm-rendered', function (event) {
        var resultsContainer = $('#container');

        resultsContainer.insertBefore(originalState.results);
        originalState.results.hide();
    });

    /* Call the search plug-in.  The 'search' method performs a search based on the location in the address bar. */
    //console.log("searching");
    //console.log(brmSearchContainer);
    brmSearchContainer.brm_search('search');
    //console.log("brm_search done");

}

/* Restore the page back to what it was before the search plug-in modified it. */
function hideBrmSearch() {
    var resultsContainer = $('#container');

    if (originalState.results) {
        location.reload();
    }
}

/*
* This block of code runs once if the visitor lands on a BloomReach Mobile URL.
* - Trigger a popstate event to kick off the search.
*/
if (location.hash.indexOf('brm-search') === 1) {
    $(document).ready(function () {
        $(window).triggerHandler('popstate');
        // Chrome fires an extraneous popstate on page load.  Squash it before it triggers a duplicate search.
        setTimeout(function () { onPopStateDisabled = true; }, 0);
    });

    $(window).on('load', function () {
        setTimeout(function () {
            onPopStateDisabled = false;
        }, hashChangeTimeout);
    });
}


// More Like This for PDP
$(function () {
    var productTitle = $.trim($('.mw-product-name').first().text());
    if (productTitle) {
        var product = { title: productTitle }, productID = $('#ctl00_MainContent_hdProductId').first().val();
        if (productID) {
            product.pid = productID;
        }
        mltConfig.product = product;
        mltConfig.numResults = 3;
        //console.log(mltConfig);

        mltWidgetContainer.brm_mlt(mltConfig);

        //mayhaps this will work if I have set image withs? or dump out the results
        /*Uranium.lib.carousel({
        set:"#brm-mlt-widget-items .productgrid", 
        scroll_container:"#brm-mlt-widget-items .productgridpage", 
        item:"#brm-mlt-widget-items .product"
        },
        {
        infinite: false
        });*/
    }
});

function checkBrTrk() {
    if (typeof (BrTrk) == 'object') {
        //console.log("BrTrk exists! firing tracking pixel");
        var sean = BrTrk.getTracker(0.2, br_data);
        br_data.type = "pageview";
        br_data.ptype = "search";
        br_data.request_type = "search";
        br_data.search_type = "keyword";
        br_data.search_term = window.location.hash.match(/&q=([^&]+)/)[1].replace(/%20/g, " ");

        sean.updateBrData(br_data);
        sean.logPageView();
    } else {
        //console.log("BrTrk does not exist, checking in 1s");
        //setTimeout(function () { checkBrTrk() }, 1000);
    }

}

var mltWidgetContainer = $('#brm-mlt-widget-items'); // where the results end up

var mltConfig = {
    searchConfig: searchConfig,
    renderFunction: function (results) {
        for (i in results.products) {
            // Dope in some query params to the mlt widget
            if (results.products[i].url.search(/\?/) > 0) {
                results.products[i].url = results.products[i].url + "&request_type=mlt";
            } else {
                results.products[i].url = results.products[i].url + "?request_type=mlt";
            }

            //console.log("product URL: "+results.products[i].url);
        }
        var productGrid = $('<div></div>', { 'class': 'productgridpage' });
        mltWidgetContainer.append($('<div></div>', { 'class': 'productgrid' }).append(productGrid));
        renderProducts(results.products, productGrid, results.brTrkData);
        //mltWidgetContainer.append($('<a></a>', {'href': results.viewMore}).text('View More'));
    }
};

$(document).bind('click', function (e) {
    if (jQuery(e.target).closest(".brm-autosuggest-menu").length === 0)
    { jQuery(".brm-autosuggest-menu").hide(); }
});