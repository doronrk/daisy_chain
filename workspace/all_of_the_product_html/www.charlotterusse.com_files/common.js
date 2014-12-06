/* please do not remove, namespace reserved for use by PDP and quick shop hopup, */
var CommonJS = {
	isEmpty: function(str) {
		return (str == null || (str.replace(/\s*/g,"") == ""));
	}
}

/* Contains a set of functions that provide useful utility functionality when interacting with a request. */
var requestUtil = {
    /* Removes a parameter and it's value by providing both the parameter name and value from the given URL. */
    removeParamValue: function(url, param, value) {
        var baseUrl = this.getBaseUrl(url);
        var params = this.getQueryStringParams(url);
        var firstParam = true;
        var queryString = '';
        for (var i = 0; i < params.length; i++) {
            if (decodeURI(params[i]) == (param + "=" + value)) {
                continue;
            } else if (params[i] != '') {
                queryString += (firstParam) ? '' : '&';
                queryString += params[i];
                firstParam = false;
            }
        }

        return this.buildUrl(baseUrl, queryString);
    },

    /* Removes all instances of the parameter and it's value by providing the parameter name from the given URL. */
    removeParams: function(url, param) {
        var baseUrl = this.getBaseUrl(url);
        param = encodeURI(param);
        var params = this.getQueryStringParams(url);
        var firstParam = true;
        var queryString = '';
        for (var i = 0; i < params.length; i++) {
            if (params[i].indexOf(param) == -1 && params[i] != '') {
                queryString += (firstParam) ? '' : '&';
                queryString += params[i];
                firstParam = false;
            }
        }

        return this.buildUrl(baseUrl, queryString);
    },

    /* Inserts the parameter and value to the given URL. */
    insertParam: function(url, param, value) {
        if (param == '' || value == '') {
            return url;
        }
        var baseUrl = this.getBaseUrl(url);
        param = encodeURI(param);
        value = encodeURI(value);
        var queryString = url.replace(baseUrl, '').replace('?', '');
        queryString += (queryString != '') ? '&' : '';
        queryString += param + '=' + value;

        return this.buildUrl(baseUrl, queryString);
    },

    /* Updates all instances of the parameter with the new value from the given URL. */
    updateParam: function(url, param, value) {
        var baseUrl = this.getBaseUrl(url);
        param = encodeURI(param);
        value = encodeURI(value);
        if (param == '') {
            return url;
        }
        if (value == '') {
            return this.removeParams(url, param);
        }
        if (!stringUtil.contains(url, param)) {
            return this.insertParam(url, param, value);
        }
        var params = this.getQueryStringParams(url);
        var queryString = '';
        if (params.length == 0) {
            queryString = param + '=' + value;
        } else {
            for (var i = 0; i < params.length; i++) {
                queryString += (i > 0) ? '&' : '';
                if (params[i].indexOf(param) >= 0 && params[i] != '') {
                    queryString += param + '=' + value;
                } else {
                    queryString += params[i];
                }
            }
        }
        return this.buildUrl(baseUrl, queryString);
    },

    /* Returns an array of query string parameters from the given URL. (i.e. [parameterName=parameterValue])  */
    getQueryStringParams: function(url) {
        if (url == '') {
            return [];
        }
        if (url.indexOf('?') >= 0) {
            url = url.split('?')[1];
        }
        url = '?' + url;

        return url.substr(1).split('&');
    },

    /* Returns a query string parameter value from the given URL. If the parameter is not found, then the default will be returned. */
    getQueryStringValue: function(url, key, default_) {
        var params = this.getQueryStringParams(url);
        var queryString = '';
        if (params.length == 0) {
            return default_;
        } else {
            for (var i = 0; i < params.length; i++) {
                if (params[i].indexOf(key) <= 0 && params[i] != '') {
                    return params[i].split('=')[1];
                }
            }
        }
        return default_;
    },

    /* Returns the base URL portion of the given URL without query string parameters. */
    getBaseUrl: function(url) {
        if (url == '') {
            return '';
        }
        if (url.indexOf('?') >= 0) {
            url = url.split('?')[0];
        }
        return url;
    },

    /* Returns the full URL by combining both the base URL and the query string parameters while handling the question marks and ampersands. */
    buildUrl: function(url, queryString) {
        if (url == '' && queryString == '') {
            return '?';
        }
        /* Check if the URL doesn't contain a question mark then add it to the query string. */
        if (url.indexOf('?') < 0 && !stringUtil.beginsWith(url, '?')) {
            queryString = '?' + queryString;
        }
        /* Check if the URL contains a question mark and doesn't end with a question mark or ampersand. */
        if (url.indexOf('?') >= 0 && !stringUtil.endsWith(url, '?') && !stringUtil.endsWith(url, '&')) {
            // If so, ensure the query string begins with an ampersand.
            if (queryString != '' && !stringUtil.beginsWith(queryString, '&')) {
                queryString = '&' + queryString;
            }
        }

        return url + queryString;
    }

};

if(location.search.search("fred=true") != -1){
	sociableExternal = {
		getCSS: function() {
			var css = document.createElement('style');
			css.innerHTML = ".sociable_item{position:relative;min-height:50px;font-family:Arial,Verdana,Helvetica,sans-serif;font-size:11px;padding:10px;margin-top:10px;overflow:auto}.sociable_item .product_image{float:left;max-height:50px;max-width:50px;margin-right:10px}.sociable_item .action_info{float:left;width:224px;overflow:auto}.sociable_item .fb_friend_pic{max-height:25px;float:left;margin-right:5px}.sociable_item .action_summary{margin:0;color:#737575;min-height:30px}.sociable_item .fb_friend_name{font-weight:bold;color:#444}.sociable_item .mo_name a{color:#737575}.sociable_item .clearfloat{clear:both}.sociable_item .friend_comment{color:#444;margin-top:3px;margin-bottom:0;display:none}.sociable_item .timestamp{color:#737575;font-size:10px;margin-top:8px;display:block}.sociable_item .COMMENT .friend_comment{display:block}";
			return css;
		},
		//html template for an item
		itemTemplate:
			'<img src="{mo_picture_url}" alt="{mo_name}" class="product_image"/>' +
				'<div class="action_info {action_taken}"><img class="fb_friend_pic" src="{friend_facebook_picture}" alt="{friend_first_name}" />' +
					'<p class="action_summary"><span class="fb_friend_name">{friend_first_name}</span> {action_readable} ' +
					'<span class="mo_name"><a href="{mo_detail_url}">{mo_name}</a></span></p><div class="clearfloat"></div>' +
					'<p class="friend_comment">"{friend_comment}"</p><span class="timestamp">{timestamp}</span>' +
				'</div>',

		/**
		 * Takes an array of Sociable Labs API responses and gives back display html
		 *
		 * @param {Array} data - the array of json objects to parse
		 * @return {Array} - an array of elements representing the information conveyed
		**/
		getHtmlForActions: function(data) {
			var self = this;
			var result = [];
			if ($.isArray(data)) {
				$.each(data, function(index, item) {
					result.push(self.applyTemplate(item));
				});
			}
			return result;
		},

		/**
		 * Method to apply template to a single item
		 *
		 * @param {Object} item  - the JSON obect representing an action model
		 * @return {HTMLElement} a single html element representing the display view of that model
		**/
		applyTemplate: function(item) {
			var self = this;
			var itemHtml = self.itemTemplate;
			$.each(item, function(param, value) {
				if (param == 'timestamp') {
					var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
					'September', 'October', 'November'];
					var ts  = new Date(value);
					value = months[ts.getMonth()] + " " + ts.getDate();
				}
				if ( value == null) {
					value = "";
				}
				itemHtml = itemHtml.replace(new RegExp("{" + param + "}",'g'), value);
			});
			var element = document.createElement('div');
			element.setAttribute('class','sociable_item');
			element.innerHTML = itemHtml;
			return element;
		}

	};
}

binder = {
	vars:{
		debug:false,
		debugType:false,
		onlyOneQuickViewTO:false,
		isLoggedIn:false,
		launchHappyHour:false,
		creationLog:[],
		bodyIsClosed:false,
		slPlugin:false,
		pageData:{
			subCategoryId:-1
		}
	},
	components:{},
	make:{
		commonEvents:function(elm, events, self, params, bubble){
			var self = self;
			var elm = elm;
			var params = params;
			var bubble = bubble;
			this.event = function(evt){
				if(!evt) evt = event;
				self.top.common.eventBubble(bubble, evt, self, elm, params);
			}
		}
	},
	common:{
		createIFRAME:function(params){
			var ifrm = document.createElement("iframe")
			for(var e in params.attribs) ifrm.setAttribute(e, params.attribs[e])
			ifrm.src = params.src
			params.parent.appendChild(ifrm)
        },
		createSLscript:function(){
			if(this.top.vars.slPlugin && location.hostname != "admin.charlotterusse.com"){
				var slScript = document.createElement('script');
				slScript.async = true;
				slScript.src = ('https:' == window.location.protocol ? 'https://s3.amazonaws.com/' : 'http://') + this.top.vars.slPlugin;
				document.getElementsByTagName('head')[0].appendChild(slScript);
			}
		},
		baseEventCopy:function(evt){
			var ev = {}
			for(var e in evt){
				ev[e] = evt[e]
			}
			return ev
		},
		create:function(name, params, group){
			if(!this.vars) this.vars = {};
			if(!this.vars.children) this.vars.children = {};
			this.group = group;
			this.top.vars.creationLog.push(this.name+":"+name)
			if(location.search.search("binderNoCreate=true") != -1) return false
			this.vars.children[name] = new this.make.main();
			if(!this.vars.children[name].init) this.vars.children[name].init = this.top.common.packageInit;
			this.vars.children[name].init(name, this, this.top, group);
			if(this.vars.children[name].constructor(params)){
				delete this.vars.children[name];
				return false;
			}
			return this.vars.children[name];
		},
		packageInit:function(name, parent, top, group){
			this.name = name;
			this.parent = parent;
			this.top = top;
			this.group = group;
		},
		init:function(name, parent, top){
			this.name = name;
			this.parent = parent;
			this.top = top;
		},
		commonBubble:function(func, self, params){
			if(self.parent.common[func]){
				self.top.common.log(self, "call to common intercepted by parrent, "+self.parent.name+".common."+func, "common");
				return self.parent.common[func](params);
			} else {
				if(self.group && self.group.common[func]){
					self.top.common.log(self, "call to common intercepted by group "+self.group.name+".common."+func, "common");
					return self.group.common[func](params);
				} else {
					self.top.common.log(self, "call to common handled by instance, "+self.name+".common."+func, "common");
					if(self.top.common[func]) self.top.common[func](params)
				}
			}
		},
		functionBubble:function(func, self, params, bubble){
			if(!bubble) bubble = {group:true, parent:true};
			if(bubble.group && self.group && self.group[func]){
				self.top.common.log(self.group, "function intercepted by group, "+self.group.name+"."+func, "function");
				self.group[func](self, params);
				return true;
			} else {
				if(bubble.parent && self.parent && self.parent[func]){
					self.top.common.log(self.parent, "function intercepted by parent. "+self.parent.name+"."+func, "function");
					self.parent(self, params);
					return true;
				}
			}
			self.top.common.log(self, "function handled by instance. function = "+self.name+"."+func, "function");
			return false;
		},
		eventBubble:function(bubble, evt, self, elm, params){
			if(bubble.group && self.group && self.group.events && self.group.events[evt.type]){
				self.top.common.log(self.group, ".events."+evt.type, "event");
				self.group.events[evt.type](elm, evt, self, params);
			} else {
				if(bubble.parent && self.parent && self.parent.events && self.parent.events[evt.type]){
					self.top.common.log(self.parent, ".events."+evt.type, "event");
					self.parent.events[evt.type](elm, evt, self, params);
				} else {
					self.top.common.log(self, ".events."+evt.type, "event");
					self.events[evt.type](elm, evt, self, params);
				}
			}
		},
		addEvents:function(elm, events, self, params, bubble){
			if(!bubble) bubble = {group:true, parent:true};
			var f = new this.top.make.commonEvents(elm, events, self, params, bubble);
			for(var i=0;i<events.length;i++){
				if(elm.attachEvent){
					elm.attachEvent("on"+events[i], f.event);
				} else {
					elm.addEventListener(events[i],f.event,0);
				}
			}
			return f;
		},
		removeEvents:function(elm, events, func){
			if(!elm || !events || !events.length || !func) return
			for(var i =0;i<events.length;i++){
				if(elm.detachEvent){
					elm.detachEvent("on"+events[i], func);
				} else {
					elm.removeEventListener(events[i],func,false);
				}
			}
		},
		getSecureUrl:function(sLoc, bSecure){
			if(sLoc.toLowerCase().search("http") != -1) return sLoc
			sType = location.protocol + "//";
			if(bSecure && location.toString().search("http://cr-local.fry.com/") == -1) sType = "https://"
			return sType+location.host+sLoc
		},
		goHere:function(sLoc, bSecure){
			document.location = this.getSecureUrl(sLoc, bSecure)
		},
		log:function(script, log, sType){
			if((this.top.vars.debug || (this.top.vars.debugType && this.top.vars.debugType == sType)) && console){
				var out = script.name;
				var p = script.parent;
				while(p != this.top){
					if(p.vars.children[out]){
						out = p.name+".vars.children."+out;
					} else {
						out = p.name+"."+out
					}
					p = p.parent;
				}
				console.log(this.top.name+"."+out+log);
			}
		},
		createExtScript:function(params){
			var s = document.createElement('script');
			this.top.common.getSecureUrl(params.url, params.bIsSecure)
			if(params.async) s.async = true;
			var url = params.url.replace(/http:\/\//gi, '')
			url = url.replace(/https:\/\//gi, '')
			url = location.protocol + "//"+url
			s.src = url
			document.getElementsByTagName('head')[0].appendChild(s);
		},
		armShowMore:function(){
			/*
				Adds more thumbnails to the page.
				*Existing cached thumbnails are first unhidden while the next recordset is loaded.
			*/
			$('a.js_ajaxShowMore').click(function(e){
				e.preventDefault();
				var t = $(this),
					url = t.attr('href'),
					table = $('#thumbNailTable'),
					pageNumber = parseInt(table.data('pageNum')),
					pageGap = parseInt(table.data('pageGap'));
					skipped = parseInt(table.data('skipped'));

				var pagination = $('.topPagination');

				if (t.parent().hasClass('showAll')){
					$('ul.showMore').hide();
					$('.showMore').hide();
					table.after('<div class="loadingResults"></div>');
					$.ajax({
						url: url,
						success: function(data,msg,xhr){
							var remoteContent = xhr.responseText;

							//Evaluate the scripts returned
							var sandbox = document.createElement('tbody');
							sandbox.innerHTML = remoteContent;
							var scripts = $(sandbox).find('script');
							for (var i=0,l=scripts.length;i<l;i++){
								try {
									eval(scripts[i].innerHTML.replace("var scene7","window.scene7"));
								} catch(e) {}
							}
							pageGap = $(sandbox).find('input[name="gap"]').val();
							skipped = $(sandbox).find('input[name="skipped"]').val();
							//put remote content into the existing table.
							var table = $('#thumbNailTable');
							table.find('tbody').html("").append(remoteContent);
							/*
							table.parent().html(data);
							$(".prodImage").unbind(quickView.handleQuickView());
							*/
							quickView.handleQuickView();
							pagination.find('span.endIndex').html(pagination.find('span.totalIndex').html());
							$('.loadingResults').remove();
						},
						error: function(){
							$('.loadingResults').remove();
							$('ul.showMore').show();
							$('.showMore').hide();
						}
					});
				} else {
					table.find('tr.searchResultHide').removeClass();
					var endIndex = parseInt(pagination.find('span.endIndex').html());
					var totalItems = pagination.find('span.totalIndex').html();

					if(endIndex < totalItems){
						endIndex += 40;
						pageNumber++;

						var searchObj = {
							url: url,
							table: $('#thumbNailTable'),
							endIndex: endIndex,
							pageNumber: pageNumber,
							pageGap: pageGap,
							skipped: skipped
						};
						getNextResults(searchObj);

						if(endIndex < totalItems){
							pagination.find('span.endIndex').html(endIndex);
						}else{
							pagination.find('span.endIndex').html(totalItems);
							$('.showMore').hide();
						}

					}else{
						$('.showMore').hide();
						pagination.find('span.endIndex').html(totalItems);
					}
				}
			});
		}
	},
	extend:function(functions){
		if(this.components){
			if(!functions){
				functions = [];
				for(var e in this.components) functions.push(e);
			}
			if(typeof(functions) == "string") functions = functions.split(",")
			for(var i=0;i<functions.length;i++){
				var f = functions[i];
				if(this.components[f]){
					this[f] = this.components[f];
					delete this.components[f];
					if(!this[f].init) this[f].init = this.top.init;
					this[f].init(f, this.parent, this.top);
					if(!this[f].create) this[f].create = this.top.common.create;
				}
			}
		}
	},
	init:function(name, parent, top){
		this.name = name;
		this.parent = parent;
		if(!top){
			this.top = this;
		} else {
			this.top = top;
		}
		if(this.common){
			if(!this.common.init) this.common.init = this.top.common.init
			this.common.init("common", this, this.top);
		}
		if(!this.extend) this.extend = this.top.extend
		if(this.components) this.extend();
	}
};

binder.init("binder", binder)

binder.components.overlabel = {
	vars:{
		isWebKit:navigator.userAgent.toLocaleLowerCase().search("applewebkit") > -1
	},
	common:{
		getStyle:function(elm,sProp){
			if (elm.currentStyle) {
				return elm.currentStyle[sProp];
			} else {
				if(window.getComputedStyle) return document.defaultView.getComputedStyle(elm,null).getPropertyValue(sProp);
			}
			return false
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					forms:"*",
					includeTypes:["text", "tel", "email"],
					includeTags:["input"],
					formPosition:"relative",
					autoPlace:true,
					parentClickGivesFocus:true,
					findFormByjQuerySelector:false
				}
				for(var e in params) this.params[e] = params[e]
				this.forms = []
				if(this.params.findFormByjQuerySelector){
						this.forms = $(this.params.findFormByjQuerySelector)
				} else {
					if(this.params.forms == "*"){
						this.forms = document.forms
					} else {
						for(var i=0;i<this.params.forms.length;i++){
							if(typeof(this.params.forms[i]) == "string"){
								var targ = document.forms[this.params.forms[i]]
							} else {
								var targ = this.params.forms[i]
							}
							if(targ) this.forms.push(targ)
						}
					}
				}
				this.draw({redraw:false})
			}
			
			this.createOverlabel = function(targElm,me,targLabel,baseRect){
				var bIsOverLabel = false
				for(var k=0;k<me.params.includeTags.length;k++){
					if(targElm.tagName.toLowerCase() == me.params.includeTags[k]){
						for(var l=0;l<me.params.includeTypes.length;l++){
							if(targElm.type.toLowerCase() == me.params.includeTypes[l]){
								me.placeLabel(
									{
										label:targLabel,
										elm:targElm,
										baseRect:baseRect
									}
								)
								bIsOverLabel = true
								break;
							}
							if(bIsOverLabel) break;
						}
					}
					if(bIsOverLabel) break;
				}
			}
			this.draw = function(params){
				for(var i=0;i<this.forms.length;i++){
					if(!this.forms[i].getAttribute(this.parent.name) || params.redraw){
						var targs = this.forms[i].getElementsByTagName("label")
						//var posType = this.parent.common.getStyle(this.forms[i], "position").toLowerCase()
						//if(posType != "relative" || posType != "absolute") this.forms[i].style.position = this.params.formPosition
						var baseRect = false
						var returnAry = []
						//if(this.params.autoPlace) baseRect = this.forms[i].getBoundingClientRect()
						for(var j =0; j< targs.length;j++){
							var targLabel = targs[j]
							if(this.params.autoPlace){
								var p = targLabel.parentNode
								baseRect = p.getBoundingClientRect()
								var w = baseRect.right -baseRect.left
								var h = baseRect.bottom - baseRect.top
								var par = p.parentNode
								if(w == 0 || h == 0){
									while(par != document.body){
										var display = this.parent.common.getStyle(par, "display").toLowerCase()
										if(display == "none"){
											par.style.display = ""
											returnAry.push(par)
											baseRect = p.getBoundingClientRect()
											w = baseRect.right -baseRect.left
											h = baseRect.bottom - baseRect.top
										}
										par = par.parentNode
									}
									baseRect = p.getBoundingClientRect()
								}
								var posType = this.parent.common.getStyle(p, "position").toLowerCase()
								if(posType != "relative" || posType != "absolute") p.style.position = this.params.formPosition
							}
							var labelFor = targLabel.getAttribute("for");
							if(!labelFor && targLabel.htmlFor) labelFor = targLabel.htmlFor
							var targElm = this.forms[i].elements[labelFor]
							if(targElm){
								var targThis = this;
								if(targElm[0] != undefined){
									var me = this;
									$.each(targElm, function(index) {										
										targThis.createOverlabel(targElm[index], me,targLabel,baseRect);	
										});
								}else{
									this.createOverlabel(targElm,this,targLabel,baseRect);									
								}

							}
							while(returnAry.length) {
								var retrunElm = returnAry.pop()
								retrunElm.style.display = "none"
							}
						}
						this.forms[i].setAttribute(this.parent.name, true)
					}
				}
			}
			this.placeLabel = function(params){
				var pe = params.elm.parentNode
				if(params.baseRect){
					params.label.style.position = "absolute"
					params.label.style.left = params.label.style.top = 0
					var elmRect = params.elm.getBoundingClientRect()
					params.label.style.left = elmRect.left - params.baseRect.left+"px"
					params.label.style.top = elmRect.top -params.baseRect.top +"px"
				}
				var n = this.top.name+"."+this.parent.name+".vars.children."+this.name
				if(!params.label.getAttribute(n)){
					var rv = this.top.common.addEvents(params.elm, ["focus", "blur"], this, {label:params.label})
					this.top.common.addEvents(params.label, ["click"], this, {elm:params.elm ,fire:rv})
					if(this.params.parentClickGivesFocus) this.top.common.addEvents(pe, ["click"], this, {elm:params.elm ,fire:rv})

					params.label.setAttribute(n, true)



				}
				if(params.elm.value.length) params.label.style.visibility = "hidden"
			}
			this.events = {
				focus:function(elm, evt, me, params){
					params.label.style.visibility = "hidden"
					//elm.focus()
				},
				blur:function(elm, evt, me, params){
					if(elm.value.length == 0) params.label.style.visibility = "inherit"
					if(me.parent.vars.isWebKit) me.draw({redraw:true})
				},
				click:function(elm, evt, me, params){
					params.elm.focus()
					params.fire.event({type:"focus"})
				}
			}
		}
	},
	draw:function(sName){
		this.vars.children[sName].draw({redraw:true})
	}
}

binder.components.radioCheckBox = {
	vars:{

	},
	common:{
		overOut:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout)\b/gi, '')+" "+params.type;
		},
		click:function(params){
			params.elm.className = params.elm.className.replace(/\b(click)\b/gi, '')+" "+params.type;
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					forms:"*",
					includeTypes:"radio",
					includeTags:"input",
					bOnlyOne:true,
					bUseCounter:true,
					bIncId:true,
					findFormByjQuerySelector:false
				}
				for(var e in params) this.params[e] = params[e]
				this.forms = []
				if(this.params.findFormByjQuerySelector){
						this.forms = $(this.params.findFormByjQuerySelector)
				} else {
					if(this.params.forms == "*"){
						this.forms = document.forms
					} else {
						for(var i=0;i<this.params.forms.length;i++){
							
							if(typeof(this.params.forms[i]) == "string"){
								var targ = document.forms[this.params.forms[i]]
							} else {
								var targ = this.params.forms[i]
							}
							if(targ) this.forms.push(targ)
						}
					}
				}
				this.restore = false
				this.ignoreOnce = false
				var counter = {}
				this.curOn = false
				for(var i=0;i<this.forms.length;i++){
					var targs = this.forms[i].getElementsByTagName(this.params.includeTags)

					for(var j =0; j< targs.length;j++){
						if(targs[j].type.toLowerCase() == this.params.includeTypes){
							if(counter[targs[j].name] == undefined) counter[targs[j].name] = 0
							var targID = targs[j].name
							if(this.params.bUseCounter) targID += "_"+counter[targs[j].name]
							targ = document.getElementById(targID)
							if(targ){
								this.top.common.addEvents(targs[j], ["change"], this, {fakeBox:targ})

								this.top.common.addEvents(targ, ["mouseover", "mouseout", "click"], this, {checkbox:targs[j]})
								this.updateClickState({
									elm:targ,
									checkbox:targs[j]
								})
								counter[targs[j].name]++
								if(this.params.bIncId) targ.id += "_"+counter[targs[j].name]
							}
						}
					}
				}
			}
			this.updateClickState = function(params){
				var type = ""
				var isChecked =  params.checkbox.getAttribute("checked")
				if(params.checkbox.checked ||(isChecked && isChecked.length)) type = "click"
				if(this.curOn && this.params.bOnlyOne && type == "click"){
					/*
					var c = {
						elm:this.curOn.elm,
						checkbox:this.curOn.checkbox,
						type:""
					}
					*/
					this.curOn.checkbox.checked = false
					var curOnChecked = this.curOn.checkbox.getAttribute("checked")
					/*if(curOnChecked && curOnChecked.length) this.curOn.checkbox.setAttribute("checked", "")*/
					if(curOnChecked && curOnChecked.length) this.curOn.checkbox.removeAttribute("checked")

					//this.updateClickState(c)
					this.parent.common.overOut(
						{
							elm:this.curOn.elm,
							type:""
						}
					)
					this.parent.common.click(
						{
							elm:this.curOn.elm,
							type:""
						}
					)
					this.curOn = false
					this.restore = false
				}

				this.parent.common.overOut(
					{
						elm:params.elm,
						type:""
					}
				)
				this.parent.common.click(
					{
						elm:params.elm,
						type:type
					}
				)
				if(type == "click"){
					params.checkbox.checked = true
					this.curOn = params
				}

			}
			this.events = {
				change:function(elm, evt, me, params){
					if(me.ignoreOnce == elm){
						me.ignoreOnce = false
						return
					}
					me.updateClickState({
						elm:params.fakeBox,
						checkbox:elm
					})
				},
				click:function(elm, evt, me, params){
					var c = params.checkbox.checked
					var isChecked =  params.checkbox.getAttribute("checked")
					if(c ||(isChecked && isChecked.length) ){
						params.checkbox.checked = false
						/*if((isChecked && isChecked.length)) params.checkbox.setAttribute("checked", "")*/
						if((isChecked && isChecked.length)) params.checkbox.removeAttribute("checked")
					} else {
						params.checkbox.checked = true
					}
					me.updateClickState({
						elm:elm,
						checkbox:params.checkbox
					})
					me.ignoreOnce = elm
					if(typeof evt.button != "undefined") {
						if(params.checkbox.onclick) params.checkbox.onclick()
					}
					me.ignoreOnce = elm
				},
				mouseover:function(elm, evt, me, params){
					if(me.ignoreOnce == elm){
						me.ignoreOnce = false
						return
					}
					if(me.params.bOnlyOne && me.curOn){
						me.restore = me.curOn
						me.parent.common.overOut(
							{
								elm:me.curOn.elm,
								type:evt.type
							}
						)
					}
					me.parent.common.overOut(
						{
							elm:elm,
							type:evt.type
						}
					)
				},
				mouseout:function(elm, evt, me, params){
					if(me.ignoreOnce == elm) return
					if(me.restore){
						me.parent.common.overOut(
							{
								elm:me.curOn.elm,
								type:evt.type
							}
						)
						me.restore = false
					}
					me.parent.common.overOut(
						{
							elm:elm,
							type:evt.type
						}
					)
				}
			}
		}
	}
}

binder.components.formValidation = {
	vars:{
		isWebKit:navigator.userAgent.toLocaleLowerCase().search("applewebkit") > -1,
		checkoutPayment:{
			ccName:{
				type:"isNotNull",
				message:{
					bad:"Name on Card",
					good:"Name on Card"
				}
			},
			ccNumber:{
				type:"isNotNull",
				message:{
					bad:"Credit Card Number",
					good:"Credit Card Number"
				}
			},
			ccSecurityCode:{
				type:"isNotNull",
				message:{
					bad:"C V V",
					good:"C V V"
				}
			},
			ccMonth:{
				type:"ccEXPdate",
				shairClassName:"creditCardDate",
				group:{
					month:"ccMonth",
					year:"ccYear"
				},
				events:["blur", "click", "change"],
				baseMessage:{
					bad:"Credit Card Expiration Date ",
					good:"Credit Card Expiration Date "
				},
				message:{
					bad:"Credit Card Expiration Date ",
					good:"Credit Card Expiration Date "
				}

			},
			ccYear:{
				type:"ccEXPdate",
				shairClassName:"creditCardDate",
				group:{
					month:"ccMonth",
					year:"ccYear"
				},
				events:["blur", "click", "change"],
				baseMessage:{
					bad:"Credit Card Expiration Date ",
					good:"Credit Card Expiration Date "
				},
				message:{
					bad:"Credit Card Expiration Date ",
					good:"Credit Card Expiration Date "
				}

			}
		},
		electGiftCard:{
			giftCardAmount:{
				type:"isNumber",
				message:{
					bad:"Amount",
					good:"Amount"
				}
			},
			purchaserName:{
				type:"isNotNull",
				message:{
					bad:"Your Name",
					good:"Your Name"
				}
			},
			recipientName:{
				type:"isNotNull",
				message:{
					bad:"Recipient Name",
					good:"Recipient Name"
				}
			},
			recipientEmail:{
				type:"isEmail",
				message:{
					bad:"Recipient Email Address ",
					good:"Recipient Email Address "
				}
			},
		confirmRecipientEmail:{
				type:"isEmail",
				message:{
					bad:"Re-Enter Recipient Email Address ",
					good:"Re-Enter Recipient Email Address "
				}
			}
		},
		giftCard:{
			giftCardAmount:{
				type:"isNotNull",
				message:{
					bad:"Amount",
					good:"Amount"
				}
			}
		},
		trackOrder:{
			billingZipCode:{
				type:"isZip",
				message:{
					bad:"Zip/Postal Code",
					good:"Zip/Postal Code"
				}
			},
			orderNumber:{
				type:"isNumber",
				message:{
					bad:"Billing Number",
					good:"Billing Number"
				}
			}
		},
		contactUs:{
			sendersEmail:{
				type:"isEmail",
				message:{
					bad:"Email Address",
					good:"Email Address"
				}
			},
			addressTo:{
				type:"isNotNull",
				message:{
					bad:"Email Subject",
					good:"Email Subject"
				}
			},
			message:{
				type:"isString",
				message:{
					bad:"Email Message",
					good:"Email Message"
				}
			}
		},
		createAccount:{
			emailAddress:{
				type:"isEmail",
				message:{
					bad:"Email Address",
					good:"Email Address"
				}
			},
			reEnterEmailAddress:{
				type:"isSame",
				message:{
					bad:"Email Address",
					good:"Email Address"
				},
				isSameAs:"emailAddress"
			},
			passwordNewMember:{
				type:"isPassword",
				message:{
					bad:"Password",
					good:"Password"
				}
			},
			verifyPassword:{
				type:"isSame",
				message:{
					bad:"Password",
					good:"Password"
				},
				isSameAs:"passwordNewMember"
			},
			zipCode:{
				type:"isZip",
				message:{
					bad:"Zip/Postal Code",
					good:"Zip/Postal Code"
				}
			}
		},
		registerFacebookUser:{
			emailAddress:{
				type:"isEmail",
				message:{
					bad:"Email Address",
					good:"Email Address"
				}
			},
			password:{
				type:"isPassword",
				message:{
					bad:"Password",
					good:"Password"
				}
			},
			verifyPassword:{
				type:"isSame",
				message:{
					bad:"Password",
					good:"Password"
				},
				isSameAs:"password"
			}
		},
		signIn:{
			userName:{
				type:"isEmail",
				message:{
					bad:"Email Address",
					good:"Email Address"
				}
			},
			password:{
				type:"isPassword",
				message:{
					bad:"Password",
					good:"Password"
				}
			}
		},
		signInNoClientValid:{
			userName:{
				type:"isNothing",
				message:{
					bad:"Email Address",
					good:"Email Address"
				},
				dontDisplay:true
			},
			password:{
				type:"isNothing",
				message:{
					bad:"Password",
					good:"Password"
				},
				dontDisplay:true
			}
		},
		myAccount:{
			oldEmailAddress:{
				type:"isEmail",
				message:{
					bad:"Email Address",
					good:"Email Address"
				}
			},
			newEmailAddress:{
				type:"isEmail",
				message:{
					bad:"Email Address",
					good:"Email Address"
				}
			},
			reEnterNewEmailAddress:{
				type:"isSame",
				message:{
					bad:"Email Address",
					good:"Email Address"
				},
				isSameAs:"newEmailAddress"
			},
			currentPassword:{
				type:"isPassword",
				message:{
					bad:"Password",
					good:"Password"
				}
			},
			newPassword:{
				type:"isPassword",
				message:{
					bad:"Password",
					good:"Password"
				}
			},
			reEnterNewPassword:{
				type:"isPassword",
				message:{
					bad:"Password",
					good:"Password"
				}
			}/*,
			password:{
				type:"isPassword",
				message:{
					bad:"Password",
					good:"Password"
				}
			}*/
		},

		commonErrors:{
			firstName:{
				type:"isString",
				message:{
					bad:"First Name",
					good:"First Name"
				}
			},
			lastName:{
				type:"isString",
				message:{
					bad:"Last Name",
					good:"Last Name"
				}
			},
			address1:{
				type:"isNotNull",
				message:{
					bad:"Street Address",
					good:"Street Address"
				}
			},
			addressValidation:{
				type: "isNothing",
				message:{
					bad:"",
					good:""
				}
			},
			city:{
				type:"isString",
				message:{
					bad:"City",
					good:"City"
				}
			},
			zipCode:{
				type:"isZip",
				message:{
					bad:"Zip/Postal Code",
					good:"Zip/Postal Code"
				}
			},
			state:{
				type:"isNotNull",
				message:{
					bad:"State/Province",
					good:"State/Province"
				}
			},
			emailAddress:{
				type:"isEmail",
				message:{
					bad:"Email Address",
					good:"Email Address"
				}
			},
            reEnterEmailAddress:{
				type:"isEmail",
				message:{
					bad:"Re-enter Email Address",
					good:"Re-enter Email Address"
				}
			},
			creditCard:{
				type:"isNumber",
				message:{
					bad:"Please enter a credit card number",
					good:"Credit Card"
				}
			},
			phone:{
				type:"isPhone",
				message:{
					bad:"Phone Number",
					good:"Phone Number"
				}
			},
			ccMonth:{
				type:"ccEXPdate",
				shairClassName:"creditCardDate",
				group:{
					month:"ccMonth",
					year:"ccYear"
				},
				events:["blur", "click", "change"],
				baseMessage:{
					bad:"Credit Card Expiration Date ",
					good:"Credit Card Expiration Date "
				},
				message:{
					bad:"Credit Card Expiration Date ",
					good:"Credit Card Expiration Date "
				}

			},
			ccYear:{
				type:"ccEXPdate",
				shairClassName:"creditCardDate",
				group:{
					month:"ccMonth",
					year:"ccYear"
				},
				events:["blur", "click", "change"],
				baseMessage:{
					bad:"Credit Card Expiration Date ",
					good:"Credit Card Expiration Date "
				},
				message:{
					bad:"Credit Card Expiration Date ",
					good:"Credit Card Expiration Date "
				}

			},
			sms_phone:{
				type:"isSMSPhone",
				message:{
					bad:"Mobile Phone Number",
					good:"Mobile Phone Number"
				}
			},
			actualPassword:{
				type:"isNothing",
				message:{
					bad:"Email Address",
					good:"Email Address"
				},
				dontDisplay:true
			},
			verifyPassword:{
				type:"isNothing",
				message:{
					bad:"Email Address",
					good:"Email Address"
				},
				dontDisplay:true
			},
            passwordNewMember:{
				type:"isNothing",
				message:{
					bad:"Email Address",
					good:"Email Address"
				},
				dontDisplay:true
			}
		},

		bff:{
			mobile:{
				type:"isPhone",
				message:{
					bad:"Enter Phone Number",
					good:"Mobile"
				},
				mustHaveOneOrOther:"emailAddress"
			},
			emailAddress:{
				type:"isEmail",
				message:{
					bad:"Enter Email Address",
					good:"Email Address"
				},
				mustHaveOneOrOther:"mobile"
			},
			actualPassword:{
				type:"isPassword",
				message:{
					bad:"Password",
					good:"Password"
				}
			},
			verifyPassword:{
				type:"isSame",
				message:{
					bad:"Password",
					good:"Password"
				},
				isSameAs:"actualPassword"
			},
            zipCode:{
                type:"isZip",
                message:{
                    bad:"Zip/Postal Code",
                    good:"Zip/Postal Code"
                }
            },
            birthday:{
                type:"isBirthDate",
                message:{
                    bad:"BIRTHDAY: MM/DD",
                    good:"BIRTHDAY: MM/DD"
                }
            },
            name:{
                type:"isString",
                message:{
                    bad:"Name",
                    good:"Name"
                }
            }
		},
		emailOptIn:{
			userEmail:{
				type:"isEmail",
				message:{
					bad:"Enter Email Address",
					good:"Email Address"
				}
			}
		}
	},
	common:{
		isString:function(val, elm, params, evt, me){
			if(!val.length) return false
			return isNaN(parseInt(val))
		},
		isNothing: function(){
			return true;
		},
		isSame:function(val, elm, params, evt, me){
			return this.isSameAs(val, elm, params, evt)
		},
		isSameAs:function(val, elm, params, evt, me){
			if(!val.length) return false
			elmB = elm.form.elements[params.isSameAs]
			if(!elmB) return false
			if(elm.selectedIndex) return(elm.selectedIndex == elmB.selectedIndex)
			return elm.value == elmB.value
		},
		mustHaveOneOrOther:function(val, elm, params, evt, me){
			var targ = elm.form.elements[params.mustHaveOneOrOther]
			me.eventsByObject[params.mustHaveOneOrOther]
			var isLike = me.eventsByObject[params.mustHaveOneOrOther]
			if(val){
				if(!targ.value.length){
					if(isLike) isLike.event({type:"blur"})
				}
				return true
			}
			if(targ.value.length) return "silent"
			return false
		},
		isNumber:function(val, elm, params, evt, me){

			return((val).search(/^\s*\d+\s*$/) != -1)
		},
		isEmail:function(val, elm, params, evt, me){
			if(!val.length) return false
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(val);
		},
		getElementsByClassName:function(sClass, elm){
			if(!elm) elm = document.body
			if(elm.getElementsByClassName) return elm.getElementsByClassName(sClass)
			var targs = elm.getElementsByTagName("*")
			var re = new RegExp("\\b"+sClass+"\\b");
			var ary = []
			for(var i = 0;i<targs.length;i++){
				if(targs[i].className.match(re)) ary.push(targs[i])
			}
			return ary
		},
		isNotNull:function(val, elm, params, evt, me){
			if(val.length) return true
			return false
		},
		isPassword:function(val, elm, params, evt, me){
			if(val.length) return true
			return false
		},
		isPhone:function(val, elm, params, evt, me){
			return val.search(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) == 0
		},
		isSMSPhone:function(val, elm, params, evt, me){
			if (elm.form.smsTextPreference.checked) {
				return val.search(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) == 0
			}
			
			return true
		},
		ccEXPdate:function(val, elm, params, evt, me){
			for(var e in params.baseMessage){
				params.message[e] = ""
			}
			var elms = elm.form.elements
			var m = elms[params.group.month].selectedIndex
			var y = elms[params.group.year].selectedIndex
			var date = new Date()
			if(evt.type == "click"){
				if(!m || !y){
					return true
				}
			}

			if(evt.type == "change"){
				if(!m || !y){
					return true
				}
				//evt = {type:"blur"}
			}
			if(evt.type == "blur"){
				if(!m) return false
				m =  parseInt(elms[params.group.month].options[m].value)-1
				if(!y) return false

				for(var e in params.baseMessage){
					params.message[e] = params.baseMessage[e]
				}

				y =  parseInt(elms[params.group.year].options[y].value)
				var d = new Date()
				d.setMonth(m)
				d.setYear(y)
				if(d.getTime() < date.getTime()) return false
				return true
			}

		},
		isGood:function(params){
			params.elm.className = params.elm.className.replace(/\b(good|bad|overlabel)\b/gi, '')+" "+params.type;
		},
		isZip:function(val, elm, params, evt, me){
			return /(^\d{5}$)|(^\d{5}-\d{4}$)|^\s*[a-ceghj-npr-tvxy]\d[a-ceghj-npr-tv-z](\s)?\d[a-ceghj-npr-tv-z]\d\s*$/i.test(val);
		},
        isBirthDate:function(val){
            return /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01]))\s*$/i.test(val);
        }
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					forms:"*",
					className:"errorField",
					serverErrorClassName:"serverErrorField",
					tagName:"div",
					errorPrefix:"error_",
					serverErrorPrefix:"serverError_",
					goodClassName:"good",
					badClassName:"bad",
					reserveForOverLabel:true,
					outlineParent:true,
					errors:"commonErrors",
					errorTarg:false,
					errorTargBaseID:"error_",
					autoFillCheck:false,
					findFormByjQuerySelector:false
				}
				for(var e in params) this.params[e] = params[e]
				this.forms = []
				if(this.params.findFormByjQuerySelector){
						this.forms = $(this.params.findFormByjQuerySelector)
				} else {
					if(this.params.forms == "*"){
						this.forms = document.forms
					} else {
						for(var i=0;i<this.params.forms.length;i++){
							
							if(typeof(this.params.forms[i]) == "string"){
								var targ = document.forms[this.params.forms[i]]
							} else {
								var targ = this.params.forms[i]
							}
							if(targ) this.forms.push(targ)
						}
					}
				}
				this.errorElms = {}
				this.serverErrorElms = {}
				this.eventsByObject = {}
				this.eventTriggers = []
				this.isAutoFillCheck = false
				if(this.parent.vars.isWebKit) this.params.autoFillCheck = true
				for(var i=0;i<this.forms.length;i++){
					var targ = this.forms[i]
					var er = this.parent.vars[this.params.errors]
					if(er == undefined) {
						er = this.parent.vars[targ.name]
						if(er == undefined) er = this.parent.vars.commonErrors
					}

					for(var j=0;j<targ.elements.length;j++){
						var elm = targ.elements[j]
						if(er[elm.name]){
							var erElm = false
							if(this.params.errorTarg) erElm = document.getElementById(this.params.errorPrefix+elm.name);
							if(erElm) {
								erElm.id += (new Date).getTime();
							} else {
								if(er[elm.name].shairClassName) {
									erElm = this.parent.common.getElementsByClassName(er[elm.name].shairClassName, elm.parentNode.parentNode)
									//document.getElementById(er[elm.name].errorID);
									if(erElm.length) {
										erElm = erElm[0]
									} else {
										erElm = false
									}
								}
								if(!erElm){
									erElm = this.createErrorElm(elm, er[elm.name].shairClassName)
									if(er[elm.name].dontDisplay) erElm.style.display = "none"
									if(elm.attributes["type"] != undefined && elm.attributes["type"].nodeValue == "hidden") erElm.style.display = "none"
									
								}
							}
							//evt-find might need to remove a parentNode from elm.parentNode.parentNode
							erServElm = this.parent.common.getElementsByClassName(this.params.serverErrorPrefix+elm.name, elm.parentNode.parentNode)
							if(!erServElm.length){
								erServElm = elm.parentNode.parentNode.insertBefore(document.createElement("div"), elm.parentNode)
								erServElm.className = this.params.serverErrorClassName
							}

							this.serverErrorElms[elm.name] = erServElm

                            var evts = ["blur"]
							if(er[elm.name].events) evts = er[elm.name].events
//							if(er[elm.name].tagName.toLowerCase() == "select"){
//                                evts = ["change"]
//                            }
							if(erElm){
								var rv = this.top.common.addEvents(elm, evts , this, {check:er[elm.name], display:erElm, parentElm:elm.parentNode,iInt:this.eventTriggers.length})
								this.eventsByObject[elm.name] = rv
								if(elm.value) rv.event({type:"blur"})
								this.eventTriggers.push(rv)
							}
						} else {
							if((this.params.reserveForOverLabel === true || (typeof(this.params.reserveForOverLabel) == "object" &&  this.params.reserveForOverLabel[elm.name] != undefined)) && elm.type != "hidden" && elm.type == "text" ) {
								this.createErrorElm(elm, false)
							}
						}
					}
				}
			}
			this.createErrorElm = function(elm, sClass){
				var erElm = this.parent.common.getElementsByClassName(this.params.errorPrefix+elm.name, elm.parentNode)

				if(!erElm.length){
					erElm = elm.parentNode.parentNode.appendChild(document.createElement(this.params.tagName))
					erElm.className = this.params.className
					this.errorElms[elm.name] = erElm
					if(sClass) erElm.className += " "+sClass
				}
				return erElm
			}
			this.overLabel = function(params){
				if(this.errorElms[params.name]){
					if(!params.type) params.type = "overlabel"
					this.errorElms[params.name].innerHTML = params.HTML
					this.parent.common.isGood({elm:this.errorElms[params.name], type:params.type})
				}
			}
			this.resetServerErrors = function(){
				for(var e in this.serverErrorElms) this.serverErrorElms[e].style.display = "none"
			}
			this.displayServerErrors = function(params){
				var targs = params.errors
				for(var i=0;i<targs.length;i++){
					if (targs[i].location && targs[i].location == 'HazmatScreenError') {
						
						//binder.hopup.load('DisclaimerLayer', {url:'/custserv/custserv_popup.jsp?pageName=Hazmat'});
						binder.hopup.load('DisclaimerLayer', {url:'/includes/message_content_display.jsp?pageName=Hazmat'});
					}
					if (targs[i].location && targs[i].location == 'hazmatGroundShipOnly') {
						document.getElementById("hazmatItemMsgDiv").innerHTML =targs[i].message;
					}
					if(this.serverErrorElms[targs[i].location]){
						this.serverErrorElms[targs[i].location].style.display = "block"
						this.serverErrorElms[targs[i].location].innerHTML = targs[i].message
					}
				}
			}

			this.hasErrorState = function(params){
				return this.parent.vars[this.params.errors][params.name]
			}

			this.setErrorStates = function(elm, evt, me, params){
				var v = elm.value
				if(this.isAutoFillCheck && v.length == 0) return
				if(elm.options) v = elm.options[elm.selectedIndex].value
				//var rv = v.length;
				//if(rv)
				if(typeof(params.check.type) == "object"){
					for(var i=0;i<params.check.type.length;i++){
						rv = me.parent.common[params.check.type[i]](v, elm, params.check, evt, me)
					}
				} else {
					rv = me.parent.common[params.check.type](v, elm, params.check, evt, me)
				}
				var type = me.params.goodClassName
				if(!rv){
					type = me.params.badClassName
				}
				if(!params.check.message[type].length || rv == "silent"){
					params.display.innerHTML = ""
					type = ""
				} else {
					params.display.innerHTML = params.check.message[type]
				}
				me.parent.common.isGood({elm:params.display, type:type})
				if(me.params.outlineParent) me.parent.common.isGood({elm:params.parentElm, type:type})
				if(!this.isAutoFillCheck && !params.autoFillCheck){
					this.isAutoFillCheck = true
					this.triggerEvents(evt, params)
					this.isAutoFillCheck = false
				}
			}

			this.triggerEvents = function(evt, params){
				for(var i=0;i<this.eventTriggers.length;i++) {
					if(params.iInt != i) {
						this.eventTriggers[i].event(evt)
					}
				}

			}

			this.events = {
				blur:function(elm, evt, me, params){
					me.setErrorStates(elm, evt, me, params)
				},

				click:function(elm, evt, me, params){
					me.setErrorStates(elm, evt, me, params)
				},

				change:function(elm, evt, me, params){
					me.setErrorStates(elm, evt, me, params)

				}
			}
		}
	},
	resetServerErrors:function(sName, params){
		if(sName){
			this.vars.children[sName].resetServerErrors()
		} else {
			for(var e in this.vars.children) this.vars.children[e].resetServerErrors()
		}

	},
	displayServerErrors:function(sName, oParams){
		if(sName){
			this.vars.children[sName].displayServerErrors(oParams)
		} else {
			for(var e in this.vars.children) this.vars.children[e].displayServerErrors(oParams)
		}
	},
	hasErrorState:function(sName, oParams){
		return this.vars.childern[sName](oParams)
	}

}

binder.components.overLabelGroup = {
	vars:{},
	common:{
		copyParams:function(oParams, oCopy){
			for(var e in oCopy){
				if(typeof(oCopy) == object){
					oParams[e] = this.copyParams(oParams[e], oCopy[e])
				} else {
					oParams[e] = oCopy[e]
				}
			}
			return oParams
		},
		getLabelFor:function(oLabel){
			var labelFor = oLabel.getAttribute("for");
			if(!labelFor && oLabel.htmlFor) labelFor = oLabel.htmlFor
			return labelFor
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					validation:{
						forms:["frmMain"],
						includeTypes:["text","tel","password","email"],
						className:"errorField",
						serverErrorClassName:"serverErrorField",
						tagName:"div",
						errorPrefix:"error_",
						serverErrorPrefix:"serverError_",
						goodClassName:"good",
						badClassName:"bad",
						reserveForOverLabel:true,
						outlineParent:true
					},
					overLabel:{
						forms:["frmMain"],
						includeTypes:["text","tel","password","email"],
						includeTags:["input"],
						formPosition:"relative",
						autoPlace:true,
						parentClickGivesFocus:true
					}
				}
				for(var e in params) {
					for(var ee in params[e]) {
						if(this.params[e]) this.params[e][ee] = params[e][ee]
					}
				}
				this.overLabel = this.top.overlabel.create(this.name, this.params.overLabel, this);
				this.validation = this.top.formValidation.create(this.name, this.params.validation, this);
			}
			this.events = {
				focus:function(elm, evt, that, params){
					var me = that.group
					if(that == me.overLabel){

						me.validation.overLabel(
							{
								name:me.parent.common.getLabelFor(params.label),
								HTML:params.label.innerHTML
							}
						)
						that.events.focus(elm, evt, that, params)
					}
				},
				blur:function(elm, evt, that, params){
					var me = that.group
					if(that == me.overLabel){
						var name = me.parent.common.getLabelFor(params.label)

						var hasErr = me.validation.hasErrorState({name:name})
						if(elm.value.length == 0 || hasErr) {
							me.validation.overLabel(
								{
									name:name,
									HTML:""
								}
							)
						}

						if(elm.value.length && !hasErr){
							me.validation.overLabel(
								{
									name:name,
									HTML:params.label.innerHTML,
									type:"good"
								}
							)
						}

					}
					that.events.blur(elm, evt, that, params)
				}
			}
		}
	}
}

binder.components.hopup = {
	vars:{
        children:{

        },
		baseHopup:[
			'<div class="hopupInner">',
				'<div class="boxedHopUp">',
					'<table cellpadding=0 cellspacing=0 border=0 height=100% width=100%>',
						'<tr>',
							'<td valign=middle align=center >',
									'<div class=contentHolder>',
										'<div class=hopupContent>',
											'',
										'</div>',
									'</div>',
							'</td>',
						'</tr>',
					'</table>',
				'</div>',
				'<div class="hopupClose">',

				'</div>',
			'</div>'
		],
		baseHopup:[
			'<div class="hopupInner">',
				'<div class="boxedHopUp">',

									'<div class=contentHolder>',
										'<div class=hopupContent>',
											'',
										'</div>',
									'</div>',
				'</div>',
				'<div class="hopupClose">',

				'</div>',
			'</div>'
		],
		quickView:[
			'<div class="quickView hopupInner">',
				'<div class="boxedHopUp">',
					'<div class=contentHolder>',
						'<div class=hopupContent>',
							'',
						'</div>',
					'</div>',
				'</div>',
				'<div class="hopupClose">',

				'</div>',
			'</div>'
		],
		isIE7:parseInt(navigator.userAgent.toLowerCase().split("msie").pop()),
		isIE:navigator.userAgent.toLowerCase().match("msie"),
		blockerZindex:10000,
		stack:[],
		LUT:[]
	},
	common:{
		getDims:function(sHTML, docWidth, docHeight, div){
			if(!this.parent.vars.mesurementDiv){
				this.parent.vars.mesurementDiv = document.body.appendChild(document.createElement("div"))
				this.parent.vars.mesurementDiv.style.cssText = "position:absolute;left:0;top:0;background-color:#fff;visibility:hidden;float:left"
			}
			var killDiv = false
			if(!div) {
				var div = this.parent.vars.mesurementDiv
				killDiv = true
			}
			if(sHTML) $(div).html(sHTML) //div.innerHTML = sHTML
			var origRect = div.getBoundingClientRect()
			
			var w = div.offsetWidth
			if(!docWidth) docWidth = this.getDocWidth()
			if(true || this.parent.vars.isIE && this.parent.vars.isIE7 && w == docWidth){
				var maxRight = 0
				var maxBottom = 0
				var minTop = Number.MAX_VALUE
				var targs = div.getElementsByTagName("*")
				for(var i=0;i<targs.length;i++){
					if(targs[i].offsetWidth != docWidth) {
						var rect = targs[i].getBoundingClientRect()
						if(rect.right > maxRight) maxRight = rect.right
						if(rect.bottom > maxBottom) maxBottom = rect.bottom
						if(rect.top < minTop) minTop = rect.top
					}
				}
				
				var ww = maxRight - origRect.left
				if(ww > 0) w = ww
				var hh = maxBottom-minTop
				if(origRect.top > -1){
					hh-=origRect.top
				} else {
					hh += minTop-origRect.top
				}
			}
			var h = div.offsetHeight
			if(hh > h) h = hh
			if(killDiv) div.innerHTML = ""
			return {w:w,h:h}
		},

		getElementsByClassName:function(sClass, elm){
			if(!elm) elm = document.body
			if(elm.getElementsByClassName) return elm.getElementsByClassName(sClass)
			var targs = elm.getElementsByTagName("*")
			var re = new RegExp("\\b"+sClass+"\\b");
			var ary = []
			for(var i = 0;i<targs.length;i++){
				if(targs[i].className.match(re)) ary.push(targs[i])
			}
			return ary
		},
		getScroll:function(){
		     var y = Math.max(
                    Math.max(document.documentElement.scrollTop),
                    Math.max(document.body.scrollTop)
                )
             var x = Math.max(
                    Math.max(document.documentElement.scrollLeft),
                    Math.max(document.body.scrollLeft)
                )
                return {y:y,x:x}
		},
		getDocHeight:function() {
			var D = document;
			return Math.max(
				Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
				Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
				Math.max(D.body.clientHeight, D.documentElement.clientHeight)
			);
		},
		getDocWidth:function() {
			var D = document;
			return Math.max(
				Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
				Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
				Math.max(D.body.clientWidth, D.documentElement.clientWidth)
			);
		},
		getWinDims:function(){
            if (document.body && document.body.offsetWidth) {
                var w = document.body.offsetWidth;
                var h = document.body.offsetHeight;
            }
            if (document.documentElement && document.documentElement.offsetWidth ) {
                var w = document.documentElement.offsetWidth;
                var h = document.documentElement.offsetHeight;
            }
            if (window.innerWidth && window.innerHeight) {
                var w = window.innerWidth;
                var h = window.innerHeight;
            }
            return {w:w,h:h}
        },
		easeInOutQuad:function(t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t + b;
			t--;
			return -c/2 * (t*(t-2) - 1) + b;
		},
		testChild:function(sName){
			if(!this.parent.vars.children[sName] || !sName ){
				return this.createTemporary(sName)
			}
			return sName
		},
		createTemporary:function(sName){
			if(sName && this.parent.vars.children[sName] ) sName = false
			if(!sName){
				var id = (new Date).getTime()
				while(this.parent.vars.children[this.parent.name+"_"+id])id++
				id = this.parent.name+"_"+id
			} else {
				id = sName
			}
			this.parent.create(
				id,
				{
					bDestroyOnClose:true
				}
			)
			return id
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					hopupID:false,
					hopupBaseClass:"hopupContainer",
					hopupCloseClass:"hopupClose",
					hopupContentHolderClass:"contentHolder",
					hopupBGdiv:"boxedHopUp",
					hopupContentClass:"hopupContent",
					zIndexer:"zIndexer",
					baseZindex:100000,
					clickURL:false,
					closeOnBlockerClick:true,
					width:false,
					height:false,
					widthHeightSpeed:500,
					bDestroyOnClose:false,
					bRemoveHTML:true,
					topOffset:32,
					leftOffset:64,
					hopupTemplate:"baseHopup",
					pollDimChangeDueToWebFonts:[],
					SSLframeLoadState:-1
				}
				for(var e in params) this.params[e] = params[e]

				if(!this.params.hopupID){
					this.hopup = document.body.appendChild(document.createElement("div"))
					this.hopup.className = this.params.hopupBaseClass
					this.hopup.innerHTML = this.parent.vars[this.params.hopupTemplate].join("\n")
				} else {
					this.hopup = document.body.appendChild(document.getElementById(this.params.hopupID).cloneNode(1))
				}

				this.content = this.parent.common.getElementsByClassName(this.params.hopupContentClass, this.hopup)[0]
				this.closeButton = this.parent.common.getElementsByClassName(this.params.hopupCloseClass, this.hopup)[0]

				this.hopupBGdiv = this.parent.common.getElementsByClassName(this.params.hopupBGdiv, this.hopup)[0]

				this.contentHolder = this.parent.common.getElementsByClassName(this.params.hopupContentHolderClass, this.hopup)[0]
				
				;
				




				this.content = this.parent.common.getElementsByClassName(this.params.hopupContentClass, this.hopup)[0]
				this.blockerDiv = document.body.appendChild(document.createElement("div"))
				this.blockerDiv.className = "genHopupBlocker"
				this.blockerDiv.style.cssText = "position:absolute;left:0;top:0;background-color:#fff;opacity:0.6;filter:alpha(opacity=60);"
				if(this.params.clickURL) this.top.common.addEvents(this.content, ["click"], this, {url:this.params.clickURL})
				this.top.common.addEvents(this.closeButton, ["click"], this, {})
				if(this.params.closeOnBlockerClick) this.top.common.addEvents(this.blockerDiv, ["click"], this, {})


				//this.top.common.addEvents(window, ["resize"], this, {})

				this.baseDims = { w:this.params.width,h:this.params.height }

				if(!this.baseDims.w) this.baseDims.w = this.content.offsetWidth
				if(!this.baseDims.h) this.baseDims.h = this.content.offsetHeight

				this.curDims = {w:0,h:0}

				this.TO = false
				this.resizeTO = false
				this.startTime = false
				this.pollTryTO = false
				this.hopupVisible =false
				this.parent.vars.LUT[this.name] = -1
				this.pollTrys = []
				this.winEventsTO = false
				this.winEvents = false
				
			},
			this.incSSLframeLoadStep = function(){
				this.params.SSLframeLoadState++
				try{
					console.log(this.params.SSLframeLoadState)
				}catch(e){}
				if(this.params.SSLframeLoadState > 0) this.parent.distroy(this.name)
			},
			this.setPollTrys = function(){
				clearTimeout(this.pollTryTO)
				for(var i=0;i<this.params.pollDimChangeDueToWebFonts.length;i++){
					this.pollTrys[i] = this.params.pollDimChangeDueToWebFonts[i]
				}
			}
			this.getDims = function(sHTML){
				this.mesurementDiv= sHTML
				var w = div.offsetWidth
			}

			this.HTML = function(params){
			    
				this.content.innerHTML = ""
				this.hopup.style.visibility = "hidden"
				this.content.style.overflow = "visible";
				this.contentHolder.style.overflow = "hidden"
				this.content.style.display = ""
				if(!this.params.width || !this.params.height){
					var dims = this.parent.common.getDims(params.html, false, false, this.content)
				}
				this.hopupBGdiv.style.backgroundImage = ""
				//this.contentHolder.style.width = this.contentHolder.style.height = 0
				this.content.style.display = "none";
				//this.content.style.overflow = "visible";
				//this.contentHTML = params.html
				//if(!this.hopupVisible) 
				
				this.setPollTrys()
				this.setAnimation(dims)
				this.showHopup()
			}

			this.close = function(){
				this.hopup.style.visibility = "hidden"
				this.blockerDiv.style.visibility = "hidden"

				this.hopupVisible = false
				if(this.params.bDestroyOnClose) this.parent.distroy(this.name)
				if(this.params.bRemoveHTML) this.contentHTML = this.content.innerHTML = ""
				this.hopup.style.left = this.hopup.style.top = this.contentHolder.style.width = this.contentHolder.style.height =""
		        if(this.parent.vars.LUT[this.name] > -1){
		            this.parent.vars.stack.splice(1, this.parent.vars.LUT[this.name])
				    this.parent.vars.LUT[this.name] = -1
                }

			}

			this.moveHopup = function(dims){

			    var winDims = this.parent.common.getWinDims()
				var w = this.parent.common.getDocWidth()
				var h = this.parent.common.getDocHeight()
				this.blockerDiv.style.width = w+"px"
				this.blockerDiv.style.height = h+"px"
				var mDims = this.parent.common.getDims(false,w,h, this.content)
				if(!dims){
					dims = mDims
				} else {
					if(dims.w == mDims.w && dims.w == mDims.h) return false
				}
				
				var winW = winDims.w
				var winH = winDims.h
				var s = this.parent.common.getScroll()
				var l = ((winW/2)-((dims.w+this.params.leftOffset)/2));
				var t = ((winH/2)-(dims.h/2));
				if(t > winH) t = 0;
				
				if(t < s.y) t += s.y
				/*
				if(t + dims.h > winH + s.y){
					//debugger;
				    t -= (winH +s.y) - (t+dims.h)
                    if(t < s.y) t = s.y + this.params.topOffset
                }
				*/
                if(l < s.x) l += s.x
				var tWidth = l + dims.w + this.params.leftOffset;
                if(tWidth > winW + s.x) {
                    l -= tWidth - (winW +s.x)
                    if(l < s.x) l = s.x - this.params.leftOffset
                }
				if(l < 0) l = 0;
				if(t < (this.params.topOffset + s.y)) t = s.y+ this.params.topOffset
				this.hopup.style.left = l+"px"
				this.hopup.style.top = t+"px"
			}
			this.redrawHopup = function(){
				clearTimeout(this.winEventsTO)
				if(this.hopup.style.visibility == "visible" && this.content.offsetWidth && this.content.offsetHeight){
					var dims = this.parent.common.getDims(false,false,false, this.content)
					var didMove = this.moveHopup(dims)
					if(didMove) this.setAnimation(dims)
				}
			}
			this.showHopup = function(){
				//this.content.innerHTML = ""
				this.moveHopup()
				if(this.params.zIndexer){
					this.top[this.params.zIndexer].setTop(
						{
							GUID:this.parent.name+"."+this.name,
							elms:[this.blockerDiv, this.hopup]
						}
					)
				} else {
					this.blockerDiv.style.zIndex = this.parent.vars.blockerZindex
					this.hopup.style.zIndex = this.parent.vars.blockerZindex+1
				}
				this.hopup.style.visibility = "visible"
				this.blockerDiv.style.visibility = "visible"

				this.hopupVisible = true

				if(this.parent.vars.LUT[this.name] == -1){
				    this.parent.vars.LUT[this.name] = this.parent.vars.stack.length
				    this.parent.vars.stack.push(this.name)
                }
				//var dims = this.parent.common.getDims(this.content.innerHTML)
				//this.setAnimation(dims)

			}
			this.distroy = function(){
				this.removeWindowEvents()
				document.body.removeChild(this.hopup)
				document.body.removeChild(this.blockerDiv)
				clearTimeout(this.pollTryTO)
				delete this.parent.vars.children[this.name]
			}
			
			this.removeWindowEvents = function(){
				if(this.winEvents){
					this.top.common.removeEvents(window, ["resize", "scroll"], this.winEvents)
					clearTimeout(this.winEventsTO)
					this.winEventsTO = this.winEvents = false
					
					
				}
			}
			
			this.setAnimation = function(oDims){
				this.removeWindowEvents()
				
				var dWidth = (oDims.w-this.baseDims.w) //+this.curDims.w
				var dHeight = (oDims.h-this.baseDims.h) //+this.curDims.h
				if(!this.startTime) this.startTime = (new Date).getTime()
				this.animateWidthHeight(
					{
						width:dWidth,
						height:dHeight
					}
				)
				clearTimeout(this.TO)
				var me = this
				this.TO = setInterval(
					function(){
						me.animateWidthHeight(
							{
								width:dWidth,
								height:dHeight
							}
						)
					},
					5
				)

			}
			this.animateWidthHeight = function(params){
				var dTime = ((new Date()).getTime()) - this.startTime;
				if(dTime > this.params.widthHeightSpeed){
					dTime = this.params.widthHeightSpeed;
					clearTimeout(this.TO);
					this.bAnimating = false;
					this.startTime = false;
					var me = this
					clearTimeout(this.pollTryTO)
					if(this.pollTrys.length){
						var n = this.pollTrys.shift()
						if(n < 0 ){
							this.pollTrys[0] = n 
							n = 250
						}
						this.pollTryTO = setTimeout(
							function(){
								me.redrawHopup()
							},
							n
						)
						
					}	
				}
				var per = this.parent.common.easeInOutQuad(dTime, 0, 100, this.params.widthHeightSpeed)/100
				var dW = (params.width*per)
				var dH = (params.height*per)
				var w = this.baseDims.w+ dW
				var h = this.baseDims.h + dH
				this.contentHolder.style.width = w+"px"
				this.contentHolder.style.height = h+ "px"
				if(dTime == this.params.widthHeightSpeed){
					this.baseDims.w = w
					this.baseDims.h = h
					
					this.contentHolder.style.width = "auto"
					this.contentHolder.style.height = "auto"
					this.hopupBGdiv.style.backgroundImage = "none"
					this.content.style.display = ""
					this.contentHolder.style.overflow = "visible"
					//$(this.content).html(this.contentHTML)
				}
				this.moveHopup({w:w,h:h})
				if(dTime == this.params.widthHeightSpeed){
					this.winEvents = this.top.common.addEvents(window, ["resize", "scroll"], this, {})
				}
			}
			this.events = {
				resize:function(elm, evt, me, params){
					clearTimeout(me.winEventsTO)
					me.winEventsTO = setTimeout(
						function(){
							me.redrawHopup()
						}, 50
					)
				},
				scroll:function(elm, evt, me, params){
					//temp remove for quick fix for small windows
					return false
					clearTimeout(me.winEventsTO)
					me.winEventsTO = setTimeout(
						function(){
							me.redrawHopup()
						}, 50
					)
				},
				click:function(elm, evt, me, params){
					if(elm == me.closeButton || (elm == me.blockerDiv && me.params.closeOnBlockerClick) ) {
						me.distroy()
					}
				}
			}
		}
	},
	incSSLframeLoadStep:function(sChild){
		this.vars.children[sChild].incSSLframeLoadStep()
	},
	HTML:function(sChild, params){
	//debugger;
		sChild = this.common.testChild(sChild)
		this.vars.children[sChild].HTML(params)
	},
	close:function(sChild){

	    if(!sChild && this.vars.stack.length) sChild = this.vars.stack[this.vars.stack.length-1]
		if(this.vars.children[sChild]){
		    this.vars.children[sChild].close()
        }
	},
	distroy:function(sChild){
		if(!sChild && this.vars.stack.length) sChild = this.vars.stack[this.vars.stack.length-1]
		if(this.vars.children[sChild]){
			this.vars.children[sChild].distroy()
			delete this.vars.children[sChild]
		}
	},
	show:function(sChild){
		sChild = this.common.testChild(sChild);
		this.vars.children[sChild].showHopup()
	},
	load:function(sChild, params){
		var sChild = this.common.testChild(sChild)
		this.show(sChild)
		var me = this
		$.ajax({
			url: this.top.common.getSecureUrl(params.url, params.bIsSecure),
			statusCode: {
				200:function(data, textStatus, jqXHR){

					me.HTML(
						sChild,
						{
							html:data
						}
					);
				}
			},

			success: function(data, textStatus, jqXHR){
				if(me.vars.children[sChild] && me.vars.children[sChild].hopupVisible){
					me.HTML(
						sChild,
						{
							html:data
						}
					);
				}
			},

			error: function(data, textStatus, jqXHR){
				if(me.vars.children[sChild] && me.vars.children[sChild].hopupVisible){
					if(data.response) {
						data = data.response
					} else {
						if(data.responseText) data = data.responseText
					}
					me.HTML(
						sChild,
						{
							html:data
						}
					);
				}
			}
		});
	}
}

binder.components.genOverOutClick = {
	vars:{

	},
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					elms:[],
					params:{}
				}
				for(var e in params) this.params[e] = params[e]

				for(var i=0;i<this.params.elms.length;i++){
					var e = this.params.elms[i]
					if(typeof e == "string") e = document.getElementById(e)
					this.top.common.addEvents(e, ["click", "mouseover", "mouseout"], this, this.params.params)
				}

			}
			this.events =  {
				mouseover:function(elm, evt, me, params){
					me.parent.common.overOutClick({elm:elm, type:evt.type})
				},
				mouseout:function(elm, evt, me, params){
					me.parent.common.overOutClick({elm:elm, type:evt.type})
				},
				click:function(elm, evt, me, params){
					me.parent.common.overOutClick({elm:elm, type:evt.type})
				}
			}
		}
	}
}


binder.components.shoppingCart = {
	vars:{

	},
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					start:"left bottom",
					parents:false,
                    parentContainerID:"mainNav",
                    parentContainerChildTagName:"li",
                    flyoutContainer:"mainContent",
					bOnlyOne:true,
					sensitivity:1000
				}
				this.flyout = this.top.genFlyout.create("universalCart", {
					parents:$("#mainNave_shoppingCart"),
					start:this.params.start
				},this)

				this.hasResluts = false;
				this.curON = false
				this.curOnChild = false
				this.TO = false
			}
			/*this.hideCurOn = function(){
                if(!this.curON) return
				clearTimeout(this.TO)
				if(this.curON.child) this.curON.child.style.display = "none"
				this.parent.common.overOutClick(
					{
						elm:this.curON.parent,
						type:"mouseout"
					}
				)
                this.curON = false;
			}*/
			this.events =  {
				mouseover:function(elm, evt, that, params){
					$("#mainNave_shoppingCart_child-0").html('');
					var me = that.group;
					me.curOn = true;
					me.timeout = setTimeout(function(){
						me = that.group;
						if(me.curON && me.curON.parent == params.parent){
							clearTimeout(me.TO)
							return
						}
						var me = that.group;
						me.storeParams = {
							elm:elm,
							evt:evt,
							that:that,
							params:params
						}
						me.parent.common.overOutClick(
							{
								elm:elm,
								type:evt.type
							}
						)
						me.curON = {
							parent:elm,
							child:false
						}
						$("#mainNave_shoppingCart_child-0").html('');
						if(me.curON && !$('#glo-ucart-content').length){
							$.ajax({
								url: '/checkout/universal_cart.jsp?action=show',
								dataType: 'JSON',
								success: function(results){
									document.getElementById("mainNave_shoppingCart_child-0").innerHTML = results;
									me.storeParams.that.events.mouseover(me.storeParams.elm, me.storeParams.evt, me.storeParams.that, me.storeParams.params);
								}
							});
						}
					}, 250);
				},
				mouseout:function(elm, evt, that, params){
					var me = that.group;
					clearTimeout(me.timeout);
					me.curON == false;
				}
			}
		}
	},
	hideAllFlyouts:function(sName){
		for(var e in this.vars.children){
			if(e != sName) this.vars.children[e].hideCurOn()
		}
	}
}

binder.components.tooltip = {
	vars:{
	},
	common:{
		
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					hoverLinkClass:".MR-tooltip",
					contentDivClass:".MR-tooltip-div",
					eventTypesParent:["mouseover", "mouseout"],
					eventTypesChild:["mouseover", "mouseout"],
					surroundingStylingBefore : '<table cellpadding="0" cellspacing="0" id="',
					surroundingStylingMiddle : '">'+
					'<tr><td class="tooltip-top-left"></td><td class="tooltip-top"></td><td class="tooltip-top-right"></td></tr>	'+				
					'<tr><td class="tooltip-left"></td><td class="content">',	
					surroundingStylingAfter : '</td><td class="tooltip-right"></td></tr>'+
							'<tr><td class="tooltip-bottom-left"></td><td class="tooltip-bottom"></td><td class="tooltip-bottom-right"></td></tr>'+
							'</table>',
					sensitivity:1000
				}
				for(var e in params) this.params[e] = params[e]
				this.curOn = false
				this.tooltipEvents = {linkElm:[], divElm:[]}
				var linkAry = $(this.params.hoverLinkClass)
				for(var i=0;i<linkAry.length;i++){
                    var p = linkAry[i]
                    var cId = this.findDivIdFromLinkId(linkAry[i].id)  
                    var c = document.getElementById(cId)                  
                    if(c){
                        p.className += " hasChild "
                    	var divWidth = c.offsetWidth
                        this.tooltipEvents.linkElm[i] = (this.top.common.addEvents(p, this.params.eventTypesParent, this, {linkElm:p, divElm:c,child:false,divWidth:divWidth}))                       
					    this.tooltipEvents.divElm[i] = (this.top.common.addEvents(c, this.params.eventTypesChild, this, {linkElm:p, divElm:c,child:true,divWidth:divWidth}))					    
                    } 
				}
				
				divElmArray = $(this.params.contentDivClass)
				for(var i=0;i<divElmArray.length;i++){
					divElmId = divElmArray[i].id
					this.addStylingToDiv(divElmId)
				}

			},
			this.TO = false
			this.suspendMouseOut = false
			
			this.addStylingToDiv = function(divId){
				divElm = document.getElementById(divId)
				if(divElm){
					content = divElm.innerHTML
					contentAndStyling = this.params.surroundingStylingBefore + divId +"_table" + this.params.surroundingStylingMiddle + content + this.params.surroundingStylingAfter
					divElm.innerHTML = contentAndStyling		
				}
			}
			
			this.getCurOn = function(params){
				if (this.curOn === false || (this.curOn !== false && this.curOn.linkElm != params.linkElm && this.curOn.divElm != params.divElm)){
					if(this.curOn) this.hide()
					this.curOn = params
					return true
					
				}
				return false;
				
			}
			this.setCurOn = function(params){
				var currentOn = this.parent.vars.curOn
				curOnName = params.name
				if (curOnName == false){return}
				if(currentOn !== curOnName){
					curOnLink = curOnName
					this.parent.vars.curOn = curOnLink
					curOnDivId = this.findDivIdFromLinkId(curOnLink)
					curOnDiv = document.getElementById(curOnDivId)
					$(this.params.contentDivClass).css("visibility", "hidden")
					this.show(curOnDiv)
				}
			}
			this.findDivIdFromLinkId = function(linkId){
				divId = linkId.replace("tooltip-link","tooltip-div");
				return divId
			}	
			this.show = function(div){
				if(div.style.visibility=='visible'){return}	
				var n = this.parent.vars.curOn
				if(n != div.id){
					div.style.visibility='visible'
					this.parent.vars.curOn = div.id
				}
			}
			this.hide = function(){
				if(!this.curOn) return;
				this.curOn.divElm.style.visibility = "hidden"
				this.curOn = false;				
				return
				
			}
			this.moveDivTo = function(divId, left, top, width) {
				div = document.getElementById(divId)
				if( !div ) { return; }
				
				div.style.left = left + "px";
				div.style.top = top + "px";
				div.style.width = width + "px";
			}
			this.setDims = function(params){
				var divId = params.divElm.id
				var vr = document.getElementById("promo-row").getBoundingClientRect()
				var pr = params.linkElm.getBoundingClientRect()
				var cr = params.divElm.getBoundingClientRect()
				var slop = 10
				var w = pr.right-pr.left
				m = pr.left + (w/2)
				l = m-(cr.right-cr.left) - slop
				pos = l
				
				if(l<vr.left) {
					pos = m
					arrowCell = "#"+divId+"_table .tooltip-top-left"
					$(arrowCell).addClass("left-arrow")

				}else{
					arrowCell = "#"+divId+"_table .tooltip-top-right"
					$(arrowCell).addClass("right-arrow")
				}
				
				params.divElm.style.left = (pos -vr.left)+"px"

		}
			this.events = {
				mouseover:function(elm, evt, me, params){
					clearTimeout(me.TO)
					var rv = me.getCurOn(params)
					
					if(rv){
						if(!params.child){
							me.setDims(params)
			
							params.divElm.style.visibility = "visible"
						}						
					}
					return				
				},
				mouseout:function(elm, evt, me, params){
					clearTimeout(me.TO)
					var rv = me.getCurOn(params)
					if(!rv){
						me.TO = setTimeout(
							function(){
								me.hide()
							},
							me.params.sensitivity
						)
						
					}
					return
				}
			}
		}
	}
}

binder.components.genFlyout = {
	vars:{
		isIE7:(navigator.userAgent.toLowerCase().search("msie 7") != -1)
	},
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
		},
		getScroll:function(){
			var y = Math.max(
				Math.max(document.documentElement.scrollTop),
				Math.max(document.body.scrollTop)
			)
			var x = Math.max(
				Math.max(document.documentElement.scrollLeft),
				Math.max(document.body.scrollLeft)
			)
			return {y:y,x:x}
		},
        getChildByTagName:function(oElm, sTag){
            var c = oElm.childNodes
            var ary = []
            for(var i=0;i<c.length;i++){
                if(c[i].tagName && c[i].tagName.toLowerCase() == sTag.toLowerCase()) ary.push(c[i])
            }
            return ary
        }
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					start:"left bottom",
					parents:false,
                    parentContainerID:"mainNav",
                    parentContainerChildTagName:"li",
                    flyoutContainer:"mainContent",
					bOnlyOne:true,
					eventTypesParent:["mouseover", "mouseout"],
					eventTypesChild:["mouseover", "mouseout"],
					sensitivity:1000,
					ie7NudgeX:-2,
					ie7NudgeY:-3,
					mouseOverDelay:250,
					openDir:"right" /* static right, middle, and left for nav menu*/
				}
				for(var e in params) this.params[e] = params[e]
                this.parents = this.params.parents
				this.flyoutEvents = {parent:[], child:[]}
                if(!this.parents){
                    var targ = document.getElementById(this.params.parentContainerID)
                    this.params.parents = this.parent.common.getChildByTagName(targ,this.params.parentContainerChildTagName)
                }
				for(var i=0;i<this.params.parents.length;i++){
                    var p = this.params.parents[i]
                    var c =document.getElementById(p.id+"_child-0")
                    if(c){
                        p.className += " hasChild "
                        this.flyoutEvents.parent[i] = (this.top.common.addEvents(p, this.params.eventTypesParent, this, {parent:p, child:c}))
					    this.flyoutEvents.child[i] = (this.top.common.addEvents(c, this.params.eventTypesChild, this, {parent:p, child:c}))
                    } else {
                        this.top.common.addEvents(p, this.params.eventTypesParent, this, {parent:p, child:false})
                    }
				}

				this.attrib = this.top.name+"."+this.parent.name+".vars.children."+this.name+"_origClassName"

                if(this.params.flyoutContainer) this.flyoutContainer = document.getElementById(this.params.flyoutContainer)
				this.curON = false
				this.curOnChild = false
				this.TO = false
				this.mouseOverTO = false
				this.suspendMouseOut = false
				this.suspendMouseOver = false
				this.suspendClick = false



			}
			this.hideCurOn = function(){

				if(!this.curON) return
				clearTimeout(this.TO)

				//if(this.curON.child) this.curON.child.style.display = "none"

				var type = this.curON.parent.getAttribute(this.attrib)

				if(this.curON.child) this.curON.child.style.visibility =  "hidden"
				this.parent.common.overOutClick(
					{
						elm:this.curON.parent,
						type:type
					}
				)
                this.curON = false;
			}
			this.suspendEvents = function(params){
				this.suspendMouseOut = params.mouseout
				this.suspendMouseOver = params.mouseover
				this.suspendClick = params.click
			}
			this.showHide = function(elm, evt, me, params) {
				if((me.curON && me.curON.parent == params.parent)){

					return
				}
				me.hideCurOn()
				if(me.params.bOnlyOne) me.parent.hideAllFlyouts(this.name)

				me.parent.common.overOutClick(
					{
						elm:elm,
						type:evt.type
					}
				)
				me.curON = {
					parent:elm,
					child:false
				}
				if(params.child){
				   me.curON.child = params.child
				   var  p = elm.getBoundingClientRect()
					params.child.style.display = "block"
					params.child.style.visibility = "inherit"
					params.child.style.left = 0
				   var c = params.child.getBoundingClientRect()
				   var l = p.left
				   var w = c.right - c.left
				   if(me.flyoutContainer){
					   var r = me.flyoutContainer.getBoundingClientRect()
					   if(elm.id.split("_")[0] == "mainNav"){						  
						   if(elm.id.split("-")[1] < 2 ){
							   	navPosition = "left"
						   }else if((elm.id.split("-")[1] >= 2 ) && (elm.id.split("-")[1] < 5)){ 
								navPosition = "middle"
						   }else if(elm.id.split("-")[1] >= 5 ){
							   navPosition = "right"
						   }
					   }else{
						   if(me.params.openDir == "right"){
							   if(l+w > r.right){
									tL = p.right -w 
									if(tL > 0) l = tL
								}
							} else {
								if(l+w > r.right){
									tL = p.left -w 
									if(tL > 0) l = tL
								}
							}
					   }
				   }

				   var st = me.parent.common.getScroll()
				   var t = p.bottom
				   if(this.parent.vars.isIE7) {
						l += this.params.ie7NudgeX
						t += this.params.ie7NudgeY
					}				   
				   params.child.style.top = t+"px"				   
				   if(elm.id.split("_")[0] == "mainNav"){
					   if(navPosition == "left"){						   
						   /* put the left edge of the child on the left edge of the parent */
						   l = r.left		

					   }else if(navPosition == "middle" || navPosition == "right" ){
						   /* get parent width and split in half, 
						    * get menu width and split in half,
						    * subtract half of child width from half of parent width, 
						    * add this difference to the left position of the parent nav,
						    * use this number for nav left position */
						   parentLeftPos = document.getElementById("nav").getBoundingClientRect().left						   
						   parentRightPos = document.getElementById("nav").getBoundingClientRect().right
						   parentWidth = document.getElementById("nav").offsetWidth
						   childNavWidth = params.child.offsetWidth
						   parentHalfWidth = parentWidth/2						   
						   childHalfWidth = childNavWidth/2
						   navDifference = parentHalfWidth - childHalfWidth
						   middleChildLeftPosition = parentLeftPos + navDifference
						   rightChildLeftPosition = parentRightPos - childNavWidth
						   if(navPosition == "middle"){
							   l = middleChildLeftPosition							  
						   }
						   if(navPosition == "right"){							   
							   l = rightChildLeftPosition								  
						   }
					   }
					   params.child.style.left = l+st.x+"px"
					   parentRect = params.parent.getBoundingClientRect()
					   childRect = params.child.getBoundingClientRect()
					   if(childRect.right < parentRect.right){
						   var dif = parentRect.right - childRect.right
						   var newWidth = params.child.offsetWidth + dif
						   params.child.style.width = newWidth+"px"
					   }
					   if(childRect.left > parentRect.left){
						   var dif = childRect.left - parentRect.left
						   var newWidth = params.child.offsetWidth + dif
						   params.child.style.left = parentRect.left+"px"
						   params.child.style.width = newWidth+"px"
					   }
				   }else{
					   params.child.style.left = l+st.x+"px"
				   }
				   
				   /*params.child.style.left = l+st.x+"px"
				   parentRect = params.parent.getBoundingClientRect()
				   childRect = params.child.getBoundingClientRect()
				   if(childRect.right < parentRect.right){
					   var dif = parentRect.right - childRect.right
					   var newWidth = params.child.offsetWidth + dif
					   params.child.style.width = newWidth+"px"
				   }
				   if(childRect.left > parentRect.left){
					   var dif = childRect.left - parentRect.left
					   var newWidth = params.child.offsetWidth + dif
					   params.child.style.left = parentRect.left+"px"
					   params.child.style.width = newWidth+"px"
				   }*/
				   params.child.style.visibility = "visible"
				   me.parent.common.overOutClick(
						{
							elm:me.curON.parent,
							type:"mouseover"
						}
					)

				}
			}
			this.fireFlyoutEvent = function(params){
				if(this.flyoutEvents[params.targ][params.iInt]){
					this.flyoutEvents[params.targ][params.iInt].event({type:params.evt})
				}
			}
			this.events =  {
				mouseover:function(elm, evt, me, params){
					if(me.suspendMouseOver) return;
					clearTimeout(me.TO)
					var targ = elm.getAttribute(me.attrib)
					if(!targ) {
						var oCName = "mouseout"
						if(elm.className.toLowerCase().search(" click ") > 1) oCName = "click"
						elm.setAttribute(me.attrib, oCName)
					}
					 me.mouseOverTO = setTimeout(
						function(){
							clearTimeout(me.TO)
							me.showHide(elm, {type: "mouseover"}, me, params);
						},
						me.params.mouseOverDelay
					)

				},
				click:function(elm, evt, me, params){
					if(me.suspendClick) return
					clearTimeout(me.TO)
					clearTimeout(me.mouseOverTO)
                	me.showHide(elm, {type: "mouseover"}, me, params);
				},
				mouseout:function(elm, evt, me, params){
					if(me.suspendMouseOut) return
					clearTimeout(me.mouseOverTO)
					me.TO = setTimeout(
						function(){
							me.hideCurOn()
						},
						me.params.sensitivity
					)
				}
			}
		}
	},
	hideAllFlyouts:function(sName){
		for(var e in this.vars.children){
			if(e != sName) this.vars.children[e].hideCurOn()
		}
	},
	suspendEvents:function(sName, params){
		if(params == undefined) params = {}
		if(params.mouseover == undefined) params.mouseover = false
		if(params.mouseout == undefined) params.mouseout = false
		if(params.click == undefined) params.click = false
		this.vars.children[sName].suspendEvents(params)
	},
	fireFlyoutEvent:function(sName, params){
		this.vars.children[sName].fireFlyoutEvent(params)
	}
}

binder.components.promoCounter = {
    vars:{

    },
    common:{
    },
    make:{
        main:function(){
            this.constructor = function(params){
				this.params = {
					targID:"counter",
					startTime:false, 
					endTime:false,
					mode:false,
					url:false,
					elementID:false,
					replaceOnZerro:false
				}
                for(var e in params) this.params[e] = params[e]
                this.Timer = document.getElementById(this.params.targID);
				if(this.Timer){
					if(this.params.startTime && this.params.endTime){
						var t = (new Date()).getTime()
						this.useTime = this.params.endTime
						if(t < this.params.startTime) this.useTime = this.params.startTime
					}
					var me = this
					this.TO = setInterval(
						function(){
							me.updateTimer()
						}, 1000
					);
					this.updateTimer()
				}
            },
            this.updateTimer = function() {
				if(!this.params.startTime && !this.params.endTime){
					var today  = new Date()
					todayEpoch  = today.getTime()
					tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))
					target = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
					targetEpoch = target.getTime()
					diff = targetEpoch - todayEpoch
						
				} else {
					var t = (new Date()).getTime()
					var diff =  this.useTime -t
				}
				if(diff <= 0){
					clearTimeout(this.TO)
					if(this.params.replaceOnZerro){
						var replace = document.getElementById(this.params.elementID)
						if(replace){
							$.ajax({
								url: this.params.url,
								dataType: 'text/html',
								success: function(response) {
								
									replace.innerHTML = ""
									$(replace).html(response)
								},
								error: function() {
									// handle error here
								}
							});
						}
					}
				} else {
					daysLeft = Math.floor(diff / 86400000)
					diff -= 86400000*daysLeft
					hoursLeft = Math.floor(diff / 3600000)
					diff -= 3600000*hoursLeft
					minutesLeft = Math.floor(diff / 60000)
					diff -= 60000*minutesLeft
					secondsLeft = Math.floor(diff / 1000) 
					TimeStr = ((daysLeft > 0) ? ((daysLeft == 1) ? daysLeft + "day " : daysLeft + "days ") : "") + this.appendZero(hoursLeft) + ":" + this.appendZero(minutesLeft) + ":" + this.appendZero(secondsLeft);
					this.Timer.innerHTML = TimeStr;
				}
            }
            this.appendZero=function(Time) {
                return (Time < 10) ? "0" + Time : + Time;
            }
        }
    }
}

binder.components.scene7imgSwap = {
	vars:{

	},
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(active)\b/gi, '')+" "+params.type;
		},
        getChildByTagName:function(oElm, sTag){
            var c = oElm.childNodes
            var ary = []
            for(var i=0;i<c.length;i++){
                if(c[i].tagName && c[i].tagName.toLowerCase() == sTag.toLowerCase()) ary.push(c[i])
            }
            return ary
        }
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					targID:"altImagesWrapper",
                    parentContainerChildTagName:"li",
                    mainProdImgId:"js_mainImage",
                    width:false,
                    height:false
				}
				for(var e in params) this.params[e] = params[e]
                var targ = document.getElementById(this.params.targID)
                this.targs = this.parent.common.getChildByTagName(targ, this.params.parentContainerChildTagName)

                for(var i=0;i<this.targs.length;i++){
                    this.top.common.addEvents(this.targs[i], ["click"], this, {})
                }
                this.events.click(this.targs[0], {}, this, {})
                this.mainImg = document.getElementById(this.params.mainProdImgId)
                this.width = this.params.width
                this.height = this.params.height

			}
			this.events =  {
				click:function(elm, evt, me, params){
					if(elm == me.curOn) return
                    if(me.curOn) me.parent.common.overOutClick({elm:me.curOn, type:""})
                    me.parent.common.overOutClick({elm:elm, type:"active"})
                    if(me.curOn){
                        if(!me.width) me.width = me.mainImg.offsetWidth
                        if(!me.height) me.height = me.mainImg.offsetHeight
                        var a =  elm.getElementsByTagName("img")[0].src.split("?")
                        var srcObj = a.pop().split("&")
                        for(var i=0;i<srcObj.length;i++){
                                var temp = srcObj[i].split("=")
                                if(temp[0] == "hei") temp[1] = me.height
                                if(temp[0] == "wid") temp[1] = me.width
                                if(temp[0] == "size") temp[1] = me.width+","+me.height
                                srcObj[i] = temp.join("=")
                        }
                        /*
                        srcObj[1] = srcObj.join("&")


                        var src = me.mainImg.src.split("?")
                        src[1] = srcObj.join("&")
                        */
                        //me.mainImg.src = a[0]+"?"+srcObj.join("&")
                        crZoomViewer.scene7ImageUpdate(elm);
                    }
                    me.curOn = elm
				}
			}
		}
	}
}

binder.components.geolocation = {
    vars:{
        errorMessages:{
            PERMISSION_DENIED:"We don't have permission to use your location. Please enter a zip code.",
            POSITION_UNAVAILABLE:"We can't find you right now. Please enter a zip code",
            TIMEOUT:"This seems to be taking long,  please enter a zip code instead.",
            defaultMSG:"We're trying to find your location Cancel"
        },
        blockerZindex:10000,
        blockerClassName:"geoBlocker",
        iGiveUp:10000,
        defaultWaitMsg:"<p>We're trying to find your location, close to cancel.</p>",
        hopup:false
    },
    common:{
        getScroll:function(){
            return {y:document.documentElement.scrollTop, x:document.documentElement.scrollLeft}
        },
        getDocHeight:function() {
            var D = document;
            return Math.max(
                Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
                Math.max(D.body.clientHeight, D.documentElement.clientHeight)
            );
        },
        getDocWidth:function() {
            var D = document;
            return Math.max(
                Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
                Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
                Math.max(D.body.clientWidth, D.documentElement.clientWidth)
            );
        }
    },
    make:{
        main:function(){
            this.constructor = function(params){
                this.params = {
                    targ:"getGeoDiv",
                    hideId:"getGeoDiv",
                    formName:"getLocationForm",
                    formLatName:"latitude",
                    formLonName:"longitude",
                    formDestName:"dest"
                }
                for(var e in params) this.params[e] = params[e]
                if(navigator.geolocation){
                    document.getElementById(this.params.targ).style.display = "block"
					var targ = document.getElementById(this.params.targ)
					var counter = 0
					//debugger;
					while(targ){
						targ.id = targ.id+"_"+counter
						counter++
						this.top.common.addEvents(targ, ["click"], this, {}, {parent:false})
						targ = document.getElementById(this.params.targ)
					}
                } else {
					var targ = document.getElementById(this.params.targ)
					targ.parentNode.removeChild(targ)
				}
                this.count = 0
            },
            this.events = {
                mouseup:function(elm, evt, me, params){
                    alert(me.parent.vars.errorMessages.defaultMSG)
                    document.location.reload(1)
                },
                click:function(elm, evt, me, params){
                    if(!me.parent.vars.hopup) me.parent.vars.hopup = me.top.hopup.create(me.parent.name, {}, me.parent)
                    me.parent.vars.hopup.HTML({html:me.parent.vars.defaultWaitMsg + "<p class='buttonRow'><input type='button' class='genInputButton' value='Close' onclick='binder.hopup.close()'></p>"})
                    navigator.geolocation.getCurrentPosition(
                        function(position){
                            var form = document.forms[me.params.formName]
                            form.elements[me.params.formLatName].value = position.coords.latitude
                            form.elements[me.params.formLonName].value = position.coords.longitude
                            //form.elements[me.params.formDestName].value = ""
							form.submit()
							/*
                            $.ajax({
                                url: $(form).attr( 'action' ),
                                type: "html",
                                success: function(data) {
									me.parent.vars.hopup.close(me.parent.name)
                                    $('table.storeFinder').css("display","none");
                                    $('div.storeAddress').html(data);
                                    $('table.storeFinderWithGeo').css("display","block");
                                },
								error: function(data){
									me.parent.vars.hopup.close(me.parent.name)
									$('table.storeFinder').css("display","none");
                                    $('div.storeAddress').html(data);
                                    $('table.storeFinderWithGeo').css("display","block");
								}
                            });
							*/


                        },
                        function(er){
                            switch(er.code){
                                case er.PERMISSION_DENIED: alert(me.parent.vars.errorMessages.PERMISSION_DENIED);
                                break;
                                case er.POSITION_UNAVAILABLE: alert(me.parent.vars.errorMessages.POSITION_UNAVAILABLE);
                                break;
                                case er.TIMEOUT: alert(me.parent.vars.errorMessages.TIMEOUT);
                                break;
                                default: alert(me.parent.vars.errorMessages.defaultMSG);
                                break;
                            }
                            me.parent.vars.hopup.close(me.parent.name)
                        },
                        {timeout:me.parent.vars.iGiveUp}
                    )
                }
            }
        }
    },
    events:{
        click:function(elm, evt, that, params){
            if(that.group.vars.hopup == that) that.HTML("")
            document.location.reload(1)
        }
    }
}

binder.components.happyHour = {
    vars:{
        type:{
            flyout:[
				'<div id="navHappyHourWrapper_child-0" style="width:100%;overflow:hidden">',
				'<div class="iconSprite pinkSmTextBubble"> </div>',
				'<div id="mainNav_child-6" class="sanchez fl happyHour">Happy Hour</div>',
				'</div>'
			],
			linked:[
				'<div class="iconSprite pinkSmTextBubble"> </div>',
				'<div id="mainNav_child-6" class="sanchez fl happyHour"><a href="/custserv/store_locator_landing.jsp" target="_self">Happy Hour</a></div>'
			]
        }
    },
    common:{
        getScroll:function(){
            return {y:document.documentElement.scrollTop, x:document.documentElement.scrollLeft}
        },
        getDocHeight:function() {
            var D = document;
            return Math.max(
                Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
                Math.max(D.body.clientHeight, D.documentElement.clientHeight)
            );
        },
        getDocWidth:function() {
            var D = document;
            return Math.max(
                Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
                Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
                Math.max(D.body.clientWidth, D.documentElement.clientWidth)
            );
        }
    },
    make:{
        main:function(){
            this.constructor = function(params){
                this.params = {
                    type:"flyout",
					navTarg:"navHappyHourWrapper",
					happyDivId:"navHappyHourWrapper_child-0_child-0",
					happyContentId:"happyHourFlyoutContent",
					eventTypesParent:["mouseover", "mouseout"],
					sizer:"happyHourSizer",
					table:"happyHourFlyoutTable",
					offsetWidth:80,
					offsetHeight:60,
					startTime:false,
					endTime:false
                }
                for(var e in params) this.params[e] = params[e]
				this.tableRect = false;

            },
			this.draw = function(){

				document.getElementById(this.params.navTarg).innerHTML = this.parent.vars.type[this.params.type].join("\n")

				if(this.params.type == "flyout"){
					binder.genFlyout.create(
						this.name,
						{
							start:"left bottom",
							parentContainerID:this.params.navTarg,
							parentContainerChildTagName:"div",
							flyoutContainer:this.params.happyDivId,
							sensitivity:1000,
							eventTypesParent: this.params.eventTypesParent,
							openDir:"left"
						},
						this
					)
					
				}
			}

			this.resize = function(){
				if(this.tableRect === false){
					var table = document.getElementById(this.params.table)
					var div = document.getElementById(this.params.happyDivId) 
					div.style.left = 0
					var rect = document.getElementById(this.params.happyContentId).getBoundingClientRect()
					var rectb = document.getElementById(this.params.sizer).getBoundingClientRect() //document.getElementById(this.params.table).getBoundingClientRect()

					var sizer = document.getElementById(this.params.sizer)
					var w = (rect.right-rect.left)-this.params.offsetWidth //+(rectb.right-rectb.left)
					if(w > 0) sizer.style.width = w+"px"
					var h = (rect.bottom-rect.top)-this.params.offsetHeight //+(rectb.bottom-rectb.top)
					if(h > 0) sizer.style.height = h+"px"

					this.tableRect = rectb
					table.style.width = table.offsetWidth+"px"
				}
			}

			this.showHide = function(elm, evt, that, params){
				var me = that.group;
				me.resize()
				that.events.mouseover(elm, evt, that, params)
				setTimeout(
					function(){
						delete me.events.mouseover
					},1
				)
			}

            this.events = {
                mouseover:function(elm, evt, that, params){
					var me = that.group;
					me.showHide(elm, evt, that, params);
                },
				click:function(elm, evt, that, params){
					var me = that.group;
					me.showHide(elm, evt, that, params);
                }
            }


        }
    },
	draw:function(sChild){
		if(this.vars.children[sChild]) this.vars.children[sChild].draw()
	}
}

binder.components.zIndexer = {
	vars:{
		masterIndex:{
			indexed:[],
			active:{},
			top:10001,
			totalZ:0
		},
		onllyChildName:false
	},
	common:{
		findZ:function(params){
			var cs = false
			if (window.getComputedStyle) cs = true
			var baseLUT = this.parent.name+".vars.masterIndex.indexed"
			for(var i=0;i<params.elms.length;i++){
				var targ = params.elms[i];
				var lut = targ.getAttribute(baseLUT)
				if(!lut){
					var z = false
					if (targ.currentStyle){
						z = targ.currentStyle[params.search]
					} else {
						if(cs) z = document.defaultView.getComputedStyle(targ,null).getPropertyValue(params.search);
					}
					z = parseInt(z)
					if(!isNaN(z)){
						var l = this.parent.vars.masterIndex.indexed.length;
						targ.setAttribute(baseLUT, l)
						this.parent.vars.masterIndex.indexed[l] = {
							elm:targ,
							lut:l,
							styleZ:targ.style.zIndex,
							baseZ:z,
							curZ:z
						}
						if(z > this.parent.vars.masterIndex.top) this.parent.vars.masterIndex.top = z
					}
				}
			}
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				if(this.parent.vars.children.count) return this.parent.vars.children[0]
				this.params = {
					search:document,
					tags:["*"]
				}
				for(var e in params) this.params[e] = params[e]
				this.index(this.params)

			}
			this.index = function(params){
				var z = "zIndex"
				if(navigator.userAgent.search(/firefox/gi) > -1) z = "z-Index"
				for(var i=0;i<params.tags.length;i++){
					this.parent.common.findZ(
						{
							elms:params.search.getElementsByTagName(params.tags[i]),
							search:z
						}
					)
				}
			}
			this.setTop = function(params){
				var iInt = 0;
				if(!params.GUID) params.GUID = new Date().getTime()
				var mIndex = this.parent.vars.masterIndex
				if(mIndex.active[params.GUID]){
					while(mIndex.active[params.GUID+"_"+iInt]) iInt++
					params.GUID += "_"+iInt
				}
				if(!params.elms.length) params.elms = [params.elms]
				mIndex.active[params.GUID] = params.elms
				for(var i=0;i<params.elms.length;i++){
					params.elms[i].style.zIndex = mIndex.top+i
				}
				mIndex.top += i
				return params.GUID
			}
			this.leaveTop = function(params){

				var iInt = 0;
				var mIndex = this.parent.vars.masterIndex
				var targs = mIndex.active[params.GUID]
				if(!targs) return false;
				var dec = 1
				for(var i=0;i<targs.length;i++){
					if(targs[i].style.zIndex > mIndex.top) dec++
					bIsIndexed = targs[i].getAttribute(this.parent.name+".vars.masterIndex.indexed")
					if(bIsIndexed) targs[i].style.zIndex = mIndex.indexed[bIsIndexed].styleZ
				}
				mIndex.top -= dec
				delete mIndex.active[params.GUID]
			}
		}
	},
	leaveTop:function(params){
		/*
			Removes elements from the top of the zIndex stack and puts them back to were they blong

			params

			GUID	str		pointer to elments to remove
		*/
		if(!this.vars.onllyChildName) this.create(false, false, false)
		this.vars.children[this.vars.onllyChildName].leaveTop(params)
	},
	setTop:function(params){
		/*
			Sets a range of elements to the top, returns a GUID id to be used in setting the zIndex back, see leaveTop

			params

			GUID	str		desired GUID, if it's already being used, it will be incremented until it's not
			elms	ary		array of elements to have there zIndex ordered from lowest to highest

		*/
		if(!this.vars.onllyChildName) this.create(false, false, false)
		this.vars.children[this.vars.onllyChildName].setTop(params)
	},
	index:function(params){
		/*
			finds zIndexes on elements and stores there values. If the elements zIndex is higher, vars.masterIndex.top will be updated to it's zIndex

			params

			search	elm		element to start searching from, default document
			tags	ary		array of tags to search for, default ["*"]

		*/
		if(!elm.search)elm.search = document
		if(!elm.tags) elm.tags = ["*"]


		if(!this.vars.onllyChildName) this.create(false, false, false)
		this.vars.children[this.vars.children[this.vars.onllyChildName]].index({tags:elm.search.tags(elm.tags)})
		/*
		for(var e in this.vars.children){
			this.vars.children[e].index(params)
			break;
		}
		*/
	},
	create:function(name, params, group){
		if(!this.vars) this.vars = {};
		this.vars.children = {};
		if(!this.vars.onllyChildName){
			if(!name) name = (new Date).getTime()+""
			this.vars.onllyChildName = name
			this.group = group;

			this.vars.children[name] = new this.make.main();
			if(!this.vars.children[name].init) this.vars.children[name].init = this.top.common.packageInit;
			this.vars.children[name].init(name, this, this.top, group);
			if(this.vars.children[name].constructor(params)){
				delete this.vars.children[name];
				return false;
			}
		}
		return this.vars.children[this.vars.onllyChildName];
	}
}

binder.components.mysteryMeatNav = {
	vars:{

	},
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					meatClass:"meatSprite",
					meatBarId:"mysteryMeatNavBar",
					meatMoverId:"mysteryMeatNav",
					targID:"mysteryMeatContainer",
					titles:false,
					totalMeat:4,
					start:0
				}
				for(var e in params) this.params[e] = params[e]
				this.elm = document.getElementById(this.params.targID)
				this.divs = []
				for(var i=0;i<this.params.totalMeat;i++){
					var div = this.elm.appendChild(document.createElement("div"))
					div.className = this.params.meatClass
					if(this.params.titles) div.title = this.params.titles[i]
					this.top.common.addEvents(div, ["mouseover", "mouseout", "click"], this, {iInt:i})
					this.divs[i] = div
				}
				this.curOn = this.divs[this.params.start]
				this.parent.common.overOutClick(
					{
						elm:this.curOn,
						type:"click"
					}
				)
				this.meatBar = document.getElementById(this.params.meatBarId)
				this.meatMover = document.getElementById(this.params.meatMoverId)
				this.meatMover.style.left = (this.meatBar.offsetWidth/2)-(this.meatMover.offsetWidth/2)+"px"
				this.meatMover.style.visibility = "inherit"
			}
			this.getDiv= function(params){
				return this.divs[params.iInt]
			}
			this.events = {
				mouseover:function(elm, evt, me, params){
					if(elm == me.curOn) return
					me.parent.common.overOutClick(
						{
							elm:elm,
							type:evt.type
						}
					)
				},
				mouseout:function(elm, evt, me, params){
					if(elm == me.curOn) return
					me.parent.common.overOutClick(
						{
							elm:elm,
							type:evt.type
						}
					)
				},
				click:function(elm, evt, me, params){
					if(elm == me.curOn) return
					if(me.curOn){
						me.parent.common.overOutClick(
							{
								elm:me.curOn,
								type:"mouseout"
							}
						)
					}
					me.curOn = elm
					me.parent.common.overOutClick(
						{
							elm:elm,
							type:evt.type
						}
					)
				}
			}
		}
	},
	getDiv:function(sChild, params){
		return this.vars.children[sChild].getDiv(params)
	}
}

if (typeof(mw)==="undefined") {
binder.components.singleConSlider = {
	vars:{

	},
	common:{
		easeInOutQuad:function(t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t + b;
			t--;
			return -c/2 * (t*(t-2) - 1) + b;
		},
        getChildByTagName:function(oElm, sTag){
            var c = oElm.childNodes
            var ary = []
            for(var i=0;i<c.length;i++){
                if(c[i].tagName && c[i].tagName.toLowerCase() == sTag.toLowerCase()) ary.push(c[i])
            }
            return ary
        }
	},
	make:{
		main:function(){
			this.constructor = function(params){
				if(this.parent.vars.children.count) return this.parent.vars.children[0]
				this.params = {
					windowDiv:"sliderWindow",
					sliderDiv:"sliderWindow_slider",
					childrenTagName:"div",
					move:"horizontal",
					autoPlay:5000,
					autoPlayDir:-1,
					speed:500,
					popElement:true
				}
				for(var e in params) this.params[e] = params[e]
				this.windowDiv = document.getElementById(this.params.windowDiv)
				this.top.common.addEvents(this.windowDiv, ["mouseover", "mouseout"], this, {})

				this.sliderDiv = document.getElementById(this.params.sliderDiv)
				var rv = this.parent.common.getChildByTagName(this.sliderDiv, this.params.childrenTagName)
				this.children = []
				if(this.params.popElement){
					while(rv.length) this.children.push(rv.pop())
				} else {
					while(rv.length) this.children.push(rv.shift())
				}
				this.dims = false
				this.cur = 0
				this.next = false

				this.curLeft = 0
				this.curTop = 0

				this.bIsAnimating = false
				this.TO = false
				this.MOTO = false
				this.autoPlayTO = false
				this.resumeTO = false
				if(this.params.autoPlay){
					this.setAutoPlay()
				}
			}
			this.setAutoPlay = function(params){
				if(params == undefined) params = {}
				var iSpeed = params.iSpeed
				var iDir = params.iDir
				if(!iSpeed) iSpeed = this.params.autoPlay
				if(!iDir) iDir = this.params.autoPlayDir
				var me = this
				clearTimeout(this.autoPlayTO)
				this.autoPlayTO = setInterval(
					function(){
						me.moveBy(
							{
								iInt:iDir,
								bAuto:true
							}
						)
					},
					iSpeed
				)
			}
			this.getDims = function(){
				var rect = this.windowDiv.getBoundingClientRect()
				this.dims = {
					w:rect.right-rect.left,
					h:rect.bottom-rect.top
				}
				for(var i=0;i<this.children.length;i++){
					//var v = "hidden"
					//if(i == this.cur) v =  "visible"
					//this.children[i].style.visibility = v
					this.children[i].style.visibility = "visible"
					var v = "none"
					if(i == this.cur) v =  ""
					this.children[i].style.display = v
				}
			}
			this.stopAutoPlay = function(){
				if(this.params.autoPlay){
					this.stop()
					this.params.autoPlay = false
				}
			}
			this.stop = function(){
				if(this.bIsAnimating){
					this.startTime = 0
					this.animate()
					this.bIsAnimating = false;
				}
				clearTimeout(this.autoPlayTO)
			}

			this.resetDisplay = function(){
				//if(this.next) this.next.style.visibility = "hidden"
				//if(this.next) this.children[this.cur].style.visibility = "hidden"
				var next = this.cur + (this.dir*-1)
				if(next >= this.children.length) next = 0
				var l = this.children.length;
				if(next < 0 ) next = l-1
				if(next > l-1) next = 0
				if(this.params.move == "horizontal"){

					if(this.dir < 0 ){
						this.children[this.cur].style.left = 0
						this.children[next].style.left = this.dims.w+"px"
					} else {
						this.children[next].style.left = -this.dims.w+"px"
						this.children[this.cur].style.left = 0
					}
					this.sliderDiv.style.left = 0
				} else {
					this.sliderDiv.style.top = "0px"
					if(this.dir < 0 ){
						this.children[this.cur].style.top = "0px"
						this.children[next].style.top = this.dims.h+"px"
					} else {
						this.children[next].style.top = -this.dims.h+"px"
						this.children[this.cur].style.top = "0px"
					}

				}
				//this.children[this.cur].style.visibility = this.children[next].style.visibility = "visible"
				this.children[this.cur].style.display = this.children[next].style.display = ""
				this.next = this.children[next]
				this.top.common.functionBubble("resetDisplay", this, {})
			}


			this.moveBy = function(params){
				if(!params.bAuto) this.stopAutoPlay()
				if(this.bIsAnimating) return
				if(!this.dims) this.getDims()
				this.dir = (params.iInt/Math.abs(params.iInt))
				this.resetDisplay()
				this.distance = this.dims.h
				if(this.params.move == "horizontal") this.distance = this.dims.w
				this.offset = 0
				this.bIsAnimating = true
				var me = this
				this.startTime = (new Date).getTime()
				this.TO = setInterval(
					function(){
						me.animate()
					},50
				)
			}

			this.moveTo = function(params){
				if(!params.bAuto) this.stopAutoPlay()
				if(this.bIsAnimating) return
				if(!this.dims) this.getDims()
				var ary = this.children
				var len = ary.length
				var delta = params.iInt-this.cur
				if(delta){
					if(delta > 0){
						var r = delta
						var l = ary.slice(params.iInt-len).length+this.cur
					} else {
						var l = Math.abs(delta)
						var r = len-this.cur+params.iInt
					}

					//var r = ary.slice(3-ary.length-1)
					//var delta = Math.abs(this.cur-params.iInt)
					var base = this.dims.h
					if(this.params.move == "horizontal") base = this.dims.w

					this.distance = base*r
					this.dir = -1
					if(l < r) {
						this.distance = base*l
						this.dir = 1
					}
					this.offset = 0
					this.bIsAnimating = true
					this.resetDisplay()
					var me = this
					this.startTime = (new Date).getTime()
					this.TO = setInterval(
						function(){
							me.animate()
						},50
					)
				}
			}

			this.animate = function(){
				var dTime = (new Date).getTime()-this.startTime
				if(dTime > this.params.speed) {
					dTime = this.params.speed
					this.bIsAnimating = false
					clearTimeout(this.TO)
					//this.children[this.cur].style.visibility = "hidden"
					this.children[this.cur].style.display = "none"
					this.cur -= this.dir
					var l = this.children.length;
					if(this.cur < 0 ) this.cur = l-1
					if(this.cur > l-1) this.cur = 0

				}
				if(this.params.move == "horizontal"){
					this.curLeft = parseInt(this.parent.common.easeInOutQuad(dTime, 0, this.distance, this.params.speed))
					if(this.curLeft-this.offset > this.dims.w ){
						this.offset += this.dims.w
					//this.children[this.cur].style.visibility = "hidden"
					this.children[this.cur].style.display = "none"
						this.cur -= this.dir
						var l = this.children.length;
						if(this.cur < 0 ) this.cur = l-1
						if(this.cur > l-1) this.cur = 0
						this.resetDisplay()
					}
					if(this.curLeft-this.offset < 0){
						this.offset += this.dims.w
					//this.children[this.cur].style.visibility = "hidden"
					this.children[this.cur].style.display = "none"
						this.cur -= this.dir
						var l = this.children.length;
						if(this.cur < 0 ) this.cur = l-1
						if(this.cur > l-1) this.cur = 0
						this.resetDisplay()
					}
					this.sliderDiv.style.left = (this.curLeft-this.offset)*this.dir+"px"
				} else {
					this.iTop = parseInt(this.parent.common.easeInOutQuad(dTime, 0, this.distance, this.params.speed))
					if(this.iTop > this.dims.h ){
						this.iTop = this.dims.h - move
						this.sliderDiv.style.top = 0
						//this.resetDisplay()
					}
					if(this.iTop < 0){
						this.iTop = move - this.dims.h
						this.sliderDiv.style.top = 0
						//this.resetDisplay()
					}
					this.sliderDiv.style.top = (this.iTop)*this.dir+"px"
				}
				if(!this.bIsAnimating){
					//if(this.params.move != "horizontal") debugger;
					this.resetDisplay()
				}
			}
			this.events = {
				mouseover:function(elm, evt, me, params){
					clearTimeout(me.MOTO)
                    me.stop()
				},
				mouseout:function(elm, evt, me, params){
					if(me.params.autoPlay){
						me.MOTO = setTimeout(
							function(){
								for(var e in me.resumeTO) clearTimeout(me.resumeTO)
								me.resumeTO = {
									moveNow:setTimeout(
										function(){
											me.moveBy(
												{
													iInt:me.params.autoPlayDir,
													bAuto:true
												}
											)
										},0
									),
									moveLater:setTimeout(
										function(){
											me.setAutoPlay()
										},me.params.speed+10
									)
								}
							},50
						)
					}
				}
			}
		}
	},
	getCur:function(sName){
		return this.vars.children[sName].cur
	},
	getSliders:function(sName){
		return this.vars.children[sName].children
	}
}
}

binder.components.slider = {
	vars:{

	},
	common:{

	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					leftArrow:"mainSliderLeftArrow",
					rightArrow:"mainSliderRightArrow",
					useMeat:true,
					useArrows:true,
					autoPlay:10000,
					speed:1000,
					autoPlayDir:-1
				}
				for(var e in params) this.params[e] = params[e]
				
				this.slider = this.top.singleConSlider.create(this.name, {autoPlay:this.params.autoPlay, speed:this.params.speed, autoPlayDir:this.params.autoPlayDir}, this)
				this.sliders = this.slider.parent.getSliders(this.slider.name)
				if(this.sliders.length > 1){
					this.titles = []
					for(var i=0;i<this.sliders.length;i++){
						this.titles[i] = this.sliders[i].getElementsByTagName("img")[0].alt
					}
					if(this.params.useMeat){
						this.meat = this.top.mysteryMeatNav.create(this.name, {totalMeat:this.sliders.length, titles:this.titles}, this)
					}
				}
				if(this.params.useArrows){
					this.leftArrowElm = document.getElementById(this.params.leftArrow)
					this.rightArrowElm = document.getElementById(this.params.rightArrow)
					this.leftArrow = this.top.arrows.create(
						this.name+"_arrowLeft",
						{
							x:1,
							elm:this.leftArrowElm
						},
						this
					)
	
					this.rightArrow = this.top.arrows.create(
						this.name+"_arrowRight",
						{
							x:-1,
							elm:this.rightArrowElm
						},
						this
					)
				}else{
					this.leftArrowElm = document.getElementById(this.params.leftArrow)
					this.rightArrowElm = document.getElementById(this.params.rightArrow)
					$(this.leftArrowElm).hide();
					$(this.rightArrowElm).hide();
					
				}
				
			}

			this.resetDisplay = function(that, params){
				var me = that.group
				if(that == me.slider){
					var iInt = me.slider.parent.getCur(me.slider.name)
					if(me.params.useMeat){
						me.meat.events.click(
							me.meat.parent.getDiv(
								me.meat.name,
								{
									iInt:iInt
								}
							),
							{
								type:"click"
							},
							me.meat,
							{
								iInt:iInt,
								bIgnore:true
							}
						)
					}
				}
			}
			this.events = {
				click:function(elm, evt, that, params){
					me = that.group
					
					if(me.params.useMeat){
						if(!params.bIgnore){
							me.slider.moveTo(
								{
									iInt:params.iInt
								}
							)
						}
						that.events.click(elm, evt, that, params)						
					}else {
						if(me.params.useArrows && that.parent.name == "arrows"){
							if(!params.bIgnore){
								me.slider.moveBy(
									{
										iInt:params.x
									}
								)
							}
							that.events.click(elm, evt, that, params)
						}
					}
				}
			}
		}
	}
}


binder.components.login = {
    vars:{},
    common:{
        showTheCreateAccountDivOnTheLginPage:function(){
            var targ = document.getElementById('loginNewCustomer')
            if(targ) {
                targ.style.display = 'block';
                this.parentElement.parentElement.style.display='none'
            }
        }
    },
    make:{
        main:function(){

            this.constructor = function(params){
                this.params = {
                    url:"https://"+window.location.hostname.toString()+"/user/linkFBUserToOCPUser.cmd",
                    //url:"http://cr-local.fry.com/SL/login_verify.jsp"
                    updateSLdata:{
                        user:{
                            id:[],
                            profile:{
                                name:{
                                    first:""
                                }
                            }
                        }
                    },
                    loggedIn:false,
                    isLoggedIntoFB:false,
                    bPost:false
                }
                try{
                    if(typeof(SL) == "undefined") {
                        SL = []
                    }
                }catch(e){
                    this.dealyLoad(this.params)
                    return false;
                }
                for(var e in params) this.params[e] = params[e]

                this.userIsLoggedIn = false

                if((this.params.updateSLdata.user.id.length && this.params.updateSLdata.user.id[0].id.length) || (this.params.updateSLdata.user.profile.name.first.length)) this.userIsLoggedIn = true
                /*
                 if(testIsUserLoggedInToCR){
                 for(var e in this.params.updateSLdata) {
                 RondavuData[e] = this.params.updateSLdata[e]
                 }
                 SL.push(['updatePage',window.location.pathname, RondavuData])
                 }
                 */
                var me = this
                var slEvents = ['onFacebookStatusChange', 'getFacebookLoginStatus']
                //var slEvents = ['onFacebookStatusChange']
                //var slEvents = []
                for(var i=0;i<slEvents.length;i++){
                    var evt = slEvents[i]
                    //console.log("slEvents[i] : "+slEvents[i]);
                    SL.push(
                        [
                            evt,
                            function(payload, sig_base64) {
                                if(!payload && !sig_base64){
                                    if(me.params.loggedIn) {
                                        // we need to put code to log the person out of SM
                                        //SL.push(['logUserOutOfFacebook']);
                                        //document.location = "http://"+location.host+"/user/logoutFBUserFromOCP.cmd"

                                    }
                                } else {
                                    if(!me.params.loggedIn){
                                        me.SLlogin(payload, sig_base64, evt)
                                    }
                                }
                            }
                        ]
                    )
                }

                this.dealyLoad = function(params){
                    var me = this
                    this.TO = setTimeout(
                        function(){
                            me.parent.create(me.name, params)
                        },
                        100
                    )
                }

                this.loginOutAction = function(params){
                    if(params.action == "logout"){
                        if( this.params.isLoggedIntoFB ) {
                            if( this.userIsLoggedIn ) {
                                SL.push(['logUserOutOfFacebook'])
                            }
                            setTimeout(
                                function(){
                                    document.location = "/user/logoutFBUserFromOCP.cmd"
                                },500
                            )
                        } else {
                            setTimeout(
                                function(){
                                    document.location = "/user/logout.cmd"
                                },500
                            )
                        }
                    }
                }

                this.SLlogin = function(payload, sig_base64, eventName){

                    if(!this.userIsLoggedIn){
                        this.top.commonJSON.create(
                            this.name,
                            {
                                JSON:this.params.url,
                                ary:["payload="+encodeURIComponent(payload), "signature="+sig_base64],
                                vars:{type:"SLlogin", name:this.name, action:"handleLogin"},
                                serverQuery:"cb",
                                bPost:this.params.bPost
                            }
                        )
                        // this is the first time login in, so update stuff here instead of reloading the page or calling all of ajax
                        this.userIsLoggedIn = true
                        this.params.isLoggedIntoFB = true;
                    } else {
                        if(!payload){
                            this.userIsLoggedIn = false
                            this.top.common.goHere("/user/logout.cmd", false, "http")
                        } else {
                            // they're loggedin and the page has loaded
                        }
                    }
                }
            }
        }
    },
    fakeSLresponse:function(sName, params){
        if(params.type = "both"){
            this.vars.children[sName].SLlogin(
                "fb_uid=123213123123123&email=fred@red.com&first_name=fred&last_name=ed&timestamp="+(new Date).getTime(),
                "asdfasfdasfdasdfasdfasdfasdfasdfasdfasfdasdfasdfasdfasdf",
                "onFacebookStatusChange"
            )
        }

        if(params.type = "noSig"){
            this.vars.children[sName].SLlogin(
                "fb_uid=123213123123123&email=fred@red.com&first_name=fred&last_name=ed&timestamp="+(new Date).getTime(),
                "",
                "onFacebookStatusChange"
            )
        }

        if(params.type = "none"){
            this.vars.children[sName].SLlogin(
                "",
                "",
                "onFacebookStatusChange"
            )
        }
    },
    handleLogin:function(sName, params){
        /*

         {
         error		string	any error messaging
         redirectURL	string	if this string has a length, will go to that page
         }
         */

        if(params.redirectURL && params.redirectURL.length){
            document.location = redirectURL
        } else {
            if(location.toString().search("/user/login.jsp") != -1 || location.toString().search("/user/logoutFBUserFromOCP.cmd") != -1) {
                document.location = "/user/main.jsp?merged=mergeSuccess"
            }
            if(location.toString().search("/user/login.cmd") != -1) {
                document.location = "/user/main.jsp?merged=mergeSuccess"
            }
            if(location.toString().search("/user/wishlist.jsp") != -1){
                document.location = "/user/wishlist.jsp"
            }
            if(location.toString().search("/checkout/checkout.jsp") != -1){
                document.location = "/checkout/checkout.jsp"
            }
            if(location.toString().search("/checkout/checkout.jsp") != -1 && document.getElementById("panelReceipt").length != 0){
                document.location = "/user/main.jsp?merged=mergeSuccess"
            }
        }
    },

    loginOutAction:function(sName, params){
        this.vars.children[sName].loginOutAction(params)
    },
    logoutProxy:function(){
        binder.login.loginOutAction('login', {action:'logout'})
    },
    siteLogin:function(sName, params){

        //var goBack = window.location.toString().split(window.location.hostname).pop()
        //if(goBack.search("logout.cmd") > -1) goBack = "/"
        goBack = "/user/main.jsp"

        if(!params.action) params.action ="login"
        if(params.action){
            if(params.action.toLowerCase() == "login"){
                this.top.common.goHere("/user/login.jsp?dest="+goBack, true)
            } else {
                //if(this.top.vars.isLoggedIn) this.top.common.goHere("/user/logout.cmd?dest="+goBack, true)
                if(this.top.vars.isLoggedIn) {
                    SL.push(
                        [
                            'getFacebookLoginStatus',
                            function(response, signature) {
                                if (typeof response != 'undefined') {
                                    SL.push(['logUserOutOfFacebook']);
                                }
                                document.location = "http://"+location.host+"/user/logout.cmd"
                            }
                        ]
                    );
                    //this.top.common.goHere("/user/logout.cmd", false, "http")
                }
            }
        } else {
            //this.top.common.goHere("/user/login.jsp?dest="+goBack, true)
        }
    }
}



binder.components.commonJSON = {
    vars:{
		chache:{
			sl:1
		},
        scriptInsertNode:1,
        overRides:{
            topNavJSONP:{
                ary:[]
            }
        },
        JSONP:{},
		promos:{}
    },
    common:{
        JSONP:function(params){
            if(params.iCache){
                var d = params.iCache;
            } else {
                var d = (new Date).getTime();
            }
            //if(typeof(d) != "string") d = "'"+d+"'"
            var j = this.parent.vars.JSONP;
            while(j[d]) d++
            var s = document.createElement("SCRIPT");
            if(j[d+"_TO"]) clearTimeout(j[d+"_TO"])
            j[d+"_TO"] = setTimeout(
                function(){
                    //oObj[sFun]({error:"A network error has occured, reloading the page"}, oVars)
                },10000
            )
            j[d] = function(oRet){
                clearTimeout(j[d+"_TO"])
                params.oObj[params.sFun](oRet, params.oVars);
                delete j[d];
                delete j[d+"_TO"]
                s.parentNode.removeChild(s)
            }
            //binder.commonJSON.common.JSONP['1000']
            //s.src = params.sURL+"?"+params.serverQuery+"="+this.top.name+"."+this.parent.name+"."+this.name+".JSONP["+d+"]&parent="+this.parent.name+"&name="+this.name+"&"+params.sQuery;
            var url = params.sURL+"?"+params.serverQuery+"="+this.top.name+"."+this.parent.name+".vars.JSONP["+d+"]"
            if(params.sQuery.length) url += "&"+params.sQuery
            setTimeout(
                function(){
                    s.src = url
                    //document.documentElement.childNodes[this.parent.vars.scriptInsertNode].appendChild(s);
                    document.getElementsByTagName("head")[0].appendChild(s)
                },5
            )
        },
		post:function(params){
			var fun = params.oObj[params.sFun]
			$.ajax(
				{
					url:params.sURL,
					cache:params.iCache,
					data:params.sQuery,
					type:"POST",
					complete:function(jqXHR, textStatus){
						eval("var oRet = "+jqXHR.responseText)
						params.oObj[params.sFun](oRet, params.oVars)
						//fun(oRet, params.oVars)
						//params.oObj[params.sFun](oRet, params.oVars)
						//me[params.oObj][params.sFun](oRet, params.oVars)
					}
				}
			)
		}
    },
    make:{
        main:function(){
            this.constructor = function(params){
                this.params = {
                    JSON:"/jsonp/ajaxPackager/ajaxPackage.jsp",
					ary:[],
					vars:{type:"main"},
					serverQuery:"cb",
					sFun:"callBack",
					iCache:false,
					bPost:false
                }
                for(var e in params) this.params[e] = params[e]
				if(typeof(this.parent.vars.overRides[this.name]) != "undefined"){
					 for(var e in this.parent.vars.overRides[this.name]) this.params[e] = this.parent.vars.overRides[this.name][e]
				}
				if(this.params.bPost){
					this.parent.common.post(
						{
							oObj:this,
							sFun:this.params.sFun,
							oVars:this.params.vars,
							sURL:this.params.JSON,
							sQuery:this.params.ary.join("&"),
							serverQuery:this.params.serverQuery,
							iCache:params.iCache
						}
					)
				} else {
					this.parent.common.JSONP(
						{
							oObj:this,
							sFun:this.params.sFun,
							oVars:this.params.vars,
							sURL:this.params.JSON,
							sQuery:this.params.ary.join("&"),
							serverQuery:this.params.serverQuery,
							iCache:params.iCache
						}
					)
				}
                /*
				if(navigator.geolocation){
                    document.getElementById(this.params.targ).style.visibility = "visibile"
                    this.top.common.addEvents(document.getElementById(this.params.targ), ["click"], this, {}, {parent:false})
                }
                this.count = 0
				*/

            },

            this.processEntityInventories = function(entityKeysToInventory){
	        	for(var entityKey in entityKeysToInventory){
	        		var productInventoryMap = entityKeysToInventory[entityKey];
	        		window.populateVariantInventories(entityKey , productInventoryMap);
	        	}
            },

            this.processMessagesAndProductData = function(oLUT, oEnt, sBase, dynamicProductData){
	            if(dynamicProductData != undefined &&  dynamicProductData.inventories != undefined){
	            	this.processEntityInventories(dynamicProductData.inventories);
	            }
            	this.processPriceMessages(oLUT, oEnt, sBase);
            },

			this.processPriceMessages = function(oLUT, oEnt, sBase){
				for(var e in oEnt){
					var targ = oEnt[e]
					for(var ee in targ){
						var id = sBase+e+"_"+ee
						if(typeof(targ[ee]) == "object" && (targ[ee] === null || targ[ee].length === undefined)){
							this.processPriceMessages(oLUT, targ[ee], id+"_")
						} else {
							var out = document.getElementById(id)
							while(out){
								if(typeof(targ[ee]) == "object" && targ[ee].length){
									var combine = targ[ee].join("_")
									if(!oLUT[combine]){
										oLUT[combine] = []
										for(var i=0;i<targ[ee].length;i++){
											oLUT[combine][i] = oLUT[targ[ee][i]]
										}
										oLUT[combine] = oLUT[combine].join(" ")
									}
									out.innerHTML = oLUT[combine]
								} else {
									out.innerHTML = targ[ee]
								}
								out.id += "_filled"
								out = document.getElementById(id)
							}
						}
					}
				}
				if(!this.parent.vars.promos[this.name]) this.parent.vars.promos[this.name] = []
				this.parent.vars.promos[this.name].push({oLUT:oLUT, oEnt:oEnt, sBase:sBase})
			},
			this.callBack = function(oRet, oVars){
                this.JSON = oRet
				switch(oVars.type){
				    case "main":
                        this.top.vars.isLoggedIn = oRet.loggedIn
                        this.top.login.create(
                            "login",
                            {
                                updateSLdata:oRet.navNotifications.SL.updateSLdata,
                                loggedIn:oRet.loggedIn,
                                isLoggedIntoFB:oRet.isLoggedIntoFB
                            }
                        )
                        if(oRet.loggedIn){
                            this.popLogin(oRet);
                        }
                        document.getElementById("topLogin").innerHTML = oRet.navWelcome.html
                        if(oRet.navHeart && oRet.navHeart.iInt) document.getElementById("heartNumber").innerHTML = oRet.navHeart.iInt;
                        var targ = document.getElementById("navShopBagCounr")
                        if(targ && oRet.navShopBag && oRet.navShopBag.iInt ) targ.innerHTML = oRet.navShopBag.iInt
                        if(oRet.storeLink && oRet.storeLink.html) document.getElementById("myStoreLinkHeader").innerHTML = oRet.storeLink.html
                        if(oRet.store && oRet.store.html){
                            document.getElementById("footerStoreAdddy").innerHTML = oRet.store.html;
                        }

						if(oRet.promoContent){
							var promoPop = this.top.popPromos.create("popPromo", {})
							this.top.popPromos.reDraw("popPromo", {promos:oRet.promoContent})
							this.top.popPromos.loadMore("popPromo", {attempt:0})
						}
						if(oRet.promoEntityIds){
							this.processMessagesAndProductData(oRet.promoEntityIds.entityPriceMessages.lookupTable, oRet.promoEntityIds.entityPriceMessages.entities, "", oRet.promoEntityIds.dynamicProductData)
						}
                    break;
					case "showMore":
						this.processMessagesAndProductData(oRet.entityPriceMessages.lookupTable, oRet.entityPriceMessages.entities, "", oRet.dynamicProductData);
					break;
					case "slNotification":
						if(typeof sociableExternal == "undefined") return;
						var htmlEntities = sociableExternal.getHtmlForActions(oRet);
						if (htmlEntities && htmlEntities.length > 0) {
							document.getElementsByTagName('head')[0].appendChild(sociableExternal.getCSS());
						}
						var targ = document.getElementById("emailMessages_table")
						var tBody = targ.getElementsByTagName("tbody")
						if(tBody.length) targ = tBody[0]
						var count = targ.rows.length
						var overOutGroup = []
						for(var i=0;i<htmlEntities.length;i++){
							var r = targ.appendChild(document.createElement("tr"))
							var t = r.appendChild(document.createElement("td"))
							t.className = "emailNotificationTD emailNotificationTD_"+count+" emailNotificationTDMod2_"+(i%2)+" SLNotificationTD mouseout"
							$(t).html(htmlEntities[i])
							overOutGroup[i] = t
							count++
						}
						// temp remove for post launch BUG00627
						//document.getElementById("emailMessages_number").innerHTML = document.getElementById("navNoteNumber").innerHTML = count-1
						this.top.genOverOutClick.create("emailMessages", {elms:overOutGroup})

						// do something with these elements in htmlEntities

						/*
						$.each(htmlEntities, function(index, entity) {
							$('head').append(sociableExternal.getCSS());
							$('#output_area').append(entity);
						})*/
					break;

					case "SLlogin":
                        this.popLogin(oRet)
						this.top.login[oVars.action](oVars.name, oRet)
					break;

                    case "geo":
                        this.popgeo({store:oRet})
                    break;

					case "TCarea":
						//return;
						for(var e in oRet){
							if(oRet[e].length){
								var targ = document.getElementById(e)
								var out = oRet[e].join('"')
								if(targ && out.length) $(targ).html(out)
							}
						}
						this.parent.reApplyAllPromos()
					break;

				}


			},
            this.popLogin = function(oRet) {
                document.getElementById("topLogin").innerHTML = oRet.navWelcome.html
                document.getElementById("topLogin").className = "loggedIn mouseout"

//                if(oRet.navAccount && oRet.navAccount.html) document.getElementById("navAccount").innerHTML = oRet.navAccount.html;
                if(oRet.navHeart && oRet.navHeart.iInt) document.getElementById("heartNumber").innerHTML = oRet.navHeart.iInt;
                if(oRet.storeLink && oRet.storeLink.html) document.getElementById("myStoreLinkHeader").innerHTML = oRet.storeLink.html;
                var targ = document.getElementById("navShopBagCounr")
                if(targ && oRet.navShopBag && oRet.navShopBag.iInt ) targ.innerHTML = oRet.navShopBag.iInt;
                if(oRet.store && oRet.store.html){
                    document.getElementById("footerStoreAdddy").innerHTML = oRet.store.html;
                }
//                if(oRet.footerNav && oRet.footerNav.html) {
//                    document.getElementById("footerColContentLinks").innerHTML = oRet.footerNav.html;
//                }

            },
            this.getJSON = function() {
              return this.JSON
            },
            this.events = {
                click:function(elm, evt, that, params){
					if(params.url){
						document.location = params.url
					}
				}
            }
        }
    },
	reApplyAllPromos:function(){
		for(var e in this.vars.promos){
			var targs = this.vars.promos[e]
			for(var i=0;i<targs.length;i++){
				var targ = targs[i]
				this.vars.children[e].processPriceMessages(targ.oLUT, targ.oEnt, targ.sBase)
			}
		}
	},
    getJSON:function(sName){
        return this.vars.children[sName].getJSON()
    }
}



binder.components.popPromos = {
	vars:{
		searchObj:false
	},
	common:{},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					map:[
						["1,1", "1,1", "1,1", "1,2"],
						["2,1", "1,1"],
						["1,1", "1,1","1,1", "1,1"],
						["1,1", "1,1", "1,1", "1,2"],
						["2,1", "1,1"],
						["1,1", "1,1","1,1", "1,1"],
						["1,1", "1,1", "1,1", "1,2"],
						["2,1", "1,1"],
						["1,1", "1,1","1,1", "1,1"],
						["1,1", "1,1","1,1", "1,1"]
					],
					promos:[3,0,1,3,0,1,3,0,1,-1,-1],
					targ:"thumbNailTable",
					maxCells:40,
					atribs:{
						valign:"top"
					},
					pageNumber:2,
					tries:20
				}
				for(var e in params) this.params[e] = params[e]
				this.targ = document.getElementById(this.params.targ).rows[0].parentElement
				this.cellCounter = false
			},
			this.reDraw = function(params){
				var promos = params.promos
				if(promos.length) {
					var bGoOn = false
					for(var i=0;i<promos.length;i++){
						if(promos[i].length){
							bGoOn = true
							break;
						}
					}
					if(!bGoOn) return
					var rowCounter = 0
					var nr = this.targ.rows[0]
					var cellCounter = 0
					for(var r = 0; r < this.params.map.length;r++){
						var newRow = this.targ.insertBefore(document.createElement("tr"), nr)
						for(var c = 0;c<this.params.map[r].length;c++){
							var td = newRow.appendChild(document.createElement("td"))
							for(var e in this.params.atribs){
								td.setAttribute(e, this.params.atribs[e])
							}
							var nTD = nr.cells[0]
							var span = this.params.map[r][c].split(",")
							var bIsPromoCell = (this.params.promos[r] == c)
							if(bIsPromoCell && r < promos.length && promos[r].length){
								$(td).html(promos[r].join('"'))
								td.colSpan = span[0]
								td.rowSpan = span[1]
							} else {
								$(td).html(nTD.innerHTML)
								nr.removeChild(nTD)
								if(bIsPromoCell){
									this.params.promos[r] = -1
									var left = (parseInt(span[0]))
									var down = r+parseInt(span[1])
									for(var d =r+1;d<down;d++) {
										for(var l=0;l<left;l++) {
											this.params.map[d].splice(c+l, 0, "1,1")
										}
									}
									left--
									c -= left 
								}
							}
							if(nr.cells.length == 0){
								this.targ.removeChild(nr)
								nr = this.targ.rows[r+1]
							}
							cellCounter++
						}

					}
					var tc = this.params.map.length
					this.gap = 0
					while(this.targ.rows[tc]) {
						this.gap += this.targ.rows[tc].cells.length
						this.targ.removeChild(this.targ.rows[tc])
					}
					/*
					if(nr.cells.length){
						
					}
					*/
					var pag = document.getElementById("paginationEndIndex")
					if(pag) pag.innerHTML = cellCounter
					this.cellCounter = cellCounter
					quickView.handleQuickView()
				}
			}
			this.loadMore = function(params){
				
				
				if(this.parent.vars.searchObj) {
					if(this.cellCounter === false) this.cellCounter = parseInt($('.topPagination').find('span.endIndex').html())
					this.parent.vars.searchObj.endIndex = this.cellCounter + this.params.maxCells
					getNextResults(this.parent.vars.searchObj);
				} else {
					params.attempt++
					if(params.attempt < this.params.tries){
						var me = this
						setTimeout(
							function(){
								me.loadMore(params)
							},
							100
						)
					}
				}
				/*
				if(this.cellCounter === false) this.cellCounter = parseInt($('.topPagination').find('span.endIndex').html())
				var targ = $(document.getElementById(this.params.targ))
				var searchObj = {
					url: '/catalog/thumbnail_body_frag.jsp?parentCategoryId='+params.parentCategoryId+'&categoryId='+params.categoryId+'&subCategoryId='+params.subCategoryId,
					table: $('#thumbNailTable'),
					endIndex: this.cellCounter + params.maxCells,
					pageNumber: params.pageNumber,
					pageGap: this.gap, 
					skipped: $('#thumbNailTable').data('skipped') 
				}
				getNextResults(searchObj);
				*/
			}
		}
	},
	reDraw:function(sChild, params){
		this.vars.children[sChild].reDraw(params)
	},
	loadMore:function(sChild, params){
		this.vars.children[sChild].loadMore()
	}
}

binder.components.simpleXslider = {
	vars:{ },
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
		},
		easeInOutQuad:function(t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t + b;
			t--;
			return -c/2 * (t*(t-2) - 1) + b;
		} ,
        metrics:function(oAry){

        }
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					sliderParent:false,
					uniformItemWidth:true,
					startX:0,
					startY:0,
					time:500,
					distanceX:-1,
					cellWidth:false
				}
				for(var e in params) this.params[e] = params[e]
				if(!this.params.sliderParent){
					this.top.common.log(this, "need a slider to slide");
					return true;
				}
				this.canMoveNegative = true;
				this.canMovePositive = false;
				this.slider = this.params.sliderParent.getElementsByTagName("table")[0];
				this.children = []
				if(!this.slider){
					this.slider = this.params.sliderParent.getElementsByTagName("ul")[0]
					
					var c = this.slider.getElementsByTagName("li")
					// this is more expensive, since we're going to force a screen redraw
					for(var i=0;i<c.length;i++){
						if(c[i].parentNode == this.slider) this.children.push(c[i])
						
					}
					this.slider.style.width = this.children[0].offsetWidth * this.children.length+"px"
					/*
					if(this.params.uniformItemWidth){
						
					} else {
						// this is even more expensive since we're going to force a bunch of screen redraws .... table wouldn't have this issue.
						w = 0
						for(var i=i;i<children.length;i++){
							w += children[0].offsetWidth
						}
						this.slider.style.wdith = w+"px"
					}
					*/
				} else {
					this.children = this.slider.rows[0].cells
				}
				this.x = this.params.startX;
				this.slider.style.left = this.x+"px";
				this.distanceX = this.params.distanceX;
				this.viewWidth = this.params.sliderParent.offsetWidth;
				this.sliderWidth = this.slider.offsetWidth //-this.viewWidth;
                this.curView = {start:1, end:0};
				if(this.sliderWidth < this.viewWidth) this.isAtEnd = true;
				this.bAnimating = false;
				this.TO = 0;
			},

			this.addMouseOverOut = function(){
				var rows = this.slider.rows;
				for(var y=0;r<rows.length;y++){
					var cells = r.rows[y].cells;
					for(var x = 0;x<cells.length;x++){
						this.top.common.addEvents(cells[i], ["mouseover", "mouseout"], this)
					}
				}
			},

			this.findDistance = function(){
				var targs = this.children //this.slider.rows[0].cells;
				var w = this.viewWidth;
				var cw = 0;
				if(this.params.cellWidth) {
					this.baseWidth = this.params.cellWidth
				} else {
					this.baseWidth = targs[0].offsetWidth;
				}
				this.curView.end = Math.ceil(w/this.baseWidth);
                this.distanceX = Math.floor(w/this.baseWidth)*this.baseWidth;
				this.offset = 0
				/*
                for(var i=0;i<targs.length;i++) {
					cw += targs[i].offsetWidth;
					if(cw > w) {
						this.offset = w-cw;
						cw -= targs[i].offsetWidth;
						break;
					}
				}
				*/
			},
			this.slideBy = function(params){
				if(this.bAnimating) return false;
				if(this.distanceX < 0 || isNaN(parseInt(this.distanceX))) this.findDistance();
				this.x = parseInt(this.slider.style.left);
				var dX = this.distanceX * params.x;
				var endX =  this.x + dX;
				this.canMovePositive = this.canMoveNegative = true;
				if(endX >= 0) {
					this.canMovePositive = false;
					dX -= endX;
				}
				if(this.sliderWidth + endX <= this.viewWidth){
					this.canMoveNegative = false;
					if(this.sliderWidth + endX < this.viewWidth) dX += (this.viewWidth - (this.sliderWidth + endX));
				}
				this.finish = {
					x:dX
				}
                this.moveInt = -(dX/this.baseWidth);
                this.curView.start+= this.moveInt;
                this.curView.end += this.moveInt;

                //console.log("Current View - start: "+this.curView.start);
                //console.log("Current View - end: "+this.curView.end);
                //console.log($(this.params.sliderParent).find(".item")[this.curView.start]);

				this.bAnimating = true;
				var me = this;
				this.startTime = (new Date()).getTime();
				this.TO = setInterval(
					function(){
						me.animate();
					}, 50
				)
			},
            this.getView = function(){
                var targs = this.children //this.slider.rows[0].cells;
                var arr = {
                    start:this.curView.start,
                    end:this.curView.end,
                    cells:[],
                    allcells:targs,
                    table:this.slider
                };
                if(arr.start < arr.end){
                    for(var i=arr.start-1; i<arr.end; i++){
                        arr.cells.push(targs[i]);
                    }
                }
//                else {
//                    for(var j=arr.start; j>=arr.end; j--){
//                        console.log(j);
//                        arr.cells.push(targs[j]);
//                    }
//                }
                return arr
            },
			this.animate = function(){
				var dTime = ((new Date()).getTime()) - this.startTime;
				if(dTime > this.params.time){
					dTime = this.params.time;
					clearTimeout(this.TO);
					this.bAnimating = false;
				}
				this.slider.style.left = this.x+(this.parent.common.easeInOutQuad(dTime, 0, this.finish.x, this.params.time))+"px";
			},

			this.events = {
				mouseover:function(elm, evt, me, params){
					if(elm != me.curOn){
						me.top.common.commonBubble("overOutClick", me, {elm:elm,type:evt.type});
					}
				},
				mouseout:function(elm, evt, me, params){
					if(elm != me.curOn){
						me.top.common.commonBubble("overOutClick", me, {elm:elm,type:evt.type});
					}
				}
			}
		}
	},
	slideBy:function(sName, params){
		/*
			move the slider by a positive or negative direction along x

			sName string name of the slider instance

			params
				x:	int	a number greater then or less then 0 -x slides left, pos slides right.
		*/
		this.vars.children[sName].slideBy(params);
	},
	getCanMoveNegative:function(sName){
		/*
			returns true/false indicating the ability to move -x

			sName string name of the slider instance
		*/
		return this.vars.children[sName].canMoveNegative;
	},
	getCanMovePositive:function(sName){

		/*
			returns true/false indicating the ability to move +x

			sName string name of the slider instance
		*/

		return this.vars.children[sName].canMovePositive;
	},
    getView:function(sName){

		/*
            start:integer,
            end:integer,
            cells:array of visible cells <td> elements,
            allcells: all cells in row 1,
            table:table
			sName string name of the slider instance
		*/

		return this.vars.children[sName].getView;
	}
}
binder.components.arrows = {
	vars:{ },
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					x:0,
					y:0,
					elm:false
				}
				for(var e in params) this.params[e] = params[e]

				this.classLoc = false;
				if(!this.params.elm){
					this.top.common.log(this, "need a button to tie an event to");
					return true;
				}
				var pass = {
					x:this.params.x,
					y:this.params.y
				}
				this.trigger = this.top.common.addEvents(this.params.elm, ["click", "mouseover", "mouseout"], this, pass);
			}
			this.changeMessage = function(params){
				this.params.message = params.message;
			}
			this.events = {
				mouseover:function(elm, evt, me, params){
					params = {
						elm:elm,
						type:evt.type
					}
					me.top.common.commonBubble("overOutClick", me, params);
				},
				mouseout:function(elm, evt, me, params){
					params = {
						elm:elm,
						type:evt.type
					}
					me.top.common.commonBubble("overOutClick", me, params);
				},
				click:function(elm, evt, me, params){

				}
			}
		}
	}
}


binder.components.horizontalSlider = {
	vars:{ },
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					sliderParent:"viewport",
					leftArrow:"leftArrow",
					rightArrow:"rightArrow",
					startOpen:0,
					cellWidth:false
				}
				for(var e in params) this.params[e] = params[e]
				this.leftArrowElm = document.getElementById(this.params.leftArrow)
				this.rightArrowElm = document.getElementById(this.params.rightArrow)
				this.leftArrow = this.top.arrows.create(
					this.name+"_arrowLeft",
					{
						x:1,
						elm:this.leftArrowElm
					},
					this
				)

				this.rightArrow = this.top.arrows.create(
					this.name+"_arrowRight",
					{
						x:-1,
						elm:this.rightArrowElm
					},
					this
				)

				this.slider = this.top.simpleXslider.create(
					this.name+"_slider",
					{
						sliderParent:document.getElementById(this.params.sliderParent),
						cellWidth:this.params.cellWidth
					},
					this
				)
				this.showHideArrows()
			}
			this.showHideArrows = function(){
				if(this.slider.parent.getCanMovePositive(this.slider.name)){
                    this.leftArrowElm.style.visibility = "visible"
                } else {
                   this.leftArrowElm.style.visibility = "hidden"
                }
				if(this.slider.parent.getCanMoveNegative(this.slider.name)){
                    this.rightArrowElm.style.visibility = "visible"
                } else{
                    this.rightArrowElm.style.visibility = "hidden"
                }

			}
			this.events = {
				click:function(elm, evt, that, params){
					var me = that.group;
					if(that.parent.name == "arrows"){
						me.slider.parent.slideBy(me.slider.name, params);
						me.showHideArrows();
					}
				}
			}
		}
	}
}


binder.components.simpleYslider = {
    vars:{ },
    common:{
        overOutClick:function(params){
            params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
        },
        easeInOutQuad:function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        } ,
        metrics:function(oAry){

        }
    },
    make:{
        main:function(){
            this.constructor = function(params){
                this.params = {
                    sliderParent:false,
                    uniformItemWidth:true,
                    startX:0,
                    time:500,
                    distanceX:-1,
                    cellHeight:false
                }
                for(var e in params) this.params[e] = params[e]
                if(!this.params.sliderParent){
                    this.top.common.log(this, "need a slider to slide");
                    return true;
                }
                this.canMoveNegative = true;
                this.canMovePositive = false;
                this.slider = this.params.sliderParent.getElementsByTagName("table")[0];
                this.children = []
                if(!this.slider){
                    this.slider = this.params.sliderParent.getElementsByTagName("ul")[0]

                    var c = this.slider.getElementsByTagName("li")
                    for(var i=0;i<c.length;i++){
                        if(c[i].parentNode == this.slider) this.children.push(c[i])

                    }
                    var cellHeight = this.params.cellHeight
                    if(!cellHeight) this.children[0].offsetHeight
                    this.slider.style.height =  cellHeight * this.children.length+"px"
                } else {
                    this.children = this.slider.rows[0].cells
                }
                this.x = this.params.startX;
                this.slider.style.top = this.x+"px";
                this.distanceX = this.params.distanceX;
                this.viewWidth = this.params.sliderParent.offsetHeight;
                this.sliderWidth = this.slider.offsetHeight //-this.viewWidth;
                this.curView = {start:1, end:0};
                if(this.sliderWidth < this.viewWidth) this.isAtEnd = true;
                this.bAnimating = false;
                this.TO = 0;
            },

                this.addMouseOverOut = function(){
                    var rows = this.slider.rows;
                    for(var y=0;r<rows.length;y++){
                        var cells = r.rows[y].cells;
                        for(var x = 0;x<cells.length;x++){
                            this.top.common.addEvents(cells[i], ["mouseover", "mouseout"], this)
                        }
                    }
                },

                this.findDistance = function(){
                    var targs = this.children //this.slider.rows[0].cells;
                    var w = this.viewWidth;
                    var cw = 0;
                    if(this.params.cellHeight) {
                        this.baseWidth = this.params.cellHeight;
                    } else {
                        this.baseWidth = targs[0].offsetHeight;
                    }
                    this.curView.end = Math.ceil(w/this.baseWidth);
                    this.distanceX = Math.floor(w/this.baseWidth)*this.baseWidth;
                    this.offset = 0
                },
                this.slideBy = function(params){
                    if(this.bAnimating) return false;
                    if(this.distanceX < 0) this.findDistance();
                    this.x = parseInt(this.slider.style.top);
                    var dX = this.distanceX * params.x;
                    var endX =  this.x + dX;
                    this.canMovePositive = this.canMoveNegative = true;
                    if(endX >= 0) {
                        this.canMovePositive = false;
                        dX -= endX;
                    }
                    if(this.sliderWidth + endX <= this.viewWidth){
                        this.canMoveNegative = false;
                        if(this.sliderWidth + endX < this.viewWidth) dX += (this.viewWidth - (this.sliderWidth + endX));
                    }
                    this.finish = {
                        x:dX
                    }
                    this.moveInt = -(dX/this.baseWidth);
                    this.curView.start+= this.moveInt;
                    this.curView.end += this.moveInt;
                    this.bAnimating = true;
                    var me = this;
                    this.startTime = (new Date()).getTime();
                    this.TO = setInterval(
                        function(){
                            me.animate();
                        }, 50
                    )
                },
                this.getView = function(){
                    var targs = this.children //this.slider.rows[0].cells;
                    var arr = {
                        start:this.curView.start,
                        end:this.curView.end,
                        cells:[],
                        allcells:targs,
                        table:this.slider
                    };
                    if(arr.start < arr.end){
                        for(var i=arr.start-1; i<arr.end; i++){
                            arr.cells.push(targs[i]);
                        }
                    }
                    return arr
                },
                this.animate = function(){
                    var dTime = ((new Date()).getTime()) - this.startTime;
                    if(dTime > this.params.time){
                        dTime = this.params.time;
                        clearTimeout(this.TO);
                        this.bAnimating = false;
                    }
                    this.slider.style.top = this.x+(this.parent.common.easeInOutQuad(dTime, 0, this.finish.x, this.params.time))+"px";
                    //console.log(this.slider.style.top);
                },

                this.events = {
                    mouseover:function(elm, evt, me, params){
                        if(elm != me.curOn){
                            me.top.common.commonBubble("overOutClick", me, {elm:elm,type:evt.type});
                        }
                    },
                    mouseout:function(elm, evt, me, params){
                        if(elm != me.curOn){
                            me.top.common.commonBubble("overOutClick", me, {elm:elm,type:evt.type});
                        }
                    }
                }
        }
    },
    slideBy:function(sName, params){
        /*
         move the slider by a positive or negative direction along x

         sName string name of the slider instance

         params
         x:	int	a number greater then or less then 0 -x slides left, pos slides right.
         */
        this.vars.children[sName].slideBy(params);
    },
    getCanMoveNegative:function(sName){
        /*
         returns true/false indicating the ability to move -x

         sName string name of the slider instance
         */
        return this.vars.children[sName].canMoveNegative;
    },
    getCanMovePositive:function(sName){

        /*
         returns true/false indicating the ability to move +x

         sName string name of the slider instance
         */

        return this.vars.children[sName].canMovePositive;
    },
    getView:function(sName){

        /*
         start:integer,
         end:integer,
         cells:array of visible cells <td> elements,
         allcells: all cells in row 1,
         table:table
         sName string name of the slider instance
         */

        return this.vars.children[sName].getView;
    }
}

binder.components.verticalSlider = {
    vars:{ },
    common:{
        overOutClick:function(params){
            params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
        }
    },
    make:{
        main:function(){
            this.constructor = function(params){
                this.params = {
                    sliderParent:"miniProductViewPort",
                    leftArrow:"mpLeftArrow",
                    rightArrow:"mpRightArrow",
                    startOpen:0,
                    cellHeight:false
                }
                for(var e in params) this.params[e] = params[e]
                this.leftArrowElm = document.getElementById(this.params.leftArrow)
                this.rightArrowElm = document.getElementById(this.params.rightArrow)
                this.leftArrow = this.top.arrows.create(
                    this.name+"_arrowLeft",
                    {
                        x:1,
                        elm:this.leftArrowElm
                    },
                    this
                )

                this.rightArrow = this.top.arrows.create(
                    this.name+"_arrowRight",
                    {
                        x:-1,
                        elm:this.rightArrowElm
                    },
                    this
                )

                this.slider = this.top.simpleYslider.create(
                    this.name+"_slider",
                    {
                        sliderParent:document.getElementById(this.params.sliderParent),
                        cellHeight:this.params.cellHeight
                    },
                    this
                )
                this.showHideArrows()
            }
            this.showHideArrows = function(){
                if(this.slider.parent.getCanMovePositive(this.slider.name)){
                    this.leftArrowElm.style.visibility = "visible"
                } else {
                    this.leftArrowElm.style.visibility = "hidden"
                }
                if(this.slider.parent.getCanMoveNegative(this.slider.name)){
                    this.rightArrowElm.style.visibility = "visible"
                } else{
                    this.rightArrowElm.style.visibility = "hidden"
                }

            }
            this.events = {
                click:function(elm, evt, that, params){
                    var me = that.group;
                    if(that.parent.name == "arrows"){
                        me.slider.parent.slideBy(me.slider.name, params);
                        me.showHideArrows();
                    }
                }
            }
        }
    }
}


//var sl = binder.commonJSON.create("socLabs", {serverQuery:"callback"})

//var rv = binder.refinements.create("leftNavRefine", {})
// binder.refinements.children["leftNavRefine"]
binder.components.refinements = {
	vars:{

	},
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
		},
        getChildByTagName:function(oElm, sTag){
            var c = oElm.childNodes;
            var ary = [];
            for(var i=0;i<c.length;i++){
                if(c[i].tagName && c[i].tagName.toLowerCase() == sTag.toLowerCase()) ary.push(c[i])
            }
            return ary
        }
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
                    parentContainerID:"featureItems",
                    parentContainerChildTagName:"div"
				}
				for(var e in params) this.params[e] = params[e]
                var targ = document.getElementById(this.params.parentContainerID)
				if(!targ) return false
                var children =  this.parent.common.getChildByTagName(targ, this.params.parentContainerChildTagName)
				for(var i=0;i<children.length;i++){
                    if(children[i].className.search(/\b(disabled)\b/gi) == -1){
					    this.top.common.addEvents(children[i], ["mouseover", "mouseout", "click"], this, {iInt:i})
                    }
				}
				this.TO = false
			},
			this.hideCurOn = function(){
                if(!this.curON) return
				clearTimeout(this.TO)
				if(this.curON.child) this.curON.child.style.display = "none"
				this.parent.common.overOutClick(
					{
						elm:this.curON.parent,
						type:"mouseout"
					}
				)
                this.curON = false;
			},
            this.overOutClick = function(elm, evt, me, params){
                var bIsNotClicked = elm.className.search(/\b(click)\b/gi) == -1 ? true:false
                var isDisabled = elm.className.search(/\b(disable)\b/gi) == -1 ? true:false
                var t = false
                if(bIsNotClicked){
                    t = evt.type
                }  else {
                    if(evt.type == "click"){
                         t = "mouseout"
                    }
                }
                if(t){
                    this.parent.common.overOutClick(
                        {
                            elm:elm,
                            type:t
                        }
                    )
                }
            },
			this.events =  {
				mouseover:function(elm, evt, me, params){
                    me.overOutClick(elm, evt, me, params)
				},
				mouseout:function(elm, evt, me, params){
                    me.overOutClick(elm, evt, me, params)
				},
                click:function(elm, evt, me, params){
                    me.overOutClick(elm, evt, me, params)
                }
			}
		}
	}
}

binder.components.simpleLazyLoad = {
	vars:{
		que:[],
		loading:{},
		current:0,
		max:4
	},
	common:{
		overOutClick:function(params){
			params.elm.className = params.elm.className.replace(/\b(mouseover|mouseout|click)\b/gi, '')+" "+params.type;
		},
		easeInOutQuad:function(t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t + b;
			t--;
			return -c/2 * (t*(t-2) - 1) + b;
		},
		setOpacity:function(elm, opacity){
			if(elm.filters){
				elm.style.filter="alpha(opacity="+opacity+")";
			} else {
				opacity /= 100;
				elm.style.opacity  = opacity;
				elm.style.MozOpacity = opacity;
			}
		}
	},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					imgs:[],
					attrib:"crLZload",
					loadingBackgroundClassName:"genBackgroundLoader",
					load:4,
					animate:true,
					time:250
				}
				for(var e in params) this.params[e] = params[e]
				this.imgs = []
				for(var i=0;i<this.params.imgs.length;i++) this.imgs[i] = this.params.imgs[i]
				this.loadEvents = []
				this.curImg = 0
				this.curDown = 0;
				this.TO = 0;
				this.parent.vars.que.push(this.name)
			}
			this.start = function(){
				var cur = 0;
				var me = this
				while(this.imgs.length){
					var targ = this.imgs.shift()
					var a = targ.getAttribute(this.params.attrib);
					if(a){
						var img = new Image();
						this.loadEvents.push(this.top.common.addEvents(img, ["load", "error"], this, {targ:targ,eventLUT:this.loadEvents.length}));
						img.src = a;
						this.curDown++
						this.curImg++
						if(this.params.load && this.curDown > this.params.load) break;
					}
				}
			}

			this.fin = function(oImg){
				this.curDown--
				if(oImg){
					if(this.params.animate){
						var TO =0;
						var fun = this.parent.common
						var startTime = ((new Date()).getTime())
						var endTime = this.params.time
						var anim = oImg
						var TO = setInterval(
							function(){
								var dTime = ((new Date()).getTime()) - startTime;
								if(dTime > endTime){
									dTime = endTime;
									clearTimeout(TO);
								}
								var p = fun.easeInOutQuad(dTime, 0, 100, endTime)
								fun.setOpacity(anim, p)
							},
							50
						)
					} else {
						if(oImg.filters){
							oImg.style.filter="alpha(opacity=100)";
						} else {
							oImg.style.opacity  = 1;
							oImg.style.MozOpacity = 1;
						}
					}
				}
				if(this.curImg < this.params.imgs.length){
					this.start();
				} else {
					delete this.parent.vars.children[this.name];
					this.parent.vars.current--;
					this.parent.start();
				}
			}
			this.now = function(){
				this.params.load = 0
				this.start()
			}
			this.events = {
				load:function(elm, evt, me, params){
					me.top.common.removeEvents(elm, ["load", "error"], me.loadEvents[params.eventLUT].event)
					params.targ.src = elm.src;
					var p = params.targ.parentNode
					while(p.className.search(me.params.loadingBackgroundClassName) == -1 && p != document) {
						p=p.parentNode
					}
					if(p != document) p.style.backgroundImage = "none"
					if(me.params.animate) me.parent.common.setOpacity(params.targ, 0)
					me.fin(params.targ);
				},
				error:function(elm, evt, me, params){
					me.fin()
				}
			}
		}
	},
	start:function(){
		if(this.vars.que.length && this.vars.current < this.vars.max){
			var targ = this.vars.que.shift()
			this.vars.current++
			this.vars.children[targ].start()
			this.vars.loading[targ] = this.vars.children[targ]
			if(this.vars.current < this.vars.max) this.start()
		}
	},
	now:function(sName){
		if(this.vars.children[sName]){
			if(!this.vars.loading[sName]){
				for(var i=0;i<this.vars.que.length;i++){
					if(this.vars.que[i] == sName){
						this.vars.loading[sName] = this.vars.children[sName]
						break;
					}
				}
			}
			if(this.vars.loading[sName]) this.vars.loading[sName].now()
		}
	}
}

binder.components.certona = {
	vars:{},
	common:{},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					url:"",
					atribs:[],
					serverQuery:"callback"
				}
                for(var e in params) this.params[e] = params[e]

				this.JASONP = this.top.create(
					this.name,
					{
						JSON:this.params.url,
						ary:this.params.atribs,
						vars:{},
						serverQuery:this.attribs.serverQuery
					}
				)
			}
			this.start = function(){
				var cur = 0;
				var me = this
				while(this.imgs.length){
					var targ = this.imgs.shift()
					var a = targ.getAttribute(this.params.attrib);
					if(a){
						var img = new Image();
						this.loadEvents.push(this.top.common.addEvents(img, ["load", "error"], this, {targ:targ,eventLUT:this.loadEvents.length}));
						img.src = a;
						this.curDown++
						this.curImg++
						if(this.params.load && this.curDown > this.params.load) break;
					}
				}
			}

			this.fin = function(oImg){
				this.curDown--
				if(oImg){
					if(this.params.animate){
						var TO =0;
						var fun = this.parent.common
						var startTime = ((new Date()).getTime())
						var endTime = this.params.time
						var anim = oImg
						var TO = setInterval(
							function(){
								var dTime = ((new Date()).getTime()) - startTime;
								if(dTime > endTime){
									dTime = endTime;
									clearTimeout(TO);
								}
								var p = fun.easeInOutQuad(dTime, 0, 100, endTime)
								fun.setOpacity(anim, p)
							},
							50
						)
					} else {
						if(oImg.filters){
							oImg.style.filter="alpha(opacity=100)";
						} else {
							oImg.style.opacity  = 1;
							oImg.style.MozOpacity = 1;
						}
					}
				}
				if(this.curImg < this.params.imgs.length){
					this.start();
				} else {
					delete this.parent.vars.children[this.name];
					this.parent.vars.current--;
					this.parent.start();
				}
			}
			this.now = function(){
				this.params.load = 0
				this.start()
			}
			this.events = {
				load:function(elm, evt, me, params){
					me.top.common.removeEvents(elm, ["load", "error"], me.loadEvents[params.eventLUT].event)
					params.targ.src = elm.src;
					var p = params.targ.parentNode
					while(p.className.search(me.params.loadingBackgroundClassName) == -1 && p != document) {
						p=p.parentNode
					}
					if(p != document) p.style.backgroundImage = "none"
					if(me.params.animate) me.parent.common.setOpacity(params.targ, 0)
					me.fin(params.targ);
				},
				error:function(elm, evt, me, params){
					me.fin()
				}
			}
		}
	}
}

binder.components.example = {
	vars:{},
	make:{
		main:function(){
			this.constructor = function(params){
				this.params = {
					selector:"span",
					alertStr:"Hello world"
				}
				for(var e in params) this.params[e] = params[e]

				var elms = $(this.params.selector)
				for(var i=0;i<elms.length;i++){
					this.top.common.addEvents(elms[i], ["click"], this, {iInt:i})
				}
			}

			this.doAlert = function(params){
				alert(this.params.alertStr+" "+params.evtType+" iInt "+params.iInt)
			}

			this.events = {
				click:function(elm, evt, me, params){
					me.doAlert(
						{
							evtType:evt.type,
							iInt:params.iInt
						}
					)
				},
				mouseover:function(elm, evt, me, params){
					me.doAlert(
						{
							evtType:evt.type,
							iInt:params.iInt
						}
					)

				},
				mouseout:function(elm, evt, me, params){
					me.doAlert(
						{
							evtType:evt.type,
							iInt:params.iInt
						}
					)
				}
			}
		}
	},
	makeAlert:function(sName, params){
		/*
		sName	sStr	Name of insatnce

		params
		{
			evtType	str	event type,
			iInt	iInt	integer related to elment

		}
		*/
		var targ = this.vars.children[sName]
		if(targ){
			targ.doAlert(params)
		}
	},
	events: {
		click:function(elm, evt, that, params){
			var me = that.parent
			// me.name == example
			// that.name == fred
			//doMetricsCall(me.name, that.name)
			that.events.click(elm, evt, that, params)
		}
	}
}

binder.extend()

if(navigator.userAgent.toLowerCase().indexOf("mac ") != -1){
	var link = document.createElement("link");
	var hostname = window.location.hostname;
	hostname = hostname.replace(/^m\.|^mstage\./, "www.");
	link.type = "text/css";
	link.href = "//" + hostname + "/css/globalmac.css";
	link.rel="stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);
}

	
function initPageHeight() {
	// Clear css attribute "height" of related containers so that they will have auto height
	// before applying new calculated heights to them
	$(".left_nav").css("height", "");
	$(".body_wrap").css("height", "");
	$(".right_nav").css("height", "");
	$(".fill-height").each(function() {
		$(this).css("height", "");
	});

	var lch = $(".left_nav").height(); //lch - left column height
	var pbh = $(".body_wrap").height(); //pbh = page body height
	var rch = $(".right_nav").height(); //rch = right column height

	if (lch > rch && lch > pbh){
		$(".body_wrap").css("height", lch + "px");
		$(".right_nav").css("height", lch + "px");
	} else if (rch > lch && rch > pbh){
		$(".body_wrap").css("height", rch + "px");
		$(".left_nav").css("height", rch + "px");
	} else if (pbh > rch && pbh > lch){
		$(".left_nav").css("height", pbh + "px");
		$(".right_nav").css("height", pbh + "px");
	}

	$(".fill-height").each(function() {
		var regex = new RegExp("\\D", "g");

   		$(this).height($(this).parent().height() -
   				( $(this).offset().top - $(this).parent().offset().top ) +
   				$(this).parent().css("border-top-width").replace(regex,"") * 1  +
   				( $(this).parent().css("padding-top").replace(regex,"")  * 1 +
   				  $(this).parent().css("padding-bottom").replace(regex,"")  * 1 ) -
   				( $(this).css("padding-top").replace(regex,"")  * 1   +
   				  $(this).css("padding-bottom").replace(regex,"")  * 1  ) -
   				( $(this).css("border-top-width").replace(regex,"")  * 1  +
   				  $(this).css("border-bottom-width").replace(regex,"")  * 1)
   		);
	  });

}

$(function(){
	$(".button").assignMouseEvents();

	window.setTimeout(function() {
		initPageHeight();
	}, 1000);
});

function submitSearchForm(theForm) {
	if (strTrim(theForm.keyword.value) == searchInstructions) {
		theForm.keyword.value = "";
	}
	theForm.submit();
}

function doSearchFocus(component) {
    var searchVal = component.value;
    if (searchVal == searchInstructions) {
        component.value = "";
    }
}

function doSearchBlur(component) {
    var searchVal = component.value;
    if (strTrim(searchVal) == '') {
        component.value = searchInstructions;
    }
}

function doControlFocus(component,defaultMessage) {
    var controlVal = component.value;
    if (controlVal == defaultMessage) {
        component.value = "";
    }
}

function doControlBlur(component,defaultMessage) {
    var controlVal = component.value;
    if (strTrim(controlVal) == '') {
        component.value = defaultMessage;
    }
}

function strTrim(s) {
    // Remove leading spaces and carriage returns
    while (s.substring(0,1) == ' ') {
        s = s.substring(1, s.length);
    }
    // Remove trailing spaces and carriage returns
    while (s.substring(s.length-1, s.length) == ' ') {
        s = s.substring(0, s.length-1);
    }
    return s;
}

/*
 * This function launches a new web browser window to a specified width, height and features.
 * Features string is a comma separated window's feature needed for this new window. For Instance
 * If a new window needs a toolbar the feature string must be "toolbar" like needs scroll bar and
 * and toolbar then it must be "toolbar,scrollbar". Note that the order of the feature is not required.
 * Also it's case insensitive. Therefore, "scrollbar,toolbar" is identical to "Toolbar,ScrollBar".
 *
 * If the features string is ommitted then all the features are turned off. To turn all the features on
 * use the word "all" for features instead of specifying each feature.
 */

function openWindow(address, width, height,features)
{
	/* Find out what features need to be enable
	 *
   */
	if(features)
		features = features.toLowerCase();
	else
		features = "";

	var toolbar = (features == "all" ? 1 : 0);
	var menubar = (features == "all" ? 1 : 0);
	var location = (features == "all" ? 1 : 0);
	var directories = (features == "all" ? 1 : 0);
	var status = (features == "all" ? 1 : 0);
	var scrollbars = (features == "all" ? 1 : 0);
	var resizable = (features == "all" ? 1 : 0);


	if(features != "all")
	{
		//split features
		var feature = features.split(",");
		for(i = 0; i < feature.length; i++)
		{
		 	if(feature[i] == "toolbar")
			   toolbar = 1;
			else if(feature[i] == "menubar")
			   menubar = 1;
			else if(feature[i] == "location")
			   location = 1;
			else if(feature[i] == "directories")
			   directories = 1;
			else if(feature[i] == "status")
			   status = 1;
			else if(feature[i] == "scrollbars")
			   scrollbars = 1;
			else if(feature[i] == "resizable")
			   resizable = 1;
		}

	}
	features = "toolbar=" + toolbar + ",";
	features += "menubar=" + menubar + ",";
	features += "location=" + location + ",";
	features += "directories=" + directories + ",";
	features += "status=" + status + ",";
	features += "scrollbars=" + scrollbars + ",";
	features += "resizable=" + resizable;

	var newWindow = window.open(address, 'Popup_Window', 'width=' + width + ',height=' + height + ',"' + features + '"');
	newWindow.focus();
}

function trim(s)
{
	// Remove leading spaces and carriage returns
	while (s.substring(0,1) == ' '){
		s = s.substring(1,s.length);
	}
	// Remove trailing spaces and carriage returns
	while (s.substring(s.length-1,s.length) == ' '){
		s = s.substring(0,s.length-1);
	}
	return s;
}
/**
 * Check if the zip code is a US or APO/FPO or Canadian zip code
 */
function isZipCode(s) {
	return isUnitedStateZipCode(s) || isFPOorAPOZipCode(s) || isCanadianZipCode(s);
}

/**
 * Check if the zip code is a US zip code
 */
function isUnitedStateZipCode(s) {

	var reUSZip = new RegExp(/(^\d{5}$)|(^\d{5}(\-|\ )\d{4}$)/);

    if (!reUSZip.test(s)) {
         return false;
    }

    return true;
}

/**
 * Check if the zip code is a Canadian zip code
 */
function isCanadianZipCode(s) {

	var reCanZip = new RegExp(/(^[a-zA-Z]\d{1}[a-zA-Z](\-|\ )\d{1}[a-zA-Z]\d{1}$)/);

    if (!reCanZip.test(s)) {
         return false;
    }

    return true;
}

/**
 * Check if the zip code is a FPO or APO zip code
 */
function isFPOorAPOZipCode(s) {

	var reFPOorAPOZip = new RegExp(/(^[a-zA-Z]{3}(\-|\ )?[a-zA-Z]{2}(\-|\ )?\d{5}$)/);

    if (!reFPOorAPOZip.test(s)) {
         return false;
    }

    return true;
}

/*************************
	Form Field Background Color
*************************/
/*$(function(){
	$("input[type=text]").focus(function(){
		makeCurrent(this);
	});
	$("input[type=text]").blur(function(){
		makeNormal(this);
	});
	$("input[type=password]").focus(function(){
		makeCurrent(this);
	});
	$("input[type=password]").blur(function(){
		makeNormal(this);
	});
	$("textarea").focus(function(){
		makeCurrent(this);
	});
	$("textarea").blur(function(){
		makeNormal(this);
	});
});
function makeCurrent(elem){
	$(elem).css("background-color", "yellow");
}
function makeNormal(elem){
	$(elem).css("background-color", "white");
}*/

/*************************
	Header Javascript
*************************/

/*function checkBFFSubmit(oElm) {
    oElm.form.subscribeMethod.value = "emailHeader";

    if (x==null || x=="")
    {
      alert("First name must be filled out");
      return false;
      }

}*/
function happyHourSignup() {
	var formAction = $("#happyHourSignup").attr("action");
	$("#happyHourMessage").load(formAction, {"userEmailHeader":$("#happyHourSignup input#userEmailHappyHour").val(),"subscribeMethod":"emailHeader","source":"bodytop"});
}

function callEmailSignupHeader() {
    //This can be an e-mail or a phone .. need to handle both
    // DO NOT CHANGE THE NAMES OR DATA PASSED IN HERE ... THESE NEED TO BE THESE VALUES FOR HEADER OTHERWISE THE FUNCTIONALITY WILL BREAK
    var formAction = $("#subscribeHeaderForm").attr("action");
    //-- The value of subscribeMethod should ONLY be emailHeader here
    //-- The name of the input field should ONLY be userEmailHeader here
    $("#emailSignUpHeader").load(formAction, {"userEmailHeader":$("#subscribeHeaderForm input[name=userEmailHeader]").val(),"subscribeMethod":"emailHeader"});
}

$(function() {
	$("#subscribeHeaderForm input[name=userEmailHeader]").keydown(function(event) {
		if (event.keyCode == 13){
			callEmailSignupHeader();
			return false;
		}
	});

	$(".bubble_1 .signup-button").click(function(){
		callEmailSignupHeader();
	});
});


/*************************
	Footer Javascript
*************************/

function callEmailSignup(oElm) {
	var formAction = $("#subscribeForm").attr("action");

    if (oElm.form) {
        if(oElm.value == "email" || oElm.name== "userEmail"){
            document.subscribeForm.subscribeMethod.value = "email"
            $("#emailSignUp").html("Saving...").load(formAction, {"userEmail":$("#subscribeForm input[name=userEmail]").val(),"subscribeMethod":"email"});
        } else {
            document.subscribeForm.subscribeMethod.value = "mobile"
            $("#emailSignUp").html("Saving...").load(formAction, {"mobilePhone":$("#subscribeForm input[name=mobilePhone]").val(),"subscribeMethod":"mobile"});
        }
    }else if(oElm.id== "emailSignupButton2"){
		document.subscribeForm2.subscribeMethod.value = "email"
		$("#emailSignUp").html("Saving...").load(formAction, {"userEmail":$("#subscribeForm2 input[name=userEmail]").val(),"subscribeMethod":"email"});
	}else if(oElm.id== "mobileSignupButton2"){
		document.subscribeForm2.subscribeMethod.value = "mobile"
		$("#emailSignUp").html("Saving...").load(formAction, {"mobilePhone":$("#subscribeForm2 input[name=mobilePhone]").val(),"subscribeMethod":"mobile"});
	}else {
        if(oElm.id== "emailSignupButton"){
            document.subscribeForm.subscribeMethod.value = "email"
            $("#emailSignUp").html("Saving...").load(formAction, {"userEmail":$("#subscribeForm input[name=userEmail]").val(),"subscribeMethod":"email"});
        } else {
            document.subscribeForm.subscribeMethod.value = "mobile"
            $("#emailSignUp").html("Saving...").load(formAction, {"mobilePhone":$("#subscribeForm input[name=mobilePhone]").val(),"subscribeMethod":"mobile"});
        }
    }



    //$("#emailSignUp").html("Saving...").load(formAction, {"userEmail":$("#subscribeForm input[name=userEmail]").val()});
    //$("#subscribeForm").submit();
}

$(function() {
	$("#subscribeForm input[name=userEmail]").keydown(function(event) {
		if (event.keyCode == 13)
		{
			callEmailSignup(this);
			return false;
		}
	});

    $( "#subscribeForm input[name=mobilePhone]").keydown(function(event) {
		if (event.keyCode == 13)
		{
			callEmailSignup(this);
			return false;
		}
	});


	$(".email-signup-container .signup-button").click(function(){
		callEmailSignup(this);
	});

    $("#mobileSignupButtonAlert").click(function(){
//        document.subscribeForm.subscribeMethod.value = "mobile";
//        document.subscribeForm.mobile.value = " ";
//        $("#emailSignUp").html("").load(document.subscribeForm.action);
        binder.hopup.load("bffHopup",{url:"/bff/bff_me.jsp?source=Footer&subscribeMethod=mobile"});
    });
       
});
/* Create cookie */

function createCookie(name, value, domain, secs, path) {
	if (secs) {
		var date = new Date();
		date.setTime(date.getTime()+(secs*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";

	document.cookie = name+"="+value+expires+"; path=" + ((path) ? path : "/") + ((domain) ? "; domain=" + domain : "");
}

function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)return unescape(y);
	}
}


/*************************
	Required for Popup to Layer conversion
*************************/

/*
The default action for writing the response to the active popup layer.
Use this global function so the popup plugin can be changed easily
 */
var writeDataIntoLayer = function(data) {
	//used for jmpopups
	//$("#popupLayerScreenLocker").next().html(data);
	//used for openDOMWindow
	//$("#DOMWindow").html(data);
	//used for ColorBox
	//$("#cboxLoadedContent").html(data);
	binder.hopup.vars.children.EditItem.HTML({html:data});
	//binder.hopup.vars.children.EditItem.redrawHopup();
    /*if($.colorbox != undefined || $.colorbox != null){
	$.colorbox.resize();
    }*/
};

jQuery.fn.closeLayer = function(){
	/* use closeLayer() for all close layer events so that the interface with the plugin is only in one spot */
	if($.colorbox != undefined || $.colorbox != null){
        $.colorbox.close();
    }
    binder.hopup.close();
};

jQuery.fn.softSlideDown = function(callback){
	this.css("opacity", 0).slideDown(300).fadeTo(150, 1, function() {
		if (callback && typeof callback == "function")
			callback();
	});
	return this;
};

jQuery.fn.softSlideUp = function(callback){
	this.fadeTo(150, 0).slideUp(300, function() {
		if (callback && typeof callback == "function")
			callback();
	}).css("opacity", 1);
	return this;
};

jQuery.fn.hilight = function(callback){
	var me = this;
	if (me.hasClass("animating")) {
		var t = setTimeout(function(){
			me.hilight(callback);
		},200);
	} else {
		var hiliteColor = "#BDE8FF";
		var defaultStart = "#FFFFFF";
		var currentColor = jQuery(this).css('background-color');
		if (currentColor && currentColor != 'transparent' && currentColor.indexOf("rgba(") == -1)
			defaultStart = currentColor;

		me.addClass("animating").css("background-color",defaultStart).animate({ backgroundColor:hiliteColor }, 300, function() {
			me.animate({ backgroundColor:defaultStart }, 1000, function() {
				me.css("background-color",currentColor).removeClass("animating");
				if (callback && typeof callback == "function")
					callback();
			});
		});
		return this;
	}
};

/* ------------------------------------------------------------------------
 prettyCheckboxes

 Developped By: Stephane Caron (http://www.no-margin-for-errors.com)
 Inspired By: All the non user friendly custom checkboxes solutions ;)
 Version: 1.1

 Copyright: Feel free to redistribute the script/modify it, as
 long as you leave my infos at the top.
 ------------------------------------------------------------------------- */

jQuery.fn.prettyCheckboxes = function(settings) {
    settings = jQuery.extend({
        checkboxWidth: 17,
        checkboxHeight: 17,
        className : 'prettyCheckbox',
        display: 'list'
    }, settings);

    $(this).each(function(){
        // Find the label
        $label = $('label[for="'+$(this).attr('id')+'"]');

        // Add the checkbox holder to the label
        $label.prepend("<span class='holderWrap'><span class='holder'></span></span>");

        // If the checkbox is checked, display it as checked
        if($(this).is(':checked')) { $label.addClass('checked'); };

        // Assign the class on the label
        $label.addClass(settings.className).addClass($(this).attr('type')).addClass(settings.display);

        // Assign the dimensions to the checkbox display
        $label.find('span.holderWrap').width(settings.checkboxWidth).height(settings.checkboxHeight);
        $label.find('span.holder').width(settings.checkboxWidth);

        // Hide the checkbox
        $(this).addClass('hiddenCheckbox');

        // Associate the click event
        $label.bind('click',function(){
            $('input#' + $(this).attr('for')).triggerHandler('click');

            if($('input#' + $(this).attr('for')).is(':checkbox')){
                $(this).toggleClass('checked');
                $('input#' + $(this).attr('for')).checked = true;

                $(this).find('span.holder').css('top',0);
            }else{
                $toCheck = $('input#' + $(this).attr('for'));

                // Uncheck all radio
                $('input[name="'+$toCheck.attr('name')+'"]').each(function(){
                    $('label[for="' + $(this).attr('id')+'"]').removeClass('checked');
                });

                $(this).addClass('checked');
                $toCheck.checked = true;
            };
        });

        $('input#' + $label.attr('for')).bind('keypress',function(e){
            if(e.keyCode == 32){
                if($.browser.msie){
                    $('label[for="'+$(this).attr('id')+'"]').toggleClass("checked");
                }else{
                    $(this).trigger('click');
                }
                return false;
            };
        });
    });
};

checkAllPrettyCheckboxes = function(caller, container){
    if($(caller).is(':checked')){
        // Find the label corresponding to each checkbox and click it
        $(container).find('input[type=checkbox]:not(:checked)').each(function(){
            $('label[for="'+$(this).attr('id')+'"]').trigger('click');
            if($.browser.msie){
                $(this).attr('checked','checked');
            }else{
                $(this).trigger('click');
            };
        });
    }else{
        $(container).find('input[type=checkbox]:checked').each(function(){
            $('label[for="'+$(this).attr('id')+'"]').trigger('click');
            if($.browser.msie){
                $(this).attr('checked','');
            }else{
                $(this).trigger('click');
            };
        });
    };
};


$(function() {
	$(".openAjaxLayer").live("click", function(e) {
		e.preventDefault();
		var layerWidth = 400;//the default layer width, can be overridden by setting a class of layerWidth700 on each anchor
		var maxLayerWidth = 500;//the max width of the layer
		var path = $(this).attr("href");
		var tagsLayerWidth = $(this).attr('data-layerWidth');
		var tagsMaxLayerWidth = $(this).attr('data-maxLayerWidth');

		if( tagsMaxLayerWidth != undefined  )
		 	maxLayerWidth = tagsMaxLayerWidth;

		if ( tagsLayerWidth != undefined )
			layerWidth = tagsLayerWidth;

		/* we need to cache bust GET requests for IE */
		var paramSep = (path.indexOf("?") > 0) ? "&" : "?";
		var d = new Date();
		path = path + paramSep + "time=" + d.getTime();

		$.colorbox({
			scrolling:false,
			href:path,
			width:layerWidth,
			opacity:.6
		});

		return false;
	});

	$(".closePopupLayer").live("click", function(e){
		e.preventDefault();
        if($.colorbox != undefined || $.colorbox != null){
            $(this).closeLayer();
        }
		return false;
	});
});


/*
+ADDED FOR PRODUCT PAGE ZOOM STUFF
*/
var productImage = {}; // A global namespace.

var EVENTS = {
	"ZOOM_VIEWER_OPENED": "zoomViewerOpened"
};

quicklookDelay = 250;
/*************************
Required for quick view on filmstrip items, called from the filmstripItemTemplate tag
*************************/
var quickView={
	handleQuickView: function(){
	    binder.hopup.create("quickView", {hopupTemplate:"quickView"});
		$(".quicklook-button").unbind()
		$(".prodImage").unbind()
		$(".prodImage").mouseover(
				function(e){
					var targ = $(this).find(".js_QuickLookBtn")
					if(targ.length){
						targ.show()
					}
					 showImageRareView(this);
				}
			);

			$(".prodImage").mouseout(
				function(e){
					$(this).find(".js_QuickLookBtn").hide();
					 showImageFrontView(this);
				}
			);

		$(".quicklook-button").each(
			function(){
				$(this).click(
					function(){
						binder.hopup.load(
							"quickView",
							{
								url:$(this).attr("data-url")
							}
						)
					}

						/*
						function()
						{
							var url = $(this).attr("data-url");
							var sourceSelector = $(this).attr("data-sourceSelector");
							var data = {sourceURL: url, sourceSelector:sourceSelector};
							var pos = $(this).parent(".prodImage").offset();
							var x = pos.left + ($(this).parent(".prodImage").width() / 2);
							var y = pos.top + ($(this).parent(".prodImage").height() / 2);
							$(this).trigger("quicklookselected", [data, x, y]);
						}
						*/
				);
			}
		);
	},
	handleNewItemsQuickView: function(){
	    //binder.hopup.create("quickView")
		$(".searchResultHide .prodImage").each(
			function(index){
				$(this).mouseover(
					function(e){
						var targ = $(this).find(".js_QuickLookBtn")
						if(targ.length){
/*
							var y = Math.max(
								Math.max(document.documentElement.scrollTop),
								Math.max(document.body.scrollTop)
							)
							var x = Math.max(
								Math.max(document.documentElement.scrollLeft),
								Math.max(document.body.scrollLeft)
							)

							var rect = this.getBoundingClientRect()

							var indi = targ[0]

							var w = (rect.right-rect.left)
							var h = (rect.bottom-rect.top)*/
							//indi.style.top = h/2+"px"
							//indi.style.top = "-30px"
							//indi.style.left = w/2+"px"

							targ.show()
						}
						//debugger;
						//$(this).find(".js_QuickLookBtn").show();
                         showImageRareView(this);
					}
				);

				$(this).mouseout(
					function(e){
						$(this).find(".js_QuickLookBtn").hide();
                         showImageFrontView(this);
					}
				);
			}
		);

		$(".searchResultHide .quicklook-button").each(
			function(){
				$(this).click(
					function(){
						binder.hopup.load(
							"quickView",
							{
								url:$(this).attr("data-url")
							}
						)
					}

						/*
						function()
						{
							var url = $(this).attr("data-url");
							var sourceSelector = $(this).attr("data-sourceSelector");
							var data = {sourceURL: url, sourceSelector:sourceSelector};
							var pos = $(this).parent(".prodImage").offset();
							var x = pos.left + ($(this).parent(".prodImage").width() / 2);
							var y = pos.top + ($(this).parent(".prodImage").height() / 2);
							$(this).trigger("quicklookselected", [data, x, y]);
						}
						*/
				);
			}
		);
	}
};

/*************************
for layer related functionality
*************************/
var layer = {
		layerInit :
			function()
			{
			// dataType: "html", used html converter so that we don't get json or xml parse error
			$(".ajaxFormSubmit").submit(function(e){
				e.preventDefault();
				$.ajax({
					data:$(this).serialize(),
					url:$(this).attr("action"),
					type:$(this).attr("method") != null ? $(this).attr("method") : "GET",
					dataType: "html",
					success:function(data){
						writeDataIntoLayer(data);
					}
				});
				return false;
			});
			$("#layer_close_button > a").click(function(e){
				e.preventDefault();
                binder.hopup.close();
                if($.colorbox != undefined || $.colorbox != null){
				    $(this).closeLayer();
                }
			});

			$('.formFieldContainer:not(.checkRadio)').each(function(i) {
				overLabels.init($(this));
			});
			}
};

/*$(document).ready(
    function()
    {
        $('div.bazaarVoice').each(function(){
            var $this = $(this);
            var $avg = $this.find('.bv_avg');
            var rating = parseFloat($avg.text());
            var width = $this.find('.stars').width();
            var ratingWidth = 0;
            if (isNaN(rating)) {
                rating = 0;
                $avg.text('0');
            } else {
                ratingWidth = parseInt(width * (rating / 5));
            }
            $this.find('.stars .avg').width(ratingWidth);

        });

   }


);*/
function goToByScroll(className){
    $('html,body').animate({scrollTop: $("."+className).offset().top},'slow');
}

var roundPrice = function(value){
	return  Math.round(value).toFixed();
}
function thumbnailImageSwap(oElm){
	var id = oElm.id
    var productStyle= id.substring(0,id.indexOf("_"));
    var swatchAltImagesMap=  eval("scene7ImageMap_"+productStyle);
    var imageSetProps=swatchAltImagesMap[id];
    $(".colorPrice span").eq(0).html(imageSetProps["colorName"]);
    var altImages= imageSetProps["altImages"];
    var currentThumbnailImg = $(oElm).parents(".item").find("div.prodImage a img");
    var currentThumbnailImgAnchor = $(oElm).parents(".item").find("div.prodImage a");
    var currentThumbnailTitle = $(oElm).parents(".item").find("div.prodTitle a");
    var colorCodeUrl = $(currentThumbnailImgAnchor).attr("href").split("?").shift();
    colorCodeUrl += "?colorCode="+id;
    var existingImgSrc = currentThumbnailImg[0].src;
    var imageName = existingImgSrc.split("?")[0].substring(existingImgSrc.split("?")[0].lastIndexOf("/")+1);
    $(currentThumbnailImg).attr("src",existingImgSrc.replace(imageName,altImages[0]));
    $(currentThumbnailImgAnchor).attr("href",colorCodeUrl);
    $(currentThumbnailTitle).attr("href",colorCodeUrl);

    var currentQuicklookBtn = $(oElm).parents(".item").find(".js_QuickLookBtn");
    var currentDataUrlSplit,framedUrl,genUrl,currentDataUrl;
    currentDataUrl = $(currentQuicklookBtn).attr('data-url');
    if(currentDataUrl.indexOf("colorCode") != -1){
        currentDataUrlSplit = currentDataUrl.split("&");
        currentDataUrlSplit.pop();
        genUrl = currentDataUrlSplit.join("&");
       $(currentQuicklookBtn).attr('data-url',genUrl+"&colorCode="+id);
    }else{
         genUrl = currentDataUrl+"&colorCode="+id;
         $(currentQuicklookBtn).attr('data-url',genUrl);
    }
}


//This grabs the next result set, adds it to the page and attaches event handlers.
function getNextResults(searchCriteria){
	$.ajax({
		url: searchCriteria.url + "&pageNumber=" + searchCriteria.pageNumber + '&pageGap=' + searchCriteria.pageGap + '&skipped=' + searchCriteria.skipped,
		success: function(data,msg,xhr) { getNextResultsSuccess(data,msg,xhr,searchCriteria); }
	});
}
function getNextResultsSuccess (data,msg,xhr,searchCriteria){
	var remoteContent = xhr.responseText;

	//Evaluate the scripts returned
	var sandbox = document.createElement('tbody');
	sandbox.innerHTML = remoteContent;
	var scripts = $(sandbox).find('script');
	for (var i=0,l=scripts.length;i<l;i++){
		try {
			eval(scripts[i].innerHTML.replace("var scene7","window.scene7"));
		} catch(e) {}
	}
	pageGap = $(sandbox).find('input[name="gap"]').val();
	skipped = $(sandbox).find('input[name="skipped"]').val();

	//put remote content into the existing table.
	var table = $('#thumbNailTable');
	table.find('tbody').append(remoteContent);

	if (!table.hasClass('EndOfSearchResults') && window.isEndOfResults){
		table.addClass('EndOfSearchResults');
	}

	if (pageGap == null || pageGap == 'undefined'){ pageGap = 0; }
	
	if (skipped == null || skipped == 'undefined'){ skipped = 0; }
	
	table.data({ 'pageNum' : searchCriteria.pageNumber, 'pageGap' : pageGap, 'skipped': skipped});
	


	quickView.handleNewItemsQuickView();
}

$(document).ready(function(){
	//Mac webkit has some specific additional styling requirements with select menu display
	if(navigator.userAgent.indexOf("Mac OS X") != -1 && $.browser.webkit){
		$('body').addClass('mac');
	}

	
	
});

function showImageRareView(scope){

    var imageSrc = $(scope).find("img").attr("src");


    var imageAttr = zoomUtils.filenameParser(imageSrc);

	var prodAttributeArray;
    try {
		prodAttributeArray = eval("scene7ImageMap_" + (imageAttr.fileName.split("_")[0]));
    } catch(e){if(window.console && console.log) {console.log(e)}}

    if (prodAttributeArray[imageAttr.fileName].altImagesSize > 1) {

        if (!strEndsWith(imageAttr.fileName, "_1")) {
            var newProps = {'fileName':imageAttr.fileName + "_1"};
        }
        else {
            var newProps = {'fileName':imageAttr.fileName};
        }
        zoomUtils.filenameReplace(imageSrc, newProps);
        var newImageSrc = zoomUtils.filenameReplace(imageSrc, newProps);
        $(scope).find("img").attr("src", newImageSrc);
    }
}
function showImageFrontView(scope){
    var imageSrc = $(scope).find("img").attr("src");
    var imageAttr = zoomUtils.filenameParser(imageSrc);
    var str = imageAttr.fileName;


    if(strEndsWith(imageAttr.fileName,"_1")){
        str = imageAttr.fileName.split("_");
        str.pop();
        str = str.join("_");
     }
    var newProps = {'fileName': str};
    zoomUtils.filenameReplace(imageSrc, newProps);
    var newImageSrc = zoomUtils.filenameReplace(imageSrc, newProps);
    $(scope).find("img").attr("src",newImageSrc);
}
function strEndsWith(source,pattern){
    var d = source.length - pattern.length;
    return d >= 0 && source.lastIndexOf(pattern) === d;

}

function evt_find_remove(iInt){
	var len = document.getElementById("altImagesWrapper").getElementsByTagName("LI").length
	if(len == 0){
		setTimeout("evt_thisWaitForChildren("+iInt+")", 50)
		return
	}
	if(len > iInt){
		var targ = document.getElementById("miniProductViewPort")
		targ.className += " sliderView"
		binder.horizontalSlider.create(
			"miniProductView", 
			{
				sliderParent:"miniProductViewPort",
				leftArrow:"mpLeftArrow",
				rightArrow:"mpRightArrow",
				bOnlyOne:true
			}
		)
	} else {
		
			var d = document.getElementById("mpLeftArrow").parentNode
			d.parentNode.removeChild(d)
			var d = document.getElementById("mpRightArrow").parentNode
			d.parentNode.removeChild(d)
			document.getElementById("miniProductViewPort").id = ""
		document.getElementById("altImagesWrapper").style.position = "static"
	}
}

function submitGeoCodeForm(form) {
    try {
        var searchValue = form.cityStateZip.value;
        //
        // we dont know what the coords are so go to geocoding provider to grab
        // them.
        //
        MyMapGeocode(
            searchValue,
            function(geocode) {

                if (!geocode) {
                    if (form.cityStateZip.value == "") {
                        geoError("EMPTY_GEOCODE");
                    } else {
                        //
                        // what we have here... is.. a failure to communicate
                        //
                        geoError("INVALID_GEOCODE");
                    }
                    return false;

                } else {
                    //
                    // submit the populated form
                    //
                    submitGeoCodeResultsForm(form, geocode.lat, geocode.lng);
                }
            }
        );
        return false;
    } catch (e) {
        if (e.name.indexOf("TypeError") > 0) {
            form.submit();
        }

    }
}


function submitGeoCodeResultsForm(form, lat, lng) {
    //
    //
    // copy the passed latitude and longitude results to the form
    // and submit it
    //
    form.latitude.value = lat;
    form.longitude.value = lng;
    form.submit();
}


function getDynamicVariantInventory(){
	if(window.dynamicVariantInventory == undefined){
		window.dynamicVariantInventory = {
				byProduct:{},
				byVariant:{}
			};
	}
	return window.dynamicVariantInventory;
}

function populateVariantInventories(productKey, inventoryMap){
	var dynamicInventory = getDynamicVariantInventory();
	for(var pvID in inventoryMap){
		dynamicInventory.byVariant[pvID] =  inventoryMap[pvID];
	}
	dynamicInventory.byProduct[productKey] = inventoryMap;
}

function getInventoryForPV(invVariantID){
	var value = getDynamicVariantInventory().byVariant[invVariantID];
	return value;
}

function getInventoryForProduct(invProductID){
	invProductID = '4_' + invProductID;
	/* assumption is made that if a product is initialized, all variants with inventory within the product are also
	initialized	*/
	prodInvMap = getDynamicVariantInventory().byProduct[invProductID];

	if(prodInvMap == undefined){
		return undefined;
	}
	
	var prodInventory = 0;
	for(var varID in prodInvMap){
		prodInventory = prodInventory + prodInvMap[varID];
	}
	return prodInventory;
}

function qasVerifyFilter(addressVerified, initialAddress){

	var updatedAddress = "";
	for (i = 0; i < QAS_Variables.ADDRESS_FIELD_IDS.length; i++){
		for (j = 0; j < QAS_Variables.ADDRESS_FIELD_IDS[i].length; j++) {
			var fieldValue = $('#' + QAS_Variables.ADDRESS_FIELD_IDS[i][j]).val();
			fieldValue = $("<div />").html(fieldValue).text();
			updatedAddress = updatedAddress + fieldValue;
		}
	}

	var performQasValidation = false;
	if(!addressVerified || (initialAddress != updatedAddress)){
		performQasValidation = true;
	}else{
		performQasValidation = false;
	}

	if(disableQasValidation){
		performQasValidation = false;
	}

	if(performQasValidation){
		return QAS_Verify_Address();
	}else{
		//Skip the validation and save the form
		if (QAS_Variables.POST_ON_CLICK !== null && QAS_Variables.POST_ON_CLICK !== undefined) {
		QAS_Variables.POST_ON_CLICK();
		}
		
		if (QAS_Variables.BUTTON_ID !== "") {
			$('#' + QAS_Variables.BUTTON_ID).attr('onclick', '');
			$('#' + QAS_Variables.BUTTON_ID).parent('form').attr('onsubmit', '');
			$('#' + QAS_Variables.BUTTON_ID).click();
		}
	}
}

function qasUpdateCountryCode(parent, targetID){
	if(targetID == undefined){
		targetID = '#countryCode';
	}
    var selectedState = parent.find('#state').val(); //$('#state').val();
	var cnt = jQuery.inArray(selectedState, QAS_Variables.CANADIAN_PROVINCES);
	if ( selectedState != undefined && selectedState != "" ){
		if ( cnt > -1 ) { // if Canadian state is selected
			parent.find(targetID).val('CAN');
			//$('#countryCode').val('CAN');
		}
		else {
			parent.find(targetID).val('USA');
			//$('#countryCode').val('USA');
		}
	}
}

function setFBEvent(iAttempt, delaySec, cbFN){
		if(iAttempt > 0){
			if(typeof FB === 'undefined'){
				setTimeout(
					function(){
						setFBEvent(iAttempt - 1, delaySec, cbFN);
					}
				, delaySec);
			}else{
				//FB is defined so invoke the callback function
				cbFN();
			}
		}
}

function fbEdgeCreateHomeCR(){
    FB.Event.subscribe('edge.create', function(response) {
        s=s_gi(s_account); 
        s.events='event27'; 
        s.linkTrackEvents='event27';
        s.props='prop8'; 
        s.linkTrackVars='prop8';
        s.tl(true,'o','Facebook Like'); 
        });
}

function fbAuthLoginHomeCR(){
    FB.Event.subscribe('auth.login', function(response) {
    	s.prop9="Login Type Page";  
 	    s.eVar29="Facebook Login";
 	    var s_code=s.t();if(s_code)document.write(s_code);
    });
}

function fbEdgeCreatePdp1CR(){
    FB.Event.subscribe('edge.create', function(response) {
        s=s_gi(s_account); 
        s.events='event32'; 
        s.linkTrackEvents='event32';
        s.tl(true,'o','PDP Facebook Like'); 
	});
}

function fbAuthLoginMainCR(){
	    FB.Event.subscribe('auth.login', function(response) {
	    if (response.status === 'connected') {
	    	s.prop9="Login Type Page";  
     	    s.eVar29="Facebook Login";
     	    var s_code=s.t();if(s_code)document.write(s_code);
	    }
	    else {
	    	s.prop9="Login Type Page";  
     	    s.eVar30="Email Login";
     	    var s_code=s.t();if(s_code)document.write(s_code);
	    	
	    }
        });
}


function fbEdgeCreateFooterCR(){
	    FB.Event.subscribe('edge.create', function(response) {
	    	s.prop8="Facebook Like";  
     	    var s_code=s.t();if(s_code)document.write(s_code);	  
        });
}

function fbMessageSendFooterCR(){
	    FB.Event.subscribe('message.send', function(response) {
	    	s.prop8="Facebook Sends";  
     	    var s_code=s.t();if(s_code)document.write(s_code);	  
        });
}

function fbCommentCreateFooterCR(){
	    FB.Event.subscribe('comment.create', function(response) {
	    	s.prop8="Facebook comments";  
     	    var s_code=s.t();if(s_code)document.write(s_code);	  
        });
}
/* adding a scrolling stopped event check, for stick nav */
$.fn.scrollStopped = function(callback) {          
    $(this).scroll(function(){
        var self = this, $this = $(self);
        if ($this.data('scrollTimeout')) {
          clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback,100,self));
    });
};

function is_touch_device() {
	  return 'ontouchstart' in window 
	      || 'onmsgesturechange' in window; 
};  

/* sticky nav functionality */
	var newResize = true;
	       	           	
	function expandCollapseHeader(){
	   	var header	= document.getElementById("header-main");
	   	var promoRow = document.getElementById("promo-row");
	   	var pageWrap = document.getElementById("pageWrap");
		var promoRow = document.getElementById("promo-row");
		var subscribeForm = document.getElementById("subscribe-form");
		
		if($(window).scrollTop() <= 90){
			newResize = true;
			$(header).stop();
			$('#keyword').blur();
			$('#ac_results').css('display','none');
			binder.genFlyout.hideAllFlyouts();
			$(header).animate({height:90}, 300, function() {   	
				$(subscribeForm).fadeIn( "slow" );
       				$(header).removeClass('collapsed');
		   		   	$(header).addClass('expanded');
		   		   	$(promoRow).removeClass('collapsed');
		   			$(promoRow).addClass('expanded');  
			});           				               				
		}else if($(window).scrollTop() > 90){               	                			
			if(newResize == true){
				$('#keyword').blur();
				$('#ac_results').css('display','none');
				binder.genFlyout.hideAllFlyouts();
	        	$(header).animate({height:66}, 300, function() {
	        		$(subscribeForm).fadeOut( "slow" );
	           				$(header).addClass('collapsed');
	    	    		   	$(header).removeClass('expanded');
	    	    		   	$(promoRow).addClass('collapsed');
	    	    			$(promoRow).removeClass('expanded'); 
	   				newResize = false;	                	
	    		});
			}
		}
	}	
function scrollToTop(){
	$('html,body').scrollTop(0);
}

//function isCanadianZipCode(inputValue){
//    return (/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]+?[0-9][A-Z][0-9]$/i).test($.trim(inputValue));
//}

function isCanadaState(inputValue){
    var canadaProvinceArray = ["AB","BC","MB","NB","NF","NL","NT","NS","NU","ON","PEI","QC","SK","YT"];
    return (_.contains(canadaProvinceArray, inputValue));
}

function isCanadaEmail(inputValue){
    return inputValue.split(".").pop() === 'ca';
}

function isOptinBoxHideOrShow(caseType, inputValue){
    var cases = {
        zipCode: isCanadianZipCode,
        state: isCanadaState,
        emailAddress: isCanadaEmail,
        _default: function() { console.log("default"); }
    };

    return  cases[ caseType ] ? cases[ caseType ](inputValue) : cases._default();
}

function canadaOptinHide(){
    var $emailPref = $("#emailPreference"), $emailPrefWrap = $("#emailPreferenceWrap"), $checkBoxDiv = $emailPrefWrap.find(".checkBoxDiv");
    var zipCodeVal = $("#zipCode").val(), stateValue = $("#state").val(), emailValue = $("#emailAddress").val();
    var isCanadaZipCode = isCanadianZipCode(zipCodeVal), isCanadaStateProvince = isCanadaState(stateValue), isCanadaEmailAddress = isCanadaEmail(emailValue);
    var zipCheck, stateCheck, emailCheck;
    var inputValue = !CommonJS.isEmpty(zipCodeVal) || !CommonJS.isEmpty(stateValue) || !CommonJS.isEmpty(emailValue);
    if(inputValue) {
        stateCheck = isOptinBoxHideOrShow('state', stateValue);
        zipCheck = isOptinBoxHideOrShow('zipCode', zipCodeVal);
        emailCheck = isOptinBoxHideOrShow('emailAddress', emailValue);
        if(stateCheck || zipCheck || emailCheck){
            $emailPref.attr("value","false");
            $emailPref.removeAttr("checked","false");
            $checkBoxDiv.removeClass("click");
            $emailPrefWrap.css("visibility","hidden");
        }else{
            $emailPref.attr("value","true");
            $emailPref.attr("checked","checked");
            $checkBoxDiv.addClass("click");
            $emailPrefWrap.css("visibility","visible");
        }
    }
}



