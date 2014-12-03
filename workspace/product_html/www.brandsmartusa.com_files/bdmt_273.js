// Copyright (c) 2006-10 Easy2.com, Inc. All rights reserved.

// Display format. Choices 'popup', 'iframe' or 'lightbox'.
var easy2DisplayFormat = 'lightbox';

// Populate the variable below with the text or image that will launch a product demo.
var easy2LinkDisplay = '<img id="bdmt_273_img" src=\"http://includes.easy2.com/dm/images/bdmt_viewDemo.png\" border=\"0\">';


// The "document.write" code below can be changed to a <div>, <p> or <td> if needed, BUT MAKE SURE THE ID IS NOT CHANGED.
var fridgerator = document.getElementById('SP_ProductImage');
fridgerator.setAttribute('style','position:relative');
var style = document.createElement('style');
style.setAttribute('type', 'text/css');
style.innerHTML = 'img#bdmt_273_img:hover {-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=95)";filter:alpha(opacity=95);opacity:0.95;} img#bdmt_273_img {-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);opacity:0.50;}';
fridgerator.appendChild(style);
var insert = document.createElement('span');
insert.setAttribute('id','easy2Container_bdmt_273');
insert.setAttribute('style','display: none; position: absolute; top:40px;left:35Px; ');
//insert.innerHTML = 'an id=\"easy2Container_bdmt_273\"  style=\"display: none; \"></div>';
fridgerator.appendChild(insert);

// ********************************************************************************************************************* z-index:10;opacity:0.9;filter:alpha(opacity=90);
// ***************************************Do not change the code below this line.***************************************var containerObj = document.getElementById('SP_ProductImage');
// *********************************************************************************************************************

function easy2CheckModules(easy2IncludeID) {	
	var containerObj = document.getElementById('easy2Container_' + easy2IncludeID);
	if(containerObj && easy2IncludeID.indexOf('_') != -1) {
		var qs_1 = '', qs_2 = '', path_1 = '%', path_2 = '', other_1 = '', other_2 = '';
		var check_url = 'http://media.easy2.com/dyna_includes2/actions/check_image.asp';
		var launch_url = 'http://webapps.easy2.com/dyna_includes2/actions/master_page.asp';
		var this_url = CurrentURL();
		var scrObj = document.getElementById('easy2Script_' + easy2IncludeID);
		var imgObj = document.createElement('img');
		var displayHTML;
							
		var temp_url = (path_1 != '' || path_2 != '') ? PathVal(this_url, true) : PathVal(this_url, false);
		temp_url += (qs_1 != '') ? '?' + qs_1 + '=' + ParamVal(this_url, qs_1) : '';
		temp_url += (qs_2 != '') ? '&' + qs_2 + '=' + ParamVal(this_url, qs_2) : '';

		var e2_vars = '?e2__dyna_include_pid=' + easy2IncludeID.split('_')[1];
		e2_vars += '&e2__dyna_include_host=' + easy2IncludeID.split('_')[0];
		e2_vars += '&e2__dyna_include_url=' + escape(temp_url);
		
		if(scrObj && scrObj.src && scrObj.src != '') {
			var arrURL = scrObj.src.split('?');  
			if(arrURL.length > 1) e2_vars += '&' + arrURL[1];
		}
		
		e2_vars += (easy2DisplayFormat == 'iframe' || easy2DisplayFormat == 'lightbox') ? '&e2__dyna_include_size=true' : '';
		e2_vars += '&e2__dyna_include_cache=true';
		
		imgObj.onload = function() {
			launch_url += e2_vars;
			//launch_url += '&referurl=' + CurrentURL();
			if(easy2DisplayFormat == 'iframe' && imgObj.width > 100) {
				displayHTML = MakeIFrame(launch_url, imgObj.width, imgObj.height);
			} else if(easy2DisplayFormat == 'lightbox' && imgObj.width > 100) {
				displayHTML = MakeLightBoxButton(launch_url, imgObj.width, imgObj.height);
			} else {
				displayHTML = MakePopUpButton(launch_url);
			}
			containerObj.innerHTML = displayHTML;
			containerObj.style.display = '';
			
			imgObj = null;
		}
		
		imgObj.onerror = function() {
			imgObj = null;
			NoModuleFn();
		}
		
		check_url += e2_vars;
		imgObj.src = check_url;
	}
	
	function ParamVal(url, var_name) {
		var pat = '(?:&|\\b|\\?)' + var_name + '=([^&#]*)';
		var re = new RegExp(pat,'i');
		var arr = url.match(re);
		var val = (arr) ? arr[1] : '';
		return val;
	}
	
	function PathVal(url, path) {
		var val = '';
		var pat = '^([^:]+[:/]+[^/]+)([^?#]*)';
		var re = new RegExp(pat,'i');
		var arr = url.match(re);
		if(arr) {
			val = arr[1];
			val += (path) ? arr[2] : '';
		}
		return val;
	}

	function CurrentURL() {
		var thisURL = window.location.href.toString();
		var arrURL = thisURL.split('?');
		var thisURL = unescape(arrURL[0]);
		if(arrURL.length > 1) thisURL += '?' + arrURL[1];
		return thisURL;
	}
	
	function MakePopUpButton(url) {
		var this_link = '<a href=\"#\" onclick=\"easy2PopOpenWin(\'' + url + '\', \'easy2Window\', 600, 450); return false;\">';
		this_link += easy2LinkDisplay;
		this_link += '</a>';
		return this_link;
	}	

	function MakeLightBoxButton(url, w, h) {
		var lbs = document.createElement('script');
		lbs.type = 'text/javascript';
		lbs.src = 'http://media.easy2.com/dyna_includes2/scripts/lightBox.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(lbs);

		var this_link = '<a href=\"#\" onclick=\"e2OpenLayerViewer(\'' + url + '\', ' + w + ', ' + h +'); return false;\">';
		this_link += easy2LinkDisplay;
		this_link += '</a>';
		return this_link;
	}	

	function MakeIFrame(url, w, h) {
		var this_link = '<iframe src=\"' + url + '\" width=\"' + w + '\" height=\"' + h + '\" scrolling=\"no\" frameborder=\"0\"></iframe>';
		return this_link;
	}
	
	function NoModuleFn() {
		// Run this function if there is no module match to this page.
	}
}

function easy2PopOpenWin(theURL, Name, popW, popH) {
	theURL += (theURL.indexOf('?') > -1) ? '&' : '?';
	var winHorz = (screen.width-popW)/2;
	var winVert = (screen.height-popH)/2;
	var winProp = 'width=' + popW + ',height=' + popH + ',left=' + winHorz + ',top=' + winVert + ',scrollbars=yes,resizable=yes';
	easy2PopWin = window.open(theURL, Name, winProp);
	if (easy2PopWin && !easy2PopWin.closed && easy2PopWin.top && window.focus) {easy2PopWin.focus()};
	return false;
}

easy2CheckModules('bdmt_273');

