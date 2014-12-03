function getValueFromCookie(cookieName) {
  var ca = document.cookie.split(';');
  var loginState = "guest";
  for(var i=0; i<ca.length; i++) {
    if (ca[i].indexOf(cookieName) != -1 && cookieName.indexOf("WC_USERACTIVITY_") != -1) {
          return ca[i].substring(cookieName.length + 1, ca[i].indexOf("="));
      } else if (ca[i].indexOf(cookieName) != -1 && cookieName.indexOf("welcome_cookie") != -1) {
        loginState = "registered";
      } else if (ca[i].indexOf(cookieName) != -1 ) {
          return ca[i].substring(cookieName.length + 2 ,ca[i].length);
      }
  }
  return loginState;
}


function addNarrowByFilterInPageTag(filterCategory, filterSelection, searchTerm, pageName, lastCategoryDisplay, categoryId) {

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");

    var breadcrumbFilters = "";
    for (var i=1; i < 5; i++) {
      if (document.getElementById("bc-filters_" + i) != null) {
        breadcrumbFilters = breadcrumbFilters + document.getElementById("bc-filters_" + i).innerHTML.trim() + "|";
      }
    }
    var breadcrumbs = "Home|";
    if (document.getElementById("breadcrumb_current") == null) {
      breadcrumbs = breadcrumbs   + searchTerm+ "|" + filterSelection;
    } else {
      breadcrumbs = breadcrumbs  + document.getElementById("breadcrumb_current").innerHTML + "|" + breadcrumbFilters + filterSelection;
    }

    var linkObject = {

            page_name : pageName,
            active_door : activeDoor ,
            entry_door : entryDoor ,
            login_state : loginState ,
            non_pi_user_id : userId ,
            filter_category : filterCategory,
            filter_selection : filterSelection,
            visitor_device : visitorDevice
         };
    if(lastCategoryDisplay != null && lastCategoryDisplay != '') {
      //subcategory display
      linkObject.event_type = "subcategory_narrow_by_filter";
      linkObject.element_id = lastCategoryDisplay;
      linkObject.page_category_id = categoryId.toString();
      linkObject.element_category = "SubCategory Narrow by Filter";
    } else {
      //search
      linkObject.event_type = "search_narrow_by_filter";
      linkObject.search_results_page1 = "no";
      linkObject.element_id = searchTerm;
      linkObject.page_breadcrumb = breadcrumbs;
      linkObject.page_category_id = "Search Results";
      linkObject.element_category = "Search Narrow by Filter";
    }
    utag.link(linkObject);
}

function addNarrowByFilterSelectInPageTag(filterCategory, filterSelection, searchTerm, pageName, lastCategoryDisplay, categoryId) {

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");

    var select = document.getElementById("facet-select-box");
    var filterSelection = select.options[select.selectedIndex].text;
    if(filterCategory == "Size") {
        var filterArray = filterSelection.split(" ");
        var filter = filterArray[0];
    } else {
        var filter = filterSelection;
    }

    var breadcrumbFilters = "";
    for (var i=1; i < 5; i++) {
      if (document.getElementById("bc-filters_" + i) != null) {
        breadcrumbFilters = breadcrumbFilters + document.getElementById("bc-filters_" + i).innerHTML.trim() + "|";
      }
    }

    if (breadcrumbFilters == "") {
      var breadcrumbs = "Home|"+ searchTerm+ "|" + filter;
    } else {
      var breadcrumbs = document.getElementById("breadcrumb_current").innerHTML + "|" + breadcrumbFilters + filter;
    }

    var linkObject = {

            page_name : pageName,
            active_door : activeDoor ,
            entry_door : entryDoor ,
            login_state : loginState ,
            non_pi_user_id : userId ,
            filter_category : filterCategory,
            filter_selection : filter,
            visitor_device : visitorDevice
         };
    if(lastCategoryDisplay != null && lastCategoryDisplay != '') {
      //subcategory display
      linkObject.event_type = "subcategory_narrow_by_filter";
      linkObject.element_id = lastCategoryDisplay;
      linkObject.page_category_id = categoryId.toString();
      linkObject.element_category = "SubCategory Narrow by Filter";
    } else {
      //search
      linkObject.event_type = "search_narrow_by_filter";
      linkObject.search_results_page1 = "no";
      linkObject.element_id = searchTerm;
      linkObject.page_breadcrumb = breadcrumbs;
      linkObject.page_category_id = "Search Results";
      linkObject.element_category = "Search Narrow by Filter";
    }
    utag.link(linkObject);
}

function addAddToCartFromFavoritesInPageTag(statusCount) {

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");
    var formattedPrice = document.getElementById("itemPrice_" + statusCount).value
    var priceArray = formattedPrice.split("$");
    var price = priceArray[1];

    utag.link({
      event_type : "add_to_cart",
      page_name : "Favorites",
      page_category_id : "Favorites",
      page_type : "Favorites",
      active_door : activeDoor,
      entry_door : entryDoor,
      visitor_device : visitorDevice,
      product_color : [ document.getElementById("colorName_" + statusCount).value ],
      product_size  : [ document.getElementById("sizeName_" + statusCount).value ],
      product_wsc_category : [ "Favorites" ],
      product_view_type : [ "favorites-not available" ],
      product_ratings_count : [ "favorites-not available" ],
      product_ratings_average : [ "favorites-not available" ],
      product_quantity : [ "1" ],
      product_name : [ document.getElementById("productName_" + statusCount).value ],
      product_id : [ document.getElementById("partNumber_" + statusCount).value ],
      product_door : [ activeDoor ],
      product_net_price : [ price ],
      product_availability : [ document.getElementById("productAvailability_" + statusCount).value  ],
      login_state : loginState,
      non_pi_user_id : userId,

    });
}

function addAddAllToCartFromFavoritesInPageTag(numberOfItems) {

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");

    var price = [];
    var productColor = [];
    var productSize = [];
    var productName = [];
    var productId = [];
    var productAvailability = [];
    var productWCSCat = [];
    var productViewType = [];
    var productRatingsCount = [];
    var productRatingsAvg = [];
    var productQty = [];
    var productActiveDoor = [];

    for (i = 1; i <= numberOfItems; i++) {

        var formattedPrice = document.getElementById("itemPrice_" + i).value
        var priceArray = formattedPrice.split("$");
        price.push(priceArray[1]);

        productColor.push(document.getElementById("colorName_" + i).value);
        productSize.push(document.getElementById("sizeName_" + i).value);
        productName.push(document.getElementById("productName_" + i).value);
        productId.push(document.getElementById("partNumber_" + i).value);
        productAvailability.push(document.getElementById("productAvailability_" + i).value);
        productWCSCat.push("Not Available");
        productViewType.push("Not Available");
        productRatingsCount.push("Not Available");
        productRatingsAvg.push("Not Available");
        productQty.push("1");
        productActiveDoor.push(activeDoor);
    }



    utag.link({
      event_type : "add_to_cart",
      page_name : "Favorites",
      page_category_id : "Favorites",
      page_type : "Favorites",
      active_door : activeDoor,
      entry_door : entryDoor,
      visitor_device : visitorDevice,
      product_color : productColor,
      product_size  : productSize,
      product_wsc_category : productWCSCat,
      product_view_type : productViewType,
      product_ratings_count : productRatingsCount,
      product_ratings_average : productRatingsAvg,
      product_quantity : productQty,
      product_name : productName,
      product_id : productId,
      product_door : productActiveDoor,
      product_net_price :  price ,
      product_availability : productAvailability,
      login_state : loginState,
      non_pi_user_id : userId,

    });
}


function addSearchPaginationInPageInPageTag(pageNumber, searchTerm, pageName, pageCategoryId, lastCategoryDisplay) {

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");


    if(pageName.indexOf("Search") != -1 && pageNumber == "view all") {
      utag.link({
          event_type : "search_view_all",
          page_name : pageName,
          page_category_id : pageCategoryId,
          active_door : activeDoor ,
          entry_door : entryDoor ,
          login_state : loginState ,
          non_pi_user_id : userId ,
          element_id : searchTerm,
          search_results_page1 : "no",
          visitor_device : visitorDevice,
          element_category: "Search View All"
       });
    } else if(pageName.indexOf("Search") != -1 ) {
        utag.link({
            event_type : "search_pagination_interaction",
            page_name : pageName,
            page_category_id : pageCategoryId,
            active_door : activeDoor ,
            entry_door : entryDoor ,
            login_state : loginState ,
            non_pi_user_id : userId ,
            element_id : searchTerm,
            search_results_page1 : "no",
            visitor_device : visitorDevice,
            page_number : parseInt(pageNumber).toString(),
            element_category: "Search Pagination Interaction"
         });
      } else if(pageName.indexOf("Subcategory") != -1 && pageNumber == "view all") {

        utag.link({
            event_type : "subcategory_view_all",
            page_name : pageName,
            page_category_id : pageCategoryId,
            active_door : activeDoor ,
            entry_door : entryDoor ,
            login_state : loginState ,
            non_pi_user_id : userId ,
            visitor_device : visitorDevice,
            element_id : lastCategoryDisplay,
            element_category: "SubCategory View All"
         });
      } else if (pageName.indexOf("Subcategory") != -1) {
        utag.link({
              event_type : "subcategory_pagination_interaction",
              page_name : pageName,
              page_category_id : pageCategoryId,
              active_door : activeDoor ,
              entry_door : entryDoor ,
              login_state : loginState ,
              non_pi_user_id : userId ,
              visitor_device : visitorDevice,
              page_number : parseInt(pageNumber).toString(),
              element_id : lastCategoryDisplay,
              element_category: "Subcategory Pagination Interaction"
           });
        }
}

function addSocialShareInPageTag(pageName, socialShareType) {
/*
  8) product_id - Example Value: ["W9001"]
  */

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");


    utag.link({
            page_name : pageName,
            active_door : activeDoor ,
            entry_door : entryDoor ,
            login_state : loginState ,
            non_pi_user_id : userId ,
            visitor_device : visitorDevice,
            event_type : "social_share",
            page_category_id : document.getElementById("categoryId").value,
            social_share_type : socialShareType,
            element_id : [document.getElementById("partNumberT").value],
            element_category : "Social Share"
         });
}




function addCrossBrandSearchInPageTag(newDoor, searchTerm ) {
      var userId = getValueFromCookie("WC_USERACTIVITY_");
      var loginState = getValueFromCookie("welcome_cookie");
      var activeDoor = getValueFromCookie("doorId");
      var entryDoor = getValueFromCookie("entryDoorId");
      var visitorDevice = getValueFromCookie("device_type");

      utag.link({
              page_name : "Search Results: Successful",
              active_door : activeDoor ,
              entry_door : entryDoor ,
              login_state : loginState ,
              non_pi_user_id : userId ,
              visitor_device : visitorDevice,
              event_type : "cross_brand_search_click",
              page_category_id : "Search Results",
              original_door : activeDoor,
              new_door : newDoor,
              element_id : searchTerm,
              element_category : "Cross Brand Search Click"
           });
  }

function addSearchSortInPageTag(searchTerm, pageName, pageCategoryId, lastCategoryDisplay, sortType) {

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");

    if(pageName.indexOf("Search") != -1 ) {
        utag.link({
            event_type : "search_sort_order_changed",
            page_name : pageName,
            page_category_id : pageCategoryId,
            active_door : activeDoor ,
            entry_door : entryDoor ,
            login_state : loginState ,
            non_pi_user_id : userId ,
            element_id : searchTerm,
            search_results_page1 : "no",
            visitor_device : visitorDevice,
            sort_type : sortType,
            element_category: "Search Sort Order Changed"
         });
      } else if (pageName.indexOf("Subcategory") != -1) {
        utag.link({
              event_type : "subcategory_sort_order_changed",
              page_name : pageName,
              page_category_id : pageCategoryId,
              active_door : activeDoor ,
              entry_door : entryDoor ,
              login_state : loginState ,
              non_pi_user_id : userId ,
              visitor_device : visitorDevice,
              element_id : lastCategoryDisplay,
              sort_type : sortType,
              element_category: "SubCategory Sort Order Changed"
           });
        }
}

function addFormErrorInPageTag(errorMessage, eventType, pageName, pageCategoryId, pageType) {
  var userId = getValueFromCookie("WC_USERACTIVITY_");
  var loginState = getValueFromCookie("welcome_cookie");
  var activeDoor = getValueFromCookie("doorId");
  var entryDoor = getValueFromCookie("entryDoorId");
  var visitorDevice = getValueFromCookie("device_type");

  utag.link({
      event_type : eventType,
      page_name : pageName,
      page_category_id : pageCategoryId,
      active_door : activeDoor ,
      entry_door : entryDoor ,
      login_state : loginState ,
      non_pi_user_id : userId ,
      visitor_device : visitorDevice,
      page_type : pageType,
      element_id : errorMessage,
      element_category : "Form Errors"
  });
}
function addRegistrationErrorInPageTag(errorMessage, pageName) {
  addFormErrorInPageTag(errorMessage, 'form_error', pageName, 'My Account', 'My Account');
}

function addAddressErrorInPageTag(errorMessage) {
    addFormErrorInPageTag(errorMessage, 'form_error', 'Add Address', 'My Account', 'My Account');
}

function addLogonErrorInPageTag(errorMessage) {
    addFormErrorInPageTag(errorMessage, 'form_error', 'Login', 'My Account', 'My Account');
}

function addGuestCheckoutErrorInPageTag(errorMessage) {
    addFormErrorInPageTag(errorMessage,'form_error', 'Billing Shipping', 'Checkout', 'Checkout:Billing Shipping');
}

function addPaymentCheckoutErrorInPageTag(errorMessage) {
    addFormErrorInPageTag(errorMessage,'form_error', 'Payment & Review', 'Checkout', 'Checkout:Payment & Review');
}

function addContanctUsErrorInPageTag(errorMessage) {
    addFormErrorInPageTag(errorMessage,'form_error', 'Contact Us', 'Contact Us', 'Contact Us');
}

function addForgotPaswordErrorInPageTag(errorMessage) {
    addFormErrorInPageTag(errorMessage,'form_error', 'Forgot Password', 'Forgot Password', 'Forgot Password');
}

function addQuickViewInPageTag(pageName, productName, partNumber) {

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");

    if (document.getElementById("WC_BreadCrumbTrailDisplay_link_5a.a") != null) {
        var department = document.getElementById("WC_BreadCrumbTrailDisplay_link_5a.a").innerHTML;
        var wscCategory = document.getElementById("productCategoryId").innerHTML
      } else {
        var department = "Search";
        var wscCategory = "Search";
      }
      if (document.getElementById("breadcrumb_category") != null) {
        var category = document.getElementById("breadcrumb_category").innerHTML;
      } else {
      var category = "Search";
      }
      if (document.getElementById("breadcrumb_current") != null ) {
        var subcategory = document.getElementById("breadcrumb_current").innerHTML;
      } else {
      var subcategory = "Search";
      }

    utag.link({
        event_type : "quick_view",
        page_name : pageName,
        page_category_id : document.getElementById("productCategoryId").innerHTML,
        page_type : "pdp",
        active_door : activeDoor ,
        visitor_device : visitorDevice,
        product_wsc_category : [wscCategory] ,
        product_view_type : ["quick view"],
        product_name : [productName] ,
        product_id : [partNumber] ,
        product_door : [activeDoor] ,
        product_availability  : ["qv-not available"],
        product_department : [  department ],
        product_category : [ category  ],
        product_subcategory : [  subcategory ],
        product_ratings_average : [ "qv-not available" ],
        product_ratings_count  : [ "qv-not available" ],
        entry_door : entryDoor ,
        login_state : loginState ,
        non_pi_user_id : userId

      });
      //END tealium


}

function addEmailCaptureGuestCheckoutInPageTag() {

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");

    if (document.getElementById("WC_BreadCrumbTrailDisplay_link_5a.a") != null) {
        var department = document.getElementById("WC_BreadCrumbTrailDisplay_link_5a.a").innerHTML;
      } else {
      var department = "no department";
      }
      if (document.getElementById("breadcrumb_label") != null) {
        var category = document.getElementById("breadcrumb_label").innerHTML;
      } else {
      var category = "no category";
      }
      if (document.getElementById("breadcrumb_current") != null ) {
        var subcategory = document.getElementById("breadcrumb_current").innerHTML;
      } else {
      var subcategory = "no subcategory";
      }

      var stateSelect = document.getElementById("billStateDisplay");
      var state = stateSelect.options[stateSelect.selectedIndex].value;

    utag.link({
        event_type : "email_captured",
        page_name : "Checkout:Sign In",
        page_category_id : "Shopping Bag",
        page_type : "Shopping Bag",
        active_door : activeDoor ,
        visitor_device : visitorDevice,
        event_id : "Checkout - Billing & Shipping",
        entry_door : entryDoor ,
        login_state : loginState ,
        non_pi_user_id : userId,
        customer_city : document.getElementById("billCity").value,
        customer_country : "US",
        customer_email : document.getElementById("billEmail").value,
        customer_id : document.getElementById("billEmail").value,
        customer_state : state,
        customer_zip : document.getElementById("billZipCode").value,
        event_category: "Email Signup"

      });
      //END tealium


}
function addRecentlyViewedQuickViewInPageTag(pageName, productName, partNumber) {

    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");

    utag.link({
        event_type : "quick_view",
        page_name : pageName,
        page_category_id : document.getElementById("categoryId").value,
        page_type : "pdp",
        active_door : activeDoor ,
        visitor_device : visitorDevice,
        product_wsc_category : ["Recently Viewed"] ,
        product_view_type : ["quick view"],
        product_name : [productName] ,
        product_id : [partNumber] ,
        product_door : [activeDoor] ,
        product_availability  : ["qv-not available"],
        product_department : [  "Recently Viewed" ],
        product_category : [ "Recently Viewed"  ],
        product_subcategory : [  "Recently Viewed" ],
        product_ratings_average : [ "qv-not available" ],
        product_ratings_count  : [ "qv-not available" ],
        entry_door : entryDoor ,
        login_state : loginState ,
        non_pi_user_id : userId

      });

}

function addCatalogRequestInPageTag() {

  //Global Parameters
  var userId = getValueFromCookie("WC_USERACTIVITY_");
  var loginState = getValueFromCookie("welcome_cookie");
  var activeDoor = getValueFromCookie("doorId");
  var entryDoor = getValueFromCookie("entryDoorId");
  var visitorDevice = getValueFromCookie("device_type");

  //Custom Parameters
  var stateSelect = document.getElementById("stateDisplay");
  var state = stateSelect.options[stateSelect.selectedIndex].value;

  //Declare linkObject
  var linkObject = {
      //Global Variables
      page_name : "Catalog Request", //Varies based on parent page
      page_type : "Static Content", //Varies based on parent page
      page_category_id : "Static Content", //Varies based on parent page
      entry_door : entryDoor,
      active_door : activeDoor,
      login_state : loginState,
      non_pi_user_id : userId,
      visitor_device : visitorDevice,

      //Custom Variables
      event_type : "email_captured",
      catalog_cvweb : document.getElementById("catalog_cvweb").checked,
      catalog_jmsweb : document.getElementById("catalog_jmsweb").checked,
      customer_first_name : document.getElementById("firstName").value,
      customer_last_name : document.getElementById("lastName").value,
      customer_address : document.getElementById("address1").value,
      customer_city : document.getElementById("cityValue").value,
      customer_state : state,
      customer_zip : document.getElementById("zipCode").value,
      customer_email : document.getElementById("email1").value,
      event_id : "Catalog Request",
      event_category : "Email Signup",
      customer_id : document.getElementById("email1").value
  };

  //Invoke utag.link() containing linkObjects{}
  utag.link(linkObject);
}

function addContactUsByEmailInPageTag() {

  //Global Parameters
  var userId = getValueFromCookie("WC_USERACTIVITY_");
  var loginState = getValueFromCookie("welcome_cookie");
  var activeDoor = getValueFromCookie("doorId");
  var entryDoor = getValueFromCookie("entryDoorId");
  var visitorDevice = getValueFromCookie("device_type");

  //Custom Parameters
  var stateSelect = document.getElementById("stateDisplay");
  var state = stateSelect.options[stateSelect.selectedIndex].value;

  //For "Retail Consumer(locate product/questions)"
  var productSelect = document.getElementById("productListCU");
  var product = productSelect.options[productSelect.selectedIndex].value;

  //Declare linkObject
  var linkObject = {
    //Global Variables
    page_name : "Contact Us By Email", //Varies based on parent page
    page_type : "Static Content", //Varies based on parent page
    page_category_id : "Static Content", //Varies based on parent page
    entry_door : entryDoor,
    active_door : activeDoor,
    login_state : loginState,
    non_pi_user_id : userId,
    visitor_device : visitorDevice,

    //Custom Variables
    event_type : "email_captured",
    subject : document.getElementById("subject").value,
    customer_first_name : document.getElementById("firstName").value,
    customer_last_name : document.getElementById("lastName").value,
    customer_address : document.getElementById("address1").value,
    customer_city : document.getElementById("cityValue").value,
    customer_state : state,
    customer_zip : document.getElementById("zipCode").value,
    customer_email : document.getElementById("email1").value,
    order_confirmation : document.getElementById("orderConfirmation").value,
    response_needed : document.getElementById("responseNeededYes").checked,
    event_id : "Contact Us By Email",
    event_category : "Email Signup",
    customer_id : document.getElementById("email1").value,

    //For "Change Email Program Address"
    email_old_1 : document.getElementById("emailOld1").value,
    email1_conf : document.getElementById("email1Conf").value,

    //For "Retail Consumer(locate product/questions)"
    customer_country : "US",
    product : product
  };

  //Invoke utag.link() containing linkObjects{}
  utag.link(linkObject);
}

function addEmailCaptureInPageTag() {

  var customer_state = document.getElementById("customer_state");

  if(customer_state != null && customer_state.value != null && customer_state.value != '') {

    var userType = "guest"
    var userIdCookie = "WC_USERACTIVITY_";
    var welcomeCookie = "welcome_cookie";
    var deviceType = "device_type";
    var entryDoorCookie = "entryDoorId";
    var activeDoorCookie = "doorId";
    var ca = document.cookie.split(';');

    for(var i=0; i<ca.length; i++) {
        if (ca[i].indexOf(welcomeCookie) != -1) {
          var userType = "registered";
        } else if (ca[i].indexOf(deviceType) != -1) {
          var visitor_device = ca[i].substring(deviceType.length+2 ,ca[i].length);
        } else if (ca[i].indexOf(entryDoorCookie) != -1) {
          var entryDoorId = ca[i].substring(entryDoorCookie.length + 2 ,ca[i].length);
        } else if (ca[i].indexOf(activeDoorCookie) != -1) {
          var doorId = ca[i].substring(activeDoorCookie.length+2 ,ca[i].length);
        } else if (ca[i].indexOf(userIdCookie) != -1) {
          var userId =  ca[i].substring(userIdCookie.length + 1, ca[i].indexOf("="));
        }
    }

    customer_state = customer_state.value;
    var customer_city = document.getElementById("customer_city").value;
    var customer_country = document.getElementById("customer_country").value;
    var customer_zip = document.getElementById("customer_zip").value;
    var customer_email = document.getElementById("customer_email").value;
    var email_signup_location = document.getElementById("email_signup_location").value;
    var page_type =   document.getElementById("page_type").value;
    var page_category_id =   document.getElementById("page_category_id").value;

    //Declare linkObject
    var linkObject = {
      event_type : "email_captured",
      page_type : page_type,
      active_door : doorId,
      visitor_device : visitor_device,
      entry_door : entryDoorId,
      login_state : userType,
      non_pi_user_id : userId,
      customer_state : customer_state,
      customer_city : customer_city,
      customer_country : customer_country,
      customer_zip : customer_zip,
      customer_email : customer_email,
      event_id : email_signup_location,
      page_name : email_signup_location,
      customer_id : customer_email,
      page_category_id : page_category_id,
      event_category : "Email Signup"
    };

    //Invoke utag.link() containing linkObjects{}
    utag.link(linkObject);

  }
}

function addEmailSignUpInPageTag(emailAddress) {

    //Global Parameters
    var userId = getValueFromCookie("WC_USERACTIVITY_");
    var loginState = getValueFromCookie("welcome_cookie");
    var activeDoor = getValueFromCookie("doorId");
    var entryDoor = getValueFromCookie("entryDoorId");
    var visitorDevice = getValueFromCookie("device_type");

    //Custom Parameters
    if (document.getElementById("WC_BreadCrumbTrailDisplay_link_5a.a") != null) {
        var department = document.getElementById("WC_BreadCrumbTrailDisplay_link_5a.a").innerHTML;
    } else {
        var department = "no department";
    }
    if (document.getElementById("breadcrumb_label") != null) {
        var category = document.getElementById("breadcrumb_label").innerHTML;
    } else {
        var category = "no category";
    }
    if (document.getElementById("breadcrumb_current") != null) {
        var subcategory = document.getElementById("breadcrumb_current").innerHTML;
    } else {
        var subcategory = "no subcategory";
    }

    //Declare linkObject
    var linkObject = {
        //Global Variables
        page_name: "Email Signup", //Varies based on parent page
        page_type: "Static Content", //Varies based on parent page
        page_category_id: "Static Content", //Varies based on parent page
        entry_door: entryDoor,
        active_door: activeDoor,
        login_state: loginState,
        non_pi_user_id: userId,
        visitor_device: visitorDevice,

        //Custom Variables
        event_type: "email_captured",
        customer_email: emailAddress,
        event_id: "Email Signup",
        event_category: "Email Signup",
        customer_id: emailAddress
    };

    //Invoke utag.link() containing linkObjects{}
    utag.link(linkObject);
}