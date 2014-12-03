var mboxCurrent=mboxFactories.get('default').get('LANG_REDIRECT',0);mboxCurrent.setEventTime('include.start');document.write('<div style="visibility: hidden; display: none" id="mboxImported-default-LANG_REDIRECT-0">');/* Offer id: 64378*/ 

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
};document.write('<!-- Offer Id: 66833  --><script type=\"text\/javascript\">window.ttMETA=(typeof(window.ttMETA)!=\'undefined\')?window.ttMETA:[];window.ttMETA.push({\'mbox\':\'LANG_REDIRECT\',\'campaign\':\'Prod - LANG Redirect (HK + CA_FR)\',\'experience\':\'No_Redirection\',\'offer\':\'Default Content\'});window.ttMBX=function(x){var mbxList=[];for(i=0;i<ttMETA.length;i++){if(ttMETA[i].mbox==x.getName()){mbxList.push(ttMETA[i])}}return mbxList[x.getId()]}<\/script>');document.write('<!-- Offer Id: 65661  --><script type=\"text\/javascript\">\r\n\/*T&T to SiteCat v4 ==>Response Plugin*\/\r\nwindow.s_tnt = window.s_tnt || \'\', tntVal = \'65374:0:0,\';\r\nif (window.s_tnt.indexOf(tntVal) == -1) {\r\n    window.s_tnt += tntVal\r\n}\r\nif (mboxCurrent.getFetcher().getType() == \'ajax\'  && (window.s && window.s.tl)) {\r\n    s.tl(\'TnT\', \'o\', \'TnT\');\r\n}\r\n<\/script>');document.write('</div>');mboxCurrent.setEventTime('include.end');mboxFactories.get('default').get('LANG_REDIRECT',0).loaded();mboxFactories.get('default').getPCId().forceId("1417586236345-766655.25_18");