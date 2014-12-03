
// Scene 7 Zoom Viewer
// ('configurable sku', 'width,height', 'target-div-id')
var initViewer= function(){};
var swatchSelected = function(){};
var S7Zoom = {
    s7zoomViewerInit : function( asset, tmbsize, target ){

        if (typeof s7sdk === 'undefined' || typeof s7sdk.Util === 'undefined') {
            return;
        }

        s7sdk.Util.lib.include('s7sdk.image.ZoomView');
        s7sdk.Util.lib.include('s7sdk.set.Swatches');
        s7sdk.Util.lib.include('s7sdk.common.Container');

        s7sdk.Util.init();

        var params = new s7sdk.ParameterManager();
        var altView, container, zoomView;

        initViewer = function(){
            params.push("serverurl", "http://scene7.zumiez.com/is/image");
            params.push("asset", "zumiez/" + asset + '?$pdp_hero$'); // this preset just sharpens and can be used regardless of location/dimensions
            params.push("tmblayout", "1,0"); // vertical swatches
            params.push("tmbsize", tmbsize);
            params.push("zoomstep","0,.5");
            params.push("transition","1,2");
            params.push("singleclick","zoomReset"); // none|zoom|reset|zoomReset
            params.push("iconeffect","0");
            params.push("align","center,top");

            // Create a viewer container
            container = new s7sdk.Container(target ,params,"s7container");
            zoomView = new  s7sdk.ZoomView( "s7container", params, "s7-zoom-view");
            altView = new s7sdk.Swatches("s7container", params,"s7-swatches");

            //Change the image displayed in the main view every time the swatch selection changes
            swatchSelected = function(event) {
                zoomView.setItem(event.s7event.asset);
            };
            //Tie event SWATCH_SELECTED_EVENT with swatchSelected function. When the event is fired, swatchSelected will be called.
            altView.addEventListener(s7sdk.AssetEvent.SWATCH_SELECTED_EVENT, swatchSelected, false);

            // select the first swatch
            altView.selectSwatch(0, true);
        };

        // the ParameterManager will dispatch SDK_READY when all modifiers have been processed
        // and it is safe to initialize the viewer
        params.addEventListener(s7sdk.Event.SDK_READY,initViewer,false);

        // now it is safe to process the modifiers, the callbacks have been defined
        // this will trigger the SDK_READY event
        params.init();

    }
};