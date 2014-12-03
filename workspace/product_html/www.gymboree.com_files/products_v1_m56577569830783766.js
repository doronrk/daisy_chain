/*
    ==============PRODUCTS.js==============================================
    used on pages with showing, selection and changing products information
    
    Uses script.aculo.us javascript library:
		-- script.aculo.us scriptaculous.js v1.7.0, Fri Jan 19 19:16:36 CET 2007
		-- Copyright (c) 2005, 2006 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
	BUG#5616 - Add timeout for 0 seconds for IE6 browser issue
	BUG#5805 - No special promo text if product doesn't have any text associated
    =======================================================================
*/
var xmlPD, xml_sub;		//XML variables with product data
var lastcolid="";		//used in DrawPDiv()
var lastsizeid="";		//used in DrawPDiv()
var lastsizevalue="";	//holds the size value to maintain the default size value across products in a fit.
var tab=0;				//current product preview tab	
var tab_id="";			//current product preview tab html id
var AOP = new Array();  //Array of product objects
var AOS = new Array();  //Array of size objects
var num_prod = 0;
var num_size = 0;
var AODPT = new Array(); // Array of default product per tab
var prd_nm = "";

var objPreview=null; objPreviewScroll=null;	//current product image (<div class="c1"..."c4">)
var divX, divY, divW, divH;	//sizes of current product image 
var t; //timeout

var clickX, clickY;		//mouse coordinates

/*-- check mouse coordinates --*/
function CheckMouse(e) 
{
    clickX = 0;
	clickY = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		clickX = e.pageX;
		clickY = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		clickX = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		clickY = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	
	//check for switch off preview image	  
    CheckPreview();
}

/*-- loads quicklook Product data window (<div id="quicklookProduct">)--*/
function ShowPreviewBlock(obj, e)
{


	/*** start mods_20111112 ***/
	el('jOverlay').style.display="block";
	/*** end mods_20111112 ***/

    var clickX, clickY, MaxX, MaxY, divX, divY, divW, divH;
        if(window.event)
        {
            clickX = window.event.screenX;
            clickY = window.event.screenY;
            MaxX = document.body.scrollWidth;
            MaxY = window.screen.height;
        }
        else
        {
            clickX = e.screenX;
            clickY = e.screenY;
            MaxX = window.innerWidth;
            MaxY = window.innerHeight;
        }

        divW=472;
        divH=319;

        divX = 0;
        divY = 0;
        var theElemHeight = obj.offsetHeight;
        var theElemWidth = obj.offsetWidth;
        while(obj !== null){
          divX += obj.offsetLeft;
          divY += obj.offsetTop;
          obj = obj.offsetParent;
        }

        if ((clickY)<(MaxY/2+20)) divY += theElemHeight;
            else divY = divY-divH;
        

        if ((divX+divW)>MaxX) divX=MaxX-divW-20;
           
        
        el('quicklookProduct').style.left = divX+"px";
        el('quicklookProduct').style.top = divY+"px";
        
        tab=0;
        tab_id="fits_tab1";
        var loader = new net.ContentLoader("product_data.xml", DrawPDiv,null,"GET");
        
        el('quicklookProduct').style.display="block";
        var myEffect = function(element) { };
        new Draggable('quicklookProduct',{starteffect:myEffect, endeffect:myEffect});     
		
		//hide SELECT elements in IE6
		if (Is_browser()=='MSIE' && uaVers==6)
		{
			var elem = document.getElementsByTagName('select');
	        for(var i = 0; i <= elem.length-1; i++)
	        {
	            if (elem[i].name!="select_s") {
	                elem[i].style.visibility = 'hidden';
	            }
			}
		}
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}
function CloseQuickViewDiv()
{
		//show SELECT elements in IE6
		if (Is_browser()=='MSIE' && uaVers==6)
		{
			var elem = document.getElementsByTagName('select');
	        for(var i = 0; i <= elem.length-1; i++)
	        {
	            if (elem[i].name!="select_s") {
	                elem[i].style.visibility = 'visible';
	            }
			}
		}

	/*** start mods_20111112 ***/
	el('jOverlay').style.display="none";
	/*** end mods_20111112 ***/
        el('product-description').style.display="none";
}

/*-- provides actions on XMLHTTPRequest loading for showing products information --*/
function DrawPDiv(obj)
{
	//empty elements
    EmptyDivs();
    lastsizeid = "";
    lastsizevalue = "";
    
    if (!obj) //called from loader
    {
        var reqxmlDoc =  Sarissa.getDomDocument();            
        var respText = ltrim(this.req.responseText);        
        reqxmlDoc = (new DOMParser()).parseFromString(respText, "text/xml");    
	    xmlPD = reqxmlDoc;
	    respText = '';
    }
    else	////called from "on quicklookProduct fits tab" click
    {
    	el(tab_id).className="";
        lastcolid = "";
        tab_id = obj;
        el(obj).className = 'selected';
        tab = obj.charAt((obj.length - 1));
    }
    var aid, el_li, el_a, el_s; //new html elements (li, a, span)
        //drawing colors
    	var xml_sil = xmlPD.getElementsByTagName("silhouette");
	    // Creating Product Head
	    elem = xml_sil[0].getElementsByTagName('head');
	    if (elem.length>0)
	    {
	        try //head tag
	        {
	            el('p-title').innerHTML = elem[0].getAttribute('name');
	            el('p-code').innerHTML = elem[0].getAttribute('code');
				prd_nm = elem[0].getAttribute('name');
	        }
	        catch(e){alert(e);}
	    }
        // creating product decription
        elem = xml_sil[0].getElementsByTagName('left');
	    if (elem.length>0)
	    {
	    	var elem_options = elem[0].getElementsByTagName('options');
	    	var elem_desc = elem[0].getElementsByTagName('description');
	        try //left tag
	        {
	            if (el('p-desc')!=null){
	            	el('p-desc').innerHTML = elem_desc[0].childNodes[0].nodeValue;
	            }
	            
	            var node_options = elem_options[0].childNodes[0].nodeValue;
	            if(node_options.length > 0) {
		            var opt = node_options.split('#'); var li = "";
		            for (var i=0; i<opt.length;i++)
		            {   
		                li += "<li>"+opt[i]+"</li>";
		            }
		             if (el('p-options')!=null){
		            	el('p-options').innerHTML = li;
		            }
	            } else {
	            	 if (el('p-options')!=null){
	            		el('p-options').style.display = "none";
	            	}
	            }
	        }
	        catch(e){}
	    }
        xml_sub = xml_sil[0].getElementsByTagName("fit");
        if(!obj) {
	        li = ""; 
		    for (var j=0; j<xml_sub.length;j++)
		    {   
		    	cl = ""
		        if (xml_sub[j].getAttribute("default")=="true") {
		        	tab_id = 'fits_tab'+j;
		        	tab = j;
		        	cl = 'selected';
					if(el('fit_type')!=null)
					{
						el('fit_type').value = xml_sub[j].getAttribute("name");
					}
				} 
				li += '<li id="fits_tab'+j+'" class="'+cl+'" onclick="javascript:if(this.id!=tab_id)DrawPDiv(this.id); el(\'fit_type\').value = \''+xml_sub[j].getAttribute("name")+'\'"><a href="javascript:DoSmth()" title="'+xml_sub[j].getAttribute("name")+'" onfocus="this.blur();"><span>'+xml_sub[j].getAttribute("name")+'</span></a></li>';
		    }
			if(el('fits_section')!=null)
			{
				el('fits_section').innerHTML = li;
			}
	    }
        xml_part = xml_sub[tab].getElementsByTagName("product");
        var default_xml_part; 
        for(var i = 0; i <= xml_part.length-1; i++)
        {
        	AOP[i] = xml_part[i];
        	aid = xml_part[i].getAttribute("id")+'_'+i;
			isGiftCard = xml_part[i].getAttribute("isGiftCard");
            el_li = document.createElement("img");
            el_li.setAttribute("src", xml_part[i].getAttribute("sw-image"));
            el_li.setAttribute("id", aid);
            el_li.setAttribute("title", xml_part[i].getAttribute("title"));        
            el_li.onmouseover = function () 
            {
				if(isGiftCard=="false")
					el("p-text-b").innerHTML = this.title;
				var n = this.id.split("_");
               	var elem = AOP[n[1]];
               	//var elem = xml_sub[tab].getElementsByTagName("product");
	            el('p-code').innerHTML = elem.getAttribute('code');
	            if (el('p-picture')!=null){
					el('p-picture').src = elem.getAttribute('image');
	            	el('p-picture').alt = prd_nm;
            	}
           
           		var prd_instock = elem.getAttribute("in-stock");
			    if(prd_instock == "true") {
					if(isGiftCard=="false")
						el("oos-msg").style.display = "none";
					if (el("add-to-bag-button")!=null){
			    		el("add-to-bag-button").style.display = "";
			    	}
					if(isGiftCard=="false")
					{
						el("lbl-quantity").style.display = "";
						el("select_s").style.display = "";
					}
			    } else {
					if(isGiftCard=="false")
						el("oos-msg").style.display = "";
					if (el("add-to-bag-button")){
			    		el("add-to-bag-button").style.display = "none";
			    	}
					if(isGiftCard=="false")
					{
						el("lbl-quantity").style.display = "none";
						el("select_s").style.display = "none";
					}
			    }
           		drawSizeMatrix(elem);
					
		        xml_special = elem.getElementsByTagName("b-special");
			    var cNodes = xml_special[0].childNodes;
			    if(cNodes && cNodes[0])
					{
						if(isGiftCard=="false")
							el("b-special-a").innerHTML = cNodes[0].nodeValue;
					}
				else
					{
						if(isGiftCard=="false")
							el("b-special-a").innerHTML = "";
					}
            };
            el_li.onmouseout = function () 
            {
				if(isGiftCard=="false")
				{
                if (lastcolid!="") el("p-text-b").innerHTML  = el(lastcolid+"_span").className.match("selected") !== null ? el(lastcolid).title : "no color";
                    else el("p-text-b").innerHTML  = "no color";
				}
				var n = lastcolid.split("_");
               	var elem = AOP[n[1]];
               	//var elem = xml_sub[tab].getElementsByTagName("product");
	            el('p-code').innerHTML = elem.getAttribute('code');
	            if (el('p-picture')!=null){
					el('p-picture').src = elem.getAttribute('image');
	            	el('p-picture').alt = prd_nm;
            	}
           
           		var prd_instock = elem.getAttribute("in-stock");
			    if(prd_instock == "true") {
					if(isGiftCard=="false")
						el("oos-msg").style.display = "none";
					if (el("add-to-bag-button")!=null){
			    		el("add-to-bag-button").style.display = "";
			    	}
					if(isGiftCard=="false")
					{
						el("lbl-quantity").style.display = "";
						el("select_s").style.display = "";
					}
			    } else {
					if(isGiftCard=="false")
						el("oos-msg").style.display = "";
					if (el("add-to-bag-button")!=null){
			    		el("add-to-bag-button").style.display = "none";
			    	}
					if(isGiftCard=="false")
					{
						el("lbl-quantity").style.display = "none";
						el("select_s").style.display = "none";
					}
			    }
			    
           		drawSizeMatrix(elem);

		        xml_special = elem.getElementsByTagName("b-special");
			    var cNodes = xml_special[0].childNodes;
			    if(cNodes && cNodes[0])
					{
						if(isGiftCard=="false")
							el("b-special-a").innerHTML = cNodes[0].nodeValue;
					}
				else
					{
						if(isGiftCard=="false")
							el("b-special-a").innerHTML = "";
					}
            };
            
            el_li.onclick = function () 
            {
                if(this.id == lastcolid)
                {
                //    if(this.className.match("selected") !== null) this.className = this.className.replace(" selected","");
                //        else this.className = this.className += " selected";                    
                }
                else
                {
                    if (lastcolid!=="") el(lastcolid+"_span").className = ""; 
                    
                    lastcolid = this.id;
    
                    el(lastcolid+"_span").className = "selected";                                            

					var n = this.id.split("_");
                   	var elem = AOP[n[1]];
		            
    		        //setting the clicked product id to the hidden field
	                el("ADD_CART_ITEM<>prd_id").value = n[0];
					if(isGiftCard=="false")
					{
						el("ADD_CART_ITEM<>salePriceAmt").value = elem.getAttribute("db-sale-price");
						el("ADD_CART_ITEM<>listPriceAmt").value = elem.getAttribute("list-price");
					}
	                displayProdSelected(elem, this.id);
	                
            		drawSizeMatrix(elem);

                }
            };
            
            el_a = document.createElement("a");
            el_a.setAttribute("href", "javascript:DoSmth()");
            el_a.setAttribute("title", xml_part[i].getAttribute("title"));
            
            el_s = document.createElement("span");
            el_s.setAttribute("id", aid + '_span')
            el_s.appendChild(el_a);
            //el_s.innerHTML = xml_part[i].getAttribute("title");
            el_a.appendChild(el_li);
			if(isGiftCard=="false")
				el('color-options-ul').appendChild(el_s);
            
            //el(aid).className = xml_part[i].getAttribute("class");

			if((!AODPT[tab] || AODPT[tab] == "") && xml_part[i].getAttribute("selected") == "true") {
				AODPT[0] = xml_part[i].getAttribute('tab1-ref-prod');
				AODPT[1] = xml_part[i].getAttribute('tab2-ref-prod');
				AODPT[2] = xml_part[i].getAttribute('tab3-ref-prod');
			}
            if (xml_part[i].getAttribute("code") == AODPT[tab]) 
            {
            	default_xml_part = xml_part[i];
				displayProdSelected(default_xml_part, aid, true);
                //setting the clicked product id to the hidden field
				if(el("ADD_CART_ITEM<>prd_id")!=null)
				{
					el("ADD_CART_ITEM<>prd_id").value = xml_part[i].getAttribute("id");
				}
				if(isGiftCard=="false")
				{
					el("ADD_CART_ITEM<>salePriceAmt").value = xml_part[i].getAttribute("db-sale-price");
					el("ADD_CART_ITEM<>listPriceAmt").value = xml_part[i].getAttribute("list-price");
				}
            }
        }
        //drawing sizes
        if(!default_xml_part) {
        	default_xml_part = xml_part[0];
			aid = default_xml_part.getAttribute("id")+'_0';
			displayProdSelected(default_xml_part, aid, true);
			el("ADD_CART_ITEM<>prd_id").value = xml_part[0].getAttribute("id");
			el("ADD_CART_ITEM<>salePriceAmt").value = xml_part[0].getAttribute("db-sale-price");
			el("ADD_CART_ITEM<>listPriceAmt").value = xml_part[0].getAttribute("list-price");
        }
		drawSizeMatrix(default_xml_part);
        //drawing other elements
		//Depending on the style on the div the value will be affected.
        if(el("product-image-section")!=null){
        	
        	if (el("product-image-section").style['visibility'] == 'hidden'){
        		el("product-image-section").style.visibility = "visible";
        	}
        		
        	if (el("product-image-section").style['display'] == 'none'){
        		el("product-image-section").style.display = "block";
        	}
        		
        }
        
		// Depending on the style on the div the value will be affected.
        if(el("product-description")!=null){
        	
        	if (el("product-description").style['visibility'] == 'hidden'){
        		el("product-description").style.visibility = "visible";
        		 
        	}
        		
        	if (el("product-description").style['display'] == 'none'){
        		el("product-description").style.display = "block";
        	}

        }
}

function displayProdSelected(xml_element, aid) {
	return displayProdSelectedFixed(xml_element, aid, false);
}
function displayProdSelected(xml_element, aid, ie6Fix) {
	var view_larger_url = xml_element.getAttribute('view-larger-url');
	var isGiftCard = xml_element.getAttribute("isGiftCard");
	var isEGiftCard = xml_element.getAttribute("isEGiftCard");
	var isGiftCardGiftBox = xml_element.getAttribute("isGiftCardGiftBox");
	var gbPrice = xml_element.getAttribute("list-price"); 
	if(isEGiftCard == "true")
	{
		var elLeftBlock = el('left_block');
		var elprodImgSection = el('product-image-section');
		var elprodDescSection = el('product-description');
		//hide the image being displayed
		if(elLeftBlock!=null && elprodImgSection!=null && elprodDescSection!=null)
		{	
			elLeftBlock.removeChild(elprodImgSection);
			elprodDescSection.style.display = "block";
		}
	}
	
	if(el('view_larger')!=null){
		
    	el('view_larger').href = "javascript:openScene7Popup('"+ view_larger_url + "')";
    	el('a-p-picture').href = "javascript:openScene7Popup('"+ view_larger_url + "')";
    }
    if(el('alternate_image') && el('view_larger')!=null) {
	    var hasAlternateView = xml_element.getAttribute('alternate-view');
	    if(hasAlternateView == 'true') {
	    	el('alternate_image').style.display = '';
	        el('alternate_image').href = "javascript:setAlternateImageURL('" + xml_element.getAttribute('image') + "', '" + view_larger_url + "')";
	    } else {
	    	el('alternate_image').style.display = 'none';
	    }
    }
 	AODPT[0] = xml_element.getAttribute('tab1-ref-prod');
	AODPT[1] = xml_element.getAttribute('tab2-ref-prod');
	AODPT[2] = xml_element.getAttribute('tab3-ref-prod');
	if(isGiftCard=="false")
		el(aid+"_span").className += " selected";
    lastcolid = aid;
	el('p-code').innerHTML = xml_element.getAttribute('code');
	if (el('p-picture')!=null){
		if(ie6Fix){
			setTimeout("el('p-picture').src = '" + xml_element.getAttribute('image') + "';", 0);
		} else {
			el('p-picture').src = xml_element.getAttribute('image');
		}
	    el('p-picture').alt = prd_nm;
	}
	if(isGiftCard=="false")
	{
		el("p-text-b").innerHTML = xml_element.getAttribute("title");

		var size_chart_url = xml_element.getAttribute("size-chart-url");
		if(size_chart_url && size_chart_url != "") {
			if (el("size-chart") != null && el("size-chart") != ""){
					el("size-chart").style.display = '';
					el("size-chart").href = "javascript:OpenWin('" + size_chart_url + "','680','578', 'yes');";
				}
		} else {
			if (el("size-chart") != null && el("size-chart") != ""){
				el("size-chart").style.display = 'none';
			} 
		}
	}
    xml_special = xml_element.getElementsByTagName("b-special");
    var cNodes = xml_special[0].childNodes;
    if(cNodes && cNodes[0])
		{
			if(isGiftCard=="false")
				el("b-special-a").innerHTML = cNodes[0].nodeValue;
		}
	else
		{
			if(isGiftCard=="false")
				el("b-special-a").innerHTML = "";
		}
    
	//do below logic for giftcardgiftbox only if giftcard is true
	if(isGiftCardGiftBox == "true")
	{
		if(el("gbprice")!=null && gbPrice!=null)
		{
			el("gbprice").style.display = "block";
			el("gbprice").innerHTML = '<p>Price: '+gbPrice+'</p><br/><br/>';
		}
	}
	
	var prd_instock = xml_element.getAttribute("in-stock");
    if(prd_instock == "true") {
		if(el("oos-msg")!=null)
		{
			el("oos-msg").style.display = "none";
		}
		if(el("add-to-bag-button")!=null)
		{
			el("add-to-bag-button").style.display = "";
		}
		if(isGiftCard=="false")
		{
			el("lbl-quantity").style.display = "";
			el("select_s").style.display = "";
		}
    } else {
		if(isGiftCard=="false")
			el("oos-msg").style.display = "";
		if (el("add-to-bag-button")!=null && isEGiftCard=="false"){
    		el("add-to-bag-button").style.display = "none";
    	}
    	if(isGiftCard=="false")
		{
			el("lbl-quantity").style.display = "none";
			el("select_s").style.display = "none";
		}
    }
}

function drawSizeMatrix(default_xml_part, default_product) {
		EmptySizeDivs();
		num_size = 0;
		AOS = new Array();
		var hasDefaultSku = false;
        xml_part = default_xml_part.getElementsByTagName("sku");
        for(i = 0; i <= xml_part.length-1; i++)
        {
        	AOS[num_size] = xml_part[i];
        	aid = xml_part[i].getAttribute("id")+'_'+num_size;
        	num_size++;
            el_li = document.createElement("li");            
            el_li.setAttribute("id", aid);
            el_li.setAttribute("title", xml_part[i].getAttribute("title"));
            
            el_s = document.createElement("span");
            el_s.innerHTML = xml_part[i].getAttribute("title");
            
            if (xml_part[i].getAttribute("in-stock")=="false")
            {
                el_li.appendChild(el_s);
				el('size-options-ul').appendChild(el_li);
            }
            else
            {
            	
            	var isIOSDevice = isIOS();
            	if (isIOSDevice==true){
                	el_li.addEventListener('touchstart', function(e){
                		e.preventDefault(); // prevent default click behavior
                		var n = this.id.split("_");
                      	var size_part = AOS[n[1]];
                      	if(lastsizeid && el(lastsizeid))
    	                        el(lastsizeid).className = ""; 
                          
                          lastsizeid = this.id;
                          lastsizevalue = this.title;
                          this.className = "selected";                                            
    						el("size-b").innerHTML = this.title;
                          
                          //setting the clicked sku id to the hidden field
                          el("ADD_CART_ITEM<>sku_id").value = n[0];

    		   		        displayPricing(size_part);   
                		 }, false)
            	}
            	


            	el_li.onmouseover = function () {
				el("size-b").innerHTML = this.title;
                
                	var n = this.id.split("_");
                    var size_part = AOS[n[1]];
                       
			        displayPricing(size_part);
                	
                };
                el_li.onmouseout = function () 
                {
                    if (lastsizeid != "" && el(lastsizeid)) {
						el("size-b").innerHTML  = el(lastsizeid).className.match("selected") !== null ? el(lastsizeid).title : "";
                        var n = lastsizeid.split("_");
                    	var size_part = AOS[n[1]];
                       
			        	displayPricing(size_part); 
                    }
                    else {
							el('reg-price-s').innerHTML = "";
							el("sale-price-s").innerHTML = "";
							el('b-price-s').innerHTML = "";
							el("size-b").innerHTML = "";
					   	
					   	var size_part = AOS[0];
                       
			        	displayPricing(size_part); 
                    }
                        
                };
                el_li.onclick = function () {
                	//if(this.id != lastsizeid) {
                    	var n = this.id.split("_");
                    	var size_part = AOS[n[1]];
                    	if(lastsizeid && el(lastsizeid))
	                        el(lastsizeid).className = ""; 
                        
                        lastsizeid = this.id;
                        lastsizevalue = this.title;
                        this.className = "selected";                                            
						el("size-b").innerHTML = this.title;
                        
                        //setting the clicked sku id to the hidden field
                        el("ADD_CART_ITEM<>sku_id").value = n[0];

		   		        displayPricing(size_part);   

                   // }
                    
                };
                el_a = document.createElement("a");
                el_a.setAttribute("href", "javascript:DoSmth()");
                el_a.setAttribute("title", xml_part[i].getAttribute("title"));

                el_a.appendChild(el_s);
                el_li.appendChild(el_a);
				el('size-options-ul').appendChild(el_li);
            }
            if(xml_part[i].getAttribute("in-stock") == 'false')
				el(aid).className = "na";
				
			if((lastsizevalue != null && lastsizevalue != "")) {
				if(lastsizevalue == xml_part[i].getAttribute("title")) {
					hasDefaultSku = true;
					if(xml_part[i].getAttribute("in-stock") != 'false')
		            	el(aid).className = "selected";
	            	lastsizeid = aid;
	            	lastsizevalue = xml_part[i].getAttribute("title");
					el("size-b").innerHTML = xml_part[i].getAttribute("title");
					
			       	displayPricing(xml_part[i]);
			       	
			       	// setting the sku id of the default sku
			       	el("ADD_CART_ITEM<>sku_id").value = xml_part[i].getAttribute("id");
			       	
					//used "Effect" to prevent Opera bug with changing data (can be removed)
					new Effect.Highlight('reg-price-s', {duration: 0.1, startcolor:'#ffffff', endcolor:'#ffffff'} );							
					new Effect.Highlight('sale-price-s', {duration: 0.1, startcolor:'#ffffff', endcolor:'#ffffff'} );
					new Effect.Highlight('b-price-s', {duration: 0.1, startcolor:'#ffffff', endcolor:'#ffffff'} );
				}
			} else if (xml_part[i].getAttribute("default") == "true") {
            	hasDefaultSku = true;
            	el(aid).className = "selected";
            	lastsizeid = aid;
            	lastsizevalue = xml_part[i].getAttribute("title");
				el("size-b").innerHTML = xml_part[i].getAttribute("title");
				
					displayPricing(xml_part[i]);
		       	
		       	// setting the sku id of the default sku
		       	el("ADD_CART_ITEM<>sku_id").value = xml_part[i].getAttribute("id");
		       	
				//used "Effect" to prevent Opera bug with changing data (can be removed)
					new Effect.Highlight('reg-price-s', {duration: 0.1, startcolor:'#ffffff', endcolor:'#ffffff'} );							
					new Effect.Highlight('sale-price-s', {duration: 0.1, startcolor:'#ffffff', endcolor:'#ffffff'} );
					new Effect.Highlight('b-price-s', {duration: 0.1, startcolor:'#ffffff', endcolor:'#ffffff'} );
            }
            
        }
        if(!hasDefaultSku) {
			if(el("size-b")!=null)
				el("size-b").innerHTML = "";
			if(el("ADD_CART_ITEM<>sku_id")!=null)
				el("ADD_CART_ITEM<>sku_id").value = "";	
		    displayPricing(xml_part[0]);
			if(el('reg-price-s')!=null && el('sale-price-s')!=null && el('b-price-s')!=null)
			{
				new Effect.Highlight('reg-price-s', {duration: 0.1, startcolor:'#ffffff', endcolor:'#ffffff'} );							
				new Effect.Highlight('sale-price-s', {duration: 0.1, startcolor:'#ffffff', endcolor:'#ffffff'} );
				new Effect.Highlight('b-price-s', {duration: 0.1, startcolor:'#ffffff', endcolor:'#ffffff'} );
			}
       	}
        //if (lastsizeid == "") lastsizeid = aid;

}

function displayPricing(size_tag) {
	if(size_tag != null)
	{
		var reg_price = size_tag.getAttribute("reg-price");
		var sale_price = size_tag.getAttribute("sale-price");
		var list_price = size_tag.getAttribute("b-price");
		var promo_name = size_tag.getAttribute("promo-name");
		if(reg_price == null || reg_price == "") {
			el("reg-price").style.display = "none";
		} else {
			el("reg-price").style.display = "block";
			el("reg-price-lbl").style.display = "block";	

			el("reg-price-s").className = "";
			el("reg-price-s").innerHTML = reg_price;
		}
		if(sale_price == null || sale_price == "") {
			el("sale-price").style.display = "none";
		} else {
			el("sale-price").style.display = "block";

			el("reg-price-lbl").style.display = "block";	
			el("reg-price-s").className = "strike";
			el("sale-price-s").className = "";
			el("sale-price-s").innerHTML = sale_price;
		}
		//If list_price is the only price present then display it as reg price
		if((list_price != null || list_price != "") && (sale_price == null || sale_price == "") && (reg_price == null || reg_price == "")) {
			el("reg-price").style.display = "block";
			el("reg-price-lbl").style.display = "none";	
			el("reg-price-s").innerHTML = list_price;
			el("reg-price-s").className = "noreg";
			el("b-price").style.display = "none";
		} else if(list_price == null || list_price == "") {
			el("b-price").style.display = "none";
		} else {
			el("b-price").style.display = "block";
			el("reg-price-lbl").style.display = "block";	
			el("reg-price-s").className = "strike";
			el("sale-price-s").className = "strike";
			el("b-price-s").innerHTML = list_price;
		}    
		if(promo_name == null)
			el("promo-name").innerHTML = "";    
		else 
			el("promo-name").innerHTML = promo_name; 
	}
}

/*-- hides "quicklookProduct" --*/
function ClosePDiv()
{
		//show SELECT elements in IE6
		if (Is_browser()=='MSIE' && uaVers==6)
		{
			var elem = document.getElementsByTagName('select');
	        for(var i = 0; i <= elem.length-1; i++)
	        {
	            if (elem[i].name!="select_s") {
	                elem[i].style.visibility = 'visible';
	            }
			}
		}

        el('quicklookProduct').style.display="none";
}
function EmptyDivs()
{
	if(el('color-options-ul')!=null)
		el('color-options-ul').innerHTML = "";
	if(el('size-options-ul')!=null)	
		el('size-options-ul').innerHTML = "";
	if(	el('reg-price-s')!=null)
		el('reg-price-s').innerHTML = "";
	if(el("sale-price-s")!=null)
		el("sale-price-s").innerHTML = "";
	if(el('b-price-s')!=null)
		el('b-price-s').innerHTML = "";
	if(el('b-special-a')!=null)
		el('b-special-a').innerHTML = "";
	if(el("p-text-b")!=null)
		el("p-text-b").innerHTML = "";
	if(el("size-b")!=null)
		el("size-b").innerHTML = "";
	if(document.getElementById("select_s")!=null)
		document.getElementById("select_s").selectedIndex=0;
}

function EmptySizeDivs()
{
	if(el('size-options-ul')!=null)	
		el('size-options-ul').innerHTML = "";
	if(el('reg-price-s')!=null)		
		el('reg-price-s').innerHTML = "";
	if(el('sale-price-s')!=null)		
		el("sale-price-s").innerHTML = "";
	if(el('b-price-s')!=null)		
		el('b-price-s').innerHTML = "";
   if(el("size-b")!=null)
	el("size-b").innerHTML = "";
}

/*-- shows a "preview" element when the user points a mouse on a product image. This function is based on the calculation of the mouse coordinates and uses CheckMouse() and CheckPreview() functions --*/
function ShowPreview(obj)
{
    try
    {
        if (objPreview === null) 
        {
            objPreview = obj;
            
            divX = 0;
            divY = 0;
            divH = obj.offsetHeight;
            divW = obj.offsetWidth;
            while(obj !== null){
              divX += obj.offsetLeft;
              divY += obj.offsetTop;
              obj = obj.offsetParent;
            }
            
			//showing timeout - 900ms
	        window.clearTimeout(t);
	        t = setTimeout ("try {var e = objPreview.getElementsByTagName('div');e[0].className = 'preview p_on';} catch(e) {}", 900);
			return;
        }
		else
		{
			if (obj!=objPreview) 
			{
                var e = objPreview.getElementsByTagName("div");
                e[0].className = "preview p_off";
                objPreview = null;
				ShowPreview(obj);
			}
		}
    }
    catch (e)
    {
        objPreview = null;
    }
}


/*-- check whether mouse out of current objPreview margins --*/
function CheckPreview()
{
    try
    {
        if (objPreview !== null) 
        {
            /*alert("clickX: "+ clickX+"\n"+
            "clickY: "+ clickY+"\n"+
            "divX: "+ divX+"\n"+
            "divY: "+ divY+"\n"+
            "divH: "+ divW+"\n");*/
            
            if (clickX > (divX+divW) || clickX < divX || clickY > (divY+divH) || clickY < divY) 
            {
                //out
                var e = objPreview.getElementsByTagName("div");
                e[0].className = "preview p_off";
                objPreview = null;
            }
        }
    }
    catch (e)
    {objPreview = null;
    }
}

