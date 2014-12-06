/*
	content:
	- js only needed on basketview (content.isml)
*/

// function avoids an double click on the delete action
function checkRequest(element)
{

	var observer=document.getElementById("requestObserver");
	if (observer.value=="yes")
	{
		element.removeAttribute("href");
		observer.value="no";		
	}
	else
	{
		observer.value="yes";
	}	
}

// function initializes the disabling of the links and submits the form
//
function updateQuantityRequest(element)
{
	var textfieldPrefix="textfield_quantity_";
	var formPrefix="form-shopbagquant_";
	var txtLength=textfieldPrefix.length;
	var productId=element.id.substring(txtLength);
	var formValue=formPrefix.concat(productId);
	disableDeleteLinks();
	var formElement=document.getElementById(formValue);
	formElement.submit();
}

// disable all the delete links from the basket when the  user changes the quantity
// no concurrent requests should occur
function disableDeleteLinks()
{
	var links = document.getElementsByTagName("a");
	for(var i = 0; i<links.length; i++) 
	{
		if (links[i].id.search(/^textlink_loeschen_/)!=-1)
		{
			links[i].removeAttribute("href");
		}
	}
	// disable delete voucher link
	var deleteVoucher=document.getElementById("textlink_voucherloeschen");
	if (deleteVoucher!=null)
	{
		deleteVoucher.removeAttribute("href");
	}
}















