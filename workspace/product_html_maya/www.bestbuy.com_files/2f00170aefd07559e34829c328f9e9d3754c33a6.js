$(function() {

    if(window.track && window.track.pageType && window.track.pageType.indexOf("browse,list") === 0) {

		var cookies = require("analytics-core/util/cookies"),
				$iframes = $(".banners iframe");

		if($iframes) {
			$iframes.each(function() {
				if($(this).contents().find("body").length) {
					trackIframe(this);
				} else {
					$(this).load(function() { 
						trackIframe(this);
					});
				}
			});
		}

		function trackIframe(frame) {
			var $frameBody = $(frame).contents().find("body");

			$frameBody.off("click");

			$frameBody.find("a[name^='&lid=']").on("click", function (event) {
				var $target = $(event.currentTarget);
				storeLid($target);
			});
			$frameBody.find("a[data-lid]").on("click", function (event) {
				var $target = $(event.currentTarget);
				storeDataLid($target);
			});
			$frameBody.find("[data-track]").on("click", function (event) {
				var $target = $(event.currentTarget),
					contextDetails = buildContext($target);

				cookies.setLegacyCookie("lid", contextDetails.contextString);
				cookies.setLegacyCookie("page", window.dioPageData.pageName);

				var clickTimeout = setTimeout(function () {
					
					cookies.setLegacyCookie("lid", contextDetails.contextString, "delete");
					cookies.setLegacyCookie("page", window.dioPageData.pageName, "delete");

					var eventData = {
						lastLink: window.dioPageData.pageName + ":" + contextDetails.contextString
					};
					
					analyticsTracker.sendEventData(eventData);
				
				}, 2000);

				$(window).on('beforeunload', function(){
					clearTimeout(clickTimeout);
				});

			});
		}

		function storeLid ($el) {

			var linkName = $el.attr("name"),
				lidValue = "";

			if(_.isString(linkName)) {
				//remove "&lid=" from string
				lidValue = linkName.substring(5).replace(/[^a-z0-9\s_]/gi, "").replace(/\xA0/g," ");
			}

			cookies.setLegacyCookie("lid", lidValue);
			cookies.setLegacyCookie("page", window.dioPageData.pageName);
		}

		function storeDataLid ($el) {

			var lidValue = $el.data("lid");

			cookies.setLegacyCookie("lid", lidValue);
			cookies.setLegacyCookie("page", window.dioPageData.pageName);
		}

		function buildContext ($el) {

			var trackValue = (($el.data("track") === true) ? $el.text() : $el.data("track")),
				$parents = $el.parents("[data-context]");
				
			trackValue = trackValue.replace(/[^a-z0-9\s_]/gi, "").replace(/\xA0/g," ");
				
			var contexts = [trackValue];


			_.each($parents, function(parent) {
				contexts.push($(parent).data("context"));
			});

			return {
				target: $el,
				trackValue: trackValue,
				contextString: contexts.reverse().join(": "),
				contexts: contexts.reverse()
			};
		}

	}


});
