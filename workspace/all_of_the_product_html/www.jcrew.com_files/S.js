(function () {

  var handler = function () {
    var smrtPxlDiv = document.createElement('div');
    smrtPxlDiv.style.display='none';
    smrtPxlDiv.innerHTML = '<img src="https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=jcrewpixel_cs=[+]11[720]" width="1" height="1" alt="blank" style="border-style: hidden; border-width: 0px;"/><img src="https://secure.leadback.advertising.com/adcedge/lb?site=695501&srvc=1&betr=23997=596222[720]" width="1" height="1" alt="blank" style="border-style: hidden; border-width: 0px;"/>';
    document.body.appendChild(smrtPxlDiv);
  };

  function bindReady(handler) {
    var called = false;

    function ready() { 
        if (called) return;
        called = true;
        handler();
    }

    // First check to see if we are ready to go.
    if(document.readyState === "complete" || document.readyState === "interactive") {
        ready();
    } else {
        if ( document.addEventListener ) { // native event
            document.addEventListener( "DOMContentLoaded", ready, false );
        } else if ( document.attachEvent ) {  // IE
            var isFrame = window.frameElement != null;

            // IE, the document is not inside a frame
            if ( document.documentElement.doScroll && !isFrame ) {
                function tryScroll(){
                    if (called) return;
                    try {
                        document.documentElement.doScroll("left");
                        ready();
                    } catch(e) {
                        setTimeout(tryScroll, 10);
                    }
                }
                tryScroll();
            } else {
                // IE, the document is inside a frame
                document.attachEvent("onreadystatechange", 
                    function(){
                        if ( document.readyState === "complete" ) {
                            ready();
                        }
                });
            }
        } else {
            // Old browsers
            if (window.addEventListener)
                window.addEventListener('load', ready, false);
            else if (window.attachEvent)
                window.attachEvent('onload', ready);
            else {
                var fn = window.onload; // very old browser, copy old onload
                window.onload = function() { // replace by new onload and call the old one
                    fn && fn();
                    ready();
                };
            }
        }
    }
  }
  bindReady(handler);
})();

