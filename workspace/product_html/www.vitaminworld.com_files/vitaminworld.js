jQuery(document).ready(function($) {
		 
	$=jQuery.noConflict();
	 	
	if(jQuery('#search-result-items').length > 0){
		jQuery('.grid-tile-img').ready(function(){
		  jQuery('.grid-tile-img').height(jQuery('.grid-tile-img').closest('.grid-tile').prev().outerHeight());
		  jQuery('.grid-tile-img img').height(jQuery('.grid-tile-img').closest('.grid-tile').prev().outerHeight());
		})
	}
	if(typeof String.prototype.trim !== 'function') {
		  String.prototype.trim = function() {
		    return this.replace(/^\s+|\s+$/g, ''); 
		  }
	};
	
	if(jQuery('.product-tabs .label-info .SupplementFacts').length>0){
			var breakedstring = jQuery('.product-tabs .label-info .SupplementFacts').html().split('\n');
			//labelwarning=jQuery('.product-tabs .label-info').html().split('Other Ingredients')
			//var arrylist = [];
			jQuery('.product-tabs .label-info .SupplementFacts').html("")
			for (var i = 0; i < breakedstring.length; i++) {		
				if (breakedstring[i] !== undefined && breakedstring[i] !== null && breakedstring[i].trim() !== "") {					
					//arrylist.push(breakedstring[i]);
					jQuery('.product-tabs .label-info .SupplementFacts').append('<div class="tab-table-cell">'+breakedstring[i]+'</div>') 
				}
			 }
			
			//for(j=0; j <=lastcount-1; j++){ 
				//jQuery('.product-tabs .label-info .SupplementFacts').append('<div class="tab-table-cell">'+arrylist[j]+'</div>') 
			//}
			
		}
		
       var pdfdata = null;
       var homepage_slide_hight=jQuery('body').outerWidth();
       //jQuery('#homepage-slider').css('height',homepage_slide_hight+'px !important');
       jQuery('.refinesearch_title_inactive').live('click',function(){
    	   jQuery(this).addClass('refinesearch_title_active').removeClass('refinesearch_title_inactive');
    	   jQuery('.refinement ul').slideDown();
       });
       jQuery('.refinesearch_title_active').live('click',function(){
    	   jQuery(this).addClass('refinesearch_title_inactive').removeClass('refinesearch_title_active');
    	   jQuery('.refinement ul').slideUp();
       });
       if(jQuery('.user-account').length>0 && parseInt(jQuery('.user-account').text().trim().length)>20){jQuery('.user-account').text(jQuery('.user-account').text().trim().substring(0,17).concat('...'))}
       var regex = new RegExp("[A-Za-z0-9]");

       //-------- Loyalty points dialog -------
       jQuery(".loyaltypointsdialog").on("click",function(e){
			e.preventDefault();
			var witdhloyaty;
			if(jQuery(window).width()>=767){
				witdhloyaty=700
			}
			else{
				witdhloyaty='auto'
			}
			app.dialog.open({
				url : app.urls.loyaltypoints,
				options : {
					height : 'auto',
					width : witdhloyaty,
					dialogClass : 'quickview',
					title : 'Loyalty Points'
				}
			});
	   });
       // billing page rebate code implimentation - ajax call
       jQuery("#savingspassportapplybilling").on("click",function(e){
    	   e.preventDefault();
    	   if(jQuery("#dwfrm_billing_passportsavingsNo").val() == '' || typeof(jQuery("#dwfrm_billing_passportsavingsNo").val()) == 'undefined'){
               jQuery(".billing-savingspassport-code .error").text(app.resources.PASSPORT_CODE_MISSING);
               return false;
    	   }
    	   else if(jQuery("#dwfrm_billing_passportsavingsNo").val().length < 12){
    		   jQuery(".billing-savingspassport-code .error").text(app.resources.PASSPORT_CODE_INVALID);
    		   return false;
    	   }
    	   else{
    		   jQuery(".billing-savingspassport-code .error").text("");
    		   jQuery(".billing-savingspassport-code .success-message").text("");
    	   }
    	   var rebateNumber = jQuery("#dwfrm_billing_bonusRebate").val();
    	   var passportNumber = jQuery("#dwfrm_billing_passportsavingsNo").val();
    	   var data = "passportNumber="+passportNumber+"&rebateNumber="+rebateNumber;
    	   var url = app.urls.loyaltyrebate;
    	   if(passportNumber!= '' && rebateNumber != ''){
    		   jQuery.ajax({
    	           url: url,
    	           data: data,
    	           contentType:"html",
    	     }).success(function(response){
    	    	 window.location.href = app.urls.COBilling;
    	    /*	 jQuery.ajax({
                     url: app.urls.refreshPaymentMethods,
               }).success(function(response1){
            	   var data = jQuery(response1);
       
            	   if(data.filter("input[name='hiddenLoyalty']").val()=="2")
            	   {
            		   jQuery('.paymentmethodsbilling').remove();
            		   jQuery('.billingnopaymentmethod').html(response1);
            	   }
               });
    	           var data = jQuery(response);
    	           var errormessage = data.filter(".error_message").html();
    	           var rebateResponse = data.filter(".checkout-order-totals").html();
    	           var rebatealreadyapplied = data.filter(".rebate-checkout-order-totals-error").html();
    	           if(errormessage != null && errormessage != "" ){
    	        	   jQuery(".billing-boonusrebate-code .success-message").text("");
    	        	   jQuery(".billing-savingspassport-code .error").html(errormessage);
    	           }
    	           else{
    	        	   jQuery('.checkout-order-totals').html(rebateResponse);
    	        	   jQuery(".billing-savingspassport-code .error").text("");
    	        	   if(rebatealreadyapplied != null && rebatealreadyapplied != ""){
    	        		   jQuery(".billing-boonusrebate-code .success-message").text("");
        	        	   jQuery(".billing-boonusrebate-code .error").text(app.resources.REBATE_CODE_ALREADY_APPLIED);
        	           }
    	        	   else{
    	        		   jQuery(".billing-boonusrebate-code .success-message").text(app.resources.REBATE_CODE_APPLIED);
    	        	   }
        	           jQuery(".savingspassportbilling").hide();
        	           jQuery(".billing-boonusrebate-code #checkbonusRebatebilling").show();
        	           jQuery(".billing-boonusrebate-code #dwfrm_billing_bonusRebate").val("");
    	           }
    	           */
    	     });
    	   }
    	   else {
    		   jQuery(".billing-savingspassport-code .error").text("Both passport number and rebate no. are mandatory.");
    		   return;
    	   }
       
       }); 
       
       jQuery("#savingspassporttogetpoints").live("click",function(e){
              e.preventDefault();
              jQuery(".loyaltypointsvalue").hide();
              if(jQuery("#dwfrm_loyalty_passportno").val() == '' || typeof(jQuery("#dwfrm_loyalty_passportno").val()) == 'undefined'){
                     jQuery(".passpostcode-forpoints .error").text(app.resources.PASSPORT_CODE_MISSING);
                     return false;
              }
              else if(jQuery("#dwfrm_loyalty_passportno").val().length < 12){
            	  jQuery(".passpostcode-forpoints .error").text(app.resources.PASSPORT_CODE_INVALID);
                  return false;
              }
              var passportUrl = document.getElementById('pointsurl');
              var passportcode = jQuery(".passpostcode-forpoints input").val();
              var data = jQuery("#loyalty-points-form").serialize(); 
              if(passportcode!=""){
                     jQuery(".passpostcode-forpoints .error").text('');
                     jQuery.ajax({
                           url: passportUrl.value,
                           data: data,
                           contentType:"application/json; charset=utf-8",
                     }).success(function(response){
                    	
                           var data = jQuery(response);
                           var json = data.filter(".responsejson")
                           var passportcoderesponse = JSON.parse(json.text());  
                           if(passportcoderesponse.success =="true")
                                  {	
                        	   			if(passportcoderesponse.isLoyaltyServiceSucces == "true"){
                        	   				jQuery(".loyaltypointsvalue").show();
                                            jQuery(".loyaltypointsvalue").text("You have earned " + passportcoderesponse.loyalty + " points!");
                                            jQuery(".passpostcode-forpoints label").css("display","none");
                        	   			}
                        	   			else{
                        	   				jQuery(".loyaltypointsvalue").empty();
                        	   			 jQuery(".passpostcode-forpoints .error").text("Please enter a valid passport code.");
                                            jQuery(".passpostcode-forpoints label").css("display","none");
                        	   			}
                                  }
                           else {
                                  jQuery(".passpostcode-forpoints .error").text(passportcoderesponse.errorMessage);
                                  jQuery(".passpostcode-forpoints label").css("display","inline");
                                  return false ;
                           }
                     });
                     return false ;
              }
              else{
                     jQuery(".surveycodeinput .error").text("Please enter coupon code.");
                     jQuery(".passpostcode-forpoints label").css("display","inline");
                     return false ;
              }
       });
       
       //-------- Survey and barcode dialog-------
       var submitcouponbutton = jQuery("#sendBtn");
       
       submitcouponbutton.on("click",function(){
              var couponUrl = document.getElementById('couponurl');
              var data = jQuery("#forseeSurveyForm").serialize(); 
              var couponcode = jQuery(".surveycodeinput input").val();
              var lang = jQuery("#langES").val();
		if(couponcode!="")
		{
			jQuery(".surveycodeinput .error-message").text('');
			 jQuery.ajax({
			       url: couponUrl.value,
			       data:data,
			       contentType:"application/pdf",
			 }).success(function(response){
			       var data = jQuery(response);
			       var barcoderesponse  =  JSON.parse(data.find(".responsejson").text());     
				   var barcodeTarget = data.find(".barcodecontainer");
				   var barcodeTargetContent = data.filter(".sureveyresponse");                       
				   if(barcoderesponse.barcode.length == 12){
				       barcodeTarget.barcode(barcoderesponse.barcode, barcoderesponse.barcodeEncoding);
					   var barcodeimage = barcodeTarget.barcode(barcoderesponse.barcode, barcoderesponse.barcodeEncoding); 
				   
					   if(barcodeimage != false){
					      pdfdata = jQuery(barcodeTargetContent); 
					      jQuery('#coupondetails .sureveyresponse').detach();
						  jQuery('#coupondetails').append(jQuery(barcodeTargetContent))
						  jQuery('#coupondetails').show().css('position','absolute').css('z-index','-2000');
						  jQuery('#coupondetails').printElement({overrideElementCSS: ['/on/demandware.static/Sites-vitaminworld_us-Site/-/default/v1390289989865/css/print.css']});
					   }
				   }
				   else {
					   if(lang == "ES"){
						   jQuery(".surveycodeinput .error-message").text(app.resources.FORESEE_INVALID_COUPONES);
					   } else {
						   jQuery(".surveycodeinput .error-message").text(app.resources.FORESEE_INVALID_COUPON);
					   }
					   
					   return false ;
	               }
	         });
	         return false ;
		}
		else
		{
			if(lang == "ES"){
				   jQuery(".surveycodeinput .error-message").text("Por favor ingrese el Survey Code.");
			   } else {
				   jQuery(".surveycodeinput .error-message").text("Please enter coupon code.");
			   }
			return false ;
		}
                     
      });
       //---------END survey-barcode js-----------
       
       
       // cart page bonus rebate empty check
       jQuery("#checkbonusRebate").css('display','block');
       jQuery("#checkbonusRebate").on("click",function(){
    	   	  jQuery(".bonusrebate-coupon-box .success-message").css('display','none');
              if(jQuery("#dwfrm_cart_bonusRebate").val() == '' || typeof(jQuery("#dwfrm_cart_bonusRebate").val()) == 'undefined'){
                     jQuery(".cart-boonusrebate-code .error").text(app.resources.REBATE_CODE_MISSING);
                     return false;
              }
              else{
            	  if(jQuery("#dwfrm_cart_bonusRebate").val().length < 12){
         	  		 jQuery(".cart-boonusrebate-code .error").text(app.resources.REBATE_CODE_INVALID);
                      return false;
         	  		}
            	  else{
                     jQuery(".cart-boonusrebate-code .error").text("");
                     jQuery("#checkbonusRebate").css('display','none');
                     jQuery(".savingspassport").css('display','block');
            	  }
              }
       });
       jQuery("#savingspassportapply").on("click",function(){
    	   jQuery(".bonusrebate-coupon-box .success-message").css('display','none');
              if(jQuery("#dwfrm_cart_savingsNo").val() == '' || typeof(jQuery("#dwfrm_cart_savingsNo").val()) == 'undefined'){
                     jQuery(".cart-savingspassport-code .error").text(app.resources.PASSPORT_CODE_MISSING);
                     return false;
              }
              else if(jQuery("#dwfrm_cart_savingsNo").val().length < 12){
            	  jQuery(".cart-savingspassport-code .error").text(app.resources.PASSPORT_CODE_INVALID);
                  return false;
              }
              else{
            	  jQuery(".cart-savingspassport-code .error").text("");
              }
       });

       //billing page bonus rebate empty check
       jQuery("#checkbonusRebatebilling").css('display','block');
       jQuery("#checkbonusRebatebilling").on("click",function(){
              if(jQuery("#dwfrm_billing_bonusRebate").val() == '' || typeof(jQuery("#dwfrm_billing_bonusRebate").val()) == 'undefined'){
                     jQuery(".billing-boonusrebate-code .error").text(app.resources.REBATE_CODE_MISSING);
                     return false;
              }
              else{
            	  if(jQuery("#dwfrm_billing_bonusRebate").val().length < 12){
         	  		 jQuery(".billing-boonusrebate-code .error").text(app.resources.REBATE_CODE_INVALID);
                      return false;
         	  		}
            	  else{
            		  jQuery("#dwfrm_billing_passportsavingsNo").val("");
            		  jQuery(".billing-boonusrebate-code .error").text("");
            		  jQuery(".billing-boonusrebate-code .success-message").text("");
            		  jQuery("#checkbonusRebatebilling").css('display','none');
            		  jQuery(".savingspassportbilling").css('display','block');
            	  }
              }
       }); 
       
       /*Bazaar Voice read Reviews onclick event*/
       jQuery(".BVRRRatingSummaryLinkRead a:first").die('click').live('click',function(e){
    	   	  e.preventDefault();
    	   	  jQuery('.tabs-menu > li:last-child a').trigger('click');
    	   	  jQuery(window).scrollTop(jQuery('#BVRRDisplayContentLinkWriteID').offset().top-30);
    	   	  
       });
       
       /* Notify Me dialog */
       jQuery("#notifyme").live("click",function(e){
			e.preventDefault();
			jQuery(".ui-dialog-content").dialog("close");
			var pid = jQuery(".pdpForm input#pid").val();			
			var url = app.util.appendParamToURL(app.urls.notifyMe, "pid", pid);
			var widthNotifyMeDialog;
			if(jQuery(window).width()>=767){
				widthNotifyMeDialog=700
			}
			else{
				widthNotifyMeDialog='auto'
			}
			app.dialog.open({
				url : url,
				options : {
					height : 'auto',
					width : widthNotifyMeDialog,
					dialogClass : 'quickview',
					title : 'Notify Me'
				}
			});
	   });
       
       /* remove rebate from basket */
       jQuery("#removeRebate").on("click",function(e){
    	   e.preventDefault();
    	   var removeRebateURL = app.urls.removeRebate;
    	   
    	   jQuery.ajax({
               url: removeRebateURL,
               contentType:"application/json"
           }).success(function(response){
        	   if(response.success){
        		 window.location.href = app.urls.cartShow;
        	   } else {
        		   jQuery("#loyaltyRemovalError").html(response.message);  
        	   }
           });
       });
       
     
     //Forget Password submit button disable on success
     jQuery("#PasswordResetForm .button-grey-large").live("click", function(){
     	  
     	   if(jQuery("#dialog-container .error-form").length>0 || jQuery("#PasswordResetForm .error-message").length>0){
     		   jQuery("#PasswordResetForm .button-grey-large").attr("disabled","disabled");
     		 }else{
     		   jQuery("#PasswordResetForm .button-grey-large").removeAttr("disabled","disabled");
     		 }
     });
     
     
       if(jQuery(".returning-customers .error-form").length){
		   jQuery(".col-1, .col-2, .account-nav-asset").addClass("loginerror");
		   jQuery(".login_help_asset, .login-box").addClass("loginerror");
		   jQuery(".login-order-track").removeClass("loginerror");
		   jQuery(".pt_account_login .primary-content .col-1 .login-box-content ul.createAccountText").css("margin-bottom","118px");
	   }
      
       checkoutMsgfunction();
       
     
       
       
});



function checkoutMsgfunction(){
    if(jQuery('.checkoutMsg .html-slot-container').children().length > 0){
	       var cheoutslotheight = jQuery('.checkoutMsg .html-slot-container').height();
	       jQuery('.checkoutMsg').height(cheoutslotheight);
	       jQuery('.leftcheckoutcontainer').css('margin-top',33+cheoutslotheight+'px')
	       if(jQuery('#wrapper').width()> 650){
	            jQuery('.rightcheckoutcontainer').css('margin-top',parseInt(jQuery('.rightcheckoutcontainer').css('margin-top'))+13+cheoutslotheight+'px')
	       }
	       jQuery('.checkoutMsg').css('visibility','visible');
    }
    
}