/**
 * DropKick
 * 
 * Highly customizable <select> lists https://github.com/JamieLottering/DropKick
 * 
 * &copy; 2011 Jamie Lottering <http://github.com/JamieLottering>
 * <http://twitter.com/JamieLottering>
 * 
 */
( function($, window, document) {

	var
	// Public methods exposed to $.fn.dropkick()
	methods = {},

	// Cache every <select> element that gets dropkicked
	lists = [],

	// Convenience keys for keyboard navigation
	keyMap = {
		'left' : 37,
		'up' : 38,
		'right' : 39,
		'down' : 40,
		'enter' : 13,
		'escape' : 27
	},

	// HTML template for the dropdowns
	dropdownTemplate = [ '<div class="dk_container" id="dk_container_{{ id }}" tabindex="{{ tabindex }}">', '<a class="dk_toggle">',
			'<span class="dk_label">{{ label }}</span>', '</a>', '<div class="dk_options">', '<ul class="dk_options_inner">', '</ul>', '</div>',
			'</div>' ].join(''),

	// HTML template for dropdown options
	optionTemplate = '<li class="{{ current }}"><a data-dk-dropdown-value="{{ value }}">{{ text }}</a></li>',

	// Some nice default values
	defaults = {
		startSpeed : 0, // I recommend a high value here, I feel it makes the
						// changes less noticeable to the user
		theme : false,
		change : false
	},

	// Make sure we only bind keydown on the document once
	keysBound = false;

	// Called by using $('foo').dropkick();
	methods.init = function(settings) {
		settings = $.extend( {}, defaults, settings);

		return this.each( function() {
			var
			// The current <select> element
				$select = $(this),

				// Store a reference to the originally selected <option> element
				$original = $select.find(':selected').first(),

				// Save all of the <option> elements
				$options = $select.find('option:not(.disabled)'),

				// We store lots of great stuff using jQuery data
				data = $select.data('dropkick') || {},

				// This gets applied to the 'dk_container' element
				id = $select.attr('id') || $select.attr('name'),
				
				// Check if we have a tabindex set
				tabindex = ($select.attr('tabindex') != null && $select.attr('tabindex') != undefined) ? $select.attr('tabindex') : '',

				// The completed dk_container element
				$dk = false,

				theme;
				
				// Dont do anything if we've already setup dropkick on this
				// element
				if (data.id) {
					return $select;
				} else {
					data.settings = settings;
					data.tabindex = tabindex;
					data.id = id;
					data.$original = $original;
					data.$select = $select;
					data.value = _notBlank($select.val()) || _notBlank($original.attr('value'));
					data.label = $original.text();
					data.options = $options;
				}
				
				// Build the dropdown HTML
				$dk = _build(dropdownTemplate, data);
				
				$select.wrap('<div class="dropKickWrapper clearfix">').before($dk);

				//Hide the custom drop down if the select element isn't displayed
				//Also, hide the select from view, unless isTouch
				if($select.css('display')=='none') $dk.addClass('hidden');
				/*if(!THUtil.isTouch())*/ $select.addClass('hidden');
				
				// Save the current theme
				theme = settings.theme ? settings.theme : 'default';
				$dk.addClass('dk_theme_' + theme);
				data.theme = theme;

				// Save the updated $dk reference into our data object
				data.$dk = $dk;

				// Save the dropkick data onto the <select> element
				$select.data('dropkick', data);

				// Do the same for the dropdown, but add a few helpers
				$dk.data('dropkick', data);

				lists[lists.length] = $select;
				
				var isIE=navigator.userAgent.match(/msie/)!=null;
				
				// Focus events
				$dk.bind('focus.dropkick', function(e)
				{
					$dk.addClass('dk_focus');
				}).bind('blur.dropkick', function (e)
			    {
	                // Prevent IE from closing the menu on focus lost,
					// this makes the menu close all the time when using the scroll bar
	                if (!isIE) $dk.removeClass('dk_open');
	                $dk.removeClass('dk_focus');
	            });

				$select.change( function() {
					var val = $select.val();
					_setCurrent($dk.find('li a[data-dk-dropdown-value="' + val + '"]').parent(), $dk);
					$dk.find('.dk_label').text($select.children('option:selected').text());
				});
			});
	};

	// Allows dynamic theme changes
	methods.theme = function(newTheme) {
		var $select = $(this), list = $select.data('dropkick'), $dk = list.$dk, oldtheme = 'dk_theme_' + list.theme;

		$dk.removeClass(oldtheme).addClass('dk_theme_' + newTheme);

		list.theme = newTheme;
	};

	// Reset all <selects and dropdowns in our lists array
	methods.reset = function() {
		for ( var i = 0, l = lists.length; i < l; i++) {
			var listData = lists[i].data('dropkick'), $dk = listData.$dk, $current = $dk.find('li').first();

			$dk.find('.dk_label').text(listData.label);
			$dk.find('.dk_options_inner').animate( {
				scrollTop : 0
			}, 0);

			_setCurrent($current, $dk);
			_updateFields($current, $dk, true);
		}
	};
	
	methods.sync = function ()
	{
		var $select = this;
        var data = $select.data('dropkick');
        if(data)
        {
        	data.$original = $select.find(':selected').first();
    		data.options = $select.find('option:not(.disabled)');
        	_updateOptions(data.$dk,data);
        	$select.change();
        }
    };

	// Expose the plugin
	$.fn.dropkick = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
	};

	// private
	function _handleKeyBoardNav(e, $dk) {
		var code = e.keyCode, data = $dk.data('dropkick'), options = $dk.find('.dk_options'), open = $dk.hasClass('dk_open'), current = $dk
				.find('.dk_option_current'), first = options.find('li').first(), last = options.find('li').last(), next, prev;

		switch (code) {
		case keyMap.enter:
			if (open) _closeDropdown($dk);
			else _openDropdown($dk);
			
			e.preventDefault();
		break;
		
		case keyMap.escape:
			if (open) _closeDropdown($dk);
			
			e.preventDefault();
		break;

		case keyMap.up:
			prev = current.prev('li');
			if (open) {
				if (prev.length) {
					_setCurrent(prev, $dk);
				} else {
					_setCurrent(last, $dk);
				}
				_updateFields($dk.find('.dk_option_current a'), $dk);
			} else {
				_openDropdown($dk);
			}
			e.preventDefault();
			break;

		case keyMap.down:
			if (open) {
				next = current.next('li').first();
				if (next.length) {
					_setCurrent(next, $dk);
				} else {
					_setCurrent(first, $dk);
				}
				_updateFields($dk.find('.dk_option_current a'), $dk);
			} else {
				_openDropdown($dk);
			}
			e.preventDefault();
			break;
		}
	}

	// Update the <select> value, and the dropdown label
	function _updateFields(option, $dk, reset) {
		var value, label, data;

		value = option.attr('data-dk-dropdown-value');
		label = option.text();
		data = $dk.data('dropkick');

		$select = data.$select;
		$select.val(value);

		$dk.find('.dk_label').text(label);

		reset = reset || false;

		if (!reset) $select.change();
	}

	// Set the currently selected option
	function _setCurrent($current, $dk) {
		$dk.find('.dk_option_current').removeClass('dk_option_current');
		$current.addClass('dk_option_current');

		_setScrollPos($dk, $current);
	}

	function _setScrollPos($dk, anchor) {
		var height = anchor.prevAll('li').outerHeight() * anchor.prevAll('li').length;
		$dk.find('.dk_options_inner').animate( {
			scrollTop : height + 'px'
		}, 0);
	}

	// Close a dropdown
	function _closeDropdown($dk)
	{
		$dk.removeClass('dk_open');
	}

	// Open a dropdown
	function _openDropdown($dk)
	{
		$dk.addClass('dk_open');

		var $options = $dk.find('.dk_options');
		var $window=$(window);
		$options.css({top:'auto'});
		if ($options.offset().top - $window.scrollTop() + $options.outerHeight(true) <= $window.height()) $options.css({top:6});
		else $options.css({top:-$options.outerHeight(true)-$dk.height()-1});
	}

	/**
	 * Turn the dropdownTemplate into a jQuery object and fill in the variables.
	 */
	function _build(tpl, data) {
		var template = tpl.replace('{{ id }}', data.id).replace('{{ label }}', data.label).replace('{{ tabindex }}', data.tabindex);
		var $dk = $(template);
		
		_updateOptions($dk,data);
		
		// Handle click events on the dropdown toggler
		$dk.find('.dk_toggle').click(function(e)
		{
			var $container=$(this).parents('.dk_container');
			var $dk=$container.first();
			if($container.hasClass('dk_open')) _closeDropdown($dk);
			else
			{
				_closeOtherDropdowns($dk);
				_openDropdown($dk);
				
				e.stopImmediatePropagation();
				$(document).unbind('click.dropkick').one('click.dropkick',function()
				{
					_closeDropdown($dk);
				});
			}
		});

		return $dk;
	}
	
	function _closeOtherDropdowns($dk)
	{
		_closeDropdown($('.dk_open').not($dk));
	}
	
	function _notBlank(text)
	{
		return ($.trim(text).length > 0) ? text : false;
	}
	
	function _updateOptions($dk,data)
	{
		$dk.find('.dk_options_inner').empty().html(_buildOptions(data));

		// Handle click events on individual dropdown options
		$dk.find('.dk_options a').click(function(e)
		{
			e.stopImmediatePropagation();
			
			var $option = $(this), $dk = $option.parents('.dk_container').first(), data = $dk.data('dropkick');

			_closeDropdown($dk);
			_updateFields($option, $dk);
			_setCurrent($option.parent(), $dk);
		});
		
		if(THUtil.isTouch()) _uppercaseOptions(data.$select);
	}
	
	function _buildOptions(data)
	{
		if (data.options && data.options.length)
		{
			var options=[];
			for ( var i = 0, l = data.options.length; i < l; i++) {
				var $option = $(data.options[i]), current = 'dk_option_current';
				
				options[options.length] = optionTemplate.replace('{{ value }}', $option.val()).replace('{{ current }}',
						(_notBlank($option.val()) === data.value) ? current : '').replace('{{ text }}', $option.text());
			}
		}
		
		return options.join('');
	}
	
	function _uppercaseOptions($select)
	{
		$select.children('option').each(function()
    	{
			var $option=$(this);
			$option.text($option.text().toUpperCase());
		});
	}

	$( function() {

		// Setup keyboard nav
		$(document).bind('keydown.dk_nav', function(e) {
			var
			// Look for an open dropdown...
				$open = $('.dk_container.dk_open'),

				// Look for a focused dropdown
				$focused = $('.dk_container.dk_focus'),

				// Will be either $open, $focused, or null
				$dk = null;

				// If we have an open dropdown, key events should get sent to
				// that one
				if ($open.length) {
					$dk = $open;
				} else if ($focused.length && !$open.length) {
					// But if we have no open dropdowns, use the focused
					// dropdown instead
					$dk = $focused;
				}

				if ($dk) {
					_handleKeyBoardNav(e, $dk);
				}
			});
	});
})(jQuery, window, document);