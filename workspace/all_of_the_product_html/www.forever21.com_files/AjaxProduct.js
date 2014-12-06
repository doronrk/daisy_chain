//Created by Sangmin Shim, 02/19/2010, KR web) Wish list box notice, 013-4257
var _haveBasketID = 'ctl00_haveBasket'
var _haveTotalID = 'ctl00_haveTotal';

function OpacityInit(divID) {
    //'showBasket'
    opacity(divID, 100, 0, 10);
}

function FindObject(id) {
    return document.getElementById(id)
            ? document.getElementById(id)
            : parent && parent.document.getElementById(id)
                ? parent.document.getElementById(id)
                : parent && parent.parent && parent.parent.document.getElementById(id)
                    ? parent.parent.document.getElementById(id)
                    : null;
}

//쇼핑카트/////////////////////////////////////////////////////////////////////////////////////////////////
function fn_AddToBasket(valResponseText, imgURL, divID, brandType) {
    var temp, htmlBody;
    var product_name, price, type, basket_count;
    var sku, product_name, category_name, color, color_id, size, qty, total_qty, total_amount, price, type, gift_amount;
    var preorder, formatted_price, formatted_totamt;
    eval("var response = ( " + valResponseText + ")");

    for (var i = 0; i < response.length; i++) {
        switch (response[i].title) {
            case 'type':
                type = response[i].value;
                break;
            case 'sku':
                sku = response[i].value;
                break;
            case 'product_name':
                product_name = response[i].value;
                break;
            case 'category_name':
                category_name = response[i].value;
                break;
            case 'color':
                color = response[i].value;
                break;
            case 'color_id':
                color_id = response[i].value;
                break;
            case 'size':
                size = response[i].value;
                break;
            case 'qty':
                qty = response[i].value;
                break;
            case 'total_qty':
                total_qty = response[i].value;
                break;
            case 'total_amount':
                total_amount = response[i].value;
                break;
            case 'gift_amount':
                gift_amount = response[i].value;
                break;
            case 'preorder':
                preorder = response[i].value;
                break;
            case 'price':
                price = response[i].value;
                break;
            case 'formatted_price':
                formatted_price = response[i].value;
                break;
            case 'formatted_totamt':
                formatted_totamt = response[i].value;
                break;
            default:
                break;
        }
    }
    try {
        console.log("formatted_price:" + formatted_price);
        console.log("formatted_totamt:" + formatted_totamt);
    } catch (Exception) { }
    htmlBody = '<table width="195" border="0" cellspacing="0" cellpadding="0">';
    //htmlBody += '<tr>';
    //htmlBody += '<td style="background-color:white"><img src="' + SiteImagePath + '/pages/top_mybag.gif"></td>';
    //htmlBody += '</tr>';
    htmlBody += '<tr>';
    htmlBody += '<td align="center" height="150" style="background-color:#fff; border-color: #000; border-style: solid; border-width: 1px;" >';

    if (type == 'add') {
        htmlBody += "<table width='190' border='0' cellspacing='0' cellpadding='0'><tr><td width='5'></td><td width='70'><img src='" + ImageRootPath + "intl_i/" + sku + "-" + color_id + ".jpg' width='63' height='92' alt='' /></td><td valign='top'>";

        if (preorder == '1') htmlBody += '<img src="' + SiteImagePath + '/preorder/mybagpop_pre-order.gif" border="0"><br>';
        //11/17/2010 sm.shim modified basket brand type
        htmlBody += product_name + '<br />' + formatted_price + '</td></tr>';
        htmlBody += '<tr><td align="center" colspan="3" height="30" ><a style="margin-left:0px!important;" href="' + AppPath + '/Checkout/Basket.aspx?br=' + brandType + '"><img src="' + SiteImagePath + '/checkout/mini-cart_view-bag.gif" border="0" alt="" /></a></td></tr>';
        htmlBody += '</table>';
    } else if (type == 'out') {
        htmlBody += "<font color='#ff0000'><b>" + MSG_OOS + "</b></font>";
    } else if (type == 'error') {
        htmlBody += "<font color='#ff0000'><b>" + MSG_ERR + "</b></font>";
    } else if (type == 'limitover') {
        htmlBody += "<font color='#ff0000'><b>" + MSG_LIMITOVER + "</b></font>";
    }

    htmlBody += '</td>';
    htmlBody += '</tr>';
    htmlBody += '</table>';

    fn_showBasket(htmlBody, total_qty, formatted_totamt, type);
}

function fn_showBasket(html, total_qty, total_amount, type) {

    var temp;
    //FindObject('img_mybag').src = SiteImagePath + '/pages/mybag_ro.gif';
    FindObject('showBasket').innerHTML = html;
    FindObject('showBasket').style.display = 'block';
    if (type == 'add') {
        FindObject(_haveBasketID).innerHTML = total_qty;
        FindObject(_haveTotalID).innerHTML = total_amount;
    }

    opacity('showBasket', 0, 100, 1000);
    
    timer = setTimeout('win_close()', 5000);
}

function opacity(id, opacStart, opacEnd, millisec) {
    //speed for each frame
    var speed = Math.round(millisec / 100);
    var op_timer = 0;

    //determine the direction for the blending, if start and end are the same nothing happens
    if (opacStart > opacEnd) {
        for (i = opacStart; i >= opacEnd; i--) {
            setTimeout("changeOpac(" + i + ",'" + id + "')", (op_timer * speed));
            op_timer++;
        }
    } else if (opacStart < opacEnd) {
        for (i = opacStart; i <= opacEnd; i++) {
            setTimeout("changeOpac(" + i + ",'" + id + "')", (op_timer * speed));
            op_timer++;
        }
    }
}

//change the opacity for different browsers
function changeOpac(opacity, id) {
    var obj = FindObject(id);

    var object = obj ? obj.style : null;
    if (!object) return;

    object.opacity = (opacity / 100);
    object.MozOpacity = (opacity / 100);
    object.KhtmlOpacity = (opacity / 100);
    object.filter = 'alpha(opacity=' + opacity + ')';
}

function win_close() {
    top.hidePopWin(false);

    opacity('showBasket', 100, 0, 1000);
    clearTimeout(timer);
    FindObject('showBasket').style.display = 'none';
    //FindObject('img_mybag').src = SiteImagePath + '/pages/mybag.gif';
}
