_satellite.pushAsyncScript(function(event, target, $variables){
  // default color chip tracked to prevent tracking additional clicks
jQuery(function(){
  jQuery('ul.color-chip_list li.color-chip.selected').attr('data-tracked','true');

  // add to cart
  jQuery('body').on('cart.updated', function(data, cart){
    // create the UA.DIGITALDATA.mobileCart object
    UA.DIGITALDATA.mobileCart = cart;
    _satellite.track('add to cart');
  });
});
});
