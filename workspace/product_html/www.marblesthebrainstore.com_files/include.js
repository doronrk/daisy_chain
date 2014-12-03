var popupWin = null; var strSealURL = 'weblogos.dnb.com'; var sealID = '42B6CC1B-9E18-459C-B173-9C61662B9E9F'; var strDuns = '024357563'; var strRWSPath = 'express.dnbsearch.com'; var strCountry = 'US'; var increment = 'true'; var RootLink = "../"; var RootLinkS = "../"; var timerlen = 5; var slideAniLen = 650; var timerID = new Array(); var startTime = new Array(); var obj = new Array(); var endHeight = new Array(); var moving = new Array(); var dir = new Array(); var flowAPI; var imageRowIndex = 0; function ClearHtmlTags() {
    for (var i = 0; i < document.forms[0].elements.length; i++) {
        if (document.forms[0].elements[i].type == "text" || document.forms[0].elements[i].type == "textarea") {
            if (document.forms[0].elements[i].value.indexOf("<") >= 0) {
                do {
                    document.forms[0][i].value = document.forms[0].elements[i].value.replace("<", "&lt;")
                }
                while (document.forms[0].elements[i].value.indexOf("<") >= 0);
            }
            if (document.forms[0].elements[i].value.indexOf(">") >= 0) {
                do {
                    document.forms[0][i].value = document.forms[0].elements[i].value.replace(">", "&gt;")
                }
                while (document.forms[0].elements[i].value.indexOf(">") >= 0);
            }
        }
    }
}
function SubmitReview() {
    errorMsg = '';
    noEmailError = true;
    if (document.fCont.tName.value == "") {
        errorMsg = '<li>Enter a valid name.</li>';
    }
    /* Pros are not required
    if (document.fCont.Pros.value == "") {
        errorMsg = errorMsg + '<li>Enter valid pros about the product.</li>';
        //document.fCont.Pros.focus;
        //return;
    }
    */
    if (document.fCont.email.value == "" && noEmailError) {
        errorMsg = errorMsg + '<li>Enter valid email address prior to submitting a review about the product.</li>';
        noEmailError = false;
        //document.fCont.email.focus;
        //return;
    }
    if (document.fCont.email.value.length < 7 && noEmailError) {
        errorMsg = errorMsg + '<li>Enter valid email address prior to submitting a review about the product.</li>';
        noEmailError = false;
        //document.fCont.email.focus;
        //return;
    }
    var strEmail = document.fCont.email.value;
    if (strEmail.indexOf("@") < 1 && noEmailError) {
        errorMsg = errorMsg + '<li>Enter valid email address prior to submitting a review about the product.</li>';
        noEmailError = false;
        //document.fCont.email.focus;
        //return;
    }
    if (strEmail.indexOf(".") < 3 && noEmailError) {
        errorMsg = errorMsg + '<li>Enter valid email address prior to submitting a review about the product.</li>';
        noEmailError = false;
        //document.fCont.email.focus;
        //return;
    }
    /* Cons are not required 
    if (document.fCont.Cons.value == "") {
        errorMsg = errorMsg + '<li>Enter a valid cons  about the product.</li>';
        //document.fCont.Cons.focus;
        //return;
    }
    */
    if (document.fCont.Title.value == "") {
        errorMsg = errorMsg + '<li>Enter a valid title  about the product.</li>';
        //document.fCont.Title.focus;
        //return;
    }
    if (document.fCont.Review.value == "") {
        errorMsg = errorMsg + '<li>Enter a valid review  about the product.</li>';
        //document.fCont.Review.focus;
        //return;
    }
    /* Purchase place is not required
    if (document.fCont.tWhere.value == "") {
        errorMsg = errorMsg + '<li>Enter a valid place of purchase.</li>';
        //document.fCont.tWhere.focus;
        //return;
    }
    */
    if (errorMsg != '') {
        reloadCAPTCHA();
        try {
            jQuery('#fCont').prepend('<div id="reviewError" style="display:none;"><ul>' + errorMsg + '</ul></div>');
            jQuery('#reviewError').dialog({
                title: 'Oops, you missed a couple things.'
    , width: 400
    , modal: true
            });
            jQuery('#reviewError').dialog('open');
        } catch (e) {
            alert('Please fill out all required fields.');
        }
    } else {
        document.fCont.submit();
    }
}
function slidedown(objname) {
    if (moving[objname])
        return; if (document.getElementById(objname).style.display == "block")
        return; moving[objname] = true; dir[objname] = "down"; startslide(objname);
}
function slideup(objname) {
    if (moving[objname])
        return; if (document.getElementById(objname).style.display != "block")
        return; moving[objname] = true; dir[objname] = "up"; startslide(objname);
}
function startslide(objname) {
    obj[objname] = document.getElementById(objname); endHeight[objname] = parseInt(obj[objname].style.height); startTime[objname] = (new Date()).getTime(); if (dir[objname] == "down") { obj[objname].style.height = "1px"; }
    obj[objname].style.display = "block"; timerID[objname] = setInterval('slidetick(\'' + objname + '\');', timerlen);
}
function slidetick(objname) {
    var elapsed = (new Date()).getTime() - startTime[objname]; if (elapsed > slideAniLen)
        endSlide(objname)
    else {
        var d = Math.round(elapsed / slideAniLen * endHeight[objname]); if (dir[objname] == "up")
            d = endHeight[objname] - d; obj[objname].style.height = d + "px";
    }
    return;
}
function endSlide(objname) {
    clearInterval(timerID[objname]); if (dir[objname] == "up")
        obj[objname].style.display = "none"; obj[objname].style.height = endHeight[objname] + "px"; delete (moving[objname]); delete (timerID[objname]); delete (startTime[objname]); delete (endHeight[objname]); delete (obj[objname]); delete (dir[objname]); return;
}
function initializeSearchAjax() {
    var options = { script: "searchAjax.aspx?", varname: "val", json: true, maxresults: 35
    }; var as = new bsn.AutoSuggest('tSearch', options);
}
function loadWishList(dept, cat, prod) { location.href = "/wishlist-main.aspx?dept=" + dept + "&cat=" + cat + "&prod=" + prod + "&options=" + getOptions(prod) + "&personalize=" + getPersonalize(prod); }
function resetLeftCountry(country) { document.fLang.submit(); }
function resetCountry(country) { location.href = "orderform.asp?code=" + country; }
function orderNow(dept, cat, prod) { var myHREF = "/preorderform.asp?dept=" + dept + "&cat=" + cat + "&prod=" + prod + "&options=" + getOptions(prod) + "&qty=" + getQuantity(prod) + "&personalize=" + getPersonalize(prod); location.href = myHREF; }
function getPersonalize(prod) {
    var lsVal = ""; for (var i = 0; i < document.form2.elements.length; i++) {
        if (document.form2.elements[i].name == "personalize_" + prod) {
            if (document.form2.elements[i].checked == true) { return ("yes"); }
        }
    }
    return ("no");
}
function openBig(pProd, wValue, hValue) {
    if (popupWin != null) {
        popupWin.close();
        popupWin = null;
    }
    popupWin = window.open(pProd, null, 'left=0,top=0,width=' + wValue + ',height=' + hValue + ',toolbar=no,directories=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes');    
}
function openBig2(pProd, wValue, hValue) {
    if (popupWin != null) {
        if (navigator.appName == "Netscape") { popupWin = null; popupWin = pProd; popupWin = window.open(pProd, null, 'width=' + wValue + ',height=' + hValue + ',left=' + screen.avalWidth - (wValue / 2) + 'screeny=0,top=0,screenx=' + screen.avalWidth - (wValue / 2) + ',toolbar=no,directories=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no'); popupWin.focus(); popupWin = null; popupWin.close(); }
        else { popupWin.close(); }
    }
    popupWin = pProd; popupWin = window.open(pProd, null, 'width=' + wValue + ',height=' + hValue + ',toolbar=no,directories=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,top=0,left=520'); if ((navigator.appName != "Microsoft Internet Explorer") && (navigator.appVersion.substring(0, 1) == "3")) { popupWin.focus(); }
}
function SubmitMe(SelectBox) { location.href = SelectBox; }
function mouseovertd(o) {
    o.style.backgroundColor = "#5f8cc7"; o.style.cursor = "hand"; o.style.borderStyle = "solid"
    o.style.borderColor = "#003366"
    o.style.color = "#ffffff"
}
function mouseouttd(o) {
    o.style.backgroundColor = "#ededed"
    o.style.color = "#003366"
    o.style.borderColor = "#e2e2e2"
}
function newscreen4() {
    window.open("", "talk", "width=300,height=204,resizable=no,scrollbars=auto")
}
function turnOn(imageName) {
    if (document.images) { document[imageName].src = eval(imageName + "on.src"); }
}
function turnOff(imageName) {
    if (document.images) { document[imageName].src = eval(imageName + "off.src"); }
}
function Rcertify()
{ popupWin = window.open('http://www.bbbonline.org/cks.asp?id=103082714133734521', 'Participant', 'location=yes,scrollbars=yes,width=450,height=300'); window.name = 'opener'; }
function expBrand(strTag, strID) {
    var elem = document.getElementById(strID); if (elem.style.display != "block") { slidedown(strID); }
    else { slideup(strID); }
}
function exp(strTag, strAttribute) {
    var elem = document.getElementsByTagName(strTag); var elem1 = window.event; for (var i = 0; i < elem1.children.length; i++) { elem1.children[i].innerText == "4" ? elem1.children[i].innerText = "5" : elem1.children[i].innerText = "4"; }
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].getAttribute(strAttribute) == "yes") { elem[i].style.display == 'none' ? elem[i].style.display = 'block' : elem[i].style.display = 'none'; }
    }
}
var expdate = new Date(); expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365)); function setCookie(name, value, expires, path, domain, secure) { var thisCookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : ""); document.cookie = thisCookie; }
function opacity(id, opacStart, opacEnd, millisec) {
    var speed = Math.round(millisec / 100); var timer = 0; if (opacStart > opacEnd) {
        for (i = opacStart; i >= opacEnd; i--) { setTimeout("changeOpac(" + i + ",'" + id + "')", (timer * speed)); timer++; }
    } else if (opacStart < opacEnd) {
        for (i = opacStart; i <= opacEnd; i++)
        { setTimeout("changeOpac(" + i + ",'" + id + "')", (timer * speed)); timer++; }
    }
}
function changeOpac(opacity, id) { var object = document.getElementById(id).style; object.opacity = (opacity / 100); object.MozOpacity = (opacity / 100); object.KhtmlOpacity = (opacity / 100); object.filter = "alpha(opacity=" + opacity + ")"; }
function shiftOpacity(id, millisec, direction) {
    if (direction == 0) { opacity(id, 0, 100, millisec); } else { opacity(id, 100, 0, millisec); }
}
function hideIt(what, hidden, imageName, Caption, url, offsetTop, offsetLeft, swatchBoxID) {
    var obj = document.getElementById(what); if (hidden == 1) { shiftOpacity(what, 1000, 1); }
    else { obj.style.opacity = 0; obj.style.display = "block"; var sBox = document.getElementById(swatchBoxID); var sBoxTop = sBox.offsetTop; var sBoxLeft = sBox.offsetLeft; obj.style.top = sBoxTop + offsetTop + "px"; obj.style.left = getElementPosition("SwatchBox") + offsetLeft + "px"; ; obj.style.zIndex = 999; obj.innerHTML = "<table bgcolor='#ffffff' style='border-style:solid;border-width:1px;border-color:Black' cellpadding=2 cellspacing=0><tr><td align=center><img class='searchImage' src='" + url + "itemImages/" + imageName + "'/><span style='background-color:Black'><img src=" + url + "images/1x1.gif style=' width:100%;height:1px' /></span></td></tr><tr><td align=center>" + Caption + "</td></tr></table>"; shiftOpacity(what, 1000, 0); }
}
function getElementPosition(elemID) {
    var offsetTrail = document.getElementById(elemID); var offsetLeft = 0; var offsetTop = 0; while (offsetTrail) { offsetLeft += offsetTrail.offsetLeft; offsetTop += offsetTrail.offsetTop; offsetTrail = offsetTrail.offsetParent; }
    if (navigator.userAgent.indexOf("Mac") != -1 &&
typeof document.body.leftMargin != "undefined") { offsetLeft += document.body.leftMargin; offsetTop += document.body.topMargin; }
    return offsetLeft;
}
function orderMultiple(ID) {
    var lsAddOn = ""; if (location.href.indexOf("?") < 0) { document.form2.action = location.href + "?add=1" + lsAddOn; }
    else { document.form2.action = location.href + lsAddOn; }
    document.form2.submit();
}
function cboLanguage_onchange() { document.fLang.txtLanguage.value = document.fLang.cboLanguage.value; document.fLang.submit(); return true; }
function change_OptionValues(prod) {
    for (var i = 0; i < document.form2.elements.length; i++) {
        if (document.form2.elements[i].name == "options_" + prod) {
            var lblSKU = document.form2.elements[i][document.form2.elements[i].selectedIndex].value; lblSKU = lblSKU.toString().substring(lblSKU.toString().indexOf(";") + 1); eval("document.getElementById('lblSKU_" + prod + "').innerHTML = lblSKU"); var hiddenCosts = eval("document.form2.hidden_" + prod + ".value"); var myElement = document.form2.elements[i].selectedIndex; var myCost = hiddenCosts.split(";")
            eval("document.getElementById('lblSale_" + prod + "').innerHTML = '$' + CurrencyFormatted(myCost[myElement])"); break;
        }
    }
}
function CurrencyFormatted(amount) {
    var i = parseFloat(amount); if (isNaN(i)) { i = 0.00; }
    var minus = ''; if (i < 0) { minus = '-'; }
    i = Math.abs(i); i = parseInt((i + .005) * 100); i = i / 100; s = new String(i); if (s.indexOf('.') < 0) { s += '.00'; }
    if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
    //s = minus + s; return s;
    return CommaFormatted(s);
}
function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    amount = new String(amount);
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
}
function change_OptionValuesProduct(prod) {
    for (var i = 0; i < document.form2.elements.length; i++) {
        if (document.form2.elements[i].name == "options_" + prod) {
            var lblSale = document.form2.elements[i][document.form2.elements[i].selectedIndex].text; var lblValue = document.form2.elements[i][document.form2.elements[i].selectedIndex].value; var hiddenCosts = eval("document.form2.hidden_" + prod + ".value"); var myElement = document.form2.elements[i].selectedIndex; var myCost = hiddenCosts.split(";")
            var mySKU = lblValue.split(";")
            eval("document.getElementById('lblSale_" + prod + "').innerHTML = '$' + CurrencyFormatted(myCost[myElement])"); try { eval("document.all.lblSKU_" + prod + ".innerHTML = mySKU[1]"); }
            catch (exception) { }
            break;
        }
    }
}
function getOptions(prod) {
    var lsVal = ""; for (var i = 0; i < document.form2.elements.length; i++) {
        if (document.form2.elements[i].name == "options_" + prod) { lsVal = lsVal + "," + document.form2.elements[i][document.form2.elements[i].selectedIndex].value; }
    }
    if (lsVal.toString().substring(0, 1) == ",") { lsVal = lsVal.substring(1); }
    return (lsVal);
}
function getQuantity(prod) {
    var lsVal = ""; for (var i = 0; i < document.form2.elements.length; i++) {
        if (document.form2.elements[i].name == "qty_" + prod) { lsVal = document.form2.elements[i].value; }
    }
    if (lsVal == "") { lsVal = 1; }
    return (lsVal);
}
function expHome(strTag, strAttribute) {
    var elem = document.getElementById(strTag); if (elem.getAttribute(strAttribute) == "yes") { elem.style.display == 'none' ? elem.style.display = 'block' : elem.style.display = 'none'; }
}
function expHomeImg(strTag, strAttribute) {
    var elem = document.getElementById(strTag); var elemImg = document.getElementById("img" + strTag); if (elem.style.display != 'block') { if (elemImg != null) { elemImg.src = "/images/red-x.gif"; } }
    else { if (elemImg != null) { elemImg.src = "/images/arrow-blue.gif"; } }
    if (elem.style.display != "block") { slidedown(strTag); }
    else { slideup(strTag); }
}
function OpenModalWindow(URL, width, height) {
    var newwindow = ''
    if (!newwindow.closed && newwindow.location) { newwindow.location.href = URL; }
    else { newwindow = window.open(URL, 'name', 'height=' + height + ',width=' + width + ',toolbar=no,directories=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no'); if (!newwindow.opener) newwindow.opener = self; }
    if (window.focus) { newwindow.focus() }
    return false;
}
function ClosePopUp(cntrl)
{ opener.document.getElementById(cntrl).value = document.getElementById('txtCatg').value; window.close(); return true; }
function ClosePopUp2(cntrl, cntrl2) {
    opener.document.getElementById(cntrl).value = document.getElementById('txtCatg').value;
    opener.raiseAsyncPostback();
    //opener.document.getElementById(cntrl2).click();
    //opener.document.forms[0].submit();    
    window.close();
    return true;
}
var http = createRequestObject(); function createRequestObject() {
    var xmlhttp; try
{ xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (e) {
        try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
        catch (f) { xmlhttp = null; }
    }
    if (!xmlhttp && typeof XMLHttpRequest != "undefined")
    { xmlhttp = new XMLHttpRequest(); }
    return xmlhttp;
}
function sndRating(idnum, rateval) {
    var dvelement = document.getElementById('dvPage'); dvelement.innerHTML = "<img src='images/progressimgred.gif'>"; try
{ http.open('GET', 'ratingprocess.asp?id=' + idnum + '&rateval=' + rateval); http.onreadystatechange = handleResponseText; http.send(null); }
    catch (e) { }
    finally { }
}
function handleResponseText() {
    if ((http.readyState == 4) && (http.status == 200)) {
        var response = http.responseText; var update = new Array(); if (response.indexOf('|') != -1)
        { update = response.split('|'); var drelement = document.getElementById('dvPage'); var voteres = document.getElementById('votDiv'); var totalvote = document.getElementById('bottomDiv'); var starimg = document.getElementById('star' + update[0]); drelement.style.display = 'none'; voteres.innerHTML = update[2]; totalvote.innerHTML = update[3]; starimg.innerHTML = update[4].toString(); }
    }
}
function showProductVideo(videoName) {
    var oImage = document.getElementById('imageArea'); oImage.style.display = 'none'; var oVideo = document.getElementById('videoArea'); oVideo.style.display = 'block'; if (videoName != '') {
        flowAPI = flashembed("videoArea", { src: '/FlowPlayerLP.swf', width: 400, height: 300
        }, { config: { videoFile: videoName
}
        });
    }
}
function showProductImage() {
    var oImage = document.getElementById('imageArea'); oImage.style.display = 'block'; var oVideo = document.getElementById('videoArea'); oVideo.style.display = 'none'; if (flowAPI != null) {
        flashembed("videoArea", { src: '/FlowPlayerLP.swf', width: 400, height: 300
        }, { config: { videoFile: null
}
        });
    }
}
function swapImage(imageName, width, alt) { showProductImage(); var oImage = document.getElementById('imageArea'); oImage.innerHTML = "<img alt='" + alt + "' src='/sendbinary.asp?width=" + width + "&path=" + imageName + "' >"; }
function slideImagesLeft() {
    if (imageRowIndex <= 0) { return; }
    document.getElementById("imageRow" + imageRowIndex.toString()).style.display = 'none'; imageRowIndex--; document.getElementById("imageRow" + imageRowIndex.toString()).style.display = 'block';
}
function slideImagesRight() {
    var nextRow = imageRowIndex + 1; if (document.getElementById("imageRow" + nextRow.toString()) == null) { return; }
    document.getElementById("imageRow" + imageRowIndex.toString()).style.display = 'none'; imageRowIndex++; document.getElementById("imageRow" + imageRowIndex.toString()).style.display = 'block';
}
function enterSearchText(phrase) {
    var tBox = document.fSearch.tSearch; if (tBox.value == phrase) { tBox.value = ""; }
}
function exitSearchText(phrase) {
    var tBox = document.fSearch.tSearch; if (tBox.value == "") { tBox.value = phrase; }
}
function enterFieldText(phrase, fieldName) {
    var tBox = document.getElementById(fieldName); if (tBox.value == phrase) { tBox.value = ""; }
}
function exitFieldText(phrase, fieldName) {
    var tBox = document.getElementById(fieldName); if (tBox.value == "") { tBox.value = phrase; }
}

function setCheckoutShipCostRadio() {
    if (document.getElementById("ctl00_content_lblFooterOrderTotal"))
{
var ShippingTotal = 0;
    var CurrentTotal = 0;
    var x = 0;
    var haveExpress = 0;
    var WhiteGloveTotal = 0;
    var chargeTax = 1;

    if (document.getElementById("aspnetForm") == null) {
        return;
    }
    if (document.getElementById("aspnetForm") == 'undefined') {
        return;
    }
    if (typeof (document.getElementById("ctl00_content_chargeTax")) != 'undefined') {
        chargeTax = document.getElementById("ctl00_content_chargeTax").value;
    }
    else {
        return;
    }
    if (typeof (myState) == 'undefined') {
        return;
    }

    var CouponAmt = 0;
    if (document.getElementById("ctl00_content_coupon").value != null) {
        if (document.getElementById("ctl00_content_coupon").value != "") {
            CouponAmt = parseFloat(document.getElementById("ctl00_content_coupon").value.replace('$', '').replace(',', ''))
        }
    }

    var InsureAmt = setShipInsurance();
    var llMultiplier = 1;
    if (document.getElementById("ctl00_content_rateMultiplier").innerHTML != null) {
        if (document.getElementById("ctl00_content_rateMultiplier").innerHTML != "") {
            llMultiplier = parseFloat(document.getElementById("ctl00_content_rateMultiplier").innerHTML.replace('$', '').replace(',', ''))
        }
    }

    var TierCartFee = 0;
    if (document.getElementById("ctl00_content_hdnCartFee").value != null) {
        if (document.getElementById("ctl00_content_hdnCartFee").value != "") {
            TierCartFee = parseFloat(document.getElementById("ctl00_content_hdnCartFee").value.replace('$', '').replace(',', ''))
        }
    }

    var TierQuantityDiscount = 0;
    if (document.getElementById("ctl00_content_hdnQuantityDiscount").value != null) {
        if (document.getElementById("ctl00_content_hdnQuantityDiscount").value != "") {
            TierQuantityDiscount = parseFloat(document.getElementById("ctl00_content_hdnQuantityDiscount").value.replace('$', '').replace(',', ''))
        }
    }

    //Get Shipping value
    //Express shipping
    var radioButtons = document.getElementsByName("optShip");
    if (radioButtons != 'undefined') {
        for (x = 0; x < radioButtons.length; x++) {
            if (radioButtons[x].checked) {
                var selected_text = radioButtons[x].value;
                var sText = selected_text.split("|");
                ShippingTotal = parseFloat(sText[1].replace('$', '').replace(',', '') * llMultiplier);
                //CurrentTotal = CurrentTotal + ShippingTotal;    
     
            }
            //we have at least 1 express, hide the freight extra message, show express
            haveExpress = 1;
        }

        //show extra message, cuz we got rates
        jQuery("#ctl00_content_pnlExtraShippingMessages").show();
        jQuery("#ctl00_content_litShippingAdditionalMessageOnlyFreight").hide();
        jQuery("#ctl00_content_litShippingAdditionalMessageExpress").show();
    }

    //Freight shipping
    var radioFreightButtons = document.getElementsByName("optShipFreight");
    if (radioFreightButtons != 'undefined') {
        var FreightChecked = false;
        for (x = 0; x < radioFreightButtons.length; x++) {
            if (radioFreightButtons[x].checked) {
                FreightChecked = true;
                var selected_text1 = radioFreightButtons[x].value;
                var sText1 = selected_text1.split("|");
                ShippingTotal = ShippingTotal + parseFloat(sText1[1].replace('$', '').replace(',', '') * llMultiplier);
                //CurrentTotal = CurrentTotal + ShippingTotal;
            }
        }

        //get white glove if necessary
        if (FreightChecked == true) {
            WhiteGloveTotal = setShipWhiteGlove()
            ShippingTotal = ShippingTotal + WhiteGloveTotal;
            //CurrentTotal = CurrentTotal + WhiteGloveTotal;
        }

        //alert(haveExpress);
        if (haveExpress == 0) {
            //show extra message, cuz we got rates
            jQuery("#ctl00_content_pnlExtraShippingMessages").show();
            //we have at no express, hide the express extra message, show freight
            jQuery("#ctl00_content_litShippingAdditionalMessageOnlyFreight").show();
            jQuery("#ctl00_content_litShippingAdditionalMessageExpress").hide();
        }
    }

    // Before we set the ship total check if this is comming from paypal as shipping may have changed 
    var ShippingValue = 0;
    if (window.location.search.indexOf("token") != -1) {
        if (window.location.search.indexOf("optShip") != -1) {
            ShippingValue = window.location.search.substring("optShip");
            var sText = ShippingValue.split("|");
            ShippingTotal = parseFloat(sText[1].replace('$', '').split(',').join('') * llMultiplier);
            document.getElementById("ctl00_content_lblFooterOrderShipping").innerHTML = "$" + CurrencyFormatted(ShippingTotal);
            if (radioButtons != 'undefined') {
                for (x = 0; x < radioButtons.length; x++) {
                    var ExpressShip = radioButtons[x].value;
                    var ExpressShipCost = ExpressShip.split("|");
                    ExpressShipCost = ExpressShipCost[1].replace('$', '').split(',').join('');
                    if (ExpressShipCost == ShippingTotal) {
                        radioButtons[x].checked = true;
                    }
                }
            }
        }
        else {
            if (window.location.search.indexOf("optShipFreight") != -1) {
                ShippingValue = window.location.search.substring("optShipFreight");
                var sText = ShippingValue.split("|");
                ShippingTotal = parseFloat(sText[1].replace('$', '').split(',').join('') * llMultiplier);
                document.getElementById("ctl00_content_lblFooterOrderShipping").innerHTML = "$" + CurrencyFormatted(ShippingTotal);
                if (radioFreightButtons != 'undefined') {
                    for (x = 0; x < radioFreightButtons.length; x++) {
                        var FreightShip = radioButtons[x].value;
                        var FreightShipCost = FreightShip.split("|");
                        FreightShipCost = FreightShipCost[1].replace('$', '').split(',').join('')
                        if (FreightShipCost == ShippingTotal) {
                            radioFreightButtons[x].checked = true;
                        }
                    }
                }
            }
        }
    }
    else {
        document.getElementById("ctl00_content_lblFooterOrderShipping").innerHTML = "$" + CurrencyFormatted(parseFloat(ShippingTotal * llMultiplier));
    }
    //document.getElementById("ctl00_content_lblFooterOrderShipping").innerHTML = "$" + CurrencyFormatted(parseFloat(ShippingTotal * llMultiplier));

    var URLVal = myShipURL.value;
    if (URLVal == undefined) {
        if (document.getElementById("ctl00_content_hdnSecureURL") != undefined) {
            URLVal = document.getElementById("ctl00_content_hdnSecureURL").value;
        } else {
            URLVal = document.getElementById("hdnSecureURL").value;
        }
    }

    //////////////////////////////////////////////////////////////////
    //Calculate the total
    CurrentTotal = (parseFloat(document.getElementById("ctl00_content_lblFooterItemTotal").innerHTML.replace('$', '').replace(',', '')) * llMultiplier) - (parseFloat(CouponAmt) * llMultiplier);
    CurrentTotal = CurrentTotal + (InsureAmt * llMultiplier);
    CurrentTotal = CurrentTotal + (ShippingTotal * llMultiplier);
    CurrentTotal = CurrentTotal + (WhiteGloveTotal * llMultiplier);
    /////////////////////////////////////////////////////////////////

    if (myState.selectedIndex == 0) {
        //from backend if they said no tax
        if (chargeTax != "1") {
            if (document.getElementById("ctl00_content_originalTax") != null) {
                document.getElementById("ctl00_content_lblFooterOrderTax").innerHTML = document.getElementById("ctl00_content_originalTax").value;
            } else {
                document.getElementById("ctl00_content_lblFooterOrderTax").innerHTML = "$" + CurrencyFormatted(0);
            }
        }
        else {
            document.getElementById("ctl00_content_lblFooterOrderTax").innerHTML = "$" + CurrencyFormatted(0);
        }
    }
    else {
        //normal tax calculation
        if (chargeTax == "1") {
            document.getElementById("ctl00_content_lblFooterOrderTax").innerHTML = "$" + CurrencyFormatted(0);
        }
        else {
            var myCustID;
            myCustID = document.getElementById("ctl00_content_hdnCustomerID");
           // loadTaxXMLDoc(URLVal + "backadmin/netFunctions.asmx/calculateCityStateCountryAndTax?SessionID=" + mySID.value + "&ShippingAmount=" + ShippingTotal + "&CouponAmount=" + CouponAmt + "&ShippingInsurance=" + InsureAmt + "&RateMultiplier=" + llMultiplier + "&SalesTaxField=TOTAL&zipCode=" + myZip.value);
            //new
            loadTaxXMLDoc(URLVal + "backadmin/netFunctions.asmx/calculateCityStateCountryAndTaxWithCustomerAndTierChargesDiscounts?CustID=" + myCustID.value + "&SessionID=" + mySID.value + "&ShippingAmount=" + ShippingTotal + "&CouponAmount=" + CouponAmt + "&ShippingInsurance=" + InsureAmt + "&RateMultiplier=" + llMultiplier + "&SalesTaxField=TOTAL&zipCode=" + myZip.value + "&TierCartFee=" + TierCartFee.value + "&TierQuantityDiscount=" + TierQuantityDiscount.value);
            // original 
            //loadTaxXMLDoc(URLVal + "backadmin/netFunctions.asmx/calculateCityStateCountryAndTaxWithCustomer?CustID=" + myCustID.value + "&SessionID=" + mySID.value + "&ShippingAmount=" + ShippingTotal + "&CouponAmount=" + CouponAmt + "&ShippingInsurance=" + InsureAmt + "&RateMultiplier=" + llMultiplier + "&SalesTaxField=TOTAL&zipCode=" + myZip.value);
        }
    }
          
//    alert(parseFloat(document.getElementById("ctl00_content_lblFooterItemTotal").innerHTML.replace('$', '').replace(',', '')));
//    alert(parseFloat(CouponAmt));
//    alert(InsureAmt);
//    alert(ShippingTotal);
//    alert(WhiteGloveTotal);
//    alert(parseFloat((document.getElementById("ctl00_content_lblFooterOrderTax").innerHTML.replace('$', '').replace(',', '')) * llMultiplier));

    //1/29/2009 moved this here. the gift card hast to be applied at the very end
    // gift card adjustments
    //DDS made hidden field value = 0 for now until phase 2
    var giftCardTotal = document.getElementById("ctl00_content_txtGiftCardAmt");
    if (giftCardTotal != null && giftCardTotal.value != null) {
        if (giftCardTotal.value == '') {
            giftCardTotal.value = 0;
        }
        CurrentTotal = CurrentTotal - parseFloat(giftCardTotal.value);
        if (CurrentTotal < 0) CurrentTotal = 0;
    }
    

    // eWaste adjustments
    //calculateEWaste = document.getElementById("ctl00_content_calculateEWaste");

    //alert(CurrentTotal);
    document.getElementById("ctl00_content_lblFooterOrderTotal").innerHTML = "$" + CurrencyFormatted(CurrentTotal);
    
}
else
{
    var radioButtons = document.getElementsByName("optShip");
    var ShippingTotal = 0;
    var CurrentTotal = 0;
    var WhiteGloveTotal = 0;

    //get total sans shipping
    CurrentTotal = parseFloat(document.getElementById("subTotal").value.replace("$", ""));

    //Express shipping
    if (radioButtons != 'undefined') {
        for (var x = 0; x < radioButtons.length; x++) {
            if (radioButtons[x].checked) {

                var selected_text = radioButtons[x].value;
                var sText = selected_text.split("|");
                ShippingTotal = parseFloat(sText[1].replace('$', '').replace(',', ''));
                CurrentTotal = CurrentTotal + ShippingTotal;
            }
        }
    }

    //Freight shipping
    var radioFreightButtons = document.getElementsByName("optShipFreight");
    if (radioFreightButtons != 'undefined') {
        var FreightChecked = false;
        for (var x = 0; x < radioFreightButtons.length; x++) {
            if (radioFreightButtons[x].checked) {
                FreightChecked = true;
                var selected_text = radioFreightButtons[x].value;
                var sText = selected_text.split("|");
                ShippingTotal = parseFloat(sText[1].replace('$', '').replace(',', ''));
                CurrentTotal = CurrentTotal + ShippingTotal;
            }
        }

        //get white glove if necessary
        if (FreightChecked == true) {
            WhiteGloveTotal = setShipWhiteGlove()
            CurrentTotal = CurrentTotal + WhiteGloveTotal;
        }
    }
    document.getElementById("total").innerHTML = "USD   $" + CurrentTotal.toFixed(2).toString();
    }
}

function setShipWhiteGlove() {
    var chkBox = document.getElementById("chkWhiteGlove");
    var txtBox = document.getElementById("txtWhiteGlove");
    var WhiteGloveTotal = 0;

    if (chkBox != 'undefined') {
        if (chkBox.checked == false) {
            WhiteGloveTotal = 0;
        }
        else {
            WhiteGloveTotal = parseFloat(txtBox.value);
        }
    }
    return WhiteGloveTotal;
}

function CheckEmail(camefromurl) {
    email = document.getElementById("txtemail");
    if (email == null) {
        email = document.getElementById("NewsletterInput");
    }

    var EnteredEmail = email.value;
    var url = camefromurl + "Emailfunction.asp?Email=" + EnteredEmail;

    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

    if (filter.test(EnteredEmail)) {
        loadEmail(url);
        return false;
    }
    else {
        document.getElementById('emailresults').innerHTML = "Please Enter a valid email address"
    }
}

function loadEmail(url) {

    // branch for native XMLHttpRequest object
    if (window.ActiveXObject) {
        isIE = true;
        reqEmail = new ActiveXObject("Microsoft.XMLHTTP");
        if (reqEmail) {
            reqEmail.onreadystatechange = processEmail;
            reqEmail.open("GET", url, true);
            reqEmail.send();
        }
    }
    else if (window.XMLHttpRequest) {
        reqEmail = new XMLHttpRequest();
        reqEmail.onreadystatechange = processEmail;
        reqEmail.open("GET", url, true);
        reqEmail.send(null);
        // branch for IE/Windows ActiveX version
    }

}

function processEmail() {
    if (reqEmail.readyState == 4) {
        if (reqEmail.status == 200) {
            var results = reqEmail.responseText;
            results = results.substring(0, results.indexOf("!") + 1);
            document.getElementById("emailresults").innerHTML = results;
        }
    }
}

function replaceImage(htmlID, width, imageName) {
    document.getElementById(htmlID).src = "/getdynamicimage.aspx?path=" + escape(imageName) + "&width=" + width + "&height=" + width;
}

function replaceImageD(htmlID, dimensions, imageName) {
    document.getElementById(htmlID).src = "/getdynamicimage.aspx?path=" + escape(imageName) + "&dimensions=" + dimensions;
}

function swapOptionImage(imageSize, htmlID, imageName, ddlValue) {
    if (imageSize != "") {
        document.getElementById(htmlID).src = "/getdynamicimage.aspx?path=" + imageName + "&width=" + imageSize + "&height=" + imageSize;
    }
    else {
        document.getElementById(htmlID).src = "/itemImages/" + imageName;
    }
    document.form2.options_1.value = ddlValue;
}

function swapOptionImageByGroup(imageSize, htmlID, imageName, ddlValue, GroupName) {
    if (imageSize != "") {
        document.getElementById(htmlID).src = "/getdynamicimage.aspx?path=" + imageName + "&width=" + imageSize + "&height=" + imageSize;
    }
    else {
        document.getElementById(htmlID).src = "/itemImages/" + imageName;
    }
    eval("document.getElementById('" + GroupName + "').value = '" + ddlValue + "'");
}

function swapOptions(imageSize, htmlID, ddlValue) {
    var objHidden2 = document.getElementById("hdn_" + ddlValue.value.replace(";", ""));

    if (objHidden2 == null || objHidden2.value == "") {
        return;
    }

    if (imageSize != "") {
        try {
            document.getElementById(htmlID).src = "/getdynamicimage.aspx?path=" + objHidden2.value + "&width=" + imageSize + "&height=" + imageSize;
        }
        catch (e) { 
            //ignore
        }
    }
    else {
        document.getElementById(htmlID).src = "/itemImages/" + objHidden2.value;
    }
}

function submitCartWithOptions() {
    var msg = 'Please select a valid color before adding this item to your cart.';
    if (typeof document.form2.options_1 != 'undefined') {
        if (document.form2.options_1.value == '') { alert(msg); document.form2.options_1.focus(); return; }
    }

    //so far the cart is valid, continue.
    //check for checkboxes
    if (typeof document.form2.checkacc != 'undefined') {
        if (document.form2.checkacc.checked == true) {
            var field = "document.form2.options_" + document.form2.checkacc.value;

            if (eval(field).value == '') {
                alert(msg); eval(field).focus(); return;
            }
        } 
    }
    document.form2.submit();


}

function updateAmazonCart(sessionID) {
    // branch for native XMLHttpRequest object
    var url = "AmazonCartUpdate.aspx?sessionID=" + sessionID;
    if (window.ActiveXObject) {
        isIE = true;
        try {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (E) {
            req = new ActiveXObject('Msxml2.XMLHTTP');
        }
        if (req) {
            req.onreadystatechange = processReqChangeAmazon;
            req.open("GET", url, true);
            req.send();
        }
    }

    else if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.onreadystatechange = processReqChangeAmazon;
        req.open("GET", url, true);
        req.send(null);

    }
    return (true);
}

function processReqChangeAmazon() { return; }

function copyIt() {
    window.clipboardData.setData("Text", document.form1.txtTextToTranslate.value);
}