(function () {
  var adManagerType;  
  function AdModel(options) {
    this.apiKey = "f9ec9zdassq2kckn8beeynwd";
    this.networkCode = "6011";
    this.topLevelAdUnit = "BestBuyDesktopWeb";
    this.pId = "";
    this.adUnit = "";
    this.slotName = "";
    this.priceRange = "";
    this.genre = "";
    this.productBrand = "";
    this.uberCatName = "";
    this.parentCatName = "";
    this.catName = "";
    this.templateType = "";
    this.productSku = "";
  };

  AdModel.prototype.method = function() {};

  AdModel.prototype.defineAdUnitPath = function() {
    var categoryName, self, searchTerm, searchTermStart, url, adUnitPath, productSKU;
    self = this;
    categoryName = "";
    searchTerm = "";

    if (track.uberCatName) {
	self.uberCatName = self.cleanseParameterValue(track.uberCatName);
	self.uberCatName = "/" + self.uberCatName;
    }

    if (track.parentCatName) {
	self.parentCatName = self.cleanseParameterValue(track.parentCatName);
	self.parentCatName = "/" + self.parentCatName;
    }

    if (track.catName) {

      if (track.catName === "SiteControl: pcmcat248000050016") {
	self.catName = self.cleanseParameterValue("deal_of_the_day");
      } else {
	self.catName = self.cleanseParameterValue(track.catName);
      }

	self.catName = "/" + self.catName;
    }

    if (track.catId) {
	self.pId = track.catId;
    }

    if (track.templateName === "SRCL") {
      if ($("#searchstate .headlink").length > 0) {
	self.adUnit = self.topLevelAdUnit;
	self.slotName = "/" + self.networkCode + "/" + self.topLevelAdUnit;
	$("#searchstate .headlink").each(function (index, value) {
	 if ($(value).text().trim().indexOf("Best Buy") === -1) {
	   self.adUnit += "/" + self.cleanseParameterValue($(value).text());
	   self.slotName += "/" + self.cleanseParameterValue($(value).text());
	 }
	});

	if ($("#searchstate h1.categoryName").length > 0) {
          self.adUnit += "/" + self.cleanseParameterValue($("#searchstate h1.categoryName").text());
          self.slotName += "/" + self.cleanseParameterValue($("#searchstate h1.categoryName").text());
	}

	self.getFacetInfo();
	self.renderAds(track);
      } else {
	  productSKU = $("strong.sku").first().text();
	  url = "//api.bbyremix.bestbuy.com/v1/products/" + productSKU + ".json" + "?apiKey=" + self.apiKey + "&show=categoryPath";

	  $.ajax({
	    url: url,
	    type: "GET",
	    dataType: "jsonp",
	    data: "",
	    jsonp: "callback",
	    cache: true
	   }).then(function (data) {
	      $.each(data.categoryPath, function (index, value) {
		if (index === 0) {
		  self.adUnit = self.topLevelAdUnit + "/search_results";
		  self.slotName = "/" + self.networkCode + "/" + self.topLevelAdUnit + "/search_results";
		} else {
		  self.adUnit += "/" + self.cleanseParameterValue(value.name);
		  self.slotName += "/" + self.cleanseParameterValue(value.name);

		};
	      });

	if ($("#searchstate h1.categoryName").length > 0) {
          self.adUnit += "/" + self.cleanseParameterValue($("#searchstate h1.categoryName").text());
          self.slotName += "/" + self.cleanseParameterValue($("#searchstate h1.categoryName").text());
	}


	      self.getFacetInfo();
	      self.renderAds(track);
	  });
      }
    } else {
	self.adUnit = self.topLevelAdUnit + self.uberCatName + self.parentCatName + self.catName;
    }


},
  
  AdModel.prototype.cleanseParameterValue = function (value) {
    if (typeof value !== "undefined") {
      return $.trim(value)
	.toLowerCase()
	.replace(/\s/g, '_')
	.replace(/-/g, "")
	.replace(/&/g, "x")
	.replace(/\[/g, "")
	.replace(/\]/g, "")
	.replace(/__/g, "_")
	.replace(/[^a-zA-z0-9\s&-]/g, "")
    }
  };

  AdModel.prototype.renderAdFeedbackControls = function($adContainer) {
    var adWidth, leaderBoardExpectedWidth, bigBoxExpectedWidth, backgroundURL, $adMonitorContainer;
    leaderBoardExpectedWidth = 728;
    bigBoxExpectedWidth = 300;
    adWidth = $adContainer.outerWidth();

    backgroundURL = imgServer + "en_US/images/global/admodel/advertisement_728x90.gif";
    if (typeof imgServer !== "undefined") {
      if (imgServer === "http://espanol.bestbuy.com/enes/sdimages/BestBuy_US/") {
	$adContainer.html('<a href="http://espanol.bestbuy.com/enes/site/null/null/pcmcat218900050012.c?id=pcmcat218900050012"><img src="' + imgServer + 'en_US/images/global/admodel/house_lb_728x90.gif" /></a>');
	$adContainer.css({
	  background: "url(" + imgServer + "en_US/images/global/admodel/advertisement_728x90.gif) 0 50% no-repeat",
	  position: "relative",
	  height: "90px",
	  padding: "10px 0px 0px",
	  margin: "0px auto 10px",
	});

      } else {

	if (adWidth >= leaderBoardExpectedWidth) {
	  $adContainer.css({
	    background: "url(" + imgServer + "en_US/images/global/admodel/advertisement_728x90.gif) 10px 55% no-repeat",
	    position: "relative",
	    height: "90px",
	    padding: "10px 0 10px 10px",
	    margin: "0px auto 10px",
	    "text-align": "center"
	  });

	  $adMonitorContainer = $("#admon-728x90");

	  $adMonitorContainer.css({
	    background: "url(" + imgServer + "en_US/images/global/admonitor/oo_admonitor_ver_icon_CCC.gif) 0 50% no-repeat",
	    width: "8px",
	    height: "81px",
	    position: "absolute",
	    top: "15px",
	    left: "853px",
	    cursor: "pointer"
	  }).show();

	} else if (adWidth >= bigBoxExpectedWidth) {

	  $adMonitorContainer = $("#admon-300x250");


	  $adMonitorContainer.css({
	    background: "url(" + imgServer + "en_US/images/global/admonitor/oo_admonitor_hor_icon_CCC.gif) no-repeat",
	    display: "block",
	    width: "81px",
	    height: "8px",
	    position: "absolute",
	    top: "252px",
	    right: "5px",
	    left: "auto",
	    cursor: "pointer"
	  });

	  $adContainer.css({
	    "position": "relative",
	    "background": "url(" + imgServer + "en_US/images/global/admodel/advertisement_300x250.gif) bottom left no-repeat",
	    "padding-bottom": "15px",
	    "margin-bottom": "10px"
	  });
	}
      }
    }
  };

  AdModel.prototype.method = function() {};

  AdModel.prototype.getCurrentPrice = function () {
     var currPrice,
      priceblock = $('#priceblock')
		      .find('.priceblock, .defaultblock')
		      .filter(':first'), // added defaultblock to support software pdp template.
      price = '';

      if (priceblock.length > 0) {
        var node;
	priceblock = priceblock[0];
	node = $(priceblock).find('.salenum, #salePrcVal');

	if (node.length > 0) {
	    price = node[0].innerHTML;
	    price = /\$\d+[,]?(\d+)?\.\d{2}/ig.exec(price);

	    if (price !== null) {
		price = price[0];
		price = price.replace(/[$,]/ig, "");
	    }

	    if (!isNaN(price)) {
		currPrice = price;
	    }
	}
    }

    return currPrice; 

  };

  AdModel.prototype.getFacetInfo = function() {
    var self = this;

    if (typeof track.facetName !== "undefined" && typeof track.facetValue !== "undefined") {
      switch (track.facetName) {
	case "Brand":
	    self.productBrand = track.facetValue;
	    break;

	case "Price Range":
	    self.priceRange = track.facetValue;
	    break;

	case "Genre":
	    self.genre = track.facetValue.substring(track.facetValue.lastIndexOf(":") + 2);
	    break;
      }
    }  
    
    if (track.parentCatName && track.parentCatName.indexOf("Music") > -1) {
        var li = $("#breadcrumb-list li");
        self.genre = self.cleanseParameterValue($(li[li.length-2]).find("a").text());
    }

  };

  AdModel.prototype.getPriceRange = function(value) {
    //This is an arbitrary assortment of price ranges prescribed by Megan Stevens for use on product detail pages.
    var self, output;
    self = this;
    value = parseFloat(value.replace(/[^0-9\.]/g, ""));

      switch (true) {
		    
	case (value >= 0 && value < 4.99):
	  output = "0-4.99";
	  break;

	case (value >= 5 && value <= 19.99):
	  output = "5-19.99";
	  break;

	case (value >= 20 && value <= 29.99):
	  output = "20-29.99";
	  break;

	case (value >= 30 && value < 50):
	  output = "30-49.99";
	  break;

	case (value >= 50 && value <= 149.99):
	  output = "50-149.99";
	  break;

	case (value >= 150 && value <= 299.99):
	  output = "150-299.99";
	  break;

	case (value >= 300 && value <= 499.99):
	  output = "300-499.99";
	  break;

	case (value >= 500 && value <= 999.99):
	  output = "500-999.99";
	  break;

	case (value > 1000 && value <= 1499.99):
	  output = "1000-1499.99";
	  break;

	case (value >= 1500 && value <= 1999.99):
	  output = "1500-1999.99";
	  break;

	case (value >= 2000 && value <= 2499.99):
	  output = "2000-2499.99";
	  break;

	case (value > 2500 && value <= 2999.99):
	  output = "2500-2999.99"
	  break;

	case (value >= 3000 && value <= 3499.99):
	  output = "3000-3499.99";
	  break;

	case (value >= 3500 && value <= 3999.99):
	  output = "3500-3999.99";
	  break;

	case (value >= 4000 && value <= 5999.99):
	  output = "4000-5999.99";
	  break;

	case (value >= 6000 && value <= 7999.99):
	  output = "6000-7999.99";
	  break;

	case (value >= 8000 && value <= 9999.99):
	  output = "8000-9999.99";
	  break;

	case (value >= 10000 && value <= 50000):
	  output = "10000-50000";
	  break;
      }

      return output;
  };

  AdModel.prototype.renderAds = function(track) {
    var self = this;
    // Boilerplate Google Tag object code
    googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    // Quick! Add a script node to the DOM with ninja speed!
    (function() {

	var gads, useSSL, node;

	gads = document.createElement("script");
	gads.async = true;
	gads.type = "text/javascript";
	useSSL = "https:" == document.location.protocol;
	gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
	node = document.getElementsByTagName("script")[0];
	node.parentNode.insertBefore(gads, node);

    })();
    googletag.cmd.push(function() {

	var leaderboardAdUnit, bigBoxAdUnit, $leaderboardContainer, $bigBoxContainer, price, skuValue;
	$bigBoxContainer = $("#dart-container-300x250");
	$leaderboardContainer = $("#dart-container-728x90");
	$leaderboardContainer.width("748px");

	if (track.templateName !== "GHP" && track.catId.indexOf("ghp") < 0) {
	    if (typeof hideLeaderboard === "undefined") {
		leaderboardAdUnit = googletag.defineSlot(self.slotName, [728, 90], "dart-container-728x90").addService(googletag.pubads()).setTargeting("pos", "top");
	    }
	}

	if (self.templateType === "PDP" && typeof track.isCloud === "undefined") {

	    if ($("#productsummary > h1")) {
		self.productBrand = self.cleanseParameterValue($.trim($("#productsummary > h1")[0].innerHTML.split("-")[0]));
	    }

	    if (track.skuId) {
 		self.productSku = track.skuId.toString();

	    }
	    self.priceRange = self.getPriceRange(self.getCurrentPrice());

	} else if (self.templateType === "PDP" && track.isCloud) {

	    if ($("#schemaorg-brand-name").length) {
		self.productBrand = self.cleanseParameterValue($("#schemaorg-brand-name")
		    .attr("content"));
	    }

	    self.productSku = track.skuId.toString();

	    if ($("#schemaorg-offer-price").length) {
		price = $("#schemaorg-offer-price").attr("content").substring(1);

		self.priceRange = self.getPriceRange(price);
	    }

	}
	if (track.templateName !== "GHP" && track.catId.indexOf("ghp") < 0 && typeof hideLeaderboard === "undefined") {
	    leaderboardAdUnit.renderEnded = function() {
		if (track.templateName !== "GHP" && track.catId.indexOf("ghp") < 0) {
		    if ($leaderboardContainer.css("display") !== "none") {
			$("#hdr-ad").show();
			self.renderAdFeedbackControls($leaderboardContainer);
		    }
		}

	    }
	}

	if (self.templateType !== "List" && self.templateType !== "PDP" && typeof hideBigBox === "undefined") {
	    if ($("#dart-container-300x250").length > 0 && typeof hideBigBox === "undefined") {
		bigBoxAdUnit = googletag.defineSlot(self.slotName, [300, 250], "dart-container-300x250").addService(googletag.pubads());
		bigBoxAdUnit.renderEnded = function() {
		    if ($bigBoxContainer.attr("display") !== "none") {
			self.renderAdFeedbackControls($bigBoxContainer);
		    };
		}
	    }

	}


	// Slot targeting
	self.defineTargetingValues();


	// Attribute-specific targeting
	googletag.pubads()
	    .setTargeting("brand", self.productBrand)
	    .setTargeting("sku", self.productSku)
	    .setTargeting("pricepoint", self.priceRange)
	    .setTargeting("catName", track.catId)
	    .setTargeting("pid", self.pId)
	    .setTargeting("genre", self.genre)
	    .collapseEmptyDivs();

	googletag.pubads().enableSingleRequest();
	googletag.enableServices();

	// Display the ads if they have slots on the page.
	(function() {
	    var leaderboard, bigBox;
	    leaderboard = $("#dart-container-728x90");
	    bigBox = $("#dart-container-300x250");
	    bigBox.css("position", "static");

	    if (self.templateType !== "List" && self.templateType !== "PDP" && bigBox.length > 0 && typeof hideBigBox === "undefined") {
		googletag.display("dart-container-300x250");
	    }

	    if (leaderboard.length) {
		if (track.templateName !== "GHP" && track.catId.indexOf("ghp") < 0 &&  typeof hideLeaderboard === "undefined") {
		    googletag.display("dart-container-728x90");
		}
	    }
	})();

	googletag.pubads();

    });
  };

  AdModel.prototype.defineTargetingValues = function () {
    var self, adUnitPath, adUnitPathArray, indexCount;
      self = this;
      if (!self.adUnit) {
        adUnitPath = self.defineAdUnitPath(track);
      } else {
       adUnitPath = self.adUnit;
      }
      adUnitPathArray = adUnitPath.split("/");
     
      $.each(adUnitPathArray, function(index, value) {
   
	  indexCount = index + 1;
	  indexCount = "s" + indexCount;

	  googletag.pubads().setTargeting(indexCount, value);
      });
  };

  AdModel.prototype.defineSlotName = function() {
    var self = this;
    return "/" + self.networkCode + "/" + self.adUnit;
  };
  AdModel.prototype.init = function(track) {

    var self = this;

    self.templateType = adManagerType;

    // Define ad unit path
    self.defineAdUnitPath();

    // Define slot name
    if (track.templateName !== "SRCL") {
      self.slotName = self.defineSlotName();
    }
    // Get facet info if necessary.
    if (track.templateName !== "SRCL") {
      self.getFacetInfo();
    }

    // Finally, render the ads.
    if (track.templateName !== "SRCL") {
      self.renderAds(track);
    }
  };


  EventManager.once("dio.trackEvent.ready", function () {
    "use strict";
    if (typeof track !== "undefined") {
      switch (track.templateName) {
	case "ABCH":
	case "WABCH":
	case "MBCH":
	case "MBDH":
	case "WMBCH":
	case "ABCA":
	case "WABCA":
	case "ABDH":
	case "PRPH":
	  adManagerType = "Category";
	  window.googletag = null;
	  window.adContent = new AdModel();
	  window.adContent.init(track);
	  return true;
	  break;
	case "SRCM":
	case "SRCL":
	case "SRCH":
	case "ABDL":
	case "MBLH":
	case "MBDL":
	case "ABLA":
	case "ABLH":
	  adManagerType = "List";
	  window.googletag = null;
	  window.adContent = new AdModel();
	  window.adContent.init(track);
	  return true;
	  break;
	case "PDMU":
	case "PDPU":
	case "WPDPMOVIE":
	case "WPDPSOFTWARE":
	case "WPDPGAME":
	case "PDS":
	case "PDB":
	case "PDG":
	case "PDH":
	case "PDMO":
	  adManagerType = "PDP";
	  window.googletag = null;
	  window.adContent = new AdModel();
	  window.adContent.init(track);
	  return true;
	  break;
	case "GHP":
	case "PRPT":
	  window.googletag = null;
	  window.adContent = new AdModel();
	  window.adContent.init(track);
	  return true;
	  break;
      }
  };
});

})();