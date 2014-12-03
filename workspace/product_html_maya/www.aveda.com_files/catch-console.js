if (typeof console != 'object' &&
        typeof firebug !== 'object' ) {
    var console = {
        log: function() {},
        dir: function() {},
        info: function() {},
        assert: function() {}
    };
}
