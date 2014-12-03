var popupStatus=0;
var currentWindow;
var map = null;
var geocoder = null;
var defaultLocation = null;
$(document).ready(function(){

	if($('.product-description .product-store').length)
		{
		$('.product-features .product-colors').css("margin-top","60px");
		}
	
});

/*load google maps start*/

function showStoreInGoogleMaps(str_latitude,str_longitude,str_addLine1,str_addLine2,str_cityName,str_stateName,str_zipCode)
{
	 if(typeof google === 'object' && typeof google.maps === 'object'){
		 plotStoresonMap(str_latitude,str_longitude,str_addLine1,str_addLine2,str_cityName,str_stateName,str_zipCode);
	 }else{
		 loadGMapAPIScriptsForPlot(googleKeyForRTIPlot,str_latitude,str_longitude,str_addLine1,str_addLine2,str_cityName,str_stateName,str_zipCode);
	 }
}

/*obsolete function for RTI. This will use global variables.*/
function plotStoresRT(){
	 
	 var windowWidth = $(window).width();
	 if(popupStatus == 0) 
	 { 
	    $("#backgroundPopup").fadeIn(0200); 
	    currentWindow=$(".store-address-capt a").parents('.store-adderss-list').next('div.quick-view-popup');     
	    $(".store-address-capt a").parents('.store-adderss-list').next('div.quick-view-popup').fadeIn(1000);
	    popupStatus = 1;
	    if((windowWidth>=300 && windowWidth<=1024)){
	    $('.product-store-add-cont').getNiceScroll().hide()
	    }
	    
    } 
	 defaultLocation = new google.maps.LatLng(latRTI,longRTI);
	 var myOptions = {
			zoom : 14,
			center : defaultLocation,
			mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("gMapDiv"), myOptions);
	var LatLng = new google.maps.LatLng(latRTI, longRTI);
	var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|E280A2|000000';
	
	var marker = new google.maps.Marker({
		position : LatLng,
		map : map,
		icon : icon
	});
	
	map.setCenter(marker.getPosition());
	
	var index =1;
	var options = {title: 'Ulta Beauty and Salons.',
			   content: '<div style=\"width:200px; height:54px; text-align:left; overflow:hidden; font-size:.7em;\"><b>'+trimSpecialCharacters(addLine2RTI.toString())+'</b><br/>'+trimSpecialCharacters(addLine1RTI.toString())+
			   '<br/>'+cityName+','+stateName+' '+str_zipCode.toString()+'</div>', maxWidth:300};
	marker.set("type", "point");
	marker.set("id", index);
	var infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', function(){
	infoWindow.setOptions(options);
	infoWindow.open(map, marker);
	});
}
/*actual JS function*/
function plotStoresonMap(str_latitude,str_longitude,str_addLine1,str_addLine2,str_cityName,str_stateName,str_zipCode){
	 
	 var windowWidth = $(window).width();
	 if(popupStatus == 0) 
	 { 
	    $("#backgroundPopup").fadeIn(0200); 
	    currentWindow=$(".store-address-capt a").parents('.store-adderss-list').next('div.quick-view-popup');     
	    $(".store-address-capt a").parents('.store-adderss-list').next('div.quick-view-popup').fadeIn(1000);
	    popupStatus = 1; // and set value to 1
	    if((windowWidth>=300 && windowWidth<=1024)){
	    $('.product-store-add-cont').getNiceScroll().hide()
	    }
	    
     } 
	 defaultLocation = new google.maps.LatLng(str_latitude, str_longitude);
	 var myOptions = {
			zoom : 14,
			center : defaultLocation,
			mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("gMapDiv"), myOptions);
	var LatLng = new google.maps.LatLng(str_latitude, str_longitude);
	var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|E280A2|000000';
	
	var marker = new google.maps.Marker({
		position : LatLng,
		map : map,
		icon : icon
	});
	
	map.setCenter(marker.getPosition());
	
	var index =1;
	var options = {title: 'Ulta Beauty and Salons.',
			   content: '<div style=\"width:200px; height:54px; text-align:left; overflow:hidden; font-size:.7em;\"><b>'+trimSpecialCharacters(str_addLine2.toString())+'</b><br/>'+trimSpecialCharacters(str_addLine1.toString())+
			   '<br/>'+str_cityName+','+str_stateName+' '+zipCode.toString()+'</div>', maxWidth:300};
	marker.set("type", "point");
	marker.set("id", index);
	var infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', function(){
	infoWindow.setOptions(options);
	infoWindow.open(map, marker);
	});
}

function closeGoogleMapPopup()
{
	var windowWidth = $(window).width();
	if(popupStatus == 1) 
    { // if value is 1, close popup
	 $("a.close").parent().fadeOut("normal");
     $("#backgroundPopup").fadeOut("normal");  
     popupStatus = 0;  // and set value to 0
	    if((windowWidth>=300 && windowWidth<=1024)){
		    $('.product-store-add-cont').getNiceScroll().show()
		   }
    }
}

function trimSpecialCharacters(stringToTrim){
	return stringToTrim.replace(/[^a-zA-Z0-9&_,\s]/gi,' ');
}

/*load google maps end*/

function checkRealTimeInventory(skuId, site) {

	$.ajax({
		type: "GET",
		url: "/ulta/common/inc/skuRealTimeInventoryCheck.jsp",
		data: "skuId=" + skuId + "&site="+ site + "&salt=" + $.now(),
		success: function(respData,textStatus,jqXHR){
			if(respData=='NO DATA')
			{
				$('.errorMessageDisplay-'+site).html("Sorry, item inventory not available at this time");
				$('.font-wght-'+site).hide();
			}
			else
			{
				$('.font-wght-'+site).html(respData);
				$('.errorMessageDisplay-'+site).hide();
				$('.store-stock-check-'+site).hide();
				$('.font-wght-'+site).show();
			}
		},
	    error: function (jqXHR,textStatus,errorThrown) {
	    }
	});
}

/* Redirect to storelocator page*/

function showStoreLocator(formid,storeid)
{
	var zipval = document.getElementById("zip_sl_"+storeid).value;
	document.getElementById("zip_sl_"+storeid).value = zipval.substr(0,5);
	document.forms[formid].submit();
}

function checkCardBalance(){
	var giftCardVal;
	$.ajax({
	       type: "POST",
	       url: "/ulta/giftcards/giftCard.jsp",
	       data: $("#giftcardBalance").serialize(),
	       dataType: "html", 
	       success: function (respData,textStatus,jqXHR) {
	    	   if(!$(respData).find("#giftcardBalance .errorMessage").length){
	    		   $("#giftcardBalance .errorMessage").remove();
	    		   giftCardVal=$(respData).find(".balance-label span").html();
	           		$(".balance-label span").html("$"+giftCardVal);
				}else{
                        giftCardVal='<p class="errorMessage">'+$(respData).find(".errorMessage").html()+'</p>';
                        if($(respData).find(".errorMessage").length){
							$("#giftcardBalance .errorMessage").remove();
	    			$("#giftcardBalance .card-bal-btn").after(giftCardVal);
                    jQuery(document).trigger("onPageError", [$(respData).find(".errorMessage").html()]);                       
	    		}
	    		$(".balance-label span").html("");
		       } 
	    	   },
		   error: function (jqXHR,textStatus,errorThrown) {
		   }
	   });
}

/* Store Search*/

function submitSearchStoreForSku(){		
    
	var address = document.getElementById('zipCodeForPDPStorelocator').value.trim();
	if (address == "Enter Your Zip Code" || document.getElementById('zipCodeForLeftMenuStorelocator').value.trim() == ""){
		document.getElementById('errorMessageDisplayPDPStorelocator').style.display = "block";
		document.getElementById('errorMessageDisplayPDPStorelocator').innerHTML = ("Please enter a valid zipcode to locate an Ulta store near you");
		$('.product-description  #closest-store-section>div').hide();
		$('.product-store-add-cont').getNiceScroll().resize();
		return;
	}else {		
		if(!containsNumbersForPDPStorelocator(address)){
			document.getElementById('errorMessageDisplayPDPStorelocator').style.display = "block";
			document.getElementById('errorMessageDisplayPDPStorelocator').innerHTML = ("Please enter a valid zipcode to locate an Ulta store near you");
			$('.product-description  #closest-store-section>div').hide();
			$('.product-store-add-cont').getNiceScroll().resize();
			return;
		}
	}
	  /*code to do an AJAX look up*/
	  var xmlHttp = new XMLHttpRequest();
	  xmlHttp.onreadystatechange=function()
	  {
	    if(xmlHttp.readyState==4 && xmlHttp.status==200){
	      document.getElementById("latlong").value=xmlHttp.responseText;
	      var cachedLatLong = document.getElementById("latlong").value.trim();
	      if(cachedLatLong==""){
	    	  loadGMapAPIScriptsForStore(googleKeyForPDP);
	      }else if(cachedLatLong.indexOf(":") > -1){
	    	var latLongArray = cachedLatLong.split(":");
	    	var lattitude = latLongArray[0];
	    	var longitude = latLongArray[1];
	    	document.getElementById("lat_pdp_storelocator").value = lattitude;
	    	document.getElementById("lng_pdp_storelocator").value = longitude;
	    	/*submitting an POST ajax request after lat and long fetched from cache*/
	    	$.ajax({
			       type: "POST",
			       url: "/ulta/browse/inc/productDetail_storeSearchResult.jsp",
			       data: $("#form_pdp_storeSearch").serialize(),
			       dataType: "html", 
			       success: function (respData,textStatus,jqXHR) {
			    	    $('.product-description  #errorMessageDisplayPDPStorelocator').hide();
			    	    $('.product-description  #closest-store-section').show();
			            $("#closest-store-section").html(respData);
			            $('.product-store-add-cont').niceScroll({cursorcolor:"#222D3A",autohidemode:false});
			            $("div.product-catalog-head").siblings().hide();
			            $("div.product-catalog-head a").text("+");
				        $('#closest-store-section div.product-catalog-content').show();
				        $('#closest-store-section div.product-catalog-head>a').text("-");
			       },
				   error: function (jqXHR,textStatus,errorThrown) {
				   }
			   });
	      }
	    }
	  }
	  var zipCode = document.getElementById("zipCodeForPDPStorelocator").value.trim();
	  xmlHttp.open("GET","/ulta/global/inc/callLatLongCache.jsp?zip="+zipCode+"&salt=" + $.now(),true);
	  xmlHttp.send();
}

function loadGMapAPIScriptsForStore(srcKey) {    	
    var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = srcKey+"Store";
 	document.body.appendChild(script);	 	
}
/*plot after load*/
var latRTI  = null;
var longRTI = null;
var addLine1RTI = null;
var addLine2RTI = null;
var cityName = null;
var stateName = null;
var zipCode = null;
/*called on click*/
function loadGMapAPIScriptsForPlot(srcKey,str_latitude,str_longitude,str_addLine1,str_addLine2,str_cityName,str_stateName,str_zipCode) {
	latRTI = str_latitude;
	longRTI = str_longitude;
	addLine1RTI = str_addLine1;
	addLine2RTI = str_addLine2;
	cityName = str_cityName;
	stateName = str_stateName;
	zipCode = str_zipCode;
    var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = srcKey;
 	document.body.appendChild(script);
}


var latitude = null;
var longitude = null;
function onSubmitStore() {		
	
	var geocoder;
	var address = document.getElementById('zipCodeForPDPStorelocator').value.trim();
	
	if (address == "Enter Your Zip Code" || document.getElementById('zipCodeForLeftMenuStorelocator').value.trim() == ""){
		document.getElementById('errorMessageDisplayPDPStorelocator').style.display = "block";
		document.getElementById('errorMessageDisplayPDPStorelocator').innerHTML = ("Please enter a valid zipcode to locate an Ulta store near you");
		$('.product-description  #closest-store-section>div').hide();
		$('.product-store-add-cont').getNiceScroll().resize();
	}

	else {		
		if(!containsNumbersForPDPStorelocator(address)){
			document.getElementById('errorMessageDisplayPDPStorelocator').style.display = "block";
			document.getElementById('errorMessageDisplayPDPStorelocator').innerHTML = ("Please enter a valid zipcode to locate an Ulta store near you");
			$('.product-description  #closest-store-section>div').hide();
			$('.product-store-add-cont').getNiceScroll().resize();
		}
		else{
			getLatLngForZipCodeForPDPStorelocator(address);
		}
	}
}

function getLatLngForZipCodeForPDPStorelocator(address){
		

		var flag = "true" ;

		geocoder = new google.maps.Geocoder();

		geocoder
			.geocode(
					{
						'address' : address
					},
					function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							latitude = results[0].geometry.location
									.lat();
							longitude = results[0].geometry.location
									.lng();
							document.getElementById('lat_pdp_storelocator').value = latitude;
							document.getElementById('lng_pdp_storelocator').value = longitude;
	
							//getting the country for the representative lat,lng
							var address_components_array = results[0].address_components;
							for (j = 0; j < address_components_array.length; ++j) {
								var address_component_types_array = address_components_array[j].types;
								for (k = 0; k < address_component_types_array.length; ++k) {
									
									//find country
									if (address_component_types_array[k] == "country") {
	
										if(address_components_array[j].long_name !="United States" ){
											flag = "false";
										}
										break;
									}
								}
							}
							
						
							if( flag == "false"){
								document.getElementById('errorMessageDisplayPDPStorelocator').style.display = "block";
								document.getElementById('errorMessageDisplayPDPStorelocator').innerHTML = ("Please enter a valid zipcode to locate an Ulta store near you");
								$('.product-description  #closest-store-section>div').hide();
								$('.product-store-add-cont').getNiceScroll().resize();
							}
							else {
								var cityCheck = "progress";
								for (j = 0; j < address_components_array.length; ++j) {
									var address_component_types_array = address_components_array[j].types;
									for (k = 0; k < address_component_types_array.length; ++k) {	
										
										//find State
										if (address_component_types_array[k] == "administrative_area_level_1") {
											//put the state abbreviation in the form
											
											document.getElementById('state_pdp_storelocator').value = address_components_array[j].long_name;
											break;
										
										}
									}
								}
						
								for (j = 0; j < address_components_array.length; ++j) {
									var address_component_types_array = address_components_array[j].types;
									for (k = 0; k < address_component_types_array.length; ++k) {	
										//find city
										if (address_component_types_array[k] == "locality") {
											//put the city name in the form
											if(address_components_array[j].long_name !== document.getElementById('state_pdp_storelocator').value){
											document.getElementById('city_pdp_storelocator').value = address_components_array[j].long_name;
											cityCheck="over";
											break;
											}
										}
										//if no city is found , search for sublocality
										else if (address_component_types_array[k] == "sublocality") {
											//put the city name in the form
											document.getElementById('city_pdp_storelocator').value = address_components_array[j].long_name;
											break;
										}
									}
									if(cityCheck=="over"){
										break;
									}
								}
								$.ajax({
								       type: "POST",
								       url: "/ulta/browse/inc/productDetail_storeSearchResult.jsp",
								       data: $("#form_pdp_storeSearch").serialize(),
								       dataType: "html", 
								       success: function (respData,textStatus,jqXHR) {
								    	    $('.product-description  #errorMessageDisplayPDPStorelocator').hide();
								    	    $('.product-description  #closest-store-section').show();
								            $("#closest-store-section").html(respData);
								            $('.product-store-add-cont').niceScroll({cursorcolor:"#222D3A",autohidemode:false});
								            $("div.product-catalog-head").siblings().hide();
								            $("div.product-catalog-head a").text("+");
									        $('#closest-store-section div.product-catalog-content').show();
									        $('#closest-store-section div.product-catalog-head>a').text("-");
								       },
									   error: function (jqXHR,textStatus,errorThrown) {
									   }
								   });
							}
						} else {
							document.getElementById('errorMessageDisplayPDPStorelocator').style.display = "block";	
							document.getElementById('errorMessageDisplayPDPStorelocator').innerHTML = ("Please enter a valid zipcode to locate an Ulta store near you");

						}
					});
		
	}

	
//this function ensures that the zipCode(string) should have only digits,ie.,no letters,spaces or special characters
function containsNumbersForPDPStorelocator(checkString) {
    var regExp =/^[0-9]$/;
   
    if(checkString.length == 5){
  	for(var i = 0; i < checkString.length; i++)
    { 
 		if (!checkString.charAt(i).match(regExp))
        {
          return false;
        }
     }
  	return true; 
    }
    else{
    	return false;
    }
   
}
 function formZiponfocusForPDPStoreSearch(obj) {
     if(obj.value == 'Zip/Postal Code'){ 
    	 obj.value = "";
    	 }
 }

function formZiponblurForPDPStoreSearch(obj){
	if(obj.value == ""){ 
		obj.value = "Zip/Postal Code";
    	 }
}


function formEnterKeyForPDPStoreSearch (event) {
	var evt = event || window.event;
	var k = evt.keyCode;
	
	if(k == 13)
	{	
		event.preventDefault();
		return false;
	}	
}