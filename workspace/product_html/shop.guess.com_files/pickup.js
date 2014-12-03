var gc = gc || {};
gc.pickup = (function () {
	// ToDO: remove global state
	var map = null;
	var markersArray = [];
	var infoWindow = new google.maps.InfoWindow();

	function openLinkDialog(item, searchString, onLocationSelected) {
		var d = $('#locationsDialog');
		d.remove();

		d = $(Templates.searchPickupLocationDialog);
		d.appendTo($('body'));
		ko.applyBindings(new OpenLinkDlgViewModel(item, searchString, onLocationSelected), d[0]);

		d.dialog({
			modal: true,
			dialogClass: 'guessDialog',
			width: 900,
			height: 220,
			resizable: false
		}).keepCentered();

		var myOptions = {
			zoom: 10,
			center: new google.maps.LatLng(-34.397, 150.644),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById('locationsMap'), myOptions);

		if (searchString) {
			d.find('form').submit();
		}

		return false;
	}

	function OpenLinkDlgViewModel(item, searchString, onLocationSelected) {
		var self = this;

		self.item = item;
		self.searchString = searchString;
		self.pickUpLocationsUrl = appUrl('ShoppingBag/PickupLocations');

		self.closeDlg = function () {
			var dlg = $('#locationsDialog');
			dlg.removeCallouts();
			dlg.dialog('destroy');
		};

		self.getImage = ko.computed(function () {
			return catalogImage(self.item.color.code + '?wid=75&hei=101&fmt=jpeg&qlt=85,0&op_sharpen=0&resMode=bicub&op_usm=1.0,1.0,5,0&iccEmbed=0&crop=0,136,1686,2261')
		}, this);

		self.submitLocation = function () {
			var dlg = $('#locationsDialog');
			var form = dlg.find('form');
			dlg.removeCallouts();
			var addressField = form.find('#Address');
			if (!addressField.val() || addressField.val() == addressField.attr('title')) {
				dlg.createCallout(form, 'Please enter your address', { show: true, position: 'left' });
			} else {
				dlg.find('ul.locations-details').empty();
				dlg.dialog({
					height: 650,
					position: 'center'
				});
				dlg.removeClass('hide-locations');
				postLocationsForm(form, onLocationSelected);
				pushDataLayerEvent("eventFindInStore");
			}

			return false;
		};
	};
	
	function postLocationsForm(f, onLocationSelected) {
		var d = $("#locationsDialog");
		d.showProgress();

		clearOverlays();

		var geocoder = new google.maps.Geocoder();

		geocoder.geocode({ 'address': f.find('#Address').val(), 'region': 'US' }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var requests = [];
				var code = f.find('#pickup-code').val();
				var sku = f.find('#pickup-sku').val();
				var qty = f.find('#pickup-qty').val();

				$.each(results, function (index, value) {
					var storesRequest = composeRequest(code, sku, qty, value);
					if (storesRequest.country == 'US')
						requests.push({ result: value, request: storesRequest });
				});

				if (requests.length == 1) {
					showStores(geocoder, requests[0], onLocationSelected);
				} else if (requests.length > 1) {
					var resultsElement = d.find('.locations-details');
					resultsElement.empty();
					resultsElement.append($(document.createElement('li')).text("Please refine your search").addClass('msg'));
					$.each(requests, function (index, value) {
						resultsElement.append(
									$(document.createElement('li')).append(
									$(document.createElement('a')).attr('href', '#').addClass('location-link').click(function (e) {
										e.preventDefault();
										showStores(geocoder, value, onLocationSelected);
										return false;
									}).append(
										$(document.createElement('p')).text(value.result.formatted_address)
									)));
					});
					d.hideProgress();
				} else {
					d.createCallout(f, "Please refine your address.", { show: true, position: 'left' });
					d.hideProgress();
				}
			} else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
				d.createCallout(f, "Please refine your address.", { show: true, position: 'left' });
				d.hideProgress();
			} else {
				d.createCallout(f, "There was problem during processing your request. Please try again later.", { show: true, position: 'left' });
				d.hideProgress();
			}
		});

		return false;
	}
	
	function clearOverlays() {
		if (markersArray && markersArray.length > 0) {
			for (var i = 0; i < markersArray.length; i++) {
				markersArray[i].setMap(null);
			}
		}
		markersArray = [];
	}
	
	function composeRequest(code, sku, qty, value) {
		var request = { code: "PKUP", sku: sku, qty: qty, addressLine: '', city: '', state: '', zip: '', country: '' };
		for (var i = 0; i < value.address_components.length; i++) {
			var component = value.address_components[i];

			if (-1 != $.inArray("street_number", component.types) || -1 != $.inArray("street_address ", component.types) || -1 != $.inArray("route", component.types) || -1 != $.inArray("intersection ", component.types)) {
				request.addressLine += component.long_name;
			} else if (-1 != $.inArray("administrative_area_level_1", component.types)) {
				request.state += component.short_name;
			} else if (-1 != $.inArray("administrative_area_level_2", component.types)) {
				request.city += component.long_name;
			} else if (-1 != $.inArray("postal_code", component.types)) {
				request.zip += component.long_name;
			} else if (-1 != $.inArray("country", component.types)) {
				request.country += component.short_name;
			}
		}
		return request;
	}

	function showStores(geocoder, request, onLocationSelected) {
		var d = $("#locationsDialog");
		d.showProgress();
		var f = $('#locationsDialog form');

		if (!geocoder)
			geocoder = new google.maps.Geocoder();

		map.setCenter(request.result.geometry.location);
		$.ajax({ url: f.attr("action"), data: request.request, type: "post" }).done(function (data) {

			var resultsElement = d.find('.locations-details');
			resultsElement.empty();

			if (!data.success) {
				resultsElement.append(
					$(document.createElement("div")).addClass('not-availiable-info').append(
						$(document.createElement("p")).text('We’re sorry, this item is not available in the location you entered.  Here are 3 options:'),
						$(document.createElement("ol")).append(

							$(document.createElement("li")).text('Try a different zip code'),
							$(document.createElement("li")).text('Purchase this item online.  Close this window to go back to the product page.'),
							$(document.createElement("li")).html('Call Customer Care at 1-877-44-GUESS (48377) during business hours<table><tr><td>M-F</td><td>6am – 5pm PST</td></tr><tr><td>Sat</td><td>7am – 4pm PST</td></tr></table>We’ll help you find it!')
						)
					)
				);
				d.createCallout(f.find('#Address'), "This product is not available in any stores near this location.", { show: true, position: 'top' });
			} else {
				$.each(data.messages, function (index, value) {
					resultsElement.append(
						$(document.createElement('li')).append(
							$(document.createElement('ul')).addClass('location').addClass('header').append(
								$(document.createElement('li')).addClass('location-details').append(
									$(document.createElement('div')).addClass('msg').text('We found ' + data.locations.length + ' stores in your area.')
								),
								$(document.createElement('li')).addClass('availiability').append(
									$(document.createElement('div')).text('Availability')
								),
								$(document.createElement('li')).addClass('pick-up').append(
									$(document.createElement('div')).text('')
								)
							)
						)
					);
				});
				data.locations.sort(function (a, b) {
					return parseFloat(a.Info.Distance) - parseFloat(b.Info.Distance);
				});
				$.each(data.locations, function (index, value) {
					var locationElement = $(document.createElement('li')).append(
						$(document.createElement('ul')).addClass('location').attr('data-lid', value.Id).append(
							$(document.createElement('li')).addClass('location-details').append(
								$(document.createElement('div')).append(
									$(document.createElement('a')).text(value.Name).attr('href', '#').addClass('location-link'),
									$(document.createElement('span')).addClass('distance').text(' (' + value.Info.Distance + ' Miles)'),
									$(document.createElement('p')).text(value.AddressLine1),
									$(document.createElement('p')).text(value.City + ', ' + value.State + ', ' + value.PostalCode)
								)
							),
							$(document.createElement('li')).addClass('availiability').append(
								$(document.createElement('div')).text(value.Info.Availability)
							),
							$(document.createElement('li')).addClass('pick-up').append(
								$(document.createElement('div')).append(
									$(document.createElement('input')).attr({ id: 'pickup-btn-' + value.Id, type: 'button', value: 'Pickup' }).click(function () {
										onLocationSelected(value.Id);
										s.linkTrackEvents = "event38";
										s.events += ',event38';
										s.tl(this, 'o', 'popuppick');
									})
								)
							)
						)
					);

					resultsElement.append(locationElement);

					addLocation(geocoder, resultsElement, value, locationElement);
				});
			}
			d.hideProgress();
		}).error(function () {
			alert("There was problem during processing your request. Please try again later.");
			d.hideProgress();
		});
	}

	function addLocation(geocoder, resultsElement, a, locationElement) {
		geocoder.geocode({ 'address': a.AddressLine1 + ', ' + a.City + ', ' + a.State + ' ' + a.PostalCode, 'region': 'US' }, function (r, s) {
			if (s == google.maps.GeocoderStatus.OK) {
				var marker = new google.maps.Marker({
					map: map,
					draggable: false,
					position: r[0].geometry.location
				});
				var markerOprions = {
					title: a.Name,
					content: $(
								document.createElement('div'))
									.addClass('map-info-box')
									.append(
										$(document.createElement('h1')).text(a.Name),
										$(document.createElement('div')).text(a.AddressLine1),
										$(document.createElement('div')).text(a.City + ', ' + a.State + ', ' + a.PostalCode))
									.html()
				};

				marker.setOptions(markerOprions);

				var clickFunction = function () {
					infoWindow.setOptions(markerOprions);
					infoWindow.open(map, marker);
					$('#locationsDialog .locations-details li').removeClass('selected');
					$('#locationsDialog .locations-details li[data-lid=\'' + a.Id + '\']').addClass('selected');
					return false;
				};
				locationElement.find('.location-link').click(clickFunction);
				google.maps.event.addListener(marker, 'click', clickFunction);
				markersArray.push(marker);

			}
		});
	}

	return {
		openLinkDialog: openLinkDialog
	};
}());