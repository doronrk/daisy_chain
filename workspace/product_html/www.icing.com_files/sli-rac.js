(function(window){
/*!*/
var racOpts={version:"1.6",base:"http://icingusa.resultspage.com",onsubmit:undefined};
/*!*/
var currency=readCookie("currency_iso");if(currency){racOpts.params="/search?ts=rac&currency_iso="+escape(currency)+"&w="}function readCookie(name){name=name.replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1");var regex=new RegExp("(?:^|;)\\s?"+name+"=(.*?)(?:;|$)","i"),match=document.cookie.match(regex);return match&&unescape(match[1])}if(document.location.protocol=="https:"){racOpts.base=racOpts.base.replace(/^https?:/i,"https:")
}if(document.location.href.match(/\.local|resultsdemo/)){racOpts.base="http://"+document.domain}racOpts.onsubmit=function(param){try{var racType="";var cType="";if(param.url.match(/rt=racsug/)){racType="&ractype=suggestion";cType="racsug"}else{racType="&ractype=product";ctype="racclick"}var urlToTrack="/search?w="+param.query+"&ts=rac"+racType;dataLayer.push({event:"virtualpageview",url:urlToTrack})}catch(err){}};Function.prototype.slibind=function(obj){var method=this,temp=function(){return method.apply(obj,arguments)
};return temp};var sliAutocomplete={opts:{version:"",path:racOpts.base+"/rac/custom.sli-rac.stub",ext:"js",https:true},init:function(opts){for(var i in opts){this.opts[i]=opts[i]}this.load()},load:function(){var obj=this;if(obj.oScript){obj.stubInit()}else{obj.oScript=document.createElement("script");obj.oScript.type="text/javascript";var path=obj.opts.path+".";if(obj.opts.version!=""){path+=obj.opts.version+"."}path+=obj.opts.ext;if(obj.opts.https&&document.location.protocol=="https:"){path=path.replace(/^https?:/i,"https:")
}obj.oScript.src=path;document.body.appendChild(obj.oScript)}},extend:function(obj){if(obj.extend){obj.extend(this)}else{for(var i in obj){this[i]=obj[i]}}}};window.sliAutocomplete=sliAutocomplete;if(jQuery.ready){jQuery(document).ready(function(){window.sliAutocomplete.init(racOpts)})}else{window.sliAutocomplete.init(racOpts)}})(window);