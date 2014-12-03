// Function to find the object in the DOM model 
function getObj(name) { 
	if (document.getElementById) this.obj = document.getElementById(name); 
	else if (document.all) this.obj = document.all[name]; 
	else if (document.layers) this.obj = document.layers[name]; 
	if (this.obj) this.style = this.obj.style; 
} 


// Add a body load function, not overridding existing ones 
function addLoad(func) { 
	if (window.addEventListener) window.addEventListener('load', func, false); 
	else if (document.addEventListener) document.addEventListener('load', func, false); 
	else if (window.attachEvent) window.attachEvent('onload', func); 
	else if (typeof window.onload != 'function') window.onload = func; 
	else {	
		var oldonload = window.onload; 
		window.onload = function() { 
			oldonload(); 
			func(); 
		}; 
	} 
} 


// onLoad function that move objects in the DOM and make them visible 
function OAS_AMJX_init() {
	var apos = OAS_listpos.split(',');
	var olddocwrite = document.write;
	for (var i = 0; i < apos.length; i++) {
		var object_togo = new getObj('OAS_' + apos[i]);
		var object_tomove = new getObj('Hidden_OAS_' + apos[i]);
		html = "";
		if (object_togo.obj && object_tomove.obj) {
			object_togo.obj.appendChild(object_tomove.obj);
			object_tomove.obj.style.display = 'inline';
		}
	}
}

// Function to deliver if OAS is unreachable : PMO 3747
function OAS_NORMAL(pos) {
	document.write('<A HREF="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" TARGET=' + OAS_target + '>'); 
	document.write('<IMG SRC="' + OAS_url + 'adstream_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" BORDER=0></A>'); 
}

// Function to Select Ad Function : PMO 3747
function OAS_AD(pos) {
	if (OAS_version >= 11 && typeof(OAS_RICH)!='undefined')
		OAS_RICH(pos);
	else
		OAS_NORMAL(pos);
}

(function () {
	if (!window.OAS_listpos) {
		//document.getElementById ('leaderboard').style.display='none';
		return;
	} 
	
	// Generate random number for cache busting 
	OAS_version = 10;
	OAS_rn = '001234567890'; 
	OAS_rns = '1234567890';
	OAS_rn = new String (Math.random());
	OAS_rns = OAS_rn.substring (2, 11);

	// write the MJX call
	OAS_version = 11;
	if ((navigator.userAgent.indexOf('Mozilla/3') != -1) || (navigator.userAgent.indexOf('Mozilla/4.0 WebTV') != -1))  
		OAS_version = 10;
	if (OAS_version >= 11)
		document.write('<SCR' + 'IPT LANGUAGE=JavaScript1.1 SRC="' + OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '?' + OAS_query + '"><\/SCRIPT>');

	// Check for DOM Support
	if (document.getElementById && document.createTextNode) 
		addLoad(OAS_AMJX_init); 

})();