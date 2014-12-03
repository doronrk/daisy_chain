function setB2bHeader(cnt) {
	try {
		if (parent.window.tag_mgmt.readCookie('b2b_customer_group')) {
			var customer_group = parent.window.tag_mgmt.readCookie('b2b_customer_group');
		} else {
			var customer_group = parent.window.tag_mgmt.getUdoValue('customer_group');
		}

		if (customer_group !== false && customer_group.length != 0) {
			var b2b_group = false;
			var match = false;
			var seasonal_mod = (parent.window.document.getElementById('std_TextAlignLeftBlack')) ? '-BLACK' : '';

			for (var i = 0; i < customer_group.length && b2b_group === false; i ++) {
				match = customer_group[i].match(/B2B: (.*) Partner/i);

				if (match) {
					b2b_group = match[1].toUpperCase();
					b2b_group = 'GRAPHIC-' + b2b_group.replace(' ', '-') + seasonal_mod + '.jpg';
				} else if (customer_group[i].match(/B-2-B/i)) {
					b2b_group = 'GRAPHIC-GENERIC' + seasonal_mod + '.jpg';
				}
			}

			if (b2b_group !== false) {
				document.getElementById('home_top_promo_img').src = "/images/set_c/en_us/local/banners/global/b2b banners/" + b2b_group;
				document.getElementById('home_top_promo_img').alt = "B2B Business Partner";
				document.getElementById('home_top_promo_img').useMap = null;
			}

			parent.window.tag_mgmt.setCookie('b2b_customer_group', customer_group);
		} else {
			cnt ++;
			window.setTimeout("setB2bHeader(" + cnt + ")", .5 * 1000);
		}
	} catch (e) {
		if (parent.window.console) {
			parent.window.console.log(parent.window.tag_mgmt.readCookie('b2b_customer_group'));
		}

		cnt ++;

		if (cnt < 6) {
			window.setTimeout("setB2bHeader(" + cnt + ")", .5 * 1000);
		}
	}
}

setB2bHeader(0);