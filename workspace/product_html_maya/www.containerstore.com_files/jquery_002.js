(function($){var bindIndex=0;
$.fn.extend({bubbletip:function(tip,options){if($("table.bubbletip #"+$(tip).get(0).id).length>0){return this
}var _this,_tip,_options,_calc,_timeoutAnimate,_timeoutRefresh,_isActive,_isHiding,_wrapper,_bindIndex;
var _windowWidth,_windowHeight;
_this=$(this);
_tip=$(tip);
_bindIndex=bindIndex++;
_options={positionAt:"element",positionAtElement:_this,offsetTop:0,offsetLeft:0,deltaPosition:30,deltaDirection:"up",animationDuration:250,animationEasing:"swing",bindShow:"mouseover",bindHide:"mouseout",delayShow:0,delayHide:500,calculateOnShow:false};
if(options){_options=$.extend(_options,options)
}_calc={top:0,left:0,delta:0,mouseTop:0,mouseLeft:0,tipHeight:0,bindShow:(_options.bindShow+" ").replace(/ +/g,".bubbletip"+_bindIndex),bindHide:(_options.bindHide+" ").replace(/ +/g,".bubbletip"+_bindIndex)};
_timeoutAnimate=null;
_timeoutRefresh=null;
_isActive=false;
_isHiding=false;
if(!_this.data("bubbletip_tips")){_this.data("bubbletip_tips",[[_tip.get(0).id,_bindIndex]])
}else{_this.data("bubbletip_tips",$.merge(_this.data("bubbletip_tips"),[[_tip.get(0).id,_bindIndex]]))
}if(!_options.positionAt.match(/^element|body|mouse$/i)){_options.positionAt="element"
}if(!_options.deltaDirection.match(/^up|down|left|right$/i)){_options.deltaDirection="up"
}if(_options.deltaDirection.match(/^up$/i)){_wrapper=$('<table class="bubbletip" cellspacing="0" cellpadding="0"><tbody><tr><td class="bt-topleft"></td><td class="bt-top"></td><td class="bt-topright"></td></tr><tr><td class="bt-left"></td><td class="bt-content"></td><td class="bt-right"></td></tr><tr><td class="bt-bottomleft"></td><td><table class="bt-bottom" cellspacing="0" cellpadding="0"><tr><th></th><td><div></div></td><th></th></tr></table></td><td class="bt-bottomright"></td></tr></tbody></table>')
}else{if(_options.deltaDirection.match(/^down$/i)){_wrapper=$('<table class="bubbletip" cellspacing="0" cellpadding="0"><tbody><tr><td class="bt-topleft"></td><td><table class="bt-top" cellspacing="0" cellpadding="0"><tr><th></th><td><div></div></td><th></th></tr></table></td><td class="bt-topright"></td></tr><tr><td class="bt-left"></td><td class="bt-content"></td><td class="bt-right"></td></tr><tr><td class="bt-bottomleft"></td><td class="bt-bottom"></td><td class="bt-bottomright"></td></tr></tbody></table>')
}else{if(_options.deltaDirection.match(/^left$/i)){_wrapper=$('<table class="bubbletip" cellspacing="0" cellpadding="0"><tbody><tr><td class="bt-topleft"></td><td class="bt-top"></td><td class="bt-topright"></td></tr><tr><td class="bt-left"></td><td class="bt-content"></td><td class="bt-right-tail"><div class="bt-right"></div><div class="bt-right-tail"></div><div class="bt-right"></div></td></tr><tr><td class="bt-bottomleft"></td><td class="bt-bottom"></td><td class="bt-bottomright"></td></tr></tbody></table>')
}else{if(_options.deltaDirection.match(/^right$/i)){_wrapper=$('<table class="bubbletip" cellspacing="0" cellpadding="0"><tbody><tr><td class="bt-topleft"></td><td class="bt-top"></td><td class="bt-topright"></td></tr><tr><td class="bt-left-tail"><div class="bt-left"></div><div class="bt-left-tail"></div><div class="bt-left"></div></td><td class="bt-content"></td><td class="bt-right"></td></tr><tr><td class="bt-bottomleft"></td><td class="bt-bottom"></td><td class="bt-bottomright"></td></tr></tbody></table>')
}}}}_wrapper.appendTo("body");
if((/msie/.test(navigator.userAgent.toLowerCase()))&&(!/opera/.test(navigator.userAgent.toLowerCase()))){$("*",_wrapper).each(function(){var image=$(this).css("background-image");
if(image.match(/^url\(["']?(.*\.png)["']?\)$/i)){image=RegExp.$1;
$(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod="+($(this).css("backgroundRepeat")=="no-repeat"?"crop":"scale")+", src='"+image+"')"}).each(function(){var position=$(this).css("position");
if(position!="absolute"&&position!="relative"){$(this).css("position","relative")
}})
}})
}$(".bt-content",_wrapper).append(_tip);
_tip.show();
if(_options.deltaDirection.match(/^left|right$/i)){_calc.tipHeight=parseInt(_tip.height()/2);
if((_tip.height()%2)==1){_calc.tipHeight++
}_calc.tipHeight=(_calc.tipHeight<20)?1:_calc.tipHeight-20;
if(_options.deltaDirection.match(/^left$/i)){$("div.bt-right",_wrapper).css("height",_calc.tipHeight+"px")
}else{$("div.bt-left",_wrapper).css("height",_calc.tipHeight+"px")
}}_wrapper.css("opacity",0);
_wrapper.css({width:_wrapper.width(),height:_wrapper.height()});
_Calculate();
_wrapper.hide();
$(window).bind("resize.bubbletip"+_bindIndex,function(){var w=$(window).width();
var h=$(window).height();
if((w===_windowWidth)&&(h===_windowHeight)){return
}_windowWidth=w;
_windowHeight=h;
if(_timeoutRefresh){clearTimeout(_timeoutRefresh)
}_timeoutRefresh=setTimeout(function(){_Calculate()
},250)
});
$([_wrapper.get(0),this.get(0)]).bind(_calc.bindShow,function(){if(_timeoutAnimate){clearTimeout(_timeoutAnimate)
}if(_options.delayShow===0){_Show()
}else{_timeoutAnimate=setTimeout(function(){_Show()
},_options.delayShow)
}return false
}).bind(_calc.bindHide,function(){if(_timeoutAnimate){clearTimeout(_timeoutAnimate)
}if(_options.delayHide===0){_Hide()
}else{_timeoutAnimate=setTimeout(function(){_Hide()
},_options.delayHide)
}return false
});
function _Show(){var animation;
if(_isActive){return
}_isActive=true;
if(_isHiding){_wrapper.stop(true,false)
}if(_options.calculateOnShow){_Calculate()
}if(_options.positionAt.match(/^element|body$/i)){if(_options.deltaDirection.match(/^up|down$/i)){if(!_isHiding){_wrapper.css("top",parseInt(_calc.top+_calc.delta)+"px")
}animation={top:_calc.top+"px"}
}else{if(!_isHiding){_wrapper.css("left",parseInt(_calc.left+_calc.delta)+"px")
}animation={left:_calc.left+"px"}
}}else{if(_options.deltaDirection.match(/^up|down$/i)){if(!_isHiding){_calc.mouseTop=e.pageY+_calc.top;
_wrapper.css({top:parseInt(_calc.mouseTop+_calc.delta)+"px",left:parseInt(e.pageX-(_wrapper.width()/2))+"px"})
}animation={top:_calc.mouseTop+"px"}
}else{if(!_isHiding){_calc.mouseLeft=e.pageX+_calc.left;
_wrapper.css({left:parseInt(_calc.mouseLeft+_calc.delta)+"px",top:parseInt(e.pageY-(_wrapper.height()/2))+"px"})
}animation={left:_calc.left+"px"}
}}_isHiding=false;
_wrapper.show();
animation=$.extend(animation,{opacity:1});
_wrapper.animate(animation,_options.animationDuration,_options.animationEasing,function(){_wrapper.css("opacity","");
_isActive=true
})
}function _Hide(){var animation;
_isActive=false;
_isHiding=true;
if(_options.positionAt.match(/^element|body$/i)){if(_options.deltaDirection.match(/^up|down$/i)){animation={top:parseInt(_calc.top-_calc.delta)+"px"}
}else{animation={left:parseInt(_calc.left-_calc.delta)+"px"}
}}else{if(_options.deltaDirection.match(/^up|down$/i)){animation={top:parseInt(_calc.mouseTop-_calc.delta)+"px"}
}else{animation={left:parseInt(_calc.mouseLeft-_calc.delta)+"px"}
}}animation=$.extend(animation,{opacity:0});
_wrapper.animate(animation,_options.animationDuration,_options.animationEasing,function(){_wrapper.hide();
_isHiding=false
})
}function _Calculate(){if(_options.positionAt.match(/^element$/i)){var offset=_options.positionAtElement.offset();
if(_options.deltaDirection.match(/^up$/i)){_calc.top=offset.top+_options.offsetTop-_wrapper.outerHeight();
_calc.left=offset.left+_options.offsetLeft+((_options.positionAtElement.outerWidth()-_wrapper.outerWidth())/2);
_calc.delta=_options.deltaPosition
}else{if(_options.deltaDirection.match(/^down$/i)){_calc.top=offset.top+_options.positionAtElement.outerHeight()+_options.offsetTop;
_calc.left=offset.left+_options.offsetLeft+((_options.positionAtElement.outerWidth()-_wrapper.outerWidth())/2);
_calc.delta=-_options.deltaPosition
}else{if(_options.deltaDirection.match(/^left$/i)){_calc.top=offset.top+_options.offsetTop+((_options.positionAtElement.outerHeight()-_wrapper.outerHeight())/2);
_calc.left=offset.left+_options.offsetLeft-_wrapper.outerWidth();
_calc.delta=_options.deltaPosition
}else{if(_options.deltaDirection.match(/^right$/i)){_calc.top=offset.top+_options.offsetTop+((_options.positionAtElement.outerHeight()-_wrapper.outerHeight())/2);
_calc.left=offset.left+_options.positionAtElement.outerWidth()+_options.offsetLeft;
_calc.delta=-_options.deltaPosition
}}}}}else{if(_options.positionAt.match(/^body$/i)){if(_options.deltaDirection.match(/^up|left$/i)){_calc.top=_options.offsetTop;
_calc.left=_options.offsetLeft;
_calc.delta=_options.deltaPosition
}else{if(_options.deltaDirection.match(/^down$/i)){_calc.top=parseInt(_options.offsetTop+_wrapper.outerHeight());
_calc.left=_options.offsetLeft
}else{_calc.top=_options.offsetTop;
_calc.left=parseInt(_options.offsetLeft+_wrapper.outerWidth())
}_calc.delta=-_options.deltaPosition
}}else{if(_options.positionAt.match(/^mouse$/i)){if(_options.deltaDirection.match(/^up|left$/i)){if(_options.deltaDirection.match(/^up$/i)){_calc.top=-(_options.offsetTop+_wrapper.outerHeight());
_calc.left=_options.offsetLeft
}else{if(_options.deltaDirection.match(/^left$/i)){_calc.top=_options.offsetTop;
_calc.left=-(_options.offsetLeft+_wrapper.outerWidth())
}}_calc.delta=_options.deltaPosition
}else{_calc.top=_options.offsetTop;
_calc.left=_options.offsetLeft;
_calc.delta=-_options.deltaPosition
}}}}if(_options.positionAt.match(/^element|body$/i)){_wrapper.css({position:"absolute",top:_calc.top+"px",left:_calc.left+"px"})
}}return this
},removeBubbletip:function(tips){var tipsActive;
var tipsToRemove=new Array();
var tipsActiveAdjusted=new Array();
var arr,i,ix;
var elem;
tipsActive=$.makeArray($(this).data("bubbletip_tips"));
arr=$.makeArray(tips);
for(i=0;
i<arr.length;
i++){tipsToRemove.push($(arr[i]).get(0).id)
}for(i=0;
i<tipsActive.length;
i++){ix=null;
if((tipsToRemove.length==0)||((ix=$.inArray(tipsActive[i][0],tipsToRemove))>=0)){elem=$("#"+tipsActive[i][0]).get(0).parentNode;
while(elem.tagName.toLowerCase()!="table"){elem=elem.parentNode
}$("#"+tipsActive[i][0]).appendTo("body").hide();
$(elem).remove();
$(this).unbind(".bubbletip"+tipsActive[i][1]);
$(window).unbind(".bubbletip"+tipsActive[i][1])
}else{tipsActiveAdjusted.push(tipsActive[i])
}}$(this).data("bubbletip_tips",tipsActiveAdjusted);
return this
}})
})(jQuery);