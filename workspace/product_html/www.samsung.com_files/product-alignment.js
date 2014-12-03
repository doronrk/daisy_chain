/* globals jQuery, Modernizr, enquire, smg */
/*!
 * @file product-alignment.js
 * @class SMG Object Namespacing
 * @author Jason Han
 * @comment Only Page specific functions will be added here
 * @copyright (c) Samsung SDS America Inc.
 */
var smg = smg || {};
/*
 * ! @parent SMG Object Namespacing @parent Accessories @object p @description
 * Object for product alignment
 */
smg.category.ProductAlignment = (function($, window, document) {
	var defaults = {
		wrapper : document,
		numberEachRow: 3, 
		twoColumnPotrait : true
	}, LOOP_COUNT = 0, $SELECTOR = "", ORIGINAL_NUMBER_EACH_ROW = 3, NUMBER_EACH_ROW = 3, TWO_COLUMN_POTRAIT = true;
	var MEDIA_QUERY_1 = 'screen and (max-width: 850px) and (min-width: 768px)',
    MEDIA_HANDLER_1 = {
      'match': setTwoColumState,
      'unmatch': setRegularState,
      'setup': setInitialState,
      deferSetup : false
    };

	function adjust(opts) {
		options = $.extend({}, defaults, opts);
		NUMBER_EACH_ROW = options.numberEachRow;
		ORIGINAL_NUMBER_EACH_ROW = options.numberEachRow;
		if(!!$(options.wrapper).data("number_each_row")){//adjust number each row with data
			ORIGINAL_NUMBER_EACH_ROW = parseInt($(options.wrapper).data("number_each_row"));}
		TWO_COLUMN_POTRAIT = options.twoColumnPotrait;
		$SELECTOR = $(options.wrapper).find(".product-module");
		enquire.register(MEDIA_QUERY_1, MEDIA_HANDLER_1);
	}
	
	function makeAdjustment() {
		LOOP_COUNT = parseInt($SELECTOR.length / NUMBER_EACH_ROW);
		if ($SELECTOR.length % NUMBER_EACH_ROW > 0)
			LOOP_COUNT++;
		for ( var i = 0; i < LOOP_COUNT; i++) {
			var start = i * NUMBER_EACH_ROW;
			var end = (i + 1) * NUMBER_EACH_ROW;
			if (i == (LOOP_COUNT - 1)) {
				end = $SELECTOR.length;
			}
			var titleHeight = 0;
			var familyHeight = 0;
			var ratingHeight = 0;
			var featureHeight = 0;
			var priceHeight = 0;
			var priceDescHeight = 0;
			$SELECTOR.slice(start, end).each(function() {
				var height = $(this).find(".product-title").height();
				if (height > titleHeight)
					titleHeight = height;
				height = $(this).find(".famliy-option").height();
				if (height > familyHeight)
					familyHeight = height;
				height = $(this).find(".rating").height();
				if (height > ratingHeight)
					ratingHeight = height;
				height = $(this).find(".bullets").height();
				if (height > featureHeight)
					featureHeight = height;
				height = $(this).find(".price-module").height();
				if (height > priceHeight)
					priceHeight = height;
				height = $(this).find(".price-desc").height();
				if (height > priceDescHeight)
					priceDescHeight = height;
			});
			$SELECTOR.slice(start, end).each(function() {
				// plus 1 because somehow firefox & ie is missing 1px
				$(this).find(".product-title").css("min-height", (titleHeight + 1));
				$(this).find(".famliy-option").css("min-height", (familyHeight + 1));
				$(this).find(".rating").css("min-height", (ratingHeight + 1));
				$(this).find(".bullets").css("min-height", (featureHeight + 1));
				$(this).find(".price-module").css("min-height", (priceHeight + 1));
				$(this).find(".price-desc").css("min-height", (priceDescHeight + 1));
			});
		}
	}
	
	function adjustCompare() {
		var titleHeight = 0;
		var reviewHeight = 0;
		var eCommHeight = 0;
		var dlHeight = new Array();
		$(".compare-container .product").each(function() {
			var height = $(this).find(".product-title").height();
			if (height > titleHeight)
				titleHeight = height;
			height = $(this).find(".rating-module").height();
			if (height > reviewHeight)
				reviewHeight = height;
			height = $(this).find(".shop-info").height();
			if (height > eCommHeight)
				eCommHeight = height;
			
			$(this).find("dl").children().each(function(index) {
				height = $(this)[0].scrollHeight;
				if(!!dlHeight[parseInt(index / 2)]) {
					if(height > dlHeight[parseInt(index / 2)])
						dlHeight[parseInt(index / 2)] = height;
				} else {
					dlHeight[parseInt(index / 2)] = height;
				}
			});
		});
		
		$(".compare-container .product").each(function() {
			$(this).find(".product-title").css("min-height", titleHeight);
			$(this).find(".rating-module").css("min-height", reviewHeight);
			$(this).find(".shop-info").css("min-height", eCommHeight);
			$(this).find("dl").children().each(function(index) {
				if(!!dlHeight[parseInt(index / 2)]) {
					$(this).css("min-height", dlHeight[parseInt(index / 2)]);
				}
			});
		});
		
		$(".compare-container").find(".swiper-slide").css("height", "auto");
	}
	
	 function setInitialState() {
		 if (!Modernizr.mq(MEDIA_QUERY_1)) {
			 setRegularState();
		 }
	 }
	
	function clean(opts) {
		options = $.extend({}, defaults, opts);
		$SELECTOR = $(options.wrapper).find(".product-module");
		$SELECTOR.each(function() {
			$(this).find(".product-title").removeAttr("style");
			$(this).find(".famliy-option").removeAttr("style");
			$(this).find(".price-module").removeAttr("style");
			$(this).find(".bullets").removeAttr("style");
		});
	}
	
	function setRegularState() {
		NUMBER_EACH_ROW = ORIGINAL_NUMBER_EACH_ROW;
		makeAdjustment();
	}
	
	function setTwoColumState() {
		if(TWO_COLUMN_POTRAIT) {
			NUMBER_EACH_ROW = 2;
		} else {
			NUMBER_EACH_ROW = ORIGINAL_NUMBER_EACH_ROW;
		}
		makeAdjustment();
	}

	return {
		adjust : adjust,
		adjustCompare : adjustCompare,
		clean : clean
	};
})(jQuery, window, document);