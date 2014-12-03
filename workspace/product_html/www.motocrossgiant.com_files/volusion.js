var volusion = (function ($) {
    var volusionDocReadyMethods = [],
        currentCartCount;

    function itemCount(count) {
        if (count === undefined) {
            return currentCartCount;
        } else {
            currentCartCount = count;
            $("[data-v-observable='cart-count']").text(count);
            return count;
        }
    }

    function isObservingCount() {
        return $("[data-v-observable='cart-count']").length > 0;
    }

    function volusionDocReady(callback) {
        volusionDocReadyMethods.push(callback);
    }

    function cartAnchor() {
        return $("[data-v-anchor='cart']");
    }

    function hasCartAnchor() {
        return $("[data-v-anchor='cart']").length > 0;
    }

    function init() {
    	$.each(volusionDocReadyMethods, function (index, volusionDocReadyMethod) {
    		volusionDocReadyMethod();
    	});
    }

    $(function () {
        init();
    });

    return {
        ready: volusionDocReady,
        cart: {
            itemCount: itemCount,
            isObservingCount: isObservingCount,
            anchor: cartAnchor,
            hasAnchor: hasCartAnchor
        }
    };
} (jQuery));