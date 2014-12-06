_satellite.pushAsyncScript(function(event, target, $variables){
  // FACEBOOK-Site Remarketing
(function(){
  window._fbds = window._fbds || {};
  _fbds.pixelId = 687113298007767;
  var fbds = document.createElement('script');
  fbds.async = true;
  fbds.src = '//connect.facebook.net/en_US/fbds.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(fbds, s);
})();
window._fbq = window._fbq || [];
window._fbq.push(["track", "PixelInitialized", {}]);
});
