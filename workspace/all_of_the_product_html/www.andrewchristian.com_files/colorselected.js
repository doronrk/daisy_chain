// Swatch Selector Javascript - Copyright 2011 CJM Creative Designs

document.observe("dom:loaded", function() {
	
	var firstAttribute = $$('.super-attribute-select').first().id;		

	// If the first option has swatches, disable unavailable swatches
	if ($('ul-' + firstAttribute)) {
		var theoptions = [];
			
		// Get all available option values
		$(firstAttribute).select('option').each(function(item) {
			if (item.value) { theoptions.push(item.value); }
		});
		
		// Disable swatches that are not available
		$$('#ul-' + firstAttribute + ' .swatch').each(function(item) {
			theoptions.contains(item.id.substr(6)) ? $(item.id).removeClassName('disabledSwatch') : $(item.id).addClassName('disabledSwatch');
			if (theoptions.contains(item.id.substr(6)))
			{
			}
			else
			{
				document.getElementById(item.id).title = 'Product out of stock.';
			}
			
		});
	}

	// Make the selects act as swatches
	$$('select').each(function(item) {
		if(item.hasClassName('super-attribute-select')){ setClickHandler(item); }
	});
	
	// Disable all swatches below the first selectable swatch
	$$('ul[id^="ul-attribute"]').each(function(item) {
		var attributeId = item.id.split('-')[1];
		if($(attributeId).disabled){
			$(item.id).select('img', 'div').invoke('addClassName', 'disabledSwatch'); }
	});

});


// Dropdown observer function
		
function setClickHandler(element) {
	element.onchange = function () {
		
		var id = this.options[this.selectedIndex].value,
			runMeArgs = [this.id, '', 'optionzero'],
			selectorid = this.id,
			selectors = $$('.super-attribute-select'),
			optionArr = [],
			l = 0,
			isSwatch = 0,
			theIndex = 0,
			nextSelect;
		
		// Decide if this attribute has swatches
		if($('ul-' + selectorid)){ isSwatch = 1; }
		
		// Set what the next attribute is and the index of the selected attribute
		$$('.super-attribute-select').each(function(item, index) {
			if(selectorid == item.id){
				theIndex = index; 
				if(selectors[index+1]){ nextSelect = selectors[index+1].id; }
			}
		});
		
		// If Please Select is selected
		if (!id) {
			
			// If this is a swatch attribute
			if (isSwatch == 1) {
			
				// Apply the onclick function
				colorSelected.apply(this, runMeArgs);
			
			} else {
			
				// Disable all swatch attributes after the current attribute
				$$('.super-attribute-select').each(function(item, index) {
					if (index > theIndex){
						$$('#ul-' + item.id + ' .swatch').invoke('removeClassName', 'swatchSelected').invoke('addClassName', 'disabledSwatch'); }
				});
			}
		
		} else {
			
			// If this drop-down is for a swatch attribute, give it the same onclick
			if ($('swatch' + id) && $('swatch' + id) !== null) {
			
				clickHandler = $('swatch' + id).onclick;
				clickHandler.apply(this);
		
			// If the next attribute is a swatch attribute, reset the swatches
			} else {
			
				// Disable all swatch attributes after the current attribute
				$$('.super-attribute-select').each(function(item, index) {
					if (index > theIndex){
						$$('#ul-' + item.id + ' .swatch').invoke('removeClassName', 'swatchSelected').invoke('addClassName', 'disabledSwatch'); }
				});
				
				// If the next attribute has swatches
				if($('ul-' + nextSelect)) {
			
					//Enable selected swatches
					$$('#ul-' + nextSelect + ' .swatch').invoke('removeClassName', 'disabledSwatch');
				
					// Get all available option values
					$(nextSelect).select('option').each(function(item) {
						if (item.value) {
							optionArr.push(item.value); }
					});
				
					// Disable swatches that are not available
					$$('#ul-' + nextSelect + ' .swatch').each(function(item) {
						if (optionArr[l]) {
							if ('swatch' + optionArr[l] === item.id) {
								$(item.id).removeClassName('disabledSwatch');
								l += 1;
							} else {
								$(item.id).addClassName('disabledSwatch'); }
						} else {
							$(item.id).addClassName('disabledSwatch'); }
					});
				}
			}
		}
	};
}

function signupforstocknotification(productid,customer)
{
	if (customer == 0)
	{
			alert('Please login/sign up for stock notification');
	}
	else
	{
			var stat = confirm("This product is currently out of stock. Do you wish to sign up for stock alert ?");
			if (stat == true)
			{
				//window.location.href = 'http://andrewchristian.btpdev.us/index.php/lookbook/index/stock/product_id/'+productid;
				window.location.href = 'http://'+ window.location.host + '/lookbook/index/stock/product_id/'+productid;				
    		}
	}
}


// Main Swatch Function

function colorSelected(id, value, front_label) {
	//"use strict";
	
	var theswitchis = 'off',
		switchCounter = 0,
		l = 0,
		nextAttribute = '',
		nextAttrib = [],
		theoptions = [],
		dropdownEl = $(id),
		i, dropdown, textdiv, theattributeid, thedropdown, thetextdiv, dropdownval, theSwatch, isAswatch;
	
	// If the dropdown is disabled, do nothing because we are not allowed to select an option yet
	if (dropdownEl.disabled) { return; }
		
	if(value){
		if ($('swatch' + value).hasClassName('disabledSwatch') || $('swatch' + value).hasClassName('swatchSelected')) { return; } }
	
	// ------------------------------------------------------------------------------------------
	// --- RESET ALL SWATCH BORDERS, DROPDOWNS AND TEXT BELOW THE SELECTED SWATCH ---
	// ------------------------------------------------------------------------------------------
	
	// Go through every attribute on product
	$$('.super-attribute-select').each(function(item, index) {
		thedropdown = 'attribute' + item.id.replace(/[a-z]*/, '');
		isAswatch = 0;
		theattributeid = item.id.replace(/[a-z]*/, '');
		thetextdiv = 'divattribute' + theattributeid;
		ulId = 'ul-' + thedropdown;
		
		// If this attribute is a swatch attribute, set to yes
		if($('ul-' + thedropdown)){ isAswatch = 1; }
	
		// If we are on the selected swatch dropdown, turn the switch on
		if (id === thedropdown) {
			theswitchis = 'on'; } 
				
		// If we are either on the dropdown we selected the swatch from or a dropdown below
		if (theswitchis === 'on') {
			// If we are on the dropdown after the selected swatch dropdown, get the next attribute id
			if (switchCounter === 1) {
				if(isAswatch == 1){ nextAttribute = theattributeid; } else { nextAttribute = '' ; } 
			} 
			if (isAswatch == 1){
				dropdown = $(thedropdown);
				textdiv =  $(thetextdiv);	
				if (textdiv !== null) { textdiv.update(selecttitle); }
				
				dropdown.selectedIndex = 0;
			
				// Go through all the swatches of this attribute and reset
				$$('#' + ulId + ' ' + ' .swatch').invoke('removeClassName', 'swatchSelected');
			
				// Disable all swatches below the first selectable swatch
				if (switchCounter >= 1) {
					$$('#' + ulId + ' ' + ' .swatch').invoke('addClassName', 'disabledSwatch'); }
			}
			
			switchCounter += 1;
		}
	});
	
	// If there is only one attribute on this product, set the next attribute to none
	if (nextAttribute === null || nextAttribute === '') { nextAttribute = 'none'; }
			
	// ------------------------------------------------------------------------
	// ------------------- SELECT THE CORRECT SWATCH --------------------------
	// ------------------------------------------------------------------------
			
	if (value) {
		
		// Set the swatch and dropdown to selected option
		$('swatch' + value).addClassName('swatchSelected');
		dropdownEl.value = value;
		
		// Set the title of the option
		if ($('div' + id) !== null) {
			if (front_label !== 'null') {
				$('div' + id).update(front_label);
			} else {
				$('div' + id).update(dropdownEl.options[dropdownEl.selectedIndex].text); }
		}
		
		spConfig.configureElement(dropdownEl);
	}
	
	// -------------------------------------------------------------------------
	// -------------------- HIDE UNAVAILABLE SWATCHES --------------------------
	// -------------------------------------------------------------------------
	
	// If there is more then one swatch attribute on this product
	if (nextAttribute !== 'none' && value) {
		
		// Set the next attributes dropdown
		nextAttrib = $('attribute' + nextAttribute);
		
		// Get all available option values
		$(nextAttrib).select('option').each(function(item) {
			if (item.value) { theoptions.push(item.value); }
		});

		// Disable swatches that are not available
		$$('#ul-attribute' + nextAttribute + ' .swatch').each(function(item) {
			theoptions.contains(item.id.substr(6)) ? $(item.id).removeClassName('disabledSwatch') : $(item.id).addClassName('disabledSwatch');
		});
	}
	
	// Not sure if this is still needed
	//this.reloadPrice();
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) { return true; }
    }
    return false;
}
