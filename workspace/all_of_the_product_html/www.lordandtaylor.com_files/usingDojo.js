//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

// Sign Up email

dojo.addOnLoad(function() {
		// subscription page required fields
		parseWidget("notificationSignUp");
        parseWidget("semail");
		parseWidget("svemail");
		parseWidget("sfname");
		parseWidget("slname");
		/*parseWidget("subphone1");
		parseWidget("subphone2");
		parseWidget("subphone3");*/
		parseWidget("emailzipcode");
		parseWidget("subsubmitButton");
		parseWidget("emailzipcode");
		// registration page required fields
		parseWidget("subRegistrationPopUp");
		parseWidget("regfname");
		parseWidget("reglname");
		parseWidget("regemail");
		parseWidget("regvemail");
		parseWidget("regpassword");
		parseWidget("regvpassword");
		parseWidget("regaddress1");
		parseWidget("regaddress2");
		parseWidget("regcity");

		parseWidget("regstate");
		parseWidget("regphone1");
		parseWidget("regphone2");
		parseWidget("regphone3");
		parseWidget("regphoneext");
		parseWidget("regphoneSingle1");
		parseWidget("regmobilephone1");
		parseWidget("regmobilephone2");
		parseWidget("regmobilephone3");
		parseWidget("regmobilephoneSingle");
		parseWidget("regpostalcode");
		parseWidget("regmarketingSMS");
		parseWidget("regsubmitButton");
		parseWidget("shbcreward");
		parseWidget("reghbcreward");
	});

dojo.require("dojo.NodeList-traverse");
dojo.require("dojo.fx");
dojo.require("dojo.NodeList-fx");
dojo.require("dijit.form.Form");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dijit.form.Select");
dojo.require("dijit.form.NumberSpinner");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dojox.validate.regexp");
dojo.require("dojo.parser");
dojo.require("dijit.Dialog");
dojo.require("dijit.layout.TabContainer");
dojo.require("dojox.widget.DialogSimple");
dojo.require("dijit.TooltipDialog");
var isProductPage=true;
var lastDialog=null;
var HBC={};
var popup = false;

var qvDialog = null;
var qvScroll = null;
var qvScrollTimeoutFunc = null;
var qvScrollLastY = 0;

// Defect 1109 fix. AndyK. Do not display validation message if focus is currently on the text box.
// Overriding dijit.form.ValidationTextBox validator function and basically adding the if(this.focused)...else logic
dojo.extend(dijit.form.ValidationTextBox, {
	validator: function(/*anything*/ value, /*dijit.form.ValidationTextBox.__Constraints*/ constraints){
		if(this.focused){
			
			return true;
			
		} else {
			/*return (new RegExp("^(?:" + this.regExpGen(constraints) + ")"+(this.required?"":"?")+"$")).test(value) &&
				(!this.required || !this._isEmpty(value)) &&
				(this._isEmpty(value) || this.parse(value, constraints) !== undefined); // Boolean*/
			
			//Fix 825
			if(this.id=='zipCodeField'){
				var zipCodeValidationFlag = true;
			
					if(this.name !=null && this.name.indexOf('LT')>-1)
					  {
						
						  	if(value == ''){
								this.invalidMessage= MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODEREQUIRED"];
								
								zipCodeValidationFlag = false;
							} 
							else if(value.length <5){
								this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODE_DIGITS"];
								
								zipCodeValidationFlag = false;
								
							}else if(value.length > 5){
								this.invalidMessage = MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODETOOLONG"];
								
								zipCodeValidationFlag = false;
							}
							else if(!MessageHelper.IsNumeric(value)){
						  	    this.invalidMessage= MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODE_NUMERIC"];
						  	  
						  	  zipCodeValidationFlag =  false;
							}
						
					 }
					  	//Bopis changes for Bay
					 else if(this.name !=null && this.name.indexOf('BAY')>-1)
					 {
						
						  		if(value == ''){
									this.invalidMessage= MessageHelper.messages["VALIDATION_ERRMSG_ZIPCODEREQUIRED"];
									
									zipCodeValidationFlag = false;
								} 
						  		
						  		else if(value.length < 7){
						  			this.invalidMessage= MessageHelper.messages["SHOPPINGBAG_PAGE_ZIP_CODE_ERROR_MSG"];
									
									zipCodeValidationFlag = false;
						  			
						  		}
								else 
								{
									var postalCodeRegex = /^([a-zA-Z][0-9][a-zA-Z])\s*([0-9][a-zA-Z][0-9])$/;
									if(!postalCodeRegex.test(value))
									{
										this.invalidMessage=MessageHelper.messages["SHOPPINGBAG_PAGE_ZIP_CODE_ERROR_MSG"];
									
										zipCodeValidationFlag = false;
									}
								}
								
					}
					
					return zipCodeValidationFlag;
			}
			
			else{
				
				return (new RegExp("^(?:" + this.regExpGen(constraints) + ")"+(this.required?"":"?")+"$")).test(value) &&
				(!this.required || !this._isEmpty(value)) &&
				(this._isEmpty(value) || this.parse(value, constraints) !== undefined); // Boolean
			}
			
			//Fix 825 End
			
			
		}		
	}
});

//DGN: main HBC class
HBC={
	billingurl:'editAddressDisplayURL',
	productId:"",
	nextChild:function(node){
		var dNode=dojo.query(node);
		return (dNode.next())[0];
	},
	prevChild:function(node){
		var dNode=dojo.query(node);
		return (dNode.prev())[0];
	},
	isEmpty:function(array){
		if(array&&array.length>0)
			{return true;}
		return false
	},
	modals:function(id){
		if(lastDialog)
			{
				lastDialog.destroyRecursive();
				lastDialog.destroy();
			}
		var newParentDiv;
		newParentDiv=document.createElement("div");
		dojo.query(newParentDiv).attr({"id":id,"dojoType":"dijit.staticDialog","style":"display:block"});
		dojo.query("#main_nav").addClass("fixNavZIndex");
		return id;
	},
	show:function(node){
		dojo.fx.wipeIn({
				node:node,
				beforeBegin:function(){this.node.style.display="block";this.node.style.height=0},
				onEnd:function(){this.node.style.display="block";}
			}).play();
	},
	hide:function(node){
		dojo.fx.wipeOut({
				node:node,
				onPlay:function(){this.node.style.display="block";},
				onEnd:function(){this.node.style.display="none";}
			}).play();
	},
	remove:function(node){
		dojo.fx.wipeOut({
				node:node,
				onPlay:function(){this.node.style.display="block";},
				onEnd:function(){this.node.style.display="none";this.node.parentNode.removeChild(this.node);}
			}).play();
	},
	isVisible:function(obj){
		return obj.style("display")[0]=="none"||obj.style("visibility")[0]=="hidden";
	},
	isVisibleJS:function(obj){
		return obj.style["display"]=="none"||obj.style["visibility"]=="hidden";
	},
	//DGN: this function validates the form
	/*
	formVilidate:function(formId,ctrBTN,wrapper){
		//alert("formVilidate");
		//alert(formId);
		var _dom=wrapper||dojo.body;
		var _obj=dijit.byId(formId,_dom);
		var _btn=typeof(ctrBTN)=="object"?ctrBTN:dijit.byId(ctrBTN);
		var _items=dojo.filter(_obj.getDescendants(),function(w){
						//DGN Modified
						if(typeof(w.isValid)==="function")
						{
							//DGN modified
							w.focus();
							return w;
						}
						if(w.type=="submit")
						{
							//alert("submit");
							_btn=w;
						}
					});
		var state=_obj.validate();
		//alert(state);
		if(state)
		{
			_btn.attr("disabled",false);
			//alert("true");
			AddressHelper.saveUnregisteredCheckoutAddress('billing_address_form', 'shipping_address_form', 'billing_province_div', 'shipping_province_div');
			return true;
		}
		else
		{
			_btn.attr("disabled",true);
			//alert("false");
			return false;
		}
	},
	*/
	formVilidate:function(formId,ctrBTN,wrapper){		
		//alert("formVilidate");
		//alert(formId);
		var _dom=wrapper||dojo.body;
		var _obj=dijit.byId(formId,_dom);
		var _btn=typeof(ctrBTN)=="object"?ctrBTN:dijit.byId(ctrBTN);
		var _items=dojo.filter(_obj.getDescendants(),function(w){
						//DGN Modified
						if(typeof(w.isValid)==="function")
						{
							//DGN modified
							w.focus();
							return w;
						}
						if(w.type=="submit")
						{
							////alert("submit");
							_btn=w;
						}
					});
		var state=_obj.validate();

		////alert(state);
		if(state)
		{
			var sameaddress = document.getElementById("SameShippingAndBillingAddress");
			if(sameaddress !=null){
					var billingform = document.forms["billing_address_form"];
					var countrycode=billingform.country.value;
					if((countrycode=="US" || countrycode=="GB" || countrycode=="CA") && (shipCountryLabel == countrycode)){
						if(sameaddress.checked){

/* The copyBillingFormNew() Function will copy the values from billing form to shipping form in the UnRegisterCheckout.jsp */
						AddressBookFormJS.copyBillingFormNew('billing_address_form','shipping_address_form1');
						}
					}
				}
				_btn.attr("disabled",false);
			//AddressHelper.saveUnregisteredCheckoutAddress('billing_address_form', 'shipping_address_form', 'billing_province_div', 'shipping_province_div');
			return true;
		}
		else
		{
			// Added to fix the issue:: Submit button was getting disabled in IE8 after using parseOnLoad="false"
			if(dojo.isIE){
				_btn.attr("disabled",false);
			}
			else{
				_btn.attr("disabled",true);
			}
			////alert("false");
			return false;
		}
	},
	onFormValidStateChange:function(fromID,BTN)
	{		
		////alert("onFormValidStateChange");
		function checkFormOnDialog(fromID){
			var _obj=dijit.byId(fromID).getDescendants();
			var _14=dojo.map(_obj,function(w){
				return w.get("state")||"";
			});
			var _777=dojo.indexOf(_14,"Error")>=0?"Error":dojo.indexOf(_14,"Incomplete")>=0?"Incomplete":"";
			dijit.byId(fromID).set("state",_777);
			return _obj;
		}
		var _button=typeof(BTN)=="object"?BTN:dijit.byId(BTN);
		dojo.map(checkFormOnDialog(fromID),function(w){
			w.watch("state",function(x,y,z){
				checkFormOnDialog(fromID);
				_button.attr('disabled', !dijit.byId(fromID).isValid());
			});
		});
	},
	//DGN
	validataMessage:function(_dom,_isDailog)
	{		
		////alert("validataMessage");
		var __isDailog=(typeof(_isDailog)==="undefined")?false:true;
		function showError(_dijitObj){
			function _findLabeId(_dijitObjId){
				if(!HBC.isEmpty(_dijitObjId.match("phone")))
				{
					return dojo.query("label[for='"+_dijitObjId+"']");
				}
				else
				{

					var _dijitObjDojo=dojo.query(dojo.byId(_dijitObj.id));
					var _maxFind=5;
					var i=0;
					var returnVal="label";
					while(!_dijitObjDojo.prev("label")[0]&&i<_maxFind)
					{
						_dijitObjDojo=_dijitObjDojo.parent();
						i++;
					}
					returnVal=_dijitObjDojo.prev("label");
					if(HBC.isEmpty(returnVal))
					{
						return returnVal;

					}
					else
					{
						return dojo.query("label[for='"+_dijitObjId+"']");
					}
				}
			}
			var _cid="ErrorMessage_"+_dijitObj.id;
			var _oid="widget_"+_dijitObj.id;
			var _label=_findLabeId(_dijitObj.id);
			if(_label.length>0)
			{
				var _left=_label.style("width")[0]+7+"px";
				_label.style("clear","left")
			}
			else
			{
				var _left=0;
			}
			if(dojo.byId(_cid))
			{}
			else
			{
				var _obj=document.createElement("div");
				_obj.id=_cid;
				_obj.innerHTML=_dijitObj.invalidMessage;
				_obj.style.display="block";
				dojo.addClass(_obj,"allerrors");
				dojo.query(_obj).style({"display":"block","clear":"both"});
				dojo.place(_obj,_label[0],"before");
			}
		}
		function hideError(_dijitObj){
			var _cid="ErrorMessage_"+_dijitObj.id;
			if(dojo.byId(_cid))
			{
				dojo.destroy(dojo.byId(_cid));
			}
		}
		dijit.registry.forEach(function(widget)
		{
			if(widget.declaredClass!="dijit.form.Form"&&(widget.declaredClass!="dijit.form.Button")&&widget.declaredClass.match("dijit.form"))
			{
				widget.watch("focused",function(x,y,z){
						if(typeof(this.isValid)==="function"){
							var _s=this.isValid();
							if(!_s)
							{
								showError(this);
							}
							else
							{
								hideError(this);
							}
						}
					});
				widget.watch("disabled",function(x,y,z){
					if(typeof(this.isValid)==="function"){
							if(z)
							{
								hideError(this);
								if(widget.declaredClass==="dijit.form.FilteringSelect")
								{
									this.item=this.store.root.options[0];
								}
								else if(widget.declaredClass==="dijit.form.ValidationTextBox")
								{
									this.setValue("");
								}
							}
						}
				});
			}
			//DGN: this is the "Next" button the shipping/billing page
			//DGN: this may apply to multiple buttons on site
			else if(widget.declaredClass=="dijit.form.Button"&&widget.type=="submit")
			{
				if(__isDailog)
				{
					return false;
				}
				//DGN: dojo function associated with click action
				dojo.connect(dojo.byId(widget.id),"click",function(e){

					// Added for Subscription and Registration modal window submit event -- START
					if((dojo.byId("notificationSignUp") != null && dojo.byId("notificationSignUp") != undefined
							&& widget.id == "subsubmitButton") ||
							(dojo.byId("subRegistrationPopUp") != null && dojo.byId("subRegistrationPopUp") != undefined
									&& widget.id == "regsubmitButton") ||
									(dojo.byId("register-account") != null && dojo.byId("register-account") != undefined
											&& widget.id == "submitButton_reg") ||
											(dojo.byId("unsubscribe") != null && dojo.byId("unsubscribe") != undefined
													&& widget.id == "unsubsubmitButton") ||
													(dojo.byId("Standard_card1") != null && dojo.byId("Standard_card1") != undefined
															&& widget.id == "giftCardAddtobag") ||
														(dojo.byId("Standard_card2") != null && dojo.byId("Standard_card2") != undefined
																	&& widget.id == "virtualGiftCardAddtobag")||
																	(dojo.byId("GiftCardBalance") != null && dojo.byId("GiftCardBalance") != undefined
																			&& widget.id == "getgift")
													|| (dojo.byId("myAcctChngProfile") != null && dojo.byId("myAcctChngProfile") != undefined && widget.id == "profsubmitButton")
													|| (dojo.byId("optdownEmail") != null && dojo.byId("optdownEmail") != undefined && widget.id == "optdownEmailButton")
													|| (dojo.byId("optdownEmailFreq") != null && dojo.byId("optdownEmailFreq") != undefined && widget.id == "optdownEmailFreqButton")
													|| (dojo.byId("Logon") != null && dojo.byId("Logon") != undefined && widget.id == "submitButton")
													|| (dojo.byId("notification") != null && dojo.byId("notification") != undefined && widget.id == "notisubmitButton")
													|| (dojo.byId("Standard_card1") != null && dojo.byId("Standard_card1") != undefined && widget.id == "giftCardAddtobag")

													|| (dojo.byId("removeAddressForm") != null && dojo.byId("removeAddressForm") != undefined && widget.id == "allbutton")
													|| (dojo.byId("notification") != null && dojo.byId("notification") != undefined && widget.id == "notisubmitButton")
													|| (dojo.byId("searchByOrderNumber") != null && dojo.byId("searchByOrderNumber") != undefined && widget.id == "submitButton")
													|| (dojo.byId("checkOrderStatus") != null && dojo.byId("checkOrderStatus") != undefined && widget.id == "submitButton")
													|| (dojo.byId("viewOrderHistory") != null && dojo.byId("viewOrderHistory") != undefined && widget.id == "submitSignIn")
													|| (dojo.byId("AddressForm1") != null && dojo.byId("AddressForm1") != undefined && widget.id == "allbutton")
													|| (dojo.byId("ResetPasswordForm") != null && dojo.byId("ResetPasswordForm") != undefined && widget.id == "submitButton")
													|| (dojo.byId("Logon") != null && dojo.byId("Logon") != undefined && widget.id == "submitButton")
												|| (dojo.byId("stores_locator") != null && dojo.byId("stores_locator") != undefined && widget.id == "search-by-address")
								                 || (dojo.byId("optdownEmailFreq") != null && dojo.byId("optdownEmailFreq") != undefined && widget.id == "optdownEmailFreqButton")
								                  || (dojo.byId("optdownEmail") != null && dojo.byId("optdownEmail") != undefined && widget.id == "optdownEmailButton")

								                     || (dojo.byId("applyPostalCode") != null && dojo.byId("applyPostalCode") != undefined && widget.id == "estShipCharge")
								                     // || (dojo.byId("billing_address_form") != null && dojo.byId("billing_address_form") != undefined && widget.id == "submitButton")
														|| (dojo.byId("emailYourWish") != null && dojo.byId("emailYourWish") != undefined && widget.id == "wishlistsubmitButton")


					){
						HBC.formVilidate(dojo.query(this).parents("form").attr("id")[0],widget);
						return;
					}
					// Added for Subscription and Registration modal window submit event -- END

					//HBC.formVilidate(dojo.query(this).parents("form").attr("id")[0],widget);
					if(dojo.byId("PaymentForm1") != null && dojo.byId("PaymentForm1") != undefined){
						HBC.formVilidate(dojo.byId("PaymentForm1").id,widget);
					}
					
					//Hassane - Added for guest checkout - RTC 3163
					if((dojo.byId("billing_address_form") != null && dojo.byId("billing_address_form") != undefined && widget.id == "submitButton")){
						HBC.formVilidate(dojo.byId("billing_address_form").id,widget);
						var sameshipandbilladdress = document.getElementById("SameShippingAndBillingAddress");
						// start gift registry
						var ShipTo = document.getElementById("ShipTo");
						var ShipToCheck = true;
						if(ShipTo != undefined && ShipTo.checked)
						{
						   ShipToCheck = false;
						}
						if(!sameshipandbilladdress.checked && ShipToCheck){
						// end gift registry						
							if((dojo.byId("shipping_address_form1") != null && dojo.byId("shipping_address_form1") != undefined && widget.id == "submitButton")){
								HBC.formVilidate(dojo.byId("shipping_address_form1").id,widget);
							}
							
						}
					}					
				})
			}
		})
	},
	handleOnValidStateChange:function(s)
	{		
		////alert("handleOnValidStateChange");
		dojo.forEach(this.getDescendants(),function(w){
			if(w.type=="submit")
			{
				w.attr('disabled', !s);
			}
		});
	},
	booklistchange:function(_obj)
	{
		////alert("booklistchange");
			if(_obj.options.length==0)
			{
				return false;
			}
			_obj.blur();
			_obj.disabled=true;
			var selectVal=_obj.options[_obj.selectedIndex].value;
			dojo.xhrGet({
				url:"data/myaccountlist.json",
				handleAs:"json",
				load: function(data){
					dojo.query(".allerrors").forEach(function(item){
						dojo.destroy(dojo.byId(item.id));
					});
					var cData=data[selectVal];
					dijit.byId("fname").setValue(cData["fname"]);
					dijit.byId("lname").setValue(cData["lname"]);
					dijit.byId("address").setValue(cData["address"]);
					dijit.byId("address1").setValue(cData["address1"]);
					dijit.byId("city").setValue(cData["city"]);
					dijit.byId("_country_1").set("displayedValue",cData["country"]);
					dijit.byId("province").set("displayedValue",cData["province"]);
					dijit.byId("po").setValue(cData["po"]);
					dijit.byId("email").setValue(cData["email"]);
					dijit.byId("verifyemail").setValue(cData["email"]);
					dijit.byId("phone").setValue(cData["phone"].split("-")[0]);
					dijit.byId("phone1").setValue(cData["phone"].split("-")[1]);
					dijit.byId("phone2").setValue(cData["phone"].split("-")[2]);
					dijit.byId("phone3").setValue(cData["ext"]);
					_obj.disabled=false;
				}
			});
	},
	selectFixInit:function()
	{
		////alert("selectFixInit");
		var _obj=dijit.registry.filter(function(widget){
			if(widget.declaredClass=="dijit.form.FilteringSelect"&&!!widget.required)
			{
				widget.watch("focused",function(x,y,z){
					if(this.get("value")=="")
					{this.isValid=function(){return false;}}
					else
					{this.isValid=function(){return this.item||(!this.required&&this.get("displayedValue")=="");}}
				});
			}
		});
		return _obj;
	},
	selectFixForSection:function(root)
	{
		////alert("selectFixForSection");
		dojo.forEach(dijit.findWidgets(root),function(w){
			dojo.forEach(w.getDescendants(),function(widget){
				if(widget.declaredClass=="dijit.form.FilteringSelect"&&!!widget.required)
				{
					widget.watch("focused",function(x,y,z){
						if(this.get("value")=="")
						{this.isValid=function(){return false;}}
						else
						{this.isValid=function(){return this.item||(!this.required&&this.get("displayedValue")=="");}}
					});
				}
			});
		});
	},
	//DGN: this relates to the billing/shipping page
	//DGN: function is attached to each checkbox
	inputCheckboxInit:function()
	{
		//console.log("inputCheckboxInit");
		var _inputs=dojo.query("input[type='checkbox']");
		_inputs.forEach(function(i){
			//console.log('mazeem');
			var thisInput=i;
			if(i.parentNode.tagName.toLowerCase()=="label")
			{
				var thisLabel=i.parentNode;
				thisInput.style.display="none";
				dojo.query(thisLabel).addClass("checkbox").connect("click",function(e){

					if(dojo.hasClass(thisInput,"mazeem")){
						//console.log('i m clicked 7');
					}
					
					if(thisLabel.parentNode.tagName.toLowerCase()=="li"
						&& dojo.hasClass(thisLabel.parentNode,"ui-viewall")){
						thisInput.checked=true;
						if(!dojo.hasClass(this,"checked")){
							dojo.addClass(this,"checked");
						}
						dojo.stopEvent(e);
					}else{
						thisInput.checked=!thisInput.checked;dojo.toggleClass(this,"checked");dojo.stopEvent(e);
					}

				})
			}
			else if(HBC.nextChild(i).tagName.toLowerCase()=="label")
			{
				var thisLabel=HBC.nextChild(i);
				thisInput.style.display="none";
				dojo.query(thisLabel).addClass("checkbox").connect("click",function(e){
					if(!dojo.hasClass(thisLabel,"disabled") && !dojo.hasClass(thisLabel,"disableduncheck")){
						thisInput.checked=!thisInput.checked;dojo.toggleClass(this,"checked");
					}
					if(dojo.hasClass(thisInput,"mazeem")){
//						//console.log('i m clicked 8');

						var params = [];
						var giftBoxRunningTotal = parseFloat(document.getElementById("giftBoxRunningTotal").value);
						var GBPriceToBeUsed = parseFloat(document.getElementById("GBPriceToBeUsed").value);
						if (thisInput.checked){
							//console.log('i am clicked 8');
							params.giftboxOptType= "2";
							giftBoxRunningTotal = giftBoxRunningTotal + GBPriceToBeUsed ;
						}else{
							//console.log('i am un-clicked 8');
							giftBoxRunningTotal = giftBoxRunningTotal - GBPriceToBeUsed ;
							params.giftboxOptType= "-2";
						}



						params.orderId = dojo.byId("orderIdGiftBox").value;
						params.addressId = dojo.byId("addressIdGiftBox_" + thisInput.value ).value;
						params.orderItemId = thisInput.value;
						console.debug("GiftBox individually orderId = "+params.orderId + " addressId = " + params.addressId);
						console.debug("GiftBox individually orderItemsId = " +params.orderItemId);
						params.URL = window.location;

						// block until all ajax calls complete
						ajaxblock.init();

						wc.service.invoke("AjaxGiftboxSelect",params);



						document.getElementById("giftBoxRunningTotal").value= giftBoxRunningTotal;

						document.getElementById('gift-price').innerHTML = "$" + giftBoxRunningTotal;


//
//
//
					}
					dojo.stopEvent(e);

				})
			}
			if(thisInput.style.display!="none")
			{
				if(HBC.prevChild(i).tagName.toLowerCase()=="label")
				{
					var thisLabel=HBC.prevChild(i);
					thisInput.style.display="none";
					dojo.query(thisLabel).addClass("checkbox").connect("click",function(e){

						if(dojo.hasClass(thisInput,"mazeem")){
							//console.log('i m clicked 9');
						}
						thisInput.checked=!thisInput.checked;dojo.toggleClass(this,"checked");dojo.stopEvent(e);

					})
					//dojo.query(thisLabel).addClass("checkbox").connect("click",function(e){thisInput.checked=!thisInput.checked;dojo.toggleClass(this,"checked");dojo.stopEvent(e);})
				}
			}
			if(thisInput.checked)
			{
				dojo.query(thisLabel).addClass("checked")
			}
		});
	},
	scrollBarMoveForFilter:function(px,bar,tag,_px,barOT,tagOT)
	{
		////alert("scrollBarMoveForFilter");
		dojo.query(bar).style("top",barOT+px+"px");
		dojo.query(tag).style("top",tagOT+px*_px+"px");
	},
	leftMenuInit:function(){
		var contralEle=dojo.byId("leftmenu");
		if(!contralEle)
		{return false;}
		dojo.forEach(dojo.query(".firstM a.arr_dow",contralEle),function(i){
			var currentOn=i;
			var currentOnP=dojo.query(i).parent();
			dojo.forEach(dojo.query(i).parents(".firstM").next(".sceondM").children(".thirdM"),function(L1){
				if(dojo.query(".arr_dow",L1).length>0)
				{
					currentOn=dojo.query(i).parents(".firstM").next(".sceondM").children(".fourthM").children(".fifthM").next(".sixthM").children(".fifthM");
					dojo.forEach(currentOn,function(L2){
						if(dojo.query(L2).next(".sixthM").length<=0)
						{return false;}
						if(dojo.query(".arr_dow",L2).length>0)
						{
							dojo.query("> a",L2).addClass("orange")
						}
						else
						{
							if(dojo.query("a.orange",dojo.query(L2).parents(".fourthM")[0]).length<=0)
							{
								dojo.query("> a",L1).addClass("orange")
							}
						}
					});
					currentOn=dojo.query(i).parents(".firstM").next(".sceondM").children(".fourthM").children(".fifthM")
					dojo.forEach(currentOn,function(L2){
						
						if(dojo.query(".arr_dow",L2).length>0)
						{
							dojo.query("> a",L2).addClass("orange")
						}
						else
						{
							if(dojo.query("a.left_cate3 orange",dojo.query(L2).parents(".fourthM")[0]).length<=0)
							{
								dojo.query("> a",L1).addClass("orange")
							}
							dojo.query(currentOn).addClass("orange");
							dojo.query(".left_cate",currentOnP[0]).addClass("orange");
							
						}
					});
					
					
					
					
				}
				else
				{
					dojo.query(currentOn).addClass("orange");
					dojo.query(".left_cate",currentOnP[0]).addClass("orange");
				}
			});
		});
		dojo.query(".sceondM , .fourthM, .sixthM").map(function(item){
			var thematicPage = dojo.byId("thematicPage");
			if(thematicPage){
				
			}
			else{
				if(dojo.hasClass(item,"sceondM")&&dojo.query(item).prev(".firstM")[0].childNodes[0].className.match("arr_dow"))
				{
					//HBC.show(item);
				}
				else if(dojo.hasClass(item,"fourthM")&&dojo.query(item).prev(".thirdM")[0].childNodes[0].className.match("arr_dow"))
				{
					//HBC.show(item);
				}
				else if(dojo.hasClass(item,"sixthM")&&dojo.query(item).prev(".fifthM")[0].childNodes[0].className.match("arr_dow"))
				{
					//HBC.show(item);
				}
				else
				{
					item.style.display="none";
				}
			}
		});
		dojo.query(".thirdM").forEach(function(trd){
			var thisNext=HBC.nextChild(trd);
			if(!thisNext){return false};
			var hasNextL1=dojo.hasClass(thisNext,"fourthM");
			dojo.query("> a:not(.left_cate2)",trd).connect("click",function(e){
				var opend=dojo.hasClass(this,"arr_nor");
				var currentA=this;
				if(hasNextL1)
				{
					if(opend)
					{
						dojo.fx.wipeIn({
							node:thisNext,
							beforeBegin:function(){
									dojo.query(currentA).removeClass('arr_nor').addClass('arr_dow').addClass('orange');
									dojo.query(".left_cate2",trd).addClass('orange');
									dojo.query("> a",dojo.query(this.node).parents(".sceondM").prev(".firstM")[0]).removeClass('orange');

									if(dojo.query(this.node).children(".sixthM").style("display")[0]=="block")
									{
										dojo.query(currentA).removeClass('orange');
										dojo.query(".left_cate2",trd).removeClass('orange');
									}
								}
						}).play();
					}
					else
					{
						dojo.fx.wipeOut({
							node:thisNext,
							beforeBegin:function(){
									dojo.query(currentA).addClass('arr_nor').removeClass('arr_dow').removeClass('orange');
									dojo.query(".left_cate2",trd).removeClass('orange');
									dojo.query("> a",dojo.query(this.node).parents(".sceondM").prev(".firstM")[0]).addClass('orange');
								}
						}).play();
					}
				}

			});
		});
		dojo.query(".fifthM").forEach(function(fif){
			var thisNext=HBC.nextChild(fif);
			if(!thisNext){return false};
			var hasNextL1=dojo.hasClass(thisNext,"sixthM");
			dojo.query("> a:not(.left_cate3)",fif).connect("click",function(e){
				var opend=dojo.hasClass(this,"arr_nor");
				var currentA=this;
				if(hasNextL1)
				{
					if(opend)
					{
						dojo.fx.wipeIn({
							node:thisNext,
							beforeBegin:function(){
									dojo.query(currentA).removeClass('arr_nor').addClass('arr_dow').addClass('orange');
									dojo.query(".left_cate3",fif).addClass('orange');
									dojo.query("> a",dojo.query(this.node).parents(".fourthM").prev(".thirdM")[0]).removeClass('orange');
								}
						}).play();
					}
					else
					{
						dojo.fx.wipeOut({
							node:thisNext,
							beforeBegin:function(){
									dojo.query(currentA).addClass('arr_nor').removeClass('arr_dow').removeClass('orange');
									dojo.query(".left_cate3",fif).removeClass('orange');
									if(dojo.query("a.arr_dow",dojo.query(this.node).parents(".fourthM")[0]).length<=0)
									{
										dojo.query("> a",dojo.query(this.node).parents(".fourthM").prev(".thirdM")[0]).addClass('orange');
									}
								}
						}).play();
					}
				}

			});
		});
		dojo.query(".firstM").forEach(function(fst){
			var thisNext=HBC.nextChild(fst);
			var hasNextL1=dojo.hasClass(thisNext,"sceondM");
			dojo.query("> a:not(.left_cate)",fst).connect("click",function(e){
				var opend=dojo.hasClass(this,"arr_nor");
				var currentA=this;
				if(hasNextL1)
				{
					if(opend)
					{
						dojo.fx.wipeIn({
							node:thisNext,
							beforeBegin:function(){
									dojo.query(currentA).removeClass('arr_nor').addClass('arr_dow');
									if(dojo.query(this.node).children(".fourthM").length>0&&dojo.query(this.node).children(".fourthM").style("display")[0]=="none"&&dojo.query(this.node).style("display")[0]=="none")
									{
										dojo.query(currentA).addClass('orange');
										dojo.query(".left_cate",fst).addClass('orange');
									}
									else if(dojo.query(this.node).children(".fourthM").length<=0)
									{
										dojo.query(currentA).addClass('orange');
										dojo.query(".left_cate",fst).addClass('orange');
									}
								}
						}).play();
					}
					else
					{
						dojo.fx.wipeOut({
							node:thisNext,
							beforeBegin:function(){
									dojo.query(currentA).addClass('arr_nor').removeClass('arr_dow').removeClass('orange');
									dojo.query(".left_cate",fst).removeClass('orange');
								}
						}).play();
					}
				}

			});
		});
	},
	mainNavInit:function(){
		var contralEle = dojo.byId("main_nav");
		var currentAnimate = "";
		var lastEle = "";
		dojo.query("> li", contralEle).connect("mouseover", function(e){
				if(lastEle === this){
					window.clearTimeout(currentAnimate);
				}
				dojo.stopEvent(e);
				var showEle = dojo.query("> div", this);
				var showA = dojo.query("> a, > span", this);
				if(HBC.isEmpty(showEle)){
					lastEle = this;
					if(showEle.style("display")[0] != 'none'){
						return false;
					}
					dojo.fx.wipeIn({
						node: showEle[0],
						beforeBegin: function(){
							dojo.query(this.node).style({"display":"block","height":"0"});
							showA.addClass("current");
							var mb = dojo.marginBox(this.node);
							//Defect 2757 fix
							//if(mb.l+mb.w >= 960)
							//Part of Task 3003 - dojo.marginBox() returns wrong left (and top) values for IE7
							if (dojo.isIE==7){
								//console.log( mb.l+mb.w);
								if (this.node.id!='men1' && this.node.id!='men2' && this.node.id!='men3' && this.node.id!='men4' && this.node.id!='men5'){
									if(mb.l+mb.w >= 450){
										dojo.query(this.node).style("right", "0px");
									}
								}else if(mb.l+mb.w >= 960){
									dojo.query(this.node).style("right", "0px");
								}
							}
							else//END - Part of defect 2912 fix 
								if(mb.l+mb.w >= 959)
							{
								dojo.query(this.node).style({"right":"0"});
							}
					},
						onEnd:function(){
							//Hassane - Added this to make the grey box fit all the column - RTC3912
							if (dojo.isIE!=7){
								var mb2 = dojo.marginBox(this.node);
								var boxHeight = mb2.h;
								var subnavRightHeight = boxHeight - 26;
								var subnavRightQuery = dojo.query("#"+this.node.id+" .subnav_right");
								if (subnavRightQuery){
									var subnavRight = subnavRightQuery[0];
									if (dojo.marginBox(subnavRight).t < 25) dojo.style (subnavRight,"height",subnavRightHeight+"px")
								}
							}
							//END - Hassane - Added this to make the grey box fit all the column - RTC3912
							dojo.query(this.node).style({"display":"block"});
							}
					}).play();
				} else {
					lastEle = "";
					showA.addClass("current");
				}
			}).connect("mouseout", function(e){
					dojo.stopEvent(e);
					var showEle = dojo.query("> div", this);
					var showA = dojo.query("> a, > span", this);
					if(HBC.isEmpty(showEle)){
						currentAnimate=setTimeout(function(){
							dojo.fx.wipeOut({
								node:showEle[0],
								onPlay:function(){dojo.query(this.node).style("display","block");},
								onEnd:function(){showA.removeClass("current");}
							}).play();
						}, 200);/*Increased delay by 0.2 seconds (200ms) : Fix for defect # 3877 */
					} else {
						showA.removeClass("current");
					}
				});
	},
	reloadPorductListForFilterPage:function(url)
	{
		////alert("reloadPorductListForFilterPage");
		//originalProductList.html
		var urlTo=url||"data/productListReload.html";
		dojo.xhrGet({
			url:urlTo,
			load: function(data){
				dojo.place(data,dojo.byId("ProductsList"),"replace");
				HBC.productPageListSplit();
				HBC.quickViewInit();
			}
		});
	},
	selectFilterInit:function()
	{
		////alert("selectFilterInit");
		dojo.query("#warp").addClass("ui-filter-fix");
		var selectSection=dojo.byId("ref_select");
		var maxL=6;
		var timeouter="";
		var currentOn="";
		var lastConnect=null;
		var lastSelectedLen=0;
		var clearAll=dojo.byId("filterClearAll");
		var oUrl="data/originalProductList.html";

		dojo.query("label",selectSection).connect("click",function(e){
			var _obj=this;
			var dThis=dojo.query(this).parents(".ui-filter");
			var _selectLen=dojo.query("li:not(.ui-viewall) label.checked",dThis[0]).length;
			if(dojo.query(this).parents("li.ui-viewall").length>0)
			{
				if(dojo.hasClass(this,"checked"))
				{_selectLen=dojo.query("li label",dThis[0]).length-1;}
				else
				{
					_selectLen=0
				}
			}
			if(_selectLen<=maxL&&_selectLen>0)
			{
				dThis.parents("li").addClass("noScrollBar");
			}
			else if(_selectLen>maxL)
			{
				dThis.parents("li").removeClass("noScrollBar");
			}
			else if(_selectLen==0)
			{
				dThis.parents("li").removeClass("noScrollBar");
			}
			// DOJO 1.6 parents and closest functions do not work properly with Opera.  Using JQuery.
			if((!$(this).closest(".ui-filter").closest("li").hasClass("hasSelected"))&&_selectLen==0)
			{
				dThis.removeClass("changed");
			}
			else
			{
				dThis.addClass("changed");
			}
			dojo.query(".selectLen",dThis[0])[0].value=_selectLen;
		});
		dojo.query(".ui-filter-container > li > .ui-filter",selectSection).connect("mouseover",function(e){
				if(currentOn==this){window.clearTimeout(timeouter);}
				dojo.query(this).addClass("selected");
				currentOn=this;
				if(typeof(adjustwidth)=="function"){
					adjustwidth();
				}
				if(dojo.query(".selectLen",currentOn).length<1)
				{
					var insertData="<input type='hidden' class='selectLen' name='selectLen' value='0'>";
					dojo.place(insertData,currentOn,"last");
				}
			}).connect("mouseout",function(e){
				var _obj=this;
				var dThis=dojo.query(this);
				var currentSelectedLen=dojo.query("label.checked",selectSection).length;
					timeouter=window.setTimeout(function(){
						dThis.removeClass("selected");
						categoryDisplayJS.filterWithSelectedFilters();
						var selectLen=dojo.query(".selectLen",_obj)[0].value;
						
/*						if(selectLen>0)
						{
							dThis.parents("li").addClass("hasSelected");
						}
						else
						{
							dThis.parents("li").removeClass("hasSelected");
						}

						if(selectLen>0)
						{
							dThis.parents("li").addClass("noScrollBar");
						}
						else
						{
							dThis.parents("li").removeClass("noScrollBar");
						}
						
						if(selectLen>0)
						{
							dThis.addClass("changed");
						}
						else
						{					
							dThis.removeClass("changed");
						}
						if(dojo.hasClass(dThis[0],"changed")){
							dThis.removeClass("changed");
							if(HBC.isEmpty(dojo.query(".hasSelected")))
							{
								categoryDisplayJS.filterWithSelectedFilters();
								//HBC.show(dojo.byId("filterClearAll"));
								//HBC.reloadPorductListForFilterPage();
							}
							else
							{
								handleClearAll(oUrl)
							}
						}
*/
					},10);

				}).forEach(function(items){
						var _len=dojo.query(".ui-filter-list ul > li",items).length;
						var isOverL=_len>maxL;
						dojo.query(".ui-viewall label",items).connect("click",function(e){
							if(dojo.hasClass(this,"checked"))
							{
								dojo.query("li:not(.ui-viewall) label",items).removeClass("checked");
								dojo.query("li:not(.ui-viewall) input[type='checkbox']",items).attr("checked",false);
							}
							else
							{
								//dojo.query("label",items).addClass("checked");
								//dojo.query("input[type='checkbox']",items).attr("checked",true);
							}
						})
						dojo.query("li:not(.ui-viewall) label",items).connect("click",function(e){
							if(dojo.hasClass(this,"checked"))
							{
								dojo.query(".ui-viewall label",items).removeClass("checked");
								dojo.query(".ui-viewall input[type='checkbox']",items).attr("checked",false);
							}
							else
							{
								if(dojo.query("li:not(.ui-viewall) input(:checked)",items).length==0)
								{dojo.query(".ui-viewall label",items).addClass("checked");
								dojo.query(".ui-viewall input[type='checkbox']",items).attr("checked",true);}
							}
							//Hassane - added this device detection for defect 3913
							if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
								timeouter=window.setTimeout(function(){
									categoryDisplayJS.filterWithSelectedFilters();
								},10);
							}
							//END - Hassane - added this device detection for defect 3913
						
						})


						if(isOverL){}
					});
					function handleClearAll(url)
					{
						console.debug('Inside handleClearAll');
						var baseUrl = document.getElementsByName("filterRefreshBaseURL")[0].value;
						
						var srchArea = document.getElementById("Search_Area_div");
						var i = 1;
						while(document.getElementById("Search_Result_div"+i) != null 
								&& document.getElementById("Search_Result_div"+i) != undefined){
							var newPage = document.getElementById("Search_Result_div"+i);
							srchArea.removeChild(newPage);
							i++;
						}

				    	HBCCatalogSearchDisplayJS.goToResultPage(baseUrl,'catalogSearchResultDisplay_Controller', 'catalogSearchResultDisplay_Context');
				    	MessageHelper.displayStatusMessage(MessageHelper.messages['PAGE_REFRESH_WAIT']);

						
/*						dojo.query("li",selectSection).removeClass("noScrollBar").removeClass("hasSelected")
						dojo.query("li:not(.ui-viewall) label.checked",selectSection).forEach(function(item,index){
							dojo.query("input[type=checkbox]",item).attr("checked",false);
							dojo.query(item).removeClass("checked");
							dojo.query("input.selectLen").attr("value","0");
						});
						//HBC.reloadPorductListForFilterPage(url);
						categoryDisplayJS.filterWithSelectedFilters();
						HBC.hide(dojo.byId("filterClearAll"));
*/					}
					dojo.connect(dojo.byId("filterClearAll"),"click",function(){handleClearAll(oUrl)});
	},
	openCartQuickLook:function(url)
	{
		qvDialog = new dijit.Dialog({
			title:"",
			style:"width:719px;",
			content:'<iframe id="quick_view_iframe" src="' + url + '" frameborder="0" scrolling="no" height="550" width="705"></iframe>',
			modal: true,
			buttonCancel:"close",
			draggable:false,
			onDownloadEnd:function(){				
			console.debug("quickViewDialog onDownloadEnd start");
				
			},
			onCancel:function(){
				console.debug("quickViewDialog destroyRecursive");
				this.destroyRecursive();
				dojo.disconnect(qvScroll);
			}
		});
		qvDialog.startup();
		qvDialog.show();
		
		//Defect 1828 fix
		var nodeClose = dojo.query("span.closeText");
		if (nodeClose){
			for (var i=0; i<nodeClose.length;i++){
				if (langId=='-25') nodeClose[i].innerHTML = "FERMER X";
				else nodeClose[i].innerHTML = "CLOSE X";	
			}
		}
		// END Defect 1828 fix
		
		dojo.query('#' + qvDialog.id + ' .dijitDialogPaneContent').style({
			height: 'auto',
			padding: '6px',
			overflow: 'hidden',
			width: 'auto'
		});
		
		dojo.query('#' + qvDialog.id + ' .dijitDialogTitleBar').style({
			height: '30px'
		});
		
		dojo.query('#' + qvDialog.id + ' .closeText').style({
			top: '8px',
			right: '5px'
		});
		
		dojo.style(qvDialog.domNode, 'zIndex', 1002);
		

		// Defect 1925 fix - if quick view dialog is taller than browser view port
		//  Then must properly use browser scroll to get to bottom or top of quick view.
		qvScrollLastY = dojo.position(dojo.body()).y;
		qvScroll = dojo.connect(window, "onscroll", function(){
			// Clearing and using setTimeout with 200 ms, so that only when user
			//  stops scrolling, then height and position will be recalculated
			clearTimeout(qvScrollTimeoutFunc);
			qvScrollTimeoutFunc = setTimeout(HBC.quickViewHeightCalc, 200);
		});
		
		
	},
	quickViewInit:function()
	{
		// Defect 349 fixes - main fix - calling destroyRecursive when closing Dialog in conjunction
		//  with fix made in ProductTabsDetails to initialize liveagent
		// cleanup - remove unused code.  eval removed since DialogSimple is used with executeScripts:true
		//  note: before these changes made - observed that onDownloadEnd was not being called, also there are
		//        existing firebug console errors when opening dialog
		dojo.query(".pro_list .pro_pic a.quickview").connect("click",function(e){
			dojo.stopEvent(e);
			var url=this.href;

			console.debug("quickViewDialog dijit.Dialog creation");
			qvDialog = new dijit.Dialog({
				title:"",
				style:"width:719px;",				
				content:'<iframe id="quick_view_iframe" src="' + url + '" frameborder="0" scrolling="no" height="550" width="705"></iframe>',
				modal: true,
				buttonCancel:"close",
				draggable:false,
				onDownloadEnd:function(){				
					console.debug("quickViewDialog onDownloadEnd start");
					
					/*
					HBC.sizecolorChange();
					HBC.colorSizePriceForProductInit();
					this._position();
					popup = true;
					
					// evaluate javascript
					var scripts = this.domNode.getElementsByTagName("script");
					for (var i = 0; i < scripts.length; i++) {
						if (scripts[i].text) eval(scripts[i].text);
					}		
					*/
				},
				onCancel:function(){
					console.debug("quickViewDialog destroyRecursive");
					this.destroyRecursive();
					dojo.disconnect(qvScroll);
				}
			});
			qvDialog.startup();
			qvDialog.show();
			
			//Defect 1828 fix
			var nodeClose = dojo.query("span.closeText");
			if (nodeClose){
				for (var i=0; i<nodeClose.length;i++){
					if (langId=='-25') nodeClose[i].innerHTML = "FERMER X";
					else nodeClose[i].innerHTML = "CLOSE X";	
				}
			}
			// END Defect 1828 fix
			dojo.query('#' + qvDialog.id + ' .dijitDialogPaneContent').style({
				height: 'auto',
				padding: '6px',
				overflow: 'hidden',
				width: 'auto'
			});

			// Defect 1925 fix - if quick view dialog is taller than browser view port
			//  Then must properly use browser scroll to get to bottom or top of quick view.
			qvScrollLastY = dojo.position(dojo.body()).y;
			qvScroll = dojo.connect(window, "onscroll", function(){
				// Clearing and using setTimeout with 200 ms, so that only when user
				//  stops scrolling, then height and position will be recalculated
				clearTimeout(qvScrollTimeoutFunc);
				qvScrollTimeoutFunc = setTimeout(HBC.quickViewHeightCalc, 200);
			});
		});
	},
	// Defect 1925 fix - if quick view dialog is taller than browser view port
	//  Then must properly use browser scroll to get to bottom or top of quick view.	
	quickViewHeightCalc:function()
	{
		var viewportHeight = dojo.window.getBox().h;
		var dialogHeight = dojo.position(dojo.byId(qvDialog.id)).h
		var bodyY = dojo.position(dojo.body()).y;
		var scrollDown = (qvScrollLastY > bodyY > 0) ? true : false;
		qvScrollLastY = bodyY;
		var isDialogLarger = (dialogHeight > viewportHeight) ? true : false ;
		
		if (isDialogLarger) {
			// If scrolling down (based on last body.y position), then have bottom of
			//  quick view appear
			// If scrolling up, then have top of quick view appear
			var newDialogTop = (scrollDown) ?
				Math.max((Math.abs(bodyY) - (dialogHeight - viewportHeight)), 0):
				Math.abs(bodyY);
			dojo.style(dojo.byId(qvDialog.id),{"top":newDialogTop + "px"});
		}
	},
	productPageListSplit:function()
	{
		////alert("productPageListSplit");
		var ele=dojo.byId("ref_control");
		var items={
				items:0,
				listWrap:"ul",
				listItem:"li",
				pageCount:"a",
				pageCountTarget:"#",
				prev:"pageprev",
				next:"pagenext",
				pageNumber:"pagecount"
			}
		var listItems=dojo.query(".pro_list");
		var listItemsLen=listItems.length;
		var prePageItems=2;
		var pageNums=Math.ceil(listItemsLen/prePageItems);
		var pageListHTMLStart="<${listItem}><${pageCount} href='${pageCountTarget}' class='${prev}'>${prev}</${pageCount}></${listItem}>";
		var pageListHTMLEnd="<${listItem}><${pageCount} href='${pageCountTarget}' class='${next}'>${next}</${pageCount}></${listItem}>";
		var pageListHTMLitems="";
		var groupId=0;
		var newDiv="";
		var currentPage=0;

		function hideAll(){
			for(i=pageNums-1;i>=0;i--)
			{	id="group_"+i;
				dojo.fadeOut({
					node:id,
					duration:800,
					onEnd:function(){
						dojo.style(this.node,{"overflow":"hidden","display":"none"})
					}
				}).play();
			}
		}
		function showAll(){
			hideAll();
			currentPage=-1;
			for(i=0;i<pageNums;i++)
			{
				id="group_"+i;
				dojo.fadeIn({
					node:id,
					duration:800,
					onEnd:function(){
						dojo.style(this.node,{"display":"block"})
					}
				}).play();
			}
			var _items=dojo.query(".pro_pic",ele.dom).length;
			dojo.query(".itemCount").addContent(_items+(_items>0?" items":" item"),"only");
			dojo.query(".list_page ul li a.pagecount").addClass("on");
		}
		function showPage(id){
			hideAll();
			currentPage=id;
			var _id="group_"+id;
			dojo.fadeIn({
					node:_id,
					duration:800,
					onEnd:function(){
						dojo.style(this.node,{"display":"block"})
					},
					beforeBegin:function(){
						var _items=dojo.query(".pro_pic",this.node).length;
						dojo.query(".itemCount").addContent(_items+(_items>0?" items":" item"),"only");
						dojo.query(".list_page").forEach(function(t){
							dojo.query((dojo.query("ul li a.pagecount",t).removeClass("on"))[id]).addClass("on");
						})
					}
				}).play();
		}
		listItems.forEach(function(item,index){
					if(index%prePageItems==0)
					{
						newDiv=document.createElement("div");
						newDiv.id="group_"+groupId++;
						dojo.place(item,dojo.place(newDiv,item,"before"));
					}
					else
					{
						dojo.place(item,newDiv);
					}
				});

		for(i=1;i<=pageNums;i++)
		{
			pageListHTMLitems=pageListHTMLitems+"<${listItem}><${pageCount} href='${pageCountTarget}' class='${pageNumber}'>"+i+"</${pageCount}></${listItem}>";
		}
		dojo.query(".list_page > ul",ele.dom).forEach(function(t){
				dojo.html.set(t,dojo.string.substitute(pageListHTMLStart+pageListHTMLitems+pageListHTMLEnd,items));
			})
		dojo.query(".list_page > span",ele.dom).addClass("itemCount");
		if(typeof(lastConnect)!=="undefined"&&lastConnect!=null)
		{
			dojo.forEach(lastConnect,function(t){
				dojo.disconnect(t);
			});
		}
		lastConnect=dojo.map(dojo.query(".list_page a"),function(t){
			return dojo.connect(t,"click",function(e){
					dojo.stopEvent(e);
					if(dojo.hasClass(this,"pagecount"))
					{
						showPage(parseInt(this.innerHTML)-1);
					}
					else if(dojo.hasClass(this,"pageprev"))
					{
						if(currentPage==0)
						{return false;}
						if(currentPage==-1)
						{showPage(0);}
						else
						{showPage(currentPage-1);}
					}
					else if(dojo.hasClass(this,"pagenext"))
					{
						if(currentPage==pageNums-1)
						{return false;}
						if(currentPage==-1)
						{showPage(pageNums-1);}
						else
						{showPage(currentPage+1);}
					}
					else if(dojo.hasClass(this,"viewall"))
					{
						showAll();
					}
					else
					{return false;}
					return true;
				});
		});

		showPage(0);
	},
	giftboxInit:function()
	{
		console.debug("GiftBox Setup Start");
		var subEle=dojo.query(".gift-box-items");
		subEle.forEach(function(r){
			dojo.query(".contralPan",r).connect("click",function(e){

				if(dojo.hasClass(this,"checked"))
				{
					console.debug("GiftBox  selected , should not call command, js should be able to handle");



					HBC.hide(dojo.query(".select-items-to-box",r)[0]);
					HBC.show(dojo.query(".frame",r)[0]);
					dojo.byId("gbi").checked="true";

				}
				else
				{
					HBC.hide(dojo.query(".frame",r)[0]);

					var params = [];
					console.debug(" no GiftBox giftboxOptType = -1, call command to remove Gbx items, address not required as all gbxs will be removed");
					params.giftboxOptType= "-1";
					params.orderId = dojo.byId("orderIdGiftBox").value;
//					params.addressId = dojo.byId("addressIdGiftBox").value;

					if ( dojo.byId("gbi-items1").checked != "" || dojo.byId("gbi-items2").checked){
						// block until all ajax calls complete
						ajaxblock.init();

						wc.service.invoke("AjaxGiftboxSelect",params);
						dojo.byId("gbi-items1").checked="";
						dojo.byId("gbi-items2").checked="";
						var giftBoxRunningTotal = 0.00;

						document.getElementById("giftBoxRunningTotal").value= giftBoxRunningTotal;
						document.getElementById('gift-price').innerHTML = "$" + giftBoxRunningTotal;


						var _inputsi=dojo.query("input[type='checkbox']");
						_inputsi.forEach(function(i){
							var thisInputi=i;
							var thisLabeli=HBC.nextChild(i);
							console.log("thisInputi.checked");
							console.log(thisInputi.checked);
							if(dojo.hasClass(thisInputi,"mazeem") && thisInputi.checked){
								console.log('my buttons');
								console.log(thisInputi.checked);
								thisInputi.checked=!thisInputi.checked;
								dojo.toggleClass(thisLabeli,"checked");
							}

						});


					}
					dojo.byId("gbi").checked="";

				}
			});



			dojo.query(".gbi-radio",r).connect("click",function(){this.blur()});
			dojo.query(".gbi-radio",r).connect("change",function(){
				if(dojo.hasClass(this,"individually"))
				{

					console.debug("GiftBox individually - should not call command only display item selection list ");
					HBC.show(dojo.query(".select-items-to-box",r)[0]);


					var params = [];
					console.debug(" first remove existing so that new seect can be made so giftboxOptType = -1, call command to remove Gbx items, address not required as all gbxs will be removed");
					params.giftboxOptType= "-1";
					params.orderId = dojo.byId("orderIdGiftBox").value;
//					params.addressId = dojo.byId("addressIdGiftBox").value;

						// block until all ajax calls complete
						ajaxblock.init();

						wc.service.invoke("AjaxGiftboxSelect",params);

						var _inputsi=dojo.query("input[type='checkbox']");
						_inputsi.forEach(function(i){
							var thisInputi=i;
							var thisLabeli=HBC.nextChild(i);
							console.log("thisInputi.checked");
							console.log(thisInputi.checked);
							if(dojo.hasClass(thisInputi,"mazeem") && thisInputi.checked){
								console.log('my buttons');
								console.log(thisInputi.checked);
								thisInputi.checked=!thisInputi.checked;
								dojo.toggleClass(thisLabeli,"checked");
							}

						});




				}
				if(dojo.hasClass(this,"allitems"))
				{
					HBC.hide(dojo.query(".select-items-to-box",r)[0]);


					var giftBoxRunningTotal = 0.00;
					document.getElementById("giftBoxRunningTotal").value= giftBoxRunningTotal;
					document.getElementById('gift-price').innerHTML = "$" + giftBoxRunningTotal;

					var params = [];
					params.giftboxOptType= "1";
					params.orderId = dojo.byId("orderIdGiftBox").value;
//					params.addressId = dojo.byId("addressIdGiftBox").value;
					console.debug("all items in one , no need of address in this case GBx giftboxOptType = "+params.giftboxOptType);

					// block until all ajax calls complete
					ajaxblock.init();

					wc.service.invoke("AjaxGiftboxSelect",params);


					var _inputsi=dojo.query("input[type='checkbox']");
					_inputsi.forEach(function(i){
						var thisInputi=i;
						var thisLabeli=HBC.nextChild(i);
						console.log("thisInputi.checked");
						console.log(thisInputi.checked);
						if(dojo.hasClass(thisInputi,"mazeem") && thisInputi.checked){
							console.log('my buttons');
							console.log(thisInputi.checked);
							thisInputi.checked=!thisInputi.checked;
							dojo.toggleClass(thisLabeli,"checked");
						}

					});



				}
			})
		});


	},
	creditcardchange:function()
	{
		////alert("creditcardchange");
		var obj=dojo.byId("CreditCardList");
		if(!obj)
		{return false;}
		var selEle=dojo.query("select",obj.parentNode)[0];
		var dSelEle=dijit.byId("cardType");
		dojo.query("a",obj).forEach(function(item,index){
			dojo.connect(item,"click",function(e){
				dojo.stopEvent(e);
				if(dSelEle){
					var selectedId=index;
					var len=dSelEle.store.root.options.length;
					if(dSelEle.store.root.options[0].value==""&&len-1>selectedId)
					{
						selectedId=selectedId+1;
					}
					dSelEle.set("value",dSelEle.store.root.options[selectedId].value);
					dSelEle.set("displayedValue",dSelEle.store.root.options[selectedId].text)
					dSelEle.focus();
				}
				else if(selEle)
				{
					selEle.options[index].selected=true;
				}
			})
		});
	},



	giftoptionsInit:function()
	{
		////alert("giftoptionsInit");
		var ele=dojo.byId("options");
		var coItem=dojo.byId("options-frame");
		/*if (!(dijit.byId("GCcardNumber") && dijit.byId("pin")
				&& dijit.byId("GCcardNumber2") && dijit.byId("pin2"))) {
			return false;
		}*/
		var giftCards=[[dijit.byId("GCcardNumber"),dijit.byId("pin")],[dijit.byId("GCcardNumber2"),dijit.byId("pin2")]];
		var creditCards=[dijit.byId("cardType"),dijit.byId("cardNumber"),dijit.byId("securityCode"),dijit.byId("expiry1"),dijit.byId("expiry2")];
		function disAbaleGCAll(state){
		dojo.forEach(giftCards,function(gcs){
			/*dojo.forEach(gcs,function(tgcs){
				var _cid="ErrorMessage_"+tgcs.id;
				tgcs.attr("disabled",state);
				if(dojo.byId(_cid))
				{
					dojo.destroy(dojo.byId(_cid));
				}
			});*/
		});
		}
		function disableGC(index,state){
			dojo.forEach(giftCards[index],function(gcs){
				var _cid="ErrorMessage_"+gcs.id;
				gcs.attr("disabled",state);
				if(dojo.byId(_cid))
				{
					dojo.destroy(dojo.byId(_cid));
				}
			});
		}
		function disableCCAll(state)
		{
			/*dojo.forEach(creditCards,function(ccs){
				var _cid="ErrorMessage_"+ccs.id;
				ccs.attr("disabled",state);
				if(dojo.byId(_cid))
				{
					dojo.destroy(dojo.byId(_cid));
				}
			});*/
		}
		disAbaleGCAll(true);
		if(dojo.query(".gift-box-items").length>0)
			{HBC.giftboxInit();}
		dojo.query("h3.gift_tit > span",ele).connect("click",function(e){
			dojo.stopEvent(e);
			dojo.query(this).toggleClass("open");
			if(dojo.hasClass(this,"open"))
			{
				HBC.show(coItem);
				//console.log('done	');

				var radioGBST = document.getElementById("radioGBST").value;
				//console.log('pop');
				//console.log(radioGBST);
				if(radioGBST ==null || radioGBST == ''){
					//console.log("radioGBST status");
					//console.log(radioGBST);
					dojo.byId("gbi-items1").checked="";
					dojo.byId("gbi-items2").checked="";
					dojo.byId("gbi").checked="";

				}

				if(radioGBST == 'some'){
					//console.log("radioGBST status");
					//console.log(radioGBST);
					dojo.byId("gbi-items1").checked="";
					dojo.byId("gbi-items2").checked="checked";
					dojo.byId("gbi").checked="checked";
				}


				if(radioGBST == 'all'){
					//console.log("radioGBST status");
					//console.log(radioGBST);
					dojo.byId("gbi-items1").checked="checked";
					dojo.byId("gbi-items2").checked="";
					dojo.byId("gbi").checked="checked";
				}

			}
			else
			{
				HBC.hide(coItem);
			}
		});

		dojo.query("#PaybyCreditCard,#PaybyGiftCard").forEach(function(t,index){
				if(t.checked)
				{
					if(index==0)
					{
						dojo.query(".pay-by-credit-card",this.parentNode).style("display","block");
					}
					else if(index==1)
					{
						dojo.query(".pay-by-gift-card",this.parentNode).style("display","block");
					}
				}
				else
				{
					if(index==0)
					{
						dojo.query(".pay-by-credit-card",this.parentNode).style("display","none");
					}
					else if(index==1)
					{
						dojo.query(".pay-by-gift-card",this.parentNode).style("display","none");
					}
				}
		});
		var pcc=dojo.connect(dojo.query("label[for='PaybyCreditCard']")[0],"click",function(e){
				var node=dojo.query(".pay-by-credit-card",this.parentNode)[0];
				var isChecked=node.style.display=="none";
				if(isChecked){
						dojo.fx.wipeIn({
							 node:node,
							 beforeBegin:function(){this.node.style.height=0;disableCCAll(false);},
							 onEnd:function(){
								 this.node.style.display="block";
							 		disAbaleGCAll(true);
									//HBC.hide(dojo.query(".pay-by-gift-card")[0]); ****comented as requested****
									//HBC.hide(dojo.query(".cardinfo")[1]);	****comented as requested****
									 //dojo.removeClass(dojo.query(".cardinfo.first .add-another-card a")[0],"childOpend"); ****comented as requested****
									//dojo.removeClass(pgc[0],"checked"); ****comented as requested****
									//dojo.byId(dojo.query(pgc[0]).attr("for")[0]).checked=false;
							 }
							}).play();
					}
				else
				{
						dojo.fx.wipeOut({
							 node:node,
							 onEnd:function(){
									 disableCCAll(true);
								 if(dojo.hasClass(dojo.query(".cardinfo.first .add-another-card a")[0],"childOpend"))
								 {
									 disAbaleGCAll(false);
								}
								else
								{
									 disableGC(0,false);
								}
									 //HBC.show(dojo.query(".pay-by-gift-card")[0]); ****comented as requested****
									 //HBC.show(dojo.query(".cardinfo.first")[0]); ****comented as requested****
									 //dojo.addClass(pgc[0],"checked"); ****comented as requested****
									//dojo.byId(dojo.query(pgc[0]).attr("for")[0]).checked=true;
								 }
							}).play();
				}
		});
		var pgc=dojo.connect(dojo.query("label[for='PaybyGiftCard']")[0],"click",function(){
				var node=dojo.query(".pay-by-gift-card",this.parentNode)[0];
				var isChecked=node.style.display=="none";
				if(isChecked){
						dojo.fx.wipeIn({
							 node:node,
							 beforeBegin:function(){this.node.style.height=0;dojo.query(".cardinfo.first",this.node).style("display","block");disableGC(0,false);},
							 onEnd:function(){
								 disableCCAll(true);
									//HBC.hide(dojo.query(".pay-by-credit-card")[0]); ****comented as requested****
									//dojo.removeClass(pcc[0],"checked"); ****comented as requested****
									//dojo.byId(dojo.query(pcc[0]).attr("for")[0]).checked=false;
								}
							}).play();
					}
				else
				{
						dojo.fx.wipeOut({
							 node:node,
							 onEnd:function(){dojo.query(".cardinfo.first .add-another-card a",this.node).removeClass("childOpend");
							 dojo.query(".cardinfo",this.node).style("display","none");
							 	disAbaleGCAll(true);
								disableCCAll(false);
								//HBC.show(dojo.query(".pay-by-credit-card")[0]); ****comented as requested****
									//dojo.addClass(pcc[0],"checked"); ****comented as requested****
									//dojo.byId(dojo.query(pcc[0]).attr("for")[0]).checked=true;
							 }
							}).play();

				}
		});
		dojo.query(".cardinfo a.pay-by-card1").connect("click",function(e){
			var _n=dijit.byId("GCcardNumber").isValid();
			var _p=dijit.byId("pin").isValid();
			if(_n&&_p){
			dojo.query(this).next("").style("display","block");}
			});
		dojo.query(".cardinfo a.pay-by-card2").connect("click",function(e){
			var _n=dijit.byId("GCcardNumber2").isValid();
			var _p=dijit.byId("pin2").isValid();
			if(_n&&_p){
			dojo.query(this).next("").style("display","block");}
			});
		dojo.query(".cardinfo.first .add-another-card a").connect("click",function(e){
			dojo.stopEvent(e);
			if(!dojo.hasClass(this,"childOpend"))
			{
				var child=(dojo.query(this).parents(".cardinfo")).next()[0];
				dojo.query(this).addClass("childOpend");
				dojo.fx.wipeIn({
					 node:child,
					 onEnd:function(){disableGC(1,false);}
					}).play();
			}
			return false;
		});
		dojo.query(".cardinfo.first .add-another-card a").removeClass("childOpend");
		dojo.query(dojo.query(".cardinfo")[1]).style("display","none");
	},

loadShippingAddressStaticDialog:function(url){
		//var url=this.href;
		var thisParents=dojo.query(this).parents("div.address");
		var cthisID=thisParents.children("div.address_info").attr("id")[0];
		lastDialog= new dijit.staticDialog({
			title:(langId == '-25') ? "Adresse de livraison" : "Shipping Address",
			href:url,
			buttonCancel:"close",
			draggable:false,
			refreshOnShow:true,
			onDownloadEnd:function(){
				var _this=this;
				var _dom=this.domNode;
				var form=dijit.byId("addressFormUpdate",_dom);
				dojo.query("#cancelButton",_dom).connect("click",function(e){
					dojo.stopEvent(e);
					_this.hide();
				});
				
				var nodeClose = dojo.query("span.closeText");
				if (nodeClose){
					for (var i=0; i<nodeClose.length;i++){
						if (langId=='-25') nodeClose[i].innerHTML = "FERMER X";
						else nodeClose[i].innerHTML = "CLOSE X";	
					}
				}
				
				//Abraham Raghib: this is needed is order to setup the states/provinces drop down using the property files
				var editShippingForm = document.forms["addressFormUpdate"];
				var currentState = editShippingForm.curentstate.value;
				//alert("currentState"+currentState);
				AddressHelper.loadStatesUI('addressFormUpdate','','stateDiv1','province',currentState);
				
				HBC.onFormValidStateChange("addressFormUpdate","submitButton");
				dojo.query("#submitButton",_dom).connect("click",function(e){
					dojo.stopEvent(e);

					if (!HBC.formVilidate("addressFormUpdate","submitButton",_dom)) {
						return false;
					}					
					// Added for State Validation - For Defect 4058
					var isStateValid=true;
					if(editShippingForm._country_1.value != "GB"){
						var form = document.getElementById("addressFormUpdate");
						var errorLabel = dojo.byId("shippingErrMsg");
						if(form.state.value == null || form.state.value == ""){
							AddressHelper.showStateErrorMsg('addressFormUpdate','province',errorLabel);
							UtilitiesJS.toggleErrorMsg(errorLabel, "block");
							setTimeout("UtilitiesJS.toggleErrorMsg(dojo.byId('shippingErrMsg'),'none')",3000);
							//return false;
							isStateValid=false;
						}
						else{
							UtilitiesJS.toggleErrorMsg(errorLabel, "none");
							//return true;
						}
					}
					
					//Hassane - RTC 3168 - Added	for phone number validation before actions
					var isPhoneNumberValid=true;
					var phone1 = dojo.byId("bphone1");
		  			var phone2 = dojo.byId("bphone2");
		  			var phone3 = dojo.byId("bphone3");
		  			var phoneExt = dojo.byId("bphone4");
		  			if (phone1.value.length==0 ||phone2.value.length==0 ||phone3.value.length==0){
		  				isPhoneNumberValid = false;
		   		    }
		    		else if((phone1.value.length > 0 && (phone1.value.length != 3 || !MessageHelper.IsNumeric(phone1.value)))
		    		 	||(phone2.value.length > 0 && (phone2.value.length != 3 || !MessageHelper.IsNumeric(phone2.value)))
		    		 	||(phone3.value.length > 0 && (phone3.value.length != 4 || !MessageHelper.IsNumeric(phone3.value)))
		    		 	||(phoneExt.value.length > 0 && (phoneExt.value.length > 6 || !MessageHelper.IsNumeric(phoneExt.value)))){
		    		 	isPhoneNumberValid = false;
		   		    }

		  			if (isPhoneNumberValid && isStateValid){
		  				//END - Hassane - RTC 3168 - Added	for phone number validation before actions
		  				QAS_setAddressFields([["address","address1","address3","city","province","po"]]);
						QAS_setCountryFields(["_country_1"]);
					
					var postProcessing = function(){
						AddressHelper.saveShopCartAddress('AjaxUpdateAddressForPerson','addressFormUpdate');
						_this.hide();						
					}
					
						QAS_Verify(postProcessing);
						return false;
		  			}
				});

				// If editing user profile address with no address line 1, don't do initial page load validation
				// Not completely sure what HBC.formVilidate handles here (why does dialog even have to be initially validated)
				var addrLine1ExistIndicatorObj = dojo.query("#shipping_address_isValid");
				var doInitialValidation = (addrLine1ExistIndicatorObj.length == 0 || addrLine1ExistIndicatorObj[0].value == "true") ? true : false;
				if (doInitialValidation) {
					HBC.formVilidate("addressFormUpdate","submitButton",_dom);
				}

				HBC.selectFixForSection(_dom);
				HBC.validataMessage(_dom,true);
			}
		},HBC.modals("editShippingAddressModal"));
		lastDialog.show();

		},


	loadStaticDialog:function(url){
			lastDialog= new dijit.staticDialog({
				title:(langId == '-25') ? "Adresse de facturation" : "Billing Address",
				href:url,
				buttonCancel:"close",
				draggable:false,
				onDownloadEnd:function(){
					var _this=this;
					var _dom=this.domNode;
					dojo.query("#cancelButton",_dom).connect("click",function(e){
						dojo.stopEvent(e);
						_this.hide();
					});
					
					var nodeClose = dojo.query("span.closeText");
					if (nodeClose){
						for (var i=0; i<nodeClose.length;i++){
							if (langId=='-25') nodeClose[i].innerHTML = "FERMER X";
							else nodeClose[i].innerHTML = "CLOSE X";	
						}
					}

					var editbillingform = document.forms["billingAddressFormUpdate"];
					var currentState = editbillingform.curentstate.value;
					//alert("currentState"+currentState);
					AddressHelper.loadStatesUI('billingAddressFormUpdate','','stateDiv1','WC__ShoppingCartAddressEntryForm_billing_address_form_state_1',currentState);

					HBC.onFormValidStateChange("billingAddressFormUpdate","submitButton");
					dojo.query("#submitButton",_dom).connect("click",function(e){
						dojo.stopEvent(e);
						if(!HBC.formVilidate("billingAddressFormUpdate","submitButton",_dom)) {
							return false;
						}
						// Added for State Validation - For Defect 4058
						var isStateValid=true;
						if(editbillingform._country_1.value != "GB"){
							var form = document.getElementById("billingAddressFormUpdate");
							var errorLabel = dojo.byId("billingErrMsg");
							if(form.state[0].value == null || form.state[0].value == ""){
								AddressHelper.showStateErrorMsg('billingAddressFormUpdate','WC__ShoppingCartAddressEntryForm_billing_address_form_state_1',errorLabel);
								UtilitiesJS.toggleErrorMsg(errorLabel, "block");
								setTimeout("UtilitiesJS.toggleErrorMsg(dojo.byId('billingErrMsg'),'none')",3000);
								//return false;
								isStateValid=false;
							}
							else{
								UtilitiesJS.toggleErrorMsg(errorLabel, "none");
								//return true;
							}
						}
						
						//Hassane - RTC 3168 - Added	for phone number and email validation before actions
						var isPhoneNumberValid=true;
						var phone1 = dojo.byId("bphone1");
			  			var phone2 = dojo.byId("bphone2");
			  			var phone3 = dojo.byId("bphone3");
			  			var phoneExt = dojo.byId("bphone4");
			  			if (phone1.value.length==0 ||phone2.value.length==0 ||phone3.value.length==0){
			  				isPhoneNumberValid=false;
			   		    }
			    		else if((phone1.value.length > 0 && (phone1.value.length != 3 || !MessageHelper.IsNumeric(phone1.value)))
			    		 	||(phone2.value.length > 0 && (phone2.value.length != 3 || !MessageHelper.IsNumeric(phone2.value)))
			    		 	||(phone3.value.length > 0 && (phone3.value.length != 4 || !MessageHelper.IsNumeric(phone3.value)))
			    		 	||(phoneExt.value.length > 0 && (phoneExt.value.length > 6 || !MessageHelper.IsNumeric(phoneExt.value)))){
			    		 	isPhoneNumberValid=false;
			   		    }
			  			
			  			var regExp = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
			  			//Changed the id of email field from 'email' to 'email1' as there's another id by same name thats 'email' in the footer
			  			var email = dojo.byId("email1");	
			  			var isEmailValid = true;
			  			if (email.value.length==0 ||
			  				email.value.length>60 ||
			  			   (email.value.length > 0  && (email.value.search(regExp) == null ||	email.value.search(regExp) == -1))) {
			  				
			  				isEmailValid = false;
			  			
			  			}
			  			if (isPhoneNumberValid && isEmailValid && isStateValid){
			  				//END - Hassane - RTC 3168 - Added	for phone number and email validation before actions
			  				var currBillCtry = editbillingform._country_1.value;
				    		if (currBillCtry == "US") {
				    			QAS_setAddressFields([["address","address1","address3","city","WC__ShoppingCartAddressEntryForm_billing_address_form_state_1","po"]]);
				    		} else {
				    			QAS_setAddressFields([["address","address1","address3","city","WC__ShoppingCartAddressEntryForm_billing_address_form_state_1","po1"]]);
				    		}

							QAS_setCountryFields(["_country_1"]);
						
							var postProcessing = function(){
								AddressHelper.saveShopCartAddress('AjaxUpdateAddressForPerson','billingAddressFormUpdate');
								_this.hide();						
							}
						
							QAS_Verify(postProcessing);
							return false;
			  			}
					});

					// If editing user profile address with no address line 1, don't do initial page load validation
					// Not completely sure what HBC.formVilidate handles here (why does dialog even have to be initially validated)
					var addrLine1ExistIndicatorObj = dojo.query("#billing_address_isValid_1");
					var doInitialValidation = (addrLine1ExistIndicatorObj.length == 0 || addrLine1ExistIndicatorObj[0].value == "true") ? true : false;
					if (doInitialValidation) {
						HBC.formVilidate("billingAddressFormUpdate","submitButton",_dom);
					}
					HBC.selectFixForSection(_dom);
					HBC.validataMessage(_dom,true);
				}
			},HBC.modals("editBillingAddressModal"));
			lastDialog.show();

		},


		checkoutButtonEnableDisable:function(buttonId1,buttonId2){
					if(dojo.isIE){
					document.getElementById("guestShopperContinue").disabled = true;
					document.getElementById("signInAndCheckoutbtn").disabled = true;
					}else{
						buttonId1.setAttribute('disabled', true);
						buttonId2.setAttribute('disabled', true);
					}

			},
			
			/* mazeem : fixing curreny format issues for bay and LT 
			 * start
			 * generic function to format totalHidden value on payment page so that order submission works
			 * */
			
			formatTotalHiddenForPayment:function(){
				
				
				if (document.getElementById('totalHidden').innerHTML.indexOf('$') > 0) { // NON USD format, FR e.g : 165,95 $
					//Hassane - Using dojo.trim because JS strinf.trim() is not supported by IE8 - see defect 3719
					//return document.getElementById('totalHidden').innerHTML.substr(0,document.getElementById('totalHidden').innerHTML.length-1).replace(/&nbsp;/g,'').replace(/,/g,'.').trim() ;
					return dojo.trim(document.getElementById('totalHidden').innerHTML.substr(0,document.getElementById('totalHidden').innerHTML.length-1).replace(/&nbsp;/g,'').replace(/,/g,'.')) ;
				}else{ // USD format e.g : $165.95
					return document.getElementById('totalHidden').innerHTML.substring(document.getElementById('totalHidden').innerHTML.indexOf('$') + 1).replace(/,/g, '');
				}
				

		},
			
			/* mazeem :
			 * end
			 * generic function to format totalHidden value on payment page so that order submission works
			 * */
			

			checkoutButtonDisable:function(buttonId1,buttonId2){
				if(dojo.isIE){
					document.getElementById("guestShopperContinue").disabled = false;
					document.getElementById("signInAndCheckoutbtn").disabled = false;
				}else{
					buttonId1.setAttribute('disabled', false);
					buttonId2.setAttribute('disabled', false);
				}

			},

			checkoutButtonEnableRegUsr:function(buttonId1){
				if(dojo.isIE){
					document.getElementById("shopcartCheckout").disabled = true;
					}else{
						buttonId1.setAttribute('disabled', true);
					}
			},
			
			checkoutButtonDisableRegUsr:function(buttonId1){
				if(dojo.isIE){
					document.getElementById("shopcartCheckout").disabled = false;
				}else{
					buttonId1.setAttribute('disabled', false);
				}
			},
			
			
	/* In UnRegisterCheckout.jsp
	 * when the checkbox is checked or unchecked this will be called and enabled or disabled of shipping form fields will be done.
	 * Depending on  Current Country value, Phone Fields of Billing Form will be  Enabled or Disabled,
	 */
		ukStateEnableDisable:function(form){
			if(dijit.byId("WC__ShoppingCartAddressEntryForm_billing_address_form_state_1") != null){
				//alert("ukStateEnableDisable");
				var sameaddress = document.getElementById("SameShippingAndBillingAddress");
				var countrycode = form.country.value;
				var uKEnableFlagforEditAddress = form.uKEnableFlagforEditAddress.value;
				var currentState = form.curentstate.value;
				var phoneVal = form.phone1.value;

			if(countrycode == "GB"){
				dijit.byId("WC__ShoppingCartAddressEntryForm_billing_address_form_state_1").attr("disabled",false);
				dijit.byId("WC__ShoppingCartAddressEntryForm_billing_address_form_state_1").setValue(currentState);
				if(sameaddress !=null || uKEnableFlagforEditAddress == "true"){
					//alert("inside enable");
					dijit.byId("bphone1").attr("disabled",true);
					dijit.byId("bphone2").attr("disabled",true);
					dijit.byId("bphone3").attr("disabled",true);
					dijit.byId("bphone4").attr("disabled",true);
					dijit.byId("ukphone").attr("disabled",false);
					if(uKEnableFlagforEditAddress == "true"){
						if(countrycode=="US"){
							dijit.byId("po").attr("disabled",false);
							dijit.byId("po1").attr("disabled",true);
						}else{
							dijit.byId("po").attr("disabled",true);
							dijit.byId("po1").attr("disabled",false);
						}
					}
				}
			}else{

				dijit.byId("WC__ShoppingCartAddressEntryForm_billing_address_form_state_1").attr("disabled",true);
				if(sameaddress !=null || uKEnableFlagforEditAddress == "true"){
					dijit.byId("bphone1").attr("disabled",false);
					dijit.byId("bphone2").attr("disabled",false);
					dijit.byId("bphone3").attr("disabled",false);
					dijit.byId("bphone4").attr("disabled",false);
					dijit.byId("ukphone").attr("disabled",true);
					if(uKEnableFlagforEditAddress == "true"){
						if(countrycode=="US"){
							dijit.byId("po").attr("disabled",false);
							dijit.byId("po1").attr("disabled",true);
						}else{
							dijit.byId("po").attr("disabled",true);
							dijit.byId("po1").attr("disabled",false);
						}
					}
				}
			}
		}

		},


	shippingAddressInitOnload:function(){

		var sameaddress = document.getElementById("SameShippingAndBillingAddress");
		// gift registry
		var grShipto = document.getElementById("SameShippingAndBillingAddress");
		var isGRFlow= "false";
		if(document.getElementById('isGiftRegistryFlow') != null)
		{
			isGRFlow = document.getElementById('isGiftRegistryFlow').value;
		}
		if(isGRFlow == "true"){
			grShipto = document.getElementById("ShipTo");
		}
		var billingform = document.forms["billing_address_form"];
		var countrycode=billingform.country.value;
			if(sameaddress !=null){
				if(countrycode=="US"){
					dijit.byId("po").attr("disabled",false);
					dijit.byId("po1").attr("disabled",true);
				}else{
					dijit.byId("po").attr("disabled",true);
					dijit.byId("po1").attr("disabled",false);
				}
			}
			if (sameaddress.checked || grShipto.checked){// gift registry
					hideElementById("shipping-address-form");
					dijit.byId("fname2").attr("disabled",true);
					dijit.byId("lname2").attr("disabled",true);
					dijit.byId("address4").attr("disabled",true);
					dijit.byId("address5").attr("disabled",true);
					dijit.byId("city2").attr("disabled",true);
					dijit.byId("po2").attr("disabled",true);
					dijit.byId("po3").attr("disabled",true);
					dijit.byId("sphone").attr("disabled",true);
					dijit.byId("sphone2").attr("disabled",true);
					dijit.byId("sphone3").attr("disabled",true);
					dijit.byId("sphone4").attr("disabled",true);
			}
			else if(!sameaddress.checked && !grShipto.checked){// gift registry
				showElementById("shipping-address-form");
				dijit.byId("fname2").attr("disabled",false);
				dijit.byId("lname2").attr("disabled",false);
				dijit.byId("address4").attr("disabled",false);
				dijit.byId("address5").attr("disabled",false);
				dijit.byId("city2").attr("disabled",false);
				if(shipCountryLabel=="US"){
					dijit.byId("po2").attr("disabled",false);
					dijit.byId("po3").attr("disabled",true);
				}else{
					dijit.byId("po2").attr("disabled",true);
					dijit.byId("po3").attr("disabled",false);
				}
				dijit.byId("sphone").attr("disabled",false);
				dijit.byId("sphone2").attr("disabled",false);
				dijit.byId("sphone3").attr("disabled",false);
				dijit.byId("sphone4").attr("disabled",false);
		}
			else
				{
					showElementById("shipping-address-form");
					dijit.byId("fname2").attr("disabled",false);
					dijit.byId("lname2").attr("disabled",false);
					dijit.byId("address4").attr("disabled",false);
					dijit.byId("address5").attr("disabled",false);
					dijit.byId("city2").attr("disabled",false);
					if(shipCountryLabel=="US"){
						dijit.byId("po2").attr("disabled",false);
						dijit.byId("po3").attr("disabled",true);
					}else{
						dijit.byId("po2").attr("disabled",true);
						dijit.byId("po3").attr("disabled",false);
					}
					dijit.byId("sphone").attr("disabled",false);
					dijit.byId("sphone2").attr("disabled",false);
					dijit.byId("sphone3").attr("disabled",false);
					dijit.byId("sphone4").attr("disabled",false);
				}
		},


	//DGN: shipping address function
	//this function displays or removes the shipping address form fields
	//this function is triggered by the event generated from clicking the checkbox

	//It Can be Removed
	shippingAddressInit:function()
	{

		var ele=dojo.byId("shipping_payment");
		dojo.query("label[for='sameasb']").connect("click",function(){
			var isChecked=!dojo.hasClass(this,"checked");
			if(isChecked)
			{
				dojo.fx.wipeIn({
					node:dojo.byId("shipping-address-form"),
					beforeBegin:function(){
						this.node.style.display="block";
						this.node.style.height=0;
//						dijit.byId("fname2").setValue(dijit.byId("fname").getValue());
//						dijit.byId("lname2").setValue(dijit.byId("lname").getValue());
//						dijit.byId("address2").setValue(dijit.byId("address").getValue());
//						dijit.byId("address3").setValue(dijit.byId("address1").getValue());
//						dijit.byId("city2").setValue(dijit.byId("city").getValue());
//						dijit.byId("province2").setValue(dijit.byId("province").getValue());
//						dijit.byId("po2").setValue(dijit.byId("po").getValue());
//
//						dijit.byId("phone6").setValue(dijit.byId("phone").getValue());
//						dijit.byId("phone7").setValue(dijit.byId("phone1").getValue());
//						dijit.byId("phone8").setValue(dijit.byId("phone2").getValue());
//						dijit.byId("phone9").setValue(dijit.byId("phone3").getValue());
						dijit.byId("fname2").attr("value","");
						dijit.byId("lname2").attr("value","");
						dijit.byId("address2").attr("value","");
						dijit.byId("address3").attr("value","");
						dijit.byId("city2").attr("value","");
						dijit.byId("country2").item=dijit.byId("country2").store.root.options[0].value;
						dijit.byId("country2").set("displayedValue",dijit.byId("country2").store.root.options[0].text);
						dijit.byId("province2").item=dijit.byId("province2").store.root.options[0].value;
						dijit.byId("province2").set("displayedValue",dijit.byId("province2").store.root.options[0].text);
						//dijit.byId("country2").attr("value","");
						//dijit.byId("province2").attr("value","");
						dijit.byId("po2").attr("value","");
						dijit.byId("po3").attr("value","");
						dijit.byId("phone6").attr("value","");
						dijit.byId("phone7").attr("value","");
						dijit.byId("phone8").attr("value","");
						dijit.byId("phone9").attr("value","");

						dijit.byId("fname2").attr("disabled",false);
						dijit.byId("lname2").attr("disabled",false);
						dijit.byId("address2").attr("disabled",false);
						dijit.byId("address3").attr("disabled",false);
						dijit.byId("city2").attr("disabled",false);
						dijit.byId("country2").attr("disabled",false);
						dijit.byId("province2").attr("disabled",false);
						if(shipCountryLabel=="US"){
							dijit.byId("po2").attr("disabled",false);
							dijit.byId("po3").attr("disabled",true);
						}else{
							dijit.byId("po2").attr("disabled",true);
							dijit.byId("po3").attr("disabled",false);
						}
						dijit.byId("phone6").attr("disabled",false);
						dijit.byId("phone7").attr("disabled",false);
						dijit.byId("phone8").attr("disabled",false);
						dijit.byId("phone9").attr("disabled",false);
					},
					onEnd:function(){this.node.style.display="block";}
				}).play();
			}
			else
			{
				dojo.fx.wipeOut({
				node:dojo.byId("shipping-address-form"),
				onPlay:function(){this.node.style.display="block";},
				onEnd:function(){
						dijit.byId("fname2").setValue(dijit.byId("fname").getValue());
						dijit.byId("lname2").setValue(dijit.byId("lname").getValue());
						dijit.byId("address2").setValue(dijit.byId("address").getValue());
						dijit.byId("address3").setValue(dijit.byId("address1").getValue());
						dijit.byId("city2").setValue(dijit.byId("city").getValue());;
						//dijit.byId("country2").setValue(dijit.byId("country").getValue());
						//dijit.byId("province2").setValue(dijit.byId("province").getValue());
						dijit.byId("country2").set("displayedValue",dijit.byId("_country_1").get("displayedValue"))
						dijit.byId("province2").set("displayedValue",dijit.byId("province").get("displayedValue"))
						////alert(dijit.byId("province").get("displayValue"));
						dijit.byId("po2").setValue(dijit.byId("po").getValue());
						dijit.byId("po3").setValue(dijit.byId("po1").getValue());
						dijit.byId("phone6").setValue(dijit.byId("phone").getValue());
						dijit.byId("phone7").setValue(dijit.byId("phone1").getValue());
						dijit.byId("phone8").setValue(dijit.byId("phone2").getValue());
						dijit.byId("phone9").setValue(dijit.byId("phone3").getValue());

						dijit.byId("fname2").attr("disabled",true);
						dijit.byId("lname2").attr("disabled",true);
						dijit.byId("address2").attr("disabled",true);
						dijit.byId("address3").attr("disabled",true);
						dijit.byId("city2").attr("disabled",true);
						dijit.byId("country2").attr("disabled",true);
						dijit.byId("province2").attr("disabled",true);
						dijit.byId("po2").attr("disabled",true);
						dijit.byId("po3").attr("disabled",true);
						dijit.byId("phone6").attr("disabled",true);
						dijit.byId("phone7").attr("disabled",true);
						dijit.byId("phone8").attr("disabled",true);
						dijit.byId("phone9").attr("disabled",true);

				}
			}).play();}
		});
		var onLoadStatus=dojo.query("label[for='sameasb']");
		var onLoadisChecked=!dojo.hasClass(onLoadStatus,"checked");
		if(onLoadisChecked){
			dijit.byId("fname2").attr("disabled",true);
			dijit.byId("lname2").attr("disabled",true);
			dijit.byId("address2").attr("disabled",true);
			dijit.byId("address3").attr("disabled",true);
			dijit.byId("city2").attr("disabled",true);
			dijit.byId("country2").attr("disabled",true);
			dijit.byId("province2").attr("disabled",true);
			dijit.byId("po2").attr("disabled",true);
			dijit.byId("po3").attr("disabled",true);
			dijit.byId("phone6").attr("disabled",true);
			dijit.byId("phone7").attr("disabled",true);
			dijit.byId("phone8").attr("disabled",true);
			dijit.byId("phone9").attr("disabled",true);
		}
		else{
			dijit.byId("fname2").attr("disabled",false);
			dijit.byId("lname2").attr("disabled",false);
			dijit.byId("address2").attr("disabled",false);
			dijit.byId("address3").attr("disabled",false);
			dijit.byId("city2").attr("disabled",false);
			dijit.byId("country2").attr("disabled",false);
			dijit.byId("province2").attr("disabled",false);
			if(shipCountryLabel=="US"){
				dijit.byId("po2").attr("disabled",false);
				dijit.byId("po3").attr("disabled",true);
			}else{
				dijit.byId("po2").attr("disabled",true);
				dijit.byId("po3").attr("disabled",false);
			}
			dijit.byId("phone6").attr("disabled",false);
			dijit.byId("phone7").attr("disabled",false);
			dijit.byId("phone8").attr("disabled",false);
			dijit.byId("phone9").attr("disabled",false);
		}
	},
	shoppingBagInit:function()
	{
		////alert("shoppingBagInit");
		dojo.connect(dojo.byId("viewitems"),"click",function(e){
			dojo.stopEvent(e);
			var url=this.href;
			var inserObj=dojo.query(this).parent(".bagwarn")[0];
			lastDialog = new dijit.staticDialog({
				title:"Exclusive item you qualify for",
				style:"width:830px;",
				href:url,
				buttonCancel:"close",
				draggable:false,
				onDownloadEnd:function(){
						var _this=this;
						var obj=this.domNode;
						var addTobag=(dojo.query("#addToBag",this.domNode)[0]);
						var cancelAdd=dojo.query("#cancel",this.domNode)[0];

						dojo.connect(addTobag,"click",function(e){
							dojo.stopEvent(e);
							dojo.query(".licheck input[type='checkbox']:checked",obj).forEach(function(t){
									var newHTML=dojo.place("<li class='item-gifts'>"+HBC.nextChild(t.parentNode).innerHTML+"</li>",inserObj,"after");
									dojo.query(".remove",newHTML).connect("click",function(e){
										dojo.stopEvent(e);
										HBC.remove(newHTML);
									});
							})
							_this.hide();
						});
						dojo.connect(cancelAdd,"click",function(e){
							dojo.stopEvent(e);
							_this.hide();
						});
						this.layout();
					}
			},HBC.modals("viewitemsMod"));
			lastDialog.show();
		});
		dojo.connect(dojo.byId("selectgifts"),"click",function(e){
			dojo.stopEvent(e);
			var url=this.href;
			var inserObj=dojo.query(this).parent(".bagwarn")[0];
			lastDialog = new dijit.staticDialog({
				title:"Select your free gifts",
				style:"width:830px;",
				href:url,
				buttonCancel:"close",
				draggable:false,
				onDownloadEnd:function(){
						var _this=this;
						var obj=this.domNode;
						var addTobag=(dojo.query("#addToBag",this.domNode)[0]);
						var cancelAdd=dojo.query("#cancel",this.domNode)[0];

						dojo.connect(addTobag,"click",function(e){
							dojo.stopEvent(e);
							dojo.query(".licheck input[type='checkbox']:checked",obj).forEach(function(t){
									var newHTML=dojo.place("<li class='item-gifts'>"+HBC.nextChild(t.parentNode).innerHTML+"</li>",inserObj,"after");
									dojo.query(".remove",newHTML).connect("click",function(e){
										dojo.stopEvent(e);
										HBC.remove(newHTML);
									});
							})
							_this.hide();
						});
						dojo.connect(cancelAdd,"click",function(e){
							dojo.stopEvent(e);
							_this.hide();
						});
						this.layout();
					}
			},HBC.modals("viewitemsMod"));
			lastDialog.show();
		});
		dojo.query("li.item-gifts label.add-total-guard-plan").connect("click",function(e){
			dojo.stopEvent(e);
			var thisParent=dojo.query(this).parents(".item-gifts ")[0];
			var thisNode=dojo.query(".allradio",thisParent)[0];
			var status=dojo.hasClass(this,"checked");
			if(status)
			{HBC.show(thisNode)}
			else
			{HBC.hide(thisNode)}
		});
	},
	wishListRemove:function()
	{
		////alert("wishListRemove");
		dojo.query("a.removewish").connect("click",function(){
			var wishItemParent = dojo.query(this).parents('li.wishitem');
			wishItemParent.style({"display":"none"});
		});
	},
	signOut:function()
	{
		////alert("signOut");
		dojo.query("a#signout").connect("click",function(){
			dojo.query(this).removeAttr("id");
			dojo.byId(this).innerHTML="sign in";
			dojo.query("div#account_text_subwarp").style({"display":"none"});
		});
	},
	sizecolorChange:function()
	{
		////alert("sizecolorChange");
		dojo.query("li.nor > a").connect("click",function(){
			var getSizeID=dojo.query(this).attr("id")[0];
			var getSize=dojo.byId(getSizeID).innerHTML;
			dojo.byId("chooseid").innerHTML=getSize;
			dojo.query("div.errorsize").style({"display":"none"});
		});
		dojo.query("div.colors > div > a").connect("click",function(){
			var colorFrame=dojo.query(this).parents("div.colors").attr("id")[0];
			var getColorID=dojo.query(this).attr("id")[0];
			var getColor=dojo.byId(getColorID).innerHTML;
			if (colorFrame=="colors1"){
				dojo.byId("choosecolor").innerHTML=getColor;
			}
			else if (colorFrame=="colors2"){
				dojo.byId("choosecolor2").innerHTML=getColor;
			}
		});
	},
	detailAddToBag:function()
	{
		////alert("detailAddToBag");
		dojo.query("a#addtobag").connect("click",function(){
			var _sizechoose=HBC.isEmpty(dojo.query("ul.detail_size > li.cur"));
			if(_sizechoose)
			{		
				dojo.query("div.errorsize").style({"display":"none"});
			}
			else
			{
				var errsize=dojo.query("div.errorsize");
				if(errsize>0){
					HBC.show(errsize[0]);
				}
			}
		});
	},
	changePriceInit:function()
	{
		////alert("changePriceInit");
		function checkPrice(obj){
			var dParent=dojo.query(obj).parents(".quantity-info")[0];
			return {cPrice:parseFloat(dojo.query(".unitPrice",dParent)[0].value),oPrice:parseFloat(dojo.query(".originalUnitPrice",dParent)[0].value)};
		}
		function changeUnitPrice(obj,size,color){
			var dParent=dojo.query(obj).parents(".quantity-info")[0];
			dojo.xhrGet({
				url:"data/productPrice.json",
				handleAs:"json",
				load: function(data){
					dojo.query(".unitPrice",dParent)[0].value=data["cPrice"][size][color].toFixed(2);
					dojo.query(".originalUnitPrice",dParent)[0].value=data["oPrice"][size][color].toFixed(2);
					changePrice(obj);
				}
			});
		}
		function changePrice(obj){
			var dParent=dojo.query(obj).parents("li")[0];
			var _itemPrice=dojo.query(".item-price",dParent)[0];
			var _itemDis=dojo.query(".item-discount",dParent)[0];
			var _totalPrice=dojo.query(".item-total",dParent)[0];
			var Prices=checkPrice(obj);
			var unitPrice=Prices.cPrice;
			var originalUnitPrice=Prices.oPrice;
			var nums=parseFloat(dojo.query(".quantityType",dParent)[0].options[dojo.query(".quantityType",dParent)[0].selectedIndex].value);
			var currentPrice=unitPrice*nums;
			var originalPrice=originalUnitPrice*nums;
			var currentDis=dojo.query("span input",_itemDis)[0].value;
			var currentTotal=currentPrice-currentDis;

			dojo.query(".currentPrice",_itemPrice)[0].innerHTML="$"+currentPrice+" SALE";
			dojo.query(".originalPrice",_itemPrice)[0].innerHTML="$"+originalPrice.toFixed(2);
			dojo.query(".totalPrice",dParent)[0].innerHTML="$"+currentTotal;
		}
		dojo.query(".quantityType").connect("change",function(e){
			dojo.stopEvent(e);
			var _obj=this;
			changePrice(_obj);
		});
		dojo.query(".quantitySize").connect("change",function(e){
			var _obj=this;
			var _size=_obj.options[_obj.selectedIndex].value;
			var _color=dojo.query(".quantityColor")[0].options[dojo.query(".quantityColor")[0].selectedIndex].value;
			changeUnitPrice(_obj,_size,_color);
		});
		dojo.query(".quantityColor").connect("change",function(e){
			var _obj=this;
			var _color=_obj.options[_obj.selectedIndex].value;
			var _size=dojo.query(".quantitySize")[0].options[dojo.query(".quantitySize")[0].selectedIndex].value;
			changeUnitPrice(_obj,_size,_color);
		});
	},
	homePageFixing:function()
	{
		////alert("homePageFixing");
		if(!HBC.isEmpty(dojo.query(".noStanderImage")))
		{return false;}
		dojo.query(".noStanderImage").forEach(function(item){
			var _obj=dojo.contentBox(item);
			var _obj_image=dojo.query(".image:not(.hide)",item);
			var _obj_info=dojo.query(".info:not(.hide)",item);
			var _leftSpace=_obj.w;
			if(HBC.isEmpty(_obj_image))
			{
				if(!HBC.isEmpty(_obj_info))
				{
					var _len=_obj_image.length;
					var _subImage1=_obj_image[0];
					var _subImage2=_obj_image[_len-1];
					_leftSpace=_leftSpace-dojo.marginBox(_subImage1).w-dojo.marginBox(_subImage2).w;
					_obj_image.forEach(function(itemImage,index){
						_obj_objImage=dojo.marginBox(itemImage);
						if(index==0||index==_len-1)
						{
							dojo.marginBox(itemImage,{w:_obj_objImage.w});
						}
						else
						{
							dojo.marginBox(itemImage,{w:_leftSpace/(_len-2)});
						}
					});
				}
				else
				{
					_obj_image.forEach(function(itemImage){
						_obj_objImage=dojo.marginBox(itemImage);
						_leftSpace=_leftSpace-_obj_objImage.w;
						dojo.marginBox(itemImage,{w:_obj_objImage.w});
					})
				}
			}
			if(HBC.isEmpty(_obj_info))
			{

					_obj_info.style({"width":_leftSpace/_obj_info.length+"px"});
			}
			dojo.query("> div", item).forEach(function(subItem){
				var _subObj=dojo.marginBox(subItem);
				var _t=(_obj.h-_subObj.h)/2;
				dojo.style(subItem , {"marginTop":_t+"px"});
			});
		});
	},
	myAccountListEditInit:function()
	{
		////alert("myAccountListEditInit");
		HBC.booklistchange(dojo.byId("addressList"));
		dojo.connect(dojo.byId("removeCurrent"),"click",function(e){
			dojo.stopEvent(e);
			var _obj=dojo.byId("addressList");
			_obj.remove(_obj.selectedIndex);
			if(_obj.options.length==0)
			{
				dijit.byId("removeCurrent").attr("disabled",true);
				dijit.byId("addressBookForm").reset();
			}
			HBC.booklistchange(_obj);
		});
		dojo.connect(dojo.byId("addNew"),"click",function(e){
			dojo.stopEvent(e);
			if(dijit.byId("addNew").get("label").toLowerCase()=="cancel")
			{
				HBC.booklistchange(dojo.byId("addressList"));
				if(dojo.byId("addressList").options.length!=0)
				{dijit.byId("removeCurrent").attr("disabled",false);}
				dijit.byId("addNew").set("label","ADD NEW");
				dojo.byId("addressList")["disabled"]=false;
			}
			else
			{
				dijit.byId("addressBookForm").reset();
				dijit.byId("removeCurrent").attr("disabled",true);
				dijit.byId("addNew").set("label","CANCEL");
				dojo.byId("addressList")["disabled"]=true;
			}
		});
		dojo.connect(dojo.byId("addressList"),"change",function(e){
			dojo.stopEvent(e);
			var _obj=this;
			HBC.booklistchange(_obj);
		});
	},
	customerReviewsInit:function()
	{
		////alert("customerReviewsInit");
		function createNewDiv(id,_class){
			var newDiv=document.createElement("div");
			newDiv.id=id;
			newDiv.className=_class;
			return newDiv;
		}
		function hidePages()
		{
			currentShow=dojo.filter(currentShow,function(cs,index){
				HBC.hide(dojo.byId(cs));
				dojo.removeClass(dojo.query("a",_obj)[pageArr.indexOf(cs)+1],"on");
			});
		}
		function showPage(node)
		{
			HBC.show(node);
			currentShow.push(node.id);
			dojo.addClass(dojo.query("a",_obj)[pageArr.indexOf(node.id)+1],"on");
		}
		var _obj=dojo.byId("customerReviews");
		if(!_obj)
		{return false;}
		var showItemsPrePage=2;
		var pageList="";
		var reviewItems=dojo.query(".customer_tit",_obj)
		var itemsCount=reviewItems.length;
		var itemsPages=itemsCount/showItemsPrePage;
		var itemsPageIndex=dojo.query(".list_page.reviews",_obj);
		var itemsPageIndexTemplate="<span>${reviews}</span>${pageIndexList}<a class='${viewAllClass}' href='${viewAllLink}'>${viewAllText}</a>";
		var pageArr=new Array();
		var currentShow=new Array();
		var comparePageLink={};
		var objItemsPageIndex={
				reviews:itemsCount+"&nbsp;Reviews",
				pageIndexList:"",
				viewAllClass:"viewall",
				viewAllLink:"javascript:void(0)",
				viewAllText:"View All"
			};
		var _newDiv="";/*dojo.string.substitute*/
		dojo.forEach(reviewItems,function(i,index){
			if(index%2==0)
			{
				var _index=parseInt(index/2);
				var _indexId="page"+_index;
				_newDiv=createNewDiv(_indexId,"tempClass");
				dojo.place(i,dojo.place(_newDiv,i,"before"));
				objItemsPageIndex.pageIndexList=objItemsPageIndex.pageIndexList+"<li><a class='pageNum' href=\"javascript:void(0)\">"+(_index+1)+"</a></li>";
				pageArr.push(_indexId);
				currentShow.push(_indexId);
			}
			else
			{
				dojo.place(i,_newDiv);
			}
		});
		objItemsPageIndex.pageIndexList="<ul><li><a class='prev' href='javascript:void(0)'><img alt='' src='images/con_left.gif'></a></li>"+objItemsPageIndex.pageIndexList+"<li><a class='next' href='javascript:void(0)'><img alt='' src='images/con_right.gif'></a></li></ul>";
		dojo.forEach(itemsPageIndex,function(i){
			i.innerHTML=dojo.string.substitute(itemsPageIndexTemplate,objItemsPageIndex);
			dojo.forEach(dojo.query("a",i),function(ai,index){
				if(dojo.hasClass(ai,"prev"))
				{
					dojo.connect(ai,"click",function(){
						var isLast=pageArr.indexOf(currentShow[0]);
						if(currentShow.length>1)
						{
							hidePages();
							showPage(dojo.byId(pageArr[0]));
						}
						else if(isLast==0)
						{
							return false;
						}
						else
						{
							var showOnPage=dojo.byId(pageArr[isLast-1]);
							hidePages();
							showPage(showOnPage);
						}
					});
				}
				else if(dojo.hasClass(ai,"viewall"))
				{
					dojo.connect(ai,"click",function(e){
						if(currentShow.length>1)
						{return false;}
						hidePages();
						dojo.forEach(pageArr,function(p){
							showPage(dojo.byId(p));
						});
					});
				}
				else if(dojo.hasClass(ai,"next"))
				{
					dojo.connect(ai,"click",function(){
						var isLast=pageArr.indexOf(currentShow[0]);
						if(currentShow.length>1)
						{
							hidePages();
							showPage(dojo.byId(pageArr[pageArr.length-1]));
						}
						else if(isLast==pageArr.length-1)
						{
							return false;
						}
						else
						{
							var showOnPage=dojo.byId(pageArr[isLast+1]);
							hidePages();
							showPage(showOnPage);
						}
					});
				}
				else if(dojo.hasClass(ai,"pageNum"))
				{
					dojo.connect(ai,"click",function(e){
						if(currentShow.length==1&&dojo.hasClass(ai,"on"))
						{return false;}
						dojo.forEach(dojo.query(".on",_obj),function(linkon){
							dojo.removeClass(linkon,"on");
						});
						dojo.addClass(this,"on");
						hidePages();
						showPage(dojo.byId(pageArr[index-1]));
					});
				}
				if(index==1)
				{
					dojo.addClass(ai,"on");
				}
			});

		});
		hidePages();
		showPage(dojo.byId(pageArr[0]));
	},
	addTotalInit:function()
	{
		////alert("addTotalInit");
		dojo.query(".add_form").forEach(function(item){
			dojo.query("label",item).map(function(item1){
				if(dojo.hasClass(item1,"checkbox"))
				{return item1;}
			}).forEach(function(item2){
					dojo.connect(item2,"click",function(e){
						var citem="."+this.id;
						if(dojo.hasClass(this,"checked"))
						{
							HBC.show(dojo.query(citem)[0]);
						}
						else
						{
							HBC.hide(dojo.query(citem)[0]);
						}
					});
				})

		});
	},
	emailFriends:function()
	{
		////alert("emailFriends");
		dojo.query("#emailmyfriend").forEach(function(l){
			dojo.query("a.closeme",l).connect("click",function(e){
				dojo.stopEvent(e);
				dojo.fadeOut({
					node:l,
					onEnd:function(){
						dojo.style(this.node,{"display":"none"})
					}
				}).play();
			});
		});
		dojo.query("a.emailMyFriend").forEach(function(item){
			dojo.connect(item,"click",function(e){
				dojo.stopEvent(e);
				 if(!HBC.isVisible(dojo.query("#emailmyfriend")))
				 {
					 return false;
					}
				 dojo.fadeIn({
				 	node:"emailmyfriend",
					beforeBegin:function(){
						dojo.style(this.node,{"display":"block","opacity":"0"})
					},
					onEnd:function(){
						dojo.style(this.node,{"display":"block"})
					}
				 }).play();
			})
		});
	},
	openWithStaticDialog:function()
	{
		////alert("openWithStaticDialog");
		var obj=dojo.query("a.openInModal");
		if(obj.length<=0)
		{return false}
		obj.forEach(function(oi){
			dojo.connect(oi,"click",function(e){
				dojo.stopEvent(e);
				var url=this.href;
				if(!url)
				{return false;}
				lastDialog= new dijit.staticDialog({
					title:"Select your free gifts",
					style:"width:870px;",
					href:url,
					buttonCancel:"close",
					draggable:false,
					onDownloadEnd:function(){
					}
				},HBC.modals("SelectFreeModal"));
				lastDialog.show();
				return false;
			});
		});
	},

	colorSizePriceForProductInit:function()
	{
		////alert("colorSizePriceForProductInit");
		if(dojo.isIE)
		{
			HBC.productId=dojo.byId("productId").value;
		}
		if(!HBC.productId)
		{
			return false;
		}
		function createSizeHTML(args,args1,args2,args4,s){
			var returnVal='';
			var ds;
			var useImage=false;
			if(!s)
			{ds=args2["attr2"]}
			if(args4.length>0)
			{
				useImage=true;
			}

				var sizeItem='<span class="size_txt">SIZE: <span id="chooseid"> </span> <a href="#">Sizing Info?</a></span>';
				var sizeItemD='<span class="size_txt">SIZE: <span id="chooseid">${attr2} </span> <a href="#">Sizing Info?</a></span>';
				var sizeDetail='<li class="nor sizesId${size}"><a href="javascript:void(0)">${size_img}</a><input type="hidden" value="${size}"></li>';
				var sizeDetailD='<li class="cur sizesId${size}"><a href="javascript:void(0)">${size}</a><input type="hidden" value="${size}"></li>';
				var sizeDetailWrapperS='<div class="supportSizes"> <ul class="detail_size">';
				var sizeDetailWrapperE='</ul></div>';
				var H1=dojo.string.substitute(sizeItem,args2);
				var H2=dojo.map(args,function(i,index){
					var ii=i;
					if(useImage)
					{
						ii='<img src="'+args4[args.indexOf(i)]+'" alt="'+i+'" />';
						if(!args4[args.indexOf(i)])
						{
							ii=i
						}
					}
						if(ds===i)
						{H1=dojo.string.substitute(sizeItemD,args2); return dojo.string.substitute(sizeDetailD,{size:i,size_img:ii});}
						return dojo.string.substitute(sizeDetail,{size:i,size_img:ii});
					}).join("");
					returnVal=H1+sizeDetailWrapperS+H2+sizeDetailWrapperE;
				return returnVal;
		}
		function createColorHTML(args,args1,args2,args3,args4,s){
				var returnVal="";
				var useImage=false;
				var ds;
				if(args4.length>0)
				{
					useImage=true;
				}


		  		var priceItem='<div class="itemColors"><div class="detial_pric priceItems"> <span class="ora">$${OP}</span> <span class="sale">SALE $${CP}</span> </div>';
				var colorItem='<p class="color_txt">SELECT COLOUR: <span class="choosecolor"> </span></p>';
				var colorItemD='<p class="color_txt">SELECT COLOUR: <span class="choosecolor">${attr1} </span></p>';
				var colorsDetail='<div><a class="${colorClass}" href="javascript:void(0);">${color_img}</a><input type="hidden" value="${color}"></div>';
				var colorsDetailD='<div class="color_ad_Tabopen"><a class="${colorClass}" href="javascript:void(0);">${color_img}</a><input type="hidden" value="${color}"></div>'
				var colorsDetailWrapperS='<div class="colors supportColors">';
				var colorsDetailWrapperE='</div></div>';
				var splitHTML='<div class="border_gray detial_pric_dots" style="clear: both; display: block; min-height: 1px;"></div>';
				var reArray=dojo.map(args3,function(i,index0){
					H1=dojo.string.substitute(priceItem,i["price"]);
					if(s)
					{
						return H1;
					}
					ds=args2["attr1"];
					H2=dojo.string.substitute(colorItem,args2);
					H3=dojo.map(i["attr1"],function(x,index){
						var xx=x;
						if(useImage)
						{
							xx='<img src="'+args4[args.indexOf(x)]+'" alt="'+x+'" />';
							if(!args4[args.indexOf(x)])
							{
								xx=x;
							}
						}
							if(ds===x)
							{
								H2=dojo.string.substitute(colorItemD,args2);
								return dojo.string.substitute(colorsDetailD,{color:x,colorClass:x.toLowerCase(),color_img:xx});
							}
							return dojo.string.substitute(colorsDetail,{color:x,colorClass:x.toLowerCase(),color_img:xx});
						}).join("");
					return H1+H2+colorsDetailWrapperS+H3+colorsDetailWrapperE;
				});
				dojo.forEach(reArray,function(z,index){
					returnVal=returnVal+(index===0?"":splitHTML)+z;
				});
				return returnVal
		}
		function changePrice(args,args1,args2,args3){
			if(!args3||args3===0)
			{args3=1;}
			dojo.query(".priceItems span.ora").forEach(function(i){
				i.innerHTML="$"+parseFloat(args[args1][args2]["OP"]*args3).toFixed(2);
			});
			dojo.query(".priceItems span.sale").forEach(function(i){
				i.innerHTML="SALE $"+parseFloat(args[args1][args2]["CP"]*args3).toFixed(2);
			});
		}
		function changeSizeColor(args,args1,args2,arg3){
			dojo.query(".cur").removeClass("cur").addClass("nor");
			var currentValue=dojo.query("input[type='hidden']",args1)[0].value;
			var currentColor=dojo.query("input[type='hidden']",dojo.query(".color_ad_Tabopen")[0])[0].value;
			var items=dojo.query("select",dojo.byId("quan"))[0].options[dojo.query("select",dojo.byId("quan"))[0].selectedIndex].value;
			dojo.query(args1).removeClass("nor").addClass("cur");
			dojo.byId("chooseid").innerHTML=currentValue;
			dojo.forEach(args2,function(i){
				if(!args[currentValue][i])
				{
					dojo.query("."+i.toLowerCase()).addClass("disabled");
				}
				else
				{
					dojo.query("."+i.toLowerCase()).removeClass("disabled");
				}
			});
		}
		function changeColorSize(args,args1,args2,arg3) {
			dojo.query(".color_ad_Tabopen").removeClass("color_ad_Tabopen");
			var currentValue=dojo.query("input[type='hidden']",args1)[0].value;
			var currentSize=dojo.query("input[type='hidden']",dojo.query(".cur")[0])[0].value;
			dojo.query(args1).addClass("color_ad_Tabopen");
			dojo.query(".choosecolor",dojo.query(args1).parents(".itemColors")[0])[0].innerHTML=currentValue;;
			dojo.forEach(args2,function(i){
				if(!args[currentValue][i])
				{
					dojo.query(".sizesId"+i).addClass("disabled");
				}
				else
				{
					dojo.query(".sizesId"+i).removeClass("disabled");
				}
			});
		}

		function bindClick(arg,arg1,arg2,arg3,arg4,arg5){
			dojo.query(".supportSizes li a").connect("click",function(e){
				dojo.stopEvent(e);
				if(dojo.hasClass(this.parentNode,"disabled"))
				{
					return false;
				}
				changeSizeColor(arg,this.parentNode,arg2,arg4);
			});
			dojo.query(".supportColors div a").connect("click",function(e){
				dojo.stopEvent(e);
				if(dojo.hasClass(this,"disabled"))
				{
					return false;
				}
				changeColorSize(arg1,this.parentNode,arg3,arg4);
			});

			dojo.forEach(arg2,function(i){
				if(!arg)
				{return false;}
						////console.log(arg5);
				if(!arg[arg5["attr2"]][i])
				{
					dojo.query("."+i.toLowerCase()).addClass("disabled");
				}
				else
				{
					dojo.query("."+i.toLowerCase()).removeClass("disabled");
				}
			});
			dojo.forEach(arg3,function(i){
				if(!arg1)
				{return false;}
				if(!arg1[arg5["attr1"]][i])
				{
					dojo.query(".sizesId"+i).addClass("disabled");
				}
				else
				{
					dojo.query(".sizesId"+i).removeClass("disabled");
				}
			});
		}
		function objEmpty(obj)
		{
			for(var a in i)
			{
				return false;
			}
			return true;
		}
		dojo.xhrGet({
			url:"data/colorSizeInfo.json",
			handleAs:"json",
			load: function(data){
				var objData=data[HBC.productId];
				var types=objData["type"];
				var colors=objData["attr1"];
				var sizes=objData["attr2"];
				var defaultSel=objData["default"];
				var colorSize=objData["attr1-attr2"];
				var sizeColor=objData["attr2-attr1"];
				var price=objData["price-attr1"];

				var imgs1=objData["attr1_img"];
				var imgs2=objData["attr2_img"];


				if(types==2)
				{
					dojo.query(".priceColorArea").forEach(function(i){
						i.innerHTML=createColorHTML(colors,colorSize,defaultSel,price,imgs1);
					});
					dojo.query(".sizeArea").forEach(function(i){
						i.innerHTML=createSizeHTML(sizes,sizeColor,defaultSel,imgs2);
					});
					bindClick(sizeColor,colorSize,colors,sizes,price,defaultSel);
				}
				if(types==1)
				{
					if(!HBC.isEmpty(colors))
					{
						dojo.query(".priceColorArea").forEach(function(i){
							i.innerHTML=createColorHTML(colors,colorSize,defaultSel,price,imgs1,true);
						});
						dojo.query(".sizeArea").forEach(function(i){
							i.innerHTML=createSizeHTML(sizes,sizeColor,defaultSel,imgs2);
						});
						bindClick(sizeColor,colorSize,colors,sizes,price,defaultSel);
					}
					else if(!HBC.isEmpty(sizes))
					{
						dojo.query(".priceColorArea").forEach(function(i){
							i.innerHTML=createColorHTML(colors,colorSize,defaultSel,price,imgs1);
						});
						dojo.query(".sizeArea").forEach(function(i){
							i.innerHTML="";
						});
						bindClick(sizeColor,colorSize,colors,sizes,price,defaultSel,imgs2);
					}
				}
				if(types==0)
				{
					dojo.query(".priceColorArea").forEach(function(i){
						i.innerHTML=createColorHTML(colors,colorSize,defaultSel,price,imgs1,true);;
					});
					dojo.query(".sizeArea").forEach(function(i){
						i.innerHTML="";
					});
				}
			}
		});
	},
	switchSendSMS:function()
	{
		////alert("switchSendSMS");
		if(!dojo.byId("label-send-MSG"))
		{
			return false;
		}
		var phone = dijit.byId("phone");
		var phone1 = dijit.byId("phone1");
		var phone2 = dijit.byId("phone2");
		var phoneArr=[phone,phone1,phone2];
		dojo.forEach(phoneArr,function(i){
			i.attr("disabled",!dojo.byId("send-MSG").checked);
		});
		dojo.connect(dojo.byId("label-send-MSG"),"click",function(){
			dojo.forEach(phoneArr,function(i){
				i.attr("disabled",!dojo.byId("send-MSG").checked);
			});
		})
	},
	//DGN: init function called on page load
	init:function(){

		HBC.selectFixInit();
		HBC.validataMessage();
		if(HBC.productId)
		{dojo.addOnLoad(function() {HBC.colorSizePriceForProductInit(); });}
		if(dojo.byId("customerReviews"))
		{dojo.addOnLoad(HBC.customerReviewsInit);}
		if(dojo.byId("addressBookForm"))
		{dojo.addOnLoad(HBC.myAccountListEditInit);}

/* inputCheckboxInit function is commented For Removing Checkbox Image on top of checkbox */

		if(dojo.query("input[type='checkbox']").length>0)
		{
			dojo.addOnLoad(HBC.inputCheckboxInit);
		}
		if(dojo.byId("show_pic"))
		{dojo.addOnLoad(HBC.homePageFixing);}
		if(dojo.byId("leftmenu"))
		{
			dojo.addOnLoad(HBC.leftMenuInit);
		}
		if(dojo.byId("add_total"))
		{
			dojo.addOnLoad(HBC.sizecolorChange)
			dojo.addOnLoad(HBC.detailAddToBag)
		}
		if(dojo.byId("header_content"))
		{
			dojo.addOnLoad(HBC.signOut);
		}
		if(dojo.byId("shippingSignIn"))
		{
			if(!dojo.byId("shipping_payment"))
			{dojo.addOnLoad(HBC.shoppingBagInit);}
		}
		if(dojo.byId("main_nav"))
		{
			dojo.addOnLoad(HBC.mainNavInit);
		}
		if(dojo.byId("ref_select"))
		{
			dojo.addOnLoad(HBC.selectFilterInit);
		}
		if(dojo.byId("ref_control"))
		{
			//dojo.addOnLoad(HBC.productPageListSplit);
			dojo.addOnLoad(HBC.quickViewInit);
			dojo.addOnLoad(HBC.wishListRemove);
		}
		if(dojo.byId("options"))
		{
			dojo.addOnLoad(HBC.giftoptionsInit);
			dojo.addOnLoad(HBC.creditcardchange);
		}
		//BOPIS change
		if(dojo.byId("domPaymentSection"))
		{				
			
			dojo.addOnLoad(HBC.giftoptionsInit);
			dojo.addOnLoad(HBC.creditcardchange);
			dojo.addOnLoad(HBC.toggleStoreOrderPickupByGuest);
		}
		//DGN: related to billing/shipping page
		if(dojo.byId("shipping_payment"))
		{
			dojo.addOnLoad(HBC.shoppingBagInit);
			dojo.addOnLoad(HBC.changePriceInit);
		}
		//DGN: Related to billing/shipping page
		if(dojo.byId("guset-address-pannel"))
		{
			dojo.addOnLoad(HBC.shippingAddressInitOnload);
			//dojo.addOnLoad(HBC.shippingAddressInit);
		}
		/*if(dojo.byId("register-account-address"))
		{
			dojo.addOnLoad(HBC.shippingAddCountry);
		}*/
		if(dojo.byId("send-MSG"))
		{
			dojo.addOnLoad(HBC.switchSendSMS);
		}

		if(dojo.byId("lable-SameShippingAndBillingAddress"))
		{

			dojo.addOnLoad(HBC.sameAsBillingAddress);
		}

		if(dojo.byId("checkboxforBillingAddress"))
		{
			dojo.addOnLoad(HBC.enableDisableEmail);
		}

		// Added if condition for Email Subscription modal
		/*if(dojo.byId("smarketingSMS"))
		{
			dojo.addOnLoad(HBC.toggleSubSendSMS);
		}*/

		// Added if condition for Email Subscription modal
		if(dojo.byId("smarketingEmail"))
		{
			dojo.addOnLoad(HBC.toggleSubSendEmail);
		}

		// Added if condition for Registration Page
		if(dojo.byId("sendMeSMSNotification"))
		{
			dojo.addOnLoad(HBC.RegSendSMS);
		}

		// Added if condition for Registration Page UK
		if(dojo.byId("sendMeSMSNotification"))
		{
			dojo.addOnLoad(HBC.RegSendSMSUK);
		}

		// Added if condition for Registration modal (Email Subscription)
		if(dojo.byId("regmarketingSMS"))
		{
			dojo.addOnLoad(function(){
				HBC.toggleRegSendSMS("reg");
			});
		}

		//Added for Checkout Page- Credit Card Checkbox
		if(dojo.byId("PaybyCreditCard"))
		{
			dojo.addOnLoad(function(){
				HBC.toggleRemoveCreditCard();
			});
			//TODO
		}

//		if(dojo.byId("sitb1"))
//		{
////			dojo.addOnLoad(HBC.updateGiftBoxParams());
//			//TODO
//		}

		if(dojo.byId("notshow"))
		{
			dojo.addOnLoad(function(){
				HBC.updateCheckBoxParams();
			});
			//TODO
		}
//Gift Registry changes start
		
		if(dojo.query("div.checkout a.allbutton")){
			dojo.addOnLoad(function(){
				
				if(HBC.isGRFlowEnabled()&& HBC.isGRSessionIdExists() ){
					 $("div.checkout a.allbutton").removeAttr("onclick");
					 $("div.checkout a.allbutton").removeAttr("href");
					 var grSessionID=UtilitiesJS.getCookie("GIFT_GRSESSION");
					 // var wcsSessionID=dojo.byId("wcsSessionID").value;
					 var giftRegLinkAllSites=dojo.byId("giftRegLinkAllSites").value;
					 $("div.checkout a.allbutton").attr("href", giftRegLinkAllSites+"?SessionId="+grSessionID);
					 
					 }
			});
		}
		if(dojo.query("div.bag_item a.allbutton")){
			dojo.addOnLoad(function(){
				if(HBC.isGRFlowEnabled()&& HBC.isGRSessionIdExists() ){
					 $("div.bag_item a.allbutton").removeAttr("onclick");
					 $("div.bag_item a.allbutton").removeAttr("href");
					 var grSessionID=UtilitiesJS.getCookie("GIFT_GRSESSION");
					 // var wcsSessionID=dojo.byId("wcsSessionID").value;
					 var giftRegLinkAllSites=dojo.byId("giftRegLinkAllSites").value;
					 $("div.bag_item a.allbutton").attr("href", giftRegLinkAllSites+"?SessionId="+grSessionID);
					 
				}
			});
		}
		if(dojo.query("div.action-button a.back")){
			dojo.addOnLoad(function(){
				if(HBC.isGRFlowEnabled()&& HBC.isGRSessionIdExists() ){
					 $("div.action-button a.back").removeAttr("onclick");
					 $("div.action-button a.back").removeAttr("href");
					 var grSessionID=UtilitiesJS.getCookie("GIFT_GRSESSION");
					 // var wcsSessionID=dojo.byId("wcsSessionID").value;
					 var giftRegLinkAllSites=dojo.byId("giftRegLinkAllSites").value;
					 $("div.action-button a.back").attr("href", giftRegLinkAllSites+"?SessionId="+grSessionID);
					 }
			});
		}
		if(dojo.query("a#WC_ShipmentDisplay_links_2")){
			dojo.addOnLoad(function(){
				if(HBC.isGRFlowEnabled()&& HBC.isGRSessionIdExists() ){
					  $("a#WC_ShipmentDisplay_links_2").removeAttr("onclick");
					 $("a#WC_ShipmentDisplay_links_2").removeAttr("href");
					 var grSessionID=UtilitiesJS.getCookie("GIFT_GRSESSION");
					 // var wcsSessionID=dojo.byId("wcsSessionID").value;
					 var giftRegLinkAllSites=dojo.byId("giftRegLinkAllSites").value;
					 $("a#WC_ShipmentDisplay_links_2").attr("href", giftRegLinkAllSites+"?SessionId="+grSessionID);
					 }
			});
		} 
		if(dojo.query("div#formButtons a.allbutton")){
			dojo.addOnLoad(function(){
				if(HBC.isGRFlowEnabled()&& HBC.isGRSessionIdExists() ){
					  $("div#formButtons a.allbutton").removeAttr("onclick");
					 $("div#formButtons a.allbutton").removeAttr("href");
					 var grSessionID=UtilitiesJS.getCookie("GIFT_GRSESSION");
					 // var wcsSessionID=dojo.byId("wcsSessionID").value;
					 var giftRegLinkAllSites=dojo.byId("giftRegLinkAllSites").value;
					 $("div#formButtons a.allbutton").attr("href", giftRegLinkAllSites+"?SessionId="+grSessionID);
					 }
			});
		}
		
		if(dojo.query("div#checkoutFormButtons a.gray-button")){
			dojo.addOnLoad(function(){
				if(HBC.isGRFlowEnabled()&& HBC.isGRSessionIdExists() ){
					  $("div#checkoutFormButtons a.gray-button").removeAttr("onclick");
					 $("div#checkoutFormButtons a.gray-button").removeAttr("href");
					 var grSessionID=UtilitiesJS.getCookie("GIFT_GRSESSION");
					 // var wcsSessionID=dojo.byId("wcsSessionID").value;
					 var giftRegLinkAllSites=dojo.byId("giftRegLinkAllSites").value;
					 $("div#checkoutFormButtons a.gray-button").attr("href", giftRegLinkAllSites+"?SessionId="+grSessionID);
					 }
			});
		}
		
		
		if(dojo.query("div#inventoryCheck a#addtobag")){
			dojo.addOnLoad(function(){
				if(HBC.isGRFlowEnabled()){
					dojo.query("div#inventoryCheck a#addtobag").style({ display:"none" }); 
					dojo.query("div#grFlow dl.grFlowMsg ").style({ display:"block" }); 
				 }
			});
		}
		// Changes for GR sign in issue
		
		 if(HBC.isGRFlowEnabled()){
			 
			  if(typeof  dojo.byId("account_text") != null){

			        hideElementById("account_text");
			        
			    
			    }
			  if(typeof  dojo.byId("WC_MyProfileLink_footer") != null){

			        hideElementById("WC_MyProfileLink_footer");
			        
			    
			    }
			  if(typeof  dojo.byId("WC_MyOrdersStatusLink_footer") != null){

			        hideElementById("WC_MyOrdersStatusLink_footer");
			        
			    
			    }
			  if(typeof  dojo.byId("WC_MyOrdersHistoryLink_footer") != null){

			        hideElementById("WC_MyOrdersHistoryLink_footer");
			        
			    
			    }
			  if(typeof  dojo.byId("WC_MyWishListLink_footer") != null){

			        hideElementById("WC_MyWishListLink_footer");
			        
			    
			    }
			  if(typeof  dojo.byId("WC_LogonLogoffLink_footer") != null){

			        hideElementById("WC_LogonLogoffLink_footer");
			        
			    
			    }
			 
			 }

		
		if(dojo.byId("SendNotificationToRegistrant"))
		{
			dojo.addOnLoad(function(){
				HBC.updateNotifyRegistrantFlag();
			});
			//TODO
		}
		//Gift Registry changes end
		if(dojo.byId("giftmessage"))
		{
			dojo.addOnLoad(function(){
				HBC.updateGiftBoxMessage();
			});
			//TODO
		}

		//Added for Checkout Page - Gift Card Checkbox
		if(dojo.byId("PaybyGiftCard"))
		{
			dojo.addOnLoad(function(){
				HBC.toggleRemoveGiftCard();
			});
		}

		// Added for My Account - Profile Edit
		if(dojo.byId("marketingSMS"))
		{
			// Added notPrefForm condition for Defect 551
			var notPrefForm = dojo.byId("notification");
			if(notPrefForm != null && notPrefForm != undefined){
				if(notPrefForm.demographicField1.value == "N"){
					dojo.addOnLoad(function(){
						HBC.toggleRegSendSMS('');
					});
				}
			}
			else{
				dojo.addOnLoad(function(){
					HBC.toggleRegSendSMS('');
				});
			}
		}

		// Added if condition for Registration modal (Email Subscription)
		if(dojo.byId("regmarketingSMSSingle"))
		{
			dojo.addOnLoad(function(){
				HBC.toggleRegSendSMSSingle("reg");
			});
		}

		// Added for My Account - Profile Edit
		if(dojo.byId("marketingSMSSingle"))
		{
			// Added notPrefForm condition for Defect 551
			var notPrefForm = dojo.byId("notification");
			if(notPrefForm != null && notPrefForm != undefined){
				if(notPrefForm.demographicField1.value == "N"){
					dojo.addOnLoad(function(){
						HBC.toggleRegSendSMSSingle('');
					});
				}
			}
			else{
				dojo.addOnLoad(function(){
					HBC.toggleRegSendSMSSingle('');
				});
			}
		}

		dojo.addOnLoad(HBC.addTotalInit);
		dojo.addOnLoad(HBC.emailFriends);
		HBC.openWithStaticDialog();
	},

	/*
	 * RegSendSMS() function added for Registration page to Enable/Disable the phone fields based on the checkbox
	 * [Send me SMS Texts about store specials]
	 */

	RegSendSMS:function()
	{
		if(!dojo.byId("label-sms"))
		{
			////alert("toggleRegSendSMS");
			return false;
		}

		var phone = dijit.byId("usMobilePhone1p1");
		var phone1 = dijit.byId("mobilePhone1p2");
		var phone2 = dijit.byId("mobilePhone1p3");
		var phoneArr=[phone,phone1,phone2];
		dojo.forEach(phoneArr,function(i){
			i.attr("disabled",!dojo.byId("sendMeSMSNotification").checked);
		});
		dojo.connect(dojo.byId("label-sms"),"click",function(){
			dojo.forEach(phoneArr,function(i){
				i.attr("disabled",!dojo.byId("sendMeSMSNotification").checked);
			});
		})
	},

	/*
	 * RegSendEmailUK() function added for Registration page UK country to Enable/Disable the information fields based on the checkbox
	 * [Send me SMS Texts about store specials]
	 */

	RegSendSMSUK:function()
	{
		if(!dojo.byId("label-sms"))
		{
			////alert("toggleRegSendSMS");
			return false;
		}

		var phone = dijit.byId("nonUsMobilePhone1p1");

			phone.attr("disabled",!dojo.byId("sendMeSMSNotification").checked);

		dojo.connect(dojo.byId("label-sms"),"click",function(){

				phone.attr("disabled",!dojo.byId("sendMeSMSNotification").checked);

		})
	},

	sameAsBillingAddress :function()
	{
		if(!dojo.byId("lable-SameShippingAndBillingAddress"))
		{
			return false;
		}
		HBC.shippingAddressInitOnload();
		dojo.connect(dojo.byId("lable-SameShippingAndBillingAddress"),"click",function(){
			var form = document.getElementById("billing_address_form");
			var currentCountryCode =form["country"].value;
			if((currentCountryCode=="US" || currentCountryCode=="GB" || currentCountryCode=="CA") && (shipCountryLabel == currentCountryCode)){
				HBC.shippingAddressInitOnload();
			}else{
				dojo.byId("lable-SameShippingAndBillingAddress").setAttribute("class", "checkbox unchecked");
			}
		})
	},

	/*
	 * toggleRegSendSMS() function added for Registration modal (Email Subscription) to Enable/Disable the
	 * phone fields based on the checkbox [Send me SMS Texts about store specials]
	 */
	toggleRemoveCreditCard:function()
	{
		dojo.connect(dojo.byId("label-PaybyCreditCard"),"click",function(){
			if (!document.getElementById("PaybyCreditCard").checked){
				ajaxblock.init();
				CheckoutPayments.deleteCreditCardPaymentInstructions();
				dijit.byId("cc_cvc_1").attr("disabled",true);
				dijit.byId("account1_1").attr("disabled",true);
				dijit.byId("expYear").attr("disabled",true);
				dijit.byId("expMonth").attr("disabled",true);
			}
			if (document.getElementById("PaybyCreditCard").checked){
				dijit.byId("cc_cvc_1").attr("disabled",false);
				dijit.byId("account1_1").attr("disabled",false);
				dijit.byId("expYear").attr("disabled",false);
				dijit.byId("expMonth").attr("disabled",false);
				}
		})
	},
	/*
	 * toggleStoreOrderPickupByGuest() function added to Enable/Disable the
	 * Designate Guest user pick form BOPIS
	 */
	toggleStoreOrderPickupByGuest : function() { 
		dojo.connect(dojo.byId("label-checkbox_pickupid"), "click", function() {
			if (!document.getElementById("checkbox_pickupid").checked) {
				document.getElementById("GuestUser").style.display = "none"; 
			}else {
				document.getElementById("GuestUser").style.display = "block"; 
			}
		})
	},

	enableDisableEmail :function(){

		var selection = document.getElementById("addressId");
		var emailaddr = dijit.byId("email1");
		dojo.connect(dojo.byId("checkboxforBillingAddress"),"click",function(){
			if(dojo.hasClass(this,"checked"))
			{
				if(selection != null){
					var selectedAddressId = selection.options[selection.selectedIndex].value;
				}
				if(selectedAddressId != null && userprofileaddr != selectedAddressId){
					// Added to clear the email1 field if any for defect 1380 -- START
					UtilitiesJS.displayBasedOnEditable(emailaddr, false, false, '');
					// Added to clear the email1 field if any for defect 1380 -- END
					//dijit.byId("verifyemail1").attr("disabled",false);
				}else{
					UtilitiesJS.displayBasedOnEditable(emailaddr, true, true);
				}
									
				if(document.getElementById("myaccountEmail") !=null){
					document.getElementById("myaccountEmail").style.display = "block";
					//document.getElementById("myaccountverifyEmail").style.display = "block";
					// Added for defect 1380 -- START
					var mandfields = (document.forms["AddressForm"])["AddressForm_FieldsOrderByLocale"];
					if(mandfields != null && mandfields != undefined){
						(document.forms["AddressForm"])["AddressForm_FieldsOrderByLocale"].value = "NICK_NAME,FIRST_NAME,LAST_NAME,ADDRESS,CITY,COUNTRY/REGION,STATE/PROVINCE,PHONE1,EMAIL1,ZIPPOSTAL";
					}
					// Added for defect 1380 -- END
				}						
			}
			else
			{
				if(selection != null){
					var selectedAddressId = selection.options[selection.selectedIndex].value;
				}
				if(selectedAddressId != null && userprofileaddr != selectedAddressId){
					UtilitiesJS.displayBasedOnEditable(emailaddr, true, false);
					//dijit.byId("verifyemail1").attr("disabled",true);
				}
				else{
					UtilitiesJS.displayBasedOnEditable(emailaddr, true, true);
				}
			
				if(document.getElementById("myaccountEmail") !=null){
					document.getElementById("myaccountEmail").style.display = "none";
					//document.getElementById("myaccountverifyEmail").style.display = "none";
					// Added for defect 1380 -- START
					var mandfields = (document.forms["AddressForm"])["AddressForm_FieldsOrderByLocale"];
					if(mandfields != null && mandfields != undefined){
						(document.forms["AddressForm"])["AddressForm_FieldsOrderByLocale"].value = "NICK_NAME,FIRST_NAME,LAST_NAME,ADDRESS,CITY,COUNTRY/REGION,STATE/PROVINCE,PHONE1,ZIPPOSTAL";
					}
					// Added for defect 1380 -- END
				}
			}
		});

		dojo.connect(dojo.byId("labl_forBillingAddress"),"click",function(){
			if(dojo.hasClass(this,"checked"))
			{
				dijit.byId("email11").attr("disabled",false);
				//dijit.byId("verifyemail11").attr("disabled",false);
				if(document.getElementById("myaccountEmail1") !=null){
					// Updated to fix defect 1380 -- START
					document.getElementById("myaccountEmail1").style.display = "block";
					//document.getElementById("myaccountverifyEmail1").style.display = "block";
					var mandfields = (document.forms["AddressForm1"])["AddressForm_FieldsOrderByLocale"];
					if(mandfields != null && mandfields != undefined){
						(document.forms["AddressForm1"])["AddressForm_FieldsOrderByLocale"].value = "NICK_NAME,FIRST_NAME,LAST_NAME,ADDRESS,CITY,COUNTRY/REGION,STATE/PROVINCE,phone1,ZIPPOSTAL,EMAIL1";
					}
					// Updated to fix defect 1380 -- END
				}
			}
			else
			{
				dijit.byId("email11").attr("disabled",true);
				//dijit.byId("verifyemail11").attr("disabled",true);
				if(document.getElementById("myaccountEmail1") !=null){
					// Updated to fix defect 1380 -- START
					document.getElementById("myaccountEmail1").style.display = "none";
					//document.getElementById("myaccountverifyEmail1").style.display = "none";
					var mandfields = (document.forms["AddressForm1"])["AddressForm_FieldsOrderByLocale"];
					if(mandfields != null && mandfields != undefined){
						(document.forms["AddressForm1"])["AddressForm_FieldsOrderByLocale"].value = "NICK_NAME,FIRST_NAME,LAST_NAME,ADDRESS,CITY,COUNTRY/REGION,STATE/PROVINCE,phone1,ZIPPOSTAL";
					}
					// Updated to fix defect 1380 -- END
				}

			}
		});
	},

//	updateGiftBoxParams:function()
//	{
//		dojo.connect(dojo.byId("label-sitb1"),"click",function(){
//
//			if (!(document.getElementById("sitb1").checked)){
//				var giftBoxcheckbox_list = dojo.byId("sitb1");
//				var orderItemfilterIds="";
//				var params = [];
//				//var orderItemGiftBox = dojo.byId("sitb1").value;
////				for(var i=0;i<giftBoxcheckbox_list.length;i++){
////					if(giftBoxcheckbox_list[i].checked == false){
////							if(orderItemfilterIds == ""){
////								orderItemfilterIds = giftBoxcheckbox_list[i].value;
////							} else {
////								orderItemfilterIds = orderItemfilterIds + "," + giftBoxcheckbox_list[i].value;
////							}
////						}
//				}
//
//				params.giftboxOptType= "2";
//				params.orderId = dojo.byId("orderIdGiftBox").value;
//				params.addressId = dojo.byId("addressIdGiftBox").value;
//				params.orderItemIds = orderItemfilterIds;
////				wc.service.invoke("AjaxGiftboxSelect",params);
//			}
//		})
//	},

	updateCheckBoxParams :function()
	{
		//console.log('updateCheckBoxParams');
		dojo.connect(dojo.byId("label-notshow"),"click",function(){
			var disablegiftbox = dojo.byId("orderIdGiftBox").value;
			// Gift Registry changes starts, If condition is added for gift registry flow
				if(document.getElementById('disableEditAndDoNotShowPriceButton') !== null && document.getElementById("disableEditAndDoNotShowPriceButton").value == "true"){
					$('#label-notshow').addClass("checked");
				}
				else{
				// Gift Registry changes ends
				if ((document.getElementById("notshow").checked)){
				var params = [];
				params.giftboxOptType= "0";
				params.orderId = dojo.byId("orderIdGiftBox").value;
				params.message = dojo.byId("giftmessage").value;
//				params.addressId = dojo.byId("addressIdGiftBox").value; do not need address
				params.showPrice = "false";
				console.log('updateCheckBoxParams false  ');

				// block until all ajax calls complete
				ajaxblock.init();

				wc.service.invoke("AjaxGiftboxSelect",params);
			}else{
				var params = [];
				params.giftboxOptType= "0";
				params.orderId = dojo.byId("orderIdGiftBox").value;
				params.message = dojo.byId("giftmessage").value;
//				params.addressId = dojo.byId("addressIdGiftBox").value;  do not need address
				params.showPrice = "true";

				// block until all ajax calls complete
				ajaxblock.init();
				wc.service.invoke("AjaxGiftboxSelect",params);
					}
			}});
// start fix for gift box display price
		if(document.getElementById('disableEditAndDoNotShowPriceButton') !== null && document.getElementById("disableEditAndDoNotShowPriceButton").value == "true")
		{
			$('#label-notshow').addClass("checked");
			document.getElementById("notshow").checked = true;
			if ((document.getElementById("notshow").checked)){
				//alert('using dojo- document.getElementById("notshow")');
				var params = [];
				params.giftboxOptType= "0";
				params.orderId = dojo.byId("orderIdGiftBox").value;
				params.message = dojo.byId("giftmessage").value;
//				params.addressId = dojo.byId("addressIdGiftBox").value; do not need address
				params.showPrice = "false";
				console.log('updateCheckBoxParams false  ');

				// block until all ajax calls complete
				ajaxblock.init();

				wc.service.invoke("AjaxGiftboxSelect",params);			
	}
		}
// end fix for gift box display price
	},

	//Gift Registry changes start
	updateNotifyRegistrantFlag :function(){
		dojo.connect(dojo.byId("lable-SendNotificationToRegistrant"),"click",function(){			
		var params = [];
		if ((document.getElementById("SendNotificationToRegistrant").checked)){				
			params.isSendNotifyFlag= "Y";				
			console.log('updateNotifyRegistrantFlag true');								
		} else {				
			params.isSendNotifyFlag= "N";				
			console.log('updateNotifyRegistrantFlag false');				
		}
		// block until all ajax calls complete
		ajaxblock.init();
		wc.service.invoke("AjaxSendNotificationToReg",params);
		});		
	},
	
		
		isGRFlowEnabled :function(){
		
		//var storeId = document.getElementById("storeId").value;
		var grCookieValueRegistrant = UtilitiesJS.getCookie("GIFT_REGISTRANT");
		
		if( grCookieValueRegistrant != "" && grCookieValueRegistrant!= null && CommonControllersDeclarationJS.storeId != 10151){
				 return true;
				 }
				 else
				 {
				 return false;
				 }
			//return true;
		},
		
		isGRSessionIdExists :function(){
			
			
			var cookieValueGRSession = UtilitiesJS.getCookie("GIFT_GRSESSION");
			
			if( cookieValueGRSession != "" && cookieValueGRSession!= null && CommonControllersDeclarationJS.storeId != 10151){
					 return true;
					 }
					 else
					 {
					 return false;
					 }
				//return true;
			},
    //Gift Registry changes end

	updateGiftBoxMessage :function()
	{
		//console.log('updateGiftBoxMessage');
		
		var giftSuggestionValue = document.getElementById("giftSuggestionMessage").value;
		dojo.connect(dojo.byId("giftmessage"),"onchange",function(){
			
			//Gift Registry changes starts 
			if(null!=dojo.byId("isGiftRegistryCheck") && dojo.byId("isGiftRegistryCheck").value == "true"){
				$('#showMessageReminder').text(giftSuggestionValue);
			}
			//Gift Registry changes ends
			var params = [];

			if ((document.getElementById("notshow").checked)){
				params.showPrice = "false";
			}else{
				params.showPrice = "true";
			}
			params.giftboxOptType= "0";
			params.message = dojo.byId("giftmessage").value;
			params.orderId = dojo.byId("orderIdGiftBox").value;
			// block until all ajax calls complete



			ajaxblock.init();
			wc.service.invoke("AjaxGiftboxSelect",params);
			});
	},





	/*
	 * toggleRegSendSMS() function added for Registration modal (Email Subscription) to Enable/Disable the
	 * phone fields based on the checkbox [Send me SMS Texts about store specials]
	 */
	toggleRemoveGiftCard:function()
	{
		dojo.connect(dojo.byId("label-PaybyGiftCard"),"click",function(){
		if (!document.getElementById("PaybyGiftCard").checked){
			ajaxblock.init();
			CheckoutPayments.deleteGiftCardPaymentInstructions();
			dijit.byId("GCcardNumber").attr("disabled",true);
			dijit.byId("pin").attr("disabled",true);
			dijit.byId("GCcardNumber2").attr("disabled",true);
			dijit.byId("pin2").attr("disabled",true);

			var amount=HBC.formatTotalHiddenForPayment();

			wc.render.getRefreshControllerById("creditAmountDisplayController").url = document.getElementById("piAmount_display_CreditAmountURL").value +"&amount="+amount;
			wc.render.updateContext("creditAmountDisplayContext", {});
			}
		if (document.getElementById("PaybyGiftCard").checked){
			ajaxblock.init();
			dijit.byId("GCcardNumber").attr("disabled",false);
			dijit.byId("pin").attr("disabled",false);
			dijit.byId("GCcardNumber2").attr("disabled",false);
			dijit.byId("pin2").attr("disabled",false);
			dijit.byId("GCcardNumber").attr("readOnly",false);
			dijit.byId("pin").attr("readOnly",false);
			document.getElementById('apply').style.display="block";
			 dijit.byId("GCcardNumber2").attr("readOnly",false);
			  dijit.byId("pin2").attr("readOnly",false);
			  document.getElementById('GCcardNumber2').value=""
			  document.getElementById('pin2').value=""
			  document.getElementById('apply2').style.display="block";
			  document.getElementById('GCcounter').value="0";
			  var currentGC1URL = wc.render.getRefreshControllerById("firstGiftCardAmountDisplayController").url;
		        wc.render.getRefreshControllerById("firstGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC1AmountURL").value + "&piAmount=";
		        wc.render.updateContext("firstGiftCardAmountDisplayContext", {});
			    var currentGC2URL = wc.render.getRefreshControllerById("secondGiftCardAmountDisplayController").url;
		        wc.render.getRefreshControllerById("secondGiftCardAmountDisplayController").url = document.getElementById("piAmount_display_GC2AmountURL").value + "&piAmount=";
		        wc.render.updateContext("secondGiftCardAmountDisplayContext", {});


			}

		})
	},

	/*
	 * toggleSubSendSMS() function added for Email Subscription modal to Enable/Disable the phone fields based on the checkbox
	 * [Send me SMS Texts about store specials]
	 */
	/*toggleSubSendSMS:function()
	{
		if(!dojo.byId("label-smarketingSMS"))
		{
			return false;
		}
		var phone = dijit.byId("subphone1");
		var phone1 = dijit.byId("subphone2");
		var phone2 = dijit.byId("subphone3");
		var phoneArr=[phone,phone1,phone2];
		dojo.forEach(phoneArr,function(i){
			i.attr("disabled",!dojo.byId("smarketingSMS").checked);
		});
		dojo.connect(dojo.byId("label-smarketingSMS"),"click",function(){
			UtilitiesJS.toggleErrorMsg(dojo.byId("label-marketingEmailorSMS"), "none");
			dojo.forEach(phoneArr,function(i){
				i.attr("disabled",!dojo.byId("smarketingSMS").checked);
			});
		})
	},*/

	/*
	 * toggleSubSendEmail() function added for Email Subscription modal to Enable/Disable the information fields based on the checkbox
	 * [Send me SMS Texts about store specials]
	 */
	toggleSubSendEmail:function()
	{
		if(!dojo.byId("label-smarketingEmail"))
		{
			return false;
		}
		var semail = dijit.byId("semail");
		var svemail = dijit.byId("svemail");
		var sfname = dijit.byId("sfname");
		var slname = dijit.byId("slname");
		var phoneArr=[semail,svemail,sfname,slname];
		dojo.forEach(phoneArr,function(i){
			i.attr("disabled",!dojo.byId("smarketingEmail").checked);
		});
		dojo.connect(dojo.byId("label-smarketingEmail"),"click",function(){
			UtilitiesJS.toggleErrorMsg(dojo.byId("label-marketingEmailorSMS"), "none");
			dojo.forEach(phoneArr,function(i){
				i.attr("disabled",!dojo.byId("smarketingEmail").checked);
			});
		})
	},

	/*
	 * toggleRegSendSMS() function added for Registration modal (Email Subscription) to Enable/Disable the
	 * phone fields based on the checkbox [Send me SMS Texts about store specials]
	 */
/*	toggleRegSendSMS:function(prefix)
	{

		if(prefix == null || prefix == undefined){
			prefix = "";
		}
		if(!dojo.byId(prefix + "label-marketingSMS"))
		{
			return false;
		}
		var phone = dijit.byId(prefix + "mobilephone1");
		var phone1 = dijit.byId(prefix + "mobilephone2");
		var phone2 = dijit.byId(prefix + "mobilephone3");
		var phoneArr=[phone,phone1,phone2];
		dojo.forEach(phoneArr,function(i){
			i.attr("disabled",!dojo.byId(prefix + "marketingSMS").checked);
		});
		dojo.connect(dojo.byId(prefix + "label-marketingSMS"),"click",function(){
			dojo.forEach(phoneArr,function(i){
				i.attr("disabled",!dojo.byId(prefix + "marketingSMS").checked);
			});
		})
	},*/

	/*
	 * toggleRegSendSMS() function added for Registration modal (Email Subscription) to Enable/Disable the phone fields based on the checkbox
	 * [Send me SMS Texts about store specials]
	 */
	toggleRegSendSMSSingle:function(prefix)
	{
		if(!dojo.byId(prefix + "label-marketingSMSSingle"))
		{
			return false;
		}
		var phone = dijit.byId(prefix + "mobilephoneSingle");
		var phoneArr=[phone];
		dojo.forEach(phoneArr,function(i){
			i.attr("disabled",!dojo.byId(prefix + "marketingSMSSingle").checked);
		});
		dojo.connect(dojo.byId(prefix + "label-marketingSMSSingle"),"click",function(){
			dojo.forEach(phoneArr,function(i){
				i.attr("disabled",!dojo.byId(prefix + "marketingSMSSingle").checked);
			});
		})
	}
};
/* CHanges for GB Imple starts*/

/*Changes for GB Impl Ends */

dojo.addOnLoad(function(){
	////alert("HBC.init");
	HBC.init();
	if (document.pub) {
	  document.pub();
	}
	
	// set menu widths for IE7:
	/*Commented for task 3003 - no more needed. Making it dynamic
	if(dojo.isIE == 7){
		dojo.query("li.submenu a.nav, li.submenu span", dojo.byId("main_nav")).forEach(function(oATag){
			if(typeof(oATag) == "object"){
				switch(oATag.innerHTML.toLowerCase().substring(0,3)){
				case "wom":  // Women's Apparel
					dojo.query(oATag).next().style("width", "700px");
					break;
				case "sho":  // Shoes
					dojo.query(oATag).next().style("width", "150px");
					break;
				case "han":  // Handbags
					dojo.query(oATag).next().style("width", "200px");
					break;
				case "jew":  // Jewelry & Accessories
					dojo.query(oATag).next().style("width", "300px");
					break;
				case "bea":  // Beauty & Fragrance
					dojo.query(oATag).next().style("width", "400px");
					break;
				case "men":  // Mens
					dojo.query(oATag).next().style("width", "525px");
					break;
				case "kid":  // Kids
					dojo.query(oATag).next().style("width", "800px");
					break;
				case "hom":  // Home
					dojo.query(oATag).next().style("width", "500px");
					break;
				case "gif":  // Gifts
					dojo.query(oATag).next().style("width", "200px");
					break;
				};
			} else {
				console.debug(typeof(oATag) + " was found");
			}	
		});
	}*/
});

/* Stop the errors associated with these missing functions: */
var showPopupButton = function(x){};
var hidePopupButton = function(x){};

/*
 *  Create a harmless console object for browsers that don't support it
 *  and give the ability to stop all console logging:
 */
var bDebug = false;
if (!window.console || false === bDebug){
	(function(){
		// Add methods as req'd:
		var aMethods = ["debug", "error", "info", "log", "warn"];

		window.console = {};
		for (i = 0; i < aMethods.length; i++){
			window.console[aMethods[i]] = function(){};
		}
	}());
};
