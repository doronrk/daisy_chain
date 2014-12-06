_satellite.pushAsyncScript(function(event, target, $variables){
  dtm_promoDetail=function(url)
{
	if(!url){return ''};
	return url.match(/category=(.*)/)?url.match(/category=(.*)/)[1]:url.match(/\.com\/(.*)/)[1];
}

jQuery('[id=GlobalNavContainer] a').bind('click', function() {
	var $this = jQuery(this);
	var contNum = $this.parent().attr('id');
	var detail = dtm_promoDetail($this.attr("href"))
	_satellite.setCookie('s_promoClick',(s.pageName.replace(':','-')+':global:'+contNum+':'+detail).toLowerCase());
});
});
