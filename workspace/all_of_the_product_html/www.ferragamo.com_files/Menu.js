//---------------------------------------------------------------
//------ CUSTOM utility to visualize menu item drop down
//------ autor Augelli Cristiana
//---------------------------------------------------------------
if(typeof(R_Menu) == "undefined" || R_Menu == null || !R_Menu){

	R_Menu = {
			
		timeout: 500,
		
		closeTimer: 0,
		
		ddMenuItem: 0,
		
		widgetId : "frg_menu",
		
		secLevelCss: "frg_second_lev_menu",
		
		thrLevelCss: "frg_third_lev_menu",
		
		getClass: null,
		
		isOut: true,
		
		onInit: function(){
			$jq('#' + this.widgetId + ' li a').bind('mouseover', R_Menu.onMouseOver);
			$jq('#' + this.widgetId + ' li span').bind('mouseover', R_Menu.onMouseOver);
			$jq('#' + this.widgetId + ' li').bind('mouseleave', R_Menu.onMouseLeave);
			
			R_Menu.initipad();
			
		},
		
		initipad:function(){
			
			var isAndroid = (/android|android 3.0/i.test(navigator.userAgent.toLowerCase()));
			
			if (isAndroid) {
							
				$jq('#frg_menu_mobile>li>a,ul.lvl2>li>a').each(function() {
					if ($jq(this).parent('li').children('ul').length > 0) {
						 var clicked = false;
					        $jq(this).bind('click', function() {
					            if(!clicked) return !(clicked = true);
					        });
					}
			    });	
			}
											
			if (isAndroid || navigator.platform.indexOf("iPad") != -1 ) {
				$jq('#frg_menu>li>a,ul.frg_second_lev_menu>li>a').each(function() {
					if ($jq(this).parent('li').children('ul').length > 0) {
						 
						var clicked = false;
					        $jq(this).bind('click', function() {
					            if(!clicked) return !(clicked = true);
					        });
					}
			    });	
			}
		},
		
		onClearTimer: function () {
		    if (R_Menu.timeout) {
		        window.clearTimeout(R_Menu.closeTimer);
		        R_Menu.closeTimer = null;
		        R_Menu.onClose();
		    }
		},
		
		onClose: function () { 
		    if (R_Menu.ddMenuItem) R_Menu.ddMenuItem.css('display', 'none'); 
		},
		
		onMouseOver: function () {
			R_Menu.isOut = false;
			
		    var submenu = $jq(this).next();
		    
			if (submenu.length > 0){
			    //caso 1 : 3 livello e visibile
				if (submenu.get(0).getAttribute('class').indexOf(R_Menu.thrLevelCss) > -1 && submenu.is(':visible')){
					//Nascondo tutti i menu di secondo e terzo livello
					//$jq('ul.' + R_Menu.secLevelCss).css('display', 'none');
					$jq('ul.' + R_Menu.thrLevelCss).css('display', 'none');
				}
				//caso 2 : 3 livello e nascosto
				if (submenu.get(0).getAttribute('class').indexOf(R_Menu.thrLevelCss) > -1 && !submenu.is(':visible')){
					//Nascondo tutti i menu di terzo livello
					$jq('ul.' + R_Menu.thrLevelCss).css('display', 'none');
					//Abilito il sottomenu specifico
					R_Menu.ddMenuItem = submenu.css('display', 'block');
				}
				//caso 3 : 2 livello e visibile
				if (submenu.get(0).getAttribute('class').indexOf(R_Menu.secLevelCss) > -1 && submenu.is(':visible')){
					//Nascondo tutti i menu di secondo e terzo livello
					$jq('ul.' + R_Menu.secLevelCss).css('display', 'none');
					$jq('ul.' + R_Menu.thrLevelCss).css('display', 'none');
				}
				//caso 4 : 2 livello e nascosto
				if (submenu.get(0).getAttribute('class').indexOf(R_Menu.secLevelCss) > -1 && !submenu.is(':visible')){
					//Nascondo tutti i menu di secondo e terzo livello
					$jq('ul.' + R_Menu.secLevelCss).css('display', 'none');
					$jq('ul.' + R_Menu.thrLevelCss).css('display', 'none');
					//Abilito il sottomenu specifico
					R_Menu.ddMenuItem = submenu.css('display', 'block');
				}
			} else {
				if (!($jq(this).attr('class')===undefined) && $jq(this).attr('class').indexOf("frg_top_cat_menu") > -1){
					$jq('ul.' + R_Menu.secLevelCss).css('display', 'none');
				} else if (!($jq(this).parent().parent().attr('class') === undefined) && $jq(this).parent().parent().attr('class').indexOf(R_Menu.secLevelCss) > -1){
					//Nascondo tutti i menu di terzo livello se sono su menu di secondo livello ma non esiste menu di terzo
					$jq('ul.' + R_Menu.thrLevelCss).css('display', 'none');
				} 
			}
		    return true;
		},
		
		onMouseLeave: function () {
			
			R_Menu.isOut = true;
			
			window.setTimeout('R_Menu.hideMenu()',2000);
			
		},
		
		onMouseOut: function (item){ 
			R_Menu.onClearTimer();
		},
		
		hideMenu: function(){
			
			if(R_Menu.isOut){
				//Nascondo tutti i menu di secondo e terzo livello
				$jq('ul.' + R_Menu.secLevelCss).css('display', 'none');
				$jq('ul.' + R_Menu.thrLevelCss).css('display', 'none');
				//Abilito il sottomenu specifico
				//R_Menu.ddMenuItem = submenu.css('display', 'block');
			}
		}
	}
}