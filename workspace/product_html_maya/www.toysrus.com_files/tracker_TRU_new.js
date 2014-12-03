/*
DO NOT MODIFY THIS JS FILE. MAINTENANCE IS OWNED BY TRU.
*/


    //var $j = jQuery.noConflict();
   (function($j) {
	$j(document).ready(function() {								
      var NavHeader={ MainHeaderDIV     :   "#hdrWrapper a" ,SiteName : "#hdrLogo a"};
		$j(NavHeader.MainHeaderDIV).on("click",function(e){
													  
		e.preventDefault();
		thisLink=(this).href;   //get Link path
		if(thisLink=="javascript:%20void(0);" || thisLink=="javascript:void(0);" || this.href=="#"){}else{
				
			var owner="";
			var caste=this.className;  //undefined value
			var String_value_two="";
			var ancestry=$j(this).parents().map(function(){ 
				if(this.id.indexOf("cartItems3")!=-1)
				return this.id
				}).get().join(":"); //get click all id*/
           var surname=$j(this).text();
		   var current_link=$j(this).attr("href");   //get link
		   var current_id=$j(this).closest("div").attr("id"); //get Navigation id
           var current_class=$j(this).parents().get(0).className;
		   var parent_name="";
		  
		   var parent_name=$j(this).parents("ul:first").prev("h2").text().concat(':');
			
			if(current_id=="hdrSection1")
            {
			 String_value_two="Utility1";	
			}
			if(current_id=="hdrSection2")
			{
				String_value_two="Utility2";
			}
			if(current_class=="categoryWrapper")
			{
				String_value_two="Utility3";
			}
			if(current_class=="brand"){
				String_value_two="Utility3";
				var branlist=$j(this).parents().filter("ul").attr('class');
				if(branlist=="brandList"){
					var top_parent=$j(this).parents().filter("div:first").prevAll('div:first').children('h2').text();
					String_value_two="Utility3:"+top_parent;
			   }
		
			}
			
			if(caste=="cartButton"){
				String_value_two="Utility3";
				surname=surname.replace(/[0-9]/g,"");
			}
				 
			var h=	$j(this).parent()[0].tagName.toLowerCase(); 
			 if(h=="h2"){
				String_value_two="Utility3";
			}
			if(current_class=="family"){
				String_value_two="Utility3";
			}
			if(surname=="BabiesRUs"){
				surname="BRU Logo";
			}
			if(surname=="ToysRUs"){
				surname=":TRU Logo";
			}
			if(current_id=="hdrLogo"){
				String_value_two="Utility2";
				}
			
			if(surname.indexOf("Choose My Store")!=-1){
				String_value_two="Utility1";
				surname="Choose My Store";
			}
			
			if(surname.indexOf("Sign In")!=-1){
				String_value_two="Utility2";
				surname="Sign In";
			}
			
			if(surname.indexOf("Create an Account")!=-1){
				String_value_two="Utility2";
				surname="Create an Account";
			}
			
			if(surname.indexOf("My Account")!=-1){
				String_value_two="Utility2";
				surname="My Account";
			}
			
			if(surname.indexOf("My Orders")!=-1){
				String_value_two="Utility2";
				surname="My Orders";
			}
			
            if(surname.indexOf(surname)!=-1){
    			 var dropdownAddtl =$j(this).parents('div:eq(1)').attr('class');
             	 if(dropdownAddtl=="dropdownAddtl"){
					 String_value_two="Utility3";
			 		surname=surname;
			     }	  
			     if(dropdownAddtl=="dropdown"){
					 String_value_two="Utility3";
					surname=surname;	
			     }
           }	
		   if(current_class=="family newArrivals"){
			   String_value_two="Utility3";
			   }
			   
			 if(current_class=="family mostPopular"){
				 String_value_two="Utility3";
			}
			
			if(caste=="privacy"){
				String_value_two="Utility1";
			}
		   if(current_class=="family seeAll"){
				 String_value_two="Utility3";
		   }
    		if(thisLink.indexOf("?")!=-1){var Urlglue="&"}else{var Urlglue="?"}

		var logo=$j(NavHeader.SiteName).text();
		
		if(logo.indexOf("ToysRUs")!=-1)
		{
		var SiteName="TRU";
		}
		
	
		var Sprop="";
		if(window.s){
		   	if(window.s.prop1){
				Sprop+=s.prop1.split(":").pop();
			}
		}
		var string_value=SiteName+"_Header";
 	   if(typeof(surname)!="undefined"){
		   secondary_string+=":"+surname;
	   }
	   
	    var secondary_string;
	    var pattern = /[ ]+/g;
        secondary_string=string_value+":"+String_value_two+":"+parent_name.replace(pattern,"-")+surname+":"+Sprop;

	    secondary_string=(secondary_string.replace(/&/g,"n").replace(/\s+/g,"-").replace(/::/g,":").replace(/undefined/g,"").replace(/-:/g,":").replace(/:-/g,":").replace(/,/g,"").replace(/'/g,"").replace(/-n/g,"-n-").replace(/--/g,"-").replace(/::/g,":").replace(/[\n\r]/g,""));
			
		var thisLink=current_link+Urlglue+"ab="+encodeURI(secondary_string);
		window.location.href=thisLink;
				} //link else if end
		}); //click function end
	
	});//document funtion end 
})(jQuery);
