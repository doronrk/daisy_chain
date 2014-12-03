function imageNotAvailable(selector){$(selector).error(function(){this.src="/images/image_not_available.png";
});
}function swatchNotAvailable(selector){$(selector).error(function(){this.src="/images/swatch_not_available.png";
});
}function addInputError(selector){jQuery(document).ready(function(){$(selector).addClass("error");
});
}