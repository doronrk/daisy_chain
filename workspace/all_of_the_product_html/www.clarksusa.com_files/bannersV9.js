// this is called on "body onload"
j$(function(){
	j$("area.bannerLink, a.bannerLink").each(function(i, link){
		if (j$(link).attr('href') == "#")
			j$(link).removeAttr('href');
		else {
			j$(link).attr('redirect', j$(link).attr('href'));
			j$(link).attr('newTarget', j$(link).attr('target') || "");
			
			j$(link).removeAttr("target");
			
			if(j$.browser.msie && parseInt(jQuery.browser.version) == 6)
				j$(link).attr('href', "#"); 
			else
				j$(link).attr('href', "javascript:;"); 
		}
	});
});

function onBannerClick(arguments){
	var loc = {};
	
	loc.passedArg = arguments;
	
	// If tracking enabled or tracking_link_id > 0, make an AJAX call to track the banner
	if (loc.passedArg.track == "Y" || loc.passedArg.trackLinkId > 0) {
		loc.ajaxArg = {
			trackingLinkId: loc.passedArg.trackLinkId,
			bannerId: loc.passedArg.bannerId,
			followUrl: false
		}
	
		j$.get( "/sharedPages/com/b2c/banners/tracking.cfm", loc.ajaxArg, function(){ onBannerClick_callback(loc.passedArg);} );
	}
	// If no tracking on banner, we still need to redirect user
	else {
		onBannerClick_callback(loc.passedArg);	
	}
}

function onBannerClick_callback(arguments){
	var loc = {};
	
	loc.redirect = j$(arguments.a).attr('redirect') || "#";
	if (loc.redirect != "#"){
		loc.target = j$(arguments.a).attr('newTarget');
		if (loc.target == "")
			document.location.href = loc.redirect;
		else
			window.open(loc.redirect, loc.target);
	}
}

// For rotating banners
var banners = {
	ph: {},
	displayedPh: [],
	bannerCache: {},
	// Add banner placeholder to the banners structure.
	addPh: function(arguments){
		var loc = {};
		
		banners.ph[arguments.ph] = arguments;
		
		// Current displayed banner index
		banners.ph[arguments.ph].currentDisplay = 0;
		
		// To know if the animation is started for that ph
		banners.ph[arguments.ph].isMoving = false;
		
		// Do pointers to animeNode
		banners.setAnimeNode({ph: arguments.ph});
		
		// Set style on container based on ph info
		banners.setContainerStyle(arguments);
		
		// Set event handling
		banners.setEvents(arguments);
		
		// Display the first banner
		banners.ph[arguments.ph].animeNode.bannerMain.html( banners.getBannerContent( arguments.bannerSet[0] ) );
	},
	// Determine the next banner to fetch
	fetchBanner: function(arguments){
		
		arguments.navigate === undefined ? 1 : arguments.navigate; 
		
		if ( banners.ph[arguments.ph].isMoving )
			return;
		
		if (arguments.navigate == 0){
			banners.ph[arguments.ph].currentDisplay--;
			if (banners.ph[arguments.ph].currentDisplay < 0)
				banners.ph[arguments.ph].currentDisplay = banners.ph[arguments.ph].bannerSet.length-1;
		}
		else if (banners.ph[arguments.ph].currentDisplay < banners.ph[arguments.ph].bannerSet.length-1)
			banners.ph[arguments.ph].currentDisplay++;
		else
			banners.ph[arguments.ph].currentDisplay = 0;

		banners.getBanner({ bannerId: banners.ph[arguments.ph].bannerSet[banners.ph[arguments.ph].currentDisplay], ph: arguments.ph, navigate: arguments.navigate });
	},
	// Set the next banner to be displayed to the bannerNext anime node and call the animation
	getBanner: function(arguments){
		var loc = {};
		
		//alert( arguments.bannerId + " , "+ arguments.navigate );
		// Set banner content into Next banner container
		banners.ph[arguments.ph].animeNode.bannerNext.html( banners.getBannerContent( arguments.bannerId ) );
		banners.anime(arguments);
		banners.switchAnimeNode(arguments);
	},
	// Return the banner content
	getBannerContent: function(bannerId){
		return j$("#bannerContent_" + bannerId).html();
	},
	// Make pointer to container elements for animation
	setAnimeNode: function(arguments){
		banners.ph[arguments.ph].animeNode = { containerPh: j$("#bphId_" + arguments.ph) };
		banners.ph[arguments.ph].animeNode.containerMain = j$("#bannerAnimate_" + arguments.ph);
			
		if ( banners.ph[arguments.ph].placeholderInfo.type == "CAR" ){
			banners.ph[arguments.ph].animeNode.previous = j$(".prevCarousel", banners.ph[arguments.ph].animeNode.containerPh);
			banners.ph[arguments.ph].animeNode.next = j$(".nextCarousel", banners.ph[arguments.ph].animeNode.containerPh);
		}
		
		banners.ph[arguments.ph].animeNode.bannerMain = j$(".bannerMain", banners.ph[arguments.ph].animeNode.containerPh);
		banners.ph[arguments.ph].animeNode.bannerNext = j$(".bannerNext", banners.ph[arguments.ph].animeNode.containerPh);	
	},
	// Switch between Main banner (displayed one container) and Next container as the Next always become the Main and vice versa.
	switchAnimeNode: function(arguments){
		
		banners.ph[arguments.ph].animeNode.bannerMain.addClass("bannerNext").removeClass("bannerMain");
		banners.ph[arguments.ph].animeNode.bannerNext.addClass("bannerMain").removeClass("bannerNext");
		
		banners.setAnimeNode(arguments);
	},
	// Assign default style based on ph info
	setContainerStyle: function(arguments){
		var loc = {};

		loc.phWidth = banners.ph[arguments.ph].placeholderInfo.width;
		loc.phHeight = banners.ph[arguments.ph].placeholderInfo.height;
		
		banners.ph[arguments.ph].animeNode.containerPh.addClass("carousel");
		
		if ( banners.ph[arguments.ph].placeholderInfo.type == "CAR" ){
			
			banners.ph[arguments.ph].animeNode.previous.css({ height: loc.phHeight });

			j$("img", banners.ph[arguments.ph].animeNode.previous).css({ height: loc.phHeight });
			
			loc.imgNext = j$("img", banners.ph[arguments.ph].animeNode.next);
			loc.imgNext.css({ height: loc.phHeight });

			banners.ph[arguments.ph].animeNode.next.css({ height: loc.phHeight, "margin-left": loc.phWidth - loc.imgNext.css("width").replace(/[^0-9]+/g, '') });
		} else if ( banners.ph[arguments.ph].placeholderInfo.type == "ROT" ){
			//banners.ph[arguments.ph].animeNode.containerPh.addClass("rotate");
		}
		
		if ( banners.ph[arguments.ph].transition.TYPE == "slide" ){
			banners.ph[arguments.ph].animeNode.containerPh.css({width: loc.phWidth, height: loc.phHeight});
			banners.ph[arguments.ph].animeNode.containerMain.css({width: loc.phWidth * 2, height: loc.phHeight});
		} else if ( banners.ph[arguments.ph].transition.TYPE == "fade" ) {
			banners.ph[arguments.ph].animeNode.containerPh.css({width: loc.phWidth, height: loc.phHeight});
			banners.ph[arguments.ph].animeNode.containerMain.css({width: loc.phWidth, height: loc.phHeight});
			banners.ph[arguments.ph].animeNode.bannerMain.css({ position: "absolute" });
			banners.ph[arguments.ph].animeNode.bannerNext.css({ position: "absolute" });
		}
		
		banners.ph[arguments.ph].animeNode.bannerMain.css({width: loc.phWidth, height: loc.phHeight});
		banners.ph[arguments.ph].animeNode.bannerNext.css({width: loc.phWidth, height: loc.phHeight});

	},
	setEvents: function(arguments){
		var loc = {};
		
		loc.arguments = arguments;
		
		if ( banners.ph[arguments.ph].placeholderInfo.type == "CAR" ){
			banners.ph[arguments.ph].animeNode.previous.bind("click", function(){ banners.fetchBanner({ ph:loc.arguments.ph, navigate:0 }) });
			banners.ph[arguments.ph].animeNode.next.bind("click", function(){ banners.fetchBanner({ ph:loc.arguments.ph, navigate:1 }) });
		} else if ( banners.ph[arguments.ph].placeholderInfo.type == "ROT" ){
			loc.arguments.navigate = 1;
			setInterval( function(){ banners.fetchBanner(loc.arguments) }, parseInt( banners.ph[arguments.ph].transition.INTERVAL ) );
		}
	},
	// Anime the banners
	anime: function(arguments){
		var loc = {};

		loc.arguments = arguments;
		
		if ( banners.ph[arguments.ph].transition.TYPE == "slide" ){
			banners.ph[arguments.ph].isMoving = true;
			banners.moveNextContainer(arguments);
			if ( arguments.navigate == 0 ){
				banners.ph[arguments.ph].animeNode.containerMain.animate({left: '+=' + banners.ph[arguments.ph].placeholderInfo.width}, 500, "easeOutExpo", function(){ banners.ph[loc.arguments.ph].isMoving = false; } );
			} else {
				banners.ph[arguments.ph].animeNode.containerMain.animate({left: '-=' + banners.ph[arguments.ph].placeholderInfo.width}, 500, "easeOutExpo", function(){ banners.ph[loc.arguments.ph].isMoving = false; } );
			}
		} else if ( banners.ph[arguments.ph].transition.TYPE == "fade" ){
			banners.ph[arguments.ph].isMoving = true;
			
			banners.ph[arguments.ph].animeNode.bannerNext.fadeIn(750, function(){ banners.ph[loc.arguments.ph].isMoving = false; });
			banners.ph[arguments.ph].animeNode.bannerMain.fadeOut(750, function(){ banners.ph[loc.arguments.ph].isMoving = false; });
			
		}
	},
	// 
	moveNextContainer: function(arguments){
		var loc = {};
		
		loc.startPos = "0px";
		
		loc.float = j$("div.bannerMain", banners.ph[arguments.ph].animeNode.containerMain).css('float');
		loc.mainContainerLeftPos = banners.ph[arguments.ph].animeNode.containerMain.css('left');
		
		loc.moveLeftTo = loc.startPos;
		loc.doFloatSwitch = false;
		
		if ( arguments.navigate == 1 && loc.mainContainerLeftPos != loc.startPos ){
			// Move back main container to pos 0px
			loc.doFloatSwitch = true;
			
		} else if ( arguments.navigate == 0 && loc.mainContainerLeftPos == loc.startPos ){
			
			loc.moveLeftTo = banners.ph[arguments.ph].placeholderInfo.width * -1 + "px";
			loc.doFloatSwitch = true;
		}
			
		if ( loc.doFloatSwitch ){
			if ( loc.float.toLowerCase() == "left" )
				loc.nextFloat = "right";
			else
				loc.nextFloat = "left";
			
			banners.ph[arguments.ph].animeNode.containerMain.css({left: loc.moveLeftTo});
			
			// Make banner div float invert to keep position on main ph container.
			j$("div.bannerMain, div.bannerNext", banners.ph[arguments.ph].animeNode.containerMain).css({float: loc.nextFloat});
		}
	}
};

