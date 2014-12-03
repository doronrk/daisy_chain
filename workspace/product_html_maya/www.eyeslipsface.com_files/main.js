 
var XMLHttpRequestObject = false;       

if (window.XMLHttpRequest) 
 {	XMLHttpRequestObject = new XMLHttpRequest();  } 
 else if (window.ActiveXObject) 
 { XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP")  }

function getData(datasource,divid)
{
  if (XMLHttpRequestObject)
 	{
		var obj = document.getElementById(divid);
		XMLHttpRequestObject.open("GET", datasource+"&ms=" + new Date().getTime(),true);
		XMLHttpRequestObject.onreadystatechange = function()
		{
			if (XMLHttpRequestObject.readyState ==4 && XMLHttpRequestObject.status == 200)
				{ obj.innerHTML  = XMLHttpRequestObject.responseText; }           
		}
		XMLHttpRequestObject.send(null);
	}         

}   

var broswerType=navigator.appVersion

function showDropDown() { 
	
	if (broswerType.indexOf('MSIE') > 1 ) {
	
		dropdown.filters[0].Apply();
		
		if (dropdown.style.visibility == "visible") { 
			dropdown.style.visibility = "hidden"; 
			dropdown.filters.revealTrans.transition=5; 
		} else { 
			dropdown.style.visibility = "visible"; 
			dropdown.filters[0].transition=5; 
		} 
			
		dropdown.filters[0].Play(); 
		
	} else {
		
		if (dropdown.style.visibility == "visible") { 
			dropdown.style.visibility = "hidden"; 
		} else { 
			dropdown.style.visibility = "visible"; 
		} 
	}	
} 

function getPageSize() {
	        
	     var xScroll, yScroll;
		
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll = window.innerWidth + window.scrollMaxX;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}
		
		var windowWidth, windowHeight;
		
		if (self.innerHeight) {	// all except Explorer
			if(document.documentElement.clientWidth){
				windowWidth = document.documentElement.clientWidth; 
			} else {
				windowWidth = self.innerWidth;
			}
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}	
		
		// for small pages with total height less then height of the viewport
		if(yScroll < windowHeight){
			pageHeight = windowHeight;
		} else { 
			pageHeight = yScroll;
		}
	
		// for small pages with total width less then width of the viewport
		if(xScroll < windowWidth){	
			pageWidth = xScroll;		
		} else {
			pageWidth = windowWidth;
		}

		return [pageWidth,pageHeight];
	}
	
	
function swap_images(the_image,the_title)
{   
	document.getElementById('the_zoom_image').value=the_image;
	document.getElementById('the_img_title').innerHTML=the_title;
	document.getElementById('product_image').src='http://www.eyeslipsface.com/pop.asp?load_image=1&imgname='+the_image;
	 document.getElementById('plus_min').innerHTML='+'
	slideUp2('image_slide',0,-1,350,1)
	//document.getElementById('image_slide').style.top='-1px'
	//document.getElementById('image_slide').style.height='1px'
	//document.getElementById('image_slide').style.display='none'
}

