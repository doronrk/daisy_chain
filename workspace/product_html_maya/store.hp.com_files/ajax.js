var mboxCurrent = mboxFactories.get('default').get('Top_Nav_Global',0);mboxCurrent.setOffer(new mboxOfferAjax('<!-- Offer Id: 127615  --><!-- BEGIN ADOBE TEST&TARGET ======================================= -->\n<!-- Offer: HP ETR Value Prop Banner -->\n<style type=\"text\/css\">\n#etrValpropBannerDiv {\nmargin: auto;\nwidth: auto;\nheight: auto;\noverflow: hidden;\ntext-align: center;\n}\n\n#etrValpropBannerDiv #etrValpropBannerLink {\ndisplay: block;\nmargin: auto;\n\/*width: 980px;*\/\nheight: 50px;\ntext-align: center;\n}\n\n#etrValpropBannerDiv.homepage #etrValpropBannerLink {\ndisplay: block;\nmargin: auto;\n\/*width: 980px;*\/\nheight: 50px;\ntext-align: center;\n}\n\n#etrValpropBannerDiv #etrValpropBannerLink #etrValpropBannerImg {\nmax-width: 1900px;\n\/*height: 60px;*\/\n}\n\n#etrValpropBannerDiv.homepage #etrValpropBannerLink #etrValpropBannerImg {\n\n}\n<\/style>\n<style id=\"remove\">\n#etrValpropBannerDiv #etrValpropBannerLink #etrValpropBannerImg {\nmargin: 0 auto 0 -460px;\nwidth: 1900px;\nmax-width: 1900px;\nheight: 50px;\n}\n<\/style>\n<div id=\"etrValpropBannerDiv\">\n<a href=\"http:\/\/store.hp.com\/webapp\/wcs\/stores\/servlet\/us\/en\/cat\/ink--toner---paper&in_jumpid_value_prop_printers\" id=\"etrValpropBannerLink\" onmousedown=\"mboxTrack(\'mboxClickTrack\', \'clicked=etr_valprop_banner\');\">\n<!-- img src set by JS -->\n<img id=\"etrValpropBannerImg\" src=\"\/\/store.hp.com\/wcsstore\/hpusstore\/Treatment\/HP_VP_Band_1105-2.gif\">\n<\/a>\n<\/div>\n\n<!-- END ADOBE TEST&TARGET ========================================= --><!-- Offer Id: 93081  --><!-- Offer Id: 18868  -->'));mboxCurrent.getOffer().setOnLoad(function() {
var myPath_tnt = location.pathname;
if (myPath_tnt == '/' || myPath_tnt == '/webapp/wcs/stores/servlet/us/en') {
				// If page is Homepage...
				$("#remove").remove();
			} else {
				// If page is not Homepage...
				
			}
var preloadPictures = function(pictureUrls, callback) {
    var i,
        j,
        loaded = 0;

    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function () {                               
                if (++loaded == pictureUrls.length && callback) {
                    callback();
                }
            };

            // Use the following callback methods to debug
            // in case of an unexpected behavior.
            img.onerror = function () {};
            img.onabort = function () {};

            img.src = src;
        } (new Image(), pictureUrls[i]));
    }
};
preloadPictures(['//store.hp.com/wcsstore/hpusstore/Treatment/CM-Value-Prop-Ink.jpg', '//store.hp.com//wcsstore/hpusstore/Treatment/Ink_Value_Prop_Rainbow.jpg'], function(){
    //console.log('a');
});


mboxTrack= function(mbox) { var d = new Date(); if (window.mboxFactoryDefault) { var ub = mboxFactoryDefault.getUrlBuilder().clone(); ub.addParameter("mbox", mbox); ub.addParameter('mboxTime', d.getTime() - (d.getTimezoneOffset() * 60000)); ub.addParameters(Array.prototype.slice.call(arguments).slice(1)); ub.addParameter("mboxPage", mboxGenerateId()); var img = new Image(); img.src = ub.buildUrl().replace("/mbox/undefined", "/mbox/ajax"); img.style.display = "none"; if (document.body) document.body.insertBefore(img,document.body.firstChild); } };
	var tntHpEtr = {
		/*mboxTrack: function(mbox) { 
			var d = new Date(); 
			if (window.mboxFactoryDefault) { 
				var ub = mboxFactoryDefault.getUrlBuilder().clone(); 
				ub.addParameter("mbox", mbox); 
				ub.addParameter('mboxTime', d.getTime() - (d.getTimezoneOffset() * 60000)); 
				ub.addParameters(Array.prototype.slice.call(arguments).slice(1)); 
				ub.addParameter("mboxPage", mboxGenerateId()); 
				var img = new Image(); 
				img.src = ub.buildUrl().replace("/mbox/undefined", "/mbox/ajax"); 
				img.style.display = "none"; 
				if (document.body) document.body.insertBefore(img,document.body.firstChild); 
			} 
		},*/

		mboxName: 'Top_Nav_Global',

		log: function (myMsg) {
			// Wrapper to handle IE's missing console.
			if (typeof console != 'undefined') {
				console.log(myMsg);
			}
		},

		initProgress: $.Deferred(),  // Shared jQuery Deferred object for synchronously chaining init function calls.

		el: {},  // All DOM elements this app accesses.  Populated via init() > setupSelectors().

		setupSelectors: function () {
			// Populates self.el with DOM element handles.
			// Called by init() via deferred progress.
			var self = tntHpEtr;

			self.el.bannerDiv = $('#etrValpropBannerDiv');
			self.el.bannerLink = $('#etrValpropBannerLink', self.el.bannerDiv);

			// Notify deferred progress to trigger next init-function call.
			self.initProgress.notify('selectorsSetup');
		},

		handleContents: function () {
		
			// Hides default content and shows Offer content.
			// Called by init() via deferred progress.
			var self = tntHpEtr;
			var myPath = location.pathname;

			self.el.bannerDiv.siblings('h1, p, hr').hide();
			// Handle homepage/non-homepage styling and img srcs.
			if (myPath == '/' || myPath == '/webapp/wcs/stores/servlet/us/en') {
				// If page is Homepage...
				self.el.bannerDiv.addClass('homepage');
				self.el.bannerLink.find('img').attr('src', '//store.hp.com/wcsstore/hpusstore/Treatment/CM-Value-Prop-Ink.jpg');
				
				self.el.bannerLink.find('img').parent().attr('href', 'http://store.hp.com/webapp/wcs/stores/servlet/CategoryListingView?catalogId=10051&categoryId=162552&langId=-1&storeId=10151&in_jumpid_value_prop_home_page_printer');
self.el.bannerLink.find('img').parent().css("margin-left","-166px");
			} 
			else {
				// If page is not Homepage...
				self.el.bannerDiv.addClass('non-homepage');
				self.el.bannerLink.find('img').attr('src', '//store.hp.com/wcsstore/hpusstore/Treatment/HP_VP_Band_1105-2.gif');
				//self.el.bannerLink.find('img').attr("style","height:50px");
				self.el.bannerLink.find('img').parent().attr('href', 'http://store.hp.com/webapp/wcs/stores/servlet/ContentView?eSpotName=WhyShopAtHP&storeId=10151&langId=-1&catalogId=10051');
self.el.bannerLink.find('img').parent().css("width","1218px");
			}
			if(myPath.indexOf("/printers") > -1)
			{
				self.el.bannerLink.find('img').attr('src', '//store.hp.com//wcsstore/hpusstore/Treatment/Ink_Value_Prop_Rainbow.jpg');
				self.el.bannerLink.find('img').parent().attr('href', 'http://store.hp.com/webapp/wcs/stores/servlet/us/en/cat/ink--toner---paper&in_jumpid_value_prop_printers');
self.el.bannerLink.find('img').parent().css("width","973px");
			}
			// Notify deferred progress to trigger next init-function call.
			self.initProgress.notify('contentsHandled');
		},

		goTo: function (myHref) {
			var self = this;

			location.href = myHref;

			self.log('[tntHpEtr.goTo] Going to: ' + myHref);
		},

		/*addClickTracking: function () {
			// Adds mBox click-tracking handlers.
			// Called by init() via deferred progress.
			var self = tntHpEtr;
			self.el.bannerLink.off('click');
			self.el.bannerLink.on('click', function (event) {
				var myHref = event.delegateTarget.href;
				event.preventDefault();
				self.mboxTrack('mboxClickTrack', 'clicked=etr_valprop_banner');
				setTimeout($.proxy(self.goTo, self, myHref), 750);
				self.log('[tntHpEtr.addClickTracking] Banner clicked! Link href: ' + myHref);
			});

			self.log('[tntHpEtr.addClickTracking] Click-tracking added.');

			// As last init function to finish, resolve shared deferred object.
			self.initProgress.resolve();
		},*/

		init: function () {
			var self = this;

			// Use shared deferred object progress to chain init-function calls synchronously.
			self.initProgress.progress( function (myProgress) {
				switch (myProgress) {
					case 'selectorsSetup':
						self.log('[tntHpEtr.init] Selectors set up. Calling handleContents()...');
						self.handleContents();
						break;
					case 'contentsHandled':
						self.log('[tntHpEtr.init] Contents handled.');
						//self.addClickTracking();
						break;
					default:
						break;
				}
			});

			self.initProgress.done( function () {
				self.log('[tntHpEtr.init] Offer fully initialized.');
			});

			// Call first init-function in synchronous chain.
			self.setupSelectors();
		}
	};

	var timeout     = 30000,
        interval    = 300;

    var init = function(){
        tntHpEtr.init();
    };
    var checkJQuery = function(){
        if ('undefined' === typeof window.jQuery) { 
            if(timeout > interval) {
                setTimeout(checkJQuery, interval);
            }
            timeout -= interval;
            return; 
        }
        init();
    };
    checkJQuery();

	$(function () {
	
		
	});
	

/*mboxHighlight+ (1of2) v1 ==> Response Plugin*/
window.ttMETA=(typeof(window.ttMETA)!='undefined')?window.ttMETA:[];window.ttMETA.push({'mbox':'Top_Nav_Global','campaign':'ETR Site-Wide Value Prop - LIVE 11/17/14','experience':'Site-Wide Banner 90%','offer':'HP ETR Value Prop Banner - Printers (12/2 Onward) QA Version'});window.ttMBX=function(x){var mbxList=[];for(i=0;i<ttMETA.length;i++){if(ttMETA[i].mbox==x.getName()){mbxList.push(ttMETA[i])}}return mbxList[x.getId()]}

/*T&T to SiteCat v4.3 ==>Response Plugin*/
window.s_tnt = window.s_tnt || '', tntVal = '185846:0:0,';
if (window.s_tnt.indexOf(tntVal) == -1) {
    window.s_tnt += tntVal
}
if (mboxFactories.get('default').isDomLoaded() && (window.s && window.s.tl)) {
   var ltv = s.linkTrackVars;
   var lte = s.linkTrackEvents;
   s.linkTrackVars = 'tnt';
   s.linkTrackEvents = 'None';
   s.tl('TnT', 'o', 'TnT');
   s.linkTrackVars = ltv;
   s.linkTrackEvents = lte;
}
});mboxCurrent.loaded();mboxFactories.get('default').getPCId().forceId("1417579393814-690994.25_28");