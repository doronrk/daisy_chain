define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.edv), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <span class=\"sale\"><img class=\"edvImage\" src=\"http://assets.macys.com/navapp/web20/assets/img/pdp/edv_browse.png\"/> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.outputPrice || (depth0 && depth0.outputPrice)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.salePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minSalePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxSalePrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options) : helperMissing.call(depth0, "outputPrice", ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.salePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minSalePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxSalePrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options)))
    + "</span><br/>\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <span class=\"regular\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.outputPrice || (depth0 && depth0.outputPrice)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.originalPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minOriginalPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxOriginalPrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options) : helperMissing.call(depth0, "outputPrice", ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.originalPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minOriginalPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxOriginalPrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options)));
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.outputPrice || (depth0 && depth0.outputPrice)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.regPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minRegPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxRegPrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options) : helperMissing.call(depth0, "outputPrice", ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.regPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minRegPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxRegPrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options)))
    + "</span><br/>            \n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "        \n        ";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <span class=\"was\">  "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel2)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.outputPrice || (depth0 && depth0.outputPrice)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.wasPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minWasPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxWasPrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options) : helperMissing.call(depth0, "outputPrice", ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.wasPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minWasPrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxWasPrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options)))
    + "</span><br/>\n        ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <span class=\"priceSale sale\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel3)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.outputPrice || (depth0 && depth0.outputPrice)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.salePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minSalePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxSalePrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options) : helperMissing.call(depth0, "outputPrice", ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.salePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minSalePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxSalePrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options)))
    + "</span><br/>\n    ";
  return buffer;
  }

function program13(depth0,data) {
  
  
  return "\n    ";
  }

function program15(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel2), {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  return buffer;
  }
function program16(depth0,data) {
  
  
  return "\n        ";
  }

function program18(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel3), {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  return buffer;
  }
function program19(depth0,data) {
  
  
  return "\n            ";
  }

function program21(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                <span class=\"regular\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.outputPrice || (depth0 && depth0.outputPrice)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.salePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minSalePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxSalePrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options) : helperMissing.call(depth0, "outputPrice", ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.salePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.minSalePrice), ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.maxSalePrice), ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.masterProduct), options)))
    + "</span><br/>\n            ";
  return buffer;
  }

  buffer += "<div class=\"priceInfo\">\n\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel1), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel2), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel3), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.priceInfo)),stack1 == null || stack1 === false ? stack1 : stack1.priceLabel1), {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n</div>";
  return buffer;
  })

});