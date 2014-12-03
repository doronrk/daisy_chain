/*
 * enroll.js
 *
 * javascript functions for enroll_now.html
 */

//add functions to window.onload events
//addLoadEvent(InitValidation);	
//addLoadEvent(InitHide);

/*
* Adds onclick event handler to page element to hide 'discount' area
*/
function InitHide(){
	var el = document.getElementById('discount-hide');
	if (el){
		el.onclick = function(el){this.parentNode.parentNode.style.display = 'none'}
	}
}

/*
* Creates and inits form validation object
*/
function InitValidation(){
	var form = document.enroll_form;		//form to validate
	
	//adds onclick event handler to form submit button
	document.getElementById('enrollbtn').onclick = function(){		
		if (!document.getElementById('accept').checked) { 						//colors 'accept' element when it is not checked
			document.getElementById('accept_label').style.color="#ff0000";
		} else {document.getElementById('accept_label').style.color="#707171";}

		return V.validate();
	}

	//creation the form validation object
	window.V = new Validation (form);
	
	//validation rules description
	V.rules = {
		email:{required:true,email:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Email'}, 
		first_name:{required:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'First Name'},
		last_name:{required:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Last Name'},
		address1:{required:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Address Line 1'},
		city:{required:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'City'},
		state:{required:true, oninvalid:function(e){showInvalidElement(e.parentNode.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode.parentNode)}, message:'State/Province'},
		zip:{required:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Zip/Postal Code'},
		phone:{required:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Daytime Phone'},
		password:{required:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Password'},
		confirm_password:{required:true, compare:'password', oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Confirm Password'},
		password_hint:{required:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Password Hint'},
		accept:{checked:true}
		}
		
	//initValidators handler. Clears form elements error signs.	
	V.initValidators = function(f) {
		var elems = getElementsByClass('req',f)
	    for (var i = 0; i < elems.length; i++) {
			elems[i].style.display = 'none';
		}		
	}
	
	//displays error messages block when form is invalid
	V.invalidHandler = function(f) {
		var cont = document.getElementById('validation_warning');
		var message = getElementByClass('message-text',cont);	
		message.innerHTML = '';
		//cycle by triggered form's invalid rules
		for (var rule = 0; rule < this.invalidRules.length; rule++) {
			var r = this.invalidRules[rule];
			if (!this.messages[r]) continue;
			message.innerHTML += '<p class="error-title">'+this.messages[r]+'</p>';
			if (r=='required'){
				for (var i = 0; i < this.invalidElements.length; i++) {
					//var obj = getElementByClass('fieldname',this.invalidElements[i].parentNode); if (!obj) continue;
					var mess = this.rules[this.invalidElements[i].name]['message']; if (!mess) continue;
					message.innerHTML +='<p>'+mess+'</p>';
				}		
			} 
		}
		cont.style.display = 'block';
	}
	
	// attach validation events to form's elements
	for (var rule in V.rules) {		
		var obj = document.enroll_form.elements[rule]; if (!obj) continue;
		obj.onblur = function(obj){V.validate(this)}
	}
}

//display form's element invalid sign
function showInvalidElement(e){
	getElementByClass('req',e).style.display = 'block';
}

//hide form's element invalid sign
function hideInvalidElement(e){
	getElementByClass('req',e).style.display = 'none';
}

// this functions used to switch 'State/Province' form element between SELECT and INPUT according to 'Country' value
function changeCountry(country)
{
	if (country == 'US')
		changeState('select')
	else
		changeState('input')
}
function changeState(type)
{
	if (type == 'input')
	{
		document.getElementById('states').innerHTML = '<input type="text" class="text" id="state" name="state" value="" tabindex="9" />';
	}
	else if (type == 'select')
	{
		document.getElementById('states').innerHTML = '<select id="state" name="state" tabindex="9">'
														+ '<option value="">select state</option>'
														+ '<option value="AL">Alabama</option>'
														+ '<option value="AK">Alaska</option>'
														+ '<option value="AZ">Arizona</option>'
														+ '<option value="AR">Arkansas</option>'
														+ '<option value="AA">Armed Forces America</option>'
														+ '<option value="AE">Armed Forces Europe</option>'
														+ '<option value="AP">Armed Forces Pacific</option>'
														+ '<option value="CA">California</option>'
														+ '<option value="CO">Colorado</option>'
														+ '<option value="CT">Connecticut</option>'
														+ '<option value="DE">Delaware</option>'
														+ '<option value="FL">Florida</option>'
														+ '<option value="GA">Georgia</option>'
														+ '<option value="HI">Hawaii</option>'
														+ '<option value="ID">Idaho</option>'
														+ '<option value="IL">Illinois</option>'
														+ '<option value="IN">Indiana</option>'
														+ '<option value="IA">Iowa</option>'
														+ '<option value="KS">Kansas</option>'
														+ '<option value="KY">Kentucky</option>'
														+ '<option value="LA">Louisiana</option>'
														+ '<option value="ME">Maine</option>'
														+ '<option value="MD">Maryland</option>'
														+ '<option value="MA">Massachusetts</option>'
														+ '<option value="MI">Michigan</option>'
														+ '<option value="MN">Minnesota</option>'
														+ '<option value="MS">Mississippi</option>'
														+ '<option value="MO">Missouri</option>'
														+ '<option value="MT">Montana</option>'
														+ '<option value="NE">Nebraska</option>'
														+ '<option value="NV">Nevada</option>'
														+ '<option value="NH">New Hampshire</option>'
														+ '<option value="NJ">New Jersey</option>'
														+ '<option value="NM">New Mexico</option>'
														+ '<option value="NY">New York</option>'
														+ '<option value="NC">North Carolina</option>'
														+ '<option value="ND">North Dakota</option>'
														+ '<option value="OH">Ohio</option>'
														+ '<option value="OK">Oklahoma</option>'
														+ '<option value="OR">Oregon</option>'
														+ '<option value="PA">Pennsylvania</option>'
														+ '<option value="RI">Rhode Island</option>'
														+ '<option value="SC">South Carolina</option>'
														+ '<option value="SD">South Dakota</option>'
														+ '<option value="TN">Tennessee</option>'
														+ '<option value="TX">Texas</option>'
														+ '<option value="UT">Utah</option>'
														+ '<option value="VT">Vermont</option>'
														+ '<option value="VA">Virginia</option>'
														+ '<option value="WA">Washington</option>'
														+ '<option value="DC">Washington, D.C.</option>'
														+ '<option value="WV">West Virginia</option>'
														+ '<option value="WI">Wisconsin</option>'
														+ '<option value="WY">Wyoming</option>'
														+ '<option value="AB">Alberta</option>'
														+ '<option value="BC">British Columbia</option>'
														+ '<option value="MB">Manitoba</option>'
														+ '<option value="NB">New Brunswick</option>'
														+ '<option value="NF">Newfoundland</option>'
														+ '<option value="NT">Northwest Territories</option>'
														+ '<option value="NS">Nova Scotia</option>'
														+ '<option value="NU">Nunavut</option>'
														+ '<option value="ON">Ontario</option>'
														+ '<option value="PE">Prince Edward Island</option>'
														+ '<option value="QC">Province du Quebec</option>'
														+ '<option value="SK">Saskatchewan</option>'
														+ '<option value="YT">Yukon Territory</option>'
														+ '<option value="ZZ">Other</option>'
													+ '</select>';
	}
	//attach validation events to recreated element
	var obj = document.enroll_form.elements["state"]; 
	obj.onblur = function(obj){V.validate(this)}
}