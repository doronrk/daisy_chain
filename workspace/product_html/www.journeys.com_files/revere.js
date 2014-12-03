﻿$.getScript("/assets/js/libs/mustache.js");window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a)}};(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;d=c.pop();){a[d]=a[d]||b}})(function(){try{console.log();return window.console}catch(a){return window.console={}}}());REV={$ma:jQuery.noConflict(),base:null,companyID:null,productID:null,userID:null,hashPath:null,dataURL:null,placeholders:{},revTypeArray:new Array,revType:null,jsonData:{},pageSize:0,snippetCount:0,callback:null,submitReview:null,init:function(a,b,c,d){REV.hashPath=UTIL.createHash(d);REV.dataURL=REV.base+"data/"+c+"/"+REV.hashPath+"/"+d+".js";REV.companyID=c;REV.productID=d;REV.revTypeArray=a.split(",");REV.$ma.ajax({url:REV.dataURL,dataType:"jsonp",jsonp:"callback",jsonpCallback:"UTIL.jsonResult"});REV.WRITE.submitClick()},REV:{},READ:{tmplPath:"/assets/js/rev_templates/read/",view:[],div:null,lastVis:null,lastIdx:null,drawTemplate:function(a,b){REV.READ.tmplPath="/assets/js/rev_templates/read/";REV.READ.div=a;if(b===undefined||b==""){REV.READ.tmplPath+="template.html"}else{REV.READ.tmplPath+=b+".html"}REV.$ma.ajax({url:REV.READ.tmplPath,cache:false,success:function(a){var b=Mustache.to_html(a,REV.jsonData);REV.READ.div.html(b);if(REV.jsonData.reviews.length>REV.pageSize){REV.$ma("div#revere-reviews div.review:nth-child("+REV.pageSize+")").nextAll("div.review").addClass("hidden");REV.$ma("a#rev-link-next").removeClass("hidden");REV.READ.showNext()}},error:function(a,b,c){window.log(a,b,c)}})},showNext:function(){var a=REV.pageSize+1;REV.$ma("div#revere-reviews a#rev-link-next").live("click",function(b){REV.READ.lastVis=REV.$ma("div#revere-reviews div.review:visible:last");REV.READ.lastIdx=REV.$ma("div#revere-reviews div.review").index(REV.READ.lastVis);b.preventDefault();var c=REV.$ma(this);for(i=REV.READ.lastIdx;i<REV.READ.lastIdx+a;i++){REV.$ma("div#revere-reviews div.review:eq("+i+")").removeClass("hidden")}REV.READ.showNext()})}},WRITE:{submitClick:function(){REV.$ma("button#rev-write-submit").live("click",function(a){a.preventDefault();a.stopPropagation();REV.WRITE.submitReview()})},tmplPath:"/assets/js/rev_templates/write/",view:[],div:null,textFields:[],radioFields:[],ddlFields:[],checkFields:[],textAreas:[],hiddenFields:[],errorFields:new Array,jsonStr:"",jsonpsubmit:function(a){var b;if(REV.$ma.browser.msie&&window.XDomainRequest){b=REV.$ma.parseJSON(a)}else{b=a}$("div#rev-write-review-form div.control-group").removeClass("error");if(b.message!=="ok"){for(i=0,errors=b.errors.length;i<errors;i++){$('div.control-group[data-field-name="'+b.errors[i].field+'"]').addClass("error")}$("div#rev-error").slideDown()}else{$("div#rev-write-review-form div.control-group").removeClass("error");$("div#rev-error,div#rev-write-review-form fieldset,div#rev-write-review-form .form-actions,a#btn-write-rev").hide();$("div#rev-success").slideDown();$("html,body").animate({scrollTop:$("div#rev-write-review-form").offset().top-100},200,"easeInQuad")}},drawTemplate:function(a,b){REV.WRITE.tmplPath="/assets/js/rev_templates/write/";REV.WRITE.div=a;if(b===undefined||b==""){REV.WRITE.tmplPath+="template.html"}else{REV.WRITE.tmplPath+=b+".html"}REV.WRITE.view=REV.jsonData;REV.$ma.ajax({url:REV.WRITE.tmplPath,cache:false,success:function(a){var b=Mustache.to_html(a,REV.jsonData);REV.WRITE.div.html(b)},error:function(a,b,c){window.log(a,b,c)}})},checkReqInput:function(a){switch(a.attr("type")){case"text":if(a.val().length<1){this.errorFields.push(a.parents("div.control-group"))}break;case"radio":var b=a.attr("name");if(REV.$ma('input:radio[name="rev-rad-'+b+'"]:checked').val()===undefined){this.errorFields.push(a.parents("div.control-group"))}break;case"checkbox":var c=a.attr("name");if(REV.$ma('input:checkbox[name="rev-chk-'+c+'"]:checked').val()===undefined){this.errorFields.push(a.parents("div.control-group"))}break}},checkReqDDL:function(a){if(a.children("option:selected").val().length<1){this.errorFields.push(a.parents("div.control-group"))}},checkReqTA:function(a){if(a.val().length<1){this.errorFields.push(a.parents("div.control-group"))}},submitReview:function(){REV.WRITE.jsonStr='{"review":{"companyID":"'+REV.companyID+'","productID":"'+REV.productID+'","nickname":';var a=REV.$ma("div#rev-write-review-form");var b=new Array;this.dataFields=a.find("div.rev-review-fields");for(var c=0;c<this.dataFields.length;c++){var d=REV.$ma(this.dataFields[c]);d.children('input[type="text"]').each(function(){REV.WRITE.textFields.push(REV.$ma(this))});d.children('input[type="radio"]').each(function(){REV.WRITE.radioFields.push(REV.$ma(this))});d.children("select").each(function(){REV.WRITE.ddlFields.push(REV.$ma(this))});d.children('input[type="checkbox"]').each(function(){REV.WRITE.checkFields.push(REV.$ma(this))});d.children("textarea").each(function(){REV.WRITE.textAreas.push(REV.$ma(this))});d.children("hidden").each(function(){REV.WRITE.hiddenFields.push(REV.$ma(this))})}REV.WRITE.jsonStr+='"'+REV.$ma("input#rev-txt-nickname").val()+'"';REV.WRITE.jsonStr+=',"email":"'+REV.$ma("input#rev-txt-email").val()+'"';REV.WRITE.jsonStr+=',"revtitle":"'+REV.$ma("input#rev-txt-revtitle").val()+'"';REV.WRITE.jsonStr+=',"overall":"'+REV.$ma('div#rev-overall input[type="radio"]:checked').val()+'"';REV.WRITE.jsonStr+=',"userID":"'+REV.userID+'"';REV.WRITE.jsonStr+=',"location":""';REV.WRITE.jsonStr+=',"userAttributes":[]';REV.WRITE.jsonStr+=',"attributes":[';if(REV.WRITE.view.attributes.length>0){for(var c=0;c<REV.WRITE.view.attributes.length;c++){b[c]="";REV.$ma('div[data-rev-field="rev-attr-'+REV.WRITE.view.attributes[c].name+'"] input').each(function(){if(REV.$ma(this).is(":checked")){b[c]+=REV.$ma(this).val()+","}});REV.WRITE.jsonStr+='{"fieldname": "'+REV.WRITE.view.attributes[c].name+'", "label": "'+REV.WRITE.view.attributes[c].label+'", "value":"'+b[c]+'"}';if(c!=REV.WRITE.view.attributes.length-1){REV.WRITE.jsonStr+=","}}}REV.WRITE.jsonStr+='],"review":"'+REV.$ma("textarea#rev-txt-general").val()+'","notes":""';REV.WRITE.jsonStr+="}}";REV.$ma.support.cors=true;if(REV.$ma.browser.msie&&window.XDomainRequest){var e=new XDomainRequest;e.open("post",REV.base+"svc/postreview.aspx");e.onload=function(){REV.WRITE.jsonpsubmit(e.responseText)};e.send(REV.WRITE.jsonStr)}else{REV.$ma.ajax({type:"POST",url:REV.base+"svc/postreview.aspx",data:REV.WRITE.jsonStr,dataType:"json",async:false,crossDomain:true,contentType:"application/json; charset=utf-8",success:function(a){REV.WRITE.jsonpsubmit(a)},error:function(a,b,c){window.log(a.status);window.log(c)}})}}},SNIPPET:{tmplPath:"/assets/js/rev_templates/snippet/",dataURL:"",view:[],div:null,snipIdx:0,jsonphookup:function(a){REV.SNIPPET.view=REV.$ma.parseJSON(a);REV.$ma.ajax({url:REV.SNIPPET.tmplPath,cache:false,success:function(b){var c=Mustache.to_html(b,a);REV.SNIPPET.div.html(c);if(REV.SNIPPET.snipIdx+1<REV.snippetCount){REV.SNIPPET.drawTemplate(REV.SNIPPET.snipIdx+1)}},error:function(a,b,c){window.log(a,b,c)}})},getRatings:function(){REV.$ma.ajax({url:REV.SNIPPET.dataURL,dataType:"jsonp",jsonp:"callback",jsonpCallback:"REV.SNIPPET.jsonphookup"})},drawTemplate:function(a){REV.SNIPPET.snipIdx=a;REV.SNIPPET.tmplPath="/assets/js/rev_templates/snippet/";REV.SNIPPET.div=REV.$ma(REV.placeholders[a]);var b=REV.SNIPPET.div.data("tmpl");if(b===undefined||b==""){REV.SNIPPET.tmplPath+="template.html"}else{REV.SNIPPET.tmplPath+=b+".html"}REV.hashPath=UTIL.createHash(""+REV.SNIPPET.div.data("pid"));REV.SNIPPET.dataURL=REV.base+"data/"+REV.companyID+"/"+REV.hashPath+"/"+REV.SNIPPET.div.data("pid")+"_s.js";REV.SNIPPET.getRatings()}}};UTIL={namespace:REV,logit:function(a){window.log(a)},createHash:function(a){var b=0;var c;for(c=0;c<a.length;c++){var d=a.charCodeAt(c);d=d*Math.abs(255-d);b+=d}b=b%1023;b=b+"";var e=4;var f=b.split("");for(c=0;c<e-b.length;c++){f.unshift("0")}b=f.join("");b=b.substring(0,e/2)+"/"+b.substring(e/2,e);return b},jsonResult:function(a){REV.jsonData=a;for(var b=0;b<REV.revTypeArray.length;b++){REV.revType=REV.revTypeArray[b].toUpperCase();REV.placeholders=REV.$ma("body").find("[data-rev=rev-"+REV.revTypeArray[b].toLowerCase()+"]");var c=null,d=null,e=null;if(REV.revType!="SNIPPET"){REV.placeholders.each(function(){c=null;d=null;c=REV.$ma(this);d=c.data("tmpl");REV[REV.revType].drawTemplate(c,d)})}else{REV.snippetCount=REV.$ma("body").find("[data-rev=rev-snippet]").length;REV.SNIPPET.drawTemplate(0)}}}};REV.$ma(function(){})