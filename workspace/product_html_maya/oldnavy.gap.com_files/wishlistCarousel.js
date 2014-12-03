
var wishlistCarousel = {
    
    model : {

        lastSlide : 0,
        CIID : '9027458',
        isInserted : false
    },

    controller : {

        init : function(){      

          wishlistCarousel.view.insertHTML();

          //Start after preload is done
          // jQuery(document).on("wishlist-preload:done",wishlistCarousel.view.showFirstSlide);

          wishlistCarousel.controller.preloadThenStart(); //calls showFirstSlide after preload finishes

          jQuery(".next-button").off('click').on('click',wishlistCarousel.controller.goToNextSlide);
      
        },

        preloadThenStart : function(){

            var imgs = ['slide1.png','slide2.png','slide3.png'];

            for(i=0;i<imgs.length;i++){
                var temp = new Image();
                temp.src = "/Asset_Archive/ONWeb/content/0009/108/649/assets/" + imgs[i];
                if(i == (imgs.length - 1)){
                    jQuery(document).trigger("wishlistCarousel:started");
                    wishlistCarousel.view.showFirstSlide();
                }
            }
        },

        goToNextSlide : function(){

            var model = wishlistCarousel.model;

            if(model.lastSlide == 0){
                wishlistCarousel.model.lastSlide = 1;
                wishlistCarousel.view.showSecondSlide();
            }else if(model.lastSlide == 1){
                wishlistCarousel.model.lastSlide = 2;
                wishlistCarousel.view.showThirdSlide();
            }

            var trackingLabel = 'wishlist_slide' + wishlistCarousel.model.lastSlide + '_next';
            wcdLib.trackValue(this,trackingLabel,trackingLabel,'eVar7');

            return false;
        }

    },

    view : {

        insertHTML : function(){

            var docWidth = jQuery(document).width();
            var docHeight = jQuery(document).height();

            if(!wishlistCarousel.model.isInserted){
                var htmlStr = ''
                    + '<div id="wishlist-lightbox-overlay" style="width:100%;height:' + docHeight + 'px;"></div>'
                    + '<div id="wishlist-close-button-container">X</div>'
                    + '<div id="wishlist-slide-container" style="display:none;">'
                    + '  <div class="slide">'
                    + '    <img id="loading" src="/Asset_Archive/ONWeb/content/0009/108/649/assets/loading.gif" />'
                    + '  </div>'
                    + '  <div id="slide-1" class="slide" style="display:none;">'
                    + '    <img src="/Asset_Archive/ONWeb/content/0009/108/649/assets/slide1.png" alt="Pick your favorite items from any of our brands"/>'
                    + '    <img id="step-1" style="display:none;" src="/Asset_Archive/ONWeb/content/0009/108/649/assets/step1.png" alt="Pick your favorite items from any of our brands" />'
                    + '  </div>'

                    + '  <div id="slide-2" class="slide" style="display:none;">'
                    + '    <img src="/Asset_Archive/ONWeb/content/0009/108/649/assets/slide2.png" />'
                    + '    <img id="step-2" style="display:none;" src="/Asset_Archive/ONWeb/content/0009/108/649/assets/step2.png" alt="Add them to your Wish List from the product page" />'
                    + '    <img id="step-2a" style="display:none;" src="/Asset_Archive/ONWeb/content/0009/108/649/assets/add_wishlist_button.png" alt="Add them to your Wish List from the product page" />'
                    + '  </div>'

                    + '  <div id="slide-3" class="slide" style="display:none;cursor:pointer;">'
                    + '    <img src="/Asset_Archive/ONWeb/content/0009/108/649/assets/slide3.png" alt="Email, tweet or Facebook your list to share with friends and family"/>'
                    + '    <img id="step-2" style="display:none;" src="/Asset_Archive/ONWeb/content/0009/108/649/assets/step1.png" alt="Email, tweet or Facebook your list to share with friends and family" />'
                    + '  </div>'

                    + '  <div class="nav-panel">'

                    + '    <a class="next-button off" href="#">'
                    + '        <img src="/assets/common/clear.gif" alt="next"/>'
                    + '    </a>'

                    + '    <div class="indicator-container">'
                    + '        <div class="indicator off">'
                    + '            <img src="/assets/common/clear.gif"/>'
                    + '        </div>'
                    + '        <div class="indicator off">'
                    + '            <img src="/assets/common/clear.gif"/>'
                    + '        </div>'
                    + '        <div class="indicator off">'
                    + '            <img src="/assets/common/clear.gif"/>'
                    + '        </div>'
                    + '    </div>'
                    + '  </div>'
                    + '</div>'
                    ;

                jQuery("body").append(htmlStr);
                wishlistCarousel.model.isInserted = true;
            }

            var w = 960;
            var h = 716;
            var docWidth = jQuery(document).width();
            var winHeight = jQuery(window).height();
            var leftPos = docWidth <= w ? 0 : (docWidth - w) / 2;
            var topPos = winHeight <= h ? 100 : (winHeight - h) / 2;
            
            jQuery(document).scrollTop(0);
            jQuery("#wishlist-close-button-container").css({"left" : (leftPos+20) + "px", "top" : (topPos-25) + "px"}).fadeIn();
            jQuery("#wishlist-slide-container").css({"left" : leftPos + "px", "top" : topPos + "px"}).fadeIn();

        	jQuery("#wishlist-lightbox-overlay, #wishlist-close-button-container").show().on('click',function(){
          		wishlistCarousel.view.hideWishlistCarousel('overlay');
      		});
        },

        showFirstSlide : function(){

            jQuery("#slide-2, #slide-3").hide();
            jQuery("#slide-1").show();

            wishlistCarousel.model.lastSlide = 0;

            //show step image
            var temp = setTimeout(function(){
                jQuery("#step-1").fadeIn();
            },1000);

            //turn on first indicator
            jQuery(".indicator-container").children().removeClass("on").addClass("off");
            jQuery(jQuery(".indicator-container").children()[0]).addClass("on");

            jQuery(".next-button").show();

        },

        showSecondSlide : function(){

            jQuery("#slide-1, #slide-3").fadeOut();
            jQuery("#slide-2").fadeIn();

            //show step image
            var temp = setTimeout(function(){
                jQuery("#step-2").fadeIn('fast');
                var temp = setTimeout(function(){
                	jQuery("#step-2a").show().shake(3);
            	},700);
            },700);
            
            //turn on second indicator
            jQuery(".indicator-container").children().removeClass("on").addClass("off");
            jQuery(jQuery(".indicator-container").children()[1]).addClass("on");

        },

        showThirdSlide : function(){

            jQuery("#slide-1, #slide-2").fadeOut();
            jQuery("#slide-3").fadeIn();

            //make this clickable
            jQuery("#slide-3").on("click",function(){
            	wishlistCarousel.view.hideWishlistCarousel('slide3');
            });
            jQuery(".next-button").hide();

            //turn on third indicator
            jQuery(".indicator-container").children().removeClass("on").addClass("off");
            jQuery(jQuery(".indicator-container").children()[2]).addClass("on");

        },

        hideWishlistCarousel : function(target){
        	jQuery("#wishlist-lightbox-overlay, #wishlist-slide-container, #wishlist-close-button-container").fadeOut();
        	var trackingLabel = 'wishlist_' + target + '_close';
        	wcdLib.trackValue(this,trackingLabel,trackingLabel,'eVar7');
          jQuery(document).trigger("wishlistCarousel:done");
        }
    }


};

jQuery.fn.shake = function(d) {
    this.each(function(i) {
        for (var x = 0; x < 3; x++) {
            originalLeft = jQuery(this).position().left;
            jQuery(this).animate({ left: (originalLeft - d) }, 30).animate({ left: originalLeft }, 50).animate({ left: (originalLeft + d) }, 30).animate({ left: originalLeft }, 30);
        }
    });
    return this;
} 

if(location.href.indexOf("wishlist=true") >= 0){
  jQuery(document).ready(wishlistCarousel.controller.init);
}
