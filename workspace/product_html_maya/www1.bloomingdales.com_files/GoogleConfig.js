define(function(){"use strict";var e={};function t(e){if(typeof e==="string"&&e.toLowerCase()==="true"){return true}else{return false}}function n(e){var t=document.getElementById(e);if(t!==null){return t.value}else{return""}}e.googleAccessKey=n("gmeAPIKey");e.tableId=n("gmeTableId");e.googleMapsEngine=n("gmeUrl");e.clientId=n("gmClientId");e.channel="BCOMWEB";e.gmeToSdpEnabled=t(n("gmeToSdpEnabled"));e.googleMapsAPI="//maps.googleapis.com/maps/api/js?"+(e.clientId!=="nokey"?"client="+e.clientId+"&":"")+"sensor=false&v=3.14&channel="+e.channel+"&libraries=places!callback";e.googleGeolocation="https://www.googleapis.com/geolocation/v1/geolocate?key="+e.googleAccessKey;e.maxStoresReturn=75;e.numberOfDecimal=2;e.gmeIntersectsRadius=1609344;e.storeFeatures={Mattress:"Mattress",Furniture:"Furniture",Visitor:"Visitor",Shopper:"Shopper",Restaurant:"Restaurant",Bridal:"Bridal",Design:"Design",Wifi:"Wifi"};return e});