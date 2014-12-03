/*
 * Copyright (c) 2010. Fry, Inc. (A MICROS-Retail Company)
 * All Rights Reserved.  Any commercial use, copying, or redistribution of this
 * work is STRICTLY FORBIDDEN without the express written consent of
 * MICROS-Retail, or one of its subsidiaries.
 *
 * Supporting JavaScript for variant dropdowns on product and
 * ensemble pages.  When the swatch is changed, a "variantselected" event
 * will be triggered on the DIV element which contains the variant
 * selectors.
 *
 * @author Brett Fattori(bfattori@fry.com)
 * @author $Author: smalik $
 * @version $Revision: 1.2 $
 *
 * $Author: kveldurty
 * @updated version - modified to support 3 variants for CR.
 */
 
if(typeof(window.jsMatrices) == "undefined"){
	(function() {

		//Global debug Variable

		var isVariantDebug = false

		// Local storage of variant matrices
		 window.jsMatrices = {};

		// Used to keep the swatches and dropdown from performing an infinite loop
		var synchronizing = false;

		/**
		 * Initialize a variant matrix for a product.
		 * @param productId {Number} The product Id
		 * @param attributes {Array} An array of product attribute names
		 * @param attributeValues {Array} An array of product attribute values
		 * @param matrix {Object} A JavaScript object with translated variant values
		 * @param options {Object} An object containing optional features:
		 * 	<ul><li>showSwatches {Boolean} <code>true</code> to enable swatches [default: false]</li>
		 * 		 <li>selectedVariantId {Number} The Id of the selected variant [default: null]</li>
		 *			 <li>primaryImageSelector {String} The selector string which the swatch with swap with [default: img.primary]</li>
		 * 		 <li>imageSize {Number} The pixel dimension of the primage image (only width) [default: 240]</li>
		 * 		 <li>swatchSize {Number} The pixel dimension of the swatch image (only width) [default: 40]</li>
		 * 		 <li>unavailableSwatchClass {String} The class name to apply to the DIV which overlays
		 * 				unavailable swatches [default: faded]</li>
		 * 		 <li>swatchElement {String} The selector which represents the swatch UL</li>
		 * 	</ul>
		 */
		window.initProductMatrix = function(productId, attributes, attributeValues, matrix, options) {
		
			jsMatrices[productId] = {};
			jsMatrices[productId].jsAttributes = attributes;
			jsMatrices[productId].jsAttributeValues = attributeValues;
			jsMatrices[productId].jsMatrix = matrix;
			//console.log(jsMatrices[productId].jsMatrix);

			// The values stored in here will speed up lookups
			jsMatrices[productId].attrNameValues = {};
			jsMatrices[productId].corrAttrNameValues = {};

			// Populate the attribute names with their unique values and
			// with the corresponding attribute(s) unique values
			for (var av = 0; av < attributes.length; av++) {
				getAttributeValues(attributes[av], productId);
				getCorrespondingValues(attributes[av], attributes, productId);
			}

			// The context element for the variants
			jsMatrices[productId].context = $("#variants_" + productId);
			jsMatrices[productId].swatchElem = $("ul.swatches", jsMatrices[productId].context);

			// Allow the user to override the element which is displaying the swatches
			if (options.swatchElement != null) {
				jsMatrices[productId].swatchElem = $(options.swatchElement);
			}
			if (options.variantContext != null) {
				jsMatrices[productId].context = $(options.variantContext);
			}
			if (options.mainContext != null) {
				jsMatrices[productId].mainContext = $(options.mainContext);
			}
			
			 //jsMatrices[productId].crZoomViewerPage = new crZoomViewer();
				
				
			// Remember options
			jsMatrices[productId].options = $.extend({
				selectedVariantId: null,
				lowInvThresholdValue:"",
				mainContext:"",
				variantContext:'',
				showSwatches: false,
                adminPdp : false,
				primaryImageSelector: "img.primary",
				imageSizeHeight: 585,
				imageSizeWidth: 452,
				swatchSize: 40,
				unavailableSwatchClass: "faded",
				altElement:"",
				prodJson:"",
				colorCode:"",
                isShowBreadcrumb:true,
				exportMatrices: false
			}, options);


			// Allow the matrices to be exported to the window
			if (jsMatrices[productId].options.exportMatrices === true) {
				window.jsMatrices = jsMatrices;
			}

			// Populate the first dropdown
			var sel = $("select." + jsMatrices[productId].jsAttributes[0], jsMatrices[productId].context);
			for (var v = 0; v < jsMatrices[productId].jsAttributeValues[0].length; v++) {
				var value = jsMatrices[productId].jsAttributeValues[0][v];
				var opt = $("<option value='" + value + "'>" + value + "</option>");
				sel.append(opt);
			}
			sel[0].selectedIndex = 0;

			// If swatching is enabled, link the swatch list to the proper dropdown element
			if (options.showSwatches) {
				var swatchElem = jsMatrices[productId].swatchElem;

				var linkField = $("input[type=hidden][id=" + swatchElem.attr("attributeSystemName") + productId + "]", jsMatrices[productId].context);
				var linkSelect = $("select[attributeSystemName=" + swatchElem.attr("attributeSystemName") + "]", jsMatrices[productId].context);

				if (linkField.length != 0) {
					// When the select is changed, trigger a change on the linked field
					linkSelect.change(function() {
						linkField.change();
					});

					// When the hidden field changes value, we'll update the
					// swatch list to match.
					linkField.change(function() {
						updateCorrespondingSwatches($(this), productId);
					});

					// Load up the list items with swatch images
					populateSwatches(productId, swatchElem.attr("attributeSystemName"),options.selectedVariantId);

					if (swatchElem.attr("attributeSystemName") == jsMatrices[productId].jsAttributes[0]) {
						// If the primary attribute is the swatched element, enable all swatches
						$("li.swatch div." + jsMatrices[productId].options.unavailableSwatchClass, swatchElem).css("display", "none");
					}
				}
			}

			// Clear the variant Id input
			$("#variantId_" + productId).val(options.selectedVariantId);

			// Initialize with the defaults
			doDefaultSetup(productId, options.selectedVariantId);
			var o = options
			// Wire up the variant dropdowns
			
				$("select.variant", jsMatrices[productId].context).change(function() {
					// Keep the paired hidden field in sync with this dropdown
					var s = $(this);
					var productId = s.attr("variantident");
					var hiddenElID = s.attr("attributeSystemName") + productId;
					var hiddenEl = $("#"+hiddenElID, jsMatrices[productId].context);
					hiddenEl.val(s.val());
		
					/* the function below shows an inactive state for the swatches that are not available in that size */					
/*					if($(this).hasClass('SIZE_NAME')){	
						var dropdownValue = this.value;
						if(dropdownValue != ""){
							$('.swatch .inactive').each(function(){						
								$(this).css('display','block');
							});						
							
							var colorList = jsMatrices[productId].corrAttrNameValues['SIZE_NAME'][dropdownValue]['COLOR_NAME'];
							for(var colorName in colorList) {						    
								$('.swatch[dropval='+colorName+'] .inactive').css('display','none');						   
							}						
						}else{
							$('.swatch .inactive').css('display','none');
						}
					}*/
					// Fill in the values for the next subsequent selector
					process(s);
				});	
			
		};
		
		

		function returnSortedJsonObject(obj) {
			var keys = [];
			for (var keylook in obj) {
				if(obj.hasOwnProperty(keylook)){
					keys.push(keylook);
				}
			}
			keys.sort();
			var tempObj = new Object();

			for (var i = 0; i < keys.length; i++) {
				for (var key in obj) {
					if (keys[i] == key) {
					if (typeof obj[key] == 'object')
					obj[key] = returnSortedJsonObject(obj[key]);
					tempObj[key] = obj[key];
					}
				}
			}
			return tempObj;
		};

		/**
		 * Populate the swatch LI's using the unique values for attributeName in the
		 * matrix for product with the given Id
		 * @param productId {Number} The Id of the product which contains the swatches
		 * @param attributeName {String} The attribute which has the swatch image names
		 * @param cAttributeName {String} (Optional) The corresponding attribute name
		 * @param cAttributeValue {String} (Optional) The corresponding attribute value
		 */
		var populateSwatches = function(productId, attributeName,variantIdSel) {
			if(typeof(evtTestThisBreak) == "undefined") {
				evtTestThisBreak = true
			} else {
				evtTestThisBreak = true
				
			}
			var swatchElem = jsMatrices[productId].swatchElem;
			// Start fresh
			swatchElem.empty();
			var opts = jsMatrices[productId].options;
			for (var i in jsMatrices[productId].options.prodJson) {
				var imgName =  CommonJS.getImage(opts.prodJson[i].swatchImg, opts.swatchSize, opts.swatchSize);
				
				
				//var fullImg = !isEmpty(jsMatrices[productId].options.prodJson[i].recoloredImage) ? CommonJS.getImage(unique[i].recoloredImage, opts.imageSize, opts.imageSize) : "";
				var fullImg = CommonJS.getImage(i, opts.imageSizeWidth, opts.imageSizeHeight);
				
				if(location.protocol.toLowerCase() == "https:") {
					imgName = imgName.replace("http:", "https:")
					fullImg = fullImg.replace("http:", "https:")
				}
				
				li = $("<li class='swatch'>")
					li.attr("dropVal", opts.prodJson[i].colorName)
					.attr("linkVal", opts.prodJson[i].colorCode)
					.attr("fullImg", fullImg)
                                        .attr("id",i)
					
					
					.css("background", "url('" + imgName + "') center no-repeat")
					.click(function() {
						// Update the corresponding dropdown, passing the swatch, product Id, and attribute
						// Toggle which swatch is "selected"
						
						$("li", $(this).parent()).removeClass("selected");
						$(this).addClass("selected");
						// EC:  Forcing size selector to set to 0 on color change every time
						$('.sizing select.variant').val('0');
						var selectors = $("select", jsMatrices[productId].context);
						if(selectors[2] != undefined || selectors[2] != null){
							selectors[2].disabled="disabled";
						}
						swapAltImage($(this), productId);
						if(opts.updateCorrespondingDropdown) updateCorrespondingDropdown($(this), productId, attributeName);
						opts.updateCorrespondingDropdown = true
						$(".colorPrice span",jsMatrices[productId].mainContext).eq(0).html(this.getAttribute("dropVal"));
						$("li.variantDetailsPDP",jsMatrices[productId].mainContext).html("");
						$("li.status",jsMatrices[productId].mainContext).html("");
                        $(".variantError_SIZE_NAME").css("display","none");
                        $(".VariantDropdown.SIZE_NAME").removeClass("error");
						// EVT: Removed ripping out price at first and added quantity = 1
						//$("#totalPrice_"+productId).html("");
                            // Total price is not displayed on PDP -  Release 2.3 2014
//						var sel = $("#quantity")[0]
//						if(!sel) sel = $("#QTY")[0]
//						sel.options[0].selected = true
						   
						if(jsMatrices[productId].options.ensemble){
								var fred = jsMatrices[productId].options
									
								var im = $(fred.mainContext+" div#ensembleThumb_"+fred.primaryImageSelector)[0]
								var colCode = this.id
								im.src = CommonJS.getImage(colCode, fred.imageWidth, fred.imageHeight);
								
								var url = '/catalog/includes/quicklook_miniproduct.jsp?entityId='+productId+'&entityTypeId=4&colorCode='+colCode
								$(im).unbind("click")
								$(im).click(function(){
									binder.hopup.load('quickView', {url:url});
									
								})
								
							
							
						} 
						 
						if($('.hopupContainer').find('.fullDetails').length){
							 if($('#swatchWrapper li').length > 1){
								 var colorCodeUrl = $(".fullDetails").attr("href").split("?").shift();
								 colorCodeUrl += "?colorCode="+$(this).attr("id");
                                 if(!jsMatrices[productId].options.isShowBreadcrumb){
                                     colorCodeUrl += "&showBreadcrumb=false"
                                 }
								 $(".fullDetails").attr("href",colorCodeUrl);
							 }
						}
					});

				swatchElem.append(li);

			}
			opts.updateCorrespondingDropdown = true

			if(!opts.inEditState){
                if(opts.colorCode == ""){
			        setTimeout(function(){$("li",jsMatrices[productId].swatchElem).first().trigger("click")},100);
                }else{
                    setTimeout(function(){$("li#"+opts.colorCode,jsMatrices[productId].swatchElem).trigger("click")},100);
                }
			}
			else{
				opts.updateCorrespondingDropdown = false
				setTimeout(function(){$("li#"+opts.colorCode,jsMatrices[productId].swatchElem).trigger("click")},100);
			}
		};

		/**
		 * If there's a variant already selected, we need to default to it
		 * @param productId {Number} The Id of the product
		 * @param initialSelection {Number} The initial variant selection Id, or null
		 * @private
		 */
		var doDefaultSetup = function(productId, initialSelection) {
			if (initialSelection != null) {
				//Update variantId hidden field  for reverse look up.
				 $("#variantId_" + productId,jsMatrices[productId].context).attr("value",initialSelection);

				// Perform a reverse lookup
				var found = false, r;
				for (r in jsMatrices[productId].jsMatrix) {
					if (jsMatrices[productId].jsMatrix[r].id == initialSelection) {
						var keyValue = r;
						found = true;
						// Trigger the event "variantselected" on the appropriate "variants" div, passing the variant Id, product Id, and variant properties
						jsMatrices[productId].context.trigger("variantselected", [jsMatrices[productId].jsMatrix[r].id, productId, jsMatrices[productId].jsMatrix[r].props]);
						break;
					}
				}

				if (found) {
					// We'll turn the key back into an array - this gives us the lookup indexes for each display attribute
					r = r.substr(1, r.length - 2).split(",");
					for (var x in r) {
						r[x] = parseInt(r[x]);
					}

					// Fill out all of the selectors and enable them (if there are any)
					if (jsMatrices[productId].jsAttributeValues.length != 0) {
						$("select", jsMatrices[productId].context).each(function(i) {
							this.disabled = null;

							// Since we're doing a reverse lookup on a valid variant Id, we'll set the hidden field to a value (if it doesn't already have one)
							var p = $("input[type=hidden][id=" + jsMatrices[productId].jsAttributes[i] + productId + "]", jsMatrices[productId].context);
							if (isEmpty(p.val())) {
								p.val(jsMatrices[productId].jsAttributeValues[i][r[i]]);
							}

							//Process each selector to update with attribute values
							process($(this));
							if($(this).attr("attributesystemname") == "COLOR_NAME"){
								var keyVal = jsMatrices[productId].jsMatrix[keyValue].props["IMAGE_SET"];
								$("li#"+keyVal,jsMatrices[productId].swatchElem).addClass("selected");
								$(".colorPrice span",jsMatrices[productId].mainContext).eq(0).html($("li#"+keyVal,jsMatrices[productId].swatchElem).attr("dropval"));

							}

							// Set the value of the selector

							$("select." + jsMatrices[productId].jsAttributes[i], jsMatrices[productId].context).val(jsMatrices[productId].jsAttributeValues[i][r[i]]);
						});
					}
				}
			}
		};

		/**
		 * Process the current dropdown's next subsequent dropdown to make sure
		 * the values correspond to actual available selections.
		 * @param dropDown {Object} The dropdown to process
		 * @private
		 */
		var process = function(dropDown) {
			var productId = dropDown.attr("variantIdent");
			var selectors = $("select", jsMatrices[productId].context);
			var idx = selectors.index(dropDown);
			// Build a key which represents the selectors up to the currently specified dropdown
			//var key = [];
			var optSel = [];
			selectors.each(function(selId) {
				var s = $(this);
				if (selId <= idx) {
					var val = getDropdownValue(s);
					//(val != "" ? key.push(val) : $.noop());
					optSel[selId] = val;
				} else {
					// Stop at the first one with no value
					return false;
				}
			});

			// Enable the next selector in line
			var nextSel = selectors[idx + 1];
			if (nextSel && nextSel.disabled) {
				nextSel.disabled = null;
			}
			var nextJQ = $(nextSel);
			// Reset the next selector
			nextJQ.empty();
			var name = nextJQ.attr("variantType");
			nextJQ.append($("<option value=''>Select " + name + "</option>"));

            //Collect option values for the next dropdown
			var resultsvals = _.map(_.where( _.pluck(jsMatrices[productId].jsMatrix,"trans"),optSel),function(xArray){return xArray[idx+1]});

			if (optSel.length < 2) {
				var optionVal;
				for(optionVal in resultsvals){
					if(!isNaN(optionVal)){
						nextJQ.append($("<option value='" + resultsvals[optionVal] + "'>" + resultsvals[optionVal] + "</option>"));
					}
				}

				// Since we only have a partial match, clear the selected variant Id
				$("#variantId_" + productId).val("");

				// Trigger the event "variantselected" on the appropriate "variants" div, which should
				// clear the display message (variantId is -1 and props is null)
				jsMatrices[productId].context.trigger("variantselected", [-1, productId, null]);

			} else {
				// we've apparently got all the selector values to get varaintId. If there is a invalid entry, we will clear the selected variant Id.
			   var variantKey, variantRootKey;
			   //console.log("Options selected : " + optSel);
               //console.log("Matrix Key to get variantId : [" + jsMatrices[productId].attrNameValues.COLOR_NAME.indexOf(optSel[0]) + "," + jsMatrices[productId].attrNameValues.SIZE_NAME.indexOf(optSel[1]) + "]");
               variantRootKey = _.where(jsMatrices[productId].jsMatrix, jsMatrices[productId].jsMatrix["["+ jsMatrices[productId].attrNameValues.COLOR_NAME.indexOf(optSel[0]) + "," + jsMatrices[productId].attrNameValues.SIZE_NAME.indexOf(optSel[1]) + "]"]);
               //console.log("Variant key to submit in the form : "+ variantRootKey[0].id);

				try {
                    variantKey = variantRootKey[0].id;
					// Valid key, set the input
					$("#variantId_" + productId,jsMatrices[productId].context).val(variantKey);
				    //console.log(variantKey);

					 updateCorrespondingText(productId,variantRootKey[0],optSel,dropDown);

					// Trigger the event "variantselected" on the appropriate "variants" div, passing the variant Id, product Id, and variant properties
					jsMatrices[productId].context.trigger("variantselected", [variantKey, productId, variantRootKey[0].props]);
				} catch (ex) {
					// Invalid key, clear the text and input fields
                    //console.log("Invalid variant key - reset variant hidden field")
                    $("#variantText_"+productId +" "+"li.variantDetailsPDP",jsMatrices[productId].mainContext).html("");
                    $("#variantText_"+productId +" "+"li.status",jsMatrices[productId].mainContext).html("");
                    $("#variantId_" + productId,jsMatrices[productId].context).val("");
				}
			}

			// Reset all of the subsequent selectors to "Select [Option]"
			selectors.each(function(j) {
				if (j > idx) {
					this.selectedIndex = 0;
				}
			});
		};

		/* Add/Update total price, stock msg, color name for product variant selected */

		var updateCorrespondingText = function(productId,variantRootKeyObject,optSel,dropDown){
			if((optSel[1] != undefined || optSel[1] != null) && !isEmpty(dropDown.prev("input[type=hidden]").val())){
				$("#variantText_"+productId +" "+"li.variantDetailsPDP",jsMatrices[productId].mainContext).html(optSel[1]+"-"+optSel[0]);
                $(".variantError_SIZE_NAME").css("display","none");
                $(".VariantDropdown.SIZE_NAME").removeClass("error");
				if(variantRootKeyObject.props.isPreorderable) {
					$("#variantText_"+productId +" "+"li.status",jsMatrices[productId].mainContext).html("AVAILABLE FOR PRE-ORDER");
					$("#variantText_"+productId +" "+"li.availableDate",jsMatrices[productId].mainContext).html("Ships on " + variantRootKeyObject.props.preOrderDate);
				}
				else {
					/* dynamic inventory limited availability message*/
					var dynInventoryMsgTxt = '';
					var dynamicVariantInv = getInventoryForPV(variantRootKeyObject.id);
					if(dynamicVariantInv != undefined && dynamicVariantInv <= 10 && dynamicVariantInv > 0){
						dynInventoryMsgTxt = '. JUST A FEW LEFT!';
					}
					if(jsMatrices[productId].options.lowInvThresholdValue != ""){
						if(parseInt(variantRootKeyObject.props.invLevel) > jsMatrices[productId].options.lowInvThresholdValue){
							$("#variantText_"+productId +" "+"li.status",jsMatrices[productId].mainContext).html("IN STOCK" + dynInventoryMsgTxt);
						}else{
							 $("#variantText_"+productId +" "+"li.status",jsMatrices[productId].mainContext).html("LOW IN STOCK" + dynInventoryMsgTxt);
						}
					}else{
						 if(parseInt(variantRootKeyObject.props.invLevel) > 0){
							$("#variantText_"+productId +" "+"li.status",jsMatrices[productId].mainContext).html("IN STOCK" +  dynInventoryMsgTxt);
						}
					}
					
				}
                // Total price is not displayed on PDP -  Release 2.3 2014
//				var totalDisplayprice = parseFloat((jsMatrices[productId].jsMatrix[variantRootKey].props.price).replace("$", ''));
//				window.variantPriceSel = totalDisplayprice;
//				var CH_findSelectWithDifferentIDsOnDifferentPages = $("select#quantity",jsMatrices[productId].mainContext)
//				if(!CH_findSelectWithDifferentIDsOnDifferentPages.length) CH_findSelectWithDifferentIDsOnDifferentPages = $("select#QTY",jsMatrices[productId].mainContext)
//				$("input[type=hidden][name=quantity]",jsMatrices[productId].mainContext)[0].value = CH_findSelectWithDifferentIDsOnDifferentPages.val()
//				$("#totalPrice_"+productId,jsMatrices[productId].mainContext).html("$"+(totalDisplayprice* CH_findSelectWithDifferentIDsOnDifferentPages.val()).toFixed(2));

			}
			else{
				$("#variantText_"+productId +" "+"li.variantDetailsPDP",jsMatrices[productId].mainContext).html("");
				$("#variantText_"+productId +" "+"li.status",jsMatrices[productId].mainContext).html("");
				//$("#totalPrice_"+productId,jsMatrices[productId].mainContext).html( $("#totalPrice_"+productId,jsMatrices[productId].mainContext)[0].getAttribute("evt_origContent"));
			}
		};

		/**
		 * Get the index of an attribute name
		 * @param attributeName {String} Name of the attribute
		 * @param productId {Number}
		 */
		var getAttributeNameIndex = function(attributeName, productId) {
			if (jsMatrices[productId].attrNameIndexes === undefined) {
				jsMatrices[productId].attrNameIndexes = {};
				for (var i = 0; i < jsMatrices[productId].jsAttributes.length; i++) {
					jsMatrices[productId].attrNameIndexes[jsMatrices[productId].jsAttributes[i]] = i;
				}
			}
			return jsMatrices[productId].attrNameIndexes[attributeName];
		};

		/**
		 * Get the unique values for the given attribute name, for
		 * the specified product Id.
		 *
		 * @param attributeName {String} The name of the attribute
		 * @param productId {Number} The Id of the product
		 * @return {Array} array of unique values for the given attribute name
		 */
		var getAttributeValues = function(attributeName, productId) {
			if (jsMatrices[productId].attrNameValues[attributeName] === undefined) {
				var t = getAttributeNameIndex(attributeName, productId);
				jsMatrices[productId].attrNameValues[attributeName] = jsMatrices[productId].jsAttributeValues[t];
			}
			return jsMatrices[productId].attrNameValues[attributeName];
		};

		/**
		 * Get the available values for the given corresponding attribute name,
		 * given the attribute name and product Id.  If attributeName is "SIZE_NAME"
		 * and cAttributeName is "COLOR_NAME", get all of the available "COLOR_NAME"
		 * values which correspond to the values acquired for "SIZE_NAME".
		 *
		 * @param attributeName {String} The attribute name
		 * @param attributes
		 * @param productId
		 */
		var getCorrespondingValues = function(attributeName, attributes, productId) {
			if (jsMatrices[productId].corrAttrNameValues[attributeName] === undefined) {
				var aT = getAttributeNameIndex(attributeName, productId);
				jsMatrices[productId].corrAttrNameValues[attributeName] = {};
				var vals = getAttributeValues(attributeName, productId);
				for (var av = 0; av < vals.length; av++) {
					jsMatrices[productId].corrAttrNameValues[attributeName][vals[av]] = {};
					for (var a = 0; a < attributes.length; a++) {
						if (attributes[a] !== attributeName) {
							var t = getAttributeNameIndex(attributes[a], productId);
							jsMatrices[productId].corrAttrNameValues[attributeName][vals[av]][attributes[a]] = {};
							for (var j in jsMatrices[productId].jsMatrix) {
								if (jsMatrices[productId].jsMatrix[j].trans[aT] == vals[av]) {
									jsMatrices[productId].corrAttrNameValues[attributeName][vals[av]][attributes[a]][jsMatrices[productId].jsMatrix[j].trans[t]] = jsMatrices[productId].jsMatrix[j].props;
								}
							}
						}
					}
				}
			}
			return jsMatrices[productId].corrAttrNameValues[attributeName];
		};

		var getProps = function(attribute, value, cAttributeName, cAttributeValue, productId) {
			try {
				return (jsMatrices[productId].corrAttrNameValues[cAttributeName][cAttributeValue][attribute][value]);
			} catch(ex) {
				return null;
			}
		};

		/**
		 * Determine if the value empty (null or empty string)
		 * @param val {String} The value to test
		 * @return {Boolean}
		 * @private
		 */
		var isEmpty = function(val) {
			return (typeof val === "undefined" || val === null || val === "");
		};

		/**
		 * Get the value of the given dropdown
		 * @param dropDown {Object} The dropdown to get the value from
		 * @return {String} The value of the dropdown
		 * @private
		 */
		var getDropdownValue = function(dropDown) {
			// See if the dropdown has a value
			var v = "";
			if (!isEmpty(dropDown.val())) {
				v = dropDown.val();
			} else {
				// check the hidden linked field
				v = dropDown.prev("input[type=hidden]").val();
			}
			return v;
		};

		/**
		 * Swap the main image
		 * @param swatch {Object} The jQuery object which represents the swatch
		 * @param productId {Number} The Id of the product which contains the swatches
		 */
		var swapMainImage = function(swatch, productId) {
			$(jsMatrices[productId].options.primaryImageSelector).attr("src", swatch.attr("fullImg"));
		};

		/**
		 * Swap the main image
		 * @param swatch {Object} The jQuery object which represents the swatch
		 * @param productId {Number} The Id of the product which contains the swatches
		 */
		var swapMainImageWithAltImage = function(id, productId) {
			var fullImg = CommonJS.getImage(id, "452", "585");
			$(jsMatrices[productId].options.primaryImageSelector).attr("src", fullImg);
		};


		/**
		 * Swap the alt images
		 * @param swatch {Object} The jQuery object which represents the swatch
		 * @param productId {Number} The Id of the product which contains the swatches
		 */
		var swapAltImage = function(swatch, productId) {
			if(jsMatrices[productId].options.altElement != null) {
                $(jsMatrices[productId].options.altElement).empty();
                var altImages = jsMatrices[productId].options.prodJson[swatch.attr("id")].altImages;
                var classNameAltImage = 'altImageList';
                if (jsMatrices[productId].options.altElement.indexOf('quicklook-miniproduct') > 0) {
                    classNameAltImage = 'altImageListQv';
                }
                for (var i = 0; i < altImages.length; i++) {
                    $(jsMatrices[productId].options.altElement).append('<li id="' + altImages[i] + '" class="' + classNameAltImage + '"></li>').find('li:last')
                        .append($('<img>', {
                            src: CommonJS.getImage(altImages[i], "75", "90"),
                            width: "75",
                            height: "90",
                            alt: "",
                            title: ""

                        }));

                }
                if (!(jsMatrices[productId].options.altElement.indexOf('quicklook-miniproduct') > 0)) {
                    $('#product-content .js_productAltImages_wrap li:first-child').addClass('active');
                }
                else {
                    $('#quicklook-miniproduct_DIV .js_productAltImages_wrap li:first-child').addClass('active');
                }
			}

		};

		/**
		 * Update the dropdown which matches the swatch list.
		 * @param swatch {Object} The jQuery object which represents the swatch
		 * @param productId {Number} The Id of the product the swatches come from
		 * @param attributeName {String} The attribute which contains the swatch
		 */
		var updateCorrespondingDropdown = function(swatch, productId, attributeName) {
			if (synchronizing) {
				// Prevent infinite loop
				return;
			}
			synchronizing = true;
			$("select." + attributeName, jsMatrices[productId].context).val(swatch.attr("dropVal")).change();
			synchronizing = false;
		};

		/**
		 * Update the swatches which match the dropdown.  The linkField will contain the attribute name.
		 * @param linkField {Object} The jQuery object which represents the linked field
		 * @param productId {Number} The Id of the product the swatches come from
		 */
		var updateCorrespondingSwatches = function(linkField, productId) {
			if (synchronizing) {
				// Prevent infinite loop
				return;
			}
			synchronizing = true;
			var pairedSwatch = $("li[dropVal=" + linkField.val().replace(" ","") + "]", jsMatrices[productId].swatchElem);
			if (pairedSwatch.length != 0) {
				pairedSwatch.click();
			} else {
				// They must've selected the default ("Select One")
				$("li.swatch", jsMatrices[productId].swatchElem).removeClass("selected");
			}
			synchronizing = false;
		};
	})();
}