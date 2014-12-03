_satellite.pushAsyncScript(function(event, target, $variables){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

if(TagManagerData.SiteID == "Columbia_US"){
	//COL US
	ga('create', 'UA-12100780-1', 'columbia.com');
} else if(TagManagerData.SiteID == "Sorel_US"){
	//SOR US
	ga('create', 'UA-13245541-1', 'sorel.com');
} else if(TagManagerData.SiteID == "MountainHardwear_US"){
	//MHW US
	ga('create', 'UA-16517994-1', 'mountainhardwear.com');
} else if(TagManagerData.SiteID == "Montrail_US"){
	//MTR US
	ga('create', 'UA-20831092-1', 'montrail.com');
} else if(TagManagerData.SiteID == "Sorel_CA"){
	//SOR CA
	ga('create', 'UA-24756451-1', 'sorelfootwear.ca');
} else if(TagManagerData.SiteID == "Columbia_CA"){
	//COL CA
	ga('create', 'UA-13247588-1', 'columbiasportswear.ca');
} else if(TagManagerData.SiteID == "MountainHardwear_CA"){
	//MHW CA
	ga('create', 'UA-33361165-1', 'mountainhardwear.ca');
} else if (window.location.host === "www.columbiasportswear.fr"){
	//COL France
	ga('create', 'UA-13247630-1', 'columbiasportswear.fr');
} else if (window.location.host === "www.columbiasportswear.de"){
	//COL Germany
	ga('create', 'UA-13247644-1', 'columbiasportswear.de');
} else if (window.location.host === "www.columbiasportswear.it"){
	//COL Italy
	ga('create', 'UA-13247658-1', 'columbiasportswear.it');
} else if (window.location.host === "www.columbiasportswear.es"){
	//COL Spain
	ga('create', 'UA-13247674-1', 'columbiasportswear.es');
} else if (window.location.host === "www.columbiasportswear.co.uk"){
	//COL UK
	ga('create', 'UA-13247688-1', 'columbiasportswear.co.uk');
}
ga('require', 'displayfeatures');
ga('send', 'pageview');

if(TagManagerData.PageType == "CHKTThanks"){
	//conversion data
	ga('require', 'ecommerce', 'ecommerce.js');
	ga('ecommerce:addTransaction', {
	  'id': TagManagerData.OrderNumber,
	  'affiliation': TagManagerData.SiteID,
	  'revenue': TagManagerData.OrderGross,
	  'shipping': TagManagerData.OrderShippingCost,
	  'tax': TagManagerData.OrderTaxCost
	});

	for(var i=0; i<TagManagerData.OrderLineItems.length; i++){
		ga('ecommerce:addItem', {
		  'id': TagManagerData.OrderNumber,
		  'name': TagManagerData.OrderLineItems[i].ProductName,
		  'sku': TagManagerData.OrderLineItems[i].ProductID,
		  'category': TagManagerData.OrderLineItems[i].ProductClassCategory,
		  'price': TagManagerData.OrderLineItems[i].ProductUnitPrice,
		  'quantity': TagManagerData.OrderLineItems[i].ProductQty
		});
	}

	ga('ecommerce:send');

}
});
