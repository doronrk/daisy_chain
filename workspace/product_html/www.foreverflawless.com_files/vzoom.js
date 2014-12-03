var vZoom = {
    images: new Object(),
    zoomArea: null,
    mouse: { 'left': 0, 'top': 0 },
    displayImage: null,
    magnifyingGlass: null,
    magnifyingGlassImage: null,
    transparentOverlay: null,
    loadingArea: null,
    loadingAreaImage: null,
    iframe: null,
    fader: null,
    identity: -1,
    dontHide: true,
    activeProperties: { 'image': null, 'zoomImage': null, 'imagePlacement': null, 'scaleX': 0, 'scaleY': 0, 'magnifyingGlassBorderWidth': 0, 'imageBorderWidth': 0 },
    matchImage: true,
    fadeSpeed: 15,
    fadeStrength: 5,
    offsetX: 0,
    offsetY: 0,

    init: function () {
        if (vZoom.magnifyingGlass) {
            return;
        }
        vZoom.magnifyingGlass = document.createElement('div');
        vZoom.magnifyingGlass.id = 'vZoomMagnifier';
        vZoom.magnifyingGlass.style.position = 'absolute';

        vZoom.magnifyingGlassImage = document.createElement('img');
        vZoom.magnifyingGlassImage.alt = '';
        vZoom.magnifyingGlassImage.id = 'vZoomMagnifierImage';
        vZoom.magnifyingGlassImage.style.position = 'absolute';
        vZoom.magnifyingGlass.appendChild(vZoom.magnifyingGlassImage);

        vZoom.zoomArea = document.createElement('div');
        vZoom.zoomArea.id = 'vZoomArea';
        vZoom.zoomArea.style.display = 'none';
        vZoom.zoomArea.style.position = 'absolute';
        vZoom.zoomArea.style.overflow = 'hidden';
        vZoom.zoomArea.style.zIndex = 5;

        vZoom.displayImage = document.createElement('img');
        vZoom.displayImage.alt = '';
        vZoom.displayImage.style.position = 'absolute';
        vZoom.zoomArea.appendChild(vZoom.displayImage);

        vZoom.transparentOverlay = document.createElement('div');
        vZoom.transparentOverlay.id = 'vZoomTransparentOverlay';
        vZoom.transparentOverlay.style.display = 'none';
        vZoom.transparentOverlay.style.position = 'absolute';

        vZoom.loadingArea = document.createElement('div');
        vZoom.loadingArea.id = 'vZoomLoadingArea';
        vZoom.loadingArea.style.display = 'none';
        vZoom.loadingArea.style.position = 'absolute';
        vZoom.loadingArea.style.zIndex = '1';
        vZoom.loadingArea.appendChild(vZoom.loadingAreaImage);
        //		vZoom.loadingAreaImage.src = '/a/i/vzoom.gif';
        //		vZoom.loadingAreaImage.style.width = '0px';
        //		vZoom.loadingAreaImage.style.height = '0px';

        vZoom.iframe = document.createElement('iframe');
        vZoom.iframe.frameBorder = 0;
        vZoom.iframe.style.display = 'none';
        vZoom.iframe.style.position = 'absolute';
        vZoom.iframe.style.zIndex = 4;

        document.body.appendChild(vZoom.transparentOverlay);
        document.body.appendChild(vZoom.magnifyingGlass);
        document.body.appendChild(vZoom.zoomArea);
        document.body.appendChild(vZoom.loadingArea);
        document.body.appendChild(vZoom.iframe);

        vZoom.setDefaults();
    },

    setDefaults: function () {
        if (typeof (vQwfdiUKfgdfP) != 'string') {
            var zoomArea = vZoom.zoomArea.style;
            var magnifier = vZoom.magnifyingGlass.style;
            var transparentOverlay = vZoom.transparentOverlay.style;
            zoomArea.borderWidth = '1px';
            zoomArea.borderColor = '#c1c1c1';
            zoomArea.borderStyle = 'solid';

            magnifier.borderWidth = '1px';
            magnifier.borderColor = '#c1c1c1';
            magnifier.borderStyle = 'solid';
            magnifier.cursor = 'pointer';
            magnifier.overflow = 'hidden';

            transparentOverlay.opacity = '0.50';
            transparentOverlay.backgroundColor = '#cccccc';
            transparentOverlay.filter = 'alpha(opacity=50)';
            transparentOverlay.cursor = 'pointer';

            vZoom.matchImage = true;
            vZoom.fadeSpeed = 15;
            vZoom.fadeStrength = 5;
            vZoom.offsetX = 0;
            vZoom.offsetY = 0;
        }
    },

    findZoomImage: function (src) {
        src = src.toLowerCase();
        src = src.replace('t.jpg', '.jpg');
        src = src.replace('-.jpg', '.jpg');
        src = src.replace('t.gif', '.gif');
        src = src.replace('-.gif', '.gif');
        return src;
    },

    filter: function (path) {
        return path.toLowerCase();
        return path.toLowerCase().replace(/[\.\-\:\/]/g, '');
    },

    add: function (element, largerImageURL) {
        element = v$(element);
        element.onmouseover = vZoom.onmouseover;
        if (!vZoom.loadingAreaImage) {
            vZoom.loadingAreaImage = document.createElement('img');
            vZoom.loadingAreaImage.src = '/a/i/vzoom.gif';
        }
        if (largerImageURL != null) {
            vZoom.preloadImage(element.src, largerImageURL);
        }
        else {
            vZoom.preloadImage(element.src, vZoom.findZoomImage(element.src));
        }
        element.onload = null;
    },

    preloadImage: function (smallerImageURL, largerImageURL) {
        if (smallerImageURL && largerImageURL) {
            var smallImg = new Image();
            var largeImg = new Image();

            largeImg.onerror = function (event) {
                largeImg.onerror = null;
                largeImg.onload = null;
                largeImg = null;
            };
            largeImg.onload = function (event) {
                largeImg.onload = null;
                largeImg.loaded = true;
                if (vZoom.activeProperties.zoomImage == largeImg) {
                    vZoom.loadingArea.style.display = 'none';
                    vZoom.activeProperties.image.onmouseover(event);
                }
            };

            smallImg.src = smallerImageURL;
            largeImg.src = largerImageURL;

            var imageIndex = vZoom.filter(smallImg.src);
            if (!vZoom.images[imageIndex]) {
                vZoom.images[imageIndex] = largeImg;
            }
        }
    },

    fadeIn: function (opacity) {
        if (vZoom.fader) {
            window.clearTimeout(vZoom.fader);
            vZoom.fader = null;
        }
        vZoom.zoomArea.style.opacity = opacity / 100;
        vZoom.zoomArea.style.filter = 'alpha(opacity=' + opacity + ')';
        vZoom.iframe.style.opacity = opacity / 100;
        vZoom.iframe.style.filter = 'alpha(opacity=' + opacity + ')';
        if (opacity < 100) {
            vZoom.fader = window.setTimeout('vZoom.fadeIn(' + (opacity + vZoom.fadeStrength) + ');', vZoom.fadeSpeed);
        }
    },

    onmouseover: function (event) {
        vZoom.init();

        var imageIndex = vZoom.filter(this.src);
        var zoomImage = vZoom.images[imageIndex];

        if (zoomImage == null) {
            return;
        }

        vZoom.setDefaults();

        var imagePlacement = vPlacement(this);

        AttachEvent(document, 'mousemove', vZoom.onmousemove);

        vZoom.activeProperties.image = this;
        vZoom.activeProperties.zoomImage = zoomImage;
        vZoom.activeProperties.imagePlacement = imagePlacement;

        if (zoomImage.loaded != true) {
            vZoom.loadingArea.style.display = '';

            vZoom.loadingArea.style.left = imagePlacement.left + imagePlacement.width / 2 - vZoom.loadingAreaImage.offsetWidth / 2 + 'px';
            vZoom.loadingArea.style.top = imagePlacement.top + imagePlacement.height / 2 - vZoom.loadingAreaImage.offsetHeight / 2 + 'px';
            return;
        }
        else {
            vZoom.loadingArea.style.display = 'none';
            if (vZoom.displayImage.src != zoomImage.src) {
                vZoom.displayImage.src = zoomImage.src;
            }
        }
        if (vZoom.magnifyingGlassImage.src != this.src) {
            vZoom.magnifyingGlassImage.src = this.src;
        }

        vZoom.magnifyingGlass.style.display = '';
        vZoom.zoomArea.style.display = '';
        vZoom.transparentOverlay.style.display = '';

        var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var docHeight = document.documentElement.clientHeight || document.body.clientHeight;

        if (vZoom.matchImage) {
            vZoom.zoomArea.style.width = imagePlacement.width + 'px';
            vZoom.zoomArea.style.height = imagePlacement.height + 'px';
            var zoomImagePlacement = { 'width': vZoom.zoomArea.offsetWidth, 'height': vZoom.zoomArea.offsetHeight };
            if (zoomImagePlacement.width > imagePlacement.width) {
                vZoom.zoomArea.style.width = parseFloat(vZoom.zoomArea.style.width) - (zoomImagePlacement.width - imagePlacement.width) + 'px';
            }
            if (zoomImagePlacement.height > imagePlacement.height) {
                vZoom.zoomArea.style.height = parseFloat(vZoom.zoomArea.style.height) - (zoomImagePlacement.height - imagePlacement.height) + 'px';
            }
        }

        var zoomImagePlacement = { 'width': vZoom.zoomArea.offsetWidth, 'height': vZoom.zoomArea.offsetHeight };

        //try putting it to the right
        var x = imagePlacement.left + imagePlacement.width + vZoom.offsetX;
        var y = imagePlacement.top + vZoom.offsetY;
        if (x + zoomImagePlacement.width > docWidth) {
            //try putting it to the left
            x = imagePlacement.left - zoomImagePlacement.width - vZoom.offsetX;
            y = imagePlacement.top - vZoom.offsetY;
            if (x < 0) {
                //try putting it on bottom
                x = imagePlacement.left + vZoom.offsetX;
                y = imagePlacement.top + imagePlacement.height + vZoom.offsetY;
                if (y + zoomImagePlacement.height > docHeight) {
                    //try putting it on top
                    x = imagePlacement.left - vZoom.offsetX;
                    y = imagePlacement.top - zoomImagePlacement.height - vZoom.offsetY;
                    if (y < 0) {
                        //if it fits no where, put it on the right
                        x = imagePlacement.left + imagePlacement.width + vZoom.offsetX;
                        y = imagePlacement.top + vZoom.offsetY;
                    }
                }
            }
        }

        vZoom.zoomArea.style.left = x + 'px';
        vZoom.zoomArea.style.top = y + 'px';

        var scaleX = (vZoom.displayImage.offsetWidth / imagePlacement.width);
        var scaleY = (vZoom.displayImage.offsetHeight / imagePlacement.height);

        if (scaleY < 1.2 || scaleX < 1.2) {
            vZoom.hide(null, true);
            return;
        }

        vZoom.magnifyingGlassImage.onmousedown = vZoom.activeProperties.image.onmousedown;
        vZoom.magnifyingGlassImage.onmouseup = vZoom.activeProperties.image.onmouseup;


        vZoom.magnifyingGlassImage.onclick = function (event) {
            var event = window.event || event;
            if (vZoom.activeProperties.image.onclick) {
                vZoom.activeProperties.image.onclick(event);
            }
            if (vZoom.activeProperties.image.parentNode.nodeName.toUpperCase() == 'A') {
                var anchorTag = vZoom.activeProperties.image.parentNode;

                var tmp = jQuery(anchorTag).attr("rel");

                if (anchorTag.href && tmp == "") {
                    window.location.href = anchorTag.href;
                }
                anchorTag.click(event);
            }

            return true;
        };


        if (vZoom.magnifyingGlass.currentStyle) {
            vZoom.activeProperties.magnifyingGlassBorderWidth = parseFloat(vZoom.magnifyingGlass.currentStyle.borderTopWidth) || 0;
            vZoom.activeProperties.imageBorderWidth = parseFloat(this.currentStyle.borderTopWidth) || 0;
        }
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            vZoom.activeProperties.magnifyingGlassBorderWidth = parseFloat(document.defaultView.getComputedStyle(vZoom.magnifyingGlass, null).getPropertyValue('border-top-width')) || 0;
            vZoom.activeProperties.imageBorderWidth = parseFloat(document.defaultView.getComputedStyle(this, null).getPropertyValue('border-top-width')) || 0;
        }
        else {
            vZoom.activeProperties.magnifyingGlassBorderWidth = 0;
            vZoom.activeProperties.imageBorderWidth = 0;
        }

        vZoom.magnifyingGlass.style.width = (vZoom.zoomArea.offsetWidth / scaleX) + vZoom.activeProperties.magnifyingGlassBorderWidth + 'px';
        vZoom.magnifyingGlass.style.height = (vZoom.zoomArea.offsetHeight / scaleY) + vZoom.activeProperties.magnifyingGlassBorderWidth + 'px';

        vZoom.activeProperties.scaleX = scaleX;
        vZoom.activeProperties.scaleY = scaleY;

        vZoom.transparentOverlay.style.left = imagePlacement.left + vZoom.activeProperties.imageBorderWidth + 'px';
        vZoom.transparentOverlay.style.top = imagePlacement.top + vZoom.activeProperties.imageBorderWidth + 'px';
        vZoom.transparentOverlay.style.width = imagePlacement.width - vZoom.activeProperties.imageBorderWidth * 2 + 'px';
        vZoom.transparentOverlay.style.height = imagePlacement.height - vZoom.activeProperties.imageBorderWidth * 2 + 'px';

        vZoom.iframe.style.left = vZoom.zoomArea.style.left;
        vZoom.iframe.style.top = vZoom.zoomArea.style.top;
        vZoom.iframe.style.width = vZoom.zoomArea.offsetWidth;
        vZoom.iframe.style.height = vZoom.zoomArea.offsetHeight;
        vZoom.iframe.style.display = 'block';

        vZoom.onmousemove(event);
        if (zoomImage.loaded) {
            vZoom.fadeIn(1);
        }
    },

    hide: function (event, force) {
        var target;
        if (event && !force) {
            target = event.srcElement ? event.srcElement : event.target;
        }
        if (force || (target != vZoom.loadingAreaImage && target != null && target != document && target != vZoom.magnifyingGlass && target != vZoom.activeProperties.image && target != vZoom.magnifyingGlassImage && target != vZoom.transparentOverlay)) {
            if (vZoom.dontHide && target == vZoom.images[vZoom.filter(vZoom.activeProperties.image.src)]) {
                vZoom.dontHide = false;
            }
            else {
                vZoom.dontHide = false;
                DetachEvent(document, 'mousemove', vZoom.onmousemove);
                vZoom.magnifyingGlass.style.display = 'none';
                vZoom.zoomArea.style.display = 'none';
                vZoom.transparentOverlay.style.display = 'none';
                vZoom.loadingArea.style.display = 'none';
                vZoom.iframe.style.display = 'none';
                vZoom.mouse.left = 0;
                vZoom.mouse.top = 0;
                vZoom.activeProperties = { 'image': null, 'zoomImage': null, 'imagePlacement': null, 'scaleX': 0, 'scaleY': 0, 'magnifyingGlassBorderWidth': 0 };
                return true;
            }
        }
        return false;
    },

    onmousemove: function (event) {
        var event = window.event || event;

        if (vZoom.hide(event)) {
            return;
        }

        if (event.clientX) {
            var x = document.documentElement.scrollLeft || document.body.scrollLeft;
            var y = document.documentElement.scrollTop || document.body.scrollTop;
            x += event.clientX;
            y += event.clientY;
        }
        else {
            var x = vZoom.mouse.left;
            var y = vZoom.mouse.top;
        }

        vZoom.mouse.left = x;
        vZoom.mouse.top = y;

        var imageIndex = vZoom.filter(vZoom.activeProperties.image.src);
        if (vZoom.images[imageIndex].loaded != true) {
            return;
        }

        var magnifyingGlass = vZoom.magnifyingGlass;

        var magnifyingGlassPlacement = { 'width': magnifyingGlass.offsetWidth, 'height': magnifyingGlass.offsetHeight };
        var imagePlacement = vZoom.activeProperties.imagePlacement;

        x -= magnifyingGlassPlacement.width / 2;
        y -= magnifyingGlassPlacement.height / 2;

        if (x < imagePlacement.left + vZoom.activeProperties.imageBorderWidth) {
            x = imagePlacement.left + vZoom.activeProperties.imageBorderWidth;
        }
        else if (x > imagePlacement.left + imagePlacement.width - magnifyingGlassPlacement.width - vZoom.activeProperties.imageBorderWidth) {
            x = imagePlacement.left + imagePlacement.width - magnifyingGlassPlacement.width - vZoom.activeProperties.imageBorderWidth;
        }
        else {
        }
        if (y < imagePlacement.top + vZoom.activeProperties.imageBorderWidth) {
            y = imagePlacement.top + vZoom.activeProperties.imageBorderWidth;
        }
        else if (y > imagePlacement.top + imagePlacement.height - magnifyingGlassPlacement.height - vZoom.activeProperties.imageBorderWidth) {
            y = imagePlacement.top + imagePlacement.height - magnifyingGlassPlacement.height - vZoom.activeProperties.imageBorderWidth;
        }
        magnifyingGlass.style.left = x + 'px';
        magnifyingGlass.style.top = y + 'px';

        x -= imagePlacement.left;
        y -= imagePlacement.top;

        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }

        x += vZoom.activeProperties.magnifyingGlassBorderWidth;
        y += vZoom.activeProperties.magnifyingGlassBorderWidth;

        var scaleX = vZoom.activeProperties.scaleX;
        var scaleY = vZoom.activeProperties.scaleY;

        vZoom.displayImage.style.left = -x * scaleX + 'px';
        vZoom.displayImage.style.top = -y * scaleY + 'px';

        vZoom.magnifyingGlassImage.style.left = parseFloat(imagePlacement.left) - parseFloat(vZoom.magnifyingGlass.style.left) - vZoom.activeProperties.magnifyingGlassBorderWidth + vZoom.activeProperties.imageBorderWidth + 'px';
        vZoom.magnifyingGlassImage.style.top = parseFloat(imagePlacement.top) - parseFloat(vZoom.magnifyingGlass.style.top) - vZoom.activeProperties.magnifyingGlassBorderWidth + vZoom.activeProperties.imageBorderWidth + 'px';
    }
}

function sprops(element) {
	var p;
	var txt = '';
	for (p in element) {
		txt += '<br />' + p + ':';
		try {txt += element[p]} catch(e) {}
	}
	var div = document.createElement('div');
	div.innerHTML = txt;
	document.body.appendChild(div);
}