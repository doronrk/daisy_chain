// ====================
// =  Top Navigation  =
// ====================
YAHOO.namespace('speedfc.utilities.navigation');
YAHOO.speedfc.utilities.navigation = {
    //top menu navigation
    oMenu: null,
    
    /**
     * initializes the top navigation menu
     */
    getCatNavContainer : function() {
        oMenu = new YAHOO.widget.MenuBar("category_nav_container", { 
                                                            autosubmenudisplay: true,
                                                            hidedelay: 150, 
                                                            lazyload: true});        
        oMenu.render();
    }    
};