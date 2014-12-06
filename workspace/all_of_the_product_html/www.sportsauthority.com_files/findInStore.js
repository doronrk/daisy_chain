// findInStore name space//
var FindInStore = new Object();
var sku_return_split;
var skuIdGet;
var latitudeI = "";
var longitudeI = "";
var addressDetailsIP = "";
var jsonAvailStores;

function QuickSortStores(jsonObject, p, r) {
	var q;
	if (p < r) {
		q = Partition(jsonObject, p, r);
		QuickSortStores(jsonObject, p, q - 1);
		QuickSortStores(jsonObject, q + 1, r);

	}
}

function Partition(jsonObject, p, r) {
	var x = jsonObject[r];
	var i = p - 1;
	for (var j = p; j <= r - 1; j++) {
		if (!compareTo(jsonObject[j], x)) {
			i++;
			Exchange(jsonObject, i, j);
		}
	}

	Exchange(jsonObject, i + 1, r);
	return i + 1;
}

function compareTo(a, b) {
	return a.storefront.calculatedDistance > b.storefront.calculatedDistance;
}

function Exchange(jsonObject, a, b) {
	var temp;
	temp = jsonObject[a];
	jsonObject[a] = jsonObject[b];
	jsonObject[b] = temp;
}

// To get skuID on change of selected product Starts//
FindInStore.getSkuIdOnChange = function () {
	return sku_return_split[1];
}

// To get color id on change of selected product
FindInStore.getColorIdOnChange = function () {
	return sku_return_split[0];
}

//To get the sku_id from pdp selection
FindInStore.getPdpSelctedSkuId = function () {
    if(document.getElementById('prod_0').value.split('|')[1] != ""){
	  return document.getElementById('prod_0').value.split('|')[1] ;
	}else{
	  return "";
	}
}

// //Code for pagination Effect Starts//
FindInStore.paginationEffect = function (paginationItem) {
	
	itemLength = paginationItem.length;
	itemLength = paginationItem.length;
	itNbr = 6; //Set the Item per page
	pgNbr = 0; //Set the page count to 0
	var thisPage = 1;
	function start() {
		if (itemLength >= itNbr) {
			paginationItem.hide();
			paginationItem.slice(0, itNbr).show();
			pgNbr = Math.ceil(itemLength / itNbr);
			if(jQuery('#min-thumb-size-demo table tr:visible').length < 6 || jQuery('#min-thumb-size-demo table tr').length == 6){
			   //jQuery("#submitChck1").text("<< Prev >>");
			   //jQuery("#submitChck2").hide();
			   jQuery(".prevNextDiv").hide();
			}else{
				jQuery(".prevNextDiv").show();
			}
			jQuery('#submitChck2').removeAttr("disabled");
			jQuery('#submitChck2').removeClass("disabled");
		}
	}
	//Get the pages Index
	function indexer() {
		jQuery('textarea').val(thisPage + ' / ' + pgNbr);
	}
	//CODE for next Button//
	jQuery('#submitChck2').click(function () {
		pgNbr = Math.ceil(itemLength / itNbr);
		 
			var first = itNbr * thisPage;
			var last = (itNbr * thisPage) + itNbr;
			paginationItem.hide();
			paginationItem.slice(first, last).show();
			thisPage++;
			indexer();
		if (jQuery('#min-thumb-size-demo table tr:visible:last').next('tr').length === 0) {
			jQuery("#submitChck1").text("<< Prev >>");
			jQuery("#submitChck2").hide();
			return false;
		}
		
	});
	//CODE for Previous Button//
	jQuery('#submitChck1').click(function () {
		jQuery("#submitChck1").text("<< Prev ");
		jQuery("#submitChck2").show();
		if (thisPage == 1) {
			start();
			indexer();
		} else {
			var last = (itNbr * thisPage) - itNbr;
			var first = last - itNbr;
			paginationItem.hide();
			paginationItem.slice(first, last).show();
			thisPage--;
			indexer();
		}
	});
	start();
	indexer();
}
//Code for pagination Effect Ends//
FindInStore.getStoreTimes = function(opTime,clTime){/*New Changes*/
	var timeString="";
	if(opTime.indexOf("|") !=-1){
		var opTimeArr=opTime.split("|");
		var clTimeArr=clTime.split("|");
		for(var i=0;i<opTimeArr.length;i++){
			timeString+=opTimeArr[i]+"-"+clTimeArr[i]+"<br>";		
		}
	}else{
		timeString+=opTime+"-"+clTime+"<br>";
	}
	return timeString;
}/*New Changes*/


FindInStore.showProductInfo = function() {
	jQuery("#min-thumb-size-demo").show();
	var paginationItem = jQuery("#min-thumb-size-demo table tr");
	FindInStore.paginationEffect(paginationItem);
}


FindInStore.loaderMask = function(isShow, isGEO) {
var dyn_loader_wrapper = jQuery('<div />').attr('id','spinner-holder');
	if(isGEO){
		if(isShow) {
			jQuery("#min-thumb-size-demo").hide();
			jQuery('body').append(dyn_loader_wrapper);
			jQuery('#spinner').show();
		} else {
			jQuery("#min-thumb-size-demo").show();
			jQuery('body').find('#spinner-holder').remove();
			jQuery('#spinner').hide();
		}
	} else {
		if(isShow) {
			jQuery('body').append(dyn_loader_wrapper);
			jQuery('#spinner').show();
		} else {
			jQuery('body').find('#spinner-holder').remove();
			jQuery('#spinner').hide();
		}
	}
}

//Geolocation code that will fo=ind the ip of user and as well as location Starts//
FindInStore.geolocationOnLoad = function (sku_return) {
	jQuery("#submitChck1").text("<< Prev ");
	jQuery("#locationNotFound, #errorMessage").hide();
	jQuery(".search-wrap, #submitChck2").show();
	document.getElementById('allStores').checked = true;
	var product_id = jQuery("#product-content-wrap .item-number").text().split('# ');
	var ajaxproduct = product_id[1];

	if (latitudeI != "" && longitudeI != "") {
		  var initialLoadGeocoder = new google.maps.Geocoder();
	      if (initialLoadGeocoder) {
          var lat = parseFloat(latitudeI);
          var lng = parseFloat(longitudeI);
          var latlng = new google.maps.LatLng(lat, lng);
	  
            initialLoadGeocoder.geocode( { 'latLng':latlng}, function(results, status) {
		    
				addressDetailsIP ='';
                if (status == google.maps.GeocoderStatus.OK) {
				addressDetailsIP = "";
				var locality="";
				var postal_code="";
				var state="";
				for (var a = 0; a < results[0].address_components.length; a++) {
					if (results[0].address_components[a].types[0] == "locality") {
						locality =  results[0].address_components[a].long_name + ", ";
					}
					if (results[0].address_components[a].types[0] == "postal_code") {
						postal_code = results[0].address_components[a].long_name + "  ";
					}
					if (results[0].address_components[a].types[0] == "administrative_area_level_1") {
						state = results[0].address_components[a].short_name + " ";
					}
				}
				addressDetailsIP=locality+""+state+""+postal_code;
				jQuery(".search-wrap").html('');
				if(jsonAvailStores == undefined || jsonAvailStores == null || jsonAvailStores.length == 0 || !jQuery.isArray(jsonAvailStores)){
					jQuery(".search-wrap").html('<p style="margin-bottom: 10px;">Showing Stores Near <strong>' + addressDetailsIP + '</strong></p><a href="javascript:void(0)" class="changeLocation" style="cursor:pointer">Change Location</a><p class="time productAvailUpdatedTime">Product availability updated HH:MM A.M. EDT</p>');
				}else{
					jQuery(".search-wrap").html('<p style="margin-bottom: 10px;">Showing Stores Near <strong>' + addressDetailsIP + '</strong></p><a href="javascript:void(0)" class="changeLocation" style="cursor:pointer">Change Location</a><p class="time productAvailUpdatedTime">Product availability updated ' + FindInStore.convertTimeInRequiredFormat(jsonAvailStores[0].inventoryUDateDate) + ' EDT</p>');
				}
				if (jQuery("#chooseOption").val() == "") {
					jQuery("#errorMessage").html("");
					jQuery("#errorMessage").html("<span class='errorMsg'>Please choose a size and color to see availability at stores near you.</span>").show();
				}
			
				}
			});
		  }
		
	}
	if (latitudeI != "" && longitudeI != "" && (sku_return != "" && sku_return != undefined)) {
		
		jQuery.ajax({
			url : '/isaStorePickup/isaStoreRequest.jsp',
			data : {
				'productId' : ajaxproduct,
				'skuId' : sku_return,
				'lat' : latitudeI,
				'lng' : longitudeI
			},
			beforeSend: function(){/*New Changes*/
				FindInStore.loaderMask(true, true);
			},/*New Changes*/
			success : function (response) {
				FindInStore.loaderMask(false, true);
				jQuery("#min-thumb-size-demo table").html("");
				var jsongetData = jQuery.parseJSON(response);
				if (jsongetData == null) {
						jQuery("#min-thumb-size-demo").hide();
						jQuery("#locationNotFound").css("display", "block");
					} else if (jsongetData.length == 0) {
						jQuery("#min-thumb-size-demo").hide();
						jQuery("#locationNotFound").css("display", "block");
					} else if (!jQuery.isArray(jsongetData) || !jsongetData.length) {
						jQuery("#min-thumb-size-demo").hide();
						jQuery("#locationNotFound").css("display", "none");
						jQuery("#technicalIssue").css("display", "block");
					} else {
					jQuery("#locationNotFound").hide();
					var currentDateTime = new Date();
					var todayDay = currentDateTime.getDay() - 1;
					var openingTime = '';
					var closingTime = '';
				

					// Customised Sorting for Stores
					QuickSortStores(jsongetData, 0, jsongetData.length - 1);
					
					jsonAvailStores = jsongetData;
					for (var a = 0; a < jsongetData.length; a++) {
						openingTime = FindInStore.currentDateTimeOpening(jsongetData[a].storefront.storefrontCode);
						closingTime = FindInStore.currentDateTimeClosing(jsongetData[a].storefront.storefrontCode);
						jQuery("#findStoreDiv #inventoryTime").find("span.inventoryUpdatedHours").text(jsongetData[0].inventoryUDateDate.hourOfDay + '.').end().find('span.inventoryUpdatedMinutes').text(jsongetData[a].inventoryUDateDate.minute + '.');

						jQuery(".search-wrap").html('<p style="margin-bottom: 10px;">Showing Stores Near <strong>' + addressDetailsIP + '</strong></p><a href="javascript:void(0)" class="changeLocation" style="cursor:pointer">Change Location</a><p class="time productAvailUpdatedTime">Product availability updated ' + FindInStore.convertTimeInRequiredFormat(jsongetData[0].inventoryUDateDate) + ' EDT</p>');
						var city = jsongetData[a].storefront.city;
						var cityWoSpace = city.replace(/ /g, "");
						var cityWdash = city.replace(/ /g, "-");
						if (jsongetData[a].availabilityIconDetail == '3.png') {
							jQuery("#min-thumb-size-demo table").append("<tr><td  class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityCheckBg'>Available</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>We have it! Come on by to check out your product!</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsongetData[a].storefront.storeName + "</a><br>" + jsongetData[a].storefront.address1 + "<br>" + jsongetData[a].storefront.city + "," + jsongetData[a].storefront.stateCode + " (<b>" + jsongetData[a].storefront.calculatedDistance.toFixed(1)+ "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsongetData[a].storefront.phoneNumber + "<br><a href='" + jsongetData[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
						} else if (jsongetData[a].availabilityIconDetail == '2.png') {
							jQuery("#min-thumb-size-demo table").append("<tr><td  class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityHoldBg'>Limited Availability</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>We only have a few left. Please consider calling this store before heading over.</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsongetData[a].storefront.storeName + "</a><br>" + jsongetData[a].storefront.address1 + "<br>" + jsongetData[a].storefront.city + "," + jsongetData[a].storefront.stateCode + " (<b>" + jsongetData[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsongetData[a].storefront.phoneNumber + "<br><a href='" + jsongetData[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
						} else {
							jQuery("#min-thumb-size-demo table").append("<tr><td  class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityCrossBg'>Not In Stock</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>Unfortunately this product is not available at this location.</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsongetData[a].storefront.storeName + "</a><br>" + jsongetData[a].storefront.address1 + "<br>" + jsongetData[a].storefront.city + "," + jsongetData[a].storefront.stateCode + " (<b>" + jsongetData[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsongetData[a].storefront.phoneNumber + "<br><a href='" + jsongetData[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
						}
					}
					
					FindInStore.showProductInfo();
				}
			},
			error : function () {
				jQuery("#technicalIssue").show();
			}
			
		});
		
	} else if (latitudeI != "" && longitudeI != "" && (sku_return == "" || sku_return == undefined)) {
		jQuery("#errorMessage").html("");
		jQuery("#errorMessage").html('<span class="errorMsg">Please choose a size and color to see availability at stores near you.</span>');
		jQuery("#locationNotFound").hide();
	}
}

//Geolocation code that will fo=ind the ip of user and as well as location Ends//
FindInStore.getPostalCode = function (lat,lng) {
var initialLoadGeocoder = new google.maps.Geocoder();
	      if (initialLoadGeocoder) {
          var lat = parseFloat(latitudeI);
          var lng = parseFloat(longitudeI);
          var latlng = new google.maps.LatLng(lat, lng);	  
           initialLoadGeocoder.geocode( { 'latLng':latlng}, function(results, status) {
				var locality="";
				var postal_code="";
				var state="";
				addressDetailsIP = '';
                if (status == google.maps.GeocoderStatus.OK) {
				for (var a = 0; a < results[0].address_components.length; a++) {
					if (results[0].address_components[a].types[0] == "locality") {
						locality =  results[0].address_components[a].long_name + ", ";
					}
					if (results[0].address_components[a].types[0] == "postal_code") {
					
						postal_code =  results[0].address_components[a].long_name + "  ";
						
					}
					if (results[0].address_components[a].types[0] == "administrative_area_level_1") {
						state =  results[0].address_components[a].short_name + " ";
					}
				}
				addressDetailsIP=locality+""+state+""+postal_code;
				
			  }
			
				
			});
		}
		return addressDetailsIP;
}

//Function for find store with ajax call on behalf of sku and zip code//
FindInStore.appendData = function (selected_zip) {
	jQuery("#submitChck1").text("<< Prev ");
	jQuery("#submitChck2").show();
	jQuery("#errorMessage").hide();
	jQuery("#min-thumb-size-demo table").html("");
	document.getElementById('allStores').checked = 'true';
	jsonAvailStores = null;
	jQuery("#locationNotFound").hide();
	var sku_return = jQuery('#chooseOption').val();
	sku_return_split = sku_return.split('|');
	jQuery("#min-thumb-size-demo").hide();
	var product_id = jQuery("#product-content-wrap .item-number").text().split('# ');
	if (jQuery('#chooseOption').val() == "" && (selected_zip == "" || selected_zip == "SEARCH BY CITY, STATE OR ZIP")) {
		jQuery("#errorMessage").show().html('<span class="errorMsg">Please choose size and color as well as zip code.</span>');

	} else if (jQuery('#chooseOption').val() != "" && (selected_zip == "" || selected_zip == "SEARCH BY CITY, STATE OR ZIP")) {
		jQuery("#errorMessage").show().html('<span class="errorMsg">Please enter city or zip code to find store near you.</span>');
	} else if (jQuery('#chooseOption').val() == "" && selected_zip != "") {
		jQuery("#errorMessage").html("");
		jQuery("#errorMessage").show().html('<span class="errorMsg">Please choose a size and color to see availability at stores near you.</span>');
	} else {
		jQuery('#errorMessage').html('');
		var ajaxproduct = product_id[1];
		jQuery.support.cors = true;
		var tsa_google_geocoder = new google.maps.Geocoder();
		tsa_google_geocoder.geocode( { 'address': selected_zip}, function(results, status) {
				
				if (status == 'ZERO_RESULTS') {
					jQuery("#errorMessage").html('<div class="textData">Sorry "' + selected_zip + '" is not a valid location.</div><span  class="newLocation">Please enter a new location here:</span><input type="text" id="search-zip" class="text lightBoxSearchZip" name="postalCode" value="SEARCH BY CITY, STATE OR ZIP" onkeypress="return FindInStore.validateSubmitttedZip(event,this)"><input type="button" tabindex="1" id="upperSubmit" class="ispu-search ispu-sprite" value="SUBMIT">').show();
					if (jQuery('.search-wrap').children('.time').prev('div.noLocationFound').length === 0) {
						jQuery('.search-wrap').children('.time').before('<div class="noLocationFound" style="color: #f00; font-size:11px">Please enter a new location.</div>')
					} else {
						jQuery('.search-wrap').children('div.noLocationFound').text('Please enter a new location.');
					}

				} else {
				    var location = results[0].geometry.location;
					var latitude = location.lat();
					var longitude = location.lng();
					latitudeI = latitude;
					longitudeI = longitude;
					saveCookie(latitude, longitude);
					jQuery.ajax({
						url : '/isaStorePickup/isaStoreRequest.jsp',
						data : {
							'productId' : ajaxproduct,
							'skuId' : sku_return_split[1],
							'lat' : latitude,
							'lng' : longitude
						},beforeSend: function(){
							FindInStore.loaderMask(true, false);
						},
						success : function (response) {
							FindInStore.loaderMask(false, false);
							jQuery("#min-thumb-size-demo table").html("");
							var jsongetData = jQuery.parseJSON(response);
							addressDetailsIP = "";
							var postalCodeAvailable='false';
							var localityAvailable='false';
							var stateAvailable='false';
                            var locality="";
							var postal_code="";
							var state="";
							for (var a = 0; a < results[0].address_components.length; a++) {

								if (results[0].address_components[a].types[0] == "locality") {
                                    localityAvailable='true';
									locality =  results[0].address_components[a].long_name + ", ";
								}

								if (results[0].address_components[a].types[0] == "postal_code") {
								    postalCodeAvailable='true';
									postal_code =  results[0].address_components[a].long_name + "  ";
								}

								if (results[0].address_components[a].types[0] == "administrative_area_level_1") {
								    stateAvailable='true';
									state = results[0].address_components[a].short_name + " ";
								}

							}
							addressDetailsIP=locality+""+state+""+postal_code;
							var timeout = 0;
							if(localityAvailable=='false' ||postalCodeAvailable =='false'|| stateAvailable=='false'){
								addressDetailsIP=FindInStore.getPostalCode(latitude,longitude);
								timeout = 500;
							}
							setTimeout(
								function(){
									if (jsongetData == null) {
										jQuery(".search-wrap").html('<p style="margin-bottom: 10px;">Showing Stores Near <strong>' + addressDetailsIP + '</strong></p><a href="javascript:void(0)" class="changeLocation" style="cursor:pointer">Change Location</a><p style="margin-top: 15px; clear: left; display: block; float: left;"><input type="text" value="' + selected_zip + '" name="postalCode" class="text lightBoxSearchZip" id="search-zip" onkeypress="return FindInStore.validateSubmitttedZip(event,this)"/><input type="button" value="SUBMIT" class="ispu-search ispu-sprite" id="upperSubmit" tabindex="1"/></p><p class="time productAvailUpdatedTime">Product availability updated HH:MM A.M. EDT</p>');
										jQuery("#locationNotFound").css("display", "block");
									} else if (jsongetData.length == 0) {
										jQuery(".search-wrap").html('<p style="margin-bottom: 10px;">Showing Stores Near <strong>' + addressDetailsIP + '</strong></p><a href="javascript:void(0)" class="changeLocation" style="cursor:pointer">Change Location</a><p style="margin-top: 15px; clear: left; display: block; float: left;"><input type="text" value="' + selected_zip + '" name="postalCode" class="text lightBoxSearchZip" id="search-zip" onkeypress="return FindInStore.validateSubmitttedZip(event,this)"/><input type="button" value="SUBMIT" class="ispu-search ispu-sprite" id="upperSubmit" tabindex="1"/></p><p class="time productAvailUpdatedTime">Product availability updated HH:MM A.M. EDT</p>');
										jQuery("#locationNotFound").css("display", "block");
									} else if (!jQuery.isArray(jsongetData) || !jsongetData.length) {
										jQuery(".search-wrap").html('<p style="margin-bottom: 10px;">Showing Stores Near <strong>' + addressDetailsIP + '</strong></p><a href="javascript:void(0)" class="changeLocation" style="cursor:pointer">Change Location</a><p style="margin-top: 15px; clear: left; display: block; float: left;"><input type="text" value="' + selected_zip + '" name="postalCode" class="text lightBoxSearchZip" id="search-zip" onkeypress="return FindInStore.validateSubmitttedZip(event,this)"/><input type="button" value="SUBMIT" class="ispu-search ispu-sprite" id="upperSubmit" tabindex="1"/></p><p class="time productAvailUpdatedTime">Product availability updated HH:MM A.M. EDT</p>');
										jQuery("#locationNotFound").css("display", "none");
										jQuery("#technicalIssue").css("display", "block");
									} else {
										jQuery("#locationNotFound").css("display", "none");
										QuickSortStores(jsongetData, 0, jsongetData.length - 1);
										jsonAvailStores = jsongetData;

										jQuery("#findStoreDiv #inventoryTime").find("span.inventoryUpdatedHours").text(FindInStore.convertTimeInRequiredFormat(jsongetData[0].inventoryUDateDate) + '.');

										jQuery(".search-wrap").html('<p style="margin-bottom: 10px;">Showing Stores Near <strong>' + addressDetailsIP + '</strong></p><a href="javascript:void(0)" class="changeLocation" style="cursor:pointer">Change Location</a><p style="margin-top: 15px; clear: left; display: block; float: left;"><input type="text" value="' + selected_zip + '" name="postalCode" class="text lightBoxSearchZip" id="search-zip" onkeypress="return FindInStore.validateSubmitttedZip(event,this)"/><input type="button" value="SUBMIT" class="ispu-search ispu-sprite" id="upperSubmit" tabindex="1"/></p><p class="time productAvailUpdatedTime">Product availability updated ' + FindInStore.convertTimeInRequiredFormat(jsongetData[0].inventoryUDateDate) + ' EDT</p>');
										for (var a = 0; a < jsongetData.length; a++) {
									var openingTime = FindInStore.currentDateTimeOpening(jsongetData[a].storefront.storefrontCode);
									var closingTime = FindInStore.currentDateTimeClosing(jsongetData[a].storefront.storefrontCode);
											jQuery("#findStoreDiv #inventoryTime").find("span.inventoryUpdatedHours").text(FindInStore.convertTimeInRequiredFormat(jsongetData[0].inventoryUDateDate) + '.');
											jQuery("#min-thumb-size-demo").show();
											var city = jsongetData[a].storefront.city;
											var cityWoSpace = city.replace(/ /g, "");
											var cityWdash = city.replace(/ /g, "-");
											if (jsongetData[a].availabilityIconDetail == '3.png') {
												jQuery("#min-thumb-size-demo table").append("<tr><td class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityCheckBg'>Available</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>We have it! Come on by to check out your product!</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsongetData[a].storefront.stateCode + "." + jsongetData[a].storefront.city + ".sportsauthority.com/sporting-goods-" + jsongetData[a].storefront.city + "-" + jsongetData[a].storefront.storefrontCode + ".html' target='_blank' class='placeOfStore'" + ">" + jsongetData[a].storefront.storeName + "</a><br>" + jsongetData[a].storefront.address1 + "<br>" + jsongetData[a].storefront.city + "," + jsongetData[a].storefront.stateCode + " (<b>" + jsongetData[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsongetData[a].storefront.phoneNumber + "<br><a href='" + jsongetData[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
											} else if (jsongetData[a].availabilityIconDetail == '2.png') {
												jQuery("#min-thumb-size-demo table").append("<tr><td class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityHoldBg'>Limited Availability</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>We only have a few left. Please consider calling this store before heading over.</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsongetData[a].storefront.storeName + "</a><br>" + jsongetData[a].storefront.address1 + "<br>" + jsongetData[a].storefront.city + "," + jsongetData[a].storefront.stateCode + " (<b>" + jsongetData[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsongetData[a].storefront.phoneNumber + "<br><a href='" + jsongetData[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
											} else {
												jQuery("#min-thumb-size-demo table").append("<tr><td  class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityCrossBg'>Not In Stock</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>Unfortunately this product is not available at this location.</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsongetData[a].storefront.storeName + "</a><br>" + jsongetData[a].storefront.address1 + "<br>" + jsongetData[a].storefront.city + "," + jsongetData[a].storefront.stateCode + " (<b>" + jsongetData[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsongetData[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsongetData[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsongetData[a].storefront.phoneNumber + "<br><a href='" + jsongetData[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
											}
										}

									FindInStore.showProductInfo();
								}} , timeout);
						},

						error : function () {
						jQuery("#technicalIssue").show();
						}
					});
				 }
            });
	}
}

//Function for find store with ajax call on behalf of sku and zip code Ends//

//To get curretn datae and time//

FindInStore.currentDateTimeOpening = function (storeID) {
	var currentDateTime = new Date();
	var todayDay = currentDateTime.getDay();
	var openingTime = '';

	var weekdayOpening = ["openingTimeSun", "openingTimeMon", "openingTimeTue", "openingTimeWed", "openingTimeThu", "openingTimeFri", "openingTimeSat"];
	if (jsonAvailStores != null) {
		for (var a = 0; a < jsonAvailStores.length; a++) {
			if (storeID == jsonAvailStores[a].storefront.storefrontCode) {
				for (var timeIn in jsonAvailStores[a].storefront.storefrontTimingsDetails) {
					if (timeIn == weekdayOpening[todayDay]) {
						openingTime = jsonAvailStores[a].storefront.storefrontTimingsDetails[timeIn];
						break;
					}
				}
			}
		}
	}
	return openingTime;
}

FindInStore.currentDateTimeClosing = function (storeID) {
	var currentDateTime = new Date();
	var todayDay = currentDateTime.getDay();
	var closingTime = '';

	var weekdayClosing = ["closingTimeSun", "closingTimeMon", "closingTimeTue", "closingTimeWed", "closingTimeThu", "closingTimeFri", "closingTimeSat"];
	if (jsonAvailStores != null) {
		for (var a = 0; a < jsonAvailStores.length; a++) {
			if (storeID == jsonAvailStores[a].storefront.storefrontCode) {
				for (var timeIn in jsonAvailStores[a].storefront.storefrontTimingsDetails) {
					if (timeIn == weekdayClosing[todayDay]) {
						closingTime = jsonAvailStores[a].storefront.storefrontTimingsDetails[timeIn];
						break;
					}
				}
			}
		}
	}
	return closingTime;
}
//Function to get time Starts//
FindInStore.convertTimeInRequiredFormat = function (time) {
	time = time.toUpperCase();
	var res = time.split(":");
	var res1 = res[1].substring(0, 2);
	var res2 = res[1].substring(2, 4);
	var res3 = res2.split("");
	var res4 = res3[0] + "." + res3[1];
	var finalTime = '';
	if (res[0] == '10' || res[0] == '11' || res[0] == '12' || res[0] == '00') {
		finalTime = res[0] + ":" + res1 + "." + res4 + '.';
	} else {
		finalTime = "0" + res[0] + ":" + res1 + ' ' + res4 + '.';
	}
	return finalTime;
}
//Function to get time ENDs//
jQuery(document).ready(function () {
	//Dialog Creation code starts//
	$("#findStoreDiv").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 780,
		open : function (event, ui) {
			var x = jQuery(this).position().left + jQuery(this).outerWidth();
			var y = jQuery("#ispu-chec").position().top - jQuery(document).scrollTop();
			$("#dialog").dialog('option', 'position', [x, y]);
			jQuery(".ui-dialog-titlebar").css({
				opacity : 0,
				filter : "Alpha(Opacity=0)",
				display : "none"
			});
			jQuery('#findStoreDiv').css('overflow', 'visible');
			jQuery(".ui-widget-overlay").css({
				background : "none",
				opacity : 0.80,
				filter : "Alpha(Opacity=80)",
				backgroundColor : "black"
			});
			jQuery('.ui-widget-overlay').bind('click', function () {
				$("#findStoreDiv").dialog('close')
			});
		}
	});
	//Dialog Creation code Ends//
	//Dialog OPEN CODE Ends//
	FindInStore.dialogOpen = function () {
		//chrome check for one multi store hours in store with availablity check box//
		if(window.navigator.vendor == "Google Inc."){jQuery("#bottomMesages").css('height','490px');}
		//Initialization code//
		jQuery("#technicalIssue").hide();
		jQuery("#chooseOption, #min-thumb-size-demo table,#tab").html("");
		jQuery('textarea').val("");
		jQuery("#min-thumb-size-demo").hide();
		jQuery("#search-zip").val("SEARCH BY CITY, STATE OR ZIP");
		jQuery("#mainImageURL").attr('src', '');
		var selectedImageURL ;
		var colorSelected = jQuery("#product-color .active").text() != "";
		if(productJSON.isaPopUpMainUrl != "" && productJSON.isaPopUpMainUrl != null){
		  var colorId = $.trim(jQuery("#product-color .active").attr('data-id'));
		  if(colorSelected){
			for (var i = 0; i < productJSON.availableColors.length; i++) {
				if (colorId == productJSON.availableColors[i].id) {
					if (productJSON.availableColors[i].mainImageURL == "") {
						selectedImageURL = '/images/noimage_275x400.jpg';
						break;
					}
					if(productJSON.availableColors[i].isaPopUpImageURL != "" && productJSON.availableColors[i].isaPopUpImageURL != null){
					  selectedImageURL = productJSON.availableColors[i].isaPopUpImageURL;
					}else{
					  selectedImageURL = productJSON.availableColors[i].mainImageURL;
					}
					break;
				}
			}
		  }else{
		    selectedImageURL = productJSON.isaPopUpMainUrl;
		  }		  
		}else{
		  selectedImageURL = jQuery("#product-content-wrap .prod-image").attr("src");
		}
		var data_id_testget = $.trim(jQuery("#product-size .active").text());
		var pgNbr;
		var selectedImageURLget = '';
		jQuery("#chooseOption").append("<option value='' >Please Select</option>");
		jQuery("#mainImageURL").attr('src', selectedImageURL);
		jQuery("#allStores").attr("checked", "checked");
		jQuery("#storesAvailablity").removeAttr("checked");
		jQuery("#technicalIssue").hide();
		jQuery("#zipSearchError").html("");
		jQuery("#zipSearchError").hide("");
		jQuery("#errorMessage").html("");
		//Initialization code ends here///
		var inStoreAvailable = false;
		var isaFlag ;
		var skuDrop = jQuery("#product-variant .variant option:selected").val();
		// if(skuDrop == null || skuDrop == undefined || skuDrop == ""){
			// if(jQuery("#product-size").is(":visible") == false){
				// skuDrop = FindInStore.getPdpSelctedSkuId();
			// }
		// }
		if (data_id_testget == "" || jQuery("#product-swatch").find(".active").length < 1) {
			if (skuAvailString.length == 1) {
				jQuery("#chooseOption").append("<option selected='selected' value=" + skuAvailString[0].colorId + "|" + skuAvailString[0].sku + ">" + skuAvailString[0].color + " : " + skuAvailString[0].size + "</option>");
			} else {
				for (var i = 0; i < skuAvailString.length; i++) {
					var counter = skuAvailString[i];
					isaFlag = counter.isaStatus;
					inStoreAvailable = false;
					if(isaFlag == "InAllStores" || isaFlag.toUpperCase() == "IN-STORE: AVAILABLE IN STORES" || isaFlag == "InSelectStores" || isaFlag.toUpperCase() == "IN-STORE: AVAILABLE IN SELECT STORES"){
					  inStoreAvailable = true;
					}
					if(inStoreAvailable){
						if(skuDrop == skuAvailString[i].sku){
							jQuery("#chooseOption").append("<option selected='selected' value=" + counter.colorId + "|" + counter.sku + ">" + counter.color + " : " + counter.size + "</option>");
							continue;
						}
					  jQuery("#chooseOption").append("<option value=" + counter.colorId + "|" + counter.sku + ">" + counter.color + " : " + counter.size + "</option>");
					}
				}
			}
			jsonAvailStores = "";
			$("#findStoreDiv").dialog("open");
		} else {
			var selectedImageURLget = jQuery("#product-swatch .active").attr('data-color').toUpperCase();
			for (var i = 0; i < skuAvailString.length; i++) {
				var counter = skuAvailString[i];
				isaFlag = counter.isaStatus;
				inStoreAvailable = false;
				if(isaFlag == "InAllStores" || isaFlag.toUpperCase() == "IN-STORE: AVAILABLE IN STORES" || isaFlag == "InSelectStores" || isaFlag.toUpperCase() == "IN-STORE: AVAILABLE IN SELECT STORES"){
				  inStoreAvailable = true;
				}
				if(inStoreAvailable){
					if ((counter.color.toUpperCase() + " : " + counter.size) == (selectedImageURLget + " : " + data_id_testget)) {
						skuIdGet = counter.sku;
						jQuery("#chooseOption").append("<option selected='selected' value=" + counter.colorId + "|" + counter.sku + ">" + counter.color + " : " + counter.size + "</option>");
						continue;
					}
					jQuery("#chooseOption").append("<option value=" + counter.colorId + "|" + counter.sku + ">" + counter.color + " : " + counter.size + "</option>");
				}	
			}
			jsonAvailStores = "";
			$("#findStoreDiv").dialog("open");
		}
		//Finction for get geolocation Starts//
		if (latitudeI == '' && longitudeI == '') {
			(function () {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(success, error);
				} else {
					googleLocate();
				}
				/* this makes the call to Google for the location, no other data required yet */
				function googleLocate() {
					if (google.loader.ClientLocation) {
						/* this will take the content of the object and turn it into a string for demo purposes. */
						text = JSON.stringify(google.loader.ClientLocation, null, 4);
					} else {
						//text = 'Google was not able to detect your location';
							if(jQuery('#chooseOption option:selected').val() != ""){
						// if (color != "" && size != "") {
							jQuery("#errorMessage").show().html('<span class="errorMsg">Please enter city or zip code to find store near you.</span>');
						} else {
							jQuery("#errorMessage").show().html('<span class="errorMsg">Please choose size and color as well as zip code.</span>');
						}
					}
				}
				function success(position) {
					latitudeI = position.coords.latitude;
					longitudeI = position.coords.longitude;
					saveCookie(latitudeI, longitudeI);
					if (productJSON.skus.length == 1) {
						FindInStore.geolocationOnLoad(productJSON.skus[0].skuId);
					}else{
						FindInStore.geolocationOnLoad(FindInStore.getPdpSelctedSkuId());
					}
				}
				function error(msg) {
					if(jQuery('#chooseOption option:selected').val() != ""){
						jQuery("#errorMessage").show().html('<span class="errorMsg">Please enter city or zip code to find store near you.</span>');
					} else {
						jQuery("#errorMessage").show().html('<span class="errorMsg">Please choose size and color as well as zip code.</span>');
					}
				}
			})();
		} else {
			if (productJSON.skus.length == 1) {
				FindInStore.geolocationOnLoad(productJSON.skus[0].skuId);
			} else {
				FindInStore.geolocationOnLoad(FindInStore.getPdpSelctedSkuId());
			}
		}
	}
	//Code for Click On Find In Store Button  Starts//
	jQuery("#ispu-chec").click(function () {
		jQuery("#errorMessage").html("");
		if (jQuery(this).hasClass('ispu-chec-NotInStore')) {
			jQuery('#ispu-chec').prop('click', null);
			return false;
		}else{
			FindInStore.dialogOpen();
		}
	});
	jQuery("#availability").on('click', '#availIndicatorsRow a', function () {
		FindInStore.dialogOpen();
	});
	//Code for Click On Find In Store Button  Ends//
	//Select box change code//
	jQuery('#chooseOption').change(function () {
		jQuery("#errorMessage").hide();
		jQuery("#technicalIssue").hide();
		var sku_return = (jQuery('#chooseOption').val());
		sku_return_split = sku_return.split('|');
		for (var i = 0; i < productJSON.availableColors.length; i++) {
			if (sku_return_split[0] == productJSON.availableColors[i].id) {
				if (productJSON.availableColors[i].mainImageURL == "") {
					jQuery("#mainImageURL").attr('src', '/images/noimage_275x400.jpg');
					break;
				}
				if(productJSON.availableColors[i].isaPopUpImageURL != "" && productJSON.availableColors[i].isaPopUpImageURL != null){
				  jQuery("#mainImageURL").attr('src', productJSON.availableColors[i].isaPopUpImageURL);
				}else{
				  jQuery("#mainImageURL").attr('src', productJSON.availableColors[i].mainImageURL);
				}
				break;
			}
		}
		if (jQuery("#search-zip").is(":visible")) {
			latitudeI = "";
			longitudeI = "";
			FindInStore.appendData(jQuery("#search-zip").val());
		}
		if (latitudeI != "" && longitudeI != "") {
			jQuery("#errorMessage").hide();
			if(sku_return_split[1] == "" || sku_return == ''){
				jQuery("#min-thumb-size-demo,#locationNotFound").hide();
				jQuery("#errorMessage").html('<span class="errorMsg">Please choose a size and color to see availability at stores near you.</span>').show();
			}else{
			FindInStore.geolocationOnLoad(sku_return_split[1]);
			}
		}
	});
	//zip code different conditions//
	jQuery(".search-wrap").on('click', '#upperSubmit', function () {
		jQuery("#technicalIssue").hide();
		jQuery("#zipSearchError").hide();
		jQuery("#errorMessage").hide();
		var getLength = jQuery("#search-zip").val().length;
		var getValue = jQuery("#search-zip").val();
		if (getValue !== '' && getLength < 5 && !isNaN(getValue)) {
			jQuery('.search-wrap .noLocationFound').remove();
			jQuery('.search-wrap').children('.time').before('<div class="noLocationFound" style="color: #f00; font-size:11px">Zip code should be 5 digit</div>');
		}else{
		FindInStore.appendData(jQuery("#search-zip").val());
		}
	});
	jQuery("#locationNotFound #upperSubmit1").click(function () {
		jQuery("#errorMessage").hide();
		jQuery("#technicalIssue").hide();
		jQuery("#zipSearchError .noLocationFound").remove();
		var getLength = jQuery("#locationNotFound #search-zip").val().length;
		var getValue = jQuery("#locationNotFound #search-zip").val();
		if (getValue !== '' && getLength < 5 && !isNaN(getValue)) {
			jQuery('#zipSearchError .noLocationFound').remove();
				jQuery('#zipSearchError').append('<div class="noLocationFound" style="color: #f00; font-size:11px">Zip code should be 5 digit</div>').show();
		}else{
		FindInStore.appendData(jQuery("#locationNotFound #search-zip").val());
		}
	});
	jQuery("#errorMessage").on('click', '#upperSubmit', function () {
		jQuery("#technicalIssue").hide();
		var getLength = jQuery("#errorMessage #search-zip").val().length;
		var getValue = jQuery("#errorMessage #search-zip").val();
		if (getValue !== '' && getLength < 5 && !isNaN(getValue)) {
			jQuery('#zipSearchError .noLocationFound').remove();
				jQuery('#zipSearchError').append('<div class="noLocationFound" style="color: #f00; font-size:11px">Zip code should be 5 digit</div>').show();
		}else{
		FindInStore.appendData(jQuery("#errorMessage #search-zip").val());
		}
	});
	//Close icon code//
	jQuery("#closeIcon img").click(function () {
		$("#findStoreDiv").dialog("close");
	});
	// //RAdio button handle codes//
	jQuery("#resultSelector input").change(function () {
		//jQuery("#errorMessage").hide();
		if (document.getElementById('allStores').checked) {
			jQuery("#min-thumb-size-demo table").html("");
			if (jQuery('#chooseOption').val() == "") {
				jQuery("#min-thumb-size-demo").hide();
				jQuery("#errorMessage").html('<span class="errorMsg">Please choose a size and color to see availability at stores near you.</span>');
			}/*else if(jsonAvailStores == null){ 
				jQuery("#min-thumb-size-demo").hide();
				jQuery("#locationNotFound").show();
			}*/
			else if (jsonAvailStores && jsonAvailStores != null) {
				jQuery("#errorMessage").hide();
				jQuery("#min-thumb-size-demo").html('<table width="100%" cellpadding="0" border="0" class="t" style="border-collapse: collapse;" class="t"> </table><div class="prevNextDiv" ><span id="submitChck1"><< Prev </span><span id="submitChck2">| Next >></span></div>');
				for (var a = 0; a < jsonAvailStores.length; a++) {
					var openingTime = FindInStore.currentDateTimeOpening(jsonAvailStores[a].storefront.storefrontCode);
					var closingTime = FindInStore.currentDateTimeClosing(jsonAvailStores[a].storefront.storefrontCode);
					var city = jsonAvailStores[a].storefront.city;
					var cityWoSpace = city.replace(/ /g, "");
					var cityWdash = city.replace(/ /g, "-");
					if (jsonAvailStores[a].availabilityIconDetail == '3.png') {
						jQuery("#min-thumb-size-demo table").append("<tr><td  class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityCheckBg'>Available</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>We have it! Come on by to check out your product!</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsonAvailStores[a].storefront.storeName + "</a><br>" + jsonAvailStores[a].storefront.address1 + "<br>" + jsonAvailStores[a].storefront.city + "," + jsonAvailStores[a].storefront.stateCode + " (<b>" + jsonAvailStores[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsonAvailStores[a].storefront.phoneNumber + "<br><a href='" + jsonAvailStores[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
					} else if (jsonAvailStores[a].availabilityIconDetail == '2.png') {
						jQuery("#min-thumb-size-demo table").append("<tr><td class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityHoldBg'>Limited Availability</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>We only have a few left. Please consider calling this store before heading over.</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsonAvailStores[a].storefront.storeName + "</a><br>" + jsonAvailStores[a].storefront.address1 + "<br>" + jsonAvailStores[a].storefront.city + "," + jsonAvailStores[a].storefront.stateCode + " (<b>" + jsonAvailStores[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsonAvailStores[a].storefront.phoneNumber + "<br><a href='" + jsonAvailStores[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
					} else {
						jQuery("#min-thumb-size-demo table").append("<tr><td class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityCrossBg'>Not In Stock</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>Unfortunately this product is not available at this location.</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsonAvailStores[a].storefront.storeName + "</a><br>" + jsonAvailStores[a].storefront.address1 + "<br>" + jsonAvailStores[a].storefront.city + "," + jsonAvailStores[a].storefront.stateCode + " (<b>" + jsonAvailStores[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsonAvailStores[a].storefront.phoneNumber + "<br><a href='" + jsonAvailStores[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
					}
				}
				if (jQuery('#min-thumb-size-demo tr').length == 0) {
					jQuery("#min-thumb-size-demo").html("");
					
				}else if(jQuery('#min-thumb-size-demo table tr:visible').length < 6 || jQuery('#min-thumb-size-demo table tr').length == 6){
					jQuery(".prevNextDiv").hide();
					FindInStore.showProductInfo();
				}else{
					jQuery(".prevNextDiv").show();
					FindInStore.showProductInfo();
				}
			}
		} else {
			jQuery("#min-thumb-size-demo table").html('');
			if (jQuery('#chooseOption').val() == "") {
				jQuery("#min-thumb-size-demo").hide();
				jQuery("#errorMessage").html('<span class="errorMsg">Please choose a size and color to see availability at stores near you.</span>');
			}/*else if(jsonAvailStores == null){ 
				jQuery("#locationNotFound").show();
			}*/ 
			else if (jsonAvailStores && jsonAvailStores != null) {
				jQuery("#min-thumb-size-demo").html('<table width="100%" cellpadding="0" border="0" class="t" style="border-collapse: collapse;" class="t"> </table><div class="prevNextDiv" ><span id="submitChck1"><< Prev </span><span id="submitChck2">| Next >></span></div>');
				for (var a = 0; a < jsonAvailStores.length; a++) {
					var openingTime = FindInStore.currentDateTimeOpening(jsonAvailStores[a].storefront.storefrontCode);
					var closingTime = FindInStore.currentDateTimeClosing(jsonAvailStores[a].storefront.storefrontCode);
					var city = jsonAvailStores[a].storefront.city;
					var cityWoSpace = city.replace(/ /g, "");
					var cityWdash = city.replace(/ /g, "-");
					if (jsonAvailStores[a].availabilityIconDetail == '3.png') {
						jQuery("#min-thumb-size-demo table").append("<tr><td class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityCheckBg'>Available</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>We have it! Come on by to check out your product!</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsonAvailStores[a].storefront.storeName + "</a><br>" + jsonAvailStores[a].storefront.address1 + "<br>" + jsonAvailStores[a].storefront.city + "," + jsonAvailStores[a].storefront.stateCode + " (<b>" + jsonAvailStores[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsonAvailStores[a].storefront.phoneNumber + "<br><a href='" + jsonAvailStores[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");	
					} else if (jsonAvailStores[a].availabilityIconDetail == '2.png') {
						jQuery("#min-thumb-size-demo table").append("<tr><td class='tabAvailStatus'><span class='kpToolTip avalablityStyle availabilityHoldBg'>Limited Availability</span><div class='toolTip'><div class='tooltipSprite tl'></div><div class='tooltipSprite tr'></div><div class='tooltipSprite bl'></div><div class='tooltipSprite br'></div><div class='tooltipSprite arr'></div><span class='content'>We only have a few left. Please consider calling this store before heading over.</span></div></td><td class='tabStoreDetail'>" + "<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html'  target='_blank' class='placeOfStore'" + ">" + jsonAvailStores[a].storefront.storeName + "</a><br>" + jsonAvailStores[a].storefront.address1 + "<br>" + jsonAvailStores[a].storefront.city + "," + jsonAvailStores[a].storefront.stateCode + " (<b>" + jsonAvailStores[a].storefront.calculatedDistance.toFixed(1) + "</b> miles)</td><td class='tabTimeDetail'>Today's hours:<br>" + FindInStore.getStoreTimes(openingTime,closingTime)+"<a href='http://" + jsonAvailStores[a].storefront.stateCode + "." + cityWoSpace + ".sportsauthority.com/sporting-goods-" + cityWdash + "-" + jsonAvailStores[a].storefront.storefrontCode + ".html' target='_blank'" + ">Store Details</a></td><td class='tabContactDetail'>" + jsonAvailStores[a].storefront.phoneNumber + "<br><a href='" + jsonAvailStores[a].directionsURL + "'target='_blank'>Directions</a></td></tr>");
					}
				}
				if (jQuery('#min-thumb-size-demo tr').length == 0) {
					jQuery("#min-thumb-size-demo").hide();
					jQuery("#errorMessage").html('<span class="sorryText">Sorry, we couldn&#39;t find any stores near you with this product.</span><br><span>Please try a new selection.</span>').show();/*New Changes*/
				}else if(jQuery('#min-thumb-size-demo table tr:visible').length < 6 || jQuery('#min-thumb-size-demo table tr').length == 6){
					jQuery(".prevNextDiv").hide();
					FindInStore.showProductInfo();
				}
				else{
					jQuery(".prevNextDiv").show();
					FindInStore.showProductInfo();
				}
			} 
		}
	});
	jQuery("#errorMessage,.search-wrap,#locationNotFound").on('click', '#search-zip', function () {
		jQuery(this).val("");
	});
	//CODE for tool tip Starts//
	
		//jQuery(this).hover(function() {
		jQuery("#min-thumb-size-demo").on('mouseover', '.kpToolTip', function() {
			var getRowTopOffset = jQuery(this).offset().top;
			var getTableTopOffset = jQuery('#min-thumb-size-demo').offset().top;
			var getTopPos = getRowTopOffset - getTableTopOffset;
			jQuery(this).next('.toolTip').css({
				left : jQuery(this).outerWidth() + 23,
				top : getTopPos -17
			}).show();
		});
		
		jQuery("#min-thumb-size-demo").on('mouseout', '.kpToolTip', function() {
			jQuery(this).next('.toolTip').hide();
		});
	
	
	//CODE for tool tip End//
	//code for change location click starts//
	jQuery('.search-wrap').on('click', '.changeLocation', function () {
		if (jsonAvailStores == 'undefined' || jsonAvailStores == '') {
			jQuery(".search-wrap").html('<p style="margin-bottom: 10px;">Showing Stores Near <strong>' + addressDetailsIP + '</strong></p><a href="javascript:void(0)" class="changeLocation" style="cursor:pointer">Change Location</a><p style="margin-top: 15px; clear: left; display: block; float: left;"><input type="text" value="SEARCH BY CITY, STATE OR ZIP" name="postalCode" class="text lightBoxSearchZip" id="search-zip" onkeypress="return FindInStore.validateSubmitttedZip(event,this)"/><input type="button" value="SUBMIT" class="ispu-search ispu-sprite" id="upperSubmit" tabindex="1"/></p><div class="time productAvailUpdatedTime">Product availability updated HH:MM A.M. EDT</div>');
		} else {
			jQuery(".search-wrap").html('<p style="margin-bottom: 10px;">Showing Stores Near <strong>' + addressDetailsIP + '</strong></p><a href="javascript:void(0)" class="changeLocation" style="cursor:pointer">Change Location</a><p style="margin-top: 15px; clear: left; display: block; float: left;"><input type="text" value="SEARCH BY CITY, STATE OR ZIP" name="postalCode" class="text lightBoxSearchZip" id="search-zip" onkeypress="return FindInStore.validateSubmitttedZip(event,this)"/><input type="button" value="SUBMIT" class="ispu-search ispu-sprite" id="upperSubmit" tabindex="1"/></p><div class="time productAvailUpdatedTime">Product availability updated&nbsp;' + FindInStore.convertTimeInRequiredFormat(jsonAvailStores[0].inventoryUDateDate) + ' EDT</div>');
		}
	});
	//code for change location click Ends//
	jQuery('body').on('keyup', '.lightBoxSearchZip', function (e) {
		jQuery("#zipSearchError").hide();
		var valueChk = jQuery(this).val();
		if (e.keyCode === 13) {
			jQuery(this).next('.ispu-search').trigger('click');
		} else if (e.keyCode === 86) {
			if (valueChk > 5 && !isNaN(valueChk)) {
				var a = valueChk.substr(0, 5);
				jQuery(this).val(a);
			}
		}
	});
	//Code for Enter Submit End//
	//handle search on product page starts//
	jQuery('#search-box').click(function () {
		jQuery(this).val("");
	});
	jQuery('#search-box').blur(function () {
		var getValue = jQuery(this).val();
		if (getValue == '') {
			jQuery('#search-box').val('SEARCH');
		}
	});
	//handle search on product page ends//
	//handle lightbox blur///
	jQuery('body').on('blur','.lightBoxSearchZip',function () {
		var getValue = jQuery(this).val();
		if (getValue == '') {
			jQuery(this).val('SEARCH BY CITY, STATE OR ZIP');
		}
	});
	//handle lightbox blur///
	//Function to block user enter more then 5 numbers in text box starts//
	FindInStore.validateSubmitttedZip = function (event, text) {
		if (/^[0-9]+$/.test(text.value)) {
			if (event.keyCode == 8) {
				return true;
			}
			if (text.value.length > 4) {
				return false;
			}
		}
	}
	jQuery('body').on('focus', '.lightBoxSearchZip', function () {
		jQuery(this).parents('div').find('.noLocationFound').remove();
	});
});