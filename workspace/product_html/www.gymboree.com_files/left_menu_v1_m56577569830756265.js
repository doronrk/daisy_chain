/*
    ==============LEFT_MENU.js====================
    contains functions for showing and hiding menus and submenus on project pages
    ==============================================
*/

/*-- shows & hides left menus (<div id="left-menu">)--*/
function ShowLeftMenu(obj, h3)
{
	el(obj).style.display = (el(obj).style.display == "none") ? "block" : "none";

    h3.className=(h3.className!='collapse') ? 'collapse' : '';
}

/*-- shows & hides left submenus (<ul id="left-submenu-ul21">)--*/
function ShowLeftSubMenu(obj)
{
	el(obj).style.display = (el(obj).style.display == "none") ? "block" : "none";  
}

/*-- shows & hides submenus (<li class="tree">)--*/
function ShowSubMenu(elem)
{
	elem.blur(); //clear focus
	
	elem = elem.parentNode;
	var obj = elem.getElementsByTagName('ul');
	
    elem.className = (elem.className.match("selected") !== null) ? elem.className.replace(" selected","") : elem.className += " selected";  
}
