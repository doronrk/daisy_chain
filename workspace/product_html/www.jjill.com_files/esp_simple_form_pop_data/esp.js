function espPopUp(_strURL, _bScrollable, _bResizable, _nHeight, _nWidth) {  // Configures new window to appear (_bMenu, _bScrollable & _bResizable must = yes or no)
    _strURL = _strURL || "../Error.aspx"
    _bScrollable = _bScrollable || "yes"
    _bResizable = _bResizable || "yes"
    _nHeight = _nHeight || 240
    _nWidth = _nWidth || 320
    window.open(_strURL, '_blank', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=' + _bScrollable + ',resizable=' + _bResizable + ',height=' + _nHeight + ', width=' + _nWidth);
};

var emailRegEx = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-\+])+\.)+([a-zA-Z0-9]{2,4})+$/;

function espReDirectWithEmail(_strURL, _Email) { // Redirects to new page, but appends '?e=EMAIL' to end 
    _strURL = _strURL || "../Error.aspx";
    if (_Email.value || _Email.value.match(emailRegEx)) {
        if (-1 === _strURL.indexOf("?")) {
            _strURL = _strURL.concat("?");
        }
        if (-1 === _strURL.indexOf("&e=")) {
            _strURL = _strURL.concat("&e=");
            _strURL = _strURL.concat(_Email.value);
        }
    }
    espReDirect(_strURL);
};

function espReDirect(_strURL) {  // Redirects to new page
    _strURL = _strURL || "../Error.aspx"
    window.location = _strURL;
};

function espReset(_input) {
    if (($(_input).hasClass('inputerror')) || ($(_input).hasClass('inputstart'))) {
        $(_input).attr('class', 'input').val('');
    }
};

function espToggleText(_output) {
var id = "[id$='_" + _output + "']"
    if ($(id).is(":disabled")) {
        $(id).removeAttr('disabled').val(''); ;
    }
    else {
        $(id).attr('disabled', 'disabled').val(''); ;
    }
};

function espToggleButton(_output, _on) {
    var id = "[id$='_" + _output + "']"
    if (_on == true) {
        $(id).removeAttr('disabled').val('');
        $(id).removeAttr('class').val('');
    }
    else {
        $(id).attr('disabled', 'disabled').val('');
        $(id).attr('class', 'disabledButton').val('');
    }
};

//function pageLoad(sender, args) {
//    $("[id$='_datepicker']").datepicker();                             // need to call 1st to instantiate object
//    $("[id$='_datepicker']").datepicker("option", "minDate", "-100y"); // set MAX date to 100 years   
//    $("[id$='_datepicker']").datepicker("option", "maxDate", "-18y");  // set MIN date to 18 years old
//    $("[id$='_datepicker']").datepicker("option", "showOn", "focus");
//    $("[id$='_datepicker']").datepicker("option", "changeMonth", "true");
//    $("[id$='_datepicker']").datepicker("option", "changeYear", "true");
//    // Disabled as the selectOtherMonths option does not seem to be working - RK 01/08/13
//    //$("[id$='_datepicker']").datepicker("option", "showOtherMonths", "true");
//    //$("[id$='_datepicker']").datepicker("option", "selectOtherMonths", "true");

//};

//$(document).ready(function () {
//    $("[id$='_datepicker']").datepicker();                             // need to call 1st to instantiate object
//    $("[id$='_datepicker']").datepicker("option", "minDate", "-100y"); // set MAX date to 100 years   
//    $("[id$='_datepicker']").datepicker("option", "maxDate", "-18y");  // set MIN date to 18 years old
//    $("[id$='_datepicker']").datepicker("option", "showOn", "focus");
//    $("[id$='_datepicker']").datepicker("option", "changeMonth", "true");
//    $("[id$='_datepicker']").datepicker("option", "changeYear", "true");
//});

function jvOnClientClick(_input, _output) {
    var idIN = "[id$='_" + _input + "']"
    var idOUT = "#" + _output
    if ($(idIN).is(":checked")) {
        $(idOUT).removeClass('UnSubMessageNoDisplay').addClass('UnSubMessageDisplay')
        return false;
    }
    else {
        $(idOUT).removeClass('UnSubMessageDisplay').addClass('UnSubMessageNoDisplay')
        return true;
    }
};
