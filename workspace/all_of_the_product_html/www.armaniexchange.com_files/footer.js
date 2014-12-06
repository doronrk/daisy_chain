(function($){

  $(function(){
    var $win = $(window);
    var $toggleTrigger = $('[data-slide]');
    var speed = 200;

    $win.on('click scroll', function(evt){
      if(($('#country-select').is('.open') && evt.type == scroll) ||
         ($('#country-select').is('.open') && !$(evt.target).closest('#country-select').length)){
        $('[data-slide-content]').slideUp(speed);
        $('#country-select').removeClass('open');
      }
    });

    $toggleTrigger.on({
      click: function(e) { openContent( e, this ) }
    });

    function openContent(e,el) {
      e.stopPropagation();
      var type = $(el).data();

      if(type.slide) {
        $('[data-slide-content=' + type.slide + ']').slideToggle(speed);
      } else if(type.fade) {
        $('[data-fade-content=' + type.fade + ']').fadeToggle(speed);
      } else if(type.close) {
        $('[data-fade-content=' + type.close + ']').fadeToggle(speed);
      }

      $('#country-select').toggleClass('open');
    }
  });
})(jQuery);