var findInStoreURL = "InventoryByStore-Start";
var fullInStoreJSONURL = '/on/demandware.store/Sites-bootbarn_us-Site/default/InventoryByStore-Start';
var findProduct;//theProduct object
var findStoreFullZip;
var bottomSearchText="";
var findInStoreButtonText="You MUST make a selection from all product options (like Color, Size, Width) before the Find in Store button will work.";
var isValid=false;

jQuery(document).ready(function(){
	
	//create "Find In Store" button
	jQuery("#pdpATCDivpdpMain label").after(jQuery("<button id='findStoreButton' class='disabled' title='' style='width:106px;'></button>"));

	//listen for addToCart activation...
	jQuery(".addtocartbutton").bind("FindInStoreEnabled", function(event, thisProduct){
		findProduct=thisProduct;
		
		jQuery("#findStoreButton").removeClass("disabled").addClass("enabled");
		jQuery("#findStoreButton").attr("title", "Find in Store");  // test
		return false;
	}).bind("FindInStoreDisabled", function(){
		jQuery("#findStoreButton").removeClass("enabled").addClass("disabled");
	    jQuery("#findStoreButton").attr("title", "Find in Store");// test  findInStoreButtonText
		return false;
	});
	
	jQuery("#findStoreButton").bind("click",function(){
		
		if(jQuery(this).hasClass("enabled")){

			//create and populate dialog
			showSearchDialog();
			var id = (findProduct.master ? findProduct.selectedVar.id : findProduct.pid);
			cmCreateConversionEventTag("Find in Store (PDP Button Click)","1","Find in Store", "1", "Product ID: " + id);				
		}

	});
	
	jQuery("#zipInput").live("change",function(){
		//console.log($(this).val());
		
		var re = new RegExp("/^\d+$/");//zip is number
		
		if($(this).val().length>=5 && $(this).val().match(/^\d+$/)){
			$("#stateInput").val("");
			
			isValid=true;
			jQuery("#findStoreValidation").remove();
			$(this).addClass("isValid");
			
		}else if(!$("#stateInput").hasClass("isValid")){
			//both are bad
			//reset to invalid
			isValid=false;
		}
	})
	jQuery("#stateInput").live("change",function(){
		
		if($(this).val()!=""){
			//empty the zip input
			jQuery("#zipInput").val("");
			
			isValid=true;
			jQuery("#findStoreValidation").remove();
			$(this).addClass("isValid");
			
		}else if(!$("#zipInput").hasClass("isValid")){
			//both are bad
			//reset to invalid
			isValid=false;
		}
	});

	jQuery("#zipSearch").live("click",function(){

		jQuery("#findStoreValidation").remove();
		if(isValid){
			//LYONS: 	
			fetchStores(findProduct);
		}else{
			//show validation
			jQuery("#zipSearch").before("<div id='findStoreValidation' >Please enter a zip code or select a state.</div>")
		}
	});
	
});

function showSearchDialog(){
	jQuery("#findStoreButton").after(jQuery("<div id='findStoreDialog' style='clear:both;'></div>"));
	
	var id = (findProduct.master ? findProduct.selectedVar.id : findProduct.pid);
	
	
	//LYONS: findProduct was cached above
	//console.log(findProduct);
	var imgUrl = jQuery(".productimage img").attr("src");
	
	jQuery("#findStoreDialog").append(jQuery("<img src='"+imgUrl+"' width='180' id='findProductImg' />"))
	jQuery("#findStoreDialog").append(jQuery("<div style='font-size:14px;font-weight:bold;padding:6px 0 12px 0;'>"+findProduct.name+"</div>"));
	//display options
	for(option in findProduct.selectedVarAttribs){

		jQuery("#findStoreDialog").append(jQuery("<div>"+option.toUpperCase()+": "+findProduct.selectedVarAttribs[option]+"</div>"));
	}
	jQuery("#findStoreDialog").append(jQuery("<div>STYLE #: "+id+"</div>"));
	
	//footer with form stuff
	jQuery("#findStoreDialog").append(jQuery("<div id='findStoreForm' ><div id='zipItems'>Zip Code: <br /><input id='zipInput'></div><div style='float:left;margin: 0 8px;'><br />OR</div>"));
	
	// Just states with stores in them.
	jQuery("#findStoreForm").append(jQuery("<div id='stateItems'>State: <br /><select id='stateInput'></select></div>"));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Select..." value="">Select...</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Arizona" value="AZ">Arizona</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Arkansas" value="AR">Arkansas</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="California" value="CA">California</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Colorado" value="CO">Colorado</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Florida" value="FL">Florida</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Georgia" value="GA">Georgia</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Idaho" value="ID">Idaho</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Illinois" value="IL">Illinois</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Indiana" value="IN">Indiana</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Iowa" value="IA">Iowa</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Kentucky" value="KY">Kentucky</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Louisiana" value="LA">Louisiana</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Minnesota" value="MN">Minnesota</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Missouri" value="MO">Missouri</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Montana" value="MT">Montana</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Nevada" value="NV">Nevada</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="New Mexico" value="NM">New Mexico</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="North Carolina" value="NC">North Carolina</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="North Dakota" value="ND">North Dakota</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Oregon" value="OR">Oregon</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="South Dakota" value="SD">South Dakota</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Tennessee" value="TN">Tennessee</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Texas" value="TX">Texas</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Utah" value="UT">Utah</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Virginia" value="VA">Virginia</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Wisconsin" value="WI">Wisconsin</option>'));
	jQuery("#stateInput").append(jQuery('<option class="selectoption" label="Wyoming" value="WY">Wyoming</option>'));

	jQuery("#findStoreForm").append(jQuery("<button id='zipSearch' ></button></div>"));
	
	jQuery("#findStoreDialog").dialog({
		autoOpen: false,
		height: 293,
    	width: 714,
    	title: "Enter your zip code and we'll tell you which stores have what you're looking for.",
    	dialogClass: "findStoreOuterDialog",
    	modal: true,
    	resizable: false,
    	draggable: false,
    	close: function(event, ui){
    		jQuery("#findStoreDialog").remove();
    		isValid=false;
    	} 
	});
	jQuery("#findStoreDialog").siblings().addClass("findStoreDialogTitle");
	jQuery("#findStoreDialog").dialog("open");
	
	// This makes the dialog to close when clicking
	// outside of the dialog.
	jQuery(".ui-widget-overlay").click (function () {
		jQuery("#findStoreDialog").dialog( "close" );
	});
}

var isZipSearch;
function fetchStores(thisProduct){
	
	findStoreFullZip = jQuery("#zipInput").val();
	var storeCount=0;
	var inStockStoreCount=0;

	var id = (thisProduct.master ? thisProduct.selectedVar.id : thisProduct.pid);
	
	var lookupData;
	var theState = jQuery("#stateInput").val();
	var theStateText = jQuery("#stateInput option:selected").text();
	
	if(findStoreFullZip!==""){
		isZipSearch=true;
		lookupData = {"pid": id, "zip": findStoreFullZip};
		cmCreateConversionEventTag("Find in Store (Search)","2","Find in Store", "2", "Product ID: " + id + " Zip Code: " + findStoreFullZip);				

	}else{
		isZipSearch=false;
		lookupData = {"pid": id, "city": "", "state": theState };
		cmCreateConversionEventTag("Find in Store (Search)","2","Find in Store", "2", "Product ID: " + id + " State: " + theState);				

	}
	
	app.ajax.getJson({
		url		: fullInStoreJSONURL,
		data	: lookupData,
		callback: function(data){
		
			jQuery(".findStoreDialogTitle span").empty().append(jQuery("<img src='/on/demandware.static/Sites-bootbarn_us-Site/-/default/v1352943895563/images/logo.gif' />"));
			
			jQuery("#findStoreForm").remove();//take it off the end of the dialog 
			jQuery("#findStoreDialog").append("<div id='findStoreScrollable'><table class='findStoreTable'><thead><tr><th>Store</th><th style='border-right:0;'>Availability</th></tr></thead><tbody></tbody></table></div>")
			//prep and render data
			
			var hasStores=true;//false;
			var hasDistance=false;

			for (storeId in data.stores){				
				var aStore = data.stores[storeId];

				//console.log(aStore);
				if (aStore.isOnline) {
					storeCount++;

					//data prep
					var fullAddrString = aStore.address1+" "+aStore.address2+" "+aStore.city+" "+aStore.stateCode+" "+aStore.postalCode;
					var phone = aStore.phone;
					var fax = aStore.fax;//BEN: NOT USED IN COMP
					var hours = aStore.storeHours;
					var theDist;
					if(aStore.distance!=null && aStore.distance!="" && aStore.distance != 0){
						hasDistance=true;
						theDist = aStore.distance;
					}else if(isZipSearch){
						hasDistance=true;
						theDist = 0;
					}
									
					var availCount = parseInt(aStore.availableInventory);
					var availText = "In Stock";
									
					if(availCount<=0){
						availText = "Out of Stock";
					}else if(availCount<2){
						inStockStoreCount++;
						availText = "1 Available <div style='font-size:10px;margin-top:16px;'>Please call store directly to verify this item is still available</div>";
					}else{
						inStockStoreCount++;
						availText = "In Stock";
					}
				
					var rowText = "<tr class='findStoreDataRow'>";
					if(hasDistance){
						rowText+="<td valign='top'>"+theDist +" miles</td>";
					}
					rowText+="<td valign='top'><b>"+aStore.name+"</b><br />"+fullAddrString+"<br />"+phone+"<br /><br />"+hours+"<br /><a href='/on/demandware.store/Sites-bootbarn_us-Site/default/Stores-Details?StoreID="+storeId+"'>See map and details</a></td><td valign='top'><b>"+availText+"</b></td></tr>";
				
					jQuery("#findStoreDialog .findStoreTable tbody").append(rowText);
				}
			}
			
			var whereWeLooking="";
			var storeText = " Store"
			if (storeCount != 1) {
				storeText = storeText + "s";
			}

			if(findStoreFullZip!=""){
				//ZIP CODE SEARCH
				jQuery("#findStoreDialog table.findStoreTable thead tr").prepend("<th>Distance</th>");

				jQuery("#findStoreScrollable").before(jQuery("<div id='storeCountText'>"+storeCount+ storeText + " near Zip Code: "+findStoreFullZip+ " - " +inStockStoreCount+ " with the Product in Stock."+"</div>"));
				whereWeLooking = findStoreFullZip;
			}else{
				//STATE SEARCH
				jQuery("#findStoreScrollable").before(jQuery("<div id='storeCountText'>"+storeCount+ storeText + " in "+theStateText + " - " +inStockStoreCount+  " with the Product in Stock."+"</div>"));
				whereWeLooking = theStateText;
			}
			
			
			if(!hasStores){
				jQuery("#findStoreScrollable").remove();
				//jQuery("#findStoreDialog").append("<div style='clear:both;font-size:18px;'>Sorry, no stores close to "+whereWeLooking+" have this product in stock.</div>");
			}else{			
				//strip off header and put outside the table for scrolling table contents
				var theCurrHeader = jQuery(".findStoreTable thead").html();
				//cut off the header...
				jQuery(".findStoreTable thead").remove();
				
				var theWidths = new Array();
				
				//throw it on top
				jQuery("#findStoreScrollable").before(jQuery("<table class='findStoreTable' id='tableHeader'>"+theCurrHeader+"</table>"));
				
				//get max width
				for(var i=0;i<jQuery(".findStoreTable:last tr:first").children().length;i++){
					
			        var theTH = jQuery(jQuery(".findStoreTable:last tr:first").children()[i]);
			        
			        var theWidth = theTH.width();
			        theWidths[i]=theWidth;
				}
				
				for(var i=0;i<jQuery("#tableHeader tr th").length;i++){
					
			        var theTH = jQuery(jQuery("#tableHeader tr th")[i]);
			        //console.log(theTH);
			        theTH.width(theWidths[i]); 
				}
				
				jQuery("#findStoreDialog").append(jQuery("<div id='bottomText' style='margin-top:6px;'>"+jQuery("#findStoreBottomContent").html()+"</div>"));
				var botHeight = jQuery("#bottomText").height();
				
				jQuery("#findStoreDialog").height(530+botHeight);
				
				var oldTop = jQuery("#findStoreDialog").parent().position().top;
				jQuery("#findStoreDialog").parent().css("top",oldTop-94-botHeight);
			}

			jQuery(".findStoreDialogTitle span").empty().append(jQuery("<img src='/on/demandware.static/Sites-bootbarn_us-Site/-/default/v1352943895563/images/logo.gif' />"));
			
		}
	});
	
}
