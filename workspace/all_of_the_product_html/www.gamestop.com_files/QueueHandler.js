/*************************************************
* Purpose: US112 - Queue handler for Certona call
* Created date: Thursday May 24 2012
* Created by: Infosys LTD

* Modification Details
* Purpose     Modified On   Modified By  
         
*************************************************/

//Namespace declaration
var GameStop = {}
var cartridgeCount = 0;
var cParams = new Array();
var arr_l = []; var arr_r = []; var arr_rr = []; var arr_c = []; var arr_su = []; var arr_dc = []; var arr_fn = []; var arr_ri = []; var arr_gf = [];


//Handle request from cartridges 
GameStop.QueueRequest = function () { cartridgeCount = cartridgeCount + 1 }
GameStop.QueueRequest.prototype = {
    queueReq: function (url, inputdata) {

        if (cartridgeCount < certonaCount) {
            var jsonObject = eval('(' + inputdata + ')');
            cParams[cartridgeCount] = { 'parm': jsonObject };
            return;
        }
        else {
            var json_object = eval('(' + inputdata + ')');
            cParams[cartridgeCount] = { 'parm': json_object };
            var jsonData = concatInputs(cParams);
            // Send the complete request as JSON
            sendRequest(url, jsonData);
        }
    }
}


//Send certona request to Certona handler
function sendRequest(url, inputdata) {
    $.getData(url, inputdata, processResponse);
}


//Handle the Certona response
function processResponse(data) {
    if (data != null) {
        if (data.d != null) {
            BindDataToCartridge(data.d);
        }
    }
    else return null;
}


//Process the input in Certona request
function concatInputs(paramsArray) {
    if (paramsArray != null) {
        for (var data in paramsArray) {
            var childData = paramsArray[data];
            for (var input in childData) {
                var childInput = childData[input];
                for (var key in childInput) {
                    if ((key == 'l') & (childInput[key] != '')) arr_l.push(childInput[key]);
                    if ((key == 'r') & (childInput[key] != '')) arr_r.push(childInput[key]);
                    if ((key == 'rr') & (childInput[key] != '')) arr_rr.push(childInput[key]);
                    if ((key == 'c') & (childInput[key] != '')) arr_c.push(childInput[key]);
                    if ((key == 'su') & (childInput[key] != '')) arr_su.push(childInput[key]);
                    if ((key == 'dc') & (childInput[key] != '')) arr_dc.push(childInput[key]);
                    if ((key == 'fn') & (childInput[key] != '')) arr_fn.push(childInput[key]);
                    if ((key == 'ri') & (childInput[key] != '')) arr_ri.push(childInput[key]);
                    if ((key == 'gf') & (childInput[key] != '')) arr_gf.push(childInput[key]);
                }
            }
        }
        var l = arr_l.join(';');
        var r = arr_r.join(';');
        var rr = arr_rr.join(';');
        var c = jQuery.unique(arr_c).join(';');
        var su = arr_su.join(';');
        var dc = arr_dc.join(';');
        var fn = arr_fn.join(';'); var ri = arr_ri.join(';');
        var gf = arr_gf.join(';');
        var parameter = '{"l":"' + l + '","r":"' + r + '","rr":"' + rr + '","c":"' + c + '","su":"' + su + '","dc":"' + dc + '","fn":"' + fn + '","ri":"' + ri + '","gf":"' + gf + '"}';
        return parameter;
    }
}

var val;
//Callback catridges to load the data
function BindDataToCartridge(response) {
    for (certonaType in certonaArray) {
        var type = certonaArray[certonaType];
        var applyTemplate = 'ApplyTemplate_' + certonaType + "();";
        if (jQuery.isEmptyObject(response)) CreateTemplate('', applyTemplate);
        for (var certonaResult in response) {
            var resultType = response[certonaResult];
            if (type == certonaResult) {
                if (jQuery.isEmptyObject(resultType)) val = null;
                else val = resultType;
                CreateTemplate(resultType, applyTemplate);
            }
            else { val = null; CreateTemplate('', applyTemplate); }
        }

    }

    certonaResx.run();
}
function CreateTemplate(data, applyTemplate) {
    eval(applyTemplate);
}


