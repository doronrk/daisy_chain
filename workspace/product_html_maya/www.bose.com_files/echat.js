// eChatSendData contains the method used to send data to the Live Person server
eChatSendData = {
  sendData:function(varScope,varName,varValue)
  {
    if ((typeof(lpAddVars) === 'function') && (typeof(lpSendData) === 'function')) // Make sure that mtagconfig.js is loaded
    {

      // Use for onclick events
      if (varScope === 'session')
      {
        lpSendData(varScope,varName,varValue);
        // To compensate for the page refresh (not redirect) when these arguments are passed / events occur
        if((varValue == "Remove") | (varValue == "Update"))
        {
          lpAddVars(varScope,varName,varValue);
        }
      }
      // Use for page load events
      else if (varScope === 'page')
      {
        /* alert("Scope: " + varScope + "    Name: " + varName + "     Value: " + varValue); */
        lpAddVars(varScope,varName,varValue);
      }

    }
    else  // Remove/disable/comment out the alert before check in - it is for development and testing only
    {
      // alert('mtagconfig.js is not loaded' + '\nScope: ' + varScope + '\nVariable name: ' + varName + '\nVariable value: ' + varValue);
    }
  }
};

// eChatInit sets and sends SiteSection variable data to Live Person. SiteSection
// is the only variable (as of 7/8/09) that is sent from every page load. After
// sending SiteSection eChatInit branches off to the product object (eChatProducts)
// OR the shopping cart object (eChatCart) to execute section specific functions.
eChatInit = {
  lpSection:'',
  init:function()
  {
    var splitPageName = new Array;
    splitPageName = s.pageName.split(':');  // Split the Site Catalyst variable s.pageName on the colons
    eChatInit.lpSection = splitPageName[0]; // The piece we want is in splitPageName[0]
    eChatSendData.sendData('page','Section',eChatInit.lpSection); // Send the site section to Live Person

    if (eChatInit.lpSection == 'Shop Online')
    {
      eChatProducts.init();
    }
    else if (eChatInit.lpSection == 'Shop')
    {
      eChatCart.init();
    }
    else
    {
      return;
    }
    return;
  }
};

eChatProducts = {
  lpRawProductValue:'',
  lpProductValue:'',
  lpRawProductName:'',
  lpProductName:'',
  lpProductCategory:'',

  init:function()
  {
    // Check for the presence of a left nav on the page - this would be all pages except shoponline
    if (document.getElementById('leftnav') !== null)
    {
      eChatProducts.sendProductCategory();  // Parses the Product Category out of the left nav and sends it to Live Person
    } else {
      eChatProducts.lpCategory = jQuery.trim(jQuery('title').html().replace("Bose | ", ""));
      eChatSendData.sendData('page','ProductCategory',eChatProducts.lpCategory);
    }

    // Execute following code only when the price variable (lp_product_value)
    // is found on the page. Finding the price variable indicate that we are
    // on a product page and we should send the price and product name.
    if(typeof(lp_product_value) === 'string')
    {
      eChatProducts.lpRawProductValue = lp_product_value; // Get the unformatted price from the page
      eChatProducts.lpProductValue = eChatProducts.trimPrice(eChatProducts.lpRawProductValue); // Format the price with trimPrice
      eChatSendData.sendData('page','ProductValue',eChatProducts.lpProductValue); // Send the formatted price to Live Person server
      eChatProducts.lpRawProductName = s.products; // Get the Site Catalyst s.products variable to use for the product name
      eChatProducts.lpProductName = eChatProducts.trimProductName(eChatProducts.lpRawProductName); // Format the product name with trimProductName
      eChatSendData.sendData('page','ProductName',eChatProducts.lpProductName); // Send the product name to Live Person server
    }
  },

  trimPrice:function(str)
  {
  // The product value (str) is formatted as XX.XX00 so we need
  // to trim off the trailing 00's and build out the string.
    var splitValue = new Array;
    splitValue = str.split('.');
    splitValue[2] = splitValue[1].substring(0,2);
    splitValue[3] = splitValue[0] + '.' + splitValue[2];
    return(splitValue[3]);
  },

  // The Trim function returns a text value with the leading and trailing spaces removed
  // Borrowed this function from mtagconfig.js
  lpTrimSpace:function(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g,"");
  },

  trimProductName:function(str)
  {
  // The product name (str) is a semi-colon delimited string.
  // We want everything between the first and second semi-colon.
    var splitValue = new Array;
    splitValue = str.split(';');
    return splitValue[1];
  },

  // Parse Product Category out of the left nav and send to Live Person
  // This is NOT an optimized solution as it is dependent on a consistent
  // naming convention and hierarchy for the structure of the left nav
  // On the other hand it seems to work reliably
  // 2012.08.27 - J.Sherer: Updated to support new HTML5 "leftnav"
  sendProductCategory:function()
  {
    var i=0;
    var lpl1NavNodes = new Array;
    var lpl1Nav;
    var lpProductCategoryDiv;
    var lpFirstDivClass;
    var lpFirstDivTitle;

    if (document.getElementById('l1navigation') != null) {
      lpl1nav = document.getElementById('l1navigation');
    }

    if (document.getElementById('leftnav') != null) {
      lpl1nav = document.getElementById('leftnav');
    }

    switch (lpl1nav.getAttribute('id')) {
      case "l1navigation":
        lpl1NavNodes = lpl1Nav.childNodes;
        lpProductCategoryDiv = eChatProducts.getFirstChild(lpl1NavNodes);
        lpProductCategoryClass = lpProductCategoryDiv.className;
        // Decide what to do based on the class name of the div. If the class name is navitem selected just get the nodeValue of the firstChild
        // If the class name is first navitem, get the firstChild that is not a text node (an a element), then get the nodeValue of the firstChild of the a element
        if (lpProductCategoryClass === 'navitem selected')
        {
          eChatProducts.lpCategory = eChatProducts.lpTrimSpace(lpProductCategoryDiv.firstChild.nodeValue);
        }
        else if (lpProductCategoryClass === 'first navitem')
        {
          lpl1NavNodes = lpProductCategoryDiv.childNodes;
          lpProductCategoryDiv = eChatProducts.getFirstChild(lpl1NavNodes);
          lpProductCategoryTitle = lpProductCategoryDiv.getAttribute('title');
          eChatProducts.lpCategory = eChatProducts.lpTrimSpace(lpProductCategoryDiv.firstChild.nodeValue);
        }
      break;

      case "leftnav":
       /* if (jQuery('#leftnav .selected').length > 1) {
          eChatProducts.lpCategory = jQuery.trim(jQuery('#leftnav .selected').eq(jQuery('#leftnav .selected').length - 2).text());
        } else {
          eChatProducts.lpCategory = jQuery.trim(jQuery('#leftnav .selected').text());
        } */
        eChatProducts.lpCategory = jQuery.trim(jQuery('#leftnav .selected').eq(0).text());
        //eChatProducts.lpCategory = jQuery.trim(jQuery('#leftnav .selected').last().text());
      break;
    }

      eChatSendData.sendData('page','ProductCategory',eChatProducts.lpCategory); // Now that we have a value for ProductCategory send it to Live Person
  },

  // Get the first node of nodeArray that is a type 1 node (element node)
  // nodeArray is an array of child nodes
  getFirstChild:function(nodeArray)
  {
    var i = 0;
    var elementNode;
    for (i = 0; i <= nodeArray.length; i++)
    {
      if (nodeArray[i].nodeType === 1)
      {
        elementNode = nodeArray[i];
        i = nodeArray.length;
        return elementNode;
      }
    }
  }
};

/* Live Person echat object for shopping cart pages */
/* Used in shopping cart process  to attach event   */
/* listeners to Update, Remove, Checkout, Save Cart */
/* and Continue Shopping links.                     */
eChatCart = {
  lpPageId:'',
  allLinks:'',
  saveCart:'',
  continueShopping:'',
  checkout1:'',
  checkout2:'',
  lpErrorCount:'',
  lpCartItems:'',
  lpCartTotal:'',

  getlpPageId:function() // Get lpPageId from global JS space - lpPageId is set in header include jsp
  {
    eChatCart.lpPageId = lpPageId;
    return;
  },

  init:function()
  {
    eChatCart.getlpPageId(); // Get and set the cart process pageid
    eChatSendData.sendData('page','ConversionStage',eChatCart.lpPageId);
    // Check My Cart, Addresses and Payment pages for errors. If there are any errors tell Live Person how many errors there are.
    if ((eChatCart.lpPageId == 'Shop:My Cart') || (eChatCart.lpPageId == 'Shop:Addresses') || (eChatCart.lpPageId == 'Shop:Payment'))
    {
      if (typeof(lpErrorCount) !== 'undefined')
      {
        eChatCart.lpErrorCount = lpErrorCount;
        eChatSendData.sendData('page','ErrorCounter',eChatCart.lpErrorCount);
      }
    }
    // Check to see if we are on the My Cart page - set up links and send Cart dollar total if we are
    if (eChatCart.lpPageId == 'Shop:My Cart')
    {
      if(!(document.getElementById("noitemsincart"))) {
              eChatCart.setUpMyCart();
      }

      eChatCart.sendCartTotals(); // Send Cart items and Cart dollar total to Live Person
    }
    // Check to see if we are on the Order Confirm page - send order amount and order number if we are
    if (eChatCart.lpPageId == 'Shop:Order Confirm')
    {
      eChatCart.sendOrderConfirm();
    }
    return;
  },

  sendCartTotals:function ()
  {
    if(typeof(lpCartItems) == "undefined") { eChatCart.lpCartItems = 0;} else { eChatCart.lpCartItems = lpCartItems;}
    if(typeof(lpCartTotal) == "undefined") { eChatCart.lpCartTotal = 0;} else {eChatCart.lpCartTotal = lpCartTotal;}
    eChatSendData.sendData('page','CartItems',eChatCart.lpCartItems);
    eChatSendData.sendData('page','CartTotal',eChatCart.lpCartTotal);
    return;
  },

  sendOrderConfirm:function()
  {
    if (eChatCart.lpPageId === 'Shop:Order Confirm')  // Double check that we are on the Order Confirm page
    {
      eChatSendData.sendData('page','OrderTotal',lpOrderTotal);
      eChatSendData.sendData('page','OrderNumber',lpOrderNumber);
    }
    return;
  },

  setUpMyCart:function()
  {
    eChatCart.getLinks();  // eChatCart.getLinks() finds and sets up the Update and Remove links. The rest of setUpMyCart sets up the continue shopping, checkout and save cart links
    eChatCart.checkout1 = document.getElementById('checkout1');
    eChatCart.checkout2 = document.getElementById('checkout2');
    eChatCart.saveCart = document.getElementById('savecart');
    eChatCart.continueShopping = document.getElementById('continueshopping');
    addEvent(eChatCart.checkout1, 'click', eChatCart.sendCheckOut, false);   // Attach event listener to Checkout buttons
    addEvent(eChatCart.checkout2, 'click', eChatCart.sendCheckOut, false);
    if (eChatCart.saveCart !== null) // Checking to see if we found the save cart link - it will not exist if coming from Product Support site
    {
      addEvent(eChatCart.saveCart, 'click', eChatCart.sendSaveCart, false);  // Attach event listener to Save Cart button
    }
    addEvent(eChatCart.continueShopping, 'click', eChatCart.sendContinueShopping, false);  // Attach event listener to Continue Shopping button
    return;
  },

  getLinks:function()
  {
    var numLinks;
    var firstChildValue;
    var linkType;
    eChatCart.allLinks = document.getElementsByTagName('a');
    numLinks = eChatCart.allLinks.length - 1;
    for (var i = 0; i <=numLinks; i++)
    {
      if  (eChatCart.allLinks[i].firstChild !== null) // Need to make sure that there is a .firstchild or .nodeValue crashes
      {
        firstChildValue = eChatCart.allLinks[i].firstChild.nodeValue;
        if(firstChildValue) // Validate that firstChildValue is NOT null
        {
          firstChildValue = firstChildValue.replace(/[^a-zA-Z 0-9 '.', '\-','\'']+/g,''); // Replace the special characters with nothing
          firstChildValue = firstChildValue.replace(/^\s+/, ''); // Replace any leading whitespace
          firstChildValue = firstChildValue.replace(/\s+$/, ''); // Replace any trailing whitespace
        }
        if (firstChildValue === 'Update')
        {
          addEvent(eChatCart.allLinks[i], 'click', eChatCart.sendUpdate, false);   // Attach event listener to Update links
        }
        if (firstChildValue === 'Remove')
        {
          addEvent(eChatCart.allLinks[i], 'click', eChatCart.sendRemove, false);   // Attach event listener to Remove links
        }
      }
    }
    return;
  },
  sendUpdate:function() // Event listener for Update links
  {
    eChatSendData.sendData('session','ConversionAction','Update');
    return true;
  },
  sendRemove:function() // Event listener for Remove links
  {
    eChatSendData.sendData('session','ConversionAction','Remove');
    return true;
  },
  sendSaveCart:function() // Event listener for the Save Cart link
  {
    eChatSendData.sendData('session','ConversionAction','SaveCart');
    return true;
  },
  sendContinueShopping:function() // Event listener for the Continue Shopping link
  {
    eChatSendData.sendData('session','ConversionAction','ContinueShopping');
    return true;
  },
  sendCheckOut:function() // Event listener for Checkout links
  {
    eChatSendData.sendData('session','ConversionAction','CheckOut');
    return true;
  }
}
if (typeof(addEvent) == 'undefined') {
  /* addEvent() - used to attach event listeners for Live Person eChat functionality */
  /* This version taken from Christian Heilmanns book; isbn 1-59059-680-3 */
  /* addEvent() is also located in scriptLib for headers that don't include global.js. *
  /* DAC 6/12/2006 */
  function addEvent(elm, evType, fn, useCapture)
  {
    if (elm.addEventListener)
    {
      elm.addEventListener(evType, fn, useCapture);
      return true;
    } 
    else if (elm.attachEvent)
    {
      var r = elm.attachEvent('on' + evType, fn);
      return r;
    }
    else
    {
      elm['on' + evType] = fn;
    }
  }
}
addEvent(window, 'load', eChatInit.init, false);
