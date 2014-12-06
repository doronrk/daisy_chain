define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <span class=\"rating\"><span style=\"width:";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.rating || (depth0 && depth0.rating)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.custRatings), options) : helperMissing.call(depth0, "rating", ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.custRatings), options)))
    + "\"></span></span><span>("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.numberOfReviews)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>\n    ";
  return buffer;
  }

  buffer += "<div class=\"pdpreviews\">\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.custRatings), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>";
  return buffer;
  })

});