//member area functions. jquery alternative for subscriptions.js
//jQuery version of maToggleOrder
jQuery(document).ready(function () {
    jQuery('.SubGridOrderItems').first().css('display', 'block');
    jQuery('.SubGridOrderImage').first().attr("src","/images/subscriptions/toggle_minus.png");
    
    
});
function maToggleOrder(orderID) {
    jQuery('#SubGridOrderItems_' + orderID).children('.SubGridOrderItems').toggle('blind', 500);
    if (document.getElementById('SubGridOrderImage_' + orderID).src.indexOf("toggle_minus.png") > 0) {
        document.getElementById('SubGridOrderImage_' + orderID).src = "/images/subscriptions/toggle_plus.png";
    }
    else {
        document.getElementById('SubGridOrderImage_' + orderID).src = "/images/subscriptions/toggle_minus.png";
    }
}
//jQuery version of maReorder
function maReorder(reorderCommand, orderID) {
    if (reorderCommand.length == 0) { alert('There was an error processing your reorder.  Please check with the system administrator.'); }
    else {
        jQuery.ajax({
            url: '/Member/Reorder.aspx?c=' + reorderCommand,
            error: function (transport) {
                alert('There was an error processing your reorder.  Please check with the system administrator.');
            },
            success: function (transport) {
                document.location = '/preorderform.asp';
            }
        });
    }
}