// Copied directly from GNC.js changing just the IDs

function createFilterDropDowns(id, filterId) {
	var defaultValue;
	if (typeof sortType != 'undefined') {
		switch (sortType) {
			case "A1":
				defaultValue = "A-StorePrice-GNC";
				break;
			case "A2":
				defaultValue = "D-StorePrice-GNC";
				break;
			case "B1":
				defaultValue = "A-Title-GNC";
				break;
			case "B2":
				defaultValue = "D-Title-GNC";
				break;
			case "C1":
				defaultValue = "A-Added-GNC";
				break;
			case "C2":
				defaultValue = "D-Added-GNC";
				break;
			default:
				defaultValue = "D-Added-GNC";
		}
	}
	if ($(id)) {
		var combo = new Df.GncCombo(id, {
			data: comboDataSort,
			appendto: filterId,
			listClassName: "listSort",
			variableWidth: false,
			animate: {
				ease: Df.Transitions.expoOut,
				time: 1000
			},
			onUpdate: function(v) {
				var s = v.getCurrentValue();
				var apiData = {
					hashcode: hashcode
				};

				switch (s) {
					case "A-StorePrice-GNC":
						apiData.listSortType = "A1";
						mylists.ajax(mylists.vars.urls.setSortType, apiData);
						break;
					case "D-StorePrice-GNC":
						apiData.listSortType = "A2";
						mylists.ajax(mylists.vars.urls.setSortType, apiData);
						break;
					case "A-Title-GNC":
						apiData.listSortType = "B1";
						mylists.ajax(mylists.vars.urls.setSortType, apiData);
						break;
					case "D-Title-GNC":
						apiData.listSortType = "B2";
						mylists.ajax(mylists.vars.urls.setSortType, apiData);
						break;
					case "A-Added-GNC":
						apiData.listSortType = "C1";
						mylists.ajax(mylists.vars.urls.setSortType, apiData);
						break;
					case "D-Added-GNC":
						apiData.listSortType = "C2";
						mylists.ajax(mylists.vars.urls.setSortType, apiData);
						break;
				}

				if (mylistData.items.length > 1) {
					if (s.indexOf("Added") >= 0) {
						mylistData.items.sort(mylists.sort.added);
					} else if (s.indexOf("StorePrice") >= 0) {
						mylistData.items.sort(mylists.sort.price);
					} else {
						// default to title sort if nothing else specified
						mylistData.items.sort(mylists.sort.title);
					}

					// if sort option starts with D then reverse the array
					if (s.indexOf("D") === 0) {
						mylistData.items.reverse();
					}

					var itemContainer = jQuery(".list-wrap .items");

					// if there are 2 list-wraps on the page make sure we don't do anything with the widget
					itemContainer.each(function(i, e) {
						e = jQuery(e);
						if (e.closest("#mylists-widget-wrap").length > 0) {
							return;
						} else {
							itemContainer = e;
						}
					});

					// clear out existing stuff first
					itemContainer.html("");

					// append sorted items
					jQuery.tmpl(mylists.templates.mylistItem, mylistData).appendTo(itemContainer);
				}

				jQuery("#product-search2").html(v.currentLabel);
				jQuery("#product-search3").html(v.currentLabel);

				jQuery(".listSort .selected").removeClass("selected");

				jQuery(".listSort div div").each(function(i, e) {
					e = jQuery(e);
					if (v.currentLabel === e.html()) {
						e.addClass("selected");
					}
				});
			}
		});

		combo.setPosition = function() {
			this.pos = $(id).positionedOffset();
			this.left = this.pos[0];
			this.top = this.pos[1];
			this.listHolder.style.left = this.left + 1 + "px";
			this.listHolder.style.top = this.top + 22 + "px";
		};

		combo.setPosition();
		combo.setCurrentValue(defaultValue);
	}
}

// This code will open links in a new window. To change any existing links
// all you need to do is set the rel attribute to external and put the url
// in the href. This will handle rewriting the links to open a new window.
// If you need to open a new window with options you can copy the:
// if (e.attr("rel").indexOf("promo") > -1) and adapt to your own desire.
jQuery(function() {
	// open links in a new window
	var externalLinks = jQuery('a[rel~="external"]');
	jQuery(externalLinks).each(function(i, e) {
		e = jQuery(e);
		var link = e.attr("href");
		// if a link comes by without http:// or https:// prepend http://
		if (!(link.startsWith("http://") || link.startsWith("https://"))) {
			link = "http://" + link;
		}
		e.data("href", link);
		e.attr("href", "javascript:void(0);");
		e.click(function(event) {
			if (e.attr("rel").indexOf("promo") > -1) {
				window.open(e.data("href"), "promo", "toolbar=no,location=no,directories=0,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=200,screenY=100,screenX=100,left=100,top=100");
			} else {
				// default to open a new window with default options
				window.open(e.data("href"), "gnc");
			}
		});
	});
});

// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
if (!window.log) {
	window.log = function() {
		// store logs to an array for reference
		//log.history = log.history || [];
		//log.history.push(arguments);
		if (this.console) {
			console.log(Array.prototype.slice.call(arguments));
		}
	};
}

/*******************************************************************************
 *
 * Onload
 *
 *******************************************************************************/
var urlParams = {};
(function() {
	var match,
		pl = /\+/g, // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function(s) {
			return decodeURIComponent(s.replace(pl, " "));
		},
		query = window.location.search.substring(1);

	// redirect from the login page encodes the url like 3 times
	while (query.indexOf("&amp;") >= 0) {
		query = query.replace("&amp;", "&");
	}
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
})();

/*******************************************************************************
 *
 * Mylists
 *
 *******************************************************************************/
var mylists = {};

/*******************************************************************************
 *
 * Variables
 *
 *******************************************************************************/
mylists.vars = {
	page: "", // list, checkout, product
	list: false,
	currentButton: false,
	debug: false,
	labels: {
		deselect: "Deselect all",
		select: "Select all"
	},
	listItemLimit: 15,
	overflowLimit: 5,
	urls: {
		addToCart: "/cartHandler/index.jsp",
		addOneToMyList:		"/WishListService?reqType=addProdToList",
		addToMyList:		"/WishListService?reqType=addAllProdToList",
		cloneList:			"/WishListService?reqType=cloneMyList",
		createList:			"/WishListService?reqType=createWishList",
		deleteList:			"/WishListService?reqType=deleteWishList",
		deleteItem:			"/WishListService?reqType=removeProdFromList",
		editDescription:	"/WishListService?reqType=editListDesc",
		editTitle:			"/WishListService?reqType=editListTitle",
		getLists:			"/WishListService?reqType=usersLists",
		getGNCLists:		"/WishListService?reqType=ListItemDetails",
		setSortType:		"/WishListService?reqType=updListSortType"
	}
};

/*******************************************************************************
 *
 * Sort
 *
 *******************************************************************************/
mylists.sort = {
	title: function(a, b) {
		var aTitle = a.title.toLowerCase();
		var bTitle = b.title.toLowerCase();
		return aTitle > bTitle ? 1 : (aTitle === bTitle ? 0 : -1);
	},
	price: function(a, b) {
		return a.priceCompare > b.priceCompare ? 1 : (a.priceCompare === b.priceCompare ? 0 : -1);
	},
	added: function(a, b) {
		// values are milliseconds
		return a.added > b.added ? 1 : (a.added === b.added ? 0 : -1);
	}
};

/*******************************************************************************
 *
 * Ajax Wrapper
 *
 *******************************************************************************/
mylists.ajax = function(url, data, onSuccess, onError) {
	if (!url || url.length === 0) {
		log(url, data);
		return;
	}
	if (typeof onSuccess != "function") {
		// if null just create empty method
		onSuccess = function(data, textStatus, jqXHR) {};
	}
	if (typeof onError != "function") {
		onError = function(jqXHR, textStatus, errorThrown) {
			if (!mylists.debug) {
				return;
			}
			log(jqXHR, textStatus, errorThrown);
		};
	}
	if (typeof data !== "object") {
		data = {};
	}

	// set some defaults and params for each call
	data.storeCode = "GNC";
	data.userId = listUserId;

	jQuery.ajax(url, {
		cache: false,
		data: data,
		dataType: "json",
		error: onError,
		success: onSuccess
	});
};

/*******************************************************************************
 *
 * Overlay
 *
 *******************************************************************************/
mylists.overlay = {
	id: "mylist-overlay"
};

mylists.overlay.show = function() {
	if (jQuery("#" + mylists.overlay.id).length === 0) {
		jQuery("body").append('<div id="' + mylists.overlay.id + '"></div>');
	}
	var h = Math.max(jQuery("html").outerHeight(), jQuery("body").outerHeight());
	var w = Math.max(jQuery("html").outerWidth(), jQuery("body").outerWidth());
	jQuery("#" + mylists.overlay.id).css({
		height: h + "px",
		width: w + "px",
		opacity: .5
	});
};

mylists.overlay.hide = function() {
	jQuery("#" + mylists.overlay.id).remove();
};

/*******************************************************************************
 *
 * Popups
 *
 *******************************************************************************/
mylists.popup = {
	center: function(d) {
		var top = Math.max(0, jQuery(document).scrollTop() + (jQuery(window).outerHeight() - d.outerHeight()) / 2);
		var left = Math.max(0, jQuery(document).scrollLeft() + (jQuery(window).outerWidth() - d.outerWidth()) / 2);

		if (d.outerHeight() > jQuery(window).outerHeight()) {
			top = jQuery(document).scrollTop() + 25;
		}
		if (d.outerWidth() > jQuery(window).outerWidth()) {
			left = jQuery(document).scrollLeft() + 25;
		}

		d.css({
			left: left + "px",
			top: top + "px"
		});
	}
};

mylists.productPopup = {
	reposition: function(target, src) {
		src = jQuery(src);
		target.css({
			"left": src.offset().left + "px",
			"top": src.offset().top + src.outerHeight() + "px"
		});
	}
};

mylists.detailsPopup = function() {
	remote = open("../helpdesk/popup.jsp?display=ship&subdisplay=process", "availability", "width=500,height=400,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
};

mylists.promoPopup = function(thisUrl, thisName, theseParams) {
	remote = open(thisUrl, thisName, theseParams);
};

/*******************************************************************************
 *
 * Add to Cart
 *
 *******************************************************************************/
mylists.addToCart = {};

mylists.addToCart.init = function() {
	jQuery(document).on("click", ".add-cart", function(event) {
		var container = jQuery(event.target).closest(".list-wrap");
		var items = container.find(".items .checked");

		items.each(function(i, e) {
			e = jQuery(e);
			var item = jQuery(e.closest(".item"));
			var form = jQuery(item.find("form"));
			jQuery.ajax({
				type: 'POST',
				async: false,
				url: mylists.vars.urls.addToCart,
				data: form.serialize(),
				success: function(d, s, x) {
				window.location = "/cart/index.jsp?addToCart=mylist";
				}
			});
		});
	});
};

/*******************************************************************************
 *
 * Clone
 *
 *******************************************************************************/
mylists.clone = {
	init: function() {
		jQuery("#at20mc, .at_item, .addthis_toolbox").click(function(event) {
			var data = {
				listId: mylists.vars.list.attr("data-id")
			};
			mylists.ajax(mylists.vars.urls.cloneList, data, function(d, s, x) {
				mylists.vars.list.attr("data-id", d.listId);
			});
		});
	}
};

/*******************************************************************************
 *
 * Checkboxes
 *
 *******************************************************************************/
mylists.checkbox = {
	className: "checked"
};

mylists.checkbox.check = function() {
	var className = mylists.checkbox.className;

	// add a checked class to the label on change of the checkbox
	jQuery(document).on("click", ".checkbox-wrap .label", function(event) {
		var label = jQuery(event.target);
		var c = jQuery(label.next());
		var parentWrap = label.closest(".list-wrap");

		label.toggleClass(className);
		c.prop("checked", label.hasClass(className));

		var checkedLength = parentWrap.find(".items .checked").length;
		jQuery(".actions .select-all").html(checkedLength > 0 ? mylists.vars.labels.deselect : mylists.vars.labels.select);

		// This is used in checkout pages
		if (jQuery(".mylist-popup .count").length > 0) {
			var e = jQuery(".mylist-popup .count");
			e.html("(" + Math.max(0, checkedLength) + ") Item" + (checkedLength === 1 ? "" : "s") + " Selected");
		}
	});
};

mylists.checkbox.selectAll = function() {
	var className = mylists.checkbox.className;
	jQuery(document).on("click", ".actions .select-all", function(event) {
		var parentWrap = jQuery(event.target).closest(".list-wrap");

		if (parentWrap.find(".item").length > 0) {
			var remove = parentWrap.find(".items .checked").length > 0;

			var items = remove ? parentWrap.find(".items .checked") : parentWrap.find(".items .label");

			items.each(function(i, e) {
				e = jQuery(e);
				e.toggleClass(className);
				jQuery(e.next()).prop("checked", e.hasClass(className));
			});

			jQuery(".actions .select-all").html(remove ? mylists.vars.labels.select : mylists.vars.labels.deselect);
		}
	});
};

mylists.checkbox.init = function() {
	mylists.checkbox.check();
	mylists.checkbox.selectAll();
};

/*******************************************************************************
 *
 * Edit Title
 *
 *******************************************************************************/
mylists.editTitle = {
	init: function() {
		jQuery(".mylist-title-wrap .edit").click(function(event) {
			var edit = jQuery(event.target);
			var title = jQuery(edit.prev());
			if (title.find("input").length > 0) {
				return;
			}

			title.html('<input class="text" type="text" value="' + title.html() + '" maxlength="50" />');
			jQuery(".mylist-title-wrap .text").focus();
		});

		jQuery(document).on("blur", ".mylist-title-wrap .text", function(event) {
			var text = jQuery(event.target);

			var newVal = jQuery.trim(text.val());

			if (newVal.length === 0) {
				jQuery("#mylist-title-error").show();
			} else {
				jQuery("#mylist-title-error").hide();

				if (newVal.length > 0) {
					var data = {
						listId: mylists.vars.list.attr("data-id"),
						listTitle: newVal
					};
					mylists.ajax(mylists.vars.urls.editTitle, data, function() {
						var title = jQuery(text.parent());
						title.html(newVal);
						mylists.vars.list.attr("data-title", newVal);
					});
				}
			}
		});
	}
};

/*******************************************************************************
 *
 * Edit Description
 *
 *******************************************************************************/
mylists.editDescription = {
	init: function() {

		jQuery(".description .text").keyup(function(event) {
			var text = jQuery(event.target);
			if (text.val().length > 500) {
				text.val(text.val().substring(0, 500));
			}
		});

		jQuery(".description .text").blur(function(event) {
			var text = jQuery(event.target);
			var data = {
				listId: mylists.vars.list.attr("data-id"),
				listDesc: text.val()
			};
			mylists.ajax(mylists.vars.urls.editDescription, data);
		});

		//Auto adjust the height of the textarea for description
		FitToContent(document.getElementById("description-field"), 500);

		jQuery("#description-field").on('keyup', function() {
			FitToContent(this, 500);
		});

		function FitToContent(id, maxHeight) {
			var text = id && id.style ? id : jQuery(id);
			if (!text)
				return;

			var adjustedHeight = text.clientHeight;

			if (!maxHeight || maxHeight > adjustedHeight) {
				adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
				if (maxHeight)
					adjustedHeight = Math.min(maxHeight, adjustedHeight);
				if (adjustedHeight > text.clientHeight)
					text.style.height = adjustedHeight + "px";
			}
		}
	}
};

/*******************************************************************************
 *
 * Promo
 *
 *******************************************************************************/
mylists.promo = {
	init: function() {
		jQuery(document).on("mouseenter", ".list-wrap .item .promo", function(event) {
			var promo = jQuery(event.target);
			mylists.promo.show(promo);
		});
		jQuery(document).on("mouseleave", ".list-wrap .item .promo", function(event) {
			jQuery(".promo-popup").remove();
		});
	},
	show: function(dest) {
		jQuery.tmpl(mylists.templates.promo, {}).appendTo(jQuery(dest));
	}
};

/*******************************************************************************
 *
 * Delete Item
 *
 *******************************************************************************/
mylists.deleteItem = {
	show: function(dest, listId, listTitle, id, title, size, image) {
		var data = {
			listTitle: listTitle,
			listId: listId,
			productId: id,
			productTitle: title,
			productSize: size,
			productImage: image
		};

		var d = jQuery.tmpl(mylists.templates.deleteItem, data);
		d.appendTo("body");
		mylists.productPopup.reposition(d, dest);
	}
};

mylists.deleteItem.init = function() {
	jQuery(document).on("click", ".list-wrap .item .delete", function(event) {
		if (jQuery(".delete-item-popup").length > 0) {
			return;
		}
		var e = jQuery(event.target);
		var item = jQuery(e.closest(".item"));

		mylists.deleteItem.show(e,
			mylists.vars.list.attr("data-id"), mylists.vars.list.data("title"),
			item.data("id"), item.find(".title a").html(),
			item.find(".gncCount").html(), item.find("img").attr("src"));
	});

	jQuery(document).on("click", ".delete-item-popup .yes", function(event) {
		var e = jQuery(event.target);
		var id = e.data("id").split("|");
		var data = {
			listId: e.data("listId"),
			prodId: id[0],
			sku: id[1]
		};

		mylists.ajax(mylists.vars.urls.deleteItem, data, function(d, t, j) {
			mylists.vars.list.find(".item[data-id='" + e.data("id") + "']").remove();
			jQuery(e.closest(".mylist-popup")).remove();
			var items = mylists.vars.list.find(".item");
			if (items.length < 1) {
				mylists.vars.list.find("ol.items").append('<li class="empty-list">You currently don\'t have anything added to your list yet.</li>');
				jQuery(".actions .select-all").html("Select all");
			}
		});
	});
};

/*******************************************************************************
 *
 * Delete List
 *
 *******************************************************************************/
mylists.deleteList = {
	show: function(dest, id, title) {
		var data = {
			title: title,
			id: id
		};
		jQuery.tmpl(mylists.templates.deleteList, data).appendTo(jQuery(dest));
	}
};

mylists.deleteList.init = function() {
	jQuery(".mylist-title-wrap .delete").click(function(event) {
		if (jQuery(".mylist-title-wrap .delete .delete-list-popup").length > 0) {
			return;
		}
		var e = jQuery(event.target);
		mylists.deleteList.show(e, mylists.vars.list.attr("data-id"), mylists.vars.list.data("title"));
	});

	jQuery(document).on("click", ".delete-list-popup .yes", function(event) {
		var e = jQuery(event.target);
		var data = {
			listId: e.data("id")
		};
		mylists.ajax(mylists.vars.urls.deleteList, data, function(data, textStatus, jqXHR) {
			window.location = "/mylists/list.jsp?userId=" + listUserId;
		});
	});
};

/*******************************************************************************
 *
 * Already Added
 *
 *******************************************************************************/
mylists.alreadyAdded = {
	show: function(listTitle, title, size) {
		jQuery("#added-to-list").remove();
		var data = {
			listTitle: listTitle,
			productTitle: title,
			productSize: size
		};
		var d = jQuery.tmpl(mylists.templates.alreadyAdded, data);
		d.appendTo("body");
		mylists.popup.center(d);
		mylists.overlay.show();
	},
	showMultiple: function(listTitle, addedItems) {
		jQuery("#added-to-list").remove();
		var data = {
			listTitle: listTitle,
			items: addedItems
		};

		var d = jQuery.tmpl(mylists.templates.alreadyAdded, data);
		d.appendTo("body");
		mylists.popup.center(d);
		mylists.overlay.show();
	}
};

/*******************************************************************************
 *
 * Create New List
 *
 *******************************************************************************/
mylists.createList = {
	keyPress: function(event) {
		// 13 is the enter key
		if (event.which === 13) {
			event.preventDefault();
			mylists.createList.addHandler(event);
		}
	},
	addHandler: function(event) {
		if (!mylists.createList.validate()) {
			return;
		}

		var e = jQuery(jQuery(event.target).closest("form"));
		var text = jQuery(e.find(".text"));
		var data = {
			listTitle: text.val()
		};
		mylists.ajax(mylists.vars.urls.createList, data, function(data, textStatus, jqXHR) {
			if (mylists.vars.currentButton.hasClass("new-list")) {
				window.location = "/mylists/list.jsp?userId=" + listUserId + "&id=" + data.HashCode;
			} else {
				var hashCode = data.HashCode;
				mylists.ajax(mylists.vars.urls.getLists, data, function(d, t, j) {
					// loop over lists
					var lists = d.myLists;
					var list = false;
					for (var i = 0; i < lists.length; i++) {
						if (lists[i].HashCode === hashCode) {
							list = lists[i];
							break;
						}
					}
					if (list) {
						jQuery(e.closest(".mylist-popup")).remove();
						mylists.addItemsList.addHandler(list.listTitle, list.listItemCount, list.HashCode, list.listId);
					}
				});
			}
		});
	},
	init: function() {
		jQuery(document).on("keydown", "#create-list .text", mylists.createList.keyPress);

		jQuery(document).on("click", ".new-list", function(event) {
			mylists.vars.currentButton = jQuery(event.target);
			mylists.createList.show();
		});
		jQuery(document).on("click", "#create-list .add", function(event) {
			mylists.createList.addHandler(event);
		});
		jQuery(document).on("focus", "#create-list .text", function(event) {
			var e = jQuery(event.target);
			if (e.val() == "Enter a List Name") {
				e.val("");
			}
		});
		jQuery(document).on("blur", "#create-list .text", function(event) {
			var e = jQuery(event.target);
			if (e.val() === "") {
				e.val("Enter a List Name");
			}
		});
	},
	show: function() {
		jQuery.tmpl(mylists.templates.createList).appendTo("body");
		mylists.productPopup.reposition(jQuery("#create-list"), mylists.vars.currentButton);
	},
	validate: function() {
		if (jQuery("#create-list form input").val() === "Enter a List Name" || jQuery("#create-list form input").val() === "") {
			jQuery("#create-list form p.error").show();
			return false;
		} else {
			jQuery("#create-list form p.error").hide();
			return true;
		}
	}
};

/*******************************************************************************
 *
 * Add Items to List
 *
 *******************************************************************************/
mylists.addItemsList = {
	getListsDropdown: function(items) {
		var data = {
			items: items
		};
		var d = jQuery.tmpl(mylists.templates.dropdown, data);
		d.appendTo("body");
		mylists.productPopup.reposition(d, mylists.vars.currentButton);
	},
	show: function(itemId, hashCode, listName, button) {
		var data = {
			itemId: itemId,
			hashCode: hashCode,
			listName: listName,
			userId: listUserId,
			productTitle: jQuery("#product-title h2").text(),
			productSize: jQuery(".product-size").text()
		};

		if (jQuery("#added-to-list").length < 1) {
			jQuery.tmpl(mylists.templates.addedToList, data).appendTo("body");
			if (jQuery("#added-to-list #items-added").length > 0) {
				var title = "";
				var itemsAdded = jQuery(".checked");
				if (itemsAdded.length > 1) {
					title = itemsAdded.length;
				} else {
					if (mylists.vars.page === "cart") {
						title = button.closest(".description").find(".carted-item-title").html();
					} else {
						title = jQuery(itemsAdded).parent().siblings(".title-wrap").children(".title").children().html();
					}
				}
				jQuery("#items-added").append("<li><h5>" + title + " Items</h5></li>");
			}
		}

		mylists.productPopup.reposition(jQuery("#added-to-list"), mylists.vars.currentButton);

		jQuery("#added-to-list").show();
	},
	clickHandler: function() {
		mylists.ajax(mylists.vars.urls.getLists, {}, function(data, textStatus, jqXHR) {
			if (data.myLists && data.myLists.length > 0) {
				mylists.addItemsList.getListsDropdown(data.myLists, mylists.vars.currentButton);
			} else {
				mylists.createList.show(mylists.vars.currentButton);
			}
		});
	},

	addHandler: function(listName, listCount, listHashCode, listId) {
		var itemCount = 0;
		var container = false;
		if (mylists.vars.page === "product") {
			container = jQuery(mylists.vars.currentButton.closest(".productDescriptionBlock"));
			itemCount = 1;
		} else if (mylists.vars.page === "cart") {
			container = mylists.vars.currentButton;
			itemCount = 1;
		} else {
			container = jQuery(mylists.vars.currentButton.closest(".checkout-popup"));
			if (container.length === 0) {
				container = jQuery(mylists.vars.currentButton.closest(".list-wrap"));
			}
			var items = container.find(".items .checked");
			itemCount = items.length;
		}

		if (!container || container.length === 0) {
			// pretty sure we should never get in here...
			return;
		}

		var count = parseInt(listCount) + itemCount;
		if (count > mylists.vars.listItemLimit) {
			mylists.maxItems.show(listHashCode, listName);
		} else {
			var skus = "";
			var url = "";
			var data = {};

			if (mylists.vars.page === "product") {
				if (container.hasClass("productDescriptionBlock")) {
					url = mylists.vars.urls.addOneToMyList;

					prod = jQuery("#prod_0").val().split("|");

					data = {
						listId: listId,
						prodId: prod[0],
						sku: prod[1]
					};
				}
			}
			if (mylists.vars.page === "cart") {
				url = mylists.vars.urls.addOneToMyList;

				data = {
					listId: listId,
					prodId: container.data("productid"),
					sku: container.data("sku")
				};
			}
			if (url.length === 0) {
				var items = container.find(".items .checked");
				if (items.length > 0) {
					url = mylists.vars.urls.addToMyList;
					items.each(function(i, e) {
						e = jQuery(e);
						var item = jQuery(e.closest(".item"));
						var val = item.data("id");
						skus += (skus.length > 0 ? "," : "") + val;
					});

					// replace pipe (|) with colon (:)
					skus = skus.replace(/\|/g, ":");

					data = {
						listId: listId,
						prodsku: skus
					};
				}
			}

			if (url.length === 0) {
				return;
			}

			mylists.ajax(decodeURIComponent(decodeURIComponent(url)), data, function(d, t, j) {
				var container = mylists.vars.currentButton.closest(".productDescriptionBlock");
				if (!container || container.length === 0) {
					if (mylists.vars.page === "cart") {
						container = mylists.vars.currentButton;
					} else {
						container = mylists.vars.currentButton.closest(".checkout-popup");
						if (container.length === 0) {
							container = mylists.vars.currentButton.closest(".list-wrap");
						}
					}
				}
				container = jQuery(container);

				var hashCode = d.hashCode;
				if (container.hasClass("checkout-popup")) {
					jQuery(".checkout-popup").remove();
					mylists.checkout.itemAdded(listHashCode, d.items.length, listName);
				} else if (container.hasClass("productDescriptionBlock")) {
					// product page
					itemId = jQuery("#prod_0").val();
					mylists.addItemsList.show(itemId, hashCode, listName, jQuery(".add-items"));
				} else if (container.hasClass("add-items")) {
					// cart page
					itemId = container.data("productid") + "|" + container.data("sku");
					mylists.addItemsList.show(itemId, hashCode, listName, mylists.vars.currentButton);
				} else {
					var items = container.find(".items .checked");
					var item = jQuery(items[0]).closest(".item");
					itemId = item.data("id");
					mylists.addItemsList.show(itemId, listHashCode, listName, jQuery(".add-items"));
				}
			});
		}
		jQuery("#list-dropdown").remove();
	},

	add: function(list) {
		var listName = list.data("name");
		var listCount = list.data("count");
		var listHashCode = list.data("hashcode");
		var listId = list.data("id");
		mylists.addItemsList.addHandler(listName, listCount, listHashCode, listId);
	},

	pageLoad: function() {
		if (urlParams.cms != "true") {
			mylists.addItemsList.pageReload();
		}
	},

	pageReload: function() {
		// bi is button index
		var bi = parseInt(urlParams.bi);
		if (isNaN(bi)) {
			return;
		}

		var buttons = jQuery(".add-items");
		if (bi + 1 > buttons.length) {
			return;
		}
		mylists.vars.currentButton = jQuery(buttons[bi]);
		if (mylists.vars.currentButton.length > 0) {
			mylists.addItemsList.clickHandler();
			jQuery("html,body").animate({
				scrollTop: mylists.vars.currentButton.offset().top - 150
			}, "slow");
		}
	}
};

mylists.addItemsList.init = function() {
	// On the body click the dropdown should be hidden
	jQuery("body").click(function(e) {
		if (jQuery(e.target).attr("id") !== "list-dropdown" && !jQuery(e.target).hasClass("add-items")) {
			jQuery("#list-dropdown").remove();
		}
	});

	jQuery(document).on("click", "#list-dropdown span", function(e) {
		mylists.createList.show(jQuery(".add-items"));
		jQuery("#list-dropdown").remove();
	});

	jQuery(document).on("click", ".add-items", function(e) {
		if ($(this).tagName == "A") {
			e.preventDefault();

			var currentPage = window.location.pathname;

			if (currentPage.search("checkout") >= 0) {
				window.location = "/coreg/index.jsp?step=register&origin=checkout%2Findex.jsp%3Fprocess%3DorderTracking";
			} else {
				var buttons = jQuery(".add-items");
				for (var i = 0; i < buttons.length; i++) {
					var button = jQuery(buttons[i]);
					button.data("bi", i);
					if (button.data("bi") === mylists.vars.currentButton.data("bi")) {
						var fromCms = mylists.vars.currentButton.closest("#mylists-widget-wrap").length > 0;
						var qs = window.location.search + "&bi=" + i + "&cms=" + fromCms;

						if (qs.indexOf("?") !== 0) {
							qs = "?" + qs.substring(1, qs.length);
						}
						currentPage += encodeURIComponent(qs);

						var hash = window.location.hash;
						if (hash.length > 0) {
							currentPage += encodeURIComponent(hash);
						}

						window.location = "/coreg/index.jsp?step=register&origin=" + currentPage;
						break;
					}
				}
			}
		} else {
			mylists.addItemsList.clickHandler();
		}
	});

	// Add product to a list from the dropdown menu
	jQuery(document).on("click", "#list-dropdown li", function(e) {
		e.preventDefault();
		var list = jQuery(this);
		mylists.addItemsList.add(list);
	});
};

/*******************************************************************************
 *
 * Max Items
 *
 *******************************************************************************/
mylists.maxItems = {
	show: function(hashcode, listName) {
		var data = {
			title: listName,
			hashcode: hashcode,
			userId: listUserId
		};
		var d = jQuery.tmpl(mylists.templates.maxItems, data);
		d.appendTo("body");

		jQuery("#max-items .new-list").click(function() {
			jQuery("#max-items").remove();
			mylists.createList.show(mylists.vars.currentButton);
		});

		jQuery("#max-items .existing-list").click(function(event) {
			jQuery("#max-items").remove();
			mylists.addItemsList.clickHandler(mylists.vars.currentButton);
		});

		mylists.productPopup.reposition(d, mylists.vars.currentButton);
	}
};

/*******************************************************************************
 *
 * Checkout
 *
 *******************************************************************************/
mylists.checkout = {
	show: function(items, limit) {
		var data = {
			items: items,
			limit: limit,
			overflowLimit: mylists.vars.overflowLimit
		};
		var d = jQuery.tmpl(mylists.templates.checkout, data);
		d.appendTo("body");
		mylists.popup.center(d);
		mylists.overlay.show();
	},
	itemAdded: function(hashcode, count, listTitle) {
		var data = {
			hashcode: hashcode,
			userId: listUserId,
			count: count,
			title: listTitle
		};
		var d = jQuery.tmpl(mylists.templates.checkoutItemAdded, data);
		d.appendTo("body");
		mylists.popup.center(d);
		mylists.overlay.show();
	}
};

mylists.checkout.init = function() {
	jQuery(".checkout span#add-my-list").click(function(event) {
		if (checkoutItems.length > 0) {
			mylists.checkout.show(checkoutItems, mylists.vars.listItemLimit);
		} else {
			alert("We're sorry, none of the items on your order are eligible to be added to the GNC Lists program.");
		}
	});
};

/*******************************************************************************
 *
 * MYLISTS WIDGET
 *
 *******************************************************************************/
mylists.widget = {
	show: function(items, limit) {
		var data = {
			items: items,
			limit: limit,
			overflowLimit: mylists.overflowLimit
		};
		var d = jQuery.tmpl(jQuery("#mylistsWidget"), data);
		d.appendTo("#mylists-widget");

		mylists.addItemsList.pageReload();
	}
};

mylists.widget.init = function() {
	if (jQuery("#mylists-widget").length > 0) {
		var hashcode = jQuery("#gnc-landing-listid").val();
		var apiData = {
			hashcode: hashcode
		};

		mylists.ajax(mylists.vars.urls.getGNCLists, apiData, function(data, textStatus, jqXHR) {
			var items = [data[""].title, data[""].wishListItems, {
				loggedIn: loggedIn
			}];
			mylists.widget.show(items, mylists.vars.listItemLimit);
		});
	}
};

/*******************************************************************************
 *
 * Init
 *
 *******************************************************************************/
mylists.init = function() {
	if (jQuery("#mylist-wrap").length > 0) {
		mylists.vars.list = jQuery("#mylist-wrap");
		mylists.vars.page = "list";
	} else if (jQuery(".productDescriptionBlock").length > 0) {
		mylists.vars.page = "product";
	} else if (jQuery("body").hasClass("thanks")) {
		mylists.vars.page = "checkout";
	} else if (jQuery("body#cart-page").length > 0) {
		mylists.vars.page = "cart";
	}

	jQuery(document).on("click", ".add-items", function(event) {
		mylists.vars.currentButton = jQuery(event.target);
	});

	// defining templates here as they were null when defined above
	mylists.templates = {
		addedToList: jQuery("#addedToListTemplate").template(),
		alreadyAdded: jQuery("#alreadyAddedTemplate").template(),
		checkout: jQuery("#checkoutTemplate").template(),
		checkoutItemAdded: jQuery("#checkoutItemAddedTemplate").template(),
		createList: jQuery("#createListTemplate").template(),
		deleteItem: jQuery("#deleteItemTemplate").template(),
		deleteList: jQuery("#deleteListTemplate").template(),
		dropdown: jQuery("#dropdownTemplate").template(),
		maxItems: jQuery("#maxItemsTemplate").template(),
		mylistItem: jQuery("#mylistItemTemplate").template(),
		promo: jQuery("#promoTemplate").template()
	};

	// set up global handler for closing mylist-popups
	jQuery(document).on("click", ".mylist-popup .close, .mylist-popup .no, .mylist-popup .new-list, .mylist-popup .existing-list", function(event) {
		jQuery(jQuery(event.target).closest(".mylist-popup")).remove();
	});

	// set up global handler for closing the overlay
	jQuery(document).on("click", ".already-added-popup .close, .checkout-popup .close, .checkout-item-added .close", function(event) {
		mylists.overlay.hide();
	});

	mylists.addItemsList.init();
	mylists.addToCart.init();
	mylists.checkbox.init();
	mylists.checkout.init();
	mylists.clone.init();
	mylists.createList.init();
	mylists.deleteItem.init();
	mylists.deleteList.init();
	mylists.editDescription.init();
	mylists.editTitle.init();
	mylists.promo.init();
	mylists.widget.init();

	// sees if the page was loaded after clicking add-items and logging in
	mylists.addItemsList.pageLoad();
};

/*******************************************************************************
 *
 * Onload
 *
 *******************************************************************************/
jQuery(function() {
	mylists.init();
	createFilterDropDowns("product-search2", "productFilter2");
	createFilterDropDowns("product-search3", "productFilter3");
});