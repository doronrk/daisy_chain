mybuys.setClient("DELIAS");
mybuys.enableZones();

mybuys.setStyle('.mbzoneVertical', 'margin-top', '17px', 'width','140px');
mybuys.setStyle('.mblegendVertical','font-family', 'helvetica, arial, verdana','text-align','center','font-weight','bold', 'height','36px', 'width', 'auto','padding-right','10px','padding-left','10px');
mybuys.setStyle('.mbitemVertical','text-align', 'center','width','110px', 'height', 'auto', 'padding-top', '5px', 'margin-top', '5px');
mybuys.setStyle('.mbimgVertical', 'padding-bottom', '1px', 'margin-bottom', '2px', 'border','none');

mybuys.setStyle('.mbzone', 'margin-top', '10px', 'border','solid 4px #F2F2F2');
mybuys.setStyle('.mblegend','font-family', 'helvetica, arial, verdana','text-align','left','color','#616265','font-size','14px','font-weight','bold','background-color','#FFFFFF');
mybuys.setStyle('.mbitem','width','118px','margin-right','2px','margin-left','1x','padding-right','2px','padding-left','1px', 'height', 'auto');
mybuys.setStyle('.mbnamelink:link','padding','0px','font-family', 'helvetica, arial, verdana','color','#999999','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mbnamelink:visited','font-family', 'helvetica, arial, verdana','color','#999999','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mbnamelink:hover','font-family', 'helvetica, arial, verdana','color','#999999','font-size','10px','font-weight','normal','text-decoration','underline');
mybuys.setStyle('.mbnamerowspan','text-align','left');
mybuys.setStyle('.mbpricerowleft','float','','text-align','');
mybuys.setStyle('.mbpricerowright','float','','text-align','');
mybuys.setStyle('.mbpricelink:link','font-family', 'helvetica, arial, verdana','color','#9C9E9C','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mbpricelink:visited','font-family', 'helvetica, arial, verdana','color','#9C9E9C','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mbpricelink:hover','font-family', 'helvetica, arial, verdana','color','#9C9E9C','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mbpricerowspan','text-align','left');
mybuys.setStyle('.mblistrowleft','float','','text-align','');
mybuys.setStyle('.mblistrowright','float','','text-align','');
mybuys.setStyle('.mblistlink:link','font-family', 'helvetica, arial, verdana','color','#9C9E9C','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mblistlink:visited','font-family', 'helvetica, arial, verdana','color','#9C9E9C','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mblistlink:hover','font-family', 'helvetica, arial, verdana','color','#9C9E9C','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mblistrowspan','text-align','left');
mybuys.setStyle('.mbsalerowleft','float','','text-align','');
mybuys.setStyle('.mbsalerowright','float','','text-align','');
mybuys.setStyle('.mbsalelink:link','font-family', 'helvetica, arial, verdana','color','#CE0000','font-size','10px','font-weight','bold','text-decoration','none');
mybuys.setStyle('.mbsalelink:visited','font-family', 'helvetica, arial, verdana','color','#CE0000','font-size','10px','font-weight','bold','text-decoration','none');
mybuys.setStyle('.mbsalelink:hover','font-family', 'helvetica, arial, verdana','color','#CE0000','font-size','10px','font-weight','bold','text-decoration','none');
mybuys.setStyle('.mbsalerowspan','text-align','left');
mybuys.setStyle('.mbmorerowspan','text-align','left', 'margin-top', '5px');
mybuys.setStyle('.mbmorelink:link','font-family', 'helvetica, arial, verdana','color','#0066CC','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mbmorelink:visited','font-family', 'helvetica, arial, verdana','color','#0066CC','font-size','10px','font-weight','normal','text-decoration','none');
mybuys.setStyle('.mbmorelink:hover','font-family', 'helvetica, arial, verdana','color','#0066CC','font-size','10px','font-weight','normal','text-decoration','underline');

mybuys.setStyleByPageType('SHOPPING_CART','.mbzone', 'margin-top', '0px', 'border','solid 4px #F2F2F2');

mybuys.setStyleByPageType('SEARCH_RESULTS','.mbzone', 'background-color','#FFFFFF');

mybuys.setStyle('#mybuyspagezone2', 'width','145px');
mybuys.setStyle('#mybuyspagezone2 .mbzoneVertical', 'margin-top', '10px', 'width','145px', 'border-left','1px solid #bbbdbf','padding-left','10px','-webkit-margin-top-collapse','separate');
mybuys.setStyle('#mybuyspagezone2 .mblegend', 'padding', '0px');
mybuys.setStyle('#mybuyspagezone2 .mblegendVertical','background-color','transparent');
mybuys.setStyle('#mybuyspagezone2' , 'background-image', 'url("http://w.p.mybuys.com/clients/DELIAS/images/mybuys_sector.gif")','background-position','right top',
'background-repeat','no-repeat','margin-top','17px');


/*mybuys.setStyleByPageType('SEARCH_RESULTS','.mbitem', 'width', '157px','padding-right','0px','padding-left','0px','margin-right','0px','margin-left','0px');
mybuys.setStyleByPageType('SEARCH_RESULTS','.mbnamerowspan','text-align','center');
mybuys.setStyleByPageType('SEARCH_RESULTS','.mbpricerowspan','text-align','center');
mybuys.setStyleByPageType('SEARCH_RESULTS','.mblistrowspan','text-align','center');
mybuys.setStyleByPageType('SEARCH_RESULTS','.mbsalerowspan','text-align','center');
mybuys.setStyleByPageType('SEARCH_RESULTS','.mbmorerowspan','text-align','center', 'margin-top', '5px');
*/

mybuys.setStyle('#mybuyspagezone4 .mbzoneVertical', 'width','128px', 'background-color', '#F1F0F0');
mybuys.setStyleByPageType('SHOPPING_CART', '#mybuyspagezone4 .mbzone', 'width','680px');
mybuys.setStyle('#mybuyspagezone4 .mbitem','width','128px','margin-right','2px','margin-left','1x','padding-right','2px','padding-left','1px', 'height', 'auto');

mybuys.setStyle('#mybuyspagezone4 .mbnamelink:link', 'color','#666666','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbnamelink:visited', 'color','#666666','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbnamelink:hover','color','#666666','font-size','11px','text-align','center');

mybuys.setStyle('#mybuyspagezone4 .mbpricelink:link','color','#666666','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbpricelink:visited','color','#666666','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbpricelink:hover','color','#666666','font-size','11px','text-align','center');

mybuys.setStyle('#mybuyspagezone4 .mblistlink:link','color','#666666','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mblistlink:visited','color','#666666','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mblistlink:hover','color','#666666','font-size','11px','text-align','center');

mybuys.setStyle('#mybuyspagezone4 .mbsalelink:link','color','#CE0000','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbsalelink:visited','color','#CE0000','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbsalelink:hover','color','#CE0000','font-size','11px','text-align','center');

mybuys.setStyle('#mybuyspagezone4 .mbmorelink:link','color','#0066CC','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbmorelink:visited','color','#0066CC','font-size','11px','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbmorelink:hover','color','#0066CC','font-size','11px','text-align','center');

mybuys.setStyle('#mybuyspagezone4 .mbnamerowspan','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbpricerowspan','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mblistrowspan','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbsalerowspan','text-align','center');
mybuys.setStyle('#mybuyspagezone4 .mbmorerowspan','text-align','center');

//mybuys.setStyle('#mybuyspagezone4 .mbimgVertical', 'width','82px', 'height', '112px');
//mybuys.setStyle('#mybuyspagezone4 .mbimg', 'width','82px', 'height', '112px');

mybuys.applyStyles();

mybuys.useOneclkForExistingSignup(true);

mybuys.setFailOverMsecs(5000);