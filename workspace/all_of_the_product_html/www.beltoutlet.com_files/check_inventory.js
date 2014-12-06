function CheckInventory (item_id, item_code) {
	var collected_data;
	var select_tags = document.item_form.getElementsByTagName('select');
	for (i=0; i < select_tags.length; i++) {
		var opt_name;
		var test_name = select_tags[i].name.indexOf ('vwattr');
		if (test_name != -1) {
			var test_name_delimiter = select_tags[i].name.indexOf ('_', test_name);
			opt_name = select_tags[i].name.substring (test_name_delimiter + 1, select_tags[i].name.length);

		} else {
			opt_name = select_tags[i].name;
		}

		if (!collected_data)
			collected_data = opt_name + '~~~' + select_tags[i].value;
		else
			collected_data = collected_data + '!!!' + opt_name + '~~~' + select_tags[i].value;
	}

	var jsel = document.createElement('script');
	jsel.type = 'text/javascript';
	jsel.src = 'http://www.kingwebtools.com/belt_outlet/stock_status/check_inventory.php?id=' + item_id + '&code=' + item_code + '&opt=' + collected_data;

	document.getElementById('kwm-ajax').appendChild (jsel);
}

function OOSNotification (item_id, item_code) {
	var collected_data;
	var select_tags = document.item_form.getElementsByTagName('select');
	for (i=0; i < select_tags.length; i++) {
		var opt_name;
		var test_name = select_tags[i].name.indexOf ('vwattr');
		if (test_name != -1) {
			var test_name_delimiter = select_tags[i].name.indexOf ('_', test_name);
			opt_name = select_tags[i].name.substring (test_name_delimiter + 1, select_tags[i].name.length);

		} else {
			opt_name = select_tags[i].name;
		}

		if (!collected_data)
			collected_data = opt_name + '=>' + select_tags[i].value;
		else
			collected_data = collected_data + '!!!' + opt_name + '=>' + select_tags[i].value;
	}

	var jsel = document.createElement('script');
	jsel.type = 'text/javascript';
	jsel.src = 'http://www.kingwebtools.com/belt_outlet/stock_status/check_inventory.php?id=' + item_id + '&code=' + item_code + '&opt=' + collected_data + '&email=' + document.getElementById('inv_email_address').value;

	document.getElementById('kwm-ajax').appendChild (jsel);
}

function ValidateOptions () {
	var empty_select = false;
	var select_tags = document.item_form.getElementsByTagName('select');
	for (i=0; i < select_tags.length; i++) {
		if ((select_tags[i].value == '') || (select_tags[i].value == 'Please Select'))
			empty_select = true;
	}

	if (empty_select == true) {
		alert ('Please choose all your selections');
		return false;
	} else
		return true;
}