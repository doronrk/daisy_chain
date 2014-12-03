// $('#bannerTarget').interactiveBanner({
//   title : 'Print In-Store Coupon',
//   markup: '<img src="/Content/2012/banners/wk15/MOMDAY12-Coupon-EMAIL.gif" alt="take 20% off your entire purchase!" width="600" height="309" />',
//   button: '<a href="#print" class="htmlbtn blue">Print Coupon</a>',
//   modalCover : '<a class="modalCover" href="#close"></a>',
//   modalContainer: '<div class="modalContainer"> <h2>@@modal-Title</h2> <div class="modalMarkup"> @@modal-Markup@@ </div> <a href="#close" class="closex">&times;</a> <a href="#close" class="htmlbtn grey">Close</a> @@modal-Btn@@ </div>'
// });





// <div id="bannerName">
//   <a href="#openModal" onclick="$(this).interactiveBanner({modalContainer: $(modalMarkup:$('#bannerName .couponHolder').html()})">Print Coupon</a>
//   <span class="couponHolder" style="display:none"><img src="/Content/2012/banners/wk15/MOMDAY12-Coupon-EMAIL.gif" alt="take 20% off your entire purchase!" width="600" height="309" /></span>
// </div>


  (function($){
    $.interactiveBanner = function(el, type, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("interactiveBanner", base);
        
        base.init = function(){
            if( typeof( type ) === "undefined" || type === null ) type = 'modal';
            
            base.type    = type;
            base.options = $.extend({},$.interactiveBanner.defaultOptions, options);
            
            
            // Simplify options we know we'll use
            base.debug = base.options['debug'];
            
            base.FLclose    = (base.options['FLclose']) ? base.options['FLclose'] : false;
            base.FLopen     = (base.options['FLopen'])  ? base.options['FLopen']  : false;
            base.FLprint    = (base.options['FLprint']) ? base.options['FLprint'] : false;

            if(base.options['markup']){
              if (typeof(base.$el.attr('style')) != 'string') {
                base.attrStyles = [];
              } else {
                base.attrStyles = base.$el.attr('style').toLowerCase().replace(/(;|:)/g, ',').replace(/,$/, '').split(',');
              }
              base.modalContent = base.options['markup'].replace(/@@stylemodal-([a-z0-9\-\_\+\.]+?)@@/ig, function(str,p1) { 
                p1 = p1.toLowerCase();
                for(i=0; i<base.attrStyles.length; i=i+2){
                  if (base.attrStyles[i] == p1) {
                    return base.attrStyles[i+1];
                  } else {
                    return '';
                    // Message for base.debug
                    if(base.debug){console.log( p1+'" did not match '+base.attrStyles[i]+'. Returning Nothing.')}
                  }
                }
              });
            };
            // Determine kind of interactive
            if(/modal/i.test(type)) {

              // Prep to use the data object for our modal banners;
              var modalContainer = base.$el.data('modalContainer');
              var modalCover = base.$el.data('modalCover');

              // see if we've already made this modal window
              if(!base.$el.data('modalContainer')){
                // message for base.debug
                if(base.debug){
                  console.log('Running modal interaction on: '); 
                  console.log(base.$el);
                }

                
                // if not we need to parse the tokens
                base.modalMarkup = base.options['modalContainer'].replace(/@@modal-([a-z0-9\-\_\+\.]+?)@@/ig, function(str,p1) {
                  p1 = p1.toLowerCase();
                  if (base.options[p1]) {
                      return base.options[p1];
                  } else {
                      return '';
                      // Message for base.debug
                      if(base.debug){console.log('Could not find "'+p1+'" in the modal options. Returning Nothing.')}
                  }
                });
                
                // assign modal window and cover to this banner
                base.$el.data('modalContainer', $(base.modalMarkup));
                base.$el.data('modalCover', $(base.options['modalCover']));
                // Message for base.Debug
                if(base.debug){console.log('Created cover and modal and stored them in data.');console.log(base.$el.data())}
                

                // reassign set this plugin's reference to this banner's modal and cover
                modalContainer = base.$el.data('modalContainer');
                modalCover = base.$el.data('modalCover');

                // assign bindings to the buttons and cover in this modal
                modalContainer.find('.close, a[href$="close"]').click(function(){
                  base.closeModal(modalContainer, modalCover);
                  return false;
                });
                modalCover.click(function(){
                  base.closeModal(modalContainer, modalCover);
                  return false;
                });
                modalContainer.find('.print, a[href$="print"]').click(function(){
                  base.printModal(base.options['markup']);
                    return false;
                });

                // place the already mapped modal window and cover to the modal in the body tag.
                // Message for base.Debug
                if(base.debug){console.log('Append modal elements.');}
                modalContainer.hide().appendTo('body').css({'margin-top': '-' + (modalContainer.height() * .5) + 'px', 'top': '-50%'}).show();
                modalCover.hide().appendTo('body');



                // Message for base.Debug
                if(base.debug){console.log('+++ end modal interaction +++');};
              }
              // either way, open this banner
              base.openModal(modalContainer, modalCover);


            } else if(/drawer|exlusions|mobile/i.test(type)) {
              var button = base.options['button'];
              var drawer = (base.options['drawer']) ? base.options['drawer'] : base.$el;
              // Message for base.debug
              if(base.debug){console.log('Running drawer interaction on: '); console.log(base.$el)}
              // exclusions are much easier... simply add a close button if it doesn't exist and slide down
              if(drawer) {
                var closeButton = drawer.find('.close, a[href$="close"]');
                if(closeButton.length == 0) {
                  closeButton = $(button).addClass('close');
                  drawer.append(closeButton);
                }

                // set listener for any close buttons
                closeButton.click(function(){
                  drawer.slideUp();

                  // Message for base.debug
                  if(base.debug){console.log('Close Drawer - from: '); console.log(base.$el)}
                  return false;
                });

                // open it up.                
                drawer.slideDown();

                // Message for base.debug
                if(base.debug){console.log('Open Drawer - from: '); console.log(base.$el)}

              }
            }

            // Floodlight listeners

        };
        
        // Sample Function, Uncomment to use

        // base.callFloodlight = function(source, type, cat) {
        //   if(source && type && cat){
        //     if(base.debug){console.log('Building a Floodlight Tag with: source:' + source + ' type:' + type + ' cat:' + cat);}

        //     var keyStr = "ABCDEFGHIJKLMNOP" +
        //        "QRSTUVWXYZabcdef" +
        //        "ghijklmnopqrstuv" +
        //        "wxyz0123456789+/" +
        //        "=";

        //     function encode64(input) {
        //        input = escape(input);
        //        var output = "";
        //        var chr1, chr2, chr3 = "";
        //        var enc1, enc2, enc3, enc4 = "";
        //        var i = 0;

        //        do {
        //           chr1 = input.charCodeAt(i++);
        //           chr2 = input.charCodeAt(i++);
        //           chr3 = input.charCodeAt(i++);

        //           enc1 = chr1 >> 2;
        //           enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        //           enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        //           enc4 = chr3 & 63;

        //           if (isNaN(chr2)) {
        //              enc3 = enc4 = 64;
        //           } else if (isNaN(chr3)) {
        //              enc4 = 64;
        //           }

        //           output = output +
        //              keyStr.charAt(enc1) +
        //              keyStr.charAt(enc2) +
        //              keyStr.charAt(enc3) +
        //              keyStr.charAt(enc4);
        //           chr1 = chr2 = chr3 = "";
        //           enc1 = enc2 = enc3 = enc4 = "";
        //        } while (i < input.length);

        //        return output;
        //     }
        //     var referrer = encode64(document.referrer);
        //     var tag_url="http://fls.doubleclick.net/activityi;src=" + source + ";type=" + type + ";cat=" + cat + ";u4=" + referrer + ";ord=1;num="+Math.floor(Math.random()*999999)+"?";
        //     if(document.getElementById("DCLK_FLDiv")){var flDiv=document.getElementById("DCLK_FLDiv");}
        //     else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="DCLK_FLDiv";flDiv.style.display="none";}
        //     var DCLK_FLIframe=document.createElement("iframe");
        //     DCLK_FLIframe.id="DCLK_FLIframe_"+Math.floor(Math.random()*999999);
        //     DCLK_FLIframe.src=tag_url;
        //     flDiv.appendChild(DCLK_FLIframe);
        //   } else if(base.debug){
        //     console.log('could not set floodlight tag - missing either the source, type or cat');
        //   }
        // }
        base.openModal = function(baseModal, baseCover){
          // ping floodlight tag if requested
          if(base.FLopen){var FLobj =base.FLopen; $.flagPage(FLobj.source, FLobj.type, FLobj.cat, base.debug)}

          if(base.debug){console.log('Open modal.')};
          // animate in the modal window
          baseModal.animate({'top': '50%', 'opacity': 1},500,function(){
            base.setPosModel(baseModal);
          });
          // add a class to the body and animate in the cover
          $('body').addClass('printCoupon');
          baseCover.fadeIn();

          // watch for resize
          $(window).resize(function(){
              base.setPosModel(baseModal);
          });
        
        };
        
        base.setPosModel = function(baseModal) {
          if(baseModal.height() > $(window).height()) {
            baseModal.addClass('tooFar');
          } else {
            baseModal.removeClass('tooFar');
          }
        };

        base.closeModal = function(baseModal, baseCover){
          // ping floodlight tag if requested
          if(base.FLclose){var FLobj =base.FLclose; $.flagPage(FLobj.source, FLobj.type, FLobj.cat, base.debug)}

          if(base.debug){console.log('Close modal.')};
          baseModal.removeClass('tooFar').animate({'top': '-50%', 'opacity': 0},500);
          baseCover.fadeOut(function(){
            $('body').removeClass('printCoupon');
          });
        };


        base.printModal = function(markup) {
          // Message for base.Debug
          if(base.debug){console.log('Print content for modal: '); console.log(base.$el)}
          // ping floodlight tag if requested
          if(base.FLprint){var FLobj =base.FLprint; $.flagPage(FLobj.source, FLobj.type, FLobj.cat, base.debug)}
          $.printMarkup(markup, base.debug);
        }
        

        // Run initializer
        base.init();
    };
    
    $.interactiveBanner.defaultOptions = {
      drawer: false,
      title : 'Print In-Store Coupon',
      markup: '<img src="/Content/2012/banners/wk15/MOMDAY12-Coupon-EMAIL.gif" alt="take 20% off your entire purchase!" width="600" height="309" />',
      button: '<a href="#close" class="closex">&times;</a>',
      button1: '<a href="#close" class="htmlbtn grey">Close</a>',
      button2: '<a href="#print" class="htmlbtn blue">Print Coupon</a>',
      modalCover : '<a class="modalCover" href="#close"></a>',
      modalContainer: '<div class="modalContainer"> <h2>@@modal-Title@@</h2> <div class="modalMarkup"> @@modal-Markup@@ </div> @@modal-button@@ @@modal-button1@@ @@modal-button2@@</div>',
      FLprint: false, // set an object {source: 0000000,type: 'xxxx123',cat: 'xxxx123'} get source, type and cat from agency
      FLopen: false, // set an object {source: 0000000,type: 'xxxx123',cat: 'xxxx123'} get source, type and cat from agency
      FLclose: false, // set an object {source: 0000000,type: 'xxxx123',cat: 'xxxx123'} get source, type and cat from agency
      debug: false // console logs key parts
    };
    $.flagPage = function(source, type, cat, debug) {
        if (source && type && cat) {
            if (debug) {
                console.log('Building a Floodlight Tag with: source:' + source + ' type:' + type + ' cat:' + cat);
            }

            var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

            function encode64(input) {
                input = escape(input);
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            }
            var referrer = encode64(document.referrer);
            var tag_url = "http://fls.doubleclick.net/activityi;src=" + source + ";type=" + type + ";cat=" + cat + ";u4=" + referrer + ";ord=1;num=" + Math.floor(Math.random() * 999999) + "?";
            if (document.getElementById("DCLK_FLDiv")) {
                var flDiv = document.getElementById("DCLK_FLDiv");
            } else {
                var flDiv = document.body.appendChild(document.createElement("div"));
                flDiv.id = "DCLK_FLDiv";
                flDiv.style.display = "none";
            }
            var DCLK_FLIframe = document.createElement("iframe");
            DCLK_FLIframe.id = "DCLK_FLIframe_" + Math.floor(Math.random() * 999999);
            DCLK_FLIframe.src = tag_url;
            flDiv.appendChild(DCLK_FLIframe);
        } else if (debug) {
            console.log('could not set floodlight tag - missing either the source, type or cat');
        }
    };
    $.flashTalking = function(id, name) {
      if(id && name){
        
        var tag_url="http://servedby.flashtalking.com/spot/4/4631;"+id+";3168/?spotName="+name+"&cachebuster="+Math.floor(Math.random()*999999)+"?";
        if(document.getElementById("DCLK_FLDiv")){var flDiv=document.getElementById("DCLK_FLDiv");}
        else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="DCLK_FLDiv";flDiv.style.display="none";}
        var DCLK_FLIframe=document.createElement("iframe");
        DCLK_FLIframe.id="DCLK_FLIframe_"+Math.floor(Math.random()*999999);
        DCLK_FLIframe.src=tag_url;
        flDiv.appendChild(DCLK_FLIframe);
        
      } else if(debug){
        console.log('could not set floodlight tag - missing either the source, type or cat');
      }
    };  
    $.printMarkup = function(markup, debug){
          
          if(debug){console.log('Building print IFrame... ');}
          
          var iframeContent  = "<!DOCTYPE html>" + "\n";
              iframeContent += "<html>" + "\n";
              iframeContent += "<style> @media print {body {zoom: 1; -moz-transform: scale(1); -moz-transform-origin: 0 0; -o-transform: scale(1); -o-transform-origin: 0 0; -webkit-transform: scale(1); -webkit-transform-origin: 0 0; } } </style>" + "\n";
              iframeContent += "<body style=\"text-align:center;\">" + "\n";
              iframeContent += "<head>" + "\n";
              iframeContent += "<title>" + "\n";
              iframeContent += "Famous Footwear - " + $(markup).attr('alt') + "\n";
              iframeContent += "</title>" + "\n";
              iframeContent += "</head>" + "\n";
              iframeContent += markup + "\n";
              iframeContent += "</body>" + "\n";
              iframeContent += "</html>" + "\n";

    
              // Create a random name for the print frame.
              var strFrameName = ("printer-" + (new Date()).getTime());
     
              // Create an iFrame with the new name.
              window['interactiveBannerPrintFrame'] = $( "<iframe name='" + strFrameName + "'>" );


              // Hide Frame
              interactiveBannerPrintFrame.css({ 
                  "width": "1px",
                  "height": "1px",
                  "position": "absolute", 
                  "left": "-9999px" 
              }).appendTo( $( "body:first" ) );
              
              // Message for base.Debug
              if(debug){console.log('Added iframe.');}

              // Get a FRAMES reference to the new frame.
              var objFrame = window.frames[ strFrameName ];
               
              // Get a reference to the DOM in the new frame.
              var objDoc = objFrame.document;

              // Build the printable iframe
              objDoc.open();
              objDoc.write( iframeContent );
              objDoc.close();
              setTimeout(function(){
                  // Print the document.
                objFrame.focus();
                objFrame.print();                
              }, 200);
              
              // Message for Debug
              if(debug){console.log('Set timeout to remove iframe in one minute.');};
              // After 1 minute remove the iframe.
              setTimeout(function(){
                interactiveBannerPrintFrame.remove();
                // Message for Debug
                if(debug){console.log('+++ end print function +++');};
              }, (60 * 1000));

              

        };
    $.fn.interactiveBanner = function(type, options){
        return this.each(function(){
            (new $.interactiveBanner(this, type, options));
        });
    };  
})(jQuery);