/*
if ($('globalnav-search-form')) {
      $('globalnav-search-form').observe( 'submit', function( event ) {
        var sterm = $F('globalnav-search');
        console.log("search term");
        jQuery(window).trigger("SEARCHRESULT",[sterm]);
  
     });
}
*/

/*
if (s.eVar7) {
  s.events = s.apl(s.events, 'event2', ',', 2);
  if (!s.products) {
    s.productNum = s.getProductNum();
    s.products = ';productsearch' + s.productNum;
  }
}
*/


if (typeof jQuery != 'undefined'){

console.log("search lib loaded");
jQuery(window).bind("OMNISEARCH",function( e,sdata ){
    
 console.log("SEARCH ",e,sdata);   
 jQuery(window).trigger("INTSEARCH",[sdata]);
 console.log("search INTSEARCH fired w ",sdata);
    
});


jQuery(window).bind("SEARCHALLCLK",function( e,sdata ){
    console.log("SEARCH ALL CLICK");
}); 

jQuery(window).bind("SEARCHPRODUCTCLK",function( e,sdata ){
    console.log("SEARCH PRODUCT CLICK",sdata);
}); 

}

