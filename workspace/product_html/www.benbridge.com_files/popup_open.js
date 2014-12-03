/*
$Id: popup_open.js,v 1.30 2009/05/05 11:33:32 max Exp $
vim: set ts=2 sw=2 sts=2 et:
*/

/*
  Popup window class
*/

var _popup = false;

/* Popup factory (singlton-based) */
function popupOpen(src, title) {
	if (!_popup)
		_popup = new popupLayer();

	if (!_popup.valid)
		return false;

  _popup.clear();
  _popup.show();

	return _popup.load(src, title);
}

/* Constructor */
function popupLayer(options) {
  if (!window.$)
    return false;

  var o = this;

  this._msie6 = $.browser.msie && parseInt($.browser.version) < 7;

  /* Apply options */
  if (typeof(options) != 'undefined' && options.constructor == Object) {
    for (var i in options) {
      if (hasOwnProperty(options, i) && typeof(this[i]) != 'undefined' && this[i].contructor == options[i].constructor && (this[i].contructor == Number || this[i].contructor == Boolean))
        this[i] = options[i];
    }
  }

  /* Create popup as DOM subtree */

  this._bg = document.body.appendChild(document.createElement('DIV'));
  this._bg.className = 'popup-modal-bg';
  if (!this.isModal)
    this._bg.style.display = 'none';

  this._base = document.createElement('DIV');

	this._base.className = 'popup-window';
  this._base._popupControl = this;

  /* Create background IFRAME (for IE only) */
  if (this._msie6) {
    this._bg_iframe = this._base.appendChild(document.createElement('IFRAME'));
    this._bg_iframe.className = 'popup-bg-iframe';
    this._bg_iframe.src = images_dir + "/spacer.gif";
  }

	this._title = this._base.appendChild(document.createElement('DIV'));
	this._title.className = 'popup-title';
  this._title._border = 'title';
  this._title.onmousedown = function(e) {
    if (!e)
      e = event;

    if (e.stopPropagation)
      e.stopPropagation();
    else
      e.cancelBubble = true;

    o._titleMDown(this, e);

    return true;
  }

  var a = this._title.appendChild(document.createElement('A'));
  a.appendChild(document.createElement('IMG')).src = images_dir + '/spacer.gif';
  a.href = "javascript:void(0);";
  a.onmousedown = function(e) {
    if (!e)
      e = event;

    if (e.stopPropagation)
      e.stopPropagation();
    else
      e.cancelBubble = true;

    return false;
  }
  a.onclick = function(e) {
    if (!e)
      e = event;

    if (e.stopPropagation)
      e.stopPropagation();
    else
      e.cancelBubble = true;

    o.close();
  }

  this._titleBox = this._title.appendChild(document.createElement('SPAN'));

  this._content = this._base.appendChild(document.createElement('DIV'));
  this._content.className = 'popup-content';

  this._frame = this._content.appendChild(document.createElement('DIV'));
  this._frame.className = 'popup-frame';

  this._footer = this._base.appendChild(document.createElement('DIV'));
  this._footer.className = 'popup-footer';
  var img = this._footer.appendChild(document.createElement('DIV'));

  this._dndBorder = document.body.appendChild(document.createElement('DIV'));
  this._dndBorder.className = 'popup-dnd-border';
  this._dndBorder.style.display = 'none';

  /* Create borders */
  var b;
  var borders = ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'];
  for (var i = 0; i < borders.length; i++) {
    b = this._base.appendChild(document.createElement('DIV'));
    b.className = 'popup-border popup-' + borders[i] + '-' + ((i ==0 || i % 2 == 0) ? 'side' : 'corner');
    b._border = borders[i];
    b._borderOwner = this;
    b.onmousedown = this._borderMDown;
  }

  img._border = 'br';
  img._borderOwner = this;
  img.onmousedown = this._borderMDown;

  this._base$ = $(this._base);
  this._frame$ = $(this._frame);

  if (this._msie6) {
    this._bSide = $('.popup-b-side', this._base).get(0);
    this._rSide = $('.popup-r-side', this._base).get(0);
  }

  document.body.appendChild(this._base);

  this._lastDim = {
    top: false,
    left: false,
    width: false,
    height: false
  };
  this._lastWndDim = {
    width: getWindowWidth(),
    height: getWindowHeight()
  };

  this.valid = true;

  if ($.browser.msie) {
    this.setDim('center', 'center', this.defaultWidth, this.defaultHeight);
    this._lastDim = {
      top: false,
      left: false,
      width: false,
      height: false
    };
  }

  /* Calculate adaptive values */
  this._borderWidth = $('.popup-r-side', this._base$).width();
  this._titleHeight = $('.popup-title', this._base$).height();
  this._footerHeight = $('.popup-footer', this._base$).height();

  this._dndBorderAddWidth = -2;
  this._dndBorderAddHeight = -2;

  this._msie6FramePaddingH = 0;
  if (this._msie6) {

    // Calculate padding between popup content and popup inner frame (horizonal)
    this._msie6FramePaddingH = 
      parseInt(this._frame$.css('paddingTop')) + parseInt(this._frame$.css('paddingBottom')) +
      parseInt(this._frame$.css('marginTop')) + parseInt(this._frame$.css('marginBottom')) +
      parseInt(this._base$.css('paddingTop')) + parseInt(this._base$.css('paddingBottom')) +
      2;

      this._dndBorderAddWidth = 0;
      this._dndBorderAddHeight = 0;
  }

  /* Initional resize & reposition popup */
  this.setDim('center', 'center', this.defaultWidth, this.defaultHeight);

  this._wndResized();

  /* Bind general handlers */
  jQuery.event.add(document.body, "mouseup",
    function(e) {
      return o._borderMUp(e);
    }
  );

  jQuery.event.add(document.body, "mousemove",
    function(e) {
      return o._borderMMove(e);
    }
  );

  jQuery.event.add(document.body, "resize",
    function(e) {
      return o._wndResized(e);
    }
  );

  if (this.saveScroll) {
    jQuery.event.add(window, "scroll",
      function(e) {
        return o._wndScroll(e);
      }
    );
  }

  return true;
}

popupLayer.prototype.valid = false;

/*
  Private properties
*/
popupLayer.prototype._base = false;
popupLayer.prototype._title = false;
popupLayer.prototype._titleText = false;
popupLayer.prototype._titleBox = false;
popupLayer.prototype._content = false;
popupLayer.prototype._frame = false;
popupLayer.prototype._footer = false;
popupLayer.prototype._dndBorder = false;
popupLayer.prototype._bg = false;

popupLayer.prototype._ajax = false;

popupLayer.prototype._lastDim = false;
popupLayer.prototype._lastWndDim = false;
popupLayer.prototype._hidden = false;

popupLayer.prototype._borderWidth = 0;
popupLayer.prototype._titleHeight = 0;
popupLayer.prototype._footerHeight = 0;
popupLayer.prototype._dndBorderAddWidth = 0;
popupLayer.prototype._dndBorderAddHeight = 0;

/*
  Options
*/

/* Use auto resize functionality after loading */
popupLayer.prototype.useAutoResize = true;

/* Popup is modal or not */
popupLayer.prototype.isModal = true;

/* Default popup dimension */
popupLayer.prototype.defaultWidth = 400;
popupLayer.prototype.defaultHeight = 400;

/* Minimum popup dimension */
popupLayer.prototype.minWidth = 200;
popupLayer.prototype.minHeight = 200;

/* Popup margin from browser window */
popupLayer.prototype.parentWindowBorderH = 10;
popupLayer.prototype.parentWindowBorderV = 10;

/* Save popup position in scrolling time */
popupLayer.prototype.saveScroll = false;

/* Move popup only in window space */
popupLayer.prototype.moveInWindow = false;

/*
  Public methods
*/

/* Load content */
popupLayer.prototype.load = function(src, title) {
  if (!this.valid)
    return false;

  src += (src.search(/\?/) === -1 ? '?' : '&') + 'open_in_layer=Y&is_ajax_request=Y&keep_https=Y';

  var o = this;
  try {
    this._ajax = $.get(
      src,
      function(data, s) {
        o._onload(data, s);
      }
    );
  } catch(e) {
    this.close();
    return false;
  }

  this.setTitle(title ? title : '');

  return true;
}

/* Close popup */
popupLayer.prototype.close = function() {
  return this.hide();
}

/* Hide popup */
popupLayer.prototype.hide = function() {
  if (!this.valid)
    return false;

  if (this.isModal) {
    this._bg.style.display = 'none';

    if (this._msie6)
      this._switchSelects(true);
  }

  this._base.style.display = 'none';

  if (this._bg_iframe)
    this._bg_iframe.style.display = 'none';

  this._hidden = true;

  return true;
}

/* Show popup */
popupLayer.prototype.show = function() {
  if (!this.valid)
    return false;

  if (this.isModal) {
    this._bg.style.display = '';

    if (this._msie6)
      this._switchSelects(false);
  }

  this._base.style.display = '';

  if (this._bg_iframe)
    this._bg_iframe.style.display = '';

  this._hidden = false;

  return true;
}

/* Clear popup content */
popupLayer.prototype.clear = function() {
  if (!this.valid)
    return false;

  this._frame$.empty();

  return true;
}

/* Add popup content */
popupLayer.prototype.html = function(html) {
  if (!this.valid)
    return false;

  this._frame$.html(html);

  var o = this;
  setTimeout(
    function() {
      o._processInsertedData();
    },
    200
  );

  return true;
}

/* Set popup poistion */
popupLayer.prototype.position = function(x, y) {
  return this.setDim(x, y, false, false);
}

/* Set popup size */
popupLayer.prototype.resize = function(w, h) {
  return this.setDim(false, false, w, h);
}

/* Set dimensional (left, top, width & height) */
popupLayer.prototype.setDim = function(x, y, w, h) {
  if (!this.valid)
    return false;

  // Get environment parametrs
  var ww = getWindowWidth();
  var wh = getWindowHeight();

  var dw = getDocumentWidth();
  var dh = getDocumentHeight();

  var sl = (localIsStrict && localBrowser != 'Chrome') ? document.documentElement.scrollLeft : document.body.scrollLeft;
  var st = (localIsStrict && localBrowser != 'Chrome') ? document.documentElement.scrollTop : document.body.scrollTop;

  // Get current window size
  var dim = this.getDim();

  if (!$.browser.msie) {
    var isDHMax = dh > wh;
    var isDWMax = dw > ww;

    // Vertical scroll bar width compensation
    if (isDHMax)
      ww -= 20;

    // Horizontal scroll bar height compensation
    if (isDWMax)
      wh -= 20;
  }

  // Calculate maximum width x height
  var maxw = ww - this.parentWindowBorderH * 2;
  var maxh = wh - this.parentWindowBorderV * 2;

  // Restore non-changed parameters
  if (x === false)
    x = this._lastDim.left;

  if (y === false)
    y = this._lastDim.top;

  if (w === false)
    w = this._lastDim.width;

  if (h === false)
    h = this._lastDim.height;

  // Calculate width x height
  w = Math.max(Math.min(maxw, w), this.minWidth);
  h = Math.max(Math.min(maxh, h), this.minHeight);

  // Calculate horizontal position
  switch (x) {
    case 'center':
      x = Math.round((ww - w) / 2) + sl;
      break;

    case 'left':
      x = this.parentWindowBorderH + sl;
      break;

    case 'right':
      x = ww - this.parentWindowBorderH - w + sl;
      break;

    case 'restore':
      x = this._lastDim.wndLeft + sl;
      break;
  }

  // Calculate vertical position
  switch (y) {
    case 'middle':
    case 'center':
      y = Math.round((wh - h) / 2) + st;

      break;

    case 'top':
      y = this.parentWindowBorderV + st;
      break;

    case 'bottom':
      y = wh - this.parentWindowBorderV - h + st;
      break;

    case 'restore':
      y = this._lastDim.wndTop + st;
      break;
  }

  // Calculate x/y with minimal window border (horizontal / vertical) width
  x = Math.max(x, this.parentWindowBorderH);
  y = Math.max(y, this.parentWindowBorderV);

  // Calculate x/y with current window size
  if (x - this.parentWindowBorderH + w - sl > ww - this.parentWindowBorderH)
    x = ww - this.parentWindowBorderH - w + sl;

  if (y - this.parentWindowBorderV + h - st > wh - this.parentWindowBorderV)
    y = wh - this.parentWindowBorderV - h + st;

  // Save current window position
  this._lastDim.wndTop = y - st;
  this._lastDim.wndLeft = x - sl;

  // Change position
  if (y != this._lastDim.top) {
    this._dndBorder.style.top = this._base.style.top = y + 'px';
    this._lastDim.top = y;
  }

  if (x != this._lastDim.left) {
    this._dndBorder.style.left = this._base.style.left = x + 'px';
    this._lastDim.left = x;
  }

  // Change size
  var isResized = false;
  if (w != this._lastDim.width) {
    this._base.style.width = w + 'px';
    if (this._msie6) {
      this._content.style.width = this._footer.style.width = this._title.style.width = (w - (this._borderWidth + 1) * 2) + 'px';
      this._rSide.style.left = (w - this._borderWidth - 1) + 'px';

    } else {
      this._content.style.width = this._footer.style.width = this._title.style.width = (w - this._borderWidth * 2) + 'px';
    }
    this._dndBorder.style.width = (w + this._dndBorderAddWidth) + 'px';

    this._lastDim.width = w;
    isResized = true;
  }

  if (h != this._lastDim.height) {
    this._base.style.height = h + 'px';
    if ($.browser.msie)
      this._content.style.height = (h - this._titleHeight - this._footerHeight - (this._borderWidth + 1) * 2) + 'px';
    else
      this._content.style.height = (h - this._titleHeight - this._footerHeight - this._borderWidth * 2) + 'px';
    this._dndBorder.style.height = (h + this._dndBorderAddHeight) + 'px';
    
    if (this._msie6) {
      this._bSide.style.top = (h - this._borderWidth - 2) + 'px';
    }

    this._lastDim.height = h;
    isResized = true;
  }

  // Call event handler(s)
  $(this).trigger('onresize');

  return this._lastDim;
}

/* Auto resize popup by content */
popupLayer.prototype.autoResize = function(reposition) {
  if (!this.valid)
    return false;

  var w = $(this._content).width();
  var h = $(this._content).height();

  h += this._msie6FramePaddingH;

  var ws = this._content.scrollWidth;
  var hs = this._content.scrollHeight;
  var use_ws = false;

  if (ws > w)
    w = ws + 20;

  if (hs > h) {
    h = hs + 20;
    if ($.browser.msie && parseInt($.browser.version) == 7)
      h += 20;
  }

  w += this._borderWidth * 2;
  h += this._titleHeight + this._footerHeight + this._borderWidth * 2 - this._msie6FramePaddingH;

  if (this._lastDim.width >= w)
    w = false;

  if (this._lastDim.height >= h)
    h = false;

  return reposition ? this.setDim('center', 'center', w, h) : this.setDim(false, false, w, h);
}

/* Set window dimension based on internal size */
popupLayer.prototype.setInnerDim = function(x, y, w, h) {
  if (w) {
    w += this._borderWidth * 2 + 20;
  }

  if (h) {
    h += this._titleHeight + this._footerHeight + this._borderWidth * 2 + 20;
  }

  return this.setDim(x, y, w, h);
}

/* Get popup dimensional (x, y, width and height) */
popupLayer.prototype.getDim = function() {
  if (!this.valid)
    return false;

  var pos = this._base$.offset();

  return {
    top: pos.top,
    left: pos.left,
    width: this._base$.width(),
    height: this._base$.height(),
    innerBox: {
      width: $(this._content).width(),
      height: $(this._content).height()
    }
  };
  
}

popupLayer.prototype.setTitle = function(title) {
  if (!this.valid)
    return false;

  this._titleText = title;
  this._titleBox.innerHTML = title ? title : '';

  return true;
}

/*
  Private methods
*/

/* Drag'n'drop handler - mousedown (start move popup) */
popupLayer.prototype._titleMDown = function(obj, e) {
  this._currentDrag = obj;
  this._dndBorder.style.display = '';

  document.body.style.cursor = 'move';

  var x = e.clientX + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
  var y = e.clientY + Math.max(document.documentElement.scrollTop, document.body.scrollTop);

  this._downOffset = {
    x: x - this._lastDim.left,
    y: y - this._lastDim.top
  };

  if (this.moveInWindow) {
    this._lastWndDim = {
      width: getWindowWidth(),
      height: getWindowHeight()
    };

  } else {
    this._lastWndDim = {
      width: getDocumentWidth(),
      height: getDocumentHeight()
    };
  }

  if ($.browser.msie)
    document.body.onselectstart = function() { return false; }

  return true;
}

/* Drag'n'drop handler - mousedown (start resize popup) */
popupLayer.prototype._borderMDown = function(e) {
  if (!e)
    e = event;

  if (e.stopPropagation)
    e.stopPropagation();
  else
    e.cancelBubble = true;

  this._borderOwner._currentDrag = this;
  this._borderOwner._dndBorder.style.display = '';

  document.body.style.cursor = $(this).css('cursor');

  this._borderOwner._lastWndDim = {
    width: getWindowWidth(),
    height: getWindowHeight()
  };

  if ($.browser.msie) {
    document.body.onselectstart = function() { return false; }

  } else if ($.browser.mozilla) {
    this._borderOwner._content.setAttribute('style', this._borderOwner._content.getAttribute('style') + '-moz-user-select: none;');

  } else if ($.browser.safari) {
    this._borderOwner._content.setAttribute('style', this._borderOwner._content.getAttribute('style') + '-khtml-user-select: none;');
  }

  return true;
}

/* Drag'n'drop handler - mousemove */
popupLayer.prototype._borderMMove = function(e) {
  if (!this._currentDrag)
    return true;

  if (!e)
    e = event;

  var x = e.clientX + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
  var y = e.clientY + Math.max(document.documentElement.scrollTop, document.body.scrollTop);

  switch (this._currentDrag._border) {
    case 't':
      if (y < this._lastDim.height + this._lastDim.top - this.minHeight && y > this.parentWindowBorderV) {
        this._dndBorder.style.top = y + 'px';
        this._dndBorder.style.height = (this._lastDim.height + this._lastDim.top - y + this._dndBorderAddHeight) + 'px';
      }
      break;

    case 'tr':
      if (y < this._lastDim.height + this._lastDim.top - this.minHeight && y > this.parentWindowBorderV) {
        this._dndBorder.style.top = y + 'px';
        this._dndBorder.style.height = (this._lastDim.height + this._lastDim.top - y + this._dndBorderAddHeight) + 'px';
      }
      if (x > this._lastDim.left + this.minWidth && x < this._lastWndDim.width - this.parentWindowBorderH) {
        this._dndBorder.style.width = (x - this._lastDim.left + this._dndBorderAddWidth) + 'px';
      }
      break;

    case 'r':
      if (x > this._lastDim.left + this.minWidth && x < this._lastWndDim.width - this.parentWindowBorderH) {
        this._dndBorder.style.width = (x - this._lastDim.left + this._dndBorderAddWidth) + 'px';
      }
      break;

    case 'br':
      if (y > this._lastDim.top + this.minHeight && (y - this._lastDim.top) < this._lastWndDim.height - this.parentWindowBorderV * 2) {
        this._dndBorder.style.height = (y - this._lastDim.top + this._dndBorderAddHeight) + 'px';
      }
      if (x > this._lastDim.left + this.minWidth && x < this._lastWndDim.width - this.parentWindowBorderH) {
        this._dndBorder.style.width = (x - this._lastDim.left + this._dndBorderAddWidth) + 'px';
      }
      break;

    case 'b':
      if (y > this._lastDim.top + this.minHeight && (y - this._lastDim.top) < this._lastWndDim.height - this.parentWindowBorderV * 2) {
        this._dndBorder.style.height = (y - this._lastDim.top + this._dndBorderAddHeight) + 'px';
      }
      break;

    case 'bl':
      if (y > this._lastDim.top + this.minHeight && (y - this._lastDim.top) < this._lastWndDim.height - this.parentWindowBorderV * 2) {
        this._dndBorder.style.height = (y - this._lastDim.top + this._dndBorderAddHeight) + 'px';
      }
      if (x < this._lastDim.width + this._lastDim.left - this.minWidth && x > this.parentWindowBorderH) {
        this._dndBorder.style.left = x + 'px';
        this._dndBorder.style.width = (this._lastDim.width + this._lastDim.left - x + this._dndBorderAddWidth) + 'px';
      }
      break;

    case 'l':
      if (x < this._lastDim.width + this._lastDim.left - this.minWidth && x > this.parentWindowBorderH) {
        this._dndBorder.style.left = x + 'px';
        this._dndBorder.style.width = (this._lastDim.width + this._lastDim.left - x + this._dndBorderAddWidth) + 'px';
      }
      break;

    case 'tl':
      if (y < this._lastDim.height + this._lastDim.top - this.minHeight && y > this.parentWindowBorderV) {
        this._dndBorder.style.top = y + 'px';
        this._dndBorder.style.height = (this._lastDim.height + this._lastDim.top - y + this._dndBorderAddHeight) + 'px';
      }
      if (x < this._lastDim.width + this._lastDim.left - this.minWidth && x > this.parentWindowBorderH) {
        this._dndBorder.style.left = x + 'px';
        this._dndBorder.style.width = (this._lastDim.width + this._lastDim.left - x + this._dndBorderAddWidth) + 'px';
      }
      break;

    case 'title':
      x -= this._downOffset.x;
      y -= this._downOffset.y;

      if (x > this.parentWindowBorderH && x < this._lastWndDim.width - this._lastDim.width - this.parentWindowBorderH) {
        this._dndBorder.style.left = x + 'px';
      }
      if (y > this.parentWindowBorderV && y < this._lastWndDim.height - this._lastDim.height - this.parentWindowBorderV) {
        this._dndBorder.style.top = y + 'px';
      }
      break;
  }

  if (!$.browser.msie && window.getSelection) {
     window.getSelection().removeAllRanges();
  }

  return false;
}

/* Drag'n'drop handler - mouseup */
popupLayer.prototype._borderMUp = function(e) {
  if (!this._currentDrag)
    return true;

  this._currentDrag = false;
  document.body.style.cursor = 'auto';

  var b = $(this._dndBorder);
  var bw = b.width() - this._dndBorderAddWidth;
  var bh = b.height() - this._dndBorderAddHeight;

  if (this._msie6) {
    bw += 2;
    bh += 2;
  }

  this.setDim(false, false, bw, bh);

  var pos = b.offset();
  this.setDim(pos.left, pos.top, false, false);

  this._dndBorder.style.display = 'none';

  if (!$.browser.msie && window.getSelection) {
     window.getSelection().removeAllRanges();
  }

  if ($.browser.msie) {
    document.body.onselectstart = '';

  } else if ($.browser.mozilla) {
    this._content.setAttribute('style', (this._content.getAttribute('style') + '').replace(/-moz-user-select: none;/, ''));

  } else if ($.browser.safari) {
    this._content.setAttribute('style', (this._content.getAttribute('style') + '').replace(/-khtml-user-select: none;/, ''));
  }

  return true;
}

/* Window onresize event handler */
popupLayer.prototype._wndResized = function() {
  if (this._bg && this.valid && !this._hidden) {
    if ($.browser.msie) {
      this._bg.style.width = document.body.scrollWidth + 'px';
      this._bg.style.height = document.body.scrollHeight + 'px';

    } else {
      this._bg.style.width = document.documentElement.scrollWidth + 'px';
      this._bg.style.height = document.documentElement.scrollHeight + 'px';
    }
  }

  return true;
}

/* Window onscroll event handler */
popupLayer.prototype._wndScroll = function() {
  if (this.valid && this.saveScroll && !this._hidden) {
    this.setDim('restore', 'restore', false, false);
  }

  return true;
}

/* Handler - bind on AJAX onload event */
popupLayer.prototype._onload = function(data, s, obj) {
  if (!this.valid || s != 'success')
    return false;

  if (!this._processResponse(data)) {
    this._insertData(data);
  }

  return true;
}

/* Process service signatures from AJAX response */
popupLayer.prototype._processResponse = function(data) {
  if (!this.valid || !data)
    return false;

  var m, l;

  if (data.search(/\/\* CMD: opener_reload \*\//) != -1) {

    // Opener window reload
    this.close();
    window.location.reload();
    return true;
  }

  if (data.search(/\/\* CMD: window_close \*\//) != -1) {

    // Close current window
    this.close();
    return true;
  }

  try {
    if ((m = data.match(/<meta http-equiv="Refresh" content="[0-9]+;URL=([^"]+)" \/>/)) || (this._ajax && (l = this._ajax.getResponseHeader('Location')))) {

      // Redirect
      if (m)
        l = m[1];

      this.load(l);
      return true;
    }
  } catch (e) { }

  return false;

}

/* Insert data into popup */
popupLayer.prototype._insertData = function(data) {
  if (!this.valid)
    return false;

  var m;

  data = data.replace(/\r/g, '');
  m = data.match(new RegExp("<!-- MAIN -->\n*((?:.*\n)+.*)<!-- \/MAIN -->"));
  if (!m)
    m = data.match(new RegExp("<body[^>]*>\n*((?:.*\n)+.*)<\/body>", 'i'));

  if (!m)
    return false;

  this.html(m[1]);

  if (!this._titleText && (m = data.match(new RegExp("<title>(.+)<\/title>")))) {
    this.setTitle(m[1]);
  }

  return true;
}

/* Process inserted data - bind some handlers on some events some elements */
popupLayer.prototype._processInsertedData = function() {
  if (!this.valid)
    return false;

  $(this).trigger('onload');

  $('form', this._frame).bind('submit', this._submitFormHnd);
  $('a:not([href^="javascript:"])', this._frame).bind('click', this._clickAHnd);

  if (this.useAutoResize)
    this.autoResize(true);

  return true;
}

/* Form onsubmit handler */
popupLayer.prototype._submitFormHnd = function() {

  var pc = getPopupControl(this);
  if (!pc || !pc.valid)
    return true;

  var data = {};
  $.each(
    $(this).serializeArray(),
    function (i, elm) {
      if (data[elm.name]) {
        if (typeof(data[elm.name]) == 'string')
          data[elm.name] = [data[elm.name], elm.value];
        else
          data[elm.name][data[elm.name].length] = elm.value;

      } else {
        data[elm.name] = elm.value;
      }
    }
  );

  var o = this;
  var url = this.action;
  url += (url.search(/\?/) === -1 ? '?' : '&') + 'open_in_layer=Y&is_ajax_request=Y&keep_https=Y';

  if (this.method == 'post') {
    this.ajax = $.post(
      url,
      data,
      function(data, s) {
        pc._onload(data, s, o);
      }
    );

  } else {
    this.ajax = $.get(
      url,
      data,
      function(data, s) {
        pc._onload(data, s, o);
      }
    );

  }
  
  return !this.ajax;
}

/* Link onclick handler */
popupLayer.prototype._clickAHnd = function() {
  var pc = getPopupControl(this);
  if (!pc || !pc.valid)
    return true;

  var o = this;
  var url = this.href;
  url += (url.search(/\?/) === -1 ? '?' : '&') + 'open_in_layer=Y&is_ajax_request=Y&keep_https=Y';

  this.ajax = $.post(
    url,
    function(data, s) {
      pc._onload(data, s, o);
    }
  );

  return !this.ajax;
}

/* Switch (on/off) special elements (MS IE 6 bug) */
popupLayer.prototype._switchSelects = function(switchon) {

  // Process form selectors
  var elms = document.getElementsByTagName('SELECT');
  for (var i = 0; i < elms.length; i++) {
    var p = elms[i].parentNode;
    while (p && p.parentNode && p.className != 'popup-content')
      p = p.parentNode;

    if (p && p.className == 'popup-content')
      continue;

    if (switchon) {
      $(elms[i]).removeClass('popup-hidden-select');
      elms[i].disabled = elms[i]._old_disabled;

    } else {
      $(elms[i]).addClass('popup-hidden-select');
      elms[i]._old_disabled = elms[i].disabled;
      elms[i].disabled = true;
    }
  }

  // Process object elements
  var elms = document.getElementsByTagName('OBJECT');
  for (var i = 0; i < elms.length; i++) {
    var p = elms[i].parentNode;
    while (p && p.parentNode && p.className != 'popup-content')
      p = p.parentNode;

    if (!p || p.className != 'popup-content')
      elms[i].style.visibility = switchon ? 'visible' : 'hidden';
  }

  return true;
}

