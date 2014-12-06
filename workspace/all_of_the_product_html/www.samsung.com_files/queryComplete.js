/* search jQuery, Modernizr, smg */
(function (window, document, $, undefined) {
	"use strict";
 
    $.fn.queryComplete = function( options ) {
    	
    	var opts = $.extend( {}, $.fn.queryComplete.defaults, options );
    	
    	return this.each(function(){
    		$(this).parent().append("<div class='query_suggest' ><ul></ul></div>");
    		var inputBox = $(this),
    			match,
    			suggestBox = $(this).parent().find(".query_suggest ul"),
    			queryIndex = -1;
    		
    		var SearchModel = Backbone.Model.extend({
        		url: function(){
                	var searchUrl = '/us/function/espsearch/autoComplete.do?b2b=' + opts.b2b + '&q=' + inputBox.val();
                    return searchUrl;
                }
    		});
    		
        	$(this).on('keyup', function(event) {
				if (event) {
					if (event.ctrlKey || event.altKey) {
						return;
					}
					
					if($(this).val().length < 2) {
						suggestBox.hide();
						return;
					}

					if (suggestBox.is(':hidden')) {

					} else {
						if (event.keyCode === 40) {
							navigate(1);
						}
						if (event.keyCode === 38) {
							navigate(-1);
						}
					}

					var keycodes = [ 9, 27, 16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 45, 229 ];

					if ($.inArray(event.keyCode, keycodes) === -1) {
						query(event);
					}
				}
			});
        	
        	$(this).on('blur', function(e) {
				setTimeout(function() {
					suggestBox.hide();
				}, 500);
			});
        	
        	$(this).parent().on('mouseover', '.query_result', function () {
        		$(this).siblings().removeClass('query_highlight');
				$(this).addClass('query_highlight');
				queryIndex = $(this).index();
        	}).on('mouseout', '.query_result', function () {
        		$(this).removeClass('query_highlight');
        	});
        	
        	function query() {
            	var model = new SearchModel();
            	model.fetch({
					success : function(response) {
						search(response.toJSON());
					},
					error : function(data, response){
					   console.log(response.responseText);
					}
				});
        	}

		 	/*substring to ellipsis & Keep tag, doesn't support tag nest*/
			/*NodeType http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html*/
			function subHtmlStrEllipsis(str,strlength){
				  var html = $('<div/>').html(str).contents(); 
				  var htmlEllipsis = "";

				  //make some space for ...
				  if(strlength < $(html).text().length){
				  	strlength = strlength -3;
				  }else{
				  	return str;
				  }

				  //$('<div>').append($(el).clone())).html() is used to get outer html 
		  		  $.each( html, function( i, el ) {
		  		  	  if (strlength >= el.textContent.length){
		  		  	  	  strlength = strlength-el.textContent.length;
		  		  	  	   if (el.nodeType === 3){
							  	htmlEllipsis = htmlEllipsis + el.textContent;
							  }else if (el.nodeType === 1){
							  	htmlEllipsis = htmlEllipsis + ($('<div>').append($(el).clone())).html();
							  }	else{
							  	htmlEllipsis = htmlEllipsis + ($('<div>').append($(el).clone())).html();
							  }  
		  		  	  }else{ //last node
		  		  	  		 if (el.nodeType === 3){
							  	htmlEllipsis = htmlEllipsis + el.textContent.substring(0,strlength);
							  }else if (el.nodeType === 1){
							  	cloneNode = $(el).clone();
							  	cloneNode.text(el.textContent.substring(0,strlength));
							  	htmlEllipsis = htmlEllipsis + ($('<div>').append(cloneNode).html());
							  }	else{
							  	htmlEllipsis = htmlEllipsis + ($('<div>').append($(el).clone())).html();
							  } 
							  htmlEllipsis = htmlEllipsis + '...';
							return false;   
		  		  	  }

					});
		  		  return htmlEllipsis;
			}

        	function search(response) {
        		var suggest = suggestBox;
        		suggest.empty();
				if (response === null) {
					suggestBox.hide();
				} else {
					if (!response[0])
						return;
					var responseLength = parseInt(response[0].length / 2, 10) - 1;
					var text = "";
					var counter = 0;
					var modelCdoe = "";
					for ( var i = 0; i < responseLength; ++i) {
						if (counter < 3) {
							match = response[0][i * 2 + 3];
							var responseSplit = match.split("^");
							var ary = responseSplit[1].split("%%");
							var recomm_mdcd = ary[0];
							if (recomm_mdcd != modelCdoe) {
								modelCdoe = recomm_mdcd;
								var recomm_title = ary[1];
								var recomm_desc = ary[2];
								if (opts.titleLength != -1
										&& recomm_title.length > opts.titleLength) {
									recomm_title = subHtmlStrEllipsis(recomm_title,opts.titleLength);
								}

								if (recomm_desc.length > opts.descLength) {
									recomm_desc = subHtmlStrEllipsis(recomm_desc,opts.descLength);
								}
								
								var modelCdStr = "";
								if(opts.showModelCode) {
									modelCdStr = "<span class='modelCode'>" + recomm_mdcd + "</span>";
								}

								text = "<li class='query_result' data='"
									+ recomm_mdcd
									+ "'><div class='recomm_image'><img  src='http://www.samsung.com"
									+ ary[3]
									+ "' /></div>"
									+ "<div class='recomm_description'><strong>"
									+ recomm_title
									+ "</strong>"+modelCdStr
									+ "<div class='description'>"
									+ recomm_desc + "</div>"
									+ "</div></li>";

								suggest.append(text);
								counter++;
							}
						} else {
							break;
						}
					}

					responseLength = parseInt(response[1].length / 2, 10) - 1;
					for ( var i = 0; i < responseLength; ++i) {


						counter++;
						match = response[1][i * 2 + 3];
						var responseSplit = match.split("^");
						var li = "<li class='query_result'>"
								+ responseSplit[1] + "</li>";

						suggest.append(li);
						if (counter >= opts.maxCount) {
							showresults();
							return;
						}
					}

					if (counter > 0) {
						showresults();
					} else {
						suggestBox.hide();
					}
				}
        	}
        	
        	function showresults() {
        		suggestBox.show();
                highlight();
                $('.query_result').bind('click', function(e) {
    				var term = "";
    				var isPredictive = false;
    				if (typeof $(this).attr("data") === "undefined") {
    					term = $(this).text();
    				} else {
    					term = $(this).attr("data");
    					isPredictive = true;
    				}
    				inputBox.val(term);
    				opts.clickCallback(isPredictive);
    				suggestBox.hide();
    			});
        	}
        	
        	function highlight() {
        		suggestBox.find('.query_result').each(
						function(index, value) {
							var keyword = inputBox.val();
							if (typeof $(this).attr("data") === "undefined") {
								$(this).html(
										$(this).text().replace(
												keyword,
												'<strong>' + keyword
														+ '</strong>'));
							}

				});
        	}
        	
        	function navigate(move) {
        		queryIndex += move;

				var queryResult = suggestBox.find(".query_result");
				if (queryIndex >= queryResult.length) {
					queryIndex = 0;
				}
				if (queryIndex < 0) {
					queryIndex = queryResult.length - 1;
				}

				queryResult.removeClass('query_highlight').eq(queryIndex)
						.addClass('query_highlight');
				var term = "";
				if (typeof $('li.query_highlight').attr("data") === "undefined") {
					term = $('li.query_highlight').text();
				} else
					term = $('li.query_highlight').attr("data");
				inputBox.val(term);
        	}
        	
    	});
 
    };
    
    $.fn.queryComplete.defaults = {
    	searchForm : "",
    	maxCount : 6,
    	titleLength : -1,
    	showModelCode: true,
    	descLength : 100, 
    	b2b : "", 
    	clickCallback: function(isPredictive) {
    	}
    };

}(window, document, jQuery));