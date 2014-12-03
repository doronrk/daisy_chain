/*
$Id: anchor_fix.js,v 1.2.4.1 2009/12/28 14:00:31 aim Exp $
vim: set ts=2 sw=2 sts=2 et:
*/

/*
  Fix a.href if base url is defined for page
*/

function anchor_fix() {
  var links = document.getElementsByTagName('A');
  var m;
  var _rg = new RegExp("(^|" + self.location.host + xcart_web_dir + "/)#([\\w\\d_]+)$")
  for (var i = 0; i < links.length; i++) {
    if (links[i].href && (m = links[i].href.match(_rg))) {
      links[i].href = 'javascript:void(self.location.hash = "' + m[2] + '");';
    }
  }
}

if (window.addEventListener)
  window.addEventListener("load", anchor_fix, false);

else if (window.attachEvent)
  window.attachEvent("onload", anchor_fix);
