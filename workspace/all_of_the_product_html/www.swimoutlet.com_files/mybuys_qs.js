(function(){
window.mbScope = window.mbScope || {};
window.mbScope.attribute_data = [ {
  "id" : 243,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "dataType" : "link",
  "name" : "canonical",
  "expectedValue" : null,
  "xpathSelectors" : [ "//LINK[@rel=\"canonical\"]/@href" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "^https?://.*?/",
    "replacement" : "/",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : false
}, {
  "id" : 246,
  "clientId" : 1,
  "pageType" : "ORDER_CONFIRMATION",
  "dataType" : "list-image",
  "name" : "PidInImage",
  "expectedValue" : null,
  "xpathSelectors" : [ "//UL[@id=\"faceArea\"]//IMG//@src" ],
  "useInCatalogFeed" : false,
  "regexTransformation" : {
    "regex" : ".*?/([0-9]+).*",
    "replacement" : "$1",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : true,
  "isCPC" : true,
  "presetAttribute" : false
}, {
  "id" : 247,
  "clientId" : 1,
  "pageType" : "ORDER_CONFIRMATION",
  "dataType" : "string",
  "name" : "emailAddress",
  "expectedValue" : null,
  "xpathSelectors" : [ "//LABEL[@id=\"emailAddressFrom\"]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "^\\(|\\)$",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : true
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : false
}, {
  "id" : 248,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "dataType" : "string",
  "name" : "id",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@class=\"pro-code\"][1]/I[1]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "Product Code: ",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : true,
  "isCPC" : true,
  "presetAttribute" : false
}, {
  "id" : 249,
  "clientId" : 1,
  "pageType" : "SHOPPING_CART",
  "dataType" : "list-link",
  "name" : "productUrls",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@class=\"list-shopped-items\"]/DIV[@class=\"sp-item\"]/SECTION[@class=\"shopped-item-details\"]/DIV[@class=\"shopped-item-name\"]/H2[1]/A[@class=\"carttext\"]/@href", "//DIV[@class=\"item_left\"][1]/DIV[@class=\"sp-item\"]/SECTION[@class=\"shopped-item-details\"]/DIV[@class=\"shopped-item-name\"]/H2[1]/A[@class=\"carttext\"]/@href" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : ".*?productcode=([0-9]+).*",
    "replacement" : "$1",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : true,
  "isCPC" : true,
  "presetAttribute" : false
}, {
  "id" : 43,
  "clientId" : 1,
  "pageType" : "SHOPPING_CART",
  "dataType" : "string",
  "name" : "orderAmount",
  "expectedValue" : null,
  "xpathSelectors" : [ "//SPAN[@id=\"subtotal\"]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : false
}, {
  "id" : 128,
  "clientId" : 1,
  "pageType" : "SHOPPING_CART",
  "dataType" : "list-string",
  "name" : "pids",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@class=\"list-shopped-items\"]/DIV[@class=\"sp-item\"]/SECTION[@class=\"shopped-item-details\"]/DIV[@class=\"shopped-item-name\"]/DIV[@class=\"list-item-attrs\"]/DIV[1]/SPAN[@class=\"attr-value\"]", "//DIV[@class=\"item_left\"][1]/DIV[@class=\"sp-item\"]/SECTION[@class=\"shopped-item-details\"]/DIV[@class=\"shopped-item-name\"]/DIV[@class=\"list-item-attrs\"]/DIV[1]/SPAN[@class=\"attr-value\"]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : false
}, {
  "id" : 132,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "dataType" : "string",
  "name" : "salePrice",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@id=\"divRealPriceSection\"]/DIV[2]/SPAN[@id=\"ListPrice\"]", "//DIV[@id=\"divRealPriceSection\"]/DIV[2]/SPAN[@id=\"SalePrice\"]", "//DIV[@id=\"divRealPriceSection\"]/DIV[3]/SPAN[@id=\"SalePrice\"]", "//DIV[@id=\"divRealPriceSection\"]/DIV[2]/SPAN[@id=\"ProductPrice\"]", "//DIV[@id=\"divRealPriceSection\"]/DIV[1]/SPAN[@id=\"SalePrice\"]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : true
}, {
  "id" : 135,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "dataType" : "list-string",
  "name" : "breadcrumbs",
  "expectedValue" : null,
  "xpathSelectors" : [ "//NAV[@class=\"block-content mnu-top mnu-top-product-detail\"][1]//A[1]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : true
}, {
  "id" : 137,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "dataType" : "string",
  "name" : "description",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@class=\"pro-description\"][1]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : true
}, {
  "id" : 139,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "dataType" : "string",
  "name" : "listPrice",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@id=\"divRealPriceSection\"]/DIV[@id=\"divPriceRange\"]/SPAN[@id=\"PriceRange\"]", "//DIV[@id=\"divRealPriceSection\"]/DIV[1]/SPAN[@id=\"ListPrice\"]", "//DIV[@id=\"divRealPriceSection\"]/DIV[2]/SPAN[@id=\"ProductPrice\"]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : true
}, {
  "id" : 203,
  "clientId" : 1,
  "pageType" : "CATEGORY",
  "dataType" : "list-string",
  "name" : "breadcrumbs",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@class=\"main-content-type1 floatL\"][1]/NAV[@id=\"blockcontentmnutop\"]//SPAN/A[1]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : true
}, {
  "id" : 114,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "dataType" : "string",
  "name" : "name",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@class=\"pro-viewinfo\"][1]/H1[1]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : true
}, {
  "id" : 115,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "dataType" : "image",
  "name" : "largeImageUrl",
  "expectedValue" : null,
  "xpathSelectors" : [ "//IMG[@id=\"product_photo\"]/@src" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : true
}, {
  "id" : 129,
  "clientId" : 1,
  "pageType" : "SHOPPING_CART",
  "dataType" : "list-string",
  "name" : "subTotals",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@class=\"list-shopped-items\"]/DIV[@class=\"sp-item\"]/SECTION[@class=\"shopped-item-details\"]/DIV[@class=\"shopped-total-items-price\"]/P[@class=\"p-item-price\"]", "//DIV[@class=\"item_left\"][1]//P[@class=\"quantity-item-price\"]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : false
}, {
  "id" : 141,
  "clientId" : 1,
  "pageType" : "ORDER_CONFIRMATION",
  "dataType" : "string",
  "name" : "orderId",
  "expectedValue" : null,
  "xpathSelectors" : [ "//P[@class=\"order-brief-info\"][1]/SPAN[1]" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : false
}, {
  "id" : 130,
  "clientId" : 1,
  "pageType" : "SHOPPING_CART",
  "dataType" : "list-string",
  "name" : "quantities",
  "expectedValue" : null,
  "xpathSelectors" : [ "//DIV[@class=\"list-shopped-items\"]/DIV[@class=\"sp-item\"]/SECTION[@class=\"shopped-item-details\"]/DIV[@class=\"shopped-item-quantity\"]/INPUT[@class=\"txt-type-small\"]/@value", "//DIV[@class=\"item_left\"][1]//INPUT[@class=\"txt-type-small\"]/@value" ],
  "useInCatalogFeed" : true,
  "regexTransformation" : {
    "regex" : "",
    "replacement" : "",
    "ignoreCase" : false,
    "replaceAll" : false
  },
  "useAsProductId" : false,
  "isCPC" : false,
  "presetAttribute" : false
} ];

window.mbScope.regex_data = [ {
  "id" : 4,
  "clientId" : 1,
  "pageType" : "CATEGORY",
  "regex" : "https?://www\\.swimoutlet\\.com/[a-zA-Z-]+-c[0-9]+.*",
  "url" : null,
  "variableToCapture" : null,
  "useAsProductId" : false,
  "isCPC" : false
}, {
  "id" : 3,
  "clientId" : 1,
  "pageType" : "SHOPPING_CART",
  "regex" : "https?://www\\.swimoutlet\\.com/shoppingcart\\.html.*",
  "url" : null,
  "variableToCapture" : null,
  "useAsProductId" : false,
  "isCPC" : false
}, {
  "id" : 6,
  "clientId" : 1,
  "pageType" : "SHOPPING_CART",
  "regex" : "https://www\\.swimoutlet\\.com/ShoppingCart_UpSell_Banner\\.asp.*",
  "url" : null,
  "variableToCapture" : null,
  "useAsProductId" : false,
  "isCPC" : false
}, {
  "id" : 9,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "regex" : "https?://www.swimoutlet.com/p/.*",
  "url" : null,
  "variableToCapture" : null,
  "useAsProductId" : false,
  "isCPC" : false
}, {
  "id" : 10,
  "clientId" : 1,
  "pageType" : "ORDER_CONFIRMATION",
  "regex" : "https://www.swimoutlet.com/OrderFinished.asp.*",
  "url" : null,
  "variableToCapture" : null,
  "useAsProductId" : false,
  "isCPC" : false
}, {
  "id" : 11,
  "clientId" : 1,
  "pageType" : "PRODUCT_DETAILS",
  "regex" : "https?://www\\.swimoutlet\\.com/[pP]roduct[dD]etails\\.asp.*",
  "url" : null,
  "variableToCapture" : null,
  "useAsProductId" : false,
  "isCPC" : false
} ];
})();
/*---------------------------------------------------------------------------*/
/*                               xpathEval.js                                */
/*---------------------------------------------------------------------------*/
(function(){
  window.mbScope     = window.mbScope || {};

  var eval = window.mbScope.xpathEval = {
    
    //params: (path, dataType, expectedValue, regexTransformation)
    //returns text/value from given xpath
    getNodeTextFromXPath     :getNodeTextFromXPath,
    
    //params: (path, dataType, regexTransformation)
    //returns array of text/value from given xpath
    getAllNodeTextsFromXPath :getAllNodeTextsFromXPath,
    
    //params: (path, dataType, regexTransformation)
    //returns comma separated list of text/value from given xpath
    getAllNodeTextsFromXPathAsString :getAllNodeTextsFromXPathAsString,
    
    //params: (path)
    //returns node from given xpath
    getNodeFromXPath         :getNodeFromXPath,
    
    //params: (path)
    //returns array of nodes from given xpath
    getAllNodesFromXPath     :getAllNodesFromXPath,
    
    //params: (path, returnType) where returnType is one of the XPathResults listed below
    //returns XPathResult
    evaluateXpath            :evaluateXpath,
    
    //params: (node)
    //returns a recursive concat of the nodeValues for a given node
    _getTextContent          :_getTextContent,
    _getValueFromNode        :_getValueFromNode,
    _updateExtractedValueBasedOnTransformation : _updateExtractedValueBasedOnTransformation
  };
  
  function getNodeTextFromXPath(path, dataType, expectedValue, regexTransformation)
  {
    if(!path || path.replace(/^\s+|\s+$/g,'').length==0){ return ""; }

    var nodes = evaluateXpath(path);

    //No hit
    if(typeof nodes  == 'undefined' || nodes.length <= 0){ return "";}

    //if(nodes.length>1){ console.warn("More than 1 node returned for xpath "+path); console.log(nodes);}
    return _getValueFromNode(nodes[0], dataType, expectedValue, regexTransformation);
  }
  
  function getAllNodeTextsFromXPath(path, dataType, regexTransformation)
  {
    var result = [];
    var nodes = evaluateXpath(path);
    
    for(var i=0; i<nodes.length; i++)
    {
      result.push(_getValueFromNode(nodes[i], dataType, null, regexTransformation));
    }   
    return result;
  }
  
  function getAllNodeTextsFromXPathAsString(path, dataType, regexTransformation)
  {
    return getAllNodeTextsFromXPath(path, dataType, regexTransformation).join(', ');
  }
  
  function getNodeFromXPath(path)
  {
    if(!path || path.replace(/^\s+|\s+$/g,'').length==0){ return ""; }
    var nodes = evaluateXpath(path);
    if(typeof nodes  == 'undefined' || nodes.length <= 0){ return "";}
    //if(nodes.length>1){ console.warn("More than 1 node returned for xpath "+path); console.log(nodes);}
    return nodes[0];
  }
  
  function getAllNodesFromXPath(path)
  {
    return evaluateXpath(path);
  }
  
  function evaluateXpath(xPath)
  {
    if(!xPath || xPath.replace(/^\s+|\s+$/g,'').length==0)
        return [];
    try
    {
      //Since we include the wicked-good-xpath library here. We are always guaranteed document.evaluate
      return XPath2Arr(xPath);
    }catch(err){
      //console.error(err);
    }
    return [];
  }
    
  function XPath2Arr( xPath )
  {
    var ret = []
    ,   col = document.evaluate(xPath, document.body, null, 5, null)// 5==XPathResult.ORDERED_NODE_ITERATOR_TYPE
    ,   el = col.iterateNext();
    for( ;el ; el = col.iterateNext() )
       ret.push(el);
    return ret;
  }

  //Helper function - Given an node, returns a recursive concat of the nodeValues.
  function _getTextContent(node){
    if(node == null){ return ""; }
    var child, s = "";  // s holds the text of all children

    for(child = node.firstChild; child != null; child = child.nextSibling) {
      if (child.nodeType === 3)// Node.TEXT_NODE = 3
          s += (child.nodeValue+' ');
      else if (child.nodeType === 1){//Node.ELEMENT_NODE = 1
          //Ignore script elements
          if(child.nodeName && (child.nodeName.toUpperCase() === 'SCRIPT' || child.nodeName.toUpperCase() === 'STYLE'))
            continue;
          //Recursion bottoms out here
          s += _getTextContent(child);
      }
    }
    return s;
  }
  
  //Helper function
  function _getValueFromNode(node, dataType, expectedValue, regexTransformation)
  {
    //Default to string dataType
    dataType = typeof dataType == 'undefined' ? 'string' : dataType;
    
    //Handle different dataTypes
    if(dataType == 'boolean-exists'){
      return node !=null >0 ? 'true': 'false';
    }
    //the expectedValue check is a hacky way to get the extracted value passed back when we don't want eval.js to do the comparision 
    else if(dataType == 'boolean-match' && typeof expectedValue != 'undefined'){ 
      return _updateExtractedValueBasedOnTransformation(_getTextContent(node).replace(/\s+/g,' ').replace(/^\s+|\s+$/g,''), regexTransformation) === expectedValue ?  'true': 'false';
    }
    else if(node && node.nodeType && (node.nodeType === 2 || node.nodeType === 3 )) // node.ATTRIBUTE_NODE = 2 node.TEXT_NODE = 3
    {
      return _updateExtractedValueBasedOnTransformation(node.textContent || node.nodeValue, regexTransformation);
    } else
    {
      //in the IE case where the xpath ended in /@src, /@href, etc. evaluateXpath will return the string value, not the node
      return _updateExtractedValueBasedOnTransformation(_getTextContent(node).replace(/\s+/g,' ').replace(/^\s+|\s+$/g,''), regexTransformation);
    }
  }
  
  function _updateExtractedValueBasedOnTransformation(originalValue, regexTransformation)
  {
    if(!regexTransformation) return originalValue;
   
    try{
      var regex       = regexTransformation.regex || '';
      var replacement = regexTransformation.replacement || '';
      var mod         = regexTransformation.replaceAll ? 'g' : '';
      mod            += regexTransformation.ignoreCase ? 'i' : '';

      var re = new RegExp(regex,mod);
      return originalValue.replace(re, replacement);
    }catch(err){
      return originalValue;
    }
  }

  //if document.evaluate is missing, include the wicked-good-xpath code here
  if("function" !== typeof document.evaluate){
  		/*
  		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
			IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
			AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
			LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
			THE SOFTWARE.
			*/
		(function(){function h(a){return function(){return this[a]}}function k(a){return function(){return a}}var l=this;
		function aa(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
		else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function m(a){return"string"==typeof a}function ba(a,b,c){return a.call.apply(a.bind,arguments)}function ca(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
		function n(a,b,c){n=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ba:ca;return n.apply(null,arguments)}function da(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}function r(a){var b=s;function c(){}c.prototype=b.prototype;a.t=b.prototype;a.prototype=new c}
		Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return n.apply(null,c)}return n(this,a)};function t(a,b,c){this.a=a;this.b=b||1;this.d=c||1};var u,ea,fa,ga;function ha(){return l.navigator?l.navigator.userAgent:null}ga=fa=ea=u=!1;var w;if(w=ha()){var ia=l.navigator;u=0==w.lastIndexOf("Opera",0);ea=!u&&(-1!=w.indexOf("MSIE")||-1!=w.indexOf("Trident"));fa=!u&&-1!=w.indexOf("WebKit");ga=!u&&!fa&&!ea&&"Gecko"==ia.product}var y=ea,ja=ga,ka=fa;function la(){var a=l.document;return a?a.documentMode:void 0}var ma;
		n:{var na="",oa;if(u&&l.opera)var pa=l.opera.version,na="function"==typeof pa?pa():pa;else if(ja?oa=/rv\:([^\);]+)(\)|;)/:y?oa=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:ka&&(oa=/WebKit\/(\S+)/),oa)var qa=oa.exec(ha()),na=qa?qa[1]:"";if(y){var ra=la();if(ra>parseFloat(na)){ma=String(ra);break n}}ma=na}var sa=ma,ta={};
		function ua(a){if(!ta[a]){for(var b=0,c=String(sa).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",p=d[f]||"",q=RegExp("(\\d*)(\\D*)","g"),x=RegExp("(\\d*)(\\D*)","g");do{var v=q.exec(g)||["","",""],J=x.exec(p)||["","",""];if(0==v[0].length&&0==J[0].length)break;b=((0==v[1].length?0:parseInt(v[1],10))<(0==J[1].length?0:parseInt(J[1],10))?-1:(0==v[1].length?0:parseInt(v[1],10))>
		(0==J[1].length?0:parseInt(J[1],10))?1:0)||((0==v[2].length)<(0==J[2].length)?-1:(0==v[2].length)>(0==J[2].length)?1:0)||(v[2]<J[2]?-1:v[2]>J[2]?1:0)}while(0==b)}ta[a]=0<=b}}var va=l.document,wa=va&&y?la()||("CSS1Compat"==va.compatMode?parseInt(sa,10):5):void 0;var z=y&&!(y&&9<=wa),xa=y&&!(y&&8<=wa);function A(a,b,c,d){this.a=a;this.nodeName=c;this.nodeValue=d;this.nodeType=2;this.parentNode=this.ownerElement=b}function ya(a,b){var c=xa&&"href"==b.nodeName?a.getAttribute(b.nodeName,2):b.nodeValue;return new A(b,a,b.nodeName,c)};function za(a){this.b=a;this.a=0}function Aa(a){a=a.match(Ba);for(var b=0;b<a.length;b++)Ca.test(a[b])&&a.splice(b,1);return new za(a)}var Ba=RegExp("\\$?(?:(?![0-9-])[\\w-]+:)?(?![0-9-])[\\w-]+|\\/\\/|\\.\\.|::|\\d+(?:\\.\\d*)?|\\.\\d+|\"[^\"]*\"|'[^']*'|[!<>]=|\\s+|.","g"),Ca=/^\s/;function B(a,b){return a.b[a.a+(b||0)]}function C(a){return a.b[a.a++]};var D=Array.prototype,Da=D.indexOf?function(a,b,c){return D.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(m(a))return m(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},E=D.forEach?function(a,b,c){D.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=m(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ea=D.filter?function(a,b,c){return D.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=m(a)?
		a.split(""):a,p=0;p<d;p++)if(p in g){var q=g[p];b.call(c,q,p,a)&&(e[f++]=q)}return e},F=D.reduce?function(a,b,c,d){d&&(b=n(b,d));return D.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;E(a,function(c,g){e=b.call(d,e,c,g,a)});return e},Fa=D.some?function(a,b,c){return D.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=m(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1};
		function Ga(a,b){var c;n:{c=a.length;for(var d=m(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break n}c=-1}return 0>c?null:m(a)?a.charAt(c):a[c]}function Ha(a){return D.concat.apply(D,arguments)}function Ia(a,b,c){return 2>=arguments.length?D.slice.call(a,b):D.slice.call(a,b,c)};!ja&&!y||y&&y&&9<=wa||ja&&ua("1.9.1");y&&ua("9");function Ja(a,b){if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a}
		function Ka(a,b){if(a==b)return 0;if(a.compareDocumentPosition)return a.compareDocumentPosition(b)&2?1:-1;if(y&&!(y&&9<=wa)){if(9==a.nodeType)return-1;if(9==b.nodeType)return 1}if("sourceIndex"in a||a.parentNode&&"sourceIndex"in a.parentNode){var c=1==a.nodeType,d=1==b.nodeType;if(c&&d)return a.sourceIndex-b.sourceIndex;var e=a.parentNode,f=b.parentNode;return e==f?La(a,b):!c&&Ja(e,b)?-1*Ma(a,b):!d&&Ja(f,a)?Ma(b,a):(c?a.sourceIndex:e.sourceIndex)-(d?b.sourceIndex:f.sourceIndex)}d=9==a.nodeType?a:
		a.ownerDocument||a.document;c=d.createRange();c.selectNode(a);c.collapse(!0);d=d.createRange();d.selectNode(b);d.collapse(!0);return c.compareBoundaryPoints(l.Range.START_TO_END,d)}function Ma(a,b){var c=a.parentNode;if(c==b)return-1;for(var d=b;d.parentNode!=c;)d=d.parentNode;return La(d,a)}function La(a,b){for(var c=b;c=c.previousSibling;)if(c==a)return-1;return 1};function G(a){var b=null,c=a.nodeType;1==c&&(b=a.textContent,b=void 0==b||null==b?a.innerText:b,b=void 0==b||null==b?"":b);if("string"!=typeof b)if(z&&"title"==a.nodeName.toLowerCase()&&1==c)b=a.text;else if(9==c||1==c){a=9==c?a.documentElement:a.firstChild;for(var c=0,d=[],b="";a;){do 1!=a.nodeType&&(b+=a.nodeValue),z&&"title"==a.nodeName.toLowerCase()&&(b+=a.text),d[c++]=a;while(a=a.firstChild);for(;c&&!(a=d[--c].nextSibling););}}else b=a.nodeValue;return""+b}
		function H(a,b,c){if(null===b)return!0;try{if(!a.getAttribute)return!1}catch(d){return!1}xa&&"class"==b&&(b="className");return null==c?!!a.getAttribute(b):a.getAttribute(b,2)==c}function Na(a,b,c,d,e){return(z?Oa:Pa).call(null,a,b,m(c)?c:null,m(d)?d:null,e||new I)}
		function Oa(a,b,c,d,e){if(a instanceof K||8==a.b||c&&null===a.b){var f=b.all;if(!f)return e;a=Qa(a);if("*"!=a&&(f=b.getElementsByTagName(a),!f))return e;if(c){for(var g=[],p=0;b=f[p++];)H(b,c,d)&&g.push(b);f=g}for(p=0;b=f[p++];)"*"==a&&"!"==b.tagName||L(e,b);return e}Ra(a,b,c,d,e);return e}
		function Pa(a,b,c,d,e){b.getElementsByName&&d&&"name"==c&&!y?(b=b.getElementsByName(d),E(b,function(b){a.a(b)&&L(e,b)})):b.getElementsByClassName&&d&&"class"==c?(b=b.getElementsByClassName(d),E(b,function(b){b.className==d&&a.a(b)&&L(e,b)})):a instanceof M?Ra(a,b,c,d,e):b.getElementsByTagName&&(b=b.getElementsByTagName(a.d()),E(b,function(a){H(a,c,d)&&L(e,a)}));return e}
		function Sa(a,b,c,d,e){var f;if((a instanceof K||8==a.b||c&&null===a.b)&&(f=b.childNodes)){var g=Qa(a);if("*"!=g&&(f=Ea(f,function(a){return a.tagName&&a.tagName.toLowerCase()==g}),!f))return e;c&&(f=Ea(f,function(a){return H(a,c,d)}));E(f,function(a){"*"==g&&("!"==a.tagName||"*"==g&&1!=a.nodeType)||L(e,a)});return e}return Ta(a,b,c,d,e)}function Ta(a,b,c,d,e){for(b=b.firstChild;b;b=b.nextSibling)H(b,c,d)&&a.a(b)&&L(e,b);return e}
		function Ra(a,b,c,d,e){for(b=b.firstChild;b;b=b.nextSibling)H(b,c,d)&&a.a(b)&&L(e,b),Ra(a,b,c,d,e)}function Qa(a){if(a instanceof M){if(8==a.b)return"!";if(null===a.b)return"*"}return a.d()};function I(){this.b=this.a=null;this.i=0}function Ua(a){this.b=a;this.a=this.d=null}function Va(a,b){if(!a.a)return b;if(!b.a)return a;for(var c=a.a,d=b.a,e=null,f=null,g=0;c&&d;)c.b==d.b||c.b instanceof A&&d.b instanceof A&&c.b.a==d.b.a?(f=c,c=c.a,d=d.a):0<Ka(c.b,d.b)?(f=d,d=d.a):(f=c,c=c.a),(f.d=e)?e.a=f:a.a=f,e=f,g++;for(f=c||d;f;)f.d=e,e=e.a=f,g++,f=f.a;a.b=e;a.i=g;return a}function Wa(a,b){var c=new Ua(b);c.a=a.a;a.b?a.a.d=c:a.a=a.b=c;a.a=c;a.i++}
		function L(a,b){var c=new Ua(b);c.d=a.b;a.a?a.b.a=c:a.a=a.b=c;a.b=c;a.i++}function Xa(a){return(a=a.a)?a.b:null}function Ya(a){return(a=Xa(a))?G(a):""}function N(a,b){return new Za(a,!!b)}function Za(a,b){this.d=a;this.b=(this.c=b)?a.b:a.a;this.a=null}function O(a){var b=a.b;if(null==b)return null;var c=a.a=b;a.b=a.c?b.d:b.a;return c.b};function $a(a){switch(a.nodeType){case 1:return da(ab,a);case 9:return $a(a.documentElement);case 2:return a.ownerElement?$a(a.ownerElement):bb;case 11:case 10:case 6:case 12:return bb;default:return a.parentNode?$a(a.parentNode):bb}}function bb(){return null}function ab(a,b){if(a.prefix==b)return a.namespaceURI||"http://www.w3.org/1999/xhtml";var c=a.getAttributeNode("xmlns:"+b);return c&&c.specified?c.value||null:a.parentNode&&9!=a.parentNode.nodeType?ab(a.parentNode,b):null};function s(a){this.g=a;this.b=this.f=!1;this.d=null}function P(a){return"\n  "+a.toString().split("\n").join("\n  ")}function cb(a,b){a.f=b}function db(a,b){a.b=b}function Q(a,b){var c=a.a(b);return c instanceof I?+Ya(c):+c}function R(a,b){var c=a.a(b);return c instanceof I?Ya(c):""+c}function S(a,b){var c=a.a(b);return c instanceof I?!!c.i:!!c};function eb(a,b,c){s.call(this,a.g);this.c=a;this.e=b;this.j=c;this.f=b.f||c.f;this.b=b.b||c.b;this.c==fb&&(c.b||c.f||4==c.g||0==c.g||!b.d?b.b||b.f||4==b.g||0==b.g||!c.d||(this.d={name:c.d.name,l:b}):this.d={name:b.d.name,l:c})}r(eb);
		function T(a,b,c,d,e){b=b.a(d);c=c.a(d);var f;if(b instanceof I&&c instanceof I){e=N(b);for(d=O(e);d;d=O(e))for(b=N(c),f=O(b);f;f=O(b))if(a(G(d),G(f)))return!0;return!1}if(b instanceof I||c instanceof I){b instanceof I?e=b:(e=c,c=b);e=N(e);b=typeof c;for(d=O(e);d;d=O(e)){switch(b){case "number":d=+G(d);break;case "boolean":d=!!G(d);break;case "string":d=G(d);break;default:throw Error("Illegal primitive type for comparison.");}if(a(d,c))return!0}return!1}return e?"boolean"==typeof b||"boolean"==typeof c?
		a(!!b,!!c):"number"==typeof b||"number"==typeof c?a(+b,+c):a(b,c):a(+b,+c)}eb.prototype.a=function(a){return this.c.k(this.e,this.j,a)};eb.prototype.toString=function(){var a="Binary Expression: "+this.c,a=a+P(this.e);return a+=P(this.j)};function gb(a,b,c,d){this.a=a;this.p=b;this.g=c;this.k=d}gb.prototype.toString=h("a");var hb={};function U(a,b,c,d){if(hb.hasOwnProperty(a))throw Error("Binary operator already created: "+a);a=new gb(a,b,c,d);return hb[a.toString()]=a}
		U("div",6,1,function(a,b,c){return Q(a,c)/Q(b,c)});U("mod",6,1,function(a,b,c){return Q(a,c)%Q(b,c)});U("*",6,1,function(a,b,c){return Q(a,c)*Q(b,c)});U("+",5,1,function(a,b,c){return Q(a,c)+Q(b,c)});U("-",5,1,function(a,b,c){return Q(a,c)-Q(b,c)});U("<",4,2,function(a,b,c){return T(function(a,b){return a<b},a,b,c)});U(">",4,2,function(a,b,c){return T(function(a,b){return a>b},a,b,c)});U("<=",4,2,function(a,b,c){return T(function(a,b){return a<=b},a,b,c)});
		U(">=",4,2,function(a,b,c){return T(function(a,b){return a>=b},a,b,c)});var fb=U("=",3,2,function(a,b,c){return T(function(a,b){return a==b},a,b,c,!0)});U("!=",3,2,function(a,b,c){return T(function(a,b){return a!=b},a,b,c,!0)});U("and",2,2,function(a,b,c){return S(a,c)&&S(b,c)});U("or",1,2,function(a,b,c){return S(a,c)||S(b,c)});function ib(a,b){if(b.a.length&&4!=a.g)throw Error("Primary expression must evaluate to nodeset if filter has predicate(s).");s.call(this,a.g);this.c=a;this.e=b;this.f=a.f;this.b=a.b}r(ib);ib.prototype.a=function(a){a=this.c.a(a);return jb(this.e,a)};ib.prototype.toString=function(){var a;a="Filter:"+P(this.c);return a+=P(this.e)};function kb(a,b){if(b.length<a.o)throw Error("Function "+a.h+" expects at least"+a.o+" arguments, "+b.length+" given");if(null!==a.n&&b.length>a.n)throw Error("Function "+a.h+" expects at most "+a.n+" arguments, "+b.length+" given");a.s&&E(b,function(b,d){if(4!=b.g)throw Error("Argument "+d+" to function "+a.h+" is not of type Nodeset: "+b);});s.call(this,a.g);this.e=a;this.c=b;cb(this,a.f||Fa(b,function(a){return a.f}));db(this,a.r&&!b.length||a.q&&!!b.length||Fa(b,function(a){return a.b}))}r(kb);
		kb.prototype.a=function(a){return this.e.k.apply(null,Ha(a,this.c))};kb.prototype.toString=function(){var a="Function: "+this.e;if(this.c.length)var b=F(this.c,function(a,b){return a+P(b)},"Arguments:"),a=a+P(b);return a};function lb(a,b,c,d,e,f,g,p,q){this.h=a;this.g=b;this.f=c;this.r=d;this.q=e;this.k=f;this.o=g;this.n=void 0!==p?p:g;this.s=!!q}lb.prototype.toString=h("h");var mb={};
		function V(a,b,c,d,e,f,g,p){if(mb.hasOwnProperty(a))throw Error("Function already created: "+a+".");mb[a]=new lb(a,b,c,d,!1,e,f,g,p)}V("boolean",2,!1,!1,function(a,b){return S(b,a)},1);V("ceiling",1,!1,!1,function(a,b){return Math.ceil(Q(b,a))},1);V("concat",3,!1,!1,function(a,b){var c=Ia(arguments,1);return F(c,function(b,c){return b+R(c,a)},"")},2,null);V("contains",2,!1,!1,function(a,b,c){b=R(b,a);a=R(c,a);return-1!=b.indexOf(a)},2);V("count",1,!1,!1,function(a,b){return b.a(a).i},1,1,!0);
		V("false",2,!1,!1,k(!1),0);V("floor",1,!1,!1,function(a,b){return Math.floor(Q(b,a))},1);V("id",4,!1,!1,function(a,b){function c(a){if(z){var b=e.all[a];if(b){if(b.nodeType&&a==b.id)return b;if(b.length)return Ga(b,function(b){return a==b.id})}return null}return e.getElementById(a)}var d=a.a,e=9==d.nodeType?d:d.ownerDocument,d=R(b,a).split(/\s+/),f=[];E(d,function(a){a=c(a);!a||0<=Da(f,a)||f.push(a)});f.sort(Ka);var g=new I;E(f,function(a){L(g,a)});return g},1);V("lang",2,!1,!1,k(!1),1);
		V("last",1,!0,!1,function(a){if(1!=arguments.length)throw Error("Function last expects ()");return a.d},0);V("local-name",3,!1,!0,function(a,b){var c=b?Xa(b.a(a)):a.a;return c?c.nodeName.toLowerCase():""},0,1,!0);V("name",3,!1,!0,function(a,b){var c=b?Xa(b.a(a)):a.a;return c?c.nodeName.toLowerCase():""},0,1,!0);V("namespace-uri",3,!0,!1,k(""),0,1,!0);V("normalize-space",3,!1,!0,function(a,b){return(b?R(b,a):G(a.a)).replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")},0,1);
		V("not",2,!1,!1,function(a,b){return!S(b,a)},1);V("number",1,!1,!0,function(a,b){return b?Q(b,a):+G(a.a)},0,1);V("position",1,!0,!1,function(a){return a.b},0);V("round",1,!1,!1,function(a,b){return Math.round(Q(b,a))},1);V("starts-with",2,!1,!1,function(a,b,c){b=R(b,a);a=R(c,a);return 0==b.lastIndexOf(a,0)},2);V("string",3,!1,!0,function(a,b){return b?R(b,a):G(a.a)},0,1);V("string-length",1,!1,!0,function(a,b){return(b?R(b,a):G(a.a)).length},0,1);
		V("substring",3,!1,!1,function(a,b,c,d){c=Q(c,a);if(isNaN(c)||Infinity==c||-Infinity==c)return"";d=d?Q(d,a):Infinity;if(isNaN(d)||-Infinity===d)return"";c=Math.round(c)-1;var e=Math.max(c,0);a=R(b,a);if(Infinity==d)return a.substring(e);b=Math.round(d);return a.substring(e,c+b)},2,3);V("substring-after",3,!1,!1,function(a,b,c){b=R(b,a);a=R(c,a);c=b.indexOf(a);return-1==c?"":b.substring(c+a.length)},2);
		V("substring-before",3,!1,!1,function(a,b,c){b=R(b,a);a=R(c,a);a=b.indexOf(a);return-1==a?"":b.substring(0,a)},2);V("sum",1,!1,!1,function(a,b){for(var c=N(b.a(a)),d=0,e=O(c);e;e=O(c))d+=+G(e);return d},1,1,!0);V("translate",3,!1,!1,function(a,b,c,d){b=R(b,a);c=R(c,a);var e=R(d,a);a=[];for(d=0;d<c.length;d++){var f=c.charAt(d);f in a||(a[f]=e.charAt(d))}c="";for(d=0;d<b.length;d++)f=b.charAt(d),c+=f in a?a[f]:f;return c},3);V("true",2,!1,!1,k(!0),0);function M(a,b){this.e=a;this.c=void 0!==b?b:null;this.b=null;switch(a){case "comment":this.b=8;break;case "text":this.b=3;break;case "processing-instruction":this.b=7;break;case "node":break;default:throw Error("Unexpected argument");}}function nb(a){return"comment"==a||"text"==a||"processing-instruction"==a||"node"==a}M.prototype.a=function(a){return null===this.b||this.b==a.nodeType};M.prototype.d=h("e");M.prototype.toString=function(){var a="Kind Test: "+this.e;null===this.c||(a+=P(this.c));return a};function ob(a){s.call(this,3);this.c=a.substring(1,a.length-1)}r(ob);ob.prototype.a=h("c");ob.prototype.toString=function(){return"Literal: "+this.c};function K(a,b){this.h=a.toLowerCase();this.c=b?b.toLowerCase():"http://www.w3.org/1999/xhtml"}K.prototype.a=function(a){var b=a.nodeType;return 1!=b&&2!=b?!1:"*"!=this.h&&this.h!=a.nodeName.toLowerCase()?!1:this.c==(a.namespaceURI?a.namespaceURI.toLowerCase():"http://www.w3.org/1999/xhtml")};K.prototype.d=h("h");K.prototype.toString=function(){return"Name Test: "+("http://www.w3.org/1999/xhtml"==this.c?"":this.c+":")+this.h};function pb(a){s.call(this,1);this.c=a}r(pb);pb.prototype.a=h("c");pb.prototype.toString=function(){return"Number: "+this.c};function qb(a,b){s.call(this,a.g);this.e=a;this.c=b;this.f=a.f;this.b=a.b;if(1==this.c.length){var c=this.c[0];c.m||c.c!=rb||(c=c.j,"*"!=c.d()&&(this.d={name:c.d(),l:null}))}}r(qb);function sb(){s.call(this,4)}r(sb);sb.prototype.a=function(a){var b=new I;a=a.a;9==a.nodeType?L(b,a):L(b,a.ownerDocument);return b};sb.prototype.toString=k("Root Helper Expression");function tb(){s.call(this,4)}r(tb);tb.prototype.a=function(a){var b=new I;L(b,a.a);return b};tb.prototype.toString=k("Context Helper Expression");
		qb.prototype.a=function(a){var b=this.e.a(a);if(!(b instanceof I))throw Error("Filter expression must evaluate to nodeset.");a=this.c;for(var c=0,d=a.length;c<d&&b.i;c++){var e=a[c],f=N(b,e.c.a),g;if(e.f||e.c!=ub)if(e.f||e.c!=vb)for(g=O(f),b=e.a(new t(g));null!=(g=O(f));)g=e.a(new t(g)),b=Va(b,g);else g=O(f),b=e.a(new t(g));else{for(g=O(f);(b=O(f))&&(!g.contains||g.contains(b))&&b.compareDocumentPosition(g)&8;g=b);b=e.a(new t(g))}}return b};
		qb.prototype.toString=function(){var a;a="Path Expression:"+P(this.e);if(this.c.length){var b=F(this.c,function(a,b){return a+P(b)},"Steps:");a+=P(b)}return a};function wb(a,b){this.a=a;this.b=!!b}
		function jb(a,b,c){for(c=c||0;c<a.a.length;c++)for(var d=a.a[c],e=N(b),f=b.i,g,p=0;g=O(e);p++){var q=a.b?f-p:p+1;g=d.a(new t(g,q,f));if("number"==typeof g)q=q==g;else if("string"==typeof g||"boolean"==typeof g)q=!!g;else if(g instanceof I)q=0<g.i;else throw Error("Predicate.evaluate returned an unexpected type.");if(!q){q=e;g=q.d;var x=q.a;if(!x)throw Error("Next must be called at least once before remove.");var v=x.d,x=x.a;v?v.a=x:g.a=x;x?x.d=v:g.b=v;g.i--;q.a=null}}return b}
		wb.prototype.toString=function(){return F(this.a,function(a,b){return a+P(b)},"Predicates:")};function W(a,b,c,d){s.call(this,4);this.c=a;this.j=b;this.e=c||new wb([]);this.m=!!d;b=0<this.e.a.length?this.e.a[0].d:null;a.b&&b&&(a=b.name,a=z?a.toLowerCase():a,this.d={name:a,l:b.l});n:{a=this.e;for(b=0;b<a.a.length;b++)if(c=a.a[b],c.f||1==c.g||0==c.g){a=!0;break n}a=!1}this.f=a}r(W);
		W.prototype.a=function(a){var b=a.a,c=null,c=this.d,d=null,e=null,f=0;c&&(d=c.name,e=c.l?R(c.l,a):null,f=1);if(this.m)if(this.f||this.c!=xb)if(a=N((new W(yb,new M("node"))).a(a)),b=O(a))for(c=this.k(b,d,e,f);null!=(b=O(a));)c=Va(c,this.k(b,d,e,f));else c=new I;else c=Na(this.j,b,d,e),c=jb(this.e,c,f);else c=this.k(a.a,d,e,f);return c};W.prototype.k=function(a,b,c,d){a=this.c.d(this.j,a,b,c);return a=jb(this.e,a,d)};
		W.prototype.toString=function(){var a;a="Step:"+P("Operator: "+(this.m?"//":"/"));this.c.h&&(a+=P("Axis: "+this.c));a+=P(this.j);if(this.e.a.length){var b=F(this.e.a,function(a,b){return a+P(b)},"Predicates:");a+=P(b)}return a};function zb(a,b,c,d){this.h=a;this.d=b;this.a=c;this.b=d}zb.prototype.toString=h("h");var Ab={};function X(a,b,c,d){if(Ab.hasOwnProperty(a))throw Error("Axis already created: "+a);b=new zb(a,b,c,!!d);return Ab[a]=b}
		X("ancestor",function(a,b){for(var c=new I,d=b;d=d.parentNode;)a.a(d)&&Wa(c,d);return c},!0);X("ancestor-or-self",function(a,b){var c=new I,d=b;do a.a(d)&&Wa(c,d);while(d=d.parentNode);return c},!0);
		var rb=X("attribute",function(a,b){var c=new I,d=a.d();if("style"==d&&b.style&&z)return L(c,new A(b.style,b,"style",b.style.cssText)),c;var e=b.attributes;if(e)if(a instanceof M&&null===a.b||"*"==d)for(var d=0,f;f=e[d];d++)z?f.nodeValue&&L(c,ya(b,f)):L(c,f);else(f=e.getNamedItem(d))&&(z?f.nodeValue&&L(c,ya(b,f)):L(c,f));return c},!1),xb=X("child",function(a,b,c,d,e){return(z?Sa:Ta).call(null,a,b,m(c)?c:null,m(d)?d:null,e||new I)},!1,!0);X("descendant",Na,!1,!0);
		var yb=X("descendant-or-self",function(a,b,c,d){var e=new I;H(b,c,d)&&a.a(b)&&L(e,b);return Na(a,b,c,d,e)},!1,!0),ub=X("following",function(a,b,c,d){var e=new I;do for(var f=b;f=f.nextSibling;)H(f,c,d)&&a.a(f)&&L(e,f),e=Na(a,f,c,d,e);while(b=b.parentNode);return e},!1,!0);X("following-sibling",function(a,b){for(var c=new I,d=b;d=d.nextSibling;)a.a(d)&&L(c,d);return c},!1);X("namespace",function(){return new I},!1);
		var Bb=X("parent",function(a,b){var c=new I;if(9==b.nodeType)return c;if(2==b.nodeType)return L(c,b.ownerElement),c;var d=b.parentNode;a.a(d)&&L(c,d);return c},!1),vb=X("preceding",function(a,b,c,d){var e=new I,f=[];do f.unshift(b);while(b=b.parentNode);for(var g=1,p=f.length;g<p;g++){var q=[];for(b=f[g];b=b.previousSibling;)q.unshift(b);for(var x=0,v=q.length;x<v;x++)b=q[x],H(b,c,d)&&a.a(b)&&L(e,b),e=Na(a,b,c,d,e)}return e},!0,!0);
		X("preceding-sibling",function(a,b){for(var c=new I,d=b;d=d.previousSibling;)a.a(d)&&Wa(c,d);return c},!0);var Cb=X("self",function(a,b){var c=new I;a.a(b)&&L(c,b);return c},!1);function Db(a){s.call(this,1);this.c=a;this.f=a.f;this.b=a.b}r(Db);Db.prototype.a=function(a){return-Q(this.c,a)};Db.prototype.toString=function(){return"Unary Expression: -"+P(this.c)};function Eb(a){s.call(this,4);this.c=a;cb(this,Fa(this.c,function(a){return a.f}));db(this,Fa(this.c,function(a){return a.b}))}r(Eb);Eb.prototype.a=function(a){var b=new I;E(this.c,function(c){c=c.a(a);if(!(c instanceof I))throw Error("Path expression must evaluate to NodeSet.");b=Va(b,c)});return b};Eb.prototype.toString=function(){return F(this.c,function(a,b){return a+P(b)},"Union Expression:")};function Fb(a,b){this.a=a;this.b=b}function Gb(a){for(var b,c=[];;){Y(a,"Missing right hand side of binary expression.");b=Hb(a);var d=C(a.a);if(!d)break;var e=(d=hb[d]||null)&&d.p;if(!e){a.a.a--;break}for(;c.length&&e<=c[c.length-1].p;)b=new eb(c.pop(),c.pop(),b);c.push(b,d)}for(;c.length;)b=new eb(c.pop(),c.pop(),b);return b}function Y(a,b){if(a.a.b.length<=a.a.a)throw Error(b);}function Ib(a,b){var c=C(a.a);if(c!=b)throw Error("Bad token, expected: "+b+" got: "+c);}
		function Jb(a){a=C(a.a);if(")"!=a)throw Error("Bad token: "+a);}function Kb(a){a=C(a.a);if(2>a.length)throw Error("Unclosed literal string");return new ob(a)}function Lb(a){var b=C(a.a),c=b.indexOf(":");if(-1==c)return new K(b);var d=b.substring(0,c);a=a.b(d);if(!a)throw Error("Namespace prefix not declared: "+d);b=b.substr(c+1);return new K(b,a)}
		function Mb(a){var b,c=[],d;if("/"==B(a.a)||"//"==B(a.a)){b=C(a.a);d=B(a.a);if("/"==b&&(a.a.b.length<=a.a.a||"."!=d&&".."!=d&&"@"!=d&&"*"!=d&&!/(?![0-9])[\w]/.test(d)))return new sb;d=new sb;Y(a,"Missing next location step.");b=Nb(a,b);c.push(b)}else{n:{b=B(a.a);d=b.charAt(0);switch(d){case "$":throw Error("Variable reference not allowed in HTML XPath");case "(":C(a.a);b=Gb(a);Y(a,'unclosed "("');Ib(a,")");break;case '"':case "'":b=Kb(a);break;default:if(isNaN(+b))if(!nb(b)&&/(?![0-9])[\w]/.test(d)&&
		"("==B(a.a,1)){b=C(a.a);b=mb[b]||null;C(a.a);for(d=[];")"!=B(a.a);){Y(a,"Missing function argument list.");d.push(Gb(a));if(","!=B(a.a))break;C(a.a)}Y(a,"Unclosed function argument list.");Jb(a);b=new kb(b,d)}else{b=null;break n}else b=new pb(+C(a.a))}"["==B(a.a)&&(d=new wb(Ob(a)),b=new ib(b,d))}if(b)if("/"==B(a.a)||"//"==B(a.a))d=b;else return b;else b=Nb(a,"/"),d=new tb,c.push(b)}for(;"/"==B(a.a)||"//"==B(a.a);)b=C(a.a),Y(a,"Missing next location step."),b=Nb(a,b),c.push(b);return new qb(d,c)}
		function Nb(a,b){var c,d,e;if("/"!=b&&"//"!=b)throw Error('Step op should be "/" or "//"');if("."==B(a.a))return d=new W(Cb,new M("node")),C(a.a),d;if(".."==B(a.a))return d=new W(Bb,new M("node")),C(a.a),d;var f;if("@"==B(a.a))f=rb,C(a.a),Y(a,"Missing attribute name");else if("::"==B(a.a,1)){if(!/(?![0-9])[\w]/.test(B(a.a).charAt(0)))throw Error("Bad token: "+C(a.a));c=C(a.a);f=Ab[c]||null;if(!f)throw Error("No axis with name: "+c);C(a.a);Y(a,"Missing node name")}else f=xb;c=B(a.a);if(/(?![0-9])[\w]/.test(c.charAt(0)))if("("==
		B(a.a,1)){if(!nb(c))throw Error("Invalid node type: "+c);c=C(a.a);if(!nb(c))throw Error("Invalid type name: "+c);Ib(a,"(");Y(a,"Bad nodetype");e=B(a.a).charAt(0);var g=null;if('"'==e||"'"==e)g=Kb(a);Y(a,"Bad nodetype");Jb(a);c=new M(c,g)}else c=Lb(a);else if("*"==c)c=Lb(a);else throw Error("Bad token: "+C(a.a));e=new wb(Ob(a),f.a);return d||new W(f,c,e,"//"==b)}
		function Ob(a){for(var b=[];"["==B(a.a);){C(a.a);Y(a,"Missing predicate expression.");var c=Gb(a);b.push(c);Y(a,"Unclosed predicate expression.");Ib(a,"]")}return b}function Hb(a){if("-"==B(a.a))return C(a.a),new Db(Hb(a));var b=Mb(a);if("|"!=B(a.a))a=b;else{for(b=[b];"|"==C(a.a);)Y(a,"Missing next union location path."),b.push(Mb(a));a.a.a--;a=new Eb(b)}return a};function Pb(a,b){if(!a.length)throw Error("Empty XPath expression.");var c=Aa(a);if(c.b.length<=c.a)throw Error("Invalid XPath expression.");b?"function"==aa(b)||(b=n(b.lookupNamespaceURI,b)):b=k(null);var d=Gb(new Fb(c,b));if(!(c.b.length<=c.a))throw Error("Bad token: "+C(c));this.evaluate=function(a,b){var c=d.a(new t(a));return new Z(c,b)}}
		function Z(a,b){if(0==b)if(a instanceof I)b=4;else if("string"==typeof a)b=2;else if("number"==typeof a)b=1;else if("boolean"==typeof a)b=3;else throw Error("Unexpected evaluation result.");if(2!=b&&1!=b&&3!=b&&!(a instanceof I))throw Error("value could not be converted to the specified type");this.resultType=b;var c;switch(b){case 2:this.stringValue=a instanceof I?Ya(a):""+a;break;case 1:this.numberValue=a instanceof I?+Ya(a):+a;break;case 3:this.booleanValue=a instanceof I?0<a.i:!!a;break;case 4:case 5:case 6:case 7:var d=
		N(a);c=[];for(var e=O(d);e;e=O(d))c.push(e instanceof A?e.a:e);this.snapshotLength=a.i;this.invalidIteratorState=!1;break;case 8:case 9:d=Xa(a);this.singleNodeValue=d instanceof A?d.a:d;break;default:throw Error("Unknown XPathResult type.");}var f=0;this.iterateNext=function(){if(4!=b&&5!=b)throw Error("iterateNext called with wrong result type");return f>=c.length?null:c[f++]};this.snapshotItem=function(a){if(6!=b&&7!=b)throw Error("snapshotItem called with wrong result type");return a>=c.length||
		0>a?null:c[a]}}Z.ANY_TYPE=0;Z.NUMBER_TYPE=1;Z.STRING_TYPE=2;Z.BOOLEAN_TYPE=3;Z.UNORDERED_NODE_ITERATOR_TYPE=4;Z.ORDERED_NODE_ITERATOR_TYPE=5;Z.UNORDERED_NODE_SNAPSHOT_TYPE=6;Z.ORDERED_NODE_SNAPSHOT_TYPE=7;Z.ANY_UNORDERED_NODE_TYPE=8;Z.FIRST_ORDERED_NODE_TYPE=9;function Qb(a){this.lookupNamespaceURI=$a(a)};function Rb(a){a=a||l;var b=a.document;b.evaluate||(a.XPathResult=Z,b.evaluate=function(a,b,e,f){return(new Pb(a,e)).evaluate(b,f)},b.createExpression=function(a,b){return new Pb(a,b)},b.createNSResolver=function(a){return new Qb(a)})}var Sb=["wgxpath","install"],$=l;Sb[0]in $||!$.execScript||$.execScript("var "+Sb[0]);for(var Tb;Sb.length&&(Tb=Sb.shift());)Sb.length||void 0===Rb?$=$[Tb]?$[Tb]:$[Tb]={}:$[Tb]=Rb;})();

		//now activate the code as well
		wgxpath.install();
	}

})();
// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function(){
	/**
	 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
	 * integer value, which faithfully simulates the behavior of a Java "long". This
	 * implementation is derived from LongLib in GWT.
	 *
	 */

	goog = {};
	goog.math = {};


	/**
	 * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
	 * values as *signed* integers.  See the from* functions below for more
	 * convenient ways of constructing Longs.
	 *
	 * The internal representation of a long is the two given signed, 32-bit values.
	 * We use 32-bit pieces because these are the size of integers on which
	 * Javascript performs bit-operations.  For operations like addition and
	 * multiplication, we split each number into 16-bit pieces, which can easily be
	 * multiplied within Javascript's floating-point representation without overflow
	 * or change in sign.
	 *
	 * In the algorithms below, we frequently reduce the negative case to the
	 * positive case by negating the input(s) and then post-processing the result.
	 * Note that we must ALWAYS check specially whether those values are MIN_VALUE
	 * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
	 * a positive number, it overflows back into a negative).  Not handling this
	 * case would often result in infinite recursion.
	 *
	 * @param {number} low  The low (signed) 32 bits of the long.
	 * @param {number} high  The high (signed) 32 bits of the long.
	 * @constructor
	 * @final
	 */
	goog.math.Long = function(low, high) {
	  /**
	   * @type {number}
	   * @private
	   */
	  this.low_ = low | 0;  // force into 32 signed bits.

	  /**
	   * @type {number}
	   * @private
	   */
	  this.high_ = high | 0;  // force into 32 signed bits.
	};


	// NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
	// from* methods on which they depend.


	/**
	 * A cache of the Long representations of small integer values.
	 * @type {!Object}
	 * @private
	 */
	goog.math.Long.IntCache_ = {};


	/**
	 * Returns a Long representing the given (32-bit) integer value.
	 * @param {number} value The 32-bit integer in question.
	 * @return {!goog.math.Long} The corresponding Long value.
	 */
	goog.math.Long.fromInt = function(value) {
	  if (-128 <= value && value < 128) {
	    var cachedObj = goog.math.Long.IntCache_[value];
	    if (cachedObj) {
	      return cachedObj;
	    }
	  }

	  var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
	  if (-128 <= value && value < 128) {
	    goog.math.Long.IntCache_[value] = obj;
	  }
	  return obj;
	};


	/**
	 * Returns a Long representing the given value, provided that it is a finite
	 * number.  Otherwise, zero is returned.
	 * @param {number} value The number in question.
	 * @return {!goog.math.Long} The corresponding Long value.
	 */
	goog.math.Long.fromNumber = function(value) {
	  if (isNaN(value) || !isFinite(value)) {
	    return goog.math.Long.ZERO;
	  } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
	    return goog.math.Long.MIN_VALUE;
	  } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
	    return goog.math.Long.MAX_VALUE;
	  } else if (value < 0) {
	    return goog.math.Long.fromNumber(-value).negate();
	  } else {
	    return new goog.math.Long(
	        (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
	        (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
	  }
	};


	/**
	 * Returns a Long representing the 64-bit integer that comes by concatenating
	 * the given high and low bits.  Each is assumed to use 32 bits.
	 * @param {number} lowBits The low 32-bits.
	 * @param {number} highBits The high 32-bits.
	 * @return {!goog.math.Long} The corresponding Long value.
	 */
	goog.math.Long.fromBits = function(lowBits, highBits) {
	  return new goog.math.Long(lowBits, highBits);
	};


	/**
	 * Returns a Long representation of the given string, written using the given
	 * radix.
	 * @param {string} str The textual representation of the Long.
	 * @param {number=} opt_radix The radix in which the text is written.
	 * @return {!goog.math.Long} The corresponding Long value.
	 */
	goog.math.Long.fromString = function(str, opt_radix) {
	  if (str.length == 0) {
	    throw Error('number format error: empty string');
	  }

	  var radix = opt_radix || 10;
	  if (radix < 2 || 36 < radix) {
	    throw Error('radix out of range: ' + radix);
	  }

	  if (str.charAt(0) == '-') {
	    return goog.math.Long.fromString(str.substring(1), radix).negate();
	  } else if (str.indexOf('-') >= 0) {
	    throw Error('number format error: interior "-" character: ' + str);
	  }

	  // Do several (8) digits each time through the loop, so as to
	  // minimize the calls to the very expensive emulated div.
	  var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));

	  var result = goog.math.Long.ZERO;
	  for (var i = 0; i < str.length; i += 8) {
	    var size = Math.min(8, str.length - i);
	    var value = parseInt(str.substring(i, i + size), radix);
	    if (size < 8) {
	      var power = goog.math.Long.fromNumber(Math.pow(radix, size));
	      result = result.multiply(power).add(goog.math.Long.fromNumber(value));
	    } else {
	      result = result.multiply(radixToPower);
	      result = result.add(goog.math.Long.fromNumber(value));
	    }
	  }
	  return result;
	};


	// NOTE: the compiler should inline these constant values below and then remove
	// these variables, so there should be no runtime penalty for these.


	/**
	 * Number used repeated below in calculations.  This must appear before the
	 * first call to any from* function below.
	 * @type {number}
	 * @private
	 */
	goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;


	/**
	 * @type {number}
	 * @private
	 */
	goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;


	/**
	 * @type {number}
	 * @private
	 */
	goog.math.Long.TWO_PWR_32_DBL_ =
	    goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


	/**
	 * @type {number}
	 * @private
	 */
	goog.math.Long.TWO_PWR_31_DBL_ =
	    goog.math.Long.TWO_PWR_32_DBL_ / 2;


	/**
	 * @type {number}
	 * @private
	 */
	goog.math.Long.TWO_PWR_48_DBL_ =
	    goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


	/**
	 * @type {number}
	 * @private
	 */
	goog.math.Long.TWO_PWR_64_DBL_ =
	    goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;


	/**
	 * @type {number}
	 * @private
	 */
	goog.math.Long.TWO_PWR_63_DBL_ =
	    goog.math.Long.TWO_PWR_64_DBL_ / 2;


	/** @type {!goog.math.Long} */
	goog.math.Long.ZERO = goog.math.Long.fromInt(0);


	/** @type {!goog.math.Long} */
	goog.math.Long.ONE = goog.math.Long.fromInt(1);


	/** @type {!goog.math.Long} */
	goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);


	/** @type {!goog.math.Long} */
	goog.math.Long.MAX_VALUE =
	    goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);


	/** @type {!goog.math.Long} */
	goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);


	/**
	 * @type {!goog.math.Long}
	 * @private
	 */
	goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);


	/** @return {number} The value, assuming it is a 32-bit integer. */
	goog.math.Long.prototype.toInt = function() {
	  return this.low_;
	};


	/** @return {number} The closest floating-point representation to this value. */
	goog.math.Long.prototype.toNumber = function() {
	  return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
	         this.getLowBitsUnsigned();
	};


	/**
	 * @param {number=} opt_radix The radix in which the text should be written.
	 * @return {string} The textual representation of this value.
	 * @override
	 */
	goog.math.Long.prototype.toString = function(opt_radix) {
	  var radix = opt_radix || 10;
	  if (radix < 2 || 36 < radix) {
	    throw Error('radix out of range: ' + radix);
	  }

	  if (this.isZero()) {
	    return '0';
	  }

	  if (this.isNegative()) {
	    if (this.equals(goog.math.Long.MIN_VALUE)) {
	      // We need to change the Long value before it can be negated, so we remove
	      // the bottom-most digit in this base and then recurse to do the rest.
	      var radixLong = goog.math.Long.fromNumber(radix);
	      var div = this.div(radixLong);
	      var rem = div.multiply(radixLong).subtract(this);
	      return div.toString(radix) + rem.toInt().toString(radix);
	    } else {
	      return '-' + this.negate().toString(radix);
	    }
	  }

	  // Do several (6) digits each time through the loop, so as to
	  // minimize the calls to the very expensive emulated div.
	  var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));

	  var rem = this;
	  var result = '';
	  while (true) {
	    var remDiv = rem.div(radixToPower);
	    var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
	    var digits = intval.toString(radix);

	    rem = remDiv;
	    if (rem.isZero()) {
	      return digits + result;
	    } else {
	      while (digits.length < 6) {
	        digits = '0' + digits;
	      }
	      result = '' + digits + result;
	    }
	  }
	};


	/** @return {number} The high 32-bits as a signed value. */
	goog.math.Long.prototype.getHighBits = function() {
	  return this.high_;
	};


	/** @return {number} The low 32-bits as a signed value. */
	goog.math.Long.prototype.getLowBits = function() {
	  return this.low_;
	};


	/** @return {number} The low 32-bits as an unsigned value. */
	goog.math.Long.prototype.getLowBitsUnsigned = function() {
	  return (this.low_ >= 0) ?
	      this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
	};


	/**
	 * @return {number} Returns the number of bits needed to represent the absolute
	 *     value of this Long.
	 */
	goog.math.Long.prototype.getNumBitsAbs = function() {
	  if (this.isNegative()) {
	    if (this.equals(goog.math.Long.MIN_VALUE)) {
	      return 64;
	    } else {
	      return this.negate().getNumBitsAbs();
	    }
	  } else {
	    var val = this.high_ != 0 ? this.high_ : this.low_;
	    for (var bit = 31; bit > 0; bit--) {
	      if ((val & (1 << bit)) != 0) {
	        break;
	      }
	    }
	    return this.high_ != 0 ? bit + 33 : bit + 1;
	  }
	};


	/** @return {boolean} Whether this value is zero. */
	goog.math.Long.prototype.isZero = function() {
	  return this.high_ == 0 && this.low_ == 0;
	};


	/** @return {boolean} Whether this value is negative. */
	goog.math.Long.prototype.isNegative = function() {
	  return this.high_ < 0;
	};


	/** @return {boolean} Whether this value is odd. */
	goog.math.Long.prototype.isOdd = function() {
	  return (this.low_ & 1) == 1;
	};


	/**
	 * @param {goog.math.Long} other Long to compare against.
	 * @return {boolean} Whether this Long equals the other.
	 */
	goog.math.Long.prototype.equals = function(other) {
	  return (this.high_ == other.high_) && (this.low_ == other.low_);
	};


	/**
	 * @param {goog.math.Long} other Long to compare against.
	 * @return {boolean} Whether this Long does not equal the other.
	 */
	goog.math.Long.prototype.notEquals = function(other) {
	  return (this.high_ != other.high_) || (this.low_ != other.low_);
	};


	/**
	 * @param {goog.math.Long} other Long to compare against.
	 * @return {boolean} Whether this Long is less than the other.
	 */
	goog.math.Long.prototype.lessThan = function(other) {
	  return this.compare(other) < 0;
	};


	/**
	 * @param {goog.math.Long} other Long to compare against.
	 * @return {boolean} Whether this Long is less than or equal to the other.
	 */
	goog.math.Long.prototype.lessThanOrEqual = function(other) {
	  return this.compare(other) <= 0;
	};


	/**
	 * @param {goog.math.Long} other Long to compare against.
	 * @return {boolean} Whether this Long is greater than the other.
	 */
	goog.math.Long.prototype.greaterThan = function(other) {
	  return this.compare(other) > 0;
	};


	/**
	 * @param {goog.math.Long} other Long to compare against.
	 * @return {boolean} Whether this Long is greater than or equal to the other.
	 */
	goog.math.Long.prototype.greaterThanOrEqual = function(other) {
	  return this.compare(other) >= 0;
	};


	/**
	 * Compares this Long with the given one.
	 * @param {goog.math.Long} other Long to compare against.
	 * @return {number} 0 if they are the same, 1 if the this is greater, and -1
	 *     if the given one is greater.
	 */
	goog.math.Long.prototype.compare = function(other) {
	  if (this.equals(other)) {
	    return 0;
	  }

	  var thisNeg = this.isNegative();
	  var otherNeg = other.isNegative();
	  if (thisNeg && !otherNeg) {
	    return -1;
	  }
	  if (!thisNeg && otherNeg) {
	    return 1;
	  }

	  // at this point, the signs are the same, so subtraction will not overflow
	  if (this.subtract(other).isNegative()) {
	    return -1;
	  } else {
	    return 1;
	  }
	};


	/** @return {!goog.math.Long} The negation of this value. */
	goog.math.Long.prototype.negate = function() {
	  if (this.equals(goog.math.Long.MIN_VALUE)) {
	    return goog.math.Long.MIN_VALUE;
	  } else {
	    return this.not().add(goog.math.Long.ONE);
	  }
	};


	/**
	 * Returns the sum of this and the given Long.
	 * @param {goog.math.Long} other Long to add to this one.
	 * @return {!goog.math.Long} The sum of this and the given Long.
	 */
	goog.math.Long.prototype.add = function(other) {
	  // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

	  var a48 = this.high_ >>> 16;
	  var a32 = this.high_ & 0xFFFF;
	  var a16 = this.low_ >>> 16;
	  var a00 = this.low_ & 0xFFFF;

	  var b48 = other.high_ >>> 16;
	  var b32 = other.high_ & 0xFFFF;
	  var b16 = other.low_ >>> 16;
	  var b00 = other.low_ & 0xFFFF;

	  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	  c00 += a00 + b00;
	  c16 += c00 >>> 16;
	  c00 &= 0xFFFF;
	  c16 += a16 + b16;
	  c32 += c16 >>> 16;
	  c16 &= 0xFFFF;
	  c32 += a32 + b32;
	  c48 += c32 >>> 16;
	  c32 &= 0xFFFF;
	  c48 += a48 + b48;
	  c48 &= 0xFFFF;
	  return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
	};


	/**
	 * Returns the difference of this and the given Long.
	 * @param {goog.math.Long} other Long to subtract from this.
	 * @return {!goog.math.Long} The difference of this and the given Long.
	 */
	goog.math.Long.prototype.subtract = function(other) {
	  return this.add(other.negate());
	};


	/**
	 * Returns the product of this and the given long.
	 * @param {goog.math.Long} other Long to multiply with this.
	 * @return {!goog.math.Long} The product of this and the other.
	 */
	goog.math.Long.prototype.multiply = function(other) {
	  if (this.isZero()) {
	    return goog.math.Long.ZERO;
	  } else if (other.isZero()) {
	    return goog.math.Long.ZERO;
	  }

	  if (this.equals(goog.math.Long.MIN_VALUE)) {
	    return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
	  } else if (other.equals(goog.math.Long.MIN_VALUE)) {
	    return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
	  }

	  if (this.isNegative()) {
	    if (other.isNegative()) {
	      return this.negate().multiply(other.negate());
	    } else {
	      return this.negate().multiply(other).negate();
	    }
	  } else if (other.isNegative()) {
	    return this.multiply(other.negate()).negate();
	  }

	  // If both longs are small, use float multiplication
	  if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
	      other.lessThan(goog.math.Long.TWO_PWR_24_)) {
	    return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
	  }

	  // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
	  // We can skip products that would overflow.

	  var a48 = this.high_ >>> 16;
	  var a32 = this.high_ & 0xFFFF;
	  var a16 = this.low_ >>> 16;
	  var a00 = this.low_ & 0xFFFF;

	  var b48 = other.high_ >>> 16;
	  var b32 = other.high_ & 0xFFFF;
	  var b16 = other.low_ >>> 16;
	  var b00 = other.low_ & 0xFFFF;

	  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
	  c00 += a00 * b00;
	  c16 += c00 >>> 16;
	  c00 &= 0xFFFF;
	  c16 += a16 * b00;
	  c32 += c16 >>> 16;
	  c16 &= 0xFFFF;
	  c16 += a00 * b16;
	  c32 += c16 >>> 16;
	  c16 &= 0xFFFF;
	  c32 += a32 * b00;
	  c48 += c32 >>> 16;
	  c32 &= 0xFFFF;
	  c32 += a16 * b16;
	  c48 += c32 >>> 16;
	  c32 &= 0xFFFF;
	  c32 += a00 * b32;
	  c48 += c32 >>> 16;
	  c32 &= 0xFFFF;
	  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
	  c48 &= 0xFFFF;
	  return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
	};


	/**
	 * Returns this Long divided by the given one.
	 * @param {goog.math.Long} other Long by which to divide.
	 * @return {!goog.math.Long} This Long divided by the given one.
	 */
	goog.math.Long.prototype.div = function(other) {
	  if (other.isZero()) {
	    throw Error('division by zero');
	  } else if (this.isZero()) {
	    return goog.math.Long.ZERO;
	  }

	  if (this.equals(goog.math.Long.MIN_VALUE)) {
	    if (other.equals(goog.math.Long.ONE) ||
	        other.equals(goog.math.Long.NEG_ONE)) {
	      return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
	    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
	      return goog.math.Long.ONE;
	    } else {
	      // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
	      var halfThis = this.shiftRight(1);
	      var approx = halfThis.div(other).shiftLeft(1);
	      if (approx.equals(goog.math.Long.ZERO)) {
	        return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
	      } else {
	        var rem = this.subtract(other.multiply(approx));
	        var result = approx.add(rem.div(other));
	        return result;
	      }
	    }
	  } else if (other.equals(goog.math.Long.MIN_VALUE)) {
	    return goog.math.Long.ZERO;
	  }

	  if (this.isNegative()) {
	    if (other.isNegative()) {
	      return this.negate().div(other.negate());
	    } else {
	      return this.negate().div(other).negate();
	    }
	  } else if (other.isNegative()) {
	    return this.div(other.negate()).negate();
	  }

	  // Repeat the following until the remainder is less than other:  find a
	  // floating-point that approximates remainder / other *from below*, add this
	  // into the result, and subtract it from the remainder.  It is critical that
	  // the approximate value is less than or equal to the real value so that the
	  // remainder never becomes negative.
	  var res = goog.math.Long.ZERO;
	  var rem = this;
	  while (rem.greaterThanOrEqual(other)) {
	    // Approximate the result of division. This may be a little greater or
	    // smaller than the actual value.
	    var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

	    // We will tweak the approximate result by changing it in the 48-th digit or
	    // the smallest non-fractional digit, whichever is larger.
	    var log2 = Math.ceil(Math.log(approx) / Math.LN2);
	    var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

	    // Decrease the approximation until it is smaller than the remainder.  Note
	    // that if it is too large, the product overflows and is negative.
	    var approxRes = goog.math.Long.fromNumber(approx);
	    var approxRem = approxRes.multiply(other);
	    while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
	      approx -= delta;
	      approxRes = goog.math.Long.fromNumber(approx);
	      approxRem = approxRes.multiply(other);
	    }

	    // We know the answer can't be zero... and actually, zero would cause
	    // infinite recursion since we would make no progress.
	    if (approxRes.isZero()) {
	      approxRes = goog.math.Long.ONE;
	    }

	    res = res.add(approxRes);
	    rem = rem.subtract(approxRem);
	  }
	  return res;
	};


	/**
	 * Returns this Long modulo the given one.
	 * @param {goog.math.Long} other Long by which to mod.
	 * @return {!goog.math.Long} This Long modulo the given one.
	 */
	goog.math.Long.prototype.modulo = function(other) {
	  return this.subtract(this.div(other).multiply(other));
	};


	/** @return {!goog.math.Long} The bitwise-NOT of this value. */
	goog.math.Long.prototype.not = function() {
	  return goog.math.Long.fromBits(~this.low_, ~this.high_);
	};


	/**
	 * Returns the bitwise-AND of this Long and the given one.
	 * @param {goog.math.Long} other The Long with which to AND.
	 * @return {!goog.math.Long} The bitwise-AND of this and the other.
	 */
	goog.math.Long.prototype.and = function(other) {
	  return goog.math.Long.fromBits(this.low_ & other.low_,
	                                 this.high_ & other.high_);
	};


	/**
	 * Returns the bitwise-OR of this Long and the given one.
	 * @param {goog.math.Long} other The Long with which to OR.
	 * @return {!goog.math.Long} The bitwise-OR of this and the other.
	 */
	goog.math.Long.prototype.or = function(other) {
	  return goog.math.Long.fromBits(this.low_ | other.low_,
	                                 this.high_ | other.high_);
	};


	/**
	 * Returns the bitwise-XOR of this Long and the given one.
	 * @param {goog.math.Long} other The Long with which to XOR.
	 * @return {!goog.math.Long} The bitwise-XOR of this and the other.
	 */
	goog.math.Long.prototype.xor = function(other) {
	  return goog.math.Long.fromBits(this.low_ ^ other.low_,
	                                 this.high_ ^ other.high_);
	};


	/**
	 * Returns this Long with bits shifted to the left by the given amount.
	 * @param {number} numBits The number of bits by which to shift.
	 * @return {!goog.math.Long} This shifted to the left by the given amount.
	 */
	goog.math.Long.prototype.shiftLeft = function(numBits) {
	  numBits &= 63;
	  if (numBits == 0) {
	    return this;
	  } else {
	    var low = this.low_;
	    if (numBits < 32) {
	      var high = this.high_;
	      return goog.math.Long.fromBits(
	          low << numBits,
	          (high << numBits) | (low >>> (32 - numBits)));
	    } else {
	      return goog.math.Long.fromBits(0, low << (numBits - 32));
	    }
	  }
	};


	/**
	 * Returns this Long with bits shifted to the right by the given amount.
	 * @param {number} numBits The number of bits by which to shift.
	 * @return {!goog.math.Long} This shifted to the right by the given amount.
	 */
	goog.math.Long.prototype.shiftRight = function(numBits) {
	  numBits &= 63;
	  if (numBits == 0) {
	    return this;
	  } else {
	    var high = this.high_;
	    if (numBits < 32) {
	      var low = this.low_;
	      return goog.math.Long.fromBits(
	          (low >>> numBits) | (high << (32 - numBits)),
	          high >> numBits);
	    } else {
	      return goog.math.Long.fromBits(
	          high >> (numBits - 32),
	          high >= 0 ? 0 : -1);
	    }
	  }
	};


	/**
	 * Returns this Long with bits shifted to the right by the given amount, with
	 * zeros placed into the new leading bits.
	 * @param {number} numBits The number of bits by which to shift.
	 * @return {!goog.math.Long} This shifted to the right by the given amount, with
	 *     zeros placed into the new leading bits.
	 */
	goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
	  numBits &= 63;
	  if (numBits == 0) {
	    return this;
	  } else {
	    var high = this.high_;
	    if (numBits < 32) {
	      var low = this.low_;
	      return goog.math.Long.fromBits(
	          (low >>> numBits) | (high << (32 - numBits)),
	          high >>> numBits);
	    } else if (numBits == 32) {
	      return goog.math.Long.fromBits(high, 0);
	    } else {
	      return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
	    }
	  }
	};

})();
/*
Port of the 64 String Hash function from StringHash.java

*/
(function(){
  
  //Setup the global namespace
  window.mbScope      = window.mbScope || {};
  window.mbScope.StringHash = {};
  var sh = window.mbScope.StringHash;
  
  byteTable = [];
  HSTART = goog.math.Long.fromString('BB40E64DA205B064',16);
  HMULT = goog.math.Long.fromString('7664345821815920749');

  //Populate byte table
  var h = goog.math.Long.fromString('544B2FBACAAF1684', 16);
  for (i = 0; i < 256; i++) 
  {
      for (j = 0; j < 31; j++) 
      {
          h = (h.shiftRightUnsigned(7)).xor(h);
          h = (h.shiftLeft(11)).xor(h);
          h = (h.shiftRightUnsigned(10)).xor(h);
      }
      byteTable[i] = h;
  }

  var self=this;
  sh._hashBytes = function(data) 
  {
    h = goog.math.Long.fromString(self.HSTART.toString());
    for (len = data.length, i = 0; i < len; i++) 
    {
      index = data[i] & 255;
      h = (h.multiply(self.HMULT)).xor(self.byteTable[index]);
    }
    return h.and(goog.math.Long.fromString("7FFFFFFFFFFFFFFF",16));
  };

  sh._hashString = function(inpStr) {
    var byteArr = [];
    for (len = inpStr.length, i = 0; i < len; i++) 
    {
      byteArr.push(inpStr.charCodeAt(i));
    }
    return sh._hashBytes(byteArr);
  };


  //Generate 64 bit hashcode using the lowercased product URL.
  sh.hashUrl = function(url){
    var hCode = sh._hashString(url.toLowerCase()); 
    return hCode.isNegative() ? hCode.negate().toString(16).toLowerCase() : hCode.toString(16).toLowerCase();
  }

})();
/*---------------------------------------------------------------------------*/
/*                             quickstart.js                                 */
/*                              version 1.3                                  */
/*---------------------------------------------------------------------------*/
(function(){

//Setup namespace
window.mbScope = window.mbScope || {};
window.mbScope.realtimeExtractor = {};

//String.trim 
if (!String.prototype.trim)
{
  String.prototype.trim = function()
  {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

window.mbScope.realtimeExtractor = ext = {
  /** variables go here **/
  //when this flag is set to true the order confirmation page will use cookie data stored from the cart page to populate purchased product data if it cannot find it itself.
  useRecentCartProductsAsPurchasedProductsOnOrderPage: false,
  //used when creating the category id from breadcrumbs on the category page, should match whatever is used in the etl
  breadcrumbDelimiter:"|",
  
  /** quickstart extraction functions (do not override) **/
  //loads mybuys4.js and setup.js then calls run()
  initialize:initialize,
  //runs the extraction, assumes mybuys4 and setup.js have been loaded
  run:run,
  //scrapes every attribute and evaluates every regex. Uses the number of attribute matches as well as regex to set the page type
  determinePageTypeAndLoadAttributes:determinePageTypeAndLoadAttributes,
  //logic for setting the necessary information in the mybuys object and calling initPage()
  fireBeacon:fireBeacon,
  
  
  /** quickstart helper functions (do not override) **/
  //fetches the extracted value for a given attribute, only available after determinePageTypeAndLoadAttributes is run
  //params: pageType, name
  //returns: value pulled from extraction, could be string or array depending on the attribute type. Returns '' if nothing is found. TODO:: '' when an array is expected is a problem
  getExtractedValue:getExtractedValue,
  //copies and array and trims all of its values
  //params: Array arrayIn
  //returns Array arrayCopy
  copyAndTrim:copyAndTrim,
  //copies and array and takes the stringHash all of its values
  //params: Array arrayIn
  //returns Array arrayCopy
  copyAndHash:copyAndHash,
  //deep copies an array
  //params: Array arrayIn
  //returns Array arrayCopy
  arrayCopy:arrayCopy,
  //takes the mybuys hash of a string 
  //params: String input
  //returns: String hashValue
  stringHash:stringHash,
  //cleans up a url removing the protocol/hostname, optionally removes the query parameters/fragments as well
  //params: String url, boolean trimQueryParams
  //returns: String url
  normalizeProductUrl:normalizeProductUrl,
  //asynchronously loads a javascript file
  //params: String src, function callback
  //returns: undefined
  importJS:importJS,
  //turns the object created by getCartItemValues into a string
  //params: object with arrays: pids, quantities, subTotals (should match what is created by getCartItemValues)
  //returns: string with all the cart product data
  turnCartValuesToString:turnCartValuesToString,
  //turns the string created by turnCartValuesToString back into the original object
  //params: string generated by turnCartValuesToString
  //returns: object with arrays: pids, quantities, subTotals
  turnStringToCartValues:turnStringToCartValues,
  
  
  /** functions to populate the mybuys object **/
  //fetches the product id extracted on a product detail page based on what regex capture/attribute is set to useAsProductId. Might hash it depending on isCPC
  //params: none
  //returns: String productId
  getProductIdFromProductPage:getProductIdFromProductPage,
  //fetches the category id extracted on a category page
  //params: none
  //returns: String categoryId
  getCategoryIdFromCategoryPage:getCategoryIdFromCategoryPage,
  //makes all the mybuys.addCartItemQtySubtotal calls for a shopping cart page
  //params: none
  //returns: undefined
  doAllAddCartItemQtySubtotalCalls:doAllAddCartItemQtySubtotalCalls,
  //fetches the product ids, quantities, and subTotals of the cart items. Additionally will call setRecentCartProducts
  //params: none
  //returns: object with arrays: pids, quantities, subTotals
  getCartItemValues:getCartItemValues,
  //fetches the pids on the cart page based on which attribute is set to useAsProductId. Might hash it depending on isCPC.
  //params: none
  //returns: array of product ids.
  getPidsOnCartPage:getPidsOnCartPage,
  //fetches the order amount extracted on a shopping cart page
  //params: none
  //returns: String orderAmount
  getCartAmount:getCartAmount,
  //fetches the value of 'optin' for a shopping cart page
  //params: none
  //returns: String optin
  getCartOptin:getCartOptin,
  //fetches the email address for a shopping cart page
  //params: none
  //returns: String emailAddress
  getCartEmail:getCartEmail,
  //the following 'fixUpCart*' functions are called during doAllAddCartItemQtySubtotalCalls. 
  //These functions copy and do some minor cleaning on their extracted values. 
  //In every case the input and return values should be a single Array
  fixUpCartPids:fixUpCartPids,
  fixUpCartPidsFromUrls:fixUpCartPidsFromUrls,
  fixUpCartQuantities:fixUpCartQuantities,
  fixUpCartSubTotals:fixUpCartSubTotals,
  //makes all the mybuys.addOrderItemQtySubtotal calls for an order confirmation page
  //params: none
  //returns: undefined
  doAllAddOrderItemQtySubtotalCalls:doAllAddOrderItemQtySubtotalCalls,
  //fetches the product ids, quantities, and subTotals of the order items. May use getRecentCartProducts depending on useRecentCartProductsAsPurchasedProductsOnOrderPage value
  //params: none
  //returns: object with arrays: pids, quantities, subTotals
  getOrderItemValues:getOrderItemValues,
  //fetches the pids on the order conf page based on which attribute is set to useAsProductId. Might hash it depending on isCPC.
  //params: none
  //returns: array of product ids.
  getPidsOnOrderPage:getPidsOnOrderPage,
  //fetches the order amount extracted on an order confirmation page
  //params: none
  //returns: String orderAmount
  getOrderAmount:getOrderAmount,
  //fetches the value of 'optin' for an order confirmation page
  //params: none
  //returns: String optin
  getOrderOptin:getOrderOptin,
  //fetches the email address for an order confirmation page
  //params: none
  //returns: String emailAddress
  getOrderEmail:getOrderEmail,
  //fetches the order id for an order confirmation page
  //params: none
  //returns: String orderId
  getOrderid:getOrderid,
  //the following 'fixUpOrder*' functions are called during doAllAddOrderItemQtySubtotalCalls. 
  //These functions copy and do some minor cleaning on their extracted values. 
  //In every case the input and return values should be a single Array
  fixUpOrderPids:fixUpOrderPids,
  fixUpOrderPidsFromUrls:fixUpOrderPidsFromUrls,
  fixUpOrderQuantities:fixUpOrderQuantities,
  fixUpOrderSubTotals:fixUpOrderSubTotals,
  //makes all the mybuys.addItemPresentOnPage calls
  //params: none
  //returns: undefined
  addAllAvailablePips:addAllAvailablePips,
  //persists the cart page product data in a cookie for 30 minutes
  //params: object with arrays: pids, quantities, subTotals
  //returns: undefined
  setRecentCartProducts:setRecentCartProducts,
  //retrieves cart data persisted by setRecentCartProducts
  //params: none
  //returns: object with arrays: pids, quantities, subTotals
  getRecentCartProducts:getRecentCartProducts
};
  
  function initialize()
  {
    importJS('//t.p.mybuys.com/js/mybuys4.js', function(){
      importJS('//t.p.mybuys.com/clients/SWIMOUTLET/js/setup.js', run);
    });
    window.mbScope.realtimeExtractorLoaded = true;
  }
  function run()
  {
    determinePageTypeAndLoadAttributes();
    fireBeacon();
  }
  function determinePageTypeAndLoadAttributes()
  {
    var eval = window.mbScope.xpathEval;
    var pageTypeMatchCounters = {};
    
    //scrape attributes 
    for(var i = 0; i < window.mbScope.attribute_data.length; i++)
    {
      var element = window.mbScope.attribute_data[i];
      element.extractedValue = '';
      for(var j=0; j<element.xpathSelectors.length; j++)
      {
        var extractedValue = (typeof element.dataType === 'string' && element.dataType.indexOf('list-') > -1) ? 
                                                eval.getAllNodeTextsFromXPath(element.xpathSelectors[j], element.dataType, element.regexTransformation)
                                              : eval.getNodeTextFromXPath(element.xpathSelectors[j], element.dataType, element.expectedValue, element.regexTransformation);
        if(extractedValue.length && extractedValue !== 'false')
        {
          element.extractedValue = extractedValue;
          if(typeof pageTypeMatchCounters[element.pageType] == 'undefined')
          {
            pageTypeMatchCounters[element.pageType] = 1;
          }else
          {
            pageTypeMatchCounters[element.pageType]++;
          }
          break;
        }
      }
    }
    
    //look for regex matches
    for(var i = 0; i < window.mbScope.regex_data.length; i++)
    {
      var element = window.mbScope.regex_data[i];
      try
      {
        var tmp = document.URL.match('^'+element.regex+'$');
        var capturedValue = '';
        if(tmp){
          if(typeof pageTypeMatchCounters[element.pageType] == 'undefined')
          {
            pageTypeMatchCounters[element.pageType] = 10; // Matching regex is worth 10 points
          }else
          {
            // If the pagetype already matched a regex we will ignore the second match for now
          }
          if(tmp.length > 1)
            capturedValue = tmp[1];
        }
        
        if(element.variableToCapture)
        {
          var x = {
            "id" : "regex_"+element.id,
            "clientId" : element.clientId,
            "pageType" : element.pageType,
            "dataType" : "string",
            "name" : "regexCapture_"+element.variableToCapture,
            "expectedValue" : null,
            "xpathSelectors" : [],
            "useInCatalogFeed" : false,
            "regexTransformation" : {
              "regex" : "",
              "replacement" : "",
              "ignoreCase" : false,
              "replaceAll" : false},
            "useAsProductId" : element.useAsProductId,
            "isCPC" : element.isCPC,
            "extractedValue" : capturedValue
          };
          window.mbScope.attribute_data.push(x);
        }
      }catch(err){
        //console.error(err);
      }
    }
    
    var currentMax = 0;
    var mostMatchedPageType = '';
    for(var key in pageTypeMatchCounters)
    {
      if(pageTypeMatchCounters[key] > currentMax)
      {
        mostMatchedPageType = key;
        currentMax = pageTypeMatchCounters[key];
      }
    }
    ext.pageType = mostMatchedPageType;

  }
  function fireBeacon()
  {
    if(ext.pageType == '')
    {
      //TODO 
      ext.pageType = 'HOME';
    }
    mybuys.setPageType(ext.pageType);
    
    switch (ext.pageType) {
      case "PRODUCT_DETAILS":
        mybuys.set("productid",ext.getProductIdFromProductPage());
        break;
        
      ext.addAllAvailablePips();
    
      case "CATEGORY":
      case "HIGH_LEVEL_CATEGORY":
      case "TOP_LEVEL_CATEGORY":
        mybuys.set("categoryid",ext.getCategoryIdFromCategoryPage(ext.pageType));
        break;
        
      case "ADD_TO_CART":
      case "SHOPPING_CART":
        mybuys.set("email",ext.getCartEmail());
        mybuys.set("amount",ext.getCartAmount());
        mybuys.set("optin",ext.getCartOptin());
        ext.doAllAddCartItemQtySubtotalCalls();
        break;
        
      case "ORDER_CONFIRMATION":
        mybuys.set("email",ext.getOrderEmail());
        mybuys.set("orderid",ext.getOrderid());
        mybuys.set("amount",ext.getOrderAmount());
        mybuys.set("optin",ext.getOrderOptin());
        ext.doAllAddOrderItemQtySubtotalCalls();
        break;
        
      default:
      break;
    }
    
    mybuys.initPage();
  }
   //--------------------  helpers to populate mybuys object  --------------------
  //PDP
  function getProductIdFromProductPage()
  {
    for(var i = 0; i < window.mbScope.attribute_data.length; i++)
    {
      var element = window.mbScope.attribute_data[i];
      if(element.pageType === 'PRODUCT_DETAILS' && element.useAsProductId)
      {
        return element.isCPC ? element.extractedValue : stringHash(element.extractedValue);
      }
    }
    return '';
  }
  
  //CAT
  function getCategoryIdFromCategoryPage(pageType)
  {
    var catArray = getExtractedValue(pageType, 'breadcrumbs');
    if( !(catArray instanceof Array) ) return "";
    return catArray.join(ext.breadcrumbDelimiter).toUpperCase();
  }
  
  //CART
  function doAllAddCartItemQtySubtotalCalls()
  {
    var values = ext.getCartItemValues();
    values.quantities = (values.quantities.length === values.pids.length) ? values.quantities : [];
    values.subTotals = (values.subTotals.length === values.pids.length) ? values.subTotals : [];
    for(var i = 0; i < values.pids.length; i++)
    {
      if(values.quantities.length > i && !isNaN(values.quantities[i]) && values.subTotals.length > i)
      {
        mybuys.addCartItemQtySubtotal(values.pids[i], values.quantities[i], values.subTotals[i]);
      }else if(values.quantities.length > i && !isNaN(values.quantities[i]))
      {
        mybuys.addCartItemQtySubtotal(values.pids[i], values.quantities[i]);
      }else
      {
        mybuys.addCartItemQtySubtotal(values.pids[i]);
      }
    }
  }
  
  function getCartItemValues()
  {
    var ret = {
        pids       : ext.getPidsOnCartPage(),
        quantities : ext.fixUpCartQuantities(getExtractedValue('SHOPPING_CART', 'quantities')),
        subTotals  : ext.fixUpCartSubTotals(getExtractedValue('SHOPPING_CART', 'subTotals'))
    };
    
    if(ext.useRecentCartProductsAsPurchasedProductsOnOrderPage){ ext.setRecentCartProducts(ret);}
    return ret;
  }
  
  function getPidsOnCartPage()
  {
    for(var i = 0; i < window.mbScope.attribute_data.length; i++)
    {
      var element = window.mbScope.attribute_data[i];
      if(element.pageType === 'SHOPPING_CART' && element.useAsProductId)
      {
        return element.isCPC ? ext.fixUpCartPids(element.extractedValue) : ext.fixUpCartPidsFromUrls(element.extractedValue);
      }
    }
    return [];
  }
  
  function getCartAmount()
  {
    return getExtractedValue('SHOPPING_CART', 'orderAmount').trim();
  }
  function getCartOptin()
  {
  
  }
  
  function getCartEmail()
  {
    return getExtractedValue('SHOPPING_CART', 'emailAddress').trim();
  }
  
  function fixUpCartPids(pids)
  {
    return copyAndTrim(pids);
  }
  function fixUpCartPidsFromUrls(urls)
  {
    return copyAndHash(urls);
  }
  function fixUpCartQuantities(quantities)
  {
    return copyAndTrim(quantities);
  }
  function fixUpCartSubTotals(subTotals)
  {
    return copyAndTrim(subTotals);
  }
  
  //ORDER CONF
  function doAllAddOrderItemQtySubtotalCalls()
  {
    var values = getOrderItemValues();
    values.quantities = (values.quantities.length === values.pids.length) ? values.quantities : [];
    values.subTotals = (values.subTotals.length === values.pids.length) ? values.subTotals : [];
    for(var i = 0; i < values.pids.length; i++)
    {
      if(values.quantities.length > i && !isNaN(values.quantities[i]) && values.subTotals.length > i)
      {
        mybuys.addOrderItemQtySubtotal(values.pids[i], values.quantities[i], values.subTotals[i]);
      }else if(values.quantities.length > i && !isNaN(values.quantities[i]))
      {
        mybuys.addOrderItemQtySubtotal(values.pids[i], values.quantities[i]);
      }else
      {
        mybuys.addOrderItemQtySubtotal(values.pids[i]);
      }
    }
  }
  
  function getOrderItemValues()
  {
    var ret = {
            pids       : ext.getPidsOnOrderPage(),
            quantities : ext.fixUpOrderQuantities(getExtractedValue('ORDER_CONFIRMATION', 'quantities')),
            subTotals  : ext.fixUpOrderSubTotals(getExtractedValue('ORDER_CONFIRMATION', 'subTotals'))
    };
    ret = (!ret.pids.length && ext.useRecentCartProductsAsPurchasedProductsOnOrderPage) ? ext.getRecentCartProducts() : ret;
    return ret;
  }
  
  function getPidsOnOrderPage()
  {
    for(var i = 0; i < window.mbScope.attribute_data.length; i++)
    {
      var element = window.mbScope.attribute_data[i];
      if(element.pageType === 'ORDER_CONFIRMATION' && element.useAsProductId)
      {
        return element.isCPC ? ext.fixUpOrderPids(element.extractedValue) : ext.fixUpOrderPidsFromUrls(element.extractedValue);
      }
    }
    return [];
  }
  
  function getOrderAmount()
  {
    return getExtractedValue('ORDER_CONFIRMATION', 'orderAmount').trim();
  }
  function getOrderOptin()
  {

  }
  
  function getOrderEmail()
  {
    return getExtractedValue('ORDER_CONFIRMATION', 'emailAddress').trim();
  }
  
  function getOrderid()
  {
    return getExtractedValue('ORDER_CONFIRMATION', 'orderId').trim();
  }
  
  function fixUpOrderPids(pids)
  {
    return copyAndTrim(pids);
  }
  function fixUpOrderPidsFromUrls(urls)
  {
    return copyAndHash(urls);
  }
  function fixUpOrderQuantities(quantities)
  {
    return copyAndTrim(quantities);
  }
  function fixUpOrderSubTotals(subTotals)
  {
    return copyAndTrim(subTotals);
  }
  
  
  function addAllAvailablePips()
  {
    //TODO magic
  }
  
  function setRecentCartProducts(values)
  {
    mybuys.setCookie('mbqs_rc',turnCartValuesToString(values),'30','/');
  }
  
  function getRecentCartProducts()
  {
    return turnStringToCartValues(mybuys.getCookie('mbqs_rc'));
  }
  
  
  // ------------------------- HELPER FUNCTIONS ----------------------------
  // these may be referenced by custom setup.js functions but not overridden
  
  function turnCartValuesToString(values)
  {
    if(!values) return "";
    var ret = [];
    
    var x = (values.pids instanceof Array) ? values.pids : [];
    ret.push("pids="+x.join("|pid_sep|"));

    x = (values.quantities instanceof Array) ? values.quantities : [];
    ret.push("quantities="+x.join("|qt_sep|"));
    
    x = (values.subTotals instanceof Array) ? values.subTotals : [];
    ret.push("subTotals="+x.join("|st_sep|"));
    
    return ret.join("|mb_sep|");
  }
  
  function turnStringToCartValues(valuesString)
  {
    var x = valuesString.split("|mb_sep|");
    if(x.length !== 3) return {pids : [], quantities : [], subTotals : []};
    var ret = {};
    ret.pids       = (x[0].indexOf("pids=") === 0)       ? x[0].substring(5).split("|pid_sep|") : [];
    ret.quantities = (x[1].indexOf("quantities=") === 0) ? x[1].substring(11).split("|qt_sep|") : [];
    ret.subTotals  = (x[2].indexOf("subTotals=") === 0)  ? x[2].substring(10).split("|st_sep|") : [];
    return ret;
  }

  function getExtractedValue(pageType, name)
  {
    for(var i = 0; i < window.mbScope.attribute_data.length; i++)
    {
      var element = window.mbScope.attribute_data[i];
      if(element.pageType === pageType && element.name === name)
      {
        return element.extractedValue;
      }
    }
    return '';
  }
  
  function copyAndTrim(args)
  {
    var argsArray = (args instanceof Array) ? arrayCopy(args) : [];
    for(var i = 0; i < argsArray.length; i++)
    {
      argsArray[i] = argsArray[i].trim();
    }
    return argsArray;
  }
  
  function copyAndHash(args)
  {
    var argsArray = (args instanceof Array) ? arrayCopy(args) : [];
    for(var i = 0; i < argsArray.length; i++)
    {
      argsArray[i] = stringHash(argsArray[i]);
    }
    return argsArray
  }
  
  function arrayCopy(array)
  {
    if(typeof array === 'undefined' || array === null) return [];
    var returnArray = [];
    for(var i = 0; i < array.length; i++)
    {
      returnArray.push(array[i]);
    }
    return returnArray
  }
  
  function stringHash(urlForLegacy)
  {
    return window.mbScope.StringHash.hashUrl(urlForLegacy);
  }

  function normalizeProductUrl(url, trimQueryParams){
    var trimQueryParams = typeof trimQueryParams !== 'undefined' ? trimQueryParams : false;

    //Parse the URL
    var parser = _parseURL(url);

    var cleanUrl = parser.path;

    if(!trimQueryParams){
      cleanUrl += parser.query;
      cleanUrl += parser.hash.length > 0 ? '#'+parser.hash : ''; 
    }

    //Cleanup double slashes
    cleanUrl = cleanUrl.replace(/\/+/g,'/');
  
    return cleanUrl;
  }
  
  function importJS(src, callback){
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.type  = 'text/javascript';
    var entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(s, entry);
    
    s.onload = s.onreadystatechange = function(){
      var rdyState = s.readyState;
      if(!rdyState || /complete|loaded/.test(s.readyState)){
        callback();
        
        s.onload = null;
        s.onreadystatechange = null;
      }
    }
  }

  function _parseURL(url)
  {
  /* 
     This function creates a new anchor element and uses location
     properties (inherent) to get the desired URL data. Some String
     operations are used (to normalize results across browsers).
  */
      var a =  document.createElement('a');
      a.href = url;
      return {
          source: url,
          protocol: a.protocol.replace(':',''),
          host: a.hostname,
          port: a.port,
          query: a.search,
          params: (function(){
              var ret = {},
                  seg = a.search.replace(/^\?/,'').split('&'),
                  len = seg.length, i = 0, s;
              for (;i<len;i++) {
                  if (!seg[i]) { continue; }
                  s = seg[i].split('=');
                  ret[s[0]] = s[1];
              }
              return ret;
          })(),
          file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
          hash: a.hash.replace('#',''),
          path: a.pathname.replace(/^([^\/])/,'/$1').replace(/[\/]+$/,''),
          relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
          segments: a.pathname.replace(/^\//,'').split('/')
      };
  }

//'main' function. Serves as the entrypoint. Called after the page has loaded.
window.mbScope.entryPoint = function(){
  //Check to see if the onboarding script is not loaded already.
  if(window.mbScope && window.mbScope.realtimeExtractorLoaded){
    return;
  }

  //start the onboarding script.
  window.mbScope.realtimeExtractor.initialize();
};

})();

(function(){
if(document.readyState == "complete") { window.mbScope.entryPoint(); }
else{if(window.addEventListener){window.addEventListener("load",window.mbScope.entryPoint,false);}else if(window.attachEvent){window.attachEvent("onload",window.mbScope.entryPoint);}else{window.mbScope.entryPoint();}}
})();