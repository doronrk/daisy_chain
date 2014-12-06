//set main nav height (Safari, IE8)
	var navHeight=470;

//cache site nav menu
	var $siteNavMenu = $('.site_nav_menu'),
		$siteNavMenuUl = $('.site_nav_menu ul');

//cache back panel variable
	var $backPanel = $('.backPanel');

//cache accountHelp_content variable
	var $accountHelpContent = $('.accountHelp_content');
//timeout variable for exiting menu items
	var menuExitTimeout;
	var activeRow;
	var touchx=0, touchy=0;

// detect touch devices
	var TOUCH_DEVICE = (typeof document.ontouchstart != "undefined") ? true : false;
	if (TOUCH_DEVICE) {
	    $('.header_site_nav').attr('data-touch', 'true');
	} else {
	    $('.header_site_nav').attr('data-touch', 'false');
	}
	
var headerElements = {
	homeDefault: '/default.cfm',
	navHeight: $siteNavMenu.prop('scrollHeight'),
	helpHeight: $('div.accountHelp_content_inner').prop('scrollHeight'),
	//iecheck:$.browser.msie, this has been removed in newer versions of jquery
	iecheck: !$.support.cssFloat,
	init: function() {
		
		//console.log(location.pathname);
		
		if(headerElements.isTouchDevice()){
			headerElements.navTouch();
			headerElements.navTouchFly();
			headerElements.changeNavLinks();
			headerElements.navTouchClose();
			headerElements.accountTouch();
			headerElements.accountTouchClose();
			headerElements.accountChangeLink();
		}

		headerElements.changeLogin();
		headerElements.globalBannerSwap();
		headerElements.globalBannerDrop();
	}, 
	
	accountHover: function() {
		$('div.header_accountHelp').hover(function() {
			$('.accountHelp_content').addClass('addYellowBg').removeClass('addTransparency');
			if(headerElements.iecheck){
				$accountHelpContent.show().stop().animate({height:headerElements.helpHeight+'px'}, 200);
			} else {
				$accountHelpContent.height(headerElements.helpHeight).addClass('accountPad');
			}
			$accountHelpContent;
		}, function(){
			if(headerElements.iecheck){
				$accountHelpContent.stop().animate({height:'1px'}, 200, function(){
					$accountHelpContent.hide();
				});
			} else {
				$accountHelpContent.height(0);
			}
			setTimeout(function(){
					$('.accountHelp_content').removeClass('addYellowBg').addClass('addTransparency');
				}, 200);
			$accountHelpContent.removeClass('accountPad');
		});
	},
	
	accountChangeLink: function(){
		$('.header_accountHelp a.accountClick').attr('href', 'javascript:void(0);');
	},
	
	accountTouch: function() {
		$('div.header_accountHelp > a').click(function(){
			var $this = $(this);
			if($this.hasClass('accountClick')){
				$('.accountHelp_content').addClass('addYellowBg').removeClass('addTransparency');
				$accountHelpContent.height(headerElements.helpHeight).addClass('accountPad');
				$this.removeClass('accountClick');
			} else {
				$accountHelpContent.height(0);
				$accountHelpContent.removeClass('accountPad');
				$this.addClass('accountClick');
				setTimeout(function(){
					$('.accountHelp_content').removeClass('addYellowBg').addClass('addTransparency');
				}, 200);
			}
		});
	},
	
	accountTouchClose: function() {
		$('.accountHelp_closeBtn').show();
		$('.accountHelp_closeBtn a').click(function(){
			$accountHelpContent.height(0).removeClass('accountPad');
			$('div.header_accountHelp > a').addClass('accountClick');
		});
	},
	
	// this function will open on hover
	navHover: function() {
		var timer;		
		$('div.header_site_nav').hover(function(){
			clearTimeout(timer);
			$siteNavMenu.removeClass('overflow_hide').addClass('overflow_show');
			$siteNavMenu.show().stop().animate({height:headerElements.navHeight}, 100);
			setTimeout(function(){
				$siteNavMenuUl.addClass('opacity_full');
			}, 170);
			
		}, function(){
			timer = setTimeout(function(){
				$siteNavMenuUl.removeClass('opacity_full');
				$siteNavMenu.removeClass('overflow_show').addClass('overflow_hide');
				$siteNavMenu.stop().animate({height:'1px'}, 100, function(){
					$siteNavMenu.hide();
				});
			},300);
		});
	}, 
	
	navTouch: function(){
		$('div.header_site_nav a.siteNavClick').click(function(){
			//$siteNavMenu.addClass('addTransition');
			if($siteNavMenu.hasClass('overflow_hide')){
				$siteNavMenu.removeClass('overflow_hide').addClass('overflow_show');
				$('.site_nav_toggle_arrow').hide();
				$('.site_nav_toggle_close').show();
				$siteNavMenu.height(headerElements.navHeight);
				setTimeout(function(){
					$siteNavMenuUl.addClass('opacity_full');
				}, 170);
			} else {
				$siteNavMenuUl.removeClass('opacity_full');
				$siteNavMenu.removeClass('overflow_show').addClass('overflow_hide');
				$siteNavMenu.height(0);
				$('.site_nav_toggle_close').hide();
				$('.site_nav_toggle_arrow').show();
				if($('div.site_nav_menu ul li.firstLevelItem').hasClass('imOpen')||$('.nav_Content').hasClass('openContent')){
					$('div.site_nav_menu ul li.firstLevelItem').removeClass('imOpen');
					$('.nav_content').width(0).removeClass('openContent');
					$backPanel.width(0).removeClass('addEffects');
				}
			}
		});
	},
	
	changeNavLinks: function(){
		$('div.site_nav_menu ul li.firstLevelItem a.changeMeLink').attr('href', 'javascript:void(0);');
	},
	
	navTouchClose: function(){
		$('.closeNavContent').show();
		$('div.closeNavContent a').click(function(){
			if($('div.site_nav_menu ul li.firstLevelItem').hasClass('imOpen')||$('.nav_Content').hasClass('openContent')){
				$('div.site_nav_menu ul li.firstLevelItem').removeClass('imOpen');
				$('.nav_content').width(0).removeClass('openContent');
				$backPanel.width(0).removeClass('addEffects');
			}
		});
	},
	
	navTouchFly: function(){
		$('div.site_nav_menu .nav_contentInner a').on('touchstart', function(e){
			$('div.site_nav_menu .nav_contentInner a').css('background', 'inherit').css('color', 'inherit');
			$(this).css('background', '#000 url("/ns/global/images/arrow-yellow-right-small.png") no-repeat scroll 99% center').css('color', '#FFF');
		});
	    $('div.site_nav_menu ul li.firstLevelItem > a').on('touchstart', function(e){
		   e.preventDefault();
		   e.stopPropagation();
		   touchx=e.originalEvent.touches[0].pageX;
		   touchy=e.originalEvent.touches[0].pageY;
		});
		$('div.site_nav_menu ul li.firstLevelItem > a').on('touchend', function(e){
		    e.preventDefault();
			e.stopPropagation();
			var newX = e.originalEvent.changedTouches[0].pageX;
			var newY = e.originalEvent.changedTouches[0].pageY;
			if(newX < touchx-30 || newX > touchx+30 ||
				newY < touchy-30 || newY > touchy+30){
				return;
			}
			if(!$(this).parent('li.firstLevelItem').hasClass('imOpen')){
				var $this = $(this).parent('li.firstLevelItem'), 
					$flyout = $this.find('.nav_content'),
					$navContent = $('.nav_content');
				$('div.site_nav_menu ul li.firstLevelItem').removeClass('imOpen');
				$navContent.removeClass('openContent').width(0);
				if($('div.site_nav_menu ul li.firstLevelItem').hasClass('imOpen')&&!$('div.site_nav_menu ul li.firstLevelItem').find('.nav_content').hasClass('openContent')){
					$navContent.hide().width(0);
					$flyout.show().width(769);
					//$('div.site_nav_menu ul li.firstLevelItem').removeClass('imOpen');
				}
				$this.addClass('imOpen');
				$flyout.addClass('openContent');
				$backPanel.addClass('addEffects');
				$flyout.show(50,function(){
					$flyout.width(771);
				});
				
				if($('div.site_nav_menu ul li.firstLevelItem').hasClass('imOpen')&&$navContent.hasClass('openContent')){
					$backPanel.show(10,function(){
						$backPanel.width(769);
					});
					//$flyout.width(769);
				} else {
					$backPanel.hide(10,function(){
						$backPanel.width(0);
					});
					//$flyout.width(0);
				}
			} else {
				var $this = $(this).parent('li.firstLevelItem'),
					$flyout = $this.find(".nav_content");
				//var dataAtt = '[data-navBtn="'+$(this).find('a').attr('id')+'"]';
				$flyout.hide().width(0);
				setTimeout(function(){
					$this.removeClass('imOpen');
					$flyout.removeClass('openContent');
				},100);
				$backPanel.width(0);
				$backPanel.removeClass('addEffects');
			}
		});
	},
	
	// this function keeps nav menu open on home page only
	navOpen: function() {
		$siteNavMenu.removeClass('overflow_hide').addClass('overflow_show');
		if(headerElements.iecheck){
			$siteNavMenu.show(200,function(){
				$(this).stop().animate({height:headerElements.navHeight+'px'}, 200);
			});
			
			//alert(headerElements.navHeight);
		} else {
			$siteNavMenu.height(headerElements.navHeight+'px');
		}
		setTimeout(function(){
			$siteNavMenuUl.addClass('opacity_full');
		}, 200);
	},
	
	//this function is for the menu to fly right
	navFly: function() {
		
		$("#eastbay-main-nav").menuAim({
			   tolerance: 75,
			   enter: function(item){ //fired on entry into a row but not yet activated
					var $item = $(item);
					clearTimeout(menuExitTimeout);
					menuExitTimeout = null;
					if($item.find('.nav_content').length == 0){
						$item.parent().find('.imOpen').removeClass('imOpen');
						$item.parent().find('.nav_content').hide();
					}	
			   },
			   activate: function(item){ // fired on row activation
			        if(typeof activeRow != 'undefined'){
						activeRow.removeClass('imOpen');
						activeRow.find(".nav_content").hide();
					}
					var $item = $(item);
					activeRow = $item;
					if($item.hasClass('firstLevelItem')){
						$item.addClass('imOpen');
						$item.find(".nav_content").show();
					}
			   },
			   exitMenu: function(item){ // fired on menu exit
				   var $item = $(item);
			       if(!menuExitTimeout){
				        /* 
							Timeout to close menu on exit (since exitMenu is fired when between 
							the menu and the items in the flyout :\
						*/
						menuExitTimeout = setTimeout(function(){
							$item.find(".nav_content").hide();
							$item.find('.imOpen').removeClass('imOpen');
							menuExitTimeout = null;
						}, 250);
					}
					return true;
			   },
			   deactivate: function(item){ // fired on row deactivation
					var $item = $(item);
					if(!menuExitTimeout){
						$item.removeClass('imOpen');
						$item.find(".nav_content").hide();
					}
			   }   
		 });
	},
	
	// change Log In to custom messaging
	changeLogin: function(){
		var $custgreet = $("#custgreet"),
			$headerInfo = $('.header_info'),
			topTextPosition = $headerInfo.removeClass('topTextPosition');
		
		if($custgreet.text().toLowerCase().indexOf("guest") === -1 && $custgreet.html().indexOf("logout") !== -1) {
			
			//grab cust greeting text
			var cust = $custgreet.text().split(" "),
			memberData = $('#member_welcome').text().split(" ");
			//Because IE8 throws out extra spaces but FF does not, so we need to filter out blank elements
			member = new Array;
			for(var i=0; i<memberData.length; i++){
				if(memberData[i] !== ''){
					member.push(memberData[i]);
				}
			}
			 
			$('.logged_out').addClass('removed');
			$('.logged_in').removeClass('removed');
			//console.log(cust[0], cust[1], cust[2], cust[3], cust[4], cust[5], cust[6], cust[7]);
			//console.log(member);
			
			// detect the words silver, gold, or platinum in the member_welcome span tag
			if(member[1]==='Silver' || member[1]==='silver'){
				$('.logged_in').prepend("Hi <span class='silverMember'>&nbsp;</span> Member " + member[3] +" ");
				topTextPosition;
			} else if(member[1]==='Gold' || member[1]==='gold') {
				$('.logged_in').prepend("Hi <span class='goldMember'>&nbsp;</span> Member " + member[3] +" ");
				topTextPosition;
		    } else if(member[1]==='Platinum' || member[1]==='Platinum'){
				$('.logged_in').prepend("Hi <span class='platMember'>&nbsp;</span> Member " + member[3] +" ");
				topTextPosition;
			} else {
				$('.logged_in').prepend("Hi " + member[2] +" ");
				$headerInfo.addClass('topTextPosition');
			}
			$('.registerToggle').addClass('removed');
			$('.logOutToggle').removeClass('removed');
			
			//listen for logout click, and then call logout function
			$(".log_out").click(function(event) {
				logout('Registered Message', 'Log Out', 'true');
				return false;
			});
		}
		else {
			$('.header_info').addClass('topTextPosition');
			//listen for login click, and then call login function
			$("#user-login").click(function(event) {
				openLoginDialogForID('user-login', null, null, updateWelcome, null,'Guest Message', 'Log In', 'true', 'true');
				return false;
			});
		}	
	},
	
	globalBannerSwap: function(){
		var $headerNewMsg = $('.header_new_msg'),
			$headerPromoMsg = $('.header_promo_msg');
		if($('#global_Banner').html() != null) {
			$headerNewMsg.html($headerPromoMsg.html());
			$headerNewMsg.removeClass('removed');
			$headerPromoMsg.empty();
		}
	},
	
	globalBannerDrop: function(){
		var $headerNewMsgAchor = $('.header_new_msg a'),
			$headerNewMsg = $headerNewMsgAchor.parent('header_new_msg'),
			$promoMsgContent = $('.promoMsgContent'),
			detailHeight = $promoMsgContent.prop('scrollHeight'),
			//detailHeight = 300;
			promoContentHeight = 360; //sets height for IE
			
		$headerNewMsgAchor.click(function(){
			$promoMsgContent = $(this).parent().children('.promoMsgContent');
			if(!$promoMsgContent.hasClass('seeDetails')){
				$promoMsgContent.addClass('promoMsgAffects');
				$headerNewMsg.removeClass('removed');
				if(headerElements.iecheck){
					// do ie thing
					$promoMsgContent.show().css({height:promoContentHeight+'px'});
					//$promoMsgContent.stop().animate({height:detailHeight+'px'}, 200);
				} else {
					$promoMsgContent.height(detailHeight);
				}
				$promoMsgContent.addClass('seeDetails');
			} else {
				if(headerElements.iecheck){
					// do ie thing
					$promoMsgContent.stop().animate({height:'1px'}, 100, function(){
						$promoMsgContent.hide();
					});
				} else {
					$promoMsgContent.height(0);
				}
				$headerNewMsg.addClass('removed');
				setTimeout(function(){
					$promoMsgContent.removeClass('promoMsgAffects').removeClass('seeDetails');
				}, 105);
				
			}
		});
		
		$('.promoCloseBtn a').click(function(){
			$promoMsgContent = $(this).parents('.promoMsgContent');
			if($promoMsgContent.hasClass('seeDetails')){
				if(headerElements.iecheck){
					// do ie thing
					$promoMsgContent.stop().animate({height:'1px'}, 100, function(){
						$promoMsgContent.hide();
					});
				} else {
					$promoMsgContent.height(0);
				}
				$headerNewMsg.addClass('removed');
				$promoMsgContent.removeClass('promoMsgAffects').removeClass('seeDetails');
			}
		});
		
	},
	
	isTouchDevice:function() {
		if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch){
			return true;
		}
		return false;
	}
};

var globalBannerDetails = {
	
	iecheck: !$.support.cssFloat,
	
	init: function() {
		var $headerNewMsgAchor = $('#small-banner a'),
		//$anibannerContent = $('.anibannerContent'),
		$promoMsgContent = $('.anibannerContent'),
		//detailHeight = $promoMsgContent.prop('scrollHeight'),
		detailHeight = 300;
		promoContentHeight = 300; //sets height for IE
		
		$headerNewMsgAchor.click(function(){
			if(!$promoMsgContent.hasClass('seeDetails')){
				$promoMsgContent.addClass('promoMsgAffects');
				$promoMsgContent.show();
				if(globalBannerDetails.iecheck){
					// do ie thing
					$promoMsgContent.show().css({height:promoContentHeight+'px'});
					//$promoMsgContent.stop().animate({height:detailHeight+'px'}, 200);
				} else {
					$promoMsgContent.height(detailHeight);
				}
				$promoMsgContent.addClass('seeDetails');
			} else {
				if(globalBannerDetails.iecheck){
					// do ie thing
					$promoMsgContent.stop().animate({height:'1px'}, 100, function(){
						$promoMsgContent.hide();
					});
				} else {
					$promoMsgContent.height(0);
				}
				//$headerNewMsg.addClass('removed');
				setTimeout(function(){
					$promoMsgContent.removeClass('promoMsgAffects').removeClass('seeDetails');
				}, 105);
				
			}
		});
		
		$('.anibannerCloseBtn a').click(function(){
			if($promoMsgContent.hasClass('seeDetails')){
				if(globalBannerDetails.iecheck){
					// do ie thing
					$promoMsgContent.stop().animate({height:'1px'}, 100, function(){
						$promoMsgContent.hide();
					});
				} else {
					$promoMsgContent.height(0);
				}
				$promoMsgContent.hide();
				$promoMsgContent.removeClass('promoMsgAffects').removeClass('seeDetails');
			}
		});
	}
}

$(document).ready(function(e) {
	if(headerElements.iecheck){
		$('div.site_nav_menu').hide();
		$('div.accountHelp_content').hide();
	}
    
	headerElements.navHeight = navHeight;
	headerElements.init();
});

if(!headerElements.isTouchDevice()){
	headerElements.navHover();  //      <-------- Keeping menu open for testing change navOpen() back to navHover()	
	headerElements.navFly();
	headerElements.accountHover();		// this function is for the 'My Account/Help' hover effect
}