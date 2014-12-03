//THIS SCRIPT WILL UPDATE SALE LINKS ON LOAD 
//USAGE: add class="auto_saleLink" and href="#TRACKING_ID" to sale link 

$(document).ready(function(){ 
var saleLink = $('#menu_sale a').attr('href'); 

$('.auto_saleLink').each(function(){ 
var $saleMain = $(this); 
var saleICID = $saleMain.attr('href').replace('#',''); 
var newLink = saleLink+'&icid='+saleICID; 

$saleMain.attr('href',newLink); 
}); 
}); 