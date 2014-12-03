(function ($) {
  if (!jQuery().emailValidate) {
    $.emailValidate = function (el, options) {
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.timeout = false;
        base.completed = false;
        // Add a reverse reference to the DOM object
        base.$el.data("emailValidate", base);
        if (base.$el.attr('name').length < 1) {
          base.$el.attr('name', 'email_address');
        } else if (!/email/i.test(base.$el.attr('name'))) {
          base.$el.attr('name', base.$el.attr('name') + '-email');
        }
        base.init = function () {
            base.options = $.extend({}, $.emailValidate.defaultOptions, options);
            base.options.callback = base.options.callback ? base.options.callback : 'freshValidate' + parseInt(Math.random() * 10000);
            base.testedEmail = [];
            base.sentEmail = [];
            base.startStyles = base.$el.attr('style') ? base.$el.attr('style') : '';
            base.setSelector(); // SET SELECTOR FOR STYLES
            if (!base.options.source && /local/.test(window.location.href)) { alert('Please set the source'); }
            base.$el.unbind();
            if (!base.options.submitBtn) {
                /* FIND SUBMIT BUTTON */
                var linkCheck = base.$el.siblings('a[class*="submit"], a[class*="Submit"]');
                var btnCheck = base.$el.siblings('input[type="submit"]');
                if (linkCheck.length > 0) {
                    base.options.submitBtn = linkCheck.first();
                } else if (btnCheck.length > 0) {
                    base.options.submitBtn = btnCheck.first();
                } else {
                    var grandCheck = $(base.grandSelector).find('a[class*="submit"], a[class*="Submit"], a[id*="submit"], input[type="submit"], button[id*="submit"], button[class*="submit"]');
                    var nestCheck  = $(base.grandSelector).parent().find('a[class*="submit"], a[class*="Submit"], a[id*="submit"], input[type="submit"], button[id*="submit"], button[class*="submit"]');
                    if (grandCheck.length > 0) {
                      base.options.submitBtn = grandCheck.first();
                    } else if (nestCheck.length > 0) {
                      base.options.submitBtn = nestCheck.first();
                    } else if ( /local/.test(window.location.href) ) {
                      alert('Woah! We don\'t have a submit button for the email plugin');
                    }
                }
            }

            // Placeholder
            if (typeof (jQuery.support.placeholder) === 'undefined') {
                jQuery.support.placeholder = (function () {
                    var i = document.createElement('input');
                    return 'placeholder' in i;
                })();
            }

            var sibInputs = $(base.grandSelector + ' input[type="text"]').filter( function(){ return typeof($(this).attr('placeholder')) !== 'undefined'; } );
            /* ADD PLACEHOLDER SUPPORT TO SIBLINGS */
            if (sibInputs.length > 0) {
              $(sibInputs).each(function(){
                if (!jQuery.support.placeholder) {
                    $(this).val($(this).attr('placeholder'));
                    $(this).focus(function () {
                        if ($(this).val() == $(this).attr('placeholder')) {
                            $(this).val('');
                        }
                    }).blur(function () {
                        if ($(this).val() == '') {
                            $(this).val($(this).attr('placeholder'));
                        }
                    });
                }
              });
            }

            if (base.options.placeholder.length > 0) {
                if (!base.$el.attr('placeholder')){
                  base.$el.attr('placeholder', base.options.placeholder);
                }
                if (!jQuery.support.placeholder) {
                    base.$el.val(base.options.placeholder);
                    base.$el.focus(function () {
                        if ($(this).val() == base.options.placeholder) {
                            $(this).val('');
                        }
                    }).blur(function () {
                        if ($(this).val() == '') {
                            $(this).val(base.options.placeholder);
                        }
                    });
                }
            }
            base.$el.focus(function () {
                setTimeout(function(){
                  base.submitted=false;
                }, 600);
                if ($(this).val() == base.options.successMsg) {
                    $(this).val('');
                }
            });

            // Click
            base.options.submitBtn.unbind().die().click(function () {
                /* CLICK EVENT */
                base.submitted = true;
                if (base.el !== document.activeElement && base.$el.val() !== base.options.successMsg) {
                    base.$el.focus().blur();
                }
                return false;
            });

            // Keyup
            base.$el.keyup(function (e) {
                if (base.options.exp.test(base.$el.val()) && base.$el.hasClass(base.options.errorClass)) {
                    // PASSED - remove bad format warning
                    base.reset();
                }
            }).keydown(function (e) {
                if (e.which == 13 && base.options.exp.test(base.$el.val())) {
                    base.submitted = true;
                    base.$el.trigger('blur');
                    return false;
                } else if ( (e.which == 13 && !base.options.exp.test(base.$el.val()) && base.$el.val() !== base.options.placeholder) || (e.which == 13 && base.$el.val().length == 0) ) {
                    base.timeout = true;
                    var data = {
                        FA_EMAIL: base.$el.val(),
                        FA_COMMENT: base.$el.val().length > 0 ? base.options.invalidAddressMessage : base.options.enterAddressMessage,
                        FA_VALID: 'no'
                    };
                    window[base.options.callback](data);
                    return false;
                }
            });

            // Blur Test
            base.$el.blur(function () {
                if (base.options.exp.test(base.$el.val())) {
                    var FA = {};
                    FA.FA_VALID = 'yes';
                    FA.FA_EMAIL = base.$el.val();
                    FA.Timeout  = true;
                    base.timeout = setTimeout(function () {
                        window[base.options.callback](FA);
                    }, base.options.timeout);

                    if (jQuery.inArray(base.$el.val(), base.testedEmail) > 0 || typeof( freshAddressSiteToken ) == 'undefined' ) {
                      base.reset();
                      if (base.submitted) { base.success(); }
                    } else {
                      base.json_call = $.ajax({
                        dataType: "jsonp",
                        url: "https://rt.freshaddress.com/v4?service=react&token=" + freshAddressSiteToken + "&format=json&email=" + encodeURIComponent(base.$el.val()) + "&jsoncallback=" + base.options.callback,
                        timeout: 300,
                        error: function (x, t, m) {
                            if (t === "timeout") {
                                base.commentEl.remove();
                                base.commentEl = false;
                            }
                        }
                      });
                    }     
                } else if ( (base.$el.val().length > 0 && base.$el.val() !== base.options.successMsg && base.$el.val() !== base.options.placeholder) || (base.$el.val().length == 0 && base.submitted)) {
                    // format not valid
                    base.timeout = true;
                    var data = {
                        FA_EMAIL: base.$el.val(),
                        FA_COMMENT: base.$el.val().length > 0 ? base.options.invalidAddressMessage : base.options.enterAddressMessage,
                        FA_VALID: 'no'
                    };
                    window[base.options.callback](data);
                } else {
                  base.reset();
                }
            });

            /* VALIDATION AND DISPLAY FUNCTION */
            if (!window[base.options.callback]) {
              window[base.options.callback] = function (FA) {
                if (base.timeout) {
                  clearTimeout(base.timeout);
                  base.timeout = false;
                  base.passed = false;
                  if (FA.FA_VALID == 'yes') {
                      base.testedEmail.push(base.$el.val(FA.FA_EMAIL));
                      if (base.submitted && typeof (base.options.validation) == 'function') {
                          if (base.options.validation()) {
                              base.success();
                          } else if ( typeof(base.options.validationError) == 'function' ){
                            base.options.validationError();
                          }
                      } else if (base.submitted) {
                          base.success();
                      }
                      return true;
                  } else if (!base.commentEl) {
                      // SLIGHT DELAY FOR OLD BROWSERS
                      setTimeout(function(){
                        base.submitted=false;
                      }, 10);
                      var baseFontSize = base.options.fontSize? base.options.fontSize : baseFontSize;
                      var baseHeight = base.$el.outerHeight();
                      var baseWidth = base.$el.outerWidth();
                      var baseIEWidth = base.$el.width();
                      var baseLeft = parseInt(base.$el.css('padding-left')) + parseInt(base.$el.css("border-left-width"));
                      var baseRight = parseInt(base.$el.css('padding-right')) + parseInt(base.$el.css("border-right-width"));
                      var baseBorder = parseInt(base.$el.css('border-left-width'));
                      var position = base.$el.position();
                      var offsetParent = base.$el.offsetParent();
                      var iconWidth = 24;
                      if (offsetParent.css('position') == 'static') {
                        offsetParent.css('position', 'relative');
                      } else if (typeof(offsetParent.css('z-index')) == 'undefined' || offsetParent.css('z-index') === 0) {
                        offsetParent.css('z-index', 1);
                      }
                      var offsetHeight = offsetParent.outerHeight();
                      var offsetWidth = offsetParent.outerWidth();
                      position.top = isNaN( parseInt(base.$el.css('margin-top')) ) ? position.top : position.top + parseInt(base.$el.css('margin-top'));
                      position.bottom = offsetHeight - position.top + 6;
                      position.left = parseInt(base.$el.css('margin-left')) > 0 ? parseInt(position.left) + parseInt(base.$el.css('margin-left')) + 1 : position.left;
                      /* ADJUST FOR POSITIONED FROM CENTER */
                      var margin = {};
                      margin.left = position.left - parseInt(offsetWidth / 2);
                      if (baseHeight <= 25) {
                          var iconHeight = Math.floor(baseHeight * .6);
                          iconWidth = iconHeight;
                          var iconTop = position.top + Math.floor((baseHeight - iconHeight) / 2) + 2;
                      } else {
                          var iconTop = position.top + Math.ceil( (baseHeight - 24) / 2);
                          var iconHeight = '24';
                      }
                      baseLeft = 18 - (baseLeft + Math.floor(iconHeight / 2)) + baseLeft;
                      // Add Base Styles
                      if (!base.stylesAdded) {
                          $('head').append('<style>p.email-error:after { content: \'\'; display: block; position: absolute; bottom: -10px; left: 6px; border-top: 12px solid ' + base.options.backgroundColor + '; border-right: 12px solid transparent; border-bottom: none; border-left: 12px solid transparent; }</style>');
                          base.stylesAdded = true;
                      }
                      // Split out IE and Standard Styles
                      if ($.browser.msie && $.browser.version.substr(0,1)<8) { // less than ie8
                        var style_combo = new Array();
                        style_combo = base.splitStyles(base.options.styles, style_combo);
                        style_combo = base.splitStyles(base.options.ieStyles, style_combo);
                        var comment = '<p class="email-error" style="max-width:none; text-align:left; width:' + base.$el.outerWidth() + 'px; bottom:' + position.bottom + 'px;left:50%;margin:0 0 0 ' + margin.left + 'px; *margin:0 0 0 ' + (margin.left + 2) + 'px; -moz-box-sizing: border-box; box-sizing: border-box; position: absolute; padding: .5em 1em; color:' + base.options.fontColor + '; background-color:' + base.options.backgroundColor + '; font-size:' + baseFontSize + ';' + base.joinStyles(style_combo) + '">' + FA.FA_EMAIL + ' ' + FA.FA_COMMENT + '</p>';
                        base.commentEl = $( comment + icon );
                        base.$el.before( base.commentEl );
                        if ( base.commentEl.is(':hidden') ) { base.commentEl.hide().show(); }
                        base.$el.addClass(base.options.errorClass);
                      } else { // standard browser
                        var iconLeft = position.left + baseLeft;
                        var iconMargin = iconLeft - parseInt(offsetWidth / 2);
                        var comment = '<p class="email-error" style="max-width:none; text-align:left; width:' + base.$el.outerWidth() + 'px; bottom:' + position.bottom + 'px;left:50%;margin:0 0 0 ' + margin.left + 'px; *margin:0 0 0 ' + (margin.left + 2) + 'px; -moz-box-sizing: border-box; box-sizing: border-box; position: absolute; padding: .5em 1em; color:' + base.options.fontColor + '; background-color:' + base.options.backgroundColor + '; font-size:' + baseFontSize + ';' + base.options.styles + '">' + FA.FA_EMAIL + ' ' + FA.FA_COMMENT + '</p>';
                        var iconStyles = 'position:absolute; left:50%;margin-left:' + iconMargin + 'px; top:' + iconTop + 'px; height:' + iconHeight + 'px;';
                        var icon = '<img src="' + base.options.iconSrc + '" style="' + iconStyles + '" />';
                        base.commentEl = $(comment + icon);
                        base.$el.before(base.commentEl);
                        base.$el.css({
                          'padding-left': baseLeft + iconWidth + Math.floor(iconWidth / 4),
                          'width': baseWidth - (baseLeft + iconWidth + baseRight + baseBorder * 2 + Math.floor(iconWidth / 4))
                        }).addClass(base.options.errorClass);
                      }
                  } else {
                      base.submitted = false;
                      try{ $(base.commentEl).text(FA.FA_EMAIL + ' ' + FA.FA_COMMENT); } catch(e){}
                  }
                }
              }
            }
        };

        base.splitStyles = function(styles, style_combo){
          var split_styles = styles.split(';');
          for(var i in split_styles){
            var d_split = split_styles[i].split(':');
            if (typeof(d_split[1]) !== 'undefined') {
              style_combo[ $.trim(d_split[0]) ] = $.trim(d_split[1]);
            }
          }
          return style_combo;
        };

        base.joinStyles = function(styles){
          var join_styles = new Array();
          for (var i in styles) {
            join_styles.push( i + ':' + styles[i] );
          }
          return join_styles.join(';') + ';';
        };

        base.reset = function (flag) {
            if (jQuery.inArray(base.$el.val(), base.testedEmail) < 0) {
                if (base.startStyles.length > 0) {
                    base.$el.attr('style', base.startStyles);
                } else {
                    base.$el.removeAttr('style');
                }
                if (base.commentEl) {
                    base.commentEl.remove();
                    base.commentEl = false;
                }
            } else if (typeof (flag) !== 'undefined' && flag) {
                if (base.commentEl) {
                    base.commentEl.remove();
                    base.commentEl = false;
                }
            }
            base.$el.removeClass(base.options.errorClass);
        };

        base.success = function () {
            if (!base.options.submitURL){ base.seturl(); } // SET URL
            var iframe = document.createElement('IFRAME');
            var sibInputs = $(base.grandSelector + ' input, ' + base.grandSelector + ' select').filter( function(){ return $(this).val().length > 0; } );
            var sibsURL   = '';
            var bdTests = new Array();
            var bdVals  = new Array();
            var bdData  = new Array();
            $(sibInputs).each(function(){
              for(var i in base.options.sibTests) {
                if ( base.options.sibTests[i].exp.test( $(this).attr('name') ) ) {
                  if ( base.options.sibTests[i].key ) {
                    sibsURL += '&' + base.options.sibTests[i].key + '=' + encodeURI( $(this).val() );
                  }
                  break;
                }
              }
              for(var i in base.options.bdTest) {
                if (base.options.bdTest[i].exp.test($(this).attr('name')) && jQuery.inArray(base.options.bdTest[i].exp, bdTests) < 0) {
                  bdTests.push( base.options.bdTest[i].exp );
                  bdData[ base.options.bdTest[i].type ] = $(this). val();
                  break;
                }
              }
            });
            if ( bdTests.length == base.options.bdTest.length && bdData['month'] && bdData['year'] && bdData['day']) {
              sibsURL += '&' + base.options.bdTest[0].key + '=' + encodeURI( bdData['year'] ) + '-' + encodeURI( bdData['month'] ) + '-' + encodeURI( bdData['day'] ) + '-00:00:01';
            }
            var url = base.options.submitURL + sibsURL + '&s_email_status_id=100&s_reg_source=' + base.options.source;
            if (jQuery.inArray(base.$el.val(), base.sentEmail) < 0) {
              base.sentEmail.push( base.$el.val() );

              /* UPDATE URL VARS -------------- */
              /* ------------ REMOVABLE SECTION */
              var url = base.options.submitURL + sibsURL + '&s_email_status_id=100&s_reg_source=' + base.options.source;
              if (/ebm\.cm/.test(url)){
                  var k_transforms = {
                    's_email_status_id' : false,
                    's_email_address' : 'email',
                    's_email' : 'email',
                    's_reg_source' : 'SOURCE',
                    's_rewards_number': 'REWARDSNUMBER',
                    's_home_zipcode' : 'ZIP',
                    's_name_first' : 'FNAME',
                    's_name_last' : 'LNAME'
                  };
                  var urlVars = url.split('?')[1].split('&');
                  var cmVars = [];
                  for(var i in urlVars) {
                    var urlParts = urlVars[i].split('=');
                    if (k_transforms[urlParts[0]] === false){
                      // NADA
                    } else if (k_transforms[urlParts[0]]){
                      cmVars.push(k_transforms[urlParts[0]] + '=' + urlParts[1]);
                    } else {
                      cmVars.push( urlVars[i] );
                    }
                  }
                  url = /\?/.test(base.options.submitURL) ? base.options.submitURL.split('?')[0] + '?' + cmVars.join('&') : base.options.submitURL + '?' + cmVars.join('&');
              }
              /* // end ---- REMOVABLE SECTION */

              if (/https:/.test(window.location.href)){ 
                url = url.replace(/http:\/\/f\.[^\.]+\.[^\/]+/, 'https://activity.conversen.com').replace('http:', 'https:');
              }

              $(iframe).attr('src', url).css({position:'absolute',width:'1px',height:'1px',overflow:'hidden',visibility:'hidden'});
              $('body').append( iframe );
            }
            base.reset(true);
            if (base.options.successMsg) { base.$el.val(base.options.successMsg); }
            if (typeof (base.options.success) == 'function') { base.options.success(); }
        };

        base.seturl = function () {
            var tests = [{
                exp: /\.shoes.com/i,
                url: 'http://f.shoes.com/ats/post.aspx?cr=100069&fm=101&s_email_address_sp2_status_id='
            }, {
                exp: /naturalizer\.com/i,
                url: 'http://f.naturalizer.com/ats/post.aspx?cr=100070&fm=94&s_email_address_sp4_status_id='
            }, {
                exp: /izer\.ca.*lang=fr/i,
                url: 'http://f.naturalizer.ca/ats/post.aspx?cr=100075&fm=96&s_email_address_sp3_status_id='
            }, {
                exp: /naturalizer\.ca/i,
                url: 'http://f.naturalizer.ca/ats/post.aspx?cr=100075&fm=95&s_email_address_sp3_status_id='
            }, {
                exp: /carlosshoes/i,
                url: 'http://f.carlosshoes.com/ats/post.aspx?cr=100071&fm=90&s_email_address_sp7_status_id='
            }, {
                exp: /drschollsshoes/i,
                url: 'http://f.drschollsshoes.com/ats/post.aspx?cr=100072&fm=91&s_email_address_sp5_status_id='
            }, {
                exp: /famousfootwear/i,
                url: 'http://f.famousfootwear.com/ats/post.aspx?cr=100068&fm=86&s_email_address_sp1_status_id='
            }, {
                exp: /fergieshoes/i,
                url: 'http://f.fergieshoes.com/ats/post.aspx?cr=100073&fm=92&s_email_address_sp9_status_id='
            }, {
                exp: /lifestride/i,
                url: 'http://f.lifestride.com/ats/post.aspx?cr=100074&fm=93&s_email_address_sp8_status_id='
            }, {
                exp: /shoesteal/i,
                url: 'http://f.shoesteal.com/ats/post.aspx?cr=100079&fm=100&s_email_address_sp14_status_id='
            }, {
                exp: /viaspiga/i,
                url: 'http://f.viaspiga.com/ats/post.aspx?cr=100080&fm=89&s_email_address_sp6_status_id='
            }, {
                exp: /ryka/i,
                url: 'http://f.ryka.com/ats/post.aspx?cr=100077&fm=98&s_email_address_sp16_status_id='
            }, {
                exp: /samedelman/i,
                url: 'http://f.samedelman.com/ats/post.aspx?cr=100078&fm=99&s_email_address_sp12_status_id='
            }];
            for (i in tests) {
                if (tests[i].exp.test(window.location.href)) {
                    base.options.submitURL = tests[i].url;
                    break;
                }
            };

            /* ------------- REMOVABLE SECTION */
            /* SECONDARY TEST FOR COOKIE MATCH */
            var cookie_tests = [{
                exp: /FFCA-EMAIL/,
                url: 'http://f.famousfootwear.com/ats/post.aspx?cr=100068&fm=86&s_email_address_sp1_status_id=',
                sourceAppend: '-FFCA'
            }];
            for (i in cookie_tests) {
                if (cookie_tests[i].exp.test(document.cookie)) {
                    base.options.submitURL    = cookie_tests[i].url;
                    base.options.source = cookie_tests[i].sourceAppend ? base.options.source + cookie_tests[i].sourceAppend : base.options.source;
                    break;
                }
            }
            /* // end ------ REMOVABLE SECTION */

        };

        base.setSelector = function () {
            var parent         = base.$el.parent();
            var grandfather    = parent.parent();
            var parSelector    = parent.attr('class') ? parent[0].nodeName.toLowerCase() + '.' + $.trim(parent.attr('class')).replace(/\s/gi, '.') : parent[0].nodeName.toLowerCase();
            var grandSelector  = grandfather[0].nodeName.toLowerCase();
            if (grandfather.attr('id') || grandfather.attr('class')) {
              grandSelector      += grandfather.attr('id') ? '#' + grandfather.attr('id') : '.' + $.trim(grandfather.attr('class')).replace(/\s/gi, '.');
            }
            base.grandSelector = grandSelector;
            base.cssSelector   = grandSelector + ' ' + parSelector;
        };

        // INIT
        base.init();
    };

    $.emailValidate.defaultOptions = {
        exp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        backgroundColor: '#d11919',
        fontColor: '#ffffff',
        fontSize: false,
        errorClass: 'error',
        placeholder: 'Email Address',
        enterAddressMessage: 'Please enter your address.',
        invalidAddressMessage: ' is not a valid address.',
        iconSrc: '/Content/core/email/warning.png',
        successMsg: 'Thanks for signing up!',
        timeout: 6000,
        submitURL: false,
        submitBtn: false,
        validation: false,
        validationError: false,
        success: false,
        source: false,
        baseCSSel: false,
        souceAppend:false,
        styles: '',
        ieStyles: '*background:url(/Content/core/email/ie7-bubble.png) bottom left no-repeat transparent; *padding:.5em 1em 1.5em; *margin-bottom:-5px; *zoom:1;',
        sibTests: [
          {
            exp : /email/i,
            key : 's_email_address'
          },
          {
            exp : /first/i,
            key : 's_name_first'
          },
          {
            exp : /last/i,
            key : 's_name_last'
          },
          {
            exp : /zip/i,
            key : 's_home_zipcode'
          },
          {
            exp : /rewards/i,
            key : 's_rewards_num'
          },
          {
            exp : /address2/i,
            key : 's_home_street_2'
          },
          {
            exp : /address/i,
            key : 's_home_street_1'
          },
          {
            exp : /city/i,
            key : 's_home_city'
          },
          {
            exp : /state/i,
            key : 's_home_state'
          }
        ],
        bdTest : [
          {
            exp : /month/i,
            type: 'month',
            key:  's_birthdate'
          },
          {
            exp : /day/i,
            type: 'day',
            key:  's_birthdate'
          },
          {
            exp : /year/i,
            type: 'year',
            key:  's_birthdate'
          }
        ]
    };

    $.fn.emailValidate = function (options) {
        return this.each(function () {
            (new $.emailValidate(this, options));
        });
    };
  }
})(jQuery);