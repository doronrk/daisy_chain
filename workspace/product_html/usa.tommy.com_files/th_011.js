var THSwatch = THSwatch ||
{
	construct:function()
	{
		THSwatch.$element=$(THSwatch.SELECTOR);
	},
	
	init:function()
	{
		
	},
	
	finalize:function()
	{
		THSwatch.$element.find('img').colorSwatchImage();
	},
	
	SELECTOR:'.productswatches li',
    ACTIVE_CLASS:'active',
    ACTIVE_SELECTOR:'.active',
    $element:null
};
