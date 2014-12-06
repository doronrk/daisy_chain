$(function() {
	var checkToolTip = jQuery('#pdp_Colors .tooltip').length,
		$pdpColor = jQuery('#pdp_Colors'),
		$productOptions = jQuery('.product_options');
	
	if( checkToolTip > 17){
		$pdpColor.addClass('collapse-color-seventeen');
		$productOptions.addClass('product-color-seventeen');
	 	sgh_pdpResp_init();
	}else if( checkToolTip > 5){
		$pdpColor.addClass('collapse-color-five');
		$productOptions.addClass('product-color-five');
	 	sgh_pdpResp_init();
	}
});

function sgh_pdpResp_init()
{
	var $pdpColor = jQuery('#pdp_Colors'),
		$sgh_copyColors = jQuery('#pdp_Colors > p.colorText:first');
			
	$pdpColor.after( '<div  id="pdp_Colors_Collapse"><p class="colorText color-all-text">View All Colors <i class="expand"></i></p></div>' );
	
	$sgh_copyColors.clone().prependTo( '#pdp_Colors_Collapse' );
	$pdpColor.prepend('<p class="show-small">All Colors</p><span class="icon redesignIcons-close-black do-close"></span>');
	jQuery('#pdp_Colors > p.colorText').addClass('show-large');
	sgh_pdpResp_findActive();	

}

function sgh_pdpResp_findActive()
{
	var $sgh_activeSwatch = jQuery('.tooltip').find('.frame-lens-combo.active');
	$sgh_activeSwatch.clone().prependTo( '#pdp_Colors_Collapse p.color-all-text' );
	jQuery( "#pdp_Colors_Collapse p.colorText, #pdp_Colors .redesignIcons-close-black" ).click(function() {
		sgh_pdpResp_expandColor()
	});
	
}

function sgh_pdpResp_expandColor()
{
		jQuery( '#pdp_Colors_Collapse p.colorText' ).toggleClass( "color-expand" );
		jQuery( '#pdp .product_options #pdp_Colors' ).toggleClass( "color-expand" );
	
}

