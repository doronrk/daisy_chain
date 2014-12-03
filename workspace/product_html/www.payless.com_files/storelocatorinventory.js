/*
 * All java script logic for google driven store locator.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 *
 */

var StoreLocator = {
			
			// configuration parameters and required object instances
			initialLocation		: 	null,
			browserSupportFlag	: 	new Boolean(),
			distanceChecker		: 	null,
			storeurl			:	null,
			markerurl			:	null,
			queryurl			:	null,
			cookieurl			: 	null,
			cookiename			:	null,
			defaultlocation		:	null,
			zoomradius			:	{}, 
			markers				: 	[],
			infowindows			: 	[],
			radius				:	100,
			map					:	null,
			directionsService 	: 	null,
			directionsRenderer	: 	null,
			unit				:	'imperial',
			timer				: 	null,
			maptype				: 	null,
			selectedStore		: 	"",
			isWishlist			:	new Boolean(),
			pid					:	null,
			size				:	null,
			mapShifted			:	false,
			
			/********************************************************* 
			* initialize the google map
			* @param - zoomradius : json object with radius settings for each google zoom level (0-20)
			* @param - storeurl : url for displaying store details
			* @param - markerurl : url for marker image
			* @param - queryurl : url for querying nearest stores
			* @param - cookieurl : url for setting preferred location cookie
			* @param - cookiename : name for preferred location cookie
			* @param - defaultlocation : default address for map if users geolocation can not be detected
			* @param - maptype : type of google map to display
			**********************************************************/ 
			
			init : function(zoomradius, storeurl, markerurl, queryurl, cookieurl, cookiename, defaultlocation, maptype, wishlist, pid, size, radius, geolat, geolong) {

				this.zoomradius = zoomradius;
				this.storeurl = storeurl;
				this.markerurl = markerurl;
				this.queryurl = queryurl;
				this.cookieurl = cookieurl;
				this.cookiename = cookiename;
				this.defaultlocation = defaultlocation;
				this.maptype = maptype;
				this.initialLocation = new google.maps.LatLng(37.4419, -122.1419);
				this.isWishlist = wishlist;
				this.pid = pid;
				this.size = size;
				this.radius = radius;
				 
				var myOptions = {
				    	zoom: 10,
				    	mapTypeId: google.maps.MapTypeId[maptype]
				};
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
				
				directionsRenderer = new google.maps.DirectionsRenderer();
				directionsRenderer.setMap(map);    
				directionsRenderer.setPanel(document.getElementById('directionsPanel'));
				directionsService = new google.maps.DirectionsService();
				
				
				if (geolat != null && geolong != null) {
					this.initialLocation = new google.maps.LatLng(geolat, geolong);
					map.setCenter(this.initialLocation);
					
				} else if (google.loader.ClientLocation) {
					//alert("clientlocation");
					this.initialLocation = new google.maps.LatLng(google.loader.ClientLocation.latitude,google.loader.ClientLocation.longitude);
			    	window.defaultlocation = new google.maps.LatLng(google.loader.ClientLocation.latitude,google.loader.ClientLocation.longitude);
			    	map.setCenter(this.initialLocation);	  
			  	
			  	
				// Check for cookie preference
				} else if(this.getCookieLatLng()) {
					//console.log("cookie");
					this.initialLocation = this.getCookieLatLng();
					window.defaultlocation = this.getCookieLatLng();
					map.setCenter(this.initialLocation);
					
			
	
			    // Try Google Gears Geolocation
			  	} else if (google.gears) {
			  		//alert("gears");
			  		this.browserSupportFlag = true;
				    var geo = google.gears.factory.create('beta.geolocation');
				    geo.getCurrentPosition(function(position) {
				      	this.initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
				      	window.defaultlocation = new google.maps.LatLng(position.latitude,position.longitude);
				      	map.setCenter(initialLocation);
				    }, function() {
				      	handleNoGeoLocation(this.browserSupportFlag);
				    });
			  	
				// Browser doesn't support Geolocation so geolocate the default 
				} else {
				  	//alert("no geo")
					this.browserSupportFlag = false;
				  	handleNoGeolocation(this.browserSupportFlag);
				}
			  
				function handleNoGeolocation(errorFlag) {
					map.setZoom(4);
					StoreLocator.geoCode(StoreLocator.defaultlocation, function(results, status) {
					    if (status == google.maps.GeocoderStatus.OK && results[0].geometry.location) {
					    	StoreLocator.initialLocation = results[0].geometry.location;
					    	map.setCenter(StoreLocator.initialLocation);
					    } else {
					    	StoreLocator.initialLocation = new google.maps.LatLng(37.4419, -122.1419);
					    	map.setCenter(StoreLocator.initialLocation);
					    }
					});				  	
					 
				}

				this.getGeoPosition(this.initialLocation);

				this.distanceChecker = this.initialLocation;

				google.maps.event.addListener(map, 'center_changed', function() {
					var distance = StoreLocator.getDistance(StoreLocator.distanceChecker,map.getCenter());
						StoreLocator.distanceChecker = map.getCenter();
						window.clearTimeout(StoreLocator.timer);
						StoreLocator.timer = window.setTimeout(StoreLocator.calculateCurrentPosition,500);					
				});

				google.maps.event.addListener(map, 'zoom_changed', function() {
					if($('#distance').val() == '') {
						StoreLocator.radius = StoreLocator.zoomradius[map.getZoom()];
						window.clearTimeout(StoreLocator.timer);
						StoreLocator.timer = window.setTimeout(StoreLocator.calculateCurrentPosition,500);
					}
				});

				$('#invStoreSearchButton').click(function(){
					//$(".store-results-map-modal").show();
					StoreLocator.getSearchPosition();
					$("#directionsPanel").empty();
					$("#directions-panel-title").hide();
					directionsRenderer.setMap(null);
					StoreLocator.mapShifted = false;
					return false;
				});
				
				$('#distance').change(function(){
					if($('#distance').val() != '') {
						StoreLocator.radius = $('#distance').val();
					}else{
						StoreLocator.radius = StoreLocator.zoomradius[map.getZoom()];
					}
				});

				$('#setposition button').click(function(){
					$.ajax({async: false, url: StoreLocator.cookieurl, data: {location: map.getCenter().lat()+','+map.getCenter().lng()}});
					StoreLocator.getPreferredLocation();
					return false;
				});
				
				
				$('#distanceunitpref').change(function(){
					StoreLocator.unit = $('#distanceunitpref').val();
					StoreLocator.radius = $('#distance').val() != '' ? $('#distance').val() : StoreLocator.zoomradius[map.getZoom()];
					StoreLocator.calculateCurrentPosition(map);
				});

				this.getPreferredLocation();
				
				//submit search if address is pre-filled
				if($("#address").val() != "") {
					$('#invStoreSearchButton').click();
				}
					
			},

			getDirections : function (to, from, href){
				//from = '(' + map.getCenter().lat() + ', ' + map.getCenter().lng() + ')';
				var request = {
				  origin: from, 
				  destination: to,
				  travelMode: google.maps.DirectionsTravelMode.DRIVING,
				  unitSystem: google.maps.DirectionsUnitSystem.IMPERIAL,
				};
				directionsService.route(request, function(response, status) {
				  if (status == google.maps.DirectionsStatus.OK) {
				    directionsRenderer.setDirections(response);
				    
				    //scroll to show store finder in full view
				    // $(document.body).animate({
				        // 'scrollTop':   $('#storeproductsearchform').offset().top
				    // }, 1000);
				    
					//show the dialog
					StoreLocator.showStoreDetails(href);

				  } else {
				    //alert('Error: ' + status);
				  }
				});
			},
			
			
			/********************************************************* 
			* function to close all open google InfoWindow objects 
			**********************************************************/ 
			
			closeInfoWindows : function() {
				for (i in this.infowindows) {	
					if(typeof this.infowindows[i] == 'object') {
						this.infowindows[i].close();
					}	
				}
			},
			
			/********************************************************* 
			* function to create and position google Markers and 
			* InfoWindows for a result set of Stores
			* @param - stores : a json object containing stores
			* @param - map : the map 
			**********************************************************/
			
			populateStores : function(stores) {				
				if(this.markers.length > 0) {
					for (i in this.markers) {	
						if(typeof this.markers[i] == 'object') {
							this.markers[i].setMap(null);
						}	
					}
					this.markers.length = 0;
				}
				
				this.closeInfoWindows();
				this.infowindows.length = 0;

				$('#stores').html('');
				
				var storeCount = 0;
				// Get the Google distance for the store
				var searchLocation = map.getCenter();
				for (var store in stores) {
					var markerPosition = new google.maps.LatLng(stores[store].latitude,stores[store].longitude);
					stores[store].distance = Math.round((StoreLocator.getDistance(markerPosition, searchLocation))*10)/10;
				}
				
				// Sort the stores by distance instead of store number
				var a = new Array();
				for (var store in stores) {
					a.push(stores[store]);
				}
				a.sort(function (store1, store2) {
					return (store1['distance'] > store2['distance']) ? 1 : ((store1['distance'] < store2['distance']) ? -1 : 0);
				});
				
				// Create each store's info block
				var storelistcount = a.length;
				for (var i = 0; i < storelistcount; i++ ) {
					var store = a[i]['name'].toString();
					if (!store) continue;
					var dummy = ++storeCount;
					
					//var iconurl = location.protocol + '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + storeCount + '|000000|FFFFFF';
					//console.log(iconurl);
					var markerPosition = new google.maps.LatLng(stores[store].latitude,stores[store].longitude);
					var marker = new google.maps.Marker({
								position: markerPosition,
								map: map,
								title: stores[store]['name'] + ' ' + stores[store].address1 + ' ' + stores[store].city,
							   // icon: iconurl,
							    storeid: store
					});
					marker.setMap(map); 
					
					this.markers.push(marker);
					
					var storeinfo = '<div class="store';
					var searchLocation = map.getCenter();
					
					if(store == this.selectedStore) {
						storeinfo += " selected";
					}
					storeinfo += '" id="' + store + '">';
					storeinfo += '<div class="storename-detail">Payless Shoe Source #' + stores[store]['name'] + '</div>';

					storeinfo += '<div class="productstatus">' + stores[store]['productStatus'] + '</div>';
					
					storeinfo += '<div class="store-address-detail">' + stores[store].address1 + '<br>';
					if (stores[store].address2 != null && stores[store].address2 != "") {
						
						storeinfo += stores[store].address2 + '<br>';
					}
					storeinfo += stores[store].city + ', ' + stores[store].stateCode + ' ' + stores[store].postalCode + '<br>';
					storeinfo += stores[store].phone+'</div>';
					storeinfo += '<div class="store-address-field visually-hidden">' + stores[store].address1;
					if (stores[store].address2 != null && stores[store].address2 != "") {
						
						storeinfo += ' ' + stores[store].address2;
					}
					storeinfo += ' ' + stores[store].city + ', ' + stores[store].stateCode + ' ' + stores[store].postalCode;
					storeinfo += '</div>';
					storeinfo += '<div class="store-directions"><a onclick=setOmnitureStoreDirectionValues(' + stores[store]['name'] + ',this,"' +  encodeURI(stores[store].address1) + "," +   encodeURI(stores[store].city) + "," +  encodeURI(stores[store].stateCode) + "," + encodeURI(stores[store].postalCode) + '") href="' + this.storeurl + store + '" class="storeDetails">' + 'Store Details & Directions' + '</a></div>';
					storeinfo += '</div>';
					$('#stores').append(storeinfo);
					
		
					var contentString = '<div class="mapContent">'+
					'<span class="storename">' + stores[store]['name'] + '</span>'+
					'<div class="contentBody">'+
					'<p class="store-address">' + stores[store].address1 + '<br>';
					if (stores[store].address2 != null && stores[store].address2 != "") {
						
						contentString += stores[store].address2 + '<br>';
					}
					
					contentString += stores[store].city + ', ' + stores[store].stateCode + ' ' + stores[store].postalCode +'</p>' +
					'<p class="store-phone">Phone: '+stores[store].phone+'</p>' +
					'</div></div>';

					this.infowindows[store + 'Info'] = new google.maps.InfoWindow({
						content: contentString,
					    position: marker.position
					});

					google.maps.event.addListener(marker, 'click', function() {
						StoreLocator.closeInfoWindows();
						StoreLocator.infowindows[this.storeid + 'Info'].open(map);
						$('.storeDetails').click(function(){return StoreLocator.showStoreDetails()});
					});

					/*
					$('#' + store + ' > span > a').click(function(){
						StoreLocator.closeInfoWindows();
						var storeid = $(this).parent().parent().attr('id');
						StoreLocator.infowindows[storeid + 'Info'].open(map);
						$('.storeDetails').click(function(){return StoreLocator.showStoreDetails()});
					});	
					*/
				}
				
				if(storeCount > 0) {
					$('a.storeDetails').on("click", function(e){
						e.preventDefault();
						
						//highlight indicator
						StoreLocator.selectedStore = $(this).parents(".store").attr("id");
						
						//addresses
						var addressFrom = $("#address").val();
						if (addressFrom == null || addressFrom == " " || addressFrom == "") {
							map.setCenter(new google.maps.LatLng(geolat, geolong));
							addressFrom = map.getCenter();
						}
						var addressTo = $(this).parents(".store").find(".store-address-field").html();
						
						//generate directions and show the dialog
						StoreLocator.getDirections(addressTo, addressFrom, this.href);

					}); 
				}
				else if(!StoreLocator.mapShifted) {
					StoreLocator.mapShifted = true;
					map.setCenter(new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng() - 0.1));
				}
				else{
					$('#stores').html('<p>No stores found.</p>');
				}  
			
			},
			
			/********************************************************* 
			* function to retrieve and display details for a Store 
			**********************************************************/
			
			showStoreDetails : function(href) {
				
				$('#storedetails').dialog({
					autoOpen: false,
					position: { my: "top", at: "center", of: window },
					width: 900,
					height: 660,
					modal: true,
					title: "Store Details",
					dialogClass: 'store-details',
					open: function() { $.get(href, function(data) { $('#storedetails').html(data);}); }
				});
				$('#storedetails').dialog('open');
				return false;
			},
				
			/********************************************************* 
			* function to collect search data and retrieve a position
			**********************************************************/
			
			getSearchPosition : function() {
				var address = document.getElementById("address").value + ' ';
				//var address = document.getElementById("city").value + ' ';
				//address += document.getElementById("state").value + ' ';
				//address += document.getElementById("postalcode").value + ' ';
				//address += document.getElementById("country").value + ' ';
				if($.trim(address) != '') {
					this.geoCode(address, function(results, status) {
					    if (status == google.maps.GeocoderStatus.OK) {
					    	map.setCenter(results[0].geometry.location);
					    } else {
					    	//debug google requests
					    	//alert("Geocode was not successful for the following reason: " + status);
					    }
					});
				}else{
					this.calculateCurrentPosition();
				}
			},	
			
			/********************************************************* 
			* function to perform a google geocode (address -> LatLng)
			* @param - address : an address string to geocode
			* @param - callback : a callback function to handle the result  
			**********************************************************/
			
			geoCode : function(address, callback) {
				var geocoder = new google.maps.Geocoder();
			    geocoder.geocode( { 'address': address}, function(results, status){callback(results, status);});
			},
			
			/********************************************************* 
			* function to perform a nearest stores query
			* @param - zip : a postal code
			* @param - country : a country code
			* @param - unit : a distance unit (mi/km)
			* @param - radius : the radius to display stores from  
			**********************************************************/
			
			renderStores : function(zip,country,unit,radius) {
				$.getJSON(this.queryurl, {'postalCode': zip, 'countryCode': country, 'distanceUnit': unit, 'maxdistance': radius}, function(data){StoreLocator.populateStores(data['stores'],map);});		
			},
			
			/********************************************************* 
			* function to perform a reverse geocode (LatLng -> address)
			* @param - position : the google LatLng position
			* @param - callback : a callback function to handle the results 
			**********************************************************/
			
			reverseGeocode : function(position, callback) {
				var geocoder = new google.maps.Geocoder();
				var location = geocoder.geocode({'latLng': position}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						callback(results);
				    } else {
				        // debug google requests
				    	//alert("Geocoder failed due to: " + status);
					}
				});
			    
			},
			
			/********************************************************* 
			* function performs a reverse geocode on a given position
			* then queries for a new store set
			* @param - map : the map
			* @param - position : the position to repopulate 
			**********************************************************/
			
			getGeoPosition : function(position) {
				//do reverse geolookup to get postal code and country		
				this.reverseGeocode(position, function(results){
						
					var zip;
					var country;
					for (var result in results) {
						if(results[result].types && (results[result].types[0] == 'postal_code' || results[result].types[0] == 'locality' || results[result].types[0] == 'street_address')) {
							for (var component in results[result].address_components) {
								var addresscomponent = results[result].address_components[component];
								if(addresscomponent.types && addresscomponent.types[0] == 'postal_code') {
									zip = addresscomponent.short_name;
								}else if(addresscomponent.types && addresscomponent.types[0] == 'country') {
									country = addresscomponent.short_name;
								}
							}
						}
					}
					
					if(typeof zip != 'undefined' && zip != null) {
						// remove spaces
						zip = zip.replace(/\s/g, '');
						if (StoreLocator.isWishlist == false) {
							StoreLocator.pid = $('#pid').val().substr(0, 6);
							StoreLocator.size = $('#pid').val().substr(6);
						}
						$.getJSON(this.queryurl, {'postalCode': zip, 'countryCode': country, 'distanceUnit': StoreLocator.unit, 'maxdistance': StoreLocator.radius, 'pid': StoreLocator.pid, 'size': StoreLocator.size})
							.done(function(data){
								StoreLocator.populateStores(data['stores']);
							})
							.fail(function(data, textStatus, error){
								//console.log('get stores fail: ' + data['stores'] + " --- " + textStatus + " --- " + error);
							});
					} 
						
				});
				
			},
			
			/********************************************************* 
			* function called when movement on map exceeds radius/2 
			**********************************************************/
			
			calculateCurrentPosition : function() {
				var LatLng = map.getCenter();
				StoreLocator.getGeoPosition(LatLng);
			},
			
			/********************************************************* 
			* function to retrieve preferred location from cookie if
			* available and display in preference.  Value is stores as
			* a LatLng value in cookie and reverse geocoded for display
			**********************************************************/
			
			getPreferredLocation : function() {
				
				var latlngpref = this.getCookieLatLng();
				if(latlngpref) {
					this.reverseGeocode(latlngpref,function(results){
						var preferredlocation = '';
						for (var result in results) {
							if(results[result].types == 'postal_code' || results[result].types == 'locality') {
								preferredlocation = results[result].formatted_address;
								break;
							}
						}
						$('#prefposition').html(preferredlocation);
					});
				}
			},
			
			/********************************************************* 
			* function to parse cookie value and instantiate LatLng object
			**********************************************************/
			
			getCookieLatLng : function() {;
				if(!this.readCookie(this.cookiename)) return null;
				var position = this.readCookie(this.cookiename).split(',');
				var latlngpref = new google.maps.LatLng(position[0], position[1]);
				return latlngpref;
			},
			
			/********************************************************* 
			* function read cookie value
			* @param - name : name of the cookie to retrieve value for 
			**********************************************************/
			
			readCookie : function(name) {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length+1,c.length-1);
				}
				return null;
			},
			
			/********************************************************* 
			* function calculate a distance between two LatLng objects
			**********************************************************/
			
			getDistance : function(p1, p2) {
				  if (!p1 || !p2) {
				    return 0;  
				  }		
				  var R = 6371/1.609344; // Radius of the Earth in miles
				  var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
				  var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
				  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				    Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
				    Math.sin(dLon / 2) * Math.sin(dLon / 2);
				  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				  var d = R * c;
				  return d;
			}
			
}; // end storelocator

