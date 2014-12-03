var mboxCurrent=mboxFactories.get('default').get('dsw_global',0);mboxCurrent.setEventTime('include.start');document.write('<div style="visibility: hidden; display: none" id="mboxImported-default-dsw_global-0">');/* Offer id: 12042*/ 

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
};document.write('<!-- Offer Id: 82151  --><script type=\"text\/javascript\">\r\n\/*mboxHighlight+ (1of2) v1 ==> Response Plugin*\/\r\nwindow.ttMETA=(typeof(window.ttMETA)!=\'undefined\')?window.ttMETA:[];window.ttMETA.push({\'mbox\':\'dsw_global\',\'campaign\':\'Monitoring Campaign - Purchased clicked recs (All)\',\'experience\':\'Experience  A\',\'offer\':\'Default Content\'});window.ttMBX=function(x){var mbxList=[];for(i=0;i<ttMETA.length;i++){if(ttMETA[i].mbox==x.getName()){mbxList.push(ttMETA[i])}}return mbxList[x.getId()]}\r\n<\/script>');document.write('</div>');mboxCurrent.setEventTime('include.end');mboxFactories.get('default').get('dsw_global',0).loaded();mboxFactories.get('default').getPCId().forceId("1417579819671-672253.25_57");