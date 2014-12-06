/*redis*//*redis*/window.flixJsCallbacks = window.flixJsCallbacks || {};
window.flixJsCallbacks.pageGeneric = window.flixJsCallbacks.pageGeneric || {};
window.flixJsCallbacks.pageSpecific = window.flixJsCallbacks.pageSpecific || {};

/*MacMall - US | 285*/
window.flixJsCallbacks.pageSpecific = {
    'r1.cat': function(){
        return ( !! window.br_data && !! window.br_data.cat ) ? JSON.stringify( encodeURIComponent(window.br_data.cat) ) : '';
    },
    price: function() {
        var strip = document.querySelector('p.listPriceConTwoBoldRight') || null, content, c;
        if( !! strip ) {
          content = strip.textContent.match(/\d+.?\d+/g);
          if ( !! content ) {
            return content[0];
          }
        }       
    },
    br: {
        terms: [
            'input[name=manufacturer]'
        ],
        attr: [
            'value'
        ]
    }
};
/*MacMall - US | 285*/
window.flixJsCallbacks.pageSpecific = {
    'r1.cat': function(){
        return ( !! window.br_data && !! window.br_data.cat ) ? JSON.stringify( encodeURIComponent(window.br_data.cat) ) : '';
    },
    price: function() {
        var strip = document.querySelector('p.listPriceConTwoBoldRight') || null, content, c;
        if( !! strip ) {
          content = strip.textContent.match(/\d+.?\d+/g);
          if ( !! content ) {
            return content[0];
          }
        }       
    },
    br: {
        terms: [
            'input[name=manufacturer]'
        ],
        attr: [
            'value'
        ]
    }
};
;window.flixJsCallbacks.pageGeneric = {
    br: {
        terms: [
            '.fpLinkBrandProducts[title]',
            '[itemprop="brand"]',
            '[itemprop="brand"][content]',
            '[data-brand]',
            '.specification',
            '[brandname]',
            '[itemprop="manufacturer"]',
            '.brand',
            '#productBrandName[value]'
        ],
        attr: [
            'title',
            'content',
            'data-brand',
            'brandname',
            'value'        
        ]
    },
    price: {
        terms: [
            '[property="og:price:amount"][content]',
            '[itemprop="price"]',
            '[itemprop="generic"]',
            '[itemprop="price"][content]',
            '.finalprice',
            '.price-current-label',
            '.fpPriceBig',
            '.prijs',
            '.price',
            '.pdp-price-total',
            '.pounds',
            '.pricelarge',
            '[data-price]'
        ],
        attr: [
            'content'
        ]
    },
    ref: function() {
        return document.referrer || '';
    },
    currency: {
        terms: [
            '[property="og:price:currency"][content]',
            '[itemprop="priceCurrency"][content]',
            '.currency[title]',
            '.value-title[title]',
            '.currency'
        ],
        attr: [
            'content',
            'title'
        ]        
    },
    pn: {
        terms: [
            '[property="og:url"][content]',
            '[rel="canonical"][href]'
        ],
        attr: [
            'content',
            'href'
        ]
    },
    h1: {
        terms: 'h1'
    },
    ti: {
        terms: 'title'
    },
    img: {
        terms: [
            '[property="og:image"]'
        ],
        attr: [
            'content'
        ]
    },
    'r1.cat': '',
    om: {}
};


window.flixJsCallbacks.pageGeneric.pageSpecific = window.flixJsCallbacks.pageSpecific || {};

;(function(){
	try{
	var url =  '?' + 'd=285&l=us&mpn=JC01-02-US&dom=flix-minisite&fl=en&ext=.js';
	
    	var minisite_url = ('https:' == document.location.protocol) ? 'https://media.flixsyndication.net/minisite/ssl/logo/code/js/l.v2.js' : 'http://logo.flixfacts.co.uk/code/js/l.v2.js';
    	var append_url = ('https:' == document.location.protocol) ? 'https://media.flixsyndication.net/inpage/ssl/delivery/' : 'http://media.flixcar.com/delivery/';

		var _fscript = document.createElement('script');
		_fscript.setAttribute("type","text/javascript");
		_fscript.setAttribute("src", minisite_url + url);
		
		var elem = 'flix-minisite';
		
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(_fscript);

		
		var styleElement = document.createElement("style");
		var cssCode="#"+elem+" a img {padding-right:3px;}";
		styleElement.type = "text/css";
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		document.getElementsByTagName("head")[0].appendChild(styleElement);
	}catch(ignore){}
})();
