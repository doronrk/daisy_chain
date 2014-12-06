
//############################ jquery.main ################################

jQuery(function () {
	initAutoComplete();
})
function initOpenClose() {
	jQuery('div.slide-block').OpenClose({
		activeClass: 'active',
		opener: 'a.open-close',
		slider: 'div.block',
		effect: 'slide',
		animSpeed: 500
	});
}

// open-close plugin
jQuery.fn.OpenClose = function (_options) {
	// default options
	var _options = jQuery.extend({
		activeClass: 'active',
		opener: '.opener',
		slider: '.slide',
		animSpeed: 400,
		animStart: false,
		animEnd: false,
		effect: 'fade',
		event: 'click'
	}, _options);

	return this.each(function () {
		// options
		var _holder = jQuery(this);
		var _slideSpeed = _options.animSpeed;
		var _activeClass = _options.activeClass;
		var _opener = jQuery(_options.opener, _holder);
		var _slider = jQuery(_options.slider, _holder);
		var _animStart = _options.animStart;
		var _animEnd = _options.animEnd;
		var _effect = _options.effect;
		var _event = _options.event;
		if (_slider.length) {
			_opener.bind(_event, function () {
				if (!_slider.is(':animated')) {
					if (typeof _animStart === 'function') _animStart();
					if (_holder.hasClass(_activeClass)) {
						_slider[_effect == 'fade' ? 'fadeOut' : 'slideUp'](_slideSpeed, function () {
							if (typeof _animEnd === 'function') _animEnd();
						});
						_holder.removeClass(_activeClass);
					} else {
						_holder.addClass(_activeClass);
						_slider[_effect == 'fade' ? 'fadeIn' : 'slideDown'](_slideSpeed, function () {
							if (typeof _animEnd === 'function') _animEnd();
						});
					}
				}
				return false;
			});
			if (_holder.hasClass(_activeClass)) _slider.show();
			else _slider.hide();
		}
	});
}
function initGalleries() {
	jQuery('.G1').gallery({
		listOfSlides: '.slide-holder>ul>li'
	});
	jQuery('.G2').gallery({
		listOfSlides: '.slide-holder>ul>li'
	})
	jQuery('.G3').gallery({
		listOfSlides: '.slide-holder>ul>li'
	})
	jQuery('.G4').gallery({
		listOfSlides: '.slide-holder>ul>li'
	})
	var _gal3 = jQuery('.gallery-block').gallery({
		listOfSlides: '.list-slide>li',
		autoRotation: 7000,
		effect: true,
		switcher: '.switcher>li'
	})
	jQuery('.gallery-block').mouseenter(function () {
		_gal3.stop();
	}).mouseleave(function () {
		_gal3.play();
	})
	var _gal4 = jQuery('.gallery-block-buyTV').gallery({
		listOfSlides: '.list-slide>li',
		autoRotation: 7000,
		effect: true,
		switcher: '.switcher>li'
	})
	jQuery('.gallery-block-buyTV').mouseenter(function () {
		_gal4.stop();
	}).mouseleave(function () {
		_gal4.play();
	})
}
function initMain() {
	/*clearFormFields({
	clearInputs: true,
	clearTextareas: true,
	passwordFieldText: true,
	addClassFocus: "focus",
	filterClass: "default"
	});
	*/
}
function clearFormFields(o) {
	if (o.clearInputs == null) o.clearInputs = true;
	if (o.clearTextareas == null) o.clearTextareas = true;
	if (o.passwordFieldText == null) o.passwordFieldText = false;
	if (o.addClassFocus == null) o.addClassFocus = false;
	if (!o.filter) o.filter = "default";
	if (o.clearInputs) {
		var inputs = document.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++) {
			if ((inputs[i].type == "text" || inputs[i].type == "password") && inputs[i].className.indexOf(o.filterClass)) {
				inputs[i].valueHtml = inputs[i].value;
				inputs[i].onfocus = function () {
					if (this.valueHtml == this.value) this.value = "";
					if (this.fake) {
						inputsSwap(this, this.previousSibling);
						this.previousSibling.focus();
					}
					if (o.addClassFocus && !this.fake) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				inputs[i].onblur = function () {
					if (this.value == "") {
						this.value = this.valueHtml;
						if (o.passwordFieldText && this.type == "password") inputsSwap(this, this.nextSibling);
					}
					if (o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-" + o.addClassFocus, "");
					}
				}
				if (o.passwordFieldText && inputs[i].type == "password") {
					var fakeInput = document.createElement("input");
					fakeInput.type = "text";
					fakeInput.value = inputs[i].value;
					fakeInput.className = inputs[i].className;
					fakeInput.fake = true;
					inputs[i].parentNode.insertBefore(fakeInput, inputs[i].nextSibling);
					inputsSwap(inputs[i], null);
				}
			}
		}
	}
	if (o.clearTextareas) {
		var textareas = document.getElementsByTagName("textarea");
		for (var i = 0; i < textareas.length; i++) {
			if (textareas[i].className.indexOf(o.filterClass)) {
				textareas[i].valueHtml = textareas[i].value;
				textareas[i].onfocus = function () {
					if (this.value == this.valueHtml) this.value = "";
					if (o.addClassFocus) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				textareas[i].onblur = function () {
					if (this.value == "") this.value = this.valueHtml;
					if (o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-" + o.addClassFocus, "");
					}
				}
			}
		}
	}
	function inputsSwap(el, el2) {
		if (el) el.style.display = "none";
		if (el2) el2.style.display = "inline";
	}
}

(function ($) {
	$.fn.gallery = function (options) { return new Gallery(this.get(0), options); };
	function Gallery(context, options) { this.init(context, options); };
	Gallery.prototype = {
		options: {},
		init: function (context, options) {
			this.options = $.extend({
				infinite: false, 							//true = infinite gallery
				duration: 700, 								//duration of effect it 1000 = 1sec
				slideElement: 4, 							//number of elements for a slide
				autoRotation: false, 						//false = option is disabled; 1000 = 1sec
				effect: false, 								//false = slide; true = fade
				listOfSlides: 'ul > li', 					//elements galleries
				switcher: false, 							//false = option is disabled; 'ul > li' = elements switcher
				disableBtn: false, 							//false = option is disabled; 'hidden' = class adds an buttons "prev" and "next"
				nextBtn: 'a.link-next, a.btn-next, a.next, a.next-link', 	//button "next"
				prevBtn: 'a.link-prev, a.btn-prev, a.prev, a.prev-link', 	//button "prev"
				circle: true, 								//true = cyclic gallery; false = not cyclic gallery
				direction: false, 							//false = horizontal; true = vertical
				event: 'click', 								//event for the buttons and switcher
				IE: false, 									//forced off effect it "fade" in IE
				autoHeight: false								//auto height on fade
			}, options || {});
			var _el = jQuery(context).find(this.options.listOfSlides);
			if (this.options.effect) this.list = _el;
			else this.list = _el.parent();
			if (this.options.switcher) this.switcher = jQuery(context).find(this.options.switcher);
			this.nextBtn = jQuery(context).find(this.options.nextBtn);
			this.prevBtn = jQuery(context).find(this.options.prevBtn);
			this.count = _el.index(_el.filter(':last'));

			if (this.options.switcher) this.active = this.switcher.index(this.switcher.filter('.active:eq(0)'));
			else this.active = _el.index(_el.filter('.active:eq(0)'));
			if (this.active < 0) this.active = 0;
			this.last = this.active;

			this.woh = _el.outerWidth(true);
			if (!this.options.direction) this.installDirections(this.list.parent().width());
			else {
				this.woh = _el.outerHeight(true);
				this.installDirections(this.list.parent().height());
			}

			if (!this.options.effect) {
				this.rew = this.count - this.wrapHolderW + 1;
				if (!this.options.direction) this.anim = '{marginLeft: -(this.woh * this.active)}';
				else this.anim = '{marginTop: -(this.woh * this.active)}';
				eval('this.list.css(' + this.anim + ')');
				var visibleSlideCount = Math.round(this.list.parent().width() / this.woh),
					$visibleSlides = _el.slice(this.active, this.active + visibleSlideCount);
				$visibleSlides.each(function () {
					var $img = $("img.deferred", this);
					if ($img.attr("deferredSrc")) {
						$img.attr("src", $img.attr("deferredSrc"));
						$img.removeAttr("deferredSrc");
					}
				});
			}
			else {
				this.rew = this.count;
				this.list.css({ opacity: 0 }).removeClass('active').eq(this.active).addClass('active').css({ opacity: 1 }).css('opacity', 'auto');
				if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
				if (this.options.autoHeight) this.list.parent().css({ height: this.list.eq(this.active).outerHeight() });
				var $img = this.list.eq(this.active).find("img.deferred");
				if ($img.attr("deferredSrc")) {
					$img.attr("src", $img.attr("deferredSrc"));
					$img.removeAttr("deferredSrc");
				}
			}
			this.flag = true;
			if (this.options.infinite) {
				this.count++;
				this.active += this.count;
				this.list.append(_el.clone());
				this.list.append(_el.clone());
				eval('this.list.css(' + this.anim + ')');
			}

			this.initEvent(this, this.nextBtn, true);
			this.initEvent(this, this.prevBtn, false);
			if (this.options.disableBtn) this.initDisableBtn();
			if (this.options.autoRotation) this.runTimer(this);
			if (this.options.switcher) this.initEventSwitcher(this, this.switcher);
		},
		initDisableBtn: function () {
			this.prevBtn.removeClass('prev-' + this.options.disableBtn);
			this.nextBtn.removeClass('next-' + this.options.disableBtn);
			if (this.active == 0 || this.count + 1 == this.wrapHolderW) this.prevBtn.addClass('prev-' + this.options.disableBtn);
			if (this.active == 0 && this.count == 1 || this.count + 1 <= this.wrapHolderW) this.nextBtn.addClass('next-' + this.options.disableBtn);
			if (this.active == this.rew) this.nextBtn.addClass('next-' + this.options.disableBtn);
		},
		installDirections: function (temp) {
			this.wrapHolderW = Math.ceil(temp / this.woh);
			if (((this.wrapHolderW - 1) * this.woh + this.woh / 2) > temp) this.wrapHolderW--;
		},
		fadeElement: function () {
			if ($.browser.msie && this.options.IE) {
				this.list.eq(this.last).css({ opacity: 0 });
				this.list.removeClass('active').eq(this.active).addClass('active').css({ opacity: 'auto' });
			}
			else {
				var $img = $("img.topSpotGraphic", this.list.eq(this.active));
				if ($img.attr("deferredSrc")) {
					$img.load($.proxy(function (e) {
						this.list.eq(this.last).animate({ opacity: 0 }, { queue: false, duration: this.options.duration });
						this.list.removeClass('active').eq(this.active).addClass('active').animate({
							opacity: 1
						}, {
							queue: false, duration: this.options.duration, complete: function () {
								jQuery(this).css('opacity', 'auto');
							}
						});
						if (this.options.autoHeight) this.list.parent().animate({ height: this.list.eq(this.active).outerHeight() }, { queue: false, duration: this.options.duration });
						if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
						this.last = this.active;
					}, this));
					$img.attr("src", $img.attr("deferredSrc"));
					$img.removeAttr("deferredSrc");
				}
				else {
					this.list.eq(this.last).animate({ opacity: 0 }, { queue: false, duration: this.options.duration });
					this.list.removeClass('active').eq(this.active).addClass('active').animate({
						opacity: 1
					}, {
						queue: false, duration: this.options.duration, complete: function () {
							jQuery(this).css('opacity', 'auto');
						}
					});
					if (this.options.autoHeight) this.list.parent().animate({ height: this.list.eq(this.active).outerHeight() }, { queue: false, duration: this.options.duration });
					if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
					this.last = this.active;
				}
			}
		},
		scrollElement: function ($this) {
			var startElement = this.active;
			//TODO: cache container width
			var count = parseInt($this.list.parent().css("width")) / this.woh;
			var $lis = $this.list.children();
			var $img;
			for (var i = startElement, j = startElement + count; i < j; i++) {
				$img = $("img.deferred", $lis.eq(i));
				if ($img.attr("deferredSrc")) {
					$img.attr("src", $img.attr("deferredSrc"));
					$img.removeAttr("deferredSrc");
				}
			}
			if (!$this.options.infinite) eval('$this.list.animate(' + $this.anim + ', {queue:false, duration: $this.options.duration});');
			else eval('$this.list.animate(' + $this.anim + ', $this.options.duration, function(){ $this.flag = true });');
			if ($this.options.switcher) $this.switcher.removeClass('active').eq($this.active / $this.options.slideElement).addClass('active');
		},
		runTimer: function ($this) {
			if ($this._t) clearTimeout($this._t);
			$this._t = setInterval(function () {
				if ($this.options.infinite) $this.flag = false;
				$this.toPrepare($this, true);
			}, this.options.autoRotation);
		},
		initEventSwitcher: function ($this, el) {
			el.bind($this.options.event, function () {
				$this.active = $this.switcher.index(jQuery(this)) * $this.options.slideElement;
				if ($this._t) clearTimeout($this._t);
				if ($this.options.disableBtn) $this.initDisableBtn();
				if (!$this.options.effect) $this.scrollElement($this);
				else $this.fadeElement();
				if ($this.options.autoRotation) $this.runTimer($this);
				return false;
			});
		},
		initEvent: function ($this, addEventEl, dir) {
			addEventEl.bind($this.options.event, function () {
				if ($this.flag) {
					if ($this.options.infinite) $this.flag = false;
					if ($this._t) clearTimeout($this._t);
					$this.toPrepare($this, dir);
					if ($this.options.autoRotation) $this.runTimer($this);
				}
				return false;
			});
		},
		toPrepare: function ($this, side) {
			if (!$this.options.infinite) {
				if (($this.active == $this.rew) && $this.options.circle && side) $this.active = -$this.options.slideElement;
				if (($this.active == 0) && $this.options.circle && !side) $this.active = $this.rew + $this.options.slideElement;
				for (var i = 0; i < $this.options.slideElement; i++) {
					if (side) { if ($this.active + 1 <= $this.rew) $this.active++; }
					else { if ($this.active - 1 >= 0) $this.active--; }
				};
			}
			else {
				if ($this.active >= $this.count + $this.count && side) $this.active -= $this.count;
				if ($this.active <= $this.count - 1 && !side) $this.active += $this.count;
				eval('$this.list.css(' + $this.anim + ')');
				if (side) $this.active += $this.options.slideElement;
				else $this.active -= $this.options.slideElement;
			}
			if (this.options.disableBtn) this.initDisableBtn();
			if (!$this.options.effect) $this.scrollElement($this);
			else $this.fadeElement();
		},
		stop: function () {
			if (this._t) clearTimeout(this._t);
		},
		play: function () {
			if (this._t) clearTimeout(this._t);
			if (this.options.autoRotation) this.runTimer(this);
		}
	}
}(jQuery));

function initAutoComplete() {
	var _startCount = 1;
	var _hClass = 'hactive';
	var _alwaysRefresh = false;

	$('form.search-form').each(function () {
		var _form = $(this);
		//var _queryBox = _form[0].qu;
		//var _queryType = _form[0].queryType;

		var _input = _form.find('input.autocomplete-field');
		var _selector = _form.find('select[name="queryType"]');
		var _suggest = _form.find('input.suggest');

		var _ajaxHolder = _form.find('div.hint').hide();
		var _ajaxList = _ajaxHolder.find('ul.ajax-list');
		var _attrName = _input.attr('name');
		var _keyboardFocus = false;
		_input.attr('autocomplete', 'off');

		// autocomplete event
		_form.removeAttr('title');
		_input.keyup(handleKeydown);
		_input.blur(function () {
			//if (!_keyboardFocus) {
			setTimeout(function () {
				_ajaxHolder.hide();
			}, 200);
			//}
		})

		// keydown event handler
		function handleKeydown(e) {
			// skip

			if (!e) e = window.event;
			if (e.keyCode == 27 || e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40) return;

			// default key
			if (_input.val().length < _startCount && !_alwaysRefresh) {
				_ajaxHolder.hide();
				return;
			}
			if (_input.val().length >= _startCount || _alwaysRefresh) {
				$.getJSON("/SR/autocomplete.aspx?q=" + escape(_input.val()) + "&qt=" + _selector.val() + "&method=json", function (json) {
					_ajaxList.empty();
					if (!json)
						return false;

					for (var i = 0; i < json.suggestions.length; i++) {
						var liItem = jQuery('<li><a href="#">' + json.suggestions[i].phrase + ((json.suggestions[i].storeName) ? '<span> in <b>' + json.suggestions[i].storeName + '</b></span>' : '') + '</a></li>')
						liItem.appendTo(_ajaxList);
						liItem.click((function (suggestion) {
							return function () {
								var _a = $(this).find('a');
								_a.find('span').html('');
								var _text = _a.text();
								_suggest.val('1');

								_input.attr('value', _text);
								if (suggestion.queryType != "home")
									_selector.val(suggestion.queryType);
								_form.submit();
								return false;
							}
						})(json.suggestions[i]));
						liItem.data('s', json.suggestions[i].queryType);
					}
					filterResults();
					_ajaxList.children().filter(':visible').filter(':odd').addClass('blue');
				});
			} else {
				filterResults();
			}
		}
		// regexp replace
		RegExp.escape = function (str) {
			var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"); // .*+?|()[]{}\
			return str.replace(specials, "\\$&");
		}
		function highlightWords(str, word) {
			var regex = new RegExp("(" + RegExp.escape(word) + ")", "gi");
			return str.replace(regex, "<strong>$1</strong>");
		}
		// results filtering
		function filterResults() {
			if (!_alwaysRefresh) {
				_ajaxHolder.find('li').each(function () {
					var lnk = jQuery(this).find('a');
					lnk.html(lnk.html().replace('<strong>', '').replace('</strong>', ''));

					if ($(this).text().substr(0, _input.val().length).toUpperCase().indexOf(_input.val().toUpperCase()) != -1) $(this).show();
					else $(this).hide();

					// hover functions
					$(this).mouseenter(function () {
						_ajaxHolder.find('li').removeClass(_hClass);
						$(this).addClass(_hClass);
					});
				});
				_ajaxHolder.mouseleave(function () {
					_ajaxHolder.find('li').removeClass(_hClass);
				});

				_ajaxHolder.show();
				if (!_ajaxHolder.find('li:visible').length) _ajaxHolder.hide();
				var matchedItems = _ajaxList.find('li:visible');
				if (matchedItems.length) {
					// make matching text bold
					matchedItems.each(function () {
						//only highlight the text nodes. we don't want to change the '<span>in <b>electronics</b></span>' section
						var txt = $(this).find('a').contents().filter(function () { return this.nodeType == 3; });
						txt.replaceWith(function () { return highlightWords($(this).text(), _input.val()); });
					});
				}
			}
		}

		// create autocomplete list
		function autoComplete(msg) {
			_ajaxHolder.html(msg).show();
			_ajaxHolder.find('a').click(function () {
				_ajaxHolder.hide();
				//_input.val($(this).text());
				//_form.submit();
			});
			filterResults();
		}

		// autocomplete nav
		function keyboardNav(direction) {
			var _elements = _ajaxHolder.find('li:visible');
			var _currentIndex = _elements.index(_elements.filter('.' + _hClass).eq(0));
			if (_currentIndex < 0) _currentIndex = -1;
			_keyboardFocus = true;

			if (direction) {
				if (_currentIndex < _elements.length - 1) _currentIndex++;
			} else {
				if (_currentIndex > 0) _currentIndex--;
				else _currentIndex = 0;
			}
			_elements.removeClass(_hClass).eq(_currentIndex).addClass(_hClass);
		}

		// keyboard handle
		//_form.submit(function() {
		//    if (_keyboardFocus) return false;
		//})
		_input.keydown(function (e) {
			if (!e) e = window.event;
			if (e.keyCode == 13) {
				var _elements = _ajaxHolder.find('li:visible');
				var _cIndex = _elements.index(_elements.filter('.' + _hClass).eq(0));
				_ajaxHolder.hide();

				if (_cIndex < 0) {
					//use user input val.
				} else {
					var _li = _elements.eq(_cIndex);
					var queryType = _li.data('s');
					var _a = _li.find('a');
					_a.find('span').html('');
					var _text = _a.text();
					_suggest.val('1');

					_input.attr('value', _text);
					if (queryType != "home")
						_selector.val(queryType);
				}
				//window.location.href = _elements.eq(_cIndex).find('a').attr('href');
				_keyboardFocus = false;
				_form.submit();
				return false;
			}
			if (e.keyCode == 27) {
				_ajaxHolder.hide();
				_keyboardFocus = false;
			}
			if (e.keyCode == 38) {
				keyboardNav(false);
			}
			if (e.keyCode == 40) {
				keyboardNav(true);
			}
		})
	});
}

/* initTabs */
function initTabs() {
	$('ul.tabset').each(function () {
		var _list = $(this);
		var _links = _list.find('a.tab');
		_links.each(function () {
			var _link = $(this);
			var _href = _link.get(0).hash;
			var _tab = $(_href);

			if (_link.hasClass('active')) _tab.show();
			else _tab.hide();

			_link.click(function (e) {
				_links.filter('.active').each(function () {
					$($(this).removeClass('active').get(0).hash).hide();
				});
				_link.addClass('active');
				_tab.show();
				e.preventDefault();
			});
		});
	});
}
(function ($) {
	$.fn.simplebox = function (options) {
		return new Simplebox(this, options);
	};

	function Simplebox(context, options) { this.init(context, options); };

	Simplebox.prototype = {
		options: {},
		init: function (context, options) {
			this.options = $.extend({
				duration: $.browser.msie ? 0 : 300,
				linkClose: 'a.close, a.btn-close,a.link-close',
				divFader: 'fader',
				faderColor: 'black',
				path: false,
				opacity: 0.7,
				wrapper: '#wrapper',
				linkPopap: '.link-submit'
			}, options || {});
			this.btn = $(context);
			this.select = $(this.options.wrapper).find('select');
			this.initFader();
			this.btnEvent(this, this.btn);
		},
		btnEvent: function ($this, el) {
			el.click(function () {
				if ($this.options.path) {
					$this.toPrepare($this.options.path);
				} else {
					if ($(this).attr('href')) $this.toPrepare($(this).attr('href'));
					else $this.toPrepare($(this).attr('title'));
				}
				return false;
			});
		},
		calcWinWidth: function () {
			this.winWidth = $('body').width();
			if ($(this.options.wrapper).width() > this.winWidth) this.winWidth = $(this.options.wrapper).width();
		},
		toPrepare: function (obj) {
			this.popup = $(obj);
			this.btnClose = this.popup.find(this.options.linkClose);
			this.submitBtn = this.popup.find(this.options.linkPopap);

			if ($.browser.msie) this.select.css({ visibility: 'hidden' });
			this.calcWinWidth();
			this.winHeight = $(window).height();
			this.winScroll = $(window).scrollTop();

			this.popupTop = this.winScroll + (this.winHeight / 2) - this.popup.outerHeight(true) / 2;
			if (this.popupTop < 0) this.popupTop = 0;
			this.faderHeight = $(this.options.wrapper).outerHeight();
			if ($(window).height() > this.faderHeight) this.faderHeight = $(window).height();

			this.popup.css({
				top: this.popupTop,
				left: this.winWidth / 2 - this.popup.innerWidth() / 2
				//7-21-11 -- patrick harsh -- in ie7 outerWidth(true) returns around 12k instead of
				//the correct amount which should be closer to 900, innerWidth() seems to work well
				//left: this.winWidth / 2 - this.popup.outerWidth(true) / 2
			}).hide();
			this.fader.css({
				width: this.winWidth,
				height: this.faderHeight
			});
			this.initAnimate(this);
			this.initCloseEvent(this, this.btnClose, true);
			this.initCloseEvent(this, this.submitBtn, false);
			this.initCloseEvent(this, this.fader, true);
		},
		initCloseEvent: function ($this, el, flag) {
			el.click(function () {
				$('body > div.outtaHere').removeClass('optionsDivVisible').addClass('optionsDivInvisible')
				$this.popup.fadeOut($this.options.duration, function () {
					$this.popup.css({ left: '-9999px' }).show();
					if ($.browser.msie) $this.select.css({ visibility: 'visible' });
					$this.submitBtn.unbind('click');
					$this.fader.unbind('click');
					$this.btnClose.unbind('click');
					$(window).unbind('resize');
					if (flag) $this.fader.fadeOut($this.options.duration);
					else {
						if ($this.submitBtn.attr('href')) $this.toPrepare($this.submitBtn.attr('href'));
						else $this.toPrepare($this.submitBtn.attr('title'));
					}
				});
				return false;
			});
		},
		initAnimate: function ($this) {
			$this.fader.fadeIn($this.options.duration, function () {
				$this.popup.fadeIn($this.options.duration);
			});
			$(window).resize(function () {
				$this.calcWinWidth();
				$this.popup.animate({
					left: $this.winWidth / 2 - $this.popup.outerWidth(true) / 2
				}, { queue: false, duration: $this.options.duration });
				$this.fader.css({ width: $this.winWidth });
			});
		},
		initFader: function () {
			if ($(this.options.divFader).length > 0) this.fader = $(this.options.divFader);
			else {
				this.fader = $('<div class="' + this.options.divFader + '"></div>');
				$('body').append(this.fader);
				this.fader.css({
					position: 'absolute',
					zIndex: 1000,
					left: 0,
					top: 0,
					background: this.options.faderColor,
					opacity: this.options.opacity
				}).hide();
			}
		}
	}
}(jQuery));
//############################## end jquery.main ################################


//STYLESHEET CHECK
var mac = navigator.appVersion.indexOf("Mac") > -1
var buyOpera = navigator.userAgent.indexOf("Opera") > -1


//BROWSER DETECT	
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	},
	dataBrowser: [
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{	// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 	// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS: [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

document.cookie = 'BrowserOS=' + BrowserDetect.OS + ';domain=rakuten.com;path=/';
document.cookie = 'BrowserClient=' + BrowserDetect.browser + ';domain=rakuten.com;path=/';

function formatCustomerName(name, length) {
	var atSymbolIndex = name.indexOf("@");

	if (atSymbolIndex != -1) {
		name = name.substring(0, atSymbolIndex);
	}

	if (name.length > length)
		name = name.substring(0, length);

	return name;
}



function getCookieVal(offset) {
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	if (name == "basket") {
		return "Basket Empty";
	} else {
		return "null";
	}
}

function setCookie() {
}


//set random number for rotating promos
rnd2.today = new Date();
rnd2.seed = rnd2.today.getTime();

function rnd2() {
	rnd2.seed = (rnd2.seed * 9301 + 49297) % 233280;
	return rnd2.seed / (233280.0);
};

function rand2(number) {
	return Math.ceil(rnd2() * number);
};


//RANDOM IMAGES

rnd.today = new Date();
rnd.seed = rnd.today.getTime();
function rnd() {
	rnd.seed = (rnd.seed * 9301 + 49297) % 233280;
	return rnd.seed / (233280.0);
};
function rand(number) {
	return Math.ceil(rnd() * number);
};



var timestart = 500;
var timeout = 500;
var tabclosetimer = 0;
var tabitem = 0;
var tabheader = 0;

// open hidden layer
function tabopen(id) {
	// cancel close timer
	tabcancelclose();

	// close old layer
	if (tabitem) tabitem.style.visibility = 'hidden';
	if (tabheader) tabheader.className = 'fullTab';

	// get new layer and show it
	tabitem = document.getElementById(id);
	tabitem.style.visibility = 'visible';
	tabheader = document.getElementById(id + 'TB');
	tabheader.className = 'highTab';
}

// close showed layer
function closetab() {
	if (tabitem) tabitem.style.visibility = 'hidden';
	if (tabheader) tabheader.className = 'fullTab';
}

// go close timer
function tabclose() {
	tabclosetimer = window.setTimeout(closetab, timeout);
}

// cancel close timer
function tabcancelclose() {
	if (tabclosetimer) {
		window.clearTimeout(tabclosetimer);
		tabclosetimer = null;
	}
}

function checkfields() {
	if (document.miniform.EmailAddr.value == "") {
		alert("You must provide your email address!");
		return false;
	}
	if (document.miniform.EmailAddr.value.indexOf("@") + "" == "-1" || document.miniform.EmailAddr.value.indexOf(".") + "" == "-1") {
		alert("The email address you entered does not have a valid\n" +
							"syntax.  Please re-enter the address and try again.");
		return false;
	}
}

function deleteBasketCookie(days) {
	var date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	var expires = "; expires=" + date.toGMTString();
	document.cookie = "ShopperManager%2F=" + expires + "; domain=rakuten.com; path=/";
	document.cookie = "BuyShopperID=" + expires + "; domain=rakuten.com; path=/";
	document.cookie = "buyname=" + expires + "; domain=rakuten.com; path=/";
	document.cookie = "ExpiringPoints=" + expires + "; domain=rakuten.com; path=/";
	document.cookie = "buyrs=" + expires + "; domain=rakuten.com; path=/";
	window.location.href = "https://secure.rakuten.com/AC/loginAccount.aspx?ReturnUrl=myaccount.aspx";
}

function formatCustomerName(name, length) {
	var atSymbolIndex = name.indexOf("@");

	if (atSymbolIndex != -1) {
		name = name.substring(0, atSymbolIndex);
	}

	if (name.length > length)
		name = name.substring(0, length);

	return name;
}

// close layer when click-out
document.onclick = closetab;

var isActive = false;

if (typeof BUY === "undefined" || !BUY) { var BUY = {}; }
if (typeof BUY.Cookies === "undefined" || !BUY.Cookies) {
	BUY.Cookies = {
		init: function () { var cookies = document.cookie.split('; '); for (var i = 0; i < cookies.length; i++) { var content = cookies[i].split('='); this[content[0]] = content[1]; } },
		add: function (name, value, days) { var expires = ""; if (days) { var date = new Date(); date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); var expires = "; expires=" + date.toGMTString(); } document.cookie = name + "=" + value + expires + "; path=/; domain=rakuten.com"; this[name] = value; },
		remove: function (name) { this.add(name, '', -1); this[name] = undefined; }
	};
	BUY.Cookies.init();
}



/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
* Generate a random uuid.
*
* USAGE: Math.uuid(length, radix)
*   length - the desired number of characters
*   radix  - the number of allowable values for each character.
*
* EXAMPLES:
*   // No arguments  - returns RFC4122, version 4 ID
*   >>> Math.uuid()
*   "92329D39-6F5C-4520-ABFC-AAB64544E172"
* 
*   // One argument - returns ID of the specified length
*   >>> Math.uuid(15)     // 15 character ID (default base=62)
*   "VcydxgltxrVZSTV"
*
*   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
*   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
*   "01001010"
*   >>> Math.uuid(8, 10) // 8 character ID (base=10)
*   "47473046"
*   >>> Math.uuid(8, 16) // 8 character ID (base=16)
*   "098F4D35"
*/
(function () {
	// Private array of chars to use
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

	Math.uuid = function (len, radix) {
		var chars = CHARS, uuid = [];
		radix = radix || chars.length;

		if (len) {
			// Compact form
			for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
		} else {
			// rfc4122, version 4 form
			var r;

			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';

			// Fill in random data.  At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (var i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}

		return uuid.join('');
	};

	// A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
	// by minimizing calls to random()
	Math.uuidFast = function () {
		var chars = CHARS, uuid = new Array(36), rnd = 0, r;
		for (var i = 0; i < 36; i++) {
			if (i == 8 || i == 13 || i == 18 || i == 23) {
				uuid[i] = '-';
			} else if (i == 14) {
				uuid[i] = '4';
			} else {
				if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
				r = rnd & 0xf;
				rnd = rnd >> 4;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
		return uuid.join('');
	};

	// A more compact, but less performant, RFC4122v4 solution:
	Math.uuidCompact = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}).toUpperCase();
	};
})();

//Functions to support sharing page on external sites via ShopTogether and buys.com shorturls:
function tagThisClick(sender, onSite) {
	var tagUrl = "";
	tagUrl = $("#linkManagedURL").attr("href");
	if (!tagUrl) tagUrl = ShopTogether.URL;
	if (!tagUrl) tagUrl = $("meta[property='og:url']").attr("content");
	if (!tagUrl) tagUrl = $("link[rel='bookmark']").attr("href");
	if (!tagUrl) tagUrl = window.location.href;
	if (tagUrl && tagUrl.indexOf("?") > -1) {
		tagUrl = tagUrl.split("?")[0];
	}
	if (!tagUrl) tagUrl = "http://www.rakuten.com";
	tagThisClickOnGetShortUrl(onSite, tagUrl);
};

function tagThisClickOnGetShortUrl(onSite, url) {
	tagThisUrl = url;
	var tagOnSiteUrl = "";
	switch (onSite) {
		case "myspace":
			tagOnSiteUrl = "http://www.myspace.com/index.cfm?fuseaction=postto&t=" + encodeURIComponent(tagThisTitle) + "&c=" + encodeURIComponent(tagThisDescription) + "&u=" + encodeURIComponent(tagThisUrl);
			break;
		case "facebook":
			tagOnSiteUrl = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(tagThisUrl) + "&t=" + encodeURIComponent(tagThisTitle);
			break;
		case "digg":
			tagOnSiteUrl = "http://digg.com/submit?phase=2&url=" + encodeURIComponent(tagThisUrl) + "&title=" + encodeURIComponent(tagThisTitle) + "&bodytext=" + encodeURIComponent(tagThisDescription) + "&topic=";
			break;
		case "delicious":
			tagOnSiteUrl = "http://del.icio.us/post?v=4&tags=technology&partner=rakuten.com&noui&jump=close&url=" + encodeURIComponent(tagThisUrl) + "&title=" + encodeURIComponent(tagThisTitle) + "&notes=" + encodeURIComponent(tagThisDescription);
			break;
		case "twitter":
			var tagThisTwitterTitle = tagThisTitle;
			if (tagThisTitle.length > 80) {
				tagThisTwitterTitle = tagThisTitle.substring(0, 80);
			}
			tagOnSiteUrl = "http://twitter.com/?status=" + encodeURIComponent("Looking at " + tagThisTwitterTitle + " " + tagThisUrl);
			break;
		case "google":
			tagOnSiteUrl = "http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=" + encodeURIComponent(tagThisUrl) + "&title=" + encodeURIComponent(tagThisTitle);
			break;
		case "yahoo":
			tagOnSiteUrl = "http://myweb.yahoo.com/myresults/bookmarklet?u=" + encodeURIComponent(tagThisUrl) + "&title=" + encodeURIComponent(tagThisTitle) + "&ei=UTF";
			break;
		case "livespaces":
			var tagThisLiveSpacesDescription = tagThisDescription;
			if (tagThisDescription.length > 200) {
				tagThisLiveSpacesDescription = tagThisDescription.substring(0, 200) + "...";
			}
			tagOnSiteUrl = "http://spaces.live.com/BlogIt.aspx?Title=" + encodeURIComponent(tagThisTitle) + "&SourceURL=" + encodeURIComponent(tagThisUrl) + "&description=" + encodeURIComponent(tagThisLiveSpacesDescription);
			break;
		case "technorati":
			tagOnSiteUrl = "http://technorati.com/faves?add=" + encodeURIComponent(tagThisUrl) + "&title=" + encodeURIComponent(tagThisTitle);
			break;
		case "stumbleupon":
			tagOnSiteUrl = "http://www.stumbleupon.com/submit?url=" + encodeURIComponent(tagThisUrl) + "&title=" + encodeURIComponent(tagThisTitle);
			break;
		case "reddit":
			tagOnSiteUrl = "http://it.reddit.com/submit?url=" + encodeURIComponent(tagThisUrl) + "&title=" + encodeURIComponent(tagThisTitle);
			break;
		case "mixx":
			tagOnSiteUrl = "http://www.mixx.com/submit?page_url=" + encodeURIComponent(tagThisUrl);
			break;
		default:
			tagOnSiteUrl = "";
	}
	window.open(tagOnSiteUrl);
	return false;
}

jQuery.fn.center = function () {
	this.css("position", "absolute");
	this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
	this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
	return this;
}

function omSetVarsCartConv(event, sku, params, buyButtonPositionId) {
	if (event = "scAdd") {
		if (buyButtonPositionId == "10" || buyButtonPositionId == "11") {
			$('<script type="text/javascript">dtmc_product_event="scAdd"; dtmc_product_conversion="' + params + '"; dtmc_product_rec_sku="' + sku + '";</script>').appendTo("head");
			$('<script type="text/javascript" src="http://www.rakuten.com/scripts/omniture/om_complete_rak.js"><\/script>').appendTo("head");
		} else {
			$('<script type="text/javascript">dtmc_product_event="scAdd"; dtmc_product_recommendation="' + params + '"; dtmc_product_rec_sku="' + sku + '";</script>').appendTo("head");
			$('<script type="text/javascript" src="http://www.rakuten.com/scripts/omniture/om_complete_rak.js"><\/script>').appendTo("head");
		}
	}
}
function omSetVarsProduct(event, sku, params) {
	if (event = "scAdd") {
		$('<script type="text/javascript">dtmc_product_event="scAdd"; dtmc_product_recommendation="' + params + '"; dtmc_product_rec_sku="' + sku + '";</script>').appendTo("head");
		$('<script type="text/javascript" src="http://www.rakuten.com/scripts/omniture/om_complete_rak.js"><\/script>').appendTo("head");
	}
}
function omSetConvCookie(tracking) {
	var exdate = new Date();
	exdate.setTime(exdate.getTime() + (1000 * 60));
	document.cookie = "prConvTrack=" + tracking + ";expires=" + exdate.toGMTString() + ";path=/";
}
function prBasketCallback(data) {

    var obj = eval('(' + data + ')');

	var qsParam = "";
	var basketLink = "https://secure.rakuten.com/CO/ConfirmBasket.aspx";

	if (location.host.indexOf("beta.rakuten.com") > -1)
		basketLink = "https://secure.beta.rakuten.com/CO/ConfirmBasket.aspx";
	else if (location.host.indexOf("test.rakuten.com") > -1)
		basketLink = "https://test.secure.rakuten.com/CO/ConfirmBasket.aspx";

	myCartItemCount = obj.data.count;

	if (obj.data.listingID && obj.data.listingID != "") {
		if (obj.data.listingID.indexOf("|") == -1)
			qsParam = "&lid=" + obj.data.listingID;
		else
			qsParam = "&lid=" + obj.data.listingID.substring(0, obj.data.listingID.indexOf("|"));
	}
	else if (obj.data.sku && obj.data.sku != "") {
	    if (obj.data.sku.indexOf("|") == -1) {
	        qsParam = "&sku=" + obj.data.sku;
	    }
	    else {
	        qsParam = "&sku=" + obj.data.sku.substring(0, obj.data.sku.indexOf("|"));
	    }
	}
	if (obj.data.wSku && obj.data.wSku != "")
		qsParam += "&wsku=" + obj.data.wSku;

	if (obj.data.status != "1" || obj.data.msg.length > 0) {
		$('#addToCart').rakboxclose();
		//$('#addItemMsg').html("<div class=\"pr-additem-containeritem\"><span class=\"message\">" + obj.data.msg + "</span><p /><span><a href=\"javascript:void(0);\" onclick=\"stopParentOnclicks(event); prAnimateCart(myCartItemCount); $('#addItemMsg').rakboxclose();\"><img src=\"http://ast1.r10.io/buy_assets/v9/product/btn_contShopping.gif\" border=\"0\" alt=\"Continue Shopping\" /></a><a href=\"" + basketLink + "\" onclick=\"stopParentOnclicks(event);\"><img src=\"http://ast1.r10.io/buy_assets/v9/product/btn_checkout.gif\" border=\"0\" alt=\"View Basket and Checkout\" /></a></span></div>")
		//$('#addItemMsg').html(
		//	"<div class=\"pr-additem-containeritem\">" +
		//	    "<span class=\"message\">" + obj.data.msg + "</span><p />" +
		//		"<span>" +
		//		    "<a href=\"javascript:void(0);\" onclick=\"stopParentOnclicks(event); prAnimateCart(myCartItemCount); $('#addItemMsg').rakboxclose();\">" +
		//			    "<img src=\"http://ast1.r10.io/buy_assets/v9/product/btn_contShopping.gif\" border=\"0\" alt=\"Continue Shopping\" /></a>" +
		//			"<a href=\"" + basketLink + "\" onclick=\"stopParentOnclicks(event);\">" +
		//			    "<img src=\"http://ast1.r10.io/buy_assets/v9/product/btn_checkout.gif\" border=\"0\" alt=\"View Basket and Checkout\" /></a>" +
		//		"</span>" +
		//	"</div>"
		//)
		$('#addItemMsg').html(
			"<div class=\"pr-additem-containeritem\">" +
				"<div style=\"width:100%; border-bottom: 2px solid #B7C0BF; padding-bottom:15px; margin-bottom:15px;\">" +
					"<span class=\"message\">" + obj.data.msg + "</span>" +
				"</div>" +
				"<div style=\"width:338px;\">" +
					"<a href=\"" + basketLink + "\" onclick=\"stopParentOnclicks(event);\">" +
						"<div class=\"cart-button-border\">" +
							"<div class=\"cart-checkout-butt\">CHECKOUT</div>" +
						"</div>" +
					"</a>" +
				    "<a href=\"javascript:void(0);\" onclick=\"stopParentOnclicks(event); prAnimateCart(myCartItemCount); $('#addItemMsg').rakboxclose();\">" +
						"<div class=\"cart-button-border\"> " +
							"<div class=\"cart-continue-butt\">CONTINUE SHOPPING</div>" +
						"</div>" +
					"</a>" +
				"</div>" +
			"</div>"
		).rakbox({
			autoOpen: true,
			width: 450,
			beforeClose: function () { prAnimateCart(myCartItemCount); }
		});
	}
	else {
		var guid = "&banana=" + prGuidGenerator();
		$.get("/ct/cart/cart.aspx?osri=1" + qsParam + guid, function (addToCartData) {
			$('#addItemMsg').rakboxclose();
			//destroy old cart popup if present, insert new html, make it a popup again with the carts transfer closing effect
			$('#addToCart').rakboxdestroy();
			$('#addToCart').html(addToCartData).rakbox({
				autoOpen: true,
				width: 825,
				beforeClose: function () {
					if ($("#addToCart .recent-item-container").length > 0) {
						try {
							$(this).effect(
								'transfer',
								{ to: '#mycart-holder', className: 'ui-effects-transfer' },
								500,
								function () {
									prAnimateCart(myCartItemCount);
								}
							);
						}
						catch (err) { }
					}
				}
			});

			//call ajax and inject rich relevance recs
			getRRAddToCartRecs(obj.data.sku);
		});
	}
	if (obj.data.count > 0)
		$('#headerCart').html("<a href=\"" + basketLink + "\" class=\"cart\"> <span class=\"itemNumber\">(" + obj.data.count + ")</span></a>");
}

//call ajax and inject rich relevance recs
function getRRAddToCartRecs(sku) {
	var $placement = $('#rrA2C');
	if ($placement.length > 0) {
		var rdcSessionId = GetCookie('rdc_sessionid');
		if (!rdcSessionId) {
			var rand = Math.floor(Math.random() * (100000001 - 1 + 1)) + 1;
			rdcSessionId = rand;
			document.cookie = 'rdc_sessionid=' + rand + ';domain=.rakuten.com;path=/';
		}
		var rdcUserId = rdcSessionId;
		var rdcBuyName = GetCookie('buyname');

		if (rdcBuyName !== undefined)
			rdcUserId = GetCookie('BuyShopperID');

		if (location.host.indexOf("wsd-") > -1 || location.host.indexOf("beta.rakuten.com") > -1 || location.host.indexOf("test.rakuten.com") > -1)
			domainPart = "integration";
		else
			domainPart = "recs";

		//Goes out and gets the API data from RR
		$.getJSON("http://" + domainPart + ".richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiClientKey=b69780df26aca2f9&apiKey=b65bcd95429b2d91&placements=add_to_cart_page.vertical_1&productId=" + sku + "&userId=" + rdcUserId + "&sessionId=" + rdcSessionId + "&jsonp=true&jcb=?"
		, function (data) {
			//Loops over the response data.placements value and if the placement is expected
			//it will take the HTML content and inject it back to desired div's on the page.
			if (data.placements) {
				$.each(data.placements, function (index, value) {
					if (value.placement == "add_to_cart_page.vertical_1")
						$placement.html(value.html);
				});
				//Execute a callback that refreshes the visual of the items based on JavaScript adjustments
				//Function is defined by RR and controlled in the RR dashboard.
				rrRenderItemOptions();
			}
		});
	}
};

function prGuidGenerator() {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function prShowAddToCartSpinner() {
	$('#addItemMsg').rakboxdestroy();
	$('#addItemMsg').html('<img src="http://ast1.r10.io/buy_assets/search/ajax-loader.gif" style="margin-left: 176px; margin-top: 27px; alt="Loading" />').rakbox({
		autoOpen: true,
		width: 460,
		beforeClose: function () { prAnimateCart(myCartItemCount); }
	});
}
function hideAddToCartBox() {
	$('#addItemOverlay').hide();
	$('#addItemMsg').hide();
	$('#addToCart').hide();
}
function prAnimateCart(count) {
	if (count > 0)
		$('#cart-item-count').html("(" + count + ")");
}
function stopParentOnclicks(event) {
	if (event.stopPropagation)
		event.stopPropagation();
	//for pre ie9
	if (event.cancelBubble != null)
		event.cancelBubble = true;
}
//required name specific function for square trade to add warranty
function onWarrantySelect(warrantySku, warrantyPrice, warrantyDescription) {
	if (warrantySku)
		$("#mainCartLink").data("warrantySku", warrantySku);
	else
		$("#mainCartLink").removeData("warrantySku");
}
function AddItemToCart(qsParams, position) {
	var addItemLink = "http://cart.rakuten.com/CO/basket/cartservice.aspx?";
	var quantity = "1";
	var regex = new RegExp("^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$");
	var warrantySku = "";
	var qs = "";

	if (position == "1" && $("#qty").length > 0) {
		warrantySku = $("#mainCartLink").data("warrantySku");
		if (regex.test($("#qty").val()))
			quantity = $("#qty").val();
	}
	else if (position == "11" && $("input.fp-get-qty").length > 0) {
		if (regex.test($("input.fp-get-qty").val()))
			quantity = $("input.fp-get-qty").val();
	}

	if (location.host.indexOf("beta.rakuten.com") > -1)
		addItemLink = "http://cart.beta.rakuten.com/CO/basket/cartservice.aspx?";
	else if (location.host.indexOf("test.rakuten.com") > -1)
		addItemLink = "http://cart.test.rakuten.com/CO/basket/cartservice.aspx?";

	qs = 'BtnPosID=' + position + "&" + qsParams + "|" + quantity;
	if (warrantySku && warrantySku != "")
		qs += "&warrantySku=" + warrantySku + "|" + $("#mainCartLink").data("sku");

	/*
	$(window).resize(function ()
	{
		//don't try to center unless it's visible
		$('#addItemMsg').filter(":visible").center();
		$('#addToCart').filter(":visible").center();
	});
	*/

	prShowAddToCartSpinner();

    //RR - add to cart
    try {
        if (dataLayer && dataLayer.length > 0) {
            dataLayer.push({
                'event': 'addToCart',
                'vpv': '/CO/basket/cartservice.aspx',
                'productSku': '' + dataLayer[0].productSku + ''
            });
        }
    }
    catch (e) {
    }



	$.ajax({
		url: addItemLink + qs,
		dataType: 'jsonp',
		jsonpCallback: 'prBasketCallback'
	});

	$("#divCartItemsContainer").hide();
};

function RemoveItemFromCart(removeSku) {
	var removeItemLink = "http://cart.rakuten.com/CO/basket/cartservice.aspx?";
	var qs = "";

	if (location.host.indexOf("beta.rakuten.com") > -1)
		removeItemLink = "http://cart.beta.rakuten.com/CO/basket/cartservice.aspx?";
	else if (location.host.indexOf("test.rakuten.com") > -1)
		removeItemLink = "http://cart.test.rakuten.com/CO/basket/cartservice.aspx?";

	qs = 'removeSku=' + removeSku;

	$.ajax({
		url: removeItemLink + qs,
		dataType: 'jsonp',
		jsonpCallback: 'ctBasketQtyUpdate'
	});

	$("#header .cart-container2 .r" + removeSku).hide();

	var itemQty = 0;

	//do an each since it can be attached to a warranty or coupon and it will remove both
	$("#header .cart-container2 .r" + removeSku).each(function () {
		itemQty += parseInt($(this).data("qty"));
	});

	var itemPrc = 0;
	var totalPrc = $("#header .cart-container2 #lblSubTotal").data("total");
	var newTotal = 0;

	$("#header .cart-container2 .r" + removeSku).each(function () {
		itemPrc += parseFloat($(this).data("prc")) * parseInt($(this).data("qty"));
	});
	totalPrc = parseFloat(totalPrc);
	//newTotal = totalPrc - (itemPrc * itemQty);
	newTotal = totalPrc - itemPrc;
	newTotal = Math.round(newTotal * 100) / 100;
	newTotal = newTotal.toFixed(2);
	$("#header .cart-container2 #lblSubTotal").html("$" + newTotal);
	$("#header .cart-container2 #lblSubTotal").data("total", newTotal);
}

function ctBasketQtyUpdate(data) {
	var obj = eval('(' + data + ')');
	//try {
	var totalQty = obj.data.count;
	var totalPrc = $("#header .cart-container2 #lblSubTotal").data("total");

	$("#header .cart-container2 #cart-item-count").html("(" + totalQty + ")");
	/* this should get set in cartservice.aspx */
	//update header total cookie
	//var ctDate = new Date();
	//ctDate.setDate(ctDate.getDate() + 7);
	//document.cookie = "headerTotal=" + totalPrc.replace(".", "") + "|" + totalQty + "; expires=" + ctDate.toGMTString() + "; domain=rakuten.com; path=/";
	//} catch (e) { }
}

(function ($) {
	//IE6 hack to hide any selects that overlap dynamic content
	$.ie6HideShowSelect = function (visibility) {
		if ($.browser.msie && $.browser.version == '6.0')
			$('select').css({ 'visibility': visibility });
	};

	//menu plugin from play.com
	$.fn.mainNav = function (options) {
		//set default options
		var opts = {
			classPrefix: 'nav-',    // The prefix you are using on your navigation classes to keep them separate from other content
			navID: '#main-nav',    // The id of your navigation bar
			activeLink: 'active',  // The class used for the active tab whilst hovering menu lists
			showDelay: 1000,    // delay time before dropdown shows
			hideDelay: 800,    // delay time before dropdown hides
			fadeSpeed: 100,    // speed of fade in animation
			firstCharCount: 8,    // The amount of characters allowed BEFORE the '&' before a br is added
			lastCharCount: 5    // The amount of characters allowed AFTER the '&' before a br is added
		};

		//call in the default otions
		var options = $.extend(opts, options);

		//Add a first/last class to the first and last nav tabs for styling
		$(opts.navID + ' li.' + opts.classPrefix + 'parent:first').addClass('first');
		$(opts.navID + ' li.' + opts.classPrefix + 'parent:last').addClass('last');


		//Slightly complex calculation to get the page's left and right boundaries, 
		//simple 'offset' wont work here as that will only find top and/or left positions. The
		//objective is to stop the MDD from displaying outside the page widths
		theBoundary = parseInt($(opts.navID).width());

		$('.' + opts.classPrefix + 'section-container').each(function () {
			var me = $(this),
			sectionBlock = me.find('.' + opts.classPrefix + 'section-block');

			//add first and last classes to the respective 'sections' in each MDD.
			sectionBlock.first().addClass('first');
			sectionBlock.last().addClass('last');

			//Calculate the number of sections in each dropdown times their widths and apply that
			//number to the container because we need to apply a fixed width to the containing element which
			//is absolute so has issues stretching in width to accommodate all 'sections' therein
			var sectionWidth = 0,
			sectionCount = sectionBlock.length,
			theLargestHeight = 0;

			//Didnt like doing this but hey ho! We're finding the last column
			//in each section and applying the last class to it for styling purposes.
			//Then find the largest column height and apply that height to all sections
			//in this container (MDD)
			sectionBlock.each(function () {
				var col = $(this).find('.nav-col'),
				cWidth = 0;

				col.last().addClass('last');
				col.each(function () {
					cWidth += parseInt($(this).outerWidth(true));
				});
				$(this).width(cWidth);
				sectionWidth += parseInt($(this).outerWidth(true));

				var thisHeight = $(this).height();
				if (thisHeight > theLargestHeight)
					theLargestHeight = thisHeight;
			});

			sectionBlock.height(theLargestHeight);

			//Cetralize the MDD to its parent tab then if it falls outside the page's boundaries
			//bring it back in by the overlapping amount

			//Get the parent true width and halve it to find the central axis
			var parentWidth = me.parent().outerWidth(true) / 2;

			me.css({ width: sectionWidth });

			//redefine the new container width
			var sectionWidth = me.outerWidth(true);
			me.css({ 'left': parentWidth - (sectionWidth / 2), 'visibility': 'visible' });

			var offset = me.offset().left,
			parentOffset = $(opts.navID).offset().left,
			rightPos = (offset + sectionWidth) - (parentOffset + theBoundary);
			leftPos = parentOffset - offset;

			//Make sure the dropdowns never exceed the page's boundaries
			if (offset + sectionWidth > parentOffset + theBoundary)
				me.css({ marginLeft: -rightPos + 'px' })
			else if (offset < parentOffset)
				me.css({ marginLeft: leftPos + 'px' })

			//Since jQuery cannot calculate heights/widths 'display:none'
			//elements we had to perform all of the above on 'display:block; visibility:hidden'
			//then use jQuery to hide the MDD's
			me.hide();
		});

		//Hover states (Bloddy stupid method!!!!)
		$('.' + opts.classPrefix + 'parent').each(function () {
			var me = $(this),
			tabDeactivationTimer = 0,
			tabActivationTimer = 0;

			//Find the tab which is currently selected and add a temporary class to it.
			//That class is built from that tab's title. We'll use this class to remember
			//which tab should be selected after we hover away from the menu
			if (me.find('a.' + opts.classPrefix + 'title').hasClass('selected')) {
				theSelectedTab = $(this).find('.selected').text().replace(/&/g, 'and'),
				theSelectedTab = theSelectedTab.replace(/ /g, '-').toLowerCase();
				$(this).find('.selected').addClass(theSelectedTab);
			}

			me.hover(
			function () {

				if (typeof theSelectedTab != 'undefined')//If there's a selected tab
					$('.' + theSelectedTab).removeClass('selected');

				//This adds 'stickiness' to the tabs by stopping the hinding if the same tab is selected within the timeout
				if (me.find('a:not(.active)'))
					clearTimeout(tabDeactivationTimer);

				//Fade in MDD after predefined delay... I know!!
				tabActivationTimer = window.setTimeout(function () {
					me.find('.' + opts.classPrefix + 'section-container').fadeIn(opts.fadeSpeed);
				}, opts.showDelay);
				$(this).find('a').addClass(opts.activeLink);

				//IE6 hack to hide select for z-index fix
				$.ie6HideShowSelect('hidden');

			}, function () {
				if (typeof theSelectedTab != 'undefined')
					$('.' + theSelectedTab).addClass('selected');
				clearTimeout(tabActivationTimer);

				//Hide MDD after predefined delay... tut!!!
				tabDeactivationTimer = window.setTimeout(function () {
					me.find('.' + opts.classPrefix + 'section-container').hide();
				}, opts.hideDelay);
				$(this).find('a').removeClass(opts.activeLink);

				//IE6 hack to show select for z-index fix
				$.ie6HideShowSelect('visible');

			});
		});
	}
})(jQuery);

(function ($) {
	//IE6 hack to hide any selects that overlap dynamic content
	$.ie6HideShowSelect = function (visibility) {
		if ($.browser.msie && $.browser.version == '6.0')
			$('select').css({ 'visibility': visibility });
	};

	//menu plugin from play.com
	$.fn.mainNav2 = function (options) {
		//set default options
		var opts = {
			classPrefix: 'nav-',    // The prefix you are using on your navigation classes to keep them separate from other content
			navID: '#main-nav',    // The id of your navigation bar
			activeLink: 'active',  // The class used for the active tab whilst hovering menu lists
			showDelay: 1000,    // delay time before dropdown shows
			hideDelay: 800,    // delay time before dropdown hides
			fadeSpeed: 100,    // speed of fade in animation
			firstCharCount: 8,    // The amount of characters allowed BEFORE the '&' before a br is added
			lastCharCount: 5,    // The amount of characters allowed AFTER the '&' before a br is added
			mode: 0             //for qamode to be passed in
		};

		//call in the default otions
		var options = $.extend(opts, options);

		//Add a first/last class to the first and last nav tabs for styling
		$(opts.navID + ' li.' + opts.classPrefix + 'parent:first').addClass('first');
		$(opts.navID + ' li.' + opts.classPrefix + 'parent:last').addClass('last');


		//Slightly complex calculation to get the page's left and right boundaries, 
		//simple 'offset' wont work here as that will only find top and/or left positions. The
		//objective is to stop the MDD from displaying outside the page widths
		theBoundary = parseInt($(opts.navID).width());

		$('.' + opts.classPrefix + 'section-container').each(function () {
			var me = $(this),
			sectionBlock = me.find('.' + opts.classPrefix + 'section-block');

			//add first and last classes to the respective 'sections' in each MDD.
			sectionBlock.first().addClass('first');
			sectionBlock.last().addClass('last');

			//Calculate the number of sections in each dropdown times their widths and apply that
			//number to the container because we need to apply a fixed width to the containing element which
			//is absolute so has issues stretching in width to accommodate all 'sections' therein
			var sectionWidth = 0,
			sectionCount = sectionBlock.length,
			theLargestHeight = 0;

			//Didnt like doing this but hey ho! We're finding the last column
			//in each section and applying the last class to it for styling purposes.
			//Then find the largest column height and apply that height to all sections
			//in this container (MDD)
			sectionBlock.each(function () {
				var col = $(this).find('.nav-col');
				col.last().addClass('last');
				/*
				var col = $(this).find('.nav-col'),
				cWidth = 0;

				col.last().addClass('last');
				col.each(function()
				{
				cWidth += parseInt($(this).outerWidth(true));
				});
				//$(this).width(cWidth);
				sectionWidth += parseInt($(this).outerWidth(true));
				*/

				var thisHeight = $(this).height();
				if (thisHeight > theLargestHeight)
					theLargestHeight = thisHeight;
			});

			//sectionBlock.height(theLargestHeight);

			//Cetralize the MDD to its parent tab then if it falls outside the page's boundaries
			//bring it back in by the overlapping amount

			//Get the parent true width and halve it to find the central axis
			var parentWidth = me.parent().outerWidth(true) / 2;

			//me.css({ width: sectionWidth });

			//redefine the new container width
			sectionWidth = me.outerWidth(true);
			me.css({ 'left': parentWidth - (sectionWidth / 2), 'visibility': 'visible' });

			var offset = me.offset().left,
			parentOffset = $(opts.navID).offset().left,
			rightPos = (offset + sectionWidth) - (parentOffset + theBoundary);
			leftPos = parentOffset - offset;

			//Make sure the dropdowns never exceed the page's boundaries
			if (offset + sectionWidth > parentOffset + theBoundary)
				me.css({ marginLeft: -rightPos + 'px' })
			else if (offset < parentOffset)
				me.css({ marginLeft: leftPos + 'px' })

			//Since jQuery cannot calculate heights/widths 'display:none'
			//elements we had to perform all of the above on 'display:block; visibility:hidden'
			//then use jQuery to hide the MDD's
			me.hide();
		});

		//Hover states (Bloddy stupid method!!!!)
		$('.' + opts.classPrefix + 'parent').each(function () {
			var me = $(this),
			tabDeactivationTimer = 0,
			tabActivationTimer = 0;

			//Find the tab which is currently selected and add a temporary class to it.
			//That class is built from that tab's title. We'll use this class to remember
			//which tab should be selected after we hover away from the menu
			if (me.find('a.' + opts.classPrefix + 'title').hasClass('selected')) {
				theSelectedTab = $(this).find('.selected').text().replace(/&/g, 'and'),
				theSelectedTab = theSelectedTab.replace(/ /g, '-').toLowerCase();
				$(this).find('.selected').addClass(theSelectedTab);
			}

			me.hover(
			function () {

				if (typeof theSelectedTab != 'undefined')//If there's a selected tab
					$('.' + theSelectedTab).removeClass('selected');

				//This adds 'stickiness' to the tabs by stopping the hinding if the same tab is selected within the timeout
				if (me.find('a:not(.active)'))
					clearTimeout(tabDeactivationTimer);

				//Fade in MDD after predefined delay... I know!!
				tabActivationTimer = window.setTimeout(function () {
					me.find('.' + opts.classPrefix + 'section-container').fadeIn(opts.fadeSpeed);
					if (me.find('.' + opts.classPrefix + 'section-container.box').html() == "") {
						var loc = me.data("loc");
						var addy = "";
						if (document.URL.toLowerCase().indexOf("/co/") != -1 || document.URL.toLowerCase().indexOf("/ac/") != -1)
							addy = '/co/Menu/MenuAjax.aspx?loc=' + loc + '&mode=' + opts.mode;
						else
							addy = '/ct/Menu/MenuAjax.aspx?loc=' + loc + '&mode=' + opts.mode;
						$.get(addy, function (data) {
							me.find('.' + opts.classPrefix + 'section-container.box').html(data);

							//Need to redo heights and widths after dynamic content is loaded.
							var meDynamic = me.find('.' + opts.classPrefix + 'section-container');
							sectionBlock = meDynamic.find('.' + opts.classPrefix + 'section-block');

							sectionBlock.first().addClass('first');
							sectionBlock.last().addClass('last');

							var sectionWidth = 0,
							sectionCount = sectionBlock.length,
							theLargestHeight = 0,
							backgroundHeight = 0;

							if (me.find('.' + opts.classPrefix + 'section-block.section1-block').length > 0) {
								if (me.find('.' + opts.classPrefix + 'section-block.section2-block').length > 0) {
									me.find('.' + opts.classPrefix + 'section-block.section1-block .nav-col.section1-col').width(790);
									me.find('.' + opts.classPrefix + 'section-block.section2-block, .' + opts.classPrefix + 'section-block.section2-block .' + opts.classPrefix + 'col.section2-col').width(175);
								}
								else
									me.find('.' + opts.classPrefix + 'section-block.section1-block .nav-col.section1-col').width(976);
							}

							sectionBlock.each(function () {
								var col = $(this).find('.nav-col');
								col.last().addClass('last');
								/*
								var col = $(this).find('.nav-col'),
								cWidth = 0;

								col.last().addClass('last');
								col.each(function()
								{
								cWidth += parseInt($(this).outerWidth(true));
								});
								//$(this).width(cWidth);
								sectionWidth += parseInt($(this).outerWidth(true));
								*/
								var thisHeight = $(this).height();
								if (thisHeight > theLargestHeight) {
									theLargestHeight = thisHeight;
									backgroundHeight = theLargestHeight + 30; //add 30 for padding that won't show up in height()
								}
							});
							//needed so the borders are the same height between columns
							sectionBlock.height(theLargestHeight);
							me.find('.' + opts.classPrefix + 'background-container').height(backgroundHeight);
							//meDynamic.css({ width: sectionWidth });
						});
					}
					else {
						//should be set when content is loaded, but if you mouse around and load a couple sometimes
						//it get's confused and the height doesn't get set right, so just always set the height
						sectionBlock = me.find('.' + opts.classPrefix + 'section-container' + ' .' + opts.classPrefix + 'section-block');
						var theLargestHeight = 0;
						sectionBlock.each(function () {
							var thisHeight = $(this).height();
							if (thisHeight < 1) {
								$(this).css("height", "auto");
								thisHeight = $(this).height();
							}
							if (thisHeight > theLargestHeight)
								theLargestHeight = thisHeight;
						});
						sectionBlock.height(theLargestHeight);
						me.find('.' + opts.classPrefix + 'section-container').fadeIn(opts.fadeSpeed);
					}
				}, opts.showDelay);
				$(this).find('a').addClass(opts.activeLink);

				//IE6 hack to hide select for z-index fix
				$.ie6HideShowSelect('hidden');

			}, function () {
				if (typeof theSelectedTab != 'undefined')
					$('.' + theSelectedTab).addClass('selected');
				clearTimeout(tabActivationTimer);

				//Hide MDD after predefined delay... tut!!!
				tabDeactivationTimer = window.setTimeout(function () {
					me.find('.' + opts.classPrefix + 'section-container').hide();
				}, opts.hideDelay);
				$(this).find('a').removeClass(opts.activeLink);

				//IE6 hack to show select for z-index fix
				$.ie6HideShowSelect('visible');

			});
		});
	}
})(jQuery);

(function ($) {
	//IE6 hack to hide any selects that overlap dynamic content
	$.ie6HideShowSelect = function (visibility) {
		if ($.browser.msie && $.browser.version == '6.0')
			$('select').css({ 'visibility': visibility });
	};

	//menu plugin from play.com
	$.fn.mainNav3 = function (options) {
		//set default options
		var opts = {
			classPrefix: 'nav-',    // The prefix you are using on your navigation classes to keep them separate from other content
			navID: '#main-nav',    // The id of your navigation bar
			activeLink: 'active',  // The class used for the active tab whilst hovering menu lists
			showDelay: 1000,    // delay time before dropdown shows
			hideDelay: 800,    // delay time before dropdown hides
			fadeSpeed: 100,    // speed of fade in animation
			firstCharCount: 8,    // The amount of characters allowed BEFORE the '&' before a br is added
			lastCharCount: 5,    // The amount of characters allowed AFTER the '&' before a br is added
			mode: 0             //for qamode to be passed in
		};

		//call in the default otions
		var options = $.extend(opts, options);

		//Add a first/last class to the first and last nav tabs for styling
		$(opts.navID + ' li.' + opts.classPrefix + 'parent:first').addClass('first');
		$(opts.navID + ' li.' + opts.classPrefix + 'parent:last').addClass('last');


		//Slightly complex calculation to get the page's left and right boundaries, 
		//simple 'offset' wont work here as that will only find top and/or left positions. The
		//objective is to stop the MDD from displaying outside the page widths
		theBoundary = parseInt($(opts.navID).width());

		$('.' + opts.classPrefix + 'section-container').each(function () {
			var me = $(this),
			sectionBlock = me.find('.' + opts.classPrefix + 'section-block');

			//add first and last classes to the respective 'sections' in each MDD.
			sectionBlock.first().addClass('first');
			sectionBlock.last().addClass('last');

			//Calculate the number of sections in each dropdown times their widths and apply that
			//number to the container because we need to apply a fixed width to the containing element which
			//is absolute so has issues stretching in width to accommodate all 'sections' therein
			var sectionWidth = 0,
			sectionCount = sectionBlock.length,
			theLargestHeight = 0;

			//Didnt like doing this but hey ho! We're finding the last column
			//in each section and applying the last class to it for styling purposes.
			//Then find the largest column height and apply that height to all sections
			//in this container (MDD)
			sectionBlock.each(function () {
				var col = $(this).find('.nav-col');
				col.last().addClass('last');

				var thisHeight = $(this).height();
				if (thisHeight > theLargestHeight)
					theLargestHeight = thisHeight;
			});

			//Cetralize the MDD to its parent tab then if it falls outside the page's boundaries
			//bring it back in by the overlapping amount

			//Get the parent true width and halve it to find the central axis
			var parentWidth = me.parent().outerWidth(true) / 2;

			//redefine the new container width
			sectionWidth = me.outerWidth(true);
			me.css({ 'left': parentWidth - (sectionWidth / 2), 'visibility': 'visible' });

			var offset = me.offset().left,
			parentOffset = $(opts.navID).offset().left,
			rightPos = (offset + sectionWidth) - (parentOffset + theBoundary);
			leftPos = parentOffset - offset;

			//Make sure the dropdowns never exceed the page's boundaries
			if (offset + sectionWidth > parentOffset + theBoundary)
				me.css({ marginLeft: -rightPos + 'px' })
			else if (offset < parentOffset)
				me.css({ marginLeft: leftPos + 'px' })

			if (me.find('.' + opts.classPrefix + 'section-block.section1-block .nav-col.section1-col .section1-item.alternateStyle').length > 0)
				me.css('border-bottom', '2px solid #000');

			//Since jQuery cannot calculate heights/widths 'display:none'
			//elements we had to perform all of the above on 'display:block; visibility:hidden'
			//then use jQuery to hide the MDD's
			me.hide();
		});

		//Hover states (Bloddy stupid method!!!!)
		$('.' + opts.classPrefix + 'parent').each(function () {
			var me = $(this),
			tabDeactivationTimer = 0,
			tabActivationTimer = 0;

			//Find the tab which is currently selected and add a temporary class to it.
			//That class is built from that tab's title. We'll use this class to remember
			//which tab should be selected after we hover away from the menu
			if (me.find('a.' + opts.classPrefix + 'title').hasClass('selected')) {
				theSelectedTab = $(this).find('.selected').text().replace(/&/g, 'and'),
				theSelectedTab = theSelectedTab.replace(/ /g, '-').toLowerCase();
				$(this).find('.selected').addClass(theSelectedTab);
			}

			//Need to redo heights and widths after dynamic content is loaded.
			var meDynamic = me.find('.' + opts.classPrefix + 'section-container');
			sectionBlock = meDynamic.find('.' + opts.classPrefix + 'section-block');

			sectionBlock.first().addClass('first');
			sectionBlock.last().addClass('last');

			var sectionWidth = 0,
			sectionCount = sectionBlock.length,
			theLargestHeight = 0,
			backgroundHeight = 0;

			if (me.find('.' + opts.classPrefix + 'section-block.section1-block').length > 0) {
				if (me.find('.' + opts.classPrefix + 'section-block.section2-block').length > 0) {
					if (me.find('.' + opts.classPrefix + 'section-block.section1-block .nav-col.section1-col .section1-item.alternateStyle').length > 0) {
						//alternateStyle
						me.find('.' + opts.classPrefix + 'section-block.section1-block').css('padding-left', '0');
						me.find('.' + opts.classPrefix + 'section-block.section1-block .nav-col.section1-col').width(830);
						me.find('.' + opts.classPrefix + 'section-block.section2-block, .' + opts.classPrefix + 'section-block.section2-block .' + opts.classPrefix + 'col.section2-col').width(145);
					}
					else {
						me.find('.' + opts.classPrefix + 'section-block.section1-block .nav-col.section1-col').width(790);
						me.find('.' + opts.classPrefix + 'section-block.section2-block, .' + opts.classPrefix + 'section-block.section2-block .' + opts.classPrefix + 'col.section2-col').width(175);
					}
				}
				else
					me.find('.' + opts.classPrefix + 'section-block.section1-block .nav-col.section1-col').width(976);
			}

			sectionBlock.each(function () {
				var col = $(this).find('.nav-col');
				col.last().addClass('last');
				//show and hide or height can't be gotten, and we gotta get it gotten
				me.find('.' + opts.classPrefix + 'section-container').css('visibility', 'hidden').show();
				var thisHeight = $(this).height();
				me.find('.' + opts.classPrefix + 'section-container').css('visibility', 'visible').hide();
				if (thisHeight > theLargestHeight) {
					theLargestHeight = thisHeight;
					backgroundHeight = theLargestHeight + 30; //add 30 for padding that won't show up in height()
				}
			});
			//needed so the borders are the same height between columns
			sectionBlock.height(theLargestHeight);
			me.find('.' + opts.classPrefix + 'background-container').height(backgroundHeight);

			me.hover(
			function () {

				if (typeof theSelectedTab != 'undefined')//If there's a selected tab
					$('.' + theSelectedTab).removeClass('selected');

				//This adds 'stickiness' to the tabs by stopping the hinding if the same tab is selected within the timeout
				if (me.find('a:not(.active)'))
					clearTimeout(tabDeactivationTimer);

				//Fade in MDD after predefined delay... I know!!
				tabActivationTimer = window.setTimeout(function () {
					me.find('.' + opts.classPrefix + 'section-container').fadeIn(opts.fadeSpeed);
				}, opts.showDelay);
				$(this).find('a').addClass(opts.activeLink);

				//IE6 hack to hide select for z-index fix
				$.ie6HideShowSelect('hidden');

			}, function () {
				if (typeof theSelectedTab != 'undefined')
					$('.' + theSelectedTab).addClass('selected');
				clearTimeout(tabActivationTimer);

				//Hide MDD after predefined delay... tut!!!
				tabDeactivationTimer = window.setTimeout(function () {
					me.find('.' + opts.classPrefix + 'section-container').hide();
				}, opts.hideDelay);
				$(this).find('a').removeClass(opts.activeLink);

				//IE6 hack to show select for z-index fix
				$.ie6HideShowSelect('visible');

			});
		});
	}
})(jQuery);

function checkSubscribeEmail() {
	if ($("#subscribeToEmailForm .subscribeText").val() == "") {
		alert("You must provide your email address!");
		return false;
	}
	if ($("#subscribeToEmailForm .subscribeText").val().indexOf("@") + "" == "-1" || $("#subscribeToEmailForm .subscribeText").val().indexOf(".") + "" == "-1") {
		alert("The email address you entered does not have a valid\nsyntax.  Please re-enter the address and try again.");
		return false;
	}
	return true;
}

function setsubscribeEmailText(p_blnBlur) {
	if (!p_blnBlur && $("#EmailAddr").val() == "Sign up for email")
		$("#EmailAddr").val("");
	else if (p_blnBlur && $("#EmailAddr").val() == "")
		$("#EmailAddr").val("Sign up for email");

}

function checkfields2() {
	if ($("#header .header-sign-up .text input").val() == "") {
		alert("You must provide your email address!");
		return false;
	}
	if ($("#header .header-sign-up .text input").val().indexOf("@") + "" == "-1" || $("#header .header-sign-up .text input").val().indexOf(".") + "" == "-1") {
		alert("The email address you entered does not have a valid\nsyntax.  Please re-enter the address and try again.");
		return false;
	}
	return true;
}

//From ct FeaturedProduct
//the function is a little bit confusing to use, but it's better than having one function for each popup
function togglePopup(p_strDivID, p_strLeftElementID, p_strTopElementID, p_intLeftOffset, p_intTopOffset, p_strSetLeft, p_strSetTop, p_strParams, p_blnShowPopup) {
	if (p_blnShowPopup == null)
		p_blnShowPopup = true;

	hidePopups(p_strDivID);
	if ($("#" + p_strDivID).length < 1) {
		$.get('/PR/PopupMessageAjax.aspx?' + p_strParams, function (data) {
			$("#divPopupsGoHere").append(data);

			if (p_blnShowPopup) {
				setPosition(p_strDivID, p_strLeftElementID, p_strTopElementID, p_intLeftOffset, p_intTopOffset, p_strSetLeft, p_strSetTop);
				$("#" + p_strDivID).show();
			}
		});
	}
	else if (p_blnShowPopup) {
		setPosition(p_strDivID, p_strLeftElementID, p_strTopElementID, p_intLeftOffset, p_intTopOffset, p_strSetLeft, p_strSetTop);
		$("#" + p_strDivID).toggle();
	}
}

function setPosition(p_strDivID, p_strLeftElementID, p_strTopElementID, p_intLeftOffset, p_intTopOffset, p_strSetLeft, p_strSetTop) {
	var objOffSetMain = null;
	var objLeftOffSetElement = $("#" + p_strLeftElementID).offset();
	var objTopOffSetElement = null;
	var strTop = "";
	var strLeft = "";

	if ($("#pr-main").length > 0)
		objOffSetMain = $("#pr-main").offset();
	else if ($("#main").length > 0)
		objOffSetMain = $("#main").offset();
	else
		objOffSetMain = $("div:first").offset();

	if (p_strSetTop == "" || p_strSetTop == null) {
		if (p_strTopElementID)
			objTopOffSetElement = $("#" + p_strTopElementID).offset();

		if (objTopOffSetElement)
			strTop = (objTopOffSetElement.top + p_intTopOffset) + "px";
		else
			strTop = (objLeftOffSetElement.top + p_intTopOffset) + "px";
	}
	else
		strTop = p_strSetTop;

	if (p_strSetLeft == "" || p_strSetLeft == null)
		strLeft = ((objLeftOffSetElement.left - objOffSetMain.left) + p_intLeftOffset) + "px";
	else
		strLeft = p_strSetLeft;

	$("#" + p_strDivID).css("left", strLeft).css("top", strTop);
}

//finds left and top position of an element
function findPos(obj) {
	var curleft = curtop = 0;

	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}

	return [curleft, curtop];
}

function hidePopups(p_strExcludeID) {
	if (p_strExcludeID != "divAlsoAvailablePopup" && $("#divAlsoAvailablePopup").filter(":visible").length != 0)
		$("body").unbind("click");

	if (p_strExcludeID && p_strExcludeID != "")
		$("div.popup-info-box").not("#" + p_strExcludeID).hide();
	else
		$("div.popup-info-box").hide();
}

function addPopupMouseOut(p_strElementID) {
	$("#" + p_strElementID).unbind("mouseover").unbind("mouseout").removeAttr("onmouseover").removeAttr("onmouseout");
	$("#" + p_strElementID).bind("mouseout", function (e) {
		if (!e) var e = window.event;
		var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
		while (reltg && reltg.tagName != 'BODY') {
			if (reltg.id == this.id) { return; }
			reltg = reltg.parentNode;
		}

		hidePopups(null);
	});
}

function setAlsoAvailable(qsSku) {
	if ($("#divAlsoAvailablePopup").filter(":visible").length == 0) {
		togglePopup('divAlsoAvailablePopup', 'anchorAlsoAvailable', null, -100, 15, null, null, 'pw=ThreeHundred&pn=AlsoAvailable&sku=' + qsSku, true);
		var temp = window.setTimeout(function () { addAlsoAvailableFocusCheck(); }, 100);
	}
}

function addAlsoAvailableFocusCheck() {
	$("body").unbind("click").bind("click", function (e) {
		if (e) {
			var targ;
			if (e.target) targ = e.target;
			else if (e.srcElement) targ = e.srcElement;
			if (targ.nodeType == 3) targ = targ.parentNode;
			if ($(targ).closest("#divAlsoAvailablePopup").length == 0) {
				$('#divAlsoAvailablePopup').hide();
				$("body").unbind("click");
			}
		}
	});
}

function koboProductClick(url) {
	hidePopups(null);
	var prKoboCookie = GetCookie("prShowKoboDesc");
	if (prKoboCookie == "0")
		window.location = url + "?utm_source=buydotcom&utm_medium=web&utm_campaign=retailer";
	else {
		togglePopup('divKoboEditionPopup', 'whatsThisKobo', null, -250, -150, null, null, 'pw=SevenHundred&pn=KoboEditionDesc&kpl=' + url, true);
		$('#spanKoboPopupButtons').show();
	}
}

function koboProductClickContinue(url) {
	if ($("#chkKoboShowDesc").is(':checked')) {
		var prKoboCookie = GetCookie("prShowKoboDesc");
		var exdate = new Date();
		exdate.setTime(exdate.getTime() + (1000 * 60 * 60 * 24 * 30));
		document.cookie = "prShowKoboDesc=0;expires=" + exdate.toGMTString() + ";path=/";
	}

	window.location = url + "?utm_source=buydotcom&utm_medium=web&utm_campaign=retailer";
}

function disableEnterKey(e) {
	var key;
	if (window.event)
		key = window.event.keyCode; //IE
	else
		key = e.which; //firefox      

	return (key != 13);
}
//END From ct FeaturedProduct

$(function () {
	var $window = $(window),
				$images = $('img.deferred'),
				preLoadHeight = 100;
	$window.scroll(function (e) {
		var bottomEdge = $window.scrollTop() + $window.height();
		for (var i = $images.length - 1; i >= 0; i--) {
			var $image = $images.eq(i);
			if ($image.offset().top < bottomEdge + preLoadHeight) {
				$image.attr('src', $image.data('src'));
				$images.splice(i, 1);
			}
		}
		if ($images.length === 0) {
			$window.unbind(e);
		}
	});
	//trigger the function once to show visible items
	$window.scroll();
});

$(document).ready(function () {
	var qaMode = 0;

	var url = window.location.href.toLowerCase();

	if (url.indexOf("qamode=3") != -1)
		qaMode = 3

	$('#main-nav').mainNav3({
		//custom parameters
		showDelay: 200,
		hideDelay: 200,
		fadeSpeed: 200,
		mode: qaMode
		//mode: <%= qaMode ? "3" : "0" %>
	});

	var qsSiteId = qs["siteid"];
	if (qsSiteId != null && qsSiteId != "") {
		qsSiteId = qsSiteId.split('-');
		qsSiteId = qsSiteId[0];
		if (qsSiteId == "AysPbYF8vuM" || qsSiteId == ".7WaaTN6umc")
			showBigWelcomeMessage(qsSiteId);
	}
});

function ProductViewHistorySlider(targetDivId, pagetitle, numVisibleSlides) {
	var recentProdViews = GetCookie("prViewHistory");
	if (recentProdViews != "null" && recentProdViews != "") {
		var prodViewDate = new Date();
		$(window).scroll(function (e) {
			var container = '#' + targetDivId;
			var url = '/pr/ProductViewHistory.aspx?skus=' + recentProdViews + '&guid=' + prodViewDate.getTime() + '&om_pagetitle=' + pagetitle;

			if (numVisibleSlides == 4)
				url += '&layout=partialwidth';

			var position = $(container).offset().top;
			var scllwidth = $(window).scrollTop() + $(window).height();
			if (scllwidth > position) {
				$.get(url, function (data) { $(container).css("opacity", "0").html(data).animate({ opacity: '1' }); });
				$(window).unbind(e);
			}
		});
	}
}

var cartHideTimer = 0;
$(document).ready(function () {
	//attach hover function to cart in header
	$("#divCartHoverContainer").hover(function () { clearTimeout(cartHideTimer); loadHoverCartItems(); s.tl(true, 'o', 'header_cart_view'); }, function () { cartHideTimer = window.setTimeout(function () { $("#divCartItemsContainer").slideUp(); }, 1000); });
});
function loadHoverCartItems() {
	if ($("#divCartItemsContainer:visible").length == 0) {
		var guid = "?banana=" + guidGenerator();
		$.get("/ct/cart/cart.aspx" + guid, function (data) { $("#cartItems").html(data); $("#divCartItemsContainer").slideDown(); });
	}
}

function loadCartItems() {
	if ($("#divCartItemsContainer:visible").length == 0) {
		// removed <%=GlobalVars.BuyDomain %> from  $.get
		var guid = "?banana=" + guidGenerator();
		$.get("/ct/cart/cart.aspx" + guid, function (data) { $("#cartItems").html(data); $("#divCartItemsContainer").slideDown(); });
	}
	else
		$("#divCartItemsContainer").slideUp();
}

function addHeaderPopupFocusCheck(name) {
	$("body").unbind("click").bind("click", function (e) {
		if (e) {
			var selector = "";
			if (name == "help")
				selector = "#headerHelpDropDown";
			else if (name == "account")
				selector = "#headerAccountDropDown";
			else if (name == "signup")
				selector = "#header .header-sign-up";
			var targ;
			if (e.target) targ = e.target;
			else if (e.srcElement) targ = e.srcElement;
			if (targ.nodeType == 3) targ = targ.parentNode;
			if ($(targ).closest(selector).length == 0) {
				if (name == "help")
					$('#headerHelpDropDown').hide();
				else if (name == "account")
					$('#headerAccountDropDown').hide();
				else if (name == "signup") {
					$("#header .header-sign-up").hide();
					$('#signUpOverlay').hide();
				}
				$("body").unbind("click");
			}
		}
	});
}

function toggleHeaderSignUp() {
	if ($("#signUpOverlay").filter(":visible").length == 0) {
		$("#signUpOverlay").show();
		$("#header .header-sign-up").fadeIn();
		var temp = window.setTimeout(function () { addHeaderPopupFocusCheck("signup"); }, 100);
	}
}

function closeHeaderSignUp() {
	$("#header .header-sign-up").hide();
	$("#signUpOverlay").hide();
	$("body").unbind("click");
}

function guidGenerator() {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

$(function () {
	if (GetCookie('GuestBasketSession') != 'null') {
		$('#headerSignInName').html("Guest");
		$("#headerAccountLogIO").html("Sign In").click(function () {
			s.tl(this, 'o', 'header_ddAccount_SignIn');
			window.location = 'https://secure.rakuten.com/AC/loginAccount.aspx?ReturnUrl=myaccount.aspx';
		});
	}
	else if (GetCookie('buyname') != 'null' && GetCookie('buyname') != '') {
		$('#headerSignInName').html(formatCustomerName(GetCookie('buyname'), 9));
		$("#headerAccountLogIO").html("Sign Out").click(function () {
			s.tl(this, 'o', 'header_ddAccount_SignIn');
			deleteBasketCookie(-1);
		});
	}
	else {
		$('#headerSignInName').html("Login");
		$("#headerAccountLogIO").html("Sign In").click(function () {
			s.tl(this, 'o', 'header_ddAccount_SignIn');
			window.location = 'https://secure.rakuten.com/AC/loginAccount.aspx?ReturnUrl=myaccount.aspx';
		});
	}

	var HeaderCartInfo, HeaderCartData;
	HeaderCartInfo = GetCookie('headerTotal');
	HeaderCartData = HeaderCartInfo.split("|");

	if (mac && navigator.userAgent.indexOf("MSIE") > -1) { }
	else {
		if (HeaderCartInfo != "null" && HeaderCartData[1] != 0) {
			if ($('#viewCartItems').length != 0)
				$('#viewCartItems').show();
			$('#cart-item-count').html("(" + HeaderCartData[1] + ")");
		}
		else
			$('#cart-item-count').html("(0)");
	}

	//common
	var superptsShopper = GetCookie('BuyShopperID');
	var buyName = GetCookie('buyname')

	// SuperPoints message
	var superptsCookie = GetCookie('buyrs');
	var superptsVal = "0";

	if (buyName != 'null') {
		if (superptsCookie != "null") {
			superptsVal = superptsCookie;
			if (superptsVal != "0") {
				$('#headerSuperPoint').html("<div class=\"superpts-holder\"><span class=\"superpts\"><a href=\"https://secure.rakuten.com/AC/Account/SuperPoints.aspx\" onclick=\"s.tl(this,'o','header_Points_ViewPoints');\" class=\"alert\">You Have <b>" + superptsVal + "</b> Super Points!</a></span></div>");
				$('#headerSignInName').html("Hello");
			}
			else
				$('#headerSuperPoint').html("<div class=\"superpts-holder\"><span class=\"superpts\"><a href=\"http://www.rakuten.com/ct/Rakutensuperpoint/default.aspx\" onclick=\"s.tl(this,'o','header_Points_GetPoints');\" class=\"alert\">Get Rakuten Super Points&trade;</a></span></div>");
		}
		else {
			$.getJSON("https://secure.rakuten.com/AC/rsservice.asmx/GetPoints?id=" + superptsShopper + "&callback=?",
			function (data) {
				superptsVal = data.Available;

				var superptsDate = new Date();
				superptsDate.setTime(superptsDate.getTime() + (7 * 24 * 60 * 60 * 1000));
				var superptsExpires = "; expires=" + superptsDate.toGMTString();
				document.cookie = "buyrs=" + superptsVal + superptsExpires + "; domain=rakuten.com; path=/";
				if (superptsVal != "0") {
					$('#headerSuperPoint').html("<div class=\"superpts-holder\"><span class=\"superpts\"><a href=\"https://secure.rakuten.com/AC/Account/SuperPoints.aspx\" onclick=\"s.tl(this,'o','header_Points_ViewPoints');\" class=\"alert\">You Have <b>" + superptsVal + "</b> Super Points!</a></span></div>");
					$('#headerSignInName').html("Hello");
				}
				else
					$('#headerSuperPoint').html("<div class=\"superpts-holder\"><span class=\"superpts\"><a href=\"http://www.rakuten.com/ct/Rakutensuperpoint/default.aspx\" onclick=\"s.tl(this,'o','header_Points_GetPoints');\" class=\"alert\">Get Rakuten Super Points&trade;</a></span></div>");
			});
		}
	}
	else {
		$('#headerSuperPoint').html("<div class=\"superpts-holder\"><span class=\"superpts\"><a href=\"http://www.rakuten.com/ct/Rakutensuperpoint/default.aspx\" onclick=\"s.tl(this,'o','header_Points_GetPoints');\" class=\"alert\">Get Rakuten Super Points&trade;</a></span></div>");
	}

	// NEW SuperPoints Expiration dropdown
	var expiringPoints = GetCookie("ExpiringPoints");

	if (buyName == 'null') {
		// the user is not logged in, make sure that the ExpiringPoints cookie is cleared so the next user will see their own data
		if (expiringPoints != 'null')
			document.cookie = 'ExpiringPoints=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=rakuten.com; path=/';
	}
	else {
	if (expiringPoints != 'null') {
		showSuperPointsExpiration(expiringPoints);
	}
		else {
			$.getJSON("https://secure.rakuten.com/AC/rsservice.asmx/GetExpiringPoints?shopperID=" + superptsShopper + "&expiringWithin=5&callback=?",
			function (data) {
				// calling the webservice will write the data directly to the cookie
				showSuperPointsExpiration(GetCookie("ExpiringPoints"));
			});
		}
	}
});

/****************************************************************************************************************
Function: showSuperPointsExpiration
Expects: the imput will be in this format  5|50,4|40,3|30,2|20,1|10  that will be split into n pairs
where the first digit is the number of days before the second digit number of points will expire
****************************************************************************************************************/
function showSuperPointsExpiration(expiringPoints) {
	var html = "";
	var expCount = 0;

	if (expiringPoints != 'null' && expiringPoints.length > 2) {
		var dataSets = expiringPoints.split(',');

		if (dataSets != 'null' && dataSets.length > 0) {
			var expList = "";

			for (var i = dataSets.length - 1; i >= 0; i--) {
				var dataValues = dataSets[i].split('|');

				if (dataValues != 'null' && dataValues[1] != '0') {
					var spText = "";

					if (dataValues[1] == "1")
						spText = "1 Super Point Expires ";
					else
						spText = dataValues[1] + " Super Points Expire ";

					if (html == "") {
						html = "<a href=\"https://secure.rakuten.com/AC/Account/SuperPoints.aspx\" class=\"super-pts-exp-drop-link\">" + spText;

						if (dataValues[0] == "1")
							html += "Today!</a>";
						else if (dataValues[0] == "2")
							html += "Tomorrow!</a>";
						else
							html += "in " + dataValues[0] + " Days!</a>";
					}

					expList += "<div class=\"super-pts-exp-text\">" + spText;

					if (dataValues[0] == "1")
						expList += "Today!</div>";
					else if (dataValues[0] == "2")
						expList += "Tomorrow!</div>";
					else
						expList += "in " + dataValues[0] + " Days!</div>";

					expCount++;
				}
			}

			if (expCount > 1) {
				html += "<div id=\"headerSuperPtsExpDropDown\" class=\"header-super-pts-exp\">";
				html += expList;
				html += "<div class=\"super-pts-exp-link\" onclick=\"window.location='https://secure.rakuten.com/AC/Account/SuperPoints.aspx';\">Show My Super Points Balance</div>";
				html += "<div class=\"super-pts-exp-link\" onclick=\"window.location='http://www.rakuten.com/ct/Rakutensuperpoint';\">View Current Super Points Campaigns</div>";
				html += "</div>";
			}
		}
	}

	if (html == "") {
		$('#headerSuperPointExpiration').hide();
	}
	else {
		$('#headerSuperPointExpiration').html(html);
		if (expCount > 1) {
			$('#headerSuperPointExpiration').attr('class', 'li-drop');

			// left align dropdown with title box above
			var spPos = $("#headerSuperPointExpiration").position();
			$("#headerSuperPtsExpDropDown").css("left", spPos.left);
		}
		$('#headerSuperPointExpiration').show();
	}
}

/* Square Trade Begin */
function onSquareTradeWarrantySelect(warrantySku, index, useCartSelector) {
	//not on product page so don't add to add to cart button
	if (!useCartSelector) {
		if (warrantySku && $("#sqCheckbox" + index).is(':checked'))
			$("#mainCartLink").data("warrantySku", warrantySku);
		else
			$("#mainCartLink").removeData("warrantySku");
	}
	else {
		if (warrantySku && $("#addToCart #sqCheckbox" + index).is(':checked'))
			$("#aSquareTradeAddButton").data("warrantySku", warrantySku);
		else
			$("#aSquareTradeAddButton").removeData("warrantySku");
	}

	var parentSelector = "";
	if (useCartSelector)
		parentSelector = "#addToCart ";

	if (index == 1)
		$(parentSelector + " #sqCheckbox2").attr('checked', false);
	else
		$(parentSelector + " #sqCheckbox1").attr('checked', false);
}

function selectSquareTradeWarranty() {
	var selectedWarranty = $("#divSquareTradePop .btn-select-plan").data("selectedWarranty");
	var useCartSelector = $("#divSquareTradePop .btn-select-plan").data("useCartSelector");
	var warrantySku = $("#divSquareTradePop .btn-select-plan").data("warrantySku");
	if (selectedWarranty != null && selectedWarranty != "") {
		//I was just calling click() to check and automatically call onclick, but for some reason then is(':checked') wasn't working
		//correctly in the onclick function on chrome, manually checking and calling function now
		if (useCartSelector == true || useCartSelector == "true") {
			$("#addToCart #sqCheckbox" + selectedWarranty).attr('checked', true);
			onSquareTradeWarrantySelect(warrantySku, selectedWarranty, true);
		}
		else {
			$("#sqCheckbox" + selectedWarranty).attr('checked', true);
			onSquareTradeWarrantySelect(warrantySku, selectedWarranty, false);
		}

		$('#divSquareTradePop').rakboxclose();
	}
}

function openSquareTradePopup(warrantySku, index, useCartSelector) {
	$('#divSquareTradePop .btn-select-plan').data('selectedWarranty', index).data('useCartSelector', useCartSelector).data('warrantySku', warrantySku);
	$('#divSquareTradePop').rakboxopen();
}

function addSquareTradeWarrantyToCart(sku) {
	var addItemLink = "http://cart.rakuten.com/CO/basket/cartservice.aspx?";
	var qs = "";
	var warrantySku = "";

	warrantySku = $("#aSquareTradeAddButton").data("warrantySku");

	if (warrantySku != "" && warrantySku != undefined && warrantySku != 'undefined') {
		if (location.host.indexOf("beta.rakuten.com") > -1)
			addItemLink = "http://cart.beta.rakuten.com/CO/basket/cartservice.aspx?";
		else if (location.host.indexOf("test.rakuten.com") > -1)
			addItemLink = "http://cart.test.rakuten.com/CO/basket/cartservice.aspx?";

		$.ajax({
			url: addItemLink + "warrantySku=" + warrantySku + "|" + sku,
			dataType: 'jsonp',
			jsonpCallback: 'warrantyAddCallback'
		});
	}
	else
		$('#addToCart #divSquareTrade #divSquareTradeMessage').html("Please select a warranty to be added.");
};

function warrantyAddCallback(data) {
	var obj = eval('(' + data + ')');

	if (obj.data.status != "1" || obj.data.msg.length > 0)
		$('#addToCart #divSquareTrade').html("<div class=\"st-cart-message\">ERROR: Square Trade warranty was unable to be added.</div>");
	else
		$('#addToCart #divSquareTrade').html("<div class=\"st-cart-message\">Thank you.<br>Your Square Trade warranty has been added to your product. You can view the details or make changes in your cart.</div>");
}
/* Square Trade End */

function overlayClickCloseCart() {
	if ($("#addToCart .recent-item-container").length > 0) {
		try {
			$('#addToCart').effect(
				'transfer',
				{ to: '#mycart-holder', className: 'ui-effects-transfer' },
				500,
				function () {
					$('#addItemOverlay').hide();
					$('#addToCart').hide();
					prAnimateCart(myCartItemCount);
				}
			);
		}
		catch (err) { /* make like a tree and get out of here */ }
	}
}

/* jquery dialog control - start*/
//OPTIONS LIST - http://api.jqueryui.com/1.8/dialog/
//USE rakboxopen() AND rakboxclose() TO OPEN AND CLOSE
$.fn.rakbox = function (options) {
	options = $.extend({}, $.fn.rakbox.defaultOpts, options || {});
	return this.each(function () {
		//clicking on overlay will close dialog
		var id = $(this).attr("id");
		//adding here because in defaultOpts 'this' is undefined so you can't get an id or element to close the dialog
		options.open = function () {
			$('.ui-widget-overlay').bind("click", function () {
				$('#' + id).dialog("close");
			});
		};

		$(this).dialog(options);
	});
};
$.fn.rakbox.defaultOpts = {
	autoOpen: false,
	closeOnEscape: true,
	modal: true,
	maxWidth: 1000
};
$.fn.rakboxopen = function () { $(this).dialog('open'); };
$.fn.rakboxclose = function () { $(this).dialog('close'); };
$.fn.rakboxdestroy = function () { $(this).dialog('destroy'); };
/* jquery dialog control - end*/




// Added by Daniel 3/3/2014
function isRakutenCardholder() {
	var _id = GetCookie('BuyShopperID') || '';
	if (_id == 'null' || _id == 'undefined') _id = '';
	var _holder = GetCookie('buy.rakutencardholder') || '';
	if (_holder == 'null' || _holder == 'undefined') _holder = '';
	return _id.length > 0 && _holder.length > 0 && _id == _holder;
}

function formatAsCurrency(input, c, d, t) {
	if (isNaN(input))
		input = parseFloat(input);
	var n = input,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


// Added by Daniel to fix "qs" being null 11/14/2014
var qs = {};
var qps = window.location.search.substring(1).split('&');
for (var i = 0, j = qps.length; i < j; i++) {
	var p = qps[i].split('=');
	var v = p[1];
	qs[decodeURIComponent(p[0]).toLowerCase()] = v ? decodeURIComponent(v) : null;
}
// End Daniel

function showBigWelcomeMessage(siteId) {
	if (siteId != null && siteId != "") {
		var image = "";
		if (siteId == "AysPbYF8vuM") //ebates
			image = "http://ast1.r10.io/buy_assets/homepage/images/ebates_logo_102x62.png";
		else if (siteId == ".7WaaTN6umc") //fatwallet
			image = "http://ast1.r10.io/buy_assets/homepage/images/fatwallet_logo_102x62.png";

		if (image != "") {
			var htmlblob = "<div id='divBigWelcomeContainer' class='bigWelcomeContainer'><div class='bigWelcomeMessage'><div class='bigWelcomeText'>Welcome</div>"
			+ "<div><img src='" + image + "' alt='Welcome!' /></div><div class='bigWelcomeText'>Customer!</div></div></div>";
			$("body").prepend(htmlblob);
			var temp1 = window.setTimeout(function () { $("#divBigWelcomeContainer").slideDown(); }, 500);
		}
	}
}