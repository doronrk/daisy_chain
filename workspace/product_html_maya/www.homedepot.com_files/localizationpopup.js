var loc = THD.Utility.Namespace.createNamespace('THD.Widget.LocalizationModal');
var pipBopisZipCheck = false;

loc.buildLocalizationContainer = function () {
	
	var fbLocalizationContainer = '';
	
	fbLocalizationContainer = '<div id="sfModalContainer" class=""><div id="sfHeader"><h1 class="modal_title">Change Your Local Store</h1></div><div id="sfContents" class="modal_contents"><div id="sfYourStore" class="sfStoreLocal"></div><div class="clear"></div><div id="sf_search_bar"><form id="frmStoreFinder"><fieldset id="fsStoreFinder"><label class="control-label" id="lblFindStore"></label><div id="divStoreFinderBox" class="sf-control-group"><label for="txtStoreFinder" id="lblStoreFinder" class="control-label labelRemove">Enter your ZIP Code -OR- City and State</label><div class="sf-controls"><input type="text" maxlength="60" tabindex="18" id="txtStoreFinder" autocomplete="off"></div></div><div id="divStoreFinderBtn" class="sf-control-group"><div class="sf-controls"><button value="StoreFinder" class="btn btn-orange btn-icon" id="btnStoreFinder"><i class="icon-search"></i></button></div></div></fieldset></form></div><div id="StoreFinderResultSet"><p class="sfSugHeader"></p><div id="sfStoreList"></div></div></div></div><div id="sfFooter"><a id="hlViewStoreFinder" class="b">View Store Finder<i class="icon-carrot-orange"></i></a></div>';
	
	$('#localizationModalContent').html(fbLocalizationContainer);
}

/* loc.militaryTimetoStandard = function (storeHoursJSON){
	
	var times, storeOpen = '', storeClose = '';//, storeHoursSplit = storeHours;
	
	times = storeHoursJSON.split('-');
	
	for (time in times) {
		storeOpen = parseInt(times[0]),
		storeClose = parseInt(times[1]);
		
		if (storeClose > 12) {
			storeClose = storeClose - 12;
		}
		
		storeOpen = storeOpen + ':00am - ';
		storeClose = storeClose + ':00pm';
		
		times[0] = storeOpen;
		times[1] = storeClose;
	}
	
	return times;
} */

//talks to the api to get your json response...
loc.storeAPIRequest = function(userInputAddress, maxRadius, maxResults, callFunction) {

	var ajaxUrl = 'http://'+ window.location.host +'/StoreFinder/findStores',
            responseStatus, parsedData = '', jsonAddressLength = '', userData = '',
	    jsonResponse = new Array(), searchParams =  {};

	searchParams = {
	    "sourceAppId": 'localization',
	    "maxMatches": maxResults,
	    "address": userInputAddress,
	    "radius": maxRadius,
	    "truckRental": false,
	    "keyCutting": false,
	    "toolRental": false,
	    "freeWifi": false,
	    "propane": false,
	    "penskeRental": false
	}

	$.ajax({
	    url: ajaxUrl,
	    data: { 'searchParams': JSON.stringify(searchParams) },
	    dataType: 'jsonp',
	    //beforeSend: $.loadingStart,
	    success: function (json) {
	        //Check response status
	        callFunction(json, userInputAddress);
	    },
	    error: function (error) {

	        loc.printErrorMsgs();
	        console.log('error function error: ' + error);
	        console.log('error function searchParams: ' + searchParams);
	    }
	});

}

loc.getCookieDomain = function () {
	var cookieDomain = '';
		
	cookieDomain = getPopupCurrentCookieDomain();
	
	if (cookieDomain === '.homedepot.com') {
		cookieDomain = 'www.homedepot.com';
		
		return cookieDomain;
	}
	
	cookieDomain = cookieDomain.replace('.','');
	
	return cookieDomain;
}

//getStores and list them to the user
loc.getStores = function(json, userInputAddress) {
	
	var parsedData = '', userLocalStore = '', buttonText = '', cookieDomain = '', userMessage = '', h = 0, storeResultsh = 0, makeMyStore = '', storeHoursList;
		
	cookieDomain = loc.getCookieDomain();
	
	userLocalStoreID = loc.getUserLocalStore();
	
	$.each(json.stores, function(i, item) {
	    if(Number(item.storeID) !== Number(userLocalStoreID)){
			
			h += 1;
			storeResultsh = h;
			buttonClass = 'btn btn-dark';
			buttonText = 'Make this your store';
			storeHoursList = '';
			if(item.storeHours.length !== 0){
				$.each(item.storeHours, function(j, itemHours) {
					storeHoursList += "<span><strong>"+itemHours.day+":</strong> "+itemHours.hours+"</span>";
					storeHoursList += (j<item.storeHours.length-1) ? ", " : "";
					storeHoursList += ((j+1)%2 === 0) ? "<br />" : "";
				});
			}
			makeMyStore = (item.country === 'US' ? '<a href="javascript:void(0);" class="' + buttonClass + '" rel="MakeMyStore" data-storezip="' + item.zipcode + '" data-storeinfo="' + item.storeName + '+' + item.storeID + ' - ' + item.city + ', ' + item.state + '" data-storeid=' + item.storeID + '>' + buttonText + '</a>' : '');
			storeHoursText = '<div class="time">' + storeHoursList + '</span></div></div></div>'
			
			parsedData += '<div class="sfStoreRow"><i class="dwarf-sfOff">' + h + '</i><span class="sfMakeThisMyStore">' + makeMyStore + '</span><div class="vcard sfStoreDetails"><div class="org"><span class="sfStoreName"><a href="http://'+cookieDomain+item.storePageUrl+'">' + item.storeName + ' #' + item.storeID + '</a></span><span class="sfDistance"> (' + parseFloat(item.distance).toFixed(2) + ' mi)</span></div><div class="adr"><span class="street-address">' + item.address + '</span><span class="locality">' + item.city + '</span>, <span class="region">' + item.state + ' </span><span class="postal-code">' + item.zipcode + ' </span><span class="b">| <a class="sfhlViewonmap" href="http://' + cookieDomain + '/StoreFinder/index.jsp?address=' + item.storeID + '">View On Map<i class="icon-carrot-orange"></i></a></span></div><div class="tel"><span class="type b">Phone: </span><span class="value">' + item.phoneNumber + ' </span></div>' + storeHoursText;
		}
	});
	
	$('#StoreFinderResultSet p').text(storeResultsh + ' stores within 50 miles of ' + $.trim(userInputAddress)).removeClass('sfRowsHeader sfSugHeader').addClass('sfRowsHeader'); //sfRowsheader
	$('#sfStoreList').html(parsedData);
	$('#sfStoreList').scrollTop(0);
	
	$("a[rel='MakeMyStore']").click(function(e) {			
		e.preventDefault();		
		var $this = $(this);
		loc.setUserLocalStore($this.attr('data-storeid'), $this.attr('data-storeinfo'), $this.attr('data-storezip'))
	});	
	
	storeFinderURL = 'http://' + cookieDomain + '/StoreFinder/index.jsp?address=' + userInputAddress;
		
	$("#hlViewStoreFinder").attr('href',storeFinderURL);

}

loc.getSuggestions = function(json) {
	
	var parsedData = '', storeFinderURL = '', cookieDomain = '', dataPostalCode = '', dataCityState = '', dataToPass = '';
		
	cookieDomain = loc.getCookieDomain();
	
	if (json.addresses.length !== 0 || json.addresses !== undefined || json.addresses !== null){
		
		parsedData += '<ul id="ulSug">';
		
		$('#StoreFinderResultSet p').removeClass('sfRowsHeader sfSugHeader');
		$('#StoreFinderResultSet p').addClass('sfSugHeader');
		$('#StoreFinderResultSet p').text('Did you mean:')
		//$('#StoreFinderResultSet p').addClass('sfSugHeader');
		
		$.each(json.addresses, function(i, item) {
			parsedData += '<li><a data-citystate="' + item.city + ', ' + item.county + ', ' + item.stateProvince + '"data-postalcode="' + item.postalCode + '">' + item.city + ', ' + item.county + ', ' + item.stateProvince + '</a></li>';
		});
		
		parsedData += '</ul>';
		
		$('#sfStoreList').delegate("#ulSug a", "click", function() {
			dataPostalCode = $(this).attr('data-postalcode');
			dataCityState = $(this).attr('data-citystate');
			
			if (dataCityState === '' || dataCityState === null || dataCityState === undefined) {
				dataToPass = dataPostalCode;
			} else {
				dataToPass = dataCityState;
			}
			
			//populates text field with what the user clicked and runs the printStores function
			$("#txtStoreFinder").val(dataToPass);
			
			loc.storeAPIRequest(dataToPass, '50', '30', loc.printStoreResults);
		});
	} else {
		loc.printErrorMsgs('noStores');
	}
	
	
	
	$('#sfStoreList').html(parsedData);
	
	storeFinderURL = 'http://' + cookieDomain + '/StoreFinder/index.jsp';
	
	$("#hlViewStoreFinder").attr('href',storeFinderURL);
}

//getUserLocalStore get's user store if they are already localized
loc.getUserLocalStore = function(){
	
	var locStoreAddress = '', locStoreAddressSplit = new Array(), locStoreID = '';
	
	locStoreAddress = readCookie('THD_LOCSTORE');
	
	if (locStoreAddress !== null && locStoreAddress !== undefined && locStoreAddress !== '') {
		
		locStoreAddressSplit = locStoreAddress.split('+');
		locStoreID = locStoreAddressSplit[0];
		
		$('#lblStoreFinder').css('display', 'none');
	}
	
	return locStoreID;
}

loc.reloadForPLP = function(){
	var plp = THD.PLP,
		plpLoaded = (typeof plp !== "undefined") ? true : false,
		loadInstore = plp.loadInstore,
		loadInstore = ( THD.Utils.Url.get({url: window.location.href,lookupParm : "browsestoreoption"}) === "1" ) ? true : loadInstore, /*if tab has already been selected, always reload instore tab*/
		targetID = (plpLoaded && loadInstore) ? "my_store" : "all_products",
		redirectTarget = document.getElementById(targetID);
		redirectTarget = (redirectTarget) ? redirectTarget : window.location;

	if(typeof redirectTarget !== "undefined" && plpLoaded){
		if(plp.runAjax && plp.loadInstore){
			THD.PLP.Routing.updateUrl(redirectTarget.href);

		}else{
			window.location.assign(redirectTarget.href);
		}
		plp.loadInstore = false;
	}else{
		/*failed miserably. just reload the page*/
		location.reload();
	}
};

//For Analytics information
loc.setDataCollectors = function(analyticType, userLocalStoreID) {

	_hddata = window.top._hddata||{};

	var msg = "change your local store";
	var sf = "store finder";
	var experienceType = readCookie('THD_USERTYPE');

	_hddata.contentSubCategory = sf + ">" + msg;
	_hddata.contentCategory = sf + ">" + msg;
	_hddata.pageType = "tool";
	_hddata.pageName = sf + ">" + msg;
	_hddata.siteSection = sf;
	_hddata.overlayType="local store";

	if (analyticType === 'notLocal') {
		_hddata.AJAX="changeStore";
	}

	if (analyticType === 'localized') {
		_hddata.localStoreNum = userLocalStoreID;
		_hddata.AJAX="setStore";
	}

	if(window.hddataReady){window.hddataReady();} ishddataReady = true;

}

//getUserLocalStoreId get's user store if they are already localized (think about mkain' this provate)
loc.setUserLocalStore = function(storeID){
	var localizationDomain = '',
	    setStoreURL = '',
	    localizationmodule = 'localizationmodule',
	    plpDiv = document.getElementById("hd_plp"),
	    nrfDiv = document.getElementById("hd_nrf"),
	    pipDiv = document.getElementById("hd-pip"),
	    checkOutDiv = document.getElementById("ShopCartForm"), 
	    storeFinderDiv = document.getElementById("storeFinderAppCntr"),
	    maxResults = '30',
	    maxRadius = '50';
	
	/*cookieDomain = loc.getCookieDomain();*/ /* original code*/
	localizationDomain = window.location.host; /* fix for ION-1423*/

	setStoreURL = "http://" + localizationDomain + "/webapp/wcs/stores/servlet/THDStoreFinderStoreSet?recordId=" + storeID;
	
	if (checkOutDiv) {
		setStoreURL = "http://" + localizationDomain + "/webapp/wcs/stores/servlet/THDStoreFinderStoreSet?recordId=" + storeID + "&storeFinderCartFlow=true";
	} else {
		setStoreURL = "http://" + localizationDomain + "/webapp/wcs/stores/servlet/THDStoreFinderStoreSet?recordId=" + storeID + "&storeFinderCartFlow=false";
	}
	
	loc.storeAPIRequest(storeID, maxRadius, maxResults, loc.printUserLocalStore);
	
	$.ajax({
		url: setStoreURL,
		async:false,
		success: function(){
			cookieManager.initializeMasterCookie();
			$('#myStore').html(getHeaderLocalStore('localization'));
			attachOverlays();
			$.fancybox.close();			
			
			if (checkOutDiv) {
				window.location.assign("http://" + localizationDomain + "/webapp/wcs/stores/servlet/OrderItemDisplay?orderId=*&langId=-1&storeId=10051&catalogId=10053");
			}

			if (plpDiv || nrfDiv) {
				loc.reloadForPLP()
			}
			
			if (pipDiv || storeFinderDiv) {
				location.reload();
			}
		}
	});
}

loc.printErrorMsgs = function (msgType) {
	var userMessage = '',
	    noStoreMessage = '<p id="sfSubHeader">There are no stores found that meet your search criteria.</p>',
	    needMoreInfoMessage = '<p id="sfSubHeader">We\'re sorry we need more information. Please enter a ZIP Code, City AND State, street address or store number to find a store.</p>';
	
	if (msgType === 'noStores') {
		userMessage = noStoreMessage;
	} else {
		userMessage = needMoreInfoMessage;
	}
	
	$('#StoreFinderResultSet p').text('Search Results: No stores found.');
	$('#sfStoreList').html(userMessage)   
}

loc.printStoreResults = function(json, userInputAddress){
	
	var jsonAddress = json.addresses,
	    jsonStores = json.stores;
	
	if (typeof jsonAddress !== 'undefined'){
		
		jsonAddressLength = json.addresses.length;
			
		if (jsonAddressLength === 1) {
			if (typeof jsonStores === 'undefined') {
				loc.printErrorMsgs('noStores');
				
				return;	
			} else {
				loc.getStores(json, userInputAddress);
				
				return;				
			}
		} else if (jsonAddressLength === 0) {
			loc.printErrorMsgs();
			
			return;
		} else if (jsonAddressLength > 1) {
			loc.getSuggestions(json);
			
			return;
		}
	}
	
	if (typeof jsonStores !== 'undefined') {
			
		loc.getStores(json, userInputAddress);
			
		return;
	}
	
	loc.printErrorMsgs('noStores');
			
	return;
}

$('#checkAvailabilityPIP').on("click",function(e){    
	e.preventDefault();
	pipBopisZipCheck = true;
});

loc.printUserLocalStore = function(json, userInputAddress){
		
	var parsedData = '', userStoreAddress = '', i = 0, cookieDomain = '', storeHoursList = '';
		
	cookieDomain = loc.getCookieDomain();
	if(json.stores[0].storeHours.length !== 0){
		$.each(json.stores[0].storeHours, function(i, item) {
			storeHoursList += "<span><strong>"+item.day+":</strong> "+item.hours+"</span>";
			storeHoursList += (i<json.stores[0].storeHours.length-1) ? ", " : "";
			storeHoursList += ((i+1)%2 === 0) ? "<br />" : "";
		});
	}
	
	parsedData = '<i class="dwarf-sfOn"></i><p class="sfYourstoreHeader">Your Store:</p><div class="vcard sfStoreHeaderDetails"><div class="org"><span class="sfStoreName"><a href="http://'+cookieDomain+json.stores[0].storePageUrl+'">' + json.stores[0].storeName + ' #' + json.stores[0].storeID + '</a></span></div><div class="adr"><span class="street-address">' + json.stores[0].address + '</span><span class="locality">' + json.stores[0].city + ', </span><span class="region">' + json.stores[0].state + ' </span><span class="postal-code">' + json.stores[0].zipcode + ' </span><span class="b">| <a class="sfhlViewonmap" href="http://' + cookieDomain + '/StoreFinder/index.jsp?address=' + json.stores[0].storeID + '">View On Map<i class="icon-carrot-orange"></i></a></span></div><div class="tel"><span class="type b">Phone: </span><span class="value">' + json.stores[0].phoneNumber + '</span></div><div class="time">' + storeHoursList + '</div></div>'
	userStoreAddress = json.stores[0].storeID; //json.stores[0].city + ', ' + json.stores[0].state + ' ' + json.stores[0].zipcode;
	
	$('#sfYourStore').html(parsedData);
	
	$("#txtStoreFinder").val(userStoreAddress);
}

loc.search = function (searchText) {
	$('#myStore').find('a').eq(0).trigger('click');
	
	$('#txtStoreFinder').trigger('click').val(searchText);
	$('#btnStoreFinder').trigger('click');
};

loc.startLocalizationProcess = function () {
	
	var userLocalStoreID, userMessage = '', txtFieldMessage = '', storeFinderURL = '', userInputAddress = '', cookieDomain = '', urlProtocol = window.location.protocol,
	    maxResults = 30, maxRadius = '50';
	
	cookieDomain = loc.getCookieDomain();
	
	if (urlProtocol === 'https:') {
		window.location = 'http://' + cookieDomain + '/StoreFinder/index.jsp';
	} else {
	
		//this is so we can run buildLocalizationContainer which builds out the frame of the modal
		$('<div style="display:none;"><div id="localizationModalContent" style="width: 680px; height: 630px; *height: 670px; text-align: left"><div id ="locdcContainer" style="display:none;"></div></div>').appendTo("body");
		
		loc.buildLocalizationContainer();
		
		userLocalStoreID = loc.getUserLocalStore();
		
		if (userLocalStoreID === '') {
			
			loc.setDataCollectors('noLocal', '');
			
			userMessage = '<p id="sfSubHeader">Enter a Zip Code, City and State or store number to find a store location.</p>';
			txtFieldMessage = 'Find a Store:';
			
			$('#sfYourStore').html(userMessage);
			$('#lblFindStore').text(txtFieldMessage);
			
			storeFinderURL = 'http://' + cookieDomain + '/StoreFinder/index.jsp';
			$("#hlViewStoreFinder").attr('href',storeFinderURL);
			
		} else {
			//maxResults = 1;
			
			loc.setDataCollectors('localized', userLocalStoreID);
			loc.storeAPIRequest(userLocalStoreID, maxRadius, maxResults, loc.printUserLocalStore);
			loc.storeAPIRequest(userLocalStoreID, maxRadius, maxResults, loc.getStores);
			txtFieldMessage = 'View Stores Near Another ZIP Code:';
			$('#lblFindStore').text(txtFieldMessage);
			
			storeFinderURL = 'http://' + cookieDomain + '/StoreFinder/index.jsp?address=' + userInputAddress
			$("#hlViewStoreFinder").attr('href',storeFinderURL);
		}
		
		$('#btnStoreFinder').click(function(e) {			
			e.preventDefault();
		    
			userInputAddress = $.trim(document.getElementById("txtStoreFinder").value);
			
			if (userInputAddress !== '') {
				loc.storeAPIRequest(userInputAddress, maxRadius, maxResults, loc.printStoreResults);	
			} else {
				loc.printErrorMsgs();
			}
		});
		
		$('#txtStoreFinder').keypress(function (e) {
			if (e.which == 13) {
				e.preventDefault();
				
				userInputAddress = $.trim(document.getElementById("txtStoreFinder").value);
				
				if (userInputAddress !== '') {
					loc.storeAPIRequest(userInputAddress, maxRadius, maxResults, loc.printStoreResults);	
				} else {
					loc.printErrorMsgs();
				}
			}
		});
		
		$("#divStoreFinderBox").delegate("#txtStoreFinder", "click", function(e){
			e.preventDefault();
		    
			$('#lblStoreFinder').css('display', 'none');
		});
	}
}
