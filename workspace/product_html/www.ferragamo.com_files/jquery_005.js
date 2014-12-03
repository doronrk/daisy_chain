/*jslint browser: true*/
/*global $jq*/
/*global jQuery*/
"use strict";
function createCenteringPlugin($jq) {
    $jq.centering = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$jqel = $jq(el);
        base.el = el;
        // Add a reverse reference to the DOM object
        base.$jqel.data("centering", base);

        base.init = function () {
            base.options = $jq.extend({}, $jq.centering.defaultOptions, options);
            base.applyRatio();
            base.centerImage();
        };

        base.applyRatio = function () {
            var width, height;
            base.ratio = base.getRatio();
            if (base.ratio > 0) {
                width = base.$jqel.width();
                height = parseInt(width / base.ratio, 10);
                base.$jqel.height(height);
            }
        };

        base.getRatio = function () {
            var ratio = false;
            $jq.each(base.options.ratios, function (index, val) {
                if (base.$jqel.hasClass($jq(val).attr('class'))) {
                    ratio = val.ratio;
                }
            });
            return ratio;
        };

        base.centerImage = function () {
            var img, w_img, h_img, ratio_img, props;
            img = $jq("img", base.el);
            w_img = img.width();
            h_img = img.height();
            ratio_img = w_img / h_img;
            props = {};

            if (base.$jqel.hasClass('height_power')) {
                props.height = base.$jqel.height();
                props.width = props.height * ratio_img;
                props.marginLeft = (base.$jqel.width() - props.width) / 2;
            } else if (base.$jqel.hasClass('width_power')) {
                props.width = base.$jqel.width();
                props.height = props.width / ratio_img;
                props.marginTop = (base.$jqel.height() - props.height) / 2;
            }

            img.css(props);
            
            //Se ho prodotti con classe esperienziale vado a settare le proprietà css
            //all'immagine in modo che occupi tutta la riga (non deve essere centrata)
            if (base.$jqel.hasClass('frg_expResponsive')){
            	props.marginLeft = 0;  
            	props.width = "100%";
            	img.css(props);
            }
        };

        base.init();
        //$jq(window).resize(base.init);
    };

    $jq.centering.defaultOptions = {
        ratios: [
            {className: 'ratio_1', ratio: 1.6340 },
            {className: 'ratio_2', ratio: 0.8043 },
            {className: 'ratio_3', ratio: 1.0338 },
            {className: 'ratio_4', ratio: 1.0016 },
            {className: 'ratio_5', ratio: 1.5158 },
            {className: 'ratio_6', ratio: 1.53 },
        ]
    };

    $jq.fn.centering = function (options) {
        this.each(function () {
            var obj = new $jq.centering(this, options);
        });
        $jq('body').trigger('centered');
        return this;
    };

}

createCenteringPlugin(jQuery);