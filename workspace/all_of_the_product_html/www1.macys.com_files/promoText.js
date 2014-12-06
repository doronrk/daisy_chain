define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"badgePromotion\">\n        "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.firstPromotion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </div>\n";
  return buffer;
  }

  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.firstPromotion), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  return buffer;
  })

});