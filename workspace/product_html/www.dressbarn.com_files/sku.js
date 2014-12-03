// ====================
// = Common namespace =
// ====================
YAHOO.namespace('speedfc.product.sku');

YAHOO.speedfc.product.sku.SkuSelection = function (line_id, color_id, size_id, qty, item_id) {

    // a sku is formed by the combination of color & size in an item
    //item instance on screen
    this.line_id             = line_id;
    //current selected color id
    this.color_id            = color_id;
    //current selected size id
    this.size_id             = size_id;
    //current selected qty
    this.qty                 = qty;
    //array(swatch_pad[0] = array(color[0] = array(size[0], size[1]), etc...))s
    this.colors              = new Array();
    this.color_size          = new Array();
    this.dbskucodes          = new Array();
    this.skucodes            = new Array();
    this.skuinv              = new Array();
    //default values
    this.defaults            = new Array();
    this.defaults['color']   = color_id;
    this.defaults['size']    = size_id;
    this.defaults['qty']     = qty;
    //array with available qty for each sku (array(sku[1] = x, etc...))
    this.available           = new Array();
    this.available_confirmed = new Array();
    //enable/disable backorders per sku
    this.backorderable       = new Array();
    //If there is a limit for the backorder it will be stored here.
    this.qty_on_order        = new Array();
    //stores the cartline image container name
    this.imageElementId      = 'thumb_img_';
    //item id
    this.item_id             = item_id;
    //swatches row identifier
    this.swatch_pad          = 0;
    //array to store wheter a sku is in clearance or no (is_clearance = true in sku table)
    this.is_clearance        = new Array();
    //to enable 0 in qty combo (useful for bundle pages)
    this.enable_zero         = false;
    //stores friendly product name
    this.item_desc			= "";
    //Stores the current item availability
    this.isAvailable = true;

    //tells if we need to hide swatches when a swatch_pad has 1 color only
    this.enable_swatches_hiding = true;
    
    this.swatch_current_class = "";
    this.swatch_cont_current_class = "";

    //the id that represents no size
    this.no_size = '0000';
    
    //the id that represents no color
    this.no_color = '0000';


    /**
     * adds the available qty to be purchased of a sku
     * @param {String} sku_id id of the current sku
     * @param {Integer} qty_available current sku quantity available.
     * @param {boolean} is_clearance indicates if the current item is in clearance.
     * @param {boolean} backorderable indicates if the current item is backorderable.
     * @param {Integer} qty_on_order indicates the limit for backorders.
     */
    this.addAvailable = function(sku_id, qty_available, is_clearance, backorderable, qty_on_order) {
        this.available[sku_id] = qty_available;
        this.is_clearance[sku_id] = is_clearance;
        this.backorderable[sku_id] = backorderable;
        this.qty_on_order[sku_id] = qty_on_order;
    }

    /**
     * fills in the main array with the colors, sizes (skus) of the item
     * @param {Object} swatch_pad
     * @param {Object} color_id
     * @param {Object} size_id
     * @param {Object} description
     * @param {Object} price
     * @param {Object} sale_price
     * @param {Object} sku_id
     */
    this.addSize = function(swatch_pad, color_id, size_id, description, price, sale_price, sku_id) {
        if (typeof this.color_size[swatch_pad] == 'undefined')
            this.color_size[swatch_pad] = new Array();

        if (typeof this.color_size[swatch_pad][color_id] == 'undefined')
            this.color_size[swatch_pad][color_id] = new Array();

        this.color_size[swatch_pad][color_id][size_id] = new Array();
        this.color_size[swatch_pad][color_id][size_id]['description'] = description;
        this.color_size[swatch_pad][color_id][size_id]['price'] = price;
        this.color_size[swatch_pad][color_id][size_id]['sale_price'] = sale_price;
        this.color_size[swatch_pad][color_id][size_id]['sku_id'] = sku_id;
    }

    this.colorExists = function(color_id){
        for(var c in this.colors){
            if(c == color_id)
                return true;
        }

        return false;    
    },
    
    this.addColor = function(color_id, color_name){
        //make sure not to duplicate colors
        if(!this.colorExists(color_id))
            this.colors[color_id] = color_name;    
    },

    /**
     * modifies the combo to show only the available qty for clearance items
     */
    this.setQtyCombo = function() {
        var sku_id = "";
        if (this.size_id) {
            if(typeof this.color_size[this.swatch_pad][this.color_id][this.size_id] != 'undefined')
                sku_id = this.color_size[this.swatch_pad][this.color_id][this.size_id]['sku_id'];
            else{
                //if we are here it means the item has 1 color 2 sizes with different price each, so there are 2 rows of swatches
                //but they are not displaying and size combo shows the 2 sizes. The user selected the size for the swatch that is not
                //selected and therefore the value stored in this.swatch_pad is not the actual swatch pad
                for(var i = 0; i < this.color_size.length; i ++){
                    if (typeof this.color_size[i][this.color_id][this.size_id] != 'undefined') {
                        sku_id = this.color_size[i][this.color_id][this.size_id]['sku_id'];
                        break;
                    }
                }
            }
        }
        else
        if (this.defaults["size"] &&
            typeof this.color_size[this.swatch_pad] != "undefined" &&
            typeof this.color_size[this.swatch_pad][this.color_id] != "undefined" &&
            typeof this.color_size[this.swatch_pad][this.color_id][this.defaults["size"]] != "undefined" &&
            typeof this.color_size[this.swatch_pad][this.color_id][this.defaults["size"]]['sku_id'] != "undefined") {
            sku_id = this.color_size[this.swatch_pad][this.color_id][this.defaults["size"]]['sku_id'];
        }

        //By default the qty displayed in the combo box will be 9
        var qty = 9;
        if(sku_id != "" && this.available[sku_id] <= qty && !this.backorderable[sku_id]) {
            qty = this.available[sku_id];
            this.current_sku_id = sku_id;
        }

        
        if(sku_id != "" && this.backorderable[sku_id]){
            if(Number(this.available[sku_id]) + Number(this.qty_on_order[sku_id]) < qty){
                qty = Number(this.available[sku_id]) + Number(this.qty_on_order[sku_id]);
            }

            if (qty<0) {
                qty = 0;
            }
        }

        var qtyCmb = document.getElementById('qty_select_' + this.line_id);
        var qty_tag = document.getElementById('qty_text_tag_' + this.line_id);
        //if available qty is 0 don't display the qty combo
        if (qty <= 0) {
            if(qty_tag){
                qty_tag.style.display = 'none';
            }
            qtyCmb.style.display = 'none';
        }
        else {
            if(qty_tag){
                qty_tag.style.display = '';
            }
            qtyCmb.style.display = '';
        }


        while (qtyCmb.options.length > 0) qtyCmb.remove(0);
        var start = 1;
        //sometimes we want to start combo from 0 (like in a bundle where they can choose qty 0 for some items)
        if(this.enable_zero == true){
            start = 0;
        }
        for(var i=start; i<=qty; i++)
            this.addOption(qtyCmb, i, i);
        if (this.qty > qty)
            this.qty = start;
        else {
            if(this.enable_zero || this.qty == 0)
                qtyCmb.selectedIndex = this.qty;
            else
                qtyCmb.selectedIndex = this.qty-1;
        }
    },
    
    /**
     * sets the out status on the swatch
     * @param {Object} color_id  clicked color
     * @param {Object} swatch_pad swatchpad where the swatch is
     */
     this.outColor = function(color_id, swatch_pad){
        var swatch_container;
        var swatch;

        swatch = document.getElementById('swatch_' + this.line_id + '_' + swatch_pad + '_' + color_id);
        swatch_container = document.getElementById('s_container_' + this.line_id + '_' + swatch_pad + '_' + color_id);        

        if(typeof swatch_container != 'undefined' && (typeof this.swatch_cont_current_class != 'undefined'))
            swatch_container.className = this.swatch_cont_current_class;

        if(typeof swatch  != 'undefined' && (typeof this.swatch_current_class  != 'undefined'))
            swatch.className = this.swatch_current_class;     
     },    
     
    /**
     * sets the over status on the swatch
     * @param {Object} color_id  clicked color
     * @param {Object} swatch_pad swatchpad where the swatch is
     */
     this.overColor = function(color_id, swatch_pad){
        var swatch, swatch_container;
        
        swatch = document.getElementById('swatch_' + this.line_id + '_' + swatch_pad + '_' + color_id);
        swatch_container = document.getElementById('s_container_' + this.line_id + '_' + swatch_pad + '_' + color_id);        

        //draw border on swatch container
        if(typeof swatch_container != 'undefined'){
            this.swatch_cont_current_class = swatch_container.className;
            swatch_container.className = 'swatch_container swatch_container_selected';
        }

        //draw inside border on swatch
        if(typeof swatch  != 'undefined'){
            //get current class
            this.swatch_current_class = swatch.className;

            if(color_id+""=="001" && swatch.color_id+""=="001")
                swatch.className = 'swatch-white selected';
            else
                swatch.className = 'swatch selected';
        }        
 
     },
     
     this.setColorCombo = function(selected_color_id){
        var colorCmb = this.getColorSelect();
        if(colorCmb)
        {
            if (colorCmb.length > 0)
            {
                //empty combo to regenerate options
                while (colorCmb.options.length > 0) colorCmb.remove(0);
            }

            //add new options to combo
            var c_index = 0;
            var skip = false;
            for(var idx=0; idx < this.color_size.length; idx++){
                for(var i in this.color_size[idx])
                {
                    skip = false;
                    if (this.colors[i])
                    {
                        //avoid adding elements that aren't colors
                        //alert(colorCmb.options);
                        for(var index_cmb = 0; index_cmb < colorCmb.options.length; index_cmb ++){
                        
                            if(colorCmb.options[index_cmb].text == this.colors[i]) skip = true;;
                        }
                        if(!skip){
                            this.addOption(colorCmb, this.colors[i], i);

                            if(i == selected_color_id)
                            {
                                colorCmb.selectedIndex = c_index;
                            }
                            c_index++;
                        }
                    }
                }
            }

        }     
     },
     
     this.getColorSelect = function(){

        return YAHOO.util.Dom.get('color_id_' + this.line_id);

     },
     
     this.selectColorInCombo = function(color_id, swatch_pad, rootNode){
        if(color_id){
            //if the user is selecting colors from the combo-box,
            //get the right swatchpad
        	if (typeof YAHOO.speedfc.product.detail.color_swatchpad != 'undefined' && YAHOO.speedfc.product.detail.color_swatchpad != null) {
                if(typeof rootNode != 'undefined')
                    swatch_pad = YAHOO.speedfc.product.detail.color_swatchpad[rootNode][color_id]; 
                else
                    swatch_pad = YAHOO.speedfc.product.detail.color_swatchpad[color_id]; 
        	}   
            this.selectColor(color_id, swatch_pad,rootNode);         		

            //Google Event Tracker functions
            var isAvailable = this.isAvailable; //Initializing variable to prevent 'undefined' problems
            
            setTimeout(function(){
        				trackingEventPDPSelectColor(this.item_desc,color_id,isAvailable);
					},
					20
            	);
            
        }else
            this.setDefaults();        
     },
     
     this.addSwatchpadRelation = function(color_id, swatchpad, rootNode){
        if(typeof rootNode != 'undefined'){
            if (typeof color_swatchpad[rootNode] == 'undefined')
                color_swatchpad[rootNode] = new Array();    
            color_swatchpad[rootNode][color_id] = swatchpad;
        }else{
            color_swatchpad[color_id] = swatchpad;
        }        
     },
     
    /**
     * sets the color to the clicked color
     * @param {Object} color_id  clicked color
     * @param {Object} swatch_pad swatchpad where the clicket swatch is
     */
    this.selectColor = function(color_id, swatch_pad, rootNode) {

        this.color_id  = color_id;
        //sets the input hidden to the clicked color
        this.getColorSelect().value = color_id;

        //hide all onmouseover labels
        //YAHOO.speedfc.product.detail.hideSwatchName(this.line_id);

        //this segment is to clear the row of swatches where the selected swatch was
        var swatch = document.getElementById('swatches_' + this.line_id + "_" + this.swatch_pad);
        var swatches = YAHOO.util.Dom.getElementsByClassName('swatch', 'div', swatch);
        for (var i = 0; i < swatches.length; i++) {
            swatches[i].className = 'swatch';
        }

        //now we need to get the row of swatches where the clicked swatch is
        swatch = document.getElementById('swatches_' + this.line_id + "_" + swatch_pad);
        swatches = YAHOO.util.Dom.getElementsByClassName('swatch', 'div', swatch);

        if (swatch_pad == null) {
            swatch_pad = 0;
        }
        
        this.swatch_pad = swatch_pad;

        swatch = document.getElementById('swatch_' + this.line_id + '_' + swatch_pad + '_' + color_id);
        
        if (swatch == null) {
          color_nodes = YAHOO.util.Dom.getElementsByClassName('swatch', 'div');
          if (color_nodes.length) {
              for (color_node in color_nodes) {
            	  color_array = color_nodes[color_node].id.split('_')
            	  if (color_array[3] == color_id) {        		
            		swatch = color_nodes[color_node];
            		swatch_pad = color_array[2];
            		this.swatch_pad = swatch_pad;
            		break;
            	  }        	  
              }        	  
          }
        }
        
        var swatch_container;
        swatch_container = document.getElementById('s_container_' + this.line_id + '_' + swatch_pad + '_' + color_id);

        var ddColor = this.getColorSelect();
        //in case the call is from the cart (dropdown box) ignore the swatch divs
        if(swatch) {
            swatch.className = 'swatch selected';
            if(typeof swatch_container != 'undefined')
            {
                //clear swatch_container selected
                var swatch_containers = YAHOO.util.Dom.getElementsByClassName('swatch_container_selected', 'div');

                //alert(swatch_containers.length);
                for (var i = 0; i < swatch_containers.length; i++)
                {
                    swatch_containers[i].className = 'swatch_container';
                }

                //select the one
                swatch_container.className = 'swatch_container swatch_container_selected';
                this.swatch_current_class = swatch.className;
                this.swatch_cont_current_class = swatch_container.className;
            }            
        }else{
            for (var j  = 0; j < ddColor.length; j++ ) {
                if (ddColor.options[j].value == color_id) {
                    ddColor.selectedIndex = j;
                }
            }        
        
        }
        //update color combo
        this.setColorCombo(color_id);

        var ddSize = document.getElementById('size_select_' + this.line_id);

        //  + without this check IE6 breaks
        //  if the cart takes long to load, cart line elements in DOM won't be found
        //  so the function won't do the change, without error reporting in IE6
        if (typeof ddSize != 'undefined' && ddSize != null){
            while (ddSize.options.length > 1) ddSize.remove(1);
        }

        //This checks for single swatches (single color) on price ranges, so that all sizes are added to the single
        //size combo.
        //TO-DO check all price ranges so that if one of them has more than one color, do not apply this logic.
        var single_swatch = true;
        if (swatches.length > 1) {
            single_swatch = false;
        }

        if (single_swatch && this.enable_swatches_hiding) {
            for (var swatch_pad in this.color_size) {
                for (var color_id in this.color_size[swatch_pad]) {
                    for (var size_id in this.color_size[swatch_pad][color_id]) {
                        if (typeof this.color_size[swatch_pad][color_id][size_id] != 'function' &&
                            (typeof this.color_size[swatch_pad][color_id][size_id] != 'undefined')) {
                            this.addOption(ddSize, this.color_size[swatch_pad][color_id][size_id]['description'], size_id);
                        }
                    }
                }
            }
        }else {
        	if (!swatch_pad) {
        		swatch_pad = this.line_id;
        	}
            for (var size_id in this.color_size[swatch_pad][color_id]) {
                if (typeof this.color_size[swatch_pad][color_id][size_id] != 'function' &&
                    (typeof this.color_size[swatch_pad][color_id][size_id] != 'undefined')) {
                    this.addOption(ddSize, this.color_size[swatch_pad][color_id][size_id]['description'], size_id);
                }
            }
        }

        //  + only do this stuff if we have a ddSize element to work on...
        if (typeof ddSize != 'undefined' && ddSize != null){

            // if we only have one size, don't display combo, just label (except size = no size for which we don't even display label)
            if (ddSize.length == 2 && (ddSize.options[0].text == "Select Size" || ddSize.options[0].text == "Size")) {
                ddSize.style.display = 'none';
                var size_tag = document.getElementById('size_text_tag_'+this.line_id);
                if (size_tag) size_tag.style.display='none';
                ddSize.selectedIndex = 1;
                this.setSize(ddSize.options[1].value);
                
                if (this.defaults['size'] == '') {
                    this.defaults['size'] = this.size_id
                }
                
                sizeObj = document.getElementById('size_alt_text_tag_' + this.line_id);
                if(sizeObj) {
	                if (ddSize.options[1].value != this.no_size) {
	                	sizeObj.style.display = '';
	                	sizeObj.innerHTML = "Size: " + ddSize.options[1].text;
                        //EnsightenDatalayer//
                        PDP.size= ddSize.options[1].text;
	                } else {
	                	sizeObj.style.display = 'none';
	                }
                }
            }
            else{
                ddSize.style.display = '';
                var size_alt_text = document.getElementById('size_alt_text_tag_'+ this.line_id);
                if(typeof size_alt_text != 'undefined' && size_alt_text != null) {
                	size_alt_text.style.display = 'none';
                }
                //changed selection functionality to hold selected size 
                //this.setSize(ddSize.options[0].value);
                if (this.defaults['size'] == '') {
                    this.defaults['size'] = this.size_id
                    };
            }
        }

        try{
            this.selectSize(this.size_id);
        }catch(ex){

        }

        this.replaceImg();
        this.setDBSkuCode(color_id);

    }

    //  +   addOption(select_elem, label, value)
    //
    //  adds the new label value pair to a select / drop down menu
    //  @params:
    //              select_elem     id of the form element
    //              label           label for the new value
    //              value           new value to associate
    //  @returns:   boolean
    //              true    if the addition was successful
    //              false   otherwise
    //
    //  if the cart takes long to load, cart line elements in DOM won't be found
    //  so the function won't do the change, without error reporting in IE6
    //
    this.addOption = function(select_elem, label, value) {
        if (typeof label == 'undefined') return false;

        //  + without this check IE6 breaks
        if (typeof select_elem == 'undefined' || select_elem == null) return false;

        var opt = new Option(label, value);
        try {
            select_elem.add(opt, null); // standards compliant
        } catch(ex) {
            select_elem.add(opt); // IE only
        }
        return true;
    }

    /**
     * sets the current SkuSelection size drop down to the current value
     *
     * @param {Object} size_id string with the size to be selected
     * @return boolean true    if the change was successful / false   otherwise
     */
    this.selectSize = function(size_id) {
        var ddSize = document.getElementById('size_select_' + this.line_id);
        if (ddSize) {
            for (var i  = 0; i < ddSize.length; i++ ) {
                if (ddSize.options[i].value == size_id) {
                    ddSize.selectedIndex = i;
                    if(size_id == this.no_size) {
                        ddSize.style.display = 'none';
                        document.getElementById('size_text_tag_'+this.line_id).style.display='none';
                    }
                    return true;
                }
            }
        }
        this.size_id = null; // Size not found
        return false;
    }

    /**
     * sets the current SkuSelection quantity drop down to the current value
     * @param {Object} qty integer, to be selected in the element
     */
    this.selectQty = function(qty) {
        var qtyCmb = document.getElementById('qty_select_' + this.line_id);
        YAHOO.speedfc.utilities.common.setSelectValue('qty_select_' + this.line_id, qty);
        return true;
    }

    /**
     * sets item size and enables/disables add to cart btns
     * @param {Object} size_id
     */
    this.setSize = function(size_id) {
    	var change = (this.size_id != size_id);
    	var productName = this.item_desc;
        this.size_id = size_id;
        this.setQtyCombo();
        this.skuAvailableOffline();
        var callback = {
            success: function(o) {
            	var response = YAHOO.lang.JSON.parse(o.responseText);
            	this.isAvailable = ( response.available == "true" );
                var atc = document.getElementById('atc');
                var atc_off = document.getElementById('atc_off');
                //in bundle detail page we have two sets of buttons so don't use this there
                var atc1 = document.getElementById('atc1');
                var atc_off1 = document.getElementById('atc_off1');
                if (atc1 == null
                    && atc != null
                    && typeof atc != undefined
                    && atc_off != null
                    && typeof atc_off != undefined) {
                    if (response.available == "true" && (this.size_id || this.size_id != '')) {
                    	atc.style.display = 'inline';
                        atc_off.style.display = 'none';
                    }
                    else {
                        atc.style.display = 'none';
                        atc_off.style.display = 'inline';
                    }
                }
                
                //Google Event Tracking function
                if(change){
                	trackingEventPDPSelectSize(productName,size_id,this.isAvailable);
                }
                
            },
            failure: function(o) {
            }
        };
        postData = 'item=' + this.item_id + '&color=' + this.color_id + '&size=' + this.size_id;
        YAHOO.util.Connect.asyncRequest('POST', '/detail/checkOnlineAvailability', callback, postData);
    }

    /**
     * sets the item id
     * @param {Object} item_id
     */
    this.setItemId = function(item_id) {
        this.item_id = item_id;
    }

    /**
     * sets the current qty
     * @param {Object} qty
     */
    this.setQty = function(qty) {
        if(!qty){
            if(this.enable_zero == true)
                qty = 0;
            else
                qty = 1;
        }
        this.qty = qty;

        //this is to enable or disable add to cart buttons in bundle
        if(document.getElementById('atc_off1') != null && skuSelect[0] != null){
            //since there is more than 1 atc btn and skuSelect is an array, we are in a bundle
            var activate_btn = false;
            for(var i = 0; i < skuSelect.length; i++){
                if (skuSelect[i].qty > 0) {
                    activate_btn = true;
                    break;
                }
            }
            var atc = document.getElementById('atc');
            var atc_off = document.getElementById('atc_off');
            var atc1 = document.getElementById('atc1');
            var atc_off1 = document.getElementById('atc_off1');
            if(activate_btn){
                atc.style.display = 'inline';
                atc_off.style.display = 'none';
                if (atc1 != null && atc_off1 != null) {
                    atc1.style.display = 'inline';
                    atc_off1.style.display = 'none';
                }
            }
            else{
                atc.style.display = 'none';
                atc_off.style.display = 'inline';
                if (atc1 != null && atc_off1 != null) {
                    atc1.style.display = 'none';
                    atc_off1.style.display = 'inline';
                }
            }
        }
    }

    /**
     * determines if swatches should be hidden when only one color swatch (when a swatch_pad contains more than 1 color disable swatches hiding)
     */
    this.hideSwatchPads = function() {
        if (this.color_size.length == 1) {
            return;
        }

        for (var swatch_pad in this.color_size) {
            for (var color_id in this.color_size[swatch_pad]) {
                if (this.color_size[swatch_pad].length > 1) {
                    this.enable_swatches_hiding = false;
                    return;
                }
            }
        }
    }

    /**
     *
     * @param {Object} line_id
     *          when line_id is 0 or positive number then the combo line id and swatch pad id are the same. The value would be the given as param for both
     *          when line_id is negative number then the combo line id and the swatch pad id will be different. The value for the swatch pad id will be the absolute value of the given param
     *              and the value for the combo line id would be 0
     */
    this.setDefaults = function(line_id){
        
        if (line_id == null || line_id == 0) {
            
            line_id = 0;
            this.line_id = line_id;
            
        }else if (line_id > 0) {
            
            this.line_id = line_id
            
        }else if (line_id < 0) {
            
            line_id = Math.abs(line_id);
            this.line_id = 0;
            
        }
        
        this.hideSwatchPads();
        this.selectColor(this.defaults['color'], line_id); //select the default color in the first row of swatches
        this.setColorCombo(this.defaults['color']);
        this.selectSize(this.defaults['size']);
        this.setQtyCombo();
        this.selectQty(this.defaults['qty']);
        this.setQty(this.defaults['qty']);
        this.setDBSkuCode(this.defaults['color']);

    }

    // TODO: Fix me for all image types
    /**
     * replaces item image
     */
    this.replaceImg = function() {
        var img = document.getElementById(this.imageElementId + this.line_id);
        if (this.imageFunction) {
            this.imageFunction("",this.item_id + '_' + this.color_id);
            return;
        }
        if (!img) return;
        img.src = img.src.replace(/[0-9]+_[0-9]+.jpg/, this.item_id + '_' + this.color_id + '.jpg');
    }

    /**
     * returns either the current item_id, color_id, size_id, or qty
     * @param {Object} var_name
     */
    this.getValue = function(var_name){
        var variables = [];
        variables['item_id'] = this.item_id;
        variables['color_id'] = this.color_id;
        variables['size_id'] = this.size_id;
        variables['qty'] = this.qty;
        return variables[var_name];
    }
    
    //Returns the sku sale price
    this.getSalePrice = function(){
    	if( (this.color_id != "") && (this.size_id != "") ){
    		return this.color_size[this.swatch_pad][this.color_id][this.size_id]["sale_price"];
    	}
    	return null;
    }
    
  //Returns the sku price
    this.getPrice = function(){
    	if( (this.color_id != "") && (this.size_id != "") ){
    		return this.color_size[this.swatch_pad][this.color_id][this.size_id]["price"];
    	}
    	return null;
    }

    // returns false if the user doesn't want to backorder the item.
    this.checkAvailable = function() {
        var sku_id = this.color_size[this.swatch_pad][this.color_id][this.size_id]['sku_id'];
        if ( typeof this.available[sku_id] != 'undefined'
        && ( (this.available[sku_id] <= 0) || (this.available[sku_id] - this.qty < 0) ))
        {
            if (typeof this.available_confirmed[sku_id] == 'undefined'){
                if(this.backorderable[sku_id]){
                    return this.confirmBackorder(sku_id);
                }
                return false;
            }
        }
        delete this.available_confirmed[sku_id];
        return true;
    };

    // the confirmation box
    this.confirmBackorder = function(sku_id) {

            confirm_bo = new YAHOO.speedfc.utilities.sfcPanel("confirmbo");
            confirm_bo.setProperties(
                                        {
                                            width: "286px",
                                            fixedcenter: true,
                                            constraintoviewport: true,
                                            underlay: "shadow",
                                            close: false,
                                            visible: false,
                                            draggable: false,
                                            modal: true
                                        });

            ss = this;
            YAHOO.speedfc.product.sku.yes_action = function(){
                ss.available_confirmed[sku_id] = 1;
                confirm_bo.hide();
                ss.addToBag();
                return true;
            };
            YAHOO.speedfc.product.sku.no_action = function(){
                confirm_bo.hide();
                return false;
            };

            body = '<div>'+
                       '<form action="#">'+
                           'We\'re Sorry, that item is currently on back order. Would you still like'+
                           'to add it to your shopping bag?<br/><br/>'+
                           '<div style="margin-top: 5px">'+
                               '<a href="#" onclick="return YAHOO.speedfc.product.sku.yes_action();">Yes, I still want it.</a><br/>'+
                               '</div><div style="margin-top: 5px">'+
                               '<a href="#" onclick="return YAHOO.speedfc.product.sku.no_action();">No, thanks.</a><br/>'+
                           '</div>'+
                       '</form>'+
                   '</div>';

            confirm_bo.setBody(body);
            confirm_bo.show();

            var underlay = document.getElementById('confirmbo_mask');
            if(underlay)
                YAHOO.util.Event.addListener(underlay, "click", function(){confirm_bo.hide();});

    };

    /**
     * adds sku to bag
     */
    this.addToBag = function() {
        if (!this.checkSizeQty()) return;
        var sku_id = sku_id = this.color_size[this.swatch_pad][this.color_id][this.size_id]['sku_id'];
        if (this.backorderable[sku_id] && !this.checkAvailable()) return;

        var postData = 'i=' + this.item_id + '&c=' + this.color_id + '&s=' + this.size_id + '&q=' + this.qty;

        var sUrl = "/cart/ajaxadd";

        outerThis = this;
        var callback = {
            success:function(o) {
                if (typeof weAreInCart != "undefined" && weAreInCart == true) {
                    window.location.reload();
                    return;
                }
                if (o.responseText == undefined) return;
                if (typeof wait != 'undefined') wait.hide();

                //check if item was added or there was an availability change
                var add_success = o.responseText.match(/<br \//i);
                var availability = o.responseText.match(/exceeds the available/);
                if(add_success){
                    responses = o.responseText.split('<br />');
                    YAHOO.speedfc.cart.add.open_header_cart(responses[0]);
                    document.getElementById('shopping_bag_counter').innerHTML = responses[1];
                    YAHOO.speedfc.product.detail.updateRecent();
                    if (typeof quickViewPanel != 'undefined') {
                        quickViewPanel.hide();
                    }
                }
                else if(availability) {
                    var instance = o.argument.extvar;
                    //we've requested more than the available qty 
                    var availableQty = o.responseText.match(/<span class="hidden">(.*)<\/span>/i);
                    var sku_id = instance.color_size[instance.swatch_pad][instance.color_id][instance.size_id]['sku_id'];
                    instance.available[sku_id] = availableQty[1];
                    instance.setQtyCombo();
                    instance.selectQty(availableQty[1]);
                    instance.qtyChangeMsg(o.responseText);
                }

                var restriction_limit = o.responseText.match(/<span class="hidden">restriction_limit<\/span>/);
                if(restriction_limit){

                    var instance = o.argument.extvar;
                    //we've requested more than the available qty
                    responses = o.responseText.split('<span class="hidden">restriction_limit</span>');
                    instance.qtyChangeMsg(responses[1]);
                }
                var _response=document.createElement('div');
                _response.innerHTML=o.responseText;
                var sc_code = YAHOO.util.Selector.query('#sc_add', _response)[0];
                eval(sc_code.innerHTML);
            },
            failure:function(o) {
                if (o.responseText == undefined) return;
                YAHOO.speedfc.cart.add.open_header_cart("There was an error while adding the item to your bag.");
            },
            argument: {
                extvar: this
            }
        };

        return YAHOO.util.Connect.asyncRequest('POST', sUrl, callback, postData);
    }

    /**
     * sends a notification about qty being changed in cart because there's no enought stock to fullfill clients order
     * @param {Object} content
     */
    this.qtyChangeMsg = function(content) {
        confirm_box = new YAHOO.speedfc.utilities.sfcPanel("confirmbox");
        confirm_box.setProperty("width", "286px");
        confirm_box.setBody(content);
        confirm_box.setOnCloseFunction(function(){
            //display quantity and size combos
            e = document.getElementById('combos_qs');
            e.style.display = 'block';
        });

        //hide quantity and size combos
        e = document.getElementById('combos_qs');
        if(e){
            e.style.display = 'none';
        }

        confirm_box.show();
    }


    /**
     * opens the window where the user can print the item details
     */
    this.printPopup = function() {
        var sUrl = "/detail/print";
        var params = '/' + this.item_id + '/' + this.color_id;
        if(this.size_id && this.qty)
            params += '/' + this.size_id + '/' + this.qty
        YAHOO.speedfc.utilities.common.popup(sUrl+params, 'print', 580, 761, true);
    }

    /**
     * shows the send details pop up
     */
    this.showSendDetails = function() {
        var callback = {
            success: function(o) {
                send_details = new YAHOO.speedfc.utilities.sfcPanel("send_details");
                send_details.setProperties(
                                        {
                                            width:"380px",
                                            x: (document.documentElement.clientWidth - 380)/2,
                                            y: 54,
                                            visible:false,
                                            draggable:false,
                                            modal:true
                                        }
                );

                send_details.setBody(o.responseText);

                if (typeof quickViewPanel != 'undefined') {
                    quickViewPanel.hide();
                };
                scroll(0,0);
                send_details.show();
                return false;
            },
            failure: function (o) {}
        };

        YAHOO.util.Connect.asyncRequest(
            'POST',
            '/detail/sendDetailsToFriend/',
            callback,
            'item=' + this.item_id + '&color=' + this.color_id
            );
    }

    /**
     * determines in current sku is available in "My Store" (My store must have been set previously)
     */
    this.availableInLocalStore = function(){
        if(document.getElementById("local_store_info_"+this.line_id) == null) return;
        var cookie = YAHOO.speedfc.product.detail.getCookie("local_store");
        if (!cookie) {
            document.getElementById("local_store_info_"+this.line_id).style.display = "none";
            return;
        }
        var local_store = cookie.split("_");

        var callback = {
            success: function(o) {
                var skuSelection = o.argument.extvar;
                var response = YAHOO.lang.JSON.parse(o.responseText);
                if(response.error)
                    return;
                var availability;
                for (var i = 0, len = response.length; i < len; ++i) {
                    availability = "<span class='out_stock'>Out of Stock</span>";
                    if(response[i].availability > 0)
                        availability = "<span class='in_stock'>In Stock</span>";
                    if(response[i].store_number == local_store[1]){
                        document.getElementById("local_store_availability_"+skuSelection.line_id).innerHTML = availability;
                        document.getElementById("local_store_name_"+skuSelection.line_id).innerHTML = "<a href='/locator/showstore/"+local_store[1]+"' target='_blank'>"+local_store[2]+"</a>";
                        document.getElementById("local_store_info_"+skuSelection.line_id).style.display = "";
                    }
                    else{

                }
                }

            },
            failure: function (o) {},
            argument: {
                extvar: this
            }
        };
        YAHOO.util.Connect.asyncRequest(
            'POST',
            '/detail/checkClosestStoresAvailability',
            callback,
            'item=' + this.item_id + '&color=' + this.color_id + '&size=' + this.size_id + "&zip=" + local_store[0] + "&sn=" + local_store[1]
            );
        document.getElementById("zip_"+this.line_id).value = local_store[0];
    }

    /**
     * determines if the sku is available in the near stores (My Store must have already been selected)
     */
    this.skuAvailableOffline = function(){
        if(!document.getElementById('fis_btn_'+this.line_id)) return;
        var callback = {
            success: function(o) {
                var skuSelection = o.argument.extvar;
                if(o.responseText == "available"){

                    var av_btn = document.getElementById('fis_btn_'+skuSelection.line_id).style.display="inline";
                    var av_btn = document.getElementById('zip_'+skuSelection.line_id).disabled=false;
                    var av_btn = document.getElementById('fis_btn_off_'+skuSelection.line_id).style.display="none";
                    skuSelection.availableInLocalStore();
                }
                else{
                    var av_btn = document.getElementById('fis_btn_'+skuSelection.line_id).style.display="none";
                    var av_btn = document.getElementById('zip_'+skuSelection.line_id).disabled=true;
                    var av_btn = document.getElementById('fis_btn_off_'+skuSelection.line_id).style.display="inline";
                    document.getElementById('local_store_info_'+skuSelection.line_id).style.display="none";
                }

            },
            failure: function (o) {
                var skuSelection = o.argument.extvar;
                var av_btn = document.getElementById('fis_btn_'+skuSelection.line_id).style.display="none";
                var av_btn = document.getElementById('zip_'+skuSelection.line_id).disabled=true;
                var av_btn = document.getElementById('fis_btn_off_'+skuSelection.line_id).style.display="inline";
                document.getElementById('local_store_info_'+skuSelection.line_id).style.display="none";
            },
            argument: {
                extvar: this
            }
        };
        YAHOO.util.Connect.asyncRequest(
            'POST',
            '/detail/checkAvailability',
            callback,
            'item=' + this.item_id + '&color=' + this.color_id + '&size=' + this.size_id
            );

    }

    /**
     * enable qty = 0
     * @param {Object} value
     */
    this.enableZero = function(value)
    {
        this.enable_zero = value;
    }

    /**
     * Checks if the qty/size are selected, if not, it sets the size_id as the default size.
     */
    this.checkSizeQty = function() {
        if ((!this.size_id && this.countProps(this.color_size[this.swatch_pad][this.color_id]) > 1) || !this.qty) {
            var errTxt = "Please select the following:\r\n";
            errTxt += !this.size_id ? " - Size\r\n" : "";
            errTxt += !this.qty ?  " - Quantity\r\n" : "";
            alert(errTxt);
            return false;
        }

        // if a size is required it's caught above.  consequently, if we make it here and there is no size, use the default size
        if ( !this.size_id ) {
            this.size_id = this.defaults['size'];
        }

        return true;
    }

    /**
     * this sets the name of a function used in pdp to set the flash zoom
     * @param {Object} func
     */
    this.setImageFunction = function(func) {
        this.imageFunction = func;
    }

    /**
     * redirects from the quickviw to the pdp carying the currently selected item attributes
     * @param string item_desc
     */
    this.goToPDP = function(item_desc) {
        var color_id  = this
        var href = "/detail/" + item_desc + "/" + this.item_id + "/" + this.color_id
        + "/" + this.size_id + "/" + this.qty;
        window.location = href;
    }
    
    this.addDBSkuCode = function(color_id, dbskucode){
        this.dbskucodes[color_id] = dbskucode;
    }

    
    this.setDBSkuCode = function (color_id) {
        var db_skucode_span = document.getElementById("db_sku_code");
        if(db_skucode_span) db_skucode_span.innerHTML = this.dbskucodes[color_id];
    }

    this.addSkuCode = function(color_id,size_id,skucode){
        if(color_id != "" && size_id !="" && skucode!=""){
            
            if (typeof this.skucodes[color_id] == 'undefined')
                this.skucodes[color_id]= new Array();
       
            this.skucodes[color_id][size_id] = skucode;

    
        }
    } 
    //Returns the SkuCode 
    this.getSkuCode = function(color_id,size_id){
        if(color_id != "" && size_id !=""){
            return this.skucodes[color_id][size_id];
        }
        return null;
    }


    this.addSkusInv = function(color_id,size_id,inventory){
        if(color_id != "" && size_id !="" && inventory!=""){

            if (typeof this.skuinv[color_id] == 'undefined')
                this.skuinv[color_id]= new Array();
       
            this.skuinv[color_id][size_id] = inventory;
        }
    }

    //Returns the Inventory by skus
    this.getSkusInv = function(color_id,size_id){
        
       if(color_id != "" && size_id !=""){
            var childInv =this.skuinv[color_id][size_id];
            var strInv = "";
            for (var color_sku in this.skuinv) {
                    for (var size_sku in this.skuinv[color_sku]) {
                            if(color_sku != color_id  || size_sku != size_id){
                                strInv += ',' + this.skuinv[color_sku][size_sku];  
                            }
                    }
                }
            if (strInv != "")
                childInv = childInv +","+ strInv;
            return childInv.replace(',,',',');
        }
        return null
    }
};
