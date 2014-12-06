
function clearSize1(aSizesLen, thisVal, sGoogle)
{
  
  for (i=0; i<=aSizesLen; i++)
  {
    document.cartform.elements["aSizes"+i].disabled = true;
    document.cartform.elements["aSizes"+i].style.display = "";
    document.cartform.elements["aSizes"+i].style.background = "#FFFFFF";
    document.cartform.elements["aSizes"+i].style.border = "dashed 1px #acacac ";
  }
  var TempProdColor = document.cartform.TempProdColor.value;
  var tempColorArray = TempProdColor.split("|");
  if (tempColorArray.length>1) 
  {
    for (b=1; b<=tempColorArray.length-1; b++) 
    {
      for (i=0; i<=aSizesLen; i++) 
      {
        var thisName = document.cartform.elements["aSizes"+i].name;
        var newColorStr = tempColorArray[b].substring(0,5) + "-" + tempColorArray[b].substring(5,7);
        var isColorExist = thisName.indexOf(newColorStr);
        if (isColorExist>=0) 
        {
          document.cartform.elements["aSizes"+i].disabled = false;
          document.cartform.elements["aSizes"+i].style.display = "";
          document.cartform.elements["aSizes"+i].style.border = "solid 1px #202020";
        }
      }
    }
  }

  document.cartform.TempProdColor.value = TempProdColor;
  tSelectedColor = document.cartform.TempSelectedColor.value;
  LQURL = "http://images.destinationmaternity.com/dmc?set=ImageURL["
  LQswd = "],Imagesize[prod]&call=url[file:sizer]&sink" 
  if (aSizesLen>1 || (aSizesLen<=1 && thisVal==1)) 
  {
    if (sGoogle == "undefined")
    {
      Switch("ProductImage", LQURL + tempColorArray[1]  + "cu.jpg" + LQswd);
    }
    else
    {
      Switch("ProductImage", LQURL+ tempColorArray[1] + sGoogle + "cu.jpg" + LQswd);
    }
  }

  document.getElementById("color1").innerHTML = "<font class=size11a><b>Select Color:</b> </font><b class=overb>" + tSelectedColor + "</b>";
  var tempValsize = document.getElementById("showChosen1").innerHTML;
  document.getElementById("sizebox").innerHTML = "<font class=size11a><b>Select Size: </b></font> <b class=overb>" + tempValsize + "</b>"	
  for (i=0; i<=aSizesLen; i++) 
  {
    var allSizes = document.cartform.elements["aSizes"+i].value;
    if (allSizes==tempValsize) 
    {
      document.cartform.elements["aSizes"+i].style.background = "#ffeca5";
    }
  }
}


function clearSize(aSizesLen, thisVal) 
{
 	for (i=0; i<=aSizesLen; i++) 
 	{
		document.cartform.elements["aSizes"+i].disabled = true;
        	document.cartform.elements["aSizes"+i].style.display = "";
		document.cartform.elements["aSizes"+i].style.background = "#FFFFFF";
		document.cartform.elements["aSizes"+i].style.border = "dashed 1px #acacac";	
	}
	 
	var TempProdColor = document.cartform.TempProdColor.value;
	var tempColorArray = TempProdColor.split("|");
	if (tempColorArray.length>1) 
	{
		for (b=1; b<=tempColorArray.length-1; b++) 
		{
			for (i=0; i<=aSizesLen; i++) 
			{
				var thisName = document.cartform.elements["aSizes"+i].name;
				var newColorStr = tempColorArray[b].substring(0,5) + "-" + tempColorArray[b].substring(5,7);
				var isColorExist = thisName.indexOf(newColorStr);
				if (isColorExist>=0) 
				{
					document.cartform.elements["aSizes"+i].disabled = false;
					document.cartform.elements["aSizes"+i].style.display = "";
					document.cartform.elements["aSizes"+i].style.border = "solid 1px #202020";
				}
			}
		}
	} 
	
	document.cartform.TempProdColor.value = TempProdColor;
	tSelectedColor = document.cartform.TempSelectedColor.value;
	
	if (aSizesLen>1 || (aSizesLen<=1 && thisVal==1)) 
	{
    		Switch("ProductImage", LQURL + tempColorArray[1] + "cu.jpg" + LQswd);
    	}

	document.getElementById("color1").innerHTML = "<b>Select Color:</b> <b class=overb>" + tSelectedColor + "</b>";	
  	var tempValsize = document.getElementById("showChosen1").innerHTML;
	document.getElementById("sizebox").innerHTML = "<b>Select Size: </b> <b class=overb>" + tempValsize + "</b>";	
   
   	for (i=0; i<=aSizesLen; i++) 
   	{
        	var allSizes = document.cartform.elements["aSizes"+i].value;
        	if (allSizes==tempValsize) 
        	{
            		document.cartform.elements["aSizes"+i].style.background = "#ffeca5";
        	}
	}
}

function updateSize(thePrice, whereAt, aSizesLen, theColor, colorStr) 
{
	document.getElementById("color"+whereAt).innerHTML = "<b>Select Color:</b> <b class=overb>" + theColor; + "</b>";
	var borderImg = document.getElementsByName('numColor');
	var prodColor = document.getElementById("showChosen").innerHTML;
	var keepSize = prodColor.split(" - ");
	var keepValidSize = "False";
	var keepThisColor = "";
	for (l=0; l<borderImg.length; l++) 
	{
		borderImg[l].style.border = "solid 1px";
	}
	
	for (i=0; i<=aSizesLen; i++) 
	{
		document.cartform.elements["aSizes"+i].disabled = true;
		document.cartform.elements["aSizes"+i].style.display = "";
		document.cartform.elements["aSizes"+i].style.background = "#FFFFFF";
		document.cartform.elements["aSizes"+i].style.border = "dashed 1px #acacac ";	
		
	}
	
	var tempColorArray = colorStr.split("|");
	if (tempColorArray.length>1) 
	{
		for (b=1; b<=tempColorArray.length-1; b++) 
		{
			for (i=0; i<=aSizesLen; i++) 
			{
				var thisName = document.cartform.elements["aSizes"+i].name;
				var thisValue = document.cartform.elements["aSizes"+i].value;
				var newColorStr = tempColorArray[b].substring(0,5) + "-" + tempColorArray[b].substring(5,7);
				var isColorExist = thisName.indexOf(newColorStr);
				if (isColorExist>=0) 
				{
					document.cartform.elements["aSizes"+i].disabled = false;
					document.cartform.elements["aSizes"+i].style.display = "";
					document.cartform.elements["aSizes"+i].style.border = "solid 1px #202020";
					if (thisValue==keepSize[1]) 
					{
						document.cartform.elements["aSizes"+i].style.background = "#fcaf89";
						keepValidSize = "True";
						keepThisColor = newColorStr;
					}
				}
				else 
				{
					if (keepValidSize=="True") {}
					else 
					{
						keepValidSize = "False";
						keepThisColor = "";
					}
				}
			}
		}
	} 

	document.cartform.TempProdColor.value = colorStr;
	document.getElementById(theColor).style.border = "solid 4px";
	var tempStr = thePrice + "<br>" + theColor;
	
	if (keepValidSize=="True") 
	{
		tempStr = tempStr + " - " + keepSize[1];
		document.getElementById("showChosen1").innerHTML = keepSize[1];
		document.getElementById("formSubmit").src = "/images/addtobag_on_Feb2014.gif";	
		var tColorStr = colorStr.split("|");
		var newColorStr = keepThisColor;
		var thisSize = document.cartform.Product_Color.value;
		var keepThisSize = thisSize.split(" - ");
		var newProdColorValue = keepThisSize[0] +  " - " + theColor + ", " + newColorStr;
		document.cartform.Product_Color.value = newProdColorValue;
	} else 
	{
		document.cartform.Product_Color.value = "";
		document.getElementById("showChosen1").innerHTML = "";
		document.getElementById("formSubmit").src = "/images/addtobag_off_Feb2014.gif";	
	}
	document.getElementById("showChosen").innerHTML = tempStr;
	document.getElementById("showChosen").style.visibility = "visible";
	document.getElementById("sizebox").innerHTML = "<b>Select Size:</b>";	
	document.cartform.TempSelectedColor.value = theColor;
	document.getElementById("printerr").style.display = "none";
}

function showSize(whereAt, aSizesLen, theColor, colorStr,thisVal) 
{
	document.getElementById("color"+whereAt).innerHTML = "<b>Select Color: </b> <b class=overb>" + theColor; + "</b>";
	
	for (i=0; i<=aSizesLen; i++) 
	{
		document.cartform.elements["aSizes"+i].disabled = true;
		document.cartform.elements["aSizes"+i].style.display = "";
		document.cartform.elements["aSizes"+i].style.background = "#FFFFFF";
		document.cartform.elements["aSizes"+i].style.border = "dashed 1px #acacac ";	
		
	}
	
	var tempColorArray = colorStr.split("|");
	if (tempColorArray.length>1) 
	{
		for (b=1; b<=tempColorArray.length-1; b++) 
		{
			for (i=0; i<=aSizesLen; i++) 
			{
				var thisName = document.cartform.elements["aSizes"+i].name;
				var newColorStr = tempColorArray[b].substring(0,5) + "-" + tempColorArray[b].substring(5,7);
				var isColorExist = thisName.indexOf(newColorStr);
				if (isColorExist>=0) 
				{
					document.cartform.elements["aSizes"+i].disabled = false;
					document.cartform.elements["aSizes"+i].style.display = "";
					document.cartform.elements["aSizes"+i].style.border = "solid 1px #202020";	
				}
			}
		}
	} 
	document.getElementById("sizebox").innerHTML = "<b>Select Size:</b>";	
}

function setProductColor(thisVal, colorStrVal ,aSizesLen) 
{
	for (i=0; i<=aSizesLen; i++) 
	{
		document.cartform.elements["aSizes"+i].style.background = "#FFFFFF";	
	}
	
	var selectedVal = thisVal.name;
	var thisColor = "";
	var tempColorName = document.cartform.TempProdColor.value;
	var selectedColor = document.cartform.Product_Color.value;
	var colorChosen = document.cartform.TempSelectedColor.value;
	var tempColorNameArray = tempColorName.split("|");
	var tempSelectedValArray = selectedVal.split("|");
	
	for (i=1; i<tempColorNameArray.length; i++) 
	{
		var tempMWorkID = tempColorNameArray[i].substring(0,5) + "-" + tempColorNameArray[i].substring(5,7);
		for (j=0; j<tempSelectedValArray.length; j++) 
		{
			var isMWorkIDSelected = tempSelectedValArray[j].indexOf(tempMWorkID);
			var isColorSelected = tempSelectedValArray[j].indexOf(colorChosen);
			if (isMWorkIDSelected>0 && isColorSelected>=0) 
			{
				selectedColor = tempSelectedValArray[j];
			}
		}
	}
	
	document.cartform.Product_Color.value = selectedColor;
	var tempVal = document.getElementById("showChosen").innerHTML;
	var tempValcolor = document.getElementById("showChosen1").innerHTML;
	var removeSize = tempVal.split("-");	
	var removecolor = tempValcolor.split("-");
	newShow = removeSize[0] + " - " + thisVal.value;
	newShowcolor = thisVal.value;
	document.getElementById("showChosen").innerHTML = newShow;
	document.getElementById("showChosen1").innerHTML = newShowcolor;
	document.getElementById("showChosen").style.visibility = "visible";
	document.getElementById("formSubmit").src = "/images/addtobag_on_Feb2014.gif";
	document.getElementById("printerr").style.display = "none";

     	for (i=0; i<=aSizesLen; i++) 
     	{
		var allSizes = document.cartform.elements["aSizes"+i].value;
        	if (allSizes==thisVal.value) 
        	{
            		document.cartform.elements["aSizes"+i].style.background = "#ffeca5";
	        }
	}

	var getColor = selectedColor.split(",");
	var theColor = getColor[0].split("-");
	document.getElementById("color1").innerHTML = "<b>Select Color:</b> <b class=overb>" + theColor[1]; + "</b>";	
}

function showOOS(thisVal, aSizesLen) 
{
    	for (i=0; i<=aSizesLen; i++) 
    	{
		var isDisabled = document.cartform.elements["aSizes"+i].disabled;
    		var theSize = document.cartform.elements["aSizes"+i].value;
    		if (isDisabled==true && thisVal==theSize) 
    		{
       			document.getElementById("sizebox").innerHTML = "<b>Select Size: </b> <b class=overb>out of stock</b>";
    		}
	}
}

function hideOOS(thisVal, aSizesLen) 
{
  	var tempValsize = document.getElementById("showChosen1").innerHTML;
  	if (tempValsize!="") 
  	{
    		document.getElementById("sizebox").innerHTML = "<b>Select Size: </b> <b class=overb>" + tempValsize + "</b>";
  	} 
  	else 
  	{
    		document.getElementById("sizebox").innerHTML = "<b>Select Size: </b> <b class=overb></b>";
  	}
}

function showTip(event, thisVal, colorStrVal) 
{
	var selectedVal = thisVal.name;
	var thisColor = "";
	var tempColorName = document.cartform.TempProdColor.value;
	var selectedColor = document.cartform.Product_Color.value;
	var colorChosen = document.cartform.TempSelectedColor.value;
	var dateAvail = "";
	var tempColorNameArray = tempColorName.split("|");
	var tempSelectedValArray = selectedVal.split("|");
	
	for (i=1; i<tempColorNameArray.length; i++) 
	{
		var tempMWorkID = tempColorNameArray[i].substring(0,5) + "-" + tempColorNameArray[i].substring(5,7);
		for (j=0; j<tempSelectedValArray.length; j++) 
		{
			var isMWorkIDSelected = tempSelectedValArray[j].indexOf(tempMWorkID);
			var isColorSelected = tempSelectedValArray[j].indexOf(colorChosen);
			if (isMWorkIDSelected>0 && isColorSelected>0) 
			{
				selectedColor = tempSelectedValArray[j];
				var isDateExisted = selectedColor.indexOf("-*");
				if (isDateExisted>0) 
				{
					dateAvail = selectedColor.substr(isDateExisted+3, selectedColor.length);
				}
			}
		}	
	}
	
	if (dateAvail!="") 
	{
		showToolTip(event,"<font color=white class=size12A><font class=size11A><b>" + selectedColor.substring(0, selectedColor.length-26) +"</b></font><br> Available on <b>"+ dateAvail +"</b><br><img src='./images/site/none.gif' height=7 width=5><br></font>");
		document.getElementById("sizebox").innerHTML = "<b>Select Size: </b> <b class=overb>" + thisVal.value; + "</b>";
		return false;
	}
	
	document.getElementById("sizebox").innerHTML = "<b>Select Size: </b> <b class=overb>" + thisVal.value;+ "</b>";
}


function hideSize(event, thisVal, colorStrVal , aSizesLen)
{
	var tempValsize = document.getElementById("showChosen1").innerHTML;
	document.getElementById("sizebox").innerHTML = "<b>Select Size: </b> <b class=overb>" + tempValsize + "</b>";	   
}


