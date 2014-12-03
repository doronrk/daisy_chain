lg.aForm = lg.Component.extend({
    options: {
        action: "",
        type: "post",
        async: false,
        responseloc: "self",
        inlineedit: false,
        event: "",
        review: "",
        focus: false
    },
    init: function (b, a) {
        this._super(b, a);
        this.form = $("form", this.element);
        this.form.attr("action", this.options.action);
        this.form.attr("method", this.options.type);
        this.form.attr("novalidate", "novalidate");
        if (this.options.responseloc == "self") {
            this.options.responseloc = this.element
        } else {
            this.options.responseloc = "#" + this.options.responseloc
        }
		/* LGEAU-687 Availability Notification Feature : kosangin add */
		if (this.form.find("div.error-msgs").length > 0) {
			this.form.find("div.error-msgs").css({display:'none'});
		}
		/* //LGEAU-687 Availability Notification Feature : kosangin add */
	printPrivacyDelay();
        lg.placeholderFix(this.form);
        this._build()
    },
    _build: function () {
        $(".preview", this.element).click(function (g) {
            g.preventDefault();
            $(".preview-off").toggle();
            $(".preview-on").toggle()
        });
        $('button[type="submit"]', this.element).bind("click", $.proxy(function (g) {
            g.preventDefault();
            this.blnSubmit = true;
            if (!lg.msgs.formerror) {
                $.getJSON(lg.locale + "/js/msg.json", $.proxy(function (h) {
                    lg.msgs = h;
                    this.validateForm('click')
                }, this))
            } else {
                this.validateForm('click')
            }
            if ($(this.options.responseloc).offset().top < $(window).scrollTop()) {
                lg.smoothScroll(this.element)
            }
        }, this));
        $('button[type="reset"], .reset', this.element).bind("click", $.proxy(function (g) {
            g.preventDefault();
            this.resetForm()
        }, this));
        originalRules = {};
        $("select", this.element).bind("change", function (g) {
            if ($(g.target).find("option[data-modify-rules]").length) {
                $.each(originalRules, function (i, h) {
                    ruleType = h.split("=")[0];
                    ruleVal = h.split("=")[1] || ruleType;
                    $('*[name="' + i + '"]').attr(ruleType, ruleVal);
                    if (ruleType == "required") {
                        $('*[name="' + i + '"]').closest("label").find(".highlight").show()
                    }
                })
            }
            if ($("option:selected", this).data("modify-rules")) {
                modifyRules = $.parseJSON($("option:selected", this).data("modify-rules").replace(/'/g, '"'));
                $.each(modifyRules, function (i, h) {
                    theField = $('*[name="' + i + '"]');
                    ruleType = h.split("=")[0];
                    ruleVal = h.split("=")[1] || ruleType;
                    originalRules[i] = ruleType + '="' + theField.attr(ruleType) + '"';
                    if (theField.attr(ruleType) == ruleVal) {
                        theField.removeAttr(ruleType);
                        if (ruleType == "required") {
                            $(theField).removeClass("invalid").closest("label").find(".highlight").hide();
                            $(theField).parent().removeClass("invalid")
                        }
                    } else {
                        theField.attr(ruleType, ruleVal)
                    }
                })
            }
        });
        $(".ddd", this.element).each(function () {
            dddurl = $(this).data("dropdown-url");
            if (dddurl.indexOf("?") < 0) {
                dddurl += "?"
            }
            $("select", $(this)).each(function () {
                $(this).bind("change", function () {
                    parentDiv = $(this).closest(".ddd");
                    idx = $("select", parentDiv).index(this);
                    if (idx == parentDiv.find("select").length - 1) {
                        return
                    }
                    var g = $(this).serialize();
                    $("select", parentDiv).each(function () {
                        if ($("select", parentDiv).index(this) > idx) {
                            $(this).html($("option:eq(0)", this))
                        }
                    });
                    if ($(this).closest("select").val() != "") {
                        $(this).attr("disabled", "disabled");
                        $.ajax({
                            url: dddurl + g,
                            dataType: "json",
                            success: function (h) {
                                var i = "";
                                for (key in h) {
                                    i += '<option value="' + key + '">' + h[key] + "</option>"
                                }
                                $("select:eq(" + (idx + 1) + ")", parentDiv).append(i);
                                $("select", parentDiv).removeAttr("disabled")
                            }
                        })
                    }
                })
            })
        });
        var f = "dd/mm/yy";
        var a = 0;
        var b = false;
        if (lg.locale == "/us" || lg.locale == "/tr" || lg.locale == "/au") {
            f = "mm/dd/yy"
        }
        var e = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var c = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var d = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        if (lg.locale == "/tr") {
            e = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
            c = ["Pzr", "Pzt", "Salı", "Çarş", "Perş", "Cuma", "Cts"];
            d = ["Pzr", "Pzt", "Sal", "Çaş", "Peş", "Cum", "Cts"];
            a = 1
        }
        if (lg.locale == "/ir" || lg.locale == "/il") {
            b = true
        }
        if ($('input[type="date"]', this.element).length > 0 && $.fn.datepicker) {
            $('input[type="date"]', this.element).each(function () {
                maxDate = $(this).data("past") ? new Date : null;
                minDate = $(this).data("future") ? new Date : null;
                $(this).datepicker({
                    inline: true,
                    dateFormat: f,
                    maxDate: maxDate,
                    minDate: minDate,
                    dayNames: e,
                    dayNamesShort: c,
                    dayNamesMin: d,
                    firstDay: a,
                    isRTL: b
                })
            });
            if ($.browser.webkit || $.browser.opera) {
                setTimeout(function () {
                    for (var g = 0; g < document.getElementsByClassName("calendar").length; g++) {
                        document.getElementsByClassName("calendar")[g].setAttribute("type", "text")
                    }
                }, 100)
            }
        }
        if (this.options.inlineedit) {
            $(".edit", this.element).bind("click", $.proxy(function (g) {
                g.preventDefault();
                $(".edit, .inline-values", this.element).addClass("hidden");
                $(".inline-form", this.element).removeClass("hidden")
            }, this));
            $('button[type="reset"], .reset', this.element).click($.proxy(function (g) {
                g.preventDefault();
                $(".edit, .inline-values", this.element).removeClass("hidden");
                $(".inline-form", this.element).addClass("hidden")
            }, this))
        }
        if (this.options.event == "change") {
            $("input, select, checkbox, radio", this.form).bind("change", $.proxy(function (g) {
                g.preventDefault();
                this.blnSubmit = true;
                if (!lg.msgs.formerror) {
                    $.getJSON(lg.locale + "/js/msg.json", $.proxy(function (h) {
                        lg.msgs = h;
                        this.validateForm()
                    }, this))
                } else {
                    this.validateForm()
                }
            }, this))
        }
        if ($("html").hasClass("ie")) {
            this.form.find("input, textarea, select").bind("keydown", $.proxy(function (g) {
                if (this.form.find('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], input[type="date"]').length == 1) {
                    if (g.keyCode == 13) {
                        g.preventDefault();
                        $('button[type="submit"]', this.element).trigger("click")
                    }
                }
                if (g.keyCode == 8 || g.keyCode == 37 || g.keyCode == 39) {
                    return true
                }
                if ($(g.target).val().length >= $(g.target).attr("maxlength")) {
                    g.preventDefault()
                }
            }, this))
        }
        if (this.options.focus) {
            $('input[type!="hidden"]:first', this.element).focus()
        }
        this.log("Build Complete", this.element, this.options.responseloc)
	$('.newsletter').find('input[type="email"]').on('change paste keyup', function(e) {
        	$(this).css('cssText', 'text-transform: lowercase !important');
        	if(!$(this).hasClass('nonEmailvaild')){
        		if(e.keyCode != 37 && e.keyCode != 39 && e.keyCode==32){
	        			var aa=/ /g;
			        	e.preventDefault();
			        	var a=$(this).val().replace(aa, "");
						$(this).val(a);
        		}
        	}
		});
    },
    resetForm: function () {
        $("div.error-msgs", this.element).empty();
        $(".invalid", this.element).removeClass("invalid");
        this.element.find("input[type], textarea, select").unbind("blur");
        if (this.form.length) {
            this.form[0].reset();
            lg.placeholderFix(this.form)
        }
    },
    submitForm: function () {
        $('input[data-uppercase="true"]', this.form).each(function (a, b) {
            $(this).val($(this).val().toUpperCase())
        });
        if (this.options.async) {
            $.ajax({
                type: this.options.type,
                url: this.options.action,
                data: this.form.serialize(),
                success: $.proxy(function (a) {
                    $("#review-response").empty().remove();
                    /* SMG-6184 : 20140710 */
                    if (a.indexOf("Value of the field [subject] contains invalid character. Remove special characterValue of the field [subject] contains invalid character. Remove special character")!= -1) {
                        alert("Value of the field [subject] contains invalid character. Remove special characterValue of the field [subject] contains invalid character. Remove special character");
                        return
                    }
                    /* SMG-6184 : 20140710 */
                    if ($(a).find(".error").length) {
                        errors = "";
                        $(a).find(".error").each(function () {
                            errors += '<li class="highlight">' + $(this).text() + "</li>";
                            $('[name="' + $(this).data("field") + '"]').val("").blur().addClass("invalid")
                        });
                        var b = '<p class="highlight">' + lg.msgs.formerror["header"] + "</p>";
                        $("div.error-msgs", this.element).html(b + "<ul>" + errors + "</ul>");
                        return
                    } else{
						$('*[data-sc-trackeventsitem]',this.form).each(function(){
							var s=s_gi(s_account); 
							s.linkTrackVars='none'; 
							s.linkTrackEvents=$(this).attr('data-sc-trackeventsitem'); 
							s.events=$(this).attr('data-sc-trackEventsItem');
							s.tl(this,'o',$(this).attr('data-sc-trackeventsitemname'));
						});
					}
                    if (this.options.responseloc == "self") {
                        $(this.form).hide();
                        $(this.options.responseloc).append(a)
                    } else {
                        $(this.options.responseloc).html(innerShiv(a))
                    }
                    this.showResults();
                    this.callback($(this.options.responseloc));
                    this.log("Response received", this.element)
                }, this)
            })
        } else {
            if (this.form.attr("target") != "_blank") {
                $('button[type="submit"]', this.element).unbind("click").bind("click", $.proxy(function (a) {
                    a.preventDefault()
                }, this))
            }
			$('*[data-sc-trackeventsitem]',this.form).each(function(){
				var s=s_gi(s_account); 
				s.linkTrackVars='none'; 
				s.linkTrackEvents=$(this).attr('data-sc-trackeventsitem'); 
				s.events=$(this).attr('data-sc-trackEventsItem');
				s.tl(this,'o',$(this).attr('data-sc-trackeventsitemname'));
			});
            /* 20140429 add */
            var tip = this.form.closest('.tooltip');
            this.form.submit();
            if($(tip[0]).attr('id') == 'send_email') {
                $(tip[0]).find('a, input, select, textarea').filter(':last').focus();
            }
            /* 20140429 add */
        }

        $(".psearch-results").hide();
        $(".psearch").blur();
        this.log("Form Submitted", this.element)

    },
    reviewForm: function () {
        $.ajax({
            url: this.options.review,
            success: $.proxy(function (a) {
                $(this.form).hide();
                $(this.options.responseloc).append(a);
                $("input, select, textarea", this.form).each($.proxy(function (b, c) {
                    $tag = $(c).get(0).tagName.toLowerCase();
                    $val = ($tag == "checkbox" || $tag == "radio" || $tag == "select") ? $(c).find("radio:checked, checkbox:checked, option:selected").text() : ($tag == "select" ? $(c).find("option:selected").val() : $(c).val());
                    while ($val.indexOf("<") != -1 || $val.indexOf(">") != -1) {
                        $val = $val.replace("<", "&lt;").replace(">", "&gt;")
                    }
                    if ($(c).val() && $(this.element).find("#" + $(c).attr("name")).length) {
                        $(this.element).find("#" + $(c).attr("name")).html($val)
                    }
                }, this));
                if ($(".claim-product-image").length) {
                    $(".claim-product-image img").attr("src", $(".product-image img").attr("src"))
                }
                $("#review-return").bind("click", $.proxy(function () {
                    $("#review-response").empty().remove();
                    $(this.form).show()
                }, this));
                $("#review-submit").bind("click", $.proxy(function () {
                    this.submitForm()
                }, this));
                this.showResults();
                this.log("Review Response received", this.element)
            }, this)
        })
    },
    errorMessage: "",
    validators: {
        email: function (a) {
            var b = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9+._-]+\.[a-zA-Z]{2,4}$/;
			/* LGEAU-687 Availability Notification Feature : kosangin add */
			var hFlag ="";
            if(a.attr("avalEmail") && a.is("[avalEmail]")){
				hFlag = "N"
            }
			/* LGEAU-687 Availability Notification Feature : kosangin add */
			if(hFlag == "N"){
				hFlag = "";
				var g = "* Sorry, this email address is already registered to receive a notification. Please try again.";
				return(""+g);
			}else if (b.test(a.val()) || (!a.attr("required") && !a.is("[required]")) && (!a.val() || a.val() == a.attr("placeholder"))) {
                return true
            } else {
                return ("" + lg.msgs.formerror["email"]).split("%title%").join(a.attr("title"))
            }
        },
        tel: function (a) {
            var b = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            if (b.test(a.val()) || (!a.attr("required") && !a.is("[required]")) && (!a.val() || a.val() == a.attr("placeholder"))) {
                return true
            } else {
                return ("" + lg.msgs.formerror["tel"]).split("%title%").join(a.attr("title"))
            }
        },
        text: function (a) {
            if (a.val() && a.val() != a.attr("placeholder")) {
                return true
            } else {
                return ("" + lg.msgs.formerror["required"]).split("%title%").join(a.attr("title"))
            }
        },
        password: function (a) {
            if (a.val() && a.val() != a.attr("placeholder")) {
                return true
            } else {
                return ("" + lg.msgs.formerror["required"]).split("%title%").join(a.attr("title"))
            }
        },
        file: function (a) {
            if (a.val() || (!a.attr("required") && !a.is("[required]"))) {
                return true
            } else {
                return ("" + lg.msgs.formerror["required"]).split("%title%").join(a.attr("title"))
            }
        },
        filetype: function (d, e) {
            var b = e.split("|");
            if (d.val() || (!d.attr("required") && !d.is("[required]"))) {
                var c = d.val().substr(d.val().lastIndexOf(".") + 1).toLowerCase();
                var a = b.length;
                while (a--) {
                    if (c == b[a]) {
                        return true
                    }
                }
                return ("" + lg.msgs.formerror["filetype"]).split("%title%").join(d.attr("title")).split("%types%").join(b.join(", "))
            } else {
                return true
            }
        },
        match: function (a, b) {
            if (a.val() && a.val() != a.attr("placeholder") && a.val() == $('[name="' + b + '"]').val()) {
                return true
            } else {
				if(a.attr('matchhMessae')){
            		return a.attr('matchhMessae')
            	}else{
            		return ("" + lg.msgs.formerror["match"]).split("%title%").join(a.attr("title")).split("%target_title%").join($('[name="' + b + '"]').attr("title"))
            	}
            }
        },
        minlength: function (a, b) {
            if (!a.val() || a.val() == a.attr("placeholder") || a.val().length >= b) {
                return true
            } else {
            	if(a.attr('minlengthMessae')){
            		return a.attr('minlengthMessae')
            	}else{
            		return ("" + lg.msgs.formerror["minlength"]).split("%title%").join(a.attr("title")).split("%target%").join(b).split("%used%").join(a.val().length)
            	}
            }
        },
        maxlength: function (a, b) {
            if (!a.val() || a.val() == a.attr("placeholder") || a.val().length <= b) {
                return true
            } else {
                return ("" + lg.msgs.formerror["maxlength"]).split("%title%").join(a.attr("title")).split("%target%").join(b).split("%used%").join(a.val().length)
            }
        },
        textarea: function (a) {
            if (a.val() && a.val() != a.attr("placeholder")) {
                return true
            } else {
                return ("" + lg.msgs.formerror["required"]).split("%title%").join(a.attr("title"))
            }
        },
        checkbox: function (a) {
        	if (a.attr("checked") || (!a.attr("required") && !a.is("[required]"))) {
                return true
            } else {
					/* LGEAU-1261 2014082 modify*/
            	if(a.attr('checkMessage')){
            		if(a.attr('checkMessage')=="case1"){
            			  return ("" + lg.msgs.formerror["checkbox1"]).split("%title%").join(a.attr("title"))
            		}else if(a.attr('checkMessage')=="case2"){
            			  return ("" + lg.msgs.formerror["checkbox2"]).split("%title%").join(a.attr("title"))
            		}else{
						  return a.attr('checkmessage')
					}
					/* LGEAU-1261 2014082 modify*/
            	}else{
            		  return ("" + lg.msgs.formerror["checkbox"]).split("%title%").join(a.attr("title"))
            	}
            }
        },
        radio: function (a) {
            if ($('input[name="' + a.attr("name") + '"]:checked').val() || !a.attr("required")) {
                return true
            } else {
                return ("" + lg.msgs.formerror["checkbox"]).split("%title%").join(a.attr("title"))
            }
        },
        select: function (a) {
            if (a.val() || (!a.attr("required") && !a.is("[required]"))) {
                return true
            } else {
                return ("" + lg.msgs.formerror["required"]).split("%title%").join(a.attr("title"))
            }
        },
        number: function (a) {
            var b = /^\s*\d+\s*$/;
            if (b.test(a.val())) {
                return true
            } else {
                return ("" + lg.msgs.formerror["number"]).split("%title%").join(a.attr("title"))
            }
        },
        date: function (a) {
            if (a.val() || (!a.attr("required") && !a.is("[required]"))) {
                return true
            } else {
                return ("" + lg.msgs.formerror["required"]).split("%title%").join(a.attr("title"))
            }
        }
    },
    validateForm: function (z) {
        var i = /^-{0,1}\d*\.{0,1}\d+$/;
        var h = [];
        var e = true;
        var d = 0;
        var a = 0;
        var b = false;
        this.errorMessage = "";
        this.element.find("input[type], textarea, select").each($.proxy(function (t, m) {
            var y = $(m);
            if (this.element.find("input[type], textarea, select").length > 1) {
                /* 20140428 modify blur -> focus */
                $(m).off("focus").on("focus", $.proxy(function () {
                    if($('div.error-msgs').find('.highlight').size() > 0) {
                        this.blnSubmit = false;
                        this.validateForm()
                    }
                }, this))
            }
            var k = y.is("[required]") || y.attr("required");
            b = false;
            if (y.attr("type") != "hidden" && y.attr("type") != "radio") {
                a++
            }
            if ((!y.val() || y.val() == "" || y.val() == y.attr("placeholder")) && !k) {
                y.removeClass("invalid")
            } else {
                var q = y.attr("maxlength");
                if (q && q != "" && q > 0) {
                    h.push({
                        v: "maxlength",
                        t: parseInt(q)
                    })
                }
                var s = y.data("rules");
                if (s) {
                    var w = s.split(",");
                    var r = w.length;
                    while (r--) {
                        var j = w[r].split(":");
                        var v = j[0].split(" ").join();
                        if (this.validators[v]) {
                            h.push({
                                v: v,
                                t: j[1]
                            })
                        }
                    }
                }
                if (y.get(0).nodeName.toLowerCase() == "input") {
                    var u = y.attr("type")
                } else {
                    var u = y.get(0).nodeName.toLowerCase()
                }
                if (u && this.validators[u]) {
                    h.push({
                        v: u
                    })
                }
                var p = h.length;
                while (p--) {
                    var l = h.pop();
                    var x;
                    if (l.t) {
                        x = this.validators[l.v].apply(this, [y, l.t])
                    } else {
                        x = this.validators[l.v].apply(this, [y])
                    }
                    if (y.parent().hasClass("styled-select")) {
                        y = y.parent()
                    }
                    if (x !== true) {
						/* 20140328 newsletter : ansooyune add S */
						if($(this.element).hasClass('newsletter')) {
							this.errorMessage += x;
							$(y[0]).focus().attr('aria-invalid','true');
							this.form.find("div.error-msgs").show();
						}else {
							this.errorMessage += "<li class='highlight'><a href='#" + y.attr("id") + "'>" + x + "</a></li>";
						}
						/* 20140328 newsletter : ansooyune add E */
                        y.addClass("invalid");
                        e = false;
                        b = true;
                        d++
                    } else {
                        if (!b) {
                            y.removeClass("invalid");
							$(y[0]).attr('aria-invalid','false');
                        }
                    }
                }
            }
        }, this));
        if (!e) {
            if(lg.locale=='/ru' && $(this.element).parent().hasClass('newsletter')){
        		var g = a > 1 ? '<p class="highlight"><a href="#send_email_form">' + lg.msgs.formerror["header1"] + "</a></p><ul>" : "<ul>";
        	}else{
				if($(this.element).hasClass('newsletter')) {
					var g = a > 1 ? '<p class="highlight">' + lg.msgs.formerror["header"] + "</p>" : "";
				}else {
					var g = a > 1 ? '<p class="highlight"><a href="#send_email_form">' + lg.msgs.formerror["header"] + "</a></p><ul>" : "<ul>";
				}
        	}

			if($(this.element).hasClass('newsletter')) {
				$("div.error-msgs", this.element).html(g + this.errorMessage);
			}else {
				$("div.error-msgs", this.element).html(g + this.errorMessage + "</ul>");
			}

            if (self != parent) {
                var f = $(this.element).closest("html");
                var c = $("iframe", top.document);
                c.each(function () {
                    if ($(this).contents().find(f).length) {
                        $(this).height($(document).height())
                    }
                })
            }

			/* 20140326 Send Mail Error Massage Event : ansooyune add S */
			if(z == 'click') { $("div.error-msgs", this.element).find('a:first').focus(); }

			$("div.error-msgs", this.element).find('a').on('click', function(e){
				e.preventDefault();
				var id = $(this).attr('href');
				$(id, this.form).focus();
			});
			/* 20140326 Send Mail Error Massage Event : ansooyune add E */

        } else {
            $("div.error-msgs", this.element).html("");
            if (this.blnSubmit) {
                if (this.options.review) {
                    this.reviewForm()
                } else {
                    this.submitForm()
                }
            }
        }
		/* LGEAU-687 Availability Notification Feature : kosangin add */
		if ($(this.element).hasClass("chkErrPos")) {
			$(this.element).aformErrorPos("checkErrMsg")
		}/* //LGEAU-687 Availability Notification Feature : kosangin add */
        this.log("Validation Complete", this.element)
    },
    showResults: function (a) {
        if (this.options.inlineedit) {
            this._build()
        }
        lg.addImages($(this.options.responseloc))
    }
});
lg.plugin("aform", lg.aForm, ".aform");
function printPrivacyDelay() {
    $(".print-privacy").off("click").on("click", function () {
        $("body").addClass("privacy-printing");
        window.print();
        $("body").removeClass("privacy-printing");
        $(this).focus();
        return false
    })
}

/* LGEAU-687 Availability Notification Feature : kosangin add */
lg.aformErrorPos = lg.Component.extend({
    options: {},
    init: function (a, b) {
        this._super(a, b);
        this.thisform = $(this.element);
        this.thisSubmit = this.thisform.find("[type=submit]");
        this.thisform.addClass("chkErrPos");
        if (this.thisform.find("[name=srchStart]")) {
            this.dateLimit()
        }
        if (this.thisform.find("input[type=file]").length > 0 && !$.browser.msie) {
            this.inputFileStyle()
        }
        this.thisform.find(".survey-submit").bind("click", $.proxy(this.surveyForm, this))
    },
    surveyForm: function (b) {
        b.preventDefault();
        if (this.thisform.find("input:checked").length == 0) {
            var a = confirm("Does this Article help to solve your problem?");
            if (a == false) {
                return false
            } else {
                return false
            }
        }
    },
    aformButtonsAct: function (a) {
        a.preventDefault();
        if (this.thisform.find(".invalid").length == 0) {
            this.thisform.find(".showAlerts").removeClass("showAlerts");
            this.thisform.find(".alerts").text("")
        } else {
            this.thisform.find(".showAlerts").removeClass("showAlerts");
            this.thisform.find(".alerts").text("");
            this.checkErrMsg()
        }
        if (this.thisSubmit.attr("id") == "request-button01") {
            if (this.thisform.find(".invalid").length < 1) {
                $("#request-response-00").hide();
                setTimeout(function () {
                    var b = this.thisform.find("input[name=setServiceType").val();
                    $("#request-response-01").actRequestFunctions(b)
                }, 100)
            }
        }
    },
    checkErrMsg: function () {
        for (var a = 0; a < this.thisform.find(".invalid").length; a++) {
            var b;
            if (this.thisform.find(".invalid").eq(a).find("select").length > 0) {
                b = this.thisform.find(".invalid").eq(a).find("select")
            } else {
                b = this.thisform.find(".invalid").eq(a)
            }
        }
        if (this.thisform.find(".invalid").length < this.thisform.find("div.error-msgs ul li").length) {
            this.thisform.find("div.error-msgs ul li").each(function () {
                if ($(this).next("li").length > 0) {
                    var c = $(this).attr("title");
                    var d = $(this).next("li").attr("title");
                    if (c == d && c.length == d.length) {
                        $(this).next("li").remove()
                    }
                }
            })
        }
        this.pushErrMsg()
    },
    pushErrMsg: function () {
        this.thisform.find(".showAlerts").removeClass("showAlerts");
        this.thisform.find(".alerts").html("");
        this.invalids = this.thisform.find(".invalid");
        var c = this.thisform.find("div.error-msgs ul");
        var b = c.children("li");
        this.invalids.parent("label").addClass("showAlerts");
        for (var a = 0; a < this.invalids.length; a++) {
            this.thisform.find(".showAlerts").eq(a).find(".alerts").text(b.eq(a).text())
        }
    },
    dateLimit: function () {
        var b = this.thisform.find("[name=srchStart]");
        var a = this.thisform.find("[name=srchEnd]");
        b.val("");
        a.val("");
        b.on("change", $.proxy(function (c) {
            this.dateLimitAdjust(b);
            b.blur();
            a.blur()
        }, this));
        a.on("change", $.proxy(function (c) {
            this.dateLimitAdjust(a);
            b.blur();
            a.blur()
        }, this))
    },
    dateLimitAdjust: function (a) {
        var b;
        if (a.attr("name") == "srchStart") {
            b = $("input[name=srchEnd]:first");
            minDates = a.val();
            maxDates = new Date
        } else {
            if (a.attr("name") == "srchEnd") {
                b = $("input[name=srchStart]:first");
                maxDates = a.val();
                minDates = null
            }
        }
        if (a.val() != null && a.val() != "") {
            b.datepicker({
                maxDate: maxDates,
                minDate: minDates
            });
            b.data("datepicker").settings.maxDate = maxDates;
            b.data("datepicker").settings.minDate = minDates;
            b.attr("required", "required")
        } else {
            if (b.val() == null || b.val() == "") {
                $("input[type=date]").each(function () {
                    $(this).removeClass("invalid").removeAttr("required").parent("label").removeClass("showAlerts").children(".alerts").text("");
                    maxDate = $(this).data("past") ? new Date : null;
                    minDate = $(this).data("future") ? new Date : null;
                    b.data("datepicker").settings.maxDate = maxDates;
                    b.data("datepicker").settings.minDate = minDates
                })
            }
        }
    },
    inputFileStyle: function () {
        var a = "SEARCH";
        this.thisform.find("input:file").css({
            width: "auto",
            position: "absolute",
            top: 0,
            left: 0,
            cursor: "pointer",
            "z-index": "2"
        }).wrap('<span class="uk-styled-file" style="position:relative;float:left;width:240px;height:24px;padding-left:60px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></span>');
        this.thisform.find(".uk-styled-file input:file").css({
            opacity: 0,
            width: "100%",
            "float": "none",
            cursor: "pointer"
        });
        this.thisform.find(".uk-styled-file input:file").each(function () {
            $(this).parent(".uk-styled-file").append('<span class="file-text" style="position:relative;top:5px;"></span>');
            $(this).bind("change", function () {
                var b = $(this).val();
                b = b.replace("C:\\fakepath\\", "");
                $(this).parent(".uk-styled-file").find(".file-text").text(b)
            })
        });
        $.getJSON(lg.locale + "/js/msg.json", $.proxy(function (b) {
            lg.msgs = b;
            if (typeof (lg.msgs.buttonLabel) == "object") {
                a = lg.msgs.buttonLabel.search
            }
            this.thisform.find(".uk-styled-file").append('<span class="button white small" style="position:absolute;top:0;left:0;margin:0;z-index:1;cursor:pointer">' + a + "</span>")
        }, this))
    }
});
function printPrivacyDelay() {
    $(".print-privacy").off("click").on("click", function () {
        $("body").addClass("privacy-printing");
        window.print();
        $("body").removeClass("privacy-printing");
        $(this).focus();
        return false
    })
}

lg.plugin("aformErrorPos", lg.aformErrorPos, ".aform");
/* //LGEAU-687 Availability Notification Feature : kosangin add */