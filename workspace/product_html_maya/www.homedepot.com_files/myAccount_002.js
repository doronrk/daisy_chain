/*jslint unparam: true */
/*global $, window, document, top, parent, THD, quickViewRef, popupFromPage, getURLParam, escape, location, loadFancyPopup, loadPopup, selectedList, qv_fromPage, isAppliance */
/*
 * CPurpose: This file is added for "Add to List" functionality from QV (PLP, Online Orders, In-store e-reciepts), PIP, PCP and Cart
 * Also having the functionality of "Add to MyList" from Certona POD on MLDP page
 */
var storeId = '',
    langId = '',
    catalogId = '',
    orderId = '',
    fromPage = '',
    whichRow = '',
    catEntryId = '',
    quantity = 0,
    clickParam = false,
    getQtyFieldVal = '',
    posn = 0,
    itemIndex = 0,
    currentPageVal = '';
function removeAndFocus(whichRow, matchIndexVal) {
    'use strict';
    $('#tempResponseData').remove();
    $(whichRow).children("a#itemCopiedLink" + matchIndexVal).focus();
}
var displayInlineConfirmation = function () {
    'use strict';
    $.fancybox.close();
    var listId = $('#listId').val(),
        listIdValue = $('#listName').val(),
        matchIndexVal = $('#matchIndex').val(),
        stringURL = '',
        message = '',
        subStrCart = '';
    if (matchIndexVal === null || matchIndexVal === "") {
        matchIndexVal = 1;
    }
    if (whichRow === 'undefined' || whichRow === null || whichRow === "" || whichRow.html() === null) {
        whichRow = $('#item_copied_' + matchIndexVal);
    }
    subStrCart = (listIdValue.length > 35) ? listIdValue.substring(0, 35) + "..." : listIdValue;
    $.fancybox.hideActivity();
    stringURL = "THDInterestItemListOperation?storeId=" + storeId + "&langId=" + langId + "&catalogId=" + catalogId + "&opCode=7&listId=" + listId;
    message = "<img src='/static/images/mylists/tick.jpg' alt='' /> Item copied to <a id='itemCopiedLink" + matchIndexVal + "' href='" + stringURL + "'><span class=''>" + subStrCart + "</span>";
    $(whichRow).html(message);
    $(whichRow).addClass('item_copied_done').load(removeAndFocus(whichRow, matchIndexVal));
};
function text_box(id) {
    'use strict';
    var boxValue = '',
        hierarchyId = '';
    if (typeof quickViewRef !== 'undefined' && quickViewRef === "quickViewPage") {
        boxValue = $(".addToListRemove #" + id).val();
        $(".addToListRemove #" + id).css('color', '#000');
        if ((boxValue === "Add a new list...") || (boxValue === "or create a new list...") || (boxValue === "")) {
            $(".addToListRemove #" + id).val('').css('color', '#000');
        } else {
            $(".addToListRemove .createListBtn").css({'opacity': '1', 'cursor': 'pointer'});
        }
    } else {
        hierarchyId = (id === "landing_add1") ? "#fancybox-content " : "";
        boxValue = $(hierarchyId + "#" + id).val();
        if ((boxValue === "Add a new list...") || (boxValue === "or create a new list...") || (boxValue === "")) {
            $(hierarchyId + "#" + id).val('').css('color', '#000');
        } else {
            $(".createListBtn").css({'opacity': '1', 'cursor': 'pointer'});
        }
    }
}
function initializePrameters() {
    'use strict';
    var $storeId = $("#storeId"),
        $langId = $("#langId"),
        $catelogId = $("#catalogId"),
        $fromPage = $("#fromPage"),
        $orderId = $("#orderId");
    storeId = ($storeId.size() > 0) ? $storeId.val() : '';
    langId = ($langId.size() > 0) ? $langId.val() : '';
    catalogId = ($catelogId.size() > 0) ? $catelogId.val() : '';
    if (fromPage === null || fromPage === undefined) {
        fromPage = ($fromPage.size() > 0) ? $fromPage.val() : '';
    }
    orderId = ($orderId.size() > 0) ? $orderId.val() : '';
}

function initializeParametersFromUrl() {
    'use strict';
    $("#orderId").val(getURLParam('orderid'));
    $("#catEntryId_1").val(getURLParam('catentryid'));
    $("#productId").val(getURLParam('catentryid'));
    $("#productId_1").val(getURLParam('catentryid'));
    $("#quantity_1").val(getURLParam('qv_login_quantiyid'));
    $("#superskuId").val(getURLParam('superskuid'));
    initializePrameters();
}
function clipTextOnConfirmation() {
    'use strict';
    var popID = '',
        listText = '';
    if ($('#popupCreateNewList').is(':visible')) {
        popID = '#popupCreateNewList';
    } else if ($('#popupAddToYour').is(':visible')) {
        popID = '#popupAddToYour';
    }
    $(popID + ' .listIcon a').text(function () {
        var textValue = $.trim($(this).text());
        if (textValue.length > 35) {
            listText = textValue.substring(0, 35) + "...";
        } else {
            listText = textValue;
        }
        return listText;
    });
    /*Ellipsis for existing lists in Add to list modal*/
    if ($('div.toAdd', top.document).length > 0) {
        $('div.toAdd', top.document).text(function () {
            if ($(this).text().length > 35) {
                listText = $(this).text().substring(0, 35) + "...";
            } else {
                listText = $(this).text();
            }
            return listText;
        });
    }
}
function showSuccessMessages(opCode, posn, itemIndex) {
    'use strict';
    var listId = $(this).attr('id'),
        listIdValue = $(this).html(),
        matchIndexVal = $('#matchIndex').val(),
        subStrCart = '',
        stringURL = '',
        message = '',
        test = '',
        QVfromPage = '',
        listText = '';
    if (opCode === 2) {
        if (fromPage === 'shoppingCart' && $("#popupCreateListFromCart").length > 0) {
            if ($("#listNamePopUpError").size() > 0) {
                $("#popupCreateListFromCart").css({
                    display: "block",
                    top: (posn.top + 150) + 'px',
                    left: (posn.left - 553) + 'px'
                });
            } else {
                if ($("#popupCreateNewList").length > 0) {
                    if (whichRow === 'undefined' || whichRow === null || whichRow === "") {
                        whichRow = $('#item_copied_' + matchIndexVal);
                    }
                    subStrCart = (listIdValue.length > 35) ? listIdValue.substring(0, 35) + "..." : listIdValue;
                    stringURL = "THDInterestItemListOperation?storeId=" + storeId + "&langId=" + langId + "&catalogId=" + catalogId + "&opCode=7&listId=" + listId;
                    message = "<img src='/static/images/mylists/tick.jpg' alt='' /> Item copied to <a href='" + stringURL + "'><span class=''>" + subStrCart + "</span>";
                    $(whichRow).html(message).addClass('item_copied_done');
                }
            }
        }
        if ($("#listNameEmpty").size() > 0) {
            test = $("#listNameEmpty").html();
            if (test.indexOf("already") !== -1) {
                $('.warningIcon').css('margin-top', '-3px');
            } else {
                $('.warningIcon').css('margin-top', '2px');
            }
            $("#popupAddList").css({
                display: "block",
                top: (posn.top + 150) + 'px',
                left: (posn.left - 553) + 'px'
            });
        } else {
            /*For Displaying the Inline confirmation message
             * in scenario where the user doesn't have lists*/
            if (fromPage === 'shoppingCart') {
                listId = $('#listId').val();
                listIdValue = $('#listName').val();
                matchIndexVal = $('#matchIndex').val();
                if (whichRow === 'undefined' || whichRow === null || whichRow === "") {
                    whichRow = $('#item_copied_' + matchIndexVal);
                }
                subStrCart = (listIdValue.length > 35) ? listIdValue.substring(0, 35) + "..." : listIdValue;
                stringURL = "THDInterestItemListOperation?storeId=" + storeId + "&langId=" + langId + "&catalogId=" + catalogId + "&opCode=7&listId=" + listId;
                message = "<img src='/static/images/mylists/tick.jpg' alt='' /> Item copied to <a href='" + stringURL + "'><span class=''>" + subStrCart + "</span>";
                $(whichRow).html(message);
                $(whichRow).addClass('item_copied_done');
            } else if (fromPage === 'productDetail') {
                if (posn) {
                    $("#popupCreateNewList").css({
                        display: "block",
                        top: (posn.top + 150) + 'px',
                        left: (posn.left - 553) + 'px'
                    });
                }
            }
        }
    }
    QVfromPage = $(".SSKU_Actions_Container #fromPage").val();
    if (opCode === 1 && fromPage === 'shoppingCart') {
        matchIndexVal = $('#matchIndex').val();
        if (whichRow === 'undefined' || whichRow === null || whichRow === "") {
            whichRow = $('#item_copied_' + matchIndexVal);
        }
        stringURL = "THDInterestItemListOperation?storeId=" + storeId + "&langId=" + langId + "&catalogId=" + catalogId + "&opCode=7&listId=" + listId;
        message = "<img src='/static/images/mylists/tick.jpg' alt='' /> Item copied to <a href='" + stringURL + "'><span class=''>" + listIdValue + "</span>";
        $(whichRow).html(message);
        $(whichRow).addClass('item_copied_done');
    } else if ((opCode === 1 && fromPage === 'quickView') || (opCode === 1 && QVfromPage === 'quickView')) {
        loadPopup('popupAddToYour');
        clipTextOnConfirmation();
        $('.fadingBackground').css('display', 'none');
        $(".toShow").html(selectedList);
    } else if (opCode === 1 && fromPage === 'productDetail') {
        loadPopup('popupAddToYour');
        clipTextOnConfirmation();
        $(".toShow").html(selectedList);
    }
    if ($("#createList_cart")) {
        $('div.toAdd').text(function () {
            if ($(this).text().length > 35) {
                listText = $(this).text().substring(0, 35) + "...";
            } else {
                listText = $(this).text();
            }
            return listText;
        });
    }
}
function makeAutoHeight(fromPage, opCode) {
    'use strict';
    if (fromPage === "quickView") {
        $('#fancybox-content').css({
            'height': 'auto'
        });
        $('#fancybox-content').children('div:first').css({
            'height': 'auto'
        });
        $('.cartPopup', top.document).append('<div style="clear:both"></div>');
        $('#popupAddToYour', top.document).append('<div style="clear:both"></div>');
        var qvURL = $('input[name="postRegURL"]', top.document).val(),
            qvURLSplit = [],
            parURL = '',
            queryParam = '';
        if (qvURL !== undefined) {
            qvURLSplit = qvURL.split("?");
            parURL = parent.document.URL;
            queryParam = (parURL.indexOf("?") > -1) ? '&' : '?';
            $('input[name="postRegURL"], input[name="URL"]', top.document).val(parURL + queryParam + qvURLSplit[1]);
        }
        if (opCode === 9) {
            $('#popupCreateNewList', top.document).css({
                'display': 'none'
            });
            $('#popupAddList', top.document).css({
                'display': 'block'
            });
        }
        if (opCode === 2 || opCode === 1) {
            $('#popupAddList', top.document).css({
                'display': 'none'
            });
            $('#popupCreateNewList', top.document).css({
                'display': 'block'
            });
        }
    } else {
        $('#fancybox-content').css({
            'height': 'auto'
        });
        if ($("#popupAddList, #popupCreateListFromCart").length > 0) {
            $('#fancybox-content').children('div:first').css({
                'height': 'auto'
            });
        }
        $('#popupAddToYour').append('<div style="clear:both"></div>');
        $('.cartPopup').append('<div style="clear:both"></div>');
        if (opCode === 9) {
            $('#popupCreateNewList').css({
                'display': 'none'
            });
            $('#popupAddList').css({
                'display': 'block'
            });
        }
        if (opCode === 2 || opCode === 1) {
            $('#popupAddList').css({
                'display': 'none'
            });
            if (fromPage !== "shoppingList") {
                $('#popupCreateNewList').css({
                    'display': 'block'
                });
            }
        }

    }
}
function makeAjaxCall(posn, opCode, whichRow, catEntryId, quantity, listId, listIdValue, itemIndex, productName,blindsConfig,copyGUIDRequired) {
    'use strict';
    if (fromPage === "undefined" || fromPage === "" || fromPage === null) {
        fromPage = getURLParam('qv_frompage');
    }
    if (currentPageVal === 'compare') {
        initializeParametersFromUrl();
    }
    if ($("#fromPage").val() && fromPage !== "quickOrder") {
        fromPage = $("#fromPage").val();
    }
    if (fromPage !== undefined && (fromPage === 'shoppingCart' || fromPage === 'shoppingList' || fromPage === 'shoppingListPopup' || fromPage === 'productDetail' || fromPage === 'quickView' || fromPage === 'mylistdetails')) {
        initializePrameters();
    }
    if (currentPageVal === 'compare') {
        fromPage = 'quickView';
    }
	/*MYAC-3073 RTS defect #25718*/
	if (currentPageVal === "productDetail" && popupFromPage==="quickView"){
	fromPage = 'quickView';
	}	
	var QVfromPage = $(".SSKU_Actions_Container #fromPage").val(),
        actionURL = '/webapp/wcs/stores/servlet/THDInterestItemListOperation',
        parameters = 'storeId=' + storeId + '&langId=' + langId + '&catalogId=' + catalogId,
        clickAddToListButton = '',
        productId_1 = '',
        quantity_1 = '',
        superSkuId = '',
        fromParentPage = '',
        email = '',
        password = '',
        url = '';
    /*getting from page value */
    if (QVfromPage === '' || QVfromPage !== undefined) {
        fromPage = popupFromPage;
    }
    if (QVfromPage === 'quickView') {
        fromPage = QVfromPage;
    }
    if (fromPage === 'quickview') {
        fromPage = 'quickView';
    }
    listIdValue = encodeURIComponent(listIdValue);
    if (fromPage === 'mylistdetails' && productName !== "undefined") {
        parameters = parameters + '&productName=' + productName;
    }
    /* opCodes 
     * 1 : ADD ITEM TO LIST
     * 2 : CREATE A LIST
     * 9 : USER CLICKS ON "ADD TO LIST"
     * 10: SIGNIN POPUP CALL
     * */
    if (opCode === 1) {
        parameters = parameters + '&fromPage=' + fromPage;
        if (fromPage === 'shoppingCart' && blindsConfig!== undefined && copyGUIDRequired!==undefined ) {
			  parameters = parameters + '&itemIndex=' + itemIndex + '&catEntryId_'+ itemIndex +'=' + catEntryId + '&blindsConfigId_'+ itemIndex +'='+blindsConfig +'&copyGUIDRequired_'+ itemIndex +'='+ copyGUIDRequired + '&quantity_'+ itemIndex +'=' + quantity +'&clickAddToListButton=' + clickAddToListButton; 
        }
        else {
         if (fromPage === 'quickOrder') {
            parameters = parameters + '&' + catEntryId + '&' + quantity;
         } else {
            parameters = parameters + '&catEntryId=' + catEntryId + '&quantity=' + quantity;
         }
        }
        parameters = parameters + '&listId=' + listId + '&opCode=' + opCode + '&listName=' + listIdValue + '&orderId=' + orderId;
    } else if (opCode === 2) {
        parameters = parameters + '&fromPage=' + fromPage;
        if (fromPage === 'quickOrder') {
            parameters = parameters + '&' + catEntryId + '&' + quantity;
        } else {
            parameters = parameters + '&catEntryId=' + catEntryId + '&quantity=' + quantity;
        }
        parameters = parameters + '&opCode=' + opCode + '&listName=' + listIdValue;
    } else if (opCode === 9) {
        if ($("#clickAddToListButton").size() > 0) {
            clickAddToListButton = $("#clickAddToListButton").val();
        }
        if (fromPage === 'shoppingCart') {
            parameters = parameters + '&fromPage=' + fromPage + '&opCode=' + opCode + '&itemIndex=' + itemIndex + '&catEntryId=' + catEntryId + '&clickAddToListButton=' + clickAddToListButton;
        } else if (fromPage === 'quickOrder') {
            parameters = parameters + '&fromPage=' + fromPage + '&opCode=' + opCode + '&' + catEntryId + '&' + quantity;
        } else if (fromPage === 'quickview' || fromPage === 'quickView') {
            parameters = parameters + '&fromPage=' + fromPage + '&opCode=' + opCode + '&itemIndex=' + itemIndex + '&catEntryId=' + catEntryId + '&clickAddToListButton=true';
        } else if (fromPage === 'productDetail') {
            parameters = parameters + '&fromPage=' + fromPage + '&opCode=' + opCode + '&itemIndex=' + itemIndex + '&catEntryId=' + catEntryId + '&clickAddToListButton=true';
            productId_1 = ($("#productId_1").size() > 0) ? $("#productId_1").val() : catEntryId;
            quantity_1 = ($("#quantity_1").size() > 0) ? $("#quantity_1").val() : quantity;
            if (quantity_1 === null || quantity_1 === "") {
                quantity_1 = getURLParam('QV_Login_QuantiyId');
            }
            parameters = parameters + '&productId_1=' + productId_1 + '&quantity_1=' + quantity_1;

            superSkuId = $("#superSkuId").val();

            if (superSkuId !== '' && superSkuId !== undefined) {
                parameters = parameters + '&superSkuId=' + superSkuId;
            }
        }
        if (fromPage === 'quickview' || fromPage === 'quickView') {
            productId_1 = ($("#productId_1").size() > 0) ? $("#productId_1").val() : catEntryId;
            quantity_1 = ($("#quantity_1").size() > 0) ? $("#quantity_1").val() : quantity;
            if (quantity_1 === null || quantity_1 === "") {
                quantity_1 = getURLParam('qv_quantity');
            }
            parameters = parameters + '&productId_1=' + productId_1 + '&quantity_1=' + quantity_1;

            superSkuId = $("#superSkuId").val();
            if (superSkuId !== '' && superSkuId !== undefined) {
                parameters = parameters + '&superSkuId=' + superSkuId;
            }
            /*Adding additional parameter for Product comparition page */
            fromParentPage = $("#fromParentPage").val();
            if (fromParentPage !== '' && fromParentPage !== undefined && fromParentPage === 'productCompare') {
                parameters = parameters + '&fromParentPage=' + fromParentPage;
            }
        }
    } else if (opCode === 10) {
        email = $("#email_id").val();
        password = $("#password").val();
        url = document.getElementsByName("URL").value;
        parameters = parameters + '&fromPage=' + fromPage + '&opCode=' + opCode + '&logonId=' + email + '&logonPassword=' + password + '&URL=' + url;
    }
    parameters = parameters + '&requestType=ajax';
    if ((location.pathname.indexOf('Search?') > -1) || fromPage === "mylistdetails" || fromPage === "quickOrder") {
        $.fancybox.showActivity();
    }
    $.ajax({
        url: actionURL,
        type: "POST",
        data: parameters,
        success: function (data) {
            if (opCode === 1) {
                loadFancyPopup(data, fromPage, opCode);
            } else if (opCode === 2) {
                if ((data === null || data === '') && fromPage === 'shoppingList') {
                    window.location.reload();
                } else if (data !== '' && fromPage === 'shoppingList') {
                    showSuccessMessages(opCode, posn);
                } else {
                    loadFancyPopup(data, fromPage, opCode);
                    makeAutoHeight(fromPage, 2);
                }
            } else if (opCode === 9 || opCode === 10) {
                loadFancyPopup(data, fromPage, opCode);
            }
        },
        complete: function (data) {
            /*calling for adding Ellipsis in the mylist Modal.*/
            clipTextOnConfirmation();
            makeAutoHeight(fromPage, opCode);
            if (fromPage === 'shoppingList') {
                window.location.reload();
            }
        }
    });

}
$(document).ready(function () {
    'use strict';
    currentPageVal = $('#fromPage').val();
    var catEntryId = null;
    $(".addToListFromCart").click(function () {
        $("#clickAddToListButton").attr({'value': 'true'});
        if (document.all && !document.querySelector) {
            $('.grid_30').css('z-index', -1);
        }
        whichRow = $(this).parent().find('.item_copied');
        posn = $(this).offset();
        var addToListId = $(this).attr('id'),
            mySplitResult = addToListId.split("_");
        itemIndex = mySplitResult[1];
        catEntryId = $("#productId_" + itemIndex).val();
        makeAjaxCall(posn, 9, whichRow, catEntryId, '', '', '', itemIndex);
    });
    if (currentPageVal === "productDetail" && getURLParam('clickaddtolistbutton') === "true") {
        itemIndex = 1;
        if (currentPageVal !== "productDetail") {
            $("#clickAddToListButton").val(true);
        }
        if (currentPageVal === "productDetail") {
            catEntryId = $('input[name="productId"]').val();
            $("#quantity_1").val(getQtyFieldVal);
        } else if (currentPageVal === "quickView") {
            if ($("#productId_" + itemIndex).size() > 0) {
                $("#productId_" + itemIndex).val($('input[name="productId"]').val());
                $("#quantity_1").val($("#id_miniPIP__f_quantity").val());
            }
            if ($("#productId_" + itemIndex, window.parent.document).size() > 0) {
                $("#productId_" + itemIndex, window.parent.document).val($('input[name="productId"]').val());
            }
            catEntryId = $("#productId_" + itemIndex).val();
            $("#quantity_1").val($("#id_miniPIP__f_quantity").val());
        }
        parent.mylistRef = true;
        makeAjaxCall(20, 9, '', catEntryId);
    }
    if (currentPageVal === "compare" && getURLParam('clickaddtolistbutton') === "true") {
        catEntryId = getURLParam('catentryid');
        parent.mylistRef = true;
        makeAjaxCall(20, 9, '', catEntryId);
    }
});
$(document).on("click", ".myListAddToList", function () {
    'use strict';
    var $currentParent = $(this).parent(),
        catEntryId = $currentParent.find("#catEntryId").val(),
        listId = $("#listId").val(),
        listName = $("#listName").text(),
        productName = $currentParent.find("#productName").val(),
        opCode = 1;
    makeAjaxCall('', opCode, '', catEntryId, 1, listId, listName, '', productName);
});

$(document).on("click", ".toAdd", function () {
    'use strict';
    $(".model1").css('display', 'none');
    $(".model2").css('display', 'block');
    var listId = $(this).attr('id'),
        listIdValue = $(this).html(),
        itemIndex = parent.itemIndex;
    if (itemIndex === "undefined" || (itemIndex === 0 && $("#matchIndex").val() !== undefined)) {
        itemIndex = $("#matchIndex").val();
    } else if (parent.itemIndex === 0 || parent.itemIndex === 'undefined') {
        itemIndex = 1;
    }
    if (clickParam === true) {
        clickParam = getURLParam('clickaddtolistbutton');
    }
    if (popupFromPage !== null) {
        fromPage = popupFromPage;
    }
    if (popupFromPage === "shoppingCart") {
        $('#backgroundPopup1').css('display', 'none');
        catEntryId = $("#productId_" + itemIndex).val();
        quantity = $("#quantity_" + itemIndex).val();
        orderId = $("#orderId").val();
		var blindsConfig = $('#blindsConfigId_'+itemIndex).val();
		var copyGUIDRequired = $('#copyGUIDRequired_'+itemIndex).val();
    } else if (popupFromPage === "quickOrder") {
        catEntryId = THD.MyAccount.addToListFromPro.catEntryId;
        quantity = THD.MyAccount.addToListFromPro.quantity;
    } else {
        if ($('#clickAddToListButton').val() === "false" && qv_fromPage === "quickview") {
            catEntryId = getURLParam('qv_login_productid');
            quantity = getURLParam('qv_login_quantiyid');
        }
        if ($('#clickAddToListButton').val() === "false" && popupFromPage === "quickView") {
            catEntryId = $("#QV_Login_ProductId").val();
            quantity = $("#QV_Login_QuantiyId").val();
        } else if (clickParam === "true" && qv_fromPage === "quickview") {
            catEntryId = getURLParam('qv_login_productid');
            quantity = getURLParam('qv_login_quantiyid');
            clickParam = false;
        } else if (clickParam === "true" && popupFromPage === "productDetail") {
            catEntryId = getURLParam('catentryid');
            quantity = getURLParam('qv_login_quantiyid');
        } else if (clickParam === "" && popupFromPage === "productDetail") {
            catEntryId = $("input[name='productId']").val();
            quantity = $("#quantity_1").val();
        } else {
            catEntryId = $("#productId_1").val();
            quantity = $("#quantity_1").val();
        }
    }
    if (quantity === "") {
        quantity = 1;
    }
    $.fancybox.close();
    makeAjaxCall(posn, 1, '', catEntryId, quantity, listId, listIdValue,itemIndex,'',blindsConfig,copyGUIDRequired);
});

$(document).on("keypress", "#add_new_list", function () {
    'use strict';
    $(".createListBtn").css({'opacity': '1', 'cursor': 'pointer'});
});

$(document).on("focusout", "#add_new_list", function () {
    'use strict';
    var placeholder = "";
    if ($(this).val() === "") {
        $(".createListBtn").css({
            'opacity': '0.7',
            'cursor': 'auto'
        });
        placeholder = ($(this).attr('id') !== 'add_new_list') ? 'Add a new list...' : 'or create a new list...';
        $(this).val(placeholder).css('color', '#999');
    }
});

$(document).on("focus", "#add_new_list", function () {
    'use strict';
    text_box('add_new_list');
});

$(document).on("click", "#createList_PIP", function () {
    'use strict';
    var Lname = $.trim($("#add_new_list").val()),
        hasSpecialChars = false,
        iChars = "<>/`~",
        itemIndex = 0,
        iCount = 0;
    if ((Lname !== "Add a new list...") && (Lname !== "") && (Lname !== "or create a new list...")) {
        for (iCount = 0; iCount < Lname.length; iCount += 1) {
            if (iChars.indexOf(Lname.charAt(iCount)) !== -1) {
                hasSpecialChars = true;
                $("#add_new_list").css('border', '1px solid red');
                $(".listNamePopUpError").css({
                    'display': 'block',
                    'color': 'red',
                    'float': 'left',
					'padding-top':'4px'
					
                }).find(".warnTxt").html("<p><b>You have entered an invalid character. Only a-z, 0-9, ! @ # $ % ^ & * ( ) - _ + = , . ? \" \' \\ : are allowed. Please try again</b></p>&nbsp;");
                $("#add_new_list").val("");
				$(this).parents('#fancybox-content').css({'height':'auto'});
				$(this).parents('#fancybox-content').children().css({'height':'auto'});
            }
        }
        if (clickParam === true) {
            clickParam = getURLParam('clickaddtolistbutton');
        }
        if (hasSpecialChars === false) {
            itemIndex = parent.itemIndex;
            if (itemIndex === "undefined" || (itemIndex === 0 && $("#matchIndex").val() !== undefined)) {
                itemIndex = $("#matchIndex").val();
            } else if (parent.itemIndex === 0 || parent.itemIndex === 'undefined') {
                itemIndex = 1;
            }
            if (popupFromPage === "shoppingCart") {
                catEntryId = $("#productId_" + itemIndex).val();
                quantity = $("#quantity_" + itemIndex).val();
            } else if (popupFromPage === "quickOrder") {
                catEntryId = THD.MyAccount.addToListFromPro.catEntryId;
                quantity = THD.MyAccount.addToListFromPro.quantity;
            } else {
                if ($('#clickAddToListButton').val() === "false" && qv_fromPage === "quickview") {
                    catEntryId = getURLParam('qv_login_productid');
                    quantity = getURLParam('qv_login_quantiyid');
                }
                if ($('#clickAddToListButton').val() === "false" && popupFromPage === "quickView") {
                    catEntryId = $("#QV_Login_ProductId").val();
                    quantity = $("#QV_Login_QuantiyId").val();
                    clickParam = false;
                } else if (clickParam === "true" && qv_fromPage === "quickview") {
                    catEntryId = getURLParam('qv_login_productid');
                    quantity = getURLParam('qv_login_quantiyid');
                    clickParam = false;
                } else if (clickParam === "true" && popupFromPage === "productDetail") {
                    catEntryId = getURLParam('catentryid');
                    quantity = getURLParam('qv_login_quantiyid');
                } else if (clickParam === "" && popupFromPage === "productDetail") {
                    catEntryId = $("input[name='productId']").val();
                    quantity = $("#quantity_1").val();
                } else {
                    catEntryId = $("#productId_1").val();
                    quantity = $("#quantity_1").val();
                }
            }
            if (quantity === "") {
                quantity = 1;
            }
            $.fancybox.close();
            makeAjaxCall(posn, 2, '', catEntryId, quantity, '', Lname);
            $(".addToListRemove #popupCreateListFromCart, .fadingBackground").css('display', 'none');
        }
    } else {
        $("#add_new_list").css('border', '1px solid red');
		$(this).parents('#fancybox-content').css({'height':'auto'});
		$(this).parents('#fancybox-content').children().css({'height':'auto'});
		
        $(".listNamePopUpError").css({
            'display': 'block',
            'color': 'red',
            'float': 'left',
			'padding-top':'9px'
        }).find(".warnTxt").html("<p><b>Please enter a name for your list</b></p>");
    }
});

$(document).on("click", ".addToList_btn,.addtolist_act", function () {
    'use strict';
    /*if (document.all && !document.querySelector) {
      $('.grid_30,#superPIP__container,.grp_shoppersAlsoViewed,.rounded-bottom-gray').css( 'z-index', -1 );
    } */
    var itemIndex = 1,
        fromPage = $("#fromPage").val(),
        catEntryId = '';
    if (fromPage !== "productDetail") {
        $("#clickAddToListButton").val(true);
    }
    if (fromPage === "productDetail") {
	popupFromPage=""; /*MYAC - 3073 RTS defect #25718. Making empty for productDetails quick view*/
        catEntryId = $('input[name="productId"]').val();
        /*7.17:$("#quantity_1").val($("#superPIP__f_quantity").val());*/
        if (!isAppliance) {
            $("#quantity_1").val($("#buybox_quantity_field").val());
        } else if (isAppliance === true) {
            $("#quantity_1").val(getQtyFieldVal);
        }
    } else if (fromPage === "quickView") {
        if ($("#productId_" + itemIndex).size() > 0) {
            $("#productId_" + itemIndex).val($('input[name="productId"]').val());
            $("#quantity_1").val($("#buybox_quantity_field").val());
        }
        if ($("#productId_" + itemIndex, window.parent.document).size() > 0) {
            $("#productId_" + itemIndex, window.parent.document).val($('input[name="productId"]').val());
        }
        catEntryId = $("#productId_" + itemIndex).val();
        $("#quantity_1").val($("#buybox_quantity_field").val());
    }
    parent.mylistRef = true;
    makeAjaxCall(20, 9, '', catEntryId);
});
$(document).on("click", "#createList_inPopup", function () {
    'use strict';
    var $addButtonValue = $("#fancybox-content #landing_add1"),
        $listNamePopupError = $(".listNamePopUpError"),
        Lname = $.trim($addButtonValue.val()),
        Lcount = Lname.length,
        hasSpecialChars = false,
        iChars = "<>/`~",
        index = 0;
    if ((Lname !== "Add a new list...") && (Lname !== "")) {
        if (Lcount > 50) {
            $addButtonValue.css('border', '1px solid red').val('');
            $listNamePopupError.css({'display': 'block', 'color': 'red', 'float': 'left'});
            $listNamePopupError.find(".warnTxt").html("<p><b>The length of the List Name should be less than 50 characters.</b></p>");
        } else {
            for (index = 0; index < Lcount; index += 1) {
                if (iChars.indexOf(Lname.charAt(index)) !== -1) {
                    hasSpecialChars = true;
                    $addButtonValue.val('').css('border', '1px solid red');
                    $listNamePopupError.css({'display': 'block', 'color': 'red', 'float': 'left'});
                    $listNamePopupError.find(".warnTxt").html("<p><b>You have entered an invalid character. Only a-z, 0-9, ! @ # $ % ^ & * ( ) - _ + = , . ? \" \' \\ : are allowed. Please try again</b></p>&nbsp;");
                    break;
                }
            }
            if (hasSpecialChars === false) {
                fromPage = "shoppingListPopup";
                makeAjaxCall(posn, 2, '', '', '', '', Lname);
            }
        }
    } else {
        $addButtonValue.css('border', '1px solid red');
        $listNamePopupError.css({'display': 'block', 'color': 'red', 'float': 'left'});
        $listNamePopupError.find(".warnTxt").html("<p><b>Please enter a name for your list</b></p>");
    }
});
$(document).on("click", ".popupAddListClose, .closeBtn, .no_delete, #cancel_email", function () {
    'use strict';
    $.fancybox.close();
});
$(document).on("click", "#createList_cart", function () {
    'use strict';
    var Lname = $("#add_new_list").val(),
        alreadyExist = '',
        hasSpecialChars = false,
        iChars = "<>/`~",
        index = 0,
        itemIndex = null;
    if ((Lname !== "or create a new list...") && ($.trim(Lname) !== "")) {
        alreadyExist = "no";
        $(".toAdd").each(function () {
            if ($.trim($(this).html().toLowerCase()) === $.trim(Lname.toLowerCase())) {
                alreadyExist = "yes";
            }
        });
        for (index = 0; index < Lname.length; index += 1) {
            if (iChars.indexOf(Lname.charAt(index)) !== -1) {
                hasSpecialChars = true;
            }
        }
        if (alreadyExist === "yes") {
            $(".error_msg").css('display', 'block');
            $(".error_msg").html('<div class="warningIcon" style="margin-top:2px">&nbsp;</div> You already have a list with that name.<br> Please try again.');
            $("#add_new_list").css({'border': '1px solid red', 'color': '#999'}).val("or create a new list...");
            makeAutoHeight(popupFromPage, 9);
        } else if (hasSpecialChars === true) {
            $(".error_msg").css('display', 'block');
            $(".error_msg").html('<div class="warningIcon" style="margin-top:2px">&nbsp;</div> You have entered an invalid character. Only a-z, 0-9, ! @ # $ % ^ & * ( ) - _ + = , . ? \" \' \\ : are allowed. Please try again.');
            $("#add_new_list").css('border', '1px solid red');
            makeAutoHeight(popupFromPage, 9);
        } else {
            if (clickParam === true) {
                clickParam = getURLParam('clickaddtolistbutton');
            }
            itemIndex = parent.itemIndex;
            if (itemIndex === "undefined" || (itemIndex === 0 && $("#matchIndex").val() !== null)) {
                itemIndex = $("#matchIndex").val();
            } else if (parent.itemIndex === 0 || parent.itemIndex === 'undefined') {
                itemIndex = 1;
            }
            if (popupFromPage === "shoppingCart") {
                catEntryId = $("#productId_" + itemIndex).val();
                quantity = $("#quantity_" + itemIndex).val();
            } else if (popupFromPage === "quickOrder") {
                catEntryId = THD.MyAccount.addToListFromPro.catEntryId;
                quantity = THD.MyAccount.addToListFromPro.quantity;
            } else {
                if ($('#clickAddToListButton').val() === "false" && qv_fromPage === "quickview") {
                    catEntryId = getURLParam('qv_login_productid');
                    quantity = getURLParam('qv_login_quantiyid');
                }
                if ($('#clickAddToListButton').val() === "false" && popupFromPage === "quickView") {
                    catEntryId = $("#QV_Login_ProductId").val();
                    quantity = $("#QV_Login_QuantiyId").val();
                } else if (clickParam === "true" && qv_fromPage === "quickview") {
                    catEntryId = getURLParam('qv_login_productid');
                    quantity = getURLParam('qv_login_quantiyid');
                    clickParam = false;
                } else if (clickParam === "true" && popupFromPage === "productDetail") {
                    catEntryId = getURLParam('catentryid');
                    quantity = getURLParam('qv_login_quantiyid');
                } else if (clickParam === "" && popupFromPage === "productDetail") {
                    catEntryId = $("input[name='productId']").val();
                    quantity = $("#quantity_1").val();
                } else {
                    catEntryId = $("#productId_1").val();
                    quantity = $("#quantity_1").val();
                }
            }
            $.fancybox.close();
            if (quantity === "") {
                quantity = 1;
            }
            makeAjaxCall(posn, 2, '', catEntryId, quantity, '', Lname);
            $(".addToListRemove #popupCreateListFromCart, .fadingBackground").css('display', 'none');
        }
    } else {
        $(".error_msg").css('display', 'block');
        $(".error_msg").html('<div class="warningIcon" style="margin-top:-3px">&nbsp;</div>Please enter a name for your list.');
        $("#add_new_list").css('border', '1px solid red');
        makeAutoHeight(popupFromPage, 9);
        return false;
    }
});
/* Add multiple products to myList from Pro web */
THD.MyAccount.addToListFromPro = {
    catEntryId: '',
    quantity: '',
    /*This funciton converts array into URL parameters.*/
    getFromMultiArray: function (prodDet) {
        'use strict';
        var tempCatId = "",
            tempQuantity = "",
            index = 0;
        for (index = 0; index < prodDet.length; index += 1) {
            if (prodDet[index] !== null) {
                tempCatId += "catEntryId_" + (index + 1) + "=" + prodDet[index][0] + "&";
                tempQuantity += "quantity_" + (index + 1) + "=" + prodDet[index][1] + "&";
            }
        }
        /*Assignign parameter value after removing end & char*/
        this.catEntryId = tempCatId.substr(0, tempCatId.length - 1);
        this.quantity = tempQuantity.substr(0, tempQuantity.length - 1);
    },
    /*
     * In this funciton we recieve messages from IFrame and make ajax call
     * to get mylist. Also set from Page.
     *
     * @event - passed from IFrame. This includes the data we are sending from there.
     */
    receiveMessage: function (event) {
        'use strict';
        /* Do we trust the sender of this message?*/
        var domain = new RegExp(document.domain, 'gi'),
            originalData = null,
            prodData = '';
        if (!event.originalEvent.origin.match(domain)) {
            return;
        }
        originalData = JSON.parse(event.originalEvent.data);
        fromPage = originalData.fromPage;
        prodData = originalData.quickOrderData;
        if (prodData.length > 0) {
            /*"this" keword will not work as it is pointing to window object. */
            THD.MyAccount.addToListFromPro.getFromMultiArray(prodData);
            makeAjaxCall('', 9, '', this.catEntryId, this.quantity);
        }
    },
    /*Here we collect data from QOF and post it to parent. This is to overcome the same origin policy.*/
    getMultipleSku: function (prodData) {
        'use strict';
        var productList = {
            "fromPage": "quickOrder",
            "quickOrderData": prodData
        };
        parent.postMessage(JSON.stringify(productList), '*');
    }
};
$(window).bind("message", THD.MyAccount.addToListFromPro.receiveMessage);