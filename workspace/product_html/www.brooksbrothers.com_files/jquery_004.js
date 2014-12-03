/*

CUSTOM FORM ELEMENTS

Created by Ryan Fait
http://www.ryanfait.com

Made as jQuery plugin by Daniel Anechitoaie
https://github.com/daniels0xff

The only things you may need to change in this file are the following
variables: checkboxHeight, radioHeight and selectWidth (lines 24, 25, 26)

The numbers you set for checkboxHeight and radioHeight should be one quarter
of the total height of the image want to use for checkboxes and radio
buttons. Both images should contain the four stages of both inputs stacked
on top of each other in this order: unchecked, unchecked-clicked, checked,
checked-clicked.

You may need to adjust your images a bit if there is a slight vertical
movement during the different stages of the button activation.

The value of selectWidth should be the width of your select list image.

*/

;(function($, window, undefined) {

    var checkboxHeight = "22";
    var radioHeight    = "22";
    var selectWidth    = "50";
    var document       = window.document;
    var Custom         = {
        init: function() {
            var inputs = document.getElementsByTagName("input"), span = Array(), textnode, option, active;
            for(var a = 0; a < inputs.length; a++) {
                if((inputs[a].type == "checkbox" || inputs[a].type == "radio") && $(inputs[a]).hasClass("styled") && !inputs[a].initialized) {
                    span[a] = document.createElement("span");
                    span[a].className = inputs[a].type;
                    inputs[a].initialized = true;
                    if(inputs[a].checked == true) {
                        if(inputs[a].type == "checkbox") {
                            position = "0 -" + (checkboxHeight*2) + "px";
                            span[a].style.backgroundPosition = position;
                        } else {
                            position = "0 -" + (radioHeight*2) + "px";
                            span[a].style.backgroundPosition = position;
                        }
                    }
                    inputs[a].parentNode.insertBefore(span[a], inputs[a]);
                    inputs[a].onchange = Custom.clear;
                    if(!inputs[a].getAttribute("disabled")) {
                        span[a].onmousedown = Custom.pushed;
                        span[a].onmouseup = Custom.check;
                    } else {
                        span[a].className = span[a].className += " disabled";
                    }
                }
            }
            inputs = document.getElementsByTagName("select");
            for(var a = 0; a < inputs.length; a++) {
                if($(inputs[a]).hasClass("styled") && !inputs[a].initialized) {
                    option = inputs[a].getElementsByTagName("option");
                    if (option[0] != null) {
                    active = option[0].childNodes[0].nodeValue;
                    textnode = document.createTextNode(active);
                    for(b = 0; b < option.length; b++) {
                        if(option[b].selected == true) {
                            textnode = document.createTextNode(option[b].childNodes[0].nodeValue);
                        }
                        }
                    }
                            else {
                                    textnode = document.createTextNode(''); ;
                            }
                    span[a] = document.createElement("span");
                    span[a].className = "select";
                    span[a].id = "select" + inputs[a].name;
                    span[a].appendChild(textnode);
                    var replaced = false;
                            for (var i = 0; i < inputs[a].parentNode.childNodes.length; i++) {
                                if (inputs[a].parentNode.childNodes[i].id == span[a].id) {
                                    inputs[a].parentNode.childNodes[i] = span[a];
                                    replaced = true;
                                }
                            }

                            if (!replaced) {
                    inputs[a].parentNode.insertBefore(span[a], inputs[a]);
                    }
                    if(!inputs[a].getAttribute("disabled")) {
                        inputs[a].onchange = Custom.choose;
                    } else {
                        inputs[a].previousSibling.className = inputs[a].previousSibling.className += " disabled";
                    }
                    inputs[a].initialized = true;
                }
            }
            document.onmouseup = Custom.clear;
        },
        pushed: function() {
            element = this.nextSibling;
            try {
	            if(element.checked == true && element.type == "checkbox") {
	                this.style.backgroundPosition = "0 -" + checkboxHeight*3 + "px";
	            } else if(element.checked == true && element.type == "radio") {
	                this.style.backgroundPosition = "0 -" + radioHeight*3 + "px";
	            } else if(element.checked != true && element.type == "checkbox") {
	                this.style.backgroundPosition = "0 -" + checkboxHeight + "px";
	            } else {
	                this.style.backgroundPosition = "0 -" + radioHeight + "px";
	            }
            } catch(e) {
            	// Make sure eventually missing style tags don't let the IE7/8 crash
            }
        },
        check: function() {
            element = this.nextSibling;
            try {
	            if(element.checked == true && element.type == "checkbox") {
	                this.style.backgroundPosition = "0 0";
	                element.checked = false;
	                $(element).change();
	            } else {
	                if(element.type == "checkbox") {
	                    this.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
	                } else {
	                    this.nextSibling.click();
	                    this.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
	                    group = this.nextSibling.name;
	                    inputs = document.getElementsByTagName("input");
	                    for(a = 0; a < inputs.length; a++) {
	                        if(inputs[a].name == group && inputs[a] != this.nextSibling) {
	                            inputs[a].previousSibling.style.backgroundPosition = "0 0";
	                        }
	                    }
	                }
	                element.checked = true;
	                $(element).change();
	            }
	        } catch(e) {
	        	// Make sure eventually missing style tags don't let the IE7/8 crash
	        }
        },
        clear: function() {
            inputs = document.getElementsByTagName("input");
            try {
	            for(var b = 0; b < inputs.length; b++) {
	                if(inputs[b].type == "checkbox" && inputs[b].checked == true && $(inputs[b]).hasClass("styled")) {
	                    inputs[b].previousSibling.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";

	                    Custom.toggleLabel(this);

	                } else if(inputs[b].type == "checkbox" && $(inputs[b]).hasClass("styled")) {
	                    inputs[b].previousSibling.style.backgroundPosition = "0 0";

	                    Custom.toggleLabel(this);

	                } else if(inputs[b].type == "radio" && inputs[b].checked == true && $(inputs[b]).hasClass("styled")) {
	                    inputs[b].previousSibling.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
	                } else if(inputs[b].type == "radio" && $(inputs[b]).hasClass("styled") && inputs[b].previousSibling.style != undefined) {
	                    inputs[b].previousSibling.style.backgroundPosition = "0 0";
	                }
	            }
	        } catch(e) {
	        	// Make sure eventually missing style tags don't let the IE7/8 crash
	        }
        },
        choose: function() {

            option = this.getElementsByTagName("option");
            for(d = 0; d < option.length; d++) {
                if(option[d].selected == true) {
                    document.getElementById("select" + this.name).childNodes[0].nodeValue = option[d].childNodes[0].nodeValue;
                }
            }
        },
        toggleLabel: function(element) {
            var $findLabel = $(element).parent().find("label");
            var $findAltLabel = $(element).parent().find("span.form-caption");

            if ($findLabel.length > 0) {
                $findLabel.toggleClass("checked");
            }
            if ($findAltLabel.length > 0) {
                $findAltLabel.toggleClass("checked");
            }
        }
    }

    $.CustomFormElements = function() {
        Custom.init();
    }

}(jQuery, window));