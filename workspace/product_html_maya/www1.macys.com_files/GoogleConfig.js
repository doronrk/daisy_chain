define(function(){"use strict";var e={};function t(e){if(typeof e==="string"&&e.toLowerCase()==="true"){return true}else{return false}}function s(e){var t=document.getElementById(e);if(t!==null){return t.value}else{return""}}e.googleAccessKey=s("gmeAPIKey");e.tableId=s("gmeTableId");e.googleMapsEngine=s("gmeUrl");e.clientId=s("gmClientId");e.channel="MCOMWEB";e.gmeToSdpEnabled=t(s("gmeToSdpEnabled"));e.googleMapsAPI="//maps.googleapis.com/maps/api/js?"+(e.clientId!=="nokey"?"client="+e.clientId+"&":"")+"sensor=false&v=3.14&channel="+e.channel+"&libraries=places!callback";e.googleGeolocation="https://www.googleapis.com/geolocation/v1/geolocate?key="+e.googleAccessKey;e.maxStoresReturn=10;e.numberOfDecimal=2;e.gmeIntersectsRadius=1609344;if(e.gmeToSdpEnabled){e.storeFeatures={MATTRESS:"Mattresses",FURNITURE_GALLERY:"Furniture Gallery",VISITOR_CENTER:"Visitor Services",PERSONAL_SHOPPER:"Personal Shopper",RESTAURANT:"Restaurants",BRIDAL:"Wedding & Gift Registry",Design:"Design",Wifi:"Wifi"}}else{e.storeFeatures={Mattress:"Mattress",Furniture:"Furniture",Visitor:"Visitor",Shopper:"Shopper",Restaurant:"Restaurant",Bridal:"Bridal",Design:"Design",Wifi:"Wifi"}}return e});