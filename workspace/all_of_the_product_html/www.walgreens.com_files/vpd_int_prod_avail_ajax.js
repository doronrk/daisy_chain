function changePriceAndAddToCart(g,d,h,i,c,b,a,f){var e=$("#colorId").val();if(c=="Ship"){selRadId="#seesameday"}else{if(c=="WP"){selRadId="#seesameday1"}else{selRadId="#seesameday2"}}$.ajax({type:"POST",url:"/store/store/product/includes/vpd_int_prd_price_inv_fg.jsp",data:{ajaxCall:"true",skuid:g,productid:d,storeNumber:h,view:i,fulfill:c,displayEndState:b,color:a,size:f},success:function(j){var j=$(j);$("#vpd_new_g_bogomsgdiv").html(j.find("#vpd_new_g_bogomsgdiv").html());$("#ajaxCartHldr").html(j.find("#ajaxCartHldr").html());if(document.getElementById("scriptEnabled")!=null){document.getElementById("scriptEnabled").style.display="inline"}if(document.getElementById("script_enabled9")!=null){document.getElementById("script_enabled9").style.display="inline"}if(document.getElementById("script_enabled2")!=null){document.getElementById("script_enabled2").style.display="inline"}if(document.getElementById("script_enabled3")!=null){document.getElementById("script_enabled3").style.display="inline"}if(document.getElementById("script_enabled4")!=null){document.getElementById("script_enabled4").style.display="inline"}if(document.getElementById("script_enabled5")!=null){document.getElementById("script_enabled5").style.display="inline"}if(document.getElementById("script_enabled6")!=null){document.getElementById("script_enabled6").style.display="inline"}if(document.getElementById("script_enabled7")!=null){document.getElementById("script_enabled7").style.display="inline"}if(document.getElementById("script_enabled8")!=null){document.getElementById("script_enabled8").style.display="inline"}if(($("#rebate0Vpd").length=="")&&($("#offerMsgrHldr").html()==null)&&(typeof($("#vpd_special_offer_bogo_removal img").attr("src"))=="undefined")){$("#vpdOfrTxtHldr").hide()}else{$("#vpdOfrTxtHldr").show()}$("#colorId").val(e);$(".lftPar").removeClass("pickup_active onlinepickup").addClass("pickup_inactive");$(selRadId).parents(".lftPar").addClass("pickup_active onlinepickup");shopListHref=$("#save-to-shopping-list-button").attr("href")+"&overlay=true";$("#save-to-shopping-list-button").attr("href",shopListHref);$(".mbOverlay, .mb").wOverlay()},error:function(l,k,j){$("#ajax_enabled").html("Sorry! Your Selection did not return the results")}});if(c=="Ship"){document.getElementById("reOrder").checked=false;document.getElementById("reOrderSelected").value="No";document.getElementById("seesameday1").checked=false}else{if(c=="WP"){document.getElementById("reOrder").checked=false;document.getElementById("ship").checked=false}else{document.getElementById("reOrderSelected").value="Yes";document.getElementById("ship").checked=false;document.getElementById("seesameday1").checked=false}}}$(window).load(function(){if(document.getElementById("reOrderSelected")!=null){document.getElementById("reOrderSelected").value="No"}});function uncheckTheOtherRadioButton(a){if(a=="ship"){if(document.getElementById("reOrder")!=null){document.getElementById("reOrder").checked=false}if(document.getElementById("reOrderSelected")!=null){document.getElementById("reOrderSelected").value="No"}}else{if(document.getElementById("reOrderSelected")!=null){document.getElementById("reOrderSelected").value="Yes"}if(document.getElementById("ship")!=null){document.getElementById("ship").checked=false}}}function onSelectionOfRequency(){if(document.getElementById("reOrder")!=null&&document.getElementById("reOrder").checked==true){document.getElementById("reOrderSelected").value="Yes"}};