/*
 * NAMESPACE SAMSUNG : smg
 */
var smg= smg || {};

/*
 * Global Chatting Function
 */
smg.chatting = (function($){
	"use strict";

	var initialized = false,
		livechatPageVariables = {
			'Category' 		: "",
			'Subcategory'	: "",
			'Model_Name'	: "",
			'Model_Code'	: ""
		},
		livechatConfig = {
			'siteId'			: 49151746,
			'chatServer'		: 'sales.liveperson.net',
			'mobileChatServer'	: 'samsung.apptend.com'
		},
		isPCDevice = function(){
			return ($("meta[device=pc]").length === 0) ? false : true;
		};

	return {
		init : function(){
			initialized = true;
		},

		removeDefaultLinkEvents : function(obj){
			var livechatLinkTdSelector = ".lt-ie9 .breadcrumbs .live-chat table td";

			// Update the text link if you would like to override the link text provided by the chat API
			if(obj && obj.linkText){
				$(".live-chat a span").html(obj.linkText);
			}

			// MANTIS-2659: ISSUE #2 : Fix for IE-8 Livechat hiding issue:: Handle using jQuery as first-child selector is not supported in IE-8
			if($(livechatLinkTdSelector+" img").length >= 1 && $(livechatLinkTdSelector).length >= 1 && !$(livechatLinkTdSelector+":first-child").hasClass('hide')){
				$(livechatLinkTdSelector+":first-child").addClass('hide');
			}
			
			if($(".live-chat a").length !== 0){
				// Set the Data for the Click Events for <a> tag for Link Tracking
				$(".live-chat a").each(function(){
					var parentObj = $(this).parents(".live-chat"),
						dataAttributes = parentObj.data();

					// Do script override for onclick event
					$(this).removeAttr('onclick');
					$(this).attr({'href' : ''});

					for(var dataAttr in dataAttributes){
						//Set the Data for the DOM
						$(this).data(dataAttr , dataAttributes[dataAttr]);
						//Set the Attribute for the DOM
						$(this).attr("data-"+ dataAttr , dataAttributes[dataAttr]);
					}
				});

				// Remove the Data for the Parent of <a> tag for Link Tracking
				$(".live-chat a").each(function(){
					var parentObj = $(this).parents(".live-chat"),
						dataAttributes = parentObj.data();

					for(var dataAttr in dataAttributes){
						//Remove the parent Element Attribute
						parentObj.removeAttr("data-"+ dataAttr);

						//Remove the parent Element Data
						parentObj.removeData(dataAttr);
					}
				});
			}
		},

		/**
		 * @func openLiveChat
		 * @param obj
		 * accepts smg.chatting.openLiveChat(); // for General Chat
		 * accepts smg.chatting.openLiveChat({Category : NAME_OF_THE_CATEGORY, Subcategory : NAME_OF_THE_SUBCATEGORY, Model_Code : MODEL_CODE, Model_Name : MODEL_NAME, skillType : SKILL_TYPE});
		 */
		openLiveChat : function(obj){
			if(obj){
				// Do events for General Chat
				if(obj.generalChat){
					// Do script override for onclick event
					smg.chatting.removeDefaultLinkEvents();

					// Do livechat for desktop
					if(isPCDevice()){
						if(obj.categoryId){
							for(var ind=0; ind<lpMTagConfig.dynButton.length; ind++){
								if((obj.categoryId).toLowerCase() === (lpMTagConfig.dynButton[ind].pid).toLowerCase()){
									// Trigger livechat call
									lpMTagConfig["dynButton"+ind].actionHook();
									break;
								}
							}
						}
					} else { // Do livechat for mobile and tablets
						//s.pageName = "SamsungMobile:Support-LiveChat";
						window.location.href = location.protocol + "//" + livechatConfig.mobileChatServer;
					}
				} else if(obj.categoryChat && obj.skillType && typeof obj.skillType === "string") { // Do events for category level chat
					// Do livechat for desktop
					if(isPCDevice()){
						var callurl = 'https://'+ livechatConfig.chatServer +'/hc/'+ livechatConfig.siteId +'/?cmd=file&file=visitorWantsToChat&site='+ livechatConfig.siteId +'&byhref=1&SESSIONVAR!skill=' + obj.skillType;
						window.open(callurl, 'samsungchat', 'toolbar=0,scrollbars=0,directory=0,location=0,statusbar=0,menubar=0,resizable=1,width=567,height=430,left=376,top=59');
					} else { // Do livechat for mobile and tablets
						//s.pageName = "SamsungMobile:Support-LiveChat";
						//window.location.href = location.protocol + "//" + livechatConfig.mobileChatServer;
						window.location.href = location.protocol +"//"+ livechatConfig.mobileChatServer +"/_a/_support/_chat/direct/?_lpSkill="+ obj.skillType +"&1619828="+ obj.Category;
					}
				} else { // Do events for product level chat
					smg.chatting.removeDefaultLinkEvents();

					// Do livechat for desktop
					if(isPCDevice()){
						for(var ind in livechatPageVariables){
							if(obj[ind]){
								livechatPageVariables[ind] = obj[ind];
								lpSendData('page', ind, obj[ind]);
							}
						}

						// Trigger livechat call for multiple live chat items
						if(obj.livechatDOMId){
							for(var ind=0; ind<lpMTagConfig.dynButton.length; ind++){
								if((obj.livechatDOMId).toLowerCase() === (lpMTagConfig.dynButton[ind].pid).toLowerCase()){
									// Trigger livechat call
									lpMTagConfig["dynButton"+ind].actionHook();
									break;
								}
							}
						} else {
							lpMTagConfig.dynButton0.actionHook();
						}
					} else {	// Do livechat for mobile and tablets
						var linkBase = location.protocol +"//"+ livechatConfig.mobileChatServer +"/_a/_support/_chat/direct/?",
							liveChatURL = linkBase + '_lpSkill=' + smg.pageConfig.productInfo.skillType
					                         + '&1619828=' + smg.pageConfig.productInfo.Category
					                         + '&1619829=' + smg.pageConfig.productInfo.Subcategory
					                         + '&1619830=' + smg.pageConfig.productInfo.Model_Name
					                         + '&1619831=' + smg.pageConfig.productInfo.Model_Code;

					    //s.pageName = "SamsungMobile:Support-LiveChat>"+ smg.pageConfig.productInfo.Model_Code;

					    window.location.href = liveChatURL;
					}
				}
			}
		}
	};
}(jQuery));

// Omniture click event for live chat.
var omn_liveChatClick = omn_liveChatClick || function(){
												try{
													ss_link_click_track('prop15,prop16,prop17,eVar9,eVar10,eVar11,events','event55','','live chat support,' + s.pageName + '>live chat support,' + s.pageName + '>live chat>live chat support,live chat support,' + s.pageName + '>live chat support,' + s.pageName + '>live chat>live chat support,events','o','live chat support');
												}
												catch(e){}
											};

