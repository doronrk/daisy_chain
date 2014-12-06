var queryString = {};
var lastSearch = ''; 
	
$(window).load(function() {
	//ensure console does not throw any errors
	if (typeof console == "undefined") console = { log: function() {} };
	
	buttonLipstick();
	autoFocusMarkedElement();
	
	// set up some jquery UI defaults
	if(typeof wcs!="undefined")
		$.datepicker.setDefaults( { dateFormat:wcs.DATE_FORMAT } );
	
	var popup = $('#fsa-popup');
	popup.hide();
	$('.fsa-popup-action').click(function() {
		popup.dialog({ title: messages.PDETAIL_FSA, 
				  modal : true,
				  width : 800,
				  resizable : false,
				  draggable : false, show: 'fade',
				  buttons: {'Close': function() { $(this).dialog('close'); return false; }}
	    		});
		return false;
	});
	
});

function autoFocusMarkedElement(){
	//focus on first element marked as autoFocus
	$('.autoFocus:first').focus();
}

function buttonLipstick(optionalSelector){
	
	var selectorResults;
	if (optionalSelector !==  undefined){
		selectorResults = optionalSelector;
	}else{
		selectorResults =$('button.button, button.submit, a.button, a.submit');
	}
	
	for (var i = 0; i < selectorResults.length; i++) {
		if ($(selectorResults[i]).hasClass('ui-dialog-titlebar-close')){
			//keep it classy, do nothing 
		}else{
			if ($(selectorResults[i]).hasClass('costco-button')){
				if ($(selectorResults[i]).find("span").length == 0){
					$(selectorResults[i]).wrapInner('<span class="s1"><span class="s2"></span></span>');
				}
			}else{
				$(selectorResults[i]).wrapInner('<span class="s1"><span class="s2"></span></span>').addClass('costco-button');
			}
		}
	}
}

function jqConfirm(title,message,trueCallback,falseCallback) {
	$('<div class="confirm" title="'+title+'"><p>'+message+'</p></div>').dialog({
		resizable: false,
		height: 'auto',
		width: 500,
		modal: true,
		buttons: {
			"Yes" : function() {
				$(this).dialog("close").remove();
				if(typeof(trueCallback)=='function') trueCallback();
			},
			"No" : function() {
				$(this).dialog("close").remove();
				if(typeof(falseCallback)=='function') falseCallback();
			}
		}
	});
}


$(window).load(function() {
	var a =	window.location.search.substr(1).split('&'), b;
	for(var i=0;i<a.length;i++) {
		b = a[i].split('=');
		queryString[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
	}

	var tooltipSelector;
	
	$(".html-tooltip").hover(
		function(e) {
			if($(this).parents('.disabled').length == 0) {
				this.t = this.title;
				this.title = "";
				if($(this).hasClass('nickname-tooltip')){
					tooltipSelector = "#nicknameTooltip";
					yOffset = 130;
					xOffset = 20;
					$("body").append("<p id='nicknameTooltip'>"+ $(this).next('.tooltip').html() +"</p>");
				}else if($(this).hasClass('ecofee-tooltip')){
					tooltipSelector = "#ecofeeTooltip";
					yOffset = 130;
					xOffset = 20;
					$("body").append("<p id='ecofeeTooltip'>"+ $(this).next('.tooltip').html() +"</p>");
					
				}
				else{
					// CIS100070796 - Check to see if tooltip is a CVV tooltip otherwise select default tooltip specs in dynamic_css.jsp
					if ($(this).hasClass('cvv-flag')) {
						tooltipSelector = "#creditCardCVV";
						$("body").append("<p id='creditCardCVV'>"+ $(this).next('.creditCardCVV').html() +"</p>");					

					}else{
						tooltipSelector = "#tooltip";
						$("body").append("<p id='tooltip'>"+ $(this).next('.tooltip').html() +"</p>");
					}				
				}
				$(tooltipSelector).css({'top' : (e.pageY - yOffset) + "px", 'left' : (e.pageX + xOffset) + "px" }).show();
			}
		},
		function() {
			if($(this).parents('.disabled').length == 0) {
				this.title = this.t;	
				$(tooltipSelector).remove();
			}
		}).mousemove(function(e){
			var border_top = $(window).scrollTop();
			var border_right = $(window).width();
			var left_pos;
			var top_pos;
			var offset = 15;
			if(border_right - (offset *2) >= $(tooltipSelector).width() + e.pageX){
				left_pos = e.pageX+offset;
				} else{
				left_pos = border_right-$(tooltipSelector).width()-offset;
				}

			if(border_top + (offset *2)>= e.pageY - $(tooltipSelector).height()){
				top_pos = border_top +offset;
				} else{
				top_pos = e.pageY-$(tooltipSelector).height()-offset;
				}
			$(tooltipSelector)
				.css({left:left_pos, top:top_pos});
		}).append('<span class="tooltip">?</span>');
	
});

function navigateToURL(url) {
	window.location = url;
}

function navigateToProduct(partNum) {
	wcs.productBaseURL
	navigateToURL(wcs.productBaseURL + '&partNumber=' + partNum);
}


function formatCurrency(n, c, d, t) {
	var c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


function formatLocalCurrency(v,c) {
	if(wcs.locale == 'fr_CA'){
		return localeSpecificCurrency(v,'fr',c);
	}else{
		return localeSpecificCurrency(v,wcs.locale,c);
	}
	
}

/* Added for defect CIS100064426 
Function to return locale specific formatted currency
v - value to be formatted
loc - locale
*/
function localeSpecificCurrency(v, loc, c) {
	var n = parseFloat(v);
	if(isNaN(v)) return v;
	c = typeof(c) != 'undefined' ? c : 2;
	switch(loc) {
		case 'fr' : return formatCurrency(n, c, ',', ' ') + ' $';
		default : return '$' + formatCurrency(n, c, '.', ',');
	}
}

function emailSubmit(form) {
		var dialog_props = {title: '', modal : true, resizable : false, draggable : false, show: 'fade', width: 400};
		var btns = {};
		btns[messages.JS_DIALOG_OK] = function() { $(this).dialog('close'); }
		dialog_props.buttons = btns;

		$.ajax({  
		  type: "POST",  
		  url: form.action,  
		  data: 'emailSignUp='+form['emailSignUp'].value,
		  success: function() {
			$(form).find('input[type=text]').each(function(){
				$(this).val("");
			});
			}
		});

		$('<div>'+messages.EMAIL_OPT_IN_SUCC+'</div>').dialog(dialog_props);
		$('div.ui-dialog-buttonpane').find('button').addClass('costco-button').addClass('submit');
	    $('div.ui-dialog-buttonpane').find('.ui-button-text').wrap('<span class="s1"></span>');
	    $('div.ui-dialog-buttonpane').find('.ui-button-text').addClass('s2').removeClass('ui-button-text');
		
	return false;
}

$(window).load(function(){

	$("#left_nav .collapsible").each(function() {
		var $list = $(this);
		if($list.find('> li').size() > 5) {
			$list.addClass('collapsed').find('li:gt(4)').addClass('collapsed').hide();
			$("<a href='javascript:void(0);'>"+messages.SEARCH_SHOW_MORE_OPTIONS+" &raquo;</a>").click(function(){
				$list.find('li.collapsed').toggle($list.hasClass('collapsed'));
				$list.hasClass('collapsed') ? $(this).html(messages.SEARCH_SHOW_FEWER_OPTIONS+" &raquo;") : $(this).html(messages.SEARCH_SHOW_MORE_OPTIONS+" &raquo;");
				$list.toggleClass('collapsed');
			}).appendTo($(this)).wrap('<li />');
		}
	});

    generateRatingStars();

	$('.print-link').click(function(){window.print();});
});

function generateRatingStars(){
	$("div.rating, .product-rating").each(function(){
		var v;
		var ratingStarCount;
		if($(this).find("span").length > 0){
			v = $(this).find("span").width();
		} else {
			v = $(this).text()
			v = v*13;
			ratingStarCount = $(this).text();
			ratingStarCount = Math.round(ratingStarCount*10)/10;
		}
		$(this).empty().append('<span style="width:'+v+'px;"></span>');
	});
};

function rrComplete(){
	generateRatingStars();
}

$(window).load( function() {
	// adding this to all a tags is maybe a bit extreme, but not that expensive
	$('a').focus(function(){
		$(this).addClass('focus');
		// ADA - Triggering mouseover to load tooltip when on focus
		if($(this).children("img:first") != undefined && $(this).children("img:first")!=null)
			$(this).children("img:first").mouseover();
		
	});
	$('a').blur(function(){
		$(this).removeClass('focus');
		
		if($(this).children("img:first") != undefined && $(this).children("img:first")!=null)
			$(this).children("img:first").mouseout();
	});
	
	// Setup up the navigation drop down elements
	function showDropdown(elem){
		$(this).find('.dropdown').css('visibility','visible');
		$(this).addClass('active');
		if(($(elem).attr("target").id === 'costco-cashcard-dropdown')){
			var frameElement = document.getElementById("CashCardIFrame");
			if (frameElement !=null && frameElement.src == ''){
				frameElement.src = cashCardBalanceUrl;
			}
		}
	}
	function hideDropdown(elem){
		if(($(elem).attr("srcElement")=== undefined) || ($(elem).attr("srcElement").id != 'header_warehouseLocationsNum')){
			$(this).find('.dropdown').css('visibility','hidden');
			$(this).removeClass('active');
		}
	}
	
	if(typeof $().hoverIntent !="undefined") {	
	var hoverIntentConfig = {
			over:showDropdown,
			out:hideDropdown,
			timeout:250
	}
	$('#header_links1').children().hoverIntent(hoverIntentConfig);
	$('#header_links').children().hoverIntent(hoverIntentConfig);
	
	$('#country-select').hoverIntent(hoverIntentConfig);
	
	//Keyboard event binding for showing dropdown 
	$('#country-select').focus(showDropdown);
	$('#country-select').blur(hideDropdown);
	}		
})
	
$.fn.equalHeights = function(px) {
	$(this).each(function(){
		var currentTallest = 0;
		$(this).children().each(function(i){
			if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
		});
		$(this).children().css({'height': currentTallest}); 
	});
	return this;
};

$.fn.grid = function(cols) {
	$(this).each(function(i,e) {
		var $children = $(this).children().not('.rowdivider');
		var rows = Math.ceil($children.length / cols);
		var height = 0;
		for(var r = 0; r < rows; r++) {
			for(var c = 0; c < cols; c++) {
				if(c == 0) $children.eq(r*cols + c).css('margin-left', '0px');
				height = Math.max($children.eq(r*cols + c).height(), height);
			}
			$children.slice(r*cols, r*cols+cols).height(height);
			height = 0;
		}
	});
	return this;
};

$(window).load( function () {
	$('.inline-list').equalHeights();
	$('.grid-4col').grid(4).animate({opacity:1},'slow');
	$('.grid-5col').grid(5).animate({opacity:1},'slow');

	$( ".tabs" ).tabs();
	$( ".tabs" ).tabs({
		  activate: function(event, ui) { 
			/* Make the loaded tab body content to get focus */
			ui.newPanel.focus(); 
		   
			/* Apply Selecte title attribute for the selected tab link */
			var attr = ui.newTab[0].firstChild.getAttribute('title');
			var selectedTitleText = messages.PDETAIL_SELECTED_TITLE;
			if(attr==undefined)
				attr="";
			$("ul.ui-tabs-nav > li > a").each(function(index,element){
			  if( $(this).attr('title') !=undefined )
				{
				  $(this).attr('title',($(this).attr('title').replace(selectedTitleText,'')));
				}
			});
			ui.newTab[0].firstChild.setAttribute('title',attr+selectedTitleText)
		   }
		});
	$('.autoTable').inputTable();
});

$.fn.inputTable = function () {
  
	index=1;
    return this.each(function () {
    	$table = $('tbody',this);
    	
    	$('>tr', $table).bind('keyup focusout mouseup', function() {
    		// if it's the last row, and has an input with a value, add a new row
    		if($(this).is(':last-child:has(input[value!=""])') && $(this).has()) {
    			if ($("tr:last-child input[name=itemNumber]").val() != ''){
    				//stop clone at 15th row
    				if ($('#itemsTable >tbody >tr').length <= 14){
    					// clone with proper label for input fields
    					$template=$plainTemplate.clone(true);
    					$template.find('label').each(function(){
    						$(this).attr('for',$(this).attr('for')+"_"+index);
    					})
    					$template.find('input').each(function(){
    						$(this).attr('id',$(this).attr('id')+"_"+index);
    					})
    					index++;
    					$template.clone(true).insertAfter($('>tr:last',$table));
    				}
    			}
    		}
    	});

    	$('.deleteRow', this).click(function(){
    		if($('> tr', $table).length > 1) {
        		// if there are more than one rows
    			$(this).closest('tr').remove();
    		}
    		else {
        		// if it's the only row, just clear inputs
    			$(this).closest('tr').find('input').val('');
    		}
    	});

    	// wait to clone our template row until all the event handlers have been attached
    	$plainTemplate= $('tr.template',this).removeClass('template').clone(true);
    	
    });

};

function isOnWhiteList(hostname) {
	if (typeof urlWhitelist == "undefined" || urlWhitelist == null) return false;
	for(var i=0; i<urlWhitelist.length; i++) {
		if (hostname.indexOf(urlWhitelist[i]) > 0) return true;
	}
	return false;
}

$(window).load(function() {
	// Creating custom :external selector
	$.expr[':'].external = function(obj) {
		return !(obj.href.match(/^(mailto|javascript)\:/) || obj.hostname == location.hostname || obj.href == '' || isOnWhiteList(obj.hostname));
			// check URLs against a whitelist here too... && (urlWhitelist.indexOf(obj.hostname)
	};
	
	$('a:external').addClass('external').click(function() {
		var link = $(this).attr('href');
		var isPopup = $(this).hasClass('popup');
		var message1 = messages.JS_DIALOG_OK;
		var message2 = messages.JS_DIALOG_CANCEL;
		var dialog_buttons = {};
		dialog_buttons[message1] = function() { $(this).dialog('close').remove(); isPopup ? openPopup(link) : openWindow(link); };
		dialog_buttons[message2] = function() { $(this).dialog('close').remove(); return false; };
		
		$('<div><a href="#" class="hidden-span">' + messages.JS_LEAVING_DOMAIN_ALERT_SINGLE_TAG.replace("{0}", this.hostname) + '</a><span>' + messages.JS_LEAVING_DOMAIN_ALERT.replace("{0}", this.hostname) + '</span></div>')
		.dialog({ title: messages.JS_DIALOG_EXTERNAL_LINK, 
				  modal : true,
				  resizable : false,
				  draggable : false, show: 'fade',
				  height : 'auto',
				  width : 500,
				  buttons: dialog_buttons
    		});
		var buttons = $('div.ui-dialog-buttonpane').find('button');
		for(var i=0; i<buttons.length; i++){
			if (i % 2==0){
				$(buttons[i]).addClass('costco-button submit');
			}else{
				$(buttons[i]).addClass('costco-button button');
			}
		}
		$('div.ui-dialog-buttonpane').append("<span class='hidden-span'> "+messages.END_OF_DIALOG_CONTENT+" </span>");
		$('div.ui-dialog-buttonpane').find('.ui-button-text').wrap('<span class="s1"></span>');
		$('div.ui-dialog-buttonpane').find('.ui-button-text').addClass('s2').removeClass('ui-button-text');
		return false;
		});
	// CIS100068375, Security popup removed for customer service link on order history
	//console.log("removing external class from customer service link");
	$("#custserv").removeClass("external");
	$("#custserv").unbind("click");
	$("#custserv").click(function(e){e.preventDefault();e.stopPropagation();window.open(this.href);});
	
	if(typeof $().truncate !="undefined")
		$('.truncate').truncate();
});

function openPopup(url) {
	window.open(url,'popUpWindow','height=700,width=800,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');
}

function openWindow(url) {
	window.open(url);
}


/**
* Opacity animation on hover
* @method hoverFormOpacity
* @public
* @param {Array} forms
*/
hoverFormOpacity = function (forms) {
	var form_elements = $(forms.join());

	for (var i = 0; i < forms.length; i++) {
		$(forms[i]).hover(function () {
			//if (hoverOpacity) {
			
				// Fade out other forms
				form_elements.not("#" + $(this).attr("id")).fadeTo("fast", 0.5);
			
				$(this).fadeTo("fast", 1.0).find("input:visible:first").focus();
			//}
		});
	}
}; 

(function($){
	$.fn.equalWidths = function(options) {
		return this.each(function(){
			var child_count = $(this).children().size();
			if (child_count > 0) { // only proceed if we've found any children
				var w_child = -1;
				for(i=0;i<child_count;i++) {
					w_child = Math.max(w_child, parseFloat($(this).children(':eq('+i+')').outerWidth()) + 1);
				}
				$(this).children().css({ 'width' : w_child + 'px' });
			}
		});
	};
})(jQuery);

$(window).load(function(){
	$('.alphabetical-list').each(function(){
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var h = '';
		for(var i=0;i<alphabet.length;i++){
			$('.alphabetical-item-index:contains('+alphabet[i]+')', this).length > 0 ?
				h += '<li><a href="#'+alphabet[i]+'">'+alphabet[i]+'</a></li>' :
				h += '<li>'+alphabet[i]+'</li>';
		}
		$('.alphabetical-list-index', this).html(h);
	});

	$('.col3').each(function(){
		var c = Math.ceil($(this).children().length / 3);
		for(var x=0; x < 3; x++){
			$(this).children().slice(x,x+c).wrapAll('<div class="column"></div>');
		}
	})
});

$(window).load(function(){
	xOffset = 10;
	yOffset = 30;
	$(".form-item label[title]").hover(function(e){											  
		this.t = this.title;
		this.title = "";									  
		$("body").append("<p id='tooltip'>"+ this.t +"</p>");
		$("#tooltip")
			.css("top",(e.pageY - yOffset) + "px")
			.css("left",(e.pageX + xOffset) + "px")
			.show();
	},
	function(){
		this.title = this.t;		
		$("#tooltip").remove();
	}).mousemove(function(e){
		$("#tooltip")
			.css("top",(e.pageY - yOffset) + "px")
			.css("left",(e.pageX + xOffset) + "px");
	}).append('<span class="has-tooltip">&nbsp;</span>');	
});

$(window).load(function(){
	$('a.ClickInfoLink').click(function(){
		$.ajax({url:$('.ClickInfoUrl', this).text()});
	});
});

//$(window).load(function(){
//	var frameElement = document.getElementById("BVFrame");
//	if (frameElement !=null){
//		frameElement.contentWindow.location.href = frameElement.src;
//	};
//});

$(window).load(function(){
	var mainFormElements = $('div#main_content_wrapper input[type=text]').not('input#emailSignUp');
	var accountRegister = getUrlParam('isAccountRegister');
	if (mainFormElements.length > 0)  {
		// Login/Register Page focus
		if (mainFormElements[0].name == 'logonId') {
			var c = $.cookie('wcMember');
			if (accountRegister) { 
				$('#register_email1').focus()
			} else if (c) {
				// User signed in before, focus on Registered Shoppers email field. 
				$('#logonId').focus()
			} else if (getUrlParam('type') == 'pwr'){			
				// User may have trouble logging in, requested password reset prior, focus on Registered Shoppers email field. 
				$('#logonId').focus()
			} else {
				// Smells like a fresh user, focus on Not Yet Registered email field.
				$('#register_email1').focus()
			}
		} else {
			$(mainFormElements[0]).focus();
		}
	} else {
		var submitButton = $('div.submit-row').find('button.submit');
		if (submitButton.length > 0){
			// set focus on submit button
			submitButton.focus();
		} else {
			// set focus on search
			$('#SimpleSearchForm_SearchTerm').focus();
		}	
	}	
});

$(document).ready(function()  {
	
	$.widget( "custom.catcomplete", $.ui.autocomplete, {
	    _create: function() {
	      this._super();
	      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-type)" );
	    },
	    _renderMenu: function( ul, items ) {
	      var that = this,
	        currentType = "";
	      $.each( items, function( index, item ) {
	        var li;
	        if (currentType=="") {
	        	currentType = item.type;
	        }
	        if ((currentType) && (item.type != currentType)) {
	          ul.append( "<li class='ui-autocomplete-type'>" + "<hr />" + "</li>" );
	          currentType = item.type; 
	        }
	        li = that._renderItemData( ul, item );
	        if ( item.type ) {
	          li.attr( "data-aria-label", item.type + " : " + item.label );
	        }
	      });
	    }
	  });
	
	$.ui.autocomplete.prototype._renderItem = function( ul, item){
	  var term = this.term;
	  var re = new RegExp("(" + term + ")", "i") ;
	  var t = item.label.replace(re,"<b>$1</b>");
	  return $( "<li></li>" )
	     .data( "item.autocomplete", function (item) {
	    	 return {
	    		 label: (item.label),
	    		 value: item.value
	    	 }
	     } )
	     .append( "<a>" + t + "</a>" )
	     .appendTo( ul );
	};

  $( "#SimpleSearchForm_SearchTerm" ).catcomplete({
      appendTo: "#results",
      open: function() {
	    var position = $("#SimpleSearchForm_SearchTerm").position,
	            left = position.left, top = position.top;      
	          $("#results > ul").css({left: (left) + "px",
	                                  top: (top - 31 ) + "px" });
	      },
	      minLength: 2,
	 	  delay: 200,
	 	  disabled: $("#typeAheadDisabled").val() == "false" ? false : true,
	      source: function( request, response ) {
	      	var searchTerm = (document.forms.CatalogSearchForm.elements.keyword.value).trim();
	        var cleanData = {'searchTerm': searchTerm};
	        if ((searchTerm != '') && (lastSearch != searchTerm)){
	            $.ajax({
	                url: "/TypeAhead?langId="+wcs.langId+"&storeId="+wcs.storeId+"&catalogId="+wcs.catalogId,
	                data: cleanData,
	                dataType: "json",
	                success: function( data ) {
	          	  response($.map( data, function( item ) {
	          		  var cat = ($.trim(item.category))?(" in " + "<span>" + item.category + "</span>"):"";
	          		  var formattedLabel = (item.label + cat);
	          		  var formattedValue = $('<textarea />').html(item.value).text();
	                    return {
	                        label: formattedLabel,
	                        value: formattedValue,
	                        id: item.refinementId,
	                        type: item.type
	                    }
	                }));
	                }
	              });
	            lastSearch = searchTerm;
	        	}
	            },
	            select: function(event, item) {
	            event.preventDefault();
	   	    	 $("#SimpleSearchForm_SearchTerm").val(item.item.value);
	   	    	 $("#SimpleSearchForm_RefinementId").val(item.item.id);
	   	    	 $("#CatalogSearchForm").submit(); 
	   	     	}
	    });
	
});

function getUrlParam(name)
{
	 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	 var regexS = "[\\?&]"+name+"=([^&#]*)";
	 var regex = new RegExp( regexS );
	 var results = regex.exec( window.location.href );
	 if( results == null )
		 return "";
	 else
		 return results[1];
}

// When there is a left navigation, then the main content isn't necessarily in the main_content_wrapper div  
$(window).load(function() {
	var mainContent;
	
	if(typeof messages == "undefined")
		return false;
		
	var label = messages.AX_MAIN_CONTENT;
	if ($('#main_content_wrapper h1').size() > 0) {
		mainContent = $($('#main_content_wrapper h1')[0]);
		label = mainContent.html(); 
	}
	
	if (mainContent == null || mainContent.hasClass('fsa-popup')) {
		mainContent = $('#main_content_wrapper');
	}
	
	var mainContentAnchor = $('<a href="javascript:void(0);" id="main_content" class="secondarySkipToMainContent">'+label+'</a>');
	mainContent.before(mainContentAnchor);
	$('.skipToMainContent').click(function() {
		$('#main_content').scrollTop();
		$('#main_content').focus();
		return false;
	});
});

function updateViewAndBeginIndexForLanguageChange(){
	if(document.getElementById('fastFinderResultControls')!=null && document.getElementById('fastFinderResultControls')!='')
	{
		if(document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = document.FastFinderForm.pageView.value;
		}
		if(document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = document.FastFinderForm.beginIndex.value;
		}
	}
	else if(document.getElementById('CategoryDisplay_Widget')!=null && document.getElementById('CategoryDisplay_Widget')!='')
	{
		if(wc.render.getContextById('CategoryDisplay_Context').properties['pageView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('CategoryDisplay_Context').properties['pageView'];
		} 
		if(wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex'];
		} 
	}
	else if(document.getElementById('Search_Result_Summary')!=null && document.getElementById('Search_Result_Summary')!='')
	{
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum'];
		}
	}
}

var LoginTimeout = {
		redirectView: "/LogonForm",
		lastActivity: "",
		checkTimeout : function(){
			if (LoginTimeout.lastActivity == ""){return;}
			var now = new Date().getTime();
			var diff = now - (LoginTimeout.lastActivity);
			if (diff > wcs.loginTimeOut){
				window.location.href = LoginTimeout.redirectView;
				throw new Error("Stale browser - redirecting");
			}
		},
		updateActivity: function(){
			LoginTimeout.lastActivity = new Date().getTime();
		}
	}

// Price Font Size Control
var pfsc = {
	
	extractPrice: function (node) {
	    var priceAmount = node.text().replace(/[\s,\$\-]+/g, "");
	    priceAmount = parseFloat(priceAmount);
	    return priceAmount;
	},
	
	adjustFontSize: function () {
	    var mainDiv = $("div.product-price");
	    if (mainDiv != undefined && mainDiv != null && mainDiv.length > 0) {
	    	
	        var onlinePrice = $("div.online-price span.currency", mainDiv);
	        var ecoPrice = $("div.eco-price span.currency", mainDiv);
	        var lessPrice = $("div.less-price span.currency", mainDiv);
	        var yourPrice = $("div.your-price span.currency", mainDiv);
	        
	        var onlinePriceAmount = pfsc.extractPrice(onlinePrice);
	        var ecoPriceAmount = pfsc.extractPrice(ecoPrice);
	        var lessPriceAmount = pfsc.extractPrice(lessPrice);
	        var yourPriceAmount = pfsc.extractPrice(yourPrice);
	        
	        if (onlinePriceAmount > 9999.9 || ecoPriceAmount > 9999.9 || lessPriceAmount > 9999.9 || yourPriceAmount > 9999.9) {
	        	onlinePrice.attr("style", "font-size: 20px");
	        	ecoPrice.attr("style", "font-size: 20px");
	        	lessPrice.attr("style", "font-size: 20px");
	        	yourPrice.attr("style", "font-size: 20px");
	        }
	    }
	}
};

$(document).ready(pfsc.adjustFontSize);

//added for MOS product-tile display
$(document).ready(function() {
	if ($('div').hasClass('product-tile')) {
		memberOnlySales();
	}
});

