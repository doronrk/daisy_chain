
if (location.pathname == "/browse/category.do" || location.pathname == "/browse/categorySearch.do") {
	if (navigationService && navigationService.model.isActive) {

		var defaultDeptFacetnator = {

			displayDeptFacet : false,
			deptFacetId : null,
			
			// Mens categories, hidden dept facet
			menCategoriesHideFacet : $A([
				'1003684',
			'']),	
			// Women Plus categories, hidden dept facet
			wplusCategoriesHideFacet : $A([
			null,
			'']),		
			// Baby Girl categories, hidden dept facet
			bgirlCategoriesHideFacet : $A([
				'37505',
				'51646',
				'37246',
				'23270',
				'41942',
				'6269',
				'73891',
				'64257',
				'51737',
				'37704',
				'54738',
				'74127',
				'88998',
				'88257',
				'60394',
				'91438',
				'65365',
				'93498',
				'94624',
				'54738',
				'95107',
				'96763',
				'96676',
				'96589',
				'96758',
				'94601',
				'96758',
				'97017',
				'96918',
				'60394',
				'92316',
				'48772',
				'97017',
				'94601',
				'92316',
				'97832',
				'97874',
				'98338',
				'98556',
				'98826',
				'99257',
				'99261',
				'99257',
				'99261',
				'1000377',
				'6825',
				'50123',
				'1000747',
				'1000156',
				'54877',
				'37227',
				'98652',
				'37066',
				'1000773',
				'1000775',
				'98188',
				'84036',
				'26785',
				'6297',
				'44500',
				'37243',
				'42311',
				'54054',
				'1000885',
				'1001626',
				'1001787',
				'1001616',
				'1000959',
				'1000959',
				'1002148',
				'1003284',
				'1003665',
				'1003652',
				'1003718',
				'1003643',
				'1004566',
				'1004404',
				'1005148',
				'1004732',
				'1004743',
				'1006094',
				'1005550',
				'1006343',
				'1006341',
				'1005552',
				'1005034',
				'84041',
				'78977',
				'1006001',
				'1005924',
				'93763',
				'51380',
				'92537',
				'1007510',
				'1008951',
				'1008949',
				'1009347',
				'1004112',
				'1008965',
				'1009518',
				'1009519',
				'1009520',
				'1009521',
				'1010414',
				'1010465',
				'1011139',
				'1011141',
				'1011094',
				'1010835', 
				'1010839', 
				'1010840',
				'1010831',
				'1010833',
				'1011753',
				'1011807',
				'1010837',
				'1011558',
				'1011561',
				'1012036',
				'1011523',
				'1007290',
				'1012878',
				'1012880',
				'1012975',
				'1012981',
				'1012983',
				'1015240',
				'1014719',
				'1015335',
				'1015337',
				'97017',
				'96918',
				'1016115',
				'1016778',
				'1016654',
				'1017480',
				'1018161',
				'1018165',
				'1018701',
				'1020618',
				'1020625',
				'1020921',
				'1020919',
				'1021461',
				'1021878',
				'1021464',
				'1021584',
				'1022616',
				'1020625',
				'1022963',
				'1022958',
				'1022089',
				'1022079',
				'1023140',
				'1023054',
				'1022958',
				'1022803',
				'1023251',
				'1002289',
				'95214',
				'1016585',
				'73549',
				'1022781', 
				'85509',
				'62284',
				'1003391',
				'1024203',
				'1007180',
			'']),
			// Baby Boy categories, hidden dept facet
			bboyCategoriesHideFacet : $A([
				'37508',
				'37874',
				'23276',
				'37258',
				'6177',
				'73896',
				'64269',
				'51738',
				'45887',
				'54743',
				'83325',
				'83326',
				'83327',
				'83329',
				'87610',
				'88999',
				'88260',
				'88386',
				'51666',
				'59115',
				'65366',
				'93546',
				'94626',
				'54743',
				'92200',
				'95108',
				'96766',
				'96677',
				'96590',
				'96760',
				'94602',
				'96760',
				'96989',
				'96919',
				'49390',
				'92192',
				'96989',
				'94602',
				'92200',
				'97835',
				'97868',
				'98351',
				'98557',
				'98832',
				'99256',
				'99264',
				'1000378',
				'6157',
				'1000756',
				'37871',
				'1000162',
				'98653',
				'37045',
				'1000774',
				'1000777',
				'98190',
				'83855',
				'54885',
				'26619',
				'34722',
				'40231',
				'13130',
				'1000890',
				'1001625',
				'1001788',
				'1001617',
				'1000960',
				'1000960',
				'1002149',
				'1003323',
				'1003666',
				'1003658',
				'1003733',	
				'1003645',	
				'1004564',
				'1004405',
				'1005149',
				'1004736',
				'1004744',		
				'1006097',
				'1005551',
				'1006345',
				'1006339',
				'1005553',
				'1006528',
				'1006522',
				'1006414',
				'1006529',
				'1006536',
				'1006540',
				'1006413',
				'92522',
				'1007511',
				'1008957',
				'1008948',
				'1004113',
				'1009348',
				'1008971',
				'1009514',
				'1009515',
				'1009516',
				'1009517',
				'1010466',
				'1011140',
				'1011142',
				'1011095',
				'1010832',
				'1010834',
				'1011806',
				'1011808',
				'1010838',
				'1011559',
				'1011560',
				'1012055',
				'1011545',
				'1007300',
				'1012879',
				'1012881',
				'1012978',
				'1012982',
				'1012984',
				'1015241',
				'1014721',
				'1015336',
				'1015338',
				'53699',
				'96919',
				'1016119',
				'1016779',
				'1016656',
				'1017482',
				'1018163',
				'1018166',
				'1018705',
				'1020622',
				'1020624',
				'1020922',
				'1020920',
				'1021462',
				'1021879',
				'1021465',
				'1021580',
				'1022619',
				'1020624',
				'1022972',
				'1022968',
				'1022094',
				'1022080',
				'1023142',
				'1023056',
				'1022968',
				'1022804',
				'1023836',
				'1023260',
				'95215',
				'1011808',
				'73537',
				'1022782',
				'62291',
				'1022212',
				'1024204',
				'1007183',
			'']),


			processCategoryLists : function() {
				var findIterator = function(i){
					return (i == gidLib.getQuerystringParam('cid') ? true : false);
				};
				
				//var deptChannelName = reportingService.controller.viewManagers.commonViewManager.model.commonChannelName;
				
				if (this.menCategoriesHideFacet.find(findIterator)) {
					this.deptFacetId = "75";
				}
				if (this.wplusCategoriesHideFacet.find(findIterator)) {
					this.deptFacetId = "136";
				}			
				if (this.bgirlCategoriesHideFacet.find(findIterator)) {
					this.deptFacetId = "165";
				}
				if (this.bboyCategoriesHideFacet.find(findIterator)) {
					this.deptFacetId = "166";
				}
				
				//if (this.bboyCategoriesShowFacet.find(findIterator)) {
					//this.deptFacetId = "166";
					//this.displayDeptFacet = true;
				//}

			},
			
			modifyDomElements : function() {
				// if the department facet does not exist in the UI, do nothing
				if ($('facet_department')) {
					if (this.displayDeptFacet == false) $('facet_department').hide();
				
					// override reset all button
					var defaultedDeptFacetElement = null;
					var categoryFacetedSearchManager = navigationService.controller.managers.categoryFacetedSearchManager;
					if ($('facet_option_'+this.deptFacetId)) defaultedDeptFacetElement = $('facet_option_'+this.deptFacetId).childElements()[0];
					if (defaultedDeptFacetElement) {
						$('facet_reset_all').onclick  = function(event) {
							categoryFacetedSearchManager.util.resetAllSelectedOptions(event);
							categoryFacetedSearchManager.controller.facetManagers.categoryDepartmentFacetManager.view.facetOptionClicked(defaultedDeptFacetElement,window);
							categoryFacetedSearchManager.controller.filterByFacets();return false;
						};
					}
				}
			},
			
			init: function() {

				this.processCategoryLists();

				// Only proceed if a dept facet preselection has been found in the lists
				if (this.deptFacetId) {
					// Pre Select the appropriate Department Facet
					if (location.hash.length == 0) {
						// location.hash = "#department=" + this.deptFacetId;
						location.replace(location.toString() + "#department=" + this.deptFacetId);
					}
					
					// Perform a redirect with the departmentRedirect parameter if not already redirected
					if (!/departmentRedirect/.test(location)) {
						var currentCID = /cid=\d+/.exec(location);
						location.replace(location.toString().replace(/cid=\d+/,currentCID + "&departmentRedirect=true"));
					}

					
					// Bind dom modification method to the category product grid event
					Event.observe(document,'categoryProductGrid:ready',defaultDeptFacetnator.modifyDomElements.bind(defaultDeptFacetnator));
				}
			}
		};

		defaultDeptFacetnator.init();
	}
}
