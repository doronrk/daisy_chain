/**
 * @author Lorenzo Cavina (l.cavina@tecla.it)
 * @class 
 */
ConfigurationUtils = {
	langId: "-1", /* language of the  store */
	storeId: "", /*numeric unique identifier of the store */
	catalogId: "", /*catalog of the store that is currently in use */
	logger: new Logger('ConfigurationUtils', Level.TRACE), /* logging utility */
	cache: [],
	
	/**
	 * Sets common parameters used by the services
	 * @param (int) langId The language of the store.
	 * @param (int) storeId The store currently in use.
	 * @param (int) catalogId The catalog of the store currently in use.
	 */
	setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
	},
	
	/**
	 * Load a configuration object from the server. Use prefix and suffix to
	 * filter results.
	 */
	getConfiguration: function(prefix){
		
		var result = this.cache[prefix];
		
		if(result == null || result == undefined){
		
			var xhr = $jq.ajax( {
				type: "POST",
				url: "ConfigurationAsJSON",
				data: {catalogId: this.catalogId, storeId: this.storeId, langId: this.langId, prefix: prefix, suffix: ""},
				dataType: "json",
				async: false,
				error: ConfigurationUtils.handleError
			} );
			
			var response = xhr.responseText;
			
			var jsonObj = JSON.parse(response).configuration;
			
			result = this.factory(jsonObj);
			
			this.cache[prefix] = result;
			
		}
		
		return result;
	},
	
	/**
	 * Handle errors silently.
	 */
	handleError: function(jqXHR, textStatus, errorThrown){
		// nothing to do
	},
	
	factory: function(data){
		return new Configuration(data);
	}
}

function Configuration(data){
	 this.data = data;
	 
	 this.get = function(key){
		 return data[key];
	 };
	 
	 this.getBoolean = function(key){
		 var value = data[key];
		 
		 if(value == null || value == undefined)
			 return false;
		 
		 if(value == 'true' || value == 'TRUE')
			 return true;
		 
		 return false;
	 }
}