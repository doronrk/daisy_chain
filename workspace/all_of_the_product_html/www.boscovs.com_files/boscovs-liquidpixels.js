/**
 * 
 * @param imageName is the 
 * @param imageUrl
 * @param zoomScale
 */
function boscovsMagnifyImage(chain, imageUrl, zoomScale)
{
	zoomScale=900; /* TEMP FIX for zoom depth */
		var parseStr = "source=url["+imageUrl+"]&scale=size["+zoomScale+"]&sink";
		chain.parse(parseStr);
}

/**
 * 
 * 
 * @param imageDivName
 * @param zoomDivName
 * @param image
 * @param size
 */
function boscovsCreateMagnify(imageDivName, zoomDivName,image, size)
{
	mymagnify = new com.liquidpixels.Magnify(imageDivName, zoomDivName, image, size, { 
		touch: true, 
		zoomToPoint: true, 
		hideMousePointer: true, 
		touchZoomDelay: 251
		});	
}

/**
 * A check to turn off liquid pixels magnify.
 * Required boscovs.js to be loaded.
 * 
 * @returns {Boolean}
 */
function liquidPixelsTurnOff()
{
	var disableImageMagnify = false;
	
	if (isHandheldDevice())
	{
		disableImageMagnify = true;
	}
	else
	{
		var ieVersion = getInternetExplorerVersion();
		
		if (ieVersion >= 0 && ieVersion <= 7)
		{
			disableImageMagnify = true;			
		}
	}
	
	return disableImageMagnify;
}