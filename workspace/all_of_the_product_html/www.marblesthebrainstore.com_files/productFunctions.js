function ImageExists(url) {
    var img = new Image();
    img.src = url;
    return img.height != 0;
}
jQuery(document).ready(function ($) {
    if (parseInt($('#q').val()) < 1) {
        $('#addToCart').hide();
        $('#pdpNotify').show();
        if ($(".prod-price-sale").length > 0) {
            $('#pdpNotify').val('Out of Stock');
            $('#pdpNotify').removeAttr("id");
        }
    }

    if ($('.prod-store-events').length > 0) {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (parseInt(w) < 961) {
            var pse = [];
            pse.push($('.prod-store-events').map(function () { return this.outerHTML; }).get().join(''));
            $('.prod-store-events').remove();
            document.getElementById('mobiPSE').innerHTML = pse.join('');
        }
    }
    if ($('#pdpNotifyForm').length > 0) {
        var blurb = $('.email-master-wrap').html().toString();
        var date = $('#notifyInStockDate').val();
        var phone = $('#notifyPhone').val();
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (parseInt(w) < 641) {
            var phoneM = '<a href="tel:' + phone + '">' + phone + '</a>';
            phone = phoneM;
        }
        blurb = blurb.replace('[INSTOCKDATE]', date).replace('[PHONE]', phone);
        $('.email-master-wrap').html(blurb);
    }
    /*https://s.trustpilot.com/tpelements/1366078/f.json.gz
    https://s.trustpilot.com/tpelements/1366078/f.json
    https://s.trustpilot.com/tpelements/1366078/f.jsonp*/
    $.ajax({
        url: 'https://ssl.trustpilot.com/tpelements/1366078/f.jsonp',
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'trustpilot_jsonp_callback',
        success: function (data) {
            //console.log(data);
            //console.dir(data.Reviews);
            var myStringArray = data.Reviews;
            var arrayLength = myStringArray.length;
            for (var i = 0; i < 2; i++) {
                var tpRating = '<span class="rating rating-' + myStringArray[i]["TrustScore"]["Stars"] + '"></span>';
                var tpUrl = ' <a href="' + myStringArray[i]["Url"] + '" target="_blank">(Read More)</a>';
                var tpContent = '<p>' + myStringArray[i]["Content"] + tpUrl + '</p>';
                if (myStringArray[i]["Content"].length > 177) {
                    tpContent = '<p>' + myStringArray[i]["Content"].substr(0, 220) + '...' + tpUrl + '</p>';
                }
                var tpName = '<span class="tp-user">&mdash;&nbsp;' + myStringArray[i]["User"]["Name"] + '</span>';
                var tpContent = '<li>' + tpRating + tpContent + tpName + '</li>';
                $('.tp-wrap ul').append(tpContent);
            }
        },
        error: function (XHR, txtStatus, errThrown) {
            console.log('Error: ' + txtStatus);
            console.log('Error: ' + errThrown);
        }
    });
    if ($('.pdp-vid-thumb').length > 0) {
        var ytCt = $('.pdp-vid-thumb:not(.pvtv)').length;
        var vidCt = 0;
        $('.pdp-vid-thumb').each(function () {
            var localimg = $(this).attr('src');
            if (!ImageExists(localimg)) {
                if ($(this).hasClass('pvtv')) {
                    var vimurl = 'http://vimeo.com/api/v2/video/' + $(this).attr('data-id') + '.json';
                    $.ajax({
                        dataType: "json",
                        url: vimurl
                    }).done(function (data) {
                        var vimthumb = data[0]["thumbnail_large"];
                        $('.pdp-vid-thumb.pvtv').find('img').attr('src', vimthumb);
                    });
                } else {
                    if (parseInt(ytCt) > 1 && parseInt(vidCt) > 0) {
                        $(this).find('img').attr('src', '//img.youtube.com/vi/' + $(this).attr('data-id') + '/0.jpg');
                    } else {
                        $(this).find('img').attr('src', $('.pdp-img-thumb:first img').attr('src'));
                    }
                }
            }
            vidCt = vidCt + 1;
        });
    }
    if ($('.brainbuildcats').length > 0) {
        var brainBuildCats = $('.brainbuildcatshide').html().toString().split('|')[1].trim().replace('_', ' ');
        $('.brainbuildcats').addClass($('.brainbuildcatshide').html().toString().split('|')[1].trim()).find('span').html(brainBuildCats);
        $('.brainbuildcats').find('span').attr('title', $('.brainbuildcats').find('span').html());
        $('.braincat-txt').html($('.brainbuildcats').find('span').html());
    }
    $('#prodTabsWrap').tabs();
    var hdnAry = [];
    if ($().smoothproducts != undefined) {
        $('.prod-img-alt').smoothproducts();
    }
    if ($("#subscriptionPeriod option").length < 1) {
        $("#prodSubscriptionWrap").remove()
    }
    /* 
    optBuild("mix", ["size"]);
    param1 (display type)[string]: "div", "mix", "ddl" (default); 
    param2 (array of strings)[array]: when used with "mix" display, array list of options to display as swatches 
    param3 (is sequential)[bool]: applies only to "div"; specifies if div mimicks ddl sequential behavior
    */
    if ($('#options').length > 0) {
        optBuild("div");
    }
    $('#prod-actions').submit(function (e) {
        e.preventDefault();
        addToCart();
    });
    if ($('.prod-related-inner .prod-item').length > 1) {
        var wChk = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (parseInt(wChk) < 961) {
            $carousel = $(".prod-related-inner");
            $carousel.owlCarousel({
                items: 4,
                itemsDesktop: [1024, 4],
                itemsDesktopSmall: [960, 2],
                itemsTablet: [660, 2],
                itemsMobile: [480, 1],
                autoPlay: false,
                itemsScaleUp: true,
                pagination: true,
                navigation: true
            });
        } else {
            if ($('.prod-related-inner .prod-item').length > 4) {
                $carousel = $(".prod-related-inner");
                $carousel.owlCarousel({
                    items: 4,
                    itemsDesktop: [1024, 4],
                    itemsDesktopSmall: [960, 2],
                    itemsTablet: [660, 2],
                    itemsMobile: [480, 1],
                    autoPlay: false,
                    itemsScaleUp: true,
                    pagination: true,
                    navigation: true
                });
            } else if ($('.prod-related-inner .prod-item').length < 4) {
                var piW = $('.prod-related-inner .prod-item:first').outerWidth(true);
                var priW = parseInt(piW) * $('.prod-related-inner .prod-item').length;
                $('.prod-related-inner').css('width', priW + 'px');
            }
        }
    }
});

$(document).on('click touchend', '.pia-acc h3', function () {
    $(this).toggleClass('fa-minus').toggleClass('fa-plus');
    $('#' + $(this).attr('data-id')).toggle("blind", 500).toggleClass('pia-o');
}).on('click touchend', '.ptrw-count', function () {
    var revTab = $('li.prod-tab-li').index($('#prodTabLiReviews'));
    $("#prodTabsWrap").tabs('destroy');
    $("#prodTabsWrap").tabs({ active: revTab });
    var wChkSc = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var scrollToRev = $('#prodTabsNav').offset().top;
    if (wChkSc > 960) {
        scrollToRev = $('#prodTabsNav').offset().top - 200;
    }
    $("html, body").animate({
        scrollTop: scrollToRev + 'px'
    }, {
        duration: 1500,
        easing: 'swing'
    });
}).on('click', '#prod-wish', function (event) {
    var t = $(this);
    if ($("#options").length > 0) {
        var optCtr = 0,
            $optDDL = jQuery("select.opt"),
            $optDiv = jQuery(".opt-div");
        optCtr = allSelected();
        if (optCtr < ($optDDL.length + $optDiv.length)) {
            event.preventDefault();
            alert('Please select your option(s)');
        } else {
            optid = $("#options").attr("rel");
            opttext = '';
            optval = '';
            grpid = '';
            for (i = 0; i < options.length; i++) {
                if (optid == options[i].id) {
                    grpid = options[i].group_id;
                    optval = options[i].value;
                    for (var key in options[i].text) {
                        opttext = opttext + key + ":" + options[i].text[key] + ";";
                    }
                }
            }

            wishlink = t.attr("href").replace("-main.aspx?", "-functions.asp?act=showlists&");
            wishlink = wishlink + '&qty=' + $(".prod-qty").val() + '&options=' + optid + ';' + grpid + ';' + optval + '&opttext=' + opttext;
            /*console.log(wishlink); return false;*/
            $.post(wishlink, function (data) {
                if (data == "0") {
                    createDialog("You have no Lists setup. Click 'OK' to go setup your lists, or 'Cancel' to stay on this page.<br /><br /><input type='button' onclick=\"window.open('../wishlist-main.aspx','_blank'); jQuery('.ui-icon-closethick').trigger('click');\" value='OK' /> <input type='button' onclick='jQuery(\".ui-icon-closethick\").trigger(\"click\");' value='Cancel' />", 200);
                } else {
                    if (t.attr("id") == "prod-wish") {
                        t.parent().append(data);
                        $(".listbox").attr("data-in", t.data('in'));
                    } else {
                        t.parent().parent().append(data);
                        $(".listbox").attr("data-in", t.data('in'));
                    }
                    removelist = setTimeout("remove_listbox()", 4000);
                }
            });
        }
    } else {
        wishlink = t.attr("href").replace("-main.aspx?", "-functions.asp?act=showlists&");
        wishlink = wishlink + '&qty=' + $(".prod-qty").val();
        /*console.log(wishlink); return false;*/
        $.post(wishlink, function (data) {
            if (data == "0") {
                createDialog("You have no Lists setup. Click 'OK' to go setup your lists, or 'Cancel' to stay on this page.<br /><br /><input type='button' onclick=\"window.open('../wishlist-main.aspx','_blank'); jQuery('.ui-icon-closethick').trigger('click');\" value='OK' /> <input type='button' onclick='jQuery(\".ui-icon-closethick\").trigger(\"click\");' value='Cancel' />", 200);
            } else {
                if (t.attr("id") == "prod-wish") {
                    t.parent().append(data);
                    $(".listbox").attr("data-in", t.data('in'));
                } else {
                    t.parent().parent().append(data);
                    $(".listbox").attr("data-in", t.data('in'));
                }
                removelist = setTimeout("remove_listbox()", 4000);
            }
        });
    }
    return false;
}).on('click', '#prod-actions .wishbit', function (event) {
    eq = $(this).parent().data("in");
    w = $(this);
    $.post('/wishlist-functions.asp?act=addtowish&data=' + $(this).data('data') + '&prod=' + $("#prod").val(), function (data) {
        if (data == "1") {
            createDialog("This Product has already been added to that List. Visit your lists page to manage your items.");
        } else if (data == "0") {
            createDialog("You have no Lists setup. Click 'OK' to go setup your lists, or 'Cancel' to stay on this page.<br /><br /><input type='button' onclick=\"window.location='../wishlist-main.aspx';\" value='OK' /> <input type='button' onclick='jQuery(\".ui-icon-closethick\").trigger(\"click\");' value='Cancel' />", 200);
        } else {
            createDialog("The Product has been added to your list");
        }
        $(".listbox").remove();
    });
}).on('click', '#pdpNotify', function (event) {
    $('#pdpNotifyInner').fadeIn().parent('#pdpNotifyForm').slideDown();
}).on('click', '#pdpNotifyClose', function (event) {
    $('#pdpNotifyForm').slideUp().find('#pdpNotifyInner').fadeOut();
}).on('click', '#pdpNotifySend:not(.off)', function () {
    $('#pdpNotifySend').addClass('off');
    var notifyUrl = $('#notifyUrl').val();
    var YourName = $('#YourName').val();
    var YourLastName = $('#YourLastName').val();
    var YourID = $('#YourID').val();
    if (YourName == '' || YourLastName == "") {
        alert("Please enter a First and Last name.");
        $('#pdpNotifySend').removeClass('off');
        return false;
    }
    if (!validateEmail(YourID)) {
        alert("Please enter a valid email address.");
        $('#pdpNotifySend').removeClass('off');
        return false;
    }
    var opt = 0;
    if ($('.opt.on').length > 0) {
        opt = $('.opt.on').data("id");
    }
    var notifyStr = notifyUrl + '&YourName=' + YourName + '&YourLastName=' + YourLastName + '&YourID=' + YourID + '&opt=' + opt;
    jQuery.ajax({
        type: 'GET',
        url: notifyStr,
        cache: false
    }).done(function (data) {
        $('#pdpNotifySend').val('Thanks!').css({ "background": "#6686A3", "border-bottom": "3px solid #999" });
    });
}).on('click', '#pdpNotifySend.off', function () {
    return false;
}).on("click", ".subscriptionCheck", function () {
    if ($('#subscriptionCheck_1').is(':checked')) {
        if ($('#subscriptionPeriod').hasClass('hide')) {
            $('#subscriptionPeriod').removeClass('hide')
        }
    } else {
        if (!$('#subscriptionPeriod').hasClass('hide')) {
            $('#subscriptionPeriod').addClass('hide')
        }
    }
}).on("blur", "#oPrice", function () {
    curv = parseInt($(this).val());
    if (isNaN(curv)) curv = 1;
    if (curv % 5 != 0 || curv <10) {
        alert("Please enter amount in increments of $5 only. $10 minimum.");
        if (curv < 10) {
            curv = 10;
        } else {
            curv = 10;
           /* while (curv % 5 != 0 && !isNaN(curv)) {
                curv++;
            }*/ 
        }
    }
    $(this).val(curv);
});
$('.prod-detail').on('click', 'h3', function () {
    $(this).parent().toggleClass('on');
});

function addToCart() {
    /* validate form */
    var deptID = parseInt(jQuery("#dept").val()),
        prodID = parseInt(jQuery("#prod").val()),
        prodQty = parseInt(jQuery("#qty").val()),
        cMin = parseInt(jQuery("#cMin").val()),
        cMax = parseInt(jQuery("#cMax").val()),
        $cartCount = jQuery("#cart-count"),
        cartURL = [];
    cartURL.push("prod=", prodID, "&dept=", deptID, "&cat=", deptID, "&quantity=", prodQty);

    if (jQuery("#oPrice").length > 0) { cartURL.push("&overrideprice=" + jQuery("#oPrice").val()); }

    if (jQuery("#options").length > 0) {
        var optCtr = 0,
            $optDDL = jQuery("select.opt"),
            $optDiv = jQuery(".opt-div");
        optCtr = allSelected();

        if (optCtr < ($optDDL.length + $optDiv.length)) {
            alert("Please select all available options.");
            return false;
        }
        else {
            var addCart = true;
            if (cMin > 0 && prodQty < cMin) {
                alert("No fewer than " + cMin + " items may be added to cart.");
                addCart = false;
            }
            if (cMax > 1 && prodQty > cMax) {
                alert("No more than " + cMax + " items may be added to cart.");
                addCart = false;
            }
            //if (prodQty > 0 && prodQty > parseInt(optArray[0].quantity)) {
            if (prodQty > 0 && prodQty > parseInt(jQuery('.opt.on').attr('data-qty'))) {
                alert("There are not enough products on hand to complete the order.");
                addCart = false;
            }
            if (addCart) {
                cartURL.push("&options=" + jQuery("#options").val());
            }
            else {
                return false;
            }
        }
    }
    else {
        if (cMin > 0 && prodQty < cMin) {
            alert("No fewer than " + cMin + " items may be added to cart.");
            return false;
        }
        if (cMax > 1 && prodQty > cMax) {
            alert("No more than " + cMax + " items may be added to cart.");
            return false;
        }
        if (prodQty > parseInt(jQuery('#q').val())) {
            alert("There are not enough products on hand to complete the order.");
            return false;
        }
    }
    var subscriptionCheck = jQuery('.subscriptionCheck:checked').val();
    if (subscriptionCheck == 'yes') {
        if (parseInt(jQuery('#subscriptionPeriod').val()) != 0) {
            var autoFill = jQuery('#subscriptionPeriod').val();
            var currentdate = new Date();
            var myDT = (currentdate.getMonth() + 1) + "/" + currentdate.getDay() + "/" + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
            cartURL.push('&autoFill=' + autoFill + '&SubscNickname=' + 'Ordered on ' + currentdate);
        }
    }    
    cartShow(cartURL.join(""));
    return false;
}

/* Product options */
$('#option-area').on('click', 'div.opt', function () {
    $(this).toggleClass('on').siblings().removeClass('on');
    for (var i = 0; i < options.length; i++) {
        if (options[i].id == $(this).attr('data-id')) {
            var optssid = options[i].inventorystatus_id;
            if (optssid != '') {
                $('#stockStatus').html($('#ssid-' + optssid).val());
            } else {
                $('#stockStatus').html($("#hdnSS").val());
            }
            if ($(this).hasClass('off')) {
                var offoptimg = options[i].image;
                if (offoptimg != '' && offoptimg != null) {
                    $('.sp-current-big').addClass('spcb-old').clone().hide().removeClass('spcb-old').appendTo('.sp-large').children('img').each(function () { $(this).attr('src', $(this).attr('src').split('&path=')[0] + '&path=' + offoptimg) });
                    $('.spcb-old').fadeOut(function () {
                        $(this).remove();
                        $('.sp-current-big').fadeIn();
                    });
                }
            }
            break;
        }
    }
    optUpdate($(this).data("id"), $(this).data("val"), $(this).parent("div").data("seq"));
    if (parseInt($(this).data("qty")) < 1) {
        $('#addToCart').hide();
        $('#options').attr('rel', $(this).attr('data-id'));
        $('#pdpNotify').show();
    } else {
        $('#addToCart').show();
        $('#options').attr('rel', '');
        $('#pdpNotify').hide();
    }
}).on('change', 'select.opt', function () {
    optUpdate($(this).data("id"), this.value, true);
});

var textOnly = [];  //more temp stuff
function optBuild(type, ary, isSeq) {
    type = type != undefined ? type : "ddl";
    ary = ary != undefined ? ary.map(function (elem) { return elem.toLowerCase(); }) : [""];
    isSeq = isSeq != undefined && isSeq ? true : false;
    /* build array of keys */
    for (var i = 0; i < options.length; i++) {
        for (var key in options[i].text) {
            if (!(key in lookup)) {
                lookup[key] = 1;
                optType.push(key);
            }
            textOnly[i] = options[i].text;
        }
    }
    lookup = {};
    var optStr = [],
        inArray = false;
    /* build initial option display */
    for (var j = 0; j < optType.length; j++) {
        var inArray = $.inArray(optType[j].toLowerCase(), ary) > -1 ? true : false;
        switch (type) {
            case "div":
                optStr.push('<div class="opt-div ', optType[j].toLowerCase().replace(' ', '-') , '" id="div-', j ,'" data-id="' , j , '" data-seq="', isSeq,'"><label>', optType[j], '</label>');
                break;
            case "mix":
                if (inArray) {
                    optStr.push('<div class="opt-div ', optType[j].toLowerCase().replace(' ', '-'), '" id="div-', j ,'" data-id="', j, '" data-seq="true"><label>', optType[j], '</label>');
                }
                else {
                    optStr.push('<select class="opt" id="ddl-', j, '" data-id="', j, '" data-group="', optType[j] + '" data-seq="true" />');
                    optStr.push('<option value="">Select ', optType[j], '</option>');
                }
                break;
            default:
                optStr.push('<select class="opt" id="ddl-', j, '" data-id="', j, '" data-group="', optType[j] + '" data-seq="true" />');
                optStr.push('<option value="">Select ', optType[j], '</option>');
        }

        for (i = 0; i < options.length; i++) {
            for (var key in options[i].text) {
                var optVal = options[i].text[optType[j]];
                if (!(optVal in lookup)) {
                    lookup[optVal] = 1;
                    var optText = optVal != undefined ? optVal : "";
                    switch (type) {
                        case "div":
                            if (optType[j].toLowerCase() == "color") {
                                optText = options[i].swatch != "" && options[i].swatch != undefined ? '<img src="/getDynamicImage.aspx?path=' + options[i].swatch + '" />' : optVal;
                            }
                            if (optText != "") {
                                var xtraClass = '';
                                if (options[i].quantity < 1) {
                                    xtraClass = ' off';
                                }
                                optStr.push('<div class="opt' + xtraClass + '" data-id="', options[i].id, '" data-opt-val="', options[i].value, '" data-group-id="' + options[i].group_id + '" data-group="', optType[j], '" data-val="', optVal, '" data-qty="', options[i].quantity, '">', optText, '</div>');
                            }
                            break;
                        case "mix":
                            if ($.inArray(optType[j].toLowerCase(), ary) > -1) {
                                if (optType[j].toLowerCase() == "color") {
                                    optText = options[i].swatch != "" && options[i].swatch != undefined ? '<img src="/getDynamicImage.aspx?path=' + options[i].swatch + '" />' : optVal;
                                }
                                if (optText != "") {
                                    optStr.push('<div class="opt" data-id="', j, '" data-group="', optType[j], '" data-val="', optVal, '">', optText, '</div>');
                                }
                            }
                            else {
                                if (j < 1) {
                                    optStr.push('<option value="', optVal, '">', optVal, '</option>');
                                }
                            }
                            break;
                        default:
                            if (j < 1) {
                                optStr.push('<option value="', optVal, '">', optVal, '</option>');
                            }
                    }
                }
            }
        }
        switch (type) {
            case "div":
                optStr.push('</div>');
                break;
            case "mix":
                if (inArray) {
                    optStr.push('</div>');
                }
                else {
                    optStr.push('</select>');
                }
                break;
            default:
                optStr.push('</select>');
        }

    }
    if (optStr.length > 0) {
        var optHTML = optStr.join("")
        document.getElementById("option-area").innerHTML = optHTML;
    }
}
/* debug: */
var availableOpts = [];

function optUpdate(id, val, seq) {
    /*(int: group index, string: clicked value, bool: sequential update(t/f)  )*/
    var key = optType[id],
        nextId = id + 1,
        nextKey = optType[nextId];
    var test = optSelected(id, seq);
    if (!seq) {
        var test2 = optSelectedByGroup(id);
        availableOpts[id] = jQuery.grep(textOnly, function (opt, i) {
            return eval(test2);
        });
        var merged = [];
        for (var i = 0; i < availableOpts.length; i++) {
            for (x in availableOpts[i]) {
                for (y in availableOpts[i][x]) {
                    merged.push(availableOpts[i][x][y]);
                }
            }
        }
    }
    optArray = jQuery.grep(options, function (opt, i) {
        return eval(test);
    });
    /* update sequential drop-downs and divs */
    if (seq) {
        if (optArray.length == 1) {
            $('#ddl-' + nextId).html('');
            $('#div-' + nextId).html('');
        } else {
            $('#ddl-' + nextId).html('<option value="">Select ' + nextKey + '</option>');
            $('#div-' + nextId).html('<label>' + nextKey + '</label>');
        }
        for (var i = 0; i < optArray.length; i++) {
            $('#ddl-' + nextId).append('<option value="' + optArray[i].text[nextKey] + '">' + optArray[i].text[nextKey] + '</option>');
            $('#div-' + nextId).append('<div class="opt" data-id="' + nextId + '" data-group="' + nextKey + '" data-val="' + optArray[i].text[nextKey] + '" data-qty="' + optArray[i].quantity[nextKey] + '">' + optArray[i].text[nextKey] + '</div>');
        }
    }
    else {
        /* update multi-directional */
        /*var tempArray = [];
        for (var j = 0; j < optType.length; j++) {
            tempArray = tempArray.concat(optArray.map(function (elem) { return elem.text[optType[j]] }));
        }
        */
        var tempArray = merged;
        if (tempArray.length > 0) {
            $('.opt').filter(function () {
                if (tempArray.indexOf(this.getAttribute("data-val")) > -1) {
                    return true;
                }
            }).removeClass('off');
            $('.opt').not('[data-id="' + id + '"]').filter(function () {
                if (tempArray.indexOf(this.getAttribute("data-val")) < 0) {
                    return true;
                }
            }).addClass('off');
        }
    }
    /* reached last option */
    if (optArray.length == 1) {
        document.getElementById("options").value = optArray[0].group_id + ";" + optArray[0].value;
        /* set wishlist url */
        var wishURL = []
        wishURL.push("/wishlist-main.aspx?dept=", $("#dept").val(), "&prod=" + $("#prod").val(), "&options=", optArray[0].group_id, ";", optArray[0].value);
        $("#prod-wish").attr("href", wishURL.join(""));
        /* set part number */
        var $partno = $("#partno");
        if ($partno.length > 0) {
            $partno.html(optArray[0].value);
        }
        /* set price */
        if ($("#prod-price").length > 0) {
            if ($("#p").length > 0) {
                var charge = $('#p').val().replace(",", "");
                var upcharge = optArray[0].currency.replace(",", "");
                upcharge = formatCurrency(parseFloat(upcharge) + parseFloat(charge));
                $("#prod-price").html(upcharge);
            }
        }
        /* set option image */
//        var imgSize = $(".pg-quick").length > 0 ? 500 : 800;
//        $.post('/product-images.htm?optid=' + optArray[0].id + '&size=' + imgSize, function (data) {
//            var content = jQuery(data).find("a");
//            if (content.length > 0) {
//                $("#prod-opt-img, .prod-img-alt").remove();
//                $(".prod-imgs").addClass("hide");
//                $('.prod-views').append(data);
//            }
//        }).done(function () {
//            if ($().smoothproducts != undefined) {
//                $('#prod-opt-img').smoothproducts();
//            }
//        });
        var offoptimg = optArray[0].image;
        if (offoptimg != '' && offoptimg != null) {
            $('.sp-current-big').addClass('spcb-old').clone().hide().removeClass('spcb-old').appendTo('.sp-large').children('img').each(function () { $(this).attr('src', $(this).attr('src').split('&path=')[0] + '&path=' + offoptimg) });
            $('.spcb-old').fadeOut(function () {
                $(this).remove();
                $('.sp-current-big').fadeIn();
            });
        }
        $("#addToCart").removeClass("disabled").removeAttr("disabled");
    }
    else {
        document.getElementById("options").value = "";
    }
}
function optSelectedByGroup(id) {
    var $selected = $('#div-' + id + ' .on'),
        selectedObj = 'opt["' + $selected.data("group") + '"]' + ' == "' + $selected.data("val") + '"';
    return selectedObj;
}

function optSelected(max, seq) {
    var selectedObj = [];
    $('.opt').each(function (i, item) {
        if (this.nodeName == 'SELECT' && this.value != "") {
            selectedObj.push('opt.text["' + this.getAttribute("data-group") + '"]' + ' == "' + this.value + '"');
        }
        if (this.nodeName == 'DIV' && this.className.indexOf('on') >= 0) {
            selectedObj.push('opt.text["' + this.getAttribute("data-group") + '"]' + ' == "' + this.getAttribute("data-val") + '"');
        }
        if (seq) {
            return selectedObj.length <= max ;
        }
    });
    if (selectedObj.length > 0) {
        selectedObj.push('parseFloat(opt.quantity) > 0');
    }
    return selectedObj.join(' && ');
}

function allSelected() {
    var $optDDL = jQuery("select.opt"),
        $optDiv = jQuery(".opt-div"),
        ctr = 0;

    $optDDL.each(function (obj) {
        if (jQuery(this).val() != "" && jQuery(this).val() != null) {
            ctr++;
        }
    });
    $optDiv.each(function (obj) {
        if (jQuery(this).children('.on').length > 0) {
            ctr++;
        }
    });
    return ctr;
}

//Reviews BBQ
jQuery(function ($) {
    if (window.location.hash.length > 0) {
        hashDance();
    }
});
jQuery(window).bind('hashchange', function () {
    hashDance();
});
function ajaxHash(filters) {
    jQuery.bbq.pushState(filters);
}
function hashDance() {
    hashString = window.location.hash.substr(1);
    if (jQuery(".target").length > 0) {
        ajaxFilter(".target", hashString);
    }
}
var filterStr = "";
var hashStr = "";
jQuery(document).on("click", ".r-pag-prev", function () {
    var ajaxPage = jQuery('#rPage').val();
    ajaxPage = parseInt(ajaxPage) - 1;
    jQuery('#rPage').val(ajaxPage);
    filterStr = buildFilters();
    return false;
}).on("click", ".r-pag-next", function (event) {
    var ajaxPage = jQuery('#rPage').val();
    ajaxPage = parseInt(ajaxPage) + 1;
    jQuery('#rPage').val(ajaxPage);
    filterStr = buildFilters();
    return false;
}).on("click", ".r-pag-num", function () {
    var ajaxPage = jQuery(this).attr('data-page');
    jQuery('#rPage').val(ajaxPage);
    filterStr = buildFilters();
    return false;
});
function buildFilters() {
    var filterStr = "";
    //Page Number
    var rPage = jQuery('#rPage').val();
    if (rPage == '' || rPage == null) {
        rPage = 1;
    }
    filterStr = filterStr + "rPage=" + rPage;
    //Page Size
    var rPageSize = jQuery('#rPageSize').val();
    if (rPageSize == '' || rPageSize == null) {
        rPageSize = jQuery.bbq.getState('rPageSize') || '';
        if (rPageSize == '' || rPageSize == null) {
            rPageSize = 4;
        }
    }
    filterStr = filterStr + "&rPageSize=" + rPageSize;
    filterStr = filterStr + "&dept=" + jQuery('#dept').val();
    filterStr = filterStr + "&prod=" + jQuery('#prod').val();
    ajaxHash(filterStr);
    return filterStr;
}
function ajaxFilter(filterTarget, filterString) {
    jQuery('.target').addClass('loading');
    jQuery.post("/ajax-reviews.htm?" + filterString, function (data) {
        jQuery(filterTarget).replaceWith(data).removeClass('loading');
        jQuery('#rPageSize').val(jQuery.bbq.getState('rPageSize'));
    });
}