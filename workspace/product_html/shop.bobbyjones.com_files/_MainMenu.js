
//throw "Exit script";

// GLOBAL VARIABLES
var bj_menuPauseInMiliseconds = 250;
var bj_hoveredMenuLink;  // The "menu link" that has the mouse focus
var bj_hoveredMenu;      // The "menu" that has the mouse focus
var bj_currentMenu;      // The current menu that is to be opened
var bj_MenusClosing = 0; // A count of menus that are in the process of closing
var bj_MENU_VIEWPORT_SELECTOR = ".SiteMainMenu-ToolbarDropDown";
var bj_MENU_DROPDOWN_SELECTOR = ".SiteMainMenu-ToolbarDropDown .ToolbarDropDown";

jQuery(document).ready(function () {

    bj_MenuInit();
    bj_RegisterMenuHoverCallbacks();

    jQuery(".SiteMainMenuItem .SiteMainMenu-ToolbarItem a").click(function (event) {
        var hasDropDown = jQuery(this).parents(".SiteMainMenuItem").find(".SiteMainMenu-ToolbarDropDown").length > 0;
    });

});

function bj_MenuInit() {
    // Start by initializing ALL THE DROPDOWNS to hidden
    jQuery(bj_MENU_VIEWPORT_SELECTOR).hide();
    jQuery(bj_MENU_DROPDOWN_SELECTOR).hide();
}
function bj_RegisterMenuHoverCallbacks() {

    // Initialize the currently hovered "menu link" variable
    jQuery(".SiteMainMenuItem .SiteMainMenu-ToolbarItem").hover(function (event) {
        bj_hoveredMenuLink = this;
    }, function (event) {
        bj_hoveredMenuLink = undefined;
    });

    // Handle hovered toolbar item (link)
    jQuery(".SiteMainMenuItem .SiteMainMenu-ToolbarItem").mouseenter(function (event) {
        var SELECTED_MENU_LINK = this;
        // Let's wait and see if we are still hovered in a moment (i.e. instead of moving the mouse across the menu quickly)
        window.setTimeout(function () {
            if (bj_hoveredMenuLink == SELECTED_MENU_LINK) {
                // Show menu
                var selectedMenuItem = jQuery(SELECTED_MENU_LINK).parents(".SiteMainMenuItem");
                bj_ShowMenuHandler(selectedMenuItem, event);
            }
            else {
                // It wasn't meant to be
            }
        }, bj_menuPauseInMiliseconds);
    });

    // Initialize hovered "menu" variable
    jQuery(".SiteMainMenuItem").hover(function (event) {
        bj_hoveredMenu = this;
    }, function (event) {
        bj_hoveredMenu = undefined;
    });

    // Handle menu
    jQuery(".SiteMainMenuItem").mouseleave(function (event) {
        var SELECTED_MENU = this;
        // Let's wait and see if we have lost focus (i.e. in case the mouse moves out and then in the menu quickly)
        window.setTimeout(function () {
            if (bj_hoveredMenu != SELECTED_MENU) {
                // We lost focus; So, hide menu
                bj_HideMenuHandler(SELECTED_MENU, event);
            }
            else {
                // Let's stay
            }
        }, bj_menuPauseInMiliseconds);
    });
}

function bj_ShowMenuHandler(selectedMenuItem, event) {

    // Set current menu using global variable
    bj_currentMenu = selectedMenuItem;

    var visibleMenus = jQuery(".SiteMainMenu-ToolbarDropDown[style*='display: block']");
    if (visibleMenus.length > 0) {
        // Menus are still visible; So, wait until visible menus are closed

        var SELECTED_MENU_ITEM = selectedMenuItem;
        visibleMenus.on("MenuIsClosed", function (event) {

            // Once menu is closed then show me
            bj_ShowMenu(SELECTED_MENU_ITEM);

        });

    }
    else {

        // All menus are currently hidden; so, show me
        bj_ShowMenu(selectedMenuItem);

    }
}
function bj_ShowMenu(selectedMenuItem) {
    if (bj_currentMenu == selectedMenuItem) {
        if (bj_MenusClosing == 0) {
            // Show me
            jQuery(selectedMenuItem).find(bj_MENU_VIEWPORT_SELECTOR).show();
            jQuery(selectedMenuItem).find(bj_MENU_DROPDOWN_SELECTOR).show({
                effect: "slide",
                direction: "up",
                duration: "slow",
                easing: "swing"
            });
        }
        else {
            // Pass; Menus are still closing
        }
    }
    else {
        // Pass; You're not the one
    }
}

function bj_HideMenuHandler(selectedMenuItem, event) {
    bj_HideMenu(selectedMenuItem);
}
function bj_HideMenu(selectedMenuItem, completedCallback) {

    var hasDropDown = jQuery(selectedMenuItem).find(".SiteMainMenu-ToolbarDropDown").length > 0;
    if (hasDropDown) {
        bj_MenusClosing++;
        jQuery(selectedMenuItem).find(bj_MENU_DROPDOWN_SELECTOR).hide({
            effect: "slide",
            direction: "up",
            duration: "slow",
            easing: "swing",
            complete: function () {
                // Hide me
                jQuery(this).parents(".SiteMainMenu-ToolbarDropDown").hide();
                // Mark as closed
                bj_MenusClosing--;
                // Trigger closed
                jQuery(this).trigger("MenuIsClosed");
            }
        });
    }
    else {
        // Trigger "closed" immediately
        jQuery(this).trigger("MenuIsClosed");
    }

}
