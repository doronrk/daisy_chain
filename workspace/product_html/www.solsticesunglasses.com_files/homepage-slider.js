var backgroundcache = [];
var boxcache = [];
var activebackgroundindex = -1;
var boxpadding = 27;
var boximgwidth = 262;
var transitionspeed = 10000;
var fadespeed = 3000;

function HomePageSlider(backgroundContainerId, boxContainerId, baseUrl, transition, fade) {
	transitionspeed = transition;
	fadespeed = fade;
	this.backgroundContainerId = backgroundContainerId;
	this.boxContainerId = boxContainerId;
	this.baseUrl = baseUrl;

	this.addBackgroundImage = function(image, url) {
		var cacheImage = document.createElement('img');
		cacheImage.src = this.baseUrl + '/' + image;
		backgroundcache.push(cacheImage);
		if(url != null && url != '') {
			var atag = document.createElement('a');
			atag.href=url;
			atag.appendChild(cacheImage);
			atag.target='_self';
			jQuery('.'+this.backgroundContainerId).append(atag);
		} else {	
			jQuery('.'+this.backgroundContainerId).append(cacheImage);
		}
	}
	
	this.addBoxImage = function(image, url) {
		var li = document.createElement('li');
		var cacheImage = document.createElement('img');
		if(url != null && url != '') {
			var atag = document.createElement('a');
			atag.href=url;
			atag.appendChild(cacheImage);
			atag.target='_self';
			li.appendChild(atag);
		} else {
			li.appendChild(cacheImage);
		}
		
		cacheImage.src = this.baseUrl + '/' + image;
		boxcache.push(cacheImage);
		jQuery('.'+this.boxContainerId+' ul').width(jQuery('.'+this.boxContainerId+' ul').width() + boximgwidth + boxpadding);
		jQuery('.'+this.boxContainerId+' ul').append(li);	
	}
	
	this.activate = function() {
		var li_list = jQuery('.'+this.boxContainerId+' ul li');
		jQuery(li_list[li_list.length - 1]).clone().insertBefore(jQuery('.'+this.boxContainerId+' ul li:first'));
		jQuery(li_list[li_list.length - 2]).clone().insertBefore(jQuery('.'+this.boxContainerId+' ul li:first'));
		jQuery(li_list[li_list.length - 3]).clone().insertBefore(jQuery('.'+this.boxContainerId+' ul li:first'));
		
		li_list = jQuery('.'+this.boxContainerId+' ul li');
		jQuery(li_list[3]).clone().insertAfter(jQuery('.'+this.boxContainerId+' ul li:last'));
		jQuery(li_list[4]).clone().insertAfter(jQuery('.'+this.boxContainerId+' ul li:last'));
		jQuery(li_list[5]).clone().insertAfter(jQuery('.'+this.boxContainerId+' ul li:last'));
		
		li_list = jQuery('.'+this.boxContainerId+' ul li');
		var len = li_list.length;
		var width = boxpadding * li_list.length;
		jQuery.each(li_list, function(i) {
		    width += jQuery(this).width();
		});
		jQuery('.'+this.boxContainerId+' ul').width(width);
		
		jQuery(jQuery('.'+this.backgroundContainerId +' img')[0]).show();
		startBackgroundAnimation('.'+this.backgroundContainerId);
	}
	
	jQuery('.previous').bind('click', function() {
		var ul = jQuery(this).siblings().find('ul');
		var leftpos = parseInt(ul.css('left').replace('px', '')) + (boximgwidth + boxpadding);
		if(leftpos > (boximgwidth + boxpadding)) {
			ul.css('left', '-846px');
		} else {
			ul.css('left', leftpos);
		}
	});
	
	jQuery('.next').bind('click', function() {
		var ul = jQuery(this).siblings().find('ul');
		var leftpos = parseInt(ul.css('left').replace('px', '')) - (boximgwidth + boxpadding);
		if(leftpos - 846 < -ul.width()) {
			ul.css('left', leftpos + ((boximgwidth + boxpadding) * 5));
		} else {
			ul.css('left', leftpos);
		}
	});
}

function startBackgroundAnimation(imgselector) {
	var images = jQuery(imgselector +' img');
	if(activebackgroundindex != -1) {
		jQuery(images[activebackgroundindex]).fadeOut(fadespeed);
	}
	activebackgroundindex++;

	if(activebackgroundindex < images.length) {
		jQuery(images[activebackgroundindex]).fadeIn(fadespeed);
	} else {
		activebackgroundindex = 0;
		jQuery(images[0]).fadeIn(fadespeed);
	}
	
	setTimeout(function(){startBackgroundAnimation(imgselector)}, transitionspeed);
}