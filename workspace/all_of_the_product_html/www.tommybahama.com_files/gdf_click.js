var trackingValue = GDF_GetTrackingValue();
var referringDomain = GDF_GetReferringDomain(); 

if(trackingValue != null)
{
    this.fullUrl = "https://tracking.godatafeed.com/click.aspx?gdftrk=" + trackingValue + "&referringDomain=" + referringDomain; 
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    this.headLoc = document.getElementsByTagName("head").item(0);
    this.scriptId = "GDF_TRK" + GDF_NewGuid();
    this.scriptObj = document.createElement("script");
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
    this.scriptObj.setAttribute("id", this.scriptId);
    this.headLoc.appendChild(this.scriptObj);
    this.headLoc.removeChild(this.scriptObj);  
}

function GDF_GetTrackingValue()
{
    var queryStringValue = null;
    var queryString = window.location.search.substring(1);
    var queryStringVariables = queryString.split('&');
            
    for (var i = 0; i < queryStringVariables.length; i++) 
    {
        var nameValuePair = queryStringVariables[i].split('=');
        var name = nameValuePair[0];
        var value = nameValuePair[1];
                    
        if (name == 'gdftrk') 
        {
            queryStringValue = value;
            break; 
        }
    } 
    
    if(queryStringValue != null)
    {
        while(queryStringValue.indexOf("+") > -1)
        {
            queryStringValue = queryStringValue.replace("+","~");
        }
    }
    
    return queryStringValue;
}

function GDF_GetReferringDomain() {
    var referringDomain = document.referrer.replace('http://', '').replace('https://','').replace('www.', '').replace('.','%2E');
    referringDomain = referringDomain.split('/')[0];
    return referringDomain;
} 
        
function GDF_NewGuid()
{
    var guid = "{";
    
    for(var i = 0; i < 32; i++)
    {
        guid += Math.floor(Math.random() * 0xF).toString(0xF) + (i == 8 || i == 12 || i == 16 || i == 20 ? "-" : "")
    }
        
    return guid + "}";
}

