if (gnc) {
} else {
	var gnc = {};
}
if (gnc.product) {
} else {
	gnc.product = {};
}
gnc.product.pr = {};

gnc.product.pr.loadReviews = function() {
	var reviewLoaded = false;
	$$(".pr-review-engine").each(function(v) {
		$("tabRRContents").down(".prodTabContentBlock").insert(v);
		setTimeout(gnc.product.initializeTabset, 500);
		reviewLoaded = true;
	});
	if (!reviewLoaded) {
		setTimeout(gnc.product.pr.loadReviews, 500);
	}
};

gnc.product.pr.setReviewScrollbars = function() {
	$("tabRRContents").down(".prodTabContentBlock").scrollbar({"holder": $("tabRRContents")});
};

gnc.product.pr.loadQA = function() {
	var qaLoaded = false;
	if ($$(".prPaNonempty")[0]) {
		$$(".prPaNonempty").each(function(v) {
			$("tab052ContentsQA").down(".prodTabContentBlock").insert(v);
			$("tab052ContentsQA").down(".prodTabContentBlock").scrollbar({"holder": $("tab052ContentsQA")});
			qaLoaded = true;
		});
	}
	if (!qaLoaded) {
		setTimeout(gnc.product.pr.loadQA, 500);
	}
};

if (window.productAnswers && $("tab052ContentsQA") && $("tab052ContentsQA").down(".prodTabContentBlock")) {
	productAnswers(document);
	gnc.product.pr.loadQA();
}

function submitReview(pid) {
	window.open("/reviews/index.jsp?productId=" + pid, "WriteAReview", "width=570,height=750,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
}

jQuery(function() {
	if ($$("#tabRRContents .prodTabContentBlock").length > 0) {
		if (jQuery("body.gncStandard").length === 0) {
			gnc.product.initializeTabset();
		}
		var completed = false;
		var timedOut = 30000; //Time out after 30 seconds. Safeguard so that it doesn"t run forever.
		var timer = 0;
		var timerIncrement = 100; // interval duration
		var tabInnerHTML = $$("#tabRRContents .prodTabContentBlock")[0].innerHTML;
		var scrollbarTester = setInterval(function() {
			if ($$("#tabRRContents .prodTabContentBlock")[0].scrollHeight > $$("#tabRRContents .prodTabContentBlock")[0].clientHeight) {
				var el = $$("#tabRRContents .prodTabContentBlock")[0];
				el.scrollbar({"holder": $("tabRRContents")});
				completed = true;
				clearInterval(scrollbarTester);
				scrollbarTester = "";
			}
			timer += 100;
			if (timer >= timedOut) {
				clearInterval(scrollbarTester);
				scrollbarTester = "";
			}
		}, 100);
	}
});
