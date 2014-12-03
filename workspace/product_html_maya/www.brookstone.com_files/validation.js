///////////////////////////////////////////////////////////////////////////////
// Validation Rule
//
// Argument consists of a JS Object with the following members:
//   - name: A unique identifying name for the validation rule.
//     this must match the class name of the input that requires
//     validation.
//   - msg: The message to display should the validation fail
//   - funct: A validation function that must return true for the
//     validation to succeed.
//   - regex: A regular expression that the value must match in
//     order for the validation to succeed.
///////////////////////////////////////////////////////////////////////////////
var ValidationRule = function(init) {
	this.name = init.name;
	this.msg = init.msg;

	// verify that either a regex or a validation function has been supplied, but not both
	if (!(!(init.regex) != !(init.funct))) {
		throw Error('A validation rule must have either a regular expression or an evaluation function, but not both');
	}

	// if funct is defined, make sure it's actually a function
	if (init.funct && typeof init.funct !== 'function') {
		throw Error('The specified function is not of type "function"');
	} else {
		this.funct = init.funct;
	}

	// if regex is defined make sure it's a regular expression or a string that may be converted into one
	if (init.regex) {
		if (init.regex instanceof RegExp) {
			this.regex = init.regex;
		} else if (typeof init.regex === 'string') {
			this.regex = new RegExp(init.regex);
		} else {
			throw Error ('The specified regular expression is not a RegExp or a string that may be converted to one.');
		}
	}
}

///////////////////////////////////////////////////////////////////////////////
// Function to scrape through a form for inputs that have been
// tagged with a class matching the rule name and determine if their
// values pass the validation
///////////////////////////////////////////////////////////////////////////////
ValidationRule.prototype.validate = function(form, lead, trail) {
	var rule = this;
	var result = {
		passed: true,
		message: '',
		errors: []
	}
	if (typeof lead === 'undefined') {
		lead = '<span class="validation_rule_failure">';
	}
	if (typeof trail === 'undefined') {
		trail = '</span>';
	}

	var inputs = [];
	var formTag = null;
	var formID = null;
	if (form) {
		$.each($(form), function (i, formEl) {
			inputs = $.merge(inputs, $(formEl).find('.' + rule.name + ' input:not([type=\'hidden\']):not([id^=\'masked\']), input:not([type=\'hidden\']):not([id^=\'masked\']).' + rule.name +
					', .' + rule.name + ' input[type=\'hidden\'][class*=\'maskedPassword\'], input[type=\'hidden\'][class*=\'maskedPassword\'].' + rule.name +
					', .' + rule.name + ' select, select.' + rule.name + ', .' + rule.name + ' textarea, textarea.' + rule.name));
			formTag = $(formEl).get(0).tagName;
			formID = $bks.uniqueId(formEl).attr('id');
		});
	} else {
		inputs = $('.' + this.name + ' input:not([type=\'hidden\']), input:not([type=\'hidden\']).' + this.name +
				', .' + this.name + ' select, select.' + this.name + ', .' + this.name + ' textarea, textarea.' + this.name);
	}
	$.each(inputs, function (i, val) {
		var requiredField = $(val).hasClass('required');
		if (!requiredField) {
			if (form) {
				requiredField = $($(val).parentsUntil(formTag + '#' + formID)).hasClass('required');
			} else {
				requiredField = $(val).parents('required');
			}
		}

		if (requiredField || $(val).attr('value')) {
			var fullName = $(val).attr('name');
			if (fullName.indexOf("." > -1)) {
				// remove the ATG form handler class name from the input name
				var shortName = fullName.substring(fullName.lastIndexOf(".") + 1, fullName.length);
			} else {
				shortName = fullName;
			}

			// convert from camel case or underscore separated names
			var prettyName = shortName.replace(/_/g, ' ');
			var prettyName = prettyName.replace(/([a-z])([A-Z])/g, '$1 $2');
			prettyName = prettyName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});

			if (rule.regex) {
				if(!$(val).attr('value').match(rule.regex)) {
					result.passed = false;
					var message = lead + rule.msg.replace('%s', prettyName) + trail;
					result.message += message;
					var error = {};
					error.field = $(val);
					error.message = message;
					result.errors.push(error);
				}
			}
			else if (rule.funct) {
				if (!rule.funct($(val).attr('value'))) {
					result.passed = false;
					var message = lead + rule.msg.replace('%s', prettyName) + trail;
					result.message += message;
					var error = {};
					error.field = $(val);
					error.message = message;
					result.errors.push(error);
				}
			}
		}
	});

	if (form) {
		$bks.removeUniqueId(form);
	}

	return result;
}

///////////////////////////////////////////////////////////////////////////////
//	Container for all the rules to be applied to form inputs. A
//  form in this case may actually be any container of input
//  elements.
///////////////////////////////////////////////////////////////////////////////
var Validation = function() {

	this.rules = [
		/* Common Validation Rules */
		new ValidationRule ({name: 'required', msg: '%s is a required field', funct: function(val) { return !(!val); }}),
		new ValidationRule ({name: 'pos_int', msg: '%s must be a positive integer', regex: /^[0-9]+$/}),
		new ValidationRule ({name: 'date', msg: '%s must be in MM/DD/YYYY format', regex: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/}),
		new ValidationRule ({name: 'currency', msg: '%s must be expressed as currency (minus the $ sign)', regex: /^-?[0-9]*\.[0-9]{2}$/}),
		new ValidationRule ({name: 'email', msg: '%s must be a valid email address', regex: /^\S+@\S+\.\S+$/})
	]
}

///////////////////////////////////////////////////////////////////////////////
//	Add a new validation rule to the validation
///////////////////////////////////////////////////////////////////////////////
Validation.prototype.addRule = function(rule) {
	if (!rule || !(rule instanceof ValidationRule)) {
		throw Error('Rules must be an instance of a ValidationRule');
	}
	this.rules.push(rule);
}

///////////////////////////////////////////////////////////////////////////////
// Get an existing rule given its name
///////////////////////////////////////////////////////////////////////////////
Validation.prototype.getRule = function(ruleName) {
	var result = $.grep(this.rules, function(r){ return r.name == ruleName; });
	if (result.length > 0) {
		return result[0];
	}
	return null;
}

///////////////////////////////////////////////////////////////////////////////
// Validate all the rules on the specified form. The validation
// error messages may be prepended or appended with an optional
// leader or trailer (defaults to a span with the class
// validation_rule_failure.
///////////////////////////////////////////////////////////////////////////////
Validation.prototype.validate = function(form, lead, trail) {
	var result = {
		passed: true,
	    message: 'Validation Error(s):',
	    errors: []
	}

    for(var i = 0; i < this.rules.length; i++) {
		var ruleResult = this.rules[i].validate(form, lead, trail);
		if (!ruleResult.passed) {
			result.passed = false;
			result.message += ruleResult.message;
			$.each(ruleResult.errors, function(i, error) {
				var found = false;
				for (var i = 0; i < result.errors.length; i++) {
					if (result.errors[i].field.context === error.field.context ) {
						result.errors[i].message += error.message;
						result.errors[i].messages.push(error.message);
						found = true;
					}
				}
				if (!found) {
					var errorField = {};
					errorField.field = error.field;
					errorField.message = error.message;
					errorField.messages = [];
					errorField.messages.push(error.message);
					result.errors.push(errorField);
				}
			});
		}
	}
	return result;
}