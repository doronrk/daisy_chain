function inputColorChange() {
    var MobileNumberPattern = /\d{3,}/;
    var PhoneAreaPattern = /(\D*\d){1,}/;
    var PhoneCountryPattern = /(\D*\d){1,}/;
    var PhoneExtPattern = /(\D*\d){1,}/;
    var PhonePattern = /(\D*\d){3,}/;

    var errors = $$('.rfgLabelError');
    for (var i = 0; i < errors.length; i++) {
        if (typeof (errors[i].htmlFor) !== 'undefined' && errors[i].htmlFor != '') {
            var elem = document.getElementById(errors[i].htmlFor);
            if (elem && elem.parentNode.className == 'rfgInputGroup') {
                var children = elem.parentNode.childNodes;
                for (var j = 0; j < children.length; j++) {
                    if (children[j] && children[j].className) {
                        if (children[j].className.contains('requiredField') && children[j].value.trim() == '') {
                            children[j].className += ' errorInputField';
                        }

                        if (children[j].className.contains('mobile') && !MobileNumberPattern.test(children[j].value)) {
                            children[j].className += ' errorInputField';
                        }
                        else if (children[j].className.contains('country') && !PhoneCountryPattern.test(children[j].value)) {
                            children[j].className += ' errorInputField';
                        }
                        else if (children[j].className.contains('phone') && !PhonePattern.test(children[j].value)) {
                            children[j].className += ' errorInputField';
                        }
                        else if (children[j].className.contains('area') && children[j].value.trim() != '' && !PhoneAreaPattern.test(children[j].value)) {
                            children[j].className += ' errorInputField';
                        }
                        else if (children[j].className.contains('extension') && children[j].value.trim() != '' && !PhoneExtPattern.test(children[j].value)) {
                            children[j].className += ' errorInputField';
                        }
                    }
                }
            }
            else if (elem && elem.tagName.contains('INPUT')) {
                elem.className += ' errorInputField';
            }
            else if (elem && elem.className.contains('rfgLongerChoices')) {
                var choices = elem.getElementsByTagName("A");
                for (var j = 0; j < choices.length; j++) {
                    if (choices[j].className.contains('checkedStyledCheckbox') || (choices[j].className.contains('checkedStyledRadioButton'))) {
                        if (choices[j].nextSibling && choices[j].nextSibling.nextSibling) {
                            if (choices[j].nextSibling.nextSibling.tagName.contains('INPUT') &&
                                choices[j].nextSibling.nextSibling.value == '') {
                                choices[j].nextSibling.nextSibling.className += ' errorInputField';
                            }
                        }
                    }
                }
            }
        }
        else if (errors[i].htmlFor == '') {
            var a = '3';
        }
        else if (errors[i].parentNode &&
                    errors[i].parentNode.parentNode && errors[i].parentNode.parentNode.className &&
                    errors[i].parentNode.parentNode.className.contains('rfgSiebel')) {
            var nextSibling = errors[i].parentNode.nextSibling;
            if (nextSibling.tagName != 'DIV') {
                var nextSibling = errors[i].parentNode.getNext();
            }
            if (nextSibling) {
                if (nextSibling.children && nextSibling.children[0]) {
                    var choicesDiv = nextSibling.children[0];
                    if (choicesDiv) {
                        var choices = choicesDiv.children;
                        for (var j = 0; j < choices.length; j++) {
                            var a = choices[j].getElementsByTagName("A");
                            if (a && a[0] && a[0].className.contains('checkedStyledRadioButton')) {
                                var input = choices[j].getElements("input.rfgInputfield");
                                if (input && input[0] && !input[0].className.contains(' errorInputField')) {
                                    input[0].className += ' errorInputField';
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    var inputs = $$('.rfgInputfield');
    inputs.each(function(el) {
        if (!el.className.contains('errorInputField')) {
        //the below code is required when the page is getting re submitted/refreshed based on the drop down post back
            if (el.get('value').length != 0) 
                   {
                   if (!el.className.contains(' enteredInputField'))
                    el.className +=' enteredInputField';
                   }
                   else
                   {
                   if (el.className.contains(' enteredInputField'))
                    {
                        el.className = el.className.replace(' enteredInputField', '');
                   }
                   }
           //
            el.addEvents({
                focus: function() {
                    {
                    if (!this.className.contains(' hoverInputField'))
                        this.className += ' hoverInputField';
                    }
                },
                blur: function() { //balakumar Changes for enabling the black border
                   if (this.get('value').length != 0) 
                   {
                   this.className = this.className.replace(' hoverInputField','');
                    if (!this.className.contains(' enteredInputField'))
                        this.className += ' enteredInputField';
                   }
                   else
                   {
                   this.className = this.className.replace(' hoverInputField','');
                   this.className = this.className.replace(' enteredInputField','');
                   }
                                     
                }
            });
        }
    });

}

function adjustMinHeight() {
    var items = $$('.rfgItem');
    var max = 0;
    if (items) {
        for (var i = 0; i < items.length; i++) {
            max = 0;
            if (items[i].className && items[i].className.contains('rfgLabelInput')) {
            
                max = Math.max(
                        items[Math.floor(i / 3) * 3].offsetHeight,
                         items[Math.floor(i / 3) * 3 + 1].offsetHeight,
                         items[Math.floor(i / 3) * 3 + 2].offsetHeight);
                if (items[((Math.floor(i / 3)) * 3)].className.contains('rfgLabelInput') )
                    items[((Math.floor(i / 3)) * 3)].setStyle('height', (max) + 'px');
                if (items[((Math.floor(i / 3)) * 3 +1)].className.contains('rfgLabelInput'))
                    items[((Math.floor(i / 3) * 3) + 1)].setStyle('height', (max) + 'px');
                if (items[((Math.floor(i / 3)) * 3 + 2)].className.contains('rfgLabelInput'))                         
                    items[((Math.floor(i / 3) * 3) + 2)].setStyle('height', (max) + 'px');
            }
        }        
    }
    var siebels = $$('.rfgSiebel');
    if (siebels) {
        for (var j = 0; j < siebels.length; j++) {
            var childNodes = siebels[j].children;
            for (var k = 0; k < childNodes.length; k++) {
                if (childNodes[k].id.contains('QuestionHolder')) {
                    var divs = childNodes[k].children;
                    var max = 0;
                    for (var l = 0; l < divs.length; l++) {
                        if (divs[l].offsetHeight > max) {
                            max = divs[l].offsetHeight;
                        }
                    }
                    if (siebels[j].offsetHeight < max)
                        siebels[j].setStyle('height', (max) + 'px');
                }
                else {
                    var divs = childNodes[k].children;
                    var max = 0;
                    for (var l = 0; l < divs.length; l++) {
                        if (divs[l].offsetHeight > max) {
                            max = divs[l].offsetHeight;
                        }
                    }
                    if (siebels[j].offsetHeight < max)
                        siebels[j].setStyle('height', (max) + 'px');
                }
            }
        }

    }
}

function radioSelectedChange(id, mode) {
    var elem = document.getElementById(id);
    els = new Array('Ux_PhoneOptIn', 'Ux_PostOptIn', 'Ux_EmailOptIn');
    if (elem.id.contains(els[0]) || elem.id.contains(els[1]) || elem.id.contains(els[2]))
        var unchecked = true;

    if (mode == "1")
        var parent = elem.parentNode.parentNode.parentNode;
    else if (mode == "2")
        var parent = elem.parentNode.parentNode;
    var parentChildren = parent.getElementsByTagName("A");
    if (parentChildren) {
        for (var i = 0; i < parentChildren.length; i++) {
            var children = parentChildren[i].childNodes;
            if (children) {
                for (var j = 0; j < children.length; j++) {
                    if (children[j] && children[j].type == "radio") {
                        if (parentChildren[i].id == id && !parentChildren[i].className.contains(" checkedStyledRadioButton")) {
                            children[j].checked = true;
                            parentChildren[i].className += " checkedStyledRadioButton";
                            if (unchecked) {
                                generalOptOutUncheck();
                            }
                        } else if (parentChildren[i].id != id && parentChildren[i].className.contains(" checkedStyledRadioButton")) {
                            children[j].checked = false;
                            parentChildren[i].className = parentChildren[i].className.replace(" checkedStyledRadioButton", "");
                        }
                    }
                    else if (children[j] && children[j].type == "checkbox") {
                        if (parentChildren[i].id == id && !parentChildren[i].className.contains(" checkedStyledCheckbox")) {
                            children[j].checked = true;
                            parentChildren[i].className += " checkedStyledCheckbox";
                            if (parentChildren[i].id.contains('Ux_GeneralOptOut')) {
                                generalOptOutToggle(parentChildren[i].id);
                            }
                        }
                        else if (parentChildren[i].id == id && parentChildren[i].className.contains(" checkedStyledCheckbox")) {
                            children[j].checked = false;
                            parentChildren[i].className = parentChildren[i].className.replace(" checkedStyledCheckbox", "");
                        }
                    }
                }
            }
        }
    }
}

function toggleCheck(el) {
    if ($(el).className.contains("checkedStyledCheckbox")) {
        $(el).className = $(el).className.replace(" checkedStyledCheckbox", "");
    }
    else {
        $(el).className += " checkedStyledCheckbox";
        if ($(el).id.contains("Ux_GeneralOptOut")) {
            generalOptOutToggle($(el).id);
        }
    }
}

function generalOptOutToggle(id) {
    var generalOptOut = document.getElementById(id);
    var /*baseId,*/els, el, i;
    if (generalOptOut) {
        var input = generalOptOut.getElementsByTagName('INPUT');
        if (typeof (input[0].checked) != 'undefined') {
            if (input[0].checked) {
                els = new Array('Ux_PhoneOptOut', 'Ux_PostOptOut', 'Ux_EmailOptOut');
                for (i = 0; i < els.length; i++) {
                    el = $$('INPUT[id*=' + els[i] + ']')
                    if (el[0]) {
                        radioSelectedChange(el[0].parentNode.id, '2');
                    }
                }
                this.focus();
            }
        }
    }
};

function generalOptOutUncheck() {

    var checkbox = $$('INPUT[id*=Ux_GeneralOptOut]')
    if (checkbox.length > 0 && checkbox[0].checked) {
        radioSelectedChange(checkbox[0].parentNode.id, '2');
    }
    this.focus();
}

function setFileUploadSize() {
    var files = $$('INPUT[type=file]');
    for (var j = 0; j < files.length; j++) {
        if (files.length > 0 && files[j]) {
            if ($$('.rfgBrowserId_mozillafirefox').length > 0) {
                $(files[j]).set('size', '12');
            }
            else if ($$('.rfgBrowserId_safari1plus').length > 0) {
                $(files[j]).setStyle('height', '22px');
                $(files[j]).setStyle('max-height', '22px');
                $(files[j]).setStyle('width', '220px');
            }
            else if ($$('.rfgBrowserId_Chrome').length > 0) {
                $(files[j]).setStyle('width', '220px');
            }
            else if ($$('.rfgBrowserMajVersion_7').length > 0) {
                $(files[j]).setStyle('width', '237px');
            }            
        }
    }

}