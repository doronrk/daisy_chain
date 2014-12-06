_satellite.pushAsyncScript(function(event, target, $variables){
  jQuery('.navigation a').bind('click', function() {
  var $this = jQuery(this);
  var catVal=$this.parents('.*.dropdown').children('a').text().toLowerCase();
  var itemVal=$this.text().toLowerCase();
  var finalVal='';
  if(catVal==itemVal){
  	finalVal=itemVal;
  }else{
  	finalVal=catVal+'>'+itemVal;
  }
  _satellite.setCookie('s_navClick',finalVal);
});
});
