(function ($, window, document, undefined) {

	godivab2b = (function () {

		function _b2bAccountRequestFun() {

			this.initFun = function() {
				
				$('.button-account').on('click', this.formSubmit);				
				$('input[name=dwfrm_requestaccount_fax], input[name=dwfrm_requestaccount_mobile], input[name=dwfrm_requestaccount_industryother]').blur(this.errorClear);
				$('select[name$="_country"]').on("change", this.updateStateOptions);
				$('.button-clear').on('click', this.formClear);
				$('input[name=dwfrm_requestaccount_other]').on('change', this.showOtherTextbox);
				$('input[name=dwfrm_requestaccount_industryother]').hide();
				$('input[name=dwfrm_requestaccount_stateprovince]').parent().hide();
				$('select[name=dwfrm_requestaccount_industry]').on('change', this.enableStateField);				
				
			},
			
			this.enableStateField = function() {
				if($(this).val() != 'Other') {
					$(this).parent().next().find('span').remove();
				} else {
					$(this).parent().next().find('input').css({'border' : '1px solid #aaa', 'background' : '#fff', 'color' : '#000'});
				}
			},
			
			this.updateStateOptions = function() {
                var country = $(this);
                if ($("#stateOptions").length===0 || ![$("#stateOptions").val()]) {
                       return; 
                }
                var form = country.closest("form");
                var stateField = country.data("stateField") ? country.data("stateField") : form.find("select[name$='_state']");
                if (stateField.length===0) {
                       return;
                }
                
                var currentStateSelection = stateField.val();
                var so= $("#stateOptions").val();
                var soJson = JSON.parse(so);
                var form = country.closest("form"),      
                       c = soJson[country.val()],
                       arrHtml = [],
                       labelSpan = form.find("label[for='"+stateField[0].id+"'] span").not(".required-indicator");
                
                // set the label text
                labelSpan.html(c.label);
   
                var s;
                for (s in c.regions) {
                       if(s==currentStateSelection)
                              arrHtml.push('<option selected=selected value="'+s+'">'+c.regions[s]+'</option>');
                       else
                       arrHtml.push('<option value="'+s+'">'+c.regions[s]+'</option>');
                }
                // clone the empty option item and add to stateSelect
                var o1 = stateField.children().first().clone();
                 stateField.html(arrHtml.join("")).removeAttr("disabled").children().first().before(o1);
                stateField[0].selectedIndex=0;
                
                // try to select a state if one was already selected before country selection
                stateField.val(currentStateSelection);
                if($(country).val() == "US" || $(country).val() == "CA" || $(country).val() == "" || jQuery("select.stateselect").val() == null)
                {
                       jQuery("select.stateselect").parent().show();                 
                       jQuery("select.stateselect").addClass('required').addClass('valid');
                       jQuery("select.stateselect").closest('.form-row').addClass('required');
                       jQuery("a.stateselect").addClass('required');
                       jQuery("input.stateprovince").parent().hide();
                       
                }
                else
                {
                       jQuery("select.stateselect").parent().hide();
                       jQuery("select.stateselect option[value='OTHER']").attr('selected', 'selected');
                       jQuery("select.stateselect").removeClass("required").removeClass('valid');
                       jQuery("a.stateselect").removeClass('required');
                       jQuery("select.stateselect").closest('.form-row').removeClass('required error');
                       jQuery("input.stateprovince").parent().show();
                }      
                jQuery("#dwfrm_requestaccount_states_state").selectBox('refresh');
                
          },
			
			this.errorClear = function() {
				
				/*$(this).next('b.error, span.error').remove();
				$(this).addClass('error').removeClass('valid');
				$(this).css({'border': '', 'background': ''});	*/
				
				if($(this).val() != ''){
					$(this).removeClass('error');
					$(this).next('b.error, span.error').remove();
					$(this).css({'border': '', 'background': ''});
				} /*else {
					$(this).after('<b class="error">Please enter a value</b>').addClass('error');
				}*/
				
				if($('input[name=dwfrm_requestaccount_industryother]').val() == '') {
					$('input[name=dwfrm_requestaccount_industryother]').css({'border' : '1px solid #be2000', 'background' : '#f1e6e6'});
				}
					
			},
			
			this.formClear = function() {
				$('#RequestAccountForm input[type="text"], #RequestAccountForm textarea').val('');
				$('#RequestAccountForm select').val('');
				$('#RequestAccountForm input[type="text"], #RequestAccountForm textarea').parent().find('b.error').remove();
				$('#RequestAccountForm input[type="text"], #RequestAccountForm textarea').parent().find('span.error').remove();
				$('#RequestAccountForm input[type="text"], #RequestAccountForm textarea').css({'border': '1px solid #adadad', 'background': '#fff'});
				$('.char-count').find('.char-remain-count').text('175');
			},
			
			this.errorOldClear = function() {
				
				$(this).parent().find('b.error').remove();
									
			},
						
			this.showOtherTextbox = function() {
				
				if($('input[name=dwfrm_requestaccount_other]').is(':checked')){
					$('input[name=dwfrm_requestaccount_other]').parents().find('.other-textbox').show();
				} else {
					$('input[name=dwfrm_requestaccount_other]').parents().find('.other-textbox').hide();
				}
				
			},
						
			this.formSubmit = function(){				
				
				$('input[type="text"], textarea').parent().find('span.error').remove();
				$('input[type="text"], textarea').parent().find('b.error').remove();
				$('input[name=dwfrm_quoterequestform_phone]').parent().find('span.error').css('display', 'none');
				
				var phoneRegEX = /^\(?([2-9][0-8]\d)\)?[\-\. ]?([2-9]\d{2})[\-\. ]?(\d{4})$/;
				var errortrue = 'true';
							
				if($('input[name=dwfrm_requestaccount_fax]').val() !='') {
					if(!( phoneRegEX.test( $('input[name=dwfrm_requestaccount_fax]').val() ) ) ){					
						$('input[name=dwfrm_requestaccount_fax]').after('<b class="error">Please enter a valid FAX</b>').css({'border': '1px solid #be2000', 'background': '#f1e6e6'});					
						errortrue = 'false';
					} 
				}
				
				if($('input[name=dwfrm_requestaccount_mobile]').val() !='') {
					if(!( phoneRegEX.test( $('input[name=dwfrm_requestaccount_mobile]').val() ) ) ){					
						$('input[name=dwfrm_requestaccount_mobile]').after('<b class="error">Please enter a valid Mobile</b>').css({'border': '1px solid #be2000', 'background': '#f1e6e6'});					
						errortrue = 'false';
					} 
				}
				if($('select[name=dwfrm_requestaccount_industry]').val() == 'Other' ){							
					if($('input[name="dwfrm_requestaccount_industryother"]').val() == '') {
						var errMsg = $('input[name="dwfrm_requestaccount_industryother"]').data('errormsg');
						$('input[name="dwfrm_requestaccount_industryother"]').after('<span class="error">'+errMsg+'</span>').css('border', '1px solid #f00');	
						errortrue = 'false';
					}
				}
				
				if(errortrue == 'false'){
					return false;
				} /*else {
					
					var html = 'Confirmation message will come here';
							
					$("#dialog-confirm").html(html);
					
					$("#dialog-confirm").dialog({
						resizable: false,
						modal: true,
						title: "Confirmation Message",
						height: 250,
						width: 400
					});
					
					return false;
					
				} */	
				
			}

		}

		return new _b2bAccountRequestFun();

	})();

	godivab2b.initFun();

})(jQuery, this, this.document);