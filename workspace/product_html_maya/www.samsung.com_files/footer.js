/* globals jQuery, Modernizr, enquire, smg, _ */
smg.global.Footer = (function ($, window, document) {
  'use strict';

  var $footerTop = $('.footer-top'),
      initialized;

  var MEDIA_QUERY_1 = 'screen and (max-width: 767px)',
    MEDIA_HANDLER_1 = {
      'match': setMobileState,
      'unmatch': setDesktopState,
      'setup': setInitialState
    };

  function setDesktopState() {
    $footerTop
        .off('click', 'h2', header_onClick)
        .find('.footer-store-products ul, .footer-pages ul, .footer-store-body')
        .each(function () {
          var $item = $(this);
          if ($item.data('slide-toggle')) {
            $item.data('slide-toggle').destroy();
          }
        })
        .show();
    $footerTop
        .find('h2').removeClass('open')
        .find('i').removeClass('inverted');
  }

  function setMobileState() {
    $footerTop.off('click', 'h2', header_onClick)
        .on('click', 'h2', header_onClick)
        .find('.footer-store-products ul, .footer-pages ul').hide();
  }

  function setInitialState() {
    if (!Modernizr.mq(MEDIA_QUERY_1)) {
      setDesktopState();
    }
  }

  function header_onClick(event) {
    var $header = $(event.currentTarget),
        $toggle = $header.next();

    if ($header.hasClass('open')) {
      $header.find('i').removeClass('inverted');
      smg.global.smgCssSlideToggle($toggle, {
        callback:function () {
          $header.removeClass('open');
        }
      });
    } else {
      $header.addClass('open')
        .find('i').addClass('inverted');
      smg.global.smgCssSlideToggle($toggle);
    }
  }

  function addListeners() {
    enquire.register(MEDIA_QUERY_1, MEDIA_HANDLER_1);
  }

  function removeListeners() {
    enquire.unregister(MEDIA_QUERY_1, MEDIA_HANDLER_1);
    $footerTop.off('click', 'h2', header_onClick);
  }

  function init() {
    if (!initialized) {
      addListeners();
      initialized = true;
    }
  }

  function destroy() {
    initialized = false;
    removeListeners();
  }

  return {
    init: init,
    destroy: destroy
  };

})(jQuery, window, document);