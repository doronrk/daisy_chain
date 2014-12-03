define(["backbone","underscore","store","logger","googleConfig"],function(e,t,s,r,o){var a=0,n=1,l=function(e){var t;if(typeof e=="string"||e instanceof String){t=e.split(",")}else{t=["","",""]}return{operationDate:t[0],openTime:t[1],closeTime:t[2]}};var f=e.Collection.extend({model:s,filters:{},initialize:function(e,t){this.googleUrl=o.googleMapsEngine;if(t&&t.storeId){this.queryType=a;this.storeId=t.storeId}else{this.queryType=n;if(t&&t.lat&&t.lng){this.storeLat=t.lat;this.storeLong=t.lng}if(t&&t.radius&&t.radius>0){this.radius=t.radius*1609.344}else{this.radius=250*1609.344}}if(t&&t.maxStores&&t.maxStores>0){this.maxStores=t.maxStores}else{this.maxStores=o.maxStoresReturn}this.bopsStore="";if(t&&t.bopsStore==true){this.bopsStore="and BopsEligible=1"}else if(t&&t.bopsStore==false){this.bopsStore="and BopsEligible=0"}if(t&&t.fromSDP){this.fromSDP=t.fromSDP}if(t&&t.filters){this.filters=t.filters}if(t&&t.excludeOutlets){this.excludeOutlets="and StoreType<>'OUT'"}},url:function(){var e="&select=",t="&where=",s="";e+="StoreId,LocationNumber,StoreNumber,StoreName,Description"+",AddressLine1,AddressLine2,OperationDate,BopsEligible"+",Mattress,Furniture,Visitor,Shopper,Restaurant,Bridal"+",Day1,Day2,Day3,Day4,Day5,Day6,Day7"+",City,State,Zip,PhoneNumber,geometry";if(this.queryType==a){e+=",0 as distance";t+="StoreId="+this.storeId}else if(this.queryType==n){e+=",ST_DISTANCE(geometry,ST_POINT("+this.storeLong+","+this.storeLat+")) as distance";t+="ST_DISTANCE(geometry,ST_POINT("+this.storeLong+","+this.storeLat+"))<"+this.radius}else{}if(!this.fromSDP){if(this.filters){var r;for(i=0;i<this.filters.length;i++){r=this.filters[i];if(r=="Mattress"){s+="and Mattress=1"}else if(r=="Furniture"){s+="and Furniture=1"}else if(r=="Visitor"){s+="and Visitor=1"}else if(r=="Shopper"){s+="and Shopper=1"}else if(r=="Restaurant"){s+="and Restaurant=1"}else if(r=="Bridal"){s+="and Bridal=1"}else if(r=="Design"){s+="and Design=1"}else if(r=="Wifi"){s+="and Wifi=1"}else if(r=="LocationNumber"){s+="and LocationNumber in("+r+")"}}}if(this.bopsStore!=""){s+=this.bopsStore}if(this.excludeOutlets){s+=this.excludeOutlets}return this.googleUrl+e+t+s+"&orderBy=distance ASC&limit="+this.maxStores}else{return"/api/store/v2/stores/"+this.filters.LocationNumber}},parse:function(e){var r,i=this,a,n,f,u;if(!this.fromSDP){if(e.features){for(r=0;r<e.features.length;r++){a=new s;f=[];u=e.features[r].properties;a.set("storeId",u.StoreId);a.set("locationNumber",u.LocationNumber);a.set("storeNumber",u.StoreNumber);a.set("storeName",u.StoreName);a.set("description",u.Description);a.set("operationDate",u.OperationDate);a.set("bopsEligible",u.BopsEligible);a.set("distance",parseFloat((u.distance/1609.344).toFixed(2)));a.set("location",{lat:e.features[r].geometry.coordinates[1],lng:e.features[r].geometry.coordinates[0]});for(n in o.storeFeatures){if(u[n]==1){f.push(o.storeFeatures[n])}}a.set("features",f);a.set("workingHours",t([u.Day1,u.Day2,u.Day3,u.Day4,u.Day5,u.Day6,u.Day7]).map(l));a.set("address",{address1:u.AddressLine1,address2:u.AddressLine2,city:u.City,state:u.State,zip:u.Zip,phone:u.PhoneNumber});i.add(a)}}}else{if(e.stores.store){for(r=0;r<e.stores.store.length;r++){a=new s;a.set("storeId",e.stores.store[r].id);a.set("locationNumber",e.stores.store[r].locationNumber);a.set("storeName",e.stores.store[r].name);a.set("address",e.stores.store[r].address);a.set("storeNumber",e.stores.store[r].storeNumber);features=[];workingHrs=[];if(e.stores.store[r].features){for(j=0;j<e.stores.store[r].features.feature.length;j++){features[j]=e.stores.store[r].features.feature[j]}}a.set("features",features);i.add(a)}}}return i.models}});return f});