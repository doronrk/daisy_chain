
$(document).ready(function() {
	
    $("a[id*='viewLargerLink']").click(function() {
        window.open('/agshop/html/view_larger.html','ViewLargerWindow','width=500,height=500,left=200,top=100');
        return false;
    });
	
	
    $("a.addToBagButton").click(function() {

        var itemIdArray = [getItemId()];
        var clientTypeCode = common.getClientTypeCodeForProductPage();

        common.callAddToBag(itemIdArray, clientTypeCode, common.getQuickSellItemId(), new common.ProductPageAddToBagCallback());

        return false;
    });

    $('a#addToGiftRegistryLink').click(function() {
        var itemIdArray = getItemIdsForWishListOrGiftRegistry();
        common.addToGiftRegistryOrOpenPopup(itemIdArray);
        return false;
    });

    $('a#addToWishListLink').click(function() {
        addToWishListLinkHandler();
        return false;
    });

});

function getItemIdsForWishListOrGiftRegistry() {
    var itemId = getItemId();
    var quickSellId = common.getQuickSellItemId();

    var itemIdArray = [];

    if (itemId) itemIdArray.push(itemId);
    if (quickSellId) itemIdArray.push(quickSellId);

    return itemIdArray;
}

function getItemId() {
    var itemId = $('form.addToBagData > input[name=id]').val();
    return itemId;
}

function addToWishListLinkHandler() {
    var itemIdArray = getItemIdsForWishListOrGiftRegistry();
    common.addToWishList(itemIdArray);
}
