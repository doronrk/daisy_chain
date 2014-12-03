//Tealium tag implementation

var tealium_debug = false;

//IE fix
if (typeof console == 'undefined') {
    var console = {log:function(){}};    
}

$(document).ready(function() {    
	//Home banner 
    $(".banner>h2>a").click(function(e){
    	var imgAlt= $(this).children("img").attr("alt").replace(" Shop now.", "");
    	cmEventTag({
    		event_id:'Home Silde ' + ($('.banner>h2>a').index(this) + 1),
    		//event_action_attr46:"Click",
    		event_detail_attr47:"Click",
    		event_detail_sub_attr48:$('.banner>h2>a').index(this) + 1 //position
    	});
    });
    
    //Play home banner
    $("#homepageFeaturedSlideshow>ul>li>a").click(function(e){
        var imgName= $(this).children("img").attr("name");
        cmEventTag({
    		event_id:imgName,
    		//event_action_attr46:"Click",
    		event_detail_attr47:"Click",
    		event_detail_sub_attr48:$('#homepageFeaturedSlideshow>ul>li>a').index(this) + 1
    	});
    });
    
    //Stores home banner
    $(".contentImages>div").click(function(e){
        var imgAlt= $(this).find("div.contentImage img").attr("alt");
        cmEventTag({
    		event_id:imgAlt,
    		//event_action_attr46:"Click",
    		event_detail_attr47:"Click",
    		event_detail_sub_attr48:$('#homepageFeaturedSlideshow>ul>li>a').index(this) + 1
    	});
    });
    
	//Product list thumbnail click
	$(".prodMod .prodImg a").click(function(e){
		var item_id = _prodIdfromURL($(this).attr('href'));
		cmEventTag({
			event_id:item_id,
			event_action_attr46:"Banner Click",
			event_detail_attr47:"Banner Click",
			event_detail_sub_attr48:$(".prodMod .prodImg a").index(this) + 1
		});
	});
	//Product list link click
	$(".prodMod .itemDesc a").click(function(e){
		var item_id = _prodIdfromURL($(this).attr('href'));
		var brand_attr20 = $("div.categoryHeader a").text();
		cmEventTag({
			event_id:item_id,
			brand_attr20:brand_attr20,
			event_action_attr46:"Banner Link Click",
			event_detail_attr47:$("div.pageLocation").text(),
			event_detail_sub_attr48:$(".prodMod .itemDesc a").index(this) + 1
		});
	});
	//Product list addtobag/configure click
	$(".prodMod .addConfig a").click(function(e){		
		var item_id = '';
		var event_detail_attr47 = '';
		var position = 0;
		if ($(this).attr('href') == '#') {
			item_id = $(this).parent().find('form input[name=id]').val();
			event_action_attr46 = 'Add to Bag';
			position = $(".prodMod .addToBagButton a").index(this) + 1;
		}else {
			item_id = _prodIdfromURL($(this).attr('href'));
			event_action_attr46 = 'Configure';
			position = $(".prodMod .addConfig a").index(this) + 1;
		}
		if ($(this).parents('.crossWays').find('.crossHeader').text() != '') {
			event_detail_attr47 = $(this).parents('.crossWays').find('.crossHeader').text();
		}else {
			event_detail_attr47 = $("div.pageLocation").text();
		}
		if ($(this).hasClass('addToBagButton')) {
			//moved to seperate function - below			
		}else {
			//alert('Configure');
			cmEventTag({
				event_id:item_id,
				event_action_attr46:event_action_attr46,
				event_detail_attr47:$("div.pageLocation").text(),
				event_detail_sub_attr48:position
			});
		}	
	});

	//add to bag
	$("a.addToBagButton").click(function() {	
			if (typeof add_to_cart_method_attr17 == 'undefined') {
				var add_to_cart_method_attr17 = 'NAV';
			}
			if (window.location.href.indexOf("/agshop/html/search") > 0) {
			    add_to_cart_method_attr17 = 'SEARCH';
			}			
			if (typeof getAndValidateSelectedItemIds == 'function') { // multiple prod
			    var data = getAndValidateSelectedItemIds();
			    var selectedItemIds = data.selectedItemIds;
			    var errorMessages = data.errorMessages;
			    if (errorMessages.length == 0) {
			        if (selectedItemIds.length > 0) {
			            $.each(selectedItemIds, function(index, value) { 
			            	cmEventTag({
							event_id: value,
							event_category_id: "Add to Cart",
							event_action_attr46: add_to_cart_method_attr17//XSCOORD or NAV	
							});
			            	
			            }); 

			        }
			    }			    
			}
			else if (typeof getAndValidateSelectedSize == 'function') { //style header
			    var selectedSize = getAndValidateSelectedSize();
			    if (selectedSize) {
			    	cmEventTag({
					event_id: selectedSize,
					event_category_id: "Add to Cart",
					event_action_attr46: add_to_cart_method_attr17//XSCOORD or NAV	
					});
			    	
			    }
			}
			else if (typeof getItemId == 'function') { //normal product
				var itemId = getItemId();
				cmEventTag({
				event_id: itemId,
				event_category_id: "Add to Cart",
				event_action_attr46: add_to_cart_method_attr17//XSCOORD or NAV
				});
				
			}
			else if (typeof handleAddToBag == 'function') { //thumbnail product
				var itemId = $(this).siblings("form.addToBagData").find("input[name=id]").val();
				cmEventTag({
				event_id: itemId,
				event_category_id: "Add to Cart",
				event_action_attr46: add_to_cart_method_attr17//XSCOORD or NAV
				});
				
			}
			var quickSellItemId = common.getQuickSellItemId();
			if (typeof quickSellItemId != 'undefined') {
				cmEventTag({
					event_id: quickSellItemId,
					event_category_id: "Add to Cart",
					event_action_attr46: add_to_cart_method_attr17//XSCOORD or NAV
					});
				
			}
		
		});
	

	//Product details page right column click
	$(".transactionInfoBlock a, a#viewLargerLink").click(function(e){
		var link_text = $(this).text();
		//alert("click " + link_text);
		var item_id = $('form.addToBagData input[name=id]').val();
		var event_detail_attr47 = '';
		var event_detail_sub_attr48 = '';
		if (link_text == 'Add to Gift Registry') {
			event_detail_attr47 = link_text;
		}else if (link_text == 'E-mail this page to a friend ') {
			event_detail_attr47 = link_text;
		}else if (link_text == 'View larger') {
			event_detail_attr47 = link_text;
			//var imgsrc = $('img.noBorder').attr('src').split('/');
			//var img_filename = imgsrc[imgsrc.length - 1];
			//alert(img_filename);
			//event_detail_sub_attr48 = img_filename;
			var img = $(this).parents('#imageCrossSellBlock').find('#viewLargerLink2 img');
			if (typeof img != 'undefined') {
    				var imgsrc = $(img).attr('src').split('/');
    				var img_filename = imgsrc[imgsrc.length - 1];
    				event_detail_sub_attr48 = img_filename;
				//alert(event_detail_sub_attr48);
			}
		}
		if (event_detail_attr47 != '') {
			if(item_id == '') {
				item_id = 'click'; //otherwiser page event will be called 
			}
			cmEventTag({
				event_id:item_id,
				//event_action_attr46:event_action_attr46,
				event_detail_attr47:event_detail_attr47,
				event_detail_sub_attr48:event_detail_sub_attr48
				//event_detail_sub_attr48:$(".prodMod .itemDesc a").index(this) + 1
			});
		}
	});

	//Product details page right column click
	$(".transactionInfoBlock a, li#review a").live('click', function(e){
		var link_text = $(this).text();
		//alert("live " + link_text);
		var item_id = $('form.addToBagData input[name=id]').val();
		var event_detail_attr47 = '';
		var event_detail_sub_attr48 = '';
		if (link_text == 'Read all reviews') {
			event_detail_attr47 = link_text;
		}else if ($(this).hasClass('BVRRSocialBookmarkingSharingLink')) {
			event_detail_attr47 = $(this).find('img').attr('alt');
		}

		if (link_text == 'Write a review' || link_text == 'Write a Product Review') {
			cmConvertionEventTag({
    			conv_event_id:"Product Review",
    			event_action_type:"1",
    			event_points:"10",
    			event_action_attr46:"Review"
    			//event_category_id:"Product Review"
    			});
		}else if (event_detail_attr47 != ''){
			if(item_id == '') {
				item_id = 'click'; //otherwiser page event will be called 
			}
			cmEventTag({
				event_id:item_id,
				//event_action_attr46:event_action_attr46,
				event_detail_attr47:event_detail_attr47,
				event_detail_sub_attr48:event_detail_sub_attr48
				//event_detail_sub_attr48:$(".prodMod .itemDesc a").index(this) + 1
			});
		}
	});

	
	 
	$("form.BVRRForm input[type='image']").click(function(e){
		var clicked = $(this).attr('name');
		var event_detail_attr47 = '';
		if('cancel' == clicked) {
			event_detail_attr47 = 'Cancel';
		}else if('edit' == clicked) {
			event_detail_attr47 = 'Edit';
		}else if('submit' == clicked) {
			event_detail_attr47 = 'Submit';
			cmConvertionEventTag({
    			conv_event_id:"Product Review",
    			event_action_type:"2",
    			event_points:"20",
    			event_action_attr46:"Review"
    			//event_category_id:"Product Review"
    		});
		}
		if (event_detail_attr47 != '') {
	    	cmEventTag({
	    		event_id:event_detail_attr47,
	    		event_action_attr46:"Review",
	    		event_detail_attr47:event_detail_attr47,
	    		event_category_id: "Product Review"
	    	});
		}
    });
    
	//Login:Myaccount event -- called inline on form - issue in binding
	/* $("form[name='f_login']").submit(function(e){
    	cmEventTag({event_id:'MyAccount:Login', event_action_attr46:"Login", event_detail_attr47:'MyAccount:Login'});		
    });*/
	
	//Search
	$("form[action='/agshop/html/search']").submit(function(e){
		var event_detail_attr47 = $('#prodSearch:searchstr', this).val();
		if (event_detail_attr47 != '') {
	    	cmEventTag({
	    		event_id:"Search",
	    		//event_action_attr46:"Search",
	    		event_detail_attr47:"Search"
	    	});
		}
    });
	//Common form submit login & register
	/*
	$("form[name='f_login']").submit(function(e){
		//alert('f_login fired');
		cmConvertionEventTag({ //start of this event is on page load
			conv_event_id:"login",
			event_category_id:"my account",
			event_action_type:"2",
			event_points:"20",
			event_action_attr46:"Click"    			
		});
    	
    });
    */
	
	$("form[name='f_register'], form[name='f_ord_status']").submit(function(e){
		var event_detail_attr47 = '';
		var event_category_id = '';
		if($(this).attr('name') == 'f_login') {
			event_detail_attr47 = 'Login';
		}else if ($(this).attr('name') == 'f_register') {
			event_detail_attr47 = 'Resgiter';
		}else if ($(this).attr('name') == 'f_ord_status') {
			event_detail_attr47 = 'Order Status';
		}
		if ($(this).attr('action').indexOf('checkout.php') > 0) {
			event_category_id = 'Checkout';
		}else {
			event_category_id = 'My Account';
		}
    	
    	if ($(this).attr('name') == 'f_register') {
    		cmConvertionEventTag({
    			conv_event_id:"Register",
    			event_action_type:"1",
    			event_points:"10",
    			event_action_attr46:"Click",
    			event_category_id:"My Account"
    		});
    	}    	
    	else {
    		cmEventTag({
        		event_id:event_detail_attr47,
        		event_action_attr46:"Click",
        		event_detail_attr47:event_detail_attr47,
        		event_category_id: event_category_id
        	});
    	}
    });
	
	$("form[name='f_login'] a.popUpLnk").click(function(e){
		cmEventTag({
    		event_id:'Forgot Password',
    		//event_action_attr46:"Click",
    		event_detail_attr47:"Click"
    	});
    });
	
	//Shopping cart update, remove, product link
	$("form[name='cartform'] a").click(function(e){
		var link_clicked = $(this).text();
		var link_url = $(this).attr('href');
		var event_detail_attr47 = '';
		if (link_clicked == 'Remove') {	
			event_detail_attr47 = 'SHOP BAG :  REMOVE ITEM';
		}else if (link_url.indexOf('updateCart') > 0) {
			event_detail_attr47 = 'SHOP BAG: UPDATE CART';
		}else if (link_clicked == 'Add to Bag') {		
			event_detail_attr47 = 'Add to Bag';
		}else if (link_url.indexOf('productPageLink') > 0) {		
			event_detail_attr47 = 'SHOP BAG: PRODUCT LINK';
		}else if (link_url.indexOf('Shipping_Options') > 0) {
			event_detail_attr47 = 'SHOP BAG:Shipping and Processing';
		}else if ($(this).attr('target') == '_top') {
			event_detail_attr47 = 'SHOP BAG : UP SALE ADD TO BAG';			
		}else if (link_url.indexOf('saveSourceKey') > 0) {
			event_detail_attr47 = 'SHOP BAG: UPDATE PROMO CODE';
		}else if (link_url.indexOf('backToShopping') > 0) {
			event_detail_attr47 = 'SHOP BAG:BACK TO SHOPPING ';
		}
		if (link_url.indexOf('proceedToCheckout') > 0) {
			event_detail_attr47 = 'Proceed To Checkout';
			cmConvertionEventTag({
    			conv_event_id:"Checkout",
    			event_action_type:"1",
    			event_points:"10",
    			event_action_attr46:"SHOP BAG: PROCEED TO CHECKOUT",
    			event_category_id:"Checkout"
    		});
		}else {
			cmEventTag({
	    		event_id:event_detail_attr47,
	    		event_action_attr46:"Click",
	    		event_detail_attr47:event_detail_attr47
	    	});
		}		
    });
	
	//Myaccount update form
	$("form[name='f_edit_login'], form[name='f_edit_billing_address'] a, form[name='add_shipping_address'], form[name='f_add_shipping_addr'], form[name='save_credit_card_details'], form[name='f_add_card'], form[name='f_edit_contact_preferences']").submit(function(e){		
		if($(this).attr('name') == 'f_edit_login') {
              cmEventTag({
              event_id:'My Account:Update Login',
              event_action_attr46:"Click",
              event_detail_attr47:'My Account:Update Login',
              event_category_id: 'My Account',
              event_type: 'registration',
              account_update_date_latest_attr39: getCurrentDate()
        });
        
        }else if ($(this).attr('name') == 'f_edit_billing_address') {        	
        	  var cm_temp = $("select[name='p_state'] option:selected").text().split(',');
              cmEventTag({
              event_id:'My Account:Update Shipping Address',
              event_action_attr46:"Click",
              event_detail_attr47:'Checkout:Update Shipping Address',
              event_category_id: 'My Account',
              event_type: 'registration',
              account_update_date_latest_attr39: getCurrentDate(),
              registration_city: $("input[name='p_city']", this).val() ,
              registration_state:cm_temp[0],
              registration_postal_code:$("input[name='p_postal_code']", this).val(),
              registration_country:cm_temp[1]         
        });
        }else if ($(this).attr('name') == 'f_add_shipping_addr') {
var cm_temp = $("select[name='p_state'] option:selected").text().split(',');
              cmEventTag({
              event_id:'My Account:Update Shipping Options',
              event_action_attr46:"Click",
              event_detail_attr47:'Checkout:Update Shipping Options',
              event_category_id: 'My Account',
              event_type: 'registration',
              account_update_date_latest_attr39: getCurrentDate(),
              registration_city: $("input[name='p_city']", this).val() ,
              registration_state:cm_temp[0],
              registration_postal_code:$("input[name='p_postal_code']", this).val(),
              registration_country:cm_temp[1]
        });
        }else if ($(this).attr('name') == 'save_credit_card_details') {
              cmEventTag({
              event_id:'My Account: Update Credit Card',
              event_action_attr46:"Click",
              event_detail_attr47: 'My Account: Update Credit Card: update',
              event_category_id: 'My Account',
              event_type: 'registration'
        });
        }else if ($(this).attr('name') == 'f_add_card') {
        	var cm_reg = '';
        	if ($("input[name='p_express_checkout']").is(':checked') == true) {
        		cm_reg += ':'+'Yes';
        	}else {
        		cm_reg += ':'+'No';
        	}
              cmEventTag({
              event_id:'My Account:Add Credit Card',
              event_action_attr46:"Click",
              event_detail_attr47:'My Account: checkout_preferences : Add Credit Card',
              event_category_id: 'My Account',
              event_type: 'registration',
              account_update_date_latest_attr39: getCurrentDate(),
              express_checkout_indicator_attr43: cm_reg
        });
        }else if ($(this).attr('name') == 'f_edit_contact_preferences') {
        	var p_promotional_email_flag = ''; 
        	var p_mail_preference_code = '';
        	if ($("input[name='p_promotional_email_flag']").is(':checked') == true) {
        		p_promotional_email_flag += ':'+'Yes';
        	}else {
        		p_promotional_email_flag += ':'+'No';
        	}
        	if ($("input[name='p_mail_preference_code']").is(':checked') == true) {
        		p_mail_preference_code += ':'+'Yes';
        	}else {
        		p_mail_preference_code += ':'+'No';
        	}
              cmEventTag({
              event_id:'My Account:Update Contact Preference',
              event_action_attr46:"Click",
              event_detail_attr47:' My Account: Update Contact Preference : update ',
              event_category_id: 'My Account',
              event_type: 'registration',
              promotional_email_indicator_attr45:p_promotional_email_flag, //Dynamic
              catalog_mailling_indicator_attr46:p_mail_preference_code, //Dynamic
              account_update_date_latest_attr39: getCurrentDate()
        });
        }

    });
	
	
	//Checkout process element	
	//f_shipping_address_options, f_checkout_shipping_address, f_shipping_options,  f_payment , f_billing_information, 
	//addrstandform1, f_multiple_shipping, f_gift_options, f_order_summary
	$("form[name='f_shipping_address_options'], form[name='f_checkout_shipping_address'], form[name='f_shipping_options'], form[name='f_payment'], form[name='f_billing_information'], form[name='addrstandform1'], form[name='f_multiple_shipping'], form[name='f_gift_options'], form[name='f_order_summary']").submit(function(e){
		if($(this).attr('name') == 'f_shipping_address_options') {
			cmEventTag({
	    		event_id:'Checkout:Shipping',
	    		event_action_attr46:"Click",
	    		event_detail_attr47:'Checkout:Shipping',
	    		event_category_id: 'Checkout'
	    	});
		}else if ($(this).attr('name') == 'f_checkout_shipping_address') {
			cmEventTag({
	    		event_id:'Checkout:Shipping Address',
	    		event_action_attr46:"Click",
	    		event_detail_attr47:'Checkout:Shipping Address',
	    		event_category_id: 'Checkout'
	    	});
		}else if ($(this).attr('name') == 'f_shipping_options') {
			cmEventTag({
	    		event_id:'Checkout:Shipping Options',
	    		event_action_attr46:"Click",
	    		event_detail_attr47:'Checkout:Shipping Options',
	    		event_category_id: 'Checkout'
	    	});
		}else if ($(this).attr('name') == 'f_payment') {
			cmEventTag({
	    		event_id:'Checkout:Payment',
	    		event_action_attr46:"Click",
	    		event_detail_attr47:'Checkout:Payment',
	    		event_category_id: 'Checkout'
	    	});
		}else if ($(this).attr('name') == 'f_billing_information') {
			cmEventTag({
	    		event_id:'Checkout:Billing Information',
	    		event_action_attr46:"Click",
	    		event_detail_attr47:'Checkout:Billing Information',
	    		event_category_id: 'Checkout'
	    	});
		}else if ($(this).attr('name') == 'addrstandform1') {
			cmEventTag({
	    		event_id:'Checkout:Address Standardisation',
	    		event_action_attr46:"Click",
	    		event_detail_attr47:'Checkout:Address Standardisation',
	    		event_category_id: 'Checkout'
	    	});
		}else if ($(this).attr('name') == 'f_multiple_shipping') {
			cmEventTag({
	    		event_id:'Checkout:Multiple Shipping',
	    		event_action_attr46:"Click",
	    		event_detail_attr47:'Checkout:Multiple Shipping',
	    		event_category_id: 'Checkout'
	    	});
		}else if ($(this).attr('name') == 'f_gift_options') {
			cmEventTag({
	    		event_id:'Checkout:Gift Option',
	    		event_action_attr46:"Click",
	    		event_detail_attr47:'Checkout:Gift Option',
	    		event_category_id: 'Checkout'
	    	});
		}else if ($(this).attr('name') == 'f_order_summary') {
			cmEventTag({
	    		event_id:'Checkout:Order Summary',
	    		event_action_attr46:"Click",
	    		event_detail_attr47:'Checkout:Order Summary',
	    		event_category_id: 'Checkout'
	    	});
		}
    });
	
	
	//shopTools links
	$("ul.shopTools a").click(function(e){
		var event_detail_attr47 = $(this).text();
		if (event_detail_attr47 == 'My Account' || event_detail_attr47 == 'Order Status' || event_detail_attr47 == 'Gift Cards') {
			cmEventTag({
	    		event_id:event_detail_attr47,
	    		event_action_attr46:"Click",
	    		event_detail_attr47:event_detail_attr47,
	    		event_category_id: 'SHOP BAG: CUSTOMER SERVICE LINKS'
	    	});
		}
    });
	
	//Catrgory links
	$(".siteNav li a").click(function(e){
		var event_detail_attr47 = $(this).text();
		cmEventTag({
    		event_id:$(this).text(),
    		//event_action_attr46:"Category",
    		event_detail_attr47:"Category"
    	});
    });
	
	//Sub & Sub-sub catg links
	$(".localNav li a").click(function(e){
		var ul = $($(this).parents('ul')[0]);
		var level = '';
		var event_detail_attr47 = '';
		if (typeof ul != 'undefined') {
			var level = ul.attr('class');
		}
		if (level == 'navLevel4') {
			event_detail_attr47 = 'Sub sub category';
		}else if (level == 'navLevel3') {
			event_detail_attr47 = 'Sub category';
		}else if (level == 'navLevel2') {
			event_detail_attr47 = 'Category';
		}
		cmEventTag({
    		event_id:$(this).text(),
    		//event_action_attr46:"Category",
    		event_detail_attr47:event_detail_attr47
    	});
    });
	
	//Registration form
	$("form[name='f_reg_info']").submit(function(e){
		getEventTagRegister();
    });
	
    
    $('.items').click(function(){
        setUTagView({page_id: '', event_id: ''});
    });
    
    

    //Only for Play & Stores
    //var win_location = window.location.href;
    $(document).click(function(event){
     if (typeof win_location != 'undefined' && win_location != window.location.href) {
        //console.log(window.location.href);
        //console.log(event.target)
    	utag_data.referring_url_attr12 = win_location;
        win_location = window.location.href;
        cmProcesTagsFromUrl(win_location);
        utag.view(utag_data);
     }
    });

    //Historical Event Page Sublink click event log
    $(".nav>a,#nav-graphic>ul>li>a").click(function(e){
	var href= $(this).attr("href");
	//console.log(href);
	//e.preventDefault();
    });

    $("a[href^='http://'],a[href^='https://']").click(function(){
    	if($(this).attr('href').toLowerCase().indexOf('.americangirl.com') > 0) {
    		return true;
    	}
    	var href = $(this).attr("href");
        var name = $(this).text();
        var page_id = utag_data.page_id;
        name =(name!='')?name:$(this).children('img').attr('alt');
        
    	cmExternalLink(href, name, page_id);
    });
    
    /*
     * External links old
    $("a[href]").each(function() {
        if (this.hostname != location.hostname && this.hostname!='store.americangirl.com' && this.hostname!='www.americangirl.com')
            $(this).click(function(e) {
                var href = $(this).attr("href");
                var name = $(this).text();
                var page_id = utag_data.page_id; 
                name =(name!='')?name:$(this).children('img').attr('alt');            
       
                cmExternalLink(href, name, page_id);
                if (tealium_debug) {
                    e.preventDefault();
                }
        });
    });
    */
});

//Event view abstract function
function setUTagView(pageid) {
  utag.view({
      page_id: pageid,     
      category_id:categoryid,                                  
      division_attr1: division,             
      site_Type_attr2:siteType,
      site_Country_attr3:country,
      site_Region_attr4:region,
      platform_attr5:platform,
      currency_attr6:currency,  
      language_attr7:language,
      site_section_attr8:sitesection,
      page_name_attr9:pagename,
      page_type_attr10:pagetype,
      page_subtype_attr11:pagesubtype,
      referring_url_attr12:refferingurl,
      requested_url_attr13 :requesturl, 
      ip_address_attr14:ipaddress,
      brand_attr20: brand,
      registration_id: CustomerId,
      review_date_latest_attr41: ReviewDate,
      review_id_attr42: ReviewId,
      event_id: szEventId,
      event_category_id: szEventCategoryId,
      event_action_attr46: szEventAction,
      event_detail_attr47: szEventDetail,
      event_detail_sub_attr48:szEventSubDetail 
  });
}


function getValueFromFlashVideo(obj) {
       /*alert(obj.event_id);
       alert(obj.event_category_id);
       alert(obj.event_action_type);
       alert(obj.event_detail_attr47);
       alert(obj.event_detail_sub_attr48);
       alert(obj.event_length_attr49);
       alert(obj.event_length_full_attr50);*/
       
       utag.view({ 
         event_id:obj.event_id,    
         event_category_id:obj.event_category_id, 
         //event_action_type:obj.event_action_type, 
         event_action_attr46: obj.event_action_type, 
         event_detail_attr47:obj.event_detail_attr47,  
         event_detail_sub_attr48:obj.event_detail_sub_attr48,  
         event_length_attr49:obj.event_length_attr49, 
         event_length_full_attr50:obj.event_length_full_attr50,
         event_type: 'element'
       });
}

function onLoginCapture() {
	cmConvertionEventTag({ //start of this event is on page load
		conv_event_id:"login",
		event_category_id:"my account",
		event_action_type:"2",
		event_points:"20",
		event_action_attr46:"Click"    			
	});
	return true;
}

function cmExternalLink(linkHref, linkName, pageId) {
  if (tealium_debug) {
    console.log("linkHref " +  linkHref);
    console.log("linkName " +  linkName);
    console.log("linkName " +  pageId);
  }
  utag.link({   
    manual_link_href:linkHref,
    manual_link_link_name: linkName,
    page_id: pageId
  });
}

//Trigger element tags
function cmEventTag(event_obj) {
	var obj = { 
		event_id:"",
		//event_action_type:"",   
		event_category_id:utag_data.category_id,
		event_points:"",
		brand_attr20:"",
		event_action_attr46:"Click", //Click, Add to Bag, Configure, Banner Click, etc.
		event_detail_attr47:"",
		event_detail_sub_attr48:"", //
		event_type:"element"
	};
	$.extend(obj, event_obj);
	utag.view(obj);
	if (tealium_debug) {
		console.log(obj);
		//alert('element tag fired');
		//e.preventDefault();
	}
}
function cmConvertionEventTag(event_obj) {
	var obj = {
		conv_event_id:"",
		event_action_type:"",   
		event_category_id:utag_data.category_id,
		event_points:"10", //10 - start | 20 - end
		brand_attr20:"",
		event_action_attr46:"Click", //Click, Add to Bag, Configure, Banner Click, etc.
		event_detail_attr47:"",
		event_detail_sub_attr48:"", //
		event_type:"conversion"
	};
	$.extend(obj, event_obj);
	utag.view(obj);
	//alert('con event called');
	if (tealium_debug) {
		console.log(obj);
		//alert('conversion tag fired');
		//e.preventDefault();
	}
}

function cmShop5Tag(prod_id) {
	var prod_index = utag_data.product_id.indexOf(prod_id);
	//console.log(prod_id);
	var prod_utag = {
		product_id: [],
		product_name: [],
		product_sell_price_attr21: [],
		add_to_cart_sequence_attr23:[],
		color_attributes_att18:[],
		size_attributes_att19:[],
		product_base_price_attr22:[],
		product_inventory_status_attr25:["Available"]
	};
	if (prod_index > -1) {
		var temp_utag_data = {};
		temp_utag_data.product_id = utag_data.product_id[prod_index];
		temp_utag_data.product_name = utag_data.product_name[prod_index];
		temp_utag_data.product_sell_price_attr21 = utag_data.product_sell_price_attr21[prod_index];
		temp_utag_data.color_attributes_att18 = utag_data.color_attributes_att18[prod_index];
		temp_utag_data.size_attributes_att19 = utag_data.size_attributes_att19[prod_index];
		temp_utag_data.product_base_price_attr22 = utag_data.product_base_price_attr22[prod_index];
		temp_utag_data.event_type = 'shop5';
		
		temp_utag_data.page_id = temp_utag_data.page_id;
		temp_utag_data.category_id = temp_utag_data.category_id;
		temp_utag_data.page_name_attr9 = temp_utag_data.page_name_attr9;
		temp_utag_data.page_subtype_attr11 = temp_utag_data.page_subtype_attr11;

		//console.log(temp_utag_data);
		utag.view(temp_utag_data);
	}
}

//Utitlity function - don't touch it
function _prodIdfromURL(url) {
	var parts = url.split('/');
	if (parts[3] == 'id') {
		return parts[4];
	}else if (parts[4] == 'id') {
		return parts[5];
	}
	return 0;
}

function getEventTagRegister(){
	var cm_reg = '';
	var cm_temp = '';
	cm_reg += $("input[name='p_city']").val();
	if ($("select[name='p_state'] option:selected").text() != '') {
		cm_temp = $("select[name='p_state'] option:selected").text().split(',');
		cm_reg += ':'+cm_temp[0];
		cm_reg += ':'+cm_temp[1];
	}
	cm_reg += ':'+$("input[name='p_postal_code']").val();
	if ($("input[name='p_express_checkout']").is(':checked') == true) {
		cm_reg += ':'+'Yes';
	}else {
		cm_reg += ':'+'No';
	}
	if ($("input[name='p_promotional_email_flag']").is(':checked') == true) {
		cm_reg += ':'+'Yes';
	}else {
		cm_reg += ':'+'No';
	}
	if ($("input[name='p_credit_card_number']").val() != '') {
		cm_reg += ':Yes';
	}else {
		cm_reg += ':No';
	}
	//console.log(cm_reg);
	setCookie('cm_reg', cm_reg);
}

function myAccountUpdate(form) {
	//Myaccount update form
	//alert($(form).attr('name'));
	if($(form).attr('name') == 'f_edit_login') {
          cmEventTag({
          event_id:'My Account:Update Login',
          event_action_attr46:"Click",
          event_detail_attr47:'My Account:Update Login',
          event_category_id: 'My Account',
          event_type: 'registration',
          account_update_date_latest_attr39: getCurrentDate()
          });
          //alert('login done');
    }else if ($(form).attr('name') == 'f_edit_billing_address') {  
    	  var cm_temp = $("select[name='p_state'] option:selected").text().split(',');
          cmEventTag({
          event_id:'My Account:Update Billing Address',
          event_action_attr46:"Click",
          event_detail_attr47:'Checkout:Update Billing Address',
          event_category_id: 'My Account',
          event_type: 'registration',
          account_update_date_latest_attr39: getCurrentDate(),
          registration_city: $("input[name='p_city']").val() ,
          registration_state:cm_temp[0],
          registration_postal_code:$("input[name='p_postal_code']").val(),
          registration_country:cm_temp[1]         
          });
          //alert('billing done');
    }else if ($(form).attr('name') == 'f_add_shipping_addr') {

var cm_temp = $("select[name='p_state'] option:selected").text().split(',');
          cmEventTag({
          event_id:'My Account:Update Shipping Options',
          event_action_attr46:"Click",
          event_detail_attr47:'Checkout:Update Shipping Options',
          event_category_id: 'My Account',
          event_type: 'registration',
          account_update_date_latest_attr39: getCurrentDate(),
          registration_city: $("input[name='p_city']").val() ,
          registration_state:cm_temp[0],
          registration_postal_code:$("input[name='p_postal_code']").val(),
          registration_country:cm_temp[1]
          });
          //alert('shipping done');
    }else if ($(form).attr('name') == 'save_credit_card_details') {
          cmEventTag({
          event_id:'My Account: Update Credit Card',
          event_action_attr46:"Click",
          event_detail_attr47: 'My Account: Update Credit Card: update',
          event_category_id: 'My Account',
          event_type: 'registration'
          });
          //alert('save cc done');
    }else if ($(form).attr('name') == 'f_add_card') {
    	var cm_reg = '';
    	if ($("input[name='p_express_checkout']").is(':checked') == true) {
    		cm_reg += ':'+'Yes';
    	}else {
    		cm_reg += ':'+'No';
    	}
          cmEventTag({
          event_id:'My Account:Add Credit Card',
          event_action_attr46:"Click",
          event_detail_attr47:'My Account: checkout_preferences : Add Credit Card',
          event_category_id: 'My Account',
          event_type: 'registration',
          account_update_date_latest_attr39: getCurrentDate(),
          express_checkout_indicator_attr43: cm_reg
          });
          //alert('add cc done');
    }else if ($(form).attr('name') == 'f_edit_contact_preferences') {
    	var p_promotional_email_flag = ''; 
    	var p_mail_preference_code = '';
    	if ($("input[name='p_promotional_email_flag']").is(':checked') == true) {
    		p_promotional_email_flag += ':'+'Yes';
    	}else {
    		p_promotional_email_flag += ':'+'No';
    	}
    	if ($("input[name='p_mail_preference_code']").is(':checked') == true) {
    		p_mail_preference_code += ':'+'Yes';
    	}else {
    		p_mail_preference_code += ':'+'No';
    	}
          cmEventTag({
          event_id:'My Account:Update Contact Preference',
          event_action_attr46:"Click",
          event_detail_attr47:' My Account: Update Contact Preference : update ',
          event_category_id: 'My Account',
          event_type: 'registration',
          promotional_email_indicator_attr45:p_promotional_email_flag, //Dynamic
          catalog_mailling_indicator_attr46:p_mail_preference_code, //Dynamic
          account_update_date_latest_attr39: getCurrentDate()
          });
          //alert('contact done');
    }
}


//COOKIE HELPER
function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	if (x==c_name)
    {
		return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function checkCookie()
{
	var username=getCookie("username");
	if (username!=null && username!="")
	  {
	  alert("Welcome again " + username);
	  }
	else 
	  {
	  username=prompt("Please enter your name:","");
	  if (username!=null && username!="")
	{
	setCookie("username",username,365);
	    }
	  }
}


function getCurrentDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
	return today;
}

