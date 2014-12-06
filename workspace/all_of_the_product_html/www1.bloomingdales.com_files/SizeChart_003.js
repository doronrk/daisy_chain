define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n    <div class=\"row tabHeader\">\n        ";
  options = {hash:{
    'var': ("currentTab"),
    'value': ((depth1 && depth1.currentTab)),
    'scope': ("request")
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.set || (depth1 && depth1.set)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "set", options)))
    + "\n        ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.tabs), {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth0),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n";
  return buffer;
  }
function program2(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n            ";
  options = {hash:{
    'var': ("indexTab"),
    'value': (((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),
    'scope': ("request")
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.set || (depth0 && depth0.set)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "set", options)))
    + "\n            <div class=\"columns tabHeaderItem ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.condition || (depth0 && depth0.condition)),stack1 ? stack1.call(depth0, "$request.indexTab === $request.currentTab", options) : helperMissing.call(depth0, "condition", "$request.indexTab === $request.currentTab", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\"\n                 style=\"width: "
    + escapeExpression(((stack1 = (depth1 && depth1.tabWidth)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%\"\n                 data-tab=\""
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</div>\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "activeTab";
  }

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.stepsEnabled), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div class=\"row stepContainer\" data-step-num=\""
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.enableLeftColumn), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.enableRightColumn), {hash:{},inverse:self.noop,fn:self.program(33, program33, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n    ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <div id=\"stepTitle_"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"row stepTitle\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.toMarkup || (depth0 && depth0.toMarkup)),stack1 ? stack1.call(depth0, (depth0 && depth0.stepTitle), options) : helperMissing.call(depth0, "toMarkup", (depth0 && depth0.stepTitle), options)))
    + "</div>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                <div class=\"columns large-12 medium-12 small-12 ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.enableSingleColumn), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                    <div class=\"row\">\n                        <table id=\"newSizeTable_"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                               class=\"newSizeTable in ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.measureHeaders)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\">\n                            <thead class=\"newSizeHeader\">\n                                <tr class=\"newSizeLine\">\n                                    ";
  options = {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data};
  stack2 = ((stack1 = helpers.getSizeHeader || (depth0 && depth0.getSizeHeader)),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "getSizeHeader", depth0, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                    ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                    ";
  options = {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data};
  if (stack2 = helpers.measureHeaders) { stack2 = stack2.call(depth0, options); }
  else { stack2 = (depth0 && depth0.measureHeaders); stack2 = typeof stack2 === functionType ? stack2.call(depth0, options) : stack2; }
  if (!helpers.measureHeaders) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                </tr>\n                            </thead>\n                            <tbody class=\"newSizeBody\">\n                                ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.chartSizes), {hash:{},inverse:self.noop,fn:self.programWithDepth(20, program20, data, depth0),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                            </tbody>\n                        </table>\n                    </div>\n\n                    ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.enableConversion), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.enableLocaleChange), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </div>\n            ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "newSizeSingleColumn";
  }

function program11(depth0,data) {
  
  
  return "newSizeTableWithMeasurement";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                        <td class=\"newSizeCellBase newSizeCol newSizeLocaleCol newSizeCol_US\"\n                                            colspan=\"";
  if (stack1 = helpers.span) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.span); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.text); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n                                    ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                        <td class=\"newSizeCell newSizeCol newSizeLocaleCol newSizeCol_";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"> ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " </td>\n                                    ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                                        <td class=\"newSizeCell newSizeColMeasures\">\n                                            ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n                                            ";
  options = {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data};
  if (stack1 = helpers.units) { stack1 = stack1.call(depth0, options); }
  else { stack1 = (depth0 && depth0.units); stack1 = typeof stack1 === functionType ? stack1.call(depth0, options) : stack1; }
  if (!helpers.units) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                        </td>\n                                    ";
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                                                <span class=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.toLower || (depth0 && depth0.toLower)),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "toLower", depth0, options)))
    + " clearfix\">(";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.toLower || (depth0 && depth0.toLower)),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "toLower", depth0, options)))
    + ")</span>\n                                            ";
  return buffer;
  }

function program20(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                                    <tr class=\"newSizeLine\">\n                                        \n                                        <td class=\"newSizeCellBase  newSizeCol\">";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.key); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n                                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.value), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                                        \n                                        ";
  options = {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data};
  stack2 = ((stack1 = helpers.eachInner || (depth1 && depth1.eachInner)),stack1 ? stack1.call(depth0, (depth1 && depth1.localeSizes), options) : helperMissing.call(depth0, "eachInner", (depth1 && depth1.localeSizes), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n                                        \n                                        ";
  options = {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data};
  stack2 = ((stack1 = helpers.eachInner || (depth1 && depth1.eachInner)),stack1 ? stack1.call(depth0, (depth1 && depth1.measureSizes), options) : helperMissing.call(depth0, "eachInner", (depth1 && depth1.measureSizes), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                    </tr>\n                                ";
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                            <td class=\"newSizeCellBase  newSizeCol\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td>\n                                        ";
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                            <td class=\"newSizeCell newSizeCol newSizeLocaleCol newSizeCol_";
  if (stack1 = helpers.propName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.propName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.propValue) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.propValue); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n                                        ";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                            <td class=\"newSizeCell newSizeMeasureCol\">\n                                                \n                                                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.propValue), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                            </td>\n                                        ";
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                                                    <span class=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.toLower || (depth0 && depth0.toLower)),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), options) : helperMissing.call(depth0, "toLower", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), options)))
    + "\">";
  stack2 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n                                                ";
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <div class=\"row\">\n                            <ul class=\"button-group\">\n                                <li><button id=\"newSizeInches_"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" href=\"#\" class=\"button\" value=\"in\">Inches</button></li>\n                                <li><button id=\"newSizeCentimeters_"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" href=\"#\" class=\"button active\" value=\"cm\">Centimeters</button></li>\n                            </ul>\n                        </div>\n                    ";
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                        <div class=\"row\">\n                            <div id=\"newSizeSelect_"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"newSizeSelect\">\n                                <ul class=\"newSizeDropdown ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all\">\n                                    <li class=\"ui-menu-item selected\" data-value=\"INTERNATIONAL SIZES\">\n                                        <div class=\"suggestion\">INTERNATIONAL SIZES</div>\n                                    </li>\n                                    ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                </ul>\n                                <input class=\"newSizeInput\" type=\"text\" value=\"INTERNATIONAL SIZES\" readonly=\"readonly\" />\n                                <label class=\"newSizeLabel\"></label>\n                            </div>\n                        </div>\n                    ";
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                                        <li class=\"ui-menu-item\" data-value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                                            <div class=\"suggestion\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.getCountryName || (depth0 && depth0.getCountryName)),stack1 ? stack1.call(depth0, (depth0 && depth0.name), options) : helperMissing.call(depth0, "getCountryName", (depth0 && depth0.name), options)))
    + "</div>\n                                        </li>\n                                    ";
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                <div class=\"columns large-12 medium-12 small-12 newSizeRightColumn ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.enableSingleColumn), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.sizeChartImage)),stack1 == null || stack1 === false ? stack1 : stack1.image), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.sizeChartImage)),stack1 == null || stack1 === false ? stack1 : stack1.print), {hash:{},inverse:self.noop,fn:self.program(36, program36, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.learnMore)),stack1 == null || stack1 === false ? stack1 : stack1.text), {hash:{},inverse:self.noop,fn:self.program(38, program38, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </div>\n            ";
  return buffer;
  }
function program34(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                        <div id=\"newSizeImage_"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"row newSizeImage\">\n                            <img alt=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sizeChartImage)),stack1 == null || stack1 === false ? stack1 : stack1.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" src=\"";
  if (stack2 = helpers.assetsHost) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.assetsHost); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "/dyn_img/site_ads/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sizeChartImage)),stack1 == null || stack1 === false ? stack1 : stack1.image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n                        </div>\n                    ";
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <div class=\"row newSizePrintBtn\">\n                            <button class=\"button\" onclick=\"javascript:window.open('";
  if (stack1 = helpers.assetsHost) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.assetsHost); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/dyn_img/site_ads/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sizeChartImage)),stack1 == null || stack1 === false ? stack1 : stack1.pdf)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "');\">Print Guide</button>\n                        </div>\n                    ";
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                        <div id=\"newSizeTips_"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"row newSizeTips\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.toMarkup || (depth0 && depth0.toMarkup)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.learnMore)),stack1 == null || stack1 === false ? stack1 : stack1.text), options) : helperMissing.call(depth0, "toMarkup", ((stack1 = (depth0 && depth0.learnMore)),stack1 == null || stack1 === false ? stack1 : stack1.text), options)))
    + "</div>\n                    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tabsEnabled), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"row tabBody\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.currentSizeChartData), {hash:{},inverse:self.noop,fn:self.programWithDepth(5, program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  })

});