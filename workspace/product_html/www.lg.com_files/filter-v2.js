/*
 * Grid filter module.
 *
 * May exist de-coupled from the grid, in which case form submissions
 * will post to a new page, asynchronously.
 *
 * options:
 * - string event  : set to "change" to cause the change event on any
 *                   contained inputs to trigger the form's submission.
 * - boolean debug : same as for all the other components.
 *
 * requires:
 * - lg.js
 * - filter.css
 *
 * authors:
 *   Big Red Tech <bigred.tech@icrossing.com>
 *  	Adam Abouraya <Adam.Abouraya@icrossing.com>
 * 		Arne G Strout <arne.strout@icrossing.com>
 * 		Bret Crosby <bret.crosby@icrossing.com>
 * 		John Reading <john.reading@icrossing.com>
 * 		Jonathan Zuckerman <jonathan.zuckerman@icrossing.com>
 * modify:
 *   parkjeongmi <pjm2@cnspartner.com>
 */
var filterInfo = new Array();
lg.Filter = lg.Component.extend({
	options: {
		event: false
	},
	/*
	 * Initialize/construct the filter form.
	 */
	init: function(options, element) {
		this._super(options, element);

		// DRY
		this.form = this.element.is('form') ? this.element : this.element.find('form');
		this.submit = this.element.find('button[type=submit]');
		this.filter = this.element.find('#filter');

		this.form.attr('method','post');

		// Debugging.
		this.log('options:', this.options);

		this.gridInstance = $('.grid');
		this.checkCnt = 0;

		(this.gridInstance.hasClass('hidden')) ? this.gridDisplay = true : this.gridDisplay = false;
		(this.form.hasClass('hideTiles')) ? this.hideTile = true : this.hideTile = false;
		//reload cookie setting
		this.cookieFilter = false;

		this.setCookieFilter();

		if(this.cookieFilter) {
			this.applyFilter();
		}

		/* LG-WCAG : 140630 add */
		var browser = (function() {
		  var s = navigator.userAgent.toLowerCase();
		  var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
		              /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
		              /(msie) ([\w.]+)/.exec(s) ||               
		              /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
		             [];
		  return { name: match[1] || "", version: match[2] || "0" };
		}());
		/* // LG-WCAG : 140630 add */

		// Submits the form when any of the input type elements get changed.
		// You can see it in action on the Reviews tab.
		if (this.options.event == 'change') {

			if (browser.name == 'msie' && browser.version < 9) {
				$('.swatch',this.form).each(function(){
					$(this).find('input[type="checkbox"]').addClass('realtime');
				});
			}

			this.filter.find('input, select, checkbox, radio').bind('change', $.proxy(function(e){
				var chkT;

				if (browser.name == 'msie' && browser.version < 9) {
					$('.swatch', this.form).find('input').addClass('realtime');
				} else {
					e.preventDefault();
				}

				var item = $(e.target);
				var itemAttr = "";
				var cookieVal = "";

				if(e.target.type == 'checkbox' || e.target.type == 'radio') {
					if(item.prop("checked")) {
						itemAttr = "checked";
						
						/* LGEUS-2535 Omniture tagging on the left nav : 20130131 kosangin add */
						if(lg.locale=="/us"){
                            var colorW,colorS;
							(item.parent().prevAll('legend:first').find('a').length > 0)?colorW = document.getElementById(item.parent().prevAll('legend:first').attr('id')).childNodes[0].nodeValue:colorW = $.trim(item.parent().prevAll('legend:first').text());

							if($(e.target).parent().hasClass('swatch')){
								colorS = item.parent().attr('title');
							}else{
								colorS = $(e.target).next('span').text();
							}

							
							chkT = 'Select'+ ' ' + colorS; /* 20140519 choyearang modify */
							item.attr('title',chkT);
							this.log(item.attr('title'));
						}
						/* //LGEUS-2535 Omniture tagging on the left nav : 20130131 kosangin add */
					} else {
						itemAttr = "";
					}
				} else {
					itemAttr = "selected";
					(item.find('option[value='+item.val()+']').is(':selected')) ? itemAttr = 'selected' : itemAttr = '';
					/* LGEUS-2535 Omniture tagging on the left nav : 20130131 kosangin add */
					if(lg.locale=="/us"){
						selT = $(e.target).parent().prev('legend').text();
						optS = $(e.target).find('option:selected').text();
						mm_name = $(e.target).parent().find('select').attr('name');
						mmX = mm_name.substring(mm_name.length , mm_name.length-3);

						if(mmX == 'min'){
							selT = $(e.target).parent().prev('legend').text();
							chkT = selT +':'+ mmX +':'+ optS;
							item.attr('title',chkT);
						}else if(mmX == 'max'){
							selT = $(e.target).parent().prev().prev('legend').text();
							chkT = selT +':'+ mmX +':'+ optS;
							item.attr('title',chkT);
						}else{
							chkT = selT  +':'+ optS;
							item.attr('title',chkT)
						}
						this.log(item.attr('title'));
					}
					/* //LGEUS-2535 Omniture tagging on the left nav : 20130131 kosangin add */
				}

				cookieVal = itemAttr+"|"+item.val();
				setCookie(item.attr('value'), cookieVal, 1);

				this.applyFilter();
				if(lg.locale=="/us"){
					this.attachFormFilter(chkT);//LGEUS-2535 kosangin add
				}


				if(item.parent().hasClass('swatch')) {
					if (item.parent().hasClass('active')) {
						item.parent().removeClass('active');
					} else {
						item.parent().addClass('active');
					}
				}

			}, this));


		}

		//always submit on sort selection
		this.form.find('.sort-select').bind('change', $.proxy(function(){
			this.applyFilter();
		}, this));

		this.form.find('#range-min, #range-max').bind('change', $.proxy(function(){
			this.range();
		}, this));

		this.filter.find('#filter-reset').bind('click', $.proxy(function(){
			this.clear();
			return false;
		}, this));
		
		// 140411 enter key not action
		this.form.find("input, select, checkbox, radio").on('keydown', $.proxy(function (b) {
			if(b.keyCode == 13) {
				return false;
			} 
		}, this));

	},
	setCookieFilter: function() {
		this.filter.find('input, select, checkbox, radio').each($.proxy(function(idx,el){
			var key = $(el).attr('value');
			var getVal = getCookie(key);

			if(getVal && getVal.length > 0) {
				getVal = getVal.split('|');

				if(getVal[0] == 'checked') {
					$(el).attr('checked','checked');
					if($(el).parent().hasClass('swatch')) {
						$(el).parent().addClass('active');
					}
				} else if(getVal[0] == 'selected') {
					$(el).find('option[value='+getVal[1]+']').attr('selected','selected');
				}
				$(el).attr('check-attr',getVal[0]);
				if(lg.locale=="/us"){
					$(el).attr('data-sc-item','filter-search');/* LGEUS-2535 Omniture tagging on the left nav : 20130131 kosangin add */
					$(el).find('option[value='+getVal[1]+']').attr('data-sc-item','filter-search');
				}

				if(!this.cookieFilter) {
					this.cookieFilter = true;
				}
			}
		}, this));
	},
	/* public method apply
	 *
	 * Apply these filters to the specified product grid. */
	applyFilter: function() {
		var uri = this.form.attr('action') + '?' + this.form.serialize();
		this.gridInstance.grid('reload', uri);

		this.log('applying form filters!');
	},/* LGEUS-2535 Omniture tagging on the left nav : 20130131 kosangin add */
    attachFormFilter: function (chkT) {
    	    link = this.form.attr('action');
            mapItem = this.form.data("sc-item");
            for (prop in scMap[mapItem]) {
                s[prop] = siteCatalyst.replaceWildCards(scMap[mapItem][prop], this.form)
            }

            if (scMap[mapItem]) {
            	s.linkTrackName = scMap[mapItem].linkTrackName.replace("{title}",chkT);
				(s.prop14 != null && s.prop14 != "undefined")?s.prop14 = scMap[mapItem].prop14.replace("{title}",chkT):null;
            	//alert("bb : " + s.linkTrackName);
                s.tl(link, scMap[mapItem]["type"], s.linkTrackName)
            }

           this.log('omniture tagging!');
    },/*//LGEUS-2535 Omniture tagging on the left nav : 20130131 kosangin add */
	/* Apply these filters to the specified product grid. */
	range: function() {
		var idxMin = document.getElementById("range-min"+i).selectedIndex; //jquery bug
		var idxMax = document.getElementById("range-max"+i).selectedIndex +1; //jquery bug

		var oldMax = idxMax;
		var oldMin = idxMin;

		if (idxMax <= idxMin) { //forbid inverse values
			document.getElementById("range-min"+i).selectedIndex = oldMin;
			document.getElementById("range-max"+i).selectedIndex = oldMax -1;
			return;
		}

		$sliders = $('.slider span', this.element);

		$sliders.removeClass('fill');

		if((idxMax - idxMin) > 0){
			$sliders.each(function(idx, el){
				if (idx >= idxMin && idx < idxMax) {
					$(el).addClass('fill');
				}
			});
		}

		this.applyFilter();
		this.log('applying range filters!');
	},
	/* S */
	checkFilter: function(){
		if(filterInfo.length > 0) {
			for (var i in filterInfo) {
				var filterValues = filterInfo[i]["facetValues"];
				for(var j in filterValues) {
					var _enable = filterValues[j]["enable"];
					var _value = filterValues[j]["facetValueId"];
					var _chkfilter = $('*[value="' + _value + '"]', this.filter);

					if(_chkfilter.get(0)) {
						if(_chkfilter.get(0).tagName.toLowerCase() == "select") {
							if(_enable == "N") {
								_chkfilter.css('display','none');
								setCookie(_chkfilter.attr('value'), '', -1);
							} else {
								_chkfilter.css('display','block');
							}
						} else {
							if(!_chkfilter.is(':checked')) {
								if(_enable == "N") {
									_chkfilter.attr('disabled','disabled').css('cursor','default').parent().css('cursor','default');
									setCookie(_chkfilter.attr('value'), '', -1);
									(_chkfilter.parent().hasClass('swatch')) ? _chkfilter.parent().addClass('disable') : null;

								} else {
									_chkfilter.removeAttr('disabled').css('cursor','pointer').parent().css('cursor','pointer');
									(_chkfilter.parent().hasClass('disable')) ? _chkfilter.parent().removeClass('disable') : null;
									(_chkfilter.parent().hasClass('swatch')) ? _chkfilter.parent().removeClass('disable') : null;
								}
							} else {

							}
						}
					}
				}
			}
			if(this.hideTile) {
				$("#ls-canvas").addClass("hidden");
			}
			if(this.gridDisplay) {
				$("#ls-canvas").addClass("hidden");
				$(".grid").removeClass("hidden");
			}

		} else {
			this.clear();
		}

		return false;
	},
	/* E */
	clear: function(){
		this.filter.find('input:not([type="checkbox"]), select:not(#range-max)').each($.proxy(function(idx,el){
			if($(el).attr('type') != 'hidden') {
				$(el).val("");
			}
		}, this));
		this.filter.find('input[type="checkbox"], input[type="radio"]').each($.proxy(function(idx,el){
			$(el).removeAttr("checked").parent().not(".swatch").removeClass("red");
			$(el).removeAttr("checked").parent().removeClass("active");
			$(el).removeAttr('disabled').css('cursor','pointer').parent().removeClass('disable').css('cursor','pointer');
			setCookie($(el).attr('value'), '', -1);
		}, this));
		this.filter.find('select').each($.proxy(function(idx,el){
			$(el).find('option').removeAttr('disabled').css('display','block');
			setCookie($(el).attr('value'), '', -1);
		}, this));
		
		if(this.hideTile) {
			$("#ls-canvas").removeClass("hidden");
		}
		if(this.gridDisplay) {
			$(".grid").addClass("hidden");
			$("#ls-canvas").removeClass("hidden");
		}

		this.applyFilter();

		this.log('clearing form filters!');
	}

});

lg.plugin('gridFilter', lg.Filter, '.filter');

function setCookie(cName, cValue, cDay){
  var expire = new Date();
  expire.setDate(expire.getDate() + cDay);
  cookies = cName + '=' + escape(cValue) + '; path=/ ';
  if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
  document.cookie = cookies;
}

function getCookie(cName) {
  cName = cName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cName);
  var cValue = '';
  if(start != -1){
	   start += cName.length;
	   var end = cookieData.indexOf(';', start);
	   if(end == -1)end = cookieData.length;
	   cValue = cookieData.substring(start, end);
  }
  return unescape(cValue);
}