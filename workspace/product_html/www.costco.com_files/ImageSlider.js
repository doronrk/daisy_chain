RICHFX.prototype.ImageSlider = function( elem, slideLeftID, slideRightID, slideImagesID, slideContainerID, slideSpeed, slideThumbnailsNum ) {

	var activeImage = false;
	
	var imageGalleryObj = document.getElementById(slideImagesID);
	var arrowLeftObj = document.getElementById(slideLeftID);
	var arrowRightObj = document.getElementById(slideRightID);
	var slideEndObj = document.getElementById('slideEnd');
	var slideContainerObj = document.getElementById(slideContainerID);
		
	// Update width based on number of images ....
	var slideshowImages = imageGalleryObj.getElementsByTagName('img');
	
	var imageCount = slideshowImages.length;
	
	if ( imageCount > parseInt(slideThumbnailsNum) ) imageCount = parseInt(slideThumbnailsNum);
	
	var newWidth = (arrowLeftObj.offsetWidth + arrowRightObj.offsetWidth) + ( slideshowImages[0].width * imageCount);
	slideContainerObj.style.width = newWidth + 'px';
	
	var imageGalleryLeftPos = imageGalleryObj.offsetLeft;
	
	var imageGalleryWidth = parseInt(slideContainerObj.offsetWidth) - (parseInt(arrowLeftObj.offsetWidth) + parseInt(arrowRightObj.offsetWidth));
	var maxGalleryXPos = parseInt(imageGalleryObj.offsetLeft); 
	var minGalleryXPos = maxGalleryXPos - parseInt(slideEndObj.offsetLeft) + imageGalleryWidth;
	
	var imageGalleryCaptions = new Array();
	var localSlideSpeed = 0;
	
	var gallerySlideTimer = undefined;
	var gallerySlideTimerExists = false;
	
	this.ImageSlider.arrow_right_on_handler = function( e, elem ){
		
		this.ImageSlider.gallerySlide();
		
		/*
		var arrowLeftObj = document.getElementById(slideRightID);
		slideSpeedMultiply = Math.floor((e.clientX - arrowRightObj.offsetLeft) / 5);
		slideSpeed = -1*slideSpeedMultiply;
		slideSpeed = Math.max(-10,slideSpeed);
		*/
		localSlideSpeed = -(parseInt(slideSpeed));
	}
	
	this.ImageSlider.arrow_right_off_handler = function( e, elem ){
		clearTimeout(gallerySlideTimer);
		gallerySlideTimerExists = false;
		localSlideSpeed = 0;
	}
	
	this.ImageSlider.arrow_left_on_handler = function( e, elem ){
		
		this.ImageSlider.gallerySlide();
		
		/*
		var arrowLeftObj = document.getElementById(slideLeftID);
		slideSpeedMultiply = 10 - Math.floor((e.clientX - arrowLeftObj.offsetLeft) / 5);
		slideSpeed = 1*slideSpeedMultiply;
		slideSpeed = Math.min(10,slideSpeed);
		slideSpeed = Math.abs(slideSpeed); // ensure a positive value
		*/
		if ( this.isFirefox ) {
			// For some reason firefox is slower to scroll in the left direction
			localSlideSpeed = parseInt(slideSpeed) + 2;
		} else {
			localSlideSpeed = parseInt(slideSpeed);
		}
	}

	this.ImageSlider.arrow_left_off_handler = function( e, elem ){
		clearTimeout(gallerySlideTimer);
		gallerySlideTimerExists = false;
		localSlideSpeed = 0;
	}
	
	this.ImageSlider.arrow_right_click_handler = function( e, elem ){
	
		var leftPos = imageGalleryObj.offsetLeft;
		leftPos -= (slideshowImages[0].width + 2);
		
		executeClick(leftPos);
	}
	
	this.ImageSlider.arrow_left_click_handler = function( e, elem ){
		
		var leftPos = imageGalleryObj.offsetLeft;	
		leftPos += (slideshowImages[0].width + 2);
		
		executeClick(leftPos);
	}
	
	executeClick = function(leftPos)
	{
		var imageGalleryObj = document.getElementById(slideImagesID);
		
		arrowLeftObj.className = 'RFXActive';
		arrowRightObj.className = 'RFXActive';
		
		if( leftPos > maxGalleryXPos ) {
			leftPos = maxGalleryXPos;
			arrowLeftObj.className = 'RFXInactive';
		}
		if( leftPos < minGalleryXPos ) {
			leftPos = minGalleryXPos;
			arrowRightObj.className = 'RFXInactive';
		}
			
		imageGalleryObj.style.left = leftPos + 'px';
	}
	
	this.ImageSlider.gallerySlide = function()
	{
		if ( gallerySlideTimerExists == true ) clearTimeout(gallerySlideTimer);
	
		if( localSlideSpeed != 0 ) {
			var imageGalleryObj = document.getElementById(slideImagesID);
			var leftPos = parseInt(imageGalleryObj.offsetLeft);
			
			leftPos += parseInt(localSlideSpeed);
			
			arrowLeftObj.className = 'RFXActive';
			arrowRightObj.className = 'RFXActive';
			
			if ( leftPos > maxGalleryXPos ) {
				leftPos = maxGalleryXPos;
				arrowLeftObj.className = 'RFXInactive';
			}
			if ( leftPos < minGalleryXPos ) {
				leftPos = minGalleryXPos;
				arrowRightObj.className = 'RFXInactive';
			}
			
			imageGalleryObj.style.left = parseInt(leftPos) + 'px';
		}
		
		gallerySlideTimer = RICHFX.setTimeout( this.gallerySlide, 20, this );
		gallerySlideTimerExists = true;
	}
}