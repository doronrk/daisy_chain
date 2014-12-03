$(document).ready(function() {
	'use strict';
	var submenuTab = $.cookie('cookieConsumerMenu'),
		isMobile = window.isMobile(),
		nonSEOProductId = $("#prdMdlCd").val().replace(/\//gi, "_"),
		listNavSelector = ".list-nav",
		// MANTIS-3510 :: NOTE: Don't remove this function as the height of the left scroll item varies from product to product
		setFooterOffsetHeight = function(){	// Calculate Offset Height of Footer for Scroll Nav Bar.
			var footerHeight = $("footer#footer").height(),
				lastElmtTagName = $("#inner-wrap #main .container-fluid.full-mobile > *:last-child").get(0).tagName,
				mainContPadBtm = parseInt($("#inner-wrap #main").css('padding-bottom').replace(/px/gi, ''), 10),
				mainContMrgBtm = parseInt($("#inner-wrap #main").css('margin-bottom').replace(/px/gi, ''), 10),
				mainContlastElmtPadBtm = parseInt($("#inner-wrap #main .container-fluid.full-mobile > *:last-child").css('padding-bottom').replace(/px/gi, ''), 10),
				mainContlastElmtMrgBtm = parseInt($("#inner-wrap #main .container-fluid.full-mobile > *:last-child").css('margin-bottom').replace(/px/gi, ''), 10),
				calculatedOffsetHeight;

			// Calculate the height of the last element other than script/link/style/meta tag
			if(lastElmtTagName && lastElmtTagName.toLowerCase() === "script" || lastElmtTagName.toLowerCase() === "link" || lastElmtTagName.toLowerCase() === "style" || lastElmtTagName.toLowerCase() === "meta"){
				for(var ind=($("#inner-wrap #main .container-fluid.full-mobile > *").length - 2); ind >= 0; ind--){
					var elemtObj = $("#inner-wrap #main .container-fluid.full-mobile > *").eq(ind),
						elemtTagName = elemtObj.get(0).tagName;

					if(elemtTagName.toLowerCase() !== "script" && elemtTagName.toLowerCase() !== "link" && elemtTagName.toLowerCase() !== "style" && elemtTagName.toLowerCase() !== "meta"){
						mainContlastElmtPadBtm = parseInt(elemtObj.css('padding-bottom').replace(/px/gi, ''), 10);
						mainContlastElmtMrgBtm = parseInt(elemtObj.css('margin-bottom').replace(/px/gi, ''), 10);
						break;
					}
				}
			}

			// Adding all the spacing height and footer height for calculating offset
			calculatedOffsetHeight = footerHeight + mainContPadBtm + mainContMrgBtm + mainContlastElmtPadBtm + mainContlastElmtMrgBtm + 20;

			//Set the Data for the DOM
			$("#outer-wrap "+ listNavSelector).data('offset-bottom', calculatedOffsetHeight);

			//Set the Attribute for the DOM
			$("#outer-wrap "+ listNavSelector).attr("data-offset-bottom", calculatedOffsetHeight);
		};
		
	$.removeCookie('cookieConsumerMenu', {
		path : '/',
		domain : 'samsung.com'
	});	

	smg.global.ShowMore.init({
		callback: tagShowMore
	});

	// IMPORTANT :: Initialize/Override(if data-offset-bottom attribute is already available) it before ScrollNavSpy init
	setFooterOffsetHeight(); // MANTIS-3510 :: NOTE: Don't remove this function as the height of the left scroll item varies from product to product

	smg.product.ScrollNavSpy.init({
		nav : listNavSelector
	});
	
	smg.product.ProductCarousel.init();
	smg.global.AccordionDropdown.init();
	smg.product.ProductImageHover.init();
	smg.global.MoveDom.init({
			'screen and (max-width:767px)' : {
				'.lockup-container' : {
					'match' : {
						action : 'appendTo',
						target : '#product-lockup-mobile'
					},
					'unmatch' : {
						action : 'appendTo',
						target : '#product-lockup-desktop'
					}
				},
				'.movedom-box' : {
					'match' : {
						action : 'insertBefore',
						target : '#compare'
					},
					'unmatch' : {
						action : 'insertBefore',
						target : '.movedom-question'
					}
				}
			}
	});
	
	$(".fancybox").fancybox({
		padding : 0,
		height: 540
	});
	
	$(".popup").click(function(e) {
		e.preventDefault();
		openPopup($(this).attr("href"));
	});
		
	$(".famliy-option a[data-modelCds]").bind("click", function() {
		if(!$(this).parent().hasClass("selected")) {
			var $container = $(this).closest(".customizations");
			var prdMdlCd = "";
			if($container.siblings().length > 0) {
				var selectedCds = $container.siblings().find(".selected a").data("modelcds");
				var currentCds = $(this).data("modelcds").split(",");
				for(var i = 0; i < currentCds.length; i++) {
					if(selectedCds.indexOf(currentCds[i]) > -1) {
						prdMdlCd = currentCds[i];
						break;
					}
				}
			} else {
				prdMdlCd = $(this).data("modelcds");
			}
			window.location.href = $("#productBaseUrl").val() + prdMdlCd;
		}
	});
		
	$("#compare .gotoCompare").bind("click", function() {
		$("#compareForm").submit();
	});	
		
	if(!isMobile) {
		
		if(parseInt($("#aboutSection").val()) > 4) {
			$("#more-features").show();
			$(".show-hide-features .button").html("See Less Features<i class='chevron-down inverted'></i>").data("expanded", "true");
		}
		setTimeout(function() {
			var offset = $("#about"+$("#aboutSection").val()+"").offset();
			if(offset == null){
				offset = 0;
			}
			$('html, body').animate({
			     scrollTop: offset
			}, 800, function() {
				$('[data-spy="scroll"]').each(function () {
				      var $spy = $(this).scrollspy('refresh');
				    });
			});
		}, 3000);
			
		$(".specs-data li h4 span, .span6 h3").hover(
			function() {
				$( this ).find(".tooltip").show();
			}, function() {
				$( this ).find(".tooltip").hide();
			}
		);
			
		smg.category.ProductAlignment.adjust({
			wrapper : "#accessories",
			numberEachRow: 4,
			twoColumnPotrait : false
		});
	} else {
		if($("#aboutSection").val() != "0") {
			if(parseInt($("#aboutSection").val()) > 4) {
				$("#more-features").show();
				$(".show-hide-features .button").html("See Less Features<i class='chevron-down inverted'></i>").data("expanded", "true");
			}

			$("#about .section-header").click();
			setTimeout(function() {
				$('html, body').animate({
				     scrollTop: $("#about"+$("#aboutSection").val()+"").offset().top - 80
				}, 800, function() {
					$('[data-spy="scroll"]').each(function () {
					      var $spy = $(this).scrollspy('refresh');
					    });
				});
			}, 1000);
		}
		$(".specs-data li h4 span, .span6 h3").hover(
			function() {
				$( this ).find(".tooltip").show();
			}, function() {
				$( this ).find(".tooltip").hide();
			}
		);
	}
		
	$.ajax({
		type : "POST",
		url : "/us/common/commonPopular.us",
		data : {
			prdMdlCd : $("#prdMdlCd").val(),
			prdIaCd : $("#prdIaCd").val(),
			url : window.location.href
		}
	});
		
	smg.global.richRelevance.load({
		isMobile : isMobile,
		pageType : "productDetail",
		categoryId : $("#prdIaCd").val(),
		prdMdlCd : $("#prdMdlCd").val(),
		timeOut: 5000,
		fallback : function() {
			$(".nav a[href='#compare']").parent().remove();
			loadEpp();
		}, 
		successCallback: loadEpp
	});
	
	$BV.configure("global", {
        submissionContainerUrl			: $("#productBaseUrl").val() + prdMdlCd + "-reviews?bvaction=writereview",
        submissionReturnUrl				: $("#productBaseUrl").val() + prdMdlCd,
        submissionContainerUrlParameters: "group=" + $("#strGroup").val() + "&type=" + $("#strType").val() + "&subtype=&model_cd=" + $("#prdMdlCd").val()
    });


	$BV.ui("rr", "show_summary", {
		subjectType				: "rating",
		productId 				: nonSEOProductId,
		submissionContainerDiv	: 'BVRRSecondarySummaryContainer',
		onEvent					: function(json){
			if(json && typeof(json.eventSource) === "string" && json.eventSource.toLowerCase() === "display"){
				if(window.location.hash == "#review") {
					submenuTab = "reviews";
				}
				
				if (!!submenuTab) {
					if(!isMobile) {
						setTimeout(function() {
							$("a[href='#" + submenuTab + "']").click();
						}, 500);
					} else {
						if(window.location.hash == "#review") {
							$("#reviews .section-header").click();
							setTimeout(function() {
								$('html, body').animate({
								     scrollTop: $("#reviews").offset().top
								}, 800, function() {
									$('[data-spy="scroll"]').each(function () {
									      var $spy = $(this).scrollspy('refresh');
									    });
								});
							}, 1000);
						}
						
					}
					
				}
			}
		}
	});	
	
	function loadEpp() {
		
		smg.global.digitalRiver.loadPrice({
			successCallback : function(priceList) {
				for ( var i = 0; i < priceList.length; i++) {
					var price = priceList[i].prdPriceInf;
					if(priceList[i].prdPromoPriceInf != "") {
						price = priceList[i].prdPromoPriceInf;
					} 
					$("#compare .product-module[data-eppMdlCd = '"
									+ priceList[i].prdMdlCd
									+ "'] .price").html(price);
					if(priceList[i].prdMdlCd == $("#prdMdlCd").val()) {
						if(!isMobile) {
							$(".floating-price").text(price);
						}
					}
				}
			},
			done :function(){
				/*Send price info to live person*/
				if(!smg.pageConfig){return;}
				var mdl_cd = smg.pageConfig.productInfo.Model_Code;
				if(mdl_cd){
					var priceModel = $('.product-module[data-eppmdlcd='+mdl_cd+']')[0];
					if(priceModel){
						lpAddVars('page','ProductNumber',mdl_cd); //Product Number 
						lpAddVars('page','RetaiPrice',$(priceModel).find('.suggested>.amount').text().replace('$','').replace(',',''));//Suggested Retail Price
						lpAddVars('page','Price',$(priceModel).find('.price>.amount').text().replace('$','').replace(',',''));//Price (Your Price)
						lpAddVars('page','Savings',$(priceModel).find('.savings>.amount').text().replace('$','').replace(',',''));//Savings (You Save)
						if($(priceModel).find('.shipping-text').html()){
						lpAddVars('page','FreeShipping',$(priceModel).find('.shipping-text').html().indexOf('Free Shipping')==-1?'no':'yes');//Free Shipping (pass Yes or No): 
						}
					}
				}
			}
		});
	}
	
	function tagShowMore(event) {
		var $button = $(event.currentTarget);
		var linkId = "";
		var linkCat = "";
		var linkName = "";
		var fireTag = false;
		if($button.data('scroll-target') == "#more-features") {
			linkId = "prod_" + $("#prdMdlCd").val() + "_morefeatures";
			linkCat = "features link";
			linkName = "see more features";
			fireTag = true;
		} else if($button.data('scroll-target') == "#key-specs") {
			linkId = "prod_" + $("#prdMdlCd").val() + "_seespecs";
			linkCat = "see specs";
			linkName = "see full specs";
			fireTag = true;
		} 
		
		if(fireTag) {
	    	utag.link({link_id: linkId, 
	    		link_cat: linkCat, 
	    		link_name: linkName
	    	});
	    }
	}
	
	
		var url = "http://support-us.samsung.com/cyber/mysamsung/product_warrantyinfo.jsp?ia_cd="+$("#prdIaCd").val()+"&model_cd="+$('#prdMdlCd').val()+"&model_name="+$('#prdMdlName').val();
		document.domain = "samsung.com";
		$("body").append('<iframe id="warranty-frame" width="200" height="200" src= "'+url+'" onload="displayWarranty(this)" style="display:none;"></iframe>');

		
		/*** MANTIS 4111 ENABLE NAV BUTTONS ON VIDEO IFRAME FOR MOBILE PDP ***/
		$("#slide-prev, #slide-next").hide();
		 $(".swiper-slide>div>iframe").ready(function(){
			setTimeout(function(){
				 $(".swiper-slide>div>iframe").parent().parent().addClass('videoSlide');
				}, 1000);
		});
		 if ($(".swiper-slide>p>object").hasClass('BrightcoveExperience')){
			if($("meta[device]").attr("device") == "mobile" || window.innerWidth < 769){
				setTimeout(function(){
					 $(".swiper-slide>p>object").parent().parent().addClass('videoSlide');
					}, 1000);
		 	}
		}
		$(document).on('mouseup touchend', function(){
				if($(".videoSlide").hasClass("swiper-slide-visible")==true){
					$("#slide-prev, #slide-next").show();
				}else{
					$("#slide-prev, #slide-next").hide();
				}
		});


});


var displayWarranty = function(obj){
	var text = $.trim($(obj).contents().find(".ft_red").text());
	if(text){
		var regex = /\d/g;
		if(regex.test(text)){
			var id = "prod_"+$('#prdMdlCd').val()+"_warranty"; 
			 $(".link a[data-link_id$='"+id+"']").parent().css({'display' : "block"});
		}
	}
};

/*fix for the brightcove html5 player issue
http://support.brightcove.com/en/video-cloud/docs/known-issues
If an HTML5 player is initially hidden...
Reload Iframe src when open the about section for the first time
*/
var brightcoveIframeReload = true;
$("#about .section-header").click(function(){
	if(isMobile && brightcoveIframeReload) {
	$("#about iframe").each(function(index, value) { 
		$(this).attr('src', $(this).attr('src'));
	});
	brightcoveIframeReload=false;
	}
});

