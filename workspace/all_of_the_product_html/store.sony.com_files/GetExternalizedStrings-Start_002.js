
(function($){
$.extend(KOR.namespace('KOR.extStrings.strings'), {

"fieldFailureMessageLettersMin":

"This field has a minimum required length of {{}} letters"
, 
"fieldFailureMessageZipcode.CA":

"Please enter a valid Canadian ZIP Code (including the whitespace)"
, 
"fieldFailureMessageCharactersRange":

"This field must be between {{}} and {{}} characters"
, 
"fieldFailureMessageDefault":

"Quantity cannot be empty"
, 
"fieldFailureMessageZipcode.GB":

"Please enter a valid UK ZIP Code (including the whitespace)"
, 
"fieldFailureMessageCharactersExact":

"This field must be exactly {{}} characters"
, 
"fieldFailureMessageZipcode.CH":

"Please enter a valid 4-digit ZIP Code"
, 
"fieldFailureMessageQuantityRange":

"This field must be between {{}} and {{}}"
, 
"fieldFailureMessageNumbersExact":

"This field must be exactly {{}} numbers"
, 
"fieldFailureMessageQuantityMin":

"This item has a minimum quantity requirement of {{}}. Please adjust your quantity."
, 
"fieldFailureMessageGlobal":

"There was a problem with something you entered below.  Please check the information below and try again."
, 
"fieldFailureMessageDateRequired":

"A valid Date is required"
, 
"fieldFailureMessagePassword":

"Your password must contain at least 1 letter and 1 number with no spaces."
, 
"fieldFailureMessageRequired":

"This field is required"
, 
"fieldFailureMessageLetters":

"This field must contain only letters"
, 
"fieldFailureMessageQuantityMax":

"This item has a maximum quantity requirement of {{}}. Please adjust your quantity."
, 
"fieldFailureMessageNumbersMin":

"This field has a minimum required length of {{}} numbers"
, 
"fieldFailureMessageCharactersMin":

"This field has a minimum required length of {{}} characters"
, 
"fieldFailureMessageQuantity":

"This field must contain only numbers"
, 
"fieldFailureMessageInvalid":

"This field must be valid"
, 
"fieldFailureMessageNumbersRange":

"This field must be between }} and {{ numbers"
, 
"fieldFailureMessageCharactersMax":

"This field can have a maximum of {{}} characters"
, 
"fieldFailureMessageLettersExact":

"This field must be exactly {{}} letters"
, 
"fieldFailureMessageMatchValue":

"This field must match"
, 
"fieldFailureMessageNumbers":

"This field must contain only numbers"
, 
"fieldFailureMessageLettersRange":

"This field must be between }} and {{ characters"
, 
"fieldFailureMessageZipcode.DE":

"Please enter a valid 5-digit ZIP Code"
, 
"fieldFailureMessagePrice":

"This field must be a valid price"
, 
"fieldFailureMessageNumbersMax":

"This field can have a maximum of {{}} numbers"
, 
"fieldFailureMessageCreditCard":

"This field must be a valid credit card"
, 
"fieldFailureMessageEmail":

"Please enter a valid email address"
, 
"fieldFailureMessageCharacters":

"This field must contain only characters"
, 
"fieldFailureMessageZipcode":

"Please enter a valid ZIP Code"
, 
"fieldFailureMessageLettersMax":

"This field can have a maximum of {{}} letters"
, 
"fieldFailureMessageWords":

"This field must only contain words"
, 
"fieldFailureMessagePhoneNumber":

"Please enter a valid phone number. It may contain digits, spaces and ()-. symbols."
, 
"fieldFailureMessageQuantityExact":

"This field must be exactly {{}}"
, 
"fieldFailureMessageZipcode.AT":

"Please enter a valid 4-digit ZIP Code"

})
KOR.templates = KOR.templates || {};

$.extend(KOR.templates, {
giftcardDenominationTemplate: '\
{% var s = this.currencySymbol; %}\
{% $.each(this.denominationRange, function(i, v) { %}\
{% if(v) { %}\
<option value="{{ v }}">{{ s }}{{ v }}</option>\
{% } %}\
{% }); %}\
',
ariaBreadcrumbsTemplate: '<h1 role="application" class="{{this.ariaTableLinkClass}}" tabindex="0" title="{{this.ariaTableSummary}}">{{this.ariaTableContent}}</h1>',
inlineZoomOverlayTemplate: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="{{this.overlayClass}}">\
<div class="{{this.overlayContentClass}}">{{this.html}}</div>\
</div>',
productAltImagesTemplate: '{% if(this.images && this.images.length >= 1) { %}\
<ul class="ws-alternate-views-list">\
{% this.images.uEach(function(image){ %}\
<li class="ws-alternate-views-list-item">\
<a class="ws-alternate-views-list-link" href="javascript:void(false)"><img class="photo ws-alternate" {% if (image.height || image.imageTypeHeight){%}height="{{image.height || image.imageTypeHeight}}"{%}%} {% if (image.width || image.imageTypeWidth){%}width="{{image.width || image.imageTypeWidth}}"{%}%} data-view-value="{{image.view}}" data-type="{{image.size}}" src="{{image.src}}" /></a>\
</li>\
{% }) %}\
</ul>\
{% } %}',
productListPriceTemplate: '<span>\
{% if(this.list) { %}\
{% if(this.sale) { %}Regularly {% } %}\
<span class="kor-product-list-price-value price\
{% if (!this.sale) { %} kor-product-final-price{% } %}">\
{% if(this.list.min && this.list.max) { %}\
{{this.list.min}} - {{this.list.max}}\
{% } else if (this.list.regular) { %}\
{{this.list.regular}}\
{% } %}\
</span>\
{% } %}\
</span>',
productSalePriceTemplate: '<span class="ws-sale-price-lower">{% if(this.sale) { %}Now  \
{% if(this.sale.min && this.sale.max) { %}\
{{this.sale.min}} - {{this.sale.max}}\
{% } else if (this.sale.regular) { %}\
{{this.sale.regular}}\
{% } %}\
{% } %}</span>',
productSaleAsListPriceTemplate: '<span>{% if(this.sale) { %}\
{% if(this.sale.min && this.sale.max) { %}\
{{this.sale.min}} - {{this.sale.max}}\
{% } else if (this.sale.regular) { %}\
{{this.sale.regular}}\
{% } %}\
{% } %}</span>',
productEnhancedImageLinkTemplate: '{% if(this.image) { %}\
<a class="kor-enhanced-image-link" href="{{this.image.src}}">Enhanced Image</a>\
{% } %}',
validationErrorTemplate: '<div class="{{this.errorClass}}">\
<div class="kor-field-error-message-contents">\
<ul class="kor-field-error-list">\
<li class="kor-field-error-list-item">{{this.errorMessage}}</li>\
</ul>\
</div>\
</div>',
flashErrorTemplate: '<div class="kor-form-error-message">\
<div class="kor-form-error-message-contents">\
<ul class="kor-form-error-list">\
{% $.each(this.errorList, function(i,v){ %} \
<li class="kor-form-error-list-item">{{ v }}</li>\
{% }) %} \
</ul>\
</div>\
</div>',
inputsTemplate: '<input type="hidden" name="{{this.name}}" value="{{this.value}}" />\
<input type="hidden" name="SKU" value="{{this.value2}}" />\
',
modalTemplate: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="{{this.modalClass}}"></div>',
overlayTemplate: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="{{this.overlayClass}} kor-{{this.NAME}} {{this.surroundClass}}" role="alert">{{this.html}}</div>',
tipOverlayTemplate: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="{{this.overlayClass}} kor-{{this.NAME}} {{this.surroundClass}}" role="tooltip">{{this.html}}</div>',
overlayImageTemplate: '<img src="{{this.url}}" />',
menuOverlayTemplate: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="{{this.overlayClass}}" role="alert" >\
<div class="{{this.overlayHeaderClass}}">\
<div class="{{this.closeClass}}" tabindex="0">close</div>\
</div>\
<div class="{{this.overlayContentClass}}">{{this.html}}</div>\
</div>',
arrowTipOverlayTemplate: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="{{this.overlayClass}} kor-{{this.NAME}}" role="tooltip">\
<div class="kor-arrow-overlay-content">{{this.html}}</div>\
<div class="{{this.arrowClass}}"></div>\
</div>',
dialogOverlayTemplate: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="{{this.overlayClass}}" role="alert">\
<div class="{{this.overlayHeaderClass}}">\
<div class="kor-header-contents">\
<div class="{{this.closeClass}} kor-control" tabindex="0">close</div>\
</div>\
</div>\
<div class="{{this.overlayContentClass}}">\
<div class="kor-content-contents ws-clearfix">\
{{this.html}}\
</div>\
</div>\
</div>',
dialogOverlayTemplateWithIframe: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="{{this.overlayClass}}" role="alert">\
<div class="{{this.overlayHeaderClass}}">\
<div class="kor-header-contents">\
<div class="{{this.closeClass}} kor-control" tabindex="0">close</div>\
</div>\
</div>\
<div class="{{this.overlayContentClass}}">\
<div class="kor-content-contents">\
<iframe width="{{this.iframeWidth}}" height="{{this.iframeHeight}}" src={{this.iframeURL}}></iframe>\
</div>\
</div>\
</div>',
deleteAddresOverlayTemplate: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}"\
class="ws-confirm-delete-dialog-overlay {{this.overlayClass}}" role="alert">\
<div class="{{this.overlayHeaderClass}}">\
<div class="kor-header-contents">\
<div class="{{this.closeClass}} kor-control" tabindex="0">close</div>\
</div>\
</div>\
<div class="{{this.overlayContentClass}}">\
<div class="kor-content-contents">\
{{this.html}}\
</div>\
</div>\
</div>',
minicartOverlayTemplate: '<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="kor-minicart {{this.overlayClass}} kor-{{this.NAME}}">{{this.html}}</div>',
calendarMonthTemplate: '\
<div class="kor-datepicker">\
<table cellspacing="0" cellpadding="0" class="kor-datepicker-view-days">\
<thead>\
<tr>\
<th class="kor-prev-month-wrapper"><a class="kor-prev-month" href="#">&lt;</a></th>\
<th class="kor-prev-year-wrapper"><a class="kor-prev-year" href="#">&lt;&lt;</a></th>\
<th class="kor-month" colspan="{% if (this.showWeek) {%}4{%} else {%}3{%}%}">{{this.monthString}} {{this.year}}</th>\
<th class="kor-next-year-wrapper"><a class="kor-next-year" href="#">&gt;&gt;</a></th>\
<th class="kor-next-month-wrapper"><a class="kor-next-month" href="#">&gt;</a></th>\
</tr>\
<tr class="kor-days-of-week">\
{% if (this.showWeek) {%}\
<th><span>wk</span></th>\
{% } %}\
{% if(this.weekStart == 0) {%}\
<th><span>Su</span></th>\
{% } %}\
<th><span>Mo</span></th>\
<th><span>Tu</span></th>\
<th><span>We</span></th>\
<th><span>Th</span></th>\
<th><span>Fr</span></th>\
<th><span>Sa</span></th>\
{% if(this.weekStart == 1) {%}\
<th><span>Su</span></th>\
{% }%}\
</tr>\
</thead>\
<tbody class="kor-days">\
{% var obj = this; $.each(this.rows, function(i, row){ %}\
{% var obj = this; $.each(this.rows, function(i, row){ %}\
<tr>\
{% if(obj.showWeek){ %}\
<th class="kor-week"><a href="#"><span>{{row.week}}</span></a></th>\
{% } %}\
{% $.each(row.cols, function(i, col){ %}\
<td class="{% if(col.isInMonth){ %}kor-in-month {% }; if (col.isWeekendDay) { %}kor-weekend {%}; if (col.isSelectedDate) {%}kor-current-date {%}if (col.isEnabled){ %}kor-enabled-day {%}else{ %} kor-disabled-day {% } %}">\
{% if(col.isInMonth && col.isEnabled ){ %}<a data-date={{col.date}} href="#">{%}%}<span>{{col.date}}</span>{% if(col.isInMonth && col.isEnabled ){ %}</a>{%}%}\
</td>\
{% }) %}\
</tr>\
{% }) %}\
</tbody>\\\
</table>\
</div>',
changeCountryDialog: '\
<div data-comp-type="{{this.NAME}}" data-comp-id="{{this.uId}}" class="{{this.overlayClass}} kor-{{this.NAME}}">\
<div class="ws-change-country-dialog-header">{{0}}</div>\
<div class="ws-change-country-dialog-content">{{1}} {{2}} {{3}}</div>\
</div>',
giftcardPreviewContent: '\
<div class="ws-egift-popup-text">\
<p class="ws-egift-popup-name">Dear  {{this.recipientName.uHTMLEscape()}}</p>\
<p>You have received aSony Store-US - Web Storegift card to the Sony Online Store {{this.senderName.uHTMLEscape()}}!</p>\
<p></p>\
</div>\
<div class="ws-egift-popup-info">\
<img class="photo ws-egift-code-photo" alt="Gift Card image" data-type="1XL" \
src="{% if(this.image=="") { %}/gsi/static/WFS/SNYNA-SNYUS-Site/-/-/en_US/images/gift_card_customize_pin.png"{% } else { %}{{this.image}}{% } %}">\
<p>Value:$ {{(typeof(this.amount) != "undefined"? this.amount.toString().uHTMLEscape(): "")}}</p>\
<p>Card Number: XXXX-XXXX-XXXX</p>\
<p>PIN: XXXX</p>\
</div>\
<div class="ws-egift-popup-container">\
<p>Save this email! You\'ll need to print it and bring it with you to redeem your eGift Card in the store.</p>\
<p> {{this.message.uHTMLEscape()}}</p>\
<p>Terms & Conditions</p>\
</div>\
</div>',
skuOutOfStockText: ' - Out of Stock'
});

$.extend(KOR.templates, {
giftcardPreviewContent: '\
<div class="ws-egift-popup-text">\
<p class="ws-egift-popup-name">Dear  {{this.recipientName.uHTMLEscape()}},</p>\
<p>You have received a gift card to the Sony Online Store {{this.senderName.uHTMLEscape()}}!</p>\
<p></p>\
</div>\
<div class="ws-egift-popup-info">\
<img class="photo ws-egift-code-photo" alt="Gift Card image" data-type="1XL" \
src="{% if(this.image=="") { %}/gsi/static/WFS/SNYNA-SNYUS-Site/-/-/en_US/images/gift_card_customize_pin.png"{% } else { %}{{this.image}}{% } %}">\
<p>Value: $ {{(typeof(this.amount) != "undefined"? this.amount.toString().uHTMLEscape(): "")}}</p>\
<p>Card Number: XXXX-XXXX-XXXX</p>\
<p>PIN: XXXX</p>\
</div>\
<div class="ws-egift-popup-container">\
<p>Save this email! You\'ll need to print it and bring it with you to redeem your eGift Card in the store.</p>\
<p> {{this.message.uHTMLEscape()}}</p>\
<a href="http://store.sony.com/helpdeskarticle/-/-template_sny_helpdesk_safety_security-component_sny_helpdesk_safety_security_terms_conditions;pgid=fB1E.fgXwsdSRpmmymwFH4J20000MQWz3vmw;sid=HDID5Nkg4j1R5I1ddDJg4Osq_ITzbTmW7Ltn0Gk8">Terms & Conditions</a>\
</div>\
</div>',
});
})(jQuery);
