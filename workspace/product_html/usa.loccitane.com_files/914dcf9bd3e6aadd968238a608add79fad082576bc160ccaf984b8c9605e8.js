/* creation date: Wed, 26 Nov 2014 10:09:34 GMT
concat references:
http://usa.loccitane.com/js/_lib/jquery.countdown.min.js
http://usa.loccitane.com/js/OCC/generic/sparkle/jquery-canvas-sparkles.js
*/
var Countdown=this.Countdown=function(e){function t(t){if(e[t]){e[t]=" "+e[t]+" "}}t("days_label");t("hours_label");t("minutes_label");t("seconds_label");this.options=jQuery.extend({},this.defaults,e);this.init()};Countdown.prototype={defaults:{counter_selector:"#countdown",intro_message:"",complete_message:"",days_label:":",hours_label:":",minutes_label:":",seconds_label:"",is_ISO8601:true,time_api:"/ajax/UtilsAjax.aspx?nohtml=true&task=getUnixTimeNow&c="+OCMS.GlobalVars.C+"&l="+OCMS.GlobalVars.L},init:function(){this.counter=$(this.options["counter_selector"]);if(undefined!=this.options["end_time"]){if(this.options["is_ISO8601"]){this.end_time=new Date.fromISO(this.options["end_time"])}else{this.end_time=new Date(this.options["end_time"])}var e=(new Date).getTime();var t;$.ajax({type:"GET",url:this.options["time_api"],dataType:"json",context:this,cache:false}).done(function(e){this.start_time=new Date(e.data*1e3);var n=this.end_time.getTime()-this.start_time.getTime();this.days_remaining=Math.floor(n/864e5);n=n-this.days_remaining*864e5;this.hours_remaining=Math.floor(n/36e5);n=n-this.hours_remaining*36e5;this.minutes_remaining=Math.floor(n/6e4);n=n-this.minutes_remaining*6e4;this.seconds_remaining=n/1e3;var s=this;if(this.days_remaining>-1){if(this.options["intro_message"]){this.counter.before('<span class="intro_message">'+this.options["intro_message"]+"</span>")}r.call(this);t=setInterval(function(){r.call(s)},1e3)}else{i.call(s)}}).fail(function(){throw new Error("CountDown Plugin - failure getting time from timeAPI.org.")});function n(e){function t(e){return e<10?"0"+e:e}return e.getUTCFullYear()+"-"+t(e.getUTCMonth()+1)+"-"+t(e.getUTCDate())+"T"+t(e.getUTCHours())+":"+t(e.getUTCMinutes())+":"+t(e.getUTCSeconds())+"Z"}function r(){function n(e){var t=e+"";if(t.length<2){t="0"+t}return t}if(this.seconds_remaining<0){this.seconds_remaining=this.seconds_remaining+60;this.minutes_remaining--;if(this.minutes_remaining<0){this.minutes_remaining=59;this.hours_remaining--;if(this.hours_remaining<0){this.days_remaining--;this.hours_remaining=23}}}this.days_remaining=n(this.days_remaining);this.hours_remaining=n(this.hours_remaining);this.minutes_remaining=n(this.minutes_remaining);this.counter.html("<span>"+this.days_remaining+"</span>"+this.options["days_label"]+"<span>"+this.hours_remaining+"</span>"+this.options["hours_label"]+"<span>"+this.minutes_remaining+"</span>"+this.options["minutes_label"]+"<span>"+n(Math.floor(this.seconds_remaining))+"</span>"+this.options["seconds_label"]);var r=(new Date).getTime();var s=(r-e)/1e3;this.seconds_remaining=this.seconds_remaining-s;e=r;if(this.days_remaining<0){clearInterval(t);i.call(this);return false}}function i(){if(this.options["complete_message"]||this.options["complete_message"].length>0){this.counter.hide();$(".intro_message").hide();this.counter.after('<span class="complete_message">'+this.options["complete_message"]+"</span>")}else{this.counter.html("<span>"+0+"</span>"+this.options["days_label"]+"<span>"+0+"</span>"+this.options["hours_label"]+"<span>"+0+"</span>"+this.options["minutes_label"]+"<span>"+0+"</span>"+this.options["seconds_label"])}$(this.options["complete_selector"]).show()}}else{throw new Error("CountDown Plugin - end time not specified.")}}};jQuery.fn.countdown=function(e){new Countdown(e);return this};(function(){var e=new Date("2011-06-02T09:34:29+02:00");if(isNaN(e)||e.getUTCMonth()!==5||e.getUTCDate()!==2||e.getUTCHours()!==7||e.getUTCMinutes()!==34){Date.fromISO=function(e){var t,n,r=/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,i=r.exec(e)||[];if(i[1]){t=i[1].split(/\D/);for(var s=0,o=t.length;s<o;s++){t[s]=parseInt(t[s],10)||0}t[1]-=1;t=new Date(Date.UTC.apply(Date,t));if(!t.getDate())return NaN;if(i[5]){n=parseInt(i[5],10)*60;if(i[6])n+=parseInt(i[6],10);if(i[4]=="+")n*=-1;if(n)t.setUTCMinutes(t.getUTCMinutes()+n)}return t}return NaN}}else{Date.fromISO=function(e){return new Date(e)}}})();var __fstrzSep="";$(function(){"use strict";$.fn.sparkle=function(options){return this.each(function(k,v){var $this=$("#info_menu");var settings=$.extend({color:"#FFFFFF",count:130,overlap:0,speed:1,minSize:4,maxSize:7,direction:"both"},options);var sparkle=new Sparkle($this,settings);$("body").on({"mouseover.sparkle focus.sparkle":function(){sparkle.over($this)},"mouseout.sparkle blur.sparkle":function(){sparkle.out()}})})};function Sparkle($parent,options){this.options=options;this.init($parent)}Sparkle.prototype={init:function($parent){var cssOpts={position:"absolute",top:"-"+this.options.overlap+"px",left:"-"+this.options.overlap+"px","pointer-events":"none","z-index":"2"};if($parent.css("position")==="static"){}this.$canvas=$("<canvas>").addClass("sparkle-canvas").css(cssOpts).hide();if($parent.css("z-index")!=="auto"){var zdex=parseInt($parent.css("z-index"),10);this.$canvas.css("z-index",zdex+1)}var singletons="IMG|BR|HR|INPUT";var regexp="\\b"+$parent[0].nodeName+"\\b";this.isSingleton=(new RegExp(regexp)).test(singletons);if(this.isSingleton){this.$canvas.insertAfter($parent)}else{this.$canvas.prependTo($parent)}this.canvas=this.$canvas[0];this.context=this.canvas.getContext("2d");this.sprite=new Image;this.sprite.src=this.datauri;this.spriteCoords=[0,6,13,20];this.canvas.width=$parent.outerWidth()*1.2;this.canvas.height=$parent.outerHeight()*1.2;this.particles=this.createSparkles(this.canvas.width,this.canvas.height);this.anim=null;this.fade=false},randomParticleSize:function(){return Math.floor(Math.random()*(this.options.maxSize-this.options.minSize+1)+this.options.minSize)},randomHexColor:function(){return"#"+("000000"+Math.floor(Math.random()*16777215).toString(16)).slice(-6)},createSparkles:function(w,h){var tempicles=[];for(var i=0;i<this.options.count;i++){var color;if(this.options.color==="rainbow"){color=this.randomHexColor()}else if($.type(this.options.color)==="array"){color=this.options.color[Math.floor(Math.random()*this.options.color.length)]}else{color=this.options.color}var yDelta=Math.floor(Math.random()*1e3)-500;if(this.options.direction==="down"){yDelta=Math.floor(Math.random()*500)-550}else if(this.options.direction==="up"){yDelta=Math.floor(Math.random()*500)+50}tempicles[i]={position:{x:Math.floor(Math.random()*w),y:Math.floor(Math.random()*h)},style:this.spriteCoords[Math.floor(Math.random()*this.spriteCoords.length)],delta:{x:Math.floor(Math.random()*1e3)-500,y:yDelta},size:this.randomParticleSize(),color:color}}return tempicles},draw:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(var i=0;i<this.particles.length;i++){this.context.save();this.context.globalAlpha=this.particles[i].opacity;this.context.drawImage(this.sprite,this.particles[i].style,0,7,7,this.particles[i].position.x,this.particles[i].position.y,this.particles[i].size,this.particles[i].size);if(this.options.color){this.context.globalCompositeOperation="source-atop";this.context.globalAlpha=.6;this.context.fillStyle=this.particles[i].color;this.context.fillRect(this.particles[i].position.x,this.particles[i].position.y,7,7)}this.context.restore()}},update:function(){var _this=this;this.anim=window.requestAnimationFrame(function(time){var flatTime=Math.floor(time);for(var i=0;i<_this.particles.length;i++){var p=_this.particles[i];var resizeParticle=false;var randX=Math.random()>Math.random()*2;var randY=Math.random()<Math.random()*5;if(randX){p.position.x+=p.delta.x*_this.options.speed/1500}if(randY){p.position.y-=p.delta.y*_this.options.speed/800}if(p.position.x>_this.canvas.width){p.position.x=-_this.options.maxSize;resizeParticle=true}else if(p.position.x<-_this.options.maxSize){p.position.x=_this.canvas.width;resizeParticle=true}if(p.position.y>_this.canvas.height){p.position.y=-_this.options.maxSize;p.position.x=Math.floor(Math.random()*_this.canvas.width);resizeParticle=true}else if(p.position.y<-_this.options.maxSize){p.position.y=_this.canvas.height;p.position.x=Math.floor(Math.random()*_this.canvas.width);resizeParticle=true}if(resizeParticle){p.size=_this.randomParticleSize();p.opacity=.4}if(_this.fade){p.opacity-=.035}else{p.opacity-=.005}if(p.opacity<=.15){p.opacity=_this.fade?0:1.2}if(flatTime%Math.floor(Math.random()*7+1)===0){p.style=_this.spriteCoords[Math.floor(Math.random()*_this.spriteCoords.length)]}}_this.draw(time);if(_this.fade){_this.fadeCount-=1;if(_this.fadeCount<0){window.cancelAnimationFrame(_this.anim);_this.$canvas.hide()}else{_this.update()}}else{_this.update()}})},over:function($parent){this.canvas.width=$parent.outerWidth()+this.options.overlap*2;this.canvas.height=$parent.outerHeight()+this.options.overlap*2;if(this.isSingleton){this.$canvas.css({top:$parent.position().top-this.options.overlap,left:$parent.position().left-this.options.overlap})}this.$canvas.show();window.cancelAnimationFrame(this.anim);for(var i=0;i<this.options.count;i++){this.particles[i].opacity=Math.random()}this.fade=false;this.update()},out:function(){this.fade=true;this.fadeCount=100},datauri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAHCAYAAAD5wDa1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNDNFMzM5REEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNDNFMzM5RUEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM0M0UzMzlCQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM0M0UzMzlDQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jzOsUQAAANhJREFUeNqsks0KhCAUhW/Sz6pFSc1AD9HL+OBFbdsVOKWLajH9EE7GFBEjOMxcUNHD8dxPBCEE/DKyLGMqraoqcd4j0ChpUmlBEGCFRBzH2dbj5JycJAn90CEpy1J2SK4apVSM4yiKonhePYwxMU2TaJrm8BpykpWmKQ3D8FbX9SOO4/tOhDEG0zRhGAZo2xaiKDLyPGeSyPM8sCxr868+WC/mvu9j13XBtm1ACME8z7AsC/R9r0fGOf+arOu6jUwS7l6tT/B+xo+aDFRo5BykHfav3/gSYAAtIdQ1IT0puAAAAABJRU5ErkJggg=="}});$(document).ready(function(){if(OCMS.utils.browserDetection.isIE()!=true&&OCMS.GlobalVars.IsMobile==false){$("#info_menu").sparkle({color:["white"],minSize:4,maxSize:7,overlap:0,direction:"down",speed:.5})}if(OCMS.GlobalVars.IsMobile==false){$("#info_menu").css({background:"url(/img/OCC/redesign/design/info_menu_noel.jpg) repeat-x center bottom"});$("#content").css({background:"url(/img/OCC/redesign/design/background_noel_2014.jpg) repeat left top"})}})