$("li.alternates a.alt").click(function(event) {
        event.preventDefault();		
    });
//product namespace, contains methods used for product detail page
(function( product, $, undefined ) {
	
	//public method to load size drop down
	product.loadSizeOptions = function(){
		var uniqueSizes = new Array();
		$.each(jsonProdSkus, function(idx, val) {
			var currentSize = val.size;
			if(currentSize != undefined && currentSize.indexOf("=") > 0)
				currentSize = currentSize.split("=")[0];
			
			if(currentSize != undefined && $.inArray(currentSize, uniqueSizes) == -1)
				uniqueSizes[uniqueSizes.length++] = currentSize;
		});
		
		
		$('#selProdSize').find('option').remove();
		if(uniqueSizes.length > 1)
			$('#selProdSize').append("<option value=''>" + dfltSizeDropDown + "</option>");
		$.each(uniqueSizes, function (idx, text) {
			$('#selProdSize').append("<option value='" + text + "'>" + text + "</option>");
        });
		
		// No SKUs are available, so just show the out of stock message and hide the action controls
		if(uniqueSizes.length == 0) {
			$('#pError').show();
			$('#pSize').hide();
			$('div.stock_ship').hide();
			$('div.addtb').hide();
		} else {
			if(isInseamProduct == "true") {
				$('#inseamOptions').show();
				product.buildInseamOptions();
				product.updateStaticLabels();
			} else {
				product.updateStaticLabels();
			}
		}
	};
	
	product.updatePagerLinks = function(){
		var data = new Object();
		data.sortByFieldId = filterSortBy;
		data.sortByDir = filterSortDir;
		data.filterQuery = filterQry;
		data.folderId = currentFolderId;
		if(filterCurrentPage > 1)
			filterCurrentPage = filterCurrentPage-1;
		data.page = filterCurrentPage;
		data.productsPerPage = 110;
		
		$.getJSON(getProductURL, data, parseResults);
	};
	
	//private method to process the data coming back from the product ajax call
	function parseResults(data){
		var prevUrl = "#";
		var nextUrl = "#";
		var foundCurrent = false;
		
		$.each(data.ROW_ARRAY, function(key, val){
			if(foundCurrent) {
				nextUrl = val.url;
				return false;
			}
			else if(val.prdCode != currentProdCode) {
				prevUrl = val.url;
			}
			
			if(val.prdCode == currentProdCode)
				foundCurrent = true;
		});
		
		$("div#product-pager a.prevProduct").attr("href", prevUrl);
		$("div#product-pager a.nextProduct").attr("href", nextUrl);
		
		if(prevUrl == "#") {
			$("div#product-pager a.prevProduct").addClass("disabled");
		}
		if(nextUrl == "#") {
			$("div#product-pager a.nextProduct").addClass("disabled");
		}
	}
	
	//public method to load inseam drop down
	product.buildInseamOptions = function() {
		var uniqueInseams = new Array();
		var selectedSize = $('#selProdSize').val();
		if(isInseamProduct == "true") {
			$.each(jsonProdSkus, function(idx, val) {
				var currentSize = val.size;
				var currentInseam = "";
				if(currentSize.indexOf("=") > 0) {
					currentSize = val.size.split("=")[0];
					currentInseam = val.size.split("=")[1]
				}
				if(currentSize == selectedSize) {
					if($.inArray(currentInseam, uniqueInseams) == -1)
						uniqueInseams[uniqueInseams.length++] = currentInseam;
				}
			});
			
			//sort Inseams
			uniqueInseams.sort(function (a, b){
	            if(!isNaN(a) && !isNaN(b))
					return (a-b);
				else if(!isNaN(a))
	    			return 1;
	    		else
	    		    return 0;
			});
			
			$('#selProdInseam').find('option').remove();
			$.each(uniqueInseams, function (idx, text) {
				$('#selProdInseam').append("<option val='" + text + "'>" + text + "</option>");
	        });
		}
	};
	
	product.updateStaticLabels = function() {
		var selectedSize = $('#selProdSize').val();
		var selectedInseam = $('#selProdInseam').val();
		if(isInseamProduct == "true") {
			selectedSize = selectedSize + "=" + selectedInseam;
		}
		
		$.each(jsonProdSkus, function(idx, val) {
			var currentSize = val.size;
			if(currentSize == selectedSize) {
				$("ul#pInfo li.pSku span").html(val.prodCd);
				if(val.origAmt != val.salePrice)
					$("ul#pInfo li.pPrice").html("<span class='was'>" + val.origAmt + "</span> " + "<span class='Now'>" + val.salePrice + "</span>");
				else
					$("ul#pInfo li.pPrice").html(val.salePrice);
				return false;
			}
		});
	};
	
}( window.product = window.product || {}, jQuery ));

$(document).ready(function() {
	if (window.self != window.top)
		domContainer = "iframe";
	
	if(domContainer == "none" && breadCrumbSize > 1 && filterCurrentPage != "")
		product.updatePagerLinks();
	else
		$("#product-pager").hide();
	
	loadAndInitControls();
});

var addItem = function(addToWishList) {
	$('#pError').hide();

	//----- Validate fields -----
	var selectedSize = $('#selProdSize option:selected').val();
	var selectedInseam = $('#selProdInseam option:selected').val();
	
	if(selectedSize == "" || selectedSize == null) {
		$('#pError').html("Please select a valid size");
		$('#pError').slideToggle();
		return false;
	} else if(isInseamProduct == "true" && (selectedInseam == "" || selectedInseam == null)) {
		$('#pError').html("Please select a valid inseam");
		$('#pError').slideToggle();
		return false;
	}
	
	if(isInseamProduct == "true") {
        selectedSize = selectedSize + "=" + selectedInseam;
    }
	
	//----- Prepare data -----
	var dataString = $("form[name='frm_tr_product_add_to_bag_wishlist']").serialize();
	dataString += "&qty=1";
	var selectedPrdCd = "";
	var currPrdIdSkuId = "";
	$.each(jsonProdSkus, function(idx, data) {
		var currentSize = data.size;
		if(currentSize == selectedSize) {
			dataString += "&prdId=" + data.prodId + "&skuId=" + data.skuId;
			selectedPrdCd = data.prodCd;
			currPrdIdSkuId = data.prodId + "-" + data.skuId;
			return false;
		}
	});
	
	if(addToWishList) {
		dataString += "&bmSubmit=addToWishlist&addToWishlist=true";
		if(typeof(cmCreateElementTag) == "function" && isCoremetricsEnabled)
			cmCreateElementTag("ProductPage - addToWishlist", selectedPrdCd);
	} else {
		dataString += "&bmSubmit=addToBag&addToBag=true";
		if(typeof(cmCreateElementTag) == "function" && isCoremetricsEnabled)
			cmCreateElementTag("ProductPage - addToBag", selectedPrdCd);
	}

	$.ajax({
		url: "/torrid/trStore/ajax/addedToBagWishList.jsp",
		type: "POST",
		data: dataString,
		dataType: "json",
		async: false,
		cache: false,
		success: function(msg) {
			try {
				var dataRootDom;
				var lineItemDom;
				var slideDownContent;
				var slideUpTimeout;
				var targetRootDom;
				if(addToWishList) {
					dataRootDom = "div#wishlist div.WL_content";
					targetRootDom = "div.j_item";
					lineItemDom = "div.j_item_template";
					slideDownContent = "#wishlist"; 
					slideUpTimeout = 7000;
				} else {
					dataRootDom = "div#added_to_bag div.to_bag_content";
					targetRootDom = "div.just_added_items";
					lineItemDom = "div.j_item_template";
					slideDownContent = "#added_to_bag";
					slideUpTimeout = 10000;
				}
				
				var itemTemplate;
				if(domContainer == "iframe")
					itemTemplate = $(dataRootDom + " " + lineItemDom, window.parent.document).html();
				else
					itemTemplate = $(lineItemDom, dataRootDom).html();
				
				itemTemplate = utils.replaceAll(itemTemplate, "<!--", "");
				itemTemplate = utils.replaceAll(itemTemplate, "-->", "");
				var allItems = [];
				var firstItemTitle = "";
				var totalItems = 0;
				var allItemTotal = 0;
				var addedItemIdx = 0;
                var allItemQty = 0;
				var i=0;
				$.each(msg, function(idx, data) {
					if(firstItemTitle == "" && currPrdIdSkuId == (data.prodId + "-" + data.skuId)) {
						firstItemTitle = data.title;
						addedItemIdx = idx;
					}
					
					tHtml = itemTemplate;
					tHtml = utils.replaceAll(tHtml, "scene7ImgURL", s7RootURL+data.prodCd);
					tHtml = utils.replaceAll(tHtml, "webTitle", data.title);
					tHtml = utils.replaceAll(tHtml, "prdCode", data.prodCd);
					tHtml = utils.replaceAll(tHtml, "size", data.size);
					if(data.size != "") {
						tHtml = utils.replaceAll(tHtml, "inseam", data.inseam);
					}
					if(data.origAmt == data.salePrice) {
						tHtml = utils.replaceAll(tHtml, "origPrice", "");
					} else {
						tHtml = utils.replaceAll(tHtml, "origPrice", data.origAmt);
					}
					tHtml = utils.replaceAll(tHtml, "salePrice", data.salePrice);
					tHtml = utils.replaceAll(tHtml, "splNotes", data.specialNotes.join("<br>"));
					tHtml = utils.replaceAll(tHtml, "promoNotes", data.promoNotes.join("<br>"));
					if(data.lineTotal != null) {
						tHtml = utils.replaceAll(tHtml, "linePrice", data.lineTotal);
						allItemTotal = allItemTotal + parseFloat(data.lineTotal);
					}
                    allItemQty = allItemQty + parseInt(data.quantity,10);
					totalItems++; 
					allItems[i++] = tHtml;
				});
				if($("p#justAddedMsg", dataRootDom) || $("p#justAddedMsg", window.parent.document)) {
					var tMsg;
					if(domContainer == "iframe")
						tMsg = $(dataRootDom + " p#justAddedMsg", window.parent.document).html();
					else
						tMsg = $("p#justAddedMsg", dataRootDom).html();
					
					tMsg = utils.replaceAll(tMsg, "justAddedTitle", firstItemTitle);
					tMsg = utils.replaceAll(tMsg, "cartTotalItems", allItemQty);

					if(domContainer == "iframe")
						$(dataRootDom + " p#justAddedMsg", window.parent.document).html(tMsg);
					else
						$("p#justAddedMsg", dataRootDom).html(tMsg);
					
					var tmp
					if(domContainer == "iframe")
						tmp = $(dataRootDom + " p#justAddedMsg", window.parent.document).html().indexOf(" items");
					else
						tmp = $("p#justAddedMsg", dataRootDom).html().indexOf(" items");
					
					if(tmp > 0) {
						if(domContainer == "iframe") {
							var space = $(dataRootDom + " p#justAddedMsg", window.parent.document).html().slice(0,tmp).lastIndexOf(" ");
							var correctedMsg = $(dataRootDom+ " p#justAddedMsg", window.parent.document).html().slice(0,space) + " " + allItemQty + $(dataRootDom + " p#justAddedMsg", window.parent.document).html().slice(tmp);
							$(dataRootDom + " p#justAddedMsg", window.parent.document).html(correctedMsg);
						} else {
							var space = $("p#justAddedMsg", dataRootDom).html().slice(0,tmp).lastIndexOf(" ");
							var correctedMsg = $("p#justAddedMsg", dataRootDom).html().slice(0,space) + " " + allItemQty + $("p#justAddedMsg", dataRootDom).html().slice(tmp);
							$("p#justAddedMsg", dataRootDom).html(correctedMsg);
						}
					}
				}
	
				allItemTotal = allItemTotal.toFixed(2);
				if(allItemTotal > 0) {
					if(domContainer == "iframe")
						$(dataRootDom + " div.j_sub span.b", window.parent.document).html("$"+allItemTotal);
					else
						$("div.j_sub span.b", dataRootDom).html("$"+allItemTotal);
				}
				// Handle the foundation sku scenario
				if(addedItemIdx != 0) {
					var tmpCurrItem = allItems[addedItemIdx];
					allItems.splice(addedItemIdx, 1);
					allItems.unshift(tmpCurrItem);
				}
				
				if(domContainer == "iframe") {
					$(dataRootDom + " " + targetRootDom, window.parent.document).html(allItems.join(""));
					$("div.j_item div#notesDiv", window.parent.document).show();
				}
				else {
					$(targetRootDom, dataRootDom).html(allItems.join(""));
					$("div.j_item div#notesDiv", dataRootDom).show();
				}
				
				if(!addToWishList) {
					if(domContainer == "iframe") {
					    $('#varBag', window.parent.document).text(" (" + allItemQty + " items ) $"+allItemTotal);
					} else {
						$('#varBag').text("("+ allItemQty + " items) $"+allItemTotal);
					}
				}
				
				if(domContainer == "iframe") {
                    window.parent.completeAddToAction(slideDownContent, slideUpTimeout);
                } 
                else {
                    $(slideDownContent).slideDown(300);
                    window.setTimeout(function() {$(slideDownContent).slideUp(200)}, slideUpTimeout);
                    $.colorbox.close();
                    $("html, body").animate({ scrollTop: 0 }, 600);
                }
				
			} catch(err) {
				$('#pError').html("An unknown error occured while performing this action. Please try again later.");
				$('#pError').slideToggle();
			}
		},
		error: function(msgText) {
			var errDesc = "An unknown error occured while performing this action. Please try again later.";
			try {
				var msg = jQuery.parseJSON(msgText.responseText);
				$.each(msg, function(idx, data) {
					errDesc = data.errorDesc;
				});
			} catch(err) {}
			$('#pError').html(errDesc);
			$('#pError').slideToggle();
		}
	});
};

function loadAndInitControls() {
	product.loadSizeOptions();
	$('.jQProductZoom').jqzoom(prodZoomOptions);
	
	$("a.alt").click(function(e) {
        e.preventDefault();		
    });
	
	$(".alternates a.alt").css("opacity","0.4");
	$(".alternates a.alt:first").css("opacity","1");
	
	$(document.body).delegate('.alternates a.alt','hover',function(event){
            $('.mainimg a').attr("href", $(this).attr("href"));
			$('.mainimg a img.bigimage').attr("src", $(this).attr("rev"));
			$('.mainimg a').css("display", "block");
			$('.mainimg div').css("display", "block");
			if($('.mainimg video')) {
				$('.mainimg video').css("display", "none");				
				$('.mainimg .mejs-container').empty();
			}
			$(this).siblings(".alt").fadeTo(10, 0.4); 
			$('li.alternates a.playPvideo img').fadeTo(10, 0.4);
			$(this).fadeTo(10, 1.0);
			try {
				$('.jQProductZoom').data('jqzoom').swapimage($(this));
			} catch(e) {}
			$('div.zoomWindow').css("display", "none");
			$('div.zoomPup').css("display", "none");
    });
    
    // hide all unavailable thumbnails
	$('img.thumbs').error(function(){
	    $(this).hide(); 
		$(this).parent().remove();
	});
	$('img.thumbs').each(function() { this.src = this.src; });
	
	// video code
	if($("li.alternates a#videoLink.playPvideo")) {
		$("li.alternates a#videoLink.playPvideo").unbind("click");
		$("li.alternates a#videoLink.playPvideo").click(function(event) {
			if(swfobject.hasFlashPlayerVersion("0") && Modernizr.video === false){				
				event.preventDefault();				
				$.colorbox({height:160,width:400,html:"<br /><h3 class='block-title'>Oups! Can't Play Video?!</h3><p style='font-size:12px'>It look's like you don't have Adobe Flash Player installed. Get it now.</p><a href='http://get.adobe.com/flashplayer/' target='_blank'><img src='http://helpx.adobe.com/content/dam/help/images/get_adobe_flash_player.png' /></a>"});
						$('li.alternates a.playPvideo img').fadeTo(50, 0.4);
						$('.mainimg a').attr("href", $(".alternates a:first").attr('href'));			           	
			
			}
			else
			{
			event.preventDefault();
			var videolink = $(this).attr('href');	
			$('.mainimg a').css("display", "none");
		    $('.mainimg div').css("display", "none");
		    $('li.mainimg video').remove();
		    $('.mainimg .mejs-container').remove();
		    var begIdx = videolink.lastIndexOf("/");
		    var endIdx = videolink.lastIndexOf("-");
		    var selPrdCd = videolink.substring(begIdx+1, endIdx);
		    if(typeof(cmCreateElementTag) == "function" && isCoremetricsEnabled)
				cmCreateElementTag("ProductPage – viewVideo", selPrdCd);
		    $('li.mainimg').append("<video width='442' height='596' autoplay/>");
		    $('.mainimg video').css("display", "block");
		    $(".mainimg video").css("z-index","1000");
		    $(".mainimg video").attr("src", videolink);
		    $('li.alternates a.playPvideo img').fadeTo(50, 1);
			$('li.alternates a#videoLink.playPvideo').css("opacity","1");
			$(".alternates a.alt").css("opacity","0.4");			
			$(".mainimg video").mediaelementplayer({
				alwaysShowControls: false,
				iPadUseNativeControls: true,
				iPhoneUseNativeControls:true,
				AndroidUseNativeControls: true,
				alwaysShowHours: false,
				enableKeyboard: false,
				pauseOtherPlayers: true,
				success: function (YourMediaElement, domObject) { 			
					YourMediaElement.addEventListener('ended', function(e) {
						$('.mainimg .mejs-container').remove();
						$('li.alternates a.playPvideo img').fadeTo(50, 0.4);
						$('.mainimg a').attr("href", $(".alternates a:first").attr('href'));
			            $('.mainimg a img.bigimage').attr("src", $(".alternates a:first").attr("rev"));
			            $('.mainimg a').css("display", "block");
			            $('.mainimg div').css("display", "block");
						$('.mainimg video').css("display", "none");	
																																							            
			            try {
				            $('.jQProductZoom').data('jqzoom').swapimage($(".alternates a:first"));
				        } catch(e) {}
			            $('div.zoomWindow').css("display", "none");
						$('div.zoomPup').css("display", "none");
						$(".alternates a.alt:first").css("opacity","1");
					}, false);
						
					YourMediaElement.addEventListener('pause', function(e) {
						$('.mainimg .mejs-container').remove();
						$('.mainimg video').css("display", "none");
			            //$('.mainimg .mejs-container').css("display", "none");
						$('li.alternates a.playPvideo img').fadeTo(50, 0.4);
						$('.mainimg a').attr("href", $(".alternates a:first").attr('href'));
			            $('.mainimg a img.bigimage').attr("src", $(".alternates a:first").attr("rev"));
			            $('.mainimg a').css("display", "block");
			            $('.mainimg div').css("display", "block");
			            
						
			            try {
			            	$('.jQProductZoom').data('jqzoom').swapimage($(".alternates a:first"));
			            } catch(e) {}
			            $('div.zoomWindow').css("display", "none");
						$('div.zoomPup').css("display", "none");
						$(".alternates a.alt:first").css("opacity","1");
					}, false);
				}
		    });
		}}); 
	}
	
	if($("#tab_container"))
		$("#tab_container").tabify();
}
