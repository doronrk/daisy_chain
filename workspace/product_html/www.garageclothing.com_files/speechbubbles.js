var speechbubbles_tooltip={loadcontent:function($,selector,options,callback){var ajaxfriendlyurl=options.url.replace(/^http:\/\/[^\/]+\//i,"http://"+window.location.hostname+"/")
$.ajax({url:ajaxfriendlyurl,async:true,error:function(ajaxrequest){alert('Error fetching Ajax content.<br />Server Response: '+ajaxrequest.responseText)},success:function(content){$(document.body).append(content)
callback(selector)
$(content).remove()}})},buildtooltip:function($,setting){var speechtext=(setting.speechid)?$('div#'+setting.speechid).html():setting.speechtext
if(speechtext){$speech=$('<div class="speechbubbles">'+speechtext+'</div>').appendTo(document.body)
$speech.addClass('speechbubbles').append('<div class="speechbubbles-arrow-border"></div>\n<div class="speechbubbles-arrow"></div>')
$speech.data('$arrowparts',$speech.find('div.speechbubbles-arrow, div.speechbubbles-arrow-border'))
var arrowheight=(window.XMLHttpRequest)?$speech.data('$arrowparts').eq(0).outerHeight():10
$speech.data('measure',{w:$speech.outerWidth(),h:$speech.outerHeight()+arrowheight,arroww:$speech.data('$arrowparts').eq(0).outerWidth()})
$speech.css({display:'none',visibility:'visible'})
setting.$speech=$speech}
return setting.$speech},positiontip:function($,$anchor,s,e){var $speech=s.$speech
var $offset=$anchor.offset()
var windowmeasure={w:$(window).width(),h:$(window).height(),left:$(document).scrollLeft(),top:$(document).scrollTop()}
var anchormeasure={w:$anchor.outerWidth(),h:$anchor.outerHeight(),left:$offset.left,top:$offset.top}
var speechmeasure={w:$speech.data('measure').w,h:$speech.data('measure').h}
var x=anchormeasure.left
var y=anchormeasure.top+anchormeasure.h
x=(x+speechmeasure.w>windowmeasure.left+windowmeasure.w-3)?x-speechmeasure.w+anchormeasure.w-5:x
y=(y+speechmeasure.h>windowmeasure.top+windowmeasure.h)?y-speechmeasure.h-anchormeasure.h-10:y+10
var isrightaligned=x!=anchormeasure.left
var istopaligned=y!=anchormeasure.top+anchormeasure.h+10
if(istopaligned){y=y-25}else{y=y-15}
$speech.removeClass('downversion').addClass(istopaligned?'downversion':'')
var arrowpos=(isrightaligned)?speechmeasure.w-(anchormeasure.left+anchormeasure.w-e.pageX)-25:e.pageX-anchormeasure.left-25
if(arrowpos>speechmeasure.w-25)
arrowpos=speechmeasure.w-40
else{arrowpos=(isrightaligned)?Math.max(anchormeasure.left-x+10,arrowpos):Math.max(15,arrowpos)}
$speech.data('$arrowparts').css('left',arrowpos)
var speechcss_before={opacity:0,left:x,top:(istopaligned)?y-speechmeasure.h-10:y+speechmeasure.h+10}
var speechcss_after={opacity:1,top:y+10}
if(document.all&&!window.msPerformance){delete speechcss_before.opacity
delete speechcss_after.opacity}
$speech.css(speechcss_before).show().animate(speechcss_after)},init:function($,$anchor,options){var s={speechtext:$anchor.attr('title'),speechid:$anchor.attr('rel')}
$.extend(s,options)
if(this.buildtooltip($,s)){if(s.speechtext)
$anchor.attr('title',"")
$anchor.mouseenter(function(e){if(s.$speech.queue().length==0){clearTimeout(s.hidetimer)
speechbubbles_tooltip.positiontip($,$anchor,s,e)}})
$anchor.mouseleave(function(e){s.hidetimer=setTimeout(function(){s.$speech.stop(true,true).hide()},200)})}}}
jQuery.fn.speechbubble=function(options){var $=jQuery
function processanchor(selector){return selector.each(function(){var $anchor=$(this)
speechbubbles_tooltip.init($,$anchor,options)})}
if(options&&options.url)
speechbubbles_tooltip.loadcontent($,this,options,processanchor)
else
processanchor(this)};