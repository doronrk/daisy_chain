function io_rec_zp(a_product_ids,zone,symbolic,target_id,category,rec_attributes,target_attributes,target_header_txt)
{

  console.warn('IntelligentOffer_Zones::io_rec_zp::zone ' + zone);
  console.warn('IntelligentOffer_Zones::io_rec_zp::symbolic ' + symbolic);
  console.warn('IntelligentOffer_Zones::io_rec_zp::target_id ' + target_id);
  console.warn('IntelligentOffer_Zones::io_rec_zp::category ' + category);
  console.warn('IntelligentOffer_Zones::io_rec_zp::rec_attributes ' + rec_attributes);
  console.warn('IntelligentOffer_Zones::io_rec_zp::target_attributes ' + target_attributes);
  console.warn('IntelligentOffer_Zones::io_rec_zp::target_header_txt ' + target_header_txt);

  if (symbolic !== '_NR_') {
    var n_recs = a_product_ids.length;

    var rec_part_numbers;

    // 0 - product name
    // 1 - product price
    // 2 - product url
    // 3 - product image url

    var rec_prod_names;

    var rec_prod_price;

    var rec_prod_link;

    var rec_prod_image;

    for (var ii=0; ii < n_recs; ii++) {
      if (ii == 0) {
         rec_part_numbers = a_product_ids[ii];
         rec_prod_names = rec_attributes[ii][0];
         rec_prod_price = rec_attributes[ii][1];
         rec_prod_link = rec_attributes[ii][2];
         rec_prod_image = rec_attributes[ii][3];
      } else {
        rec_part_numbers = rec_part_numbers + ',' + a_product_ids[ii];
        rec_prod_names = rec_prod_names + ',' + rec_attributes[ii][0];
         rec_prod_price = rec_prod_price + ',' + rec_attributes[ii][1];
         rec_prod_link = rec_prod_link + ',' + rec_attributes[ii][2];
         rec_prod_image = rec_prod_image + ',' + rec_attributes[ii][3];
      }
      //console.warn('product: ' + a_product_ids[ii]);
    }
    console.warn('partNumbers: ' + rec_part_numbers);
    var zoneId = zone.replace(/\s+/g,'');
    wc.render.updateContext('WC_IntelligentOfferESpot_context_ID_' + zoneId, {'partNumbers':rec_part_numbers, 'prodNames':rec_prod_names,  'prodPrices':rec_prod_price, 'prodLinks':rec_prod_link, 'prodImages':rec_prod_image,'zoneId': zoneId, 'espotTitle': target_header_txt});

    var cmIntervalName = window['cmInterval' + zoneId];
    clearInterval(cmIntervalName);
    console.log('cmRecRequest successful');
  }

/** The following is sample code provided by coremetrics
*
*  var html = zone + "_zp: No recommendations returned";
*
*  if (symbolic !== ’_NR_’)
*  {
*    // special case. Over ride of the header text passed from the configuration file
*    target_header_txt = "Other customers also shopped";
*    var div_recs = ’<div class="V5_io_example_recs"\>’;
*    var n_recs = a_product_ids.length;
*    var div_title = ’<div class="io_recs_title">’ + target_header_txt + ’<\/div>’;
*    var div_table = ’<div class="io_recs_table">’;
*    var image_table = ’<TABLE CELLSPACING="2" CELLPADDING="0" Align="center" style="border-color:white;"><TR>’;
*    var lines = [];
*    var width = 100 / n_recs;
*    // 0 product description
*    // 1 category
*    // 2 price
*    // 3 not defined
*    // 4 not defined
*
*    // Recommendations
*    for (var ii=0; ii < n_recs; ii++)
*    {
*      var rec_prod_id = a_product_ids[ii];
*      var image_description = rec_attributes[ii][0]; // - not passed to example
*      var selected_href = ’’; // - not passed to example
*      var price = rec_attributes[ii][2] ? ’$’ + rec_attributes[ii][2] : ’’; // - not passed to example
*
*      var n_stars = 2 + Math.floor(Math.random() * 3); // - not passed to example
*      var category = rec_attributes[ii][1]; // - not passed to example
*      var image_url = ’main-’ + category + ’.jpg’; // - not passed to example
*      var alt_description = image_description || rec_prod_id;
*
*      lines.push(’<TD valign="top" class="borderedRollover" width=’ + width + ’%><div class="bordered_Rollover"><TABLE ALIGN="center" WIDTH=’ + width + ’%>’);
*      lines.push(’<TR><TD ALIGN="center"><A HREF="’ + selected_href + ’"><IMG SRC="’ + image_url + ’?wid=128" + ALT="’ + alt_description + ’" + WIDTH=128 + height=128 + style="border: medium none; cursor: pointer; padding-bottom:  5px; padding-top: 5px;" /><\/TD><\/TR>’);
*      lines.push(’<TR><TD ALIGN="center"><A STYLE="text-decoration:none" HREF="’ + selected_href + ’">’ + image_description + ’<\/A><\/TD><\/TR>’);
*      lines.push(’<TR ><TD><TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0" WIDTH=100%><TR><TD ALIGN="center">’ + price + ’<\/TD><\/TR><\/TABLE><\/TD><\/TR>’);
*      lines.push(’<\/TABLE><\/div><\/TD>’);
*    }
*
*    // make a text string
*    // html = div_title + div_table + image_table + lines.join("\n") + ’<\/TR>’ +
*    // image_trailer + ’<\/TABLE><\/div>’;
*
*    html = div_recs + div_title + div_table + image_table + lines.join("\n") + ’<\/TR\><\/TABLE\><\/div\><\/div\>’;
*  }
*
*  document.getElementById(’io_zone’).innerHTML= html;
*/
}