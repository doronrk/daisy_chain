/**
 * This is a wrapper function for YUI's panel that simplifies its use.
 * With this class we create the panel directly from JS without requiring to have <div> elements in code to be used as base for ther panels
 * 
 * IMPORTANT if you want a modal panel you need to add "modal:true, visible:false"
 * 
 * Panels have 3 parts: Header, Body, Footer (not all need to have content)
 * 
 * if you want to disable animations use "effect:null" on the properties array
 * 
 * ========== USAGE EXAMPLE: ==========
 * var panel = new YAHOO.speedfc.utilities.sfcPanel('header_wishlist_last_item');
 * panel.setProperties(
 *                   {
 *                     width:'250px',
 *                     context: [ document.getElementById("shopping_bag_counter") , 'tr', 'br'],
 *                     fixedcenter: false,
 *                     iframe:true,
 *                     close:false,
 *                     zindex:300,
 *                     modal:false,
 *                     constraintoviewport: false,
 *                     scope:this
 *                   });
 * panel.setProperty("modal", true);
 * panel.setBody("this is the content that will display on Panel's body");
 * panel.setOnCloseFunction(function(){alert("panel is closing")});
 * panel.show();
 * 
 */

YAHOO.namespace('speedfc.utilities.sfcPanel');
YAHOO.speedfc.utilities.sfcPanel = function(id){
    //passed id in constructor, used for trying to get the contents of an existing div to be used as panel's body
    this.originalId = id;
    //panel id
    this.id = id+"_sfc_panel";
    //panel mask
    this.panelMask = this.id+"_mask";
    //should panel close on mask click?
    this.hideOnMaskClick = true;
    //function that should be called when panel is closed
    this.onCloseFunction = null;
    //default panel options
    this.properties = {
        fixedcenter: true,
        close: true,
        draggable: false,
        modal: true,
        visible: false,
        iframe: true,
        effect: {effect:YAHOO.widget.ContainerEffect.FADE,duration:0.5}               
    };
    
    //where the YUI panel object will reside.
    this.panel = new YAHOO.widget.Panel(this.id, this.properties);
    
    /**
     * function that tries to get the content of a div
     * @param {String} div_id   the div's id whose content we want to use to fill in the Panel's body
     */
    this.getDivContent = function(div_id) {
        var div = document.getElementById(div_id);
        if(div)
            return div.innerHTML;
        return null;
    };
    
    /**
     * function with stuff that NEEDS to happen when creating object  
     */  
    this.init = function(){
        //creating a header is indispensable when we are using for example rounded corners so we can set the corners wrappers
        this.panel.setHeader("<div class='tl'></div><span></span><div class='tr'></div>");
        //we try to use a div with "id" = "id passed in sfcPanel contructor" content's as the default content of the panel    
        var body = this.getDivContent(this.originalId);
        if(!body) body = "&nbsp;";
        this.panel.setBody(body);
        this.panel.setFooter("&nbsp;");
    };
    
    //initialize the object
    this.initialize = this.init();
    
    /**
     * sets the panel's header
     * @param {String} header the header's content
     */
    this.setHeader = function(header){
        this.panel.setHeader("<div class='tl'></div><span>"+header+"</span><div class='tr'></div>");
    };
    
    /**
     * sets the panel's main content
     * @param {String} body the main content
     */
    this.setBody = function(body){
        this.panel.setBody(body);
    };
    
    /**
     * sets the panel's body to the content of a given div
     * @param {Object} div_id
     */
    this.setBodyFomDiv = function(div_id){
        var body = this.getDivContent(this.originalId);
        if(!body) body = "&nbsp;";
        this.panel.setBody(body);
    }
    
    /**
     * sets the panel's footer
     * @param {String} footer the footer's content
     */
    this.setFooter = function(footer){
        this.panel.setFooter(footer);
    };
    
    /**
     * sets the panel properties
     * @param {Object}  properties  object with panel properties
     * @param {boolean} apply_now   set to true if you want to see configuration changes applied instantly (otherwise changes will reflect next time show is called)
     */
    this.setProperties = function(properties, apply_now) {
        this.panel.cfg.applyConfig(properties, true);
        if(apply_now)
            this.panel.cfg.fireQueue();        
    };
    
    /**
     * change one of YUI's panel properties
     * common available properties are: 
     *  - close        (boolean)
     *  - draggable    (boolean)
     *  - underlay     (shadow, none, matte)
     *  - x            number
     *  - y            number
     *  - context      [contextElementOrId, overlayCorner ("tr" (top right), "tl" (top left), "br" (bottom right), or "bl" (bottom left)), contextElementCorner]
     *  - fixedcenter  (boolean)
     *  - width        number + px (ej: 100px )
     *  - height       number + px (ej: 100px )
     *  - zIndex       number
     *  
     * more properties can be found at http://developer.yahoo.com/yui/container/panel/
     * @param {String} property_name
     * @param {Object} value
     * @param {boolean} apply_now   set to true if you want to see configuration changes applied instantly (otherwise changes will reflect next time show is called)
     */
    this.setProperty = function(property_name, value, apply_now) {
        this.panel.cfg.setProperty(property_name, value);
        if (apply_now) 
            this.panel.cfg.fireQueue();
    };
    
    /**
     * displays the panel on screen
     */
    this.show = function() {
        this.panel.render(document.body);
        this.panel.show();
        this.setHideOnMaskClickListener(); //call goes here because mask should exist before setting listener (mask is created during show)
    };
    
    /**
     * hides the panel
     */
    this.hide = function() {
        if(this.onCloseFunction != null)this.onCloseFunction() 
        this.panel.hide();
    };
    
    /**
     * set whether you want the panel close when somebody clicks on the mask (only in modal panels)
     * @param {Bool} value  true if you want panel to close when mask is clicked
     */
    this.setHideOnMaskClick = function(value) {
        this.hideOnMaskClick = value;
    };
    
    /**
     * adds or remove the close listener from the mask
     */
    this.setHideOnMaskClickListener = function() {
        var mask = document.getElementById(this.panelMask);
        var sfcPanel = this;
        if (this.hideOnMaskClick && mask) {            
            YAHOO.util.Event.addListener(mask, "click", function(){
                sfcPanel.hide()
            });        
        }
        else if(mask){
            YAHOO.util.Event.removeListener(mask, "click");
        }
    };
    
    /**
     * sets the function to be closed when hiding the panel
     * @param {Object} value
     */
    this.setOnCloseFunction = function(value) {
        this.onCloseFunction = value;
    }
    
};
