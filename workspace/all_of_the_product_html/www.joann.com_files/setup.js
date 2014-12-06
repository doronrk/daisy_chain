
mybuys.setWebrecRoot("http://t.p.mybuys.com/");
mybuys.setSignupRoot("http://a.p.mybuys.com/");
mybuys.setImgRoot("http://w.p.mybuys.com/");
mybuys.setClient("JOANN");
mybuys.enableZones();
mybuys.setOneclkSignupAsImg("http://w.p.mybuys.com/clients/JOANN/images/JOANN.gif");
mybuys.setOneclkButtonAlt("Get Product Alerts");

mybuys.initPage = (function()
{
	var initPage = mybuys.initPage;
	return function()
	{
	mybuys.params["wrz"] = "";
	mybuys.zoneKeysToZoneDivIds = [];
	mybuys.clearMyBuysContainer();
	
	if((this.params["pt"]) && (this.params["pt"].indexOf("purchase") != -1))
	{
		if(this.params['email'])
		{
			var testemail = Math.max(this.params['email'].toUpperCase().indexOf("@JOANN.COM"),this.params['email'].toUpperCase().indexOf("ASABLAN@LYONSCG.COM"));
			if(testemail<0)
			{
				initPage.apply(mybuys);
			}
		}
		else
		{
			initPage.apply(mybuys);
		}
	}
	else
	{
		initPage.apply(mybuys);
	}
};
})();

mybuys.setPageType = (function()
{
	var setPageType = mybuys.setPageType;
	return function(pageType)
	{
		mybuys.params = [];
		setPageType.apply(mybuys, [ pageType ]);
	};
})();

mybuys.clearMyBuysContainer = function()
{
	var mybuysContainer = document.getElementById("mybuyscontainer");
	if (mybuysContainer && mybuysContainer.firstChild)
	{
		mybuysContainer.removeChild(mybuysContainer.firstChild);
	}
};

mybuys.useOneclkForExistingSignup(true);
mybuys.applyStyles();
mybuys.setFailOverMsecs(5000);
