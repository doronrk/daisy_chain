var busy = false;

function Add2ShopCart(form, isAjax, field1, field2, viewType, breadcrumbs)
{
  //alert("catentryId="+form.catEntryId.value);
  var field1Value = field1;

  var color = document.getElementById("colorSelect").value;
  var size = document.getElementById("sizeSelect").value;
  if (size == "")
  {
    alert("Please select a Size");
    //return;
  }
  if (color == "")
  {
    if($(".color.selected").length > 0){
      $(".color.selected").click();
      Add2ShopCart(form, isAjax, field1, field2);
    }
    else{
      alert("Please select a Color");
      $("#sizeSelect").val("");
      updateColorCombo(document.getElementById("sizeSelect"));
      return;
    }
  }
  if (!busy && size != "" && color != "")
  {
    //calling tealium 'add to cart' tag
    callTealiumAddToCartTag(field2, 'full');

    busy = true;

    if(!isAjax) {
      form.action = "OrderItemAdd";
      //form.catEntryId.value = catEntryId;
      //form.quantity.value = catEntryQuantity;
      form.URL.value = 'OrderCalculate?updatePrices=1&calculationUsageId=-1&dummaryparam=1&URL=OrderItemDisplay';

      var cm_vc = getQuerystring("cm_vc");

      if (cm_vc != null && cm_vc != '') form.field2.value = cm_vc;

      disableButton("addToCartBtn");
      form.submit();
    }else{
      // getting ItemCatEntry from ProductDisplay
      var itemCatEntry= getItemCatenrtyBySizeColor(size, color);
      if(itemCatEntry!=null){
        requestSubmitted = false;

        var field2Value = field2;

        var cm_vc = getQuerystring("cm_vc");
        if (cm_vc != null && cm_vc != '') {
          field2Value = cm_vc;
        }

        field2Value = field2Value + "||" + viewType + "||" + breadcrumbs;

        categoryDisplayJS.setCommonParameters('-1',CommonContextsJS.storeId,CommonContextsJS.catalogId,'');
        categoryDisplayJS.AddItem2ShopCartAjax(itemCatEntry,document.getElementById('quantity').value,{'field1':field1Value,'field2':field2Value});
        busy = false;
      }else{
        busy = false;
        return;
      }
    }
  }
}

function addCatentryToBag(hasBandCupOptions,itemDoorFlag, categoryId, viewType, breadcrumbs) {
  clearErrorMessage();
  if(hasBandCupOptions) {
    var color = document.getElementById("colorSelect").value;
    var band = $(".band.selected").attr("data-band");
    var cup = $(".cup.selected").attr("data-cup");
    var missingSelection = false;
    if (color == "") {
      if($(".color.selected").length > 0){
        $(".color.selected").click();
        band = $(".band.selected").attr("data-band");
        cup = $(".cup.selected").attr("data-cup");
      }
      else{
        alert("Please select a Color");
        missingSelection = true;
      }
    }
    if (band == null) {
      alert("Please select a Band");
      missingSelection = true;
    }
    if (cup == null) {
      alert("Please select a Cup");
      missingSelection = true;
    }
    if (missingSelection) {
      return;
    }
  }
  Add2ShopCart(document.addItems, true, itemDoorFlag, categoryId, viewType, breadcrumbs);
}



//This javascript function is used by the 'Add to Wish List' button to set appropriate values before the form is submitted
function Add2WishList(form)
{
  var color = document.getElementById("colorSelect").value;
  var size = document.getElementById("sizeSelect").value;
  if (size == "")
  {
    alert("Please select a Size");
    //return;
  }
  if (color == "")
  {
    alert("Please select a Color");
  }
  if (!busy && size != "" && color != "")
  {
    busy = true;
    form.action = "InterestItemAdd";
    //form.catEntryId.value = catEntryId;
    var itemCatEntryId = getItemCatenrtyBySizeColor(size, color);
    form.catEntryId_1.value = itemCatEntryId;

    form.URL.value = 'InterestItemDisplay';

    disableButton("addToWishBtn");
    form.submit();
  }
}

//This javascript function is used by the 'Save to My Favorites' button to set appropriate values before the form is submitted
function saveToMyFavorites(hasBandCupOptions) {
  var form = document.addItems;

  if(hasBandCupOptions) {
    var color = document.getElementById("colorSelect").value;
    var band = $(".band.selected").attr("data-band");
    var cup = $(".cup.selected").attr("data-cup");
    var missingSelection = false;
    if (color == "") {
      alert("Please select a Color");
      missingSelection = true;
    }
    if (band == null) {
      alert("Please select a Band");
      missingSelection = true;
    }
    if (cup == null) {
      alert("Please select a Cup");
      missingSelection = true;
    }
    if (missingSelection) {
      return;
    }
  }

  var color = document.getElementById("colorSelect").value;
  var size = document.getElementById("sizeSelect").value;
  if (color == "") {
    alert("Please select a Color");
  }
  if (size == "") {
    alert("Please select a Size");
  }

  if (!busy && size != "" && color != "") {
    busy = true;
    form.action = "InterestItemAdd";

    // Getting itemCatEntryId from ProductDisplay
    var itemCatEntryId = getItemCatenrtyBySizeColor(size, color);

    form.catEntryId_1.value = itemCatEntryId;
    form.URL.value = 'InterestItemDisplay';

  //Tealium 'add to favorites' In Page Activity Tag
    var userType = "guest"
  var userIdCookie = "WC_USERACTIVITY_";
  var welcomeCookie = "welcome_cookie";
  var deviceType = "device_type";
  var entryDoorCookie = "entryDoorId";
  var activeDoorCookie = "doorId";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      if (ca[i].indexOf(userIdCookie) != -1) {
          var userId = ca[i].substring(userIdCookie.length + 1, ca[i].indexOf("="));
      } else if (ca[i].indexOf(welcomeCookie) != -1) {
          var userType = "registered";
      } else if (ca[i].indexOf(deviceType) != -1) {
          var visitor_device = ca[i].substring(deviceType.length + 2 ,ca[i].length);
      } else if (ca[i].indexOf(entryDoorCookie) != -1) {
          var entryDoorId = ca[i].substring(entryDoorCookie.length + 2 ,ca[i].length);
      } else if (ca[i].indexOf(activeDoorCookie) != -1) {
          var doorId = ca[i].substring(activeDoorCookie.length+2 ,ca[i].length);
      }
  }

    var productName = document.getElementById("productName").value;
    var style = document.getElementById("style").value;
    var categoryId = document.getElementById("categoryId").value;

    utag.link({
        event_type : "saved_to_favorites",
        page_name : "Product:"+style+":"+productName,
        page_category_id : categoryId,
        product_wsc_category : categoryId,
        active_door : doorId ,
        visitor_device : visitor_device,
        entry_door : entryDoorId ,
        login_state : userType ,
        non_pi_user_id : userId ,
        element_id : itemCatEntryId,
        product_review_ratings : "favorites-not available",
        product_review_count : "favorites-not available",
        product_view_type : "favorites-not available",
        element_category : "Saved to Favorites"
     });
   //END tealium

    form.submit();
  }
}

function getQuerystring(key)
{
  //get the current URL
  var url = window.location.toString(); //get the parameters
  url.match(/\?(.+)$/); var params = RegExp.$1; // split up the query string and store in an // associative array
  var params = params.split("&");

  for (var i = 0; i < params.length; i++)
  {
    var tmp = params[i].split("=");
    if (tmp[0] == key) return unescape(tmp[1]);
  }  //print all querystring in key value pairs

  return '';
}
