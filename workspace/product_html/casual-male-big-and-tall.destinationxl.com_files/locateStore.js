/*
 * Casual Male Store Locator Google Map Implementation
 * Author: Sajeesh Vijayan
 *
 */

 var map;
 var infoWindow;
 var markersArray = [];
 var geocoder;
 
   function load(latlng){
	   $('#brands-wrap').removeClass('sticky-wrap');
		$('#brands').removeClass('sticky');
		$('#miniCart').removeClass('sticky-cart');
		$('#header-block').removeClass('sticky-block');
		$('#headerContent').removeClass('sticky-content-background');
		if(document.getElementById){
			geocoder = new google.maps.Geocoder();

			var bounds = new google.maps.LatLngBounds();
			var mapCenter = new google.maps.LatLng(52, -115);
			var zoomLevel = 4;
			if(!latlng){
				 //alert("setting default latlng value:" +latlng);

	    	     //map.setCenter(new google.maps.LatLng(40, -100), 4);


			}
			else{
				 //alert("setting actual latlng value:" +latlng);
				 // createInitialMap();
	    	     // map.setCenter(new google.maps.LatLng(latlng.lat(), latlng.lng()), 8);
	    	     zoomLevel = 8;
	    	     mapCenter = new google.maps.LatLng(latlng.lat(), latlng.lng());
	    		 $("#storeInventorySearchOptions").css("display","none");
				 $("#storeInventorySideBar").css("display","inline");
				 $("#horizontalSeparator").css("display","none");
				 $("#storeInventoryItemDisplay").css("display","none");
	    		 $("#storeInventoryMap").css("display","inline");
	    		 google.maps.event.trigger(map, 'resize');
			}

			createInitialMap(mapCenter, zoomLevel);
		}
	}

    function createInitialMap(mapCenter, zoomLevel){
/* DEVELOPER NOTE (2/9/2011) Dacia: */
/*
	1. Added GSize with map dimensions, should fix the IE map display issue.
	2. There is a JavaScript issue on the page, while other browsers like Firefox and Safari are forgiving, IE is not.
*/
		 //map = new GMap2(document.getElementById('map'), { size: new GSize(680, 400)});

		var myOptions = {
			zoom: zoomLevel,
			center: mapCenter,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};


		map = new google.maps.Map(document.getElementById('map'), myOptions);
   		infoWindow = new google.maps.InfoWindow();


/* END DEVELOPER NOTE */

		 // map.addControl(new GSmallMapControl());
	     // map.addControl(new GMapTypeControl());
	    // map.setMapTypeControl(true);
    }
    
    function validateStoreLocatorFieldsForStoreInventory(){
    	var skuAttributesString = $('#skuAttributesSpanStrInv').text();
    	var hemmingLengthString = $('#hemmingLengthStrInv').val();
    	var requiredAttributesString = $('#requiredAttributes').val();
		var productId = $("#productId").val();
		$.ajax({
			  async: false,
			  type: 'POST',
			  url: '/mens-big-and-tall-store/catalog/includes/checkSkuSelectedAttributes.jsp',
			  data: {productId : productId, skuAttributes: skuAttributesString, hemmingLength: hemmingLengthString, requiredAttributes : requiredAttributesString},
			  success: function(data) {
		    		 if(data == null || data.missingAttributes == undefined){
		    			 //do normal action
		    			 if(data.skuId != undefined){
		    				 $("#storeCartSkuId").text(data.skuId);
		    			 }
		    		 }else{
	    				$("#storeCartSkuId").text("");
		    			var errorMessage = "Please select " + data.missingAttributes;
		    			$("#pqv-errorMessages").text(errorMessage);
		    			$("#pqv-errors").css("visibility","visible");
		    			return false;
		    		 }
		    	},
			  dataType: 'json'
			});
    	
	    if(!$("#storeCartSkuId").text().length){
			return false;
		}
    	validateStoreLocatorFields();
    }


	function validateStoreLocatorFields(){
		var selectedstore="";
		if(document.storecheckform.dxl.checked==true)
    	{
    	    var dxlstore=document.getElementById("dxl");
    	    dxlstore.value="Destination XL";
    	    selectedstore= "\"Destination XL\"";
    	}
    	if(document.storecheckform.rbt.checked==true)
    	{
    		var rbtstore=document.getElementById("rbt");
    		rbtstore.value="\"Rochester Clothing\"";
    	    if(selectedstore)
    		{
    	    	selectedstore = selectedstore + "," + "\"Rochester Clothing\"";
    		}
    		else
    		{
    			selectedstore= "\"Rochester Clothing\"";
    		}
    	}
    	if(document.storecheckform.cmxl.checked==true)
    	{
    		var cmxlstore=document.getElementById("cmxl");
    		cmxlstore.value="\"Casual Male XL\"";
    		if(selectedstore)
    		{
    			selectedstore = selectedstore + "," +"\"Casual Male XL\"";
    		}
    		else
    		{
    			selectedstore= "\"Casual Male XL\"";
    		}
    	}
    	if(document.storecheckform.cmxlo.checked==true)
    	{
    		var cmxlostore=document.getElementById("cmxlo");
    		cmxlostore.value="\"Casual Male XL Outlet\"";
    		if(selectedstore)
    		{
    			selectedstore = selectedstore + "," +"\"Casual Male XL Outlet\"";
    		}
    		else
    		{
    			selectedstore= "\"Casual Male XL Outlet\"";
    		}
    	}
    	//alert("final selected store string :"+selectedstore);

		var zipcodeObj = document.getElementById('store_zipcode');
		//alert("zipcodeObj:" + zipcodeObj.value);
		var cityObj = document.getElementById('store_city');
		//alert("cityObj:" + cityObj.value);
	   	var stateObj = document.getElementById('store_state');
	   	//alert("stateObj:" + stateObj.value);
	    var storedxlObj = document.getElementById('dxl');
	    //alert("storedxlobj:" + storedxlObj.value);
	    var storerbtObj = document.getElementById('rbt');
	    //alert("storerbtObj:" + storerbtObj.value);
	    var storecmxlObj = document.getElementById('cmxl');
	    //alert("storecmxlObj:" + storecmxlObj.value);
	    var storecmxloObj = document.getElementById('cmxlo');
	    //alert("storecmxloObj:" + storecmxloObj.value);
	    

		    if(zipcodeObj.value=="Enter a ZIP Code" || zipcodeObj.value=="" ){
		    	if(	(cityObj.value!="" && cityObj.value!="Enter a City") &&
		    		(stateObj.value!="" && stateObj.value!="Select a State") ){

		    	}else{
	    			$("#pqv-errorMessages").text("Please enter the Zip Code or City and State fields");
	    			$("#pqv-errors").css("visibility","visible");
	    			if(!$.trim($("#pqv-errorMessages").html())) {
	    				alert("Please enter the Zip Code or City and State fields.");
	    			}
		    		return false;
		    	}
		    }

		    if( (zipcodeObj.value!="Enter a ZIP Code") && zipcodeObj.value && isNaN(zipcodeObj.value) ) {

		    	$("#pqv-errorMessages").text("Please enter Only Numeric values for Zip Code");
    			$("#pqv-errors").css("visibility","visible");
    			if(!$.trim($("#pqv-errorMessages").html())) {
    				alert("Please enter Only Numeric values for Zip Code.");
    			}
                return false;
            }else
            	{
	            	if((zipcodeObj.value!="Enter a ZIP Code") && (zipcodeObj.value.length)!=5 && zipcodeObj.value){
	            		$("#pqv-errorMessages").text("Please enter a valid Zip Code with 5 digits");
		    			$("#pqv-errors").css("visibility","visible");
		    			if(!$.trim($("#pqv-errorMessages").html())) {
		    				alert("Please enter a valid Zip Code with 5 digits.");
		    			}
	                    return false;
	                }

            	}
		    if(
		    	(cityObj.value=="" && cityObj.value=="Enter a City") ||
		    	(stateObj.value=="" && stateObj.value=="Select a State") ){
			    	$("#pqv-errorMessages").text("Please enter the Address fields");
	    			$("#pqv-errors").css("visibility","visible");
	    			if(!$.trim($("#pqv-errorMessages").html())) {
	    				alert("Please enter the Address fields.");
	    			}
		    		return false;
		    	}

		    if(selectedstore==""){
		    	selectedstore= "\"Destination XL\",\"Rochester Clothing\",\"Casual Male XL\",\"Casual Male XL Outlet\""
		    }
		   $("#marketing").hide();
			$("#googlemap").show();
			$("#checkout-continue").show();
			$("#checkout-continue-bottom").show();
		searchLocations(zipcodeObj.value,cityObj.value,stateObj.value,selectedstore);

	}

	function searchLocations(zipcode,city,state,selectedstore) {
		 //alert("inside searchlocations method: ");
		// alert("zipcode val in searchlocations: " + zipcode);
		 if(zipcode!="Enter a ZIP Code")
	     {
			 var address1 = zipcode;
			// alert("address1 value in searchLocations method if zipcode present:" + address1);

	     } else {
	         var address1 = city+" , "+state;
	         //alert("address1 value in searchLocations method if city state present:" + address1);
	     }

		          geocoder.geocode(
		            {'address': address1},
		            function(response, param2) {
		              if (!response || response.length < 1) {
		            	  alert(address1 + " not found");
		            	  addressNotFound(address1);

		              } else {
		       //     	  alert("latlng val inside geocoder getlatlng call fn:" +latlng);
		            	load(response[0].geometry.location);
		                //sajeesh edited here map.setCenter(latlng, 8);
		                searchLocationsNear(response[0].geometry.location,address1,selectedstore,$("#storeCartSkuId").text());
		              }
		            }
		          );

	   }

	function searchLocationsNear(center,startaddress,selectedstore,skuId) {
		//alert("inside searchlocationsNear: ");
		var radius = "200";
		var radiusSelect = document.getElementById('radiusSelect').value;

		if (radiusSelect != "" && radiusSelect != 'Select Distance') {
			radius = radiusSelect;
			// alert("user selected radius val:" +radius);
		}
		var fromShipping = window.location.href;
		var isFromShipping = false;
		if(fromShipping.indexOf("?fromShipping=1")>0){
			var searchUrl = CONTEXT_ROOT + '/storelocator/storeList.jsp?lat='+ center.lat()+'&lng='+center.lng()+'&radius='+radius+'&selectedstore='+selectedstore + '&fromShipping=1';
			isFromShipping = true;
		} else if(fromShipping.indexOf("?fromShipping=2")>0){
			var searchUrl = CONTEXT_ROOT + '/storelocator/storeList.jsp?lat='+ center.lat()+'&lng='+center.lng()+'&radius='+radius+'&selectedstore='+selectedstore + '&fromShipping=2';
			isFromShipping = true;
		} else if(fromShipping.indexOf("?fromShipping=3")>0){
			var searchUrl = CONTEXT_ROOT + '/storelocator/storeList.jsp?lat='+ center.lat()+'&lng='+center.lng()+'&radius='+radius+'&selectedstore='+selectedstore + '&fromShipping=3';
			isFromShipping = true;
		}
		else{
			var searchUrl = CONTEXT_ROOT + '/storelocator/storeList.jsp?lat='+ center.lat()+'&lng='+center.lng()+'&radius='+radius+'&selectedstore='+selectedstore;
		}
		
		if(skuId.length){
			searchUrl = searchUrl + "&skuId=" + skuId;
		}

	     //alert("inside searchLocationsNear method center latlng : " + center + "and startaddress:" + startaddress);
	     //alert("search Url value :..." + searchUrl);
		jQuery.get(searchUrl, {}, function(data) {
		//  alert("parsing");
		// alert("data: "+data);
		jQuery(data).find("marker");
			// var markers = xml.documentElement.getElementsByTagName('marker');
			var markers = jQuery(data).find("marker");
	      	// alert("markers val:" + markers);

			clearOverlays();
			var sidebar = document.getElementById('sidebar');
			sidebar.innerHTML = '';
			sidebar.style.fontSize = '11px';
			if (markers.length == 0) {
				sidebar.innerHTML = 'No results found.';
				sidebar.style.fontSize = '14px';
				sidebar.style.paddingTop = '5px';
				sidebar.style.paddingBottom = '5px';
				map.setCenter(new google.maps.LatLng(center.lat(), center.lng()), 8);
				if(skuId.length){
					$("#sidebar").css("display","none");
				}
				$("#availabilityMessage").css("display","none");
				$("#searchLocationSpan").text("No stores were found near ");
				$("#searchLocationSpan").append("<b>"+startaddress+"</b>:");
				return;
			}else{
				$("#searchLocationSpan").text("The following stores were found near ");
				$("#searchLocationSpan").append("<b>"+startaddress+"</b>:");
			}

	       // add searched for location to map
			var searchPoint = new google.maps.LatLng(center.lat(), center.lng());
			var purpleIconImage = "http://www.google.com/mapfiles/marker_purple.png";
			var searchMarker = new google.maps.Marker({
				position: searchPoint,
				map: map,
				icon: purpleIconImage
			});

			// We should add this overlay to a collection of overlays
			markersArray.push(searchMarker);

	       // map.addOverlay(searchMarker);
	       google.maps.event.addListener(searchMarker, 'click', function() {
	       		infoWindow.setContent('You searched for: <b>' + startaddress + '</b>');
	       		infoWindow.open(map, searchMarker);
	    	   //searchMarker.openInfoWindowHtml('You searched for: <b>' + startaddress + '</b>');
	       });
	       var bounds = new google.maps.LatLngBounds();

	       // Iterate over each marker
			for (var i = 0; i < markers.length; i++) {
				var number = markers[i].getAttribute('number');
				var name = markers[i].getAttribute('name');
				var address = markers[i].getAttribute('address');
				var address2 = markers[i].getAttribute('address2');
				var city = markers[i].getAttribute('city');
				var state = markers[i].getAttribute('state');
				var distance = parseFloat(markers[i].getAttribute('distance'));
				var point = new google.maps.LatLng(parseFloat(markers[i].getAttribute('lat')), parseFloat(markers[i].getAttribute('lng')));
				var postalcode = markers[i].getAttribute('postalcode');
				var phoneNumber= markers[i].getAttribute('phoneNumber');
				var hours = markers[i].getAttribute('hours');
				var available = markers[i].getAttribute('available');
				if(!skuId.length){
					//you are NOT doing store inventory search, so don't display inventory on sidebar entry
					available = "invalid";
				}
				var marker= createMarker(point ,number, name, startaddress, address, address2, city, state, postalcode, phoneNumber, hours);
				var sidebarEntry = createSidebarEntry(sidebar, marker, number, name, address, address2, city, state, distance, postalcode, phoneNumber, hours, available, isFromShipping);
		       	// sidebar.appendChild(sidebarEntry);
		       	bounds.extend(point);
			}
	   });
	 }


	function createMarker(point, number, name, startaddress, address, address2, city, state, postalcode, phoneNumber, hours) {
	      // var marker = new GMarker(point);
		var markerOptions = {
			position: point,
			map: map
		};
		var marker = new google.maps.Marker(markerOptions);
		markersArray.push(marker);

	      //alert("phonenumber in:" + phoneNumber);
		var prettyHours = URLDecode(hours).replace(/, /gi,'<br />');


		var html ='<div style="padding: 5px;"><b>' + URLDecode(number) + '</b> <br/>' + URLDecode(address) +", " + (address2 ? URLDecode(address2) +  ", " : "" ) +  URLDecode(city)+ ', ' + URLDecode(state) + " " +URLDecode(postalcode)  +'<br />'+getPrettyPhoneNumber(phoneNumber)+'<br/>'
    	  + '<br /><b>Hours:</b>'+ '<br/>'+ prettyHours + '<br/><br/>'
	      + '<a href="http://maps.google.com/maps?saddr='+ startaddress + '&daddr=' + address + '" target="_blank" style="color:#717930; font-size:10px;text-decoration:underline;font-weight:bold;">Get Directions</a><div>';

		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.setContent(html);
			infoWindow.open(map, marker);
		});
		return marker;
	}

	function addressNotFound(address) {
	    var div = document.createElement('div');
	    var html = 'Unable to find your address: <b>'+ address +'</b>';
	    div.innerHTML = html;
	    return div;
	}
	
	function createSidebarEntry(parentElement, marker, number, name, address, address2, city, state, distance, postalcode, phoneNumber, hours, available, isFromShipping) {
		if(available == "invalid"){
			//you are not doing store inventory. this is the "flag" that indicates as such
			var parentDiv =  document.createElement('div');
			parentDiv.style.cssText="cursor: pointer; margin-bottom: 15px; width: 100%; float: left;";
			var itemprop = document.createAttribute("itemprop");
		    itemprop.nodeValue = "ClothingStore";
		    parentDiv.setAttributeNode(itemprop);

			var div = document.createElement('div');
			if(isFromShipping) {
				div.style.cssText = 'float: left; width: 51%';
			} else {
				div.style.cssText = 'float: left; width: 34%';
			}

			var html = '<b>' + URLDecode(number) + '</b> (' + distance.toFixed(1) + ' mi)<br/>' + URLDecode(address) +'<br/>' + (address2 ? URLDecode(address2) +'<br/>' : '') + URLDecode(city) +', ' + URLDecode(state) +' ' +URLDecode(postalcode)+'<br/>'+getPrettyPhoneNumber(phoneNumber);
			div.innerHTML = html;

			var hoursDiv = document.createElement('div');
			var prettyHours = URLDecode(hours).replace(/, /gi,'<br />');

			hoursDiv.innerHTML = '<b>Hours:</b>'+ '<br/>'+prettyHours;
			if(isFromShipping) {
				hoursDiv.style.cssText = 'float: left; width: 49%';
			} else {
				hoursDiv.style.cssText = 'float: left; width: 33%';
			}
			
			if(!isFromShipping) {
				var storeDetailsDiv = document.createElement('div');
				var storeNumber = number.replace(/\D/g,'');
				storeDetailsDiv.innerHTML = '<a href="storeDetails.jsp?storeNumber=' + storeNumber + '" style="color: #000000;"><b>More Information</b></a>';
				storeDetailsDiv.style.cssText = 'float: right; width: 33%; text-decoration: underline;';
			}

			google.maps.event.addDomListener(parentDiv, 'click', function() {
				  google.maps.event.trigger(marker, 'click');
				  $(this).find('input[type=radio]').click();
			});
			google.maps.event.addDomListener(parentDiv, 'mouseover', function() {
				parentDiv.style.backgroundColor = '#ccc';			
			});

			google.maps.event.addDomListener(parentDiv, 'mouseout', function() {
			  parentDiv.style.backgroundColor = '#fff';
			});
			
			


			// return div;
			parentDiv.appendChild(div);
			parentDiv.appendChild(hoursDiv);
			if(!isFromShipping) {
				parentDiv.appendChild(storeDetailsDiv);
			}

			parentElement.appendChild(parentDiv);
		}else{
			var parentDiv =  document.createElement('div');
			parentDiv.style.cssText="cursor: pointer; margin-bottom: 15px; width: 100%; float: left; position: relative;";
			var itemprop = document.createAttribute("itemprop");
		    itemprop.nodeValue = "ClothingStore";
		    parentDiv.setAttributeNode(itemprop);
	
			var div = document.createElement('div');
			div.style.cssText = 'float: left; width: 50%';
	
			var html = '<b>' + URLDecode(number) + '</b> (' + distance.toFixed(1) + ' mi)<br/>' + URLDecode(address) +'<br/>' + (address2 ? URLDecode(address2) +'<br/>' : '') + URLDecode(city) +', ' + URLDecode(state) +' ' +URLDecode(postalcode)+'<br/>'+getPrettyPhoneNumber(phoneNumber);
			div.innerHTML = html;
	
			var hoursDiv = document.createElement('div');
			var prettyHours = URLDecode(hours).replace(/, /gi,'<br />');
	
			hoursDiv.innerHTML = '<b>Hours:</b>'+ '<br/>'+prettyHours;
			hoursDiv.style.cssText = 'display: inline-block; width: 35%';
			
			var quantityDiv = document.createElement('div');
	
			quantityDiv.innerHTML = '<b>Availability:</b>'+ '<br/>';
			if(available == 'true'){
				quantityDiv.innerHTML += '<span style="color:green;">In Stock</span>';
			}else{
				quantityDiv.innerHTML += '<span style="color:red;">Out of Stock</span>';
			}
			quantityDiv.style.cssText = 'position: absolute; width: 15%; top: 0; right: 10px;';
	
	
			google.maps.event.addDomListener(parentDiv, 'click', function() {
				  google.maps.event.trigger(marker, 'click');
				  $(this).find('input[type=radio]').click();
			});
			google.maps.event.addDomListener(parentDiv, 'mouseover', function() {
				parentDiv.style.backgroundColor = '#ccc';			
			});
	
			google.maps.event.addDomListener(parentDiv, 'mouseout', function() {
			  parentDiv.style.backgroundColor = '#fff';
			});
			
			
	
	
			// return div;
			parentDiv.appendChild(div);
			parentDiv.appendChild(hoursDiv);
			parentDiv.appendChild(quantityDiv);
	
			parentElement.appendChild(parentDiv);
		}
	}
	
	function restartStoreInventorySearch(){
		$("#storeInventorySideBar").css("display","none");
		$("#storeInventoryMap").css("display","none");
		$("#f1SelectedErrorMessage").css("display","none");
		$("#pqv-errors").css("visibility","hidden");
		$("#horizontalSeparator").css("display","inline");
		$("#storeInventoryItemDisplay").css("display","inline");
		$("#storeInventorySearchOptions").css("display","inline");
		$("#sidebar").css("display","inline");
	}

	    // Sometimes the phone number comes in as 1111111111 or sometimes 111-111-1111
      	// So here's the logic to correctly encode each one as a nice looking phone number.
	function getPrettyPhoneNumber(phoneNumber) {
		if (phoneNumber.length == 10) {
	   	// no dashes
	   	return '(' + URLDecode(phoneNumber.substr(0,3)) +') '+URLDecode(phoneNumber.substr(3,3))+'-'+URLDecode(phoneNumber.substr(6,4));
	   } else {
	   	return '(' + URLDecode(phoneNumber.substr(0,3)) +') '+URLDecode(phoneNumber.substr(4,3))+'-'+URLDecode(phoneNumber.substr(8,4));
	   }
	}

	function URLDecode(psEncodeString)
	{
	  // Create a regular expression to search all +s in the string
	  var lsRegExp = /\+/g;
	  // Return the decoded string
	  return unescape(String(psEncodeString).replace(lsRegExp, " "));
	}

	function clearOverlays() {
		if (markersArray) {
			for (i in markersArray) {
				markersArray[i].setMap(null);
			}
		}
	}
	
	function clearOverlaysAndRestoreHeader() {
		$('#brands-wrap').addClass('sticky-wrap');
	    $('#brands').addClass('sticky');
	    $('#miniCart').addClass('sticky-cart');
	    $('#header-block').addClass('sticky-block');
	    $('#headerContent').addClass('sticky-content-background');
		if (markersArray) {
			for (i in markersArray) {
				markersArray[i].setMap(null);
			}
		}
	}