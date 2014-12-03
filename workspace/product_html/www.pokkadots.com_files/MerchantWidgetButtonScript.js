/*[Guid("EA84C5DE-26CF-4A6B-8C5A-DB29EF028B07")]*/
// this script will create iframe widget
// when iframe widget loads, it will callback this script to create panel
// when user clicks on it
var MyRegistryWidgetObj_2105390006 = {
    "parameter": new Object(),
    "AppRoot": "//www.myregistry.com/",
    "isObjectCreated": false,
    "isSameDomain": "false",
    "random": "2105390006",
    "GetRandomInt": function () {
        var min = 1;
        var max = 1000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    "Initialize": function () {
        MyRegistryWidgetObj_2105390006.isObjectCreated = false;
        var divs = document.getElementsByTagName("div");
        for (var i = 0; i < divs.length; i++) {
            var divparam = divs[i];
            if (divparam.id == "MyRegistryWidgetApiContainer") {
                //divparam.style.visibility = "hidden";
                if (divparam.getAttribute("isWidgetLoaded") == null || divparam.getAttribute("isWidgetLoaded") == "0") {
                    //                    if (MyRegistryWidgetObj_2105390006.isObjectCreated) {
                    //                        return;
                    //                    }
                    divparam.setAttribute("isWidgetLoaded", "1");
                    var random = MyRegistryWidgetObj_2105390006.GetRandomInt();
                    divparam.setAttribute("random", random);
                    var widgetUrl = divparam.getAttribute("url");
                    MyRegistryWidgetObj_2105390006.SetContainerStyle(divparam);

                    divparam.onclick = function () { MyRegistryWidgetObj_2105390006.ShowAddButton(this) };


                }
            }
            MyRegistryWidgetObj_2105390006.isObjectCreated = true;
        }
        if (typeof MyRegistryWidgetObj_2105390006Signup !== 'undefined') {
            if (MyRegistryWidgetObj_2105390006Signup.isObjectCreated) {

            }
        }
        else {
            var script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            var addButtonSrc = MyRegistryWidgetObj_2105390006.AppRoot + "Merchants/AddToMrButton/v1.0/MyRegistryButton.ashx";
            addButtonSrc += "?isajaxcall=1&isWidgetCall=true";
            addButtonSrc += "&host=" + encodeURIComponent(window.location) + "&function=GetMyRegistryAddButtonScript&version=[AppVersion]";
            addButtonSrc += "&random=" + MyRegistryWidgetObj_2105390006.random + "&siteKey=" + MyRegistryWidgetObj_2105390006.parameter.siteKey;
            script.setAttribute("src", addButtonSrc);
            if (typeof script != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(script);

            }
        }
    },

    "SetProperties": function (divElem) {
        var hasCustomized = "false";
        if (divElem.getAttribute('hasCustmized') && divElem.getAttribute('hasCustmized') !== '') {
            hasCustomized = (this.ReturnObjectValue(divElem, "hasCustmized", "false") == "true");
        }
        else {
            hasCustomized = (this.ReturnObjectValue(divElem, "hasCustomized", "false") == "true");
        }

        var siteKey = this.ReturnObjectValue(divElem, "siteKey", "");
        var storeName = this.ReturnObjectValue(divElem, "storeName");
        var storeLogo = this.ReturnObjectValue(divElem, "storeLogo");
        var signUpLogo = this.ReturnObjectValue(divElem, "signUpLogo");
        var imageSrc = this.ReturnObjectValue(divElem, "imageSrc");
        var title = this.ReturnObjectValue(divElem, "title");
        var price = this.ReturnObjectValue(divElem, "price");
        var size = this.ReturnObjectValue(divElem, "size");
        var quantity = this.ReturnObjectValue(divElem, "quantity");
        var sizeControl = this.ReturnObjectValue(divElem, "sizeControl");
        var sizeRequired = (this.ReturnObjectValue(divElem, "sizeRequired", "false") == "true");
        var sizeIncorrectValue = this.ReturnObjectValue(divElem, "sizeincorrectvalue");
        var sizeErrorMessage = this.ReturnObjectValue(divElem, "sizeErrorMessage", "Size is required");
        var color = this.ReturnObjectValue(divElem, "color");
        var sku = this.ReturnObjectValue(divElem, "sku");
        var colorControl = this.ReturnObjectValue(divElem, "colorControl");
        var colorRequired = (this.ReturnObjectValue(divElem, "colorRequired", "false") == "true");
        var colorIncorrectValue = this.ReturnObjectValue(divElem, "colorIncorrectValue");
        var colorErrorMessage = this.ReturnObjectValue(divElem, "colorErrorMessage", "Color is required");
        var notesControl = this.ReturnObjectValue(divElem, "notesControl");
        var notes = this.ReturnObjectValue(divElem, "notes", "");
        var noteRequired = (this.ReturnObjectValue(divElem, "noteRequired", "false") == "true");
        var noteIncorrectValue = this.ReturnObjectValue(divElem, "noteIncorrectValue");
        var noteErrorMessage = this.ReturnObjectValue(divElem, "noteErrorMessage", "Note is required");
        var description = this.ReturnObjectValue(divElem, "description");
        var currency = parseInt(this.ReturnObjectValue(divElem, "currency", "27"));
        var url = this.ReturnObjectValue(divElem, "url");
        var urlTagId = this.ReturnObjectValue(divElem, "urlTagId");
        var onGiftAdded = this.ReturnObjectValue(divElem, "onGiftAdded");
        var hideSize = (this.ReturnObjectValue(divElem, "hideSize", "false") == "true");
        var hideColor = (this.ReturnObjectValue(divElem, "hideColor", "false") == "true");
        var customUrl = this.ReturnObjectValue(divElem, "customUrl");

        if (MyRegistryWidgetObj_2105390006.parameter == null) {
            MyRegistryWidgetObj_2105390006.parameter = new Object();
        }
        MyRegistryWidgetObj_2105390006.parameter.isWebWidgetCall = true;
        MyRegistryWidgetObj_2105390006.parameter.siteKey = siteKey;
        MyRegistryWidgetObj_2105390006.parameter.storeName = MyRegistryWidgetObj_2105390006.ControlFunction(storeName, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.storeLogo = MyRegistryWidgetObj_2105390006.GetElementByIdIfExistsSrc(storeLogo, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.signUpLogo = MyRegistryWidgetObj_2105390006.GetElementByIdIfExistsSrc(signUpLogo, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.imageSrc = MyRegistryWidgetObj_2105390006.GetElementByIdIfExistsSrc(imageSrc, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.giftTitle = MyRegistryWidgetObj_2105390006.ControlFunction(title, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.giftPrice = MyRegistryWidgetObj_2105390006.ControlFunction(price, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.quantity = MyRegistryWidgetObj_2105390006.ControlFunction(quantity, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.size = MyRegistryWidgetObj_2105390006.GetElementValueByIdOrName(size, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.sizeControl = MyRegistryWidgetObj_2105390006.GetElementValueByIdOrName(sizeControl, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.sizerequired = sizeRequired;
        MyRegistryWidgetObj_2105390006.parameter.sizeincorrectvalue = sizeIncorrectValue;
        MyRegistryWidgetObj_2105390006.parameter.sizeerrormessage = sizeErrorMessage;
        MyRegistryWidgetObj_2105390006.parameter.sku = sku;
        MyRegistryWidgetObj_2105390006.parameter.color = MyRegistryWidgetObj_2105390006.GetElementValueByIdOrName(color, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.colorControl = MyRegistryWidgetObj_2105390006.GetElementValueByIdOrName(colorControl, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.colorrequired = colorRequired;
        MyRegistryWidgetObj_2105390006.parameter.colorincorrectvalue = colorIncorrectValue;
        MyRegistryWidgetObj_2105390006.parameter.colorerrormessage = colorErrorMessage;
        MyRegistryWidgetObj_2105390006.parameter.notes = MyRegistryWidgetObj_2105390006.GetElementValueByIdOrName(notes, hasCustomized);
        MyRegistryWidgetObj_2105390006.parameter.description = description;
        MyRegistryWidgetObj_2105390006.parameter.notesControl = notesControl;
        MyRegistryWidgetObj_2105390006.parameter.notesrequired = noteRequired;
        MyRegistryWidgetObj_2105390006.parameter.notesincorrectvalue = noteIncorrectValue;
        MyRegistryWidgetObj_2105390006.parameter.noteserrormessage = noteErrorMessage;
        MyRegistryWidgetObj_2105390006.parameter.currencySelectedIndex = currency;
        MyRegistryWidgetObj_2105390006.parameter.url = (urlTagId != null && urlTagId != '') ? MyRegistryWidgetObj_2105390006.GetElementValueByIdOrName(urlTagId, true) : url;
        MyRegistryWidgetObj_2105390006.parameter.customUrl = (urlTagId != null && urlTagId != '') ? MyRegistryWidgetObj_2105390006.GetElementValueByIdOrName(urlTagId, true) : customUrl;
        MyRegistryWidgetObj_2105390006.parameter.giftLocation = url;
        MyRegistryWidgetObj_2105390006.parameter.giftAddedCallbackFunction = onGiftAdded;
    },
    "ReturnObjectValue": function (element, name, defaultValue) {
        if (element.getAttribute(name) && element.getAttribute(name) !== '') {
            return element.getAttribute(name);
        }
        return defaultValue;
    },
    "ShowAddButton": function (elem) {

        if (typeof MyRegistry2013 != "undefined") {
            MyRegistry2013.addButtonController.dispose();
            MyRegistry2013.addButtonController = null;
            MyRegistry2013 = null;
        }

        if (MyRegistryWidgetObj_2105390006.isSameDomain == "true") {
            MyRegistryWidgetObj_2105390006.SetProperties(elem);
        }
        else {
            MyRegistryWidgetObj_2105390006.SetProperties(elem);
        }

        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        var addButtonSrc = MyRegistryWidgetObj_2105390006.AppRoot + "Merchants/AddToMrButton/v1.0/MyRegistryButton.ashx";
        addButtonSrc += "?isajaxcall=1&isWidgetCall=true";
        addButtonSrc += "&host=" + encodeURIComponent(window.location) + "&function=GetMyRegistryAddButtonScript&version=[AppVersion]&onloaded=MyRegistryWidgetObj_2105390006.OnScriptLoaded";
        addButtonSrc += "&random=" + MyRegistryWidgetObj_2105390006.random + "&siteKey=" + MyRegistryWidgetObj_2105390006.parameter.siteKey;
        script.setAttribute("src", addButtonSrc);
        if (typeof script != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(script);

        }

    },
    "OnScriptLoaded": function () {
        MyRegistry2013.addButtonController.init(MyRegistry2013.settings, MyRegistryWidgetObj_2105390006.parameter, null);
    },
    "SetContainerStyle": function (divparam) {
        if (navigator.appVersion.indexOf("MSIE 7.") != -1) {
            divparam.style.display = "inline";
        }
        else {
            var isapplystyle = divparam.getAttribute("isapplystyle");
            if (isapplystyle == "false") {
                // bypass style
            } else {
                divparam.style.display = "inline-block";
            }

        }
    },

    "GetElementByIdOrName": function (elementIdOrName, hasCustmized) {
        if (hasCustmized) {
            var mr_element = document.getElementById(elementIdOrName);
            if (mr_element == null) {
                if (document.getElementsByName(elementIdOrName).length > 0) {
                    mr_element = document.getElementsByName(elementIdOrName)[0];
                }
            }

            if (mr_element == null) {
                return null;
            }
            else if (mr_element.type) {
                if (mr_element.type == 'select-one') {
                    return mr_element;
                }
                else if (mr_element.type == 'text') {
                    return mr_element;
                }
            }
            else if (mr_element.innerHTML) {
                return mr_element;
            }
            else {
                return null;
            }
        }
        return elementIdOrName;
    },
    "GetElementValueByIdOrName": function (elementIdOrName, hasCustmized) {
        if (hasCustmized) {
            var mr_element = document.getElementById(elementIdOrName);
            if (mr_element == null) {
                if (document.getElementsByName(elementIdOrName).length > 0) {
                    mr_element = document.getElementsByName(elementIdOrName)[0];
                }
            }
            if (mr_element == null) {
                return null;
            }
            else if (mr_element.type) {
                if (mr_element.type == 'select-one') {
                    return mr_element.options[mr_element.selectedIndex].text;
                }
                else if (mr_element.type == 'text') {
                    return mr_element.value;
                }
                else { }
            }
            else if (mr_element.innerText) {
                console.log("innerText : " + mr_element.innerText);
                return mr_element.innerText;
            }
            else if (mr_element.textContent) {
                console.log("textContent : " + mr_element.textContent);
                return mr_element.textContent;
            }
            else if (mr_element.innerHTML) {
                console.log("innerHTML : " + mr_element.innerHTML);
                return mr_element.innerHTML;
            }
            else {
                return null;
            }
        }
        return elementIdOrName;
    },
    "ControlFunction": function (controlClientId, hasCustmized) {
        if (hasCustmized) {
            var control = document.getElementById(controlClientId);
            if (control != null && (control.type == 'text' || control.type == 'hidden')) {
                if (control.value != null) {
                    return control.value;
                }
                else {
                    return -1;
                }
            }
            else if (control != null && control.type == 'select-one') {
                var idx = control.selectedIndex;
                var selected_text = control.options[idx].text;
                if (selected_text != null) {
                    return selected_text;
                }
                else {
                    return -1;
                }
            }
            else if (control != null && control.type == 'radio') {
                if (MyRegistryWidgetObj_2105390006.GetRadioCheckedValue(document.getElementsByName(controlClientId))) {
                    return MyRegistryWidgetObj_2105390006.GetRadioCheckedValue(document.getElementsByName(controlClientId));
                }
                else {
                    return -1;
                }
            }
            else if (control != null && control.type == 'checkbox') {
                if (MyRegistryWidgetObj_2105390006.GetCheckedValue(document.getElementsByName(controlClientId))) {
                    return MyRegistryWidgetObj_2105390006.GetCheckedValue(document.getElementsByName(controlClientId));
                }
                else {
                    return -1;
                }
            }
            else if (control != null) {
                return control.innerHTML;
            }
        }
        return controlClientId;
    },

    "GetRadioCheckedValue": function (radioObj, hasCustmized) {
        if (hasCustmized) {
            if (!radioObj)
                return null;
            var radioLength = radioObj.length;
            if (radioLength == undefined)
                if (radioObj.checked)
                    return radioObj.value;
                else
                    return null;
            for (var i = 0; i < radioLength; i++) {
                if (radioObj[i].checked) {
                    return radioObj[i].value;
                }
            }
            return null;
        }
        return radioObj;
    },
    "GetCheckedValue": function (radioObj, hasCustmized) {
        if (hasCustmized) {
            if (!radioObj)
                return null;
            var radioLength = radioObj.length;
            if (radioLength == undefined)
                if (radioObj.checked)
                    return radioObj.value;
                else
                    return null;
            var chbReturnval = '';
            var datavail = false;
            for (var i = 0; i < radioLength; i++) {
                if (radioObj[i].checked) {
                    datavail = true;
                    chbReturnval += radioObj[i].value + ',';
                }
            }
            if (datavail) {
                return chbReturnval.substring(0, chbReturnval.length - 1);
            }
            else {
                return null;
            }
        }
        return radioObj;
    },
    "GetElementByIdIfExistsSrc": function (elementId, hasCustmized) {
        if (hasCustmized) {
            if (document.getElementById(elementId)) {
                return document.getElementById(elementId).src;
            }
            else {
                return null;
            }
        }
        return elementId;
    }
};

MyRegistryWidgetObj_2105390006.Initialize();
 
