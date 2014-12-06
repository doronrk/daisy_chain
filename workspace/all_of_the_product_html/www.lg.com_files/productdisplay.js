lg.ProductDisplay = lg.Component.extend({
    init: function (b, a) {
        this._super(b, a);
        this._build()
    },
    timerInt: 0,
    _build: function () {
        $(".link-360").click(function () {
            var a = $(".product-carousel .carousel").data("carousel");
            a.handleRollovers($("#button360").get(0), "start");
            return false
        });
        $(this.element).delegate(".carousel li", "click", function () {
            var a = $(this).index(),
                b = $(this.element).find(".pane").eq(a);
            lg.addImages(b)
        });

		/* LGERU-768 : 20130221 add, LGERU-1402 20140311 modify */
		if(lg.locale=='/ru'){
			 if ($('a.wtb-googleTrack').length > 0) {
				if ($.browser.webkit) {
					$('a.wtb-googleTrack').each(function(){
						var url =$(this).attr('href');
						var _modelName = url.substring(url.lastIndexOf("=")+1);
						var _categoryName = $('body').find('input[name=categoryName]').val();

						$(this).bind('click', function(e){
							e.preventDefault();
							_gaq.push(['_setAccount', 'UA-35438634-1']);
							_gaq.push(['_trackEvent', _categoryName, 'Click', _modelName]);

							setTimeout(function() {location.href = url}, 300);
						});
					});

				}else{
					$(document).on("click", "a.wtb-googleTrack", this.element, function(a){
						var url =$(this).attr('href');
						var _modelName = url.substring(url.lastIndexOf("=")+1);
						var _categoryName = $('body').find('input[name=categoryName]').val();

						_gaq.push(['_setAccount', 'UA-35438634-1']);
						_gaq.push(['_trackEvent', _categoryName, 'Click', _modelName]);

						setTimeout(function() {location.href = url}, 400);

					},this);
				}
			}
		}
		/* //LGERU-768 : 20130221 add, LGERU-1402 20140311 modify */

    }
});
lg.plugin("productdisplay", lg.ProductDisplay, "#product-display");