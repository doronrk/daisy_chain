var colorsSwatchCallback = false;

function ChangeProductGroup(id)
{
    var select_box = document.getElementById('item_group_select-'+id);
    var group_id   = select_box.options[select_box.selectedIndex].value;
    var item_count = 0;
    while(product_div = document.getElementById('item_group-'+id+'-'+item_count))
    {
        if(group_id != item_count) {
            product_div.style.visibility = "hidden";
            product_div.style.display    = "none";
            document.getElementById('select_quantity'+id+'-'+item_count).value=0;
        } else {
            product_div.style.visibility = "visible";
            product_div.style.display    = "block";
        }
        item_count++;
    }
    fadeBGCol('item_group-'+id+'-'+group_id);
}

function ChangeProductStyle(id)
{
    var select_box   = document.getElementById('select_style'+id);
    var item_count   = 0;
    var option_id    = select_box.options[select_box.selectedIndex].id;
    var product_id   = option_id.substr(option_id.lastIndexOf('-')+1);
    var product_div;
    if(select_box.options[select_box.selectedIndex].value) {
        while(product_div = document.getElementById('item-'+id+'-'+item_count))
        {
            if(product_id != item_count) {
                product_div.style.visibility = "hidden";
                product_div.style.display    = "none";
            } else {
                product_div.style.visibility = "visible";
                product_div.style.display    = "block";
                                 
            }
            item_count++;
        }
        CheckProductQuantity(id);
    }
}

function CheckProductQuantity(id)
{
    var quantity_box = document.getElementById('select_quantity'+id);
    var select_box   = document.getElementById('select_style'+id);
    var item_count   = 0;
    if(quantity_box.value > 0) {
        if(select_box.options) {
            var option_id    = select_box.options[select_box.selectedIndex].id;
            var product_id   = option_id.substr(option_id.lastIndexOf('-')+1);
        } else if (select_box.value) {
            var product_id = 0;
        }
        
        if(document.getElementById('item-add-'+id+'-'+product_id)) {
            var product_value = document.getElementById('item-add-'+id+'-'+product_id).value;
    
            if(product_value != 1) {
                quantity_box.value = 0;
                alert("Sorry this item is out of stock.");
            }
        }
    }
    if(!quantity_box.value || !parseFloat(quantity_box.value) || quantity_box.value < 1) quantity_box.value = 0;
    //if(quantity_box.value > 99) quantity_box.value = 99;
}

function EraseQuantity(id)
{
    var quantity_box = document.getElementById('select_quantity'+id);

    if(quantity_box.value == '0') {
        quantity_box.value = '';
    }
    return false;
}

function AddQuantity(id)
{
    document.getElementById('select_quantity'+id).value++;
    CheckProductQuantity(id);
    return false;
}

function RemoveAllQuantities()
{
    if (!document.forms['sub_items']) return;
    var id=0;
    var inputs = document.forms['sub_items'].getElementsByTagName('INPUT');
    var selected=false;
    while(obj = inputs.item(id)){
        id++;
        if(obj.id.substr(0,15) == 'select_quantity' && obj.value > 0) obj.value = 0;
    }
}

function CheckQuantitySubmit()
{ 
    var id=0;
    var inputs = document.forms['sub_items'].getElementsByTagName('INPUT');
	var xinputs = $(":input[name^='vwquantity']");
	var inputs = $(inputs).add(xinputs);
    var selected=false;
    var styleSelected = true;
    inputs.each(function(i, obj){
        id++;
        if(obj.id.substr(0,15) == 'select_quantity') {
            if(obj.value > 0) {
				selected=true;
            }
            var idset = obj.id.substr(15);
            
            if(obj.value > 0 
               && document.getElementById('select_style'+idset) 
               && !document.getElementById('select_style'+idset).selectedIndex
               && document.getElementById('select_style'+idset).options
               ) {
                if(document.getElementById('item_group-'+idset).style) document.getElementById('item_group-'+idset).style.backgroundColor = "#FFDDDD";
                styleSelected = false;
            } else if(document.getElementById('item_group-'+idset)) {
                if(document.getElementById('item_group-'+idset).style) document.getElementById('item_group-'+idset).style.backgroundColor = "#FFFFFF";
            }
        }
    })
    qtys = $(":input[name^='vwquantity']");
	var totalqty=0;
	qtys.each(function(){
		if(parseInt($(this).val()) > 0) {
			totalqty += parseInt($(this).val());
			selected=true;
		}
	})
    if(!styleSelected) {
        alert('Please select a style.');
        return false;
    }
    
    if(!selected) {
        alert('Please select a quantity.');
        return false;
    }
	if ( typeof(qtymax) != 'undefined'  && qtymax != 0){
		if(totalqty>qtymax){
			alert('Sorry, limit ' + qtymax + ' per order');
			return false;
		}
	}
	if(quickCartAction == 2 && $j('.btn_addtoregistry').length) {
		$j('#sub_items').append('<input type="hidden" name="registry_x" value="1">');
	}
	if(quickCartAction == 3 && $j('.btn_addtowishlist').length) {
		$j('#sub_items').append('<input type="hidden" name="wishlist_x" value="1">');
	}
    return true;
}

function CheckQuantitySubmitNoMessage(form_id)
{ 
    var id=0;
    if (!form_id)
        form_id = 'sub_items'; 
    var inputs = document.forms[form_id].getElementsByTagName('INPUT');
	var xinputs = $(":input[name^='vwquantity']");
	var inputs = $(inputs).add(xinputs);
    var selected=false;
    var styleSelected = true;
    inputs.each(function(i, obj){
        id++;
        if(obj.id.substr(0,15) == 'select_quantity') {
            var idset = obj.id.substr(15);       
            if(obj.value > 0 
               && document.getElementById('select_style'+idset) 
               && !document.getElementById('select_style'+idset).selectedIndex
               && document.getElementById('select_style'+idset).options
               ) {
                if(document.getElementById('item_group-'+idset).style) document.getElementById('item_group-'+idset).style.backgroundColor = "#FFDDDD";
                styleSelected = false;
            } else if(document.getElementById('item_group-'+idset)) {
                if(document.getElementById('item_group-'+idset).style) document.getElementById('item_group-'+idset).style.backgroundColor = "#FFFFFF";
            }
        }
    })
	var totalqty=0;
    qtys = $(":input[name^='vwquantity']");
	qtys.each(function(){
		if(parseInt($(this).val()) > 0) {
			totalqty += parseInt($(this).val());
			selected=true;
		}
	})
    if(!styleSelected) {
        return 'Please select a style.';
    }
    
    if(!selected) {
        return 'Please select a quantity.';
    }
	if(typeof(qtymax) != 'undefined'  && qtymax != 0){
		if(totalqty>qtymax){
			return 'Sorry, limit ' + qtymax + ' per customer';
		}
	}
	if(typeof(qtymin) != 'undefined'  && qtymin != 0){
		if(totalqty<qtymin && totalqty!= 0){
			return 'Sorry, minimum of ' + qtymin + ' must be purchased';
		}
	}
    return false;
}

function setPageHash(hash) {
    if (typeof window.history.replaceState == "function") {
        window.history.replaceState(null, "", "#" + hash);
    } else {
        window.location.hash = hash;
    }
}

function doColorSwatch(obj,name,zoomimage) {
    if(name) {
        setPageHash("color="+escape(name));
        setColorDropdowns(name);
    }
    if(zoomimage) {
        var main = document.getElementById('main_image_zoom_a');
        main.href = zoomimage;
		    }
    //zoomClick(obj, window.event);
    return false;
}

function setColorDropdowns(name)
{    
    $j('select.product_selection_filter').each(function(index){
        $j(this).val('');
        var match=false;
        var child_id_array=[];
        $j(this).children().each(function(index2){
            var child_id=($j(this).attr('id')).replace("style_option","");
            if($j(this).html()==name){
                $j(this).parent().val(this.value);
                match=true;
                childvisible=child_id;
            };
            if(child_id.length != 0)
            {
                child_id_array.push(child_id); 
            }
        });
        if(match==true)
        {
            $j.each(child_id_array , function(i, val) { 
                $j('#item-'+child_id_array[i]).hide();
                $j('#item-'+child_id_array[i]).find('.stock').hide();            
                $j('#item-'+child_id_array[i]).find('.model').hide();
            });
            $j('#item-'+childvisible).show();
            $j('#item-'+childvisible).css('visibility','visible');
            $j('#item-'+childvisible).find('.stock').show();
            $j('#item-'+childvisible).find('.model').show();
        }
        else
        {
            $j.each(child_id_array , function(i, val) { 
                $j('#item-'+child_id_array[i]).find('.stock').hide();            
                $j('#item-'+child_id_array[i]).find('.model').hide();
            });    
        }
    });
}

function setMainImageFromColorSwatchString(name)
{
    $j('.alt_image').each(function(index) {
        if($j(this).children('.style_name').first().attr('title') == name) {
            $j(this).children('.cloud-zoom-gallery').first().click();
        }
    });
}

function setColorSwatchHash()
{
    var loc = window.location.hash.substring(1);
    var params = loc.split("&");
    var part;
    var cnt = 0;
    
    while(params[cnt] != undefined) {
        part = params[cnt].split("=");
        if(part[0] == "color") {
            colorsSwatchCallback = part[1];
            setColorDropdowns(unescape(part[1]));
        }
        cnt++;
    }
    
}

function exchangeZoomImage(zoomimage) {
    document.getElementById('main_image_large').href = zoomimage;
    document.getElementById('main_image_zoom_a').href = zoomimage;
    document.getElementById('main_image_img').src = zoomimage.replace('giant','standard');
			return false;
	}

function ProductZoom(id, type, size, caption)
{
    var zoombox = document.getElementById('product_zoom');
    var zoomboxlink = document.getElementById('product_zoom_more');
    zoombox.style.display = 'block';
    zoomboxlink.href = "javascript:ProductZoomSet('"+id+"','"+type+"',1,['"+size.join("','")+"'],'"+caption+"')";
    ProductZoomSet(id,type,0,size,caption);
    //product_zoom.MoveDown();
}

function ProductZoomSet(id, type, show, size, caption)
{
    var zoombox = document.getElementById('product_zoom');
    var zoomtitle   = document.getElementById('product_zoom_title');
    var zoomboxlink = document.getElementById('product_zoom_more');
    var zoomimage = document.getElementById('product_zoom_image');
    var next = show+1;
    zoomimage.src = "http://www.brighton.com/images/loadanimation.gif";

    if(caption) {
        zoomtitle.innerHTML = caption;
        zoomtitle.style.display = 'block';
    } else {
        zoomtitle.innerHTML = '';
        zoomtitle.style.display = 'none';
    }

    if(size[next]) {
        zoomboxlink.style.display = 'block';
        zoomboxlink.href = "javascript:ProductZoomSet('"+id+"','"+type+"',"+next+",['"+size.join("','")+"'],'"+caption+"')";
    } else {
        zoomboxlink.style.display = 'none';
        zoomboxlink.href = "#";
    }
    zoomimage.src = size[show];

}

function ProductZoomHide()
{
    var zoombox = document.getElementById('product_zoom');
    var zoomtitle   = document.getElementById('product_zoom_title');
    var zoomimage = document.getElementById('product_zoom_image');
    var zoomboxlink = document.getElementById('product_zoom_more');

    //product_zoom.MoveUp();
    zoomtitle.innerHTML = '';
    zoomimage.src = "http://www.brighton.com/images/loadanimation.gif";
    zoomboxlink.style.display = 'none';
    zoomtitle.style.display = 'none';
    zoombox.style.display = 'none';

}

function ProductDetailsShow()
{
    var wind = document.getElementById('child_window');
    wind.style.display = 'block';
}
function ProductDetailsHide()
{
    var wind = document.getElementById('child_window');
    wind.style.display = 'none';
}
function ProductDetailsTop()
{
    document.getElementById('child_window_content').scrollTop=0;
}

function ProductChangeStyle(name)
{
    var section = document.getElementById('items');
    var styles = section.getElementsByTagName('select');
    var j=0;
    var o=0;
    var select_name="";
    while(styles[j]) {
        o=0;
        while(styles[j].options[o]) {
            select_name = styles[j].options[o].innerHTML;
            if(select_name.toLowerCase() == name) {
                styles[j].selectedIndex = o;
                styles[j].onchange();
                break;
            }
            o++;
        }
        j++;
    }
}

function openWindow (url, name, width, height, toolbar, menubar, status, location, scrollbar)
{
    var w;
    w = window.open(url, name, 'width=' + width + ',height=' + height + ',scrollbars=yes,resizable=yes,directories=no,toolbar='+toolbar+',menubar='+menubar+',status='+status+',location='+location);
    w.moveTo(200,200);
}


//BG Fader by www.hesido.com
function fadeBGCol(id) {
    var obj = document.getElementById(id);
        doBGFade(obj,[255,255,200],[255,255,255],[255,255,255],20,20,1);
}

function doBGFade(elem,startRGB,endRGB,finalColor,steps,intervals,powr) {
    finalColor = "rgb("+finalColor.join(',')+")";
    if (elem.bgFadeInt) window.clearInterval(elem.bgFadeInt);
    var actStep = 0;
    elem.bgFadeInt = window.setInterval(
        function() {
            elem.style.backgroundColor = "rgb("+
                easeInOut(startRGB[0],endRGB[0],steps,actStep,powr)+","+
                easeInOut(startRGB[1],endRGB[1],steps,actStep,powr)+","+
                easeInOut(startRGB[2],endRGB[2],steps,actStep,powr)+")";
            actStep++;
            if (actStep > steps) {
            elem.style.backgroundColor = finalColor;
            window.clearInterval(elem.bgFadeInt);
            }
        }
        ,intervals)
}

function easeInOut(minValue,maxValue,totalSteps,actualStep,powr) {
//Generic Animation Step Value Generator By www.hesido.com
    var delta = maxValue - minValue;
    var stepp = minValue+(Math.pow(((1 / totalSteps)*actualStep),powr)*delta);
    return Math.ceil(stepp)
}


ScrollWindow = function (id,accel,min,max)
{
    var SetWindow        = document.getElementById(id);
    var id               = id;
    var UsePower         = accel;
    var MinVelocity      = min;
    var MaxVelocity      = max;
    var VelocityRange    = MaxVelocity - MinVelocity;
    var CurrentDirection;

    this.MoveDown = function()
    {
        Direction = -1;
        Height = SetWindow.clientHeight;
        //SetWindow.style.marginTop = Height * Direction + "px";
        Current = Height * Direction;
        CurrentDirection = Direction;
        this.MoveIt(Direction,Height,Current);
    }

    this.MoveUp = function()
    {
        Direction = 1;
        Height = SetWindow.clientHeight;
        Current = 1;
        CurrentDirection = Direction;
        this.MoveIt(Direction,Height,Current);
    }

    this.MoveIt = function(Direction,Height,Current)
    {
        FlipDirection = Direction * -1;
        if(UsePower) {
            Power = MinVelocity + (Math.floor(VelocityRange * ((Current * Direction)/ Height)) * FlipDirection);
        } else {
            Power = MinVelocity;
        }

        if(Direction > 0) {
            Current = Current - Power;
        } else {
            Current = Current + Power;
        }

        if(!Current && Direction > 0) Current = -1;

        SetWindow.style.marginTop = Current + "px";

        if(Direction > 0 && Current > (Height * -1) || Direction < 0 && Current < 0) {
             if(CurrentDirection == Direction) window.setTimeout(id+".MoveIt("+Direction+","+Height+","+Current+")",10);
        } else if (Direction > 0) {
            SetWindow.style.marginTop = Height * -1;
        } else {
            SetWindow.style.marginTop = 0;
        }
    }
}

function ShowTab(id,setPage)
{
    if(setPage) {
        window.location = "#content";
    }
    	

    var item_count = 0;

    while(div = document.getElementById('product_tab_'+item_count))
    {
        document.getElementById('product_tab_'+item_count).setAttribute("class", "unselected");
        item_count++;
    }
    item_count = 0;
    while(div = document.getElementById('product_tab_content_'+item_count))
    {
        document.getElementById('product_tab_content_'+item_count).style.display="none";
        item_count++;
    }
    document.getElementById('product_tab_'+id).setAttribute("class", "selected");
    document.getElementById('product_tab_content_'+id).style.display="block";   
}

productStoreLocator = function(id) {
    if(navigator.appName == 'Microsoft Internet Explorer') {
        window.location = 'http://www.brighton.com/product-finder/'+id;
    } else {
        productStoreLocatorSetup();
        $('#store_locator_content').load('http://www.brighton.com/product-finder/'+id+'?embedded=true');
    }
    return false;
}

productStoreLocatorSetup = function()
{
    document.getElementById('store_locator_content').innerHTML = "";
    $('#store_locator_content').html('<div class="loading"></div>');
    $('#store_locator').css("display","block");
}

productStoreLocatorClose = function()
{
    $('#store_locator').css("display","none");
    document.getElementById('store_locator_content').innerHTML = "";
    return false;
}

productStoreLocatorSubmit = function()
{
    if(id && zip) {
        var i=0;
        var o;
        var filter='';
        var limit = '';
        var nomap = false;
        var nolegend = false;
        var nofilters = false;
        var distance = 25;
        if(jQuery('#options_limit').val()) limit = jQuery('#options_limit').val();
        if(jQuery('#options_nomap').val()) nomap = jQuery('#options_nomap').val();
        if(jQuery('#options_nolegend').val()) nolegend = jQuery('#options_nolegend').val();
        if(jQuery('#options_nofilters').val()) nofilters = jQuery('#options_nofilters').val();
        if(jQuery('#zipcode_distance').val()) distance = jQuery('#zipcode_distance').val();
	
        if(document.getElementById('map_filter_0')) {
            while(o=document.getElementById('map_filter_'+i)) {
                if(o.checked) {
                    if(filter != "") filter += ":";
                    filter += o.name.replace('map_filter[','').replace(']','');
                }
                i++;
            }
        }
        
        $('#productfinder_result').html('<div class="loading"></div>');
        
        $.post('http://www.brighton.com/product-finder/'+id+'?embedded=true', 
            { product_id:  id, zip: zip, filters: filter, limit: limit,nomap:nomap,nolegend:nolegend,nofilters:nofilters,distance:distance,pfzip:pfzip },
            function( data ) {
              $( "#store_locator_content" ).html( data );
              $( "#store_locator" ).show();
			            });
            
    }
    return false;
}

var productMainImageUrl = "";
var productImageStretched;
productCheckImageStretched = function()
{
    function doCheck() {
        var img = document.getElementById('main_image_img');
        if (img && img.complete) {
            if (img.width > img.naturalWidth || img.height > img.naturalHeight) {
                productImageStretched = true;
            } else if (productImageStretched === undefined) {
                productImageStretched = false;
            }
            productCheckImageSize();
        } else if (img && !img.complete) {
            setTimeout(doCheck, 500);
        }
    }
    doCheck();
}

productCheckImageSize = function()
{
    if (productImageStretched === undefined) {
        productCheckImageStretched();
    } else if (productImageStretched) {
        var img = document.getElementById('main_image_img');
        productMainImageUrl = img.src.replace('standard', 'giant');
        var giantImg = new Image();
        giantImg.src = productMainImageUrl;
        giantImg.onload = function() {
            if (giantImg.src == productMainImageUrl && giantImg.naturalWidth == giantImg.naturalHeight) {
                img.src = productMainImageUrl;
            }
        };
    }
}


function storeLocatorAnnotateProduct(productId) {
    var params = {
        "action": "get_products_in_favorite_store",
        "pids": [productId]
    };
    $j.ajax({
        type: "POST",
        url: ajaxFormatUrl("Shop/StoreLocator/Request"),
        data: params,
        success: function(data) {
            var keys = [];
            try {
                keys = $j.parseJSON(data);
            } catch(e) {}
            if (keys.length) {
                $j("#product_tabbed_page .product-tags-extra").append(
                    '<span class="favstore-product-tag" title="This product is available at your favorite store."></span>'
                );
            }
        }
    });
}

