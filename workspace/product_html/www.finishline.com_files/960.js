jQuery(document).ready(function() {
	if ($('#searchBarSearchBox').length){
		
	    var cx = jQuery('#sayt-cx-value').val();//'013357202174079907832:zj7mgesoreh';
	    var key = jQuery('#sayt-api-key').val();//'AIzaSyCNcvOq3RqiSLFEKk1r1JeplRhx0BbvjYQ';
	    
	    var sayt_params = {
	        country: 'us',
	        language: 'en',
	        sayt_description_config: null,
	        extra_params: {
	            safe: false,
	            crowdBy:'item_group_id(text):1'
	        }
	    };
	
	    var setSaytCallback = function(sayt) {
	        if (sayt == null) {
	          // SAYT is disabled, initialize your current autocompletions code.
	        } else {
	            window['__gcs_sayt'] = sayt;
	            completionObject = sayt['completionController'];
	        }
	    };
	
	  // Autocomplete options
	    var autoCompletionOptions = {
	        'maxCompletions': 5,
	        'styleOptions': {
	            xAlign: 'right',
	            xOffset: -47,
	            yOffset: 8,
	            fixedWidth: 400
	        }
	    };
	
	    // Replace the searchText parameter below with your actual search box id
	    // Replace the searchForm parameter below with your actual form id where
	    // your search box belongs to
	    if (typeof(setupSayt) === 'function') {
	           setupSayt(cx, key, 'searchBarSearchBox', 'searchBarForm', setSaytCallback, autoCompletionOptions, sayt_params);
	    }
    }

});
