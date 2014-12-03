function GlobalCart(options) {
    this.state = { contentId: options.contentId, cartItems: options.cartItems };
    this.timerId = 0;
    // Initial render
    this.render();
}
GlobalCart.prototype.update = function (cartItems) {
    this.state.cartItems = cartItems;
    this.render();
}
GlobalCart.prototype.renderDropDown = function () {
    var htmlBuffer = new StringBuffer();

    htmlBuffer.append('<div id="global-cart-dropdown">');

    htmlBuffer.append('<div class="top"></div>');

    htmlBuffer.append('<div class="fill">');

    htmlBuffer.append('<table>');
    htmlBuffer.append('<thead><tr><td colspan="2">&nbsp;</td><td class="qty">QTY</td></tr></thead>');

    htmlBuffer.append('<tbody>');

    for (var i = 0; i < this.state.cartItems.Items.length; i++) {
        var item = this.state.cartItems.Items[i];

        htmlBuffer.append('<tr>');

        htmlBuffer.append('<td class="image"><img alt="" src="' + item.Picture + '" width="40" height="40" /></td>');
        htmlBuffer.append('<td class="name">');

        if (item.Price != item.PromoPrice) {
            htmlBuffer.appendWithTrim(item.Name, 18);
        }
        else {
            htmlBuffer.append('<a href="' + baseUrl + '/product/' + item.Slug + '">');
            htmlBuffer.appendWithTrim(item.Name, 18);
            htmlBuffer.append('</a>');
        }

        htmlBuffer.append('<br /><span>$' + item.Price.toFixed(2) + '</span></td>');
        htmlBuffer.append('<td class="qty">' + item.Quantity + '</td>');

        htmlBuffer.append('</tr>');
    }
    htmlBuffer.append('</tbody>');
    htmlBuffer.append('</table>');

    htmlBuffer.append('<div class="totals clearfix">');
    htmlBuffer.append('<div class="label">Total</div>');
    htmlBuffer.append('<div class="total">$' + this.state.cartItems.Total.toFixed(2) + '</div>');
    htmlBuffer.append('</div>');

    htmlBuffer.append('<div class="links">');
    htmlBuffer.append('<a href="' + baseUrl + '/cart">VIEW CART</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="'+baseUrl+'/cart/checkout">CHECKOUT</a>');
    htmlBuffer.append('</div>');

    htmlBuffer.append('</div>');

    htmlBuffer.append('<div class="bottom"></div>');
    htmlBuffer.append('</div>');

    return htmlBuffer.toString();
}
GlobalCart.prototype.render = function () {
    var htmlBuffer = new StringBuffer();
    if (this.state.cartItems.Quantity == 0) {
        htmlBuffer.append('<p class="empty">your cart<br/>is empty</p>');
    }
    else {
        htmlBuffer.append('<p>my cart</p>');
        htmlBuffer.append('<table class="totals"><tr>');
        htmlBuffer.append('<td class="price">$' + this.state.cartItems.Total.toFixed(2) + '</td>');
        htmlBuffer.append('<td class="left"></td>');
        htmlBuffer.append('<td class="fill">' + this.state.cartItems.Quantity + '</td>');
        htmlBuffer.append('<td class="right"></td>');
        htmlBuffer.append('</tr></table>');
        htmlBuffer.append(this.renderDropDown());
    }
    $(this.state.contentId).html(htmlBuffer.toString());

    $(this.state.contentId).bind("mouseenter", { self: this }, function (e) {
        clearTimeout(e.data.self.timerId);
        e.data.self.timerId = setTimeout('new GlobalCartDropDown()', 500);
    });
    $(this.state.contentId).bind("mouseleave", { self: this }, function (e) {
        clearTimeout(e.data.self.timerId);
    });
}
function GlobalCartDropDown() {
    $("#global-cart-dropdown").fadeIn('slow');
    this.timerId = setTimeout('$("#global-cart-dropdown").fadeOut("slow")', 3000);

    $("#global-cart-dropdown").bind("mouseenter", { self: this }, function (e) {
        clearTimeout(e.data.self.timerId);
    });
    $("#global-cart-dropdown").bind("mouseleave", { self: this }, function (e) {
        e.data.self.timerId = setTimeout('$("#global-cart-dropdown").fadeOut("false")', 1000);
    });
}
