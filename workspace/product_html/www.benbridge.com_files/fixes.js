/*
$Id: fixes.js,v 1.1 2008/11/18 11:23:32 max Exp $
vim: set ts=2 sw=2 sts=2 et:
*/

/*
  Position:absolute elements will not move when window is resized if a sibling contains float elements and a clear:both element
  https://bugzilla.mozilla.org/show_bug.cgi?id=442542
  FireFox 3.0+
*/
if (navigator.userAgent.toLowerCase().search(/firefox\/(3\.\d+)/i) != -1 && typeof(window.$) != 'undefined') {
  $.event.add(
    window,
    'resize',
    function() {
      var h = document.getElementById('header');
      if (!h || $(h).css('position') != 'absolute')
        return;

      document.getElementById('header').style.position = 'static';
      setTimeout(
        function() {
          document.getElementById('header').style.position = 'absolute';
        },
      20);
    }
  );
}
