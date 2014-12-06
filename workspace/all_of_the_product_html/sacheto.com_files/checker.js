jQuery(document).ready(function()
{
	var $price=parseFloat(jQuery("span.PricepriceBeforeTax").text().replace("$", "").replace(",", ""));
	if(isNaN($price)) $price=parseFloat(jQuery("span.PricesalesPrice").text().replace("$", "").replace(",", ""));
	var $selId=jQuery("div.product-fields input:checked").attr("id");
	var $selection=jQuery("label[for="+$selId+"]").text().trim();
	if(jQuery("label[for="+$selId+"]").attr("oldText") !== undefined) $selection=jQuery("label[for="+$selId+"]").attr("oldText").trim();
	
	var $sku=jQuery("#product_sku").text();
	var $stock=jQuery("#gkMainbody .addtocart-button").length;
	if($sku.length > 3 && jQuery("#doNotCheck").length == 0 && document.location.href.indexOf("pricematch") == -1)
	{
		checkProduct($sku, $price, $selection, $stock);
	}

	
})

function refreshProduct($id)
{
	var $myId=jQuery("[name='virtuemart_product_id[]']").val();
	//alert("Sorry, but product's data has changed, press 'OK' to refresh it");
	var $rand=Math.floor(Math.random()*1000);
	
	if($myId == $id) window.location.reload()
	else window.location.href='/index.php?option=com_virtuemart&view=productdetails&virtuemart_product_id='+$id+'&c='+$rand;
}

function checkProduct($sku, $price, $selection, $stock)
{
	$host=window.location.hostname.replace(".com", "");
	jQuery.get("/custom/crawler/web_crawl.php?prodSku="+$sku+"&check=true&config="+$host, function($data)
	{
		$data=JSON.parse($data);
		//if we encountered an error - make it out of stock
		if(typeof $data.err === "string")
		{
			$href=document.location.href.replace(location.hash, "")+"#historyChart"
			jQuery("<a href='"+$href+"' style='font-weight:bold'>Out Of Stock - Add Alert</a>").insertAfter("#gkMainbody .addtocart-button input");
			
			jQuery("#gkMainbody .addtocart-button input").hide();
			
			ga('send', 'event', 'Product', 'Updated',  "Error");
			
			console.log("starting to update");
			updateProduct($sku, "");
		}
		else if(typeof $data.csv === "string")
		{
			$data.csv=unescape($data.csv);
			$data.price=parseFloat($data.price);
		
			console.log("Checked "+$data.id);
			console.log($data);
		
			console.log($data.price-10);
			console.log($price);
			
			console.log($stock);
			if($stock > 0) $stock=true;
			else $stock=false;
			
			
			if($data.stockCount > 0) $data.stockCount=true;
			else $data.stockCount=false;
			
			if(!$data.variations) $data.variations='';
			
			//if old and new products both out of stock, 
			//then don't touch them
			if($data.stockCount === false && $stock === false)
			{
				console.log("Both stocks are false");
				return;
			}
			
			if($data.price - 15 > $price)
			{
				var $pd=($data.price - $price);
				var $reason=$sku + " > Price Inc.:"+$pd;
				console.log($reason);
				
				ga('send', 'event', 'Product', 'Updated',  $reason);
				
				console.log("starting to update");
				updateProduct($sku, $data.csv);
			} 
			else if($price - 30 > $data.price)
			{
				var $pd=($data.price - $price);
				var $reason=$sku + " > Price Dec.:"+$pd;
				console.log($reason);
				
				ga('send', 'event', 'Product', 'Updated',  $reason);
				
				console.log("starting to update");
				updateProduct($sku, $data.csv);
				
			}
			else if($data.variations.indexOf($selection) == -1)
			{
				var $reason=$sku + " > Sel. not found: "+$selection + " in: " + $data.variations;
				console.log($reason);
				
				ga('send', 'event', 'Product', 'Updated',  $reason);
				
				console.log("starting to update");
				updateProduct($sku, $data.csv);
				
			}
			else if($selection.length == 0 && $data.variations.length > 0)
			{
				var $reason=$sku + " > Sel is empty, data var is not: " + $data.variations;
				console.log($reason);
				
				ga('send', 'event', 'Product', 'Updated',  $reason);
				
				console.log("starting to update");
				updateProduct($sku, $data.csv);
			}
			else if($data.stockCount !== $stock )
			{
				var $reason=$sku + " > Stock has changed from: " + $stock + " to " + $data.stockCount;
				console.log($reason);
				
				ga('send', 'event', 'Product', 'Updated',  $reason);
				
				console.log("starting to update");
				updateProduct($sku, $data.csv);
			}
			else
			{
				//get a trigger on selection
				jQuery("div.product-fields input").click(function()
				{
					var $selId=jQuery("div.product-fields input:checked").attr("id");
					var $selection=jQuery("label[for="+$selId+"]").text().trim();
					if(jQuery("label[for="+$selId+"]").attr("oldText") !== undefined) $selection=jQuery("label[for="+$selId+"]").attr("oldText").trim();
					console.log($selection);
					console.log($data.variations);
					if($data.variations.indexOf($selection) == -1 )
					{
						var $reason=$sku + " > Sel. on click not found: "+$selection + " in: " + $data.variations;
						
						console.log($reason);

						ga('send', 'event', 'Product', 'Updated',  $reason);

						console.log("starting to update");
						updateProduct($sku, $data.csv);
					}
				})
			}
		}
		
	});
}

function updateProduct($sku, $csv)
{
	$host=window.location.hostname.replace(".com", "");
	jQuery.get("/custom/crawler/web_crawl.php?prodSku="+$sku+"&update=true&csv="+$csv+"&config="+$host, function($data)
	{
		$data=JSON.parse($data);
		if(typeof $data.csv === "string")
		{
			console.log("Updated "+$data.id);
			console.log($data);
			if($data.id > 0)
			{
				refreshProduct($data.id);
			}
		}
		
	});
}