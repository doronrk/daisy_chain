_satellite.pushAsyncScript(function(event, target, $variables){
  function registerSuccess(){
  try {
    var process = require('process');
    process.on('register.success', function(item){
      _satellite.setCookie('register_success','true');
      _satellite.notify('register success emitter',1);
    });
    process.on('checkout.error', function(error){
      _satellite.setVar('error_message', _satellite.cleanText(error));
      _satellite.track('error');
    });
    process.on('shoprunner.login', function(){
			_satellite.track('shoprunner login');
    });
  }
  catch(e){}
}

if(typeof requre == 'undefined'){
  _satellite.domReady(function(){
    registerSuccess();
  });
}
else {
  registerSuccess();
}
});
