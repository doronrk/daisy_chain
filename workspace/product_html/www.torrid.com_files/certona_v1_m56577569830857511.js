//functions to use with certona

(function( certonaUtil, $, undefined ) {

	certonaUtil.createBasicResxObject = function(certonaId, certonaURL){
		//variables for all pages
		var resx = new Object();
		resx.appid=certonaId;
		resx.top1=100000;
		resx.top2=100000;
		resx.lkmatch=/\d+.jsp/i;
		
		resx.host = certonaURL;
		
		return resx;
	};

	certonaUtil.createTransactionResxObject = function(certonaId, productCode, quantity, price, total, customerId, transactionId, certonaURL){
		//variables for all pages
		var resx = new Object();
		resx.appid=certonaId;
		resx.top1=100000;
		resx.top2=100000;
		resx.lkmatch=/\d+.jsp/i;
		resx.event="purchase+confirmation";
		resx.itemid=productCode;
		resx.qty=quantity;
		resx.price=price;
		resx.total=total;
		resx.customerid=customerId;    
		resx.transactionid = transactionId;
		
		resx.host = certonaURL;
		
		return resx;
	};

	certonaUtil.createResxObject = function(certonaId, event, productCode, elem, maxPrds, currencyCode, certonaURL, isEmployee){
		if(typeof(includeSidePanel) == 'undefined' || includeSidePanel == null)
			includeSidePanel = false;
		if(typeof(isEmployee) == 'undefined' || isEmployee == null)
			isEmployee = false;
			
		var resx = new Object();
		resx.appid=certonaId;
		resx.top1=100000;
		resx.top2=100000;
		resx.lkmatch=/\d+.jsp/i;
		resx.event=event;
		resx.itemid=productCode;

		//E4X Integration
		resx.currencycode=currencyCode;
		resx.rrec=true;
		resx.rrelem=elem;
		resx.rrcat="torridc01";
		resx.rrnum=maxPrds;
		resx.rrcall="certonaUtil.certonaCallback";

		if(isEmployee)
			resx.rrqs="emp=1";

		resx.host = certonaURL;
		
		return resx;
	};
	
	certonaUtil.certonaCallback = function(input) {
		//loop through responses
		$.each(input.Resonance.Response, function(index, response){
			var output = response.output.substring(0,response.output.length -1);
			var productArray = output.split("|");
			var productSize = productArray.length/5;
			
			if(response.scheme == "product_rr"){
				if(productSize > 0) {							
					for(var i=0; i < productSize; i++) {
						updateCertonaDiv(productArray, i);
					}
					$('#certonaDiv').fadeIn();
					
					// start Carousel for you ll aslo love in product page
				    if($(".alsolove").length > 0){
				        $(".alsolove").carouFredSel({
				            circular: false, infinite: false, width: 1024,
				            align: "left", height: "auto", auto: false,
				            items: {
				                visible: 5,
				                minimum: 5,
				                width: 200,
				                height: 270
				            },
				            prev: {
				                button: ".prev_btn",
				                items: 5
				            },
				            next: {
				                button: ".next_btn ",
				                items: 5
				            },
				            swipe: 5
				        });
				    }
				    // End Carousel for you ll aslo love in product page    
				}
			} else if(response.scheme == "product2quickview_rr") {
                var productSize = productArray.length/4;
                                
                //if product size is greater than 0 simply process and update html
                if(productSize > 0) {                           
                    for(var i=0; i < productSize; i++) {
                        updateCertonaQuickViewDiv(productArray, i);
                    }
                    
					setTimeout(function(){
						$('#certonaQuickViewDiv').show();
						
						// Start Carousel for quick view certona recommendations
						if($(".looksgoodQV").length > 0){
							$(".looksgoodQV").carouFredSel({
								circular: false, infinite: false,
								width: 855, align: "left", height: "auto",
								items: {
									visible: 5, minimum: 5,
									width: 180, height: 320
								},
								auto: false,
								prev: {
									button: ".Lprev_btn",
									items: 5
								},
								next: {
									button: ".Lnext_btn ",
									items: 5
								},
								swipe: 5
							});
						}
						// End Carousel for quick view certona recommendations
										
						//Resize the quickview popup
						if(window.self != window.top)
							window.parent.$.colorbox.resize({innerHeight:986});
						else
							$.colorbox.resize({innerHeight:980});
					}, 1500);
                }
            } else if(response.scheme == "product2_rr") {
				//if product size is greater than simply process and update html
				if(productSize > 0) {							
					for(var i=0; i < productSize; i++) {
						updateCertonaSidePanel(productArray, i);
					}
					setupCertonQuickView();
					$('#certonaSidePanelDiv').fadeIn();
					
					//start certona side panel carousel
				    if($("#certonaSidePanelRec").length > 0){
				        $("#certonaSidePanelRec").carouFredSel({
				            direction: "up", circular: false, infinite: false,
				            width: 140, align: "center", auto: false,
                            items: {
				                visible: 3,
				                minimum: 3,
				                width: 140,
				                height: 189
				            },
				            prev: {
				                button: ".up_btn",
				                key: "up",
				                items: 3
				            },
				            next: {
				                button: ".down_btn ",
				                key: "down",
				                items: 3
				            },
				            swipe: 3 });
				    }
				    // End certona side panel carousel
				}
				//if no products, show the standard right nav text
				else{
					$("#stdPrdRightNav").show();
				}
			} else if(response.scheme == "cart_rr") {
				// Call the legacy express cart certona recommendations
			    expressCertona(input);
			}
		});
	}
	
	/**
	 *  Certona processing for standard bottom carousel
	**/
	function updateCertonaDiv(productArray, i){
		if(typeof(productArray) != 'undefined'){
			//product setup
			var schema = productArray[i*5+0];
			var wasPrice = productArray[i*5+1].replace("[","");
			var nowPrice = productArray[i*5+2];
			var prodSku = productArray[i*5+3];
			var prodTitle = productArray[i*5+4].replace(/'/g," ");

			//image setup
			var rccImagePath = scene7Root;
			var ulGroup = document.getElementById('certonaRec');
			var newLi = document.createElement('li');
			if (nowPrice == ""){
				newLi.innerHTML='<a href="/torrid/services/productRedirect.jsp?itemCode='+prodSku+'" title="'+prodTitle+' Sku '+prodSku+'"><img src="'+rccImagePath+prodSku+'_hi?$newht_product_md$"/></a><div class="carsl_Pinfo"><a href="/torrid/services/productRedirect.jsp?itemCode='+prodSku+'" title="'+prodTitle+' Sku '+prodSku+'">' + prodTitle + '</a><div class="carsl_price">'+wasPrice+'</div></div>';
			} else{
			    newLi.innerHTML='<a href="/torrid/services/productRedirect.jsp?itemCode='+prodSku+'" title="'+prodTitle+' Sku '+prodSku+'"><img src="'+rccImagePath+prodSku+'_hi?$newht_product_md$"/></a><div class="carsl_Pinfo"><a href="/torrid/services/productRedirect.jsp?itemCode='+prodSku+'" title="'+prodTitle+' Sku '+prodSku+'">' + prodTitle + '</a><div class="carsl_price"><span class="was">'+wasPrice+'</span> <span class="Now">'+nowPrice+'</span></div></div>';
			}
			ulGroup.insertBefore(newLi, ulGroup.firstChild);
		}
	}
	
	/**
     *  Certona processing for quick view carousel
     */
    function updateCertonaQuickViewDiv(productArray, i){
        if(typeof(productArray) != 'undefined'){
            //product setup
            var wasPrice = productArray[i*4+0].replace("[","");
            var nowPrice = productArray[i*4+1];
            var prodSku = productArray[i*4+2];
            var prodTitle = productArray[i*4+3].replace(/'/g," ");

            //image setup
            var rccImagePath = scene7Root;
            var ulGroup = document.getElementById('certonaRec');
            var newLi = document.createElement('li');
            var targetURL = baseURL + "/torrid/services/productRedirect.jsp?itemCode=" + prodSku;
            if (nowPrice == ""){
                newLi.innerHTML='<a href="javascript:if(window.self != window.top){window.parent.location.href=\'' + targetURL + '\'; } else { window.location.href=\'' + targetURL + '\';}" title="'+prodTitle+' Sku '+prodSku+'"><img src="'+rccImagePath+prodSku+'_hi?$quickview_product_md$"/></a><div class="carsl_Pinfo"><a href="javascript:if(window.self != window.top){window.parent.location.href=\'' + targetURL + '\'; } else { window.location.href=\'' + targetURL + '\';}" title="'+prodTitle+' Sku '+prodSku+'">' + prodTitle + '</a><div class="carsl_price">'+wasPrice+'</div></div>';
            } else{
                newLi.innerHTML='<a href="javascript:if(window.self != window.top){window.parent.location.href=\'' + targetURL + '\'; } else { window.location.href=\'' + targetURL + '\';}" title="'+prodTitle+' Sku '+prodSku+'"><img src="'+rccImagePath+prodSku+'_hi?$quickview_product_md$"/></a><div class="carsl_Pinfo"><a href="javascript:if(window.self != window.top){window.parent.location.href=\'' + targetURL + '\'; } else { window.location.href=\'' + targetURL + '\';}" title="'+prodTitle+' Sku '+prodSku+'">' + prodTitle + '</a><div class="carsl_price"><span class="was">'+wasPrice+'</span> <span class="Now">'+nowPrice+'</span></div></div>';
            }
            ulGroup.insertBefore(newLi, ulGroup.firstChild);
        }
    }
	
	/**
	 * Certona processing for side panel
	**/
	function updateCertonaSidePanel(productArray, i){
		if(typeof(productArray) != 'undefined'){
			//product setup
			var schema = productArray[i*5+0];
			var wasPrice = productArray[i*5+1].replace("[","");
			var nowPrice = productArray[i*5+2];
			var prodSku = productArray[i*5+3];
			var prodTitle = productArray[i*5+4].replace(/'/g," ");

			//image setup
			var rccImagePath = scene7Root;
			var ulGroup = document.getElementById('certonaSidePanelRec');
			var newLi = document.createElement('li');
			
			newLi.innerHTML = '<a href="/torrid/services/productRedirect.jsp?itemCode='+prodSku+'" title="'+prodTitle+' Sku '+prodSku+'"><img src="'+rccImagePath+prodSku+'_hi?$newht_product_sm$" alt="'+prodSku+'"/></a>';
			newLi.innerHTML += '<a class="goodwith_qv" href="' + quickViewSLIURL + '?prodCd=' + prodSku + '" prdCode="' + prodSku + '">Quick View</a>';
			
			ulGroup.insertBefore(newLi, ulGroup.firstChild);
		}
	}
	
	/**
	 * Builds a product for the cart certona area
	**/
	function buildCertonaCartProduct(productArray, i){
		var products = "";
		
		if(typeof(productArray) != 'undefined'){
			var imagePath = scene7Root;
			var imageSettings = "_hi?wid=47&fmt=jpeg&qlt=100,0&op_sharpen=1&resMode=bicub&op_usm=0.0,0.0,0,0&iccEmbed=0";
		
			//product setup
			var wasPrice = productArray[i*4+0].replace("[","");
			var nowPrice = productArray[i*4+1];
			var prodSku = productArray[i*4+2];
			var prodTitle = productArray[i*4+3].replace(/'/g," ");
			
			products = "<div style='float:left;margin-left:5px;margin-top:5px;font-family:Arial;font-size:11px; color:#333333;margin-right:7px;'><div id='quickView-"+i+"' style='position:absolute;top:50px;padding-left:4px;visibility:hidden;'><a href=\"javascript:show('ajaxContent');quickView('ajaxImport','/torrid/services/productRedirect.jsp?quickprod="+prodSku+"');moveIt()\" style='border:1px solid #cccccc;padding-top:1px;padding-bottom:1px;padding-left:6px;padding-right:6px;color:#333333;font-family:Arial;font-size:11px;text-decoration:none;font-weight:bold;background-color:#ffffff'onmouseover=\"showQuickView('quickView-"+i+"')\"onmouseout=\"hideQuickView('quickView-"+i+"')\">VIEW</a></div><center><div><img src='"+imagePath+prodSku+imageSettings+"' onmouseover=\"showQuickView('quickView-"+i+"')\"onmouseout=\"hideQuickView('quickView-"+i+"')\"/></div><div style='padding-top:3px'>"+wasPrice+"</div></center></div>";
		}
		
		return products;
	}
	
	/**
	 * Sets up quickview for certona
	 **/
	function setupCertonQuickView() {
	    // quick view for certona recommendations in product page
	    if($(".good_with").length > 0){
	        $(".good_with li").hoverIntent(showqv,hideqv);
	    }
	    function showqv(){$(this).find(".goodwith_qv").css("visibility","visible")}
	    function hideqv(){$(this).find(".goodwith_qv").css("visibility","hidden")};
	    
	    var oldResxObj = null;
	    if(typeof(resx) != 'undefined')
	        oldResxObj = resx;
	    
		$(".goodwith_qv").colorbox({iframe:true,fastIframe:false, width:"920px", height:"642px", onCleanup: function() {if(FB!=null && FB !=undefined) FB=null; }, onComplete: function() {
			if(typeof(loadAndInitControls) == "function")
				loadAndInitControls();
			
			var prdCode = $(this).attr('prdCode');
			
			if(isLoggedIn)
				bazaar.configureProduct(prdCode, bvHash);
			else
				bazaar.configureProduct(prdCode);
			
			bazaar.showRatingsReviews();			
		}, onClosed: function() {
		    // Restore the old certona properties related to the product page
		    if(oldResxObj != null && isCertonaEnabled && isCertonaQuickViewEnabled) {
		        resx = oldResxObj;
		        if(typeof(certonaResx) != 'undefined')
		            certonaResx.run();
		    }
		} });
	}
				
}( window.certonaUtil = window.certonaUtil || {}, jQuery ));