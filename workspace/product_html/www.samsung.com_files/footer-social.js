/* globals jQuery, _, Modernizr, enquire, smg */
smg.global.FooterSocial = (function ($, window, document) {
  'use strict';
  var defaults = {
	pageGroup : "",
	pageType : "",
	subPageType:""
  },facebook = "https://www.facebook.com/SamsungUSA", 
	twitter = "https://twitter.com/samsungtweets", 
	googlePlus = "https://plus.google.com/+SamsungUSA/posts",
	instagram = "http://instagram.com/samsungusa#",
	youtube = "http://www.youtube.com/user/samsungusatube";
  
  function init(opts) {
	  var options = $.extend({}, defaults, opts);

	  if(options.pageGroup == "mobile") {
		  facebook = "https://www.facebook.com/SamsungMobileUSA";
		  twitter = "https://twitter.com/SamsungMobileUS";
		  googlePlus = "https://plus.google.com/+SamsungMobileUSA/posts";
		  youtube = "http://www.youtube.com/user/samsungmobileusa";
	  } else if (options.pageGroup == "appliances") {
		  facebook = "https://www.facebook.com/samsunghomeappliancesusa";
	  } else if(options.pageType == "tvs" || (options.subPageType =="oled-tv" ||options.subPageType=="led-tv" ||
		  options.subPageType=="uhd-tv"||options.subPageType=="lcd-tv"||options.subPageType=="plasma-tv")) {
		  facebook = "https://www.facebook.com/SamsungTVUSA";
		  twitter = "https://twitter.com/SamsungTVUSA";
	  } else if(options.pageType == "digital-cameras" ||(options.subPageType =="interchangeable-lens" ||options.subPageType=="galaxy-camera" ||
			  options.subPageType=="wi-fi"||options.subPageType=="compact-long-zoom"||options.subPageType=="point-and-shoot")) {
		  facebook = "https://www.facebook.com/SamsungCameraUSA";
		  twitter = "https://twitter.com/SamsungCameraUS";
	  } 
	  
	  $("#footer .social-links ul li").each(function(i) {
		  var $link = $(this).find("a");
		 switch(i) {
			 case 0:
				 $link.attr("href", facebook);
			 break;
			 case 1:
				 $link.attr("href", twitter);
			 break;
			 case 2:
				 $link.attr("href", googlePlus);
			 break;
			 case 3:
				 $link.attr("href", instagram);
			 break;
			 case 4:
				 $link.attr("href", youtube);
			 break;
		 } 
	  });
  }

  return {
    init: init
  };

})(jQuery, _, window, document);