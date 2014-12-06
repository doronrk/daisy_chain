define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<img alt=\"More Colors\" src=\"";
  if (stack1 = helpers.commonAssetsServer) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.commonAssetsServer); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/web20/assets/img/catalog/recommendation/";
  if (stack1 = helpers.moreColorsIMG) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.moreColorsIMG); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n			";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n		<div class=\"b-pdp-rating\">\n	";
  }

function program5(depth0,data) {
  
  
  return "\n		<div class=\"b-pdp-rating\" style=\"display:none;\">\n	";
  }

function program7(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n						<span class=\"priceSale\"> On Sale </span>\n					";
  }

function program11(depth0,data) {
  
  
  return "\n				Bonus Offer\n			";
  }

  buffer += "<li class=\"Item\" data-index=\"\">\n	<div class=\"productThumbnail\">\n		<div class=\"productImages\">\n			<a href=\"";
  if (stack1 = helpers.semanticURL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.semanticURL); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "&amp;CategoryID=";
  if (stack1 = helpers.categoryId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.categoryId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "&amp;LinkType=";
  if (stack1 = helpers.LinkType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.LinkType); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"prodLink_";
  if (stack1 = helpers.ID) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.ID); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"imageLink productThumbnailLink\" data-choiceId=\"";
  if (stack1 = helpers.choiceId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.choiceId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-webid=\"";
  if (stack1 = helpers.ID) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.ID); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n				<img class=\"productImage\" border=\"0\" alt=\"";
  if (stack1 = helpers.shortDescription) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.shortDescription); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" title=\"";
  if (stack1 = helpers.shortDescription) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.shortDescription); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" src=\"";
  if (stack1 = helpers.commonAssetsServer) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.commonAssetsServer); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/web20/assets/img/catalog/recommendation/pre_load_productImage.png\" data-src=\"http://images.bloomingdales.com/is/image/BLM/products/";
  if (stack1 = helpers.imageSource) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.imageSource); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "?bgc=255,255,255&amp;wid=";
  if (stack1 = helpers.imgWidth) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.imgWidth); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "&amp;qlt=90,0&amp;layer=comp&amp;op_sharpen=0&amp;resMode=bicub&amp;op_usm=0.7,1.0,0.5,0&amp;fmt=jpeg\"/>\n			</a>\n		</div>\n		<div class=\"moreColors\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.moreColors), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n		<div class=\"shortDescription\">\n			<a href=\"";
  if (stack1 = helpers.semanticURL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.semanticURL); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "&amp;CategoryID=";
  if (stack1 = helpers.categoryId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.categoryId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "&amp;LinkType=";
  if (stack1 = helpers.LinkType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.LinkType); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-choiceId=\"";
  if (stack1 = helpers.choiceId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.choiceId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-webid=\"";
  if (stack1 = helpers.ID) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.ID); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.shortDescription) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.shortDescription); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n		</div>\n	";
  options = {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.condition || (depth0 && depth0.condition)),stack1 ? stack1.call(depth0, "(numberOfReviews > 0)", options) : helperMissing.call(depth0, "condition", "(numberOfReviews > 0)", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n			<div style=\"";
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data};
  stack2 = ((stack1 = helpers.formatRatings || (depth0 && depth0.formatRatings)),stack1 ? stack1.call(depth0, (depth0 && depth0.numberOfReviews), (depth0 && depth0.custRatings), options) : helperMissing.call(depth0, "formatRatings", (depth0 && depth0.numberOfReviews), (depth0 && depth0.custRatings), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\"></div>\n		</div>		\n		<div class=\"prices\">\n			<div class=\"priceSale\">\n				<div class=\"singleTierPrice\">\n					";
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data};
  stack2 = ((stack1 = helpers.chkSalePrice || (depth0 && depth0.chkSalePrice)),stack1 ? stack1.call(depth0, (depth0 && depth0.price), (depth0 && depth0.salePrice), (depth0 && depth0.onSale), (depth0 && depth0.priceLabel3), options) : helperMissing.call(depth0, "chkSalePrice", (depth0 && depth0.price), (depth0 && depth0.salePrice), (depth0 && depth0.onSale), (depth0 && depth0.priceLabel3), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n					";
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data};
  stack2 = ((stack1 = helpers.condition || (depth0 && depth0.condition)),stack1 ? stack1.call(depth0, "(price.length === 0) && (onSale)", options) : helperMissing.call(depth0, "condition", "(price.length === 0) && (onSale)", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n				</div>\n			</div>\n		</div>\n		<div class=\"flexText\"></div>\n		<div class=\"offers\">\n			";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.bonusOffer), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n		</div>\n	</div>\n</li>";
  return buffer;
  })

});