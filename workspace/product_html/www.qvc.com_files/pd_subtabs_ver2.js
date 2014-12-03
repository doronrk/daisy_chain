// JavaScript Document

/*	BEGIN SUBTAB CODE
*	This function will allow sub-tab browsing in More Info icons and will dynamically change link color based on focus.
*	Written by Chris Lepore & Mary Capurso

*	Modified by david franklin
*	Modified by Brad Goldberg
*/

var productTabs = {

changeSubTab:function(totalchartDivs,selection){
		var chartDivs = [];
		var chartTabs = [];
			for (i = 0; i < totalchartDivs; i++){
				chartDivs[i] = 'div' + i;
				chartTabs[i] = 'subtab' + i;
			}
		
			
		var currDiv = 'div' + selection;
		var currTab = 'subtab' + selection;
			document.getElementById(chartTabs[selection]).style.color = '#666666';

		//reset all tabs
		for (i = 0; i < chartDivs.length; i++){
			document.getElementById(chartDivs[i]).style.display = 'none';
			document.getElementById(chartTabs[i]).style.color = '#e97400';
			//document.getElementById(chartTabs[i]).style.border = 'solid 1px #ccc';
		}
		//style the active tab
		var currentDiv = document.getElementById(currDiv);
		currentDiv.style.display = 'block';
		//currentDiv.focus();
		
		document.getElementById(currTab).style.color = '#666666';
		document.getElementById(currTab).style.text = 'text-decoration:none';
		//document.getElementById(currTab).style.border = 'solid 1px #e97400';
		//document.getElementById(currTab).style.borderTop = '#666';
	}
}
/*	END SUBTAB CODE	*/

 

