naf={};
naf.omni = {};  
//Method used to check the logic for the omniture custom event variable "s.event" in order to properly format the variable string
naf.omni.setCustomEvent = function(eventToAdd){
		if(typeof s.events !="undefined" && s.events.length){
			if(s.events.indexOf(eventToAdd) < 0){
				s.events += "," + eventToAdd;
			}
		}else{
			if(typeof s.events == "undefined" || s.events.indexOf(eventToAdd) < 0){
				s.events = eventToAdd;
			}
		}
};
//takes an <item> and adds it to <listName>. Allow Duplicates tells it add duplicate values or not. By default will not
naf.omni.createList = function(listName,item,delim,allowDuplicates){
	if(typeof allowDuplicates == "undefined"){allowDuplicates=false;}
	if(typeof delim == "undefined"){delim=",";}
	if(typeof s[listName] !="undefined" && s[listName].length){
		if(allowDuplicates){
			s[listName] += delim + item;
		}else{   //( s[listName].indexOf(item) < 0 ){
			s[listName] += delim + item;
		}
	}else{
		if(typeof s[listName]== "undefined" || s[listName].indexOf(item) < 0){
			s[listName]= item;
		}
	}
};

/**
 * Sends a success event
 * @param  {obj} el  the object that was clicked on
 * @param  {string} evt the event
 * @param  {string}  custom link name/text
 * @return {nil}
 */
	naf.omni.sendEvent= function(el,evt,txt){
		var s=s_gi(s_account);
		s.linkTrackVars='prop42,eVar32,channel,events';
		s.prop42 = s.eVar32 = s.pageName;
		s.linkTrackEvents=s.events=evt;
		s.tl(el,'o',txt);
		s.events ="";
	};

// START Internal Campaigns
		naf.omni.trackIntCmp= function(val){
			var s=s_gi(s_account);
			s.linkTrackVars="eVar17";
			s.eVar17=val;
			s.tl(true,"o","Internal Campaign Click");
			return true;
		};

		if($('[data-internal-campaign]').length != null){
			$('[data-internal-campaign]').each(function(i) {
				$(this).click(function() {
					naf.omni.trackIntCmp($(this).attr("data-internal-campaign").toLowerCase());
				});
			});
		}
// END Internal Campaigns

naf.omni.changeLocation= function(oldLoc, newLoc){
	var s=s_gi(s_account);
	s.linkTrackVars="prop18,prop19";
	s.prop18 = oldLoc.toLowerCase();
	s.prop19 = newLoc.toLowerCase();
	s.tl(true,"o","Change Location");
};  

naf.omni.initiateChat= function(){
	var s=s_gi(s_account);
	s.linkTrackVars="events,prop42,prop21,eVar32";
	s.linkTrackEvents="event9";
	s.prop42 = s.eVar32 = s.pageName;
	s.prop21 = "chat initiated";
	s.events="event9";
    s.tl(true,"o", "Chat Initiated");
};
naf.omni.shareContent= function(sku,tool){
	var s=s_gi(s_account);
	s.linkTrackVars="events,eVar26,products,prop42";
	s.linkTrackEvents="event10";
	s.events = "event10";
	s.prop42 = s.pageName;
	s.products=";"+sku;
	s.eVar26=tool.toLowerCase();
  s.tl(this,"o", sku + " was shared via " + tool);
};
naf.omni.shareWishlist= function(tool){
	s.linkTrackVars="events,eVar26,prop42";
	tool=tool.toLowerCase();
	if(tool.indexOf("facebook") > -1){
		s.linkTrackEvents="event14";
		s.events = "event14";
	}else if(tool.indexOf("email") > -1){
		s.linkTrackEvents="event15";
		s.events = "event15";
	}
	s.prop42 = s.pageName;
	s.eVar26=tool;
  	s.tl(this,"o", tool + " was shared from a wishlist");
};

//Add one or more products (separated by a ",")
naf.omni.addToCart = function(sku,isofaF,upgradeF,fabricF){
	var s=s_gi(s_account);
	s.merchEvars="";
	s.linkTrackVars="";
	s.events="";

	if(typeof upgradeF!=="undefined"){
		naf.omni.createList("merchEvars","eVar32=upgrade","|");
		naf.omni.createList("linkTrackVars","eVar32");
		naf.omni.setCustomEvent("event26");
	}

	if(typeof fabricF!=="undefined"){
		naf.omni.createList("merchEvars","eVar32=fabric protection","|");
		naf.omni.createList("linkTrackVars","eVar32");
		naf.omni.setCustomEvent("event29");
	}
	//There is an iSofa product
	if(typeof isofaF!=="undefined"){
		naf.omni.setCustomEvent("scAdd,event41,event47");
		s.stepSKUs = _satellite.getVar("step1Sku") + ":" + _satellite.getVar("step2Sku") + ":" + _satellite.getVar("step3Sku");

		naf.omni.createList("merchEvars","eVar43="+s.stepSKUs,"|");
		naf.omni.createList("merchEvars","eVar47=isofa","|");
		naf.omni.createList("linkTrackVars","eVar43,eVar47");
	}
	//No iSofa products
	if(typeof isofaF==="undefined"){
		s.linkTrackVars="events,products";
		naf.omni.setCustomEvent("scAdd");
		naf.omni.createList("linkTrackVars","events,products");
	}

	s.linkTrackEvents = s.events;
	naf.omni.createList("linkTrackVars","products");
	if(sku.indexOf(";") == -1 ){
		sku = ";"+sku;
	}
	if(s.merchEvars){
		s.products = sku + ";;;;" + s.merchEvars;
	}else{
		s.products = sku;
	}
	s.tl(true,"o","addToCart");
};

naf.omni.trackMatchingPieces= function(sku,cSku1,cSku2,cSku3){

  if (sku.indexOf(";") == -1){    
    sku = ";" + sku; 
  }
	s.products=s.eVar42=sku;
	s.eVar43 = _satellite.getVar("step1Sku") + "," + _satellite.getVar("step2Sku") + "," + _satellite.getVar("step3Sku");
	s.prop44=cSku1;
	s.prop45=cSku2;
	s.prop46=cSku3;
	s.prop42 = s.pageName;
	s.linkTrackEvents=s.events="scAdd,event46,event52,event41,event47";
	s.linkTrackVars="prop42,eVar42,prop44,prop45,prop46,events,eVar43,products";
	desc = "Parent SKU: " + sku + ",Children: " + cSku1 + "|" + cSku2 + "|" + cSku3;
	s.tl(this,"o", desc);
}

//Add one or more products (separated by a ",")
naf.omni.addToWishlist= function(sku,isofa){
	if(typeof isofa!="undefined"){
		s.events=s.linkTrackEvents="event12,event54";
		s.eVar43 = nafData.step1Sku + "," + nafData.step2Sku + "," + nafData.step3Sku;
		s.linkTrackVars="events,products,prop42,eVar43";
	}else{
		s.events=s.linkTrackEvents="event12";
		s.linkTrackVars="events,products,prop42";
	}
	if (sku.indexOf(";") == -1){    
    sku = ";" + sku; 
  }
	s.prop42 = s.pageName;

	s.tl(this,"o", sku + " was added to a wishlist");
};
//Add one or more products (separated by a ",")
naf.omni.addToWishlistMatching= function(sku){
  if (sku.indexOf(";") == -1){    
    sku = ";" + sku; 
  }
	s.eVar42 =s.products = sku;
	s.events=s.linkTrackEvents="event12,event54";
	s.eVar43 = _satellite.getVar("step1Sku") + "," + _satellite.getVar("step2Sku") + "," + _satellite.getVar("step3Sku");
	s.linkTrackVars="events,products,eVar43,eVar42";
	s.prop42 = s.pageName;
	s.tl(this,"o", sku + " was added to a wishlist");
};
//Removes an item from the cart
naf.omni.removeFromCart = function(sku){
  if (sku.indexOf(";") == -1){    
    sku = ";" + sku; 
  }
  s.products = sku;
  s.events = "scRemove";
  s.linkTrackVars="events,products";
  s.linkTrackEvents="scRemove";
  s.tl(this,"o");
};

//Add one or more products (separated by a ",")
naf.omni.wishlistToCart = function(skus){
  if (skus.indexOf(";") == -1 && skus.indexOf(",") == -1 ){    
    skus = ";" + skus; 
  }
	s.products = skus;
	s.events = "scAdd,event16";
	s.linkTrackVars="events,products";
	s.linkTrackEvents="scAdd,event16";
	s.tl(this,"o", "Product moved from wishlist to cart");
};
