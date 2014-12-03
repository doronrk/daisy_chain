define(["jquery","cookie","clientSideStorage"],function(e,r,t){"use strict";var o={cookieSelectedStore:"BOPSPICKUPSTORE",cookieSelectedDictionary:"MISCGCs",zipPreferred:"zipp",zipDefault:"USERPC",latlngDefault:"USERLL",latlngPreferred:"llp",dateAdd:2592e6,KEY_LOCATION:"locations"};var n=function(){if(r.get(o.zipDefault,o.cookieSelectedDictionary)){return r.get(o.zipDefault,o.cookieSelectedDictionary)}else{return""}};var i=function(e){r.setExpires(new Date((new Date).getTime()+o.dateAdd));r.set(o.zipDefault,e,o.cookieSelectedDictionary,{domain:location.host})};var a=function(){var e=L();var r="";if(C(e.preferred)&&e.locations[e.preferred].address){r=e.locations[e.preferred].address.postalCode}else{r=this.getPostalCodeDefault()}return r};var s=function(e){var r=L();r.preferred=e;if(typeof r.locations[r.preferred]==="undefined"){r.locations[r.preferred]={}}if(typeof r.locations[r.preferred].address!=="object"){r.locations[r.preferred].address={}}r.locations[r.preferred].address.postalCode=e;P(r)};function d(){var e=L(),r="";if(C(e.preferred)&&e.locations[e.preferred].address){var t=e.locations[e.preferred].address;if(t.city&&t.city.length>0){r=e.locations[e.preferred].address.city}}return r}function f(e){var r=L();if(typeof r.locations[r.preferred]==="undefined"){r.locations[r.preferred]={}}if(typeof r.locations[r.preferred].address!=="object"){r.locations[r.preferred].address={}}r.locations[r.preferred].address.city=e;P(r)}function l(){var e=L(),r="";if(C(e.preferred)&&e.locations[e.preferred].address){var t=e.locations[e.preferred].address;if(t.state&&t.state.length>0){r=e.locations[e.preferred].address.state}}return r}function c(e){var r=L();if(typeof r.locations[r.preferred]==="undefined"){r.locations[r.preferred]={}}if(typeof r.locations[r.preferred].address!=="object"){r.locations[r.preferred].address={}}r.locations[r.preferred].address.state=e;P(r)}function p(){var e="",t="";if(r.get(o.latlngDefault,o.cookieSelectedDictionary)){var n=r.get(o.latlngDefault,o.cookieSelectedDictionary).split(",");if(n.length>=2){e=n[0];t=n[1]}}return{lat:e,lng:t}}function u(e){r.setExpires(new Date((new Date).getTime()+o.dateAdd));var t=String(e.lat+","+e.lng);r.set(o.latlngDefault,t,o.cookieSelectedDictionary,{domain:location.host})}function g(){var e="",r="";var t=L(),o="";if(C(t.preferred)&&t.locations[t.preferred].lat){e=t.locations[t.preferred].lat;r=t.locations[t.preferred].lng}if(e!==""&&r!==""){return{lat:e,lng:r}}else{return p()}}function v(e){var r=L();if(!r.preferred){r.preferred=e.lat+","+e.lng}if(typeof r.locations[r.preferred]==="undefined"){r.locations[r.preferred]={}}r.locations[r.preferred].lat=e.lat;r.locations[r.preferred].lng=e.lng;P(r)}function S(){return L().preferred}function y(r){var t=L();t.preferred=r;P(t);t=O(r);require(["validation"],function(o){if(o.isValidZipCode(r)&&!e.isEmptyObject(t)){u({lat:t.lat,lng:t.lng});i(r)}})}function L(){return D()?JSON.parse(t.getSession(o.KEY_LOCATION)):{preferred:"",locations:{}}}function D(){var r=t.getSession(o.KEY_LOCATION);return r!==null&&r!==undefined&&r!==""&&!e.isEmptyObject(r)}function P(e){t.setSession(o.KEY_LOCATION,JSON.stringify(e))}function C(e){var r=L();return r&&typeof r.locations[e]!=="undefined"}function O(e){return C(e)?JSON.parse(t.getSession(o.KEY_LOCATION)).locations[e]:{}}function E(e,r){var t=L();t.locations[r]=e;P(t)}function h(e,r){var t=L();if(!t.locations[r]){t.locations[r]={}}t.locations[r].stores=e;P(t)}function k(e){var r=L();return r.locations[e]?r.locations[e].stores||[]:[]}function A(e){var r=false,t=O(e);if(t.lat&&t.lng){r=true}return r}return{device:{},experiment:{},geoIpLocation:{getPostalCode:n,setPostalCode:i,getLatLng:p,setLatLng:u},user:{getPostalCodePreferred:a,setPostalCodePreferred:s,getPostalCodeDefault:n,getCityPreferred:d,setCityPreferred:f,getStatePreferred:l,setStatePreferred:c,getLatLngDefault:p,getLatLngPreferred:g,setLatLngPreferred:v,getPreferred:S,setPreferred:y,hasLocation:C,getLocation:O,setLocation:E,setStores:h,getStores:k,hasLocationWithLatLng:A}}});