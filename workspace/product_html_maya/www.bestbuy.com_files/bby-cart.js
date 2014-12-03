/* UI BUILD: Wednesday, Nov 19 2014 at 10:31:50 AM -- BUILD ID: BRANCH_NAME: com.bestbuy.atg-apps.release.1443 VERSION: 14.43.127 */
/* MD5: 42a82a70db684050e7ddbeb656d61791 */

/* BUILT FROM: "src/projects/commerce/scripts/dev/projects/cart/bby-cart.js" */


//-- START OF LINE 3 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/base.js"
var bby;
if(!bby) bby = {};
bby.cart = {
    analytics: {
        trackers: {
			lightbox: {
				trackers: {},
				states: {}
			}
		}
    },
	controllers: {
		salesFlow:{}
	},
	model: {
		capabilities: {},
		decorators: {
			shopping:{}
		},
		services: {
			response: {}
		},
		workflow:{
			states:{}
		}
	},
    views: {
        forms: {},
        states: {
			checkout: { },
			expressLane: { },
			store: { }
		}
    },
    widgets:{},
    workflow:{ }
};

//-- END OF LINE 3 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/base.js"
 
//-- START OF LINE 5 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackEvent.js"
bby.cart.analytics.trackEvent = function(){ }
bby.cart.analytics.trackEvent.prototype = {
    instance: function(){ return trackEvent; }
}
//-- END OF LINE 5 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackEvent.js"
//-- START OF LINE 6 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackObjects.js"
bby.cart.analytics.trackObjects = function(){ }
bby.cart.analytics.trackObjects.prototype = {
    gto: function(){ return track; },
    lto: function(){ return trackHaccs; }
}
//-- END OF LINE 6 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackObjects.js"
//-- START OF LINE 7 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/checkout.js"
bby.cart.analytics.trackers.checkout = function(trackEvt, trackObjects, topButton, bottomButton){
    bby.cart.analytics.trackers.checkout.base.call(this, trackEvt, trackObjects);

	if($.exists(topButton))
		$.evt.add(topButton, "click", function(){ this.checkout("top"); }, this);

	if($.exists(bottomButton))
		$.evt.add(bottomButton, "click", function(){ this.checkout("bottom"); }, this);
}
bby.cart.analytics.trackers.checkout.prototype = {
	checkout: function(location){
    	var gto = this.$trackObjects.gto();
        return this.$trackEvent().event('event.link', {
			lid: "checkOutTrigger",
            lastLink: $.str.build(gto.templateName,":Checkout_",location)
        });
    }
}
$.ext(bby.cart.analytics.trackers.checkout,
      bby.infrastructure.analytics.abstractTracker);

//-- END OF LINE 7 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/checkout.js"
 
//-- START OF LINE 9 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/cnet.js"
bby.cart.analytics.trackers.cnet = function(trackEvt, trackObjects, model){
    bby.cart.analytics.trackers.cnet.base.call(this, trackEvt, trackObjects, model);
	this._model = model
		.onShopDefaultCategory(this.shopCategory, this)
		.onShopCategory(this.shopCategory, this);
	this._called = $.list();
};
bby.cart.analytics.trackers.cnet.prototype = {
    shopCategory: function(categoryTab){
		var called = this._called;
		function track(input){
            var domain = "http://t.ics0.com/ics/2/view.gif"
                src = input.name,
                csid = input.value,
				$input = $(input),
				ts = $input.find("~.bby-ts").val(),
				sid = $input.find("~.bby-sid").val();

			if(called.contains(csid)) return;
            var tag = $.create({img:{
				src:$.str.format("{0}?csid={1}&ts={2}&sid={3}",
								 domain, csid, ts, sid)}});
            document.body.appendChild(tag);
			called.add(csid);
        };

		var products = $(categoryTab).find("+.bby-file-content input.bby-csid");
		products.each(function(){ track(this); });
    }
}
$.ext(bby.cart.analytics.trackers.cnet,
      bby.infrastructure.analytics.abstractTracker);

//-- END OF LINE 9 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/cnet.js"
 
//-- START OF LINE 11 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/shippingOptions.js"
bby.cart.analytics.trackers.shippingOptions = function(trackEvt, trackObjects, dropdown){
    bby.cart.analytics.trackers.shippingOptions.base.call(this, trackEvt, trackObjects);

	function trackChange(e) {
		$.evt.mute(e);
		this.shippingMethod(dropdown.value);
	}

	if($.exists(dropdown)) $.evt.add(dropdown, "change", trackChange, this);
}
bby.cart.analytics.trackers.shippingOptions.prototype = {
    shippingMethod: function(option){
        return this.$trackEvent().event('event.link', {
            lid: "Ship",
            lastLink: $.str.build("Ship: ", option)
        });
    },
	returnShippingOptionUsageOnSelect: function(type){
        return this.$trackEvent().event("event.link", {
            lastLink: $.str.build("Shipping:",type)
        });
    }
}
$.ext(bby.cart.analytics.trackers.shippingOptions,
      bby.infrastructure.analytics.abstractTracker);

//-- END OF LINE 11 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/shippingOptions.js"
 
//-- START OF LINE 13 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/taxCalculation.js"
bby.cart.analytics.trackers.taxCalculation = function(trackEvt, trackObjects, input, button){
    bby.cart.analytics.trackers.taxCalculation.base.call(this, trackEvt, trackObjects);
	if (input == null || button == null) return;

	var enter = $.key(13);
	function execClick(e) {
		$.evt.mute(e);
		this.calculateSalesTax();
	}
	function execEnter(e) {
		if(!$.key.parse(e).equals(enter)) return;
		$.evt.mute(e);
		this.calculateSalesTax();
	}
	$.evt.add(input, "keypress", execEnter, this);
	$.evt.add(button, "click", execClick, this);
}
bby.cart.analytics.trackers.taxCalculation.prototype = {
    calculateSalesTax: function(zip){
         return this.$trackEvent().event('event.link', {
            lid: 'cart-calculate-button'
        });
    }
}
$.ext(bby.cart.analytics.trackers.taxCalculation,
      bby.infrastructure.analytics.abstractTracker);

//-- END OF LINE 13 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/taxCalculation.js"
 
//-- START OF LINE 15 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/tracker.js"
bby.cart.analytics.trackers.lightbox.tracker = function(haccsTracker, mapTracker, icrTracker, model, state){
    bby.cart.analytics.trackers.lightbox.tracker.base.call(this, state);
	this.haccsTracker(haccsTracker)
		.mapTracker(mapTracker)
		.icrTracker(icrTracker);

	this._model = model
		.onViewPriceSuccess(this.viewPrice, this)
		.onAddToCartSuccess(this.addToCart, this)
		.onAddToCartError(this.addToCartError, this)
		.onRemoveFromCartSuccess(this.removeFromCart, this)
		.onShop(this.shop, this)
		.onContinueShopping(this.continueShopping, this)
		.onShopAccessoriesSuccess(this.shopAccessories, this)
		.onShopCategory(this.shopCategory, this)
		.onShopDefaultCategory(this.shopDefaultCategory, this)
		.onShopProtectionPlans(this.shopProtectionPlans, this)
		.onGoToCart(this.goToCart, this);
};
bby.cart.analytics.trackers.lightbox.tracker.prototype = {
	haccsTracker: function(haccsTracker){ return this.property("haccsTracker", haccsTracker); },
	mapTracker: function(mapTracker){ return this.property("mapTracker", mapTracker); },
	icrTracker: function(icrTracker){ return this.property("icrTracker", icrTracker); },
    viewPrice: function(response){
		this._state.viewPrice(response);
		return this;
	},
    addToCart: function(response){
		this._state.addToCart(response);
		return this;
	},
    addToCartError: function(response){
		this._state.addToCartError(response);
		return this;
	},
	removeFromCart: function(){
		this._state.removeFromCart();
		return this;
	},
    shop: function(response){
		this._state.shop(response);
		return this;
	},
    continueShopping: function(response){
		this._state.continueShopping(response);
		return this;
	},
    shopAccessories: function(response){
		this._state.shopAccessories(response);
		return this;
	},
    shopCategory: function(response){
		this._state.shopCategory(response);
		return this;
	},
    shopDefaultCategory: function(response){
		this._state.shopDefaultCategory(response);
		return this;
	},
    shopProtectionPlans: function(response){
		this._state.shopProtectionPlans(response);
		return this;
	},
    goToCart: function(response){
		this._state.goToCart(response);
		return this;
	}
}
$.ext(bby.cart.analytics.trackers.lightbox.tracker, $.abstractContext);

//-- END OF LINE 15 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/tracker.js"
 
//-- START OF LINE 17 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/states/abstractState.js"
bby.cart.analytics.trackers.lightbox.states.abstractState = function(){
    bby.cart.views.states.abstractState.base.call(this, bby.cart.analytics.trackers.lightbox.states);
};
bby.cart.analytics.trackers.lightbox.states.abstractState.prototype = {
	tracker: function(tracker){ return this.property("tracker", tracker); },

    viewPrice: function(){ return; },
    addToCart:  function(){ return; },
    addToCartError: function(){ return; },
    removeFromCart:  function(){ return; },
    shop:  function(){ return; },
    continueShopping:  function(){ return; },
    shopAccessories:  function(){ return; },
    shopCategory:  function(){ return; },
    shopDefaultCategory:  function(){ return; },
    shopProtectionPlans:  function(){ return; },
    goToCart:  function(){ return; }
}
$.ext(bby.cart.analytics.trackers.lightbox.states.abstractState, $.abstractState);

//-- END OF LINE 17 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/states/abstractState.js"
 
//-- START OF LINE 19 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/states/shopping.js"
bby.cart.analytics.trackers.lightbox.states.shopping = function(){
    bby.cart.analytics.trackers.lightbox.states.shopping.base.call(this);
};
bby.cart.analytics.trackers.lightbox.states.shopping.prototype = {
	addToCart: function(response){
		var product = response.product();
		if(product.isHaccs) return;
		if(product.isMap) return;
		if(product.isIcr) this.context().icrTracker().addToCart(product)
	},
    viewPrice: function(response){
		this.context().mapTracker().openLightbox(response.product());
		this.state("viewingPrice");
		return this;
	},
    shopAccessories:  function(response){
		var tracker = this.context().haccsTracker();
		tracker.openLightbox(response);

		if(response.hasAccessories()) tracker.shopDefaultCategory(response);
		else tracker.displayNoCategories(response);

		this.state("shoppingAccessories");
		return this;
	},
    shopDefaultCategory:  function(response){
		this.context().haccsTracker().setCurrentActiveTab(response);
		return this;
	}
}
$.ext(bby.cart.analytics.trackers.lightbox.states.shopping,
	  bby.cart.analytics.trackers.lightbox.states.abstractState);

//-- END OF LINE 19 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/states/shopping.js"
 
//-- START OF LINE 21 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/states/shoppingAccessories.js"
bby.cart.analytics.trackers.lightbox.states.shoppingAccessories = function(){
    bby.cart.analytics.trackers.lightbox.states.shoppingAccessories.base.call(this);
};
bby.cart.analytics.trackers.lightbox.states.shoppingAccessories.prototype = {
    addToCart:  function(response){
		this.context().haccsTracker().addToCart(response.product());
		return this;
	},
    addToCartError: function(response){
		this.context().haccsTracker().addToCartError({
			"isDriverProduct": response.isDriverProduct(),
			"isMaxQuantityError": !response.error().isRetry()
		});
	},
    shop:  function(){
		this.context().haccsTracker().closeLightbox();
		this.state("shopping");
		return this;
	},
    continueShopping:  function(){
		this.context().haccsTracker().continueShopping();
		this.state("shopping");
		return this;
	},
    shopDefaultCategory:  function(){
		this.context().haccsTracker().goToCart();
		return this;
	},
    shopCategory:  function(categoryTab){
		this.context().haccsTracker().shopCategory(categoryTab);
		return this;
	},
    shopProtectionPlans:  function(count){
		this.context().haccsTracker().shopProtectionPlans(count);
		return this;
	},
    goToCart:  function(){
		this.context().haccsTracker().goToCart();
		return this;
	}
}
$.ext(bby.cart.analytics.trackers.lightbox.states.shoppingAccessories,
	  bby.cart.analytics.trackers.lightbox.states.abstractState);

//-- END OF LINE 21 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/states/shoppingAccessories.js"
 
//-- START OF LINE 23 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/states/viewingPrice.js"
bby.cart.analytics.trackers.lightbox.states.viewingPrice = function(){
    bby.cart.analytics.trackers.lightbox.states.viewingPrice.base.call(this);
};
bby.cart.analytics.trackers.lightbox.states.viewingPrice.prototype = {
    removeFromCart:  function(){
		this.context().mapTracker().removeFromCart();
		this.state("shopping");
		return this;
	},
    shop:  function(){
		this.context().mapTracker().closeLightbox();
		this.state("shopping");
		return this;
	},
    shopAccessories:  function(response){
		this.context().mapTracker().keepInCart(response.product());

		var tracker = this.context().haccsTracker();
		tracker.openLightbox(response);

		if(response.hasAccessories()) tracker.shopDefaultCategory(response);
		else tracker.displayNoCategories(response);

		this.state("shoppingAccessories");
		return this;
	},
	shopDefaultCategory:  function(response){
		this.context().haccsTracker().setCurrentActiveTab(response);
		return this;
	},
    goToCart: function(response){
		this.context().mapTracker().noAccessories(response.product());
		return this;
	}
}
$.ext(bby.cart.analytics.trackers.lightbox.states.viewingPrice,
	  bby.cart.analytics.trackers.lightbox.states.abstractState);

//-- END OF LINE 23 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/states/viewingPrice.js"
 
//-- START OF LINE 25 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/trackers/haccs.js"
bby.cart.analytics.trackers.lightbox.trackers.haccs = function(trackEvt, trackObjects, model){
    bby.cart.analytics.trackers.lightbox.trackers.haccs.base.call(this, trackEvt, trackObjects);

    this._isPdpPage = $.spec(function(v){ return /PDH/.test(v); });
    this._isListingPage = $.spec(function(v){ return /ABLH/.test(v); });
    this._isCartPage = $.spec(function(v){ return /CRT/.test(v); });

	this._isMapSku = $.spec(function(p){ return p.isMap; });
	this._isIcrSku = $.spec(function(p){ return p.isIcr; });
};

bby.cart.analytics.trackers.lightbox.trackers.haccs.prototype = {
	setCurrentActiveTab: function(tab){
        var dom = $(tab),
            ckey = dom.attr("category"),
            lkey = dom.attr("link"),
            hasKey = (!!ckey || !!lkey);

        if(!hasKey) return this;

        var prop = (!ckey) ? "plans" : "categories",
            key = (!ckey) ? lkey : ckey,
            property = trackHaccs[prop][key];

        trackHaccs.activeMainTab = (!ckey) ? "protectit" : "completeit";
        trackHaccs.activeCategory = (!property) ? { name:"", count:"" } : property;

        return this;
    },
	//NOTE: Only used for accessory products
	addToCart: function(product){
        var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto(),
            category = lto.activeCategory || {name: "", count: ""},
            pg = this._createPage(),
            pdctTab = this._createProductTab(category),
			price = parseFloat(product.salePrice).toFixed(2),
            avType = !product.availabilityType.localeCompare('preOrder') ? ',event77'
					: !product.availabilityType.localeCompare('specialOrder') ? ',event76' : "";

            
        if (trackHaccs.activeMainTab == "protectit") {
        	return this.$trackEvent().event('event.link',
                    {
                        page: pg,
                        productTab: pdctTab,
                        clickAction: $.str.format('lbox:{0}cart add', this._availability()),
                        conversion: $.str.build('scAdd,scOpen,event5,event10', avType),
                        d_product: $.str.build(';', product.skuId, ';;;event5=', price, ';evar7=lbox:', gto.templateName, ';')
                    });
        }
        else {
	        return this.$trackEvent().event('event.link',
	            {
	                page: pg,
	                productTab: pdctTab,
	                clickAction: $.str.format('lbox:{0}cart add', this._availability()),
	                conversion: $.str.build('scAdd,scOpen,event5,event8', avType),
	                d_product: $.str.build(';', product.skuId, ';;;event5=', price, ';evar7=lbox:', gto.templateName, ';')
	            });
        }
    },
    addToCartError: function(errorFlagObj){
        var item = (errorFlagObj.isDriverProduct) ? "Driver":"HACCS",
            msg = (errorFlagObj.isMaxQuantityError) ? " Product max allowed qty":" not able to add item",
            pg = this._createPage();

        return this.$trackEvent().event('event.link', { page: pg, clickAction:$.str.build('lbox:', item, msg) });
    },
    closeLightbox: function(){
        var pg = this._createPage();
        return this.$trackEvent().event('event.link', {
            page: pg,
            clickAction: $.str.format('lbox:{0}close', this._availability())
        });
    },
    continueShopping: function(){
        return this.$trackEvent().event('event.link', {
            clickAction: 'lbox:continueshopping'
        });
    },
    goToCart: function(){
        var pg = this._createPage();
        return this.$trackEvent().event('event.link', {
			page: pg,
			clickAction: $.str.format('lbox:{0}gotocart', this._availability())
		});
    },
    openLightbox: function(response){
        return;
        var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto(),
            category = lto.activeCategory || {name: "", count: ""},
            pg = this._createPage(),
            pdctTab = this._createProductTab(category),
            temp = gto.templateName,
			product = response.product(),
            isCartPage = this._isCartPage.isSatisfiedBy(temp),
            isMapSku = this._isMapSku.isSatisfiedBy(product),
            isIcrSku = this._isIcrSku.isSatisfiedBy(product),
            conversion = (isCartPage) ? 'event21'
				: (isIcrSku) ? 'scAdd,scOpen,event21,event100'
				: (isMapSku) ? 'scAdd,scOpen,event21,event99'
				: 'scAdd,scOpen,event21',
            seePriceIn = (isIcrSku) ? {seePriceIn: "See Price in Checkout"}
                : (isMapSku) ? {seePriceIn: "See Price in Cart"} : {},
            d_product = $.str.build(';', lto.driverProduct.skuId,
                                    ';;;;evar7=lbox:',
                                    gto.templateName),
            trackObject = {
                page: pg,
                d_uberCat: gto.uberCatName,
                d_category: gto.d_category,
                templateName: 'Pre-Cart Light Box',
                productTab: pdctTab,
                clickAction: $.str.format('lbox:{0}launch', this._availability()),
                conversion: conversion,
                d_product: d_product,
                prevPage: gto.page};

        // return this.$trackEvent().event('event.view', $.extend(trackObject, seePriceIn));
    },
    displayNoCategories: function(){
        return;
        var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto(),
            pg = this._createPage(),
            pdctTab = this._createProductTab(null),
            temp = gto.templateName,
            isCartPage = this._isCartPage.isSatisfiedBy(temp);

        return this.$trackEvent().event('event.view',
        {
            page: pg,
            d_uberCat: gto.uberCatName,
            d_category: gto.d_category,
            templateName: 'Pre-Cart Light Box',
            productTab: pdctTab,
            clickAction: 'lbox:noaccessories:launch',
            conversion: isCartPage ? 'event21' : 'scAdd,scOpen,event21',
            d_product: $.str.build(';',
                                    lto.driverProduct.skuId,
                                    ';;;;evar7=lbox:',
                                    gto.templateName,
                                    ';evar2=',
                                    lto.driverProduct.skuId),
            prevPage: gto.page
        });
    },
    shopDefaultCategory: function(){
        var category = this.$trackObjects.lto().activeCategory || {name: "", count: ""};
        this._shopCategory(category, $.str.format('lbox:{0}default tab', this._availability()));
    },
    shopCategory: function(categoryTab){
		this.setCurrentActiveTab(categoryTab);
        var category = this.$trackObjects.lto().activeCategory || {name: "", count: ""};
		return this._shopCategory(category);
    },
    shopProtectionPlans: function(count){
        var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto(),
            category = lto.activeCategory || {name: "", count: "", products: {}},
            product = category.products["product" + count],
            pg = this._createPage(),
            pdctTab = this._createProductTab(category),
            price = parseFloat(product.price).toFixed(2);

        return this.$trackEvent().event('event.link', {
			page: pg,
			productTab: pdctTab,
			clickAction: $.str.format('lbox:{0}lbox:cart add plan' , this._availability()),
			conversion: 'scAdd,scOpen,event5,event10',
			d_product: $.str.build(';', product.skuId, ';;;event5=', price, ';evar7=lbox:', gto.templateName, ';')
		});
    },
    _shopCategory: function(category, action){
        if(!category) return;
        var format = ';{0};;;;evar3={1}:{2}({3}):{4}:Spot({8}):{5}|evar35={6}|evar2={7},',
            dProductValue = '',
            p = category.products,
            gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto(),
            act = action || $.str.format('lbox:{0}tab click' , this._availability()),
            pg = this._createPage();

        for (var n in p) {
            dProductValue +=
                $.str.format(format,
                             p[n].skuId,
                             this._cleanString(lto.activeMainTab),
                             this._cleanString(category.name),
                             category.count,
                             this._cleanString(p[n].slotName),
                             lto.type,
                             p[n].rating || "",
                             lto.driverProduct.skuId,
							 p[n].count);
        }
        return this.$trackEvent().event('event.link', {
            page: pg,
            productTab: this._createProductTab(category),
            clickAction: act,
            conversion: 'event7',
            d_product: dProductValue
        });
    },
    _createProductTab: function(category){
        var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto(),
            temp = gto.templateName,
            activeMainTab = this._cleanString(lto.activeMainTab),
            categoryInfo = (category !== null)
                ? $.str.build(':', this._cleanString(category.name), '(', category.count, ')') : '';

        if(this._isPdpPage.or(this._isListingPage).isSatisfiedBy(temp))
            return $.str.build(gto.uberCatName, ':', gto.parentCatName, ':lbox:', activeMainTab, categoryInfo);

        if(this._isCartPage.isSatisfiedBy(temp))
            return $.str.build(gto.uberCatName, ':', gto.parentCatName, ':', gto.catName, ':lbox:', activeMainTab, categoryInfo);

        return $.str.build(gto.catName, ':lbox:', activeMainTab, categoryInfo);
    },
    _createPage: function(){
        var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto(),
            temp = gto.templateName;

        return (this._isPdpPage.or(this._isListingPage).isSatisfiedBy(temp))
            ? $.str.build(gto.uberCatName, ':', gto.parentCatName, ':lbox')
			: (this._isCartPage.isSatisfiedBy(temp))
				? $.str.build(gto.uberCatName, ':', gto.parentCatName, ':', gto.catName, ':lbox')
				: $.str.build(gto.catName, ':lbox');
    },
    _planAlreadyInCart: function () {
        var pg = this._createPage();
        return this.$trackEvent().event('event.link', { page: pg, clickAction: 'lbox:plan already selected' });
    },
	_availability: function(){
		var lto = this.$trackObjects.lto()
    if(!lto.driverProduct) {
      return '';
    }
		var type = lto.driverProduct.availabilityType;
		return (/preOrder/i.test(type)) ? "PO:"
			: (/specialOrder/i.test(type)) ? "SO:"
			: "";
	},
    _cleanString: function(inputString){
        return (!$.isString(inputString)) ? "" : inputString.replace(/[;:,!\|\(\)]/g,'-');
    }
}
$.ext(bby.cart.analytics.trackers.lightbox.trackers.haccs,
      bby.infrastructure.analytics.abstractTracker);

//-- END OF LINE 25 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/trackers/haccs.js"
 
//-- START OF LINE 27 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/trackers/icr.js"
bby.cart.analytics.trackers.lightbox.trackers.icr = function(trackEvt, trackObjects, model){
    bby.cart.analytics.trackers.lightbox.trackers.icr.base.call(this, trackEvt, trackObjects);
}
bby.cart.analytics.trackers.lightbox.trackers.icr.prototype = {
	addToCart: function(product){
        var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto();
        return this.$trackEvent().event('event.link',
            {
                lastLink: gto.page,
                conversion: "scOpen,scAdd,event100",
                seePriceIn: "See Price at Checkout",
                d_product: $.str.format(";{0};;;", product.skuId),
                clickAction: "addIcr"
            });
    }
}
$.ext(bby.cart.analytics.trackers.lightbox.trackers.icr,
      bby.infrastructure.analytics.abstractTracker);

//-- END OF LINE 27 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/trackers/icr.js"
 
//-- START OF LINE 29 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/trackers/map.js"
bby.cart.analytics.trackers.lightbox.trackers.map = function(trackEvt, trackObjects, model){
    bby.cart.analytics.trackers.lightbox.trackers.map.base.call(this, trackEvt, trackObjects);
}
bby.cart.analytics.trackers.lightbox.trackers.map.prototype = {
	openLightbox: function(product){
		var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto();
        return this.$trackEvent().event('event.view',
        {
			page: gto.templateName + ":MAP:lbox",
            seePriceIn : "See Price in Cart",
			d_product: $.str.format(";{0};;;", product.skuId),
            conversion: "scAdd,scOpen,event21,event99",
			clickAction: "lbox:MAP:launch"
        });
    },
	closeLightbox: function(){
		var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto();
        return this.$trackEvent().event('event.view',
        {
			clickAction: "lbox:MAP:close"
        });
    },
	removeFromCart: function(){
		var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto();
        return this.$trackEvent().event('event.view',
        {
			page: gto.templateName + ":MAP:lbox",
			d_product: $.str.format(";{0};;;", lto.driverProduct.skuId),
			clickAction: "lbox:MAP:remove"
        });
    },
	keepInCart: function(product){
		var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto();
        return this.$trackEvent().event('event.view',
        {
			page: gto.templateName + ":MAP:lbox",
			d_product: $.str.format(";{0};;;", product.skuId),
			clickAction: "lbox:MAP:launchhaccs"
        });
    },
	noAccessories: function(product){
		var gto = this.$trackObjects.gto(),
            lto = this.$trackObjects.lto();
        return this.$trackEvent().event('event.view',
        {
			page: gto.templateName + ":MAP:lbox",
			d_product: $.str.format(";{0};;;", product.skuId),
			clickAction: "lbox:MAP:gotocart"
        });
    }
}
$.ext(bby.cart.analytics.trackers.lightbox.trackers.map,
      bby.infrastructure.analytics.abstractTracker);

//-- END OF LINE 29 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/analytics/trackers/lightbox/trackers/map.js"
 
//-- START OF LINE 31 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/controllers/salesFlow.js"
bby.cart.controllers.salesFlow = function(model, view){
    this._model = model;
    this._view = view.controller(this);
}

bby.cart.controllers.salesFlow.prototype = {

	//Depricated: Change to shopProtectionPlans in JSP
	shopPlan: function(c, i){ this.shopProtectionPlans(c, i); },

    addToCart: function(caller, json){
        var product = $.dto.parseJson(json).toObject();
        this._view.process(caller, product);
        this._model.addToCart(product);
    },
	removeFromCart: function(){
        this._model.removeFromCart();
    },
    addToCartFromExpressLane: function(){
        if(parseInt($('#storeId').val())) {
          document.FrmAddToCart.submit();
        }
        else {
          this._model.addToCart(this._view.productForm().read());
        }
    },
    shop: function(){
        this._model.shop();
    },
    continueShopping: function(){
        this._model.continueShopping();
    },
    shopAccessories: function(caller, product){
        this._model.shopAccessories($.dto.parseJson(product));
    },
	shopCategories: function(){
        this._model.shopCategories();
    },
	shopProtectionPlans: function(caller, count){
        this._model.shopProtectionPlans(count);
    },
	shopDefaultCategory: function(categoryTab){
		this._model.shopDefaultCategory(categoryTab);
	},
	shopCategory: function(categoryTab){
		this._model.shopCategory(categoryTab);
	},
	shopCnetCategory: function(categoryDom){
		this._model.shopCnetCategory(categoryDom);
	},
	viewPrice: function(product){
		this._model.viewPrice($.dto.parseJson(product));
	},
    goToCart: function(){
        this._model.goToCart();
    },
    onPspSelectionSwap: function(currentSkuId, addedSkuId) {
        this._view.onPspSelectionSwap(currentSkuId, addedSkuId);
    }
}

//-- END OF LINE 31 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/controllers/salesFlow.js"
 
//-- START OF LINE 33 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopAccessories.js"
bby.cart.model.decorators.shopAccessories = function(){ }
bby.cart.model.decorators.shopAccessories.prototype.decorate = function(product){
    var decor = {"id":"pcat18005",
                 "type":"page"};
    return $.dto(product).replicate().merge(decor);
}

//-- END OF LINE 33 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopAccessories.js"
 
//-- START OF LINE 35 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/viewPrice.js"
bby.cart.model.decorators.viewPrice = function(){ }
bby.cart.model.decorators.viewPrice.prototype.decorate = function(product){
    var decor = {"id":"pcat18005",
                 "type":"page",
				 "renderMapCart":true};
    return $.dto(product).replicate().merge(decor);
}

//-- END OF LINE 35 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/viewPrice.js"
 
//-- START OF LINE 37 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/base.js"
bby.cart.model.decorators.shopping.base = function(form){ }
bby.cart.model.decorators.shopping.base.prototype = {
    decorate: function(product){ },
    $generateProductsAndSkus: function(skuId, productId){ }
}

//-- END OF LINE 37 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/base.js"
 
//-- START OF LINE 39 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromCart.js"
bby.cart.model.decorators.shopping.fromCart = function(form){
    this._frm = form;
}

bby.cart.model.decorators.shopping.fromCart.prototype = {
    decorate: function(product){
        var prodDto = $.dto(product),
            prodObj = prodDto.toObject(),
            productsAndSkus = this.$generateProductsAndSkus(prodObj.skuId, prodObj.productId),
            decor = $.dto({ "_DARGS": this._frm._DARGS.value,
                            "productIds": productsAndSkus.products,
                            "skuIds": productsAndSkus.skus,
                            "/atg/commerce/order/ShoppingCartModifier.updateOrAdd": "",
                            "_D:/atg/commerce/order/ShoppingCartModifier.updateOrAdd": "",
                            "ajaxAddToCart":"true"})
                    .add(prodObj.skuId, 1);

        return prodDto.replicate().merge(decor);
    },
    $generateProductsAndSkus: function(skuId, productId){
        return {"skus": skuId, "products": productId};
    }
}

//-- END OF LINE 39 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromCart.js"
 
//-- START OF LINE 41 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromCompare.js"
bby.cart.model.decorators.shopping.fromCompare = function(form){
    this._frm = form;
}

bby.cart.model.decorators.shopping.fromCompare.prototype = {
    decorate: function(product){
        var prodDto = $.dto(product),
            prodObj = prodDto.toObject(),
            productsAndSkus = this.$generateProductsAndSkus(prodObj.skuId, prodObj.productId),
            decor = $.dto({ "_DARGS": this._frm._DARGS.value,
                            "productIds": productsAndSkus.products,
                            "skuIds": productsAndSkus.skus,
                            "/atg/commerce/order/ShoppingCartModifier.updateOrAdd": "",
                            "_D:/atg/commerce/order/ShoppingCartModifier.updateOrAdd": "",
                            "ajaxAddToCart":"true"})
                    .add(prodObj.skuId, 1);

        return prodDto.replicate().merge(decor);
    },
    $generateProductsAndSkus: function(skuId, productId){
        return {"skus": skuId, "products": productId};
    }
}

//-- END OF LINE 41 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromCompare.js"
 
//-- START OF LINE 43 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromExpressLane.js"
bby.cart.model.decorators.shopping.fromExpressLane = function(form){
    var action = form.action,
        dargsList = /\?_DARGS=.+/.exec(action);
        dargs = ($.exists(dargsList)) ? dargsList[0] : null,
        hasDargs = $.exists(dargs);
    this._frm = form;
    this._elements = form.elements;
    this._dargs = (hasDargs) ? dargs.replace("?_DARGS=", "") : "";
}

bby.cart.model.decorators.shopping.fromExpressLane.prototype = {
    decorate: function(product){
        var prodDto = $.dto(product),
            prodObj = prodDto.toObject(),
            productsSkusAndQuantities = this.$generateProductsSkusAndQuantities(prodObj.catalogRefId, prodObj.productId, prodObj.quantity),
            decor = $.dto({ "_DARGS": this._dargs,
                            "productIds": productsSkusAndQuantities.products,
                            "skuId": productsSkusAndQuantities.skus,
                            "sourcePage" : $('#sourcePage').val(),
                            "itemCondition": $('#itemCondition').val(),
                            "quantities": productsSkusAndQuantities.quantities,
                            "/bestbuy/digiterra/commerce/custsvc/order/CRMShoppingCartModifier.addCommerceItem": "",
                            "_D:/bestbuy/digiterra/commerce/custsvc/order/CRMShoppingCartModifier.addCommerceItem": ""})
                    .add(prodObj.skuId, 1);
            
        $.list(productsSkusAndQuantities.skus.split("^")).each(function(v){decor.add(v, 1); });
        return prodDto.replicate().merge(decor);	
    },
    $generateProductsSkusAndQuantities: function(skuId, productId, quantity){
        var skuIds,
            productIds,
            quantities,
            accessories = this._elements;
        if(!accessories) return {"skus": skuId, "products": productId, "quantities":quantity};
               
        var productIds = (productId != null) ? productId + "^" : "^",
            skuIds = (skuId != null) ? skuId + "^" : "^",
            quantities = (quantity != null) ? quantity + "^" : "",
            hasValue = $.spec(function(v){ return (!v) ? false : !!v.value ; })
            isCheckbox = $.spec(function(v){ return (!v) ? false : /checkbox/i.test(v.type); }),
            isAccessory = $.spec(function(v){ return (!v) ? false :v.name.indexOf("accessory") != -1; }),
            isChecked = $.spec(function(v){ return (!v) ? false :v.checked; });
        
        $.list(accessories).each(function(accessory){
            if(isCheckbox
                .and(hasValue)
                .and(isAccessory)
                .and(isChecked)
                .not().isSatisfiedBy(accessory)) return;
	    
            var value = accessory.value,
                skuDelimiterIndex = value.indexOf(","),
		quantityDelimiterIndex = value.lastIndexOf(",");
	    
            productIds += value.substring(0, skuDelimiterIndex) + "^";
            skuIds += value.substring(skuDelimiterIndex + 1, quantityDelimiterIndex) + "^";
            quantities += value.substring(quantityDelimiterIndex + 1) + "^";
        });

        skuIds = skuIds.substr(0, skuIds.length - 1);
        productIds = productIds.substr(0, productIds.length - 1);
        quantities = quantities.substr(0, quantities.length - 1);
        
        return {"skus": skuIds, "products": productIds, "quantities": quantities};
    }
}
//-- END OF LINE 43 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromExpressLane.js"
//-- START OF LINE 44 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromList.js"
bby.cart.model.decorators.shopping.fromList = function(form){
    this._frm = form;
}

bby.cart.model.decorators.shopping.fromList.prototype = {
    decorate: function(product){
        var prodDto = $.dto(product),
            prodObj = prodDto.toObject(),
            productsAndSkus = this.$generateProductsAndSkus(prodObj.skuId, prodObj.productId),
            decor = $.dto({ "_DARGS": this._frm._DARGS.value,
                            "productIds": productsAndSkus.products,
                            "skuIds": productsAndSkus.skus,
                            "/bestbuy/digiterra/search/formhandler/SearchShoppingCartModifier.updateOrAdd": "",
                            "_D:/bestbuy/digiterra/search/formhandler/SearchShoppingCartModifier.updateOrAdd": "",
                            "ajaxAddToCart":"true"})
                    .add(prodObj.skuId, 1);
     
        return prodDto.replicate().merge(decor);	
    },
    $generateProductsAndSkus: function(skuId, productId){
        return {"skus": skuId, "products": productId};
    }
}
//-- END OF LINE 44 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromList.js"
//-- START OF LINE 45 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromPdp.js"
bby.cart.model.decorators.shopping.fromPdp = function(form){
    var action = form.action,
        dargsList = /\?_DARGS=.+/.exec(action);
        dargs = ($.exists(dargsList)) ? dargsList[0] : null,
        hasDargs = $.exists(dargs);
    this._frm = form;
    this._elements = form.elements;
    this._dargs = (hasDargs) ? dargs.replace("?_DARGS=", "") : "";
}

bby.cart.model.decorators.shopping.fromPdp.prototype = {
    decorate: function(product){
        var prodDto = $.dto(product),
            prodObj = prodDto.toObject(),
            productsAndSkus = this.$generateProductsAndSkus(prodObj.skuId, prodObj.productId),
            decor = $.dto({ "_DARGS": this._dargs,
                            "productIds": productsAndSkus.products,
                            "skuIds": productsAndSkus.skus,
                            "/atg/commerce/order/ShoppingCartModifier.addItemsToOrder": "",
                            "_D:/atg/commerce/order/ShoppingCartModifier.addItemsToOrder": ""})
                    .add(prodObj.skuId, 1);
            
        $.list(productsAndSkus.skus.split("^")).each(function(v){decor.add(v, 1); });
        return prodDto.replicate().merge(decor);	
    },
    $generateProductsAndSkus: function(skuId, productId){
        var skuIds,
            productIds,
            accessories = this._elements;
        if(!accessories) return {"skus": skuId, "products": productId};
               
        var productIds = (productId != null) ? productId + "^" : "",
            skuIds = (skuId != null) ? skuId + "^" : "",
            hasValue = $.spec(function(v){ return (!v) ? false : !!v.value ; })
            isCheckbox = $.spec(function(v){ return (!v) ? false : /checkbox/i.test(v.type); }),
            isAccessory = $.spec(function(v){ return (!v) ? false :v.name.indexOf("accessory") != -1; }),
            isChecked = $.spec(function(v){ return (!v) ? false :v.checked; });
        
        $.list(accessories).each(function(accessory){
            if(isCheckbox
                .and(hasValue)
                .and(isAccessory)
                .and(isChecked)
                .not().isSatisfiedBy(accessory)) return;
	    
            var value = accessory.value,
                delimiterIndex = value.indexOf(",");
	    
            productIds += value.substr(0, delimiterIndex) + "^";
            skuIds += value.substr(delimiterIndex + 1, value.length) + "^";
        });

        skuIds = skuIds.substr(0, skuIds.length - 1);
        productIds = productIds.substr(0, productIds.length - 1);
        
        return {"skus": skuIds, "products": productIds};
    }
}
//-- END OF LINE 45 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromPdp.js"
//-- START OF LINE 46 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromStore.js"
bby.cart.model.decorators.shopping.fromStore = function(form){
    this._frm = form;
}

bby.cart.model.decorators.shopping.fromStore.prototype = {
    decorate: function(product){
    var prodDto = $.dto(product),
        prodObj = prodDto.toObject(),
        productsAndSkus = this.$generateProductsAndSkus(prodObj.skuId, prodObj.productId),
        decor = $.dto({ "_DARGS": this._frm._DARGS.value,
                        "productIds": productsAndSkus.products,
                        "skuIds": productsAndSkus.skus,
                        "currentLink":"",
                        "TxtZipCode":"",
                        "_D:TxtZipCode":"",
                        "TxtCity":"",
                        "_D:TxtCity":"",
                        "_D:DrpState":"",
                        "DrpState":"",
                        "warehouseAtpCall":"",
                        "applianceSku":"true",
                        "callType": prodObj.callType || "",
                        "tempCatalogRefId":"",
                        "281addtocart.x":"",
                        "281addtocart.y":"",
                        "listingType":"listing",
                        "/bestbuy/digiterra/commerce/order/formhandler/CartQuickStoresFormHandler.successURL":"/site/olstemplatemapper.jsp?id=pcat17071&type=page&initialize=false&sp=&nrp=15&iht=y&list=n&sc=Global&st=9896008&usc=All+Categories&ks=960&cp=1&qp=",
                        "_D:/bestbuy/digiterra/commerce/order/formhandler/CartQuickStoresFormHandler.successURL":"",
                        "/bestbuy/digiterra/commerce/order/formhandler/CartQuickStoresFormHandler.dispatcher":"",
                        "_D:/bestbuy/digiterra/commerce/order/formhandler/CartQuickStoresFormHandler.dispatcher":"",
                        "sourcePageURL":"/site/olstemplatemapper.jsp?id=pcat17071&type=page&initialize=false&sp=&nrp=15&iht=y&list=n&sc=Global&st=9896008&usc=All+Categories&ks=960&cp=1&qp=",
                        "_D:281addtocart":"",
                        "_DSV:281addtocart":""})
                .add(prodObj.skuId, 1);
        return prodDto.replicate().merge(decor);	
    },
    $generateProductsAndSkus: function(skuId, productId){
        return {"skus": skuId, "products": productId};
    }
}

//-- END OF LINE 46 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/decorators/shopping/fromStore.js"
 
//-- START OF LINE 48 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/error.js"
bby.cart.model.services.error = function(){
    bby.cart.model.services.error.base.call(this);
}
bby.cart.model.services.error.prototype = {
    isRetry: function(isRetry){ return this.property("isRetry", isRetry); },
    message: function(message){ return this.property("message", message); },
    storeId: function(storeId){ return this.property("storeId", storeId); },
    isSts: function(isSts){ return this.property("isSts", isSts); }
}
$.ext(bby.cart.model.services.error, $.Class);

//-- END OF LINE 48 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/error.js"
 
//-- START OF LINE 50 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/factory.js"
bby.cart.model.services.factory = function(addToCartUri,
										   shopAccessoriesUri,
										   viewPriceUri) {
    this._addToCartUri = addToCartUri;
    this._shopAccessoriesUri = shopAccessoriesUri;
    this._viewPriceUri = viewPriceUri;
}

bby.cart.model.services.factory.prototype = {
    createAddToCart: function() {
        return new bby.infrastructure.services.service("POST", this._addToCartUri, "json");
    },
    createShopAccessories: function() {
        return new bby.infrastructure.services.service("GET", this._shopAccessoriesUri, "html");
    },
    createViewPrice: function() {
        return new bby.infrastructure.services.service("GET", this._viewPriceUri, "html");
    }
}

//-- END OF LINE 50 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/factory.js"
 
//-- START OF LINE 52 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/response/accessories.js"
bby.cart.model.services.response.accessories = function(data) {
    bby.cart.model.services.response.accessories.base.call(this);

    this.hasAccessories(/bby-accessory/i.test(data))
        .isValid(/bby-lightboxContent/i.test(data))
        .value(data);
}
bby.cart.model.services.response.accessories.prototype = {
    error: function(error){ return this.property("error", error); },
    hasAccessories: function(hasAccessories){ return this.property("hasAccessories", hasAccessories); },
    isValid: function(isValid){ return this.property("isValid", isValid); },
    product: function(product){ return this.property("product", product); },
    value: function(data){ return this.property("value", data); }
}
$.ext(bby.cart.model.services.response.accessories, $.Class);

//-- END OF LINE 52 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/response/accessories.js"
 
//-- START OF LINE 54 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/response/addToCart.js"
bby.cart.model.services.response.addToCart = function(data) {
    bby.cart.model.services.response.addToCart.base.call(this);

    this.quantity(data.quantity);
    this.hasAccessories(data.hasAccessories);
    this.product($.dto.parseJson(data.product).toObject());
    this.messageKey(data.messageKey);

    if(data.error) {
		var error = new bby.cart.model.services.error();
		error.isRetry(data.tryagainMsg);
		error.message(data.msg);
		error.isSts(data.stsError);
		error.storeId(data.storeId);
		this.error(error);
	}
}
bby.cart.model.services.response.addToCart.prototype = {
    error: function(error){ return this.property("error", error); },
    hasAccessories: function(hasAccessories){ return this.property("hasAccessories", hasAccessories); },
    product: function(product){ return this.property("product", product); },
    isDriverProduct: function(isDriverProduct){ return this.property("isDriverProduct", isDriverProduct); },
    quantity: function(quantity){ return this.property("quantity", quantity); },
    messageKey: function(messageKey){ return this.property("messageKey", messageKey); }
}
$.ext(bby.cart.model.services.response.addToCart, $.Class);

//-- END OF LINE 54 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/response/addToCart.js"
 
//-- START OF LINE 56 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/response/viewPrice.js"
bby.cart.model.services.response.viewPrice = function(data) {
    bby.cart.model.services.response.viewPrice.base.call(this);

    this.hasAccessories(true)
		.isValid(true)
        .value(data);
}
bby.cart.model.services.response.viewPrice.prototype = {
    error: function(error){ return this.property("error", error); },
    hasAccessories: function(hasAccessories){ return this.property("hasAccessories", hasAccessories); },
	isValid: function(isValid){ return this.property("isValid", isValid); },
    product: function(product){ return this.property("product", product); },
    value: function(data){ return this.property("value", data); }
}
$.ext(bby.cart.model.services.response.viewPrice, $.Class);

//-- END OF LINE 56 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/services/response/viewPrice.js"
 
//-- START OF LINE 58 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/workflow/salesFlow.js"
bby.cart.model.workflow.salesFlow = function(serviceFactory,
											 addToCartDecorator,
											 shopAccessoriesDecorator,
											 viewPriceDecorator,
											 state,
											 cartUri) {

    bby.cart.model.workflow.salesFlow.base.call(this, state);

    this.serviceFactory = serviceFactory;
    this.addToCartDecorator = addToCartDecorator;
    this.shopAccessoriesDecorator = shopAccessoriesDecorator;
    this.viewPriceDecorator = viewPriceDecorator;
    this.cartUri = cartUri;

    this._addToCartSuccess = $.observer();
    this._addToCartError = $.observer();
    this._removeFromCartSuccess = $.observer();
	this._shop = $.observer();
	this._continueShopping = $.observer();
    this._shopAccessoriesSuccess = $.observer();
	this._shopDefaultCategory = $.observer();
	this._shopCategory = $.observer();
	this._shopCategories = $.observer();
	this._shopProtectionPlans = $.observer();
	this._viewPriceSuccess = $.observer();
	this._viewPriceError = $.observer();
	this._goToCart = $.observer();
    this._error = $.observer();
}

bby.cart.model.workflow.salesFlow.prototype = {
	addToCart: function(product) {
		this._state.addToCart(product);
		return this;
	},
	removeFromCart: function(product) {
		this._state.removeFromCart(product);
		return this;
	},
    shop: function() {
		this._state.shop();
		return this._notify(this._shop, arguments);
	},
    continueShopping: function() {
		this._state.shop();
		return this._notify(this._continueShopping, arguments);
	},
    shopAccessories: function(product) {
		this._state.shopAccessories(product);
		return this;
	},
    viewPrice: function(product) {
		this._state.viewPrice(product);
		return this;
	},
	shopCategories: function(){
        return this._notify(this._shopCategories, arguments);
	},
	shopProtectionPlans: function(){
        return this._notify(this._shopProtectionPlans, arguments);
	},
	shopDefaultCategory: function(categoryTab){
        return this._notify(this._shopDefaultCategory, arguments);
	},
	shopCategory: function(categoryTab){
        return this._notify(this._shopCategory, arguments);
	},
	shopCnetCategory: function(){
        return this._notify(this._shopCnetCategory, arguments);
	},
    checkout: function() {
		this._state.checkout();
		return this;
	},
    goToCart: function() {
        return this._notify(this._goToCart, arguments);
	},
    onAddToCartSuccess: function(func, scope) {
		this._addToCartSuccess.add(func, scope);
		return this;
	},
	onAddToCartError: function(func, scope) {
		this._addToCartError.add(func, scope);
		return this;
	},
	onRemoveFromCartSuccess: function(func, scope) {
		this._removeFromCartSuccess.add(func, scope);
		return this;
	},
	onViewPriceSuccess: function(func, scope) {
		this._viewPriceSuccess.add(func, scope);
		return this;
	},
	onViewPriceError: function(func, scope) {
		this._viewPriceError.add(func, scope);
		return this;
	},
	onShop: function(func, scope){
		this._shop.add(func, scope);
		return this;
	},
	onContinueShopping: function(func, scope){
		this._continueShopping.add(func, scope);
		return this;
	},
    onShopAccessoriesSuccess: function(func, scope) {
		this._shopAccessoriesSuccess.add(func, scope);
		return this;
	},
	onShopCategories: function(func, scope){
		this._shopCategories.add(func, scope);
		return this;
	},
	onShopProtectionPlans: function(func, scope){
		this._shopProtectionPlans.add(func, scope);
		return this;
	},
	onShopDefaultCategory: function(func, scope){
		this._shopDefaultCategory.add(func, scope);
		return this;
	},
	onShopCategory: function(func, scope){
		this._shopCategory.add(func, scope);
		return this;
	},
	onGoToCart: function(func, scope){
		this._goToCart.add(func, scope);
		return this;
	},
    onError: function(func, scope) {
		this._error.add(func, scope);
		return this;
	},
	addToCartSuccess: function() {
        return this._notify(this._addToCartSuccess, arguments);
    },
	addToCartError: function(){
        return this._notify(this._addToCartError, arguments);
	},
	removeFromCartSuccess: function() {
        return this._notify(this._removeFromCartSuccess, arguments);
    },
	viewPriceSuccess: function() {
        return this._notify(this._viewPriceSuccess, arguments);
    },
	viewPriceError: function(){
        return this._notify(this._viewPriceError, arguments);
	},
    shopAccessoriesSuccess: function() {
        return this._notify(this._shopAccessoriesSuccess, arguments);
    },
    error: function() {
        return this._notify(this._error, arguments);
    },
	_notify: function(observer, args){
        observer.notify.apply(observer, args);
        return this;
	}
}
$.ext(bby.cart.model.workflow.salesFlow, $.abstractContext);

//-- END OF LINE 58 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/workflow/salesFlow.js"
 
//-- START OF LINE 60 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/workflow/states/abstractState.js"
bby.cart.model.workflow.states.abstractState = function(){
    bby.cart.model.workflow.states.abstractState.base.call(this, bby.cart.model.workflow.states);
}
bby.cart.model.workflow.states.abstractState.prototype = {
    addToCart: function(){ return; },
    shop: function(){ return; },
    shopAccessories: function(){ return; },
	viewPrice: function(){ return; },
    error: function(){ return; }
}
$.ext(bby.cart.model.workflow.states.abstractState, $.abstractState);

//-- END OF LINE 60 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/workflow/states/abstractState.js"
 
//-- START OF LINE 62 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/workflow/states/shopping.js"
bby.cart.model.workflow.states.shopping = function(){
    bby.cart.model.workflow.states.shopping.base.call(this);
    this._lock = $.lock();
}
bby.cart.model.workflow.states.shopping.prototype = {
    addToCart: function(product){
        var l = this._lock,
            context = this.context(),
			isHaccs = product.isHaccs,
			cartUri = context.cartUri;
        if(l.isLocked()) return;
        l.lock();

        context.serviceFactory.createAddToCart()
            .onSuccess(function(data){
                l.unlock();
                product.commerceItemId = data.commerceItemId;
                var response = new bby.cart.model.services.response.addToCart(data)
								.product(product)
								.isDriverProduct(true);
                if(response.error())
					return context.addToCartError(response).error(response);
          EventManager.trigger('addToCart', response._product);

                return (isHaccs)
					? context.addToCartSuccess(response).shopAccessories(response.product())
					: (!cartUri)
						? context.addToCartSuccess(response).error(response)
						: (function() {
								context.addToCartSuccess(response).goToCart(response);
								location.href = context.cartUri;
							})();

            }, this)
            .onError(function(data){
                l.unlock();
                return context.error(new bby.cart.model.services.response.addToCart(data));
            })
            .call(context.addToCartDecorator.decorate(product));
    },
	removeFromCart: function(){
		this.context().removeFromCartSuccess();
	},
    shopAccessories: function(product){
        var context = this.context();
        context.serviceFactory.createShopAccessories()
            .onSuccess(function(data){
                var response = new bby.cart.model.services.response.accessories(data)
								.product(product);
				if(!response.isValid()) return null;
                this.state("shoppingAccessories")._lock.unlock();
                return context.shopAccessoriesSuccess(response);
            }, this)
            .onError(function(data){
				return context.error(new bby.cart.model.services.response.accessories(data).product(product));
            })
            .call(context.shopAccessoriesDecorator.decorate(product));
    },
	viewPrice: function(product){
		var context = this.context();
		context.serviceFactory.createViewPrice()
            .onSuccess(function(data){
                var response = new bby.cart.model.services.response.viewPrice(data)
								.product(product.toObject());

				if(!response.isValid)
					return context.error(new bby.cart.model.services.response.viewPrice(data)
											.product(product.toObject()));

                return context.viewPriceSuccess(response);
            }, this)
            .onError(function(data){
                return context.error(new bby.cart.model.services.response.viewPrice(data)
									.product(product.toObject()));
            })
            .call(context.viewPriceDecorator.decorate(product));
	}
}
$.ext(bby.cart.model.workflow.states.shopping,
      bby.cart.model.workflow.states.abstractState);

//-- END OF LINE 62 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/workflow/states/shopping.js"
 
//-- START OF LINE 64 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/workflow/states/shoppingAccessories.js"
bby.cart.model.workflow.states.shoppingAccessories = function(context){
    bby.cart.model.workflow.states.shoppingAccessories.base.call(this, context);
}
bby.cart.model.workflow.states.shoppingAccessories.prototype = {
    addToCart: function(product){
        var context = this.context();
        context.serviceFactory.createAddToCart()
            .onSuccess(function(data){
                var response = new bby.cart.model.services.response.addToCart(data)
                                    .product(product)
									.isDriverProduct(false);
                return (response.error())
					? context.addToCartError(response).error(response)
					: context.addToCartSuccess(response);
            }, this)
            .onError(function(data){
                return context.error(new bby.cart.model.services.response.addToCart(data));
            })
            .call(context.addToCartDecorator.decorate(product));
    },
    shop: function(){ this.state("shopping"); }
}
$.ext(bby.cart.model.workflow.states.shoppingAccessories,
      bby.cart.model.workflow.states.abstractState);

//-- END OF LINE 64 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/model/workflow/states/shoppingAccessories.js"
 
//-- START OF LINE 66 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/accessories.js"
bby.cart.views.accessories = function(){
    bby.cart.views.accessories.base.call(this);
    this.buttons = $.hash();

    this._lightbox = new bby.infrastructure.widgets.lightbox();
    this._pos = new bby.infrastructure.widgets.pos();
    this._noAccessoriesDims = $.coord(670, 260);
    this._hasAccessoriesDims = $.coord(670, 650);
    this._driverProductDims = $.coord(220, 150);
    this._accessoriesDims = $.coord(142, 125);
    this._count = 0;
}

bby.cart.views.accessories.prototype = {
    controller: function(controller){ return this.property("controller", controller); },

    show: function(response){
        var self = this;
		var dims = (response.hasAccessories())
			? this._hasAccessoriesDims
			: this._noAccessoriesDims;

        // Do not fire new lightbox for items with large SKUs. This is primarily to stop new lightbox from firing for Marketplace items.
        var openHACCS = false;
        // try {
        //     openHACCS = response._product.skuId.length > 9;
        // }
        // catch(e) {}
        var tier = $.bbycookie('ltcd') || '';
        if(response._product.isIcr && !tier.match(/ELITE/i)) {
            var cssPath   = require.manifest['sc-icr-lightbox/less/icrLightbox.css'] || 'sc-icr-lightbox/less/icrLightbox.css';
            var linkTag   = document.createElement('link');
            linkTag.href  = require.s.contexts._.config.baseUrl + cssPath;
            linkTag.type  = 'text/css';
            linkTag.rel   = 'stylesheet';
            if($('link[href="' + linkTag.href + '"]').length < 1) {
                document.getElementsByTagName('head')[0].appendChild(linkTag);               
            }
            require(["sc-icr-lightbox/javascript/icrLightBox"], function(lightbox) {
                EventManager.once('icrLightBox:open', function() { $(".bby-addToCart-processing").remove(); });
                EventManager.once('icrLightBox:close', function() { self._controller.shop(); })
                lightbox({cid: response._product.commerceItemId, skuId: response._product.skuId});
            });

            return this;
        }

        // Hook to switch between new and HACCS lightbox.
        if(!openHACCS && (/newAccFinder=true/.test(document.cookie) || window.newAccFinder)) {
            trackHaccs = trackHaccs || {};
            trackHaccs.driverProduct = response._product;
            var cssPath   = require.manifest['_accessoryFinder/sass/accessoryFinder.css'] || '_accessoryFinder/sass/accessoryFinder.css';
            var linkTag   = document.createElement('link');
            linkTag.href  = require.s.contexts._.config.baseUrl + cssPath;
            linkTag.type  = 'text/css';
            linkTag.rel   = 'stylesheet';
            if($('link[href="' + linkTag.href + '"]').length < 1) {
                document.getElementsByTagName('head')[0].appendChild(linkTag);               
            }
            require(['_accessoryFinder/javascript/_accessoryFinderBootstrap'], function() {
                EventManager.once('accessoryFinder:open', function() { $(".bby-addToCart-processing").remove(); });
                EventManager.once('accessoryFinder:close', function() { self._controller.shop(); })
                EventManager.trigger('accessoryFinder:launch', {cid: response._product.commerceItemId, skus: response._product.skuId, onError: 'redirectToCart'});
            });
        }
        else {
            $(".bby-addToCart-processing").hide();
            this._lightbox.open(response.value())
            .sizeTo(dims.x(), dims.y());
        }

        this._initFileCabinet()
                ._initDescriptions()
                ._initActions()
                ._initImages();
		
        return this;
    },
    addPrice: function(price){
        $(".bby-subtotal-amount").html(this._pos.add(price).subtotal().toString());
	    $(".bby-accessory-count").html(++this._count);
	    $(".bby-accessoriesMessage").show();
        return this;
    },
    subtractPrice: function(price){
		if (this._count) {
			$(".bby-subtotal-amount").html(this._pos.subtract(price).subtotal().toString());
			$(".bby-accessory-count").html(--this._count);
			$(".bby-accessoriesMessage").show();
		}
		return this;
    },
    close: function(){
        this._pos.clear();
        this._count = 0;
        this._lightbox.close();
        return this;
    },
    addToCart: function(response){
    	if(!response) return this;
    	var b = this.buttons, product;
    	if (response.productId) product = response;
    	else product = response.product();
    	b.find(product.productId).added();
		b.remove(product.productId);
		return this;
	},
    process: function(caller, product){
		this.buttons.add(product.productId, new bby.cart.views.forms.addToCartButton(caller).processing());
		return this;
	},
    tryAgain: function(product){
        $(this.buttons.find(product.productId).dom)
            .find("+.bby-alertMessage")
            .html("Please try again")
            .show();
        if ($(".js-cpt-pspAddToCartButton.css-processing")){
        	var old_psp_button = $(".js-cpt-pspAddToCartButton.css-processing")[0];
        	old_psp_button.innerHTML = '<div class="css-image"></div><span class="css-text">Add To Cart</div>';
        	old_psp_button.disabled = false;
        	$(old_psp_button).removeClass("css-processing");        	
        }        
	},
    _initFileCabinet: function(){
        var me = this,
            apd = this._accessoriesDims;

        function showCategoryTab(categoryTab){
            bby.infrastructure.widgets.smartImage.fitTo(apd.x(), apd.y(), ".bby-tabbed-category");
			me._controller.shopCategory(categoryTab);
        }
        function showMainTab(mainTab){
            bby.infrastructure.widgets.smartImage.fitTo(apd.x(), apd.y(), ".bby-tabbed-category");
            var categoryTab = $(mainTab)
                .find("+.bby-file-content")
                .find(".bby-fileCabinet .css-active")[0];
			me._controller.shopCategory(categoryTab);
        }

        $(".bby-fileCabinet").each(function(){
            var cab = new bby.infrastructure.widgets.fileCabinet(),
                isMain = $.spec(function(tab){return /completeit|protectit/i.test(tab.className); }),
                isActive = $.spec(function(tab){
                    function isactive(className){ return /active/i.test(className); }
                    return isactive(tab.className) && isactive(tab.parentNode.className);
                });

            $(this).find(">.bby-file-tab").each(function(){
                var tab = this,
                    content = $(this).find("+.bby-file-content")[0],
                    className = tab.className,
                    file = new bby.infrastructure.widgets.file(this, content)
                        .onActive(function(){
                            if(isMain.isSatisfiedBy(tab)) showMainTab(tab);
                            else showCategoryTab(tab);
                        }, this);
                cab.add(file);
                if(isMain.not().and(isActive).isSatisfiedBy(tab)) {
                    me._controller.shopDefaultCategory(tab);
                }
            });
        });
        return this;
    },
    _initActions: function(){
        var me = this,
			esc = $.key(27);

        $.evt.add(document, "keyup", function(e){
            if($.key.parse(e).equals(esc)) me._controller.shop();
        }, this);

        $(".bby-lightbox-close").click(function(){ me._controller.shop(); });
        $(".bby-continueShopping").click(function(){ me._controller.continueShopping(); });
        return this;
    },
    _initDescriptions: function(){
        $(".bby-product .bby-description .bby-title a").each(function(){
            var t = this.innerHTML, l = t.length, m = 60;
            if(l > m) this.innerHTML = t.substr(0, m-4) + "...";
        });
        return this;
    },
    _initImages: function(){
        var dpd = this._driverProductDims,
            apd = this._accessoriesDims;

        setTimeout(function(){
            bby.infrastructure.widgets.smartImage.fitTo(dpd.x(), dpd.y(), ".bby-driverProduct");
            bby.infrastructure.widgets.smartImage.fitTo(apd.x(), apd.y(), ".bby-tabbed-category");
        }, 500);
        return this;
    }
}
$.ext(bby.cart.views.accessories, $.Class);

//-- END OF LINE 66 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/accessories.js"
 
//-- START OF LINE 68 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/salesFlow.js"
bby.cart.views.salesFlow = function(model,
                                    state,
                                    accessoriesView,
									viewPriceView,
                                    productForm){

    bby.cart.views.salesFlow.base.call(this, state);

	this.productForm(productForm);
    this._accessoriesView = accessoriesView;
    this._viewPriceView = viewPriceView;
	this._model = model
		.onAddToCartSuccess(this.addToCart, this)
		.onRemoveFromCartSuccess(this.removeFromCart, this)
		.onShop(this.shop, this)
		.onContinueShopping(this.shop, this)
		.onShopAccessoriesSuccess(this.shopAccessories, this)
		.onViewPriceSuccess(this.viewPrice, this)
		.onError(this.error, this);
}

bby.cart.views.salesFlow.prototype = {
    controller: function(controller){
        if($.exists(controller)) this._accessoriesView.controller(controller);
        if($.exists(controller)) this._viewPriceView.controller(controller);
        return this.property("controller", controller);
    },
    accessoriesView: function(accessoriesView){ return this.property("accessoriesView", accessoriesView); },
    viewPriceView: function(viewPriceView){ return this.property("viewPriceView", viewPriceView); },
    productForm: function(productForm){ return this.property("productForm", productForm); },
	addToCart: function(response){
		this._state.addToCart(response);
		return this;
	},
	removeFromCart: function(response){
		this._state.removeFromCart(response);
		return this;
	},
	process: function(caller, product){
		this._state.process(caller, product);
		return this;
	},
    shop: function(){
		this._state.shop();
		return this;
	},
    shopAccessories: function(response){
		this._state.shopAccessories(response);
		return this;
	},
    viewPrice: function(response){
		this._state.viewPrice(response);
		return this;
	},
    onPspSelectionSwap: function(currentSkuId, addedSkuId) {
    	this._state.onPspSelectionSwap(currentSkuId, addedSkuId);
    	return this;
    },
    error: function(response){
		this._state.error(response);
		return this;
	}
}
$.ext(bby.cart.views.salesFlow, $.abstractContext);

//-- END OF LINE 68 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/salesFlow.js"
 
//-- START OF LINE 70 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/viewPrice.js"
bby.cart.views.viewPrice = function(){
    bby.cart.views.viewPrice.base.call(this);

    this._lightbox = new bby.infrastructure.widgets.lightbox();
    this._viewPriceDims = $.coord(625, 370);
}

bby.cart.views.viewPrice.prototype = {
    controller: function(controller){ return this.property("controller", controller); },
    show: function(response){
		var dims = this._viewPriceDims;
		this._lightbox.open(response.value())
			.sizeTo(dims.x(), dims.y());

		this._initActions(response);
        return this;
    },
    close: function(){
        this._count = 0;
        this._lightbox.close();
        return this;
    },
    addToCart: function(response){
		var b = this.buttons,
			product = response.product();
		b.find(product.productId).added();
		b.remove(product.productId);
		return this;
	},
	_initActions: function(response){
	    
      // DNM hack to fix Map price block
	    if($('#saleprice.clearance').length > 0) {
        $('.bby-driverProduct > .bby-description').after($('<div class="bby-price css-price bdt-price">'));
        $('.bby-driverProduct > .saletext').prependTo('.bby-driverProduct > #saleprice.clearance');
        $('.bby-driverProduct > #saleprice, .bby-driverProduct > #regularprice, .bby-driverProduct > #savings').appendTo('.bby-driverProduct > .bby-price')
      }
	  
        var me = this,
			esc = $.key(27);

        $.evt.add(document, "keyup", function(e){
            if($.key.parse(e).equals(esc)) me._controller.shop();
        }, this);

        $(".bby-lightbox-close").click(function(){ me._controller.shop(); });
        $(".bby-close").click(function(){ me._controller.shop(); });
        $(".bby-removeFromCart").click(function(){ me._controller.removeFromCart(); });
        
        return this;
    }
}
$.ext(bby.cart.views.viewPrice, $.Class);

//-- END OF LINE 70 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/viewPrice.js"
 
//-- START OF LINE 72 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/forms/addToCartButton.js"
bby.cart.views.forms.addToCartButton = function(dom){
    bby.cart.views.forms.addToCartButton.base.call(this, dom);

    var format = '<div class="css-image"></div><span class="css-text" id="addToCartLabel">{0}</span>';
        addToCartText = $(dom).find(".css-text").text();

    this.add("addToCart", { innerHTML: $.str.format(format, addToCartText),
                            disabled: false })
        .add("preOrder", { innerHTML: $.str.format(format, addToCartText),
                           disabled: false})
        .add("processing", { innerHTML: $.str.format(format, "Adding"),
                             disabled: true,
                             className: "css-processing"})
        .add("added", {innerHTML: $.str.format(format, "Item in cart"),
                       disabled: true,
                       className: "css-complete"})
        .add("disabled", {innerHTML: $.str.format(format, "Disabled"),
                          disabled: true,
                          className: "css-complete"});
}
bby.cart.views.forms.addToCartButton.prototype = {
    addToCart: function(){ this.state("addToCart"); return this; },
    preOrder: function(){ this.state("preOrder"); return this; },
    processing: function(){ this.state("processing"); return this; },
    added: function(){ this.state("added"); return this; },
    disabled: function(){ this.state("disabled"); return this; }
}
$.ext(bby.cart.views.forms.addToCartButton,
      bby.infrastructure.widgets.statefulElement);

//-- END OF LINE 72 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/forms/addToCartButton.js"
 
//-- START OF LINE 74 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/forms/product.js"
bby.cart.views.forms.product = function(skuDom,
                                        quantityDom){
    
    bby.cart.views.forms.product.base.call(this);
    this._skuDom = skuDom;
    this._quantityDom = quantityDom;
}
bby.cart.views.forms.product.prototype = {
    read: function(){
        return $.dto()
            .add("catalogRefId", $.str.trim($(this._skuDom).val()))
            .add("tempQuantity", $.str.trim($(this._quantityDom).val()));
    }
}
$.ext(bby.cart.views.forms.product, $.Class);
//-- END OF LINE 74 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/forms/product.js"
//-- START OF LINE 75 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/abstractState.js"
bby.cart.views.states.abstractState = function(namespace){
    bby.cart.views.states.abstractState.base.call(this, namespace);
}

bby.cart.views.states.abstractState.prototype = {
    addToCart: function(){ return; },
    removeFromCart: function(){ return; },
    process: function(){ return; },
    shop: function() { return; },
    shopAccessories: function(){ return; },
	viewPrice: function(){ return; },
    error: function(){ return; }
}
$.ext(bby.cart.views.states.abstractState, $.abstractState);

//-- END OF LINE 75 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/abstractState.js"
 
//-- START OF LINE 77 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/shopping.js"
bby.cart.views.states.shopping = function() {
    bby.cart.views.states.shopping.base.call(this, bby.cart.views.states);
}
bby.cart.views.states.shopping.prototype = {
    process: function(){
        var processing = $.create({
            div:{"class":"bby-addToCart-processing css-addToCart-processing"},
            content: $.create({ div: {"class":"css-processing"}, content:"Adding to cart..."})});
        document.body.appendChild(processing);
    },
    addToCart: function(response){
        $(".css-displayMessage").addClass("css-hide");
        $(".cart-items").find("strong").html($.str.format("{0} Items", response.quantity()));
        $(".cart-items").html(response.quantity());
    },
    shopAccessories: function(response){
        this.context().accessoriesView().show(response);
        //IE padding fix
        $(".css-accessory:last-child").css({padding:"0"});
        if(!response.isICR) {
      		this.state("shoppingAccessories");
        }
    },
	viewPrice: function(response){
		this.context().viewPriceView().show(response);
		this.state("viewingPrice");
	},
    error: function(response){
	    try { document.body.removeChild($(".bby-addToCart-processing")[0]); }
        catch(e){/*Fail silently*/}

		if(!response) return this;
		var error = response.error();

		if(!error) return this;
        $(".css-displayMessage").removeClass("css-hide").addClass("css-error");
        $(".css-displayMessage .css-text").html(error.message());
		return this;
    }
}
$.ext(bby.cart.views.states.shopping,
      bby.cart.views.states.abstractState);

//-- END OF LINE 77 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/shopping.js"
 
//-- START OF LINE 79 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/shoppingAccessories.js"
bby.cart.views.states.shoppingAccessories = function(){
    bby.cart.views.states.shoppingAccessories.base.call(this, bby.cart.views.states);
}
bby.cart.views.states.shoppingAccessories.prototype = {
    addToCart: function(response) {
        $(".css-displayMessage").addClass("css-hide");
        $(".cart-items").find("strong").html($.str.format("{0} Items", response.quantity()));
        $(".cart-items").html(response.quantity());
        $(".css-lightboxContent .css-displayMessage").removeClass("css-error");

        this.togglePspButton(response._product.skuId);
        
        this.context().accessoriesView()
            .addPrice(response.product().salePrice)
            .addToCart(response);
        
        this.checkPspSwap(response.messageKey());
    },
	process: function(caller, product){
        this.context().accessoriesView().process(caller, product);
    },
    shop: function(){
        this.context().accessoriesView().close();
        this.state("shopping");
    },
    togglePspButton: function(button_skuId){
    	var ths = this;
    	$(".js-cpt-pspAddToCartButton").each(function()
    		{	if (this.getAttribute("data-sku") == button_skuId)
    			{	if ($(".js-cpt-pspAddToCartButton.css-complete").length) {
			        	var old_psp_button = $(".js-cpt-pspAddToCartButton.css-complete")[0];
			        	ths.context().accessoriesView()
			            .subtractPrice(old_psp_button.getAttribute("data-price"));
			        	// commenting the below lines since the Add To Cart button is changed to Option - Cross Browser Issue in IE
			        	// old_psp_button.innerHTML = '<div class="css-image"></div><span class="css-text">Add To Cart</div>';
			        	// old_psp_button.disabled = false;
			        	 $(old_psp_button).removeClass("css-complete");			    		
			    	}
    				return;
    			}
    		});
    	 $('input[name=addToCart]:radio:checked').addClass("css-complete");
    },
    checkPspSwap: function(msgKey){
    	if (msgKey && msgKey == "pspReplace") {
    		$(".css-lightboxContent .css-displayMessage .css-text").html("<b>You&#39;ve changed your protection plan. Take a quick look to be sure you&#39;ve got the one you want.</b>");
			$(".css-lightboxContent .css-displayMessage").removeClass("css-hide").addClass("css-notification");  
			if (trackEvent && trackEvent.api) {
				trackEvent.api.trackErrorCodes("SwitchedPSPLB", "Add To Cart", "click", "lbox");
			}
    	}
    },
    onPspSelectionSwap: function(newSelectionSkuId, originalSelectedSkuId) { //originalSelectedSkuId should be the skuId that was selected when the lightbox was opened
        var $lightbox                 = $("#cboxLoadedContent");
        var $pspTab                   = $lightbox.find(".css-cabTab-ProtectIt+.css-tabbed-category");
        var $currentSelectedPlanRadio = $pspTab.find(".js-cpt-pspAddToCartButton.css-complete");
        var $pspAddToCartButton       = $pspTab.find(".css-addSelectionToCart > button");
        var $pspAddToCartButtonLabel  = $pspAddToCartButton.find("> span.css-text");

        var currentInCartSkuId;
        if ($currentSelectedPlanRadio.length) {
            currentInCartSkuId = $currentSelectedPlanRadio.data("sku");
        } else if(originalSelectedSkuId != null) {
            currentInCartSkuId = originalSelectedSkuId
        }

        if (currentInCartSkuId == newSelectionSkuId) {
            $pspAddToCartButtonLabel.html("ITEM IN CART");
            $pspAddToCartButton.attr("disabled", "disabled");
            $pspAddToCartButton.addClass("css-complete");
        } else {
            $pspAddToCartButtonLabel.html("ADD SELECTION TO CART");
            $pspAddToCartButton.removeAttr("disabled");
            $pspAddToCartButton.removeClass("css-complete");
        }
    },
    error: function(response) {

		if(!response) return this;
		var view = this.context().accessoriesView();
		var	product = response.product();
		var	error = response.error();

		if(!error) return this;
        $(".css-lightboxContent .css-displayMessage .css-text").html(error.message());
        $(".css-lightboxContent .css-displayMessage").removeClass("css-notification").removeClass("css-hide").addClass("css-error");

        if(error.isRetry()) view.tryAgain(product);
        else view.addToCart(product);

		return this;
    }
}
$.ext(bby.cart.views.states.shoppingAccessories,
      bby.cart.views.states.abstractState);

//-- END OF LINE 79 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/shoppingAccessories.js"
 
//-- START OF LINE 81 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/viewingPrice.js"
bby.cart.views.states.viewingPrice = function() {
    bby.cart.views.states.viewingPrice.base.call(this, bby.cart.views.states);
}
bby.cart.views.states.viewingPrice.prototype = {
    process: function(){
        /*TODO: Button processing*/
		return;
    },
    addToCart: function(response){
        $(".css-displayMessage").addClass("css-hide");
        $(".cart-items").find("strong").html($.str.format("{0} Items", response.quantity()));
    },
	removeFromCart: function(){
        this.context().viewPriceView().close();
        this.state("shopping");
	},
    shop: function(){
        this.context().viewPriceView().close();
        this.state("shopping");
	},
    shopAccessories: function(response){
        this.context().accessoriesView().show(response);
        try { document.body.removeChild($(".bby-addToCart-processing")[0]); }
        catch(e){/*Fail silently*/}
        //IE padding fix
        $(".css-accessory:last-child").css({padding:"0"});

		this.state("shoppingAccessories");
    },
    error: function(response){
		if(!response) return this;

		var error = response.error();
		if(!error) {
			this.shop();
			return this;
		}
        $(".css-lightboxContent .css-displayMessage .css-text").html(error.message());
        $(".css-lightboxContent .css-displayMessage").removeClass("css-hide").addClass("css-error");

		return this;
    }
}
$.ext(bby.cart.views.states.viewingPrice,
      bby.cart.views.states.abstractState);

//-- END OF LINE 81 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/viewingPrice.js"
 
//-- START OF LINE 83 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/checkout/shopping.js"
bby.cart.views.states.checkout.shopping = function(){
    bby.cart.views.states.checkout.shopping
		.base.call(this, bby.cart.views.states.checkout);
}

bby.cart.views.states.checkout.shopping.prototype = {
    shopAccessories: function(response){
        this.context().accessoriesView().show(response);

        $(".css-lightboxContent .css-displayMessage").addClass("css-hide");
        $(".css-lightboxHeader .css-title").addClass("css-hide");

        //IE padding fix
        $(".css-accessory:last-child").css({padding:"0"});

        this.state("shoppingAccessories");
    },
    error: function(response) {
        var error = response.error();
        $(".css-lightboxContent .css-displayMessage .css-text").html(error.message());
        $(".css-lightboxContent .css-displayMessage").removeClass("css-hide").addClass("css-error");

        if(error.isRetry())
            $(caller).find("+.bby-alertMessage").html("Please try again").show();

        //TODO: This method needs to take a response NOT an error and pass the product to the view method
        this.context().accessoriesView().addToCart(response.product());
    }
}
$.ext(bby.cart.views.states.checkout.shopping,
      bby.cart.views.states.abstractState);

//-- END OF LINE 83 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/checkout/shopping.js"
 
//-- START OF LINE 85 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/checkout/shoppingAccessories.js"
bby.cart.views.states.checkout.shoppingAccessories = function(){
    bby.cart.views.states.checkout.shoppingAccessories
		.base.call(this, bby.cart.views.states.checkout);
}
bby.cart.views.states.checkout.shoppingAccessories.prototype = {
    shop: function(){ location.reload(); }
}
$.ext(bby.cart.views.states.checkout.shoppingAccessories,
      bby.cart.views.states.shoppingAccessories);

//-- END OF LINE 85 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/checkout/shoppingAccessories.js"
 
//-- START OF LINE 87 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/expressLane/shopping.js"
bby.cart.views.states.expressLane.shopping = function() {
    bby.cart.views.states.expressLane.shopping
		.base.call(this, bby.cart.views.states.expressLane);
}
bby.cart.views.states.expressLane.shopping.prototype = {
    addToCart: function(response){
        if(!response.hasAccessories()) location.reload();
    },
    error: function(response){
		$(".css-displayMessage").removeClass("css-hide").addClass("css-error");
		location.reload();
    }
}
$.ext(bby.cart.views.states.expressLane.shopping,
      bby.cart.views.states.shopping );

//-- END OF LINE 87 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/expressLane/shopping.js"
 
//-- START OF LINE 89 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/expressLane/shoppingAccessories.js"
bby.cart.views.states.expressLane.shoppingAccessories = function(){
    bby.cart.views.states.expressLane.shoppingAccessories
		.base.call(this, bby.cart.views.states.expressLane);
}
bby.cart.views.states.expressLane.shoppingAccessories.prototype = {
    shop: function(){ location.reload(); }
}
$.ext(bby.cart.views.states.expressLane.shoppingAccessories,
      bby.cart.views.states.shoppingAccessories);

//-- END OF LINE 89 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/expressLane/shoppingAccessories.js"
 
//-- START OF LINE 91 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/store/shopping.js"
bby.cart.views.states.store.shopping = function() {
    bby.cart.views.states.store.shopping
		.base.call(this, bby.cart.views.states.store);
}
bby.cart.views.states.store.shopping.prototype = {
	error: function(response){
	    try { document.body.removeChild($(".bby-addToCart-processing")[0]); }
        catch(e){/*Fail silently*/}

		var error = response.error();
        $(".css-displayMessage").removeClass("css-hide").addClass("css-error");
        $(".css-displayMessage .css-text").html(error.message());


		var storeId = error.storeId();
		if(!(error.isSts() && $.exists(storeId))) return;

		var storeFormat = "tr[data-storeid={0}]",
			storeQuery = $.str.format(storeFormat, storeId),
			store = $(storeQuery),
			setNaMessage = function(query){
				store.find(query).html("<strong>UNAVAILABLE</strong>");
			};

		setNaMessage(".bby-availstatus-description");
		setNaMessage(".bby-btn-description");
    }
}
$.ext(bby.cart.views.states.store.shopping,
      bby.cart.views.states.shopping );

//-- END OF LINE 91 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/store/shopping.js"
 
//-- START OF LINE 93 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/store/shoppingAccessories.js"
bby.cart.views.states.store.shoppingAccessories = function(){
    bby.cart.views.states.store.shoppingAccessories
		.base.call(this, bby.cart.views.states.store);
}
bby.cart.views.states.store.shoppingAccessories.prototype = { }
$.ext(bby.cart.views.states.store.shoppingAccessories,
      bby.cart.views.states.shoppingAccessories);

//-- END OF LINE 93 - INCLUDED FROM: "src/projects/commerce/scripts/dev/projects/cart/scripts/views/states/store/shoppingAccessories.js"
 
