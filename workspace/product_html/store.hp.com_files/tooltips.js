(function($, can, HP, params) {

    HP.Tooltip = HP.Popup({
        defaults : {
            hideDelay          : 100,
            triggerActiveClass : 'tooltip_over',
			fxShow: {
				effect: 'fadeTo',
				duration: 0
			},
			fxHide: {
				effect: 'fadeOut',
				duration: 600
			}
        }
    },{
        'init' : function(element, options){

            this.options.triggerEl = element.prev().eq(0);

            this.on();
            this._super();
        }
    });

})(can.$, can, window.HP || (window.HP = {}));