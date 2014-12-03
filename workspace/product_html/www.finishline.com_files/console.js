(function() {
	'use strict';

	window.FL = window.FL || {};

	/* things go in, but nothing EVER comes out */
	var blackHole = function() {};

	FL.state = FL.state || {
		consoleInitialized: false
	};
	if (FL.state.consoleInitialized == true) {
		return;
	} else {
		/*
		 * for production, no console logging is ever necessary.
		 * for development, these functions should already be defined and will not be overridden.
		 */
		if (!window.console) {
			window.console = {};
		}
		// union of Chrome, FF, IE, and Safari console methods
		var m = [
			"log", "info", "warn", "error", "debug", "trace", "dir", "group",
			"groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
			"dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
		];
		// define undefined methods as noops to prevent errors
		for (var i = 0; i < m.length; i++) {
			if (!window.console[m[i]]) {
				window.console[m[i]] = blackHole;
			}
		}

	}
	FL.state.consoleInitialized = true;
})();