var mboxCurrent=mboxFactories.get('default').get('nm_template_product',0);mboxCurrent.setEventTime('include.start');document.write('<div style="visibility: hidden; display: none" id="mboxImported-default-nm_template_product-0">');/* Offer id: 64189*/ 

_mboxDefaultContentOffer = function() {
  this._onLoad = function() {};
};

_mboxDefaultContentOffer.prototype.setOnLoad = function(_onLoad) {
  this._onLoad = _onLoad;
};

_mboxDefaultContentOffer.prototype.show = function(_mbox) {
  var _defaultDiv = _mbox.getDefaultDiv();
  if (_defaultDiv == null) {
    return 0;
  }
  _defaultDiv.onclick = function() {
    // just use _mbox.getName() when everyone is on mboxVersion >= 21
    var _mboxName = _mbox.id ? _mbox.id : _mbox.getName();
    var _clickDiv = document.getElementById('mboxClick-' + _mboxName);
    if (_clickDiv != null) {
      _clickDiv.onclick();
    }
  };
  var _result = _mbox.hide();
  if (_result == 1) {
    this._onLoad();
  }
  return _result;
};

mboxCurrent.setOffer(new _mboxDefaultContentOffer());
if (mboxCurrent.getFetcher && mboxCurrent.getFetcher().getType() == 'ajax') {
  mboxCurrent.show();
};document.write('<!-- Offer Id: 65995  --><script type=\"text\/javascript\">\r\n\/*T&T to SiteCat v4 ==>Response Plugin*\/\r\nwindow.s_tnt = window.s_tnt || \'\', tntVal = \'66214:0:0,\';\r\nif (window.s_tnt.indexOf(tntVal) == -1) {\r\n    window.s_tnt += tntVal\r\n}\r\nif (mboxCurrent.getFetcher().getType() == \'ajax\'  && (window.s && window.s.tl)) {\r\n    s.tl(\'TnT\', \'o\', \'TnT\');\r\n}\r\n<\/script>');document.write('</div>');mboxCurrent.setEventTime('include.end');mboxFactories.get('default').get('nm_template_product',0).loaded();mboxFactories.get('default').getPCId().forceId("1417579631269-800214.25_06");