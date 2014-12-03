var cartTipStyle = [
  '<style>',
  '.cart-link {',
  '  position:relative;',
  '}',
  '.cart-link .tooltip .message {',
  '  background: #151F29;',
  '  text-align: center; ',
  '  border-radius: .5em;',
  '  font-style: italic;',
  '  font-weight: bold;',
  '  line-height: 1.35em;',
  '  box-shadow:.1em .1em .05em rgba(0,0,0,0.2);',
  '  color:white;',
  '  font-size:12px;',
  '  width:250px;',
  '  padding:.6em 1.3em;',
  '  display:block;',
  '  position:relative;',
  '  z-index:1;',
  '  float:right;',
  '  margin:7px 3px 0 0;',
  '  opacity:0;',
  '  -webkit-transition:opacity .4s, margin .3s;',
  '  transition:opacity .4s, margin .3s;',
  '  -webkit-transition-delay:.5s;',
  '  transition-delay:.5s;',
  '}',
  '.cart-link .tooltip {',
  '  height:0; ',
  '  width:0; ',
  '  overflow:hidden;',
  '  position: absolute;',
  '  right: -24px;',
  '  top: 25px;',
  '  /*border:1px solid red;*/',
  '  -webkit-transition:height 0, width 0;',
  '  transition:height 0, width 0;',
  '  -webkit-transition-delay:.7s;',
  '  transition-delay:.7s;',
  '}',
  '.cart-link .tooltip a {',
  '  color:inherit;',
  '}',
  '.cart-link a:hover + .tooltip,',
  '.cart-link a + .tooltip:hover,',
  '.cart-link.showTip .tooltip {',
  '  height:50px;',
  '  width:290px;',
  '  overflow:visible;',
  '  -webkit-transition-delay:0;',
  '  transition-delay:0;',
  '}',
  '.cart-link a:hover + .tooltip .message,',
  '.cart-link a + .tooltip:hover .message,',
  '.cart-link.showTip .tooltip .message {',
  '  opacity:1;',
  '  margin-top:13px;',
  '  -webkit-transition-delay:0;',
  '  transition-delay:0;',
  '}',
  '/* Tooltip Arrow */',
  '.cart-link .tooltip .message:before {',
  '  content:"";',
  '  position:absolute;',
  '  right:30px;',
  '  top:-7px;',
  '  border-width:8px 8px;',
  '  border-color:#151F29 transparent;',
  '  border-style:solid;',
  '  border-top:none;',
  '}',
  '.lt-ie8 .cart-link .tooltip {',
  '  display:none;',
  '}',
  '</style>'
].join('');

var remaining = ($.cookie('CART_RemainingTo75') === null) ? false : parseInt($.cookie('CART_RemainingTo75'));
var printMessage = function (msg) {
  if(remaining !== false) {
    $('#TopMargin .cart-link').append('<span id="freeShippingTooltip" class="tooltip"><span class="message">'+msg+'</span></span>');
    $('head').append(cartTipStyle);
  }
}


if(remaining <= 0) {
    printMessage('Nice! You\'ve qualified for Free Shipping!');
    $('.cart-hdrBG').first().append("<div style=\"font-style: italic; font-size: 1.4em; font-weight: 500; color: #555; font-family: Archer, 'Trebuchet MS', Sans; margin: 0.1em 0px 1em;\">+ you get Free Shipping on this order!</div>");
} else if (remaining <= 20) {
    printMessage('You\'re just $' + remaining + ' away from free shipping!');
}


if(/cart/i.test(document.referrer) && !/cart/i.test(document.location) ){
  window.setTimeout(function(){
    $('.cart-link').addClass('showTip');
    window.setTimeout(function(){
      $('.cart-link').removeClass('showTip');
    },2000);
  },300);
}