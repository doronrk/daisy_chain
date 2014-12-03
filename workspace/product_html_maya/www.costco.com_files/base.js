RICHFX.prototype.base = function (  ) {
}
RICHFX.prototype.delegateComponent = function (componentName, userComponentName, old_arguments ) {
  function applyComponent() {
      
      this['component_' + componentName].apply( this, arguments );
  }
  var args = [userComponentName];
  for ( var i = 1; i < old_arguments.length; i++ ) args[args.length] = old_arguments[i];
  this.loadLibrary.apply( this, [ 'component_' + componentName, applyComponent, this ].concat( args ) );
}
RICHFX.prototype.mapComponent = function ( newname, oldname ) {
  RICHFX.prototype['component_'+newname] = function(){
    this.delegateComponent(oldname, newname, arguments);
  }
  //note: setting require is not needed because delegateComponent will load necessary library
}
with(RICHFX.prototype){
  mapComponent('enlarge', 'imageLargeView');
  mapComponent('enlargeHover', 'imageFloat');
  mapComponent('enlargePop', 'imageCloseUp');
  mapComponent('enlargeFade', 'imageCloseUpFade');
  mapComponent('zoom', 'imageZoom');
  mapComponent('zoomProgressive', 'imageFishEye');
  mapComponent('zoomDragBox', 'imageDragBox');
  mapComponent('zoomMagnifyingGlass', 'imageMagnifyingGlass');
  mapComponent('tooltip', 'overlay');
  mapComponent('Wildcard', 'wildcard');
  mapComponent('colorchange', 'imageColorChange');
  mapComponent('colorchangePanel', 'imageSwatchPanel');
}
