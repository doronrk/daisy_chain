/*
 * onlineaccess.js
 *
 * javascript functions for online_access_1.html, online_access_2.html
 */
 
 
//add function to window.onload events
//addLoadEvent(InitValidation);

/*
* Adds onclick event handler to page element to hide 'discount' area
*/
function InitValidation(){
	var form = document.online_access;		//form to validate

	//adds onclick event handler to form submit button
	document.getElementById('onlineaccessbtn').onclick = function(){return V.validate();}

	//creation the form validation object
	window.V = new Validation (form);
	
	//validation rules description
	V.rules = {
		email:{required:true,email:true, oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Email'}, 
		memberid:{required:true,oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Gymboree Rewards Member ID'}, 
		phone:{required:true,oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Phone'}, 
		zip:{required:true,oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Zip/Postal Code'},
		password:{required:true,oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Password'}, 
		confirm_password:{required:true,compare:'password', oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Confirm Password'}, 		
		password_hint:{required:true,oninvalid:function(e){showInvalidElement(e.parentNode)}, onsuccess:function(e){hideInvalidElement(e.parentNode)}, message:'Password Hint'}
		}
	
	//initValidators handler. Clears form elements error signs.	
/*
	V.initValidators = function(f) {
		var elems = getElementsByClass('req',f)
	    for (var i = 0; i < elems.length; i++) {
			elems[i].style.display = 'none';
		}		
	}
*/
	V.initValidators = function(f) {
		var elems = getElementsByClass('req',f)
		for (var i = 0; i < elems.length; i++) {
			elems[i].innerHTML = '&nbsp;';
		}                   
	}


	//displays error messages block when form is invalid
	V.invalidHandler = function(f) {
		var elems = getElementsByClass('message');
	    for (var i = 0; i < elems.length; i++) {
			elems[i].style.display = 'none';
		}	
		
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
		var obj = document.online_access.elements[rule]; if (!obj) continue;
		obj.onblur = function(obj){V.validate(this)}
	}
}

//displays form's element invalid sign
/*
function showInvalidElement(e){
	getElementByClass('req',e).style.display = 'block';
}

//hides form's element invalid sign
function hideInvalidElement(e){
	getElementByClass('req',e).style.display = 'none';
}
*/
function showInvalidElement(e){
    getElementByClass('req',e).innerHTML = '!';
}

function hideInvalidElement(e){
    getElementByClass('req',e).innerHTML = '&nbsp;';
}

