///////////////////////////////////////////////////////////////////////////////
//	main.js
///////////////////////////////////////////////////////////////////////////////

var Brookstone = function() {
	this.context = '',
	this.isPOS = false;
	this.country = null;
	this.uuid = 0;
	this.runiqueId = /^bkst-id-\d+$/;
	this.sid = null;
	this.userId = null;

	this.useBBTypeAheadFix = true;

	this.NortonBuys = {};
	this.NortonBuys.on = true;
	this.NortonBuys.hash = 'nfE0URAHG9IhUJIt5pgj%2BQReWrwMzJUM5lukCydi%2B9zW4ma9WzxJtmP47LU3owJ75Q65YxUhb3ZmbP0zpQcNpw%3D%3D';

	this.mybuys = {};
	this.mybuys.on = true;

	var TellApart = function() {
		this.id = 'BSHrQRAc8Xxh';
		this.on = true;
	}
	TellApart.prototype = {
		constructor: TellApart,
		addToCart: function(cartItems) {
			try {
				if (__cmbLoaded && cartItems && cartItems.length > 0) {
					var action = TellApartCrumb.makeCrumbAction(this.id, 'updatecart');
					action.setActionAttr('UpdateCartType', 'PartialAdd');
					$.each(cartItems, function( i, cartItem) {
						if (cartItem.sku) {
							action.beginItem();
							action.setItemAttr('SKU', cartItem.sku);
							if (cartItem.price) {
								action.setItemAttr('ProductPrice', cartItem.price);
								action.setItemAttr('ProductCurrency', 'USD');
							}
							if (cartItem.qty) {
								action.setItemAttr('ItemCount', cartItem.qty);
							}
							action.endItem();
						}
					});
					action.setUserId($bks.getUserId());
					action.finalize();
				}
			} catch (err) {
				try {
					console.log(err);
				} catch (e) {}
			}
		},
		removeFromCart: function(cartItems) {
			try {
				if (__cmbLoaded && cartItems && cartItems.length > 0) {
					var action = TellApartCrumb.makeCrumbAction(this.id, 'updatecart');
					action.setActionAttr('UpdateCartType', 'PartialRemove');
					$.each(cartItems, function(i, cartItem) {
						if (cartItem.sku) {
							action.beginItem();
							action.setItemAttr('SKU', cartItem.sku);
							action.endItem();
						}
					});
					action.setUserId($bks.getUserId());
					action.finalize();
				}
			} catch (err) {
				try {
					console.log(err);
				} catch (e) {}
			}
		},
		submitTransaction: function(tx) {
			try {
				if (__cmbLoaded && tx) {
					var action = TellApartCrumb.makeCrumbAction(this.id, 'tx');
					action.setActionAttr('TransactionId', tx.id);
					action.setActionAttr('BillingName', tx.billingName);
					action.setActionAttr('BillingAddress', tx.billingAddress);
					action.setActionAttr('BillingCity', tx.billingCity);
					action.setActionAttr('Email', tx.email);
					action.setActionAttr('TransactionTotal', tx.total);
					action.setActionAttr('TransactionTotalCurrency', 'USD');
					if (tx.promos && tx.promos.length > 0) {
						var codes = $.map(promos, function(v) { return v.code; });
						var amts = $.map(promos, function(v) { return v.amt; });
						action.setActionAttr('PromoCode', codes);
						action.setActionAttr('PromoAmount', amts);
					}
					$.each(tx.items, function(i, item) {
						action.beginItem();
						action.setItemAttr('SKU', item.sku);
						action.setItemAttr('ProductPrice', item.price);
						action.setItemAttr('ProductCurrency', 'USD');
						action.setItemAttr('ItemCount', item.qty);
						action.endItem();
					});
					action.setActionAttr('X-IsNewBuyer', 'true');
					action.setActionAttr('X-SourceId', 'trk_tellapart');
					action.setUserId($bks.getUserId());
					action.finalize();
				}
			} catch (err) {
				try {
					console.log(err);
				} catch (e) {}
			}
		}
	}
	TellApart.prototype.init = function() {
		if (!$bks.isPOS && this.on) {
			try {
				var sku = null;
				var pageType = 'Other'
				var catPath = null;
				var query = null;
				head.ready("url", function () {
					if ($bks.module === 'catalog') {
						if ($bks.pageName.indexOf('search_results') != -1) {
							pageType = 'SearchResult';
							query = $URL.getQueryParameter('Ntt');
						} else {
							pageType = 'ProductCategory';
							var catId = $URL.getQueryParameter('catId');
							if (catId) {
								var catNodes = $.makeArray(catId.split('|').reverse());
								catNodes.forEach(function(e,index) {
									catNodes[index] = catNodes[index].replace(/L[1-3]{1}_/g, '');
								});

								if ($bks.isArray(catNodes)) {
									catPath = catNodes.join(' > ');
								} else {
									catPath = catNodes;
								}
							}
						}
					} else if ($bks.module === 'productDetails') {
						pageType = 'Product';
						if ($bks.products && $bks.products.viewing && $bks.products.viewing.length > 0) {
							sku = $bks.products.viewing[0].id;
						}
					}
					(function() {
						try {
							var tellApartJSURL = "https://sslt.tellapart.com/crumb.js";
							if ("https:"!== document.location.protocol) {
								for(var g=navigator.userAgent,h=0,e=0,i=g.length; e < i; e++) {
									h^=g.charCodeAt(e);
								}
								tellApartJSURL = "http://static.tellaparts.com/crumb" + h%10 + ".js";
							}
							head.load({tellapart: tellApartJSURL}, function() {
								__cmbLoaded = true;
								tellApartPageViewAction();
							});

							var tellApartPageViewAction = function() {
								var action = TellApartCrumb.makeCrumbAction($bks.TellApart.id, 'pv');
								action.setActionAttr("PageType", pageType);
								action.setActionAttr("ProductCategoryPath", catPath);
								action.setActionAttr("SearchQuery", query);
								action.setActionAttr("SKU", sku);
								action.setUserId($bks.getUserId());
								action.finalize();
							}
						} catch (err) {
							try {
								console.log(err);
							} catch (e) {}
						}
					})();
				});
			} catch (err) {
				try {
					console.log(err);
				} catch (e) {}
			}
		}
	}
	this.TellApart = new TellApart();
}

Brookstone.fn = Brookstone.prototype = {
	constructor: Brookstone,

	uniqueId: function(selector) {
		return $(selector).each(function() {
			if ( !this.id ) {
				$bks.uuid++;
				$(this).attr('id', 'bkst-id-' + ($bks.uuid));
			}
		});
	},

	removeUniqueId: function(selector) {
		return $(selector).each(function() {
			if ( $bks.runiqueId.test( this.id ) ) {
				$(this).removeAttr( "id" );
			}
		});
	},

	isArray: function(obj) {
        return obj &&
        typeof obj === 'object' &&
        typeof obj.length === 'number' &&
        typeof obj.splice === 'function' &&
        !(obj.propertyIsEnumerable('length'));
	},

	getSessionId: function() {
		if (sid == null) {
			var sid = document.cookie.match(/JSESSIONID=[^;]+/);
			if(sid != null) {
				if ($bks.isArray(sid)) {
					sid = sid[0].substring(11);
				} else {
					sid = sid.substring(11);
				}
			}
		}
		return sid;
	},

	getUserId: function() {
		userId = readCookie('DYN_USER_ID');
		if (!userId || $.trim(userId).length == 0) {
			userId = this.getSessionId();
		}
		return userId;
	},

	maskPasswords: function(srcFld, evt) {
		if ( this.eatArrowKeys( srcFld, evt ) == false ) {
				return( false );
		}
		var dstFld = document.getElementById(srcFld.id.replace(/^masked_/,''));
		var sPNewData = srcFld.value;
		var sPOldData = dstFld.value;
		var sPMask = "";
		var sPData = "";
		for( n = 0; n < sPNewData.length; n++ )
		{
			sPMask += '*';
			if (( n < sPOldData.length )&&( sPNewData.charAt(n) == '*' ))
			{
				sPData += sPOldData.charAt(n);
			}
			else
			{
				sPData += sPNewData.charAt(n);
			}
		}
		srcFld.value = sPMask;
		dstFld.value = sPData;
		return( true );
	},

	eatArrowKeys: function(srcFld, evt) {
		switch( evt.keyCode ? evt.keyCode : evt.which ) { case 37: case 38: case 39: case 40: return( false ); }
		return( true );
	},

	stripTags: function(txt, replaceWith) {
		if (!replaceWith) {
			replaceWith = '';
		}
		if (txt && typeof txt === 'string') {
			txt = txt.replace(/<[^>]*>/g, replaceWith);
		}
		return txt;
	}
};

///////////////////////////////////////////////////////////////////////////////
// Brookstone Init - Start
///////////////////////////////////////////////////////////////////////////////
Brookstone.prototype.init = function () {
	try {
		var	sURLTemp = document.location.href;

		if ( getURLParameter( "POSView" ) == "Bkst" )
		{
			this.isPOS = true;
			createCookie( "POSView", "Bkst", false );
		}

		if ( readCookie("POSView") == "Bkst" )
		{
			this.isPOS = true;
		}

	} catch( e ) {}

	try {
		this.TellApart.init();
	} catch (err) {
		try {
		    console.log(err);
		} catch (e) {}
	}

	$('input[type=hidden].maskedPassword').each( function(idx, el) {
		try {
			sID = $(el).attr('id');
			if (!sID ||( sID.length == 0 )) {
				sID = $( el ).attr('name');
				$(el).attr('id', sID);
			}

			var masked = $('<input type="text"/>');
			var attributes = $(el).propAttr("attributes");
			$.each(attributes, function() {
				try {
					masked.attr(this.name, this.value);
				} catch (e) {}
			});
			masked.attr('id', 'masked_' + sID);
			masked.attr('name', 'masked_' + masked.attr('name'));
			masked.removeClass('maskedPassword');
			masked.addClass('maskedPasswordControl');
			if ($(el).attr('value')) {
				masked.attr('value', Array($(el).attr('value').length + 1).join('*'));
			}
			masked.keyup(function(event) { return $bks.maskPasswords(this, event);});
			masked.keydown(function(event) { return $bks.eatArrowKeys(this, event);});
			masked.focus(function(){ this.selectionStart = this.selectionEnd = this.value.length; });
			masked.click(function(){ this.selectionStart = this.selectionEnd = this.value.length; });
			$(masked).insertBefore( el );
		} catch (err) {
			try {
				console.log(err);
			} catch (e) {}
		}
	});

	$('div.pseudo_self_label').each(function() {
	        $this = $(this);
			$input = $this.children('input');
	        $input.data('toggle', $this.children('label'));

	        if($.trim($input.val()) != "") {
	            $input.data('toggle').hide();
	        } else if ($input.data('toggle') && $input.data('toggle').size() >= 1) {
				$input.val($input.data('toggle').text());		}
	        $input.blur(function() {
	            $this = $(this);
	            if($.trim($this.val()) == "") {
	                //$this.data('toggle').show();
					$this.val($this.data('toggle').text());
	            }
	        });
	        $input.focus(function() {
	            $this = $(this);
	            if($this.data('toggle') && ($.trim($this.val()) == $.trim($this.data('toggle').text()))) {
					$this.val('');
	            }
	        });
			$this.parents('form').submit(function() {
				$this = $(this);
				$this.find("div.pseudo_self_label input").each(function() {
					$this = $(this);
					if ($this.data('toggle') && $this.data('toggle').text() == $this.val()) {
						$this.val('');
					}
				});
			});
	});
	/*
	 * The below function replaces all state text inputs with select boxes
	 */
	if($('select.country').size() > 0) {
		$.ajax({
		  url: brookstone.context + "/global/gadgets/states.jsp",
		  success: function(data) {
			brookstone.country = data;
			$('select.country').each(function() {
				$this = $(this);
				/* The closest function travels up the tree, looking for the first match for the selector,
				* multiple instances on one page.
				*/
				$stateInput = $this.closest('fieldset').find('input.state');
				stateInputVal = $stateInput.val();
				$stateSelect = $("<select class='state'></select>");
				if($stateInput.attr('id') != "") {
					$stateSelect.attr('id', $stateInput.attr('id'));
				}
				if($stateInput.attr('name') != "") {
					$stateSelect.attr('name', $stateInput.attr('name'));
				}
				// stores the created select box as a data element on the country box, making for easier access
				// during the "change" event
				$stateSelect.replaceAll($stateInput);
				$this.change(function(){
					$this = $(this);
					//persist the country code, making for faster access later in our "for" loop
					selectedCountryCode = $this.val();
					if(brookstone.country[selectedCountryCode] != undefined) {
						var html = "";
						var tmp = [];

						for(var region in brookstone.country[selectedCountryCode].regions) {
							tmp.push("<option value=\"" + brookstone.country[selectedCountryCode].regions[region].value + "\">" + brookstone.country[selectedCountryCode].regions[region].name + "</option>");
						}
						if(tmp.length === 1) {
							html = tmp.join('');
						} else {
							html = "<option value=\"\">Please Select</option>" + tmp.join('');
						}
						$oldStateSelect = $this.closest('fieldset').find('select.state');
						$stateSelect = $("<select class='state'></select>");
						if($stateInput.attr('id') != "") {
							$stateSelect.attr('id', $oldStateSelect.attr('id'));
						}
						if($stateInput.attr('name') != "") {
							$stateSelect.attr('name', $oldStateSelect.attr('name'));
						}
						$stateSelect.html(html);
						$stateSelect.replaceAll($oldStateSelect);
					}
				}).change();
				if( $.trim($stateInput.val()) != ""){
					$stateSelect.val($stateInput.val());
				}
			});
		  },
		  dataType: 'json'
		});
	}
	$.extend({
	  getUrlVars: function(){
	   var kvp = document.location.search.substr(1).split('&'), vars = [];

	    var i=kvp.length; var x; while(i--)
	    {
	        x = kvp[i].split('=');
			vars.push({ "name": x[0], "value": x[1] })
	    }
	    return vars;
	  },
	  getUrlVar: function(name){
		var output = "";
		$.each($.getUrlVars(),function(index, value) {
			if(value.name == name) {
				output = value.value;
				return false;
			}
		});
	    return output;
	  }
	});


	//submit # of items per page on select
	$("select[name='sortBy'], select[name='pageSize']").change(function() {
		var urlParams = $.getUrlVars();
		var newParams = $(this).closest('form').serializeArray();
		$.each(newParams, function(index, value) {
			var itemFound = false;
			$.each(urlParams, function(inde, v) {
				if(v.name == value.name) {
					v.value = value.value;
					itemFound = true;
					return false;
				}
			});
			if(!itemFound) {
				urlParams.push(value);
			}
		});
		document.location.search = $.param(urlParams);
	});

	$("#facetForm input:checkbox").click(function(e) {
	    value = this.value;
	    blockScreen();
		if ( value.indexOf( "?" ) > -1 )
			value = value.substring( value.indexOf( "?" ) + 1 );
		document.location.search = value;
	});

	$(".more_link").click(function() {
		$(this).hide();
		$(this).next().show();
	});

	$(".less_link").click(function() {
		$(this).parent().hide();
		$(this).parent().prev().show();

	});

	//autocomplete
	try {
	$.ui.autocomplete.prototype._renderItem = function (ul, item) {
	            item.label = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	            return $("<li></li>")
	                    .data("item.autocomplete", item)
	                    .append("<a>" + item.label + "</a>")
	                    .appendTo(ul);
	};

	$(function(){
		if ( $bks.isPOS == true ) return;

		//attach autocomplete
	    $("#frm_text_simple_search").autocomplete({

	        //define callback to format results
	    	source: function(req, add){
				add( $bks.getSearchCategories4Term(req.term) );
			},
	    	select: function( event, ui ) {
	    		var bkiid = $bks.stripTags(ui.item.label).toLowerCase().replace('&', 'and').replace(/\s/g, '_');
	    		window.location = "/"+ ui.item.value + "?bkiid=typeahead_" + bkiid;
	    	},
			minLength: 3
	    });
	});
	} catch(err) {
		try {
			console.log(err);
		} catch (e) {}
	}


	head.ready('tools', function() {
		try {
			if ($("#popupContact") && $("#popupContact").size() > 0) {
				$("#popupContact").overlay({
					fixed: false,
					oneInstance: false,
					top: 50,
					mask: {
						color: '#000',
						// load mask a little faster
						loadSpeed: 200,
						// very transparent
						opacity: 0.4
					}
				});
			}
		} catch (e) {}
		$("#popupContactClose").live('click', function(e) {
			e.preventDefault();
			$("#popupContact").data('overlay').close();
		});


		try { $("#popupContact").data('overlay').load(); } catch(e) {}
	});


	 // Form Submit for Registration With Existing Account

	$('#xRegisterFormId').live('submit',
		  function(e){
		  	  e.preventDefault();
			 // alert('test');
			 // alert($('#xRegisterFormId').serialize());
			 // alert($('#xRegisterFormId').attr("action"));
			  $('span.error_message').html('');
			  $('div.form_row').removeClass('form_error');
			   $('.error').hide();
			   var dummyUrl =  $('#dummyJspUrl').val();
			   var redirectURL =  $('#regisRedirectPage').val();
			   $.ajax({
			     type: 'post',
			     url: dummyUrl,
			     dataType: 'json',
			     data: $('#xRegisterFormId').serialize(),
			     success: function(data) {
			      if (data.status == "success") {
			      	window.location.href = redirectURL;
			      } else {
			      $('.error').show();
			      	if (data.message.length > 0) {
			      	$.each(data.message, function(index, value) {

			      		if (value.formFieldId != undefined && value.formFieldId.indexOf(".") != -1) {
			      			var id = '#' + value.formFieldId.replace(".","_");
			      			var errorMsgId = '#xRegisterFormId' + ' ' +  id;
			      			$('#xRegisterFormId').find(id).addClass("form_error");
			      			$(errorMsgId).find('.error_message').html(value.errorMessage);

			      		}


				  	});
			      }
			   }



		     },
		     error: function(data) {alert('bad response');}
		  });
	   });

	 // Form Submit for Login With Existing Account

	$('#xLoginFormId').live('submit',
		  function(e){
		  	  e.preventDefault();
			 // alert('test1');
			  //alert($('#xLoginFormId').serialize());
			 // alert($('#xLoginFormId').attr("action"));
			 $('span.error_message').html('');
			 $('div.form_row').removeClass('form_error');
			 $('.error').hide();
			  var dummyUrl =  $('#dummyJspLoginUrl').val();
			 var redirectURL =  $('#loginRedirectPage').val();
			   $.ajax({
			     type: 'post',
			     url:dummyUrl,
			     dataType: 'json',
			     data: $('#xLoginFormId').serialize(),
			     success: function(data) {
			     // alert(data + data.status);
			      if (data.status == "success") {
			      	window.location.href = redirectURL;
			      } else {
			        // document.getElementById('.error_message_container').style.visibility = 'visible';
			        $('.error').show();
			      	if (data.message.length > 0) {
			      	$.each(data.message, function(index, value) {
						if (value.formFieldId != undefined && value.formFieldId.indexOf(".") != -1) {
			      			//alert(value.formFieldId);
			      			//alert(value.errorMessage);
			      			var id = '#' + value.formFieldId.replace(".","_");
			      			var errorMsgId = '#xLoginFormId' + ' ' +  id;
			      			//alert('hjhjhjh' + id);
			      			$('#xLoginFormId').find(id).addClass("form_error");
			      			$(errorMsgId).find('.error_message').html(value.errorMessage);

			      		}


				  	});
			      }
			   }
			},
		     error: function(data) {alert('bad response');}
		  });
	   });


	head.ready('tools', function() {
		try {
			if ($("#privacy_security_info") && $("#privacy_security_info").size() > 0) {
				 $("#privacy_security_info").overlay({
					fixed: false,
					oneInstance: false,
					top: 50,
					mask: {
						color: '#000',
						// load mask a little faster
						loadSpeed: 200,
						// very transparent
						opacity: 0.4
					}
				});
			}
		} catch (e) {}
	});
	$("a.trigger_safe_secure").click(function(e) {

	      e.preventDefault();

	      $("#privacy_security_info").show();

	});

	$(".trigger_close_safe_secure").click(function(e) {

	      e.preventDefault();

	      $("#privacy_security_info").hide();

	});
	head.ready('tools', function() {
		try {
			if ($("#terms_of_use_info") && $("#terms_of_use_info").size() > 0) {
				$("#terms_of_use_info").overlay({
					fixed: false,
					oneInstance: false,
					top: 50,
					mask: {
						color: '#000',
						// load mask a little faster
						loadSpeed: 200,
						// very transparent
						opacity: 0.4
					}
				});
			}
		} catch (e) {}
	});

	$("a.trigger_terms_of_use").click(function(e) {
		e.preventDefault();
		$("#terms_of_use_info").show();
	});

	$(".trigger_close_terms_of_use").click(function(e) {

	      e.preventDefault();

	     $("#terms_of_use_info").hide();

	});

	adjustSharingCSS();

	$("#inner_search").closest("form").submit( function() {
		$(this).attr( "id", "frmInnerSearch" );
		$(this).attr( "action", "/endeca/search_results.jsp?Ntt=" + $("#inner_search").val() );
		$("#frmInnerSearch input[type='hidden']").remove();
		return( true );
	});

	try
	    {
	        if ( $(".br-related-heading").length < 1 )
	                    throw "error";
	    }
	    catch( ex )
	    {
	            try{ $("#divBR_outer_contianer").hide(); } catch( ex ) {}
	    }

		try
		{
			var	sURLTemp = document.location.href;
			if ( sURLTemp .indexOf("/endeca/search_results.jsp") > -1 )
			{
			var	oOrigLink = $(".sortByTable").eq(1).children().eq(0).children().eq(0).children().eq(2).children().eq(1);
			var	oPage1Link = null
			var	sPrevURL = null;
			var	oPrevLink = null;
			var	sAddEllipsus = "...";
			var	oOrigLink2= $(".sortByTable").eq(2).children().eq(0).children().eq(0).children().eq(2).children().eq(1);

				if (( oOrigLink.text().trim() != "1" )&&( oOrigLink.text().trim() != "<" ))
				{
					oPage1Link =  oOrigLink.clone();
					sPrevURL = sURLTemp;
					for ( n = 2; n < oOrigLink.parent().children().length; n++ )
					{
						sPrevURL = sPrevURL .replace( "pagNum="+n, "pagNum="+(n-1) );
					}
					if ( oOrigLink.text().trim() == "2" )
						sAddEllipsus = " ";
				}

				if ( oPage1Link != null )
				{
					oPage1Link.html( "1" );
					oPage1Link.attr( "title", "1" );
					oOrigLink.parent().children().eq(1).before( oPage1Link );
					oOrigLink.parent().children().eq(1).after( sAddEllipsus );

					oOrigLink2.parent().children().eq(1).before( oPage1Link.clone() );
					oOrigLink2.parent().children().eq(1).after( sAddEllipsus );

					if ( sPrevURL != null )
					{
						oPrevLink = oPage1Link.clone();
						oPrevLink.html( "&lt;" );
						oPrevLink.attr( "title", "Previous Page" );
						oPrevLink.attr( "rel", "prev" );
						oPrevLink.attr( "class", "pagArrow" );
						oPrevLink.attr( "href", sPrevURL );

						oOrigLink.parent().children().eq(1).before( oPrevLink );
						oOrigLink.parent().children().eq(1).after( " " );

						oOrigLink2.parent().children().eq(1).before( oPrevLink.clone() );
						oOrigLink2.parent().children().eq(1).after( " " );
					}

				}
			}
		}
		catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}


		try
		{
			if ( sURLTemp .indexOf("/endeca/search_results.jsp") > -1 )
			{
			    $('.sortByTable a[title="1"]').click(function() {
			    	var sURLTemp =  document.location.href;
			        if ( document.location.href.indexOf( "pagNum" ) >= 0 )
			        {
			        var nStart = document.location.href.indexOf( "pagNum" );
			        var nEnd = document.location.href.indexOf( "&", nStart );
			            sURLTemp = document.location.href.substring( 0, nStart );
			            if ( nEnd == -1 )
			            {
			            	sURLTemp = sURLTemp.substring( 0, sURLTemp.length-1);
			            }
			            else
			            {
			            	sURLTemp += document.location.href.substring( nEnd + 1 );
			            }
			        }
			        $(this).attr( "href", sURLTemp );
			        return true;
			    });
			}
		}
		catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}
		try
		{
			if ( sURLTemp .indexOf("/endeca/search_results.jsp") > -1 )
			{
				$('input[type=checkbox]').each(function () {
					if (( $(this).attr( "id" ).indexOf( "refinement_" ) > -1 )&&( $(this).val().indexOf( "null&Nty" ) > -1 ))
					{
						$(this).val( $(this).val() + "&Ntt=" + getURLParameter("Ntt") );
					}
				});
			}
		}
	catch( err ) {
		try {
			console.log(err);
		} catch (e) {}
	}

	if (!$bks.isPOS) {
		///////////////////////////////////////////////////////////////////////////////
		//SeeWhy
		///////////////////////////////////////////////////////////////////////////////
		try
		{
			$('body').append( '<img id="cy_image" width=1 height=1 border=0 alt="">' );
			postLoadSeeWhy();
		}
		catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}

		var	sURLTemp = document.location.href;
		//capture from the address page
		try
		{
			if (( sURLTemp.indexOf("/checkout/address.jsp") > -1 )||( sURLTemp.indexOf("/checkout2/address.jsp") > -1 ))
			{
				$("#billingAndShippingForm").submit(function() {
					if ( $('#special_offers').is(':checked'))
					{
						createCookie( "seewhy_email", $('#email_billing').val(), 1 );
						createCookie( "seewhy_fname", $('#first_name_billing').val(), 1 );
						createCookie( "seewhy_FunnelLevel", "5", 1 );
					}
					return true;
				});
			}
		}
		catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}

	    //capture from the email form in the footer
		try
		{
			$("#frm_email").submit(function() {
				createCookie( "seewhy_email", $('#frm_text_email').val(), 1 );
				createCookie( "seewhy_FunnelLevel", "1", 1 );
				return true;
			});
		}
		catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}

	    //capture from the account login page
		try
		{
			if ( sURLTemp.indexOf("/profile/login.jsp") > -1 )
			{
				$('#signUpUserName').parent().parent().submit(function() {
					createCookie( "seewhy_email", $('#signUpUserName .text').val(), 1 );
					createCookie( "seewhy_FunnelLevel", "2", 1 );
					return true;
				});
			}
		}
		catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}

	    //capture from the account creation page
		try
		{
			if ( sURLTemp.indexOf("/profile/createAccount.jsp") > -1 )
			{
				$("form.create_profile").submit(function() {
					if ( $('#receive_offers_yes').is(':checked'))
					{
						createCookie( "seewhy_email", $('#registerEmail .text').val(), 1 );
						createCookie( "seewhy_fname", $('#registerFirstName .text').val(), 1 );
						createCookie( "seewhy_FunnelLevel", "2", 1 );
					}
					return true;
				});
			}
		}
		catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}

		///////////////////////////////////////////////////////////////////////////////
		// Norton Buys Initialization
		///////////////////////////////////////////////////////////////////////////////
		if ($bks.NortonBuys.on && location.href.indexOf('e4x') === -1) {
			head.ready("nortonbuys", function() {
				try {
					if (window._GUARANTEE && _GUARANTEE.Loaded) {
						_GUARANTEE.Hash = $bks.NortonBuys.hash;
						_GUARANTEE.WriteSeal("_GUARANTEE_SealSpan", "GuaranteedSeal");
					}
				} catch( err ) {
					try {
						console.log(err);
					} catch (e) {}
				}
			});
	    }
	}

	///////////////////////////////////////////////////////////////////////////////
	//	All Categories Menu
	///////////////////////////////////////////////////////////////////////////////
	try {
		$('#liShowAllCats').hover(
			function () {
				$('#divAllCategories', this).fadeIn(); // fadeIn will show the sub cat menu
			},
			function () {
				$('#divAllCategories', this).fadeOut(); // fadeOut will hide the sub cat menu
			}
		);
	} catch( err ) {
		try {
			console.log(err);
		} catch (e) {}
	}

	///////////////////////////////////////////////////////////////////////////////
	//	EMAIL - Header / Footer
	///////////////////////////////////////////////////////////////////////////////
	//thanks for the email
	try
	{
        var urlParams = $.getUrlVars();
		$.each(urlParams, function(inde, v) {
			if(v.name == "frmeml") {
							 $("#divEmailThanks").css( "display", "block" );
				window.scrollTo(0, document.getElementById('divEmailThanks').offsetTop);

			}
		});
	} catch( err ) {
		try {
			console.log(err);
		} catch (e) {}
	}

	//re-enable the email form in the footer
	$( "#frm_text_email" ).removeAttr( "disabled" );

	// GTB - www-223 - on email signup send cheetahmail with referrer URL
	try {
	var	sURLTemp = window.location.host;
	if ( window.location.pathname[0] != "/" )
		sURLTemp += "/";
	    sURLTemp += window.location.pathname;
	    sURLTemp = window.location.pathname;
	} catch( err ) {
		try {
			console.log(err);
		} catch (e) {}
	}

	///////////////////////////////////////////////////////////////////////////////
	// PowerReviews - Start
	///////////////////////////////////////////////////////////////////////////////
	try {
	    // add the power reviews css
	    var m = null;
		if ( $("body").attr("class" ) != "productDetails" )
		{
			m = document.createElement('link');
			m.type = 'text/css';
			m.rel = 'stylesheet';
			m.href = '/webassets/pwr/engine/pr_styles_review.css';
			document.body.appendChild( m );
			m = null;
			m = document.createElement('link');
			m.type = 'text/css';
			m.rel = 'stylesheet';
			m.href = '/webassets/pwr/engine/merchant_styles2.css';
			document.body.appendChild( m );
			m = null;
		}
	} catch( err ) {
		try {
			console.log(err);
		} catch (e) {}
	}
	///////////////////////////////////////////////////////////////////////////////
	// PowerReviews - End
	///////////////////////////////////////////////////////////////////////////////

	$( '#frmEmail2' ).bind('keypress', function(e)
	{
		if ( e.keyCode == 13 ) {
			frmEmail2submit();
		}
	});

	///////////////////////////////////////////////////////////////////////////////
	//Generic Overlay - end
	///////////////////////////////////////////////////////////////////////////////

	if( document.getElementById("divGenericOverlay") == null )
	{
        var divClose = document.createElement( "a" );
	    var divContent = document.createElement( "div" );
		divClose.className = "close";
		divClose.innerHTML = "X";
		divContent.className = "overlay";
		divContent.setAttribute( "id", "divGenericOverlay" );
		divContent.appendChild( divClose );
		document.body.appendChild( divContent );
	}

	///////////////////////////////////////////////////////////////////////////////
	//Generic Overlay - End
	///////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////////
	//	Checkout2 vs checkout cookie - start
	///////////////////////////////////////////////////////////////////////////////
	var	sURLTemp = document.location.href;
	if ( sURLTemp.indexOf("/checkout/address.jsp") > -1 )
	{
		eraseCookie( "checkoutflow" );
		createCookie( "checkoutflow", "checkout1", false );
	}
	else if ( sURLTemp.indexOf("/checkout2/address.jsp") > -1 )
	{
		eraseCookie( "checkoutflow" );
		createCookie( "checkoutflow", "checkout2", false );
	}
	else if ( sURLTemp.indexOf("/checkout/shipping.jsp") > -1 )
	{
		eraseCookie( "checkoutflow" );
		createCookie( "checkoutflow", "checkout1", false );
	}
	else if ( sURLTemp.indexOf("/checkout2/deliveryGiftOptions.jsp") > -1 )
	{
		eraseCookie( "checkoutflow" );
		createCookie( "checkoutflow", "checkout2", false );
	}
	///////////////////////////////////////////////////////////////////////////////
	//Checkout2 vs checkout cookie - end
	///////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////////
	//	Setup Advertisement Area - start
	///////////////////////////////////////////////////////////////////////////////
	var	sURLTemp = document.location.href;
	if ( sURLTemp.indexOf("/confirmation.jsp") > -1 )
	{
		if( document.getElementById("divAdArea") == null )
		{
		    var divContent = document.createElement( "div" );
			divContent.className = "divAdArea";
			divContent.setAttribute( "id", "divAdArea" );
			document.body.appendChild( divContent );
		}
		try {
			$.get( "/global/gadgets/getinternalmedia.jsp?assetName=adAreaBanner", function( data ) {
				if (( data != null )&&( $.trim( data ).length > 0 ))
				{
					$("#divAdArea" ).html( $.trim( data ) );
					$("#divAdArea" ).show();
				}
				else
				{
					$("#divAdArea" ).hide();
				}
			});
		} catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}
	}
	///////////////////////////////////////////////////////////////////////////////
	//Setup Advertisement Area - end
	///////////////////////////////////////////////////////////////////////////////

	// drop the gigya and my account links in the header
	var elDivs = document.getElementsByTagName('div');
	for ( n = 0; n < elDivs.length; n++ )
	{
		try {
			if ( elDivs[n].getAttribute( "class" ) == "sign_in_up" )
			{
				elDivs[n].style.display = "none";
			}
			// drop the my account section from the address page
			if ( elDivs[n].getAttribute( "class" ) == "ship_bill_headline new_account" )
				elDivs[n].parentNode.parentNode.style.display = "none";

		} catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}
	}

	// change my account header to customer service
	var elH2s = document.getElementsByTagName('h2');
	for ( n = 0; n < elH2s.length; n++ )
	{
		try {
			if (( elH2s[n].innerHTML == "My Account" )&&( elH2s[n].parentNode.getAttribute( "class" ) == "links" ))
				elH2s[n].innerHTML = "Customer Service";
		} catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}
	}

	// drop the gigya and my account links in the footer and left nav
	var elAnchors = document.getElementsByTagName('a');
	for ( n = 0; n < elAnchors.length; n++ )
	{
		try {

			// GTB - fixed for Bloggie links (added this if)
			if (( elAnchors[n].innerHTML == "Blog" )||( elAnchors[n].innerHTML == "Brookstone Blog" ))
			{
				elAnchors[n].href = "/brookstoneblog";
			}
		} catch( err ) {
			try {
				console.log(err);
			} catch (e) {}
		}
	}

	//remove gift card from the customerService page
	try { $("div.store_locator" ).append( " |" ); } catch( e ) { }

	// Insert Typeahead validations here
	$('input#frm_text_simple_search_submit').live('click',function() {
		$('input#frm_text_simple_search').val($('input#frm_text_simple_search').val().replace(/\-/g,' '));
		return true;
	});

	// GTB - Added for validating the email address
	var g_emailValidator = null;
	head.ready("validation", function() {
	    g_emailValidator  = new Validation();
		g_emailValidator.getRule('email').msg = 'Please enter a valid email address.';
		$('#frm_emailnew').live('submit',function()
		{
			$('#divEmailThanks').html("").hide('fast');
			var validationResult = g_emailValidator.validate($("#frm_emailnew"));
			if (!validationResult.passed)
			{
			var errorEl = $('#divEmailThanks');
				errorEl.html(validationResult.message);
				errorEl.show('fast');
			}
			return validationResult.passed;
		});
	});
}
///////////////////////////////////////////////////////////////////////////////
// Brookstone Init - End
///////////////////////////////////////////////////////////////////////////////

window.brookstone = window.$bks = new Brookstone();
$(document).ready(function() {
	$bks.init();
});

///////////////////////////////////////////////////////////////////////////////
// POS - fix - Start
///////////////////////////////////////////////////////////////////////////////
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

///////////////////////////////////////////////////////////////////////////////
// POS - fix - End
///////////////////////////////////////////////////////////////////////////////

//submit the searchFrm when the "Enter" button is pressed.
function submitSearch(myForm){
	var question = window.document.forms[0].frm_text_simple_search.value;
	if(window.event.keyCode == 13)  {
		window.document.forms[0].action="/endeca/search_results.jsp?_dyncharset=utf8&Ntt="+encodeURIComponent(question);
		window.document.forms[0].submit();
		return false;
	}else{
		return true;
	}
};

function blockScreen() {
	   var lock = document.getElementById('blockPane');
	   if (lock)
	        lock.className = 'blockUIOn';
}

function adjustSharingCSS()
{
	try { $(".stMainServices.st-twitter-counter").attr( "style", "background-image: url('/webassets/images/twitter.gif'); width:30px;" ); } catch( e ) { }
	try { $(".stMainServices.st-pinterest-counter").attr( "style", "background-image: url('/webassets/images/pinIt.gif'); width:30px;" ); } catch( e ) { }
	try { $(".chicklets.email").html("&nbsp;"); } catch( e ) { }
	try { $(".chicklets.email").parent().attr( "style", "width:16px;" );  } catch( e ) { }
	try { $(".st_email_hcount .stButton .stArrow" ).attr( "style", "display:none;" );  } catch( e ) { }
	try { $("#gigya-share-buttons").attr( "style", "visibility:visible;" );  } catch( e ) { }
	try { $(".stButton").css( 'margin-left','0px' ); } catch( e ) { }
	try { $(".stButton").css( 'margin-right','0px' ); } catch( e ) { }
}

/*
function showBRMore( sID )
{
	$( ".br-sf-widget" ).each( function() {
		$(this).hide();
	});
	$( "#" + sID ).show();
	$( "#brClose" ).attr( "onCLick", "hideBRMore('"+sID+"');" );
	$( "#brClose" ).show();
}

function hideBRMore( sID )
{
	$( "#brClose" ).hide();
	$( "#" + sID ).hide();
	$( ".br-sf-widget" ).each( function() {
		$(this).show();
	});
}
*/

///////////////////////////////////////////////////////////////////////////////
//SeeWhy
///////////////////////////////////////////////////////////////////////////////

function postLoadSeeWhy()
{
	if ( $bks.isPOS == true ) return;

	var	sURLTemp = document.location.href;
	try
	{
		//capture email from landing page
		if ( getURLParameter( "cyEmail" ) )
		{
			cy.Custom1="Guest";
			cy.UserId=unescape( getURLParameter('cyEmail') );
			cy.FunnelLevel="0";
			_cyCreateClientCookie('_cysldr', 'disabled');
			cy_getImageSrc();
		}
	}
	catch( err ) {
		try {
			console.log(err);
		} catch (e) {}
	}
	//send email data passed in cookie
	try
	{
		if ( readCookie("seewhy_email") )
		{
			cy.FunnelLevel="1";
			cy.Custom1="Guest";
			cy.UserId=readCookie("seewhy_email");
			if ( readCookie("seewhy_FunnelLevel") )
				cy.FunnelLevel=readCookie("seewhy_FunnelLevel");
			if ( readCookie("seewhy_fname") )
				cy.Custom1=readCookie("seewhy_fname");
			eraseCookie( "seewhy_email" );
			eraseCookie( "seewhy_fname" );
			eraseCookie( "seewhy_FunnelLevel" );
			_cyCreateClientCookie('_cysldr', 'disabled');
			cy_getImageSrc();
		}
	}
	catch( err ) {
		try {
			console.log(err);
		} catch (e)  {}
	}
	//capture the first item in the cart
	try
	{
		if ( sURLTemp.indexOf("/cart/cart.jsp") > -1 )
		{
			cy.FunnelLevel="4";
			cy.Custom1="Guest";
			cy.Value=$('.order_detail_value').eq(5).text().replace( /[^0-9.]/,'');
			cy.ReturnToLink="http://www.brookstone.com/cart/cart.jsp";
			try {
				if (( typeof(g_sACID) != "undefined" )&&( g_sACID !== null ))
				{
					g_sACID = $.trim( g_sACID );
					if ( g_sACID.length > 0 )
						cy.custom6 = g_sACID;
				}
			} catch( err ) {
				try {
					console.log(err);
				} catch (e)  {}
			}

			cyNewBasketLine();
			cyAddBasketLineDetail('ItemName', $( "ul.cart li#0 ul.items-full li.col1 ul.details_container li a.product_name" ).html() );
            cyAddBasketLineDetail('ItemImageURL', 'www.brookstone.com' +  $("ul.cart li#0").find("img").attr( "src" ).replace( "100x100", "300x300" ) );
            cyAddBasketLineDetail('ItemPrice', $("ul.cart li#0").find("li.col2").text().substring( $("ul.cart li#0").find("li.col2").text().indexOf("$") ) );
            cyAddBasketLineDetail('ItemPageURL', 'www.brookstone.com' + $("ul.cart li#0").find("a.image_container").attr( "href" ) );
			_cyCreateClientCookie("_cy_prd",true);
			cy_getImageSrc();

		}


		if ( $("body").attr("class" ) == "productDetails" )
		{	// put on product detail page
			if ((_cyGetCookie('_cysldr', false)=="disabled")&&(!_cyGetCookie('_cy_prd', false)))
			{
				cy.BASKETAPPEND="0";
				cy.FunnelLevel="3";
				cy.Custom9="Browse";
				cy.Custom1="Guest";
				cy.UserId=readCookie("seewhy_email");

				var sShortURL = sURLTemp;
				if ( sShortURL.indexOf( "?" ) > -1 )
					sShortURL = sURLTemp.substring( 0, sURLTemp.indexOf( "?" ) );
				cyNewBasketLine();
				cyAddBasketLineDetail('ItemName', $(".pane.reviews").find("h1").first().html() );
				cyAddBasketLineDetail('ItemImageURL', "www.brookstone.com/webassets/product_images/300x300/" + $(".pane.reviews").find("h2").first().html() + ".jpg");
				var	sLowPriceForProduct = $('.add_to_cart_wrapper div.price_wrapper').text();
				sLowPriceForProduct = $.trim( sLowPriceForProduct.substring( sLowPriceForProduct.lastIndexOf("$") ) );
				cyAddBasketLineDetail('ItemPrice', sLowPriceForProduct );
				cyAddBasketLineDetail('ItemPageURL', sShortURL);
				cy.Custom5="USD";
				cy_getImageSrc();
				cy.BASKETAPPEND='1';
			}
		}

	}
	catch( ex ) {  }
	//capture order confirmation
	try
	{
		if (( sURLTemp.indexOf("/checkout/confirmation.jsp") > -1 )||( sURLTemp.indexOf("/checkout2/confirmation.jsp") > -1 ))
		{
			asTemp = $('.confirmation_info_container h2').first().text().split(' ');
			cy.FunnelLevel="7";
            try {
                if (( CI_EMAIL != null )&&( CI_EMAIL != undefined ))
                    cy.UserId = CI_EMAIL;
	        } catch (e) {
	                cy.UserId = $('div.bill_to .address_line').last().text();
	        }
			try { cy.Value=$('.order_details_row.last .order_detail_value').text().replace( /[^0-9.]/,''); } catch (e) { cy.Value= "$0.00"; }
			try { cy.OrderNumber = CI_OrderID; } catch (e) { cy.OrderNumber = "Unknown"; }
			cy_getImageSrc();
		}

	}
	catch( err ) {
		try {
			console.log(err);
		} catch (e)  {}
	}
}

function showEmailPopup()
{
        $("#frmEmail2 input[name='frm_text_email']").val("");
        $('#divEmailPopupContainer').show();
}
function hideEmailPopup(e)
{
        if (( typeof(e) == "undefined" )||(e == null)) return( true );

        e = e || window.event;
        var targ = e.target || e.srcElement;
        if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
        if ( targ.tagName.toUpperCase() == "TD" )
        {
                $('#divEmailPopupContainer').hide();
                return( false );
        }
        return( true );
}

function frmEmail2submit()
{
var     sEmail = $("#frmEmail2 input[name='frm_text_email']").val();
var     nAtSign = sEmail.indexOf( "@" );
var     nDotSign = sEmail.lastIndexOf( "." );
        if ( sEmail.trim().length < 1 )
        {
                alert( "Email address is empty." );
                return false;
        }
        if (( nAtSign == -1 )||( nDotSign == -1)||( nAtSign > nDotSign ))
        {
                alert( "Please enter a valid email address." );
                return false;
        }

		sTemp = $('#frm_emailnew').attr( 'action' );
		sTemp += "&submitButton.x=0&submitButton.y=0&email=" + sEmail;
		$('#frmEmail2').attr( 'action', sTemp );
        $.post( $('#frmEmail2').attr( 'action' ),
                $('#frmEmail2').serialize(),
                function(data) {}
        );

// send the SeeWhy email capture
	try
	{
		cy.FunnelLevel="1";
		cy.Custom1="Guest";
		cy.UserId=sEmail;
		_cyCreateClientCookie('_cysldr', 'disabled');
		cy_getImageSrc();
	} catch(e) {}
        $('#divEmailPopupContainer').hide();

	return false;
}

$('#frm_emailnew').submit( function(){
	createCookie("seewhy_email", $("#frm_text_email").val() );
	createCookie("seewhy_FunnelLevel", "1");
	return( true );
});


///////////////////////////////////////////////////////////////////////////////
//EMAIL - Header / Footer - end
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// BayNote - start
///////////////////////////////////////////////////////////////////////////////
/* GTB - Remove Baynote - 0816/13 */
/*
$(document).ready(function() {
var	sURLTemp = document.location.href;

try {
var	g_sBayNoteReq = "Unknown";

	if ( sURLTemp.indexOf("/cart/cart.jsp") > -1 )g_sBayNoteReq = "Brookstone_Cart";
//	else if ( sURLTemp.indexOf("/checkout/address.jsp") > -1 ) g_sBayNoteReq = "Brookstone_OrderConfirm";
//	else if ( sURLTemp.indexOf("/checkout/shipping.jsp") > -1 ) g_sBayNoteReq = "Brookstone_OrderConfirm";
//	else if ( sURLTemp.indexOf("/checkout/reviewPay.jsp") > -1 ) g_sBayNoteReq = "Brookstone_OrderConfirm";
	else if ( ( sURLTemp.indexOf("/checkout/confirmation.jsp") > -1 ) || ( sURLTemp.indexOf("/checkout2/confirmation.jsp") > -1 ) ) g_sBayNoteReq = "Brookstone_OrderConfirm";
	else if ( sURLTemp.indexOf("/search/searchNoResults.jsp") > -1 ) g_sBayNoteReq = "Brookstone_NullSearch";
	else if ( sURLTemp.indexOf("/endeca/search_results.jsp") > -1 ) g_sBayNoteReq = "Brookstone_Search";
	else if ( $('link[rel="canonical"]').attr( "href" ).indexOf( "404" ) > -1 )g_sBayNoteReq = "Brookstone_404Page";
	else
	{
		if (( typeof(CI_PageType) != "undefined" )&&( CI_PageType == "CAT" )) g_sBayNoteReq = "Brookstone_WorldRec";
		else if (( typeof(CI_PageType) != "undefined" )&&( CI_PageType == "HOME" )) g_sBayNoteReq = "Brookstone_HomeRec";
		else if (( typeof(CI_PageType) != "undefined" )&&( CI_PageType == "PRODUCT" )) g_sBayNoteReq = "Brookstone_ProductRec";
//		else if (( typeof(CI_PageType) != "undefined" )&&( CI_PageType == "OTHER" )&&( $(".page_not_found") != null )) g_sBayNoteReq = "Brookstone_404Page";
//		else if ( sBayNotePageType == "404" ) g_sBayNoteReq = "Brookstone_404Page";
		else if ( $("body").attr("class" ) == "productDetails" )	g_sBayNoteReq = "Brookstone_ProductRec";
	}

	if ( g_sBayNoteReq == "Brookstone_ProductRec" )
	{
		updateBayNoteABZones( 'div.box.related_accessories a', g_sBayNoteReq);	// Product Details Page - Related Items
		$('div.box.related_accessories').attr( "id", "Brookstone_ProductRec_RelatedItems" );
		updateBayNoteABZones( 'div.recommended.box a', g_sBayNoteReq);	// Product Details Page - You May Also Like
		$('div.recommended.box').attr( "id", "Brookstone_ProductRec_YouMayAlsoLike" );
	}
	else if ( g_sBayNoteReq == "Brookstone_WorldRec" )
	{
//alert( "BayNote test : " + g_oOmnitureObject.prop4 );
		if ( g_oOmnitureObject.prop4 == "world pages" )
		{
			updateBayNoteABZones( 'div.center_col_promo_slot a', g_sBayNoteReq);	// World Page Promo area
			$('div.center_col_promo_slot').attr( "id", "Brookstone_WorldRec_PromoSLot" );
		}
	}
	else if ( g_sBayNoteReq == "Brookstone_NullSearch" )
	{
		updateBayNoteABZones( 'div.category_items_container a', g_sBayNoteReq);	// Null Search ResultsBest Sellers
		$('div.category_items_container').attr( "id", "Brookstone_NullSearch_PromoSLot" );

	}
	else if ( g_sBayNoteReq == "Brookstone_Cart" )
	{
		updateBayNoteABZones( 'div.cart_promo_container a', g_sBayNoteReq);	// Cart Special Offers + Highlight + Under $25
		$('div.cart_promo_container').attr( "id", "Brookstone_Cart_PromoSLot" );

		$('#Brookstone_Cart_PromoSLot').find('div.special_offers').eq(0).attr( "id", "Brookstone_Cart_PromoSLot_SpecialOfferContainer" );
		$('#Brookstone_Cart_PromoSLot').find('div.special_offers').eq(0).find("div.cart_promo_item_container").eq(0).attr( "id", "Brookstone_Cart_PromoSLot_SpecialOffer1" );
		$('#Brookstone_Cart_PromoSLot').find('div.special_offers').eq(0).find("div.cart_promo_item_container").eq(1).attr( "id", "Brookstone_Cart_PromoSLot_SpecialOffer2" );

		$('#Brookstone_Cart_PromoSLot').find('div.highlighted_offer').eq(0).attr( "id", "Brookstone_404Page_PromoSLot_HighlightedOffer" );

		$('#Brookstone_Cart_PromoSLot').find('div.best_sellers').eq(0).attr( "id", "Brookstone_Cart_PromoSLot_BestSellerContainer" );
		$('#Brookstone_Cart_PromoSLot').find('div.best_sellers').eq(0).find("div.cart_promo_item_container").eq(0).attr( "id", "Brookstone_Cart_PromoSLot_BestSeller1" );
		$('#Brookstone_Cart_PromoSLot').find('div.best_sellers').eq(0).find("div.cart_promo_item_container").eq(1).attr( "id", "Brookstone_Cart_PromoSLot_BestSeller2" );

	}
	else if ( g_sBayNoteReq == "Brookstone_404Page" )
	{
		updateBayNoteABZones( 'div.category_items_container a', g_sBayNoteReq);	// 404 Best Sellers
		$('div.category_items_container').attr( "id", "Brookstone_404Page_PromoSLot" );

	}

} catch( e ) { }

// setup the cart + order conf variables
if ( g_sBayNoteProducts != null )
{
	if ( sURLTemp.indexOf("/cart/cart.jsp") > -1 )
	{
		bn_CartProducts = new Array();
		$("ul.cart a.product_text_container").each(function( idx ) {
			$this = $(this);
			bn_CartProducts[idx] = "http://www.brookstone.com" + $this.attr( "href" )
		});
	}
	else if ( ( sURLTemp.indexOf("/checkout/confirmation.jsp") > -1 ) || ( sURLTemp.indexOf("/checkout2/confirmation.jsp") > -1 ) )
	{
		bnOrderId = br_data.order_id;
		bnOrderTotal = br_data.basket_value;
		bnOrderDetails = new Array();
		asProds = g_sBayNoteProducts.split( ";" );
//		s.products=";330654p;1;75.0;;evar26=558783,;330654p;3;225.0;;evar26=558783,;497362p;1;149.95;;evar26=656736,;330654p;1;75.0;;evar26=558783,;;;;event8=0.05|event23=0.0|event10=0.0";
		var	m = 0;
		for( n = 0; n < asProds.length; n++ )
		{
			if (( asProds[n] == null )||( asProds[n].length < 1 )||( asProds[n].indexOf('evar') > -1 )||( asProds[n].indexOf('event') > -1 ))	continue;
			bnOrderDetails[m] = asProds[n] + ":" + asProds[n+1] + ":" + String( parseFloat( Number(asProds[n+2]) / Number(asProds[n+1] ) ).toFixed(2) );
			m++;
			n+=2;
		}
	}

}

//if ( sURLTemp.indexOf("/cart/cart.jsp") > -1 )
//		alert(  "bn_CartProducts = " + bn_CartProducts );
//if ( sURLTemp.indexOf("/checkout/confirmation.jsp") > -1 )
//		alert(  "bnOrderId = " + bnOrderId + "\nbnOrderTotal = " + bnOrderTotal + "\nbnOrderDetails = " + bnOrderDetails );


try {
// add the power reviews css
var m = null;
	if ( g_sBayNoteReq != "Brookstone_ProductRec" )
	{
		m = document.createElement('link');
		m.type = 'text/css';
		m.rel = 'stylesheet';
		m.href = '/webassets/pwr/engine/pr_styles_review.css';
		document.body.appendChild( m );
		m = null;
		m = document.createElement('link');
		m.type = 'text/css';
		m.rel = 'stylesheet';
		m.href = '/webassets/pwr/engine/merchant_styles2.css';
		document.body.appendChild( m );
		m = null;
	}
// add the baynote javascript
	m = document.createElement('script');
	m.type = 'text/javascript';
	m.src = '/webassets/js/3rdPty/baynote.js';   // need to ensure that this JS file has time to load before loading the others
	document.body.appendChild( m );
} catch( e ) { }

});

function updateBayNoteABZones( sClass, sBayNoteReq )
{
	nCounter = 0;
	sLastHREF = "";
	$( sClass ).each(function() {
		$this = $(this);
		if ( sLastHREF != $this.attr( "href" ) )
		{
			nCounter++;
			sLastHREF = $this.attr( "href" );
		}
		else
		{
			g_sLastHREF = "";
		}
		$this.attr( "baynote_bnrank", nCounter.toString() );
		$this.attr( "baynote_req", sBayNoteReq );
		$this.attr( "baynote_guide", "Brookstone_algorithm" );
		linkPCode=$this.attr( "href" ).substring( $this.attr( "href" ).lastIndexOf( "|" ) + 1 );
		$this.attr( "baynote_pid", linkPCode );
		try {
			$this.parent().find( 'input[type="submit"]' ).each( function() {
				$this = $(this);
				$this.attr( "baynote_bnrank", nCounter.toString() );
				$this.attr( "baynote_req", sBayNoteReq );
				$this.attr( "baynote_guide", "Brookstone_algorithm" );
				$this.attr( "baynote_pid", linkPCode );
			});
		} catch( e ) {}
	});
}
*/
///////////////////////////////////////////////////////////////////////////////
// BayNote - end
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// Preload Category TypeAhead Data- Start -- TODO: FIX THIS
///////////////////////////////////////////////////////////////////////////////
function postloadtypeahead()
{
	if ( $bks.isPOS == true ) return;

	try {
        var m = null;
		m = document.createElement('script');
		m.type = 'text/javascript';
		m.src = '/search/gadgets/typeaheadcategories.jsp';
		document.body.appendChild( m );
	} catch( err ) {
		try {
			console.log(err);
		} catch (e)  {}
	}
}

if ( document.getElementById( "frm_text_simple_search" ) != null ) {
	setTimeout( "postloadtypeahead();", 500 );
}
///////////////////////////////////////////////////////////////////////////////
//Preload Category TypeAhead Data- End
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//Generic Overlay - start
///////////////////////////////////////////////////////////////////////////////
function loadAndDisplayGenericOverlay( sMediaInteralName )
{
	// hide existing dialogs
	try{
		if ( $("#divGenericOverlay" ).data('overlay').isOpened() == true )
		{
			$("#divGenericOverlay" ).data('overlay').close();
			setTimeout( "loadAndDisplayGenericOverlay( '"+sMediaInteralName+"' );", 500 );
			return;
		}
	} catch( err ) {
		try {
			console.log(err);
		} catch (e)  {}
	}

	try {
		$.get( "/global/gadgets/getinternalmedia.jsp?assetName=" + sMediaInteralName, function( data ) {
			if (( data != null )&&( $.trim( data ).length > 0 ))
			{
				$("#divGenericOverlay" ).html( '<a class="close">X</a>' + $.trim( data ) );
				$("#divGenericOverlay").overlay({
					fixed: false,
					oneInstance: true,
					left: 'center',
					top: 'center',
					mask: { color: '#000', loadSpeed: 200, opacity: 0.4	}
				});
				$("#divGenericOverlay .close").live('click', function(e) {
					e.preventDefault();
					$("#divGenericOverlay").data('overlay').close();
				});
				$("#divGenericOverlay" ).data('overlay').load();
			}
		});
	} catch( err ) {
		try {
			console.log(err);
		} catch (e) {}
	}

}

///////////////////////////////////////////////////////////////////////////////
//add the overlay div
///////////////////////////////////////////////////////////////////////////////
function enableOverlay() {
 $('#blk_overlay').addClass('enabled');
}

function disableOverlay() {
 $('#blk_overlay').removeClass('enabled');
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////