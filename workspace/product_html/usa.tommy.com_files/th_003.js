var THFullscreen = THFullscreen ||
{
	fullScreenContainerId:"fullscreenWrapper", 
	bgColor:null, //Default
	init:function()
	{
	    var $win = TH.$window, 
	    containerHeight = 0,
	    containerTop = 0,
	    winWidth = $win.width(), 
	    screenDiff = 0,
	    $fullScreenContainer = $("#" + THFullscreen.fullScreenContainerId),
	    $fullscreen=$('.fullscreen'),
	    o = "big", 
	    resolution = o === "small" || o === "smallish" || o === "medium", m, 
	    _init = function ()
	    {
	    	var getCurrentZoomURL=function()
	    	{
    			var $current=THFullscreen._getActiveCloudZoomGallery($('#product .prodThumbnails'));
    			if($current.length) return THFullscreen._getZoomURL($current.data('cloudzoom'));
    			else
    			{
    				var $cloudZoom=$('#product .cloud-zoom');
    				if($cloudZoom.length) return THUtil.getCloudZoomURL($cloudZoom.data('cloudzoom'));
    			}
	    	}
	    	
	    	if(THUtil.isTouch())
	    	{
	    		var $a=$('<a target="_blank" />');
	    		$a.appendTo($fullscreen.parent());
	    		$a.append($fullscreen);
	    		$a.click(function()
	    		{
	    			var imageURL=getCurrentZoomURL();
					if(imageURL)
	    			{
						var fullScreenUrl = join(THUtil.getStorePath(),'FullScreenViewMobile?storeId=',THUtil.getStoreId(),'&title=',document.title,'&imageURL=',imageURL);
						$(this).attr('href', fullScreenUrl);
	    			}
	    		});
	    	} else
	    	{
	    		$fullscreen.unbind('click').click(function(event)
		    	{
	    			var imageURL=getCurrentZoomURL();
					if(imageURL) _process(event, imageURL);
    				return false;
	    		});
	    	
	    		$fullScreenContainer.unbind('click').click(THFullscreen.close);
	    	}
	    	
	    	THFullscreen.bgColor=THUtil.BODY_BG_COLOR;
    	}, 
    	_process = function (evnt, fullWindowSource)
    	{
	    	_fetchAndLoad(evnt, fullWindowSource, function ()
	    	{
    			var $fullScrenImg = $fullScreenContainer.find(".fullscreenImg");
    			$fullScreenContainer.css({top: 0});
    			
				$fullScrenImg.fadeIn(150, function ()
				{
					var $wrapper=$fullScreenContainer.children('.wrapper');
					containerHeight = $wrapper.height();
					containerTop = $wrapper.position().top;
					screenDiff = $fullScrenImg.height() - containerHeight;
					if (!resolution)
					{
						_dance(evnt);
						$fullScrenImg.on("mousemove", _dance);
						$win.on("resize.full-window-image", _resize);
					}
				});
    			if (resolution)
    			{
    				$fullScreenContainer.find(".fullscreenImg").remove();
    				$fullScreenContainer.css({
    					background: THFullscreen.bgColor+" url('" + fullWindowSource + "') no-repeat center center", 
    					backgroundSize: "contain"
					});
    			}
    		});
    	},
    	_fetchAndLoad = function (evnt, fullWindowSource, callback)
    	{
    		var $thOverlayBG=$('<div class="thOverlayBG" />');
    		$thOverlayBG.css('background',join('#000 url("',THUtil.getAkamaiPath(),'loading.gif") no-repeat scroll 50% 50%'));
    		
    		var $fullWindowImage=$('#fullscreenWrapper');
    		$fullWindowImage.append($thOverlayBG).show();
			THUtil.disableScrolling();
			
			var $img=$('<img class="fullscreenImg" />');
			$img.wrap('<div class="wrapper" />');
			
			var $product=$('#product');
			var $prodThumbnails=$product.find('.prodThumbnails');
			var $wrapper=$img.parent();
			$wrapper.append('<div class="thOverlayCloseX"><a href="javascript:THFullscreen.close();"></a></div>');
			if(!THUtil.isBundlePage()) $wrapper.append(join('<div class="fullscreenPrice">',$product.find('.priceWrapper').html(),'</div>'));
			
			totalImages=$prodThumbnails.length;
			if(totalImages)
			{
				var checkArrows=function($next,$prev)
				{
					if(currentIndex==0) $prev.addClass('disabled');
					else $prev.removeClass('disabled');
					if(currentIndex+1==totalImages) $next.addClass('disabled');
					else $next.removeClass('disabled');
				}
				
				var currentIndex=0;
				var updateCount=function(index)
				{
					currentIndex=parseInt(index);
					$currentCount.text(currentIndex+1);
				}
				
				var $count=$(join('<div class="fullscreenCount"><span class="currentCount"></span> / ',totalImages,'</div>'));
				var $currentCount=$count.children('.currentCount');
				
				var $currentThumbnail=THFullscreen._getActiveCloudZoomGallery($prodThumbnails).parent();
				updateCount($currentThumbnail.attr('index'));
				$wrapper.append($count);
				
				if(totalImages>1)
				{
					var updateImageIndex=function($arrow)
					{
						if($arrow.hasClass('next'))
						{
							if(currentIndex+1<totalImages)
							{
								currentIndex++;
								var $next=$arrow;
								var $prev=$wrapper.find('.arrow.prev');
							} else return;
						} else
						{
							if(currentIndex-1>=0)
							{
								currentIndex--;
								var $next=$wrapper.find('.arrow.next');
								var $prev=$arrow;
							} else return;
						}
						
						checkArrows($next,$prev);
						
						var dataCloudzoom=$prodThumbnails.eq(currentIndex).children('.cloudzoom-gallery').data('cloudzoom');
						if(dataCloudzoom) $img.attr("src", THFullscreen._getZoomURL(dataCloudzoom));
					}
					
					$wrapper.append(join('<div class="arrow prev disabled"><img alt="&lt;" src="',THUtil.getAkamaiPath(),'icons/arrowPrev.png"></div>')).append(join('<div class="arrow next"><img alt="&gt;" src="',THUtil.getAkamaiPath(),'icons/arrowNext.png"></div>'));
					$wrapper.find('.arrow').click(function(event)
					{
						updateImageIndex($(this));
						updateCount(currentIndex);
						return false;
					});
					
					var $next=$wrapper.find('.arrow.next');
					var $prev=$wrapper.find('.arrow.prev');
					checkArrows($next,$prev);
				}
			}
			
			var _errorOut=function()
			{
				$img.unbind('load error');
				$fullWindowImage.children('.error').remove();
				$img.remove();
				
				$fullWindowImage.prepend($wrapper);
				$wrapper.css('background-color',THUtil.BODY_BG_COLOR).append('<div class="error">'+$fullWindowImage.data('error')+'</div>');
				
				$fullWindowImage.css('background','url(none)'); 
				if(callback instanceof Function) callback();
			};
			
			var timeoutId=setTimeout(_errorOut,10000);
			
			$img.load(function()
			{
				$img.unbind('load error');
				clearTimeout(timeoutId);
				$fullWindowImage.prepend($wrapper);
				$fullWindowImage.css('background','none');
				if(callback instanceof Function) callback();
			})
			.error(function()
			{
				clearTimeout(timeoutId);
				_errorOut();
			})
			.attr("src", fullWindowSource);
		},
		_dance = function (w)
		{
			var top=-4;
			if(screenDiff>0) top=Math.min(top,screenDiff * ((w.clientY-containerTop) / containerHeight) * - 1);
			$fullScreenContainer.find(".fullscreenImg").css("top",Math.max(top,-screenDiff));
		},
		_resize = function()
		{
			var $wrapper=$fullScreenContainer.children('.wrapper');
			containerHeight = $wrapper.height();
			containerTop = $wrapper.position().top;
			winWidth = $win.width();
			screenDiff = Math.max(0,$fullScreenContainer.find(".fullscreenImg").height() - containerHeight);
			_dance({clientY:0});
		},
		_destroy = function ()
		{
			$fullscreen.unbind('click');
			$fullScreenContainer.off("click mousemove");
		};
		
		_init();
	},
	
	_getZoomURL:function(dataCloudzoom)
	{
		return dataCloudzoom ? dataCloudzoom.replace(/^.*image\s*:\s*('|")(.*?)\1.*$/,'$2') : null;
	},
	
	_getActiveCloudZoomGallery:function($prodThumbnails)
	{
		var $currentThumbnailA=$prodThumbnails.children('.cloudzoom-gallery-active');
		return $currentThumbnailA.length ? $currentThumbnailA : $prodThumbnails.children().first();
	},
	
	close:function ()
	{
		var $fullScreenContainer=$("#" + THFullscreen.fullScreenContainerId);
		
		$fullScreenContainer.fadeOut(150, function()
		{
			$(this).empty().hide();
		}).off("load error");
		TH.$window.off("resize.full-window-image");
		THUtil.enableScrolling();
	}
}
