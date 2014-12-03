//***********************************************
// FacebookApp
//***********************************************

// Create MarketLive.FacebookApp namespace
window.MarketLive = window.MarketLive || {};
MarketLive.FacebookApp = MarketLive.FacebookApp || {};

// Create members for MarketLive.FacebookApp namespace
(function(ns, $) {

	ns.initialize = function (facebookAppId, facebookAppURL, facebookAppName, reportingEnabled, inviteFriendsTitle, inviteFriendsMsg, data, requiresIFrame) {
		ns.facebookLikeHrefToIdMap = [];
		ns.facebookAppId = facebookAppId;
		ns.facebookAppURL = facebookAppURL;
		ns.facebookAppName = facebookAppName;
		ns.reportingEnabled = reportingEnabled;
		ns.inviteFriendsTitle = inviteFriendsTitle;
		ns.inviteFriendsMsg = inviteFriendsMsg;
		ns.data = data;
		ns.requiresIFrame = requiresIFrame;

		FB.init({
		     appId  : ns.facebookAppId,
		     status : true,
		     cookie : true,
		     xfbml  : true
		   });

		FB.Event.subscribe('edge.create',
				function(response) {
					ns.facebookReport('FacebookLike', facebookLikeHrefToIdMap[response]);
				}
			);

		FB.Event.subscribe('comment.create',
				function(response) {
					ns.facebookReport('FacebookComment', response.href);
				}
			);

		window.scrollTo(0,0);
		ns.addLoadEvent(ns.updateCanvas);

		if (requiresIFrame && (window.parent == null || window == window.parent)) {
	        window.parent.location.href = ns.facebookAppURL + "/" + ns.facebookAppName
	        	+ window.location.pathname + window.location.search
	        	+ window.location.hash;
	    }
	};

	ns.updateCanvas = function() {
	       FB.Canvas.setAutoGrow(); //  September 5th, 2012: FB deleted FB.Canvas.setAutoResize, so I changed to setAutoGrow
	       FB.Canvas.setSize({ height: 600, width: 750});
	};

	ns.addLoadEvent = function (func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				if (oldonload) {
					oldonload();
				}
				func();
			};
		}
	};

	ns.inviteFriendsToStore = function () {
		FB.ui({method: 'apprequests',
				title: ns.inviteFriendsTitle,
				message: ns.inviteFriendsMsg,
				data: ns.data});
	};

	/*
	 * parameters :
	 * 		facebookAppId: Facebook iFrame Application ID
	 * 		productName: Name of the current selected product.
	 * 		productDescription: Description of the current product. *
	 * 		productSourceURLForFacebook: Array of products URL/Links to access from facebook wall post.
	 * 		productsImageSource: Recommended product image  to display on facebook wall post.
	 * 		productsURLSource: Recommended/additional array of products URL sources to display on facebook wall post.
	 *
	 */
	ns.shareProduct = function (appId, productName, productDescription, productURL, productImage, productURLSource) {
	    if(MarketLive.Reporting && MarketLive.Reporting.trackDirectoryFacebookShareClick && MarketLive.Reporting.reportingEnabled()){
	        MarketLive.Reporting.trackDirectoryFacebookShareClick(productName);
	    }
		var mediaArrayRecommendedProducts = new Array();
		mediaArrayRecommendedProducts[0] = { "type" : "image", "src" : productImage, "href" : productURLSource };
		FB.ui({
	           method: 'feed',
	           name: productName,
	           link: productURL,
	           picture: productImage,
	           caption: productName,
	           description: productDescription,
	           message: ' '
	             },
	             function(response) {
	                  if (response && response.post_id) {
	                       // alert('Post was published.');
	                       ns.facebookReport('FacebookShare', productURL);
	                     } else {
	                       // alert('Post was not published.');
	                     }
	             });
	 };

	 ns.queryLikeCount = function (productURL, callback) {
		 var count = 0;
		 FB.api(
				 {
					 method: 'fql.query',
					 query: 'SELECT share_count, like_count, comment_count, total_count FROM link_stat WHERE url="'+productURL+'"'
				 },
				 function(response) {
					 count = response && response[0] && response[0].total_count ? response[0].total_count : 0; // sometimes it throws JS exception here, so check is needed
					 callback(count);
				 });
		 return count;
	};

	ns.deferredLikeCount = function () {
	    jQuery('.ml-fbl').each(function(){
	        var oML_FBL = jQuery(this);
	        oML_FBL.on('scrollin', { distance: 400 }, function(){
	                FB.api(
	                    {
	                        method: 'fql.query',
	                        query: 'SELECT url, share_count, like_count, comment_count, total_count FROM link_stat WHERE url="'+oML_FBL.attr('data-href')+'"'
	                    },
	                    function(response) {
	                        var oData = response[0], bUnbindBasedOnCount = false,
	                        showFaces = (oML_FBL.attr('data-show-faces'))? oML_FBL.attr('data-show-faces'):false;
	                        if (!bUnbindBasedOnCount) oML_FBL.off('scrollin');
	                        if (oData && oData.total_count > 0) {
	                            oML_FBL.html('<fb:like layout="button_count" href="'+ oData.url +'" send="false" width="450" show_faces="' + showFaces + '"></fb:like>');
	                            if (bUnbindBasedOnCount) oML_FBL.off('scrollin');
	                            FB.XFBML.parse(oML_FBL[0]);
	                        }
	                    });
	            });
	    });
	};

	ns.facebookReport = function (evt, obj) {
	    if (!MarketLive.FacebookApp.reportingEnabled) return;

	    var $ = jQuery;
	    $('iframe.reportingFrame').remove();

	    var uniqueNum = new Date().getTime();
	    var frameid = "reportingFrame" + uniqueNum;
	    var reportingWin = $('<iframe class="reportingFrame" frameborder="0" tabindex="-1" src="javascript:false;" style="display:block;position:absolute;z-index:-1;width:0;height:0" name="' + frameid + '" id="' + frameid + '"/>');
	    $('body').append(reportingWin);
	    var src = '/syndicated-store/reporting.do?rand=' + new Date().getTime() + '&' + $.param({'evt': evt, 'obj': obj});
	    reportingWin.attr("src", src);
	};


})(MarketLive.FacebookApp, jQuery);











