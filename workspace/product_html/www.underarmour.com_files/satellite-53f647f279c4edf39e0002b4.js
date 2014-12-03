_satellite.pushAsyncScript(function(event, target, $variables){
  _satellite.google.addPixel({
  google_conversion_id: '922915392',
  google_conversion_label: '',
  google_custom_params: {
    ecomm_prodid: _satellite.getVar('product view - style number'),
    ecomm_pagetype: 'product',
    ecomm_productvalue: _satellite.getVar('product view - price')
  },
  google_remarketing_only: true
});
});
