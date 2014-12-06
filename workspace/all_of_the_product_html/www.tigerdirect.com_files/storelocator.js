
(function(){
	 $(document).ready(function (){
		$("#StoreLocatorMapDiv").hide();
		ChangeStore(true);
		$("a.selectStore").click(function(e){		
			e.preventDefault();
			
			var storeData = $(this).closest(".storeData").data()
			if(storeData){
				$("#nearest-store").text(storeData.name);
				setHomeStoreAvailability(storeData.availability);
				$("#storePickupWin1").dialog('close');	
				$("#StoreLocatorMapDiv").hide();
				$("#DivFortStoreList").show();
				
				$("#storeLocatorSelect").text("Select another store");
				$("#StoreInfo").show();
				
				//set cookies
				$.cookie("MyHomeStoreId", storeData.storeid,{expires: 360, path: '/' });
				$.cookie("MyHomeStoreName", storeData.name,{expires: 360, path: '/' });
			}
		});

		$("a.clickStoreMap").click(function(e){
			e.preventDefault();
			
			$("#tStoreMap").find("tr").remove();
			var clon= $(this).closest('tr').clone({deepWithDataAndEvents :true});
			$("#tStoreMap").append(clon);
			var storeData = clon.data();
			$("a.clickStoreMap", clon).parent().remove();
			if(storeData){
				var latlong = storeData.latitude + "," +  storeData.longitude;
				var iframeHtml="<iframe width='100%' height='300' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0'  src='https://maps.google.com/maps?&amp;q="+ encodeURIComponent( latlong ) +"&amp;output=embed&iwloc'></iframe>";
				$("#DivForMapIFrame").empty();
				$("#DivForMapIFrame").append(iframeHtml);
				$("#StoreLocatorMapDiv").show();
				$("#DivFortStoreList").hide();
			}
		});
		$("#btnChangeStore").click(function(){
			ChangeStore(false);
		});
		$("#btnCancel,#storechange").click(function(e){
			e.preventDefault();
			$('#storeSearch').slideToggle();
		});
		$("#backtoSearchHeader,#backtoSearchFooter").click(function(e){
			e.preventDefault();
			ShowStoreList();
		});
	});
		
	var isCanada = function(){
		var domain  = document.location.hostname.split('.');
		
		if(domain && domain.length > 0){
			if(domain[domain.length-1].toLowerCase() === "ca"){
				return true;
			}
		}
		
		return false;
	};
		
	var getStoreMaxDistance = function() {
		if(!isCanada()){
			return 60;
		}
		else{
			return 65;
		}
	};

	function sortAndAppend(lat2, lon2) {
		var storearr = [];
		var nearestStoreCount = 0;
		
		$("#tStoreList tr.storeData").each(function (index, element) {
			var storeData = $(this).data();
			
			if(storeData){
				var distance = getDistanceFromLatLon(storeData.latitude, storeData.longitude, lat2, lon2);
				
				if(isCanada()){
					distance = (Math.round(distance * 160.9344) / 100);
				}
				
				if (distance <= getStoreMaxDistance())
				{
					nearestStoreCount = nearestStoreCount + 1;
				}
				storearr.push([distance, $(this)]);

				if(!isCanada()){
					$(".storeMiles", this).html(distance + " miles");
				}
				else{
					$(".storeMiles", this).html(distance + " km");
				}
			}
		});

		storearr.sort(function (x, y) {
			return x[0] - y[0];
		});

		for (var i = 0, len = storearr.length; i < len; i++) {
			if (storearr[i][0] <= getStoreMaxDistance()){
				storearr[i][1].show();
			}
			else {
				storearr[i][1].hide();
			}
			$("#tStoreList tbody").append(storearr[i][1]);
		}
		$("#Storecountinfo").text(nearestStoreCount);
		$("#StoreDistanceInfo").show();
		storearr = null;
	}
	function ShowStoreList()
	{
		$("#StoreLocatorMapDiv").hide();
		$("#DivFortStoreList").show();
	}
	
	function ChangeStore(isDefault) { 
		if (isDefault) {
			
			var lon2 = null;
		    var lat2 = null;
			
			var geoLocationAvailable=false;
			
			$.ajax({
				  url: 'http://www.telize.com/geoip?callback=?',
				  dataType: 'json'
				}).done(function(data) {
					geoLocationAvailable=true;
						lon2=data.longitude;
						lat2=data.latitude;
						var city =data.city ;
						var region = data.region_code; //2 letter region code, Florida=> FL 
						$("#Storeloopuparea").text(city + ', ' + region);
						sortAndAppend(lat2,lon2);
				 }).always(function(){			
						//set default
						if (!$.cookie("MyHomeStoreName"))
						{
							var storeData = $("#tStoreList tr.storeData:first").data();
							if(geoLocationAvailable && storeData){
								var distance = getDistanceFromLatLon(storeData.latitude, storeData.longitude, lat2,lon2);
							
								if(storeData && distance <= getStoreMaxDistance()){
									$("#nearest-store").text(storeData.name);
									setHomeStoreAvailability(storeData.availability);
									//set to cookies
									$.cookie("MyHomeStoreId", storeData.storeid,{expires: 360, path: '/' });
									$.cookie("MyHomeStoreName", storeData.name,{expires: 360, path: '/' });
								}
								else{
									$("#nearest-store").text("in nearby retail stores");
									setHomeStoreAvailability(false);
								}
							}
							else{
								$("#StoreInfo").hide();
								$("#StoreDistanceInfo").hide();
								$('#storeSearch').show();
								$("#storeLocatorSelect").text("Click to select a store");
								$("#nearest-store").text("please select a store");
								setHomeStoreAvailability(false);
							}
						}
						else
						{
							//get from cookies
							$("#nearest-store").text($.cookie("MyHomeStoreName"));
							
							var storeId = $.cookie("MyHomeStoreId");
							
							if(storeId){
								var storeData = $(".storeData[data-storeid=" + storeId + "]").data();
								if(storeData){
									setHomeStoreAvailability(storeData.availability);
									
									if(!geoLocationAvailable){
										sortAndAppend(storeData.latitude, storeData.longitude);
									}
								}
								else{
									setHomeStoreAvailability(false);
								}
							}
							
							if(!geoLocationAvailable){
								$("#StoreDistanceInfo").hide();
								$('#storeSearch').show();
							}
				}});
		} else {
			//google's api call
			geocoder = new google.maps.Geocoder();
			var state = $('#state').val() || "";
			var address = $("#iZip").val();
			if (address == "" && $('#iCity').val())
				address = $('#iCity').val() + (state.indexOf("-- Select") === 0? "": ", " + state) ;
			if (address == ""){
				alert("Please enter the search criteria");
				$("#iZip:visible").focus();
				return;
			}
			
			geocoder.geocode({
				'address': address
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var location = results[0].geometry.location;
					var lat2 = location.lat();
					var lon2 = location.lng();
				    sortAndAppend(lat2,lon2 );
				    $("#Storeloopuparea").text(address);
				    $('#storeSearch').slideToggle();
				}
				else
				{
					alert("Invalid search criteria");
					$("#iZip").val("");
					$("#iCity").val("");
					$("#state").val("");
					$("#iZip:visible").focus();
				}
			});
			
		}
		$("#StoreLocatorMapDiv").hide();
		$("#DivFortStoreList").show();

	}

	

	function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
		var R = 3963.1676; // Radius of the earth 
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance 
		return d.toFixed(2);
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180)
	}
})();
