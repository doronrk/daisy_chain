// ====================
// = Catalog leftnav  =
// ====================
YAHOO.namespace('speedfc.catalog.sidebar');
YAHOO.speedfc.catalog.sidebar = {
    //tree used on left nav
    oTree: null,
    
    /**
     * initializes the yui tree used in the sidebar
     * @param {Object} id
     */
    init : function(id){
        this.oTree = new YAHOO.widget.TreeView(id);
        this.oTree.draw();
    }
};