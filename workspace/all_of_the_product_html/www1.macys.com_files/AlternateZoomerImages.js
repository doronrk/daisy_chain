define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <img id=\"";
  if (stack1 = helpers.scrollUp) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.scrollUp); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" src=\"";
  if (stack1 = helpers.assetsHost) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.assetsHost); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/web20/assets/img/scene7/btnArrowUp.png\" class=\"alt-image-scroll alt-image-scroll-up\"></img>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n            <li data-index=\""
    + escapeExpression(((stack1 = (depth0 && depth0.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <img src=\"";
  stack2 = ((stack1 = (depth0 && depth0.imageURL)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\">\n                ";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  stack2 = ((stack1 = helpers.condition || (depth0 && depth0.condition)),stack1 ? stack1.call(depth0, "this.type === 'video'", options) : helperMissing.call(depth0, "condition", "this.type === 'video'", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </li>\n            ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                  <img src=\"";
  if (stack1 = helpers.assetsHost) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.assetsHost); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/web20/assets/img/pdp/videoPlayIcon.png\" class=\"alt-zoomer-vicon\"></img>\n                  <span>";
  stack2 = ((stack1 = (depth0 && depth0.videoId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n                ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <img id=\"";
  if (stack1 = helpers.scrollDown) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.scrollDown); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" src=\"";
  if (stack1 = helpers.assetsHost) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.assetsHost); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/web20/assets/img/scene7/btnArrowDown.png\" class=\"alt-image-scroll alt-image-scroll-down\"></img>\n    ";
  return buffer;
  }

  buffer += "<div id=\"";
  if (stack1 = helpers.alternateImageGridParentID) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.alternateImageGridParentID); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"alt-zoomer-images-container\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.scrollUp), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div id=\"";
  if (stack1 = helpers.alternateImageGridID) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.alternateImageGridID); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"alt-zoomer-images\">\n        <ul>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.alternateImage), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.scrollDown), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  })

});