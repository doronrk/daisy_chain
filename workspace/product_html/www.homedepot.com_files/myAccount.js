//SETTING UP OUR POPUP
var qvFlagCheck = 1,
  popupFromPage,

  iframeURL,
  loadFancyPopup;

//Loading Create New list popup
(function($){
loadFancyPopup = function (data, fromPage, opCode) {
  parent.popupFromPage = fromPage;
  var checkLogin = data.indexOf('popupSignIn'),
    overlayContainer, appendContent = data,
    popupCtn = data,
    tempURLValue, BgOpacity, fixWidth = 380,
    fixHeight = 377,
    $iframe, $saveProject, onComplete, projectGuide;
  if (fromPage === "quickView") {
    overlayContainer = $('.SSKU_Overlay_Container').html();
    appendContent = '<div id="addToListResponse" class="addToListRemove">' + '<input type="hidden" id="quickViewRef" value="quickViewPage" />' + popupCtn + '<div style="display:none;">' + overlayContainer + '</div></div>';
    tempURLValue = $('iframe#fancybox-frame', top.document).attr('src');
    if (tempURLValue && tempURLValue.length > 0) {
      parent.iframeURL = $('iframe#fancybox-frame', top.document).attr('src');
      iframeURL = $('iframe#fancybox-frame', top.document).attr('src');
    }
  }
  if (fromPage === "shoppingCart" && data.indexOf('popupSignIn') < 0) {
    BgOpacity = 0;
  } else {
    BgOpacity = 0.7;
  }



  if (fromPage === "productDetail") {
   // fixHeight = 257;
    //for ie7 & ie8 set separate height to display 
    if (browserCompare() === "microsoft internet explorer7.0") {
      fixHeight = 207;
    } else if (browserCompare() === "microsoft internet explorer8.0") {
      fixHeight = 217;

    }
  }
  if (data.indexOf('popupSignIn') >= 0) {
    fixHeight = 330;
    fixWidth = 460;
  }
  if (data.indexOf('popupCreateListFromCart') >= 0) {
    fixHeight = 158;
    fixWidth = 380;
  }
  if (data.indexOf('popupAddToYour') >= 0) {
    fixHeight = 177;
    fixWidth = 394;
  }
  if (data.indexOf('CreateAccount') >= 0) {
    fixHeight = 565;
  }
  //setting up the height and width of success modal
  if (data.indexOf('popupAddToListFromList') >= 0) {
    fixHeight = 'auto';
    fixWidth = 454;
  }
  if (fromPage === "shoppingCart" && data.indexOf('popupCreateNewList') >= 0 && (opCode === 2 || opCode === 1)) {
    $('body').append("<div id='tempResponseData' style='display:none;'>" + data + "</div>");
    displayInlineConfirmation();
  } else {

    if ($.browser.msie && parseInt(document.documentMode, 10) === 9) {
      $iframe = parent.$;
    }
    //This will close the modal after 3 sec and refresh the page.
    if (fromPage === "mylistdetails") {
      onComplete = function () {
        setTimeout(function () {
          $.fancybox.close();
          window.setTimeout(
            function () {
              location.reload(true);
            }, 1000);
        }, 3000);

      };
    } else {
      onComplete = function () {
        /* To check whether the popup is for Save Project */
        $saveProject = $("a.save_myproject");
        projectGuide = '';
        if ($saveProject.size() > 0) {
          projectGuide = $saveProject.attr('href').split('&pn=')[1].split('&')[0];
          $('<input />').attr({
            'type': 'hidden',
            'name': 'secure',
            'value': 'yes'
          }).prependTo('#popupSignIn #userLogin');

          $('<input />').attr({
            'type': 'hidden',
            'name': 'pn',
            'value': projectGuide
          }).prependTo('#popupSignIn #userLogin');

          $('<input />').attr({
            'type': 'hidden',
            'name': 'action',
            'value': 'Add'
          }).prependTo('#popupSignIn #userLogin');

          $('<input />').attr({
            'type': 'hidden',
            'name': 'ddkey',
            'value': 'https:THDUserProjListUpdate'
          }).prependTo('#popupSignIn #userLogin');
        }
      };
    }
    parent.jQuery.fancybox({
      'content': appendContent,
      'scrolling': 'no',
      'titleShow': false,
      'hideOnOverlayClick': false,
      'width': fixWidth,
      'autoDimensions': false,
      'height': fixHeight,
      'padding': 0,
      'overlayOpacity': BgOpacity,
      'overlayColor': '#333',
      'autoScale': false,
      'transitionIn': 'none',
      'transitionOut': 'none',
      'onComplete': onComplete














    });
  }

};
})(jQuery);

function browserCompare() {
  var userAgent = navigator.userAgent.toLowerCase(),
    userBrowserName = navigator.appName.toLowerCase();
  // Figure out what browser is being used
  $.browser = {
    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
    safari: /webkit/.test(userAgent),
    opera: /opera/.test(userAgent),
    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
    name: userBrowserName
  };
  return $.browser.name + $.browser.version;
}

function loadPopup(a) {

  var PopupWidth, PopupHeight, $popupContent, currObjId, objParamPopup = {}, $clearContentPoppup, $deleteContentPoppup,$multiDeleteContentPoppup, $sharableListsContentPoppup,$blindsContentPoppup;

  currObjId = '#' + a;
  objParamPopup = {
    'href': currObjId
  };

  PopupWidth = 440;
  PopupHeight = 149;

  if (a === "popupClearList") {
    $clearContentPoppup = $(currObjId).clone().wrap('<div>').parent().html();
    objParamPopup = {
      'content': $clearContentPoppup
    };
  }

  if (a === "popupDeleteList") {
    PopupHeight = 197;
    PopupWidth = 380;
    $deleteContentPoppup = $(currObjId).clone().wrap('<div>').parent().html();
    objParamPopup = {
      'content': $deleteContentPoppup
    };
  }

  if (a === "popupEmailList") {
    PopupHeight = 574;
    $(currObjId).append('<div style="clear:both"></div>');
    $popupContent = $('<div>').append($(currObjId).clone()).html();
    objParamPopup = {
      'content': $popupContent,
      'href': '',
      'height': PopupHeight
    };

  }

  if (a === "popupEmailConfirmation") {
    $popupContent = $('<div>').append($(currObjId).clone()).html();
    objParamPopup = {
      'content': $popupContent,
      'href': ''
    };

  }


  if (a === "popupCreateNewList") {
    PopupWidth = 380;
    PopupHeight = 197;
    $popupContent = $('<div>').append($(currObjId).clone()).html();
    objParamPopup = {
      'content': $popupContent,
      'href': ''
    };
  }

  if (a === "popupListToCart") {
    PopupWidth = 557;
    PopupHeight = 485;
  }

  if (a === "popupListToCartSuccess") {
    PopupWidth = 430;
    PopupHeight = 146;
  }
  if (a === "popupNonPartialLists") {
	  PopupWidth = 590;
	  PopupHeight = 385;
  }
  if (a === "ajaxResponseDiv") {
    PopupWidth = 890;
    PopupHeight = 595;
  }

 if (a === "popupMultiDelete") {
	  PopupWidth = 590;
	  PopupHeight = 385;
    $multiDeleteContentPoppup = $(currObjId).clone().wrap('<div>').parent().html();
    objParamPopup = {
      'content': $multiDeleteContentPoppup
    };
  }
  if (a === "popupBlindsContent") {
	  PopupWidth = 778;
	  PopupHeight = 385;
      $blindsContentPoppup = $(currObjId).clone().wrap('<div>').parent().html();
    objParamPopup = {
      'content': $blindsContentPoppup
    };
  }
  if (a === "sharableLists") {
	  PopupWidth = 520;
	  PopupHeight = 385;
    $sharableListsContentPoppup = $(currObjId).clone().wrap('<div>').parent().html();
    objParamPopup = {
      'content': $sharableListsContentPoppup
    };
  }

  $.fancybox({
    'scrolling': 'no',
    'titleShow': false,
    'showCloseButton': true,
    'centerOnScroll': true,
    'hideOnOverlayClick': false,
    'width': PopupWidth,
    'autoDimensions': false,
    'height': PopupHeight,
    'padding': 0,
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'onComplete': function (a) {
      $('#popupEmailList').append('<div style="clear:both"></div>');
      $('#popupAddToYour').append('<div style="clear:both"></div>');
      $('#fancybox-content').css({
        'height': 'auto'
      });


      $('#fancybox-content').children('div:first').css({
        'height': 'auto'
      });




    }

  }, objParamPopup);
}

//CONTROLLING EVENTS IN jQuery
$(document).ready(function () {

  //On press Enter key submitting the popup sign in - start
  $("#popupSignIn #userLogin input#email_id, #popupSignIn #userLogin input#password").on('keypress', function (e) {
    if (e.keyCode === 13) {
      $("#popupSignIn #signIn").trigger('click');
    }

  });


  /* Sign in modal name spacing starts here */
  THD.MyAccount.signInModalValidation = function () {
    var $userSignMdl,
      $passSignMdl,
      validEmail,
      isUserNameEmpty,
      isPasswordEmpty,
      signInModalEmptyField,
      signInModalErrorMsg,
      showErrorMsg,
      errString,
      errMsgDivBlock,
      updatedURL = $('#popupSignIn #URL').val().split('#'),
      updatedURLString = updatedURL[0],
      iframeURL = '';

    //reading username and password from sign in page
    if (updatedURL.length > 1 && updatedURL[1].indexOf('&') >= 0) {
    	updatedURLString += updatedURL[1].substring(updatedURL[1].indexOf('&'));
        $('#popupSignIn #URL').val(updatedURLString);
    }
    
    $userSignMdl = $('#popupSignIn #email_id').val();
    $passSignMdl = $('#popupSignIn #password').val();

    /**
     *@Function:THD.MyAccount.signInModalEmptyField
     *@Description: THD.MyAccount.signInModalEmptyField will validate the empty value of the fileds. If fileds are empty it returns true else returns false
     *@Params: fieldVal (Input field Value)
     *@Output: return true or false
     *@TestInputs:(''):true:('username'):false
     **/
    signInModalEmptyField = function (fieldVal) {
      return (fieldVal === "") ? true : false;
    };

    signInModalErrorMsg = function (errCaseVal) {
      switch (errCaseVal) {
      case 'bothEmpty':
        errString = 'The following field(s) are required: Email Address, Password.';
        showErrorMsg(errString);
        break;
      case 'userNameError':
        errString = 'Email format is invalid. Please enter a valid email address.';
        showErrorMsg(errString);
        break;
      case 'passwordEmpty':
        errString = 'The following field(s) are required: Password.';
        showErrorMsg(errString);
        break;
      case 'userNameEmpty':
        errString = 'The following field(s) are required: Email Address.';
        showErrorMsg(errString);
        break;
      default:
        console.log('default');
        break;
      }
    };

    showErrorMsg = function (errString) {
      errMsgDivBlock = '<i class="icon-error"></i>' + errString;
      $(".signInError").css({
        display: 'block',
        color: '#ff0800'
      });
      $(".signInError").html(errMsgDivBlock);
    };

    isUserNameEmpty = signInModalEmptyField($userSignMdl);
    validEmail = thdValidate.testEmail($userSignMdl);
    isPasswordEmpty = signInModalEmptyField($passSignMdl);


    //validation for empty , invalid email fields and populating error messages
    if (isUserNameEmpty && isPasswordEmpty) {
      signInModalErrorMsg('bothEmpty');
    } else if (isUserNameEmpty) {
      signInModalErrorMsg('userNameEmpty');
    } else if (!validEmail) {
      signInModalErrorMsg('userNameError');
    } else if (isPasswordEmpty) {
      signInModalErrorMsg('passwordEmpty');
    } else {
      $(".signInError").css({
        display: 'none'
      });
      $("#userLogin").attr('action', THDLogonCmd.replace('LogonForm', 'THDLogon'));
      $('input[name="iFrame"]').val(iframeURL);
      $("#userLogin").submit();
    }
  };
  $("body").on("click", "#signIn", function (e) {
    e.preventDefault();
    THD.MyAccount.signInModalValidation();
  });
  /* Sign in modal name spacing ends here */




  $(".ClosePopup, .popupAddListClose, #fancybox-close").on("mousedown click", function () { // quick view popup close button - add to list, create list, persistent logon,
    var iframeURL,
	addToListPopup=$(this).parent().find('.cartPopup, #popupAddToYour').length;
    if ((popupFromPage === "quickView" || qv_fromPage === "quickview")) {
      if (iframeURL === undefined && ($('#iFrame').val() != "" || $('#iFrame').val() != null)) {
        iframeURL = $('#iFrame').val();
        $('#iFrame').val('');
      }
      if (iframeURL === '' || iframeURL === null || iframeURL === undefined) {
        iframeURL = parent.iframeURL;
      }
    }
    if ((popupFromPage === "quickView" || qv_fromPage === "quickview") && iframeURL !== undefined) {
	
      parent.jQuery.fancybox({
        'width': 928,
        'height': 510,
        'padding': 0,
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'scrolling': 'no',
        'showCloseButton': true,
        'overlayOpacity': 0,
        'hideOnOverlayClick': true,
        'type': 'iframe',
        'href': iframeURL
      });
      iframeURL = "";
      popupFromPage = "";
    } else {
      if ($('.createListBtn').css('opacity') === "1") {
        $(".createListBtn").css({
          'opacity': '0.7',
          'cursor': 'auto'
        });
      }
      $.fancybox.close();
	  //MYAC-3054 
	   if(addToListPopup > 0){ // Checking for Addtolist popup
      prowebRefreshOnClose();
	  }
	
    }
    $('#clickAddToListButton').val("true");
    qv_fromPage = "";
  });

  //close popup fancybox when clicked on Continue Shopping button
  $(".continueShoppingBtn").live('click', function () {
    $.fancybox.close();
	prowebRefreshOnClose();   

  });
  prowebRefreshOnClose = function () {

    //QC Defect : 31095
    var usercookie = readCookie('THD_PERSIST'),
      isLoggedOn = readCookie("THD_USERSTATUS");
    if (usercookie.indexOf("C40=P") > 0 && isLoggedOn === "" || isLoggedOn === undefined) {
      window.location.reload();
    }
  }


  // PIP page create list functionality
  $("#createList_PIP").on('click', function () {
    var Lname = $("#add_new_list").attr('value'),
      lists,
      splChar = /[^a-z0-9\s\Q!@#$%^&*()-_+=,.?:;"'\\E]/g,
      Lcount = Lname.length;

    splChar = Lname.match(splChar);

    $(".toAdd").each(function () {
      var list = $(this).html();
      if (list === Lname) {
        lists = list;
      }
    });





    if ((Lname != "or create a new list...") && (Lname != "")) {
      if (Lcount > 30) {
        $(".error_msg").css('display', 'none');
        $(".exceedLimit").css('display', 'block');
        $("#add_new_list").css('border', '1px solid red');
      } else if (lists === Lname) {
        $(".error_msg").css('display', 'none');
        $(".alreadyExists").css('display', 'block');
        $("#add_new_list").css('border', '1px solid red');
      } else if (splChar != null) {
        $(".error_msg").css('display', 'none');
        $(".otherChar").css('display', 'block');
        $("#add_new_list").css('border', '1px solid red');
      } else {
        loadPopup('popupCreateNewList');
        $(".error_msg").css('display', 'none');
        $("#popupCreateNewList div.toShow").html(Lname);
      }
    }
  });

  //list landing page - create list gray button onclick model window
  $("#createList_gray").on('click', function () {
    $(".listNamePopUpError").css('display', 'none');
    $("#landing_add1").css('border', '1px solid #cccccc');
    loadPopup('popupCreateNewList');
  });

  //Delete whole list from item landing page
  $(".deleteAll").on('click', function () {
    var ifList = $(this).attr('class');
    if (ifList != "itemDelete deleteListBtn") {
      loadPopup('popupDeleteList');
    }

  });

  $(".clearBtn, #clearTxt").on('click', function () {
    loadPopup('popupClearList');
  });
  //Add list to cart from item landing page
  $(document).on("click", ".addListToCart", function (e) {
		addListToCart();
  });

  //Email list  from item landing page

  $(".emailList").on('click', function () {
    $("#userEmail, #recipientsEmails, #userName").css('border', '1px solid #cccccc');
    var defaultTextAreaText = "Here is my wish list of items from Home Depot for my latest project. If you could take a quick look, I'd really appreciate it.Thanks.";
  $("#emailFormat").val('HTML').prop('checked', 'true');
    $("textarea[name='limitedtextarea']").val(defaultTextAreaText);
    $(".nameExistError3").css('display', 'none');
    loadPopup('popupEmailList');

  });



  $("body").on('click','#send_email', function () {
    var $selectedDOM = $(this).closest('#popupEmailList'), // scoping to  fix QC - 30867
      uname = $("#userName", $selectedDOM).val(),
      uemail = $("#userEmail", $selectedDOM).val(),
      recipient = $("#recipientsEmails", $selectedDOM).val();
    $("#userEmail, #recipientsEmails, #userName", $selectedDOM).css('border', '1px solid #cccccc');
    if ((uname === "") || (uemail === "") || (recipient === "")) {
      if ((uname === "")) {
        $("#userName", $selectedDOM).css('border', '1px solid red');
        $(".nameExistError3", $selectedDOM).css('display', 'block');
        $(".nameExistError3 div.ErrorWithoutIcon", $selectedDOM).html("The Your fields cannot be blank. Type your name or e-mail in the field and try again.");
      }
      if ((uemail === "")) {
        $("#userEmail", $selectedDOM).css('border', '1px solid red');
        $(".nameExistError3", $selectedDOM).css('display', 'block');
        $(".nameExistError3 div.ErrorWithoutIcon", $selectedDOM).html("The Your fields cannot be blank. Type your name or e-mail in the field and try again.");
      }
      if ((recipient === "")) {
        $("#recipientsEmails", $selectedDOM).css('border', '1px solid red');

        $(".nameExistError3", $selectedDOM).css('display', 'block');
        $(".nameExistError3 div.ErrorWithoutIcon", $selectedDOM).html('The "To" email address field is invalid. Type the email address of the person to whom you are sending your list and try again.'); /*Defect #35151 changes by Guru*/
      }

    } else {
      $(".nameExistError3", $selectedDOM).css('display', 'none');
      var atpos = validateEmail(uemail),
        atpos1 = validateMultipleEmailsCommaSeparated(recipient);

      if (!atpos1 && !atpos) {
        $(".nameExistError3", $selectedDOM).css('display', 'block');
        $("#recipientsEmails, #userEmail", $selectedDOM).css('border', '1px solid red');
        $(".nameExistError3 div.ErrorWithoutIcon", $selectedDOM).html("The To e-mail address field is invalid. Type the e-mail address of the person to whom you are sending your list and try again");
      } else if (!atpos || !atpos1) {
        if (!atpos1) {
          $(".nameExistError3", $selectedDOM).css('display', 'block');
          $("#recipientsEmails", $selectedDOM).css('border', '1px solid red');
          $(".nameExistError3 div.ErrorWithoutIcon", $selectedDOM).html("The To e-mail address field is invalid. Type the e-mail address of the person to whom you are sending your list and try again");

        } else {
          $(".nameExistError3", $selectedDOM).css('display', 'block');
          $("#userEmail", $selectedDOM).css('border', '1px solid red');
          $(".nameExistError3 div.ErrorWithoutIcon", $selectedDOM).html("The To e-mail address field is invalid. Type the e-mail address of the person to whom you are sending your list and try again");
        }
      } else {
        loadPopup('popupEmailConfirmation');
      }
    }
  });

  function validateEmail(emailValue) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (regex.test($.trim(emailValue))) ? true : false;
  }

  function validateMultipleEmailsCommaSeparated(emailValues) {
    var result = emailValues.split(","),
      i = 0;
    for (i = 0; i < result.length; i++) {
      if (!validateEmail(result[i])) {
        return false;
      }

    }
    return true;
  }

  $("a.save_myproject").on('click', function (event) {
    event.preventDefault();
    var RegisteredURL = $(this).attr("href"),
      nonRegisteredTHDMyProjectsURL = THDLogonCmd + "URL=THDUserProjListUpdate&";
    goToLinkFromJS(nonRegisteredTHDMyProjectsURL, RegisteredURL);
  });


});
