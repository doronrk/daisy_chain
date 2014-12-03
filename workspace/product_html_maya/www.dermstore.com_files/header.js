//TypeAhead function for search autocomplete and suggestion engine
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
var matches, substrRegex;
 
	// an array that will be populated with substring matches
	matches = [];
 
	// regex used to determine if a string contains the substring `q`
	substrRegex = new RegExp(q, 'i');
 
	// iterate through the pool of strings and for any string that
	// contains the substring `q`, add it to the `matches` array
	$.each(strs, function(i, str) {
	  if (substrRegex.test(str)) {
		// the typeahead jQuery plugin expects suggestions to a
		// JavaScript object, refer to typeahead docs for more info
		matches.push({ value: str });
	  }
	}); 
	cb(matches);
  };
};

var brands = popUpBrands;
var type = popUpTypes;
var condition = popUpConditions;
var ingredients = popUpIngredients;


$(function() {
  var learners;
  learners = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: "/tools/suggest.php?term=%QUERY&output_map=true",
    limit: 15
  });
  learners.initialize();
  return $("#search_box.searchbox").typeahead({
    minLength: 3,
    hint: false,
    highlight: true
  }, {
    name: "learners",
    displayKey: "value",
    source: learners.ttAdapter()
   
  }).on('typeahead:selected', function(e){
    e.target.form.submit();
  });
});

 
  
$(document).ready(function() {
	//top search box 
	/*$('#search_box.searchbox').typeahead({
		  hint: false,
		  highlight: false,
		  minLength: 0
		},
		{
		  name: 'states',
		  displayKey: 'value',
		  source: substringMatcher(brands)
		}
	);*/

	//uncomment to debug typeahead dropdown css
	//$(".searchbox").eq(0).val("der").trigger("input");
	//$(".searchbox").eq(0).val("derm");
	
	$('#headerSearch input#search_box').on('focus', function() {
		$('.input-group').addClass('hovered');
	}).on('blur', function() { 
		$('.input-group').removeClass('hovered');
	});
	
	$('#footer-top input.form-control').on('focus', function() {
		$(this).parent().addClass('hovered');
	}).on('blur', function() { 
		$(this).parent().removeClass('hovered');
	});
	
	$('#search_box').focus(function() {
		$(this).val('');
	});
	
	$('.submitFooterNewsletter').click(function() {
		$('form[name="email_signup"]').submit();
	});
	
	$('.input-group .input-group-addon').click(function() {
		$('form[name="searchsite"]').submit();
	});
	
	/*$('.brandLink').hover(function() {
		var $this = $(this);
		setTimeout(function() {
			$this.find('.flyouts').show();
		}, 500);
	}, function() {
		$(this).find('.flyouts').hide();
	});*/
	
	/*$('.brandLink').hover(function() {
		$(this).find('.flyouts').show();
	}, function() {
		$(this).find('.flyouts').hide();
	});*/
	
	//dropdown code
	$(function()
{
    var $dropdowns = $('li.flyoutLInk'); // Specifying the element is faster for older browsers

    /**
     * Mouse events
     *
     *@description Mimic hoverIntent plugin by waiting for the mouse to 'settle' within the target before triggering
     */
    $dropdowns
        .on('mouseover', function() // Mouseenter (used with .hover()) does not trigger when user enters from outside document window
        {
            var $this = $(this);

            if ($this.prop('hoverTimeout'))
            {
                $this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
            }

            $this.prop('hoverIntent', setTimeout(function()
            {
                $this.addClass('hover');
            }, 250));
        })
        .on('mouseleave', function()
        {
            var $this = $(this);

            if ($this.prop('hoverIntent'))
            {
                $this.prop('hoverIntent', clearTimeout($this.prop('hoverIntent')));
            }

            $this.prop('hoverTimeout', setTimeout(function()
            {
                $this.removeClass('hover');
            }, 250));
        });

    /**
     * Touch events
     *
     * @description Support click to open if we're dealing with a touchscreen
     */
    if ('ontouchstart' in document.documentElement)
    {
        $dropdowns.each(function()
        {
            var $this = $(this);

            this.addEventListener('touchstart', function(e)
            {
                if (e.touches.length === 1)
                {
                    // Prevent touch events within dropdown bubbling down to document
                    e.stopPropagation();

                    // Toggle hover
                    if (!$this.hasClass('hover'))
                    {
                        // Prevent link on first touch
                        if (e.target === this || e.target.parentNode === this)
                        {
                            e.preventDefault();
                        }

                        // Hide other open dropdowns
                        $dropdowns.removeClass('hover');
                        $this.addClass('hover');

                        // Hide dropdown on touch outside
                        document.addEventListener('touchstart', closeDropdown = function(e)
                        {
                            e.stopPropagation();

                            $this.removeClass('hover');
                            document.removeEventListener('touchstart', closeDropdown);
                        });
                    }
                }
            }, false);
        });
    }
    
});

});