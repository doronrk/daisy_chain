pluckAppProxy.registerPlugin("pluck/reviews/reviews.js",
	// init function, called first time plugin is loaded:
	function ($, jQuery, dmJQuery){
		// Pull CSS.
		if (typeof(pluckAppProxy.pluck_reviews_load_css) === 'undefined') {
			window.pluckLoadScript(pluckAppProxy.genericBaseUrl + "Direct/JavascriptSDKProxy.js");
			pluckAppProxy.pluck_reviews_load_css = function(callback) {
				pluckAppProxy.pluck_load_css(function() {
					pluckAppProxy.loadCss("pluck/reviews/reviews.css", "pluck-reviews-css-loaded", function() {
						if(isIE6){
							pluckAppProxy.loadCss("pluck/reviews/reviews.ie6.css", "pluck-reviews-ie6-css-loaded", callback);
						} else if (callback) {
							callback();
						}
					});
				});
			};
		}
		pluckAppProxy.pluck_reviews_load_css(function() {
			if (isIE6 && typeof(DD_belatedPNG) == 'object') {
				DD_belatedPNG.fix('.pluck-review .pluck-png,.pluck-review .pluck-primary-button,.pluck-review .pluck-primary-button-text');
				DD_belatedPNG.fix('.pluck-review .pluck-secondary-button,.pluck-review .pluck-secondary-button-text');
				DD_belatedPNG.fix('.pluck-review .pluck-review-starsOutput-color, .pluck-review .pluck-review-starsOutput-color em, .pluck-review .pluck-review-starsOutput-overlay');
				DD_belatedPNG.fix('.pluck-review .pluck-review-attributesOutput span, .pluck-review .pluck-review-attributesOutput em, .pluck-review .pluck-review-attributesOutput-overlay');
			}
		});

		pluckAppProxy.pluck_reviews_list_refresh_url = function(params, anchor) {
			var u = document.location.href;
			var idx = u.indexOf("#");
			if (idx != -1) u = u.substring(0, idx);
			idx = u.indexOf("?");
			if (idx != -1) {
				var query = u.substring(idx + 1);
				u = u.substring(0, idx+1);
				var query = query.split("&");
				for (var i = 0; i < query.length; i++) {
					var idx = query[i].indexOf("=");
					if (idx != 1) {
						var key = query[i].substring(0, idx);
						var lkey = key.toLowerCase();
						var val = query[i].substring(idx+1);
						if (lkey != "plckreviewonpage" && lkey != "plckreviewitemsperpage" && lkey != "plckreviewsort" && lkey != "plckreviewfilter" && lkey != "plckreviewkey" && lkey != "plckreviewcreate" && lkey != "plckreviewlisttype") {
							u += key + "=" + val + "&";
						}
					}
				}
			} else u += "?";
			if (params.plckReviewOnPage != "1")	u += "plckReviewOnPage=" + params.plckReviewOnPage + "&";
			if (params.plckReviewItemsPerPage) u += "plckReviewItemsPerPage=" + params.plckReviewItemsPerPage + "&";
			if (params.plckReviewSort) u += "plckReviewSort=" + params.plckReviewSort + "&";
			if (params.plckReviewFilter) u += "plckReviewFilter=" + params.plckReviewFilter + "&";
			if (params.plckReviewKey) u += "plckReviewKey=" + params.plckReviewKey + "&";
			if (params.plckReviewListType) u += "plckReviewListType=" + params.plckReviewListType + "&";
			if (params.plckReviewCreate) u += "plckReviewCreate=" + params.plckReviewCreate + "&";
			u += "plckReviews=true"
			if (anchor) u = u + "#" + anchor;
			return u;
		};

		pluckAppProxy.pluck_reviews_process_dirtyWords = function(words) {
			var dirtyWords = $.isArray(words) ? words : words.split(",");
			var foundWordsDict = {};
			var foundWords = []
			for (var i = 0; i < dirtyWords.length; i++) {
				var w = dirtyWords[i];
				if (!foundWordsDict[w]) {
					foundWordsDict[w] = true;
					foundWords.push(w);
				}
			}
			var numWords = foundWords.length;
			if (numWords) {
				if (numWords > 5) {
					numWords -= 3;
					return foundWords.slice(0, 3).join(", ") + " and " + numWords + " others";
				} else return foundWords.join(", ");
			}
			return "";
		};

		pluckAppProxy.pluck_reviews_cleanClientUrl = function() {
			var url = document.location.href;
			var params = [ "plckReviews", "plckReviewCreate", "plckReviewOnPage", "plckReviewFilter", "plckReviewSort", "plckReviewKey" ];
			for (var i = 0; i < params.length; i++) {
				var idx = url.toLowerCase().indexOf(params[i].toLowerCase());
				if (idx == -1) continue;
				var idx2 = url.indexOf("&", idx);
				if (idx2 == -1) url = url.substring(0, idx - 1);
				else url = url.substring(0, idx) + url.substring(idx2 + 1);
			}
			return url;
		};

		/**************************************
		 *
		 * pluck/reviews/submit
		 *
		 **************************************/
		if (typeof(pluckAppProxy.pluck_reviews_submit) === 'undefined') {
			pluckAppProxy.pluck_reviews_submit = function (topId, params, prefs) {
				var top = $(topId);
				top.data("params", params);

				var recordInteraction = function(name) {
					if (typeof(pluckAppProxy.pluck_formAbandonTracker_update) === 'function') {
						pluckAppProxy.pluck_formAbandonTracker_update("review" + params.plckReviewOnKey, name);
					}
				}

				// Special fix for IE7
				if ($.browser.msie && $.browser.version == 7) {
					$(".pluck-review-create-review-post", top).addClass("pluck-review-create-review-post-ie7");
				}
				if ($(".pluck-social-syndication-connect", top).length > 0) {
					$(".pluck-review-create-review-post", top).show();
				}
				var ckEditor = null;
				if (prefs.CKEditorEnabled && $("#pluck-review-body").length > 0) {
					var replaceCK = function() {
						if (typeof(CKEDITOR) != 'undefined') {
							var ckParams = pluckAppProxy.generateCKEditorParams(prefs.CKEditorConfig, true, true);
							CKEDITOR.replace("pluck-review-body", ckParams);
							ckEditor = CKEDITOR.instances["pluck-review-body"];
							ckEditor.on("key", function() { recordInteraction("body"); });
						} else {
							setTimeout(replaceCK, 100);
						}
					};
					replaceCK();
				}

				var photoTop = $(".pluck-review-create-review-desc-photoadd", top);
				var photoAdd = $(".pluck-review-create-review-desc-photoadd-file", photoTop);
				var photoAddBtn = $("span.pluck-review-create-review-desc-photoadd-file-text1", photoAdd);
				var photoAnotherBtn = $("span.pluck-review-create-review-desc-photoadd-file-text2", photoAdd);
				var photoAddInfo = $("div.pluck-review-create-review-desc-photoadd-info-wrap", photoAdd);
				var photoAddTitle = $("input.pluck-review-create-review-photoTitle", photoAdd);
				var photoAddDesc = $("textarea.pluck-review-create-review-photoDesc", photoAdd);
				var photoAddFilename = $("div.pluck-review-create-review-desc-photoadd-filename", photoAdd);

				var createPhotoDiv = function(count) {
					var p = { locator: count, top: $(".pluck-review-create-review-desc-photo" + count, photoTop) };
					if (p.top.length == 0) return null;

					p.inputs = { key: $("input.pluck-review-create-review-photoKey", p.top),
							 imageId: $("input.pluck-review-create-review-photoImageId", p.top),
							 title: $("input.pluck-review-create-review-photoTitle", p.top),
							 desc: $("input.pluck-review-create-review-photoDesc", p.top),
							 src: $("input.pluck-review-create-review-photoSrc", p.top) };
					p.display = { title: $(".pluck-review-create-review-desc-photoattached-title", p.top),
							  desc: $(".pluck-review-create-review-desc-photoattached-desc", p.top),
							  src: $(".pluck-review-create-review-desc-photoattached-thumb", p.top) };
					p.data = { key: p.inputs.key.val(), imageId: p.inputs.imageId.val(), title: p.inputs.title.val(), desc: p.inputs.desc.val(), src: p.inputs.src.val() };
					p.defaults = { title: "", desc: "" };
					if (count == "edit") {
						p.data.title = prefs.defaultPhotoTitle;
						p.data.desc = prefs.defaultPhotoDesc;
						p.defaults = { title: prefs.defaultPhotoTitle, desc: prefs.defaultPhotoDesc };
						p.inputs.desc = $("textarea.pluck-review-create-review-photoDesc", p.top)
					}

					p.initialize = function() {
						this.inputs.key.val(this.data.key); this.inputs.imageId.val(this.data.imageId); 
						this.inputs.title.val(this.data.title); this.inputs.desc.val(this.data.desc); this.inputs.src.val(this.data.src);
						if (this.defaults.title != "") this.inputs.title.toggleClass("pluck-review-create-review-photoTitle-active", this.data.title != this.defaults.title);
						if (this.defaults.desc != "") this.inputs.desc.toggleClass("pluck-review-create-review-photoDesc-active", this.data.desc != this.defaults.desc);
						this.display.title.html(this.data.title); this.display.desc.html(this.data.desc); this.display.src.attr("src", this.data.src);
						this.top.toggle(this.data.title != this.defaults.title);
					};

					p.clear = function() { 
						this.data.key = this.data.imageId = this.data.src = ""; this.data.title = this.defaults.title; this.data.desc = this.defaults.desc;
						this.initialize();
					};

					p.copyTo = function(to) {
						to.data.key = this.data.key;
						to.data.imageId = this.data.imageId;
						to.data.title = this.defaults.title == this.data.title ? to.defaults.title : this.data.title;
						to.data.desc = this.defaults.desc == this.data.desc ? to.defaults.desc : this.data.desc;
						to.data.src = this.data.src;
						to.initialize();
					};
					return p;
				}

				var deletedPhotos = $(".pluck-review-create-review-deletedPhotoKeys", photoTop);
				var photoDivs = [];
				var count = 0;
				var pDiv = createPhotoDiv(count++);
				while (pDiv) {
					photoDivs.push(pDiv);
					pDiv = createPhotoDiv(count++);
				}
				photoDivs.push(createPhotoDiv("edit"));

				var slideUp = function(div, cb) {
					if (isIE6) {
						div.hide();
						$("a.pluck-footer-logo").hide();
						if (cb) cb();
						$("a.pluck-footer-logo").show();
					} else {
						div.slideUp("medium", cb);
					}
				};
				var slideDown = function(div, cb) {
					if (isIE6) {
						div.show();
						$("a.pluck-footer-logo").hide();
						if (cb) cb();
						$("a.pluck-footer-logo").show();
					} else {
						div.slideDown("medium", cb);
					}
				};

				var updatePhotoAddButtons = function() {
					slideUp(photoAddInfo, function() {
						photoAddTitle.val("");
						photoAddTitle.removeClass("pluck-review-create-review-photoTitle-active");
						photoAddDesc.val(prefs.defaultPhotoDesc);
						photoAddDesc.removeClass("pluck-review-create-review-photoDesc-active");
						photoAddFilename.html("");
					});
					var i = 0;
					while (i < photoDivs.length - 1) {
						var pDiv = photoDivs[i];
						if (!pDiv.data.imageId) break;
						i++;
					}
					photoAdd.toggle(i != photoDivs.length - 1);
					photoAddBtn.toggle(i == 0);
					photoAnotherBtn.toggle(i != 0);
				};
				var updatePhoto = function(type, photoCount, photoKey, imageSrc) {
					slideUp(photoTop, function() {
						try {
							var cnt = typeof(photoCount) == 'string' ? parseInt(photoCount) : photoCount;
							if (type == "delete") {
								deletedPhotos.val((deletedPhotos.val() ? deletedPhotos.val() + ";" : "") + photoDivs[cnt].data.key);
								for (var i = cnt; i < photoDivs.length - 2; i++) {
									photoDivs[i+1].copyTo(photoDivs[i]);
								}
								photoDivs[photoDivs.length - 2].clear();
								updatePhotoAddButtons();
							} else if (type == "edit") {
								var pDiv = photoDivs[cnt];
								var pEdit = photoDivs[photoDivs.length - 1];
								pEdit.data.editPhoto = cnt;
								pDiv.copyTo(pEdit);
								photoAdd.hide();
								pEdit.top.show();
								for (var i = 0; i < photoDivs.length - 1; i++) {
									photoDivs[i].top.hide();
								}
							} else if (type == "show") {
								var pEdit = photoDivs[photoDivs.length - 1];
								var cnt = pEdit.data.editPhoto;
								var pDiv = photoDivs[cnt];
								pEdit.data.editPhoto = photoDivs.length - 1;
								pEdit.copyTo(pDiv);
								pEdit.clear();
								for (var i = 0; i < photoDivs.length; i++) photoDivs[i].initialize();
								updatePhotoAddButtons();
							} else if (type == "cancel") {
								var pEdit = photoDivs[photoDivs.length - 1];
								pEdit.data.editPhoto = photoDivs.length - 1;
								pEdit.clear();
								for (var i = 0; i < photoDivs.length; i++) photoDivs[i].initialize();
								updatePhotoAddButtons();
							} else if (type == "upload") {
								var pDiv = photoDivs[cnt];
								var pEdit = photoDivs[photoDivs.length - 1];
								pEdit.data.editPhoto = cnt;
								pEdit.data.src = imageSrc;
								pEdit.top.show();
								for (var i = 0; i < photoDivs.length - 1; i++) {
									photoDivs[i].top.hide();
								}
								photoAdd.hide();
							}
							slideDown(photoTop);
						} catch(e) { alert(e.message); }
					});
				}

				var checkInputs = function(p, forSDK) {
					$('.pluck-error-message, .pluck-confirm-message', top).hide();
					var focusField = null;
					var success = true;

					var rating = $(".pluck-review-create-review-rating-input", top).val();
					if (rating == "0") {
						var rerr = $(".pluck-review-noRating-error", top);
						pluckAppProxy.fadeIn(rerr, function() {
							pluckAppProxy.ensureOnScreen(rerr, function() {
								$(".pluck-review-create-rate-this", top).focus();
							});
						});
						success = false;
					}

					var title = $(".pluck-review-create-review-title-input", top).val();
					title = $.trim(title);
					if (!title) {
						var tSuccess = success;
						var terr = $(".pluck-review-noTitle-error", top);
						pluckAppProxy.fadeIn(terr, function() {
							if (tSuccess) {
								pluckAppProxy.ensureOnScreen(terr, function() {
									focusField = $(".pluck-review-create-review-title", top);
								});
							}
						});
						success = false;
					}

					var body = ""
					if (ckEditor) {
						body = ckEditor.getData();
					} else {
						body = $(".pluck-review-create-review-desc-input", top).val();
					}
					body = $.trim(body);
					if (!body) {
						var bSuccess = success;
						var berr = $(".pluck-review-noBody-error", top);
						pluckAppProxy.fadeIn(berr, function() {
							if (bSuccess) {
								pluckAppProxy.ensureOnScreen(berr, function() {
									if (ckEditor) ckEditor.focus();
									else $(".pluck-review-create-review-desc", top).focus();
								});
							}
						});
						success = false;
					} else if (body.length > prefs.maxDescriptionLength) {
						var bSuccess = success;
						var berr = $(".pluck-review-bodyTooLong-error", top);
						pluckAppProxy.fadeIn(berr, function() {
							if (bSuccess) {
								pluckAppProxy.ensureOnScreen(berr, function() {
									if (ckEditor) ckEditor.focus();
									else $(".pluck-review-create-review-desc", top).focus();
								});
							}
						});
						success = false;
					}

					if (!success) {
						return false;
					}

					pluckAppProxy.displayWait($('.pluck-reviews-working', top));

					var pros = $(".pluck-review-create-review-pros-input", top).val();
					pros = $.trim(pros);

					var cons = $(".pluck-review-create-review-cons-input", top).val();
					cons = $.trim(cons);

					var recommend = $(".pluck-review-create-review-rec-input:checked", top).val();
					if (!recommend) recommend = "false";

					if (forSDK) {
						if (params.plckReviewOnKeyType == "article") {
							p.ReviewedKey = new PluckSDK.ExternalResourceKey({ Key: params.plckReviewOnKey });
							p.OnPageUrl = params.plckArticleUrl;
							p.OnPageTitle = params.plckArticleTitle;
						}
						if (params.plckReviewKey) p.ReviewKey = new PluckSDK.ReviewKey({ Key: params.plckReviewKey });
						p.ReviewTitle = title;
						p.ReviewRating = parseInt(rating);
						p.ReviewBody = body;
						p.ReviewPros = pros;
						p.ReviewCons = cons;
						p.ReviewPhotoKeys = [];
						for (var i = 0; i < photoDivs.length - 1; i++)
							if (photoDivs[i].data.key) p.ReviewPhotosKeys.push(new PluckSDK.PhotoKey({ Key: photoDivs[i].data.key }));
						p.ReviewVideoKeys = [];
						p.AttributeRatings = [];
						$(".pluck-review-create-review-attribute-single", top).each(function() {
							var me = $(this);
							var key = $(".pluck-review-create-review-attr-key", me).val();
							var val = $(".pluck-review-create-review-attr-val", me).val();
							if (val) p.AttributeRatings.push(new PluckSDK.ReviewRatingAttributeValue({ Key: new PluckSDK.ReviewRatingAttributeKey({ Key: key }), Value: val }));
						});
						p.AuthorAttributes = [];
						$(".pluck-review-create-review-author-attribute-single", top).each(function() {
							var me = $(this);
							var key = $(".pluck-review-create-review-author-attr-key", me).val();
							var val = "";
							if ($("select", me).length > 0) {
								var selval = $("select", me).val();
								if ($.isArray(selval)) {
									for (var i = 0; i < selval.length; i++) {
										if (selval[i] == "") continue;
										if (!val) val = [];
										val.push(new PluckSDK.ReviewAuthorAttributeOptionKey({ Key: selval[i] }));
									}
								} else if (selval) {
									val = [ new PluckSDK.ReviewAuthorAttributeOptionKey({ Key: selval }) ];
								}
							} else if ($("input:radio:checked", me).length > 0) {
								val = [ new PluckSDK.ReviewAuthorAttributeOptionKey({ Key: $("input:radio:checked", me).val() }) ];
							} else if ($("input:checkbox:checked", me).length > 0) {
								$("input:checkbox:checked", me).each(function() {
									if (!val) val = [];
									val.push(new PluckSDK.ReviewAuthorAttributeOptionKey({ Key: $(this).val() }));
								});
							} else if ($("input:text", me).length > 0) {
								val = $.trim($("input:text", me).val());
							}

							if ($.isArray(val)) {
								p.AuthorAttributes.push(new PluckSDK.ReviewAuthorAttributeValue({ Key: new PluckSDK.ReviewAuthorAttributeKey({ Key: key }), ValueKeys: val }));
							} else if (val) {
								p.AuthorAttributes.push(new PluckSDK.ReviewAuthorAttributeValue({ Key: new PluckSDK.ReviewAuthorAttributeKey({ Key: key }), ValueFreeText: val }));
							}
						});

						p.ReviewIsRecommended = recommend == "true"
						if (params.plckDiscoverySection) p.Section = new PluckSDK.DiscoverySection({ Name: params.plckDiscoverySection });
						p.Categories = [];
						if (params.plckDiscoveryCategories) {
							var cats = params.plckDiscoveryCategories.split(",");
							for (var i = 0; i < cats.length; i++) if ($.trim(cats[i])) p.Categories.push(new PluckSDK.DiscoveryCategory({ Name: $.trim(cats[i]) }));
						}
						if (params.plckReviewRatingAttributeSetKey) p.ReviewRatingAttributeSetKey = new PluckSDK.ReviewRatingAttributeSetKey({ Key: params.plckReviewRatingAttributeSetKey });
						if (params.plckReviewAuthorAttributeSetKey) p.ReviewAuthorAttributeSetKey = new PluckSDK.ReviewAuthorAttributeSetKey({ Key: params.plckReviewAuthorAttributeSetKey });

					} else {
						$.extend(p, params, {
							plckReviewTitle: title, plckReviewRating: rating, plckReviewBody: body,
							plckReviewPros: pros, plckReviewCons: cons, plckReviewRecommend: recommend
						});

						for (var i = 0; i < photoDivs.length - 1; i++) {
							p["plckReviewPhotoKey" + i] = photoDivs[i].data.key;
							p["plckReviewPhotoImageId" + i] = photoDivs[i].data.imageId;
							p["plckReviewPhotoTitle" + i] = photoDivs[i].data.title;
							p["plckReviewPhotoDesc" + i] = photoDivs[i].data.desc;
						}
						p["plckReviewDeletedPhotoKeys"] = deletedPhotos.val();
						$(".pluck-review-create-review-attribute-single", top).each(function() {
							var me = $(this);
							var attrcount = me.attr("attrcount");
							p["plckReviewAttrKey" + attrcount] = $(".pluck-review-create-review-attr-key", me).val();
							p["plckReviewAttrName" + attrcount] = $(".pluck-review-create-review-attr-name", me).val();
							p["plckReviewAttrVal" + attrcount] = $(".pluck-review-create-review-attr-val", me).val();
						});
						$(".pluck-review-create-review-author-attribute-single", top).each(function() {
							var me = $(this);
							var attrcount = me.attr("attrcount");
							var key = $(".pluck-review-create-review-author-attr-key", me).val();
							p["plckReviewAuthorKey" + attrcount] = $(".pluck-review-create-review-author-attr-key", me).val();
							if ($("select", me).length > 0) {
								var selval = $("select", me).val();
								if ($.isArray(selval)) {
									if (selval.length > 0) {
										p["plckReviewAuthorKeyVals" + attrcount] = selval.join(",");
									}
								} else if (selval) {
									p["plckReviewAuthorKeyVals" + attrcount] = selval;
								} else {
									p["plckReviewAuthorKeyVals" + attrcount] = "";
								}
							} else if ($("input:radio:checked", me).length > 0) {
								p["plckReviewAuthorKeyVals" + attrcount] = $("input:radio:checked", me).val() || "";
							} else if ($("input:checkbox:checked", me).length > 0) {
								var vals = []
								$("input:checkbox:checked", me).each(function() {
									vals.push($(this).val());
								});
								if (vals.length) {
									p["plckReviewAuthorKeyVals" + attrcount] = vals.join(",");
								} else {
									p["plckReviewAuthorKeyVals" + attrcount] = "";
								}
							} else if ($("input:text", me).length > 0) {
								p["plckReviewAuthorTextVal" + attrcount] = $.trim($("input:text", me).val());
							}
						});

						if ($("input.pluck-social-syndication-facebook:checked", top).val()) p.plckFacebookLink = "true";
						else p.plckFacebookLink = "false";
						if ($("input.pluck-social-syndication-twitter:checked", top).val()) p.plckTwitterLink = "true";
						else p.plckTwitterLink = "false";
						if ($("input.pluck-social-syndication-linkedIn:checked", top).val()) p.plckLinkedInLink = "true";
						else p.plckLinkedInLink = "false";
					}
					return true;
				};

				$("a.pluck-review-create-review-star", top).hover(function() {
					$(this).prevAll('a').addClass('pluck-review-create-review-star-active');
				}, function() {
					$(this).prevAll('a').removeClass('pluck-review-create-review-star-active');
				});

				$("a.pluck-review-create-review-star", top).click(function() {
					recordInteraction("star");
					$(this).siblings('a').removeClass('pluck-review-create-review-star-clicked');
					$(this).addClass('pluck-review-create-review-star-clicked');
					$(this).prevAll('a').addClass('pluck-review-create-review-star-clicked');
					$('input.pluck-review-create-review-rating-input', top).val($(this).attr("rating"));
					return false;
				});

				$("input.pluck-review-create-review-title-input", top).keyup(function() {
					recordInteraction("name");
				});

				$("a.pluck-review-create-review-slide", top).hover(function() {
					$(this).prevAll('a').addClass('pluck-review-create-review-slide-active');
				}, function() {
					$(this).prevAll('a').removeClass('pluck-review-create-review-slide-active');
				});

				$("a.pluck-review-create-review-slide", top).click(function() {
					var attrTop = $(this).parents(".pluck-review-create-review-attribute-single");
					recordInteraction($("input.pluck-review-create-review-attr-key", attrTop).val());
					$(this).siblings('a').removeClass('pluck-review-create-review-slide-clicked');
					$(this).addClass('pluck-review-create-review-slide-clicked');
					$(this).prevAll('a').addClass('pluck-review-create-review-slide-clicked');
					$('input.pluck-review-create-review-attr-val', attrTop).val($(this).attr("rating"));
					return false;
				});

				$("a.pluck-review-attribute-clear", top).click(function() {
					var attrTop = $(this).parents(".pluck-review-create-review-attribute-single");
					recordInteraction($("input.pluck-review-create-review-attr-key", attrTop).val());
					$("a.pluck-review-create-review-slide", attrTop).removeClass('pluck-review-create-review-slide-active');
					$("a.pluck-review-create-review-slide", attrTop).removeClass('pluck-review-create-review-slide-clicked');
					$('input.pluck-review-create-review-attr-val', attrTop).val("0");
					return false;
				});

				$("input.pluck-review-create-review-pros-input", top).keyup(function() {
					recordInteraction("pros");
				});

				$("input.pluck-review-create-review-cons-input", top).keyup(function() {
					recordInteraction("cons");
				});

				var lastKeyTimeout = null;
				$("textarea.pluck-review-create-review-desc-input", top).keyup(function() {
					recordInteraction("desc");
					if (lastKeyTimeout) clearTimeout(lastKeyTimeout);
					var me = $(this);
					lastKeyTimeout = setTimeout(function() {
						var remaining = prefs.maxDescriptionLength - me.val().length;
						var wrap = $(".pluck-review-create-review-counter-wrapper", top);
						$(".pluck-review-create-review-counter-count", wrap).html(remaining < 0 ? remaining * -1 : remaining);
						$(".pluck-review-create-review-counter-50", wrap).toggle(remaining == 0 || remaining > 1);
						$(".pluck-review-create-review-counter-1", wrap).toggle(remaining == 1);
						$(".pluck-review-create-review-over-counter-1", wrap).toggle(remaining == -1);
						$(".pluck-review-create-review-over-counter-50", wrap).toggle(remaining < -1);
						wrap.toggle(remaining < 50);
					}, 500);
				});

				$("input.pluck-review-create-review-rec-input", top).click(function() {
					recordInteraction("recommend");
				});

				$(".pluck-review-create-review-author-attribute-single input:checkbox", top).click(function() {
					var attr = $(this).parents(".pluck-review-create-review-author-attribute-single");
					recordInteraction($("input.pluck-review-create-review-author-attr-key", attr).val());
				});

				$(".pluck-review-create-review-author-attribute-single input:radio", top).each(function() {
					var rb = $(this);
					var attr = rb.parents(".pluck-review-create-review-author-attribute-single");
					if (rb.is(":checked")) attr.data("lastSel", rb.val());
				});


				$(".pluck-review-create-review-author-attribute-single input:radio", top).click(function() {
					var attr = $(this).parents(".pluck-review-create-review-author-attribute-single");
					recordInteraction($("input.pluck-review-create-review-author-attr-key", attr).val());

					var attrData = attr.data("lastSel") || "";

					$("input:radio", attr).removeAttr("checked");
					if ($(this).val() == attrData) {
						attr.data("lastSel", "");
					} else {
						$(this).attr("checked", "true");
						attr.data("lastSel", $(this).val());
					}
				});

				$(".pluck-review-create-review-author-attribute-single select", top).change(function() {
					var attr = $(this).parents(".pluck-review-create-review-author-attribute-single");
					recordInteraction($("input.pluck-review-create-review-author-attr-key", attr).val());
				});

				$(".pluck-review-create-review-author-attribute-single input:text", top).keyup(function() {
					var attr = $(this).parents(".pluck-review-create-review-author-attribute-single");
					recordInteraction($("input.pluck-review-create-review-author-attr-key", attr).val());
				});

				var swfUploader = null;
				var fromCancel = false;
				var uploadFileId = null;
				if (!pluckAppProxy.hasFlash) {
					$(".pluck-review-create-review-desc-photoadd-file", top).hide();
					setTimeout(function() { $(".pluck-review-create-review-photoadd-noFlash", top).show(); }, 1000);
				} else {
					var buttonReplace = $(".pluck-review-create-review-desc-photoadd-button", top);
					var styleStr = ".theFont {font-family: " + buttonReplace.css("font-family") + "; font-size: " + buttonReplace.css("font-size") + "; color: " + pluckAppProxy.pluck_rgbToHex(buttonReplace.css("color")) + ";}";
					var initSwfUpload = function(callback) {
						// If swfupload's swfs aren't ready, wait and retry.
						if(!window.SWFUpload){
							setTimeout(function(){initSwfUpload(callback);}, 100);
						}
						
						if(!swfUploader){
							swfUploader = new SWFUpload({
								upload_url: pluckAppProxy.genericBaseUrl + "/Review/UploadImageToReview",
								flash_url: pluckAppProxy.genericBaseUrl + "/Content/ua/swf/swfupload_f10.swf",
								file_size_limit: prefs.photoSizeLimit,
								file_types: prefs.photoFileTypes,
								upload_success_handler: function(file, serverData) {
									uploadFileId = null;
									$(".pluck-error-message", photoAdd).hide();
									var parsedServerData = serverData.slice(serverData.lastIndexOf('>') + 3);
									if (parsedServerData.indexOf('Error') !== -1) {
										$('.pluck-reviews-working', top).hide();
										$(".pluck-review-error-detail", top).html(parsedServerData);
										if (parsedServerData.indexOf("too large") != -1) {
											pluckAppProxy.fadeIn($(".pluck-review-photo-too-large-error", top));
										} else {
											pluckAppProxy.fadeIn($(".pluck-review-aphoto-general-error", top));
										}
										$(".pluck-review-create-review-desc-photoadd-add", top).hide();
									} else {
										var params = { contentType: "Json", plckImageId: parsedServerData };
										var cmd = new PluckSDK.ImageRequest({ ImageId: parsedServerData });
										PluckSDK.SendRequests(cmd, function(responses) {
											$('.pluck-reviews-working', top).hide();
											var data = responses[0];
											if (data.ResponseStatus.StatusCode != PluckSDK.ResponseStatusCode.OK) {
												var results = pluckAppProxy.analyzeError(data.status, data.errorMsg);
												$(".pluck-review-error-detail", top).html("errorCode: " + results.errorCode + ", errorMsg: " + results.errorMsg + ", fieldName: " + results.fieldName + ", fieldValue: " + results.fieldValue);
												pluckAppProxy.fadeIn($(".pluck-review-aphoto-general-error", photoAdd));
												$(".pluck-review-create-review-desc-photoadd-add", top).hide();
											} else {
												for (var i = 0; i < photoDivs.length - 1; i++) {
													var pDiv = photoDivs[i];
													if (!pDiv.data.imageId) {
														pDiv.data.key = "";
														pDiv.data.imageId = data.Image.ImageId
														pDiv.data.src = data.Image.SmallPendingApproval;
														var photoDesc = $.trim(photoAddDesc.val());
														if (photoDesc == prefs.defaultPhotoDesc) photoDesc = "";
														pDiv.data.title = $.trim(photoAddTitle.val());
														pDiv.data.desc = photoDesc;
														break;
													}
												}
												for (var i = 0; i < photoDivs.length; i++) photoDivs[i].initialize();
												updatePhotoAddButtons();
												recordInteraction("addPhoto");
											}
										});
									}
								},
								upload_error_handler: function(file, errorCode, message) {
									if (fromCancel) {
										fromCancel = false;
										return;
									}
									$(".pluck-error-message", photoAdd).hide();
									$('.pluck-reviews-working', top).hide();
									var msg = "Flash uploader error code: " + errorCode + ", Message: " + message;
									$(".pluck-review-error-detail", top).html(msg);
									pluckAppProxy.fadeIn($(".pluck-review-aphoto-general-error", photoAdd));
									uploadFileId = null;
									$(".pluck-review-create-review-desc-photoadd-add", top).hide();
								},
								file_queued_handler: function(file) {
									if (uploadFileId) {
										fromCancel = true;
										initSwfUpload(function(){
											swfUploader.cancelUpload(uploadFileId, false);
										});
										
									}
									uploadFileId = file.id;
									$(".pluck-error-message", photoAdd).hide();
									$(".pluck-review-create-review-desc-photoadd-add", top).show();
									photoAddFilename.html(file.name);
									var idx = file.name.indexOf(".");
									photoAddTitle.val(idx == -1 ? file.name : file.name.substring(0, idx));
									photoAddTitle.removeClass("pluck-review-create-review-photoTitle-active");
									photoAddDesc.val(prefs.defaultPhotoDesc);
									photoAddDesc.removeClass("pluck-review-create-review-photoDesc-active");
									slideDown(photoAddInfo, function() {
										if ($.browser.msie) photoAddInfo.show();
									});
									return true;
								},
								prevent_swf_caching: true,
								button_image_url: pluckAppProxy.genericBaseUrl + '/content/ua/images/pluck-swf-uploader-button-sprite-basic.gif',
								button_width: '130',
								button_height: '25',
								button_placeholder_id: 'pluckSelectFiles',
								button_cursor: SWFUpload.CURSOR.HAND,
								button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
								button_text: '<span class="theFont">' + prefs.swfButtonLabel + '</span>',
								button_text_style: styleStr,
								button_text_left_padding: '30',
								button_text_top_padding: '1'
							});
						}
						
						// Wait for the swf itself to be ready before we start with the callbacks.
						// flashReady will throw if not ready...
						try{
							swfUploader.flashReady();
							if(callback){
								callback();
							}
						}
						catch(e){
							setTimeout(function(){
								initSwfUpload(callback);
							}, 100);
						}
					};
					initSwfUpload();
				}

				$(".pluck-review-delete-control-link", top).click(function() {
					recordInteraction("deletePhoto");
					updatePhoto("delete", $(this).attr("photocount"));
					return false;
				});
				
				$(".pluck-review-edit-control-link", top).click(function() {
					updatePhoto("edit", $(this).attr("photocount"));
					return false;
				});

				$("div.pluck-review-create-review-desc-photoedit-title input, div.pluck-review-create-review-desc-photoadd-title input", top).focus(function() {
					if (!$(this).hasClass("pluck-review-create-review-photoTitle-active")) {
						$(this).addClass("pluck-review-create-review-photoTitle-active");
					}
					return true;
				});
				$("div.pluck-review-create-review-desc-photoedit-title input, div.pluck-review-create-review-desc-photoadd-title input", top).blur(function() {
					if (!$.trim($(this).val())) {
						$(this).removeClass("pluck-review-create-review-photoTitle-active");
					}
					return true;
				});
				$("div.pluck-review-create-review-desc-photoedit-desc textarea, div.pluck-review-create-review-desc-photoadd-desc textarea", top).focus(function() {
					if ($.trim($(this).val()) == prefs.defaultPhotoDesc) {
						$(this).val("");
						$(this).addClass("pluck-review-create-review-photoDesc-active");
					}
					return true;
				});
				$("div.pluck-review-create-review-desc-photoedit-desc textarea, div.pluck-review-create-review-desc-photoadd-desc textarea", top).blur(function() {
					if (!$.trim($(this).val())) {
						$(this).val(prefs.defaultPhotoDesc);
						$(this).removeClass("pluck-review-create-review-photoDesc-active");
					}
					return true;
				});

				$(".pluck-review-create-review-desc-photoadd-cancel", top).click(function() {
					fromCancel = true;
					initSwfUpload(function(){
						swfUploader.cancelUpload(uploadFileId, false);
					});
					updatePhotoAddButtons();
					return false;
				});

				$(".pluck-review-create-review-desc-photoadd-add", top).click(function() {
					$(".pluck-error-message", photoAdd).hide();
					var photoTitle = $.trim(photoAddTitle.val());
					if (!photoTitle) {
						pluckAppProxy.fadeIn($(".pluck-review-noPhotoTitle-error", photoAdd));
						photoAddTitle.focus();
						return false;
					}
					var photoDesc = $.trim(photoAddDesc.val());
					if (photoDesc == prefs.defaultPhotoDesc) photoDesc = "";

					pluckAppProxy.displayWait($(".pluck-reviews-working", top));

					if (prefs.checkFilteredWords) {
						var wordPairs = [];
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Title", Value: photoTitle }));
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Description", Value: photoDesc }));
						var cmd = new PluckSDK.CheckFilteredWordsRequest({ CheckStrings: wordPairs });
						PluckSDK.SendRequests(cmd, function(responses) {
							var data = responses[0];
							var badwords = [];
							for (var i = 0; i < data.Results.length; i++) {
								var val = data.Results[i].Value;
								if (val) {
									badwords.push(val);
								}
							}
							if (badwords.length) {
								$('.pluck-reviews-working', top).hide();
								var words = pluckAppProxy.pluck_reviews_process_dirtyWords(badwords);
								$(".pluck-review-aphoto-badword-list", photoAdd).html(words);
								pluckAppProxy.fadeIn($(".pluck-review-aphoto-badword-error", photoAdd));
							} else {
								photoAddTitle.val(photoTitle);
								photoAddDesc.val(photoDesc);
								initSwfUpload(function(){
									swfUploader.addPostParam("reviewKey", params.plckReviewKey ? params.plckReviewKey : "" + new Date().getTime());
									swfUploader.startUpload(uploadFileId);
								});
							}
						});
					} else {
						photoAddTitle.val(photoTitle);
						photoAddDesc.val(photoDesc);
						initSwfUpload(function(){
							swfUploader.addPostParam("reviewKey", params.plckReviewKey ? params.plckReviewKey : "" + new Date().getTime());
							swfUploader.startUpload(uploadFileId);
						});
					}
					return false;
				});

				$(".pluck-review-create-review-desc-photoedit-cancel", top).click(function() {
					var pEdit = photoDivs[photoDivs.length - 1];
					$(".pluck-error-message", pEdit.top).hide();
					updatePhoto("cancel");
					return false;
				});
				
				$(".pluck-review-create-review-desc-photoedit-add", top).click(function() {
					var pEdit = photoDivs[photoDivs.length - 1];
					$(".pluck-error-message", pEdit.top).hide();
					var photoTitle = $.trim(pEdit.inputs.title.val());
					if (!photoTitle) {
						pluckAppProxy.fadeIn($(".pluck-review-noPhotoTitle-error", pEdit.top));
						pEdit.inputs.title.focus();
						return false;
					}
					var photoDesc = $.trim(pEdit.inputs.desc.val());
					if (photoDesc == prefs.defaultPhotoDesc) photoDesc = "";

					if (prefs.checkFilteredWords) {
						pluckAppProxy.displayWait($(".pluck-reviews-working", top));
						var wordPairs = [];
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Title", Value: photoTitle }));
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Description", Value: photoDesc }));
						var cmd = new PluckSDK.CheckFilteredWordsRequest({ CheckStrings: wordPairs });
						PluckSDK.SendRequests(cmd, function(responses) {
							var data = responses[0];
							var badwords = [];
							for (var i = 0; i < data.Results.length; i++) {
								var val = data.Results[i].Value;
								if (val) {
									badwords.push(val);
								}
							}
							$('.pluck-reviews-working', top).hide();
							if (badwords.length) {
								var words = pluckAppProxy.pluck_reviews_process_dirtyWords(badwords);
								$(".pluck-review-ephoto-badword-list", top).html(words);
								pluckAppProxy.fadeIn($(".pluck-review-ephoto-badword-error", top));
							} else {
								pEdit.data.title = photoTitle;
								pEdit.data.desc = photoDesc;
								updatePhoto("show");
							}
						});
					} else {
						pEdit.data.title = photoTitle;
						pEdit.data.desc = photoDesc;
						updatePhoto("show");
					}
					return false;
				});

				$(".pluck-review-create-review-preview", top).click(function() {
					var p = { contentType: "Html"};
					if (!checkInputs(p, false)) {
						return false;
					}
					
					pluckAppProxy.closeDialogs();
					pluckAppProxy.displayWait($(".pluck-reviews-working", top));

					if (prefs.checkFilteredWords) {
						var wordPairs = [];
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Title", Value: p.plckReviewTitle }));
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Description", Value: p.plckReviewBody }));
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Pros", Value: p.plckReviewPros }));
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Cons", Value: p.plckReviewCons }));

						$(".pluck-review-create-review-author-attribute-single", top).each(function() {
							var me = $(this);
							if ($("input:text", me).length > 0) {
								var valueFreeText = $.trim($("input:text", me).val());
								if (valueFreeText) wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "ValueFreeText", Value: valueFreeText }));
							}
						});
						var cmd = new PluckSDK.CheckFilteredWordsRequest({ CheckStrings: wordPairs });
						PluckSDK.SendRequests(cmd, function(responses) {
							var data = responses[0];
							var badwords = [];
							for (var i = 0; i < data.Results.length; i++) {
								var val = data.Results[i].Value;
								if (val) {
									badwords.push(val);
								}
							}
							if (badwords.length) {
								$('.pluck-reviews-working', top).hide();
								var words = pluckAppProxy.pluck_reviews_process_dirtyWords(badwords);
								$(".pluck-review-badword-list", top).html(words);
								pluckAppProxy.fadeIn($(".pluck-review-badword-error", top));
							} else {
								if (ckEditor) ckEditor.destroy();
								if(pluckAppProxy.debugLevel) p.debug = pluckAppProxy.debugLevel;
								pluckAppProxy.ensureOnScreen(top, function() {
									pluckAppProxy.callApp("pluck/reviews/preview.app", p, function(data) {
										top.replaceWith(data);
									});
								});
							}
						});
					} else {
						if (ckEditor) ckEditor.destroy();
						if(pluckAppProxy.debugLevel) p.debug = pluckAppProxy.debugLevel;
						pluckAppProxy.ensureOnScreen(top, function() {
							pluckAppProxy.callApp("pluck/reviews/preview.app", p, function(data) {
								top.replaceWith(data);
							});
						});
					}
					return false;
				});

				$(".pluck-review-create-review-cancel", top).click(function() {
					$(".pluck-review-create-review-title-input", top).focus();
					if (ckEditor) ckEditor.destroy();
					pluckAppProxy.pluck_formAbandonTracker_trigger("review" + params.plckReviewOnKey);
					setTimeout(function() { pluckAppProxy.pluck_reviews_list_refresh(topId, {}); }, 1);
					return false;
				});

				var sendSocial = function(p) {
					var title = p.OnPageTitle;
					if (title.length > 75) title = title.substring(72) + "..."

					var url = p.ReviewUrl ? p.ReviewUrl : p.OnPageUrl;
					var twitTmpl = prefs.twitterTemplate.replace("{2}", p.ReviewRating).replace("{3}", prefs.maxRating);
					var fbTitle = prefs.facebookMessage.replace("{0}", p.OnPageTitle);
					var fbCaption = prefs.facebookCaption.replace("{0}", p.ReviewRating).replace("{1}", prefs.maxRating);
					var fbParams = { title: fbTitle, url: url, caption: fbCaption, actions: [ { name: prefs.facebookAction, link: url }] };
					pluckAppProxy.social_syndicate(topId, title, p.ReviewBody, url, fbParams,
						function() {
							var activityObj = { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType, 
										  reviewKey: p.ReviewKey.Key, moderated: false };
							var activityType = params.plckReviewKey ? "ReviewEdit" : "ReviewCreate";
							pluckAppProxy.executeActivityCallbacks(activityType, activityObj);

							pluckAppProxy.pluck_reviews_sync(topId);
							if (ckEditor) ckEditor.destroy();
							pluckAppProxy.pluck_formAbandonTracker_cancel("review" + params.plckReviewOnKey);
							pluckAppProxy.pluck_reviews_list_refresh(topId, { plckReviewOnPage: "1", plckReviewSort: "TimeStampDescending", plckReviewFilter: ""});
						}, null, twitTmpl, "Review", "ExternalResource"
					);					
				};

				var addPhotos = function(p, isModerating) {
					var cmds = [];
					for (var i = 0; i < photoDivs.length - 1; i++) {
						var d = photoDivs[i].data;
						if (!d.key && d.imageId) {
							cmds.push(new PluckSDK.AddReviewPhotoActionRequest({ ReviewKey: p.ReviewKey, Title: d.title, Description: d.desc, ImageID: d.imageId }));
						}
					}
					if (cmds.length) {
						PluckSDK.SendRequests(cmds, function(data) {
							sendSocial(p); 
						} );
					} else sendSocial(p);
				};

				var saveReview = function(p) {
					$(".pluck-review-create-review-title-input", top).focus();
					var cmds = [];
					var cmd = new PluckSDK.ReviewActionRequest(p);
					PluckSDK.SendRequests(cmd, function(responses) {
						var data = responses[0];
						if (data.ResponseStatus.StatusCode != PluckSDK.ResponseStatusCode.OK) {
							$('.pluck-reviews-working', top).hide();
							var excs = data.ResponseStatus.Exceptions;
							pluckAppProxy.ensureOnScreen($(".pluck-review-create-review-error-container", top));
							for (var i = 0; excs && i < excs.length; i++) {
								if (excs[i].ExceptionLevel != PluckSDK.ResponseExceptionLevel.Error) continue;
								switch (excs[i].ExceptionCode) {
									case PluckSDK.ResponseExceptionCode.FloodControlTriggered :
										pluckAppProxy.fadeIn($(".pluck-review-flood-error", top));
										return;
									case PluckSDK.ResponseExceptionCode.LargeActionThreshold :
										pluckAppProxy.fadeIn($(".pluck-review-large-action-error", top));
										return;
									case PluckSDK.ResponseExceptionCode.DirtyWordFilterTriggered :
										var words = pluckAppProxy.pluck_reviews_process_dirtyWords(excs[i].Value);
										$(".pluck-review-badword-list", top).html(words);
										pluckAppProxy.fadeIn($(".pluck-review-badword-error", top));
										return;
									case PluckSDK.ResponseExceptionCode.AnonymousNotSupported:
									case PluckSDK.ResponseExceptionCode.InvalidCredentials:
										pluckAppProxy.fadeIn($(".pluck-review-security-error", top));
										return;
									default :
										pluckAppProxy.fadeIn($(".pluck-review-general-error", top));
										return;
								}
							}
							pluckAppProxy.fadeIn($(".pluck-review-general-error", top));
							return;
						} else {
							var keyAct = data.KeyActions[0];
							p.ReviewKey = keyAct.Key;
							if (keyAct.ActionType == PluckSDK.KeyActionType.PendingApproval) {
								addPhotos(p, true);
								$('.pluck-reviews-working', top).hide();
								pluckAppProxy.ensureOnScreen(top);
								pluckAppProxy.displayWait($('.pluck-reviews-moderating', top));
								pluckAppProxy.pluck_reviews_sync(topId);
								setTimeout(function() {
									if (ckEditor) ckEditor.destroy();
									pluckAppProxy.pluck_formAbandonTracker_cancel("review" + params.plckReviewOnKey);
									pluckAppProxy.pluck_reviews_list_refresh(topId, {});
								}, 5000);
								var activityObj = { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType, 
											  reviewKey: keyAct.Key.Key, moderated: true };
								var activityType = params.plckReviewKey ? "ReviewEdit" : "ReviewCreate";
								pluckAppProxy.executeActivityCallbacks(activityType, activityObj);

								return;
							}
							addPhotos(p, false);
						}
					});
				};

				$(".pluck-review-create-review-save", top).click(function() {
					var p = {};
					if (!checkInputs(p, true)) {
						return false;
					}
					pluckAppProxy.displayWait($(".pluck-reviews-working", top));
					if (prefs.checkFilteredWords) {
						var wordPairs = [];
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Title", Value: p.ReviewTitle }));
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Body", Value: p.ReviewBody }));
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Pros", Value: p.ReviewPros }));
						wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "Cons", Value: p.ReviewCons }));

						for (var i = 0; i < p.AuthorAttributes.length; i++) {
							if (p.AuthorAttributes[i].ValueFreeText) {
								wordPairs.push(new PluckSDK.SiteLifeKeyValuePair({ Key: "ValueFreeText", Value: p.AuthorAttributes[i].ValueFreeText }));
							}
						}
						var cmd = new PluckSDK.CheckFilteredWordsRequest({ CheckStrings: wordPairs });
						PluckSDK.SendRequests(cmd, function(responses) {
							var data = responses[0];
							var badwords = [];
							for (var i = 0; i < data.Results.length; i++) {
								var val = data.Results[i].Value;
								if (val) {
									badwords.push(val);
								}
							}
							if (badwords.length) {
								$('.pluck-reviews-working', top).hide();
								var words = pluckAppProxy.pluck_reviews_process_dirtyWords(badwords);
								$(".pluck-review-badword-list", top).html(words);
								pluckAppProxy.fadeIn($(".pluck-review-badword-error", top));
							} else {
								saveReview(p);
							}
						});
					} else {
						saveReview(p);
					}
					return false;
				});
				pluckAppProxy.executeActivityCallbacks("ReviewSubmitRendered", { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType });
			};

			pluckAppProxy.pluck_reviews_submit_refresh = function(listId, editReviewId) {
				var list = $(listId);
				$(".qtip").hide();
				var params = $.extend({}, list.data("params"), { plckReviewKey: editReviewId || "" });

				// Clear the list callbacks.
				if (pluckAppProxy.pluck_reviews_list_commentDelete) {
					pluckAppProxy.unregisterActivityCallback("CommentDelete", pluckAppProxy.pluck_reviews_list_commentDelete);
					pluckAppProxy.pluck_reviews_list_commentDelete = null;
				}
				if (pluckAppProxy.pluck_reviews_list_commentCreate) {
					pluckAppProxy.unregisterActivityCallback("CommentCreate", pluckAppProxy.pluck_reviews_list_commentCreate);
					pluckAppProxy.pluck_review_list_commentCreate = null;
				}
				if (pluckAppProxy.pluck_reviews_list_commentsRendered) {
					pluckAppProxy.unregisterActivityCallback("CommentsRendered", pluckAppProxy.pluck_reviews_list_commentsRendered);
					pluckAppProxy.pluck_review_list_commentsRendered = null;
				}
				params.clientUrl = pluckAppProxy.pluck_reviews_cleanClientUrl();

				pluckAppProxy.closeDialogs();
				pluckAppProxy.displayWait($(".pluck-reviews-working", list));

				params.contentType = "Html";

				if(pluckAppProxy.debugLevel) params.debug = pluckAppProxy.debugLevel;
				pluckAppProxy.ensureOnScreen(list, function() {
					pluckAppProxy.callApp("pluck/reviews/submit.app", params, function(data) {
						var p = list.parent();
						list.replaceWith(data);
						pluckAppProxy.ensureOnScreen(p.children('.pluck-review-create'), null, { forceToTop: $.browser.msie });
					});
				});
			};
		}

		/**************************************
		 *
		 * pluck/reviews/preview
		 *
		 **************************************/
		if (typeof(pluckAppProxy.pluck_reviews_preview) === 'undefined') {
			pluckAppProxy.pluck_reviews_preview = function (topId, params, prefs) {
				var top = $(topId);
				top.data("params", params);

				if ($(".pluck-social-syndication-connect", top).length > 0) {
					$(".pluck-review-create-review-post", top).show();
				}

				$(".pluck-review-full-review-image-holder", top).hover(function() {
					$(this).children('.pluck-review-full-review-image-overlay').stop(false, true).fadeOut("slow");
				}, function() {
					$(this).children('.pluck-review-full-review-image-overlay').stop(false, true).fadeIn("slow");
				});

				var checkInputs = function(p, forSDK) {
					var title = $(".pluck-review-create-review-title-input", top).val();
					var rating = $(".pluck-review-create-review-rating-input", top).val();
					var body = $(".pluck-review-create-review-desc-input", top).val();
					var pros = $(".pluck-review-create-review-pros-input", top).val();
					var cons = $(".pluck-review-create-review-cons-input", top).val();
					var recommend = $(".pluck-review-create-review-recommend", top).val();
					if (forSDK) {
						if (params.plckReviewOnKeyType == "article") {
							p.ReviewedKey = new PluckSDK.ExternalResourceKey({ Key: params.plckReviewOnKey });
							p.OnPageUrl = params.plckArticleUrl;
							p.OnPageTitle = params.plckArticleTitle;
						}
						if (params.plckReviewKey) p.ReviewKey = new PluckSDK.ReviewKey({ Key: params.plckReviewKey });
						p.ReviewTitle = title;
						p.ReviewRating = parseInt(rating)
						p.ReviewBody = body;
						p.ReviewPros = pros;
						p.ReviewCons = cons;
						p.ReviewRecommend = recommend == "true";

						p.ReviewPhotoKeys = [];
						var photoCount = 0;
						var photoImageId = $("input.pluck-review-create-review-photoImageId" + photoCount, top).val();
						while (photoImageId) {
							var key = $("input.pluck-review-create-review-photoKey" + photoCount, top).val();
							if (key) p.ReviewPhotosKeys.push(new PluckSDK.PhotoKey({ Key: key }));
							photoCount++;
							photoImageId = $("input.pluck-review-create-review-photoImageId" + photoCount, top).val();
						}
						p.ReviewVideoKeys = [];
						p.AttributeRatings = [];
						var attrcount = 0;
						while (attrcount < 150) {
							var key = $(".pluck-review-create-review-attr-key" + attrcount, top).val();
							if (!key) break;
							var val = $(".pluck-review-create-review-attr-val" + attrcount, top).val();
							if (val) p.AttributeRatings.push(new PluckSDK.ReviewRatingAttributeValue({ Key: new PluckSDK.ReviewRatingAttributeKey({ Key: key }), Value: val }));
							attrcount++;
						}
						p.AuthorAttributes = [];
						attrcount = 0;
						while (attrcount < 150) {
							var key = $(".pluck-review-create-review-author-attr-key" + attrcount, top).val();
							if (!key) break;
							var text = $(".pluck-review-create-review-author-attr-val-text" + attrcount, top).val();
							if (text) {
								p.AuthorAttributes.push(new PluckSDK.ReviewAuthorAttributeValue({ Key: new PluckSDK.ReviewAuthorAttributeKey({ Key: key }), ValueFreeText: val }));
								attrcount++;
								continue;
							}
							var keys = $(".pluck-review-create-review-author-attr-val-keys" + attrcount, top).val();
							if (keys) {
								var optionKeys = [];
								var ks = keys.split(",");
								for (var i = 0; i < ks.length; i++) {
									optionKeys.push(new PluckSDK.ReviewAuthorAttributeOptionKey({ Key: ks[i] }));
								}
								p.AuthorAttributes.push(new PluckSDK.ReviewAuthorAttributeValue({ Key: new PluckSDK.ReviewAuthorAttributeKey({ Key: key }), ValueKeys: optionKeys }));
							}
							attrcount++;
						}
						if (params.plckDiscoverySection) p.Section = new PluckSDK.DiscoverySection({ Name: params.plckDiscoverySection });
						p.Categories = [];
						if (params.plckDiscoveryCategories) {
							var cats = params.plckDiscoveryCategories.split(",");
							for (var i = 0; i < cats.length; i++) if ($.trim(cats[i])) p.Categories.push(new PluckSDK.DiscoveryCategory({ Name: $.trim(cats[i]) }));
						}
						if (params.plckReviewRatingAttributeSetKey) p.ReviewRatingAttributeSetKey = new PluckSDK.ReviewRatingAttributeSetKey({ Key: params.plckReviewRatingAttributeSetKey });
						if (params.plckReviewAuthorAttributeSetKey) p.ReviewAuthorAttributeSetKey = new PluckSDK.ReviewAuthorAttributeSetKey({ Key: params.plckReviewAuthorAttributeSetKey });
					} else {
						$.extend(p, params, { plckReviewFromPreview: "true",
							plckReviewTitle: title, plckReviewRating: rating, plckReviewBody: body,
							plckReviewPros: pros, plckReviewCons: cons, plckReviewRecommend: recommend
						});

						var photoCount = 0;
						var photoImageId = $("input.pluck-review-create-review-photoImageId" + photoCount, top).val();
						while (photoImageId) {
							p["plckReviewPhotoKey" + photoCount] = $("input.pluck-review-create-review-photoKey" + photoCount, top).val();
							p["plckReviewPhotoImageId" + photoCount] = photoImageId;
							p["plckReviewPhotoTitle" + photoCount] = $("input.pluck-review-create-review-photoTitle" + photoCount, top).val();
							p["plckReviewPhotoDesc" + photoCount] = $("input.pluck-review-create-review-photoDesc" + photoCount, top).val();
							photoCount++;
							photoImageId = $("input.pluck-review-create-review-photoImageId" + photoCount, top).val();
						}
						var attrcount = 0;
						while (attrcount < 150) {
							var key = $(".pluck-review-create-review-attr-key" + attrcount, top).val();
							if (key) {
								p["plckReviewAttrKey" + attrcount] = key;
								p["plckReviewAttrVal" + attrcount] = $(".pluck-review-create-review-attr-val" + attrcount, top).val();
							} else {
								break;
							}
							attrcount++;
						}
						attrcount = 0;
						while (attrcount < 150) {
							var key = $(".pluck-review-create-review-author-attr-key" + attrcount, top).val();
							if (key) {
								p["plckReviewAuthorKey" + attrcount] = key;
								p["plckReviewAuthorTextVal" + attrcount] = $(".pluck-review-create-review-author-attr-val-text" + attrcount, top).val();
								p["plckReviewAuthorKeyVals" + attrcount] = $(".pluck-review-create-review-author-attr-val-keys" + attrcount, top).val();
							} else {
								break;
							}
							attrcount++;
						}
						if ($("input.pluck-social-syndication-facebook:checked", top).val()) p.plckFacebookLink = "true";
						else p.plckFacebookLink = "false";
						if ($("input.pluck-social-syndication-twitter:checked", top).val()) p.plckTwitterLink = "true";
						else p.plckTwitterLink = "false";
						if ($("input.pluck-social-syndication-linkedIn:checked", top).val()) p.plckLinkedInLink = "true";
						else p.plckLinkedInLink = "false";
					}
					return true;
				};

				$(".pluck-review-create-review-preview", top).click(function() {
					var p = { contentType: "Html" };
					if (!checkInputs(p, false)) {
						return false;
					}
					pluckAppProxy.closeDialogs();
					pluckAppProxy.displayWait($(".pluck-reviews-working", top));

					if(pluckAppProxy.debugLevel) p.debug = pluckAppProxy.debugLevel;
					pluckAppProxy.ensureOnScreen(top, function() {
						pluckAppProxy.callApp("pluck/reviews/submit.app", p, function(data) {
							var p = top.parent();
							top.replaceWith(data);
							pluckAppProxy.ensureOnScreen(p.children('.pluck-app'));
						});
					});
					return false;
				});

				var sendSocial = function(p) {
					var title = p.OnPageTitle;
					if (title.length > 75) title = title.substring(72) + "..."

					var url = p.ReviewUrl ? p.ReviewUrl : p.OnPageUrl;
					var twitTmpl = prefs.twitterTemplate.replace("{2}", p.ReviewRating).replace("{3}", prefs.maxRating);

					var fbTitle = prefs.facebookMessage.replace("{0}", p.OnPageTitle);
					var fbCaption = prefs.facebookCaption.replace("{0}", p.ReviewRating).replace("{1}", prefs.maxRating);
					var fbParams = { title: fbTitle, url: url, caption: fbCaption, actions: [ { name: prefs.facebookAction, link: url }] };
					pluckAppProxy.social_syndicate(topId, title, p.ReviewBody, url, fbParams,
						function() {
							var activityObj = { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType, 
										  reviewKey: p.ReviewKey.Key, moderated: false };
							var activityType = params.plckReviewKey ? "ReviewEdit" : "ReviewCreate";
							pluckAppProxy.executeActivityCallbacks(activityType, activityObj);
							pluckAppProxy.pluck_formAbandonTracker_cancel("review" + params.plckReviewOnKey);
							pluckAppProxy.pluck_reviews_sync(topId);
							pluckAppProxy.pluck_reviews_list_refresh(topId, { plckReviewOnPage: "1", plckReviewSort: "TimeStampDescending", plckReviewFilter: ""});
						}, null, twitTmpl, "Review", "ExternalResource"
					);					
				};

				var addPhotos = function(p, isModerating) {
					var cmds = [];
					var photoCount = 0;
					var imageId = $("input.pluck-review-create-review-photoImageId" + photoCount, top).val();
					while (imageId) {
						var key = $("input.pluck-review-create-review-photoKey" + photoCount, top).val();
						if (key) {
							photoCount++;
							continue;
						}
						var title = $("input.pluck-review-create-review-photoTitle" + photoCount, top).val();
						var desc = $("input.pluck-review-create-review-photoDesc" + photoCount, top).val();
						cmds.push(new PluckSDK.AddReviewPhotoActionRequest({ ReviewKey: p.ReviewKey, Title: title, Description: desc, ImageID: imageId }));

						photoCount++;
						imageId = $("input.pluck-review-create-review-photoImageId" + photoCount, top).val();
					}
					if (cmds.length) {
						PluckSDK.SendRequests(cmds, function(data) {
							if (!isModerating) sendSocial(p); 
						} );
					} else if (!isModerating) sendSocial(p);
				};


				$(".pluck-review-create-review-save", top).click(function() {
					var p = {};
					if (!checkInputs(p, true)) {
						return false;
					}

					var cmd = new PluckSDK.ReviewActionRequest(p);
					PluckSDK.SendRequests(cmd, function(responses) {
						var data = responses[0];
						$('.pluck-reviews-working', top).hide();
						if (data.ResponseStatus.StatusCode != PluckSDK.ResponseStatusCode.OK) {
							var excs = data.ResponseStatus.Exceptions;
							for (var i = 0; excs && i < excs.length; i++) {
								if (excs[i].ExceptionLevel != PluckSDK.ResponseExceptionLevel.Error) continue;
								switch (excs[i].ExceptionCode) {
									case PluckSDK.ResponseExceptionCode.FloodControlTriggered :
										pluckAppProxy.fadeIn($(".pluck-review-flood-error", top));
										return;
									case PluckSDK.ResponseExceptionCode.LargeActionThreshold :
										pluckAppProxy.fadeIn($(".pluck-review-large-action-error", top));
										return;
									case PluckSDK.ResponseExceptionCode.DirtyWordFilterTriggered :
										var words = pluckAppProxy.pluck_reviews_process_dirtyWords(excs[i].Value);
										$(".pluck-review-badword-list", top).html(words);
										pluckAppProxy.fadeIn($(".pluck-review-badword-error", top));
										return;
									case PluckSDK.ResponseExceptionCode.AnonymousNotSupported:
									case PluckSDK.ResponseExceptionCode.InvalidCredentials:
										pluckAppProxy.fadeIn($(".pluck-review-security-error", top));
										return;
									default :
										pluckAppProxy.fadeIn($(".pluck-review-general-error", top));
										return;
								}
							}
						} else {
							var keyAct = data.KeyActions[0];
							p.ReviewKey = keyAct.Key;
							if (keyAct.ActionType == PluckSDK.KeyActionType.PendingApproval) {
								addPhotos(p, true);
								$('.pluck-reviews-working', top).hide();
								pluckAppProxy.ensureOnScreen(top);
								pluckAppProxy.displayWait($('.pluck-reviews-moderating', top));
								pluckAppProxy.pluck_reviews_sync(topId);
								setTimeout(function() {
									pluckAppProxy.pluck_formAbandonTracker_cancel("review" + params.plckReviewOnKey);
									pluckAppProxy.pluck_reviews_sync(topId);
									pluckAppProxy.pluck_reviews_list_refresh(topId, {});
								}, 5000);
								var activityObj = { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType, 
											  reviewKey: keyAct.Key.Key, moderated: true };
								var activityType = params.plckReviewKey ? "ReviewEdit" : "ReviewCreate";
								pluckAppProxy.executeActivityCallbacks(activityType, activityObj);

								return;
							}
							addPhotos(p, false);
						}
					});
					return false;
				});
				pluckAppProxy.executeActivityCallbacks("ReviewPreviewRendered", { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType });
			};
		}

		/**************************************
		 *
		 * pluck/reviews/list
		 *
		 **************************************/
		if (typeof(pluckAppProxy.pluck_reviews_list) === 'undefined') {
			pluckAppProxy.pluck_reviews_list = function (listId, params) {
				var list = $(listId);
				list.data("params", params);

				$("select.pluck-review-full-header-sorting", list).change(function() { pluckAppProxy.pluck_reviews_list_refresh(listId, { plckReviewOnPage: "1", plckReviewSort: $(this).val()});});
				$("a.pluck-review-full-header-filter", list).click(function() {
					if (isIE6) {
						$(".pluck-review-full-content-wrap", list).hide();
						$(".pluck-review-list-filter-wrap", list).show();
						$("a.pluck-footer-logo").hide();
						$("a.pluck-footer-logo").show();
					} else {
						$(".pluck-review-full-content-wrap", list).slideUp("medium", function() {
							$(".pluck-review-list-filter-wrap", list).slideDown("medium");
						});
					}
					return false;
				});
				$("a.pluck-review-allfilter-link", list).click(function() { 
					pluckAppProxy.pluck_reviews_list_refresh(listId, { plckReviewOnPage: "1", plckReviewSort: "", plckReviewFilter: ""});  return false;
				});
				$("a.pluck-review-friendsfilter-link", list).click(function() { pluckAppProxy.pluck_reviews_list_refresh(listId, { plckReviewOnPage: "1", plckReviewSort: "friends"});  return false;});
				$("a.pluck-reviews-list-pagination-button-prev, a.pluck-reviews-list-pagination-button-next, a.pluck-reviews-list-pagination-page", list).click(function() {
					pluckAppProxy.pluck_reviews_list_refresh(listId, { plckReviewOnPage: $(this).attr("pageno")}); return false;
				});
				$("a.pluck-review-full-navigation-back", list).click(function() { pluckAppProxy.pluck_reviews_list_refresh(listId, {}); return false; });
				$("a.pluck-review-create-first-post, a.pluck-review-list-create", list).click(function() {
					pluckAppProxy.pluck_reviews_submit_refresh(listId);
					return false;
				});

				var isIE6 = $.browser.msie && $.browser.version < 7;
				var isIE76 = $.browser.msie && $.browser.version < 8;

				var fadeReviewIn = function(p) {
					p.show();
				};

				var updateReviewState = function(p, state) {
					p.hide();
					p.removeClass("pluck-review-isBlocked");
					p.removeClass("pluck-user-isHidden");
					p.removeClass("pluck-user-isIgnored");
					p.removeClass("pluck-review-isUnderReview");
					p.removeClass("pluck-review-isVisible");
					if (state == "deleted")	{
						p.addClass("pluck-review-isDeleted");
						p.removeClass("pluck-review-isFeatured");
						p.removeClass("pluck-review-showHiddenInfo");
					}
					else if (p.hasClass("pluck-review-isBlockedOrig")) p.addClass("pluck-review-isBlocked");
					else if (p.hasClass("pluck-user-isHiddenOrig")) p.addClass("pluck-user-isHidden");
					else if (p.hasClass("pluck-review-isUnderReviewOrig")) p.addClass("pluck-review-isUnderReview");
					else if (p.hasClass("pluck-user-isIgnoredOrig")) p.addClass("pluck-user-isIgnored");
					else p.addClass("pluck-review-isVisible");
					fadeReviewIn(p);
				};

				var updateShowHiddenInfo = function(p, showIt) {
					p.hide();
					if (showIt) p.addClass("pluck-review-showHiddenInfo");
					else p.removeClass("pluck-review-showHiddenInfo");
					fadeReviewIn(p);
				};

				var updateFriendInfo = function(p, isFriend) {
					p.hide();
					if (isFriend) p.addClass("pluck-user-isFriend");
					else p.removeClass("pluck-user-isFriend");
					fadeReviewIn(p);
				};

				var showErrorMessage = function(msgDivClass, review_top) {
					$(".pluck-review-edit-delete-control-wrap", review_top).hide();
					$(".pluck-review-featured-headline", review_top).hide();
					pluckAppProxy.fadeIn($(msgDivClass, review_top), function() {
						setTimeout(function() {
							pluckAppProxy.fadeOut($(msgDivClass, review_top), function() {
								$(".pluck-review-edit-delete-control-wrap", review_top).css('display', 'block');
								$(".pluck-review-featured-headline", review_top).css('display', 'block');
							});
						}, 5000);
					});
				};
				var showScoreErrorMessage = function(msgDivClass, review_top) {
					$(".pluck-review-full-review-action-buttons", review_top).hide();
					pluckAppProxy.fadeIn($(msgDivClass, review_top), function() {
						setTimeout(function() {
							pluckAppProxy.fadeOut($(msgDivClass, review_top), function() {
								$(".pluck-review-full-review-action-buttons", review_top).css('display', 'block');
							});
						}, 5000);
					});
				};

				if (!isIE6) {
					var actives = $(".pluck-review-full-review-single-review-wrap:not(.pluck-user-isAnonymousTier)", list);
					$(".pluck-review-avatar-active", actives).hover(function() {
						if (typeof(pluckAppProxy.pluck_user_miniPersona_show) != "function") return;
						var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
						var isFeatured = review_top.hasClass("pluck-review-featuredreviewer");
						var userId = $(this).attr("userId");
						pluckAppProxy.closeDialogs();
						pluckAppProxy.pluck_user_miniPersona_show(this, userId, isFeatured, false);
					}, function() {
						if (typeof(pluckAppProxy.pluck_user_miniPersona_show_stop) != "function") return;
						var userId = $(this).attr("userId");
						pluckAppProxy.pluck_user_miniPersona_show_stop(this, userId);
					});
				}

				var buildActivityObj = function(review_top) {
					var retval = {};
					retval.reviewId = review_top.eq(0).attr("reviewKey");
					retval.reviewOnKey = review_top.eq(0).attr("reviewOnKey") || "";
					retval.reviewOnKeyType = review_top.eq(0).attr("reviewOnKeyType") || "";
					var list_top = review_top.parents('div.pluck-review-list');
					retval.reviewOnCategory = list_top.data("params").plckReviewOnCategory || "";
					return retval;
				};

				$(".pluck-review-delete-yes", list).click(function() {
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					pluckAppProxy.displayWait($('.pluck-review-working', review_top));
					$('.pluck-review-delete-confirm', review_top).hide();
					var reviewKey = review_top.eq(0).attr("reviewKey");

					var cmd = new PluckSDK.DeleteContentActionRequest({ BaseKey: new PluckSDK.ReviewKey({ Key: reviewKey }) });
					PluckSDK.SendRequests(cmd, function(responses) {
						var data = responses[0];
						$('.pluck-review-working', review_top).hide();
						if (data.ResponseStatus.StatusCode != PluckSDK.ResponseStatusCode.OK) {
							showErrorMessage(".pluck-review-delete-error", review_top);
						} else {
							pluckAppProxy.executeActivityCallbacks("ReviewDelete", buildActivityObj(review_top));
							$(".pluck-review-total-count", list).each(function() {
								var span = $(this);
								var count = parseInt(span.html());
								span.html("" + (count - 1));
							});
							pluckAppProxy.pluck_reviews_sync(listId);
							updateReviewState(review_top, "deleted");
						}
					});
					return false;
				});
				$(".pluck-review-delete-no", list).click(function() {
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					$('.pluck-review-wait', review_top).hide();
					return false;
				});
				$("a.pluck-review-delete-control-link", list).click(function() {
					pluckAppProxy.closeDialogs();
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					pluckAppProxy.displayWait($('.pluck-review-delete-confirm', review_top));
					return false;
				});
				$("a.pluck-review-unblock-control-link", list).click(function() {
					pluckAppProxy.closeDialogs();
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					pluckAppProxy.displayWait($('.pluck-review-working', review_top));
					var reviewKey = review_top.eq(0).attr("reviewKey");

					var cmd = new PluckSDK.SetContentBlockingStateActionRequest({ BaseKey: new PluckSDK.ReviewKey({ Key: reviewKey }), State: PluckSDK.ContentBlockingEnum.Unblocked });
					PluckSDK.SendRequests(cmd, function(responses) {
						$('.pluck-review-working', review_top).hide();
						var data = responses[0];
						if (data.ResponseStatus.StatusCode != PluckSDK.ResponseStatusCode.OK) {
							showErrorMessage(".pluck-review-unblock-error", review_top);
						} else {
							pluckAppProxy.executeActivityCallbacks("ReviewUnblock", buildActivityObj(review_top));
							review_top.removeClass("pluck-review-isBlockedOrig");
							updateReviewState(review_top, "unblocked");
						}
					});
					return false;
				});
				$("a.pluck-review-block-control-link", list).click(function() {
					pluckAppProxy.closeDialogs();
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					pluckAppProxy.displayWait($('.pluck-review-working', review_top));
					var reviewKey = review_top.eq(0).attr("reviewKey");
					var cmd = new PluckSDK.SetContentBlockingStateActionRequest({ BaseKey: new PluckSDK.ReviewKey({ Key: reviewKey }), State: PluckSDK.ContentBlockingEnum.BlockedByAdmin });
					PluckSDK.SendRequests(cmd, function(responses) {
						var data = responses[0];
						$('.pluck-review-working', review_top).hide();
						if (data.ResponseStatus.StatusCode != PluckSDK.ResponseStatusCode.OK) {
							showErrorMessage(".pluck-review-block-error", review_top);
						} else {
							pluckAppProxy.executeActivityCallbacks("ReviewBlock", buildActivityObj(review_top));
							review_top.addClass("pluck-review-isBlockedOrig");
							updateReviewState(review_top, "blocked");
						}
					});
					return false;
				});
				$("a.pluck-review-unfeature-control-link", list).click(function() {
					pluckAppProxy.closeDialogs();
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					pluckAppProxy.displayWait($('.pluck-review-working', review_top));
					var reviewKey = review_top.eq(0).attr("reviewKey");
					var cmd = new PluckSDK.SetFeaturedReviewActionRequest({ ReviewKey: new PluckSDK.ReviewKey({ Key: reviewKey }), ReviewIsFeatured: false });
					PluckSDK.SendRequests(cmd, function(responses) {
						var data = responses[0];
						$('.pluck-review-working', review_top).hide();
						if (data.ResponseStatus.StatusCode != PluckSDK.ResponseStatusCode.OK) {
							showErrorMessage(".pluck-review-unfeature-error", review_top);
						} else {
							pluckAppProxy.executeActivityCallbacks("ReviewUnfeature", buildActivityObj(review_top));
							review_top.removeClass("pluck-review-isFeatured");
							$('.pluck-review-working', review_top).hide();
						}
					});
					return false;
				});
				$("a.pluck-review-feature-control-link", list).click(function() {
					pluckAppProxy.closeDialogs();
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					pluckAppProxy.displayWait($('.pluck-review-working', review_top));
					var reviewKey = review_top.eq(0).attr("reviewKey");
					var cmd = new PluckSDK.SetFeaturedReviewActionRequest({ ReviewKey: new PluckSDK.ReviewKey({ Key: reviewKey }), ReviewIsFeatured: true });
					PluckSDK.SendRequests(cmd, function(responses) {
						var data = responses[0];
						$('.pluck-review-working', review_top).hide();
						if (data.ResponseStatus.StatusCode != PluckSDK.ResponseStatusCode.OK) {
							showErrorMessage(".pluck-review-feature-error", review_top);
						} else {
							pluckAppProxy.executeActivityCallbacks("ReviewFeature", buildActivityObj(review_top));
							review_top.addClass("pluck-review-isFeatured");
							$('.pluck-review-working', review_top).hide();
						}
					});
					return false;
				});
				$("a.pluck-review-edit-control-link", list).click(function() {
					pluckAppProxy.closeDialogs();
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					var reviewKey = review_top.eq(0).attr("reviewKey");
					pluckAppProxy.pluck_reviews_submit_refresh(listId, reviewKey);
					return false;
				});
				$("a.pluck-review-show-hidden-info", list).click(function() {
					updateShowHiddenInfo($(this).parents('div.pluck-review-full-review-single-review-wrap'), true);
					return false;
				});
				$("a.pluck-review-hide-hidden-info", list).click(function() {
					updateShowHiddenInfo($(this).parents('div.pluck-review-full-review-single-review-wrap'), false);
					return false;
				});
				$(".pluck-review-full-review-image-holder", list).hover(function() {
					$(this).children('.pluck-review-full-review-image-overlay').stop(false, true).fadeOut("slow");
				}, function() {
					$(this).children('.pluck-review-full-review-image-overlay').stop(false, true).fadeIn("slow");
				});

				$("a.pluck-review-full-review-comment-show", list).click(function() {
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					var comment_top = $('div.pluck-review-full-review-comment-container', review_top);
					if (comment_top.length == 0) {
						pluckAppProxy.displayWait($('.pluck-review-working', review_top));
						$('div.pluck-review-full-review-comment-wrap', review_top).after('<div class="pluck-review-full-review-comment-container"></div>');
						comment_top = $('div.pluck-review-full-review-comment-container', review_top);
						var reviewKey = review_top.eq(0).attr("reviewKey");
						var p = { contentType: "Html", plckCommentOnKey: reviewKey, plckCommentOnKeyType: "review", plckCommentListType: params.plckReviewListType, clientUrl: pluckAppProxy.pluck_reviews_cleanClientUrl()};
						pluckAppProxy.callApp("pluck/comments.app", p, function(data) {
							comment_top.append(data);
							$('.pluck-review-full-review-comment-show', review_top).hide();
							$('.pluck-review-full-review-comment-hide', review_top).show();
							$('.pluck-review-working', review_top).hide();
						});
					} else {
						$('.pluck-review-full-review-comment-show', review_top).hide();
						$('.pluck-review-full-review-comment-hide', review_top).show();
						comment_top.show();
					}
					return false;
				});
				$("a.pluck-review-full-review-comment-hide", list).click(function() {
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					var comment_top = $('div.pluck-review-full-review-comment-container', review_top);
					comment_top.hide();
					$('.pluck-review-full-review-comment-show', review_top).show();
					$('.pluck-review-full-review-comment-hide', review_top).hide();
					return false;
				});

				$("a.pluck-review-down-link, a.pluck-review-up-link", list).click(function() {
					pluckAppProxy.closeDialogs();
					var review_top = $(this).parents('div.pluck-review-full-review-single-review-wrap');
					pluckAppProxy.displayWait($('.pluck-review-working', review_top));
					var me = $(this);
					var reviewKey = review_top.eq(0).attr("reviewKey");
					var score = "1"
					if (me.hasClass("pluck-review-down-link")) score = "-1";

					var parentKey = null;
					if (me.attr("scoreonparentkeytype") == "article") parentKey = new PluckSDK.ExternalResourceKey({Key: me.attr("scoreonparentkey")});

					var cmd = new PluckSDK.SetItemScoreActionRequest({ ScoreId: "Review", ParentKey: parentKey, TargetKey: new PluckSDK.ReviewKey({ Key: reviewKey }), Score: score });
					PluckSDK.SendRequests(cmd, function(responses) {
						var data = responses[0];
						$('.pluck-review-working', review_top).hide();
						if (data.ResponseStatus.StatusCode != PluckSDK.ResponseStatusCode.OK) {
							var excs = data.ResponseStatus.Exceptions;
							for (var i = 0; excs && i < excs.length; i++) {
								if (excs[i].ExceptionLevel != PluckSDK.ResponseExceptionLevel.Error) continue;
								switch (excs[i].ExceptionCode) {
									case PluckSDK.ResponseExceptionCode.SmallActionThreshold :
										showScoreErrorMessage(".pluck-review-score-action-error");
										return;
								}
							}
							showScoreErrorMessage(".pluck-review-score-general-error");
						} else {
							$(".pluck-review-full-review-action-recommend", review_top).hide();
							if (score == "1") {
								$(".pluck-review-full-review-action-recommended", review_top).show();
								var poscnt = $(".pluck-review-full-review-positive-count", review_top);
								var val = parseInt(poscnt.html()) + 1;
								poscnt.html("" + val);
							} else {
								$(".pluck-review-full-review-action-not-recommended", review_top).show();
							}
							var totalcnt = $(".pluck-review-full-review-total-count", review_top);
							var val = parseInt(totalcnt.html()) + 1;
							totalcnt.html("" + val);
							$('.pluck-review-full-review-recommendations', review_top).css("visibility", "visible");
							pluckAppProxy.executeActivityCallbacks("ReviewScore", $.extend({ thumbUp: score == "1"}, buildActivityObj(review_top)));
						}
					});
					return false;
				});

				$(".pluck-review-list-filter-type input", list).change(function() {
					var val = $(this).val();
					$(".pluck-review-list-filter-ratings", list).toggle(val == "Rating");
					$(".pluck-review-list-filter-author-attributes", list).toggle(val == "AuthorAttributes");
					if (val == "AuthorAttributes" && $(".pluck-review-list-filter-author-attribute", list).length == 1) {
						$(".pluck-review-list-filter-author-attribute input", list).attr("checked", "true");
						$(".pluck-review-list-filter-author-options", list).show();
					}
				});

				$(".pluck-review-list-filter-author-attribute input", list).change(function() {
					var checked = $(this).is(":checked");
					$(this).parent().next().toggle(checked);
				});

				$(".pluck-review-list-filter-save", list).click(function() {
					var selVal = $(".pluck-review-list-filter-type input:checked", list).val();
					pluckAppProxy.displayWait($(".pluck-review-filter-wait", list));
					var oldParams = list.data("params");
					var newParams = {};
					for (var x in oldParams) {
						if (x.indexOf("plckReviewFilterAuthor_") == -1) {
							newParams[x] = oldParams[x];
						}
					}
					list.data("params", newParams);

					if (selVal == "none") {
						pluckAppProxy.pluck_reviews_list_refresh(listId, { plckReviewOnPage: "1", plckReviewFilter: ""});
					} else if (selVal == "FriendsOnly") {
						pluckAppProxy.pluck_reviews_list_refresh(listId, { plckReviewOnPage: "1", plckReviewFilter: "FriendsOnly"});
					} else if (selVal == "FeaturedUsersOnly") {
						pluckAppProxy.pluck_reviews_list_refresh(listId, { plckReviewOnPage: "1", plckReviewFilter: "FeaturedUsersOnly"});
					} else if (selVal == "Rating") {
						var rating = $(".pluck-review-list-filter-ratings select", list).val();
						pluckAppProxy.pluck_reviews_list_refresh(listId, { plckReviewOnPage: "1", plckReviewFilter: rating});
					} else if (selVal == "AuthorAttributes") {
						var p = { plckReviewOnPage: "1", plckReviewFilter: "AuthorAttributes" };
						var attrs = $(".pluck-review-list-filter-author-attribute input:checkbox:checked", list);
						if (attrs.length == 0) {
							$(".pluck-review-filter-wait", list).hide();
							$(".pluck-review-list-filter-author-attributes > p.pluck-error-message", list).show();
							return false;
						}

						var attrcount = 0;
						var ok = true;
						attrs.each(function() {
							var me = $(this);
							var opts = $(".pluck-review-list-filter-author-option input:checkbox:checked", me.parent().next());
							if (opts.length == 0) {
								opts = $(".pluck-review-list-filter-author-option input:radio:checked", me.parent().next());
								if (opts.length == 0) {
									$(".pluck-review-filter-wait", list).hide();
									$("p.pluck-error-message", me.parent().next()).show();
									ok = false;
									return;
								}
							}
							var attrParam = "plckReviewFilterAuthor_" + attrcount++;
							p[attrParam] = me.val();
							optcount = 0;
							opts.each(function() {
								var optParam = attrParam + "_" + optcount++;
								p[optParam] = $(this).val();
							});
						});
						if (!ok) return false;
						pluckAppProxy.pluck_reviews_list_refresh(listId, p);
					}

					return false;
				});

				$(".pluck-review-list-filter-cancel", list).click(function() {
					if (isIE6) {
						$(".pluck-review-list-filter-wrap", list).hide();
						$(".pluck-review-full-content-wrap", list).show();
						$("a.pluck-footer-logo").hide();
						$("a.pluck-footer-logo").show();
					} else {
						$(".pluck-review-list-filter-wrap", list).slideUp("medium", function() {
							$(".pluck-review-full-content-wrap", list).slideDown("medium");
						});
					}
					return false;
				});
					

				pluckAppProxy.pluck_user_miniPersona_addCallback("setFriend", function(userId) {
					$(".pluck-review-avatar-active[userId='" + userId + "']").each(function() {
						updateFriendInfo($(this).parents(".pluck-review-full-review-single-review-wrap"), true);
					});
				});
				pluckAppProxy.pluck_user_miniPersona_addCallback("unsetFriend", function(userId) { 
					$(".pluck-review-avatar-active[userId='" + userId + "']").each(function() {
						updateFriendInfo($(this).parents(".pluck-review-full-review-single-review-wrap"), false);
					});
				});
				pluckAppProxy.pluck_user_miniPersona_addCallback("setEnemy", function(userId) { 
					$(".pluck-review-avatar-active[userId='" + userId + "']").each(function() {
						var p = $(this).parents(".pluck-review-full-review-single-review-wrap");
						p.addClass("pluck-user-isIgnoredOrig");
						updateReviewState(p, "reset");
					});
				});
				pluckAppProxy.pluck_user_miniPersona_addCallback("unsetEnemy", function(userId) { 
					$(".pluck-review-avatar-active[userId='" + userId + "']").each(function() {
						var p = $(this).parents(".pluck-review-full-review-single-review-wrap");
						p.removeClass("pluck-user-isIgnoredOrig");
						updateReviewState(p, "reset");
					});
				});
				pluckAppProxy.pluck_user_miniPersona_addCallback("setBlocked", function(userId) { 
					$(".pluck-review-avatar-active[userId='" + userId + "']").each(function() {
						var p = $(this).parents(".pluck-review-full-review-single-review-wrap");
						p.addClass("pluck-user-isHiddenOrig");
						updateReviewState(p, "reset");
					});
				});
				pluckAppProxy.pluck_user_miniPersona_addCallback("unsetBlocked", function(userId) { 
					$(".pluck-review-avatar-active[userId='" + userId + "']").each(function() {
						var p = $(this).parents(".pluck-review-full-review-single-review-wrap");
						p.removeClass("pluck-user-isHiddenOrig");
						updateReviewState(p, "reset");
					});
				});

				// Create the comment callbacks
				pluckAppProxy.pluck_reviews_list_commentDelete = pluckAppProxy.registerActivityCallback("CommentDelete", function(activityObj) {
					if (activityObj.commentOnKeyType != "review" || activityObj.parentCommentKey) return;
					var review_top = $("div[reviewkey='" + activityObj.commentOnKey + "']", list);
					if (review_top.length == 0) return;

					var counter = $(".pluck-review-full-review-comment-count", review_top);
					if (counter.length == 0) return;
					var count = parseInt(counter.text());
					count = count - 1;
					counter.html("" + count);
					if (count <= 0) {
						$(".pluck-review-full-review-has-comments", review_top).hide();
						$(".pluck-review-full-review-no-comments", review_top).show();
					} else {
						$(".pluck-review-full-review-has-comments", review_top).show();
						$(".pluck-review-full-review-no-comments", review_top).hide();
					}
				});
				pluckAppProxy.pluck_reviews_list_commentCreate = pluckAppProxy.registerActivityCallback("CommentCreate", function(activityObj) {
					if (activityObj.commentOnKeyType != "review" || activityObj.parentCommentKey || activityObj.moderated) return;
					var review_top = $("div[reviewkey='" + activityObj.commentOnKey + "']", list);
					if (review_top.length == 0) return;

					var counter = $(".pluck-review-full-review-comment-count", review_top);
					if (counter.length == 0) return;
					var count = parseInt(counter.text());
					count = count + 1;
					counter.html("" + count);
					if (count <= 0) {
						$(".pluck-review-full-review-has-comments", review_top).hide();
						$(".pluck-review-full-review-no-comments", review_top).show();
					} else {
						$(".pluck-review-full-review-has-comments", review_top).show();
						$(".pluck-review-full-review-no-comments", review_top).hide();
					}
				});
				if (isIE6) {
					pluckAppProxy.pluck_review_list_commentsRendered = pluckAppProxy.registerActivityCallback("CommentsRendered", function(activityObj) {
						$(".pluck-footer-logo", list).hide();
					});
				}
				var actObj = { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType, reviewOnCategory: params.plckReviewOnCategory,
						   sort: params.plckReviewSort, filter: params.plckReviewFilter,
						   onPage: params.plckReviewOnPage, itemsPerPage: params.plckItemsPerPage,
						   findReviewKey: params.plckReviewKey }
				pluckAppProxy.executeActivityCallbacks("ReviewListRendered", actObj);
			};

			pluckAppProxy.pluck_reviews_list_refresh = function(listId, updatedParams) {
				var list = $(listId);
				$(".qtip").hide();
				var params = $.extend({}, list.data("params"), { plckReviewKey: "" }, updatedParams, { plckReviews: "", plckReviewCreate: ""});

				if (params.plckReviewKey) {
					params.plckReviewSort = params.plckReviewFilter = "";
				}
				for (var i in params) {
					if (!params[i]) delete params[i];
				}

				// Clear the list callbacks.
				if (pluckAppProxy.pluck_reviews_list_commentDelete) {
					pluckAppProxy.unregisterActivityCallback("CommentDelete", pluckAppProxy.pluck_reviews_list_commentDelete);
					pluckAppProxy.pluck_reviews_list_commentDelete = null;
				}
				if (pluckAppProxy.pluck_reviews_list_commentCreate) {
					pluckAppProxy.unregisterActivityCallback("CommentCreate", pluckAppProxy.pluck_reviews_list_commentCreate);
					pluckAppProxy.pluck_review_list_commentCreate = null;
				}
				if (pluckAppProxy.pluck_reviews_list_commentsRendered) {
					pluckAppProxy.unregisterActivityCallback("CommentsRendered", pluckAppProxy.pluck_reviews_list_commentsRendered);
					pluckAppProxy.pluck_review_list_commentsRendered = null;
				}

				params.clientUrl = pluckAppProxy.pluck_reviews_cleanClientUrl();
				if (list.attr("pagerefresh") == "true") {
					document.location.href = pluckAppProxy.pluck_reviews_list_refresh_url(params);
					return;
				}

				pluckAppProxy.closeDialogs();
				pluckAppProxy.displayWait($(".pluck-reviews-working", list));

				params.contentType = "Html";
				if(pluckAppProxy.debugLevel) params.debug = pluckAppProxy.debugLevel;
				pluckAppProxy.ensureOnScreen(list, function() {
					pluckAppProxy.callApp("pluck/reviews/list.app", params, function(data) {
						var p = list.parent();
						list.replaceWith(data);
						pluckAppProxy.ensureOnScreen(p.children('.pluck-review-list'), null, { forceToTop: $.browser.msie });
					});
				});
			};

			pluckAppProxy.pluck_reviews_sync = function(listId) {
				var list = $(listId);
				var reviewOnKey = list.attr("reviewonkey") || "";
				var reviewOnCategory = list.attr("reviewoncategory") || "";
				if (reviewOnCategory != "") {
					var rollup = $(".pluck-review-rollup[reviewoncategory='" + reviewOnCategory + "']");
					rollup.each(function() {
						pluckAppProxy.pluck_reviews_rollup_refresh("#" + $(this).attr("id"));
					});
					var mosthelpful = $(".pluck-review-most-helpful[reviewoncategory='" + reviewOnCategory + "']");
					mosthelpful.each(function() {
						pluckAppProxy.pluck_reviews_mostHelpful_refresh("#" + $(this).attr("id"));
					});
				} else if (reviewOnKey != "" ) {
					var rollup = $(".pluck-review-rollup[reviewonkey='" + reviewOnKey + "']");
					rollup.each(function() {
						pluckAppProxy.pluck_reviews_rollup_refresh("#" + $(this).attr("id"));
					});
					var mosthelpful = $(".pluck-review-most-helpful[reviewonkey='" + reviewOnKey + "']");
					mosthelpful.each(function() {
						pluckAppProxy.pluck_reviews_mostHelpful_refresh("#" + $(this).attr("id"));
					});
				}
			};
		}

		/**************************************
		 *
		 * pluck/reviews/rollup
		 *
		 **************************************/
		if (typeof(pluckAppProxy.pluck_reviews_rollup) === 'undefined') {
			pluckAppProxy.pluck_reviews_rollup = function (topId, params) {
				var top = $(topId);
				top.data("params", params);

				if (isIE6) {
					$(".pluck-review-rollup-dialog", top).bgiframe();
				}

				$(".pluck-review-rollup-review-meta-more", top).click(function() {
					var dialog = $(".pluck-review-rollup-dialog", top);
					if (dialog.css("display") != "none") {
						pluckAppProxy.fadeOut(dialog);
					} else {
						// Find all rollup dialogs on page and hide.
						$(".pluck-review-rollup-dialog").each(function() {
							pluckAppProxy.fadeOut($(this));
						});
						var obj = $(this);
						var offsets = { top: dialog.outerHeight(), left: Math.round((dialog.width() - obj.width()) / 2) };
						pluckAppProxy.displayDialog(dialog, obj, offsets);
					}
					return false;
				});

				$(".pluck-review-rollup-dialog", top).click(function() {
					pluckAppProxy.fadeOut($(this));
				});

				$("a.pluck-review-full-attribute-name-ref", top).click(function() {
					var filter = $(this).attr("filter");
					var reviewOnKey = top.attr("reviewOnKey") || "";
					var reviewOnCategory = top.attr("reviewOnCategory") || "";
					var list = null;
					if (reviewOnCategory != "") {
						list = $(".pluck-review-list[reviewoncategory='" + reviewOnCategory + "']");
					} else {
						list = $(".pluck-review-list[reviewonkey='" + reviewOnKey + "']");
					}
					if (list.length == 1) {
						if (list.data("params") && list.data("params").plckReviewFilter != filter) {
							pluckAppProxy.pluck_reviews_list_refresh("#" + list.attr("id"), { plckReviewOnPage: "1", plckReviewSort: "TimeStampDescending", plckReviewFilter: filter});
						} else {
							pluckAppProxy.ensureOnScreen(list);
						}
						pluckAppProxy.fadeOut($(".pluck-review-rollup-dialog", top));
						return false;
					}
					return true;
				});

				$("a.pluck-review-rollup-review-meta-count", top).click(function() {
					var reviewOnKey = top.attr("reviewOnKey");
					var reviewOnCategory = top.attr("reviewOnCategory") || "";
					var list = null;
					if (reviewOnCategory != "") {
						list = $(".pluck-review-list[reviewoncategory='" + reviewOnCategory + "']");
					} else {
						list = $(".pluck-review-list[reviewonkey='" + reviewOnKey + "']");
					}
					if (list.length == 1) {
						var lparams = list.data("params");
						if (lparams && lparams.plckReviewKey) {
							pluckAppProxy.pluck_reviews_list_refresh("#" + list.attr("id"), {});
						} else if (lparams && lparams.plckReviewFilter) {
							pluckAppProxy.pluck_reviews_list_refresh("#" + list.attr("id"), { plckReviewOnPage: "1", plckReviewSort: "TimeStampDescending", plckReviewFilter: "" });
						} else {
							pluckAppProxy.ensureOnScreen(list);
						}
						return false;
					}
					return true;
				});

				$("a.pluck-review-create-review-rollup", top).click(function() {
					var reviewOnKey = top.attr("reviewOnKey");
					var list = $(".pluck-review-list[reviewonkey='" + reviewOnKey + "']");
					if (list.length == 1) {
						pluckAppProxy.pluck_reviews_submit_refresh("#" + list.attr("id"));
						return false;
					}

					// Check to see if the submit is already there.
					var submit = $(".pluck-review-create[reviewonkey='" + reviewOnKey + "']");
					if (submit.length == 1) {
						pluckAppProxy.ensureOnScreen(submit);
						return false;
					}
					return true;
				});
				pluckAppProxy.executeActivityCallbacks("ReviewRollupRendered", { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType, reviewOnCategory: params.plckReviewOnCategory });
			};

			pluckAppProxy.pluck_reviews_rollup_refresh = function(topId) {
				var top = $(topId);
				$(".qtip").hide();
				var params = $.extend({}, top.data("params"));
				params.clientUrl = pluckAppProxy.pluck_reviews_cleanClientUrl();
				
				pluckAppProxy.closeDialogs();
				// Do not ensure on screen - this can refresh in background
				pluckAppProxy.displayWait($(".pluck-reviews-working", top));

				params.contentType = "Html";
				if(pluckAppProxy.debugLevel) params.debug = pluckAppProxy.debugLevel;
				pluckAppProxy.callApp("pluck/reviews/rollup.app", params, function(data) {
					top.replaceWith(data);
				});
			};
		}

		/**************************************
		 *
		 * pluck/reviews/rollup
		 *
		 **************************************/
		if (typeof(pluckAppProxy.pluck_reviews_category_rollup) === 'undefined') {
			pluckAppProxy.pluck_reviews_category_rollup = function (topId, params) {
				pluckAppProxy.executeActivityCallbacks("ReviewCategoryRollupRendered", { category: params.plckDiscoveryCategory });
			};
		}

		/**************************************
		 *
		 * pluck/reviews/mostHelpful
		 *
		 **************************************/
		if (typeof(pluckAppProxy.pluck_reviews_mostHelpful) === 'undefined') {
			pluckAppProxy.pluck_reviews_mostHelpful = function (topId, params) {
				var top = $(topId);
				top.data("params", params);

				$(".pluck-review-most-helpful-review-full-review-link", top).click(function() {
					var reviewOnKey = top.attr("reviewOnKey");
					var reviewOnCategory = top.attr("reviewOnCategory") || "";
					var list = null;
					if (reviewOnCategory != "") {
						list = $(".pluck-review-list[reviewoncategory='" + reviewOnCategory + "']");
					} else {
						list = $(".pluck-review-list[reviewonkey='" + reviewOnKey + "']");
					}
					if (list.length == 1) {
						pluckAppProxy.pluck_reviews_list_refresh("#" + list.attr("id"), { plckReviewKey: $(this).attr("reviewkey")});
						return false;
					}
					return true;
				});

				var favorableTop = $(".pluck-review-most-helpful-favorable-single-review:first", top);
				var criticalTop = $(".pluck-review-most-helpful-critical-single-review:first", top);
				var enableButtons = function() {
					var prev = favorableTop.prev(".pluck-review-most-helpful-favorable-single-review");
					var hasPrev = prev.length > 0;
					$(".pluck-review-most-helpful-favorable-button .pluck-review-most-helpful-prev-button", top).toggle(hasPrev);
					$(".pluck-review-most-helpful-favorable-button .pluck-review-most-helpful-prev-disabled", top).toggle(!hasPrev);

					var next = favorableTop.next(".pluck-review-most-helpful-favorable-single-review");
					var hasNext = next.length > 0;
					$(".pluck-review-most-helpful-favorable-button .pluck-review-most-helpful-next-button", top).toggle(hasNext);
					$(".pluck-review-most-helpful-favorable-button .pluck-review-most-helpful-next-disabled", top).toggle(!hasNext);

					prev = criticalTop.prev(".pluck-review-most-helpful-critical-single-review");
					hasPrev = prev.length > 0;
					$(".pluck-review-most-helpful-critical-button .pluck-review-most-helpful-prev-button", top).toggle(hasPrev);
					$(".pluck-review-most-helpful-critical-button .pluck-review-most-helpful-prev-disabled", top).toggle(!hasPrev);

					next = criticalTop.next(".pluck-review-most-helpful-critical-single-review");
					hasNext = next.length > 0;
					$(".pluck-review-most-helpful-critical-button .pluck-review-most-helpful-next-button", top).toggle(hasNext);
					$(".pluck-review-most-helpful-critical-button .pluck-review-most-helpful-next-disabled", top).toggle(!hasNext);
				};
				enableButtons();

				$(".pluck-review-most-helpful-favorable-button a.pluck-review-most-helpful-next", top).click(function() {
					var newTop = favorableTop.next(".pluck-review-most-helpful-favorable-single-review");
					if (newTop.length == 0) return false;
					var diff = newTop.position().top - favorableTop.position().top;

					favorableTop = newTop;
					enableButtons();
					$(".pluck-review-most-helpful-favorable-single-review-container", top).animate({
						top: '-=' + diff
					}, 1000 );
					return false;
				});
				$(".pluck-review-most-helpful-favorable-button a.pluck-review-most-helpful-prev", top).click(function() {
					var newTop = favorableTop.prev(".pluck-review-most-helpful-favorable-single-review");
					if (newTop.length == 0) return false;
					var diff = favorableTop.position().top - newTop.position().top;

					favorableTop = newTop;
					enableButtons();
					$(".pluck-review-most-helpful-favorable-single-review-container", top).animate({
						top: '+=' + diff
					}, 1000 );
					return false;
				});

				$(".pluck-review-most-helpful-critical-button a.pluck-review-most-helpful-next", top).click(function() {
					var newTop = criticalTop.next(".pluck-review-most-helpful-critical-single-review");
					if (newTop.length == 0) return false;
					var diff = newTop.position().top - criticalTop.position().top;

					criticalTop = newTop;
					enableButtons();
					$(".pluck-review-most-helpful-critical-single-review-container", top).animate({
						top: '-=' + diff
					}, 1000 );
					return false;
				});
				$(".pluck-review-most-helpful-critical-button a.pluck-review-most-helpful-prev", top).click(function() {
					var newTop = criticalTop.prev(".pluck-review-most-helpful-critical-single-review");
					if (newTop.length == 0) return false;
					var diff = criticalTop.position().top - newTop.position().top;

					criticalTop = newTop;
					enableButtons();
					$(".pluck-review-most-helpful-critical-single-review-container", top).animate({
						top: '+=' + diff
					}, 1000 );
					return false;
				});

				var updateShowHiddenInfo = function(p, showIt) {
					pluckAppProxy.fadeOut(p, function() {
						if (showIt) p.addClass("pluck-review-most-helpful-showHiddenInfo");
						else p.removeClass("pluck-review-most-helpful-showHiddenInfo");
						pluckAppProxy.fadeIn(p);
					});
				};

				$("a.pluck-review-most-helpful-show-hidden-info", top).click(function() {
					updateShowHiddenInfo($(this).parents('div.pluck-review-most-helpful-critical-single-review, div.pluck-review-most-helpful-favorable-single-review'), true);
					return false;
				});
				$("a.pluck-review-most-helpful-hide-hidden-info", top).click(function() {
					updateShowHiddenInfo($(this).parents('div.pluck-review-most-helpful-critical-single-review, div.pluck-review-most-helpful-favorable-single-review'), false);
					return false;
				});
				pluckAppProxy.executeActivityCallbacks("ReviewMostHelpfulRendered", { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType, reviewOnCategory: params.plckReviewOnCategory });
			};

			pluckAppProxy.pluck_reviews_mostHelpful_refresh = function(topId) {
				var top = $(topId);
				var params = $.extend({}, top.data("params"));
				params.clientUrl = pluckAppProxy.pluck_reviews_cleanClientUrl();
				
				pluckAppProxy.closeDialogs();
				// Do not ensure on screen - let update in background
				pluckAppProxy.displayWait($(".pluck-reviews-working", top));

				params.contentType = "Html";
				if(pluckAppProxy.debugLevel) params.debug = pluckAppProxy.debugLevel;
				pluckAppProxy.callApp("pluck/reviews/mostHelpful.app", params, function(data) {
					top.replaceWith(data);
				});
			};
		}

		/**************************************
		 *
		 * pluck/reviews/recent
		 *
		 **************************************/
		if (typeof(pluckAppProxy.pluck_reviews_recent) === 'undefined') {
			pluckAppProxy.pluck_reviews_recent = function (topId, params) {
				var top = $(topId);

				$(".pluck-review-recent-reviews-review-full-review-link", top).click(function() {
					var reviewOnKey = $(this).attr("reviewOnKey");
					var list = $(".pluck-review-list[reviewonkey='" + reviewOnKey + "']");
					if (list.length == 1) {
						pluckAppProxy.pluck_reviews_list_refresh("#" + list.attr("id"), { plckReviewKey: $(this).attr("reviewkey")});
						return false;
					}
					return true;
				});

				var updateShowHiddenInfo = function(p, showIt) {
					pluckAppProxy.fadeOut(p, function() {
						if (showIt) p.addClass("pluck-review-recent-reviews-showHiddenInfo");
						else p.removeClass("pluck-review-recent-reviews-showHiddenInfo");
						pluckAppProxy.fadeIn(p);
					});
				};

				$("a.pluck-review-recent-reviews-show-hidden-info", top).click(function() {
					updateShowHiddenInfo($(this).parents('div.pluck-review-recent-reviews-single-review-wrap'), true);
					return false;
				});
				$("a.pluck-review-recent-reviews-hide-hidden-info", top).click(function() {
					updateShowHiddenInfo($(this).parents('div.pluck-review-recent-reviews-single-review-wrap'), false);
					return false;
				});
				pluckAppProxy.executeActivityCallbacks("ReviewRecentRendered", { reviewOnKey: params.plckReviewOnKey, reviewOnKeyType: params.plckReviewOnKeyType, reviewOnCategory: params.plckReviewOnCategory, category: params.plckReviewOnCategory });
			};
		}

		/**************************************
		 *
		 * pluck/reviews/topRated
		 *
		 **************************************/
		if (typeof(pluckAppProxy.pluck_reviews_topRated) === 'undefined') {
			pluckAppProxy.pluck_reviews_topRated = function (topId, params) {
				var top = $(topId);

				var updateShowHiddenInfo = function(p, showIt) {
					p.hide();
					if (showIt) p.addClass("pluck-review-top-rated-showHiddenInfo");
					else p.removeClass("pluck-review-top-rated-showHiddenInfo");
					p.show();
				};

				$("a.pluck-review-top-rated-show-hidden-info", top).click(function() {
					updateShowHiddenInfo($(this).parents('div.pluck-review-top-rated-single-review-wrap'), true);
					return false;
				});
				$("a.pluck-review-top-rated-hide-hidden-info", top).click(function() {
					updateShowHiddenInfo($(this).parents('div.pluck-review-top-rated-single-review-wrap'), false);
					return false;
				});
				pluckAppProxy.executeActivityCallbacks("ReviewTopRatedRendered", { reviewOnCategory: params.plckReviewOnCategory, category: params.plckReviewOnCategory });

			};
		}
	},
	
	// eachTime function.  Called whenever the plugin is requested, responsible for executing callbacks.
	function ($, jQuery, dmJQuery, callback){
		if(callback){
			callback();
		}
	}
);