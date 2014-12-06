mybuys.setClient("BOSCOVS");

mybuys.enableZones();

mybuys.setFailOverMsecs(5000);

mybuys.base_initPage = mybuys.base_initPage || mybuys.initPage;
mybuys.initPage = function() { 
	if((this.params["pt"]) && (this.params["pt"].indexOf("purchase") != -1)){
		if ((this.params["email"]) && (this.params["email"].toUpperCase().indexOf("@BOSCOVS.COM") != -1)) return;

		this.base_initPage();
	}else{
		this.base_initPage();
	}
}
