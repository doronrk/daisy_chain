//-----------------------------------------------------------------
// Javascript library for link header and minicart- miniwishlist
// 
// @autor Augelli Cristiana
//
//-----------------------------------------------------------------
/*
 * Funzione che permette di settare su un unica linea i link relativi a
 * MyShop Wishlist e ShoppingBag
 * caugelli Posizionamento dimanico link header Myshop
	per calcolare il posizionamento in modo dinamico 
	dei link relativi alla sezione di MyShop 
	faccio la seguente procedura:
		posizione #cartOpen: da style css
		posizione #widget_miniwishlist: 
			( X = $(window).width() - $(#widget_miniwishlist).offset().left() 
			  Y = $(#widget_miniwishlist).outerWidth(true) + $(#cartOpen).outerWidth(true) 
			  Set margin-right = X - Y)
		posizione #MyAccountLink: 
			Z =$(#widget_miniwishlist).outerWidth(true) - $(#wishlistOpen).outerWidth(true) - $(#wishlistOpen).innerWidth() -20;	
			Set margin-left = Z
			  
		Nota: outerWidth prende la larghezza dell'elemento comprensivo di margine e padding se passo il parametro a true
			innerWidth prende la larghezza interna dell'elemento, solo quella effettivamente occupata senza margini e padding
 */
function setlinkMyShop(){
	
	if ($jq('#widget_miniwishlist') != undefined && $jq("#widget_miniwishlist").length > 0) {
		
		var x = $jq(window).width() - $jq('#widget_miniwishlist').offset().left;
		var y = $jq('#widget_miniwishlist').outerWidth(true) + $jq('#cartOpen').outerWidth(true);
		var margin = x - y;
		$jq("#wishlistOpen").css("float", "right");
		//Nel caso in cui il margine risultante sia minore di zero
		//allora vado a settare la width del link relativo al carrello che è quella corretta
		if (margin <0 ) {
			margin = $jq('#cartOpen').outerWidth(true) + 10;
			$jq("#wishlistOpen").css("margin-right", margin + "px");
		}
		else $jq("#wishlistOpen").css("margin-right", margin + "px");
	
	 
		if ($jq("#MyAccountLink") != undefined && $jq("#MyAccountLink").length > 0) {
			//Il margine del link relativo a MyShop sarà valorizzato come : larghezza widget relativo alla wishlist - largezza link wishlist (compreso di margini) - larghezza interna al link della wishlist (senza margini) 
			margin = $jq('#widget_miniwishlist').outerWidth(true) - $jq("#wishlistOpen").outerWidth(true) - $jq("#wishlistOpen").innerWidth() -20;
			$jq("#MyAccountLink").css("margin-left", margin + "px");
		}
	}
}
