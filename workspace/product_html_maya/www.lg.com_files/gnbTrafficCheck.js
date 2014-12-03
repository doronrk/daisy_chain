/**
 * LGEUS-3801 : 2014-02-18 create
 */
$(document).ready(function() {
	$("nav ul.primary a").bind("click", function(a) {
		a.preventDefault();
        var arCategory = [];
        arCategory.push($(this).parents("li.primary").children("a.primary").text());	//super category
        if(!$(this).hasClass("primary")){
        	var strParentTagName = $(this).parent().prop("tagName").toLowerCase();
        	var objLI_Column = $(this).parents("[class^='column']");
        	if($(this).parents("dl.nav").length > 0){
        		// mega gnb
        		if(!objLI_Column.hasClass("mega-gnb-enhance")){
            		arCategory.push(objLI_Column.find("dt a").text());	//category
            		if(strParentTagName != "dt" && !$(this).parent().hasClass("img")){
            			if($(this).children("img").length > 0){
            				arCategory.push($(this).children("img").attr("alt"));
            			}else{
            				arCategory.push($(this).text());	//sub category
            			}
            		}
            	}else{
            		arCategory=[];
            	}
        	}else{
        		//normal gnb
        		if(!objLI_Column.hasClass("callout")){
        			if(strParentTagName != "div" && strParentTagName != "h4"){
        				if(objLI_Column.hasClass("support-ico")){
        					//support
        					arCategory.push(objLI_Column.children("h5").text()); //category
        				}else{
        					if(strParentTagName == "h5"){
        						arCategory.push($(this).text());	//category
        					}else if(strParentTagName == "li"){
        						if($(this).find("img").length > 0){
        							arCategory.push($(this).next("h5").text());	//category
                				}else{
                					arCategory.push($(this).parent().parent().prev().text());	//category
            						arCategory.push($(this).text());	//sub category
                				}
        					}
        				}
        			}else{
        				arCategory=[];
        			}
        		}else{
        			arCategory=[];
        		}
        	}
        }
        var strCategory = "";
        $.each(arCategory, function(idx, val){
        	val = $.trim(val);
        	if(idx > 0){
        		strCategory += ">";
        	}
        	if(val.length > 0){
        		strCategory += val;
        	}
        });
        if(strCategory.length > 0){
        	setCookies("US_GNB_TRAFFIC", strCategory, 1);
        }
        //console.log(strCategory);
		/* SMG-5927 20140409 modify */
		if($(this).attr('target') =="_blank"){
			var newWin = window.open('about:blank');
			newWin.location.href = $(this).attr("href");
		}else{
			document.location.href = $(this).attr("href");
		}
		/* SMG-5927 20140409 modify */
	});
});