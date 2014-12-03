(function ($) {
	var defaults = {
		entryPointId: "from server",

		program: {
			selector: "div[data-logo-inline-program]",
			containerIdAttr: "data-container-id"
		}
	};

	function initialize() {
		var o = this.o;

		this.ep.find(o.program.selector).each(function (index, program) {
			var $program = $(program);
			var containerId = $program.attr(o.program.containerIdAttr);

			var $container = $("#" + containerId);
			if ($container.length !== 1) {
				try {
					console.log("LogoInlineBlock: could not find container with id '" + containerId + "'");
				}
				catch (e) { }

				return;
			}

			$container.empty().append($program);
			$program.show();
		});
	}

	window.CcsLogoInline = function (options) {
		this.ep = $("#" + options.entryPointId);
		this.o = $.extend(true, {}, defaults, options);

		initialize.call(this);
	};

}(ccsJq));
