var thisPageUsingOtherJSLibrary=false,sli_rac_status="Script init";function sli_loadRAC(){sli_getScript("//aeropostale.resultspage.com/rac/sli-rac.config.js",function(){sli_rac_status="Loaded RAC"})}function sli_getScript(url,success){var script=document.createElement("script");script.src=url;var head=document.getElementsByTagName("head")[0],done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();script.onload=script.onreadystatechange=null;
head.removeChild(script)}};head.appendChild(script)}if(typeof jQuery=="undefined"){if(typeof $=="function"){thisPageUsingOtherJSLibrary=true}sli_getScript("//assets.resultspage.com/js/jquery-1.9.1.min.js",function(){if(typeof jQuery=="undefined"){sli_rac_status="Failed loading jQuery"}else{sli_rac_status="Loading RAC";if(thisPageUsingOtherJSLibrary){window.jQuery=$.noConflict()}sli_loadRAC()}})}else{sli_loadRAC()};