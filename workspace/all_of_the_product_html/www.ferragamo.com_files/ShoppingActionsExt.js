/**
 * This class contains a set of tool extending the capabilities of the base
 * ShoppingAction class.
 */
shoppingActionsExt={
		
	logger: new Logger('shoppingActionsExt', Level.TRACE), /* logging utility */
	
	add2CartEnabled: false,
	
	cache: new Object(),

	clone:function(map){
	    var newMap = {};
	    for (var i in map)
	         newMap[i] = map[i];
	    return newMap;
	},

	size:function(obj) {
		
		if(obj == null || obj == undefined)
			return 0;
		
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	},

	getKey:function(obj){
		if(obj == null || obj == undefined)
			return "";
		
		if(this.size(obj) == 0)
			return "";
		
		if(this.size(obj) == 1){
			for(var i in obj){
			  if (obj.hasOwnProperty(i)) {
				 return i;
			  }
			}
		} else {
			var result = [];
			for(var i in obj){
			  if (obj.hasOwnProperty(i)) {
				 result.push(i);
			  }
			}
			return result;
		}  
	},

	extractTargetAttributesList:function(items, lookfor){
		
		this.logger.enter("extractTargetAttributesList");
		
		var result = [];
		for(pos in items){
	       
		    var attributes = items[pos].Attributes;
		    
		    if(attributes[lookfor] != null){
		    	var attributesClone = this.clone(attributes);
		        delete attributesClone[lookfor];
		        result.push(attributesClone);
		    }
		}
		
		this.logger.exit("extractTargetAttributesList");
		
		return result;
	},
	
	addIfNotPresent:function(value, list){
		
		if(list == null || list == undefined)
			return;
		
		for(i in list){
			if(list[i] == value)
				return;
		}
		
		list.push(value);
	},

	filter:function(attributeName, value){
		
		this.logger.enter("filter");
	
	    var lookingfor = attributeName + "_" + value;
	    
	    this.logger.log("looking for: " + lookingfor);
	
	    // extract attribute objects from entitled items list
	    var attributes = this.extractTargetAttributesList(shoppingActionsJS.entitledItems, lookingfor);
	    
	    this.logger.log("Found attribute objects: " + lookingfor);
	    
	    var targetAttributes = [];
	    var targetAttributeNum = -1;
	    
	    // key extraction from attribute objects
	    for(pos in attributes){
	    	var curr = attributes[pos];
	        var key = this.getKey(curr);
	        targetAttributes.push(key);
	        targetAttributeNum = curr[key];
	    }
	    
	    this.logger.log("Target attribute number: " + targetAttributeNum);
	    this.logger.log("Target attribute list: " + targetAttributes);
	    
	    // init internal cache
	    this.initCache(targetAttributeNum);
	    	
	    
	    // compose an object containing the needed data to fill the
	    // target attribute select
	    var result = new Object();
	    result["position"] = targetAttributeNum;
	    result["list"] = targetAttributes;
	    
	    this.logger.exit("filter");
	    
	    return result;
	},

	fill:function(attributeObj){
		
		if(attributeObj == null || attributeObj.list == null || attributeObj.list == undefined)
			return;
		
		var targetId = "attrValue_" + attributeObj.position;
		
		if($jq('#' + targetId) == null || $jq('#' + targetId) == undefined)
			return;
		
		// prepare the attributes list
		var optionList = [];
		for(pos in attributeObj.list){
			var curr = attributeObj.list[pos];
			curr = curr.substring(curr.indexOf("_")+1,curr.length);
			this.addIfNotPresent(curr, optionList);
		}
		
		// save the empty option
		var emptyOption = $jq("#" + targetId + " option[value='']");
		
		// save the selected value
		var selectedValue = $jq("#" + targetId + " :selected").val();
		
		// empty the target select
		$jq('#' + targetId).empty();
		
		// fill the target select with the new values and display value
		// from the backup
		$jq('#' + targetId).append(emptyOption);
		
		if(this.cache[targetId] != null || this.cache[targetId] != undefined){
			for(i in optionList){
				$jq('#' + targetId)
					.append($jq("<option></option>")
							.attr("value",optionList[i])
							.text(this.cache[targetId][optionList[i]])); 
			}
		}
		
		// set the selected value back to the value it was before
		$jq('#' + targetId).val(selectedValue);
	},
	
	/**
	 * enable / disable add to cart button
	 */
	toggleAdd2Cart:function(enable){
		this.add2CartEnabled = enable;
	},
	
	isAdd2CartEnabled:function(){
		return this.add2CartEnabled;
	},
	
	isProductAvailable:function(entitledItemId){
		if (dojo.byId(entitledItemId) != null && dojo.byId(entitledItemId) != undefined) {
			//the json object for entitled items are already in the HTML. 
			var ih = dojo.byId(entitledItemId).innerText;
			if(ih == null || ih == undefined)
				ih = dojo.byId(entitledItemId).innerHTML;
			entitledItemJSON = eval('('+ ih.toString() +')');
			
			if(entitledItemJSON == null || entitledItemJSON == undefined || entitledItemJSON.length == 0)
				return false;
			else
				return true;
		}
		
		return false;
	},
	
	initCache:function(){
		if(this.cache == null)
			this.cache = new Object();
			
		var c = this.cache;
		var targetId = "attrValue_" + 1;
		
		if(c[targetId] == null){
			
			c[targetId] = new Object();
		
			$jq("#" + targetId + " > option").each(function(i) {
				if($jq(this).val() != '' && $jq(this).val() != null)
					c[targetId][$jq(this).val()] = $jq(this).text();
			});			
		}
		
		targetId = "attrValue_" + 2;
		
		if(c[targetId] == null){
			
			c[targetId] = new Object();
		
			$jq("#" + targetId + " > option").each(function(i) {
				if($jq(this).val() != '' && $jq(this).val() != null)
					c[targetId][$jq(this).val()] = $jq(this).text();
			});			
		}
	}
}