/**
  @name jQuery
  @namespace
  @description John Resig's JavaScript library.
 */

/**
  @name $
  @namespace
  @description John Resig's JavaScript library.
 */


/*
 * SexyForms Javascript Library, © 2010 Mike Cavaliere
 *
 * http://cavaliere.org/sexyforms
 * http://cavaliere.org/contact
 *
 *
 *
 *
 *
 * Basic Usage
 * -----------
 *
 * These functions simply apply the classes in sexyforms.css to the targeted
 *  form elements. Each of these returns the jQuery object. Note that
 *  ALL ITEMS MUST HAVE HTML IDS. As per the html standard these should
 *  already be unique.
 *
 *
 * $('select').selectBox()
 *  - Creates a styled <ol> from a select box
 *
 * $('ol.radioGroup').radioGroup()
 *  - Styles a group of radio buttons.
 *  - Note that the target (.radioGroup) should have a structure like this:
 *
 *
 *    <ol id="ship-method-radio" class="form-rows ship-method radioGroup">
 *      <li>
 *        <label class="radio" for="ship-method-standard"><input type="radio" class="floating-chk" name="ship-method" value="1" id="ship-method-standard" checked="checked" /><span>Standard (8 business days) <strong>($9.95)</strong></span></label>
 *      </li>
 *      <li>
 *        <label class="radio" for="ship-method-3day"><input type="radio" class="floating-chk" name="ship-method" value="2" id="ship-method-3day" /><span>Third Business Day <strong>($24.95)</strong></span></label>
 *      </li>
 *      <li>
 *        <label class="radio" for="ship-method-nextday"><input type="radio" class="floating-chk" name="ship-method" value="3" id="ship-method-nextday" /><span>Next Business Day <strong>($49.95)</strong></span></label>
 *      </li>
 *    </ol>
 *
 * $('input[type=checkbox]').checkbox()
 *  - Styles a checkbox.
 *
 *
 *
 *
 * Instance objects.
 * -----------------
 *
 * To retrieve the SexyForms object associated with a form element, use $.fn.sfInstance().
 *
 * $('selector').sfInstance()
 * - Returns a list of SexyForms objects for the matched elements, if they exist. From here you can call
 *    SexyForms methods on these objects (see below).
 *
 *
 *
 * Event Callbacks.
 * ----------------
 *
 * To run custom Javascript code immediately before or after an element changes, use a the beforeElementChanged and afterElementChanged callbacks:
 *
 *               $('select').selectBox().sfInstance().afterElementChange(function() {
 *                   console.log('SELECT afterElementChange callback');
 *               });
 *               $('.radioGroup').radioGroup().sfInstance().afterElementChange(function() {
 *                   console.log('RADIO afterElementChange callback');
 *               });
 *               $('input[type=checkbox]').checkbox().sfInstance().afterElementChange(function() {
 *                   console.log('CHECKBOX afterElementChange callback');
 *               });
 *
 * Or the shorter form:
 *
 *               $('select').sfInstance().afterElementChange(function() {
 *                   console.log('SELECT afterElementChange callback');
 *               });
 *               $('.radioGroup').sfInstance().afterElementChange(function() {
 *                   console.log('RADIO afterElementChange callback');
 *               });
 *               $('input[type=checkbox]').sfInstance().afterElementChange(function() {
 *                   console.log('CHECKBOX afterElementChange callback');
 *               });
 *
 *
 *
 *
 * To reiterate, remember that these return jQuery objects (like most jQuery functions):
 *
 *   $('select').selectBox()
 *   $('.radioGroup').radioGroup()
 *   $('input[type=checkbox]').checkbox()
 *
 *
 * ...Whereas THESE return SexyForms instance objects:
 *
 *
 * $('input[type=checkbox]').sfInstance()
 * $('input[type=checkbox]').sfInstance().beforeElementChange(function() {    });
 * $('input[type=checkbox]').sfInstance().afterElementChange(function() {    });
 *
 *
 *
 *
 */

var SexyForms;

(function($) {

    /**
     * SexyForms global namespace. Contains utility classes and global configuration options.
     * @module SexyForms
     *
     */
    SexyForms = {};

    /**
     * Utility methods.
     *
     * @class Util
     * @namespace
     */
    SexyForms.Util = {
        replaced: function(el, on) {

            // Setter
            if (arguments.length > 1) {
                $(el).toggleClass('sf-replaced', on);
            }

            // Getter
            return $(el).hasClass('sf-replaced');
        },

        /**
         * Save this instance into the SexyForms global namespace
         *
         * @param widget
         */
        saveInstance: function(widget) {
            var $this = $(widget.element);
            if ($this.attr('id')) {
                SexyForms.Instances[$this.attr('id')] = widget;
            }
        },

        /**
         * Returh the associated SF widget instance
         *
         * @param el
         */
        getInstance: function(el) {
            var $this = $(el);
            if ($this.attr('id')) {
                return SexyForms.Instances[$this.attr('id')];
            }

            return null;
        },

        /**
         * Return true if this element corresponds to a tabbable SF widget element instance
         *
         * @param el
         */
        isSFTabbable: function(el) {
            var selectors = SexyForms.TabindexTargetSelectors;

            for (var i=0,l=selectors.length; i<l; i++) {
                if ($(el).is(selectors[i])) {
                    return true;
                }
            }

            return false;
        }
    };

    // Store references to SF objects
    SexyForms.Instances = {};

    SexyForms.TabindexTargetSelectors = [
        ':input[type=text]',
        '.select-box-container',
        'label.checkbox > span',
        'label.radio > span',
        '.btn,.btn-pill'
    ];




    /**
     * Widgets namespace. Contains constructors for all form elements.
     * @class Widgets
     * @namespace
     */
    SexyForms.Widgets = {
        /**
         * Parent class for form element classes
         *
         * @class Widget
         * @constructor
         */
        Widget: function() {

        },

        /**
         * Class for converting a &lt;select&gt; element to a functioning &lt;ol&gt;.
         * @class SelectBox
         * @constructor
         * @param {Object} element The DOM element to convert. Must be a &lt;select&gt;.
         */
        SelectBox: function(element)
        {
            this.element = element;

            // Only elements with ids
            if ($(element).attr('id').length < 1) { return; }

            // Only allow <SELECT> elements
            if (!$(element).is("select")) { return; }

            // Already replaced; return the elements
            if ($(element).hasClass("sf-select-box")) {
                return $(element);
            }

            var selectObj = this;

            $.extend(this, {
                element: element,
                selected: null,
                list: $('<ol class="select-box"></ol>'),
                container: $('<div class="select-box-container"></div>'),
                bg: $('<div class="select-box-bg"><span></span></div>'),
                _eventCache: {}
            });

            SexyForms.Util.saveInstance(this);

            $(element).addClass("sf-select-box");

            this.doReplace();

            // Copy over the ID if there is one (prefixed)
            var id = $(element).attr('id');

            if (id)
            {
                this.container.attr('id', 'select-box-container-' + id)
            }

            this.items = this.list.children("li");

            // Ensure something is selected
            if (!this.selected)
            {
                $(this.items[0]).addClass("selected");
                this.selected = this.items[0];
            }

            // Monitor underlying change to actual select element
            $(element).change(function(e){
            	selectObj.setSelected(selectObj.element.selectedIndex);
            });

            this.update();

            $(this.container).click(function(e) {
                var t = $(e.target);

                // Fire pre-event callbacks

                if (t.is('span')) { t = t.parent(); }

                //if (t.is('img.select-box-btn')) { t = t.parent().find('.select-box-bg'); }
                if (t.is('div.select-box-btn')) { t = t.parent().find('.select-box-bg'); }

                if (t.is('.select-box-bg')) {
                    selectObj.toggle();

                    return;
                }
                if (t.is('li')) {
                    selectObj.setSelected(t[0]);
                    selectObj.close();
                }

                // Fire post-event callbacks

            });

            function closeFunc(e)
            {
                var targ = $.relatedTarget(e);

                if (!targ.isChildOf(selectObj.container))
                {
                    selectObj.close();
                }
            }

            // Hide on mouseout
            this.container.mouseout(function(e) {
                var target = $(e.target);
                selectObj.timeout = setTimeout(function() {
                    closeFunc(e);
                }, 1000);

                if (target.is('li')) {
                    target.removeClass('hover');
                }
            });

            this.container.mouseover(function(e) {
                var target = $(e.target);
                clearTimeout(selectObj.timeout);

                if (target.is('li')) {
                    target.addClass('hover');
                }
            });

            // Hide initially
            selectObj.close();

            return this;
        },

        TextBox: function(element)
        {
            // Only allow <INPUT TYPE="text"> elements
            if (!$(element).is("input[type=text]")) { return; }

            var o = this;

            $.extend(this, {
                element: element
            });

            $(this.element).addClass('text-box');
        },

        /**
         * Uses a swapping technique to overlay a file input with a text box
         *  and button image
         *
         * @class FileInput
         * @constructor
         */
        FileInput: function(element)
        {
            var decoy = $(element).parent().prev();
            // copy the value into the real input field
            $(element).change(function()
            {
                decoy.val($(element).val());
            });
        },

          /**
           * Abstract constructor for elements that have on/off states
           * @param {Object} element
           */
          Toggleable: function(element)
          {
            this.element = element;
            var $element = $(this.element);

            // Only elements with ids
            if ($(element).attr('id').length < 1) { return; }

            SexyForms.Util.saveInstance(this);

            $.extend(this, {
              label:   $element.parent(),
              checked: $element.attr("checked"),
              klass:   this.checked,

              // radio mode: only 0 or 1 item can be selected
              // checkbox mode: any number can be selected
              mode:     ( $element.is("input[type=checkbox]") ? "checkbox" : $element.is("input[type=radio]") ? "radio" : null),

              _eventCache: {}
            });

            $.extend(this, {
              onClass: this.mode + "-on",
              offClass: this.mode + "-off"
            });

            // Return the appropriate css class name
            this.cssClass = function(on) { if (on) { return this.onClass; } return this.offClass; };

//                // Add spans for AT design purposes
//                this.label.injectSpans();

            return this;
          },

          // RadioButton inherits from toggleable
          RadioButton: function(element)
          {
            var group = (arguments.length > 1 ? arguments[1] : null);

            var tog = new SexyForms.Widgets.Toggleable(element);

                // Override the one for toggleable
                tog.set = function(state){
                    // Check/uncheck it
                    this.check(state);

                    // Swap classnames
                    this.setClass(state);
                };

            // Save reference to the containing RadioButtonGroup
            if (group) {
                this.group = group;
            };

            return tog;
          },

            RadioGroup: function(element)
            {
                var group    = this,
                    $element = $(element);

                $.extend(this, {
                  inputs : [],
                  current: null,
                  element: element,
                  _eventCache: {}
                });

                SexyForms.Util.saveInstance(this);

                // Save to element for global access
                $element
                  .find("input[type=radio]").each(function()
                  {
                    var radio = new SexyForms.Widgets.RadioButton($(this), group);

                    // Set initial state
                    if (radio.checked) { group.current = radio; }
                    group.inputs.push(radio);
                    radio.set(radio.checked);

                    // Add events
                    radio.label
                            .click(function(e) {
                                e.preventDefault();
                                e.stopPropagation();

                                group.select(radio);

                                return false;
                            })
                });
            }

    };

    /**
     * Widget protype; these methods propogate to all widget instances
     */
    SexyForms.Widgets.Widget.prototype = {

        beforeElementChange: function(f){
            this.bindEvent('beforeElementChange', f);
        },

        afterElementChange: function(f){
            this.bindEvent('afterElementChange', f);
        },

         /**
          * Execute code bound to a custom event
          * @param {Object} name The event to trigger
          */
         triggerEvent: function(name) {
             if (this._eventCache[name]) {
                 for (var i=0,l=this._eventCache[name].length; i<l; i++) {
                     this._eventCache[name][i].call(this);
                 }
             }
         },

         /**
          * Bind code to a custom event
          * @param {Object} name The event to trigger
          */
         bindEvent: function(name, f) {
             if (!this._eventCache[name])
                this._eventCache[name] = [];

             this._eventCache[name].push(f);
         }
    };


    /*
     * Widget object prototypes
     */
    SexyForms.Widgets.SelectBox.prototype = {

        /**
         * Hides the &lt;select&gt; element and inserts an &lt;ol&gt;.
         * @method doReplace
         */
        doReplace: function()
        {
            var selectBoxObj	= this,
            	$element		= $(this.element);

            $element        // Create <li> elements from <option> elements

            .children("option").each(function()
            {
                var li = $("<li><span>" + $(this).text() + "</span></li>");

                if ($(this).attr("selected"))
                {
                    selectBoxObj.selected = li;
                    li.addClass("selected");
                }

                selectBoxObj.list.append(li);
            })
            .end()

            .after(selectBoxObj.container)        // Hide the actual <SELECT>

            .css({
                position: "absolute",
                left: "-100000px"
            });

            // Insert the elements
            this.container
                .append(this.bg)
                .append(this.list)
                //.append('<img class="select-box-btn" src="{{ site.docbase }}/assets/images/buttons/select-box-btn.png" alt="" /&gt;');
                .append('<div class="select-box-btn"></div>');

            // make replacement tabbable
            $element.bind('focus blur',function(e){
            	if (e.type == 'focus'){
            		selectBoxObj.open();
            	} else {
            		selectBoxObj.close();
            	}
            });

        },

        /**
         * Select an item in the list. Focuses the list on the selected item,
         * and updates the hidden &lt;select&gt; element with the same value.
         * @method setSelected
         * @param {Object} item
         */
        setSelected: function(item)
        {
            this.triggerEvent('beforeElementChange');

            if (typeof item === "number") {
                item = this.list.children("li").eq(item);
            }

            if (this.selected)
            {
                this.selected.removeClass("selected");
            }

            this.selected = $(item);
            this.selected.addClass("selected");
            this.update();

            // Set value in the hidden <SELECT>
            this.element.selectedIndex = this.items.index(item);
            $(this.element).change();

            this.triggerEvent('afterElementChange');
        },

        /**
         * Jump to a selected letter in the list.
         *
         * @param letter Letter to jump to
         * @param haltOnFirst True to stop on the first matched letter after multiple presses
         */
        toLetter: function(letter) {

            var selectObj = this;

            /*
             * Normalize the input
             */
            if (typeof letter === 'number') {
                letter = String.fromCharCode(letter);
            }

            letter = letter.toUpperCase();

            /*
             * Get list of items starting with this letter
             */
            var items = selectObj.items.filter(function() {
                var el = $(this),
                    text = el.text(),
                    globalIndex = selectObj.items.index(this),
                    val = $(selectObj.element).find('option').eq(globalIndex).val();

                /*
                 * Ignore blank option
                 */
                if (val === "") {
                    return false;
                }


                return (new RegExp("^["+letter.toLowerCase()+letter.toUpperCase()+"]").test(text));
            });

            /*
             * No items with this letter; do nothing
             */
            if (items.length === 0) {
                return;
            }

            var selectedItem = items,
                selectedItemIndex,
                firstItem = items,
                lastItem = items;

            firstItem = firstItem.filter(':first');
            lastItem  = lastItem.filter(':last');

            function getSelected() {
                selectedItem = selectedItem.filter('.selected');
                selectedItemIndex = items.index(selectedItem);
            }

            getSelected();

            items.each(function() {
                var el = $(this);

                /*
                 * If nothing starting with this letter is selected, or
                 *  if this string comes after the selected string,
                  *  then select this one
                 */
                if (!selectedItem.length || items.index(this) > selectedItemIndex) {
                    selectObj.setSelected(this);
                    getSelected();
                    return false;
                }

                /*
                 * if this string is last in the group,
                 *  and is selected, jump back to the first.
                 */
                if (el.equals(lastItem) && el.is('.selected')) {
                    selectObj.setSelected(firstItem[0]);
                    return false;
                }

            });
        },


        /**
         * Update text for the closed state
         */
        update: function()
        {
            this.bg.children().html(this.selected.text());
        },

        /**
         * Open the option list.
         * @method open
         */
        open: function()
        {
            var selectObj = this;

            selectObj.list.show();
            selectObj.container.addClass('select-box-container-open');
        },

        close: function()
        {
            var selectObj = this;

            selectObj.list.hide();
            selectObj.container.removeClass('select-box-container-open');
        },

        toggle: function()
        {
            var selectObj = this;

            if (selectObj.container.hasClass('select-box-container-open')) {
                selectObj.close();
                return;
            }

            selectObj.open();

            //this.list.toggle();
        }
    };

    // SelectBox inherits Widget methods
    $.extend(true, SexyForms.Widgets.SelectBox.prototype, SexyForms.Widgets.Widget.prototype);

    $.extend(SexyForms.Widgets.Toggleable.prototype, {

     check: function(checked) {
       this.checked = checked;
       if (checked){
    	   this.element.attr('checked', 'checked');
       } else {
    	   this.element.removeAttr('checked');
       }
     },

     uncheck: function() { this.check(false); },

     enable: function() {
         var tog = this, f = function(e){
        	 if (e.target.nodeName.toUpperCase() != 'INPUT'){
        		 e.preventDefault();
                 e.stopPropagation();
                 tog.toggle();
             }
        	 //e.preventDefault();
             //e.stopPropagation();

             //tog.toggle();
         };
         this.label.click(f)
                // Hack to prevent propagation of click event
                //  onto <input>
                //.find('input').unbind('click');
     },

     disable: function() {
         this.label
            .unbind('click')
            .click(function(e){
                e.preventDefault();
                e.stopPropagation();
            });
     },

     setClass: function(state)
     {
        this.label.removeClass(this.cssClass(!state));
        this.label.addClass(this.cssClass(state));
     },

      set: function(state)
      {
        this.triggerEvent('beforeElementChange');

        // Check/uncheck it
        this.check(state);

        // Swap classnames
        this.setClass(state);

        this.triggerEvent('afterElementChange');

      },
      toggle: function()
      {
        // New state of component
        this.set(!this.element.attr("checked"));
      },

       reset: function() {
           this.set(false);
       },

        keyup: function(e) {
            switch (e.keyCode) {
                /*
                 * Space bar
                 */
                case 32:
                this.toggle();
                this.element.click();
                break;
            }
        }
   });

   // Toggleable inherits Widget methods
   $.extend(true, SexyForms.Widgets.Toggleable.prototype, SexyForms.Widgets.Widget.prototype);

   // RadioButton inherits from toggleable
   SexyForms.Widgets.RadioButton.prototype = $.extend(true, SexyForms.Widgets.Toggleable.prototype);

  SexyForms.Widgets.RadioGroup.prototype = {
    select: function(radio)
    {
      this.triggerEvent('beforeElementChange');

      this.current = radio;

      for (var i=0,l=this.inputs.length; i<l; i++)
      {
        if (this.inputs[i].element[0] == this.current.element[0])
        {
          this.inputs[i].set(true);
        }
        else
        {
          this.inputs[i].setClass(false);
        }
      }

      this.triggerEvent('afterElementChange');
    },

        keyup: function(e) {


            AT.Util.log('RadioGroup.keyup');

            switch (e.keyCode) {
                /*
                 * Space bar
                 */
                case 32:
                    var radio = SexyForms.Instances[$(e.target).prev().attr('id')];
                    this.select(radio);
                break;

            }
        }
  };

    // RadioGroup inherits Widget methods
    $.extend(true, SexyForms.Widgets.RadioGroup.prototype, SexyForms.Widgets.Widget.prototype);

    $.fn.extend({
      /**
       * Return the associated SexyForms object for this element, if there is one.
       */
      sfInstance: function() {
        var arr = [];

        this.each(function() {
          var inst = SexyForms.Util.getInstance(this);

          if (inst != null) arr.push(inst);
        });

        return $(arr);
      },

      // Styled <select> (converted to <ol>)
      selectBox: function()
      {
        return this.each(function() {

          // Prevent double replacement
          if (SexyForms.Util.replaced(this) === true) { return; }

          new SexyForms.Widgets.SelectBox(this);

          SexyForms.Util.replaced(this, true);
        });
      },

      // Styled <input type="text>
      textBox: function()
      {
        return this.each(function() {
          // Prevent double replacement
          if (SexyForms.Util.replaced(this) === true) { return; }

          new SexyForms.Widgets.TextBox(this);

          SexyForms.Util.replaced(this, true);
        });
      },

      // Styled <input type="file" />
      fileInput: function() {
        return this.each(function() {

            // Prevent double replacement
            if (SexyForms.Util.replaced(this) === true) { return; }

            new SexyForms.Widgets.FileInput();

            SexyForms.Util.replaced(this, true);
        });
      },

      // Block element with class="radio-group",
      //  containing one or more <input type="radio" />
      radioGroup: function() {
         return this.each(function() {

           // Prevent double replacement
           if (SexyForms.Util.replaced(this) === true) { return; }

           new SexyForms.Widgets.RadioGroup(this);

           SexyForms.Util.replaced(this, true);
         });
      },

        // Abstract element with on/off functionality
      toggleable: function()
      {
        return this.each(function() {

          // Prevent double replacement
          if (SexyForms.Util.replaced(this) === true) { return; }

          var $this = $(this),
              tog   = new SexyForms.Widgets.Toggleable($this),
              $element = $(tog.element);

          tog.set(tog.checked);
          tog.enable();

          // Monitor underlying change, focus and blur of actual checkbox element
          $element.bind('change focus blur', function(e){
        	var $label = $(tog.label);
        	if (e.type == 'change'){
          	  	tog.set($element.attr('checked'));
          	}
        	else if (e.type == 'focus') {
          		$label.addClass('active');
          	}
        	else {
          		$label.removeClass('active');
          	}
          });

          SexyForms.Util.replaced(this, true);
        });
      },

      // Return true if el is a child of this, or the same element
      isChildOf: function(el)
      {
       var target = this[0];

       if (target === el) {
           return true;
       }

       return $(el).find('*')
                   .filter(function()
                   {
                       return this === target;
                   })
                   .length > 0;
      },

      /**
       * Trigger custom events
       */
      beforeElementChange: function(f) {
          /*
           * NOTE: we're iterating through SF objects here, NOT a jQuery element array!
           */
          return this.each(function() {
              this.beforeElementChange(f);
          });
      },

      /**
       * Trigger custom events
       */
      afterElementChange: function(f) {
          var widget = this;
          /*
           * NOTE: we're iterating through SF objects here, NOT a jQuery element array!
           */
          return this.each(function() {
              this.afterElementChange(f);
          });
      }
    });

    // jQuery aliases for simple usage
    $.fn.checkbox = $.fn.toggleable; // Generic toggleable === checkbox

    /**
     * Return the related target for a mouse event
     * @param {Object} e
     */
    $.relatedTarget = function(e)
    {
      var relatedTarget;

      if (e.type != 'mouseover' && e.type != 'mouseout')
      {
          return $;
      }

      // Which element we're going to or coming from
      if (e.relatedTarget)
      {
          relatedTarget = e.relatedTarget;
      }
      else
      {
          // IE versions of relatedTarget
          if (e.type == 'mouseout')
          {
              relatedTarget = e.toElement;
          }
          else
          {
              relatedTarget = e.fromElement;
          }
      }

      return $(relatedTarget);
    };

})(jQuery);
