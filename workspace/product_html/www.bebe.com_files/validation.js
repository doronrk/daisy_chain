/*************************
	Required for Input/Label redesign
*************************/
var $originalPassword;
var inputFields = function($){
	return{
		validateDoubleEntry : function( firstField, secondField )
		{
			var isValid = false;

			if ((firstField.val() != firstField.attr("name")) && ( firstField.val() == secondField ) )
				isValid = true;

			return isValid;
		},
		originalFieldChanged : function(  firstFieldVal, secondFieldVal, validationSelector )
		{
         	if( ( secondFieldVal != "")  )
         	{
         		if( secondFieldVal != firstFieldVal)
         			validationSelector.removeClass("valid").addClass("invalid");
         		else
         			validationSelector.removeClass("invalid").addClass("valid");
         	}
		}
	};

}($);

var overLabels = function($) {
    var _isWatchedInput = function(_input) {
        /* inputs that might be modifyied after login by a plugin - like lastPass or autoFill */
        var id = "";
        if (_input && (typeof(_input.attr("id")) !== "undefined")) {
            id = _input.attr("id").toLowerCase();
        } else {
            return false;
        }
        if (id == "password" || id == "username")
            return true;
/*
        if (_input.hasClass("type_password"))
            return true;
*/
        return false;
    };

	var _getLabelText = function(labelObj) {
        if (!$("body").hasClass("desktop")) {
            /* only show the ! or checkmark if mobile */
            return "";
        }
        if (labelObj.length == 0) {
            return "";
        }
		var labelText = labelObj.text();
		if (labelObj.html().indexOf("optionalKey") > 0) {
			labelText = labelText.replace(labelObj.find(".optionalKey").text(), "");
		}
		else if (labelObj.html().indexOf("asterisk") > 0) {
			labelText = labelText.replace(labelObj.find(".asterisk").text(), "");

		}
        labelText = labelText.replace(labelObj.find(".hideFromVerify").text(), "");
		return labelText;
	};

    var _prefilledFieldFocusEvent = function(_field) {
        var _scope = _field.parents(".formFieldContainer");
        var myLabel = _scope.find('label');
        var myVerify = _scope.find(".verify");
        _scope.removeClass("invalid").removeClass("valid");
        myVerify.html(_getLabelText(myLabel));
    };

    var _prefilledFieldBlurEvent = function(_field) {
        var _scope = _field.parents(".formFieldContainer");
        var myLabel = _scope.find('label');
        var myVerify = _scope.find(".verify");
        if (!_scope.hasClass("dontVerify")) {
            if ($.trim(_field.val()) == "") {
                if (myLabel.hasClass("optional"))
                    myVerify.empty();
                else
                    _scope.addClass("invalid");
            } else if (validate.fieldIsValid(_field)) {
                _scope.addClass("valid");
            } else {
                _scope.addClass("invalid");
            }
        }

        if ($.trim(_field.val()) != '') {
            myLabel.css('visibility', 'hidden');
        } else {
            myLabel.css('visibility', 'inherit');
        }
    };

	return {
		checkField : function(field) {
            _prefilledFieldFocusEvent(field);
            _prefilledFieldBlurEvent(field);
		},

		resetField : function(field, resetLabel) {
			var _scope = field.parents(".formFieldContainer");
			var myLabel = _scope.find('label');
			var myVerify = _scope.find(".verify");
			myVerify.empty();
			if (resetLabel && _scope.find('select').length == 0) {
				/* this is not a select */
				field.val("");
                myLabel.css('visibility', 'inherit');
			}
			_scope.removeClass("valid").removeClass("invalid");
		},

		init : function(_scope) {
			if (_scope.hasClass("overLabeled"))
				return;
			_scope.addClass("overLabeled");
			var myInput = [];
			var fieldType = "input"; /* should be input, select or textarea */
			/* checks for inputs that aren't buttons, then selects, then textareas */
            if (myInput.length == 0) {
                myInput = _scope.find('input:not([type=hidden])').not(".formButton");
            }
            if (myInput.length == 0) {
                myInput = _scope.find('select');
                fieldType = "select";
            }
            if (myInput.length == 0) {
                myInput = _scope.find('textarea');
                fieldType = "textarea";
            }
            if (myInput.length == 0) {
                /* give up */
                _scope.addClass("dontVerify");
                return;
            }
			var myLabel = _scope.find('label');
			var myError = _scope.find('.error').text();
            var isMobile = !$("body").hasClass("desktop"); /* covers either .mobile or .tablet */
            /*var isMobile = responsiveUtil.isMobile(); */

            if (isMobile) {
                /* if mobile/responsive show the label above the field and show the asterisk after the label */
                _scope.addClass("mobileLabeled");
                $(".asterisk",_scope).remove().insertAfter($(".labelText", _scope));
                if (!_scope.hasClass("dontPrefix")) {
                    $('<div class="fieldPrefix">' + $(".placeholder",_scope).html() + '</div>').insertBefore($(".labelFieldWrapper",_scope));
                }
            }
            
            if ($.trim(myInput.val()) == '' && (fieldType != "select")) {
                myLabel.css('visibility', 'inherit'); /* essentially visible, unless the label is hidden by its parent */
            }

			myLabel.click(function() {
				myInput.focus();
				return false;
			});

			myInput.attr("autocomplete", "off");
            if (fieldType != "select") {
                myInput.bind("focus.overLabels", function() {
                    myLabel.fadeTo(300, 0);
                }).bind("blur.overLabels", function() {
                    myLabel.fadeTo(150, 1);
                    if ($.trim(myInput.val()) != '') {
                        myLabel.css('visibility', 'hidden');
                    } else {
                        myLabel.css('visibility', 'inherit');
                    }
                });
			}

			/* setup the inline validation */
			if (!_scope.hasClass("dontVerify")) {
				/* this could be changed to .before or .after if the message needs to be above or below the input */
                if (_scope.find(".verify").length == 0) {
                    /*  hardcode the verify span if you want to force it's location, otherwise we will add it here */
                    myInput.parents('.labelFieldWrapper').append('<span class="verify"></span>');
                }

				var myVerify = _scope.find(".verify");

				myInput.bind("focus.overLabels", function(e){
                    _prefilledFieldFocusEvent(myInput);
				});

				myInput.bind("blur.overLabels", function(e){
                    _prefilledFieldBlurEvent(myInput);
				});

				/* handle a prefilled form */
				if ($.trim(myInput.val()) != '') {
					myVerify.html(_getLabelText(myLabel));
					if (validate.fieldIsValid(myInput)) {
						_scope.addClass("valid");
					} else {
						_scope.addClass("invalid");
					}
				}
			}

            myInput.bind("focus.overLabels", function(e){
                _scope.addClass("focused");
            }).bind("blur.overLabels", function(e){
                _scope.removeClass("focused");
            });

			if (_scope.hasClass("formFieldError")) {
				/* used when a JSP is showing a server side error */
				myInput.clearOverLabel();
			} else  {
                setTimeout(function(){
                    if ( $.trim(myInput.val()).length !== 0 ) {
                        myInput.checkOverLabel();
                    }
                }, 600);
                if (_isWatchedInput(myInput)) {
                    myInput.data("watchCount",0);
                    var watch = setInterval(function(){
                        if (myInput.data("watchCount") < 10) {
                            if ( $.trim(myInput.val()).length !== 0 ) {
                                myInput.checkOverLabel();
                            }
                            myInput.data("watchCount", myInput.data("watchCount")+1);
                        } else {
                            clearInterval(watch);
                        }
                    },800);
                    myInput.on("focus.watch", function(){
                        clearInterval(watch);
                        myInput.unbind("focus.watch");
                    });
                }
            }
		}
	};
}($);

jQuery.fn.checkOverLabel = function(callback){
	/* reruns inline validation, useful if modifying the value via javascript */
	overLabels.checkField(this);
	return this;
};

jQuery.fn.clearOverLabel = function(callback){
	/* reset the inline validation without clearing the value or resetting the label */
	overLabels.resetField(this);
	return this;
};

jQuery.fn.resetOverLabel = function(callback){
	/* reset the inline validation, clears the input value and places the label back in the field */
	overLabels.resetField(this, true);
	return this;
};

var validate = function($) {
	var _phoneRegexByCountry = "";
	var _zipCodeRegexByCountry = "";

	var _isMatchingCountrySpecificRegex = function(val, countryVal, regexByCountryMap) {
		val = $.trim(val);
		countryVal = $.trim(countryVal);
		var isValid = false;
		var countrySpecificRegex = "";

		if (countryVal != undefined && countryVal != "") {
			countrySpecificRegex = regexByCountryMap[countryVal];
		}

		if (countrySpecificRegex != undefined && countrySpecificRegex != "") {
			isValid = val.match(countrySpecificRegex);
		} else {
			$.each(regexByCountryMap, function(key, value) {
				if (val.match(value)) {
					isValid = true;
				}
			});
		}

		return isValid;
	};

    /* locale based zip code lookup, not used on bebe */
/*
	var _isZipCode = function(zipCodeVal, countryVal) {
		return _isMatchingCountrySpecificRegex(zipCodeVal, countryVal, _zipCodeRegexByCountry);
	};
*/
    /* legacy zip code validation */
    var _isZipCode = function(val) {
        var isValid = false;
        var $userInput = $.trim(val);
        var numReg = /^[0-9]+$/;
        var strReg = /[A-Za-z]+/;

        /* run US zipcode validation */
        if ($userInput.length == 5 && $userInput.match(numReg)) {
            isValid = true;
        } else if ($userInput.length > 5) {
            if ($userInput.charAt(5) == '-') {
                // Make sure the sixth char is a '-'
                $userInput = $userInput.split( "-" ).join('');
                if ($userInput.length == 9 && $userInput.match(numReg) ) {
                    isValid = true;
                }
            }

            if ($userInput.length == 7 ) {
                var char3 = $userInput.charAt(3);
                if (char3 == '-' || char3 == ' ') {
                    // Make sure the fourth char is a '-' or ' '(blank)
                    $userInput = $userInput.replace(char3,'');
                }
            }

            if ($userInput.length == 6) {
                var strAlpha = "";
                var strNumber = "";
                //get Alpha character
                strAlpha += $userInput.charAt(0);
                strAlpha += $userInput.charAt(2);
                strAlpha += $userInput.charAt(4);
                //get Number character
                strNumber += $userInput.charAt(1);
                strNumber += $userInput.charAt(3);
                strNumber += $userInput.charAt(5);

                if (numReg.test(strNumber) ) {
                     if ( strReg.test(strAlpha) ) {
                         isValid = true;
                     }
                }
            }
        }
        return isValid;
    };

    /* locale based phone number lookup, not used on bebe */
/*
	var _isPhoneNumber = function(phoneNumberVal, countryVal) {
		return _isMatchingCountrySpecificRegex(phoneNumberVal, countryVal, _phoneRegexByCountry);
	};
*/

    /* legacy phone number validation */
	var _isPhoneNumber = function(val) {
        var isValid = false;
        /* check for an ext (handles x111, ext111 or extension111 */
        if (val.indexOf("x")>-1) {
            val = val.split("x")[0];
        }
        var numberCount = 0;
        for (n=0; n<val.length; n++) {
            if (_isNumeric(val.charAt(n)))
                numberCount++;
            if (numberCount == 10)
                break;
        }
        if (numberCount >= 10)
            isValid = true;
        return isValid;
	};

	var _isEmailAddress = function(val) {
		val = $.trim(val);
		var isValid = false;
		var re = /^[-A-Za-z0-9_]+(\.[-A-Za-z0-9_]+){0,3}(\+[-A-Za-z0-9_]+(\.[-A-Za-z0-9_]+){0,3}){0,1}@[-A-Za-z0-9_]+(\.[-A-Za-z0-9_]+){0,3}\.[-\w]{2,4}$/;
		return re.exec(val);
	};

	var _isNumeric = function(testStr) {
		var isValid = true;
		var validChars = "0123456789";
		var character;
		if ( typeof(testStr) != "undefined" && testStr != null && testStr != "" ) {
			for (i = 0; i < testStr.length && isValid; i++) {
				character = testStr.charAt(i);
				if (validChars.indexOf(character) == -1) {
					isValid = false;
				}
			}
		} else {
			isValid = false;
		}
		return isValid;
	};

	return {
		initLocale : function(phoneRegexByCountry, zipCodeRegexByCountry) {
            /* locale not enabled for bebe */
			_phoneRegexByCountry = phoneRegexByCountry;
			_zipCodeRegexByCountry = zipCodeRegexByCountry;
		},
		isZipCode : function(zipCodeInput, countryInput) {
			return _isZipCode(zipCodeInput, countryInput);
		},
		isNumeric : function(inputNumber){
			return _isNumeric(inputNumber);
		},
		isPhoneNumber : function(phoneNumberInput, countryInput) {
			return _isPhoneNumber(phoneNumberInput, countryInput);
		},
		isEmailAddress : function(input) {
			return _isEmailAddress(input);
		},
		fieldIsValid : function(input) {
			var container = $(input).parents(".formFieldContainer");
			var val = $(input).val();
			var inputFormScope = $(input).parents("form");
			var inputReEntryField;
			var inputValidationSelector;
			var isValid = false;
            var classStr = container.attr("class");
            if (typeof(classStr)==="undefined") {
                /* there's no type to check against, so just skip it */
                return true;
            }
			var classArr = classStr.split(" ");
			var fieldType = null;
			for (i=0; i<classArr.length; i++) {
				if (classArr[i].indexOf("type_") == 0) {
					fieldType = classArr[i].replace("type_","");
					break;
				}
			}
			switch (fieldType) {
				case "select":
					if ($.trim(val).length != "")
						isValid = true;
					break;
				case "firstName":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "lastName":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "companyName":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "address":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "city":
					if ($.trim(val).length >= 3)
						isValid = true;
					break;
				case "zipCode":
					isValid = _isZipCode(val);
					break;
				case "storeLocatorText":
					val = $.trim(val);
					if( val != "")
						isValid = true;
					break;
				case "phone":
					isValid = _isPhoneNumber(val);
					break;
				case "emailAddress":
					isValid = _isEmailAddress(val);
					if (isValid) {
						inputReEntryField = inputFormScope.find("input#reEnterEmailAddress");
						inputValidationSelector = inputFormScope.find(".type_emailAddressVerify");
						inputFields.originalFieldChanged(val, $.trim( inputReEntryField.val() ), inputValidationSelector );
					}
					break;
				case "emailAddressVerify":
					isValid = _isEmailAddress(val);
					if (isValid) {
						inputReEntryField = inputFormScope.find("input.js_newEmailEntry");
						isValid = inputFields.validateDoubleEntry( inputReEntryField, val);
					}
					break;

                case "recipientEmail":
                    isValid = _isEmailAddress(val);
                    if (isValid) {
                        inputReEntryField = inputFormScope.find("input#reEnterRecipientEmail");
                        inputValidationSelector = inputFormScope.find(".type_recipientEmailAddressVerify");
                        inputFields.originalFieldChanged(val, $.trim( inputReEntryField.val() ), inputValidationSelector );
                    }
                    break;

                case "recipientEmailAddressVerify":
                    isValid = _isEmailAddress(val);
                    if (isValid) {
                        inputReEntryField = inputFormScope.find("input#recipientEmail");
                        isValid = inputFields.validateDoubleEntry( inputReEntryField, val);
                    }
                    break;




                case "oldEmailAddress":
					isValid = _isEmailAddress(val);
					break;
				case "password":
					val = $.trim( val );
					$originalPassword = $("input:not([class=formButton],[type=hidden])", $(this));
					if ((val.length >= 6) && (val.length <= 15))
					{
						isValid = true;
						inputReEntryField = inputFormScope.find("input#verifyPassword");
						inputValidationSelector = inputFormScope.find(".type_passwordVerify");
						inputFields.originalFieldChanged( val, $.trim( inputReEntryField.val() ), inputValidationSelector  );
					}
					break;
				case "passwordVerify":
					val = $.trim(val);
					if ((val.length >= 6) && (val.length <= 15))
					{
						inputReEntryField = inputFormScope.find("input.js_originalPassword");
						isValid = inputFields.validateDoubleEntry( inputReEntryField, val);
					}
					break;
				case "oldPassword":
					val = $.trim( val );
					if ((val.length >= 6) && (val.length <= 15))
					{
						isValid = true;
					}
					break;
				case "ccName":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				/** modified to fix BUG04219: to validate only numeric or masked inputs */
				case "ccNumber":
				     var $userInput = $.trim(val);
					 var userInputLength = $userInput.length;
					 var numReg = /^[0-9]+$/;

					if (userInputLength > 0 )
					{
						if( $userInput.match(numReg))
							isValid = true;
						else if(($userInput.charAt(0) == '*') && ($userInput.substring(userInputLength-4)).match(numReg))//if masked
							isValid = true;
					}
					break;

				/** added to fix BUG04219: to validate user inputs on credit card expiration date - both month and year */
				case "ccDate":
                    var userSelectedMonth = parseInt($("select[name=ccMonth]", inputFormScope).val(), 10);
                    var userSelectedYear = parseInt($("select[name=ccYear]", inputFormScope).val(), 10);
				 	if (! (isNaN(userSelectedMonth) || isNaN(userSelectedYear))){
						var userSelecteddate = new Date(userSelectedYear+"/"+userSelectedMonth+"/01");
						var currentDate = new Date();
						if(userSelecteddate > currentDate){
							 isValid = true;
						}
					}
					break;
				case "securityCode":
					if ($.trim(val).length >= 3)
					{
						var newVal = $.trim(val);
						var re = /^\d+/;
						if( re.exec(newVal) )
						{
						  isValid = true;
						}
					}
					break;
				case "loyaltyNumber":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				default :
					return true;
			}
			return isValid;
		}
	};
}($);


$(document).ready(function() {
	$(".formFieldContainer:not(.checkRadio, .errorOnly)").each(function(i) {
		overLabels.init($(this));
	});
});


