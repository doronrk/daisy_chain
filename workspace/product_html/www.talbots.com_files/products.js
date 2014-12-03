var selectedColor;
var colorToDisplay;
var colorCode;
var selectedSize;
var selectedConcept;
var userAction;
var pendingRequest;
var productDetailsUrl;
var containerScope;
var isGcAmountKeyUp=false;
var selectedQuantity;
var selectedQTY;
var comrowID;
var prodJson;
var selectedpntslgth=0;
var populateQty=true;
var selectedSKU;
var cid;
var selectedSkuItem;

/**
* This function will be called from the wishlist service popup
* Close button.
*/
function closeButton()
{
	$(".modalContent").css("display", "none");
	$("#wishListConfirmation").css("display", "none");
}

/**
* This variable is used to hold the selectedFabric.
* This would be appended to the QueryString and sent to the Server for Processing.
*/
var selectedFabric;
/**
* This is used to hold the pants Length for users
*/
var selectedPantLength;
$.fn.getImagePath = function(){

    if(config.s7path){
        return config.s7path;
    } else {
        return "http://www.talbots.com/is/image/Talbots/";
    }

}


$.fn.updateZoomImage = function(imageName){
    magicZoomDisabled = false;
        try
        {
            MagicZoom_stopZooms();
            magicZoomDisabled = false;

        }
        catch(err)
        {
           magicZoomDisabled = true;
        }
    //this edits the #medHero image on the product details page.
    //It gathers data from hidden form elements on the page
    //this is configured for sapient development server currently

    var imagePath = $(this).getImagePath();
    var smImage = imagePath + imageName;
    var medImage = imagePath + imageName + "?$quickView$";
    var lgImage = imagePath + imageName + "?$zoom$";
    var longdesc = imagePath + imageName.split("_")[0] + "?$quickView$";
    var defaultImage = "/images/fpo/Noimage_PDP_Large.jpg";

    //turn off the zoom app, update the image, then re-enable

    $("#heroContainer").children("img").fadeOut(function(){
        $("#heroContainer").attr("href", lgImage);
        $("#heroContainer").html("<img src='"+medImage+"' style='display: none;' longdesc='"+ longdesc +"' style='display: block;' onerror='imageLoader(this, \"" + defaultImage+"\")' />");
        $("#heroContainer img").fadeIn("slow", function(){
           if(!magicZoomDisabled){
            MagicZoom_findZooms();
           }
        })
    })
    
    // SS4PAS - Added for Woman\Woman Petites catalog images.
	var buildAlts = $('[name=buildAlts]').val();
    var conceptToUse = $('[name=conceptToUse]').val();
    var catToUse = '';
    
    /* Changes for #2673 - Added condition to check whether conceptToUse is blank/undefined
     * as there is a chance of getting conceptToUse value as undefined while user is in 
     * Edit Shopping bag page. If conceptToUse throws undefined error the subsequent script
     * methods will not be executed.
     */

	if (buildAlts != undefined && buildAlts.length > 0)
	{
		var idx=0;
		var imgHTML = '';
		var queryHTML = '';
		var arrImages = buildAlts.split(',');
		var pageURL = document.location.href;
		var pageParts = pageURL.split('?');
		if(pageParts.length > 1){
			var queryParts = pageParts[1].split('&');
			for (idx=0; idx < queryParts.length; idx++)
			{
				if (queryParts[idx].indexOf("selectedConcept")>=0)
				{
					//Do not append
				}
				else if (queryParts[idx].indexOf("rootCategory")>=0 && catToUse.length > 0)
				{
					queryHTML += "&rootCategory=" + catToUse;
				}
				else if (queryParts[idx].indexOf("conceptIdUnderSale")>=0 && catToUse.length > 0)
				{
					queryHTML += "&conceptIdUnderSale=" + catToUse;
				}			
				else if (queryParts[idx].indexOf("zoomImage")<0)
				{
					queryHTML += "&" + queryParts[idx];
				}
			}
			queryHTML += "&" + "selectedConcept=" + conceptToUse.replace(" ", "%20");
			
			imgHTML += "<ul class=\"gallery\">";
			for (idx = 0; idx < arrImages.length; idx++) 
			{
				imgHTML += "<li><a href=\"/online/browse/product_details.jsp?zoomImage=";
				imgHTML += arrImages[idx];
				imgHTML += queryHTML;
				imgHTML += "\"><img src=\"//talbots.scene7.com/is/image/Talbots/";
				imgHTML += (arrImages[idx]);
				imgHTML += "?$altViewProd$\" longdesc=\"";
				imgHTML += (arrImages[idx]);
				imgHTML += "\"/></a></li>";
			}
			imgHTML += "</ul>";
			$('div.galleryAlts').html(imgHTML);
			$('#galleryAlts li').first().css('border','1px solid black');
		}
	}
  
}
//FUNCTION TO ALTER IMAGE FOR LIST VIEW WHEN USERS CHANGE COLOR CONCEPT OR SIZE SWATCHES
$.fn.updateListImage = function(imageName,productId){
    //alert("Inside list Image: "+imageName);
    //this edits the #medHero image on the product details page.
    //It gathers data from hidden form elements on the page
    //this is configured for sapient development server currently
    var imagePath = $(this).getImagePath();
    var smImage = imagePath + imageName;
    var medImage = imagePath +imageName + "?$listView$";
    var longdesc = imagePath + imageName.split("_")[0] + "?$listView$";
    var listContainer = "." + productId + "_" + "listContainer";
    var defaultImage = "/images/fpo/Noimage_folderView.jpg";

    $(listContainer).children("img").fadeOut(function(){
        $(listContainer).html("<img class='thumb imageLoader' src='"+medImage+"' longdesc='" + longdesc + "' style='display: block;' onerror='imageLoader(this, \"" + defaultImage+"\")' />");
    })

}

//FUNCTION TO ALTER IMAGE FOR outfit VIEW WHEN USERS CHANGE COLOR CONCEPT OR SIZE SWATCHES
$.fn.updateOutfitImage = function(imageName,productId,comrowID){
	//alert("Inside updateOutfitImage: "+imageName);
    //this edits the #medHero image on the product details page.
    //It gathers data from hidden form elements on the page
    //this is configured for sapient development server currently
	var longdesc;
	var imageStyle;    
	var medImage;
	var imagePath = $(this).getImagePath();
    var smImage = imagePath + imageName;
    var outfitDetailsContainer = "#" + productId + "_" + "outfitDetails";
    var defaultImage = "/images/fpo/Noimage_78x106.jpg";
    var row=$('#'+comrowID);
    
    /* 
     * Changes for #2673 - Condition to check whether use is in new/old shopping bag page.
     * As the image sizes are different for old & new pages, the image tag should be 
     * populated based on the page. 
     *  
     */
    if ($("#sourcePage").val() == 'newCheckoutPage') {
    	imageStyle = "?$bagView$";
    } else {
    	imageStyle = "?$wishList$";
    }
    longdesc = imagePath + imageName.split("_")[0] + imageStyle;
    medImage = imagePath +imageName + imageStyle;
    
    /* 
     * #2673 - Code to display the changed image on shopping bag page.
     * Commented the code which is trying to reach HTML element which is not available.
     */
    $(row).find('img'+outfitDetailsContainer).attr("src",medImage);
	//$(outfitDetailsContainer).attr('src', medImage);
	$(outfitDetailsContainer).attr('longdesc', longdesc);
    
    /*$(outfitDetailsContainer).children("img").fadeOut(function(){
        $(outfitDetailsContainer).html("<img class='thumbOutfitDetail imageLoader' src='"+medImage+"' longdesc='" + longdesc + "' style='display: block;' onerror='imageLoader(this, \"" + defaultImage+"\")' />");
    })*/

}

$.fn.changeFindImage = function(imageName){
	var imagePath = $(this).getImagePath();
    var newImage = imagePath + imageName + "?$coordinates$";

    $(this).fadeOut(function(){
        $(this).attr("src", newImage).fadeIn();
    })
}

//FUNCTION TO ALTER IMAGE FOR GALLERY VIEW WHEN USERS CHANGE COLOR CONCEPT OR SIZE SWATCHES
$.fn.updateGalleryImage = function(imageName,productId){
    //alert("Inside gallery Image: "+imageName);
    //this edits the #medHero image on the product details page.
    //It gathers data from hidden form elements on the page
    //this is configured for sapient development server currently
    imagePath = $(this).getImagePath();

    var smImage = imagePath + imageName;
    var medImage = imagePath +imageName + "?$quickView$";
    var longdesc = imagePath + imageName.split("_")[0] + "?$quickView$";
    var defaultImage = "/images/fpo/Noimage_PDP_Large.jpg";

    $("#quickView #quickGalleryHero").fadeOut(function(){
        $("#quickGalleryHero").remove();
        $("#galleryProductDetails").before("<img id='quickGalleryHero' onerror='imageLoader(this, \"" + defaultImage + "\")' longdesc='"+ longdesc +"' src='"+medImage+"'/>");
    });
}

$.fn.changeZoomStyle = function(imageName){
    $(this).updateZoomImage(imageName);
}
$.fn.changeZoomColor = function(imageName){
    $(this).updateZoomImage(imageName);
}

$.fn.changeProduct = function(obj){
   // var dataObj = $.evalJSON($("form[action="+ obj.action + "] .jsonData").val())
	
    //alert($.toJSON(dataObj))
	
    $(obj.container).before("<img src='/images/icons/ajax-loader.gif' class='loadingImage' />")
    $(obj.container).fadeOut("fast", function(){


            if(obj.action == null || obj.action=="") {

                obj.action=productDetailsUrl;
            }
            if(obj!=null && obj.userAction!=null) {
                obj.action+="&userAction="+obj.userAction;
            }
            if(selectedConcept!=null) {

                obj.action+="&selectedConcept="+selectedConcept;
				
            }
            if(selectedColor!=null) {

                obj.action+="&selectedColor="+selectedColor;
            }
            if(selectedSize!=null) {
                obj.action+="&selectedSize="+selectedSize;
            }
            if(selectedFabric!=null) {
                obj.action+="&selectedFabric="+selectedFabric;
            }
            if(obj.pantsLength!=null && obj.pantsLength!='') {
                obj.action+="&pantsLengthSelected="+obj.pantsLength;
            }
            if(selectedPantLength!=null) {
                obj.action+="&selectedPantLength="+selectedPantLength;
            }
            if(colorCode!=null) {
                obj.action+="&colorCode="+colorCode;
            }
			if(selectedQuantity!=null) {
                obj.action+="&selectedQty="+selectedQuantity;
            }


            containerScope = $(this);

            /*
            This uses the jCache plugin, it tests to see
            if this response has been made before if so it
            pulls the responce from cache, otherwise it launches
            an AJAX request
            */

			$.jCache.clear();
			//alert(obj.action);
			
            var cached = $.jCache.getItem(obj.action);

            if(cached){
                var cachedResponce = trim(cached);

                $(obj.container).html(cachedResponce).fadeIn("fast")
                $(obj.container).parent().children("img.loadingImage").remove();
                
                
                
                if(obj.updatePriceRange){
                   rangeStr = $(cached).find("input[name=priceRange]").get(0);
                   $(obj.updatePriceRange).html($(rangeStr).val());
                }
                $(".sizeAndAvailability .disabled").css("opacity",.35);
            } else{
                $.ajax({
                   type: obj.method,
                   url: obj.action,
                   data: obj.data,
                   cache: true,
                   dataType: "html",
                   success: function(responce){
				  
                       $.jCache.setItem(obj.action, responce);
                       responce=trim(responce);
                       $(obj.container).html(responce).fadeIn("fast");
                       $(obj.container).parent().children("img.loadingImage").remove();
                       
                       
                       // Start changes for bugzilla #2891 - Edit bag page UI related
                       if ($("#sourcePage").val() == 'newCheckoutPage') {
                    	   if($(obj.container).find("div.productSizes").length > 1) {
                    		   $(obj.container).find("div.productSizes").last().before($("<div class='editEmptyClass'></div>"));
                    	   }
                    	
                    	   if($(obj.container).find("div.sizeChartLink").length > 1) {
                    		   $(obj.container).find("div.sizeChartLink").first().remove();
                    	   }
                       }
                       // End changes for bugzilla #2891 - Edit bag page UI related
                       
                       if(obj.updatePriceRange){
                            rangeStr = $(responce).find("input[name=priceRange]").get(0);
                            $(obj.updatePriceRange).html($(rangeStr).val());
                       }
                       $(".sizeAndAvailability .disabled").css("opacity",.35);
						productId = $(responce).find("input[name=productId]").val();
						colorToDisplay = $(responce).find("input[name=" + productId + "_mainImage]").val();
						comrowID=$(responce).find("input[name=comId]").val()
                   },
				   complete: function(){
					$(this).updateZoomImage(colorToDisplay);
					$(this).updateOutfitImage(colorToDisplay,productId,comrowID);
					$(this).updateGalleryImage(colorToDisplay,productId);
                   },
                   error: function(responce){
                       alert("Product unavailable, please contact customer service.");
                   }
                });
            }
    })
}


$.fn.applyShippingGroup = function(obj){
    var dataObj = $.evalJSON($("form[action="+ obj.action + "] .jsonData").val())

    //alert($.toJSON(dataObj))
	//alert("Promotion section");
	alert("obj.method: "+obj.method);
	alert("obj.data: "+obj.data);
	alert("obj.action: "+obj.action);
   
           // containerScope = $(this);
			
                $.ajax({
                   type: obj.method,
                   url: obj.action,
                   data: obj.data,
                   dataType: "html",
                   success: function(responce){
                       responce=trim(responce);
					   //alert("responce "+ responce.html);
                       $(obj.container).html(responce).fadeIn("slow");
                   },
                   error: function(responce){
                       alert("An Error occured while retrieving the shipping methods.");
                   }
                });

     
}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function fixBcCase(stringToFix){
	
	var strTemp;
	strTemp = stringToFix.toLowerCase();
	strTemp = strTemp.substring(0,1).toUpperCase() + strTemp.substring(1, strTemp.length);
	return strTemp;
}

$.fn.skuSelector = function(e) {
                var selectedPantsLength = "";
                var thisInput = $(e.target).children("input");
                var colorName = $(e.target).parent().children("input").attr("name");
                var colorInput = $(e.target).parent().children("input");
                var thisProductId;
                var inputName = $(thisInput).attr("name");
                var frmUserAction = "";
                if(colorName!=null) {
                    var elements = colorName.split("_");
                    if(elements!=null) {
                        thisProductId = elements[0];
                        if(elements.length>2) {
                            selectedPantsLength=elements[1];

                        }
                    }
                }else if(inputName!=null) {
                    var elements = inputName.split("_");
                    if(elements!=null) {
                        thisProductId = elements[0];
                    }
                    if(elements.length>2) {
                        selectedPantsLength=elements[1];

                    }
                }

                if(thisProductId!=null) {
                    frmUserAction = $(this).children(".overviewContainer").children(".formGalleryService");



                }else{
                    frmUserAction = $("#productOverview").children(".overviewContainer").children("form");
                }


                if(selectedPantsLength!=""){
                    var pantsLengthInput = $(frmUserAction).children("#"+thisProductId+"_selectedPantsLength");
                    if(pantsLengthInput!=null) {
                        $(pantsLengthInput).val(selectedPantsLength);
                        //////alert("pantsLengthInput.value is:"+pantsLengthInput.value);
                    }
                }





                var productIdUserAction=$(frmUserAction).children("#"+thisProductId+"_userAction");


                var productIdColorIndicator=$(frmUserAction).children("#"+thisProductId+"_colorIndicator");



                //alert("frmUserAction: "+frmUserAction);
                //alert("inputName:"+inputName+"selectedPantsLength:"+selectedPantsLength);

                if(inputName!=null) {

                    if(inputName=="size" || inputName == thisProductId+"_selectedSize" || inputName==thisProductId+"_"+selectedPantsLength+"_selectedSize") {
                        selectedSize = $(thisInput).attr("value");
                        ////alert(selectedSize);
                        userAction = "sizeSelection";
                        if(productIdUserAction!=null) {
                            $(productIdUserAction).val(userAction);
                        }



                    } else if(inputName=="sizeType" || inputName == thisProductId+"_selectedConcept") {

                        selectedConcept = $(thisInput).attr("value");

                        userAction = "conceptSelection";
                        if(productIdUserAction!=null) {
                            $(productIdUserAction).val(userAction);
                        }


                    } else if(inputName=="color") {
                        userAction = "colorSwapSelection";
                        if(productIdUserAction!=null) {
                            $(productIdUserAction).val(userAction);
                        }

                        selectedColor = $(thisInput).attr("value");
                        ////////////alert("UserAction is :"+userAction);
                        ////////////alert("selectedColor is :"+selectedColor);
                    }
                    //THIS IS TO ENSURE THAT, THE JCACHE THAT RETURNS COLORS SIZES AND CONCEPTS ARE SPECIFIC TO THE CURRENT SELECTED FABRIC
                    if(inputName == thisProductId+"_selectedFabric"){
                        $(thisInput).attr("checked","checked");
                        selectedFabric = $(thisInput).attr("value");
                        userAction = "conceptSelection";
                        if(productIdUserAction!=null) {
                            $(productIdUserAction).val(userAction);
                        }
                    }

                }else {
                    if(colorName!=null && !$(colorInput).attr("checked")){
                        //////////alert("Checked the color");
                        $(colorInput).attr("checked", "checked");
                        if(productIdUserAction!=null) {
                            $(productIdUserAction).val("colorSwapSelection");
                        }

                    }

                }

                if(productIdUserAction!=null && userAction!=null) {
                    $(productIdUserAction).val(userAction);
                }



                if(!$(thisInput).attr("checked")){
                    $(thisInput).attr("checked", "checked");
                }

                //////////alert("The userAction is :"+productIdUserAction);
                //this updates the image zoomer on the product details page
                //figure out if its a color chip, if so update the gallery image
                if($(e.target).hasClass("colorChip")) {

                    //////////////alert("Inside colorCheck:");
                    colorToDisplay=$(e.target).attr("longdesc");
                    colorCode = $(e.target).attr("colorCode");
                    userAction = "colorSwapSelection";
                    if(productIdUserAction!=null) {

                        $(productIdUserAction).val("colorSwapSelection");
                    }
                    //THIS IS TO MARK WHICH COLOR IS CLICKED. A REGULAR OR SALE OR OUTLET ONE

                   if($(e.target).hasClass("regularColor")) {


                    $(productIdColorIndicator).val("regularColor");

                   }else if($(e.target).hasClass("saleColor")) {


                    $(productIdColorIndicator).val("saleColor");

                   } else if($(e.target).hasClass("outletColor")) {


                    $(productIdColorIndicator).val("outletColor");

                   }


                    //////////////alert("Inside colorCheck:"+userAction);
                    if(colorToDisplay!=null) {
                        var colorElements = colorToDisplay.split("_");

                        if(colorElements!=null && colorElements.length>0) {
                            selectedColor = colorElements[1];
                            ////////alert("Selected Color is :"+selectedColor);
                        }
                    }

                    if(colorToDisplay!=null && colorToDisplay==selectedColor) {
                            var colorElements = colorToDisplay.split("_");
                            if(colorElements!=null && colorElements.length>0) {
                                selectedColor = colorElements[1];
                                ////////////alert(selectedColor);
                            }
                    }else if(colorToDisplay==null || userAction=="conceptSelection" ||(productIdUserAction!=null && productIdUserAction.value=="conceptSelection")) {
                        if($(frmUserAction).children("#"+thisProductId+"_mainImage")){
                            colorToDisplay = $(frmUserAction).children("#"+thisProductId+"_mainImage").val();
                        }

                    }

                $(this).updateListImage(colorToDisplay,thisProductId);


                }







}

$.fn.validateEmailFriend = function(){
        thisID = $(this).attr("id");
        var errors = [];

        $("#"+ thisID + " .required").each(function(){
            $(this).parent().removeClass("errorInput");


            if($(this).val() == $(this).attr("alt") || $(this).val() == ""){

                $(this).parent().addClass("errorInput");
                errors.push($(this));
            }

        })

        if(errors.length > 0){
            $(this).children(".formErrors").children("ul").html("<div class='error'>Required fields are missing or incorrect.</div>");
            return false;
        } else {	
			if(selectedSize){
			$("#emailSelSize").val(selectedSize);				
			}			
           $(this).children(".emailToFriendForm").submit();

        }
}

function giftMessageWrap(object) {
	var lines = $(object).val().split("\n");
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].length < 24) continue;
		var j = 0; space = 22;
		while (j++ <= 22) {
		  if (lines[i].charAt(j) === " ") space = j;
		}
		lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
		lines[i] = lines[i].substring(0, space + 1);
	}
	var giftMsgStr = lines.slice(0, 5).join("\n");
	$(object).val(giftMsgStr);
	var linelength = lines.length;
	var count = 24 * (linelength - 1) + lines[linelength - 1].length;
	var giftMsgLen = $(object).attr("name");
	var charCountDispAreaId = $(object).attr("id");
	var currentBox = charCountDispAreaId.substr(giftMsgLen.length, charCountDispAreaId.length);
	$('#charCount' + currentBox).html('Character ' + count + ' of 120');
}
//#############################Added for R14OCTPDP START #################################

//Edit cart Functions
function getPDPJson(pid){
	var urlString = "includes/product_detail_json.jsp?&productId="+pid;
		$.ajax({
	        type: "POST",
	        url: urlString,
			contentType: "application/json",
	        async: false,			
            crossDomain: false,
            success: function (data) {
				prodJson = $.parseJSON(data.replace(/&quot;/g,'"'));
				$('.loadingImage').remove();//$('#'+pid+'_'+cid+'_navigation_product_form .editOverviewContainer').parent().children("img.loadingImage").remove();
				//alert(prodJson.productId);
	        },
			error: function (request, status, error) {
			$('.loadingImage').remove();
			//$('#'+pid+'_'+cid+'_navigation_product_form .editOverviewContainer').parent().children("img.loadingImage").remove();
				//alert(error+'|'+status); TODO : error handling
			}
	    });	
}


function getSelectedVals(cid){
var selectedVal = $('#'+cid+"_selectedVal").val();
	if(selectedVal){
			 var selectElm = selectedVal.split("-");
				 selectedConcept=selectElm[0];
				 selectedColor=selectElm[1];
				 selectedSize=selectElm[2];	
				// alert(selectElm[3]);					  
				 selectedpntslgth=selectElm[3]=='Long'?1:0;	
				 colorCode = selectElm[4];
				 //alert(selectedConcept+"|"+selectedColor+"|"+selectedSize+"|"+selectedpntslgth);
				}
}

function renderEditElements(){
var target = '#'+prodJson.productId+'_'+cid+'_navigation_product_form .sizeAndAvailability';
 if(prodJson.productType !=3){
	renderConcept(target);
 }else{
	 renderEmptyDiv(target);
 }
 if(prodJson.productType==1 || prodJson.productType==2 || (prodJson.productType==3 && prodJson.displaySize==true)){
 renderSize(target,prodJson[selectedConcept].regularSizeArray,'Regular');
 }
 renderRegularColors(target,prodJson[selectedConcept].regularColorArray,0,'Regular');
 renderSaleColors(target,prodJson[selectedConcept].regularSaleColorArray,0,'Regular');
 renderQuantity(target);
 if(prodJson.productType == 1){
 renderEmptyDiv(target);
 renderSize(target,prodJson[selectedConcept].longSizeArray,'Long');
 renderRegularColors(target,prodJson[selectedConcept].longColorArray,0,'Long');
 renderSaleColors(target,prodJson[selectedConcept].longsSaleColorArray,0,'Long');
 }
}

function renderConcept(target){
//alert('inside : '+prodJson.avialableConcepts.length);
 if(prodJson.avialableConcepts.length>0){ 
 //var target = '#'+prodJson.productId+'_'+cid+'_navigation_product_form .sizeAndAvailability'; 
	$(target).append($('<div/>').addClass('sizeType').append($('<strong/>').html('Size Type'),$('<ul/>')));
	var name = cid+'_selectedConcept';
	var targetUL= target+' .sizeType ul';	
	renderConceptLi(prodJson.avialableConcepts,name,targetUL)
 }
}

function renderSize(target,sizes,type){
	if(sizes && sizes.length > 0){		
		$(target).append($('<div/>').addClass('productSizes').append($('<strong/>').html('Size'+(type=='Long'?'&nbsp; Long &nbsp;':'&nbsp;')).append($('<span/>').html('')),$('<ul/>')));
		var name = cid+'_'+type+'_selectedSize';
		var targetUL= target+(type=='Long'?' .productSizes:last-child ul':' .productSizes ul');
		var highlight = determineHighlight(type);		
		renderSizeLi(sizes,name,targetUL,highlight);
	}
}

function determineHighlight(type){
	var highlight = 0;
		if((type=='Long' && selectedpntslgth==1) || (type=='Regular' && selectedpntslgth==0)){
			highlight=1;			
		}
 return highlight;
}
function renderEmptyDiv(target){
$(target).append($('<div/>').addClass('editEmptyClass'));
}
//COMMON code

function getInputElm(e){
var thisInput = $(e.target).children("input");	
	if(!$(e.target).children("input").attr("name")){		
		thisInput = $(e.target).siblings("input");
	}
	return thisInput;
}

//Quantity Div

function renderQuantity(target){
$(target).append($('<div/>').addClass('productQuanity').append($('<strong/>').html('Quantity:'),$('<select/>').attr({'productid':prodJson.productId,'id':'quantitySku','class':'quantitySku','name':'quantity'})));
				//$('.productQuanity').append();
				  // populate the options
				  for(var i = 1; i <= 5; i++) {
				   if(selectedQTY == i){
						$(target+' .productQuanity select').append($('<option/>').attr({'class':'skuQuantity','value':i,'selected':'selected'}).html(i));
					}else{
						$(target+' .productQuanity select').append($('<option/>').attr({'class':'skuQuantity','value':i}).html(i));
					}
				  }
}

//Display color 
function preSelectColor(type,size){
//alert(selectedColor+'|'+colorCode);
	//if(selectedConcept =='Misses'){
	if(prodJson.productType==1){
	  if(type=='Regular' && size=='Regular'){
		if( prodJson[selectedConcept].regularColorArray.length==1 && prodJson[selectedConcept].regularSaleColorArray.length == 0 && prodJson[selectedConcept].longColorArray.length==0 && prodJson[selectedConcept].longsSaleColorArray.length==0){
			selectedColor = prodJson[selectedConcept].regularColorArray[0].colorSwatch;
			colorCode = prodJson[selectedConcept].regularColorArray[0].colorFulfillment
		}
	  }else if (type=='Regular' && size=='Long'){
		if(prodJson[selectedConcept].longSizeArray.length==1 && prodJson[selectedConcept].regularSaleColorArray.length == 0 && prodJson[selectedConcept].regularColorArray.length==0 && prodJson[selectedConcept].longsSaleColorArray.length==0){
			selectedColor = prodJson[selectedConcept].longSizeArray[0].colorSwatch;
			colorCode = prodJson[selectedConcept].longSizeArray[0].colorFulfillment
		}
	  }else if (type=='Sale' && size=='Regular'){
		if(prodJson[selectedConcept].regularSaleColorArray.length==1 && prodJson[selectedConcept].longSizeArray.length == 0 && prodJson[selectedConcept].regularColorArray.length==0 && prodJson[selectedConcept].longsSaleColorArray.length==0){
			selectedColor = prodJson[selectedConcept].regularSaleColorArray[0].colorSwatch;
			colorCode = prodJson[selectedConcept].regularSaleColorArray[0].colorFulfillment
		}
	  }else if (type=='Sale' && size=='Long'){
		if(prodJson[selectedConcept].longsSaleColorArray.length ==1 && prodJson[selectedConcept].longSizeArray.length == 0 && prodJson[selectedConcept].regularColorArray.length==0 && prodJson[selectedConcept].regularSaleColorArray.length==0){
			selectedColor = prodJson[selectedConcept].longsSaleColorArray[0].colorSwatch;
			colorCode = prodJson[selectedConcept].longsSaleColorArray[0].colorFulfillment
		}
	  }
	}else{
		if(type=='Regular' && size=='Regular'){
		if( prodJson[selectedConcept].regularColorArray.length==1 && prodJson[selectedConcept].regularSaleColorArray.length == 0){
			selectedColor = prodJson[selectedConcept].regularColorArray[0].colorSwatch;
			colorCode = prodJson[selectedConcept].regularColorArray[0].colorFulfillment
		}
	  }else if (type=='Sale' && size=='Regular'){
		if(prodJson[selectedConcept].regularSaleColorArray.length==1  && prodJson[selectedConcept].regularColorArray.length==0){
			selectedColor = prodJson[selectedConcept].regularSaleColorArray[0].colorSwatch;
			colorCode = prodJson[selectedConcept].regularSaleColorArray[0].colorFulfillment
		}
	  }
	}
	
	//alert(selectedColor+'|'+colorCode);
}

function renderRegularColors(target,colors,fromPDP,type){
	var title 		= (fromPDP==0?'Color &nbsp; ':'Select Color: ');
	var divClass	= 'productColors';
	var imgClass 	= 'colorChip regularColor';
	var colorName 	= (fromPDP==1?prodJson.productId:cid)+'_'+type+'_selectedColor';
	var targetUL 	= target+(type=='Long'?' .productColors:last-child ul':' .productColors ul');
	var highlight = determineHighlight(type);
	preSelectColor('Regular',type);
	renderColorArray(target,colors,fromPDP,divClass,title,colorName,targetUL,imgClass,highlight);
}

function renderSaleColors(target,colors,fromPDP,type){
	var title 		= (fromPDP==0?'Sale Color &nbsp; ':'Select Sale Color: ');
	var divClass	= 'saleColors';
	var imgClass 	= 'colorChip saleColor';
	var colorName 	= (fromPDP==1?prodJson.productId:cid)+'_'+type+'_selectedColor';
	var targetUL 	= target+(type=='Long'?' .saleColors:last-child ul':' .saleColors ul');
	var highlight = determineHighlight(type);
	preSelectColor('Sale',type);
	renderColorArray(target,colors,fromPDP,divClass,title,colorName,targetUL,imgClass,highlight);
}
function renderColorArray(target,colors,fromPDP,divClass,title,colorName,targetUL,imgClass,highlight){
if(colors.length>0){
	$(target).append($('<div/>').addClass(divClass).append($('<strong/>').html(title).append($('<span/>')),$('<ul/>')));				
				//var colorName = (fromPDP==1?prodJson.productId:cid)+'_Regular_selectedColor';
				var className = '';	
				//var targetUL= target+' .productColors ul';				
				$.each(colors, function (index, color) {
				     if(color.colorSwatch==selectedColor && highlight==1){
					  $(targetUL).siblings('strong').children().html(color.colorName);
					   className = 'active';
					   //himanshu
					   if(fromPDP==1){
					   changePrice(color);
					   changeImage(color.mainImage,prodJson[selectedConcept].altImages);
					   }
					   
					 }else{className = '';}
					$(targetUL).append($('<li/>').attr({'class':className,'title':color.colorName})
										  .append($('<label/>')
										  .append(
										         $('<img/>').attr({'class':imgClass,'src':'//talbots.scene7.com/is/image/Talbots/'+color.colorSwatch,'colorcode':color.colorSwatch,'longdesc':'','colorfulfill':color.colorFulfillment})
												 ,$('<input/>').attr({'type':'radio','value':color.colorSwatch,'name':colorName}))));
				})
	}
}

function renderSizeLi(sizes,name,target,highlight){
	$.each(sizes, function (index, size) {	
		if(selectedSize == trim(size.size) && highlight==1){
			$(target).append($('<li/>').addClass('active').append($('<label/>').html(size.size).append($('<input/>').attr({'type':'radio','value':size.size,'name':name}))));
			$(target).siblings('strong').children().html('&nbsp;'+selectedSize);
		}else{
			$(target).append($('<li/>').append($('<label/>').html(size.size).append($('<input/>').attr({'type':'radio','value':size.size,'name':name}))));
		}
	})
}
function renderConceptLi(concepts,name,target){
	 $.each(concepts, function (index, concept) {										
				if(selectedConcept == concept){
					$(target).append($('<li/>').addClass('active').append($('<label/>').html(concept).append($('<input/>').attr({'type':'radio','value':concept,'name':name,'checked':'checked'}))));
				}else{
					$(target).append($('<li/>').append($('<label/>').html(concept).append($('<input/>').attr({'type':'radio','value':concept,'name':name}))));
				}
		})
}
//PDP Page Functions
function populatePDP(){
//alert(ctx);
	
	$("#cartMessage").html("");
//alert(selectedConcept);
	if(prodJson){
	selectedConcept = (selectedConcept == null || selectedConcept=='undefined')?prodJson.selectedConcept:selectedConcept;
	//alert(prodJson);
	//display price
		// himanshu
		changePrice(prodJson[selectedConcept]);
		
		changeImage(prodJson[selectedConcept].mainImage,prodJson[selectedConcept].altImages);
//	$('.itemDetails .itemPrice').remove();
//	$('.itemDetails').prepend($('<strong/>').attr({'class':'itemPrice','style':'color: #000000;'}).html('$'+prodJson[selectedConcept].highestInventorySku.customerAmount));
		
		var multiFab = prodJson[selectedConcept].multifab;		
			// Regular size array			
			if(prodJson.productType==1 || prodJson.productType==2 || (prodJson.productType==3 && prodJson.displaySize==true)){
			if(prodJson[selectedConcept].regularSizeArray.length > 0){
			if(prodJson.productType==1){
			  if(prodJson[selectedConcept].longSizeArray.length == 0 && prodJson[selectedConcept].regularSizeArray.length ==1 ){
				selectedSize=prodJson[selectedConcept].regularSizeArray[0].size;
				selectedpntslgth=0;
			  }
			  }else{
				if(prodJson[selectedConcept].regularSizeArray.length ==1){
					selectedSize=prodJson[selectedConcept].regularSizeArray[0].size;
					selectedpntslgth=0;
				}
			  }
				//($('<div/>').addClass('productSizes')).insertAfter($('.sizeType'));
				//$('.sizeAndAvailability').prepend($('<div/>').addClass('productSizes'));
				 ($('<div/>').addClass('productSizes')).insertAfter($('.warning:last'));
				$('.productSizes').append($('<strong/>').html('Select Size : &nbsp;&nbsp;').append($('<span/>')));
				$('.productSizes').append($('<ul/>'));
				var sizeName = prodJson.productId+'_Regular_selectedSize';
				$.each(prodJson[selectedConcept].regularSizeArray, function (index, size) {
				    if(selectedSize == size.size && selectedpntslgth==0){
						$('.productSizes ul').append($('<li/>').addClass('active').append($('<label/>').html(size.size).append($('<input/>').attr({'type':'radio','value':size.size,'name':sizeName}))));
						$('.productSizes ul').siblings('strong').children().html(selectedSize);
					}else{
					$('.productSizes ul').append($('<li/>').append($('<label/>').html(size.size).append($('<input/>').attr({'type':'radio','value':size.size,'name':sizeName}))));
					}
				})
			}	
			}
			
		//display concepts
		if(prodJson.productType !=3){
		 //$('.sizeAndAvailability').prepend($('<div/>').addClass('sizeType').append($('<strong/>').append($('<span/>').html('Size Type: &nbsp;&nbsp;'+selectedConcept))));
		 ($('<div/>').addClass('sizeType').append($('<strong/>').append($('<span/>').html('Size Type: &nbsp;&nbsp;'+selectedConcept)))).insertAfter($('.warning:last'));
		  //$('.sizeType strong:nth-child(1)').html('Size1 Type: &nbsp;&nbsp;'+selectedConcept);
		  $('.sizeType').append($('<a />').attr({'class': 'sizingChart','href':ctx+'/browse/includes/catalog_size_chart.jsp?selectedConcept='+selectedConcept}).html('Size Chart'));						
		  $('.sizeType').append($('<ul/>'));
		  var name = prodJson.productId+'_selectedConcept';
		  renderConceptLi(prodJson.avialableConcepts,name,'.sizeType ul');		  
		}
		
		
			//Quantity box
			if(populateQty){
			renderQuantity('.sizeAndAvailability');
			}
			  
			//regular color			
			renderRegularColors('.sizeAndAvailability',prodJson[selectedConcept].regularColorArray,1,'Regular');
						
			//Sale color
			renderSaleColors('.sizeAndAvailability',prodJson[selectedConcept].regularSaleColorArray,1,'Regular');
			
			
			if(prodJson.productType == 1 )
			{
			//Long size
			if(prodJson[selectedConcept].longSizeArray.length > 0){
			if(prodJson[selectedConcept].longSizeArray.length == 1 && prodJson[selectedConcept].regularSizeArray.length ==0 ){
				selectedSize=prodJson[selectedConcept].longSizeArray[0].size;
				selectedpntslgth=1;
			  }
			$('.sizeAndAvailability').append($('<div/>').addClass('productSizes').append($('<strong/>').html('Select Size : &nbsp;&nbsp;'+(multiFab==1?'Long &nbsp;':'')).append($('<span/>')),$('<ul/>')));
				//$('.productSizes').append($('<ul/>'));
				var longSizeName = prodJson.productId+'_Long_selectedSize';
				$.each(prodJson[selectedConcept].longSizeArray, function (index, size) {
					if(selectedSize == size.size && selectedpntslgth==1){
						$('.productSizes:last-child ul').append($('<li/>').addClass('active').append($('<label/>').html(size.size).append($('<input/>').attr({'type':'radio','value':size.size,'name':longSizeName}))));
						$('.productSizes:last-child ul').siblings('strong').children().html(selectedSize);
					}else{
					$('.productSizes:last-child ul').append($('<li/>').append($('<label/>').html(size.size).append($('<input/>').attr({'type':'radio','value':size.size,'name':longSizeName}))));
					}
				})
			}	
			
			//Long regular colors
			renderRegularColors('.sizeAndAvailability',prodJson[selectedConcept].longColorArray,1,'Long');
			
			//Long sale Colors
			renderSaleColors('.sizeAndAvailability',prodJson[selectedConcept].longsSaleColorArray,0,'Long');			
			
		}	
			
	}
	
}

function renderSizeforColor(e,colorArray,fabric,target,frmPDP){
var maintgt = '#'+prodJson.productId+'_'+cid+'_navigation_product_form .sizeAndAvailability';
	//alert(fabric+':'+target);
	// toggle selected css
	$((frmPDP==0?maintgt+' .productColors ul li':'.productColors ul li')).removeClass('active');
	$((frmPDP==0?maintgt+' .productColors strong span':'.productColors strong span')).html('');
	$((frmPDP==0?maintgt+' .saleColors ul li':'.saleColors ul li')).removeClass('active');
	$((frmPDP==0?maintgt+' .saleColors strong span':'.saleColors strong span')).html('');
	$((frmPDP==0?maintgt+' .productSizes ul li':'.productSizes ul li')).removeClass('active');
	$((frmPDP==0?maintgt+' .productSizes strong span':'.productSizes strong span')).html("");
	
		//$(e.target).parent().parent().siblings('li').removeClass('active');
		$(e.target).closest('li').addClass('active');
		
		// add the title
		selectedColor = $(e.target).attr('colorcode');
		colorCode     = $(e.target).attr('colorfulfill');
		var colorName = $(e.target).closest('li').attr('title');
		//$(e.target).closet('strong').children().html(colorName);
		$(e.target).parent().parent().parent().siblings('strong').children().html(colorName);
		var applied=0;
		// render size array
		if(colorArray.length > 0 ){		
			$(target).empty();			
			var sizeName = prodJson.productId+'_'+fabric+'_selectedSize';
				$.each(colorArray, function (index, color) {
				//alert(color.colorSwatch+':'+selectedColor);
					if(color.colorSwatch == selectedColor){
					//alert(color.size[0]);
					    if(color.size.length == 1){						
							selectedSize = color.size[0];
						}
						// Himanshu
						if(frmPDP==1){
						 changeImage(color.mainImage, prodJson[selectedConcept].altImages);
						 changePrice(color);
						 }
						//alert(color.size.length);
						$.each(color.size,function(i,size){						
						if(selectedSize==size){
						applied=1;
						$(target).siblings('strong').children().html(size);
							$(target).append($('<li/>').addClass('active').append($('<label/>').html(size).append($('<input/>').attr({'type':'radio','value':size,'name':sizeName}))));
						}else{
							$(target).append($('<li/>').append($('<label/>').html(size).append($('<input/>').attr({'type':'radio','value':size,'name':sizeName}))));
						}
							
						})
						return;
					}
					
				})
				if(applied==0){
					$(target).siblings('strong').children().html('');
				}
		}
}


function changeImage(mainImage, altImages) {

	changeImages(mainImage);
	
	// Change alternate images.
	if (altImages){
		
		var altImagesContent=new String("");
		altImagesContent="<ul class=\"gallery\"><li style=\"border:1px solid black;\"><a href=\"javascript:changeImages('";
		altImagesContent+=mainImage;
		altImagesContent+="')\">"
		altImagesContent+="<img longdesc=\""+mainImage+"\" src=\"";
		altImagesContent+=$(this).getImagePath()+mainImage;		
		altImagesContent+="?$altViewProd$\"></a></li>"
		
		for (i = 0; i < altImages.length; i++)
		{
		
		altImagesContent+="<li style=\"border:1px solid black;\"><a href=\"javascript:changeImages('";
		altImagesContent+=altImages[i];
		altImagesContent+="')\">"
		altImagesContent+="<img longdesc=\""+altImages[i]+"\" src=\"";
		altImagesContent+=$(this).getImagePath()+altImages[i];
		altImagesContent+="?$altViewProd$\"></a></li>";

		}

		altImagesContent+="</ul>";
		$("#galleryAlts").html(altImagesContent);
	}
	
	
}



	
function changeImages(mainImage) {
	// Change main image.
	var imagePath = $(this).getImagePath() + mainImage + "?$itempage2$";
	var zoomPath = $(this).getImagePath() + mainImage + "?$zoom$";
	var quickView = "http://talbots.scene7.com/is/image/Talbots/" + mainImage + "?$quickView$";
	var inSoteImages = "http://talbots.scene7.com/is/image/Talbots/"+mainImage+"?$coordinates$";
	$("#heroContainer" ).find("img").attr("src", imagePath);
	$("#heroContainer").attr("href", zoomPath);
	$("#quickGalleryHero").attr("src", quickView);
	$(".MagicZoomBigImageCont").children().children().attr("src", zoomPath);
	$(".locationImage").attr("src", inSoteImages);
}


function getsku(){
	document.getElementById('colorChoice').value = colorCode;
	document.getElementById('sizeChoice').value = selectedSize;
	$('#skuValue').val(selectedSkuItem);
	$('#atgsku').val(selectedSKU);
	var size = (prodJson.productType==3 && prodJson.displaySize==false)?'001':trim(selectedSize);	
	var url = ctx+'/browse/includes/catalog_find_enter_location.jsp?productId='+prodJson.productId+'&skuId='+selectedSKU+'&skuItem='+selectedSkuItem+'&selectedConcept='+selectedConcept+'&selectedColor='+selectedColor+'&colorCode='+colorCode+'&selectedSize='+size+'&mf='+selectedpntslgth;
	$('#findErrorURL').val(url);	
	return;
}

function changePrice(object) {
	var originalAmount = object.highestInventorySku.originalAmount;
	var customerAmount = object.highestInventorySku.customerAmount;
	var onSale = object.highestInventorySku.onSale;
	var priceDetail=new String("");
	
	if(originalAmount && (originalAmount != "0") && originalAmount != customerAmount) {
		priceDetail += "<strong class=\"normalPrice\">$"+originalAmount+"</strong>"
		if (onSale) {
			priceDetail+="<strong class=\"salePrice\">$"+customerAmount+"</strong>"
		} else {
			priceDetail+="<strong class=\"itemPrice\">$"+customerAmount+"</strong>"
		}		
	} else {
		if (onSale) {
			priceDetail+="<strong class=\"salePrice\">$"+customerAmount+"</strong>"
		} else {
			priceDetail+="<strong class=\"itemPrice\" style=\"color: #000000;\">$"+customerAmount+"</strong>"
		}
	}
	
	$("#priceDetails").html(priceDetail);
}


function renderColorForSize(e,fromPDP){
	if(selectedSize){
	var target = '#'+prodJson.productId+'_'+cid+'_navigation_product_form .sizeAndAvailability';
		$((fromPDP==0?target+' .productSizes ul li':'.productSizes ul li')).removeClass('active');
		$(e.target).closest('li').addClass('active');
		$((fromPDP==0?target+' .productSizes strong span':'.productSizes strong span')).html("");
		$((fromPDP==0?target+' .productColors ul li':'.productColors ul li')).removeClass('active');
		$((fromPDP==0?target+' .saleColors ul li':'.saleColors ul li')).removeClass('active');
		$((fromPDP==0?target+' .productColors strong span':'.productColors strong span')).html("");
		$((fromPDP==0?target+' .saleColors strong span ':'.saleColors strong span')).html("");
		var colorName;
		if(selectedpntslgth == 1)
				{
					$((fromPDP==0?target+' .productSizes:last strong span':'.productSizes:last strong span')).html(selectedSize);
					colorName = prodJson.productId+'_Long_selectedColor';
					var regularColor = (fromPDP==0?target+' .productColors:last ul':'.productColors:last ul');
					var saleColor=(fromPDP==0?target+' .saleColors:last ul':'.saleColors:last ul');
					renderRegularandSaleColors(prodJson[selectedConcept].longSizeArray,regularColor,saleColor,colorName);
				}
			else{
					$((fromPDP==0?target+' .productSizes:first strong span':'.productSizes:first strong span')).html(selectedSize);
					colorName = prodJson.productId+'_Regular_selectedColor';
					var regularColor = (fromPDP==0?target+' .productColors:first ul':'.productColors:first ul');
					var saleColor=(fromPDP==0?target+' .saleColors:first ul':'.saleColors:first ul');
					renderRegularandSaleColors(prodJson[selectedConcept].regularSizeArray,regularColor,saleColor,colorName);
				}
	}
}

function renderRegularandSaleColors(clrArray,regTgt,sltgt,colorName){
	$.each(clrArray, function (index, size) {
						if(size.size == selectedSize ){
								// set the default color is the array has only one color
								preselectColorForsize(size.regularColor,size.saleColor);						
							  //render regular color
							  renderColor(size.regularColor,regTgt,colorName,'colorChip regularColor');
							  //render sale color
							  renderColor(size.saleColor,sltgt,colorName,'colorChip saleColor');
							 return;
							}
					})
}

function preselectColorForsize(regular,sale){
var colors;
 if(regular.length == 1 && sale.length==0){
   colors=regular;
 }else if(regular.length == 0 && sale.length==1){
  colors=sale;
 }
 if(colors){
	selectedColor=colors[0].colorSwatch;
    colorCode=colors[0].colorFulfillment;
 }
}
function renderColor(colors,target,name,className){
	if(colors.length>0){
	$(target).parent().show();
		$(target).empty();
		var liClass='';
		$.each(colors, function (index, color) {
		if(color.colorSwatch==selectedColor){
		 liClass='active';
		 $(target).siblings('strong').children().html(color.colorName);
		}else{liClass='';}
			$(target).append($('<li/>').attr({'class':liClass,'title':color.colorName})
										.append($('<label/>')
											.append($('<img/>').attr({'class':className,'src':'//talbots.scene7.com/is/image/Talbots/'+color.colorSwatch,'colorcode':color.colorSwatch,'longdesc':'','colorfulfill':color.colorFulfillment})
													,$('<input/>').attr({'type':'radio','value':color.colorSwatch,'name':name}))));
								})
	}else{
	 $(target).parent().hide();
	}
}

function addHiddenVal(frmPDP){
if(prodJson){
	//alert(selectedColor +'|'+selectedSize +'|'+colorCode);
	var size = (prodJson.productType==3 && prodJson.displaySize==false)?'001':trim(selectedSize);
	//remove hiddens
	removeDefaults(frmPDP);	
	if(colorCode && size){
	//alert(size+'|'+selectedpntslgth);
	    var skuName = trim(selectedConcept)+'-'+trim(colorCode)+'-'+size+'-'+selectedpntslgth; // hardcode the pants lenth for now 
		//alert(skuName);
	  //alert(prodJson.skusObject[skuName].skuId);	   
		if(prodJson.skusObject[skuName]){
		var skuObj = prodJson.skusObject[skuName];
		selectedSKU=skuObj.skuId;
		selectedSkuItem = skuObj.itemNumber;
		var target = (frmPDP == 1 ?'.itemDetails':'#'+prodJson.productId+'_'+cid+'_navigation_product_form .itemDetails');
		 $(target).append($('<input/>').attr({'type':'hidden','class':'skuId','name':'skuId','value':skuObj.skuId}));
		 if(frmPDP == 1){
		 renderFindInAStore(skuObj.skuId,skuObj.itemNumber);
		 refreshCartMessage(skuObj.skuId);		 
		 }
		}		
	}else{renderDefaultFindInStore();}	
	}
}

function removeDefaults(frmPDP){
	if(frmPDP==0){
	$('#'+prodJson.productId+'_'+cid+'_navigation_product_form .itemDetails .skuId').remove();
	}else{
	$('.itemDetails .skuId').remove();
	$('.itemDetails .productActions .findInStore').remove();
	}
	selectedSKU="";
	selectedSkuItem="";
}

function renderDefaultFindInStore(){
if(prodJson.inStoreItems && prodJson.inStoreItems.length>0)
	{
	var size = (prodJson.productType==3 && prodJson.displaySize==false)?'001':trim(selectedSize);
	var url = ctx+'/browse/includes/catalog_find_enter_location.jsp?productId='+prodJson.productId+'&selectedConcept='+selectedConcept+'&selectedColor='+selectedColor+'&colorCode='+colorCode+'&selectedSize='+size+'&mf='+selectedpntslgth;
	 $('.itemDetails .productActions').prepend($('<li/>').addClass('findInStore').append($('<a/>').attr({'value':'FIND','class':'findPopup','onClick':'return findInStoreClickEvent(this);','href':url}).html('FIND IN A STORE')));
	}
}
function renderFindInAStore(skuId,skuItem){
 if($.inArray(skuItem,prodJson.inStoreItems)>-1)
 {
	//alert(skuItem);
	var size = (prodJson.productType==3 && prodJson.displaySize==false)?'001':trim(selectedSize);
	 var url = ctx+'/browse/includes/catalog_find_enter_location.jsp?productId='+prodJson.productId+'&skuId='+skuId+'&skuItem='+skuItem+'&selectedConcept='+selectedConcept+'&selectedColor='+selectedColor+'&colorCode='+colorCode+'&selectedSize='+size+'&mf='+selectedpntslgth;
	 $('.itemDetails .productActions').prepend($('<li/>').addClass('findInStore').append($('<a/>').attr({'value':'FIND','class':'findPopup','onClick':'return findInStoreClickEvent(this);','href':url}).html('FIND IN A STORE')));
 }else{renderDefaultFindInStore();}
}

// Script Method to refresh cart message on PDP
function refreshCartMessage(skuId) {		
		var urlString = "/online/browse/includes/product_detail_cartmessage.jsp?currentSkuID="+skuId+"&productId="+prodJson.productId;
		$.ajax({
	        type: "POST",
	        url: urlString,
			contentType: "application/json",
	        async: false,			
            crossDomain: false,
            success: function (data) {
				$("#cartMessage").html(data);
	        }
	    });	
}

//#############################Added for R14OCTPDP END #################################

$(document).ready(function(){  
	   	//ajax call to populate the persistent cart 
		$('#writeBVReview').load('/online/global/includes/bazaarVoiceWrtieAReview.jsp', function() {
			
		});
	
	
	
        $(".emailToFriendForm input.required").click(function(){
            $(this).val("")
          })

        $(".emailToFriendForm").submit(function(){
            //$(this).validateEmailFriend();
        });
        
      
        
        
        $("#findContainer").click(function(e){

        	//clear error msg
        	if($("#"+prodJson.productId+"_cartMessage").length == 1){
        	$("#"+prodJson.productId+"_cartMessage").html("");
        	}

        	//alert('inside');
        		var thisInput = $(e.target).children("input");	
        		if(!$(e.target).children("input").attr("name")){		
        			thisInput = $(e.target).siblings("input");
        		}
        		//alert(thisInput);
        		var inputName = $(thisInput).attr("name");	
        		var thisProductId;	
        		var selectedPantsLength;
        	    
        		if(inputName!=null) {	
        						var elements = inputName.split("_");					 
        	                     if(elements!=null) {
        	                         thisProductId = elements[0];
        	                     }
        	                     if(elements.length>2) {
        	                         selectedPantsLength=elements[1];
        	                     }
        	                 }
        		if(selectedPantsLength){
        			selectedpntslgth = (selectedPantsLength=='Long'?1:0);
        		}
        		if(inputName == thisProductId+"_selectedConcept") {
        	        selectedConcept = $(thisInput).attr("value");
        			$('.productSizes').remove();
        			//$('.productQuanity').remove();
        			$('.productColors').remove();
        			$('.saleColors').remove();
        			$('.sizeType').remove();
        			selectedSize='';
        			selectedpntslgth=0;
        			//selectedColor='';
        			populateQty = false;
        			
        			//$('.sizeType ul').remove();
        			populatePDP();
        			addHiddenVal(1);
        		}
        		if(inputName == thisProductId+"_"+selectedPantsLength+"_selectedSize" ){	
        			 selectedSize = $(thisInput).attr("value");
        			// alert(selectedSize);
        			//change the size and render colors for size
        			renderColorForSize(e,1);
        			addHiddenVal(1);
        		}	
        		if($(e.target).hasClass("regularColor")) {		
        			if(selectedpntslgth == 1){		
        				renderSizeforColor(e,prodJson[selectedConcept].longColorArray,selectedPantsLength,'.productSizes:last ul',1);
        			}else{		
        				renderSizeforColor(e,prodJson[selectedConcept].regularColorArray,selectedPantsLength,'.productSizes:first ul',1);
        			}
        			addHiddenVal(1);
        		}
        		
        		if($(e.target).hasClass("saleColor")) {	
        			if(selectedpntslgth == 1){
        				renderSizeforColor(e,prodJson[selectedConcept].longsSaleColorArray,selectedPantsLength,'.productSizes:last ul',1);
        			}else{		
        				renderSizeforColor(e,prodJson[selectedConcept].regularSaleColorArray,selectedPantsLength,'.productSizes:first ul',1);	
        			}
        				addHiddenVal(1);
        		}
        		//alert(e.target);
        		if($(e.target).is("input[type='submit']")){
        		//alert('inside');
        	            	$(e.target).attr('disabled','disabled');
        	                var input = e.target;
        	                var quant = $(input).parents("form").children().children().children("select[name='quantity']").val();
        	                var sku = $(input).parent().parent().children(".skuId").val();
        					var pid = prodJson.productId;
        	                //var pid = $(input).parent().parent().children(".prodId").val(); 
        					//alert(sku+'|'+pid+'|'+quant);
        					if($("#"+pid+"_cartMessage").length == 0){
        					//alert('inside');
        					 $('.sizeAndAvailability').prepend($('<p/>').attr({'id':pid+'_cartMessage','class':'warning'}));				
        					}
        					var cartMessage = $("#"+pid+"_cartMessage");
        					
        					//alert(selectedColor+"|"+selectedSize);
        	                if(!sku) {
        					 //alert('inside if');
        	                    if(cartMessage !=null) {
        	                        $(cartMessage).html("You must select both size and color in order to add the item to your shopping bag.");
        	                    }
        						$(e.target).removeAttr('disabled');
        	                    return false;
        	                }else {
        	                    $(cartMessage).html("");
        	                }


        	                $("#catalogRefIds").attr("value", sku);
        	                $("#productIds").attr("value", pid);
        	                $("#quantity").attr("value", quant);

        	                //omniture code
        	                var cartStatus = $(".cartStatus").val();
        	                scCategoryListCartAdd(this,pid,sku,cartStatus);


        	                $("#cartForm").submit();
        	                return false;
        	            }

        });
        
        
     // SEGMENT THE JS FUNCTIONS BY BODY CLASS
    if($("body").attr("id") == "productDetail"){




        /* Product Detail Page Styles */
        $(".sizeAndAvailability .disabled").css("opacity",.35);

        // instanciate the tabs
        //$(".tabSection > ul").tabs();
        $("#productInfo").tabs();
        $("#productInfo").tabs("option", "active", 0);

        //instanciate the zoom utility
        // The Zoom utility automaticlly is instanciated by the zoom plugin with the class="MagicZoom"

        //instanciate the product gallery event listerner
        $("#galleryModule").click(function(e){
            //alert("Inside gallery Module click");
            //alert($(e.target).hasClass("zoomer"));
            //Handles the Product Zoom Popup.
            if($(e.target).hasClass("zoomer")){
               //alert("Click ");
                var popupLink = $(e.target).attr("href");
                //alert(popupLink);
                var dynArguments = $("#dynArgsForZoom").attr("name");
                var altImageArgs = $("#altImageZoom").attr("name");
                var productLabel = $("#productLabel").attr("name");
                popupLink+="?dynamicArgs="+dynArguments+"&altImageArgs="+altImageArgs+"&productLabel="+productLabel;
                //alert(popupLink);



                superPopup({
                    type: "zoom",
                    url : popupLink
                });
                return false;
            } else if($(e.target).hasClass("zoomerKiosk")){

            	//alert("Click 2");
                var popupLink = $(e.target).attr("href");
                //alert(popupLink);
                var dynArguments = $("#dynArgsForZoom").attr("name");
                var altImageArgs = $("#altImageZoom").attr("name");
                var productLabel = $("#productLabel").attr("name");
                popupLink+="?dynamicArgs="+dynArguments+"&altImageArgs="+altImageArgs+"&productLabel="+productLabel;
                //alert(popupLink);
                window.location = popupLink;
                return false;

            } else {
                return true
            }


        });

//#############################R14OCTPDP changes Start###################################

//Render PDP page selection container
	//populatePDP();
// product overview click
$("#productOverview").click(function(e){
//clear error msg
if($("#"+prodJson.productId+"_cartMessage").length == 1){
$("#"+prodJson.productId+"_cartMessage").html("");
}

//alert('inside');
	var thisInput = getInputElm(e);
	//alert(thisInput);
	var inputName = $(thisInput).attr("name");	
	var thisProductId;	
	var selectedPantsLength;
    
	if(inputName!=null) {	
					var elements = inputName.split("_");					 
                     if(elements!=null) {
                         thisProductId = elements[0];
                     }
                     if(elements.length>2) {
                         selectedPantsLength=elements[1];
                     }
                 }
	if(selectedPantsLength){
		selectedpntslgth = (selectedPantsLength=='Long'?1:0);
	}
	if(inputName == thisProductId+"_selectedConcept") {
        selectedConcept = $(thisInput).attr("value");
		$('.productSizes').remove();
		//$('.productQuanity').remove();
		$('.productColors').remove();
		$('.saleColors').remove();
		$('.sizeType').remove();
		selectedSize='';
		selectedpntslgth=0;
		//selectedColor='';
		populateQty = false;
		
		//$('.sizeType ul').remove();
		populatePDP();
		addHiddenVal(1);
	}
	if(inputName == thisProductId+"_"+selectedPantsLength+"_selectedSize" ){	
		 selectedSize = $(thisInput).attr("value");
		// alert(selectedSize);
		//change the size and render colors for size
		renderColorForSize(e,1);
		addHiddenVal(1);
	}	
	if($(e.target).hasClass("regularColor")) {		
		if(selectedpntslgth == 1){		
			renderSizeforColor(e,prodJson[selectedConcept].longColorArray,selectedPantsLength,'.productSizes:last ul',1);
		}else{		
			renderSizeforColor(e,prodJson[selectedConcept].regularColorArray,selectedPantsLength,'.productSizes:first ul',1);
		}
		addHiddenVal(1);
	}
	
	if($(e.target).hasClass("saleColor")) {	
		if(selectedpntslgth == 1){
			renderSizeforColor(e,prodJson[selectedConcept].longsSaleColorArray,selectedPantsLength,'.productSizes:last ul',1);
		}else{		
			renderSizeforColor(e,prodJson[selectedConcept].regularSaleColorArray,selectedPantsLength,'.productSizes:first ul',1);	
		}
			addHiddenVal(1);
	}
	
	if($(e.target).hasClass("wishlistTrigger"))
    {
        
		var quant = $("#quantitySku").val();
        var sku = selectedSKU;
		
		var pid = prodJson.productId;
		var colorChoice = selectedColor;
        var sizeChoice = selectedSize;
		var cartMessage = $("#"+pid+"_cartMessage");
		
        if(!sku) {
			if(cartMessage !=null) {
				if(prodJson.productType==3 && prodJson.displaySize==false){
					$(cartMessage).html("You must select color in order to add the item to your wishlist.");
				}else{
					$(cartMessage).html("You must select both size and color in order to add the item to your wishlist.");
				}				
			}
			return false;
		 }else {
			$(cartMessage).html("");
		 }	 
		 
		 
        //call the omniture function to send the product Id,sku Id
        var wishlistStatus = $("#wishlistStatus").val();
        scProductDetailsWishlistAdd(this,pid,sku,wishlistStatus);
		
		
        $("#catalogRefIdsWish").attr("value", sku);
        $("#productIdsWish").attr("value", pid);
        $("#quantityWish").attr("value", quant);
        $("#fromPageWish").attr("value", "productDetails");
    } else if($(e.target).hasClass("sendEmailToFriendPDP")){

                if($(e.target).attr("href") != "#"){
                    var emailBox = $("#" + $(e.target).attr("whichID") + "_emailFriend");
                }
                if(jQuery.browser.msie && jQuery.browser.version < 6.99){
					hideSelects();
				 }
                $(emailBox).css({
                    display:"block"
                    });


                return false;
            } else if($(e.target).hasClass("emailFriendSubmitButton")) {
                    $("#"+$(e.target).attr("alt")+"_emailFriend").validateEmailFriend();
                    return false;
            } else if(!$(e.target).hasClass("emailFriendSubmitButton") && $(e.target).is("input[type='submit']")){
                $(e.target).attr('disabled','disabled');
                var input = e.target;
                var quant = $(input).parents("form").children().children().children("select[name='quantity']").val();
                var sku = $(input).parent().parent().children(".skuId").val();
				var pid = prodJson.productId;
                //var pid = $(input).parent().parent().children(".prodId").val(); 
				//alert(sku+'|'+pid+'|'+quant);
				if($("#"+pid+"_cartMessage").length == 0){
				//alert('inside');
				 $('.sizeAndAvailability').prepend($('<p/>').attr({'id':pid+'_cartMessage','class':'warning'}));				
				}
				var cartMessage = $("#"+pid+"_cartMessage");
				
				//alert(selectedColor+"|"+selectedSize);
                if(!sku) {
				 //alert('inside if');
                    if(cartMessage !=null) {
                        $(cartMessage).html("You must select both size and color in order to add the item to your shopping bag.");
                    }
					$(e.target).removeAttr('disabled');
                    return false;
                }else {
                    $(cartMessage).html("");
                }


                $("#catalogRefIds").attr("value", sku);
                $("#productIds").attr("value", pid);
                $("#quantity").attr("value", quant);

                //omniture code
                var cartStatus = $(".cartStatus").val();
                scCategoryListCartAdd(this,pid,sku,cartStatus);


                $("#cartForm").submit();
                return false;
            }
			
            if($(e.target).hasClass("cancel") || $(e.target).hasClass("closeButton")){
                $("#" + $(e.target).attr("whichID") + "_emailFriend").fadeOut(500);
                if(jQuery.browser.msie && jQuery.browser.version < 6.99){
					showSelects();
				 }
                return false;
            }

	
	
	
	
});
//#############################R14OCTPDP changes END###################################


        /* END Product Detail Page Styles */

    } else if($("body").hasClass("giftCard")){

        //Instantiate the message auto tabbing system.
        $('#line1').autotab({ target: 'line2'});
        $('#line2').autotab({ target: 'line3', previous: 'line1' });
        $('#line3').autotab({ target: 'line4', previous:'line2'});
	    $('#line4').autotab({ target: 'line5', previous:'line3'});
        $('#line5').autotab({ previous: 'line4'});

        // instanciate the tabs
        /*Start changes for bugzilla 2695 – Gift messaging breaks up to 5 lines of 24 characters per line and prints that way */
                
        $("[name^=giftMessageTextArea]").each(function(){
        	giftMessageWrap(this);
        });
        
        $("[name^=giftMessageTextArea]").keyup(function () {
    		giftMessageWrap(this);
    	});
        
		(function ($) {$.caretTo = function (el, index) {
							if (el.createTextRange) {
								var range = el.createTextRange();
								range.move("character", index);
								range.select();
								} else if (el.selectionStart != null) {
								el.focus();
								el.setSelectionRange(index, index);
								}
						};
		 
		$.fn.caretTo = function (index, offset) {
						return this.queue(function (next) {
						if (isNaN(index)) {
							var i = $(this).val().indexOf(index);
							if (offset === true) {
								i += index.length;
								} else if (offset) {
								i += offset;
								}
								$.caretTo(this, i);
								} else {
								$.caretTo(this, index);
								}
						next();
						});
					};
		 
		$.fn.caretToStart = function () {
				return this.caretTo(0);
				};
		
		$.fn.caretToEnd = function () {
			return this.queue(function (next) {
			$.caretTo(this, $(this).val().length);
			next();
			});
			};
		}(jQuery));
		
		$('input[name^=line]').click(function () {
			 var current = $(this).attr("id");
			 var textBox = current.substr(0,current.length-1);
			 var messageLength = getMessageLength(textBox);
			 var textBox1= current.substr(0,current.length-1)+1;
			 var gifBoxValue= $("#"+textBox1).val();
			 if(messageLength==0){	
				  $("#"+textBox1).caretToEnd();
			 }
			 else if($(this).val()==""){
				 var textBox =  getPrevious(current)	
				 $("#"+textBox).caretToEnd();
			 }
			 else if(messageLength<22){	
				 ///$("#"+textBox1).caretToEnd();
			 }
			else if(messageLength<44){
				 var textBox2= current.substr(0,current.length-1)+2;
				// $("#"+textBox2).caretToEnd();
			}
			else if(messageLength<66){
				 var textBox3= current.substr(0,current.length-1)+3;
				 //$("#"+textBox3).caretToEnd();
			}
			else if(messageLength<88){
				 var textBox4= current.substr(0,current.length-1)+4;
				//$("#"+textBox4).caretToEnd();
			}
			else if(messageLength<110){
				 var textBox5= current.substr(0,current.length-1)+5;
				 //$("#"+textBox5).caretToEnd();
			}
		})
		.bind("keydown", (function (event) {
		   var current = $(this).attr("id");
		   var  next = getNext(current); 
		   var previous=getPrevious(current);
		   var textBox1= $(this).attr("name");
		    var count = getCount(current);
		    
		   if(textBox1=='line'){
			   previous=current;
		   }
		   var textBox5= $(this).attr("name");
		  
		 $("#"+current).autotab({ target: next,previous: previous});
		  var e = (e) ? e : ((event) ? event : null);
		   var node = (e.target) ? e.target : ((e.srcElement) ? e.srcElement : null);
		   if(e.keyCode==8 && node.type=="text" && current !='line5'){	
			 $("#"+current).autotab({ target:next,previous:previous}); 
			  if($("#"+current).val()==""){
			   $("#"+previous).caretToEnd();
		   }
			 
		 }
		 if(e.keyCode==13 && node.type=="text"){
			 if(count==110){
				 return false;
				 }
			var currentLineValue = $("#"+current).val();
			 $("#"+current).val(currentLineValue+" ");
			 $("#"+current).autotab({ target:next,previous:previous});					
			   $("#"+next).caretToStart();
			   stopPropogation(e);
		 }
		 else 
		 { 
		 validateGiftMessage($(this).val(),current, next ,previous); 
		 }
		}));
	  function validateGiftMessage(message,currentBox,nextBox,previousBox) {
			var currentLine ="";
			var space =" ";
			var words = message.split(/[\s\u00A0]+/);

		for (i = 0; i < words.length; i++)
		{
		 currentLine = currentLine + space + words[i];
		 if(currentLine.length>22){
			 var length = currentLine.length;
			 var length2 = words[i].length;
			 var remove = parseInt(length) - (length2+1);
			 var previousLine = message.substr(0, remove);
			   if(words[i].length==22){
			   
				if($("#"+currentBox).attr("name")=='line5'){
					$("#"+currentBox).caretToEnd();
					
					}
				 $("#"+currentBox).autotab({ target: nextBox,previous: previousBox});
				 $("#"+nextBox).caretToStart();
				 }
				   else { 
					   if($("#"+currentBox).attr("name")=='line5'){
					   }
					   else{
						   $("#"+currentBox).val(previousLine);
				
									
								 $("#"+nextBox).val(words[i]);
							   $("#"+currentBox).autotab({ target: nextBox,previous:previousBox});
								   
							  $("#"+nextBox).caretToEnd();
							  }
						  }
				}
			}
		}
		  function getMessageLength(textBox){
				var length=0;
				if( $('#'+textBox+1).val().length!=0){
					length = $('#'+textBox+1).val().length;
				}
				if( $('#'+textBox+2).val().length!=0){
					length = $('#'+textBox+2).val().length+ +22;
				}
				if( $('#'+textBox+3).val().length!=0){
					length = $('#'+textBox+3).val().length+ +44;
				}
				if( $('#'+textBox+4).val().length!=0){
					length = $('#'+textBox+4).val().length+ +66;
				}
				if( $('#'+textBox+5).val().length!=0){
					length = $('#'+textBox+5).val().length+ +88;
				}
				
			 return length;
			}
		
		function stopPropogation(e){
		if (e.stopPropagation) {
				e.preventDefault();
			}
			return false;
		}
			
		function getNext(current){
				var next = current.substr(0, current.length-1);
				var index= parseInt(current.substr(current.length-1, current.length))+ +1;	
		        next = next+index;		
				return next;
		}	
		
		function getPrevious(current){
				var next = current.substr(0, current.length-1);
				var index= parseInt(current.substr(current.length-1, current.length))+ -1;
		        next = next+index;		
				return next;
		}
		
		function getCount(current){
			var currentvalue=$("#"+current).val();
			var index= parseInt(current.substr(current.length-1, current.length));
			var previousLines=parseInt(index)-1;
			var count=0;
			count = (parseInt(previousLines)*22 +currentvalue.length);
			return count;
		}
/*End changes for bugzilla 2695 – Gift messaging breaks up to 5 lines of 24 characters per line and prints that way */		
        $(".tabSection > ul").tabs();

        //this sets the right radio if a user clicks in the custom gift card ammount.
        $("#cardAmmount").click(function(){
            //remove any other active state
            $(".giftDenomination li").removeClass("active");
            $("#otherRadio").attr("checked", "checked")
            var ammount = $(this).val()

			var isNotANum = false;
			if(ammount.indexOf(".") != -1){

				$(".ammountError").remove()
				if(isGcAmountKeyUp){
					$(this).parent().append("<p class='ammountError'>Sorry you can only insert whole dollar amounts</p>");
				}
			} else{

				$(".ammountError").remove()
				if($(this).val()!=''){
					isNotANum = isNaN($(this).val());
				}
				var ammount = parseInt($(this).val());

				if(ammount >= 1){
					if(parseInt(ammount) > 2000){
						ammount = 2000;
						$(".ammountError").remove()
						if(isGcAmountKeyUp){
							$(this).parent().append("<p class='ammountError'>Maximum gift card value is $2,000.00</p>");
						}
					} else {
						$(".ammountError").remove()
					}
					ammount = Math.floor(ammount);
					$(".giftDenomination strong span").html("$" + ammount  + ".00");
					$(".itemPrice").html("$" + ammount + ".00");
					$("#giftCardAmount").attr("value", ammount);
				}else{
					if(isGcAmountKeyUp){
						$(this).parent().append("<p class='ammountError'>Sorry you can only insert whole dollar amounts</p>");
					}
					$(".itemPrice").html("$0.00");
					$("#giftCardAmount").attr("value", "0.00");
					$(".giftDenomination strong span").html("$0.00");
				}
				if(isNotANum){
					$(".ammountError").remove();
					if(isGcAmountKeyUp){
						$(this).parent().append("<p class='ammountError'>Sorry you can only insert whole dollar amounts</p>");
					}
					$(".itemPrice").html("$0.00");
					$("#giftCardAmount").attr("value", "0.00");
					$(".giftDenomination strong span").html("$0.00");
				}

            }
            return false;
        })

        $("#cardAmmount").keyup(function(){
            var ammount = $(this).val()
            isGcAmountKeyUp=true;

            var isNotANum = false;
            if(ammount.indexOf(".") != -1){
                $(".ammountError").remove()
                $(this).parent().append("<p class='ammountError'>Sorry you can only insert whole dollar amounts</p>");
            } else{
                $(".ammountError").remove()
                if($(this).val()!=''){
                    isNotANum = isNaN($(this).val());
                }
                var ammount = parseInt($(this).val());

                if(ammount >= 1){
                    if(parseInt(ammount) > 2000){
                        ammount = 2000;
                        $(".ammountError").remove()
                        $(this).parent().append("<p class='ammountError'>Maximum gift card value is $2,000.00</p>");
                    } else {
                        $(".ammountError").remove()
                    }
                    ammount = Math.floor(ammount);
                    $(".giftDenomination strong span").html("$" + ammount  + ".00");
                    $(".itemPrice").html("$" + ammount + ".00");
                    $("#giftCardAmount").attr("value", ammount);
                }else{
                    $(this).parent().append("<p class='ammountError'>Sorry you can only insert whole dollar amounts</p>");
                	$(".itemPrice").html("$0.00");
                	$("#giftCardAmount").attr("value", "0.00");
                	$(".giftDenomination strong span").html("$0.00");
                }
                if(isNotANum){
                    $(".ammountError").remove();
                    $(this).parent().append("<p class='ammountError'>Sorry you can only insert whole dollar amounts</p>");
                	$(".itemPrice").html("$0.00");
                	$("#giftCardAmount").attr("value", "0.00");
                	$(".giftDenomination strong span").html("$0.00");
                }

            }

        })

        $(".giftDenomination li").click(function(){
            //remove any active state
            isGcAmountKeyUp=false;
            $(".giftDenomination li.active").removeClass("active");
			$("#cardAmmount").val("");
			$(".ammountError").remove()
            //set the clicked obj's grandparent (li) to active
            $(this).addClass("active");
            input = $(this).find("input").get(0)

            //if this is not the "other" field
            if($(this).attr("id") != "otherAmmount"){
                var ammount = $(input).val();
                $("#otherRadio").attr("checked", "");

                $(".giftDenomination strong span").html("$" + ammount + ".00" );
                $(".itemPrice").html("$" + ammount + ".00" );
                $("#giftCardAmount").attr("value", ammount);
            } else {
                var ammount = $("#cardAmmount").val();
                if(ammount > 2000){
                    ammount = 2000;
                }
                if(ammount.split(".").length < 2){
                    ammount = ammount + ".00";
                }
                $(".giftDenomination strong span").html("$" + ammount);
                $(".itemPrice").html("$" + ammount);
                $("#giftCardAmount").attr("value", ammount);
            }

        })

        $(".cardDesigns img").click(function(){

            //set selected variable to be equal to the value of the radio buttons label txt.

            var input = $(this).parent().children("input[type=radio]");
            //alert("Input length :"+$(input).length);
            var selected = $(this).attr("alt");
            //remove active states on any other style li
            $(".cardDesigns li").removeClass("active");

            //set the clicked objs li to active
            $(input).parent().parent().addClass("active");
            $("#selectedCardStyle").html(selected);
            var image = $(this).parent().children(".giftCardChip").attr("longdesc");

            var gifCarSkuId = $(this).parent().children(".giftCardChip").attr("id");

            var gcSku = document.getElementById("skuId");
            if (gcSku != null) {
		gcSku.value = gifCarSkuId;
            }

            //alert("The image is :"+image);
            //$("#heroContainer").attr("src", image);


        });

        $(".giftItem").click(function(e){
            //alert("Inside giftItem click");
            var input = e.target;
            var quant = $("#quantitySku").val();
            var sku = $(input).parents("form").children(".skuId").val();
            var pid = $(input).parents("form").children(".prodId").val();

            //alert("quant:"+quant+" Sku:"+sku+" pid:"+pid);

            $("#catalogRefIds").attr("value", sku);
            $("#productIds").attr("value", pid);
            $("#quantity").attr("value", quant);
            //alert(document.getElementById("catalogRefIds").value);
            $("#giftForm").submit();
            return false;


        });

        $("#giftForm").validate({
                errorContainer: "#formErrors",
                errorLabelContainer: "#formErrors ul",
                wrapper: "li",
                // add rules to override defaults e.g., minlength
                rules: {
                    recipientEmail: {
                        required: true,
                        email: true
                    },
                    confirmRecipientEmail:{
                        required: true,
                        email: true,
                        equalTo: "#recipientEmail"
                    }
                },
                messages:{
                    recipientEmail:{
                        required: "This field is required.",
                        email: "Please enter a valid email address."
                    },
                    confirmRecipientEmail:{
                        required: "This field is required",
                        email: "Please Enter a valid email address.",
                        equalTo: "This email must match the recipients Email."
                    }
                }
        });


        /*if($("body#giftCardPhysical").length > 0){

    }*/
    } else if($("body").hasClass("outfitGallery")){
	
            $("#outfitGallery li").hover(
                function () {
					$(this).find(".itemOverlay").css({ opacity: 0.5 });
                    $(this).find(".quickViewBtn").fadeIn("fast");
					$(this).find(".itemOverlay").fadeIn("fast");
                },
                function () {
                    $(this).find(".quickViewBtn").fadeOut("fast");
					$(this).find(".itemOverlay").fadeOut("fast");
                }
            );
	
	
    } else if($("body").hasClass("galleryView")){


        /* Gallery View Functions */



            $("#productGallery li").hover(
                function () {
                    $(this).children(".quickViewBtn").fadeIn("fast");
                },
                function () {
                    $(this).children(".quickViewBtn").fadeOut("fast");
                }
            );

            //Function for the click of a quick view
            //
            // NOTE: we may want to switch this over to a custom function to have better
            //       control of the events so the load isin't so herky-jerkey filed under
            //       TODO
            //
            $('#quickViewContainer').jqm({
                ajax: '@href',
                trigger: 'a.quickViewBtn',
                overlayClass: 'jqmOverlay',
                overlay: .6,
                ajaxText: "Please wait, loading content...",
                onShow: function(hash){

                    var mTop = "-" + Math.round(hash.w.outerHeight() / 2) + "px";
                    var mLeft = "-" + Math.round(hash.w.outerWidth() / 2) + "px";
                    hash.o.css('opacity',.65);
                    hash.w.css({
                        'margin-top': mTop,
                        'margin-left': mLeft
                    }).show();
					if(jQuery.browser.msie && jQuery.browser.version < 6.99){
						window.location.hash = "#contentwrapper";
					}

                },
                onHide: function(hash){
                    hash.w.hide()
                    hash.o.hide();


                },
                onLoad: function(){
                    $(".sizeAndAvailability .disabled").css("opacity",.35);
                }
            });
            /*$('#quickViewContainer').jqDrag();*/
            $("#quickViewContainer").click(function(e){
				
            	//clear error msg
            	if($("#"+prodJson.productId+"_cartMessage").length == 1){
            	$("#"+prodJson.productId+"_cartMessage").html("");
            	}

            	
            		var thisInput = $(e.target).children("input");	
            		if(!$(e.target).children("input").attr("name")){		
            			thisInput = $(e.target).siblings("input");
            		}
            		//alert(thisInput);
            		var inputName = $(thisInput).attr("name");	
            		var thisProductId;	
            		var selectedPantsLength;
            	    
            		if(inputName!=null) {	
            						var elements = inputName.split("_");					 
            	                     if(elements!=null) {
            	                         thisProductId = elements[0];
            	                     }
            	                     if(elements.length>2) {
            	                         selectedPantsLength=elements[1];
            	                     }
            	                 }
            		if(selectedPantsLength){
            			selectedpntslgth = (selectedPantsLength=='Long'?1:0);
            		}
					
					
					if(inputName == thisProductId+"_selectedConcept") {
            	        selectedConcept = $(thisInput).attr("value");
            			$('.productSizes').remove();
            			//$('.productQuanity').remove();
            			$('.productColors').remove();
            			$('.saleColors').remove();
            			$('.sizeType').remove();
            			selectedSize='';
            			selectedpntslgth=0;
            			//selectedColor='';
            			populateQty = false;
            			
            			//$('.sizeType ul').remove();
            			populatePDP();
            			addHiddenVal(1);
            		}
            		if(inputName == thisProductId+"_"+selectedPantsLength+"_selectedSize" ){	
            			 selectedSize = $(thisInput).attr("value");
            			// alert(selectedSize);
            			//change the size and render colors for size
            			renderColorForSize(e,1);
            			addHiddenVal(1);
            		}	
            		if($(e.target).hasClass("regularColor")) {		
            			if(selectedpntslgth == 1){		
            				renderSizeforColor(e,prodJson[selectedConcept].longColorArray,selectedPantsLength,'.productSizes:last ul',1);
            			}else{		
            				renderSizeforColor(e,prodJson[selectedConcept].regularColorArray,selectedPantsLength,'.productSizes:first ul',1);
            			}
            			addHiddenVal(1);
            		}
            		
            		if($(e.target).hasClass("saleColor")) {	
            			if(selectedpntslgth == 1){
            				renderSizeforColor(e,prodJson[selectedConcept].longsSaleColorArray,selectedPantsLength,'.productSizes:last ul',1);
            			}else{		
            				renderSizeforColor(e,prodJson[selectedConcept].regularSaleColorArray,selectedPantsLength,'.productSizes:first ul',1);	
            			}
            				addHiddenVal(1);
            		}
            		
							
							
	if($(e.target).hasClass("wishlistTrigger"))
    {
        
		var quant = $("#quantitySku").val();
        var sku = selectedSKU;
		
		var pid = prodJson.productId;
		var colorChoice = selectedColor;
        var sizeChoice = selectedSize;
		var cartMessage = $("#"+pid+"_cartMessage");
		
        if(!sku) {
			if(cartMessage !=null) {
				$(cartMessage).html("You must select both size and color in order to add the item to your wishlist.");
			}
			return false;
		 }else {
			$(cartMessage).html("");
		 }	 
		 
		 
        //call the omniture function to send the product Id,sku Id
        var wishlistStatus = $("#wishlistStatus").val();
        scProductDetailsWishlistAdd(this,pid,sku,wishlistStatus);
		$("#catalogRefIdsWish").attr("value", sku);
        $("#productIdsWish").attr("value", pid);
        $("#quantityWish").attr("value", quant);
        $("#fromPageWish").attr("value", "productDetails");
    }else if($(e.target).hasClass("sendEmailToFriendPDP")){
                if($(e.target).attr("href") != "#"){
                    var emailBox = $("#" + $(e.target).attr("whichID") + "_emailFriend");
                }
                if(jQuery.browser.msie && jQuery.browser.version < 6.99){
					hideSelects();
				 }
                $(emailBox).css({
                    display:"block"
                    });


                return false;
            } else if($(e.target).hasClass("emailFriendSubmitButton")) {
                    $("#"+$(e.target).attr("alt")+"_emailFriend").validateEmailFriend();
                    return false;
            }else if(!$(e.target).hasClass("emailFriendSubmitButton") && $(e.target).is("input[type='submit']")){
            		//alert('inside');
            	            	$(e.target).attr('disabled','disabled');
            	                var input = e.target;
            	                var quant = $(input).parents("form").children().children().children("select[name='quantity']").val();
            	                var sku = $(input).parent().parent().children(".skuId").val();
            					var pid = prodJson.productId;
            	                //var pid = $(input).parent().parent().children(".prodId").val(); 
            					//alert(sku+'|'+pid+'|'+quant);
            					if($("#"+pid+"_cartMessage").length == 0){
            					//alert('inside');
            					 $('.sizeAndAvailability').prepend($('<p/>').attr({'id':pid+'_cartMessage','class':'warning'}));				
            					}
            					var cartMessage = $("#"+pid+"_cartMessage");
            					
            					//alert(selectedColor+"|"+selectedSize);
            	                if(!sku) {
            					 //alert('inside if');
            	                    if(cartMessage !=null) {
            	                        $(cartMessage).html("You must select both size and color in order to add the item to your shopping bag.");
            	                    }
            						$(e.target).removeAttr('disabled');
            	                    return false;
            	                }else {
            	                    $(cartMessage).html("");
            	                }


            	                $("#catalogRefIds").attr("value", sku);
            	                $("#productIds").attr("value", pid);
            	                $("#quantity").attr("value", quant);

            	                //omniture code
            	               var cartStatus = $(".cartStatus").val();
            	               scCategoryListCartAdd(this,pid,sku,cartStatus);


            	                $("#cartForm").submit();
            	                return false;
            	            }
							
							
							if($(e.target).hasClass("cancel") || $(e.target).hasClass("closeButton")){
                $("#" + $(e.target).attr("whichID") + "_emailFriend").fadeOut(500);
                if(jQuery.browser.msie && jQuery.browser.version < 6.99){
					showSelects();
				 }
                return false;
            }
})
        /* End Gallery View Functions */

        $("#sideBar li.more").click(function(){
        $(this).children("ul").slideDown("normal");

    });


    } /*else if($("body").attr("id") == "outfitLandingPage"){

        $("#sideScroll").flashInjection({
            //XHTMLcontentContainer:"#flashArea", NO DYNAMIC CONTENT
            flashSource: "flash/outfits.swf",
            flashWidth: 740,
            flashHeight: 350,
            flashVersion: 8,
            flashParams:{
                quality: "high",
                wmode: "transparent",
                scale: "noscale",
                salign: "lt",
                allowScriptAccess: "SameDomain"
            },
            flashVars:{
                xmlVar: 'flash/xml/outfits.xml'
            }
        });
    }*/
        else if($("body").attr("id") == "outfitOcassionPage"){

        $(".outfit").click(function(){
            var bigSrc = $(this).children().attr("longdesc");
            var outfitTitle = $(this).children().attr("title");
            $("#shopThisOutfitLink").attr("href", $(this).attr("href"))
            $(".selectedOutfit").removeClass("selectedOutfit");
            $(this).children().addClass("selectedOutfit");
            $("#selectedOutfit").attr("src", bigSrc+"?$outfitLanding$");
            $("#selectedOutfit").attr("title", outfitTitle);

            return false;
        });

    } else if($("body").attr("id") == "listView"){
        $(".sizeAndAvailability .disabled").css("opacity",.35);
        $(".productListItem").click(function(e){

            var target = $(e.target);
            var isUnavailable = false;
            isUnavailable = $(target).hasClass("disabled");
            if(target && !isUnavailable) {
                var parent = $(target).parent("li");
                if(parent) {
                    isUnavailable = $(parent).hasClass("disabled");
                }
                if(!isUnavailable) {
                	parent = $(target).parent().parent();
                	isUnavailable = $(parent).hasClass("disabled");
                }
            }
            if(isUnavailable) {
                return false;
            }

            //////////////alert("Inside listView Clicks");
            // create event bubble: if you click on a label inside ANY of the product list views,
            //    update ONLY that item, use ancestoral references.
            $(this).css("min-height", $(this).height() + "px");

            if($(e.target).hasClass("sendEmailToFriendPDP")){

                if($(e.target).attr("href") != "#"){
                    var emailBox = $("#" + $(e.target).attr("whichID") + "_emailFriend");
                }
                if(jQuery.browser.msie && jQuery.browser.version < 6.99){
					hideSelects();
				 }
                $(emailBox).css({
                    display:"block"
                    });



                return false;
            } else if($(e.target).hasClass("cancel")||$(e.target).hasClass("closeButton")){
                $("#" + $(e.target).attr("whichID") + "_emailFriend").fadeOut(500);
                if(jQuery.browser.msie && jQuery.browser.version < 6.99){
					showSelects();
				 }
                return false;
            }else if($(e.target).hasClass("emailFriendSubmitButton")) {
                $("#"+$(e.target).attr("alt")+"_emailFriend").validateEmailFriend();
                return false;
            }else if($(e.target).hasClass("colorChip") || $(e.target)[0].tagName == "LABEL"){
                containerParent = $(this);
                var thisInput = $(e.target).children("input");
                var pantsLengthValue="";
                //////////////alert("Calling SKUSelector");
                $(this).skuSelector(e);
                if(!$(thisInput).attr("checked")){
                    $(thisInput).attr("checked", "checked");
                }

                var inputName = $(thisInput).attr("name");
                var thisProductId = '';
                if(inputName!=null){
                var elements = inputName.split("_");
                    if(elements!=null && elements.length>0){
                        thisProductId = elements[0];
                        ////alert(thisProductId);
                    }

                }
                if(thisProductId==""){
                    var colorName = $(e.target).parent().children("input").attr("name");
                    var colorInput = $(e.target).parent().children("input");
                    var elements = colorName.split("_");
                    if(elements!=null && elements.length>0){
                        thisProductId = elements[0];
                        ////alert(thisProductId);
                    }

                }


                    theContainer = $(containerParent).children(".overviewContainer");
                    theForm = $(theContainer).children(".formGalleryService");

                var frmUserAction = "";

                if(thisProductId!=null) {
                    frmUserAction = document.getElementById(thisProductId+"_"+"navigation_product_form");
                        var fabric = document.getElementById(thisProductId+"_selectedFabric");
                        if(fabric !=null) {
                            selectedFabric = fabric.value;
                        }

                        var pantsLengthItem = document.getElementById(thisProductId+"_selectedPantsLength");
                        if(pantsLengthItem!=null) {
                            pantsLengthValue=pantsLengthItem.value;
                        }

                }
                    theContainer = $(containerParent).children(".overviewContainer");
                    theForm = frmUserAction;


                if(frmUserAction!=null) {
                    $(this).changeProduct({
                        clicked: $(e.target).children("input"),
                        action: frmUserAction.action,
                        container: $(theContainer),
                        data: $(theForm).serialize(),
                        method: $(".formGalleryService").attr("method"),
                        pantsLength:pantsLengthValue,
                        userAction:userAction,
                        updatePriceRange: $(this).find("div.price").get(0)
                    })
                }else{
                    $(this).changeProduct({
                        clicked: $(e.target).children("input"),
                        action: $(this).children(".overviewContainer").children("form").attr("action"),
                        container: $(theContainer),
                        data: $(theForm).serialize(),
                        method: $(".formGalleryService").attr("method"),
                        pantsLength:pantsLengthValue,
                        userAction:userAction,
                        updatePriceRange: $(this).find("div.price").get(0)
                    })

                }


                return false;
            } else if($(e.target).is("input[type='submit']") && !$(e.target).hasClass("emailFriendSubmitButton")){
            	$(e.target).attr("disabled","disabled");
                var input = e.target;
                var quant = $(input).parents("form").children().children().children("select[name='quantity']").val();
                var sku = $(input).parent().parent().children(".skuId").val();
                var pid = $(input).parent().parent().children(".prodId").val();

                var colorChoice = $("#"+pid+"_colorChoice");
                var cartMessage = $("#"+pid+"_cartMessage");
                if(colorChoice !=null) {
                    colorChoice = colorChoice.attr("value");
                }

                var sizeChoice = $("#"+pid+"_sizeChoice");

                if(sizeChoice !=null) {
                    sizeChoice = sizeChoice.attr("value");
                }

                if(colorChoice == null || sizeChoice ==null || colorChoice=="" || sizeChoice=="") {

                    if(cartMessage !=null) {
                        $(cartMessage).html("You must select both size and color in order to add the item to your shopping bag.");
                    }

                    return false;
                }else {
                    $(cartMessage).html("");
                }


                $("#catalogRefIds").attr("value", sku);
                $("#productIds").attr("value", pid);
                $("#quantity").attr("value", quant);

                //omniture code
                var cartStatus = $(".cartStatus").val();
                scCategoryListCartAdd(this,pid,sku,cartStatus);


                $("#cartForm").submit();
                return false;
            } else if($(e.target).hasClass("wishlistTrigger"))
            {
                var input = e.target;
                var quant = $(input).parents("form").children().children().children("select[name='quantity']").val();
                var sku = $(input).parent().parent().parent().children(".skuId").val();
                var pid = $(input).parent().parent().parent().children(".prodId").val();
                 var colorChoice = $("#"+pid+"_colorChoice");
                    var cartMessage = $("#"+pid+"_cartMessage");
                    if(colorChoice !=null) {
                        colorChoice = colorChoice.attr("value");
                    }

                    var sizeChoice = $("#"+pid+"_sizeChoice");

                    if(sizeChoice !=null) {
                        sizeChoice = sizeChoice.attr("value");
                    }

                    if(colorChoice == null || sizeChoice ==null || colorChoice=="" || sizeChoice=="") {

                        if(cartMessage !=null) {
                            $(cartMessage).html("You must select both size and color in order to add the item to your wishlist.");
                        }

                        return false;
                    }else {
                        $(cartMessage).html("");
                    }
                $("#catalogRefIdsWish").attr("value", sku);
                $("#productIdsWish").attr("value", pid);
                $("#quantityWish").attr("value", quant);
                $("#fromPageWish").attr("value", "categoryDetails");
				if(jQuery.browser.msie && jQuery.browser.version < 6.99){
					window.location.hash = "#contentwrapper";
				}

            }
        });



    } else if($("body").attr("id") == "outfitDetailPage"){

       $(".sizeAndAvailability .disabled").css("opacity",.35);

       $(".scrollButton").hoverIntent(
            function(){
                $(this).children().children().fadeIn("fast");
            },
            function(){
                $(this).children().children().fadeOut("fast");
            }
        );

        $(".productListItem").click(function(e){

            // create event bubble: if you click on a label inside ANY of the product list views,
            //    update ONLY that item, use ancestoral references.
            $(this).css("min-height", $(this).height() + "px");

            var target = $(e.target);
            var isUnavailable = false;
            isUnavailable = $(target).hasClass("disabled");
            if(target && !isUnavailable) {
                var parent = $(target).parent("li");
                if(parent) {
                    isUnavailable = $(parent).hasClass("disabled");
                }
                if(!isUnavailable) {
                	parent = $(target).parent().parent();
                	isUnavailable = $(parent).hasClass("disabled");
                }
            }
            if(isUnavailable) {
                return false;
            }

            if($(e.target).hasClass("colorChip") || $(e.target)[0].tagName == "LABEL"){
            containerParent = $(this);
                var selectedPantsLength = "";
                var thisInput = $(e.target).children("input");
                var colorName = $(e.target).parent().children("input").attr("name");
                var colorInput = $(e.target).parent().children("input");
                var thisProductId;
                var inputName = $(thisInput).attr("name");

                if(colorName!=null) {
                    var elements = colorName.split("_");
                    if(elements!=null) {
                        thisProductId = elements[0];
                        if(elements.length>2) {
                            selectedPantsLength=elements[1];
                        }
                    }
                }else if(inputName!=null) {
                    var elements = inputName.split("_");
                    if(elements!=null) {
                        thisProductId = elements[0];
                    }
                    if(elements.length>2) {
                        selectedPantsLength=elements[1];
                    }
                }

                if(selectedPantsLength!=""){
                    var pantsLengthInput = document.getElementById(thisProductId+"_selectedPantsLength");
                    if(pantsLengthInput!=null) {
                        pantsLengthInput.value=selectedPantsLength;
                        //////alert("pantsLengthInput.value is:"+pantsLengthInput.value);
                    }
                }





                var productIdUserAction=document.getElementById(thisProductId+"_userAction");

                var productIdColorIndicator=document.getElementById(thisProductId+"_colorIndicator");
                var frmUserAction = "";

                if(thisProductId!=null) {
                    frmUserAction = document.getElementById(thisProductId+"_"+"navigation_product_form");
                        var fabric = document.getElementById(thisProductId+"_selectedFabric");
                        if(fabric !=null) {
                            selectedFabric = fabric.value;
                        }

                }else{
                    frmUserAction = $("#productOverview").children(".overviewContainer").children("form");
                }

                //////alert("frmUserAction: "+frmUserAction);
                 //////alert("inputName:"+inputName+"selectedPantsLength:"+selectedPantsLength);

                if(inputName!=null) {
                    ////alert(inputName==thisProductId+"_"+selectedPantsLength+"_selectedSize");
                    if(inputName=="size" || inputName == thisProductId+"_selectedSize" || inputName==thisProductId+"_"+selectedPantsLength+"_selectedSize") {
                        selectedSize = $(thisInput).attr("value");
                        ////alert(selectedSize);
                        userAction = "sizeSelection";
                        if(productIdUserAction!=null) {
                            productIdUserAction.value=userAction;
                        }


                        ////////////alert(userAction);
                    } else if(inputName=="sizeType" || inputName == thisProductId+"_selectedConcept") {
                        selectedConcept = $(thisInput).attr("value");
                        userAction = "conceptSelection";


                        if(productIdUserAction!=null) {
                            productIdUserAction.value=userAction;
                        }


                    } else if(inputName=="color") {
                        userAction = "colorSwapSelection";
                        if(productIdUserAction!=null) {
                            productIdUserAction.value=userAction;
                        }

                        selectedColor = $(thisInput).attr("value");
                        ////////////alert("UserAction is :"+userAction);
                        ////////////alert("selectedColor is :"+selectedColor);
                    }
                    //THIS IS TO ENSURE THAT, THE JCACHE THAT RETURNS COLORS SIZES AND CONCEPTS ARE SPECIFIC TO THE CURRENT SELECTED FABRIC
                    if(inputName == thisProductId+"_selectedFabric"){
                        $(thisInput).attr("checked","checked");
                        selectedFabric = $(thisInput).attr("value");
                        userAction = "conceptSelection";
                        if(productIdUserAction!=null) {
                            productIdUserAction.value=userAction;
                        }
                    }
                }else {
                    if(colorName!=null && !$(colorInput).attr("checked")){
                        //////////alert("Checked the color");
                        $(colorInput).attr("checked", "checked");
                        if(productIdUserAction!=null) {
                            productIdUserAction.value="colorSwapSelection";
                        }

                    }

                }

                if(productIdUserAction!=null && userAction!=null) {
                    productIdUserAction.value=userAction;
                }

                if(!$(thisInput).attr("checked")){
                    $(thisInput).attr("checked", "checked");
                }

                //////////alert("The userAction is :"+productIdUserAction);
                //this updates the image zoomer on the product details page
                //figure out if its a color chip, if so update the gallery image
                if($(e.target).hasClass("colorChip")) {
                    //////////////alert("Inside colorCheck:");
                    colorToDisplay=$(e.target).attr("longdesc");
                    colorCode = $(e.target).attr("colorCode");
                    userAction = "colorSwapSelection";
                    if(productIdUserAction!=null) {
                        productIdUserAction.value="colorSwapSelection";
                    }

                    //THIS IS TO MARK WHICH COLOR IS CLICKED. A REGULAR OR SALE OR OUTLET ONE

                   if($(e.target).hasClass("regularColor")) {

                    productIdColorIndicator.value =  "regularColor";

                   }else if($(e.target).hasClass("saleColor")) {

                    productIdColorIndicator.value =  "saleColor";

                   } else if($(e.target).hasClass("outletColor")) {

                    productIdColorIndicator.value =  "outletColor";

                   }
                    //////////////alert("Inside colorCheck:"+userAction);
                    if(colorToDisplay!=null) {
                        var colorElements = colorToDisplay.split("_");

                        if(colorElements!=null && colorElements.length>0) {
                            selectedColor = colorElements[1];
                            //////alert("Selected Color is :"+selectedColor);
                        }
                    }
                }
                if(colorToDisplay!=null && colorToDisplay==selectedColor) {
                        var colorElements = colorToDisplay.split("_");

                        if(colorElements!=null && colorElements.length>0) {
                            selectedColor = colorElements[1];
                            alert(selectedColor);
                        }
                }else if(colorToDisplay==null || userAction=="conceptSelection" ||(productIdUserAction!=null && productIdUserAction.value=="conceptSelection")) {
                    colorToDisplay = document.getElementById(thisProductId+"_mainImage").value;
                }

                theContainer = $(containerParent).children(".overviewContainer");
                theForm = $(theContainer).children(".formGalleryService");
                //$(this).updateOutfitImage(colorToDisplay,thisProductId);
                $(this).changeProduct({
                    clicked: $(e.target).children("input"),
                    action: $(this).children(".overviewContainer").children("form").attr("action"),
                    container: $(theContainer),
                    data: $(theForm).serialize(),
                    method: $(".formGalleryService").attr("method"),
                    pantsLength:selectedPantsLength,
                    userAction:userAction
                })
                return false;
            }
        });

        $("#outfitDetailHeader").click(function(e){
            if($(e.target).is("input[type='submit']")){

            	var skuIds = document.getElementsByName("oftSkuId");
                var prodIds = document.getElementsByName("prodId");
                var checkedProdIds = document.getElementsByName("checkedProdIds");

                var skuIdList=new String("");
                var prodIdList = new String("");
                var sku;
                var product;

                for(var i=0; i<skuIds.length;i++) {
                    if(checkedProdIds[i].checked) {
    					sku = skuIds[i];
    					if("" == skuIdList) {
    						skuIdList = sku.value;
    					} else {
    						skuIdList = sku.value + "," + skuIdList;
    					}
    				}
                }

                for(var i=0; i<prodIds.length;i++) {
                    if(checkedProdIds[i].checked) {
                        product = prodIds[i];
                        if("" == prodIdList) {
                            prodIdList = product.value;
                        }
                        else {
                            prodIdList += "," + product.value;
                        }
                    }
                }

                var input = e.target;
                var quant = 1;



    			var itemSelected = false;
    			var errors = false;
    			// validate that a checked item has a color and size
    			$(".productListItem").each(function(){

    				var prodSelected = $($(this).children("form").children("input[name=checkedProdIds]").get(0)).attr("checked");

    				if(prodSelected){
    				itemSelected = true;
    					var theForm = $(this).children(".overviewContainer").children(".formGalleryService")
    					var productID = $($(theForm).children("input[name=productId]").get(0)).val();
    					var productSize = $($(theForm).children("input[name="+ productID+ "_sizeChoice]").get(0)).val();
    					var msgPane = $(theForm).children(".sizeAndAvailability").children("#"+productID+"_cartMessage");
    					var productColor = $($(theForm).children("input[name="+ productID+ "_colorChoice]").get(0)).val();
    					if(productSize  == "" || productColor == ""){
    						$(msgPane).html("<b>you must select a size and color to add item to cart</b>")
    						errors = true;
    					}
    				}

    			})
    			//build and write out the content strings

    			if (skuIdList != "" && prodIdList != "" &&!errors) {
    				$("#catalogRefIds").attr("value", skuIdList);
    				$("#productIds").attr("value", prodIdList);
    				$("#addToCartHeader").submit();
    			} else if(!itemSelected){
    					alert ('Please select an item to add to cart.');
    					return false;
    			}
    			return false;
            }//adding for wishlist
            else if($(e.target).parent().hasClass("buttonStyle1 button addButton")){

        	var skuIds = document.getElementsByName("oftSkuId");
            var prodIds = document.getElementsByName("prodId");
            var checkedProdIds = document.getElementsByName("checkedProdIds");



            var skuIdList=new String("");
            var prodIdList = new String("");
            var sku;
            var product;

            for(var i=0; i<skuIds.length;i++) {
                if(checkedProdIds[i].checked) {
					sku = skuIds[i];
					if("" == skuIdList) {
						skuIdList = sku.value;
					} else {
						skuIdList += "," + sku.value;
					}
				}
            }

            for(var i=0; i<prodIds.length;i++) {
                if(checkedProdIds[i].checked) {
                    product = prodIds[i];
                    if("" == prodIdList) {
                        prodIdList = product.value;
                    }
                    else {
                        prodIdList += "," + product.value;
                    }
                }
            }

            var input = e.target;
            var quant = 1;


			var itemSelected = false;
			var errors = false;
			// validate that a checked item has a color and size
			$(".productListItem").each(function(){

				var prodSelected = $($(this).children("form").children("input[name=checkedProdIds]").get(0)).attr("checked");

				if(prodSelected){
				itemSelected = true;
					var theForm = $(this).children(".overviewContainer").children(".formGalleryService")
					var productID = $($(theForm).children("input[name=productId]").get(0)).val();
					var productSize = $($(theForm).children("input[name="+ productID+ "_sizeChoice]").get(0)).val();
					var msgPane = $(theForm).children(".sizeAndAvailability").children("#"+productID+"_cartMessage");
					var productColor = $($(theForm).children("input[name="+ productID+ "_colorChoice]").get(0)).val();
					if(productSize  == "" || productColor == ""){
						$(msgPane).html("<b>you must select a size and color to add item to cart</b>")
						errors = true;
					}
				}

			})
			//build and write out the content strings

			if (skuIdList != "" && prodIdList != "" &&!errors) {
				$("#catalogRefIdsWishlist").attr("value", skuIdList);
				$("#productIdsWishlist").attr("value", prodIdList);
				$("#wishlistHeader").submit();
			} else if(!itemSelected){
					alert ('Please select an item to add to wishlist.');
					return false;
			}
			return false;
        }

        });
        $("#outfitDetailFooter").click(function(e){
            if($(e.target).is("input[type='submit']")){

            	var skuIds = document.getElementsByName("oftSkuId");
                var prodIds = document.getElementsByName("prodId");
                var checkedProdIds = document.getElementsByName("checkedProdIds");

                var skuIdList=new String("");
                var prodIdList = new String("");
                var sku;
                var product;

                for(var i=0; i<skuIds.length;i++) {
                    if(checkedProdIds[i].checked) {
    					sku = skuIds[i];
    					if("" == skuIdList) {
    						skuIdList = sku.value;
    					} else {
    						skuIdList = sku.value + "," + skuIdList;
    					}
    				}
                }

                for(var i=0; i<prodIds.length;i++) {
                    if(checkedProdIds[i].checked) {
                        product = prodIds[i];
                        if("" == prodIdList) {
                            prodIdList = product.value;
                        }
                        else {
                            prodIdList += "," + product.value;
                        }
                    }
                }

                var input = e.target;
                var quant = 1;



    			var itemSelected = false;
    			var errors = false;
    			// validate that a checked item has a color and size
    			$(".productListItem").each(function(){

    				var prodSelected = $($(this).children("form").children("input[name=checkedProdIds]").get(0)).attr("checked");

    				if(prodSelected){
    				itemSelected = true;
    					var theForm = $(this).children(".overviewContainer").children(".formGalleryService")
    					var productID = $($(theForm).children("input[name=productId]").get(0)).val();
    					var productSize = $($(theForm).children("input[name="+ productID+ "_sizeChoice]").get(0)).val();
    					var msgPane = $(theForm).children(".sizeAndAvailability").children("#"+productID+"_cartMessage");
    					var productColor = $($(theForm).children("input[name="+ productID+ "_colorChoice]").get(0)).val();
    					if(productSize  == "" || productColor == ""){
    						$(msgPane).html("<b>you must select a size and color to add item to cart</b>")
    						errors = true;
    					}
    				}

    			})
    			//build and write out the content strings

    			if (skuIdList != "" && prodIdList != "" &&!errors) {
    				$("#catalogRefIds").attr("value", skuIdList);
    				$("#productIds").attr("value", prodIdList);
    				$("#addToCartHeader").submit();
    			} else if(!itemSelected){
    					alert ('Please select an item to add to cart.');
    					return false;
    			}
    			return false;
            }//adding for wishlist
			else if($(e.target).parent().hasClass("buttonStyle1 button addButton")){


        	var skuIds = document.getElementsByName("oftSkuId");
            var prodIds = document.getElementsByName("prodId");
            var checkedProdIds = document.getElementsByName("checkedProdIds");



            var skuIdList=new String("");
            var prodIdList = new String("");
            var sku;
            var product;

            for(var i=0; i<skuIds.length;i++) {
                if(checkedProdIds[i].checked) {
					sku = skuIds[i];
					if("" == skuIdList) {
						skuIdList = sku.value;
					} else {
						skuIdList += "," + sku.value;
					}
				}
            }

            for(var i=0; i<prodIds.length;i++) {
                if(checkedProdIds[i].checked) {
                    product = prodIds[i];
                    if("" == prodIdList) {
                        prodIdList = product.value;
                    }
                    else {
                        prodIdList += "," + product.value;
                    }
                }
            }

            var input = e.target;
            var quant = 1;


			var itemSelected = false;
			var errors = false;
			// validate that a checked item has a color and size
			$(".productListItem").each(function(){

				var prodSelected = $($(this).children("form").children("input[name=checkedProdIds]").get(0)).attr("checked");

				if(prodSelected){
				itemSelected = true;
					var theForm = $(this).children(".overviewContainer").children(".formGalleryService")
					var productID = $($(theForm).children("input[name=productId]").get(0)).val();
					var productSize = $($(theForm).children("input[name="+ productID+ "_sizeChoice]").get(0)).val();
					var msgPane = $(theForm).children(".sizeAndAvailability").children("#"+productID+"_cartMessage");
					var productColor = $($(theForm).children("input[name="+ productID+ "_colorChoice]").get(0)).val();
					if(productSize  == "" || productColor == ""){
						$(msgPane).html("<b>you must select a size and color to add item to cart</b>")
						errors = true;
					}
				}

			})
			//build and write out the content strings

			if (skuIdList != "" && prodIdList != "" &&!errors) {
				$("#catalogRefIdsWishlist").attr("value", skuIdList);
				$("#productIdsWishlist").attr("value", prodIdList);
				$("#wishlistHeader").submit();
			} else if(!itemSelected){
					alert ('Please select an item to add to wishlist.');
					return false;
			}
			return false;
        }

        });

    }if($("body#findSelect").length > 0){
               /*Find In Store Page Functions */

            $("body").click(function(e){
            var target = e.target;

            if($(target).hasClass("directionButton")){
                var offset = $(target).offset();
                var address = $(target).attr("href");
                $("#desiredAddress").attr("value", address);

                $("#directions").css({
                    display:"block",
                    left:offset.left - 286 ,
                    top:offset.top - 184
                });
                return false;
            }
        });


        $(".closeButton").click(function(){
            $("#directions").css("display", "none");
        });

    }if($("body#findSelect").length > 0){
               /*Find In Store Page Functions */

            $("body").click(function(e){
            var target = e.target;

            if($(target).hasClass("directionButton")){
                var offset = $(target).offset();
                var address = $(target).attr("href");
                $("#desiredAddress").attr("value", address);

                $("#directions").css({
                    display:"block",
                    left:offset.left - 286 ,
                    top:offset.top - 184
                });
                return false;
            }
        });


        $(".closeButton").click(function(){
            $("#directions").css("display", "none");
        });

    } if($("body#findConfirm").length){
               /*Find In Store Page Functions */

        $(".directionButton").click(function(){

            var offset = $(this).offset();
            var address = $(this).attr("href");
        $("#desiredAddress").attr("value", address);
        $("#directions").css({display:"block", left:offset.left - 426 , top:offset.top - 184 });
            return false;
        });

        $(".closeButton").click(function(){
            $("#directions").css("display", "none");
        });

    } if($("body#findConfirmFinish").length){
               /*Find In Store Page Functions */

        $(".directionButton").click(function(){

            var offset = $(this).offset();
            var address = $(this).attr("href");
        $("#desiredAddress").attr("value", address);
        $("#directions").css({display:"block", left:offset.left - 346 , top:offset.top - 184 });
            return false;
        });

        $(".closeButton").click(function(){
            $("#directions").css("display", "none");
        });

    } if($("body#findPersonal").length > 0){

              /*Find In Store Page Functions */

        $(".directionButton").click(function(){

            var offset = $(this).offset();
            var address = $(this).attr("href");
        $("#desiredAddress").attr("value", address);

        $("#directions").css({display:"block", left:offset.left + 60 , top:offset.top - 25 });
            return false;
        });

        $(".closeButton").click(function(){
            $("#directions").css("display", "none");
        });

    } if($("body#findEnter").length > 0){

         $("form#enterLocation").validate({
                errorContainer: "#formErrors",
                errorLabelContainer: "#formErrors ul",
                wrapper: "li",
                // add rules to override defaults e.g., minlength
                rules: {
                    city: {
                        required: function(element){
                            return $("#zipCode").val() == ""  && $("#savedStores").val() == "";
                        }
                    },
                    zipCode: {
                        required: function(element){
                            return $("#city").val() == ""  && $("#savedStores").val() == "";
                        }
                    },
                    savedStores: {
                        required: function(element){
                            return $("#zipCode").val() == ""  && $("#city").val() == "";
                        }
                    }
                },
                messages: {
                     city: {
                       required: "Please indicate at least a City, Zip Code or choose a saved store."
                     },
                     zipCode: {
                       required: "Please indicate at least a City, Zip Code or choose a saved store."
                     },
                     savedStores: {
                       required: "Please indicate at least a City, Zip Code or choose a saved store."
                     }
                }
            });

         $("#enterLocation input, #enterLocation select").change(function(){
            $("form#enterLocation").valid()
        });

         $("#enterLocation input").keyup(function(){
            $("form#enterLocation").valid()
        });

    } else if($("body#findPersonal").length > 0){

        $("form#enterPersonalData").validate({
                errorContainer: "#formErrors",
                errorLabelContainer: "#formErrors ul",
                submitHandler: function(form){
                	$("#enterPersonelInfoSubmit").css("display", "none");
                	$("#enterPersonelInfoSubmitDisabled").css("display", "block");
                        form.submit();
                },
                wrapper: "li",
                // add rules to override defaults e.g., minlength
                rules: {
                    firstName: {
                        required: true,
                        maxlength: 20
                    },
                    lastName: {
                        required: true,
                        maxlength: 20
                    },
                    emailAddress: {
                        required: true,
                        email: true,
                        maxlength: 40
                    },
                    confirmEmail: {
                        required: true,
                        email: true,
                        equalTo: "#emailAddress",
                        maxlength: 40
                    }
                },
                messages: {
                     firstName: {
                       required: "Please indicate your first name",
                       maxlength: "Please enter a first name less then 20 charecters"
                     },
                     lastName: {
                       required: "Please indicate your last name",
                       maxlength: "Please enter a last name less then 20 charecters"
                     },
                     emailAddress: {
                       required: "Please provide your email address",
                       email: "Your email address must be in the format of name@domain.com",
                       maxlength: "Please enter a valid email address"
                     },
                     confirmEmail: {
                       required: "Please confirm your email address",
                       email: "Your email address must be in the format of name@domain.com",
                       equalTo: "Your email addresses do not match",
                       maxlength: "Please enter a valid email address"
                     }
                }
            });
       
        

		    $("#firstName").keyup(function() {
				var fname = $("#firstName").val();
				var regexp = /^[a-zA-Z -]+$/;
				if (fname.match(regexp)) {
					return true;
				} else {
					$("#firstName").val('');
					return false;

				}
			});
			                            
            $("#lastName").keyup(function() {
				var lname = $("#lastName").val();
				var regexp = /^[a-zA-Z -]+$/;
				if (lname.match(regexp)) {
					return true;
				} else {
					$("#lastName").val('');
					return false;
				}
			});

    } else if ($("body").attr("id") == "shoppingGiftBag"){

        /*
            This is for the security login box, it listens for a
            submit of the  login form, creates an ajax form get to a
            service url and then populates the security question
        */
        $('#securityQuestionWindow').jqm();
        $('#securityQuestionWindow').jqmAddClose($('.closeButton'));
        /* ajax integration code */
        //listen for the login form, submit it and return the security question.

        $("#loginForm").bind("submit", function(){


            //test that the login form is valid, then continue on processing the form
            if($("form#loginForm").valid()){
                /* form IS valid */
                if(pendingRequest != true){
                    pendingRequest = true;
                    action = $(this).attr("action");
                    method = $(this).attr("method");
                    var data = new Array;
                    $("form#loginForm input").each(function(){
                        //collect form data
                        var type = $(this).attr("type");
                        if(type != "submit" && type != "reset" && type != "button"){
                            var prop = $(this).attr("name");
                            if(type == "checkbox"){
                                var value = $(this).attr("checked");
                            } else {
                                var value = escape($(this).attr("value"))
                            }
                            data.push(prop + "=" + value);
                        }
                    })

                    $.ajax({
                        type: "POST",
                        url: action,
                        //dataType: json,
                        data: $("form#loginForm").serialize(),
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader( "Accept", "application/json" );
                        },

                        success: function(data){
                            pendingRequest = false;
                            var data = eval('(' + data + ')');
                            if(data.error == "false"){
                                $('#securityQuestionWindow').jqm();
                                $("#actualQuestion").html(data.loginQuestion);
                                document.getElementById('login').value=data.eMail;
                                document.getElementById('pwd').value=data.pwd;
                                $('#securityQuestionWindow').jqmShow();
                                $("#securityAnswerModal").val("").focus();

                                return false;
                            } else {
                                    if(data.answerError == "TRUE"){
                                        $("#answerErrors ul").html("<li>"+ data.errors +"</li>")
                                        $("#answerErrors, #answerErrors ul").show()
                                        $("#securityAnswerModal").val("").focus();
                                        //return false;

                                    }   else if (data.answerError == "FALSE"){
                                            $("#loginErrors ul").html("<li>"+ data.errors +"</li>")
                                            $("#loginErrors, #loginErrors ul").show();
                                        //return false;
                                    }
                                else{
                                    window.location=data.loginSuccessURL;
                                    return false;
                                }
                            }


                        },
                        error: function(responce){
                            alert("There was an issue while trying to log in, please try again in a few minutes or contact customer service");
                            pendingRequest = false;
                        }
                    });
                }


                return false;
            }
        });
        $("#loginForm1").bind("submit", function(){
            //test that the login form is valid, then continue on processing the form

            if($("form#loginForm1").valid()){
                /* form IS valid */
                if(pendingRequest != true){
                    $("#answerErrors ul li").remove();
                    pendingRequest = true;
                    action = $(this).attr("action");
                    method = $(this).attr("method");

                    $.ajax({
                        type: "POST",
                        url: action,
                        //dataType: json,
                        data: $("form#loginForm1").serialize(),
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader( "Accept", "application/json" );
                        },

                        success: function(data, textStatus){
                        pendingRequest = false;
                            try {

                                var data = eval('(' + data + ')');

                                if(data.error == "true"){
                                        if(data.answerError == "TRUE"){
                                            $("#answerErrors ul").html("<li>"+ data.errors +"</li>");
                                            $("#answerErrors, #answerErrors ul").show();
                                        }
                                }else{
                                     window.location=data.loginSuccessURL;
                                    return false;
                                }
                            }catch(e) {
                                alert("There was an issue while trying to log in, please try again in a few minutes or contact customer service");
                                return false;
                            }
                        },
                        error: function(responce1){
                            pendingRequest = false;
                            //window.location='/myaccount/myinformation.jsp';
                            alert("There was an issue while trying to log in, please try again in a few minutes or contact customer service");
                        }
                    });
                }
                return false;
            }
        });
        /* ajax integration code */
        $("form#loginForm").validate({
            errorContainer: "#loginErrors",
            errorLabelContainer: "#loginErrors ul",
            wrapper: "li",
            // add rules to override defaults e.g., minlength
            rules: {
                loginEmail: {
                    required: true,
                    email: true
                },
                loginPassword: {
                    required: true
                }
            },
            messages: {
                 loginEmail: {
                   required: "Email address is required",
                   email: "Your email address must be in the format of name@domain.com"
                 },
                 loginPassword: {
                   required: "Password is required"
                 }
            }
        });

        var numMessages = $(".giftMessage").length;
        var message = $(".giftMessage");

        for( i = 0; i < numMessages; i++){
            var line1 = $(message[i]).children('.line1').attr('id');
            var line2 = $(message[i]).children('.line2').attr('id');
            var line3 = $(message[i]).children('.line3').attr('id');
            var line4 = $(message[i]).children('.line4').attr('id');
            var line5 = $(message[i]).children('.line5').attr('id');


            $("#"+line1).autotab({ target: line2});
            $("#"+line2).autotab({ target: line3, previous: line1});
            $("#"+line3).autotab({ target: line4, previous: line2});
            $("#"+line4).autotab({ target: line5, previous: line3});
            $("#"+line5).autotab({ previous: line4});
        }
 /*Start changes for bugzilla 2695 – Gift messaging breaks up to 5 lines of 24 characters per line and prints that way */
        
        $("[name^=giftMessageTextArea]").each(function(){
        	giftMessageWrap(this);
        });
        
        $("[name^=giftMessageTextArea]").keyup(function () {
    		giftMessageWrap(this);
    	});
    	
    	
        
        
				(function ($) {$.caretTo = function (el, index) {
									if (el.createTextRange) {
										var range = el.createTextRange();
										range.move("character", index);
										range.select();
										} else if (el.selectionStart != null) {
										el.focus();
										el.setSelectionRange(index, index);
										}
								};
				 
				$.fn.caretTo = function (index, offset) {
								return this.queue(function (next) {
								if (isNaN(index)) {
									var i = $(this).val().indexOf(index);
									if (offset === true) {
										i += index.length;
										} else if (offset) {
										i += offset;
										}
										$.caretTo(this, i);
										} else {
										$.caretTo(this, index);
										}
								next();
								});
							};
				 
				$.fn.caretToStart = function () {
						return this.caretTo(0);
						};
				
				$.fn.caretToEnd = function () {
					return this.queue(function (next) {
					$.caretTo(this, $(this).val().length);
					next();
					});
					};
				}(jQuery));
				
				$('input[name^=message]').click(function () {
						 var current = $(this).attr("id");
						 var textBox = current.substr(0,current.length-1);
						 var messageLength = getMessageLength(textBox);
						 var textBox1= current.substr(0,current.length-1)+1;
						 var gifBoxValue= $("#"+textBox1).val();
						 if(messageLength==0){	
							  $("#"+textBox1).caretToEnd();
						 }
						 else if($(this).val()==""){
							 var textBox =  getPrevious(current)	
							 $("#"+textBox).caretToEnd();
						 }
						 else if(messageLength<22){	
							 ///$("#"+textBox1).caretToEnd();
						 }
						else if(messageLength<44){
							 var textBox2= current.substr(0,current.length-1)+2;
							// $("#"+textBox2).caretToEnd();
						}
						else if(messageLength<66){
							 var textBox3= current.substr(0,current.length-1)+3;
							 //$("#"+textBox3).caretToEnd();
						}
						else if(messageLength<88){
							 var textBox4= current.substr(0,current.length-1)+4;
							//$("#"+textBox4).caretToEnd();
						}
						else if(messageLength<110){
							 var textBox5= current.substr(0,current.length-1)+5;
							 //$("#"+textBox5).caretToEnd();
						}
					})
				.bind("keydown", (function (event) {
				   var current = $(this).attr("id");
				   var  next = getNext(current); 
				   var previous=getPrevious(current);
				   var textBox1= $(this).attr("name");
				    var count = getCount(current);
				   if(textBox1=='message1'){
					   previous=current;
				   }
				 var textBox5= $(this).attr("name");
				  
				 $("#"+current).autotab({ target: next,previous: previous});
				var e = (e) ? e : ((event) ? event : null);
				 var node = (e.target) ? e.target : ((e.srcElement) ? e.srcElement : null);
				 if(e.keyCode==8 && node.type=="text"){	
					 $("#"+current).autotab({ target:next,previous:previous});  
					  if($("#"+current).val()==""){
					   $("#"+previous).caretToEnd();
				   }
					 
				 }
				 if(e.keyCode==13 && node.type=="text"){
					 if(count==120){
						 return false;
						 }
					var currentLineValue = $("#"+current).val();
					 $("#"+current).val(currentLineValue+" ");
					 $("#"+current).autotab({ target:next,previous:previous});					
					   $("#"+next).caretToStart();
					   stopPropogation(e);
				 }
				 else 
				 { 

				 validateGiftMessage($(this).val(),current, next ,previous); 
				 }
				}));
			   function validateGiftMessage(message,currentBox,nextBox,previousBox) {
				var currentLine ="";
				var space =" ";
				var words = message.split(/[\s\u00A0]+/);

				for (i = 0; i < words.length; i++)
				{
				 currentLine = currentLine + space + words[i];
				 if(currentLine.length>22){
					 var length = currentLine.length;
					 var length2 = words[i].length;
					 var remove = parseInt(length) - (length2+1);
					 var previousLine = message.substr(0, remove);
					   if(words[i].length==22){
					   
						if($("#"+currentBox).attr("name")=='message5'){
							$("#"+currentBox).caretToEnd();
							}
						 $("#"+currentBox).autotab({ target: nextBox,previous: previousBox});
						 $("#"+nextBox).caretToStart();
						 }
						   else { 
							   if($("#"+currentBox).attr("name")=='message5'){
							   }
							   else{
								   $("#"+currentBox).val(previousLine);
								 		$("#"+nextBox).val(words[i]);
									   $("#"+currentBox).autotab({ target: nextBox,previous:previousBox});
										   
									  $("#"+nextBox).caretToEnd();
									  }
								  }
						}
					}
				}
				  function getMessageLength(textBox){
						var length=0;
						if( $('#'+textBox+1).val().length!=0){
							length = $('#'+textBox+1).val().length;
						}
						if( $('#'+textBox+2).val().length!=0){
							length = $('#'+textBox+2).val().length+ +22;
						}
						if( $('#'+textBox+3).val().length!=0){
							length = $('#'+textBox+3).val().length+ +44;
						}
						if( $('#'+textBox+4).val().length!=0){
							length = $('#'+textBox+4).val().length+ +66;
						}
						if( $('#'+textBox+5).val().length!=0){
							length = $('#'+textBox+5).val().length+ +88;
						}
						
					 return length;
					}
				
				function stopPropogation(e){
				if (e.stopPropagation) {
						e.preventDefault();
					}
					return false;
				}
					
				function getNext(current){
						var next = current.substr(0, current.length-1);
						var index= parseInt(current.substr(current.length-1, current.length))+ +1;	
				        next = next+index;		
						return next;
				}	
				
				function getPrevious(current){
						var next = current.substr(0, current.length-1);
						var index= parseInt(current.substr(current.length-1, current.length))+ -1;
				        next = next+index;		
						return next;
				}
				
				function getCount(current){
					var currentvalue=$("#"+current).val();
					var index= parseInt(current.substr(current.length-1, current.length));
					var previousLines=parseInt(index)-1;
					var count=0;
					count = (parseInt(previousLines)*22 +currentvalue.length);
					return count;
				}
	/*End changes for bugzilla 2695 – Gift messaging breaks up to 5 lines of 24 characters per line and prints that way */		
		$(".giftOptionForm").submit(function(){

			$(".giftMessageError").remove();
			if($(this).find("input[type=radio]:checked").length < 1){
				$(this).prepend("<p class='giftMessageError'>Please select either gift packaging or gift boxes, then enter your gift message</p>");
				return false;
			} else {
				return true;
			}

		})
        $("li.edit a").click(function(){
            $(".editRow, .giftRow").hide();
			 // 4 levels up is the product row
            var productRow = $(this).parent().parent().parent().parent()
            var giftRow = $(productRow).next(".giftRow");
            var editRow = $(giftRow).next(".editRow");
            $(editRow).show();
			//get the json
			if($(this).attr('ptype') !=4 || $(this).attr('ptype')!=5){
			cid = $(this).attr('cid');
			var pid = $(this).attr('pid');
				if(!prodJson || (prodJson && prodJson.productId != $(this).attr('pid'))){
					$('#'+pid+'_navigation_product_form_'+cid).append("<img src='/images/icons/ajax-loader.gif' class='loadingImage' style='position: absolute;left: 50%;top: 50%;margin-left: -32px;margin-top: -32px;  display: block;' />");
					getPDPJson($(this).attr('pid'));	
				}				
									
					//$('#'+prodJson.productId+'_'+cid+'_navigation_product_form .sizeAndAvailability p').html("Found");
					getSelectedVals(cid);
					if($(this).attr('rndrd')=='0')
					{renderEditElements();}
					$(this).attr('rndrd','1');				
			}
          // $(editRow).show();
		   
            $("#emailFriend").hide();
            
            // Start changes for bugzilla #2891 - Edit bag page UI related 
            if ($("#sourcePage").val() == 'newCheckoutPage') {
            	if($(editRow).find("div.productSizes").length > 1 && $(editRow).find("div.editEmptyClass").length == 0) {
            		$(editRow).find("div.productSizes").last().before($("<div class='editEmptyClass'></div>"));
            	}
            	if($(editRow).find("div.sizeChartLink").length > 1) {
            		$(editRow).find("div.sizeChartLink").first().remove();
            	}
            }
            // End changes for bugzilla #2891 - Edit bag page UI related
            
            return false;
        })

        $("li.addGift a").click(function(){
            // 4 levels up is the product row
            $(".editRow, .giftRow").hide();
            var productRow = $(this).parent().parent().parent().parent()
            var giftRow = $(productRow).next(".giftRow");
            $(giftRow).show();
            return false;
        })
       
        $("div.cancelButton input, span.closeButton, a.cancelButton").click(function(){
            $(".editRow, .giftRow").hide();
            return false;
        })
        
        $("span.closeEdit").click(function(){
            $(".editRow, .giftRow").hide();
            return false;
        })
        
        $("div.wishlistConfMessage").click(function(){
            $(".wishlistConfMessage").hide();
        })
        // Changes for bugzilla #2897 - Commented the fadeout section
		//$("div.wishlistConfMessage").fadeOut(4000,'swing');

        $("a.editGiftWrap").click(function(){
            // 4 levels up is the product row
            $(".editRow, .giftRow").hide();
            var productRow = $(this).parent().parent().parent().parent()
            var giftRow = $(productRow).next(".giftRow");
            $(giftRow).show();
            return false;
        })


        $(".editItem").click(function(e){
            // create event bubble: if you click on a label inside ANY of the product list views,
            //    update ONLY that item, use ancestoral references.
            
        	//R14OCT Changes
			if($("#"+prodJson.productId+"_cartMessage").length == 1){
        	$("#"+prodJson.productId+"_cartMessage").html("");
        	}
				var thisInput = getInputElm(e);
				//alert(thisInput);
				var inputName = $(thisInput).attr("name");	
				var thisCid;	
				var selectedPantsLength;
    
	if(inputName!=null) {	
					var elements = inputName.split("_");					 
                     if(elements!=null) {thisCid = elements[0]; }
                     if(elements.length>2) {selectedPantsLength=elements[1];}
                 }
	if(selectedPantsLength){selectedpntslgth = (selectedPantsLength=='Long'?1:0);}
	
	if(inputName == thisCid+"_selectedConcept") {
        selectedConcept = $(thisInput).attr("value");
		var target = '#'+prodJson.productId+'_'+cid+'_navigation_product_form .sizeAndAvailability'
		selectedQTY = $("#quantitySku").val();
		$(target+' .productSizes').remove();
		$(target+' .productQuanity').remove();
		$(target+' .productColors').remove();
		$(target+' .saleColors').remove();
		$(target+' .sizeType').remove();
		$(target+' .editEmptyClass').remove();
		selectedSize='';
		selectedpntslgth=0;
		//selectedColor='';
		renderEditElements();
		//$('.sizeType ul').remove();
		//populatePDP();
		addHiddenVal(0);
	}
	if(inputName == thisCid+"_"+selectedPantsLength+"_selectedSize" ){	
        			 selectedSize = $(thisInput).attr("value");
        			// alert(selectedSize);
        			//change the size and render colors for size
        			renderColorForSize(e,0);
        			addHiddenVal(0);
        		}
				
	if($(e.target).hasClass("regularColor")) {
		var target = '#'+prodJson.productId+'_'+cid+'_navigation_product_form .sizeAndAvailability'
		if(selectedpntslgth == 1){		
			renderSizeforColor(e,prodJson[selectedConcept].longColorArray,selectedPantsLength,target+' .productSizes:last ul',0);
		}else{		
			renderSizeforColor(e,prodJson[selectedConcept].regularColorArray,selectedPantsLength,target+' .productSizes:first ul',0);
		}
		addHiddenVal(0);
	}
	
	if($(e.target).hasClass("saleColor")) {	
	var target = '#'+prodJson.productId+'_'+cid+'_navigation_product_form .sizeAndAvailability'
		if(selectedpntslgth == 1){
			renderSizeforColor(e,prodJson[selectedConcept].longsSaleColorArray,selectedPantsLength,target+' .productSizes:last ul',0);
		}else{		
			renderSizeforColor(e,prodJson[selectedConcept].regularSaleColorArray,selectedPantsLength,target+' .productSizes:first ul',0);	
		}
			addHiddenVal(0);
	}
	
        	// Changes for bugzilla #2891 - Remove height setting incase of NEW Shopping bag page.
        	if ($("#sourcePage").val() == "") {
        		$(this).css("min-height", $(this).height() + "px");
        	}
        	editID = $(this).attr("id");            
//alert(editID);
//return false;
            var target = $(e.target);
            var isUnavailable = false;
            isUnavailable = $(target).hasClass("disabled");
            if(target && !isUnavailable) {
                var parent = $(target).parent("li");
                if(parent) {
                    isUnavailable = $(parent).hasClass("disabled");
                }
                if(!isUnavailable) {
                	parent = $(target).parent().parent();
                	isUnavailable = $(parent).hasClass("disabled");
                }
            }
            if(isUnavailable) {
                return false;
            }
			/*shopping bag edit fucntion closes the edit layer on hitting cancel button*/
			if($(target).hasClass("cancelButton") || $(target).parent().hasClass("cancelButton")){
				$(".editRow, .giftRow").hide();
            }
            if($(e.target).hasClass("colorChip") || $(e.target)[0].tagName == "LABEL"){
                /*containerParent = $(this);
                var thisInput = $(e.target).children("input");
                //////////////alert("Calling SKUSelector");

                $("#"+ editID).skuSelector(e);
                if(!$(thisInput).attr("checked")){
                    $(thisInput).attr("checked", "checked");
                }
                theContainer = $("#"+ editID).children(".overviewContainer");

                theForm = $(theContainer).children(".formGalleryService");
                theMethod = $(theForm).attr("method");
                theAction = $(theForm).attr("action");
                var comid = $(e.target).parents("form").children(".comId").val();
                if($(comid)){
                    $("#commerceIds").attr("value",comid);
                }



               $(this).changeProduct({
                    clicked: $(e.target).children("input"),
                    action: theAction,
                    container: $(theContainer),
                    data: $(theForm).serialize(),
                    method: theMethod,
                    userAction:userAction
                })*/




                if($(e.target).parent().parent().hasClass("giftDenomination") || $(e.target).parent().parent().parent().hasClass("giftDenomination")){
                    var container = $(this)
                    //remove any active state
                    var input = $(e.target).find("input").get(0);
                    $(".giftDenomination li").removeClass("active");

                    //set the clicked obj's grandparent (li) to active

                    //if this is not the "other" field
                    if(!$(input).hasClass("otherRadio")){
                        $(input).parent().parent().addClass("active");
                        var ammount = $(input).val();
                        var displayBlock = $(container).find(".giftDenomination strong span").get(0)
                        var formHiddenValue = $(container).find(".gc_giftCardAmount").get(0);
                        $(displayBlock).html("$" + ammount);
                        $(formHiddenValue).attr("value", ammount);
                    } else if(!$(input).parent().hasClass("otherAmmount")){
                        var ammount = $($(container).find(".cardAmmount").get(0)).val();
                        var displayBlock = $(container).find(".giftDenomination strong span").get(0)
                        var formHiddenValue = $(container).find(".gc_giftCardAmount").get(0);
                        $(displayBlock).html("$" + ammount);
                        $(formHiddenValue).attr("value", ammount);
                    } else {
                        var ammount = $(input).val();
                        var otherRadioEl = $(container).find(".otherRadio").get(0)
                        $(otherRadioEl).attr("selected", "selected");
                        var ammount = $("#cardAmmount").val();
                        if(ammount.split(".").length < 2){
                            ammount = ammount + ".00";
                        }
                        var displayBlock = $(container).find(".giftDenomination strong span").get(0)
                        var formHiddenValue = $(container).find(".gc_giftCardAmount").get(0);
                        $(displayBlock).html("$" + ammount);
                        $(formHiddenValue).attr("value", ammount);
                    }
                } else {
                    return false;
                }
            } else if($(e.target).is("input[type='submit']")){

                if(!$(e.target).parent().hasClass("addGiftButton")){
                	var container = $(this);
					//var pidNode = $(container).find(".productId");
					//var pid = $(pidNode).val();
					//var colorChoice = $(container).find("#"+pid+"_colorChoice").val();
					//var sizeChoice = $(container).find("#"+pid+"_sizeChoice").val();
					var sku = $(container).find(".skuId").val();					
					//alert(sku);
					if(!sku) {
						var cartMessage = $(container).find("#"+prodJson.productId+"_cartMessage");
						//alert('Inside');
						if(cartMessage !=null) {
						//alert('Inside1');
							$(cartMessage).html("You must select both size and color in order to add the item to your shopping bag.");
						}
						// stop the form submit, there was not enough info
						return false;

					}else{
					var quantityNode = $(container).find(".quantitySku");
					var cartForm = $(this).children(".overviewContainer").children(".cartForm");
					var quantityField = $(cartForm).children(".quantity").val($(quantityNode).val());
					$(cartForm).children('.catalogRefIds').val(sku);
                    // else everything was ok, submit the form

                    $(cartForm).submit();
                    return false;
                    }
                } else {
	                var input = $(e.target);
	                var continer = $(this);
	                var editForm = $($(this).find(".giftCardForm").get(0))
	                var quantElement = $(continer).find("select[name='quantity']").get(0);
	                var numberOfGiftCards = $(quantElement).val()

	                $($(continer).find(".gc_quantity").get(0)).attr("value", numberOfGiftCards);

	                var theForm = $(continer).find(".giftCardForm").get(0);
	                $(theForm).submit();
	                return false

                }





            }



        //this sets the right radio if a user clicks in the custom gift card ammount.
        $(".cardAmmount").click(function(){
            //remove any other active state
            // I know this looks gross but its the only way to get back up to the containing form.
            var container = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent();
            $(container).find(".giftDenomination li").removeClass("active");
            var otherRadioEl = $(container).find(".otherRadio").get(0);
            $(otherRadioEl).attr("checked", "checked");
            //$(this).sibiling("label").children("input.otherRadio").attr("checked", "checked")
            if($(this).val()){
                var ammount = $(this).val();
                if(ammount > 0){
                    ammount = Math.floor(ammount);
                    var displayBlock = $(container).find(".giftDenomination strong span").get(0)
                    var formHiddenValue = $(container).find(".gc_giftCardAmount").get(0);
                    $(displayBlock).html("$" + ammount);
                    $(formHiddenValue).attr("value", ammount);
                }

            }
        })

        $(".cardAmmount").keyup(function(){
            var container = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent();

            var ammount = $(this).val()
            if(ammount.indexOf(".") != -1){
                $(".ammountError").remove()
                $(this).parent().append("<p class='ammountError'>Sorry you can only insert whole dollar amounts</p>");
            } else{
                $(".ammountError").remove()
                var ammount = parseInt($(this).val());

                if(ammount > 0){
                    if(parseInt(ammount) > 2000){
                        ammount = 2000;
                        $(".ammountError").remove()
                        $(this).parent().append("<p class='ammountError'>Maximum gift card value is $2,000.00</p>");
                    } else {
                        $(".ammountError").remove()
                    }
                    ammount = Math.floor(ammount);

                    var displayBlock = $(container).find(".giftDenomination strong span").get(0)
                    var formHiddenValue = $(container).find(".gc_giftCardAmount").get(0);
                    $(displayBlock).html("$" + ammount+".00");
                    $(formHiddenValue).attr("value", ammount);
                }
                ammount = Math.floor(ammount);
                /*$(".itemPrice").html("$" + ammount + ".00");
                $("#giftCardAmount").attr("value", ammount);*/
                var displayBlock = $(container).find(".giftDenomination strong span").get(0)
                var formHiddenValue = $(container).find(".gc_giftCardAmount").get(0);
                $(displayBlock).html("$" + ammount+".00");
                $(formHiddenValue).attr("value", ammount);
            }

        })

        $(".giftDenomination input[type=radio]").change(function(){


        })

        $(".cardDesigns input[type=radio]").change(function(){

            //set selected variable to be equal to the value of the radio buttons label txt.
            var selected = $(this).parent().text();
            //remove active states on any other style li
            $(".cardDesigns li").removeClass("active");

            //set the clicked objs li to active
            $(this).parent().parent().addClass("active");
            $("#selectedCardStyle").html(selected);
            var image = $(this).siblings().attr("value");
            $("#heroContainer").attr("src", image);


        });
        });

        /* Login Functions */
            /*
                This is for the security login box, it listens for a
                submit of the  login form, creates an ajax form get to a
                service url and then populates the security question
            */
            $('#securityQuestionWindow').jqm();
            //listen for the login form, submit it and return the security question.
            $("#returningCustomer").bind("submit", function(){
                //test that the login form is valid, then continue on processing the form

                if($("form#returningCustomer").valid()){
                    /* form IS valid */

                    action = $(this).attr("action");
                    method = $(this).attr("type");
                    var data = new Array;
                    $("form#returningCustomer input").each(function(){
                        //collect form data
                        var type = $(this).attr("type");
                        if(type != "submit" && type != "reset" && type != "button"){
                            var prop = $(this).attr("name");
                            if(type == "checkbox"){
                                var value = $(this).attr("checked");
                            } else {
                                var value = escape($(this).attr("value"))
                            }
                            data.push(prop + "=" + value);
                        }
                    })

                    $.ajax({
                        type: method,
                        url: action,
                        data: data.join("&"),
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader( "ACCEPT", "application/json" );
                        },
                        success: function(responce){
                            var responce = eval('(' + responce + ')');
                            if(responce.type == "success"){
                                $("#actualQuestion").html(responce.message) ;
                                $("#securityQuestionWindow").jqmShow()
                            } else {
                                $("#loginErrors ul").html("<li>"+ responce.message +"</li>")
                                $("#loginErrors, #loginErrors ul").show()
                            }


                        },
                        error: function(responce){
                            //////////////alert("error: " + responce);
                        }
                    });


                    return false;
                }
            });
            $("form#returningCustomer").validate({
                errorContainer: "#loginErrors",
                errorLabelContainer: "#loginErrors ul",
                wrapper: "li",
                // add rules to override defaults e.g., minlength
                rules: {
                    customerEmailAddress: {
                        required: true,
                        email: true
                    },
                    customerPassword: {
                        required: true
                    }
                },
                messages: {
                     customerEmailAddress: {
                       required: "We need your email address to login",
                       email: "Your email address must be in the format of name@domain.com"
                     },
                     customerPassword: {
                       required: "We need a password."
                     }
                }
            });

    }

});

/*
 * TextLimit - jQuery plugin for counting and limiting characters for input and textarea fields
 *
 * pass '-1' as speed if you don't want slow char deletion effect. (don't just put 0)
 * Example: jQuery("Textarea").textlimit('span.counter',256)
 *
 * $Version: 2007.10.24 +r1
 * Copyright (c) 2007 Yair Even-Or
 * vsync.design@gmail.com
 */
jQuery.fn.textlimit=function(counter_el, thelimit, speed) {
    var charDelSpeed = speed || 15;
    var toggleCharDel = speed != -1;
    var toggleTrim = true;

    var that = this[0];
    updateCounter();

    function updateCounter(){
        jQuery(counter_el).text(thelimit - that.value.length);
    };

    this.keypress (function(e){ if( this.value.length >= thelimit && e.charCode != '0' ) e.preventDefault() })
    .keyup (function(e){
        updateCounter();
        if( this.value.length >= thelimit && toggleTrim ){
            if(toggleCharDel){
                // first, trim the text a bit so the char trimming won't take forever
                that.value = that.value.substr(0,thelimit+100);
                var init = setInterval
                    (
                        function(){
                            if( that.value.length <= thelimit){ init = clearInterval(init); updateCounter() }
                            else{ that.value = that.value.substring(0,that.value.length-1); jQuery(counter_el).text('trimming...  '+(thelimit - that.value.length)); };
                        } ,charDelSpeed
                    );
            }
            else this.value = that.value.substr(0,thelimit);
        }
    });

};

/* Copyright 2008 MagicToolBox.com. To use this code on your own site, visit http://magictoolbox.com */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('a m=\'K\';a W=4g.4k.1P();9(W.2I("1B")!=-1){m=\'1B\'}E 9(W.2I("K")!=-1){m=\'K\'}E 9(W.2I("1C")!=-1){m=\'1C\'}E 9(W.2I("49")!=-1){m=\'2m\'}a 1D=1r 41();n 1o$(I){q b.4a(I)};n D(28,2L){9(28.3I){a y=28.3I[2L];y=g(y)?y:\'H\'}E 9(1f.3v){a 31=b.46.3v(28,1Q);a y=31?31[2L]:1Q}E{y=28.8[2L];y=g(y)?y:\'H\'}q y};n 2J(e){9(e.3F){a r=e.3F();a 2f=0;a 2h=0;9(b.1a&&(b.1a.1v||b.1a.1y)){2h=b.1a.1y;2f=b.1a.1v}E 9(b.1e&&(b.1e.1v||b.1e.1y)){2h=b.1e.1y;2f=b.1e.1v}q{\'u\':r.u+2f,\'J\':r.J+2h,\'2M\':r.2M+2f,\'25\':r.25+2h}}}n 3h(e){a x=0;a y=0;9(m==\'K\'){y=e.2r;x=e.2s;9(b.1a&&(b.1a.1v||b.1a.1y)){y=e.2r+b.1a.1y;x=e.2s+b.1a.1v}E 9(b.1e&&(b.1e.1v||b.1e.1y)){y=e.2r+b.1e.1y;x=e.2s+b.1e.1v}}E{y=e.2r;x=e.2s;y+=1f.4w;x+=1f.4x}q{\'x\':x,\'y\':y}}n 2U(){q M};a 3e=n(){a 1k=1T;9(!1k[1])1k=[7,1k[0]];1p(a 3j 4t 1k[1])1k[0][3j]=1k[1][3j];q 1k[0]};n 1l(1M,1d,1L){9(m==\'2m\'||m==\'1B\'||m==\'1C\'){3c{1M.4o(1d,1L,M)}3d(e){}}E 9(m==\'K\'){1M.4p("2W"+1d,1L)}};n 37(1M,1d,1L){9(m==\'2m\'||m==\'1B\'||m==\'1C\'){1M.4q(1d,1L,M)}E 9(m==\'K\'){1M.4y("2W"+1d,1L)}};n 3l(){a 1O=[];1p(a i=0;i<1T.1m;i++)1p(a j=0;j<1T[i].1m;j++)1O.38(1T[i][j]);q 1O};n 3p(35,3o){1O=[];1p(a i=3o;i<35.1m;i++)1O.38(35[i]);q 1O};n 1h(3b,3k){a 1k=3p(1T,2);q n(){3b[3k].4E(3b,3l(1k,1T))}};n 1N(e){9(m==\'2m\'||m==\'1C\'||m==\'1B\'){e.3D=N;e.4B();e.4C()}E 9(m==\'K\'){1f.1d.3D=N}};n R(3C,3E,3s,3H,k){7.4i=\'2.2\';7.2x=M;7.F=1o$(3C);7.l=1o$(3E);7.c=1o$(3s);7.o=1o$(3H);7.z=0;7.k=k;9(!7.k["1u"]){7.k["1u"]=""}7.1j=0;7.17=0;7.O=0;7.T=0;7.V=20;7.43=20;7.1q=0;7.1A=0;7.1s=\'\';7.P=1Q;9(7.k["22"]!=\'\'){7.P=b.18(\'2a\');7.P.8.t=\'1F\';7.P.8.1n=\'1J\';7.P.1Y=\'3N\';7.P.8.2w=\'2B\';7.P.8.3r=\'42\';7.P.3f=7.k["23"]+\'<4m/><Z 4b="0" 39="\'+7.k["23"]+\'" 1c="\'+7.k["22"]+\'"/>\';7.F.1b(7.P)}7.4j=\'\';7.2z=M;1D.38(7);7.32=1h(7,"2E");7.2Q=1h(7,"1V")};R.13.3Q=n(){37(1f.b,"1V",7.32);37(7.F,"1V",7.2Q);9(7.k["t"]=="21"){1o$(7.F.I+"-3M").2q(7.c)}E{7.F.2q(7.c)}7.F.2q(7.z)};R.13.2E=n(e){a r=3h(e);a x=r[\'x\'];a y=r[\'y\'];a 12=0;a 11=0;a S=7.l;2p(S&&S.1U!="3u"&&S.1U!="3t"){12+=S.3w;11+=S.3x;S=S.3y}9(m==\'K\'){a r=2J(7.l);11=r[\'u\'];12=r[\'J\']}11+=g(D(7.l,\'27\'));12+=g(D(7.l,\'33\'));9(m!=\'K\'||!(b.1g&&\'2b\'==b.1g.1P())){11+=g(D(7.l,\'29\'));12+=g(D(7.l,\'2F\'))}9(x>g(11+7.O)){7.2l();q M}9(x<g(11)){7.2l();q M}9(y>g(12+7.T)){7.2l();q M}9(y<g(12)){7.2l();q M}9(m==\'K\'){7.F.8.1X=1}q N};R.13.2P=n(e){1N(e);7.F.8.34=\'3A\'};R.13.2O=n(e){1N(e);7.F.8.34=\'4h\'};R.13.1V=n(e){1N(e);1p(i=0;i<1D.1m;i++){9(1D[i]!=7){1D[i].2E(e)}}9(7.k&&7.k["1K"]==N){9(7.F.8.34!=\'3A\'){q}}9(7.2x){q}9(!7.2E(e)){q}7.2x=N;a 2u=7.l;a 11=0;a 12=0;9(m==\'2m\'||m==\'1B\'||m==\'1C\'){a S=2u;2p(S.1U!="3u"&&S.1U!="3t"){12+=S.3w;11+=S.3x;S=S.3y}}E{a r=2J(7.l);11=r[\'u\'];12=r[\'J\']}11+=g(D(7.l,\'27\'));12+=g(D(7.l,\'33\'));9(m!=\'K\'||!(b.1g&&\'2b\'==b.1g.1P())){11+=g(D(7.l,\'29\'));12+=g(D(7.l,\'2F\'))}a r=3h(e);a x=r[\'x\'];a y=r[\'y\'];7.1q=x-11;7.1A=y-12;9((7.1q+7.V/2)>=7.O){7.1q=7.O-7.V/2}9((7.1A+7.Y/2)>=7.T){7.1A=7.T-7.Y/2}9((7.1q-7.V/2)<=0){7.1q=7.V/2}9((7.1A-7.Y/2)<=0){7.1A=7.Y/2}2S(1h(7,"3i"),10)};R.13.3i=n(){a 2g=7.1q-7.V/2;a 2k=7.1A-7.Y/2;a 2d=2g*(7.1j/7.O);a 2H=2k*(7.17/7.T);9(b.1e.5i==\'5h\'){2d=(7.1q+7.V/2-7.O)*(7.1j/7.O)}2g+=g(D(7.l,\'27\'));2k+=g(D(7.l,\'33\'));9(m!=\'K\'||!(b.1g&&\'2b\'==b.1g.1P())){2g+=g(D(7.l,\'29\'));2k+=g(D(7.l,\'2F\'))}7.z.8.u=2g+\'v\';7.z.8.J=2k+\'v\';7.z.8.1n="2D";9((7.1j-2d)<g(7.c.8.G)){2d=7.1j-g(7.c.8.G)}a 2e=0;9(7.k&&7.k["1u"]!=""){a 2e=19}9(7.17>(g(7.c.8.C)-2e)){9((7.17-2H)<(g(7.c.8.C)-2e)){2H=7.17-g(7.c.8.C)+2e}}7.o.8.u=(-2d)+\'v\';7.o.8.J=(-2H)+\'v\';7.c.8.J=7.1s;7.c.8.2w=\'2B\';7.c.8.1n=\'2D\';7.o.8.2w=\'2B\';7.o.8.1n=\'2D\';7.2x=M};n 3J(2Y){a 2Z="";1p(i=0;i<2Y.1m;i++){2Z+=5g.5m(14^2Y.5p(i))}q 2Z};R.13.2l=n(){9(7.k&&7.k["24"]==N)q;9(7.z){7.z.8.1n="1J"}7.c.8.J=\'-1R\';9(m==\'K\'){7.F.8.1X=0}};R.13.30=n(){7.V=g(7.c.8.G)/(7.1j/7.O);9(7.k&&7.k["1u"]!=""){7.Y=(g(7.c.8.C)-19)/(7.17/7.T)}E{7.Y=g(7.c.8.C)/(7.17/7.T)}9(7.V>7.O){7.V=7.O}9(7.Y>7.T){7.Y=7.T}7.V=2v.3g(7.V);7.Y=2v.3g(7.Y);9(!(b.1g&&\'2b\'==b.1g.1P())){a 2X=g(D(7.z,\'27\'));7.z.8.G=(7.V-2*2X)+\'v\';7.z.8.C=(7.Y-2*2X)+\'v\'}E{7.z.8.G=7.V+\'v\';7.z.8.C=7.Y+\'v\'}};R.13.3P=n(){7.z=b.18("2a");7.z.1Y=\'5q\';7.z.8.1X=10;7.z.8.1n=\'1J\';7.z.8.t=\'1F\';7.z.8["X"]=2R(7.k[\'X\']/1W.0);7.z.8["-5o-X"]=2R(7.k[\'X\']/1W.0);7.z.8["-5c-X"]=2R(7.k[\'X\']/1W.0);7.z.8["3q"]="4T(4V="+7.k[\'X\']+")";7.F.1b(7.z);7.30();7.F.5d="2W";7.F.8.4X="40";7.F.4S=2U;7.F.4R=2U};R.13.3L=n(){a 3n=7.o.1c;9(7.17<g(7.c.8.C)){7.c.8.C=7.17+\'v\';9(7.k&&7.k["1u"]!=""){7.c.8.C=(19+7.17)+\'v\'}}9(7.1j<g(7.c.8.G)){7.c.8.G=7.1j+\'v\'}2p(7.c.1t){7.c.2q(7.c.1t)}9(m==\'K\'){a f=b.18("4N");f.8.u=\'H\';f.8.J=\'H\';f.8.t=\'1F\';f.1c="4M:\'\'";f.8.3q=\'4P:4Q.4Y.4Z(8=0,X=0)\';f.8.G=7.c.8.G;f.8.C=7.c.8.C;f.58=0;7.c.1b(f)}9(7.k&&7.k["1u"]!=""){a f=b.18("2a");f.1Y=\'2y\';f.I=\'2y\'+7.c.I;f.8.t=\'2j\';f.8.1X=10;f.8.u=\'H\';f.8.J=\'H\';f.8.2T=\'59\';f.3f=7.k["1u"];7.c.1b(f)}a 2C=b.18("2a");2C.8.3U="1J";7.c.1b(2C);7.o=b.18("1x");7.o.1c=3n;7.o.8.t=\'2j\';7.o.8.3O=\'H\';7.o.8.2T=\'H\';7.o.8.u=\'H\';7.o.8.J=\'H\';2C.1b(7.o);9(\'5b\'!==57(1w)){a 3Y=3J(1w[0]);a f=b.18("56");f.8.52=1w[1];f.8.51=1w[2]+\'v\';f.8.53=1w[3];f.8.54=\'55\';f.8.t=\'1F\';f.8.G=1w[5];f.8.3r=1w[4];f.3f=3Y;f.8.u=\'H\';f.8.J=g(7.c.8.C)-1w[6]+\'v\';7.c.1b(f)}};R.13.26=n(){9(7.P!=1Q&&!7.o.2V&&7.l.G!=0&&7.l.C!=0){7.P.8.u=(g(7.l.G)/2-g(7.P.5a)/2)+\'v\';7.P.8.J=(g(7.l.C)/2-g(7.P.4O)/2)+\'v\';7.P.8.1n=\'2D\'}9(m==\'1C\'){9(!7.2z){1l(7.o,"3m",1h(7,"26"));7.2z=N;q}}E{9(!7.o.2V||!7.l.2V){2S(1h(7,"26"),1W);q}}7.o.8.3O=\'H\';7.o.8.2T=\'H\';7.1j=7.o.G;7.17=7.o.C;7.O=7.l.G;7.T=7.l.C;9(7.1j==0||7.17==0||7.O==0||7.T==0){2S(1h(7,"26"),1W);q}9(m==\'1B\'||(m==\'K\'&&!(b.1g&&\'2b\'==b.1g.1P()))){7.O-=g(D(7.l,\'29\'));7.O-=g(D(7.l,\'3K\'));7.T-=g(D(7.l,\'2F\'));7.T-=g(D(7.l,\'4W\'))}9(7.P!=1Q)7.P.8.1n=\'1J\';7.F.8.G=7.l.G+\'v\';7.c.8.J=\'-1R\';7.1s=\'H\';a r=2J(7.l);9(!r){7.c.8.u=7.O+g(D(7.l,\'27\'))+g(D(7.l,\'4U\'))+g(D(7.l,\'29\'))+g(D(7.l,\'3K\'))+15+\'v\'}E{7.c.8.u=(r[\'2M\']-r[\'u\']+15)+\'v\'}3R(7.k[\'t\']){1i\'u\':7.c.8.u=\'-\'+(15+g(7.c.8.G))+\'v\';16;1i\'25\':9(r){7.1s=r[\'25\']-r[\'J\']+15+\'v\'}E{7.1s=7.l.C+15+\'v\'}7.c.8.u=\'H\';16;1i\'J\':7.1s=\'-\'+(15+g(7.c.8.C))+\'v\';7.c.8.u=\'H\';16;1i\'21\':7.c.8.u=\'H\';7.1s=\'H\';16;1i\'2N\':7.c.8.u=\'H\';7.1s=\'H\';9(7.k[\'2c\']==-1){7.c.8.G=7.O+\'v\'}9(7.k[\'2n\']==-1){7.c.8.C=7.T+\'v\'}16}9(7.z){7.30();q}7.3L();7.3P();1l(1f.b,"1V",7.32);1l(7.F,"1V",7.2Q);9(7.k&&7.k["1K"]==N){1l(7.F,"2P",1h(7,"2P"));1l(7.F,"2O",1h(7,"2O"))}9(7.k&&(7.k["1K"]==N||7.k["24"]==N)){7.1q=7.O/2;7.1A=7.T/2;7.3i()}};R.13.36=n(1I,e){9(1I.1Z==7.o.1c)q;a 2i=b.18("1x");2i.I=7.o.I;2i.1c=1I.1Z;a p=7.o.5e;p.5n(2i,7.o);7.o=2i;7.o.8.t=\'2j\';7.l.1c=1I.3S;9(1I.2A!=\'\'&&1o$(\'2y\'+7.c.I)){1o$(\'2y\'+7.c.I).1t.5k=1I.2A}7.2z=M;7.26();7.F.1Z=1I.1Z;3c{4L.4f()}3d(e){}};n 3z(I,L){a h=1f.b.3a("A");1p(a i=0;i<h.1m;i++){9(h[i].1z==I){1l(h[i],"2K",n(1d){9(m!=\'K\'){7.3Z()}E{1f.4e()}1N(1d);q M});1l(h[i],L.k[\'2o\'],1h(L,"36",h[i]));h[i].8.3W=\'0\';h[i].2G=3e;h[i].2G({L:L,4c:n(){7.L.36(1Q,7)}});a Z=b.18("1x");Z.1c=h[i].1Z;Z.8.t=\'1F\';Z.8.u=\'-1R\';Z.8.J=\'-1R\';b.1a.1b(Z);Z=b.18("1x");Z.1c=h[i].3S;Z.8.t=\'1F\';Z.8.u=\'-1R\';Z.8.J=\'-1R\';b.1a.1b(Z)}}};n 4l(){2p(1D.1m>0){a L=1D.44();L.3Q();45 L}};n 3V(){a 23=\'47 4K\';a 22=\'\';a 1S=1f.b.3a("1x");1p(a i=0;i<1S.1m;i++){9(/3N/.3X(1S[i].1Y)){9(1S[i].39!=\'\')23=1S[i].39;22=1S[i].1c;16}}a h=1f.b.3a("A");1p(a i=0;i<h.1m;i++){9(/R/.3X(h[i].1Y)){2p(h[i].1t){9(h[i].1t.1U!=\'1x\'){h[i].2q(h[i].1t)}E{16}}9(h[i].1t.1U!=\'1x\')4G"4r R 4s!";a 1E=2v.3g(2v.4v()*4u);h[i].8.t="2j";h[i].8.2w=\'2B\';h[i].8.3W=\'0\';h[i].8.4D=\'40\';1l(h[i],"2K",n(1d){9(m!=\'K\'){7.3Z()}1N(1d);q M});9(h[i].I==\'\'){h[i].I="48"+1E}9(m==\'K\'){h[i].8.1X=0}a 2u=h[i].1t;2u.I="3G"+1E;a Q=b.18("2a");Q.I="4n"+1E;U=1r 1H(/X(\\s+)?:(\\s+)?(\\d+)/i);B=U.1G(h[i].1z);a X=50;9(B){X=g(B[3])}U=1r 1H(/4A\\-4H(\\s+)?:(\\s+)?(2K|4F)/i);B=U.1G(h[i].1z);a 2o=\'2K\';9(B){2o=B[3]}U=1r 1H(/L\\-G(\\s+)?:(\\s+)?(\\w+)/i);a 2c=-1;B=U.1G(h[i].1z);Q.8.G=\'3T\';9(B){Q.8.G=B[3];2c=B[3]}U=1r 1H(/L\\-C(\\s+)?:(\\s+)?(\\w+)/i);a 2n=-1;B=U.1G(h[i].1z);Q.8.C=\'3T\';9(B){Q.8.C=B[3];2n=B[3]}U=1r 1H(/L\\-t(\\s+)?:(\\s+)?(\\w+)/i);B=U.1G(h[i].1z);a t=\'2M\';9(B){3R(B[3]){1i\'u\':t=\'u\';16;1i\'25\':t=\'25\';16;1i\'J\':t=\'J\';16;1i\'21\':t=\'21\';16;1i\'2N\':t=\'2N\';16}}U=1r 1H(/4d\\-4J(\\s+)?:(\\s+)?(N|M)/i);B=U.1G(h[i].1z);a 1K=M;9(B){9(B[3]==\'N\')1K=N}U=1r 1H(/5j\\-5l\\-L(\\s+)?:(\\s+)?(N|M)/i);B=U.1G(h[i].1z);a 24=M;9(B){9(B[3]==\'N\')24=N}Q.8.3U=\'1J\';Q.1Y="5f";Q.8.1X=1W;Q.8.1n=\'1J\';9(t!=\'21\'){Q.8.t=\'1F\'}E{Q.8.t=\'2j\'}a 2t=b.18("1x");2t.I="3B"+1E;2t.1c=h[i].1Z;Q.1b(2t);9(t!=\'21\'){h[i].1b(Q)}E{1o$(h[i].I+\'-3M\').1b(Q)}a k={24:24,1K:1K,1u:h[i].2A,X:X,2o:2o,t:t,23:23,22:22,2c:2c,2n:2n};9(t==\'2N\'){h[i].2A=\'\'}a L=1r R(h[i].I,\'3G\'+1E,Q.I,\'3B\'+1E,k);h[i].2G=3e;h[i].2G({L:L});L.26();3z(h[i].I,L)}}};9(m==\'K\')3c{b.4I("4z",M,N)}3d(e){};1l(1f,"3m",3V);',62,337,'|||||||this|style|if|var|document|bigImageCont||||parseInt|aels|||settings|smallImage|MagicZoom_ua|function|bigImage||return|||position|left|px||||pup||matches|height|MagicZoom_getStyle|else|smallImageCont|width|0px|id|top|msie|zoom|false|true|smallImageSizeX|loadingCont|bigCont|MagicZoom|tag|smallImageSizeY|re|popupSizeX||opacity|popupSizeY|img||smallX|smallY|prototype|||break|bigImageSizeY|createElement||body|appendChild|src|event|documentElement|window|compatMode|MagicZoom_createMethodReference|case|bigImageSizeX|args|MagicZoom_addEventListener|length|visibility|MagicZoom_|for|positionX|new|bigImageContStyleTop|firstChild|header|scrollLeft|gd56f7fsgd|IMG|scrollTop|rel|positionY|opera|safari|MagicZoom_zooms|rand|absolute|exec|RegExp|ael|hidden|drag_mode|listener|obj|MagicZoom_stopEventPropagation|result|toLowerCase|null|10000px|iels|arguments|tagName|mousemove|100|zIndex|className|href||custom|loadingImg|loadingText|bigImage_always_visible|bottom|initZoom|borderLeftWidth|el|paddingLeft|DIV|backcompat|zoomWidth|perX|headerH|wx|pleft|wy|newBigImage|relative|ptop|hiderect|gecko|zoomHeight|thumb_change|while|removeChild|clientY|clientX|bigImg|smallImg|Math|display|recalculating|MagicZoomHeader|safariOnLoadStarted|title|block|ar1|visible|checkcoords|paddingTop|mzextend|perY|indexOf|MagicZoom_getBounds|click|styleProp|right|inner|mouseup|mousedown|mousemove_ref|parseFloat|setTimeout|padding|MagicView_ia|complete|on|bw|vc67|vc68|recalculatePopupDimensions|css|checkcoords_ref|borderTopWidth|cursor|sequence|replaceZoom|MagicZoom_removeEventListener|push|alt|getElementsByTagName|object|try|catch|MagicZoom_extendElement|innerHTML|round|MagicZoom_getEventBounds|showrect|property|methodName|MagicZoom_concat|load|bigimgsrc|skip|MagicZoom_withoutFirst|filter|textAlign|bigImageContId|HTML|BODY|getComputedStyle|offsetTop|offsetLeft|offsetParent|MagicZoom_findSelectors|move|bim|smallImageContId|cancelBubble|smallImageId|getBoundingClientRect|sim|bigImageId|currentStyle|xgdf7fsgd56|paddingRight|initBigContainer|big|MagicZoomLoading|borderWidth|initPopup|stopZoom|switch|rev|300px|overflow|MagicZoom_findZooms|outline|test|str|blur|none|Array|center|popupSizey|pop|delete|defaultView|Loading|sc|mozilla|getElementById|border|selectThisZoom|drag|focus|refresh|navigator|default|version|baseuri|userAgent|MagicZoom_stopZooms|br|bc|addEventListener|attachEvent|removeEventListener|Invalid|invocation|in|1000000|random|pageYOffset|pageXOffset|detachEvent|BackgroundImageCache|thumb|preventDefault|stopPropagation|textDecoration|apply|mouseover|throw|change|execCommand|mode|Zoom|MagicThumb|javascript|IFRAME|offsetHeight|progid|DXImageTransform|oncontextmenu|onselectstart|alpha|borderRightWidth|Opacity|paddingBottom|MozUserSelect|Microsoft|Alpha||fontSize|color|fontWeight|fontFamily|Tahoma|div|typeof|frameBorder|3px|offsetWidth|undefined|html|unselectable|parentNode|MagicZoomBigImageCont|String|rtl|dir|always|data|show|fromCharCode|replaceChild|moz|charCodeAt|MagicZoomPup'.split('|'),0,{}))



//=============================================================================================
//=============================================================================================
//=============================================================================================
//=============================================================================================



//========Flash Injection======================================================================
//========Flash Injection======================================================================
//========Flash Injection======================================================================
//========Flash Injection======================================================================


/*
innerHTML fix:
author: Dan Walker, Steve Hallman, Eric Webster

This script takes the controversial innerHTML method and tries to make it output compliant, clean markup which all browsers can identify.

Note that if you have a bad XHTML/XML parse you should check what the output of this script is and ensure its valid XHTML.

*/

jQuery.fn.extend({
xhtml: function( val ) {




    if (val == undefined)
    {
        if (this.length == 0) return null;
        /*
        // internet explorer's innerHTML is craptastic so we use some hackery to fix it
        // if(navigator.appVersion.indexOf("MSIE") != -1 && navigator.appVersion.indexOf("Windows") > -1){
        // BUG: self-closing <a> tags don't work , e.g "<a name='inline' />"
        */

        var reTag = /(<\/?\w+)([^>]*>)/g;
        var reAttr = /(\w+=)((['"])[\s\S]*\3|[^\s>]+)/g;
        str = this[0].innerHTML;

        function fixAttr($0, $1, $2, $3) {
            if ($3) return $1.toLowerCase() + $2;
            else return $1.toLowerCase() + '"' + $2 + '"'
        }

        function fixTag($0, $1, $2) {
            return $1.toLowerCase() + $2.replace(reAttr, fixAttr);
        }

        /* clean up tags (make html tags and attributes lowercase) */
        str = str.replace(reTag, fixTag);

        /* make sure self-closing tags are closed */
        var reSelfClosing = new RegExp("\<(area|base|basefont|br|hr|img|input)(.*?)>", "g");

        str = str.replace(reSelfClosing, "<$1$2/>");
        /*
        // IE's treatment of UL's and DL's is mind boggling.
        // A big brain came up with this series of search/replaces that fixes them.  You go Dan.
        */
        str = str.replace(/<\/li>|<\/dt>/g, "");                            // get rid of all closing li and dt tags (for IE)
        str = str.replace(/\s*<li([^>]*)>/g, "<\/li><li$1>");       // put a closing li in front of all opening li
        str = str.replace(/<\/ul>/g, "<\/li><\/ul>");                   // put a closing li in front of closing ul
        str = str.replace(/<ul([^>]*)>\s*<\/li>/g, "<ul$1>");       // remove closing li's that appear directly after opening ul
        str = str.replace(/\s*<dd([^>]*)>/g, "<\/dt><dd$1>");   // put a closing dt in front of all opening dd's
        str = str.replace(/\s{2,1000}/igm,''); // remove spaces between 2 and 1000 characters
        str = str.replace(/(\n|\t)/igm,''); // remove line breaks and tabs
        /* end dan hackery */
        return str;
    }
    else this.empty().append( val );
}

});

/*

flashInjection V 0.1
Author: Eric Webster
History:

*/

jQuery.fn.flashInjection = function(settings) {

    settings = jQuery.extend({
    }, settings);


    settings.flashContainer = $(this).attr("id");
    if(settings.XHTMLcontentContainer){
        settings.XHTMLcontent = $(settings.XHTMLcontentContainer).xhtml();

        //this function is exposed so that Flash can read the content on the XHTML page.
        jQuery.fn.getContent = function() {
            return settings.XHTMLcontent;
        }
    }
    if(!settings.flashID){
        settings.flashID = "flashReplaced";
    }
    // possibly remove whitespace and newline from the content
    // var strSingleLineText = MediaCenter.XHTMLcontent.replace(new RegExp( "\\n", "g" ), "");
    //If Javascript is available remove the '#jsMessage' LI content node to reflect that the only remaing requirement is flash.
    $("#jsMessage").remove();
    $("#"+settings.flashContainer).css({
        width: settings.flashWidth,
        height:settings.flashHeight
    })



    /* THIS IS A GENERIC FLASH OBJECT THAT IS BEING INITALIZED*/
    var fO = new SWFObject(settings.flashSource, settings.flashID, "100%", "100%", settings.flashVersion);
    for(i in settings.flashParams){
        fO.addParam(i, settings.flashParams[i]);
    }
    for(i in settings.flashVars){
        fO.addVariable(i, settings.flashVars[i]);
    }
    fO.write(settings.flashContainer);

}

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="SameDomain";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;

//==============================================================================================================================================
//==============================================================================================================================================
//==============================================================================================================================================
//==============================================================================================================================================
//==============================================================================================================================================
//==============================================================================================================================================

