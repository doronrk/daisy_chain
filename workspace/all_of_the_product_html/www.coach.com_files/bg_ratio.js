(function($){
  var pr = 0, bgWidth = true, bgResize;

  bgResize = function(){
    var wr = $(window).width() / $(window).height();

    if(wr > pr && !bgWidth) {
      $('#back_img').css('width', '100%').css('height', '');
      bgWidth = true;
    } else if(wr < pr && bgWidth) {
      $('#back_img').css('height', '100%').css('width', '');
      bgWidth = false;
    }
  };

  $(document).ready(function() {
    var img = $('#back_img');
    if(img.height()) {
      pr = $('#back_img').width() / $('#back_img').height();
      bgResize();
    } else {
      img.load(function(){
        pr = $('#back_img').width() / $('#back_img').height();
        bgResize();
      });
    }

    $(window).resize(bgResize);

  });
})(jQuery);