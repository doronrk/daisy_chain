/***
 * jQuery Function - Format
 * Info : Replaces {n} placeholders with arguments.
 * Ex: $.format("Hello {0}, this is {1}","Joe","Sam");
 **/
(function($) {
	$.format = function(source, params) {
		if (arguments.length == 1)
			return function() {
				var args = jQuery.makeArray(arguments);
				args.unshift(source);
				return $.validator.format.apply(this, args);
			};
		if (arguments.length > 2 && params.constructor != Array) {
			params = $.makeArray(arguments).slice(1);
		}
		if (params.constructor != Array) {
			params = [params];
		}
		$.each(params, function(i, n) {
			source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
		});
		return source;
	};
})(jQuery);
/***
 * jQuery Plug-in - customStyle
 * Info :
 * Ex: $('#some-id').customStyle();
 **/
(function($){
$.fn.extend({

	customStyle : function(options) {
		if(!$.browser.msie || ($.browser.msie&&$.browser.version>6)) {

			return this.each(function() {
				var currentSelected = $(this).find(':selected');
				$(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">'+currentSelected.text()+'</span><span class="customStyleSelectArrow"></span></span>').css({position:'absolute', opacity:0,fontSize:$(this).next().css('font-size')});
				var selectBoxSpan = $(this).next();
				var selectBoxWidth = parseInt($(this).width()) - parseInt(selectBoxSpan.css('padding-left')) -parseInt(selectBoxSpan.css('padding-right'));
				var selectBoxSpanInner = selectBoxSpan.find(':first-child');
				selectBoxSpan.css({display:'inline-block'});
				selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
				var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
				$(this).height(selectBoxHeight).change(function(){
					// selectBoxSpanInner.text($(this).val()).parent().addClass('changed');   This was not ideal
				selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
					// Thanks to Juarez Filho & PaddyMurphy
				});
			});
		}
	}
});
})(jQuery);
/***
* function : Parse Boolean
**/
parseBoolean = function (string) {
    switch (string.toLowerCase()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case "": case null: return false;
        default: return Boolean(string);
    }
};

/***
* jQuery Plugin – scroll
* author: Samuel GUINÉ
**/
(function ($) {
    jQuery.fn.scroll = function () {
        return this.each(function () {
            $('html, body').animate({ scrollTop: $(this).offset().top });
        });
    };
})(jQuery);

/***
* jQuery Plugin – OpenPopup
* author: Samuel GUINÉ
**/
(function ($) {
    jQuery.fn.OpenPopup = function (name, width, height) {
        return this.each(function () {
            $(this).click(open);
        });
        function open() {
            var params = $.format("width={0},height={1},resizable=0,toolbar=0,scrollbars=0,status=0,menubar=0", width, height);
            window.open($(this).attr("href"), name, params);
            return false;
        }
    };
})(jQuery);

/***
* jQuery Plugin – clickServer
* author: Samuel GUINÉ
**/
(function ($) {
    jQuery.fn.clickServer = function () {
        return this.each(function () {
            $(this).click(eventHref).click();
        });
        function eventHref(ev) {
            if (!ev.isDefaultPrevented()) {
                $(location).attr("href", this.href);
            }
        }
    };
})(jQuery);

/***
* jQuery Plugin – keyPressEnter
* author: Samuel GUINÉ
* Ex : $("#checkout_register INPUT").keyPressEnter("A[id$='submitregister']");
**/
(function ($) {
    jQuery.fn.keyPressEnter = function (submit) {
        var $submit = $(submit).eq(0);
        if (!$submit.length) {
            return this;
        }
        return this.each(function () {
            //Make sure we're dealing with text-based form fields
            if (this.type != "text" && this.type != "password" && this.type != "textarea")
                return;
            $(this).keypress(keyPressEnter);
        });
        function keyPressEnter(ev) {
            if (ev.which == 13) {
                $(this).blur(); //Blur to execute action like hidden_login
                $submit.unbind('click.keyPressEnter').bind('click.keyPressEnter', eventHref).click();
                return false;
            }
            return true;
        }
        function eventHref(ev) {
            if (!ev.isDefaultPrevented()) {
                $(location).attr("href", this.href);
            }
        }
    };
})(jQuery);

/***
* jQuery Plugin – ToggleImage
* author: Samuel GUINÉ
* Ex : $("IMG.imgtog]").ToggleImage();
**/
(function ($) {
    jQuery.fn.ToggleImage = function () {
        return this.each(function () {
            var imageOnMouseOver = function () {
                var newsrc = $(this).attr("src").replace("_OFF.", "_ON.");
                $(this).attr("src", newsrc);
            };
            var imageOnMouseOut = function () {
                var newsrc = $(this).attr("src").replace("_ON.", "_OFF.");
                $(this).attr("src", newsrc);
            };
            var $this = $(this);
            if ($this.attr("src").indexOf("_OFF." > -1)) {
                $this.mouseover(imageOnMouseOver).mouseout(imageOnMouseOut);
            }
        });
    };
})(jQuery);

/***
* jQuery Plugin – Form Field Default Value
* Ex : $("#myfield").DefaultValue("My Default Value..");
**/
(function ($) {
    jQuery.fn.DefaultValue = function (text) {
        var $this = $(this);
        return this.each(function () {
            //Make sure we're dealing with text-based form fields
            if (this.type != "text" && this.type != "password" && this.type != "textarea")
                return;
            setValue(); //Set value initially if none are specified
            $this.focus(removeValue).blur(setValue);
            //Remove field values that are still default on form submit
            $("form").submit(removeValue);
        });
        function removeValue() {
            if ($this.val() == text || $this.val() == "") {
                $this.val("");
            }
        }
        function setValue() {
            if ($this.val() == text || $this.val() == "") {
                $this.val(text);
            }
        }
    };
})(jQuery);

/***
* jQuery Plugin – Quick Paginate
* EX : $(".body_content_item").quickpaginate({ pager: $("#body_paging"), seealltext: loc.paging.seeall, countertext: loc.paging.counter });
**/
(function ($) {

    jQuery.fn.quickpaginate = function (settings) {

        settings = jQuery.extend({
            perpage: 6,
            countertext: "{0} of {1} displayed.",
            seealltext: "see all",
            spacernth: "3n+1",
            spacerclass: "body_content_item_spacer",
            pager: null
        }, settings);

        var items = $(this);
        var total, pagesbut, seeallbut, curpage, pagecounter;

        var init = function () {
            total = items.size();
            items.show();
            if (items.size() > settings.perpage) {
                items.filter(":gt(" + (settings.perpage - 1) + ")").hide();
                addSpacer();
                setNav();
            }
        };

        var addSpacer = function () {
            items.removeClass(settings.spacerclass);
            items.filter(":nth-child(" + settings.spacernth + ")").addClass(settings.spacerclass);
        };

        var goPage = function () {
            items = $(items.selector); //refresh if sorted
            var $this = $(this);
            var page = parseInt($this.text());
            var cm = (page * settings.perpage) - settings.perpage;
            addSpacer();
            items.hide().slice(cm, cm + settings.perpage).show();
            curpage.text(page);
            pagecounter.show();
            pagesbut.removeClass("selected_sort_page_link");
            $this.addClass("selected_sort_page_link");
            $this.blur();
            return false;
        };

        var seeAll = function () {
            items = $(items.selector); //refresh if sorted
            items.show();
            pagecounter.hide();
            settings.pager.find("a[id^='pagingpage']").removeClass("selected_sort_page_link");
            return false;
        }

        var setNav = function () {
            if (settings.pager === null) {
                settings.pager = $('<div class="qc_pager"></div>');
                items.eq(items.size() - 1).after(settings.pager);
            }
            var totalpages = Math.ceil(total / settings.perpage);
            var pages = new Array(totalpages)
            var html = '<strong class="body_sort_paging_title">Page:</strong> | ';
            $.each(pages, function (i, val) {
                html += '<a id="pagingpage' + (i + 1) + '" class="sort_page_link" href="#">' + (i + 1) + '</a> | ';
            });
            html += '<span id="pagecounter"><a id="pagingseeall" class="sort_page_link" href="#">' + settings.seealltext + '</a>';
            settings.countertext = $.format(settings.countertext, '<span id="pagingcurpage">1</span>', totalpages);
            html += ' | ' + settings.countertext + '</span>';
            var pagerNav = $(html);
            $(settings.pager).append(pagerNav);
            curpage = settings.pager.find("#pagingcurpage");
            pagecounter = settings.pager.find("#pagecounter");
            seeallbut = settings.pager.find("#pagingseeall").click(seeAll); ;
            pagesbut = settings.pager.find("a[id^='pagingpage']").click(goPage);
            pagesbut.eq(0).addClass("selected_sort_page_link");
        };

        init(); // run the function
        return this; //Don't break the chain
    };
})(jQuery);

/***
* Supporting jQuery’s form.submit() in ASP.Net
**/
(function (jQuery) {
    jQuery(document).ready(function () {
        if (typeof (theForm) != "undefined") {
            window.isSubmit = false;
            window.__doPostBack = function (eventTarget, eventArgument) {
                var originalvalues = [theForm.__EVENTTARGET.value, theForm.__EVENTARGUMENT.value];
                theForm.__EVENTTARGET.value = eventTarget;
                theForm.__EVENTARGUMENT.value = eventArgument;
                try {
                    $(theForm).submit();
                }
                finally {
                    theForm.__EVENTTARGET.value = originalvalues[0];
                    theForm.__EVENTARGUMENT.value = originalvalues[1];
                }
            };
            isAlreadySubmit = function () {
                if (window.isSubmit)
                    return false;
                window.isSubmit = true;
                return true;
            };
            jQuery(theForm).submit(isAlreadySubmit);
        }
    });
})(jQuery);

/***
* jQuery Plugin – serializeElement
**/
(function ($) {
    jQuery.fn.serializeElement = function () {
        var $this = $(this);
        $("body").append('<form id="form-to-submit" style="display:none;"></form>');
        var $form = $("#form-to-submit");
        $form.html($this.clone()); //use .clone(true) with jQuery 1.4
        //Set Value for Chrome and Firefox : remove with jQuery 1.4
        $this.find("select,textarea,input[type=text],input[type=hidden],input[type=password]").each(function (i, e) {
            $form.find("select,textarea,input[type=text],input[type=hidden],input[type=password]").eq(i).val($(e).val());
        });
        $this.find("input[type=checkbox],input[type=radio]").each(function (i, e) {
            $form.find("input[type=checkbox],input[type=radio]").eq(i).attr("checked", $(e).attr("checked"));
        });
        var data = $form.serialize();
        $form.remove();
        return data;
    };
})(jQuery);

/***
* jQuery Plugin – CopyValueTo
**/
(function ($) {
    jQuery.fn.CopyValueTo = function (selector) {
        var $to = $(selector);
        return this.find("INPUT,SELECT").each(function () {
            var $this = $(this);
            var val = $this.val();
            var names = $this.attr("name").split("$");
            var name = names[names.length - 1];
            $to.find("INPUT,SELECT").filter("[name$=" + name + "]").val(val);
        });
    };
})(jQuery);

//To upper a string for coremetrics
function ToUpperCM(input)
{
  if(input)
  {
	  input = input.replace(/([àáâãäåāăæ])/, 'a');
	  input = input.replace(/([çćĉċ])/, 'c');
	  input = input.replace(/([èéêë])/, 'e');
	  input = input.replace(/([ìíîï])/, 'i');
	  input = input.replace(/([ñ])/, 'n');
	  input = input.replace(/([òóôõö])/, 'o');
	  input = input.replace(/([ùúûü])/, 'u');
	  input = input.replace(/([ýÿ])/, 'y');
    input = input.toUpperCase();
  }
  return input;
}

/***
* function : getParameterUrl
**/
function getParameterUrl(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}