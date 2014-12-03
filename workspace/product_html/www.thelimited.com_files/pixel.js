var OP = window.OP || {};

OP.Base64 = {
    encode: function(data) {
        // See base64.js
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = "",
            tmp_arr = [];

        if (!data) {
            return data;
        }

        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);

        enc = tmp_arr.join('');
        var r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    }
};

OP.PixelManager = {

    init: function(config) {
        this.config = config;
        if (this.isConfigured()) {
            this.renderPixel();
        }
    },

    isConfigured: function() {
        return !!(this.config && this.config.hash && this.config.type);
    },

    renderPixel: function() {
        var pixel = this.createPixel();
        document.body.appendChild(pixel);
    },

    createPixel: function() {
        var pixel = document.createElement('img');
        pixel.src = this.buildUrl();
        return pixel;
    },

    buildUrl: function() {
        var url = [
            'https://offerpop.com/commerce/conversion',
            '?i=', this.config.hash,
            '&d=', this.getEventData()
        ];
        return url.join('');
    },

    getEventData: function() {
        var config = this.config,
            eventData = {type: this.config.type},
            optionalData = ['transaction_value', 'transaction_id'];

        optionalData.forEach(function(key) {
            if (!!config[key]) {
                eventData[key] = config[key];
            }
        });

        return OP.Base64.encode( JSON.stringify([eventData]) );
    }

};

OP.PixelManager.init(window.OPPixelInfo);
