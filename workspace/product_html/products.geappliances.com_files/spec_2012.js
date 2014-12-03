function changeTab(activeTab)
	{

		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(activeTab + '_top').addClass("active"); //Add "active" class to selected tab, using the id created at document load

		// ############################################################
		// See /scripts/brightcove/video_playlists.js for
		// details on what is done when a
		// "tab-visibility-change" event is triggered.
		// ############################################################

		$(".tab_content").filter(":visible").hide().trigger("tab-visibility-change"); //Hide all tab content
		$(activeTab).filter(":hidden").fadeIn().trigger("tab-visibility-change"); //Fade in the active content

	};
	
	$(document).ready(function() {
	
		//*** Tabs ***

		//When page loads...
		$(".tab_content").hide(); //Hide all content
		$("ul.tabs li:first").addClass("active").show(); //Activate first tab
		$(".tab_content:first").filter(":hidden").show().trigger("tab-visibility-change"); //Show first tab content

		//attribute an idea to each of the top tabs so we can manipulate them later
		//it is using the href value you enter, in this case #tab1, #tab2 etc and adds _top
		$('.tabs li').each(function(i) {
			var thisId = $(this).find("a").attr("href");
			thisId = thisId.substring(1,thisId.length) + '_top';
			$(this).attr("id",thisId);
		});
		
		//check to see if a tab is called onload
		if (location.hash!=""){changeTab(location.hash);}//if you call the page and want to show a tab other than the first, for instance index.html#tab4

		//On Click Event
		$("ul.tabs li").click(function() {
			//call above function
			changeTab($(this).find("a").attr("href"));
			return false;
		});

		//if you want to open a tab from a link which is not a tab, make sure you give that link a class of external_link
		//example: Lets go to tab 4 to contact us
		//this can be within your content anywhere on the page, remember that it will not jump to the menu!
		$(".external_link").click(function() {
			//call above function
			changeTab($(this).attr("href"));
			return false;
		});

		//*** Expand/collapse section ***

			//Expand all
			$('#expandAll').click(function(){
				$('.acc_container').slideDown(); //Show/open all containers
				$('.acc_trigger').addClass('active');
				return false;
			});
			
			//Collapse all
			$('#collapseAll').click(function(){
				$('.acc_container').slideUp(); //Hide/close all containers
				$('.acc_trigger').removeClass('active');
				return false;
			});
			
			//Hide (Collapse) the toggle containers on load
			$(".acc_container").hide(); 
			
			$('.acc_trigger').addClass('active').next().show(); //Add "active" class to first trigger, then show/open the immediate next container

			//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
			$(".acc_trigger").click(function(){
				$(this).toggleClass("active").next().slideToggle("slow");
				return false; //Prevent the browser jump to the link anchor
			});
			
		/*----------------------------------------------------------------------------*/
		/* This handles the jQuery information pop-ups */
		/*----------------------------------------------------------------------------*/
			
			$(function () {
				$('.newTooltip').each(function () {
					var distance = 10;
					var time = 250;
					var hideDelay = 100;

					var hideDelayTimer = null;

					var beingShown = false;
					var shown = false;
					var trigger = $('.trigger', this);
					var info = $('.popup', this).css('opacity', 0);


					$([trigger.get(0), info.get(0)]).mouseover(function () {
						if (hideDelayTimer) clearTimeout(hideDelayTimer);
						if (beingShown || shown) {
							// don't trigger the animation again
							return;
						} else {
							// reset position of info box
							beingShown = true;

							info.css({
								top: -165,
								left: -87,
								display: 'block'
							}).animate({
								top: '-=' + distance + 'px',
								opacity: 1
							}, time, 'swing', function() {
								beingShown = false;
								shown = true;
							});
						}

						return false;
					}).mouseout(function () {
						if (hideDelayTimer) clearTimeout(hideDelayTimer);
						hideDelayTimer = setTimeout(function () {
							hideDelayTimer = null;
							info.animate({
								top: '-=' + distance + 'px',
								opacity: 0
							}, time, 'swing', function () {
								shown = false;
								info.css('display', 'none');
							});

						}, hideDelay);

						return false;
					});
				});
			});
		});