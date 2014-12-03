/**
  This file contains the JS code for implementing relational drop-downs.
  It supports 4 relational drop downs.
  The methods defined in this library are the methods called for refreshing a dropdown once its parent is selected.
  For example updateDropDown3 is called in order to refresh the third dropdown once the second drop down is selected.
  
**/


/**
 * dd1Index - the selected index of the first dropdown
 * dropdown1 - the first drop down (a form field)
 * dropdown2 - the second drop down (a form field)
 * dropdown3 - the third drop down (a form field)
 * dropdown4 - the fourth drop down (a form field)
 * 
 * dd1InitialText - the text which should be displayed initially for the first dropdown when it is empty (which never happens)
 * dd2InitialText - the text which should be displayed initially for the second dropdown when it is empty 
 * dd3InitialText - the text which should be displayed initially for the third dropdown when it is empty 
 * dd4InitialText - the text which should be displayed initially for the fourth dropdown when it is empty 
 * 
 * jsDropdown1Dropdown2OptionValueArray - a 2 dimensional array in which the fields from the first dropdown are mapped to the second
 * jsDropdown1Dropdown2OptionTextArray - a 2 dimensional array in which the fields from the first dropdown are mapped to the second
 *    dropdown.
 * dd1DisplayInitialText - true/false. If false the initial text for the first dropdown is not displayed
 * dd2DisplayInitialText - true/false. If false the initial text for the second dropdown is not displayed
 */

function updateDropDown2(dd1Index, dropdown1, dropdown2, dropdown3, dropdown4, dd1InitialText, dd2InitialText, dd3InitialText, dd4InitialText, jsDropdown1Dropdown2OptionValueArray, jsDropdown1Dropdown2OptionTextArray, dd1DisplayInitialText, dd2DisplayInitialText)
{
	var arrayIndex = 0;
	var dropDownIndex = 0;
	dropDownIndex = dd1Index;
	arrayIndex = dd1Index - 1 ;
	if(dd1DisplayInitialText == false)
	{
		arrayIndex = dd1Index;
	}
	
	// clear drop downs 2,3 and 4
	// check if they exist before you clean them
	if(dropdown2 != null)
	{
		dropdown2.length = 1;
		if(dd2DisplayInitialText)
			dropdown2.options[0].text = dd2InitialText;
		else
			dropdown2.options[0].text = "";
		dropdown2.options[0].value = "";
	}
	if(dropdown3 != null)
	{
		dropdown3.length = 1;
		dropdown3.options[0].text = dd3InitialText;
		dropdown3.options[0].value = "";
	}
	if(dropdown4 != null)
	{
		dropdown4.length = 1;	
		dropdown4.options[0].text = dd4InitialText;
		dropdown4.options[0].value = "";
	}

	if(dropDownIndex == 0)
	{
		// the first value (usually the empty value) is selected in the first dropdown
		return;
	}
	if(dropdown2 == null || dropdown2.options == null)
	{
		// the second dropdown is not defined
		return;
	}
	
	
	
	
	if(dd2DisplayInitialText)
	{
		dropdown2.length = jsDropdown1Dropdown2OptionTextArray[arrayIndex].length + 1;
		dropdown2.options[0].text = dd2InitialText;
	}
	else
	{
		dropdown2.length = jsDropdown1Dropdown2OptionTextArray[arrayIndex].length;
		dropdown2.options[0].text = "";
	}
	
	dropdown2.options[0].value = "";
	dropdown2.selected = (0);
		
	for (var j = 0; j < jsDropdown1Dropdown2OptionValueArray[arrayIndex].length; j++) 
    	{
    		
    		if(dd2DisplayInitialText)
    		{
			dropdown2.options[j+1].text = jsDropdown1Dropdown2OptionTextArray[arrayIndex][j];
			dropdown2.options[j+1].value = jsDropdown1Dropdown2OptionValueArray[arrayIndex][j];
		}
		else
		{
			dropdown2.options[j].text = jsDropdown1Dropdown2OptionTextArray[arrayIndex][j];
			dropdown2.options[j].value = jsDropdown1Dropdown2OptionValueArray[arrayIndex][j];
		}
	}
	
	//this extra step is needed for Netscape4.72 beacuse it couldn't refresh the page on its own for dynamic dropdowns
	if (document.layers) 
	{
	 	history.go(0);
	}
	


	
}




//function updateDropDown2(index)




/**
 * dd1Index - the selected index of the first dropdown
 * dd2Index - the selected index of the second dropdown
 * dropdown1 - the first drop down (a form field)
 * dropdown2 - the second drop down (a form field)
 * dropdown3 - the third drop down (a form field)
 * dropdown4 - the fourth drop down (a form field)
 * 
 * dd1InitialText - the text which should be displayed initially for the first dropdown when it is empty (which never happens)
 * dd2InitialText - the text which should be displayed initially for the second dropdown when it is empty 
 * dd3InitialText - the text which should be displayed initially for the third dropdown when it is empty 
 * dd4InitialText - the text which should be displayed initially for the fourth dropdown when it is empty 
 * 
 * jsDropdown1Dropdown2Dropdown3OptionValueArray - a 3 dimensional array in which the first 3 dropdowns are mapped
 * jsDropdown1Dropdown2Dropdown3OptionTextArray - a 3 dimensional array in which the first 3 dropdowns are mapped
 *    dropdown.
 */
function updateDropDown3(dd1Index, dd2Index, dropdown1, dropdown2, dropdown3, dropdown4, dd1InitialText, dd2InitialText, dd3InitialText, dd4InitialText, jsDropdown1Dropdown2Dropdown3OptionValueArray, jsDropdown1Dropdown2Dropdown3OptionTextArray)
{
	var arrayIndex1 = 0;
	var arrayIndex2 = 0;
	arrayIndex1 = dd1Index - 1 ;
	arrayIndex2 = dd2Index - 1 ;
	
	// clear the third and fourth drop down
	// check if they exist first
	if(dropdown3 != null)
	{
		dropdown3.length = 1;
		dropdown3.options[0].text = dd3InitialText;
		dropdown3.options[0].value = "";
	}
	if(dropdown4 != null)
	{
		dropdown4.length = 1;	
		dropdown4.options[0].text = dd4InitialText;
		dropdown4.options[0].value = "";
	}
	
	var dropDownIndex = 0;
	dropDownIndex = dd2Index;
	if(dropDownIndex == 0)
	{
		// the empty value was selected in the second dropdown
		return;
	}
	
	
	if(dropdown3 == null || dropdown3.options == null)
	{
		return;
	}
	
	
	
	dropdown3.length = jsDropdown1Dropdown2Dropdown3OptionValueArray[arrayIndex1][arrayIndex2].length + 1;
	dropdown3.options[0].text = dd3InitialText;
	dropdown3.options[0].value = "";
	dropdown3.selected = (0);
	
	for (var k = 0; k < jsDropdown1Dropdown2Dropdown3OptionValueArray[arrayIndex1][arrayIndex2].length; k++) 
    	{
		dropdown3.options[k+1].text = jsDropdown1Dropdown2Dropdown3OptionTextArray[arrayIndex1][arrayIndex2][k];
		dropdown3.options[k+1].value = jsDropdown1Dropdown2Dropdown3OptionValueArray[arrayIndex1][arrayIndex2][k];	
	}
	
	//this extra step is needed for Netscape4.72 beacuse it couldn't refresh the page on its own for dynamic dropdowns
	if (document.layers) 
	{
 		history.go(0);
	}
	
	
}

/**
 * dd1Index - the selected index of the first dropdown
 * dd2Index - the selected index of the second dropdown
 * dd3Index - the selected index of the third dropdown
 * dropdown1 - the first drop down (a form field)
 * dropdown2 - the second drop down (a form field)
 * dropdown3 - the third drop down (a form field)
 * dropdown4 - the fourth drop down (a form field)
 * 
 * dd1InitialText - the text which should be displayed initially for the first dropdown when it is empty (which never happens)
 * dd2InitialText - the text which should be displayed initially for the second dropdown when it is empty 
 * dd3InitialText - the text which should be displayed initially for the third dropdown when it is empty 
 * dd4InitialText - the text which should be displayed initially for the fourth dropdown when it is empty 
 * 
 * jsDropdown1Dropdown2Dropdown3Dropdown4OptionValueArray - a 4 dimensional array in which the first 4 dropdowns are mapped
 * jsDropdown1Dropdown2Dropdown3Dropdown4OptionTextArray - a 4 dimensional array in which the first 4 dropdowns are mapped
 *    dropdown.
 */
function updateDropDown4(dd1Index, dd2Index, dd3Index, dropdown1, dropdown2, dropdown3, dropdown4, dd1InitialText, dd2InitialText, dd3InitialText, dd4InitialText, jsDropdown1Dropdown2Dropdown3Dropdown4OptionValueArray, jsDropdown1Dropdown2Dropdown3Dropdown4OptionTextArray)
{
	var arrayIndex1 = 0;
	var arrayIndex2 = 0;
	var arrayIndex3 = 0;
	arrayIndex1 = dd1Index - 1 ;
	arrayIndex2 = dd2Index - 1 ;
	arrayIndex3 = dd3Index - 1 ;
	
	// clear the fourth drop down
	// check if it exists first
	if(dropdown4 != null)
	{
		dropdown4.length = 1;	
		dropdown4.options[0].text = dd4InitialText;
		dropdown4.options[0].value = "";
	}
			
	var dropDownIndex = 0;
	dropDownIndex = dd3Index;
	
	if(dropDownIndex == 0)
	{
		// the empty value was selected in the third dropdown 
		return;
	}
	
	
	if(dropdown4 == null || dropdown4.options == null)
	{
		return;
	}
	
	
	
	dropdown4.length = jsDropdown1Dropdown2Dropdown3Dropdown4OptionValueArray[arrayIndex1][arrayIndex2][arrayIndex3].length + 1;
	dropdown4.options[0].text = dd4InitialText;
	dropdown4.options[0].value = "";
	dropdown4.selected = (0);
	
	for (var l = 0; l < jsDropdown1Dropdown2Dropdown3Dropdown4OptionValueArray[arrayIndex1][arrayIndex2][arrayIndex3].length; l++) 
    	{
		dropdown4.options[l+1].text = jsDropdown1Dropdown2Dropdown3Dropdown4OptionTextArray[arrayIndex1][arrayIndex2][arrayIndex3][l];
		dropdown4.options[l+1].value = jsDropdown1Dropdown2Dropdown3Dropdown4OptionValueArray[arrayIndex1][arrayIndex2][arrayIndex3][l];	
	}
	
	//this extra step is needed for Netscape4.72 beacuse it couldn't refresh the page on its own for dynamic dropdowns
	if (document.layers) 
	{
	 	history.go(0);
	}
}
