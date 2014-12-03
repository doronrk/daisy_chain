var csRelCal = {
	calendar : new Object(),
	curMonth : 0,
	jsonURL : '/ns/common/champssports/js/cs-relcal-json.js?cd=0',
	monthNames : ['January','February','March','April','May','June','July','August','September','October','November','December'],
	serverTime : new Array(),

	init : function() {
		$.ajax({
			url: csRelCal.jsonURL,
			async: false,
			dataType: 'json',
			success: function(data) {
				csRelCal.calendar = data;
				csRelCal.loadCalendar();
				$('#relcal-footer .first-month').text(csRelCal.monthNames[parseInt(csRelCal.calendar.date[0].month)-1]+' '+csRelCal.calendar.date[0].day);
				$('#relcal-footer .last-month').text(csRelCal.monthNames[parseInt(csRelCal.calendar.date[csRelCal.calendar.date.length-1].month)-1]+' '+csRelCal.calendar.date[csRelCal.calendar.date.length-1].day);
				csRelCal.scrollToMonth();
			},
			error: function(e) {
				console.log(e);
			}
		});
	},

	checkDaysOut : function(year, month, day) {
		var oneDay = 24*60*60*1000;	// hours*minutes*seconds*milliseconds
		var launchDay = new Date(year,(month-1),day);
		var today = new Date();
		var daysOut = (launchDay.getTime() - today.getTime())/(oneDay);
		return daysOut;
	},

	checkMonthSwitch : function() {
		for(var i = csRelCal.calendar.date.length-1; i >= 0; i--) {
			if($('.relcal-prod li').eq(i).offset().left <= $(window).width()/2) {
				if(csRelCal.curMonth != parseInt(csRelCal.calendar.date[i].month)) {
					csRelCal.curMonth = parseInt(csRelCal.calendar.date[i].month);
					$('.relcal-header .month-name').text(csRelCal.monthNames[parseInt(csRelCal.calendar.date[i].month)-1]+' '+csRelCal.calendar.date[i].year);
				}
				break;
			}
		}
		if(csRelCal.curMonth == parseInt(csRelCal.calendar.date[csRelCal.calendar.date.length-1].month)) {
			$('#relcal-container .month-nav .prev-month').show();
			$('#relcal-container .month-nav .next-month').hide();
		} else if(csRelCal.curMonth == parseInt(csRelCal.calendar.date[0].month)) {
			$('#relcal-container .month-nav .prev-month').hide();
			$('#relcal-container .month-nav .next-month').show();
		} else {
			$('#relcal-container .month-nav .prev-month').show();
			$('#relcal-container .month-nav .next-month').show();
		}
	},

	eManip : function() {
		var uWidth = 10;
		$('.relcal-prod li').each(function() {
			$(this).attr('width', $(this).children('.product').length*440);
			uWidth += (($(this).children('.product').length*440)+41);
		});
		$('.relcal-prod').css('width', uWidth);
	},

	getServerTime : function() {
		$.ajax({
			url: '/images/common/js/timevariable.cfm?variable=curTime',
			async: true,
			dataType: 'script',
			success: function() {
				csRelCal.serverTime = curTime.split('|');
				for(var i = 0; i < csRelCal.serverTime.length; i++) {
					csRelCal.serverTime[i] = parseInt(csRelCal.serverTime[i], 10);
				}
			},
			error: function(e) {
				console.log(e);
			}
		});
	},

	imageFallback : function(e) {
		$(e).attr('src','/ns/common/champssports/images/image-coming-soon.gif');
	},

	loadCalendar : function() {
		var curDate = new Date();
		var curYear = curDate.getFullYear();
		var curMonth = curDate.getMonth()+1
		var curDay = curDate.getDate();

		var d = csRelCal.calendar.date;
		var month = parseInt(d[0].month);
		var day = parseInt(d[0].day);

		var html = '<li>';
		// traverse through dates
		for(var i = 0; i < d.length; i++) {
			if(d[i].month != month || d[i].day != day) {
				month = d[i].month;
				day = d[i].day;
				html += '</li><li>';
			}
			// traverse through products
			for(var j = 0; j < d[i].products.length; j++) {
				html += '<div class="product" data-index="'+i+','+j+'" data-sku="'+d[i].products[j].sku.toString()+'" data-model="'+d[i].products[j].model.toString()+'" data-soldout="'+d[i].products[j].soldOut+'">';
				// image
				if(d[i].products[j].imageURL != '') {
					if(csRelCal.checkDaysOut(d[i].year, d[i].month, d[i].day) <= 7) {
					    html += '<div class="left-column"><img src="' + d[i].products[j].imageURL + '" title="' + d[i].products[j].prodName + '" onerror="csRelCal.imageFallback(this)" /></div>';
					} else {
						html += '<div class="left-column"><img src="/ns/common/champssports/images/image-coming-soon.gif" alt="Coming Soon" /></div>';
					}
				} else {
					html += '<div class="left-column"><img src="/ns/common/champssports/images/image-coming-soon.gif" alt="Coming Soon" /></div>';
				}

				html += '<div class="right-column">';
				// date
				html += '<span class="date">'+d[i].month+'/'+d[i].day+'/'+d[i].year+'</span>';
				// name
				html += '<span class="name">'+d[i].products[j].prodName+'</span>';
				// product number
				html += '<span class="model-number">Product #: '+d[i].products[j].sku.toString()+'</span>';
				// style
				html += '<span class="style">Selected Style: '+d[i].products[j].prodStyle+'</span>';
				// width
				html += '<span class="width">Width - '+d[i].products[j].prodWidth+'</span>';
				// add to cart
				if(parseInt(d[i].month) < curMonth || (parseInt(d[i].month) == curMonth && parseInt(d[i].day) <= curDay)) {
					if(d[i].products[j].soldOut) {
						html += '<span class="sold-out">Sold Out</span>';
					} else {
						if(!(parseInt(d[i].month) == csRelCal.serverTime[1] && parseInt(d[i].day) == csRelCal.serverTime[2] && csRelCal.serverTime[3] < 7)) {
						    html += '<a href="javascript:void(0);" class="button cta_button" title="Buy ' + d[i].products[j].prodName + ' Now">Buy Now</a>';
						}
					}
				}
				// social buttons
				html += '<div class="social-icons">';
				html += '<a href="http://www.facebook.com/sharer/sharer.php?u=http://www.champssports.com/product/model:' + d[i].products[j].model.toString() + '/sku:' + d[i].products[j].sku.toString() + '" target="_blank" title="Share ' + d[i].products[j].prodName + ' on Facebook"><img src="/ns/common/champssports/images/social-icons/facebook-64x64.png" border="0"/></a>';
				html += '<a href="http://twitter.com/home?status=http://www.champssports.com/product/model:' + d[i].products[j].model.toString() + '/sku:' + d[i].products[j].sku.toString() + '" target="_blank" title="Share ' + d[i].products[j].prodName + ' on Twitter"><img src="/ns/common/champssports/images/social-icons/twitter-64x64.png" border="0"/></a>';
				html += '<a href="http://pinterest.com/pin/create/button/?url=http://www.champssports.com/product/model:' + d[i].products[j].model.toString() + '/sku:' + d[i].products[j].sku.toString() + '&media=' + d[i].products[j].imageURL + '&description=Check%20out%20this%20new%20release%20from%20Champs%20Sports!" data-pin-do="skipLink" target="_blank" title="Share ' + d[i].products[j].prodName + ' on Pinterest"><img src="/ns/common/champssports/images/social-icons/pinterest-64x64.png" border="0"/></a>';
				html += '<a href="https://plus.google.com/share?url=http://www.champssports.com/product/model:' + d[i].products[j].model.toString() + '/sku:' + d[i].products[j].sku.toString() + '" target="_blank" title="Share ' + d[i].products[j].prodName + ' on Google Plus"><img src="/ns/common/champssports/images/social-icons/googleplus-64x64.png" border="0"/></a>';
				html += '</div>';
				// end social icons

				html += '</div>';
				// end right column

				html += '</div>';
				// end product div
			}
			
		}
		html += '</li>';

		$('.relcal-prod').html(html);
		csRelCal.eManip();
	},

	nextMonth : function() {
		var d = new Date();
		if(csRelCal.curMonth == 12) {
			var m = 1;
		} else { var m = csRelCal.curMonth+1; }
		for(var i = 0; i < csRelCal.calendar.date.length; i++) {
			if(parseInt(csRelCal.calendar.date[i].month) == m) {
				var rLimit = -1*($('.relcal-prod').width() - $(window).width());
				if(-1*$('.relcal-prod li').eq(i).offset().left < rLimit) {
					var newPos = -1*rLimit;
				} else {
					newPos = $('.relcal-prod li').eq(i).offset().left - $('.relcal-prod').offset().left;
				}
				var deltaScrollRate = (-1*rLimit) / ($('#relcal-container .scrollbar-container').width() - 32);
				$('.relcal-prod').animate({
					left: -1*newPos
				},1000, 'swing');
				$('#relcal-container .scrollbar-inner').animate({
					left: newPos/deltaScrollRate
				}, 1000, 'swing');
				$('#relcal-container .scrollbar-inner-bkg').animate({
					width: newPos/deltaScrollRate + 16 + 'px'
				}, 1000, 'swing');
				csRelCal.curMonth = m;
				$('.relcal-header .month-name').text(csRelCal.monthNames[m-1]+' '+d.getFullYear());
				break;
			}
		}
		if(csRelCal.curMonth == parseInt(csRelCal.calendar.date[csRelCal.calendar.date.length-1].month)) {
			$('#relcal-container .month-nav .prev-month').show();
			$('#relcal-container .month-nav .next-month').hide();
		} else {
			$('#relcal-container .month-nav .prev-month').show();
			$('#relcal-container .month-nav .next-month').show();
		}
	},

	previousMonth : function() {
		var d = new Date();
		if(csRelCal.curMonth == 1) {
			var m = 12;
		} else { var m = csRelCal.curMonth-1; }
		for(var i = 0; i < csRelCal.calendar.date.length; i++) {
			if(parseInt(csRelCal.calendar.date[i].month) == m) {
				var rLimit = -1*($('.relcal-prod').width() - $(window).width());
				newPos = $('.relcal-prod li').eq(i).offset().left - $('.relcal-prod').offset().left;
				var deltaScrollRate = (-1*rLimit) / ($('#relcal-container .scrollbar-container').width() - 32);
				$('.relcal-prod').animate({
					left: -1*newPos
				},1000, 'swing');
				$('#relcal-container .scrollbar-inner').animate({
					left: newPos/deltaScrollRate
				}, 1000, 'swing');
				$('#relcal-container .scrollbar-inner-bkg').animate({
					width: newPos/deltaScrollRate + 16 + 'px'
				}, 1000, 'swing');
				csRelCal.curMonth = m;
				$('.relcal-header .month-name').text(csRelCal.monthNames[m-1]+' '+d.getFullYear());
				break;
			}
		}
		if(csRelCal.curMonth == parseInt(csRelCal.calendar.date[0].month)) {
			$('#relcal-container .month-nav .prev-month').hide();
			$('#relcal-container .month-nav .next-month').show();
		} else {
			$('#relcal-container .month-nav .prev-month').show();
			$('#relcal-container .month-nav .next-month').show();
		}
	},

	scrollToMonth : function() {
		var d = new Date();
		var curYear = d.getFullYear();
		var curMonth = d.getMonth()+1
		var curDay = d.getDate();

		for(var i = 0; i < csRelCal.calendar.date.length; i++) {
		    if ((parseInt(csRelCal.calendar.date[i].month) == curMonth && parseInt(csRelCal.calendar.date[i].day) >= curDay) || parseInt(csRelCal.calendar.date[i].month) > curMonth) {
		        var rLimit = -1 * ($('.relcal-prod').width() - $(window).width());
				if(-1*$('.relcal-prod li').eq(i).offset().left < rLimit) {
					var newPos = -1*rLimit;
				} else {
					newPos = $('.relcal-prod li').eq(i).offset().left;
				}
				var deltaScrollRate = (-1*rLimit) / ($('#relcal-container .scrollbar-container').width() - 32);
				$('.relcal-prod').animate({
					left: -1*newPos
				},1000, 'swing');
				$('#relcal-container .scrollbar-inner').animate({
					left: newPos/deltaScrollRate
				}, 1000, 'swing');
				$('#relcal-container .scrollbar-inner-bkg').animate({
					width: newPos/deltaScrollRate + 16 + 'px'
				}, 1000, 'swing');
				csRelCal.curMonth = curMonth;
				$('.relcal-header .month-name').text(csRelCal.monthNames[curMonth-1]+' '+curYear);
				break;
			}
		}
		setTimeout(function() { csRelCal.checkMonthSwitch() }, 1100);
	}
}

var mDown = false;
var scrollStartPos = 0;
var touchStartPos = 0;
var swipeRate = 1;

$(document).ready(function() {
	csRelCal.getServerTime();
});

$('#relcal-container .scrollbar-container').live('mousedown touchstart', function() {
	mDown = true;
});
$('#relcal-container .relcal-prod').live('touchstart', function(e) {
	mDown = true;
	scrollStartPos = parseInt($(this).css('left'));
	var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	touchStartPos = touch.pageX;
});
$('#relcal-container').live('mouseup touchend', function() {
	if(mDown == true) {
		mDown = false;
		csRelCal.checkMonthSwitch();
	}
});

// Scroll using scrollbar
$('#relcal-container .scrollbar-container').live('mousemove touchmove', function(e) {
	e.preventDefault();
	if(mDown) {
		var leftOffset = $(this).offset().left;
		var rLimit = $(this).width() - 32;
		if(e.originalEvent.touches != undefined) {
	    	var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	    	var newPos = touch.pageX - leftOffset - 16;
	    } else {
			var newPos = e.clientX - leftOffset - 16;
	    }
		if(newPos < 0) { newPos = 0; }
		if(newPos > rLimit) { newPos = rLimit; }
		$('#relcal-container .scrollbar-inner').css('left', newPos);
		$('#relcal-container .scrollbar-inner-bkg').css('width', newPos + 16 + 'px');
		var deltaScrollRate = ($('.relcal-prod').outerWidth() - $(window).width()) / rLimit;
		$('.relcal-prod').css('left', -1*(newPos*deltaScrollRate));
	}
});

// Scroll using swiping on container
$('#relcal-container .relcal-prod').live('touchmove', function(e) {
	e.preventDefault();
	if(mDown) {
		var rLimit = -1*($(this).width() - $(window).width());
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		var newPos = scrollStartPos + (swipeRate*(touch.pageX - touchStartPos));
		if(newPos > 0) { newPos = 0; }
		if(newPos < rLimit) { newPos = rLimit; }
		$(this).css('left', newPos);
		var deltaScrollRate = (-1*rLimit) / ($('#relcal-container .scrollbar-container').width() - 32);
		$('#relcal-container .scrollbar-inner').css('left', -1*(newPos/deltaScrollRate));
		$('#relcal-container .scrollbar-inner-bkg').css('width', -1*(newPos/deltaScrollRate) + 16 + 'px');
	}
});

$('#relcal-container .product .social-icons a').live('click', function(e) {
	e.stopPropagation();
});

$('#relcal-container .product[data-soldout="false"]').live('click', function() {
	var d = csRelCal.calendar.date;
	var i = parseInt($(this).attr('data-index').split(',')[0]);;
	var j = parseInt($(this).attr('data-index').split(',')[1]);
	if($(this).find('a.button').length > 0) {
		cmCreateManualLinkClickTag('\''+location.hostname+'/?cm_sp='+d[i].products[j].cmTag+'\'');
		$.quickview({'sku': $(this).attr('data-sku').toString(), 'model': $(this).attr('data-model').toString(), 'position': 1, 'loadingHTML': '<img src="/ns/common/champssports/images/loading.gif" border="0" />' });
	}
});