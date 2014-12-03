//<![CDATA[
/* Replacement calls. Please see documentation for more information. */

//common functions

function clearIfValue(varObj, value) {
    if (varObj.value == value) {
        varObj.value = '';
    }
}

function replaceEmpty(varObj, value) {
    if (trimString(varObj.value) == '') {
        varObj.value = value;
    }
}

function trimString(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

function isValidZip(zip) {
    return zip.match(/(^\d{5}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[a-zA-Z]{1} *\d{1}[a-zA-Z]{1}\d{1}$)/) != null;
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset);
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    //	alert('getCookie name='+name+'; value='+setStr);
    return (setStr);
}

function set_cookie(name, value, expires) {
    if (!expires) {
        expires = new Date();
    }
    //    alert('set_cookie '+name + "=" + escape(value) + "; expires=" + expires.toGMTString() +  "; path=/")
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/";
}

function setCookie(c_name, value, expireMinutes) {
    var now = new Date();
    var minutes = now.getMinutes();
    minutes += expireMinutes;
    now.setMinutes(minutes);

    var body = c_name + '=' + escape(value) + ';path=/;expires=' + now.toGMTString();

    //if (window.COOKIE_DOMAIN != undefined) {
    body += ';domain=' + window.COOKIE_DOMAIN;
    ////body += ';domain=spencersmvc.kraftek.net';
    ////body += + ';domain=localhost';
    //}
    document.cookie = body;
}


//search store function

function redirectOnGo(btn) {
    var zip = btn.parentNode.children[0].value;
    zip = trimString(zip);
    if (zip == null || zip == '' || zip == 'Zip/Postal Code') {
        //document.location.href = '/storelocation.aspx';
        document.location.href = '/store-locator/';
        return;
    }
    if (isValidZip(zip)) {
        //document.location.href = '/storelocation.aspx?zipPostalCode=' + zip.replace(' ', '');
        document.location.href = '/store-locator/';
    }
    else
        document.location.href = 'http://halloween-costumes.spirithalloween.com/search#view=grid&w=' + zip;
}

//search functions

function ValidateEmptyTb(tb_id) {
    var tb = document.getElementById(tb_id);
    if (tb.value == null || tb.value == '') {
        alert('Search text box is empty!');
        return false;
    }
    return true;
}

function redirect() {

    var tb = document.getElementById('<%=_tbx_search.ClientID %>');
    if (ValidateEmptyTb('<%=_tbx_search.ClientID %>')) {
        window.location.href = 'http://halloween-costumes.spirithalloween.com/search#view=grid&w=' + tb.value;
    }
    return (false);
}


////////////////////////OPTIONS/////////////////////////////////

function fillOptions(sType, sColor, sSize, indx) {
    if ($('#' + sType) != undefined && $('#' + sType).length > 0) {
        if ($('#' + sType).find('option').length == 2) {
            $('#' + sType + ' :first').remove();
            $('#' + sType).removeAttr('disabled');
            $('#' + sType + ' :selected').removeAttr('selected');
            $('#' + sType + ' :first').attr('selected', 'selected');
        }

        if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
            if ($('#' + sType).find('option').length > 1) {
                $('#' + sColor).attr('disabled', 'disabled');
            }
            if ($('#' + sColor).find('option').length == 2) {
                $('#' + sColor + ' :first').remove();
                $('#' + sColor).removeAttr('disabled');
                $('#' + sColor + ' :selected').removeAttr('selected');
                $('#' + sColor + ' :first').attr('selected', 'selected');
            }
        }
        if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
            if ($('#' + sColor) != undefined && $('#' + sColor).length > 0 && $('#' + sColor).find('option').length > 1) {
                $('#' + sSize).attr('disabled', 'disabled');
            }
            if ($('#' + sSize).find('option').length == 2) {
                $('#' + sSize + ' :first').remove();
                $('#' + sSize).removeAttr('disabled');
                $('#' + sSize + ' :selected').removeAttr('selected');
                $('#' + sSize + ' :first').attr('selected', 'selected');
            }
        }

    } else if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
        if ($('#' + sColor).find('option').length == 2) {
            $('#' + sColor + ' :first').remove();
            $('#' + sColor).removeAttr('disabled');
            $('#' + sColor + ' :selected').removeAttr('selected');
            $('#' + sColor + ' :first').attr('selected', 'selected');
            colorChange($('#' + sColor), sType, sColor, sSize, indx, true);
        }

        if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
            if ($('#' + sColor).find('option').length > 1) {
                $('#' + sSize).attr('disabled', 'disabled');
            }
            if ($('#' + sSize).find('option').length == 2) {
                $('#' + sSize + ' :first').remove();
                $('#' + sSize).removeAttr('disabled');
                $('#' + sSize + ' :selected').removeAttr('selected');
                $('#' + sSize + ' :first').attr('selected', 'selected');
            }
        }
    }
    //colorChange($('#' + sColor), sType, sColor, sSize, indx, true);
}

function typeChange(s, sType, sColor, sSize, indx, isCheck) {
    if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
        $('#' + sSize).attr('disabled', 'disabled');
    }

    if ($(s).val() == '') {
        if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
            $('#' + sColor).attr('disabled', 'disabled');
        }
    }
    else {

        if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
            var selected = $(s).val();
            var skuId = '';
            $('#' + sColor).empty();
            for (var i = 0; i < options[indx].length; i++) {
                if (selected == options[indx][i].OptionId) {
                    skuId = options[indx][i].SkuId;
                    for (var y = 0; y < options[indx].length; y++) {
                        if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != selected && options[indx][y].Name == 'Color') {
                            $('#' + sColor).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + '</option>');
                        }
                    }
                }
            }
            if ($('#' + sColor).find('option').length > 0) {
                if ($('#' + sColor + ' option').length == 2) {
                    $('#' + sColor).prepend('<option value="">Select color</option>');
                }
                $('#' + sColor).removeAttr('disabled');
                $('#' + sColor + ' :selected').removeAttr('selected');
                $('#' + sColor + ' :first').attr('selected', 'selected');
            }
        }
    }
    //checkStockStatus(s, isCheck);
}

function typeStatus(skuId, optionId, indx) {
    for (var i = 0; i < options[indx].length; i++) {
        if (options[indx][i].SkuId == skuId && options[indx][i].Name == 'Size') {
            if (options[indx][i].Status != 'unavailable') {
                return false;
            }
        }
    }
    return true;
}

function colorChange(s, sType, sColor, sSize, indx, isCheck) {
    if ($('#' + sSize) != undefined && $('#' + sSize).length > 0 && $(s).val() == '') {
        $('#' + sSize).attr('disabled', 'disabled');
    } else {
        var selected = $(s).val();
        var skuId = '';
        $('#' + sSize).empty();
        for (var i = 0; i < options[indx].length; i++) {
            if (selected == options[indx][i].OptionId) {
                skuId = options[indx][i].SkuId;
                for (var y = 0; y < options[indx].length; y++) {
                    if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != selected && options[indx][y].Name == 'Size') {
                        $('#' + sSize).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + (options[indx][y].Status == 'unavailable' ? ' (Sold Out)' : '') + '</option>');
                        //$('#' + sSize).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + '</option>');
                    }
                }
            }
        }
        if ($('#' + sSize).find('option').length > 0) {
            if ($('#' + sSize + ' option').length == 2) {
                $('#' + sSize).prepend('<option value="">Select size</option>');
            }
            $('#' + sSize).removeAttr('disabled');
            $('#' + sSize + ' :selected').removeAttr('selected');
            $('#' + sSize + ' :first').attr('selected', 'selected');
        }
        if (colorStatus(skuId, selected, indx)) {
            var txt = $('#' + sColor + ' :selected').text();
            if (txt.toLowerCase().indexOf('sold out') < 0) {
                $('#' + sColor + ' :selected').text(txt + ' (Sold Out)');
            }
        }
        //checkStockStatus(s, isCheck);
    }
}

function colorStatus(skuId, optionId, indx) {
    for (var i = 0; i < options[indx].length; i++) {
        if (options[indx][i].SkuId == skuId && options[indx][i].Name == 'Size') {
            if (options[indx][i].Status != 'unavailable') {
                return false;
            }
        }
    }
    return true;
}

function sizeChange(s, isCheck, sColor, indx) {
    //checkStockStatus(s, isCheck);
}

function checkStockStatus(s, isCheck) {
    //alert(isCheck);
    if (isCheck == 'false') return;
    var check = true;
    if ($(s).parent().find('select').length == 0) check = true;
    else {
        for (var i = 0; i < $(s).parent().find('select').length; i++) {
            if ($($(s).parent().find('select')[i]).val() == '') {
                check = false;
                break;
            }
        }
    }
    if (check == true) {
        var productId = $('#mainProductId').val();
        var url = '/Controls/GetStockStatus?productId=' + productId;
        var options = '';

        $('.addTOcartZone').find('div.SizeZone > select').each(function () {
            options = options + $(this).val() + ',';
        });

        if (options.length > 2) {
            url += '&options=' + options;
        }
        if (url.charAt(url.length - 1) == ',') url = url.substr(0, url.length - 1);
        $('#stockStatus').load(url);
    }
}

////////////////////////END OPTIONS/////////////////////////////

////////////////////////email sign up//////////////////////////
function showFloatingEmailSignUp() {
    if ($.browser.msie && parseInt(jQuery.browser.version) == 6) {
        $("#floatingEmailSignUp1").css("position", "absolute");
    }
    $(window).resize(function() {
        $("#floatingEmailSignUp1").css("left",
            $('.header:first').position().left + $('.header:first').width() - $("#floatingCart").width() -
                $("#floatingEmailSignUp1").width() - 40);
    });
    $("#floatingEmailSignUp1").css("left",
        $('.header:first').position().left + $('.header:first').width() - $("#floatingCart").width() -
            $("#floatingEmailSignUp1").width() - 40);
    $("#floatingEmailSignUp_ajaxloaderEmailSignUp").hide();
    $("#floatingEmailSignUp1").slideDown(1000);
    $('floatingEmailSignUp_bodySC').show('fast');
}

function hideFloatingEmailSignUp() {
    $("#floatingEmailSignUp1").slideUp(1000);
}

function EmailSignup(emailID, hostUrl, omnitureServer, source, zip) {
    var email = $('#' + emailID).val();
    if (email.length > 0) {
        var reg = /([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) {
            alert('Please enter a valid email address');
        } else {

            if (source == undefined || source.length < 1) {
                $('.BoxForm').hide('fast');
                $("#ajaxloaderEmailSignUp").show('fast');
            } else {
                $("#floatingEmailSignUp_ajaxloaderEmailSignUp").show('fast');
            }
            var url = hostUrl + 'Controls/EmailSignup/?email=' + email;
            if (source == undefined || source.length < 1) {
                source = "";
            }
            url += '&source=' + source + '&zip=' + $('#' + zip).val();
            $.getJSON(url + '&callback=?', function (json) {
                if (json != null && json != undefined) {
                    //alert(json);
                    if (json == 'OK') {
                        alert("We knew you were ready. \r\nWelcome to the universe of awesome!");
                        //hideFloatingEmailSignUp();
                        if (source == undefined || source.length < 1) {
                            $('.BoxForm').show('fast');
                            $("#ajaxloaderEmailSignUp").hide('fast');

                            // Omniture
                            var s = s_gi(String(omnitureServer)); //Your organization's report suite ID
                            s.linkTrackVars = 'events';
                            s.linkTrackEvents = 'event1';
                            s.events = 'event1';
                            s.tl(this, 'o', 'Newsletter Sign-up');
                        }
                    }
                    else {
                        alert('Please enter a valid email address');
                    }
                } else {
                    if (source == undefined || source.length < 1) {
                        $('.BoxForm').show('fast');
                        $("#ajaxloaderEmailSignUp").hide('fast');
                    } else {
                        $("#floatingEmailSignUp_ajaxloaderEmailSignUp").hide('fast');
                    }
                }
                if (source != undefined || source.length > 0) {
                    hideFloatingEmailSignUp();
                }
            });
        }
    } else {
        alert('Please enter a valid email address');
    }
}

//function EmailSignup(email, hostUrl, omnitureServer) {
//    $('.BoxForm').hide('fast');
//    $("#ajaxloaderEmailSignUp").show('fast');
//    var url = hostUrl + 'Controls/EmailSignup/?email=' + $('#' + email).val();
//    $.getJSON(url + '&callback=?', function (json) {
//        if (json != null && json != undefined) {
//            //alert(json);
//            if (json == 'OK') {
//                alert("Thank you for signing up to receive Spencer's emails. \r\nYou will now be eligible to receive special email offers and discounts.");
//                //hideFloatingEmailSignUp();
//                $('.BoxForm').show('fast');
//                $("#ajaxloaderEmailSignUp").hide('fast');

//                // Omniture
//                var s = s_gi(String(omnitureServer)); //Your organization's report suite ID
//                s.linkTrackVars = 'events';
//                s.linkTrackEvents = 'event1';
//                s.events = 'event1';
//                s.tl(this, 'o', 'Newsletter Sign-up');
//            }
//            else {
//                alert('Please enter a valid email address');
//            }
//        } else {
//            $('.BoxForm').show('fast');
//            $("#ajaxloaderEmailSignUp").hide('fast');
//        }
//    });
//}

////////////////////////end email sign up//////////////////////


///////////////////////Recently Viewed/////////////////////////
function GetRV() {
    $('#recentlyViewed').load('/Controls/RecentlyViewed');
}
///////////////////////////////////////////////////////////////


/////////////////////////OPTIONS NEW//////////////////////////

///////////distinct options/////////////////////////////////////
function getOptionName(name, indx) {
    var arr = new Array();
    //    options.sort(function (a, b) {

    //        if (a.DisplayOrder < b.DisplayOrder) return -1;
    //        if (a.DisplayOrder > b.DisplayOrder) return 1;
    //        return 0;
    //    });
    for (var i = 0; i < options[indx].length; i++) {
        for (var y = 0; y < options[indx].length; y++) {
            if (options[indx][y].Name == name) {
                if ($.inArray(options[indx][y].OptionAliasName + '=' + options[indx][y].OptionId, arr) == -1)
                    arr.push(options[indx][y].OptionAliasName + '=' + options[indx][y].OptionId);
            }
        }
    }
    return arr;
}

///////check if is sold out////////////////////////////////////
function checkIsSoldOut(name, indx) {
    for (var i = 0; i < options[indx].length; i++) {
        for (var y = 0; y < options[indx].length; y++) {
            if (options[indx][y].OptionAliasName == name) {
                if (options[indx][y].StatusId == '0' || options[indx][y].StatusId == '1') return '';
            }
        }
    }
    return ' (Sold Out)';
}

/////////////////////////END OPTIONS NEW//////////////////////


////////////////////////OPTIONS NEW NEW///////////////////////

function fillOptions2(sType, sColor, sSize, indx) {
    var i, y, optionId, arr, keyValuePair, skuId;
    if ($('#' + sType) != undefined && $('#' + sType).length > 0) {
        arr = getOptionName('Type', indx);
        for (i = 0; i < arr.length; i++) {
            keyValuePair = arr[i].split('=');
            $('#' + sType).append('<option value="' + keyValuePair[1] + '">' + keyValuePair[0] + checkIsSoldOut(keyValuePair[0], indx) + '</option>');
        }
        if ($('#' + sType).find('option').length > 1) {
            $('#' + sType).prepend('<option value="">Select type</option>');
            $('#' + sType + ' :selected').removeAttr('selected');
            $('#' + sType + ' :first').attr('selected', 'selected');
        }
        else {
            if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
                optionId = $('#' + sType).val();
                for (i = 0; i < options[indx].length; i++) {
                    if (optionId == options[indx][i].OptionId) {
                        skuId = options[indx][i].SkuId;
                        for (y = 0; y < options[indx].length; y++) {
                            if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != optionId && options[indx][y].Name == 'Color') {
                                $('#' + sColor).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + (options[indx][y].Status == 'unavailable' ? ' (Sold Out)' : '') + '</option>');
                            }
                        }
                    }
                }
            }
            if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
                optionId = $('#' + sType).val();
                for (i = 0; i < options[indx].length; i++) {
                    if (optionId == options[indx][i].OptionId) {
                        skuId = options[indx][i].SkuId;
                        for (y = 0; y < options[indx].length; y++) {
                            if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != optionId && options[indx][y].Name=='Size') {
                                $('#' + sSize).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + (options[indx][y].Status == 'unavailable' ? ' (Sold Out)' : '') + '</option>');
                            }
                        }
                    }
                }
            }
        }
        return;
    }
    if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
        arr = getOptionName('Color', indx);
        for (i = 0; i < arr.length; i++) {
            keyValuePair = arr[i].split('=');
            $('#' + sColor).append('<option value="' + keyValuePair[1] + '">' + keyValuePair[0] + checkIsSoldOut(keyValuePair[0], indx) + '</option>');
        }
        if ($('#' + sColor).find('option').length > 1) {
            $('#' + sColor).prepend('<option value="">Select type</option>');
            $('#' + sColor + ' :selected').removeAttr('selected');
            $('#' + sColor + ' :first').attr('selected', 'selected');
        }
        else {
            if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
                optionId = $('#' + sColor).val();
                for (i = 0; i < options[indx].length; i++) {
                    if (optionId == options[indx][i].OptionId) {
                        skuId = options[indx][i].SkuId;
                        for (y = 0; y < options[indx].length; y++) {
                            if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != optionId) {
                                $('#' + sSize).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + (options[indx][y].Status == 'unavailable' ? ' (Sold Out)' : '') + '</option>');
                            }
                        }
                    }
                }
            }
        }
        return;
    }
    if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
        arr = getOptionName('Size', indx);
        for (i = 0; i < arr.length; i++) {
            keyValuePair = arr[i].split('=');
            $('#' + sSize).append('<option value="' + keyValuePair[1] + '">' + keyValuePair[0] + checkIsSoldOut(keyValuePair[0], indx) + '</option>');
        }
        if ($('#' + sSize).find('option').length > 1) {
            $('#' + sSize).prepend('<option value="">Select size</option>');
            $('#' + sSize + ' :selected').removeAttr('selected');
            $('#' + sSize + ' :first').attr('selected', 'selected');
        }
    }
}

//////////////////////////////////////////////////////////////

function typeChange2(s, sType, sColor, sSize, indx, isCheck) {
    var optionId, i, y, skuId;
    if ($(s).val() == '') {
        if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
            $('#' + sColor).attr('disabled', 'disabled');
        }
        if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
            $('#' + sSize).attr('disabled', 'disabled');
        }
    }
    else {
        if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
            $('#' + sColor).empty();
            optionId = $('#' + sType).val();
            for (i = 0; i < options[indx].length; i++) {
                if (optionId == options[indx][i].OptionId) {
                    skuId = options[indx][i].SkuId;
                    for (y = 0; y < options[indx].length; y++) {
                        if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != optionId) {
                            $('#' + sColor).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + (options[indx][y].Status == 'unavailable' ? ' (Sold Out)' : '') + '</option>');
                        }
                    }
                }
            }
        }
        else if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
            $('#' + sSize).empty();
            optionId = $('#' + sType).val();
            for (i = 0; i < options[indx].length; i++) {
                if (optionId == options[indx][i].OptionId) {
                    skuId = options[indx][i].SkuId;
                    for (y = 0; y < options[indx].length; y++) {
                        if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != optionId) {
                            $('#' + sSize).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + (options[indx][y].Status == 'unavailable' ? ' (Sold Out)' : '') + '</option>');
                        }
                    }
                }
            }
        }
    }
    //checkStockStatus(s, isCheck);
}

function colorChange2(s, sType, sColor, sSize, indx, isCheck) {
    var optionId, i, y, skuId;
    if ($('#' + sSize) != undefined && $('#' + sSize).length > 0 && $(s).val() == '') {
        $('#' + sSize).attr('disabled', 'disabled');
    } else {
        $('#' + sSize).empty();
        optionId = $('#' + sColor).val();
        for (i = 0; i < options[indx].length; i++) {
            if (optionId == options[indx][i].OptionId) {
                skuId = options[indx][i].SkuId;
                for (y = 0; y < options[indx].length; y++) {
                    if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != optionId) {
                        $('#' + sSize).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + (options[indx][y].Status == 'unavailable' ? ' (Sold Out)' : '') + '</option>');
                    }
                }
            }
        }
        //checkStockStatus(s, isCheck);
    }
}

function sizeChange2(s, isCheck, sColor, indx) {
    //checkStockStatus(s, isCheck);
}

function getCartItemsCount(cookiename) {
    var countCartItems = getCookie("numitemsnew1");
    if (!countCartItems) {
        countCartItems = 0;
    } else {
        countCartItems = parseInt(countCartItems);
    }
    try {
        var v = getCookie(cookiename);
        if (v != null) {
            //alert(v);
            var vs = v.toString().split('!');
            for (var i = 0; i < vs.length; i++) {
                if (vs.length > 0) {
                    var vss = vs[i].toString().split(':');
                    if (vss.length > 1)
                        countCartItems += parseInt(vss[1]);
                }
            }
        }
    } catch (e) {
        countCartItems = 0;
    }
    return countCartItems;
}

function getCartTotal(cookiename) {
    var countCartItems = getCookie("numitemsnew1");
    var countTotalCost = '';
    if (!countCartItems) {
        countTotalCost = 0;
    }
    else {
        countTotalCost = getCookie("cartTotalCostNew1");
        if (countTotalCost != null && countTotalCost != '')
            countTotalCost = parseFloat(countTotalCost);
        else
            countTotalCost = 0;
    }
    var prs = countTotalCost;
    try {
        var v = getCookie(cookiename);
        if (v != null) {
            //alert(v);
            var vs = v.toString().split('!');
            for (var i = 0; i < vs.length; i++) {
                if (vs.length > 0) {
                    var vss = vs[i].toString().split(':');
                    if (vss.length > 2) {
                        var cnt = parseInt(vss[1]);
                        var pr = parseFloat(vss[2]) * cnt;
                        prs += pr;
                    }
                }
            }
        }
    } catch (e) {
        prs = 0;
    }
    try {
        return parseFloat(prs).toFixed(2);
    } catch (e) {
        return 0;
    }
}
