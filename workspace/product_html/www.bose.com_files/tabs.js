/***
** title: Tabs
** author: Dan DeRose
** company: Bose Corporation
** requires: jquery 1.5
** last updated: 1/19/2012 by Dan DeRose
** description: Create a series of tabbed content. Either hidden divs or ajax can be used; hidden content is the default by can changed to ajax by setting passing a setting in the (optional) object literal config upon plugin initialization. The default script is completely content agnostic and relies on element position. The option exists to laod any tab upon page load by specifying the id of the section in a querystring variable called tab. Additionally, a method (loadNewContent) has been written that allows the content of any tab to be updated behind the scenes via an object passed in a object literal containing said object and the id of the section to be updated.
***/

(function($) {
	var methods = {
		config : {
			contentLoading : 'conventional',
			container : '',
			tabs : '',
			content : '',
			tracking : true,
			liveChat : true,
			loading_animation : '/assets/images/global/loading_animation.gif'
		},
		
		init : function(settings) {
			// merge default global variables with custom variables, modifying 'config'
			
			if($('nav#tabs').length < 1) {
				return;
			}

			if(settings) $.extend(true, methods.config, settings);
			methods.config.container = $(this);
			
			var oChildren =  methods.config.container.children();
			methods.config.tabs = oChildren.eq(0);
			methods.config.content = oChildren.eq(1);
			
			if($.urlParam('tab')) {
				var sTab = $('#' + $.urlParam('tab'));
				var index = sTab.prevAll().size();
				methods.config.tabs.children().eq(index).addClass('selected');
				sTab.show();
				if (methods.config.tracking = true && objSiteCatalyst.additionalProductViews[$.urlParam('tab')]) {
					objSiteCatalyst.setAdditionalPageViews($.urlParam('tab'));
				}
			} else {
				methods.config.tabs.children().eq(0).addClass('selected');
				methods.config.content.children().eq(0).show();
			}

			// Remove any tabs whose corresponding sections do not contain content
			/* JS44722 - Removing this per Josh's orders to handle the tabs via the TPL */
			/* methods.config.content.children().each(function(index) {
				if(!$.trim($(this).html()) == true) {
					$(this).remove();
					methods.config.tabs.children().eq(index).remove();
				}
			}); */
			
			methods.setTabs();
		},
		
		switchTab : function(index,obj) {
			var aTabs = methods.config.tabs.children();
			var sTabName = $(obj).attr('title');
			aTabs.removeClass('selected');
			aTabs.eq(index).addClass('selected');
			
			if(methods.config.contentLoading === 'ajax') {
				// Show loading icon
				methods.config.content.ajaxStart(function() {
					methods.config.content.html('<img src="' + methods.config.loading_animation + '" style="margin:0 auto;" id="loading_icon" />');
				});

				// Load content
				if(obj.hash) {
					methods.config.content.load(obj.href + ' ' + obj.hash);
				} else {
					methods.config.content.load(obj.href, function(data){
						if(data) {
							$(methods.config.content).html(data.slice(data.indexOf('<body'),data.indexOf('</body')));
						} else {
							methods.config.content.html('<p>We cannot load this page at this time.</p>');
						}
					});
				}
			} else {
				var aContent = methods.config.content.children();
				aContent.hide();
				aContent.eq(index).show();
			}
			
			// Fire SiteCatalyst page view
			if (methods.config.tracking = true) {
				objSiteCatalyst.newTabView({spagename:sTabName});
				if(objSiteCatalyst.additionalProductViews[sTabName]) {
					objSiteCatalyst.setAdditionalPageViews(sTabName);
				}
				objSiteCatalyst.pageView();
				methods.updateShowcaseLinks(obj);
			}
			
			// Live Person block - sends tab name to Live Person using sendData() function in echat.js DAC 6/24/2009
			if (methods.config.liveChat = true && typeof(eChatSendData.sendData) === 'function') { // Make sure that eChat.js is loaded
				eChatSendData.sendData('session','ClickAction',sTabName);
			}
		},
		
		setTabs : function() {
			var aTabs = methods.config.tabs.children();
			aTabs.each(function(index) {
				$(this).bind('click.boseTabs', function(e) {
					try {e.preventDefault();} catch(e){} // Kill the event and stop the href action
					methods.switchTab(index,this);
				});
			});
		},
		
		loadNewContent : function(obj) {
			$('#' + obj.tab).html(obj.content);
		},
		
		updateShowcaseLinks : function(obj) {
			$('.showcase_link').each(function() {
				var dataTracking = $(this).data('showcase_asset_tracking');
				dataTracking = dataTracking.slice(0,dataTracking.lastIndexOf(':')) + ':' + $(obj).attr('title');
				$(this).data('showcase_asset_tracking',dataTracking);
			});
		}
	};
  
	$.fn.boseTabs = function(method) {
		 // Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.boseRotator');
		}    
	};
})(jQuery);