/** 
 * @fileOverview This file provides the common custom functions for Ferragamo.
 */

/** Show a dom element, eventually keeping its original style */
function showById(id, keepStyle){
	
	if(keepStyle == null || keepStyle == undefined)
		keepStyle = true;
	
	if(keepStyle)
		$jq("#" + id).removeClass("frg_hidden");
	else
		$jq("#" + id).attr("class", "");
}

/** Hide a dom element, eventually keeping its original style */
function hideById(id, keepStyle){
	
	if(keepStyle == null || keepStyle == undefined)
		keepStyle= true;
	
	if(keepStyle)
		$jq("#" + id).addClass("frg_hidden");
	else
		$jq("#" + id).attr("class", "frg_hidden");
}

function addClassById(id, clazz){
	$jq("#" + id).addClass(clazz);
}

function removeClassById(id, clazz){
	$jq("#" + id).removeClass(clazz);
}


function getPositionTop(obj,offset){
	if (offset)
		return $jq('#'+obj.id).position().top-offset;	
	return $jq('#'+obj.id).position().top;	
}

function getPositionLeft(obj){
	return $jq('#'+obj.id).position().left;	
}

function setCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	
	dojo.cookie(c_name, c_value, {path:'/',expires:365});
}

function checkCookie(c_name,obj_class) {
	var cookie = getCookie(c_name);
  	if (cookie!=null && cookie!="") {
  		$jq("."+obj_class).hide();
  	} else {
  		$jq("."+obj_class).show();
  	}
}

