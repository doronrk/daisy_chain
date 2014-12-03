RICHFX.prototype.DecodeMedia = function( elem ) {
  var imageSource;
  if ( typeof(elem) == 'string' ) {
    imageSource = elem;
  } else {
    imageSource = elem.src || '';
  }
  if (RICHFX_CONFIG.decodeMedia)
    if (RICHFX_CONFIG.decodeMedia.preprocess)
      imageSource = RICHFX_CONFIG.decodeMedia.preprocess.apply(this,[imageSource]);

  // media ID is in the form of
  // http://host/...../<mediaID>.jpg
  var tmp = imageSource.split('/');
  // <mediaID>.jpg
  var fileName = tmp.pop();
  var mediaID = fileName.substr(0, fileName.lastIndexOf('.'));
  
  var zoomMediaPattern = /FirstFrame|DisplayImage|level_\d\d/i;
  if ( zoomMediaPattern.test( mediaID ) ) mediaID = tmp.pop();

  return mediaID;
}
