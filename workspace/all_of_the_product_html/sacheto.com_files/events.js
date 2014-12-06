jQuery(document).ready(function()
{
	//When taxes are not shown - we show a hint that one needs to choose a state to see taxes
	if(document.location.href.indexOf("/cart")  > 0)
	{
		/*if(jQuery(".PricetaxAmount").text().length === 0) 
		{
			jQuery(".PricetaxAmount:last").html("<a href='#email_field'>(choose your state)</a>"); 
			jQuery(".PricetaxAmount:first").show();
		}*/
		
		
		if(typeof(ga) !== "undefined")  
		{
			//must have $config set in some module
			jQuery.get("/custom/stats/stat.php?sku="+jQuery(".product_skus").text()+"&action=add&config="+window.$config);
			
			ga('send', 'event', 'Cart', 'Loaded Sku',  jQuery(".product_skus").text());
			ga('send', 'event', 'Cart', 'Loaded Total', jQuery("tr.cart-sub-total span:last").text());
		}
		
	/*	//logging every step
		var d=new Date();
		window.$session=d.getTime();
		window.$seq=0;
		window.$lasthtml='';
		setInterval(function()
		{
			window.$seq++;
			var $clone=jQuery('#gkContentWrap').clone();

			$clone.find("input,select,textarea").each(function() {
			          if(jQuery(this).is("[type='checkbox']") || jQuery(this).is("[type='checkbox']")) {
			            jQuery(this).attr("checked", jQuery(this).attr("checked"));
			          }
			          else {
			             jQuery(this).attr("value", jQuery(this).val()); 
			          }
			       });

			$html=escape($clone.html());
			if(window.$lasthtml != $html)
			{
				$head='';
				if(window.$seq == 1)
				{
					$head=escape(jQuery("head").html());
				}
				window.$lasthtml=$html;
				$post="html="+$html+"&session="+window.$session+"&seq="+window.$seq+"&head="+$head;
				jQuery.post("/custom/log.php", $post);
			}
			
		}, 1500);*/

		

	}

	
	if(typeof(ga) !== "undefined")  
	{
		//product loaded
		if(jQuery("#product_sku").length > 0)
		{
			jQuery.get("/custom/stats/stat.php?sku="+jQuery("#product_sku").text()+"&action=load&config="+window.$config);
			
			console.log("Google Analytics");
				if(document.referrer.indexOf("https://"+document.domain) === -1)
				{
					ga('send', 'event', 'Product', 'Loaded Outside',  jQuery("#product_sku").text());
				}

				if(document.referrer.indexOf("https://"+document.domain) === 0)
				{
					ga('send', 'event', 'Product', 'Loaded Inside',  jQuery("#product_sku").text());
				}
				jQuery("a[href='historyChart']").click(function()
				{
					ga('send', 'event', 'Product', 'Price History',  jQuery("#product_sku").text());
				})
				jQuery("#priceAlert #addPriceAlert").click(function()
				{
					ga('send', 'event', 'Product', 'Add Price Alert',  jQuery("#product_sku").text());
				})
		}
	
		
		//console.log("events loaded");
		jQuery(".addtocart-bar input.addtocart-button").click(function()
		{
			ga('send', 'event', 'Product', 'Add to cart',  jQuery("#product_sku").text());
		});
		
		jQuery("#GuestUser button").click(function()
		{
			ga('send', 'event', 'Cart', 'Guest Checkout', jQuery("#GuestUser #email_field").val()+" "+jQuery(".product_skus").text());
		})

		jQuery("#UserRegistration button").click(function()
		{
			ga('send', 'event', 'Cart', 'Register and Checkout', jQuery("#UserRegistration #email_field").val()+" "+jQuery(".product_skus").text());
		})
		
		jQuery("#UserLogin button").click(function()
		{
			ga('send', 'event', 'Cart', 'Login and Checkout', jQuery("#UserLogin #proopc-username").val() + " " + jQuery(".product_skus").text());
		})
		
		
	}
})

function logOrder()
{
	$date=new Date();
	$dateStr=$date.getHours() + "."+ $date.getTimezoneOffset()/60;
	$str='';
	$post="date="+$dateStr;
	jQuery(".proopc-finalpage input[type=text]").each(function()
	{
		$name=jQuery(this).attr("name");
		$val=jQuery(this).val();
		$post=$post+"&"+$name+"="+$val;
		$length=jQuery(this).val().length;
		$str=$str+"|"+$name+":"+$length;
	})
	$email=jQuery("input[name=email]").val();

	//console.log($str);
	ga('send', 'event', 'Cart', 'Checkout', $dateStr + "|" + $email + " " + $str);
//	jQuery.post("/custom/log.php", $post);
}

