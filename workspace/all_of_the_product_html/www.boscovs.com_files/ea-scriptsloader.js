function eaScriptLoad(staticHttpContentPrefix, storeContentPrefix)
{
	if (navigator.userAgent.indexOf("Firefox/1.0.7") === -1)
	{
		Modernizr.load([staticHttpContentPrefix+'/js/ea-env.js',storeContentPrefix+'/js/jquery-ui-1.9.2.min.js',
		                storeContentPrefix+'/js/ea-autocomplete-1.2.1.js',storeContentPrefix+'/js/ea-search-1.2.0.js',
		                storeContentPrefix+'/js/ea-boscovs-search.js']);
	}

}	