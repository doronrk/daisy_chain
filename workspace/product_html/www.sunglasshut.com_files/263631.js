$(function() {
	
if (!jQuery('#search-form.page .messaging').is(':visible') ) {


var $searchModal =  jQuery('#search-form'),
	$input =  jQuery('#SimpleSearchForm_SearchTerm'),
	$rightNavSearch = jQuery( '#right-nav li.search' ),
	$collapNav = jQuery( '#main-navigation-container #collapsed-navigation ' ),
	$searchForm = jQuery('#search-form');

	$searchModal.appendTo('#main-navigation #header_logo');
	jQuery( '#WC_CachedHeaderDisplay_button_1' ).html( '<i></i>' );
	if(!jQuery('i.menu-search').length > 0)
		$collapNav.append( '<i class="menu-search"></i>' );
	}else{
		console.log("search icon is there");
	}
	$input.attr('placeholder', 'SEARCH').blur();

		
			
		$searchForm.addClass( 'showSearch' );
		$rightNavSearch.addClass( "nav-top" );
		jQuery(window).scroll(function(){ 
				var windowTop = $(window).scrollTop(); 
                		jQuery('#right-nav').css('top',windowTop+50);  
				if(windowTop >= 1) {
					$rightNavSearch.removeClass( 'nav-top' );					
				} 
				else {
					$rightNavSearch.addClass( 'nav-top' );
				}	
			});
			
		
		jQuery('#main-navigation-container #collapsed-navigation i.menu-search').on('click touchstart', function(){
			jQuery('#main-navigation-container').addClass('open');
			$input.focus();
			jQuery('#autoSuggest_Result_div').show();
			return false;
		});
		var $searchNoResult = jQuery('#search-form.showSearch #search-form-wrapper #no-results');
			jQuery('#search-form.showSearch #search-form-wrapper #no-results  >.row:first').append('<a class="close redesignIcons-close-black" href="#" >close</a>');
		
		jQuery('#no-results  .close, #main-navigation-container .do-close').on('click touchend', function(e){
			$input.val('').blur();
			jQuery('#search-form.showSearch #autoSuggest_Container #autoSuggest_Result_div').hide();
			$searchNoResult.removeClass('on-focus');
			$searchNoResult.addClass('off-focus');
			return false;
		});
  
  		jQuery('#right-nav li.search a:not(.active), #right-nav li.account a:not(.active), #right-nav li.favorites a:not(.active)' ).click(function(){
			jQuery('html, body').animate({scrollTop : 0},800);
			console.log("go to top");
			return false;
		});
		
		$input.focus(function() {
			$input.val('');	
	 		$searchNoResult.addClass('on-focus');
			$searchNoResult.removeClass('off-focus'); 
			return false;
		}).blur(function() {
			jQuery(this).delay(300).queue(function() {
				$searchNoResult.removeClass('on-focus');
				$searchNoResult.addClass('off-focus');
			});
		});
		
		if (jQuery.browser.msie ) {
             jQuery("[placeholder]").focus(function () {
                 if (jQuery(this).val() == jQuery(this).attr("placeholder")) jQuery(this).val("");
             }).blur(function () {
                 if (jQuery(this).val() == "") jQuery(this).val(jQuery(this).attr("placeholder"));
             }).blur();

             jQuery("[placeholder]").parents("form").submit(function () {
                 jQuery(this).find('[placeholder]').each(function() {
                     if (jQuery(this).val() == jQuery(this).attr("placeholder")) {
                         jQuery(this).val("");
                     }
                 });
             });
         }	
});