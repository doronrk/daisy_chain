// ======================
// = Wishlist namespace =
// ======================
YAHOO.namespace('speedfc.product.wishlist');
YAHOO.speedfc.product.wishlist = {
    //the panel where the added to wishlist info will reside
    panel :  null,
    //set of values that we need to 
    p : {
        item_id : null,
        qty : null,
        size : null,
        color : null
    },
    //info that will be sent through POST
    postData : null,
 
    /**
     * function to add an item to the wishlist
     * @param {Object} sku_selection
     */
    add : function(sku_selection,redirect) {
        
        if(sku_selection.size_id == "") {
            alert('Please select a size.');
            return false;
        }
        
        var oThis = YAHOO.speedfc.product.wishlist;
        
        oThis.p.item_id = sku_selection.item_id;
        oThis.p.qty     = sku_selection.qty;
        oThis.p.size    = sku_selection.size_id;
        oThis.p.color   = sku_selection.color_id;
        
        oThis.makeRequest("add",redirect);
        return false;
    },
    
    /**
     * removes an item from the wishlist
     * @param {Object} id
     */
    rm : function(id){
        var oThis = YAHOO.speedfc.product.wishlist;
        oThis.p.item_id = typeof id == "undefined" ? document.getElementById("item_hidden_0").value : id;

        oThis.makeRequest("remove");
        return false;
    },
    
    /**
     * makes an add/rm wishlist ajax request depending on passed parameter
     * @param {Object} action
     */
    makeRequest : function(action,redirect){
        var oThis = YAHOO.speedfc.product.wishlist;

        ajax = redirect ? false : true;
        oThis.preparePostData(ajax);
        if(redirect) {
        	url = "/wishlist/" + action + "?data"+ oThis.postData;
        	document.location = url;
        } else {
        	return YAHOO.util.Connect.asyncRequest('POST', "/wishlist/"+action, oThis.callback, oThis.postData);
        }
    },
    
    /**
     * builds the post data for the ajax request
     */
    preparePostData :  function(ajax){
        var oThis = YAHOO.speedfc.product.wishlist;
        oThis.postData = '';
        for(var i in oThis.p){
            oThis.postData += "&"+i.substr(0,1)+"="+oThis.p[i];
        }
        
        if(ajax) {
        	oThis.postData += '&ajax=true';
    	}
    },
    
    /**
     * defines what to do with the ajax response from adding or removing an item to the wishlist
     * @param {Object} o
     */
    callback : {
        success : function(o){
            var oThis = YAHOO.speedfc.product.wishlist;
            if (o.responseText == undefined) return false;
            
            //in case the add to cart popup is open, hide it
            if (typeof wait != 'undefined'){ wait.hide(); }
            responses = o.responseText.split('<br />');
            oThis.prepareHeader(responses[0]);
            // responses contains an array with the fowllowing content
            // 0 = content to be displayed in the pop up
            // 1 = number of items in wishlist
            // 2 = when add was executed contains a link to remove the item from wishlist / when remove was executed contains icon link to add to wishlist
            // 3 = only when remove was executed and contains a link to add the item to wishlist
            if(responses.length == 3) //we added item to wishlist
                oThis.lnkFavorites(responses[2]);
            else //we removed item from wishlist
                oThis.lnkFavorites(responses[2],responses[3]);
                
            //display wishlist items count
            var wishlist = document.getElementById("wishlist_counter");
            if(wishlist) wishlist.innerHTML = responses[1].replace(new RegExp("^[\\s]+", "g"), "");
        },
        failure : function(o){
            if (o.responseText == undefined) return false;
            var error_body = "<div id='add_to_wishlist_overlay'>"+
                                "<div>"+
                                    "<div class='bagDescription'>&nbsp;</div>"+
                                        "<div class='item_container'>There was an error <b>adding</b> this item to your wishlist."+
                                    "</div>"+
                                    "<div class='view_fav_btn'>&nbps;</div>"+
                                "</div>"+
                            "</div>";            
            YAHOO.speedfc.product.wishlist.prepareHeader(error_body);
        }
    },
    
    /**
     * if the add/rm to wishlist sent a response, display it in the pop up, otherwise we redirect to the wishlist page
     * @param {Object} text
     */
    prepareHeader : function(text){
        if (text == '') {
            window.location = '/wishlist';
            return;
        }        
        YAHOO.speedfc.product.wishlist.openList(text);
    },
    
    /**
     * shows a pop up with the item added to the wishlist
     * @param {Object} text
     */
    openList : function(text){        
        YAHOO.speedfc.product.wishlist.panel = new YAHOO.speedfc.utilities.sfcPanel('header_wishlist_last_item');
        YAHOO.speedfc.product.wishlist.panel.setProperties(
                    {
                      width:'180px',
                      context: [ document.getElementById("addto_wishlist") , 'tl', 'bl'],
                      fixedcenter: false,
                      iframe:true,
                      close:false,
                      zindex:300,
                      modal:false,
                      constraintoviewport: false,
                      scope:this
                    });
        YAHOO.speedfc.product.wishlist.panel.setBody(text);
        YAHOO.speedfc.product.wishlist.panel.show();
        
        setTimeout('window.scrollTo(0, 0)',1);
        setTimeout("YAHOO.speedfc.product.wishlist.panel.hide();YAHOO.speedfc.product.wishlist.panel.setBody('');",5000);
    },
    
    /**
     * changes the "add to wishlist"/"remove from wishlist" link in the product information section (pdp/quickview)
     */
    lnkFavorites : function(){
        var icon = document.getElementById('rowFavoritesLnk_icon');
        var text = document.getElementById('rowFavoritesLnk');
        if(!text)
            return;
        
        if(arguments.length > 1){
            icon.innerHTML = arguments[0];
            text.innerHTML = arguments[1];
        }
        else{
            icon.innerHTML = "";
            text.innerHTML = arguments[0];
        }
    }
};