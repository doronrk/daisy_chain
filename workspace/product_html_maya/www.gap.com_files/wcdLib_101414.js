var WCDLibrary = Class.create();

WCDLibrary.prototype = {

	hasFirstGridReadyEventFired : false,
    initialize: function() {
		
		//check for scrollTo request in queryString (i.e. &scrollTo=ThisHeader)
		//ONLY on category pages
		scrollToRequest = gidLib.getQuerystringParam("scrollTo");		
		if(location.pathname == "/browse/category.do" && scrollToRequest != ""){
			var self = this;
			
			//observe old event, but only once (i.e. first page load, not evertime a facet is changed)
			Event.observe(document, 'categoryProductGrid:ready', function(){
				if(!this.hasFirstGridReadyEventFired){
					self.scrollToHeader(scrollToRequest);
				}
				this.hasFirstGridReadyEventFired = true;
			});
			
			//observe the new event, but only once (i.e. first page load, not evertime a facet is changed)
			Event.observe(document, 'newCategoryFacetedSearchGrid:ready', function(){
				if(!this.hasFirstGridReadyEventFired){
					self.scrollToHeader(scrollToRequest);
				}
				this.hasFirstGridReadyEventFired = true;
			});
			
		}
    },

    /**
     * getAssetPath - gets the path to an asset dynamically, based on the content group number and brand
     * This is a method of class WCDLib
     * @param {string} contentID = 1234567
     * @param {string} asset OPTIONAL i.e. someImage.jpg
     * @return (string) assetPath i.e. /Asset_Archive/ONWeb/content/0001/234/567/assets/someImage.jpg
     * @author Jermaine Jackson
     * @date 08/27/2009
     */
    getAssetPath: function(contentID, asset) {

        asset = asset && asset != '' ? asset : '';

        var contentPath = '000' + contentID.substr(0, 1) + '/' + contentID.substr(1, 3) + '/' + contentID.substr(4, 3);
        var assetPath = '/Asset_Archive/' + brandConst.BRAND_ID + 'Web/content/' + contentPath + '/assets/' + asset;

        return assetPath;
    },


    /**
    * getMlink - changes browser url to a new url with Omniture tracking appended. *Omniture tracking should be sorted by mlink
    * @return (string) mlink
    * @author Jermaine Jackson
    * @date 08/27/2009
    */
    getMlink: function() {
        var mlink;
        if (reportingService) {
            mlink = reportingService.controller.viewManagers.commonViewManager.model.commonCurrentBusinessId;
        }
        else {
            mlink = false;
        }
        return mlink;
    },


    /**
     * goToTrackingURL - changes browser url to a new url with Omniture tracking appended
     * This is a method of class WCDLib
     * @param {string} baseURL = /browse/category.do?cid=12345
     * @param {string} contentID = (content Group # used for tracking and clink) i.e. 1234567
     * @param {string} label OPTIONAL = additional label used in mlink for tracking
     * @return - returns nothing (changes browser location)
     * @author Jermaine Jackson
     * @date 00/00/2009
     */
    /*
    goToTrackingURL: function(baseURL, contentID, label) {

        thisMlink = this.getMlink();
        label = label && label != '' ? ',' + label : '';
        //var trackingURL = location.protocol + '//' + location.host + baseURL + '&mlink=' + thisMlink + ',' + contentID + label + '&clink=' + contentID;
        //location.href = 'http://oldnavy.gap.com/browse/category.do?cid=00000&mlink=5421,1234567&clink=1234567';
    },
	*/

    /**
     * isProuctSalable() 
     * makes ajax request to check if product is salable
     * @return returns true or false;
     * ??? Returns 'fail' onFailure
	 * @author Jermaine Jackson
     */
	 /*
    isProductSalable: function(thisPID) {
        new Ajax.Request('/browse/isProductSalable.do?pid=' + thisPID, {
            method: 'get',
            onSuccess: function(transport) {
                var response = transport.responseText.strip();
                if (response.indexOf('true') >= 0) {
                    return true;
                }
                else {
                    return false;
                }
            },
            onFailure: function() {
                retVal = 'fail';
                return retVal;
            }
        });
    },
	*/
	
    /** 
     * getVIAssetPath()
	 * @Param (STRING) styleID - product's style id
     * @retrn returns the path to the vi image for the given styleID
	 * @author Jermaine Jackson
     */
    getVIAssetPath: function(styleID) {
        // /Asset_Archive/ONWeb/Assets/Product/730/730382/category/on730382-03viv01.jpg

        //TODO : use Brand code insted of ONWeb

        viPath = '/Asset_Archive/ONWeb/Assets/Product/' + styleID.substr(0, 3) + '/'
            + styleID.substr(0, 6) + '/category/on' + styleID.substr(0, 6) + '-' + styleID.substr(6, 2) + 'viv01.jpg';

        return viPath;
    },

    /**
     * getProductData
     * @Param (STRING) thisPID - product id (scid/style-color number or style number (6 digits)
     * @Param (STRING) thisField - field of the product that is being requested. Currently either "price" or "name"
     * @Param (BOOLEAN) includeCurrencySymbol - include the symbol or not
     * @return - updates thisElementID with retrieved price
     * @author Jeff Held
     * @modified Jermaine Jackson
     */
    getProductPrice: function(thisPID, thisElementID) {

        var theCurrencySymbol = "$";

        new Ajax.Request('/browse/productData.do?pid=' + thisPID, {
            method: 'get',
            onSuccess: function(transport) {

                var rawData = transport.responseText.strip();
                rawData = rawData.replace("&#39;", "'");
                rawData = rawData.replace("&#160;", "'");
                initialdataArray = rawData.split(";");
                firstLineArray = initialdataArray[0].split(",");

                var thePrice = firstLineArray[13];
                thePrice = thePrice.replace(/'/gi, "");
                //thePrice = thePrice.replace("$", "");
                thePrice = thePrice.replace("<span class=\"priceDisplay\">", "");
                if (thePrice.indexOf("priceDisplaySale") != -1) {
                    thePrice = thePrice.replace("<span class=\"priceDisplayStrike\">", "");
                    thePrice = thePrice.replace("<span class=\"brandBreak\">", "");
                    thePrice = thePrice.replace("<span class=\"priceDisplaySale\">", "");
                    thePrice = thePrice.replace("<\/span>", "");
                    thePrice = thePrice.replace("<\/span>", "");
                    thePrice = thePrice.replace("<\/span>", "");
                    var thePriceArr = thePrice.split("$");
                    thePrice = thePriceArr[1];
                }
                thePrice = thePrice.replace("<\/span>", "");

                //get the next value if the price happens to be true/false
                if (thePrice == "false" || thePrice == "true") {

                    thePrice = firstLineArray[14];
                    thePrice = thePrice.replace(/'/gi, "");
                    //thePrice = thePrice.replace("$", "");
                    thePrice = thePrice.replace("<span class=\"priceDisplay\">", "");
                    if (thePrice.indexOf("priceDisplaySale") != -1) {
                        thePrice = thePrice.replace("<span class=\"priceDisplayStrike\">", "");
                        thePrice = thePrice.replace("<span class=\"brandBreak\">", "");
                        thePrice = thePrice.replace("<span class=\"priceDisplaySale\">", "");
                        thePrice = thePrice.replace("<\/span>", "");
                        thePrice = thePrice.replace("<\/span>", "");
                        thePrice = thePrice.replace("<\/span>", "");
                        var thePriceArr = thePrice.split("$");
                        thePrice = thePriceArr[1];
                    }
                    thePrice = thePrice.replace("<\/span>", "");

                }

                thePrice = thePrice.indexOf("$") < 0 ? "$" + thePrice : thePrice;
				
				//remove trailing hyphen
				if(thePrice.charAt(thePrice.length - 1) == "-"){
					thePrice = thePrice.substr(0,thePrice.length - 1);
				}

                $(thisElementID).update(thePrice);

            },
            onFailure: function() {

                $(thisElementID).update("");

            }
        });
    },

	
	/**
     * getProductName
     * @Param (STRING) thisPID - product id (scid/style-color number or style number (6 digits)
     * @Param (STRING) thisElementID - Element that will be updated with the products price
     * @return - updates thisElementID with retrieved name
     * @author Jermaine Jackson
     */
    getProductName: function(thisPID, thisElementID) {

        new Ajax.Request('/browse/productData.do?pid=' + thisPID, {
            method: 'get',
            onSuccess: function(transport) {

                var rawData = transport.responseText.strip();
                rawData = rawData.replace("&#39;", "'");
                rawData = rawData.replace("&#160;", "'");
                initialDataArray = rawData.split(";");
                firstLineArray = initialDataArray[0].split(",");

                var theItemName = firstLineArray[25];
                theItemName = theItemName.substring(1, theItemName.length - 1);

                //if name < 5 chars, get next value
                if (theItemName.length < 5) {
                    theItemName = firstLineArray[26];
                    theItemName = theItemName.substring(1, theItemName.length - 1);
                }

                $(thisElementID).update(theItemName);

            },
            onFailure: function() {

                $(thisElementID).update("");

            }
        });

    },

    /**
     * trackLink - tracks link and gives a name to the link for Omniture.
     * @Param (Element) thisElement - the element that fires the link/click (i.e. this)
     * @Param (STRING) linkName - name that should be assigned to the link
	 * @Author Jermaine Jackson
     */
    trackLink: function(thisElement, linkName) {

        /* EXAMPLE
        <a href="index.html" onClick="
        s.linkTrackVars='eVar6';
        s.eVar6='homepage banner link1';
        s.tl(this,'o','homepage banner link1');
        ">Click me</a>
        */

        s.linkTrackVars = 'eVar6';
        s.eVar6 = linkName;
        s.tl(thisElement, 'o', linkName);

    },

	/**
	 * getCleanString - removes all whitespace, tabs and newline characters from the string
	 * @PARAM (STRING) thisString - the string that gets cleaned
	 * @PARAM (boolean) OPTIONAL makeLowerCase - converts entire string to lowercase if set to true
	 * @return returns string with no whitespace
	 */
    getCleanString: function(thisString, makeLowerCase) {
       thisString = thisString.replace(/^\s+|\t+|\n+| |\s+$/g, '') ;
	   thisString = makeLowerCase ? thisString.toLowerCase() : thisString;
       return thisString;
    },
	
	/**
	 * scrollToHeader - scrolls page to requested header (<h2 class=header4 />)
	 * @PARAM (STRING) thisHeader - the string that inside the header tag that will be scrolled to
	 * @return returns nothing
	 */
	scrollToHeader: function(thisHeader){

		thisHeader = wcdLib.getCleanString(thisHeader,true);
		visibleHeaders = [];
		
		$("mainContent").select("h2[class=header4]").each(function(thisNode){
			visibleHeaders.push(thisNode);
			//console.log('found:' + thisNode.innerHTML);
		});
		$("mainContent").select("h2[class=header4 subcategoryHeader]").each(function(thisNode){
			visibleHeaders.push(thisNode);
			//console.log('found:' + thisNode.innerHTML);
		});
		
		for(i=0;i<visibleHeaders.length;i++){
			str = wcdLib.getCleanString(visibleHeaders[i].innerHTML, true);
			str = str.replace(/&amp;/g, '');//remove '&amp;' since they can't be used in the url
			str = str.replace(/&/g, ''); //remove '&' since they can't be used in the url
			str = str.replace(/\"/g,''); //replace all double quotes
            str = str.replace(/[^a-zA-Z0-9]+/g,''); // remove anything not A-Z 
			str = str.replace(/\'/g,''); //replace all single quotes
			
			if(str == thisHeader){
				var temp = new Effect.ScrollTo(visibleHeaders[i]);
			}
		}
	},
	
	/**
     * changeImage()
     * Changes the image of an img element
     * thisImage = (STRING) image element as 'someID'
     * thisImagePath = (STRING) the new path of the new image
     * [optional] thisImageMap = (STRING) the name of the image map to use
     */
    changeImage: function(thisImage, thisImagePath, thisImageMap) {

		var thisImage = $(thisImage);
        thisImage.src = thisImagePath;

        if (thisImageMap != '') {
            thisImageMap = thisImageMap.charAt(0) == '#' ? thisImageMap : '#' + thisImageMap;
            thisImage.useMap = thisImageMap;
        }

    },
	
	/**
	 * setIePngTransparency automatically sets png transparency via CSS for elements
	 * Checks to see if the element has a png set in the background-image and adjusts accordingly, else checks to see if the element has a src 
	 * attribute and adjusts the image accordingly.  This does not support an element that has both a src and background-image as pngs because the IE fix
	 * relies on the IE specific CSS filter to display the png.  Background-image takes precedence if there are both.
	 * NOTE: for background-image to work properly, it must be an inline style in the tag. JS cannot read this value from CSS files.
	 * @param {object} either a collection or single element to set PNG alpha.
	 * 
	 * @author Byung Kim
	 * @date 2/5/2008
	 */
	setIePngTransparency: function(arg) {
		if (clientBrowser.isIE && !clientBrowser.isIE7Up) {
			var setIePngTransparencyIterator = function(element) {
				if (element && element.tagName) {
					var backgroundImage = element.style.backgroundImage || element.getStyle("backgroundImage"); 
					var src = element.src;
					var filterTemplate = new Template("progid:DXImageTransform.Microsoft.AlphaImageLoader(src='#{filter}', sizingMethod='scale');");
					
					// Check to see if there is a backgroundImage and is a PNG
					if (backgroundImage != "" && backgroundImage.indexOf(".png") != -1) { 
						element.setStyle({background:"transparent"});
						element.style.filter = filterTemplate.evaluate({filter:backgroundImage.replace(/(url|\)|\(|'|")/g,"")});
					// Check to see if there is a src attribute and is a PNG.
					} else if (src && src.indexOf(".png") != -1) { 
						var dimensions = element.getDimensions();
						element.src = "/assets/common/clear.gif";
						element.setStyle({
							width:dimensions.width + "px",
							height:dimensions.height + "px"
						});
						element.style.filter = filterTemplate.evaluate({filter:src.replace(location.protocol+"//"+location.host,"")});
						if (element.onmouseover) element.onmouseover = function() {
								var filter = element.style.filter;
								element.style.filter = filter.replace(/_off/,"_over");
						};
						if (element.onmouseout) element.onmouseout = function() {
								var filter = element.style.filter;
								element.style.filter = filter.replace(/_over/,"_off");
						};
					}
					
					// to remove the flicker effect of the png, they are initially set as hidden and made visible once fixed
					element.setStyle({visibility:"visible"});
				}
			};

			// ensure that arg exists and is an array
			if (arg) (arg.length ? arg : [arg]).each(setIePngTransparencyIterator);
		}
	},
	
	getCurrentDivisionName : function(){
		
		var thisDivision = "";
		
		if(window['reportingService']){
			thisDivision = reportingService.controller.viewManagers.commonViewManager.model.commonChannelName;
		}
		
		return thisDivision;
		
	},
	
	/**
	* contentItemLinkWithFacet takes the user to a url but first appends values for reporting and appends facets to end of url
	* @param {string} domTarget The content item element id
	* @param {string} strURL The url to modify and add the appropriate parameters
	* @param {string} linkId Used to distinguish between similar links originating from the same content item
	* @param {string} urlTarget Used to specify a window target
	* @return a boolean depending on urlTarget. It returns false if it needs to target a different window
	*
	* @author Ben Henry
	*/ 
	contentItemLinkWithFacet : function( domTarget, strURL, linkId, urlTarget ) {
		var objTarget = null;
		var contentItemId = "";
		var strContentItemContainerPrefix = "contentItemContainer";
		var refBusinessId = null;
		var isHardCodedId = (typeof domTarget == "string" || typeof domTarget == "number");
		var isHardCodedURL = (strURL && strURL != '');
		if(!(reportingService||{}).isActive){
			refBusinessId = (window["omni"] ? omni.strCurrentBusinessId : "");
		}
		else {
			refBusinessId = reportingService.controller.viewManagers.commonViewManager.model.commonCurrentBusinessId;
		}
		if (isHardCodedId) {
			objTarget = (contentItemId = domTarget);
		} else {
			objTarget = domTarget;
			do {
				isFound = ((objTarget && objTarget.id && objTarget.id.match(new RegExp(strContentItemContainerPrefix))) || objTarget == null);
				if (!isFound) objTarget = objTarget.parentNode;
			} while (!isFound);
			if ($(objTarget)) contentItemId = $(objTarget).classNames();
		}
		var updateURLString = function(strURL) {
			// Find and remove facet info
			// "/browse/categorySearch.do?cid=48944&nsc#department=48"
			var facetInfo = '';
			if( strURL.indexOf('#') > -1 ) {
				facetInfo = strURL.substr( strURL.indexOf('#') );
				strURL = strURL.substr( 0, strURL.indexOf('#') );
			}
			strURL += (strURL.indexOf("?") == -1 ? "?" : "&") +
				"mlink=" +
				refBusinessId + "," +
				contentItemId +
				(linkId && linkId != "" ? "," + linkId : "") +
				"&clink=" + contentItemId;
				if( facetInfo != '' ) strURL += facetInfo;
			return strURL;
		}
		if (objTarget) {
			if (!isHardCodedURL) {
				if (domTarget.useMap && document.getElementsByName(domTarget.useMap.substr(1)).length > 0) {
					strLink = document.getElementsByName(domTarget.useMap.substr(1))[0].areas[0].href;
				} else if (domTarget.href) {
					strLink = domTarget.href;
				} else if (domTarget.parentNode && domTarget.parentNode.href) {
					strLink = domTarget.parentNode.href;
				}
				strURL = strLink.replace(new RegExp(".+"+location.host),"");
			}
	
			var isUrl = strURL.match(/^(\/|http|about)/);
			if (isUrl) {
				if (strURL.match(/^\//)) strURL = updateURLString(strURL);
			} else {
				var expURL = new RegExp(/[^']*\.do\?[^']*/g);
				var arrayURLs = strURL.match(expURL);
				if (arrayURLs) {
					for (i=0;i<arrayURLs.length;i++) {
						strURL = strURL.replace(arrayURLs[i],updateURLString(arrayURLs[i]));
					}
				}
			}
			if (urlTarget && urlTarget == "_new") {
					var newWindow = window.open(strURL,'');
					newWindow.focus();
			} else {
				var objTargetWindow = (urlTarget && window[urlTarget] ? window[urlTarget] : window);
					objTargetWindow.location.href = strURL;
			}
			if (!isHardCodedURL) return false;
		} else {
			if (!isHardCodedURL) return true;
		}
	}


};

var wcdLib = new WCDLibrary();