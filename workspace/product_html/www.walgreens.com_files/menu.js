$(document).ready(function(){$(".navigation").setup_navigation();$(".sf-menu-ya").setup_navigation();$("ul#products li.pharmacy_ab").css({"z-index":"50"});$("ul#products li.pharmacy_ab span a").css("height","39px");$("ul#products li.pharmacy_ab ul").css({top:"44px","z-index":"-1"});$("ul#products li.photo_ab").css({"z-index":"50"});$("ul#products li.photo_ab span a").css("height","39px");$("ul#products li.photo_ab ul").css({top:"44px","z-index":"-1"});var d="";var c;$("ul#products li span a").live("touchstart",function(f){var g=$(this).html();if(g==d&&c==true){return true}else{f.preventDefault();$(this).css("outline","0");$(this).trigger("focus");c=true;d=g}});var b="";var a;$("#cssmenu ul li span a").live("touchstart",function(f){var g=$(this).html();if(g==b&&a==true){return true}else{f.preventDefault();$(this).css("outline","0");$(this).trigger("focus");a=true;b=g}});$("#yourAccountMenu").children().children().find("ul").find("li").find("a").bind("touchstart",function(){location.href=$(this).attr("href")})});var keyCodeMap={48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};$.fn.setup_navigation=function(b){b=jQuery.extend({menuHoverClass:"show-menu"},b);$("ul#products li.pharmacy_ab a").focus(function(){$("ul#products li.photo_ab").css({"z-index":"1"})});$("ul#products li.photo_ab a").focus(function(){$("ul#products li.photo_ab").css({"z-index":"50"})});$("ul#products li.pharmacy_ab a").hover(function(){$("ul#products li.photo_ab").css({"z-index":"1"})});$("ul#products li.photo_ab a").hover(function(){$("ul#products li.photo_ab").css({"z-index":"50"})});$("li.balanceRewards span div#loyaltyMenuDisable a").focus(function(){if(!$("li.balanceRewards span div#loyaltyMenuDisable").hasClass("hide")){$("li.balanceRewards").addClass("balanceRewardsMenuDisabled")}});$("li.balanceRewards span div#loyaltyMenuEnable a").focus(function(){$("li.balanceRewards").addClass("balanceRewardsEnableShowMenu")});$("li.balanceRewards span a.menuDisabled").focus(function(){if(!$("li.balanceRewards span a").hasClass("menuDisabled")){$("li.balanceRewards").addClass("balanceRewardsMenuDisabled")}});$("li.balanceRewards span a.menuGrayed").focus(function(){$("li.balanceRewards").addClass("balanceRewardsMenuDisabled")});$("li.balanceRewards span div#loyaltyMenuEnable a").blur(function(){$("li.balanceRewards").removeClass("balanceRewardsEnableShowMenu")});$("li.balanceRewards span div#loyaltyMenuDisable a").blur(function(){$("li.balanceRewards").removeClass("balanceRewardsMenuDisabled")});$("li.balanceRewards span a.menuDisabled").blur(function(){$("li.balanceRewards").removeClass("balanceRewardsMenuDisabled")});$("li.balanceRewards span a.menuGrayed").blur(function(){$("li.balanceRewards").removeClass("balanceRewardsMenuDisabled")});if($.browser.msie){$("ul#products li.pharmacy_ab a").focus(function(){$("ul#products li.photo_ab").css({"z-index":"1"})});$("ul#products li.photo_ab a").focus(function(){$("ul#products li.photo_ab span a").css({filter:"progid:DXImageTransform.Microsoft.gradient(enabled=false)","background-color":"#FD7720","background-image":"none"});$("ul#products li.photo_ab").css({"z-index":"50"})});$("ul#products li.photo_ab a").blur(function(){$("ul#products li.photo_ab span a").css({filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr='#FD7720',endColorstr='#E4681A',GradientType=0)",background:"-moz-linear-gradient(center top , #FD7720, #FD7720 25%, #E4681A) no-repeat scroll 0 0 #FD7720"})});$("ul#products li.pharmacy_ab").focus(function(){$("ul#products li.photo_ab").css({"z-index":"1"})});$("ul#products li.pharmacy_ab a").blur(function(){$("ul#products li.photo_ab").css({"z-index":"50"});$("ul#products li.photo_ab span a").css("height","39px");$("ul#products li.photo_ab ul").css({top:"44px","z-index":"-1"})});$("ul#products li.pharmacy_ab a").hover(function(){$("ul#products li.pharmacy_ab span a").css("height","39px");$("ul#products li.pharmacy_ab ul").css({top:"44px","z-index":"-1"})});$("ul#products li.photo_ab a").hover(function(){$("ul#products li.photo_ab span a").css("height","39px");$("ul#products li.photo_ab ul").css({top:"44px","z-index":"-1"})})}var d=false;if($(this).attr("role","menubar").find("li").hasClass("menu_top")){$(this).attr("role","menubar").find(".menu_top").attr("role","menu");$(this).attr("role","menubar").find(".menu_top").find("span").next().find("li").attr("role","menuitem")}var c=$(this).find("> li.menu_top  > span");$(c).next("ul").attr("data-test","true").attr({"aria-hidden":"true",role:"menu"}).find("a").attr("tabIndex",-1);$(this).parent("li").removeClass("showSublist");$(c).each(function(){if($(this).next("ul").length>0){$(this).parent("li").attr("aria-haspopup","true")}});$(c).hover(function(){$(this).closest("ul").find("li").removeClass("showSublist");$(this).closest("ul").find("li").find("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1");$(this).parent("li").addClass("showMouseSublist").removeClass("hideSublist")});$(c).mouseout(function(){$(this).parent("li").removeClass("showMouseSublist")});$(c).find("a").bind("focus",function(f){if($(this).closest("ul").find("li").hasClass("showMouseSublist")){$(this).closest("ul").find("li").removeClass("showSublist").addClass("hideSublist");$(this).closest("ul").find("li").find("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1")}if($(this).closest("ul").find("li").hasClass("showSublist")){$(this).closest("ul").find("li").removeClass("showSublist").addClass("hideSublist");$(this).closest("ul").find("li").find("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1")}$(this).closest("ul").find("."+b.menuHoverClass).attr("aria-hidden","true").removeClass(b.menuHoverClass).find("a").attr("tabIndex",-1);$(this).parent("li").removeClass("showSublist").addClass("hideSublist");if(!d){$(this).parent().next("ul").addClass("show-menu").attr("aria-hidden","false").children().children("a").attr("tabindex","0");$(this).parent().parent("li").addClass("showSublist").removeClass("hideSublist")}});$("ul#products li ul").live("mouseleave",function(e){$(this).removeClass("showSublist").addClass("hideSublist");$(this).removeClass("showMouseSublist").addClass("hideSublist");$(this).removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1");$("ul#products li.menu_top ul li a").removeClass("mouseSelected")});$(c).keydown(function(f){if(f.keyCode==9&&f.shiftKey){$("."+b.menuHoverClass).attr("aria-hidden","true").removeClass(b.menuHoverClass).find("a").attr("tabIndex",-1);$("li.balanceRewards").removeClass("balanceRewardsEnableShowMenu");$("li.balanceRewards").removeClass("balanceRewardsMenuDisabled");$(this).parent("li").removeClass("showSublist");if($(this).parent("li").prev("li.balanceRewards").find("span").find("div#loyaltyMenuEnable").hasClass("hide")){$(this).parent("li").prev("li").addClass("balanceRewardsMenuDisabled")}else{if($(this).parent("li").prev("li.balanceRewards").find("span").find("div#loyaltyMenuDisable").hasClass("hide")){$(this).parent("li").prev("li").addClass("balanceRewardsEnableShowMenu")}}}if(f.keyCode==9){d=false;$("li.balanceRewards").removeClass("balanceRewardsEnableShowMenu");$("li.balanceRewards").removeClass("balanceRewardsMenuDisabled");$(this).find("a").focus();$(this).parent("li").addClass("showSublist").removeClass("hideSublist")}if(f.keyCode==37){d=false;f.preventDefault();$("li.balanceRewards").removeClass("balanceRewardsEnableShowMenu");$("li.balanceRewards").removeClass("balanceRewardsMenuDisabled");if($(this).parent("li").prev("li").length==0){if($(this).parent("li.accountMenu")){$(this).parent("li.accountMenu").find("span a").focus()}else{$(this).parents("ul").find("> li").last().find("a").first().focus()}$(this).parent("li").addClass("showSublist").removeClass("hideSublist")}else{if($(this).parent("li").prev("li").find("span").find("div#loyaltyMenuEnable").hasClass("hide")){$(this).parent("li").prev("li").find("span").find("div#loyaltyMenuDisable a").focus();$(this).parent("li").prev("li").removeClass("hideSublist").addClass("showSublist")}else{if($(this).parent("li").prev("li").find("span").find("div#loyaltyMenuDisable").hasClass("hide")){$(this).parent("li").prev("li").find("span").find("div#loyaltyMenuEnable a").focus();$(this).parent("li").prev("li").removeClass("hideSublist").addClass("showSublist")}else{$(this).parent("li").next("li").prev().find("span").next("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1");$(this).parent("li").removeClass("showSublist");$(this).parent("li").prev("li").find("a").first().focus()}}}}else{if(f.keyCode==38){f.preventDefault();if($(this).parent("li").find("ul").length>0){$(this).parent("li").find("ul").attr("aria-hidden","true").removeClass("show-menu").find(" a").attr("tabIndex",-1)}}else{if(f.keyCode==39){d=false;f.preventDefault();$("li.balanceRewards").removeClass("balanceRewardsEnableShowMenu");$("li.balanceRewards").removeClass("balanceRewardsMenuDisabled");if($(this).parent("li").next("li").length==0){if($(this).parent("li.last")){$(this).parent("li").addClass("showSublist").removeClass("hideSublist");$(this).parent("li.last").find("span a").focus()}else{$(this).parents("ul").find("> li").first().find(" a").first().focus();$(this).parent("li").addClass("showSublist").removeClass("hideSublist")}}else{if($(this).parent("li").next("li").next().length==0){if($(this).parent("li").next("li.last")){$(this).parent("li").next("li").prev().find("span").next("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1");$(this).parent("li").removeClass("hideSublist").addClass("showSublist");$(this).parent("li").next("li").find(" a").first().focus()}else{$(this).parent("li").addClass("showSublist").removeClass("hideSublist")}}else{if($(this).parent("li").next("li").find("span").find("div#loyaltyMenuEnable").hasClass("hide")){$(this).parent("li").next("li").find("span").find("div#loyaltyMenuDisable a").focus();$(this).parent("li").next("li").removeClass("hideSublist").addClass("showSublist")}else{if($(this).parent("li").next("li").find("span").find("div#loyaltyMenuDisable").hasClass("hide")){$(this).parent("li").next("li").find("span").find("div#loyaltyMenuEnable a").focus();$(this).parent("li").next("li").removeClass("hideSublist").addClass("showSublist")}else{$(this).parent("li").next("li").prev().find("span").next("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1");$(this).parent("li").removeClass("showSublist").addClass("hideSublist");$(this).parent("li").next("li").find(" a").first().focus()}}}}}else{if(f.keyCode==40){f.preventDefault();$(this).parent("li").addClass("showSublist").removeClass("hideSublist");if($(this).parent("li").find("ul").length>0){$(this).parent("li").find("ul").attr("aria-hidden","false").addClass(b.menuHoverClass).find(" a").attr("tabIndex",0).first().focus()}}else{if(f.keyCode==27){f.preventDefault();$("."+b.menuHoverClass).attr("aria-hidden","true").removeClass(b.menuHoverClass).find(" a").attr("tabIndex",-1);$(this).parent("li").removeClass("showSublist").addClass("hideSublist")}else{$(this).parent("li").find("ul[aria-hidden=false] span a").each(function(){if($(this).text().substring(0,1).toLowerCase()==keyCodeMap[f.keyCode]){$(this).focus();return false}})}}}}}});var a=$(c).parent("li").find("ul").find(" a");$(a).keydown(function(f){$(this).parents("ul").parents("li").find("a.mouseSelected").last().blur(function(){if(f.keyCode==9){$(this).parent("ul").parents("li").find(" a").first().focus()}});if(f.keyCode==38){f.preventDefault();if($(this).parent("li").prev("li").length==0){$(this).parents("ul").parents("li").find(" a").first().focus();d=true;$(this).parents("ul").parents("li").removeClass("showSublist").addClass("hideSublist");$(this).parents("ul").parents("li").removeClass("showMouseSublist");$(this).parents("ul").parents("li").next("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1")}else{$(this).parent("li").prev("li").find("a").first().focus()}}$(this).parents("ul").parents("li").find("span>a").first().blur(function(){d=false});if(f.keyCode==37){f.preventDefault();if($(this).parents("ul").parent("li").prev("li").find("span").find("div#loyaltyMenuEnable").hasClass("hide")){$(this).parents("ul").parents("li").removeClass("showSublist").addClass("hideSublist");$(this).parents("ul").parent("li").prev("li").find("span").find("div#loyaltyMenuDisable a").focus();$(this).parents("ul").parent("li").prev("li").removeClass("hideSublist").addClass("showSublist")}else{if($(this).parents("ul").parent("li").prev("li").find("span").find("div#loyaltyMenuDisable").hasClass("hide")){$(this).parents("ul").parents("li").removeClass("showSublist").addClass("hideSublist");$(this).parents("ul").parent("li").prev("li").find("span").find("div#loyaltyMenuEnable a").focus();$(this).parents("ul").parent("li").prev("li").removeClass("hideSublist").addClass("showSublist")}else{if($(this).parents("ul").parent("li").prev("li").next().length==0){$(this).parents("li").prev("li").find("ul").addClass("show-menu").attr("aria-hidden","false").children().children("a").attr("tabindex","0");$(this).parents("li").prev("li").addClass("showSublist").removeClass("hideSublist").find("span").find("a").focus()}else{$(this).parents("ul").parents("li").removeClass("showSublist").addClass("hideSublist");$(this).parents("ul").parents("li").find("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1");$(this).parents("li").prev("li").find("ul").addClass("show-menu").attr("aria-hidden","false").children().children("a").attr("tabindex","0");$(this).parents("li").prev("li").addClass("showSublist").removeClass("hideSublist").find("span").find("a").focus()}}}}if(f.keyCode==39){f.preventDefault();if($(this).parents("ul").parent("li").next("li").find("span").find("div#loyaltyMenuEnable").hasClass("hide")){$(this).parents("ul").parents("li").removeClass("showSublist").addClass("hideSublist");$(this).parents("ul").parent("li").next("li").find("span").find("div#loyaltyMenuDisable a").focus();$(this).parents("ul").parent("li").next("li").removeClass("hideSublist").addClass("showSublist")}else{if($(this).parents("ul").parent("li").next("li").find("span").find("div#loyaltyMenuDisable").hasClass("hide")){$(this).parents("ul").parents("li").removeClass("showSublist").addClass("hideSublist");$(this).parents("ul").parent("li").next("li").find("span").find("div#loyaltyMenuEnable a").focus();$(this).parents("ul").parent("li").next("li").removeClass("hideSublist").addClass("showSublist")}else{if($(this).parents("ul").parent("li").next("li").next().length==0){$(this).parents("li").next("li").find("ul").addClass("show-menu").attr("aria-hidden","false").children().children("a").attr("tabindex","0");$(this).parents("li").next("li").addClass("showSublist").removeClass("hideSublist").find("span").find("a").focus()}else{$(this).parents("ul").parents("li").removeClass("showSublist").addClass("hideSublist");$(this).parents("ul").parents("li").find("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1");$(this).parents("li").next("li").find("ul").addClass("show-menu").attr("aria-hidden","false").children().children("a").attr("tabindex","0");$(this).parents("li").next("li").addClass("showSublist").removeClass("hideSublist").find("span").find("a").focus()}}}}else{if(f.keyCode==40){f.preventDefault();if($(this).parent("li").next("li").length==0){$(this).parents("ul").find("a").first().focus()}else{$(this).parent("li").next("li").find("a").first().focus()}}else{if(f.keyCode==27){f.preventDefault();$(this).parents("ul").parents("li").find(" a").first().focus();$(this).parents("ul").parent("li").removeClass("showSublist").addClass("hideSublist");$(this).parents("ul").parents("li").find("ul").removeClass("show-menu").attr("aria-hidden","true").children().children("a").attr("tabindex","-1")}else{if(f.keyCode==32){f.preventDefault();window.location=$(this).attr("href")}else{var g=false;$(this).parent("li").nextAll("li").find("a").each(function(){if($(this).text().substring(0,1).toLowerCase()==keyCodeMap[f.keyCode]){$(this).focus();g=true;return false}});if(!g){$(this).parent("li").prevAll("li").find("a").each(function(){if($(this).text().substring(0,1).toLowerCase()==keyCodeMap[f.keyCode]){$(this).focus();return false}})}}}}}});$(this).parents("ul").parents("li").find("ul").focusout(function(f){$("."+b.menuHoverClass).attr("aria-hidden","true").removeClass(b.menuHoverClass).find("a").attr("tabIndex",-1)});$(this).find("a").last().keydown(function(f){if(f.keyCode==9){$("."+b.menuHoverClass).attr("aria-hidden","true").removeClass(b.menuHoverClass).find("a").attr("tabIndex",-1)}});$("ul#products").find("a").last().keydown(function(f){if(f.keyCode==9&&f.shiftKey){if($(this).parents("ul").parent("li").find("span").find("a").focus()){$(this).parent("li").find("a").first().focus()}}else{if(f.keyCode==9){if($("ul#products").children("li").hasClass("showSublist")){$("ul#products").children("li").removeClass("showSublist").addClass("hideSublist");$("."+b.menuHoverClass).attr("aria-hidden","true").removeClass(b.menuHoverClass).find("a").attr("tabIndex",-1)}}}});$("ul#products").find("li.more a").last().keydown(function(f){if(f.keyCode==9&&f.shiftKey){if($(this).parents("ul").parent("li").find("span").find("a").focus()){$(this).parent("li").find("a").first().focus()}}else{if(f.keyCode==9){if($("ul#products").children("li").hasClass("showSublist")){$("ul#products").children("li").removeClass("showSublist").addClass("hideSublist")}}}});$("ul.sf-menu-ya").find("a").last().keydown(function(f){if(f.keyCode==9&&f.shiftKey){if($(this).parents("ul").parent("li").find("span").find("a").focus()){$(this).parent("li").find("a").first().focus()}}else{if(f.keyCode==9){if($("ul.sf-menu-ya").children("li").hasClass("showSublist")){$("ul.sf-menu-ya").children("li").removeClass("showSublist").addClass("hideSublist");$("."+b.menuHoverClass).attr("aria-hidden","true").removeClass(b.menuHoverClass).find("a").attr("tabIndex",-1)}}}});$(document).click(function(){if($("ul#products").children("li").hasClass("showSublist")){$("ul#products").children("li").removeClass("showSublist").addClass("hideSublist");$("."+b.menuHoverClass).attr("aria-hidden","true").removeClass(b.menuHoverClass).find("a").attr("tabIndex",-1)}else{if($("ul.sf-menu-ya").children("li").hasClass("showSublist")){$("ul.sf-menu-ya").children("li").removeClass("showSublist").addClass("hideSublist");$("."+b.menuHoverClass).attr("aria-hidden","true").removeClass(b.menuHoverClass).find("a").attr("tabIndex",-1)}}})};