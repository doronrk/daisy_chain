
				var RRTrackingBean = new Object();
				RRTrackingBean.userSessionId = '5TQJJ2KhKRt0H0MXLC558KGXJGLjw52nJvnXtrthDY7shy6L2D2p!753720804!-1437232398!1417579066949';
				RRTrackingBean.profileId = '2254016535002403';
				
				if(typeof(SCTrackingBean) === 'undefined'){
					SCTrackingBean = new Object();
					console.warn("SCTrackingBean is undefined, some values will n't captured in SC Report!!");
				}
				if(SCTrackingBean.viewSortType || SCTrackingBean.pageIndex){
					SCTrackingBean.viewSortValue = (SCTrackingBean.viewSortType? SCTrackingBean.viewSortType:'') + ":" +
								(SCTrackingBean.pageIndex?SCTrackingBean.pageIndex:'');
				}
				s.currencyCode="USD";
				s.pageName=SCTrackingBean.pageName;
				s.pageType=SCTrackingBean.pageType;
				s.prop1=SCTrackingBean.department;
				s.prop2=SCTrackingBean.category;
				s.prop3=SCTrackingBean.subCategory;
				s.prop4=SCTrackingBean.pageType;
				s.prop5=SCTrackingBean.searchTerm;
				s.prop6=SCTrackingBean.searchResultsCount;
				s.prop7=SCTrackingBean.lowLevelSubCategory;
				s.prop8="";
				s.prop9=SCTrackingBean.siteSections;
				s.prop10=SCTrackingBean.subSections;
				s.prop11=SCTrackingBean.subSectionsLevel2;
				s.prop16=SCTrackingBean.productFindingMethod;
				s.prop17="kohls not logged in|loyalty not logged in";
				s.prop22="2014-12-02";
				s.prop37="";
				s.prop38="";
				s.prop39=SCTrackingBean.refinementTypes;
				s.prop40=SCTrackingBean.refinementTypes;
				s.prop41=SCTrackingBean.refinementValues;
				s.prop42=SCTrackingBean.refinementValues;
				s.prop45="";
				s.prop46="";
				
				s.prop50="D=s_tempsess";
				
				s.prop53=SCTrackingBean.pageName;
				s.events=SCTrackingBean.events;
				s.products=SCTrackingBean.productString;
				s.eVar3=SCTrackingBean.productFindingMethod;
				s.eVar8=SCTrackingBean.searchTerm;
				s.eVar14=SCTrackingBean.numOfGCUsed;
				s.eVar17="kohls not logged in|loyalty not logged in";
				s.eVar18="09:00 PM";
				s.eVar19="Tuesday";
				s.eVar20="Week Day";
				s.eVar22="Kohl's";
				s.eVar23=SCTrackingBean.refinementTypes;
				s.eVar24=SCTrackingBean.refinementValues;
				s.eVar25=SCTrackingBean.department;
				s.eVar26=SCTrackingBean.category;
				s.eVar27=SCTrackingBean.subCategory;
				s.eVar28=SCTrackingBean.lowLevelSubCategory;
				s.eVar29=SCTrackingBean.viewSortValue;
				s.eVar35="";
				s.eVar36="";
				s.eVar39="";
				s.eVar40="ATG";
				s.eVar42="original";
				s.eVar46=SCTrackingBean.billingState;
				s.eVar47=SCTrackingBean.billingZip;
				s.eVar48=SCTrackingBean.orderNumber;
				s.state=SCTrackingBean.billingState;
				s.zip=SCTrackingBean.billingZip;
				s.eVar44="";
				s.eVar45="";
				s.eVar55="";
				s.eVar56="";
				s.eVar59=SCTrackingBean.pageTypeView;
				s.eVar60=SCTrackingBean.orderPromoOfferIds;
				s.eVar61=SCTrackingBean.storeSearchKeyword;
				s.eVar66=SCTrackingBean.searchType;
				s.eVar67=SCTrackingBean.offerId;
				s.eVar68=SCTrackingBean.pageName;
				s.eVar70="2254016535002403";
				s.eVar71="klsbrwcki:2254016535002403";
				s.eVar73="";
				s.eVar75=SCTrackingBean.templateVersion;
				/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
				var s_code=s.t();if(s_code)document.write(s_code);
			
			<!-- End SiteCatalyst code version: H.19.3 -->	
		