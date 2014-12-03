var k_src='', k_med='', k_term='', k_ad='',k_name='';

function kVoid() { return; }
					
function kenshoo_nconv(params,subdomain) {
	   var hostProtocol = (("https:" == document.location.protocol) ? "https" : "http");
	   var url = hostProtocol+'://'+subdomain+'.xg4ken.com/media/redir.php?track=1';
	   if (params != null){
		   for (var x=0; x<params.length; x++){
				url = url + '&' + params[x];
		   }
	   }
	   url = url + '&ref=' + document.referrer;
       	   var a = new Image(1,1);
           a.src = url;
	   a.onload = function() { kVoid(); }
}

function getRandomNumber(range){
	return Math.floor(Math.random() * range);
}

function getRandomChar(){
	var chars = '0123456789abcdefghijklmnopqurstuvwxyz';
	return chars.substr( getRandomNumber(37), 1 );
}

function randomID(size){
	var str = '';
	for(var i = 0; i < size; i++){
		str += getRandomChar();
	}
	return str;
}

function gup( name, lf ){
 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec( lf );
 if( results == null )    return "";
 else    return results[1];
}


function getcookie(c_name){
  var cnamelookup = c_name+'=';
  var c_start=document.cookie.indexOf(cnamelookup);
	var val='';
  if (c_start!=-1){
	   c_start=c_start + c_name.length+1;
     c_end=document.cookie.indexOf(';',c_start-1);
     if (c_end==-1) c_end=document.cookie.length;
		 val = unescape(document.cookie.substring(c_start,c_end));
		 if((c_start-1)==(c_end)) val='';//just ;
	}
	return val;
}


function setcookie(name, val, expires){
	document.cookie = name + '=' + escape(val) + '; expires=' + expires.toGMTString() + '; path=/;';
}


function track(cid){
var parmed = gup('kmed',window.location.href);
if(parmed != null && parmed.length > 0){
	var date1 = new Date();
	date1.setTime(date1.getTime()+(90*24*60*60*1000));
	k_med=parmed;
  if(parmed == 'ppc'){
			setcookie('kmed','ppc', date1);
	}else if(parmed=='display'){
	  setcookie('kmed','display', date1);
  } //end parmed==display
}else if( getcookie('kmed')=='ppc' ){
		k_med='ppc';
}//end cookie ppc check
}

function k_trackevent(params,subdomain){
	 kenshoo_nconv(params,subdomain);
}

function k_trackeventencode(params,subdomain) {
         if (params != null){
                   for (var i=0; i<params.length; i++){
                                var param = params[i];
                                if (param.indexOf("product") != -1)
                                        params[i] = encode_param(param,"product");
                                if (param.indexOf("kw") != -1)
                                        params[i]=encode_param(param,"kw");
                   }
        }
		kenshoo_nconv(params,subdomain);
}

function encode_param(unencoded_param,param_name) {
        var param = param_name + "=";
        var val_part = unencoded_param.substring(param_name.length+1,unencoded_param.length);
        param += encodeURIComponent(val_part);
        return param;
}