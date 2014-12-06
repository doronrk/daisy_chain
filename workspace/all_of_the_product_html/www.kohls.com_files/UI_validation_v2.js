$(document).ready(function() {
function showtoolTip(){
        $(".Enr_Id_tooltip").fadeIn();
	}
	function hidetoolTip(){
		$(".Enr_Id_tooltip").fadeOut();
	}
    function e(e, t) {
        $("#" + e).focus(function() {
            $("#" + e).val() == t && $("#" + e).val("").css("color", "#000"), $("#" + e).val(""), $("#" + e).val()
        }), $("#" + e).keypress(function() {
            $("#" + e).val() == t && $("#" + e).val("").css("color", "#000")
        }), $("#" + e).click(function() {
            $("#" + e).val() == t && $("#" + e).val("").css("color", "#000")
        }), $("#" + e).blur(function() {
            "" == $("#" + e).val() && $("#" + e).attr("value", t).css("color", "#ccc")
        })
    }

    function t(e, t) {
        "" != $.trim(e.val()) && "undefined" != e.val() && "Gift Card number" != e.val() && "Kohls Cash Number" != e.val() && ("card_dollar_amount" == e.attr("id") || "card_cent_amount" == e.attr("id") ? "" != $("#card_dollar_amount").val() && "" != $("#card_cent_amount").val() && (e.parent().find(".title").removeClass("changeTitle"), e.parent().find(".title_b").removeClass("changeTitle"), $("#card_dollar_amount, #card_cent_amount").removeClass("error"), t.hide()) : (e.parent().find(".title").removeClass("changeTitle"), e.parent().find(".title_b").removeClass("changeTitle"), e.removeClass("error"), t.hide()))
    }

    function n(e) {
        $(".server_highlight_error").removeClass("error"), $(".server_highlight_error").removeClass("modal_error"), $(".server_error").hide(), "kohls_update_billing" == e.attr("id") && $("#error").hide();
        var t = 0;
        return e.find(x).each(function() {
            $(this).hasClass(_) && "tellAFriend-su" == e.attr("id") || "kohls_update_billing" != e.attr("id") && (t += c($(this))), "checkbox" == $(this).attr("type") && (t += o($(this)));
            var n = e.find(".emailC");
            if (2 == n.length && (t += i(n, h)), $(this).hasClass(p) && "" !== $(this).val() && (t += s($(this))), $(this).hasClass(v) && "" !== $(this).val() && (t += l($(this))), $(this).hasClass(_) && "" !== $(this).val() && (t += d($(this))), $(this).hasClass(b)) {
                var r = e.find(y);
                2 == r.length && (t += a(r))
            }
        }), t > 0 ? $($.find("#error_display1")).show() : $($.find("#error_display1")).hide(), t > 0 ? !1 : !0
    }

    function a(e) {
        var n = $(e[0]),
            a = $(e[1]),
            o = !0;
        return "" == $.trim(n.val()) && "" == $.trim(a.val()) ? (n.parent().find(".eCardErrMargin").addClass("error-inline"), n.parent().find(".error-invalid").removeClass("error-inline"), n.parent().find(".error-invalid").hide(), 0) : "" != $.trim(n.val()) || "" != $.trim(a.val()) ? (n.parent().find(u).hide(), n.parent().find(".error-invalid").hide(), t(n, n.parent().find(u)), t(a, a.parent().find(u)), t(n, n.parent().find(".error-invalid")), t(a, a.parent().find(".error-invalid")), n.parent().find(".eCardErrMargin").addClass("error-inline"), n.parent().find(".error-invalid").removeClass("error-inline"), isNaN(n.val()) && (n.parent().find(".title").addClass("changeTitle"), n.parent().find(".title_b").addClass("changeTitle"), n.addClass("error"), n.parent().find(".eCardErrMargin").removeClass("error-inline"), n.parent().find(".error-invalid").addClass("error-inline"), o = !1), "" == $.trim(n.val()) && "" != $.trim(a.val()) && (n.parent().find(".title").addClass("changeTitle"), n.parent().find(".title_b").addClass("changeTitle"), n.addClass("error"), n.parent().find(".eCardErrMargin").removeClass("error-inline"), n.parent().find(".error-invalid").addClass("error-inline"), o = !1), isNaN(a.val()) && (a.parent().find(".title").addClass("changeTitle"), a.parent().find(".title_b").addClass("changeTitle"), a.addClass("error"), a.parent().find(".eCardErrMargin").removeClass("error-inline"), a.parent().find(".error-invalid").addClass("error-inline"), o = !1), "" == $.trim(a.val()) && "" != $.trim(n.val()) && (a.parent().find(".title").addClass("changeTitle"), a.parent().find(".title_b").addClass("changeTitle"), a.addClass("error"), a.parent().find(".eCardErrMargin").removeClass("error-inline"), a.parent().find(".error-invalid").addClass("error-inline"), o = !1), o || n.parent().find(u).css("display", "block"), o ? 0 : 1) : void 0
    }

    function o(e) {
        var t = !1;
        return e.is(":checked") ? t = !0 : (e.parent().find(u).css("display", "block"), e.addClass("chkBoxErr")), t ? 0 : 1
    }

    function i(e, t) {
        var n = $(e[0]),
            a = $(e[1]);
        if (n.parent().find(m).hide(), a.parent().find(m).hide(), n.parent().find(t).hide(), a.parent().find(t).hide(), "" == $.trim(n.val()) && "" == $.trim(a.val())) return 0;
        var o = 0;
        return C.test(n.val()) || "" == $.trim(n.val()) || (r(n, ".email-invalid"), o = 1), C.test(a.val()) || "" == $.trim(a.val()) || (r(a, ".email-invalid"), o = 1), "" != $.trim(n.val()) && "" != $.trim(a.val()) && C.test(n.val()) && C.test(a.val()) && $.trim(n.val().toLowerCase()) != $.trim(a.val().toLowerCase()) && (r(n, t), r(a, t), o = 1), $(n.parents().find("form").find(".error:first")).focus(), o
    }

    function r(e, t) {
        e.parent().find(t).css("display", "block"), e.addClass("modal_error"), e.parent().find(".title").addClass("changeTitle"), e.parent().find(".title_b").addClass("changeTitle"), e.parent().find(":input").addClass("error")
    }

    function s(e) {
        var t = !0;
        return C.test($.trim(e.val())) || "" === $.trim(e.val()) ? (t = !0, e.parent().find(m).hide()) : (t = !1, "egiftCardForm" == e.parents().find("form").attr("id") ? (e.parent().find(m).css("display", "block"), e.parent().find(".title").addClass("changeTitle"), e.parent().find(".title_b").addClass("changeTitle"), e.parent().find(":input").addClass("error")) : e.parent().find(m).show()), t ? 0 : 1
    }

    function l(e) {
        var t = /^([\sA-Za-z0-9]+)$/,
            n = !0;
        return $.trim(e.val()).length < 2 || $.trim(e.val()).length > 50 || !t.test($.trim(e.val())) ? (n = !1, e.parent().find(u).hide(), e.parent().find(g).show()) : (n = !0, e.parent().find(g).hide()), n ? 0 : 1
    }

    function d(e) {
        var t = !0;
        return $.trim(e.val()).length < 2 || $.trim(e.val()).length > 100 ? (t = !1, "egiftCardForm" == e.parents().find("form").attr("id") ? (e.parent().find(f).css({
            display: "block",
            color: "#FF0000"
        }), e.parent().find(".title").addClass("changeTitle"), e.parent().find(".title_b").addClass("changeTitle"), e.parent().find(":input").addClass("error")) : e.parent().find(f).show()) : (t = !0, e.parent().find(f).hide()), t ? 0 : 1
    }

    function c(e) {
        var t = e.parent().find(u);
        return "cardMonth_cd" == e.attr("id") || "cardYear_cd" == e.attr("id") ? "" == $("#cardMonth_cd").val() || "" == $("#cardYear_cd").val() ? (t.css("display", "inline"), e.parent().find(".title").addClass("changeTitle"), e.parent().find(".title_b").addClass("changeTitle"), "" == $("#cardMonth_cd").val() && $("#cardMonth_cd").addClass("error"), "" == $("#cardYear_cd").val() && $("#cardYear_cd").addClass("error"), 1) : (t.hide(), 0) : "" == e || "undefined" == e || "" == $.trim(e.val()) ? (e.parent().find(g).hide(), e.parent().find(m).hide(), "egiftCardForm" == t.parents().find("form").attr("id") ? (t.css("display", "block"), e.parent().find(".title").addClass("changeTitle"), e.parent().find(".title_b").addClass("changeTitle"), e.parent().find(":input").addClass("error")) : (t.css("display", "inline"), e.parent().find(".title").addClass("changeTitle"), e.parent().find(".title_b").addClass("changeTitle"), e.parent().find(":input").addClass("error")), 1) : (t.hide(), 0)
    }
    var u = ".error-inline",
        p = "email",
        m = ".email-invalid",
        h = ".email-error",
        g = ".name-invalid",
        f = ".message-invalid",
        v = "name1",
        _ = "message",
        y = ".number",
        b = "number";
    $.find("#error_display"), $(".error-inline").hide(), $(".email-invalid").hide(), $(".name-invalid").hide(), $(".message-invalid").hide(), $("#gift-card-number").attr("value", "Gift Card number"), $("#gift-card-number").each(function() {
        e($(this).attr("id"), "Gift Card number")
    }), $("#kohls-cash-number").attr("value", "Kohls Cash Number"), $("#kohls-cash-number").each(function() {
        e($(this).attr("id"), "Kohls Cash Number")
    });
    var w = /^\d$/,
        C = /^\s*([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4}\s*)+$/,
        x = "input[type=text],input[type=password],textarea, select";
    $("input[type=checkbox]").click(function() {
        $(this).is(":checked") && ($(this).parent().find(u).hide(), $(this).removeClass("chkBoxErr"))
    }), $("#city .input-box").blur(function() {
        $(this).parent("#city").find(".error-invalid").removeClass("error-inline")
    }), $(".s-addtoBag1").live("click", function() {
        var e = $(".s-color-here").val(),
            t = $(".s-size-here").val(),
            n = $(".s-quantitybox").val();
        return $(".aadToBag_product").submit(), e ? ($("#s-select-color-here").addClass("s-error-red"), $("#sSelectSizeBox").addClass("s-error-red"), $("#quantity").addClass("s-error-red"), $(".s-quantitybox").addClass("error"), $("#error_display").show(), "1" == e && $("#s-select-color-here").removeClass("s-error-red"), "1" == t && $("#sSelectSizeBox").removeClass("s-error-red"), "0" != n && n >= "1" && ($("#quantity").removeClass("s-error-red"), $(".s-quantitybox").removeClass("error")), !1) : ($("#error_display").hide(), window.parent.$(".showQuickChkoutPanel").trigger("click"), void 0)
    }), 
    $(".s-addtoBag").click(function() {
        var e = $("#collectionType").val();
        if($("#error").remove(), "collectionB" == e) {
            var t = $(this).attr("id"),
                n = t.split("_"),
                a = n[1],
                o = $("#" + a).find("#variantsCount"),
                i = o.val(),
                r = $("#" + a).find(".colormap").val(),
                s = $("#" + a).find(".primarySize").val(),
                l = $("#" + a).find(".secSize").val(),
                d = $("#" + a).find("#quantity").find(".add_cart_quantity").attr("value");
            ("{}" == r || "" == r || 2 == r.length) && $("#" + a).find(".s-color-here").attr("value", "1"), ("{}" == s || "" == s || 2 == s.length) && $("#" + a).find(".s-waist-here").attr("value", "1"), ("{}" == l || "" == l || 2 == l.length) && $("#" + a).find(".s-inseem-here").attr("value", "1"), "" != d && $("#" + a).find(".s-quantity-here").attr("value", "1"), "" == d && $("#" + a).find(".s-quantity-here").attr("value", "");
            var c = $("#" + a).find(".preSelectedColorId").val();
            if ("" != c && void 0 != c) {
                var u = c.split("_");
                "" != u[1] && void 0 != u[1] && $("#" + a).find(".s-color-here").attr("value", "1")
            }
            var p = $("#" + a).find(".preSelectedPrimarySize").val();
            if ("" != p && void 0 != p) {
                var m = p.split("_");
                "" != m[1] && void 0 != m[1] && $("#" + a).find(".s-waist-here").attr("value", "1")
            }
            var h = $("#" + a).find(".preSelectedSecondarySize").val();
            if ("" != h && void 0 != h) {
                var m = h.split("_");
                "" != m[1] && void 0 != m[1] && $("#" + a).find(".s-inseem-here").attr("value", "1")
            }
            var g = $("#" + a).find(".s-color-here").val(),
                f = $("#" + a).find(".s-size-here").val(),
                v = $("#" + a).find(".s-waist-here").val(),
                _ = $("#" + a).find(".s-inseem-here").val(),
                y = $("#" + a).find(".s-quantity-here").val();
            if (i > 0) {
                if ("1" != g || "1" != v || "1" != _ || "1" != y) {
                    var b = "",
                        w = "",
                        C = "",
                        x = "",
                        B = "",
                        k = $("#" + a).find("#sSelectWaistSizeBox").attr("dir"),
                        T = $("#" + a).find("#sSelectInseamSizeBox").attr("dir"),
                        E = $("#" + a).find("#s-select-color-here").attr("dir"),
                        S = $("#" + a).find("#checkQuantity").attr("dir");
                    $("#" + a).find("#s-select-color-here").addClass("s-error-red"), $("#" + a).find("#sSelectSizeBox").addClass("s-error-red"), $("#" + a).find("#sSelectWaistSizeBox").addClass("s-error-red"), $("#" + a).find("#sSelectInseamSizeBox").addClass("s-error-red"),$(".size-holder").addClass("pdp-s-error-yellow"), showtoolTip(),$("#" + a).find("#quantity").addClass("s-error-red"), "1" != v && (b = "<li>" + k + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != _ && (C = "<li>" + T + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != g && (w = "<li>" + E + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != y && (x = "<li>" + S + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50));
                    var B = w + b + C + x;
                    return $("#error_display1 ol").empty().append(B), $("#error_display1").show(), "1" == g && $("#" + a).find("#s-select-color-here").removeClass("s-error-red"), "1" == f && $("#" + a).find("#sSelectSizeBox").removeClass("s-error-red") && $(".size-holder").removeClass("pdp-s-error-yellow"), "1" == v && $("#" + a).find("#sSelectWaistSizeBox").removeClass("s-error-red"), "1" == _ && $("#" + a).find("#sSelectInseamSizeBox").removeClass("s-error-red"), "1" == y && $("#" + a).find("#quantity").removeClass("s-error-red"), !1
                }
                return $("#error_display1").hide(), !0
            }
        } else {
            var I = $("#variantsCount").val(),
                r = $(".colormap").val(),
                s = $(".primarySize").val(),
                l = $(".secSize").val(),
                d = $("#quantity").find(".add_cart_quantity").attr("value");
            ("{}" == r || "" == r || 2 == r.length) && $(".s-color-here").attr("value", "1"), ("{}" == s || "" == s || 2 == s.length) && $(".s-waist-here").attr("value", "1"), ("{}" == l || "" == l || 2 == l.length) && $(".s-inseem-here").attr("value", "1"), "" != d && $(".s-quantity-here").attr("value", "1"), "" == d && $(".s-quantity-here").attr("value", "");
            var c = $(".preSelectedColorId").val();
            if ("" != c && void 0 != c) {
                var u = c.split("_");
                "" != u[1] && void 0 != u[1] && $(".s-color-here").attr("value", "1")
            }
            var p = $(".preSelectedPrimarySize").val();
            if ("" != p && void 0 != p) {
                var m = p.split("_");
                "" != m[1] && void 0 != m[1] && $(".s-waist-here").attr("value", "1")
            }
            var h = $(".preSelectedSecondarySize").val();
            if ("" != h && void 0 != h) {
                var m = h.split("_");
                "" != m[1] && void 0 != m[1] && $(".s-inseem-here").attr("value", "1")
            }
            var g = $(".s-color-here").val(),
                f = $(".s-size-here").val(),
                v = $(".s-waist-here").val(),
                _ = $(".s-inseem-here").val(),
                y = $(".s-quantity-here").val();
            if ( I > 0 ) {
						if ("1" != g || "1" != v || "1" != _ || "1" != y) {
						    var b = "",
						        w = "",
						        C = "",
						        x = "",
						        B = "",
						        k = $("#sSelectWaistSizeBox").attr("dir"),
						        T = $("#sSelectInseamSizeBox").attr("dir"),
						        E = $("#s-select-color-here").attr("dir"),
						        S = $("#checkQuantity").attr("dir");
						    $("#s-select-color-here").addClass("s-error-red"), $("#sSelectSizeBox").addClass("s-error-red"), $("#sSelectWaistSizeBox").addClass("s-error-red"), $("#sSelectInseamSizeBox").addClass("s-error-red"),$(".size-holder").addClass("pdp-s-error-yellow"),showtoolTip(),$("#quantity").addClass("s-error-red"), "1" != v && (b = "<li>" + k + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != _ && (C = "<li>" + T + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != g && (w = "<li>" + E + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != y && (x = "<li>" + S + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50));
						    var B = w + b + C + x;
							var list=B.split('<li>');
							var list1=list[1].split('</li>');
						    return $("#skuerror").html(list1[0]), $("#error_display1").show(), "1" == g && $("#s-select-color-here").removeClass("s-error-red"), "1" == f && $("#sSelectSizeBox").removeClass("s-error-red"), "1" == v && $("#sSelectWaistSizeBox").removeClass("s-error-red") && $(".size-holder").removeClass("pdp-s-error-yellow"), "1" == _ && $("#sSelectInseamSizeBox").removeClass("s-error-red"), "1" == y && $("#quantity").removeClass("s-error-red"), !1
						} else {
							AjaxPDP.addItemToBag(".aadToBag_product", function(data) {
								addProductToBag(data);
							});
							if( $('body').find('.your_price_lable').length >0){
								var produrl=window.location.href;
								produrl=produrl.split('?');
								var paramurl=produrl[1].split('&');
								if(paramurl[1]=="isFromBuyOverlay=true")
									{
									window.location.href=produrl[0];
									}
								
							}
							// closing ajaxPDP							
						} // closing if ("1" != g || "1" != v || "1" != _ || "1" != y)
            } else if (I == 0 ) { // if I is not greather than 0 
				AjaxPDP.addItemToBag(".aadToBag_product", function(data) {
					addProductToBag(data);
				});
				if( $('body').find('.your_price_lable').length >0){
					var produrl=window.location.href;
					produrl=produrl.split('?');
					var paramurl=produrl[1].split('&');
					if(paramurl[1]=="isFromBuyOverlay=true")
						{
						window.location.href=produrl[0];
						}
					
				}// closing ajaxPDP
            } // closing if I is greather than 0 
                $("#error_display1").hide();
        } // closing if($("#error").remove(), "collectionB" == e) 
    }), $(x).live("blur", function() {
        t($(this), $(this).parent().find(u)), t($(this), $(this).parent().find(u)), t($(this), $(this).parent().find(m)), t($(this), $(this).parent().find(g)), t($(this), $(this).parent().find(f)), t($(this), $(this).parent().find(h))
    }),$(".pdpAddGift").live("click", function() { 
        //Function added for ATG-5350
        var collectionGetPDP = $("#is_get_pdp_qualified").attr("value");
        if(collectionGetPDP != undefined && collectionGetPDP == 'getPDP'){
var I = $("#variantsCount").val(),
    r = $(".colormap").val(),
    s = $(".primarySize").val(),
    l = $(".secSize").val(),
    d = $("#quantity").find(".add_cart_quantity").attr("value");
("{}" == r || "" == r || 2 == r.length) && $(".s-color-here").attr("value", "1"), ("{}" == s || "" == s || 2 == s.length) && $(".s-waist-here").attr("value", "1"), ("{}" == l || "" == l || 2 == l.length) && $(".s-inseem-here").attr("value", "1"), "" != d && $(".s-quantity-here").attr("value", "1"), "" == d && $(".s-quantity-here").attr("value", "");
var c = $(".preSelectedColorId").val();
if ("" != c && void 0 != c) {
    var u = c.split("_");
    "" != u[1] && void 0 != u[1] && $(".s-color-here").attr("value", "1")
}
var p = $(".preSelectedPrimarySize").val();
if ("" != p && void 0 != p) {
    var m = p.split("_");
    "" != m[1] && void 0 != m[1] && $(".s-waist-here").attr("value", "1")
}
var h = $(".preSelectedSecondarySize").val();
if ("" != h && void 0 != h) {
    var m = h.split("_");
    "" != m[1] && void 0 != m[1] && $(".s-inseem-here").attr("value", "1")
}
var g = $(".s-color-here").val(),
    f = $(".s-size-here").val(),
    v = $(".s-waist-here").val(),
    _ = $(".s-inseem-here").val(),
    y = $(".s-quantity-here").val();
if (I > 0) {
    if ("1" != g || "1" != v || "1" != _ || "1" != y) {
        var b = "",
            w = "",
            C = "",
            x = "",
            B = "",
            k = $("#sSelectWaistSizeBox").attr("dir"),
            T = $("#sSelectInseamSizeBox").attr("dir"),
            E = $("#s-select-color-here").attr("dir"),
            S = $("#checkQuantity").attr("dir");
        $("#s-select-color-here").addClass("s-error-red"), $("#sSelectSizeBox").addClass("s-error-red"), $("#sSelectWaistSizeBox").addClass("s-error-red"), $("#sSelectInseamSizeBox").addClass("s-error-red"), $("#quantity").addClass("s-error-red"), "1" != v && (b = "<li>" + k + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != _ && (C = "<li>" + T + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != g && (w = "<li>" + E + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != y && (x = "<li>" + S + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50));
        var B = w + b + C + x;
                                                        var list=B.split('<li>');
                                                        var list1=list[1].split('</li>');
                                            return $("#skuerror").html(list1[0]), $("#error_display1").show(), "1" == g && $("#s-select-color-here").removeClass("s-error-red"), "1" == f && $("#sSelectSizeBox").removeClass("s-error-red"), "1" == v && $("#sSelectWaistSizeBox").removeClass("s-error-red"), "1" == _ && $("#sSelectInseamSizeBox").removeClass("s-error-red"), "1" == y && $("#quantity").removeClass("s-error-red"), !1
    }
    return $("#error_display1").hide(), !0
}  
}else {
    var I = $("#variantsCount").val(),
    r = $(".colormap").val(),
    s = $(".primarySize").val(),
    l = $(".secSize").val(),
    d = $("#quantity").find(".add_cart_quantity").attr("value");
("{}" == r || "" == r || 2 == r.length) && $(".s-color-here").attr("value", "1"), ("{}" == s || "" == s || 2 == s.length) && $(".s-waist-here").attr("value", "1"), ("{}" == l || "" == l || 2 == l.length) && $(".s-inseem-here").attr("value", "1"), "" != d && $(".s-quantity-here").attr("value", "1"), "" == d && $(".s-quantity-here").attr("value", "");
var c = $(".preSelectedColorId").val();
if ("" != c && void 0 != c) {
    var u = c.split("_");
    "" != u[1] && void 0 != u[1] && $(".s-color-here").attr("value", "1")
}
var p = $(".preSelectedPrimarySize").val();
if ("" != p && void 0 != p) {
    var m = p.split("_");
    "" != m[1] && void 0 != m[1] && $(".s-waist-here").attr("value", "1")
}
var h = $(".preSelectedSecondarySize").val();
if ("" != h && void 0 != h) {
    var m = h.split("_");
    "" != m[1] && void 0 != m[1] && $(".s-inseem-here").attr("value", "1")
}
var g = $(".s-color-here").val(),
    f = $(".s-size-here").val(),
    v = $(".s-waist-here").val(),
    _ = $(".s-inseem-here").val(),
    y = $(".s-quantity-here").val();
if ( I > 0 ) {
			if ("1" != g || "1" != v || "1" != _ || "1" != y) {
			    var b = "",
			        w = "",
			        C = "",
			        x = "",
			        B = "",
			        k = $("#sSelectWaistSizeBox").attr("dir"),
			        T = $("#sSelectInseamSizeBox").attr("dir"),
			        E = $("#s-select-color-here").attr("dir"),
			        S = $("#checkQuantity").attr("dir");
			    $("#s-select-color-here").addClass("s-error-red"), $("#sSelectSizeBox").addClass("s-error-red"), $("#sSelectWaistSizeBox").addClass("s-error-red"), $("#sSelectInseamSizeBox").addClass("s-error-red"),$(".size-holder").addClass("pdp-s-error-yellow"),showtoolTip(),$("#quantity").addClass("s-error-red"), "1" != v && (b = "<li>" + k + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != _ && (C = "<li>" + T + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != g && (w = "<li>" + E + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50)), "1" != y && (x = "<li>" + S + "</li>", window.parent.$("#fancybox-content").height(window.parent.$("#fancybox-frame").height() + 50));
			    var B = w + b + C + x;
				var list=B.split('<li>');
				var list1=list[1].split('</li>');
			    return $("#skuerror").html(list1[0]), $("#error_display1").show(), "1" == g && $("#s-select-color-here").removeClass("s-error-red"), "1" == f && $("#sSelectSizeBox").removeClass("s-error-red"), "1" == v && $("#sSelectWaistSizeBox").removeClass("s-error-red") && $(".size-holder").removeClass("pdp-s-error-yellow"), "1" == _ && $("#sSelectInseamSizeBox").removeClass("s-error-red"), "1" == y && $("#quantity").removeClass("s-error-red"), !1
			} else {
				AjaxPDP.addItemToBag(".aadToBag_product", function(data) {
					addProductToBag(data);
				}) // closing ajaxPDP							
			} // closing if ("1" != g || "1" != v || "1" != _ || "1" != y)
} else if (I == 0 ) { // if I is not greather than 0 
	AjaxPDP.addItemToBag(".aadToBag_product", function(data) {
		addProductToBag(data);
	}) // closing ajaxPDP
} // closing if I is greather than 0 
    $("#error_display1").hide();
}
});
try {
        $.validator.addMethod("checkEmailFormat", function() {
            var e = $("#modal_login_email_field").val(),
                t = $("#email_err"),
                n = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return n.test(e) ? !0 : (t.text("Please Enter email in proper format"), !1)
        }, "Please Enter email in proper format"), $.validator.addMethod("validatePhone", function(e, t) {
            if (!$(t).hasClass("ignore")) {
                if ($(t).parent().find(".error-invalid").removeClass("error-inline"), $(t).parent().find(".pClass:first").addClass("error-inline"), $(t).parent().find(".error-invalid").hide(), $(t).parent().find(".error-inline").hide(), "" == $.trim($(t).val())) return $(t).parent().find(".error-invalid").removeClass("error-inline"), $(t).parent().find(".pClass:first").addClass("error-inline"), !1;
                if (isNaN($.trim(e)) || $.trim(e).length != $(t).attr("maxlength")) return $(t).parent().find(".error-inline").removeClass("error-inline"), $(t).parent().find(".error-invalid").addClass("error-inline"), !1
            }
            return !0
        }, ""), $.validator.addMethod("validateExp", function(e, t) {
            return $(t).hasClass("required") ? "" == $("#cc_month_cd").val() || "" == $("#cc_year_cd").val() || "0" == $("#cc_month_cd").val() || "0" == $("#cc_year_cd").val() ? !1 : !0 : !0
        }, ""), $.validator.addMethod("emailCheck", function(e, t) {
            return $(t).parent().find(".email-invalid").hide(), $(t).parent().find(".error-inline").hide(), "" == $.trim(e) || C.test($.trim(e)) ? "" == $.trim(e) ? ($(t).parent().find(".email-invalid").removeClass("error-inline"), $(t).parent().find(".fleft:first").addClass("error-inline"), !1) : !0 : ($(t).parent().find(".error-inline").removeClass("error-inline"), $(t).parent().find(".email-invalid").addClass("error-inline"), !1)
        }, ""), $.validator.addMethod("noSpace", function(e, t) {
            return $(t).hasClass("ignore") ? !0 : "" == $.trim(e) || isNaN($.trim(e)) || 5 != $.trim(e).length ? ($(t).parent().find(".error-invalid").removeClass("error-inline"), $(t).parent().find(".error-count").removeClass("error-inline"), $(t).parent().find(".zipClass").addClass("error-inline"), "" == $.trim(e) ? ($(t).parent().find(".error-invalid").removeClass("error-inline"), $(t).parent().find(".error-count").removeClass("error-inline"), $(t).parent().find(".zipClass").addClass("error-inline"), !1) : isNaN($.trim(e)) ? ($(t).parent().find(".error-inline").removeClass("error-inline"), $(t).parent().find(".error-count").removeClass("error-inline"), $(t).parent().find(".error-invalid").addClass("error-inline"), !1) : 5 != $.trim(e).length ? ($(t).parent().find(".error-inline").removeClass("error-inline"), $(t).parent().find(".error-invalid").removeClass("error-inline"), $(t).parent().find(".error-count").addClass("error-inline"), !1) : void 0) : !0
        }, ""), $.validator.addMethod("onlyString", function(e, t) {
            $(t).parent().find(".emptyCity").hide(), $(t).parent().find(".error-invalid").hide(), $(t).parent().find(".emptyCity").addClass("error-inline"), $(t).parent().find(".error-invalid").removeClass("error-inline");
            var n = /[^a-zA-Z \'\.\-]+/g;
            return "" == $.trim(e) || n.test($.trim(e)) ? "" == $.trim(e) ? ($(t).parent().find(".emptyCity").addClass("error-inline"), $(t).parent().find(".error-invalid").removeClass("error-inline"), !1) : ($(t).parent().find(".error-inline").removeClass("error-inline"), $(t).parent().find(".error-invalid").addClass("error-inline"), !1) : !0
        }, ""), $.validator.addMethod("validateCardNumber", function(e, t) {
            return $(t).parent().find(".emptyCardNo").hide(), $(t).parent().find(".error-invalid").hide(), $(t).parent().find(".emptyCardNo").addClass("error-inline"), $(t).parent().find(".error-invalid").removeClass("error-inline"), "" == $.trim(e) ? ($(t).parent().find(".emptyCardNo").addClass("error-inline"), $(t).parent().find(".error-invalid").removeClass("error-inline"), !1) : !w.test($.trim(e)) && ($.trim(e).length > 16 || $.trim(e).length < 12) ? ($(t).parent().find(".error-inline").removeClass("error-inline"), $(t).parent().find(".error-invalid").addClass("error-inline"), !1) : !0
        }, ""), $.validator.addMethod("notNone", function(e) {
            return "0" != e ? !0 : !1
        }, ""), $.validator.addMethod("phoneValid", function() {
            var e = $(".phoneValid1").val(),
                t = $(".phoneValid2").val(),
                n = $(".phoneValid3").val(),
                a = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;
            return "" != e && "" != t && "" != n && a.test(e) && a.test(t) && a.test(n) ? !0 : !1
        }, ""), $.validator.addMethod("emailValid", function() {
            var e = $(".email1").val(),
                t = $(".email2").val();
            return $.trim(e.toUpperCase()) === $.trim(t.toUpperCase()) ? !0 : !1
        }, ""), $.validator.addMethod("passwordValid", function() {
            var e = $(".password1").val(),
                t = $(".password2").val();
            return e === t ? !0 : !1
        }, ""), $(".unsub-su").validate({
            onfocusout: !1,
            onkeyup: !1,
            onfocusin: !1,
            rules: {
                txt_email: {
                    emailValid: !0
                }
            },
            messages: {
                txt_email: {
                    emailValid: ""
                }
            }
        }), $.validator.addMethod("numberValid", function() {
            var e = $.trim($(".search-su").val()),
                t = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;
            return "" != e && t.test(e) && "Gift Card number" != e ? !0 : !1
        }, ""), $("#shopping_cart_form").validate({
            onfocusout: !1,
            onkeyup: !1
        }), $("#BVEditForm").validate({
            onfocusout: !1,
            onkeyup: !1,
            messages: {
                questionsummary: "You must enter a question.",
                usernickname: "You must enter a nickname.",
                useremail: "You must enter an email address."
            },
            submitHandler: function() {
                return $(".ask-A-Question-su-1").trigger("click"), !0
            }
        }), $("#kohls_register_optional_info").validate({
            onfocusout: !1,
            onkeyup: !1,
            onclick: !1,
            ignore: ":disabled",
            ignore: ":hidden",
            ignore: ".ignore",
            rules: {
                bill_city: {
                    onlyString: !0
                },
                city: {
                    onlyString: !0
                },
                postal: {
                    required: !0,
                    noSpace: !0
                },
                bill_postal: {
                    required: !0,
                    noSpace: !0
                },
                cardNum: {
                    minlength: 5,
                    maxlength: 16
                }
            },
            errorContainer: "#error_display"
        }), $(".kohls_checkout_create").validate({
            onfocusout: !1,
            onkeyup: !1,
            onclick: !1,
            ignore: ":disabled",
            ignore: ":hidden",
            rules: {
                acc_password: {
                    required: !0,
                    minlength: 5
                },
                acc_confirmPassword: {
                    required: !0,
                    passwordValid: !0
                }
            },
            messages: {
                acc_password: {
                    minlength: "Must be at least 5 characters long."
                },
                acc_confirmPassword: {
                    passwordValid: "The Confirm Password you entered has an error. It does not match your Password. Please enter a Confirm Password that exactly matches your Password. (Keep in mind that Passwords are case sensitive. Check for spelling and space errors.)"
                }
            }
        }), $(".prod-container-s-1").validate({
            onfocusout: !1,
            onkeyup: !1,
            ignore: "",
            rules: {
                add_to_quantity: {
                    notNone: !0
                }
            },
            messages: {
                add_to_quantity: "Please select a quantity.",
                add_to_color: "Please select a color.",
                add_to_size: "Please select a waist."
            },
            submitHandler: function() {
                return $("#addToBag10").trigger("click"), $("#error_display").hide(), $(".prod-container-s-1 .add2bag").attr("value", "Update Bag"), !0
            }
        }), $(".prod-container-s").validate({
            onfocusout: !1,
            onkeyup: !1,
            ignore: "",
            rules: {
                add_to_quantity: {
                    notNone: !0
                }
            },
            messages: {
                add_to_quantity: "Please select a quantity.",
                add_to_color: "Please select a color.",
                add_to_size: "Please select a waist."
            },
            submitHandler: function() {
                return $("#addToBag10").trigger("click"), $("#error_display").hide(), $(".prod-container-s .add2bag").attr("value", "Update Bag"), !0
            }
        }), $(".passRecovery").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                "LOGIN<>userid": {
                    emailCheck: !0
                }
            },
            errorContainer: "#error_display"
        }), $("#kohls_order_status").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                "ORDER_STATUS<>zip5": {
                    noSpace: !0
                }
            },
            errorContainer: "#error_display"
        }), $("#kohls_orderstatus").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                "LOGIN<>userid": {
                    emailCheck: !0
                }
            },
            errorContainer: "#error_display"
        }), $(".updateBilling").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                addressZip: {
                    noSpace: !0
                },
                addressState: {
                    notNone: !0
                },
                phoneAreacode: {
                    phoneValid: !0
                },
                county: {
                    notNone: !0
                },
                addressCity: {
                    onlyString: !0
                }
            },
            errorContainer: "#error_display"
        }), $(".updateBillingAddress").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                addressState: {
                    notNone: !0
                },
                phoneAreacode: {
                    phoneValid: !0
                },
                county: {
                    notNone: !0
                }
            },
            errorContainer: "#error_display"
        }), $(".walletAddCardEdit").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                cardMonth_cd: {
                    notNone: !0
                },
                cardYear_cd: {
                    notNone: !0
                }
            }
        }), $(".updateShippingAddress").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                addressState_cd: {
                    notNone: !0
                },
                phoneAreacode: {
                    phoneValid: !0,
                    number: !0
                },
                county: {
                    notNone: !0
                },
                addressCity: {
                    onlyString: !0
                }
            }
        }), $(".signInfoSub").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                userPassword: {
                    minlength: 5
                },
                UserConfirmPassword1: {
                    passwordValid: !0
                }
            },
            messages: {
                userPassword: {
                    minlength: "Must be at least 5 characters long."
                },
                UserConfirmPassword1: {
                    passwordValid: "The Confirm Password you entered has an error. It does not match your Password. Please enter a Confirm Password that exactly matches your Password. (Keep in mind that Passwords are case sensitive. Check for spelling and space errors.)"
                }
            }
        }), $(".checkBalance").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                giftCardNumber: {
                    numberValid: !0
                }
            },
            messages: {
                giftCardNumber: "We're sorry, but the Gift Card number you entered does not match any Gift Card we have on record. Please double-check the information you entered to ensure it is correct, then try again."
            },
            errorContainer: "#error_display"
        }), $(".kohlsCash").validate({
            onfocusout: !1,
            onkeyup: !1,
            messages: {
                couponNumber: "We're sorry, the Kohl's Cash number entered does not match our records. Please check the number and try again."
            },
            errorContainer: "#error_display"
        }), $("#BVSUEditForm").validate({
            onfocusout: !1
        }), $(".sale_alert").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                enterEmail: {
                    emailValid: !0
                }
            },
            messages: {
                enterEmail: {
                    required: "Oops! Some information is missing or invalid below. You must fill in this field",
                    email: "The E-mail Address you've entered has an error. Please enter an E-mail Address in the appropriate format (e.g., yourname@host.com).",
                    emailValid: "The E-mail Address(es) you entered and re-entered do not match. Please make sure they are exactly the same and try again."
                }
            }
        }), $("#update_wallet").validate({
            onfocusout: !1,
            onkeyup: !1,
            rules: {
                cardBrand_cd: {
                    notNone: !0
                },
                cardNum: {
                    validateCardNumber: !0
                }
            },
            errorContainer: "#error_display"
        }), $("#ratingForm").validate({
            onfocusout: !1,
            ignore: "",
            rules: {
                starrating1: {
                    notNone: !0
                }
            },
            messages: {
                starrating1: "You must enter a value for overall rating.",
                useremail: "You must enter an email address."
            }
        }), $("input[class*='phone']").each(function() {
            $(this).rules("add", {
                required: !0,
                validatePhone: !0
            })
        }), $("#exp select[name^='card']").each(function() {
            $(this).rules("add", {
                validateExp: !0
            })
        })
    } catch (B) {}
    $("#tellAFriend-su").submit(function() {
        return n($(this))
    }), $("#egiftCardForm").submit(function() {
        return x = "input[type=text],textarea, input[type=checkbox]", n($(this))
    }), $("#update_credit_card").submit(function() {
        return n($(this))
    }), $("#kohls_update_billing").submit(function() {
        return n($(this))
    })
});
