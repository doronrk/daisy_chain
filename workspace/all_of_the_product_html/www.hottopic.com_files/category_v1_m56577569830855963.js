$(document).ready(function() {
	//only want to do this if product list exists
	if($("#productList").length > 0){
		if(!utils.isIELessThan8()){
			historyUtils.prepareHistory(product.getProducts);
		}
		
        // Check and restore saved data
		saveUserSelection();
        product.setSortBy(savedSearchFieldId, savedSortByDir);
        setOptionSelectedTxt(savedSearchFieldId, savedSortByDir);
        
        if(savedQuery == "" && savedSearchFieldId == "" && savedSortByDir == "")
            product.resetFilter();  //remove any checkboxes when they first hit the page
        
        product.updateRefineByDropDowns();
		//get the products
		product.getProducts();

		//attach handlers to all pertinent events
		$("#sortExpandMe,#sortoptions li").click(product.sortByClickHandler);
		$("div[isRBExpandMe='true']").click(product.refineByClickHandler);
		$(".reset_filter").click(product.resetFilterHandler);
		$("#sortoptions a").click(product.sortByHandler);
		$("[isFltApply='true']").click(product.refineByApplyHandler);
		$("[isFltCancel='true']").click(product.refineByCancelHandler);
		$("[isPaginationNext='true']").click(product.paginationNextHandler);
		$("[isPaginationPrev='true']").click(product.paginationPrevHandler);

		product.prevScrollPos = scrollUtils.getScrollPosition();
		scrollUtils.setupScrollHandler();
	}
});

//product namespace, contains methods geared toward the category pages
(function( product, $, undefined ) {
	//private variables
	var page = 1;
	var pageTrigger = "";
	var currentStartPage = 1;
	var productsPerPage = 100;
	var maxPages = 5;
	var	sortByFieldId = "";
	var	sortByDir = "";
	var	totalPages = 0;
	var refineByState = { };
	var userClicked=false;
	//restore scroll position
	var restoreScrollPos = true;
	product.prevScrollPos = -1;

	//public method to get products
	product.getProducts = function(){
		if(!utils.isIELessThan8()){
			page = product.getPageFromHistory();
		}
		$.getJSON(getProductURL, buildProductData(), processProductList);
		$("#productList").append('<div class="calling">Loading...</div>');
	};

	//private method to process the data coming back from the product ajax call
	function processProductList(data){
		var productCount = data.product_count;

		$('#totalProdItems').html(productCount);

		totalPages = Math.ceil(productCount/productsPerPage);
		page = Math.ceil(data.startRecord/productsPerPage) + 1;

		var bvPrdArray = [];

		//returned products
		if(productCount > 0){
			var i = 0;

			var htmlContents = [];
			var productItemHTML = $('#productItemHTML').html();
			productItemHTML = utils.replaceAll(productItemHTML, "<!--", "");
			productItemHTML = utils.replaceAll(productItemHTML, "-->", "");

			$.each(data.ROW_ARRAY, function(key, val){
				tHtml = productItemHTML;

				tHtml = utils.replaceAll(tHtml, "prdCode", val.prdCode);
				tHtml = utils.replaceAll(tHtml, "webTitle", val.webTitle);
				tHtml = utils.replaceAll(tHtml, "scene7ImgURL", val.scene7ImgURL);
				tHtml = utils.replaceAll(tHtml, "scene7AltImgURL", val.scene7AltImgURL);
				tHtml = utils.replaceAll(tHtml, "scene7VideoURL", val.scene7VideoURL);
				tHtml = utils.replaceAll(tHtml, "url", val.url);
				tHtml = utils.replaceAll(tHtml, "exclusive", val.exclusive);

				//products with other products that causes a range
				if(val.isRangeProduct && val.maxFinalPrice != val.stdFinalPrice){
					tHtml = utils.replaceAll(tHtml, "otherOrigPrice", val.maxOrigPrice);
					tHtml = utils.replaceAll(tHtml, "otherSalePrice", val.maxFinalPrice);
					tHtml = utils.replaceAll(tHtml, "singleProductStyle", "display:none");
				}else{
					tHtml = utils.replaceAll(tHtml, "otherProductStyle", "display:none");
				}

				if(val.origPrice.length > 0){
					tHtml = utils.replaceAll(tHtml, "origPrice", val.origPrice);
					tHtml = utils.replaceAll(tHtml, "saleClass", "Now");
				}else{
					tHtml = utils.replaceAll(tHtml, "origPriceStyle", "display:none");
					tHtml = utils.replaceAll(tHtml, "saleClass", "stdPrice");
				}
				tHtml = utils.replaceAll(tHtml, "salePrice", val.stdFinalPrice);

				tHtml = utils.replaceAll(tHtml, "promoText", val.promoText);

				if(!product.isValidVideo(val))
					tHtml = utils.replaceAll(tHtml, "videoStyle", "display: none");

				htmlContents[i++] = tHtml;

				//push product code on bazaar voice array
				bvPrdArray.push(val.prdCode);
			});

			$("#productList").html("<ul>" + htmlContents.join('') + "</ul>");

			//adds events to various product animation, such as the video or alt image switching
			processProductAnimation();

			//add bazaar voice ratings
			//use a try/catch to make sure a third party app going down does not kill category page
			try{
				bazaar.insertCategoryBV(bvPrdArray);
			}catch(err){

			}
		}else{
			$("#productList").html($("#noProductHTML").html());
		}

		//setup paging
		updatePagination(data.startRecord);
		
		//restore scroll position
		if(restoreScrollPos){
			scrollUtils.restoreScrollPosition(product.prevScrollPos);
			restoreScrollPos = false;
		}
	}

	//private method to build data for ajax url
	function buildProductData(){
		data = new Object();

		data.sortByFieldId = sortByFieldId;
		data.sortByDir = sortByDir;
		data.filterQuery = getFilterQuery();
		data.folderId = currentFolderId;
		data.page = page;
		data.productsPerPage = productsPerPage;
        data.userClicked = userClicked;
        
		return data;
	}

	//public method to set sort by values
	product.setSortBy = function(fieldId, dir){
		sortByFieldId = fieldId;
		sortByDir = dir;
	};

	//private method to get the filter query
	function getFilterQuery(ignoreName){
		if(typeof(ingoreName) == undefined || ignoreName == null)
			ignoreName = "";
		var filterQuery = "";

		//go through each refine by
		$('#filter').find('[isRefineBy="true"] ul').each(function(index, refineByElem){
			var id = $(refineByElem).attr('id');
			if(id != ignoreName){
				var checkedElems = $(refineByElem).find("li input:checked");

				//go through each checked input and add to running query
				if(checkedElems.length > 0){
					//prefix of search value
					var localQuery = checkedElems.eq(0).attr('searchFieldId') + ":(";

					//compile search values
					$(checkedElems).each(function(index, fieldElem){
						if(index > 0)
							localQuery += " OR ";
						localQuery += $(fieldElem).attr('searchVal');
					});

					//close local search val expression
					localQuery += ")";

					//add to global query
					filterQuery += localQuery + strSeparator;
				}
			}
		});

		return filterQuery;
	}

	/**** Begin pagination code **/
	//private method to update the pagination, accessed through handlers
	function updatePagination(start){
		var currentPage = Math.ceil(start/productsPerPage) + 1;
		var pagerHTML = "";
		var type = pageTrigger;

		if(!restoreScrollPos){
			$('body,html').animate({
			  scrollTop: 0
			}, 800);
		}

		//reset trigger
		pageTrigger = "";

		//if next was hit, set current start page to next page
		if(type == "next"){
			//if increasing current start will not go past total pages, and current page is the last page in the set add one to start page
			if(currentStartPage + maxPages - 1 < totalPages && currentPage >= currentStartPage + maxPages)
				currentStartPage = currentPage - maxPages + 1;
		}
		//if prev hit, set current start page to one back
		else if(type == "prev"){
			//if current page is great than 1, and the current page is less than the current start page then subtract one from start page
			if(currentStartPage > 1 && currentPage <= currentStartPage - 1)
				currentStartPage = currentPage;
		}

		//set pages end
		var pagesEnd = (totalPages > maxPages)?currentStartPage + maxPages - 1:totalPages;

		//add in pages
		for(var i = currentStartPage; i <= pagesEnd; i++){
			if(currentPage == i)
				pagerHTML += "<li>"+i+"</li>";
			else
				pagerHTML += '<li><a href="#">'+i+'</a></li>';
		}

		//show or hide prev page link
		if(page == 1)
			$("[isPaginationPrev='true']").parent().hide();
		else
			$("[isPaginationPrev='true']").parent().show();

		//show or hide next page link
		if(page < totalPages)
			$("[isPaginationNext='true']").parent().show();
		else
			$("[isPaginationNext='true']").parent().hide();

		$("span[isPaginationCount='true']").html(totalPages);
		$(".pager [isPaginationDisplay='true']").html(pagerHTML);

		//add handlers to pagination
		$(".pager [isPaginationDisplay='true'] a").click(product.paginationHandler);
	}

	//handler for pagination
	product.paginationHandler = function(event){
		event.preventDefault();

		page = $(this).html();

		//set page into history
		if(!utils.isIELessThan8()){
			product.pushHistoryState(page);
		}else{
			product.getProducts();
		}
	};

	//handler for next btn on pagination
	product.paginationNextHandler = function(event){
		event.preventDefault();

		if(totalPages > page){
			pageTrigger = "next";

			page += 1;

			//set page into history
			if(!utils.isIELessThan8()){
				product.pushHistoryState(page);
			}else{
				product.getProducts();
			}
		}
	};

	//handler for previous btn on pagination
	product.paginationPrevHandler = function(event){
		event.preventDefault();

		if(page > 1){
			pageTrigger = "prev";

			page -= 1;

			//set page into history
			if(!utils.isIELessThan8()){
				product.pushHistoryState(page);
			}else{
				product.getProducts();
			}
		}
	};

	/**** End pagination code **/

	/**** Begin filter code ***/
	product.updateRefineByDropDowns = function(){
		var currendId = "";
		var rbFilterQuery = "";
		var rbQuery = "";
		var rbField = "";

		//go through each refine by
		$('#filter').find('[isRefineBy="true"] ul').each(function(index, refineByElem){
			//reset variables
			currentId = $(refineByElem).attr("id");
			rbQuery = "";
			rbField = "";

			//reset current count
			resetCount(currentId);

			//get current query/field
			//for query type we need to create the query string
			if($(refineByElem).attr("searchType") == "query"){
				var elems = $(refineByElem).find("li input");

				//go through each input and add to query
				if(elems.length > 0){
					//compile query
					$(elems).each(function(index, fieldElem){
						if(index > 0)
							rbQuery += strSeparator;
						rbQuery += $(fieldElem).attr('searchFieldId') + ":" + $(fieldElem).attr('searchVal');
					});
				}
			}
			//for a field we only need the id
			else{
				rbField = $(refineByElem).attr('searchFieldId');
			}

			//grab query filter, ignoring the current field/query variables
			rbFilterQuery = getFilterQuery(currentId);

			var data = {
				field : rbField,
				query : rbQuery,
				filterQuery : rbFilterQuery,
				folderId : currentFolderId
			};

			$.getJSON(getFilterURL, data, processFilterCounts);
		});
	}

	function processFilterCounts(data){
		if(data.filters.length > 0){
			$.each(data.filters, function(index, filterInfo){
				var filter = $("input[searchFieldId='"+filterInfo.fieldId+"'][searchVal='"+filterInfo.fieldValue+"']");

				if(typeof(filter) != undefined){
					replaceCount(filter.next(), filterInfo.count);
				}
			});
		}
	}

	function resetCount(elemId){
		$('#' + elemId).find("li span").each(function(index, elem){
			replaceCount(elem, 0);
		});
	}

	function replaceCount(elem, count){
		var txt = $(elem).text();
		txt = txt.replace(new RegExp("\\([0-9 ]+\\)"), "(" + count + ")");
		$(elem).text(txt);
	}

	// Begin Sorting

	//handler for sort by drop down expansion
	product.sortByClickHandler = function(event){
		toggleFltSlide($("#sortExpandMe"), false);
	};
	// End Sorting

	//Begin filters

	//handler for refine by drop down expansion
	product.refineByClickHandler = function(event){
		toggleFltSlide(this, false);
		var byOptions = $(this).next();
		$(byOptions).find("li").click(function(){
			setFltSelectedTxt($(this).parent());
		});
	};

	//handler for sorty by selection
	product.sortByHandler = function(event){
		event.preventDefault();
		userClicked = true;
		$("#sortby").find("[isFltDflt='true']").text($(this).text());
		product.setSortBy($(this).attr('searchFieldId'), $(this).attr('searchDir'));

		product.getProducts();
	};

	//handler for refine by apply value
	product.refineByApplyHandler = function(event){
		event.preventDefault();

		page = 1;

		var ulElem = $(this).parent().parent();
		var key = $(ulElem).attr('id');

		refineByState[key] = { };

		//record current state of checkboxes
		$(ulElem).find("li input").each(function(index, elem){
			if($(elem).attr('checked') == 'checked')
				refineByState[key][index] = true;
			else
				refineByState[key][index] = false;
		});

		toggleFltSlide(this, true);

		product.getProducts();
		resetMainFilter = false;
		savedQuery="";	
		//update filters
		product.updateRefineByDropDowns();
	};

	//handler for refine by cancel
	product.refineByCancelHandler = function(event){
		event.preventDefault();

		var ulElem = $(this).parent().parent();
		var key = $(ulElem).attr('id');

		//reset state of checkboxes
		if( key in refineByState){
			$(ulElem).find("li input").each(function(index, elem){
				//if previously checked, check again
				if(refineByState[key][index])
					$(elem).attr('checked', 'checked');
				//otherwise remove checked attribute
				else
					$(elem).removeAttr('checked');
			});
		}
		//no state ever applied, uncheck all checkboxes
		else{
			$(ulElem).find('input:checkbox').removeAttr('checked');
			setFltSelectedTxt(ulElem);
		}
		saveUserSelection();
        if(resetMainFilter)
            product.resetFilter();
		toggleFltSlide(this, true);
	};

	function toggleFltSlide(flt, isChild){
		var elem = null;
		if(isChild)
			elem = $(flt).parents("[isRefineBy='true']").find("div[isRBExpandMe='true']");
		else
			elem = flt;

		$(elem).toggleClass("collapseme");
		$(elem).next().slideToggle(500);
	}

	function setFltSelectedTxt(elem){
		var fltDfltElem = $(elem).prev().find('span');
		var fltDfltPreFix = $(fltDfltElem).attr('selectedPreFix');
		var fltDftlVal = $(fltDfltElem).attr('fltDfltVal');

		var ischecked = $(elem).find("li").has("input:checked").length;
		$(fltDfltElem).text(fltDfltPreFix + ischecked + " Selected");
		if(ischecked < 1){
				$(fltDfltElem).text(fltDftlVal);
		}
	}
	//End filters

	//start reset all sort and filters

	//handler for reset filter button
	product.resetFilterHandler = function(event){
		event.preventDefault();
		userClicked = true;
		product.resetFilter();
		product.getProducts();
		resetMainFilter = true;
		product.updateRefineByDropDowns();
	};

	//public method to reset filter, should be primarily called through the handler
	product.resetFilter = function(){
		page = 1;

		$("div[isRefineBy='true']").each(function(index, element){
			//uncheck all checkboxes
			$(element).find('input:checkbox').removeAttr('checked');
			//set default value
			var dfltElement = $(element).find("[isFltDflt='true']");
			dfltElement.text($(dfltElement).attr('fltDfltVal'));
		});

		product.setDefaultSort();
	};

	//public method to set the default sort parameters
	product.setDefaultSort = function(){
		var sortDflt = $('#sortby').find('[isFltDflt="true"]');
		$(sortDflt).text($(sortDflt).attr('fltDfltVal'));
		product.setSortBy(sortDflt.attr('searchFieldId'), sortDflt.attr('searchDir'));
	};
	/**** End filter code ***/

	/**** Start Product images and animation *****/
	var rotate = function() {
		var img2URL = $(this).children('img').eq(1).attr('src');
		if(product.isValidImage(img2URL)){
			$(this).cycle();
		}
	};

	var stoprotate = function() {
		$(this).cycle({startingSlide:0});
		$(this).cycle('stop');
	};

	var config =  {
		over: rotate, // function = onMouseOver callback (REQUIRED)
		timeout: 150, // number = milliseconds delay before onMouseOut
		out: stoprotate // function = onMouseOut callback (REQUIRED)
	};

	function processProductAnimation(){
		var $products = $(".product-images");
		var $anitem = $products.toArray();
		$(".product-images").each(function() {
			$(this).hoverIntent(config);  // rotate alternate images on hover
		});

		var oldResxObj = null;
        if(typeof(resx) != 'undefined')
            oldResxObj = resx;

		$("a.quickView").colorbox({onCleanup: function() {if(FB!=null && FB !=undefined) FB=null; }, onComplete: function() {
		    if(typeof(loadAndInitControls) == "function")
                loadAndInitControls();

			var prdCode = $(this).attr('prdCode');

			if(isLoggedIn)
				bazaar.configureProduct(prdCode, bvHash);
			else
				bazaar.configureProduct(prdCode);

			bazaar.showRatingsReviews();
		}, onClosed: function() {
		    // Restore the old certona properties related to the category page
            if(oldResxObj != null && isCertonaEnabled && isCertonaQuickViewEnabled) {
                resx = oldResxObj;
                if(typeof(certonaResx) != 'undefined')
                    certonaResx.run();
            }
        } });

		// video code
		$("a.playVideo").each(function() {
			var videolink = $(this).attr('href');
			var videoId = "#"+$(this).attr('videoId');
			var videocode = '<video id="' + videoId + '" autoplay src="'+ videolink +'" width="200" height="270"></video>';
			var myparent = $(videoId);
			var begIdx = videolink.lastIndexOf("/");
		    var endIdx = videolink.lastIndexOf("-");
		    var selPrdCd = videolink.substring(begIdx+1, endIdx);
		    $(this).bind('click',function(event) {
				event.preventDefault();
				if(typeof(cmCreateElementTag) == "function" && isCoremetricsEnabled)
					cmCreateElementTag("NodePage – viewVideo", selPrdCd);
				$(myparent).html(videocode);
				$(myparent).css("z-index","11")
				$(myparent).find("video").mediaelementplayer({
					alwaysShowControls: true,
					iPadUseNativeControls: true,
					iPhoneUseNativeControls:true,
					AndroidUseNativeControls: true,
					alwaysShowHours: false,
					enableKeyboard: false,
					pauseOtherPlayers: true,
					//
					success: function (YourMediaElement, domObject) {
					YourMediaElement.addEventListener('ended', function(e) {
						$(myparent).css("z-index","1")
						$(myparent).empty();
						}, false);

						YourMediaElement.addEventListener('pause', function(e) {
						$(myparent).css("z-index","1")
						$(myparent).empty();
						}, false);
					}
					//

				});


			});
		});
	}
	/**** End product images and animation *****/
}( window.product = window.product || {}, jQuery ));

// ---- Refactored from inc_productList.jsp -----
var resetMainFilter = false;

function preProcessQueryValues(){
    if (savedQuery.length > 0) {
        var split = savedQuery.split(';;;');
        if(split.length >= 2 )
            processQuery(split);
    }
}

function processQuery(split) {
    for(i=0;i<split.length;i++) {
        if (split[i].substring(0,2) == "4:") {
            var priceQuery = split[i].substring(3, split[i].length - 1);
            processSplitPrices(priceQuery);
        } else if (split[i].substring(0,2) == "5:") {
            var sizeQuery = split[i].substring(3, split[i].length - 1);
            processSplitSizes(sizeQuery);
        }
    }
}

function processSplitPrices(priceQuery) {
    var prices = priceQuery.split('OR');
    $.each(prices, function(index, value) {
        var priceValue = value.trim();
        selectPriceOption(priceValue);
    });
}

function processSplitSizes(sizeQuery) {
    var sizes = sizeQuery.split('OR');
    $.each(sizes, function(index, value) {
        var sizeValue = value.trim();
        selectSizeOption(sizeValue);
    });
}

function selectPriceOption(priceValue) {
    var orgVal = $("#byPriceoptions li input");
    $(orgVal).each(function() {
        var newVal = $(this).attr("searchval");
        if (newVal == priceValue) {
            $(this).attr('checked', 'checked');
            $(this).addClass("marked");
            $(this).parent().parent().find(".cancel").click(function(e) {
                e.preventDefault();
                if (newVal == priceValue) {
                    $(".marked").attr('checked', 'checked');
                }
            });
        }
    });
}

function selectSizeOption(sizeValue) {
    var orgSizeVal = $("#bySizeoptions li input");
    $(orgSizeVal).each(function() {
        var newSizeVal = $(this).attr("searchval");
        if (newSizeVal == sizeValue) {
            $(this).attr('checked', 'checked');
            $(this).addClass("markedSize");
            $(this).parent().parent().find(".cancelsize").click(function(e) {
                e.preventDefault();
                if (newSizeVal == sizeValue) {
                    $(".markedSize").attr('checked', 'checked');
                }
            });
        }
    });
}

function saveUserSelection(elem){
	preProcessQueryValues();
    setFltSelectedTxt($("ul#byPriceoptions"));
    setFltSelectedTxt($("ul#bySizeoptions"));
}

function setOptionSelectedTxt(searchFieldId, searchDir) {
    var orgDropDownList = $("#sortoptions li a");
    $(orgDropDownList).each(function() {
        var newSearchFieldId = $(this).attr("searchfieldid");
        var newSearchDir = $(this).attr("searchdir");
        if (newSearchFieldId == searchFieldId && newSearchDir == searchDir) {
            $("#sortby").find("[isFltDflt='true']").text($(this).text());
        }
    });
}

function setFltSelectedTxt(elem) {
    var fltDfltElem = $(elem).prev().find('span');
    var fltDfltPreFix = $(fltDfltElem).attr('selectedPreFix');
    var fltDftlVal = $(fltDfltElem).attr('fltDfltVal');

    var ischecked = $(elem).find("li").has("input:checked").length;
    $(fltDfltElem).text(fltDfltPreFix + ischecked + " Selected");
    if (ischecked < 1) {
        $(fltDfltElem).text(fltDftlVal);
    }
}