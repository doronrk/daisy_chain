asap("lodash").then(function(){"use strict";function a(a,b,c){function d(a,b){if(f[a]){for(var c=0,d=f[a].length;d>c;c++)f[a][c].call(g,b);return g}}function e(a,b){return _.isFunction(b)?(f[a]||(f[a]=[]),f[a].push(b),g):void 0}var f={},g={on:e,trigger:d,config:c||{},model:b||{}};return _.each(a||[],function(a){a.call(g)}),g}asap("silent_hero").resolve(a)}),asap("silent_hero","search_box_validation","search_type_ahead","search_type_request","search_type_ahead_tracking").then(function(a){function b(b,c){var d=[a.search_type_ahead,a.search_type_request,a.search_box_validation,a.search_type_ahead_tracking];return c||(c={}),b=$.extend({type_ahead_base_url:"/"+jsContextRoot+"/search/type_ahead/json.jsp",search_form_selector:"#siteSearch_form",search_input_selector:"#siteSearch_input",type_ahead_min_length:2,type_ahead_request_delay:100},b),a.silent_hero(d,c,b)}asap("search_box").resolve(b)}),asap("framework").then(function(){asap("search_prefill_input_terms").resolve(function(){var a=this,b=a.model.terms,c=a.config.search_input_selector,d=$(c);d&&b&&d.val(b)})}),asap("framework").then(function(){var a=["suggestions"],b=1,c=0,d={leading:!0,trailing:!0};asap("search_type_request").resolve(function(){function e(){var a,b=["Dy=1"],c=h.model.terms||"";return c.length<j?f({}):(b.push("Ntt="+c+"*"),g=a=[h.config.type_ahead_base_url,b.join("&")].join("?"),void(i[a]?f(i[a]):$.getJSON(a,function(b){i[a]=b,a==g&&f(b)})))}function f(b){_.each(a,function(a){h.model[a]=b[a]}),h.trigger("suggest")}var g,h=this,i={},j=h.config.type_ahead_min_length||b,k=h.config.type_ahead_request_delay||c;h.on("type",k?_.throttle(e,k,d):e)})}),asap("framework").then(function(){asap("search_box_validation").resolve(function(){function a(){f.val()&&h.validate(d)}var b=this,c=b.config.search_input_selector,d=b.config.search_form_selector,e=b.config.search_invalid_input_message;if(c&&d&&e){var f=$(c),g={toolTipOpts:{bottom:0,className:"revErrorTooltip errorTT",top:0},forms:[{formSelector:d,fields:[{fieldSelector:c,rules:["required"],message:e}]}]},h=new Validator($.extend(new BaseValidatorOpts,g));return f.on("keyup",a),h}})}),asap("framework").then(function(){var a=38,b=40,c=13,d=27,e=5,f="has_suggestions",g="selected",h="up",i="down",j=Modernizr.touch?"touchstart":"mousedown";asap("search_type_ahead").resolve(function(){function k(a){var b=a.which;l(b)?(a.preventDefault(),o(b)):m()}function l(e){switch(e){case a:case b:case c:case d:return!0}return!1}function m(){var a=B.val();z.model.terms=a,z.trigger("type")}function n(){return z.model.suggestions&&z.model.suggestions.labels.length}function o(e){if(n())switch(e){case a:return y(h);case b:return y(i);case c:return x();case d:return s()}}function p(){var a,b="";n()&&(a=_.map(_.first(z.model.suggestions.labels,C),q).sort(r),b=_.map(a,t).join("")),A[n()?"addClass":"removeClass"](f),D.html(b)}function q(a){return(a||"").toLowerCase()}function r(a,b){var c=z.model.terms.toLowerCase(),d=a.indexOf(c),e=b.indexOf(c);return(~d?!~e:~e)?~d?-1:1:(d?!e:e)?d-e:a.localeCompare(b)}function s(){A.removeClass(f)}function t(a){return"<li data-type='suggestion'>"+u(a)+"</li>"}function u(a){var b=z.model.terms.toLowerCase();return a.replace(b,"<strong>"+b+"</strong>")}function v(a){var b=z.model.suggestions.suggestions[a];b&&(window.location.href="/"+jsContextRoot+"/search/index.jsp?Ntt="+a)}function w(a){a.preventDefault(),v($(this).text())}function x(){var a=D.find("."+g);a.length&&v(a.text())}function y(a){var b,c=a==h?"prev":"next",d=a==h?"last":"first",e=D.find("."+g);e.length&&(b=e[c](),e.removeClass(g)),b&&b.length||(b=D.find("li")[d]()),b.addClass(g)}var z=this,A=$(z.config.search_form_selector),B=$(z.config.search_input_selector),C=z.config.search_suggestion_max||e,D=$("<ul class='search_suggestion_list'></ul>");B&&A&&(A.append(D),B.on("keyup",k),B.on("focusout",s),D.on(j,"li",w),z.on("suggest",p))})}),asap("framework").then(function(){var a="no refinements",b="search",c=b+" typeahead",d=Modernizr.touch?"touchstart":"mousedown";asap("search_type_ahead_tracking").resolve(function(){function e(){var d=$(this).text(),e=f.model.suggestions.suggestions[d],g=f.model.terms.toLowerCase();e&&asap("omniture").then(function(){utag.track("link",{refinementTypes:a,refinementValues:a,searchQuery:"ta:"+g+">"+d,productFindingMethod:b,merchandisingCategory:b,searchType:c})})}var f=this,g=$(f.config.search_form_selector);g.on(d,".search_suggestion_list li",e)})});