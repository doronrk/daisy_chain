function KeyDownHandler(e, btn)	
{		
	var keycode = e.keyCode ? e.keyCode: e.charCode;	
		
	if (keycode == 13)
	{		
	    if(btn != null && btn != '')
	    {
		    document.getElementById(btn).click();		
		}
		return false;
	}
}

function ClearDefault(txt)
{
    if (txt.defaultValue == txt.value) { txt.value = ""; }
}


function only_numbers(e) 
{
    var unicode=e.charCode? e.charCode : e.keyCode;
    if (unicode!=8 && unicode!=9) //if the key isn’t the backspace key (which we should allow) 
    { 
        if (unicode<48||unicode>57) //if not a number 
        {
            return false //disable key press 
        }
    }
}

function only_phonenumbers(e) 
{
    var unicode=e.charCode? e.charCode : e.keyCode;
    if (unicode != 8 && unicode != 9) //if the key isn’t the backspace key (which we should allow) 
    { 
        if ((unicode != 45 && unicode < 48) || unicode > 57 ) //if not a number 
        {
            return false //disable key press 
        }
    }
}	

function only_emailcharacters(e)
{

}


function AppendQueryStringVariable(url, parameter, parameterValue)
{		
    var objURL = new Object();

    url.toLowerCase().replace(
	    new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),

	    // For each matched query string pair, add that pair to the URL struct using the pre-equals value as the key.
	    function( $0, $1, $2, $3 )
	    {
		    objURL[ $1 ] = $3;
	    }
    );
    
    objURL[parameter] = parameterValue;

    // rebuild the url
    var qs = "";
	for (var strKey in objURL)
	{ 	
	    if(qs.length == 0)
	    {
		    qs = qs + strKey + "?";  // domain url part
	    }
	    else
	    {
	        qs = qs + strKey + "=" + objURL[strKey] + "&";
	    }				
	}
			     
    return qs.substring(0, qs.length - 1);		
}

function GetQueryStringVariable(url, parameter)
{		
    var objURL = new Object();

    url.toLowerCase().replace(
	    new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),

	    // For each matched query string pair, add that pair to the URL struct using the pre-equals value as the key.
	    function( $0, $1, $2, $3 )
	    {
		    objURL[ $1 ] = $3;
	    }
    );
    
    return objURL[parameter];
}
