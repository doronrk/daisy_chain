RICHFX.prototype.ClickLayer = function ( elem, target, events ) {
  var clickLayer;
  if (!events)
    events = { click: true };

  var mouseover_handler = function( e, elem ) {
    this.dispatchEvent(elem, 'mouseover', e);
  }

  // handle click events
  var click_handler = function ( e, elem ) {
    // IE only click
    if ( elem.click ) return elem.click();

    // dispatch a click event on the element
    this.dispatchEvent( elem, 'click' );
  }
  
  // simulate a mouse click using mouse down, move and up events
  var mouseclick_simulate_handler = function ( e, elem, target ) {
    switch ( e.type ) {
      case 'mousedown':
        this.addEvent( target, 'mousemove', mouseclick_simulate_handler, this, elem, target );
        this.addEvent( target, 'mouseup', mouseclick_simulate_handler, this, elem, target );
        break;
        
      case 'mouseup':
        click_handler.apply( this, [ e, elem ] );

      case 'mousemove':
        this.removeEvent( target, 'mousemove', mouseclick_simulate_handler, this );
        this.removeEvent( target, 'mouseup', mouseclick_simulate_handler, this );
        break;
    }
  }

  if ( events.click && target.nodeName == 'OBJECT' ) {
    // use simulated mouse click event for Flash on IE only
    // --> this is because Flash does not propagate mouse events to IE ( especially the click event! )
    target.setCapture(false);

    this.addEvent( target, 'mousedown', mouseclick_simulate_handler, this, elem, target );
  } else if (events.click) {
    this.addEvent( target, 'click', click_handler, this, elem );
  }
  
  // handle link
  if ( !this.isIE ) {
	  var node = elem;
	  do {
		if ( node.nodeName == 'A' ) {
		  if ( node.href ) {
			var linkHREF = node.href;
			var linkTarget = node.target;
			this.addEvent( elem, 'click', 
				function () {
					if ( linkHREF.indexOf('javascript:') == 0 ) {
						eval(linkHREF);
					} else if ( !linkTarget ) {
						document.location = linkHREF;
					} else {
						window.open( linkHREF, linkTarget );
					}
				},
				window
				)
		  }
		  break;
		}
	  } while( node = node.parentNode );
  }

  if (events.mouseover) {
    this.addEvent( target, 'mouseover', mouseover_handler, this, elem );
  }

  // handle cursor
  var cursor = this.getElementStyle( elem, 'cursor' );
  if ( cursor != 'auto' ) {
    target.style.cursor = cursor;
  } else if ( this.isIE ) {
    // set the cursor to pointer just for IE ( IE does not inherit cursor styles to its children when their position is aboslute )
    var node = elem;
    do {
      cursor = this.getElementStyle( elem, 'cursor' );
      if ( cursor != 'auto' ) {
        target.style.cursor = cursor;
        break;
      } else if ( node.nodeName == 'A' ) {
        target.style.cursor = 'pointer';
        break;
      }
    } while( node = node.parentNode );
  }

  return target;
}
