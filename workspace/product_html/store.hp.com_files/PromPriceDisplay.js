//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 * @fileOverview This class contains declarations of AJAX services used by the HP STORE store pages.
 */
// Strike Price Rendering Method to paint the price on postRefreshHandler.
PromPriceDisplayJS = {
    strikePricePost : function() {
        strikePriceRendering();
    }
}
// Strike Price Rendering Method to paint the price on load
$(document).ready( function() {
    strikePriceRendering();
});
// Strike Price Rendering Method to paint the price on ajax call
function strikePriceRendering() {
 
    var sampleCatent;
    var params = {};
    // Collecting catentry Id in sampleCatent variable
    if (document.getElementById("PSTCatentries") != null && document.getElementById("PSTCatentries") != "") {
        sampleCatent = document.getElementById("PSTCatentries").value;
    } else if (catentIdPST != "" & catentIdPST != undefined) {
        var newCatentIdPST = catentIdPST.substring(1, catentIdPST.length);
        if (newCatentIdPST != null) {
            sampleCatent = newCatentIdPST;
        }
    } else {
        sampleCatent = "";
    }

    if (sampleCatent != "" && sampleCatent != null) {
        $.ajax( {
            url : '/webapp/wcs/stores/servlet/PriceStrikeThroughDisplayCmd?storeId=10151',
            data : {
                catentryId : sampleCatent
            },
            success : function(serviceResponse_json) {
                var serviceResponse = JSON.parse(serviceResponse_json);
             
                var counter = 1;
                var incFlag = true;
                var idFlag = false;
                var allCatentIds = null;
                var eachEntry = false;
                if (document.getElementById('PSTModelString') != undefined && document.getElementById('PSTModelString') != null) {
                    var model = document.getElementById('PSTModelString').value.split('|');
                    for ( var modInc = 0; modInc < model.length; modInc++) {
                        var modelEntries = new Array();
                        var modelId = model[modInc].split(':')[0];
                        var catentryIdList = model[modInc].split(':')[1];
                        // FOR Empty catentries GOES TO FAIL OVER
                        if (modelId != null && catentryIdList == "") {
                            var priceValCur = "priceValCur_" + modelId;
                            var priceValCurBase = "priceValCurBase_" + modelId;
                            var basePoint = "basePoint_" + modelId;
                            var promoPoint = "promoPoint_" + modelId;
                            a = document.getElementsByName(priceValCur);
                            b = document.getElementsByName(priceValCurBase);
                            c = document.getElementsByName(basePoint);
                            d = document.getElementsByName(promoPoint);
                            for ( var j = 0; j < a.length; j++) {
                                a[j].style.display = 'none';
                            }
                            for ( var j = 0; j < b.length; j++) {
                                b[j].style.display = 'none';
                            }
                            for ( var j = 0; j < c.length; j++) {
                                c[j].style.display = 'none';
                            }
                            for ( var j = 0; j < d.length; j++) {
                                d[j].style.display = 'none';
                            }
                    
                        }

                        // END FOR EMPTY catentries GOES TO FAIL OVER
                        var modelCatents = model[modInc].split(':')[1].split(',');
                        for ( var j = 0; j < modelCatents.length; j++) {
                            var promo = "promo_" + modelCatents[j];
                            var promoprice = serviceResponse[promo];
                            if (promoprice != undefined || promoprice != null) {
                                var baseCatStr = modelCatents[j] + "=" + promoprice;
                                modelEntries.push(baseCatStr);
                            }
                            if (promoprice == undefined || promoprice == null) {
                                eachEntry = true;
                            }
                        }
                        var minTemp = null, swapTemp = null;
                        var minID, tempID, tempMinID1, tempMinID2, tempMinID;
                        var oldPriceFlow = "oldPriceFlow_" + modelId;
                        if (!eachEntry) {
                            if (modelEntries.length > 1) {
                                for (k = 0; k < modelEntries.length; k++) {
                                    for (w = k + 1; w < modelEntries.length; w++) {
                                        tempMinID1 = modelEntries[k].split("=");
                                        tempMinID2 = modelEntries[w].split("=");
                                        if (parseFloat(tempMinID1[1]) < parseFloat(tempMinID2[1])) {
                                            if (swapTemp == null) {
                                                swapTemp = tempMinID1[1];
                                                tempID = tempMinID1[0];
                                            } else {
                                                if (parseFloat(tempMinID1[1]) < parseFloat(swapTemp)) {
                                                    swapTemp = tempMinID1[1];
                                                    tempID = tempMinID1[0];
                                                }
                                            }
                                        } else {
                                            if (swapTemp == null) {
                                                swapTemp = tempMinID2[1];
                                                tempID = tempMinID2[0];
                                            } else {
                                                if (parseFloat(tempMinID2[1]) < parseFloat(swapTemp)) {
                                                    swapTemp = tempMinID2[1];
                                                    tempID = tempMinID2[0];
                                                }
                                            }
                                        }
                                    }
            
                                }
                                minTemp = swapTemp;
                                swapTemp = null;
                                minID = tempID;
                                var base = "base_" + minID;
                                var baseprice = serviceResponse[base];
            
                                var modelprice = minTemp;
                                var resModel = modelprice.split(".");
                                var resModelBase = baseprice.split(".");
            
                                var priceValCur = "priceValCur_" + modelId;
                                var priceValCurBase = "priceValCurBase_" + modelId;
            
                                var basePoint = "basePoint_" + modelId;
                                var promoPoint = "promoPoint_" + modelId;
                                var modelpatternPromo = "promo_" + modelId;
                                var modeldecipatternPromo = "promoDecimal_" + modelId;
                                var modelpatternBase = "base_" + modelId;
                                var modeldecipatternBase = "baseDecimal_" + modelId;
                                var PST = "PST_" + modelId;
                            } else {
                                if (modelEntries != null) {
                                    tempMinID = modelEntries[0].split("=");
                                    minID = tempMinID[0];
                                    minTemp = tempMinID[1];
                                    var base = "base_" + minID;
                                    var baseprice = serviceResponse[base];
                                    var modelprice = minTemp;
                                    var resModel = modelprice.split(".");
                                    var resModelBase = baseprice.split(".");
            
                                    var priceValCur = "priceValCur_" + modelId;
                                    var priceValCurBase = "priceValCurBase_" + modelId;
            
                                    var basePoint = "basePoint_" + modelId;
                                    var promoPoint = "promoPoint_" + modelId;
            
                                    var modelpatternPromo = "promo_" + modelId;
                                    var modeldecipatternPromo = "promoDecimal_" + modelId;
                                    var modelpatternBase = "base_" + modelId;
                                    var modeldecipatternBase = "baseDecimal_" + modelId;
                                    var PST = "PST_" + modelId;
            
                                }
                            }
            
                            var oob = [];
                            var oob1 = [];
                            a = document.getElementsByName(priceValCur);
                            b = document.getElementsByName(priceValCurBase);
                            c = document.getElementsByName(basePoint);
                            d = document.getElementsByName(promoPoint);
            
                            x = document.getElementsByName(modelpatternPromo);
                            y = document.getElementsByName(modelpatternBase);
                            w = document.getElementsByName(modeldecipatternPromo);
                            v = document.getElementsByName(modeldecipatternBase);
                            oobName = document.getElementsByName(oldPriceFlow);
            
                            var pstName = document.getElementsByName(PST);
            
                            pst1 = [];
            
                            var inputs = document.getElementsByTagName('div');
                            for ( var i = 0; i < inputs.length; i++) {
                                if (inputs.item(i).getAttribute('name') == PST) {
                                    pst1.push(inputs.item(i));
                                }
                            }
            
                            for ( var j = 0; j < pstName.length; j++) {
                                pstName[j].style.display = 'block';
                            }
            
                            for ( var j = 0; j < pst1.length; j++) {
                                pst1[j].style.display = 'block';
                            }
            
                            if (resModel != null) {
                                var inputs = document.getElementsByTagName('div');
                                for ( var i = 0; i < inputs.length; i++) {
                                    if (inputs.item(i).getAttribute('name') == oldPriceFlow) {
                                        oob.push(inputs.item(i));
                                    }
                                }
            
                                for ( var j = 0; j < oobName.length; j++) {
                                    oobName[j].style.display = 'none';
                                }
            
                                for ( var j = 0; j < oob.length; j++) {
                                    oob[j].style.display = 'none';
                                }
            
                                for ( var j = 0; j < x.length; j++) {
                                    x[j].innerHTML = resModel[0];
                                }
                                if (resModel[1] != null) {
                                    for ( var j = 0; j < w.length; j++) {
                                        w[j].innerHTML = resModel[1];
                                    }
                                } else {
                                    for ( var j = 0; j < w.length; j++) {
                                        w[j].innerHTML = '00';
                                    }
                                }
                                for ( var j = 0; j < d.length; j++) {
                                    d[j].innerHTML = '.';
                                }
            
                            }
                            if (baseprice == modelprice) {
            
                                for ( var j = 0; j < b.length; j++) {
                                    b[j].style.display = 'none';
                                }
                                for ( var j = 0; j < c.length; j++) {
                                    c[j].style.display = 'none';
                                }
                            }
                            if (modelprice == null) {
                                for ( var j = 0; j < a.length; j++) {
                                    a[j].style.display = 'none';
                                }
                                for ( var j = 0; j < d.length; j++) {
                                    d[j].style.display = 'none';
                                }
                                for ( var j = 0; j < b.length; j++) {
                                    b[j].style.display = 'none';
                                }
                                for ( var j = 0; j < c.length; j++) {
                                    c[j].style.display = 'none';
                                }
            
                            }
                            if (baseprice != modelprice) {
                                for ( var j = 0; j < y.length; j++) {
                                    y[j].innerHTML = resModelBase[0];
                                }
                                if (resModelBase[1] != null) {
                                    for ( var j = 0; j < v.length; j++) {
                                        v[j].innerHTML = resModelBase[1];
                                    }
                                } else {
                                    for ( var j = 0; j < v.length; j++) {
                                        v[j].innerHTML = '00';
                                    }
                                }
                                for ( var j = 0; j < c.length; j++) {
                                    c[j].innerHTML = '.';
                                }
            
                            }
            
                            eachEntry = false;
                        } else {
                            eachEntry = false;
                            var priceValCur = "priceValCur_" + modelId;
                            var priceValCurBase = "priceValCurBase_" + modelId;
                            var basePoint = "basePoint_" + modelId;
                            var promoPoint = "promoPoint_" + modelId;
                            a = document.getElementsByName(priceValCur);
                            b = document.getElementsByName(priceValCurBase);
                            c = document.getElementsByName(basePoint);
                            d = document.getElementsByName(promoPoint);
                            oobName = document.getElementsByName(oldPriceFlow);
            
                            var inputs = document.getElementsByTagName('div');
                            oob1 = [];
            
                            for ( var i = 0; i < inputs.length; i++) {
                                if (inputs.item(i).getAttribute('name') == oldPriceFlow) {
                                    oob1.push(inputs.item(i));
                                }
                            }
            
                            for ( var j = 0; j < oobName.length; j++) {
                                oobName[j].style.display = 'block';
                            }
            
                            for ( var j = 0; j < oob1.length; j++) {
                                oob1[j].style.display = 'block';
                            }
                            for ( var j = 0; j < a.length; j++) {
                                a[j].style.display = 'none';
                            }
                            for ( var j = 0; j < b.length; j++) {
                                b[j].style.display = 'none';
                            }
                            for ( var j = 0; j < c.length; j++) {
                                c[j].style.display = 'none';
                            }
                            for ( var j = 0; j < d.length; j++) {
                                d[j].style.display = 'none';
                            }
                        }
                    }
                }
                /* BEGIN Storing all catentries id which is been passed through ajax call(eachEntryId) */
                var allCatentIds = sampleCatent;
                var eachEntryId = allCatentIds.split(",");

                // populate GM points
                if($('div#hiddenCallCenterDiv').length > 0){
                    for (var i = 0; i < eachEntryId.length; i++) {
                        var gmpts = serviceResponse["gmpts_" + eachEntryId[i]];
                        gmpts = gmpts ? gmpts:"0.00";
                        $("#"+eachEntryId[i]+"gmpts_holder_pst").html("GM Points: " + gmpts);

                        var stock = serviceResponse["stock_" + eachEntryId[i]];
                        //stock = stock ? "Out of Stock":stock;
                        if (stock)
                            $("#"+eachEntryId[i]+"stock_holder_pst").html("Stock Count: " + stock);
                    }

                    $('.gmpoints').css("display", "block");
                    $('.stock').css("display", "block");
                } else {
                    $('.gmpoints').css("display", "none");
                    $('.stock').css("display", "none");
                }

                /* END Storing all catentries id which is been passed through ajax call(eachEntryId) */
                var existEntry = [];
                while (incFlag) {
                    var failFlag = false;
                    var existFlag = false;
                    var catent = "catent_" + counter;
                    var catentryId = serviceResponse[catent];
                    if (catentryId != null) {
                        /* BEGIN Making an note of processed catentry id with price */
                        for ( var i = 0; i < eachEntryId.length; i++) {
                            if (eachEntryId[i] === catentryId) {
                                existFlag = true;
                                existEntry[i] = eachEntryId[i];
                            }
                        }
                        /* END Making an note of processed catentry id with price */
                        var base = "base_" + catentryId;
                        var promo = "promo_" + catentryId;
                        var oldPriceFlow = "oldPriceFlow_" + catentryId;
                        var priceValCur = "priceValCur_" + catentryId;
                        var priceValCurBase = "priceValCurBase_" + catentryId;
                        var promoDecimal = "promoDecimal_" + catentryId;
                        var baseDecimal = "baseDecimal_" + catentryId;
                        var baseprice = serviceResponse[base];
                        var promoPoint = "promoPoint_" + catentryId;
                        var basePoint = "basePoint_" + catentryId;
                        var PST = "PST_" + catentryId;
                        var promoprice = serviceResponse[promo];
                        if (promoprice != null) {
                            var oobName = document.getElementsByName(oldPriceFlow);
                            var inputs = document.getElementsByTagName('div');
                            var x1 = [];
                            for ( var i = 0; i < inputs.length; i++) {
                                if (inputs.item(i).getAttribute('name') == oldPriceFlow) {
                                    x1.push(inputs.item(i));
                                }
                            }
                            for ( var j = 0; j < oobName.length; j++) {
                                oobName[j].style.display = 'none';
                            }
            
                            for ( var j = 0; j < x1.length; j++) {
                                x1[j].style.display = 'none';
                            }
            
                            var resBase = baseprice.split(".");
                            var res = promoprice.split(".");
            
                            if (promo != null && base != null) {
                                x = document.getElementsByName(promo);
                                y = document.getElementsByName(base);
                                w = document.getElementsByName(promoPoint);
                                v = document.getElementsByName(basePoint);
                                var PSTName = document.getElementsByName(PST);
            
                                var PST1 = [];
                                var inputs = document.getElementsByTagName('div');
                                for ( var i = 0; i < inputs.length; i++) {
                                    if (inputs.item(i).getAttribute('name') == PST) {
                                        PST1.push(inputs.item(i));
                                    }
                                }
            
                                for ( var j = 0; j < PSTName.length; j++) {
            
                                    PSTName[j].style.display = 'block';
            
                                }
            
                                for ( var j = 0; j < PST1.length; j++) {
            
                                    PST1[j].style.display = 'block';
            
                                }
            
                                for ( var j = 0; j < w.length; j++) {
                                    w[j].innerHTML = '.';
                                }
            
                                for ( var j = 0; j < x.length; j++) {
                                    var aaa = res[0];
                                    x[j].innerHTML = res[0];
                                }
                                if (baseprice != promoprice) {
                                    for ( var j = 0; j < y.length; j++) {
                                        y[j].innerHTML = resBase[0];
                                    }
                                    for ( var j = 0; j < v.length; j++) {
                                        v[j].innerHTML = '.';
                                    }
                                } else {
                                    u = document.getElementsByName(priceValCurBase);
                                    v = document.getElementsByName(basePoint);
                                    for ( var j = 0; j < u.length; j++) {
                                        u[j].style.display = 'none';
                                    }
                                    for ( var j = 0; j < v.length; j++) {
                                        v[j].style.display = 'none';
                                    }
                                }
                                if (baseprice != promoprice) {
                                    if (resBase[1] == '00' || resBase[1] == null) {
                                        y = document.getElementsByName(baseDecimal);
                                        for ( var j = 0; j < y.length; j++) {
                                            y[j].innerHTML = '00';
                                        }
                                    } else if (resBase[1].length == 1) {
                                        y = document.getElementsByName(baseDecimal);
                                        for ( var j = 0; j < y.length; j++) {
                                            y[j].innerHTML = resBase[1] + '0';
                                        }
                                    } else {
                                        y = document.getElementsByName(baseDecimal);
                                        for ( var j = 0; j < y.length; j++) {
                                            y[j].innerHTML = resBase[1];
                                        }
                                    }
                                }
                                if (res[1] == '00' || res[1] == null) {
                                    x = document.getElementsByName(promoDecimal);
                                    for (j = 0; j < x.length; j++) {
                                        x[j].innerHTML = '00';
                                    }
                                } else if (res[1].length == 1) {
                                    x = document.getElementsByName(promoDecimal);
                                    for ( var j = 0; j < x.length; j++) {
                                        x[j].innerHTML = res[1] + '0';
                                    }
                                } else {
                                    x = document.getElementsByName(promoDecimal);
                                    for ( var j = 0; j < x.length; j++) {
                                        x[j].innerHTML = res[1];
                                    }
                                }
                            }
                        } else {
                            /* BEGIN Code Snippet for those catentry for which promotional price is NULL making those price place holder DISPLAY NONE */
                            x = document.getElementsByName(priceValCur);
                            y = document.getElementsByName(promoPoint);
            
                            u = document.getElementsByName(priceValCurBase);
                            v = document.getElementsByName(basePoint);
            
                            for ( var j = 0; j < x.length; j++) {
                                x[j].style.display = 'none';
                            }
                            for ( var j = 0; j < y.length; j++) {
                                y[j].style.display = 'none';
                            }
            
                            for ( var j = 0; j < u.length; j++) {
                                u[j].style.display = 'none';
                            }
                            for ( var j = 0; j < v.length; j++) {
                                v[j].style.display = 'none';
                            }
                            /* END Code Snippet for those catentry for which promotional price is NULL making those price place holder DISPLAY NONE */
            
                        }
            
                    } else {
                        incFlag = false;
                    }
                    counter++;
                } // END OF WHILE TO PAINT THE CATENTRY DIVISION'S

                /* BEGIN Code Snippet for those catentry ids which StrikePrice Command fails and baseprice==promotional price to retrieve making those price place holder DISPLAY NONE */
                var allCatent = allCatentIds.split(",");
                for ( var i = 0; i < allCatent.length; i++) {
                    var entryFlag = false;
                    for ( var j = 0; j < existEntry.length; j++) {
    
                        if (allCatent[i] === existEntry[j]) {
    
                            entryFlag = true;
                            break;
                        }
                    }
                    var base = "base_" + allCatent[i];
                    var promo = "promo_" + allCatent[i];
                    var baseprice = serviceResponse[base];
                    var promoprice = serviceResponse[promo];
                    if (baseprice == promoprice) {
                        var priceValCurBase = "priceValCurBase_" + allCatent[i];
                        var basePoint = "basePoint_" + allCatent[i];
                        u = document.getElementsByName(priceValCurBase);
                        v = document.getElementsByName(basePoint);
                        for ( var j = 0; j < u.length; j++) {
                            u[j].style.display = 'none';
                        }
                        for ( var j = 0; j < v.length; j++) {
                            v[j].style.display = 'none';
                        }
                    }
    
                    if (!entryFlag) {
    
                        var priceValCur = "priceValCur_" + allCatent[i];
                        var promoPoint = "promoPoint_" + allCatent[i];
                        var priceValCurBase = "priceValCurBase_" + allCatent[i];
                        var basePoint = "basePoint_" + allCatent[i];
                        x = document.getElementsByName(priceValCur);
                        y = document.getElementsByName(promoPoint);
                        u = document.getElementsByName(priceValCurBase);
                        v = document.getElementsByName(basePoint);
    
                        for ( var j = 0; j < x.length; j++) {
                            x[j].style.display = 'none';
                        }
                        for ( var j = 0; j < y.length; j++) {
                            y[j].style.display = 'none';
                        }
    
                        for ( var j = 0; j < u.length; j++) {
                            u[j].style.display = 'none';
                        }
                        for ( var j = 0; j < v.length; j++) {
                            v[j].style.display = 'none';
                        }
                    }
                }
                /* END Code Snippet for those catentry ids which StrikePrice Command fails to retrieve making those price place holder DISPLAY NONE */
            }// SUCCESS HANDLER END
        });// AJAX CALL END
    }// END of IF check of sampleCatent.
    catentIdPST = [];
}// END of function strikePriceRendering

function formCatentryIdList() {
    if (PLPCatentryIdList != null) {
        var PLPCatentryIdListLength = PLPCatentryIdList.length;


        if (PLPCatentryIdListLength > 0) {
            var concatnatedCatentryList = PLPCatentryIdList[0];
            for ( var i = 1; i < PLPCatentryIdListLength; i++) {

                concatnatedCatentryList = concatnatedCatentryList.concat(",");
                concatnatedCatentryList = concatnatedCatentryList.concat(PLPCatentryIdList[i]);
            }
        }
    }

    return concatnatedCatentryList;
}

function priceDisplayAjax(catentryList) {
    if (document.getElementById("storeId") != null) {
        var storeId = document.getElementById("storeId").value;
    }
    if (document.getElementById("langId") != null) {
        var langId = document.getElementById("langId").value;
    }
    if (document.getElementById("catalogId") != null) {
        var catalogId = document.getElementById("catalogId").value;
    }
    $.ajax({
        url : '/webapp/wcs/stores/servlet/PriceDisplayAjaxView',
        data : {
            langId : langId,
            storeId : storeId,
            catalogId : catalogId,
            catentryIdList : catentryList
        },
        success : function(data) {
            $("body").append("<div id='OldPriceAJAX' style:visibility='hidden'>" + data + "</div>");
            renderPrice();
        }
    });
}
function inventoryAjax(InventoryURL) {
    $.ajax( {
        url : InventoryURL,
        success : function(data) {
            data = $.parseJSON(data);
            var status;
            var availQty;
            var oos;
            var addtocartId;
            var belowThreshold;
            var lowInfo;
            $.each(data.skus, function(i, item) {
                status = item.status;
                availQty = parseInt(item.availableQuantity);
                oos = item.id;
                lowInfo = "lowinventoryinfo_" + oos;
                lowQty = "lowinventoryqty_" + oos;
                addtocartId = "InventoryStatusAddToCart_" + oos;
                belowThreshold = item.belowThreshold;
                oos = 'OutOfStock_' + oos;
                if ((status.localeCompare("Available") != 0) || (availQty < 1)) {
                    $("#" + oos).show();
                    $("#" + addtocartId).hide();

                } else {
                    if (belowThreshold.localeCompare("true") == 0) {
                        $("#" + lowQty).html(availQty);
                        $("#" + lowInfo).show();
                    }
                    $("#" + addtocartId).show();
                }
            });
        }
    });
}

function renderPrice() {
    if (document.getElementById("catentryIdList") != null) {
        var catentids = document.getElementById("catentryIdList").value;
        var catentids = catentids.split(',');
        var x = "";
        var i = "";
        var j = "";

        for (i = 0; i < catentids.length; i++) {
            // call center
            if($('div#hiddenCallCenterDiv').length > 0){
                // gmpoints display
                var gmpoints = $("#" + catentids[i] + "gmpts").val();
                if (gmpoints) {
                    $("#" + catentids[i] + "gmpts_holder").html("GM Points: " + gmpoints);
                } else {
                    $("#" + catentids[i] + "gmpts_holder").html("GM Points: 0.00");
                }

                // stock display
                var stock = $("#" + catentids[i] + "stock").val();
                if (stock) {
                    $("#" + catentids[i] + "stock_holder").html("Stock Count: " + stock);
                //} else {
                //    $("#" + catentids[i] + "stock_holder").html("Stock Count: Out of Stock");
                }

                $('.gmpoints').css("display", "block");
                $('.stock').css("display", "block");
            } else {
                $('.gmpoints').css("display", "none");
                $('.stock').css("display", "none");
            }

            if (document.getElementById(catentids[i] + "|price") != null) {
                var priceamt = document.getElementById(catentids[i] + "|price").value;
                var priceamt = priceamt.split('|');
                if (priceamt != "") {
                    if (priceamt.length == 1) {
                        if (priceamt != "Price as configured") {
                            x = document.getElementsByName(catentids[i] + "wholeprice");
                            for (j = 0; j < x.length; j++) {
                                x[j].innerHTML = priceamt[0];
                            }
                        } else {
                            x = document.getElementsByName(catentids[i] + "configPriceHolder");
                            for (j = 0; j < x.length; j++) {
                                x[j].style.display = 'none';
                            }
                            x = document.getElementsByName(catentids[i] + "wholepriceConfig");
                            for (j = 0; j < x.length; j++) {
                                x[j].innerHTML = priceamt[0];
                            }
                        }
                    } else if (priceamt.length == 2) {
                        x = document.getElementsByName(catentids[i] + "wholeprice");
                        for (j = 0; j < x.length; j++) {
                            x[j].innerHTML = priceamt[0];
                        }
                        x = document.getElementsByName(catentids[i] + "decimalprice");
                        for (j = 0; j < x.length; j++) {
                            x[j].innerHTML = priceamt[1];
                        }
                    } else if (priceamt.length == 3) {
                        x = document.getElementsByName(catentids[i] + "startingat");
                        for (j = 0; j < x.length; j++) {
                            x[j].innerHTML = priceamt[0];
                        }
                        x = document.getElementsByName(catentids[i] + "wholeprice");
                        for (j = 0; j < x.length; j++) {
                            x[j].innerHTML = priceamt[1];
                        }
                        x = document.getElementsByName(catentids[i] + "decimalprice");
                        for (j = 0; j < x.length; j++) {
                            x[j].innerHTML = priceamt[2];
                        }
                    } else if (priceamt.length == 4) {
                        if (typeof document.getElementsByName(catentids[i] + "wholeprice") !== 'undefined' && document.getElementsByName(catentids[i] + "wholeprice") !== null) {
                            x = document.getElementsByName(catentids[i] + "startingat");
                            for (j = 0; j < x.length; j++) {
                                x[j].innerHTML = priceamt[0];
                            }
                            x = document.getElementsByName(catentids[i] + "wholeprice");
                            for (j = 0; j < x.length; j++) {
                                x[j].innerHTML = priceamt[2];
                            }
                            x = document.getElementsByName(catentids[i] + "decimalprice");
                            for (j = 0; j < x.length; j++) {
                                x[j].innerHTML = priceamt[3];
                            }
                        }
                    }
                } else {
                    x = document.getElementsByName(catentids[i] + "priceDiv");
                    for (j = 0; j < x.length; j++) {
                        x[j].style.display = 'none';
                    }
                }
            } else {
			if (document.getElementById(catentids[i] + "priceDiv") != null){
                document.getElementById(catentids[i] + "priceDiv").style.display = 'none';
					}
            }
            if (document.getElementById(catentids[0] + "wholeprice") != null && document.getElementById(catentids[0] + "decimalprice") != null) {
                var totalprice = document.getElementById(catentids[0] + "wholeprice").innerHTML + "." + document.getElementById(catentids[0] + "decimalprice").innerHTML;

            }
            if (document.getElementById(catentids[i] + "|AddToCart") != null && document.getElementById("InventoryStatus_AddToCart_Section_" + catentids[i]) != null) {
                document.getElementById("InventoryStatus_AddToCart_Section_" + catentids[i]).style.display = document.getElementById(catentids[i] + "|AddToCart").value;
            }
            if (document.getElementById(catentids[i] + "|OutOfStock") != null && document.getElementById("InventoryStatus_OutOfStock_Section_" + catentids[i]) != null) {
                document.getElementById("InventoryStatus_OutOfStock_Section_" + catentids[i]).style.display = document.getElementById(catentids[i] + "|OutOfStock").value;
            }
            if (document.getElementById(catentids[i] + "|InventoryStatusMsg") != null && document.getElementById("InventoryStatus_Availability_Section_" + catentids[i]) != null) {
                document.getElementById("InventoryStatus_Availability_Section_" + catentids[i]).innerHTML = document.getElementById(catentids[i] + "|InventoryStatusMsg").value;
            }
            if (document.getElementById(catentids[i] + "|InventoryStatusMsg") != null
                    && document.getElementById("old_InventoryStatus_Availability_Section_" + catentids[i]) != null) {
                document.getElementById("old_InventoryStatus_Availability_Section_" + catentids[i]).innerHTML = document.getElementById(catentids[i] + "|InventoryStatusMsg").value;
            }
        }
    }
    if (document.getElementById("modelsIds") != null) {
        var modelsids = document.getElementById("modelsIds").value;
        var modelsids = modelsids.split(',');

        for (i = 0; i < modelsids.length; i++) {
            var modId = "model_" + modelsids[i].trim();
            if (document.getElementById(modId) != null) {
                var modelPriceArray = [];
                var modelCatentryIds = document.getElementById(modId).value;
                var modelCatentryIds = modelCatentryIds.split(',');
                for (j = 0; j < modelCatentryIds.length; j++) {
                    var modelCatentryId = modelCatentryIds[j].trim();
                    if (document.getElementById(modelCatentryId + "|price") != null) {
                        var catentryPriceAmt = document.getElementById(modelCatentryId + "|price").value;
                        var catentryPriceAmt = catentryPriceAmt.split('|');
                        if (catentryPriceAmt != "" && catentryPriceAmt != "Price as configured") {
                            if (catentryPriceAmt.length == 2) {
                                a = catentryPriceAmt[0].replace(",", "") + '.' + catentryPriceAmt[1];
                            }
                            if (catentryPriceAmt.length == 3) {
                                a = catentryPriceAmt[1].replace(",", "") + '.' + catentryPriceAmt[2];
                            }
                            if (catentryPriceAmt.length == 4) {
                                a = catentryPriceAmt[2].replace(",", "") + '.' + catentryPriceAmt[3];
                            }
                            if (a != null) {
                                modelPriceArray.push(a);
                            }
                        }
                    }
                    if (document.getElementById(modelCatentryId + "|AddToCart") != null && document.getElementById("InventoryStatus_AddToCart_Section_" + modelCatentryId) != null) {
                        document.getElementById("InventoryStatus_AddToCart_Section_" + modelCatentryId).style.display = document.getElementById(modelCatentryId + "|AddToCart").value;
                    }
                    if (document.getElementById(modelCatentryId + "|OutOfStock") != null
                            && document.getElementById("InventoryStatus_OutOfStock_Section_" + modelCatentryId) != null) {
                        document.getElementById("InventoryStatus_OutOfStock_Section_" + modelCatentryId).style.display = document.getElementById(modelCatentryId + "|OutOfStock").value;
                    }
                    if (document.getElementById(modelCatentryId + "|InventoryStatusMsg") != null
                            && document.getElementById("InventoryStatus_Availability_Section_" + modelCatentryId) != null) {
                        document.getElementById("InventoryStatus_Availability_Section_" + modelCatentryId).innerHTML = "<b>"
                                + document.getElementById(modelCatentryId + "|InventoryStatusMsg").value + "</b>";
                    }
                }
                if (modelPriceArray != null) {
                    var min = Math.min.apply(Math, modelPriceArray);
                    min = (min).toFixed(2);
                    min = min.toString()
                    min = min.split('.');
                    if (min.length == 2) {
                        /*
                         * x = document.getElementsByName(modId + "wholeprice"); for (m = 0; m < x.length; m++) { x[m].innerHTML = numberWithCommas(min[0]); } x =
                         * document.getElementsByName(modId + "decimalprice"); for (m = 0; m < x.length; m++) { x[m].innerHTML = min[1]; }
                         */

                        if (document.getElementById(modId + "wholeprice") != null) {
                            document.getElementById(modId + "wholeprice").innerHTML = numberWithCommas(min[0]);
                        }
                        if (document.getElementById(modId + "decimalprice") != null) {
                            document.getElementById(modId + "decimalprice").innerHTML = min[1];
                        }
                    }
                }
            }
        }
    }
    $("#OldPriceAJAX").remove();
    productDisplayView(totalprice);
}
function productDisplayView(totalprice) {
    if (document.getElementById("isPDP") != null) {
        var pdpprice = totalprice;
        PDPstdTag(productName, userId, Sku, pdpprice, sectionValue, '${usertype}', pagefunction, countryname, websectionId, hp_profileId, CID);
    }
}