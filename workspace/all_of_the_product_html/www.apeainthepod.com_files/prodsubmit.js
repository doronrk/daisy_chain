function checkBoxCheck(event, theform) {
		var prodColor = theform.Product_Color.value;
	var tprodColor = theform.TempProdColor.value;
		
		//alert(prodColor);
		//return false;
		
		if (tprodColor=="" || tprodColor=="undefined") {
			//document.getElementById("printerr").innerHTML = "&nbsp;&nbsp;&nbsp; Please choose a color then select a size.&nbsp;&nbsp;&nbsp;";
			//document.getElementById("printerr").style.display = "";
			showAddSize(event,"<font color=white class=size12A>Please choose a color then select a size.</b></font>");				
			return false;			
		} else {
			var isProductSelected = prodColor.split(",");
			if (isProductSelected.length>0 && isProductSelected.length<=1) {
				//document.getElementById("printerr").innerHTML = "&nbsp;&nbsp;&nbsp; Please select a size. &nbsp;&nbsp;&nbsp;";
				//document.getElementById("printerr").style.display = "";
				showAddSize(event,"<font color=white class=size12A><b>&nbsp;Please select a size.</b></font>");
				return false;
			} else {
				return true;
			}
		}
}

function showColor(theColor, whereAt) {
	document.getElementById("color"+whereAt).innerHTML = "<b>Select Color:</b> <b class=overb>" + theColor; + "</b>"
}

function clearColor(whereAt) {
	document.getElementById("color"+whereAt).innerHTML = "<b>Select Color:</b> ";
}

