var couponExcluded = ["29536","31634","33259","34336","34789","35800","36086","36943","39164","39411","39729","73758","73554","13580","24949","64057","13565","63399","63414","63406","63407","63413","63412","85013","85016","85018","85015","85019","64057","73756","30012","63404","63401","19439","63400","60803","63405","63402","63408","31883","00681","51604","00685","36271","00754","31849","51866","00641","32165","00052","32196","39776","31633","00657","00655","00079","32192","51828","51224","51225","51223","51829","51585","39775","32183","39774","00659","32182","39222","00081","39562","39563","35586","39879","32175","31516","04776","63427","04592","83320","02766","63440","63441","87615","63434","63435","63436","BIRKENSTOCK","MERRELL"];
var bogoExcluded = 	 ["35687","35688","35689","39299","39300","39847","35913","35676","35675","36930","36950","00041","35921","35922","31420","31561","30206","30222","51640","39191","51641","70270","65091","40264","40262","30763","39411","34789","36943","34336","39164","33259","39729","50152","50142","50847","31634","36086","51779","51780","51781","30744","77127","65092","90305","40787","31725","51704","99115","99118","99119","70203","21442","52299","35952","35953","36543","36544","31883","00681","51604","00685","36271","00754","31849","51866","73758","73554","13580","24949","13565","63399","63414","63406","63407","63413","63412","85013","85016","85018","85015","85019","64057","73756","30012","63404","63401","19439","63400","60803","63405","63402","63408","00641","32165","00052","32196","39776","31633","00657","00655","00079","32192","51828","51224","51225","51223","51829","51585","39775","32183","39774","00659","32182","39222","00081","39562","39563","35586","39879","32175","31516","04776","63427","04592","83320","02766","63440","63441","87615","63434","63435","63436"];
var hidePrices = 	 ["39830","00403","00566","00582","00836","00841","00842","00869","00886","18399","18406","29536","31201","31211","31490","31495","31502","31509","31634","31946","32314","32624","32626","32629","32735","32743","32746","33259","34336","34639","34772","34779","34789","34792","34842","34852","35800","36086","36943","39164","39400","39411","39681","39729","39831","73758","73554","31335","31338","94792"];

// Nike Price Badge
var bogoDate = new Date();
// TEST CODES 
var inBogo = (bogoDate.getTime() >= 1416722400000 && bogoDate.getTime() <= 1417931999000) ? true : false;


var productExclusions = function(couponExclusions, bogoExclusions, priceCodes) {

	function arrayUnique(array) {
	    var a = array.concat();
	    for(var i=0; i<a.length; ++i) {
	        for(var j=i+1; j<a.length; ++j) {
	            if(a[i] === a[j])
	                a.splice(j--, 1);
	        }
	    }

	    return a;
	};

	// First combine and dedupe all codes so we only look through the DOM once.
	var codes = arrayUnique(couponExclusions.concat(bogoExclusions));
		codes = arrayUnique(codes.concat(priceCodes));

	// Identify where we are.
	var currentPage = {
	   isMobile: /mobile/i.test(document.body.className),
	   isResults: (/resultspage/i.test(document.body.className) || /results.aspx/i.test(document.location)),
	   isDetails: (/productdetailsPage/i.test(document.body.className) || /ProductDetail.aspx/i.test(document.location.href))
	};

	// Collect our messages.
	var messageText = {
	   price: 'Add to Cart for Price',
	   bogo: 'BOGO Excluded',
	   coupon: 'Coupon Excluded'
	};

	// Markup and style our messages (context appropriate)
	var markupOptions = {
	   desktop: {
	       results: {
	           styles: 'background:none; width:auto;height:auto; font-size:.8em;',
	           price: [
	               '<span style="font-weight:bold;color:#b90101;margin: 0.85em 0 .2em;display: block;font-size: 1.15em;">',
	               messageText.price,
	               '</span>'
	           ].join(''),
	           coupon: [
	               '<span style="background:white;display:block;font-size: .9em;font-weight: bold;color: #666;">',
	               messageText.coupon,
	               '</span>'
	           ].join(''),
	           bogo: [
	               '<span style="background:white;display:block;font-size: .9em;margin: 0;color: #666;">',
	               messageText.bogo,
	               '</span>'
	           ].join('')
	       },
	       details: {
	           styles: [].join(''),
	           price: [
	               '<span style="font-size: .65em; line-height: 1em; color: #343432;">',
	               messageText.price,
	               '</span>'
	           ].join(''),
	           coupon: [
	               '<span style="display:block;font-weight: bold; font-size:.5em;color: #666;line-height:1.25em; margin-top:.3em;">',
	               messageText.coupon,
	               '</span>'
	           ].join(''),
	           bogo: [
	               '<span style="display:block;font-weight: normal; font-size:.5em;color: #666;line-height:1.25em">',
	               messageText.bogo,
	               '</span>'
	           ].join('')
	       }
	   },
	   mobile: {
	       results: {
	           styles: [
	               '<style>',
	               '	.thumbnailContainer .itemList .items { height:16.6em; }',
	               '	@media screen and (min-width: 400px) {',
	               ' 		.thumbnailContainer .itemList .items { height:19em; } ',
	               '	}',
	               '</style>'
	           ].join(''),
	           price: [
	               '<span style="font-weight:bold;color:#b90101;margin: .5em 0 0;display: block; font-size:.9em;">',
	               messageText.price,
	               '</span>'
	           ].join(''),
	           coupon: [
	               '<span style="display:block;font-weight: bold; font-size:.75em;color: #666;line-height:1.25em; margin-top:.3em;">',
	               messageText.coupon,
	               '</span>'
	           ].join(''),
	           bogo: [
	               '<span style="display:block;font-weight: normal; font-size:.75em;color: #666;line-height:1.25em">',
	               messageText.bogo,
	               '</span>'
	           ].join('')
	       },
	       details: {
	           styles: [].join(''),
	           price: [
	               '<span class="price" style="font-size: 1.6em;margin-bottom: .1em;display: block;">',
	               messageText.price,
	               '</span>'
	           ].join(''),
	           coupon: [
	               '<span style="display:block;font-weight: bold; color: #666;line-height:1.25em; margin-top:.3em;">',
	               messageText.coupon,
	               '</span>'
	           ].join(''),
	           bogo: [
	               '<span style="display:block;font-weight: normal; font-size:.85em;color: #666;line-height:1.25em">',
	               messageText.bogo,
	               '</span>'
	           ].join('')
	       }
	   }
	}

	// find site type
	// find page type

	// For Details

		// Find ID of page
		// Test codes for page ID
		// Find Price
		// Replace Price

	// For Results

		// Loop through codes
		// Search page for product cells
		// Find element in product cells
		// Replace Element in product cells

	var operationHideNikePrice = {
	   mobile: {
	       results: function() {

	           // console.log("Is the mobile results page");

	           var couponMessage = markupOptions.mobile.results.coupon;
	           var bogoMessage = (inBogo) ? markupOptions.mobile.results.bogo : '';

	           // clean up product cell
	           var updateStyle = '';
	           $('.items').each(function(){
	           		var messagePlacement = '';
	           		var itemBrand = $(this).find('.productTitleList:first').text().split(' - ')[0];
	           		var itemID = $(this).find('a').first().attr('href').match(/p=([0-9a-z]+?)$/, 'i')[1];
	           		var itemSearch = new RegExp(itemBrand+'(,|$)|'+itemID+'(,|$)', 'i');
	           		var hidePrice = itemSearch.test(priceCodes);
					var couponExclude = itemSearch.test(couponExclusions);
					var bogoExclude = itemSearch.test(bogoExclusions);
					
					// console.log(itemSearch + ' => ' + " hidePrice: " + hidePrice + " couponExclude: " + couponExclude + " bogoExclude: " + bogoExclude);
	           		
	           		if(hidePrice) {
	           			// Replace Price
	           			$(this).find('.price').html(markupOptions.mobile.results.price);
	           			// Replace Original Price
	           			$(this).find('.saleTag').parent().text('');
	           		}

	           		if(couponExclude) {
	           			messagePlacement = messagePlacement + couponMessage;
	           		}

	           		if(bogoExclude) {
	           			messagePlacement = messagePlacement + bogoMessage;
	           		}

	           		if(bogoExclude || couponExclude){
	           			$(this).find('div').eq(2).html(messagePlacement);
	           		}

	           		if(bogoExclude || couponExclude || hidePrice) {
				        updateStyle = markupOptions.mobile.results.styles;
				    }
	           });
	           if (updateStyle) {
	               $('head').append(updateStyle);
	           }
	       },
	       details: function() {
				var couponMessage = markupOptions.mobile.details.coupon;
				var bogoMessage = (inBogo) ? markupOptions.mobile.details.bogo : '';
				var hidePriceMessage = markupOptions.mobile.details.price;

				var itemBrand = s.prop9;
				var itemID = s.products.split(';')[1];
				var itemSearch = new RegExp(itemBrand+'(,|$)|'+itemID+'(,|$)', 'i');
				var hidePrice = itemSearch.test(priceCodes);
				var couponExclude = itemSearch.test(couponExclusions);
				var bogoExclude = itemSearch.test(bogoExclusions);

				// console.log(itemSearch + ' => ' + " hidePrice: " + hidePrice + " couponExclude: " + couponExclude + " bogoExclude: " + bogoExclude);

				var messagePlacement = '';

				// // In order for us to inject on mobile we have to catch the page-scrape prior to placement.
				// window.productDetailsPrice = '<span class="price">{{price}}</span>';

				if(couponExclude) {
					messagePlacement = couponMessage + messagePlacement;
				}

				if(bogoExclude) {
					messagePlacement = bogoMessage + messagePlacement;
				}

				if(hidePrice) {
					messagePlacement = hidePriceMessage + messagePlacement;
	            } else if(!hidePrice && !$('#productIdentity').length) {
	            	messagePlacement = '<span class="price">{{price}}</span>{{originalPrice}}' + messagePlacement;
	            } 

	            if($('#productIdentity').length > 0) {
	            	if(hidePrice){
	            		$('#productIdentity .prices').html(messagePlacement);
	            	} else {
	            		$('#productIdentity .prices').append(messagePlacement);
	            	}
	            } else {
		            window.productDetailsPrice = messagePlacement;
	            }
	       }
	   },
	   desktop: {
	       results: function() {

	       	// priceCodes couponExclusions bogoExclusions

	           // console.log(messagePlacement);
	           var couponMessage = markupOptions.desktop.results.coupon;
	           var bogoMessage = (inBogo) ? markupOptions.desktop.results.bogo : '';

	           $('.productCell').each(function(){
		           	var itemBrand = $(this).find('.brand').text().replace(/^[\s]+?([\S])/i, '$1');
					var itemID = $(this).attr('id').replace(/^p-/, '');
					var itemSearch = new RegExp(itemBrand+'(,|$)|'+itemID+'(,|$)', 'i');
					var hidePrice = itemSearch.test(priceCodes);
					var couponExclude = itemSearch.test(couponExclusions);
					var bogoExclude = itemSearch.test(bogoExclusions);
					// console.log(itemSearch + ' => ' + " hidePrice: " + hidePrice + " couponExclude: " + couponExclude + " bogoExclude: " + bogoExclude);

					var messagePlacement = '';
					if(couponExclude) {
						messagePlacement = messagePlacement + couponMessage;
					}

					if(bogoExclude) {
						messagePlacement = messagePlacement + bogoMessage;
					}

					if(hidePrice) {
						var hiderSelector = ($(this).hasClass('s-sale')) ? '.productImage > .badge, .offerDetails > .percentOff' : '.offerDetails > .percentOff';
						$(this).find('.price').html(markupOptions.desktop.results.price);
						$(this).find(hiderSelector).hide();
					}
					$(this).find('.badge:last').html(messagePlacement);

	           });

	       },
	       details: function() {
				var itemBrand = s.prop9;
				var itemID = $('#shoesItem').find('.SKUtxt').text().replace(/[^0-9]?/g, '');
				var itemSearch = new RegExp(itemBrand+'(,|$)|'+itemID+'(,|$)', 'i');
				var hidePrice = itemSearch.test(priceCodes);
				var couponExclude = itemSearch.test(couponExclusions);
				var bogoExclude = itemSearch.test(bogoExclusions);
				
				// console.log(itemSearch + ' => ' + " hidePrice: " + hidePrice + " couponExclude: " + couponExclude + " bogoExclude: " + bogoExclude);


	           // console.log("Is the desktop details page");
				var placement = $('.style-price').find('.price');
				var currentCode = $('#shoesItem').find('.SKUtxt').text().replace(/[^0-9]?/g, '');
				var messagePlacement = '';
				var couponMessage = markupOptions.desktop.details.coupon;
				var bogoMessage = (inBogo) ? markupOptions.desktop.details.bogo : '';

	           // console.log('the current code is ' + currentCode)

				if(couponExclude) {
					messagePlacement = messagePlacement + couponMessage;
				}
				if(bogoExclude) {
					messagePlacement = messagePlacement + bogoMessage;
				}
				if(hidePrice) {
					placement.html(markupOptions.desktop.details.price);
					$('.salesTagWrap, .origPrice, .style-price .note').hide();
				}
				
				placement.append(messagePlacement);

	       }
	   }
	};


	// Execute appropriate function based on page type.
	if (currentPage.isDetails) {
	   if (currentPage.isMobile) {
	   		operationHideNikePrice.mobile.details();
	   } else {
	       operationHideNikePrice.desktop.details();
	   }
	} else if (currentPage.isResults) {
	   if (currentPage.isMobile) {
	       operationHideNikePrice.mobile.results();
	   } else {
	       operationHideNikePrice.desktop.results();
	   }
	}


   // console.log(currentPage);
};


productExclusions(couponExcluded, bogoExcluded, hidePrices);

