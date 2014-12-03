/*
 * @Plugin Name : flyoutZoom
 * @Developed By : Kumark3@gsicommerce.com (Krishna Kumar)
 * @Date : 14th April, 2012
 * @Use : jQuery("#zoom-content").flyoutZoom({ })
 */

 window.onload = function() {   
	/* start flyoutZoom plugin no need to change any code inside function */
    jQuery.fn.flyoutZoom = function (c) { 
        this.each(function () {
			if(jQuery("img", this).attr("src").indexOf("/images/no-image")!=-1){
				return false;
			}
            this.init = function () {
                jQuery(".flyoutZoomImg", this).removeAttr("alt");
                this.imagePath = jQuery(".flyoutZoom", this).find("img.flyoutZoomImg").attr("src");
                this.h = jQuery(this).height();
                this.w = jQuery(this).width();
				this.m = "#marker";
				this.z = "#flyout-zoom";
				
                1 == jQuery(this.z).length ? jQuery(this.z, this).hide() : 
				(jQuery(this).append('<div id="flyout-zoom"><img src="' + document.orderForm.enh_0.value + '" /></div>'), 
				
				jQuery(this.z, this).css({
                    width: c.zoomWidth,
                    height: c.zoomHeight,
                    top: c.xPos,
					left:c.yPos 
                }).hide()); 
				
                0 == jQuery(this.m, this).length && jQuery(".flyoutZoom", this)
				.append('<div id="marker"><img src="' + this.imagePath + '" id="curImageZoom" /></div>');
                jQuery(this.m).css({
                    opacity: 0.99
                }).hide()
            };
            
			this.init();
			
            jQuery('.flyoutZoom').hover(function () {
				jQuery(this).find("img.flyoutZoomImg").css({
					opacity: 0.2
				});
				jQuery('#flyout-zoom').show();
				jQuery('#marker',this).show();
				//work-around for IE on product page with sliced product
				jQuery("body.product #colorSize li a").css("position", "static").children(".overlay").hide();
				//hide tags on product page
				jQuery("#colorSize > .color > .marker-container, #colorSize > .size > .marker-container").addClass("hidden");
				jQuery('#eligibility li').css('position','static');		
				ieFixes('hide');
            }, function () {
                 var e = jQuery(this).find("img.flyoutZoomImg");
                jQuery('#flyout-zoom').hide();
                jQuery('#marker',this).hide();
                e.css({
                    opacity: 0.99
                })
                //work-around for IE on product page with sliced product
                jQuery("body.product #colorSize li a").css("position", "relative").children(".overlay").show();
				jQuery('#eligibility li').css('position','relative');
				ieFixes('show');
            });
            jQuery(this).mousemove(function (b) {
			
                var d = (jQuery(this.z, this).find("img").width() - 
						jQuery(this.z, this).width()) / jQuery(this.z, this).prev().width(),
                    e = (jQuery(this.z, this).find("img").height() - 
						jQuery(this.z, this).height()) / jQuery(this.z, this).prev().height();
					
                b.pageX ? (leftPos = b.pageX - jQuery(this).offset().left, 
				topPos = b.pageY - jQuery(this).offset().top) : 
					(leftPos = window.event.clientX + document.body.scrollLeft + 
					document.documentElement.scrollLeft - jQuery(this).offset().left, 
					topPos = window.event.clientY + document.body.scrollTop + 
					document.documentElement.scrollTop - jQuery(this).offset().top);
                
				jQuery(this.m, this).css({
                    left: leftPos - jQuery(this.m, this).width() / 2,
                    top: topPos - jQuery(this.m, this).height() / 2,
                    width: jQuery(this.z, this).width() / 
					(jQuery(this.z, this).find("img").width() / jQuery(this.z, this).width()) / 1.43,
                    height: jQuery(this.z, this).height() / 
					(jQuery(this.z, this).find("img").height() / jQuery(this.z, this).height()) / 1.1
                });
                
				var b = jQuery(this.m, this).css("left"),
                    c = jQuery(this.m, this).width(),
                    f = jQuery(this.m, this).css("top"),
                    g = jQuery(this.m, this).height();
                
				jQuery("#curImageZoom", this).css({
                    left: 0 >= parseInt(b) ? 0 : parseInt(b) >= this.w - c ? -(this.w - c) : "-" + b,
                    top: 0 >= parseInt(f) ? 0 : parseInt(f) >= this.h - g ? -(this.h - g) : "-" + f,
                    position: "relative"
                });
                
				jQuery(this.z, this).find("img").css({
                    position: "relative",
                    left: -d.toFixed(2) * leftPos,
                    top: -e.toFixed(2) * topPos
                });
                
				1 > parseInt(jQuery(this.m, this).css("left")) && 
					jQuery(this.m, this).css("left", "0px");
                1 > parseInt(jQuery(this.m, this).css("top")) && 
					jQuery(this.m, this).css("top", "0px");
                parseInt(jQuery(this.m, this).css("left")) > this.w - jQuery(this.m, this).width() && 
					jQuery(this.m, this).css("left", this.w - jQuery(this.m, this).width());
                parseInt(jQuery(this.m, this).css("top")) > this.h - jQuery(this.m, this).height() && 
					jQuery(this.m, this).css("top", this.h - jQuery(this.m, this).height())
            })
        })
    };
	/* function flyoutZoom end here do not change above code */
	
	/* set style for first tab of imgButtons */
    jQuery("#productView .imgButtons:first").addClass("mlALternate");
	
	/* DOM updation for markup setup as need for flyout zoom functionality
	add a custom attribute named flyoutZoom to hold zoom (big) image */
    jQuery("#bubLyr1").find("img").wrap('<div id="zoom-content"><div class="flyoutZoom"></div></div>');
	
	 /* put the first zoom (big) image into custom attribute (flyoutzoom) */
    jQuery("#bubLyr1").find("img").addClass("flyoutZoomImg");
    jQuery("#zoom-content").wrap("<div></div>");
    jQuery("#bubLyr1 img.flyoutZoomImg").removeAttr("alt");
	
     /* added events on tab section to update the product and as well as zoom image */
	jQuery(".imgButtons").bind("click", function () {
        trusOldZoomImage = document.orderForm.enh_0.value;
        TrusCheckZoomImage()
    });
	
	/* if product (main image ) and zoom (big) image found then flyoutZoom will start working and 
		if not found, will throw a error with a message ("Problem With Loading Zoom Image") */
    try { 
		if ("undefined" != document.orderForm.enh_0.value || null != document.orderForm.enh_0.value) {
        document.orderForm.enh_0.value && document.orderForm.enh_0.value.indexOf('enh-z6') > -1 && jQuery("#zoom-content").flyoutZoom({
            zoomWidth: 330,
            zoomHeight: 470,
			yPos:510,
			xPos:20
        })
    } else {
        if ("undefined" == document.orderForm.enh_0.value || null == document.orderForm.enh_0.value) {
            throw "Problem With Loading Zoom Image";
        }
    }
	} catch (e){} 
}

/* TrusCheckZoomImage is the function to check that image is available 
	and set the updated image into the flyout zoom functionality*/
function TrusCheckZoomImage() {
    trusOldZoomImage == document.orderForm.enh_0.value ? setTimeout(function () {
        TrusCheckZoomImage()
    }, 500) : jQuery("#flyout-zoom").find("img").attr("src", document.orderForm.enh_0.value);
    jQuery("#marker").find("img").attr("src", jQuery(".flyoutZoom").find("img.flyoutZoomImg").attr("src"))
};

function ieFixes(state){
	if(navigator.userAgent.toLowerCase().indexOf('msie')>-1){
		if(state=="hide"){
			jQuery('.facebook-like,.pinterest').css('visibility','hidden');
		}
		else{
			jQuery('.facebook-like,.pinterest').css('visibility','visible');
		}
	}
}