(function($) {
    $(document).ready(function() {

        /**
         * PIN is not require for older gift cards. Old gift cards can be identified
         * by the fact that their first 4 digits are 0089 or 2011. Hide the PIN
         * if not required. Hidden fields are not validated by Varien_Form, so the
         * "required-entry" class does not need to be removed.
         */
        var $pinContainer;
        // #gift_card_number is on balance check page
        // #giftcard_code is in checkout payment method
        var $giftCardNumber = $('#gift_card_number, #giftcard_code');
        $giftCardNumber.keyup(function() {
            var giftCardNumber = $giftCardNumber.val();
            if (!$pinContainer) {
                if ($('#pin').length) {
                    // balance check page
                    $pinContainer = $('#pin').parents('li:first');
                } else {
                    // checkout payment method
                    $pinContainer = $('#giftcard_pin').parents('div:first');
                }
            }
            if (giftCardNumber.length >= 14 && giftCardNumber.length <= 16) {
                var giftCardNumberForComparison = parseInt(giftCardNumber);
                if ((89500000030000 <= giftCardNumberForComparison && giftCardNumberForComparison <= 89509999939999)
                    || (2011000001037665 <= giftCardNumberForComparison && giftCardNumberForComparison <= 2011999995922044)
                ) {
                    $pinContainer.hide();
                } else {
                    $pinContainer.show();
                }
            } else {
                $pinContainer.show();
            }
        });

        // Prototype
        var giftCardForm = new VarienForm('gift_card_balance_check_form');

        // jQuery
        var $giftCardForm = $('#gift_card_balance_check_form');
        var $loadingDialog = $('#please-wait');
        var $submitButton = $('#submit');

        $giftCardForm.submit(function(e) {
            $submitButton.attr('disabled', 'disabled');
            e.preventDefault();
            if (giftCardForm.validator.validate()) {
                $loadingDialog.show();
                var action = $(this).attr('action');
                // Remove any spaces from the gift card
                $giftCardNumber.val($giftCardNumber.val().replace(/ /g,''));
                $.post(action,
                    $giftCardForm.serialize(),
                    function(data) {
                        /**
                         * @todo Replace messaging code with RobofirmMessenger class here from Robofirm_Common
                         * @link https://bitbucket.org/robofirm/robofirm_common/src/master/install/js/robofirm/common/RobofirmMessenger.js
                         */
                        var messageBlock = $('.giftcard-check-balance .messages');
                        var message;
                        if (messageBlock.length == 0) {
                            messageBlock = $('<ul class="messages"></ul>').hide();
                            messageBlock.insertBefore('#gift_card_balance_check_form');
                        } else {
                            messageBlock.empty().hide();
                        }
                        if (!data.error) {
                            message = $('<li class="success-msg"><ul><li><span>Your balance is ' + data.balance + '</span></li></ul></li></ul>');
                        } else {
                            message = $('<li class="error-msg"><ul><li><span>' + data.error_message + '</span></li></ul></li></ul>');
                        }
                        messageBlock.append(message).fadeIn();
                        $loadingDialog.hide();
                        $submitButton.removeAttr('disabled');
                    },
                    'json'
                );
            } else {
                $submitButton.removeAttr('disabled');
            }
        });
    });
})(jQuery);
