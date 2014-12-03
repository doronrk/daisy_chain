/* CUSTOM DROPDOWN */
(function($) { // Hide scope, no $ conflict

/* DROPDOWN manager. */
function DropDown() {
	this.id = "";
	this.callback = null;
	this.dropdown = null;
	this._defaults = {
		id : "",
		collapsed : 'close'
	}
	this.init = function(id) {
		var obj = this;
		obj.id.each(function() {
			var instance = this;
			var TOUCH_DEVICE = (typeof document.ontouchstart != "undefined") ? true : false;
			$(instance).removeClass('select');
			$(instance).addClass('select');
			$.each($(instance).children('option'), function() {
				$(this).removeClass('option');
				$(this).addClass('option');
			});
			if(!TOUCH_DEVICE) {					
				var outside;
				
				if($(instance).parent('div').hasClass('dropdown')) {
								
					outside = $(instance).parent('div.dropdown');
					
				} else { 
					outside = $('<div />', {
						'class':'dropdown'
					});
					
					$(instance).wrap(outside);
				}
				
				$(instance).hide();
				
				outside.children('div.select').remove();
				
				var wrapper = $('<div />', {
					'class':'select',
					'data-collapse': obj._defaults.collapsed,
					'data-select' : $(this).attr('name'),
					'id' : 'select'+$(this).attr('name')
				});
				
				$(instance).parent('.dropdown').append(wrapper);
				wrapper.empty();
				
				var title = $('<span />', {
					'class':'title'
				}).appendTo(wrapper);
				
				var content = $('<span />', {
					'class':'content'
				}).appendTo(wrapper);
				
				$.each($(instance).children('option'), function() {
					var option = $('<a />', {
						'data-value': $(this).val(),
						'href' : 'javascript:void(0);',
						'class' : 'option'
					}).html($(this).html()).appendTo(content);
					option.css('display', 'block');
					if($(this).attr('selected') != null) {
						option.addClass('selected');	
					}
					option.unbind('click');
					option.bind('click', function() {obj.update($(wrapper), option)});
				});
								
				$(wrapper).unbind('click');
				$(wrapper).bind('click', function(){obj.toggleSelect($(this))});
				




				$(instance).parent('.dropdown').collapse();
				
				if(obj._defaults.collapsed == 'open') {
					obj.openSelect($(wrapper));	
				} else {
					obj.closeSelect($(wrapper));	
				}
				obj.update($(wrapper));
			}
			if(typeof this.callback == "function") this.callback(); else {};
		});
	},
	this.toggleSelect = function(obj) {
		if(obj.attr('data-dropdown') == 'open') {
			this.closeSelects();
		} else {
			this.closeSelects();
			this.openSelect(obj);
		}
	},
	this.closeSelect = function(obj) {




		obj.css('z-index', 1);
		obj.attr('data-dropdown', 'close');
		obj.collapse('close');
	},
	this.openSelect = function(obj) {

		obj.css('z-index', 2);
		obj.attr('data-dropdown', 'open');
		obj.collapse('open');
	},
	this.closeSelects = function() {		
		var obj = this;	
		$.each($('.dropdown').children('.select'), function() {
			obj.closeSelect($(this));

		});		
	},












	this.update = function(obj, set) {
		var selected = null;
		if(set != undefined) {
			selected = set;	
		} else if(obj.children('.content').children('a.selected').html() != null) {
			selected = obj.children('.content').children('a.selected')
		} else {
			selected = obj.children('.content').children('.option').first();	
		}
		
		obj.children('.title').first().html(selected.html());
		obj.attr('data-value', selected.attr('data-value'));
		
		obj.parent('.dropdown').children('select').val(selected.attr('data-value'));
		
		if(set != undefined) {
			obj.parent('.dropdown').children('select').change();
		}


	}
}
$.fn.dropdown = function(options, callback) {
	$.dropdown = new DropDown(); // readmore instance
	$.dropdown.id = $(this);
	$.dropdown.callback = callback;
	for(prop in options){
		$.dropdown._defaults[prop] = options[prop];
	}
	if($(this).html() != null) {
		$.dropdown.init();
	}
	return $.dropdown;
};
})(jQuery);
/* END CUSTOM DROPDOWN */