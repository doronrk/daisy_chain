(function($){$.tools=$.tools||{version:"1.2.5"};
$.tools.scrollable={conf:{displayCount:5,activeClass:"active",circular:false,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:true,mousewheel:false,next:".next",prev:".prev",speed:400,vertical:false,touch:true,wheelSpeed:0}};
function dim(el,key){var v=parseInt(el.css(key),10);
if(v){return v
}var s=el[0].currentStyle;
return s&&s.width&&parseInt(s.width,10)
}function find(root,query){var el=$(query);
return el.length<2?el:root.parent().find(query)
}var current;
function Scrollable(root,conf){var self=this,fire=root.add(self),itemWrap=root.children(),index=0,vertical=conf.vertical;
if(!current){current=self
}if(itemWrap.length>1){itemWrap=$(conf.items,root)
}$.extend(self,{getConf:function(){return conf
},getIndex:function(){return index
},getSize:function(){return self.getItems().size()
},getDisplayCount:function(){return conf.displayCount
},getNaviButtons:function(){return prev.add(next)
},getRoot:function(){return root
},getItemWrap:function(){return itemWrap
},getItems:function(){return itemWrap.children(conf.item).not("."+conf.clonedClass)
},move:function(offset,time){return self.seekTo(index+offset,time)
},next:function(time){return self.move(1,time)
},prev:function(time){return self.move(-1,time)
},begin:function(time){return self.seekTo(0,time)
},end:function(time){return self.seekTo(self.getSize()-1,time)
},focus:function(){current=self;
return self
},addItem:function(item){item=$(item);
if(!conf.circular){itemWrap.append(item)
}else{itemWrap.children("."+conf.clonedClass+":last").before(item);
itemWrap.children("."+conf.clonedClass+":first").replaceWith(item.clone().addClass(conf.clonedClass))
}fire.trigger("onAddItem",[item]);
return self
},seekTo:function(i,time,fn){if(!i.jquery){i*=1
}if(conf.circular&&i===0&&index==-1&&time!==0){return self
}if(!conf.circular&&i<0||i>self.getSize()||i<-1){return self
}var item=i;
if(i.jquery){i=self.getItems().index(i)
}else{item=self.getItems().eq(i)
}var e=$.Event("onBeforeSeek");
if(!fn){fire.trigger(e,[i,time]);
if(e.isDefaultPrevented()||!item.length){return self
}}var props=vertical?{top:-item.position().top}:{left:-item.position().left};
index=i;
current=self;
if(time===undefined){time=conf.speed
}itemWrap.animate(props,time,conf.easing,fn||function(){fire.trigger("onSeek",[i])
});
return self
}});
$.each(["onBeforeSeek","onSeek","onAddItem"],function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name])
}self[name]=function(fn){if(fn){$(self).bind(name,fn)
}return self
}
});
if(conf.circular){var cloned1=self.getItems().slice(-1).clone().prependTo(itemWrap),cloned2=self.getItems().eq(1).clone().appendTo(itemWrap);
cloned1.add(cloned2).addClass(conf.clonedClass);
self.onBeforeSeek(function(e,i,time){if(e.isDefaultPrevented()){return
}if(i==-1){self.seekTo(cloned1,time,function(){self.end(0)
});
return e.preventDefault()
}else{if(i==self.getSize()){self.seekTo(cloned2,time,function(){self.begin(0)
})
}}});
self.seekTo(0,0,function(){})
}var prev=find(root,conf.prev).click(function(){self.prev()
}),next=find(root,conf.next).click(function(){self.next()
});
if(!conf.circular&&self.getSize()>1){self.onBeforeSeek(function(e,i){setTimeout(function(){if(!e.isDefaultPrevented()){prev.toggleClass(conf.disabledClass,i<=0);
next.toggleClass(conf.disabledClass,i>=self.getSize()-self.getDisplayCount())
}},1)
});
if(!conf.initialIndex){prev.addClass(conf.disabledClass)
}if(self.getSize()<=self.getDisplayCount()){next.addClass(conf.disabledClass)
}}if(conf.mousewheel&&$.fn.mousewheel){root.mousewheel(function(e,delta){if(conf.mousewheel){self.move(delta<0?1:-1,conf.wheelSpeed||50);
return false
}})
}if(conf.touch){var touch={};
itemWrap[0].ontouchstart=function(e){var t=e.touches[0];
touch.x=t.clientX;
touch.y=t.clientY
};
itemWrap[0].ontouchmove=function(e){if(e.touches.length==1&&!itemWrap.is(":animated")){var t=e.touches[0],deltaX=touch.x-t.clientX,deltaY=touch.y-t.clientY;
self[vertical&&deltaY>0||!vertical&&deltaX>0?"next":"prev"]();
e.preventDefault()
}}
}if(conf.keyboard){$(document).bind("keydown.scrollable",function(evt){if(!conf.keyboard||evt.altKey||evt.ctrlKey||$(evt.target).is(":input")){return
}if(conf.keyboard!="static"&&current!=self){return
}var key=evt.keyCode;
if(vertical&&(key==38||key==40)){self.move(key==38?-1:1);
return evt.preventDefault()
}if(!vertical&&(key==37||key==39)){self.move(key==37?-1:1);
return evt.preventDefault()
}})
}if(conf.initialIndex){self.seekTo(conf.initialIndex,0,function(){})
}}$.fn.scrollable=function(conf){var el=this.data("scrollable");
if(el){return el
}conf=$.extend({},$.tools.scrollable.conf,conf);
this.each(function(){el=new Scrollable($(this),conf);
$(this).data("scrollable",el)
});
return conf.api?el:this
}
})(jQuery);