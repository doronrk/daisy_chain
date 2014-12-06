/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};





$(document).ready(function() {
  setTimeout('lightbox()',2000);
});

function lightbox()
{
  /*
  $('#newsletter').lightbox_me({
    centered: true
  });
  */
  
  if ($.cookie('20080521') != '1') {
    $('#newsletter').lightbox_me({
      centered: true
    });
	$.cookie('20080521', '1', { expires: 30 }); 
  }
}




/*
* jQuery lightbox_me
* By: Buck Wilson
* Version : 2.3
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


(function(jQuery) {

    jQuery.fn.lightbox_me = function(options) {

        return this.each(function() {

            var
                opts = jQuery.extend({}, jQuery.fn.lightbox_me.defaults, options),
                jQueryoverlay = jQuery(),
                jQueryself = jQuery(this),
                jQueryiframe = jQuery('<iframe id="foo" style="z-index: ' + (opts.zIndex + 1) + ';border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0; filter: mask();"/>'),
                ie6 = (jQuery.browser.msie && jQuery.browser.version < 7);

            if (opts.showOverlay) {
                //check if there's an existing overlay, if so, make subequent ones clear
               var jQuerycurrentOverlays = jQuery(".js_lb_overlay:visible");
                if (jQuerycurrentOverlays.length > 0){
                    jQueryoverlay = jQuery('<div class="lb_overlay_clear js_lb_overlay"/>');
                } else {
                    jQueryoverlay = jQuery('<div class="' + opts.classPrefix + '_overlay js_lb_overlay"/>');
                }
            }

            /*----------------------------------------------------
               DOM Building
            ---------------------------------------------------- */
            if (ie6) {
                var src = /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank';
                jQueryiframe.attr('src', src);
                jQuery('body').append(jQueryiframe);
            } // iframe shim for ie6, to hide select elements
            jQuery('body').append(jQueryself.hide()).append(jQueryoverlay);


            /*----------------------------------------------------
               Overlay CSS stuffs
            ---------------------------------------------------- */

            // set css of the overlay
            if (opts.showOverlay) {
                setOverlayHeight(); // pulled this into a function because it is called on window resize.
                jQueryoverlay.css({ position: 'absolute', width: '100%', top: 0, left: 0, right: 0, bottom: 0, zIndex: (opts.zIndex + 2), display: 'none' });
				if (!jQueryoverlay.hasClass('lb_overlay_clear')){
                	jQueryoverlay.css(opts.overlayCSS);
                }
            }

            /*----------------------------------------------------
               Animate it in.
            ---------------------------------------------------- */
               //
            if (opts.showOverlay) {
                jQueryoverlay.fadeIn(opts.overlaySpeed, function() {
                    setSelfPosition();
                    jQueryself[opts.appearEffect](opts.lightboxSpeed, function() { setOverlayHeight(); setSelfPosition(); opts.onLoad()});
                });
            } else {
                setSelfPosition();
                jQueryself[opts.appearEffect](opts.lightboxSpeed, function() { opts.onLoad()});
            }

            /*----------------------------------------------------
               Hide parent if parent specified (parentLightbox should be jquery reference to any parent lightbox)
            ---------------------------------------------------- */
            if (opts.parentLightbox) {
                opts.parentLightbox.fadeOut(200);
            }


            /*----------------------------------------------------
               Bind Events
            ---------------------------------------------------- */

            jQuery(window).resize(setOverlayHeight)
                     .resize(setSelfPosition)
                     .scroll(setSelfPosition)
                     .keyup(observeKeyPress);
            if (opts.closeClick) {
                jQueryoverlay.click(function(e) { closeLightbox(); e.preventDefault; });
            }
            jQueryself.delegate(opts.closeSelector, "click", function(e) {
                closeLightbox(); e.preventDefault();
            });
            jQueryself.bind('close', closeLightbox);
            jQueryself.bind('reposition', setSelfPosition);

            

            /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
              -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


            /*----------------------------------------------------
               Private Functions
            ---------------------------------------------------- */

            /* Remove or hide all elements */
            function closeLightbox() {
                var s = jQueryself[0].style;
                if (opts.destroyOnClose) {
                    jQueryself.add(jQueryoverlay).remove();
                } else {
                    jQueryself.add(jQueryoverlay).hide();
                }

                //show the hidden parent lightbox
                if (opts.parentLightbox) {
                    opts.parentLightbox.fadeIn(200);
                }

                jQueryiframe.remove();
                
				// clean up events.
                jQueryself.undelegate(opts.closeSelector, "click");

                jQuery(window).unbind('reposition', setOverlayHeight);
                jQuery(window).unbind('reposition', setSelfPosition);
                jQuery(window).unbind('scroll', setSelfPosition);
                jQuery(document).unbind('keyup', observeKeyPress);
                if (ie6)
                    s.removeExpression('top');
                opts.onClose();
            }


            /* Function to bind to the window to observe the escape/enter key press */
            function observeKeyPress(e) {
                if((e.keyCode == 27 || (e.DOM_VK_ESCAPE == 27 && e.which==0)) && opts.closeEsc) closeLightbox();
            }


            /* Set the height of the overlay
                    : if the document height is taller than the window, then set the overlay height to the document height.
                    : otherwise, just set overlay height: 100%
            */
            function setOverlayHeight() {
                if (jQuery(window).height() < jQuery(document).height()) {
                    jQueryoverlay.css({height: jQuery(document).height() + 'px'});
                     jQueryiframe.css({height: jQuery(document).height() + 'px'}); 
                } else {
                    jQueryoverlay.css({height: '100%'});
                    if (ie6) {
                        jQuery('html,body').css('height','100%');
                        jQueryiframe.css('height', '100%');
                    } // ie6 hack for height: 100%; TODO: handle this in IE7
                }
            }


            /* Set the position of the modal'd window (jQueryself)
                    : if jQueryself is taller than the window, then make it absolutely positioned
                    : otherwise fixed
            */
            function setSelfPosition() {
                var s = jQueryself[0].style;

                // reset CSS so width is re-calculated for margin-left CSS
                jQueryself.css({left: '50%', marginLeft: (jQueryself.outerWidth() / 2) * -1,  zIndex: (opts.zIndex + 3) });


                /* we have to get a little fancy when dealing with height, because lightbox_me
                    is just so fancy.
                 */

                // if the height of jQueryself is bigger than the window and self isn't already position absolute
                if ((jQueryself.height() + 80  >= jQuery(window).height()) && (jQueryself.css('position') != 'absolute' || ie6)) {

                    // we are going to make it positioned where the user can see it, but they can still scroll
                    // so the top offset is based on the user's scroll position.
                    var topOffset = jQuery(document).scrollTop() + 40;
                    jQueryself.css({position: 'absolute', top: topOffset + 'px', marginTop: 0})
                    if (ie6) {
                        s.removeExpression('top');
                    }
                } else if (jQueryself.height()+ 80  < jQuery(window).height()) {
                    //if the height is less than the window height, then we're gonna make this thing position: fixed.
                    // in ie6 we're gonna fake it.
                    if (ie6) {
                        s.position = 'absolute';
                        if (opts.centered) {
                            s.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')
                            s.marginTop = 0;
                        } else {
                            var top = (opts.modalCSS && opts.modalCSS.top) ? parseInt(opts.modalCSS.top) : 0;
                            s.setExpression('top', '((blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"')
                        }
                    } else {
                        if (opts.centered) {
                            jQueryself.css({ position: 'fixed', top: '50%', marginTop: (jQueryself.outerHeight() / 2) * -1})
                        } else {
                            jQueryself.css({ position: 'fixed'}).css(opts.modalCSS);
                        }

                    }
                }
            }

        });



    };

    jQuery.fn.lightbox_me.defaults = {

        // animation
        appearEffect: "fadeIn",
        appearEase: "",
        overlaySpeed: 250,
        lightboxSpeed: 300,

        // close
        closeSelector: ".close",
        closeClick: true,
        closeEsc: true,

        // behavior
        destroyOnClose: false,
        showOverlay: true,
        parentLightbox: false,

        // callbacks
        onLoad: function() {},
        onClose: function() {},

        // style
        classPrefix: 'lb',
        zIndex: 999,
        centered: false,
        modalCSS: {top: '40px'},
        overlayCSS: {background: 'black', opacity: .3}
    }
})(jQuery);

$(function(){
	setTimeout("alterForm()", 4000);
});

function alterForm()
{
	$('#newsletter .fsSubmit input.fsSubmitButton').attr('value','');
	$('#newsletter .fsSubmit input.fsSubmitButton').replaceWith('<img src="/lib/beltoutlet/ey-popup-submit.jpg" class="fsSubmitButton" onclick="submitForm()" style="cursor: pointer;">');
	$('#newsletter .fsForm').attr('target','BlankFrame');
	$('#newsletter .fsForm').after('<iframe name="BlankFrame" id="BlankFrame" height="0" style="display: none;"></iframe>');
	$('#newsletter .fsForm').show();
}

function submitForm()
{
	var x=$('#newsletter .fsFormatEmail').attr('value');
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	if($('#newsletter .fsFormatEmail').attr('value') == '' || atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
	{
		alert('Please enter valid email address');
		return;
	}
	else
	{
		$('#newsletter .fsForm').submit();
		$('#newsletter .news1').hide();
		$('#newsletter .news2').show();
		//$('#newsletter .close').css({'top':'-9px' , 'right':'129px'});
		$('#newsletter .close').css({'top':'0px'});
		window.scrollTo(0,0);
	}

}