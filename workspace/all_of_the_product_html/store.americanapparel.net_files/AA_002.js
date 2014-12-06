var AA=AA||{};AA.namespace("AA.Modules.PressImages");AA.Modules.PressImages=(function($,AA,M){'use strict';var defaults={targetDiv:'.pressImagesDefault'}
function renderTitles(){var slides={"pressImages":defaults.s7Data};var idx=1;slides.idx=function(){return idx++;}
slides["pressImages"][slides["pressImages"].length- 1].last=true;return Mustache.render($("#tml-pressimages").html(),slides)}
function init(options){$.extend(true,defaults,options);var slides=defaults.s7Data;var $targetDiv=$(defaults.targetDiv);if(slides.length>0){$targetDiv.append(renderTitles());}else{return;}
$('.pressImages-link').fancybox();}
return{init:init};}(jQuery,AA,Mustache));