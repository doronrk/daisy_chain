(function(b){if(b){var l={autocomplete:!0,sayt:!1,account:"",searchDomain:"",inputElement:"",inputFormElement:"",delay:150,minLength:3,maxResults:10,browserAutocomplete:!1,submitOnSelect:!0,queryCaseSensitive:!1,startsWith:!1,highlightWords:!0,highlightWordsBegin:!1,header:"",footer:""};b.fn.AdobeAutocomplete=function(a){a=b.extend(l,a);b.extend(b.ui.autocomplete.prototype,{highlightMatches:function(b,e){if(a.highlightWords||a.highlightWordsBegin)e=e.replace(RegExp("("+(a.highlightWordsBegin?"^":
"")+b+")","i"),"<strong>$1</strong>");return e}});var k={getAutocompleteRequest:function(a,b){for(var g=document.getElementById("sp_staged")?document.getElementById("sp_staged").value:0,j=document.location.protocol=="https:"?"https:":"http:",g=g?"-stage/":"/",f=a.account.split(""),h="",i=0,d=0;d<f.length;d++)d>=2?(i++,i==2?(i=0,h+=d!=f.length-1?f[d]+"/":f[d]):h+=f[d]):h+=f[d];return j+"//content.atomz.com/autocomplete/"+h+g+"?query="+b+"&callback=?"},source:function(c,e){if(!c.term)c.term="";var g=this.options.getAutocompleteRequest(a,
c.term);a.browserAutocomplete||b(a.inputFormElement).attr("autocomplete","off");if(c.term){var j=this;b.getJSON(g,function(f){var h=null,i=j.options.queryCaseSensitive?"":"i",d=0,g=a.maxResults?a.maxResults:1E4,h=a.startsWith?RegExp("^"+b.ui.autocomplete.escapeRegex(c.term),i):RegExp(b.ui.autocomplete.escapeRegex(c.term),i);e(b.map(f,function(a){if(h.test(a)&&d<g)return d++,{label:j.highlightMatches(c.term,a),value:a}}));if(a.maxResults)f.length=a.maxResults})}},open:function(c){c.keyCode!=40&&c.keyCode!=
38&&(b(".ui-autocomplete.ui-menu.ui-widget.ui-widget-content.ui-corner-all > li:first").prepend(a.header),b(".ui-autocomplete.ui-menu.ui-widget.ui-widget-content.ui-corner-all > li:last").append(a.footer),b(".ui-autocomplete.ui-menu.ui-widget.ui-widget-content.ui-corner-all li").each(function(){t=b(this).find("a").html();t=t.replace(/\&lt;b\&gt;/g,"<strong>");t=t.replace(/\&lt;\/b\&gt;/g,"</strong>");b(this).find("a").html(t)}))},select:function(c,e){b(a.inputElement).val(e.item.value);if(typeof a.onselect===
"function")a.onselect(c,e);a.submitOnSelect&&b(a.inputFormElement).submit()},search:function(b,e){if(typeof a.onsearch==="function")a.onsearch("","",b,e);return a.sayt?!1:a.autocomplete}},k=b.extend(k,a);b.extend(b.ui.autocomplete.prototype.options,k);return this.autocomplete(a)}}})(jQuery);