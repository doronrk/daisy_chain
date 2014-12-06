// start 141124-nav-banner-iframe-functions-pc.js
// Revision History:
// 05.07.2014 amateyka - created
// 09.12.2014 ekw - add scary hallowen decor banner
// 09.15.2014 kh - js reordered and simplified
// 09.19.2014 amateyka - added banner rules
// 09.30.2014 kh - added new banner (mix it match it)
// 10.06.2014 kh - commented out asylum, added fog machine banner
// 10.08.2014 kh - changed fog machine banner
// 10.10.2014 am - added Halloween Nav Banner
// 11.24.2014 kh - added Store Locator only banner

var url=window.location.href;
var promo=window.location.href;
var banner_file = "";
var banner_height = 'height=""';
var className ="";
var display_banner = true;

url = url.toLowerCase();

//begining of the code
//if the nav banner has a unique height, put the js code towards the top
if (url.indexOf("/checkout/accountsetup.do?method=view") != -1) {
	banner_height = 'height="100"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140903-BR-nav-banner.html";
}

//luau banner
else if (url.indexOf("/search.do?query=luau") != -1 || url.indexOf("luau") != -1 || url.indexOf("/product/patio+lights.do") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140710-luau-nav-banner.html";
}

//summer banner
else if (url.indexOf("/search.do?query=summer") != -1 || url.indexOf("summer") != -1 || url.indexOf("/product/ice+cream+shaved+ice.do") != -1 || url.indexOf("/product/summer+lights.do") != -1 || url.indexOf("/product/sea+life+balloons.do") != -1 ) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140710-summer-nav-banner.html";
}

//patriotic banner
else if (url.indexOf("?navSet=110467") != -1 || url.indexOf("patriotic") != -1 || url.indexOf("/search.do?query=patriotic") != -1 ) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140710-Patriotic-nav-banner.html";
}

//4th of July banner
else if (url.indexOf("/search.do?query=4th+of+july") != -1 || url.indexOf("/search.do?query=fourth+of+july") != -1 || url.indexOf("/search.do?query=july+fourth") != -1 || url.indexOf("/search.do?query=july+4th") != -1 || url.indexOf("?navSet=110523") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140710-4thOfJuly-nav-banner.html";
}

//graduation
else if (url.indexOf("special+occasions/graduation") != -1 || url.indexOf("graduation") != -1 || url.indexOf("+grad+") != -1 || url.indexOf("?navSet=176206") != -1 || url.indexOf("/grad+") != -1 || url.indexOf("/grad") != -1 || url.indexOf("graduate") != -1 ) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140710-graduation-nav-banner.html";
}

//fanrageous
else if (url.indexOf("sport") != -1 || url.indexOf("soccer") != -1 || url.indexOf("hockey") != -1 || url.indexOf("golf") != -1 || url.indexOf("kentucky+derby+party+supplies") != -1 || url.indexOf("nascar") != -1 ) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140710-fanrageous-nav-banner.html";
}

//SantaCon
else if (promo.indexOf("product/ugly+sweaters+christmas+accessories.do?code=PC1O5ISl0&extcmp=afSantaConXmasSupplies2014") != -1 ) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/141110-santacon-nav-banner.html";
}

//Search based banners
//fanrageous
else if (url.indexOf("/search.do?query=sport") != -1 || url.indexOf("/search.do?query=baseball") != -1 || url.indexOf("/search.do?query=soccer") != -1 || url.indexOf("soccer+party+supplies.do?from=search") != -1 || url.indexOf("/search.do?query=world+cup") != -1 ) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140710-fanrageous-nav-banner-search.html";
}

//Creepy Carnival Theme
else if (url.indexOf("/search.do?query=0814-35") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140919-creepy-carnival-nav-banner.html";
}

//Asylum Theme
else if (url.indexOf("/search.do?query=0814-37") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140919-asylum-nav-banner.html";
}

//Mix and Match Costumes
else if (url.indexOf("/search.do?query=0914-32m") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140930-mix-it-match-it-nav-banner.html";
}

//Marvel Costumes Theme
else if (url.indexOf("/search.do?query=marvel+costume+women") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140919-marvel-nav-banner.html";
}

//Power Rangers Theme
else if (url.indexOf("/search.do?query=power+ranger+costume+boy") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140919-power-rangers-nav-banner.html";
}

//Kid Friendly Decorations
else if (url.indexOf("/search.do?query=halloween+tinsel+decor") != -1 || url.indexOf("/search.do?query=halloween+glitter+sign") != -1 || url.indexOf("/search.do?query=halloween+jointed+felt") != -1 || url.indexOf("/search.do?query=halloween+fun+lawn") != -1 || url.indexOf("/search.do?query=halloween+friendly+props") != -1 ) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140908-kid-friendly-nav-banner.html";
}

//Scary Halloween Decorations
else if (url.indexOf("/search.do?query=scary+web+decorations") != -1 || url.indexOf("/search.do?query=small+scary+halloween+props") != -1 || url.indexOf("/search.do?query=large+hanging+halloween+props") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/140912-scary-halloween-nav-banner.html";
}

//Fog Machine
else if (url.indexOf("/search.do?query=0914-34m") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/141006-fog-machine-nav-banner.html";
}

//Halloween
else if (url.indexOf("halloween") != -1) {
	//banner_height = 'height="57"';
	//className = "class='navBannerPC'";
	//banner_file = "/text/partycity/banners/nav/2014/141031-3pm-halloween-nav-banner.html";
	var display_banner = false;
}

//Thanksgiving on Search Results Page
/*else if (url.indexOf("/store-locator/landing.do") != -1) {
	banner_height = 'height="57"';
	className = "class='navBannerPC'";
	banner_file = "/text/partycity/banners/nav/2014/141124-thankgiving-hours-nav-banner.html";
}*/

//Exclusions Start
else if (url.indexOf("/category/special+occasions/graduation+party+supplies/graduation+tableware+themes.do") != -1 || url.indexOf("/category/theme+parties/summer+party/drinkware+serveware.do") != -1 || url.indexOf("/category/theme+parties/luau+theme+party/tableware+themes.do") != -1  || url.indexOf("/category/theme+parties/summer+party/summer+tableware.do") != -1 || url.indexOf("/category/theme+parties/patriotic+theme+party/tableware.do") != -1 || url.indexOf("/category/holiday+parties/4th+of+july+party+supplies/tableware+themes.do") != -1 ) {
	var display_banner = false;
}

else if (url.indexOf("/category/special+occasions/graduation+party+supplies/graduation+tableware+themes.do") != -1 || url.indexOf("/category/theme+parties/luau+theme+party/tableware+themes.do") != -1 || url.indexOf("/category/theme+parties/summer+party/summer+tableware.do") != -1 || url.indexOf("/category/theme+parties/americana+theme+party/tableware.do") != -1) {
	var display_banner = false;
}

else if (url.indexOf("/category/theme+parties/sports+theme+party/mlb+teams.do") != -1 || url.indexOf("/category/theme+parties/sports+theme+party/baseball+party+supplies.do") != -1 || url.indexOf("/category/theme+parties/sports+theme+party/football+theme+party.do") != -1 || url.indexOf("/category/theme+parties/sports+theme+party/super+bowl+theme+party.do") != -1 || url.indexOf("/category/theme+parties/sports+theme+party/college+teams.do") != -1 || url.indexOf("/category/theme+parties/sports+theme+party/nba+teams.do") != -1 || url.indexOf("/category/theme+parties/sports+theme+party/basketball+theme+party.do") != -1 || url.indexOf("/category/theme+parties/sports+theme+party/nhl+teams.do") != -1 || url.indexOf("/category/theme+parties/sports+theme+party/nfl+teams.do") != -1){
	var display_banner = false;
}

else if ((url.indexOf("/search.do?query=") != -1) && (url.indexOf("costume") != -1)){
	var display_banner = false;
}

else if (url.indexOf("search") != -1 ) {
	var display_banner = false;
}

//Exclusions End

//Default Nav Banner
else {
	/* -- uncomment this out if we put back in a default banner --*/
	banner_height = 'height="57"';
	banner_file = "/text/partycity/banners/nav/2014/141126-nav-banner.html";
	className = "class='navBannerPC'";
	
	/*var display_banner = false;*/
}
if (display_banner) {
	document.getElementById("navBanner_img").innerHTML = "<iframe src='" + banner_file + "' "+className+" width='990' "+banner_height+" frameborder='0' scrolling='no'></iframe>";
}

// end 141124-nav-banner-iframe-functions-pc.js