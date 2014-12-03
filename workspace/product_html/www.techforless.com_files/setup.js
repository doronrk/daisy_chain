if (typeof mybuys.setupJsRun == "undefined")
{
	mybuys.setupJsRun = true;
	mybuys.base_initPage = mybuys.initPage;
	mybuys.initPage = function()
	{
		if((this.params["pt"]) && (this.params["pt"].indexOf("purchase") != -1))
		{
			if(this.params['email'])
			{
				var testemail = Math.max(this.params['email'].toUpperCase().indexOf("@ELEMENT-TECHNOLOGY.COM")
				                        ,this.params['email'].toUpperCase().indexOf("@SDALLC.COM"));
				if(testemail<0)
				{
					this.base_initPage();
				}
			}
			else
			{
				this.base_initPage();
			}
		}
		else
		{
			this.base_initPage();
		}
	}
}
mybuys.setClient("TECHFORLESS");

mybuys.enableZones();

mybuys.setFailOverMsecs(5000);
