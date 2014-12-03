/* ----------------------- jQuery No Conflict Namespace & Ready ------------------------ */

//In order to avoid breaking any code that customers may insert, we use our own unobtrusive selector (ns$).
if (window.jQuery) {
    var ns$ = jQuery.noConflict();

    if ($ == null || $ == undefined) {
        $ = ns$;
    }
}

/* ------------------------------------------------------------------------------------- */
/* -------------------- MC JavaScript Namespace and globlal methods -------------------- */

var MC = function () {
    var _currentRating = 0;
    return {

        addLoadEvent: function (func) {
            var currentOnLoad = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = func;
            } else {
                window.onload = function () {
                    currentOnLoad();
                    func();
                }
            }
        },

        getElementById: function (elementId) {
            if (document.getElementById) {
                return document.getElementById(elementId);
            } else if (document.all) {
                return document.all[elementId];
            } else {
                return null;
            }
        },

        formatCurrency: function (num) {
            num = num.toString().replace(/\$|\,/g, '');

            if (isNaN(num)) { num = "0" }

            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();

            if (cents < 10) { cents = "0" + cents; }

            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++) {
                num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
            }

            return (((sign) ? '' : '-') + '$' + num + '.' + cents);
        },

        swapRatingImage: function (imageId, index, themePath) {
            var noneImageUrl = '/' + themePath + '/images/layout/rating-none.gif';
            var fullImageUrl = '/' + themePath + '/images/layout/rating-full.gif';

            for (var x = 1; x <= 5; x++) {
                var item = MC.getElementById(imageId.substring(0, imageId.length - 1) + x);

                if (item.nodeName == 'A') {
                    item = item.firstChild;
                }

                if (x <= index) {
                    item.src = fullImageUrl;
                } else {
                    item.src = noneImageUrl;
                }
            }
        },

        resetRating: function (imageId, themePath) {
            MC.swapRatingImage(imageId, _currentRating, themePath);
        },

        getCurrentRating: function () {
            return _currentRating;
        },

        setCurrentRating: function (imageId, hiddenId, rating) {
            _currentRating = rating;
            MC.getElementById(hiddenId).value = rating;
        },

        limitInputLength: function (textarea, limit, counter) {
            var text = MC.fixNewline(textarea.value);

            if (text.length > limit) {
                text = text.substring(0, limit);
                textarea.value = text;
            }
            var hasInnerText = (document.getElementsByTagName("body")[0].innerText != undefined) ? true : false;
            var counterText = (limit - text.length) + " characters remaining.";

            if (hasInnerText) {
                document.getElementById(counter).innerHTML = counterText;
            } else {
                document.getElementById(counter).textContent = counterText;
            }
        },

        fixNewline: function (val) {
            if (val.indexOf('\r\n') != -1) {
                ; // this is IE on windows. Puts both characters for a newline, no need to alter
            } else if (val.indexOf('\r') != -1) {
                val = val.replace(/\r/g, "\r\n");        // this is IE on a Mac. Need to add the line feed
            } else if (val.indexOf('\n') != -1) {
                val = val.replace(/\n/g, "\r\n");        // this is Firefox on any platform. Need to add carriage return
            } else {
                ; // no newlines in the textarea  
            }

            return val;
        },

        toggle: function (toggle, item) {
            var element = MC.getElementById(item);

            if (element.style.display == "none") {
                element.style.display = "";
                toggle.innerHTML = 'collapse';
            } else {
                element.style.display = "none";
                toggle.innerHTML = 'expand';
            }
        },

        toggleChecked: function (rel, check) {
            if (!document.getElementsByTagName) return;

            var inputs = document.getElementsByTagName("input");

            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                if (input.getAttribute("type") == "checkbox" && input.getAttribute("rel") == rel) {
                    input.checked = check;
                }
            }
        },

        setupAspect: function (aspect, count, threshold) {
            var node;

            if (aspect.getElementsByClassName) {
                var nodes = aspect.getElementsByClassName("ref-current");

                if (nodes.length != 0) {
                    node = nodes[0];
                }
            } else {
                var candidates = aspect.getElementsByTagName("li");

                for (var i = 0; i < candidates.length; ++i) {
                    if (candidates[i].className = "ref-current") {
                        node = candidates[i];
                        break;
                    }
                }
            }

            if (!node) return;

            var innerLists = node.getElementsByTagName("ul");
            if (innerLists == null || innerLists.length == 0) return;

            var innerList = innerLists[0];
            var items = innerList.getElementsByTagName("li");
            if (items.length <= threshold) return;

            var visible = true;

            var toggleAspect = function (anchor) {
                visible = !visible;

                for (var i = count; i < items.length - 1; ++i) {
                    var item = items[i];

                    if (visible) {
                        item.style.display = "";
                    } else {
                        item.style.display = "none";
                    }
                }

                anchor.innerHTML = visible ? "Show fewer&hellip;" : "Show more&hellip;";
            };

            var toggleItem = document.createElement("li")
            var toggleAnchor = document.createElement("a");

            toggleItem.setAttribute("class", "ref-toggle");
            toggleAnchor.setAttribute("href", "#");

            toggleAnchor.onclick = function () {
                toggleAspect(this);
                return false;
            };

            toggleItem.appendChild(toggleAnchor);
            innerList.appendChild(toggleItem);

            toggleAspect(toggleAnchor);
        }
    };
}();

var Confirm = function () {
    return {

        addToCart: function (name, quantity) {
            alert(quantity + ' - ' + name + ' has been added to your cart.');
        },

        addToList: function (name, quantity) {
            alert(quantity + ' - ' + name + ' has been added to your shopping list.');
        },

        updateQuantity: function (name, quantity) {
            alert(name + ' quantity has been updated.');
        },

        outOfStock: function (name, quantity) {
            alert('The quantity you requested (' + quantity + ') is not currently in stock.');
        },

        unavailable: function (name, quantity) {
            alert('You are not allowed to purchase ' + name + '.');
        },

        reqQuestion: function (name, quantity) {
            alert('You must select options for ' + name + '.');
        },

        belowMinQty: function (name, quantity) {
            alert('You are not allowed to purchase fewer than ' + quantity + ' of ' + name + '.');
        },

        aboveMaxQty: function (name, quantity) {
            alert('You are not allowed to purchase more than ' + quantity + ' of ' + name + '.');
        },

        invalidCaptcha: function(name, quantity) {
            alert(name + ' could not be added to cart. Captcha was invalid.');
        }
    };
}();

var Window = function () {
    var isNetscape = (navigator.appName == "Netscape") ? true : false;
    return {

        open: function (url, name, width, height, scrollbars, resizable) {
            var left = (screen.width - width) / 2;
            var top = (screen.height - height) / 2;
            resizable = 'yes';
            var properties = 'height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',scrollbars=' + scrollbars + ',resizable=' + resizable + ',toolbar=0,location=0,statusbar=0,menubar=0';

            var win = window.open(url, 'win', properties);

            if (isNetscape) {
                win.window.focus();
            } else {
                win.focus();
            }
        },

        close: function (win) {
            win.close();
        },

        print: function (win) {
            win.print();
        },

        center: function (win) {
            var width, height;
            var left, top;

            width = win.outerWidth;
            height = win.outerHeight;

            if (win.document.layers || (win.document.getElementById && !win.document.all)) {
                width = win.outerWidth;
                height = win.outerHeight;
            } else if (win.document.all) {
                width = win.document.body.clientWidth;
                height = win.document.body.clientHeight;
            }

            left = (screen.width - width) / 2;
            top = (screen.height - height) / 2;

            if (parseInt(navigator.appVersion) >= 4) {
                window.moveTo(left, top);
            }
        },

        resizeToObject: function (imageId, extraWidth, extraHeight) {
            var image = MC.getElementById(imageId);
            var offsetTop = 100;
            var offsetLeft = 100;

            if (image) {
                width = (image.width + extraWidth);
                height = (image.height + extraHeight);

                if (height - offsetTop > screen.availHeight) { height = screen.availHeight - offsetTop; }
                if (width - offsetLeft > screen.availWidth) { width = screen.availWidth - offsetLeft; }

                window.moveTo(offsetLeft, offsetTop);
                window.resizeTo(width, height);
            }
        }
    };
}();

/* ------------------------------------------------------------------------------------- */
/*------------------------------Checkout Functions--------------------------------------*/
function detectCCTypeBasedOnCCNumber() {
    var $this = $('[name*="ccnumber"]');
    var value = $this.val();

    if (value != null && value.length == 4 && $.isNumeric(value)) {

        if (value.substring(0, 2) == "55") {
            // "Master Card"
            $('[name*="cctype"]').val(1).change();

        } else if (parseInt(value.substring(0, 2)) >= 51 && parseInt(value.substring(0, 2)) <= 55) {
            // "Master Card"
            $('[name*="cctype"]').val(1).change();

        } else if (value.substring(0, 1) == "4") {
            // "Visa"
            $('[name*="cctype"]').val(2).change();

        } else if (value.substring(0, 4) == "6011" || value.substring(0, 2) == "65") {
            // "Discover" 
            $('[name*="cctype"]').val(3).change();

        } else if (value.substring(0, 2) == "34" || value.substring(0, 2) == "37") {
            // "American Express"   
            $('[name*="cctype"]').val(4).change();

        } else if (value.substring(0, 4) == "2131" || value.substring(0, 4) == "1800" || value.substring(0,2) == "35") {
            //"JCB"    
            $('[name*="cctype"]').val(5).change();

        } else if (value.substring(0, 2) == "36" || value.substring(0, 2) == "38") {
            //"Diner's Club"
            $('[name*="cctype"]').val(6).change();

        } else if (parseInt(value.substring(0, 3)) >= 300 && parseInt(value.substring(0, 3)) <= 305) {
            //"Diner's Club" 
            $('[name*="cctype"]').val(6).change();

        } else {
            // "N/A"
            $('[name*="cctype"]').val(0).change();
        }
    }
}

function chkBillingSameAsShippingChange() {
    var $self = $("[id$='chkBillingSameAsShipping']:first");

    var chkBoxLabelText = $("label[for='" + $self[0].id + "']").text();

    if (chkBoxLabelText == 'Billing same as shipping') {
        $(".checkout-billing-address tr.hideRowClass").toggle(!$self[0].checked);
    } else if (chkBoxLabelText == 'Shipping same as billing') {
        $(".checkout-shipping-address tr.hideRowClass").toggle(!$self[0].checked);
    }
}

function isNumber(event) {
    var key = window.event ? event.keyCode : event.which;

    
    var browser = whichBrowser();

    if (browser.indexOf("Firefox") != -1) {
        // Allow CTRL events, backspace, tab, delete, left arrow , right arrow, dashes, parenthesis 
        if (event.ctrlKey || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 46
            || event.keyCode == 37 || event.keyCode == 39 || key == 45
            || key == 40 || key == 41) {
            return;
        }
    } else {
        // Allow CTRL events, backspace, tab, delete,  dashes, parenthesis 
        if (event.ctrlKey || event.keyCode == 8 || event.keyCode == 9 || event.DEL || key == 45
            || key == 40 || key == 41) {
            return;
        }
    }

    // check if this is a number
    if (key < 48 || key > 57) {
        return false;
    }

    return true;
}


function whichBrowser(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}
/* ------------------------------------------------------------------------------------- */

