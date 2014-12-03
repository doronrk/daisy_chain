jQuery(document).ready(function()
{
	window.$priceDiv=false;
	if( jQuery("span.PricesalesPrice:first").length) $priceDiv=jQuery("span.PricesalesPrice:first");
	else if(jQuery("span.PricepriceBeforeTax:first").length) $priceDiv=jQuery("span.PricepriceBeforeTax:first");
	
	//if we have a notify link for out of stock, then change it to price history
	if(jQuery(".addtocart-bar [href$=notify]").length)
	{
		jQuery(".addtocart-bar [href$=notify]").attr("href", "#historyChart");
	}
	
	//somewhow anchor does not work if we use index.php?... , force it
	jQuery("[href='#historyChart']").attr("href", document.location.href.replace(location.hash, "")+"#historyChart");
	
	if(jQuery("#product_sku").length == 1)
	{
		$sku=jQuery("#product_sku").text();
		if($sku.length > 0)
		{
			$price=false;
			if(window.$priceDiv) $price=window.$priceDiv.text().replace("$","");
			if($price)
			{
				jQuery("#priceAlert [name=config]").val($config);
				jQuery("#priceAlert [name=sku]").val($sku);
				jQuery("#priceAlert [name=current_price]").val($price);
				jQuery("#priceAlert [name=target_price]").val(Math.floor($price*0.95*100)/100);

				formDefaults();

				jQuery("#historyChart,#priceAlert").show();
			}
			
			doPriceGraph($config, $sku, $color);
		} 
	}
	
	jQuery("#addPriceAlert").click(function()
	{
		jQuery("#priceAlert input[type=text]").each(function()
		{
			if(jQuery(this).val().length == 0 || jQuery(this).val() == jQuery(this).attr("default"))
			{
				alert("All fields must be filled out");
				return false;
			}
		})
		
		if(!validateEmail(jQuery("#priceAlert [name=mail]").val()))
		{
			alert("E-mail looks invalid");
			return false;
		}
		
		jQuery.post('/custom/price_history/alert.php', jQuery('#priceAlert').serialize(), function()
		{
			alert("Your alert was set");
		});
	})
});

function validateEmail(sEmail) 
{
    var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (filter.test(sEmail)) 
	{
		return true;
	}
	else 
	{
		return false;
	}
}

function formDefaults()
{
	jQuery("#priceAlert [default]").focus(function()
	{
		if(jQuery(this).val() == jQuery(this).attr("default")) jQuery(this).val("");
	})
	
	jQuery("#priceAlert [default]").blur(function()
	{
		if(jQuery(this).val().length == 0) jQuery(this).val(jQuery(this).attr("default"));
	})
	
	jQuery("#priceAlert [default]").each(function()
	{
		jQuery(this).trigger("blur");
	})
	
}


function doPriceGraph($config, $sku, $color)
{	
	jQuery.getJSON("/custom/price_history/ajax.php?sku="+$sku+"&config="+$config, function($data)
	{
		$labels=new Array();
		$points=new Array();
		$min=9999999;
		$max=0;
		$allPrices=new Array();
		jQuery.each($data, function($date, $price)
		{
			//$labels.push($date);
			$labels.push("");
			$price=parseFloat($price);
			$points.push($price);
			if($price < $min) $min=$price;
			if($price > $max) $max=$price;
			$allPrices.push($price);
		})
		if($points.length >0)
		{
			//add stock difference, only if it went down
			if($allPrices.length > 1 && $allPrices[$allPrices.length-1] < $allPrices[$allPrices.length-2])
			{
				$diff=Math.floor(Math.abs(($allPrices[$allPrices.length-1]-$allPrices[$allPrices.length-2])/$allPrices[$allPrices.length-2]*1000))/10;
				if($diff > 0)
				{
					jQuery("<a class='priceChange' href='#'>&nbsp;&nbsp;&darr;"+$diff+"%</a>").insertAfter(window.$priceDiv).attr("href", document.location.href.replace(location.hash, "")+"#historyChart");;
				}
				
			}
			
			
			$chartData={
				labels: $labels,
				datasets:
				[
					{
						label: "",
						fillColor: "rgba("+$color+",0.2)",
			            strokeColor: "rgba("+$color+",1)",
			            pointColor: "rgba("+$color+",1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba("+$color+",1)",
			            data: $points
					}
				]
			};
		
			$min=Math.floor($min-5);
			$max=Math.ceil($max+5);
			$step=Math.ceil(($max-$min)/10);
		
			var ctx = jQuery("#historyChart").get(0).getContext("2d");
			// This will get the first returned node in the jQuery collection.
			window.myNewChart = new Chart(ctx).Line($chartData,
				{
					responsive:true,
					showScale:true,
					scaleOverride:true,
					scaleSteps:($max-$min)/$step,
					scaleStepWidth:$step,
					scaleStartValue:$min,
					scaleLabel: "$<%=value%>",
					tooltipTemplate: "<%if (label){%>Date: <%=label%> <%}%>Price: $<%= value %>",
					bezierCurve:false
			    
				});
				
			//checking if trend is downward
			$downward=false;
			if($allPrices.length > 3)
			{
				$sum=0;
				for($i=$allPrices.length-4;$i<$allPrices.length-1;$i++)
				{
					$sum=$sum+$allPrices[$i];
				}
				if($sum/3 > $allPrices[$allPrices.length-1]) $downward=true;
			}
			//if we have a small history chart and our price trend is downward
			if(jQuery("#historyChartSmall").length && $downward)
			{
				jQuery("#historyChartSmall").click(function()
				{
					$href=document.location.href.replace(location.hash, "")+"#historyChart"
					window.location.href=$href;
				})
					var ctxSmall = jQuery("#historyChartSmall").get(0).getContext("2d");
					// This will get the first returned node in the jQuery collection.
					window.myNewSmallChart = new Chart(ctxSmall).Line($chartData,
						{
							responsive:true,
							showScale:true,
							scaleOverride:true,
							scaleSteps:($max-$min)/$step,
							scaleStepWidth:$step,
							scaleStartValue:$min,
							scaleLabel: "$<%=value%>",
							showTooltips: false,
							bezierCurve:false

						});
			}
		}
	});
}