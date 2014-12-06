BLOOMIES.namespace("BLOOMIES.util");BLOOMIES.util.Url={_parameterHashDict:undefined,_parameterSearchDict:undefined,getParameter:function(b){var a=undefined;if(this.getHashParameter(b)!=undefined){a=this.getHashParameter(b)}else{a=this.getQueryStringParameter(b)}return a},getQueryStringParameter:function(a){return this._getParameterPrivate(a,"search")},getHashParameter:function(a){return this._getParameterPrivate(a,"hash")},_getParameterPrivate:function(b,c){try{if(c=="hash"||c==null){if(!this._parameterHashDict){this._parameterHashDict=this._parseParamString(location.hash)}return this._parameterHashDict[b]}else{if(!this._parameterSearchDict){this._parameterSearchDict=this._parseParamString(location.search)}return this._parameterSearchDict[b]}}catch(a){throw new BLOOMIES.Exception(a,"BLOOMIES.util.UrlUtility.getParameterBase")}},_parseParamString:function(a){qs=new String(a);if(qs.length==0){return{}}if(qs.charAt(0)=="#"||qs.charAt(0)=="?"){qs=qs.substr(1,qs.length).split("&")}else{qs=qs.split("&")}qsDict={};for(i=0;i<qs.length;i++){qsElem=qs[i].split("=");if(qsDict[qsElem[0]]){if(typeof qsDict[qsElem[0]]=="string"){qsDict[qsElem[0]]=[qsDict[qsElem[0]],qsElem[1]]}else{qsDict[qsElem[0]]=qsDict[qsElem[0]].concat(qsElem[1])}}else{qsDict[qsElem[0]]=qsElem[1]}}return qsDict},parseHashUrl:function(){qs=new String(paramString);qs=qs.substr(1,qs.length).split("&");qsDict={};for(i=0;i<qs.length;i++){qsElem=qs[i].split("=");if(qsDict[qsElem[0]]){qsDict[qsElem[0]]=qsDict[qsElem[0]].concat(qsElem[1])}else{qsDict[qsElem[0]]=[qsElem[1]]}}if(paramType=="hash"||paramType==null){this._parameterHashDict=qsDict}else{this._parameterSearchDict=qsDict}if(qsDict[param]){myValue=qsDict[param]}},getDomainName:function(){return location.hostname},getPathname:function(){return location.pathname},getProtocol:function(){var a=location.protocol;a=a.substr(0,a.length-1);return a},updateSearch:function(a){window.location.href=location.protocol+"//"+location.host+location.pathname+a+location.hash},updatePathname:function(a){window.location.href=location.protocol+"//"+location.host+a+location.search+location.hash}};