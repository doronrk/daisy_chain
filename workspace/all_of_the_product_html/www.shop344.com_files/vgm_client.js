var delete_message = "Are you sure you want to delete this item?";

function confirm_delete ()
{
	return confirm(delete_message);
}

function row_changed (theform, obj)
{
	var id = obj.name;
	var pos = id.lastIndexOf("$");
	var prefix = id.substr (0, pos+1);
	
	theform.elements[prefix+'row_changed'].value = "yes";
}

function row_changed2 (theform, obj)
{
	var id = obj.name;
	var array = id.split("$");
	var prefix = "";
	
	for (i=0; i<array.length-3; i++) {
		prefix += array[i] + "$";
	}
	
	theform.elements[prefix+'row_changed'].value = "yes";
}

function isCreditCard(st) {
	if (st.length > 19)
		return (false);
	if (st.length < 13)
		return false;

	var sum = 0; var mul = 1; var l = st.length;
	var tproduct; var digit; var i;
	for (i = 0; i < l; i++) {
			digit = st.substring(l-i-1,l-i);
			tproduct = parseInt(digit ,10)*mul;
			if (tproduct >= 10)
				sum += (tproduct % 10) + 1;
			else
				sum += tproduct;
			if (mul == 1)
				mul++;
			else
				mul--;
	}

	if ((sum % 10) == 0)
			return (true);
	else
			return (false);
}

function stripCharsInBag (s, bag)
{
	var i;
	var returnString = "";

		for (i = 0; i < s.length; i++)
		{
			// Check that current character isn't whitespace.
			var c = s.charAt(i);
			if (bag.indexOf(c) == -1) returnString += c;
		}

		return returnString;
}

function enlarge_picture (url, width, height, default_width, default_height)
{	
	var feature = 'width=';
	if (width != "")
		feature += (parseInt(width,10) + 10);
	else
		feature += default_width

	feature += ',height=';

	if (height != "")
		feature += (parseInt(height) + 10);
	else
		feature += default_height;

	feature += ',toolbar=0,menubar=0,resizable=1,status=0';

	var awin = window.open (url, 'large_picture', feature);
}
