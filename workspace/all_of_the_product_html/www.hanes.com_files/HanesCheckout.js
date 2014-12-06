//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2011, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

dojo.require("dojox.xml.DomParser");

if (typeof (HanesCheckoutJS) == "undefined" || HanesCheckoutJS == null || !HanesCheckoutJS) {

  HanesCheckoutJS = {

    /**
     * Setting the request properties on the basis of the PayPal checkout
     * type selected.
     *
     * @param form
     * @param {string}paypalButtonId
     *
     */
    setPayPalCheckoutType : function(form, paypalCheckoutType) {
      var paypalType = paypalCheckoutType;
      if (paypalType == 'PayPalExpressCheckout') {
        form.checkoutType.value = '';
        form.PayPalURLPayNow.value = '';
        form.PayPalURL.value = "OrderPrepare?URL=OrderDisplay?quantity*=&orderItemId*=&remerge=*&merge=*n&check=*n&allocate=*&backorder=*&reverse"
      } else if (paypalType == 'PayPalMarkCheckout') {
        form.PayPalURL.value = "OrderPrepare?URL=OrderDisplay?quantity*=&orderItemId*=&remerge=*&merge=*n&check=*n&allocate=*&backorder=*&reverse"
        form.checkoutType.value = '';
        form.PayPalURLPayNow.value = '';
        form.ADDROVERRIDE.value = 0;
      }
      HanesCheckoutJS.payPalCheckout(form);
    },

    /**
     *
     * @param form
     *
     */
    payPalCheckout : function(form) {
      form.checkoutMethod.value = "PayPal";
      form.submit();
    },

    submitForm : function(form) {
      form.account.value = form.payerId.value;
      form.policyId.value = form.policyIdPaypal.value;
      form.action = 'OrderProcess';
      form.submit();
    },

    validateMonthYear : function(yourMonth, yourYear) {

      // Variables for the current date, year and month
      var now = new Date();
      var currentMonth = now.getUTCMonth() + 1;
      var currentYear = now.getUTCFullYear();

      if (yourYear < currentYear || (yourYear == currentYear && yourMonth < currentMonth)) {
        return false;
      } else {
        return true;
      }
    },

    updateShippingMode:function(form)
    {
      var shipModeId = form.shipModeId.value;
      if(shipModeId == -1)
      {
        this.clearErrorOrderReviewForm();
        // alert("Please select a shipping method.");
        this.showOrderReviewError('shipModeId', 'red', 'shipModeIdMessage', 'Please select a shipping method.');
        form.shipModeId.focus();
        return false;
      }
      form.action = 'OrderItemUpdate?shipModeId='+ shipModeId;
      form.submit();
    },

    hideBillingAddress:function()
    {
        document.getElementById("billingAddressDiv").style.display="none";
    },

    showBillingAddress:function()
    {
        document.getElementById("billingAddressDiv").style.display="block";
    },

    showPayPalFields:function(paypalOrder)
    {

      this.clearErrorOrderReviewForm()
      this.hideCCFields();
      document.getElementById("paypalDiv2_d1").style.display="block";
      document.getElementById("paypalDiv2_d2").style.display="block";

      if(paypalOrder != true){
        document.getElementById("orderSubmitButton1").style.display="none";
        document.getElementById("orderSubmitButton2").style.display="none";
      }

      if(paypalOrder == true){
          this.hideCCButtons();
      }

    },
    showCCFields:function()
    {
      this.clearErrorOrderReviewForm()
      document.getElementById("creditcardDiv4").style.display="block";
      document.getElementById("paypalDiv2_d1").style.display="none";
      document.getElementById("paypalDiv2_d2").style.display="none";
      document.getElementById("orderSubmitButton1").style.display="block";
      document.getElementById("orderSubmitButton2").style.display="block";
    },
    hideCCFields:function()
    {
      this.clearErrorOrderReviewForm()
      document.getElementById("creditcardDiv4").style.display="none";
    },

    hideCCButtons:function()
    {
      document.getElementById("creditcardDiv2").style.display="none";
      document.getElementById("paypalDiv2_f").style.display="block";
    },
    showCCButtons:function()
    {
      document.getElementById("creditcardDiv2").style.display="block";
      document.getElementById("paypalDiv2_f").style.display="none";
    },

    clearErrorOrderReviewForm:function ()
    {
        this.showOrderReviewError('shipModeId', '', 'shipModeIdMessage', '');
        this.showOrderReviewError('paymentMethod', '', 'orderReviewMessage', '');
        this.showOrderReviewError('account', '', 'orderReviewMessage', '');
        this.showOrderReviewError('expire_month', '', 'orderReviewMessage', '');
        this.showOrderReviewError('expire_year', '', 'orderReviewMessage', '');
        this.showOrderReviewError('cc_cvc', '', 'orderReviewMessage', '');
    },

    submitOrderForm:function(form, callingButton)
    {
      var setfocus = true;

      this.clearErrorOrderReviewForm();

      var allIsGood = true;

      if (callingButton == 'FinalizeOrder')
      {

        var shipModeId = form.shipModeId.value;

            var cardNum = '';
            var cvn = '';

            var polId = '';

            var myString='';

            var paySelected = false;

            for (i=0; i<form.paymentMethod.length; i++)
            {
              if (form.paymentMethod[i].checked==true)
              {
                myString = form.paymentMethod[i].value
                paySelected = true;
              }
            }

            var mySplitResult = myString.split(",");

            var polId = mySplitResult[0];
            var polName = mySplitResult[1];

            form.policyId.value = polId;
            form.cc_brand.value = polName;

            if (form.piAmount.value != null && form.piAmount.value < 0)
            {
                document.getElementById('orderReviewMessage').innerHTML = 'There is an over payment on the order, please remove the gift card(s) and apply again.';
                allIsGood = false;
                addPaymentCheckoutErrorInPageTag('There is an over payment on the order, please remove the gift card(s) and apply again.');
            }else if(shipModeId == -1){
              this.showOrderReviewError('shipModeId', 'red', 'shipModeIdMessage', 'Please select a shipping method.');
              addPaymentCheckoutErrorInPageTag('Please select a shipping method.');
                if (setfocus) {
                    form.shipModeId.focus();
                    setfocus = false;
                }
                allIsGood = false;
        }else if(paySelected == false){
          this.showOrderReviewError('paymentMethod', 'red', 'orderReviewMessage', 'Please select a payment method.');
          addPaymentCheckoutErrorInPageTag('Please select a payment method.');
            allIsGood = false;
        }else if(form.policyId.value != form.policyIdPaypal.value){
                cardNum = form.account.value;
                cvn = form.cc_cvc.value;

                if(cardNum == ""){
                  this.showOrderReviewError('account', 'red', 'orderReviewMessage', 'Credit card number is a required field.');
                  addPaymentCheckoutErrorInPageTag('Credit card number is a required field.');
                    if (setfocus) {
                        form.account.focus();
                        setfocus = false;
                    }
                    // alert("Credit card number is a required field.");
                    allIsGood = false;
                }else if(cardNum.length < 12){
                  this.showOrderReviewError('account', 'red', 'orderReviewMessage', 'Please enter a valid credit card number.');
                  addPaymentCheckoutErrorInPageTag('Please enter a valid credit card number.');
                    if (setfocus) {
                        form.account.focus();
                        setfocus = false;
                    }
                    // alert("Please enter a valid credit card number.");
                    allIsGood = false;
                }else if(!HanesCheckoutJS.validateMonthYear(form.expire_month.value, form.expire_year.value)){
                  this.showOrderReviewError('expire_month', 'red', 'orderReviewMessage', 'The credit card expiration date is invalid. Please try again.');
                    this.showOrderReviewError('expire_year', 'red', 'orderReviewMessage', 'The credit card expiration date is invalid. Please try again.');
                    addPaymentCheckoutErrorInPageTag('The credit card expiration date is invalid. Please try again.');
                    if (setfocus) {
                        form.expire_month.focus();
                        setfocus = false;
                    }
                    // alert("The credit card expiration date is invalid. Please try again.");
                    allIsGood = false;
                }else if(cvn == ""){
                     this.showOrderReviewError('cc_cvc', 'red', 'orderReviewMessage', 'Credit card CVN is a required field.');
                     addPaymentCheckoutErrorInPageTag('Credit card CVN is a required field.');
                    if (setfocus) {
                        form.cc_cvc.focus();
                        setfocus = false;
                    }
                    // alert("Credit card CVN is a required field.");
                    allIsGood = false;
                }else if(cvn.length < 3){
                    this.showOrderReviewError('cc_cvc', 'red', 'orderReviewMessage', 'Please enter a valid CVN.');
                    addPaymentCheckoutErrorInPageTag('Please enter a valid CVN.');
                    if (setfocus) {
                        form.cc_cvc.focus();
                        setfocus = false;
                    }
                    // alert("Please enter a valid CVN.");
                    allIsGood = false;
                }else{
                    if(!CCPrefixCheck(form.cc_brand.value, form.account.value)){
                        this.showOrderReviewError('paymentMethod', 'red', 'orderReviewMessage', 'Please enter a valid credit card number.');
                        this.showOrderReviewError('account', 'red', 'orderReviewMessage', 'Please enter a valid credit card number.');
                        addPaymentCheckoutErrorInPageTag('Please enter a valid credit card number.');
                        if (setfocus) {
                            form.account.focus();
                            setfocus = false;
                        }
                        // alert("Please enter a valid credit card number.");
                        allIsGood = false;
                    }else if(!Mod10(form.account.value)){
                        this.showOrderReviewError('account', 'red', 'orderReviewMessage', 'Please enter a valid credit card number.');
                        addPaymentCheckoutErrorInPageTag('Please enter a valid credit card number.');
                        if (setfocus) {
                            form.account.focus();
                            setfocus = false;
                        }
                        // alert("Please enter a valid credit card number.");
                        allIsGood = false;
                    }
                }
            }else if(form.policyId.value == form.policyIdPaypal.value){

                if(form.payerId.value == '' || form.token.value == '' || form.payPalRequestId.value == '' || form.payPalRequestToken.value == ''){
                    this.showOrderReviewError('paymentMethod', 'red', 'orderReviewMessage', 'Please log into PayPal before completing order.');
                    addPaymentCheckoutErrorInPageTag('Please log into PayPal before completing order.');
                    allIsGood = false;
                }else{
                   form.checkoutType.value = 'PayPal';
           form.account.value = '';
           form.cc_brand.value = '';
           form.policyId.value = form.policyIdPaypal.value;
        }


      }

      form.action = 'OrderProcess';
      }


      if(allIsGood){
        disableButton("orderSubmitButton1");
        disableButton("orderSubmitButton2");
        form.submit();
      }

  },

  showOrderReviewError:function(inputid, color, errorid, error) {
    if(document.getElementById(inputid) != null){
          document.getElementById(inputid).style.borderColor = color;
          document.getElementById(errorid).innerHTML = error;
      }
  },

  updateTotal:function(linkId)
  {
    disableLink(linkId);
    document.ShopCartForm.URL.value = 'OrderCalculate?updatePrices=1&calculationUsageId=-1&orderItemId*=&quantity*=&URL=OrderItemDisplay';
    document.ShopCartForm.submit();
  },

  quickCheckout:function(form)
  {
    SubmitCart(form);
  },

  submitCart:function(form)
  {
    busy = true;

    disableButton('checkoutBtn1');
    disableButton('checkoutBtn2');

    form.submit();
  }

  }
}