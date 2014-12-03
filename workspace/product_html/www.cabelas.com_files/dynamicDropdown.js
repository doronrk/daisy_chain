(function($) {

	lib.obj.dynamicDropdown = function(opts) {
		$.extend({
			dropdownSelector : ".rWare__dropdownCollection",
			inputSelector : "#rWare__dropdownCollectionInput",
			callback : null,
			customDefaultLabels : null,
			customDefaultValues : null,
			isOrdered : false
		}, opts);
		
		this.opts = opts;
		this.values = [];
		this.labels = [];
		this.ids = [];
		this.defaultValues = [];
		this.defaultLabels = [];
		this.length = $(this.opts.dropdownSelector).length;
		
		/* Internals */
		this.isActive = [];
		this.order = [];
		this.selected = [];
		this.uniqueValues = [];
		this.uniqueValuesIndex = [];
		this.emptyEntry = { id : null, values : null, labels : null };
		this.lastSelectedIndex = -1;
		
		var internalUpdate = function(dropdownWidget) {
			/* Reset the data before doing work */
			for(var i = 0; i < dropdownWidget.values[0].length; i++)
			{
				dropdownWidget.uniqueValues[i] = [];
				dropdownWidget.uniqueValuesIndex[i] = [];
				dropdownWidget.uniqueValuesIndex[i].push(0);
			}
			/* Do the real work */
			for(var i = 1; i < dropdownWidget.ids.length; i++)
			{
				var stillActive = true;
				for(var j = 0; j < dropdownWidget.values[0].length; j++)
				{
					if( (dropdownWidget.selected[j] != null) && (dropdownWidget.values[i][j] != dropdownWidget.selected[j]) )
					{ 
						stillActive = false;
						j = dropdownWidget.values[0].length;
					}
				}
				dropdownWidget.isActive[i] = stillActive;
				
				/* If active, see if its unique and add it as a value */
				if( dropdownWidget.isActive[i] )
		 		{
		 			for( var j = 0; j < dropdownWidget.values[0].length; j++ )
			 		{
			 			var isUnique = true;
			 			for( var x = 0; x < dropdownWidget.uniqueValues[j].length; x++)
			 			{
			 				if( dropdownWidget.uniqueValues[j][x] == dropdownWidget.values[i][j] )
			 				{
			 					isUnique = false;
			 					x = dropdownWidget.uniqueValues[j].length;
			 				}
			 			}
			 			if(isUnique)
			 			{ 
			 				dropdownWidget.uniqueValues[j][dropdownWidget.uniqueValues[j].length] = dropdownWidget.values[i][j];
			 				dropdownWidget.uniqueValuesIndex[j][dropdownWidget.uniqueValuesIndex[j].length] = i;
			 			}
			 		}
		 		}
		 	}
		};
		
		this.updateState = function() {
			/* Update the data */
			internalUpdate(this);
			
			/* Do any dropdown updates */
			var dropdownWidget = this;
			$(this.opts.dropdownSelector).each(function(i) {
				if( dropdownWidget.selected[i] == null )
				{
					/* Remove old options */
					$("option", this).remove();
					/* Update display with new options */
					var optionHTML = "";
					for( var j = 0; j < dropdownWidget.uniqueValuesIndex[i].length; j++)
					{ optionHTML += '<option value="' + dropdownWidget.values[dropdownWidget.uniqueValuesIndex[i][j]][i] + '">' + dropdownWidget.labels[dropdownWidget.uniqueValuesIndex[i][j]][i] + '</option>'; }
					$(this).append(optionHTML);
					
					if (i==dropdownWidget.lastSelectedIndex+1 && dropdownWidget.uniqueValues[i].length==1){
						
						dropdownWidget.selected[i]=dropdownWidget.values[dropdownWidget.uniqueValuesIndex[i][1]][i];
						
						dropdownWidget.lastSelectedIndex++;
					}
					
					
				}
				
				/* Set the value if not null */
				if(dropdownWidget.selected[i] != null )
				{ $(this).val( dropdownWidget.selected[i] );
					
				}
			});
			
			/* If this is ordered, makes sure the correct options are available */
			if( this.opts.isOrdered )
			{ $(this.opts.dropdownSelector).removeAttr("disabled").filter(":gt(" + (this.lastSelectedIndex+1) + ")").attr("disabled", "disabled"); }
			
			/* See if all dropdowns have been selected */
			var variantSelected = true;
			for( var j = 0; j < this.selected.length; j++)
			{
				if( this.selected[j] == null )
				{ variantSelected = false; j = this.selected.length; }
			}
			
			/* find what entry is active, if all variants are selected */
			if(variantSelected)
			{
				for( var j = 1; j < this.ids.length; j++)
				{
					if( this.isActive[j] )
					{
						$(this.opts.inputSelector).val( this.ids[j] ).trigger("blur");
						if( $.isFunction(this.opts.callback) )
						{ this.opts.callback(this.ids[j]); }
						j = this.ids.length;
					}
				}
			}
			else
			{ $(this.opts.inputSelector).val("").trigger("blur"); }
		};

		this.setSelectedItem = function(entryArray) {
			/* Do any dropdown updates */
			$(this.opts.dropdownSelector).each(function(i) {				
				if (entryArray.length > i){
					$(this).val( entryArray[i] );
				}
				/* enable any dropdown */
				$(this).removeAttr("disabled");
			});

		};
		
		this.addEntries = function(entryArray) {
			var dropdownWidget = this;
			$.each(entryArray, function(i, entry) {
				/* Extend with empty arrays */
				entry = $.extend({}, dropdownWidget.emptyEntry, entry);
				
				/* Error Check */
				if( (entry.id == null) || (entry.values == null) || (entry.labels == null) || (entry.values.length != entry.labels.length) )
				{ alert(i + "," + entry.id + "," + entry.values + "," + entry.labels + ",There is a problem with this entry, you may be missing values, labels, and id, or the values / labels aren't the same size."); return false; }
				else
				{
					dropdownWidget.values.push(entry.values);
					dropdownWidget.labels.push(entry.labels);
					dropdownWidget.ids.push(entry.id);
					dropdownWidget.isActive.push(true);
				}
			});
		};
		this.start = function() {
			if( this.values.length > 0)
			{
				/* Initialized the Data Arrays */
				for( var i = 0; i < this.values[0].length; i++)
				{
					this.order.push(null);
					this.selected.push(null);
					this.uniqueValues.push([]);
					this.uniqueValuesIndex.push([]);
				}	
				/* Update Dropdown State */
				this.updateState();
				
				/* bind change event */
				var dropdownWidget = this;
				var thisDropdowns = $(this.opts.dropdownSelector);
				thisDropdowns.unbind("change.rWare.widgetCollection.dropdownCollection").each(function(i) {
					$(this).bind("change.rWare.widgetCollection.dropdownCollection", function() {
						/* Update the order of the dropdowns being selected */
						var setOrder = false;
						for( var j = 0; j < dropdownWidget.order.length; j++)
						{
							
							if(setOrder && (dropdownWidget.order[j] != null))
							{
								dropdownWidget.selected[dropdownWidget.order[j]] = null; 
								dropdownWidget.order[j] = null;
							}
							if( !setOrder && ((dropdownWidget.order[j] == null) || (dropdownWidget.order[j] == i)) )
							{
								dropdownWidget.order[j] = ($(this).val() != dropdownWidget.defaultValues[j]) ? i : null;
								setOrder = true;
							}
						}
						/* Set the data object for this dropdown to the value */
						dropdownWidget.lastSelectedIndex = ( $(this).val() != dropdownWidget.defaultValues[i] ) ? i : i-1;
						dropdownWidget.selected[i] = ( $(this).val() != dropdownWidget.defaultValues[i] ) ? $(this).val() : null;
						
						/* reset the selected value of remaining dropdowns*/
						for (var j=i+1; j<dropdownWidget.values[0].length; j++){
							dropdownWidget.selected[j]=null;
						}
						/* Update the dropdown state */
						dropdownWidget.updateState();
					});
				});
			}
			else
			{ alert("No entries in dropdown group"); }
		};
		this.setState = function(options) {
			var opts = $.extend({}, { id : null, values : null }, options);
			var thisWidget = this;
			if( opts.id != null )
			{ 
				$.each(this.ids, function(i, value) {
					if( value == opts.id )
					{ opts.values = thisWidget.values[i]; return false; }
				});
			}
			if( opts.values != null )
			{ 
				var end = opts.values.length;
				$(this.opts.dropdownSelector).each(function(i) { 
					if( i < end) { $(this).val(opts.values[i]).change(); }
				}); 
			}
		};
		
		
		/* Add The Defaults Labels */
		for( var i = 0; i < this.length; i++ )
		{
			this.defaultValues.push( (this.opts.customDefaultValues != null) ? this.opts.customDefaultValues[i]  : "" );
			this.defaultLabels.push( (this.opts.customDefaultLabels != null) ? this.opts.customDefaultLabels[i] : "Select");
		}
		this.values.push(this.defaultValues);
		this.labels.push(this.defaultLabels);
		this.ids.push(null);
		this.isActive.push(true);
		
		/* Disable Dropdowns if ordered */
		if( this.opts.isOrdered )
		{ $(this.opts.dropdownSelector).attr("disabled", "disabled"); }
	};
	
})(jQuery);