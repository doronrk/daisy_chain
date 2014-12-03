$(document).ready(function() 
{
	var attributeDropDowns = $('select[name*="attributeSelections"]');
	for(var i=0; i< attributeDropDowns.length; i++)
	{
		var attr =attributeDropDowns[i];
		
		$(attr).bind("change", function(event){attributeOnChange(event.currentTarget);});
	}	
});


function processAvailableAttributesData(jsonData,dropDownName)
{
	if(jsonData != undefined && jsonData.hasData == 'true')
	{
		updateDropDown(jsonData.availableAttributes,dropDownName);
	}
}
		
function fetchAvailableAttributesData(index,selectedAttributeName,selectedAttributeValue,requestedAttributeName,dropDownName, itemNumberData)
{
	var itemNumber=getItemNumber(index, itemNumberData);
	
	var url = "/shop/available-attributes.js?itemNumber="+itemNumber+"&selectedAttributeName="+ selectedAttributeName;
	
	if (selectedAttributeValue != null && requestedAttributeName != null)
	{
		url = url +"&selectedAttributeValue="+selectedAttributeValue+"&requestedAttributeName="+requestedAttributeName;
	}
	
	// setup object array of variables to pass to ajax 
	var options =
	{
		url : url
		,success : function(x) { processAvailableAttributesData(x,dropDownName);}
	};

	//execute ajax call
	$.ajax(options);
}

//name is in this format: <index value>_attribute_<attribute name>
//example: 0_attribute_Color
//this method will find attribute and strip all the data off except the attribute name
function getRealAttributeName(id)
{
	var attrLength ="attribute".length;
	var index = id.indexOf("attribute");
	return id.substring(index+attrLength+1,id.length);
}

function getAvailableAttributeDropdowns(index)
{
	var selector = 'select[id^="'+ index + '_attribute"]';
	return $(selector);
}

function getItemNumber(index, itemNumberData)
{
	if (itemNumberData != null)
	{
		return itemNumberData;
	}
	
	var selector = 'input[id^="'+ index + '_itemNumber"]';
	var itemNumber = $(selector);
	return itemNumber.val();
}

function attributeOnChange(dropdown) 
{
	if (dropdown == undefined || dropdown == null)
		return;
	
	var si = dropdown.selectedIndex;
	var value = dropdown.options[si].value;
	var type = dropdown.id;
	
	if (value == undefined || value == "")
		return;
	
	//dropdown name is in this format: <index value>_attribute_<attribute name>
	//example: 0_attribute_Color
	var index = dropdown.id.substring(0,dropdown.id.indexOf("_"));
	
	var itemNumber = $(dropdown).attr("data-bos-itemNumber");
	
	if (value == "-")
	{
		fetchAvailableAttributesData(index,getRealAttributeName(dropdown.id), null, null, dropdown, itemNumber);
	}
	else
	{
		var availableAttributeDropdowns=getAvailableAttributeDropdowns(index);
		
		for(var i=0; i< availableAttributeDropdowns.length; i++)
		{
			if (availableAttributeDropdowns[i].id != type)
			{
				var requestedAttributeName=getRealAttributeName(availableAttributeDropdowns[i].id);
				var selectedAttributeValue=value;
				var selectedAttributeName=getRealAttributeName(type);
				fetchAvailableAttributesData(index,selectedAttributeName,selectedAttributeValue,requestedAttributeName,availableAttributeDropdowns[i], itemNumber);			
			}
		}
	}
} 

function updateDropDown(data,optionBox)
{
	var lastSelected = null;
	
	if (optionBox.options.length > 0) 
	{
		lastSelected = optionBox.options[optionBox.selectedIndex].value;
	} 
	
	optionBox.options.length = 0;
	
	addSelect(optionBox);
	if (data.length == 1)
	{
		for ( var x = 0; x <data.length; x++) 
		{
			addOption(optionBox,data[x].value,data[x].value);
		}
		optionBox.options[1].selected = true;
	}
	else if (data.length > 1)
	{
		var foundMatch = false; 
		var matchNum = 0;
		
		for ( var x = 0; x <data.length; x++) 
		{
			if (data[x].value == lastSelected)
			{
				foundMatch = true;
				matchNum = x+1;
			}
			addOption(optionBox,data[x].value,data[x].value);		
		}
		if (lastSelected != null && foundMatch == true ) 
		{
			optionBox.options[matchNum].selected = true;
		}
	}
}

function addOption(dropdown, value, text) 
{
	var optn = new Option(text, value);
	dropdown.options.add(optn);
}

function addSelect(thisBox)
{
	addOption(thisBox,"-","- Select -");
}