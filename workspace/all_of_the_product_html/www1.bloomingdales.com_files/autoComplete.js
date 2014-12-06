(function(e){if(typeof define==="function"&&define.amd){define(["jquery","jqueryui-amd/core","jqueryui-amd/widget","jqueryui-amd/position","jqueryui-amd/menu"],e)}else{e(jQuery)}})(function(e){e.widget("ui.autocomplete",{version:"@VERSION",defaultElement:"<input>",options:{appendTo:null,autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),u=n==="textarea",o=n==="input";this.isMultiLine=u?true:o?false:this.element.prop("isContentEditable");this.valueMethod=this.element[u||o?"val":"text"];this.isNewMenu=true;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off");this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly")){t=true;s=true;i=true;return}t=false;s=false;i=false;var u=e.ui.keyCode;switch(n.keyCode){case u.PAGE_UP:t=true;this._move("previousPage",n);break;case u.PAGE_DOWN:t=true;this._move("nextPage",n);break;case u.UP:t=true;this._keyEvent("previous",n);break;case u.DOWN:t=true;this._keyEvent("next",n);break;case u.ENTER:if(this.menu.active){t=true;n.preventDefault();this.menu.select(n)}break;case u.TAB:if(this.menu.active){this.menu.select(n)}break;case u.ESCAPE:if(this.menu.element.is(":visible")){this._value(this.term);this.close(n);n.preventDefault()}break;default:i=true;this._searchTimeout(n);break}},keypress:function(s){if(t){t=false;if(!this.isMultiLine||this.menu.element.is(":visible")){s.preventDefault()}return}if(i){return}var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s);break}},input:function(e){if(s){s=false;e.preventDefault();return}this._searchTimeout(e)},focus:function(){this.selectedItem=null;this.previous=this._value()},blur:function(e){if(this.cancelBlur){delete this.cancelBlur;return}clearTimeout(this.searching);this.close(e);this._change(e)}});this._initSource();this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance");this._on(this.menu.element,{mousedown:function(t){t.preventDefault();this.cancelBlur=true;this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];if(!e(t.target).closest(".ui-menu-item").length){this._delay(function(){var t=this;this.document.one("mousedown",function(s){if(s.target!==t.element[0]&&s.target!==i&&!e.contains(i,s.target)){t.close()}})})}},menufocus:function(t,i){var s,n;if(this.isNewMenu){this.isNewMenu=false;if(t.originalEvent&&/^mouse/.test(t.originalEvent.type)){this.menu.blur();this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)});return}}n=i.item.data("ui-autocomplete-item");if(false!==this._trigger("focus",t,{item:n})){if(t.originalEvent&&/^key/.test(t.originalEvent.type)){this._value(n.value)}}s=i.item.attr("aria-label")||n.value;if(s&&jQuery.trim(s).length){this.liveRegion.children().hide();e("<div>").text(s).appendTo(this.liveRegion)}},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;if(this.element[0]!==this.document[0].activeElement){this.element.focus();this.previous=s;this._delay(function(){this.previous=s;this.selectedItem=i})}if(false!==this._trigger("select",e,{item:i})){this._value(i.value)}this.term=this._value();this.close(e);this.selectedItem=i}});this.liveRegion=e("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching);this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");this.menu.element.remove();this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t);if(e==="source"){this._initSource()}if(e==="appendTo"){this.menu.element.appendTo(this._appendTo())}if(e==="disabled"&&t&&this.xhr){this.xhr.abort()}},_appendTo:function(){var t=this.options.appendTo;if(t){t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)}if(!t||!t[0]){t=this.element.closest(".ui-front")}if(!t.length){t=this.document[0].body}return t},_initSource:function(){var t,i,s=this;if(e.isArray(this.options.source)){t=this.options.source;this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}}else if(typeof this.options.source==="string"){i=this.options.source;this.source=function(t,n){if(s.xhr){s.xhr.abort()}s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}}else{this.source=this.options.source}},_searchTimeout:function(e){clearTimeout(this.searching);this.searching=this._delay(function(){if(this.term!==this._value()){this.selectedItem=null;this.search(null,e)}},this.options.delay)},search:function(e,t){e=e!=null?e:this._value();this.term=this._value();if(e.length<this.options.minLength){return this.close(t)}if(this._trigger("search",t)===false){return}return this._search(e)},_search:function(e){this.pending++;this.element.addClass("ui-autocomplete-loading");this.cancelSearch=false;this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){if(t===this.requestIndex){this.__response(e)}this.pending--;if(!this.pending){this.element.removeClass("ui-autocomplete-loading")}},this)},__response:function(e){if(e){e=this._normalize(e)}this._trigger("response",null,{content:e});if(!this.options.disabled&&e&&e.length&&!this.cancelSearch){this._suggest(e);this._trigger("open")}else{this._close()}},close:function(e){this.cancelSearch=true;this._close(e)},_close:function(e){if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.blur();this.isNewMenu=true;this._trigger("close",e)}},_change:function(e){if(this.previous!==this._value()){this._trigger("change",e,{item:this.selectedItem})}},_normalize:function(t){if(t.length&&t[0].label&&t[0].value){return t}return e.map(t,function(t){if(typeof t==="string"){return{label:t,value:t}}return e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t);this.isNewMenu=true;this.menu.refresh();i.show();this._resizeMenu();i.position(e.extend({of:this.element},this.options.position));if(this.options.autoFocus){this.menu.next()}},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").text(i.label).appendTo(t)},_move:function(e,t){if(!this.menu.element.is(":visible")){this.search(null,t);return}if(this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)){if(!this.isMultiLine){this._value(this.term)}this.menu.blur();return}this.menu[e](t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){if(!this.isMultiLine||this.menu.element.is(":visible")){this._move(e,t);t.preventDefault()}}});e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=new RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}});e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments);if(this.options.disabled||this.cancelSearch){return}if(t&&t.length){i=this.options.messages.results(t.length)}else{i=this.options.messages.noResults}this.liveRegion.children().hide();e("<div>").text(i).appendTo(this.liveRegion)}});return e.ui.autocomplete});