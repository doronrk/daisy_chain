function AltImagesJS()
{
	this.colors = null
	this.productId= null;
	this.schemePrefix = window.parent.document.location.protocol;
	this.urlStart = this.schemePrefix+"//shoptommy.scene7.com/is/image/ShopTommy/";
	this.altImageEnd = "?wid=200&hei=200&fmt=jpeg&qlt=80%2c0&op_sharpen=1&resMode=trilin&op_usm=0.8%2c1.0%2c6%2c0&iccEmbed=0";
	this.hoverImageEnd = "?wid=1500&hei=1500&fmt=jpeg&qlt=100%2c0&op_sharpen=1&resMode=trilin&op_usm=0.8%2c1.0%2c6%2c0&iccEmbed=0";
	this.fullImageEnd = "?wid=530&hei=530&fmt=jpeg&qlt=100%2c0&op_sharpen=1&resMode=trilin&op_usm=0.8%2c1.0%2c6%2c0&iccEmbed=0";
	this.imagesReady = 0;
	this.imagesProcessed = 0;
	this.altLinks =[];
	this.showOtherColors = true;
	this.showFNT = true;
	this.metaImages = [];

	this.populate = function(colorCode)
	{
		var activeColorCode = null;
		this.imagesReady = 0;
		this.metaImages = [];
		this.imagesProcessed = 0;
		
		for(var color=0;color<this.colors.length;color++)
		{
			var colorObj=this.colors[color];
			if(colorCode && colorObj.colorCode==colorCode)
			{
				this.altLinks = this.createLinks(this.productId+"_"+colorObj.colorCode);
				this.loadAltImages();
			}
		}
	};
	
	this.update = function(colorCode)
	{
		var _this=this;
		var $product_visual_thumbnails=$('#product_visual_thumbnails');
		var load=function()
		{
			$product_visual_thumbnails.empty();
			_this.populate(colorCode);
		}
		
		if($product_visual_thumbnails.css('visibility')=='hidden') load();
		else THUtil.fadeOut($product_visual_thumbnails,load);
	}
	
	this.createLinks = function (prodSwatch)
	{
		var links = [];
		var ObFNTLink = this.buildNewLink(prodSwatch,'_FNT');
		links.push(ObFNTLink);
		var ObBCKLink = this.buildNewLink(prodSwatch,'_BCK');
		links.push(ObBCKLink);
		var ObDE1Link = this.buildNewLink(prodSwatch,'_DE1');
		links.push(ObDE1Link);
		var ObDE2Link = this.buildNewLink(prodSwatch,'_DE2');
		links.push(ObDE2Link);
		return links;
	};

	this.buildNewLink = function (prodSwatch,type){
		var newLinkVal = prodSwatch + type;		  
		return this.urlStart+newLinkVal+this.altImageEnd;
	};

	this.loadAltImages = function (){
		var max = this.altLinks.length;
		if(max > 0){
			this.LoadImage(0,max);
		}
	};

	this.replaceHover = function(image){
		return image.replace(this.altImageEnd,this.hoverImageEnd);
	};
	this.replaceFull =function(image){
		return image.replace(this.altImageEnd,this.fullImageEnd);
	};

	this.LoadImage = function(index,max){
		// if current index is lower then max element (max-1)
		
		var $cur = $('#product_visual_thumbnails');
		var _this=this;
		for (var index=0;index<max;index++)
		{
			var $prodThumbnail=$(join('<div class="prodThumbnails" index="',index,'" />'));
			$cur.append($prodThumbnail);
			var src=this.altLinks[index];
			
			var $img=$('<img id="altImage_'+index+'" index="'+index+'">');
			var hover=_this.replaceHover(src);
			var htmlToAdd ='<a href="'+hover+'" data-cloudzoom="showTitle:false ,useZoom: \'#zoom1\', image: \''+hover+'\'" class="cloudzoom-gallery"></a>';
			$prodThumbnail.append(htmlToAdd).children('a').append($img);
			
			$img.load(function()
			{
				var imgIndex=$(this).attr('index')
				_this.imagesReady = _this.imagesReady+1;
				_this.imagesProcessed++;
				_this.metaImages[imgIndex] = _this.replaceFull(this.src);
				
				if(_this.imagesProcessed >= max) _this.processAllThumbnails($cur, max);
			}).error(function()
			{
				_this.imagesProcessed++;
				if(_this.imagesProcessed >= max) _this.processAllThumbnails($cur, max);
				$(this).parents('.prodThumbnails').remove();
			}).attr('src',src);
		}
	};
	
	this.processAllThumbnails=function($cur, max)
	{
		var _this=this;
		
		$cur.each(function()
		{
			for(var i = 0;i<max;i++)
			{
				if(THUtil.isNotNull(_this.metaImages[i])) $('<meta property="og:image" content="'+_this.metaImages[i]+'" /> ').appendTo('head');
			}
		});
		
		if($('.cloud-zoom').data('CloudZoom')) $('.cloudzoom-gallery').CloudZoom();
		THUtil.fadeIn($cur);
	}
}
