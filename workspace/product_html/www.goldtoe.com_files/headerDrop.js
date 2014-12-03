// JavaScript Document

$(document).ready(function() {
	
	$("body *").replaceText('GOLDTOE STORES','GOLD TOE STORES');
	$('.Breadcrumb li').each(function(index) {
			if (index == 0) {
				$(this).hide();
			}
	});		
	
	
    var pathname = window.location.pathname;
	//alert(pathname);

	var str1 = "/PowerSox";	
	var str2 = "/GoldToe";
	var str3 = "/SoleUtion";
	var str4 = "/New-Balance";
	var str5 = "/categories/Clearance-Sock-Sale";
	var currentTab = '';
			
		if(pathname.indexOf(str1) != -1){
			//alert(str1 + " found");
			$('#navPS').addClass('active');	
			$('#PSCatNav').show();
			$('#gtmDrop').hide();
			var currentTab = 'PS';
		}
		
		if(pathname.indexOf(str2) != -1){
			//alert(str2 + " found");
			$('#navGT').addClass('active');	
			$('#GTCatNav').show();
			$('#gtmDrop').hide();
			var currentTab = 'GT';
		}
		
		if(pathname.indexOf(str3) != -1){
			//alert(str2 + " found");
			$('#navSol').addClass('active');	
			$('#SolCatNav').show();
			$('#gtmDrop').hide();
			var currentTab = 'Sol';
		}
		
		if(pathname.indexOf(str4) != -1){
			//alert(str2 + " found");
			$('#navNB').addClass('active');	
			$('#NBCatNav').show();
			$('#gtmDrop').hide();
			var currentTab = 'NB';
		}
				
		if(pathname.indexOf(str5) != -1){
			//alert(str2 + " found");
			$('#navClearance').addClass('active');	
			var currentTab = 'Clearance';
		}
		
		$('.ProductList li').each(function(index) {
			if (index == 3 || index == 7 || index == 11 || index == 15) {
				$(this).addClass('lastItem');
			}
    //alert(index + ': ' + $(this).text());
	
	
  });
		$.tabNameSpace = { 
    myTab : currentTab
}; 





});