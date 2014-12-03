//Outfit Page Banner Updates 
var ClosetRev = location.toString().indexOf('id=76609275'); 

if(ClosetRev >= 0){ 
$('#outfit-images').hide(); 
$('#outfit-views').css('background-color','#FFF'); 
$('#outfit-header a').css('width','918px'); 
$('#outfit-header').css({'background-image':'url("/web_assets/image/20120820/outfit_banner.gif")','width':'918px'}); 
} 

//This JS file is required to hotfix minor UI related issues with lagecy modal styles. 
//After 14-21 days, the reference for this file can be removed from the CHS footer 
$('#modalTrigger269919 td, #modalTrigger269919 tr, #modalTrigger269919 .modalClose').attr('style',''); 
$('#modalTrigger20919 td, #modalTrigger20919 tr, #modalTrigger20919 .modalClose').attr('style',''); 
$('#modalTrigger260919 td, #modalTrigger260919 tr, #modalTrigger260919 .modalClose').attr('style',''); 
$('#modalTrigger26991 td, #modalTrigger26991 tr, #modalTrigger26991 .modalClose').attr('style',''); 