//window.addEvent('domready', function() {
$j(document).ready(function () {

    /** Quick View **/
    /* ajax replace element text */
    if ($('add_to_bag_btn')) {
        try {
            $('add_to_bag_btn').addEvent('click', function (event) {
                //prevent the page from changing
                event.stop();

                var blnSubmit = true;

                // product detail
                var objSizeSelect = $('drop_down');
                var objQuantitySelect = $('selQuantity');

                if (objSizeSelect != null) {
                    if (objSizeSelect.options[objSizeSelect.options.selectedIndex].value == '') {
                        alert('Please select a size');
                        blnSubmit = false;
                    }
                }


                if (blnSubmit) {

                    if ($('add_to_bag_btn')) {
                        $('add_to_bag_btn').value = true;
                    }

                    var postData = new Object();

                    $$('#product_detail input').each(function (element) {
                        postData[element.name] = element.value;
                    });

                    $$('#product_detail select').each(function (element) {
                        postData[element.name] = element.value;
                    });

                    $$('#product_detail textarea').each(function (element) {
                        postData[element.name] = element.value;
                    });

                    $$('#product_detail hidden').each(function (element) {
                        postData[element.name] = element.value;
                    });

                    var req = new Request.HTML({
                        method: 'post',
                        url: '/store/catalog/quick_view_ajax.jsp',
                        data: postData,
                        onRequest: function () {
                        },
                        onComplete: function (response) {
                            disbleAddToBag();
                            window.reload_stale_page = function () {
                            };
                            document.getElementById("page_is_fresh").src = "/store/catalog/product_detail_redesign/stale.jsp";
                        },
                        update: 'quickview'

                    }).send();
                }
            });
        } catch (e) {
            // test for existence of button doesn't actually work; wrapping in try to prevent error on launching context chooser.
        }
    }

});

//jquery ready function RG
function toggleDiv(element) {
    var $toggle = $j("#" + element);
    if ($toggle.length) {
        if (!$toggle.is(":visible")) {
            $toggle.fadeIn(400);
        }
        else {
            $toggle.fadeOut(200);
        }
    }
}

function enableDiv(element) {

    // 20120518 - elements are bleeding through quickview in IE; unhide those elements:
    if (element == 'quickview') {
        try {
            document.getElementById('divTopNavRight').style.display = 'none';
            document.getElementById('divNavSearch').style.display = 'none';
        } catch (e) {
            //
        }
    }


    $(element).fade('hide');
    $(element).style.display = 'block';
    $(element).fade(1); // fades 'myElement' to 100% opacity.
}

function disableDivxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx(element) {

    // 20120518 - elements are bleeding through quickview in IE; unhide those elements:
    if (element == 'quickview') {
        try {
            document.getElementById('divTopNavRight').style.display = 'block';
            document.getElementById('divNavSearch').style.display = 'block';
        } catch (e) {
            //
        }
    }

    document.getElementById(element).style.display = 'none';
}

function sendAjaxRequest(url) {
    try {
        //for my account page which is https
        if (location.protocol == 'https:') {
            url = url.replace(/^http:\/\//i, 'https://');
        }
        var req = new Request.HTML({
            method: 'post',
            url: url,
            onRequest: function () {
            },
            onComplete: function (response) {
                disbleAddToBag();
            },
            update: 'quickview'
        }).send();
    } catch (err) {
        $('quickview').innerHTML =
            "Ajax Exception: " +
            err;
    }
}

/***********************************************************************************
 /*
 /* ported back over from product_listing.js and product_detail.js as this is needed for any page using quickview -- see #2236
 /*
 */

function updateNumCartItems(noCartItems) {
    var miniCartCheckoutEl = document.getElementById('divNumberOfItems');

    //set new item number
    document.getElementById('spanNumberOfItems').innerHTML = noCartItems;

    //make sure case of "ITEMS" matches cart item amount
    if (noCartItems == '1') {
        miniCartCheckoutEl.innerHTML = miniCartCheckoutEl.innerHTML.replace("ITEMS", "ITEM");
    } else {
        miniCartCheckoutEl.innerHTML = miniCartCheckoutEl.innerHTML.replace(/ITEM(?!S)/, "ITEMS");
    }
}

function showPDError(strError, resetToNone) {
    try {
        var objPDErrorDiv = document.getElementById('divSizeMessage');
        if (resetToNone != undefined) {
            if (objPDErrorDiv.style.display == 'block') {
                objPDErrorDiv.style.display = 'none';
            }
        }
        else {
            objPDErrorDiv.innerHTML = strError;
            objPDErrorDiv.style.display = 'block';
        }
    }
    catch (e) {
    }
}


function hidePDError() {
    var objPDErrorDiv = document.getElementById('divSizeMessage');

    if (objPDErrorDiv != null) {
        objPDErrorDiv.innerHTML = '';
        objPDErrorDiv.style.display = 'none';
    }

}

/*
 /*
 ***********************************************************************************/
