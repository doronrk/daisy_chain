var ProductScroller = function(cfg)
{
	ProductScroller.ie6 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5)) == 6;	
	ProductScroller.ie7 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5)) == 7;	
	ProductScroller.isIE = Prototype.Browser.IE;
	if (this.exists(cfg.node))
	{
		this.widget = cfg.node;
		this.content = this.widget.down('.mbContent');
		this.canvas = this.widget.down('.mbCanvas');
		this.controls = { 'next' : [], 'previous' : [] };
		var mask = this.content.down('.mbMask'),
			items = this.canvas.childElements();
		
		this.numItems = items.length;
		this.vertical = this.widget.hasClassName('mbVertical');
		this.multi = this.exists(cfg.multi) && cfg.multi === true ? true : false;
		this.animate = this.exists(cfg.animate) && cfg.animate !== true ? false : true;
		this.hasControls = (!this.vertical || this.vertical && this.exists(cfg.controls) && cfg.controls !== false) ? true : false;
		this.needsControls = false;
		this.index = 0;
		this.clickUrls = cfg.clickUrls;
		this.canvasVisible = false;
		
		var originalMaskWidth = this.extract(mask, 'width'),
			originalMaskHeight = this.extract(mask, 'height');
		
		this.canvas.setStyle({
			'display' : 'block',
			'opacity' : 0
		});
		
		if (this.animate && this.hasControls)
		{
			this.canvasAnimation = new Df.Animate(this.canvas);
			this.canvasAnimation.pars.onComplete = this.reset.bind(this);
		}
		
		var itemDims = this.getItemDims(items, cfg.perDisplay);
		
		if (this.numItems > 0)
		{
			if (this.vertical)
			{
				if (this.hasControls)
				{
					this.widgetResizer = new Df.Animate(mask);
					var maxVisibleResults, newMaskHeight;
					if(!!cfg.perDisplay){
						maxVisibleResults = cfg.perDisplay;
						newMaskHeight = itemDims.screenHeights[0];
						this.screenHeights = itemDims.screenHeights;
					}else{
						maxVisibleResults = Math.floor(originalMaskHeight / itemDims.h);
						newMaskHeight = maxVisibleResults * itemDims.h;
					} 
					this.widgetResizer.pars.height = newMaskHeight + 'px';

					this.content.setStyle({
						'width' : mask.getWidth() + 'px'
					});
					
					mask.setStyle({
						'width' : itemDims.w + 'px'
					});
					
					this.maxIndex = this.multi
						? this.numItems % maxVisibleResults === 0
							? this.numItems / maxVisibleResults - 1
							: Math.floor(this.numItems / maxVisibleResults)
						: this.numItems - maxVisibleResults;
					
					this.calculate = function() {
						if(!!this.screenHeights){
							var totalHeight = 0;
							for(var i=0; i<this.index; i++){
								totalHeight += this.screenHeights[i];
							}
							return totalHeight; 
						}
						return this.index * (this.multi ? newMaskHeight : itemDims.h);
					};
					
					this.needsControls = this.numItems > maxVisibleResults ? true : false;
				}
				else
				{
					this.widget.addClassName('mbNoControls');
					
					mask.setStyle({
						'width' : itemDims.w + 'px'
					});
					
					this.showCanvas();
				}
			}
			else
			{
				this.widgetResizer = new Df.Animate(this.content);
				var maxVisibleResults = Math.floor(originalMaskWidth / itemDims.w),
					newMaskWidth = maxVisibleResults * itemDims.w;
					
				mask.setStyle({
					'width' : originalMaskWidth + 'px'
				});
				
				this.widgetResizer.pars.height = this.canvas.getStyle('height');
				
				mask.setStyle({
					'marginLeft' : (this.content.getWidth() - newMaskWidth - this.extract(this.content, 'paddingLeft') * 2) / 2 + 'px',
					'width' : newMaskWidth + 'px'
				});
				
				this.maxIndex = this.multi
					? this.numItems % maxVisibleResults === 0
						? this.numItems / maxVisibleResults - 1
						: Math.floor(this.numItems / maxVisibleResults)
					: this.numItems - maxVisibleResults;
				
				this.calculate = function() { return this.index * (this.multi ? newMaskWidth : itemDims.w); };
				
				this.needsControls = this.numItems > maxVisibleResults ? true : false;
			}
			
			if (this.hasControls)
			{
				this.canvas.setStyle({
					'display' : 'none'
				});
			}
			
			if (!Object.isUndefined(this.widgetResizer))
			{
				if(ProductScroller.isIE){
					this.canvas.setStyle({
						'marginLeft' : '0px'
					});
				}
				this.widgetResizer.pars.onComplete = this.showCanvas.bind(this);
				
				this.widgetResizer.run();
				this.widgetResizer.pars.onComplete = function(){};
				
				this.date1 = new Date();
				
				// this addresses the issue that sometime the onComplete event from the
				// widgetResize animation would not fire, therefore the showCanvas method
				// was never called.  Now, I force execution of the showCanvas method
				// after a second if it has not already been called.
				var to = setTimeout(function(){
					if (!this.canvasVisible)
					{
						this.showCanvas();
					}
				}.bind(this), 1000);
			}
		}
	}
};

ProductScroller.prototype.showCanvas = function()
{
	this.canvasVisible = true;
	
	this.canvas.setStyle({
		'display' : 'block'
	});
	
	var canvasFadeIn = new Df.Animate(this.canvas);
	canvasFadeIn.pars.opacity = 1;
	canvasFadeIn.pars.onComplete = function()
	{
		if (this.needsControls)
		{
			if (!this.vertical)
			{
				for (var i = 0; i < 2; i++)
				{
					this.create(i % 2 !== 0 ? 'next' : 'previous', this.content, this.numItems);
				}
			}
			else if (this.vertical && this.hasControls)
			{
				for (var i = 0; i < 4; i++)
				{
					this.create(i % 2 !== 0 ? 'next' : 'previous', this.content, this.numItems);
				}
			}
		}
	}.bind(this);
	canvasFadeIn.run();
};

ProductScroller.prototype.create = function(dir, node, num)
{
	var anchor = $(document.createElement('a'));
		anchor.href = 'javascript:void(0);';
		anchor.innerHTML = dir;
		anchor.addClassName(
			'mbControl mb' +
			dir.substring(0, 1).toUpperCase() +
			dir.substring(1, dir.length) +
			(this.controls[dir].length > 0 ? ' mbBottom' : '')
		);
	
	var span = $(document.createElement('span'));
		span.addClassName(dir == 'previous' || num === 0 ? 'mbDisabled' : '');
	
	anchor.appendChild(span);
	node.appendChild(anchor);
	this.controls[dir].push(anchor);
	
	if (this.calculate)
	{
		anchor.observe("click", function(evt){
			evt.stop();
			
			if (!this.running)
			{
				if (dir == 'next' && this.index < this.maxIndex)
				{
					this.index++;
					
					if (this.index === 1)
					{
						this.toggle('previous', 'remove');
					}
					
					if (this.index === this.maxIndex)
					{
						this.toggle('next', 'add');
					}
					
					this.transition();
				}
				else if (dir == 'previous' && this.index > 0)
				{
					this.index--;
					
					if (this.index === 0)
					{
						this.toggle('previous', 'add');
					}
					
					if (this.index === this.maxIndex - 1)
					{
						this.toggle('next', 'remove');
					}
					
					this.transition();
				}
			}
		}.bind(this));
	}
};

ProductScroller.prototype.toggle = function(dir, action)
{
	this.controls[dir].each(function(control){
		control.down('span')[action + 'ClassName']('mbDisabled');
	});
};

ProductScroller.prototype.transition = function()
{
	this.running = true;
	this.widget.addClassName('mbProgress');
	
	var val = this.calculate() * -1 + 'px',
		dir = this.vertical ? 'Top' : 'Left';
	
	if(this.vertical){
		this.widgetResizer.pars.height = this.screenHeights[this.index] + 'px';
		this.widgetResizer.run();
		if(ProductScroller.ie6){
			screenHeight = this.screenHeights[this.index];
			$$('.mbNext.mbBottom, .mbPrevious.mbBottom').each(function(ele){
				ele.setStyle({top: (screenHeight + 40) + 'px'});
			});
		}
	}
	
	if (this.animate && !(Prototype.Browser.IE && this.vertical))
	{
		this.canvasAnimation.pars['margin' + dir] = val;
		this.canvasAnimation.run();
	}
	else
	{
		var obj = {};
		obj['margin' + dir] = val;
		
		this.canvas.setStyle(obj);
		
		this.reset();
	}
};

ProductScroller.prototype.reset = function()
{
	this.running = false;
	
	this.widget.removeClassName('mbProgress');
};

ProductScroller.prototype.exists = function(obj)
{
	if (!Object.isUndefined(obj) && obj != null)
	{
		return true;
	}
	
	return false;
};

ProductScroller.prototype.getItemDims = function(items, perDisplay)
{
	var dims = { w : 0, h : 0, screenHeights : [] }, itemIndex = 0, screenIndex = 0;
	
	items.each(function(item){
		var itemDims = item.getDimensions(),
			w = itemDims.width,
			h = itemDims.height;
		
		if (w > dims.w)
		{
			dims.w = w;
		}
		
		if (h > dims.h)
		{
			dims.h = h;
		}
		if(!!perDisplay){
			if(itemIndex < perDisplay){
				dims.screenHeights[screenIndex] = !!dims.screenHeights[screenIndex] ? dims.screenHeights[screenIndex] + h : h;
				itemIndex++;
			}
			if(itemIndex == perDisplay){
				screenIndex++;
				itemIndex = 0;
			}
		}
	});
	
	items.each(function(item, i){

		item.setStyle({
			'height' : this.vertical && !this.hasControls ? 'auto' : dims.h - this.extract(items[0], 'paddingTop') - this.extract(items[0], 'paddingBottom') + 'px',
			'width' : dims.w - this.extract(items[0], 'paddingLeft') - this.extract(items[0], 'paddingRight') + 'px'
		});
		
		item.observe("click", function(evt){
			var target = evt.element();
			
			if ((target.nodeName.toLowerCase() == 'a' || (target.nodeName.toLowerCase() == 'img' && target.parentNode.nodeName.toLowerCase() == 'a')) && typeof this.clickUrls[i] != 'undefined')
			{
				var iframe = document.createElement("iframe");
					iframe.frameBorder = 0;
					iframe.height = 1;
					iframe.width = 1;
					iframe.src = this.clickUrls[i];
				
				document.body.appendChild(iframe);
			}
		}.bind(this));
	}.bind(this));
	
	return dims;
};

ProductScroller.prototype.extract = function(node, prop)
{
	return node.getStyle(prop).replace(/px/gi, '');
};