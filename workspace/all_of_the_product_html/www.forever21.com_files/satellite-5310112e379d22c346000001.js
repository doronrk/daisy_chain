_satellite.pushAsyncScript(function(event, target, $variables){
  //landing page promos
jQuery('[id^=ctl00_MainContent_trTopCtrlNImagePlace] a img').bind('click', function() {
	var $this = jQuery(this);
	var imgNum = ($this.attr('alt')||'n/a').replace(/\D/g,'');
	var detail = dtm_promoDetail($this.parent().attr("href")||$this.attr("href"))
	_satellite.setCookie('s_promoClick',(s.pageName.replace(':','-')+':main:'+imgNum+':'+detail).toLowerCase());
});

jQuery('[id^=ctl00_MainContent_] area').bind('click', function() {
	var $this = jQuery(this);
	var imgNum = jQuery("img[usemap='#"+$this.parents('map').attr('name')+"']").attr('alt').replace(/\D/g,'');
	var detail = dtm_promoDetail($this.attr("href"))
	_satellite.setCookie('s_promoClick',(s.pageName.replace(':','-')+':main:'+imgNum+':'+detail).toLowerCase());
});
});
