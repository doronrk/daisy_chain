/*! Copyright (c) 2011-2013 EasyAsk LLC. All Rights Reserved.
 * Use, reproduction, transfer, publication or disclosure is prohibited 
 * except in accordance with the License Agreement.
 */


(function($,_undefined){

EASearch = function() {
    return {
        defaults: {
            server: '/EasyAsk/apps/Advisor.jsp',
            dct: 'Ecomdemo',
            idInput: 'searchText',
            idButton: 'search',
            fields: {
                image: 'Item_Thumbnail',
                name: 'Style_Name',
                price: 'Price'
            }
        },

        // state variables
        path: 'All Products',
        currentPageSize: 16,
        currentPage: 1,
        currentSort: '-default-',
        pageCount: 0,

        init: function(opts){
            var self = this;
            var options = $.extend(true,this.defaults,opts);

            this.baseURL = options.server + '?indexed=1&ie=UTF-8&rootprods=1&oneshot=1&defarrangeby=///NONE///&disp=json&dct=' + options.dct ;

            $('#' + options.idInput).bind('keydown',function(event){
                var keyCode = $.ui.keyCode;
                if (keyCode.ENTER == event.keyCode || keyCode.NUMPAD_ENTER == event.keyCode){
                    window.setTimeout(function(){$('#'+options.idButton).click(); },100);
                    return false;
                }
                return true;
            });

            $('#'+options.idButton).unbind('click').click(function(){
                var inp = $.trim($('#'+options.idInput).val());
                if (inp){
                    self.executeSearch(inp);
                }
                return false;
            });
			
            this.options = options; // remember them

            return self;
        },

        addPath: function(cat){
            return '&CatPath=' + encodeURIComponent(this.path + (cat?('////'+cat):''));
        },

        formURL: function(){
            return this.baseURL + '&ResultsPerPage=' + this.currentPageSize + '&defsortcols=' + (this.currentSort == '-default-'?'':this.currentSort);
        },

        executeSearch: function(q){
            this.path = 'All Products';
            var url = this.formURL() + '&RequestAction=advisor&RequestData=CA_Search&q=' + encodeURIComponent(q) + this.addPath();
            this.invoke(url);
        },

        executeCategory: function(cat){
            var url = this.formURL() + '&RequestAction=advisor&RequestData=CA_CategoryExpand' + this.addPath(cat);
            this.invoke(url);
        },

        executeAttribute: function(attr,val){
			var attributeNVPs="";
			$(val).each(function(index,option){
			var attrVal = $(option).attr('ea_val');
				attributeNVPs+=attr;
				attributeNVPs+="= '";
				attributeNVPs+=attrVal;
				attributeNVPs+="'";
				
				if(index != val.length)
				{
					attributeNVPs+=';;;;';
				}
			});
			
            var url = this.formURL() + '&RequestAction=advisor&RequestData=CA_AttributeSelected' + this.addPath() + '&AttribSel='+encodeURIComponent(attributeNVPs);
            this.invoke(url);
        },

        gotoPage: function(val){
            var url = this.formURL() + '&RequestAction=navbar&RequestData=' + encodeURIComponent('page' + val)+ this.addPath();
            this.invoke(url);
        },

        pageOp: function(val){
            var url = this.formURL() + '&RequestAction=navbar&RequestData=' + encodeURIComponent(val)+ this.addPath() + '&currentpage='+this.currentPage;
            this.invoke(url);
        },

        updatePagination: function(desc){
			var self = this;
            this.currentPage=desc.currentPage;
            this.pageCount = desc.pageCount;
			var searchResultsCountHtmlOutput = searchResultsPaginationTemplate.render(desc);
			$("#searchResultsCountTop").html(searchResultsCountHtmlOutput);
			$("#searchResultsCountBottom").html(searchResultsCountHtmlOutput);

			$('.search-page-nav').each(function(index, optionBox){
				var searchPagination = $(optionBox);
				var pc = searchPagination.attr("bos-page-count");
				var cp = searchPagination.attr("bos-current-page");
				var list= searchPagination.find('li');
				list.each(function(index, obj){$(obj).hide();});
				var endIndex = parseInt(list.length);
				var num_displayed=0;
				searchPagination.find('li').each(function(index, obj){
					if((index == 0 || index == endIndex-1) && pc != 1){
					//always show first and last
					$(obj).click(function(){self.gotoPage(currentIndex);});
					$(obj).addClass("bold");
					$(obj).show();
					}
					//show only 5 others at a time.
					var currentIndex = parseInt(index+1);
					var currentPage = parseInt(cp);
					var hl =getHighAndLowPageNumbers(currentPage,endIndex);
					var high = hl.high;
					var low = hl.low;
					if(currentIndex >= hl.low && currentIndex <= hl.high && pc!=1)
					{
						if(num_displayed<5)
						{
							if(currentIndex != currentPage)
							{
								$(obj).click(function(){self.gotoPage(currentIndex);});
							}
							else
							{
							$(obj).addClass("bold");
							}
							$(obj).show();
							num_displayed++;
						}
					} 
				});
			});
			
			$('.ea-page-first').click(function(){self.pageOp('first');});
            $('.ea-page-next').click(function(){self.pageOp('next');});
            $('.ea-page-prev').click(function(){self.pageOp('prev');});
            $('.ea-page-last').click(function(){self.pageOp('last');});
			
			$('.ea-select-results-per-page').change(function(evt){
                self.currentPageSize=$(this).val();
                self.currentPage=1;
                self.pageOp('first');
            });
			
			$('.ea-select-sort-by').change(function(evt){
                self.currentSort=$(this).val();
                self.currentPage=1;
                self.pageOp('first');
            });
        },
        insertProducts: function(prods){
            if (prods){
                this.updatePagination(prods.itemDescription);
				var searchProductsHtmlOutput = searchProductsTemplate.render(prods);
				$("#searchProducts").html(searchProductsHtmlOutput);
            }
        },

        insertNavigation: function(cats,attrs,commonAttrs){
			var searchCategoriesHtmlOutput = searchCategoriesTemplate.render(cats);
			$("#searchCategories").html(searchCategoriesHtmlOutput);
			
			var searchAttributesHtmlOutput = searchAttributeTemplate.render(attrs);
			$("#searchAttributes").html(searchAttributesHtmlOutput);
			if(commonAttrs){
				var searchCommonAttributesHtmlOutput = searchAttributeTemplate.render({"attribute": commonAttrs});
				$("#searchAttributes").append($(searchCommonAttributesHtmlOutput));
			}
			$("#searchAttributes select").each(function(index, obj){ applyMultiSelect(obj);	});
			
        },

        doCategoryClick: function(node){
            var catName = $(node).attr('ea_cat');
            this.executeCategory(catName);
        },

        doAttributeClick: function(attrName,node){
            this.executeAttribute(attrName,node);
        },
        hookNav: function(){
            var self = this;
            $('a.ea-cat').click(function(){
                var node = this;
                self.doCategoryClick(node);
            });
            $('.ea-attr-button').click(function(){
			var attrName = $(this).attr('bos-attr-name');
			var stripAttrName = $(this).attr('bos-strip-attr-name');
                var node =$("#searchAttribute_"+attrName +" option:selected");
                self.doAttributeClick(attrName,node);
            });
        },
        

        processResults: function(data){
            var ph = $('#question').val('').attr('placeholder');
            if (!ph){ 
                $('#question:not(:focus)').blur();  // cause emulated placeholder if needed
            }
            if (!data){
                return;
            }
            var src = data.source;
            if (!src){
                return;
            }
            var bc = src.navPath.navPathNodeList;
            this.path = bc[bc.length-1].path;
            this.insertProducts(src.products);
            this.insertNavigation(src.categories,src.attributes,src.commonAttribute);
            this.hookNav();
        },
  
        htmlEncode: function (str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        },

        invoke: function(url){
            if (this.autoComplete){
                this.autoComplete.disable();
            }
            var self = this;
            $.ajax({
                url: url,
                type: 'POST',
                crossDomain: true,  // cross comain
                dataType: 'jsonp',  // handles cross domain
                success: function(data,textStatus, jqXHR){
                    self.processResults(data);
                },
                error: function(data, textStatus, jqXHR){
                    alert('error: ' + data);
                }
            });
        }
    };
};
}(jQuery));