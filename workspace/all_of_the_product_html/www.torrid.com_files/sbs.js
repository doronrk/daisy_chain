
$(document).ready(function() {
	//only want to do this if sbs list exists
	if($("#Bysize_profile").length > 0){
	
		$(".filterbyTops").eq(3).css("margin-right","0");
		$(".filterbyTops").eq(7).css("margin-right","0");
		$(".filterbyTops").eq(11).css("margin-right","0");
		$(".filterbyTops").eq(15).css("margin-right","0");
		
		utils.sbsPrepare();
	
		sbs.getSettings();
	
		//attach handlers to all pertinent events
		$("[isFltApply='true']").click(sbs.saveSettingsHandler);
		$("[isfltcancel='true']").click(sbs.refineByCancelHandler);
		$("div[isRBExpandMe='true']").click(sbs.refineByClickHandler);		
	}
});

//shop by size namespace, contains methods geared toward the shop by size drop downs
(function( sbs, $, undefined ) {
	/***** Settings *******/
	sbs.refineByState = { };
	
	sbs.saveSettingsHandler = function(event){
		event.preventDefault();	
		
		sbs.toggleSlide($(this).parents(".sortcontrol").find(".expandme"));
		
		if(!isLoggedIn){
			logInAlert();
		}else{
			var filterSettings = "";
		
			//save state for cancel button later
			$(".sortcontrol ul").each(function(index, ulElem){
				sbs.recordCheckboxState(ulElem);
			});
		
			//collapse open drop downs
			$("div[isRBExpandMe='true'][class*='collapseme']").each(function(index, elem){
				sbs.toggleSlide(elem);
			});
		
			//go through each sbs filter
			$("#topFilter").find('[isRefineBy="true"] ul').each(function(index, refineByElem){
				//grab all check items
				var checkedElems = $(refineByElem).find("li input:checked");
							
				//go through each checked input and add to running settings
				if(checkedElems.length > 0){
					if(filterSettings.length > 0)
						filterSettings += strSeparator;
					
					//add shop by size folder id 
					filterSettings += $(refineByElem).attr('sbsId');
					
					var localSettings = "";
					
					//compile search values
					$(checkedElems).each(function(index, fieldElem){
						localSettings += strSubSeparator + $(fieldElem).attr('searchVal');
					});
					
					//tack local settings onto filter settings
					filterSettings += localSettings;
				}	
			});
			
			$.getJSON(saveSettingsURL, {filterSettings : filterSettings}, processSaveSettings);
		}
	};
	
	function processSaveSettings(data){
		if(!data.loggedIn){
			logInAlert();
		}else{
			successAlert();
		}
	}
	
	sbs.getSettingsHandler = function(event){
		event.preventDefault();	
		
		sbs.getSettings();
	};
	
	sbs.getSettings = function(){
		if(!isLoggedIn){
			logInAlert();
		}else{
			var currentId = "";
		
			//reset current count
			if($("#productList").length > 0){
				product.resetFilter("filter");
			}
			
			$.getJSON(getSettingsURL, processRetrievedSettings);
		}
	};
	
	function processRetrievedSettings(data){ 
		//check each filter the user previously saved
		if(data.settings.length > 0){	
			$.each(data.settings, function(index, settingInfo){
				var filter = $("input[searchFieldId='"+settingInfo.fieldId+"'][searchVal='"+settingInfo.fieldValue+"'][sbsId='"+settingInfo.sbsId+"']");
				
				if(typeof(filter) != "undefined"){
					$(filter).attr('checked', 'checked');		
					product.setFltSelectedTxt($(filter).closest("ul"));
				}
			});
		}
		
		//save saved state
		$(".sortcontrol ul").each(function(index, ulElem){
			sbs.recordCheckboxState(ulElem);
		});
		
		//update product information based off new filters
		if($("#productList").length > 0){
			product.getProducts();		
			product.updateRefineByDropDowns();
		}
	}
	
	sbs.goToSettingsHandler = function(event){
		if(event)
			event.preventDefault();	
		
		if(!isLoggedIn){
			logInAlert();
		}else{
			window.location.replace(accountPreferredURL);
		}
	};
	
	function successAlert(){	
		$("#sbz_confirm").show();
		setTimeout(
			function(){
				$("#sbz_confirm").fadeOut();
			}, 3000);
	}
	
	function logInAlert(){
		$("#sbz_login").show();
	}
	
	sbs.toggleSlide = function(elem){
		$(elem).parent().find("ul").slideToggle(function(){
			//$(elem).append("<div class='sbs_trick'></div>");			
		});						
		$(elem).parent().find("ul").css("z-index","1000000");
		$(elem).css("z-index","0");	
		$(elem).parent().find(".expandme").toggleClass("collapseme");
		var listwidth = $(elem).parent().find("ul").width();
		var applyPos = listwidth - 92 + "px";
		$(elem).parent().find(".sortctrl").css("left","-"+applyPos);
		$(elem).parent().find(".sortctrl").toggle(show);
	}
	
	//handler for refine by drop down expansion
	sbs.refineByClickHandler = function(event){	
		event.preventDefault();
	
		sbs.toggleSlide(this);
		resetSBSFilter = false;
		var byOptions = $(this).next();
		$(byOptions).find("div").click(function(){
			product.setFltSelectedTxt($(this).closest("ul"));						
		});				
	};	
	
	//handler for refine by cancel
	sbs.refineByCancelHandler = function(event){
		event.preventDefault();
		
		//restore state for all drop downs and change out filter text if appropriate
		$(".sortcontrol ul").each(function(index, ulElem){
			sbs.restoreCheckboxState(ulElem);
			product.setFltSelectedTxt(ulElem);
		});
		
		if(resetSBSFilter)
            product.resetFilter("filter");
	
		//collapse open drop downs
		$("div[isRBExpandMe='true'][class*='collapseme']").each(function(index, elem){
			sbs.toggleSlide(elem);
		});		
	};
	
	//record current checkbox state
	sbs.recordCheckboxState = function(ulElem){
		var key = $(ulElem).attr('id');
	
		sbs.refineByState[key] = { };
	
		//record current state of checkboxes
		$(ulElem).find("li input").each(function(index, elem){
			if($(elem).attr('checked') == 'checked')
				sbs.refineByState[key][index] = true;
			else
				sbs.refineByState[key][index] = false;
		});
	};
	
	//restore checkbox state
	sbs.restoreCheckboxState = function(ulElem){
		var key = $(ulElem).attr('id');
		
		//reset state of checkboxes
		if( key in sbs.refineByState){ 
			$(ulElem).find("div input").each(function(index, elem){
				//if previously checked, check again
				if(sbs.refineByState[key][index])
					$(elem).attr('checked', 'checked');
				//otherwise remove checked attribute
				else
					$(elem).removeAttr('checked');
			});
		}
		//no state ever applied, uncheck all checkboxes
		else{
			$(ulElem).find('input:checkbox').removeAttr('checked');			
		}
	};
	/***** End Settings ********/
}( window.sbs = window.sbs || {}, jQuery ));
