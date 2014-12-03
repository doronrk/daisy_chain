define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, self=this;

function program1(depth0,data) {
  
  
  return "\n    <div class=\"moreColors\">more colors</div>\n";
  }

  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.productThumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.moreColors), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n   ";
  return buffer;
  })

});