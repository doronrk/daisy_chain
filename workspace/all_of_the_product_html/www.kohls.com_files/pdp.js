function addProductToBag(data){
        if(data.errors && data.errors.length > 0) {
        	var errMsg='';
        	for(i=0;i< data.errors.length;i++) {
        		errMsg=errMsg+' '+data.errors[i].errorMessage;
        	}
        	$("#skuerror").text(errMsg);
        	$('#error_display1').show();
			
			/*story *521 fix code starts*/
			var a = $("#skuerror").html();
			var inventory = 'out of stock';
			var inventoryqty = a.match(/\d+\.?\d*/g);
			if (a.indexOf(inventory) > -1){
				$(".quantity-left-column,#resultNumber").addClass("pdp-s-error-yellow");
				if(inventoryqty == null) {
                  $(".Enr_maxqty_tooltip").children().children(".tooltipcontent_para").text("This product is currently out of stock.");
                }else{
                  $(".Enr_maxqty_tooltip").children().children(".tooltipcontent_para").text("Sorry, our inventory on this item is low. Only "+inventoryqty+" are available. Please select a lower quantity.");
                }
				$(".Enr_maxqty_tooltip").show();
			}
			else{
				$(".quantity-left-column,#resultNumber").addClass("pdp-s-error-yellow");
				$(".Enr_maxqty_tooltip").children().children(".tooltipcontent_para").text(errMsg);
				$(".Enr_maxqty_tooltip").show();
			}
        } else {                	
        	/*Start Add item to Persistant bar*/
        	addTtemToPB();
			/*END Add item to Persistant bar*/

        	// set omniture tracking variables
        	s.pageName = data.userTrackingBean.pageName;
        	s.pageType = data.userTrackingBean.pageType;
			s.events = data.userTrackingBean.events;
			s.products = data.userTrackingBean.products;
			s.eVar48 = data.userTrackingBean.eVar48;
			s.prop9 = data.userTrackingBean.prop9;
			s.prop10 = data.userTrackingBean.prop10;
			s.prop11 = data.userTrackingBean.prop11;
			s.prop4 = data.userTrackingBean.pageType;
			s.prop53 = data.userTrackingBean.pageName;
			s.eVar68 = data.userTrackingBean.pageName;
			s.eVar42 = data.userTrackingBean.eVar42;
        	var s_code=s.t();if(s_code)document.write(s_code);
        }
}       //end function
