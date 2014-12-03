_satellite.pushAsyncScript(function(event, target, $variables){
  function listeners(){
  try {
    var process = require('process');

    // newsletter signup
    process.on('newsletter.signup', function(source){
      _satellite.setVar('optinSource', source);
      _satellite.track('newsletter opt-in');
    });

    // email cart
    process.on('cart.emailed', function(){
      _satellite.track('cart emailed');
    });
  }
  catch(e){}
}

if(typeof require == 'undefined'){
  _satellite.domReady(function(){
    listeners();
  });
}
else {
  listeners();
}
});
