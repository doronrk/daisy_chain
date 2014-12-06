
var productTemplate = '<img id="product_$sku$" src="$img$" alt="$alt$" data-sku="$sku$" data-description="$description$" data-price="$price$" data-crop="$crop$" data-crop-normal="$cropN$" data-state="$state$" data-isgroup="$isgroup$" data-isengravable="$isengravable$" data-ispurchasable="$ispurchasable$" />';
var imageTemplate = '$src$?$$presetId$$';
var DEFAULT_IMAGE_CROP = "0.2,0.2,0.6,0.6";
var imageCroppedTemplate = '$src$&layer=1&cropN=$crop$';
var imageCroppedTemplateAbsolute = '$src$&layer=1&crop=$crop$';
var tooltipXHR = null;
var model;

function preloadImages(containerId) {
	//preload popup images
	var images = new Array();
	var imgcount = 0;
	$("#" + containerId + " div > img").each(function () {
	    if (!$(this).parent().parent().hasClass("text-container")) {
	        var src = $(this).attr("src");
	        //			images[imgcount] = new Image();
	        //			images[imgcount].src = src;
	        //			imgcount++;
	        if (src != "") {
	            src = $(this).attr("data-rollover-image");
	            if (typeof (src) != "undefined" && src != null && src != "") {
	                images[imgcount] = new Image();
	                images[imgcount].src = src;
	                imgcount++;
	            }
	        }
	    }
	});
	//end proload popop images
}

//item page specific code
    function resizeOverlay() {
//	    if ( $(".image-overlay").length && $("body").hasClass("ie") ) {
//	        var left = ($(window).width() - 1280) / 2;
//	        if (left < 0) {
//	            left = 0;
//	        }
//	        $(".image-overlay").css("left", left + "px");
//	    }
    }

    

    function updateLinkPosition() {
        if ($(".item-desc").length && $(".service-info div").length) {
            $(".service-info > div").css('margin-top', 0);
            var offsetTop = $(".item-desc").offset().top;
            var height = $(".item-desc").outerHeight();
            var linkOffset = $(".service-info > div").offset().top;

            if ((offsetTop + height) > linkOffset) {
                var marginTop = (offsetTop + height) - linkOffset;
                $(".service-info > div").css('margin-top', marginTop);
            }
        }
    }
//end item page specific code

function createProductHTML(productData, size) {
	var crop = "";
	var sharpen = "";
	var imageId = Math.round(Math.random() * 1000000);

	if (typeof (productData.Crop) != "undefined" && productData.Crop != null && productData.Crop != "") {
		crop = productData.Crop;
	}
	else {
		crop = templateStrings.defaultScene7Crop;
	}

	if (typeof (productData.Sharpen) != "undefined" && productData.Sharpen != null && productData.Sharpen != "") {
		sharpen = productData.Sharpen;
	}

	var productHTML = templateStrings.productTemplate.split("$sku$").join(productData.Sku);
	if (typeof(size) == "undefined" || size == null || size == "" || size.toLowerCase() == "small") {
		productHTML = productHTML.split("$img$").join(URLFactory.scene7ImageURL(productData.ImgURL, "$EcomBrowseM$", sharpen, ""));
		productHTML = productHTML.split("$tooltipImage$").join(URLFactory.scene7ImageURL(productData.ImgURL, "$EcomBrowseM$", sharpen, crop));
	}
	else {
		productHTML = productHTML.split("$img$").join(URLFactory.scene7ImageURL(productData.ImgURL, "$EcomBrowseL$", sharpen, ""));
		productHTML = productHTML.split("$tooltipImage$").join(URLFactory.scene7ImageURL(productData.ImgURL, "$EcomBrowseL$", sharpen, crop));
	}
	productHTML = productHTML.split("$alt$").join(productData.Name).split("$imageId$").join(imageId);
	return productHTML;
}

function populateProductGrid(containerId, products) {
	var count = 0;
	var maincontainer = $("#"+containerId+" .container");
	var currentGridContainer = $('<div class="grid-container browse-grid"></div>');
	var currentCol = "";

//	maincontainer.html(currentGridContainer.html(currentCol));	
//	$(products.Items).each(function(){
//		if (count > 0 && count % 10 == 0) {
//			currentGridContainer = $('<div class="grid-container browse-grid"></div>');
//			maincontainer.append(currentGridContainer);
//		}
//		if (count % 5 == 0) {
//			currentCol = $('<div class="col1 no-margin"></div>');
//		} else {
//			currentCol = $('<div class="col1"></div>');
//		}
//		currentGridContainer.append(currentCol);
//		$(currentCol).append(createProductHTML(this));
//		count++;
//    });

    var htmlstring = '';
    var n = products.Items.length;
//    if ($("body").hasClass("ie-8") && n > 100) {
//        n = 100;
//    }
    for (var i = 0; i < n; i++) {
        if (i > 0 && i % 10 == 0) {
            htmlstring += '</div>';
        }
        if (i % 10 == 0) {
            htmlstring += '<div class="grid-container browse-grid">';
        }
        if (i % 5 == 0) {
            htmlstring += '<div class="col1 no-margin">';
        } else {
        		htmlstring += '<div class="col1">';
        }
        htmlstring += createProductHTML(products.Items[i]);
        htmlstring += '</div>'; 
        count++;      
    }

	if ((n == 0 || n%10) > 0) {
		for (var i=0; i<(10 - (products.Items.length%10));i++) {
		if (count % 5 == 0) {
				htmlstring += '<div class="col1 no-margin">';
			} else {
				htmlstring += '<div class="col1">';
			}
			htmlstring +='<div class="empty"></div></div>';
			count++;
		}
    }
    
    if (!endsWith(htmlstring, "</div></div>")) {
        if (endsWith(htmlstring, "</div>")) {
            htmlstring += "</div>";
        } else {
            htmlstring += "</div></div>";
        }
    }
    maincontainer.html(htmlstring);    

    $("#" + containerId + " .grid-container:first img, #" + containerId + " .grid-container:nth-child(2) img, #" + containerId + " .grid-container:nth-child(3) img").each(function () {
        $(this).attr("src", $(this).attr("data-src"));
    });

	preloadImages(containerId);
	initTouchpager("#" + containerId);

	$(".empty").each(function () {
		$(this).height($(this).width());
	});
    //resizeTouchPager("#" + containerId);
    var imgcount;
    var images = $("#" + containerId + " img").length;
    $("#" + containerId + " .current img").load(function () {
        imgcount++;
        if (imgcount = images) {
            resizeTouchPager("#" + containerId);
        }
    });
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function getRecentlyViewedItems() {
    model = StateModel.getInstance();

    $(".item-extras .loader").show();

	$.ajax({
	    url: "/shopping/item.aspx/GetAllRecentlyViewedItems",
	    type: "POST",
	    data: '',
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function (data) {
	        if (data.d.ResponseObject != null) {
	            for (i = 0, n = data.d.ResponseObject.Items.length; i < n; i++) {
	                model.pCachedProducts.lookup[data.d.ResponseObject.Items[i].Sku] = data.d.ResponseObject.Items[i];
	            }
	            $(".item-extras .loader").hide();
	            $("#extras-recent").show();
	            populateProductGrid("extras-recent", data.d.ResponseObject);
	        }
	    },
	    error: function (jqXHR, status, error) {
	        if (locale.toLowerCase() == "en-us-trade" || locale.toLowerCase() == "ja-jp-trade") {
	            handleGTradeSessionTimeout(jqXHR);
	        }
	    }
	});			
}

function clearAllItems() {
    $.ajax({
        url: "/shopping/item.aspx/ClearAllRecentlyViewedItems",
        type: "POST",
        data: '',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if ($("body").hasClass("en-US-Stmt")) {
                $("#extras-recent").hide();
                $(".extras-recently-viewed-link").hide();
            } else {
                $(".extras-recently-viewed-link").hide();
                $(".extras-recently-viewed-link").next().hide();
                if ($("#idItemExtrasDiv h4 a:first").is(":visible")) {
                    $("#idItemExtrasDiv h4 a:first").click();
                } else {
                    $("#idItemExtrasDiv h4 a:visible").click();
                }
            }
            $("#idItemExtrasDiv .clearAllItems").hide();
        },
        error: function (jqXHR, status, error) {

        }
    });	
}

function getAdditionalItems() {
	model = StateModel.getInstance();
	var i, n;
	var query = window.location.search.split("?").join("");
	var cidParam = URLFactory.extractQueryStringValue(query, "cid");
	var searchParams = URLFactory.extractQueryStringValue(query, "search_params");
	var dataString = '{"searchQueryString" : "' + searchParams + '","isSearchMode" : ' + (URLFactory.extractQueryStringValue(query, "search") == 1 ? true : false);
	var url = "/shopping/item.aspx/GetItemsXmlBySearchQS?" + query;
	if (typeof locale != "undefined" && locale == "en-US-PKB") {
		url = "/shopping/item.aspx/GetItemsXmlBySearchQSPMId";
		dataString += ', "priceMarketID": ' + ((PKB_PRICMARKETID != "") ? PKB_PRICMARKETID : 0);
	}
    dataString += '}';

    $(".item-extras .loader").show();
    $("#extras-additional .container").css("left", "0%");

    $.ajax({
        url: url,
        type: "POST",
        data: dataString,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.ResponseObject != null) {
                if (data.d.ResponseObject.Items.length == 0 && typeof isStatementExternalMode != "undefined" && isStatementExternalMode == "True") {
                    $("#maincontent > .item-extras").hide();
                } else {
                    for (i = 0, n = data.d.ResponseObject.Items.length; i < n; i++) {
                        model.pCachedProducts.lookup[data.d.ResponseObject.Items[i].Sku] = data.d.ResponseObject.Items[i];
                    }
                    $(".item-extras .loader").hide();
                    $("#extras-additional").show();
                    populateProductGrid("extras-additional", data.d.ResponseObject);
                }
            }
        },
        error: function (jqXHR, status, error) {
            if (locale.toLowerCase() == "en-us-trade" || locale.toLowerCase() == "ja-jp-trade") {
                handleGTradeSessionTimeout(jqXHR);
            }
        }
    });			
}

function getSimilarItems() {
	var model = StateModel.getInstance();
	var tempSku = SKU;

	if (GROUP_TYPE.toLowerCase() != "individual" && SELECTED_SKU != "" && SELECTED_SKU != null) {
		tempSku = SELECTED_SKU;
    }

    $(".item-extras .loader").show();

	$.ajax({
	    url: "/shopping/item.aspx/GetSimilarItemsJSON",
	    type: "POST",
	    data: '{"sku" : "' + tempSku + '","currentPage" : "1","recsPerPage":100, "priceMarketID": ' + ((PKB_PRICMARKETID != "") ? PKB_PRICMARKETID : 0) + ' }',
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function (data) {
	        if (data.d.ResponseObject != null) {
	            for (i = 0, n = data.d.ResponseObject.Items.length; i < n; i++) {
	                model.pCachedProducts.lookup[data.d.ResponseObject.Items[i].Sku] = data.d.ResponseObject.Items[i];
	            }
	            $(".item-extras .loader").hide();
	            $("#extras-similar").show();
	            populateProductGrid("extras-similar", data.d.ResponseObject);
	        }
	    },
	    error: function (jqXHR, status, error) {
	        if (locale.toLowerCase() == "en-us-trade" || locale.toLowerCase() == "ja-jp-trade") {
	            handleGTradeSessionTimeout(jqXHR);
	        }
	    }
	});			
}

function renderImageViewerControl(type, imageName, imageUrl) {
	var controlHTML = "";
	var splitBaseURL = templateStrings.baseScene7ImageURL.split("/");
	var baseImageDirectory = splitBaseURL[splitBaseURL.length - 2];
//	var baseViewerURL = templateStrings.baseScene7Server + '/s7viewers/html5/genericZoomMobile.html?serverUrl=' + templateStrings.baseScene7Server + '/is/image/&style=TiffanyDev%2F_master_%2F07a%2F07a68306-a421-4a1d-81eb-44148b2ae8be%2Ecss&contentRoot=' + templateStrings.baseScene7Server + '/skins/&asset=' + baseImageDirectory + '/$imageName$';
	var baseViewerURL = '/Shopping/ZoomViewer.html?v=7&asset=' + baseImageDirectory + '/$imageName$&baseServerUrl=' + templateStrings.baseScene7Server + '/is/image&baseImageUrl=' + templateStrings.baseScene7ImageURL;
	var baseImageURL = '';
	var viewerURL = baseViewerURL.split("$imageName$").join(imageName);
	switch (type.toLowerCase()) {
		case "seeiton":
			controlHTML = '<div id="control_' + imageName + '" data-rendered="false" class="disabled-image"><img alt="" src="' + URLFactory.scene7ImageURL(imageName, "$EcomItemXL$&op_usm=0.0,50,0,0&fmt=jpeg&qlt=50", "", "") + '" style="max-height:inherit;height:100%;" /></div>';
			break;
		case "image":
			controlHTML = '<div id="control_' + imageName + '" data-rendered="false"><iframe id="viewer-large" src="' + viewerURL + '" frameborder="0"  scrolling="no" width="100%" height="100%" ></iframe></div>';
			break;
		case "video":
			controlHTML = '<div id="control_' + imageName + '" data-rendered="false" class="video-holder"></div>';
			break;
		case "module":
			controlHTML = '<div id="control_' + imageName + '" data-rendered="false"><img id="overlay-large" alt="" src="" /></div>';
			break;
	}
	return controlHTML;
}

function renderImageViewer(imageData) {
	var videos = [];
	var seeItOn = [];
	var products = [];
	var i, n;
	var currentImage;
	var viewMoreLinks = [];
	var thumbnailHTML = "";
	var controlHTML = "";
	var imagePaths = [];
	var viewerHTML = "";
	
	//WEBOE 10585 - Tiffany is asking that see it on images have a specific sharpening value different from other items.
	var seeItOnSharpenValue = "0.0,50,0,0";

	if (typeof (imageData) == "undefined" || typeof (imageData.Images) == "undefined" || imageData.Images.length == 0) {
		$("img#more-large").addClass("no-image").attr("src",URLFactory.scene7ImageURL("noimage", "$EcomItemL$", "", "")).show();
		return;
	};

	for (i = 0, n = imageData.Images.length; i < n; i++) {
		currentImage = imageData.Images[i];
		switch (currentImage.Type.toLowerCase()) {
			case "skustraighton":
			case "skualternateview":
				products.push(currentImage);
				break;
			case "skuseeitonview":
				seeItOn.push(currentImage);
				break;
			case "video":
			case "videoposterframe":
			case "videothumbnailposterframe":
				videos.push(currentImage);
				break;
		}
	}

	if (n > 0) {
		if (products.length > 0) {
			viewMoreLinks.push('<a class="item-more l6" href="#">' + templateStrings.moreViewsLabel + '</a>');
			for (i = 0, n = products.length; i < n; i++) {
				thumbnailHTML += '<img src="' + URLFactory.scene7ImageURL(products[i].BaseImg, "$EcomItemS$", products[i].ThumbnailPresetSharpenValue, "") + '" alt="" data-src="' + URLFactory.scene7ImageURL(products[i].BaseImg, "$EcomItemL$", products[i].LargePresetSharpenValue, "") + '" data-src-full="' + URLFactory.scene7ImageURL(products[i].BaseImg, "$EcomItemXL$", products[i].FullScreenPresetSharpenValue, "") + '" data-module-src="' + products[i].ModuleUrl + '" data-base-img="' + products[i].BaseImg + '" data-type="image" data-image-type="moreViews" />';
				imagePaths.push(URLFactory.scene7ImageURL(products[i].BaseImg, "$EcomItemS$", products[i].ThumbnailPresetSharpenValue, ""));
				imagePaths.push(URLFactory.scene7ImageURL(products[i].BaseImg, "$EcomItemL$", products[i].LargePresetSharpenValue, ""));
				imagePaths.push(URLFactory.scene7ImageURL(products[i].BaseImg, "$EcomItemXL$", products[i].FullScreenPresetSharpenValue, ""));
				controlHTML += renderImageViewerControl("image", products[i].BaseImg, URLFactory.scene7ImageURL(products[i].BaseImg, "$EcomItemXL$", "", ""));
			}
			$("#more-large").attr("src", URLFactory.scene7ImageURL(products[0].BaseImg, "$EcomItemL$", "", ""));
		}

		if (seeItOn.length > 0) {
			viewMoreLinks.push('<a class="item-on l6" href="#">' + templateStrings.seeItOnLabel + '</a>');
			for (i = 0, n = seeItOn.length; i < n; i++) {
				thumbnailHTML += '<img src="' + URLFactory.scene7ImageURL(seeItOn[i].BaseImg, "$EcomItemS$", seeItOn[i].ThumbnailPresetSharpenValue, "") + '$" alt="" data-src="' + URLFactory.scene7ImageURL(seeItOn[i].BaseImg, "$EcomItemL$", seeItOnSharpenValue, "") + '" data-src-full="' + URLFactory.scene7ImageURL(seeItOn[i].BaseImg, "$EcomItemXL$", seeItOnSharpenValue, "") + '" data-module-src="' + seeItOn[i].ModuleUrl + '" data-base-img="' + seeItOn[i].BaseImg + '" data-type="image" data-image-type="seeItOn" />';
				imagePaths.push(URLFactory.scene7ImageURL(seeItOn[i].BaseImg, "$EcomItemS$", seeItOn[i].ThumbnailPresetSharpenValue, ""));
				imagePaths.push(URLFactory.scene7ImageURL(seeItOn[i].BaseImg, "$EcomItemL$", seeItOnSharpenValue, ""));
				imagePaths.push(URLFactory.scene7ImageURL(seeItOn[i].BaseImg, "$EcomItemXL$", seeItOnSharpenValue, ""));
				controlHTML += renderImageViewerControl("seeiton", seeItOn[i].BaseImg, URLFactory.scene7ImageURL(seeItOn[i].BaseImg, "$EcomItemXL$", "", ""));
			}
		}

		if (videos.length > 0) {
			viewMoreLinks.push('<a class="item-video l6" href="#">' + templateStrings.videoLabel + '</a>');
			for (i = 0, n = videos.length; i < n; i++) {
				thumbnailHTML += '<img src="' + URLFactory.scene7ImageURL(videos[i].ThumbnailUrl, "$EcomItemS$", videos[i].ThumbnailPresetSharpenValue, "") + '" alt="" data-src="' + URLFactory.scene7ImageURL(videos[i].BaseImg, "$EcomItemL$", videos[i].LargePresetSharpenValue, "") + '" data-src-full="' + URLFactory.scene7ImageURL(videos[i].BaseImg, "$EcomItemXL$", videos[i].FullScreenPresetSharpenValue, "") + '" data-module-src="' + videos[i].ModuleUrl + '" data-base-img="' + videos[i].BaseImg + '" data-type="video" />';
				imagePaths.push(URLFactory.scene7ImageURL(videos[i].ThumbnailUrl, "$EcomItemS$", videos[i].ThumbnailPresetSharpenValue, ""));
				imagePaths.push(URLFactory.scene7ImageURL(videos[i].BaseImg, "$EcomItemL$", videos[i].LargePresetSharpenValue, ""));
				imagePaths.push(URLFactory.scene7ImageURL(videos[i].BaseImg, "$EcomItemXL$", videos[i].FullScreenPresetSharpenValue, ""));
				controlHTML += renderImageViewerControl("video", videos[i].BaseImg, URLFactory.scene7ImageURL(videos[i].BaseImg, "$EcomItemXL$", "", ""));
			}
		}
		$(".thumbs div").html(thumbnailHTML);
		$(".image-overlay .large-image").prepend(controlHTML);
		BrowserUtils.preloadImages(imagePaths);

		if (imageData.Images.length <= 1) {
			$(".thumbs").html("").hide();
			$("#more-views-links").html("");
		}
	}
	else {
		$(".thumbs").html("").hide();
		$("#more-views-links").html("");
	}

	var hash = window.location.hash.split("#").join("");
	if (hash == "") {
		hash = URLFactory.convertStateToHash(StateModel.getInstance().getStateSnapshot());
	}

	setStateFromHistory(URLFactory.extractValue(hash, "flash"))
	HistoryManager.getInstance().overrideBaseState(hash);

}

function setImageViewerState(stateObj, suppressHistory) {
	var model = StateModel.getInstance();
	var srcLarge = "";
	var srcModule = "";
	var $selectedThumb;
	var thumbIndex;
	var previousThumbIndex;
	var $selectedDiv;

	suppressHistory = (typeof (suppressHistory) == "undefined") ? false : suppressHistory;

	if (typeof (stateObj.selectedImage) != "undefined" && stateObj.selectedImage != null) {

		previousThumbIndex = $(".more-images .thumbs img.active").index() + 1;
		thumbIndex = stateObj.selectedImage;

		if (thumbIndex == null) {
			thumbIndex = previousThumbIndex;
		}

		$selectedThumb = $(".more-images .thumbs img").eq(thumbIndex - 1);

		if ($selectedThumb.length == 0) {
			// Handle out of bounds on the selected thumb index
			$selectedThumb = $(".more-images .thumbs img").eq(0);
			thumbIndex = stateObj.selectedImage = 1;
		}

		// Ignore the request if the currently selected thumbnail is the same as the one being set
		if (thumbIndex != previousThumbIndex || previousThumbIndex == 0) {
			if (stateObj.selectedImage <= 0) {
				stateObj.selectedImage = 1;
			}
			$selectedThumb = $(".more-images .thumbs img:nth-child(" + thumbIndex + ")");
			srcLarge = $selectedThumb.attr("data-src");
			srcModule = $selectedThumb.attr("data-module-src");

			$(".thumbs img").removeClass("active");
			$(".image-overlay .thumbs img:nth-child(" + thumbIndex + ")").addClass("active");
			$(".more-images .thumbs img:nth-child(" + thumbIndex + ")").addClass("active");
			if (previousThumbIndex > 0) {
				$(".image-overlay .large-image div:nth-child(" + previousThumbIndex + ")").fadeOut(250, function () {
					$selectedDiv = $(".large-image div:nth-child(" + thumbIndex + ")");
					$selectedDiv.fadeIn(250);
					if ($selectedDiv.attr("data-rendered") == "false") {
						$selectedDiv.html($selectedDiv.html());
						$selectedDiv.attr("data-rendered", "true");
					}
				});
			}
			else {
//				$(".image-overlay .large-image div").hide();
				$(".image-overlay .large-image div:nth-child(" + thumbIndex + ")").fadeIn(250);
			}
//			$("#overlay-large").fadeOut(250, function() {
//				$("#overlay-large").attr("src", srcFull);
//				$("#overlay-large").fadeIn(250);
			//			});
			$("#more-large").fadeOut(250, function() {
				$("#more-large").attr("src", srcLarge);
				$("#more-large").fadeIn(250);
			});
			$("#overlay-module").html("");
		}
	}

	if (typeof (stateObj.showFullScreen) != "undefined" && stateObj.showFullScreen != null) {
		if (stateObj.showFullScreen == true) {
			// Don't repeat the show full screen action if it's already in full screen mode
			if ($(".image-overlay").css("display") == "none") {
				resizeOverlay();
				$(".large-image div").hide();
				selectedDiv = $(".large-image div:nth-child(" + stateObj.selectedImage + ")");
				selectedDiv.show();
				selectedDiv.html(selectedDiv.html());
				if (!$("body").hasClass("ie-7")) {
				    $(".image-overlay").fadeIn(250);
				    if ($("body").hasClass("ie-8")) {
				        $("#gray-overlay").show();
				    } else {
				        $("#gray-overlay").fadeIn(250);
				    }
				}
				$("#overlay-large").stop();
				if (suppressHistory == false) {
					setImageViewerHistory();
				}

			}
		}
		else {
			if ($(".image-overlay").css("display") != "none") {
				$(".image-overlay").hide();
				$("#gray-overlay").hide();
				if (suppressHistory == false) {
					setImageViewerHistory();
				}
			}
			$("#overlay-module").html("");
		}
	}

	$selectedThumb = $(".image-overlay .thumbs img.active");
	if ($(".image-overlay").css("display") == "block" && $selectedThumb.attr("data-type") == "video") {
		handleShowVideo("control_" + $selectedThumb.attr("data-base-img"), $selectedThumb.attr("data-module-src"));
	} else if ($(".video-holder video").length > 0){
		$(".video-holder .video").children().filter("video").each(function(){
			this.pause();
			delete(this);
			$(this).remove();
		});
		$(".video-holder video").empty();
	}

}

function setImageViewerHistory() {
	var fullScreen = false;
	var selectedIndex = "1";

	var hash = window.location.hash.split("#").join("");
	if (hash == "") {
		hash = URLFactory.convertStateToHash(StateModel.getInstance().getStateSnapshot());
	}

	selectedIndex = $(".more-images .thumbs .active").index() + 1;
	if ($(".image-overlay").css("display") != "none") {
		fullScreen = true;
	}

	hash = URLFactory.updateHash(hash, "flash", fullScreen + "+" + selectedIndex);
	window.location.hash = hash;
	HistoryManager.getInstance().addHistoryItem(hash);
}

function setStateFromHistory(stateHash) {
 	var splitState = stateHash.split("+");
	var selectedImage = 1;
	var showFullScreen = false;
	var previousThumbIndex = $(".more-images .thumbs img.active").index() + 1;

	if (stateHash == "") {
		if (previousThumbIndex == 0) {
			selectedImage = 1;
		}
		else {
			selectedImage = previousThumbIndex;
		}
	}

	if (splitState != null && splitState.length == 2) {
		if ((splitState[0].toLowerCase() == "true" || splitState[0].toLowerCase() == "false") && isNaN(Number(splitState[1])) == false) {
			selectedImage = Number(splitState[1]);
			showFullScreen = (splitState[0].toLowerCase() == "true") ? true : false;
		}
	}
    setImageViewerState({ selectedImage: selectedImage, showFullScreen: showFullScreen }, true);
}

$(window).load(function () {
	//item page specific code
	//centerItemInfo();
    //end item page specific code
    var lineoffset = $(".item-extras").offset().top;
    $(".image-overlay").css("height", lineoffset);
});

$(window).resize(function ()
{
	//item page specific code
	//centerItemInfo();
	updateLinkPosition();
	resizeOverlay();
	layoutItemPageTiles();
	var lineoffset = $(".item-extras").offset().top;
	$(".image-overlay").css("height", lineoffset);
	//end item page specific code
});

function layoutItemPageTiles() {
	calculateGrid();
	var maxHeight = 0;
	$.each(ItemPageMarketingTilesJSON.tiles, function () {
	// position tiles
	$('#' + this.Id).css('width', gridSize(this.Width, gridUnit, gridGutter) + 'px');
	$('#' + this.Id).css('height', gridSize(this.Height, gridUnit, gridGutter) + 'px');
	$('#' + this.Id).css('top', gridPos(this.Top, gridUnit, gridGutter) + 'px');
	$('#' + this.Id).css('left', gridPos(this.Left, gridUnit, gridGutter) + 'px');
	$('#' + this.Id).addClass('col' + this.Width);
	if (this.Top + this.Height > maxHeight) {
	maxHeight = this.Top + this.Height;
	}
	});
	//set the tile container height
	$('.flexible-height').css('height', (maxHeight * (gridUnit + gridGutter)) + 'px');
	centerTileText();
	$('.flexible-height').fadeIn();
}
//end tile layout code 
function handlePKBSearch() {
    var searchText = $.trim($("#pkbSkuSearch").val(), '');
    $("#pkbSearchError").html("");
    if (compassConnectionSource != null) {
    	sendSearchToCompass(searchText);
    }
    else if (searchText.length == 8 && searchText.match(/^\d+$/)) {
        $.ajax({
            url: "/Shopping/Item.aspx/GetSKUSearchResult",
            type: "POST",
            data: '{"sku":"' + searchText + '"}',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var response = data.d.ResponseObject;
                //var successStatus = XMLUtils.getNodeValue(resultElements, "Success");
                var successStatus = response.Found;
                //var sku = XMLUtils.getNodeValue(resultElements, "Sku");
                var sku = response.Sku;
                //var errorMessage = XMLUtils.getNodeValue(resultElements, "ErrorMessage");
                var errorMessage = response.ErrorMessage;
                var oldURL;
                var query;
                if (successStatus != null && successStatus.toLowerCase() == "false") {
                    if (errorMessage != "" && errorMessage != null) {
                        $("#pkbSearchError").html(errorMessage);
                    }
                }
                else if (successStatus != null && successStatus.toLowerCase() == "true") {
                    $("#pkbSearchError").html("");
                    if (sku != "" && sku != null) {
                        oldURL = document.location.href;
                        query = oldURL.split("?")[1];
                        query = URLFactory.updateQuery(query, "sku", searchText);
                        document.location.href = "/Shopping/Item.aspx?" + query;
                    }
                }
            }
        }); 
    }
    else if(searchText.length > 0 && searchText != ''){
        window.location = "/Shopping/PKBSearch.aspx#t+" + encodeURIComponent(searchText);
    }	
} 

//primarySku, skuQtyArray, description, price, selectedSku
function itemPageAddToSaved() {
	var primarySku = SKU;
	var selectedSku = SELECTED_SKU;
	var query = window.location.search.split("?").join("");
	var mcat = MASTER_CATEGORY_ID;
	var cid = CATEGORY_ID;
	var productData = StateModel.getInstance().getProduct(primarySku);
	//var itemProperties = {};
	var url = "";
	var data = "";
	var qty = 1;
	//var skuArray = [];
	var qtyArray = [];
	var message = "This item has been added to your wish list.";
	var links = "";
	var priceMarket = "1";
	var skuQtyArray = $("#itemOptions input").map(function(){
		return $(this).val();
	}).get();
	var skuQuantityArr = [];
	var trackingSku;
	//itemProperties.name = description;
	//itemProperties.price = price;
	//itemProperties.qty = 0;
	//$(".open-bag, .open-saved, .open-rings").removeClass("selected");
	//$("#saved-content").html('<img class="loading" src="/shared/images/loading.gif" />');
	//$("#saved:hidden").slideDown(300);
	if (SKU_ARRAY == null || SKU_ARRAY.length == 1) {
		if (selectedSku == "") {
			trackingSku = primarySku;
		} else {
			trackingSku = primarySku + ":" + selectedSku;
		}		
		if (skuQtyArray.length == 1) {
			qty = skuQtyArray[0];
		}
		if (locale.toLowerCase() == "en-us-pkb") {
			/*
			if (CookieManager.getCookieValue("pkbPriceCurrency") != null) {
				priceMarket = CookieManager.getCookieValue("pkbPriceCurrency");
			}
			*/
			url = '/Default.aspx/AddPKBSavedItem';
			data = '{"sku":"' + primarySku + '", "selectedSku":"' + selectedSku + '", "cid":' + cid + ', "mcid":' + mcat + ', "qty":"'+qty+'", "priceMarketID":"' + PKB_PRICMARKETID + '"}'
		}
		else {
			url = '/Default.aspx/AddSavedItem';
			//itemProperties.qty = skuQtyArray[0].qty;
			data = '{"sku":"' + primarySku + '", "selectedSku":"' + selectedSku + '", "cid":' + cid + ', "mcid":' + mcat + ', "qty":"'+qty+'"}'
		}
	} else if (SKU_ARRAY.length > 1) {
		trackingSku = primarySku + ":" + selectedSku;
		url = '/Default.aspx/AddMultipleSavedItems';
		//for (var i = 0; i < SKU_ARRAY.length; i++) {
			//itemProperties.qty = skuQtyArray[0].qty;
			//skuArray.push(skuQtyArray[i].sku);
			//qtyArray.push(1);
		//}
		data = '{"sku":"' + primarySku + '", "selectedSku":"' + selectedSku + '", "strSkuList":"' + SKU_ARRAY.join(":") + '", "cid":' + cid + ', "mcid":' + mcat + ', "qtyList":"' + skuQtyArray.join(":") + '"}'
	}
	TrackActionAddToSavedItems("Item Page", "Add to SavedItems", trackingSku);	
	if (true) {
	    $.ajax({
	        url: url,
	        type: 'POST',
	        cache: false,
	        data: data,
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
	        success: function (data) {
	            if (typeof (data.d.SuccessFlag) == "undefined" || data.d.SuccessFlag == false || data.d.SuccessFlag == "False") {
	                var errorMsg = null;
	                try { eval("errorMsg = " + data.d.SKUStatus[0].StatusMessage + ";"); } catch (err) { }
	                if (!errorMsg) {
	                	errorMsg = data.d.SKUStatus[0].StatusMessage;
	                }
	                $("#ajaxError").html(errorMsg);
	                //alert("Save for Later not successful. Proper error handling pending.");
	            }
	            else {
	                $("#ajaxError").html("");
	                CookieManager.setCookieValue("saveditemscnt", data.d.BagCount);
	                //itemProperties.img = data.d.Image;
	                //parent.updateShoppingBagLabel();
	                newlyAddedItemsArr = [];
	                for (var i = 0; i < data.d.SKUStatus.length; i++) {
	                    var bagId = data.d.SKUStatus[i].ItemID;
	                    newlyAddedItemsArr[i] = bagId;
	                }
	                $("#saved-content").removeClass("sb rings").addClass("saved");
					//IBM BT 10020 - Update Saved Items label
					InlineShoppingBagManager.getInstance().updateSavedItemsLabel();
	                // TCO BT# 11244 - Updating label is done at method updateInlineCustomerSelections
	                InlineShoppingBagManager.getInstance().updateInlineCustomerSelections(data.d.SKUStatus, data.d.Image);
	            }
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	            if (locale.toLowerCase() == "en-us-trade" || locale.toLowerCase() == "ja-jp-trade") {
	                handleGTradeSessionTimeout(jqXHR);
	            }
	        }
	    });
	}
	centerGridText();
}

function validateAddWithServicing(linkEngravingParams)
{
	var sku = '';
	var selectedSku = '';
	var groupType = '';
	var parentGroupSku = '';
	var quantity = "1";
	var categoryId = 0;
	var masterCategoryId = 0;
	var paperCatalogueId = 0;
	var paperCatalogueItemId = 0;
	var origin = 1;
	var url;

	var n;
	var paramsArray = linkEngravingParams.split("&");
	var tempParam;

	for (var i = 0, n = paramsArray.length; i < n; i++)
	{
		tempParam = paramsArray[i].split("=");
		if (tempParam.length > 1)
		{
			switch (tempParam[0].toLowerCase())
			{
				case "grouptype":
					groupType = tempParam[1];
					break;
				case "cid":
					categoryId = Number(tempParam[1]);
					break;
				case "mcid":
					masterCategoryId = Number(tempParam[1]);
					break;
				case "origin":
					origin = Number(tempParam[1]);
					break;
				case "sku":
					sku = tempParam[1];
					break;
				case "selectedsku":
					selectedSku = tempParam[1];
					break;
				case "quantity":
					quantity = tempParam[1].split(",").join(";");
					break;
			}
		}
	}

	if (groupType.toLowerCase() == "type2")
	{
		parentGroupSku = sku;
		url = "/Shopping/Item.aspx/ValidateShoppingBagMultipleItemsWithServicing";
		data = '{"strSku":"' + sku + '", "selectedSku":"' + selectedSku + '", "strSkuAndQuantity":"' + quantity + '", "cid":' + categoryId + ', "mcid":' + masterCategoryId + ', "origin":' + origin + ', "cat_id":"", "cat_item_id":"", "p_cat_id":"", "p_cat_item_id":""}';

		for (var skuCnt = 0; skuCnt < SKU_ARRAY.length; skuCnt++)
		{
			// Clear the previous error			
			var currView = document.getElementById("errMsg" + skuCnt);
			if (currView)
			{
				currView.innerHtml = "";
				currView.parentNode.removeChild(currView);
			}
		}
	}
	else
	{
		url = "/Shopping/Item.aspx/ValidateShoppingBagItemWithServicing";
		data = '{"sku":"' + sku + '", "selectedSku":"' + selectedSku + '", "quantity":"' + quantity + '", "cid":' + categoryId + ', "mcid":' + masterCategoryId + ', "origin":' + origin + ', "cat_id":"", "cat_item_id":"", "p_cat_id":"", "p_cat_item_id":""}';
	}

	// Clearing previous ajax error
	var errorDiv = document.getElementById("ajaxError");
	if (errorDiv)
	{
		errorDiv.innerHTML = "";
	}

	// Clearing previous non-ajax error - IBM BT#3471
	var nonAjaxErrorDiv = document.getElementById("divError");
	if (nonAjaxErrorDiv)
	{
		nonAjaxErrorDiv.innerHTML = "";
		nonAjaxErrorDiv.style.display = "none";
	}

	$.ajax({
		url: url,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: data,
		success: function (data)
		{
			var resultObj = {};
			resultObj.skuArray = new Array();
			var skuNodeArray = data.d.SKUStatus;
			for (var snCnt = 0; snCnt < skuNodeArray.length; snCnt++)
			{
				var currSkuNode = skuNodeArray[snCnt];
				var currSkuObj = {};
				currSkuObj.id = currSkuNode.ItemID;
				currSkuObj.status = currSkuNode.StatusMessage;
				resultObj.skuArray.push(currSkuObj);
			}
			resultObj.resStatus = skuNodeArray[0].StatusMessage;

			if (data.d.SuccessFlag.toLowerCase() == "true")
			{
				OverlayManager.getInstance().open("linkEngraving", {
					url: '/Shopping/Engraving.aspx?' + linkEngravingParams + "&isPDP=1",
					size: 'wide'
				});
			} 
			else if (data.d.StatusMessage == "ERROR_HTTP_500")
			{
				window.location = "/common/errors/500.aspx";
			} 
			else
			{
				handleAddFault(resultObj.skuArray);
			}
		},
		error: function (jqXHR, status, error)
		{
			window.location = "/common/errors/500.aspx";
		}
	});
}

function handleAddFault(argResult) {
//	Debug.windowTrace("handleAddFault:"+typeof(argResult));
	var msg;
	if (typeof(argResult) == "string") {
		//some other error occurred
		msg = argResult;
	} else {
		//set the error message from the status key
		for (var skuCnt=0;skuCnt< argResult.length;skuCnt++){
			var currSku = argResult[skuCnt];
			msg = "";
			var currMsg=null;
			try{eval("currMsg = "+currSku.status+";");}catch (err){}
			if (currMsg) {
				msg += currMsg;
			} else {
				msg += currSku.status;
          }
			currSku.errorString = msg;
//			Debug.windowTrace(currSku.id+": Status = "+currSku.status+"; "+currSku.errorString);
		}
}

    var errorDiv = document.getElementById("ajaxError");    
	if (errorDiv) {
	    errorDiv.innerHtml = "";
	    
        // Clearing previous non-ajax error - IBM BT#3471
	    var nonAjaxErrorDiv = document.getElementById("divError");
	    if (nonAjaxErrorDiv) {
	        nonAjaxErrorDiv.innerHTML = "";
	        nonAjaxErrorDiv.style.display = "none";
	    }

		if (typeof(argResult) != "String" && argResult.length > 1) {
//			Debug.windowTrace("looping through all skus on page");
			for (var skuACnt=0;skuACnt< SKU_ARRAY.length;skuACnt++){
				var currASku = SKU_ARRAY[skuACnt];
				//get message for this sku
				var skuMsg;
				for (var innerCnt=0;innerCnt<argResult.length;innerCnt++) {
					if (currASku == argResult[innerCnt].id) {
						skuMsg = argResult[innerCnt].errorString;
						break;
					}
				}
				//need to place error messages with each sku				
                var currView = document.getElementById("errMsg" + skuACnt);
                
				if (skuMsg != "PENDING") {
//					Debug.windowTrace("skuMsg="+skuMsg);
					if (!currView) {
						var currView = document.createElement("div");
						currView.id = "errMsg"+skuACnt;
						currView.className = "groupType2Error";
						var prevSibling = document.getElementById("ctlSkuGroupType2_rptItemList_ctl0"+skuACnt+"_divGrpData");
						if (!prevSibling) {
							prevSibling = document.getElementById("ctlSkuGroupType2_rptItemList_ctl0"+skuACnt+"_txtQuantity").parentNode.parentNode;
						}
						var msgParent = prevSibling.parentNode;
						msgParent.insertBefore(currView,prevSibling.nextSibling);
					}
					currView.innerHTML = skuMsg;
				} else {
					if (currView) {
						currView.innerHTML = "";
						currView.parentNode.removeChild(currView);
					}
				
				}
			}
		} else {		
			errorDiv.innerHTML = msg;
		}
	}
	//hide progress indicator
	var addMessageDiv = document.getElementById("addMessage");
	if (addMessageDiv) {
		addMessageDiv.innerHTML = "";
		addMessageDiv.style.display = "none";
	}
}

function itemPageAddToCart() {
	var primarySku = SKU;
	var selectedSku = SELECTED_SKU;
	var query = window.location.search.split("?").join("");
	var mcat = MASTER_CATEGORY_ID;
	var cid = CATEGORY_ID;
	var productData = StateModel.getInstance().getProduct(primarySku);
	var isEngravable = SKU_ENGRAVABLE;
	//var itemProperties = {};
	var url = "";
	var data = "";
	var qty = 0;
	var message = "This item has been added to your shopping bag.";
	var links = "";
	var skuQtyArray = $("#itemOptions input[type='text']").map(function(){
  	return $(this).val();
	}).get();
	var skuQuantityArr = [];
	var origin = (typeof ORDER_ORIGINATION != undefined) ? ORDER_ORIGINATION : 1;

	//this.addToBagTimeout = true;
	clearTimeout(this.addToBagTimeout);
	this.addToBagTimeout = null;

	if (isEngravable == true && typeof (getLinkEngravingParams) != "undefined") {
		validateAddWithServicing(getLinkEngravingParams());
		/*
		OverlayManager.getInstance().open("linkEngraving", {
			url: '/Shopping/Engraving.aspx?' + getLinkEngravingParams(),
			size: 'wide'
		});
		*/
	} else {
		//itemProperties.name = description;
		//itemProperties.price = price;
		//itemProperties.qty = 0;
		//$(".open-bag, .open-saved, .open-rings").removeClass("selected");
		//$("#saved-content").html('<img class="loading" src="/shared/images/loading.gif" />');
		//$("#saved:hidden").slideDown(300);
		if (skuQtyArray.length == 1) {
			url = '/Default.aspx/AddShoppingBagItem';
			//itemProperties.qty = skuQtyArray[0].qty;
			data = '{"sku":"' + primarySku + '", "quantity":"' + skuQtyArray[0] + '", "selectedSku":"' + selectedSku + '", "strSkuAndQuantity":"' + primarySku + ':' + skuQtyArray[0] + '", "cid":' + cid + ', "mcid":' + mcat + ', "origin":'+origin+', "cat_id":"", "cat_item_id":"", "p_cat_id":"", "p_cat_item_id":""}'
		} else if (skuQtyArray.length > 1) {
			url = '/Default.aspx/AddMultipleShoppingBagItems';
			for (var i = 0; i < SKU_ARRAY.length; i++) {
				//itemProperties.qty = skuQtyArray[0].qty;
				skuQuantityArr.push(SKU_ARRAY[i] + ":" + skuQtyArray[i]);
			}
			data = '{"strSku":"' + primarySku + '", "selectedSku":"' + selectedSku + '", "strSkuAndQuantity":"' + skuQuantityArr.join(";") + '", "cid":' + cid + ', "mcid":' + mcat + ', "origin":'+origin+', "cat_id":"", "cat_item_id":"", "p_cat_id":"", "p_cat_item_id":""}'
		}
		if (skuQtyArray.length > 0) {
		    $.ajax({
		        url: url,
		        type: 'POST',
		        cache: false,
		        data: data,
		        dataType: "json",
		        contentType: "application/json; charset=utf-8",
		        success: function (data) {
		            if (typeof (data.d.SuccessFlag) == "undefined" || data.d.SuccessFlag == null || data.d.SuccessFlag == false || data.d.SuccessFlag == "False") {
		                var errorMsg = "Error";
		                try { eval("errorMsg = " + data.d.SKUStatus[0].StatusMessage + ";"); } catch (err) { }
		                $("#ajaxError").html(errorMsg);
		                //alert("Add to Shopping not successful. Proper error handling pending.");
		            }
		            else {
		                $("#ajaxError").html("");
		                CookieManager.setCookieValue("shoppingbagcnt", data.d.BagCount);
		                $("#btnPurchase").hide();
		                $("#btnGoToSB").show();
		                newlyAddedItemsArr = [];
		                for (var i = 0; i < data.d.SKUStatus.length; i++) {
		                    var bagId = data.d.SKUStatus[i].ItemID;
		                    newlyAddedItemsArr[i] = bagId;
		                }
		                //itemProperties.img = data.d.Image;
		                //parent.updateShoppingBagLabel();
		                $("#saved-content").removeClass("saved rings").addClass("sb");
		                /*
		                $("#saved-content").load("/Customer/InlineCustomerSelections.aspx", function () {
		                $(".open-bag").addClass("selected");
		                $("#saved:hidden").slideDown(300);
		                });
		                */
		                InlineShoppingBagManager.getInstance().updateShoppingBagLabel();
		                InlineShoppingBagManager.getInstance().updateInlineCustomerSelections(data.d.SKUStatus, data.d.Image);
		                //Tracking
						var argItem = ";"+$("#itemTitleAndText h1").text().replace(/<[^<>]+>|##|[\t\r\n]/g," ").replace(/[,:'"-]|^[ \t\r\n]+|[ \t\r\n]+$/g,"").replace(/\s{2,}/g," ").replace("™","(TM)").replace("®","(R)")+"-";
						if (GROUP_TYPE == "Individual") {
							argItem += SKU;
						} else if (GROUP_TYPE == "Type2") {
							argItem += SELECTED_SKU + ":" + SKU_ARRAY[0];
						} else {
							argItem += SELECTED_SKU;
						}
						TrackActionAddToShoppingBag("Item Page", "Add to ShoppingBag", argItem);

		            }
		        },
		        error: function (jqXHR, textStatus, errorThrown) {
		            if (locale.toLowerCase() == "en-us-trade" || locale.toLowerCase() == "ja-jp-trade") {
		                handleGTradeSessionTimeout(jqXHR);
		            }
		        }
		    });
		}
		centerGridText();
	}
}

function handleGTradeSessionTimeout(jqXHR) {
    try {
        //If the error is not for timeout or no connection check for Authentication error
        if (jqXHR != null && jqXHR.responseText != null) {
            if (jqXHR.responseText.indexOf("Authentication") >= 0) {
                window.location = window.location;
            }
        }
    } catch (err) {}
}

function handleShowVideo(containerId, videoId) {
	if (videoId != "") {
		$("#" + containerId).width(800);
		$("#" + containerId).height(450);
		Scene7Video.embedInit(containerId, videoId, 800, 450, "Item " + SKU, null, true);
	}
}

$(document).ready(function () {
    //item page specific code

    StateModel.getInstance().custom.imageViewerData = [];

    //centerItemInfo();
    updateLinkPosition();
    if (typeof (imageData) != "undefined") {
        renderImageViewer(imageData);
    }

    //item page collapse/expand/tabs code
    $("body").on("click", ".collapse", function (e) {
        $(this).siblings(".grid-container").slideUp(250);
        $(this).html('<img src="/shared/images/icons/bottom-arrow.jpg" />');
        $(this).removeClass("collapse").addClass("expand");
        return false;
    });

    $("body").on("click", ".expand", function (e) {
        var selected = $(".item-extras a.selected").attr("rel");
        $(this).siblings("#" + selected).slideDown(250);
        $(this).html('<img src="/shared/images/icons/top-arrow.jpg" />');
        $(this).removeClass("expand").addClass("collapse");
        return false;
    });

    $("body").on("click", ".item-extras h4 a", function (e) {
        var tab = $(this).attr("rel");
        $(".item-extras h4 a").removeClass("selected");
        $(this).closest("h4").siblings("div").hide();
        $(this).addClass("selected");
        $(".expand").html('<img src="/shared/images/icons/top-arrow.jpg" />');
        $(".expand").removeClass("expand").addClass("collapse");
        if (tab == "extras-story") {
            $("#" + tab).show();
        }
        $(".empty").each(function () {
            $(this).height($(this).width());
        });
        if ($(this).attr("rel") == "extras-recent") {
            getRecentlyViewedItems();
            if (typeof (TrackPDPTabActivity) != 'undefined') { TrackPDPTabActivity('Recently Viewed Items', LABEL_SHARE_SHORTDESC); }
        } else if ($(this).attr("rel") == "extras-additional") {
            getAdditionalItems();
            if (typeof (TrackPDPTabActivity) != 'undefined') { TrackPDPTabActivity('Additional Items', LABEL_SHARE_SHORTDESC); }
        } else if ($(this).attr("rel") == "extras-similar") {
            getSimilarItems();
            if (typeof (TrackPDPTabActivity) != 'undefined') { TrackPDPTabActivity('Similar Items', LABEL_SHARE_SHORTDESC); }
        }
        else if ($(this).attr("rel") == "extras-story") {
            if (typeof (TrackPDPTabActivity) != 'undefined') { TrackPDPTabActivity('The Story of This Collection', LABEL_SHARE_SHORTDESC); }
        }
        return false;
    });

    $("body").on("click", "#story-scroll", function (e) {
        $(".item-extras h4 a:first").click();
        $(".expand").html('<img src="/shared/images/icons/top-arrow.jpg" />');
        $(".expand").removeClass("expand").addClass("collapse");
        $('html, body').animate({ scrollTop: $(".item-extras").offset().top }, 'fast');
        return false;
    });
    $("body").on("click", "#similar-scroll", function (e) {
        $(".extras-similar-link a").click();
        $(".expand").html('<img src="/shared/images/icons/top-arrow.jpg" />');
        $(".expand").removeClass("expand").addClass("collapse");
        $('html, body').animate({ scrollTop: $(".extras-similar-link").offset().top }, 'fast');
        return false;
    });
    //end item page collapse/expand/tabs code

    //more views and image overlay on item page code
    $("body").on("mouseenter", "#image-holder", function (e) {
        if (isHandheld()) {
            setImageViewerState({ showFullScreen: true });
        }
        return false;
    });

    $("body").on("mouseenter", "a.item-more", function () {
        if (isHandheld()) {
            $(".image-overlay").fadeIn(250);
            if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
                $("#gray-overlay").show();
            } else {
                $("#gray-overlay").fadeIn(250);
            }
            resizeOverlay();
        }
        $(".thumbs img:nth-child(1)").trigger("mouseenter");
        TrackItemDisplayOption("Shopping/Item", "More Views", LABEL_SHARE_SHORTDESC);
        return false;
    });

    $("body").on("mouseenter", "a.item-on", function () {
        if (isHandheld()) {
            $(".image-overlay").fadeIn(250);
            if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
                $("#gray-overlay").show();
            } else {
                $("#gray-overlay").fadeIn(250);
            }
            resizeOverlay();
        }
        $(".thumbs img:nth-child(3)").trigger("mouseenter");
        TrackItemDisplayOption("Shopping/Item", "See It On", LABEL_SHARE_SHORTDESC);
        return false;
    });

    $("body").on("mouseenter", "a.item-video", function () {
        if (isHandheld()) {
            $(".image-overlay").fadeIn(250);
            if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
                $("#gray-overlay").show();
            } else {
                $("#gray-overlay").fadeIn(250);
            }
            resizeOverlay();
        }
        $(".thumbs img:nth-child(4)").trigger("mouseenter");
        TrackItemDisplayOption("Shopping/Item", "Video", LABEL_SHARE_SHORTDESC);
        return false;
    });

    $("body").on("mouseenter", ".more-images .thumbs img", function () {
        var thumbIndex = $(".more-images .thumbs img").index(this) + 1;
        setImageViewerState({ selectedImage: thumbIndex, showFullScreen: null });
        if ($(this).attr("data-type") == "video") {
            TrackItemDisplayOption("Shopping/Item", "Video", LABEL_SHARE_SHORTDESC);
        } else if ($(this).attr("data-image-type") == "seeItOn") {
            TrackItemDisplayOption("Shopping/Item", "See It On", LABEL_SHARE_SHORTDESC);
        } else {
            TrackItemDisplayOption("Shopping/Item", "More Views", LABEL_SHARE_SHORTDESC);
        }
        return false;
    });

    $("body").on("click", ".image-overlay .thumbs img", function () {
        var thumbIndex = $(".image-overlay .thumbs img").index(this) + 1;
        setImageViewerState({ selectedImage: thumbIndex, showFullScreen: null });
        if ($(this).attr("data-type") == "video") {
            TrackItemDisplayOption("Shopping/Item", "Video", LABEL_SHARE_SHORTDESC);
        } else if ($(this).attr("data-image-type") == "seeItOn") {
            TrackItemDisplayOption("Shopping/Item", "See It On", LABEL_SHARE_SHORTDESC);
        } else {
            TrackItemDisplayOption("Shopping/Item", "More Views", LABEL_SHARE_SHORTDESC);
        }
        return false;
    });

    $("body").on("click", ".more-images .thumbs img, .more-images .large-image img, .item-container > div:first-child img", function () {
        if ($("img#more-large").hasClass("no-image") == false) {
            if ($(this).closest(".thumbs").length > 0) {
                var thumbIndex = $(".more-images .thumbs img").index(this) + 1;
            } else {
                var thumbIndex = $(".more-images .thumbs img.active").index() + 1;
            }
            setImageViewerState({ selectedImage: thumbIndex, showFullScreen: true });
            TrackItemDisplayOption("Shopping/Item", "Full Screen Overlay", LABEL_SHARE_SHORTDESC);
        }
        return false;
    })

    /*
    $("body").on("click", ".more-images .thumbs img", function () {
    if ($("img#more-large").hasClass("no-image") == false) {
    var thumbIndex = $(".more-images .thumbs img").index(this) + 1;
    setImageViewerState({ selectedImage: thumbIndex, showFullScreen: true });
    TrackItemDisplayOption("Shopping/Item", "Full Screen Overlay", LABEL_SHARE_SHORTDESC);
    }
    return false;
    })
    */

    $("body").on("click", ".image-overlay .close", function () {
        setImageViewerState({ selectedImage: null, showFullScreen: false });
        return false;
    });

    $("body").on("mouseleave", ".more-images", function () {
        //$(".more-images .thumbs").fadeOut(250);
        return false;
    });

    $("body").on("click", "#gray-overlay", function () {
        setImageViewerState({ selectedImage: null, showFullScreen: false });
        return false;
    });
    //end more views and image overlay on item page code

    //additional item paging on item page
    var animating;
    $("body").on("click", ".paging a", function () {
        var page = parseInt($(".current-page").text());
        var totalpages = parseInt($(".total-pages").text());
        var container = $(this).parent().siblings(".grid-container.active");

        if ($(this).hasClass("page-left")) {
            page--;
            var nextcontainer = container.prev();
        } else if ($(this).hasClass("page-right")) {
            page++;
            var nextcontainer = container.next();
        }

        if (animating) {
            return false;
        } else {
            animating = true;
        }

        if (page == 1) {
            $(".page-left").hide();
            $(".page-right:hidden").show();
        } else if (page == totalpages) {
            $(".page-right").hide();
            $(".page-left:hidden").show();
        } else {
            $(".page-left:hidden, .page-right:hidden").show();
        }

        $(".current-page").text(page);

        $("#extras-additional").height($("#extras-additional").height());

        container.removeClass("active").fadeOut(250, function () {
            nextcontainer.addClass("active").fadeIn(250, function () {
                $("#extras-additional").height("auto");
                animating = false;
            });
            $(".empty").each(function () {
                $(this).height($(this).width());
            });
        });

        return false;
    });
    //end additional item paging on item page

    //grid specific code

    centerGridText();

    //browse grid popups
    $("body").on("mouseenter", ".browse-grid > div > img, .browse-grid .subrow > img", function (e) {
        var parent = this;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            if (!$(parent).parent().parent().hasClass("text-container")) {
                displayTooltipData($(parent));
            }
            clearTimeout(timer);
            timer = null;
        }, 300);
    });

    $("body").on("click", "#grid-popup .close", function (e) {
        $("#grid-popup").hide();
        return false;
    });

    $("body").on("click", ".engraving-info .close", function (e) {
        $(".engraving-info").hide();
        return false;
    });

    $("body").on("mouseleave", "#grid-popup", function (e) {
        var theselect = $("#grid-popup select");
        var thebtn = $("#grid-popup a.btn");
        if (e.target != theselect[0] && e.target.parentElement != theselect[0] && e.target != thebtn[0]) {
            $(this).fadeOut(300);
        }
    });

    //end broswe grid popups

    //item page engraving info popup
    $("body").on("click", "a.engraving-available", function () {
        if (typeof (sendOmnitureClickEvent) != 'undefined'); sendOmnitureClickEvent('Engraving Available');
        $(".engraving-info").toggle();
        return false;

    });
    $("body").on("mouseleave", ".engraving-info", function () {
        $(this).hide();
    });
    //end item page engraving info popup 

    //item page pickup info popup
    $("body").on("click", "a.pickup-available", function () {
        $(".pickup-info").toggle();
        return false;
    });

    $("body").on("mouseleave", ".pickup-info", function () {
        $(this).hide();
    });
    //end item page pickup info popup 

    //item page view specifications popup
    $("body").on("click", "a.specifications-available", function () {
        $(".specifications-info").toggle();
        return false;
    });
    $("body").on("mouseleave", ".specifications-info", function () {
        $(this).hide();
    });
    //end item page specifications popup 		

    // Format Marketing Tiles
    layoutItemPageTiles();

    // Add to Cart handler
    $("#btnPurchase").click(function (e) {
        if (CookieManager.areCookiesEnabled() == true) {
            itemPageAddToCart();
            e.preventDefault();
        }
    });

    //Add to Save handler
    $("#ancSaveForLater").click(function (e) {
        if (CookieManager.areCookiesEnabled() == true) {
            itemPageAddToSaved();
            e.preventDefault();
        }
    });

    $(".item-extras h4 a:first").click();
    $(".item-extras h4 a:first").parent().prev("span").hide();

    var hash = window.location.hash;
    var query = window.location.search.split("?").join("");
    var compass = URLFactory.extractQueryStringValue(query, "compass");
    var searchParams = URLFactory.extractQueryStringValue(query, "search_params");
    var model = StateModel.getInstance();

    if (hash != "") {
        model.setStateSnapshot(URLFactory.convertHashToState(hash));
    }
    else if (searchParams != "") {
        model.setStateSnapshot(URLFactory.convertHashToState(searchParams));
    }
    else {
        var stateSnapshot = model.getStateSnapshot();
        if (typeof cidParam != "undefined" && cidParam != "") {
            stateSnapshot.category = cidParam;
        }
        model.setStateSnapshot(stateSnapshot);
    }

    if (compass.toLowerCase() == "true") {
        $("body").addClass("embedded");
    }

    $(HistoryManager.getInstance()).bind("historyChanged", function (e, data) {
        setStateFromHistory(data.state.flash);
    });

    $("body").on("click", "a.clearAllItems", function (e) {
        clearAllItems();
        e.preventDefault();
        return false;
    });
    $("body").on("click", ".item-extras h4 a", function (e) {
        if ($(this).attr("rel") == "extras-recent") {
            $("a.clearAllItems").fadeIn(250);
        } else {
            $("a.clearAllItems").fadeOut(250);
        }
    });

    if (($("body").hasClass("en-US-Stmt") || $("body").hasClass("en-US-PKB")) && $(".extras-recently-viewed-link a").hasClass("selected")) {
        $("a.clearAllItems").show();
    }
});

var compassConnectionId = null;
var compassConnectionSource = null;

window.addEventListener("message", function (event) {
	var command = "";
	var message = "";

	if (typeof (templateStrings.baseCompassServer) != "undefined" && event.origin == templateStrings.baseCompassServer) {
		if (event.data.split(":").length == 2) {
			command = event.data.split(":")[0];
			message = event.data.split(":")[1];
		}
		else {
			command = event.data;
		}

		switch (command.toLowerCase()) {
			case "initialize":
				compassConnectionId = message;
				compassConnectionSource = event.source;
				break;
			case "addskutoorder":
				addSkuToCompassOrder(
					SKU,
					(SKU_ARRAY != null && SKU_ARRAY.length > 0) ? SKU_ARRAY[0] : "", // Default SKU
					SELECTED_SKU,
					PKB_PRICMARKETID
				);
		}
	}
}, false);

function sendSkuToCompass(sku, state) {
	if (compassConnectionSource != null) {
		if (typeof (state) != "undefined" && state != null && state != "") {
			state = ":" + state;
		}
		compassConnectionSource.postMessage("connection:" + compassConnectionId + ";type:triggerSKU;data:" + sku + state, templateStrings.baseCompassServer);
	}
}

function addSkuToCompassOrder(sku, defaultSku, selectedSku, priceMarket) {
	if (compassConnectionSource != null && typeof (sku) != "undefined" && sku != null && sku != "") {
		selectedSku = (typeof (selectedSku) != "undefined" && selectedSku != null) ? selectedSku : defaultSku;
		priceMarket = (typeof (priceMarket) != "undefined" && priceMarket != null) ? priceMarket : "";
		compassConnectionSource.postMessage("connection:" + compassConnectionId + ";type:triggerAddSKU;data:" + sku + "-" + selectedSku + "-" + priceMarket, templateStrings.baseCompassServer);
	}
}

function sendSearchToCompass(searchTerm) {
	if (compassConnectionSource != null) {
		compassConnectionSource.postMessage("connection:" + compassConnectionId + ";type:triggerSKUSearch;data:" + encodeURIComponent(searchTerm), templateStrings.baseCompassServer);
	}
}
