/* globals jQuery, Modernizr, enquire, smg */

/*!
* @file rich-relevance.js
* @class SMG Object Namespacing
* @author Jason Han
* @comment Only Page specific functions will be added here
* @copyright (c) Samsung SDS America Inc.
*/
smg.global.richRelevance = (function(window, document, $, undefined) {
	"use strict";

	var defaults = {
		isMobile : false,
		pageType : "category",
		categoryId : "",
		categoryName : "",
		prdMdlCd : "",
		tab: "recommended",
		fallback : function() {
			$("#page-loading-container").fadeOut(100);
		}, 
		successCallback: function() {
			console.log("RR callback");
		},
		timeOut: 3000
	}, rrStatus = 0, fallbackCalled = false, isMobile = false, isSamsungCate='Y' ;

	function load(opts) {
		var options = $.extend({}, defaults, opts);
		if (options.pageType != "category" && options.pageType != "home"
				&& options.pageType != "productDetail")
			return;
		
		var id =  $.cookie("RRSESSIONID");
		if(!id){
			var randomnumber=Math.random();
			var uniqueID = randomnumber*1000000000000000000;
			id = uniqueID;
			$.cookie("RRSESSIONID",id, { 
				 domain :'samsung.com',
				 path: '/'}
			 );	
		}
		 
		isMobile = options.isMobile;
		rrStatus = 0;
		fallbackCalled = false;
		window.R3_COMMON = new r3_common();
		R3_COMMON.setChannel('web');
		R3_COMMON.setApiKey("f20dc17e1482cd47");
		var env = "//recs.richrelevance.com/rrserver/";
		var hostName = location.hostname;
		if (hostName.indexOf('devus') != -1 || hostName.indexOf('devwww') != -1
				|| hostName.indexOf('dev') != -1
				|| hostName.indexOf('stgwww') != -1
				|| hostName.indexOf('stgapp') != -1
				|| hostName.indexOf('prod') != -1
				/*|| hostName.indexOf('stgweb') != -1*/
				|| hostName.indexOf('local') != -1) {
			env = "//integration.richrelevance.com/rrserver/";
		}
		R3_COMMON.setBaseUrl(window.location.protocol + env);
		R3_COMMON.setClickthruServer(window.location.protocol + "//"
				+ window.location.host);

		var session_id = id;

		R3_COMMON.setSessionId(session_id);
		var user_id = getCookie("prof_bpno_s");
		if (user_id == null || user_id == "")
			user_id = session_id;
		R3_COMMON.setUserId(user_id);

		if (options.pageType == "category") {
			loadRRCategoryPage(options.categoryId, options.categoryName, options.tab, options.successCallback);
			
		} else if (options.pageType == "productDetail") {
			loadRRDetailPage(options.categoryId, options.prdMdlCd, options.successCallback);
		}

		//console.log("Before r3(): " + new Date());
		r3();
		//sleep(3000);
		//console.log("After r3(): " + new Date());
		
		listenTimeout(options.fallback, options.tab == "recommended"? 10000: options.timeOut, options.tab);
	}
	
	function listenTimeout(fallback, timeOut,tab) {
		setTimeout(function(){
			//console.log("Exec timeout: " + new Date());
			if(rrStatus == 0) {
				fallbackCalled = true;
				if(fallback && typeof fallback === "function"){
					fallback();
					hideSpinner();
				}
			}
		}, timeOut);
	}

	function loadRRCategoryPage(categoryId, categoryName, tab, callback) {
		showSpinner();
		if(tab == "new") {
			R3_COMMON.addPlacementType('category_page.rr2');
		}else if(tab == "new-mobile"){
			R3_COMMON.addPlacementType('category_page.rr2');	
		}else if(tab == "recommended") {
			R3_COMMON.addPlacementType('category_page.rr1');
		} else if(tab == "special-offers") {
			R3_COMMON.addPlacementType('category_page.rr3');
		} else if(tab == "popular-accs") {
			R3_COMMON.addPlacementType('category_page.rr4');
		} 
		window.R3_CATEGORY = new r3_category();
		R3_CATEGORY.setId(categoryId);
		R3_CATEGORY.setName(categoryName);
		//console.log("Before jsonCallback: " + new Date());
		RR.jsonCallback = function() {
			//console.log("Receive jsonCallback: " + new Date());
			var data = RR.data.JSON.placements;
			if(fallbackCalled || data.length == 0)
				return;
			if(tab == "new") {
				renderCategoryProducts(data[0].items, "new-products", !isMobile, true,message);
			}else if(tab == "new-mobile") {
				renderCategoryProducts(data[0].items, "new-products-mobile", !isMobile, true,data[0].strat_message);
			}else if(tab == "recommended") {
				renderCategoryProducts(data[0].items, "recommended", !isMobile, true,data[0].strat_message);
			} else if(tab == "special-offers") {
				renderCategoryProducts(data[0].items, "special-offers", !isMobile, true,data[0].strat_message);
			} else if(tab == "popular-accs") {
				renderCategoryProducts(data[0].items, "popular-accessories", !isMobile, true,data[0].strat_message);
			} 
			hideSpinner();
			rrStatus = 1;
			if(callback && typeof callback === "function"){
				callback();
			}
		};
	}

	function loadRRDetailPage(categoryId, prdMdlCd, callback) {
		
			R3_COMMON.addPlacementType('item_page.rr1');
			R3_COMMON.addPlacementType('item_page.rr2');	
		R3_COMMON.addCategoryHintId(categoryId);
		window.R3_ITEM = new r3_item();
		R3_ITEM.setId(prdMdlCd);
		RR.jsonCallback = function() {
			if(fallbackCalled)
				return;
			var data = RR.data.JSON.placements;
				renderRecommendedProducts(data[0],"recommended");
				renderComparedProducts(data[1]);
			rrStatus = 1;
			if(callback && typeof callback === "function"){
				callback();
			}
		};
	}
	
	function renderCategoryProducts(products, tab, align, fromRR,message) {
		if(!!products) {
			var special = "false";
			var isProduct = "true";
			var comparable = "true";
			var sectionName = "new";
			if(tab == "special-offers") {
				special = "true";
				sectionName = "special-offers";
			} else if(tab == "popular-accessories") {
				isProduct = "false";
				comparable = "false";
				sectionName = "popular-accessories";
			} else if(tab == "recommended") {
				sectionName = "recommended";
			} else if(tab == "new-products-mobile") {
				sectionName = "new-products-mobile";
			}
			var $container = $("#" + tab);
			$container.data("loaded", "true");
			
			if($container.find(".text").length) {
				$container.find(".text").empty();
			} else {
				$container.prepend("<div class='text'></div>");
			}
			if(message){
				if($container.find("#recommended_text").length) {
					$container.find("#recommended_text").empty();
				} else {
					$container.prepend("<div id='recommended_text'></div>");
				}
				$container.find("#recommended_text").html("<h3 style='margin:0; padding: 0.5em 1.2em;'>"+_.unescape(message)+"</h3>");	
			}
			if(fromRR) {
				$container.find(".text").hide().html("Loaded from Rich Relevance");
			} else {
				$container.find(".text").hide().html("Loaded from database.");
			}
			$container.find(".row-fluid").empty();
			isSamsungCate = $("#prdIaSamsung").val();
			var looper = products.length <= 6? products.length: 6;
			for(var i = 0; i < looper; i++) {
				products[i].comparable = comparable;
				products[i].special = special;
				products[i].isProduct = isProduct;
				products[i].lazyLoad = isMobile? true: false;
				products[i].tagPrefix = "cat_" + $("#prdIaCd").val() + "_";
				products[i].prdIaCd = $("#prdIaCd").val();
				products[i].prdIaName = $("#typeEngName").val();
				products[i].sectionName = sectionName;
				products[i].fromRR = fromRR;
				if(fromRR){products[i].tagType=products[i].tagtype;}
				if(isSamsungCate == 'N'){
					products[i].hasMarketplaceLink = "false";
				}
				var ele = _.template($("#productTemplete").html(),{item: products[i]});
				$container.find(".row-fluid").append(ele);
			}
			
			setTimeout(function(){
				if(align) {
					smg.category.ProductAlignment.adjust({
						wrapper : $container
					});
				}
				smg.global.digitalRiver.loadPrice();
			},0);
		}
	}
	
	function renderRecommendedProducts(recommendedProducts,secName) {
		var sectionName= "#"+secName;
		if(!!recommendedProducts) {
			
			$(sectionName).show();
			$(sectionName).find(".section-content").prepend("<h3 style='margin:0; padding: 0.5em 1.2em;'>"+_.unescape(recommendedProducts.strat_message)+"</h3>");
			var looper = recommendedProducts.items.length > 4 ? 4: recommendedProducts.items.length;
			isSamsungCate = $("#prdIaSamsung").val();
			for(var i = 0; i < looper; i++) {
				recommendedProducts.items[i].lazyLoad = isMobile? true: false;
				recommendedProducts.items[i].tagPrefix = "prod_rec_";
				recommendedProducts.items[i].prdIaCd = $("#prdIaCd").val();
				recommendedProducts.items[i].prdIaName = $("#strType").val();
				recommendedProducts.items[i].sectionName = secName;
				recommendedProducts.items[i].fromRR = true;
				if(isSamsungCate == 'N'){
					recommendedProducts.items[i].hasMarketplaceLink = "false";
				}
				var ele = "<div class='span6'>" + _.template($("#productTemplete").html(),{item: recommendedProducts.items[i]}) + "</div>";
				$(sectionName).find(".section-content .row-fluid").append(ele);
			}
			if(!isMobile) {
				smg.category.ProductAlignment.adjust({
					wrapper : $(sectionName).find(".section-content .row-fluid"),
					numberEachRow: 4, 
					twoColumnPotrait : false
				});
			}
		}else {
			$(".nav a[href='"+sectionName+"']").parent().remove();
		}
	}
	
	function showSpinner() {
		$("#category-page-loading-container").fadeIn(100);
	}
	  
	function hideSpinner() {
		$("#category-page-loading-container").fadeOut(100);
	}
	
	function renderComparedProducts(compareProducts) {
		if(!!compareProducts) {
			$("#compare").show();
			for(var i = 0; i < compareProducts.items.length; i++) {
				compareProducts.items[i].tagPrefix = "prod_compare_";
				compareProducts.items[i].prdIaCd = $("#prdIaCd").val();
				compareProducts.items[i].prdIaName = $("#strType").val();
				compareProducts.items[i].lazyLoad = isMobile? true: false;
				var ele = _.template($("#compareTemplate").html(),{item: compareProducts.items[i]});
				$("#compare-carousel .swiper-wrapper").append(ele);
			}
			
			smg.product.CompareCarousel.init({
				success: function() {
					smg.category.ProductAlignment.adjustCompare();
				}
			});
			
		} else {
			$(".nav a[href='#compare']").parent().remove();
		}
	}

	return {
		load : load,
		render: renderCategoryProducts
	};

}(window, document, jQuery));