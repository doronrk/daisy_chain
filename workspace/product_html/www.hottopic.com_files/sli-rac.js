(function(window){
/*!*/
var racOpts={version:"1.4",base:"http://hottopic.resultspage.com",onsubmit:undefined};
/*!*/
if(document.location.protocol=="https:"){racOpts.base=racOpts.base.replace(/^https?:/i,"https:")}if(document.location.href.match(/dev-test.hottopic.com/)){racOpts.base="http://dev-test.hottopic.com"}if(document.location.href.match(/qa-test.hottopic.com/)){racOpts.base="http://qa-test.hottopic.com"}if(document.location.href.match(/htp1s1.hottopic.com/)){racOpts.base="http://hottopic.resultsstage.com"
}racOpts.onsubmit=function(param){try{var racType="";var cType="";if(param.url.match(/rt=racsug/)){racType="&ractype=suggestion";cType="racsug"}else{racType="&ractype=product";ctype="racclick"}var urlToTrack="/search?w="+param.query+"&ts=rac"+racType;_gaq.push(["_trackPageview",urlToTrack])}catch(err){}};Function.prototype.slibind=function(obj){var method=this,temp=function(){return method.apply(obj,arguments)};return temp};var sliAutocomplete={opts:{version:"",path:"http://assets.resultspage.com/js/rac/sli-rac.stub",ext:"js",https:true},init:function(opts){for(var i in opts){this.opts[i]=opts[i]
}if(window.sli&&window.sli.global&&window.sli.global.path){this.opts.path=window.sli.global.path}this.load()},load:function(){var obj=this;if(obj.oScript){obj.stubInit()}else{obj.oScript=document.createElement("script");obj.oScript.type="text/javascript";var path=obj.opts.path+".";if(obj.opts.version!=""){path+=obj.opts.version+"."}path+=obj.opts.ext;if(obj.opts.https&&document.location.protocol=="https:"){path=path.replace(/^https?:/i,"https:")}obj.oScript.src=path;document.body.appendChild(obj.oScript)}},extend:function(obj){if(obj.extend){obj.extend(this)
}else{for(var i in obj){this[i]=obj[i]}}}};window.sliAutocomplete=sliAutocomplete;if(jQuery.ready){jQuery(document).ready(function(){window.sliAutocomplete.init(racOpts)})}else{window.sliAutocomplete.init(racOpts)}})(window);