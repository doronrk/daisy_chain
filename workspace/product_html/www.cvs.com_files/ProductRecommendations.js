// Functions below are called on the page to populate the recommendations
function PDPZ1_zp(rec_product_ids, zone, symbolic, target_id, target_category, rec_attributes, target_attributes, target_header_txt, ab_test_id, rec_category_ids) {
    var lines = zonePopulationFunction(zone, rec_attributes);
    var div_id = 'rec_zone_vert';
    if (lines.length > 0) {
    	var html = '<div id="nav_container"><div class="rr_stratmsg_vertical">' + target_header_txt + '<\/div><div id="' + div_id + '_prev_nav">&#9650;</div><div id="nav"><ul>' + lines.join("\n") + '<\/ul></div><div id="' + div_id + '_next_nav">&#9660;</div></div>';
    	$('#' + div_id).html(html).css('display', 'block');
    	$('#container').css('width', '1045px').css('margin-top', '20px');
    	$('#ptp-area').css('padding', '0');
    }
    scrollRecVert(4);
    displayQuickViewBtn();
}

function PDPZ2_zp(rec_product_ids, zone, symbolic, target_id, target_category, rec_attributes, target_attributes, target_header_txt, ab_test_id, rec_category_ids) {
	var lines = zonePopulationFunction(zone, rec_attributes);
	var div_id = 'rec_zone_horz';
	if (lines.length > 0) {
		var html = '<div id="nav_container"><div class="rr_stratmsg_vertical">' + target_header_txt + '<\/div><div id="' + div_id + '_next_nav">&#9654;</div><div id="' + div_id + '_prev_nav">&#9664;</div><div id="nav"><ul>' + lines.join("\n") + '<\/ul></div></div>';
		$('#' + div_id).html(html).css('display', 'block');
	}
	moveRecentlyViewed();
    scrollRecHorz(5);
    displayQuickViewBtn();
}

function SRPZ1_zp(rec_product_ids, zone, symbolic, target_id, target_category, rec_attributes, target_attributes, target_header_txt, ab_test_id, rec_category_ids) {
	if(symbolic == '_MPC_'){
		var lines = zonePopulationFunction(zone, rec_attributes);
		var div_id = 'rec_zone_horz';
		if (lines.length > 0) {
			var html = '<div id="nav_container"><div class="rr_stratmsg_vertical">' + target_header_txt + '<\/div><div id="' + div_id + '_next_nav">&#9654;</div><div id="' + div_id + '_prev_nav">&#9664;</div><div id="nav"><ul>' + lines.join("\n") + '<\/ul></div></div>';
			$('#' + div_id).html(html).css('display', 'block');
		}
	    scrollRecHorz(5);
	    displayQuickViewBtn();
	}
}

function ACMZ1_zp(rec_product_ids, zone, symbolic, target_id, target_category, rec_attributes, target_attributes, target_header_txt, ab_test_id, rec_category_ids) {
	var lines = zonePopulationFunction(zone, rec_attributes);
	var div_id = 'rec_zone_horz_acm';
	if (lines.length > 0) {
		var html = '<div id="nav_container"><div class="rr_stratmsg_vertical">' + target_header_txt + '<\/div><div id="prev_nav_acm">&#9664;</div><div id="nav_acm"><ul>' + lines.join("\n") + '<\/ul></div><div id="next_nav_acm">&#9654;</div></div>';
		$('#' + div_id).html(html).css('display', 'block');
	}
    scrollRecHorzACM(4);
    DillardsModal.sizeModal($('#added-to-bag-modal'));
}

function SCPZ1_zp(rec_product_ids, zone, symbolic, target_id, target_category, rec_attributes, target_attributes, target_header_txt, ab_test_id, rec_category_ids) {
	var lines = zonePopulationFunction(zone, rec_attributes);
	var div_id = 'rec_zone_vert_5';
	if (lines.length > 0) {
		var html = '<div id="nav_container"><div class="rr_stratmsg_vertical">' + target_header_txt + '<\/div><div id="' + div_id + '_prev_nav">&#9650;</div><div id="nav"><ul>' + lines.join("\n") + '<\/ul></div><div id="' + div_id + '_next_nav">&#9660;</div></div>';
		$('#' + div_id).html(html).css('display', 'block');
		$('#container').css('width', '1045px').css('margin-top', '20px');
		$('#ptp-area').css('padding', '0');
	}
    scrollRecVert(5);
}

function JFYZ1_zp(rec_product_ids, zone, symbolic, target_id, target_category, rec_attributes, target_attributes, target_header_txt, ab_test_id, rec_category_ids) {
	var linesLeft = zonePopulationFunction(zone, rec_attributes.slice(0,rec_attributes.length-2));
	var linesRight = zonePopulationFunction(zone, rec_attributes.slice(2,rec_attributes.length));
	div_id = 'rec_zone_horz';
	if(linesLeft.length > 1 && linesRight.length > 1){
		$('#justForYouRecommendations').html('<div class="bloc_1_edito leftOfStatic" id="rec_zone_horz"></div><div class="recommendationStaticCenter"><img src="/images/justforyou.png"></div><div class="bloc_1_edito rightOfStatic" id="rec_zone_horz"></div>');
			var html = '<div id="nav_container"><div id="' + div_id + '_prev_nav">&#9664;</div><div id="nav"><ul>' + linesLeft.join("\n") + '<\/ul></div></div>';
			$('.leftOfStatic').html(html).css('display','inline-block');
			html = '<div id="nav_container"><div id="' + div_id + '_next_nav">&#9654;</div><div id="nav"><ul>' +linesRight.join("\n") + '<\/ul></div></div>';
			
			$('.recommendationStaticCenter').css('display','inline-block');
			$('.rightOfStatic').html(html).css('display','inline-block');
	    scrollRecHorz(4);
	}
}

zonePopulationFunction = function (zone, rec_attributes){
	var lines = [];
	if(rec_attributes.length > 0){
		for (var product = 0; product < rec_attributes.length; product++) {
			if (!isInternational || rec_attributes[product][8] === "true") {
				var product_description = rec_attributes[product][0].split(/[\u0250-\ue007]/g).join('').split("\uFFFD").join(''),
					product_url = rec_attributes[product][1] + '?categoryId=' + zone,
					image_url = rec_attributes[product][2];
					price_min = rec_attributes[product][6],
					price_max = rec_attributes[product][7],
					catentryId = rec_attributes[product][9];

				if (price_min != "0") {
					lines.push('<li>');
					if(rec_attributes[product][4] != 'CHNL'){
						lines.push('<div class="rec-quick-view"><a href="javascript:void(0);" onclick="callQuickView(' + catentryId + ',\'' + zone + '\')" class="quick-view btn btn-3d btn-quick-view quick-view-to-hide">Quick View</a></div>');
					}
					lines.push('<A HREF="' + product_url + '"><IMG class="recProdImg" SRC="' + image_url + '?$RRthumb$" ALT="' + product_description + '"/>');
					lines.push('<div class="recProdDesc">' + product_description + '</div>');
					if (!isInternational)
						lines.push(getPriceDiv(price_min, price_max));
					lines.push(getStarsDiv(rec_attributes[product][3]));
					lines.push('</a><\/li>');
				}
			}
		}
	}
	return lines;
};

//Helper functions used to create recommendations
displayQuickViewBtn = function() {
	if (!is_touch_device() && !$(".errorimage").length) {//no QV if a touch device or an error page
		$('#nav li, #nav_acm li').hover(function() {
	        var $div = $('.rec-quick-view').eq($(this).index('#nav li, #nav_acm li'));
	        $div.show();
	        var $img = $('.recProdImg img').eq($(this).index('#nav li, #nav_acm li'));
	        $img.addClass('keepOpacity');
	    },
	    function() {
	    	var $div = $('.rec-quick-view').eq($(this).index('#nav li, #nav_acm li'));
	    	$div.hide();
	    	var $img = $('.recProdImg img').eq($(this).index('#nav li, #nav_acm li'));
	        $img.removeClass('keepOpacity');
	    });
	}
};

getStarsDiv = function(stars){
	if (stars) return '<div class="pr-stars pr-stars-small pr-stars-' + stars.replace('.', '_') + '-sm"><\/div>';
	return '<div style="height: 16px">&nbsp;</div>';
};

getPriceDiv = function(price_min, price_max){
	var price = '<div class="recProdPrice"><b>';
	if (price_min === price_max)
		price += formatPrice(price_max);
	else
		price += formatPrice(price_min) + ' - ' + formatPrice(price_max);
	return price += '<\/b></div>';
};

formatPrice = function(price) {
    var formattedPrice = '$' + price;
    if (price.indexOf('.') > -1) {
        if (price.split('.')[1].length == 1) 
        	formattedPrice += '0';
    } else {
        formattedPrice += '.00';
    }
    return convertDisplayString(formattedPrice);
};

getCategoriesFromDescription = function(catEntryIds) {
    var descriptions = $("input[name^='description']"),
        categoryIds = '',
        splitCatEntryIDs = catEntryIds.split('|');
    for (var i = 0; i < descriptions.length; i++){
        for (var j = 0; j < splitCatEntryIDs.length; j++) {
            if (descriptions[i].value && descriptions[i].value.split('|')[1] == splitCatEntryIDs[j]) {
                if (categoryIds != '' && categoryIds.indexOf(descriptions[i].value.split('|')[0], 0) < 0)
                    categoryIds = categoryIds + '|' + descriptions[i].value.split('|')[2];
                else
                    categoryIds = descriptions[i].value.split("|")[2];
            }
        }
    }
    return categoryIds;
};

getPartNumbersFromDescription = function(catEntryIds) {
    var descriptions = $("input[name^='description']"),
        partNumbers = "",
        splitCatEntryIDs = catEntryIds.split("|");
    for (var i = 0; i < descriptions.length; i++) {
        for (var j = 0; j < splitCatEntryIDs.length; j++) {
            if (descriptions[i].value && descriptions[i].value.split("|")[1] == splitCatEntryIDs[j]) {
                if (partNumbers != "" && partNumbers.indexOf(descriptions[i].value.split('|')[0], 0) < 0)
                    partNumbers = partNumbers + "|" + descriptions[i].value.split('|')[0];
                else
                    partNumbers = descriptions[i].value.split("|")[0];
            }
        }
    }
    return partNumbers;
};

//Scroller and arrow functions
scrollRecVert = function(visibleAmount) {
	var recCount = $('div[id^="rec_zone_vert"] ul li').length - visibleAmount,
	recCheck = recCount;
	$('#rec_zone_vert_prev_nav,#rec_zone_vert_5_prev_nav').css('color','#fff');
    $('#rec_zone_vert_next_nav,#rec_zone_vert_5_next_nav').click(function () {
    	if(recCheck > 0){
    		$('#rec_zone_vert_prev_nav,#rec_zone_vert_5_prev_nav').css('color','#000');
	        $('div[id^="rec_zone_vert"] #nav').animate({
	        	scrollTop: '+='  + ($('div[id^="rec_zone_vert"] #nav li').outerHeight()+4) + 'px'
	        });
	        recCheck--;
    	}
    	if(recCheck == 0) $('#rec_zone_vert_next_nav,#rec_zone_vert_5_next_nav').css('color','#fff');
    });
    if(recCheck  < 1)
    	$('#rec_zone_vert_next_nav').hide();
    $('#rec_zone_vert_prev_nav,#rec_zone_vert_5_prev_nav').click(function () {
    	if(recCheck != recCount){
    		$('#rec_zone_vert_next_nav,#rec_zone_vert_5_next_nav').css('color','#000');
	        $('div[id^="rec_zone_vert"] #nav').animate({
	            scrollTop: '-=' + ($('div[id^="rec_zone_vert"] #nav li').outerHeight()+4) + 'px'
	        });
	        recCheck++;
    	}
    	if(recCheck == recCount) $('#rec_zone_vert_prev_nav,#rec_zone_vert_5_prev_nav').css('color','#fff');
    });
};

scrollRecHorz = function(visibleAmount) {
	var recCount = ($('#rec_zone_horz:eq(0) li').length) - visibleAmount,
	recCheck = recCount;
	$('#rec_zone_horz_prev_nav').hide();
    $('#rec_zone_horz_next_nav').click(function () {
    	if (recCheck > 0){
    		$('#rec_zone_horz_prev_nav').fadeIn('fast');
	        $("#rec_zone_horz #nav").animate({
	            scrollLeft: '+='  + ($('#rec_zone_horz li').first().outerWidth() + 4) + 'px'
	        });
	        recCheck--;
    	}
    	if(recCheck == 0) $('#rec_zone_horz_next_nav').fadeOut('fast');
    });
    if(recCheck  < 1)
    	$('#rec_zone_horz_next_nav').hide();
    $('#rec_zone_horz_prev_nav').click(function () {
    	if(recCheck != recCount){
    		$('#rec_zone_horz_next_nav').fadeIn('fast');
    		$("#rec_zone_horz #nav").animate({
    			scrollLeft: '-=' + ($('#rec_zone_horz li').first().outerWidth() + 4) + 'px'
    		});
    		recCheck++;
    	}
    	if(recCheck == recCount) $('#rec_zone_horz_prev_nav').fadeOut('fast');
    });
};

scrollRecHorzACM = function(visibleAmount) {
	var recCount = ($('#rec_zone_horz_acm li').length) - visibleAmount,
		recCheck = recCount;
	$('#prev_nav_acm').hide();
	$('#next_nav_acm').click(function () {
		if (recCheck > 0){
			$('#prev_nav_acm').fadeIn('fast');
	        $("#nav_acm ul").animate({
	            scrollLeft: '+=132px'
	        });
	        recCheck--;
		}
		if(recCheck == 0) $('#next_nav_acm').fadeOut('fast');
	});
	if(recCheck  < 1)
    	$('#next_nav_acm').hide();
	$('#prev_nav_acm').click(function () {
		if(recCheck != recCount){
			$('#next_nav_acm').fadeIn('fast');
			$("#nav_acm ul").animate({
	        	scrollLeft: '-=132px'
	    	});
	    	recCheck++;
		}
		if(recCheck == recCount) $('#prev_nav_acm').fadeOut('fast');
	});
};

function is_touch_device(){
	try{document.createEvent("TouchEvent");return true;}
	catch(e){return false;}
}

function moveRecentlyViewed(){
	$('#rec_zone_horz').prependTo('#additional-info'); 
}