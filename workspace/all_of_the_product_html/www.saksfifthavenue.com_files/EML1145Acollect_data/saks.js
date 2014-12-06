/**
 * Legacy cookie functions used all over the site
 * @param name
 * @param value
 * @param days
 */

function domainFromHost(host) {
	var preComponents = host.split(':');
	var hostPart = preComponents[0];
	var portPart;
	if (preComponents.length == 2) {
		portPart = ":" + preComponents[1];
	} else {
		portPart = "";
	}
    var components = hostPart.split('.');
        
    if (!isNaN(components[components.length-1]) || components.length == 1) {
    	return "";
    }
    return "." + components.slice(Math.min(components.length-2, 1), components.length).join(".") + portPart;
}

function domainSection(host) {
	var domain = domainFromHost(host);
	if (domain == "") {
		return "";
	} else {
		return " domain=" + domain + ";";
	}
}

// creates a cookie
function createCookie(name,value,days)
{
    if (days)
    {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else
    {
        var expires = "";
    }

    document.cookie = name+"="+value+expires+"; path=/;" + domainSection(window.location.host);
}
			
// Gets and returns a cookie by name.	
function getCookie(name) 
{
    var nameEQ = name + "=";
		  var ca = document.cookie.split(';');
		  for(var i=0;i < ca.length;i++) 
    { 
		      var c = ca[i];
				  while (c.charAt(0)==' ') c = c.substring(1,c.length);
				  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		  }
				
    return null;
	}

	// Deletes a cookie by name.
function eraseCookie(name) 
{
	    createCookie(name,"",-1);
	}