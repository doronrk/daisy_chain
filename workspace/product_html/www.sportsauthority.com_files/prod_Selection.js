jQuery(document).ready(function () {
			//variable for default button status
			var default_cartButton = jQuery("#add-cart input.prod-sprite").hasClass('prodNot');
			var default_fisButton = jQuery("#ispu-chec").hasClass('ispu-chec-NotInStore');
			var ship_window="";
			//variable for default availablity message
			var default_load = jQuery("#availability").html();
			
			var skuSizeLocation = [];
			var duplicateData = false;
			function elementInArray(txt, arrObj) {
				for (var i = 0; i < arrObj.length; i++) {
					if (arrObj[i] == txt) {
						return true;
					}
				}
			}
			
			function checkRedundancy(size_names, size_ids, sku_ids, availabilityArray){
			  skuSizeLocation = [];
			  duplicateData = false;
			  var redundant = false;
			  var redundantCount = [] ;
			  var duplicateSizeId= "";
			   for(i = 0 ; i<sku_ids.length; i++){
			      var size_id = size_ids[i];
                  if(duplicateSizeId.indexOf(':'+i+':') > -1){
				   continue;
				  }
				  redundant = false;
				  redundantCount = [] ;
				  for(j=(i+1) ; j < size_ids.length ; j++){
				    if( i!=j && size_id == size_ids[j]){
					  redundant = true;
					  duplicateData = true;
					  redundantCount.push(j);
					}
				  }
				  if(redundant){
						redundantCount.push(i);
						var set = false;
						for(k =0 ; k < redundantCount.length ; k++){
						  duplicateSizeId = duplicateSizeId+':'+redundantCount[k]+':';
						  if(availabilityArray[redundantCount[k]]){
							skuSizeLocation.push(redundantCount[k]);
							set = true;
							break;
						  }
						}
						if(!set){
						 skuSizeLocation.push(redundantCount[0]);
						}					
				  }else{
				       skuSizeLocation.push(i);
				  }
			   }
			
			}
		jQuery('#product-swatch').on('click', 'li', function () {
				//using default_load on click of colour//
				
				//code to check cart button
				default_cartButton == true ? jQuery("#add-cart input").addClass('prodNot') : jQuery("#add-cart input").removeClass('prodNot');
				//code to check FIS button
				default_fisButton == true ? jQuery('#ispu-chec').addClass('ispu-chec-NotInStore') : jQuery("#ispu-chec").removeClass('ispu-chec-NotInStore');
				
				//code for below cart messages//
				
				document.getElementById('availability').innerHTML = default_load;
				var $detailsLink = jQuery("#availability").find("#detailsRow a"),
				detailsLinkURL  = $detailsLink.attr("href");
				$detailsLink.click(function() {
					window.open(detailsLinkURL, "helpdesk", "width=500,height=400,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
				})
				$detailsLink.attr("href", "javascript:void(0);").data("rewrite", "true");
				
				var jdaStyle_id = [];
				var data_ID = [];
				var skuOfSizesArray = [];
				var counter;
				var skuID;
				var onlineAvailable = false;
				var inStoreAvailable = false;
				var availabilityArray = [];
				var availFlag ;
				var isaFlag = false;
				for (var i = 0; i < productJSON.skus.length; i++) {
					counter = productJSON.skus[i];
					skuID = productJSON.skus[i].sku_id;
					onlineAvailable = false;
					inStoreAvailable = false;
					for(var j=0; j<skuAvailString.length; j++){
					  if(skuID == skuAvailString[j].sku){
						availFlag = skuAvailString[j].availMsg;
						isaFlag = skuAvailString[j].isaStatus;
						if('IN_STOCK' == availFlag || 'BACKORDER' == availFlag || 'RELEASE_DATE' == availFlag || 'ADVANCE_SALE' == availFlag){
						  onlineAvailable = true;
						}
						
						if(isaFlag == "InAllStores" || isaFlag.toUpperCase() == "IN-STORE: AVAILABLE IN STORES" || isaFlag == "InSelectStores" || isaFlag.toUpperCase() == "IN-STORE: AVAILABLE IN SELECT STORES"){
						  inStoreAvailable = true;
						}						
						break;
					  } 
					}
					
					if (jQuery(this).data('id') == counter.colorId) {
						jdaStyle_id.push(counter.size);
						data_ID.push(counter.sizeId);
						skuOfSizesArray.push(skuID);
						availabilityArray.push(inStoreAvailable || onlineAvailable);
					}
					
				}
				
				checkRedundancy(jdaStyle_id, data_ID, skuOfSizesArray, availabilityArray);

				jQuery("#product-size ul li").removeClass("disabled").hide();
				jQuery("#product-size ul li").each(function(){
					var jQuerythis = jQuery(this);
					var dataIdUpdated;
						for(var i=0; i<skuSizeLocation.length;i++){
							if(jQuerythis.data('name') == jdaStyle_id[skuSizeLocation[i]]){
							
								dataIdUpdated = data_ID[i];
								jQuerythis.attr("data-id", dataIdUpdated).show();
								jQuerythis.attr("data-skuid", skuOfSizesArray[skuSizeLocation[i]]);
								
								if(availabilityArray[skuSizeLocation[i]] == false){
								  jQuerythis.addClass("disabled");	
								}
								break;
							}
						}
				});
				
				

		});
		
		//Function to disable the "ADD TO CART BUTTON" and First Message Starts//
			var webAvailablity = function () {
				var data_id_testget = $.trim(jQuery("#product-size .active").text());
				var color_id_testget = jQuery("#product-swatch .active").attr('data-id');
				ship_window = "1 - 2 full bus. days";
				var selectedSkuId = document.getElementById('prod_0').value.split('|')[1];
				for (var i = 0; i < productJSON.skus.length; i++) {
					var counter = productJSON.skus[i];
						
					if (selectedSkuId == counter.sku_id) {
						var available = counter.avail;
						var skuID = counter.sku_id;
						for(var j=0; j<skuAvailString.length; j++){
						  if(skuID == skuAvailString[j].sku){
						    ship_window = skuAvailString[j].shipWindow;
						     break
						  } 
						}
						if (available == "NOT_AVAILABLE" || available == "NODISPLAY" || available == "NO_DISPLAY" || available == "OUT _OF_STOCK" || available == "DISCONTINUED" || available == "NOT_AVAILABLE" || available == "Sdc" || available == "OUT_OF_STOCK") {
							
							jQuery("#add-cart input").addClass('prodNot');
							jQuery('#add-cart input').click(function(){
								if (jQuery(this).hasClass('prodNot')) {
									jQuery('#add-cart input').prop('onclick',null);
									return false;
								}
							});
							jQuery('#availability #detailsRow span').text('NOT CURRENTLY AVAILABLE ONLINE');
							jQuery('#availability #detailsRow').removeClass().addClass('availabilityCrossBg');
							jQuery('#availability .anchorWrap').hide();
						} else if (available == "IN_STOCK" || available == "BACKORDER" || available == "backordered" || available == "RELEASE_DATE" || available == "ADVANCE_SALE") {
							jQuery("#add-cart input").removeClass('prodNot');
							jQuery('#availability #detailsRow span').text('In stock: Leaves warehouse in '+ship_window+'.');
							jQuery('#availability #detailsRow').removeClass().addClass('availabilityCheckBg');
							jQuery('#availability .anchorWrap').show().css('padding-left', '0px');
						}						
					}
				}
			}
			//Function to disable the "ADD TO CART BUTTON" and First Message Ends//
			
			//Function to check store Availablity Starts//
			var storeAvailablity = function () {
				var data_id_testget = $.trim(jQuery("#product-size .active").text());
				var color_id_testget = jQuery("#product-swatch .active").attr('data-id');
				var selectedSkuId = document.getElementById('prod_0').value.split('|')[1];
				for (var i = 0; i < productJSON.skus.length; i++) {
					var counter = productJSON.skus[i];
					
					if (selectedSkuId == counter.sku_id) {
						var skuID = counter.skuId;
						for(var j=0; j<skuAvailString.length; j++){
						  if(skuID == skuAvailString[j].sku){
								if(skuAvailString[j].isaStatus == "InSelectStores" || skuAvailString[j].isaStatus.toUpperCase() == "IN-STORE: AVAILABLE IN SELECT STORES"){
									jQuery('#ispu-chec').removeClass('ispu-chec-NotInStore');
									jQuery('#availability #availIndicatorsRow').html("<span>IN STORE: AVAILABLE IN SELECT STORES. </span><div class='findStoreWrap'><a href=\"javascript:void(0)\" onclick=\"_gaq.push(['_trackEvent', 'Product', 'findinStoreLink', 'Find In Store Link ']);\">FIND IN STORE</a> <span>&raquo;</span></div>");
									jQuery('#availability #availIndicatorsRow').removeClass().addClass('availabilityHoldBg');
								}else if(skuAvailString[j].isaStatus == "InAllStores" || skuAvailString[j].isaStatus.toUpperCase() == "IN-STORE: AVAILABLE IN STORES"){
									jQuery('#ispu-chec').removeClass('ispu-chec-NotInStore');
									jQuery('#availability #availIndicatorsRow').html("<span>IN STORE: Available In Stores. </span> <div class='findStoreWrap'><a href=\"javascript:void(0)\" onclick=\"_gaq.push(['_trackEvent', 'Product', 'findinStoreLink', 'Find In Store Link ']);\">FIND IN STORE</a> <span>&raquo;</span></div>");
									jQuery('#availability #availIndicatorsRow').removeClass().addClass('availabilityCheckBg');
								}else if(skuAvailString[j].isaStatus == "OnlineOnly" || skuAvailString[j].isaStatus.toUpperCase() == "IN-STORE: NOT AVAILABLE IN STORES" || skuAvailString[j].isaStatus.toUpperCase() == "IN-STORE: NOT AVAILABLE IN STORE"){
									jQuery('#ispu-chec').addClass('ispu-chec-NotInStore');
									jQuery('#availability #availIndicatorsRow').html("<span>IN STORE: Not Available in Store.</span>");
									jQuery('#availability #availIndicatorsRow').removeClass().addClass('availabilityCrossBg');
								}
							}
						}
						if(document.getElementById('prod_0') != null){
							if(document.getElementById('prod_0').value.indexOf('false') > 0 || document.getElementById('prod_0').value.split('|')[1] == "" || document.getElementById('prod_0').value.split('|')[1] == 'undefined'){
							  document.getElementById('prod_0').value = p.form.productId + '|' + skuID;
							}
						}
					}
				}
			}
			//Function to check store Availablity Ends//
			
			jQuery('#product-size ul').on('click', 'li', function () {
				if(jQuery(this).hasClass('disabled')) {
					return false;
				}
				else {
					
					jQuery(this).siblings('li').removeClass('active').end().addClass('active');
					if(duplicateData == true){
							var prod_0_Selector = document.getElementById('prod_0').value.split('|')[0];
							var selectedSkuId = jQuery("#product-size .active").attr('data-skuid');
							prod_0_Selector  = prod_0_Selector+'|'+selectedSkuId;
							document.getElementById('prod_0').value = prod_0_Selector;
					}
					webAvailablity();
					storeAvailablity();
				}
			});
			jQuery("#product-size li, #product-swatch li").on('click', function () {
				if (jQuery("#product-size .active") && jQuery("#product-swatch .active")) {
					webAvailablity();
					storeAvailablity();
				}
			});
			var webAvailablityDropDown = function (skuID) {
				var ship_window = "1 - 2 full bus. days";
				var available="";
						for(var j=0; j<skuAvailString.length; j++){
						  if(skuID == skuAvailString[j].sku){
						    available = skuAvailString[j].availMsg;
						    ship_window = skuAvailString[j].shipWindow;
						     break;
						  } 
						}
						if (available == "NOT_AVAILABLE" || available == "NODISPLAY" || available == "NO_DISPLAY" || available == "OUT _OF_STOCK" || available == "DISCONTINUED" || available == "NOT_AVAILABLE" || available == "Sdc" || available == "OUT_OF_STOCK") {
							jQuery("#add-cart input").addClass('prodNot');
							jQuery('#add-cart input').click(function(){
								if (jQuery(this).hasClass('prodNot')) {
									jQuery('#add-cart input').prop('onclick',null);
									return false;
								}
							});
							jQuery('#availability #detailsRow span').text('NOT CURRENTLY AVAILABLE ONLINE');
							jQuery('#availability #detailsRow').removeClass().addClass('availabilityCrossBg');
							jQuery('#availability .anchorWrap').hide();
						} else if (available == "IN_STOCK" || available == "BACKORDER" || available == "backordered" || available == "RELEASE_DATE" || available == "ADVANCE_SALE") {
							jQuery("#add-cart input").removeClass('prodNot');
							
							jQuery('#availability #detailsRow span').text('In stock: Leaves warehouse in '+ship_window+'.');
							jQuery('#availability #detailsRow').removeClass().addClass('availabilityCheckBg');
							jQuery('#availability .anchorWrap').show().css('padding-left', '0px');
						}						
			}
			
		var storeAvailablityDropDown = function (skuID) {
                     for(var j=0; j<skuAvailString.length; j++){
						  if(skuID == skuAvailString[j].sku){
								if(skuAvailString[j].isaStatus == "InSelectStores" || skuAvailString[j].isaStatus.toUpperCase() == "IN-STORE: AVAILABLE IN SELECT STORES"){
									jQuery('#ispu-chec').removeClass('ispu-chec-NotInStore');
									jQuery('#availability #availIndicatorsRow').html("<span>IN STORE: AVAILABLE IN SELECT STORES. </span><div class='findStoreWrap'><a href=\"javascript:void(0)\" onclick=\"_gaq.push(['_trackEvent', 'Product', 'findinStoreLink', 'Find In Store Link ']);\">FIND IN STORE</a> <span>&raquo;</span></div>");
									jQuery('#availability #availIndicatorsRow').removeClass().addClass('availabilityHoldBg');
								}else if(skuAvailString[j].isaStatus == "InAllStores" || skuAvailString[j].isaStatus.toUpperCase() == "IN-STORE: AVAILABLE IN STORES"){
									jQuery('#ispu-chec').removeClass('ispu-chec-NotInStore');
									jQuery('#availability #availIndicatorsRow').html("<span>IN STORE: Available In Stores. </span> <div class='findStoreWrap'><a href=\"javascript:void(0)\" onclick=\"_gaq.push(['_trackEvent', 'Product', 'findinStoreLink', 'Find In Store Link ']);\">FIND IN STORE</a> <span>&raquo;</span></div>");
									jQuery('#availability #availIndicatorsRow').removeClass().addClass('availabilityCheckBg');
								}else if(skuAvailString[j].isaStatus == "OnlineOnly" || skuAvailString[j].isaStatus.toUpperCase() == "IN-STORE: NOT AVAILABLE IN STORES" ||skuAvailString[j].isaStatus.toUpperCase() == "IN-STORE: NOT AVAILABLE IN STORE"){
									jQuery('#ispu-chec').addClass('ispu-chec-NotInStore');
									jQuery('#availability #availIndicatorsRow').html("<span>IN STORE: Not Available in Store.</span>");
									jQuery('#availability #availIndicatorsRow').removeClass().addClass('availabilityCrossBg');
								}
							}
						}
						if(document.getElementById('prod_0') != null){
							if(document.getElementById('prod_0').value.indexOf('false') > 0 || document.getElementById('prod_0').value.split('|')[1] == "" || document.getElementById('prod_0').value.split('|')[1] == 'undefined'){
							  document.getElementById('prod_0').value = p.form.productId + '|' + skuID;
							}
						}
			}
			jQuery("#product-variant .variant").change(function(){
                    var skuvalue= $(this).find("option:Selected").val();
					webAvailablityDropDown(skuvalue);
                    storeAvailablityDropDown(skuvalue);
            });
	});		