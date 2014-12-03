/************************************************************************************ 
**	Defining.js
**
**	Author: Gopikrishna Alwarsamy & Will Ogles
**
**	Desc: This file implements the attribute selection functionality and synchronizes
**			the drop-down(s) choices with the Color swatch and Scene7 in the Product Pages
** 
*************************************************************************************/

var valObj=[];

// This is special function to handle quantity resets on the 
//   grouping page only.
function groupingQuantites(button) {
	var temp = $(button).siblings("select[name^='quantity']").val();
	$("select[name^='quantity']").val("0");
    $(button).siblings("select[name^='quantity']").val(temp);
}

// This function resets all quantities on a page. We mainly call
//   this after the Add To Bag modal has appeared and the shopper
//   selected "keep shopping".
function resetQuantities() {
	$('select[name^="quantity"]').each(function (index, element) {
		if ($(this).val() == 0) {
			$(this).val('1');
		}
	});
}

// This function handles the attribute checks but applies
// it to ALL attribute sections on a page (so it's for bundle pages).
/*
function validateBundleAttrs(a, b) {
    var c = parseInt(a.value);
    catNum = c;
    isError = false;
    isErrCode = "";
    $tools.attrs = [];
    $tools.attrV = [];
    oneQtySel = "";
    for (var d = 1; d < catNum; d++) {
        if ($tools.hiddenQuantityVal[d].val() > 0) {
            oneQtySel = true;
            isError = false;
            break;
        } else {
            oneQtySel = false;
            isError = true;
            isErrCode = "quantity";
        }
    }
    if (oneQtySel == false && isError == true) {
        alert("Valid " + isErrCode + " should be selected for one item");
        return isError;
    }
    for (var d = 1; d < catNum; d++) {
        if ($tools.hiddenQuantityVal[d].val() > 0) {
            if ($("#attrnum_" + d).val() == undefined) {
                isError = false;
                continue;
            } else if ($("#attrnum_" + d).val() == "true") {
                for (j = 1; j <= 2; j++) {
                    $tools.attrs[d + j] = $("#item-" + d + " div[id*='dd-" + d + "-" + j + "']");
                    $tools.attrV[d + j] = $("#attrValue_" + d + "_" + j);
                }
                if ($tools.attrV[d + 1].val() == "*") {
                    isError = true;
                    isErrCode = $tools.attrs[d + 1].attr("name");
                    break;
                } else if ($tools.attrV[d + 2].val() == "" || $tools.attrV[d + 2].val() == "*") {
                    isError = true;
                    isErrCode = $tools.attrs[d + 2].attr("name");
                    break;
                } else {
                    continue;
                }
            } else if ($("#attrnum_" + d).val() == "false") {
                $tools.attrs[d + 1] = $("#item-" + d + " div[id*='dd-" + d + "-" + 1 + "']");
                $tools.attrV[d + 1] = $("#attrValue_" + d + "_" + 1);
                if ($tools.attrV[d + 1].val() == undefined) {
                    isError = false;
                } else if ($tools.attrV[d + 1].val() == "" || $tools.attrV[d + 1].val() == "*") {
                    $tools.attrV[d + 1] = $("#attrValue_" + d + "_" + 1);
                    isError = true;
                    isErrCode = $tools.attrs[d + 1].attr("name");
                    break;
                } else {
                    isError = false;
                    continue;
                }
            } else {
                isError = false;
                continue;
            }
        } else if ($tools.hiddenQuantityVal[d].val() == 0) {
            isError = false;
            continue;
        }
    }
    if (isError == true) {
        alert("Valid " + isErrCode + " should be selected");
    }
    return isError;
}
*/
// This function simply adds or removes the "ON" class based on the selected color.
function selectSwatch(a) {
	//If this isn't the first swatch to be selected, then remove "on" from the previous one
	$.each(a.parent().parent().parent().find("li"), function (a, b) {
        $(b).removeClass("on");
    });
	//Set the currently selected li here, so that it can be "de-selected" on the next click
    $tools.prevSelected = a;
  //Add the "on" class to highlight the corresponding swatch
    $tools.prevSelected.addClass("on");
}

// This function is applied to all swatches on a page.
//   This function and onDDClick are the ONLY main functions applied to
//   DOM elements in this file. Every other function is simply used by these two.
function onSwatchSelect(b, c, d, e) {
    cposcn = c.split("-")[1];
    $tools.hiddenAttrVal[cposcn + $(e).attr("id").split("-")[2]].val(b.attr("title"));
    selectSwatch(b.parent());
    $tools.newAttrList = "";
    attrNum = $("#attrnum_" + c.split("-")[1]).val();
    if (attrNum == "true") {
        $tools.shownSwatchesId[cposcn + 1] = $tools.w.find("div[title='swatches-" + cposcn + "']").find("li[id*='" + $(b).attr("title") + "']");
        $.each($tools.shownSwatchesId[cposcn + 1], function (c, d) {
            a = $(d).attr("id").split("-");
            var e = b.attr("title").indexOf("$");
            if (e > 0) {
                sTitle = b.attr("title").substring(0, e);
            } else {
                sTitle = b.attr("title");
            }
            idLength = sTitle.length;
            sepChar = a[3].charAt(idLength);
            if (a.length <= 4) {
                if (a[3].substring(0, idLength) == sTitle && sepChar == "$") {
                    $tools.newAttrList += '<li><a title="' + a[1] + ' " href="javascript:void(0);">' + a[1] + "</a></li>";
                }
            } else {
                if (a[3].substring(0, idLength) == sTitle && sepChar == "$") {
                    if (a[2].indexOf("$") == -1) $tools.newAttrList += '<li><a title="' + a[1] + "-" + a[2] + ' " href="javascript:void(0);">' + a[1] + "-" + a[2] + "</a></li>";
                    else $tools.newAttrList += '<li><a title="' + a[1] + ' " href="javascript:void(0);">' + a[1] + "</a></li>";
                }
            }
        });
    } else {
        $tools.shownSwatchesId[cposcn + 1] = $("#swatches li[id*='swatches-" + cposcn + "']");
        $.each($tools.shownSwatchesId[cposcn + 1], function (b, c) {
            a = $(c).attr("title").split("-");
            $tools.newAttrList += '<li><a title="' + a + ' " href="javascript:void(0);">' + a + "</a></li>";
        });
    }
    $tools.ulAttr[cposcn + 1].html($tools.newAttrList);
    $tools.ulAttr[cposcn + c.split("-")[2]] = $(e).find("#list-" + cposcn + "-" + c.split("-")[2]);
    if (b.attr("title").indexOf("$") != -1) {
        newAttrVal = b.attr("title").replace("$", " $");
    } else {
        newAttrVal = b.attr("title");
    }
    $tools.ulAttr[cposcn + c.split("-")[2]].parent().prev().html(newAttrVal);
    if (useScene7 != 0) {
        $tools.splitColor = b.attr("title").split("$")[0];
        $tools.splitColor += "_" + c.split("-")[1];
        $tools.splitColor = $tools.splitColor.replace(" ", "");
        $tools.splitColor = $tools.splitColor.replace('"', "");
        $tools.splitColor = $tools.splitColor.replace("\\", "");
        $tools.splitColor = $tools.splitColor.replace(" ", "");
        $tools.splitColor = $tools.splitColor.replace(/\s+/g, "");
        $tools.splitColor = $tools.splitColor.toLowerCase();
        if (isCustomSwap == 1) {
            $tools.items[c.split("-")[1]].find(".img img").attr("src", s7Images[$tools.splitColor]);
        } else {
            changeImage(s7Images[$tools.splitColor]);
        }
    }
}

// This function sets up the custom click functions for the dropdown boxes
//   THIS function is the one placed on all dropdown <a> tags.
function onDDClick(a, b, c, d, e) {
    a.closest(".dd").hide();
    a.closest("div").prev().html(a.html());
    onAttrChange(a.html(), b, c);
    if (c == "color" && useScene7 != 0) {
        $tools.splitColor = a.attr("title").split("$")[0];
        $tools.splitColor += "_" + b.split("-")[1];
        $tools.splitColor = $tools.splitColor.toLowerCase();
        $tools.splitColor = $tools.splitColor.replace('"', "");
        $tools.splitColor = $tools.splitColor.replace("\\", "");
        $tools.splitColor = $tools.splitColor.replace(" ", "");
        $tools.splitColor = $tools.splitColor.replace(/\s+/g, "");
        $tools.splitColor = jQuery.trim($tools.splitColor);
        if (isCustomSwap == 1) {
            $tools.items[b.split("-")[1]].find(".img img").attr("src", s7Images[$tools.splitColor]);
        } else {
            changeImage(s7Images[$tools.splitColor]);
        }
    }
}
function populateA2(a, b, c) {
    origD = a;
    a = a.replace(".", "");
    a = a.replace('"', "");
    a = a.replace("(", "");
    a = a.replace(")", "");
    a = a.replace("/", "");
    cposcn = b.split("-")[1];
    $tools.hiddenAttrVal[cposcn + 1].val(origD);
    a = a.replace(/\s+/g, "");
    $tools.shownSwatches[cposcn + 2].hide();
    $tools.shownSwatches[cposcn + 2] = $tools.swatches[cposcn + 2].find("#swatches-" + a);
    $tools.shownSwatches[cposcn + 2].show();
    $tools.attrValList = $tools.shownSwatches[cposcn + 2].children().children();
    $tools.newAttrList = "";
    $tools.hiddenIsSingleAttrValue[cposcn + 2] = $("#isSingleAttrValue_" + cposcn + "_" + 2);
    if ($tools.hiddenIsSingleAttrValue[cposcn + 2].val() == "false") {
        for (var d = 0, e = $tools.attrValList.length; d < e; d++) {
            if ($($tools.attrValList[d]).attr("title").indexOf("$") != -1) {
                newAttrVal = $($tools.attrValList[d]).attr("title").replace("$", " $");
            } else {
                newAttrVal = $($tools.attrValList[d]).attr("title");
            }
            $tools.newAttrList += '<li><a title="' + newAttrVal + ' " href="javascript:void(0);">' + newAttrVal + "</a></li>";
        }
        $tools.ulAttr[cposcn + 2].html($tools.newAttrList);
    }
    if ($tools.hiddenIsSingleAttrValue[cposcn + 2].val() == "false") {
        if ($tools.hiddenAttrVal[cposcn + 2].val() != "" && $tools.hiddenAttrVal[cposcn + 2].val() != "*") {
            $tools.liExists = $tools.shownSwatches[cposcn + 2].find("li[title='" + $tools.hiddenAttrVal[cposcn + 2].val() + "']");
            if ($tools.liExists.length != 0) {
                selectSwatch($tools.liExists);
            } else {
                $tools.hiddenAttrVal[cposcn + 2].val("");
                $tools.ulAttr[cposcn + 2].parent().prev().html("");
            }
        } else {
            $("#sp-" + cposcn + "-" + 2).html("Select a Color");
        }
    } else {
        selectSwatch($tools.shownSwatches[cposcn + 2].find("li[title='" + $tools.hiddenAttrVal[cposcn + 2].val() + "']"));
    }
}
function populateA1(b, c, d) {
    actD = "";
    if (b.indexOf("$") != -1) {
        actD = b.replace(" $", "$");
    } else {
        actD = b;
    }
    origD = b;
    b = b.replace(" ", "");
    cposcn = c.split("-")[1];
    if (d == "color") {
        $tools.hiddenAttrVal[cposcn + 2].val(actD);
        selectSwatch($tools.items[cposcn].find("li[title='" + actD + "']"));
    }
    $tools.shownSwatchesId[cposcn + 1] = $("#item-" + cposcn + " li[id*='" + actD + "']");
    $tools.newAttrList = "";
    if ($tools.hiddenAttrVal[cposcn + 1].val() == "" || $tools.hiddenAttrVal[cposcn + 1].val() == "*") {
        $("#sp-" + cposcn + "-" + 1).html("Select a Size");
    }
    $.each($tools.shownSwatchesId[cposcn + 1], function (b, c) {
        a = $(c).attr("id").split("-");
        var d = actD.indexOf("$");
        if (d > 0) {
            actDNew = actD.substring(0, d);
        } else {
            actDNew = actD;
        }
        idLength = actDNew.length;
        sepChar = a[3].charAt(idLength);
        if (a[0] == "swatches") {
            if (a.length <= 4) {
                if (a[3].substring(0, idLength) == actDNew && sepChar == "$") {
                    $tools.newAttrList += '<li><a title="' + a[1] + '" href="javascript:void(0);">' + a[1] + "</a></li>";
                }
            } else {
                if (a[3].substring(0, idLength) == actDNew && sepChar == "$") {
                    if (a[2].indexOf("$") == -1) $tools.newAttrList += '<li><a title="' + a[1] + "-" + a[2] + '" href="javascript:void(0);">' + a[1] + "-" + a[2] + "</a></li>";
                    else $tools.newAttrList += '<li><a title="' + a[1] + '" href="javascript:void(0);">' + a[1] + "</a></li>";
                }
            }
        }
    });
    $tools.ulAttr[cposcn + 1].html($tools.newAttrList);
}

//This function is the MAIN function called when a dropdown item
//or swatch is selected. This function handles the following:
//* Setting the hidden value of attributes for the order form
//* Selecting a swatch if a dropdown item for color is clicked
//* Making sure the selections are availabe (does this dress come in black and size 6?)
function onAttrChange(a, b, c) {
    attrNum = false;
    if (b != null) {
        attrNum = $("#attrnum_" + b.split("-")[1]).val();
    }
    if (attrNum == "true") {
        if (b.split("-")[2] == "1") {
            populateA2(a, b, c);
        } else {
            populateA1(a, b, c);
        }
    }
    if (attrNum == "false") {
        if (c == "color") {
            cposcn = b.split("-")[1];
            $tools.hiddenIsSingleAttrValue[cposcn + b.split("-")[2]] = $("#isSingleAttrValue_" + cposcn + "_" + b.split("-")[2]);
            if ($tools.hiddenIsSingleAttrValue[cposcn + b.split("-")[2]].val() == "false") $tools.shownSwatches[cposcn + b.split("-")[2]] = $tools.swatches[cposcn + b.split("-")[2]].find("#swatches-color");
            $tools.shownSwatches[cposcn + b.split("-")[2]].show();
            $tools.hiddenAttrVal[cposcn + b.split("-")[2]].val(a);
            if ($tools.hiddenAttrVal[cposcn + b.split("-")[2]].val() != "") {
                $tools.liExists = $tools.shownSwatches[cposcn + b.split("-")[2]].find("li[title='" + $tools.hiddenAttrVal[cposcn + b.split("-")[2]].val() + "']");
                if ($tools.liExists.length != 0) {
                    selectSwatch($tools.liExists);
                } else {
                    $tools.hiddenAttrVal[cposcn + b.split("-")[2]].val();
                }
            }
        } else {
            cposcn = b.split("-")[1];
            $tools.hiddenAttrVal[cposcn + b.split("-")[2]].val(a);
        }
    }
}


//////////////////////////////////////////////////////////////
//
//	Function populateAllAttributes(b)
// 
//	This function builds a JS object of all the DOM elements
//	that represent the various attribute / price combinations
//
//	This function will also bind the events for setup
//
//////////////////////////////////////////////////////////////
function populateAllAttributes(b) {
    $tools.hiddenQuantityVal[b] = $("#quantity-" + b);
    $tools.ddQuantity[b] = $("#dd-quantity-" + b);
    $tools.ulQuantity[b] = $("#list-quantity-" + b);
    $tools.ddQuantity[b].hoverIntent({
        over: showDD,
        timeout: 200,
        out: hideDD
    });
    $tools.ddAttributes = $("#item-" + b + " div[id*='dd-" + b + "']");
    $tools.ulQuantity[b].bind("click", function (a) {
        var c = $(a.target);
        if (c.is("li a")) {
            $tools.hiddenQuantityVal[b].val(c.html());
            onDDClick(c);
        }
    });
    $tools.items[b] = $tools.w.find("#item-" + b);
    $.each($tools.ddAttributes, function (c, d) {
        $tools.attrName = $(d).attr("name");
        $tools.attrId = $(d).attr("id");
        a = $tools.attrId.split("-");
        if ($tools.attrName == "size") {
            $(d).addClass("ddSize");
        }
        if ($tools.attrName == "color") {
            $tools.hiddenAttrVal[a[1] + a[2]] = $("#attrValue_" + a[1] + "_" + a[2]);
            $tools.ulAttr[a[1] + a[2]] = $("#list-" + a[1] + "-" + a[2]);
            $tools.swatches[a[1] + a[2]] = $tools.items[b].find("#swatches");
            $tools.shownSwatches[a[1] + a[2]] = $tools.swatches[a[1] + a[2]].find("#swatches-all");
            $tools.swatchList[a[1] + a[2]] = $tools.swatches[a[1] + a[2]].find("div ul");
            $tools.liExists;
            $tools.hiddenIsSingleAttrValue[a[1] + a[2]] = $("#isSingleAttrValue_" + a[1] + "_" + a[2]);
            if ($tools.hiddenIsSingleAttrValue[a[1] + a[2]].val() == "false") {
                $(d).hoverIntent({
                    over: showDD,
                    timeout: 200,
                    out: hideDD
                });
                $tools.ulAttr[a[1] + a[2]].bind("click", function (a) {
                    var b = $(a.target);
                    if (b.is("li a")) {
                        onDDClick(b, $(d).attr("id"), $(d).attr("name"));
                    }
                });
                $tools.swatchList[a[1] + a[2]].bind("click", function (a) {
                    var b = $(a.target);
                    if (b.is("li img")) {
                        onSwatchSelect(b, $(d).attr("id"), $(d).attr("name"), d);
                    }
                });
            } else {
                $("#sp-" + a[1] + "-" + a[2]).html($("#singleAttrValue_" + a[1] + "_" + a[2]).val());
                $("#attrValue_" + a[1] + "_" + a[2]).val($("#singleAttrValue_" + a[1] + "_" + a[2]).val());
                if ($("#attrnum_" + a[1]).val() == "true") selectSwatch($tools.shownSwatches[a[1] + a[2]].children().children());
                else {
                    selectSwatch($tools.swatches[a[1] + a[2]].children().children().children());
                }
            }
            $tools.shownSwatches[a[1] + a[2]].show();
        } else {
            $tools.swatches[a[1] + a[2]] = $tools.items[b].find("#swatches");
            $tools.shownSwatches[a[1] + a[2]] = $tools.swatches[a[1] + a[2]].find("#swatches-all");
            $tools.hiddenAttrVal[a[1] + a[2]] = $("#attrValue_" + a[1] + "_" + a[2]);
            $tools.ulAttr[a[1] + a[2]] = $("#list-" + a[1] + "-" + a[2]);
            $tools.swatchList[a[1] + a[2]] = $tools.swatches[a[1] + a[2]].find("div ul");
            $tools.ulAttr[a[1] + a[2]].parent().hide();
            $tools.hiddenIsSingleAttrValue[a[1] + a[2]] = $("#isSingleAttrValue_" + a[1] + "_" + a[2]);
            if ($tools.hiddenIsSingleAttrValue[a[1] + a[2]].val() == "false") {
                $(d).hoverIntent({
                    over: showDD,
                    timeout: 200,
                    out: hideDD
                });
                $tools.ulAttr[a[1] + a[2]].bind("click", function (a) {
                    var b = $(a.target);
                    if (b.is("li a")) {
                        onDDClick(b, $(d).attr("id"), $(d).attr("name"));
                    }
                });
            } else {
                $("#sp-" + a[1] + "-" + a[2]).html($("#singleAttrValue_" + a[1] + "_" + a[2]).val());
                $("#attrValue_" + a[1] + "_" + a[2]).val($("#singleAttrValue_" + a[1] + "_" + a[2]).val());
            }
        }
    });
}

//////////////////////////////////////////////////////////////
//
//	Function toolsSetup(a)
// 
//	This function creates a global object that will hold
//		all of the selectors needed to traverse the DOM.
//
//	This function will also bind the events for setup
//
//	a = The page calling this function
//
//////////////////////////////////////////////////////////////
function toolsSetup(a) {
    window.$tools = {
        w: $("#attributes")
    };
    $tools.items = [];
    $tools.hiddenQuantityVal = [];
    $tools.ddQuantity = [];
    $tools.ulQuantity = [];
    $tools.ulAttr = [];
    $tools.swatches = [];
    $tools.shownSwatches = [];
    $tools.swatchList = [];
    $tools.shownSwatchesId = [];
    $tools.hiddenAttrVal = [];
    $tools.hiddenIsSingleAttrValue = [];
    $tools.splitColor;
    for (var b = 1; b < a; b++) {
        populateAllAttributes(b);
    }
}
//Variable Setup for Scene7
var useScene7 = "0";
var isCustomSwap = "0";