function QuickViewManager() {
	this.Initialize = function () {
		var $quickViewDialog = $('<div id="quickViewDialog"></div>')
			.dialog({
				autoOpen: false,
				resizable: false,
				modal: true,
				dialogClass: 'guessDialog',
				width: 806
			});

		$("div.quickView").bind('click', (function (ev) {
			ev.preventDefault();
			ev.stopPropagation();

			$quickViewDialog.html("").addClass("ui-progress").dialog("open");
			var styleId = $(this).attr("styleId");

			$.post(appUrl('Product/JsonQuickViewBoxHtml/'), { id: styleId },
				function (data) {
					$quickViewDialog.html(data.Html).removeClass("ui-progress").dialog("option", "position", 'center');
					var quickView = ProductDetails(
						'#quickViewBox div.productGradient',
						styleId,
						null,
						true);
					$('#quickViewBox div.closeBox').click(function () {
						quickView.HideCallouts();
						$quickViewDialog.dialog('close');
						$quickViewDialog.html("");

					});
				}, "json");
		}));
	};
	$("div.quickView").unbind();
	this.Initialize();

	return this;

}

function loadMore(linkElement) {
	var url = $(linkElement).attr("href");
	showPartialProgress($('#listappend'), true);
	$.ajax({
		url: url,
		type: "post",
		dataType: "json",
		data: { loadmore: "y" },
		success: function (data) {
			if (data.nextPageUrl)
				$(linkElement).attr("href", data.nextPageUrl);
			else
				$('#loading').hide('slow');
			var list = $('#listappend');
			list.append(data.prodList);
			QuickViewManager();
		},
		complete: function () {
			showPartialProgress($('#listappend'), false);
			if (document.getElementsByName('tfc-fitrec-catalog').length > 0)
				tfc.calculate();
			alternateViewManager();
		}
	});
}

function colorChangeManager() {
	$('div.swatches li img').click(function () {
		s7root = 'https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/Guess/';
		selectedSize = $('div.imageSize a.active').attr('id');
		$(this).parents('.productThumb').find('div.image img:first').attr('src', s7root + $(this).attr('alt') + '?$2014_G_' + selectedSize + '$');
		$(this).parents('.swatches').find('ul li img').removeClass('active');
		$(this).addClass('active');
	});
}

function replaceMissingImage(imgElem) {
	if (!imgElem)
		return;
	if (imgElem[0].nodeName.toLowerCase() != 'img')
		return;
	var notFoundImg = 'http://s7d5.scene7.com/is/image/Guess/g-not-found';
	if (imgElem.attr('src') != notFoundImg)
		imgElem.attr('src', notFoundImg);
	else
		imgElem.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='); //set empty image for sure
};

function alternateViewManager() {
	$('div.productThumb div.image img').error(function () {
		replaceMissingImage($(this));
	});
	$('div.productThumb div.image').off().hover(
		function () {
			var imgElement = $(this).find('div.prodImg a img');
			imgElement.attr('originalUrl', imgElement.attr('src'));
			imgElement.attr('src', imgElement.attr('src').replace('?', '-ALT1?')).error(function () {
				imgElement.attr('src', imgElement.attr('originalUrl')).error(function () {
					/*set empty image. otherwise we're falling into an infinity loop image requests*/
					replaceMissingImage(imgElement);
				});
			});
		},
		function () {
			var imgElement = $(this).find('div.prodImg a img');
			imgElement.attr('src', imgElement.attr('originalUrl'));
		}
	);
}

function imageSizeManager() {
	$('div.imageSize a').click(function (e) {
		e.preventDefault();
		$(this).siblings("a.active").removeClass("active");
		$(this).removeClass("active");

		size = $(this).attr('class');
		setImageSize($(this), size);

		saveImageSizeChoice(size);
		$(this).addClass("active");
	});
}

function setImageSize(el, size) {

	$('.rightContent .row-fluid ul.thumbnails > li').removeClass("span2").removeClass("span3").removeClass("span4");

	if (size == 'small') {
		$('.rightContent .row-fluid ul.thumbnails > li').addClass("span2");
	}
	else if (size == 'large') {
		$('.rightContent .row-fluid ul.thumbnails > li').addClass("span4");
	}
	else
		$('.rightContent .row-fluid ul.thumbnails > li').addClass("span3");

	$.each($('.productThumb .prodImg img'), function (index) {
		$(this).attr('src', $(this).attr('src').replace(/(\$.*_).*(\$)$/, '$1' + size + '$2'));
		//$(this).attr('originalurl', $(this).attr('originalurl').replace(/(\$.*_).*(\$)$/, '$1' + size + '$2'));
	});
}

function saveImageSizeChoice(size) {
	var cName = "ImageSize";
	$.cookie(cName, size, { expires: 365 });
}

function moreDetail(toggle, index) {
	var detailDiv = document.getElementById('prodDesc' + index);
	var orgDiv = document.getElementById('prodDesc');
	if (toggle == 'open') {
		orgDiv.style.display = 'none';
		detailDiv.style.display = 'block';
	}
	if (toggle == 'close') {
		orgDiv.style.display = 'block';
		detailDiv.style.display = 'none';
	}
}

function fitrec_selectsize(size, score) {
	var sizefind = _baseElement.find("ul.sizes li a");
	sizefind.html();
	for (var i = 0; i < sizefind.length; i++) {
		var truefitSize = $(sizefind[i]).text();
		var theSize = sizefind[i].id;
		truefitSize = truefitSize.replace(/\s/g, '');
		size = size.replace(/\s/g, '');
		if (truefitSize.toLowerCase() == size.toLowerCase()) {
			SetSize(theSize);
		}
	}
}

function ProductDetails(
		baseElementSelector,
		styleId,
		changeImage,
		isQuickView,
		isProductGroup) {

	var _baseElementSelector = baseElementSelector;
	var _baseElement = $(baseElementSelector);
	var _styleId = styleId;
	var _changeImage = changeImage;
	var _isQuickView = isQuickView;
	var _isProductGroup = isProductGroup;

	var test = '123';

	function ShowCallouts() {
		_baseElement.find('span.validationCallout').each(function () {
			var forElement = _baseElement.find('#' + $(this).attr('forElement'));
			var text = $(this).html();
			var position = 'left';
			if ($(this).attr('position') != null) {
				position = $(this).attr('position');
			}
			forElement.callout({ position: position, msg: text, css: 'guessValidationCallout' });
		});
	};

	function HideCallouts() {
		_baseElement.find('span.validationCallout').each(function () {
			var forElement = _baseElement.find('#' + $(this).attr('forElement'));
			forElement.callout('destroy');
		});
	};

	function RemoveCallouts() {
		_baseElement.find('span.validationCallout').remove();
	};

	function SetSku(sku) {
		_baseElement.find("#selectedSku").val(sku);
	};

	function ResetSize() {
		_baseElement.find(".selectedSize").text("").hide();
		_baseElement.find("ul.sizes li .active").removeClass('active');

		if (_baseElement.find("ul.sizes li").length == 1) {
			setSize(_baseElement.find("ul.sizes li a").attr("id"));
		} else {
			SetSku("");
		}
	};

	function ResetQuantity() {
		_baseElement.find("#selectedQty").val("1");
		_baseElement.find("div.plusminus #qty").text("1");
	};

	function ShowDetailsProgress() {
		showPartialProgress(_baseElement, true);
	};

	function HideDetailsProgress() {
		showPartialProgress(_baseElement, false);
	};

	function AddToShoppingBagJson(e) {
		e.preventDefault();
		_baseElement.removeCallouts();
		var selectedSku = _baseElement.find('#selectedSku').val();
		if (selectedSku.length == 0) {
			_baseElement.createCallout(_baseElement.find('.sizes li a').last(), 'Please select a size before adding to bag', {
				show: true,
				position: 'right'
			});
		} else {
			ShowDetailsProgress();
			var selectedQty = _baseElement.find('#selectedQty').val();
			addToShoppingBagJsonInternal(selectedSku, selectedQty, null,
				function (data) {
					if (data.Success) {
						if (_isQuickView) {
							$('#quickViewDialog').dialog('close');
						} else {
							ResetSize();
							ResetQuantity();
						}
					} else {
						_baseElement.createCallout(_baseElement.find('a.addToCart'), 'Unable to add item', { show: true, position: 'top' });
					}
				},
			function () {
				HideDetailsProgress();
			}
			);
		}
		return false;
	};

	function setSize(sku) {
		var sizeSelector = $('#' + sku);
		_baseElement.find(".selectedSize").text(sizeSelector.text()).show();
		_baseElement.find("ul.sizes li .active").removeClass('active');
		sizeSelector.addClass('active');
		SetSku(sku);
		HideCallouts();
		RemoveCallouts();
	};

	function SetColor(color) {
		_baseElement.find("strong.selectedColor").html(color);
	};

	function SetPrice(price) {
		_baseElement.find("div.price").html(price);
	};

	function SetMineImageUrl(url) {
		if (_changeImage != null) {
			_changeImage(url);
		} else {
			var mainImage = _baseElement.find('div.largeImage img');
			var completeUrl = catalogImage(url + '?$2014_G_xlarge$');
			mainImage.attr("src", completeUrl);
		}
	};

	function UpdateFlashObject(sku) {
		_baseElement.find("#selectedSku").val(sku);
	};

	function OnSizeClick(e) {
		setBaseElement(e);
		setSize($(e.target).attr('id'));
		return false;
	};

	function LoadImages(data) {
		if (_isProductGroup) {
			var imageHolder = _baseElement.find('img')[0];
			imageHolder.src = catalogImage(data.Images[0] + '?wid=116&hei=156&fmt=jpeg&qlt=85,0&op_sharpen=0&resMode=bicub&op_usm=1.0,1.0,5,0&iccEmbed=0&crop=0,136,1686,2261');
		} else {
			var thumbmailsHolder = _baseElement.find('div.thumbnailHolder');
			SetMineImageUrl(data.Images[0]);

			var nextImg, imgPattern = thumbmailsHolder.find(':first').clone();
			thumbmailsHolder.empty();
			for (var i = 0; i < data.Images.length; i++) {
				nextImg = imgPattern.clone();
				var url = catalogImage(data.Images[i] + '?$2014_G_xxsmall$');
				//the size of alt image in detail page and quickViewBox page is different, we might need to two different functions to load images?
				nextImg.html("<img id='" + data.Images[i] + "' src='" + url + "' alt='" + data.Images[i] + "' />");
				thumbmailsHolder.append(nextImg);
			}
			BindImagesEvents();
		}
	};

	function LoadSizes(data) {
		var sizesHolder = _baseElement.find('ul.sizes');
		sizesHolder.html('');
		for (var i = 0; i < data.Sizes.length; i++) {
			sizesHolder.append("<li><a href='#' id='" + data.Sizes[i].SkuCode + "'>" + data.Sizes[i].Display + "</a></li>");
		}
		BindSizesEvents();
	};

	function OnColorClick(e) {
		setBaseElement(e);
		if (_styleId == "") return false;
		ShowDetailsProgress();
		HideCallouts();
		RemoveCallouts();

		var color = $(e.target).attr("id");
		var colorText = $(e.target).attr("alt");

		$.getJSON(appUrl("Product/JsonRetrieveProductDetails"),
			{
				styleId: _styleId,
				color: color
			})
			.done(function (data) {

				if (data.IsOutOfStock) {
					$("<span/>")
					.addClass("validationCallout")
					.css({ display: 'none' })
					.attr('forElement', color)
					.attr('position', 'top')
					.text('Out of Stock')
					.appendTo(_baseElement);
					ShowCallouts();
				} else {
					SetColor(colorText);
					LoadImages(data);
					LoadSizes(data);
					SetPrice(data.Price);
					ResetSize();
				}
			})
		.fail(function () {
			alert('Sorry. Error has occured. Please try again or contact administrator.');
		})
			.always(function () {
				HideDetailsProgress();
			});
		return false;
	};

	function OnImageHover(e) {
		SetMineImageUrl($(e.target).attr("id"));
		return false;
	};

	function BindSizesEvents() {
		_baseElement.find("ul.sizes li a").on("click", OnSizeClick);
	};

	function BindQtyEvents() {
		$('div.quantity').each(function (ind, el) {
			var currentEl = $(el);
			var displayQtyEl = currentEl.find("#qty");
			var selectedQtyEl = currentEl.find("#selectedQty");
			currentEl.find("#quantityMinus:first").on("click", function (e) {
				e.preventDefault();
				var currentQuantity = parseInt(displayQtyEl.html());
				if (currentQuantity != 1) {
					displayQtyEl.html(currentQuantity - 1);
					selectedQtyEl.val(currentQuantity - 1);
				}
			});
			currentEl.find("#quantityPlus").on("click", function (e) {
				e.preventDefault();
				var currentQuantity = parseInt(displayQtyEl.html());
				if (currentQuantity != 10) {
					displayQtyEl.html(currentQuantity + 1);
					selectedQtyEl.val(currentQuantity + 1);
				}
			});
		});
	};

	function BindImagesEvents() {
		_baseElement.find("div.thumbs img").hover(OnImageHover);
	};

	function setBaseElement(e) {
		if (!_isProductGroup)
			return;
		_baseElement = $(e.target).closest(_baseElementSelector);
		_styleId = _baseElement.find('.productSKU:first').attr("styleId");
	}

	function BindPickupEvents() {
		var pickupBtn = _baseElement.find("#pickupbtn");
		if (pickupBtn.length == 0)
			return;

		_baseElement.find("#pickupbtn").click(function (e) {
			e.preventDefault();
			var form = _baseElement.find('form');

			if ($(form).find('#selectedSku').val().length == 0) {
				$("<span/>")
					.addClass("validationCallout")
					.css({ display: 'none' })
					.attr('forElement', $('.sizes li a').last().attr('id'))
					.text('Please select a size before searching in stores')
					.attr('position', 'right')
					.appendTo(_baseElement);

				ShowCallouts();
			} else {

				var selectedColorImage = $('ul.colors li a img[alt=\'' + $.trim($('.selectedColor').text()) + '\']');

				var item = {
					styleid: _styleId,
					name: $('div.rightDetails h2').text(),
					color: { name: selectedColorImage.attr('alt'), code: selectedColorImage.attr('id') },
					size: $.trim($('.selectedSize').text()),
					id: form.find('#selectedSku').val(),
					qty: form.find('#selectedQty').val()
				};

				gc.pickup.openLinkDialog(item, null,
					function (storeCode) {
						var d = $('#locationsDialog').showProgress();
						d.removeCallouts();

						var skuId = _baseElement.find('form #selectedSku').val();
						var qty = _baseElement.find('form #selectedQty').val();
						addToShoppingBagJsonInternal(skuId, qty, storeCode,
							function (data) {
								d.hideProgress();
								if (data.Success) {
									d.dialog('destroy');
									ResetSize();
								} else {
									var pickupButton = d.find('.location[data-lid=' + storeCode + '] input[type=button]');
									d.createCallout(pickupButton, 'Unable to pick up at this location.', { show: true, position: 'top' });
								}
							},
							function () {
								HideDetailsProgress();
							});
					});
			}
			return false;
		});
	};

	function BindAddToBagEvents() {
		_baseElement.find("a.addToCart").on("click", function (e) {
			e.preventDefault();
			AddToShoppingBagJson(e);
		});
	};

	function BindOnColorClick() {
		_baseElement.find("ul.colors li a img").click(OnColorClick);
	};

	function BindEvents() {
		BindSizesEvents();
		BindOnColorClick();
		BindImagesEvents();
		BindQtyEvents();
		BindPickupEvents();
		BindAddToBagEvents();
	};

	ResetSize();
	ResetQuantity();
	BindEvents();
	return this;
}