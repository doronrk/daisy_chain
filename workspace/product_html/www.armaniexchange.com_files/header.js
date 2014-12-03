(function($){
  var promo_message_delay = 4000;


  $(function(){

    var $win = $(window);
    var $headerCon = $('#header-container');
    var menuMainTop = $('#menu-main',$headerCon).offset().top-parseInt($('#menu-main',$headerCon).css('margin-top'));
    // SCROLL FEATURES
    $win.on({
      scroll: function(){
        // Fix header if scroll past header
        ( $(this).scrollTop() > menuMainTop ) ? $headerCon.addClass('fixed') : $headerCon.removeClass('fixed');
      }
    });

    var $searchCTA = $('#search-cta');
    var $searchBox = $('#search-box');

    function toggleSearch(){
      $searchCTA.add($searchBox).toggleClass('hide');
    }

    $searchCTA.click(function(){
      $searchCTA.addClass('hide');
      $searchBox.removeClass('hide');
      $('#menu-main').addClass('search-open');
      $searchBox.find('input[type="text"]').off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', toggleSearch).focus();
    });

    $searchBox.find('input[type="text"]').on('blur', function(e){
      $('#menu-main').removeClass('search-open');
      if (!$headerCon.parent().is('.ie')) {
        $searchBox.find('input[type="text"]').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', toggleSearch);
      } else {
        toggleSearch();
      }
    });

    $win.trigger('scroll'); //force scroll check to fix iPad issue on dom ready.

    if($('.msg').length > 1) {
      var msgCount = 0;
      var msgDelay;

      function hideMsg(){
        $('.msg').eq(msgCount).animate({ top:'-50px' }, 250);
        msgDelay = setTimeout(function(){
          msgCount = (msgCount+1) % $('.msg').length;
          showMsg(msgCount);
        }, 250);
      }

      function showMsg(ind){
        $('.msg').eq(ind).animate({ top:'0px' }, 250);

        msgDelay = setTimeout(function(){
          hideMsg();
        }, promo_message_delay);
      }

      $('.msg-wrap').
        mouseenter(function(){
          clearTimeout(msgDelay);
        }).
        mouseleave(function(){
          msgDelay = setTimeout(function(){
            hideMsg();
          }, promo_message_delay);
        });

     
        msgDelay = setTimeout(function(){
          hideMsg();
        }, promo_message_delay);
      

    }
  });



})(jQuery);
