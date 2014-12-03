makePixelRequest("http://ad.doubleclick.net/activity;src=4265209;type=invmedia;cat=gwarv3nm;ord=1?", "image");
function makePixelRequest(pixelURL,pixelType){
    if(pixelType == "javascript")
    {
      document.write('<script src="'+pixelURL+'" type="text\/javascript"><\/script>');
    }
    else
    {
      var img = new Image();
      img.src = pixelURL;
    }
}