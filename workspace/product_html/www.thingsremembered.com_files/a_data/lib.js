(function(a){var b=window.lib={layer:{initManager:function(){a(window).unbind("resize.layerManager").bind("resize.layerManager",function(){a(".lib__keepcentered").each(function(){b.layer.center("#"+a(this).attr("id"))});a(".lib__shouldbecentered").each(function(){a(this).addClass("lib__keepcentered").removeClass("lib__shouldbecentered");b.layer.center("#"+a(this).attr("id"))})}).unbind("scroll.layerManager").bind("scroll.layerManager",function(){a(".lib__keepcentered").each(function(){b.layer.center("#"+a(this).attr("id"))})})},create:function(c,d){var d=a.extend({closeSelector:"#_none",url:null,defaultContent:"",xPos:null,yPos:null,keepCentered:false,callback:null,method:"get",data:null,transition:false},d);b.layer.add(c,d);if(d.url!=null){if(d.method=="get"){a.get(d.url,d.data,function(e){d.defaultContent=e;b.layer.add(c,d);if(d.callback!=null){d.callback()}})}else{a.post(d.url,d.data,function(e){d.defaultContent=e;b.layer.add(c,d);if(d.callback!=null){d.callback()}})}}else{if(d.callback!=null){d.callback()}}},add:function(e,f){b.layer.remove(e);var d=(f.transition)?('class="lib__transition" style="opacity: 0; filter: alpha(opacity=0)"'):"";var c='<div id="'+e.split("#")[1]+'" '+d+"></div>";a("body").append(c);if(f.xPos!=null&&f.yPos!=null){a(e).css("left",f.xPos+"px").css("top",f.yPos+"px");a(e).append(f.defaultContent)}else{if(f.keepCentered){a(e).addClass("lib__keepcentered")}b.layer.center(e);a(e).append(f.defaultContent);b.layer.center(e)}if(f.transition){a(e).fadeTo(250,1)}b.layer.closeButton(f.closeSelector,e)},remove:function(c){a(c).remove()},closeButton:function(d,c){a(c+" "+d).unbind("click.lib.layer.close").bind("click.lib.layer.close",function(e){e.preventDefault();b.layer.remove(c)})},center:function(d){var f=b.screen.position();var g=b.screen.size();var c=0;c=((g[0]-a(d).width())/2);c=(c<0)?20:c;c+=f[0];var e=0;e=((g[1]-a(d).height())/2);e=(e<0)?20:e;e+=f[1];if((a(d).width()>g[0])||(a(d).height()>g[1])){if(a(d).hasClass("lib__keepcentered")){a(d).removeClass("lib__keepcentered").addClass("lib__shouldbecentered")}}a(d).css("top",e+"px").css("left",c+"px")}},screen:{position:function(){if(typeof(window.pageYOffset)=="number"){return[window.pageXOffset,window.pageYOffset]}else{if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){return[document.body.scrollLeft,document.body.scrollTop]}else{if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){return[document.documentElement.scrollLeft,document.documentElement.scrollTop]}else{return[0,0]}}}},size:function(){var d=0,c=0;if(typeof(window.innerWidth)=="number"){d=window.innerWidth;c=window.innerHeight}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){d=document.documentElement.clientWidth;c=document.documentElement.clientHeight}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){d=document.body.clientWidth;c=document.body.clientHeight}}}return[d,c]}}};a(function(){b.layer.initManager()})})($);