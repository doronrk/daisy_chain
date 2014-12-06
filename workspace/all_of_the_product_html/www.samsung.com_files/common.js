$(function() {
	//hide BF Extender on BF shop pages
	if(window.location.href.indexOf("shop/black-friday") > -1 || window.location.href.indexOf("shop/special-offers") > -1) {
		$('.promo-container').css('display','none');
	}
});

function openPopup(pageUrl) {
	var opt = "toolbar=no,location=no,directories=no"
			+ ",resizable=yes,scrollbars=yes,status=no,width=650,height=400,left=400,top=200";
	window.open(pageUrl, 'winPop', opt);
}
function anchorRedirect(pageUrl, type, isSupport) {
	var url = pageUrl.split("^");
	var link = url[0];
	var anchor = url[1];

	if (type == "B2C") {
		if (isSupport == "1") {
			if (!!anchor)
				window.document.cookie = "contentMoveValue" + "="
						+ escape(anchor) + "; path=/; domain = samsung.com";
		} else if (!!anchor)
			window.document.cookie = "cookieConsumerMenu" + "="
					+ escape(anchor) + "; path=/; domain = samsung.com";
	} else if (type == "B2B") {
		if (!!anchor) {
			window.document.cookie = "cookieBusinessSecondMenu" + "="
					+ escape(anchor) + "; path=/; domain = samsung.com";
		}
	}

	window.location.href = link;
}

function priceModule(item) {

	if (item.price == null || item.price == "")
		return "<div class='price-module'></div>";
	var result = "<div class='price-module'>";
	var price = $.trim(item.price);
	var retail_price = $.trim(item.retail_price);
	var save_price = $.trim(item.save_price);
	var succ = true;
	var prdPriceDesc = "";
	var appliance = isHomeApplianceButNotVacuum();
	if(item.fromRR && item.ecommerce_flag == "false"){
		succ = false;
	}
	if (succ && typeof (item.retail_price) != 'undefined' && item.retail_price != "" 
			&& item.retail_price != "0" && item.retail_price != "0.00" && item.retail_price.replace(",","") != item.price.replace(",","")) {
		if($.trim(item.retail_price).indexOf("$") != 0) {
			item.retail_price = "$" + $.trim(item.retail_price);
		}else{
			retail_price = price.substring(retail_price.indexOf("$")+1);
			retail_price = parseFloat(retail_price.replace(',',''));
		}
		if($.trim(item.price).indexOf("$") != 0) {
			item.price = "$" + $.trim(item.price);
		}else{
			price = price.substring(price.indexOf("$")+1);
			price = parseFloat(price.replace(',',''));
		}
		if($.trim(item.save_price).indexOf("$") != 0) {
			item.save_price = "$" + $.trim(item.save_price);
		}else{
			save_price = save_price.substring(save_price.indexOf("$")+1);
			save_price = parseFloat(save_price.replace(',',''));
		}
		if(retail_price && parseFloat(retail_price) > 0) {
			result += "<p class='suggested'><span>Suggested Retail:</span><span class='amount'>";
			result += item.retail_price;
			result += "</span></p>";
		}
		if(price && parseFloat(price) > 0) {
			result += "<p class='price'><span>";
			if(appliance){
				result += "Suggested Promotional ";
			}
			else if (item.ecommerce_flag == "true") {
				result += "Your ";
			}
			result+= "Price:</span><span class='amount'>";
			result += item.price;
			result += "</span></p>";
			
		}
		if(save_price && parseFloat(save_price) > 0 && !appliance){
			result += "<p class='savings'><span>You Save:</span><span class='amount'>";
			result += item.save_price;
			result += "</span></p>";	
		}
		
	} else {
		if($.trim(item.price).indexOf("$") != 0) {
			item.price = "$" + $.trim(item.price);
		}else{
			price = price.substring(price.indexOf("$")+1);
			price = parseFloat(price.replace(',',''));
		}
		if(price && parseFloat(price) > 0) {
			if(appliance){
				result += "<p class='price'><span>Suggested Price:</span>";
			}else{
				result += "<p class='price'><span>Price:</span>";
			}
		result += "<span class='amount'>";
		result += item.price;
		result += "</span></p>";
		}
		item.prdPriceDesc = "";
	}
	

	result += "</div>";
	
	if(item.prdPriceDesc && typeof (item.prdPriceDesc) != 'undefined'){
		prdPriceDesc = item.prdPriceDesc;
	}
	
	result += "<p id='price-desc' class='price-desc'>"+prdPriceDesc+"</p>"; 
	
	
	
	return result;
}

function ecomModule(item) {
	var tagPrefix = typeof (item.tagPrefix) == 'undefined'? "": item.tagPrefix;
	var sectionName = typeof (item.sectionName) == 'undefined'? "": item.sectionName + ">";
	var price = $.trim(item.price).replace("$","").replace(",","");
	var tagProdInfo = "id:" + item.id + "|cat:" + item.prdIaName + "|name:" + _.escape(item.name) + "|price:" + price + "|cat_id:" + item.prdIaCd;
	var result = "";
	if("SM-R130NZWSXAR" == item.id || "SM-R130NZKSXAR" == item.id || "SM-R130NZBSXAR" == item.id || "SM-R320NPWSXAR" == item.id){
		result += "<a data-link_id='" + tagPrefix + "cartadd_" + item.id + "' data-link_cat='add to cart' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:add to cart|order_flow:mobile accessories' data-product_info='" + tagProdInfo + "' href='http://mobile.samsung.com/accessories/addtocart.do?productid=" + item.id + "&returnurl="
		+ document.location.href + "' class='button add-to-cart ecom block-level'>ADD TO CART</a>";	
	}else if(item.ecommerce_flag == "true" && item.stock_flag && item.stock_flag != 'N') {
		if ("P" == item.stock_flag) {
			result += "<a data-link_id='" + tagPrefix + "pre-order_" + item.id + "' data-link_cat='pre order' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:pre-order' " +
			" data-product_info='" + tagProdInfo + "' href='/us/shop/checkout/" + item.id + "' class='add-to-cart ecom button block-level'>PRE-ORDER</a>";
	
		} else {
			result += "<a data-link_id='" + tagPrefix + "cartadd_" + item.id + "' data-link_cat='add to cart' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:add to cart|order_flow:main' " +
			" data-product_info='" + tagProdInfo + "' href='/us/shop/checkout/" + item.id + "' class='add-to-cart ecom button block-level'>ADD TO CART</a>";
		}
	} else {
		//result += "<a data-link_id='" + tagPrefix + "shop_" + item.id + "' data-link_cat='product learn more' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:product learn more' data-product_info='" + tagProdInfo + "' href='" + item.linkURL + "' class='add-to-cart button block-level'>LEARN MORE</a>";
		result += "<a data-link_id='" + tagPrefix + "find_" + item.id + "' data-link_cat='find product' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:find online or locally' data-product_info='" + tagProdInfo + "' href='" + item.linkURL + "-buy' class='button alt block-level'>Find Online or Locally</a>";
	}
	
	if(item.hasMarketplaceLink != 'false') {
		result += "<a data-link_id='" + tagPrefix + "shop_" + item.id + "' data-link_cat='product learn more' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:product learn more' data-product_info='" + tagProdInfo + "' href='" + item.linkURL + "' class='add-to-cart button block-level'>LEARN MORE</a>";
		//result += "<a data-link_id='" + tagPrefix + "find_" + item.id + "' data-link_cat='find product' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:find online or locally' data-product_info='" + tagProdInfo + "' href='" + item.linkURL + "-buy' class='button alt block-level'>Find Online or Locally</a>";
	}
	
	return result;
}

function accEcomModule(item) {
	var tagPrefix = typeof (item.tagPrefix) == 'undefined'? "": item.tagPrefix;
	var sectionName = typeof (item.sectionName) == 'undefined'? "": item.sectionName + ">";
	var price = $.trim(item.price).replace("$","").replace(",","");
	var tagProdInfo = "id:" + item.id + "|cat:" + item.prdIaName + "|name:" + _.escape(item.name) + "|price:" + price + "|cat_id:" + item.prdIaCd;
	var result = "";
	if (item.mobile_acc_flag == 'true') {
		result += "<a data-link_id='" + tagPrefix + "cartadd_" + item.id + "' data-link_cat='add to cart' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:add to cart|order_flow:mobile accessories' data-product_info='" + tagProdInfo + "' href='http://mobile.samsung.com/accessories/addtocart.do?productid=" + item.id + "&returnurl="
				+ document.location.href + "' class='button add-to-cart ecom block-level'>ADD TO CART</a>";
	} else if(item.ecommerce_flag == "true" && item.stock_flag && item.stock_flag != 'N') {
		if ("P" == item.stock_flag) {
			result += "<a data-link_id='" + tagPrefix + "pre-order_" + item.id + "' data-link_cat='pre order' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:pre-order' data-product_info='" + tagProdInfo + "' href='/us/shop/checkout/" + item.id + "' class='add-to-cart ecom button block-level'>PRE-ORDER</a>";
		} else {
			result += "<a data-link_id='" + tagPrefix + "cartadd_" + item.id + "' data-link_cat='add to cart' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:add to cart|order_flow:main' data-product_info='" + tagProdInfo + "' href='/us/shop/checkout/" + item.id + "' class='add-to-cart ecom button block-level'>ADD TO CART</a>";
		}
	} else {
		result += "<a data-link_id=" + tagPrefix + "find_" + item.id + "' data-link_cat='find product' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:find online or locally' data-product_info='" + tagProdInfo + "' href='" + item.linkURL + "-buy' class='button alt block-level'>Find Online or Locally</a>";
		//result += "<a data-link_id='" + tagPrefix + "shop_" + item.id + "' data-link_cat='product learn more' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:product learn more' data-product_info='" + tagProdInfo + "' href='" + item.linkURL + "' class='add-to-cart button block-level'>LEARN MORE</a>";
	}
	
	if(item.hasMarketplaceLink != 'false') {
		result += "<a data-link_id='" + tagPrefix + "shop_" + item.id + "' data-link_cat='product learn more' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:product learn more' data-product_info='" + tagProdInfo + "' href='" + item.linkURL + "' class='add-to-cart button block-level'>LEARN MORE</a>";
		//result += "<a data-link_id=" + tagPrefix + "find_" + item.id + "' data-link_cat='find product' data-link_position='" + sectionName + _.escape(item.id) + "' data-link_meta='link_name:find online or locally' data-product_info='" + tagProdInfo + "' href='" + item.linkURL + "-buy' class='button alt block-level'>Find Online or Locally</a>";
	}
	
	return result;
}

function familyOptions(product) {
	var result = "";
	if (typeof (product.options) == 'undefined' || product.options.length == 0)
		return "<div class='famliy-option'></div>";

	result += "<div class='famliy-option'>";
	var options = product.options;
	var optionName = "";
	for ( var i = 0; i < options.length; i++) {
		var item = options[i];
		if(item){
			if (optionName != item.option) {
				if (i > 0)
					result += "</ul></div>";
				var colorClass = item.option == "Color" ? "colors" : "";
				result += "<div class='customizations " + colorClass + "'><span class='custom-type'>"
						+ item.option + "</span><ul>";
				optionName = item.option;
			}
			
			var mdlCdStr = "";
			for (var k = 0; k < item.product.length; k++) {
				mdlCdStr += item.product[k] + ",";
			}
			if (mdlCdStr.length > 0)
				mdlCdStr = mdlCdStr.substring(0, mdlCdStr.length - 1);

			var optionType = "";
			if ("color" == item.option.toLowerCase()) {
				optionType = item.item.toLowerCase().trim().replace(" ", "-");
			}

			var hasPrd = false;
			for ( var j = 0; j < item.product.length; j++) {
				if (item.product[j] == product.id) {
					hasPrd = true;
					break;
				}
			}

			if (hasPrd) {
				result += "<li class='selected'>";
			} else {
				result += "<li>";
			}
			
			if ("color" == item.option.toLowerCase()) {
				result += "<a data-modelCds='" + mdlCdStr + "' data-toggle='mini-tooltip' data-tooltip-copy='" + item.item + "' class='" + optionType
								+ "' style='position: relative;'>";
			} else {
				result += "<a data-modelCds='" + mdlCdStr + "'>";
				result += item.item.replace("^", "\"");
			}
			
			result += "</a></li>";
		}
	}

	if($.trim(result) !== "" && !endsWith(result, "</ul></div>"))
		result += "</ul></div>";
	
	result += "</div>";
	return result;
}


function ecorebateModule(item){
	var result = "";
	if(typeof (item.ecorebatesID) != 'undefined' && item.ecorebatesID!=""){
		result = "<div id='"+item.ecorebatesID+"' class='ecorebate' data-model-code='"+item.id+"'></div>"+ 
		"<script type='text/javascript'>"+
		"_ecr['"+item.ecorebatesID+"'] = '"+item.id+"'"+ 
		"</script>";	
	}
	
	return result;
}

function reviewModule(item) {
	var tagPrefix = typeof (item.tagPrefix) == 'undefined'? "": item.tagPrefix;
	var sectionName = typeof (item.sectionName) == 'undefined'? "": item.sectionName;
	var price = $.trim(item.price).replace("$","").replace(",","");
	var tagProdInfo = "id:" + item.id + "|cat:" + item.prdIaName + "|name:" + _.escape(item.name) + "|price:" + price + "|cat_id:" + item.prdIaCd;
	
	var reviewUrl = item.linkURL + "-reviews";
	var result = "<div class='rating' itemprop='aggregateRating' itemscope itemtype='http://schema.org/AggregateRating'>";
	
	var submissionurl = "";
	var index = reviewUrl.indexOf("ct=");
	
	if(index != -1) {
		reviewUrl_sub = reviewUrl.substring(index + 3);
		submissionurl = reviewUrl_sub + encodeURIComponent("?bvaction=writereview");
	} else {
		if (!window.location.origin) {
			  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		}
		reviewUrl = window.location.origin + reviewUrl;
		submissionurl = encodeURIComponent(reviewUrl + "?bvaction=writereview");
	}
		
	var submitReviewUrl = BAZZA_REVIEWS_URL + item.id.replace("/", "_") + "/writereview.htm?submissionurl=" + submissionurl;
	
	if (item.reviews > 0) {
		
		
		result += "<span class='stars " + reviewClass(item.rating + "") + "' title='" + item.rating + " stars' itemprop='ratingValue'>";
		result += item.rating;
		result += "</span>";
		result += "<a data-link_id='" + tagPrefix + "review_" + item.id + "' data-link_cat='review'  data-link_position='" + sectionName + "' data-link_meta='link_name:review' data-product_info='" + tagProdInfo + "' href='" + reviewUrl + "'>";
		result += "<span class='num-rating-wrapper'>(<span class='product-num-ratings' itemprop='reviewCount'>";
		result += item.reviews;
		result += "</span>)</span></a>";
		result += "</span>";
			
		result += "<a data-link_id='" + tagPrefix + "review_" + item.id + "' data-link_cat='review' data-link_position='" + sectionName.replace(">", "") + "' data-link_meta='link_name:review' data-product_info='" + tagProdInfo + "' href='" + submitReviewUrl + "' style='margin-left: 10px; display: inline;'>Write a review</a>";
	} else {

		result += "<div><a data-link_id='" + tagPrefix + "review_" + item.id + "' data-link_cat='review' data-link_position='" + sectionName.replace(">", "") + "' data-link_meta='link_name:review' data-product_info='" + tagProdInfo + "' href='" + submitReviewUrl + "' style='font-size:1em;'>Be the first to write a review</a></div>";
	}
	
	result += "</div>";

	return result;
}

function compareModule(item) {
	if(item.comparable != "true")
		return "";
	var result = "<div class='compare'><label for='compare-" + item.id + "'><input type='checkbox' name='compareCd' class='compare-check' value='" + item.id + "' id='compare-" + item.id + "'><span>Add to Compare</span></label>"
			+ "<a class='button sm alt' href='#' rel='" + item.id + "' style='display: none;'><b>Compare</b></a></div>"; 						
	return result;
}

function compareModulePrice(item) {
	var price = "";
	if(item.price!= null && typeof (item.price) != 'undefined' && item.price != "" && Number(item.price) != 0){
		price = "$"+item.price;
	}
	var result =  "<p class='price' itemprop='price'>"+price+"</p>";
	return result;
}


function promotionModule(item) {
	if(typeof(item.promotion) == 'undefined' || item.promotion == null || item.promotion == "") 
		return "";
	var imagePath = item.promotion.imgFileG;
	var content = item.promotion.contG;
	var contHtml = item.promotion.contHtmlG;
	var subContent = item.promotion.subContG;
	var subContText = item.promotion.subContTextG;
	if(item.promotion.viewType == "L") {
		imagePath = item.promotion.imgFileL;
		content = item.promotion.contL;
		contHtml = item.promotion.contHtmlL;
		subContent = item.promotion.subContL;
		subContText = item.promotion.subContTextL;
	}
	
	var result = "<div class='promo' >";
	if("I" == item.promotion.promType) {
		result += "<a class='promo-img' href='" + item.promotion.linkUrl + "' target='_blank'><img src='" + imagePath + "' style='width:100%;padding:0;'></a>";
	} else if("T" == item.promotion.promType) {
		result += "<a class='promo-img' href='" + item.promotion.linkUrl + "' target='_blank'><img src='" + imagePath + "' ></a>";
	}
	
	if("I" != item.promotion.promType) {
		if("T" == item.promotion.promType) {
			result += "<p>" + content;
			if (subContent != null && subContent != "") {
				result += "<span>" + subContent + "</span>";
			}
		} else {
			result += "<p style='width:100%;'>" + contHtml;
			if (subContText != null && subContText != "") {
				result += "<span>" + subContText + "</span>";
			}
		}

		if (item.promotion.promLnkYn != null && "Y" == item.promotion.promLnkYn) {
			result += "<a href='" + item.promotion.promLnkUrl + "'>" + item.promotion.promLnkTitle + "</a>";
		}

		result += "</p></div>";
	}
	
	result += "</div>";
	return result;
}

function featuresModule(features) {
	var result = "";
	if(typeof(features) == 'undefined' || features == null || features == "") 
		return result;
	var featureAry = features.split("@@@");
	for(var i = 0; i < featureAry.length; i++) {
		result += "<li>" + featureAry[i] + "</li>";
	}
	
	return result;
}

function specModule(item) {
	var result = "<dl>";
	var specAry = item.specs.split("@@@");
	var specTitle=$(".compare-product dt:nth-child(odd)");
	var attribute=[];
	for(var i=0; i<specTitle.length;i++){
		attribute.push(specTitle[i].innerHTML);
	}
	var specList = checkAttribute(attribute, specAry);
	for(var i = 0; i < specList.length; i++) {
		var keyValue = specList[i].split("^^");
		var k=keyValue[1].toLowerCase();
		if(k=='' || k==' ' || k=='no' || k=='-' || k=='n/a' || k=='na'){keyValue[1] = 'N/A';}
		result += "<dt>" + keyValue[0] + "</dt><dd>" + keyValue[1] + "</dd>";
	}
	result += "</dl>";
	return result;
}

/*** MANTIS 4164 ***/
function checkAttribute(att, prod){
    var arr = [], k, i;
    for (k = 0; k < att.length; ++k){
        var exists = false;
        for (i = 0; i < prod.length; ++i){
            if(prod[i].indexOf(att[k]) > -1){
               arr.push(prod[i]);
               var exists = true; 
               break;
            }
        }
        if (!exists){
            arr.push(att[k]+"^^N/A");
        }
    }
return arr;
}
/*** MANTIS 4189 ***/
$("#footer").ready(function(){
	setTimeout(function(){
		var specRows=$(".compare-product dt:nth-child(odd)");
		var orig=$(".compare-product dd");
		var prod=$("#compare-carousel dl");
		var ct=0;

			for(var i=0; i<$(orig).length; i++){
				$(prod).each(function(k){
					if($(orig[i]).html() != null){
						if(($(orig[i]).html().toLowerCase() == 'n/a') && ($($("dd",prod[k])[i]).html().toLowerCase() == 'n/a'))
						{ct++;}
						if(ct>=prod.length){
						$.when($($(orig[i]).prev()).remove()).then($(orig[i]).remove());
							$(prod).each(function(x){
								$($("dd",prod[x])[i]).remove();
							});
							ct=0;
							if(i!=0) i--;
							orig=$(".compare-product dd");
							prod=$("#compare-carousel dl");
						}
					}
				});
				ct=0;
			}
	},5000);
});
function reviewClass(rating) {
	rating = rating + "";
	var result = "stars_";
	if(rating.length == 1) {
		rating = rating + ".0";
	}
	var ratingAry = rating.split(".");
	var first = ratingAry[0];
	var second = "0";
	if (ratingAry.length > 1)
		second = ratingAry[1];

	if (second == "0" || second == "1" || second == "2" || second == "8"
			|| second == "9") {
		if (second == "8" || second == "9") {
			first = parseInt(first) + 1;
		}
		second = "0";
	} else {
		second = "5";
	}
	return result + first + "_" + second;
}

function getLinkPosition(item) {
	if(typeof (item.sectionName) == 'undefined')
		return "";
	return 'data-link_position="' + item.sectionName + '"';
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function moveToSupport(pageUrl, anchor) {
	window.document.cookie = "contentMoveValue" + "=" + escape(anchor)
			+ "; path=/; domain = samsung.com";
	window.location.href = pageUrl;
}

function getCookie(key) {
	return $.cookie(key);
}

function deleteCookie(name, path, domain)
{
	
	domain = "samsung.com";
	if (getCookie(name)) {
		document.cookie = name + '=' +
			((path) ? ';path=' + path : '') +
			((domain) ? ';domain=' + domain : '' ) +
			';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	}
}

function formatDate(formatDate) {
	//formatDate = 2011-07-22T21:55:37.000+00:00;
	var arr_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	if ("" != formatDate && null != formatDate){
		var year = formatDate.substr(0,4);
		var month = arr_months[parseInt(formatDate.substr(5,2),"10")-1]; 	
		var date = formatDate.substr(8,2);
		return month + " " + date + ", " + year;
	}
	return "";
}

function isMobile(){
	if($("meta[device]").attr("device") == "mobile" || window.innerWidth < 769)
		return true;
	return false;
}

function setPgmCookie(){
	  var domain = "samsung.com";
	  var pgm_em = "pgm_em";
	  var pgm = "pgm";
	  var val = getUrlVars(pgm_em);
	  var succ = 0;
	  if(val && getCookie(pgm_em)){
	  	succ = 1;
	  }else if(val){
	  	succ = 2;
	  }
	  if(succ == 2) {
	  	$.cookie(pgm, val,{path: '/', domain: domain});
	  	$.cookie(pgm_em, val,{path: '/', domain: domain});
	  }else if(succ ==0){
	  	deleteCookie(pgm_em, "/", domain);
	  	if(!val){
	  		val = getUrlVars(pgm);
		}
		if(val){
	  		$.cookie(pgm, val,{path: '/', domain: domain});
	  	}
		
	  }
	  			  	
}


function getUrlVars(name)
{
    var  hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
    	
        hash = hashes[i].split('=');
        if(hash[0] == name && hash[1]){
        	return hash[1];
        }
	        
    }
    return "";
}

function getShopAccFlags(product){
	var flagHTML = '<div class="shop-flag-wrapper">';

	if(product[0].flTypCd){
		flagHTML += '<div class="shop-flags newest-product">Deal</div>';
	}

	if(product[0].flTypCd){
		flagHTML += '<div class="shop-flags special-offers">Limited Offer</div>';
	}

	if(product[0].flTypCd){
		flagHTML += '<div class="shop-flags featured-product">Top Featured</div>';
	}

	flagHTML += '</div>';

	return flagHTML;
}

function printThis(){
	var featureToggled = false;
	var specsToggled = false;
	if ($("#more-features").is(':hidden')){
		$("#more-features").show();
		$(".show-hide-features .button").html("See Less Features<i class='chevron-down inverted'></i>").data("expanded", "true");
		featureToggled= true;
	} 
	
	if ($("#full-specs").is(':hidden')){
		$("#full-specs").show();
		$(".show-hide-specs .button").html("Hide Full Specs<i class='chevron-down inverted'></i>").data("expanded", "true");
		specsToggled = true;
	}
	
	var div = $("#main").find(".bottom-mobile-lockup");
	$(div).removeClass("visible-phone");
	$(div).removeClass("non-side-by-side-mobile");
	$(div).hide();
	window.print();
	setTimeout(function() {
		if(featureToggled){
			$("#more-features").hide();
			$(".show-hide-features .button").html("See More Features<i class='chevron-down'></i>").data("expanded", "true");
		}
		
		if(specsToggled){
			$("#full-specs").hide();
			$(".show-hide-specs .button").html("See Full Specs<i class='chevron-down'></i>").data("expanded", "true");
		}
		$(div).addClass("visible-phone");
		$(div).addClass("non-side-by-side-mobile");
		$(div).show();
    }, 500);

}


$( document ).ready(function() {
	if($("input[id='viewType']").length>0 && $("#results").length>0){
		var value = $("input[id='viewType']").val();
		if(value == "G"){
			$("#results").removeClass("list");
		}else if(value == "L"){
			$("#results").addClass("list");
		}	
	}
	
	if(isHomeApplianceButNotVacuum()){
			replacePriceModule();
		}
});

function isHomeApplianceButNotVacuum(fromRR){
	
	var url = "";
	if(typeof(fromRR) == 'undefined' || !fromRR){
		url = $(".product-module").find("h3.product-title a").attr("href");	
	}
	var result =false;
	if(!url || typeof(url) == 'undefined'){
		var withHash = window.location.href.substr(0, window.location.href.indexOf('#'));
		if(withHash){
			url = withHash.split(window.location.host)[1];
		}else{
			url = window.location.href.toString().split(window.location.host)[1];
		}	
	}
	var rel = url.split("/");
	if(rel && rel.length > 3){
		if(rel[2] == 'appliances' && rel[3] != 'vacuums' && rel[3].indexOf('-accessories') == -1){
			result =true;
		}
	}
	return result;
} 


function replacePriceModule(){
	
		$SELECTOR = $(".product-module");
		
		
		$SELECTOR.each(function() {
			var type= $(this).data("type");
			
			if("accessory"!=type){
				var url = $(".product-module").find("h3.product-title a").attr("href");
				if(type== "product" || (url && typeof(url) != 'undefined'&& url.indexOf('-accessories') == -1)){
					var div = $(this).find(".price-module").find(".suggested");
					if(div && div.length > 0 ){
						$(this).find(".price-module").find(".price :nth-child(1)").text("Suggested Promo Price:");
						$(this).find(".price-module").find(".savings").hide();
					}else{
						$(this).find(".price-module").find(".price :nth-child(1)").text("Suggested Price:");
					}	
				}
				
			}
			
		});
	
}