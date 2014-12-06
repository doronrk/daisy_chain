var monetatePDPPageFix = function  (){
  var prodDetails = jQuery("#product-details"),
      nortonTestCount = 0;
  var monetatePDPOTher = jQuery("#mainContent dl.product-other-tabs")[0];
  var monetatePDPInfo = jQuery("#mainContent dl.product-info-tabs")[0];
  if(monetatePDPOTher && monetatePDPInfo ){
    jQuery(monetatePDPInfo).after(monetatePDPOTher).css({'margin-bottom':'12px'});
  }
  this.testNortonExists = function  (){
    if(nortonTestCount < 5){
      /*console.log("nortonTest",nortonTestCount)*/
      nortonTestCount ++;
      if(info.length >0 && support.length > 0){
        var nortonKicker = info.find("span[name='Kicker Custom 1']");
        if (nortonKicker.length > 0){
          jQuery(nortonKicker[0]).appendTo(jQuery(support[0])).css({'margin-top':'12px'});
        } else {
          setTimeout(this.testNortonExists, 500);
        }
      }
    }
  }
  if (prodDetails.length > 0){
    // pdp sections
    var title = jQuery(prodDetails[0]).find("#product-title");
    var info = jQuery(prodDetails[0]).find("#product-info");
    var support = jQuery(prodDetails[0]).find("#product-support");
    // correct shoprunner logo spacing 
    if(support.length > 0){
      var sr = jQuery(support[0]).find(".srProductDetail");
      if(sr){
        sr.css({'margin': '15px 0 24px 0'});
      }
    }
    // title alteration 
    if(info.length >0 && title.length > 0){
      // create new element
      var titleContainer = document.createElement('div');
      titleContainer.id = "monetate-sub-title-info";
      // find elements to copy to new element
      var ps =jQuery(jQuery(info[0]).find(".product-size")[0]),
          pn = jQuery(jQuery(info[0]).find(".product-number")[0]),
          spd = jQuery(jQuery(info[0]).find("#see-product-details")[0]),
          pb = jQuery(jQuery(title[0]).find(".product-brand")[0]);
      if(ps && pn && spd){
        ps.appendTo(jQuery(titleContainer)).css({'display':'inline-block', 'margin-bottom':'0', 'padding-right': '11px'});
        pn.appendTo(jQuery(titleContainer)).css({'position':'static','text-indent':'none', 'padding-right': '0px'});
        spd.appendTo(jQuery(titleContainer)).css({'position':'static','text-indent':'none', 'padding-right': '11px'});
        pb.appendTo(jQuery(titleContainer)).css({'display':'inline-block'}).find('a').css({'color':'black'});
        // append new element to stage
        jQuery(titleContainer).css({'margin-top': '7px'}).insertAfter(jQuery(title[0]).find("h2")[0]);
      }
      // clear existing elements
       //pb = jQuery(jQuery(title[0]).find(".product-brand")[0]),
       var   pit = jQuery(jQuery(info[0]).find(".product-info-top")[0]),
          pt = jQuery(title[0]);   
      if (pb && pit){
        //pb.css({'margin-top': '7px'});
        pit.css({'margin-top': '-7px'});
        pt.css({'margin-bottom': '10px'});
      } 
    }
    // move norton (norton appears later than it should... )
    this.testNortonExists();
  }
}
// dont run on t or m
//var subdomain = window.location.hostname.split('.').length >= 3 ? window.location.hostname.split('.')[0] : false;
//if (subdomain != 'm' && subdomain != 't'){
  monetatePDPPageFix();
//}