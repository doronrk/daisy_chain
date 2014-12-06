function Dummy(){return}

function adjust_form () {

    if (document.forms[0].total_field != null)
    {
	    var total_field = parseInt (document.forms[0].total_field.value);
	    max_width = 0;
	    max_field_width  = 0;
	    max_height = 0;

	    for (i=1; i<=total_field; i++) {
		    field = document.getElementById ("span"+i);
		    if (field.offsetWidth > max_field_width)
			    max_field_width = field.offsetWidth;
	    }
	}
/*	

	if (max_field_width > 0) {
	for (i=1; i<=total_field; i++) {
		label = document.getElementById ("label"+i);

		field = document.getElementById ("span"+i);
		field.style.width = max_field_width;

		if (label.offsetHeight < field.offsetHeight)
			label.style.height = field.offsetHeight;
		else
			field.style.height = label.offsetHeight;
	}
	}
*/
}

function adjust_menu ()
{
    /* jun 20, 2009 - comment this out. Use css to fix height instead of this script
    IE8 and IR7 have different height - cause problem with submenu
    Dummy();

	var max_height = 0;

	for (i=0; i<total_menu; i++) {
    top_menu = document.getElementById ("menu"+i);
    top_menu_link = document.getElementById ("menu_link"+i);

		top_menu.style.width = top_menu_link.offsetWidth;

		if (top_menu_link.offsetHeight > max_height)
    max_height = top_menu_link.offsetHeight;
    }

	for (i=0; i<total_menu; i++) {
    top_menu_link = document.getElementById ("menu_link"+i);
    top_menu_link.style.height = max_height;
    }*/
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  var my_win = window.open(theURL,winName,features);
  my_win.focus();
 
}
