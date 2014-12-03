function microsoft_adcenter_conversion()
{
   var convprot = 'http:';
   var convdomainid = 0;
   var convprice = 0;
   var convsku = 0;
   var url = "";

   if (location.protocol.toLowerCase() == 'https:') 
        convprot = 'https:';
   
   if (window.microsoft_adcenterconversion_domainid)
        convdomainid = window.microsoft_adcenterconversion_domainid;

   if(window.microsoft_adcenterconversion_sku)
        convsku = window.microsoft_adcenterconversion_sku;

   if(window.microsoft_adcenterconversion_cp)
        convprice = window.microsoft_adcenterconversion_cp;    
    
   url = convprot + "//";

   if(convdomainid)
        url = url + convdomainid + ".r.msn.com/?type=1&cp=";
   else
        url = url + "r.msn.com/?type=1&cp=";

   url = url + convprice + "&sku=" + convsku;

   if(window.microsoft_adcenterconversionparams)
   {
        for(i = 0; i < window.microsoft_adcenterconversionparams.length; i++)
        {   
            url = url + "&" + window.microsoft_adcenterconversionparams[i];
        }
   }

   /* This is to prevent deduplication of conversion due to print preview. Defered to the future so that all customers are ready
   document.write('<div id="adcenterPixel" border="0" height="1" width="1" style="background-image:url('
                  + url + ')"></div>');
   */
         
   document.write('<img border=0 height=1 width=1 src="'
                  + url + '">');

}

microsoft_adcenter_conversion();
