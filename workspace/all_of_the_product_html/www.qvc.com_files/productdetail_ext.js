document.domain = 'qvc.com';
function changePrices() {}
/* Tune In Reminder */
function displayTuneInSection() {
	if (document.getElementById('divProductTuneIn')){
		$.ajax({
			url: '/webapp/wcs/stores/servlet/TuneInReminderView?storeId='+storeId+ '&catalogId='+catalogId+'&productBrandId='+productBrandId
		}).done(function(html){
			html = html.replace(/&*selectedTimeZone=[A-z|0-9]*/g,'');
			html = html.replace(/\?&/g,'?');
			$( "#divProductTuneIn" ).append( html );
		});
	}
}
$(document).ready(displayTuneInSection);
function createIncludeTag(incType,incDesc,incLoc,incEl){
	incType = incType.toUpperCase();
	incLoc = incLoc.toUpperCase();
	var incCat;
	var incTo = incEl.href.replace(/(%20| )/g, "");
	var incFrom = window.location.href;
	var tbshow = "TB_show('','";
	switch(incType){
		case "VIDEO":
			incCat = incLoc + 'VID';
			break;
		case "PAGE":
			incCat = incLoc + 'PAG';
			break;
		case "PDF":
			incCat = incLoc + 'PDF';
			break;
		case "OVERLAY":
			incCat = incLoc + 'OTH';
			break;
		case "OTHER":
			incCat = incLoc + 'OTH';
			break;
		default:
			incCat = incLoc + 'OTH';
			break;
	}
	if(incTo.indexOf(tbshow) != -1){
		var strStart = (incTo.indexOf(tbshow) + tbshow.length);
		var strEnd = 0;
		if (incTo.indexOf('keepThis=true') != -1) strEnd = incTo.indexOf('keepThis=true');
		else if (incTo.indexOf('height=') < incTo.indexOf('width=')) strEnd = incTo.indexOf('height=');
		else strEnd = incTo.indexOf('width=');
		incTo = incTo.substring(strStart,(strEnd-1));
	}
	var strStart = incFrom.indexOf('.com/') + 4;
	incFrom = incFrom.substring(strStart);	
	cmCreateManualPageviewTag('INCLUDE: ' + ItemNumber + ' - ' + shortDesc + ' > ' + incType + ': ' + incDesc, incCat, incTo, incFrom, 'null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-null-_-WSC');	
}
var pdIngredients = {
	'limit': 105,
	'container':null,
	'content':null,
	'showBtn':null,
	'hideBtn':null,
	init: function(){
		pdIngredients.showBtn = document.getElementById('pdShowIngredients');
		pdIngredients.hideBtn = document.getElementById('pdHideIngredients');
		pdIngredients.container = document.getElementById('pdIngredients');
		pdIngredients.content = document.getElementById('pdIngredientsBody');
		if(null!= pdIngredients.container && null!= pdIngredients.content && null!= pdIngredients.showBtn && null!= pdIngredients.hideBtn){
			if(element.fullHeight(pdIngredients.content) > pdIngredients.limit){
				element.setClass(pdIngredients.content, "short");
				element.setClass(pdIngredients.showBtn, "");
			}
		}
	},
	show:function(){
		element.setClass(pdIngredients.showBtn, "hide");
		element.setClass(pdIngredients.hideBtn, "");
		element.setClass(pdIngredients.content, "long");
	},
	hide: function pdHideIngredients(){
		var scrollBack = element.findY(pdIngredients.container); 
		if (document.documentElement && document.documentElement.scrollTop>scrollBack) window.scroll(0,scrollBack);
		else if(window.scrollY>scrollBack) window.scroll(0,scrollBack);
		element.setClass(pdIngredients.showBtn, "");
		element.setClass(pdIngredients.hideBtn, "hide");
		element.setClass(pdIngredients.content, "short");
	}
}
jQuery(function(){pdIngredients.init();});