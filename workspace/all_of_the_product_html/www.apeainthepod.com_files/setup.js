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
			var testemail = Math.max(this.params['email'].toUpperCase().indexOf("TRACKING@INTERNATIONALCHECKOUT.COM"),this.params['email'].toUpperCase().indexOf("TESTORDER@DESTINATIONMATERNITY.COM"));
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
mybuys.setClient("APEAINTHEPOD");

mybuys.enableZones();

mybuys.setStyle('.mbzone','width','780px','border','1px solid #C0C0C0','clear','both');
mybuys.setStyle('.mblegend','font-family','Arial','font-size','13px','text-align','left','padding-left','5px','padding-top','5px','background-color','#DEDEDE','color','#000000','font-weight','bold','font-style','italic','height','24px');
mybuys.setStyle('.mbitem','width','120px','float','none','margin-left','auto','margin-right','auto');
mybuys.setStyle('.mbimg','border','1px solid #C0C0C0');
mybuys.setStyle('.mbnamerowspan','width','120px','text-align','left');
mybuys.setStyle('.mblistsalerowspan','text-align','left');
mybuys.setStyle('.mbnamelink:link','font-family','Verdana','font-size','10px');
mybuys.setStyle('.mbnamelink:hover','font-family','Verdana','font-size','10px');
mybuys.setStyle('.mbnamelink:visited','font-family','Verdana','font-size','10px');
mybuys.setStyle('.mbpricelink:link','font-size','10px','font-family','Verdana');
mybuys.setStyle('.mbpricelink:hover','font-size','10px','font-family','Verdana');
mybuys.setStyle('.mbpricelink:visited','font-size','10px','font-family','Verdana');
mybuys.setStyle('.mblistlink:link','font-size','10px','text-decoration','line-through','font-family','Verdana');
mybuys.setStyle('.mblistlink:hover','font-size','10px','text-decoration','line-through','font-family','Verdana');
mybuys.setStyle('.mblistlink:visited','font-size','10px','text-decoration','line-through','font-family','Verdana');
mybuys.setStyle('.mbsalelink:link','font-size','10px','color','#AE2424','font-weight','bold','font-family','Verdana');
mybuys.setStyle('.mbsalelink:hover','font-size','10px','color','#AE2424','font-weight','bold','font-family','Verdana');
mybuys.setStyle('.mbsalelink:visited','font-size','10px','color','#AE2424','font-weight','bold','font-family','Verdana');
mybuys.setStyle('.mbpromo','width','120px','text-align','left','clear','both','color','#AE2424','font-size','10px','font-family','Verdana','font-weight','bold');
mybuys.setStyle('.mbbrandrowspan','text-align','left','margin','3px 0px');
mybuys.setStyle('.mbbrandlink:link','font','bold 10px Verdana');
mybuys.setStyle('.mbbrandlink:hover','font','bold 10px Verdana');
mybuys.setStyle('.mbbrandlink:visited','font','bold 10px Verdana');

mybuys.setStyleByPageType('SEARCH_RESULTS','.mbzone','border','1px solid #C0C0C0','width','500px','clear','both','margin-left','auto','margin-right','auto');
mybuys.setStyleByPageType('PRODUCT_DETAILS','.mbzone','border','1px solid #C0C0C0','width','790px','margin-left','5px','margin-top','5px');
mybuys.setStyleByPageType('SHOPPING_CART','.mbzone','border','1px solid #C0C0C0','width','560px','margin-left','auto','margin-right','auto');
mybuys.setStyleByPageType('ORDER_CONFIRMATION','.mbzone','width','780px','border','1px solid #C0C0C0','width','700px','clear','both','margin-left','auto','margin-right','auto');
mybuys.setStyleByPageType('CATEGORY','.mbzone','width','766px','background-color','#EAEAEA','border','1px solid #C3C3C3','clear','both','margin-left','5px','margin-bottom','15px');
mybuys.setStyleByPageType('CATEGORY','.mblegend','font-family','Arial','font-size','12px','font-weight','bold','color','#589093','text-align','left','padding-left','5px','padding-top','5px');
mybuys.setStyleByPageType('CATEGORY','.mbitem','width','182px','padding-left','5px','padding-right','5px');
mybuys.setStyleByPageType('CATEGORY','.mbimg','border','1px solid #C0C0C0');
mybuys.setStyleByPageType('CATEGORY','.mbnamerowspan','text-align','left','width','180px','height','30px');
mybuys.setStyleByPageType('CATEGORY','.mbnamelink:link','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('CATEGORY','.mbnamelink:visited','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('CATEGORY','.mbnamelink:hover','font-family','Verdana','font-size','10px','text-decoration','underline','color','#363534');
mybuys.setStyleByPageType('CATEGORY','.mblistsalerowspan','text-align','left');
mybuys.setStyleByPageType('CATEGORY','.mbpricelink:link','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('CATEGORY','.mbpricelink:visited','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('CATEGORY','.mbpricelink:hover','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('CATEGORY','.mblistlink:link','font-family','Verdana','font-size','10px','color','#000000','text-decoration','line-through');
mybuys.setStyleByPageType('CATEGORY','.mblistlink:visited','font-family','Verdana','font-size','10px','color','#000000','text-decoration','line-through');
mybuys.setStyleByPageType('CATEGORY','.mblistlink:hover','font-family','Verdana','font-size','10px','color','#000000','text-decoration','line-through');
mybuys.setStyleByPageType('CATEGORY','.mbsalelink:link','font-family','Verdana','font-size','10px','color','#AE2424','font-weight','bold');
mybuys.setStyleByPageType('CATEGORY','.mbsalelink:visited','font-family','Verdana','font-size','10px','color','#AE2424','font-weight','bold');
mybuys.setStyleByPageType('CATEGORY','.mbsalelink:hover','font-family','Verdana','font-size','10px','color','#AE2424','font-weight','bold');
mybuys.setStyleByPageType('CATEGORY','.mbpromo','width','180px','text-align','left','clear','both','color','#AE2424','font-size','10px','font-family','Verdana','font-weight','bold');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbzone','width','766px','background-color','#EAEAEA','border','1px solid #C3C3C3','clear','both','margin-left','5px','margin-bottom','15px');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mblegend','font-family','Arial','font-size','12px','font-weight','bold','color','#589093','text-align','left','padding-left','5px','padding-top','5px');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbitem','width','182px','padding-left','5px','padding-right','5px');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbimg','border','1px solid #C0C0C0');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbnamerowspan','text-align','left','width','180px','height','30px');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbnamelink:link','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbnamelink:visited','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbnamelink:hover','font-family','Verdana','font-size','10px','text-decoration','underline','color','#363534');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mblistsalerowspan','text-align','left');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbpricelink:link','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbpricelink:visited','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbpricelink:hover','font-family','Verdana','font-size','10px','color','#000000');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mblistlink:link','font-family','Verdana','font-size','10px','color','#000000','text-decoration','line-through');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mblistlink:visited','font-family','Verdana','font-size','10px','color','#000000','text-decoration','line-through');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mblistlink:hover','font-family','Verdana','font-size','10px','color','#000000','text-decoration','line-through');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbsalelink:link','font-family','Verdana','font-size','10px','color','#AE2424','font-weight','bold');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbsalelink:visited','font-family','Verdana','font-size','10px','color','#AE2424','font-weight','bold');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbsalelink:hover','font-family','Verdana','font-size','10px','color','#AE2424','font-weight','bold');
mybuys.setStyleByPageType('HIGH_LEVEL_CATEGORY','.mbpromo','width','180px','text-align','left','clear','both','color','#AE2424','font-size','10px','font-family','Verdana','font-weight','bold');

mybuys.useOneclkForExistingSignup(true);
mybuys.applyStyles();
mybuys.setFailOverMsecs(5000);

}