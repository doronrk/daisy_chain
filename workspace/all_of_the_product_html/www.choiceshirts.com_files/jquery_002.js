/*
 * jQuery WidowFix Plugin
 * http://matthewlein.com/widowfix/
 * Copyright (c) 2010 Matthew Lein
 * Version: 1.0 (8/22/2010)
 * Dual licensed under the MIT and GPL licenses
 * Requires: jQuery v1.4 or later
 */

(function(a){jQuery.fn.widowFix=function(d){var c={linkFix:false};var b=a.extend(c,d);return this.each(function(){if(b.linkFix){a(this).find("a:last").wrap("<var>");var e=a("var").html();a("var").each(function(){a(this).find("a").contents().unwrap()})}var h="";var g=a(this).html().split(" ");var i=g.pop();function f(){if(i===""){i=g.pop();f()}}f();h=g.join(" ")+"&nbsp;"+i;a(this).html(h);if(b.linkFix){a("var").each(function(){a(this).contents().replaceWith(e);a(this).contents().unwrap()})}})}})(jQuery);