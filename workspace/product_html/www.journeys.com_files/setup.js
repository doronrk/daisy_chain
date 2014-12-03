mybuys.setClient("JOURNEYS");
mybuys.enableZones();
mybuys.setFailOverMsecs(5000);
mybuys.setOneclkSignupAsImg("http://w.p.mybuys.com/clients/JOURNEYS/images/Journeys_Signup-Button_87x26.gif");
mybuys.setOneclkButtonAlt("product alerts");

mybuys.base_initPage = mybuys.initPage;
mybuys.initPage = function()
{
     if((this.params["pt"]) && (this.params["pt"].indexOf("purchase") != -1))
     {
        if(this.params['email'])
        {
             var testemail = Math.max(this.params['email'].toUpperCase().indexOf("TRACKING@INTERNATIONALCHECKOUT.COM"));
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

mybuys.retrieveProductIds = function(){
	var hrefURL = window.location.href;
	
	var name ="g";
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( hrefURL );

  if( results != null ) {
    if (results[1] == "guys")
    {
    	mybuys.addFilteringAttribute("Gender","M");
    } else if (results[1] == "girls")
    {
    	mybuys.addFilteringAttribute("Gender","F");
    }
  }
  
  name ="ag";
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  regexS = "[\\?&]"+name+"=([^&#]*)";
  regex = new RegExp( regexS );
  results = regex.exec( hrefURL );

  if( results != null ) {
    if (results[1] == "y")
    {
    	mybuys.addFilteringAttribute("Youth Size","Youth");
    } else if (results[1] == "i")
    {
    	mybuys.addFilteringAttribute("Youth Size","Toddler");
    } else if (results[1] == "t")
    {
    	mybuys.addFilteringAttribute("Youth Size","Tween");
    }
  }
	
		var conceptStr = "JY";
	var kidz = hrefURL.indexOf("kidz");
	  if (kidz > -1)
    {
    	conceptStr = "KZ";
    	
  	}
	var shi = hrefURL.indexOf("shi");
	  if (shi > -1)
    {
    	conceptStr = "SH";
    	
  	}
	
mybuys.addFilteringAttribute("Concept",conceptStr);
}

function clickWrapper(mbURL, cpc)
{
	mybuys.track(mbURL);
	launchQuickShop(cpc,'');
}

mybuys.processResponseHTML = function(zoneHtmls)
	{	clearTimeout(this.requestProcId);
		if (!this.renderOK) return;
		var leftoverZones=[]
		for (var zk=0;zk<this.zoneKeysToZoneDivIds.length;zk++)
		{	if (this.zoneKeysToZoneDivIds[zk])
				leftoverZones[zk]=true;
		}
		for (zonekey in zoneHtmls)
		{
			var zoneDivId = this.zoneKeysToZoneDivIds[zonekey];
			if (!zoneDivId) continue;
			var zoneDiv = document.getElementById(zoneDivId);
			if (zoneDiv)
			{
				zoneDiv.innerHTML=zoneHtmls[zonekey];
				leftoverZones[zonekey]=false;
			}
		}
		for (var zk=0;zk<leftoverZones.length;zk++)
		{	if (leftoverZones[zk])
				this.loadFailoverImage(zk);
		}
	
	}

mybuys.addCartItemQtySubtotal = function(id, quantity, subtotal)
	{	this.params["items"]=this.params["items"] || "";

		if (id && id != "")
		{
			id = 'MB_' + id;
			if (this.params["items"] != "" )
			{
				this.params["items"] += ",";
			}
			
			this.params["items"] += '"'+this.embedQuote(id);
			if (quantity && quantity != "")
			{	this.params["items"] += "|" + quantity;
				if (subtotal && subtotal != "")	this.params["items"] += "|" + subtotal;
			}
			this.params["items"] += '"';
		}
	}
