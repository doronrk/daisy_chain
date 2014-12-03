  // An Object whose properties hold Arrays of OptionType/Value pairs
/*
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/

  var MAIN_OPTIONS = new Object();

  function update_MAIN_OPTIONS(sTargetFieldID, sTypeName, sOptionTypeValue){
    // create the MAIN_OPTIONS' object property that'll hold the array of type/value pairs for this set of options
    // as long as the property doesn't already exist.
    if (MAIN_OPTIONS[sTargetFieldID] == undefined){
      MAIN_OPTIONS[sTargetFieldID] = new Array();
    }

    // add the type/value pair to the array and an id, so we can directly update if needed.
    if (MAIN_OPTIONS[sTargetFieldID][sTypeName] == undefined){
	    MAIN_OPTIONS[sTargetFieldID][MAIN_OPTIONS[sTargetFieldID].length] = sOptionTypeValue;
      MAIN_OPTIONS[sTargetFieldID][sTypeName] = new Array((MAIN_OPTIONS[sTargetFieldID].length-1),
      MAIN_OPTIONS[sTargetFieldID][MAIN_OPTIONS[sTargetFieldID].length-1]);
    } else {
    // directly update the type/value pair in the array.
	     MAIN_OPTIONS[sTargetFieldID][sTypeName][1] = sOptionTypeValue;
      MAIN_OPTIONS[sTargetFieldID][MAIN_OPTIONS[sTargetFieldID][sTypeName][0]] = sOptionTypeValue;
    }
  }

  // Function for updating the hidden options field.
  function optionTypeValues(oSelectObj){
    // string for holding the select form element's name.
    var sTypeName = oSelectObj.name;

    // object ref which points to the related options hidden field.
    var oOptionTypeValues = eval("document.getElementById('mainForm').optionTypeValues_"+(sTypeName.split("_"))[1]);

    // string for holding the target field's ID.
    var sTargetFieldID = oOptionTypeValues.id;

    // string for holding the concatenated value of the optionTypePk and the optionPk.
    var sOptionTypeValue = (sTypeName.split("_"))[2] + "=" + oSelectObj[oSelectObj.selectedIndex].value;

    // update the MAIN_OPTIONS object to reflect additions or updates
    update_MAIN_OPTIONS(sTargetFieldID, sTypeName, sOptionTypeValue);

    // update the target field's value, for posting the data.
    oOptionTypeValues.value = MAIN_OPTIONS[sTargetFieldID].join(":");
  }

// Function for updating the hidden options field.
  function imgOptionTypeValues(productPk,optionTypePk,selectedValue){
    // string for holding the select form element's name.
   // var sTypeName = oSelectObj.name;
     var sTypeName ="swatchoptions_"+productPk+"_"+optionTypePk;
    // object ref which points to the related options hidden field.
    var oOptionTypeValues = eval("document.getElementById('mainForm').optionTypeValues_"+productPk);

    // string for holding the target field's ID.
    var sTargetFieldID = oOptionTypeValues.id;
    // string for holding the concatenated value of the optionTypePk and the optionPk.
    var sOptionTypeValue = optionTypePk + "=" + selectedValue;

    // update the MAIN_OPTIONS object to reflect additions or updates
    update_MAIN_OPTIONS(sTargetFieldID, sTypeName, sOptionTypeValue);

    // update the target field's value, for posting the data.
    oOptionTypeValues.value = MAIN_OPTIONS[sTargetFieldID].join(":");
  }

// Function for updating the hidden options field.
  function sizeOptionTypeValues(productPk,optionTypePk,selectedValue){
    // string for holding the select form element's name.
   // var sTypeName = oSelectObj.name;
     var sTypeName ="options_"+productPk+"_"+optionTypePk;
    // object ref which points to the related options hidden field.
    var oOptionTypeValues = eval("document.getElementById('mainForm').optionTypeValues_"+productPk);

    // string for holding the target field's ID.
    var sTargetFieldID = oOptionTypeValues.id;
    // string for holding the concatenated value of the optionTypePk and the optionPk.
    var sOptionTypeValue = optionTypePk + "=" + selectedValue;

    // update the MAIN_OPTIONS object to reflect additions or updates
    update_MAIN_OPTIONS(sTargetFieldID, sTypeName, sOptionTypeValue);

    // update the target field's value, for posting the data.
    oOptionTypeValues.value = MAIN_OPTIONS[sTargetFieldID].join(":");
  }


function sizeOptionSelected(productPk,newOptionPk,iNewOptionText,ele){

	/*var oOptionTypeValues = eval("document.getElementById('mainForm').optionTypeValues_"+productPk);
	//var data = document.getElementById(oOptionTypeValues.id).value
	//document.getElementById(oOptionTypeValues.id).value=data+":2="+optionTypePk;
	*/
	//Change css class
	// change the selected size text value
	//Set hidden variable
	var alspn = ele.parentNode.parentNode.getElementsByTagName("span");
	for(i=0;i<alspn.length;i++){
		alspn[i].className = "swatchTDUnSelected";
	}
	ele.parentNode.className="swatchTDSelected";

   // document.getElementById("sizeDisplay").innerHTML=iNewOptionText;
	imgOptionTypeValues(productPk,2,newOptionPk);
}
