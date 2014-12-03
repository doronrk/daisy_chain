var generatePlayButton = {

	init : function(){

		$('.sny-video-overlay').css('position', 'relative');
		$('.sny-video-overlay').each(function(index,element){
			if($(element).children().length > 0){
				var newElement = jQuery('<span></span>');

				newElement.css({
					"width" : '100%',
					"height" : '100%',
					"display" : 'block',
					"position" : 'absolute',
					"left" : "0",
					"top" : "0",
					"background" : 'url(/gsi/static/WFS/SNYNA-SNYUS-Site/-/SNYNA/en_US/assets/img/global/utilities/us_video_playBtn.png) no-repeat',
					"backgroundPosition" : '45% 45%',
					'z-index' : "1"
				});
				newElement.appendTo(element);
			}
		});

	}
};

$(document).ready(function(){
	//global event handler for more sony sites element within header
	$(document).on('click', 'a.closeMoreSitesTitle', function() {
		$('div.sny-more-sony-sites-content').fadeOut(250);
	});

	generatePlayButton.init();

	// Sets up the promos
	/* To evergreen remove the promo drop down
	$.Autocompleter.prototype.showResults=function(e,t){var n=this;var r,i,s,o,u=false,a=false;var f=e.length;if(f>0){if($("#searchForm").val().length>1){var l={value:"Black Friday Deals",data:["<span data-url='http://store.sony.com/-cms-page.specialoffers?dropdown=1' class='acDropPromoItem'>Shop Online Deals</span>"]};e.splice(-1,0,l)}}this.dom.$results.html("");for(r=0;r<f;r++){i=e[r];s=$('<li class="ws-term">'+this.showResult(i.value,i.data)+"</li>");s.data("value",i.value);s.data("data",i.data);var c=s.find("span").data("url");if(typeof c!=="undefined"){s.css("background-color","#EAEDF3");s.css("padding-left","0px");s.css("padding-right","0px");}s.click(function(){var e=$(this);n.selectItem(e)}).mousedown(function(){n.finishOnBlur_=false}).mouseup(function(){n.finishOnBlur_=true});this.dom.$results.append(s);if(u===false){u=String(i.value);a=s;s.addClass(this.options.firstItemClass)}if(r==f-1){s.addClass(this.options.lastItemClass)}}this.position();this.dom.$results.show();o=this.dom.$results.outerWidth()-this.dom.$results.width();this.dom.$results.width(this.dom.$elem.outerWidth()-o);this.dom.$results.width(228);$("li",this.dom.$results).hover(function(){n.focusItem(this)},function(){});if(this.autoFill(u,t)){this.focusItem(a)}};$.Autocompleter.prototype.selectItem=function(e){var t=e.find("span").data("url");if(typeof t!=="undefined"){window.location.href=t}else{var n=e.data("value");var r=e.data("data");var i=this.displayValue(n,r);this.lastProcessedValue_=i;this.lastSelectedValue_=i;this.dom.$elem.val($("<div/>").html(i).text()).focus();this.setCaret(i.length);this.callHook("onItemSelect",{value:n,data:r});this.finish()}}
	var promoImage = $('<img/>')[0].src = "/gsi/static/WFS/SNYNA-SNYUS-Site/-/SNYNA/en_US/assets/img/global/SearchHolidayDropDown.png";
	$('body').append($(promoImage).hide());
	*/
});
/* EK - 11:50pm - 09/26/2013 */