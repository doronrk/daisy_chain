define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n        <div class=\"thumbPadding\">\n            <div class=\"suggestions imageBox\">\n                <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.semanticURL)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&CategoryID="
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.defaultCategoryId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&zone="
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tracking)),stack1 == null || stack1 === false ? stack1 : stack1.zone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&choiceId=";
  if (stack2 = helpers.choiceId) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.choiceId); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "&LinkType=PDPZ1_Pos";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.math || (depth0 && depth0.math)),stack1 ? stack1.call(depth0, (depth0 && depth0.index), "+", 1, options) : helperMissing.call(depth0, "math", (depth0 && depth0.index), "+", 1, options)))
    + "\"><img class =\"thumbnailImage\" src=\"";
  if (stack2 = helpers.getImageHost) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.getImageHost); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "/products/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.imageSource)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "?$filtersm$&wid=99&hei=146\" alt=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.shortDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.shortDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" /></a>\n                ";
  stack2 = self.invokePartial(partials.moreColors, 'moreColors', depth0, helpers, partials, data);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n           </div>\n           <div class=\"suggestions copyBox\">\n                <div class=\"title\" title=\"";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.title); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n                    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.semanticURL)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&CategoryID="
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.defaultCategoryId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&zone="
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tracking)),stack1 == null || stack1 === false ? stack1 : stack1.zone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&choiceId=";
  if (stack2 = helpers.choiceId) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.choiceId); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "&LinkType=PDPZ1_Pos";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.math || (depth0 && depth0.math)),stack1 ? stack1.call(depth0, (depth0 && depth0.index), "+", 1, options) : helperMissing.call(depth0, "math", (depth0 && depth0.index), "+", 1, options)))
    + "\" alt=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.shortDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.shortDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                        ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.elipsis || (depth0 && depth0.elipsis)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.productDescription), options) : helperMissing.call(depth0, "elipsis", ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.productDescription), options)))
    + "\n                    </a>\n                </div>\n\n                ";
  stack2 = self.invokePartial(partials.priceInfo, 'priceInfo', depth0, helpers, partials, data);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n                ";
  stack2 = self.invokePartial(partials.promoText, 'promoText', depth0, helpers, partials, data);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n                ";
  stack2 = self.invokePartial(partials.ratings, 'ratings', depth0, helpers, partials, data);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n            </div>\n\n        </div>\n       ";
  stack2 = self.invokePartial(partials.trackingDiv, 'trackingDiv', depth0, helpers, partials, data);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n        <img class=\"spinner\" src=\"/navapp/web20/assets/img/recentlyViewed/ajax-loader.gif\"/>\n    ";
  }

  buffer += "<li class=\"thumb\" data-index=\"";
  if (stack1 = helpers.index) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.index); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-choiceid=\"";
  if (stack1 = helpers.choiceId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.choiceId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loaded), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  })

});