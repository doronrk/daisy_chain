var skiptween;

(function($){
$(function(){
var $carousel = $('.look-book .cc-carousel');


$('.look-book .nav-arrow').on('click',function(evt){
  $carousel.ccCarousel('pause');
  $carousel.ccCarousel('show', $(this).is('.left') ? 'previous' : 'next');
});

if (Modernizr.touch) {
  var hammertime = new Hammer($('.look-book').get(0));
  hammertime.on('swipeleft', function(evt) {
    $carousel.ccCarousel('pause');
    $carousel.ccCarousel('show','next');
  });
  hammertime.on('swiperight', function(evt) {
    $carousel.ccCarousel('pause');
    $carousel.ccCarousel('show','previous');
  });
}

$carousel.on('mouseenter touchstart', function(evt){
    $carousel.ccCarousel('pause');
  });

$carousel.on('change',function(evt, ind, item) {
  $areas = $(item).find('area');
  createNewLinks($areas);
});

$carousel.ccCarousel({
  delay:5,
  ease:Quad.easeOut,
  selector:'.cc-slide',
  speed:1.5,
  startAt:0
});



function disableSelection(target){
if (typeof target.onselectstart!="undefined") //IE route
    target.onselectstart=function(){return false}
else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
    target.style.MozUserSelect="none"
else //All other route (ie: Opera)
    target.onmousedown=function(){return false}
  //target.style.cursor = "default"
}

function showQShop(href) {
  var _url = href.replace(".do","/QuickViewEnhancement.do");
  try {
    AX_Pop('540','645','','',href, '', '', '', 'auto', 'LookBook');
  }catch(e){
    console.log('error calling javascript:'+_url);
  }
}

function createNewLinks($new_links) {

  var $old_links = $('.look-book .links');

  var $links = $('<ul class="links"></ul>');

  $new_links.each(function(ind, item){
    var href = $(item).attr('href');
    var label = $(item).attr('alt');

    $links.append('<li><a class="cta" href="'+href+'">'+label+'</a></li>')
  });



  if($new_links.length != $old_links.find('li').length) {
    TweenLite.set($links,{alpha:0});

    TweenLite.to($links, .5, {
      alpha:1
    });

    TweenLite.to($old_links,.5, {
      alpha:0,
      onComplete:function(){
        $old_links.remove();
      }
    });
  } else {
    $old_links.remove();
  }

  $links.appendTo('.links-wrap');

  $links.find('.cta').click(function(evt){
    evt.preventDefault();
    showQShop($(this).attr('href'));
  })
}


$('.look-book .cc-slide').each(function(ind, item){
  $(this).find('area').click(function(evt){
    evt.preventDefault();
    showQShop($(this).attr('href'));
  });
});


});
})(jQuery);