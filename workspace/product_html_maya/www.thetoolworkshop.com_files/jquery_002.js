var productHistory = new function () {
    this.isUserLoggedIn = null;
    this.productList = new Array();
    var self = this;
    this.currencySymbol = '$';

    this.addToList = function (productDetails) {
        //If the product is in the history already, delete it and add it to the first place
        var exists = this.removeIfExists(productDetails);

        this.productList.unshift(productDetails);

        //if there are more than 5 products, remove the last one
        if (this.productList.length > 5) {
            this.productList.pop();
        }
        
        return exists;
    }

    this.addToHistory = function(productDetails) {
        var exists = this.addToList(productDetails);

        if (!exists && this.isUserLoggedIn && !productDetails.isSaved) {
            ns$.ajax({
                url: '/api/1.0/Product/index.aspx?historyProductIds=' + productDetails.id,
                type: "POST",
                data: { postData: '{}' },
                contentType: "application/json;charset=utf-8",
            });

            productDetails.isSaved = true;
        }

        ns$.jStorage.set("productHistory", this.productList);
    }

    this.removeIfExists = function(productDetails) {
        var result = ns$.grep(this.productList, function (e) { return e.id == productDetails.id; });
        if (result.length == 0) return false;
        productDetails.isSaved = result[0].isSaved;
        this.productList.splice(this.productList.indexOf(result[0]), 1);
        return true;
    }

    this.isUserAuthenticated = function() {
        if (this.isUserLoggedIn == null) {
            this.isUserLoggedIn = (ns$(".product-history-isUserLoggedIn").first().val() == "True");
        }
        return this.isUserLoggedIn;
    }

    this.retrieveProductHistory = function () {
        if (this.isUserAuthenticated()) {
            this.syncClientHistory();
        }
        else {
            this.getLocalHistory();
        }
        if (!this.productList) this.productList = new Array();
    }
    
    this.renderProductHistory = function (amount, sender) {
        if (this.productList.length > 0)
            var maxItems;

        if (amount > this.productList.length)
            maxItems = this.productList.length;
        else
            maxItems = amount;
        $sender = ns$("#" + sender);

        if (maxItems > 0) {
            $("#" + sender).closest(".product-history-module-container").show();
        }

        for (i = 0; i < maxItems; i++) {
            var showPrice = ($sender.find(".product-history-showprice").val() == "True");
            var showThumb = ($sender.find(".product-history-showthumb").val() == "True");
            this.currencySymbol = ($sender.find(".product-history-currency").val());

            var productHistoryLayout = '<div class="featured-products-item">' +
                '<a href="' + this.productList[i].url + '">' + this.productList[i].name + '</a>'

            if (showThumb && !this.productList[i].img == '') {
                productHistoryLayout = productHistoryLayout +
                                        '<div class="featured-products-item-img"><a href="' + this.productList[i].url + '">' +
                                        '<img src="' + this.productList[i].img + '"/></a></div>'
            }

            if (showPrice) {
                productHistoryLayout = productHistoryLayout + '<div class="featured-products-item-price">' +  this.productList[i].price + '</div>'
            }

            productHistoryLayout = productHistoryLayout + '</div>'

            $sender.append(productHistoryLayout);
        }
    }

    this.syncClientHistory = function() {
        this.getLocalHistory();

        if (!this.productList) {
            this.getServerHistory('');
        } else {
            var result = ns$.grep(this.productList, function (e) { return e.isSaved == false; });

            if (result.length > 0) {
                var ProductIds = '';

                for (i = 0; i < result.length; i++) {
                    ProductIds = ProductIds + result[i].id + ',';
                }

                ProductIds = ProductIds.substring(0, ProductIds.length - 1)

                this.getServerHistory(ProductIds);
            }
        }
    }

    this.getLocalHistory = function() {
        this.productList = ns$.jStorage.get("productHistory");
    }

    this.getServerHistory = function(productIds) {
        ns$.ajax({
            url: '/api/1.0/Product/index.aspx?historyProductIds=' + productIds,
            type: "POST",
            data: { postData: '{}' },
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                for (i = 0; i < data.length; i++) {
                    var productDetails = {};
                    productDetails.id = data[i]._id;
                    productDetails.url = data[i]._virtualUrl.replace('~', '');
                    if (data[i]._imageGallery) {
                        if(data[i]._imageGallery.length >= 1) productDetails.img = data[i]._imageGallery[0]._thumbnailImage._path;
                    }
                    else {
                        productDetails.img = '';
                    }
                    productDetails.name = data[i]._name;
                    productDetails.price = self.currencySymbol + data[i]['<SalePrice>k__BackingField'];
                    productDetails.isAuthenticated = "True";
                    productDetails.isSaved = true;

                    self.addToList(productDetails);
                }
                ns$.jStorage.set("productHistory", self.productList);
            }

        });
    }

    this.HistoryActionQueue = new Array();

    this.execute_queue = function () {
        for (var i in this.HistoryActionQueue) this.HistoryActionQueue[i].call(null);
    }

    this.saveToHTPPS = function () {
        var win = ns$(".httpsHistoryiframe").first()[0].contentWindow;
        var siteSecureUrl = ns$(".httpsHistoryiframe").attr("sitesecureurl");
            win.postMessage(
                    self.productList,
                    siteSecureUrl
            );
        win
        }

    
    ns$(document).ready(function () {
        self.retrieveProductHistory();

        self.execute_queue();
        ns$('.httpsHistoryiframe').load(function () {
            self.saveToHTPPS();
        });
        

    });
}