/* WCD Library v1.4
 * 
 * Change Log (8/15/13)
 * --------------------------------------
 * Added the custom events from Prototype to jQuery i.e. 'categoryFacetedSearchGrid:ready' and 'productPage:ready'
 * 
 */
var WCDLibrary = Class.create();

WCDLibrary.prototype = {

    initialize: function() {
		
		//check for scrollTo request in queryString (i.e. &scrollTo=ThisHeader)
		//ONLY on category pages
		scrollToRequest = gidLib.getQuerystringParam("scrollTo");
		if(location.pathname == "/browse/category.do" && scrollToRequest != ""){
			var self = this;
			
			if(window["categoryService"] != undefined) {
				Event.observe(document, "categoryProductGrid:ready", function(){
					self.scrollToHeader(scrollToRequest);
				});
			}else{
				Event.observe(window,"load",function(){
					self.scrollToHeader(scrollToRequest);
				});
			}
		}

		//this.setToolTipHandlers(); //haven't used this in awhile

    },

    /* sets a handler for mouseover special tooltip elements
     * will show a styled tooltip for all elements with class name 'masterToolTip'
     * Tooltip text to be displayed should be set in elements title attribute
     */
    setToolTipHandlers : function(){

    	jQuery(document).ready(function(){
	    	jQuery('.masterTooltip').hover(function(){
				// Hover over code
				// console.log('hovering');
				var title = jQuery(this).attr('title');
				jQuery(this).data('tipText', title).removeAttr('title');

				var defaultStyle = "min-width:150px; max-width: 200px; position:absolute;background-color:#000;color:#ffffff;padding:10px;border:1px solid #aaaaaa;font-size:13px;line-height:14px;"
				var customStyle = jQuery(this).data('tooltip-style'); 
				var styleStr = typeof customStyle == "undefined" ? defaultStyle : customStyle;

				jQuery('<p class="tooltip" style="' + styleStr + '"></p>')
					.html(title)
					.appendTo('body')
					.fadeIn('slow');
			}, function() {
				// Hover out code
				jQuery(this).attr('title', jQuery(this).data('tipText'));
					jQuery('.tooltip').remove();
				}).mousemove(function(e) {
					var mousex = e.pageX + 20; //Get X coordinates
					var mousey = e.pageY + 10; //Get Y coordinates
					jQuery('.tooltip').css({ top: mousey, left: mousex })
				}
			); 
		});
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
     * trackValue - Performs the eVarN tracking (i.e. eVar7). Useful for mouseover and clicks that aren't standard links
     * @Param (Element) target - the element that fires the link/click (i.e. this)
     * @Param (STRING) v7 - Value that shows for v7
     * @Param (STRING) pev2 - Value that shows for pev2
	 * @Author Jermaine Jackson 2/8/13
     */
    trackValue: function(target, v7, pev2, evarToUse) {

    	s.linkTrackVars = evarToUse;
		s[evarToUse] = v7;
		s.tl(target,'o',pev2);

		//this value needs to be cleared because it will be attached to default tracking requests.
		//otherwise it will get sent with other default tracking and skew our tracking results. for example, it will look like additional clicks in omniture.
		s[evarToUse] = null;

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
	 * scrollToHeader - scrolls page to requested header (<h2 class="header4" /> AND <h2 class="header4 subcategoryHeader"/>)
	 * @PARAM (STRING) thisHeader - the string inside the header tag that will be scrolled to
	 * @return returns nothing
	 * @Modified Jermaine - 2/8/13
	 */
	scrollToHeader: function(thisHeader){
	
		thisHeader = wcdLib.getCleanString(thisHeader,true);
		jQuery(".header4").each(function(){		  
            str = wcdLib.getCleanString(jQuery(this).text(), true);
			str = str.replace(/[^a-zA-Z]+/g,''); // remove anything not Aa-Zz - to scrollTo in french omit special French Characters in .header4 tag
			
			if(str == thisHeader){
                jQuery('html, body').animate({
                    scrollTop: jQuery(this).offset().top
                }, 1000);
                return false;
			}		
		});

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
//override contentItemLink so we don't forget to use the updated function for links with facets
contentItemLink = wcdLib.contentItemLinkWithFacet;	

/* Add the custom prototype events to the jQuery so we can use jQuery to observe these events:
 * - personalizationData:ready
 * - categoryFacetedSearchGrid:ready
 * - productPage:ready
 * - filterTools:ready
 */
(function( $ ) {
 	$.each(['personalizationData:ready','categoryFacetedSearchGrid:ready','productPage:ready','filterTools:ready'], function(index,eventName) {
 		document.observe(eventName,function(){ 
 			$(document).trigger(eventName);
 		});
 	});
})( jQuery );



/**
* JBOX:
* A simple popup box overlay that provides easy styling through the use of CSS. Default style is a simple borderless popup, with a CSS box-shadow.
* Main idea is to simplify the popup process. Utilization of CSS to calculate positioning, less realiance on JS.
*
* @author: Jacob Moretti
* @date: 10/05/2012
*
* PROPERTIES OF JBOX ->
* @property (INT) width: width of the popup
* @property (INT) height: height of the popup
* @property (STRING) url: url for iframe
* @property (STRING) title: title to display above popup
* @property (STRING) jboxID: div id of the popup container that holds everything
* @property (STRING) backdropID: id of the backdrop overlay div
* @property (STRING) titleID: id of the title div
* @property (STRING) closeID: id of the close div
* @property (STRING) boxID: id of the box div that holds #titleID, #closeID, and #iframeID
* @property (STRING) iframeContainerID: id of the div container that holds the iframe
* @property (STRING) iframeID: id of the iframe
* @property (STRING) iframeName: name of the iframe
*
*
* @modified by Jermaine Jackson
* @date: 3/28/14
* Added custom event to notify when jbox iframe URL has loaded
* Added isOpen option to notify if a jbox popup is open (useful if checking from a child iframe);
**/

var jbox = {

  // initial properties
  width: 300,
  height: 300,
  url: "",
  title: "",
  jboxID: "jbox",
  backdropID: "backdrop",
  boxID: "box",
  topbarID: "topbar",
  titleID: "title",
  closeID: "close",
  iframeContainerID: "iframeContainer",
  iframeID: "iframe",
  iframeName: "jboxIframe",
  isOpen : false,

  // hold default options for fallback
  defaultOptions:
  {
    width: 300,
    height: 300,
    overflow: "auto",
    url: "",
    title: "",
    jboxID: "jbox",
    backdropID: "backdrop",
    boxID: "box",
    topbarID: "topbar",
    titleID: "title",
    closeID: "close",
    iframeContainerID: "iframeContainer",
    iframeID: "iframe",
    iframeName: "jboxIframe",
    isOpen : false
  },

  // set passed in options
  setOptions : function(options)
  {
    this.width = options.width;
    this.height = options.height;
    this.overflow = (options.overflow == null || options.overflow == "") ? this.defaultOptions.overflow : options.overflow;
    this.url = options.url;
    this.title = (options.title == null || options.title == "") ? this.defaultOptions.title : options.title;
    this.jboxID = (options.jboxID == null || options.jboxID == "") ? this.defaultOptions.jboxID : options.jboxID;
    this.backdropID = (options.backdropID == null || options.backdropID == "") ? this.defaultOptions.backdropID : options.backdropID;
    this.boxID = (options.boxID == null || options.boxID == "") ? this.defaultOptions.boxID : options.boxID;
    this.topbarID = (options.topbarID == null || options.topbarID == "") ? this.defaultOptions.topbarID : options.topbarID;
    this.titleID = (options.titleID == null || options.titleID == "") ? this.defaultOptions.titleID : options.titleID;
    this.closeID = (options.closeID == null || options.closeID == "") ? this.defaultOptions.closeID : options.closeID;
    this.iframeContainerID = (options.iframeContainerID == null || options.iframeContainerID == "") ? this.defaultOptions.iframeContainerID : options.iframeContainerID;
    this.iframeID = (options.iframeID == null || options.iframeID == "") ? this.defaultOptions.iframeID : options.iframeID;
    this.iframeName = (options.iframeName == null || options.iframeName == "") ? this.defaultOptions.iframeName : options.iframeName;

  },

  // method for checking existence of custom data attributes
  checkDataAttributes : function()
  {
    // listen for a click on all anchors with rel=jbox
    $$("[rel='jbox']").invoke('observe', 'click', function(e) {
      // grab the element clicked
      var thisElement = e.findElement("[rel='jbox']");

      // gather each of the data jbox attributes
      var options = {};
      options.width = $(thisElement).getAttribute('data-jbox-width');
      options.height = $(thisElement).getAttribute('data-jbox-height');
      options.overflow = $(thisElement).getAttribute('data-jbox-overflow');
      options.url = $(thisElement).getAttribute('data-jbox-url');
      options.title = $(thisElement).getAttribute('data-jbox-title');
      options.jboxID = $(thisElement).getAttribute('data-jbox-jboxID');
      options.backdropID = $(thisElement).getAttribute('data-jbox-backdropID');
      options.boxID = $(thisElement).getAttribute('data-jbox-boxID');
      options.topbarID = $(thisElement).getAttribute('data-jbox-topbarID');
      options.titleID = $(thisElement).getAttribute('data-jbox-titleID');
      options.closeID = $(thisElement).getAttribute('data-jbox-closeID');
      options.iframeContainerID = $(thisElement).getAttribute('data-jbox-iframeContainerID');
      options.iframeID = $(thisElement).getAttribute('data-jbox-iframeID');
      options.iframeName = $(thisElement).getAttribute('data-jbox-iframeName');

      // now open the box using the options we gathered above
      jbox.boxIt(options);

      e.preventDefault();
    });
  },

  // main method to create the actual overlay
  boxIt : function(options)
  {
    // set options that have been passed
    jbox.setOptions(options);

    // insert all the necessary HTML for the structure of the overlay box.
    // the div#jboxID holds everything, styled to zero opacity initially.
    // the iframe#iframeID is also styled to zero opacity
    // NOTE: In order to properly place the div#boxID in the center of the screen
    // we take the width/2, height/2, and set them as negative margins for top and left respectively.
    // Also note that the "X" for the close button is wrapped in a span tag, this is incase you
    // need to hide the "X" and use your own image - you can do so through CSS
    $(document.body).insert('<div id="' + this.jboxID + '" style="display:none;">' +
        '<div id="' + this.backdropID + '"></div>' +

        '<div id="' + this.boxID + '" style="width: ' + this.width + 'px; height: ' + this.height + 'px; margin: -' + (this.height/2) + 'px 0 0 -' + (this.width/2) + 'px;">' +

          '<div id="' + this.topbarID + '">' +

            '<div id="' + this.titleID + '">' + this.title + '</div>' +

            '<div id="' + this.closeID + '"><a href="#close"><span>X</span></a></div>' +

          '</div>' +

          '<div id="' + this.iframeContainerID + '" style="width:' + this.width + 'px;height:' + this.height + 'px;overflow:' + this.overflow + ';"><iframe id="' + this.iframeID + '" scrolling name="' + this.iframeName + '" src="' + this.url + '" style="display:none;width:' + this.width + 'px;height:' + this.height + 'px;" frameborder="0"></iframe></div>'+

        '</div>' +

      '</div>'
    );

    // now that the HTML has been inserted
    // lets open the box up
    jbox.open();
  },

  open : function()
  {
    // show jbox as its initially hidden
    $(jbox.jboxID).show();
    
    // in order to properly center the title
    // we take its width/2 and set as negative left margin
    var titleWidth = $(this.titleID).getWidth() / 2;
    $(this.titleID).setStyle({left: "50%", marginLeft: "-" + titleWidth + "px"});
    
    // add closing behaviors
    jbox.addCloseBehaviors();

    // check to see if the document in the iframe is done loading
    this.checkLoading();
    this.isOpen = true;
  },

  close : function()
  {
  	// we blank out the src as a workaround for IE
  	if($(jbox.iframeID) != null){
	  	$(jbox.iframeID).src = "";
	}

    // remove the html markup
    $(jbox.jboxID).remove();

    jbox.isOpen = false;
  
  },

  checkLoading : function()
  {
    // the iframe#iframeID is still hidden
    // we add some loading text in the div#iframeContainer
    $(this.iframeContainerID).insert('<div id="loading"><img src="/Asset_Archive/GPWeb/content/0007/657/638/assets/loading.gif" alt="loading" align="left" /> loading...</div>');

    // listen for when the iframe has completed loading its content
    Event.observe(jbox.iframeID, "load", function()
    {
      // when loading is complete
      // remove the markup completely
    	if($('loading') != null){
	      $('loading').remove();
    	}
      // show iframe, as its initially hidden
      $(jbox.iframeID).show();
	  $(jbox.iframeID).setStyle({ 'width': jbox.width + 'px', 'height': jbox.height + 'px' });

	  jQuery(document).trigger("jbox:loaded",jbox.url);
	  
    });
  },

  // method for listening to clicks to close the box
  // we want to avoid inline JS so its controlled here
  addCloseBehaviors: function()
  {
    // watch for a click on the anchor inside the div#closeID
    $$('#' + this.closeID + ' a')[0].observe("click", function(e)
    {
      jbox.close();
      e.preventDefault();
    });

    // watch for a click on div#backdropID
    $(this.backdropID).observe("click", function(e)
    {
      jbox.close();
      e.preventDefault();
    });
  }

}

/* JBOX DATA ATTRIBUTE INIT */
jQuery(document).ready(jbox.checkDataAttributes);