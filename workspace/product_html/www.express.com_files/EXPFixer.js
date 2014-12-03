/* EXPFixer.js Do not remove. */

(function pdpvideo() {
    $("#express-view-images-list").one('imagesetloaded', function() {
        var videoSrc = function() {
            var dict = {};
            dict['prod-1268159-page'] = "<source src='/cdn/responsive/video/products/1268159.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/1268159.ogv' type='video/ogg' />";
            dict['prod-7798060-page'] = "<source src='/cdn/responsive/video/products/7798060.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7798060.ogv' type='video/ogg' />";
            dict['prod-7847963-page'] = "<source src='/cdn/responsive/video/products/7847963.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7847963.ogv' type='video/ogg' />";
            dict['prod-7923367-page'] = "<source src='/cdn/responsive/video/products/7923367.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7923367.ogv' type='video/ogg' />";
            dict['prod-7938045-page'] = "<source src='/cdn/responsive/video/products/7938045.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7938045.ogv' type='video/ogg' />";
            dict['prod-7938164-page'] = "<source src='/cdn/responsive/video/products/7938164.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7938164.ogv' type='video/ogg' />";
            dict['prod-7938179-page'] = "<source src='/cdn/responsive/video/products/7938179.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7938179.ogv' type='video/ogg' />";
            dict['prod-7938187-page'] = "<source src='/cdn/responsive/video/products/7938187.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7938187.ogv' type='video/ogg' />";
            dict['prod-7943040-page'] = "<source src='/cdn/responsive/video/products/7943040.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7943040.ogv' type='video/ogg' />";
            dict['prod-7988118-page'] = "<source src='/cdn/responsive/video/products/7988118.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7988118.ogv' type='video/ogg' />";
            dict['prod-8268560-page'] = "<source src='/cdn/responsive/video/products/8268560.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/8268560.ogv' type='video/ogg' />";
            dict['prod-8268663-page'] = "<source src='/cdn/responsive/video/products/8268663.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/8268663.ogv' type='video/ogg' />";
            dict['prod-8324175-page'] = "<source src='/cdn/responsive/video/products/9597623.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/8324175.ogv' type='video/ogg' />";
            dict['prod-9538660-page'] = "<source src='/cdn/responsive/video/products/9597623.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/9538660.ogv' type='video/ogg' />";
            dict['prod-8268458-page'] = "<source src='/cdn/responsive/video/products/8268458.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/8268458.ogv' type='video/ogg' />";
            dict['prod-7736426-page'] = "<source src='/cdn/responsive/video/products/7736426_1222310.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7736426_1222310.ogv' type='video/ogg' />";
            dict['prod-1222310-page'] = "<source src='/cdn/responsive/video/products/7736426_1222310.mp4' type='video/mp4' /><source src='/cdn/responsive/video/products/7736426_1222310.ogv' type='video/ogg' />";
            return dict[findProdIdClass()];
        };

        var backgroundImage = function() {
            var dict = {};
            dict['prod-1268159-page'] = "/cdn/responsive/video/products/1268159-thumb.jpg";
            dict['prod-7798060-page'] = "/cdn/responsive/video/products/7798060-thumb.jpg";
            dict['prod-7847963-page'] = "/cdn/responsive/video/products/7847963-thumb.jpg";
            dict['prod-7923367-page'] = "/cdn/responsive/video/products/7923367-thumb.jpg";
            dict['prod-7938045-page'] = "/cdn/responsive/video/products/7938045-thumb.jpg";
            dict['prod-7938164-page'] = "/cdn/responsive/video/products/7938164-thumb.jpg";
            dict['prod-7938179-page'] = "/cdn/responsive/video/products/7938179-thumb.jpg";
            dict['prod-7938187-page'] = "/cdn/responsive/video/products/7938187-thumb.jpg";
            dict['prod-7943040-page'] = "/cdn/responsive/video/products/7943040-thumb.jpg";
            dict['prod-7988118-page'] = "/cdn/responsive/video/products/7988118-thumb.jpg";
            dict['prod-8268560-page'] = "/cdn/responsive/video/products/8268560-thumb.jpg";
            dict['prod-8268663-page'] = "/cdn/responsive/video/products/8268663-thumb.jpg";
            dict['prod-8324175-page'] = "/cdn/responsive/video/products/8324175-thumb.jpg";
            dict['prod-9538660-page'] = "/cdn/responsive/video/products/9538660-thumb.jpg";
            dict['prod-8268458-page'] = "/cdn/responsive/video/products/8268458-thumb.jpg";
            dict['prod-7736426-page'] = "/cdn/responsive/video/products/7736426_1222310-thumb.jpg";
            dict['prod-1222310-page'] = "/cdn/responsive/video/products/7736426_1222310-thumb.jpg";
            return dict[findProdIdClass()];
        };

        var posterImage = function() {
            var dict = {};
            dict['prod-1268159-page'] = "/cdn/responsive/video/products/1268159-poster.jpg";
            dict['prod-7798060-page'] = "/cdn/responsive/video/products/7798060-poster.jpg";
            dict['prod-7847963-page'] = "/cdn/responsive/video/products/7847963-poster.jpg";
            dict['prod-7923367-page'] = "/cdn/responsive/video/products/7923367-poster.jpg";
            dict['prod-7938045-page'] = "/cdn/responsive/video/products/7938045-poster.jpg";
            dict['prod-7938164-page'] = "/cdn/responsive/video/products/7938164-poster.jpg";
            dict['prod-7938179-page'] = "/cdn/responsive/video/products/7938179-poster.jpg";
            dict['prod-7938187-page'] = "/cdn/responsive/video/products/7938187-poster.jpg";
            dict['prod-7943040-page'] = "/cdn/responsive/video/products/7943040-poster.jpg";
            dict['prod-7988118-page'] = "/cdn/responsive/video/products/7988118-poster.jpg";
            dict['prod-8268560-page'] = "/cdn/responsive/video/products/8268560-poster.jpg";
            dict['prod-8268663-page'] = "/cdn/responsive/video/products/8268663-poster.jpg";
            dict['prod-8324175-page'] = "/cdn/responsive/video/products/8324175-poster.jpg";
            dict['prod-9538660-page'] = "/cdn/responsive/video/products/9538660-poster.jpg";
            dict['prod-8268458-page'] = "/cdn/responsive/video/products/8268458-poster.jpg";
           dict['prod-7736426-page'] = "/cdn/responsive/video/products/7736426_1222310-poster.jpg";
            dict['prod-1222310-page'] = "/cdn/responsive/video/products/7736426_1222310-poster.jpg";
            return dict[findProdIdClass()];
        };

        var findProdIdClass = function() {
            var bodyClassList = $('body').attr('class').split(" "),
                prodIdClass = '';
            for (i = 0; i < bodyClassList.length; i++) {
                if (bodyClassList[i].trim().indexOf('prod-') != -1) {
                    prodIdClass = bodyClassList[i].trim();
                    break;
                }
            }
            return prodIdClass;
        };

        var isProductEligibleForVideo = function() {
            var prodIdClass = findProdIdClass(),
                videoSource = videoSrc();
            if (prodIdClass !== '' && typeof videoSource !== 'undefined') {
                return $('body').hasClass(prodIdClass);
            }
            return false;
        };

        var updateThumbnailBackground = function() {
            if (head.screen.innerWidth > 999) {
                $(".product-images-list ul.video-cta-container li").css('background', 'url("' + backgroundImage() + '") no-repeat');
            }
            else {
                $(".product-images-list ul.video-cta-container li").css('background', 'none');
            }
        };

        var videoTag = function() {
            return "<video controls preload poster='" + posterImage() + "'>" + videoSrc() + "</video>";
        };

        if (isProductEligibleForVideo()) {
            var videoThumbnailContainer = $("<ul class='video-cta-container'><li><a href='#' class='prod-video-cta'>PLAY</a></li></ul>");
            $('body').addClass('video-detail');
            videoThumbnailContainer.insertBefore('#express-view-images-list');
            videoThumbnailContainer.clone().insertBefore('#product-detail-flyout-container');
            updateThumbnailBackground();
            if ($('#video-modal').length == 0) {
                $('body').append('<div id="video-modal" class="video-modal hide">' + videoTag() + '</div>');
            }
            $(window).on('sizeupdated', function() {
                updateThumbnailBackground();
            });
        };

        var stopVideo = function(video) {
            if (!video.get(0).paused) {
                video.get(0).pause();
            }
            video.get(0).currentTime = 0.1;
        };

        var isFullScreen = function() {
            return ((typeof(document.fullscreen) !== 'undefined' && document.fullscreen) ||
               (typeof(document.mozFullScreen) !== 'undefined' && document.mozFullScreen) ||
               (typeof(document.webkitIsFullScreen) !== 'undefined' && document.webkitIsFullScreen));
        };

        var resetVideo = function() {
            var video = $('#video-modal video');
            if (!isFullScreen()) {
                stopVideo(video);
                $('#video-modal').hide();
                video.off('webkitendfullscreen fullscreenschange mozfullscreenchange webkitfullscreenchange', resetVideo);
            }
        };

        var cancelFullscreen = function() {
            var video = $('#video-modal video');
            stopVideo(video);
            if (typeof(video.get(0).webkitExitFullscreen) !== 'undefined') {
                video.get(0).webkitExitFullscreen();
            }
            else if (typeof(video.get(0).webkitCancelFullscreen) !== 'undefined') {
                video.get(0).webkitCancelFullscreen();
            }
            else if (typeof(video.get(0).mozCancelFullscreen) !== 'undefined') {
                video.get(0).mozCancelFullscreen();
            }
            $('#video-modal').hide();
            video.off('error ended', resetVideo);
        };

        $('.video-detail a.prod-video-cta').on('click', function(e) {
            e.preventDefault();
            if (!head.touch || head.screen.innerWidth >= 768) {
                $('#video-modal').remove();
                $('body').append('<div id="video-modal" class="video-modal"></div>');
                $.fn.expressModal({
                    method: 'local',
                    modalId: 'video-modal',
                    modalClass: '.video-modal',
                    modalBackgroundClose: true,
                    modalAnimation: 'fade',
                    callback: function() {
                        $('#video-modal').append(videoTag());
                        $('#video-modal video').get(0).play();
                    }
                });
                $('body').on('reveal:closed', '#video-modal', function() {
                    stopVideo($('#video-modal video'));
                });
            }
            else {
                var video = $('#video-modal video');
                $('#video-modal').show();
                video.get(0).play();
                if (typeof(video.get(0).webkitRequestFullscreen) !== 'undefined') {
                    video.get(0).webkitRequestFullscreen();
                }
                else if (typeof(video.get(0).webkitEnterFullscreen) !== 'undefined') {
                    video.get(0).webkitEnterFullscreen();
                }
                else if (typeof(video.get(0).mozRequestFullscreen) !== 'undefined') {
                    video.get(0).mozRequestFullscreen();
                }
                video.on('error ended', cancelFullscreen);
                video.on('webkitendfullscreen fullscreenschange mozfullscreenchange webkitfullscreenchange', resetVideo);
            }
        });
    });
})();

head.ready('all', function() {
    head.ready(document, function() {
        if($('#favorites [data-infinite-carousel]:not([style*=visibility])').length){
                        new InfiniteCarousel(jQuery, window, document).init($('#favorites [data-infinite-carousel]:not([style*=visibility])'));
        }
        if($('.features-carousel [data-infinite-carousel]:not([style*=visibility])').length){
                        new InfiniteCarousel(jQuery, window, document).init($('.features-carousel [data-infinite-carousel]:not([style*=visibility])'));
        }
        if($('.browse [data-infinite-carousel]:not([style*=visibility])').length){
                        var infiniteCarouselBrowse = new InfiniteCarousel(jQuery, window, document);
                        infiniteCarouselBrowse.previewOnMobileWidth(0.25);
                        infiniteCarouselBrowse.init($('.browse [data-infinite-carousel]:not([style*=visibility])'));
        }

        if ($('[data-hero-carousel]:not([style*=visibility])').length) {
                        new HeroXlCarousel(jQuery, window, document).init();
        }

        if($('[data-browse-carousel]:not([style*=visibility])').length){
                        new BrowseCarousel(jQuery, window, document).init();
        }
    });
});

// Global Banner Functions
head.ready('all', function(){
    var debug = true;
    try {
        console.log
    } catch(e) {
        if(e) {
            debug=false;
        }
    };
    function getCookie(a) {
        var b = '; ' + document.cookie;
        var c = b.split('; ' + a + '=');
        if (c.length == 2) {
            return c.pop().split(';').shift();
        }
    }
    var freeShipCollapsed = getCookie('freeShipCollapsed');
    if (freeShipCollapsed) {
        $('#mobile-shipping-banner').remove();
    } else {
        if(head.screen.innerWidth < 768) {
            $('#mobile-shipping-banner').removeClass('hidden');
        }
    }

    $("#global-promotion-container #mobile-shipping-banner .row > .closeX").click(function(e) {
        if(!$(this).parents('.banner-outer').find('.detailsContent.expanded').length){
            document.cookie = 'freeShipCollapsed = 1';
            $('#mobile-shipping-banner').remove();
        } else {
            $(this).parents('.banner-outer').find('.detailsArea').slideToggle();
            $(this).parents('.banner-outer').find('.detailsContent').removeClass('expanded');
        }
    });

    $(".slideDownDetails").click(function(e) {
        if($(this).is('a')){
            var self = $(this);
            var source = $(this).attr('href');
            var selector = '#' + $(this).data('selector');
            if(!$(this).parents('#mobile-shipping-banner').length){
                if(head.screen.innerWidth < 768) {
                    return;
                }
            }
        } else {
            var self = $(this).find('.slideDownDetails');
            var source = $(this).find('.slideDownDetails').attr('href');
            var selector = '#' + $(this).find('.slideDownDetails').data('selector');
            if(head.screen.innerWidth > 767) {
                return;
            }
        }
        e.preventDefault();
        var toLoad = source + ' ' + selector;
        if(!$(this).parents('.banner-outer').find('.detailsContent').hasClass('loaded')) {
            if(!$(this).parents('.banner-outer').find('.detailsContent').hasClass('expanded')){
                $(this).parents('.banner-outer').find('.detailsContent').load(toLoad, function(e){
                    $(this).parents('.banner-outer').find('.detailsArea').slideToggle();
                    $(this).parents('.banner-outer').find('.detailsContent').addClass('loaded');
                    $(this).parents('.banner-outer').find('.detailsContent').addClass('expanded');
                });
                return;
            } else {
                $(this).parents('.banner-outer').find('.detailsArea').slideToggle();
                $(this).parents('.banner-outer').find('.detailsContent').removeClass('expanded');
                return;
            }
        } else {
            if(!$(this).parents('.banner-outer').find('.detailsContent').hasClass('expanded')){
                $(this).parents('.banner-outer').find('.detailsArea').slideToggle();
                $(this).parents('.banner-outer').find('.detailsContent').addClass('expanded');
                return;
            } else {
                $(this).parents('.banner-outer').find('.detailsArea').slideToggle();
                $(this).parents('.banner-outer').find('.detailsContent').removeClass('expanded');
                return;
            }
        }
    });
    $('#global-promotion-container .banner-outer .detailsArea .closeX').click(function(){
        $(this).parent('.detailsArea').slideToggle();
        $(this).parents('.banner-outer').find('.detailsContent').removeClass('expanded');
    });

    $(window).resize(function() {
        if(head.screen.innerWidth < 768) {
            $('#mobile-shipping-banner').removeClass('hidden');
        }
        if(head.screen.innerWidth > 767) {
            $('#mobile-shipping-banner').addClass('hidden');
        }
    });
});

// homepage email capture
head.ready('all',function(){

  window.subscribeInfoSubmitInline = {
    errorElement: 'small',
    ignoreTitle: true,
    focusInvalid: false,
    errorSummary: true,
    rules: {
      'subscribe-email-address-inline': {required: true,email: true}
    },
    messages: {
      'subscribe-email-address': {required: messages.email_required, email: messages.email_invalid}
    },
    submitHandler: function(form) {
      form = $(form);
      expressAjaxFind({
        data: form.serializeArray(),
        method: form.attr('method'),
        theUrl: form.attr('action'),
        callback: function() {
          $.cookie("emailSubscribe", 1, {path: '/'});
          setTimeout(function(){
            $('#email-promotion').removeClass('slideInUp').addClass('slideOutDown');
              setTimeout(function(){
                $('#email-promotion').remove();
              }, 1000);
          }, 3000);
        }
      });
    }
  };

  expressValidateForms();

  $('#email-promotion .close').click(function() {
      document.cookie = 'emailSubscribe = 1';
      $('#email-promotion').removeClass('slideInUp').addClass('slideOutDown');
      $('#email-overlay').removeClass('expand');
      setTimeout(function() {
          $('#email-promotion').remove();
      }, 1000)
  });

  if($('body').hasClass('homepage')){
    var fixEmail = false;
    $('#email-promotion').on('click mouseover', function () {
        fixEmail = true;
        return;
    });
    setTimeout(function() {
      if(fixEmail===true){return;}else{
        $('#email-promotion').removeClass('slideInUp').addClass('slideOutDown');
        setTimeout(function() {
          $('#email-promotion').remove();
        }, 1000);
      }
    }, 15000);
  }

  function getCookie(a) {
      var b = '; ' + document.cookie;
      var c = b.split('; ' + a + '=');
      if (c.length == 2) {
          return c.pop().split(';').shift();
      }
  }
  var emailSubscribed = getCookie('emailSubscribe');
  if (emailSubscribed) {
      $('#email-promotion').remove();
  } else {
      $('#email-promotion').removeClass('hidden').addClass('animated').addClass('slideInUp');
  }

  function mobileSubscribeExpand() {
      $('#email-promotion').addClass('expand').addClass('solid');
      $('#email-promotion .close').addClass('solid');
      $('#promotion-msg').addClass('expand');
      $('#email-overlay').addClass('expand').addClass('slideInUp');
      $('#email-promotion form').css('display', 'inherit');
      if ($('html').hasClass('mobile')) {
          setTimeout(function() {
              var a = $('#email-promotion');
              var b = a.offset().top;
              a.addClass('absolute');
              a.css('top', b);
          }, 500);
      }
  }
  if ((window.innerWidth < 768) || ($('html').hasClass('mobile'))) {
      $('#promotion-msg').click(function() {
          mobileSubscribeExpand();
      })
  }
  $(window).resize(function() {
    if ((window.innerWidth < 768) || ($('html').hasClass('mobile'))) {
      if (!$('#email-promotion').hasClass('expand')) {
          $('#email-promotion form').css('display', 'none');
      }
      $('#promotion-msg').click(function() {
          mobileSubscribeExpand();
      })
    } else {
      $('#email-promotion form').css('display', 'table-cell');
      $('#email-promotion').removeClass('expand').removeClass('solid');
      $('#email-promotion .close').removeClass('solid');
      $('#promotion-msg').removeClass('expand');
    }
  });

  function solidEmailBg() {
    $('#email-promotion').addClass('expand');
    $('#email-promotion').addClass('solid');
    $('#email-promotion .close').addClass('solid');
  }

  var validEmail = false;
  function validateEmail(emailSignUp) {
    var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailReg.test(emailSignUp);
  }
    $("#subscribe-email-address-inline").bind('keyup blur',function() {
    var emailSignUp = $("#subscribe-email-address-inline").val();
      if (!validateEmail(emailSignUp)) {
        $('#promotion-email-submit').prop('type', 'button');
      }else{
        validEmail = true;
        $('#email-input-wrap .error-msg').addClass('hidden');
        $('#subscribe-email-address-inline').removeClass('error');
        $('#promotion-email-submit').prop('type', 'submit');
        $('#promotion-email-submit').prop('disabled', false);
      }
  });
  $("#subscribe-email-address-inline").blur(function() {
    var emailSignUp = $("#subscribe-email-address-inline").val();
      if (!validateEmail(emailSignUp)) {
        $('#email-input-wrap .error-msg').removeClass('hidden').addClass('fadeIn');
        $('#subscribe-email-address-inline').addClass('error');
      }else{
        $('#email-input-wrap .error-msg').addClass('hidden');
        $('#subscribe-email-address-inline').removeClass('error');
      }
  });
  if ($('#subscribe-email-address-inline').hasClass('error')) {
    $('#email-input-wrap .error-msg').removeClass('hidden').addClass('fadeIn');
  }
  $('#subscribe-email-address-inline').focus(function() {
      solidEmailBg();
      if($('#email-input-wrap small').length){
        $('#email-input-wrap .error-msg').removeClass('hidden').addClass('fadeIn');
        $('#subscribe-email-address-inline').addClass('error');
      }
  });

  $('#email-overlay').click(function() {
      $('#email-promotion').removeClass('absolute').removeClass('expand').addClass('transition').css('top', 'initial');
      $('#email-overlay').removeClass('expand');
      setTimeout(function() {
          $('#email-promotion #promotion-msg').removeClass('expand');
          $('#email-promotion form').css('display', 'none');
      }, 500);
  });

  $('#promotion-email-submit').click(function() {
    if(($('#promotion-email-submit')).attr('type') == 'button'){
      $('#email-input-wrap .error-msg').removeClass('hidden').addClass('fadeIn');
      $('#subscribe-email-address-inline').addClass('error');
    }else{
      $('#email-promotion-content').addClass('hidden');
      $('#email-promotion-success').removeClass('hidden').addClass('fadeIn');
    }
  });
});