
function ShowAddtionalImage(storeurl,itemcode)
{
   page_url = storeurl + 'ShowAdditionalImg.asp?number='+itemcode ;                        
   popupWin = window.open(page_url, '', 'scrollbars,resizable,width=700,height=650');
}                
function displaythis(what)
		{
		
		var baddtocart = document.getElementById('addtocart')
		var bwishlist   = document.getElementById('addtowishlist')
		var bgiftlist   = document.getElementById('addtowishlist')

		 if (what.value =="cart")
		     {	
			   baddtocart.value="addtocart" ;
			   bwishlist.value="" ; 
			 }	
		 if (what.value=="wishlist")
			 {
			   baddtocart.value="" ;
			   bwishlist.value="addtowishlist" ; 
			 }
			  if (what.value=="giftlist")
			 {
			   baddtocart.value="" ;
			   bwishlist.value="addtogiftreg" ; 
			 }

}
function CheckForEmpty(inputstr)
{
  if(inputstr.length == 0)
    return true ;
    
  for( var i = 0 ; i <  inputstr.length ; i++)
  {
   var onechar = inputstr.charAt(i) ;
   if( onechar != " ")
     return false ;
 
  }
  
 return true ;
	
}
 function IsPosInteger(inputval)
 { 
  inputstr = inputval.toString() ;
   for( x = 0 ; x <inputstr.length; x++)
    {
	  var onechar = inputstr.charAt(x) ;
	  if( onechar < "0" || onechar > "9" )	        
	    	return false;	  	
	}
   return true;
 
 }
  
 function isDate(sDate) {
    var scratch = new Date(sDate);
    if (scratch.toString() == "NaN" || scratch.toString() == "Invalid Date") {
        //alert("Not a Date");
        return false;
    } else {
        return true;
    }
}

	function Process() 
	{	
	    var dropdownnum = document.getElementById('MaxAttriboption').value ;
	    
	    var NonSkuinputtxt = document.getElementById('maxNONSkuOption').value ;
	    
	    if (NonSkuinputtxt>0)
	    {
	    
	        for( var i = 1 ; i <= NonSkuinputtxt ; i++)
	        {
	        
	         var attribtype = "NonSkuslopttype"+i ;
	            attribtype = "document.getElementById('"+attribtype+"').value" ;	
	            attribtypeval = eval(attribtype) 
	            //alert(attribtypeval)    
	           
			   
	           if (attribtypeval=="T")
	           {
	            var NonSkuText = "NonSkusvaltype"+i ; 
	                NonSkuTextType = "document.getElementById('"+NonSkuText+"').value" ;	
	                NonSkuTextTypeVal = eval(NonSkuTextType) 
	                //alert(NonSkuTextTypeVal)  
					/* 
	                if (NonSkuTextTypeVal=="N")
	                {
	                 //check for integer value
	                 var NONSkuInput = "NonSkuAttribtext"+i ;
	                    NONSkuInputVal = "document.getElementById('"+NONSkuInput+"').value" ;	
	                    NONSkuInputValue = eval(NONSkuInputVal) 	                    
	                    //alert(NONSkuInputValue)
	                    if (CheckForEmpty(NONSkuInputValue)==false)
	                    {
	                        if (IsPosInteger(NONSkuInputValue)==false)
	                        {
	                            var NOnSkutitle = "NonSkuAttribTitle"+i ;
	                            NOnSkutitleVal = "document.getElementById('"+NOnSkutitle+"').value" ;	
	                            NOnSkutitleValue = eval(NOnSkutitleVal) 
	                            
	                            alert("Enter Integer Value for '" + NOnSkutitleValue +"'") ;
	                            return false ;
	                        }
	                    }
	                	} //if (NonSkuTextTypeVal=="N")
					*/
					
	                
	               if (NonSkuTextTypeVal=="D")
	               {
	                //check for Date value
	                var NONSkuInput = "NonSkuAttribtext"+i ;
	                NONSkuInputVal = "document.getElementById('"+NONSkuInput+"').value" ;
	                NONSkuInputValue = eval(NONSkuInputVal) 
	                //alert(NONSkuInputValue)
	                if (CheckForEmpty(NONSkuInputValue)==false)
	                {
	                    if (isDate(NONSkuInputValue)==false)
	                    {
                           var NOnSkutitle = "NonSkuAttribTitle"+i ;
                               NOnSkutitleVal = "document.getElementById('"+NOnSkutitle+"').value" ;	
	                           NOnSkutitleValue = eval(NOnSkutitleVal) 

	                           alert("Must Enter Date for '" + NOnSkutitleValue +"'") ;
	                           return false ;
	                    }
	                }
	               
	               } //if (NonSkuTextTypeVal=="D")
	           }
	              
	        
	        }
	    
	    }
	    
	    
	    if (dropdownnum > 0)
	    {
	        alertstring =""
	        var notallselected = false ;	
	        var notallradioselected=false ;       
	        for( var i = 1 ; i <= dropdownnum ; i++)
	        {
	            var attribtype = "slopttype"+i ;
	            attribtype = "document.getElementById('"+attribtype+"').value" ;	
	            attribtypeval = eval(attribtype)            
	            if (attribtypeval=="D")
	                {
	                    var Prodattribname = "Attrib"+i ;
	                    var Prodattribevalname = "document.getElementById('"+Prodattribname+"').selectedIndex" ;
	                    selIndex= eval(Prodattribevalname) ;	        	                   
	                    if (selIndex==0)
	                    {
	                         var Skutitle = "SkuAttribTitle"+i ;
                               SkutitleVal = "document.getElementById('"+Skutitle+"').value" ;	
	                           SkutitleValue = eval(SkutitleVal) 
	                           notallselected=true 	
	                           alertstring = alertstring + "Select Option for '" + SkutitleValue + "'\n"
	                           //alert("Select Option for '" + SkutitleValue +"'") ;
	                           //return false ;    
	                                   
	                           
	                       
	                    }
    	        } //if (attribtypeval=="D")
    	        
    	        
    	        if (attribtypeval=="R")
    	        {
    	            var checkforradio = "noradio"+i ;
    	            var checkforradio = "document.getElementById('"+checkforradio+"').value" ;
    	            var checkforradioval = eval(checkforradio)
    	            //alert(checkforradioval)
    	            if (checkforradioval==0)
    	            {
    	                notallradioselected=true ;
    	            }
    	            if (checkforradioval==1)
    	            {
    	                notallradioselected=true
    	                attribradio = eval("prodinfoform.Attrib"+i+".length") ;
    	                j = attribradio ;
    	               
    	               if (j == null)
						{
							j= 0 ;
						}
						
						if (j==0)
						{
							radiochecked = eval("prodinfoform.Attrib"+i+".checked") ;
							//alert(radiochecked) ;
							if (radiochecked)
							{
								notallradioselected=false
							}
						}
						else
						{
							for (k=0; k<j; k++)
							{
								radiochecked = eval("prodinfoform.Attrib"+i+"["+k+"].checked") ;
								if (radiochecked)
								{
									notallradioselected=false
									
								}		                                                           
							}
						}	
	                    
	                    if (notallradioselected==true)
	                    {
	                      var Skutitle = "SkuAttribTitle"+i ;
                               SkutitleVal = "document.getElementById('"+Skutitle+"').value" ;	
	                           SkutitleValue = eval(SkutitleVal) 
	                           notallselected=true 	
	                           alertstring = alertstring + "Select Option for '" + SkutitleValue + "'\n"
	                    }      	            
    	              }
    	                  	              
    	            
    	        } //if (attribtypeval=="R")
	        
	        } // if dropdown > 0
	        
	       if (notallselected)
	       {
	         alert(alertstring) ;
	         return false ;
	       }
	        //if (notallselected || notallradioselected)
	        if (notallradioselected)	    	        
	            {
	                alert("Please select all options");
	                //alert(alertstring) ;
	                return false ;
	            }
	          //return true ;
	          //return false ;
	    }

	   
	   
	   
	    return true ;
	
	}
	
function extractNumber(obj, decimalPlaces, allowNegative,beforedecimal)
{
	var temp = obj.value;
	
	// avoid changing things if already formatted correctly
	var reg0Str = '[0-9]*';
	if (decimalPlaces > 0) {
		reg0Str += '\\.?[0-9]{0,' + decimalPlaces + '}';
	} else if (decimalPlaces < 0) {
		reg0Str += '\\.?[0-9]*';
	}
	reg0Str = allowNegative ? '^-?' + reg0Str : '^' + reg0Str;
	reg0Str = reg0Str + '$';
	var reg0 = new RegExp(reg0Str);
	if (reg0.test(temp)) return true;

	// first replace all non numbers
	var reg1Str = '[^0-9' + (decimalPlaces != 0 ? '.' : '') + (allowNegative ? '-' : '') + ']';
	var reg1 = new RegExp(reg1Str, 'g');
	temp = temp.replace(reg1, '');

	if (allowNegative) {
		// replace extra negative
		var hasNegative = temp.length > 0 && temp.charAt(0) == '-';
		var reg2 = /-/g;
		temp = temp.replace(reg2, '');
		if (hasNegative) temp = '-' + temp;
	}
	
	if (decimalPlaces != 0) {
		var reg3 = /\./g;
		var reg3Array = reg3.exec(temp);
		if (reg3Array != null) {
			// keep only first occurrence of .
			//  and the number of places specified by decimalPlaces or the entire string if decimalPlaces < 0
			var reg3Right = temp.substring(reg3Array.index + reg3Array[0].length);
			reg3Right = reg3Right.replace(reg3, '');
			reg3Right = decimalPlaces > 0 ? reg3Right.substring(0, decimalPlaces) : reg3Right;
			temp = temp.substring(0,reg3Array.index) + '.' + reg3Right;
		}
	}
	
	//temp = temp.substring(0,3) ;
	obj.value = temp ;
}
function blockNonNumbers(obj, e, allowDecimal, allowNegative,maxbeforedecimal)
{
	var key;
	var isCtrl = false;
	var keychar;
	var reg;
		
	if(window.event) {
		key = e.keyCode;
		isCtrl = window.event.ctrlKey
	}
	else if(e.which) {
		key = e.which;
		isCtrl = e.ctrlKey;
	}
	
	if (isNaN(key)) return true;
	
	keychar = String.fromCharCode(key);
	
	// check for backspace or delete, or if Ctrl was pressed
	if (key == 8 || isCtrl)
	{
		return true;
	}

	
	reg = /\d/;
	var isFirstN = allowNegative ? keychar == '-' && obj.value.indexOf('-') == -1 : false;
	var isFirstD = allowDecimal ? keychar == '.' && obj.value.indexOf('.') == -1 : false;
	
	retval = true ;
	if (maxbeforedecimal > 0)
	{
		temp = obj.value ;
		
		var hasNegative = temp.length > 0 && temp.charAt(0) == '-';
		var reg2 = /-/g;
		temp = temp.replace(reg2, '');
		
		if (temp.length >= maxbeforedecimal)
		{
			retval=false ;
			return retval ;				
		}
	}

	return isFirstN || isFirstD || reg.test(keychar);

}

function Contchar(entrytxt,exittxt,texto,maxchars) {
   
  var entrytxtObj=getObject(entrytxt);
  var exittxtObj=getObject(exittxt);
  var longitud=maxchars - entrytxtObj.value.length;  
  if(longitud <= 0) {
    longitud=0;
    texto='<span class="disable"> '+texto+' </span>';
    entrytxtObj.value=entrytxtObj.value.substr(0,maxchars);
  }
  exittxtObj.innerHTML = texto.replace("{CHAR}",longitud);
 
}
function getObject(obj) {
  var theObj;
  if(document.all) {
    if(typeof obj=="string") {
      return document.all(obj);
    } else {
      return obj.style;
    }
  }
  if(document.getElementById) {
    if(typeof obj=="string") {
      return document.getElementById(obj);
    } else {
      return obj.style;
    }
  }
  return null;
}