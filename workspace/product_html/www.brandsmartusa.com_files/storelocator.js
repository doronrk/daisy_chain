var contextPath = "";

function showJsonResponseStoreLocator(data) {
	if (typeof data.errors=="undefined"){
		$("#stores-content").load("gadgets/stores-list.jsp");
	} else {
		showErrors(data);
	}
};

function storeLocatorSubmit(state) {
	if (validateDefault()) {
		if (typeof state != "undefined") {
			$("#storesState").val(state);
		} else {
			$("#storesState").val("");
		}
		var options = {
				success: showJsonResponseStoreLocator,
				dataType : 'json'
		};
		var fel = $("#storeLocatorForm");
		fel.ajaxForm(options);
		fel.submit();
	}
};

function showJsonResponseStoreLocatorHeader(data) {
	if (typeof data.errors=="undefined"){
		window.location= contextPath + "/storelocator/index.jsp";
	} else {
		showErrors(data);
	}
};

function storeLocatorHeaderSubmit(state) {
	if (validateDefault()) {
		if (typeof state != "undefined") {
			$("#storesStateHeader").val(state);
		} else {
			$("#storesStateHeader").val("");
		}
		var options = {
				success: showJsonResponseStoreLocatorHeader,
				dataType : 'json'
		};
		var fel = $("#storeLocatorHeaderForm");
		fel.ajaxForm(options);
		fel.submit();
	}
};


function setMarkers(map, storeLocations) {
	var bounds = new google.maps.LatLngBounds();
	var i = 0;
	for (i = 0; i < storeLocations.length; i++) {
		var locations = storeLocations[i];
		var myLatLng = new google.maps.LatLng(locations.latitude, locations.longitude);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: locations.storeName
		});
		bounds.extend(myLatLng);
	}
	if (i > 1) {
	  map.fitBounds(bounds);
	}
	else if (i == 1) {
	  map.setCenter(bounds.getCenter());
	  map.setZoom(15);
	}
};

function initialize(storeLocations) {
	var myOptions = {
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'),myOptions);
	setMarkers(map, storeLocations);
};

function showCommercial(commercialId) {
	$('#tv-commercial-video').load("/service/gadgets/tv-commercial.jsp?commercialId=" + commercialId);
}