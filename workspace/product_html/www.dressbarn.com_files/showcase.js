/**
 * Showcase display for the product with diferent thumbnails and zoom
 * 
 * @param {Object} div    The target div
 * @param {Object} images The images that will be used
 */
var Showcase = 
    function(div, images, color, item, use_carousel)
    {
        /**
         * Properties
         */
        this.target       = YAHOO.util.Selector.query(div)[0];
        this.source       = images;
        this.rel          = 900 / 275;
        this.opacity_high = 0.5;
        this.opacity_low  = 0;
        this.carousel     = false;
        this.color        = color;
        this.item         = typeof(item) == 'undefined' ? false : item; 
        
        this.normal_size  = 'large';
        this.overlay_size = 'large';
        this.zoom_size    = 'xlarge';
        this.thumb_size   = 'xsmall';

        /**
         * Methods
         */
        this.render = function()
            {
                // Render the divs and the images preloader is posible, future?
                var index, images, arr, head = '<div class="showcase"><div class="zoom">', numPages, temp, first, content='';
                
                // Bug fix for combo boxes showing where they don't have to show on IE6... don't ask
                if(YAHOO.env.ua.ie == 6){
                	head += '<iframe class="zoomIframe" frameborder="0"></iframe>';
                }
                
                // Continue to generate the markup
                if(YAHOO.env.ua.ie==10){
                	head +='<img src="" class="zoomArea" /></div><div class="overlay"><div class="tint" style="opacity:0"></div><div class="inzone"><img itemprop="image" src="" class="big" /></div></div><div class="rolltext" id="rolltext">roll on to zoom in</div>';
                }else{
                	head +='<img src="" class="zoomArea" /></div><div class="overlay"><div class="tint"></div><div class="inzone"><img itemprop="image" src="" class="big" /></div></div><div class="rolltext" id="rolltext">roll on to zoom in</div>';
                }
                
                if (use_carousel) 
                {
                    head += '<div class="carousel_back">';
                    head += '	<a href="#"><img src="/images/arrow-back.gif" /></a>';
                    head += '</div>';                    
                    head += '<div class="view-large-container">';
                    head += '  <span class="label-zoom-button">roll over image to zoom</span>';                    
                    head += '</div>';
                    head += '<div id="cont_thumbs" class="thumbs">';
                    head += '  <ol>';
                    
                    images = this.source[this.color][this.thumb_size];
                    
                    first=-1;
                    for(index in images) {
                        if(first==-1)
                            first=index;
                        content += '<li id="thumb_' + index +'" ><img src="' + images[index] + '" /></li>';
                    }
                    content += '<li id="view_larger">';
                    content += '<a rel="nofollow" onclick="window.open(this.href,this.target,\'width=750,height=753,toolbar=no,scrollbars=no\')" target="popup" href="/viewLarger?item='+encodeURIComponent(this.item)+'&color='+encodeURIComponent(this.color)+'">';
                    content += '<img src="/images/view_larger_image_btn.gif"/></a></li>';
                    content += '</ol></div><div class="carousel_next"><a href="#"><img src="/images/arrow-next.gif" /></a></div>';
                }
                else
                {
                    // todo: should we hardcore 'front' key?
                    first = 'front';
                }
                
                content += '<br style="clear:both;"/></div>';
                content = head + content;
                
                // Markup generated, time to show it on the actual page
                this.target.innerHTML = content;
                
                // Set some styles
                if(YAHOO.env.ua.ie!=10){
                	YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.overlay .tint', this.target), 'opacity', this.opacity_low);
                }
                
                this.change(first);
                
                // Set up the carousel
                if (use_carousel) 
                {
                    this.carousel = new YAHOO.widget.Carousel('cont_thumbs');
                    this.carousel.set('numVisible', 4);
                    this.carousel.set('animation', { speed: 0.5 });
                    this.carousel.set('isCircular', true);
                    this.carousel.render();

                    // Validate that the next page button is shown only when more than 1 page exists
                    numPages = this.carousel.get('numPages');
                    if(numPages <= 1) {
                        YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.carousel_next', this.target), 'display', 'none');
                        YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.carousel_back', this.target), 'display', 'none');
                    }
                    YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.thumbs ol', this.target), 'height', '94px');

                    // Register the click on the thumbnails
                    this.carousel.on('itemSelected',
                            function(el, _parent)
                            {   
                    			var item = this.getElementForItem(el).id.split('_').pop();
                            	
                    			//Google Event Tracker function
                    			trackingEventPDPAlternateView(item_desc,item);
                    			
                    			if (item != 'larger'){
                                	_parent.change(item);	
                            	}
                                
                            }, this);
                
                    // Register the next page on the carousel
                    YAHOO.util.Event.addListener(YAHOO.util.Selector.query('.carousel_next a', this.target), 'click',
                    		function(el, _parent)
                    		{
                    			var i=0, item = 0, last;
                    			_parent.carousel.scrollPageForward();
                    			YAHOO.util.Event.preventDefault(el);
                    		}, this);

                    // Register the prev page on the carousel
                    YAHOO.util.Event.addListener(YAHOO.util.Selector.query('.carousel_back a', this.target), 'click',
                            function(el, _parent)
                            {
                                var i=0, item = 0, last;
                                _parent.carousel.scrollPageBackward();
                                YAHOO.util.Event.preventDefault(el);
                            }, this);
                }

                // Register the mouseover event
                YAHOO.util.Event.addListener(YAHOO.util.Selector.query('.overlay', this.target), 'mousemove',
                		function(el, _parent)
                		{
                	        // Preselect everything that is going to be used more than once for performance reasons
                	  		// as YUI is not that fast for that.
                			var target = YAHOO.util.Selector.query('.overlay .inzone', _parent.target)[0],
            			    	evSource = YAHOO.util.Selector.query('.overlay', _parent.target)[0],
                			    dim = YAHOO.util.Dom.getXY(evSource), l, t, force = false,
                			    image = YAHOO.util.Selector.query('.big', _parent.target)[0], temp,
                			    zoom = YAHOO.util.Selector.query('.zoomArea', _parent.target)[0],
                                th,tw,zh,zw;
                			
                			// Check if the overlay is hidden, if it is then unhide it
                			if(YAHOO.util.Dom.getStyle(target, 'visibility') == 'hidden') {
	                			
                				if(YAHOO.env.ua.ie!=10){
                					YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.overlay .tint', _parent.target), 'opacity', _parent.opacity_high);
                				}else{
                					YAHOO.util.Selector.query('.overlay .tint')[0].style.opacity = _parent.opacity_high;
                				}
	                			
	                			YAHOO.util.Dom.setStyle(target, 'visibility', 'visible');
                                YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.zoom', _parent.target)[0], 'left', (YAHOO.util.Dom.getX(evSource) + evSource.offsetWidth + 10) + 'px');
                                YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.zoom', _parent.target)[0], 'visibility', 'visible');
                                YAHOO.util.Selector.query('#rolltext', _parent.target)[0].innerHTML = 'roll off to zoom out';
                			}
                			
                			// Get the offset for the select box
                			if(el.pageX || el.pageY) { // this works for anything that it's not IE
                				l = el.pageX - dim[0];
                				t = el.pageY - dim[1];
                			} else { // this is for IE6... don't ask
                				l = el.clientX - dim[0] + document.body.scrollLeft + document.documentElement.scrollLeft;
                				t = el.clientY - dim[1] + document.body.scrollTop + document.documentElement.scrollTop;
                			}
                			
                            // Try to get the proper values
                            th = target.offsetWidth;
                            tw = target.offsetHeight;
                            zh = zoom.offsetHeight;
                            zw = zoom.offsetWidth;
                            
                            // Check if the box needs to be moved horizontally
                            temp=-1;
                            if(l<tw/2)
                                temp=0;
                            else if(l > (evSource.offsetWidth - tw/2))
                                temp=evSource.offsetWidth-tw;
                            else
                                temp = l - tw/2;
                            if (temp >= 0) {
                                YAHOO.util.Dom.setStyle(target, 'left', temp + 'px');
                                YAHOO.util.Dom.setStyle(image, 'left', ((temp + 2) * -1) + 'px');
                                YAHOO.util.Dom.setStyle(zoom, 'left', (((zoom.offsetWidth / evSource.offsetWidth) * temp * -1) - 10) + 'px');
                            }
                			
                            // Check if the box needs to be moved vertically
                            temp=-1;
                            if(t<th/2)
                                temp=0;
                            else if(t > (evSource.offsetHeight - th/2))
                                temp=evSource.offsetHeight - th;
                            else
                                temp = t - th/2;
                            if(temp>=0) {
                                YAHOO.util.Dom.setStyle(target, 'top', temp + 'px');
                                YAHOO.util.Dom.setStyle(image, 'top', ((temp + 2) * -1) + 'px');
                                YAHOO.util.Dom.setStyle(zoom, 'top', (((zoom.offsetHeight / evSource.offsetHeight) * temp * -1) - 10) + 'px');
                            }
                		}, this);
                
                YAHOO.util.Event.addListener(YAHOO.util.Selector.query('.overlay', this.target), 'mouseout',
                		function(e, _parent)
                		{
                            if (!e) var e = window.event;
                            var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
                            
                            if (YAHOO.util.Dom.isAncestor(this, reltg)) return;
                            
                            if(YAHOO.env.ua.ie!=10){
                            	YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.tint',   _parent.target)[0], 'opacity', '0');
                            }else{
                            	YAHOO.util.Selector.query('.overlay .tint')[0].style.opacity = "0";
                            }
                            
                            
            								YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.inzone', _parent.target)[0], 'visibility', 'hidden');
            								YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.zoom',   _parent.target)[0], 'visibility', 'hidden');
                            YAHOO.util.Selector.query('#rolltext',  _parent.target)[0].innerHTML = 'roll on to zoom in';
                            
                		}, this);

            };
        
        // Change the current big picture
        this.change = function(who)
            {
                YAHOO.util.Selector.query('.big', this.target)[0].src = this.source[this.color][this.normal_size][who];
                YAHOO.util.Dom.setStyle(YAHOO.util.Selector.query('.overlay', this.target), 'background-image', 'url(' + this.source[this.color][this.overlay_size][who] + ')');
                YAHOO.util.Selector.query('.zoomArea', this.target)[0].src = this.source[this.color][this.zoom_size][who];
            };
        
        // Switch the color
        this.switchColor = function(newColor)
            {                
                this.color = newColor;
                this.render();
            };
        
        this.getCurrent = function()
            {
                return {'item': this.item, 'color': this.color};
            };
            
        this.render();
    };