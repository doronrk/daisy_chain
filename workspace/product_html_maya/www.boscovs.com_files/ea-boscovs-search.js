$(function() 
{
	$('#searchText').addClass('ea-input-area');
	
    var easd = new EASearch();
    var options = 
    {
        dct: 'Boscovs'
    };
    
    easd.init(options);
	
	var acOptions = {
        dict: 'Boscovs',
		id: 'searchText',
        prompt: 'search by brand/internet#',
        submitFctn: function(type,val){
        	    $('#searchButton').click();
        }
    };
	
    new EAAutoComplete().init(acOptions);
    
});