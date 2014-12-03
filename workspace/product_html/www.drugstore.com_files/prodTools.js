
var gReloadProdRecOverlay = false;
var nonFF = !/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
function UpdatePriceCompare(PriceData) {
	var oPrice = document.getElementById(PriceData.PriceId);
	var subtotal = (PriceData.Qty * PriceData.BasePrice);
	oPrice.innerHTML = "$" + subtotal.toFixed(2);
	
	if(PriceData.PriceEffectiveId) {
		var oPrice = document.getElementById(PriceData.PriceEffectiveId);
		if(oPrice) {
			if(PriceData.BasePrice > PriceData.PriceEffective) {
				subtotal = (PriceData.Qty * PriceData.PriceEffective);
				oPrice.innerHTML = "$" + subtotal.toFixed(2);
			}
		}
	}
}

function PriceData(qty, price, priceId, priceEffective, priceEffectiveId) {
	this.Qty = qty;
	this.BasePrice = price;
	this.PriceId = priceId;
	this.PriceEffective = priceEffective;
	this.PriceEffectiveId = priceEffectiveId;
}


function BaseZoomConfig()
{
	this.Name = 'zoom_win';
	this.Config = 'zoom_config';
	this.ZoomWidth = 420;
	this.ZoomHeight = 500;
	this.WindowWidth = 420;
	this.WindowHeight = 490;
	this.WindowTitle = 'Product Zoom';
	this.Top = (screen.height-this.WindowHeight)/2;
	this.Left = (screen.width-this.WindowWidth)/2;
	this.Right = 0;
	this.Bottom = 0;
}
BaseZoomConfig.prototype.GetURL=function() {
	return this.URL+'?company=Drugstore&windowtitle=' + this.WindowTitle + '&sku='+this.ProductID+'&zoomwidth='+this.ZoomWidth+'&zoomheight='+this.ZoomHeight+'&config='+this.Config;
}

function ZoomConfig(url, pid, windowTitle, siteId, isMicrosite) 
{
	this.URL = url;
	this.ProductID = pid;
	this.WindowTitle = windowTitle;

	if (siteId != 'undefined') 
	{
		if (siteId != 1 && isMicrosite == 0) 
		{
			this.Config = 'zoom_config_dscm';
		}
		else if (isMicrosite == 1) 
		{
			this.Config = 'zoom_config_' + siteId;
		}
	}
}

ZoomConfig.prototype = new BaseZoomConfig();
function zoom_window(config) {
	try{
		popUp(config.GetURL(),config.Name,config.WindowWidth,config.WindowHeight,'','yes','','','',config.Top,config.Right,config.Bottom,config.Left);
	} catch(e) {}
}

function FireClickEvent(id)
{
     try
     {
           var el = document.getElementById(id);
           if(el)
           {       
               el.click();
           }
     } catch(e) {}
}

// function to render the auto delivery overlay
// loads the iframe only for the first time
function openAutoDeliveryOverlay(obj, src)
{
	var exists = false;
	var adOverlayName = "ADOverlay";
	
	if(gE(adOverlayName) != null) exists = true;
	
	if (exists)
	{
		showOverlay(obj, adOverlayName, true, false);
	}
	else
	{
		var html = "";
		html = html + "<div id=\"ADFrameCntr\">";
			html = html + "<iframe title=\"Autodelivery Overlay\" id=\"iFrmAutoDelivery\" name=\"iFrmAutoDelivery\" src='" + src + "' hspace=\"0\" vspace=\"0\" marginwidth=\"0\" marginheight=\"0\" frameborder=\"0\" scrolling=\"auto\" onload=\"resizeContainerFrame('iFrmAutoDelivery');\"></iframe>"
		html = html + "</div>";
		createOverlay(html, "Auto Delivery", adOverlayName, null);
	}
}

// function to render the auto delivery overlay
// loads the iframe only for the first time
function openProductRecommenderOverlay(obj, src)
{
	var exists = false;
	var overlayName = "ProdRecOverlay";
	
	if(gE(overlayName) != null) exists = true;
	
	if (exists && !gReloadProdRecOverlay)
	{
		showOverlay(obj, overlayName, true, false);
	}
	else
	{
		var html = "";
		html = html + "<div id=\"ProdRecFrameCntr\">";
			html = html + "<iframe title=\"Product recommend Overlay\" id=\"iFrmProdRec\" name=\"iFrmProdRec\" src='" + src + "' hspace=\"0\" vspace=\"0\" marginwidth=\"0\" marginheight=\"0\" frameborder=\"0\" scrolling=\"auto\"></iframe>"
		html = html + "</div>";
		createOverlay(html, "Email a Friend", overlayName, null);
		gReloadProdRecOverlay = false;//this will be set to "true" by email overlay after submitting the form.
	}
}

function UpdateHiddenPromoIDCollection(thisCheck) {
	if (thisCheck.checked) //if the PromoID checkbox is checked"
	{ AddValueToHiddenField(thisCheck.value) }
	else {
		RemoveValueFromHiddenField(thisCheck.value)
	}
}

function AddValueToHiddenField(valueToAdd) {
	if (valueToAdd > 0) {
		var hiddenText = document.getElementById('hdnPromoId');
		var indexOfHyphen = hiddenText.value.indexOf('-');
		if (indexOfHyphen > 0) // if there is atleast one '-', that is atleast two entries
		{
			hiddenText.value = hiddenText.value + '-' + valueToAdd;
		}
		else {
			if (hiddenText.value.length == 0) {
				hiddenText.value = valueToAdd;
			}
			else {
				hiddenText.value = hiddenText.value + '-' + valueToAdd;
			}
		}
	}
}

function RemoveValueFromHiddenField(valueToRemove) {
	var hiddenText = document.getElementById('hdnPromoId');
	var indexOfHyphen = hiddenText.value.indexOf('-');
	if (indexOfHyphen > 0) // if there is atleast one '-', that is atleast two entries
	{
		var promoIDArray = hiddenText.value.split('-');
		var indexOfValueToRemove = 0;
		for (var index = 0; index < promoIDArray.length; index++) {
			if (promoIDArray[index] == valueToRemove) {
				indexOfValueToRemove = index;
			} 
		}
		promoIDArray.splice(indexOfValueToRemove, 1) //delete the item 
		for (var index = 0; index < promoIDArray.length; index++) {
			if (index != 0) {
				hiddenText.value = hiddenText.value + '-' + promoIDArray[index];
			} else {
				hiddenText.value = promoIDArray[index];
			} 
		} 
	}
	else {
		if (hiddenText.value == valueToRemove) {
			hiddenText.value = '';
		}
	}
}

//Product Grouping Image Tool Tip Begin
var isFirst = true;
var isNoImage = false;
function ShowImageTooltip(obj, event, imagePath, imageName) {
    var eventType = event.type;
    var html;
    
    if (imageName == "No for Size") {
        html = '<table style="background:Transparent;border:solid 0 Transparent">';
        html += '<tr><td class="DropDownShadow"><img src=' + imagePath + ' alt="" border="0" class="ImageDropDownSadow"/> </td></tr>';
        html += '</table>'

        isNoImage = true;
    }
    else {
        html = '<div class="ToolTipBox">';
        html += '<img src=' + imagePath + ' alt="" border="0"/><br />';
        html += imageName;
        html += '</div>'

        isNoImage = false;
    }

    SetMouseEvent();

    toolTip(html)

    if (eventType == 'focus')
    {
        $(obj).blur(function ()
        {
            CloseImageToolTip();
        });

        $(obj).keypress(function (e)
        {
            if ((e.which || e.keyCode) == 13)
            {
                SetOmnitureEvar('evar37', 'Select Color');
            }
        });
    }

    if (eventType == 'mouseover') {
        $(obj).mouseout(function () {
            CloseImageToolTip();
        });

        $(obj).click(function () {           
            SetOmnitureEvar('evar37', 'Select Color');
        });
    }
}

function toolTip(msg, fg, bg) {
    
    var toolTipSTYLE;
    if (document.getElementById) {
        toolTipSTYLE = document.getElementById("divToolTipLayer").style;
    }

    toolTipSTYLE.visibility = "visible";
    toolTipSTYLE.display = "none";

    if (!fg) fg = "#777777";
    if (!bg) bg = "#ffffe5";

    document.getElementById("divToolTipLayer").innerHTML = msg;
    toolTipSTYLE.display = 'block'
}

function SetMouseEvent() {
    if (isFirst) {
        document.onmousemove = moveToMousePos;
        isFirst = false;
    }
}
function moveToMousePos(e) {
    var x = 0;
    var y = 0;

    var topPosition = parseInt(document.getElementById('divToolTipLayer').offsetHeight);

    if (navigator.appName == "Netscape") {
        x = e.pageX
        y = e.pageY

        if (topPosition <= 90) {
            topPosition = 85;
        }

    }
    else {
    	x = event.clientX + document.body.scrollLeft;

    	//document.documentElement.scrollTop is in IE if page is using in higher version of doctype
		//Check page is scrolled or not.(In doc type mode)
    	if (document.documentElement && !document.documentElement.scrollTop) {
    		y = event.clientY + document.body.scrollTop;
    	}//In doc type mode take the scroll top position in higher version of doc type.
    	else if (document.documentElement && document.documentElement.scrollTop) {
    		y = event.clientY + document.documentElement.scrollTop;
    	}//In non doc type mode or lower version of doc type mode.
    	else if (document.body && document.body.scrollTop) {
    		y = event.clientY + document.body.scrollTop;
    	}

        if (topPosition <= 90) {
            topPosition = 95;
        }
    }

    if (isNoImage)
        topPosition = 70;


    topPosition = topPosition + 10;
    document.getElementById("divToolTipLayer").style.left = x - 50 + 'px';
    document.getElementById("divToolTipLayer").style.top = (parseInt(y) - parseInt(topPosition)) + 'px';

    return true;
}

function CloseImageToolTip() {
    document.getElementById("divToolTipLayer").style.display = "none";
}

function GetTopLeft(elm) {
    var x, y = 0;
    x = elm.offsetLeft;
    y = elm.offsetTop;
    elm = elm.offsetParent;
    while (elm != null) {
        x = parseInt(x) + parseInt(elm.offsetLeft);
        y = parseInt(y) + parseInt(elm.offsetTop);
        elm = elm.offsetParent;
    }
    return { Top: y, Left: x };
}

function setFramePosition(imgID) {
    var dim = GetTopLeft(document.getElementById(imgID));
    var frm = document.getElementById("divToolTipLayer");

    var decrement;
    if (navigator.appName == "Netscape") {
        decrement = 150;
    }
    else {
        decrement = 100;
    }

    frm.style.top = (parseInt(dim.Top) - decrement) + 'px';
    frm.style.left = (parseInt(dim.Left)-30) + 'px';
    return true;
}
//Product Grouping Image Tool Tip End

//DFE 576
function DoUpdateQuantitySubmit(lineItem_Id) {
    var txtBoxId = "txtQuantity" + lineItem_Id;
    document.getElementsByName("hdnLineItemId")[0].value = lineItem_Id;
    document.frmRecalc.submit();
}

function ShowAllColors() {
    var colorPaletteBoxStyle ;
    if (document.getElementById) {
        colorPaletteBoxStyle = document.getElementById("divColorDistinctions").style;
    }

    colorPaletteBoxStyle.height = "auto";
    colorPaletteBoxStyle.overflow = "hidden";
}

function ShowSwatchImageTooltip(obj,imagePath, imageName,event) {
    var eventType = event.type;
    var html;

    html = '<div id="productSwatch" class="productSwatch">';
    html += '<img src=' + imagePath + ' alt= ' + imageName + 'border="0"/>';
    html += '</div>';
    html += '<div id="productName" class="productName">';
    html += '<label class="groupDistinctionLabel">';
    html += imageName;
    html += '</label>';
    html += '</div>';
    document.getElementById("hoverSwatchSection").innerHTML = html;
    document.getElementById("productSwatchSection").style.display = "none";
    document.getElementById("hoverSwatchSection").style.display = "block";

    if (eventType == "mouseover")
    {
        $(obj).mouseout(function ()
        {
            CloseSwatchImageToolTip();
        });

        $(obj).click(function () {
            SetOmnitureEvar('evar37', 'Select Color');            
        });
    }

    if (eventType == "focus")
    {
        $(obj).blur(function () {
            CloseSwatchImageToolTip();
        });

        $(obj).keypress(function (e) {
            if ((e.keyCode || e.which) == 13) {
                SetOmnitureEvar('evar37', 'Select Color');                
            }
        });
    }
}

function CloseSwatchImageToolTip() {
    document.getElementById("hoverSwatchSection").style.display = "none";
    document.getElementById("productSwatchSection").style.display = "block";
}

function ShowColorDropDown() {        
        document.getElementById("selectOptFORM").style.display = "block";
        document.getElementById("selectOptFORM").style.left = "0";        
        document.getElementById("colorDropDown").style.display = "block";         
}

function HideColorDropDownByTarget(target)
{    
        var parentId = '';
        var parents = $(target).parentsUntil("form");
        for (var i = 0; i < parents.length; i++) {
            if (parents[i].id != undefined && parents[i].id == "colorDropDown") {
                parentId = parents[i].id;
            }
        }
        if (!nonFF && target.id=="selColor")
        {
            parentId = target.id;
        }
        if (parentId == '') {
            HideColorDropDown();
        }    
}

function TriggerColorDropDownDivFocus(selcolorDropDown)
{    
    if (selcolorDropDown != undefined && selcolorDropDown != null) {        
        ShowColorDropDown();       

        var colorDropDownAnchors = document.getElementById("colorDropDown").getElementsByTagName("a");        
        if (colorDropDownAnchors != undefined && colorDropDownAnchors.length > 0) {
            for (var i = 0; i < colorDropDownAnchors.length; i++) {                
                $(colorDropDownAnchors[i]).keypress(function (e)
                {
                    if ((e.keyCode || e.which) == 13) {
                        SetOmnitureEvar('evar37', 'Select Color');
                    }
                });

                $(colorDropDownAnchors[i]).click(function (e) {                    
                        SetOmnitureEvar('evar37', 'Select Color');                    
                });
                
                $(colorDropDownAnchors[i]).focus(function (e) {
                    if (nonFF) {
                        this.parentElement.style.outline = "dotted 1px";
                    }
                });
                              
                $(colorDropDownAnchors[i]).blur(function (e) {
                    this.parentElement.style.outline = "none";
                    if (nonFF) {
                        var target = e.relatedTarget || document.activeElement;
                        HideColorDropDownByTarget(target);
                    }
                    else {
                        var timer = setTimeout(function () {
                            var target = document.activeElement;
                            HideColorDropDownByTarget(target);
                            clearTimeout(timer);
                        }, 25);                       
                    }                    
                });
            }
        }

        $(selcolorDropDown).keypress(function (e) {
            if ((e.keyCode || e.which) == 13) {
                SetOmnitureEvar('evar37', 'Select Color');
            }
        });

        $(selcolorDropDown).click(function () {
            SetOmnitureEvar('evar37', 'Select Color');
        });

        $(selcolorDropDown).mouseover(function (e) {
            ShowColorDropDown();
        });

        $(selcolorDropDown).mouseout(function (e) {
            HideColorDropDown();
        });

        $(selcolorDropDown).focus(function (e) {
            ShowColorDropDown();
        });

        $(selcolorDropDown).blur(function (e) {
                if (nonFF) {
                    var target = e.relatedTarget || document.activeElement;
                    var parents = $(target).parentsUntil("body");
                    var parentId="";
                    for (var i = 0; i < parents.length; i++) {
                        if (parents[i].id != undefined && parents[i].id == 'colorDropDown')
                        {
                            parentId = parents[i].id;
                        }
                    }
                    if (parentId != 'colorDropDown') {
                        HideColorDropDown();
                    }
                }
                else {
                    var timer = setTimeout(function () {
                        var target = document.activeElement;
                        parentId = target.id;
                        if (parentId == "") {
                            HideColorDropDown();
                        }
                        clearTimeout(timer);
                    }, 25);                   
                }                                        
            });                    
    }
}


function TriggerBulletedPromoClick(e)
{
    if ((e.keyCode || e.which) == 13) {
        SetOmnitureEvar('evar36', 'Special Offers and Perks');
    }
}

function HideColorDropDown()
{
         document.getElementById("selectOptFORM").style.display = "none";
         document.getElementById("selectOptFORM").style.left = "-9999";         
         document.getElementById("colorDropDown").style.display = "none";              
}

function TriggerColorDropDownListFocus(colorDropDown, event) {
	var evenType = event.type;
	if (colorDropDown != undefined && colorDropDown != null) {
		ShowColorDropDown();
		$(colorDropDown).keypress(function (e) {
			if ((e.keyCode || e.which) == 13) {
				SetOmnitureEvar('evar37', 'Select Color');
			}
		});

		$(colorDropDown).click(function () {
			SetOmnitureEvar('evar37', 'Select Color');
		});

		$(colorDropDown).mouseout(function () {
			HideColorDropDown();
		});

		if (evenType == 'focus') {
			var colorDropDownUL = document.getElementById(colorDropDown.id);
			if (colorDropDownUL != undefined && colorDropDownUL != null) {
				var colorDropDownAnchors = document.getElementsByTagName("a");
				if (colorDropDownAnchors != undefined && colorDropDownAnchors.length > 0) {
					for (var i = 0; i < colorDropDownAnchors.length; i++) {
						$(colorDropDownAnchors[i]).blur(function (e) {
							if (nonFF) {
								var target = e.relatedTarget || document.activeElement;
							}
							else {
								var target = e.relatedTarget || e.target;
							}
							var parentId = '';
							var parents = $(target).parentsUntil("form");
							for (var i = 0; i < parents.length; i++) {
								if (parents[i].id != undefined && parents[i].id == "colorDropDown") {
									parentId = parents[i].id;
								}
							}
							if (parentId == '') {
								HideColorDropDown();
							}
						});
					}
				}
			}
		}
	}
}