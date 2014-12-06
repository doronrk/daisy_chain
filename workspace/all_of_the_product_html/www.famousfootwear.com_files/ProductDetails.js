jQuery(document).ready(function () {
    jQuery('.bmlBoxWrap').click(function () {
        return openBMLWindow_PALA(1);
    });

    //When page loads ..
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content

    $("ul.tabs li").click(function () {

        if ($(this).hasClass('active')) return false;

        $("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content

        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active ID content
        return false;
    });


    $("#BVRRRatingSummaryLinkReadID a").live("click", function () {
        TabClickHandler("#tabCustomerReviews");
        $("#BVRRRatingSummaryLinkReadID a").attr('href', '#ProdDetailsTabs');
    });

    $("#BVQASummaryBoxViewQuestionsID a").live("click", function () {
        TabClickHandler("#tabCustomerQuestions");
        $("#BVQASummaryBoxViewQuestionsID a").attr('href', '#ProdDetailsTabs');
    });


    //    productselection tabs
    $(".chooseBox").hide(); //Hide all content
    var resultMode = findQueryString('resultmode');
    if (typeof (resultMode) == 'undefined' || resultMode == "") {
        resultMode = 'online';
    }

    if (resultMode != 'store') {
        $("ul.SelectionTabs li:first").addClass("active"); //Activate first tab
        $(".chooseBox:first").show(); //Show first tab content
    }
    else {
        $("ul.SelectionTabs li:last").addClass("active").show(); //Activate second tab
        $(".chooseBox:last").show(); //Show second tab content
    }

    // If the store link is in the DOM, wire up a click event to open the modal window
    // If the store link is in the DOM, wire up a click event to open the modal window
    if ($('#changeStoreLink')) {
        $('#changeStoreLink').live('click', function (event) {
            event.preventDefault();

            // get the zip code of the currently selected store
            var zip = '0';
            var storeCookie = getCookieData('StoreInfo');

            // Grab the JSON object
            var storeCookieJSON = eval('(' + storeCookie + ')');

            var zip = (storeCookieJSON != null && storeCookieJSON.ZipCode != null) ? storeCookieJSON.ZipCode : '0';
            if (zip.length > 5) zip = zip.substring(0, 5);

            if (DetectIpad()) {
                document.cookie = 'FindAStorePrevPage=' + $('<div/>').text(location.href.substring(location.href.indexOf(location.pathname))).html() + '; path=/; domain=' + siteDomain;
                window.location = '/Community/FindAStore2.aspx?location=' + zip;
            }
            else {
                // Show the modal window	
                var url = '/Community/FindAStore.aspx?location=' + zip + '&page=shipping&TB_iframe=true&modal=true&height=600&width=500&';
                tb_show('Pick Store', url, false);
                $('#TB_window').addClass('shopMyStoreIFrameWrapper');
            }
        }
	);
    }

    //    $("ul.SelectionTabs li").click(function () {

    //        if ($(this).hasClass('active')) return false;

    //        $("ul.SelectionTabs li").removeClass("active"); //Remove any "active" class
    //        $(this).addClass("active"); //Add "active" class to selected tab
    //        $(".chooseBox").hide(); //Hide all tab content

    //        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
    //        $(activeTab).fadeIn(); //Fade in the active ID content
    //        return false;
    //    });

});

//BuyOnline = function () {
//    $(".chooseBox").hide();
//    $("ul.SelectionTabs li").removeClass("active"); //Remove any "active" class
//    $("ul.SelectionTabs li:first").addClass("active").show(); //Activate first tab
//    $(".chooseBox:first").fadeIn(); //Show first tab content
//};

//BuyInStore = function () {
//    $(".chooseBox").hide();
//    $("ul.SelectionTabs li").removeClass("active"); //Remove any "active" class
//    $("ul.SelectionTabs li:last").addClass("active").show(); //Activate first tab
//    $(".chooseBox:last").fadeIn(); //Show first tab content
//};

//CheckOtherStore = function (itemnumber, zip) {
//};

CheckAnotherStore = function () {
    $(".chooseBox").hide();
    $("ul.SelectionTabs li:first").addClass("active").show(); //Activate first tab
    $(".chooseBox:first").show(); //Show first tab content
};

findQueryString = function (name) {

    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];

};

TabClickHandler = function (hrefAttribute) {

    $("ul.tabs li").removeClass("active"); //Remove any "active" class
    var tabToBeSelected = null;

    $("ul.tabs li").each(function () {

        var alink = $(this).find("a");
        var aref = $(this).find("a").attr("href");

        if (aref == hrefAttribute) {
            tabToBeSelected = $(this);
            alink.focus();
        }
    });

    $(tabToBeSelected).addClass("active"); //Add "active" class to selected tab
    $(".tab_content").hide(); //Hide all tab content

    var activeTab = $(tabToBeSelected).find("a").attr("href");
    $(activeTab).fadeIn(); //Fade in the active ID content

};

function showHide(popUpLink, popUpId, topOffset, leftOffset) {
    var linkPosition = $('#' + popUpLink).offset();
    var popUp = $('#' + popUpId)[0];

    popUp.style.top = (linkPosition.top - popUp.offsetHeight + topOffset) + 'px';
    popUp.style.left = (linkPosition.left - popUp.offsetWidth + leftOffset) + 'px';

    if (popUp.style.visibility == 'hidden') {
        popUp.style.visibility = 'visible';
    }
    else {
        popUp.style.visibility = 'hidden';
    }
}
function hideTheRest() {
    var popUps = ['Layer1', 'Layer2', 'Layer3', 'Layer4'];
    popUps = $(popUps).map(
		function (index, popUp) {
		    return $('#' + popUp).length ? $('#' + popUp)[0] : null;
		}
	);

    popUps.each(
		function (index, popUp) {
		    popUp.style.visibility = 'hidden';
		}
	);
}
function openBMLWindow_PALA(popup)
{
    switch (popup) {
        case 0: NW = window.open("https://www.securecheckout.billmelater.com/paycapture-content/fetch?hash=WPE25WEB&content=/bmlweb/coreiw.html", "NewWindow", "width=525,height=445,scrollbars=1,resizable=1,menubar=0,status=1,toolbar=0"); break;
        case 1: NW = window.open("https://www.securecheckout.billmelater.com/paycapture-content/fetch?hash=WPE25WEB&content=/bmlweb/coreiw.html", "NewWindow", "width=525,height=445,scrollbars=1,resizable=1,menubar=0,status=1,toolbar=0"); break;
    }
    if (NW) {
        NW.focus();
    }
    return false;
}

function getCookieData(labelName) {
    var labelLen = labelName.length

    var cookieData = document.cookie;
    var cLen = cookieData.length;

    var i = 0;
    var cEnd;
    while (i < cLen) {
        var j = i + labelLen;
        if (cookieData.substring(i, j) == labelName) {
            cEnd = cookieData.indexOf(";", j);
            if (cEnd == -1) {
                cEnd = cookieData.length;
            }
            return unescape(cookieData.substring(j + 1, cEnd));
        }
        i++;
    }
    return "";
}


function setRecentlyViewedProductIdsCookie(thisProductId, domain)
{
    var productIds = getCookieData("RecentlyViewedProductIds");

    var foundId = false;
    var productIdsStr = "";
     if ( productIds != "" )
     {
        var productIdArr = productIds.split(",");
         for( var i = 0; i < productIdArr.length; i++ )
         {
            if ( productIdArr[ i ] == thisProductId )
            {
                foundId = true;
            }
            if ( i < 20 )
            {
                if ( i > 0 )
                {
                    productIdsStr = productIdsStr + ",";
                }
                productIdsStr = productIdsStr + productIdArr[i];
            }
        }

         if ( foundId == false )
         {
            productIdsStr = "," + productIdsStr;
        }
    }

     if ( foundId == false )
     {
        productIdsStr = thisProductId + productIdsStr;
    }

    document.cookie = "RecentlyViewedProductIds=" + productIdsStr + ";path=/;domain=" + domain;
}

 function go360(go360URL) 
 {
    var popup = window.open(go360URL, 'Go360', 'width=793,height=459,top=5,left=5');
    popup.focus();
}

